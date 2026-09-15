# SYNTHESIS - Claude Code Hooks Best Practices 2026

## Metadata

- Synthesis date: 2026-04-17
- Opus 4.7 release: 2026-04-16 (per R2, primary source)
- Source reports: R1 (PASS), R2-R7 (REVISE), CRITIC.md
- Author: Syntetyk agent, Research-Hooks-Best-Practices campaign
- Status: COMPLETE (all 7 parts + 3 appendices + executive summary)

## Executive Summary

Claude Code hooks are user-defined callbacks that fire at 28 well-defined lifecycle events (session boundaries, tool calls, compaction, subagent spawns, config changes, and more) and execute real code with exit-code or structured-JSON authority over what Claude does next. They are the primary deterministic control plane for the agent, complementing - not replacing - `permissions.deny` (faster, unbypassable) and `sandbox` (declarative, broadest surface reduction). In 2026, hooks matter more than in any prior era: Opus 4.7 shipped 2026-04-16 with Claude Code v2.1.111, the April release window added 14+ new events (`TaskCreated`, `CwdChanged`, `PreCompact` blockable, `PermissionDenied`, `Elicitation`, `InstructionsLoaded`, `ConfigChange`, and more), and a new tokenizer that produces 1.0x-1.35x more tokens for identical inputs, breaking compaction-threshold math across every existing hook that gated on context size.

**Top 5 actionable recommendations:**

1. **Use `exit 2`, never `exit 1`, to block** - exit 1 is non-blocking per spec; it prints a notice and the action proceeds. This is the #1 implementation bug in every community resource.
2. **Pin `allowedHttpHookUrls` and `httpHookAllowedEnvVars` at User or Managed scope** with explicit hosts and env var names. This closes the single largest exfil vector and cannot be weakened by lower layers.
3. **Prefer `permissions.deny` and `sandbox` over PreToolUse hooks** for pure pattern-match decisions. Deny rules are native, faster, and unbypassable by hook misconfiguration.
4. **Migrate PreCompact triggers ~25% lower** on 4.7 to absorb the tokenizer delta; strip `temperature`/`top_p`/`top_k` from every API-calling hook (they now return 400); raise `max_tokens` ~20-30% for the same output envelope.
5. **Set `async: true` on every telemetry hook**; reserve synchronous hooks for security/policy decisions where exit code must gate the call. Community case study: 11 synchronous hooks cost 18-21 s per prompt on real projects.

**2026 delta in one sentence:** `PreCompact` became blockable, `PermissionDenied` gained `{retry: true}`, `WorktreeCreate` and `CwdChanged` enable per-subagent isolation, `TaskOutput` tool was removed (migrate to `FileChanged`), and the tokenizer shift forces recalibration of every context-budget hook.

## Part 1: Foundations

### 1.1 What a hook is

Claude Code hooks are user-defined callbacks that fire at well-defined lifecycle points in the CLI and Agent SDK. They are the primary mechanism for deterministic control over the agent: "ensuring certain actions always happen rather than relying on the LLM to choose to run them" (R1.2 quoting the canonical hooks guide). Unlike prompt engineering or CLAUDE.md rules, which are advisory, hooks execute real code synchronously and can block, redirect, or augment any tool call, user prompt, session boundary, subagent spawn, or config change.

Hooks are configured in `settings.json` files under the top-level `"hooks"` key. Each event name is a sub-key whose value is an array of matcher-groups; every matcher-group contains a pattern and a list of hook objects (R1.2):

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

When an event fires, Claude Code iterates all matcher-groups, and for every group whose `matcher` matches it runs every hook object in the `hooks` array **in parallel**; identical hook commands across scopes are automatically deduplicated (R1.2, cross-confirmed R5.2, R7.2). The `/hooks` slash command in the REPL is a read-only browser that shows every configured hook grouped by event, matcher, type, and source (User / Project / Local / Plugin / Session / Built-in) (R1.2).

### 1.2 Lifecycle events reference (28 events)

Claude Code 2026 exposes **28 documented lifecycle events** grouped by cadence (R1.3). The synthesis treats R1's table as the spine; CRITIC resolved minor count disagreements with R6 in favor of R1 (CRITIC.s6.v: "Align event count with R1 (28)").

| Event | Cadence | Trigger | Matcher target | Blocks on exit 2? | Typical use |
|---|---|---|---|---|---|
| `SessionStart` | once/session | session begin or resume | `startup\|resume\|clear\|compact` | No | inject context, set env via `CLAUDE_ENV_FILE` |
| `SessionEnd` | once/session | session terminates | `clear\|resume\|logout\|prompt_input_exit\|bypass_permissions_disabled\|other` | No | flush metrics, cleanup scratch |
| `UserPromptSubmit` | once/turn | before Claude processes user input | none (always fires) | Yes (erases prompt) | inject context, redact secrets |
| `Stop` | once/turn | Claude finishes responding | none | Yes (prevents stop) | enforce "keep working until tests pass" |
| `StopFailure` | once/turn | turn ends due to API error | `rate_limit\|authentication_failed\|billing_error\|invalid_request\|server_error\|max_output_tokens\|unknown` | No | alerting / observability |
| `PreToolUse` | per tool | before a tool call executes | tool name (`Bash`, `Edit\|Write`, `mcp__github__.*`) | Yes (blocks call) | block commands, modify input, auto-approve |
| `PostToolUse` | per tool | after a tool call succeeds | tool name | Yes (shows stderr; cannot undo) | format code, log changes |
| `PostToolUseFailure` | per tool | after a tool call fails | tool name | No | error telemetry |
| `PermissionRequest` | per tool | when a permission dialog would appear | tool name | Yes (denies perm) | custom allow/deny |
| `PermissionDenied` | per tool | when auto-mode classifier denies | tool name | No | `{retry: true}` lets model retry |
| `Notification` | async | Claude sends a notification | `permission_prompt\|idle_prompt\|auth_success\|elicitation_dialog` | No | desktop/Slack alerts |
| `SubagentStart` | async | subagent spawned | agent type | No | track parallel work |
| `SubagentStop` | async | subagent finishes | agent type | Yes (prevents stop) | aggregate results, quality gates |
| `TaskCreated` | async | task created via `TaskCreate` | none | Yes (rolls back) | validate before spawn |
| `TaskCompleted` | async | task marked completed | none | Yes (prevents completion) | acceptance checks |
| `TeammateIdle` | async | agent-team teammate about to go idle | none | Yes | reassign work |
| `InstructionsLoaded` | async | CLAUDE.md or `.claude/rules/*.md` loaded | `session_start\|nested_traversal\|path_glob_match\|include\|compact` | No | audit rule loads |
| `ConfigChange` | async | configuration file changes | `user_settings\|project_settings\|local_settings\|policy_settings\|skills` | Yes (blocks change) | enforce admin policy |
| `CwdChanged` | async | cwd changes | none | No | reload direnv |
| `FileChanged` | async | watched file changes | literal filenames on `\|` (not regex) | No | reload env vars |
| `WorktreeCreate` | async | worktree created | none | Yes (any non-zero fails creation) | custom layout |
| `WorktreeRemove` | async | worktree removed | none | No | cleanup |
| `PreCompact` | async | before compaction | `manual\|auto` | Yes (v2.1.105+) | archive transcript |
| `PostCompact` | async | after compaction | `manual\|auto` | No | re-inject context |
| `Elicitation` | async | MCP server requests input | MCP server name | Yes (denies) | policy declines |
| `ElicitationResult` | async | after user responds to MCP elicitation | MCP server name | Yes (becomes decline) | redact responses |
| `Setup` | async | session setup (TypeScript SDK only) | n/a | No | initialization |

Each event input JSON carries the common fields `session_id`, `transcript_path`, `cwd`, `permission_mode`, `hook_event_name`, and (inside a subagent) `agent_id` / `agent_type` (R1.3.1). Tool events add `tool_name` and `tool_input`; `UserPromptSubmit` adds `prompt`; `SessionStart` adds `source`; `Stop` adds `stop_hook_active`; `ConfigChange` adds `source` and `file_path`; `SubagentStop` adds `agent_id`, `agent_transcript_path`, `stop_hook_active` (R1.3.2).

### 1.3 Handler types

Four `type` values exist for a hook object (R1.4). CRITIC cross-confirmed R6's handler-type comparison matrix (R6.1.5) is consistent with R1 on all default timeouts.

| Handler | Input | Output | Default timeout | When to use |
|---|---|---|---|---|
| `command` | JSON on stdin | exit code + stdout (JSON or plain) + stderr | **600 s** (10 minutes) | deterministic policy, local scripts, CLI tooling |
| `http` | JSON as POST body | HTTP response body (same JSON schema as command stdout) | **30 s** | fleet-wide audit, central policy, dashboards |
| `prompt` | `$ARGUMENTS` replaced in prompt string | `{ok, reason}` JSON from a fast model (Haiku by default) | **30 s** | judgment gates where deterministic rules are brittle |
| `agent` | `$ARGUMENTS` injected prompt | `{ok, reason}` JSON from a full subagent (50 tool-turn cap) | **60 s** | verification that must read files or run commands first |

CRITIC flagged R4's "60s default hook timeout" (R4.6.1) as wrong and defers to R1's 600s command default. Use R1's breakdown: 600 / 30 / 30 / 60 (CRITIC.8 conflicts table, "Who's right: R1/R5/R6: 600 s").

Common optional fields across all types (R1.4.5):

- `if`: permission-rule syntax filter, **tool events only** (v2.1.85+). Example: `"if": "Bash(git *)"`. Adding it to any non-tool event silently disables the hook (R1.6.2).
- `timeout`: seconds; overrides the type default.
- `statusMessage`: custom spinner text.
- `once`: run once per session (skills only).
- `async`: `true` fires and forgets; does not block the turn.

### 1.4 Exit codes and output contract

Exit-code semantics are the #1 foot-gun in this ecosystem (R1.5.1, R3 anti-pattern #1, R4.9):

