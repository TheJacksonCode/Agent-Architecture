# MASTER PLAN - Claude Code Hooks Best Practices 2026

**Launched:** 2026-04-17 (post Opus 4.7 release, released same day)
**Goal:** Deep research swarm -> destylat do NotebookLM (3 pliki)
**Budzet:** Opus-only wszedzie. Szacunek $40-80.

## Agenci (11 total, wszyscy Opus 4.7)

### Phase 1: Researcherzy parallel (R1-R7)
- **R1** Anthropic official docs (code.claude.com/docs, changelog, hooks reference)
- **R2** Opus 4.7 delta (2026-04-17 release, co nowego w hookach/permissions)
- **R3** Community patterns (disler/mastery, ChrisWiles/showcase, top GitHub)
- **R4** Security + anti-patterns (exit codes pitfalls, injection, secrets, supply chain)
- **R5** Performance + observability (timing budgets, --debug, logging, monitoring)
- **R6** Advanced patterns (Agent/HTTP/Prompt hooks, MCP Elicitation, WorktreeCreate)
- **R7** Taxonomy Global vs Project (~/.claude/ vs .claude/settings.json w repo)

### Phase 2: Critic
Reads R1-R7, pisze CRITIC.md (halucynacje, konflikty, gaps, PASS/REVISE)

### Phase 3: Synteza
- **Lead researcher** - finalizuje PROGRESS.md
- **Syntetyk** - pisze plans/SYNTHESIS.md

### Phase 4: NbLM-writer
Pisze 3 pliki w NbLM/ pod specyfike NotebookLM:
- `00_FUNDAMENTALS.md` - slownik + koncepty, ~10 stron
- `01_PATTERNS.md` - konkrety + kod + przyklady, ~15 stron
- `02_DECISION_GUIDE.md` - trade-offs + anti-patterns, ~8 stron

## Struktura folderu
```
research-hooks-best-practices/
  MASTER_PLAN.md
  PROGRESS.md
  research/
    R1_anthropic_official_docs.md
    R2_opus_47_release_delta.md
    R3_community_patterns_github.md
    R4_security_antipatterns.md
    R5_performance_observability.md
    R6_advanced_patterns.md
    R7_taxonomy_global_vs_project.md
    CRITIC.md
  plans/
    SYNTHESIS.md
  NbLM/
    00_FUNDAMENTALS.md
    01_PATTERNS.md
    02_DECISION_GUIDE.md
```

## NbLM format spec (dla NbLM-writera)
- Self-contained (NotebookLM nie ma runtime internetu)
- Dense prose, nie bullet-only (lepsze dla audio TTS)
- Key terms 3-5 razy w kontekscie (embedding coverage)
- Konkretne przyklady zamiast abstrakcji
- 3 pliki bo NotebookLM lepiej rozdziela "lekcje" niz jeden ogromny corpus

## Read-only constraint
User pracuje w drugim terminalu na plikach projektu. Agenty tylko do NOWEGO folderu `Research/research-hooks-best-practices/`, zero konfliktow.
