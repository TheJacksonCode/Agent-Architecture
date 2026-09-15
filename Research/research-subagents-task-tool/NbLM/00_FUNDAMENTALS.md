# 00 FUNDAMENTALS - Claude Code Subagents and Task Tool

**Purpose:** Orient readers unfamiliar with multi-agent Claude Code. After this file, the reader knows the vocabulary, the three async mechanisms, the cost model, and the architectural primitives.

---

## What is a "subagent" in Claude Code?

A subagent is a separate Claude invocation, spawned by the main agent, that runs in its own isolated context window and returns a summary. The main agent uses the Task tool (renamed Agent tool in v2.1.63, but both names coexist in the docs and community posts) to spawn them.

Subagents are the basic unit of work isolation and parallelism. They let the main agent:
- Delegate a bounded, scoped task
- Get back a compressed summary instead of raw material
- Keep the main context window clean

Their defining property is that they have **their own context**. The main agent's conversation history does not carry over. The subagent starts fresh with CLAUDE.md, MCP servers, skills for its scope, and a spawn prompt.

## What is the Task tool?

The Task tool (also called Agent tool as of v2.1.63) is the spawn primitive. When the main agent calls it:
1. A subagent session is created
2. It loads the subagent definition (YAML frontmatter + body) from one of four scopes: project, user, plugin, or CLI
3. It receives a spawn prompt from the main agent
4. It runs its own tool-use loop (bounded by `maxTurns`) until it produces a result
5. The result is returned to the main agent
6. The subagent's context is discarded

There are five built-in subagent types: Explore (Haiku, read-only), Plan (inherit model, read-only), general-purpose (inherit, all tools), statusline-setup (Sonnet, narrow tools), Claude Code Guide (Haiku, docs queries).

## What is a subagent definition?

