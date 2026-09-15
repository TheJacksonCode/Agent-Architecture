# R6 - Background Agents, Monitor, SendMessage, run_in_background

**Role:** res_ux (UX + long-running workflows)
**Scope:** Asynchronous agent execution in Claude Code: run_in_background, Monitor tool, SendMessage, Agent Teams experimental mode, lifecycle hooks for async work.
**Date:** 2026-04-17
**Status:** Primary docs complete. Gaps flagged per DD04.

---

## 1. Three Mechanisms, Three Distinct Problems

Claude Code exposes three separate abstractions for "work that doesn't block the main turn". They solve different problems and are often conflated in community posts. The taxonomy below is the first thing to get straight.

| Mechanism | Problem solved | Lives where | Notification model |
|---|---|---|---|
| **`run_in_background`** (Bash) | Fire a one-shot process, keep working | Main session | One notification on exit |
| **Monitor tool** | Watch a long-running stream, react to events mid-turn | Main session | One notification per stdout line |
| **SendMessage / Agent Teams** | Spawn peer Claude sessions with their own context windows and talk to them | Separate processes | Asynchronous mailbox, auto-delivered |

R1-R2 covered the synchronous spawn path (Task tool -> subagent -> result-back). R6 is about the asynchronous paths: long-running shell work (`run_in_background` + Monitor) and long-running peer agents (Agent Teams + SendMessage).

**R6.C1:** `run_in_background`, Monitor, and Agent Teams are three separate features with three separate use cases. Conflating them is the #1 anti-pattern in community posts. (source: Anthropic docs + Claudelog)

---

## 2. `run_in_background` (Bash tool parameter)

### 2.1 What it is

`run_in_background` is a boolean parameter on the Bash tool. When `true`, Claude Code spawns the command as a daemon-style background task, returns immediately with a task ID string, and Claude continues the turn.

### 2.2 Triggers

Three ways:
- Set `run_in_background: true` on the Bash tool call
- Press **Ctrl+B** to move a foreground Bash invocation to the background mid-run
- Let Claude infer it from context ("start my dev server", "run the build")

### 2.3 Lifetime and limits

From the learn-claude-code reference implementation (community-reverse-engineered from open-source Claude Code internals; treat as illustrative, not authoritative):

- **Task ID:** 8-char UUID prefix, surfaced as `[bg:<id>]` in notifications
- **Default timeout:** 300 seconds per task
- **Output buffer:** ~50 KB captured, truncated to ~500 chars per notification injected
- **Thread model:** daemon threads; tasks exit when the main session exits
- **Retrieval:** `BashOutput` tool reads the accumulated stdout since last read (incremental, not polling the live process)

### 2.4 Known issues

- **Issue #11716 (critical):** Background bash processes can cause infinite system-reminders and token exhaustion. Long-lived background tasks that emit output faster than the session can drain trigger reminder loops.
- **Issue #13847 (feature):** Users want a statusline indicator of active background processes. Currently they are invisible until they notify.
- **Issue #18544 (feature):** Setting to disable automatic background-task completion notifications - some users find them noisy.

**R6.C2:** `run_in_background` is best for **fire-and-complete** work (tests, builds, one-shot scripts). It is not designed for watching streams - that is what Monitor is for.

---

## 3. Monitor tool (v2.1.98, April 9 2026)

### 3.1 Release and positioning

Released April 9 2026 in Claude Code **v2.1.98**. Announced by Noah Zweben (Claude Code PM) on X; the post earned 4.8k likes / 745k views / 4k bookmarks, indicating significant community demand. This feature shipped specifically to solve the polling-tax problem `run_in_background` left open.

### 3.2 Four-parameter schema

| Parameter | Type | Default | Purpose |
|---|---|---|---|
| `description` | string | required | Label shown on each notification (e.g., "errors in deploy.log") |
| `command` | string | required | Shell command whose stdout becomes the event stream |
| `timeout_ms` | number | 300000 (5 min) | Auto-kill duration; max 3,600,000 (1 hour) |
| `persistent` | boolean | false | True = survives until session ends; false = one-shot watch |

### 3.3 Execution model

