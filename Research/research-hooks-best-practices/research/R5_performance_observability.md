# R5 - Performance and Observability for Claude Code Hooks

**Campaign:** Claude Code Hooks Best Practices 2026
**Researcher:** R5 (Performance + Observability focus)
**Date:** 2026-04-17
**Primary sources:** code.claude.com/docs (hooks, troubleshooting, cli-reference, env-vars, monitoring-usage, statusline), community benchmarks (claudekit), GitHub issue #1530 (ruvnet/ruflo)

Legend: `[DOC]` = documented by Anthropic, `[COMM]` = community best practice, `[OBS]` = observed in the wild.

---

## 1. Executive summary

Hooks in Claude Code are the deterministic control plane around a non-deterministic agent. That control is free only as long as the hook is fast. Every PreToolUse and every PostToolUse hook sits directly on the critical path of a tool call: the user sees the wall-clock cost. Every SessionStart, UserPromptSubmit, PreCompact or SubagentStart hook pads the session bootstrap.

Three numbers matter the most:

- **Default hook timeout is 10 minutes** (600 seconds) for `type: command` - Claude will happily block a tool call for 10 minutes waiting for your hook before timing it out `[DOC]`.
- **Community thresholds land around 200 ms per hook for green, under 2000 ms for PostToolUse, and >5000 ms is a red flag** `[COMM]`.
- **Prompt hooks default to 30 s, agent hooks default to 60 s, HTTP hooks default to 30 s** `[DOC]`.

A single misconfigured hook can turn a 4.8 s prompt into an 18-21 s prompt. That is not hypothetical: it was reported in the ruvnet/ruflo issue #1530 where 11 hooks spawning a Node.js process each inflated every interaction by ~15 seconds `[OBS]`. In other words, hooks are the number one self-inflicted latency source in Claude Code today.

This report assumes the agent orchestration context of the Agent_Architecture project (v32.16, 35 agents, 42 presets) where subagent spawns already amortise a fixed LLM cost per call. Adding hooks on top multiplies that cost unless you design for it.

---

## 2. Latency Profile

All numbers below combine `[DOC]` documented defaults and `[COMM]` community baselines. "Typical user-observed latency" is the median extra wall-clock cost the user perceives for a naively implemented hook on a modern laptop (M-series Mac or Zen4, 16+ GB RAM, SSD).

| Event                  | Frequency                      | Default timeout | Typical naive overhead | Budget (green) | Impact                                                  |
| ---------------------- | ------------------------------ | --------------- | ---------------------- | -------------- | ------------------------------------------------------- |
| `SessionStart`         | 1 per session                  | 10 min `[DOC]`  | 50-500 ms              | <1000 ms       | Cold-start tax, felt by user on `claude` launch         |
| `UserPromptSubmit`     | Every prompt                   | 10 min `[DOC]`  | 20-300 ms              | <200 ms        | User waits between Enter and first token                |
| `PreToolUse`           | Every tool call                | 10 min `[DOC]`  | 30-500 ms              | <200 ms        | Multiplied by tool-call count per turn (often 5-30)     |
| `PostToolUse`          | Every successful tool call     | 10 min `[DOC]`  | 100-2000 ms            | <500 ms        | Most common perf killer; formatters, linters here       |
| `PostToolUseFailure`   | Every failed tool call         | 10 min `[DOC]`  | ~same                  | <500 ms        | Low frequency; debugging code OK                        |
| `PermissionRequest`    | On permission prompt only      | 10 min `[DOC]`  | 20-100 ms              | <100 ms        | Blocks the dialog rendering                             |
| `Stop`                 | Turn end                       | 10 min `[DOC]`  | 50-1000 ms             | <1000 ms       | User sees spinner after final token                     |
| `SubagentStart/Stop`   | Per subagent spawn             | 10 min `[DOC]`  | 50-500 ms              | <500 ms        | Fan-out amplifies cost (42 presets spawn up to 30)      |
| `PreCompact/PostCompact` | On compaction                | 10 min `[DOC]`  | n/a                    | <2000 ms       | Rare; user is already waiting for compaction            |
| `SessionEnd`           | 1 per session                  | 1.5 s `[DOC]`   | n/a                    | <1.5 s         | Hard budget; extend via `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` up to 60 s |
| `Notification`         | On Claude awaiting input       | 10 min `[DOC]`  | 10-200 ms              | <200 ms        | Fire-and-forget candidate (use `async: true`)           |
| `InstructionsLoaded`   | Session start + lazy load      | 10 min `[DOC]`  | 20-200 ms              | <200 ms        | Runs multiple times if rules are lazy-loaded            |
| `ConfigChange`         | File watcher fires             | 10 min `[DOC]`  | 10-100 ms              | <100 ms        | Should be trivially fast; audit log only                |
| `CwdChanged`/`FileChanged` | On cd/file change          | 10 min `[DOC]`  | 50-500 ms              | <200 ms        | Direnv reload pattern sits here                         |

