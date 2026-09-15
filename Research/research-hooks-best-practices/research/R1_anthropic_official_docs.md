# R1 - Anthropic Official Documentation: Claude Code Hooks (Canonical Reference)

> Research campaign: Claude Code Hooks Best Practices 2026
> Report: R1 (canonical, official sources only)
> Reference date: 2026-04-17
> Scope: Anthropic docs (`code.claude.com/docs`, `docs.anthropic.com`), Anthropic engineering blog, `github.com/anthropics/claude-code`. Community blogs are deliberately excluded and covered in R3.
> Note on URLs: in early 2026 Anthropic redirected `docs.anthropic.com/en/docs/claude-code/*` to `code.claude.com/docs/en/*` (301 Moved Permanently). Both hosts are authoritative; this report cites the canonical target host.

---

## 1. Executive Summary

Claude Code hooks are user-defined callbacks that fire at well-defined lifecycle points in the CLI and Agent SDK. They are the primary mechanism for deterministic control: "ensuring certain actions always happen rather than relying on the LLM to choose to run them" [https://code.claude.com/docs/en/hooks-guide].

As of 2026-04-17 there are **28 documented lifecycle events** grouped into four cadences (once-per-session, once-per-turn, per-tool-call, async/standalone). Four handler types exist (`command`, `http`, `prompt`, `agent`), each with its own JSON schema, default timeout, and output contract. Exit-code 2 is the only blocking return from a command hook; every other non-zero code is treated as a non-blocking error. Structured JSON output on stdout (on exit 0) gives richer control: `permissionDecision` (`allow`/`deny`/`ask`/`defer`), `updatedInput`, `additionalContext`, `stopReason`, `continue`, and `suppressOutput`.

Recent 2026 additions include `PermissionDenied` (v2.1.90), `"defer"` permission decision (v2.1.89), conditional `if` field using permission-rule syntax (v2.1.85), `TaskCreated` (v2.1.84), `CwdChanged`/`FileChanged` (v2.1.83), `StopFailure` (v2.1.78), `Elicitation`/`ElicitationResult`/`PostCompact` (v2.1.76), and `PreCompact` block-by-exit-2 (v2.1.105) [https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md].

Settings precedence (highest to lowest): **Managed > CLI args > Local > Project > User** [https://code.claude.com/docs/en/settings]. Hooks are `disableAllHooks`-gateable, and three managed-only settings (`allowManagedHooksOnly`, `allowedHttpHookUrls`, `httpHookAllowedEnvVars`) give admins hard enforcement knobs.

---

## 2. What Hooks Are

The official hooks guide defines them precisely:

> "Hooks are user-defined shell commands that execute at specific points in Claude Code's lifecycle. They provide deterministic control over Claude Code's behavior, ensuring certain actions always happen rather than relying on the LLM to choose to run them." [https://code.claude.com/docs/en/hooks-guide]

The reference adds non-shell options:

> "For decisions that require judgment rather than deterministic rules, you can also use prompt-based hooks or agent-based hooks that use a Claude model to evaluate conditions." [https://code.claude.com/docs/en/hooks-guide]

Hooks are configured in a `settings.json` file under the top-level `"hooks"` key. Each event name is a sub-key whose value is an array of matcher-groups:

```json
{
  "hooks": {
    "<EventName>": [
      {
        "matcher": "<pattern>",
        "hooks": [
          { "type": "command", "command": "...", "timeout": 600 }
        ]
      }
    ]
  }
}
```

When an event fires, Claude Code iterates all matcher-groups, and for every group whose `matcher` matches it runs every hook object in `hooks` in parallel; duplicate commands across scopes are deduplicated automatically [https://code.claude.com/docs/en/hooks-guide].

The `/hooks` slash-command in the interactive REPL is a read-only browser that shows every configured hook grouped by event, matcher, type, and source (User/Project/Local/Plugin/Session/Built-in) [https://code.claude.com/docs/en/hooks].

---

## 3. Hook Events Reference Table

Consolidated from the canonical reference [https://code.claude.com/docs/en/hooks] and the guide [https://code.claude.com/docs/en/hooks-guide]:

| Event | Cadence | Trigger | Matcher target | Blocks on exit 2? | Common use |
|---|---|---|---|---|---|
| `SessionStart` | once/session | session begin or resume | `startup\|resume\|clear\|compact` | No (action-already-occurred) | inject context, set env vars via `CLAUDE_ENV_FILE` |
| `SessionEnd` | once/session | session terminates | `clear\|resume\|logout\|prompt_input_exit\|bypass_permissions_disabled\|other` | No | cleanup scratch files, flush metrics |
| `UserPromptSubmit` | once/turn | before Claude processes user input | none (always fires) | Yes (erases prompt) | inject additional context, redact secrets |
| `Stop` | once/turn | Claude finishes responding | none | Yes (prevents stop) | enforce "keep working until tests pass" |
| `StopFailure` | once/turn | turn ends due to API error (rate limit, auth, billing, invalid request, server error, max output tokens) | `rate_limit\|authentication_failed\|billing_error\|invalid_request\|server_error\|max_output_tokens\|unknown` | No (output ignored) | alerting/observability |
| `PreToolUse` | per tool call | before a tool call executes | tool name (e.g. `Bash`, `Edit\|Write`, `mcp__github__.*`) | Yes (blocks call) | block commands, modify input, auto-approve |
| `PostToolUse` | per tool call | after a tool call succeeds | tool name | Yes (shows stderr; cannot undo) | format code, log changes |
| `PostToolUseFailure` | per tool call | after a tool call fails | tool name | No | error telemetry |
| `PermissionRequest` | per tool call | when a permission dialog would appear | tool name | Yes (denies perm) | custom allow/deny for specific tools |
| `PermissionDenied` | per tool call | when auto-mode classifier denies | tool name | No | `{retry: true}` lets the model retry |
| `Notification` | async | Claude sends a notification | `permission_prompt\|idle_prompt\|auth_success\|elicitation_dialog` | No | desktop notifications, Slack alerts |
| `SubagentStart` | async | a subagent is spawned | agent type (`Bash`, `Explore`, `Plan`, custom) | No | track parallel work |
| `SubagentStop` | async | a subagent finishes | agent type | Yes (prevents stop) | aggregate results, enforce quality gates |
| `TaskCreated` | async | a task is being created via `TaskCreate` | none | Yes (rolls back creation) | validate before task spawn |
| `TaskCompleted` | async | a task is marked completed | none | Yes (prevents completion) | acceptance checks |
| `TeammateIdle` | async | agent-team teammate is about to go idle | none | Yes (prevents idle) | reassign work |
| `InstructionsLoaded` | async | CLAUDE.md or `.claude/rules/*.md` is loaded | `session_start\|nested_traversal\|path_glob_match\|include\|compact` | No | audit which rules loaded |
| `ConfigChange` | async | a configuration file changes | `user_settings\|project_settings\|local_settings\|policy_settings\|skills` | Yes (blocks change) | enforce admin policy |
| `CwdChanged` | async | working directory changes | none | No | reload direnv/env |
| `FileChanged` | async | watched file changes | literal filenames split on `\|`, e.g. `.envrc\|.env` | No | reload env vars |
| `WorktreeCreate` | async | `--worktree` / `isolation: "worktree"` creates a worktree | none | Yes (any non-zero fails creation) | custom worktree layout |
| `WorktreeRemove` | async | worktree removed at exit or subagent finish | none | No | cleanup |
| `PreCompact` | async | before context compaction | `manual\|auto` | Yes (blocks compaction; v2.1.105+) | archive transcript first |
| `PostCompact` | async | after context compaction (v2.1.76+) | `manual\|auto` | No | re-inject context |
| `Elicitation` | async | MCP server requests user input during a tool call (v2.1.76+) | MCP server name | Yes (denies) | policy-enforced declines |
| `ElicitationResult` | async | after user responds to MCP elicitation (v2.1.76+) | MCP server name | Yes (becomes decline) | redact responses |
| `Setup` | async | session setup/maintenance (TypeScript SDK only) | n/a | No | initialization tasks |

Sources for the table rows: reference page [https://code.claude.com/docs/en/hooks], guide page [https://code.claude.com/docs/en/hooks-guide], Agent SDK hooks page [https://code.claude.com/docs/en/agent-sdk/hooks], changelog [https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md].

### 3.1 Common Input Fields

Every hook event receives a JSON object on stdin (or as HTTP POST body) that shares these fields [https://code.claude.com/docs/en/hooks]:

```json
{
  "session_id": "abc123",
  "transcript_path": "/home/user/.claude/projects/.../transcript.jsonl",
  "cwd": "/home/user/my-project",
  "permission_mode": "default|plan|acceptEdits|auto|dontAsk|bypassPermissions",
  "hook_event_name": "PreToolUse",
  "agent_id": "agent-xyz",
  "agent_type": "Explore"
}
```

`agent_id` and `agent_type` are only present when the hook fires inside a subagent (or when `--agent` is used) [https://code.claude.com/docs/en/hooks].

### 3.2 Event-specific input fields

- `PreToolUse`, `PostToolUse`, `PermissionRequest`, `PermissionDenied`, `PostToolUseFailure` add `tool_name` and `tool_input` [https://code.claude.com/docs/en/hooks].
- `UserPromptSubmit` adds `prompt` (the submitted text) [https://code.claude.com/docs/en/hooks-guide].
- `SessionStart` adds `source` ( `startup` | `resume` | `clear` | `compact`) [https://code.claude.com/docs/en/hooks-guide].
- `Stop` adds `stop_hook_active` (boolean used to break infinite-loop protection) [https://code.claude.com/docs/en/hooks-guide].
- `ConfigChange` adds `source` and `file_path` [https://code.claude.com/docs/en/hooks-guide].
- `FileChanged` adds `watchPaths` output ability [https://code.claude.com/docs/en/hooks-guide].
- `SubagentStop` adds `agent_id`, `agent_transcript_path`, `stop_hook_active` [https://code.claude.com/docs/en/agent-sdk/hooks].
- `Elicitation` adds the MCP `form` schema the server requested; `ElicitationResult` adds `action` (`accept`|`decline`|`cancel`) and `content` [https://code.claude.com/docs/en/hooks].

### 3.3 PreToolUse tool_input schemas

The canonical reference documents the `tool_input` shape per built-in tool; a partial list [https://code.claude.com/docs/en/hooks]:

- `Bash`: `command`, `description`, `timeout` (ms), `run_in_background`
- `Write`: `file_path`, `content`
- `Edit`: `file_path`, `old_string`, `new_string`, `replace_all`
- `Read`: `file_path`, `offset`, `limit`
- `Glob`: `pattern`, `path`
- `Grep`: `pattern`, `path`, `glob`, `output_mode`, `-i`, `multiline`, etc.
- `WebFetch`: `url`, `prompt`
- `WebSearch`: `query`, `allowed_domains`, `blocked_domains`
- `Agent` (Task): `prompt`, `description`, `subagent_type`, `model`
- `AskUserQuestion`: `questions[]`, `answers{}`

---

## 4. Handler Types (Command, HTTP, Prompt, Agent)

The reference documents four `type` values for a hook object [https://code.claude.com/docs/en/hooks]:

### 4.1 Command (`type: "command"`)

```json
{
  "type": "command",
  "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/check.sh",
  "timeout": 600,
  "async": false,
  "asyncRewake": false,
  "shell": "bash"
}
```

- **Input:** JSON on stdin.
- **Output:** exit code + stdout (JSON or plain text) + stderr.
- **Default timeout:** **600 seconds** [https://code.claude.com/docs/en/hooks].
- **Execution:** synchronous by default; `"async": true` fires and does not block the turn (useful for background uploads) [https://code.claude.com/docs/en/hooks].
- **When to use:** deterministic policy, local scripts, integration with existing CLI tooling (`jq`, `prettier`, `rg`, custom validators).

### 4.2 HTTP (`type: "http"`)

```json
{
  "type": "http",
  "url": "http://localhost:8080/hooks/pre-tool-use",
  "timeout": 30,
  "headers": { "Authorization": "Bearer $MY_TOKEN" },
  "allowedEnvVars": ["MY_TOKEN"]
}
```

- **Input:** same JSON as command hook, sent as POST body.
- **Output:** HTTP response body in the same JSON format as command-hook stdout.
- **Default timeout:** **30 seconds** [https://code.claude.com/docs/en/hooks].
- **Env-var interpolation in `headers`:** only names in `allowedEnvVars` are resolved; all other `$VAR` references are left empty. This prevents accidental exfiltration of environment secrets [https://code.claude.com/docs/en/hooks].
- **Error handling:** non-2xx, connection failure, and timeouts are non-blocking [https://code.claude.com/docs/en/hooks].
- **When to use:** central audit service, fleet-wide policy enforcement, team dashboards.
- **Managed enforcement:** `allowedHttpHookUrls` (allow-list of URL patterns with `*` wildcard) and `httpHookAllowedEnvVars` (global intersection with per-hook `allowedEnvVars`) [https://code.claude.com/docs/en/settings].

### 4.3 Prompt (`type: "prompt"`)

```json
{
  "type": "prompt",
  "prompt": "Is this a safe command? $ARGUMENTS",
  "model": "fast-model",
  "timeout": 30
}
```

- **Input:** the `prompt` string with `$ARGUMENTS` replaced by the hook's JSON input.
- **Output:** strict JSON with `{ "ok": true|false, "reason"?: "..." }`; `ok: false` blocks and the model's `reason` is fed back to Claude [https://code.claude.com/docs/en/hooks-guide].
- **Default model:** Haiku. Override with the `model` field [https://code.claude.com/docs/en/hooks-guide].
- **Default timeout:** **30 seconds**.
- **When to use:** judgment-based gates where deterministic rules are too brittle (e.g. "are all tasks really complete?" on a `Stop` hook).

### 4.4 Agent (`type: "agent"`)

```json
{
  "type": "agent",
  "prompt": "Verify this is safe: $ARGUMENTS",
  "timeout": 60
}
```

- **Input:** `$ARGUMENTS` injected prompt.
- **Output:** same `{ok, reason}` JSON as prompt hook.
- **Default timeout:** **60 seconds**, up to 50 tool-use turns [https://code.claude.com/docs/en/hooks-guide].
- **Differs from prompt hook:** spawns a full subagent that can read files, search code, run commands before deciding.
- **When to use:** verification requiring access to actual codebase state (e.g. "verify unit tests pass before allowing Stop").

### 4.5 Common optional fields (all types)

| Field | Required | Description |
|---|---|---|
| `type` | yes | `"command"` / `"http"` / `"prompt"` / `"agent"` |
| `if` | no | Permission-rule syntax filter for tool events only (v2.1.85+): `"Bash(git *)"`, `"Edit(*.ts)"` [https://code.claude.com/docs/en/hooks-guide] |
| `timeout` | no | seconds; 600 command / 30 http+prompt / 60 agent |
| `statusMessage` | no | custom spinner message while running |
| `once` | no | run only once per session (skills only) |

Source: [https://code.claude.com/docs/en/hooks].

---

## 5. Exit Codes and JSON Output Contract

### 5.1 Exit-code semantics

> "For most hook events, only exit code 2 blocks the action. Claude Code treats exit code 1 as a non-blocking error and proceeds, even though 1 is the conventional Unix failure code. Use exit 2 to enforce policy." [https://code.claude.com/docs/en/hooks]

| Exit code | Semantics |
|---|---|
| **0** | Success. Stdout is parsed as JSON (or for `UserPromptSubmit`/`SessionStart` appended to Claude's context as plain text). |
| **1** | Non-blocking error. Transcript shows a one-line notice; stdout and JSON are ignored. **Not a block** (this is the critical gotcha). |
| **2** | Blocking error. Stderr is fed back to Claude (on tool events) or shown to the user (on prompt events). No JSON is parsed. |
| **other** | Non-blocking error. Same as exit 1 for most purposes. |

Block semantics per event (from the reference):

| Event | Exit 2 blocks? | Effect |
|---|---|---|
| `PreToolUse` | Yes | cancels the tool call |
| `PermissionRequest` | Yes | denies the permission |
| `UserPromptSubmit` | Yes | rejects and erases the prompt |
| `Stop` | Yes | prevents Claude from stopping |
| `SubagentStop` | Yes | prevents subagent stop |
| `TeammateIdle` | Yes | prevents teammate from going idle |
| `TaskCreated` | Yes | rolls back task creation |
| `TaskCompleted` | Yes | prevents completion |
| `ConfigChange` | Yes | blocks config change |
| `PreCompact` | Yes (v2.1.105+) | blocks compaction |
| `Elicitation` | Yes | denies the elicitation |
| `ElicitationResult` | Yes | becomes a decline |
| `WorktreeCreate` | Yes | any non-zero fails creation |
| `PostToolUse`, `PostToolUseFailure`, `PermissionDenied`, `Notification`, `SessionStart`, `SessionEnd`, `StopFailure`, `SubagentStart`, `CwdChanged`, `FileChanged`, `WorktreeRemove`, `PostCompact`, `InstructionsLoaded` | No | stderr shown but action already happened / cannot be undone |

Source: [https://code.claude.com/docs/en/hooks].

### 5.2 Structured JSON output (on exit 0)

> "Exit codes give you two options: allow or block. For more control, exit 0 and print a JSON object to stdout instead." [https://code.claude.com/docs/en/hooks-guide]

Full schema [https://code.claude.com/docs/en/hooks]:

```json
{
  "continue": true,
  "stopReason": "message shown to the user when continue is false",
  "suppressOutput": false,
  "systemMessage": "warning shown to user",
  "decision": "block",
  "reason": "explanation fed back to Claude",
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "reason",
    "updatedInput": { "field": "value" },
    "additionalContext": "context string",
    "retry": true
  }
}
```

**Universal fields:**

| Field | Default | Description |
|---|---|---|
| `continue` | `true` | if `false`, Claude stops entirely for the turn |
| `stopReason` | none | message shown to the user when `continue: false` |
| `suppressOutput` | `false` | if `true`, omits stdout from the debug log |
| `systemMessage` | none | warning shown inline in the conversation |

**Per-event decision patterns:**

- Top-level `decision: "block"` with `reason`: used by `UserPromptSubmit`, `PostToolUse`, `PostToolUseFailure`, `Stop`, `SubagentStop`, `ConfigChange`, `PreCompact`.
- `hookSpecificOutput.permissionDecision` with values `allow` / `deny` / `ask` / `defer`: used by `PreToolUse`.
- `hookSpecificOutput.decision.behavior` (`allow`|`deny`) with optional `updatedInput`, `updatedPermissions[]`, `message`, `interrupt`: used by `PermissionRequest`.
- `hookSpecificOutput.retry: true`: used by `PermissionDenied` to signal "the model may retry the denied tool call" [https://code.claude.com/docs/en/hooks-guide].
- `hookSpecificOutput.action` (`accept`|`decline`|`cancel`) + `content`: used by `Elicitation` / `ElicitationResult`.
- `hookSpecificOutput.worktreePath`: used by `WorktreeCreate` (HTTP form).

### 5.3 PreToolUse permissionDecision precedence

When multiple `PreToolUse` hooks match and return different decisions, precedence is:

> **`deny` > `defer` > `ask` > `allow`** [https://code.claude.com/docs/en/hooks]

Key semantic notes:

- `allow` **skips the interactive prompt** but does not override permission rules. Deny rules from any scope (including managed settings) still win [https://code.claude.com/docs/en/hooks-guide].
- `deny` cancels the tool call and sends `permissionDecisionReason` to Claude as feedback.
- `ask` forces the permission prompt (and shows any `updatedInput`).
- `defer` (v2.1.89+) is only valid in non-interactive mode (`-p`). It exits the process preserving the tool call so an Agent SDK wrapper can collect input and resume with `claude -p --resume <session-id> --permission-mode <same>` [https://code.claude.com/docs/en/hooks].

### 5.4 updatedInput race condition (documented gotcha)

> "When multiple PreToolUse hooks return `updatedInput` to rewrite a tool's arguments, the last one to finish wins. Since hooks run in parallel, the order is non-deterministic. Avoid having more than one hook modify the same tool's input." [https://code.claude.com/docs/en/hooks-guide]

### 5.5 Debugging stdout corruption

A common pitfall: shell rc files (`~/.zshrc`, `~/.bashrc`) that print unconditional banners corrupt JSON output because the non-interactive shell still sources them. Fix:

```bash
if [[ $- == *i* ]]; then
  echo "Shell ready"
fi
```

Source: [https://code.claude.com/docs/en/hooks-guide].

---

## 6. Matcher Syntax

From the reference [https://code.claude.com/docs/en/hooks]:

| Matcher value | Evaluated as | Example |
|---|---|---|
| `"*"`, `""`, omitted | match all | fires every time |
| only letters, digits, `_`, `\|` | exact string or pipe-separated list | `Bash`, `Edit\|Write` |
| contains any other character | JavaScript regex | `^Notebook`, `mcp__memory__.*` |

> "Without a matcher, a hook fires on every occurrence of its event." [https://code.claude.com/docs/en/hooks-guide]

### 6.1 Per-event matcher targets (canonical list)

| Event | Matcher filters | Example values |
|---|---|---|
| `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `PermissionDenied` | tool name | `Bash`, `Edit\|Write`, `mcp__.*` |
| `SessionStart` | session source | `startup`, `resume`, `clear`, `compact` |
| `SessionEnd` | session end reason | `clear`, `resume`, `logout`, `prompt_input_exit`, `bypass_permissions_disabled`, `other` |
| `Notification` | notification type | `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog` |
| `SubagentStart`, `SubagentStop` | agent type | `Bash`, `Explore`, `Plan`, custom names |
| `PreCompact`, `PostCompact` | compaction trigger | `manual`, `auto` |
| `ConfigChange` | config source | `user_settings`, `project_settings`, `local_settings`, `policy_settings`, `skills` |
| `StopFailure` | error type | `rate_limit`, `authentication_failed`, `billing_error`, `invalid_request`, `server_error`, `max_output_tokens`, `unknown` |
| `InstructionsLoaded` | load reason | `session_start`, `nested_traversal`, `path_glob_match`, `include`, `compact` |
| `Elicitation`, `ElicitationResult` | MCP server name | configured server names |
| `FileChanged` | **literal** filenames, split on `\|` (not regex) | `.envrc\|.env` |
| `UserPromptSubmit`, `Stop`, `TeammateIdle`, `TaskCreated`, `TaskCompleted`, `WorktreeCreate`, `WorktreeRemove`, `CwdChanged` | none | always fires |

Source: [https://code.claude.com/docs/en/hooks].

### 6.2 `if` field (v2.1.85+)

Goes beyond `matcher` by filtering on the tool's arguments using permission-rule syntax. Hook process only spawns when the call matches, so no wasted subprocesses.

```json
{
  "matcher": "Bash",
  "hooks": [
    {
      "type": "command",
      "if": "Bash(git *)",
      "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/check-git-policy.sh"
    }
  ]
}
```

> "`if` only works on tool events: `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, and `PermissionDenied`. Adding it to any other event prevents the hook from running." [https://code.claude.com/docs/en/hooks-guide]

---

## 7. Timeouts

Defaults per handler type [https://code.claude.com/docs/en/hooks]:

| Handler | Default timeout |
|---|---|
| `command` | **600 s** (10 minutes) |
| `http` | **30 s** |
| `prompt` | **30 s** |
| `agent` | **60 s**, bounded to 50 tool-use turns |

Per-hook override via the `timeout` field (seconds). Behaviour on timeout: the hook is cancelled; for blocking-eligible events the cancel is treated as a non-blocking error (action proceeds) unless the hook already wrote exit 2 before the kill [https://code.claude.com/docs/en/hooks-guide].

The guide explicitly flags:

> "Hook timeout is 10 minutes by default, configurable per hook with the `timeout` field (in seconds)." [https://code.claude.com/docs/en/hooks-guide]

---

## 8. Environment Variables and Stdin Schema

### 8.1 Variables always available

From the reference [https://code.claude.com/docs/en/hooks]:

| Variable | Meaning |
|---|---|
| `CLAUDE_PROJECT_DIR` | Project root. Wrap in quotes for paths with spaces: `"$CLAUDE_PROJECT_DIR"/.claude/hooks/x.sh` |
| `CLAUDE_PLUGIN_ROOT` | Plugin installation directory |
| `CLAUDE_PLUGIN_DATA` | Plugin persistent data directory |
| `CLAUDE_CODE_REMOTE` | `"true"` in web environments |

### 8.2 `CLAUDE_ENV_FILE` (SessionStart / CwdChanged / FileChanged only)

A file path the hook can append `export VAR=value` lines to. Claude Code applies them before each subsequent Bash command [https://code.claude.com/docs/en/hooks-guide]. This is the officially recommended integration point for tools like `direnv`.

```bash
#!/bin/bash
if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=production' >> "$CLAUDE_ENV_FILE"
  echo 'export DEBUG_LOG=true' >> "$CLAUDE_ENV_FILE"
fi
exit 0
```

### 8.3 Stdin schema

All command hooks receive a JSON object on stdin following the common-input-fields shape (section 3.1) plus event-specific additions (3.2). The guide shows the canonical reading pattern:

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')
```

Source: [https://code.claude.com/docs/en/hooks-guide].

HTTP hooks receive the same JSON as the POST body.

---

## 9. Settings Precedence

From the settings reference [https://code.claude.com/docs/en/settings]:

> "When the same setting is configured in multiple scopes, more specific scopes take precedence:
> 1. **Managed** (highest) - can't be overridden by anything
> 2. **Command line arguments** - temporary session overrides
> 3. **Local** - overrides project and user settings
> 4. **Project** - overrides user settings
> 5. **User** (lowest) - applies when nothing else specifies the setting"

### 9.1 File locations (hook-relevant)

| Scope | Path | Shared |
|---|---|---|
| User | `~/.claude/settings.json` | No (local machine) |
| Project | `.claude/settings.json` | Yes (committed to repo) |
| Local | `.claude/settings.local.json` | No (gitignored automatically) |
| Plugin | `hooks/hooks.json` inside plugin | Yes (bundled with plugin) |
| Skill/agent frontmatter | component file | Yes (defined in file) |
| Managed (server) | Anthropic admin console | Yes |
| Managed (macOS) | `/Library/Application Support/ClaudeCode/managed-settings.json` | Yes |
| Managed (Linux/WSL) | `/etc/claude-code/managed-settings.json` | Yes |
| Managed (Windows) | `C:\Program Files\ClaudeCode\managed-settings.json` (v2.1.75+, legacy `C:\ProgramData\ClaudeCode\` removed) | Yes |
| Managed (Windows registry) | `HKLM\SOFTWARE\Policies\ClaudeCode` (admin) or `HKCU\SOFTWARE\Policies\ClaudeCode` (user-level) | Yes |

Source: [https://code.claude.com/docs/en/settings].

### 9.2 Managed drop-in directory

> "File-based managed settings also support a drop-in directory at `managed-settings.d/` in the same system directory alongside `managed-settings.json`. [...] `managed-settings.json` is merged first as the base, then all `*.json` files in the drop-in directory are sorted alphabetically and merged on top. Later files override earlier ones for scalar values; arrays are concatenated and de-duplicated; objects are deep-merged." [https://code.claude.com/docs/en/settings]

Numeric prefixes control merge order: `10-telemetry.json`, `20-security.json`.

### 9.3 Hook-specific managed settings

From the settings reference [https://code.claude.com/docs/en/settings]:

| Key | Scope | Description |
|---|---|---|
| `disableAllHooks` | any | Disables all hooks and any custom status line |
| `allowManagedHooksOnly` | managed only | Only managed hooks, SDK hooks, and hooks from plugins force-enabled in managed `enabledPlugins` are loaded. User, project, and all other plugin hooks are blocked |
| `allowedHttpHookUrls` | any (merged) | Allow-list of URL patterns (with `*` wildcard) HTTP hooks may target. Undefined = no restriction, empty array = block all HTTP hooks |
| `httpHookAllowedEnvVars` | any (merged) | Allow-list of env-var names HTTP hooks may interpolate into headers. Each hook's effective `allowedEnvVars` is the intersection with this list |

### 9.4 JSON schema for validation

Settings files support a `$schema` key pointing to `https://json.schemastore.org/claude-code-settings.json`, enabling autocomplete and inline validation in VS Code, Cursor, and any JSON-Schema-aware editor [https://code.claude.com/docs/en/settings].

> "The published schema is updated periodically and may not include settings added in the most recent CLI releases, so a validation warning on a recently documented field does not necessarily mean your configuration is invalid." [https://code.claude.com/docs/en/settings]

### 9.5 `--settings` CLI flag

There is no documented `--settings` flag for passing a bespoke settings.json path at startup in the current reference (as of 2026-04-17). The closest CLI overrides are:

- `--permission-mode` (single-session override of `permissions.defaultMode`)
- `--dangerously-skip-permissions` / `--allow-dangerously-skip-permissions`
- `--agent` (runs the main thread as a named subagent)
- `--debug-file <path>` (enables hook debug logging to a known path)
- `--worktree`
- `-p` / non-interactive mode (changes `PermissionRequest` behavior)

This is noted in section 13 (Gaps).

---

## 10. MCP Tool Hook Matchers

MCP tools follow the naming pattern **`mcp__<server>__<tool>`** [https://code.claude.com/docs/en/hooks]. Examples:

- `mcp__memory__create_entities`
- `mcp__filesystem__read_file`
- `mcp__github__search_repositories`

Match patterns:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__memory__.*",
        "hooks": [{ "type": "command", "command": "echo 'Memory op' >> ~/log" }]
      },
      {
        "matcher": "mcp__.*__write.*",
        "hooks": [{ "type": "command", "command": "/path/to/validate-write.py" }]
      },
      {
        "matcher": "^mcp__",
        "hooks": [{ "type": "command", "command": "/path/to/mcp-audit.sh" }]
      }
    ]
  }
}
```

Source: [https://code.claude.com/docs/en/hooks], [https://code.claude.com/docs/en/hooks-guide].

### 10.1 MCP elicitation hooks

Two events fire around MCP `Elicitation` (when an MCP server asks the user for structured input during a tool call):

- `Elicitation` (before the dialog) - exit 2 or `{action: "decline"}` denies.
- `ElicitationResult` (after user response, before sending back to the server) - exit 2 converts response into a decline; allows redaction of user content before it leaves the machine.

Matcher is the MCP server name. Source: [https://code.claude.com/docs/en/hooks].

---

## 11. Full settings.json Example

A working composite that exercises every important knob. Drop into `~/.claude/settings.json` or `.claude/settings.json`:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",

  "disableAllHooks": false,
  "allowedHttpHookUrls": ["https://hooks.corp.example/*", "http://localhost:*"],
  "httpHookAllowedEnvVars": ["HOOK_SECRET", "CORP_AUDIT_TOKEN"],

  "permissions": {
    "allow": ["Bash(git diff *)", "Bash(npm run test *)", "Read(~/.zshrc)"],
    "deny": ["WebFetch", "Bash(curl *)", "Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"],
    "ask": ["Bash(git push *)"]
  },

  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Reminder: use Bun, not npm. Run bun test before committing.'",
            "statusMessage": "Re-injecting post-compact context..."
          }
        ]
      },
      {
        "matcher": "startup|resume",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/load-env.sh"
          }
        ]
      }
    ],

    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/redact-secrets.py"
          }
        ]
      }
    ],

    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(rm -rf *)",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-destructive.sh"
          }
        ]
      },
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
          }
        ]
      },
      {
        "matcher": "mcp__.*__write.*",
        "hooks": [
          {
            "type": "http",
            "url": "https://hooks.corp.example/mcp-write-audit",
            "timeout": 10,
            "headers": { "Authorization": "Bearer $CORP_AUDIT_TOKEN" },
            "allowedEnvVars": ["CORP_AUDIT_TOKEN"]
          }
        ]
      }
    ],

    "PermissionRequest": [
      {
        "matcher": "ExitPlanMode",
        "hooks": [
          {
            "type": "command",
            "command": "echo '{\"hookSpecificOutput\":{\"hookEventName\":\"PermissionRequest\",\"decision\":{\"behavior\":\"allow\"}}}'"
          }
        ]
      }
    ],

    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs -r npx prettier --write"
          }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.command' >> ~/.claude/command-log.txt",
            "async": true
          }
        ]
      }
    ],

    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "Verify unit tests pass before the agent stops. Run the test suite and return {\"ok\": true} on success or {\"ok\": false, \"reason\": \"...\"}. $ARGUMENTS",
            "timeout": 180
          }
        ]
      }
    ],

    "PreCompact": [
      {
        "matcher": "auto",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/archive-transcript.sh"
          }
        ]
      }
    ],

    "ConfigChange": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "jq -c '{timestamp: now|todate, source: .source, file: .file_path}' >> ~/claude-config-audit.log"
          }
        ]
      }
    ],

    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
          }
        ]
      }
    ],

    "CwdChanged": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "direnv export bash >> \"$CLAUDE_ENV_FILE\""
          }
        ]
      }
    ],

    "FileChanged": [
      {
        "matcher": ".envrc|.env",
        "hooks": [
          {
            "type": "command",
            "command": "direnv export bash >> \"$CLAUDE_ENV_FILE\""
          }
        ]
      }
    ],

    "SubagentStop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/subagent-summary.sh"
          }
        ]
      }
    ],

    "StopFailure": [
      {
        "matcher": "rate_limit|server_error",
        "hooks": [
          {
            "type": "http",
            "url": "https://hooks.corp.example/claude-incident",
            "timeout": 5,
            "headers": { "X-Secret": "$HOOK_SECRET" },
            "allowedEnvVars": ["HOOK_SECRET"]
          }
        ]
      }
    ]
  }
}
```

Every construct in this example is documented in the hooks reference [https://code.claude.com/docs/en/hooks] or hooks guide [https://code.claude.com/docs/en/hooks-guide].

---

## 12. Security Considerations (Anthropic Guidance)

The official security disclaimer from the Anthropic security page [https://code.claude.com/docs/en/security] and reflected in search results for the hooks reference:

> "Claude Code hooks execute arbitrary shell commands on your system automatically. By using hooks, you acknowledge that you are solely responsible for the commands you configure, hooks can modify, delete, or access any files your user account can access, and malicious or poorly written hooks can cause data loss or system damage."

Official best practices Anthropic lists:

1. **Validate and sanitize inputs.** Never trust `tool_input` fields blindly.
2. **Always quote shell variables.** Use `"$VAR"` not `$VAR`. The canonical pattern `"$CLAUDE_PROJECT_DIR"/.claude/hooks/x.sh` is specifically to survive spaces in paths [https://code.claude.com/docs/en/hooks].
3. **Block path traversal.** Check for `..` in any file-path argument.
4. **Use absolute paths** to your hook scripts; `$PATH` at hook-spawn time may differ.
5. **Avoid sensitive files.** Don't write hooks that touch `.env`, `.git/`, keys - and use `Read(./.env)` deny-rules as a layered defense.
6. **Test in a safe environment before production use. Always review and understand any hook commands before adding them to your configuration.**

### 12.1 Hook permission semantics (important)

From the guide [https://code.claude.com/docs/en/hooks-guide]:

> "PreToolUse hooks fire before any permission-mode check. A hook that returns `permissionDecision: "deny"` blocks the tool even in `bypassPermissions` mode or with `--dangerously-skip-permissions`. This lets you enforce policy that users cannot bypass by changing their permission mode.
>
> The reverse is not true: a hook returning `"allow"` does not bypass deny rules from settings. Hooks can tighten restrictions but not loosen them past what permission rules allow."

### 12.2 Managed-only enforcement

Three managed-only settings exist to harden fleet deployments [https://code.claude.com/docs/en/settings]:

- `allowManagedHooksOnly: true` - blocks every user/project/plugin hook; only managed + SDK + force-enabled-plugin hooks run.
- `allowedHttpHookUrls: ["https://corp.example/*"]` - outbound-URL allow-list (arrays merge across scopes).
- `httpHookAllowedEnvVars: ["CORP_TOKEN"]` - intersects with each hook's `allowedEnvVars`; prevents leaking other env vars into headers.
- `forceRemoteSettingsRefresh: true` - blocks CLI startup until managed settings are freshly fetched (fail-closed).

### 12.3 Reference implementation

The `anthropics/claude-code` repo ships an official Bash validator example at [https://github.com/anthropics/claude-code/blob/main/examples/hooks/bash_command_validator_example.py] that the guide points at as a reference implementation for sanitizing Bash input.

### 12.4 Debugging without leaking stdout

> "Writing to stderr keeps stdout clean for JSON output and sends the message to the debug log." [https://code.claude.com/docs/en/hooks-guide]

Debug file: `claude --debug-file /tmp/claude.log`, then `tail -f /tmp/claude.log`. Mid-session: `/debug` [https://code.claude.com/docs/en/hooks-guide].

---

## 13. Gaps and Notes

Things documented in community but **not** in official Anthropic docs as of 2026-04-17 (these belong in R3, flagged here for completeness):

- **`--settings <path>` CLI flag.** Not present in the current settings reference [https://code.claude.com/docs/en/settings]. Community blogs sometimes claim it exists; if it does, it is undocumented. Precedence list (section 9) explicitly says "Command line arguments - temporary session overrides" without naming a file-level override flag.
- **Nested event ordering guarantees.** The reference says hooks in a matcher-group run in parallel and that "identical hook commands are automatically deduplicated" [https://code.claude.com/docs/en/hooks-guide], but does not guarantee any ordering between matcher-groups within the same event beyond this dedup note.
- **Hook return-value memoization/caching.** Nothing documented; every fire is fresh.
- **Resource limits (CPU/memory) for command hooks.** Only `timeout` is documented. No official cgroups/ulimit guidance.
- **Windows shell defaults for command hooks.** The `shell` field is shown as `"bash"` in the reference; PowerShell support flows through the separate `defaultShell: "powershell"` setting [https://code.claude.com/docs/en/settings] and requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`. Per-hook PowerShell override is not explicitly documented.
- **Changelog surface.** The public `anthropics/claude-code` changelog summarizes 2.1.x entries but does not currently include post-Opus-4.7 (yesterday, 2026-04-16) hook-related deltas. R2 covers those.

Dead/redirected links encountered during research:

- `https://docs.anthropic.com/en/docs/claude-code/hooks` -> 301 -> `https://code.claude.com/docs/en/hooks` (canonical). Old URL still resolves via the redirect but is no longer the source of truth.

---

## Sources Cited

1. Hooks reference (canonical): https://code.claude.com/docs/en/hooks
2. Hooks guide (tutorials + patterns): https://code.claude.com/docs/en/hooks-guide
3. Agent SDK hooks page (TypeScript + Python): https://code.claude.com/docs/en/agent-sdk/hooks
4. Settings reference (scopes, precedence, managed): https://code.claude.com/docs/en/settings
5. Security page: https://code.claude.com/docs/en/security
6. Permissions page: https://code.claude.com/docs/en/permissions
7. Permission modes: https://code.claude.com/docs/en/permission-modes
8. Public changelog (raw markdown): https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md
9. Official Bash validator example: https://github.com/anthropics/claude-code/blob/main/examples/hooks/bash_command_validator_example.py
10. Legacy redirect source: https://docs.anthropic.com/en/docs/claude-code/hooks (301 -> source 1)
11. JSON schema for settings validation: https://json.schemastore.org/claude-code-settings.json
12. Settings schema topic (llms.txt index): https://code.claude.com/docs/llms.txt
