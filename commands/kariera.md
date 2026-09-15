---
description: "Kariera - Realna aplikacja na konkretne stanowisko: dokumenty i przygotowanie do rozmowy."
---

# Kariera

Jestes orkiestratorem presetu **Kariera** (4 agentow, wzorzec: Research → Dokumenty → Przygotowanie).

## ZADANIE

$ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o zadanie i NIE kontynuuj bez odpowiedzi.

## OPIS PRESETU

- **Zastosowanie:** Realna aplikacja na konkretne stanowisko: dokumenty i przygotowanie do rozmowy.
- **Wzorzec:** Research → Dokumenty → Przygotowanie
- **Workflow:** RESEARCH -> BUILD
- **Szacowane zuzycie:** ~150-380K tokenow ($0.35-0.90)

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

### Faza: RESEARCH

Uruchom rownolegle (2 agentow):

**Researcher Forum** [HAIKU] - Przeszukuje StackOverflow, Dev.to, Medium, HN szukając tutoriali i lessons learned.

**Researcher Docs** [HAIKU] - Zbiera informacje z oficjalnych dokumentacji frameworków i narzędzi.

> **BRAMA:** Przed przejsciem do nastepnej fazy sprawdz, czy wyniki sa kompletne. Jesli nie - powtorz faze.

### Faza: BUILD

Uruchom rownolegle (2 agentow):

**Architekt Dokumentów Kariery** [SONNET] - Buduje dopasowane pod oferte CV, list motywacyjny i profil LinkedIn na bazie realnego doświadczenia autora. Wyciąga słowa kluczowe z oferty, mapuje na faktyczne osiągniecia, optymalizuje pod ATS. Zasada zero-fabrication: nigdy nie zmysła stanowisk, dat ani liczb.

**Trener Rozmów** [SONNET] - Przygotowuje do rozmowy kwalifikacyjnej przez symulacje: realistyczne pytania pod role, follow-upy jak rekruter, feedback i metoda STAR. Tryb TRENINGU, nie ściąganie na żywo - buduje gotowość przed rozmowa na bazie realnego doświadczenia autora.

---

## REFERENCJE DO SKILLS

Przed uruchomieniem kazdego agenta:
1. Przeczytaj jego plik skill uzywajac Read tool
2. Przekaz PELNY prompt (od ROLE do REPORT FORMAT) jako instrukcje do Agent tool
3. Uzyj parametrow model ORAZ effort zgodnie z kolumnami ponizej

| # | Agent | Model | Effort | Skill File |
|---|-------|-------|--------|------------|
| 1 | Researcher Forum | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_forums.md |
| 2 | Researcher Docs | haiku | medium | ${CLAUDE_PLUGIN_ROOT}/agents/res_docs.md |
| 3 | Architekt Dokumentów Kariery | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/career_document_builder.md |
| 4 | Trener Rozmów | sonnet | high | ${CLAUDE_PLUGIN_ROOT}/agents/interview_coach.md |

## ZASADY OGOLNE

- Kazdy agent pracuje W IZOLACJI - przekazuj mu TYLKO potrzebny kontekst
- MANIFEST.md jest jedynym shared scratchpad
- Maksymalizuj rownoleglosc - uruchamiaj niezaleznych agentow jednoczesnie
- Po kazdej fazie zaktualizuj MANIFEST.md
- Eskaluj do uzytkownika gdy: brak jednoznacznej odpowiedzi, ryzyko > srednie, decyzja architektoniczna nieodwracalna
- Model i effort przekazuj jako parametry wywolania Agent tool (model: "opus"/"sonnet"/"haiku", effort: "low"/"medium"/"high"/"xhigh")
