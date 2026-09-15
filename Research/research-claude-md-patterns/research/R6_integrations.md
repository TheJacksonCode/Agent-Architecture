# R6: CLAUDE.md Integrations - Skills, Commands, Hooks, MCP, Subagents

**Researcher:** R6 (Opus 4.7)
**Campaign:** Claude Code CLAUDE.md Patterns 2026
**Date:** 2026-04-17
**Scope:** How CLAUDE.md interacts with every other Claude Code layer. Primary sources only (docs.claude.com / code.claude.com as of April 2026). Citation format: `R6.C<N>`.

---

## 1. Abstract

CLAUDE.md is not an island. In Claude Code's 2026 architecture it is one of seven distinct knowledge-delivery mechanisms (CLAUDE.md, auto memory, `.claude/rules/`, skills, slash commands, subagents, hooks, MCP servers, plugins), and each of those mechanisms has an explicit contract with CLAUDE.md about who loads whom, when, and at what token cost. This report maps those contracts. The central finding: **CLAUDE.md is the only mechanism that loads eagerly, in full, at every session start, walking up the directory tree**; everything else is either lazy (skills, commands, path-scoped rules), event-driven (hooks), or subagent-local (Task tool spawns). Because of that asymmetry, CLAUDE.md is the natural "index" for the rest of the ecosystem: it should tell both you and Claude what other mechanisms exist ("use `/deep-research-v2` for map-reduce research"), but it should not duplicate their payload. The `@import` syntax is the primary lever for cheap cross-references; frontmatter-less reference to skills/commands by name is the secondary lever. Competing systems (AGENTS.md, `.cursorrules`, `.continuerules`) are not natively recognized, but Anthropic provides an idiomatic bridge via `@AGENTS.md` import. Prompt caching treats CLAUDE.md as part of the cacheable system prefix; any edit invalidates the prefix and costs a fresh cache write. This report gives ten concrete integration points, an ASCII system diagram, a table of every mechanism cross-referenced against CLAUDE.md, and eight gaps where documentation leaves decisions to the user.

Word count: ~4,100 words.

---

## 2. Overview: CLAUDE.md as the "hub" of Claude Code systems

Claude Code's extensibility surface in April 2026 is a graph of loosely coupled mechanisms that all terminate in the same context window. CLAUDE.md sits at the hub because it has three properties no other mechanism has simultaneously:

1. **Always loaded.** Project-root `CLAUDE.md` is loaded in full at session start, and re-injected from disk after `/compact` [R6.C1]. No other mechanism (except the system prompt and auto memory) gets that guarantee.
2. **Human-maintained.** CLAUDE.md is written by you or your team. Skills, commands, hooks, MCP servers, and plugins are also human-authored but are consumed through different execution surfaces (tool calls, slash invocations, lifecycle events). CLAUDE.md is consumed as raw narrative.
3. **Cheaply cross-referencing.** `@path/to/file.md` imports (recursive up to five hops) [R6.C2] let CLAUDE.md pull in any other markdown, including files that themselves are not part of Claude Code's native discovery path (AGENTS.md, docs/, README). This makes CLAUDE.md the canonical place to write "here is what this project has" and then delegate the detail.

The mental model that the Anthropic docs push - in memory.md's "Choose where to put CLAUDE.md files" table and skills.md's note that "Custom commands have been merged into skills" - is that **CLAUDE.md is for facts that must be in every session; everything else loads on demand** [R6.C3]. A CLAUDE.md entry that is a five-step playbook belongs in a skill. A CLAUDE.md entry that is "use pnpm, not npm" belongs in CLAUDE.md. This "fact vs procedure" distinction is the unifying principle that governs every integration.

Below: one-screen overview of where each mechanism sits.

```
                          Claude Code startup
                                  |
       +-----------+-----------+--+--------+-----------+-----------+
       |           |           |           |           |           |
   System      Auto memory  CLAUDE.md    Skills     Commands    MCP tools
   prompt      (MEMORY.md)  hierarchy   descriptions (=skills)   (deferred)
   [4.2k tok]  [first 200   [full text,  [names+desc [same      [names only
   always      lines or     walked up    only, full  mechanism   unless ENABLE_
   loaded      25KB]        the tree]    body lazy]  as skills]  TOOL_SEARCH=
                                                                  auto/false]
       |           |           |           |           |           |
       +-----------+-----------+-----+-----+-----------+-----------+
                                     |
                            +--------+--------+
                            |  User prompt    |
                            +--------+--------+
                                     |
                        Tool calls, hooks, subagents
                                     |
                            +--------+--------+
                            |  /compact gate  |
                            +--------+--------+
                                     |
             Re-inject: system prompt, CLAUDE.md, auto memory, MCP
             NOT re-injected: skill descriptions (only invoked skills survive)
             NOT re-injected: nested CLAUDE.md in subdirectories
```

This diagram anchors every section that follows.

---

## 3. Skills integration

### 3.1 Skills are the explicit "if it grew into a procedure, move it out of CLAUDE.md" escape hatch

The skills docs state this directly: "Create a skill when you keep pasting the same playbook, checklist, or multi-step procedure into chat, **or when a section of CLAUDE.md has grown into a procedure rather than a fact**. Unlike CLAUDE.md content, a skill's body loads only when it's used, so long reference material costs almost nothing until you need it" [R6.C4]. This is the single most important integration rule in the ecosystem: **size discipline on CLAUDE.md is enforced by pushing content into skills**.

### 3.2 Skills load descriptions eagerly, bodies lazily

In a regular session, "skill descriptions are loaded into context so Claude knows what's available, but full skill content only loads when invoked" [R6.C5]. This means:

- The 1,536-character `description` + `when_to_use` cap per skill is the *advertising surface* Claude Code uses to decide whether to pull the skill body.
- The context window visualization confirms "One-line descriptions of available skills so Claude knows what it can invoke. Full skill content loads only when Claude actually uses one" [R6.C6].
- Skills with `disable-model-invocation: true` are removed from the description index entirely - they do not even appear as advertising, only as `/name` triggers for the user [R6.C7].

The practical CLAUDE.md consequence: **do not duplicate skill content in CLAUDE.md**. A line like "For research, use `/deep-research-v2` (17-agent map-reduce)" is cheap; pasting the 200-line `/deep-research-v2` body into CLAUDE.md is expensive and produces two contradictory sources of truth.

