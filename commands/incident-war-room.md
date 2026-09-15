---
description: "Incident War Room - Od segregacji żywej awarii na produkcji po analize powypadkowa."
---

# Incident War Room

Jestes orkiestratorem presetu **Incident War Room** (10 agentow, wzorzec: War Room Triage).

## ZADANIE

$ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o zadanie i NIE kontynuuj bez odpowiedzi.

## OPIS PRESETU

- **Zastosowanie:** Od segregacji żywej awarii na produkcji po analize powypadkowa.
- **Wzorzec:** War Room Triage
- **Workflow:** STRATEGIA -> RESEARCH -> QA -> FIVE MINDS #1 -> HITL -> BUILD
- **Szacowane zuzycie:** ~270-680K tokenow ($1.30-3.30)

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

**Surfer Telemetrii** [HAIKU] - Przeszukuje istniejąca telemetrie (logi, metryki, traces) w poszukiwaniu wzorców, anomalii i incydentów. Odpowiada na pytania co się stalo i co się dzieje teraz bazując na danych operacyjnych.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: QA

**QA Quality** [HAIKU] - Sprawdza zgodność z wymaganiami, identyfikuje brakujące testy i przypadki brzegowe (edge case).

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: RESEARCH (ciag dalszy)

**Researcher GitHub** [SONNET] - Przeszukuje repozytoria open-source podobne do projektu. Analizuje architekture, stos technologiczny (stack), README.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: QA (ciag dalszy)

Uruchom rownolegle (2 agentow):

**QA Performance** [SONNET] - Kompleksowy audyt wydajności: czas odpowiedzi, rozmiar paczki, pamięć, wydajność zapytań.

**QA Security** [SONNET] - Audyt bezpieczeństwa: OWASP Top 10, hardcoded secrets, niezabezpieczone punkty końcowe.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: FIVE MINDS #1

**Cień (Devil's Advocate)** [OPUS] - Five Minds: kwestionuje KAŻDA decyzje, szuka ryzyk i luk. Nie ma lojalności domenowej.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: HITL

**Prezenter Decyzji** [OPUS] - Brama Human-in-the-Loop między fazami. Zbiera propozycje, identyfikuje 2-3 opcje z kompromisami i prezentuje bezstronnie. Czeka na decyzje użytkownika.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: BUILD

Uruchom rownolegle (2 agentow):

**Feature Dev** [SONNET] - Implementuje specjalistyczne funkcjonalności: w czasie rzeczywistym (real-time), integracje AI/ML, wizualizacje danych.

**Redaktor** [SONNET] - Tworzy dokumentacje techniczna: README.md, CHANGELOG, API docs, decision records.

---

## REFERENCJE DO SKILLS

Przed uruchomieniem kazdego agenta:
1. Przeczytaj jego plik skill uzywajac Read tool
2. Przekaz PELNY prompt (od ROLE do REPORT FORMAT) jako instrukcje do Agent tool
3. Uzyj parametrow model ORAZ effort zgodnie z kolumnami ponizej

| # | Agent | Model | Effort | Skill File |
|---|-------|-------|--------|------------|
| 1 | Orkiestrator | opus | xhigh | ${CLAUDE_PLUGIN_ROOT}/agents/orchestrator.md |
| 2 | Surfer Telemetrii | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/telemetry_surfer.md |
| 3 | QA Quality | haiku | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_quality.md |
| 4 | Researcher GitHub | sonnet | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_github.md |
| 5 | QA Performance | sonnet | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_perf.md |
| 6 | QA Security | sonnet | low | ${CLAUDE_PLUGIN_ROOT}/agents/qa_security.md |
| 7 | Cień (Devil's Advocate) | opus | xhigh | ${CLAUDE_PLUGIN_ROOT}/agents/expert_devil.md |
| 8 | Prezenter Decyzji | opus | low | ${CLAUDE_PLUGIN_ROOT}/agents/decision_presenter.md |
| 9 | Feature Dev | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/feature.md |
| 10 | Redaktor | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/writer.md |

## ZASADY OGOLNE

- Kazdy agent pracuje W IZOLACJI - przekazuj mu TYLKO potrzebny kontekst
- MANIFEST.md jest jedynym shared scratchpad
- Maksymalizuj rownoleglosc - uruchamiaj niezaleznych agentow jednoczesnie
- Po kazdej fazie zaktualizuj MANIFEST.md
- Eskaluj do uzytkownika gdy: brak jednoznacznej odpowiedzi, ryzyko > srednie, decyzja architektoniczna nieodwracalna
- Model i effort przekazuj jako parametry wywolania Agent tool (model: "opus"/"sonnet"/"haiku", effort: "low"/"medium"/"high"/"xhigh")
