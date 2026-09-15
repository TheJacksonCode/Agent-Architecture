# R3 - Community Patterns from GitHub (Real-World Claude Code Hooks)

**Researcher:** R3
**Campaign:** Claude Code Hooks Best Practices 2026
**Date:** 2026-04-17
**Scope:** What hooks do people ACTUALLY use in the wild - flagship repos, awesome lists, community tooling, blog posts. NO Anthropic docs (that is R1). NO security theory (that is R4).

---

## Executive Summary

As of April 2026, Claude Code hooks have matured from experimental curiosities into a small but dense ecosystem. The single gravitational center is `disler/claude-code-hooks-mastery`, which defines the de-facto vocabulary (13 hooks, one Python file per event, `uv run` script execution, `$CLAUDE_PROJECT_DIR` prefix). Around it orbit six recognizable clusters: (1) TTS/notification toys, (2) security guardrails (block rm -rf, protect .env, deny force push), (3) quality gates (format on write, lint on edit, type-check), (4) observability/logging backplanes, (5) TDD enforcement, and (6) cross-agent communication buses.

The community language of choice is **Python via `uv run`** for heavy logic, **Bash one-liners piped through `jq`** for quick guardrails, **Node.js** for anything TypeScript-shaped, **PowerShell** for Windows toasts, and **Go** for cross-platform installable CLIs. Every mature implementation converges on the same contract: read JSON from stdin, decide, exit 0 (allow), exit 2 (block, stderr is fed back to Claude), any other code (warning). That single rule is the skeleton on which the entire ecosystem is built.

What is stable: `PostToolUse` formatters, `PreToolUse` destructive-command blockers, `Stop` notifications, `.env` file guards. What is experimental: `Stop` loops that call an LLM to verify task completion, HTTP hooks, the new async hook feature (January 2026), and hooks that inject context from remote services (LaunchDarkly, sprint context). Anti-patterns that showed up repeatedly are flagged throughout and summarized at the end for R4 to harden.

---

## Top 10 Pattern Categories in Public Repositories

Ranked by frequency of appearance across the ~40 repos and gists surveyed.

### 1. Auto-format on file write (`PostToolUse` + Write/Edit/MultiEdit)
The single most common hook. Runs prettier / black / ruff / gofmt after Claude writes a file so generated code matches project style. Representative examples: `bartolli/claude-code-typescript-hooks` (SHA256-cached ESLint + Prettier + tsc), Blake Crosley tutorial ("Hook 1: Auto-Format on File Edit"), paddo.dev guardrails post.

### 2. Block destructive bash commands (`PreToolUse` + Bash matcher)
Universal. Blocks `rm -rf /`, `rm -rf ~`, `git push --force origin main`, `git reset --hard`, `DROP TABLE`, and fork bombs. Representative: `disler/claude-code-hooks-mastery/.claude/hooks/pre_tool_use.py`, `CodyLunders/claude-code-hooks-library` ("Block rm -rf /"), Blake Crosley "Security Gate".

### 3. Protect sensitive files (`PreToolUse` + Read/Edit/Write matcher)
Block access to `.env`, `*.pem`, `*.key`, `terraform.tfstate`, `secrets/**`, `.ssh/**`. Representative: `file-guard` (Bande-a-Bonnot/Boucle-framework), `disler` .env logic, paddo.dev "Protect .env Files" YAML rule.

### 4. TTS / desktop notifications on Stop & Notification events
Stopped counting around repo #15. Every flavor exists: ElevenLabs premium, OpenAI TTS, gTTS free, pyttsx3 offline, macOS `say`, macOS `osascript`, Linux `notify-send`, Windows `BurntToast` (WSL or native), `ntfy.sh`, Slack webhook, Telegram bot. Representative: `ZeldOcarina/claude-code-voice-notifications`, `husniadil/cc-hooks`, `777genius/claude-notifications-go`, `claudes-world/cctoast-wsl`, `soulee-dev/claude-code-notify-powershell`, `etr/bells-and-whistles`, `ChanMeng666/claude-code-audio-hooks`.

### 5. Session context injection (`SessionStart` + `UserPromptSubmit`)
Auto-load git branch, git status, TODO.md, sprint context into Claude's context window on every session or every prompt. Representative: `launchdarkly-labs/claude-code-session-start-hook`, disler `session_start.py`, Anthropic's own blog example (`git status --short && cat TODO.md`).

### 6. Audit logging to JSONL / SQLite / remote server
Every tool call or lifecycle event appended to a log file or POSTed to a server. Representative: `disler/claude-code-hooks-multi-agent-observability` (Bun server + SQLite WAL + Vue + WebSocket), disler's local `logs/pre_tool_use.json`, `CodyLunders` Bash Command History hook, HCOM's SQLite message bus.

### 7. Auto-run tests after edit (`PostToolUse` on Write/Edit)
Run pytest / jest / cargo test matching the edited file. Representative: Blake Crosley "Hook 3: Test Runner After Changes", `nizos/tdd-guard` (blocks implementation without failing tests, Red-Green-Refactor enforcement).

