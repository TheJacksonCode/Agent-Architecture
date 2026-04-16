# Skills Architecture - 35 Reusable Agents

**Date:** 2026-04-16 | **Updated:** 2026-04-16 (v32.16 regeneration)
**Source of truth:** `v32.16/AGENT_TEAMS_CONFIGURATOR_v32_16.html` (AGENT_EDU_PL object, lines ~4703-7642)

## Overview

35 agents extracted as individual skill files in `~/.claude/skills/`. Each agent is a self-contained `.md` file with YAML frontmatter + full operational prompt. Skills are global - they work in every project, not just Agent Architecture.

**Important:** Skills are reference files (single source of truth for agent prompts). They are NOT auto-discovered by Claude Code at session start. Commands (`.claude/commands/`) use these prompts when orchestrating teams.

## File Structure

```
~/.claude/skills/                    # GLOBAL (all projects)
  orchestrator.md                    # Strategy / opus
  analyst.md                        # Strategy / sonnet
  planner.md                        # Strategy / sonnet
  synthesizer.md                    # Strategy / sonnet
  res_tech.md                       # Research / haiku
  res_ux.md                         # Research / haiku
  res_reddit.md                     # Research / haiku
  res_x.md                          # Research / sonnet
  res_github.md                     # Research / sonnet
  res_forums.md                     # Research / sonnet
  res_docs.md                       # Research / haiku
  res_critic.md                     # Research / sonnet
  backend.md                        # Build / sonnet
  frontend.md                       # Build / sonnet
  designer.md                       # Build / sonnet
  writer.md                         # Build / sonnet
  feature.md                        # Build / sonnet
  integrator.md                     # Build / sonnet
  db_architect.md                   # Build / sonnet
  observability_engineer.md         # Build / sonnet
  qa_security.md                    # QA / haiku
  qa_quality.md                     # QA / haiku
  qa_perf.md                        # QA / haiku
  qa_manager.md                     # QA / sonnet
  expert_innovator.md               # Debate / opus
  expert_analyst.md                 # Debate / opus
  expert_user.md                    # Debate / opus
  expert_pragmatist.md              # Debate / opus
  expert_devil.md                   # Debate / opus
  decision_presenter.md             # HITL / haiku
  gtm_strategist.md                 # Product / sonnet
  statistician.md                   # Data / sonnet
  eda_analyst.md                    # Data / sonnet
  control_mapper.md                 # Compliance / sonnet
  telemetry_surfer.md               # Ops / sonnet
```

## Skill File Format

```yaml
---
name: "Polish name from v32.16 tagline"
description: "Full mission statement from AGENT_EDU_PL.missionShort"
model: opus/sonnet/haiku
phase: strategy/research/build/qa/debate/hitl/product/data/compliance/ops
tools: [Read, Write, Edit, Bash, Grep, Glob, Agent, WebSearch, WebFetch]
bestFor:
  - "When to use this agent (from AGENT_EDU_PL.bestFor)"
worstFor:
  - "When NOT to use this agent (from AGENT_EDU_PL.worstFor)"
---

ROLE: [from missionShort - full Polish mission statement]
INPUT: [from inputs - what the agent receives]
OUTPUT: [from outputs - what the agent produces]
RESPONSIBILITIES: [from does - numbered operational duties]
RULES: [from howItWorks - operational steps with descriptions]
WHAT YOU DO NOT DO: [from doesNotDo - explicit boundaries]
ANTI-PATTERNS: [from antiPatterns - 5 named failure modes per agent]
REPORT FORMAT: [structured output template]
```

### Fields included (operational - ~1,000 tok per agent)

| Field | Source in AGENT_EDU_PL | Purpose |
|-------|----------------------|---------|
| name | tagline (before dash) | Identity |
| description | missionShort | Routing/discovery |
| model | stats[Model] | Cost routing |
| bestFor/worstFor | bestFor/worstFor | Routing decisions |
| ROLE | missionShort | Agent's mission |
| INPUT/OUTPUT | inputs/outputs | Contract |
| RESPONSIBILITIES | does | Operational duties |
| RULES | howItWorks | Step-by-step process |
| WHAT YOU DO NOT DO | doesNotDo | Boundaries |
| ANTI-PATTERNS | antiPatterns | Failure prevention |

### Fields excluded (educational - saves ~500 tok per agent)

