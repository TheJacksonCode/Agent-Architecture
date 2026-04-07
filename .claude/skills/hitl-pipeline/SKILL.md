---
name: hitl-pipeline
description: Uruchom wielofazowy pipeline z bramami Human-in-the-Loop — agenci robia research, na bramach decyzyjnych czlowiek wybiera kierunek
---

<!-- UWAGA: Ten skill MUSI dzialac inline (nie forked), poniewaz bramy HITL
     wymagaja interakcji z uzytkownikiem w trakcie wykonania.
     NIE dodawaj context: fork do frontmatter. -->

# HITL PIPELINE — Multi-Phase Agent Workflow z bramami decyzyjnymi

Jestes Orkiestratorem pipeline HITL. Twoim zadaniem jest przeprowadzic wielofazowy
workflow z prawdziwymi subagentami i bramami decyzyjnymi, gdzie czlowiek podejmuje
kluczowe decyzje miedzy fazami.

## TEMAT PIPELINE

$ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o temat i NIE kontynuuj bez odpowiedzi.

---

## ARCHITEKTURA PIPELINE

Pipeline sklada sie z **5 faz roboczych**, **1 fazy podsumowania** i **3 bram decyzyjnych (HITL)**:

```
STRATEGIA → [BRAMA 1] → RESEARCH → DEBATA → [BRAMA 2] → BUILD → [BRAMA 3] → QA → PODSUMOWANIE
```

Kazda brama:
1. Tworzy plik Markdown w folderze `gates/`
2. Wyswietla krotkie podsumowanie z 3 opcjami w chacie
3. Czeka na decyzje uzytkownika
4. Loguje decyzje w MANIFEST.md

### Model routing (oszczednosc 70-90% kosztow)
- **Orkiestrator (ty):** model w ktorym dzialasz — koordynacja, synteza
- **Research subagenci:** model: "haiku" — zbieranie danych nie wymaga drogiego modelu
- **Debata Five Minds:** model: "sonnet" — rozumowanie i argumentacja
- **Build subagenci:** model: "sonnet" — kod i architektura
- **QA subagenci:** model: "sonnet" (code review, security), model: "haiku" (metryki perf)

---

## PLIKI PIPELINE

Na poczatku utwórz strukture:

```
MANIFEST.md          ← stan pipeline, wyniki faz, decyzje
gates/               ← folder na bramy decyzyjne
  BRAMA_1_strategia_research.md
  BRAMA_2_debata_build.md
  BRAMA_3_build_qa.md
```

Uzyj Bash tool: `mkdir -p gates` aby stworzyc folder.

---

## MANIFEST.md — FORMAT

Utwórz MANIFEST.md na poczatku pipeline uzywajac Write tool. Uzyj DOKLADNIE tej struktury:

````markdown
# MANIFEST — Pipeline HITL

## Meta
- **Temat:** [temat z $ARGUMENTS]
- **Start:** [timestamp]
- **Status:** W trakcie | Faza 1/6
- **Model glowny:** [model w ktorym dzialasz]
- **Modele subagentow:** sonnet/haiku

---

## Faza 1: Strategia

### Analiza tematu
[2-3 zdania opisu problemu/zadania]

### Kluczowe pytania badawcze
1. [Pytanie 1]
2. [Pytanie 2]
3. [Pytanie 3]

### Scope
- **IN:** [co jest w zakresie]
- **OUT:** [co jest poza zakresem]

### Dekompozycja
| Podzadanie | Typ | Priorytet | Zlozonosc |
|-----------|-----|-----------|-----------|
| [Podzadanie 1] | Research | Wysoki | M |
| [Podzadanie 2] | Build | Sredni | L |

---

## Brama 1: Strategia -> Research
- **Wybrana opcja:** _[wypelnia po decyzji]_
- **Uzasadnienie:** _[wypelnia po decyzji]_
- **Plik bramy:** `gates/BRAMA_1_strategia_research.md`

---

## Faza 2: Research

### Subagenci uruchomieni
| Agent | Kierunek | Status | Kluczowy wynik |
|-------|---------|--------|----------------|
| _[wypelnia po zakonczeniu]_ |

### Synteza wynikow
_[5-10 zdaniowe podsumowanie: co sie zgadza, co sie rozni, jakie luki]_

### Kluczowe fakty
- _[wypelnia po zakonczeniu]_

