# ROADMAP.md -- Agent Architecture Designer
## Concrete implementation plan v0.1.0 -> v0.4.0+

**Author:** Synthesizer [OPUS] | Date: 2026-04-07
**Sources:** 6 research reports + Five Minds Critica validations + ALPHA/OMEGA Verdict
**Format:** Each step has: What / Where / LOC estimate / Dependencies / Priority

---

## LEGEND

| Symbol | Meaning |
|--------|---------|
| MUST | Blocking -- without this, no publication or no point |
| SHOULD | Significantly improves the product, planned |
| NICE | Nice to have, but can wait |
| LOC | Estimated lines of code (net, excluding comments) |
| [dep: X] | Dependency -- X must be completed first |

---

## PHASE 0 -- "Go Public" (this week, 2-4 days)

**Goal:** First public GitHub repository with a working application.
**Required new LOC:** ~200 (README + config files, not the application)
**State after Phase 0:** URL https://github.com/TheJacksonCode/agent-architecture-designer works.

---

### F0-01: GitHub Repository Initialization

**What:** Create a public repo on GitHub with proper settings.

**Where:** GitHub.com -> New Repository
- Repository name: `agent-architecture-designer`
- Description: "Visual multi-agent system designer for Claude Code — drag & drop 28 agents, Five Minds Protocol, HITL gates, Live Simulation"
- Visibility: Public
- Initialize with README: NO (we will push)
- License: MIT (will add manually)

**Commands:**
```bash
cd "C:/Projekty Claude Code/Agent_Architecture"
git init
git remote add origin https://github.com/TheJacksonCode/agent-architecture-designer.git
```

**LOC:** 0 (configuration)
**Dependencies:** None
**Priority:** MUST

---

### F0-02: File Structure Preparation

**What:** Create the repository file structure. The current directory is chaotic -- cleanup required.

**Where:** Local file system

**Target structure:**
```
agent-architecture-designer/
├── index.html                     <- symlink or copy of v28
├── AGENT_TEAMS_CONFIGURATOR_v28.html  <- main application
├── plugin.json                    <- Claude Code plugin descriptor
├── README.md                      <- English README with GIF
├── LICENSE                        <- MIT
├── .gitignore
├── .claude/
│   ├── skills/
│   │   ├── five-minds/SKILL.md    <- existing
│   │   └── hitl-pipeline/SKILL.md <- existing
│   └── settings.local.json        <- EXCLUDED via .gitignore
├── versions/                      <- version archive (v1-v27)
│   └── (optionally, if we want to keep them)
└── docs/                          <- screenshots for README
    └── hero.gif                   <- KEY ASSET
```

