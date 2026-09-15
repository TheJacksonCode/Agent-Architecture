---
description: "Code Review - Funkcja z przeglądem, krytyczne PR."
---

# Code Review

Jestes orkiestratorem presetu **Code Review** (6 agentow, wzorzec: Pipeline + Fan-out).

## ZADANIE

$ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o zadanie i NIE kontynuuj bez odpowiedzi.

## OPIS PRESETU

- **Zastosowanie:** Funkcja z przeglądem, krytyczne PR.
- **Wzorzec:** Pipeline + Fan-out
- **Workflow:** STRATEGIA -> BUILD -> QA
- **Szacowane zuzycie:** ~250-630K tokenow ($1.05-2.70)

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

Uruchom rownolegle (2 agentow):

**Orkiestrator** [OPUS] - Centralny punkt decyzyjny całego systemu agentów. Analizuje zadanie, dekomponuje na podzadania i deleguje do specjalistów. Kontroluje bramy między fazami (GO/NO-GO) i syntetyzuje wyniki. Nie generuje treści - zarządza workflow i rozwiązuje konflikty.

**Analityk** [SONNET] - Specjalista dekompozycji złożonych problemów na niezależne podzadania. Identyfikuje zależności, szacuje złożoność (S/M/L/XL).

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: BUILD

Uruchom rownolegle (2 agentow):

**Backend Dev** [SONNET] - Implementuje warstwe serwerowa: punkty końcowe API, schematy danych, walidacje i logike biznesowa.

**Frontend Dev** [SONNET] - Implementuje warstwe kliencka mobile-first. Tworzy reuzywalne komponenty z obsługa stanów.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: QA

Uruchom rownolegle (2 agentow):

**QA Security** [HAIKU] - Audyt bezpieczeństwa: OWASP Top 10, hardcoded secrets, niezabezpieczone punkty końcowe.

**QA Quality** [HAIKU] - Sprawdza zgodność z wymaganiami, identyfikuje brakujące testy i przypadki brzegowe (edge case).

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
| 3 | Backend Dev | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/backend.md |
| 4 | Frontend Dev | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/frontend.md |
| 5 | QA Security | haiku | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_security.md |
| 6 | QA Quality | haiku | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_quality.md |

## ZASADY OGOLNE

- Kazdy agent pracuje W IZOLACJI - przekazuj mu TYLKO potrzebny kontekst
- MANIFEST.md jest jedynym shared scratchpad
- Maksymalizuj rownoleglosc - uruchamiaj niezaleznych agentow jednoczesnie
- Po kazdej fazie zaktualizuj MANIFEST.md
- Eskaluj do uzytkownika gdy: brak jednoznacznej odpowiedzi, ryzyko > srednie, decyzja architektoniczna nieodwracalna
- Model i effort przekazuj jako parametry wywolania Agent tool (model: "opus"/"sonnet"/"haiku", effort: "low"/"medium"/"high"/"xhigh")
