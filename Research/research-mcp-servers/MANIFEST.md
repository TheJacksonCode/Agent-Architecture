# MANIFEST - Claude Code MCP Servers Deep Dive 2026

**Kampania:** Claude Code MCP Servers Deep Dive 2026 (Tier 2 #4, Research Roadmap 2026)
**Data start:** 2026-04-17
**Preset:** `/deep-research-v2` (17 agentow, map-reduce + Extractor phase)
**Model routing:** STANDARD (Orch/Critic/Syntetyk Opus, Researchers Sonnet, Extractors Haiku)
**Target output:** SYNTHESIS.md 8-10k slow + 4 pliki NbLM (00..03, w tym 03_MEDIA_PROMPTS.md 9.5/10)

---

## Zadanie

Dostarczyc source-of-truth dla MCP (Model Context Protocol) w kontekscie Claude Code: spec, build, security, ecosystem, decision tree (MCP vs Skill vs Command), performance i debugging. Rezultat: SYNTHESIS.md + NbLM deliverables gotowe do publikacji i konsumpcji przez video/infographic pipeline.

---

## Decyzje Architektoniczne

**DD01 - Wybor presetu /deep-research-v2 (map-reduce z Extractor phase)**
Uzasadnienie: 7 pytan R1-R7 jest niezaleznych (parallel-friendly). Docelowy SYNTHESIS 8-10k slow + bogate zrodla (Anthropic docs + community). Extractor phase tnie ryzyko API overload i koszt Syntetyka Opus 10x.

**DD02 - Model routing STANDARD (bez flag)**
Uzasadnienie: kampania ma "normalny stake" (dokumentacja, nie compliance). Sonnet starczy researcherom. Haiku dla extractow. Opus dla orchestracji + Critic + Syntetyk + NbLM Writer. Premium byloby over-spend. Ultra-budget za ryzykowny dla CVE traceability.

**DD03 - Override rol researcherow: wszyscy 7 pracuja na konkretnych pytaniach R1-R7**
Uzasadnienie: kampania jest czysto techniczna (protocol + SDK + security + ecosystem + debug), wiec klasyczny podzial tech/ux/reddit/x/github/forums/docs nie pasuje 1:1. Mapowanie:
- R1 (MCP Protocol Spec) -> res_tech (specyfikacja, JSON-RPC, primitives)
- R2 (Building MCP Servers) -> res_docs (oficjalne SDK Python/TS, getting started)
- R3 (Security Model, CVE) -> res_docs (bo CVE = primary-source security advisory; enforce CVE-2025-59536 traceability)
- R4 (Ecosystem 2026) -> res_github (awesome-mcp repos, stars, health, last-update)
- R5 (MCP vs Skill vs Command) -> res_ux (decision tree, user journey "kiedy czego uzyc")
- R6 (Performance + Context Cost) -> res_forums (StackOverflow + HN + Dev.to empiryczne metryki)
- R7 (Debugging + Community Patterns) -> res_reddit (r/ClaudeAI, r/ClaudeCode, mcp__ prefix issues)

**DD04 - res_x (Twitter/X trendy) NIE uzywany standardowo**
Uzasadnienie: MCP to dojrzaly protokol (rok+ na rynku), tweety przynosza bardziej szum niz sygnal. Jesli R4 (ecosystem) bedzie mial gap na "nowe launche Q1-Q2 2026", overlapping scope dostaje res_x jako uzupelnienie - ale nie jest to w planie glownym. 7mi researcher to wlasciwie drugi res_github dla pokrycia awesome-mcp + oficjalnej registry Anthropic/modelcontextprotocol.

**Ostateczna mapa:**
- R1: res_tech (Sonnet)
- R2: res_docs (Sonnet)
- R3: res_docs_security (Sonnet) - wariant res_docs z security briefem
- R4: res_github (Sonnet)
- R5: res_ux (Sonnet)
- R6: res_forums (Sonnet)
- R7: res_reddit (Sonnet)

**DD05 - Target sizes:**
- Kazdy raport research: 1500-4000 slow (BRAMA 2: >1500)
- Kazdy extract: 300-500 slow JSON (BRAMA 3: 15-30 claimow)
- CRITIC.md: 2-4k slow
- SYNTHESIS.md: 8-10k slow (BRAMA 5: 6-12k)
- NbLM pliki: 00_FUNDAMENTALS (~2000 slow), 01_PATTERNS (~2500), 02_DECISION_GUIDE (~2000), 03_MEDIA_PROMPTS (9.5/10 rigor)

**DD06 - Early-write enforcement**
Syntetyk Lean MA OBOWIAZEK Write szkieletu SYNTHESIS.md jako pierwsza akcja (retry-safety).

---

## Stack Technologiczny

Research only - no build. Wszystkie artefakty to dokumenty markdown/json.

---

## Known Risks

**R-01: R1 (MCP Protocol Spec) moze byc obszerny**
Mitigation: researcher dostaje twardy cap slow (max 4000) i instrukcje "nie kopiuj calej spec, cytuj z URL i date accessed".

**R-02: R4 (Ecosystem) szybko sie zmienia**
Mitigation: res_github musi cytowac daty last-commit i ostrzegac o repozytoriach bez commitow >6 miesiecy. Dodac flag "stale" w claim.

**R-03: R3 (Security CVE) sensitive area**
Mitigation: explicit requirement w briefie researchera - cytowac CVE-2025-59536 z date published, CVSS score, affected versions, fixed version, source URL NVD/MITRE. Brak CVE = FAIL tej sekcji.

**R-04: Haiku Extractor fallback**
Jesli ktorys Extractor zwroci niespojny JSON (np. malformed), fallback na Sonnet dla tego jednego. Udokumentowac w PROGRESS.md.

**R-05: 3 primitives MCP (tools/resources/prompts)**
Claude Code historycznie mial niepelne wsparcie dla resources i prompts. Critic musi zweryfikowac aktualny stan na 2026-04-17 - co jest zrealizowane, co partial, co planned.

**R-06: enableAllProjectMcpServers precedence**
R3 musi konkretnie odpowiedziec: jak permissions deny wchodzi w interakcje z enableAllProjectMcpServers. Znane "bug #17017 family" - sprawdzic status.

---

## Open Questions (do CRITIQUE - BRAMA 4)

**Q1:** Czy Claude Code 2026 obsluguje wszystkie 3 MCP primitives (tools, resources, prompts)? Jesli tak, od ktorej wersji?

**Q2:** Managed MCP - czy jest osobne pole Managed settings? Gdzie jest scope boundary miedzy user/project/managed MCP configs?

**Q3:** enableAllProjectMcpServers precedence vs permissions deny - kto wygrywa?

**Q4:** Cache MCP tool definitions - czy jest cache-friendly tak jak reszta system prompt (prompt caching API)?

**Q5:** Roznica model routing dla MCP tool calls - czy Claude wybiera model per tool? Domyslnie Sonnet?

**Q6:** MCP response size impact na context budget - jakie sa hard limits (200k context)? Czy tool results sa streamowane, czy buforowane?

**Q7:** Data exfiltration risks - konkretne CVE (2025-59536 + pokrewne) + jak mitygacja roznia sie po wersjach Claude Code.

---

## Faza plan

| Faza | Agenci | Model | Status |
|------|--------|-------|--------|
| 0 STRATEGIA | 1 (Orch) | Opus | IN PROGRESS |
| 1 RESEARCH | 7 | Sonnet | pending |
| 2 EXTRACT | 7 | Haiku | pending |
| 3 CRITIQUE | 1 | Opus | pending |
| 4 SYNTEZA | 1 | Opus | pending |
| 5 NbLM | 1 | Opus | pending |

---

## Bramy

- **BRAMA 1** (po Fazie 0): MASTER_PLAN zawiera 7 konkretnych pytan badawczych. [PASS - MASTER_PLAN gotowy]
- **BRAMA 2** (po Fazie 1): wszystkie 7 raportow istnieje, kazdy >1500 slow
- **BRAMA 3** (po Fazie 2): 7 extractow, kazdy 15-30 claimow, conflicts_flagged i gaps_flagged obecne
- **BRAMA 4** (po Fazie 3): CRITIC.md ma PASS/REVISE per raport, min 5 konfliktow explicit, min 3 gaps
- **BRAMA 5** (po Fazie 4): SYNTHESIS.md 6-12k slow, citations (R<N>.C<M>), wszystkie konflikty rozstrzygniete
- **BRAMA 6** (po Fazie 5): 03_MEDIA_PROMPTS.md osiaga 9.5/10 rigor (Video Overview + Infographic S-C-L-M-A/L-C-T-I-M-A-N)