`prompt`-type hooks default to 30 s, `agent`-type default to 60 s, `http`-type default to 30 s `[DOC]`.

### Community benchmark (claudekit profiling)

From the claudekit `hook-profiling.md` guide `[COMM]`:

| Tier      | Duration       | UserPromptSubmit output (chars) |
| --------- | -------------- | ------------------------------- |
| Good      | <2000 ms       | <9000                           |
| Warning   | 2000-5000 ms   | 9000-10000                      |
| Critical  | >5000 ms       | >10000 (truncated)              |

Real measurements they report:

- file-guard: **80 ms** / 228 chars - ideal
- typecheck-changed: **2661 ms** / 65 chars - warning
- codebase-map: **1500 ms** / 8763 chars - borderline
- test-project: **14109 ms** / 23956 chars - critical and truncated `[COMM]`

### The ruvnet/ruflo incident `[OBS]`

GitHub issue #1530 (April 2026): a project template registered 11 hooks across 9 lifecycle events, each spawning `node "$CLAUDE_PROJECT_DIR/.claude/helpers/hook-handler.cjs"`. Claude Code CLI went from 4.8 s/prompt outside the project to 18-21 s/prompt inside. The amplifier was **Node process startup** (~80-120 ms each, cold) multiplied by 11 hooks, fired across events that compound per tool call. One hooked event per tool call with a 120 ms Node spawn yields ~1.2 s per tool call; at 10 tool calls per turn that is 12 s of pure hook overhead on top of the model.

**Take-away:** the number one performance lever is **do not spawn a heavy interpreter per hook**. Prefer small shell guards with early exit; batch work into a single daemon.

### Hook execution model `[DOC]`

> "All matching hooks run in parallel, and identical handlers are deduplicated automatically. Command hooks are deduplicated by command string, and HTTP hooks are deduplicated by URL."

Consequences:

1. N matching hooks do NOT cost N times sequentially; they cost ~max(N) wall-clock plus process-spawn jitter.
2. Deduplication means copying the same hook into user + project settings is free (not counted twice).
3. Parallel does not mean safe: two hooks that both rewrite `updatedInput` race - "the last one to finish wins" `[DOC]`.

---

## 3. Observability Recipes

Seven drop-in patterns. Every recipe is runnable today.

### Recipe 1 - Structured JSON-lines audit log (PostToolUse) `[COMM]`

One line per tool call, easy to grep, easy to ship to Loki/Elasticsearch.

```bash
#!/usr/bin/env bash
# ~/.claude/hooks/audit.sh
set -euo pipefail
INPUT=$(cat)
LOG_DIR="${CLAUDE_LOG_DIR:-$HOME/.claude/logs}"
mkdir -p "$LOG_DIR"

jq -c --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
      --arg host "$(hostname -s)" \
      '{
         ts: $ts,
         host: $host,
         session: .session_id,
         cwd: .cwd,
         event: .hook_event_name,
         tool: .tool_name,
         file: (.tool_input.file_path // null),
         cmd:  (.tool_input.command   // null)
      }' <<<"$INPUT" >> "$LOG_DIR/$(date -u +%Y-%m-%d).jsonl"
exit 0
```

Wire it up in `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          { "type": "command", "command": "$HOME/.claude/hooks/audit.sh", "async": true }
        ]
      }
    ]
  }
}
```

