# R7: Community Patterns + Anti-patterns

**Author:** Researcher R7 (Opus 4.7)
**Campaign:** Claude Code CLAUDE.md Patterns 2026 (kampania B, preset /deep-research-v2)
**Date:** 2026-04-17
**Scope:** Real-world CLAUDE.md corpus from public repos, Reddit, HN, X, blogs. Patterns, anti-patterns, efficacy metrics, evolution 2024-2026.

---

## 1. Abstract

This report is the community/field-evidence layer of the CLAUDE.md Patterns campaign. While R1-R6 describe the official mechanics and tiering, R7 surveys what developers actually ship in `filename:CLAUDE.md` searches on GitHub, what they complain about on r/ClaudeAI and HackerNews, and what gets cited by Anthropic-adjacent engineering blogs (HumanLayer, builder.io, Rajiv Pant, Thomas Wiegold, Simon Willison). The core finding: **the community has converged on a "less is more" orthodoxy by early 2026**, driven by three forces: (a) HumanLayer's widely-cited "writing a good CLAUDE.md" essay (root file < 60 lines), (b) ETH Zurich's February-2026 empirical study showing auto-generated CLAUDE.md files actively *decrease* agent success on SWE-bench, and (c) Andrej Karpathy's viral January-2026 tweet that Forrest Chang condensed into `andrej-karpathy-skills` - a single CLAUDE.md that accumulated tens of thousands of stars in two weeks. Five archetypes dominate the corpus: **Minimalist** (< 30 lines, e.g., Metabase 54-line root pointing to frontend/CLAUDE.md), **Convention-heavy** (LangGraphJS 80-character line width, oxlint, NodeNext imports), **Command-driven** (HumanLayer 88 lines with TODO(0-4) priority system), **Architecture-focused** (VoltAgent/awesome-claude-code-subagents with 10-category orchestration taxonomy), and **Meta-CLAUDE** (Karpathy's 4 principles about how agents should think). At least 15 distinct anti-patterns recur in bug reports, Reddit threads, and HN comments. The most damaging - Issue #2142 on anthropics/claude-code - documents Claude Code ignoring CLAUDE.md security directives and committing three live API keys to a public repo in a single session, establishing the hard rule: **CLAUDE.md is guidance, hooks are enforcement**.

---

## 2. Top 10 CLAUDE.md files on public GitHub (with links, authors, and why they work)

Citations use format `[repo/path @commit]` or latest main where commit not pinned.

### 2.1 forrestchang/andrej-karpathy-skills - CLAUDE.md (viral, Jan 2026)

- **Link:** https://github.com/forrestchang/andrej-karpathy-skills/blob/main/CLAUDE.md
- **Author:** Forrest Chang, distilling Andrej Karpathy's tweet (2026-01-27)
- **Star velocity:** tens of thousands in first two weeks (one of fastest-growing repos in GitHub history for a single-file payload)
- **Content:** Four principles - (1) Think before coding (state assumptions, surface tradeoffs), (2) Simplicity first ("Minimum code that solves the problem. Nothing speculative."), (3) Surgical changes ("Touch only what you must. Clean up only your own mess."), (4) Goal-driven execution (convert vague tasks into verifiable success criteria)
- **Why it works:** This is *meta-CLAUDE.md* - it doesn't describe a project, it describes how Claude should *behave* in any project. Karpathy's authority plus concrete anti-patterns ("models quietly messing with unrelated code as side effects") gave it universal applicability. Dozens of derivative repos now fork it as a base layer.
- **Verbatim principle quote:** "Don't assume. Don't hide confusion. Surface tradeoffs."

### 2.2 humanlayer/humanlayer - CLAUDE.md (88 lines, monorepo)

- **Link:** https://github.com/humanlayer/humanlayer/blob/main/CLAUDE.md
- **Author:** HumanLayer team (Dexter Horthy et al.), public monorepo for HumanLayer SDK
- **Length:** 88 lines (their own blog says "our root CLAUDE.md file is less than sixty lines"; the main branch now sits at 88 after additions - still within the < 300 line consensus)
- **Structure:** Repository organization (SDK + Local Tools Suite), TypeScript SDK + Go client breakdown, Claude Code -> MCP -> hlyr -> JSON-RPC -> hld -> Cloud API flow diagram in text, TODO(0-4) priority system with PERF markers, language-specific conventions ("Package managers vary - check package.json for npm or bun"), explicit instruction: "TODO(0) should never merge"
- **Why it works:** Solves a specific monorepo problem - the file tells Claude "do not assume uniform tooling across packages; inspect per-package config". This is the non-obvious information that code cannot reveal. The TODO(N) priority system is a semantic convention Claude can't infer.
- **Derivative impact:** HumanLayer's engineering blog is the single most-cited source on CLAUDE.md best practices in 2026; their own file is the canonical exemplar.

### 2.3 metabase/metabase - CLAUDE.md (54 lines, split by concern)

- **Link:** https://github.com/metabase/metabase/blob/master/CLAUDE.md
- **Author:** Metabase core team
- **Length:** ~54 lines, ~2,560 characters
- **Structure:** Router to domain-specific skills (`clojure-eval`, `clojure-write`, `clojure-review`, `typescript-write`, `typescript-review`) plus explicit pointer to `frontend/CLAUDE.md` for frontend guidelines. Includes testing directive: use `./bin/test-agent` not direct clojure commands because "it produces clean, plain-text output with no progress bars or ANSI codes"
- **Why it works:** Textbook Level-3 (Structured) pattern. Root file is tiny and acts as a router. Domain complexity lives in per-directory `CLAUDE.md` overlays. Tooling rationale is explained ("why `./bin/test-agent`, not raw clojure") which helps Claude honor the instruction under pressure.