**What to do with existing files:**
- `analizy-html/`, `analizy-md/`, `live-monitor-research/`, `ikony/` -- DO NOT commit (add to .gitignore or don't track)
- `TRAINING_CURRICULUM_AI_ENGINEER.md` -- DO NOT commit (personal document)
- `CLAUDE.md` -- commit (already configured)
- `generate_skills.js` -- commit (utility)

**.gitignore:**
```
# Personal research files
analizy-html/
analizy-md/
live-monitor-research/
ikony/
podcast/

# Personal/local
TRAINING_CURRICULUM_AI_ENGINEER.md
.claude/settings.local.json
agent-architect/

# OS
.DS_Store
Thumbs.db
desktop.ini

# Node (if we end up using it)
node_modules/
```

**LOC:** ~20 (.gitignore)
**Dependencies:** F0-01
**Priority:** MUST

---

### F0-03: Security Audit v28 -- XSS Check

**What:** Review v28 code for XSS before public exposure.

**Where:** `AGENT_TEAMS_CONFIGURATOR_v28.html`

**What to check:**
1. Every use of `innerHTML` -- is the data from localStorage/user input or from constants?
2. JSON import (if it exists) -- does it use `JSON.parse()` + whitelist?
3. `eval()` -- should be ZERO occurrences
4. `document.write()` -- should be ZERO occurrences
5. URL params (`window.location.hash` etc.) -- check if they are injected into the DOM

**How to check:**
```bash
grep -n "innerHTML" AGENT_TEAMS_CONFIGURATOR_v28.html | grep -v "//.*innerHTML"
grep -n "eval(" AGENT_TEAMS_CONFIGURATOR_v28.html
grep -n "document.write" AGENT_TEAMS_CONFIGURATOR_v28.html
```

**Fix if a problem is found:**
- Replace `el.innerHTML = userInput` with `el.textContent = userInput`
- For HTML structure from constants: OK (because const = our control, not user input)

**LOC:** ~10-30 (fixes, if needed)
**Dependencies:** None
**Priority:** MUST

---

### F0-04: plugin.json -- Claude Code Plugin Descriptor

**What:** Create a `plugin.json` file in the repo root, required for Claude Code marketplace.

**Where:** `plugin.json` (root)

**Content:**
```json
{
  "name": "agent-architecture-designer",
  "display_name": "Agent Architecture Designer",
  "description": "Visual multi-agent system designer for Claude Code. Drag & drop 28 specialized agents onto a canvas, connect them, select models (Opus/Sonnet/Haiku), and generate a complete system prompt for your agent team. Features Five Minds Protocol debate, HITL Decision Gates, Live Simulation, and an Agent Encyclopedia.",
  "version": "0.1.0",
  "author": "TheJacksonCode",
  "homepage": "https://github.com/TheJacksonCode/agent-architecture-designer",
  "keywords": [
    "multi-agent",
    "claude-code",
    "five-minds",
    "hitl",
    "visual-designer",
    "orchestration",
    "agent-teams"
  ],
  "skills": [
    {
      "name": "five-minds",
      "path": ".claude/skills/five-minds/SKILL.md"
    },
    {
      "name": "hitl-pipeline",
      "path": ".claude/skills/hitl-pipeline/SKILL.md"
    }
  ],
  "app": {
    "path": "AGENT_TEAMS_CONFIGURATOR_v28.html",
    "type": "html"
  }
}
```

**IMPORTANT:** Before the final commit, verify the current plugin.json format at:
`https://docs.anthropic.com/claude-code/plugins` or `claude code --help plugin`

**LOC:** ~30 (JSON)
**Dependencies:** F0-02
**Priority:** MUST

---

### F0-05: LICENSE -- MIT

**What:** LICENSE file with MIT License text.

**Where:** `LICENSE` (root)

**Content:**
```
MIT License

Copyright (c) 2026 TheJacksonCode

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**LOC:** 21
**Dependencies:** None
**Priority:** MUST

---

### F0-06: README.md -- English, with Hero GIF

**What:** README.md for the public repo. This is the first thing a visitor sees.

**Where:** `README.md` (root)

**Structure (order matters):**
```markdown
# Agent Architecture Designer

> Visual multi-agent system designer for Claude Code

[HERO GIF -- 15 seconds: preset load -> Live Simulation -> agents talking -> HITL gate]

[![MIT License](badge)] [![Claude Code](badge)] [![28 Agents](badge)]

## What it does

One-sentence: Design, configure, and generate prompts for multi-agent Claude Code teams — visually.

## Key Features

- **Visual Canvas**: Drag & drop 28 specialized agents, draw connections
- **Five Minds Protocol**: Structured debate with 4 experts + Devil's Advocate (unique innovation)
- **HITL Decision Gates**: 3 human checkpoints with 120s countdown
- **Live Simulation**: Agents "talk" to each other with animated speech bubbles
- **29 Presets**: From Solo Agent to Deep Five Minds Ultimate (29 agents)
- **Agent Encyclopedia**: Research-backed prompts, analogies, anti-patterns for all 28 agents
- **Dark/Light Theme**: Full CSS variable system

## Quick Start

1. Open [Agent Architecture Designer](https://theJacksonCode.github.io/agent-architecture-designer/)
2. Select a preset (try "Deep Five Minds Ultimate")
3. Click "Live Simulation" to see agents interact
4. Click "Generuj Prompt" to get your system prompt

No installation. No npm. No build step. Just open the HTML file.

## Five Minds Protocol

[Short description -- what it is, why it's unique]

## 28 Agents

[Table or category list]

## Claude Code Plugin

[How to install as a plugin]

## Screenshots

[3-4 screenshots]

## Development

Single HTML file (~3500 lines). No dependencies. See CLAUDE.md for versioning rules.

## License

MIT
```

**What is the hero GIF:** Screen recording (OBS/ShareX/Gyroflow) + conversion to GIF (gifski or ffmpeg).
Duration: 15 seconds. Size: max 8MB (GitHub limit). Resolution: 1280x720.

**LOC:** ~100 (Markdown) + hero GIF (separate asset)
**Dependencies:** F0-03 (must have a clean application before screenshots)
**Priority:** MUST (README without GIF can be a placeholder at launch)

---

### F0-07: GitHub Pages -- Configuration

**What:** Enable GitHub Pages so the application is accessible via URL.

**Where:** GitHub.com -> repo Settings -> Pages

**Steps:**
1. Settings -> Pages
2. Source: Deploy from a branch
3. Branch: main / root
4. Click: Save
5. Wait ~2 minutes
6. URL: `https://thejacksoncode.github.io/agent-architecture-designer/`

**Verification:** Open the URL, check if v28 loads.

**LOC:** 0 (UI configuration)
**Dependencies:** F0-02, first commit
**Priority:** MUST

---

### F0-08: Tags and Repository Description

**What:** Add tags and description on GitHub for discoverability.

**Where:** GitHub.com -> repo -> "About" gear icon

**Description:** `Visual multi-agent system designer for Claude Code. 28 agents, Five Minds Protocol, HITL gates, Live Simulation.`

**Tags (Topics):**
```
multi-agent, claude-code, five-minds, hitl, visual-designer,
agent-orchestration, anthropic, ai-agents, no-build, single-file
```

**LOC:** 0 (configuration)
**Dependencies:** F0-07
**Priority:** SHOULD

---

### F0-09: Show HN Draft

**What:** Prepare a Hacker News post (Show HN). Do not publish yet -- draft for later (after getting some stars).

**Show HN format (rules):**
- Title: `Show HN: Agent Architecture Designer – visual multi-agent builder for Claude Code`
- NOT promotional, NOT "amazing"
- YES: technical, what it does, what is unique

**Draft content:**
```
I built a visual designer for multi-agent Claude Code systems.
You drag agents onto a canvas, connect them, and get a complete system prompt.

What's technically interesting:
- Five Minds Protocol: structured adversarial debate with 4 specialized experts + 
  Devil's Advocate before any decision solidifies. No direct equivalent in public 
  agent frameworks I've found.
- 3 HITL Decision Gates with 120s countdown and auto-fallback
- Live Simulation: pre-scripted message templates make agents "talk" to each other,
  showing how information flows through the system
- 28 agents with research-backed prompts (ROLA/INPUT/OUTPUT/ZASADY format)
- Zero dependencies, single HTML file, works offline

Technical stack: Vanilla JS + inline SVG + Canvas 2D + Web Animations API + localStorage.
No React, no npm, no build step. Open the HTML file and it works.

GitHub: [url]
Live demo: [github pages url]

Happy to discuss the Five Minds Protocol design or the agent prompt structure.
```

**LOC:** 0 (text draft)
**Dependencies:** F0-07 (we need a URL)
**Priority:** SHOULD

---

**PHASE 0 SUMMARY:**

| Step | What | LOC | Time |
|------|------|-----|------|
| F0-01 | Git init + remote | 0 | 10 min |
| F0-02 | File structure + .gitignore | 20 | 20 min |
| F0-03 | XSS audit v28 | 0-30 | 30 min |
| F0-04 | plugin.json | 30 | 20 min |
| F0-05 | LICENSE | 21 | 5 min |
| F0-06 | README.md + hero GIF | 100 + GIF | 2-3 h |
| F0-07 | GitHub Pages | 0 | 10 min |
| F0-08 | Tags/description | 0 | 5 min |
| F0-09 | Show HN draft | 0 | 30 min |
| **TOTAL** | | ~170 LOC | **~5 h** |

---

## PHASE 1 -- v0.2.0 (week 2, ~4-5 days)

**Goal:** Three key features that address the #1 community requests.
**Required new LOC:** ~700-800 (net after audit)
**State after Phase 1:** Token cost visible, user can create custom agents, Mermaid export.

---

### F1-01: Token Cost HUD -- Cost Visibility

**Priority:** MUST (Reddit #1 request, X, Forum -- C4 consensus)

**What:** Show estimated token cost per agent, per phase, and total during simulation.

**Where:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- Function: new `calcTokenCost()` + modification of `simStep()`
- UI: extension of existing topbar (already has metrics) + new `#cost-hud` element
- Modification: `showND()` (agent sidebar) -- add cost estimate per run

**Implementation data:**

```javascript
// Claude API prices (April 2026)
const MODEL_COSTS = {
  opus:   { input: 15.00,  output: 75.00  }, // per 1M tokens
  sonnet: { input:  3.00,  output: 15.00  },
  haiku:  { input:  0.25,  output:  1.25  }
};

// Token estimates per agent (educational, not real-time)
const AGENT_TOKEN_ESTIMATES = {
  orchestrator:  { input: 2000, output: 500 },
  synth:         { input: 3000, output: 1000 },
  planner:       { input: 1500, output: 400 },
  res_tech:      { input: 2500, output: 800 },
  // ... for all 28 agents
  // default:    { input: 1500, output: 400 }
};

function calcAgentCost(agentId, model) {
  const est = AGENT_TOKEN_ESTIMATES[agentId] || { input: 1500, output: 400 };
  const costs = MODEL_COSTS[model] || MODEL_COSTS.sonnet;
  const inputCost  = (est.input  / 1_000_000) * costs.input;
  const outputCost = (est.output / 1_000_000) * costs.output;
  return { inputCost, outputCost, total: inputCost + outputCost };
}

function calcTotalCost(agents) {
  return agents.reduce((sum, a) => sum + calcAgentCost(a.id, a.model).total, 0);
}
```

**UI changes:**
1. In the topbar (already has space): `[$0.14]` clickable badge -> dropdown
2. Dropdown: table per phase + per agent + total
3. In agent sidebar (`showND()`): add `"Est. cost: $0.03/run"` below the model
4. In `simStep()`: accumulate costs in `simState.totalCost`, update HUD

**LOC:** ~200 (new functions + UI)
**Dependencies:** None (independent feature)

---

### F1-02: Agent Creator -- Custom Agent Builder

**Priority:** SHOULD

**What:** User can create a custom agent (beyond the 28 predefined ones) and add it to the canvas.

**Where:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- New button: `[+ New Agent]` in the left panel (below the agent list)
- New function: `openAgentCreator()` -> modal with form
- New function: `saveCustomAgent(data)` -> saves to localStorage + adds to AD
- Modification: `renderPaletteList()` -- show custom agents with a "custom" icon

**Custom agent data schema:**

```javascript
// localStorage: 'acV28_custom_agents' (array)
const CUSTOM_AGENT_SCHEMA = {
  id:          String,  // 'custom_' + timestamp
  name:        String,  // max 30 chars
  role:        String,  // max 100 chars (role description)
  phase:       String,  // 'strategy'|'research'|'build'|'qa'|'fiveminds'|'hitl'
  model:       String,  // 'opus'|'sonnet'|'haiku'
  prompt:      String,  // max 2000 chars (agent prompt)
  color:       String,  // hex color picker
  icon:        String,  // selected from a set of 10 icons (Unicode or SVG)
  isCustom:    true,
  createdAt:   Number   // timestamp
};
```

**Form (fields):**
```
[Agent name]            -- text input, max 30 characters
[Phase]                 -- select: Strategy / Research / Build / QA / Five Minds
[Model]                 -- radio: Opus / Sonnet / Haiku (with prices)
[Role (description)]    -- textarea, 1 line, max 100 characters
[Prompt]                -- textarea, max 2000 characters, with template placeholder
[Color]                 -- color picker (8 presets + custom)
[Icon]                  -- 10 SVG options to choose from
[SAVE] [CANCEL]
```

**Where in the UI:**
- Modal overlay with glassmorphism (like existing modals)
- "Edit" button on custom agent in palette
- "Delete custom agent" button (with confirmation)

**LOC:** ~300 (form + logic + localStorage)
**Dependencies:** None

---

### F1-03: Mermaid Export -- Diagram Export

**Priority:** SHOULD

**What:** Generate Mermaid flowchart code from the current canvas state. User copies the code to clipboard.

**Where:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- New button: `[Export Mermaid]` in the topbar (or File menu)
- New function: `generateMermaidCode()` -> returns a string
- New function: `showMermaidModal(code)` -> modal with textarea + copy button

**Generation algorithm:**

```javascript
function generateMermaidCode() {
  const lines = ['flowchart TD'];
  
  // Add styles per phase
  lines.push('  classDef strategy fill:#818CF8,color:#fff');
  lines.push('  classDef research fill:#06B6D4,color:#fff');
  lines.push('  classDef build fill:#34D399,color:#fff');
  lines.push('  classDef qa fill:#F87171,color:#fff');
  lines.push('  classDef fiveminds fill:#F59E0B,color:#fff');
  lines.push('  classDef hitl fill:#E879F9,color:#fff');
  
  // Add nodes
  AD.forEach(agent => {
    const label = `${agent.name}\\n[${agent.model}]`;
    lines.push(`  ${agent.id}["${label}"]`);
    lines.push(`  class ${agent.id} ${agent.cat}`);
  });
  
  // Add connections
  CONNECTIONS.forEach(conn => {
    lines.push(`  ${conn.from} --> ${conn.to}`);
  });
  
  return lines.join('\n');
}
```

**Modal UI:**
```
+--[Export Mermaid Diagram]--+
| flowchart TD                |
|   orchestrator["Orchestr."] |
|   ...                       |
|                             |
| [Copy to clipboard] [Close] |
+-----------------------------+
```

**LOC:** ~150 (generation function + modal)
**Dependencies:** None (independent from F1-01, F1-02)

---

### F1-04: Export/Import Configuration JSON

**Priority:** SHOULD (mitigates risk R3 -- localStorage migration)

**What:** User can export the entire canvas state to JSON and load it later (or on a different device).

**Where:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- New button: `[Export]` and `[Import]` in the topbar
- New function: `exportConfig()` -> downloads JSON via Blob URL
- New function: `importConfig(file)` -> loads from `<input type="file">`

**JSON format:**
```json
{
  "version": "28",
  "exported": "2026-04-07T12:00:00Z",
  "agents": [
    { "id": "orchestrator", "x": 300, "y": 200, "model": "opus" }
  ],
  "connections": [
    { "from": "orchestrator", "to": "planner" }
  ],
  "customAgents": [],
  "theme": "dark"
}
```

**Security:** Import must validate the JSON structure. Whitelist allowed keys. NEVER `eval()`.

```javascript
function importConfig(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    // Whitelist validation
    if (!data.agents || !Array.isArray(data.agents)) throw new Error('Invalid');
    const ALLOWED_AGENT_KEYS = ['id', 'x', 'y', 'model'];
    data.agents = data.agents.map(a => {
      const clean = {};
      ALLOWED_AGENT_KEYS.forEach(k => { if (a[k] !== undefined) clean[k] = a[k]; });
      return clean;
    });
    // Load
    loadFromExportedConfig(data);
  } catch (e) {
    showToast('Invalid configuration file', 'error');
  }
}
```

**LOC:** ~150
**Dependencies:** None

---

**PHASE 1 SUMMARY:**

| Step | Feature | LOC | Time |
|------|---------|-----|------|
| F1-01 | Token Cost HUD | 200 | 1 day |
| F1-02 | Custom Agent Builder | 300 | 2 days |
| F1-03 | Mermaid Export | 150 | 0.5 day |
| F1-04 | Export/Import JSON | 150 | 0.5 day |
| **TOTAL** | | ~800 LOC | ~4-5 days |

**SIZE ALERT:** v28 (~3500) + 800 = ~4300 LOC. Within the 5000 limit. OK.

**Commit strategy:** One commit per feature (F1-01, F1-02, F1-03, F1-04 separately).
**Tag:** `v0.2.0` after completing Phase 1.

---

## PHASE 2 -- v0.3.0 (week 3-4)

**Goal:** Deeper integration with the Claude Code ecosystem + feedback loop.
**Required new LOC:** ~600-700
**State after Phase 2:** Hooks generator, EXECUTION_REPORT import, Skills upgrade.

---

### F2-01: Hooks Generator -- settings.json Generation

**Priority:** MUST for Claude Code integration (C2 consensus)

**What:** User designs an agent pipeline, and the application generates a ready-to-use `settings.json` fragment with hooks for Claude Code.

**Where:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- New panel/tab: "Hooks" in the right sidebar or a new modal
- New function: `generateHooksConfig()` -> JSON string

**Output format:**
```json
{
  "hooks": {
    "command": [
      {
        "matcher": "research",
        "command": "echo 'Research phase starting' >> agent_log.txt"
      }
    ],
    "prompt": [
      {
        "matcher": ".*",
        "command": "node .claude/hooks/token-budget.js"
      }
    ]
  }
}
```

**UI:**
```
+--[Hooks Generator]--+
| Select agents for hooks:
| [ ] Post-Research checkpoint
| [ ] Pre-Build approval
| [x] Token budget warning
| [x] Phase transition log
|
| Output: settings.json fragment
| [textarea with code]
| [Copy to clipboard]
+--------------------+
```

**Hook types to generate (from Docs research):**
- `command` -- run a command after/before a phase
- `http` -- send an HTTP request (webhook to an external system)
- `prompt` -- inject instructions into every agent prompt
- `agent` -- callback on subagent spawn

**LOC:** ~200
**Dependencies:** F0-04 (plugin.json must exist)

---

### F2-02: Feedback Loop -- EXECUTION_REPORT.json Import

**Priority:** SHOULD

**What:** After actually running agents in Claude Code, the user can load an `EXECUTION_REPORT.json` into the application, which shows what happened.

**Where:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- New button: `[Load Report]` in the Live Simulation section
- New function: `importExecutionReport(json)` -> animates the canvas state based on the report
- Modification: Dialog Timeline -- shows ACTUAL messages from the report

**EXECUTION_REPORT.json format:**
```json
{
  "schema": "execution-report-v1",
  "preset": "deep_five_minds",
  "started_at": "2026-04-07T10:00:00Z",
  "completed_at": "2026-04-07T10:23:45Z",
  "phases": [
    {
      "phase": "strategy",
      "agents": [
        {
          "id": "orchestrator",
          "model": "opus",
          "status": "done",
          "tokens_input": 1823,
          "tokens_output": 412,
          "duration_ms": 4521,
          "message": "Project analysis complete. Plan: ..."
        }
      ]
    }
  ],
  "hitl_decisions": [
    {
      "gate": "post_research",
      "choice": "approve",
      "timestamp": "2026-04-07T10:08:30Z"
    }
  ],
  "total_cost_usd": 0.23,
  "total_tokens": 45821
}
```

**After loading:**
- Canvas shows agents with actual statuses (done/error)
- Dialog Timeline is filled with actual messages
- Cost HUD shows ACTUAL cost (not estimated)
- New badge: "Based on real execution" instead of "Simulation"

**LOC:** ~200
**Dependencies:** F1-04 (import mechanism already exists)

---

### F2-03: Skills Upgrade -- Agent Designer Skill

**Priority:** SHOULD (C2 consensus -- deeper into the Anthropic ecosystem)

**What:** Create a new skill `.claude/skills/agent-designer/SKILL.md` that allows a Claude Code agent to use Agent Architecture Designer as a tool.

**Where:** `.claude/skills/agent-designer/SKILL.md` (new file)

**SKILL.md content:**
```markdown
---
name: agent-designer
description: Design a multi-agent system visually using Agent Architecture Designer
---

# Agent Architecture Designer Skill

When the user asks to design a multi-agent system, create an agent team,
or plan agent orchestration:

1. Ask: "Jaki jest cel systemu agentow?" (What is the goal of the agent system?)
2. Suggest a preset from the 29 available presets based on the goal:
   - Simple research task -> "Research Swarm" (6 agents)
   - Code feature -> "Feature Sprint" (5 agents)
   - Complex decision -> "Five Minds Protocol" (6 agents)
   - Full project -> "Deep Five Minds Ultimate" (29 agents)
3. Open Agent Architecture Designer: [url]
4. Guide the user through:
   - Loading the preset
   - Customizing agents
   - Generating the final prompt

## Available Presets

[list of 29 presets with descriptions]

## Usage

/agent-designer [optional: goal description]
```

**LOC:** ~100 (Markdown)
**Dependencies:** F0-04, F0-07 (must have a live URL)

---

### F2-04: Interactive Scenarios -- "Try This" Launcher

**Priority:** NICE

**What:** Interactive onboarding -- 5 short guides on "how to use the application for X". Each scenario is a sequence of steps with highlighted elements and descriptions.

**Where:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- New button: `[Guides]` or `[Try This]` in the topbar
- New function: `startScenario(id)` -> animated step-by-step tour
- Builds on the existing Encyclopedia mode -- same mechanism

**5 Scenarios:**
1. "Your first agent team" (15 steps, basic)
2. "Run a Five Minds debate" (10 steps)
3. "Research a project with 6 researchers" (8 steps)
4. "Full project simulation" (12 steps with Live Sim)
5. "Create your own agent" (6 steps, [dep: F1-02])

**LOC:** ~150
**Dependencies:** F1-02 (for scenario 5)

---

**PHASE 2 SUMMARY:**

| Step | Feature | LOC | Time |
|------|---------|-----|------|
| F2-01 | Hooks Generator | 200 | 1 day |
| F2-02 | Execution Report Import | 200 | 1-2 days |
| F2-03 | Agent Designer Skill | 100 | 0.5 day |
| F2-04 | Interactive Scenarios | 150 | 1 day |
| **TOTAL** | | ~650 LOC | ~4-5 days |

**SIZE ALERT:** ~4300 (after F1) + 650 = ~4950 LOC. CLOSE TO THE LIMIT. Before Phase 2: audit -100 LOC.

**Tag:** `v0.3.0` after completing Phase 2.

---

## PHASE 3 -- v0.4.0+ (later, week 5+)

**Goal:** Features that require more time or external dependencies.
**Note:** Do not plan them in detail now -- after Phase 2 there will be new data from the community.

---

### F3-01: HTML Modularization -- Plan for Exceeding 5000 Lines

**Priority:** MUST if we exceed the limit (which will happen around ~v0.4.0)

**What:** Preserving the single-file philosophy with growing code.

**Strategy:**

**Variant A (preferred) -- Lazy Initialization:**
```javascript
// At the top of the file
const FEATURES = {
  liveMonitor: true,
  hitlGates: true,
  agentCreator: true,   // F1-02
  hooksGen: true,       // F2-01
  mermaidExport: true,  // F1-03
};

// Modules are not loaded into memory until needed
let _agentCreatorModule = null;
function getAgentCreator() {
  if (!_agentCreatorModule) {
    _agentCreatorModule = initAgentCreatorModule(); // lazy init
  }
  return _agentCreatorModule;
}
```

**Variant B (build step) -- only if A fails:**
```bash
# build.sh (not committed to the repository as a requirement)
#!/bin/bash
cat src/header.html \
    src/styles.css \
    src/agent-data.js \
    src/preset-data.js \
    src/knowledge-data.js \
    src/simulation.js \
    src/canvas.js \
    src/ui.js \
    src/footer.html > dist/index.html
echo "Built: $(wc -l dist/index.html) lines"
```
Distribution: ALWAYS `dist/index.html` -- a single file. The build is optional for developers.

**CSS Audit (always before a major new feature):**
- Grep for selectors that have no corresponding DOM elements
- Remove vendor prefixes (-moz-) for Firefox 36+ features
- Merge duplicate `@keyframes` (e.g., identical `pulse` animations)
- Target: -50 LOC per audit

**LOC:** 0-50 (refactoring, not new code)
**Dependencies:** Only after reaching ~4800 lines

---

### F3-02: TypeScript Export -- Agent Definition Export

**Priority:** SHOULD (after collecting community feedback)

**What:** Generate TypeScript interface definitions for the designed agent system.

**Example output:**
```typescript
// Generated by Agent Architecture Designer v0.4.0

export interface AgentConfig {
  id: string;
  name: string;
  model: 'opus' | 'sonnet' | 'haiku';
  phase: 'strategy' | 'research' | 'build' | 'qa' | 'fiveminds' | 'hitl';
  prompt: string;
}

export const AGENT_TEAM: AgentConfig[] = [
  {
    id: 'orchestrator',
    name: 'Orkiestrator',
    model: 'opus',
    phase: 'strategy',
    prompt: '...'
  },
  // ...
];

export type AgentId = typeof AGENT_TEAM[number]['id'];
```

**LOC:** ~100 (generator function + modal)
**Dependencies:** F1-03 (same mechanism as Mermaid export)

---

### F3-03: Python Export -- Configuration Export for Claude Agent SDK

**Priority:** SHOULD

**What:** Generate ready-to-use Python code for the Claude Agent SDK based on the designed system.

**Example output:**
```python
# Generated by Agent Architecture Designer v0.4.0
from anthropic import Anthropic

client = Anthropic()

def run_orchestrator(task: str) -> str:
    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=8096,
        system="""[ROLA: Orkiestrator...]""",
        messages=[{"role": "user", "content": task}]
    )
    return response.content[0].text

def run_pipeline(task: str) -> dict:
    # Phase 1: Strategy
    plan = run_orchestrator(task)
    # ...
```

**LOC:** ~150 (generator + modal)
**Dependencies:** F1-04 (needs agent data)

---

### F3-04: Community Dashboard -- Public Preset Directory

**Priority:** NICE

**What:** A community page where users share their presets (custom configurations).

**Stack:** GitHub Discussions as backend (issues/discussions as a database) + fetch() to the GitHub API.

**How it works:**
1. User exports a config JSON (F1-04)
2. Clicking "Share" -> opens a GitHub issue with a template
3. Dashboard (separate HTML page or section in the app) fetches GitHub issues with the `preset-share` tag
4. Each preset has: name, description, agent count, author, download count (approximated via reactions)

**LOC:** ~300 (additional page or section)
**Dependencies:** F1-04, GitHub repo public, active community (>20 users)

---

### F3-05: MCP Integration -- Real Agents (experimental)

**Priority:** NICE (requires a backend, beyond current scope)

**What:** Running the designed agent system directly from the application via MCP.

**Why later:**
- Requires a backend (node.js server or serverless)
- Requires auth (API keys)
- Breaks the single-file philosophy
- Scope is 10x larger than any other feature

**Alternative that can be done now:** EXECUTION_REPORT.json import (F2-02) -- "bring your own execution results."

**LOC:** n/a (beyond Phase 3 scope)
**Dependencies:** Backend infrastructure (new project)

---

**PHASE 3 SUMMARY:**

| Step | Feature | LOC | Priority | When |
|------|---------|-----|----------|------|
| F3-01 | Modularization | 0-50 | MUST (if >5000) | On demand as needed |
| F3-02 | TypeScript Export | 100 | SHOULD | After feedback |
| F3-03 | Python Export | 150 | SHOULD | After feedback |
| F3-04 | Community Dashboard | 300 | NICE | After 100+ stars |
| F3-05 | MCP Integration | n/a | NICE | New project |

---

## Overall Schedule

```
WEEK 1 (this week)
└── PHASE 0: GitHub setup, README, GIF, plugin.json
    -> Goal: repo public, GitHub Pages working

WEEK 2
└── PHASE 1: Token Cost HUD, Custom Agents, Mermaid Export, JSON Export
    -> Goal: tag v0.2.0

WEEK 3-4
└── PHASE 2: Hooks Generator, Execution Report, Skills upgrade
    -> Goal: tag v0.3.0

WEEK 5+
└── PHASE 3: Based on community feedback
    -> Goal: tag v0.4.0 (flexible date)
```

---

## Success Metrics

| Metric | Target v0.1.0 | Target v0.2.0 | Target v0.3.0 |
|--------|--------------|--------------|--------------|
| GitHub Stars | 10+ | 50+ | 100+ |
| GitHub Pages visits | -- | 200+/month | 500+/month |
| Open issues | 0 | 5+ (feature requests) | 10+ |
| Plugin installs | -- | -- | 50+ |
| HTML file LOC | <3600 | <4300 | <5000 |

---

## Anti-Patterns to Avoid

Based on ALPHA/OMEGA critique:

1. **DO NOT add new agents without removing dead code** -- every new agent must be preceded by an audit (-50 LOC)
2. **DO NOT plan feature X before feature Y is finished** -- sequence matters
3. **DO NOT commit without a README update** -- README always reflects the current state
4. **DO NOT add external dependencies** -- zero CDN, zero npm, this is the project philosophy
5. **DO NOT skip security** -- XSS audit before every new input/import feature

---

*ROADMAP v1.0 | Synthesizer [OPUS] | 2026-04-07*
*Based on: 7 research reports + Five Minds Protocol debate + ALPHA/OMEGA Verdict*
*Next revision: after reaching v0.2.0 or after collecting initial community issues*
