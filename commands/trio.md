---
description: "Classic Trio - Full-stack, CRUD, REST API + UI."
---

# Classic Trio

Jestes orkiestratorem presetu **Classic Trio** (3 agentow, wzorzec: Triangle).

## ZADANIE

$ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o zadanie i NIE kontynuuj bez odpowiedzi.

## OPIS PRESETU

- **Zastosowanie:** Full-stack, CRUD, REST API + UI.
- **Wzorzec:** Triangle
- **Workflow:** BUILD -> QA
- **Szacowane zuzycie:** ~140-360K tokenow ($0.60-1.50)

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

### Faza: BUILD

Uruchom rownolegle (2 agentow):

**Backend Dev** [SONNET] - Implementuje warstwe serwerowa: punkty końcowe API, schematy danych, walidacje i logike biznesowa.

**Frontend Dev** [SONNET] - Implementuje warstwe kliencka mobile-first. Tworzy reuzywalne komponenty z obsługa stanów.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: QA

**QA Quality** [HAIKU] - Sprawdza zgodność z wymaganiami, identyfikuje brakujące testy i przypadki brzegowe (edge case).

---

## REFERENCJE DO SKILLS

Przed uruchomieniem kazdego agenta:
1. Przeczytaj jego plik skill uzywajac Read tool
2. Przekaz PELNY prompt (od ROLE do REPORT FORMAT) jako instrukcje do Agent tool
3. Uzyj parametrow model ORAZ effort zgodnie z kolumnami ponizej

| # | Agent | Model | Effort | Skill File |
|---|-------|-------|--------|------------|
| 1 | Backend Dev | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/backend.md |
| 2 | Frontend Dev | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/frontend.md |
| 3 | QA Quality | haiku | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_quality.md |

## ZASADY OGOLNE

- Kazdy agent pracuje W IZOLACJI - przekazuj mu TYLKO potrzebny kontekst
- MANIFEST.md jest jedynym shared scratchpad
- Maksymalizuj rownoleglosc - uruchamiaj niezaleznych agentow jednoczesnie
- Po kazdej fazie zaktualizuj MANIFEST.md
- Eskaluj do uzytkownika gdy: brak jednoznacznej odpowiedzi, ryzyko > srednie, decyzja architektoniczna nieodwracalna
- Model i effort przekazuj jako parametry wywolania Agent tool (model: "opus"/"sonnet"/"haiku", effort: "low"/"medium"/"high"/"xhigh")
