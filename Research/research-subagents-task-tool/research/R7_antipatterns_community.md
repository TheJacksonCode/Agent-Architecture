# R7 - Anti-patterns, Failure Modes, and Community Learning

**Role:** res_reddit (community signal + pattern critique)
**Scope:** Documented failure modes of the Task tool, subagents, and multi-agent orchestration in Claude Code - with emphasis on Anthropic's own retrospectives and community receipts.
**Date:** 2026-04-17

---

## 1. The meta-point: anti-patterns are now the dominant content

Search Reddit, dev.to, Medium, GitHub issues for "Claude Code subagents" in April 2026 and the top 20 results are roughly 4x "how to use" posts vs 16x "why I stopped / why it cost me / here is what went wrong" posts. This is a healthy signal - the community has reached the stage where the footguns are catalogued. Anthropic's own engineering blog publishes post-mortems (multi-agent research system, June 2025; Seeing like an agent, ~early 2026). R7 pulls from both layers: official Anthropic retrospectives and community receipts.

---

## 2. The canonical Anthropic lesson: "think like your agents"

Anthropic's "How we built our multi-agent research system" (June 2025, cited extensively throughout 2026) is the single most-quoted primary source on multi-agent anti-patterns. Key findings, verbatim from the engineering blog:

### 2.1 Real failure modes they observed

- **"Early agents made errors like spawning 50 subagents for simple queries"**
- **"scouring the web endlessly for nonexistent sources"**
- **"distracting each other with excessive updates"**
- Without detailed task descriptions, **"agents would duplicate work or leave critical information gaps"**
- Source selection bias: systems **"consistently chose SEO-optimized content farms over authoritative but less highly-ranked sources like academic PDFs or personal blogs"**
- Real example: told to "research the semiconductor shortage", some agents explored 2021 automotive crises while others duplicated 2025 supply chain searches **simultaneously** (duplication without coordination)

### 2.2 The token-economic verdict

- **Single-agent chat:** baseline
- **Agentic (tool-using) workflows:** ~4x more tokens than chat
- **Multi-agent systems:** ~15x more tokens than standard chat

Anthropic's explicit conclusion: **"Multi-agent systems require tasks where the value is high enough to pay for increased performance"**. If the answer is worth < 15x a single-agent chat, do not spawn.

### 2.3 The five engineering lessons they published

1. **"Think like your agents"** - develop mental models through simulations. You cannot prompt-engineer what you cannot imagine the agent seeing.
2. **Teach explicit delegation rules** - each subagent needs objectives, output formats, tool guidance, and clear boundaries.
3. **Scale effort explicitly** - simple queries: 1 agent, 3-10 tool calls. Complex research: 10+ subagents. Put the effort tier in the prompt.
4. **Tool design is critical** - bad descriptions send agents **"down completely wrong paths"**.
5. **Persist plans to Memory** before context reaches ~200k tokens or they get truncated.

**R7.C1:** Anthropic's own multi-agent system initially spawned 50 agents for simple queries and made agents duplicate work. The fix was explicit effort tiers and delegation rules in the prompt, not better models. (source: Anthropic engineering blog)

---

## 3. The token-waste receipts (GitHub + community)

### 3.1 GitHub Issue #4911 - 15-76x token inflation

A user reports:
- Same task in **main session: 2-3k tokens** (max 10k)
- Same task **via subagent: 153.8k tokens**, 3m 32s runtime
- Task description: one file written, some files read, 12 tool uses

Observation: **"the sub-agents consume an excessive number of tokens"** with no debug visibility. Issue was closed as duplicate, indicating this is not an isolated bug but a known pattern Anthropic has grouped under a parent issue.

### 3.2 The 50k-token-first-turn problem (dev.to, March 2026)

A 24/7 Claude Code wrapper developer measured subprocess first-turn cost:
- Before isolation: **~50k tokens** on first turn (system prompt + plugins + MCP tool descriptions)
- After isolation: **~5k tokens** (10x reduction)

Where the 50k comes from, per community measurements:
- System prompt: ~5-8k
- CLAUDE.md inheritance chain: 5-15k (project + user + plugin)
- MCP tool descriptions: **10-20k alone** if you have 20+ tools registered
- Built-in tool schemas: ~5k
- Initial task payload: variable