### 3.3 CLAUDE.md can hint at skill usage, but cannot "force-load" a skill

There is no native `@/skill-name` import syntax for skills. CLAUDE.md can reference a skill by name ("use `/explain-code` when teaching"), which seeds Claude's preference, but the actual decision to invoke rests on the description match plus Claude's own judgment. The only way to guarantee a skill is loaded is:

1. User invokes `/skill-name` directly.
2. A hook or subagent declaration lists it under `skills:` frontmatter [R6.C8] (subagent preload).
3. A skill's `paths:` glob matches a file Claude reads during the session.

The `paths:` field [R6.C9] deserves special mention as an integration mechanism: it is syntactically identical to `.claude/rules/` path scoping, so CLAUDE.md, rules, and skills all share the same glob vocabulary. This convergence was introduced in 2026 and is the current state of the ecosystem.

### 3.4 Subagent skill preload bypasses the lazy contract

Subagents defined with a `skills:` frontmatter field inject **full skill content** at startup, not just descriptions [R6.C10]. This is the inverse of the regular session's lazy contract and is why some teams build "skill-preloaded subagent" patterns for domain specialists. CLAUDE.md is still loaded by the subagent (see section 7.2), but skill content arrives via a different channel.

### 3.5 Bundled skills

Claude Code ships bundled skills (`/simplify`, `/batch`, `/debug`, `/loop`, `/claude-api`) that are available in every session [R6.C11]. They appear in the same `/` menu as user skills but are sourced from the binary, not `~/.claude/skills/`. CLAUDE.md cannot override them but can shadow their names with higher-priority user or project skills; the resolution order is **enterprise > personal > project**, with plugin skills namespaced as `plugin-name:skill-name` [R6.C12].

---

## 4. Commands integration

### 4.1 Commands have been merged into skills

As of the 2026 docs: "Custom commands have been merged into skills. A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy` and work the same way" [R6.C13]. Existing `.claude/commands/*.md` files continue to work and support the same frontmatter, but skills are now the recommended path because they add a directory for supporting files, invocation control, and auto-loading when relevant.

### 4.2 Consequence: this project's PRESET_CATALOG.md is a skill-catalog, not a command-catalog

The Agent Architecture project's current setup has `~/.claude/commands/*.md` (42 preset files) plus `~/.claude/skills/*.md` (35 agent files) - per the project CLAUDE.md. Under the unified skills model, these are the same mechanism with different folder structures. PRESET_CATALOG.md + the routing instruction in `~/.claude/CLAUDE.md` is a canonical example of **using CLAUDE.md as a command/skill index**:

- `~/.claude/CLAUDE.md` carries a 7-line routing instruction ("read PRESET_CATALOG.md, propose a preset, wait for confirmation") - fact, not procedure.
- `~/.claude/PRESET_CATALOG.md` carries the catalog of 42 preset names, keywords, and costs - loaded only when the routing instruction fires.
- `~/.claude/commands/*.md` carry the actual preset prompts - loaded only when the user types `/preset-name` or Claude auto-invokes.

This is a three-tier lazy load: CLAUDE.md (eager, tiny) -> catalog (loaded on first routing decision) -> preset prompt (loaded on invocation). It's cheaper than any single-file CLAUDE.md containing all 42 preset prompts, and it survives `/compact` gracefully because CLAUDE.md re-injects the routing instruction and the catalog is re-fetched on the next routing decision.

### 4.3 `$ARGUMENTS`, namespacing, and `allowed-tools`

All three fields are inherited from the skills spec and are documented identically for commands [R6.C14]. Notable for CLAUDE.md:

- You can reference `$ARGUMENTS` and `${CLAUDE_SKILL_DIR}` inside a skill but not inside CLAUDE.md - CLAUDE.md is static markdown with no substitution.
- `allowed-tools` in a skill bypasses CLAUDE.md's guidance - if CLAUDE.md says "never run `git push --force`" but a skill's `allowed-tools: Bash(git push *)` auto-approves it, the skill wins at the permission layer. CLAUDE.md is advisory; `allowed-tools` is enforcement. This is a specific case of the broader rule "CLAUDE.md instructions shape Claude's behavior but are not a hard enforcement layer" [R6.C15].

### 4.4 SlashCommand tool / built-in vs user commands

Built-in commands like `/help`, `/compact`, `/memory`, `/init`, `/agents`, `/hooks`, `/mcp`, `/permissions` are not in the skill directory and are not governed by CLAUDE.md-level overrides. Some built-in commands (specifically `/init`, `/review`, `/security-review`) *are* callable via the Skill tool, but most (like `/compact`) are not [R6.C16]. CLAUDE.md cannot redefine a built-in command; if you need `/init` to do something custom for your project, you write instructions in CLAUDE.md *about* what `/init` should discover, and rely on the fact that `/init` reads CLAUDE.md (the `CLAUDE_CODE_NEW_INIT=1` multi-phase flow does exactly this) [R6.C17].

---

## 5. Hooks integration (and vice versa)

### 5.1 Hooks are the only mechanism that can execute before Claude sees a prompt

Hooks fire on 20+ lifecycle events: `SessionStart`, `SessionEnd`, `InstructionsLoaded`, `UserPromptSubmit`, `Stop`, `StopFailure`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `PermissionDenied`, `Notification`, `SubagentStart`, `SubagentStop`, `TaskCreated`, `TaskCompleted`, `ConfigChange`, `CwdChanged`, `FileChanged`, `WorktreeCreate`, `WorktreeRemove`, `PreCompact`, `PostCompact`, `Elicitation`, `ElicitationResult` [R6.C18]. Only hooks run shell/HTTP/prompt/agent handlers with access to `$CLAUDE_PROJECT_DIR` and can return `additionalContext` that Claude reads as if it were part of the user prompt.

### 5.2 The `InstructionsLoaded` hook is the explicit bridge to CLAUDE.md

The memory docs promote this pattern: "Use the `InstructionsLoaded` hook to log exactly which instruction files are loaded, when they load, and why. This is useful for debugging path-specific rules or lazy-loaded files in subdirectories" [R6.C19]. The hook's input payload exposes:

```json
{
  "hook_event_name": "InstructionsLoaded",
  "file_path": "/path/to/CLAUDE.md",
  "memory_type": "Project",
  "load_reason": "session_start|nested_traversal|path_glob_match|include|compact",
  "globs": ["path/patterns"],
  "trigger_file_path": "/path/that/triggered/load",
  "parent_file_path": "/path/to/parent/instruction"
}
```

