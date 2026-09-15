# Skills Architecture - 60 Reusable Agents

**Source of truth:** `v41/AGENT_TEAMS_CONFIGURATOR_v41.html` (`AGENT_EDU_PL` object)

## Overview

60 agents extracted as individual skill files in `~/.claude/skills/`. Each agent is a self-contained `.md` file with YAML frontmatter + full operational prompt. Skills are global - they work in every project, not just Agent Architecture.

**Important:** Skills are reference files (single source of truth for agent prompts). They are NOT auto-discovered by Claude Code at session start. Commands (`~/.claude/commands/`) use these prompts when orchestrating teams.

## File Structure

```
~/.claude/skills/                    # GLOBAL (all projects)

# Orchestration & Strategy (4)
  orchestrator.md                    # Strategy / opus
  synthesizer.md                     # Strategy / sonnet
  synthesizer_lean.md                # Strategy / opus
  decision_advisor.md                # Strategy / sonnet

# Planning (2)
  analyst.md                         # Planning / sonnet
  planner.md                         # Planning / sonnet

# Research (10)
  res_tech.md                        # Research / haiku
  res_ux.md                          # Research / haiku
  res_reddit.md                      # Research / haiku
  res_x.md                           # Research / sonnet
  res_github.md                      # Research / sonnet
  res_forums.md                      # Research / sonnet
  res_docs.md                        # Research / haiku
  res_critic.md                      # Research / sonnet
  res_extractor.md                   # Research / haiku
  recipe_scout.md                    # Research / sonnet

# Build (18)
  backend.md                         # Build / sonnet
  frontend.md                        # Build / sonnet
  feature.md                         # Build / sonnet
  designer.md                        # Build / sonnet
  integrator.md                      # Build / sonnet
  writer.md                          # Build / sonnet
  technical_writer.md                # Build / sonnet
  mobile_developer.md                # Build / sonnet
  db_architect.md                    # Build / sonnet
  observability_engineer.md          # Build / sonnet
  style_profiler.md                  # Build / sonnet
  voice_writer.md                    # Build / sonnet
  voice_qa.md                        # Build / haiku
  social_strategist.md               # Build / sonnet
  career_document_builder.md         # Build / sonnet
  interview_coach.md                 # Build / sonnet
  taste_recommender.md               # Build / sonnet
  recipe_filter.md                   # Build / haiku

# QA / Audit (5)
  qa_security.md                     # QA / haiku
  qa_quality.md                      # QA / haiku
  qa_perf.md                         # QA / haiku
  qa_manager.md                      # QA / sonnet
  accessibility_tester.md            # QA / sonnet

# Five Minds - adversarial debate (5)
  expert_pragmatist.md               # Debate / opus
  expert_innovator.md                # Debate / opus
  expert_analyst.md                  # Debate / opus
  expert_user.md                     # Debate / opus
  expert_devil.md                    # Debate / opus

# HITL (1)
  decision_presenter.md              # HITL / haiku

# Data & AI (6)
  ml_engineer.md                     # Data / sonnet
  data_engineer.md                   # Data / sonnet
  ai_engineer.md                     # Data / sonnet
  prompt_engineer.md                 # Data / sonnet
  statistician.md                    # Data / sonnet
  eda_analyst.md                     # Data / sonnet

# Infra / Ops (5)
  devops_engineer.md                 # Ops / sonnet
  cloud_architect.md                 # Ops / sonnet
  sre_engineer.md                    # Ops / sonnet
  kubernetes_specialist.md           # Ops / sonnet
  telemetry_surfer.md                # Ops / sonnet

# Product (3)
  product_manager.md                 # Product / sonnet
  ux_researcher.md                   # Product / sonnet
  gtm_strategist.md                  # Product / sonnet

# Compliance (1)
  control_mapper.md                  # Compliance / sonnet
```

60 agents total: **42 Sonnet, 11 Haiku, 7 Opus**.

## Skill File Format

```yaml
---
name: "Agent name from v41 tagline"
description: "Full mission statement from AGENT_EDU_PL.missionShort"
model: opus/sonnet/haiku
effort: low/medium/high/xhigh
phase: strategy/planning/research/build/qa/debate/hitl/data/ops/product/compliance
tools: [Read, Write, Edit, Bash, Grep, Glob, Agent, WebSearch, WebFetch]
bestFor:
  - "When to use this agent (from AGENT_EDU_PL.bestFor)"
worstFor:
  - "When NOT to use this agent (from AGENT_EDU_PL.worstFor)"
---

ROLE: [from missionShort - full mission statement]
INPUT: [from inputs - what the agent receives]
OUTPUT: [from outputs - what the agent produces]
RESPONSIBILITIES: [from does - numbered operational duties]
RULES: [from howItWorks - operational steps with descriptions]
WHAT YOU DO NOT DO: [from doesNotDo - explicit boundaries]
ANTI-PATTERNS: [from antiPatterns - named failure modes per agent]
REPORT FORMAT: [structured output template]
```