`async: true` `[DOC]` means the turn does not wait for the append. This converts observability from a latency cost into a zero-cost background write.

### Recipe 2 - Latency histogram (self-timing) `[COMM]`

Measure the hook's own cost and ship it to a rolling tsv. Lets you detect your own regressions.

```bash
#!/usr/bin/env bash
# ~/.claude/hooks/timed-formatter.sh
set -euo pipefail
START=$(date +%s%N)
INPUT=$(cat)
FILE=$(jq -r '.tool_input.file_path // empty' <<<"$INPUT")

if [[ -n "$FILE" && "$FILE" == *.ts ]]; then
  npx --no-install prettier --write "$FILE" >/dev/null 2>&1 || true
fi

END=$(date +%s%N)
DUR_MS=$(( (END - START) / 1000000 ))
echo -e "$(date -u +%Y-%m-%dT%H:%M:%SZ)\tPostToolUse\t$FILE\t${DUR_MS}" \
  >> "$HOME/.claude/logs/hook_latency.tsv"
exit 0
```

Over a week you get a real histogram. Anything above your budget becomes a claim check against the hook.

### Recipe 3 - Statusline as lightweight telemetry `[DOC]`

Claude Code's statusline runs a shell script on a JSON stream `[DOC]`. Treat it as a zero-dependency, always-on dashboard.

```bash
#!/usr/bin/env bash
# ~/.claude/statusline.sh
set -euo pipefail
INPUT=$(cat)
MODEL=$(jq -r '.model.display_name // .model.id // "?"' <<<"$INPUT")
DIR=$(jq -r '.workspace.current_dir // "?"' <<<"$INPUT" | sed "s|$HOME|~|")
CTX_PCT=$(jq -r '.context.percent // 0' <<<"$INPUT")
COST=$(jq -r '.cost.total_usd // 0' <<<"$INPUT")
DUR=$(jq -r '.duration.total_ms // 0' <<<"$INPUT")

BAR=""
FILLED=$(( CTX_PCT / 5 ))
for ((i=0; i<20; i++)); do
  if (( i < FILLED )); then BAR+="#"; else BAR+="."; fi
done

printf "%s | %s | ctx [%s] %d%% | $%0.3f | %ds" \
  "$MODEL" "$DIR" "$BAR" "$CTX_PCT" "$COST" "$(( DUR/1000 ))"
```

Register:

```json
{ "statusLine": { "type": "command", "command": "$HOME/.claude/statusline.sh" } }
```

Statusline refresh runs on a background schedule and can be verbosely traced: set `CLAUDE_CODE_DEBUG_LOG_LEVEL=verbose` to capture full command output in the debug log `[DOC]`.

### Recipe 4 - OpenTelemetry metrics pipeline `[DOC]`

Claude Code ships first-class OTel support. For an agent orchestration platform this is the right observability floor.

```bash
# ~/.claude/otel.env (source before starting claude)
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
export OTEL_METRIC_EXPORT_INTERVAL=10000     # 10 s during dev (default 60 s)
export OTEL_LOGS_EXPORT_INTERVAL=5000        # 5 s

# Multi-team segmentation (no spaces, strict ASCII)
export OTEL_RESOURCE_ATTRIBUTES="team.id=agent_arch,cost_center=research"
```

What you get out of the box `[DOC]`:

- Metrics: `claude_code.session.count`, `claude_code.token.usage` (by type + model), `claude_code.cost.usage`, `claude_code.lines_of_code.count`, `claude_code.active_time.total`, `claude_code.code_edit_tool.decision`.
- Events: `claude_code.user_prompt`, `claude_code.tool_result` (with `duration_ms`, `success`, `tool_result_size_bytes`), `claude_code.api_request`, `claude_code.api_error`, `claude_code.tool_decision`, `claude_code.skill_activated`.
- Correlation: `prompt.id` UUID threads every event back to the prompt that caused it.

Ship that stream to Grafana Tempo (for traces once you opt into `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1`), Prometheus (for metrics via `OTEL_METRICS_EXPORTER=prometheus`), or Datadog/Honeycomb via their OTLP ingress. This is the only officially supported way to correlate hook activity with API cost.