A file at `.claude/agents/<name>.md` (project) or `~/.claude/agents/<name>.md` (user) with YAML frontmatter and a body. The frontmatter has up to 17 fields specifying behavior: `name`, `description`, `tools`, `disallowedTools`, `model`, `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `hooks`, `memory`, `background`, `effort`, `isolation`, `color`, `initialPrompt`, plus the body content.

The single most important field is `description`. It is what Claude uses to decide when to delegate. It should describe WHEN to run, not just WHAT.

## The three async mechanisms

This is the first vocabulary distinction to learn. Three separate features solve three separate problems, and confusing them is the #1 community mistake.

| Mechanism | Problem it solves | Lives where | When you pick it |
|---|---|---|---|
| **Task / Agent tool** (subagents) | Synchronous scoped delegation with summary return | Inside one session | "Do this focused task and give me the result" |
| **run_in_background** (Bash parameter) | Fire-and-complete shell work | Main session | "Start the dev server, I'll keep working" |
| **Monitor tool** | Event streaming from long-running processes | Main session | "Watch the logs and wake me if errors appear" |
| **Agent Teams + SendMessage** | Peer Claude sessions that communicate | Separate processes | "Multiple agents researching together, talking to each other" |

## Architectural primitive: max recursion depth = 1

Both subagents and Agent Teams teammates have a hard flatness limit:
- A subagent **cannot** spawn another subagent (Task tool is not exposed to nested agents; GitHub #4182 confirms)
- An Agent Teams teammate **cannot** spawn its own team

Practical implication: the total hierarchy is 1 level. If you need more levels of delegation, you chain them via the main agent or through task-list decomposition. This is a deliberate design choice, not a missing feature.

## Architectural primitive: context isolation

A subagent gets four things from its parent:
1. CLAUDE.md chain (project + user + nested)
2. MCP servers (filtered by frontmatter)
3. Skills registered for its scope (filtered by frontmatter)
4. Tool allowlist (subject to frontmatter filter)

A subagent does NOT get five things:
1. Parent conversation history
2. Parent's open files
3. Parent's current tool state
4. Parent's memory writes made this session
5. Parent's transient variables

Implication: if the main agent just discovered something critical, that knowledge MUST be re-stated in the spawn prompt. It does not flow forward automatically.

## The entry tax

Every subagent pays a large setup cost before it does useful work. Typical composition:

| Component | Tokens |
|---|---|
| Subagent system prompt | 5,000-8,000 |
| Tool schema definitions (built-in) | 4,000-6,000 |
| CLAUDE.md chain (project + user + plugins) | 5,000-15,000 |
| MCP tool descriptions (5 servers avg) | 10,000-20,000 |
| Subagent-specific skills | 500-5,000 |
| Initial task payload | 500-5,000 |
| **Total entry tax** | **~20,000-50,000 tokens** |

At 5 parallel subagents, that's 100,000-250,000 tokens of overhead BEFORE any useful work. For small tasks (<5k tokens of real work), the subagent form can cost 8-16x more than inline.

Rule of thumb: subagents pay off when the raw material they'd read would flood the main context, and they return a compressed summary. They don't pay off for small, self-contained tasks.

## The model routing problem

April 2026 pricing:
- Opus 4.7: $5 input / $25 output per million tokens
- Sonnet 4.6: $3 input / $15 output
- Haiku 4.5: $1 input / $5 output

GitHub issue #27665 reports that **93.8% of real community Claude Code usage runs on Opus**. Most of that is waste. Grep, extraction, summarization, and enumeration are Haiku-quality tasks that are paying Opus prices.

The fix is explicit `model:` per subagent definition. Never use `inherit` by default. Canonical tiering:
- **Haiku** for search / grep / enumerate / extract / summarize
- **Sonnet** for code edits and routine tool use
- **Opus** for planning, synthesis, conflict resolution, orchestration

Multi-agent systems consume roughly 15x more tokens than single-agent chat. Only justified when outcome value is at least that much greater.

## Agent Teams: fundamentally different from subagents

Despite the similar terminology, Agent Teams (experimental, enabled via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) are a **different primitive**.

A teammate is not a subagent. A teammate is a **separate Claude Code session** with its own context window, its own CLAUDE.md loading, its own MCP and skills. Teammates can message each other directly via the SendMessage tool. Multiple teammates share a task list at `~/.claude/tasks/{team-name}/`.

Comparison:

| | Subagent (Task tool) | Agent Teams teammate |
|---|---|---|
| Process | Inside one session | Separate session |
| Peer communication | None (parent-mediated) | Direct via SendMessage |
| Lifetime | Spawn -> return -> discard | Spawn -> lifecycle -> shutdown |
| Resume | /resume (with bug #11712) | NOT restored by /resume or /rewind |
| Token cost | 20-50k entry + work | Full session cost per teammate |
| Best for | Focused, scoped subtask | Peer collaboration, debate, cross-layer work |

SendMessage supports 5 message types: `message` (direct), `broadcast` (all), `shutdown_request`, `shutdown_response`, `plan_approval_response`.

## Monitor tool: the April 2026 headline feature

Shipped in Claude Code v2.1.98 on April 9, 2026. Transforms Claude Code from time-driven polling to event-driven reactivity.

Four parameters:
- `description` - notification label
- `command` - shell command whose stdout lines become events
- `timeout_ms` - default 5 min, max 1 hour
- `persistent` - true keeps the monitor for session duration

Key properties:
- Each stdout line = one notification
- stderr routes to file, never to stream
- Silent stream = 0 tokens
- Use `grep --line-buffered` in pipes to avoid buffering delays
- Use `|| true` in poll loops to survive transient errors
- Unavailable on Bedrock / Vertex / Foundry - Anthropic API + Claude Code only

Token economics: Monitor delivers ~95% token reduction vs polling patterns (claudefa.st measurement: a 10-minute build watched every 15 seconds costs ~12k tokens polling vs <600 tokens via Monitor).

## Hooks: the coordination and enforcement layer

Hooks fire at lifecycle points and can inject context or block actions (exit code 2). Relevant to multi-agent work:

- **SubagentStart** - subagent spawned (cannot block; can inject context)
- **SubagentStop** - subagent finishes (CAN block - prevents stop, forces continuation)
- **TeammateIdle** - teammate about to idle (CAN block - keeps teammates working)
- **TaskCreated** - new task added to team task list (CAN block)
- **TaskCompleted** - task marked complete (CAN block - canonical quality gate)

`TaskCompleted` + exit code 2 is the cleanest team-native quality gate: hook runs tests, blocks completion on failure.

Async hook flags (January 2026): `async: true` for non-blocking execution; `asyncRewake: true` for non-blocking that wakes Claude on exit code 2.

## Worktrees: filesystem-level isolation

Git worktrees at `.claude/worktrees/<name>/` isolate parallel Claude sessions. Each worktree has its own branch, HEAD, index, working tree. All share the same `.git` object database.

The `EnterWorktree` tool creates + switches session cwd. `ExitWorktree` leaves with keep-or-remove choice.

**CRITICAL:** Bug #38287 is still open as of April 2026. Silent commit deletion can occur when Claude Code's worktree cleanup intersects with user-initiated git operations. More likely on Windows. Mitigation: avoid worktree-heavy workflows on Windows until the bug closes.

## Platform reality: macOS-first

Split-pane Agent Teams mode (which most demos show) requires tmux or iTerm2. It is NOT supported in:
- VS Code integrated terminal
- Windows Terminal
- Ghostty

Windows users are restricted to in-process mode (all teammates in one terminal, Shift+Down to cycle). Combined with the worktree bug #38287 primarily affecting Windows, multi-agent Claude Code is genuinely a macOS-first product as of April 2026.

Workarounds for Windows: use WSL2 for tmux workflows, stick to in-process Agent Teams, use branch-per-session instead of worktree-per-session.

## Version signals (as of April 2026)

| Version | Date | Feature |
|---|---|---|
| v2.1.32 | ~Feb 2026 | Agent Teams first available (experimental) |
| v2.1.63 | ~Feb-Mar 2026 | Task tool renamed to Agent tool |
| v2.1.98 | 2026-04-09 | Monitor tool launch |
| Jan 2026 | | async hook flags |

The feature set is moving fast. Revisit assumptions every 2 months if building on these primitives.

## The anchor principle: "think like your agents"

Anthropic's published #1 lesson from building multi-agent systems is to develop accurate mental models through simulation before prompting. You cannot prompt-engineer what you cannot imagine the agent seeing.

Practical steps:
1. Write the spawn prompt as you plan to send it
2. Open a plain Claude chat and paste the prompt
3. Ask: do I have enough context to do this task well? What's missing?
4. Iterate until the answer is yes

This is a 5-minute practice per subagent definition. It catches 80% of prompt problems before they burn tokens in production.

---

## Glossary

- **Agent tool** - current name (v2.1.63+) for what was Task tool; spawns subagents
- **Agent Teams** - experimental feature for multiple peer Claude Code sessions
- **CLAUDE.md** - project or user instructions file, loaded into every session context
- **Entry tax** - setup tokens a subagent pays before producing useful work (~20-50k)
- **Frontmatter** - YAML config at top of subagent definition file
- **Hook** - shell command or prompt executed at lifecycle events
- **Lead** - the main Claude Code session in an Agent Teams setup; coordinates the team
- **MCP** - Model Context Protocol; external tool servers
- **Monitor tool** - streams stdout events from a long-running shell command back to Claude
- **Skill** - a markdown file that defines capabilities/instructions, loaded into context by name
- **Subagent** - a Claude invocation inside the main agent's session with its own context
- **Task tool** - older name for Agent tool; both still seen in docs
- **Teammate** - a peer Claude Code session in Agent Teams; not a subagent
- **Worktree** - a git-isolated working directory for a branch

---

**Next:** `01_PATTERNS.md` for playbooks and decision rules; `02_DECISION_GUIDE.md` for when-to-use-what flowcharts.
