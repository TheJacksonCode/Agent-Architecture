# MASTER_PLAN - Claude Code Subagents + Task Tool 2026

**Kampania:** Tier 2 #3 z Research Roadmap 2026
**Data przygotowania:** 2026-04-17 (gotowe do odpalenia)
**Preset:** `/deep-research-v2` (17 agentow, map-reduce + Extractor phase)
**Model routing:** STANDARD (Orch/Critic/Syntetyk Opus, Researchers Sonnet, Extractors Haiku)
**Target output:** SYNTHESIS.md 8-10k slow + 3 pliki NbLM + 03_MEDIA_PROMPTS.md 9.5/10

## Zadanie

Deep Research v2 dla tematu "Claude Code Subagents + Task tool 2026". Jak swiadomie delegowac zadania, zarzadzac isolation i optymalizowac paralelizm.

## Scope kampanii

1. Task tool / Agent tool mechanics: subagent_type, description, prompt, isolation parameter
2. Subagent lifecycle: spawning, context inheritance, result back to parent, token accounting
3. Isolation modes: default vs worktree (git), file system boundaries, co przekracza vs nie
4. Model routing per subagent: `model: opus|sonnet|haiku`, kiedy override, cost implications
5. Parallel vs sequential: kiedy paralelizowac (Task tool multiple calls), kiedy blokowac
6. Background vs foreground (run_in_background): kiedy uzyc, notification lifecycle, SendMessage
7. Subagent prompting patterns: self-contained briefs, context handover, anti-patterns (delegating understanding)

## 7 pytan badawczych

**R1 (Task Tool API Spec)** - Oficjalne docs + system prompt CCh: Task tool schema, subagent_type enum (general-purpose, Explore, Plan, statusline-setup, specialized ones), isolation parameter, run_in_background, model override.

**R2 (Subagent Lifecycle + Context)** - Co subagent dziedziczy (system prompt? tools? CLAUDE.md? cwd?), co jest isolated (conversation history - NO), czy subagent moze spawn sub-subagent, max recursion depth.

**R3 (Worktree Isolation)** - Git worktree mechanics: co jest separate (files, branch), co jest shared (git config, remote), kiedy worktree auto-cleanup, manualny ExitWorktree, konflikty gdy worktree ma zmiany.

**R4 (Model Routing Strategies)** - Kiedy override model w Agent/Task call, price implications, empiryczne benchmarki "Sonnet jest wystarczajacy dla X, Haiku dla Y". Krazyaca heurystyka "75% zadan to Sonnet".

**R5 (Parallel Execution Patterns)** - Multiple Task calls w jednej wiadomosci (paralelizm), kiedy paralelizowac (independent work) vs blokowac (zalezne), max concurrency limits API, rate limits implications. Przyklady dobrych i zlych uzycie.

**R6 (Background Agents)** - run_in_background: kiedy fire-and-forget, jak odebrac output (task-notification hooks), SendMessage do wznowienia, Monitor tool, long-running workflow patterns.

**R7 (Anti-patterns + Community)** - "Don't delegate understanding" (Anthropic Eng blog?), over-spawning subagents (tokenbleed), "delegacja narracji nie rozwiazuje", context explosion z malych subagentow. Reddit/dev.to/X przyklady.

## Struktura output

```
Research/research-subagents-task-tool/
  MASTER_PLAN.md
  MANIFEST.md, PROGRESS.md
  research/ + extracts/ + plans/ + NbLM/
```

## Fazy i agenci

STANDARD routing: 1+7+7+1+1+1 = 17 agentow.

## Known risks

- R3 (worktree) moze byc niedoudokumentowany
- R4 (model routing) jest tematem naszego niedawnego feedback - mozemy cytowac nasze wlasne memory
- R6 (background) jest stosunkowo nowy feature - scarce docs

## Open questions do CRITIQUE

- Max recursion depth dla sub-subagentow?
- Czy subagent widzi CLAUDE.md rodzica czy wlasne (cwd-based)?
- Timeout default dla subagenta?
- Czy isolation: worktree dziala na Windows (nie wszystkie git features)?

## Polaczenie z innymi kampaniami

- Skills Architecture (jak subagent uzywa skills)
- Context Engineering (ile kontekstu zjada 1 subagent call)
- Model Routing memory (nasz wlasny feedback)
