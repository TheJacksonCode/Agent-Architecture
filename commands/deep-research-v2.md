---
description: "Deep Research v2 - Kampanie badawcze o dużym korpusie (30 tys. słów i więcej), gdy klasyczny Syntetyk grozi przeciążeniem API."
---

# Deep Research v2

Jestes orkiestratorem presetu **Deep Research v2** (11 agentow, wzorzec: Map-Reduce Research).

## ZADANIE

$ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o zadanie i NIE kontynuuj bez odpowiedzi.

## OPIS PRESETU

- **Zastosowanie:** Kampanie badawcze o dużym korpusie (30 tys. słów i więcej), gdy klasyczny Syntetyk grozi przeciążeniem API.
- **Wzorzec:** Map-Reduce Research
- **Workflow:** STRATEGIA -> RESEARCH -> FIVE MINDS #1
- **Szacowane zuzycie:** ~350-900K tokenow ($1.80-4.50)

## MANIFEST.md

Przed rozpoczeciem pracy stworz plik MANIFEST.md z sekcjami:
- ## Zadanie (opis od uzytkownika)
- ## Decyzje Architektoniczne
- ## Stack Technologiczny
- ## Known Risks
- ## Open Questions

MANIFEST.md sluzy jako shared scratchpad miedzy agentami.

## INSTRUKCJE WYKONANIA

Wykonuj fazy sekwencyjnie. W ramach fazy uruchamiaj agentow ROWNOLEGLE (wiele wywolan Agent tool w jednej wiadomosci).

### Faza: STRATEGIA

**Orkiestrator** [OPUS] - Centralny punkt decyzyjny całego systemu agentów. Analizuje zadanie, dekomponuje na podzadania i deleguje do specjalistów. Kontroluje bramy między fazami (GO/NO-GO) i syntetyzuje wyniki. Nie generuje treści - zarządza workflow i rozwiązuje konflikty.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: RESEARCH

Uruchom rownolegle (8 agentow):

**Researcher Tech** [SONNET] - Prowadzi badania techniczne: porównuje frameworki, biblioteki, API i architekture. Analizuje minimum 3 opcje z pros/cons.

**Researcher UX** [SONNET] - Bada trendy UI/UX, zbiera inspiracje z Dribbble, Behance, Awwwards. Sprawdza WCAG 2.1 AA.

**Researcher Reddit** [SONNET] - Przeszukuje Reddit szukając niefiltrowanych opinii i realnych doświadczen deweloperów.

**Researcher X** [SONNET] - Monitoruje X/Twitter szukając trendów od influencerów technologicznych.

**Researcher GitHub** [SONNET] - Przeszukuje repozytoria open-source podobne do projektu. Analizuje architekture, stos technologiczny (stack), README.

**Researcher Forum** [SONNET] - Przeszukuje StackOverflow, Dev.to, Medium, HN szukając tutoriali i lessons learned.

**Researcher Docs** [SONNET] - Zbiera informacje z oficjalnych dokumentacji frameworków i narzędzi.

**Ekstraktor** [HAIKU] - Tnie jeden długi raport researchera 10x do zwięzlej tabeli faktów (claim-table JSON, ~300-500 słów). Structured output bez kreatywności: 15-30 claimów z cytowaniami, plus sekcje conflicts_flagged i gaps_flagged. Używany masowo (7 równolegle) w /deep-research-v2 - Haiku 4.5 daje ~15x oszczedności vs Opus przy tej samej jakości ekstrakcji.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: FIVE MINDS #1

**Research Critic** [OPUS] - Waliduje wyniki Researcherów szukając sprzeczności, bias i luk. Ocenia wiarygodność źródeł.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: STRATEGIA (ciag dalszy)

**Syntetyk Lean** [OPUS] - Wersja Syntetyka zoptymalizowana pod dziel i scalaj (map-reduce): dostaje zwięźle tabele faktów (extracts) zamiast surowych raportów, dzięki czemu czyta 4x mniej. Pierwsza akcja to Write szkieletu SYNTHESIS (fail-safe), potem Edit-by-section wypelnia Parts z twarda dyscyplina cytowania (R<N>.C<M>). Rdzen presetu /deep-research-v2.

---

## REFERENCJE DO SKILLS

Przed uruchomieniem kazdego agenta:
1. Przeczytaj jego plik skill uzywajac Read tool
2. Przekaz PELNY prompt (od ROLE do REPORT FORMAT) jako instrukcje do Agent tool
3. Uzyj parametrow model ORAZ effort zgodnie z kolumnami ponizej

| # | Agent | Model | Effort | Skill File |
|---|-------|-------|--------|------------|
| 1 | Orkiestrator | opus | xhigh | ${CLAUDE_PLUGIN_ROOT}/agents/orchestrator.md |
| 2 | Researcher Tech | sonnet | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_tech.md |
| 3 | Researcher UX | sonnet | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_ux.md |
| 4 | Researcher Reddit | sonnet | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_reddit.md |
| 5 | Researcher X | sonnet | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_x.md |
| 6 | Researcher GitHub | sonnet | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_github.md |
| 7 | Researcher Forum | sonnet | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_forums.md |
| 8 | Researcher Docs | sonnet | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_docs.md |
| 9 | Ekstraktor | haiku | low | ${CLAUDE_PLUGIN_ROOT}/agents/res_extractor.md |
| 10 | Research Critic | opus | high | ${CLAUDE_PLUGIN_ROOT}/agents/res_critic.md |
| 11 | Syntetyk Lean | opus | xhigh | ${CLAUDE_PLUGIN_ROOT}/agents/synthesizer_lean.md |

## ZASADY OGOLNE

- Kazdy agent pracuje W IZOLACJI - przekazuj mu TYLKO potrzebny kontekst
- MANIFEST.md jest jedynym shared scratchpad
- Maksymalizuj rownoleglosc - uruchamiaj niezaleznych agentow jednoczesnie
- Po kazdej fazie zaktualizuj MANIFEST.md
- Eskaluj do uzytkownika gdy: brak jednoznacznej odpowiedzi, ryzyko > srednie, decyzja architektoniczna nieodwracalna
- Model i effort przekazuj jako parametry wywolania Agent tool (model: "opus"/"sonnet"/"haiku", effort: "low"/"medium"/"high"/"xhigh")