This is the only observability surface for "which CLAUDE.md just got loaded" and it distinguishes the five load reasons. For debugging multi-file CLAUDE.md setups, this hook is the instrument.

### 5.3 Hooks can read and inject CLAUDE.md content, but it's rarely the right move

Nothing stops a `SessionStart` or `UserPromptSubmit` hook from calling `cat "$CLAUDE_PROJECT_DIR/CLAUDE.md"` and returning it in `hookSpecificOutput.additionalContext`. But Claude Code already loads CLAUDE.md at session start, so this would duplicate content. The legitimate hook-to-context patterns are:

- **Inject dynamic state** that CLAUDE.md cannot carry (current git branch, build status, open PR count).
  ```bash
  jq -n '{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "Recent activity: PR #42 merged. Build status: passing."}}'
  ```
  [R6.C20]
- **Enforce CLAUDE.md rules** that cannot be left to model judgment. Example: CLAUDE.md says "never commit `.env`", and a `PreToolUse` hook denies `Bash(git add .env*)` regardless of what Claude decides.
- **Persist environment variables** via `CLAUDE_ENV_FILE` in a `SessionStart`/`CwdChanged`/`FileChanged` hook, which is orthogonal to CLAUDE.md [R6.C21].

The correct division of labor: **CLAUDE.md is advisory and always re-reads cleanly; hooks are imperative and run regardless of what the model thinks**. The memory docs make this split explicit in the managed settings table ("Settings rules are enforced by the client regardless of what Claude decides to do. CLAUDE.md instructions shape Claude's behavior but are not a hard enforcement layer") [R6.C22].

### 5.4 Skill-scoped and agent-scoped hooks

Skills and subagents accept a `hooks:` frontmatter field that scopes a hook to that component's lifecycle only [R6.C23]. This lets a skill declare "when I am active, run this pre-tool-use check" without polluting the global `settings.json`. CLAUDE.md has no equivalent mechanism - CLAUDE.md cannot carry hooks, and there is no "CLAUDE.md-scoped hook" concept. If you need automation tied to CLAUDE.md's content, the hook lives in `settings.json` and the CLAUDE.md just describes the contract.

### 5.5 PreCompact / PostCompact hooks

These fire around the `/compact` boundary. They cannot change what CLAUDE.md does (re-injection is automatic), but they can snapshot extra state before summarization or enrich context after. Combined with `InstructionsLoaded`, they let you fully audit a `/compact` cycle's CLAUDE.md loading behavior.

---

## 6. MCP integration

### 6.1 MCP tools are deferred at startup

In the context-window simulation, "MCP tools (deferred)" is labelled: "By default, full schemas stay deferred and Claude loads specific ones on demand via tool search when a task needs them. Set `ENABLE_TOOL_SEARCH=auto` to load schemas upfront when they fit within 10% of the context window, or `ENABLE_TOOL_SEARCH=false` to load everything" [R6.C24]. This is a 2026 change - MCP tool names appear in the initial listing, but schemas (the expensive part) require a ToolSearch call.

### 6.2 CLAUDE.md can hint at MCP preference, and this matters

Because MCP schemas are deferred, Claude might reach for a built-in tool (like `Read`) when a project-specific MCP tool (like `mcp__filesystem__read_file` or `mcp__github__get_pull_request`) would be cheaper or more appropriate. CLAUDE.md is the idiomatic place to nudge this:

```markdown
## Tool preferences
- For files under `docs/private/`, prefer `mcp__filesystem__read_file` (handles auth).
- For GitHub issues/PRs, use `mcp__github__*` rather than raw `gh` CLI.
```

The doubled-underscore naming `mcp__server__tool` is the canonical Claude Code convention [R6.C25]. Note that this is a *hint*, not enforcement - if the model picks `Read` anyway, CLAUDE.md has no fallback. For hard enforcement, use `permissions.deny` in `settings.json`.

### 6.3 MCP configuration scopes and CLAUDE.md

MCP has three scopes [R6.C26]:

| Scope     | Loads in             | Shared with team           | Stored in                     |
| --------- | -------------------- | -------------------------- | ----------------------------- |
| Local     | Current project only | No                         | `~/.claude.json` (home dir)   |
| Project   | Current project only | Yes, via `.mcp.json` in repo | `.mcp.json` at project root |
| User      | All your projects    | No                         | `~/.claude.json`              |

CLAUDE.md interacts with these indirectly: a project CLAUDE.md can say "this project assumes `.mcp.json` is configured with the `postgres` server; run `claude mcp add ... postgres` if missing", which documents a prerequisite that Claude itself can't enforce. There is no native import of MCP config into CLAUDE.md and no concept of "MCP-aware CLAUDE.md".

### 6.4 MCP servers do not see CLAUDE.md

An MCP server is an external process. It communicates via JSON-RPC and receives only tool call inputs and its own config. It never sees CLAUDE.md. If your MCP server needs project context to make good decisions, pass it explicitly as a tool argument or let Claude construct the argument from CLAUDE.md knowledge.

### 6.5 MCP prompts as slash commands

MCP servers can advertise prompts that appear as slash commands in Claude Code (`/mcp__server__promptname`). These are separate from user skills/commands and do not participate in the CLAUDE.md discovery pipeline - they are pure MCP plumbing. CLAUDE.md can reference them by name for discoverability, identical to the skill-referencing pattern.

### 6.6 Plugin MCP servers

Plugins bundle MCP configuration in `.mcp.json` at the plugin root or inline in `plugin.json` [R6.C27]. When the plugin is enabled, its MCP servers start automatically, and `${CLAUDE_PLUGIN_ROOT}` / `${CLAUDE_PLUGIN_DATA}` substitutions let the plugin reference its own files. CLAUDE.md is not involved; MCP lifecycle is governed entirely by plugin enable/disable state.

---

## 7. Subagents integration (they do not auto-inherit CLAUDE.md parent context, but they do load CLAUDE.md themselves)

### 7.1 The subtlety: "subagent gets CLAUDE.md" vs "subagent gets parent's conversation"

The context-window simulation is precise here: a subagent "loads CLAUDE.md too. Same file, same content, but it counts against the subagent's context, not yours. The built-in Explore and Plan agents skip this for a smaller context" [R6.C28]. And: "The subagent does the work in its own context and returns only the summary... It loads CLAUDE.md and the same MCP and skill setup, but starts without your conversation history or the main session's auto memory" [R6.C29].

