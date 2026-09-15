# 00_FUNDAMENTALS - Claude Code Skills Architecture

**NotebookLM-optimized briefing** (dense facts, low redundancy, citation-ready)

## 1. Co to jest skill

- Filesystem-based mechanizm rozszerzania Claude Code
- Struktura: katalog `<name>/SKILL.md` + optional resources
- Loadowany progresywnie w 3 poziomach

## 2. Hierarchia scope (priority order)

1. **Enterprise** - managed settings, all users in org
2. **Personal** - `~/.claude/skills/<name>/SKILL.md`
3. **Project** - `.claude/skills/<name>/SKILL.md`
4. **Plugin** - `<plugin>/skills/<name>/SKILL.md` (namespaced `plugin-name:skill-name`, nigdy nie kolizja)

## 3. Progressive disclosure - 3 poziomy

| Level | When | Cost | Content |
|-------|------|------|---------|
| 1 Metadata | Startup (always) | ~37-100 tokens/skill | name + description |
| 2 Instructions | On trigger | <5k tokens | SKILL.md body |
| 3 Resources | On read | Unlimited | Bundled files via bash |

**40 skilli = ~1500 tokens overhead** (Anthropic eng blog).

## 4. Frontmatter - 13 pol oficjalnych

| Field | Type | Purpose |
|-------|------|---------|
| `name` | string | Display, default = dir name |
| `description` | string | What + when (recommended) |
| `when_to_use` | string | Extra trigger context |
| `argument-hint` | string | Autocomplete placeholder |
| `disable-model-invocation` | bool | Block auto + Skill tool |
| `user-invocable` | bool | Hide from / menu |
| `allowed-tools` | str/list | Pre-approve tools |
| `model` | string | Model override |
| `effort` | enum | low/medium/high/xhigh/max |
| `context` | string | "fork" only |
| `agent` | string | Subagent type z context:fork |
| `hooks` | object | Skill-scoped hooks |
| `paths` | list | Glob patterns auto-load |
| `shell` | string | bash/powershell |

## 5. Validation API (hard caps)

- **name**: max 64 chars, [a-z0-9-], NO XML tags, reserved 'anthropic' i 'claude' forbidden
- **description**: max 1024 chars per field, non-empty, NO XML
- Listing truncation: **1536 chars** (description + when_to_use combined)
- Listing budget: **1% context window, fallback 8000 chars**

## 6. Invocation paths - trzy sciezki

**Path A - Automatic description-match** - Claude sam decyduje via LLM forward pass (no regex).
**Path B - Manual `/skill-name`** - user slash, supports `$ARGUMENTS` substitution.
**Path C - Skill tool (programmatic)** - agents/skills invoke, permission rules gating.

## 7. Invocation control matrix

| `disable-model-invocation` | `user-invocable` | Path A | Path B | Path C | Desc in context |
|----------------------------|-------------------|--------|--------|--------|-----------------|
| false (default) | true (default) | yes | yes | yes | yes |
| true | true | NO | yes | NO | NO |
| false | false | yes | NO | yes | yes |
| true | false | NO | NO | NO | NO (zombie) |

## 8. Permission rules syntax

- `Skill` - deny all
- `Skill(commit)` - exact
- `Skill(review-pr *)` - prefix
- `Skill(deploy *)` in deny - block prefix

## 9. Content lifecycle + compaction

- Skill invoked = single message, persists remainder of session
- Auto-compaction: re-attach most recent invocation keeping first **5000 tokens** per skill
- Combined budget: **25000 tokens** for all re-attached skills
- Older skills may be DROPPED entirely

## 10. Commands + Skills merge (2.1+)

- `.claude/commands/name.md` and `.claude/skills/name/SKILL.md` both create `/name`
- **Skill wins on conflict**
- Command = UX-level abstraction, nie osobny tier

## 11. Live change detection

- Add/edit/remove reflected in current session WITHOUT restart
- Exception: creating top-level skills directory (requires restart)
- Nested discovery: editing `packages/frontend/foo.ts` -> loads `packages/frontend/.claude/skills/`

## 12. 4-tier hierarchy

1. **MCP** - external tools/data
2. **Skills** - reusable instruction patterns
3. **Subagents** - isolated task execution
4. **Hooks** - lifecycle triggers

**Decision order**: MCP for external? Skill for reusable logic? Subagent for isolation? Hook for events?

## 13. Critical bug #17283 (active)

- `context: fork` + `agent:` fields **IGNORED** when skill invoked via Skill tool
- Fork isolation fails silently
- Impact: Fan-Out/Merge chain patterns break
- Workaround: use slash invocation (Path B) or subagent preload

## 14. Chain depth recommendation

**Max 3-5 skilli deep** (post-compaction cap).
Deeper = filesystem state persistence OR Swarm Orchestration alternative.

## 15. Ecosystem 2026

- Official Anthropic marketplace (auto-available)
- Top community: sickn33 (33k+ stars, 1,410+ skills), travisvn (22k+), VoltAgent (1000+)
- Vendor skills: Frontend Design (Anthropic, 277k+ installs), Remotion (117k+ weekly), Trail of Bits

## 16. Plugin structure

```
.claude-plugin/plugin.json    # semver, metadata
skills/<name>/SKILL.md        # bundled skills
agents/<name>.md
commands/<name>.md
mcp/server.json               # optional
hooks/pre-commit.sh           # optional
```

## 17. Agent Skills open standard

- agentskills.io
- Core fields portable: Claude Code + Cursor + Codex CLI + Gemini CLI
- Claude Code-specific extensions: invocation control, subagents, dynamic injection

## 18. Pre-built Anthropic skills

- Claude Code: `/simplify`, `/batch`, `/debug`, `/loop`, `/claude-api`
- Claude API / claude.ai: `pptx`, `xlsx`, `docx`, `pdf` (container-based)
- Open-source repo: github.com/anthropics/skills