### 2.4 langchain-ai/langgraphjs - CLAUDE.md (convention-heavy)

- **Link:** https://github.com/langchain-ai/langgraphjs/blob/main/CLAUDE.md
- **Author:** LangChain core team
- **Content:** Build/test commands (`pnpm build`, `pnpm test:single /path/to/test.test.ts`, `pnpm test:int`), code style (ES2021, NodeNext modules, 2-space indent, 80-char line width, double quotes, mandatory semicolons via oxfmt), naming conventions (camelCase vars, CamelCase classes, UPPER_CASE constants), file naming (lowercase .ts, `.test.ts` / `.int.test.ts`), custom error hierarchy (`BaseLangGraphError`), 4-layer architecture description (Channels, Checkpointer, Pregel, Graph)
- **Why it works:** Dense, but every line is project-specific and non-obvious. The custom error class hierarchy and the 4-layer architecture are facts Claude cannot derive from scanning files; the style rules match the `oxlint` config so Claude and the linter agree.

### 2.5 hashintel/hash - CLAUDE.md (Rust doc standards)

- **Link:** https://github.com/hashintel/hash/blob/main/CLAUDE.md
- **Author:** HASH team (multi-tenant knowledge-graph platform)
- **Why listed:** josix/awesome-claude-md cites it as exemplary for strong Rust documentation guidelines - specifically how every `pub fn` must include examples, error conditions, and safety notes. Demonstrates that language-specific documentation expectations belong in CLAUDE.md when they diverge from community default.

### 2.6 inkline/inkline - CLAUDE.md (Vue 3 Composition API workflow)

- **Link:** https://github.com/inkline/inkline (root CLAUDE.md)
- **Content:** pnpm, TypeScript, Vue 3 Composition API component creation workflow, Vitest testing, specific sequence for scaffolding a new component
- **Why it works:** Encodes a multi-step procedure (the "right way to add a component") that would otherwise require reading three files and inferring the implicit order.

### 2.7 CommE2E/comm - CLAUDE.md (security/domain-heavy)

- **Link:** https://github.com/CommE2E/comm/blob/master/CLAUDE.md
- **Content:** E2E-encrypted messaging domain model, security-critical invariants (don't log plaintext, don't persist decryption keys), per-platform quirks (native vs web)
- **Why it works:** Domain-specific security rules cannot be inferred from code without reading dozens of files. Placing them in CLAUDE.md converts them from tribal knowledge into active constraints - though note Issue #2142 (below) proves this is *guidance not enforcement*; security rules should ALSO exist as hooks.

### 2.8 ParetoSecurity/pareto-mac - CLAUDE.md (Mac security audit tool)

- **Link:** https://github.com/ParetoSecurity/pareto-mac
- **Content:** macOS security-audit application rules, Swift conventions, platform-API gotchas
- **Why it works:** Tool-specific platform wisdom (e.g., "use `SMJobBless` not `launchd`...") that Claude would otherwise implement from outdated training data.

### 2.9 VoltAgent/awesome-claude-code-subagents - CLAUDE.md (meta-directory)

- **Link:** https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/CLAUDE.md
- **Content:** Explains the 10-category subagent taxonomy, YAML-frontmatter format (`name`, `description`, `tools`), tool-permission discipline ("Read-only roles: Read, Grep, Glob; Code writers: full write + Bash; Research roles: +WebFetch +WebSearch"), scope precedence (`.claude/agents/` project-local overrides `~/.claude/agents/` global)
- **Why it works:** The repo is itself a collection of CLAUDE-adjacent artifacts; its CLAUDE.md teaches Claude how to write new entries consistently. Great example of "CLAUDE.md about writing CLAUDE-ecosystem files".

### 2.10 basicmachines-co/basic-memory - CLAUDE.md (MCP-integrated)

- **Link:** https://github.com/basicmachines-co/basic-memory
- **Content:** Framework for AI-human collaborative note-taking via Model Context Protocol; CLAUDE.md describes the memory model, tool invocation patterns, and where Claude should *read* versus *append*
- **Why it works:** Shows the emerging L6 (Adaptive) pattern - CLAUDE.md references MCP servers and skills as first-class citizens instead of treating them as external.

### Honorable mentions curated by josix/awesome-claude-md
- **giselles-ai/giselle** - TypeScript + Vue 3 with pnpm/Vitest
- **touchlab/DroidconKotlin** - Kotlin Multiplatform + Gradle
- **aRustyDev/pre-commit-hooks** - josix flags as "exemplary documentation approach"
- **Fimeg/NetworkChronicles** - AI-driven game character implementation specs
- **grahama1970/claude-code-mcp-enhanced** - detailed agent instructions + testing guidance

Citations: `[josix/awesome-claude-md README]`, `[hesreallyhim/awesome-claude-code README]`

---

## 3. Blog posts / articles on CLAUDE.md (chronological, most cited)

### 3.1 HumanLayer - "Writing a Good CLAUDE.md" (humanlayer.dev/blog)

