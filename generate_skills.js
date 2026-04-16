#!/usr/bin/env node
/**
 * generate_skills.js - v2
 * Extracts agent definitions from v32.16 AGENT_EDU_PL and generates
 * skill .md files for ~/.claude/skills/
 *
 * Only extracts OPERATIONAL fields (not educational/UI fields).
 * Source of truth: v32.16 HTML
 *
 * Usage: node generate_skills.js
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// --- Config ---
const HTML_PATH = path.join(__dirname, 'v32.16', 'AGENT_TEAMS_CONFIGURATOR_v32_16.html');
const SKILLS_DIR = path.join(os.homedir(), '.claude', 'skills');

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
};

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
function generateSkillMd(key, agent, meta) {
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
  console.log('Reading v32.16 HTML...');
  const html = fs.readFileSync(HTML_PATH, 'utf-8');

  console.log('Extracting AGENT_EDU_PL...');
  const agents = extractAgentEduPL(html);

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
  let generated = 0;
  for (const key of agentOnlyKeys) {
    const agent = agents[key];
    const meta = AGENT_META[key];
    const md = generateSkillMd(key, agent, meta);
    const filePath = path.join(SKILLS_DIR, `${key}.md`);

    fs.writeFileSync(filePath, md, 'utf-8');
    generated++;

    const lines = md.split('\n').length;
    const tokens = Math.round(md.length / 4); // rough estimate
    console.log(`  [${generated}/${agentOnlyKeys.length}] ${key}.md (${lines} lines, ~${tokens} tok)`);
  }

  console.log(`\nDone! Generated ${generated} skill files in ${SKILLS_DIR}`);
  console.log('Source: v32.16 AGENT_EDU_PL (operational fields only)');
  console.log('Excluded: tagline, whoIs, analogy, glossary, learningQuote, realExample, relatedAgents');
}

main();
