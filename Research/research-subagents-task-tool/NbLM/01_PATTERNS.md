# 01 PATTERNS - Playbooks and Anti-patterns for Multi-Agent Claude Code

**Purpose:** Concrete how-to playbooks and the anti-pattern catalogue. Readers come here after `00_FUNDAMENTALS.md` to learn practical application.

---

## Part 1: Playbooks

Eight concrete playbooks covering the most common multi-agent situations. Each is tested against the research corpus and framed as "when X is the task, do Y".

### Playbook 1: Reviewing a pull request

**Single-agent mode (small PRs, <500 lines):**
Run `/review` in main session. Agent reads diff, comments. Cost: ~50k tokens, $0.15-$0.50. Fast, sufficient for routine PRs.

**Subagent delegation (medium PRs, 500-2000 lines):**
Delegate to a reviewer subagent with `model: sonnet` and tools restricted to Read/Grep/Glob. Main agent calls "review PR #142 with security focus". Subagent returns summary. Main context stays clean. Cost: ~150k tokens, $0.30-$1.00.

**Agent Teams mode (architectural PRs, cross-module):**
Spawn three peer reviewers: security (Opus, narrow focus), performance (Sonnet), tests (Haiku). Each independent. Lead synthesizes. Cost: ~500k tokens, $2-$5. Best for high-stakes PRs where triangulation matters.

Decision rule: match effort to PR size and stakes.

### Playbook 2: Debugging with competing hypotheses

**The wrong approach:** spawn a single general-purpose subagent with "investigate and find root cause". Single agents suffer from anchoring bias - they find one plausible theory and stop looking.

**The right approach (debate pattern):**
Spawn a team of 5 investigators, each with a competing hypothesis:
- T1: state leak in event handler
- T2: connection pool exhaustion
- T3: race condition on first render
- T4: dependency version mismatch
- T5: env-specific config defect

Instruction to each:
> You investigate your theory AND actively try to disprove the other four. If your theory is disproven, say so explicitly. Do not defend.

Why this works: five independent investigators, each explicitly adversarial, surface evidence for each theory. The theory that survives adversarial peer scrutiny is more likely to be the actual root cause.

This is a canonical Anthropic-documented pattern.

### Playbook 3: Watching tests/builds without polling

**Wrong approach:** `/loop` checking test status every 30 seconds. Burns ~2k tokens per check. 60 iterations over an hour = 120k tokens, mostly saying "nothing changed".

**Right approach (Monitor tool, v2.1.98+):**
```
Use the Monitor tool:
  description: "test failures"
  command: "npm test 2>&1 | grep --line-buffered -E '(FAIL|Error)'"
  timeout_ms: 600000
  persistent: false
```

Token cost when tests pass silently: zero. Token cost per failure: ~200 tokens. Total for a 1-hour watch: 120k -> ~600 tokens. 95% reduction.

### Playbook 4: Cross-module refactor (30 files across auth layer)

**Wrong approach:** spawn 10 subagents in parallel, each editing a different file. They don't know what the others are doing. Breakage is inevitable. Merge chaos.

**Right approach (narrow-and-deep + contracts):**

1. Main session produces a refactor spec (interface changes, migration steps, test plan). Commits to a plan file.
2. Spawn 2 feature-lead subagents: one for server-side auth (15 files), one for client-side auth (15 files).
3. Each feature lead spawns 2-3 specialist subagents for subdirectories.
4. Each specialist gets an explicit file-ownership list ("edit only files in `src/auth/session/`, never outside").
5. Feature leads synthesize. Main session merges.

Contract discipline: every subagent gets the interface spec in its spawn prompt. When any subagent needs to change an interface, it edits the spec file first; main session propagates to siblings.

This is the narrow-and-deep hierarchy Rick Hightower describes in his delegation guide: two feature leads, each with 2-3 specialists, is strictly better than six subagents under one orchestrator.

### Playbook 5: Long-running research with steering

**Wrong approach:** start a single Opus session, let it run for an hour, hope for the best.

**Right approach (Agent Teams + TeammateIdle hook):**