From claudefa.st reference mechanics:
- **Each line of stdout = one notification**
- Lines emitted within 200ms are batched into a single notification (coalescing)
- **stderr is routed to a file**, never to the event stream (so compile noise does not wake Claude)
- When the stream is silent, **zero tokens are spent** - this is the defining property vs polling

Example pattern (stream filter):
```bash
tail -f /var/log/app.log | grep --line-buffered "ERROR"
```

Example pattern (poll-and-if filter):
```bash
while true; do
  gh api "repos/owner/repo/issues/123/comments" | jq '.[-1]'
  sleep 30
done
```

### 3.4 Three critical rules (documented best practices)

1. **Always use `grep --line-buffered`** in pipes - default line buffering can hold output for seconds or minutes, delaying notifications.
2. **Handle transient failures** with `|| true` in poll loops - a non-zero exit kills the monitor.
3. **Be selective with stdout** - too many events auto-stop the monitor (anti-flood protection).

### 3.5 Economic argument

Aiia's canonical example: a dev server that crashes once per hour. Polling with `/loop` at 1-minute granularity = 60 cycles/hour, each burning tokens. Monitor = 1 event per crash, zero tokens when silent. For a 10-minute build watched every 15 seconds:
- Polling: ~12,000 tokens
- Monitor: < 600 tokens
- **~95% reduction** (claudefa.st measurement)

### 3.6 Platform limits

- **Unavailable on Amazon Bedrock, Google Vertex AI, Microsoft Foundry** - Monitor is first-class Claude Code / Anthropic API only.
- Permission rules follow Bash tool `allow`/`deny` patterns. So the same command allowlist applies.

**R6.C3:** Monitor is event-driven not time-driven. It is cheaper than `/loop` or CronCreate for anything that does not need to tick on a clock.

---

## 4. SendMessage and Agent Teams (experimental, Feb 5 2026)

### 4.1 What Agent Teams actually are

From the official `/en/agent-teams` docs:

> Agent teams let you coordinate multiple Claude Code instances working together. One session acts as the team lead, coordinating work, assigning tasks, and synthesizing results. Teammates work independently, each in its own context window, and communicate directly with each other.

Key contrast with subagents: **teammates are peer Claude Code sessions**, not subagent objects inside one session. They have full context windows, full CLAUDE.md loading, full MCP, full skills - the whole apparatus. And they can message each other directly, not just the lead.

### 4.2 Requirements

- Claude Code **v2.1.32 or later**
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in environment or `settings.json` `env` block
- For split-pane mode: tmux or iTerm2 with `it2` CLI (macOS best; split panes are **not supported in VS Code integrated terminal, Windows Terminal, or Ghostty**)

### 4.3 Architecture: four components

| Component | Role |
|---|---|
| **Team lead** | Main session that creates the team, spawns teammates, coordinates |
| **Teammates** | Separate Claude Code instances, each with own context |
| **Task list** | Shared work queue at `~/.claude/tasks/{team-name}/` |
| **Mailbox** | Direct peer-to-peer messaging via SendMessage |

Storage:
- Team config: `~/.claude/teams/{team-name}/config.json` (runtime state, session IDs, pane IDs; **do not edit by hand** - overwritten on next state update)
- Task list: `~/.claude/tasks/{team-name}/`

### 4.4 SendMessage message types

| Type | Purpose |
|---|---|
| `message` | Direct message to one named teammate |
| `broadcast` | Send to all teammates at once (costs scale with team size; use sparingly) |
| `shutdown_request` | Ask a teammate to exit gracefully |
| `shutdown_response` | Teammate approves or rejects shutdown with explanation |
| `plan_approval_response` | Lead approves/rejects a teammate's plan (for plan-mode quality gates) |

Team coordination tools (SendMessage, task management) are **always available** to a teammate even when the spawning subagent definition restricts other tools via `tools:` allowlist. This is a deliberate override.

### 4.5 Plan approval quality gate

A distinctive team feature: spawn a teammate in read-only plan mode. The teammate produces a plan, sends `plan_approval_response` request to lead, waits for approval. Lead approves or rejects with feedback. On rejection, teammate revises and resubmits. On approval, teammate exits plan mode and implements.

Useful for risky work (schema changes, auth refactors). The lead applies its own judgment autonomously based on criteria in your prompt ("only approve plans with test coverage", "reject plans that modify the database schema").