---

## Faza 3: Debata Five Minds

### Gold Solution
_[3-5 zdaniowe podsumowanie Gold Solution z debaty]_

### Kluczowe decyzje z debaty
1. _[wypelnia po zakonczeniu]_

### Ryzyka zidentyfikowane przez Cienia
- _[wypelnia po zakonczeniu]_

---

## Brama 2: Debata -> Build
- **Wybrana opcja:** _[wypelnia po decyzji]_
- **Uzasadnienie:** _[wypelnia po decyzji]_
- **Plik bramy:** `gates/BRAMA_2_debata_build.md`

---

## Faza 4: Build

### Co zbudowano
_[wypelnia po zakonczeniu]_

### Pliki utworzone/zmodyfikowane
| Plik | Akcja | Opis |
|------|-------|------|
| _[wypelnia po zakonczeniu]_ |

### Decyzje techniczne
- _[wypelnia po zakonczeniu]_

---

## Brama 3: Build -> QA
- **Wybrana opcja:** _[wypelnia po decyzji]_
- **Uzasadnienie:** _[wypelnia po decyzji]_
- **Plik bramy:** `gates/BRAMA_3_build_qa.md`

---

## Faza 5: QA

### Wyniki QA
| Kategoria | Issues | Krytyczne | Naprawione |
|-----------|--------|-----------|------------|
| _[wypelnia po zakonczeniu]_ |

### Krytyczne znaleziska
- _[wypelnia po zakonczeniu]_

---

## Podsumowanie

### Wynik koncowy
_[3-5 zdaniowe podsumowanie co osiagnieto]_

### Kluczowe decyzje
1. Brama 1: _[co wybrano i dlaczego]_
2. Brama 2: _[co wybrano i dlaczego]_
3. Brama 3: _[co wybrano i dlaczego]_

### Rekomendacje na przyszlosc
- _[wypelnia na koncu]_

### Metryki
- **Czas trwania:** [od startu do konca]
- **Subagentow uruchomionych:** [N]
- **Faz zakonczonych:** 6/6
- **Bram decyzyjnych:** 3/3

---

## Log Decyzji

| Brama | Opcja | Czas namyslu | Deep dive? | Timestamp |
|-------|-------|-------------|------------|-----------|
| 1: Strategia->Research | _[A/B/C]_ | _[szybka/deep]_ | _[Tak/Nie]_ | _[timestamp]_ |
| 2: Debata->Build | _[A/B/C]_ | _[szybka/deep]_ | _[Tak/Nie]_ | _[timestamp]_ |
| 3: Build->QA | _[A/B/C]_ | _[szybka/deep]_ | _[Tak/Nie]_ | _[timestamp]_ |
````

---

## PROCEDURA — Wykonuj krok po kroku

### FAZA 1: STRATEGIA

1. **OBOWIAZKOWE:** Stworz MANIFEST.md uzywajac formatu powyzej (Write tool) oraz folder `gates/` (Bash: `mkdir -p gates`)
2. Przeanalizuj temat: zidentyfikuj 3-5 kluczowych pytan badawczych
3. Okresl scope: co jest IN i co jest OUT
4. Zaproponuj wstepna dekompozycje na podzadania
5. Zaktualizuj MANIFEST.md sekcja "Faza 1: Strategia" (Edit tool)
6. Wyswietl uzytkownikowi krotki status: "Faza 1/6 zakonczona: Strategia"

### BRAMA 1: Strategia -> Research

Wykonaj procedure BRAMA (opisana nizej) z tymi opcjami:

**Tytul:** Strategia -> Research
**Kontekst:** Wyniki analizy strategicznej
**Opcje:**
- **Szeroki Research** — uruchom 4-6 subagentow badajacych rozne aspekty rownolegle (technologia, UX, konkurencja, community). Maksymalne pokrycie, wyzszy koszt.
- **Skupiony Research** — uruchom 2-3 subagentow na najwazniejszych kierunkach. Szybciej, taniej, ryzyko przeoczenia.
- **Research + Prototyp** — 2 subagentow bada + 1 tworzy prototypowy szkic rozwiazania rownolegle. Szybsza weryfikacja hipotez.

**Rekomendacja:** Szeroki Research (dla zlozonych tematow) lub Skupiony Research (dla prostszych)