### 8. Lint/type-check before commit (`PreToolUse` on `git commit`)
Intercept `git commit` bash calls, run `ruff check` / `tsc --noEmit` / `golangci-lint`, block with exit 2 if it fails. Representative: Blake Crosley "Hook 5: Quality Check Before Commit", `agnix` linter (`agent-sh/agnix`).

### 9. Prompt injection / secrets scanning (`UserPromptSubmit` + `PostToolUse`)
Scan user prompts and tool outputs for injection patterns, hardcoded credentials, bash exfiltration. Representative: `vaporif/parry` (fail-closed, DeBERTa v3 ML classifier + Aho-Corasick + tree-sitter AST).

### 10. Subagent / inter-agent communication bus (`SubagentStart`, `SubagentStop`, hooks as message carrier)
Hooks write/read a local SQLite or pipe so parallel subagents can chat mid-turn. Representative: `aannoo/claude-hook-comms` (HCOM), disler multi-agent observability.

---

## Full Example Deep-Dives

Seven detailed case studies with verbatim code where available. Copied from public repos and blog posts cited at the bottom.

### Deep-Dive 1 - `disler/claude-code-hooks-mastery` (the flagship)

**Repo:** https://github.com/disler/claude-code-hooks-mastery
**Status:** STABLE. This is the reference implementation. Every other project cites it.

**Hook inventory (13 files in `.claude/hooks/`):**

| Event | File | Purpose |
|---|---|---|
| UserPromptSubmit | `user_prompt_submit.py` | Validation, logging, context injection, security filtering |
| PreToolUse | `pre_tool_use.py` | Blocks dangerous commands before execution |
| PostToolUse | `post_tool_use.py` | Logs tool completion, transcript conversion |
| PostToolUseFailure | `post_tool_use_failure.py` | Captures structured error details |
| Notification | `notification.py` | Handles notifications with optional TTS |
| Stop | `stop.py` | AI-generated completion messages + audio feedback |
| SubagentStop | `subagent_stop.py` | Announces subagent completion |
| SubagentStart | `subagent_start.py` | Logs subagent spawning with optional TTS |
| PreCompact | `pre_compact.py` | Creates transcript backups before compaction |
| SessionStart | `session_start.py` | Loads dev context on session init |
| SessionEnd | `session_end.py` | Session cleanup and logging |
| PermissionRequest | `permission_request.py` | Permission auditing + auto-allow logic |
| Setup | `setup.py` | Repository initialization |

**settings.json pattern (verbatim):**

```json
"UserPromptSubmit": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "uv run $CLAUDE_PROJECT_DIR/.claude/hooks/user_prompt_submit.py --log-only"
      }
    ]
  }
]
```

**Full permissions block (verbatim summary):**

- Allow: `Bash(mkdir *)`, `Bash(uv *)`, `Bash(find *)`, `Bash(mv *)`, `Bash(grep *)`, `Bash(npm *)`, `Bash(ls *)`, `Bash(cp *)`, `Bash(chmod *)`, `Bash(touch *)`, plus blanket `Write` and `Edit`.
- Deny: empty.
- Status line: `uv run $CLAUDE_PROJECT_DIR/.claude/status_lines/status_line_v6.py`.

**`pre_tool_use.py` blocking logic (summarized from 139-line source):**

- Regex matches for `rm -rf`, `rm -fr`, `rm -Rf`, `--recursive --force` combos, and mixed `-r` + `-f` flags on `/`, `~`, `$HOME`, wildcards.
- Blocks any Read/Edit/Write/Bash op on `.env` but explicitly allows `.env.sample`.
- Reads JSON from stdin, extracts `tool_name` and `tool_input`, runs checks, exits 2 to block, logs every call to `logs/pre_tool_use.json`.

**`stop.py` TTS fallback chain (verbatim priority):**

1. ElevenLabs (`ELEVENLABS_API_KEY` present)
2. OpenAI TTS (`OPENAI_API_KEY` present)
3. pyttsx3 offline fallback

Custom completion messages generated via OpenAI / Anthropic / Ollama with 10-second subprocess timeout, fail silently. Hardcoded fallback list: `"Work complete!"`, `"All done!"`, `"Task finished!"`, `"Job complete!"`, `"Ready for next task!"` via `random.choice()`.

**Gotchas:**
- Uses UV single-file scripts with embedded PEP 723 dependency declarations - keeps hook logic isolated from main project Python deps. If you don't have `uv` installed, every hook silently fails.
- Commands use `$CLAUDE_PROJECT_DIR` prefix (critical for reliable path resolution across working directories). Without it, hooks break when Claude is invoked from a subdirectory.
- All matchers are empty strings `""`, meaning every matching tool call triggers. Expensive in tight loops.

**Why it matters:** This repo is the Rosetta Stone. If you read one thing, read this.

---

### Deep-Dive 2 - Blake Crosley's "5 Production Hooks"

**Source:** https://blakecrosley.com/blog/claude-code-hooks-tutorial
**Status:** STABLE. Canonical "starter pack" for most projects.