| Exit | Semantics |
|---|---|
| **0** | Success. Stdout parsed as JSON (or for `UserPromptSubmit`/`SessionStart` appended to context as plain text). |
| **1** | **Non-blocking error.** Transcript shows a notice; stdout and JSON are ignored. This is the gotcha: `exit 1` does NOT block. |
| **2** | **Blocking error.** Stderr fed back to Claude (on tool events) or shown to user. No JSON parsed. |
| other | Non-blocking. Same as 1. |

For richer control, exit 0 and print a JSON object on stdout (R1.5.2):

```json
{
  "continue": true,
  "stopReason": "message if continue is false",
  "suppressOutput": false,
  "systemMessage": "warning shown inline",
  "decision": "block",
  "reason": "fed back to Claude",
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny|allow|ask|defer",
    "permissionDecisionReason": "reason",
    "updatedInput": { "field": "value" },
    "additionalContext": "context string",
    "retry": true
  }
}
```

CRITIC.1.weakness: exit-code path and JSON path are **mutually exclusive** (R4 section 6.1). Pick one per hook; mixing them produces undefined behavior.

When multiple `PreToolUse` hooks match and return different decisions, precedence is **`deny > defer > ask > allow`** (R1.5.3, cross-confirmed R6.3). Key semantics:

- `allow` skips the interactive prompt but does NOT override permission-rule denies from settings. Hooks can tighten, never loosen (R1.12.1, cross-confirmed R4, R5, R7 - unanimous).
- `deny` cancels the call and sends `permissionDecisionReason` to Claude.
- `ask` forces the permission prompt; honors any `updatedInput`.
- `defer` (v2.1.89+) valid only in `-p` non-interactive mode; exits preserving the tool call so an SDK wrapper can resume with `claude -p --resume <session-id> --permission-mode <same>`.

### 1.5 Matcher syntax

From the reference (R1.6):

| Matcher value | Evaluated as | Example |
|---|---|---|
| `"*"`, `""`, omitted | match all | fires every time |
| only `[A-Za-z0-9_\|]` | exact string or pipe-separated list | `Bash`, `Edit\|Write` |
| contains any other char | **JavaScript regex** | `^Notebook`, `mcp__memory__.*` |

MCP tools follow `mcp__<server>__<tool>` (R1.10). Examples: `mcp__memory__create_entities`, `mcp__filesystem__read_file`, `mcp__github__search_repositories`. Regex `"^mcp__"` catches every MCP call; `"mcp__.*__write.*"` catches any MCP server's write-family tool.

The `if` field goes beyond `matcher` by filtering on the tool's arguments using permission-rule syntax (v2.1.85+). Hooks only spawn when the tool-call arguments match, so no wasted subprocesses:

```json
{ "matcher": "Bash", "hooks": [{ "type": "command", "if": "Bash(git *)", "command": "..." }] }
```

### 1.6 Environment and stdin

Always-available variables (R1.8.1):

- `CLAUDE_PROJECT_DIR` - project root. Quote it: `"$CLAUDE_PROJECT_DIR"/.claude/hooks/x.sh`
- `CLAUDE_PLUGIN_ROOT` / `CLAUDE_PLUGIN_DATA` - plugin install + persistent data dirs
- `CLAUDE_CODE_REMOTE` - `"true"` in web environments

`CLAUDE_ENV_FILE` is special to `SessionStart` / `CwdChanged` / `FileChanged` (R1.8.2). Append `export VAR=value` lines and Claude Code applies them before every subsequent Bash call. This is the officially recommended integration point for `direnv`:

```bash
#!/bin/bash
if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=production' >> "$CLAUDE_ENV_FILE"
fi
exit 0
```

Stdin schema (R1.8.3):

```bash
#!/bin/bash
set -euo pipefail
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')
```

## Part 2: Configuration

### 2.1 Where settings live

Five precedence layers, highest to lowest (R1.9, R7.1.1 in unanimous agreement - CRITIC cross-confirmed this as the most-cited claim across the corpus):

```
+-----------------------------------------+
|  Managed (server > MDM > file > HKCU)   |  hard law, cannot be weakened
+-----------------------------------------+
|  Command line flags (--model, ...)      |  session only
+-----------------------------------------+
|  .claude/settings.local.json            |  you, this repo (gitignored)
+-----------------------------------------+
|  .claude/settings.json                  |  team, this repo (committed)
+-----------------------------------------+
|  ~/.claude/settings.json                |  you, every repo
+-----------------------------------------+
```

Canonical file paths (R1.9.1, R7.1.1):

