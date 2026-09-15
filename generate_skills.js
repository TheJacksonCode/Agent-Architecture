#!/usr/bin/env node
/**
 * generate_skills.js - v2
 * Extracts agent definitions from the latest HTML (AGENT_EDU_PL) and generates
 * skill .md files for ~/.claude/skills/
 *
 * Only extracts OPERATIONAL fields (not educational/UI fields).
 * Source of truth: v41 HTML (see HTML_PATH below)
 *
 * Usage: node generate_skills.js          (tylko brakujace pliki)
 *        node generate_skills.js --all    (nadpisuje wszystkie)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// --- Config ---
// v38: sciezka wskazywala na folder v32.16, ktorego juz nie ma - generator nie dawal sie
// uruchomic od czasu porzadkow w repo. Zrodlem jest zawsze NAJNOWSZA wersja HTML.
// v40 (2026-09-13): v38 zszedl z roli zapasu, wiec przestal byc zrodlem. Zaczepy parsera
// ('const AGENT_EDU_PL = {') sa w v40 dokladnie te same - sprawdzone przed zmiana.
const HTML_PATH = path.join(__dirname, 'v41', 'AGENT_TEAMS_CONFIGURATOR_v41.html');
const SKILLS_DIR = path.join(os.homedir(), '.claude', 'skills');

// v38: domyslnie generujemy TYLKO brakujace pliki. Pelny przebieg (--all) nadpisuje wszystko
// w ~/.claude/skills, a te pliki bywaja recznie dostrajane - kasowanie ich bez pytania
// to nie jest cos, co generator ma robic przy zwyklym uruchomieniu.
const ONLY_MISSING = !process.argv.includes('--all');

// Phase/tools mapping (from existing skill files + agent roles)
const AGENT_META = {
  orchestrator:           { phase: 'strategy', tools: ['Agent', 'Read', 'Write', 'Bash', 'TaskCreate'] },
  synthesizer:            { phase: 'strategy', tools: ['Read', 'Write', 'Edit', 'Grep', 'Glob'] },
  analyst:                { phase: 'strategy', tools: ['Read', 'Grep', 'Glob'] },
  planner:                { phase: 'strategy', tools: ['Read', 'Write', 'Grep', 'Glob'] },
  res_tech:               { phase: 'research', tools: ['WebSearch', 'WebFetch', 'Read'] },
  res_ux:                 { phase: 'research', tools: ['WebSearch', 'WebFetch'] },
  res_reddit:             { phase: 'research', tools: ['WebSearch', 'WebFetch'] },
  res_x:                  { phase: 'research', tools: ['WebSearch', 'WebFetch'] },
  res_github:             { phase: 'research', tools: ['WebSearch', 'WebFetch', 'Bash'] },
  res_forums:             { phase: 'research', tools: ['WebSearch', 'WebFetch'] },
  res_docs:               { phase: 'research', tools: ['WebSearch', 'WebFetch', 'Read'] },
  res_critic:             { phase: 'research', tools: ['Read', 'Grep', 'Glob'] },
  backend:                { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'] },
  frontend:               { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'] },
  feature:                { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'] },
  designer:               { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Grep', 'Glob'] },
  integrator:             { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'] },
  writer:                 { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Grep', 'Glob'] },
  db_architect:           { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'] },
  observability_engineer: { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'] },
  qa_security:            { phase: 'qa', tools: ['Read', 'Grep', 'Glob'] },
  qa_quality:             { phase: 'qa', tools: ['Read', 'Grep', 'Glob', 'Bash'] },
  qa_perf:                { phase: 'qa', tools: ['Read', 'Grep', 'Glob', 'Bash'] },
  qa_manager:             { phase: 'qa', tools: ['Read', 'Write', 'Edit', 'Grep', 'Glob'] },
  expert_innovator:       { phase: 'debate', tools: ['Read', 'Grep'] },
  expert_analyst:         { phase: 'debate', tools: ['Read', 'Grep'] },
  expert_user:            { phase: 'debate', tools: ['Read', 'Grep'] },
  expert_pragmatist:      { phase: 'debate', tools: ['Read', 'Grep'] },
  expert_devil:           { phase: 'debate', tools: ['Read', 'Grep'] },
  decision_presenter:     { phase: 'hitl', tools: ['Read', 'Write'] },
  gtm_strategist:         { phase: 'product', tools: ['Read', 'Write', 'WebSearch', 'WebFetch'] },
  statistician:           { phase: 'data', tools: ['Read', 'Write', 'Bash', 'Grep'] },
  eda_analyst:            { phase: 'data', tools: ['Read', 'Write', 'Bash', 'Grep', 'Glob'] },
  control_mapper:         { phase: 'compliance', tools: ['Read', 'Write', 'Grep', 'Glob'] },
  telemetry_surfer:       { phase: 'ops', tools: ['Read', 'Bash', 'Grep', 'WebFetch'] },
  // --- v34: Data & AI ---
  ml_engineer:            { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'] },
  data_engineer:          { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'] },
  ai_engineer:            { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'WebSearch', 'WebFetch'] },
  prompt_engineer:        { phase: 'build', tools: ['Read', 'Write', 'Edit', 'WebSearch'] },
  // --- v34: Infra & DevOps ---
  devops_engineer:        { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'] },
  cloud_architect:        { phase: 'build', tools: ['Read', 'Write', 'Edit', 'WebSearch', 'WebFetch'] },
  sre_engineer:           { phase: 'qa', tools: ['Read', 'Write', 'Bash', 'Grep', 'Glob'] },
  kubernetes_specialist:  { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'] },
  // --- v35: Jakosc i produkt ---
  accessibility_tester:   { phase: 'qa', tools: ['Read', 'Bash', 'Grep', 'Glob'] },
  product_manager:        { phase: 'strategy', tools: ['Read', 'Write', 'WebSearch'] },
  ux_researcher:          { phase: 'research', tools: ['Read', 'Write', 'WebSearch', 'WebFetch'] },
  // --- v35: Dokumentacja i mobile ---
  technical_writer:       { phase: 'build', tools: ['Read', 'Write', 'Edit', 'WebSearch'] },
  mobile_developer:       { phase: 'build', tools: ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob'] },
};

// Effort per agent (drugi wymiar obok modelu; zastapil usuniety budget_tokens).
// Regula z globalnego CLAUDE.md: xhigh = decyzyjno-krytyczne, high = build/pisanie,
// medium = zbieranie researchu, low = mechaniczne i tanie (haiku).
const EFFORT_XHIGH = new Set(['orchestrator', 'expert_innovator', 'expert_analyst',
  'expert_user', 'expert_pragmatist', 'expert_devil']);

// Agenci dodani w v34/v35 maja effort zadeklarowany wprost w danych aplikacji (pole AD.effort).
// Heurystyka ponizej trafia w 12 z 13 - wyjatkiem jest tester dostepnosci, ktory swiadomie
// stoi nizej: pracuje wedlug listy kontrolnej WCAG, a nie projektuje rozwiazan.
// Deklaracja z aplikacji ma pierwszenstwo przed heurystyka.
const EFFORT_DECLARED = {
  accessibility_tester: 'medium',
  ux_researcher: 'medium',
};

// Kolejnosc zrodel, od najmocniejszego:
//   1. AGENT_EFFORT z HTML - to widac w aplikacji i to Maciej ustawia
//   2. wartosc juz zapisana w pliku skilla - reczne dostrojenie agenta spoza aplikacji
//   3. heurystyka ponizej - tylko dla czegos, czego nie ma ani tu, ani tam
// UWAGA na 2: dopoki agent jest w AGENT_EFFORT, plik NIE wygrywa. Inaczej kazdy rozjazd
// zamrazalby sie na zawsze - dokladnie tak powstalo 7 rozbieznosci sprzed tej zmiany.
function effortFor(key, model, phase, zAplikacji) {
  if (zAplikacji) return zAplikacji;
  if (EFFORT_DECLARED[key]) return EFFORT_DECLARED[key];
  if (EFFORT_XHIGH.has(key)) return 'xhigh';
  if (phase === 'research') return 'medium';
  if (model === 'haiku') return 'low';
  return 'high';
}

// Effort bywa dostrajany recznie po wygenerowaniu pliku - jesli plik juz istnieje,
// jego wartosc wygrywa z wyliczona. Inaczej kazdy przebieg cofalby te poprawki.
function existingEffort(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const m = fs.readFileSync(filePath, 'utf-8').match(/^effort:\s*(\S+)\s*$/m);
  return m ? m[1] : null;
}

// --- Extract AGENT_EFFORT from HTML ---
// v38: aplikacja pokazuje effort w encyklopedii i pozwala go zmieniac w prawym panelu,
// wiec to ONA jest zrodlem prawdy. Wczesniej generator liczyl swoja heurystyka i wychodzilo
// co innego niz na ekranie - najostrzej przy czterech researcherach na haiku, gdzie
// `model === 'haiku' -> low` strzelalo przed `phase === 'research' -> medium`.
function extractAgentEffort(html) {
  const i = html.indexOf('const AGENT_EFFORT={');
  if (i === -1) return {};
  const j = html.indexOf('};', i);
  if (j === -1) return {};
  const out = {};
  for (const m of html.slice(i, j).matchAll(/(\w+)\s*:\s*'(\w+)'/g)) out[m[1]] = m[2];
  return out;
}

// --- Extract AGENT_EDU_PL from HTML ---
function extractAgentEduPL(html) {
  const startMarker = 'const AGENT_EDU_PL = {';
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) {
    throw new Error('Could not find AGENT_EDU_PL in HTML');
  }

  // Find the matching closing brace by tracking depth
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let endIdx = startIdx + startMarker.length - 1;

  for (let i = endIdx; i < html.length; i++) {
    const ch = html[i];

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
        endIdx = i;
        break;
      }
    }
  }

  const jsBlock = html.substring(startIdx, endIdx + 1);
  const evalBlock = jsBlock.replace('const AGENT_EDU_PL =', 'return');
  const fn = new Function(evalBlock);
  return fn();
}

// --- Generate skill markdown ---
function generateSkillMd(key, agent, meta, effortOverride, zAplikacji) {
  // Extract model from stats
  const modelStat = (agent.stats || []).find(s => s.label === 'Model');
  const model = modelStat ? modelStat.value.toLowerCase() : 'sonnet';

  const lines = [];

  // --- YAML Frontmatter ---
  lines.push('---');
  // Name from tagline (before the dash) - clean up
  const nameFromTagline = agent.tagline ? agent.tagline.split(' - ')[0].trim() : key;
  lines.push(`name: "${nameFromTagline}"`);
  lines.push(`description: "${(agent.missionShort || '').replace(/"/g, '\\"')}"`);
  lines.push(`model: ${model}`);
  lines.push(`effort: ${effortFor(key, model, meta.phase, zAplikacji) || effortOverride}`);
  lines.push(`phase: ${meta.phase}`);
  lines.push(`tools: [${meta.tools.join(', ')}]`);

  if (agent.bestFor && agent.bestFor.length > 0) {
    lines.push('bestFor:');
    agent.bestFor.forEach(b => lines.push(`  - "${b.replace(/"/g, '\\"')}"`));
  }
  if (agent.worstFor && agent.worstFor.length > 0) {
    lines.push('worstFor:');
    agent.worstFor.forEach(w => lines.push(`  - "${w.replace(/"/g, '\\"')}"`));
  }
  lines.push('---');
  lines.push('');

  // --- Body: Operational prompt ---

  // ROLE
  lines.push(`ROLE: ${agent.missionShort || 'No mission defined.'}`);
  lines.push('');

  // INPUT
  if (agent.inputs && agent.inputs.length > 0) {
    lines.push('INPUT:');
    agent.inputs.forEach(inp => lines.push(`- ${inp}`));
    lines.push('');
  }

  // OUTPUT
  if (agent.outputs && agent.outputs.length > 0) {
    lines.push('OUTPUT:');
    agent.outputs.forEach(out => lines.push(`- ${out}`));
    lines.push('');
  }

  // RESPONSIBILITIES (from does)
  if (agent.does && agent.does.length > 0) {
    lines.push('RESPONSIBILITIES:');
    agent.does.forEach((d, i) => lines.push(`${i + 1}. ${d}`));
    lines.push('');
  }

  // RULES (from howItWorks - these are operational steps)
  if (agent.howItWorks && agent.howItWorks.length > 0) {
    lines.push('RULES:');
    agent.howItWorks.forEach(step => {
      lines.push(`- ${step.label}: ${step.desc}`);
    });
    lines.push('');
  }

  // WHAT YOU DO NOT DO (from doesNotDo)
  if (agent.doesNotDo && agent.doesNotDo.length > 0) {
    lines.push('WHAT YOU DO NOT DO:');
    agent.doesNotDo.forEach(d => lines.push(`- ${d}`));
    lines.push('');
  }

  // ANTI-PATTERNS (operational value - prevents common mistakes)
  if (agent.antiPatterns && agent.antiPatterns.length > 0) {
    lines.push('ANTI-PATTERNS:');
    agent.antiPatterns.forEach(ap => lines.push(`- ${ap}`));
    lines.push('');
  }

  // REPORT FORMAT
  lines.push('REPORT FORMAT:');
  lines.push('## Summary');
  lines.push('- [key findings/actions taken]');
  lines.push('## Details');
  lines.push('- [structured output per responsibilities]');
  lines.push('## Issues / Flags');
  lines.push('- [problems found, conflicts, gaps]');
  lines.push('## Recommendation');
  lines.push('- [next steps or GO/NO-GO decision]');

  return lines.join('\n');
}

// --- Main ---
function main() {
  console.log('Reading ' + path.basename(HTML_PATH) + '...');
  const html = fs.readFileSync(HTML_PATH, 'utf-8');

  console.log('Extracting AGENT_EDU_PL...');
  const agents = extractAgentEduPL(html);

  const effortyZAplikacji = extractAgentEffort(html);
  console.log(`AGENT_EFFORT z HTML: ${Object.keys(effortyZAplikacji).length} agentow`);

  const agentKeys = Object.keys(agents);
  console.log(`Found ${agentKeys.length} entries in AGENT_EDU_PL`);

  // Filter to only individual agents (keys that exist in AGENT_META)
  const agentOnlyKeys = agentKeys.filter(k => AGENT_META[k]);
  const otherKeys = agentKeys.filter(k => !AGENT_META[k]);

  console.log(`Individual agents: ${agentOnlyKeys.length}`);
  console.log(`Other entries (presets etc): ${otherKeys.length}`);

  if (otherKeys.length > 0) {
    console.log(`Skipping: ${otherKeys.join(', ')}`);
  }

  // Ensure skills directory exists
  if (!fs.existsSync(SKILLS_DIR)) {
    fs.mkdirSync(SKILLS_DIR, { recursive: true });
  }

  // Generate skill files
  console.log(ONLY_MISSING
    ? '\nTryb: tylko BRAKUJACE pliki (istniejace nietkniete). Pelny przebieg: --all'
    : '\nTryb: --all, NADPISUJE wszystkie pliki skilli (effort z istniejacych zostaje zachowany)');

  let generated = 0;
  let untouched = 0;
  for (const key of agentOnlyKeys) {
    const agent = agents[key];
    const meta = AGENT_META[key];
    const filePath = path.join(SKILLS_DIR, `${key}.md`);
    const istnieje = fs.existsSync(filePath);

    if (ONLY_MISSING && istnieje) { untouched++; continue; }

    const md = generateSkillMd(key, agent, meta, existingEffort(filePath), effortyZAplikacji[key]);
    fs.writeFileSync(filePath, md, 'utf-8');
    generated++;

    const lines = md.split('\n').length;
    const tokens = Math.round(md.length / 4); // rough estimate
    console.log(`  [${generated}] ${key}.md (${lines} lines, ~${tokens} tok)${istnieje ? ' [nadpisany]' : ' [nowy]'}`);
  }

  // v38: rozjazd miedzy tym, co pokazuje aplikacja, a tym, co lezy w pliku skilla, jest
  // niewidoczny - agent po prostu chodzi z innym wysilkiem, niz mysli uzytkownik.
  // Kazdy przebieg ma to wypisac, takze ten domyslny (tylko brakujace pliki).
  // Petla idzie po AGENT_EFFORT, a nie po agentOnlyKeys: 12 agentow ma plik skilla, ale
  // nie ma wpisu w AGENT_META, wiec generator ich nie odswieza - i wlasnie u nich rozjazd
  // najlatwiej przeoczyc, bo zaden przebieg ich nie dotyka.
  const rozjazdy = [];
  for (const key of Object.keys(effortyZAplikacji)) {
    const wPliku = existingEffort(path.join(SKILLS_DIR, `${key}.md`));
    if (wPliku && wPliku !== effortyZAplikacji[key]) {
      const poza = AGENT_META[key] ? '' : ' [poza AGENT_META - do poprawy recznie]';
      rozjazdy.push(`${key}: aplikacja ${effortyZAplikacji[key]}, plik ${wPliku}${poza}`);
    }
  }
  if (rozjazdy.length > 0) {
    console.log(`\nROZJAZD EFFORTU: ${rozjazdy.length} agentow ma w pliku skilla co innego niz w aplikacji.`);
    console.log('Aplikacja jest zrodlem prawdy - uruchom "node generate_skills.js --all", zeby to zrownac:');
    rozjazdy.forEach(r => console.log(`  - ${r}`));
  }

  // Mapa AGENT_META jest recznie utrzymywana i wlasnie dlatego sie rozjechala
  // (13 agentow z v34/v35 nigdy do niej nie trafilo). Niech kazdy przebieg to widzi.
  const bezMeta = agentKeys.filter(k => !AGENT_META[k]);
  const bezPliku = bezMeta.filter(k => !fs.existsSync(path.join(SKILLS_DIR, `${k}.md`)));
  const pozaGeneratorem = bezMeta.filter(k => fs.existsSync(path.join(SKILLS_DIR, `${k}.md`)));

  if (bezPliku.length > 0) {
    console.log(`\nLUKA: ${bezPliku.length} agentow nie ma ani wpisu w AGENT_META, ani pliku skilla.`);
    console.log('Presety z nimi nie zadzialaja. Dopisz im faze i narzedzia do AGENT_META:');
    bezPliku.forEach(k => console.log(`  - ${k}`));
  }
  if (pozaGeneratorem.length > 0) {
    console.log(`\nPoza generatorem: ${pozaGeneratorem.length} agentow ma plik skilla, ale nie ma`);
    console.log('wpisu w AGENT_META - pliki powstaly recznie i generator ich NIE odswieza:');
    pozaGeneratorem.forEach(k => console.log(`  - ${k}`));
  }

  console.log(`\nDone! Wygenerowane: ${generated}, pominiete jako istniejace: ${untouched}`);
  console.log(`Katalog: ${SKILLS_DIR}`);
  console.log('Source: ' + path.basename(HTML_PATH) + ' AGENT_EDU_PL (operational fields only)');
  console.log('Excluded: tagline, whoIs, analogy, glossary, learningQuote, realExample, relatedAgents');
}

main();