**Hook 1 - Auto-Format (verbatim):**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if [[ \"$FILE_PATH\" == *.py ]]; then black --quiet \"$FILE_PATH\" 2>/dev/null; elif [[ \"$FILE_PATH\" == *.js ]] || [[ \"$FILE_PATH\" == *.ts ]]; then npx prettier --write \"$FILE_PATH\" 2>/dev/null; fi'"
          }
        ]
      }
    ]
  }
}
```

**Hook 2 - Security Gate (verbatim):**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'INPUT=$(cat); CMD=$(echo \"$INPUT\" | jq -r \".tool_input.command\"); if echo \"$CMD\" | grep -qE \"rm\\s+-rf\\s+/|git\\s+push\\s+(-f|--force)\\s+(origin\\s+)?main|git\\s+reset\\s+--hard|DROP\\s+TABLE|:(){ :|:& };:\"; then echo \"BLOCKED: Dangerous command detected: $CMD\" >&2; exit 2; fi'"
          }
        ]
      }
    ]
  }
}
```

Note the fork-bomb regex `:(){ :|:& };:` - rarely seen but cheap to include.

**Hook 3 - Test Runner After Changes (verbatim):**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if [[ \"$FILE_PATH\" == *.py ]] && [[ \"$FILE_PATH\" != *test_* ]]; then TEST_FILE=\"tests/test_$(basename \"$FILE_PATH\")\"; if [[ -f \"$TEST_FILE\" ]]; then python -m pytest \"$TEST_FILE\" -x --tb=short 2>&1 | tail -20; fi; fi'"
          }
        ]
      }
    ]
  }
}
```

**Hook 4 - Stop notification, macOS (verbatim):**

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code session ended\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

Slack alternative (verbatim):

```bash
curl -s -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-type: application/json' \
  -d '{"text": "Claude Code session ended"}'
```

**Hook 5 - Lint Before Commit (verbatim):**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'INPUT=$(cat); CMD=$(echo \"$INPUT\" | jq -r \".tool_input.command\"); if echo \"$CMD\" | grep -qE \"^git\\s+commit\"; then if ! LINT_OUTPUT=$(ruff check . --select E,F,W 2>&1); then echo \"LINT FAILED -- fix before committing:\" >&2; echo \"$LINT_OUTPUT\" >&2; exit 2; fi; fi'"
          }
        ]
      }
    ]
  }
}
```

**Gotcha called out explicitly in the article:** *"Exit 2 blocks the action. Exit 1 only warns. Security gates must use exit code 2."* This is repeated across every community resource - getting the exit code wrong is the #1 implementation mistake.

---

### Deep-Dive 3 - `bartolli/claude-code-typescript-hooks` (TypeScript quality gate)

**Repo:** https://github.com/bartolli/claude-code-typescript-hooks
**Status:** STABLE. Node/TS shops.

**settings.json (verbatim):**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "node $CLAUDE_PROJECT_DIR/.claude/hooks/react-app/quality-check.js"
          }
        ]
      }
    ]
  }
}
```

**Hook config (`hook-config.json`, verbatim):**

```json
{
  "typescript": { "enabled": true, "showDependencyErrors": false, "jsx": "react" },
  "eslint":     { "enabled": true, "autofix": true },
  "prettier":   { "enabled": true, "autofix": true },
  "rules": {
    "console": {
      "severity": "warning",
      "allowIn": { "paths": ["src/components/"], "fileTypes": ["component", "test"] }
    }
  }
}
```

**Key quality-check.js script pattern (verbatim, trimmed):**

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

class QualityChecker {
  constructor() {
    this.projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    this.hookDir = path.join(this.projectDir, '.claude/hooks/react-app');
    this.configPath = path.join(this.hookDir, 'hook-config.json');
    this.cacheFile = path.join(this.hookDir, 'tsconfig-cache.json');
    this.debug = process.env.CLAUDE_HOOKS_DEBUG === 'true';
    this.config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
    this.errors = [];
  }
  parseToolInput() {
    return new Promise((resolve) => {
      let input = '';
      process.stdin.on('data', (chunk) => { input += chunk; });
      process.stdin.on('end', () => {
        try { resolve(JSON.parse(input).tool_input?.file_path || ''); }
        catch (e) { resolve(''); }
      });
    });
  }
  async runTypeScriptCheck(filePath) {
    try {
      execSync(`npx tsc --noEmit "${filePath}"`, { cwd: this.projectDir, stdio: 'pipe' });
    } catch (e) { this.errors.push(e.message); }
  }
  async runESLintCheck(filePath) {
    try {
      const cmd = this.config.eslint.autofix
        ? `npx eslint "${filePath}" --fix`
        : `npx eslint "${filePath}"`;
      execSync(cmd, { cwd: this.projectDir, stdio: 'pipe' });
    } catch (e) { this.errors.push(e.message); }
  }
  async run() {
    const filePath = await this.parseToolInput();
    if (!filePath) process.exit(0);
    await this.runTypeScriptCheck(filePath);
    await this.runESLintCheck(filePath);
    if (this.errors.length > 0) {
      this.errors.forEach(err => console.error(`  - ${err}`));
      process.exit(2);
    }
    process.exit(0);
  }
}
new QualityChecker().run().catch(e => process.exit(2));
```

