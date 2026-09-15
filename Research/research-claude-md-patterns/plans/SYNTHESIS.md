---
title: CLAUDE.md Patterns 2026 - Deep Research Synthesis
campaign: research-claude-md-patterns
date: 2026-04-17
model: Opus 4.7
word_target: 8000-10000
citation_format: R<N>.C<M>
status: complete
reports_reviewed: 7
extracts_consumed: 7
critic_verdicts: {PASS: 5, PASS_WITH_NOTES: 2, REVISE: 0}
conflicts_resolved: 12
---

# CLAUDE.md Patterns 2026 - Deep Research Synthesis

## Executive Summary

CLAUDE.md is not a config file. It is an instruction stack, delivered as a user message after the system prompt, concatenated from four tiers (Managed policy, User, Project, Local) plus auxiliary mechanisms (`.claude/rules/*.md`, `@import`, ancestor walk, lazy subfolder overlay). Nothing overrides anything else at the loading layer. When two rules contradict, Claude resolves the conflict probabilistically using tail bias and specificity (R1.C21, R2.C1, R2.C8, R5.C22). This single mental shift is the most important takeaway of this report: practitioners who treat CLAUDE.md as a config file inevitably write contradictions, add more emphasis markers to compensate, and discover the file degrades in compliance as sessions lengthen. Practitioners who treat it as an instruction stack prune relentlessly, co-locate context at the level where decisions happen (project root for universal rules, `packages/*/CLAUDE.md` for local specializations), and reach for hooks or managed settings the moment a rule must be enforced deterministically.

Three findings are central and cross-confirmed by at least three of the seven reports. First, the plugin CLAUDE.md does not exist; plugin architecture intentionally routes guidance through skills, agents, hooks, MCP, and settings, and Anthropic shows no sign of deprecating CLAUDE.md in favor of AGENTS.md (R1.C2, R6.C35, R5.C12). Second, hooks beat CLAUDE.md for hard enforcement, empirically and architecturally: Issue #2142 documents three live API keys committed by Claude Code despite a 150+ line security section in CLAUDE.md, and Anthropic's own managed-settings documentation states flatly that CLAUDE.md instructions "are not a hard enforcement layer" (R7.C7, R6.C15, R4.C12). Third, the community converged in early 2026 on a less-is-more orthodoxy that reflects instruction budget economics, compliance decay with message count, and the ETH Zurich empirical finding that auto-generated CLAUDE.md files actively decrease agent success rates (R7.C1, R7.C9, R7.C11).

This document is designed to be read by a practitioner who needs to decide what goes in root CLAUDE.md, what goes in `packages/*/CLAUDE.md`, what goes in `.claude/rules/*.md`, what goes in a skill, what goes in a hook, and what does not belong anywhere in the memory system. It includes a quick reference card, five drop-in starter templates per project type, and an appendix of open questions that remain unsettled as of April 2026.

---

## Part 1: Mental Model - CLAUDE.md is an Instruction Stack, NOT Config

### 1.1 The fundamental architecture: user message after system prompt

The single most load-bearing claim in this synthesis is that CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself. Anthropic's memory documentation states this verbatim in the troubleshooting section "Claude isn't following my CLAUDE.md": Claude reads it and tries to follow it, but there is no guarantee of strict compliance, especially for vague or conflicting instructions (R1.C3, R3.C01, R4.C14, R6.C46).

This positioning has three consequences that practitioners repeatedly miss:

1. **System-level instructions can supersede CLAUDE.md.** Plan mode, for example, includes "This supersedes any other instructions" in its system prompt, and user CLAUDE.md directives like "IMPORTANT: OVERRIDE" have zero effect against it. Issue #30634 documented this confusion and it was closed without API change (R2.C6).

2. **There is no strict-compliance guarantee.** CLAUDE.md is advisory prose that the model tries to follow. This is why CLAUDE.md is the wrong layer for hard rules (Part 6 below), and why hooks are the right layer.

3. **The cache breakpoint sits at the boundary between system prompt and messages**, which means editing CLAUDE.md invalidates the prefix from that breakpoint forward and triggers a cache-miss turn at the 25% write-rate premium (R3.C13, R6.C45).

Once internalized, this one architectural fact explains most other CLAUDE.md behavior: why bloat hurts (it fills the user message), why compliance decays (the user message recedes as conversation grows), why hooks enforce where CLAUDE.md cannot (hooks intercept outside the LLM loop), and why Plan mode ignores overrides.

### 1.2 Concat, not override: how discovered files combine

All discovered CLAUDE.md files are concatenated into context rather than overriding each other. This phrase is verbatim from the official memory documentation, "How CLAUDE.md files load" (R1.C21, R2.C1, R5.C10). No level is "winning" over another at the loading layer. What looks like precedence is emergent from three factors:

- **Ordering**: Managed -> User -> Project ancestors -> `.claude/CLAUDE.md` -> `.claude/rules/` -> CLAUDE.local.md -> lazy subfolder overlay (R2.C7, R5.C21). CLAUDE.local.md is appended after CLAUDE.md at each directory level, so "when instructions conflict, your personal notes are the last thing Claude reads at that level" (R1.C21, R3.C23).

- **Tail bias**: LLMs exhibit recency bias in instruction following, so the last instruction about topic X tends to be honored when competing instructions exist. This is behavioral, not deterministic. R2 frames this as the de facto precedence mechanism (R2.C2).

- **Specificity**: Concrete, scoped instructions outcompete generic ones. "This repo uses npm" beats "pnpm preferred" when both are loaded (R2.C14).

The docs are explicit that when two rules contradict each other, Claude may pick one arbitrarily (R1 memory docs, R2.C8, R5.C22). There is no deterministic conflict resolver. This reality is obscured by the common expectation that project would "override" user or that nested would "override" root, borrowed from config-file mental models. CLAUDE.md has no such override primitive. Resolving conflicts requires curating the stack so contradictions do not coexist.

### 1.3 Four tiers (not three, not five): Managed, User, Project, Local

Four tiers are documented in official memory docs, and all four reports that examined tiering (R1, R2, R5, R6) agreed. This is a **HIGH-confidence consensus** finding per CRITIC conflict 2.

| Tier | Path | Scope | Distributed via |
|------|------|-------|-----------------|
| Managed policy | OS-specific; macOS `/Library/Application Support/ClaudeCode/CLAUDE.md`, Linux/WSL `/etc/claude-code/CLAUDE.md`, Windows `C:\Program Files\ClaudeCode\CLAUDE.md` | Org-wide, cannot be excluded | MDM, Group Policy, Ansible (R1.C19) |
| User | `~/.claude/CLAUDE.md` | Personal, across all projects | Dotfile, private | 
| Project | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Team-shared via git | Git repo |
| Local | `./CLAUDE.local.md` | Per-project, personal, gitignored | `.gitignore` |

Two features to notice:

- **Managed cannot be excluded.** `claudeMdExcludes` in settings (at user/project/local/managed layers) does not apply to Managed policy CLAUDE.md - this makes it the only tier with hard guarantee of loading regardless of individual settings (R1.C14, R2.C3, R5.C24). This is the correct layer for enterprise security/compliance guidance that must reach every session.

- **CLAUDE.local.md is NOT deprecated.** Community folklore (HN threads, dev.to posts) sometimes treats CLAUDE.local.md as legacy, and R7 flagged "unclear official status." The CRITIC resolved this conflict (Konflikt 9) in favor of R5 and R1: current memory docs still describe CLAUDE.local.md as "loads alongside CLAUDE.md and is treated the same way" (R1.C11, R5.C29). It is a first-class tier.

Plus three auxiliary mechanisms (detailed in Part 4):

- `.claude/rules/*.md` with optional YAML `paths:` frontmatter for path-scoped lazy loading (R1.C8, R5.C20).
- `@import` syntax with 5-hop maximum recursion depth (R1.C6, R3.C10, R5.C2).
- Ancestor walk up from cwd + lazy subfolder overlay when Claude reads files below cwd (R1.C16, R5.C10, R5.C11).

### 1.4 What plugins CAN and CANNOT contribute (Plugin CLAUDE.md does NOT exist)

Four of seven reports (R1, R2, R5, R6) independently confirmed that plugins cannot ship a CLAUDE.md. The plugin directory structure documented in plugins.md lists: `.claude-plugin/plugin.json`, `skills/`, `commands/`, `agents/`, `hooks/hooks.json`, `.mcp.json`, `.lsp.json`, `monitors/`, `bin/`, `settings.json`. There is no slot for CLAUDE.md (R1.C2, R2.C4, R5.C12, R6.C35). CRITIC Konflikt 2 rated this HIGH-confidence consensus with four independent confirmations.

What plugins contribute instead:

- **Skills** (descriptions eager up to 1536 chars, bodies lazy on invocation, R6.C5, R6.C4).
- **Subagents** via `agents/` directory.
- **Hooks** via `hooks/hooks.json` (these ADD to project hooks sequentially, do not override, R5.C13).
- **MCP servers** via `.mcp.json`.
- **Settings** via `settings.json` (but only `agent` and `subagentStatusLine` keys are honored, R1.C28).

The intended path for plugin-contributed guidance is a skill with `user-invocable: false`, which loads its description unconditionally but its body only on invocation. Plugin skills are always namespaced as `plugin-name:skill-name` and cannot shadow project/user skills (R6.C37). A user's CLAUDE.md can reference unqualified `/deploy` and will resolve to the project or user skill; forcing the plugin version requires explicit `/acme:deploy` invocation.

Note for practitioners building "plugin-like" structures outside the plugin system: one pattern validated in R6.C_PRESET_CATALOG is a three-tier lazy load where `~/.claude/CLAUDE.md` contains a 7-line routing instruction, `~/.claude/PRESET_CATALOG.md` is loaded on first routing decision, and per-preset prompts are loaded on invocation. This is cheaper than any monolithic CLAUDE.md containing all preset prompts and survives /compact gracefully (R6.C_PRESET_CATALOG).

---

## Part 2: Auto-Loading Mechanics

### 2.1 Cold-start lifecycle: discovery walk and eager load

