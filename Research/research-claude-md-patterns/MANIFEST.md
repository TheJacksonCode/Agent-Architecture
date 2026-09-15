# MANIFEST - CLAUDE.md Patterns Campaign

Shared scratchpad miedzy agentami. Orchestrator (= Claude Opus 4.7) aktualizuje po kazdej fazie.

## Zadanie

Deep Research v2 dla tematu "Claude Code CLAUDE.md patterns 2026". Tier 1 #3 z Research Roadmap.

## Decyzje Architektoniczne

- **DD1:** Wszystkie agenty na Opus 4.7 (user explicit)
- **DD2:** 7 researcherow dostosowanych do tematu (nie generic tech/UX podzial)
- **DD3:** Media prompts quality gate 9.5/10 - shared research R8 w `_shared/media_prompts_standards/`
- **DD4:** Citation format `R<N>.C<M>`
- **DD5:** NbLM format: 3 pliki + 03_MEDIA_PROMPTS.md

## Stack Technologiczny

- Claude Code 2026
- Ekosystem: project/user/global CLAUDE.md, @import syntax, auto-loading, plugin CLAUDE.md
- Docs primary: docs.claude.com/en/docs/claude-code/memory
- Narzedzia researchu: WebFetch, WebSearch, Grep, Read

## Known Risks

- **R1:** `@import` syntax moze byc slabo udokumentowany (scope, remote URLs, recursion)
- **R2:** `CLAUDE.local.md` - status niejasny
- **R3:** Managed CLAUDE.md vs Managed settings - osobny mechanizm czy ten sam?
- **R4:** Auto-loading mechanika: kiedy re-read (start, /compact, cd) nie zawsze jasno opisane
- **R5:** AGENTS.md kontra CLAUDE.md - jedno deprecated? Oba wspolpracuja?

## Open Questions (do rozstrzygniecia w CRITIC + SYNTHESIS)

- Q1: CLAUDE.local.md - istnieje i loaded automatycznie?
- Q2: @import limity (max depth, remote URLs, circular refs)
- Q3: Plugin CLAUDE.md - priority nad project CLAUDE.md?
- Q4: Token budget: ile moze zajac CLAUDE.md przed auto-truncation?
- Q5: Konflikt project vs user CLAUDE.md: kto wygrywa? Merge czy override?
- Q6: Hierarchical loading: jesli cd do subfolderu z wlasnym CLAUDE.md, dokleja czy zastepuje?

## Phase log

### Phase 0: STRATEGIA
- MASTER_PLAN.md created 2026-04-17
- MANIFEST.md created 2026-04-17
- PROGRESS.md created 2026-04-17
- Foldery gotowe

### Phase 1: RESEARCH
(pending)

### Phase 2: EXTRACT
(pending)

### Phase 3: CRITIQUE
(pending)

### Phase 4: SYNTEZA
(pending)

### Phase 5: NbLM-writer
(pending)
