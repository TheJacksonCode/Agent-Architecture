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

const HTML_PATH = path.join(__dirname, 'v32.16', 'AGENT_TEAMS_CONFIGURATOR_v32_16.html');
const COMMANDS_DIR = path.join(os.homedir(), '.claude', 'commands');

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

// --- Main ---
function main() {
  console.log('=== generate_commands.js ===');
  console.log(`HTML: ${HTML_PATH}`);
  console.log(`Target: ${COMMANDS_DIR}\n`);

  console.log('Reading v32.16 HTML...');
  const html = fs.readFileSync(HTML_PATH, 'utf-8');

  console.log('Extracting PR (preset agent compositions)...');
  const pr = extractJSObject(html, 'PR');
  const presetCount = Object.keys(pr).length;
  console.log(`Found ${presetCount} presets in PR\n`);

  // Process command files
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