**Clever detail:** SHA256-caches `tsconfig.json` content so repeat runs resolve to sub-5ms. Important when Claude is editing 20 files in a row.

**Gotcha:** `npx tsc --noEmit "$FILE"` only type-checks the single file without the full project graph. For cross-file type errors you need `tsc --noEmit` without the file arg, which is 10-100x slower. The repo accepts the tradeoff.

---

### Deep-Dive 4 - `disler/claude-code-hooks-multi-agent-observability` (telemetry backplane)

**Repo:** https://github.com/disler/claude-code-hooks-multi-agent-observability
**Status:** EXPERIMENTAL-ish. Architecture is solid, API surface may still churn.

**Architecture:** Claude agents -> hook scripts -> HTTP POST -> Bun server -> SQLite WAL -> WebSocket -> Vue client dashboard. 12 event types tracked simultaneously.

**settings.json chains two hooks per event (verbatim):**

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "",
      "hooks": [
        { "type": "command", "command": "uv run .claude/hooks/pre_tool_use.py" },
        { "type": "command", "command": "uv run .claude/hooks/send_event.py --source-app YOUR_PROJECT_NAME --event-type PreToolUse --summarize" }
      ]
    }],
    "PostToolUse": [{
      "matcher": "",
      "hooks": [
        { "type": "command", "command": "uv run .claude/hooks/post_tool_use.py" },
        { "type": "command", "command": "uv run .claude/hooks/send_event.py --source-app YOUR_PROJECT_NAME --event-type PostToolUse --summarize" }
      ]
    }]
  }
}
```

**Pattern:** Chain validator hook first, then telemetry send. If validator exits 2, telemetry doesn't fire. Smart.

**Tracked events:** PreToolUse, PostToolUse, PostToolUseFailure, PermissionRequest, Notification, Stop, SubagentStart, SubagentStop, PreCompact, UserPromptSubmit, SessionStart, SessionEnd - all 12.

**send_event.py responsibilities:**
- `--add-chat` flag includes full conversation history
- Forwards `tool_name`, `tool_use_id`, `agent_id`, `notification_type` as top-level queryable fields
- Validates server connectivity before sending (otherwise retries silently)
- JSON payload with session ID, timestamp, event metadata

**Gotcha:** If the Bun server is down, every single tool call waits on the HTTP timeout before Claude continues. Set a conservative `timeout` on the hook or use async hooks (Jan 2026 feature).

---

### Deep-Dive 5 - `vaporif/parry` (prompt injection + secrets scanner)

**Repo:** https://github.com/vaporif/parry
**Status:** EXPERIMENTAL. Early-stage but production-minded. Fail-closed design is the gold standard.

**Hook config (verbatim):**

```json
{
  "hooks": {
    "PreToolUse":        [{ "command": "parry-guard hook", "timeout": 1000 }],
    "PostToolUse":       [{ "command": "parry-guard hook", "timeout": 5000 }],
    "UserPromptSubmit":  [{ "command": "parry-guard hook", "timeout": 2000 }]
  }
}
```

**Six detection layers:**

1. Unicode analysis - invisible chars, homoglyphs, RTL overrides
2. Substring matching - Aho-Corasick for known injection phrases
3. Secrets detection - 40+ patterns (AWS, GitHub PATs, DB URIs, private keys)
4. ML classification - DeBERTa v3 transformer, configurable threshold
5. Bash exfiltration - tree-sitter AST detecting network sinks, command substitution, base64/hex encoding, DNS tunneling, 60+ sensitive paths
6. Script exfiltration - source-to-sink analysis across 16 languages

**Modes:** `fast` (DeBERTa v3 only, ~50-70ms/chunk) vs `full` (~1.5s/chunk).

**Why it is the reference:** Fail-closed on uncertain inputs, hooks itself into all three entry points (prompts, tool inputs, tool outputs), doesn't rely on a single regex family. Expensive to run but hard to bypass. Perfect input for R4.

---

### Deep-Dive 6 - `nizos/tdd-guard` (TDD enforcement)

**Repo:** https://github.com/nizos/tdd-guard
**Status:** STABLE. Node.js 22+ hard requirement.

**What it blocks:**
1. **Test-First Enforcement** - blocks implementation without failing tests
2. **Minimal Implementation** - prevents code exceeding current test requirements
3. **Lint Integration** - enforces refactoring phase via linting rules

**Framework support:** Vitest, Jest, Storybook (JS); pytest (Py); PHPUnit (PHP); native Go, Rust, RSpec/Minitest (Ruby).

**Configuration approach:** Plugin installed via `/plugin install`, setup via `/tdd-guard:setup` slash command, not a raw settings.json.

**Gotcha:** Runs with user permissions. Spawns test runner on every edit - slow feedback on large suites. Has a "toggle mid-session" feature implying non-trivial state management.

---

### Deep-Dive 7 - Windows / WSL toast notifications (`cctoast-wsl` + `latenssi` gist)

**Repo:** https://github.com/claudes-world/cctoast-wsl + https://gist.github.com/latenssi/e3a54bbdd84f6d595908c10931ac9b9f
**Status:** STABLE.

**Full working `~/bin/toast` script (verbatim from latenssi gist):**

```bash
#!/bin/bash
# WSL -> Windows toast notification using BurntToast
HOOK_MODE=false
if [[ "$1" == "--hook" ]]; then
    HOOK_MODE=true
    shift
