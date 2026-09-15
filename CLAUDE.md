# CLAUDE.md - Agent Architecture Designer

## What is this project

Single-HTML visual designer and encyclopedia for multi-agent AI systems.
60 agents, 62 team presets, PL/EN bilingual. Zero dependencies.

Primary purpose: **education** - understand how each agent thinks, what it does, how teams collaborate, and what it costs before you spend a token.

## Current version

**Working version: v41** - 60 agents, 62 presets, ~7.0 MB. This is the source of truth for
agent and preset definitions; older versions are frozen.

- Source: `v41/AGENT_TEAMS_CONFIGURATOR_v41.html`
- Log, file-specific rules and post-compaction handoff: `v41/PROGRESS.md`
- Build plan for the in-app tutorial: `v41/plans/PLAN_BUDOWY.md`
- Visual decisions (whole project): `DESIGN_DECISIONS.md`

v41 theme: **in-app tutorial**. All four phases shipped: five-step guided tour with its own
minimal engine, auto-start on first visit, full PL/EN parity. Entry point is the flashlight
button in the header, between Hooki and the cost bar.

- Step data and engine live in `v41/plans/samouczek_kod.js` - the ONLY place to edit them.
  Deploy with the marker-replacing script; editing the HTML directly is lost on next deploy.
- The Patterns (Wzorce) module works the same way: canonical source is now
  `v41/plans/wzorce_kod.js` (copied here 2026-09-15 for the publish - v39 stays frozen,
  so it no longer moves independently of what is actually deployed). Deploy with the
  marker-replacing script. Exception: `wzSyncLang()` lives in the HTML, outside the markers.

Beyond the tutorial, v41 also carries a cosmetics pass (DD59-DD70), the closed A/B/C backlog
(DD71-DD75), an anonymised `Research/` folder (DD74) and two performance rounds - encyclopedia
(DD76) and canvas (DD77). Current size 7 090 972 bytes, **422 tests green** across five suites.
v41 was published to GitHub 2026-09-15 (Maciej's explicit go-ahead). Any FUTURE push still
needs his explicit consent each time - this is a standing rule, not a one-time approval.

**Previous version: v40** - frozen at 7 029 741 bytes. Wzorce rebuilt (DD52-DD55).

**Approved fallback: v39** - frozen at 6 959 003 bytes. Still the designated fallback until
Maciej says otherwise. Do not edit it, not even read-write.

v38 and older are history only - kept in the tree, no longer a fallback (decision 2026-09-13).
Do not use them for agent or preset definitions.

**Live demo: v41** - `index.html` (root) mirrors `v41/AGENT_TEAMS_CONFIGURATOR_v41.html` for
GitHub Pages, since the 2026-09-15 publish decision (only v41 is featured; v33-v40 stay local
only, see `.gitignore`).

**First public release: v32** (build v32.16 "Universal Bilingual") - 35 agents, 42 presets. Kept
in the repo as `v32/AGENT_TEAMS_CONFIGURATOR_v32.html` for history; no longer the live demo.

## Agent infrastructure

The project includes a complete agent orchestration layer for Claude Code:

| Component | Location | Count | Purpose |
|-----------|----------|-------|---------|
| Skills | `~/.claude/skills/*.md` | 60 | Individual agent prompts (global) |
| Commands | `~/.claude/commands/*.md` | 62 | Team preset orchestration (global) |
| Catalog | `~/.claude/PRESET_CATALOG.md` | 1 | Auto-routing: task description -> best preset |
| Routing | `~/.claude/CLAUDE.md` | 1 | 7-line routing instruction (always loaded) |

**How it works:** User describes a task -> Claude reads the catalog -> proposes the best preset -> user confirms -> preset loads skill files for each agent -> agents run as subagents.

**Regeneration from source HTML** (all three read `v41/`; the first two default to creating only
what is missing, the catalog script always does a full rewrite since it is a single aggregated
file with nothing per-entry to protect):
```bash
node generate_skills.js            # skill files from AGENT_EDU_PL (only missing)
node generate_commands.js          # command files from PM + PR + AD (only missing)
node generate_skills.js --all      # rewrites every skill file (keeps existing effort:)
node generate_commands.js --all    # rewrites every command file - changes agent models
node generate_catalog.js           # rewrites ~/.claude/PRESET_CATALOG.md from PM (always full)
```

`generate_commands.js` prints a coverage report at the end: presets without a command,
agents without a skill, commands with no preset behind them. Run it after adding agents
or presets to the HTML - that gap is invisible in the app, and a preset whose command
does not exist fails silently when the user pastes it into Claude Code.

## Versioning

- Each major version = its own folder with a single HTML file
- Current shipped / live demo: **v41**
- v33-v40 are development history, gitignored - not pushed, only v32 and v41 are public
- Historical builds (v1-v32.15) are preserved in git history

## File map

```
index.html                  # Live demo (= v41 copy)
v41/                        # Working version (source of truth), published
  AGENT_TEAMS_CONFIGURATOR_v41.html
  PROGRESS.md               # Log + rules specific to this file
  MASTER_PLAN.md            # Tutorial research campaign brief
  research/                 # R1-R8 + CRITIC
  plans/                    # SYNTHESIS.md + PLAN_BUDOWY.md
v32/                        # First public release (history, no longer the live demo)
  AGENT_TEAMS_CONFIGURATOR_v32.html
docs/                       # Architecture documentation
  SKILLS_ARCHITECTURE.md    # 60 agents: format, fields, model routing
  ROUTING_SYSTEM.md         # Auto-routing: catalog, token budget, flow
  screenshots/
Research/                   # Anonymised research campaigns (DD74)
generate_skills.js          # Regenerate skills from HTML
generate_commands.js        # Regenerate commands from HTML
generate_catalog.js         # Regenerate the routing catalog from HTML
INSTALL.md                  # Public install walkthrough (skills/commands/catalog)
VERSIONS.md                 # v1-v32 changelog; v33-v41 summarized in README
```

## Documentation

- **Skills system:** `docs/SKILLS_ARCHITECTURE.md`
- **Routing system:** `docs/ROUTING_SYSTEM.md`
- **Version history:** `VERSIONS.md`
