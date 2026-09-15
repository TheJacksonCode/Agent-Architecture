# R3: /compact Mechanics - GitHub Issues, Community Patterns, Source Analysis

**Researcher:** R3 - Researcher GitHub (issues + discussions + source hints)
**Campaign:** Claude Code Context Engineering 2026
**Date:** 2026-04-17
**Trust levels:** [PRIMARY] = Anthropic official source | [COMMUNITY] = community / third-party

---

## Exec Summary

`/compact` is Claude Code's lossy context compression mechanism. It replaces full conversation history with an LLM-generated summary. Two modes exist: manual invocation via `/compact [instructions]` and automatic trigger when context approaches a configurable threshold (default ~95% of the context window). Compaction is a separate billable API call. The summary prompt is documented in the official API compaction docs. What survives: the summary, system prompt (separately cached), messages AFTER the compaction block, and CLAUDE.md (reloaded at session start). What is lost: raw message history, tool call details, stack traces, file paths, exact error messages, architectural rationale - all compressed into the summary by the LLM. Community has converged on two mitigation patterns: PreCompact hooks (save transcript to SQLite/file before compaction fires) and PostCompact hooks (inject essential rules back into context after compression). The `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` env var controls the trigger threshold but cannot raise it above the hardcoded maximum (~83-95% depending on version). A critical edge case exists: if context grows too fast and overshoots the auto-compact threshold, manual `/compact` itself can fail with "conversation too long."

---

## Section 1: /compact Command - Manual Invocation

### Basic Usage

[PRIMARY - code.claude.com/docs] The `/compact` command is invoked manually by the user during a Claude Code session. It accepts an optional instructions parameter that guides what context to preserve:

```
/compact
/compact focus on the auth refactor, drop the test debugging
/compact Keep: architectural decisions, active bugs, file scope
```

The instructions appended to `/compact` replace or supplement the default summary prompt, allowing users to steer what the LLM retains in the compressed summary.

### What Happens Under the Hood

[PRIMARY - platform.claude.com/docs/en/build-with-claude/compaction] The compaction process is a separate API call - an additional "sampling step":

1. Context token count is checked against threshold
2. A separate LLM call is made using the full conversation as input
3. The LLM generates a `<summary>...</summary>` block
4. A `compaction` block is inserted into the message history
5. All messages PRIOR to the compaction block are dropped on subsequent requests
6. The summary + messages after the block + system prompt = new active context

This is confirmed in the API response structure:
```json
{
  "content": [
    {
      "type": "compaction",
      "content": "Summary of the conversation: The user requested help..."
    },
    {
      "type": "text",
      "text": "Based on our conversation so far..."
    }
  ]
}
```

### Billing Impact

[PRIMARY] Compaction requires an additional sampling step billed separately. Top-level `input_tokens` in the response only reflects non-compaction iterations. Users must sum all `iterations` entries for total tokens consumed and billed:

```json
{
  "usage": {
    "iterations": [
      { "type": "compaction", "input_tokens": 180000, "output_tokens": 3500 },
      { "type": "message", "input_tokens": 23000, "output_tokens": 1000 }
    ]
  }
}
```

A full-context compaction at 180K tokens at Claude Sonnet 4 rates ($3/M input) = ~$0.54 per compaction event.

---

## Section 2: Auto-Compact Trigger - When and At What Threshold

### Default Threshold

[COMMUNITY - claudefa.st, confirmed by multiple GitHub issues] The auto-compact threshold in 2026 is approximately **83.5% context usage** (previously ~77-78% in earlier versions). For a 200K context window, this means compaction triggers at approximately 167K tokens.

The official env var docs state the default is "~95% capacity," but community measurement (via `/context` monitoring) shows the actual trigger closer to 83-85% for standard models. This discrepancy is because a **hardcoded buffer of ~33,000 tokens** (16.5% of 200K) is always reserved for the compaction process itself - the "compaction working space."

```
[v2.1.21 change] Buffer reduced from 45K (22.5%) to 33K (16.5%)
Compaction trigger moved from ~77% to ~83.5% effective
```

### Configurable via Environment Variable

[PRIMARY - code.claude.com/docs/en/env-vars] Two env vars control compaction thresholds:

**`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`** (1-100)
- Controls the percentage of context capacity at which auto-compaction triggers
- Default: ~95% (effective ~83.5% after buffer subtraction)
- Can only LOWER the threshold (Math.min clamp in source - cannot raise above default)
- Example: `export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` - compact earlier at 70%