### FAZA 2: RESEARCH

Na podstawie decyzji z Bramy 1:

1. **OBOWIAZKOWE:** Przeczytaj MANIFEST.md uzywajac Read tool — to twoja jedyna pamiec miedzy fazami. Jesli pipeline jest dlugi, wczesniejsze fazy moga byc poza kontekstem. MANIFEST.md zawiera wszystko co potrzebujesz.
2. Uruchom subagentow przez Agent tool:

**Opcja Szeroki Research (4-6 agentow rownolegle):**
Uruchom agentow rownolegle (wiele wywolan Agent tool w jednej wiadomosci):
- Agent Research-Tech: `model: "haiku"`, prompt: "Zbadaj aspekt techniczny: [konkretne pytanie z MANIFEST]. Uzyj WebSearch. Raportuj w max 300 slow: kluczowe fakty, zrodla, rekomendacja."
- Agent Research-UX: `model: "haiku"`, prompt: "Zbadaj aspekt UX/uzytkownika: [pytanie]. Uzyj WebSearch. Raportuj w max 300 slow."
- Agent Research-Konkurencja: `model: "haiku"`, prompt: "Zbadaj konkurencje/alternatywy: [pytanie]. Uzyj WebSearch. Raportuj w max 300 slow."
- Agent Research-Community: `model: "haiku"`, prompt: "Zbadaj community/opinie: [pytanie]. Uzyj WebSearch (Reddit, HN, forums). Raportuj w max 300 slow."

Uzyj `run_in_background: true` dla kazdego agenta aby dzialali rownolegle.

**Opcja Skupiony Research (2-3 agentow):**
Wybierz 2-3 najwazniejsze kierunki z Fazy 1. Te same parametry (model: "haiku").

**Opcja Research + Prototyp:**
2 agentow bada (model: "haiku") + 1 agent tworzy wstepny szkic rozwiazania (model: "sonnet").

3. Zbierz wyniki ze wszystkich subagentow
4. Zsyntetyzuj: co sie zgadza, co sie nie zgadza, jakie luki
5. Zaktualizuj MANIFEST.md sekcja "Faza 2: Research" (Edit tool)
6. Status: "Faza 2/6 zakonczona: Research — [N] zrodel przebadanych"

### FAZA 3: DEBATA FIVE MINDS

1. **OBOWIAZKOWE:** Przeczytaj MANIFEST.md uzywajac Read tool — to twoja jedyna pamiec miedzy fazami.
2. Uruchom debate Five Minds przez Agent tool:
   - Stworz **jednego** subagenta z parametrami:
     - `model: "sonnet"` (debata wymaga rozumowania)
     - `run_in_background: false` (debata musi sie zakonczyc zanim przejdziemy dalej)
     - prompt: "Przeczytaj plik `.claude/skills/five-minds/SKILL_v2_terminal_rich.md` uzywajac Read tool. Nastepnie przeprowadz pelna debate Five Minds Protocol wedlug instrukcji z tego pliku na temat: [WKLEJ TUTAJ: synteze wynikow researchu z MANIFEST.md, kluczowe fakty, pytania do rozstrzygniecia]. Na koncu zapisz caly output debaty do pliku `FIVE_MINDS_DEBATE.md` uzywajac Write tool."
   - WAZNE: Five Minds to structured monologue jednego LLM grającego 5 rol — NIE uruchamiaj 5 osobnych agentow.
3. Po zakonczeniu subagenta: przeczytaj `FIVE_MINDS_DEBATE.md` (Read tool)
4. Wyciagnij Gold Solution i kluczowe decyzje
5. Zaktualizuj MANIFEST.md sekcja "Faza 3: Debata" (Edit tool)
6. Status: "Faza 3/6 zakonczona: Debata Five Minds — Gold Solution gotowe"

### BRAMA 2: Debata -> Build

Wykonaj procedure BRAMA z opcjami:

**Tytul:** Debata -> Build
**Kontekst:** Gold Solution z debaty Five Minds
**Opcje:**
- **Pelna Implementacja** — realizuj calosc Gold Solution. Wszystkie rekomendacje, pelny scope.
- **MVP First** — zaimplementuj minimalna wersje. Tylko krytyczne elementy Gold Solution.
- **Iteracyjny Build** — 2 fazy: najpierw fundament, potem review, potem reszta. Wiecej kontroli.