fi
TITLE="${1:-Claude Code}"
MESSAGE="${2:-}"

if $HOOK_MODE; then
    INPUT=$(cat)
    CWD=$(echo "$INPUT" | jq -r '.cwd // empty')
    HOOK_MSG=$(echo "$INPUT" | jq -r '.message // empty')
    NTYPE=$(echo "$INPUT" | jq -r '.notification_type // empty')
    TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
    EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // empty')

    if [[ -n "$CWD" ]]; then
        CWD="${CWD/#$HOME/~}"
    fi

    PARTS=()
    if [[ -n "$HOOK_MSG" ]]; then
        PARTS+=("$HOOK_MSG")
    elif [[ "$EVENT" == "Stop" ]]; then
        PARTS+=("Task complete")
    fi
    if [[ -n "$TOOL" ]]; then
        PARTS+=("Tool: $TOOL")
    fi
    if [[ -n "$CWD" ]]; then
        PARTS+=("[$CWD]")
    fi
    MESSAGE=$(IFS=$'\n'; echo "${PARTS[*]}")
fi

TITLE="${TITLE//\'/\'\'}"
MESSAGE="${MESSAGE//\'/\'\'}"

powershell.exe -NoProfile -Command "
Import-Module BurntToast -ErrorAction SilentlyContinue
New-BurntToastNotification -Text '$TITLE', '$MESSAGE' -Sound 'Default'
" >/dev/null 2>&1 &
```

**settings.json (verbatim):**

```json
{
  "hooks": {
    "Notification": [
      { "hooks": [{ "type": "command", "command": "/home/YOUR_USERNAME/bin/toast --hook \"Claude Code\"" }] }
    ],
    "Stop": [
      { "hooks": [{ "type": "command", "command": "/home/YOUR_USERNAME/bin/toast --hook \"Claude Code\"" }] }
    ]
  }
}
```

**PowerShell-native alternative (`soulee-dev/claude-code-notify-powershell`) command string:**

```
cmd /c chcp 65001 >nul && powershell -ExecutionPolicy Bypass -File %USERPROFILE%\.claude\claude-hook-toast.ps1
```

`chcp 65001` forces UTF-8 before PowerShell runs - without it, non-ASCII Claude output scrambles the toast.

**Gotchas:**
- BurntToast install requires `Install-Module BurntToast -Scope CurrentUser -Force` one-time.
- Single-quote escaping from Bash into PowerShell is fragile. If Claude outputs a `'` in the message, toast can break.
- `powershell.exe` invocation from WSL has ~200-500ms cold-start. latenssi backgrounds it with `&` to avoid blocking.
- `-ExecutionPolicy Bypass` is effectively "run anything" - prompt injection target.

---

## Patterns by Event (What Community Puts on Each Lifecycle Hook)

### `UserPromptSubmit`
- Log every prompt to file (disler, `--log-only`).
- Store "last prompt" for replay/debug (disler, `--store-last-prompt`).
- Auto-assign subagent names (disler, `--name-agent`).
- Inject sprint context / current ticket (Anthropic blog: `cat ./current-sprint-context.md`).
- Prompt injection scan (parry, fail-closed).
- **Gotcha:** UserPromptSubmit does not support matchers (silently ignored).

### `PreToolUse`
- Block dangerous bash (rm -rf, git push -f, DROP TABLE, fork bombs).
- Block file ops on `.env`, `*.pem`, `secrets/**`.
- Block directory-escape (`../`, `cd /`).
- Enforce conventional commit format.
- Permission auto-allow on known-safe commands (`Dippy` AST-based).
- TDD: block edits that precede failing tests.

### `PostToolUse`
- Auto-format (prettier, black, ruff, gofmt).
- Auto-lint + autofix (ESLint, ruff --fix).
- Type-check (tsc --noEmit, mypy).
- Auto-stage new files (`git add`) - from CodyLunders library.
- Auto-run matching test file (pytest, vitest).
- Send telemetry (disler observability).
- Log every tool call to JSONL.
- Audio feedback ("tek.mp3" per tool).

### `PostToolUseFailure`
- Capture structured error details (disler).
- Retry with different strategy (rare, experimental).

### `Notification`
- Desktop toast / balloon / TTS announcement.
- Slack / Telegram / ntfy webhook.
- Click-to-focus terminal (`777genius/claude-notifications-go`).

### `Stop`
- "Task complete" announcement (osascript, BurntToast, ElevenLabs).
- LLM-generated summary message (disler: OpenAI/Anthropic/Ollama).
- Desktop notification on long-running session ends.
- Webhook to Slack/Telegram.
- **Experimental:** `"type": "prompt"` hook that asks Claude to review whether task is actually complete; responds "continue" to loop.

### `SubagentStart` / `SubagentStop`
- Announce agent spawn/finish (TTS).
- Write to HCOM SQLite bus for cross-agent messaging.
- Track agent IDs for observability swim lanes.

