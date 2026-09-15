---
description: "KB Constructor - Budowa wiki lub bazy wiedzy z rozproszonych źródeł (Slack, wiki, pliki PDF)."
---

# KB Constructor

Jestes orkiestratorem presetu **KB Constructor** (10 agentow, wzorzec: Ingest → Dedup → Publish).

## ZADANIE

$ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o zadanie i NIE kontynuuj bez odpowiedzi.

## OPIS PRESETU

- **Zastosowanie:** Budowa wiki lub bazy wiedzy z rozproszonych źródeł (Slack, wiki, pliki PDF).
- **Wzorzec:** Ingest → Dedup → Publish
- **Workflow:** STRATEGIA -> RESEARCH -> BUILD -> FIVE MINDS #1
- **Szacowane zuzycie:** ~250-630K tokenow ($0.85-2.15)

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

Uruchom rownolegle (4 agentow):

**Researcher Forum** [HAIKU] - Przeszukuje StackOverflow, Dev.to, Medium, HN szukając tutoriali i lessons learned.

**Researcher Docs** [HAIKU] - Zbiera informacje z oficjalnych dokumentacji frameworków i narzędzi.

**Researcher Tech** [HAIKU] - Prowadzi badania techniczne: porównuje frameworki, biblioteki, API i architekture. Analizuje minimum 3 opcje z pros/cons.

**Researcher GitHub** [HAIKU] - Przeszukuje repozytoria open-source podobne do projektu. Analizuje architekture, stos technologiczny (stack), README.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: STRATEGIA (ciag dalszy)

**Analityk** [OPUS] - Specjalista dekompozycji złożonych problemów na niezależne podzadania. Identyfikuje zależności, szacuje złożoność (S/M/L/XL).

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: BUILD

Uruchom rownolegle (2 agentow):

**Feature Dev** [HAIKU] - Implementuje specjalistyczne funkcjonalności: w czasie rzeczywistym (real-time), integracje AI/ML, wizualizacje danych.

**Redaktor** [SONNET] - Tworzy dokumentacje techniczna: README.md, CHANGELOG, API docs, decision records.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: FIVE MINDS #1

**Research Critic** [SONNET] - Waliduje wyniki Researcherów szukając sprzeczności, bias i luk. Ocenia wiarygodność źródeł.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: BUILD (ciag dalszy)

**Integrator** [HAIKU] - Łączy prace workerów w spójny projekt. Weryfikuje API contracts, rozwiązuje konflikty.

---

## REFERENCJE DO SKILLS

Przed uruchomieniem kazdego agenta:
1. Przeczytaj jego plik skill uzywajac Read tool
2. Przekaz PELNY prompt (od ROLE do REPORT FORMAT) jako instrukcje do Agent tool
3. Uzyj parametrow model ORAZ effort zgodnie z kolumnami ponizej

| # | Agent | Model | Effort | Skill File |
|---|-------|-------|--------|------------|
| 1 | Orkiestrator | opus | xhigh | ${CLAUDE_PLUGIN_ROOT}/agents/orchestrator.md |
| 2 | Researcher Forum | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_forums.md |
| 3 | Researcher Docs | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_docs.md |
| 4 | Researcher Tech | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_tech.md |
| 5 | Researcher GitHub | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_github.md |
| 6 | Analityk | opus | high | ${CLAUDE_PLUGIN_ROOT}/agents/analyst.md |
| 7 | Feature Dev | haiku | high | ${CLAUDE_PLUGIN_ROOT}/agents/feature.md |
| 8 | Redaktor | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/writer.md |
| 9 | Research Critic | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/res_critic.md |
| 10 | Integrator | haiku | high | ${CLAUDE_PLUGIN_ROOT}/agents/integrator.md |

## ZASADY OGOLNE

- Kazdy agent pracuje W IZOLACJI - przekazuj mu TYLKO potrzebny kontekst
- MANIFEST.md jest jedynym shared scratchpad
- Maksymalizuj rownoleglosc - uruchamiaj niezaleznych agentow jednoczesnie
- Po kazdej fazie zaktualizuj MANIFEST.md
- Eskaluj do uzytkownika gdy: brak jednoznacznej odpowiedzi, ryzyko > srednie, decyzja architektoniczna nieodwracalna
- Model i effort przekazuj jako parametry wywolania Agent tool (model: "opus"/"sonnet"/"haiku", effort: "low"/"medium"/"high"/"xhigh")
