---
description: "Deep Research+Build - Enterprise z głęboka analiza."
---

# Deep Research+Build

Jestes orkiestratorem presetu **Deep Research+Build** (18 agentow, wzorzec: Full Orchestra).

## ZADANIE

$ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o zadanie i NIE kontynuuj bez odpowiedzi.

## OPIS PRESETU

- **Zastosowanie:** Enterprise z głęboka analiza.
- **Wzorzec:** Full Orchestra
- **Workflow:** STRATEGIA -> RESEARCH -> FIVE MINDS #1 -> BUILD -> QA
- **Szacowane zuzycie:** ~600-1500K tokenow ($2.20-5.55)

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

Uruchom rownolegle (4 agentow):

**Orkiestrator** [OPUS] - Centralny punkt decyzyjny całego systemu agentów. Analizuje zadanie, dekomponuje na podzadania i deleguje do specjalistów. Kontroluje bramy między fazami (GO/NO-GO) i syntetyzuje wyniki. Nie generuje treści - zarządza workflow i rozwiązuje konflikty.

**Analityk** [SONNET] - Specjalista dekompozycji złożonych problemów na niezależne podzadania. Identyfikuje zależności, szacuje złożoność (S/M/L/XL).

**Planer** [SONNET] - Tworzy harmonogram na podstawie dekompozycji Analityka. Określa zadania równolegle vs sekwencyjne, identyfikuje ścieżkę krytyczna.

**Syntetyk** [SONNET] - Pamięc cross-fazowa systemu - utrzymuje MANIFEST.md jako jedyne źródło prawdy (single source of truth). Zbiera wyniki z każdej fazy, aktualizuje decyzje architektoniczne i stos technologiczny (stack).

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: RESEARCH

Uruchom rownolegle (6 agentow):

**Researcher Reddit** [HAIKU] - Przeszukuje Reddit szukając niefiltrowanych opinii i realnych doświadczen deweloperów.

**Researcher X** [SONNET] - Monitoruje X/Twitter szukając trendów od influencerów technologicznych.

**Researcher UX** [HAIKU] - Bada trendy UI/UX, zbiera inspiracje z Dribbble, Behance, Awwwards. Sprawdza WCAG 2.1 AA.

**Researcher GitHub** [SONNET] - Przeszukuje repozytoria open-source podobne do projektu. Analizuje architekture, stos technologiczny (stack), README.

**Researcher Forum** [SONNET] - Przeszukuje StackOverflow, Dev.to, Medium, HN szukając tutoriali i lessons learned.

**Researcher Docs** [HAIKU] - Zbiera informacje z oficjalnych dokumentacji frameworków i narzędzi.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: FIVE MINDS #1

**Research Critic** [SONNET] - Waliduje wyniki Researcherów szukając sprzeczności, bias i luk. Ocenia wiarygodność źródeł.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: BUILD

Uruchom rownolegle (4 agentow):

**Backend Dev** [SONNET] - Implementuje warstwe serwerowa: punkty końcowe API, schematy danych, walidacje i logike biznesowa.

**Frontend Dev** [SONNET] - Implementuje warstwe kliencka mobile-first. Tworzy reuzywalne komponenty z obsługa stanów.

**Feature Dev** [SONNET] - Implementuje specjalistyczne funkcjonalności: w czasie rzeczywistym (real-time), integracje AI/ML, wizualizacje danych.

**Integrator** [SONNET] - Łączy prace workerów w spójny projekt. Weryfikuje API contracts, rozwiązuje konflikty.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: QA

Uruchom rownolegle (3 agentow):

**QA Security** [HAIKU] - Audyt bezpieczeństwa: OWASP Top 10, hardcoded secrets, niezabezpieczone punkty końcowe.

**QA Quality** [HAIKU] - Sprawdza zgodność z wymaganiami, identyfikuje brakujące testy i przypadki brzegowe (edge case).

**Manager QA** [SONNET] - Zbiera i priorytetyzuje raporty QA. GO/NO-GO decision na skali 1-10.

---

## REFERENCJE DO SKILLS

Przed uruchomieniem kazdego agenta:
1. Przeczytaj jego plik skill uzywajac Read tool
2. Przekaz PELNY prompt (od ROLE do REPORT FORMAT) jako instrukcje do Agent tool
3. Uzyj parametrow model ORAZ effort zgodnie z kolumnami ponizej

| # | Agent | Model | Effort | Skill File |
|---|-------|-------|--------|------------|
| 1 | Orkiestrator | opus | xhigh | ${CLAUDE_PLUGIN_ROOT}/agents/orchestrator.md |
| 2 | Analityk | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/analyst.md |
| 3 | Planer | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/planner.md |
| 4 | Syntetyk | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/synthesizer.md |
| 5 | Researcher Reddit | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_reddit.md |
| 6 | Researcher X | sonnet | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_x.md |
| 7 | Researcher UX | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_ux.md |
| 8 | Researcher GitHub | sonnet | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_github.md |
| 9 | Researcher Forum | sonnet | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_forums.md |
| 10 | Researcher Docs | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_docs.md |
| 11 | Research Critic | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/res_critic.md |
| 12 | Backend Dev | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/backend.md |
| 13 | Frontend Dev | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/frontend.md |
| 14 | Feature Dev | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/feature.md |
| 15 | Integrator | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/integrator.md |
| 16 | QA Security | haiku | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_security.md |
| 17 | QA Quality | haiku | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_quality.md |
| 18 | Manager QA | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/qa_manager.md |

## ZASADY OGOLNE

- Kazdy agent pracuje W IZOLACJI - przekazuj mu TYLKO potrzebny kontekst
- MANIFEST.md jest jedynym shared scratchpad
- Maksymalizuj rownoleglosc - uruchamiaj niezaleznych agentow jednoczesnie
- Po kazdej fazie zaktualizuj MANIFEST.md
- Eskaluj do uzytkownika gdy: brak jednoznacznej odpowiedzi, ryzyko > srednie, decyzja architektoniczna nieodwracalna
- Model i effort przekazuj jako parametry wywolania Agent tool (model: "opus"/"sonnet"/"haiku", effort: "low"/"medium"/"high"/"xhigh")
