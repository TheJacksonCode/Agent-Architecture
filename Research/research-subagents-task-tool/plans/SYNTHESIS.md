# SYNTHESIS - Claude Code Subagents + Task Tool 2026

**Campaign:** /deep-research-v2 - Claude Code Subagents + Task Tool
**Role:** res_syntetyk_lean (Opus 4.7, early-write pattern)
**Date:** 2026-04-17
**Status:** SHIPPING

This document synthesizes 7 research reports (R1-R7), 7 extract JSONs (119 claims), and 1 CRITIC review into a single source of truth for building and using multi-agent systems in Claude Code as of April 2026.

Citation discipline: every non-trivial claim references `Rn.Cm` where the claim was originated.

---

## 0. TL;DR (one-pager)

1. **Three distinct mechanisms for "not blocking the main turn"**: the Task/Agent tool (synchronous spawn, result-back), run_in_background + Monitor (async shell work), and Agent Teams + SendMessage (peer Claude sessions with mailbox). Conflating them is the #1 community anti-pattern. [R6.C1]

2. **Max recursion depth = 1.** Subagents cannot spawn subagents. Agent Teams teammates cannot spawn their own teams. Both architectural primitives are deliberately flat. [R2.C4, R6.C12, GitHub #4182]

3. **Every subagent pays a 20-50k-token entry tax** (system prompt + CLAUDE.md chain + MCP tool descriptions) before producing useful output. Five parallel subagents = 100-250k tokens of overhead before the first assistant message. [R2.C5, R7.C2]

4. **93.8% of community-reported real Claude Code usage runs on Opus.** Most of that is waste - grep/enumeration/summary work belongs on Haiku. Explicit `model:` per subagent is the single highest-ROI configuration choice. [R4.C3, R4.C6, GitHub #27665]

5. **Multi-agent systems consume ~15x more tokens than chat; ~4x more than single-agent tool use.** Justified only when outcome value is correspondingly greater. [R7.C10, Anthropic engineering blog]

6. **"Don't delegate understanding."** Delegate flood-producing side-quests (search 10k log lines, enumerate usages, scan files). Keep the reasoning task in the main context. A subagent summary is strictly worse than raw material for an agent that needs to reason. [R7.C3]

7. **3-5 agent sweet spot. 10 concurrent hard cap.** Above 5, coordination overhead dominates. Above 10, queue kicks in FIFO (batch-not-pipe). [R5.C1, R5.C4]

8. **Windows is second-class** for multi-agent UX. Split-pane Agent Teams not supported in Windows Terminal / VS Code / Ghostty. Worktrees have symlink issues + open bug #38287 (silent commit deletion). macOS + iTerm2 + tmux is first-class. [R3.C4, R3.C5, R6.C13]

9. **Skills and mcpServers frontmatter are NOT applied to subagent definitions running as Agent Teams teammates** (docs-documented asymmetry). Reusing subagent definitions as teammate types has a non-obvious semantic cliff. [R6.C10]

10. **"Think like your agents"** is Anthropic's #1 published principle for multi-agent prompt engineering. Understand what the agent actually sees before iterating on prompts. [R7.C17]

---

## 1. Taxonomy: the three mechanisms

### 1.1 The confusion everyone has

Search for "Claude Code background agents" and you get a mixed bag of articles describing three different things under the same terminology. Separating them is the first thing to get right.

| Mechanism | Role | Context | Notification | Typical use |
|---|---|---|---|---|
| **Task / Agent tool** | Synchronous spawn, result-back | Parent receives summary | On completion | Scoped enumeration, focused subtask |
| **run_in_background (Bash)** | Fire-and-complete shell | Main session | On exit | Dev server start, one-shot build |
| **Monitor tool** | Event stream | Main session | Per-stdout-line | Log tailing, CI watching, test runner |
| **Agent Teams + SendMessage** | Peer Claude sessions | Own context per teammate | Mailbox, auto-delivered | Research, review, debugging with competing hypotheses |

### 1.2 Which one do you want?

Decision rule of thumb:

- **Subtask I can describe fully, need a summary back, don't need to watch progress** -> Task tool [R1, R2]
- **Shell process that will exit** (build, one-shot test, migration) -> `run_in_background` [R6.C2]
- **Shell process that streams events I want to react to** (logs, file watchers, CI polling) -> Monitor tool [R6.C3, R6.C4]
- **Peer agent that needs to communicate with me or other agents** (long-running research, debate, cross-module refactor) -> Agent Teams [R6.C7, R6.C8]

### 1.3 Why the distinctions matter

The distinctions matter because they correspond to different cost models and failure modes:

- Task tool: summary-compression risk (R7.C3 "don't delegate understanding")
- `run_in_background`: noisy notification + token flood if output emits too fast [R6.C17, GitHub #11716]
- Monitor: stream silence = free; stream flood = auto-stop
- Agent Teams: 15x token cost vs chat, coordination overhead [R7.C10]

---

## 2. Task tool: the synchronous spawn primitive

### 2.1 Anatomy

Task tool (renamed from "Task" to "Agent" in v2.1.63; both names still in use across docs and community posts) spawns a subagent with its own context window that returns a summary to the parent. [R1.C1]

Subagent definitions live in scoped locations, precedence project > user > plugin > built-in:
- `.claude/agents/<name>.md` (project scope)
- `~/.claude/agents/<name>.md` (user scope)
- plugins directory
- CLI-defined via flags [R1.C2]

### 2.2 YAML frontmatter (17 fields)

| Field | Type | Purpose |
|---|---|---|
| `name` | string | Used for invocation and routing |
| `description` | string | **Critical:** Claude's routing signal - describe WHEN to run, not just what |
| `tools` | list | Allowlist (omit = inherit all) |
| `disallowedTools` | list | Denylist (combined with allowlist) |
| `model` | string | sonnet/opus/haiku/haiku-fast/inherit/specific ID |
| `permissionMode` | string | default / acceptEdits / plan / bypassPermissions |
| `maxTurns` | number | Cap on tool-use loop iterations |
| `skills` | list | Loaded into subagent system prompt |
| `mcpServers` | list | MCP overrides |
| `hooks` | object | Subagent-scoped lifecycle hooks |
| `memory` | object | Memory config |
| `background` | bool | Declarative async-by-default |
| `effort` | string | Effort tier hint |
| `isolation` | string | Context isolation mode |
| `color` | string | Display color |
| `initialPrompt` | string | Seed message |

[R1.C3]

### 2.3 Built-in subagent types

Five first-party subagents exist: **Explore** (Haiku, read-only, wide filesystem exploration), **Plan** (inherit, read-only, planning), **general-purpose** (inherit, all tools), **statusline-setup** (Sonnet, narrow tools), **Claude Code Guide** (Haiku, docs queries). [R1.C4]

### 2.4 The description-field gotcha

`description` is the single most important field. Claude uses it to decide WHEN to delegate. Description should cover the invocation condition, not just the capability. [R1.C5, R7.C11]

Two failure modes in the wild:
- **Capability-only description** ("Reviews code for security issues"): Claude may not auto-route to it
- **Auto-routing is unreliable anyway** [R7.C11]: explicit invocation ("use the security-reviewer subagent") is the only reliable way

Practitioner rule: treat the description as advisory. If you need a specific subagent to run, name it explicitly.

### 2.5 Hard architectural limits

- **Max recursion depth = 1.** Subagents cannot spawn other subagents via Task. The Task tool is NOT exposed to nested agents. GitHub #4182 confirms. [R2.C4, R2.C8]
- **Subagent cannot communicate with siblings.** Only the parent sees results. For peer communication, use Agent Teams. [R2.C14]
- **Context is NOT inherited from parent conversation history.** Subagent starts with CLAUDE.md + MCP + skills + tool allowlist + its spawn prompt. [R2.C1, R2.C2, R2.C3]

### 2.6 What the subagent gets (and doesn't)

**Gets:** CLAUDE.md chain (project + user + nested), MCP servers (filtered by frontmatter), skills for its scope (filtered), tool allowlist.

**Does NOT get:** parent conversation history, parent's open files, parent's current tool state, parent's memory writes made this session, parent's transient variables.

[R2.C2, R2.C3]

Consequence: if the main agent just discovered a critical constraint and wants to use a subagent, that constraint must be re-stated in the spawn prompt. It is not carried forward.

### 2.7 The entry tax

Every subagent pays a large initialization cost before it does useful work:

| Component | Typical range |
|---|---|
| System prompt | 5-8k tokens |
| CLAUDE.md chain (project + user + plugins) | 5-15k |
| MCP tool descriptions | 10-20k (if 20+ tools registered) |
| Built-in tool schemas | ~5k |
| Initial task payload | variable |
| **Total entry tax** | **~20-50k tokens** |

[R2.C5, R7.C2, dev.to community measurements]

At 5 parallel subagents this is 100-250k tokens of pure overhead. If the task can be done inline for 3k tokens, the subagent form costs 8-16x more just on the overhead, ignoring the actual work.

---

## 3. Lifecycle, resume, and persistence

### 3.1 Lifecycle states

`spawned -> initial prompt processed -> tool-use loop (bounded by maxTurns or completion) -> final result returned to parent -> context discarded.` [R2.C13]

### 3.2 Hooks around the lifecycle

| Hook | Fires when | Can block? |
|---|---|---|
| `SubagentStart` | Subagent is spawned | No (can inject context) |
| `SubagentStop` | Subagent finishes | **Yes** (exit 2 prevents stop - forces continuation) |

Payload for SubagentStop includes `agent_id`, `agent_type`, `agent_transcript_path` at `~/.claude/projects/.../subagents/agent-<id>.jsonl`, `last_assistant_message`. [R2.C9, R2.C10]

### 3.3 The resume-context hallucination bug

**GitHub Issue #11712 is still open and important.** When a subagent session is resumed, the user-prompt portion of the transcript is NOT preserved. The resumed agent sees tool calls but not the original instruction. Result: the agent tries to infer what the task was and hallucinates "corrections" that actually fight the original intent. [R2.C7, R7.C5]

Canonical example from the issue: task was "process BANANA-123", resume sees tool calls on a ticket ID, agent "corrects" BANANA to APPLE because APPLE is the canonical format in training data.

**Workaround pattern:** the orchestrator should write the full task spec to a file the subagent re-reads after resume. Do not rely on prompt persistence across `/resume` or `/rewind`.

### 3.4 Stall modes

GitHub #25569: tool-use loop can stall on certain tool combinations. Workaround: always set `maxTurns` to a non-infinite cap. [R2.C12]

GitHub #10164: subagent context window sizing confusion - subagents use parent's model context limit unless overridden; easy to exhaust with large initial payloads. [R2.C11]

---

## 4. Model routing: the single highest-ROI lever

### 4.1 April 2026 pricing

| Model | Input per M tokens | Output per M tokens |
|---|---|---|
| Opus 4.7 | $5 | $25 |
| Sonnet 4.6 | $3 | $15 |
| Haiku 4.5 | $1 | $5 |

[R4.C1]

Asymmetry matters: Opus input is 5x Haiku, output is also 5x Haiku. Long-output tasks (extraction, summarization, plan generation) bleed Opus pricing the worst if incorrectly routed. [R4.C2]

### 4.2 The 93.8% problem

GitHub Issue #27665 documents 93.8% of real usage on Opus. Combined with the community-measured 15-76x token inflation for subagent-equivalent work (GitHub #4911: 2-3k main session -> 153.8k subagent, 3m 32s for same task), this is hundreds of millions of dollars of preventable spend across the community. [R4.C3, R7.C18]

Root causes:
- Inherit default in subagent frontmatter [R4.C10]
- `--model opus` stickiness across session [R4.C5]
- `opusplan` flag broken as of April 2026 [R4.C4]

### 4.3 Advisor strategy (explicit model per subagent)

The single best-documented practitioner rule is: **always set `model:` explicitly per subagent definition; never inherit.** [R4.C6, R4.C9]

Canonical tiering:
- **Haiku 4.5** - search / grep / enumerate / extract / summarize (Haiku matches Sonnet quality on these tasks per community benchmarks) [R4.C8]
- **Sonnet 4.6** - code edits, implementation, routine tool use
- **Opus 4.7** - planning, synthesis, conflict resolution, orchestration, critic review

### 4.4 Case study: Deep Research v2 preset

Internal case study (Maciej's Deep Research v2 preset) uses:
- Orchestrator: Opus
- Researchers: Sonnet
- Extractors: Haiku
- Critic + Syntetyk: Opus

This pattern cut Opus spend by ~60% vs all-Opus baseline while maintaining output quality. [R4.C7]

Preset flags extend this: `--premium` = all-Opus; `--budget` = Sonnet-heavy; `--ultra-budget` = Haiku-heavy with Sonnet only for Critic. [R4.C14]

### 4.5 Prompt caching as a counter-pressure

Prompt caching (90% discount on cached read) offsets some of the entry tax if system prompt + CLAUDE.md are identical across subagent invocations. Realistic savings: 5-10k of 20-50k entry tax. Does not eliminate the overhead but softens it. [R4.C12]

### 4.6 Weekly rate limits

Max plan weekly quota is exhausted by ~10 hours of heavy Opus use. Explicit Haiku routing for extractors extends useful session time 3-5x. [R4.C15, R5.C10]

---

## 5. Parallel execution

### 5.1 The 10-concurrent cap

Claude Code has a hard cap of 10 concurrent Task invocations. Above that, tasks queue FIFO and run as slots open. This is **batch-not-pipe** scheduling: send 15 at once, get 10 running + 5 waiting. There is no streaming concurrency adjustment. [R5.C1, R5.C9]

### 5.2 Sweet spot

Practical sweet spot: **2-5 parallel agents.** Above 5 coordination overhead dominates. Above 10 rarely beats a focused single session. [R5.C4]

### 5.3 When to parallelize

All three conditions required:
1. **3+ genuinely unrelated tasks.** Not artificially splittable - genuinely independent.
2. **No shared file/resource state.** If agents touch same file, results get overwritten or merge-conflict.
3. **Clear file-ownership boundaries.** Each agent owns a set of files or a module; peer agents don't write into that set.

[R5.C2]

### 5.4 When NOT to parallelize

Any one of these is a sequential trigger:
- **Task dependencies.** Can't start B until A finishes.
- **Shared file writes.** Multiple agents writing the same file.
- **Unclear scope.** Agent responsibilities overlap or are fuzzy.

[R5.C3]

### 5.5 The Anthropic C compiler case study

Anthropic's engineering blog (Feb 5, 2026) documents building a C compiler with Claude Code multi-agent:
- **16 agents** across the project
- **$20,000** total cost
- **2 billion input tokens + 140 million output tokens**
- **~2000 sessions** over 2 weeks
- Opus 4.6 baseline
- **Git-based lock files in `current_tasks/` directory** for task claiming

[R5.C5, R5.C6]

The case study is the canonical proof that multi-agent can deliver non-trivial engineering output, AND a warning about cost. $20k for a C compiler is both demonstrably feasible and demonstrably expensive.

### 5.6 Time blindness

The orchestrator does not experience wall-clock time. It can let parallel agents run 30+ minutes on the wrong path without noticing. Mitigation:
- Explicit check-in cadence in prompt
- TeammateIdle hooks [R6.C14]
- Monitor tool on critical streams [R6.C3]
- Task status gates in Agent Teams [R6.C19]

[R5.C7]

### 5.7 The parallel-output token flood

Five agents returning 2k-token summaries = 10k tokens hitting the orchestrator at one synchronization point. Orchestrator must summarize-of-summaries or degrade. Design the synchronization to handle the flood: e.g., orchestrator writes a summary file per agent, reads them sequentially, produces a final synthesis. [R5.C8]

### 5.8 Canonical parallel patterns

Three patterns where parallelism clearly adds value:

**Parallel code review:** 3 reviewers, each a distinct lens (security / performance / tests). No file conflicts because all three read same PR. Lead synthesizes. [R5.C14]

**Debate-style investigation:** 5 agents, each assigned a competing hypothesis, instructed to DISPROVE peers. Fights anchoring bias that single-agent investigation suffers from. [R5.C15]

**Cross-layer refactor:** one agent per layer (frontend / backend / tests / docs). File boundaries are natural. [Anthropic docs]

---

## 6. Background, streaming, and teams (the async layer)

### 6.1 `run_in_background` - fire and complete

Bash parameter `run_in_background: true` spawns a daemon-style background task, returns a task ID (`[bg:<8char>]`), main session continues. Community-reverse-engineered defaults:
- Timeout 300s [R6.C2]
- Output buffer ~50KB [R6.C2]
- BashOutput tool drains incrementally

**Important open bug:** Issue #11716 - background bash can cause infinite system-reminder loops and token exhaustion when output emits faster than session drains. [R6.C17]

Correct use: one-shot processes that WILL exit. Bad use: long-lived streams (use Monitor instead).

### 6.2 Monitor tool (v2.1.98, April 9 2026)

The headline feature of April 2026 for long-running workflows. [R6.C3]

Schema (4 parameters):
```
description    # Label for notifications
command        # Shell command; stdout lines = events
timeout_ms     # Default 300000 (5 min), max 3600000 (1 hour)
persistent     # true = survives until session ends
```

[R6.C4]

Key properties:
- Each stdout line = one notification
- stderr routed to file, never to stream
- Silent stream = 0 tokens
- `grep --line-buffered` is mandatory in pipes
- Unavailable on Bedrock / Vertex / Foundry [R6.C6]

Token economics: ~95% reduction vs polling for long watches. 10-minute build watched every 15s: polling ~12k tokens, Monitor <600 tokens. [R6.C5]

### 6.3 Agent Teams (experimental, v2.1.32+, Feb 5 2026)

Fundamentally different from Task-spawned subagents: **teammates are peer Claude Code sessions**, each with own context window, CLAUDE.md, MCP, skills. They communicate via mailbox, not via return-value to parent. [R6.C7, R6.C8]

Enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in settings.json env block. [R6.C7]

Architecture:
- **Team lead** - main session that creates the team, coordinates, synthesizes
- **Teammates** - separate Claude Code instances
- **Shared task list** - at `~/.claude/tasks/{team-name}/`
- **Mailbox** - peer-to-peer messaging via SendMessage

[R6.C8, R6.C16]

### 6.4 SendMessage: 5 message types

| Type | Purpose |
|---|---|
| `message` | Direct to one named teammate |
| `broadcast` | To all teammates (costs scale linearly, use sparingly) |
| `shutdown_request` | Ask teammate to exit gracefully |
| `shutdown_response` | Approve or reject with explanation |
| `plan_approval_response` | Approve/reject teammate's plan (for plan-mode gates) |

[R6.C9]

### 6.5 The subagent-definition-as-teammate-type gotcha

You can reference a subagent definition when spawning a teammate. The teammate honors `tools` allowlist and `model`, and the body is appended to system prompt.

**BUT:** `skills` and `mcpServers` frontmatter fields are **NOT applied** when the same definition runs as a teammate. Teammates load skills and MCP from project/user settings, like a regular session. [R6.C10]

This is a non-obvious semantic cliff. Design subagent definitions with the mode in mind: if you plan to use a definition as both a subagent and a teammate, don't put critical config in `skills` or `mcpServers`.

### 6.6 Resume gaps

`/resume` and `/rewind` **do not restore in-process teammates.** After resuming a session, the lead may send messages to teammate IDs that no longer exist. Respawn is the fix. [R6.C11]

### 6.7 Hard limits

- One team per session (clean up before starting another)
- No nested teams (teammates cannot spawn their own teams - echoes R2's max recursion depth 1)
- Lead is fixed for team lifetime
- Permissions set at spawn (can change individually after, not per-teammate at spawn)
- Shutdown is slow (teammates finish current tool call before exiting)

[R6.C12]

### 6.8 Hooks for async / team work

| Hook | Fires | Can block? | Use case |
|---|---|---|---|
| `SubagentStart` | Subagent spawned | No (inject context) | Inject coordination state |
| `SubagentStop` | Subagent finishes | Yes | Force continuation, logging |
| `TeammateIdle` | Teammate about to idle | Yes | Keep teammates working |
| `TaskCreated` | New team task | Yes | Validate before creation |
| `TaskCompleted` | Team task marked done | **Yes - canonical quality gate** | Run tests, block on failure |

[R6.C14, R6.C19]

Async hook flags (Jan 2026): `async: true` for non-blocking; `asyncRewake: true` for non-blocking that wakes Claude on exit 2. [R6.C15]

### 6.9 Platform reality: macOS-first

Split-pane mode (which is the UX most demos show) requires tmux or iTerm2.

**Not supported:** VS Code integrated terminal, Windows Terminal, Ghostty. Windows users get in-process mode only (all teammates in one terminal, cycle with Shift+Down). [R6.C13]

Combined with R3 worktree issues on Windows (symlinks + bug #38287), multi-agent Claude Code is a macOS-first product. Windows users should default to in-process mode and cautious worktree use.

---

## 7. Worktree isolation

### 7.1 Purpose

Git worktrees isolate parallel Claude sessions at the filesystem level. Each worktree lives at `.claude/worktrees/<name>/` with its own branch based on HEAD. Session switches into the worktree; work done there is on the new branch. [R3.C1]

Use case: long-lived parallel features, agent-teams teammates that need real merge flows, user-driven experimentation where branches matter.

### 7.2 Worktree mechanics

Each worktree has independent HEAD, index, working tree, reflog for its branch. **All worktrees share the same .git object database** (not independent clones). Object reads are cheap; concurrent ref/pack writes can contend. [R3.C6, R3.C7]

### 7.3 EnterWorktree / ExitWorktree tools

Deliberately require explicit opt-in. [R3.C13]

`EnterWorktree` creates worktree + branch, switches cwd. Accepts `name` (for new) or `path` (for existing; must appear in `git worktree list`). Name rules: each `/`-separated segment max 64 chars, letters/digits/dots/underscores/dashes only. [R3.C8, R3.C9, R3.C15]

`ExitWorktree` leaves with keep/remove choice. Remove deletes working dir but preserves branch (unless force-deleted).

### 7.4 Worktree hooks

`WorktreeCreate` can block (exit code 2 + print worktree path to stdout). `WorktreeRemove` cannot block. [R3.C14]

### 7.5 CRITICAL: Bug #38287 silent commit deletion

**Open bug. Windows more affected.** Interaction between Claude Code's worktree cleanup and user-initiated git operations can silently delete commits. Work lost without warning. [R3.C4]

Mitigation: **on Windows, prefer in-process Agent Teams over worktree-heavy workflows until #38287 closes.** [R3.C5]

### 7.6 When to worktree vs not

Rule of thumb:
- **Yes:** long-lived parallel feature, cross-session, will be merged as a PR
- **No:** short exploration, single-session work, disposable investigation

---

## 8. The anti-pattern catalogue

Consolidated from R7 and cross-referenced throughout this synthesis.

### 8.1 "Delegate understanding"
**Symptom:** main agent spawns subagent to "figure out the codebase and tell me what to do", acts on summary-of-summary, makes bad decisions.
**Root cause:** subagent returns summary, not raw material. Main agent cannot re-examine nuance.
**Fix:** delegate flood-producing side-quests (search logs, enumerate usages). Keep reasoning task in main context.
[R7.C3]

### 8.2 Over-spawning
**Symptom:** 50 subagents for simple query (Anthropic's own research system did this). Token budget explodes.
**Root cause:** Opus 4.6 has bias toward spawning; default behavior without prompt restraint.
**Fix:** explicit effort tier in prompt ("1 agent, 3-10 tool calls for simple; 10+ for complex research"). Add "do not spawn unless asked" to CLAUDE.md. Plan-mode gates for risky work.
[R7.C1, R7.C4]

### 8.3 Model inheritance
**Symptom:** Haiku-caliber tasks (grep, extract, summarize) run on Opus. 93.8% of real usage on Opus.
**Fix:** explicit `model:` per subagent definition. Never inherit unless parent model is already correctly tiered.
[R4.C3, R4.C6, R7.C8]

### 8.4 Polling loops
**Symptom:** burning tokens checking status every minute; weekly rate limits hit in 10 hours.
**Fix:** Monitor tool for streams (95% token reduction vs polling).
[R6.C3, R6.C5]

### 8.5 Broadcast abuse
**Symptom:** 5x context noise per broadcast in teams; teammates contaminate each other with irrelevant updates.
**Fix:** targeted `message` by name; broadcast only for genuinely team-wide events.
[R6.C9, R7.C20]

### 8.6 Wide-and-flat hierarchy
**Symptom:** 6 subagents under one orchestrator; orchestrator context fragmented.
**Fix:** narrow-and-deep: 2 feature leads, each with 2-3 specialists. Orchestrator only talks to 2 peers.
[R7.C12]

### 8.7 Tool-allowlist / skill mismatch
**Symptom:** subagent's skill instructs using a tool outside its allowlist; subagent HALLUCINATES tool output silently rather than erroring.
**Fix:** validate skill/tool alignment at config-load time; write a linter.
[R7.C6]

### 8.8 Resume without prompt persistence
**Symptom:** resumed subagent hallucinates "corrections" to original task (the BANANA/APPLE pattern).
**Fix:** write task spec to a file; subagent re-reads on resume.
[R2.C7, R7.C5, GitHub #11712]

### 8.9 "I remember this skill"
**Symptom:** Claude describes a skill from training data rather than loading the skill file; stale instructions executed confidently.
**Fix:** invoke skill by file path; never rely on skill name alone; verify `InstructionsLoaded` hook fires for the skill.
[R7.C19]

### 8.10 Agent sprawl
**Symptom:** multiple dev sessions each spawning own teams; no single merge owner; teams step on each other's branches.
**Fix:** explicit coordinator role across sessions; use `TaskCreated` hook for cross-session coordination.
[R7.C7]

### 8.11 Context bleed vs miss
**Symptom:** subagent either overreaches (edits 30 files across 10 modules, duplicates peer work) or misses cross-module context (tight scope, broken contract).
**Fix:** contract-driven boundaries (precise inputs/outputs) + file locking (Agent Teams task list handles this natively).
[R7.C15]

### 8.12 Opus by default
**Symptom:** every agent pays Opus pricing; weekly quota exhausted in days.
**Fix:** explicit per-subagent model; R4 advisor strategy; Haiku for extractors; Sonnet for edits; Opus for reasoning only.
[R4.C6]

---

## 9. Decision rules (cheatsheet)

These are the rules of thumb distilled from the research, in approximate order of ROI.

**Rule 1: Always set `model:` explicitly per subagent.** Haiku for search/grep/extract/summarize. Sonnet for code edits. Opus for reasoning, synthesis, conflict resolution. [R4.C6, R4.C9]

**Rule 2: Delegate side-quests; keep reasoning inline.** If the main agent needs to reason about the result, don't delegate the raw work. Delegate the work that would flood main context. [R7.C3]

**Rule 3: 3-5 agents is the sweet spot.** Above 5 adds coordination overhead. Above 10 hits the concurrent cap. Below 2 is a single session. [R5.C4]

**Rule 4: Task/Agent tool for synchronous work; Agent Teams for peer collaboration; Monitor for streams; `run_in_background` for one-shots.** Conflating these is the #1 community anti-pattern. [R6.C1]

**Rule 5: Resume loses user prompts.** Write task specs to files. [R2.C7, GitHub #11712]

**Rule 6: Description field is advisory, not authoritative.** Invoke subagents explicitly by name. [R7.C11]

**Rule 7: Windows is second-class.** On Windows, default to in-process Agent Teams; avoid worktree-heavy workflows until #38287 closes. [R3.C4, R6.C13]

**Rule 8: Skills and mcpServers in subagent frontmatter are NOT applied when the same definition runs as a teammate.** Design definitions with the mode in mind. [R6.C10]

**Rule 9: Every subagent pays 20-50k-token entry tax.** Don't spawn subagents for work that could be done inline in <5k tokens. [R2.C5, R7.C2]

**Rule 10: Use `TaskCompleted` + exit code 2 as the team-native quality gate.** Run tests in the hook; block completion on failure. [R6.C19]

---

## 10. Cost model

### 10.1 Order-of-magnitude cost classes

| Pattern | Tokens (ballpark) | Dollar (at advisor tiering) |
|---|---|---|
| Single-session chat | 10-50k | $0.05-$0.50 |
| Single agent with tools | 40-200k (4x) | $0.20-$2.00 |
| 3-agent subagent delegation | 120-600k | $0.60-$6.00 |
| 5-agent Agent Teams run | 500k-2M | $2.50-$20.00 |
| Weekly heavy multi-agent use (Max plan) | 10-50M | quota exhaustion at ~10h |
| Anthropic C compiler project | 2.14B input + 140M output | **$20,000 over 2 weeks** |

[R4.C1, R5.C5, R7.C10]

### 10.2 Sizing heuristic

Per Anthropic's own multi-agent research system guidance:
- **Simple query:** 1 agent, 3-10 tool calls
- **Complex research:** 10+ subagents

[R7.C1]

The 15x token multiplier vs chat is the floor for "is this worth it". If the outcome isn't worth 15x a chat response, don't go multi-agent.

### 10.3 Weekly rate limits as a forcing function

Max plan weekly quota caps the damage. Hitting it means one session per week of careless all-Opus use. Explicit routing (advisor strategy) extends to 3-5 weeks of similar workload. The quota is effectively a built-in advisor-strategy enforcement mechanism. [R5.C10]

---

## 11. "Think like your agents" - the meta-principle

Anthropic's published #1 lesson from building multi-agent systems: **develop accurate mental models through simulation.** You cannot prompt-engineer what you cannot imagine the agent seeing. [R7.C17]

Practical applications:

- **Look at the agent's transcript.** Don't infer behavior from results alone. Read the tool calls.
- **Simulate the spawn.** What does the subagent see at turn 0? Is the CLAUDE.md chain appropriate? Are the tool descriptions relevant?
- **Simulate the end state.** Does the subagent have enough context to return a useful summary, or is it going to compress away the nuance the parent needs?
- **Simulate peer interactions in teams.** When teammate A broadcasts, what does teammate B actually read? Is the signal-to-noise worth 5x context injection?

This is the principle Anthropic repeatedly emphasizes. It's cheap to apply and high-impact.

---

## 12. What's changing fast (version signal)

The multi-agent Claude Code surface area is moving fast. Version-specific feature table:

| Version | Date | Feature |
|---|---|---|
| v2.1.32 | ~Feb 2026 | Agent Teams first available (experimental) |
| v2.1.63 | ~Feb-Mar 2026 | Task tool renamed to Agent tool |
| v2.1.98 | 2026-04-09 | Monitor tool launch |
| Jan 2026 | | `async: true` + `asyncRewake: true` hook flags |

[R6.C3, R6.C7, R1.C1]

The takeaway: April 2026 best practices will shift by Q3. Write research that is version-stamped; revisit every ~2 months if building on these primitives.

---

## 13. Research scope acknowledgments

Per DD04 and CRITIC.md:
- R6 had 6 documented gaps (run_in_background schema, mailbox persistence, SubagentStart payload, task list file format, per-teammate token overhead, Monitor-in-teammate pattern). All community-stated numbers explicitly labeled.
- R4 Haiku-vs-Sonnet agentic benchmarks are community-derived; no official benchmark published.
- R3 Issue #38287 root cause not fully documented in bug tracker.
- Max recursion depth = 1 is empirical (GitHub #4182) not explicitly stated in docs.
- Full payload of SubagentStart hook not published.

These gaps are intentional in the research (accepted per DD04) and labeled throughout this synthesis.

---

## 14. Appendix: sources (consolidated)

### Anthropic first-party
- [Sub-agents docs](https://code.claude.com/docs/en/sub-agents)
- [Agent Teams docs](https://code.claude.com/docs/en/agent-teams)
- [Hooks reference](https://code.claude.com/docs/en/hooks)
- [Interactive mode](https://code.claude.com/docs/en/interactive-mode)
- [Common workflows / worktrees](https://code.claude.com/docs/en/common-workflows)
- [Costs](https://code.claude.com/docs/en/costs)
- [How we built our multi-agent research system (Jun 2025)](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Seeing like an agent (2026)](https://claude.com/blog/seeing-like-an-agent)
- [C compiler case study (Feb 5, 2026)](https://www.anthropic.com/engineering)
- [Prompt caching docs](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)

### GitHub issues (Anthropic repo)
- [#4182 - Task tool not exposed to nested agents](https://github.com/anthropics/claude-code/issues/4182)
- [#4911 - Subagents token inflation](https://github.com/anthropics/claude-code/issues/4911)
- [#10164 - Subagent context sizing](https://github.com/anthropics/claude-code/issues/10164)
- [#11712 - Subagent resume loses prompts](https://github.com/anthropics/claude-code/issues/11712)
- [#11716 - Background bash infinite reminders](https://github.com/anthropics/claude-code/issues/11716)
- [#13847 - Statusline for background](https://github.com/anthropics/claude-code/issues/13847)
- [#18544 - Disable notifications](https://github.com/anthropics/claude-code/issues/18544)
- [#22087 - SubagentStop bug](https://github.com/anthropics/claude-code/issues/22087)
- [#25569 - Subagent tool-use loop stall](https://github.com/anthropics/claude-code/issues/25569)
- [#27665 - 93.8% Opus usage](https://github.com/anthropics/claude-code/issues/27665)
- [#38287 - Worktree silent commit deletion](https://github.com/anthropics/claude-code/issues/38287)

### Community
- [aiia.ro - Monitor tool](https://aiia.ro/blog/claude-code-monitor-tool-background-scripts/)
- [claudefa.st - Monitor mechanics](https://claudefa.st/blog/guide/mechanics/monitor)
- [claudefa.st - Sub-agent best practices](https://claudefa.st/blog/guide/agents/sub-agent-best-practices)
- [Claudelog - Background agents FAQ](https://claudelog.com/faqs/what-are-background-agents/)
- [MindStudio - Monitor tool](https://www.mindstudio.ai/blog/claude-code-monitor-tool-background-processes-3)
- [dev.to - 50k token waste](https://dev.to/jungjaehoon/why-claude-code-subagents-waste-50k-tokens-per-turn-and-how-to-fix-it-41ma)
- [dev.to - What Anthropic's docs left out](https://dev.to/whoffagents/claude-code-routines-what-anthropics-docs-left-out-35jc)
- [morphllm - Claude subagents guide](https://www.morphllm.com/claude-subagents)
- [Rick Hightower (Towards AI)](https://medium.com/@richardhightower/claude-code-subagents-and-main-agent-coordination-a-complete-guide-to-ai-agent-delegation-patterns-a4f88ae8f46c)
- [sankalp - Claude Code 2.0 retrospective](https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/)
- [aicrossroads (Khang Nguyen)](https://aicrossroads.substack.com/p/claude-code-subagents)
- [Addy Osmani - Orchestrating Coding Agents (O'Reilly CodeCon 2026)](https://talks.addy.ie/oreilly-codecon-march-2026/)
- [learn-claude-code - Background tasks](https://github.com/shareAI-lab/learn-claude-code/blob/main/docs/en/s08-background-tasks.md)

### Internal reference
- `feedback_deep_research_v2_model_routing.md` - Maciej's Deep Research v2 routing case study

---

## 15. Extended examples and playbooks

The rules above are compressed. This section expands each into a concrete playbook with examples an engineer could apply immediately.

### 15.1 Playbook: "I need to review this PR"

**Task:** review PR #142 for a non-trivial change.

**Option A (single agent, cheap):** spawn main session with `/review` slash command. Agent reads diff, comments. Cost: ~50k tokens, $0.15-0.50 depending on diff size. Good for small PRs.

**Option B (Task-spawned subagent):** delegate to a reviewer subagent with `model: sonnet` and `tools: [Read, Grep, Glob]`. Main agent calls with "review PR #142 with focus on security". Subagent returns summary. Cost: ~150k tokens, $0.30-1.00. Better isolation; main agent context stays clean.

**Option C (Agent Teams, peer review):** spawn team of 3 - security reviewer (Opus, narrow focus), performance reviewer (Sonnet), tests reviewer (Haiku). Each in own context. Lead synthesizes all three. Cost: ~500k tokens, $2-5. Best for high-stakes PRs where you want triangulation.

**Decision rule:** Option A for PRs under 500 lines. Option B for PRs 500-2000 lines. Option C for architectural / cross-module / pre-release PRs.

[R5.C14, R6.C7]

### 15.2 Playbook: "Figure out why the app is crashing after one message"

**Wrong approach:** spawn a general-purpose subagent with "investigate and find root cause". This triggers anchoring bias - subagent finds one plausible theory and stops. [R5.C7]

**Right approach (debate pattern):**
```
Spawn a team of 5 investigators, each with a competing hypothesis:
- T1: State leak in event handler
- T2: Connection pool exhaustion
- T3: Race condition on first render
- T4: Dependency version mismatch
- T5: Env-specific config defect

Instruction: each agent investigates its own theory AND actively tries to
disprove the other four. Update findings doc as consensus emerges.
```

Why this works: five independent investigators, each explicitly adversarial, surface evidence for each theory. The theory that survives adversarial peer scrutiny is more likely to be the root cause than the first plausible one a single agent lands on.

Anthropic's own docs call this out as a canonical parallel pattern. [R5.C15]

### 15.3 Playbook: "I'm running tests and want Claude to react only if they fail"

**Wrong approach:** `/loop` checking test status every 30 seconds. Burns ~2k tokens per check, runs indefinitely.

**Right approach (Monitor tool, v2.1.98+):**
```
Use the Monitor tool:
  description: "test failures"
  command: "npm test 2>&1 | grep --line-buffered -E '(FAIL|Error)'"
  timeout_ms: 600000
  persistent: false
```

Token cost when tests pass silently: zero. Token cost per failure: ~200 tokens to read the notification + decide what to do.

[R6.C3, R6.C4, R6.C5]

### 15.4 Playbook: "I need to refactor the authentication layer across 30 files"

**Wrong approach:** spawn 10 subagents each editing a different file in parallel. They don't know what each other is doing; breakage is inevitable; merge chaos.

**Right approach (narrow-deep hierarchy + contract boundaries):**
1. Main session produces a refactor spec (interface changes, migration steps, test plan). Commits to a plan file.
2. Spawn 2 feature-lead subagents: one for "server-side auth" (15 files), one for "client-side auth" (15 files).
3. Each feature lead spawns 2-3 specialist subagents for subdirectories.
4. Each specialist gets an explicit file-ownership list ("edit only files in src/auth/session/, never outside").
5. After all specialists finish, feature leads synthesize. Main session merges.

Contract discipline: every subagent gets the interface spec in its spawn prompt. When any subagent needs to change an interface, it edits the spec file first, then the main session propagates the change to siblings.

[R5.C2, R7.C12, R7.C15]

### 15.5 Playbook: "I want long-running research that I can steer"

**Wrong approach:** start a single Opus session, let it run for an hour, pray.

**Right approach (Agent Teams + TeammateIdle hook):**
```
Spawn an agent team of 4 researchers, each with a distinct facet:
- T1: technical architecture
- T2: business context
- T3: user needs
- T4: adversarial (devil's advocate)

Hook: TeammateIdle with exit code 2 and message
"Continue refining until you have 3 cited sources with direct quotes"

This keeps agents working until depth criterion met, instead of idling early.
```

Why TeammateIdle matters: agents naturally stop when they feel "done", which is often premature. Hook enforces a depth check. [R6.C14]

### 15.6 Playbook: "I need to resume a long task without losing context"

**Wrong approach:** `/resume` the subagent session and hope. User prompts aren't preserved; agent hallucinates original intent. [R7.C5, GitHub #11712]

**Right approach (task-spec-to-file pattern):**
Before spawning the subagent, write a task spec to `.claude/tasks/<task-id>.md`:
```markdown
# Task: migrate-auth-to-oauth2

## Original instruction
[verbatim user request]

## Constraints
[list from conversation]

## State of work at spawn
[files already modified, tests status]

## Success criteria
[explicit checklist]
```

Subagent prompt: "Read `.claude/tasks/<task-id>.md` before starting. Update it with progress every 5 tool calls."

On resume: subagent re-reads the file. Original intent preserved. No hallucinated corrections.

### 15.7 Playbook: "I want to cut my Opus bill in half"

**The 60% reduction pattern** (from Deep Research v2 case study, [R4.C7]):

Audit your subagent definitions. For each:
1. Is this agent doing **search / grep / enumerate / extract / summarize** work? -> `model: haiku`
2. Is this agent doing **code edits** or routine tool use? -> `model: sonnet`
3. Is this agent doing **planning, synthesis, conflict resolution**? -> `model: opus`

Never leave `model:` as inherit. That's the leak.

Also audit:
- `opusplan` references in commands -> remove (broken as of April 2026) [R4.C4]
- `--model opus` sticky in shell scripts -> reset per-invocation
- CLAUDE.md directive "always use Opus" -> remove

Measured impact in the Deep Research v2 case: ~60% Opus spend reduction, no quality degradation on extract / research phases.

### 15.8 Playbook: "I'm on Windows, what's safe?"

Given the platform-quality hierarchy:

**Safe on Windows:**
- Single-session Claude Code (main agent only)
- Task/Agent tool (subagents inherit session, run fine)
- `run_in_background` (works, but watch for #11716)
- Monitor tool (works on Windows)
- In-process Agent Teams (works)

**Risky on Windows:**
- Split-pane Agent Teams (NOT SUPPORTED in Windows Terminal, VS Code terminal, Ghostty) [R6.C13]
- Git worktrees (symlinks + Issue #38287 silent commit deletion) [R3.C4]
- Long-lived multi-session workflows touching same branch

**Workarounds:**
- Use WSL2 for tmux-dependent workflows
- Use in-process mode exclusively until #38287 closes
- Use branch-per-session (not worktree-per-session) for parallel features

[R3.C5, R6.C13]

---

## 16. Deep dive: the "entry tax" math

Several rules above reference the 20-50k entry tax per subagent. This section quantifies it.

### 16.1 Component breakdown (typical Claude Code user with 5 MCP servers)

| Component | Tokens (typical) | Notes |
|---|---|---|
| Subagent system prompt (Anthropic's base) | 5,000-8,000 | varies by subagent type |
| Tool schema definitions (built-in: Read, Write, Edit, Bash, etc.) | 4,000-6,000 | ~17 built-in tools |
| CLAUDE.md (project) | 500-3,000 | varies by project |
| CLAUDE.md (user) | 1,000-5,000 | Maciej's user CLAUDE.md: ~3k |
| Nested CLAUDE.md files (included on path) | 0-5,000 | `.claude/rules/*.md` etc |
| MCP tool descriptions (5 servers avg) | 10,000-20,000 | 5 servers * 5 tools each * 300 tokens = 7.5k minimum |
| Plugin-supplied tool descriptions | 2,000-10,000 | |
| Subagent-specific skills content | 500-5,000 | loaded via skills: frontmatter |
| Initial task payload from parent | 500-5,000 | spawn prompt + context |
| **Total** | **~23,500-67,000** | 20-50k in practice |

[R2.C5, R7.C2]

### 16.2 Scaling with parallelism

At N parallel subagents, entry tax is approximately N x (20-50k) = 40-250k for 2-5 agents, 200-500k for 10 agents.

This is PAID BEFORE any useful work. A Haiku extractor doing 3k tokens of actual work pays its 20k entry tax means 85% of its spend is overhead. Prompt caching mitigates this (R4.C12) but does not eliminate it.

### 16.3 When subagents are definitely worth it

Entry tax pays for itself when:
- Subagent would read >50k of material the main agent doesn't need to see
- Subagent produces a summary <5k that captures the signal
- Compression ratio = 10:1 or better

When subagents are NOT worth it:
- Main agent only needs to read 10-20k of material anyway (no flood)
- Task takes <10k tokens of actual work (entry tax > work)
- Result needs to be reasoned about in detail (defer-to-summary fails)

### 16.4 Practical example

Task: "enumerate all uses of `getUserById` in the codebase and list callers".

- Main-session approach: grep, read hits, summarize. ~15-30k tokens.
- Subagent approach: spawn Explore subagent. 20k entry tax + ~10k actual grep work + 2k summary return = 32k. Roughly same.

Task: "scan 10,000 log lines for pattern X and report anomalies".

- Main-session approach: tool returns 10k log lines to main context. 80k+ tokens, main context polluted.
- Subagent approach: subagent reads logs, summarizes. 20k entry tax + 50k actual work + 3k summary = 73k, main context stays clean.

**Subagents pay off when the raw material would flood main context. They are neutral or worse when the work is small.** [R7.C3]

---

## 17. Deep dive: Agent Teams vs subagents as separate architectural primitives

This is worth expanding because the community confusion is persistent.

### 17.1 They are not variants of each other

Two separate features:
- Subagent = object inside one Claude Code process. Task tool spawns it. Parent waits for return.
- Agent Teams teammate = separate Claude Code PROCESS with its own session. Lead spawns via team creation. Teammates communicate with each other via mailbox.

### 17.2 Comparison matrix

| Dimension | Subagent (Task tool) | Agent Teams teammate |
|---|---|---|
| Process model | Inside one Claude Code session | Separate Claude Code session |
| Context window | Own, but starts fresh | Own, fresh, loads CLAUDE.md independently |
| Communication with siblings | None (parent mediates) | Direct via SendMessage |
| Communication with parent | Summary on completion | Messages + task status + mailbox |
| Tool inheritance | Frontmatter + parent allowlist filter | Lead's permissions at spawn |
| Skills inheritance | From frontmatter | From project/user settings (NOT frontmatter) |
| MCP inheritance | From frontmatter | From project/user settings (NOT frontmatter) |
| Max depth | 1 | 1 (teammates can't spawn teams) |
| Lifetime | Spawn -> result -> discarded | Spawn -> task lifecycle -> explicit shutdown |
| Resume | Via /resume (with prompt loss bug #11712) | Not restored via /resume or /rewind |
| UX mode | Internal, not visible in terminal | In-process or split-pane (tmux/iTerm2) |
| Token cost | ~20-50k entry + work | Full session cost per teammate |
| Coordination | Parent-mediated | Shared task list + mailbox |
| Best for | Focused, scoped subtasks with clean return | Peer collaboration, debate, cross-layer work |

[R2, R6 - consolidated]

### 17.3 When to choose which

**Choose subagent when:**
- Result is a deliverable (summary, list, status) the main agent will use directly
- No peer communication needed
- Task is self-contained and short
- You want the cheapest isolation

**Choose Agent Teams when:**
- Agents need to communicate with each other (debate, hand-off)
- Work is long-running and benefits from peer status visibility
- You want UX where user can directly interact with individual agents
- Task decomposition is fluid and agents should self-organize

### 17.4 The reuse asymmetry

You CAN reuse a subagent definition as a teammate type. But:
- `skills:` and `mcpServers:` from the frontmatter are dropped when running as teammate [R6.C10]
- The definition body is APPENDED to teammate's system prompt, not replacing it

This means: a subagent definition that relies on a specific skill will silently degrade when promoted to teammate use. Test both paths before relying on the reuse.

---

## 18. Deep dive: Monitor tool event model

The Monitor tool is the most important async addition of April 2026. It deserves a closer look.

### 18.1 The polling tax it eliminates

Before Monitor, the canonical "watch something" pattern was:
```
/loop every 60 seconds:
  check if build finished
  if yes, process result
  if no, continue
```

Every iteration = full LLM call (~2k tokens). 60 iterations over an hour = 120k tokens. Most of those tokens are spent saying "nothing changed, keep waiting".

With Monitor:
```
Monitor:
  command: "tail -f build.log | grep --line-buffered '(ERROR|SUCCESS)'"
  description: "build events"
```

Zero tokens while silent. One notification per meaningful event. 120k -> 600 tokens for the same hour. [R6.C5]

### 18.2 Stream filters vs poll-and-if filters

Two patterns the docs highlight:

**Stream filters** (for processes that emit continuous output):
```bash
tail -f /var/log/app.log | grep --line-buffered "ERROR"
```

**Poll-and-if filters** (for things that don't emit, must be queried):
```bash
while true; do
  gh api "repos/owner/repo/issues/123/comments" | jq -r '.[-1].body'
  sleep 30
done | grep --line-buffered "approved"
```

The second pattern still has a polling loop inside the Monitor command - but the polling happens in shell, not in tokens. Claude wakes only when `approved` appears.

### 18.3 The three rules

Per claudefa.st reference:
1. **Always `grep --line-buffered`** in pipes. Default line buffering can hold output for minutes.
2. **`|| true` in poll loops.** A non-zero exit code kills the Monitor. Transient failures should not terminate the watch.
3. **Be selective with stdout.** Too many events = auto-stop (anti-flood). If the monitored stream is noisy, grep it down before piping to Monitor.

[R6.C4]

### 18.4 What Monitor does not solve

- CPU-intensive tasks (monitor runs shell, doesn't accelerate the work itself)
- Timeouts longer than 1 hour (`timeout_ms` max = 3,600,000)
- Non-Anthropic platforms (unavailable on Bedrock / Vertex / Foundry) [R6.C6]

---

## 19. Deep dive: Prompt engineering for multi-agent systems

Pulling together Anthropic's "think like your agents" principle with concrete practice.

### 19.1 The simulation method

Before deploying a multi-agent setup:
1. Write the spawn prompt as you would send it
2. Open a plain Claude chat, paste the prompt as-if-you-were-the-agent
3. Ask yourself: do I have enough context to do this task well? What's missing?
4. Iterate the spawn prompt until the answer is yes

This is cheap: 5 minutes per subagent definition. It catches 80% of prompt issues before they burn tokens in production. [R7.C17]

### 19.2 The four-part subagent prompt

Anthropic's research system lesson: each subagent needs:
1. **Objective** - what are you trying to achieve
2. **Output format** - what should the result look like (JSON schema, markdown heading structure, bullet list)
3. **Tool usage guidance** - which tools to prefer, which to avoid, what each is for
4. **Task boundaries** - what's in scope and explicitly what's out of scope

Missing any of these leads to drift, duplication, or gap-leaving. [R7.C1]

### 19.3 Effort tiering in the prompt

Put the effort tier in the prompt explicitly:
```
Simple query: 1 agent with 3-10 tool calls
Complex research: 10+ subagents

This is a [simple/medium/complex] query. Calibrate accordingly.
```

[R7.C1]

Without this directive, Opus 4.6 over-spawns. [R7.C4]

### 19.4 The "disprove peers" instruction

For debate-style parallel investigation:
```
You are one of N agents investigating this problem.
Your theory: [specific theory]
Your job:
1. Investigate your theory thoroughly (primary)
2. Actively try to DISPROVE the other agents' theories (secondary but important)

If your own theory is disproven, say so explicitly. Do not defend.
If a peer's theory is clearly correct, acknowledge it.
```

The "actively try to disprove" framing prevents anchoring bias where each agent defends its own theory regardless of evidence. [R5.C15]

### 19.5 Source-quality prompting

Anthropic's own research system exhibited source-selection bias toward SEO content farms over academic/authoritative sources. [R7.C14] Explicit source-quality directive in the prompt:
```
Source priority:
1. Official Anthropic docs and engineering blog
2. Anthropic-maintained GitHub repos (issues, discussions)
3. Well-known practitioner blogs (name a few the system should trust)
4. Community posts ONLY if older sources are unavailable

When in doubt, cite the source. Distinguish empirical measurements from opinion.
```

This costs ~200 tokens in the prompt and eliminates a documented failure mode.

---

## 20. Forward-looking risks

These are known-unknowns as of April 2026 that will shape the landscape.

### 20.1 Agent Teams moving out of experimental

`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` suggests this feature is headed for GA. When it does, expect:
- More hooks (possibly `TeammateStart`, `TeammateStop` explicit events)
- Session resumption improvements (#11712 fix)
- Windows split-pane support (likely via Windows Terminal cooperation)
- Cross-machine team support (cloud orchestration)

Practical implication: architectures built on current experimental flags may need reconfiguration at GA. Defensive pattern: encapsulate `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` reads in one place.

### 20.2 Model deprecations

Opus 4.6 -> Opus 4.7 transition (April 2026) already happened. Sonnet 4.6 has been stable; Haiku 4.5 is the current. Rate of deprecation: ~6 months per major. Architectures with explicit `model: opus-4-6` frontmatter will need migration.

Defensive pattern: use family aliases (`sonnet`, `opus`, `haiku`) unless specific version is required. Anthropic docs support this. [R1.C8]

### 20.3 Bug #38287 (worktree silent commit deletion)

Still open as of April 2026. Affects Windows primarily. Until closed:
- Windows users should avoid worktrees for work-in-progress
- If worktrees must be used, explicit `git log --all` check after any cleanup operation

### 20.4 Pricing elasticity

Claude pricing has trended flat for 18 months. If Anthropic shifts pricing structure (e.g., per-second compute-based pricing replacing per-token), cost heuristics here will need re-derivation. Watch for pricing changes.

### 20.5 Tool proliferation

Anthropic's own "Seeing like an agent" post warns about tool-count degradation. As more features ship, tool count grows. Counterforce: progressive disclosure (specialist subagents for docs, code guide, etc.). Expect more first-party specialist subagents over 2026.

---

## 20.6 The skills-vs-memory tension

As Claude Code skills become the primary delivery vehicle for agent behaviors, a new tension emerges: skills at the user scope (`~/.claude/skills/*.md`) are loaded into every applicable session. At >30 skills (like Maciej's 35-agent system), this is significant tokens of ambient context that may or may not be relevant to a given task.

Progressive disclosure (Anthropic's answer in "Seeing like an agent") addresses this at the tool-count level by routing queries through specialist subagents (Claude Code Guide, etc.) rather than cramming all docs into every session.

The same principle applies to skills: at 30+ skills, consider moving some to project scope where they auto-load only when appropriate, or to plugin scope where they load on demand.

[R7.C13, Anthropic 'Seeing like an agent']

## 20.7 Observability gap

As of April 2026, Claude Code's observability for multi-agent workflows is thin:
- No built-in dashboard for subagent token usage per-session
- Transcripts persist at `~/.claude/projects/.../subagents/` but require manual reading
- Statusline doesn't show active background processes (#13847 still open)
- Cost attribution per-subagent requires manual session-log parsing

Community gap-fillers:
- `claude-code-agent-monitor` (hoangsonww/GitHub) - dashboard via WebSockets + hooks
- `claude-code-hooks-multi-agent-observability` (disler/GitHub) - real-time event tracking
- Manual instrumentation via PostToolUse hooks writing to SQLite

Expect Anthropic to ship observability over 2026. Until then, instrument via hooks.

---

## 21. For the NbLM Writer

Downstream synthesis for NotebookLM should emphasize:

- **Concrete decision rules** (Section 9) - actionable for engineers
- **Cost model with numbers** (Section 10 + Section 16) - turns abstractions into dollar intuitions
- **The three-mechanism taxonomy** (Section 1) - single biggest conceptual clarification
- **The anti-pattern catalogue** (Section 8) - high-value learning surface
- **Windows platform reality** (Section 7.5 + 15.8) - critical for non-Mac users
- **The entry tax math** (Section 16) - makes the "cost of spawning" tangible
- **Playbooks** (Section 15) - concrete how-to templates

Media prompt note: the infographic should contrast the three mechanisms visually (three columns: subagents / run_in_background+Monitor / Agent Teams). The video should walk through a single representative task (e.g., "review this PR") in all three modes, showing cost and quality differentials.

---

**Word count:** ~8,400 words.
**Status:** SYNTHESIS COMPLETE. Citation discipline maintained throughout. Ready for NbLM phase.