`effort` is a second routing dimension alongside `model` - see
[`ROUTING_SYSTEM.md`](ROUTING_SYSTEM.md#effort-per-agent) for the mapping and rationale. It is
never overwritten by a plain `node generate_skills.js` run, only by `--all`, and even then the
existing value in your local file is preserved (see `generate_skills.js` for the exact merge
logic) - it is meant to be hand-tuned per user without fighting the regenerator.

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

### Fields excluded (educational - saves tokens per agent)

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
5. **Regeneration:** Run `node generate_skills.js` to create missing skills from the latest HTML, or `--all` for a full, effort-preserving resync

## Relationship to Presets (Commands)

```
~/.claude/skills/          = Individual agents (reusable building blocks, 60 files)
~/.claude/commands/        = Team presets (orchestration + skill references, 62 files, GLOBAL)
~/.claude/PRESET_CATALOG.md = Routing catalog (which preset for which task - hand-maintained, see ROUTING_SYSTEM.md)
~/.claude/CLAUDE.md         = Routing instructions (how to match tasks to presets)
```

Commands orchestrate teams of agents. Skills define individual agents. Commands contain ONLY orchestration logic (phases, gates, connections) and a skill reference table - they do NOT duplicate agent prompts. This is the single-source-of-truth design: change a skill file once -> all presets that use that agent get the update.

**Cross-project reuse:** All commands are in `~/.claude/commands/` (global). No local `.claude/commands/` - presets work in every project.

## Model Routing

| Tier | Model | Use For | Price (in / out per MTok) |
|------|-------|---------|------|
| Flagship | Opus 5 (also 4.8) | Orchestrator, 5 debate experts (Five Minds), synthesis-lean | $5 / $25 |
| Workhorse | Sonnet 5 | Build agents, QA management, planners, most researchers | $2 / $10 |
| Fast | Haiku 4.5 | Research scanning (tech, UX, Reddit, docs), light QA (security, quality, perf), HITL presentation | $1 / $5 |
| Premium (available, unassigned by default) | Fable 5.1 | - | $10 / $50 |

## Prompt Structure

All 60 agents follow the same 8-section structure, sourced from `AGENT_EDU_PL`:
- **ROLE** - full mission statement (from missionShort)
- **INPUT** - what it receives (from inputs)
- **OUTPUT** - what it produces (from outputs)
- **RESPONSIBILITIES** - numbered list of duties (from does)
- **RULES** - operational steps (from howItWorks)
- **WHAT YOU DO NOT DO** - explicit boundaries (from doesNotDo)
- **ANTI-PATTERNS** - named failure modes per agent (from antiPatterns)
- **REPORT FORMAT** - structured output template

## Regeneration Scripts

Two scripts in the project root regenerate the full system from the latest HTML. Both default to
**only creating what's missing** - see [`INSTALL.md`](../INSTALL.md) for the full walkthrough and
the `--all` flag.

### generate_skills.js (agents)

Extracts `AGENT_EDU_PL` from the HTML and generates skill files for any agent that doesn't have
one yet.

```bash
node generate_skills.js          # only missing skills
node generate_skills.js --all    # rewrite every skill file (keeps existing effort: values)
```

- Parses the JavaScript object straight out of the HTML (brace-matching + evaluation)
- Filters to individual agents only (skips preset entries)
- Extracts only the operational fields (see table above)
- Maps phase/tools from the `AGENT_META` config inside the script
- Writes to `~/.claude/skills/`

### generate_commands.js (presets)

Transforms command files: strips inline agent prompts, replaces with skill references.

```bash
node generate_commands.js          # only missing commands
node generate_commands.js --all    # rewrite every command file (this resets agent/model choices)
```

- Parses the `PM`/`PR` objects from the HTML (preset agent compositions with model overrides)
- For each command file: writes a `## REFERENCES TO SKILLS` table pointing at `~/.claude/skills/`
- Preserves orchestration logic (phases, gates, connections, general rules)
- Writes to `~/.claude/commands/`
- Prints a coverage report at the end: presets without a command, agents without a skill,
  commands with no preset behind them

**Rule:** Always regenerate from the LATEST version HTML (`v41/`). Never use old command files or
older versions as source - `HTML_PATH` at the top of each script is pinned to v41 for exactly this
reason.

## Adding New Agents

1. Add the agent's definition to the HTML (`AGENT_EDU_PL` object)
2. Add the agent's ID to `AGENT_META` in `generate_skills.js` with phase/tools
3. Run `node generate_skills.js` to generate the skill file
4. Add the agent to preset(s) in the HTML (`PR` object)
5. Run `node generate_commands.js` to update command files with the new skill reference
6. Update `PRESET_CATALOG.md` if new presets are created (see [`ROUTING_SYSTEM.md`](ROUTING_SYSTEM.md))
