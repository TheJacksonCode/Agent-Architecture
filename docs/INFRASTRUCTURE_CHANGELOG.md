# Infrastructure Changelog

Changes to the Claude Code configuration layer (beyond the HTML application).

---

## 2026-04-16: Command Transformation + Cross-Project Reuse

### What was done

**1. Command files transformed to skill references (-73% size)**
- All 42 command files in `~/.claude/commands/` stripped of inline agent prompts
- Replaced with `## REFERENCJE DO SKILLS` table referencing `~/.claude/skills/*.md`
- Total: 601 KB -> 164 KB (-427 KB, -73%)
- Biggest wins: deep-five-minds (-80%), deep (-80%), five-minds (-78%), full (-78%)
- Each command now has: header, phases, skill reference table, general rules
- Script: `generate_commands.js` - parses PR object from v32.16 HTML, transforms files

**2. Cross-project reuse (global commands)**
- Removed local `.claude/commands/` (29 old duplicate files)
- All 42 presets now exclusively in `~/.claude/commands/` (global)
- Presets work in EVERY project, not just Agent Architecture
- No more local/global conflicts (local overrides global in Claude Code)

**3. Single-source-of-truth system complete**
- Skills (`~/.claude/skills/`) = agent prompts (35 files, regenerated from v32.16)
- Commands (`~/.claude/commands/`) = team orchestration (42 files, reference skills)
- Change a skill once -> all presets that use it get the update
- Model overrides for premium presets preserved from PR data in HTML

### Files created/modified

```
CREATED:
  generate_commands.js                   # Script to transform commands (strip prompts, add skill refs)

MODIFIED:
  ~/.claude/commands/*.md                # 42 files transformed (-73% size)

REMOVED:
  .claude/commands/                      # 29 local duplicates (global commands take over)
```

### Regeneration

When a new version is created (v33, v34...):
1. `node generate_skills.js` - regenerate 35 skill files from AGENT_EDU_PL
2. `node generate_commands.js` - re-transform 42 command files from PR data

Both scripts read from the latest HTML and write to `~/.claude/`.

---

## 2026-04-16: Preset Routing + Skills + CLAUDE.md Optimization

### What was done

**1. Auto-Routing System (PRESET_CATALOG.md + CLAUDE.md routing)**
- Created `~/.claude/PRESET_CATALOG.md` (260 lines, ~3,500 tok) with all 42 presets
- Added 7-line routing section to `~/.claude/CLAUDE.md` (global)
- Each preset has: description, "Use when:", "DO NOT use when:", "vs" comparisons
- Added: cost matrix (5 tiers), escalation tree (9 paths), custom pipeline fallback
- User describes task naturally -> Claude Code proposes best preset -> user confirms

**2. Skills System (35 agents as individual files)**
- Created `~/.claude/skills/` with 35 agent `.md` files
- **v1 (initial):** Extracted from old command files (v32.6 era) - basic prompts, English, ~45 lines each
- **v2 (regenerated):** Regenerated from v32.16 AGENT_EDU_PL - rich Polish prompts, ~72 lines each, ~1,000 tok
- Each agent: YAML frontmatter (name/description/model/phase/tools/bestFor/worstFor) + full prompt
- Prompts follow 8-section structure: ROLE/INPUT/OUTPUT/RESPONSIBILITIES/RULES/ANTI-PATTERNS/WHAT YOU DO NOT DO/FORMAT
- ANTI-PATTERNS section (5 per agent) - new in v32.16, prevents common failure modes
- Global scope - agents work in every project, not just Agent Architecture
- Single source of truth - change prompt once, updates everywhere
- Regeneration script: `generate_skills.js` extracts from latest HTML automatically

**3. CLAUDE.md Optimization**
- Slimmed project CLAUDE.md from ~10,000 tok to ~700 tok (93% reduction)
- Extracted version history (v1-v32.16) to VERSIONS.md
- Kept: workflow standard, versioning rule, file locations
- Savings: ~9,300 tok per turn, ~93,000 tok per typical session

**4. Research (7 reports + synthesis)**
- Saved to `research-preset-routing/` folder
- R1: Claude Code best practices (config, CLAUDE.md sizing, token management)
- R2: UX routing patterns (confidence-based, progressive disclosure, fallbacks)
- R3: GitHub configurations (community repos, commands, multi-agent orchestration)
- R4: Anthropic official docs (context window breakdown, model routing, agent tool)
- R5: Community practices (Boris Cherny workflow, hooks, worktree isolation)
- R6: Expert opinions (Andrew Ng, Harrison Chase, agent sprawl backlash)
- R7: Critic framework (validation of R1-R6, conflict resolution, red flags)
- SYNTHESIS.md: 7 consensus points, 4 conflict resolutions, 3-tier recommendations

### Files created/modified

```
CREATED:
  ~/.claude/PRESET_CATALOG.md           # 42 presets routing catalog
  ~/.claude/skills/*.md                  # 35 agent skill files (global, regenerated from v32.16)
  VERSIONS.md                            # Version history extracted from CLAUDE.md
  generate_skills.js                     # Script to regenerate skills from latest HTML
  research-preset-routing/R1-R7*.md      # 7 research reports
  research-preset-routing/SYNTHESIS.md   # Research synthesis
  docs/SKILLS_ARCHITECTURE.md            # Skills system documentation
  docs/ROUTING_SYSTEM.md                 # Routing system documentation
  docs/INFRASTRUCTURE_CHANGELOG.md       # This file

MODIFIED:
  CLAUDE.md                              # Slimmed from ~10K to ~700 tok
  ~/.claude/CLAUDE.md                    # Added auto-routing section
```

### Source of truth rule (only when updating Agent Architecture)

This rule applies ONLY when working on Agent Architecture itself (new versions, adding agents, regenerating skills). It does NOT apply when using presets in other projects - skills and commands just work as-is.

**When updating:** Always use the LATEST version HTML (currently v32.16) as the single source of truth for agent/preset definitions. The AGENT_EDU_PL object in the HTML contains 17-18 fields per agent. Skills extract only the 6-8 operational fields - educational fields (analogy, glossary, learningQuote, realExample, etc.) stay in the HTML for the encyclopedia UI.

When a new version is created (v33, v34...), run `node generate_skills.js` (after updating the HTML_PATH in the script) to regenerate all skills.

### Why (research-backed justification)

- **Routing system:** Users should describe tasks naturally, not memorize 42 command names. Validated by R2 (UX patterns), R3 (community standard), R6 (expert consensus).
- **Skills:** Eliminates prompt duplication across 29+ command files. Single source of truth per agent. Global reuse across projects. Validated by R3 (wshobson/agents pattern), R5 (skill-based architecture trend).
- **CLAUDE.md slim:** Community consensus (R1, R3, R4, R5) - CLAUDE.md < 200 lines, < 5K tok. Version history was 71% of tokens and needed 0% of the time in normal work.

### Remaining Tier 3 items (long-term)

- Hooks enforcement (settings.json) for 100% rule compliance
- .claude/rules/ with glob-scoped rules (Cursor .mdc pattern)
- Worktree isolation in heavy presets
- Namespace prefixing for commands
- Dual mode wizard for new users
- ~~Cross-project preset reuse (global commands)~~ **DONE 2026-04-16**
- Preset analytics and confidence-based auto-routing