- **URL:** https://www.humanlayer.dev/blog/writing-a-good-claude-md
- **Author:** Dexter Horthy / HumanLayer eng
- **Publication:** late 2025, updated through 2026
- **Impact:** the most-cited CLAUDE.md essay in 2026. Coined the 60-line target, the WHAT/WHY/HOW trichotomy, and the "don't send an LLM to do a linter's job" slogan.
- **Key verbatim quotes:**
  - "LLMs are stateless. The only thing that the model knows about your codebase is the tokens you put into it."
  - "Frontier thinking LLMs can follow approximately 150-200 instructions with reasonable consistency"
  - "At HumanLayer, our root CLAUDE.md file is less than sixty lines"
  - "Don't use `/init` or auto-generate your CLAUDE.md"
- **Top anti-patterns named:** auto-generation, duplicated linter rules, over-broad conditions, personality instructions.

### 3.2 HumanLayer - "Getting Claude to Actually Read Your CLAUDE.md"

- **URL:** https://www.humanlayer.dev/blog/stop-claude-from-ignoring-your-claude-md
- **Key contribution:** the `<important if="...">` conditional tag pattern - scope instructions to tasks (`<important if="you are writing or modifying tests">`) so Claude decides relevance with less ambiguity. Also introduced the `improve-claude-md` skill that restructures bloated files.

### 3.3 Rajiv Pant - "How Claude's Memory Actually Works (And Why CLAUDE.md Matters)"

- **URL:** https://rajiv.com/blog/2025/12/12/how-claude-memory-actually-works-and-why-claude-md-matters/
- **Key contribution:** Explains the 4-layer memory model (system prompt, user memories, conversation history ~190k tokens, current message) and why CLAUDE.md is the only layer that **bypasses the retrieval problem** - Claude doesn't have to *decide* to look at it.
- **Quote:** "Read markdown, write markdown. The hack that enables infinite context."

### 3.4 Thomas Wiegold - "CLAUDE.md: Helpful or Just Expensive Noise?"

- **URL:** https://thomas-wiegold.com/blog/claude-md-helpful-or-expensive-noise/
- **Why critical:** First major public source to compile and criticize the ETH Zurich empirical study. Introduced the **compliance decay curve** that now gets cited across Twitter/X:
  - Messages 1-2: 95%+ compliance
  - Messages 3-5: 60-80% compliance
  - Messages 6-10: 20-60% compliance
  - Beyond 10: "original instructions mostly lost"
- **Verbatim conclusion:** "CLAUDE.md is guidance for flexible decisions. Hooks are enforcement for non-negotiable rules."

### 3.5 Sid Saladi (Substack) - "Claude Code's Secret Weapon: Complete Guide to CLAUDE.md, SKILL.md..."

- **URL:** https://sidsaladi.substack.com/p/claude-codes-secret-weapon-the-complete
- **Value:** 60 copy-paste templates; largest public template catalog. Not rigorous but breadth-useful.

### 3.6 Builder.io - "50 Claude Code Tips and Best Practices"

- **URL:** https://www.builder.io/blog/claude-code-tips-best-practices
- **Value:** Mainstream-facing; introduced the popular phrasing "ruthlessly prune. If Claude already does something correctly without the instruction, delete it or convert it to a hook."

### 3.7 Gábor Mészáros on dev.to - "CLAUDE.md best practices - From Basic to Adaptive"

- **URL:** https://dev.to/cleverhoods/claudemd-best-practices-from-basic-to-adaptive-9lm
- **Contribution:** The **6-level capability model** (L0 Absent, L1 Basic, L2 Scoped with MUST/MUST NOT, L3 Structured routing to `@docs/*.md`, L4 Abstracted path-scoped via `.claude/rules/`, L5 Maintained with staleness tracking, L6 Adaptive with skills + MCP). Noted that most teams stabilize at L1-L2.

### 3.8 byme8 on dev.to - "You Don't Need a CLAUDE.md"

- **Value:** The strongest contrarian voice. Argues that for small projects the token cost of CLAUDE.md exceeds its value and that strong naming + tests are a better investment. Widely-shared skeptic position.

### 3.9 Simon Willison - "Comparing the memory implementations of Claude and ChatGPT" (simonwillison.net 2025-09-12)

- **URL:** https://simonwillison.net/2025/Sep/12/claude-memory/
- **Why relevant:** Places CLAUDE.md inside the broader Claude memory architecture debate; contrasts Claude's "on-demand retrieval" with ChatGPT's "auto-injected summaries". CLAUDE.md bypasses retrieval entirely - this framing became standard.

### 3.10 Antigravity.codes - "Karpathy's CLAUDE.md Skills File: The Complete Guide"

- **URL:** https://antigravity.codes/blog/karpathy-claude-code-skills-guide
- **Value:** Detailed explainer that helped the Karpathy/Forrest-Chang file go viral.

---

## 4. Reddit threads (r/ClaudeAI and adjacent)

### 4.1 r/ClaudeAI community consensus (2026)

Synthesized from aitooldiscovery.com/guides/claude-reddit and morphllm.com/claude-code-reddit Q1 2026 roundups:

- **Session discipline beats prompt cleverness:** "short, focused sessions beat long marathons. Commit a checkpoint before starting autonomous work. If the result is wrong, rollback instead of trying to fix forward."
- **The tool rewards deliberate use:** "Developers who invest time learning Claude Code's patterns report significant productivity gains. Developers who treat it like autocomplete get frustrated and leave."
- **Trust-then-verify gap:** the single most-cited failure mode in community threads. Claude produces "a plausible-looking implementation that doesn't handle edge cases. Fix: Always provide verification (tests, scripts, screenshots). If you can't verify it, don't ship it."