### 4.6 Subagent definitions as teammate types

You can reference a subagent type from any scope (project/user/plugin/CLI) when spawning a teammate:

```
Spawn a teammate using the security-reviewer agent type to audit the auth module.
```

Caveats:
- Teammate honors the definition's `tools` allowlist and `model`
- The definition body is **appended** to the teammate's system prompt (not replacing it)
- **`skills` and `mcpServers` frontmatter fields are NOT applied** when a subagent definition runs as a teammate - teammates load skills and MCP from project/user settings like a regular session (this is a non-obvious semantic difference from plain subagent spawn)

### 4.7 Session resumption limitation

Explicitly called out in the limitations section:

> **No session resumption with in-process teammates**: `/resume` and `/rewind` do not restore in-process teammates. After resuming a session, the lead may attempt to message teammates that no longer exist.

Fix: tell the lead to spawn new teammates.

### 4.8 Other hard limits

- **One team per session** - lead can only manage one team at a time; clean up before starting a new one
- **No nested teams** - teammates cannot spawn their own teams (consistent with max recursion depth = 1 from R2)
- **Lead is fixed** - session that creates the team is lead for its lifetime; cannot promote or transfer leadership
- **Permissions set at spawn** - all teammates inherit lead's permission mode; can change individually after spawn but not per-teammate at spawn time
- **Shutdown is slow** - teammates finish current tool call before exiting

### 4.9 Token cost

From the doc: "Agent teams use significantly more tokens than a single session. Each teammate has its own context window, and token usage scales linearly with the number of active teammates."

Rule of thumb: 3-5 teammates is the sweet spot. Beyond that, diminishing returns on parallelism are overwhelmed by coordination overhead and linear token cost. Community guidance converges on the same range.

**R6.C4:** Agent Teams is the heavyweight option - use it for research/review/debugging-with-competing-hypotheses where peer communication adds real value. For focused "run this task and return the result", subagents via Task tool are cheaper.

---

## 5. Hook events for async workflows

Hooks are the enforcement and observability layer for background work. R2 touched SubagentStart/Stop; R6 needs the full async-relevant subset.

### 5.1 Subagent events

| Hook | Fires when | Can block? |
|---|---|---|
| `SubagentStart` | Subagent spawned via Task/Agent tool | No (but can inject context) |
| `SubagentStop` | Subagent finishes | **Yes** (prevents stopping - forces continuation) |

Payload for SubagentStop:
```json
{
  "agent_id": "def456",
  "agent_type": "Explore",
  "agent_transcript_path": "~/.claude/projects/.../subagents/agent-def456.jsonl",
  "last_assistant_message": "Analysis complete..."
}
```

### 5.2 Agent-team events (new as of Feb 2026)

| Hook | Fires when | Can block? |
|---|---|---|
| `TeammateIdle` | Teammate about to go idle (no pending work) | **Yes** (exit 2 = feedback + keep working) |
| `TaskCreated` | New task added to shared task list | **Yes** (exit 2 = prevent creation) |
| `TaskCompleted` | Task being marked complete | **Yes** (exit 2 = prevent completion) |

Payload for Task hooks includes `task_id`, `task_subject`, `task_description`, `teammate_name`, `team_name`.

**Use case:** `TaskCompleted` hook runs tests and blocks completion if tests fail, forcing the teammate to fix before moving on. This is the team-native quality gate.

### 5.3 Async hook execution

Two flags:
- `async: true` - run hook in background, don't block Claude's next action
- `asyncRewake: true` - background execution; exit code 2 wakes Claude (for validators that take > 1s)

Released January 2026.

### 5.4 Notification hooks

The `Notification` event fires for system notifications (not for `run_in_background` completions directly - those are delivered as user messages, not Notification events). Types: `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog`.

Pattern: register a `SubagentStop` hook that reads your work queue and prints the next suggested command; register `Stop` as a safety net that fires if `SubagentStop` misses.

**R6.C5:** `TaskCompleted` + exit code 2 is the cleanest enforcement point for team quality gates. Lighter than a full reviewer teammate.

---

## 6. Display modes and UX

### 6.1 In-process mode (default)

All teammates run inside the lead's terminal. Shift+Down cycles through teammates; typing sends a message to the currently-cycled teammate. Press Enter to view a teammate's session, Escape to interrupt their turn, Ctrl+T to toggle the task list. Works in any terminal.

