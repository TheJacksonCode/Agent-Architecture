# Preset Routing System - Auto-Selection of Agent Teams

**Source:** `Research/research-preset-routing/` (R1-R7 + SYNTHESIS.md)

## Overview

A system that automatically matches natural language task descriptions to the best preset from
the 62 available multi-agent teams. User describes what they need - Claude Code proposes the
right team.

**Status:** `generate_catalog.js` builds `~/.claude/PRESET_CATALOG.md` from the same HTML the
other two generators read - see [`INSTALL.md`](../INSTALL.md#4-optional-auto-routing-from-a-task-description)
for the one-line command. The catalog alone doesn't do anything, though: Claude Code needs the
short routing instruction below in your own `~/.claude/CLAUDE.md` before it will consult it.

### Routing snippet - copy into your `~/.claude/CLAUDE.md`

```markdown
## Agent Architecture routing

When a task is complex enough to benefit from a multi-agent team (multi-step, needs research
from several sources, needs a build+QA cycle) - or the user explicitly asks for a preset/team -
read `~/.claude/PRESET_CATALOG.md`, match the task to the best preset by its "Use when" text,
and propose it by name before running it. For a simple one-step question or a single-file edit,
just answer directly - do not read the catalog.
```

Keep this short (the point is that it costs near-zero tokens until a task actually needs it) and
adjust the trigger condition to match how you want to use the presets day to day.

## Architecture

```
User: "I need to audit security before deploy"
         |
         v
~/.claude/CLAUDE.md          <-- Routing instructions (~100 tok, always loaded)
         |
         v
~/.claude/PRESET_CATALOG.md  <-- 62 presets with descriptions (on-demand)
         |
         v
Claude Code: "I suggest /security-multi-vector (9 agents)..."
         |
         v (user confirms)
~/.claude/commands/security-multi-vector.md  <-- Team preset (GLOBAL, ~500-2,000 tok)
         |
         v (per agent)
~/.claude/skills/qa_security.md              <-- Agent prompt (~1,000 tok, on-demand)
```

## Token Budget

| Component | Tokens | When loaded |
|-----------|--------|-------------|
| Routing instructions (CLAUDE.md) | ~100 | Always |
| Preset catalog | ~4,500 | On task description (on-demand, scales with 62 presets) |
| Command file (orchestration only) | ~500-2,000 | On preset confirmation (on-demand) |
| Skill files (per agent, on-demand) | ~1,000 each | When spawning subagent |
| **Total routing cost** | **~5,100-6,600** | Per routing event |
| **% of context window** | **~0.5-0.66%** | Of 1M (Opus/Sonnet) |

## Subagent concurrency limits

Claude Code caps subagent concurrency: **max 20 subagents running at once, max 200 per session,
max nesting depth 3**.

Presets that get close to these limits and may need phasing (running agents in smaller batches
instead of all at once) to avoid throttling: `/deep-five-minds` (27 agents), `/deep-research-v2`
(17 agents), `/deep-research-swarm-pro` (10 agents) in variants with simultaneous fan-out.
Orchestrators for these presets should group research/extract fan-out into batches of 20 agents
or fewer.

## Effort per agent

Manual `thinking: {budget_tokens: N}` has been retired on current models (Fable 5, Opus 4.7/4.8,
Sonnet 5) and now returns a 400 error. It has been replaced by **adaptive thinking plus an
`effort` parameter** (`low` / `medium` / `high` / `xhigh` / `max`). `xhigh` is the sweet spot for
coding/agentic work and the default level in Claude Code.

Every skill carries an `effort` field in its frontmatter alongside `model`. The orchestrator
passes both when spawning a subagent (the Agent/Task tool supports the `effort` parameter).
Project-wide mapping, across 60 agents:

| Effort | When | Example agents |
|--------|------|-----------------|
| **xhigh** | decision-critical, adversarial reasoning, strategic synthesis | the 5 debate experts, orchestrator, synthesizer_lean |
| **high** | build/coding/agentic work, writing, light decisions | backend, frontend, designer, writer, voice_writer, decision_advisor |
| **medium** | breadth-first, tool-driven research | res_forums, res_github, res_x, res_extractor, recipe_scout, style_profiler |
| **low** | mechanical/cheap, structured output, validators | qa_security, qa_quality, res_reddit, decision_presenter, voice_qa, recipe_filter |

Rules of thumb:
- Don't set `max` without a clear need - it is expensive and rarely necessary.
- Model and effort are two separate axes. Sonnet 5 at `effort: xhigh` can often replace Opus on
  coding/agentic tasks (roughly -40 to -60% cost), but not on purely analytical/decision-making
  work - Opus still leads there.
- For long multi-agent sessions, an optional `task_budget` (a hard token cap on the whole agentic
  loop, beta, minimum 20K) is available.

Source: `Research/research-project-expansion-v33/research-recent/RR5_modele_koszty_najnowsze.md`
(sections 3.1-3.3), `Research/research-subagents-task-tool/research/R1_task_tool_api_spec.md`
(the `effort` parameter in the Task tool and frontmatter).

## Catalog Structure (PRESET_CATALOG.md)

1. **Decision guide** - intent-to-preset mapping (quick lookup)
2. **62 presets** grouped in 4 size tiers (see the README for the full list):
   - Minimal (2-3 agents, 7 presets)
   - Core (4-6 agents, 28 presets)
   - Advanced (7-11 agents, 20 presets)
   - Enterprise / flagship (12-27 agents, 7 presets)
3. **Per preset:** description + "Use when" + "DO NOT use when" + "vs" comparisons
4. **Cost matrix:** cheap / medium / expensive / premium / flagship
5. **Escalation tree:** upgrade paths from simple to complex
6. **Fallback:** custom pipeline assembly from the 60-agent catalog

## Research Findings (Key)

- A 62-preset system with model routing at this scale has no known public equivalent
- Commands (not Skills) are the correct mechanism for presets - lazy loaded, 0 startup cost
- CLAUDE.md routing instructions should stay short (well under 1K tokens) - the catalog itself
  carries the detail and loads on demand
- Model routing saves roughly half the cost of a uniform-Opus baseline
- Subagent isolation: each subagent gets its own context window (reason about MAX usage per
  branch, not SUM across the whole run)
- Context engineering matters more than prompt engineering at this scale

## Files

- Research reports: `Research/research-preset-routing/R1-R7*.md`
- Synthesis: `Research/research-preset-routing/SYNTHESIS.md`
- Catalog: `~/.claude/PRESET_CATALOG.md` (generated from v41 via `generate_catalog.js`)
- Routing: `~/.claude/CLAUDE.md` (Agent Architecture section)
- Skills: `~/.claude/skills/*.md` (60 agent prompts, generated from v41)
- Commands: `~/.claude/commands/*.md` (62 presets, GLOBAL, reference skills)
- Regeneration: `generate_skills.js` (skills), `generate_commands.js` (commands), `generate_catalog.js` (routing catalog) - all from the same HTML

## Source of Truth (only when updating Agent Architecture)

When creating new versions, adding agents, or regenerating skills - the LATEST version HTML is the
authoritative source. This does NOT apply when simply using presets in other projects.

- **Agent definitions:** `AGENT_EDU_PL` object in the HTML (17-18 fields per agent)
- **Preset definitions:** `PRESET_EDU_PL` object in the HTML
- **Skill files:** generated subset (operational fields only) via `generate_skills.js`
- **Command files:** orchestration only (phases, gates, skill references) via `generate_commands.js`
- **Current version:** v41 (~7.1 MB)