Spawn a team of 4 researchers, each with a distinct facet:
- T1: technical architecture
- T2: business context
- T3: user needs
- T4: adversarial (devil's advocate)

Configure a TeammateIdle hook:
```
When teammate about to idle:
  exit code 2 with message
  "Continue refining until you have 3 cited sources with direct quotes"
```

Why: teammates naturally stop when they feel "done", which is often premature. The hook enforces a depth criterion before idle. Teammate keeps working until 3 sources cited.

### Playbook 6: Resuming a long task without prompt loss

**Wrong approach:** `/resume` the subagent session and hope. User prompts are NOT preserved (GitHub bug #11712 still open). Agent hallucinates original intent.

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

Subagent prompt: "Read `.claude/tasks/<task-id>.md` before starting. Update progress every 5 tool calls."

On resume: subagent re-reads the file. Original intent preserved. No hallucinated corrections.

### Playbook 7: Cutting Opus spend by 60%

The Deep Research v2 routing strategy. Proven in production to cut Opus spend by ~60% vs all-Opus baseline.

Audit every subagent definition. For each:
- Search / grep / enumerate / extract / summarize work? -> `model: haiku`
- Code edits / routine tool use? -> `model: sonnet`
- Planning / synthesis / conflict resolution? -> `model: opus`

Never leave `model:` as inherit. That's the leak that lets Opus into Haiku-caliber tasks.

Also audit:
- Any `opusplan` references in commands -> remove (broken as of April 2026)
- Any `--model opus` sticky in shell scripts -> reset per-invocation
- Any CLAUDE.md directive "always use Opus" -> remove

Measure weekly: if Max plan quota lasts 3-5 weeks instead of 1, you're winning.

### Playbook 8: Windows multi-agent survival

**Safe on Windows:**
- Single-session Claude Code
- Task/Agent tool subagents (work fine)
- `run_in_background` (watch for #11716 infinite reminder bug)
- Monitor tool (works on Windows)
- In-process Agent Teams (all teammates in one terminal, Shift+Down)

**Risky on Windows:**
- Split-pane Agent Teams (NOT SUPPORTED in Windows Terminal, VS Code terminal, Ghostty)
- Git worktrees (symlinks + silent commit deletion #38287)
- Long-lived multi-session workflows touching the same branch

**Workarounds:**
- Use WSL2 for tmux-dependent workflows
- Stick with in-process Agent Teams mode
- Use branch-per-session (no worktree) for parallel features

---

## Part 2: The anti-pattern catalogue

Twelve anti-patterns that recur in the community. For each, the symptom, the root cause, and the fix.

### AP-01: Delegate understanding

**Symptom:** main agent spawns subagent to "figure out the codebase and tell me what to do". Main agent acts on summary-of-summary. Makes bad decisions because nuance was compressed out.

**Root cause:** subagent returns summary, not raw material. Main agent cannot re-examine nuance after the fact because the subagent's context is gone.

**Fix:** delegate flood-producing side-quests (search 10k log lines, enumerate usages, scan files). Keep the reasoning task in the main context. A subagent summary is strictly worse than raw material for an agent that needs to reason deeply.

Source: Anthropic engineering blog (April 2026); morphllm community guide.

### AP-02: Over-spawning

**Symptom:** 50 subagents for a simple query. Token budget explodes. Weekly quota hit in hours.

**Root cause:** Opus 4.6 has a documented statistical bias toward spawning subagents even when not needed. Default behavior without prompt restraint is over-spawn.

**Fix:**
- Explicit effort tier in prompt: "simple query = 1 agent with 3-10 tool calls; complex research = 10+ subagents; this is a [simple] query"
- Add "do not spawn subagents unless explicitly asked" to CLAUDE.md
- Use plan-mode gates for risky work (teammate plans, lead approves)

Source: Anthropic's own research system went through this; documented in their June 2025 engineering blog.

### AP-03: Model inheritance

**Symptom:** Haiku-caliber tasks (grep, extract, summarize) run on Opus. 93.8% of real community usage on Opus (GitHub #27665).

**Fix:** explicit `model:` per subagent definition. Never inherit unless parent is already correctly tiered. Canonical tiering: Haiku for search/grep/extract/summarize, Sonnet for code edits, Opus for reasoning and synthesis only.

### AP-04: Polling loops

**Symptom:** burning tokens checking status every minute; weekly rate limits hit in 10 hours.

**Fix:** Monitor tool for streams. 95% token reduction vs polling for long watches. For non-streaming checks, use poll-and-if filter pattern inside Monitor's command (polling in shell, not in tokens).

### AP-05: Broadcast abuse

**Symptom:** in Agent Teams, using `broadcast` for everything. Each broadcast = 5x context injections at 5 teammates = 5x the work per message.

**Fix:** targeted `message` by teammate name. Reserve `broadcast` for genuinely team-wide events (schema changes, emergency stop, etc.).

### AP-06: Wide-and-flat hierarchy

**Symptom:** 6 subagents under one orchestrator. Orchestrator context fragments across 6 simultaneous threads.

**Fix:** narrow-and-deep: 2 feature leads, each with 2-3 specialists. Orchestrator only talks to 2 peers. Keep each level's fan-out at 2-3.

Source: Rick Hightower, Towards AI.

### AP-07: Tool-allowlist / skill mismatch

**Symptom:** subagent's skill instructs using a tool outside its `tools:` allowlist. Subagent HALLUCINATES tool output silently rather than erroring.

**Fix:** validate skill/tool alignment at config-load time. Write a pre-commit hook that parses subagent definitions and flags mismatches. This is a correctness bug masquerading as working behavior.

Source: dev.to routines post-mortem.

### AP-08: Resume without prompt persistence

**Symptom:** resumed subagent hallucinates "corrections" to original task. Example from GitHub #11712: task was "process BANANA-123", resume sees only tool calls, agent "corrects" BANANA to APPLE because APPLE is canonical in training data.

**Fix:** write task spec to a file before spawning. Subagent re-reads on resume. Do not rely on prompt persistence across `/resume` or `/rewind`.

### AP-09: "I remember this skill" trap

**Symptom:** Claude describes a skill from training data rather than loading the skill file. Stale instructions executed with high confidence.

**Fix:** invoke skills by file path reference. Verify `InstructionsLoaded` hook fires for the skill. Don't rely on skill name alone.

Source: sankalp's Claude Code 2.0 retrospective blog.

### AP-10: Agent sprawl

**Symptom:** multiple dev sessions across the team, each spawning its own Agent Teams, no single merge owner, teams step on each other's branches.

**Fix:** explicit coordinator role across sessions. Use `TaskCreated` hook to enforce cross-session coordination (e.g., prevent creation of a task with filename that's already claimed elsewhere).

Source: Addy Osmani, O'Reilly CodeCon 2026.

### AP-11: Context bleed vs miss

**Symptom:** subagent either overreaches (edits 30 files across 10 modules, duplicates peer work) or misses cross-module context (tight scope, broken contract).

**Fix:** contract-driven boundaries (precise inputs/outputs specified upfront) + file locking (Agent Teams task list handles file claiming natively).

### AP-12: Opus by default

**Symptom:** every agent pays Opus pricing. Weekly quota exhausted in days.

**Fix:** explicit per-subagent model. The advisor strategy (Haiku extractors, Sonnet edits, Opus for reasoning) is the single highest-ROI configuration choice in Claude Code as of April 2026.

---

## Part 3: Decision rules (cheatsheet)

The 10 rules of thumb, in approximate order of ROI.

1. **Always set `model:` explicitly per subagent.** Haiku for search/extract/summarize. Sonnet for code edits. Opus for reasoning. Never inherit.

2. **Delegate side-quests; keep reasoning inline.** If the main agent needs to reason about the result, don't delegate the raw work. Delegate only what would flood main context.

3. **3-5 agents is the sweet spot.** Above 5 adds coordination overhead. Above 10 hits the concurrent cap (FIFO queue kicks in).

4. **Task/Agent for synchronous work; Agent Teams for peer collaboration; Monitor for streams; run_in_background for one-shots.** Don't conflate these.

5. **Resume loses user prompts.** Write task specs to files so they persist across resume.

6. **Description field is advisory, not authoritative.** Invoke subagents explicitly by name in user messages.

7. **Windows is second-class.** Default to in-process Agent Teams; avoid worktree-heavy workflows until bug #38287 closes.

8. **Skills and mcpServers in subagent frontmatter are NOT applied when that same definition runs as a teammate.** Design definitions with the mode in mind.

9. **Every subagent pays 20-50k-token entry tax.** Don't spawn for work that could be done inline in <5k tokens.

10. **Use `TaskCompleted` + exit code 2 as the team-native quality gate.** Run tests in the hook; block completion on failure.

---

## Part 4: Prompt engineering micro-patterns

Small prompt patterns that catch common failure modes.

### Four-part subagent spawn prompt

Every subagent needs:
1. **Objective** - what are you trying to achieve
2. **Output format** - what should the result look like (JSON, markdown structure, bullet list)
3. **Tool usage guidance** - which tools to prefer, which to avoid
4. **Task boundaries** - what's in scope and what's explicitly out of scope

Missing any of these leads to drift, duplication, or gap-leaving.

### Effort tier directive

Put in every spawn prompt:
```
This is a [simple / medium / complex] task.
Simple = 1 agent with 3-10 tool calls.
Medium = 2-3 agents, bounded delegation.
Complex = 5+ agents, full orchestration.
Calibrate your approach accordingly.
```

Without this, Opus over-spawns.

### Source-quality directive

For research-style subagents:
```
Source priority:
1. Official Anthropic docs and engineering blog
2. Anthropic-maintained GitHub repos
3. Named trusted practitioner blogs (list them)
4. Community posts only if older sources are unavailable

Cite all sources. Distinguish empirical measurements from opinion.
```

Costs ~200 tokens. Eliminates the SEO-content-farm bias Anthropic's own research system exhibited.

### Disprove-peers directive

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

Fights anchoring bias that single-agent investigation suffers from.

### "Think like your agents" check

Before deploying a multi-agent setup:
1. Write the spawn prompt as you plan to send it
2. Open a plain Claude chat and paste the prompt
3. Ask yourself: do I have enough context to do this task well? What's missing?
4. Iterate the spawn prompt until the answer is yes

5 minutes per subagent definition catches 80% of prompt issues before they burn tokens.

---

**Next:** `02_DECISION_GUIDE.md` for when-to-use-what flowcharts; `03_MEDIA_PROMPTS.md` for video and infographic generation.