### Recipe 5 - Sentry breadcrumbs from a Python hook `[COMM]`

When a hook fails in the wild you want the stack trace in your usual triage tool.

```python
#!/usr/bin/env python3
# ~/.claude/hooks/typecheck.py
import json, os, sys, subprocess, time
import sentry_sdk

sentry_sdk.init(
    dsn=os.environ.get("SENTRY_DSN", ""),
    traces_sample_rate=0.0,
    release=os.environ.get("CLAUDE_CODE_VERSION", "unknown"),
)

event = json.loads(sys.stdin.read())
file_path = event.get("tool_input", {}).get("file_path", "")
if not file_path.endswith((".ts", ".tsx")):
    sys.exit(0)  # fast bail - recipe 8

sentry_sdk.set_tag("hook.event", event.get("hook_event_name"))
sentry_sdk.set_tag("hook.tool",  event.get("tool_name"))

t0 = time.monotonic()
try:
    r = subprocess.run(
        ["npx", "--no-install", "tsc", "--noEmit", file_path],
        capture_output=True, text=True, timeout=30,
    )
    dur_ms = int((time.monotonic() - t0) * 1000)
    sentry_sdk.add_breadcrumb(
        category="hook.typecheck",
        message=f"tsc {file_path} -> exit {r.returncode} in {dur_ms}ms",
        level="info" if r.returncode == 0 else "warning",
    )
    if r.returncode != 0:
        print(r.stdout + r.stderr, file=sys.stderr)
        sys.exit(2)   # blocking - claude sees stderr as feedback
except subprocess.TimeoutExpired:
    sentry_sdk.capture_message(f"typecheck timeout on {file_path}", level="error")
    sys.exit(0)       # do not block on infra failure
except Exception:
    sentry_sdk.capture_exception()
    sys.exit(0)
```

### Recipe 6 - HTTP hook fan-out with async + circuit breaker `[COMM]`

HTTP hooks default to a 30 s timeout `[DOC]`. Without a circuit breaker, a flaky endpoint can stall every tool call up to the per-hook timeout. Use `async: true` on logging hooks and keep a small TTL cache of "endpoint is down, skip" decisions.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "http",
            "url": "http://telemetry.internal:8080/hooks",
            "headers": { "Authorization": "Bearer $TEAM_TOKEN" },
            "allowedEnvVars": ["TEAM_TOKEN"],
            "timeout": 2,
            "async": true
          }
        ]
      }
    ]
  }
}
```

- `timeout: 2` caps the damage at 2 seconds per failed POST.
- `async: true` removes it from the turn's critical path entirely.
- If the endpoint must affect Claude, use a **command hook** that wraps the HTTP call and implements an on-disk circuit breaker (file mtime = last-known-failure timestamp; skip if <60 s old).

### Recipe 7 - Per-session debug log on demand `[DOC]`

No need to restart with `--debug` - you can flip it mid-session.

```bash
# Before starting a dodgy session, write to a known path:
claude --debug-file /tmp/claude-$(date +%s).log