**Rekomendacja:** Pelna Implementacja (jesli Gold Solution jest klarowne) lub MVP First (jesli scope jest za duzy)

### FAZA 4: BUILD

Na podstawie decyzji z Bramy 2:

1. **OBOWIAZKOWE:** Przeczytaj MANIFEST.md uzywajac Read tool — to twoja jedyna pamiec miedzy fazami.
2. Wykonaj implementacje zgodnie z Gold Solution i wybrana opcja
3. Jesli implementacja wymaga wielu plikow, uzyj subagentow (model: "sonnet"):
   - Agent Backend: logika, API, dane
   - Agent Frontend: UI, komponenty, styling
   - Agent Integrator: polaczenie czesci, testy smoke
4. Zaktualizuj MANIFEST.md sekcja "Faza 4: Build" (Edit tool)
5. Status: "Faza 4/6 zakonczona: Build — [opis co zbudowano]"

### BRAMA 3: Build -> QA

Wykonaj procedure BRAMA z opcjami:

**Tytul:** Build -> QA
**Kontekst:** Co zostalo zbudowane w Fazie 4
**Opcje:**
- **Pelne QA** — review kodu + testy + security check + performance check. Najdokladniejsze.
- **Core QA** — review kodu + testy. Szybciej, bez security/performance audit.
- **QA + Review Debate** — Pelne QA + druga runda Five Minds jako review architektoniczny (ten sam mechanizm co Faza 3: spawn Agent ktory czyta five-minds/SKILL_v2_terminal_rich.md). Najdrozsze, najlepsze.

**Rekomendacja:** Pelne QA (dla wiekszosci przypadkow)

### FAZA 5: QA

Na podstawie decyzji z Bramy 3:

1. **OBOWIAZKOWE:** Przeczytaj MANIFEST.md uzywajac Read tool — to twoja jedyna pamiec miedzy fazami.
2. Wykonaj QA zgodnie z wybrana opcja:

**Opcja Pelne QA (agenci rownolegle):**
- Agent QA-Code: `model: "sonnet"`, prompt: "Zrob code review: [pliki z MANIFEST]. Szukaj bugow, edge cases, code smells. Max 300 slow."
- Agent QA-Security: `model: "sonnet"`, prompt: "Sprawdz bezpieczenstwo: OWASP Top 10, hardcoded secrets, injection. Max 200 slow."
- Agent QA-Perf: `model: "haiku"`, prompt: "Sprawdz wydajnosc: zlozonosc O(), bundle size, memory leaks. Max 200 slow."

**Opcja Core QA:**
Tylko Agent QA-Code (model: "sonnet").

**Opcja QA + Debate:**
Agenci QA (jak wyzej) + druga runda Five Minds (ten sam mechanizm co Faza 3).

3. Zbierz wyniki, napraw krytyczne bugi
4. Zaktualizuj MANIFEST.md sekcja "Faza 5: QA" (Edit tool)
5. Status: "Faza 5/6 zakonczona: QA — [N] issues znalezionych, [M] naprawionych"

### FAZA 6: PODSUMOWANIE

1. **OBOWIAZKOWE:** Przeczytaj CALY MANIFEST.md uzywajac Read tool
2. Zaktualizuj sekcje "Podsumowanie" i "Metryki" w MANIFEST.md
3. Wyswietl uzytkownikowi finalne podsumowanie:
   - Co zostalo zrobione
   - Kluczowe decyzje na bramach
   - Wynik koncowy
   - Rekomendacje na przyszlosc
4. Status: "Pipeline zakonczony: 6/6 faz, 3/3 bram"

---

## PROCEDURA BRAMY HITL

Dla KAZDEJ bramy decyzyjnej wykonaj dokladnie te kroki:

### Krok 1: Stworz plik bramy

Uzyj Write tool aby stworzyc `gates/BRAMA_N_nazwa.md` z DOKLADNIE tym formatem:

````markdown
# BRAMA [N]: [Tytul]

> Human-in-the-Loop Decision Gate | Pipeline HITL
> Wygenerowano: [timestamp]

---

## Podsumowanie dotychczasowych wynikow

[3-5 zdaniowe podsumowanie co zrobiono w poprzedniej fazie. Konkretne fakty, nie ogolniki.]

## Kluczowe ustalenia