This is the exact clarification the R6 scope asked for:

- **Subagent DOES auto-load CLAUDE.md** (discovered by walking up the directory tree, same as the main session).
- **Subagent does NOT inherit the parent conversation, parent auto-memory, or parent skill descriptions.**
- **Built-in Explore and Plan agents explicitly skip CLAUDE.md** to shrink context - this is an optimization for read-only search agents.

The common misconception "subagents don't see CLAUDE.md, the orchestrator must brief them" is half right. They see CLAUDE.md; they do not see what the orchestrator has discussed. So the orchestrator still must brief them on task-specific state, but not on project-level conventions.

### 7.2 Two-directional skill-subagent integration

From the skills docs [R6.C30]:

| Approach                     | System prompt                             | Task                        | Also loads                   |
| :--------------------------- | :---------------------------------------- | :-------------------------- | :--------------------------- |
| Skill with `context: fork`   | From agent type (`Explore`, `Plan`, etc.) | SKILL.md content            | CLAUDE.md                    |
| Subagent with `skills` field | Subagent's markdown body                  | Claude's delegation message | Preloaded skills + CLAUDE.md |

Both paths load CLAUDE.md. The difference is what drives the system prompt.

### 7.3 Subagent frontmatter fields relevant to CLAUDE.md

Subagent definitions (`.claude/agents/*.md` or `~/.claude/agents/*.md`) support these fields that affect CLAUDE.md interaction [R6.C31]:

- `skills:` - preload skill content at startup (full body, not just description).
- `mcpServers:` - scope MCP servers to this subagent only. Inline definitions here keep MCP tools out of the main conversation entirely, reducing parent context.
- `memory: user|project|local` - enable persistent subagent memory at `~/.claude/agent-memory/`, separate from the main session's auto memory.
- `isolation: worktree` - run the subagent in a temporary git worktree with its own copy of the repo (and thus its own CLAUDE.md). If your CLAUDE.md references absolute paths or relies on git state, this matters.

### 7.4 Plugin subagents are a different priority tier

Subagent priority: managed settings > `--agents` CLI flag > `.claude/agents/` project > `~/.claude/agents/` user > plugin [R6.C32]. Plugin subagents cannot use `hooks`, `mcpServers`, or `permissionMode` fields (stripped at load for security). If a plugin subagent needs those, copy it into `.claude/agents/`.

### 7.5 "subagent_type" versions and plugin overrides

The `Agent(agent_type)` tool spec in the `tools:` frontmatter field [R6.C33] restricts which subagents can be spawned. This is orchestration plumbing; CLAUDE.md can *describe* the convention ("this project uses `researcher` and `builder` subagents") but cannot enforce it - enforcement is via `tools: Agent(researcher, builder)` in the orchestrator's definition.

---

## 8. Plugins - plugins have their own CLAUDE.md?

### 8.1 Plugin directory structure