| Field | Why excluded |
|-------|-------------|
| tagline | UI decoration |
| whoIs | Persona description for encyclopedia |
| analogy | Educational metaphor |
| keyConcepts | Pedagogical definitions |
| glossary | Dictionary for users |
| learningQuote | Motivational text |
| realExample | Educational narrative |
| relatedAgents | Graph visualization data |
| stats (non-model) | UI metrics display |

## How It Works

1. **Reference files:** Skills are `.md` files with full agent prompts - they do NOT auto-load into context
2. **Used by commands:** When a preset command (e.g. `/deep-five-minds`) runs, it references skill prompts for its agents
3. **Global scope:** Skills in `~/.claude/skills/` work in every project
4. **Single source of truth:** Change a prompt once - all presets that use that agent get updated
5. **Regeneration:** Run `node generate_skills.js` to regenerate all 35 skills from the latest HTML version

## Relationship to Presets (Commands)

```
~/.claude/skills/          = Individual agents (reusable building blocks, 35 files)
~/.claude/commands/        = Team presets (orchestration + skill references, 42 files, GLOBAL)
~/.claude/PRESET_CATALOG.md = Routing catalog (which preset for which task)
~/.claude/CLAUDE.md         = Routing instructions (how to match tasks to presets)
```

Commands orchestrate teams of agents. Skills define individual agents. Commands contain ONLY orchestration logic (phases, gates, connections) and a skill reference table - they do NOT duplicate agent prompts. This is the single-source-of-truth design: change a skill file once -> all presets that use that agent get the update.

**Cross-project reuse:** All commands are in `~/.claude/commands/` (global). No local `.claude/commands/` - presets work in every project.

## Model Routing

| Tier | Model | Use For | Cost |
|------|-------|---------|------|
| Critical | Opus 4.6 | Orchestrator, 5 debate experts (Five Minds), synthesis | $15/MTok in |
| Workhorse | Sonnet 4.6 | Build agents, QA management, planners, some researchers (X, GitHub, forums), critic | $3/MTok in |
| Light | Haiku 4.5 | Research scanning (tech, UX, Reddit, docs), light QA (security, quality, perf), HITL presentation | $0.80/MTok in |

## Prompt Structure (v32.16)

All 35 agents follow 8-section structure with data from v32.16 AGENT_EDU_PL:
- **ROLE** - full mission statement in Polish (from missionShort)
- **INPUT** - what it receives (from inputs)
- **OUTPUT** - what it produces (from outputs)
- **RESPONSIBILITIES** - numbered list of duties (from does)
- **RULES** - operational steps (from howItWorks)
- **WHAT YOU DO NOT DO** - explicit boundaries (from doesNotDo)
- **ANTI-PATTERNS** - 5 named failure modes per agent (from antiPatterns) - NEW in v32.16
- **REPORT FORMAT** - structured output template

## Regeneration Scripts

Two scripts in project root regenerate the full system from the latest HTML:

### generate_skills.js (agents)

Extracts AGENT_EDU_PL from HTML and generates 35 skill files.

```bash
node generate_skills.js
```

- Parses JavaScript object from HTML using brace-matching + eval
- Filters to individual agents only (skips preset entries)
- Extracts only operational fields (see table above)
- Maps phase/tools from AGENT_META config in the script
- Writes to `~/.claude/skills/` overwriting existing files

### generate_commands.js (presets)

Transforms 42 command files: strips inline agent prompts, replaces with skill references.

```bash
node generate_commands.js
```

- Parses PR object from HTML (preset agent compositions with model overrides)
- For each command file: finds `## PROMPTY AGENTOW` section, replaces with `## REFERENCJE DO SKILLS` table
- Preserves orchestration logic (phases, gates, connections, general rules)
- Writes to `~/.claude/commands/` overwriting existing files
- Result: -73% file size across all 42 commands

**Rule:** Always regenerate from the LATEST version HTML. Never use old command files or older versions as source.

### Full regeneration (on new HTML version)

```bash
# Update HTML_PATH in both scripts, then:
node generate_skills.js    # 35 agent skill files
node generate_commands.js  # 42 preset command files
```

## Adding New Agents

1. Add agent definition to the HTML (AGENT_EDU_PL object)
2. Add agent key to AGENT_META in `generate_skills.js` with phase/tools
3. Run `node generate_skills.js` to generate the skill file
4. Add agent to preset(s) in the HTML (PR object)
5. Run `node generate_commands.js` to update command files with new skill references
6. Update PRESET_CATALOG.md if new presets are created