### `PreCompact`
- Save full transcript backup before compaction (disler).
- Useful when compaction destroys important context.

### `SessionStart`
- Inject `git branch --show-current` + `git status --short`.
- Inject recent commits, TODO.md, sprint context.
- Load environment variables.
- LaunchDarkly feature flag-driven context (`launchdarkly-labs/claude-code-session-start-hook`).
- **Anthropic canonical recommendation:** Use CLAUDE.md for static context, SessionStart hook only for dynamic.

### `SessionEnd`
- Flush logs, close DB connections.
- Final telemetry heartbeat.
- Minimal in the wild.

### `PermissionRequest`
- Audit log every permission request.
- Auto-allow known-safe patterns (disler + Dippy).
- AST-based safety classification (Dippy).

---

## Community Frameworks & Tooling

### SDKs for building hooks

| Name | Language | Repo | Status |
|---|---|---|---|
| `cchooks` | Python | `GowayLee/cchooks` | Stable-ish. Clean API. |
| `claude-hooks` | TypeScript | `johnlindquist/claude-hooks` | Stable. Powerful DSL. |
| `claude-code-hooks-sdk` | PHP | `beyondcode/claude-hooks-sdk` | Laravel-flavored fluent API. |
| HCOM | Python | `aannoo/claude-hook-comms` | Experimental. Inter-agent SQLite bus. |

### Installable CLI notifiers

| Name | Platforms | Repo |
|---|---|---|
| CC Notify | macOS primarily | `dazuiba/CCNotify` |
| Claudio | Cross-platform, OS sounds | `ctoth/claudio` |
| bells-and-whistles | Cross-platform | `etr/bells-and-whistles` |
| claude-notifications-go | mac/Linux/Win, Go, 6 types, webhooks | `777genius/claude-notifications-go` |
| claudevoice-macos | macOS via edge-tts | `emaspa/claudevoice-macos` |
| cc-hooks | Multi-provider TTS + language | `husniadil/cc-hooks` |
| cctoast-wsl | WSL -> Windows | `claudes-world/cctoast-wsl` |
| soulee-dev notify | Windows native PowerShell | `soulee-dev/claude-code-notify-powershell` |

### Specialized safety / quality

| Name | Purpose | Repo |
|---|---|---|
| `parry` | Prompt injection + secrets scanner | `vaporif/parry` |
| `tdd-guard` | TDD enforcement | `nizos/tdd-guard` |
| `Dippy` | AST-based auto-approval | `ldayton/Dippy` |
| TypeScript Quality Hooks | tsc + ESLint + Prettier SHA256 cache | `bartolli/claude-code-typescript-hooks` |
| `cc-tools` | Go-based linter + statusline | `Veraticus/cc-tools` |
| `agnix` | Linter for CLAUDE.md, hooks, MCP | `agent-sh/agnix` |
| `file-guard` | Protect sensitive file patterns | Bande-a-Bonnot/Boucle-framework |
| `claude-code-hooks-library` | 55+ plug-and-play hooks | `CodyLunders/claude-code-hooks-library` |

### Observability

| Name | Purpose |
|---|---|
| `disler/claude-code-hooks-multi-agent-observability` | Bun + SQLite + Vue dashboard |
| `/create-hook` slash command | Intelligent hook generator (`omril321/automated-notebooklm`) |

### Fun / niche

| Name | Purpose | Repo |
|---|---|---|
| Britfix | American -> British English | `Talieisin/britfix` |
| claudelog | Community blog for patterns | claudelog.com |

---

## Language / Runtime Breakdown

Distribution across ~40 surveyed repos and blog examples:

| Language | Share (approx) | When used | Why |
|---|---|---|---|
| **Python via `uv run`** | ~45% | Heavy logic, multi-provider TTS, ML classifiers, structured logging | PEP 723 inline deps + `uv`'s instant script execution - no venv juggling. disler's choice, ripples everywhere. |
| **Bash one-liners + `jq`** | ~30% | Simple regex blockers, format dispatchers, webhook curl | Dependency-free on macOS/Linux. Fastest to write. Blake Crosley tutorial is almost entirely Bash. |
| **Node.js / TypeScript** | ~15% | TS/JS-heavy codebases, ESLint/Prettier/tsc integration | Already installed where needed. `bartolli/claude-code-typescript-hooks`, `johnlindquist/claude-hooks`. |
| **PowerShell** | ~5% | Windows toast notifications | Only native path to BurntToast and toast XML. `soulee-dev`, `cctoast-wsl`. |
| **Go** | ~3% | Cross-platform installable CLIs | Single static binary, no runtime deps. `Veraticus/cc-tools`, `777genius/claude-notifications-go`. |
| **Rust** | ~1% | Performance-critical scanners | `vaporif/parry` uses tree-sitter + DeBERTa v3 - Rust is the only language where that is fast enough. |
| **PHP** | ~1% | Laravel shops | `beyondcode/claude-code-hooks-sdk` - niche but clean DSL. |

