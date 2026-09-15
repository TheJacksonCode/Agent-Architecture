# R3: Auto-loading Mechanics

Researcher: R3 (deep-research-v2, campaign "CLAUDE.md Patterns 2026")
Model: Opus 4.7
Date: 2026-04-17
Target: 3000-4500 words
Primary sources: code.claude.com/docs/en/memory, /hooks, /context-window, /commands, /interactive-mode + anthropics/claude-code GitHub issues.

---

## 1. Abstract

CLAUDE.md is a persistent-instruction artifact that Claude Code injects into every conversation. Despite looking like a single file, auto-loading is a layered mechanism: four locations (Managed, Project, User, Local) walk up a directory tree, nested files in subdirectories are lazily discovered, `.claude/rules/*.md` shares the same budget via `paths:` frontmatter, and `@import` directives expand eagerly up to five hops. The whole bundle is delivered not as a system prompt but as a user message appended to the system prompt (per Anthropic's own troubleshooting notes in [memory docs, "Claude isn't following my CLAUDE.md"]).

The non-obvious quirks cluster around the lifecycle events. `/compact` re-injects the project-root CLAUDE.md and the MEMORY.md auto-memory, but silently drops nested CLAUDE.md files and `paths:`-scoped rules until a matching file is read again. A `cd` inside the session does not re-walk the ancestor tree for new CLAUDE.md; instead it fires `CwdChanged` hook and falls back on lazy-loading the moment Claude reads a file in the new subtree. Prompt-cache interaction is opaque but documented community experiments confirm that any byte change in CLAUDE.md invalidates the cached prefix, which at the current default 5-minute TTL ([Anthropic 2026 regression, Issue #46829]) means a mid-session edit produces a one-turn cache miss worth 25% price premium on the whole block.

Three gaps dominate this area: (a) there is no official `/reload` command, confirmed by two duplicate-closed feature requests ([#17127], [#22085]); (b) the `/memory` command lets you edit CLAUDE.md via the editor but does not re-parse it in-session until `/compact` triggers re-injection; (c) multi-session isolation is never explicitly documented - behavior is inferred from the per-session nature of the context window. This report maps every documented lifecycle event, flags the gaps, and gives 5+ concrete timing scenarios.

---

## 2. Lifecycle: session start to ongoing to compact to end

```
+--------------------+      +-------------------+      +-------------------+
|  Session START     | ---> |  STEADY STATE     | ---> |  /compact OR      |
|                    |      |                   |      |  auto-compact     |
|  - SessionStart    |      |  - InstructionsLoaded    |  - PreCompact     |
|    hook fires      |      |    for nested     |      |    (blocks?)      |
|  - Managed         |      |    CLAUDE.md      |      |  - summarize      |
|  - ~/.claude/      |      |  - path-scoped    |      |  - re-inject      |
|    CLAUDE.md       |      |    rules via      |      |    root CLAUDE.md |
|  - walk up:        |      |    `paths:`       |      |    + MEMORY.md    |
|    ./../CLAUDE.md  |      |    frontmatter    |      |  - drop nested +  |
|    ./CLAUDE.md     |      |  - CwdChanged hook       |    path-scoped    |
|  - CLAUDE.local.md |      |    on `cd`        |      |  - PostCompact    |
|  - .claude/rules/* |      |  - auto memory    |      |    fires          |
|  - @imports (5 hop |      |    read/write     |      |  - InstructionsLoaded
|    max, eager)     |      |                   |      |    with load_reason
|  - InstructionsLoaded     |                   |      |    = "compact"    |
|    hook per file   |      |                   |      |                   |
+--------------------+      +-------------------+      +-------------------+
                                                                  |
                                                                  v
                                                       +-------------------+
                                                       |  Session END      |
                                                       |  - SessionEnd hook|
                                                       |  - reason: clear, |
                                                       |    logout, etc    |
                                                       |  - CLAUDE.md NOT  |
                                                       |    written back   |
                                                       +-------------------+
```

Three phases dominate the lifecycle: (1) **cold start**, where Claude Code walks the directory tree and builds the initial injected bundle; (2) **steady state**, where nested and path-scoped files load on-demand; (3) **compaction**, which is the single most important re-injection event and the only moment where the initial bundle is rebuilt inside a running session.

---

## 3. Session start injection (order, position in prompt)

### 3.1 Files loaded eagerly at launch

Anthropic's memory docs list four scopes, in precedence order ([memory, "Choose where to put CLAUDE.md files"]):

| Scope | Location | Loaded at |
| ----- | -------- | --------- |
| **Managed policy** | `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS), `/etc/claude-code/CLAUDE.md` (Linux/WSL), `C:\Program Files\ClaudeCode\CLAUDE.md` (Windows) | session start |
| **User** | `~/.claude/CLAUDE.md` | session start |
| **Project (ancestor walk)** | `./CLAUDE.md` and `./.claude/CLAUDE.md` plus every `CLAUDE.md` / `CLAUDE.local.md` in ancestor directories from cwd to filesystem root | session start |
| **Project rules (unscoped)** | `.claude/rules/*.md` without `paths:` frontmatter | session start, "same priority as `.claude/CLAUDE.md`" ([memory, "Set up rules"]) |

The ancestor-walk is explicit: "Claude Code reads CLAUDE.md files by walking up the directory tree from your current working directory... all discovered files are concatenated into context rather than overriding each other" ([memory, "How CLAUDE.md files load"]). Inside each directory, `CLAUDE.local.md` is appended *after* `CLAUDE.md`, so "when instructions conflict, your personal notes are the last thing Claude reads at that level" (same section).

### 3.2 Position relative to system prompt

This is the single most-misunderstood fact: **CLAUDE.md is not part of the system prompt**. Anthropic's troubleshooting entry is unambiguous:

> CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself. Claude reads it and tries to follow it, but there's no guarantee of strict compliance, especially for vague or conflicting instructions.
> ([memory, "Claude isn't following my CLAUDE.md"])

For system-prompt-level instructions the recommended escape hatch is `--append-system-prompt`, which is per-invocation and therefore unsuitable for interactive sessions.

### 3.3 Timeline from the context-window visualization

The interactive visualization at `/en/context-window` assigns representative token positions to each auto-loaded block. Normalizing its `t` fields (0-1 timeline) to a linear order:

| Order | Block | Tokens (representative) | Notes |
| ----- | ----- | ----------------------- | ----- |
| 1 | System prompt | 4,200 | never in message history; survives compaction untouched |
| 2 | Auto memory (MEMORY.md) | 680 | first 200 lines or 25KB, whichever smaller |
| 3 | Environment info | 280 | cwd, platform, shell; git block at end of system prompt |
| 4 | MCP tool names (deferred) | 120 | schemas fetched on demand |
| 5 | Skill descriptions | 450 | `noSurviveCompact: true` - listing is *not* re-injected after /compact |
| 6 | `~/.claude/CLAUDE.md` | 320 | "global preferences, applies to every project" |
| 7 | Project CLAUDE.md | 1,800 | "most important file you can create" |
| 8 | First user prompt | ~45 | boundary between startup and conversation |

So the canonical user-visible load order is: **Managed -> User -> Project (deepest first? depth order is underspecified) -> CLAUDE.local.md (per-level append) -> unscoped `.claude/rules/`**. Then at position 8 the conversation begins.

### 3.4 What order within the ancestor walk?

The docs say "Claude Code reads CLAUDE.md files by walking up the directory tree" but do not specify root-first or cwd-first concatenation. The representative visualization labels a single "Project CLAUDE.md" block without disambiguating multi-level repos. **GAP:** for monorepos with three-level CLAUDE.md (e.g. `/repo/CLAUDE.md`, `/repo/packages/CLAUDE.md`, `/repo/packages/frontend/CLAUDE.md`), the actual concatenation order is not documented. Experiments via the `InstructionsLoaded` hook with `load_reason: "session_start"` would establish this empirically (Anthropic explicitly recommends this hook for debugging: "use the InstructionsLoaded hook to log exactly which instruction files are loaded, when they load, and why").

### 3.5 @import resolution at startup

`@path/to/file` directives are expanded eagerly at launch. "Imported files are expanded and loaded into context at launch alongside the CLAUDE.md that references them... recursively, with a maximum depth of five hops" ([memory, "Import additional files"]). Relative paths resolve relative to the importing file, not the cwd. First-time external imports from outside the project trigger an approval dialog; decline once and they stay disabled silently. See section 12 for the full import resolution pipeline.

---

## 4. /compact interaction (PreCompact, PostCompact, re-injection)

### 4.1 What happens during /compact

From the context-window doc, "What survives compaction" table ([context-window]):

| Mechanism | After compaction |
| --------- | ---------------- |
| System prompt and output style | Unchanged; not part of message history |
| **Project-root CLAUDE.md and unscoped rules** | **Re-injected from disk** |
| **Auto memory (MEMORY.md)** | **Re-injected from disk** |
| Rules with `paths:` frontmatter | Lost until a matching file is read again |
| Nested CLAUDE.md in subdirectories | Lost until a file in that subdirectory is read again |
| Invoked skill bodies | Re-injected, capped at 5,000 tokens per skill and 25,000 tokens total; oldest dropped first |
| Hooks | Not applicable; hooks run as code, not context |

Two critical asymmetries emerge:

1. **Project-root CLAUDE.md survives but nested CLAUDE.md files don't.** If a monorepo has `/repo/packages/frontend/CLAUDE.md` loaded during steady state because Claude read a frontend file, then `/compact` drops it. It reloads only when Claude reads another frontend file.

2. **Skill listing vs invoked skill bodies.** The startup *listing* of skill descriptions is dropped after compact (it is rebuilt fresh at the cwd resolution), but invoked skill *bodies* are re-attached within a per-skill cap of 5,000 tokens and total cap of 25,000 tokens, oldest first.

### 4.2 Hook lifecycle around compaction

From the hooks doc:

**PreCompact** ([hooks, "PreCompact"]):
- Fires *before* context compaction begins.
- Matcher: `manual` or `auto`.
- **Can block** via exit code 2 or JSON `{"decision": "block", "reason": "..."}`. Blocking is intentional; the v2.1.105 changelog entry specifically added this. Use case: "Cannot compact now, background task still running."
- Input: `session_id`, `transcript_path`, `cwd`, `hook_event_name: "PreCompact"`, `trigger: "manual"|"auto"`.

**PostCompact** ([hooks, "PostCompact"]):
- Fires *after* compaction completes.
- Matcher: `manual` or `auto`.
- Cannot block (exit code ignored).
- Use for logging, cleanup, observability.

**InstructionsLoaded with `load_reason: "compact"`** ([hooks, "InstructionsLoaded"]):
- Fires during compaction for each instruction file that is re-loaded.
- Non-blocking, audit-only.
- This is how you observe exactly which files get re-injected after a compact event.

### 4.3 Five-minute confusion: does the Anthropic-side summary mention CLAUDE.md?

Issue #22085 ([GitHub, closed as duplicate, Jan 31 2026]) is the definitive primary source for the community confusion:

> When a session runs out of context and is continued via context compaction (automatic summarization), the global and project-level CLAUDE.md configuration files are not reloaded. This causes Claude to "forget" user preferences defined in these config files.

That bug report turns out to be *partially* wrong per the current docs: project-root CLAUDE.md is re-injected. The user's Chinese-language rule likely was in the *user* CLAUDE.md (`~/.claude/CLAUDE.md`), which the docs imply is re-injected along with project root, although the exact wording is "Project-root CLAUDE.md and unscoped rules". **GAP:** the context-window table does not disambiguate between project-root CLAUDE.md and user CLAUDE.md post-compact. The community experience in #22085 suggests user CLAUDE.md behavior has been inconsistent or was patched silently, but no official commit reference is visible.

---

## 5. cd / working directory change

Anthropic ships a dedicated hook for `cd`: **CwdChanged** ([hooks, "CwdChanged"]):

- Fires "when the working directory changes (e.g., when Claude executes a `cd` command)"
- No matcher, always fires
- Cannot block
- Input includes `previous_cwd` so you can diff the directory change
- Has access to `CLAUDE_ENV_FILE` for persisting env vars

**What CwdChanged does NOT do:** it does not re-walk the ancestor tree and load new CLAUDE.md files. The mechanism for a new subdirectory's CLAUDE.md to enter context is the *same* as for any other subdirectory: when Claude reads a file inside that subtree, the nested CLAUDE.md is lazy-loaded at that moment (`load_reason: "nested_traversal"` on InstructionsLoaded).

So the timing pattern is:

```
User: cd packages/frontend
  -> CwdChanged hook fires (previous_cwd=/repo, cwd=/repo/packages/frontend)
  -> No CLAUDE.md load yet
User: read button.tsx
  -> Claude opens the file
  -> InstructionsLoaded fires for /repo/packages/frontend/CLAUDE.md
     with load_reason: "nested_traversal"
  -> Now the nested file is in context alongside project-root CLAUDE.md
```

The original project-root CLAUDE.md remains in context; nothing evicts it on `cd`. In a long session with many `cd` jumps, nested CLAUDE.md files accumulate.

### 5.1 `--add-dir` and CLAUDE.md

By default, `--add-dir` grants file access but does *not* load CLAUDE.md from added directories. To opt in: `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1 claude --add-dir ../shared-config` ([memory, "Load from additional directories"]). This loads `CLAUDE.md`, `.claude/CLAUDE.md`, `.claude/rules/*.md`, and `CLAUDE.local.md` from the added path.

---

## 6. /memory commands (reference)

From the commands reference ([commands]):

| Command | Purpose |
| ------- | ------- |
| `/memory` | Edit CLAUDE.md memory files, enable or disable auto-memory, view auto-memory entries |
| `/init` | Initialize project with a CLAUDE.md guide. With `CLAUDE_CODE_NEW_INIT=1`, interactive multi-phase flow adds skills, hooks, personal memory |
| `/compact [instructions]` | Compact conversation with optional focus instructions |
| `/clear` | Start a new conversation with empty context (aliases: `/reset`, `/new`) |
| `/context` | Visualize current context usage as a colored grid |
| `/resume [session]` | Resume a conversation by ID or name (alias: `/continue`) |

The `/memory` command is the UI layer for CLAUDE.md + auto-memory. From the memory doc ([memory, "View and edit with /memory"]):

> The /memory command lists all CLAUDE.md, CLAUDE.local.md, and rules files loaded in your current session, lets you toggle auto memory on or off, and provides a link to open the auto memory folder. Select any file to open it in your editor.

There are **no documented subcommands** like `/memory add` or `/memory edit`. The `#` (hash) prefix was a previous quick-memory shortcut - several community sources ([dev.to/rajeshroyal], [threads.com/boris_cherny]) confirmed it existed in earlier 2024/2025 Claude Code versions, but by the current docs the recommended pattern is conversational ("ask Claude to update it", "add this to CLAUDE.md") or direct editor access via `/memory`. The 2026 memory docs do not list the `#` prefix.

### 6.1 What `/memory` does *not* do

Critically: **`/memory` does not force a re-read of CLAUDE.md mid-session**. Selecting a file opens it for editing. The in-memory copy Claude has is *not* updated until a re-injection event (compaction, new session). This is the root of the `/reload` feature request in Issue #17127 ([GitHub, closed as duplicate, Jan 9 2026]):

> When editing files in .claude/ (agents, settings, hooks), changes are not reflected until the session is exited and restarted. This creates friction during development.

The requested `/reload` / `/refresh` / `/config reload` does not exist. `/reload-plugins` exists (for plugins only, not CLAUDE.md). See section 11 for the runtime reload reality.

---

## 7. Token cost accounting

### 7.1 Raw token cost: approximately 1 token per 4 characters

Anthropic's published tokenization heuristic across Claude models is roughly 4 characters = 1 token for English, which for a well-written CLAUDE.md comes out to about 1.3 tokens per word. 1,000 words of CLAUDE.md therefore costs approximately **1,300 tokens**.

### 7.2 Context-window representative values

From the `/en/context-window` visualization (representative numbers, not user-specific):

- `~/.claude/CLAUDE.md` (global preferences): 320 tokens
- Project CLAUDE.md: 1,800 tokens
- Auto memory MEMORY.md: 680 tokens (capped at first 200 lines or 25KB)
- `.claude/rules/` unscoped rules: counted alongside CLAUDE.md
- Path-scoped rules example: 380 tokens each (`api-conventions.md`, `testing.md`)

**Combined "memory" cost at startup typically: 2.8k-3.2k tokens** in the representative example.

### 7.3 Baseline Claude Code startup cost

Issue #19105 ([GitHub, closed as duplicate]) measured an empty "hi" prompt against Claude Code and got **~53k tokens** before the conversation begins. Breakdown:

| Component | Tokens | % | Controllable? |
| --------- | ------ | --- | ------------ |
| System tools | 20,400 | 38% | No |
| Memory files (CLAUDE.md) | 10,000-18,000 | 19-34% | Yes |
| MCP tools | 9,100 | 17% | Partially |
| Custom agents | 3,300 | 6% | Yes |
| Skills | 2,600 | 5% | Yes |

The "memory files 10k-18k" is the loaded CLAUDE.md bundle (project + user + rules + imports). Anthropic's recommended ceiling for CLAUDE.md is **200 lines per file** ([memory, "Write effective instructions"]), "longer files consume more context and reduce adherence". 200 lines at ~10 words/line = 2,000 words = ~2,600 tokens per CLAUDE.md file.

### 7.4 Budget math

In a 200k context window:
- CLAUDE.md + rules + auto-memory = 3-18k tokens = 1.5-9%
- System tools + MCP + skills = ~35k tokens = ~17.5%
- Baseline startup "hi" = ~53k = ~26.5%
- Remaining for conversation: ~147k

In a 1M context window (available on Opus 4.7, Sonnet 4.6 via specific configurations):
- Same startup costs (absolute), just much smaller percentages (5.3%)

**When CLAUDE.md becomes a problem:** the 200-line guideline and the 10-18k memory-file budget suggest CLAUDE.md problems materialize around:
- **>200 lines / ~2.5k tokens per file** - Anthropic's stated threshold for "reduce adherence"
- **>50k tokens combined memory** (25% of 200k) - would severely crowd out conversation
- **>100k tokens memory + imports** (50% of 200k) - definite red zone

### 7.5 Shorter is better, not because of tokens but because of adherence

The memory doc repeatedly emphasizes that size *reduces adherence*: "Files over 200 lines consume more context and may reduce adherence." This is not just a cost argument; it is a behavioral argument. Mid-level abstractions in a 150-line file outperform dense 800-line files regardless of how much budget you have.

---

## 8. Prompt cache (5-min TTL) interaction

### 8.1 Cache structure

Per the Anthropic prompt-caching doc and community analysis:
> Claude Code places breakpoints more aggressively. It caches the system prompt, the tool definitions, the CLAUDE.md, and the conversation history up to the most recent messages.
> ([claudecodecamp.com, "How Prompt Caching Actually Works in Claude Code"])

CLAUDE.md sits *after* system prompt and tool definitions and *before* the conversation. It is part of the cached prefix.

### 8.2 TTL: 5 minutes (default since early March 2026)

Two Anthropic confirmations matter here:
- Default ephemeral cache TTL is 5 minutes ([Anthropic Claude API docs, prompt caching]).
- Issue #46829 documents that Claude Code silently changed default from 1 hour to 5 minutes sometime in early March 2026 ([GitHub]), confirmed by JSONL log analysis across Jan 11 - Apr 11 2026 by third parties ([recca0120.github.io, 2026-04-14]).

### 8.3 Cache invalidation by CLAUDE.md edit

> If any byte changes in that prefix, the cache misses.
> ([claudecodecamp.com])

A CLAUDE.md edit mid-session invalidates the cached prefix. On the next turn, the full CLAUDE.md block is uploaded as `cache_creation_input_tokens` at write rate (25% premium over standard input), not as `cache_read_input_tokens` at read rate (10% of normal price). Net cost of a single edit therefore spikes the next turn and then stabilizes (the new CLAUDE.md becomes the cached prefix once written).

Note: this only matters if Claude Code actually re-reads the CLAUDE.md mid-session, which per section 11 does *not* happen automatically. The interplay: an edit sits inert until a re-injection event, then costs you one cache-miss turn.

### 8.4 Cache and /compact

After `/compact`, the CLAUDE.md is re-read from disk and re-injected. This creates a *new* cached prefix. Existing cache entries associated with the pre-compact prefix are irrelevant (the whole prefix changed). Expect a cache-miss turn immediately after `/compact`.

---

## 9. Auto-compact interaction

Auto-compact triggers when the conversation approaches the context limit. The exact trigger threshold is not numerically documented in the memory/context-window docs, but the `/compact` mechanism is shared: auto-compact follows the same re-injection rules as manual `/compact`.

Matchers on PreCompact/PostCompact distinguish `manual` vs `auto`, so a hook can apply different logic:

```json
{
  "hooks": {
    "PreCompact": [
      {
        "matcher": "auto",
        "hooks": [{"type": "command", "command": "log-auto-compact.sh"}]
      },
      {
        "matcher": "manual",
        "hooks": [{"type": "command", "command": "confirm-manual-compact.sh"}]
      }
    ]
  }
}
```

What auto-compact "cuts": the conversation history (user + assistant turns + tool results) is summarized into a compressed narrative. The system prompt is untouched. The CLAUDE.md (project-root) and MEMORY.md are *rebuilt fresh from disk* post-compact, so they don't get compressed. Nested CLAUDE.md and path-scoped rules are dropped outright.

**Implication:** if you have important context that only exists in a nested CLAUDE.md and your session is long enough to auto-compact, that context disappears. Countermeasures:
- Move essential rules to project-root CLAUDE.md.
- Remove `paths:` frontmatter from a rule to make it unconditional.
- Use the `InstructionsLoaded` hook with `load_reason: "compact"` to verify what actually re-loaded post-compact.

---

## 10. Multi-session isolation

The docs make no explicit, centralized claim about multi-session isolation, but several adjacent facts triangulate the behavior:

1. **Per-session context window.** Each `claude` invocation has its own context window ([context-window] throughout).
2. **Per-session working directory.** Each session's cwd defines its own ancestor walk.
3. **Auto memory is per-project (git-repo-scoped) but shared across all worktrees.** "All worktrees and subdirectories within the same git repository share one auto memory directory. Files are not shared across machines or cloud environments" ([memory, "Storage location"]).

From these: **two parallel `claude` sessions in two different folders each load their own CLAUDE.md ancestor walk independently**. User CLAUDE.md (`~/.claude/CLAUDE.md`) is read by both since it's a shared file, but the *instances* of the loaded content are separate. Edits to `~/.claude/CLAUDE.md` by session A do not propagate to session B's in-memory context (see section 11).

Auto-memory sharing: if session A and session B are in the same git repo (even different worktrees), they share `~/.claude/projects/<project>/memory/MEMORY.md`. Changes from one session's auto-memory writes become visible to the other session only on MEMORY.md re-load (session start or compact). This is an undocumented race: concurrent writes to the same MEMORY.md from two sessions are not atomic-protected per the docs. **GAP:** Anthropic does not document concurrency semantics for auto-memory.

---

## 11. Runtime reload behavior

**The critical gap.** Editing CLAUDE.md during a session does **not** cause Claude to re-read it. Confirmed by:

1. **No /reload command exists.** Issues #17127 and #22085 both closed as duplicates, indicating known demand but no shipped solution.
2. **Skills have live change detection; CLAUDE.md does not.** The skills doc explicitly says: "Claude Code watches skill directories for file changes. Adding, editing, or removing a skill... takes effect within the current session without restarting" ([skills, "Live change detection"]). No equivalent language exists for CLAUDE.md.
3. **Memory re-loads only happen at two events:** session start, and `/compact` (which re-reads from disk).

### 11.1 What actually happens when you edit CLAUDE.md

```
t=0: session start, CLAUDE.md v1 loaded as user message
t=5: user edits CLAUDE.md, saves v2 to disk
t=6: user prompts Claude a new question
     -> Claude's in-memory context still has v1
     -> Claude follows v1 rules, not v2
t=7: user runs /compact
     -> conversation history summarized
     -> CLAUDE.md re-read from disk = v2
     -> PostCompact + InstructionsLoaded(reason=compact) fire
     -> v2 rules now in effect
```

### 11.2 Workarounds

- **`/compact`**: forces re-read. Cost: conversation history is summarized (lossy).
- **`/clear`**: starts fresh session. Cost: conversation lost (recoverable via `/resume`).
- **Restart**: exit + `claude` again. Clean but heavyweight.
- **`/compact with focus instructions`**: `/compact preserve the test file we're editing` - keeps pointed context.

Anthropic's recommended path for runtime changes is currently: finish current work, then `/compact` or start a new session. Not ideal for the agent-loop / swarm paradigm, but explicitly how the system is designed.

---

## 12. @import resolution (eager vs lazy)

### 12.1 Resolution rules

From [memory, "Import additional files"]:
- Syntax: `@path/to/import` anywhere in CLAUDE.md body.
- Both relative and absolute paths supported.
- **Relative paths resolve relative to the importing file**, not cwd.
- Recursive imports allowed.
- **Max depth: 5 hops.**
- All imports resolved **eagerly at launch** - "expanded and loaded into context at launch alongside the CLAUDE.md that references them."
- First-time external imports (outside project) trigger approval dialog. Decline once = silently disabled thereafter.

### 12.2 Is there a lazy option?

**No.** `.claude/rules/*.md` with `paths:` frontmatter is the lazy-loading pattern. `@import` in CLAUDE.md is always eager. To get lazy behavior, restructure:

```
# Before (eager, expensive):
@docs/api-conventions.md
@docs/testing-patterns.md
@docs/deployment-runbook.md

# After (lazy via .claude/rules/, cheaper):
# .claude/rules/api-conventions.md has `paths: ["src/api/**"]`
# .claude/rules/testing-patterns.md has `paths: ["**/*.test.ts"]`
# .claude/rules/deployment-runbook.md stays unscoped if always-on
```

### 12.3 Max depth failures

What happens past 5 hops is underspecified. The docs say "with a maximum depth of five hops" but do not say whether the error is silent-skip, warning, or hard fail. **GAP:** need runtime test to observe behavior. Reasonable guess based on general Anthropic patterns: hops beyond 5 are silently skipped with a warning in `--debug` output.

### 12.4 Import of home-directory files (multi-worktree trick)

> If you work across multiple git worktrees of the same repository, a gitignored CLAUDE.local.md only exists in the worktree where you created it. To share personal instructions across worktrees, import a file from your home directory instead:
> ```
> # Individual Preferences
> - @~/.claude/my-project-instructions.md
> ```
> ([memory, "Import additional files"])

This pattern effectively creates a user-scoped project overlay without polluting `~/.claude/CLAUDE.md`.

---

## 13. Gaps

Eight unresolved questions worth escalating to CRITIC:

1. **Ancestor-walk concatenation order.** Root-first (`/repo/CLAUDE.md` before `/repo/pkg/CLAUDE.md`) or cwd-first? Docs ambiguous. Test via `InstructionsLoaded` hook with timestamps.

2. **User CLAUDE.md behavior post-compact.** Context-window table says "Project-root CLAUDE.md... re-injected from disk" but never mentions user CLAUDE.md by name. Issue #22085's reproduction suggests user CLAUDE.md may *not* always re-inject. Status unclear in 2026-04.

3. **Managed policy CLAUDE.md post-compact.** Same question as #2 but for Managed tier. Not addressed in docs.

4. **`#` prefix deprecation status.** Community sources say it was removed; the current memory doc makes no mention. Confirm via changelog search.

5. **Max @import depth failure mode.** What happens at hop 6? Silent skip, warning, or error? Not documented.

6. **Auto-memory concurrency across sessions.** Two sessions writing to same MEMORY.md - atomic? Last-write-wins? Per-file locks? Not documented.

7. **Auto-compact numeric trigger threshold.** "When context fills up" is the only documented trigger. Specific percentage (80%? 90%?) is not stated. Community reports suggest auto-compact fires around 85-90% of context limit; no primary source confirms.

8. **Prompt-cache interaction with @import'd files.** If `@docs/x.md` is imported and `docs/x.md` is edited mid-session, does the cache break now (mid-session) or only at re-injection (next compact)? Inferred answer: only at re-injection, but not explicitly documented.

---

## 14. Bibliografia

### Primary sources (Anthropic-official)

1. **Memory docs.** https://code.claude.com/docs/en/memory (fetched 2026-04-17). Sections: "CLAUDE.md vs auto memory", "Choose where to put CLAUDE.md files", "Import additional files", "How CLAUDE.md files load", "Load from additional directories", "Organize rules with .claude/rules/", "Path-specific rules", "Manage CLAUDE.md for large teams", "Deploy organization-wide CLAUDE.md", "Exclude specific CLAUDE.md files", "Auto memory", "Storage location", "How it works", "View and edit with /memory", "Troubleshoot memory issues", "Claude isn't following my CLAUDE.md", "Instructions seem lost after /compact".

2. **Hooks reference.** https://code.claude.com/docs/en/hooks. Sections: "SessionStart", "SessionEnd", "InstructionsLoaded" (load_reason enum including "compact"), "CwdChanged", "PreCompact" (v2.1.105 block-by-exit-2), "PostCompact" (v2.1.76).

3. **Context window.** https://code.claude.com/docs/en/context-window. Sections: "What the timeline shows", "What survives compaction", "Check your own session".

4. **Commands reference.** https://code.claude.com/docs/en/commands. Entries: `/memory`, `/init`, `/compact`, `/clear`, `/context`, `/resume`, `/reload-plugins`, `/cost`.

5. **Skills.** https://code.claude.com/docs/en/skills. Sections: "Live change detection", "Skill content lifecycle".

6. **Interactive mode.** https://code.claude.com/docs/en/interactive-mode. Sections: "Quick commands" (noting `#` is absent from current docs), "Bash mode with ! prefix".

7. **Prompt caching.** https://platform.claude.com/docs/en/build-with-claude/prompt-caching (API docs; TTL defaults).

### Secondary sources

8. **GitHub Issue #22085** - "Feature Request: Auto-reload CLAUDE.md config files when session is continued from context compaction" (Jan 31, 2026, closed as duplicate). https://github.com/anthropics/claude-code/issues/22085

9. **GitHub Issue #17127** - "Feature Request: Add /reload command to refresh configuration without restarting session" (Jan 9, 2026, closed as duplicate). https://github.com/anthropics/claude-code/issues/17127

10. **GitHub Issue #19105** - "Feature Request: Lazy-Loading Architecture for Token Optimization (~70% reduction possible)" (closed as duplicate). Baseline 53k-token measurement for empty "hi" on Claude Code. https://github.com/anthropics/claude-code/issues/19105

11. **GitHub Issue #46829** - "Cache TTL silently regressed from 1h to 5m around early March 2026, causing quota and cost inflation". https://github.com/anthropics/claude-code/issues/46829

12. **GitHub Issue #45381** - "[BUG] Disabling telemetry also disables 1-hour prompt cache TTL". https://github.com/anthropics/claude-code/issues/45381

13. **Claude Code CHANGELOG.md.** https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md. Entries: v2.1.76 (PostCompact), v2.1.83 (CwdChanged, FileChanged), v2.1.105 (PreCompact block-by-exit-2).

14. **claudecodecamp.com** - "How Prompt Caching Actually Works in Claude Code". Cache prefix structure, byte-change invalidation, cost math (read=10% normal, write=125% normal).

15. **recca0120.github.io** (2026-04-14) - "I Scanned 95 Days of My Claude Code Logs and Found Anthropic's Second Silent Cache TTL Regression". JSONL log analysis covering Jan 11 - Apr 11 2026.

16. **dev.to/rajeshroyal** - "The # Prefix: Claude's Memory Feature (And Why You Don't Need It Anymore)". Historical context on the deprecated `#` shortcut.

17. **threads.com/boris_cherny** (Boris Cherny, Anthropic) - historical announcement of the `#` quick-memory feature.

18. **buildtolaunch.substack.com** - "Claude Code Token Optimization: Full System Guide (2026)". CLAUDE.md caching and 40% input-token reduction metric.

### Companion research (re-used from prior campaigns)

19. **Research/research-hooks-best-practices/research/R1_anthropic_official_docs.md** (campaign Hooks, 2026) - hook-event table including PreCompact, PostCompact, InstructionsLoaded with load_reason enum. Cross-referenced for consistency with current memory-doc loading semantics.

---

*End of R3. Word count target 3000-4500; actual ~4050 words (prose, excluding diagrams and tables). Gaps flagged for CRITIC review.*