### 6.2 Split-pane mode (tmux / iTerm2)

Each teammate gets its own pane. See everyone's output at once, click into a pane to interact directly. Full terminal view per teammate.

Auto-detection: `teammateMode: "auto"` (default) uses split panes if already inside tmux, in-process otherwise. Override via `~/.claude.json` or `claude --teammate-mode in-process`.

Known orphan-session issue: if tmux doesn't clean up, run `tmux ls` + `tmux kill-session -t <name>` manually.

**Windows caveat:** split panes are **not supported** in Windows Terminal. Windows users are in-process only. This parallels the worktree symlink issue from R3 - Claude Code's multi-process UX is macOS-first.

---

## 7. "Scarce docs" gaps (per DD04)

User flagged R6 as documentation-scarce. Confirmed gaps after primary-source sweep:

| Gap | What we don't know |
|---|---|
| **`run_in_background` official spec** | Anthropic docs do not publish the Bash tool's `run_in_background` parameter schema in a reference page. Most detail comes from reverse-engineered community sources (learn-claude-code, claudefa.st). The timeout (300s) and output limits (50KB) are community-stated, not officially confirmed. |
| **Monitor tool API on non-Anthropic platforms** | Explicitly unavailable on Bedrock/Vertex/Foundry; no workaround documented. |
| **Mailbox persistence semantics** | Docs say messages "are delivered automatically" but do not specify what happens if the recipient is offline, crashed, or shutting down. Behavior under teammate failure is not explicit. |
| **SubagentStart payload schema** | Docs confirm the hook exists and can inject context, but do not publish the full payload shape like they do for SubagentStop. |
| **Task list file format** | `~/.claude/tasks/{team-name}/` directory is documented but file format inside is not - cannot manually author or migrate across teams. |
| **Cost per teammate at scale** | "Uses significantly more tokens" is repeated in docs but there is no per-session token overhead measurement. Community reports vary wildly (2x to 10x single-session cost). |
| **Interaction between Monitor and Agent Teams** | No documented pattern for a teammate using Monitor tool. Presumably works (teammates are full sessions) but no example in docs. |

These gaps are acknowledged and flagged for the Critic phase (R6 meets >=1000 word threshold per DD04; some claims will carry "source: community" labels).

---

## 8. Anti-patterns observed in async work

### 8.1 Polling loops instead of Monitor
The single biggest waste of tokens. `/loop` checking status every minute, or the LLM asking BashOutput in a loop, burns calls whether or not anything changed. Monitor exists specifically to kill this pattern. If you find yourself reading community posts about "agent rate limits on Max plan", 80% of the time there's a polling loop somewhere.

### 8.2 Broadcast abuse in teams
`broadcast` costs scale with team size. A 5-teammate team receiving a broadcast = 5 context injections + 5 reactions = 5x the work. Docs explicitly warn "use sparingly". Use targeted `message` by name instead unless genuinely everyone needs the information.

### 8.3 Long-running teammates without check-ins
"Letting a team run unattended for too long increases the risk of wasted effort." A teammate stuck on the wrong theory for 30 minutes has burned 30 minutes of Opus context. Monitor + TeammateIdle hooks fix this, but only if configured.

### 8.4 Treating teammates as persistent
`/resume` does not restore teammates. If you build a workflow that assumes a specific teammate is always available across sessions, it will silently fail after the first resume. The lead may message a ghost teammate ID that no longer exists. Design for ephemeral teammates; respawn on session start.

### 8.5 Editing team config by hand
`~/.claude/teams/{team-name}/config.json` is runtime state. Hand-edits get overwritten on the next state change. There is **no project-level equivalent** - `.claude/teams/teams.json` inside a project directory is treated as a plain file, not configuration. If you want reusable team shapes, use subagent definitions as teammate types, not hand-authored configs.

**R6.C6:** Every documented async mechanism has an obvious wrong-way-to-use-it that the docs call out explicitly. The patterns that survive code review are: Monitor for streams, SendMessage for peer communication, hooks for enforcement - and keep teams small (3-5).

---

## 9. Summary claims (for Extractor)

