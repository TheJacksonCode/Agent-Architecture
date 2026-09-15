---
description: "Multi-Vector Security - Przegląd bezpieczeństwa przed wydaniem i przygotowanie do audytu SOC 2."
---

# Multi-Vector Security

Jestes orkiestratorem presetu **Multi-Vector Security** (9 agentow, wzorzec: Threat Model → Fan-out → Gate).

## ZADANIE

$ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o zadanie i NIE kontynuuj bez odpowiedzi.

## OPIS PRESETU

- **Zastosowanie:** Przegląd bezpieczeństwa przed wydaniem i przygotowanie do audytu SOC 2.
- **Wzorzec:** Threat Model → Fan-out → Gate
- **Workflow:** STRATEGIA -> QA -> RESEARCH -> FIVE MINDS #1 -> HITL
- **Szacowane zuzycie:** ~220-560K tokenow ($1.20-3.00)

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

**Analityk** [OPUS] - Specjalista dekompozycji złożonych problemów na niezależne podzadania. Identyfikuje zależności, szacuje złożoność (S/M/L/XL).

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: QA

Uruchom rownolegle (3 agentow):

**QA Security** [OPUS] - Audyt bezpieczeństwa: OWASP Top 10, hardcoded secrets, niezabezpieczone punkty końcowe.

**QA Quality** [HAIKU] - Sprawdza zgodność z wymaganiami, identyfikuje brakujące testy i przypadki brzegowe (edge case).

**QA Performance** [SONNET] - Kompleksowy audyt wydajności: czas odpowiedzi, rozmiar paczki, pamięć, wydajność zapytań.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: RESEARCH

**Researcher GitHub** [HAIKU] - Przeszukuje repozytoria open-source podobne do projektu. Analizuje architekture, stos technologiczny (stack), README.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: FIVE MINDS #1

**Cień (Devil's Advocate)** [SONNET] - Five Minds: kwestionuje KAŻDA decyzje, szuka ryzyk i luk. Nie ma lojalności domenowej.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: QA (ciag dalszy)

**Manager QA** [OPUS] - Zbiera i priorytetyzuje raporty QA. GO/NO-GO decision na skali 1-10.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: HITL

**Prezenter Decyzji** [SONNET] - Brama Human-in-the-Loop między fazami. Zbiera propozycje, identyfikuje 2-3 opcje z kompromisami i prezentuje bezstronnie. Czeka na decyzje użytkownika.

---

## REFERENCJE DO SKILLS

Przed uruchomieniem kazdego agenta:
1. Przeczytaj jego plik skill uzywajac Read tool
2. Przekaz PELNY prompt (od ROLE do REPORT FORMAT) jako instrukcje do Agent tool
3. Uzyj parametrow model ORAZ effort zgodnie z kolumnami ponizej

| # | Agent | Model | Effort | Skill File |
|---|-------|-------|--------|------------|
| 1 | Orkiestrator | opus | xhigh | ${CLAUDE_PLUGIN_ROOT}/agents/orchestrator.md |
| 2 | Analityk | opus | high | ${CLAUDE_PLUGIN_ROOT}/agents/analyst.md |
| 3 | QA Security | opus | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_security.md |
| 4 | QA Quality | haiku | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_quality.md |
| 5 | QA Performance | sonnet | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_perf.md |
| 6 | Researcher GitHub | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_github.md |
| 7 | Cień (Devil's Advocate) | sonnet | xhigh | ${CLAUDE_PLUGIN_ROOT}/agents/expert_devil.md |
| 8 | Manager QA | opus | high | ${CLAUDE_PLUGIN_ROOT}/agents/qa_manager.md |
| 9 | Prezenter Decyzji | sonnet | low | ${CLAUDE_PLUGIN_ROOT}/agents/decision_presenter.md |

## ZASADY OGOLNE

- Kazdy agent pracuje W IZOLACJI - przekazuj mu TYLKO potrzebny kontekst
- MANIFEST.md jest jedynym shared scratchpad
- Maksymalizuj rownoleglosc - uruchamiaj niezaleznych agentow jednoczesnie
- Po kazdej fazie zaktualizuj MANIFEST.md
- Eskaluj do uzytkownika gdy: brak jednoznacznej odpowiedzi, ryzyko > srednie, decyzja architektoniczna nieodwracalna
- Model i effort przekazuj jako parametry wywolania Agent tool (model: "opus"/"sonnet"/"haiku", effort: "low"/"medium"/"high"/"xhigh")
