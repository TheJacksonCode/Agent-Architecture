# 02 DECISION GUIDE - When to Use What in Multi-Agent Claude Code

**Purpose:** Flowcharts and decision trees. Given a task, figure out the right mechanism, the right model, the right level of orchestration.

---

## Flowchart 1: Mechanism selection

```
I have a task that's not a simple one-line question.
Do I need parallel or async execution?
    |
    +-- NO, single-threaded is fine
    |     --> Stay in main session, use /commands or skills
    |
    +-- YES, something must happen without blocking my current work
          |
          +-- Is it a SHELL command that will EXIT eventually?
          |     |
          |     +-- YES, and I just need to know when it's done
          |     |     --> run_in_background: true (Bash parameter)
          |     |
          |     +-- YES, and I want to react to events in its output
          |           --> Monitor tool (v2.1.98+)
          |
          +-- Is it an AI task (not a shell command)?
                |
                +-- I want a summary back, no peer communication needed
                |     --> Task/Agent tool (spawn a subagent)
                |
                +-- I want multiple peer agents that can communicate
                      --> Agent Teams (enable CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1)
                      
                      But are we on:
                      - macOS with tmux or iTerm2? --> Split panes available
                      - Windows / VS Code terminal / Ghostty? --> In-process only
```

---

## Flowchart 2: Should I spawn a subagent at all?

```
Considering a subagent spawn.
Estimated size of work (in tokens): ___
    |
    +-- Is the work <5k tokens total?
    |     YES --> DO NOT SPAWN. Entry tax (20-50k) exceeds work.
    |             Do it inline in main session.
    |
    +-- Is the raw material to process >50k tokens?
    |     YES --> SPAWN. Subagent keeps main context clean.
    |             Return value should be a compressed summary.
    |
    +-- Does the main agent need to REASON DEEPLY about the result?
    |     YES --> Do NOT delegate understanding. Keep in main context.
    |             Even if it costs more, reasoning needs raw material.
    |
    +-- Is the task self-contained with a clear summary deliverable?
    |     YES --> SPAWN. This is the ideal subagent profile.
    |
    +-- Is the task decomposable into parallel independent subtasks?
    |     YES --> Consider Agent Teams for peer collaboration.
    |             Or 3-5 parallel subagents if no peer communication needed.
```

---

## Flowchart 3: Which model per agent?

```
I'm configuring a subagent / teammate definition.
What does this agent DO most of the time?
    |
    +-- Reads files, searches, greps, enumerates usages, extracts data
    |     --> model: haiku (or haiku-fast)
    |         Matches Sonnet quality for these tasks per benchmarks
    |         3-5x cheaper than Sonnet
    |
    +-- Writes code, edits files, runs tests, routine tool use
    |     --> model: sonnet
    |         Sweet spot for implementation work
    |
    +-- Plans architecture, synthesizes results, resolves conflicts,
    |   orchestrates other agents, reasons about tradeoffs
    |     --> model: opus
    |         Reserve for genuinely reasoning-heavy work
    |
    +-- Just doing whatever the main agent does
          --> DO NOT use inherit. That's how Opus leaks.
              Pick one of the above explicitly.
```

---

## Flowchart 4: How many agents in parallel?

```
Considering parallel agents.
How many independent tasks do I have?
    |
    +-- 1 task --> Don't parallelize. Single agent.
    |
    +-- 2 tasks --> 2 parallel. Minimum viable parallel.
    |
    +-- 3-5 tasks --> Sweet spot. 3-5 parallel.
    |
    +-- 6-10 tasks --> Narrow-and-deep. 2 leads each with 2-3 specialists.
    |                  Do NOT run 6-10 flat under one orchestrator.
    |
    +-- 10+ tasks --> Concurrent cap. At most 10 run, rest queue FIFO.
    |                 Use task-list decomposition in Agent Teams.
    |                 Expect significant orchestration overhead.
    |
    +-- Tasks not actually independent? --> SEQUENTIAL. Don't force parallel.
```

---

## Flowchart 5: Subagent vs Agent Teams?

```
I need multiple AI agents working on something.
    |
    +-- Do agents need to communicate with each other?
    |     |
    |     +-- NO, each just does their thing, lead synthesizes
    |     |     --> Subagents via Task tool (cheaper, simpler)
    |     |
    |     +-- YES, peer communication is core to the work
    |           --> Agent Teams + SendMessage
    |
    +-- Is this a persistent multi-session workflow?
    |     |
    |     +-- NO, single session, results back to main
    |     |     --> Subagents
    |     |
    |     +-- YES, long-running, user will interact with individual agents
    |           --> Agent Teams (despite /resume limitation)
    |
    +-- Can I afford 15x baseline token cost?
          |
          +-- YES, high-value outcome --> Agent Teams OK
          +-- NO --> Subagents only; or question multi-agent entirely
```

---

## Flowchart 6: Worktree or not?