# Or, already running:
/debug                   # enables logging, prints the log path
tail -f ~/.claude/debug/<session-id>.txt
```

To filter noise, `CLAUDE_CODE_DEBUG_LOG_LEVEL=info` removes high-volume diagnostics (statusline output, ticker frames). `CLAUDE_CODE_DEBUG_LOG_LEVEL=verbose` turns them back on `[DOC]`.

Hooks in particular: every matched hook writes its stdout, stderr, exit code, and resolution path to the debug log `[DOC]`. The transcript view (Ctrl+O) shows a one-line summary per hook - success is silent, blocking errors show stderr, non-blocking errors show `<hook name> hook error` + first stderr line.

---

## 4. Debugging Flowchart - "hook does not fire"

When a hook is configured but behaves like it does not exist, walk this tree in order. Stop at the first match.

**A. Did it register at all?**
- Run `/hooks` in the session. If the event shows 0 handlers or your hook is missing -> settings JSON was not parsed.
- Check `/doctor` for "Invalid settings files (malformed JSON, incorrect types)" `[DOC]`.
- JSON comments and trailing commas are rejected. Validate with `jq . ~/.claude/settings.json`.
- File watcher sometimes misses edits - restart the session to force reload.

**B. Does the matcher actually match?**
- Matchers are case-sensitive `[DOC]`. `bash` never matches `Bash`.
- For `PreToolUse`/`PostToolUse` the matcher is checked against `tool_name`. MCP tools are `mcp__<server>__<tool>`, not the short name.
- `UserPromptSubmit`, `Stop`, `CwdChanged`, `TaskCreated`, `TaskCompleted`, `TeammateIdle`, `WorktreeCreate`, `WorktreeRemove` have **no matcher support** - fire on every occurrence `[DOC]`.
- If you're using `if: "Bash(git *)"` filtering, that requires Claude Code **v2.1.85 or later** - earlier versions ignore `if` and run the hook on every call `[DOC]`.

**C. Is your script executable and reachable?**
- On macOS/Linux: `chmod +x ./my-hook.sh`. Without the bit, the hook silently fails.
- Use absolute paths or `"$CLAUDE_PROJECT_DIR"`. The cwd when the hook runs is the current directory when the event fired - not necessarily where the script lives.
- Dependencies on `jq`, `npx`, `python3` must be on `$PATH`. Claude Code spawns the hook through your shell profile (`~/.zshrc`/`~/.bashrc`) - if those files gate PATH behind `$- == *i*` (interactive-only), your hook won't see it.

**D. Is your shell profile poisoning stdout?**
- Every unconditional `echo` in `~/.zshrc` or `~/.bashrc` gets prepended to your hook's stdout, corrupting JSON output (`[DOC]`, commonly trips people up). Wrap them:

  ```bash
  if [[ $- == *i* ]]; then
    echo "Shell ready"   # only for interactive shells
  fi
  ```

**E. Wrong event?**
- `PermissionRequest` hooks do NOT fire in `-p` (non-interactive) mode `[DOC]`. Use `PreToolUse` instead.
- `Stop` fires whenever Claude finishes responding, not only at task completion, and does NOT fire on user interrupt `[DOC]`. API errors go to `StopFailure`.
- `PostToolUse` fires only on success; failures go to `PostToolUseFailure` (separate event).

**F. Is the exit code what you think?**
- Exit 0 = proceed. Exit 2 = block, stderr becomes feedback to Claude. Any other non-zero exit = proceed, but transcript shows a hook error notice and the full stderr goes to the debug log `[DOC]`.
- Test locally without Claude Code:

  ```bash
  echo '{"tool_name":"Bash","tool_input":{"command":"ls"},"hook_event_name":"PreToolUse"}' \
    | ./my-hook.sh
  echo "exit=$?"
  ```

**G. Still nothing?**
- Start Claude with `claude --debug "hooks" --debug-file /tmp/claude.log` then `tail -f /tmp/claude.log`. Every matched hook logs its resolution, exec path, stdout, stderr and exit code `[DOC]`.
- Compare `/hooks` output from inside the session vs. the settings file on disk - they must match; if not, your settings file is in the wrong location (user vs project vs local).

**H. Stop-hook infinite loop** (`[DOC]` specific gotcha)
- If your `Stop` hook triggers a retry (e.g. asks Claude to keep working), always guard with `stop_hook_active`:

  ```bash
  if [ "$(jq -r '.stop_hook_active' <<<"$INPUT")" = "true" ]; then exit 0; fi
  ```

- Without that check, Claude will never stop.

---

## 5. Hook Design Patterns for Performance

Six patterns, in decreasing order of impact.

### 5.1 Bail-early (aka fast-path) `[COMM]`

The cheapest hook is one that reads 100 bytes of stdin, decides "not my business", and exits 0. Put this at the top of every hook:

```bash
INPUT=$(cat)
FILE=$(jq -r '.tool_input.file_path // empty' <<<"$INPUT")
case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx) : ;;   # continue
  *) exit 0 ;;                  # skip everything else