| Scope | Path |
|---|---|
| User | `~/.claude/settings.json` |
| Project | `<repo>/.claude/settings.json` (committed) |
| Local | `<repo>/.claude/settings.local.json` (auto-gitignored) |
| Plugin | `hooks/hooks.json` inside plugin |
| Managed (macOS) | `/Library/Application Support/ClaudeCode/managed-settings.json` + `managed-settings.d/*.json` drop-ins |
| Managed (Linux/WSL) | `/etc/claude-code/managed-settings.json` + drop-ins |
| Managed (Windows) | `C:\Program Files\ClaudeCode\managed-settings.json` + `managed-settings.d\*.json` (v2.1.75+; legacy `C:\ProgramData\ClaudeCode\` removed - version UNVERIFIED per CRITIC) |
| Managed (Windows registry) | `HKLM\SOFTWARE\Policies\ClaudeCode` (admin) or `HKCU\SOFTWARE\Policies\ClaudeCode` (user) |
| MCP (project) | `<repo>/.mcp.json` |
| Misc personal | `~/.claude.json` (OAuth, theme, editor mode, per-project trust - NOT a settings.json, per R7.6.8) |

The managed drop-in directory follows systemd conventions: `managed-settings.json` is the base, then `*.json` files sorted alphabetically with numeric prefixes (`10-telemetry.json`, `20-security.json`) merging on top - later files override scalars, arrays concatenate, objects deep-merge (R1.9.2).

### 2.2 Merge semantics (hybrid model)

Claude Code does NOT do pure override. The merge is type-aware (R7.2.2, cross-confirmed R1.9.2):

| Field type | Behavior | Examples |
|---|---|---|
| Scalar | Highest layer wins | `model`, `language`, `defaultShell`, `outputStyle`, `statusLine`, `cleanupPeriodDays` |
| Array | **Concatenated + deduplicated** across ALL layers | `permissions.allow/ask/deny`, `permissions.additionalDirectories`, `sandbox.filesystem.allow*`, `sandbox.network.allowedDomains`, `allowedHttpHookUrls`, `httpHookAllowedEnvVars` |
| Object | Deep-merged; leaves follow scalar/array rules | `hooks`, `env`, `enabledPlugins`, `sandbox.network` |
| Hooks (special) | All entries from all layers aggregate; `type: "command"` deduped by command string, `type: "http"` deduped by URL; matching hooks run in **parallel** | - |

Critical security invariant (R1.12.1, cross-confirmed R4, R5, R7 unanimously): **a lower-layer `allow` cannot override a higher-layer `deny`.** Permission evaluation order is deny -> ask -> allow, first-match-wins. Hooks can tighten, never loosen. Put safety denies at the highest practical layer (usually Managed or global User).

### 2.3 Disabling hooks

Three mechanisms (R7.2.7):

1. **`"disableAllHooks": true`** - nukes everything except managed hooks.
2. **`"allowManagedHooksOnly": true`** (managed only) - blocks every non-managed/non-SDK/non-force-enabled-plugin hook. Nuclear enterprise option.
3. Remove the hook at its origin layer.

Setting empty `"hooks": {}` in a lower layer does **not** remove higher-layer hooks - the merge is additive. This is a common foot-gun.

### 2.4 Decision framework (where does setting X go?)

Three-question triage (R7.3, the single cleanest mental model across the corpus):

1. **Does every teammate need the same behavior for this repo to work correctly?** Yes -> **Project**.
2. **Is this tied to your person (voice, model budget, keyboard, TTS)?** Yes -> **Global**.
3. **Is this secret, experimental, or a machine-specific path?** Yes -> **Local**.

If none is clearly yes, default to **Local first, promote later** (R7.5.1 migration pattern).

| Typical setting | Layer | Why |
|---|---|---|
| TTS / notification hook | Global | Personal preference |
| Post-compact context reminder | Global | Universal need |
| Personal default model | Global | Your Opus/Sonnet/Haiku budget |
| Always-on safety deny rules (`Read(~/.ssh/**)`, `Bash(sudo *)`) | Global | Travels across repos; arrays merge, projects can add more |
| Version-protection hook (block edits to `dist/`, `v32/`) | Project | Repo contract for every committer |
| Build/test runners, lint hooks | Project | Team-wide quality gate |
| Secret file deny rules (`Read(./.env)`, `Read(./secrets/**)`) | Project | Repo-specific paths |
| Project MCP allowlist | Project | Team trust decision |
| `permissions.defaultMode: "plan"` | Project | Team safety posture |
| Personal API keys in `env` | Local | Never leak to git |
| Experimental hook being prototyped | Local | Isolation until promoted |
| Personal override of project model (Opus where team uses Sonnet) | Local | Personal budget |
| Org-wide minimum CLI version / `Bash(curl *)` deny | Managed | Hard law |

CRITIC.7 flagged `awayuSummaryEnabled` and `voiceEnabled` from R7.3.1 as UNVERIFIED typos/hallucinations - excluded here. The `--settings <path>` CLI flag R7 treats as real is **explicitly undocumented per R1.13** - excluded from this guide.

### 2.5 Conflict worked example (hooks)

When three layers define `PreToolUse: Bash` hooks, they do NOT override - they all fire in parallel (R7.2.6):

```jsonc
// ~/.claude/settings.json (global)
{ "hooks": { "Notification": [
  { "hooks": [{ "type": "command", "command": "~/.claude/hooks/tts.sh" }] }
]}}

// <repo>/.claude/settings.json (project)
{ "hooks": { "PreToolUse": [
  { "matcher": "Bash", "hooks": [
    { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/block-rm.sh" }
  ]}
]}}

// <repo>/.claude/settings.local.json (local)
{ "hooks": { "PreToolUse": [
  { "matcher": "Bash", "hooks": [
    { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/dev-logger.sh" }
  ]}
]}}
```

Result on `PreToolUse(Bash)`: `block-rm.sh` AND `dev-logger.sh` both fire in parallel (different command strings, no dedup). On `Notification`: `tts.sh` fires. No conflict.

### 2.6 Full composite settings.json

A working composite exercising every important knob. Adapted from R1.11:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",

  "disableAllHooks": false,
  "allowedHttpHookUrls": ["https://hooks.corp.example/*", "http://localhost:*"],
  "httpHookAllowedEnvVars": ["HOOK_SECRET", "CORP_AUDIT_TOKEN"],

  "permissions": {
    "allow": ["Bash(git diff *)", "Bash(npm run test *)", "Read(~/.zshrc)"],
    "deny": ["WebFetch", "Bash(curl *)", "Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"],
    "ask": ["Bash(git push *)"],
    "defaultMode": "plan"
  },

  "hooks": {
    "SessionStart": [
      { "matcher": "compact",
        "hooks": [{
          "type": "command",
          "command": "echo 'Reminder: use Bun, not npm. Run bun test before committing.'",
          "statusMessage": "Re-injecting post-compact context..."
        }]
      },
      { "matcher": "startup|resume",
        "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/load-env.sh" }]
      }
    ],

    "UserPromptSubmit": [
      { "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/redact-secrets.py" }] }
    ],

    "PreToolUse": [
      { "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "if": "Bash(rm -rf *)",
          "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-destructive.sh"
        }]
      },
      { "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh" }]
      },
      { "matcher": "mcp__.*__write.*",
        "hooks": [{
          "type": "http",
          "url": "https://hooks.corp.example/mcp-write-audit",
          "timeout": 10,
          "headers": { "Authorization": "Bearer $CORP_AUDIT_TOKEN" },
          "allowedEnvVars": ["CORP_AUDIT_TOKEN"]
        }]
      }
    ],

    "PostToolUse": [
      { "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "jq -r '.tool_input.file_path' | xargs -r npx prettier --write" }]
      },
      { "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "jq -r '.tool_input.command' >> ~/.claude/command-log.txt",
          "async": true
        }]
      }
    ],

    "Stop": [
      { "hooks": [{
        "type": "agent",
        "prompt": "Verify unit tests pass before the agent stops. Run the test suite and return {\"ok\": true} on success or {\"ok\": false, \"reason\": \"...\"}. $ARGUMENTS",
        "timeout": 180
      }]}
    ],

    "PreCompact": [
      { "matcher": "auto",
        "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/archive-transcript.sh" }]
      }
    ],

    "ConfigChange": [
      { "hooks": [{ "type": "command", "command": "jq -c '{timestamp: now|todate, source: .source, file: .file_path}' >> ~/claude-config-audit.log" }] }
    ],

    "CwdChanged": [
      { "hooks": [{ "type": "command", "command": "direnv export bash >> \"$CLAUDE_ENV_FILE\"" }] }
    ],

    "FileChanged": [
      { "matcher": ".envrc|.env",
        "hooks": [{ "type": "command", "command": "direnv export bash >> \"$CLAUDE_ENV_FILE\"" }]
      }
    ],

    "StopFailure": [
      { "matcher": "rate_limit|server_error",
        "hooks": [{
          "type": "http",
          "url": "https://hooks.corp.example/claude-incident",
          "timeout": 5,
          "headers": { "X-Secret": "$HOOK_SECRET" },
          "allowedEnvVars": ["HOOK_SECRET"]
        }]
      }
    ]
  }
}
```

### 2.7 Verification

Run `/status` inside Claude Code. It lists every configuration layer, the file or registry source, and errors per file (R7.8). The single most valuable debug command for "why is my hook not firing or why is this permission blocking me".

## Part 3: Patterns

### 3.1 Community top-10 (ranked by real-repo frequency)

From ~40 public repos and gists surveyed in R3, ranked by appearance frequency:

1. **Auto-format on file write** - `PostToolUse` + `Write|Edit|MultiEdit` runs prettier / black / ruff / gofmt on the changed file. The single most common hook. Representative repos: `bartolli/claude-code-typescript-hooks` (SHA256-cached ESLint + Prettier + tsc), Blake Crosley tutorial, `paddo.dev` guardrails post (R3.1.1).
2. **Block destructive Bash** - `PreToolUse` + `Bash` matcher blocks `rm -rf /`, `rm -rf ~`, `git push --force origin main`, `git reset --hard`, `DROP TABLE`, fork bombs. Universal. Representatives: `disler/claude-code-hooks-mastery/.claude/hooks/pre_tool_use.py`, `CodyLunders/claude-code-hooks-library`, Blake Crosley "Security Gate" (R3.1.2).
3. **Protect sensitive files** - `PreToolUse` + `Read|Edit|Write` blocks `.env`, `*.pem`, `*.key`, `terraform.tfstate`, `secrets/**`, `.ssh/**`. Representatives: `file-guard` (Bande-a-Bonnot), disler `.env` logic (R3.1.3).
4. **TTS / desktop notifications** on `Stop` / `Notification` - every flavor exists: ElevenLabs, OpenAI TTS, gTTS, pyttsx3, macOS `say`, `osascript`, Linux `notify-send`, Windows BurntToast, `ntfy.sh`, Slack, Telegram. Representatives: `ZeldOcarina/claude-code-voice-notifications`, `husniadil/cc-hooks`, `777genius/claude-notifications-go`, `claudes-world/cctoast-wsl`, `soulee-dev/claude-code-notify-powershell` (R3.1.4).
5. **Session context injection** - `SessionStart` + `UserPromptSubmit` auto-load `git status`, `git branch`, `TODO.md`, sprint context. Representatives: `launchdarkly-labs/claude-code-session-start-hook`, disler `session_start.py` (R3.1.5).
6. **Audit logging** - every tool call to JSONL / SQLite / remote. Representatives: `disler/claude-code-hooks-multi-agent-observability` (Bun + SQLite WAL + Vue + WebSocket), HCOM's SQLite message bus (R3.1.6).
7. **Auto-run tests after edit** - `PostToolUse` runs pytest/jest/cargo test on the changed file's test. Representatives: Blake Crosley "Test Runner After Changes", `nizos/tdd-guard` (R3.1.7).
8. **Lint / type-check before commit** - `PreToolUse` on `git commit` Bash intercepts, runs `ruff check` / `tsc --noEmit` / `golangci-lint`, exits 2 on fail. Representatives: Blake Crosley "Quality Check Before Commit", `agent-sh/agnix` (R3.1.8).
9. **Prompt injection / secrets scanning** - `UserPromptSubmit` + `PostToolUse` runs ML classifier + regex + AST. Representative: `vaporif/parry` (fail-closed, DeBERTa v3 + Aho-Corasick + tree-sitter), 6 detection layers (R3.1.9).
10. **Inter-agent communication bus** - `SubagentStart/Stop` plus hooks that write/read a local SQLite pipe. Representative: `aannoo/claude-hook-comms` (HCOM) (R3.1.10).

### 3.2 Minimal recipes (drop-in snippets)

**Auto-format (Blake Crosley, R3.Deep-Dive 2):**

```json
{ "hooks": { "PostToolUse": [
  { "matcher": "Write|Edit",
    "hooks": [{ "type": "command",
      "command": "bash -c 'if [[ \"$FILE_PATH\" == *.py ]]; then black --quiet \"$FILE_PATH\" 2>/dev/null; elif [[ \"$FILE_PATH\" == *.js ]] || [[ \"$FILE_PATH\" == *.ts ]]; then npx prettier --write \"$FILE_PATH\" 2>/dev/null; fi'"
    }]
  }
]}}
// from R3 (blakecrosley.com tutorial)
```

**Security gate (but see Anti-Pattern below):**

```json
{ "hooks": { "PreToolUse": [
  { "matcher": "Bash",
    "hooks": [{ "type": "command",
      "command": "bash -c 'INPUT=$(cat); CMD=$(echo \"$INPUT\" | jq -r \".tool_input.command\"); if echo \"$CMD\" | grep -qE \"rm\\s+-rf\\s+/|git\\s+push\\s+(-f|--force)\\s+(origin\\s+)?main|git\\s+reset\\s+--hard|DROP\\s+TABLE\"; then echo \"BLOCKED: $CMD\" >&2; exit 2; fi'"
    }]
  }
]}}
// from R3 (Blake Crosley "Security Gate")
```

Note: the original example embeds a fork-bomb pattern `:(){ :|:& };:` inside the `grep -qE` alternation. CRITIC.3 (and R3's own anti-pattern #2) flags this as "regex-only bash blockers are trivially bypassed" and observes that the `|` inside the fork bomb conflicts with the `grep -qE` alternation syntax. Use AST-based validators like `vaporif/parry` for real security; treat regex blockers as defense in depth only (R3.anti-pattern-2, CRITIC.11).

**WSL -> Windows toast (latenssi gist, R3.Deep-Dive 7):**

```bash
#!/bin/bash
# from R3 (gist.github.com/latenssi/e3a54bbdd84f6d595908c10931ac9b9f)
INPUT=$(cat)
HOOK_MSG=$(echo "$INPUT" | jq -r '.message // empty')
EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // empty')
MESSAGE="${HOOK_MSG:-Task complete}"
MESSAGE="${MESSAGE//\'/\'\'}"
powershell.exe -NoProfile -Command "
Import-Module BurntToast -ErrorAction SilentlyContinue
New-BurntToastNotification -Text 'Claude Code', '$MESSAGE' -Sound 'Default'
" >/dev/null 2>&1 &
```

CRITIC and R4 both flag: `-ExecutionPolicy Bypass`, single-quote injection via `Claude Code`-produced text, and `chcp 65001` locale races as real risks on the Windows toast path. Use the pattern but sanitize aggressively.

### 3.3 Advanced patterns (from R6)

See Part 3.3.1-3.3.6 below. CRITIC flagged some R6 patterns as "hypothetical composites" (P11 cost kill-switch, P12 self-distilling CLAUDE.md) because the HTTP schema for blocking `UserPromptSubmit` is different from tool events - those are surfaced with caveats.

**3.3.1 Handler-type comparison (R6.1.5, cleanest in corpus):**

| Need | Pick | Reason |
|---|---|---|
| Deterministic policy, fast | `command` | 600s budget, stdin JSON, exit 2 blocks |
| Fleet-wide audit to remote service | `http` | 30s budget, POST JSON, env-var allowlist |
| Judgment with no file access | `prompt` | 30s, fast Haiku by default, returns `{ok, reason}` |
| Verification that must read files / run commands | `agent` | 60s + 50 tool-turn cap, full subagent |

**3.3.2 Scoped MCP per subagent (R6.2.2):** subagent frontmatter can declare its own `mcpServers` so that a "researcher" sub only sees `mcp__memory__*` while a "writer" sub sees `mcp__filesystem__*`. YAML schema precise form flagged UNVERIFIED (CRITIC.6).

**3.3.3 Worktree + sparse-checkout + `CwdChanged` (R6.4.2):** when Agent tool is invoked with `isolation: { worktree: true, cwd: "./apps/web" }`, the `WorktreeCreate` hook returns a `worktreePath`, and a paired `CwdChanged` hook writes direnv-style env to `CLAUDE_ENV_FILE` so the subagent inherits the right toolchain without polluting parent session.

**3.3.4 Multi-hook orchestration with explicit precedence (R6.3):** when several `PreToolUse` hooks match, the decision aggregate follows `deny > defer > ask > allow` (R1.5.3). CRITIC cross-confirmed this is authoritative and unambiguous.

**3.3.5 Self-healing loops with `stop_hook_active` guard (R6.7):** `Stop` hooks that exit 2 to force "keep working" must check `stop_hook_active` in the input JSON to avoid infinite loops:

```bash
#!/bin/bash
set -euo pipefail
INPUT=$(cat)
STOP_ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active // false')
if [ "$STOP_ACTIVE" = "true" ]; then exit 0; fi  # break loop
# run tests; if they pass, exit 0; if they fail, exit 2
pytest -x --tb=short >&2 || exit 2
exit 0
```

**3.3.6 Self-distilling CLAUDE.md (R6.12, experimental):** `Stop` hook runs a summarizer that appends the turn's durable lessons to `CLAUDE.md`. Requires careful write-once discipline to avoid append-storms; CRITIC flagged as "hypothetical composite" - use with manual review.

### 3.4 Patterns by event (what community puts on each hook)

From R3's per-event survey, compressed:

| Event | Common patterns |
|---|---|
| `UserPromptSubmit` | Log prompt; inject sprint context / `current-sprint-context.md`; prompt-injection scan (parry); store last prompt for replay. No matcher support (silently ignored). |
| `PreToolUse` | Block dangerous Bash; block `.env` / `*.pem`; enforce conventional commit format; permission auto-allow on safe patterns; TDD pre-check. |
| `PostToolUse` | Auto-format; auto-lint + autofix; type-check; auto-run matching test; send telemetry; JSONL audit. |
| `PostToolUseFailure` | Structured error capture; retry with different strategy (rare). |
| `Notification` | Desktop toast, TTS, Slack/Telegram/ntfy, click-to-focus terminal. |
| `Stop` | "Task complete" TTS; LLM-generated summary; webhook to Slack; **experimental** `type: "prompt"` self-review loop. |
| `SubagentStart/Stop` | TTS spawn/finish; HCOM SQLite bus; observability swim-lane tracking. |
| `PreCompact` | Transcript backup (disler pattern). |
| `SessionStart` | Inject `git branch`, `git status --short`, TODO.md, sprint context, LaunchDarkly flags. |
| `SessionEnd` | Flush logs, close DB, telemetry heartbeat. |
| `PermissionRequest` | Audit log every prompt; auto-allow known-safe patterns; AST-based classifier (Dippy). |

## Part 4: Security

### 4.1 Threat model

Hooks run local code with the full privileges of the Claude Code process. The threat surface is dominated by four vectors (R4.1):

1. **Command injection via tool_input** - Claude-generated Bash commands flow through `tool_input.command`. Naive hooks that interpolate this string into a shell (`eval`, unquoted `"$CMD"`, backticks) hand the model a remote code execution primitive on the developer's machine.
2. **Prompt injection via file content** - hooks that read files Claude just wrote (`PostToolUse + Edit`) can be redirected by adversarial content. Worse: `SessionStart` / `UserPromptSubmit` hooks that load external context (`git status`, package.json descriptions, MCP responses) can ingest attacker-controlled strings that then manipulate Claude's behavior for the rest of the session.
3. **Supply-chain attacks on hook scripts** - `~/.claude/hooks/*.sh`, `.claude/hooks/*.py`, community-shared `settings.json` snippets are unsigned code that runs before Claude's own permission checks. A compromised dotfiles repo is full compromise.
4. **Data exfiltration via `http` hooks and observability** - `PostToolUse` hooks that POST full tool inputs to remote services turn every file read into an exfil channel. The `allowedHttpHookUrls` wildcard is the single most important defense.

CRITIC flagged R4's CVE identifiers (`CVE-2025-59536` and `CVE-2026-21852`) as **UNVERIFIED** - neither appears in the MITRE CVE database the synthesizer could confirm (CRITIC.4). They are surfaced in Appendix B as claims to verify independently; do not cite them in a production threat model without confirmation.

### 4.2 Anti-patterns (community-observed)

From R4.9 cross-referenced with R3 anti-patterns (both converge on the same top issues):

| # | Anti-pattern | Why it's dangerous | Fix |
|---|---|---|---|
| 1 | `exit 1` to block | Non-blocking by spec; attacker sees "blocked" transcript notice but action proceeded | Use `exit 2` or JSON `{"decision":"block"}` |
| 2 | Regex-only Bash blockers | `rm  -rf /` (double space), `\rm -rf /` (escaped), `eval "rm -rf /"`, `bash -c "..."`, base64-encoded all bypass trivially | AST parser (`vaporif/parry`, tree-sitter), or `sandbox` + `permissions.deny` defense-in-depth |
| 3 | `.env` substring match | Misses `.envrc`, nested `src/.env`, symlinks, `.env.production` | Glob `Read(./**/.env*)` or canonicalize path before comparing |
| 4 | Secrets in `settings.json` | File is committed; `httpHookAllowedEnvVars` is the right vehicle | Use `apiKeyHelper`, local-scope `env`, or managed secret stores |
| 5 | PowerShell `-ExecutionPolicy Bypass` | Removes the one OS-level check; prompt-injection target | Sign scripts or use `-File` with path allowlist |
| 6 | Single-quote cross-shell injection | `'; rm -rf ~; '` passes naive Bash -> PowerShell escaping | Use `jq -r` with strict schema, or pass via env var instead of argv |
| 7 | Hardcoded webhook URLs | No `allowedHttpHookUrls` -> any layer can add an exfil endpoint | Pin `allowedHttpHookUrls` at Managed or User scope |
| 8 | Synchronous HTTP hooks on hot path | Endpoint downtime blocks every tool call | `async: true` for telemetry; sync only for auth/policy |
| 9 | Hooks that POST full transcripts | Single compromise exfiltrates entire conversation history | Redact in hook before POST; prefer local JSONL |
| 10 | Hooks that trust `tool_input` without validation | `file_path: "../../../etc/passwd"` reaches `cat "$FILE"` | Canonicalize, verify under `CLAUDE_PROJECT_DIR`, reject otherwise |
| 11 | Missing `timeout` field | Misbehaving hook freezes Claude up to 600s | Always set explicit `timeout` |
| 12 | `allow-all` permissions in committed project settings | "Works on my machine" becomes "owns every cloner" | Keep wide allows in `settings.local.json`, never committed |

### 4.3 Hardening checklist

Apply in order. Items 1-6 are mandatory for any settings.json shipped to others; 7-12 are defense-in-depth (R4.7, cross-confirmed R7.6):

1. **Pin `allowedHttpHookUrls`** at User or Managed scope to a specific host/path list. No wildcards like `"*"`. Project scope can add, not weaken (arrays concat-dedup).
2. **Pin `httpHookAllowedEnvVars`** to the exact secrets each HTTP hook needs. Every other env var is stripped before POST.
3. **Deny `Bash(sudo *)`, `Bash(curl *)`, `Bash(wget *)`, `WebFetch`** at Global or Managed scope. Wide-blast radius and primary exfil vectors.
4. **Deny `Read(./.env)`, `Read(./.env.*)`, `Read(./secrets/**)`, `Read(~/.ssh/**)`, `Read(~/.aws/**)`** at User scope - travels across repos.
5. **Quote `$CLAUDE_PROJECT_DIR`**, never interpolate `tool_input` directly. `INPUT=$(cat); COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')` is the safe shape; never `CMD="$1"; eval "$CMD"`.
6. **Use `set -euo pipefail`** in every Bash hook. Silent `set -e`-swallowed failures are how "block on error" becomes "allow on error".
7. **Enable `sandbox.enabled: true`** with `filesystem.denyWrite` and network `allowedDomains`. Sandboxing is declarative and unbypassable by hook misconfig.
8. **Set `defaultMode: "plan"`** in project settings. Forces explicit user approval for the first destructive action per session.
9. **Canonicalize every file path** hook scripts read or write. `realpath --relative-to="$CLAUDE_PROJECT_DIR"` and reject results starting with `..`.
10. **Sign or pin hook scripts** in CI. Hash the `.claude/hooks/*.sh` tree and fail CI on drift; trivially detects supply-chain tampering.
11. **Separate validator from executor.** `PreToolUse` hook that validates should not also mutate - a single compromise otherwise gets both reads and writes.
12. **Log hook decisions, not just tool calls.** A `ConfigChange` hook writing every settings.json edit to an append-only log catches "attacker added a rogue hook" faster than any other control.

### 4.4 Specific hardening recipes

**Command-injection-safe Bash blocker using `jq` and env var pass-through (R4.4):**

```bash
#!/bin/bash
# from R4 (hardening recipe 2)
set -euo pipefail
INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Never interpolate CMD into a shell; pass via env to downstream tool
CLAUDE_CMD="$CMD" python3 "$CLAUDE_PROJECT_DIR/.claude/hooks/validate.py"
# exit propagated from validate.py; 2 = block, 0 = allow
```

**`$CLAUDE_PROJECT_DIR`-aware protect-files hook (R3 Deep-Dive + R4.4):**

```bash
#!/bin/bash
# from R3 (disler) + R4 (canonicalization)
set -euo pipefail
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
[ -z "$FILE" ] && exit 0

CANON=$(realpath -m "$FILE")
PROJECT=$(realpath -m "$CLAUDE_PROJECT_DIR")

# Reject escape-from-project
case "$CANON" in
  "$PROJECT"/*) ;;
  *) echo "BLOCKED: $FILE escapes \$CLAUDE_PROJECT_DIR" >&2; exit 2 ;;
esac

# Reject secret files
case "$CANON" in
  */.env|*/.env.*|*/secrets/*|*/.ssh/*|*.pem|*.key)
    echo "BLOCKED: protected file $FILE" >&2; exit 2 ;;
esac
exit 0
```

**Redact-secrets on `UserPromptSubmit` (R3.1.9 parry pattern, simplified):**

```bash
#!/bin/bash
# from R3 (vaporif/parry lineage) + R4 hardening
set -euo pipefail
INPUT=$(cat)
PROMPT=$(echo "$INPUT" | jq -r '.prompt // empty')

# Simple regex scrub (defense-in-depth only; use parry for production)
CLEAN=$(echo "$PROMPT" | sed -E \
  -e 's/sk-[A-Za-z0-9]{20,}/sk-REDACTED/g' \
  -e 's/ghp_[A-Za-z0-9]{36}/ghp_REDACTED/g' \
  -e 's/AIza[A-Za-z0-9_-]{35}/AIza-REDACTED/g')

if [ "$CLEAN" != "$PROMPT" ]; then
  jq -n --arg ctx "Secrets were redacted from your prompt before submission." \
    '{hookSpecificOutput: {hookEventName: "UserPromptSubmit", additionalContext: $ctx}}'
fi
exit 0
```

### 4.5 When hooks are the wrong tool

Hooks are code you own. For pure pattern-match denies, `permissions.deny` is:

- **faster** (no subprocess, no JSON parse, no stdin pipe),
- **unbypassable by hook misconfig** (deny is evaluated before any hook fires),
- **auditable** (one line of JSON instead of one file of script).

R4.8 recommends the hierarchy: **`sandbox` > `permissions.deny` > hooks**. Use hooks only for decisions that require dynamic evaluation (look at tool output, call an API, read a database). For "never let Claude touch X", deny rules are superior on every axis.

## Part 5: Performance

### 5.1 Timeout budgets and latency

Default timeouts by handler type (R1.4, cross-confirmed R5.3):

| Handler | Default | Safe range | Latency floor (cold start) |
|---|---|---|---|
| `command` | 600 s | 1-60 s typical; >180 s needs justification | 10-30 ms fork + shell startup |
| `http` | 30 s | 3-15 s typical | 5-50 ms local, 20-200 ms remote |
| `prompt` | 30 s | 10-25 s (Haiku) | 500-2000 ms (LLM RTT) |
| `agent` | 60 s | 30-180 s (50 tool-turn cap is the real ceiling) | 2-20 s (subagent boot + tool calls) |

**Hot-path budget** (R5.1): every hook on `PreToolUse` / `PostToolUse` adds to every Bash/Edit turn. The community threshold for "noticeable" lag is **~500 ms p95**; below 100 ms feels instant. Above 2 s, users disable the hook within a session.

**Concurrency**: matching hooks in a single event fire **in parallel**. The event blocks until the slowest returns or hits timeout. Adding a second hook at 200 ms does NOT double latency; adding one at 3 s pegs the whole event at 3 s.

### 5.2 Real-world case studies

**ruvnet/ruflo issue #1530 (R5.5.2):** 11 hooks chained on `PreToolUse + PostToolUse` produced **18-21 seconds added latency per prompt** on a 20-event turn. Root cause: synchronous HTTP audit calls with 2 s p50 each, no `async`, no deduplication. Fix reduced end-to-end latency to ~1.5 s by converting 8 of the 11 to `async: true` and collapsing 3 validators into a single Python script.

**claudekit benchmarks (R5.5.1):** published hook micro-benchmarks show p50/p95/p99 for the reference hooks:

| Hook | p50 | p95 | p99 |
|---|---|---|---|
| auto-format (prettier, small file) | 85 ms | 180 ms | 350 ms |
| black auto-format | 110 ms | 220 ms | 400 ms |
| regex deny check | 12 ms | 25 ms | 60 ms |
| tsc --noEmit (cold) | 3.2 s | 5.1 s | 8.4 s |
| tsc --noEmit (incremental, warm) | 180 ms | 420 ms | 900 ms |
| `prompt`-type Haiku validator | 650 ms | 1400 ms | 2800 ms |

Specific numbers flagged UNVERIFIED in CRITIC (see Appendix B) - directionally correct per R5 but exact values depend on hardware and Haiku RTT.

### 5.3 Observability recipes

From R5.4 ranked by adoption:

1. **JSONL append log** - cheapest, zero dependencies. `PostToolUse` hook: `jq -c . >> ~/.claude/tool-log.jsonl`. Grep-friendly, `jq` analyzable, rotates with `logrotate`.
2. **SQLite + WAL** - disler observability pattern (`disler/claude-code-hooks-multi-agent-observability`). Bun + SQLite + Vue dashboard + WebSocket live stream. Works offline, queryable across sessions.
3. **OpenTelemetry traces** - `TRACEPARENT` / `TRACESTATE` exposed in SDK headless as of v2.1.110 (R2.2.2). Each tool call becomes a span; subagent calls become child spans. Ships to Jaeger / Honeycomb / Datadog via OTLP.
4. **Prometheus metrics via `http` hook** - POST counters to a local Pushgateway. Best when you already run Prometheus; overkill otherwise.
5. **HCOM message bus** - `aannoo/claude-hook-comms`: a local SQLite-backed pub/sub that `SubagentStart` / `SubagentStop` drive. Observability emerges from the bus.
6. **Vendor cloud observability** - Datadog / Honeycomb / Sentry wrappers via `http` hook. Watch the data-exfiltration risk (Part 4); redact before POST.
7. **Local TUI tail** - `tail -f ~/.claude/tool-log.jsonl | jq -c 'select(.tool_name != "Read")'` is the one-liner most developers actually use day-to-day.

### 5.4 Debugging workflow

When a hook is slow or not firing, walk this list in order (R5.6):

1. **`/status`** - does the hook appear under the expected event and scope? If not, it's a settings.json parse error or wrong precedence layer.
2. **`/hooks`** - full browse of every hook, matcher, type, source. Confirms matcher is what you think.
3. **`claude --debug`** - verbose trace of every hook invocation, exit code, stdout/stderr snippet. The primary diagnostic tool.
4. **Manual invocation** - `echo '{"tool_name":"Bash","tool_input":{"command":"ls"}}' | ./my-hook.sh; echo "exit=$?"`. Decouples the hook from Claude entirely.
5. **Time it** - `time ./my-hook.sh < fixture.json`. If >500 ms, you need `async: true` or to move the work off the hot path.
6. **Check exit code vs expected semantics** - exit 1 where you meant exit 2 is the #1 bug (Part 7.2).
7. **Check stdout for unexpected banners** - `~/.bashrc` printing "Shell ready" wrecks JSON parsing. Wrap shell banners in `if [[ $- == *i* ]]; then ... fi`.
8. **Check timeout** - default command is 600 s; if your script hangs, it hangs Claude. Set explicit `timeout`.
9. **Check stderr** - on exit 2 it's fed back to Claude; on exit 0 it's shown in transcript; neither case is silent.

### 5.5 Design patterns for performance

From R5.7 + R6 advanced patterns:

1. **Cache by content hash.** bartolli's TypeScript hooks SHA256-cache ESLint + Prettier + tsc results per file; rerun only on content change. Works for any deterministic validator.
2. **Debounce file-change hooks.** `FileChanged` on `.envrc` can fire in bursts during `direnv reload`; guard with a 200 ms mtime debounce.
3. **Async telemetry, sync security.** Rule of thumb: if the hook's decision doesn't affect correctness, `"async": true`.
4. **Collapse validators.** Three sequential Python scripts on `PreToolUse` cost three forks. One script dispatching internally costs one fork.
5. **Prefer deny rules over PreToolUse scripts** for pure pattern-match. Declarative denies skip the subprocess entirely.
6. **Prefer `if:` over matcher regex** for tool-arg filtering. `if: "Bash(git *)"` fires the hook only when the arguments match; a regex matcher fires the hook and then the script has to decide.

### 5.6 Telemetry metrics to track

Minimum useful set per R5.4:

- `hook_invocations_total{event, matcher, handler, decision}` - counter.
- `hook_latency_seconds{event, handler}` - histogram; alert on p95 > 1 s.
- `hook_timeout_total{event, handler}` - counter; any non-zero is a bug.
- `hook_exit_code_total{event, handler, code}` - catches exit-1-when-you-meant-2 drift.
- `tool_blocked_total{tool_name, reason}` - which hook blocked which tool, why.
- `session_duration_seconds` + `session_context_tokens` - feeds the 4.7 compaction-threshold math in 6.4.

## Part 6: 2026 Delta (Opus 4.7 era, release 2026-04-16)

Claude Opus 4.7 shipped on **2026-04-16** (GA on claude.ai, Claude API, AWS Bedrock, Google Vertex, Microsoft Foundry) with Claude Code CLI build **v2.1.111** same-day (R2.1.1). The synthesis treats 2026-04-16 as the authoritative release date per the primary source, even though the environment's `currentDate` today is 2026-04-17 (that is "yesterday's release, today's audit" per CRITIC.0.6).

### 6.1 Model-side changes relevant to hooks

- **Pricing unchanged** vs 4.6: $5/MTok input, $25/MTok output, cache tiers $6.25 (5m write) / $10 (1h write) / $0.50 (read). Hook cost budgets do **not** require recalibration on pricing (R2.1.1, cross-confirmed CRITIC.10).
- **Context window: 1M tokens** standard (not premium/beta). CRITIC.2 resolved R2's self-contradiction (section 2.8 said 4.6 was 200k; section 3 said 1M) in favor of **1M for both 4.6 and 4.7** - 200k was Opus 4.5 (CRITIC.8 row "Opus 4.6 context window").
- **Max output: 128k tokens** Messages API, 300k with beta header `output-300k-2026-03-24` in Batch API (R2.1.1; header string flagged UNVERIFIED per CRITIC, see Appendix B).
- **New tokenizer: 1.0x-1.35x more tokens** for the same input vs 4.6 (R2.1.2). This is the single most impactful hook migration hazard (see 6.4 below).
- **`xhigh` effort level** - new, between `high` and `max`. Recommended start for coding/agentic work (R2.1.2).
- **Adaptive thinking OFF by default** in 4.7 (was ON in 4.6). `thinking: {type: "adaptive"}` must be explicit.
- **Extended thinking budgets removed.** `thinking.budget_tokens` returns 400.
- **Sampling params** (`temperature`, `top_p`, `top_k`) **non-default returns 400**. Strip them from every API-calling hook (R2.4.1).
- **Hi-res vision 2576px / 3.75MP** (from 1568px) - 1:1 coordinate mapping for computer-use screenshot workflows.
- **Task budgets (beta)** - advisory token budget per agentic loop. Enable with header `task-budgets-2026-03-13` (UNVERIFIED string, flagged by CRITIC). Minimum 20k.
- **Behavior shift: fewer tool calls, fewer subagents, more literal instruction following** (R2.2.5). Hooks that counted on the model spawning many subagents now fire less often; promote with `xhigh` effort to compensate.
- **+13% coding performance** vs 4.6 per Anthropic benchmarks (64.3% SWE-bench Pro, 87.6% SWE-bench Verified, 69.4% Terminal-Bench 2.0 - specific numbers UNVERIFIED per CRITIC).

### 6.2 New hook events and handler improvements (April 2026 window)

The April 2026 Claude Code builds (v2.1.101 -> v2.1.112) expanded the hook surface substantially. Events new in 2026:

| Event | Introduced in | Why it matters for 4.7 |
|---|---|---|
| `TaskCreated` / `TaskCompleted` | v2.1.84 | Intercept 4.7's agentic task loop, align with new `task-budgets` beta |
| `TeammateIdle` | v2.1.84 | Control idle state when 4.7 spawns fewer subagents |
| `WorktreeCreate` / `WorktreeRemove` | v2.1.84 | Agent tool gained `isolation.worktree: true`; hook can return `worktreePath` |
| `CwdChanged` | v2.1.83 | Reactive env management (direnv-style), writes `CLAUDE_ENV_FILE` |
| `FileChanged` | v2.1.83 | Literal-not-regex filename watchers (`.envrc\|.env`) |
| `PreCompact` (blockable) | v2.1.105 | Critical for 4.7 - tokenizer + 1M context changes optimal compaction math |
| `PostCompact` | v2.1.76 | Audit after compaction |
| `StopFailure` | v2.1.78 | Distinguish `rate_limit` / `billing_error` / `max_output_tokens` - relevant at 128k output |
| `PermissionDenied` | v2.1.89 | Auto-mode classifier denial; Auto mode GA for Max users on 4.7 |
| `Elicitation` / `ElicitationResult` | v2.1.76 | Intercept MCP elicitation flows |
| `InstructionsLoaded` | v2.1.76 | Audit CLAUDE.md / `.claude/rules/*.md` loads |
| `ConfigChange` | v2.1.76 | Runtime intercept of settings / skills edits |
| `PostToolUseFailure` | v2.1.76 | Separate from `PostToolUse`; gets `error` field |
| `PermissionDenied` | v2.1.90 | `{retry: true}` lets model retry the denied call |

Handler-level improvements landed on or near release day (R2.2.2):

- **v2.1.111 (4.7 release day):** `UserPromptSubmit` can now set `hookSpecificOutput.sessionTitle` for auto-naming sessions; push-notification tool routed through `Notification` hook event; plan files named after the prompt (e.g. `fix-auth-race-snug-otter.md` - naming scheme UNVERIFIED).
- **v2.1.110:** Regression fix - `additionalContext` no longer dropped when the gated tool call fails; `PermissionRequest` validation of `permissions.deny` fixed; `setMode:'bypassPermissions'` respects `disableBypassPermissionsMode`; SDK headless exposes `TRACEPARENT` / `TRACESTATE` env for distributed tracing of subagent calls.
- **v2.1.105:** `PreCompact` becomes blockable (exit 2 or `{"decision":"block"}`); `monitors` top-level manifest key auto-arms background monitors at session start / skill invoke; skill-description cap raised 250 -> 1536 chars (specific cap UNVERIFIED per CRITIC).
- **v2.1.98 (security fix, still relevant):** hooks returning `"allow"` do NOT bypass `deny` rules from settings. This is a permanent security invariant (R1.12.1, cross-confirmed R4/R5/R7).

### 6.3 Agent tool parameter changes

```json
{
  "type": "agent",
  "name": "researcher",
  "run_in_background": true,
  "isolation": { "worktree": true, "cwd": "/specific/path" },
  "model": "opus"
}
```

- **`run_in_background: true`** - does not block parent; `SubagentStart` fires immediately, `SubagentStop` when done; partial results preserved on kill.
- **`isolation.worktree: true`** - requires `WorktreeCreate` hook to return `worktreePath`; otherwise Claude Code uses its default layout.
- **`isolation.cwd`** - pairs with `CwdChanged` hook for per-subagent env.
- **`model: "opus"`** - per-invocation model override (re-introduced v2.1.75). `PreToolUse` with `tool_name: "Agent"` can rewrite this via `updatedInput`.
- **`TaskOutput` tool REMOVED (v2.1.83).** Hooks matching `PostToolUse: TaskOutput` must migrate to `FileChanged` on the background task file, or `PostToolUse: Read` with a path matcher (R2.4.2).

### 6.4 Migration 4.6 -> 4.7 checklist

For hook scripts that call the Claude API directly:

1. **Strip sampling params** - `temperature`, `top_p`, `top_k` all return 400 (R2.4.1).
2. **Rewrite `thinking` config** - `{"type": "adaptive", "display": "summarized"}` replaces `{"type": "enabled", "budget_tokens": N}`. Add `effort: "xhigh"` in `output_config` if you want 4.7's full coding strength.
3. **Raise `max_tokens` ~20-30%** to absorb the tokenizer delta.
4. **Re-enable thinking stream** - `"display": "summarized"` or users see a visible pause.

For `settings.json` hooks:

5. **Lower `PreCompact` trigger ~25%.** If the hook triggered at 85% context fill on 4.6 (~850k of 1M), move it to ~70% (~700k) on 4.7 so the same content under the new tokenizer still fits (R2.2.6). This is the hazard CRITIC most emphasizes: "Jesli hook liczyl 'skompaktuj kiedy context > 800k' na 4.6, to na 4.7 ten sam content to ~1.08M tokenow - juz przekracza context window".
6. **Audit `"allow"` decisions** - with v2.1.98's fix they no longer bypass deny rules; migrate to `"ask"` or rebuild the permission rules if you relied on this.
7. **Replace `TaskOutput` matchers** with `FileChanged` or `PostToolUse: Read`.
8. **Add `WorktreeCreate` hook** if you use `isolation.worktree` in Agent tool calls.
9. **Add `PermissionDenied` hook with `{retry: true}`** for Max-tier Auto mode on 4.7.
10. **Set `effort: xhigh` in frontmatter** for intensive skills that need 4.7's full coding strength; cheaper skills can stay at defaults.
11. **Remove `/tag` and `/vim`** command hooks - commands removed in v2.1.92 (version UNVERIFIED).
12. **Drop defensive `additionalContext` workarounds** that compensated for the v2.1.109 tool-call-failure bug - fixed in v2.1.110.

### 6.5 Things that did NOT change (do not touch)

- Pricing tiers (input / output / cache write 5m / cache write 1h / cache read).
- Context window 1M (4.6 was already 1M; 4.5 was 200k).
- Tool use token overhead (346 auto/none, 313 any/tool - specific numbers UNVERIFIED per CRITIC).
- MCP tool matcher format `mcp__<server>__<tool>`.
- Common hook input fields (`session_id`, `transcript_path`, `cwd`, `hook_event_name`, `permission_mode`).
- Precedence ladder Managed > CLI > Local > Project > User.
- Exit-code semantics (0/1/2 unchanged since the beginning).

### 6.6 Validator-model cost table (when hooks call LLMs)

From R2.2.7, directionally correct per CRITIC.10 (pricing numbers internally consistent):

| Validator | Input /MTok | Output /MTok | Latency | Fit |
|---|---|---|---|---|
| Haiku 4.5 | $1.00 | $5.00 | 4-5x faster than Sonnet | **Preferred** PreToolUse validator |
| Haiku 3.5 | $0.80 | $4.00 | Fast, no extended thinking | Only for trivial classification |
| Sonnet 4.6 | $3.00 | $15.00 | Fast, has extended thinking | Nuanced policy checks |
| Opus 4.7 | $5.00 | $25.00 | Moderate | Not as validator - too slow, too expensive |

Worked example (R2.2.7): Haiku 4.5 called once per `PreToolUse` with 2k input / 200 output = $0.002 + $0.001 = **$0.003 per event**. At 500 events/session that is **$1.50 additional cost** - acceptable for critical security gates, too expensive for ubiquitous telemetry. Prompt caching at $0.10/MTok read for Haiku 4.5 (CRITIC caught that the "10x cheaper" claim in R2 was inconsistent - actual cache-read discount vs normal input for Haiku is the standard $0.50/MTok read ratio, see Appendix B) cuts the cost ~80% when the system prompt is stable across events.

## Part 7: Decision Guide

### 7.1 "I want X, which hook?"

| You want to... | Event | Handler | Typical layer |
|---|---|---|---|
| Format files Claude just wrote | `PostToolUse` + `Edit\|Write` | `command` | Project |
| Block `rm -rf /` and force-push | `PreToolUse` + `Bash` (+ `if: "Bash(rm -rf *)"`) | `command` | Project or Global |
| Keep Claude from reading `.env` | `permissions.deny`, NOT a hook (deny rules are faster and unbypassable) | n/a | Project |
| Get a desktop toast when Claude stops | `Stop` or `Notification` | `command` | Global |
| Inject `git status` at session start | `SessionStart` + `startup\|resume` | `command` | Global (personal) or Project (team) |
| Force tests to pass before Claude can stop | `Stop` | `agent` (60s, 50-turn cap) | Project |
| Audit every tool call to a remote service | `PostToolUse` | `http` + `async: true` | Global (personal) or Project (team) |
| Reload env vars when cwd changes | `CwdChanged` | `command` writing `CLAUDE_ENV_FILE` | Global |
| Archive transcript before auto-compaction | `PreCompact` + `auto` | `command` | Global |
| Validate a Bash command with a fast LLM | `PreToolUse` + `Bash` | `prompt` (Haiku default, 30s) | Project |
| Alert Slack on rate-limit errors | `StopFailure` + `rate_limit` | `http` (sync, 5s) | Global or Project |
| Redact secrets before they leave the machine | `UserPromptSubmit` (prompt) and `PostToolUse` (tool output) | `command` | Project |
| Intercept MCP write calls | `PreToolUse` + `mcp__.*__write.*` regex matcher | `http` | Project |
| Stop Claude from creating a task unless a ticket exists | `TaskCreated` | `prompt` or `command` (exit 2 rolls back) | Project |
| Auto-approve `ExitPlanMode` so plan->code is fluid | `PermissionRequest` + `ExitPlanMode` | `command` returning `{"hookSpecificOutput":{"decision":{"behavior":"allow"}}}` | Global |

### 7.2 Exit 1 vs exit 2 (the #1 implementation mistake)

Every community resource warns about this (R3 anti-pattern #1, R4 anti-pattern #1, R1.5.1). Every implementer still trips:

- **exit 0** - success. Stdout parsed as JSON or appended to context (for `UserPromptSubmit`/`SessionStart`).
- **exit 1** - NON-BLOCKING error. Transcript shows a one-line notice; stdout/JSON ignored. Does NOT block, even though 1 is the conventional Unix failure.
- **exit 2** - BLOCKING. Stderr fed back to Claude (on tool events) or shown to user. This is the ONLY way to stop an action.

`bash set -e` with `exit $?` silently swallows errors into non-blocking warnings - use `set -euo pipefail` and `exit 2` explicitly.

### 7.3 Global vs project vs local flow

Use this mental decision tree (R7.3):

```
  [new hook / setting]
        |
        v
  Does every teammate need the SAME behavior
  for this repo to work correctly?
   |                         |
  YES                       NO
   |                         v
  -> PROJECT           Is it tied to YOU
  (committed)          (voice, model, ergonomics)?
                         |              |
                        YES            NO
                         |              v
                     -> GLOBAL     Is it secret,
                     (~/.claude)   experimental, machine-path?
                                        |
                                       YES
                                        |
                                   -> LOCAL
                                   (gitignored)
```

If three-way ambiguous: default LOCAL, promote to PROJECT after 1-2 weeks of proven value (R7.5.1 migration pattern). Teams new to hooks should expect 80% project, 15% global, 5% local.

### 7.4 Red flags (hooks you should NOT ship)

Compiled from R3.anti-patterns + R4.9 + R7.6. These are the recurring community mistakes:

1. **Exit code confusion.** Using `exit 1` to block. Will NOT block (R3.#1).
2. **Regex-only bash blockers.** `grep -qE "rm -rf"` bypassed by `rm  -rf`, `\rm -rf`, `eval "..."`, `bash -c "..."`. Use AST (R3.#2, R4).
3. **`.env` substring match.** Misses `.envrc`, `src/.env`, symlinks. Use glob patterns or path-canonicalization (R3.#3).
4. **Secrets in `settings.json`.** ANTHROPIC_API_KEY, ELEVENLABS_API_KEY, Slack webhooks hardcoded - and committed. Use `apiKeyHelper` or local `env` (R3.#4, R7.6.1).
5. **PowerShell `-ExecutionPolicy Bypass`.** "Run arbitrary code." Prompt-injection target (R3.#5).
6. **Single-quote escaping across Bash -> PowerShell.** `';rm -rf ~;'` slips through most naive escapes (R3.#6).
7. **Synchronous HTTP hooks block Claude.** If the webhook endpoint is down, every tool call waits the full timeout. Use `"async": true` for telemetry (R3.#7, R5).
8. **Missing `$CLAUDE_PROJECT_DIR` prefix.** Hook works from project root, silently fails from subdirectory (R3.#8).
9. **Hooks that POST full transcripts.** Observability services with conversation history are a single-compromise-away from exfiltrating everything Claude saw (R3.#9).
10. **No `timeout` field.** Defaults are generous (600s command). A misbehaving hook freezes Claude. Set `timeout: 5` for telemetry, `timeout: 30` for validators, `timeout: 180` for test suites (R3.#10).
11. **`uv run` dependency assumption.** Every hook silently fails if `uv` is not installed. disler's layout has this risk (R3.#12).
12. **`allow-all` permission configs in project settings.** Convenient for research, catastrophic in production. Copy-paste victims miss the warning (R3.#13).
13. **Hardcoded personal paths in project settings.** `/Users/maciej/...` breaks for every teammate. Use `$CLAUDE_PROJECT_DIR` (R7.6.3).
14. **Global hook that assumes a project structure.** `cat package.json` fails in Python/Rust repos. Guard with `[ -f "$CLAUDE_PROJECT_DIR/package.json" ] || exit 0` (R7.6.4).
15. **`disableAllHooks: true` at project scope.** Nukes user safety hooks. Almost never what you want (R7.6.9).
16. **Relying solely on `permissions.deny` without sandbox defense-in-depth.** Edge cases (shell expansion, subcommand chains) can bypass. Reinforce with `sandbox.enabled: true`, network `allowedDomains`, `filesystem.denyWrite` (R7.6.6).
17. **`autoMemoryDirectory` in project settings.** Explicitly forbidden - "prevents shared repos from redirecting memory writes to sensitive locations" (R7.6.11).
18. **Rc-file banners corrupting stdout.** `~/.bashrc` printing "Shell ready" wrecks JSON hook output. Wrap shell banners in `if [[ $- == *i* ]]; then ... fi` (R1.5.5).

### 7.5 `exit 2` vs structured JSON decision

Two paths to block. Pick one per hook; never mix (R4.6.1):

- **Exit 2** - fast, ergonomic for shell scripts. Stderr fed back to Claude. Use when you have a clear binary block/allow and want a human-readable reason.
- **Structured JSON on exit 0** - richer: rewrite arguments (`updatedInput`), inject context (`additionalContext`), pass a retry flag (`retry: true`), stop the turn entirely (`continue: false`), silence debug (`suppressOutput: true`). Use when you need one of these features.

For `PreToolUse`, `hookSpecificOutput.permissionDecision` offers `allow` / `deny` / `ask` / `defer` with explicit `permissionDecisionReason`. Prefer this over `decision: "block"` for tool events.

### 7.6 When to stop adding hooks

Practical budget per R5 (performance guidance):

- More than 3 hooks chained on `PreToolUse` starts to add visible latency on every Bash/Edit call.
- If any `PreToolUse` hook takes >500ms in p95, measure. Sub-100ms is the sweet spot for sync validators.
- Prefer `permissions.deny` over `PreToolUse` blockers when the decision is pure pattern-match: deny rules are native and faster than spawning a shell script.
- Prefer `async: true` HTTP hooks for any telemetry that is not on the blocking path.
- Prefer `sandbox` and MCP allowlists over hooks for broad attack-surface reduction: sandboxing is declarative, faster, and unbypassable by hook misconfiguration.

Hooks are deterministic control; they are not cheap. Each one is code you own and must maintain across upgrades.

## Appendix A: Source Map

Per-section anchor reports (R1 = canonical unless noted; CRITIC = authoritative for conflicts):

| Synthesis section | Primary source | Cross-confirmed by |
|---|---|---|
| 1.1 What a hook is | R1.2 | R5.2, R6.1, R7.2 |
| 1.2 28-event reference | R1.3 | R6.1 (partial), CRITIC.s6.v resolves count to 28 |
| 1.3 Handler types | R1.4 | R6.1.5 matrix, CRITIC rejects R4's 60s claim |
| 1.4 Exit codes | R1.5 | R3.anti-#1, R4.6.1 (mutual exclusivity) |
| 1.5 Matcher syntax | R1.6 | R7.2.5 |
| 1.6 Env and stdin | R1.8 | R3 patterns, R6 worktree integration |
| 2.1 Where settings live | R1.9, R7.1.1 | unanimous across R1/R4/R5/R7 |
| 2.2 Merge semantics | R7.2.2 | R1.9.2 |
| 2.3 Disabling hooks | R7.2.7 | R1.12 |
| 2.4 Decision framework | R7.3 | cleanest mental model in corpus |
| 2.5 Conflict example | R7.2.6 | R1 hooks aggregation rule |
| 2.6 Composite settings | R1.11 | R7.9 |
| 2.7 `/status` | R7.8 | R5.6 debugging |
| 3.1 Community top-10 | R3 | R6 cross-confirms common patterns |
| 3.2 Minimal recipes | R3 Deep-Dive 1-7 | attribution comments inline |
| 3.3 Advanced patterns | R6.1.5-R6.12 | CRITIC flags P11/P12 hypothetical |
| 3.4 Patterns by event | R3 per-event survey | R6 |
| 4.1 Threat model | R4.1 | R3 anti-patterns |
| 4.2 Anti-patterns | R4.9, R3.anti-patterns | converge on top 12 |
| 4.3 Hardening checklist | R4.7 | R7.6 |
| 4.4 Hardening recipes | R4.4, R3 Deep-Dives | - |
| 4.5 When not to use hooks | R4.8 | R7.6.6 sandbox defense-in-depth |
| 5.1 Timeout budgets | R1.4 + R5.3 | CRITIC rejects R4's 60s |
| 5.2 Case studies | R5.5.1 claudekit, R5.5.2 ruvnet/ruflo #1530 | UNVERIFIED exact numbers |
| 5.3 Observability | R5.4 | R6.11 |
| 5.4 Debugging | R5.6 | R7.8 |
| 5.5 Design patterns | R5.7, R6 | bartolli SHA256 cache (R3 Deep-Dive 1) |
| 5.6 Telemetry metrics | R5.4 | - |
| 6.1 Model-side changes | R2.1.1-R2.1.2 | CRITIC.2 resolves 1M context contradiction |
| 6.2 New hook events | R2.2.2 | R1.3 cross-reference, CRITIC flags version numbers |
| 6.3 Agent tool changes | R2.4.2 | R6.4.2 worktree |
| 6.4 Migration checklist | R2.4.1 | CRITIC emphasizes compact-trigger math |
| 6.5 Unchanged items | R2 implicit + CRITIC.10 | - |
| 6.6 Validator cost table | R2.2.7 | CRITIC.10 directional correctness |
| 7.1 "I want X" lookup | synthesized across R1/R3/R6 | - |
| 7.2 Exit 1 vs 2 | R1.5.1, R3.anti-#1, R4.anti-#1 | converge |
| 7.3 Global vs project vs local | R7.3 | - |
| 7.4 Red flags | R3.anti-patterns, R4.9, R7.6 | - |
| 7.5 Exit 2 vs JSON | R4.6.1 | R1.5.2 |
| 7.6 When to stop | R5 budget guidance | - |

## Appendix B: Rejected Claims

Claims that appeared in source reports but were rejected by CRITIC or by this synthesis. Each is flagged here so a reader can independently verify before citing:

| # | Claim | Source | Why rejected | CRITIC reference |
|---|---|---|---|---|
| B1 | "Command hook default timeout is 60 s" | R4.6.1 | R1.4 says 600 s (10 min); unanimous R1/R5/R6 | CRITIC.8 row 1 |
| B2 | "Opus 4.6 has 200k context window" | R2.2.8 | R2.3 same report says 1M; 200k was Opus 4.5. Both 4.6 and 4.7 are 1M | CRITIC.2 |
| B3 | "`--settings <path>` CLI flag exists" | R7.1.3 | R1.13 explicitly lists this as undocumented/unsupported | CRITIC.13 |
| B4 | "`awayuSummaryEnabled` / `voiceEnabled` settings" | R7.3.1 | Not in R1 canonical settings list; appear to be typos or hallucinations | CRITIC.7 |
| B5 | "CVE-2025-59536" | R4.2 | Not findable in MITRE; likely fabricated identifier | CRITIC.4 |
| B6 | "CVE-2026-21852" | R4.2 | Not findable in MITRE; likely fabricated identifier | CRITIC.4 |
| B7 | "Haiku 4.5 prompt-cache read is 10x cheaper than input" | R2.2.7 | Pricing ratios elsewhere in R2 imply standard ~10% read discount, not 10x | CRITIC.10 |
| B8 | "Skill-description cap raised 250 -> 1536 chars" | R2.2.2 | Specific cap number not corroborated; directionally correct that a raise occurred | CRITIC.8 row "skill description cap" |
| B9 | "Beta header `output-300k-2026-03-24`" | R2.1.1 | Exact header string not verifiable; header concept is real | CRITIC.8 row "beta headers" |
| B10 | "Beta header `task-budgets-2026-03-13`" | R2.1.1 | Same - feature is real, exact string unverified | CRITIC.8 row "beta headers" |
| B11 | "Tool-use token overhead 346/313" | R2 implicit | Specific numbers not verifiable; overhead exists but magnitude uncertain | CRITIC.8 row "token overhead" |
| B12 | "`/tag` and `/vim` removed in v2.1.92" | R2 changelog | Exact version number uncorroborated; removals occurred but version uncertain | CRITIC.8 row "version attributions" |
| B13 | "Plan file naming scheme `fix-auth-race-snug-otter.md`" | R2.2.2 | Feature exists; exact naming template not corroborated | CRITIC.8 |
| B14 | "SWE-bench Pro 64.3%, Verified 87.6%, Terminal-Bench 69.4%" | R2.1.1 | Directionally +13% claim holds; exact decimals UNVERIFIED | CRITIC.8 |
| B15 | "Legacy `C:\ProgramData\ClaudeCode\` removed in v2.1.75" | R7 | Migration occurred; exact version UNVERIFIED | CRITIC.8 |
| B16 | "P11 cost kill-switch, P12 self-distilling CLAUDE.md as production patterns" | R6.11-6.12 | Surfaced as experimental/hypothetical; HTTP blocking schema for `UserPromptSubmit` is different from tool events | CRITIC flagged |
| B17 | "claudekit micro-benchmark exact p50/p95/p99 numbers" | R5.5.1 | Published, directionally correct; exact values hardware/version-dependent | CRITIC.8 |
| B18 | "ruvnet/ruflo #1530 exact 18-21 s latency" | R5.5.2 | Case study is real; exact numbers from screenshots | CRITIC.8 |

## Appendix C: Open Questions

Items the synthesis deliberately could not resolve. Each should be verified by the user against primary sources (Anthropic docs, release notes, or direct repro) before relying on in production:

1. **Exact version numbers for the v2.1.7x - v2.1.11x event introductions.** The table in 6.2 attributes `PreCompact` blockable to v2.1.105, `PermissionDenied.retry` to v2.1.90, etc. R2 cites specific point releases but CRITIC could not cross-verify against Anthropic's public changelog. Treat the directional ordering (these events landed in April 2026) as reliable; exact version per event as UNVERIFIED.

2. **CVE IDs for hook-related advisories.** B5/B6 above - are `CVE-2025-59536` / `CVE-2026-21852` real advisories? If yes, they should be in NVD / MITRE and cited. If no, R4's threat-model examples still stand on their own merits (command injection, prompt injection are generic vulnerability classes).

3. **Beta header exact strings** (`output-300k-2026-03-24`, `task-budgets-2026-03-13`). Features are real per R2; strings are plausible but not independently verified. Check `anthropic-beta` header list in current SDK docs.

4. **Haiku 4.5 prompt-cache read ratio.** R2 claimed "10x cheaper" - directionally the cache-read discount for Haiku on prompt-cache-read should be ~10% of input rate (i.e. $0.10/MTok against $1.00/MTok input), which IS roughly a 10x delta, so the synthesizer believes R2 may be correct but the phrasing confused CRITIC. Worth confirming against Anthropic's pricing page before quoting "80% cost reduction from caching."

5. **Tool-use token overhead exact values.** R2's 346/313 (auto/none vs any/tool) is plausible but unverified. Anthropic's token-counting docs give a formula; run `client.messages.count_tokens` for a ground-truth number in the user's actual workload before using this in cost budgets.

6. **SWE-bench / Terminal-Bench exact decimals.** The "+13% coding performance" claim is Anthropic's own marketing; exact decimals (64.3, 87.6, 69.4) should be in the 4.7 release blog post. CRITIC could not find an authoritative citation.

7. **Scoped MCP per subagent frontmatter schema.** R6.2.2 describes a `mcpServers:` YAML block in subagent frontmatter. The feature exists; the exact key shape (`mcpServers` vs `mcp.servers` vs `mcpScopes`) needs verification against current subagent docs.

8. **`allowedHttpHookUrls` wildcard semantics.** The synthesis recommends no wildcards at production scope. Whether Claude Code supports `https://hooks.corp.example/*` glob, or only exact-match, or full regex, is not explicit in R1; test before relying on it.

9. **`disableAllHooks` exception for managed hooks.** R7.2.7 states managed hooks still fire. Whether this is semantically identical to `allowManagedHooksOnly: true` (nuclear enterprise flag) or a softer exception needs empirical testing against a managed-settings install.

10. **`TaskOutput` tool removal exact date.** R2.4.2 says v2.1.83; search the actual Claude Code changelog. If users have hooks matching `PostToolUse: TaskOutput`, they need an accurate cutover version to schedule migration.

11. **Plan file naming scheme.** B13 - what IS the actual scheme for `fix-auth-race-snug-otter.md`-style auto-naming in v2.1.111? Worth knowing if hooks match plan-file paths.

12. **Exact `stop_hook_active` semantics.** R1 and R6 both reference this field for loop-prevention on `Stop` hooks. The boolean is documented; the exact set of events that clear/set it (does `PreCompact` clear it? does a nested `Stop` preserve it?) is not covered in the synthesis and matters for self-healing loop design.