```
Should I use a git worktree for this work?
    |
    +-- Am I on Windows?
    |     |
    |     +-- YES --> Avoid worktrees until #38287 closes.
    |     |          Use branch-per-session instead.
    |     |
    |     +-- NO (macOS / Linux) --> Continue below
    |
    +-- Is this work long-lived (>1 session, will be a PR)?
    |     |
    |     +-- NO, short exploration --> Don't worktree. In-session work.
    |     |
    |     +-- YES --> Worktree candidate. Continue below.
    |
    +-- Multiple agents working on different branches concurrently?
    |     |
    |     +-- YES --> Worktree per agent. One branch per worktree.
    |     |
    |     +-- NO --> Plain checkout sufficient.
    |
    +-- After work: ExitWorktree with action: keep or remove?
          |
          +-- Work merged and done --> action: remove
          +-- Might want to come back --> action: keep
```

---

## Flowchart 7: Do I need hooks?

```
Setting up multi-agent workflow. Considering hooks.
    |
    +-- Do I need a quality gate that blocks completion on test failure?
    |     YES --> TaskCompleted hook with exit code 2 on test failure
    |             (Agent Teams native quality gate)
    |
    +-- Do I need teammates to keep working until depth criterion met?
    |     YES --> TeammateIdle hook with exit code 2 and message
    |
    +-- Do I need logging/observability for subagent runs?
    |     YES --> SubagentStop hook (cannot block, write to log file)
    |
    +-- Do I need to inject coordination state when spawn happens?
    |     YES --> SubagentStart hook (can inject context, not block)
    |
    +-- Do I need to validate tool calls before they execute?
    |     YES --> PreToolUse hook (can block with exit 2)
    |
    +-- Do I need to validate worktree operations?
    |     YES --> WorktreeCreate hook (can block), WorktreeRemove (cannot)
    |
    +-- None of the above --> Don't add hooks. Simpler is better.
```

---

## Decision matrix: cost tiers

Rough cost per pattern, April 2026 pricing, Sonnet baseline.

| Pattern | Input tokens | Output tokens | $ estimate |
|---|---|---|---|
| Single-session chat | 10-50k | 2-10k | $0.05-$0.50 |
| Single agent with tools | 40-200k | 5-50k | $0.20-$2.00 |
| 3 subagents (advisor-tiered) | 120-600k | 20-150k | $0.60-$6.00 |
| 5 subagents all-Opus | 200k-1M | 50-300k | $2.50-$12.00 |
| 5-teammate Agent Teams run | 500k-2M | 100-500k | $2.50-$20.00 |
| Weekly heavy use (Max plan) | 10-50M | 2-10M | quota |
| Anthropic C compiler project | 2.14B | 140M | $20,000 over 2 weeks |

Reading the matrix: pick the cheapest pattern that meets the quality and independence requirements. Don't escalate prematurely.

---

## Decision matrix: quality vs independence

|  | Low independence | High independence |
|---|---|---|
| **Low quality required** | Single agent chat | Subagent (Haiku) |
| **High quality required** | Single agent chat (Opus) | Agent Teams with quality gates |

Example: a quick grep across the codebase doesn't need high quality or high independence. Single chat or Haiku subagent.

Example: root cause analysis for a production outage needs high quality AND independence from initial framing. Agent Teams with competing-hypotheses debate pattern, Opus on Critic.

---

## Decision matrix: platform support

| Mechanism | macOS | Linux | Windows (native) | Windows (WSL) |
|---|---|---|---|---|
| Main session | Full | Full | Full | Full |
| Subagents (Task tool) | Full | Full | Full | Full |
| `run_in_background` | Full | Full | Full (watch #11716) | Full |
| Monitor tool | Full | Full | Full | Full |
| Agent Teams in-process | Full | Full | Full (cycle with Shift+Down) | Full |
| Agent Teams split-pane | Full (tmux / iTerm2) | Full (tmux) | **Not supported** | Full (tmux) |
| Worktrees | Full | Full | **Risky (#38287)** | Full |

Rule: if you're on Windows native, skip split-pane and worktrees. Use WSL2 if you need the full feature set.

---

## When in doubt: the conservative defaults

If you're overwhelmed by choices, these defaults are safe:

- **Main session** for anything under 50k tokens of work
- **Single subagent** with `model: sonnet` and `tools` restricted for anything 50-500k tokens
- **3 parallel subagents** for anything that naturally decomposes into 3 independent pieces
- **Agent Teams** only when peer communication is essential AND you're on macOS
- **Worktrees** only for long-lived feature branches AND you're not on Windows native
- **Monitor** for anything that emits status over time (tests, builds, deploys, logs)
- **TaskCompleted hook** for any Agent Teams setup (quality gate)

You can always escalate. It's harder to un-complicate once you've built a multi-agent system.

---

## Red flags (when to stop and reconsider)

If any of these are true, reconsider your design:

- You're spawning more than 5 subagents per decision and it's not a dedicated research/review task
- Every subagent has `model: inherit` or `model: opus`
- Main agent context window is >70% full before spawn (bad compaction risk)
- Multiple subagents are editing the same files
- A subagent is "doing everything" for a vague goal
- You're polling in a loop instead of using Monitor
- You're on Windows and depending on tmux split panes
- You're using Agent Teams for a task that would work as subagents (extra 15x cost for peer communication you don't need)

---

**Next:** `03_MEDIA_PROMPTS.md` for video and infographic generation to accompany this material.