A plugin root contains [R6.C34]:

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json           # manifest (name, version, author)
├── skills/<skill>/SKILL.md   # plugin skills (namespaced)
├── commands/*.md             # legacy commands (same as skills)
├── agents/*.md               # plugin subagents
├── hooks/hooks.json          # plugin-scoped hooks
├── .mcp.json                 # plugin MCP servers
├── .lsp.json                 # plugin LSP servers
├── monitors/monitors.json    # background monitors
├── bin/                      # binaries added to PATH
└── settings.json             # default settings on plugin enable
```

### 8.2 Plugins do not natively support CLAUDE.md

There is no documented `plugin/CLAUDE.md` or equivalent. Plugin documentation does not list a "CLAUDE.md" slot [R6.C35]. A plugin's behavioral guidance to Claude is expressed through:

- **Skill `description` fields** (the advertising surface).
- **Skill body content** (loaded when invoked).
- **Agent system prompts** (loaded when delegated).
- **`settings.json` in the plugin root** that can activate a default agent ([R6.C36]: "Setting `agent` activates one of the plugin's custom agents as the main thread, applying its system prompt, tool restrictions, and model").

If you want a plugin to contribute to CLAUDE.md-level context, the intended path is to ship a skill with `user-invocable: false` and a `description` that makes Claude load it when relevant. That keeps the plugin knowledge lazy.

### 8.3 Plugin priority versus project/user CLAUDE.md

Because plugins don't carry a CLAUDE.md, there is no "plugin CLAUDE.md vs project CLAUDE.md" conflict resolution question. Plugin skills/agents/hooks/MCP *do* have priority rules (see §3.5, §7.4), but plugin-provided instructions to Claude never compete with CLAUDE.md because they never enter CLAUDE.md's channel.

### 8.4 Plugin skills and CLAUDE.md namespace separation

Plugin skills are always namespaced as `plugin-name:skill-name` [R6.C37], so they cannot shadow a project or user skill with the same unqualified name. A CLAUDE.md that references `/deploy` gets the project/user skill; to force the plugin version, the CLAUDE.md must write `/acme:deploy`. This is an explicit design choice to prevent plugins from "stealing" slash namespaces.

---

## 9. `/memory` command ecosystem

### 9.1 `/memory` is the only session-level introspection of CLAUDE.md

Running `/memory` lists "all CLAUDE.md, CLAUDE.local.md, and rules files loaded in your current session, lets you toggle auto memory on or off, and provides a link to open the auto memory folder" [R6.C38]. Selecting a file opens it in your editor. There is no separate `/memory add` or `/memory edit` subcommand documented in 2026 - those verbs are handled conversationally ("ask Claude directly, like 'add this to CLAUDE.md'") or by editing via the `/memory` file picker.

### 9.2 The "remember this" shortcut

"When you ask Claude to remember something, like 'always use pnpm, not npm' or 'remember that the API tests require a local Redis instance,' Claude saves it to auto memory" [R6.C39]. This is the natural-language-to-memory bridge. If you specifically want CLAUDE.md (versioned, team-shared) rather than auto memory (personal, per-worktree, machine-local), you say "add this to CLAUDE.md" explicitly.

### 9.3 Auto memory vs CLAUDE.md decision matrix

From the docs table [R6.C40]:

|                      | CLAUDE.md files                                   | Auto memory                                                      |
| :------------------- | :------------------------------------------------ | :--------------------------------------------------------------- |
| **Who writes it**    | You                                               | Claude                                                           |
| **What it contains** | Instructions and rules                            | Learnings and patterns                                           |
| **Scope**            | Project, user, or org                             | Per working tree                                                 |
| **Loaded into**      | Every session                                     | Every session (first 200 lines or 25KB)                          |
| **Use for**          | Coding standards, workflows, project architecture | Build commands, debugging insights, preferences Claude discovers |

Auto memory lives at `~/.claude/projects/<project>/memory/MEMORY.md` plus topic files. Topic files are loaded on demand; `MEMORY.md` is eager but capped at 200 lines or 25KB [R6.C41]. This mirrors the "CLAUDE.md is the index, detail lives elsewhere" pattern but for machine-written state.

### 9.4 Subagent memory is distinct

A subagent with `memory: user` gets its own directory at `~/.claude/agent-memory/` that accumulates across conversations, separate from both main-session auto memory and CLAUDE.md [R6.C42]. This is the third memory tier (CLAUDE.md -> auto memory -> subagent memory) and is opt-in per subagent.

---

## 10. Competing systems (AGENTS.md, .cursorrules, .continuerules)

### 10.1 Native recognition

Claude Code natively recognizes only CLAUDE.md and CLAUDE.local.md (plus the `.claude/rules/` directory and `.claude-plugin/plugin.json` for plugins, and `.mcp.json` for MCP). It does **not** natively read:

- `AGENTS.md` - the OpenAI-backed open standard used by other coding agents (and Claude Code skills reference [agentskills.io](https://agentskills.io) as a base standard but specifically for Skills, not AGENTS.md files) [R6.C43].
- `.cursorrules` / `.cursor/rules/*.mdc` - Cursor-specific.
- `.continuerules` - Continue-specific.
- `.github/copilot-instructions.md` - GitHub Copilot-specific.

### 10.2 The AGENTS.md bridge pattern (recommended by Anthropic)

Anthropic explicitly addresses this with an idiomatic import pattern [R6.C44]:

> "Claude Code reads `CLAUDE.md`, not `AGENTS.md`. If your repository already uses `AGENTS.md` for other coding agents, create a `CLAUDE.md` that imports it so both tools read the same instructions without duplicating them."

```markdown
@AGENTS.md

## Claude Code

Use plan mode for changes under `src/billing/`.
```

The pattern: `@AGENTS.md` as the first line, then Claude-specific additions below. This is the sanctioned multi-tool workflow. The equivalent works for any other file name (`.cursorrules` is not standard markdown and won't parse cleanly, but `cursor-rules.md` would).

### 10.3 Writing-once, loading-everywhere

For teams running multiple coding assistants, the practical pattern is:

1. Write shared instructions in `AGENTS.md` (or any other well-structured markdown).
2. `CLAUDE.md` imports it with `@AGENTS.md`.
3. Cursor / Continue / Copilot each get a small adapter file that imports or references the same content.

This keeps one source of truth for project conventions while respecting each tool's discovery protocol.

### 10.4 Status of AGENTS.md adoption

As of April 2026, AGENTS.md remains an open standard maintained independently of Anthropic. Claude Code's position is "read our files, interoperate via import". There is no sign of Claude Code deprecating CLAUDE.md in favor of AGENTS.md or merging the two.

---

## 11. Prompt cache behavior

### 11.1 CLAUDE.md is part of the cacheable prefix

Claude Code uses Anthropic's prompt-caching feature to cache everything up to and including CLAUDE.md on the initial turn of a session. The hierarchy is `tools -> system -> messages`, with changes at each level invalidating that level and all subsequent levels [R6.C45]. CLAUDE.md is delivered as a user message immediately after the system prompt [R6.C46] ("CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself"), so its cache breakpoint is on the boundary between system prompt and conversation.

### 11.2 Editing CLAUDE.md invalidates the cache from that breakpoint onward

Because CLAUDE.md sits at a stable position near the front of the prompt, any edit to CLAUDE.md causes a fresh cache write on the next turn. This is the intended behavior. The practical consequence:

- **Editing CLAUDE.md mid-session is expensive.** You eat a cache write.
- **Editing CLAUDE.md between sessions is fine.** The cache expires anyway (5-minute or 1-hour TTLs depending on your setup).
- **High-churn CLAUDE.md is a token sink.** If you're editing CLAUDE.md every other turn, the cache is being invalidated constantly.

### 11.3 A 2026 known issue: `--resume` silently breaks the cache

Multiple sources confirm that starting with Claude Code v2.1.62, sessions that have undergone context compaction exhibit a regression where the prompt cache breaks silently on resume [R6.C47]. Instead of reading cached tokens, the API rebuilds them from scratch on every turn, up to 20x cost increase. This is a bug, not a design, and Anthropic is tracking it (issue #29230 in the `anthropics/claude-code` repo). Starting February 5, 2026, prompt caching also moved to workspace-level isolation (rather than organization-level), so teammates in the same org no longer share cache entries. CLAUDE.md is caught up in both changes.

### 11.4 Skills and cache

Skill *descriptions* are part of the eager startup block, so they are part of the cacheable prefix. Skill *bodies* enter as individual messages when invoked, and each invocation is cached independently. After `/compact`, "Claude Code re-attaches the most recent invocation of each skill after the summary, keeping the first 5,000 tokens of each. Re-attached skills share a combined budget of 25,000 tokens" [R6.C48]. Large skills are truncated to the per-skill cap; oldest invoked skills are dropped once the total budget is exceeded. The compaction-resilience of skills is **token-budget-capped**, unlike CLAUDE.md which is re-read in full.

### 11.5 Commands (legacy `.claude/commands/`) and cache

Identical to skills since they are the same mechanism.

### 11.6 Hooks, MCP tools, and cache

Hook handler outputs enter via `additionalContext` and become part of ordinary message history - they are cached like any other message. MCP tool schemas are deferred by default, so they are NOT in the initial cacheable prefix; they enter on demand via ToolSearch, which means each novel tool schema is a cache-miss on first use but cached thereafter [R6.C49].

### 11.7 Practical caching rules for CLAUDE.md maintenance

1. Batch CLAUDE.md edits. Don't tweak one line between each session.
2. Keep CLAUDE.md under 200 lines (the docs' own guidance [R6.C50]). Short files re-cache quickly on edit.
3. Put volatile content in imports (`@docs/current-sprint.md`), so editing the import invalidates only that portion of the cache prefix rather than the whole CLAUDE.md block - though in practice Anthropic's cache hashes on the full message, so this is a soft optimization.
4. Keep dates and session-specific state out of CLAUDE.md entirely. The Claude Code convention is to deliver them as `<system-reminder>` tags in the next user message, precisely to avoid breaking the cache.

---

## 12. Diagram: system interaction graph

```
                     +-----------------------------+
                     |  Claude Code session start  |
                     +-------------+---------------+
                                   |
          +------------------------+------------------------+
          |                                                 |
          v                                                 v
+---------------------+                        +--------------------------+
|   System prompt     |                        |  Hooks: SessionStart     |
|   (binary-shipped)  |                        |  fire -> additionalCtx   |
+----------+----------+                        +------------+-------------+
           |                                                |
           v                                                |
+---------------------+                                     |
| Auto memory         |                                     |
| MEMORY.md (200L/    |                                     |
| 25KB cap)           |                                     |
+----------+----------+                                     |
           |                                                |
           v                                                |
+---------------------+       walked up dir tree           |
| CLAUDE.md hierarchy |<-------+                           |
| - managed policy    |        |                           |
| - ~/.claude/CLAUDE  |        | @import (max 5 hops)      |
| - project root      |        |                           |
| - CLAUDE.local.md   |--------+                           |
| - .claude/rules/*   |                                    |
+----------+----------+                                    |
           |                                               |
           v                                               |
+---------------------+                                    |
| Skills discovery    |                                    |
| (descriptions only, |                                    |
| bundled + user +    |                                    |
| project + plugin)   |                                    |
+----------+----------+                                    |
           |                                               |
           v                                               |
+---------------------+                                    |
| MCP tool names      |                                    |
| (deferred schemas)  |                                    |
+----------+----------+                                    |
           |                                               |
           +-----------------> FIRST USER PROMPT <---------+
                                       |
            +--------------------------+------+------------+
            |                                 |            |
            v                                 v            v
  +----------------+                 +-----------+    +-----------+
  | Hooks:         |                 | Tool call |    | Subagent  |
  | UserPrompt-    |<----------------+ Pre/Post- |    | spawned   |
  | Submit         |    additional-  | ToolUse   |    | (Task)    |
  +--------+-------+    Context      +-----+-----+    +-----+-----+
           |                               |                |
           v                               |                v
  +---------------+                        |     +----------------------+
  | Maybe load    |                        |     | Subagent reloads     |
  | skill body,   |                        |     | CLAUDE.md (fresh),   |
  | MCP schema,   |                        |     | no parent convo,     |
  | path-rule     |                        |     | preloaded skills     |
  +------+--------+                        |     | if declared          |
         |                                 |     +----------+-----------+
         +---------------------------------+                |
                          |                                 |
                          v                                 v
                +-----------------+                +------------------+
                | Conversation    |                | Subagent returns |
                | continues,      |                | summary only     |
                | tokens accrete  |                +--------+---------+
                +--------+--------+                         |
                         |                                  |
                         +<---------------------------------+
                         |
                         v
                +-----------------+
                | Context fills   |
                | -> /compact     |
                +--------+--------+
                         |
                         v
            Re-inject: system prompt, MEMORY.md,
                       CLAUDE.md (full, from disk),
                       MCP tool names
            Truncate:  invoked skills (5k each, 25k total)
            Drop:      skill descriptions (index not re-injected),
                       nested CLAUDE.md in subdirs,
                       path-scoped rules (reload on next match)
```

---

## Table: system -> CLAUDE.md relationship (10+ integration points)

| System                      | Uses CLAUDE.md?              | How                                                                                                       | Mechanism                                                    |
| --------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| System prompt               | No (CLAUDE.md loads after it) | CLAUDE.md delivered as user message post-system prompt                                                    | Startup pipeline [R6.C46]                                   |
| Auto memory (`MEMORY.md`)   | Orthogonal; both eager       | Both loaded at session start; auto memory is per-worktree, CLAUDE.md is in-repo                           | Loaded alongside [R6.C40]                                   |
| `.claude/rules/`            | Same priority as `.claude/CLAUDE.md` for unscoped rules | Path-scoped rules lazy-load on file match; same glob vocabulary as skills `paths:`              | Memory docs [R6.C3]                                         |
| Skills (descriptions)       | No; CLAUDE.md may reference  | CLAUDE.md can say "/explain-code for teaching", but no syntactic link                                     | Skill description index [R6.C5]                             |
| Skills (bodies, invoked)    | Coexist in context           | Both in message history; skill body loaded on invocation, CLAUDE.md re-read at session start              | Skill content lifecycle [R6.C4][R6.C48]                     |
| Skills (`context: fork`)    | Yes; subagent loads CLAUDE.md | Skill runs in forked subagent, which reloads CLAUDE.md fresh                                             | Skill forking [R6.C30]                                      |
| Slash commands (legacy)     | Same as skills               | Merged with skills per 2026 docs; CLAUDE.md references by name                                            | Unified mechanism [R6.C13]                                  |
| `/memory` command           | Yes; lists all CLAUDE.md files | Selecting opens editor; toggle auto memory; browse nested                                                | Memory docs [R6.C38]                                        |
| `/init`                     | Reads + generates CLAUDE.md  | Analyzes codebase, proposes CLAUDE.md. `CLAUDE_CODE_NEW_INIT=1` multi-phase flow                          | Memory docs [R6.C17]                                        |
| Hooks (`InstructionsLoaded`)| Observes CLAUDE.md loads     | Receives `file_path`, `memory_type`, `load_reason` on every CLAUDE.md load                                | Hooks docs [R6.C19]                                         |
| Hooks (`SessionStart`)      | Complements CLAUDE.md        | Injects dynamic state CLAUDE.md can't carry (git status, build health)                                    | Hooks docs [R6.C20]                                         |
| Hooks (`UserPromptSubmit`)  | Can read CLAUDE.md           | Handler can cat CLAUDE.md via `$CLAUDE_PROJECT_DIR` and inject, but duplicates default load               | Hooks docs [R6.C18]                                         |
| Hooks (`PreCompact`, `PostCompact`) | Bracket CLAUDE.md re-injection | Fire before/after the compact boundary; CLAUDE.md re-loads automatically                            | Hooks docs [R6.C18]                                         |
| MCP servers                 | Do not see CLAUDE.md         | MCP is external JSON-RPC; context is per-tool-call                                                        | MCP docs [R6.C26]                                           |
| MCP tools in context        | CLAUDE.md can hint usage     | "For docs/private/, prefer mcp__filesystem__..." - advisory                                               | Tool-selection hinting [R6.C25]                             |
| Subagents (main session)    | Yes; reloads CLAUDE.md       | Auto-discovers CLAUDE.md from cwd walk. Does NOT inherit parent conversation                              | Subagent docs [R6.C28][R6.C29]                              |
| Subagents (Explore, Plan)   | Skip CLAUDE.md                | Read-only agents optimize context by omitting CLAUDE.md                                                   | Context-window visualization [R6.C28]                       |
| Subagents (`skills:` preload) | Yes; CLAUDE.md + full skill bodies | Subagent gets CLAUDE.md plus preloaded skill content (full, not description)                        | Subagent docs [R6.C10]                                      |
| Subagents (`isolation: worktree`) | Yes; loads worktree's CLAUDE.md | Temporary git worktree with own CLAUDE.md copy                                                   | Subagent frontmatter [R6.C31]                               |
| Plugins                     | No native CLAUDE.md           | No plugin/CLAUDE.md slot; plugins contribute via skills/agents/hooks/MCP                                  | Plugin docs [R6.C35]                                        |
| Plugin skills (namespaced)  | CLAUDE.md can reference       | `/plugin-name:skill-name` must be written fully; no shadowing                                             | Plugin namespacing [R6.C37]                                 |
| Managed policy CLAUDE.md    | Cannot be excluded            | OS-specific locations; cannot be skipped via `claudeMdExcludes`                                           | Memory docs [R6.C1]                                         |
| `claudeMdExcludes` setting  | Filters CLAUDE.md loads       | Glob patterns to skip specific files in monorepos                                                         | Memory docs [R6.C51]                                        |
| `@import` syntax            | CLAUDE.md's own lever        | Recursive up to 5 hops; relative or absolute paths; external imports prompt for approval                  | Memory docs [R6.C2]                                         |
| AGENTS.md                   | Bridged via `@AGENTS.md`      | Explicit recommended pattern: import AGENTS.md into CLAUDE.md                                             | Memory docs [R6.C44]                                        |
| `.cursorrules`, `.continuerules` | Not recognized          | No import bridge; users rewrite as markdown if they want to cross-reference                               | Not in docs (inferred)                                      |
| Prompt cache                | CLAUDE.md is part of prefix   | Edits invalidate the cache from that breakpoint forward; use imports to localize churn                    | Prompt caching docs [R6.C45]                                |
| `--add-dir`                 | CLAUDE.md opt-in               | `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` required; skills auto-load, CLAUDE.md does not          | Memory + permissions docs [R6.C52]                         |

That is 25 distinct integration points, well above the "min 10" requirement.

---

## 13. Gaps (what the docs do not settle)

1. **No documented maximum CLAUDE.md size.** Docs recommend under 200 lines but provide no hard limit at which truncation occurs. Whether a 10,000-line CLAUDE.md would be fully loaded or silently truncated is not stated.
2. **`@import` for remote URLs.** Docs say "both relative and absolute paths are allowed" but do not confirm whether `@https://example.com/file.md` resolves. Behavior unverified.
3. **Circular `@import` handling.** Max depth is five hops, but docs don't say whether a cycle is detected, errored, or silently cut off at depth five.
4. **Plugin CLAUDE.md.** Despite plugin subagents, plugin skills, plugin hooks, and plugin MCP all being first-class, there is no plugin CLAUDE.md. Intentional? Likely yes (plugins talk through skill/agent bodies), but no official statement.
5. **`--resume` + CLAUDE.md edit interaction.** Given the 2.1.62 cache regression, what happens if CLAUDE.md is edited between resume and the next turn? Is the cache re-invalidated cleanly or does the stale-context bug compound?
6. **Nested CLAUDE.md collision rules.** If `project/CLAUDE.md` says "use pnpm" and `project/frontend/CLAUDE.md` says "use npm", docs say "all discovered files are concatenated... when instructions conflict, your personal notes are the last thing Claude reads at that level" [R6.C53] - but the ordering across *directories* is underspecified for conflicting non-personal files.
7. **Hook access to CLAUDE.md content.** Confirmed that `InstructionsLoaded` receives `file_path` but not file *content*. To read content a hook must `cat` the file itself - no direct content injection API.
8. **Subagent memory vs main session auto memory merging.** If a subagent with `memory: project` writes an insight, is that merged into the main session's `MEMORY.md` or kept separate? Docs imply separate, but the relationship on `/compact` or session resume isn't traced.

---

## 14. Bibliografia

All sources are official Anthropic documentation at `code.claude.com/docs/en/` (formerly `docs.claude.com/en/docs/claude-code/` - the redirect was observed during this research on 2026-04-17). Section anchors are given where applicable.

- [R6.C1] [Memory - Choose where to put CLAUDE.md files](https://code.claude.com/docs/en/memory#choose-where-to-put-claude-md-files)
- [R6.C2] [Memory - Import additional files](https://code.claude.com/docs/en/memory#import-additional-files)
- [R6.C3] [Memory - CLAUDE.md files](https://code.claude.com/docs/en/memory#claude-md-files)
- [R6.C4] [Skills - Overview](https://code.claude.com/docs/en/skills) ("or when a section of CLAUDE.md has grown into a procedure")
- [R6.C5] [Skills - Control who invokes a skill / Skill content lifecycle](https://code.claude.com/docs/en/skills#skill-content-lifecycle)
- [R6.C6] [Context window simulation - skill description entry](https://code.claude.com/docs/en/context-window)
- [R6.C7] [Skills - Frontmatter reference: `disable-model-invocation`](https://code.claude.com/docs/en/skills#frontmatter-reference)
- [R6.C8] [Sub-agents - Preload skills into subagents](https://code.claude.com/docs/en/sub-agents#preload-skills-into-subagents)
- [R6.C9] [Skills - Frontmatter reference: `paths`](https://code.claude.com/docs/en/skills#frontmatter-reference)
- [R6.C10] Same as R6.C8.
- [R6.C11] [Skills - Bundled skills](https://code.claude.com/docs/en/skills#bundled-skills)
- [R6.C12] [Skills - Where skills live](https://code.claude.com/docs/en/skills#where-skills-live)
- [R6.C13] [Skills - Overview note on command merge](https://code.claude.com/docs/en/skills)
- [R6.C14] [Skills - Pass arguments to skills](https://code.claude.com/docs/en/skills#pass-arguments-to-skills)
- [R6.C15] [Memory - Manage CLAUDE.md for large teams](https://code.claude.com/docs/en/memory#manage-claude-md-for-large-teams)
- [R6.C16] [Skills - Restrict Claude's skill access](https://code.claude.com/docs/en/skills#restrict-claudes-skill-access)
- [R6.C17] [Memory - Set up a project CLAUDE.md / `CLAUDE_CODE_NEW_INIT=1`](https://code.claude.com/docs/en/memory#set-up-a-project-claude-md)
- [R6.C18] [Hooks - Events and configuration](https://code.claude.com/docs/en/hooks)
- [R6.C19] [Memory - Troubleshoot / InstructionsLoaded hook tip](https://code.claude.com/docs/en/memory#troubleshoot-memory-issues)
- [R6.C20] [Hooks - SessionStart with additionalContext](https://code.claude.com/docs/en/hooks)
- [R6.C21] [Hooks - Persist Environment Variables via CLAUDE_ENV_FILE](https://code.claude.com/docs/en/hooks)
- [R6.C22] Same as R6.C15.
- [R6.C23] [Hooks - Hooks in skills and agents](https://code.claude.com/docs/en/hooks#hooks-in-skills-and-agents)
- [R6.C24] [Context window - MCP tools deferred](https://code.claude.com/docs/en/context-window)
- [R6.C25] MCP tool naming convention (`mcp__server__tool`) per `/mcp` output format and Anthropic convention.
- [R6.C26] [MCP - MCP installation scopes](https://code.claude.com/docs/en/mcp#mcp-installation-scopes)
- [R6.C27] [MCP - Plugin-provided MCP servers](https://code.claude.com/docs/en/mcp#plugin-provided-mcp-servers)
- [R6.C28] [Context window - Subagent loads CLAUDE.md, Explore/Plan skip](https://code.claude.com/docs/en/context-window)
- [R6.C29] Same as R6.C28 (subagent fresh context description).
- [R6.C30] [Skills - Run skills in a subagent table](https://code.claude.com/docs/en/skills#run-skills-in-a-subagent)
- [R6.C31] [Sub-agents - Supported frontmatter fields](https://code.claude.com/docs/en/sub-agents#supported-frontmatter-fields)
- [R6.C32] [Sub-agents - Choose the subagent scope](https://code.claude.com/docs/en/sub-agents#choose-the-subagent-scope)
- [R6.C33] [Sub-agents - Restrict which subagents can be spawned](https://code.claude.com/docs/en/sub-agents#restrict-which-subagents-can-be-spawned)
- [R6.C34] [Plugins - Plugin structure overview](https://code.claude.com/docs/en/plugins#plugin-structure-overview)
- [R6.C35] [Plugins - Develop more complex plugins](https://code.claude.com/docs/en/plugins#develop-more-complex-plugins) (absence of CLAUDE.md slot)
- [R6.C36] [Plugins - Ship default settings](https://code.claude.com/docs/en/plugins#ship-default-settings-with-your-plugin)
- [R6.C37] [Plugins - Skill namespacing](https://code.claude.com/docs/en/plugins) (namespacing note in Quickstart)
- [R6.C38] [Memory - View and edit with `/memory`](https://code.claude.com/docs/en/memory#view-and-edit-with-memory)
- [R6.C39] Same as R6.C38.
- [R6.C40] [Memory - CLAUDE.md vs auto memory](https://code.claude.com/docs/en/memory#claude-md-vs-auto-memory)
- [R6.C41] [Memory - How auto memory works](https://code.claude.com/docs/en/memory#how-it-works)
- [R6.C42] [Sub-agents - Enable persistent memory](https://code.claude.com/docs/en/sub-agents#enable-persistent-memory)
- [R6.C43] [Skills - Agent Skills open standard](https://code.claude.com/docs/en/skills) + [agentskills.io](https://agentskills.io)
- [R6.C44] [Memory - AGENTS.md](https://code.claude.com/docs/en/memory#agents-md)
- [R6.C45] [Prompt caching - hierarchy](https://docs.claude.com/en/docs/build-with-claude/prompt-caching) (tools -> system -> messages)
- [R6.C46] [Memory - Troubleshoot (CLAUDE.md delivered as user message)](https://code.claude.com/docs/en/memory#claude-isnt-following-my-claude-md)
- [R6.C47] [Issue #29230 anthropics/claude-code - v2.1.62 KV cache regression](https://github.com/anthropics/claude-code/issues/29230) and [Claude Code cache-fix patch](https://github.com/cnighswonger/claude-code-cache-fix)
- [R6.C48] [Skills - Skill content lifecycle / compaction budget](https://code.claude.com/docs/en/skills#skill-content-lifecycle)
- [R6.C49] [Context window - MCP tool deferred schemas + ToolSearch](https://code.claude.com/docs/en/context-window)
- [R6.C50] [Memory - Write effective instructions / Size](https://code.claude.com/docs/en/memory#write-effective-instructions)
- [R6.C51] [Memory - Exclude specific CLAUDE.md files / `claudeMdExcludes`](https://code.claude.com/docs/en/memory#exclude-specific-claude-md-files)
- [R6.C52] [Memory - Load from additional directories](https://code.claude.com/docs/en/memory#load-from-additional-directories) + [Permissions - `--add-dir` exceptions](https://code.claude.com/docs/en/permissions)
- [R6.C53] [Memory - How CLAUDE.md files load](https://code.claude.com/docs/en/memory#how-claude-md-files-load)

Secondary / confirmatory:
- [ClaudeCodeCamp - How Prompt Caching Actually Works in Claude Code](https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code)
- [SmartScope - Claude Code Token Consumption Cache Bug](https://smartscope.blog/en/blog/claude-code-token-consumption-cache-bug/)
- [PiunikaWeb - Anthropic cache bugs investigation](https://piunikaweb.com/2026/03/31/claude-cache-bugs-tokens-20x-more-anthropic-investigating/)

---

**End R6.** Output: ~4,100 words. Citations: 53 distinct `R6.C<N>` primary anchors plus three secondary links. Integration points: 25 enumerated in the table (target: 10+). ASCII diagrams: two (the startup flow and the system interaction graph).
