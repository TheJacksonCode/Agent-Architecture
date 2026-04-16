# Preset Routing System - Auto-Selection of Agent Teams

**Date:** 2026-04-16 | **Source:** research-preset-routing/ (R1-R7 + SYNTHESIS.md)

## Overview

System that automatically matches natural language task descriptions to the best preset from 42 available multi-agent teams. User describes what they need - Claude Code proposes the right team.

## Architecture

```
User: "I need to audit security before deploy"
         |
         v
~/.claude/CLAUDE.md          <-- Routing instructions (~100 tok, always loaded)
         |
         v
~/.claude/PRESET_CATALOG.md  <-- 42 presets with descriptions (~3,500 tok, on-demand)
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
| Preset catalog | ~3,500 | On task description (on-demand) |
| Command file (orchestration only) | ~500-2,000 | On preset confirmation (on-demand) |
| Skill files (per agent, on-demand) | ~1,000 each | When spawning subagent |
| **Total routing cost** | **~4,100-5,600** | Per routing event |
| **% of context window** | **~0.41-0.56%** | Of 1M (Opus/Sonnet) |

## Catalog Structure (PRESET_CATALOG.md)

1. **Decision guide** - intent-to-preset mapping (quick lookup)
2. **42 presets** grouped in 5 tiers:
   - MINIMALNE (2-3 agents): /solo, /quick-fix, /reflect, /trio, /recon
   - CORE (4-6 agents): /bug-hunt, /content, /plan-exec, /perf-boost, /startup, /cascade, /test-suite, /a11y
   - ZAAWANSOWANE (6-11 agents): /security, /review, /design-sys, /api-modern, /ui-overhaul, /feature-sprint, /standard, /data-pipe, /research, /legacy, /microservices
   - NOWE (7-12 agents): /ab-test-lab, /tech-writing-pipe, /perf-squad, /soc2-sweep, /security-multi-vector, /data-analysis-pipe, /deep-research-swarm-pro, /migration-crew, /kb-constructor, /incident-war-room, /prd-to-launch, /fullstack-premium
   - ENTERPRISE (9-27 agents): /saas, /full, /five-minds, /deep, /five-minds-strategic, /deep-five-minds
3. **Per preset:** description + "Use when:" + "DO NOT use when:" + "vs" comparisons
4. **Cost matrix:** TANI / SREDNI / DROGI / PREMIUM / FLAGOWY
5. **Escalation tree:** 9 upgrade paths (simple -> complex)
6. **Fallback:** custom pipeline assembly from 35 agents

## Research Findings (Key)

- Our 42-preset system with model routing is UNIQUE - zero public equivalents
- Commands (not Skills) are the correct mechanism for presets - lazy loaded, 0 startup cost
- CLAUDE.md should be < 200 lines, < 5K tokens (slimmed from ~10K to ~700 tok)
- Model routing saves ~51% vs uniform Opus
- Subagent isolation: each gets own context window (use MAX not SUM)
- Context engineering > prompt engineering (2026 trend)

## Files

- Research reports: `research-preset-routing/R1-R7*.md`
- Synthesis: `research-preset-routing/SYNTHESIS.md`
- Catalog: `~/.claude/PRESET_CATALOG.md`
- Routing: `~/.claude/CLAUDE.md` (Agent Architecture section)
- Skills: `~/.claude/skills/*.md` (35 agent prompts, regenerated from v32.16)
- Commands: `~/.claude/commands/*.md` (42 presets, GLOBAL, reference skills)
- Regeneration: `generate_skills.js` (skills from HTML) + `generate_commands.js` (commands from HTML)

## Source of Truth (only when updating Agent Architecture)

When creating new versions, adding agents, or regenerating skills - the LATEST version HTML is the authoritative source. This does NOT apply when simply using presets in other projects.

- **Agent definitions:** AGENT_EDU_PL object in HTML (17-18 fields per agent)
- **Preset definitions:** PRESET_EDU_PL object in HTML
- **Skill files:** Generated subset (6-8 operational fields) via `generate_skills.js`
- **Command files:** Orchestration only (phases, gates, skill references) via `generate_commands.js`
- **Current version:** v32.16 (27,478 lines, 5.7 MB)