| # | Ustalenie | Zrodlo | Pewnosc |
|---|----------|--------|---------|
| 1 | [Najwazniejszy fakt/wniosek] | [skad wiemy] | Wysoka/Srednia |
| 2 | [Ustalenie] | [zrodlo] | [pewnosc] |
| 3 | [Ustalenie] | [zrodlo] | [pewnosc] |
| 4 | [Ustalenie] | [zrodlo] | [pewnosc] |
| 5 | [Ustalenie] | [zrodlo] | [pewnosc] |

## Pytanie decyzyjne

**[Jasne, konkretne pytanie na ktore user musi odpowiedziec]**

---

## Opcje

WAZNE: Randomizuj kolejnosc opcji! Rekomendowana opcja NIE musi byc zawsze jako pierwsza.
Uzyj losowej kolejnosci A/B/C dla kazdej bramy aby zapobiec rubber-stamp.

### Opcja A: [Nazwa] (dodaj "-- Rekomendowana" jesli ta opcja jest rekomendowana)

**Opis:** [2-3 zdania co ta opcja oznacza w praktyce]

| Aspekt | Ocena |
|--------|-------|
| Szacowany koszt tokenow | [np. ~80-120K] |
| Szacowany koszt $ | [np. $0.08-0.20] |
| Czas wykonania | [np. 2-4 min] |
| Pokrycie/jakosc | Wysoka / Srednia / Niska |
| Ryzyko | Niskie / Srednie / Wysokie |

**Zalety:**
- [Zaleta 1]
- [Zaleta 2]
- [Zaleta 3]

**Wady:**
- [Wada 1]
- [Wada 2]

---

### Opcja B: [Nazwa]

[ten sam format co Opcja A]

---

### Opcja C: [Nazwa]

[ten sam format co Opcja A]

---

## Porownanie opcji

| Kryterium | A: [nazwa] | B: [nazwa] | C: [nazwa] |
|-----------|-----------|-----------|-----------|
| Koszt | [$/$$/$$$ ] | [...] | [...] |
| Czas | [szybko/srednio/wolno] | [...] | [...] |
| Jakosc | [wysoka/srednia] | [...] | [...] |
| Ryzyko | [niskie/srednie/wysokie] | [...] | [...] |
| Najlepsze gdy | [warunek] | [warunek] | [warunek] |

## Diagram przeplywu

```mermaid
graph TD
    PREV["Faza N: [nazwa]<br/>Zakonczona"] --> GATE{"BRAMA N<br/>[pytanie]"}
    GATE -->|"A: [nazwa]"| A["[krotki opis]<br/>Koszt: ~[X]"]
    GATE -->|"B: [nazwa]"| B["[krotki opis]<br/>Koszt: ~[X]"]
    GATE -->|"C: [nazwa]"| C["[krotki opis]<br/>Koszt: ~[X]"]
    A --> NEXT["Faza N+1"]
    B --> NEXT
    C --> NEXT

    style GATE fill:#FBBF24,stroke:#B45309,color:#000
    style A fill:#34D399,stroke:#059669,color:#000
    style B fill:#818CF8,stroke:#6366F1,color:#fff
    style C fill:#F87171,stroke:#DC2626,color:#fff
```

## Rekomendacja

**Opcja [X]: [Nazwa]** — [2-3 zdania dlaczego ta opcja jest rekomendowana. Konkretne argumenty, nie "bo jest najlepsza".]

---

## Decyzja

> **Wybrano:** _[wypelnia system po decyzji uzytkownika]_
> **Czas namyslu:** _[szybka / deep dive]_
> **Timestamp:** _[data i godzina]_
````

### Krok 2: Wyswietl podsumowanie w chacie

Napisz uzytkownikowi krotkie podsumowanie — to jest DWUPOZIOMOWA BRAMA:
szybka decyzja w chacie + mozliwosc deep dive w pliku.

```
---
## BRAMA [N]: [Tytul]

[2-3 zdania kontekstu — co ustalono, jaka decyzja jest potrzebna]

**A) [Nazwa]** [dodaj gwiazdke jesli rekomendowana] — [1 zdanie opisu]
**B) [Nazwa]** [dodaj gwiazdke jesli rekomendowana] — [1 zdanie opisu]
**C) [Nazwa]** [dodaj gwiazdke jesli rekomendowana] — [1 zdanie opisu]

Pelna analiza: `gates/BRAMA_N_nazwa.md`

Ktora opcje wybierasz? (A/B/C, lub "przeczytam plik" dla deep dive)
---
```

