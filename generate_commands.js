#!/usr/bin/env node
/**
 * generate_commands.js
 * Transforms 42 command files: strips inline agent prompts,
 * replaces with skill references pointing to ~/.claude/skills/.
 *
 * This creates a single-source-of-truth system:
 * - Skills (agent prompts) in ~/.claude/skills/
 * - Commands (team orchestration) in ~/.claude/commands/
 * - Change a skill once -> all presets that use it get the update
 *
 * Source of truth: v32.16 HTML (PR object for agent compositions)
 * Target: ~/.claude/commands/ (42 global command files)
 *
 * Usage: node generate_commands.js
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// v38: sciezka wskazywala na folder v32.16, ktorego juz nie ma. Zrodlem jest najnowsza wersja.
// v40 (2026-09-13): v38 zszedl z roli zapasu. Zaczepy ('const AD=[', 'AD.push(', 'const PR=')
// sa w v40 identyczne jak w v38 - sprawdzone przed zmiana.
const HTML_PATH = path.join(__dirname, 'v41', 'AGENT_TEAMS_CONFIGURATOR_v41.html');
const COMMANDS_DIR = path.join(os.homedir(), '.claude', 'commands');

// v38: domyslnie tylko TWORZYMY brakujace komendy. --all dodatkowo przepisuje istniejace
// (podmienia im tabele agentow i modeli wedlug danych z HTML) - to swiadoma decyzja,
// bo potrafi zmienic model przypisany agentowi w dzialajacym juz presecie.
const ONLY_MISSING = !process.argv.includes('--all');

// Nazwy faz po polsku. Kolejnosc faz w pliku komendy bierze sie z kolejnosci wezlow w PR.
const PHASE_LABELS = {
  strategy: 'STRATEGIA', research: 'RESEARCH', build: 'BUILD', qa: 'QA',
  debate1: 'FIVE MINDS #1', debate2: 'FIVE MINDS #2', debate: 'FIVE MINDS',
  hitl: 'HITL', data: 'DANE', product: 'PRODUKT', ops: 'OPS', compliance: 'ZGODNOSC',
};

// Agent display names (Polish)
const AGENT_NAMES = {
  orchestrator: 'Orkiestrator',
  analyst: 'Analityk',
  planner: 'Planer',
  synthesizer: 'Syntetyk',
  res_tech: 'Researcher Tech',
  res_ux: 'Researcher UX',
  res_reddit: 'Researcher Reddit',
  res_x: 'Researcher X/Twitter',
  res_github: 'Researcher GitHub',
  res_forums: 'Researcher Forums',
  res_docs: 'Researcher Docs',
  res_critic: 'Researcher Krytyk',
  backend: 'Backend Dev',
  frontend: 'Frontend Dev',
  feature: 'Feature Dev',
  designer: 'Designer',
  integrator: 'Integrator',
  writer: 'Redaktor',
  db_architect: 'DB Architect',
  observability_engineer: 'Observability Engineer',
  qa_security: 'QA Security',
  qa_quality: 'QA Quality',
  qa_perf: 'QA Performance',
  qa_manager: 'QA Manager',
  expert_innovator: 'Ekspert Innowator',
  expert_analyst: 'Ekspert Analityk',
  expert_user: 'Ekspert User',
  expert_pragmatist: 'Ekspert Pragmatyk',
  expert_devil: 'Ekspert Cien',
  decision_presenter: 'Prezenter Decyzji',
  gtm_strategist: 'GTM Strateg',
  statistician: 'Statystyk',
  eda_analyst: 'EDA Analyst',
  control_mapper: 'Control Mapper',
  telemetry_surfer: 'Telemetry Surfer',
};

// Default models per agent (from v32.16 skill files)
const DEFAULT_MODELS = {
  orchestrator: 'opus',
  analyst: 'sonnet',
  planner: 'sonnet',
  synthesizer: 'sonnet',
  res_tech: 'haiku',
  res_ux: 'haiku',
  res_reddit: 'haiku',
  res_x: 'sonnet',
  res_github: 'sonnet',
  res_forums: 'sonnet',
  res_docs: 'haiku',
  res_critic: 'sonnet',
  backend: 'sonnet',
  frontend: 'sonnet',
  feature: 'sonnet',
  designer: 'sonnet',
  integrator: 'sonnet',
  writer: 'sonnet',
  db_architect: 'sonnet',
  observability_engineer: 'sonnet',
  qa_security: 'haiku',
  qa_quality: 'haiku',
  qa_perf: 'haiku',
  qa_manager: 'sonnet',
  expert_innovator: 'opus',
  expert_analyst: 'opus',
  expert_user: 'opus',
  expert_pragmatist: 'opus',
  expert_devil: 'opus',
  decision_presenter: 'haiku',
  gtm_strategist: 'sonnet',
  statistician: 'sonnet',
  eda_analyst: 'sonnet',
  control_mapper: 'sonnet',
  telemetry_surfer: 'sonnet',
};

// --- Extract JS object from HTML using brace matching ---
function extractJSObject(html, varName) {
  // Try multiple marker formats
  const markers = [
    `const ${varName}={`,
    `const ${varName} = {`,
    `const ${varName}= {`,
    `const ${varName} ={`,
  ];

  let startIdx = -1;
  for (const marker of markers) {
    startIdx = html.indexOf(marker);
    if (startIdx !== -1) break;
  }
  if (startIdx === -1) throw new Error(`Could not find ${varName} in HTML`);

  // Find opening brace
  const braceStart = html.indexOf('{', startIdx);
  let depth = 0;
  let inString = false;
  let stringChar = '';

  for (let i = braceStart; i < html.length; i++) {
    const ch = html[i];
    const next = i + 1 < html.length ? html[i + 1] : '';

    // Skip single-line comments (outside strings)
    if (!inString && ch === '/' && next === '/') {
      while (i < html.length && html[i] !== '\n') i++;
      continue;
    }

    if (inString) {
      if (ch === '\\') { i++; continue; }
      if (ch === stringChar) inString = false;
      continue;
    }

    if (ch === "'" || ch === '"' || ch === '`') {
      inString = true;
      stringChar = ch;
      continue;
    }

    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        let jsBlock = html.substring(braceStart, i + 1);
        // Strip // comments for safe eval
        jsBlock = jsBlock.split('\n')
          .map(line => {
            let inS = false, sCh = '';
            for (let j = 0; j < line.length - 1; j++) {
              const c = line[j];
              if (inS) {
                if (c === '\\') { j++; continue; }
                if (c === sCh) inS = false;
                continue;
              }
              if (c === "'" || c === '"' || c === '`') { inS = true; sCh = c; continue; }
              if (c === '/' && line[j + 1] === '/') return line.substring(0, j);
            }
            return line;
          })
          .join('\n');
        try {
          const fn = new Function('return ' + jsBlock);
          return fn();
        } catch (e) {
          throw new Error(`Failed to eval ${varName}: ${e.message}`);
        }
      }
    }
  }
  throw new Error(`Could not find matching brace for ${varName}`);
}

// --- Extract a top-level JS array (AD) from HTML ---
// Mapy AGENT_NAMES i DEFAULT_MODELS ponizej sa recznie utrzymywane i wlasnie dlatego
// rozjechaly sie z aplikacja o 13 agentow. AD w HTML ma komplet: nazwe, model, faze i opis,
// wiec od v38 to ONO jest zrodlem, a mapy sluza juz tylko jako awaryjny zapas.
// UWAGA: AD nie jest jednym literalem. Deklaracja `const AD=[...]` ma 53 agentow,
// a pozostali dochodza pozniej przez `AD.push({...},{...})` (v32.6 dorzucil 7 agentow).
// Czytanie samego literalu daje 53 z 60 i po cichu gubi opisy - tak wlasnie powstaly
// pierwsze wersje komend z pustym opisem przy EDA Analyst i Observability Engineer.
function skanujDoZamkniecia(html, from, otwiera, zamyka) {
  let depth = 0, inString = false, stringChar = '';
  for (let i = from; i < html.length; i++) {
    const ch = html[i];
    if (inString) {
      if (ch === '\\') { i++; continue; }
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { inString = true; stringChar = ch; continue; }
    if (ch === otwiera) depth++;
    if (ch === zamyka) { depth--; if (depth === 0) return i; }
  }
  return -1;
}

function extractAD(html) {
  const startIdx = html.indexOf('const AD=[');
  if (startIdx === -1) throw new Error('Could not find AD in HTML');

  const arrStart = html.indexOf('[', startIdx);
  const arrEnd = skanujDoZamkniecia(html, arrStart, '[', ']');
  if (arrEnd === -1) throw new Error('Could not find end of AD array');

  let agents = new Function('return ' + html.substring(arrStart, arrEnd + 1))();

  // Doklejamy kazdy blok AD.push(...) z literalami obiektow (pomijamy wywolania
  // runtime w rodzaju AD.push(agent), gdzie argumentem jest zmienna).
  let szukaj = html.indexOf('AD.push(', arrEnd);
  while (szukaj !== -1) {
    const nawias = szukaj + 'AD.push('.length - 1;
    const koniec = skanujDoZamkniecia(html, nawias, '(', ')');
    if (koniec !== -1) {
      const wnetrze = html.substring(nawias + 1, koniec).trim();
      if (wnetrze.startsWith('{')) {
        try {
          agents = agents.concat(new Function('return [' + wnetrze + ']')());
        } catch (e) {
          console.log(`  UWAGA: nie udalo sie odczytac bloku AD.push: ${e.message}`);
        }
      }
    }
    szukaj = html.indexOf('AD.push(', szukaj + 1);
  }

  return agents;
}

// Effort z frontmattera pliku skilla (czytane raz na agenta).
const _effortCache = {};
function effortZeSkilla(id) {
  if (_effortCache[id] !== undefined) return _effortCache[id];
  const p = path.join(os.homedir(), '.claude', 'skills', `${id}.md`);
  let v = null;
  if (fs.existsSync(p)) {
    const m = fs.readFileSync(p, 'utf-8').match(/^effort:\s*(\S+)\s*$/m);
    if (m) v = m[1];
  }
  _effortCache[id] = v;
  return v;
}

// --- Build a brand new command file from HTML data ---
function buildNewCommand(presetKey, preset, nodes, agentInfo) {
  // Deduplicate agents, keep first occurrence and original order
  const seen = new Set();
  const agents = [];
  for (const n of nodes) {
    if (!seen.has(n.d)) { seen.add(n.d); agents.push(n); }
  }

  const info = id => agentInfo[id] || {};
  const nameOf = id => info(id).name || AGENT_NAMES[id] || id;
  const modelOf = n => n.m || info(n.d).model || DEFAULT_MODELS[n.d] || 'sonnet';
  // Effort deklaruje w danych aplikacji tylko czesc agentow (nowsze roczniki). Dla reszty
  // zrodlem jest frontmatter pliku skilla - inaczej cala kolumna pokazywalaby "high",
  // a orkiestrator i eksperci debaty chodza na "xhigh".
  const effortOf = id => info(id).effort || effortZeSkilla(id) || 'high';

  // Kroki = CIAGLE odcinki tej samej fazy w kolejnosci z PR. Grupowanie "wszyscy agenci
  // danej fazy razem" psulo narracje: w Five Minds syntetyk ma faze strategy, tak jak
  // orkiestrator, wiec ladowal na poczatku - a on wydaje werdykt PO debacie.
  const kroki = [];
  agents.forEach(n => {
    const ph = info(n.d).phase || 'build';
    const ost = kroki[kroki.length - 1];
    if (ost && ost.phase === ph) ost.agenci.push(n);
    else kroki.push({ phase: ph, agenci: [n] });
  });

  // Etykieta kroku: nazwa fazy, a przy jej powrocie dopisek, zeby bylo widac, ze to ta sama faza.
  const uzyte = new Set();
  kroki.forEach(k => {
    const baza = PHASE_LABELS[k.phase] || k.phase.toUpperCase();
    k.label = uzyte.has(baza) ? baza + ' (ciag dalszy)' : baza;
    uzyte.add(baza);
  });

  const L = [];
  const name = preset.n || presetKey;
  // W linii Workflow kazda faza pada raz, w kolejnosci pierwszego wystapienia.
  const workflow = [...new Set(kroki.map(k => PHASE_LABELS[k.phase] || k.phase.toUpperCase()))].join(' -> ');

  L.push('---');
  L.push(`description: "${name} - ${(preset.use || preset.dsc || '').replace(/"/g, '\\"')}"`);
  L.push('---');
  L.push('');
  L.push(`# ${name}`);
  L.push('');
  L.push(`Jestes orkiestratorem presetu **${name}** (${agents.length} agentow, wzorzec: ${preset.pt || 'Orchestrator-Worker'}).`);
  L.push('');
  L.push('## ZADANIE');
  L.push('');
  L.push('$ARGUMENTS');
  L.push('');
  L.push('Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o zadanie i NIE kontynuuj bez odpowiedzi.');
  L.push('');
  L.push('## OPIS PRESETU');
  L.push('');
  L.push(`- **Zastosowanie:** ${preset.use || preset.dsc || ''}`);
  L.push(`- **Wzorzec:** ${preset.pt || 'Orchestrator-Worker'}`);
  L.push(`- **Workflow:** ${workflow}`);
  if (preset.t) L.push(`- **Szacowane zuzycie:** ${preset.t} tokenow${preset.$ ? ' (' + preset.$ + ')' : ''}`);
  L.push('');
  L.push('## MANIFEST.md');
  L.push('');
  L.push('Przed rozpoczeciem pracy stworz plik MANIFEST.md z sekcjami:');
  L.push('- ## Zadanie (opis od uzytkownika)');
  L.push('- ## Decyzje Architektoniczne');
  L.push('- ## Stack Technologiczny');
  L.push('- ## Known Risks');
  L.push('- ## Open Questions');
  L.push('');
  L.push('MANIFEST.md sluzy jako shared scratchpad miedzy agentami.');
  L.push('');
  L.push('## INSTRUKCJE WYKONANIA');
  L.push('');
  L.push('Wykonuj fazy sekwencyjnie. W ramach fazy uruchamiaj agentow ROWNOLEGLE (wiele wywolan Agent tool w jednej wiadomosci).');
  L.push('');

  kroki.forEach((k, idx) => {
    L.push(`### Faza: ${k.label}`);
    L.push('');
    if (k.agenci.length > 1) {
      L.push(`Uruchom rownolegle (${k.agenci.length} agentow):`);
      L.push('');
    }
    k.agenci.forEach(n => {
      const rola = (info(n.d).role || '').trim();
      L.push(`**${nameOf(n.d)}** [${modelOf(n).toUpperCase()}] - ${rola}`);
      L.push('');
    });
    if (idx < kroki.length - 1) {
      L.push('> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.');
      L.push('');
    }
  });

  L.push('---');
  L.push('');
  L.push('## REFERENCJE DO SKILLS');
  L.push('');
  L.push('Przed uruchomieniem kazdego agenta:');
  L.push('1. Przeczytaj jego plik skill uzywajac Read tool');
  L.push('2. Przekaz PELNY prompt (od ROLE do REPORT FORMAT) jako instrukcje do Agent tool');
  L.push('3. Uzyj parametrow model ORAZ effort zgodnie z kolumnami ponizej');
  L.push('');
  L.push('| # | Agent | Model | Effort | Skill File |');
  L.push('|---|-------|-------|--------|------------|');
  agents.forEach((n, i) => {
    L.push(`| ${i + 1} | ${nameOf(n.d)} | ${modelOf(n)} | ${effortOf(n.d)} | ~/.claude/skills/${n.d}.md |`);
  });
  L.push('');
  L.push('## ZASADY OGOLNE');
  L.push('');
  L.push('- Kazdy agent pracuje W IZOLACJI - przekazuj mu TYLKO potrzebny kontekst');
  L.push('- MANIFEST.md jest jedynym shared scratchpad');
  L.push('- Maksymalizuj rownoleglosc - uruchamiaj niezaleznych agentow jednoczesnie');
  L.push('- Po kazdej fazie zaktualizuj MANIFEST.md');
  L.push('- Eskaluj do uzytkownika gdy: brak jednoznacznej odpowiedzi, ryzyko > srednie, decyzja architektoniczna nieodwracalna');
  L.push('- Model i effort przekazuj jako parametry wywolania Agent tool (model: "opus"/"sonnet"/"haiku", effort: "low"/"medium"/"high"/"xhigh")');
  L.push('');

  return L.join('\n');
}

// --- Transform a command file ---
function transformFile(content, presetKey, prData) {
  // Normalize line endings
  content = content.replace(/\r\n/g, '\n');
  const lines = content.split('\n');

  // Find prompts section start
  let promptsStart = -1;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '## PROMPTY AGENTOW' || trimmed === '## AGENT PROMPTS'
        || trimmed === '## REFERENCJE DO SKILLS' || trimmed === '## SKILL REFERENCES') {
      promptsStart = i;
      break;
    }
  }

  if (promptsStart === -1) return null;

  // Find general rules section (search from end to avoid false matches in report templates)
  let rulesStart = -1;
  for (let i = lines.length - 1; i > promptsStart; i--) {
    const trimmed = lines[i].trim();
    if (trimmed === '## ZASADY OGOLNE' || trimmed === '## GENERAL RULES') {
      rulesStart = i;
      break;
    }
  }

  if (rulesStart === -1) return null;

  // Get agents for this preset
  const agents = prData[presetKey];
  if (!agents) return null;

  // Deduplicate agents (keep first occurrence, preserve order)
  const seen = new Set();
  const uniqueAgents = [];
  for (const agent of agents) {
    if (!seen.has(agent.d)) {
      seen.add(agent.d);
      uniqueAgents.push(agent);
    }
  }

  // Detect language
  const isPolish = /PROMPTY AGENTOW|REFERENCJE DO SKILLS/.test(lines[promptsStart]);

  // Build skill reference section
  const refLines = [];
  refLines.push('---');
  refLines.push('');
  if (isPolish) {
    refLines.push('## REFERENCJE DO SKILLS');
    refLines.push('');
    refLines.push('Przed uruchomieniem kazdego agenta:');
    refLines.push('1. Przeczytaj jego plik skill uzywajac Read tool');
    refLines.push('2. Przekaz PELNY prompt (od ROLE do REPORT FORMAT) jako instrukcje do Agent tool');
    refLines.push('3. Uzyj model parameter zgodnie z kolumna Model ponizej');
  } else {
    refLines.push('## SKILL REFERENCES');
    refLines.push('');
    refLines.push('Before launching each agent:');
    refLines.push('1. Read the agent\'s skill file using the Read tool');
    refLines.push('2. Pass the FULL prompt (from ROLE to REPORT FORMAT) as instructions to the Agent tool');
    refLines.push('3. Use the model parameter as specified in the Model column below');
  }
  refLines.push('');
  refLines.push('| # | Agent | Model | Skill File |');
  refLines.push('|---|-------|-------|------------|');

  uniqueAgents.forEach((agent, idx) => {
    const name = AGENT_NAMES[agent.d] || agent.d;
    const model = agent.m || DEFAULT_MODELS[agent.d] || 'sonnet';
    refLines.push(`| ${idx + 1} | ${name} | ${model} | ~/.claude/skills/${agent.d}.md |`);
  });

  refLines.push('');

  // Build "before" section (everything before prompts heading)
  const before = [];
  for (let i = 0; i < promptsStart; i++) {
    before.push(lines[i]);
  }
  // Remove trailing empty lines and --- separators
  while (before.length > 0) {
    const last = before[before.length - 1].trim();
    if (last === '' || last === '---') {
      before.pop();
    } else {
      break;
    }
  }
  before.push('');

  // Build "after" section (rules heading and everything after)
  const after = lines.slice(rulesStart);

  return [...before, ...refLines, ...after].join('\n');
}

// --- Kontrola pokrycia ---
// Komenda jest warta tyle, ile pliki skilli, ktore wywoluje. Jesli preset odwoluje sie
// do agenta bez skilla, komenda uruchomi sie i wywroci w polowie - lepiej wiedziec od razu.
function sprawdzPokrycie(pm, pr, agentInfo) {
  const SKILLS_DIR = path.join(os.homedir(), '.claude', 'skills');
  const komendy = new Set(fs.readdirSync(COMMANDS_DIR).filter(f => f.endsWith('.md')).map(f => f.slice(0, -3)));
  const skille = new Set(fs.readdirSync(SKILLS_DIR).filter(f => f.endsWith('.md')).map(f => f.slice(0, -3)));

  const bezKomendy = Object.keys(pm).filter(pid => !komendy.has(pid.replace(/_/g, '-')));
  const uzywani = new Set();
  Object.keys(pm).forEach(pid => (pr[pid] || []).forEach(n => uzywani.add(n.d)));
  const bezSkilla = [...uzywani].filter(id => !skille.has(id));
  const osierocone = [...komendy].filter(f => !Object.keys(pm).some(pid => pid.replace(/_/g, '-') === f));

  console.log('\n=== POKRYCIE ===');
  console.log(`Presety: ${Object.keys(pm).length} | komendy: ${komendy.size} | bez komendy: ${bezKomendy.length}`);
  bezKomendy.forEach(p => console.log(`  BRAK KOMENDY: /${p.replace(/_/g, '-')}`));
  console.log(`Agenci uzywani przez presety: ${uzywani.size} | skille: ${skille.size} | bez skilla: ${bezSkilla.length}`);
  bezSkilla.forEach(a => console.log(`  BRAK SKILLA: ${a}`));
  if (osierocone.length) {
    console.log(`Komendy bez presetu w HTML: ${osierocone.length}`);
    osierocone.forEach(f => console.log(`  OSIEROCONA: /${f}`));
  }
  if (!bezKomendy.length && !bezSkilla.length) {
    console.log('Komplet: kazdy preset ma komende, kazdy uzywany agent ma skill.');
  }
}

// --- Main ---
function main() {
  console.log('=== generate_commands.js ===');
  console.log(`HTML: ${HTML_PATH}`);
  console.log(`Target: ${COMMANDS_DIR}\n`);

  console.log('Reading ' + path.basename(HTML_PATH) + '...');
  const html = fs.readFileSync(HTML_PATH, 'utf-8');

  console.log('Extracting PR (preset agent compositions)...');
  const pr = extractJSObject(html, 'PR');
  const pm = extractJSObject(html, 'PM');
  const ad = extractAD(html);
  const agentInfo = {};
  ad.forEach(a => { agentInfo[a.id] = a; });
  console.log(`Found ${Object.keys(pr).length} presets in PR, ${Object.keys(pm).length} in PM, ${ad.length} agents in AD\n`);

  // --- Krok 1: brakujace komendy (presety, ktore w ogole nie maja pliku) ---
  const istniejace = new Set(fs.readdirSync(COMMANDS_DIR).filter(f => f.endsWith('.md')).map(f => f.slice(0, -3)));
  const brakujace = Object.keys(pm).filter(pid => !istniejace.has(pid.replace(/_/g, '-')));

  console.log(`Brakujace komendy: ${brakujace.length}`);
  let utworzone = 0;
  for (const pid of brakujace) {
    const nodes = pr[pid];
    if (!nodes) { console.log(`  [POMINIETE] ${pid} (brak skladu w PR)`); continue; }
    const md = buildNewCommand(pid, pm[pid], nodes, agentInfo);
    const plik = pid.replace(/_/g, '-') + '.md';
    fs.writeFileSync(path.join(COMMANDS_DIR, plik), md, 'utf-8');
    const ilu = new Set(nodes.map(n => n.d)).size;
    console.log(`  [NOWA] ${plik} (${ilu} agentow, ${md.length} bajtow)`);
    utworzone++;
  }
  console.log(`Utworzone: ${utworzone}\n`);

  if (ONLY_MISSING) {
    console.log('Tryb: tylko BRAKUJACE. Istniejace pliki komend nietkniete.');
    console.log('Pelne przepisanie istniejacych: --all (UWAGA: podmienia modele agentow');
    console.log('na te z HTML, wiec moze zmienic zachowanie dzialajacych juz presetow).');
    sprawdzPokrycie(pm, pr, agentInfo);
    return;
  }

  // --- Krok 2 (--all): przepisanie istniejacych plikow ---
  const files = fs.readdirSync(COMMANDS_DIR).filter(f => f.endsWith('.md')).sort();
  console.log(`Processing ${files.length} command files...\n`);

  let transformed = 0;
  let skipped = 0;
  let totalOldSize = 0;
  let totalNewSize = 0;

  for (const file of files) {
    const filePath = path.join(COMMANDS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const presetKey = file.replace('.md', '').replace(/-/g, '_');

    const result = transformFile(content, presetKey, pr);

    if (result === null) {
      console.log(`  [SKIP] ${file} (no prompts section or missing PR data for key: ${presetKey})`);
      skipped++;
      continue;
    }

    fs.writeFileSync(filePath, result, 'utf-8');

    const oldSize = content.length;
    const newSize = result.length;
    totalOldSize += oldSize;
    totalNewSize += newSize;

    const uniqueCount = new Set(pr[presetKey].map(a => a.d)).size;
    const pct = Math.round((oldSize - newSize) / oldSize * 100);

    console.log(`  [OK] ${file} (${uniqueCount} agents, ${oldSize} -> ${newSize} bytes, -${pct}%)`);
    transformed++;
  }

  const totalSaved = totalOldSize - totalNewSize;
  console.log(`\n=== Summary ===`);
  console.log(`Transformed: ${transformed}/${files.length}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total: ${totalOldSize} -> ${totalNewSize} bytes (-${Math.round(totalSaved / 1024)} KB, -${Math.round(totalSaved / totalOldSize * 100)}%)`);
  console.log(`\nAll commands now reference ~/.claude/skills/ instead of inlining prompts.`);
  console.log(`Single source of truth: change skill file -> all presets get updated.`);
}

main();
