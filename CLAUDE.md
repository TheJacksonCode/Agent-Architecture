# CLAUDE.md - Agent Architecture Designer

## What is this project

Single-HTML visual designer and encyclopedia for multi-agent AI systems.
35 agents, 42 team presets, PL/EN bilingual. Zero dependencies.

Primary purpose: **education** - understand how each agent thinks, what it does, how teams collaborate, and what it costs before you spend a token.

## Current version

**v32.16** - 27,478 lines, 5.7 MB, 35 agents, 42 presets, full PL/EN encyclopedia parity.

- Source: `v32.16/AGENT_TEAMS_CONFIGURATOR_v32_16.html`
- Live demo: `index.html` (root, mirrors v32.16 for GitHub Pages)
- Sub-versions: `v32/v32.1/` through `v32/v32.15/` (inside `v32/` folder)

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

- Each version = **separate file** in its own folder
- Format: `AGENT_TEAMS_CONFIGURATOR_v{N}.html`
- Previous versions remain untouched
- Sub-versions nest inside parent: `v32/v32.1/`, `v32/v32.8/`, etc.
- Full changelog: **VERSIONS.md**

## File map

```
index.html                  # Live demo (= v32.16 copy)
v32.16/                     # Current version (source of truth)
v32/                        # v32.0 + sub-versions (v32.1-v32.15)
v30/, v31/                  # Previous major versions
docs/                       # Architecture documentation
  SKILLS_ARCHITECTURE.md    # 35 agents: format, fields, model routing
  ROUTING_SYSTEM.md         # Auto-routing: catalog, token budget, flow
  INFRASTRUCTURE_CHANGELOG.md
generate_skills.js          # Regenerate skills from HTML
generate_commands.js        # Regenerate commands from HTML
research-preset-routing/    # Research reports (R1-R7 + synthesis)
VERSIONS.md                 # Full version history (v1-v32.16)
```

## Documentation

- **Skills system:** `docs/SKILLS_ARCHITECTURE.md`
- **Routing system:** `docs/ROUTING_SYSTEM.md`
- **Infrastructure changelog:** `docs/INFRASTRUCTURE_CHANGELOG.md`
- **Version history:** `VERSIONS.md`