esac
```

In the claudekit benchmark, `file-guard` hits **80 ms total** precisely because 95% of calls bail in the first two operations `[COMM]`.

### 5.2 Use the `if` field to skip process spawn entirely `[DOC]`

`matcher` filters on tool name. `if` filters on tool name + arguments, **before the hook process is spawned**:

```json
{
  "matcher": "Bash",
  "hooks": [
    { "type": "command", "if": "Bash(git *)", "command": "./check-git-policy.sh" }
  ]
}
```

From the docs: *"If the command had been `npm test`, the `if` check would fail and `block-rm.sh` would never run, avoiding the process spawn overhead."* `[DOC]`.

This is the single biggest lever for PreToolUse on `Bash` - most Bash calls are not the one you care about, and avoiding a fork saves 80-120 ms each.

### 5.3 Async for fire-and-forget `[DOC]`

Logging, metrics, audit trails, desktop notifications - none of these should ever block the turn.

```json
{ "type": "command", "command": "./log.sh", "async": true }
```

With `async: true` the hook runs in the background and its output is not fed back to Claude. Use `asyncRewake: true` if the background task might produce a late signal Claude needs to see - that variant wakes Claude on exit code 2 and injects stderr as a system reminder `[DOC]`.

### 5.4 Cache expensive operations `[COMM]`

For formatter/linter/typecheck hooks, cache by file hash + mtime. Example for a Prettier hook:

```bash
FILE="$1"
HASH=$(sha1sum "$FILE" | cut -c1-16)
CACHE="$HOME/.cache/claude-fmt/$HASH"
if [[ -f "$CACHE" && "$CACHE" -nt "$FILE" ]]; then exit 0; fi
npx prettier --write "$FILE" && touch "$CACHE"
```

First-edit cost stays the same; re-edits of the same file become ~5 ms instead of ~400 ms.

### 5.5 Offload heavy work to a daemon `[COMM]`

If a hook needs to call a heavy process (typecheck of a monorepo, full test suite), don't spawn it inside the hook. Keep a long-lived daemon and have the hook push a job to it over a Unix socket or file queue. The hook returns in <10 ms; the daemon processes out-of-band.

Claude can still receive results: the daemon writes a message file that a SessionStart compact-hook re-injects on next compaction, or pushes an `asyncRewake` wake-up.

### 5.6 One hook, many branches `[COMM]`

Consolidate 10 small hooks into one dispatcher. This avoids N parallel process spawns:

```bash
#!/usr/bin/env bash
INPUT=$(cat)
TOOL=$(jq -r '.tool_name' <<<"$INPUT")
EVENT=$(jq -r '.hook_event_name' <<<"$INPUT")
case "$EVENT:$TOOL" in
  PostToolUse:Edit|PostToolUse:Write) exec ./format.sh <<<"$INPUT" ;;
  PostToolUse:Bash)                   exec ./log-bash.sh <<<"$INPUT" ;;
  PreToolUse:Edit|PreToolUse:Write)   exec ./protect.sh <<<"$INPUT" ;;
  *) exit 0 ;;