**Why the distribution:** Python dominates because (a) `uv` made single-file scripts trivial, (b) the flagship repo is Python so everything else copies it, (c) most Claude users are polyglots and Python is the common denominator. Bash wins for quick wins because exit codes and stdin JSON parsing via `jq` are exactly what the hook contract wants. PowerShell is stuck holding the Windows bag because Windows toast notifications require Windows Runtime calls that only PowerShell exposes cleanly.

---

## Stable vs Experimental - Community Reality Check

### STABLE (safe to adopt in April 2026)
- PostToolUse formatters (prettier, black, ruff)
- PreToolUse bash regex blockers (rm -rf, git push -f, DROP TABLE)
- PreToolUse `.env` / secrets file guards
- Stop event desktop notifications (osascript, notify-send, BurntToast)
- SessionStart `git status` / branch injection
- JSONL audit logging to local file
- disler's reference 13-hook layout

### MATURING (used widely but still iterating)
- ElevenLabs TTS (API itself stable, but API key management in hooks is a pain point)
- TypeScript quality hooks with SHA256 caching (bartolli approach)
- HCOM inter-agent SQLite bus
- `parry` prompt injection scanner
- `tdd-guard` enforcement
- Multi-agent observability (disler)
- Click-to-focus terminal notifications (777genius)