At session start, Claude Code performs the following in order (R3 section 2 ASCII diagram, reconstructed from R1.C16, R3.C15, R5.C10):

1. **Managed policy** CLAUDE.md loaded from the OS-specific path (if present).
2. **User** CLAUDE.md loaded from `~/.claude/CLAUDE.md`.
3. **User-level rules** from `~/.claude/rules/*.md` (unscoped rules load eagerly; rules with `paths:` frontmatter are lazy, R1.C22).
4. **Ancestor walk**: from cwd up to filesystem root, loading every CLAUDE.md encountered. These are all loaded eagerly at launch (R2.C10, R5.C10).
5. **Project** `./CLAUDE.md` or `./.claude/CLAUDE.md`.
6. **Project rules** from `.claude/rules/*.md` (same eager/lazy distinction as user rules).
7. **CLAUDE.local.md** at cwd, appended after CLAUDE.md at the same level (R1.C21, R3.C23).

Subfolder CLAUDE.md files **below** cwd are discovered but NOT loaded at session start. They load lazily the first time Claude reads a file from that subfolder - the `load_reason: 'nested_traversal'` event on InstructionsLoaded (R1.C16, R2.C10, R5.C11). This is the killer feature for monorepos: `packages/api/CLAUDE.md` only enters context when Claude touches a file in `packages/api/`. Sibling isolation is automatic - working in `packages/api/` never loads `packages/web/CLAUDE.md` (R2.C11).

Representative token budgets from the context-window visualization (R1.C27): user `~/.claude/CLAUDE.md` around 320 tokens, project CLAUDE.md around 1800 tokens, per-skill description around 450 tokens, per path-scoped rule around 380 tokens. Worst-case enterprise monorepo startup budget measured by R2 reaches around 9200 tokens (Managed 1600 + User 1600 + User rules 1200 + Project root 2400 + Project rules 2000 + Local 400), which is 9-12% of a 100k context window consumed before the first task (R2.C17). Related empirical measurement: an empty "hi" prompt against Claude Code consumes approximately 53k tokens before the conversation begins, with memory files (CLAUDE.md) accounting for 10k to 18k tokens (19-34%) per Issue #19105 (R3.C07). CRITIC flagged this number as order-of-magnitude rather than precise (Issue #19105 closed as duplicate), but the proportion of startup budget consumed by memory files is the actionable takeaway.

### 2.2 Steady-state: edits are inert until re-injection

Editing CLAUDE.md mid-session does not cause Claude to re-read it. Edits remain inert until a re-injection event occurs. There are exactly two re-injection events: session start and `/compact` (R3.C05). The `/memory` command opens CLAUDE.md for editing but does NOT force a re-read mid-session (R3.C28).

This is an explicit asymmetry with skills, which DO have live change detection: the skills documentation says "Claude Code watches skill directories for file changes. Adding, editing, or removing a skill... takes effect within the current session without restarting" (R3.C25). There is no equivalent for CLAUDE.md.

Two implications:

- **No `/reload` command exists.** Feature requests #17127 and #22085 were both closed as duplicates in January 2026. The only way to force CLAUDE.md re-read mid-session is to trigger `/compact` or restart the session (R3.C03).
- **CwdChanged hook fires on `cd` but does NOT re-walk the ancestor tree.** New CLAUDE.md files entering the discovery area after a `cd` still load lazily on next file read from the new subtree, not eagerly (R3.C06).

For dynamic context that must enter mid-session (current git branch, open PR count, recent changes), use a SessionStart hook with `hookSpecificOutput.additionalContext` rather than CLAUDE.md. R1.C25 draws the canonical line: "For static context that does not require a script, use CLAUDE.md instead."

### 2.3 /compact: what survives, what is lost, what is re-injected

The canonical source for compaction behavior is the "What survives compaction" table in context-window.md (R1.C5, R3.C02). Per that table:

| Item | Post-compact behavior |
|------|----------------------|
| Project-root CLAUDE.md and unscoped rules | Re-injected from disk |
| Rules with `paths:` frontmatter | Lost until a matching file is read again |
| Nested CLAUDE.md in subdirectories | Lost until a file in that subdirectory is read again |
| Invoked skill bodies | Re-injected, capped at 5k tokens per skill and 25k tokens total; oldest dropped first (R1.C24, R6.C48) |
| Startup skill listing | Dropped; rebuilt fresh at cwd resolution |
| Auto-memory MEMORY.md | Re-read, first 200 lines or 25KB whichever smaller (R3.C27) |

CRITIC Konflikt 3 resolved that re-injection is a separate mechanism from the concat model: concat describes how files combine at load time, tail bias describes how conflicts are resolved behaviorally, and re-injection describes what is re-read from disk post-compact. These are three layers of the same system.

One unresolved question: user CLAUDE.md post-compact. The context-window table lists "Project-root CLAUDE.md and unscoped rules" but does not name the user tier explicitly. Issue #22085 suggested user CLAUDE.md behavior was inconsistent historically. R2 claims user CLAUDE.md survives compaction; R3 flags this as a gap (R3.C14). CRITIC ruled R3's gap framing the safer position (confidence MEDIUM). Practitioners should not rely on user CLAUDE.md behavior post-compact without empirical verification via InstructionsLoaded hook with `load_reason: 'compact'`.

Cache-specific behavior post-compact deserves separate mention. There were three distinct 2026 regressions that affect CLAUDE.md cache behavior, resolved as separate issues in CRITIC Konflikt 5:

1. **Feb 5 2026**: Anthropic moved cache scope from organization-level to workspace-level isolation. Teammates in the same org no longer share cache entries (R6.C47).
2. **v2.1.62 resume cache regression (Issue #29230)**: sessions that undergo `/compact` exhibit silent prompt cache break on `--resume`, rebuilding tokens from scratch on every turn, up to 20x cost spike (R6.C47).
3. **Early March 2026 TTL regression (Issue #46829)**: default ephemeral cache TTL silently regressed from 1 hour to 5 minutes (R3.C04).

The combined effect is that CLAUDE.md edits are more expensive in 2026 than in 2025, and practitioners under the v2.1.62+ regression should prefer cold restart over `--resume` after `/compact` until the KV cache regression is patched.

### 2.4 @import resolution: 5-hop ceiling, relative vs absolute vs home-relative

The `@path/to/file.md` import directive is resolved eagerly at launch. Imported files are expanded and loaded into context alongside the parent CLAUDE.md. Maximum recursion depth is 5 hops; beyond that, behavior is documented only as "maximum depth of five hops" without specifying whether hop 6 is silent-skip, warning, or hard error (R1.C6, R3.C10, R3.C11, R5.C2). Community testing suggests silent truncation, but docs do not confirm (CRITIC Konflikt 4, gap D2/D7).

Path resolution rules:

- **Relative paths** resolve relative to the file containing the import, NOT cwd. This is critical for shared templates stored in `~/.claude/common/` (R5.C3).
- **Absolute paths** are allowed (`@/etc/company/rules.md`).
- **Home-relative paths** via `@~/.claude/my-project-instructions.md` are documented and recommended for multi-worktree personal overlays (R3.C24, R5.C4).
- **Remote URLs** (`@https://example.com/rules.md`) are NOT documented as supported. Docs say only "relative and absolute paths are allowed." Community testing confirms silent skip, but no official statement confirms or denies remote URL support (R1.C7, R5.C5, CRITIC gap D7). Workarounds: git clone private repo + local import, or symlinks.

External imports (paths outside cwd) trigger an approval dialog the first time Claude encounters them. If declined, the dialog does not appear again and the imports remain disabled for the project (R1.C20, R3.C30, R5.C6). Where the "declined" state is stored is not documented (R1 gap G9).

Missing imported files are silently skipped. `@missing.md` is removed from the injected block with no error; Claude simply does not see that content (R5.C9). Use `/memory` to verify the list of loaded files.

Circular reference detection is documented explicitly for symlinks in `.claude/rules/` ("circular symlinks are detected and handled gracefully", R5.C8) but NOT documented for `@import`. Community analysis extrapolates from the skills loader (which maintains a "currently loading" set and raises a Circular Dependency Detected error) but this is inference, not guarantee (R5.C7, R5.C8). Treat @import cycles as "probably detected, but untested beyond 5 hops."

### 2.5 Observability: InstructionsLoaded hook and its five `load_reason` values

The InstructionsLoaded hook fires whenever a CLAUDE.md or `.claude/rules/*.md` file is loaded into context. Three reports (R1, R3, R6) agreed on the complete enum of `load_reason` values:

| `load_reason` | Trigger |
|---------------|---------|
| `session_start` | Eager load at cold start |
| `nested_traversal` | Lazy load when Claude reads a file in a subdirectory containing CLAUDE.md |
| `path_glob_match` | `.claude/rules/*.md` with `paths:` frontmatter, triggered by matching file read |
| `include` | Resolving an `@import` directive |
| `compact` | Re-injection during `/compact` |

Payload also includes `file_path`, `memory_type` (User/Project/Local/Managed), `globs`, `trigger_file_path`, and `parent_file_path` (R1.C9, R3.C09, R6.C19). Decision control is none - this is audit-only, non-blocking.

This hook is the practitioner's golden observability surface. Questions this hook answers empirically:

- Does user CLAUDE.md re-inject on /compact? (Fires InstructionsLoaded with `load_reason: 'compact'`.)
- What is the ancestor-walk concat order for monorepo with three-level CLAUDE.md? (Log timestamps.)
- Which path-scoped rules actually fire when Claude touches a file? (`load_reason: 'path_glob_match'`.)
- Are `@import` cycles detected or silently truncated? (Monitor hop count via `parent_file_path` chain.)

Gap G7 from R6 noted that the hook receives `file_path` but not file content, so debugging content-level issues still requires the hook to `cat` the file itself.

### 2.6 Cache interaction: CLAUDE.md edits and the cached prefix

The prompt cache hierarchy is tools -> system -> messages, with changes at each level invalidating that level and all subsequent levels (R6.C45). CLAUDE.md sits in the messages tier, specifically as a user message after system prompt (R6.C46).

Any byte change in the cached prefix (system prompt + tools + CLAUDE.md + history) invalidates the prompt cache. A CLAUDE.md edit triggers a cache-miss turn at 25% write-rate premium (R3.C13). On the next turn, the full CLAUDE.md block is uploaded as `cache_creation_input_tokens` at write rate (25% premium over standard input), not as `cache_read_input_tokens` at read rate (10% of normal price). The impact is per-turn until the cache rebuilds.

Mid-session edits to an `@import`'d file (`docs/x.md`) are inferred NOT to invalidate cache immediately, only at next re-injection. R3 flagged this as gap C26 - docs do not confirm this timing. If verification is needed, use InstructionsLoaded with `load_reason: 'include'` to log when imports re-resolve.

---

## Part 3: Writing Best Practices

### 3.1 The mid-level abstraction rule

Anthropic's memory docs define the target content as "facts Claude should hold in every session" (R4.C7). The operative level is mid-level abstraction: not platitudes ("write good code"), not code-visible details ("this function takes a string"), but the persistent truths a fresh-session Claude needs to do useful work in this repo.

Examples of mid-level facts:

- "This codebase uses pnpm, not npm. Commands like `pnpm install` will fail if you use `npm`."
- "Tests run via `npm test`. Lint runs via `biome check`. CI runs both before merge."
- "Zod is the validation library. Yup in `packages/legacy-api/` is intentional and must stay."
- "Comments, commits, and PR descriptions in English. User-facing strings in Polish."

Not mid-level:
- "Use 2-space indentation" (this is a linter's job - R4.C18).
- "Write clean code" (platitude).
- "The `parseUserInput` function in `src/utils.ts` accepts a string and returns a parsed object" (code-visible, redundant with reading the file).

Shrivu Shankar's reactive-guardrails framing is useful here: build CLAUDE.md from Claude's actual mistakes, not preemptively from everything imaginable (R4.C6). When Claude gets something wrong twice in different conversations, that is a candidate for a mid-level fact in CLAUDE.md. When Claude gets something wrong three or more times after a CLAUDE.md rule is added, that rule is a candidate for migration to a hook or lint rule (R4.C13, Part 6 below).

### 3.2 What TO put in CLAUDE.md

Drawing from R4.C1, R4.C7-C9, R4.C27, and R7.C22, the positive content categories are:

1. **Non-guessable commands**: build, test, lint, typecheck, run, migrate. Specific invocations, not generic names. "`pnpm run test:integration` runs the Postgres-backed suite" (R4.C4 Metabase example).
2. **Tool preferences**: "Use `ripgrep` not `grep`. Use `fd` not `find`. Use `gh` for GitHub API, not `curl`." Tool-specific commands had measurable 160x effect in the ETH Zurich study - this category of instruction gets the highest empirical lift (R7.C11).
3. **Project conventions**: package manager, test framework, validation library, formatter, key architecture decisions with non-obvious tradeoffs.
4. **Directory semantics**: "Business logic in `src/domain/`. Adapters in `src/infra/`. Don't mix them."
5. **File:line reference pointers**: "For deployment rules see `docs/DEPLOY.md`. For on-call runbook see `docs/ONCALL.md`." File:line pointers beat pasted code blocks because references stay live while snippets go stale (R7.C15).
6. **Security/compliance statements** (but only at the advisory level - see Part 6 for the hooks requirement).
7. **Language/communication conventions**: "Comments and commits in English. Conversation can be mixed PL/EN." (R2.C12 scenario).
8. **Per-package scope in monorepo root**: "packages/api uses Express + Prisma. packages/web uses Next.js + Prisma. packages/shared is pure TypeScript, no runtime deps." This arms the lazy subfolder overlay with the right context (Part 4 below).

HumanLayer's WHAT / WHY / HOW structure is a useful scaffold for sub-100-line files: WHAT (stack, architecture), WHY (purpose, non-obvious context), HOW (workflows, commands) (R4.C8).

### 3.3 What NOT to put (ephemera, secrets, linter-replaceable rules)

1. **Ephemera**: current sprint plans, TODO lists, task state, "working on feature X this week." Use `plans/` folder, GitHub issues, or scratch files. CLAUDE.md is timeless (R4.C22).
2. **Secrets**: API keys, tokens, passwords, any credential. CLAUDE.md is auto-committed to git via project tier. Issue #2142 is the case study: three live API keys committed by Claude Code despite a 150+ line security section in CLAUDE.md (R7.C7).
3. **Linter-enforceable rules**: indentation, quote style, trailing commas, semicolons, import order. HumanLayer's rule: "Never send an LLM to do a linter's job. LLMs are comparably expensive and incredibly slow compared to traditional linters and formatters." Run Biome, Prettier, ESLint, oxlint instead (R4.C18, R7.C14).
4. **Code-visible details**: function signatures, type shapes, exact implementation. Claude reads files on demand; duplicating code in CLAUDE.md bloats the file and goes stale.
5. **Contradictory rules across sections**: "If two rules contradict each other, Claude may pick one arbitrarily" (R4.C20). Duplication does not help compliance; it creates contradictions.
6. **Emphasis inflation**: IMPORTANT, YOU MUST, CRITICAL, NEVER on every bullet. When everything is emphasized, nothing is. Anthropic's guidance: emphasis tunes adherence "when used sparingly" - 2-3 times max per file (R4.C19, R4.C24).
7. **Negation-heavy phrasing**: "Do NOT use semicolons" activates the concept of semicolons. "Use named exports" beats "no default exports." R4.C10 (dev.to docat0209) is the canonical source; R4.C11 (Shrivu) adds that restrictions without alternatives confuse agents.
8. **Pasted code blocks instead of file:line refs**: snippets go stale; references stay live (R7.C15).
9. **Everything that changed in the last sprint**: if you keep updating CLAUDE.md week-over-week, it is operating as a journal, not a constitution. Move to `docs/CHANGELOG.md` or GitHub.
10. **`/init` boilerplate left unpruned**: `/init` output is a draft. HumanLayer: "Don't use `/init` or auto-generate your CLAUDE.md." If used, prune manually (R4.C21, R7.C12). The ETH Zurich study (R7.C9) found auto-generated CLAUDE.md files actively decreased success rates and raised costs by around 20%.

### 3.4 Size: the 200 / 60-100 / 30 line framework

CRITIC Konflikt 11 resolved the apparent tension between Anthropic's 200-line soft target and community observations of 60-80 or 30-line optima as a two-stage framework:

| Threshold | Source | Meaning |
|-----------|--------|---------|
| 30 lines | dev.to docat0209 "30-Line Rule" | Extreme minimalism, viable for solo/simple projects (R4.C2) |
| 54 lines | Metabase root CLAUDE.md in production | Real-world minimalist benchmark (R4.C4, R7.C18) |
| < 60 lines | HumanLayer essay target | Most-cited 2026 best practice; anecdotal report of compliance improvement after rewriting from ~180 lines (R4.C3, R7.C5, R7.C6) |
| 80 lines | abhishekray07 template rule | Community-observed threshold above which "Claude starts ignoring parts" (R7.C13) |
| < 200 lines | Anthropic soft target | Official ceiling from memory docs: "longer files consume more context and reduce adherence" (R1.C12, R2.C19, R4.C1) |
| 200-300 lines | Reddit complaints ceiling | Community observation: past this "Claude reliably ignores content" (R7.C13, R7.C25) |
| 400+ lines | Shrivu Shankar "constitution" | Professional exception, requires meticulous curation |
| 600+ lines | Reddit failure reports | "My CLAUDE.md is 600 lines and Claude clearly stopped reading" (R7.C25) |

The operational guidance that emerges:

- **Root CLAUDE.md: aim for 60-100 lines.** This is the empirical sweet spot from best-in-class public examples and HumanLayer's anecdote.
- **Hard ceiling: 200 lines** per Anthropic, above which both cost and adherence measurably degrade.
- **When exceeding 80-100 lines**, start splitting:
  - Move path-scoped rules to `.claude/rules/*.md` with `paths:` frontmatter (lazy).
  - Move multi-step procedures to skills (descriptions stay, bodies lazy).
  - Move deep documentation to `docs/*.md` and reference via file:line pointers (not `@import`, which eager-loads).
  - Create `packages/*/CLAUDE.md` overlays for monorepo subsystems (lazy).

The key insight: a 500-token CLAUDE.md costs 500 tokens on every single inference turn (R4.C15). A 2000-line CLAUDE.md drains around 25k tokens from every turn's budget, which is 25% of a 100k window before any task begins. alexop.dev's framing of per-inference cost is the actionable math.

### 3.5 Compliance decay and the instruction budget

Two empirical findings converge to explain why smaller CLAUDE.md files get better compliance:

**Finding 1 - Compliance decay with message count.** Thomas Wiegold's blog, citing Khare, published a compliance curve:
- Messages 1-2: 95%+ compliance
- Messages 3-5: 60-80% compliance
- Messages 6-10: 20-60% compliance
- Beyond 10: "original instructions mostly lost" (R7.C8)

CRITIC Konflikt 6 flagged that these specific percentages have MEDIUM confidence because the Wiegold/Khare attribution chain is blurry; the trend direction is HIGH confidence (cross-confirmed by Anthropic's official "no guarantee of strict compliance" language, R1.C3). Practitioners should treat the numbers as approximately-right and the trend as definitely-right.

**Finding 2 - Instruction budget finite.** HumanLayer cites "frontier thinking LLMs follow 150-200 instructions with reasonable consistency" (R7.C5). Claude Code's system prompt consumes around 50, leaving around 100-150 for CLAUDE.md. Every weak instruction dilutes strong instructions proportionally (R2.C18).

**Finding 3 - Position within file matters.** Information placed in the middle of long contexts is recalled less reliably than information at the beginning or end - "lost in the middle" / primacy + recency bias (R4.C16). Rules buried mid-file in a 2000-line CLAUDE.md are effectively invisible. The top and bottom of CLAUDE.md are the valuable real estate.

**Finding 4 - Auto-generated content actively harms**. ETH Zurich's February 2026 empirical study (cited secondarily via Wiegold blog and wolfejam HN comment - CRITIC marked this MEDIUM confidence for specific numbers, HIGH for direction) reported that auto-generated CLAUDE.md files decrease success rates and increase cost around 20%, while human-written files give around 4% improvement on AGENTbench (R7.C9). In a CLAUDE.md-specific ablation with all docs stripped from the repo, the file helped with a consistent 2.7% improvement (R7.C10). Tool-specific commands had a 160x effect on tool usage (R7.C11).

The practical consequence: the most effective CLAUDE.md is short, specific, tool-rich, and hand-curated from observed failures. "Context architecture over prompting" is R7.C22's framing for the 2026 orthodoxy.

### 3.6 Positive over negative, specific over vague

Two style guidelines with strong empirical basis:

**Positive over negative.** Language models struggle with negation; the prohibited concept is activated regardless. "Do NOT use semicolons" still activates semicolons in Claude's attention. Rewrite as "Use ASI-style line endings; omit trailing semicolons" or "Use named exports (never default exports)" - paired instruction: the preferred path plus the prohibition (R4.C10, R4.C11).

**Specific and verifiable over vague.** Anthropic's guidance: "Use 2-space indentation" beats "Format code properly" (R4.C9). The more concrete and verifiable the instruction, the more consistently Claude follows it. Concrete heuristics:
- Include exact command (not "run the tests" but "`pnpm test:unit`").
- Include exact file path (not "check the docs" but "see `docs/DEPLOY.md`").
- Include specific tool (not "use a linter" but "`biome check --write`").
- Make rules verifiable ("PR title starts with JIRA ticket ID" is verifiable; "write good PR titles" is not).

Positive phrasing + specificity + alternatives together produce the highest measured compliance rates.

---

## Part 4: Multi-file Organization

### 4.1 @import syntax, depth, path resolution

Covered in Section 2.4 above. Key points repeated for multi-file context:

- `@path/to/file.md` eager-loads at launch (R5.C1).
- Maximum depth 5 hops (R5.C2).
- Relative paths resolve to the containing file, not cwd (R5.C3).
- Home-relative `@~/` expansion supported (R5.C4).
- External imports trigger approval dialog; declined = permanent disable until settings edit (R5.C6).
- Missing imports silently skipped (R5.C9).

Typical import graph from R5.C30: `CLAUDE.md(0) -> AGENTS.md(1) -> conventions.md(2) -> glossary.md(3)`, safely within the 5-hop limit. Most practical patterns use only 1-2 hops; the 5-hop ceiling mostly affects meta-templates with N levels of delegation.

`@import` is eager and expensive. Use it for content that truly must be in every session. For deep docs that should load on demand, use file:line pointer references instead (Shrivu's "pitch don't embed" model, R4.C25).

### 4.2 `.claude/rules/*.md` with and without `paths:` frontmatter

This is the official system for splitting CLAUDE.md into topic-scoped files. Key distinction:

- **Without `paths:` frontmatter** - loaded at session start with same priority as `.claude/CLAUDE.md` (eager). Unscoped rules survive `/compact` re-injection. Example use: project-wide conventions that do not depend on which files are being touched (R1.C8, R5.C20).

- **With `paths:` frontmatter** - lazy. Loaded only when Claude reads a file matching the glob pattern. Event: `load_reason: 'path_glob_match'`. These do NOT survive `/compact` re-injection; they reload next time a matching file is read (R1.C5, R5.C20).

```yaml
---
paths:
  - "packages/api/**/*.ts"
  - "packages/api/**/*.test.ts"
---

# API conventions
- Use Zod schemas for all request validation
- ...
```

User-level rules (`~/.claude/rules/*.md`) are loaded BEFORE project rules, giving project rules higher priority via tail bias (R1.C22).

One asymmetry noted in R1 CONFLICT-3: rules have explicit priority language in docs ("user-level rules are loaded before project rules, giving project rules higher priority"), while CLAUDE.md has only "concatenated rather than overriding" language. Rules feature has semantics closer to config-style precedence; CLAUDE.md remains pure stack.

### 4.3 Monorepo patterns: ancestor + lazy subfolder, Turborepo canonical

The canonical Turborepo monorepo pattern (R5.C15) combines lean root + per-package overlays:

```
/repo/
  CLAUDE.md                      # ~150 lines: tech stack, universal rules, package inventory
  .claude/
    rules/
      security.md                # eager, unscoped
      api-style.md               # paths: ["packages/api/**"]
  packages/
    api/
      CLAUDE.md                  # ~60 lines: Express, Prisma, Zod, port 4000
      src/
    web/
      CLAUDE.md                  # ~60 lines: Next.js, Prisma, port 3000
      app/
    shared/
      CLAUDE.md                  # ~30 lines: pure TS, no runtime deps
      src/
```

How it loads:
- Session start in `/repo/`: Managed + User + `/repo/CLAUDE.md` + unscoped rules + CLAUDE.local.md.
- Sibling isolation: working in `packages/api/` does NOT load `packages/web/CLAUDE.md`. Confirmed by R2.C11 and R5.C11.
- Lazy overlay: first file read from `packages/api/` triggers `load_reason: 'nested_traversal'` and `packages/api/CLAUDE.md` enters context.
- Post-compact: root + unscoped rules re-inject; nested `packages/*/CLAUDE.md` lost until next file read from that subfolder.

The dev.to anvodev empirical report (R5.C16) documented reduction from 47k words to 9k words in main CLAUDE.md (around 80-90% savings) by moving scoped content to packages. This is the largest token-budget win available from multi-file organization.

Conflict scenario from R2.C16 is illustrative: if `packages/legacy-api/CLAUDE.md` says "use Yup for validation" while root says "use Zod everywhere," working in legacy-api loads both, tail bias + specificity means Yup wins in that subfolder, and Zod wins everywhere else. This is the hierarchy working correctly.

### 4.4 Virtual monorepo (N independent repos)

A less-common but distinctive pattern documented by R5.C17 (Medium DevOps AI article): firms with many independent repos (35+) create a `workspace/` directory where each subfolder is an independent git repo, each with its own CLAUDE.md, and a root `workspace/CLAUDE.md` describes cross-service interconnections.

This is distinct from the Turborepo pattern because each subfolder has independent git history. The root CLAUDE.md cannot assume any particular file exists in subfolders; it describes the system-of-systems at the level of "payments-service depends on auth-service via gRPC on port 9090."

Use case: platform/infra teams that must reason across many services but cannot mandate monorepo consolidation. This is the only pattern in the corpus that specifically addresses this topology.

### 4.5 claudeMdExcludes, --add-dir, CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD

Three settings-level mechanisms for managing CLAUDE.md discovery:

**claudeMdExcludes** (R1.C13, R5.C24): glob patterns against absolute paths, configurable at user/project/local/managed settings layers. Arrays merge across layers. Managed policy CLAUDE.md CANNOT be excluded by this mechanism. Use case: in a monorepo, exclude `packages/*/CLAUDE.md` for packages owned by other teams when working in your own package.

**--add-dir** (R1.C17, R3.C17, R5.C25, R6.C52): grants file access to directories outside cwd, but does NOT load CLAUDE.md from those directories by default. This is a deliberate design: merely adding a directory for read access should not pollute the context with its CLAUDE.md.

**CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1** (same sources): env var that opts in to loading CLAUDE.md, `.claude/CLAUDE.md`, `.claude/rules/*.md`, and CLAUDE.local.md from `--add-dir` paths. This is the cross-repo pattern when you genuinely want to share company rules across multiple repos without managed policy deployment.

Relative precedence between `@import` and `claudeMdExcludes` is a gap: R5 flagged that which wins when an imported file matches an exclude pattern is unconfirmed.

### 4.6 Four-layer mental model (L1 Universal / L2 Project / L3 Module / L4 Task)

R5.C23 proposed a clean mental model:

| Layer | File | Scope | Example content |
|-------|------|-------|-----------------|
| L1 Universal | `~/.claude/CLAUDE.md` | Just me, every project | Personal coding preferences, preferred shell commands, never commit without diff review |
| L2 Project-wide | `./CLAUDE.md` | Team via git | Tech stack, commands, architecture, package inventory |
| L3 Module-specific | `packages/*/CLAUDE.md` or `.claude/rules/` | Loaded on demand | Package-specific conventions, framework-specific quirks |
| L4 Task-specific | `plans/CURRENT.md` or GitHub issue | Ephemeral | Current sprint plan, working-on-now context |

L4 should NEVER be in CLAUDE.md. This is the ephemera rule (R4.C22). The separation of task state from timeless constitution is the single largest source of CLAUDE.md bloat in the wild.

R7's Meszaros 6-level capability model (L0 Absent / L1 Basic / L2 Scoped / L3 Structured / L4 Abstracted / L5 Maintained / L6 Adaptive) is a related but different frame, describing how mature a team's CLAUDE.md practice is rather than where content lives. R7 noted most teams stabilize at L1-L2 (R7.C17). Metabase exemplifies L3 "Structured router" (R7.C18).

---

## Part 5: Integrations

### 5.1 Skills: fact-vs-procedure, description eager / body lazy

The canonical integration principle is fact-vs-procedure: CLAUDE.md for facts that must be in every session, skills for procedures that load on demand (R6.C3). Create a skill when you keep pasting the same playbook, checklist, or multi-step procedure into chat, or when a CLAUDE.md section has grown into a procedure rather than a fact (R6.C4).

Skills load descriptions eagerly (1536-character cap enforced) and bodies lazily on invocation (R6.C5). A skill's body loads only when used, so long reference material costs almost nothing until needed.

Post-compact behavior: startup skill listing is dropped (rebuilt fresh), but invoked skill bodies are re-attached with first 5k tokens of each, shared 25k total budget, oldest first (R1.C24, R6.C48, R3.C16). This is token-capped asymmetry vs CLAUDE.md which re-reads in full.

Rule of thumb: if a section of CLAUDE.md exceeds 20 lines and describes a multi-step procedure, it is a skill candidate. If it exceeds 20 lines and describes conventions/facts, split it to `.claude/rules/*.md` or a `packages/*/CLAUDE.md` overlay instead.

### 5.2 Commands merged into skills (2026 change)

As of 2026, custom commands have been merged into skills. `.claude/commands/deploy.md` and `.claude/skills/deploy/SKILL.md` both create `/deploy` and work the same way - same mechanism (R6.C13). Practically, both are namespaced the same, both load descriptions eagerly and bodies lazily, and the distinction exists only as a file-organization convention.

Plugin skills are always namespaced `plugin-name:skill-name` and cannot shadow project/user skills (R6.C37). CLAUDE.md referencing unqualified `/deploy` resolves to project/user skill; forcing plugin version requires `/acme:deploy`.

### 5.3 Hooks: SessionStart, InstructionsLoaded, PreCompact/PostCompact, CwdChanged

Hooks complement CLAUDE.md by injecting dynamic state that CLAUDE.md cannot carry and by enforcing rules deterministically (R6.C20, R6.C22).

- **SessionStart** - for dynamic context (git branch, open PRs, recent changes). Output via `hookSpecificOutput.additionalContext`. For static context, use CLAUDE.md (R1.C25).
- **InstructionsLoaded** - observability on CLAUDE.md / rules loads. Cannot block. Payload includes `load_reason` enum (R6.C19, Section 2.5 above).
- **PreCompact** - CAN block compaction via exit code 2 or JSON `{"decision": "block", "reason": "..."}`. Added in v2.1.105 (R3.C12).
- **PostCompact** - cannot block (exit code ignored). Useful for post-compact side effects.
- **CwdChanged** - fires on `cd`. Does NOT re-walk ancestor tree (R3.C06).

The split of responsibility is clean: CLAUDE.md = advisory prose for Claude's reasoning; hooks = deterministic enforcement that runs regardless of Claude's decisions (R6.C22, R4.C12).

### 5.4 MCP: deferred schemas, CLAUDE.md hinting convention

In 2026, MCP tool schemas are deferred at startup by default. Claude loads specific schemas on demand via tool search when needed. Alternatives: `ENABLE_TOOL_SEARCH=auto` to load upfront if they fit within 10% of context, or `ENABLE_TOOL_SEARCH=false` to load everything (R6.C24).

Because schemas are deferred, CLAUDE.md is the idiomatic place to hint MCP tool preferences. Example from R6.C_TOOL_PREFS:

> For files under `docs/private/`, prefer `mcp__filesystem__read_file` (handles auth). For GitHub issues/PRs, use `mcp__github__*` rather than raw `gh` CLI.

Note the naming convention: `mcp__server__tool` with doubled underscores. CLAUDE.md nudges Claude toward project-specific MCP tools over generic built-ins. This is advisory only; for hard enforcement use `permissions.deny` rules in settings.

### 5.5 AGENTS.md coexistence via `@AGENTS.md` bridge

CRITIC Konflikt 8 marked this as HIGH-confidence consensus. The current reality:

- Claude Code reads CLAUDE.md, NOT AGENTS.md (R1.C10, R6.C44, R5.C19).
- AGENTS.md is the open standard used by Cursor, Copilot, Codex, Continue.
- Official recommended bridge pattern: put `@AGENTS.md` as the first line of CLAUDE.md, add Claude-specific additions below. Both tools read the same instructions without duplication.
- Claude Code does NOT natively recognize `.cursorrules`, `.cursor/rules/*.mdc`, `.continuerules`, or `.github/copilot-instructions.md` (R6.C43).
- No sign that Claude Code will deprecate CLAUDE.md in favor of AGENTS.md (R6).

The bridge pattern is the recommended answer for multi-tool workflows and avoids the maintenance burden of duplicating conventions in two files.

### 5.6 Subagents: they DO load CLAUDE.md (with exceptions)

This was the single most DISPUTED claim in the campaign scope (the scope asked "subagents don't auto-load CLAUDE.md?"). R6 resolved it with primary citation from context-window.md. CRITIC Konflikt 1 marked resolution HIGH-confidence:

- **Subagent DOES auto-load CLAUDE.md** via cwd walk, same as main session (R6.C28). Context quote from context-window.md: "The subagent loads CLAUDE.md too. Same file, same content, but it counts against the subagent's context, not yours."
- **Subagent does NOT inherit** parent conversation history, parent auto-memory, or parent skill descriptions. It loads CLAUDE.md + MCP + skill setup fresh (R6.C29).
- **Built-in Explore and Plan agents EXPLICITLY SKIP CLAUDE.md** for smaller context (R6.C28).
- **Skills with `context: fork` frontmatter** run in a subagent that loads CLAUDE.md (R6.C30).
- **Subagents with `skills:` frontmatter field** preload FULL skill bodies plus CLAUDE.md, bypassing the normal lazy contract (R6.C30).

The common misconception "orchestrator must brief subagents on project context" is half right. Orchestrator briefs subagents on TASK STATE (conversation, what was just discussed), NOT on PROJECT CONVENTIONS (CLAUDE.md handles that automatically). Practitioners who write "brief every subagent on the entire stack" in their orchestration prompts are wasting tokens.

### 5.7 Auto memory (MEMORY.md) vs CLAUDE.md division of labor

Decision matrix from R6.C40:

| Dimension | CLAUDE.md | Auto memory (MEMORY.md) |
|-----------|-----------|-------------------------|
| Written by | You | Claude |
| Content type | Instructions and rules | Learnings and patterns |
| Scope | Project, user, or org | Per working tree |
| Loaded | Every session | Every session (first 200 lines or 25KB) |
| Typical content | Coding standards, workflows, project architecture | Build commands, debugging insights, preferences |

Auto memory is shared across all worktrees and subdirectories within the same git repo, but not across machines or cloud environments (R3.C18). Concurrent writes to the same MEMORY.md from two parallel sessions have no documented atomicity or locking semantics - an undocumented race condition (R3.C19, CRITIC gap D5).

Rule of thumb: if you WROTE it deliberately, it belongs in CLAUDE.md. If Claude LEARNED it from working on the repo, it belongs in MEMORY.md. Do not edit MEMORY.md unless you know why; if you edit and commit it, you are effectively promoting a learned pattern to a constitutional rule, which belongs in CLAUDE.md.

### 5.8 Plugins: no CLAUDE.md slot, namespaced skills/agents/hooks/MCP instead

Covered in Section 1.4. Summary for integration-map completeness:

- No plugin CLAUDE.md (R1.C2, R2.C4, R5.C12, R6.C35).
- Plugin hooks ADD to project hooks (sequential, no override) (R5.C13).
- Plugin skills always namespaced `plugin-name:skill-name` (R6.C37).
- `--plugin-dir` local plugin takes precedence over marketplace plugin of same name for the session (R5.C14).
- `settings.json` takes priority over `plugin.json`; unknown keys silently ignored (R5.C13).

The designed path for plugin-contributed guidance: skill with `user-invocable: false`, shipping description eagerly and body on invocation.

---

## Part 6: Anti-patterns + Failures

### 6.1 A1 - 500+ line monoliths (bloat)

**Symptom**: CLAUDE.md exceeds 200 lines, commonly 500-2000. Community reports convergence: past 200-300 lines Claude reliably ignores content. Reddit complaint "My CLAUDE.md is 600 lines and Claude clearly stopped reading" is the typical failure report (R7.C13, R7.C25).

**Mechanism**: per-inference cost (R4.C15), compliance decay (R7.C8), lost-in-the-middle (R4.C16), instruction budget saturation (R2.C18).

**Fix**: split using the strategies in Part 4. Move path-scoped content to `.claude/rules/*.md` with `paths:` frontmatter. Move procedures to skills. Move deep docs to `docs/*.md` referenced via file:line pointers. Move package-specific content to `packages/*/CLAUDE.md` overlays.

### 6.2 A2 - Auto-generated /init output left unpruned

**Symptom**: a 400-800 line CLAUDE.md generated by `/init` and committed without curation. Contains file-tree dumps, package.json paraphrases, obvious observations, all platitudes.

**Mechanism**: ETH Zurich study (R7.C9) found auto-generated CLAUDE.md files decrease success rates and increase cost by around 20%. HumanLayer (R7.C12, R4.C21) says "Don't use `/init`" or, if used, "treat as a draft, not a finished product."

**Fix**: prune ruthlessly. Target 60-100 lines. Keep only mid-level facts (Section 3.1). Delete everything a reading of the repo would have revealed.

### 6.3 A3 - Negations that activate what they prohibit

**Symptom**: "Do NOT use semicolons", "NEVER commit secrets", "Do NOT import from lodash."

**Mechanism**: negation still activates the prohibited concept (R4.C10). And restrictions without alternatives confuse agents trying to accomplish the task (R4.C11).

**Fix**: rewrite positively with paired preferred path.
- Bad: "Do NOT use semicolons"
- Good: "Use ASI; omit trailing semicolons."
- Bad: "NEVER commit secrets"
- Good: "Commit only code; secrets go in `.env` (gitignored) and are loaded via `dotenv`." Plus a hook for hard enforcement (see 6.6).
- Bad: "Do NOT import from lodash"
- Good: "Use native `Array.prototype.*` and optional chaining. When you need something lodash provides, check `src/utils/functional.ts` first."

### 6.4 A4 - Emphasis inflation (IMPORTANT on every bullet)

**Symptom**: every rule tagged with IMPORTANT, CRITICAL, YOU MUST, ALWAYS, NEVER. Sometimes in all-caps. Sometimes duplicated in multiple sections.

**Mechanism**: emphasis markers tune adherence when used sparingly - Anthropic documents this explicitly (R4.C24). Inflated usage nullifies the signal. awesome-claude-code (R4.C19) notes quality CLAUDE.md files "avoid primarily consisting in shouting at Claude in all-caps."

**Fix**: 2-3 emphasis markers per file, maximum. Use them for genuinely non-negotiable rules. For everything else, use specificity instead of emphasis.

### 6.5 A5 - Ephemera committed (TODO lists, sprint notes, task state)

**Symptom**: CLAUDE.md contains "Current sprint: Q2 2026 API refactor", "Working on: rate limiting", "TODO: fix bug in auth middleware."

**Mechanism**: this content changes weekly. Every change invalidates the prompt cache (R3.C13). The content is also stale within days. Anthropic's best-practices exclude column: "Information that changes frequently" belongs elsewhere (R4.C22).

**Fix**: move to `plans/CURRENT.md`, GitHub issues/milestones, or project tracker. CLAUDE.md is timeless constitution.

### 6.6 A6 - Secrets and leakage (Issue #2142 case study)

**Symptom**: API keys, tokens, passwords in CLAUDE.md. Or a CLAUDE.md security section that is ignored.

**Issue #2142** (R7.C7) is the canonical case study. Commit `09c203e` on `r0bug/YFEvents` June 2025: Claude Code, with a 150+ line CLAUDE.md security section loaded, wrote a Gmail app password, a Google Maps key, and a Firecrawl key to `.env` and committed them. Three incidents in a single session despite explicit CLAUDE.md prohibitions.

**Mechanism**: CLAUDE.md is advisory, not enforcement. Anthropic's managed-settings docs state flatly: "Settings rules are enforced by the client regardless of what Claude decides to do. CLAUDE.md instructions shape Claude's behavior but are not a hard enforcement layer" (R6.C15, R6.C22, R4.C12).

**Fix**: for hard security rules, use one or more of:
- **Pre-commit hook** (PreToolUse on Bash `git commit`) that greps for common secret patterns and blocks.
- **`permissions.deny`** in settings for dangerous patterns (managed-settings can make this org-wide).
- **`sandbox.enabled`** for constrained execution environments.
- **Managed policy** CLAUDE.md for the advisory layer (it cannot be excluded, so the guidance reaches every session).

Wiegold's canonical two-liner (R7.C20) is the operational summary: "CLAUDE.md is guidance for flexible decisions. Hooks are enforcement for non-negotiable rules." The corpus-wide consensus: CLAUDE.md gets around 70% compliance, hooks get 100% enforcement (R7.C16). Do not trust CLAUDE.md to protect you from committing keys. Use a hook.

### 6.7 A7 - LLM doing a linter's job

**Symptom**: CLAUDE.md says "Use 2-space indentation", "Single quotes for strings", "Always include trailing commas in multi-line arrays", "Imports ordered: react first, then libs, then local."

**Mechanism**: linters enforce these deterministically at a fraction of the cost. HumanLayer's rule (R4.C18, R7.C14): "Never send an LLM to do a linter's job. Biome/ESLint/oxlint are 10,000x cheaper and 100% deterministic."

**Fix**: configure the linter, remove the rules from CLAUDE.md, optionally add one line to CLAUDE.md: "Run `biome check --write` before commits; CI enforces on merge."

### 6.8 A8 - Contradictory rules across tiers

**Symptom**: user CLAUDE.md says "always use pnpm"; project CLAUDE.md says "this repo uses npm." Or root says "use Zod"; subfolder says "use Yup." Without explicit scoping language.

**Mechanism**: "If two rules contradict each other, Claude may pick one arbitrarily" (R1, R4.C20, R5.C22). Tail bias tends to favor the last-loaded (so project beats user in this case), and specificity tends to favor the more scoped rule ("this repo" beats "always"). But this is probabilistic, not guaranteed.

**Fix**: formulate user-tier rules as defaults, not absolutes. "Prefer pnpm unless the project specifies otherwise" beats "always use pnpm." In subfolder overlays, explicitly acknowledge the root rule: "Root says Zod; this subfolder uses Yup intentionally because legacy migration is incomplete."

Note the plan mode override issue (R2.C6): even IMPORTANT: OVERRIDE headers in CLAUDE.md have no effect against system-level instructions. Plan mode includes "This supersedes any other instructions" in its system prompt, placing it above CLAUDE.md in the delivery order.

### 6.9 A9 - Pasted code blocks instead of file:line references

**Symptom**: CLAUDE.md contains 50+ line code blocks showing "the correct way to write a reducer" or "the canonical middleware pattern."

**Mechanism**: snippets go stale the moment the codebase refactors. References stay live (R7.C15). Plus code blocks inflate the file rapidly beyond the 200-line ceiling.

**Fix**: "For the reducer pattern, see `src/store/reducers/user.ts` (specifically lines 42-60)." Claude reads the file on demand and always sees current code.

### 6.10 A10 - Mid-file instructions lost to primacy/recency

**Symptom**: critical rule buried at line 180 of a 300-line CLAUDE.md. Claude does not follow it.

**Mechanism**: lost-in-the-middle, primacy + recency bias (R4.C16). The top and bottom of the file are the valuable real estate; the middle recedes.

**Fix**: rank by importance. Top 5 lines: the rules that must never be forgotten. Bottom 5 lines: the rules that should dominate when conflicts arise. Middle: reference material and less-critical conventions.

### 6.11 A11 - `/init` or `/memory` treated as live reload

**Symptom**: practitioner edits CLAUDE.md mid-session via `/memory` expecting Claude to re-read it. Claude continues using the stale version.

**Mechanism**: no live reload for CLAUDE.md (R3.C05, R3.C25, R3.C28). `/memory` opens the file for editing but does NOT force re-read. `/reload` does not exist (R3.C03). Only `/compact` or restart triggers re-read.

**Fix**: edit with `/memory`, then `/compact` to force re-injection, or restart the session. If the edit is urgent and you want to avoid compaction cost, consider a PreToolUse hook that injects a one-shot override into the conversation.

### 6.12 A12 - Duplicating rules in hopes of enforcement

**Symptom**: "I wrote ALWAYS use X 5 times in different sections, Claude still used Y." Rule repeated 3+ times across the file in hopes of sticking (R7.C25).

**Mechanism**: duplication does not improve compliance - it creates contradictions if any copy is phrased slightly differently, and it bloats the file driving all rules toward the compliance floor (R4.C20, R7.C8).

**Fix**: three-strikes rule (R4.C13 from dev.to docat0209): "If you have told Claude not to do something 3 times and it keeps doing it, move that rule from CLAUDE.md to a hook." State the rule ONCE, specifically, positively, with an alternative. If it fails repeatedly, escalate to a hook or lint tool.

---

## Part 7: Real-world Examples

### 7.1 Five dominant archetypes

R7.C2 identified five archetypes in public CLAUDE.md corpus (cross-confirmed against R4.C4/C5):

1. **Minimalist** (< 30 lines): Metabase 54-line root pointing to `frontend/CLAUDE.md`; LangGraphJS 33 lines with Build/Test + Code Style + Architecture sections (R7.C18, R4.C4, R4.C5).
2. **Convention-heavy**: LangGraphJS 80-char line width, oxlint, NodeNext imports. Dense with specific conventions.
3. **Command-driven**: HumanLayer 88 lines with TODO(0-4) priority system, PERF markers, language-specific conventions. Semantic conventions Claude cannot infer (R7.C19).
4. **Architecture-focused**: VoltAgent/awesome-claude-code-subagents 10-category orchestration taxonomy. Used by teams that reason across many subsystems.
5. **Meta-CLAUDE** (outlier): Karpathy's 4 principles about how agents should think. Viral Jan 2026 tweet; Forrest Chang's `andrej-karpathy-skills` derivative repo reached tens of thousands of stars in two weeks (R7.C3, R7.C4). Karpathy's principles: think before coding, simplicity first, surgical changes, goal-driven execution.

CRITIC flagged (PASS WITH NOTES for R7) that Karpathy's tweet ID is not captured and the star velocity is estimated; the derivative repo is the verifiable chain. The phenomenon exists; exact numbers are approximate.

### 7.2 What works

**Metabase** (R4.C4, R7.C18): ~54 lines, acts as router to domain-specific skills (`clojure-eval`, `clojure-write`, `clojure-review`, `typescript-write`, `typescript-review`) plus explicit pointer to `frontend/CLAUDE.md`. Textbook L3 Structured router pattern.

**HumanLayer** (R7.C5, R7.C6): < 60 lines at root with WHAT/WHY/HOW structure, TODO(0-4) priority system, explicit "TODO(0) should never merge." Reported anecdote: reducing from ~180 lines to < 60 improved Claude's convention compliance.

**LangGraphJS** (R4.C5): 33 lines, 3 sections, no fluff. Minimalist benchmark.

**Karpathy/Forrest Chang meta-CLAUDE** (R7.C3, R7.C4): 4 principles only, no project-specific content. Functions as a user-level CLAUDE.md applicable to any project.

Common features of what works: minimal, specific, tool-rich, often acts as a router to deeper content rather than containing it all.

### 7.3 What does NOT work

- 500+ line monoliths (A1).
- Auto-generated `/init` output committed as-is (A2) - ETH Zurich confirmed this decreases success and raises cost around 20% (R7.C9).
- Reddit recurring complaints: "Claude ignores instructions after 2-5 prompts", "My 600-line CLAUDE.md clearly stopped being read", "Duplicated ALWAYS rules still ignored" (R7.C25).
- Rules that ignore the enforcement gap: Issue #2142 committed keys despite security section (R7.C7).

byme8's contrarian essay "You Don't Need a CLAUDE.md" (R7.C24) argues that for small projects the token cost of CLAUDE.md exceeds its value, and strong naming + tests are a better investment. CRITIC marked this as LOW confidence contrarian view - worth noting but not majority position. For small projects, a sub-30-line CLAUDE.md is cheap insurance; byme8's argument is strongest for single-file scripts where even 30 lines of overhead is noticeable.

### 7.4 Empirical metrics

**ETH Zurich February 2026 study** (R7.C9, R7.C10, R7.C11). CRITIC marked specific numbers MEDIUM confidence (secondary sourced via Thomas Wiegold blog and wolfejam HN comment; no direct paper link in R7):
- Auto-generated CLAUDE.md: ~20% worse success rates, ~20% higher cost.
- Human-written CLAUDE.md: ~4% improvement on AGENTbench.
- Claude-Code specific: ablation with all repo docs stripped showed CLAUDE.md gave ~2.7% improvement (consistent but modest).
- Tool-specific commands (like mentioning `uv` package manager): ~160x effect on tool usage frequency.

**Wiegold / Khare compliance decay** (R7.C8). CRITIC MEDIUM on specific percentages, HIGH on trend:
- Messages 1-2: 95%+ compliance.
- Messages 3-5: 60-80%.
- Messages 6-10: 20-60%.
- Beyond 10: mostly lost.

**HumanLayer rewrite anecdote** (R7.C6). CRITIC MEDIUM (anecdote, single source): rewriting from ~180 to < 60 lines improved convention compliance.

**BotMonster parallel-development pattern** (R7.C21). CRITIC LOW (single anecdote): 18% throughput improvement using CLAUDE.md + git worktrees. Modest but positive.

**Hooks vs CLAUDE.md enforcement gap** (R7.C16). CRITIC HIGH (cross-confirmed): CLAUDE.md approximately 70% followed, hooks 100% enforced. This is the single most important empirical finding in the corpus.

**Evolution 2024-2026** (R7.C22). CRITIC MEDIUM (trend narrative): CLAUDE.md size approximately halved between 2024 and 2026 while precision doubled. "Context architecture over prompting" replaced "prompt engineering" as the dominant framing.

---

## Appendix A: Quick Reference Card

| Dimension | Answer | Cite |
|-----------|--------|------|
| Where to put root CLAUDE.md | `./CLAUDE.md` or `./.claude/CLAUDE.md` (equivalent) | R2.C23 |
| Where to put personal rules | `~/.claude/CLAUDE.md` (all projects) | R1 tiers |
| Where to put private per-project | `./CLAUDE.local.md` (gitignored, still supported) | R1.C11, R5.C29 |
| Where to put org-wide policy | `/etc/claude-code/CLAUDE.md` Linux, OS-specific paths | R1.C19 |
| Target size root | 60-100 lines (sweet spot); 200 hard ceiling | R4.C1, R4.C3, R7.C13 |
| Delivery mechanism | User message AFTER system prompt | R1.C3, R6.C46 |
| Loading | Concat not override; ancestor walk eager + lazy subfolder overlay | R1.C21, R5.C11 |
| @import depth | 5 hops maximum, eager at launch | R1.C6, R5.C2 |
| @import path types | Relative (to file), absolute, home (`@~/`); NO remote URLs | R5.C3, R1.C7 |
| Live reload CLAUDE.md | No. Edits inert until `/compact` or restart. `/reload` does not exist | R3.C03, R3.C05 |
| What survives /compact | Root + unscoped rules re-inject; nested + paths: lost | R1.C5, R3.C02 |
| Subagent sees CLAUDE.md | YES (cwd walk). Explore/Plan SKIP. No parent conversation | R6.C28, R6.C29 |
| Plugin CLAUDE.md | Does NOT exist. Use skills with `user-invocable: false` | R1.C2, R6.C35 |
| AGENTS.md bridge | `@AGENTS.md` as first line of CLAUDE.md, Claude-specific below | R1.C10, R6.C44 |
| Hard enforcement | Hooks or `permissions.deny`, NOT CLAUDE.md | R6.C15, R7.C16 |
| Compliance rate | CLAUDE.md ~70%, hooks ~100% | R7.C16 |
| Managed can be excluded | NO. Unique hard guarantee | R1.C14 |
| Emphasis markers | Max 2-3 per file; inflation nullifies signal | R4.C24, R4.C19 |
| Negation phrasing | Avoid. Use positive paired-alternative form | R4.C10, R4.C11 |
| Monorepo pattern | Lean root + `packages/*/CLAUDE.md` overlays (lazy) | R5.C15 |
| Path-scoped rules | `.claude/rules/*.md` + YAML `paths:` frontmatter | R1.C8, R5.C20 |
| Per-inference cost | 1 token of CLAUDE.md = 1 token every turn | R4.C15 |
| Observability | InstructionsLoaded hook, 5 `load_reason` values | R1.C9, R3.C09 |

---

## Appendix B: Starter CLAUDE.md Templates per Project Type

The five templates below are adapted from R4 section 11 with CRITIC-validated adjustments. Target length: 30-80 lines each. Each template includes stack-specific non-guessable commands, positive-framed rules, and file:line reference pointers rather than pasted code.

### B.1 TypeScript/React (Next.js + Prisma)

```markdown
# Acme Web

Next.js 15 + Prisma + TypeScript + Biome. pnpm workspace.

## Commands
- `pnpm dev` - Next dev server on :3000
- `pnpm test` - vitest unit + `@testing-library/react`
- `pnpm test:e2e` - Playwright against dev server
- `pnpm db:migrate` - Prisma migrate dev
- `pnpm lint` - Biome check + type-check

## Conventions
- Server components by default. `'use client'` only for interactive.
- Forms: react-hook-form + Zod schema in `src/schemas/`.
- DB access only in `src/server/db/`. Never import `@prisma/client` in client code.
- Use named exports; no default exports.

## Architecture pointers
- Auth: NextAuth v5, see `docs/AUTH.md`
- DB schema: `prisma/schema.prisma`
- API routes: `src/app/api/*/route.ts` pattern

## Before commit
- `pnpm lint` must pass (CI enforces)
- If schema changed, run `pnpm db:migrate`
```

### B.2 Python ML (uv + polars + PyTorch)

```markdown
# Acme ML

Python 3.12 + uv + polars + PyTorch 2.5. GPU training on 4x A100.

## Commands
- `uv run python train.py` - start training
- `uv run pytest` - unit tests
- `uv run ruff check` - lint
- `uv run mypy src/` - type check

## Conventions
- Use uv for all package operations. pip and poetry are deprecated here.
- DataFrames: polars only. Do not import pandas (we migrated off it).
- Type-annotate public functions. `Any` requires a comment.
- Training config: `configs/*.yaml` via hydra. Never hardcode hyperparams.

## Architecture pointers
- Data pipeline: `src/data/`
- Models: `src/models/`
- Training loop: `src/train.py`
- Eval harness: `scripts/eval.py`

## GPU etiquette
- Check `gpustat` before long runs
- Checkpoint every 1000 steps
```

### B.3 Rust CLI (cargo + clap)

```markdown
# Acme CLI

Rust 1.84 + cargo + clap v4 derive API.

## Commands
- `cargo build --release` - production binary
- `cargo test` - unit + integration
- `cargo clippy --all-targets -- -D warnings` - lint (CI enforces zero warnings)
- `cargo fmt --check` - format check

## Conventions
- Errors: anyhow for apps, thiserror for libraries.
- CLI: clap derive API only (no builder).
- Logs: tracing + tracing-subscriber. No println! outside examples.
- No unsafe without code review. Document invariants in comment.

## Architecture pointers
- Commands: `src/cmd/*.rs` with `Cmd` enum in `src/cli.rs`
- Library: `src/lib.rs` exports public API
- Integration tests: `tests/*.rs`

## Before commit
- `cargo clippy --all-targets -- -D warnings` must pass
- `cargo fmt --check` must pass
```

### B.4 Monorepo (Turborepo + pnpm workspaces)

Root CLAUDE.md (universal rules only):

```markdown
# Acme Platform

Turborepo monorepo. Node 20 + pnpm workspaces.

## Packages
- `packages/api` - Express + Prisma, port 4000
- `packages/web` - Next.js 15, port 3000
- `packages/shared` - pure TS, no runtime deps
- `packages/cli` - Node CLI tool

## Commands (from root)
- `pnpm dev` - all services in parallel (turbo)
- `pnpm test` - all tests
- `pnpm build` - build all
- `pnpm lint` - Biome across all packages

## Conventions
- Every package has its own CLAUDE.md with package-specific rules
- Zod for validation everywhere except `packages/legacy-api` (uses Yup, do not change)
- All cross-package imports via `@acme/*` workspace names
- Commits use conventional-commits + JIRA prefix: `feat(ACME-123): ...`

## Architecture pointers
- API docs: `packages/api/docs/OPENAPI.md`
- Deployment: `docs/DEPLOY.md`

## Before PR
- `pnpm lint && pnpm test` must pass (CI enforces)
```

Each subpackage `packages/api/CLAUDE.md`, `packages/web/CLAUDE.md` etc. has 30-60 lines of package-specific rules, loaded lazily when Claude touches files in that package.

### B.5 Library/SDK (npm publish)

```markdown
# Acme SDK

Published npm library. ESM + CJS dual builds. Node >= 20.

## Commands
- `pnpm build` - tsup ESM + CJS + d.ts
- `pnpm test` - vitest
- `pnpm test:types` - tsd type tests (see `tests/types.test-d.ts`)
- `pnpm release` - changesets publish
- `pnpm api:check` - API Extractor verifies no unexpected breaking changes

## Conventions
- Every export has a tsdoc comment. No comments = no export.
- Breaking changes require changeset `major`. Follow semver strictly.
- Entry point: `src/index.ts` - DO NOT add to exports without API council review
- Tree-shakeable: no side effects at module scope. `"sideEffects": false` in package.json

## Architecture pointers
- Public API surface: see `api-extractor.json` report
- Deprecated exports: search for `@deprecated` tags
- Changesets: `.changeset/*.md`

## Before publish
- `pnpm build && pnpm test && pnpm api:check` all green
- Changeset present for every PR with public change
```

### B.6 Managed enterprise policy (skeleton)

This is the gap R4 flagged (CRITIC gap D3) - public examples are rare because enterprises keep them private. The skeleton below is synthesized from TrueFoundry's public blog (cited in R2 bibliography) and Anthropic's managed-policy example. Deploy via MDM/Group Policy/Ansible to OS-specific path (R1.C19).

```markdown
# Acme Corp Developer Policy

This instruction file is deployed org-wide and cannot be excluded.

## Licensing
- Only MIT, Apache-2.0, BSD-3-Clause dependencies allowed without review.
- GPL and AGPL dependencies require Legal approval via `#legal-deps` Slack.
- Bundled dependency audits run via `pnpm licenses`.

## Security
- Never write API keys, tokens, or secrets to any file including .env.local.
- Suspected credential leak: immediately notify `#security-incidents` Slack.
- Pre-commit hooks enforce secret-scanning (gitleaks); managed settings deny git push if findings.

## Data handling
- No customer PII in git, in logs, or in test fixtures.
- Production data access requires `sudo acme-prod-access` with audit trail.

## Communication
- Commit messages and PR descriptions: English.
- All generated code: English identifiers and comments.

## Reporting
- Weekly agent-usage dashboard at dashboard.acme-corp.internal/claude-code.
- Issues with Claude Code: `#dev-tools-feedback` Slack.
```

Note this is the advisory layer; the corresponding `managed-settings.json` must enforce the security rules via `permissions.deny` and pre-commit hooks (R2.C15). Duplicate critical policies in both - CLAUDE.md for guidance, settings for enforcement.

---

## Appendix C: Open Questions

Drawn from MASTER_PLAN open questions, CRITIC gaps D1-D8, and E1-E7 extract gap lists. These remain unsettled as of April 2026 and are candidates for delta research.

| # | Question | Status | Source |
|---|----------|--------|--------|
| OQ-1 | Does user CLAUDE.md re-inject on /compact? | DISPUTED - R2 claims yes, R3 flags gap, docs unclear | R3.C14, CRITIC K3 |
| OQ-2 | What is the hard size limit for CLAUDE.md? | UNKNOWN - docs say "loaded in full regardless of length" but must exist | R1 G1, R6 G1, CRITIC D2 |
| OQ-3 | What happens at @import hop 6+? | UNKNOWN - docs say "max five hops", failure mode not specified | R1 G2, R3.C11, R6 G3, CRITIC D2 |
| OQ-4 | Are @import cycles detected? | INFERRED YES - documented for skills/symlinks, not @import | R5.C7, CRITIC K4 |
| OQ-5 | Are remote URL imports supported? | LIKELY NO - docs silent, community tests suggest silent skip | R1.C7, R5.C5, CRITIC D7 |
| OQ-6 | What is the ancestor-walk concat order for multi-level CLAUDE.md? | UNKNOWN - root-first vs cwd-first not documented | R3.C21, CRITIC D1 |
| OQ-7 | What is the auto-compact numeric trigger threshold? | UNKNOWN - community estimates 85-90%, no primary source | R3.C20 |
| OQ-8 | Does mid-session edit of `@import`'d file break cache immediately? | INFERRED NO - only at re-injection | R3.C26 |
| OQ-9 | What is the precedence when Managed and Project CLAUDE.md conflict? | UNKNOWN - docs say "concat not override" + "picks arbitrarily" | R1 G8 |
| OQ-10 | Does subagent memory merge with main MEMORY.md? | UNKNOWN - whether subagent-written memory reaches main session | R6 G8 |
| OQ-11 | What is the concurrency model for MEMORY.md across parallel sessions? | UNKNOWN - undocumented race condition | R3.C19, CRITIC D5 |
| OQ-12 | Does `<important if="...">` conditional tag work? | UNKNOWN - community invention, not in docs | R4 gap #8, R7 sect 3.2, CRITIC D6 |
| OQ-13 | When does a rule graduate from CLAUDE.md to a skill? | RULE-OF-THUMB only - 20 lines + multi-step procedure | R4 gap |
| OQ-14 | What is the primary source for Wiegold/Khare compliance decay curve? | UNCLEAR - Wiegold blog attribution only | R7.C8, CRITIC D8 |
| OQ-15 | ETH Zurich study peer-reviewed paper link? | MISSING - only secondary Wiegold/wolfejam sources | R7.C9, CRITIC K12 |
| OQ-16 | How do plugins intended to provide "CLAUDE.md-level context" succeed in practice? | UNKNOWN - no end-to-end examples in public corpus | CRITIC D4 |
| OQ-17 | Do hooks receive CLAUDE.md content, or just `file_path`? | ONLY FILE_PATH confirmed; content requires hook to `cat` itself | R6 G7 |
| OQ-18 | What is the YAML frontmatter behavior in CLAUDE.md (ignored, parsed, rendered)? | UNKNOWN - docs silent; frontmatter is reserved for `.claude/rules/` | R1 G6 |
| OQ-19 | Does `--resume` + mid-session CLAUDE.md edit interact cleanly under v2.1.62 regression? | UNKNOWN - regression still active as of April 2026 | R6 G5 |
| OQ-20 | Is the deprecation of `#` quick-memory prefix permanent? | EFFECTIVELY YES - no mention in 2026 docs, but historical | R3.C22 |

Resolving OQ-2, OQ-6, OQ-11 empirically would be straightforward with the InstructionsLoaded hook plus scripted tests. These are the highest-value delta research candidates.

---

## Bibliography

### Primary Anthropic documentation (cross-cited by 5+ reports)

- https://code.claude.com/docs/en/memory - "How CLAUDE.md files load", "Choose where to put CLAUDE.md files", "Import additional files", "AGENTS.md", "Auto memory", "Exclude specific CLAUDE.md files", "Load from additional directories", "CLAUDE.md vs auto memory", "My CLAUDE.md is too large", "Claude isn't following my CLAUDE.md" - R1, R2, R3, R5, R6
- https://code.claude.com/docs/en/context-window - "What survives compaction" table, context-window visualization - R1, R3, R6
- https://code.claude.com/docs/en/hooks - InstructionsLoaded, PreCompact, PostCompact, SessionStart, CwdChanged entries - R1, R3, R6
- https://code.claude.com/docs/en/best-practices - "Write an effective CLAUDE.md" - R1, R4
- https://code.claude.com/docs/en/skills - skills doc "Live change detection" - R4, R6
- https://code.claude.com/docs/en/plugins - "Plugin structure overview", "Ship default settings with your plugin" - R1, R2, R5, R6
- https://code.claude.com/docs/en/cli-reference - `--bare` flag, `--add-dir`, `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` env var - R1, R3
- CHANGELOG.md (anthropics/claude-code main branch) - v2.1.62, v2.1.89, v2.1.105, v2.1.112 entries - R1, R3

### GitHub Issues

- Issue #2142 - API keys committed despite CLAUDE.md security section (June 2025, commit 09c203e on r0bug/YFEvents) - R4, R7
- Issue #2571 - Subdirectory CLAUDE.md not loaded (closed not planned) - R2
- Issue #17127 - `/reload` command request (closed duplicate) - R3
- Issue #19105 - Empty "hi" prompt ~53k tokens measurement - R3
- Issue #22085 - CLAUDE.md after compact (closed duplicate) - R3
- Issue #29230 - v2.1.62 KV cache regression on --resume after /compact - R6
- Issue #29971 - Context bloat reports - R4
- Issue #30634 - Plan mode overrides user CLAUDE.md IMPORTANT headers - R2
- Issue #46829 - March 2026 cache TTL regression (1h -> 5min) - R3
- Issue #1321 - False positive external import warning - R5
- Issue #2950 - CLAUDE.local.md deprecation confusion - R5
- Issue #7777 - Claude ignores CLAUDE.md instructions (HIGH activity) - R7
- Issue #13853 - ADR loading feature request - R7

### Community sources

- HumanLayer blog "Writing a good CLAUDE.md" - < 60 line target, WHAT/WHY/HOW structure, "Never send an LLM to do a linter's job" - R4, R7
- Shrivu Shankar "Guardrails not Constitution" - reactive curation, pitch-don't-embed - R4
- dev.to/docat0209 "30-Line Rule" - R4, R7
- Thomas Wiegold blog - compliance decay curve (95/60-80/20-60), ETH Zurich secondary reporting - R7
- wolfejam HN comment - ETH Zurich secondary reporting - R7
- awesome-claude-code (GitHub list) - public CLAUDE.md corpus - R4, R7
- Metabase CLAUDE.md (public Clojure repo, ~54 lines) - R4, R7
- LangGraphJS CLAUDE.md (public TypeScript repo, 33 lines) - R4, R7
- Karpathy Jan 2026 tweet - meta-CLAUDE.md 4 principles - R7
- forrestchang/andrej-karpathy-skills derivative repo - R7
- alexop.dev "context rot" - per-inference cost framing - R4
- MindStudio context rot article - lost-in-the-middle - R4
- TurboDocx blog - hooks vs CLAUDE.md enforcement - R6, R7
- Builder.io blog - R7
- aitmpl.com - R7
- aitooldiscovery.com - Reddit aggregator (R7.C26 flags as methodology gap)
- morphllm.com - Reddit aggregator (R7.C26 flags as methodology gap)
- eesel / the-ai-corner / claudify.tech - Jan-Feb 2026 evolution narrative - R7
- Solmaz.io - CLAUDE.md to AGENTS.md migration - R5
- MuhammadUsmanGM/claude-code-best-practices - acme-platform Turborepo example - R5
- abhishekray07/claude-md-templates - meta-template library, 80-line rule - R4, R7
- Medium/DevOps AI - Virtual Monorepo Pattern (35 repos) - R5
- dev.to anvodev - monorepo 47k -> 9k word reduction - R5
- dev.to/rajeshroyal - `#` prefix historical reference - R3
- threads.com/boris_cherny - Anthropic engineer threads - R3
- claudecodecamp.com - "How Prompt Caching Actually Works in Claude Code" - R3
- recca0120.github.io (2026-04-14) - JSONL log analysis of cache TTL regression - R3
- Rajiv Pant - CLAUDE.md bypasses retrieval problem - R7
- byme8 on dev.to - "You Don't Need a CLAUDE.md" contrarian - R7
- TrueFoundry blog - enterprise managed policy example - R2, Appendix B.6
- VoltAgent / awesome-claude-code-subagents - architecture-focused archetype - R7
- botmonster.com - parallel-development 18% throughput anecdote - R7

### Cross-campaign references

- Research/research-hooks-best-practices/research/R1_anthropic_official_docs.md - hook schemas reference
- Research/research-claude-md-patterns/research/CRITIC.md - 12 conflicts resolved, 8 gaps flagged
- Research/research-claude-md-patterns/extracts/E1-E7 - per-report JSON claim tables

---

**End of SYNTHESIS.md.**

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