esac
```

Then register once per event. Deduplication `[DOC]` will collapse identical commands automatically, but the dispatcher guarantees you pay for at most one spawn per tool call, not one per logical hook.

---

## 6. Timing budgets - a concrete policy

Proposed team defaults (Agent_Architecture v32.16 context) `[COMM]`:

| Hook class                | Budget (p50) | Budget (p95) | Action if exceeded                     |
| ------------------------- | ------------ | ------------ | -------------------------------------- |
| PreToolUse (sync)         | 100 ms       | 300 ms       | Move to `async` or add `if:` filter    |
| PostToolUse (sync)        | 500 ms       | 2000 ms      | Cache, daemon, or async                |
| UserPromptSubmit          | 200 ms       | 500 ms       | Drop injected chars below 9000         |
| SessionStart              | 1000 ms      | 2500 ms      | Move work to SessionStart async child  |
| Notification              | always async | n/a          | Never block user                       |
| Stop                      | 1000 ms      | 3000 ms      | Guard with `stop_hook_active`          |
| Agent hooks (any event)   | 30 s         | 60 s         | Review: do you really need a subagent? |
| Prompt hooks (any event)  | 5 s          | 15 s         | Switch to cheapest model (Haiku)       |

Measure with Recipe 2 (latency TSV) or Recipe 4 (OTel `claude_code.tool_result.duration_ms`). Review weekly.

---

## 7. When to extend the default timeout

Most of the time: **don't**. Default `type: command` timeout is 10 minutes `[DOC]`. If you need more than that, you are doing something wrong (or doing agent work, which should be `type: agent` or offloaded to a subagent).

Cases where a **shorter** timeout is the right call:

- HTTP hooks to flaky internal endpoints -> `timeout: 2` (seconds) to fail fast.
- PostToolUse formatter on a large monorepo -> `timeout: 30` to stop an accidental full rebuild.
- SessionEnd hook with cleanup -> bounded by `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` (default 1.5 s, auto-raised to highest per-hook timeout up to 60 s) `[DOC]`.

Cases where a **longer** timeout is justified:

- `type: agent` verification that runs tests -> default is 60 s; large suites may need 120-300 s.
- HTTP hooks hitting a staging policy engine with cold caches -> 15-30 s.

Always combine a longer timeout with `async: true` if the turn doesn't depend on the result.

---

## 8. Observability metrics every team should ship

Minimum viable dashboard (map each to OTel `[DOC]`):

1. **Hook latency p50/p95/p99 per event** - from `claude_code.tool_result.duration_ms` filtered by hook source, or from your own Recipe 2 TSV.
2. **Hook fail rate** - stderr non-zero exits per 1000 tool calls. Alert at >5/1000.
3. **Process spawn count per turn** - proxy via count of `PostToolUse` events per `prompt.id` multiplied by hook fan-out.
4. **Token cost per prompt** - `claude_code.token.usage` grouped by `prompt.id` and `model`.
5. **Tool success rate** - `claude_code.tool_result.success` breakdown.
6. **Retry exhaustion** - count of `claude_code.api_error` with `attempt > CLAUDE_CODE_MAX_RETRIES` (default 10) `[DOC]`.
7. **Cost by team** - `claude_code.cost.usage` segmented by `OTEL_RESOURCE_ATTRIBUTES` tags.
8. **Active time vs idle time** - `claude_code.active_time.total` split by `type=user|cli`.

Recommended stack for a small team: Grafana + Prometheus + Loki, fed by a single OTel collector. For larger teams or compliance needs: Datadog or Honeycomb via OTLP. The official Claude Code Monitoring Guide Docker Compose is a zero-friction starting point `[DOC]`.

---

## 9. Gotchas and war stories

- **cwd is not where the script lives.** Claude Code's cwd at hook exec time is the session's cwd. `./my-hook.sh` resolves against *that*. Always use absolute paths or `"$CLAUDE_PROJECT_DIR"` `[DOC]`.
- **stdin, not args.** Event data comes on **stdin as JSON**, not as CLI arguments. If your script ignores stdin, it will run but see nothing useful `[DOC]`.
- **stdout matters.** For `UserPromptSubmit` and `SessionStart`, stdout is injected into Claude's context (capped at 10,000 characters; anything over is saved to a file and replaced with a preview + path) `[DOC]`. Accidentally writing debug messages to stdout poisons the conversation.
- **Last-writer-wins on `updatedInput`.** If two PreToolUse hooks both rewrite `tool_input`, whichever finishes last wins. Since they run in parallel, order is non-deterministic `[DOC]`. Design for one modifier hook per tool.
- **`"allow"` does not override deny rules.** A hook returning `permissionDecision: "allow"` skips the prompt but does not bypass `deny` or managed-settings deny rules `[DOC]`. Hooks can tighten, not loosen.
- **Sandbox blocks Windows interop under WSL2.** If a sandboxed Bash command calls `cmd.exe` or `/mnt/c/...`, the Unix-socket handoff to the Windows host is blocked. Add those commands to `excludedCommands` `[DOC]`.
- **High CPU / memory.** `/heapdump` writes a JS heap snapshot to `~/Desktop` you can load into Chrome DevTools under Memory -> Load `[DOC]`. Attach it to GitHub issues.
- **`/doctor` catches most config drift.** Run it whenever hooks seem broken: it flags invalid settings files, MCP scope conflicts, large CLAUDE.md, unreachable permission rules, plugin/agent load errors `[DOC]`.
- **OTEL_RESOURCE_ATTRIBUTES is picky.** No spaces in values, ASCII only, comma-separated `key=value`. Quotes don't escape spaces - they become literal `[DOC]`.

---

## 10. Summary checklist

Before deploying a new hook:

- [ ] Event is the right one (PreToolUse vs PostToolUse vs Stop vs Notification).
- [ ] Matcher is specific (exact tool name or tight regex). Case matches.
- [ ] `if:` filter added for Bash sub-command patterns (v2.1.85+).
- [ ] Bail-early in the first 3 lines of the script.
- [ ] Absolute path or `$CLAUDE_PROJECT_DIR` used.
- [ ] `async: true` if the turn doesn't need the output.
- [ ] stderr used for errors, stdout reserved for JSON (unless UserPromptSubmit/SessionStart on purpose).
- [ ] Tested locally with `echo '<sample json>' | ./hook.sh; echo $?`.
- [ ] Profile with claudekit-style timing recipe before and after.
- [ ] OTel enabled at least in dev (`CLAUDE_CODE_ENABLE_TELEMETRY=1`).
- [ ] Timeout set intentionally (do not rely on 10 min default for anything user-facing).
- [ ] No unconditional echo in `~/.zshrc` / `~/.bashrc`.

---

## 11. Sources Cited

Anthropic official docs (retrieved 2026-04-17):

- Hooks reference: https://code.claude.com/docs/en/hooks (timeouts, parallel execution, deduplication, matcher, `if` field, `async`/`asyncRewake`, HTTP/prompt/agent hook types, debug techniques)
- Hooks guide: https://code.claude.com/docs/en/hooks-guide (event list, examples, troubleshooting, shell-profile gotcha, stop-hook infinite loop)
- CLI reference: https://code.claude.com/docs/en/cli-reference (`--debug`, `--debug-file`, `--verbose`, `--include-hook-events`, `--bare`)
- Troubleshooting: https://code.claude.com/docs/en/troubleshooting (`/doctor`, `/heapdump`, config file locations, search/ripgrep setup)
- Environment variables: https://code.claude.com/docs/en/env-vars (`CLAUDE_CODE_DEBUG_LOGS_DIR`, `CLAUDE_CODE_DEBUG_LOG_LEVEL`, `CLAUDE_CODE_ENABLE_TELEMETRY`, `CLAUDE_CODE_OTEL_*`, `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`, `API_TIMEOUT_MS`)
- Monitoring (OpenTelemetry): https://code.claude.com/docs/en/monitoring-usage (metrics, events, traces beta, cardinality, multi-team attributes, backends)
- Statusline: https://code.claude.com/docs/en/statusline (JSON stdin schema, multi-line output, context/cost/duration fields)

Community benchmarks and incidents:

- claudekit hook profiling guide (Carl Rannaberg): https://github.com/carlrannaberg/claudekit/blob/main/docs/guides/hook-profiling.md (benchmarks: 2000 ms good / 5000 ms critical threshold; claudekit-hooks profile CLI)
- ruvnet/ruflo GitHub issue #1530: https://github.com/ruvnet/ruflo/issues/1530 (18-21 s per prompt caused by 11 hooks each spawning Node.js)
- Claude Code performance under scrutiny (cryptonomist.ch, 2026-04-13): https://en.cryptonomist.ch/2026/04/13/claude-code-performance/
- Scortier analysis: https://scortier.substack.com/p/claude-code-drama-6852-sessions-prove
- Claude Code Hooks production guide (techsy.io): https://techsy.io/en/blog/claude-code-hooks-guide
- everything-claude-code performance optimization: https://github.com/affaan-m/everything-claude-code

Reference implementations:

- Bash command validator example: https://github.com/anthropics/claude-code/blob/main/examples/hooks/bash_command_validator_example.py
- Claude Code ROI / Monitoring Docker Compose: https://github.com/anthropics/claude-code-monitoring-guide

Word count: ~2350.