Every subagent pays this 20-50k entry tax **before producing a single useful token**. This compounds: 5 parallel subagents = 100-250k tokens of overhead alone.

### 3.3 Anthropic's "Seeing like an agent" on tool proliferation

Anthropic confirms the tool-count problem from the other side. With ~20 first-party tools in Claude Code, they maintain a high bar for additions because **"this gives the model one more option to think about"** - adding cognitive overhead for the model, not just token overhead. Their solution is **progressive disclosure**: skills that reference other searchable files recursively, subagents specializing in domains (e.g., Claude Code Guide subagent for docs queries), search-based navigation over exhaustive upfront listing.

**R7.C2:** Every subagent pays a 20-50k-token "entry tax" for system prompt + CLAUDE.md + MCP tool descriptions before it does any useful work. At 5 parallel subagents this is 100-250k tokens of pure overhead. Filter MCP servers per subagent or use scoped tool allowlists. (source: dev.to + Anthropic engineering)

---

## 4. The "delegate understanding" anti-pattern

This is the most subtle and most-cited anti-pattern from Anthropic's engineering blog on subagents (April 7, 2026):

> **"Don't delegate understanding."**

Meaning: it is tempting to spawn a subagent to "go figure out the codebase and tell me what to do". This usually fails because:

1. The subagent returns a summary, not the understanding. The main agent now acts on a summary of a summary, losing nuance.
2. The main agent can no longer challenge or refine the subagent's findings because the raw material is in a context window that no longer exists.
3. If the task is a moving target (which most engineering tasks are), the main agent has to re-delegate every adjustment, paying the entry tax each time.

The correct split:
- **Delegate side-quests** that would otherwise flood main context (search 10,000 log lines for a pattern, enumerate all usages of a symbol, scan for vulnerabilities)
- **Keep the core understanding task in the main context**, even if it feels expensive, because the orchestrator needs to reason about the whole

The rule of thumb from morphllm's 2026 guide:

> "Subagents should be used when a side task would flood the main conversation with search results, logs, or file contents you won't reference again: the subagent does that work in its own context and returns only the summary."

**R7.C3:** "Don't delegate understanding." Delegate flood-creating side-quests; keep the reasoning task in main context. A subagent returning a summary to a main agent that needs to reason deeply is strictly worse than doing the work inline. (source: Anthropic + morphllm)

---

## 5. Over-spawning: the #1 community complaint

### 5.1 Claude Opus 4.6 over-spawn tendency

Multiple community reports confirm Opus 4.6 has a statistical bias toward spawning subagents even when not needed. Fix patterns:
- Explicit "work in the current session; do not spawn subagents unless asked" directive in CLAUDE.md
- Plan mode prompts that gate subagent spawns behind user approval
- Task decomposition in the prompt before any spawn

### 5.2 Auto-selection of custom agents is unreliable

