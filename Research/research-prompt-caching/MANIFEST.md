# MANIFEST - Prompt Caching w Claude Code + API 2026

## Zadanie

Deep Research v2 na temat **Prompt Caching w Claude Code + API 2026**. Cel: zrozumiec
jak projektowac sesje Claude pod cache-first design, zeby tnac koszt input tokens 10x+ na
dlugich pipeline'ach (multi-agent, dev loop z CLAUDE.md, czat o dlugim system promptcie).

Deliverable: SYNTHESIS.md 7-9k slow + 4 pliki NbLM (00_FUNDAMENTALS, 01_PATTERNS,
02_DECISION_GUIDE, 03_MEDIA_PROMPTS) gotowe do karmienia NotebookLM.

## Decyzje Architektoniczne

### DD01 - Model routing STANDARD
Orkiestrator/Critic/Syntetyk/NbLM Writer na Opus 4.7 (reasoning-heavy), 7 Researcherow na
Sonnet 4.6 (retrieval + long prose), 7 Extractorow na Haiku 4.5 (structured JSON).
Uzasadnienie: pricing-aware research campaign brzmi zlym pomyslem prowadzic na premium -
sami bysmy lamali cache design o ktorym piszemy.

### DD02 - Mapowanie 7 researcherow do 7 pytan R1-R7
- R1 (API Spec + Cache Control) -> **res_docs** (oficjalne Anthropic docs, API reference)
- R2 (TTL + Invalidation) -> **res_tech** (benchmarki + changelogi + edge cases)
- R3 (Pricing Economics) -> **res_tech** (fallback: jezeli pricing jest czysto opisowy)
  UPDATE: **res_forums** (SO + HN + engineering blogs z case studies pricing)
- R4 (Caching w Claude Code CLI) -> **res_github** (issues + source code + PR discussions)
- R5 (Cache-first Design Strategy) -> **res_ux** (patterns from community best practices,
  adapted: zamiast design UI, bada "prompt design patterns")
- R6 (Batch API + Caching) -> **res_docs** druga instancja? -> UPDATE: **res_tech**
  (compound pricing analysis)
- R7 (Monitoring + Community Patterns) -> **res_reddit** + **res_x** (case studies,
  sentyment, konkretne przed/po kwoty)

**Finalny mapping:**
| R | Temat | Skill | Model |
|---|-------|-------|-------|
| R1 | API Spec + Cache Control | res_docs | sonnet |
| R2 | TTL + Invalidation | res_tech | sonnet |
| R3 | Pricing Economics | res_forums | sonnet |
| R4 | Claude Code CLI caching | res_github | sonnet |
| R5 | Cache-first Design Strategy | res_ux | sonnet |
| R6 | Batch API + Caching | res_x | sonnet |
| R7 | Monitoring + Community Case Studies | res_reddit | sonnet |

(Odstepstwo: res_ux pyta o "design patterns" w kontekscie prompt structure, nie UI. W
brief'ie dokladnie to zaznaczam. Res_x jako sekundarne zrodlo dla Batch API bo tam
beta features bywaja ogloszone przed blogami.)

### DD03 - Struktura SYNTHESIS
Target 7-9k slow (jak sugeruje user, nie default 8-10k). 7 Parts = 1 per R<N> + Exec
Summary + Appendix konfliktow i gapow.

### DD04 - NbLM docs: 3 plikowy core + 03_MEDIA_PROMPTS
- 00_FUNDAMENTALS (1500-2500w) - co to jest cache, pricing, TTL, breakpointy
- 01_PATTERNS (1500-2500w) - cache-first design recipes, Claude Code patterns, anti-patterns
- 02_DECISION_GUIDE (1500-2500w) - decision tree kiedy wlaczyc cache, kiedy nie, jak monitorowac
- 03_MEDIA_PROMPTS - Video Overview (S-C-L-M-A) + Infographic Studio (L-C-T-I-M-A-N),
  target >= 9.5/10 self-score

### DD05 - Research freshness
Filter: odrzuc zrodla starsze niz 18 miesiecy (prompt caching GA w 2024, duzo sie zmienilo).
Priorytetyzuj 2025-2026 content.

## Stack Technologiczny

N/A - kampania badawcza bez produkcji kodu.

## Known Risks

1. **Beta features niestabilne** - 1h cache TTL, extended TTL mog byc beta. Cytuj wersje
   API i daty.
2. **Claude Code CLI closed-source** - zachowanie cache moze byc niejawne. Extractor dla
   R4 moze wrocic krotszy raport. Fallback: wnioskuj z obserwacji community + oficjalnych
   changelogow CCh.
3. **Pricing ratios zmienne** - 1.25x write, 0.1x read moga sie wahac per model. Zawsze
   cytuj date pricing page.
4. **Batch + Cache interaction** - ambiguous czy rabaty sie mnoza (50% Batch * 10% Cache
   Read = 5% efektywnie?) czy ekskluzywne. Wymaga potwierdzenia w docs LUB eksperymentu
   community.
5. **Max 4 breakpointy** - moze byc inne per model. Weryfikuj.
6. **Hype vs fakty** - X/Twitter zawyzaja case studies. Weryfikuj z logami/zrzutami
   ekranu response.usage.

## Open Questions (do BRAMY 4 Critic)

- Czy Batch API i Prompt Caching sie mnoza czy sa alternatywa?
- Czy Claude Code auto-caches CLAUDE.md bez zadnej konfiguracji uzytkownika?
- Czy `/compact` w CCh resetuje cache czy zachowuje prefiks?
- Czy prompt_caching jest w free tier Anthropic API czy tylko Pro/Enterprise?
- Czy max 4 breakpointy to limit na poziomie request czy conversation?
- Czy cache_creation_input_tokens liczy sie do context window limitu?

## Struktura folderow

```
Research/research-prompt-caching/
  MASTER_PLAN.md
  MANIFEST.md           <- ten plik
  PROGRESS.md
  research/
    R1_api_spec_cache_control.md
    R2_ttl_invalidation.md
    R3_pricing_economics.md
    R4_claude_code_cli.md
    R5_cache_first_design.md
    R6_batch_api_caching.md
    R7_monitoring_community.md
    CRITIC.md
  extracts/
    E1_api_spec.json
    E2_ttl.json
    E3_pricing.json
    E4_cli.json
    E5_design.json
    E6_batch.json
    E7_monitoring.json
  plans/
    SYNTHESIS.md
  NbLM/
    00_FUNDAMENTALS.md
    01_PATTERNS.md
    02_DECISION_GUIDE.md
    03_MEDIA_PROMPTS.md
```

## Bramy decyzyjne

1. **BRAMA 1** (po STRATEGIA): MASTER_PLAN + MANIFEST maja 7 konkretnych pytan, nie
   abstraktow. PASS - pytania konkretne, mapping agentow jednoznaczny.
2. **BRAMA 2** (po RESEARCH): kazdy R<N> >= 1500 slow, <1000 = relaunch.
3. **BRAMA 3** (po EXTRACT): 15-30 claimow per extract, conflicts_flagged i gaps_flagged
   obecne.
4. **BRAMA 4** (po CRITIQUE): PASS/REVISE per raport, min 5 konfliktow resolved, min 3 gaps.
5. **BRAMA 5** (po SYNTEZA): SYNTHESIS 7-9k slow, citation R<N>.C<M> przy kazdej tezie,
   konflikty eksplicitnie rozstrzygniete.
6. **BRAMA 6** (po NbLM 03_MEDIA_PROMPTS): self-score >= 9.5/10.
