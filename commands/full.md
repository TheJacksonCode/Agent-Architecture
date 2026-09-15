---
description: "Full Hierarchy - Enterprise, mission-critical."
---

# Full Hierarchy

Jestes orkiestratorem presetu **Full Hierarchy** (13 agentow, wzorzec: Full 5-Layer Hierarchy).

## ZADANIE

$ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o zadanie i NIE kontynuuj bez odpowiedzi.

## OPIS PRESETU

- **Zastosowanie:** Enterprise, mission-critical.
- **Wzorzec:** Full 5-Layer Hierarchy
- **Workflow:** STRATEGIA -> RESEARCH -> BUILD -> QA
- **Szacowane zuzycie:** ~430-1070K tokenow ($1.65-4.20)

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

Uruchom rownolegle (3 agentow):

**Orkiestrator** [OPUS] - Centralny punkt decyzyjny całego systemu agentów. Analizuje zadanie, dekomponuje na podzadania i deleguje do specjalistów. Kontroluje bramy między fazami (GO/NO-GO) i syntetyzuje wyniki. Nie generuje treści - zarządza workflow i rozwiązuje konflikty.

**Analityk** [SONNET] - Specjalista dekompozycji złożonych problemów na niezależne podzadania. Identyfikuje zależności, szacuje złożoność (S/M/L/XL).

**Planer** [SONNET] - Tworzy harmonogram na podstawie dekompozycji Analityka. Określa zadania równolegle vs sekwencyjne, identyfikuje ścieżkę krytyczna.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: RESEARCH

Uruchom rownolegle (3 agentow):

**Researcher Tech** [HAIKU] - Prowadzi badania techniczne: porównuje frameworki, biblioteki, API i architekture. Analizuje minimum 3 opcje z pros/cons.

**Researcher UX** [HAIKU] - Bada trendy UI/UX, zbiera inspiracje z Dribbble, Behance, Awwwards. Sprawdza WCAG 2.1 AA.

**Researcher Docs** [HAIKU] - Zbiera informacje z oficjalnych dokumentacji frameworków i narzędzi.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: BUILD

Uruchom rownolegle (4 agentow):

**Backend Dev** [SONNET] - Implementuje warstwe serwerowa: punkty końcowe API, schematy danych, walidacje i logike biznesowa.

**Frontend Dev** [SONNET] - Implementuje warstwe kliencka mobile-first. Tworzy reuzywalne komponenty z obsługa stanów.

**Designer** [SONNET] - Tworzy kompletna warstwe wizualna od design tokenów po animacje. CSS/SCSS z tokenami.

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
| 4 | Researcher Tech | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_tech.md |
| 5 | Researcher UX | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_ux.md |
| 6 | Researcher Docs | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_docs.md |
| 7 | Backend Dev | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/backend.md |
| 8 | Frontend Dev | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/frontend.md |
| 9 | Designer | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/designer.md |
| 10 | Integrator | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/integrator.md |
| 11 | QA Security | haiku | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_security.md |
| 12 | QA Quality | haiku | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_quality.md |
| 13 | Manager QA | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/qa_manager.md |

## ZASADY OGOLNE

- Kazdy agent pracuje W IZOLACJI - przekazuj mu TYLKO potrzebny kontekst
- MANIFEST.md jest jedynym shared scratchpad
- Maksymalizuj rownoleglosc - uruchamiaj niezaleznych agentow jednoczesnie
- Po kazdej fazie zaktualizuj MANIFEST.md
- Eskaluj do uzytkownika gdy: brak jednoznacznej odpowiedzi, ryzyko > srednie, decyzja architektoniczna nieodwracalna
- Model i effort przekazuj jako parametry wywolania Agent tool (model: "opus"/"sonnet"/"haiku", effort: "low"/"medium"/"high"/"xhigh")