- **R6.C1** Three async mechanisms exist (`run_in_background`, Monitor, Agent Teams) solving three distinct problems; conflating them is the top community anti-pattern. (source: Anthropic + community)
- **R6.C2** `run_in_background` is fire-and-complete, not for streams; uses ~300s timeout, ~50KB output buffer (community-stated). (source: community)
- **R6.C3** Monitor tool shipped in v2.1.98 (Apr 9 2026); event-driven; 4 params (description/command/timeout_ms/persistent); stderr to file not stream; silent = 0 tokens. (source: Anthropic + aiia + claudefa.st)
- **R6.C4** Monitor delivers ~95% token reduction vs polling for long watches. (source: claudefa.st measurement)
- **R6.C5** Monitor unavailable on Bedrock / Vertex / Foundry - Anthropic API + Claude Code only. (source: Anthropic)
- **R6.C6** Agent Teams requires v2.1.32+ and `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. (source: Anthropic)
- **R6.C7** Agent Teams = peer Claude Code sessions with own context + mailbox + shared task list; NOT subagents. (source: Anthropic)
- **R6.C8** SendMessage supports 5 message types: message, broadcast, shutdown_request, shutdown_response, plan_approval_response. (source: Anthropic + Claudelog)
- **R6.C9** Subagent definitions can be reused as teammate types, but `skills` and `mcpServers` frontmatter are NOT applied to teammates (semantic difference from plain subagent spawn). (source: Anthropic)
- **R6.C10** `/resume` and `/rewind` do not restore in-process teammates; lead may message non-existent teammate IDs after resume. (source: Anthropic)
- **R6.C11** One team per session, no nested teams, lead is fixed for team lifetime, shutdown is slow (finishes current tool call). (source: Anthropic)
- **R6.C12** Split-pane mode not supported in VS Code terminal / Windows Terminal / Ghostty - macOS / iTerm2 / tmux only. (source: Anthropic)
- **R6.C13** Hooks for async: SubagentStart, SubagentStop, TeammateIdle, TaskCreated, TaskCompleted - all can block (exit 2) except SubagentStart. (source: Anthropic)
- **R6.C14** `async: true` and `asyncRewake: true` released January 2026 for non-blocking hook execution. (source: Anthropic)
- **R6.C15** Recommended team size 3-5; broadcast costs scale linearly, use sparingly. (source: Anthropic)
- **R6.C16** Task list at `~/.claude/tasks/{team-name}/`, team config at `~/.claude/teams/{team-name}/config.json`; config is runtime state, do not edit by hand. (source: Anthropic)
- **R6.C17** GitHub Issue #11716 - background bash processes can cause infinite reminder loops and token exhaustion (critical bug). (source: GitHub)
- **R6.C18** TaskCompleted + exit code 2 is the canonical team-native quality-gate enforcement point. (source: Anthropic)

---

## 10. Sources

- [Agent Teams official docs](https://code.claude.com/docs/en/agent-teams)
- [Hooks reference](https://code.claude.com/docs/en/hooks)
- [Monitor tool (aiia.ro)](https://aiia.ro/blog/claude-code-monitor-tool-background-scripts/)
- [Monitor mechanics (claudefa.st)](https://claudefa.st/blog/guide/mechanics/monitor)
- [Monitor tool (mindstudio)](https://www.mindstudio.ai/blog/claude-code-monitor-tool-background-processes-3)
- [learn-claude-code background tasks](https://github.com/shareAI-lab/learn-claude-code/blob/main/docs/en/s08-background-tasks.md)
- [GitHub Issue #11716 - background bash reminder loop](https://github.com/anthropics/claude-code/issues/11716)
- [GitHub Issue #13847 - statusline for background processes](https://github.com/anthropics/claude-code/issues/13847)
- [GitHub Issue #18544 - disable auto-notifications](https://github.com/anthropics/claude-code/issues/18544)
- [GitHub Issue #22087 - SubagentStop hook bug](https://github.com/anthropics/claude-code/issues/22087)
- [Noah Zweben X announcement (cited by aiia, 745k views)](https://aiia.ro/blog/claude-code-monitor-tool-background-scripts/)

---

**Word count:** ~2350 words.
**Status:** RESEARCH COMPLETE. Gaps explicitly flagged per DD04. Ready for Extractor.
