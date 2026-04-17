# CLAUDE.md - Agent Architecture Designer

## What is this project

Single-HTML visual designer and encyclopedia for multi-agent AI systems.
35 agents, 42 team presets, PL/EN bilingual. Zero dependencies.

Primary purpose: **education** - understand how each agent thinks, what it does, how teams collaborate, and what it costs before you spend a token.

## Current version

**v32** (build v32.16 "Universal Bilingual") - 27,478 lines, 5.7 MB, 35 agents, 42 presets, full PL/EN encyclopedia parity.

- Source: `v32/AGENT_TEAMS_CONFIGURATOR_v32.html`
- Live demo: `index.html` (root, mirrors v32 for GitHub Pages)

## Agent infrastructure

The project includes a complete agent orchestration layer for Claude Code:

| Component | Location | Count | Purpose |
|-----------|----------|-------|---------|
| Skills | `~/.claude/skills/*.md` | 35 | Individual agent prompts (global) |
| Commands | `~/.claude/commands/*.md` | 42 | Team preset orchestration (global) |
| Catalog | `~/.claude/PRESET_CATALOG.md` | 1 | Auto-routing: task description -> best preset |
| Routing | `~/.claude/CLAUDE.md` | 1 | 7-line routing instruction (always loaded) |

**How it works:** User describes a task -> Claude reads the catalog -> proposes the best preset -> user confirms -> preset loads skill files for each agent -> agents run as subagents.

**Regeneration from source HTML:**
```bash
node generate_skills.js    # 35 skill files from AGENT_EDU_PL
node generate_commands.js  # 42 command files from PR data
```

## Versioning

- Each major version = its own folder with a single HTML file
- Current shipped: **v32**
- Historical builds (v1-v32.15) are preserved in git history

## File map

```
index.html                  # Live demo (= v32 copy)
v32/                        # Current version
  AGENT_TEAMS_CONFIGURATOR_v32.html
docs/                       # Architecture documentation
  SKILLS_ARCHITECTURE.md    # 35 agents: format, fields, model routing
  ROUTING_SYSTEM.md         # Auto-routing: catalog, token budget, flow
  screenshots/
research-preset-routing/    # Research reports (R1-R7 + synthesis)
generate_skills.js          # Regenerate skills from HTML
generate_commands.js        # Regenerate commands from HTML
VERSIONS.md                 # Full version history (v1-v32)
```

## Documentation

- **Skills system:** `docs/SKILLS_ARCHITECTURE.md`
- **Routing system:** `docs/ROUTING_SYSTEM.md`
- **Version history:** `VERSIONS.md`