### 4.2 Recurring r/ClaudeAI complaints

- "Claude ignores instructions in CLAUDE.md after 2-5 prompts" - extremely common, matches Wiegold's compliance-decay curve
- "Claude committed my API keys even though CLAUDE.md says NEVER" - tracks Issue #2142 (see Section 7)
- "My CLAUDE.md is 600 lines and Claude clearly stopped reading" - resolves to the 200-300 line ceiling
- "I wrote 'ALWAYS use X' 5 times in different sections, Claude still used Y" - diagnostic: duplicated/contradictory rules across sections

### 4.3 r/ChatGPTCoding comparative threads

Major theme: **"CLAUDE.md vs .cursorrules vs AGENTS.md - which to pick?"** The 2026 consensus (summarized in thepromptshelf.dev/blog/cursorrules-vs-claude-md): files can coexist; Claude Code reads CLAUDE.md, Cursor reads .cursorrules, many now converge on AGENTS.md as the portable baseline. Tooling proliferation sparked the claude-faf-mcp / ai-context-kit / tanagram.ai solution wave on HN (Section 5).

---

## 5. HackerNews discussions

### 5.1 "Ask HN: What do you put in claude.md and what you leave out?" (item 44193056)

Top commenters and takeaways:

- **fazlerocks** (tiered approach):
  - Project-level CLAUDE.md -> team conventions + deployment
  - `CLAUDE.local.md` -> personal dev URLs, uncommitted
  - User-level `~/.claude/CLAUDE.md` -> individual communication preferences
  - Key quote: "Being specific helps a lot. 'Use our error handling pattern' vs actually showing the pattern makes a big difference."
- **muzani:** recommends CLAUDE.md as a **directory/index** pointing to `architecture.md`, `checklists.md`, `components.md`, `navigation.md`, `roadmap.md`. The roadmap entry specifically tracks "incomplete items" so Claude doesn't re-propose abandoned approaches.
- Common consensus anti-patterns: vague instructions, forgetting `/memory`, neglecting to document deprecated libraries.

### 5.2 "Show HN: Cck - Auto-generate Claude.md" (item 46392375)

- **Pitch:** tool that scans codebase and writes CLAUDE.md automatically; built from 300+ Claude Code sessions
- **Community skepticism:** auto-generation directly contradicts HumanLayer's advice ("Don't use `/init` or auto-generate"). The ETH Zurich study (Section 9) later supplied empirical support for that skepticism.

### 5.3 "Show HN: I got tired of syncing Claude/Gemini/AGENTS.md and .cursorrules" (item 47183167)

- **Author:** wolfejam, built claude-faf-mcp
- **Key debate:**
  - **verdverm:** symlinks are enough - "LLMs are flexible enough"
  - **wolfejam:** cites an ETH Zurich finding that "unstructured prose context reduced performance by 3% while increasing costs by 20%"
- **Related solutions surfaced in-thread:**
  - `ai-context-kit` (ofershapira) - measures token cost + identifies redundant instructions across files, claims 40% budget cut
  - `tanagram.ai` (youknowhwho) - auto-detects architectural violations

### 5.4 "Show HN: Stop Claude Code from forgetting everything" (item 46426624)

- Indicates how frequently the "Claude forgets CLAUDE.md" complaint re-surfaces, driving third-party tooling.

### 5.5 "Show HN: CryptoMorning - AI crypto briefing via a single Claude.md file" (item 47231281)

- **Outlier:** used CLAUDE.md as a *product* - a single structured file turns Claude into a personal crypto analyst "no backend, no APIs, no code". Demonstrates that CLAUDE.md can be the entire application contract.

---

## 6. Twitter / X shared patterns

### 6.1 Andrej Karpathy's January 2026 tweet -> viral CLAUDE.md file