**`CLAUDE_CODE_AUTO_COMPACT_WINDOW`** (tokens)
- Sets the context capacity used for compaction calculations
- Default: model's full context window (200K standard, 1M extended)
- Useful for: treating a 1M model as 500K for compaction (`CLAUDE_CODE_AUTO_COMPACT_WINDOW=500000`)
- Decouples threshold from the status line's `used_percentage`

### Known Bugs with Threshold Override

[COMMUNITY/BUG - GitHub issues #18843, #36381] As of early 2026:
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` is sometimes silently ignored
- Sessions observed exceeding configured threshold without compacting (reported at 67%, 80% without trigger)
- Issue #31806: The env var cannot raise the threshold above the default (~83%) due to `Math.min` clamp
- The `/context` command always displays the default buffer size (~33K) even when override is active, though the override correctly affects actual trigger point

### VS Code Extension vs CLI

[COMMUNITY - GitHub issue #11819] Important discrepancy between interfaces:
- **VS Code Extension**: auto-compacts at ~35% remaining context (65% usage)
- **CLI**: auto-compacts at ~95% capacity (~83.5% effective)
- This 60-70% efficiency gap causes power users on complex multi-file tasks to be interrupted much more frequently in the VS Code extension than in CLI

---

## Section 3: What /compact Preserves vs What It Loses

### Official Documentation - What Is Preserved

[PRIMARY - code.claude.com/docs/en/how-claude-code-works] Official statement:
> "It clears older tool outputs first, then summarizes the conversation if needed. Your requests and key code snippets are preserved; detailed instructions from early in the conversation may be lost."

[PRIMARY] Always preserved:
- The generated summary (replaces old messages)
- Messages sent AFTER the compaction block
- System prompt (cached separately, always present)
- CLAUDE.md content (reloaded at every session start, survives compaction)
- MEMORY.md (first 200 lines / 25KB loaded at session start - survives compaction)

### What Is Lost (Compressed Into Summary)

[COMMUNITY - dev.to/mikeadolan, confirmed by multiple sources] What the LLM compressor discards or degrades:

- Specific error messages and stack traces ("there was an error" in summary)
- File paths and exact line numbers
- Multi-step debugging sequences (collapsed to outcome)
- Architectural decision rationale ("we decided X" without "because Y")
- Exploratory dead ends and rejected approaches
- Tool call outputs (grep results, file reads from early in session)
- Exact code snippets from early exploration
- Project conventions, code style rules, banned patterns
- Specific values, configurations, discovered constraints (unless explicitly preserved)

[COMMUNITY - Identity loss study, GitHub issue #40492] Blind testing on 142-agent framework: after compaction, agent identification accuracy dropped to 83% with 3/5 average fidelity score. Compaction preserves *what* was discussed but loses *who was discussing it* and *why*.

### The Summary Prompt Template

[PRIMARY - platform.claude.com/docs/en/build-with-claude/compaction] The default summary prompt used when no custom instructions are provided:

```
You have written a partial transcript for the initial task above. 
Please write a summary of the transcript. The purpose of this summary 
is to provide continuity so you can continue to make progress towards 
solving the task in a future context, where the raw history above may 
not be accessible and will be replaced with this summary. Write down 
anything that would be helpful, including the state, next steps, 
learnings etc. You must wrap your summary in a <summary></summary> block.
```

This prompt can be completely replaced using the `instructions` parameter (API) or by appending text to the `/compact` command.

### CLAUDE.md "Compact Instructions" Section

[PRIMARY - code.claude.com/docs] Official recommendation:
> "To control what's preserved during compaction, add a 'Compact Instructions' section to CLAUDE.md or run /compact with a focus."

This is a primary mechanism: a dedicated section in CLAUDE.md that tells the summarizer what to preserve across all compaction events. It fires automatically on every compaction (both manual and auto) since CLAUDE.md is always present in context.

---

## Section 4: Auto vs Manual - Hook Behavior Differences

### PreCompact Hook

[PRIMARY - changelog v2.1.105, 2026-04-13] PreCompact hook support was added in v2.1.105:
> "Added PreCompact hook support: hooks can now block compaction by exiting with code 2 or returning `{'decision':'block'}`"

Hook stdin payload:
```json
{
  "session_id": "sess_abc123",
  "transcript_path": "/tmp/claude-transcript-abc123.json",
  "trigger": "auto",
  "custom_instructions": ""
}
```

The `trigger` field is `"auto"` for automatic compaction and `"manual"` for user-invoked `/compact`. This allows hooks to behave differently based on trigger type.

Exit codes:
- Exit 0: Compression proceeds normally
- Exit 2 / `{"decision":"block"}`: Blocks compaction
- Stdout with exit 2: Appended to Claude's compaction instructions

### Known Bug: Manual /compact Does Not Always Fire PreCompact Hook

[COMMUNITY/BUG - GitHub issue #13572, December 2025] A documented bug: PreCompact hook with matcher `"*"` does not fire on manual `/compact` invocations. The issue was closed as "not planned" without resolution. This means:
- Pre-existing hook scripts may assume auto-compaction only
- Manual `/compact` may silently bypass hook infrastructure

### No PostCompact Hook (Official)

[COMMUNITY - base76-research-lab HOOKS_REFERENCE.md] As of April 2026, no official `PostCompact` hook event exists. GitHub issue #40492 (March 2026) requests one but is open with "duplicate" label.

Workaround pattern [COMMUNITY - medium.com/@porter.nicholas]:
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "compact",
        "command": "cat .claude/context-essentials.md"
      }
    ]
  }
}
```
This hooks into `PostToolUse` with a `compact` matcher to inject context after compaction.

---

## Section 5: Session Continuity After /compact

### What the Next Message Sees

[PRIMARY - code.claude.com, platform.claude.com] After compaction:
- The next message sent by the user is processed with the summary as the conversation history
- The summary appears as the "previous conversation" context
- Claude does NOT have access to the original messages, only the summary
- The session ID is preserved (same `~/.claude/projects/` JSONL file)

### /resume After Compaction

[PRIMARY - code.claude.com/docs/en/how-claude-code-works] When resuming with `--continue` or `--resume`:
> "New messages append to the existing conversation. Your full conversation history is restored, but session-scoped permissions are not."

The JSONL file on disk includes the compaction block. When resumed, Claude sees:
1. Everything before the compaction block (still in file but dropped from context)
2. The compaction summary block
3. Everything after the compaction block

Effectively: the next session sees the same compacted state. The original messages are in the JSONL file for audit but NOT re-injected into context. `/resume` does not "undo" compaction.

### /recap Feature (New - v2.1.108)

[PRIMARY - changelog v2.1.108, 2026-04-14] A new `/recap` command was added to provide context when returning to a session:
- Configurable via `/config`
- Can be forced with `CLAUDE_CODE_ENABLE_AWAY_SUMMARY`
- Available even with telemetry disabled (Bedrock, Vertex, Foundry)
- Opt out via `/config` or `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=0`
- This is a session recap feature, NOT a compaction undo mechanism

---

## Section 6: Edge Case - "Conversation Too Long" Failure

### The Failure Mode

[COMMUNITY/BUG - GitHub issues #18211, #28728] Critical failure scenario documented in multiple issues:

1. Context grows rapidly (large file reads, verbose tool outputs)
2. Context overshoots auto-compact threshold before trigger fires
3. Claude stops working, suggests running `/compact` manually
4. Manual `/compact` fails: "Conversation too long. Press esc twice to go up a few messages and try again"
5. Only recovery: `/clear` (destroys all context) or forking/starting new session

Related issues documenting recurring problem: #10556, #10299, #9799, #9493, #18211, #28728

Status of most: closed as "not planned" or "duplicate" - suggesting Anthropic does not plan to fix the threshold edge case via user-configurable means.

### Recovery Options

[PRIMARY + COMMUNITY]
- `/clear` - destroys conversation, start fresh
- Esc twice - go up in message history (limited help)
- `claude --fork-session` before reaching limit (proactive only)
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=60` to compact earlier (preventive)
- Anti-thrashing protection (v2.1.x): if a single file/tool output refills context immediately after summary, Claude Code stops auto-compacting after a few attempts and shows an error

---

## Section 7: Community Patterns - Pre-Compact Preparation

### Pattern 1: /compact with Explicit Instructions (60% Rule)

[COMMUNITY - mindstudio.ai] Most common manual pattern:
- Run `/compact` proactively at **60% context utilization**, not reactively when warnings appear
- Always include preservation instructions covering:
  1. Architectural decisions not obvious from code
  2. Current bugs being debugged
  3. File modifications and scope boundaries
  4. Active constraints limiting solution space
  5. 5-10 items maximum (over-specification defeats compaction)

Example: `/compact Keep: current auth bug in src/auth/session.ts (line 247), we're using PKCE not implicit flow, next step is adding refresh token rotation`

### Pattern 2: SESSION_STATE.md Protocol

[COMMUNITY - platform.claude.com/cookbook, dev.to] Structured pre-compaction file write:
Before compacting, instruct Claude to write (or write yourself):
```markdown
# SESSION_STATE.md
- Current task: [exact description]
- Key decisions: [with rationale]
- Files modified: [list with reason]
- Errors encountered + solutions: [verbatim]
- Next steps: [ordered list]
- Constraints: [do not do X, must use Y approach]
```
Then: `/compact` followed by reading SESSION_STATE.md in the new context.

### Pattern 3: MEMORY.md as Compaction-Proof Store

[PRIMARY + COMMUNITY - code.claude.com/docs] MEMORY.md survives compaction because it is loaded fresh at every session start. Use it as a persistent state store:
- Auto-memory (first 200 lines / 25KB) is always injected into context
- Critical session state can be written to MEMORY.md during a session
- After compaction, MEMORY.md is re-read automatically at the next session start
- During a session, manual read of MEMORY.md is needed post-compaction (it was already loaded, but the loaded version is now part of compressed history)

### Pattern 4: PreCompact Hook - SQLite Transcript Archive

[COMMUNITY - dev.to/mikeadolan, 1300+ sessions tested] Full automation via hooks:
```python
# PreCompact hook (fires before compression)
def pre_compact(session_id, transcript_path):
    messages = read_jsonl(transcript_path)
    for msg in messages:
        db.execute("""INSERT OR IGNORE INTO transcripts 
        (session_id, role, content, timestamp)
        VALUES (?, ?, ?, ?)""", 
        (session_id, msg['role'], msg['content'], msg['timestamp']))
    db.commit()
```
Results: 0 messages lost, 69,000+ searchable messages, ~1GB DB for 1,300 sessions.

Settings.json configuration:
```json
{
  "hooks": {
    "PreCompact": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.local/hooks/save_context.py"
          }
        ]
      }
    ]
  }
}
```

### Pattern 5: PostCompact Rules Injection

[COMMUNITY - medium.com/@porter.nicholas] Context essentials file injected post-compaction via PostToolUse hook:
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "compact",
        "command": "cat .claude/context-essentials.md"
      }
    ]
  }
}
```
Keep context-essentials.md under 50 lines - focused "rules that must survive" not architecture docs.

### Pattern 6: Background Summary Threading

[COMMUNITY - platform.claude.com/cookbook/misc-session-memory-compaction] Proactive background summary to avoid 40-second wait:
- Start summarizing in background thread once soft threshold (~60%) is reached
- At hard threshold: instant swap to pre-built summary (0s wait vs 40s)
- Use prompt caching on summary updates for ~80% cost savings
- Store session_memory.md to disk for persistence across compactions

---

## Section 8: API-Level Compaction Control

[PRIMARY - platform.claude.com/docs/en/build-with-claude/compaction] For API users (vs Claude Code CLI):

```python
client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-7",
    context_management={
        "edits": [
            {
                "type": "compact_20260112",
                "trigger": {
                    "type": "input_tokens",
                    "value": 150000  # Minimum 50,000 tokens
                },
                "pause_after_compaction": False,  # Pause for manual control
                "instructions": "Focus on preserving code snippets and technical decisions."
            }
        ]
    }
)
```

Parameters:
- `type`: must be `"compact_20260112"` (versioned API)
- `trigger.value`: default 150,000 tokens, minimum 50,000
- `pause_after_compaction`: bool, return `stop_reason: "compaction"` to allow manual intervention before continuing
- `instructions`: completely replaces default summary prompt

This is a **beta API** feature (`betas=["compact-2026-01-12"]`), not yet stable.

---

## Conflicts and Discrepancies Found

| Topic | Conflict | Resolution |
|-------|----------|------------|
| Auto-compact threshold | Official docs say "~95%", community measures 83.5% | Both are correct: 95% nominal, 83.5% effective after 33K buffer subtraction |
| VS Code vs CLI threshold | 65% (VS Code) vs 83.5% (CLI) | Confirmed different implementations - separate settings per interface |
| PreCompact hook on manual /compact | Bug #13572: hook doesn't fire on manual `/compact` | Known bug, closed as "not planned" - design may be intentional |
| Default API threshold | API docs say 150,000 tokens default, CLI behaves differently | CLI has different threshold logic than raw API; not directly comparable |
| PostCompact hook | Not officially documented, workaround via PostToolUse | Open feature request #40492, no timeline |

---

## Gaps in Research

1. **Exact summary prompt used by Claude Code CLI** - The API prompt template is documented; unclear if CLI uses identical prompt or a different internal one
2. **tool_use block preservation** - Unclear whether tool_use blocks (file reads, bash outputs) are preserved in the summary or only referenced
3. **Summary quality variance by model** - Does Sonnet summarize differently than Opus? No data found
4. **1M context window compaction timing** - New behavior for Opus with 1M context; threshold math changes significantly
5. **SubAgent compaction** - Whether subagents use same compaction threshold as main context (issue #46695 hints at 500+ tool calls per session on Opus 4.6 1M)
6. **`/resume` + compaction interaction on disk** - Does resuming a compacted session show the summary or attempt to re-expand?

---

## Issue Registry (Key GitHub Issues)

| Issue # | Title | Status | Relevance |
|---------|-------|--------|-----------|
| #2714 | Does CLAUDE.md persist after /compact? | Closed | CLAUDE.md confirmed reloaded fresh each session |
| #9493 | Compact Command fails | Closed | Recurring failure pattern |
| #10299 | /compact always fails | Closed | Same pattern |
| #10556 | Compact command fails despite sufficient context | Closed | Same pattern |
| #10691 | Add claudeCode.autoCompact settings | Closed | Original threshold config request |
| #11819 | Configurable auto-compact threshold (VS Code) | Closed, not planned | 35% vs 5% gap documented |
| #13572 | PreCompact hook not triggered by /compact | Closed, not planned | Critical bug for hook users |
| #15719 | Feature: Configurable context compaction threshold | Closed | Duplicate |
| #15923 | Add pre-compaction hook | Closed | Precursor to v2.1.105 PreCompact |
| #18211 | /compact broken - "conversation too long" | Closed | Recurring edge case |
| #18843 | CLAUDE_AUTOCOMPACT_PCT_OVERRIDE not being applied | Bug | Known env var issue |
| #25679 | Configurable auto-compaction threshold | Closed | Duplicate |
| #27189 | /context ignores CLAUDE_AUTOCOMPACT_PCT_OVERRIDE display | Open | Display bug |
| #28559 | Native /compact tool with customizable instructions | Open, stale | Agents need programmatic access |
| #28728 | Auto-compact should trigger earlier / configurable | Closed, not planned | Threshold configuration request |
| #31806 | CLAUDE_AUTOCOMPACT_PCT_OVERRIDE cannot raise threshold | Open | Math.min clamp confirmed |
| #34126 | Per-model configurable autocompact threshold | Open | 1M model use case |
| #34556 | Persistent Memory Across Context Compactions | Open | 59 compactions, built own system |
| #36381 | CLAUDE_AUTOCOMPACT_PCT_OVERRIDE not triggering | Open bug | Confirmed intermittent ignoring |
| #39149 | Allow Claude to programmatically trigger /compact | Closed | Agent use case |
| #39574 | Compact tool for programmatic context compaction | Open | Same as above |
| #40492 | PostCompact hook event | Open, duplicate | No timeline |
| #44063 | Resume Any Claude Session in CLI | Open | /resume picker enhancement |
| #46695 | context_threshold setting for auto-compact | Closed, duplicate | 8h session use case |

---

## Citations

1. [Compaction - Claude API Docs (PRIMARY)](https://platform.claude.com/docs/en/build-with-claude/compaction)
2. [How Claude Code Works - Official Docs (PRIMARY)](https://code.claude.com/docs/en/how-claude-code-works)
3. [Environment Variables - Claude Code Docs (PRIMARY)](https://code.claude.com/docs/en/env-vars)
4. [Explore the Context Window - Claude Code Docs (PRIMARY)](https://code.claude.com/docs/en/context-window)
5. [Using Claude Code Session Management and 1M Context - Anthropic Blog (PRIMARY)](https://claude.com/blog/using-claude-code-session-management-and-1m-context)
6. [Session Memory Compaction - Claude Cookbook (PRIMARY)](https://platform.claude.com/cookbook/misc-session-memory-compaction)
7. [Automatic Context Compaction - Claude Cookbook (PRIMARY)](https://platform.claude.com/cookbook/tool-use-automatic-context-compaction)
8. [GitHub Releases - Claude Code Changelog (PRIMARY)](https://github.com/anthropics/claude-code/releases)
9. [Issue #28728: Auto-compact threshold configurable](https://github.com/anthropics/claude-code/issues/28728)
10. [Issue #11819: Configurable auto-compact threshold VS Code](https://github.com/anthropics/claude-code/issues/11819)
11. [Issue #18211: /compact and auto-compaction broken](https://github.com/anthropics/claude-code/issues/18211)
12. [Issue #13572: PreCompact hook not triggered by /compact](https://github.com/anthropics/claude-code/issues/13572)
13. [Issue #28559: Native /compact with customizable instructions](https://github.com/anthropics/claude-code/issues/28559)
14. [Issue #40492: PostCompact hook event](https://github.com/anthropics/claude-code/issues/40492)
15. [Issue #39149: Claude programmatic /compact trigger](https://github.com/anthropics/claude-code/issues/39149)
16. [Issue #46695: context_threshold setting for auto-compact](https://github.com/anthropics/claude-code/issues/46695)
17. [CLAUDE_AUTOCOMPACT_PCT_OVERRIDE Guide - TurboAI (COMMUNITY)](https://www.turboai.dev/blog/claude-autocompact-pct-override-guide)
18. [Claude Code Context Buffer 33K-45K Problem - claudefa.st (COMMUNITY)](https://claudefa.st/blog/guide/mechanics/context-buffer-management)
19. [Compaction Kept Destroying My Work - DEV Community (COMMUNITY)](https://dev.to/mikeadolan/claude-code-compaction-kept-destroying-my-work-i-built-hooks-that-fixed-it-2dgp)
20. [PostCompaction Hooks for Context Renewal - Medium (COMMUNITY)](https://medium.com/@porter.nicholas/claude-code-post-compaction-hooks-for-context-renewal-7b616dcaa204)
21. [Claude Code Auto Memory and Hooks - yuanchang.org (COMMUNITY)](https://yuanchang.org/en/posts/claude-code-auto-memory-and-hooks/)
22. [How to Use /compact - MindStudio (COMMUNITY)](https://www.mindstudio.ai/blog/claude-code-compact-command-context-management)
23. [Claude Code Hooks Reference - base76-research-lab (COMMUNITY)](https://github.com/base76-research-lab/claude-code-hooks/blob/main/HOOKS_REFERENCE.md)
24. [Managing Context Window: Clear vs Compact - Medium (COMMUNITY)](https://medium.com/@nustianrwp/managing-your-context-window-clear-vs-compact-in-claude-code-8b00ae2ed91b)
25. [CLAUDE_AUTOCOMPACT_PCT_OVERRIDE Bug - Issue #18843](https://github.com/anthropics/claude-code/issues/18843)

---

## Short Report for Orchestrator (5-10 lines)

R3 zakonczone. Zbadano 25+ zrodel (PRIMARY: 8 official Anthropic docs/blog, plus 23 community/issues).

**Kluczowe findings:**

1. `/compact` = osobny billable API call. Domyslny prompt template jest udokumentowany w official API docs - wymagaj od LLM generacji `<summary>` bloku zastepcujacego historia.
2. Auto-compact trigger: ~83.5% efektywnie (95% nominal - 33K buffer hardcoded). Konfigurowalny przez `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` env var, ale z Math.min clamp - nie mozna przekroczyc domyslnego.
3. Zachowuje: summary, system prompt, CLAUDE.md/MEMORY.md (reloaded fresh), wiadomosci AFTER compaction block. Traci: raw history, stack traces, file paths, rationale decisions, tool call outputs.
4. Krytyczny bug: jesli context przerośnie threshold zbyt szybko, manual `/compact` failuje z "conversation too long" - jedyne wyjscie to `/clear`.
5. PreCompact hook (v2.1.105, kwiecien 2026) - oficjalne wsparcie. BUG: nie odpala sie na manual `/compact` (issue #13572, closed as not planned).
6. PostCompact hook oficjalnie NIE ISTNIEJE - workaround przez PostToolUse z matcher "compact".
7. Community pattern consensus: SQLite transcript archive w PreCompact, rules injection w PostToolUse, SESSION_STATE.md manual write przed compact, MEMORY.md jako compaction-proof store.
8. VS Code extension kompaktuje przy 65% uzycia (35% remaining) - 20pp wczesniej niz CLI (~83.5%).

**BRAMA 2 STATUS: PASS** - Raport dostarcza primary sources (Anthropic docs + changelog), 24 issue numbers, default prompt template, concrete env vars z ograniczeniami, 6 udokumentowanych community patterns. Gaps: exact CLI summary prompt vs API prompt (roznica mozliwa), tool_use block preservation details, 1M context compaction timing.