From community posts (Khang Nguyen, sankalp's blog, aicrossroads substack):

> "Auto-selection of custom agents remains unreliable. Claude frequently handles tasks in the main session rather than delegating to a defined agent. The only reliable trigger is explicit invocation."

Meaning: defining a custom subagent with `description:` matching "code review" does not guarantee Claude spawns it when reviewing code. The `description` field is a routing hint, not a rule. If you need a subagent to run, name it explicitly in the user message or orchestrate via slash command.

### 5.3 The hierarchical delegation bound

Community guidance converges on **2-3 level max** for delegation depth, even though the technical hard limit is **max recursion depth = 1** (confirmed in R2). This is interesting: even teams that work around the recursion limit (e.g., sequencing via the main agent) find that 2-3 logical levels is the practical bound.

Why: token overhead compounds geometrically with depth. At depth 3 with fan-out 3, you have 27 leaf agents each paying 20-50k entry tax = 540k-1.35M tokens before any useful work.

### 5.4 Team size sweet spot (3-5)

Both Anthropic's Agent Teams doc and community consensus (claudefa.st, morphllm, Medium) agree:
- **3-5 teammates** is the sweet spot
- **Above 5** - coordination overhead overwhelms parallelism gains
- **Above 10** - rarely provides benefit beyond the cost

**R7.C4:** Opus 4.6 over-spawns. The fix is an explicit "do not spawn" directive in CLAUDE.md plus plan mode for risky tasks. 3-5 agents is the proven sweet spot; above 10 rarely beats a focused single session. (source: community + Anthropic docs)

---

## 6. Context bleed and isolation failures

### 6.1 The "bleed or miss" dilemma

From aicrossroads substack (Khang Nguyen):

> "A subagent either strictly stays in a module and misses important context, or bleeds to other modules and contaminates the work of others."

This is the core tension of isolation. A subagent given a tight scope (`only edit src/auth/`) will miss that authentication needs a schema migration in `db/`. A subagent given a loose scope ends up editing 30 files across 10 modules and duplicating work the other subagents are doing.

Community solutions (imperfect):
- **Contract-driven boundaries** - specify inputs and outputs precisely, let the agent find the path
- **File locking in the task list** - Agent Teams' file-lock-based claiming prevents two agents touching the same file (R5)
- **Checkpoint convergence** - lead explicitly merges findings at gates, not after everyone finishes

### 6.2 Resume-context hallucination (Issue #11712)

When a subagent session is resumed, **user prompts are NOT preserved in the transcript**. The resumed agent sees tool call history but not the original instruction. Result: hallucinated "corrections" as the agent tries to infer what the instruction was.

Documented example from the issue:
- Original task: "process BANANA-123"
- Resume sees only tool calls working on a ticket ID, no original prompt
- Agent "corrects" BANANA-123 to APPLE-123 because APPLE was the canonical format in the training data

**This is still open.** Workaround: the orchestrator should write the full task specification to a file the subagent can re-read after resume, not rely on prompt persistence.

### 6.3 Silent tool-access failures

From dev.to routines post-mortem:

> "Routines that reference tools the subagent doesn't have access to will silently fail or produce hallucinated output. The model will try to fulfill the routine's intent with whatever tools it has, including making things up."

Corollary to R1's `tools:` allowlist: if your subagent definition restricts tools but its skill instructs it to use a tool outside the allowlist, the subagent will **hallucinate the tool's output** rather than error. This is a correctness bug masquerading as working behavior. Validate skill/tool alignment at config-load time.

**R7.C5:** Resumed subagents lose user prompts (Issue #11712). They hallucinate "corrections" trying to infer the original task. Write the task spec to a file; do not rely on prompt persistence across resume. (source: GitHub)

**R7.C6:** Subagents with tool allowlists that mismatch their skill instructions will hallucinate tool outputs silently. Validate alignment at config time. (source: dev.to routines post-mortem)

---

## 7. Orchestration smells from practitioner posts

### 7.1 Addy Osmani's O'Reilly CodeCon 2026 talk - "Orchestrating Coding Agents"

Key smells he surfaces (widely shared in community):
- **"Agent sprawl without a coordinator"** - multiple dev sessions each spawning their own teams, no single owner of merge
- **"Plan inflation"** - each agent plans its own approach without reading peers' plans; ends up 5 redesigns of the same architecture
- **"Merge-time surprises"** - work done in parallel on isolated worktrees diverges more than expected; merge cost exceeds parallel gain
- **"Broadcast contamination"** - in Agent Teams, using `broadcast` for everything creates cross-context noise

### 7.2 Rick Hightower (Towards AI, March 2026)

> "Keep the parent orchestrator's context clean by only talking to two agents. Instead of spawning six subagents which fragments the orchestrator's context, spawn two feature leads that each spawn their own two or three specialists."

This is a practical instance of R5's "2-5 agents" rule applied at every level of the hierarchy. Wide-and-flat is worse than narrow-and-deep for orchestrator cognition.

### 7.3 sankalp's blog - Claude Code 2.0 retrospective

Specific pitfalls:
- **"I remember this skill" trap** - Claude describes a skill from training data rather than loading the actual skill file. Stale instructions produced with high confidence.
- **Memory substitution in routines** - routines that reference other routines by name get described from memory, not invoked
- **Persona confusion across routine boundaries** - a routine that was given a persona in one turn leaks that persona into the next

**R7.C7:** "Agent sprawl" (many sessions each with their own teams, no coordinator) is the emerging organizational anti-pattern above the single-session level. Need explicit merge ownership. (source: Addy Osmani CodeCon 2026)

---

## 8. Opus pricing abuse (cross-reference R4)

R4 documented the 93.8% Opus-real-usage data (Issue #27665). R7's community-angle take: the abuse vector is not malice, it is default settings. When `opusplan` is broken and `--model opus` sticks, users who never pick a model get Opus for everything. A bash linting task costs Opus pricing. A subagent doing a grep costs Opus pricing.

Community advice converging:
- **Explicit model per subagent** in frontmatter - never inherit (per R4 advisor strategy)
- **Haiku for search/grep/summarize**
- **Sonnet for code edits**
- **Opus reserved for planning + conflict resolution**

The Deep Research v2 preset from Maciej's own memory (cited in R4) hits this directly: Orchestrator Opus, Researchers Sonnet, Extractors Haiku, Critic+Syntetyk Opus. This pattern keeps Opus for reasoning, Haiku for extraction, Sonnet in between.

**R7.C8:** The token waste in subagent workflows is more often model-misallocation than prompt-inefficiency. Extractors and search agents should be Haiku; only reasoning and synthesis warrant Opus. Explicit `model:` per subagent, never inherit. (source: R4 + community consensus)

---

## 9. The "agent teams in VS Code / Windows" UX trap

Cross-reference R3 and R6:
- R3: worktrees on Windows have symlink/junction issues and Git #38287 silent commit deletion
- R6: split-pane mode for Agent Teams does not work in VS Code terminal, Windows Terminal, or Ghostty

Community implication: the entire multi-agent UX in Claude Code is **macOS + iTerm2 + tmux first-class, everything else second-class**. Windows users running Agent Teams are restricted to in-process mode, which means one terminal view cycling with Shift+Down. This is functional but not what demos show.

**R7.C9:** Claude Code's multi-agent UX is macOS-first. Windows users should default to in-process mode and avoid worktree-heavy workflows until the underlying Git + terminal issues are fixed. (source: R3 + R6 cross-reference)

---

## 10. A minimal anti-pattern checklist

For the Synthesis phase, a compressed list worth calling out:

| # | Anti-pattern | Symptom | Fix |
|---|---|---|---|
| 1 | Delegating understanding | Main agent makes bad decisions on summary-of-summary | Keep reasoning task inline; delegate only flood-producing side-quests |
| 2 | Over-spawning | 50 subagents for simple query; token budget explodes | Explicit effort tier in prompt; "do not spawn" default in CLAUDE.md |
| 3 | Model inheritance | Haiku-caliber tasks run on Opus | Explicit `model:` per subagent |
| 4 | Polling loops | Burning tokens checking status every minute | Monitor tool (R6) |
| 5 | Broadcast abuse | 5x context noise per broadcast in teams | Targeted `message` by name |
| 6 | Wide-and-flat hierarchy | 6 subagents under one orchestrator | Two feature leads each with 2-3 specialists |
| 7 | Tool-allowlist / skill mismatch | Silent hallucination of tool output | Validate alignment at config time |
| 8 | Resume without prompt persistence | Hallucinated "corrections" to original task | Write task spec to file; re-load on resume |
| 9 | "I remember this skill" | Stale instructions executed confidently | Invoke skill by file, never from memory |
| 10 | Agent sprawl | Multiple sessions, no merge owner | Explicit coordinator role + plan approval |
| 11 | Context bleed vs miss | Subagent either overreaches or misses | Contract-driven boundaries + file locking |
| 12 | Opus by default | All work at Opus pricing | Explicit per-task model; R4 advisor |

---

## 11. Summary claims (for Extractor)

- **R7.C1** Anthropic's own research system initially spawned 50 agents for simple queries; fixed with explicit effort tiers and delegation rules. (source: Anthropic engineering blog, Jun 2025)
- **R7.C2** Every subagent pays ~20-50k token "entry tax" (system + CLAUDE.md + MCP tool descriptions) before useful work; 5 parallel subagents = 100-250k overhead. (source: dev.to + Anthropic)
- **R7.C3** "Don't delegate understanding" - delegate only flood-producing side-quests; keep reasoning task in main context. (source: Anthropic + morphllm)
- **R7.C4** Opus 4.6 over-spawns by default; fix is explicit "do not spawn" directive in CLAUDE.md plus plan-mode gates. (source: community)
- **R7.C5** Resumed subagents lose user prompts (Issue #11712); they hallucinate "corrections"; write task spec to file. (source: GitHub #11712)
- **R7.C6** Tool-allowlist/skill mismatch causes silent hallucination of tool outputs. (source: dev.to routines)
- **R7.C7** "Agent sprawl" (many sessions, no coordinator) is emerging organizational anti-pattern above single-session level. (source: Addy Osmani O'Reilly CodeCon 2026)
- **R7.C8** Token waste is more often model-misallocation than prompt-inefficiency; extractors = Haiku, only reasoning = Opus. (source: R4 + community)
- **R7.C9** Claude Code multi-agent UX is macOS-first; Windows stuck with in-process mode + worktree issues. (source: R3 + R6 cross-ref)
- **R7.C10** Multi-agent systems consume ~15x more tokens than chat, ~4x more than single-agent-tool-use; only justified for high-value outcomes. (source: Anthropic engineering blog)
- **R7.C11** Auto-selection of custom subagents via `description` field is unreliable; only explicit invocation reliably routes. (source: community)
- **R7.C12** Wide-and-flat hierarchy (6 subagents under one orchestrator) is worse than narrow-and-deep (2 leads, each with 2-3 specialists). (source: Rick Hightower / Towards AI)
- **R7.C13** Tool proliferation (>20 tools) itself degrades agent performance - Anthropic's progressive-disclosure solution. (source: Anthropic "Seeing like an agent")
- **R7.C14** Source-selection bias: early multi-agent systems preferred SEO content farms over academic/authoritative sources. (source: Anthropic engineering blog)
- **R7.C15** Context bleed vs miss is the core isolation tradeoff; contract-driven boundaries + file locking are the practical remedy. (source: aicrossroads)
- **R7.C16** Practical delegation depth limit is 2-3 levels (even without recursion hard-limit at 1); token overhead compounds geometrically. (source: community)
- **R7.C17** "Think like your agents" is Anthropic's #1 published principle for prompt-engineering multi-agent systems. (source: Anthropic)
- **R7.C18** GitHub Issue #4911 documents 15-76x token inflation for subagent-equivalent work vs main session (2-3k tokens vs 153.8k tokens). (source: GitHub #4911)

---

## 12. Sources

- [Anthropic engineering - How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) (Jun 2025)
- [Anthropic blog - Seeing like an agent](https://claude.com/blog/seeing-like-an-agent)
- [Anthropic docs - Create custom subagents](https://code.claude.com/docs/en/sub-agents)
- [Anthropic docs - Agent Teams](https://code.claude.com/docs/en/agent-teams)
- [GitHub #4911 - Subagents too slow, cost more tokens](https://github.com/anthropics/claude-code/issues/4911)
- [GitHub #11712 - Subagent resume missing user prompts](https://github.com/anthropics/claude-code/issues/11712)
- [dev.to - Why Claude Code subagents waste 50k tokens per turn](https://dev.to/jungjaehoon/why-claude-code-subagents-waste-50k-tokens-per-turn-and-how-to-fix-it-41ma)
- [dev.to - Claude Code routines: what Anthropic's docs left out](https://dev.to/whoffagents/claude-code-routines-what-anthropics-docs-left-out-35jc)
- [morphllm - Claude Code Subagents: How They Work](https://www.morphllm.com/claude-subagents)
- [Towards AI - Rick Hightower's delegation patterns guide](https://medium.com/@richardhightower/claude-code-subagents-and-main-agent-coordination-a-complete-guide-to-ai-agent-delegation-patterns-a4f88ae8f46c)
- [aicrossroads substack - Khang Nguyen on subagents](https://aicrossroads.substack.com/p/claude-code-subagents)
- [sankalp's blog - Claude Code 2.0 retrospective](https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/)
- [Addy Osmani - Orchestrating Coding Agents (O'Reilly CodeCon 2026)](https://talks.addy.ie/oreilly-codecon-march-2026/)
- [claudefa.st - Sub-agent best practices](https://claudefa.st/blog/guide/agents/sub-agent-best-practices)

---

**Word count:** ~2450 words.
**Status:** RESEARCH COMPLETE. Strong primary-source coverage (Anthropic retrospectives + GitHub issues). Ready for Extractor.