### EXPERIMENTAL (adopt carefully)
- `"type": "prompt"` Stop hooks that loop Claude into self-review
- HTTP hooks (async hooks landed January 2026 per eesel blog)
- LLM-generated completion messages (disler's OpenAI/Anthropic/Ollama fallback)
- LaunchDarkly-driven SessionStart context injection
- Cross-language auto-test-matcher (PostToolUse finding the matching test file heuristically)

---

## Anti-Patterns (Flag for R4 Security)

1. **Exit code confusion.** Every blog post warns about it, and every implementer still trips. Exit 1 does NOT block; only exit 2 blocks. Bash `set -e` with `exit $?` silently swallows errors into non-blocking warnings.

2. **Regex-only bash blockers.** `grep -qE "rm\s+-rf"` is trivially bypassed: `rm  -rf` with double space, `\rm -rf`, `eval "rm -rf /"`, `bash -c "rm -rf /"`, `sh < script_that_does_rm`, or `rm -r -f`. Serious implementers (parry) use AST analysis; most don't.

3. **`.env` protection via `.env` substring match.** Misses `.envrc`, `src/.env`, Claude reading via a symlink, Claude cat-ing then writing elsewhere. file-guard uses glob patterns, which is better but still bypassable.

4. **Hook-side secrets.** Multiple notifier hooks hardcode `ELEVENLABS_API_KEY` or Slack webhooks in settings.json. settings.json gets committed. Secret leak.

5. **PowerShell `-ExecutionPolicy Bypass`.** Everyone uses it. It is effectively "run arbitrary code from anywhere the settings.json chain leads." Prompt injection attack target.

6. **Single-quote escaping across Bash -> PowerShell.** latenssi gist's `MESSAGE="${MESSAGE//\'/\'\'}"` - if Claude outputs `'; rm -rf ~; '` the escape doesn't cover it. Injection through notification.

7. **Synchronous HTTP hooks block Claude.** disler observability's send_event.py will stall every tool call if the Bun server is down and no timeout is set.

8. **`$CLAUDE_PROJECT_DIR` not prefixed.** Hook works when running Claude from project root, silently fails from subdir. Anthropic explicitly recommends the prefix.

9. **Hooks that read full transcript then POST it.** disler observability + HCOM both transmit conversation contents to local services. If that service is compromised (or just runs on a shared machine), the attacker gets everything Claude has said, including pasted secrets.

10. **No timeout field.** Default timeout is generous. A misbehaving hook can freeze Claude. parry explicitly sets 1000/2000/5000ms per event - most examples do not.

11. **TDD-guard-style "block until tests exist" loops.** If the hook is buggy, Claude can't make any progress. There is no easy escape for the user mid-session except killing the process.

12. **`uv run` dependency assumption.** disler layout assumes `uv` is installed. If not, every hook silently fails. Permission violations pass through unchecked.

13. **`allow-all` permission configs.** disler's `settings.json` allows blanket `Write` and `Edit` - fine for research but catastrophic in production. Copy-paste victims won't notice.

14. **Hook chains without short-circuit semantics defined.** When you chain two hooks on the same event (disler observability does), and the first exits 2, the second's behavior depends on the harness version. Document assumes short-circuit; not all versions honor it.

15. **Windows `chcp 65001` race.** `cmd /c chcp 65001 >nul && powershell -File ...` - if chcp fails on some locales, the PowerShell script runs with the wrong codepage and notifications mojibake.

---

## Sources Cited

Primary flagship and canonical references:

- https://github.com/disler/claude-code-hooks-mastery (flagship, 13 hooks, Python/uv)
- https://github.com/disler/claude-code-hooks-mastery/blob/main/.claude/settings.json
- https://github.com/disler/claude-code-hooks-mastery/blob/main/.claude/hooks/pre_tool_use.py
- https://github.com/disler/claude-code-hooks-mastery/blob/main/.claude/hooks/stop.py
- https://github.com/hesreallyhim/awesome-claude-code (curated ecosystem index)
- https://github.com/disler/claude-code-hooks-multi-agent-observability (telemetry backplane)

Quality / security / TDD:

- https://github.com/bartolli/claude-code-typescript-hooks (TS quality hooks with SHA256 cache)
- https://github.com/nizos/tdd-guard (TDD enforcement)
- https://github.com/vaporif/parry (prompt injection scanner, DeBERTa v3)
- https://github.com/ldayton/Dippy (AST auto-approval)
- https://github.com/CodyLunders/claude-code-hooks-library (55+ hooks library)
- https://github.com/agent-sh/agnix (lint CLAUDE.md and hooks)
- https://github.com/Veraticus/cc-tools (Go linter + statusline)
- https://github.com/pchalasani/claude-code-tools (safety hooks)

Notifications / TTS:

- https://github.com/ZeldOcarina/claude-code-voice-notifications (ElevenLabs TTS)
- https://github.com/husniadil/cc-hooks (multi-provider audio)
- https://github.com/etr/bells-and-whistles (notifications + voice)
- https://github.com/ChanMeng666/claude-code-audio-hooks (audio alerts)
- https://github.com/emaspa/claudevoice-macos (macOS edge-tts)
- https://github.com/LAURA-agent/Claude-to-Speech (ElevenLabs TTS plugin)
- https://github.com/777genius/claude-notifications-go (Go cross-platform, 6 notification types)
- https://github.com/dazuiba/CCNotify (macOS desktop notifications)
- https://github.com/ctoth/claudio (OS-native sounds)
- https://github.com/claudes-world/cctoast-wsl (WSL -> Windows toast)
- https://github.com/soulee-dev/claude-code-notify-powershell (native Windows PowerShell toast)
- https://github.com/kmio11/cc-notification (notification hook scripts)
- https://gist.github.com/latenssi/e3a54bbdd84f6d595908c10931ac9b9f (WSL2 toast gist)

SDKs / frameworks:

- https://github.com/GowayLee/cchooks (Python SDK)
- https://github.com/johnlindquist/claude-hooks (TypeScript DSL)
- https://github.com/beyondcode/claude-hooks-sdk (PHP/Laravel)
- https://github.com/aannoo/claude-hook-comms (HCOM inter-agent bus)

Session context injection:

- https://github.com/launchdarkly-labs/claude-code-session-start-hook (LaunchDarkly feature-flag driven)

Blog posts and guides (April 2026):

- https://blakecrosley.com/blog/claude-code-hooks-tutorial (5 production hooks)
- https://paddo.dev/blog/claude-code-hooks-guardrails/ (guardrails cookbook)
- https://dev.to/boucle2026/how-to-protect-your-env-from-claude-code-28f8 (file-guard)
- https://claude.com/blog/how-to-configure-hooks (Anthropic power-user guide)
- https://smartscope.blog/en/generative-ai/claude/claude-code-hooks-guide/ (complete guide, March 2026 edition)
- https://www.eesel.ai/blog/hooks-in-claude-code (practical guide, 2026)
- https://medium.com/@negi.gaurav2/hooks-in-claude-code-718cb145214a (safety net, March 2026)
- https://medium.com/becoming-for-better/taming-claude-code-a-guide-to-claude-md-and-hooks-ed059879991c (March 2026)
- https://claudefa.st/blog/tools/hooks/hooks-guide (12 lifecycle events guide)
- https://claudefa.st/blog/tools/hooks/session-lifecycle-hooks (SessionStart deep-dive)
- https://serenitiesai.com/articles/claude-code-hooks-guide-2026
- https://techsy.io/en/blog/claude-code-hooks-guide
- https://pasqualepillitteri.it/en/news/657/claude-code-hooks-complete-guide
- https://www.gend.co/blog/configure-claude-code-hooks-automation
- https://alexop.dev/posts/claude-code-notification-hooks/ (notification setup)
- https://www.scalebloom.com/blog/claude-code-notification-sounds/ (notification sounds Win/Mac)
- https://pydevtools.com/handbook/how-to/how-to-write-claude-code-hooks-for-python-projects/
- https://www.aitmpl.com/hooks/ (39+ hook templates index)
- https://codesignal.com/learn/courses/automating-workflows-with-hooks/lessons/smart-context-injection
- https://patrickmccanna.net/a-better-way-to-limit-claude-code-and-other-coding-agents-access-to-secrets/ (secrets access)

Community issues and bug reports (useful context):

- https://github.com/anthropics/claude-code/issues/4160 (.claudeignore request)
- https://github.com/anthropics/claude-code/issues/25872 (SessionStart as --append-system-prompt alternative)
- https://github.com/anthropics/claude-code/issues/10373 (SessionStart reliability)
- https://github.com/anthropics/claude-code/issues/6305 (Post/PreToolUse not executing)

---

## Report Metadata

- Word count: ~3,100 (target was 2,500+).
- Code snippets: 20+ verbatim from public sources.
- Repos surveyed: ~40 across GitHub, gists, and npm.
- Blog posts synthesized: ~15, all from 2026.
- Anti-patterns flagged for R4: 15.
- Reference date: 2026-04-17.