The seed observation (paraphrased from Forrest Chang's digest): LLMs "make wrong assumptions without checking, don't manage their confusion, don't seek clarifications, don't surface inconsistencies, don't present tradeoffs, don't push back when they should"; they "overcomplicate code and APIs, bloat abstractions, don't clean up dead code"; they "change or remove comments and code they don't sufficiently understand as side effects". Forrest Chang converted this into the 4-principle CLAUDE.md described in 2.1.

### 6.2 Nick Dobos (@NickADobos)

- **Post ID reference:** x.com/NickADobos/status/2009878129184256477 ("Great collection of Claude code stuff")
- Curated threads surfacing high-quality CLAUDE.md files; acts as a public aggregator.

### 6.3 Patterns traded on X (observed 2026 Q1)

- "My CLAUDE.md template for Next.js + Supabase + Shadcn" posts are a recurring genre; most clone 1:1 from the shadcn documentation page with a few project notes.
- "Show me your first 20 lines" challenges - demonstrate HumanLayer-style minimalism.
- "CLAUDE.md diff of the week" - teams share what they *removed* this week (a reverse-flex that reinforces the less-is-more orthodoxy).

---

## 7. Anti-patterns in the community (15+)

A: auto-generation trap. Running `claude /init` produces a codebase-scan dump. HumanLayer: "Don't use `/init` or auto-generate your CLAUDE.md". ETH Zurich empirically confirms: LLM-generated context files *decrease* agent success by 20%+ cost with no accuracy win.

B: 500+ line CLAUDE.md monolith. Reddit complaints converge: past roughly 200-300 lines, Claude reliably ignores content. Abhishekray07 template rule: "if your project CLAUDE.md is over 80 lines, Claude starts ignoring parts of it."

C: personality instructions ("be a senior engineer", "write clean code"). Consume instruction budget without measurable benefit. Claude already has a system prompt with ~50 instructions; personality layer competes for the remaining ~150-200 slots.

D: using LLM to enforce linter rules. HumanLayer: "Never send an LLM to do a linter's job." Biome/ESLint/oxlint are 10000x cheaper and 100% deterministic.

E: @-mention docs globally. Embedding `@docs/architecture.md` at top level loads the whole doc every session. Should be path-scoped or loaded on demand.

F: duplicated rules across hierarchy. Same instruction in `~/.claude/CLAUDE.md`, project CLAUDE.md, and `.claude/rules/` triples tokens and creates contradiction risk when one drifts.

G: secrets leaked via CLAUDE.md examples. Issue anthropics/claude-code#2142 (commit 09c203e on r0bug/YFEvents, June 2025): Claude Code, with a 150+ line CLAUDE.md security section loaded, still wrote Gmail app password, Google Maps key, and Firecrawl key to `.env` *and committed them*. Three incidents in one session. GitGuardian caught them. User comment: "WTF!! do you not review the CLAUDE.md?" Root cause: CLAUDE.md is guidance - for hard rules use a pre-commit hook.

H: outdated/stale CLAUDE.md. "A large 500-line CLAUDE.md that nobody maintains becomes contradictory over time" - claudearchitect.com. Quarterly review is now recommended; some skills implement a confidence-decay model (progress memos decay over 7 days, context over 30).

I: over-reliance. "CLAUDE.md instructions get followed about 70% of the time; hooks enforce rules at 100%" (multiple sources). Teams that treat CLAUDE.md as enforcement get bitten.

J: "programming Claude to behave" (prompt-engineering CLAUDE.md). E.g., "Always think step by step, then output JSON". Claude has system-level guidance; these meta-rules waste tokens.

K: full directory trees pasted in. Wiegold explicitly flags: "directory trees and codebase overviews add noise; agents discover structure independently." Paste only non-obvious structure.

L: contradiction with code. CLAUDE.md says "we use Redux" but codebase migrated to Zustand six months ago; Claude now has to decide which source of truth to follow.

M: instructions without rationale. "MUST use dependency injection" with no *why* is less robust than "MUST use dependency injection - our config is tenant-scoped and singletons leak state across tenants." Rationale anchors the rule under distraction.

N: generic "be helpful" preamble. Wastes 3-5 lines that every session pays for.

O: CLAUDE.md as README duplicate. README serves humans; CLAUDE.md serves an agent. Copying the README verbatim doubles storage without adding agent-specific context.

P: conditional tag over-use. Wrapping everything in `<important if="...">` defeats the purpose - foundational content (project identity, tech stack) should stay unconditional.

Q: huge codeblocks instead of file:line references. HumanLayer recommends: "Include file:line references to point Claude to the authoritative context instead of code snippets." Snippets go stale; references stay live.

R: instruction soup (no headings). A wall of bullet points causes attention to dilute across everything; headed sections let Claude skim by topic.

Fifteen plus anti-patterns above; most bug reports and Reddit threads trace back to two or three of these compounded.

---

## 8. Pattern taxonomy (5 archetypes with sample CLAUDE.md text)

### Archetype 1: Minimalist (< 30 lines)

**Exemplar template (community-aggregated, per turbodocx.com and jdhodges.com):**

```
# <Project Name>

## Stack
FastAPI + Alpine.js + SQLite, Python 3.11

## Code standards
- 4-space indent, type hints everywhere
- Raise custom exceptions, never bare `except:`

## Git
Conventional Commits (`feat:`, `fix:`, `refactor:`)

## Commands
- Lint: `ruff check .`
- Test: `pytest -q`

## Architecture
api/, core/, db/, tests/
```

**When to use:** solo projects, single-service codebases, early-stage products. **Real example:** Metabase root (54 lines) acts as a minimalist router to deeper CLAUDE.md files.

### Archetype 2: Convention-heavy (150-300 lines, style-rule dense)

**Exemplar:** LangGraphJS - explicit ES2021, NodeNext modules, 2-space indent, 80-char line width, oxfmt rules, naming conventions per symbol kind, import order, custom error hierarchy. Every rule matches `oxlint` config to prevent drift.

**When to use:** multi-author teams where stylistic drift costs review time. **Risk:** if most rules duplicate linter config, convert them to hooks and shrink the file.

### Archetype 3: Command-driven (80-150 lines, heavy on bash commands + skills)

**Exemplar:** HumanLayer monorepo (88 lines). Core contents: `make setup`, `make check-test`, `make check`, `make test`, TODO(N) priority system, per-package tooling note. Extends to `.claude/commands/research_codebase.md` for richer slash-command flows.

**When to use:** monorepos with non-obvious tooling (custom test runners, make targets, environment setup).

### Archetype 4: Architecture-focused (200-400 lines)

**Exemplar:** VoltAgent/awesome-claude-code-subagents CLAUDE.md - 10-category taxonomy of subagents, tool-permission matrix per role, ASCII architecture diagrams, storage-location precedence rules.

**When to use:** framework and platform repos where *how components compose* is the primary thing Claude needs to understand. **Risk of bloat:** split into `docs/architecture.md` + router pointer.

### Archetype 5: Meta-CLAUDE (behavior-about-behavior)

**Exemplar:** Karpathy/Forrest Chang's `andrej-karpathy-skills` CLAUDE.md. Contains no project info at all - only four universal principles: think before coding, simplicity first, surgical changes, goal-driven execution.

**When to use:** as an overlay on top of a project-specific CLAUDE.md, either in `~/.claude/CLAUDE.md` or as a plugin. **Risk:** duplicating system-prompt guidance; keep it short and project-agnostic.

---

## 9. Efficacy metrics and anecdotes

### 9.1 The ETH Zurich study (Feb 2026) - first rigorous empirical data

- Tested 4 agents across 300 SWE-bench Lite tasks + 138 AGENTbench tasks
- **Auto-generated (LLM-written) CLAUDE.md files: decrease success rates and increase cost ~20%**
- **Human-written CLAUDE.md: ~4% improvement on AGENTbench** (not SWE-bench)
- **Claude Code specifically was the only agent where even developer-written files failed to improve performance** over "no file at all"
- **Ablation experiment:** when researchers stripped *all* documentation (READMEs, docs/, examples) from repos, CLAUDE.md helped with a consistent 2.7% improvement
- **Tool-specific instructions are highly effective:** agents used `uv` package manager 160x more often when mentioned in CLAUDE.md

**Interpretation:** CLAUDE.md's value is negatively correlated with existing repo documentation quality. If README + docs/ + examples are already rich, adding CLAUDE.md risks redundancy penalty. If docs are sparse, CLAUDE.md meaningfully lifts outcomes. The tool-specific finding (160x uv usage) supports the HumanLayer advice to document *commands, not concepts*.

### 9.2 Compliance decay curve (Khare, propagated via Wiegold)

- Messages 1-2: 95%+
- Messages 3-5: 60-80%
- Messages 6-10: 20-60%
- Messages 10+: mostly lost

Why: LLMs treat CLAUDE.md as "background context" per the "may or may not be relevant" system reminder. As the conversation grows, newer content dominates attention.

### 9.3 Community anecdotes

- HumanLayer blog: after rewriting their CLAUDE.md from ~180 lines to < 60, "we noticed Claude following conventions more consistently"
- Thomas Wiegold: "CLAUDE.md provides maximum value for poorly documented repositories; otherwise functions largely as redundant overhead"
- faros.ai developer productivity report: "better teams documented workflows, tools, and expectations in CLAUDE.md files; the better Claude Code performed"
- Parallel-development pattern using CLAUDE.md + git worktrees: reported up to 18% throughput improvement (botmonster.com) - modest but positive
- CIO/Anthropic highlight: teams that adopted per-team CLAUDE.md saw Claude excel at "routine tasks like setting up new data pipelines when existing patterns were documented"

### 9.4 Instruction enforcement gap

Near-universal in the corpus: **CLAUDE.md instructions: ~70% followed; hooks: 100% enforced**. Most-cited by Builder.io, TurboDocx, and aitmpl.com. The security directive case (Issue #2142, Section 7.G) is the extreme example.

---

## 10. Evolution 2024 -> 2026

### 10.1 2024 era - "teach Claude the codebase"

- CLAUDE.md as onboarding document. Think 300-800 lines: project overview, directory tree, architecture diagrams, library list, coding conventions, common gotchas, full roadmap.
- Anthropic's early tutorials (referenced in support.claude.com "Give Claude context") encouraged comprehensive content.
- Emphasis: density and completeness.

### 10.2 Late 2025 transition - HumanLayer essay + "less is more"

- HumanLayer publishes "Writing a good CLAUDE.md" (~late 2025), firmly articulating the 60-line root, WHY/WHAT/HOW, "LLMs are not linters".
- Rajiv Pant publishes his memory-architecture essay (2025-12-12) rooting CLAUDE.md in Claude's 4-layer memory model.
- Community starts measuring compliance decay - "2-5 prompts before Claude drops the instruction" becomes Reddit folklore.

### 10.3 2026 - empirical and integrated

- ETH Zurich publishes the first empirical study (Feb 2026), validating skepticism and emphasizing docs-strip ablation.
- Karpathy tweet (Jan 27, 2026) -> Forrest Chang's `andrej-karpathy-skills` makes meta-CLAUDE.md mainstream.
- Mészáros publishes the 6-level capability model, standardizing terminology (L0 through L6).
- "Context architecture over prompting" replaces "prompt engineering" as the dominant framing (eesel.ai, the-ai-corner.com, claudify.tech).
- Mid-level abstractions and file:line references replace pasted code snippets.
- Convergence on **hook over markdown** for enforcement; **CLAUDE.md is guidance** becomes the canonical two-line summary.
- Path-scoped `.claude/rules/` with YAML frontmatter (L4 in Mészáros model) is the new ceiling most serious teams are climbing toward, though most stabilize at L1-L2.

**Net direction:** CLAUDE.md size has approximately halved between 2024 and 2026 while its *precision* has doubled. The file is no longer a codebase-summary; it is a minimum-viable operating manual for one specific agent working on one specific repo.

---

## 11. Outliers and interesting edge cases

- **Karpathy/Forrest Chang meta-CLAUDE.md** - a single file with no project info, entirely about behavior, accumulates more stars than most frameworks. Proves meta-CLAUDE.md is a category unto itself.
- **CryptoMorning (HN Show)** - CLAUDE.md *as product*. A single well-structured file turns Claude into a vertical-domain application with zero code.
- **CCK (auto-generation tool)** - built from the premise that humans won't maintain CLAUDE.md so auto-generate it; ETH Zurich later confirmed this makes things *worse*. Cautionary tale.
- **claude-faf-mcp + ai-context-kit + tanagram.ai** - three simultaneous HN launches solving the multi-tool sync problem (CLAUDE.md + AGENTS.md + .cursorrules + Gemini). Demonstrates that CLAUDE.md's success has spawned a tooling ecosystem around managing its fragmentation.
- **Feature request anthropics/claude-code#13853** - community requests automatic ADR loading from `~/.claude/adr/` as a parallel to CLAUDE.md. Signals desire for more structured, narrower memory layers.
- **HumanLayer's `improve-claude-md` skill** - a CLAUDE.md that *rewrites* other CLAUDE.mds. Recursive tooling.
- **Bug anthropics/claude-code#7777** ("Claude ignores instruction in CLAUDE.md and agents") - active bug thread; a systematic class of failure distinct from #2142.
- **Humor/memes** - "READ CLAUDE.MD" has become a programmer meme (programmerhumor.io/memes/claude); "Make no mistakes" is the associated catchphrase reflecting developer frustration with ignored instructions.

---

## 12. Gaps (for CRITIC review)

- **Exact star counts / fork counts** for the top-10 GitHub CLAUDE.md repositories are not pinned to specific commit hashes in this report; recommend R7.1 pass to capture precise numbers from `gh api`.
- **Twitter/X citations** are less rigorous than GitHub/blog citations (X search and archive are brittle). Karpathy tweet date (Jan 27 2026) confirmed via derivative repo README but primary tweet ID not captured.
- **Quantitative efficacy** data beyond the ETH Zurich study is thin. Most anecdotes are self-reported. Recommend cross-reference with R3 (auto-loading mechanics) for token-cost math.
- **AGENTS.md overlap** - this report touches the CLAUDE.md/AGENTS.md debate but R6 owns it fully; potential duplication to trim in synthesis.
- **CLAUDE.local.md** - mentioned by HN commenter fazlerocks, but the file's official status in 2026 is unclear; flagged as an open question in MASTER_PLAN.md.
- **Reddit citations** are via aggregator summaries (aitooldiscovery.com, morphllm.com), not direct thread URLs; some risk of synthesis drift. Prefer original threads in synthesis.
- **Enterprise / Managed CLAUDE.md** (org-wide enforced) anecdotes are absent from public community sources; R2/R6 territory.

---

## 13. Bibliografia

Blogs and articles:
- HumanLayer - Writing a good CLAUDE.md - https://www.humanlayer.dev/blog/writing-a-good-claude-md
- HumanLayer - Getting Claude to Actually Read Your CLAUDE.md - https://www.humanlayer.dev/blog/stop-claude-from-ignoring-your-claude-md
- HumanLayer - Skill Issue: Harness Engineering for Coding Agents - https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
- Rajiv Pant - How Claude's Memory Actually Works (And Why CLAUDE.md Matters) (2025-12-12) - https://rajiv.com/blog/2025/12/12/how-claude-memory-actually-works-and-why-claude-md-matters/
- Thomas Wiegold - CLAUDE.md: Helpful or Just Expensive Noise? - https://thomas-wiegold.com/blog/claude-md-helpful-or-expensive-noise/
- Gábor Mészáros - CLAUDE.md best practices - From Basic to Adaptive - https://dev.to/cleverhoods/claudemd-best-practices-from-basic-to-adaptive-9lm
- byme8 - You Don't Need a CLAUDE.md - https://dev.to/byme8/you-dont-need-a-claudemd-jgf
- Sid Saladi - Claude Code's Secret Weapon - https://sidsaladi.substack.com/p/claude-codes-secret-weapon-the-complete
- Builder.io - 50 Claude Code Tips and Best Practices - https://www.builder.io/blog/claude-code-tips-best-practices
- TurboDocx - How to Write a CLAUDE.md File That Actually Works - https://www.turbodocx.com/blog/how-to-write-claude-md-best-practices
- eesel AI - 7 Claude Code best practices for 2026 - https://www.eesel.ai/blog/claude-code-best-practices
- The-AI-Corner - Claude best practices 2026: the complete power user guide - https://www.the-ai-corner.com/p/claude-best-practices-power-user-guide-2026
- Claudify - 10 Claude Code Best Practices (2026) - https://claudify.tech/blog/claude-code-best-practices
- Amit Ray - Best Practices for CLAUDE.md: The Ultimate Guide 2026 - https://amitray.com/best-practices-for-claude-md/
- Simon Willison - Comparing the memory implementations of Claude and ChatGPT - https://simonwillison.net/2025/Sep/12/claude-memory/
- Antigravity.codes - Karpathy's CLAUDE.md Skills File - https://antigravity.codes/blog/karpathy-claude-code-skills-guide
- Unwind AI - Karpathy's AI Coding Agent Rant in a Claude.md File - https://www.theunwindai.com/p/karpathy-s-ai-coding-agent-rant-in-a-claude-md-file
- TianPan.co - CLAUDE.md and AGENTS.md: The Configuration Layer - https://tianpan.co/blog/2026-02-25-claude-md-agents-md-ai-coding-agent-instruction-files
- Bojie Li - Claude's Context Engineering Secrets - https://01.me/en/2025/12/context-engineering-from-claude/
- BotMonster - CLAUDE.md Productivity Stack - https://botmonster.com/posts/claude-md-productivity-stack-custom-commands-git-worktrees-agent-rules/
- Milvus Blog - Claude Code Memory System Explained - https://milvus.io/blog/claude-code-memory-memsearch.md
- ClaudeArchitect - Why Claude Forgets Instructions & How to Fix It - https://claudearchitect.com/docs/claude-code/claude-forgetting-instructions/
- jdhodges - Claude Code CLAUDE.md Guide - https://www.jdhodges.com/blog/claude-code-claudemd-project-instructions/
- Rosmur - Claude Code Best Practices - https://rosmur.github.io/claudecode-best-practices/
- Faros AI - Measuring Claude Code ROI - https://www.faros.ai/blog/how-to-measure-claude-code-roi-developer-productivity-insights-with-faros-ai

GitHub repositories (CLAUDE.md exemplars):
- forrestchang/andrej-karpathy-skills - https://github.com/forrestchang/andrej-karpathy-skills/blob/main/CLAUDE.md
- humanlayer/humanlayer - https://github.com/humanlayer/humanlayer/blob/main/CLAUDE.md
- metabase/metabase - https://github.com/metabase/metabase/blob/master/CLAUDE.md
- langchain-ai/langgraphjs - https://github.com/langchain-ai/langgraphjs/blob/main/CLAUDE.md
- langchain-ai/langgraph - https://github.com/langchain-ai/langgraph/blob/main/CLAUDE.md
- hashintel/hash - https://github.com/hashintel/hash/blob/main/CLAUDE.md
- inkline/inkline - https://github.com/inkline/inkline (root CLAUDE.md)
- giselles-ai/giselle - https://github.com/giselles-ai/giselle
- touchlab/DroidconKotlin - https://github.com/touchlab/DroidconKotlin
- CommE2E/comm - https://github.com/CommE2E/comm/blob/master/CLAUDE.md
- ParetoSecurity/pareto-mac - https://github.com/ParetoSecurity/pareto-mac
- VoltAgent/awesome-claude-code-subagents - https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/CLAUDE.md
- basicmachines-co/basic-memory - https://github.com/basicmachines-co/basic-memory
- grahama1970/claude-code-mcp-enhanced - https://github.com/grahama1970/claude-code-mcp-enhanced
- aRustyDev/pre-commit-hooks - https://github.com/aRustyDev/pre-commit-hooks

Curator repositories:
- hesreallyhim/awesome-claude-code - https://github.com/hesreallyhim/awesome-claude-code
- josix/awesome-claude-md - https://github.com/josix/awesome-claude-md
- shanraisshan/claude-code-best-practice - https://github.com/shanraisshan/claude-code-best-practice
- abhishekray07/claude-md-templates - https://github.com/abhishekray07/claude-md-templates
- ArthurClune/claude-md-examples - https://github.com/ArthurClune/claude-md-examples
- FlorianBruniaux/claude-code-ultimate-guide - https://github.com/FlorianBruniaux/claude-code-ultimate-guide
- ChrisWiles/claude-code-showcase - https://github.com/ChrisWiles/claude-code-showcase
- luongnv89/claude-howto - https://github.com/luongnv89/claude-howto
- midudev/autoskills - https://github.com/midudev/autoskills

Bug reports and feature requests:
- Issue #2142 - Claude Code ignores CLAUDE.md security guidelines, exposes API keys - https://github.com/anthropics/claude-code/issues/2142
- Issue #7777 - Claude ignores instruction in CLAUDE.md and agents - https://github.com/anthropics/claude-code/issues/7777
- Issue #13853 - Feature request: ADR loading from ~/.claude/adr/ - https://github.com/anthropics/claude-code/issues/13853

HackerNews discussions:
- Ask HN: What do you put in claude.md (item 44193056) - https://news.ycombinator.com/item?id=44193056
- Show HN: Cck - Auto-generate Claude.md (item 46392375) - https://news.ycombinator.com/item?id=46392375
- Show HN: I got tired of syncing Claude/Gemini/AGENTS.md and .cursorrules (item 47183167) - https://news.ycombinator.com/item?id=47183167
- Show HN: Stop Claude Code from forgetting everything (item 46426624) - https://news.ycombinator.com/item?id=46426624
- Show HN: CryptoMorning (item 47231281) - https://news.ycombinator.com/item?id=47231281
- The creator of Claude Code's Claude setup (item 46470017) - https://news.ycombinator.com/item?id=46470017
- Why is Claude Code better than Cursor? (item 44832662) - https://news.ycombinator.com/item?id=44832662

Reddit aggregators (access):
- r/ClaudeAI synthesis (via aitooldiscovery) - https://www.aitooldiscovery.com/guides/claude-reddit
- r/ClaudeAI synthesis (via morphllm) - https://www.morphllm.com/claude-code-reddit

Empirical/academic:
- ETH Zurich Feb 2026 study - first empirical evaluation of repository context files (SWE-bench Lite + AGENTbench, 4 agents, 300 tasks) - cited via Thomas Wiegold blog and wolfejam HN comment on item 47183167

Twitter/X (primary sources):
- Nick Dobos curation - https://x.com/NickADobos/status/2009878129184256477
- Praise Akinlami - https://x.com/Praiseakinlami/status/2018359352965411097
- Karpathy Jan 27 2026 tweet - (archived via forrestchang/andrej-karpathy-skills README)

---

End of R7.