### Krok 3: Czekaj na decyzje

Zapytaj uzytkownika o decyzje. Zaakceptuj:
- "A", "B", "C" — szybka decyzja
- "1", "2", "3" — numerycznie
- Pelna nazwa opcji — np. "Szeroki Research"
- "przeczytam plik" / "deep dive" — user chce przeczytac plik bramy, poczekaj az wróci z decyzja
- Pytania dodatkowe — odpowiedz i ponow pytanie

### Krok 4: Zaloguj decyzje

Zaktualizuj MANIFEST.md (Edit tool):
- Sekcja bramy: wypelnij wybrana opcja i uzasadnienie
- Tabela "Log Decyzji": dodaj wiersz
- Zaktualizuj sekcje "Decyzja" w pliku bramy

### Krok 5: Kontynuuj pipeline

Przejdz do nastepnej fazy na podstawie wybranej opcji.

---

## ZASADY JAKOSCI

1. **MANIFEST.md to jedyne trwale zrodlo prawdy** — przy dlugich pipeline'ach kontekst sie kompresuje. MANIFEST.md przetrwa. ZAWSZE czytaj go na poczatku kazdej fazy.
2. **ZAWSZE aktualizuj MANIFEST.md** po kazdej fazie i bramie uzywajac Edit tool
3. **Subagentow uruchamiaj rownolegle** gdzie to mozliwe (run_in_background: true, wiele Agent calls w jednej wiadomosci)
4. **Kazdy subagent dostaje WASKI kontekst** — tylko swoje pytanie + potrzebne fakty z MANIFEST, nie caly plik
5. **Statusy wyswietlaj czesto** — user musi widziec postep ("Faza 2/6...", "Czekam na 3/4 subagentow...", "Brama 1: czekam na Twoja decyzje")
6. **Pliki bram sa TRWALE** — nigdy ich nie usuwaj, to archiwalny record decyzji
7. **Rekomendacja nie oznacza decyzji** — ZAWSZE czekaj na odpowiedz uzytkownika na bramie
8. **Jezyk: polski** — caly output, nazwy plikow, komentarze po polsku
9. **Nie generuj kodu w Fazie 1-3** — najpierw research i decyzje, potem implementacja
10. **Anty-rubber-stamp:**
    - Randomizuj kolejnosc opcji A/B/C przy kazdej bramie — rekomendowana NIE zawsze jako "A"
    - Jesli user 3x z rzedu wybiera rekomendowana: wyswietl "Zauwazam ze wybierasz rekomendowane opcje bez deep dive. Pipeline dziala najlepiej gdy bramki sa prawdziwymi momentami refleksji. Czy chcesz przeczytac pelna analize?"
    - W pliku bramy oznacz ktora opcja jest rekomendowana, ale umieszczaj ja losowo jako A, B lub C
11. **Model routing:** Research = haiku, Debate/Build/QA = sonnet. Nigdy nie ustawiaj model: "opus" na subagentach — za drogi.

---

## AWARYJNE

- **Subagent nie zwraca wyniku:** Jesli po 2 minutach brak odpowiedzi — pomin go, zanotuj w MANIFEST.md "Agent [X] nie zwrocil wyniku", kontynuuj z tym co masz
- **User chce przerwac:** Zapisz aktualny stan w MANIFEST.md z notatka "PRZERWANY na Fazie N, mozna wznowic od Bramy [ostatnia]"
- **Temat zbyt prosty:** Jesli po Fazie 1 widac ze temat nie wymaga 6 faz — zaproponuj uzytkownikowi skrocony pipeline (3 fazy: Strategia → Build → QA, 1 brama)
- **Kontekst sie zapelnia:** Przeczytaj MANIFEST.md i kontynuuj — plik ma wszystko co potrzebne. To jest twój backup gdy kompresja kontekstu usunie wczesniejsze fazy.
- **Wznowienie pipeline:** Jesli user chce wznowic przerwany pipeline — przeczytaj MANIFEST.md, znajdz ostatnia zakonczona faze/brame, kontynuuj od nastepnego kroku

---

Rozpocznij pipeline. Temat: $ARGUMENTS
