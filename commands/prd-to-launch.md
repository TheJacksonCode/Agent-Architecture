---
description: "PRD to Launch - Od pomysłu lub zapisu rozmowy do kompletu materiałów na wdrożenie."
---

# PRD to Launch

Jestes orkiestratorem presetu **PRD to Launch** (11 agentow, wzorzec: Product Pipeline).

## ZADANIE

$ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o zadanie i NIE kontynuuj bez odpowiedzi.

## OPIS PRESETU

- **Zastosowanie:** Od pomysłu lub zapisu rozmowy do kompletu materiałów na wdrożenie.
- **Wzorzec:** Product Pipeline
- **Workflow:** STRATEGIA -> RESEARCH -> BUILD -> FIVE MINDS #1 -> HITL
- **Szacowane zuzycie:** ~280-700K tokenow ($1.30-3.30)

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

### Faza: RESEARCH

Uruchom rownolegle (2 agentow):

**Researcher UX** [HAIKU] - Bada trendy UI/UX, zbiera inspiracje z Dribbble, Behance, Awwwards. Sprawdza WCAG 2.1 AA.

**Researcher Reddit** [HAIKU] - Przeszukuje Reddit szukając niefiltrowanych opinii i realnych doświadczen deweloperów.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: BUILD

**Redaktor** [OPUS] - Tworzy dokumentacje techniczna: README.md, CHANGELOG, API docs, decision records.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: STRATEGIA (ciag dalszy)

**Planer** [SONNET] - Tworzy harmonogram na podstawie dekompozycji Analityka. Określa zadania równolegle vs sekwencyjne, identyfikuje ścieżkę krytyczna.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: BUILD (ciag dalszy)

Uruchom rownolegle (3 agentow):

**Designer** [SONNET] - Tworzy kompletna warstwe wizualna od design tokenów po animacje. CSS/SCSS z tokenami.

**Feature Dev** [SONNET] - Implementuje specjalistyczne funkcjonalności: w czasie rzeczywistym (real-time), integracje AI/ML, wizualizacje danych.

**Strateg GTM** [OPUS] - Projektuje go-to-market: ICP, positioning, pricing, kanały akwizycji i plan launchu. Łączy wynik badań użytkowników z mechanika wdrożenia produktu na rynek.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: FIVE MINDS #1

**Research Critic** [SONNET] - Waliduje wyniki Researcherów szukając sprzeczności, bias i luk. Ocenia wiarygodność źródeł.

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
| 2 | Analityk | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/analyst.md |
| 3 | Researcher UX | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_ux.md |
| 4 | Researcher Reddit | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_reddit.md |
| 5 | Redaktor | opus | high | ${CLAUDE_PLUGIN_ROOT}/agents/writer.md |
| 6 | Planer | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/planner.md |
| 7 | Designer | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/designer.md |
| 8 | Feature Dev | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/feature.md |
| 9 | Strateg GTM | opus | high | ${CLAUDE_PLUGIN_ROOT}/agents/gtm_strategist.md |
| 10 | Research Critic | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/res_critic.md |
| 11 | Prezenter Decyzji | sonnet | low | ${CLAUDE_PLUGIN_ROOT}/agents/decision_presenter.md |

## ZASADY OGOLNE

- Kazdy agent pracuje W IZOLACJI - przekazuj mu TYLKO potrzebny kontekst
- MANIFEST.md jest jedynym shared scratchpad
- Maksymalizuj rownoleglosc - uruchamiaj niezaleznych agentow jednoczesnie
- Po kazdej fazie zaktualizuj MANIFEST.md
- Eskaluj do uzytkownika gdy: brak jednoznacznej odpowiedzi, ryzyko > srednie, decyzja architektoniczna nieodwracalna
- Model i effort przekazuj jako parametry wywolania Agent tool (model: "opus"/"sonnet"/"haiku", effort: "low"/"medium"/"high"/"xhigh")
