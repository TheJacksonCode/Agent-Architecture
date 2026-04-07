# PRESETY TIER 1 -- MINIMAL (2-3 Agentow)
## Kompletny Przewodnik Edukacyjny | Gold Standard 2026

**Seria:** Architektura Agentow AI -- Presety i Konfiguracje
**Tier:** 1 (MINIMAL)
**Zakres:** 5 presetow: Solo + Walidator, Szybka Naprawa, Recon Squad, Classic Trio, Reflective Loop
**Agentow:** od 2 do 3
**Koszt:** $0.04 -- $0.35 za zadanie
**Tokeny:** ~40K -- 200K za sesje
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Filozofia Minimalizmu

### Dlaczego male zespoly dzialaja?

Wyobraz sobie, ze chcesz powiesc polke na scianie. Masz dwie opcje: wezwac ekipe
remontowa -- kierownika, pomocnika, inspektora, logistyka i elektryka -- albo po
prostu wziac wiertarke i polke, i zamontowac ja sam (albo z jedna osoba, ktora
przytrzyma poziomice). Odpowiedz jest oczywista.

W architekturze multi-agent AI obowiazuje dokladnie ta sama zasada. **Nie kazde
zadanie wymaga armii agentow.** Wiekszosc codziennej pracy programistycznej --
bugfixy, proste CRUD-y, skrypty automatyzacji, patche bezpieczenstwa -- moze byc
wykonana przez 2-3 specjalistow z zerowym narzutem koordynacyjnym.

Tier 1 MINIMAL to fundament calej piramidy presetow. To piec konfiguracji, ktore
pokrywaja **ponad 60% typowych zadan** w projektach software'owych. Zanim
siegniesz po zespol 5, 8 czy 14 agentow -- upewnij sie, ze naprawde potrzebujesz
takiej zlozonosci.

### Regula 45% -- Fundament Filozofii

Analiza tysiecy zadan w realnych projektach programistycznych ujawnila interesujacy
rozklad:

| Zlozonosc zadania | Procent zadan | Minimalny preset |
|-------------------|---------------|------------------|
| Proste (S) -- rozwiazanie znane, 1 builder | **~45%** | Solo + Walidator |
| Srednie z QA -- wymaga testowania | **~25%** | Szybka Naprawa |
| Srednie z research -- niejasna technologia | **~15%** | Recon Squad |
| Srednie full-stack -- BE + FE + testy | **~10%** | Classic Trio |
| Zlezone -- wiele warstw, planowanie | **~5%** | Tier 2+ |

**Prawie polowa zadan nie wymaga wiecej niz 2 agentow.** 70% zadan miesci sie
w zakresie Tier 1. Uzycie presetu 14-agentowego do naprawienia bledu walidacji
formularza to jak wynajmowanie helikoptera do dostarczenia pizzy.

> **Czy wiesz, ze...?**
> Google Research odkryl efekt "diminishing returns" w systemach multi-agent --
> po pewnym progu dodawanie agentow NIE poprawia jakosci, a wrecz ja pogarsza
> przez szum komunikacyjny. Dla prostych zadan ten prog wynosi zaledwie 2 agentow.
> Dla srednich -- 3. Wiecej != lepiej.

### Kiedy NIE uzywac Tier 1?

Tier 1 to potezne narzedzie, ale ma jasne granice. **Nie uzywaj** presetow
minimalnych, gdy:

- Zadanie wymaga **wielu domen jednoczesnie** (backend + frontend + design + security)
- Potrzebna jest **faza planowania** z dekompozycja i harmonogramem
- Wymagany jest **audyt bezpieczenstwa** (brak QA Security w Tier 1)
- Projekt wymaga **wielu zrodel researchowych** (wiecej niz 1 researcher)
- Zadanie jest **XL lub wieksze** -- zbyt zlozone dla jednego buildera

Koszt eskalacji z Tier 1 do Tier 2 jest **zawsze nizszy** niz koszt wielokrotnych
nieudanych iteracji w zbyt malym zespole. Jesli po 3 iteracjach Solo nie daje
wyniku -- eskaluj, nie powtarzaj.

### Zlozonosc komunikacyjna -- dlaczego mniej = lepiej

Wzor na maksymalna liczbe kanalow komunikacyjnych: **n(n-1)/2**

| Preset | Agentow | Potencjalne kanaly | Ryzyko chaosu |
|--------|---------|-------------------|---------------|
| Solo | 2 | 1 | Zerowe |
| Quick Fix / Recon / Trio / Reflect | 3 | 3 | Minimalne |
| Bug Hunter | 4 | 6 | Niskie |
| Startup MVP | 5 | 10 | Srednie |
| Feature Sprint | 7 | 21 | Wysokie |
| Full Gold Standard | 14 | 91 | Krytyczne |

Przy 2-3 agentach komunikacja jest **transparentna** -- kazdy agent wie, z kim
rozmawia, nie ma zaginionych wiadomosci, nie ma deadlockow, nie ma race conditions.

---

## 2. Przeglad 5 Presetow Tier 1

### Tabela Porownawcza

| Parametr | Solo + Walidator | Szybka Naprawa | Recon Squad | Classic Trio | Reflective Loop |
|----------|-----------------|----------------|-------------|-------------|-----------------|
| **ID** | `solo` | `quick_fix` | `recon` | `trio` | `reflect` |
| **Agentow** | 2 | 3 | 3 | 3 | 3 |
| **Sklad** | Orkiestrator + Backend | Orkiestrator + Backend + QA | Orkiestrator + Researcher + Backend | Backend + Frontend + QA | Researcher + Analityk + Critic |
| **Wzorzec** | Direct Delegation | Fix-Test Loop | Hub-and-Spoke (mini) | Triangle (peer-to-peer) | Elastic Reflective Trio |
| **Orkiestrator?** | Tak | Tak | Tak | **NIE** | **NIE** |
| **Tokeny** | ~40-80K | ~80-120K | ~80-120K | ~120-180K | ~100-200K |
| **Koszt** | $0.04-0.15 | $0.08-0.20 | $0.08-0.20 | $0.10-0.30 | $0.08-0.35 |
| **Latencja** | <30s | ~60-120s | ~90-180s | ~60-120s | ~120-300s |
| **Use case** | Bugi, refactoring, skrypty | Bugfixy, hotfixy, patche | POC, spike, wykonalnosc | Full-stack CRUD, REST+UI | Gleboki research, due diligence |
| **Sila** | Szybkosc, koszt minimalny | Petla zwrotna, jakosc | Research przed kodem | Naturalny BE/FE split | Samokorekcja, eliminacja bias |
| **Slabosc** | Brak QA, brak researchu | 1 builder, brak researchu | 1 zrodlo, brak QA | Brak planera, brak researchu | Brak implementacji, ryzyko petli |

### Ktory preset produkuje KOD?

- **Solo**: TAK -- Backend Dev pisze kod
- **Quick Fix**: TAK -- Backend Dev naprawia i testuje
- **Recon**: TAK -- Backend Dev tworzy POC (minimalny)
- **Classic Trio**: TAK -- Backend + Frontend buduja pelny feature
- **Reflective Loop**: **NIE** -- produkuje ANALIZE, nie kod

To fundamentalne rozroznienie. Cztery z pieciu presetow Tier 1 koncza sie
dzialajacym kodem. Reflective Loop konczy sie **raportem analitycznym** -- to
narzedzie mysli, nie budowania.

---

## 3. Preset #01: Solo + Walidator

### Metadane

| Parametr | Wartosc |
|----------|---------|
| **ID** | `solo` |
| **Nazwa** | Solo + Walidator |
| **Tier** | 1 (MINIMAL) |
| **Agentow** | 2 |
| **Wzorzec** | Direct Delegation |
| **Tokeny** | ~40-80K |
| **Koszt** | $0.04-0.15 |
| **Latencja** | <30 sekund |

### Filozofia -- "Mistrz i Uczen"

Wyobraz sobie warsztat stolarski. Mistrz (Orkiestrator) przyjmuje zamowienie,
analizuje co zrobic, wydaje instrukcje uczniowi (Backend Dev). Uczen wykonuje
prace. Gotowy produkt wraca do Mistrza. Mistrz oglada, sprawdza spoiny.
Jesli OK -- zatwierdza. Jesli nie -- wskazuje co poprawic.

Bez komitetow, bez narad, bez dodatkowych specjalistow. Jest mistrz, uczen
i zadanie. **Najprostsza konfiguracja, ktora jeszcze waliduje wynik.**

### Sklad Zespolu

**Agent A-00: Orkiestrator**
- Model: Claude Opus ($15/$75 za 1M tokenow)
- Load: 50/100
- Warstwa: STRATEGIA
- Narzedzia: Agent (delegacja), Read, Grep, Glob
- Tokeny/sesje: ~15-30K
- Rola: analiza zadania, tworzenie instrukcji, delegacja, walidacja PASS/FAIL

**Agent B-01: Backend Dev**
- Model: Claude Sonnet ($3/$15 za 1M tokenow)
- Load: 75/100
- Warstwa: BUILD
- Narzedzia: Write, Edit, Bash, Read, Grep, Glob
- Tokeny/sesje: ~25-50K
- Rola: implementacja, testy, error handling, zwrot artefaktu

### Diagram Architektury

```
+=====================================================+
|              PRESET: SOLO + WALIDATOR                |
|              Tier 1 -- MINIMAL                       |
+=====================================================+
|                                                     |
|    +------------------+     +------------------+    |
|    |   ORKIESTRATOR   |     |   BACKEND DEV    |    |
|    |     (A-00)       |     |     (B-01)       |    |
|    |  Opus | Load 50  |     | Sonnet | Load 75 |    |
|    |  STRATEGIA       |     |  BUILD           |    |
|    +--------+---------+     +--------+---------+    |
|             |   1. instrukcja        |              |
|             +----------------------->|              |
|             |   2. artefakt (kod)    |              |
|             |<-----------------------+              |
|             |   3. feedback (FAIL)   |              |
|             +----------------------->|              |
+=====================================================+
|  Polaczenie: dwukierunkowe (typ: "two")             |
|  Zlozonosc: O(2) -- absolutne minimum               |
+=====================================================+
```

### Workflow (8 krokow)

1. **Uzytkownik** wysyla zadanie do Orkiestratora
2. **Orkiestrator** analizuje zlozonosc (S/M?) i weryfikuje: czy Solo wystarczy?
3. **Orkiestrator** tworzy precyzyjna instrukcje (Narrow Context Principle)
4. **Orkiestrator** deleguje do Backend Dev -- jedno wywolanie
5. **Backend Dev** implementuje: logika + testy + error handling
6. **Backend Dev** zwraca artefakt (kod + testy)
7. **Orkiestrator** waliduje: poprawnosc, testy, zgodnosc ze specyfikacja
8. **Decyzja**: PASS (dostarczenie) lub FAIL (feedback + iteracja, max 3x)

### Dlaczego 2 agentow jest lepsze niz 1?

| Aspekt | Single Agent | Solo (2 agentow) |
|--------|-------------|-------------------|
| Strategia | Ten sam model | Opus (najlepszy) |
| Implementacja | Ten sam model | Sonnet (optymalny) |
| Walidacja | Brak (self-review) | Niezalezna |
| Kontekst | Wszystko w 1 oknie | Rozdzielony |
| Koszt | Opus za wszystko ($$$) | Opus+Sonnet ($$) |
| Halucynacje | Wyzsze ryzyko | Nizsze (cross-check) |

Kluczowa zasada: **specjalizacja modelowa**. Opus jest drogi, ale doskonaly
w rozumowaniu strategicznym. Sonnet jest tanszy i swietny w implementacji.
Uzycie Opusa do pisania kodu to marnowanie budzetu. Uzycie Sonneta do
strategii to ryzyko blednych decyzji.

### Use Cases -- KIEDY uzywac Solo

**ZIELONE SWIATLO (uzywaj smialo):**
- Bugfix z jasna przyczyna (np. off-by-one, null check)
- Refactoring jednej klasy/modulu
- Skrypt automatyzacji (Bash, Python, CI/CD)
- Zmiana konfiguracji (env, Docker, nginx)
- Proste CRUD (1 model, 1 controller)
- Dodanie middleware/walidacji
- Update zaleznosci z testami

**ZOLTE SWIATLO (rozwaz, ale ostroznie):**
- Bug w 2+ plikach (moze wystarczy, jesli w jednej domenie)
- Maly endpoint API + prosty test
- Migracja bazy danych (prosta)

**CZERWONE SWIATLO (NIE uzywaj):**
- Zadanie multi-domain (backend + frontend)
- Kod security-critical (brak QA Security)
- Zadanie wymagajace researchu technologicznego
- Feature > 200 linii kodu
- Cokolwiek wymagajace planowania architektonicznego

### Anti-patterny Solo

1. **"Solo do wszystkiego"** -- uzywanie Solo do zadania, ktore wymaga QA. Wynik: bledy w produkcji.
2. **"Nieskonczone iteracje"** -- 5+ rund FAIL bez eskalacji. Jesli 3 iteracje nie daly wyniku, problem jest zbyt zlozony dla Solo.
3. **"Brak walidacji"** -- pominiecie kroku 7 (Orkiestrator waliduje). Wtedy Solo staje sie gorszym single agentem.
4. **"Context overload"** -- wrzucenie calego repozytorium do kontekstu zamiast Narrow Context.

### Kiedy eskalowac z Solo?

**Sygnaly eskalacji:**
- 3 iteracje FAIL bez poprawy
- Bug okazuje sie wielodomenowy
- Potrzebna zmiana w 5+ plikach
- Brak pewnosci co do rozwiazania (potrzeba researchu)

**Sciezki eskalacji:**
- Solo -> **Quick Fix** (dodaj QA do petli)
- Solo -> **Recon Squad** (dodaj research)
- Solo -> **Classic Trio** (dodaj frontend)

---

## 4. Preset #02: Szybka Naprawa (Quick Fix)

### Metadane

| Parametr | Wartosc |
|----------|---------|
| **ID** | `quick_fix` |
| **Nazwa** | Szybka Naprawa |
| **Tier** | 1 (MINIMAL) |
| **Agentow** | 3 |
| **Wzorzec** | Fix-Test Loop |
| **Tokeny** | ~80-120K |
| **Koszt** | $0.08-0.20 |
| **Latencja** | ~60-120 sekund |

### Filozofia -- "Mechanik i Kontroler Jakosci"

Wyobraz sobie serwis samochodowy. Klient przywozi auto z dziwnym dzwiekiem przy
hamowaniu. Kierownik serwisu (Orkiestrator) przyjmuje zlecenie. Mechanik (Backend
Dev) diagnozuje -- zuzyty klocek -- wymienia. Ale zanim auto wroci do klienta,
kontroler jakosci (QA Quality) robi jazde probna. Sprawdza: czy dzwiek zniknal?
Czy hamowanie plynne? Czy inne elementy nie ucierpialy?

Jesli kontroler znajdzie problem -- auto wraca do mechanika. **I tak w kolko, az
kontroler podpisze: "PASS -- pojazd bezpieczny."** Samochod nie opuszcza serwisu,
dopoki kontroler nie zaakceptuje naprawy.

To jest istota **Fix-Test Loop** -- ciagle petla naprawcza z niezaleznym audytorem.

### Czym sie rozni od Solo?

| Aspekt | Solo | Quick Fix |
|--------|------|-----------|
| QA | Orkiestrator sam waliduje | Niezalezny QA Quality |
| Petla | Max 3 iteracje, reczna | Continuous -- ciagle, automatyczna |
| Jakosc | Dobra (1 perspektywa) | Wysoka (2 perspektywy) |
| Koszt | $0.04-0.15 | $0.08-0.20 |
| Czas | <30s | ~60-120s |
| Kiedy | Proste bugi | Bugi wymagajace weryfikacji |

Kluczowa roznica: w Solo Orkiestrator pelni PODWOJNA role -- stratega i audytora.
W Quick Fix te role sa ROZDZIELONE. QA Quality to **niezalezny weryfikator**,
ktory nie pisze kodu -- testuje i raportuje.

### Sklad Zespolu

**Agent A-00: Orkiestrator**
- Model: Claude Opus
- Load: 50/100
- Warstwa: STRATEGIA
- Narzedzia: Agent (delegacja), Read, Write
- Tokeny/sesje: ~20-30K
- Rola: przyjmuje raport o bledzie, tworzy instrukcje, monitoruje petla Fix-Test

**Agent B-01: Backend Dev**
- Model: Claude Sonnet
- Load: 75/100
- Warstwa: BUILD
- Narzedzia: Write, Edit, Bash, Read
- Tokeny/sesje: ~30-50K
- Rola: diagnoza root cause, implementacja fixa, testy regresji

**Agent Q-02: QA Quality**
- Model: Claude Haiku ($0.80/$4 za 1M tokenow)
- Load: 55/100
- Warstwa: QA/AUDYT
- Narzedzia: Read, Grep, Bash (testy, lintery)
- Tokeny/sesje: ~20-30K
- Rola: uruchamia testy, sprawdza edge cases, raport PASS/FAIL

### Diagram Architektury

```
+=====================================================+
|            PRESET: SZYBKA NAPRAWA                    |
|            Tier 1 -- Fix-Test Loop                   |
+=====================================================+
|                                                     |
|    +-------------------+                            |
|    |  ORKIESTRATOR      |                            |
|    |  A-00 | Opus       |                            |
|    |  Load: 50          |                            |
|    +--------+----------+                            |
|             |                                       |
|             | [one] delegacja                        |
|             v                                       |
|    +-------------------+         +----------------+ |
|    |  BACKEND DEV       |  [one]  |  QA QUALITY    | |
|    |  B-01 | Sonnet     | ------> |  Q-02 | Haiku  | |
|    |  Load: 75          | artefakt|  Load: 55      | |
|    +-------------------+         +--------+------+ |
|             ^                             |        |
|             |      [continuous]           |        |
|             +--------  FAIL  <------------+        |
|                                                     |
+=====================================================+
|  Polaczenia: Ork->BE (one), BE->QA (one),           |
|              QA->Ork (continuous -- FAIL/PASS)       |
+=====================================================+
```

### Workflow -- Petla Fix-Test

1. **Uzytkownik** zglasza bug do Orkiestratora
2. **Orkiestrator** analizuje raport, tworzy instrukcje naprawy (Narrow Context: TYLKO kod z bugiem)
3. **Orkiestrator** deleguje do Backend Dev
4. **Backend Dev** diagnozuje root cause, implementuje fix, pisze test regresji
5. **Backend Dev** przekazuje artefakt do QA Quality
6. **QA Quality** uruchamia testy: suite, edge cases, regresja
7. **QA Quality** generuje raport: PASS lub FAIL z konkretnymi uwagami
8. **Jesli FAIL**: artefakt wraca do Backend Dev z feedbackiem QA (krok 4)
9. **Jesli PASS**: QA raportuje do Orkiestratora -> dostarczenie
10. **Max 3-4 iteracje** -- jesli nadal FAIL, eskalacja do wiekszego presetu

> **Czy wiesz, ze...?**
> W systemach multi-agentowych petle zwrotne (feedback loops) redukuja liczbe
> defektow o **60-80%** w porownaniu z jednorazowym wykonaniem. Google wykazal,
> ze iteracyjne podejscie przewyzsza jednorazowe o +80.9% w zadaniach
> rownolegych. Kazda iteracja Fix-Test to nie porazka -- to poprawa jakosci.

### Typ polaczenia "continuous" -- co to znaczy?

Polaczenie miedzy QA a Orkiestratorem jest typu `continuous`. W odroznieniu od
`one` (jednorazowe przekazanie), `continuous` oznacza, ze QA **raportuje az do
pelnego PASS**. To jak monitor zycia na sali operacyjnej -- nie sprawdza raz,
ale monitoruje ciagle.

### Use Cases -- KIEDY uzywac Quick Fix

**ZIELONE SWIATLO:**
- Bugfix z niejasna przyczyna (wymaga diagnostyki)
- Hotfix produkcyjny (musi dzialac za pierwszym razem)
- Patch bezpieczenstwa (wymaga weryfikacji regresji)
- Fix integracyjny (API nie odpowiada poprawnie)
- Naprawa testu, ktory zaczal fail-owac

**CZERWONE SWIATLO:**
- Nowy feature (to nie naprawa -- uzyj Plan & Execute lub Classic Trio)
- Zadanie wymagajace researchu (brak Researchera -- uzyj Recon)
- Zadanie multi-domain (1 builder nie wystarczy -- uzyj Classic Trio lub wyzej)

### Anti-patterny Quick Fix

1. **"Quick Fix do nowych feature'ow"** -- brak fazy planowania i researchu. Feature wymaga architektury, nie petli naprawczej.
2. **"Ignorowanie raportu QA"** -- Builder poprawia losowo zamiast adresowac konkretne uwagi. Wynik: nieskonczone iteracje.
3. **"QA jako formalnosc"** -- QA przepuszcza wszystko jako PASS. Wynik: falszywe poczucie bezpieczenstwa.

---

## 5. Preset #03: Recon Squad

### Metadane

| Parametr | Wartosc |
|----------|---------|
| **ID** | `recon` |
| **Nazwa** | Recon Squad |
| **Tier** | 1 (MINIMAL) |
| **Agentow** | 3 |
| **Wzorzec** | Hub-and-Spoke (mini) |
| **Tokeny** | ~80-120K |
| **Koszt** | $0.08-0.20 |
| **Latencja** | ~90-180 sekund |

### Filozofia -- "Zwiad Przed Misja"

Przed kazda operacja wojskowa dowodca wysyla zwiadowcow. Ich zadanie: sprawdzic
teren, zidentyfikowac zagrozenia, znalezc najlepsza droge. Dopiero na podstawie
raportu zwiadowczego glowne sily ruszaja do akcji.

W programowaniu **kodowanie na slepo** -- bez badania dokumentacji, benchmarkow,
alternatyw -- to odpowiednik ataku bez zwiadu. Moze sie udac. Ale znacznie czesciej
konczy sie kosztownym refaktoringiem, gdy okazuje sie, ze wybrana biblioteka ma
znany bug, ze istnieje lepsze API, albo ze inna architektura bylaby 10x wydajniejsza.

Recon Squad formalizuje zasade: **DIAGNOZA zanim LECZENIE. ZWIAD zanim ATAK.
BADANIE zanim BUDOWA.**

### Roznica kluczowa: research PRZED implementacja

| Aspekt | Solo / Quick Fix | Recon Squad |
|--------|-----------------|-------------|
| Research | Brak | Researcher Tech bada opcje |
| Decyzja technologiczna | Orkiestrator lub Builder | Na podstawie raportu |
| Ryzyko "blind building" | Wysokie | Minimalne |
| Koszt nieznanego | Potencjalnie bardzo wysoki | Zredukowany |
| Kiedy | Rozwiazanie ZNANE | Rozwiazanie NIEZNANE |

### Sklad Zespolu

**Agent A-00: Orkiestrator**
- Model: Claude Opus
- Load: 50/100
- Warstwa: STRATEGIA
- Narzedzia: Agent, Read
- Tokeny/sesje: ~20-30K
- Rola: definiuje pytania badawcze, koordynuje fazy (SEKWENCYJNIE: research -> build), ewaluacja GO/NO-GO

**Agent R-01: Researcher Tech**
- Model: Claude Haiku ($0.80/$4 za 1M tokenow)
- Load: 55/100
- Warstwa: RESEARCH
- Narzedzia: WebSearch, WebFetch, Read, Grep, Glob
- Tokeny/sesje: ~20-30K
- Rola: wyszukiwanie opcji, porownanie min. 3 alternatyw, raport z pros/cons

**Agent B-01: Backend Dev**
- Model: Claude Sonnet
- Load: 75/100
- Warstwa: BUILD
- Narzedzia: Read, Write, Edit, Bash, Grep, Glob
- Tokeny/sesje: ~30-50K
- Rola: budowa POC (Proof of Concept) na podstawie raportu Researchera

### Diagram Architektury

```
+=====================================================+
|            PRESET: RECON SQUAD                       |
|            Tier 1 -- Hub-and-Spoke (mini)            |
+=====================================================+
|                                                     |
|              +-------------------+                  |
|              |   ORKIESTRATOR    |                  |
|              |   A-00 | Opus    |                  |
|              |   Load: 50       |                  |
|              +----+--------+---+                  |
|                   |        |                        |
|           [one]   |        |  [one]                 |
|                   v        v                        |
|    +----------------+  +----------------+           |
|    | RESEARCHER TECH|  |  BACKEND DEV   |           |
|    | R-01 | Haiku   |  |  B-01 | Sonnet |           |
|    | Load: 55       |  |  Load: 75      |           |
|    +-------+--------+  +--------+-------+           |
|            |                     ^                   |
|            |  [one] raport       |                   |
|            +-------------------->|                   |
|                                                     |
+=====================================================+
|  Fazy: 1. Research  2. Build  (SEKWENCYJNIE)        |
|  Raport Researchera zasila Buildera                  |
+=====================================================+
```

### Workflow -- Research -> Build

1. **Uzytkownik** opisuje problem technologiczny (np. "Jaki ORM wybrac do naszego projektu?")
2. **Orkiestrator** definiuje pytania badawcze: wymagania, kryteria porownania, ograniczenia
3. **Orkiestrator** deleguje do Researcher Tech -- pytania + kontekst projektu
4. **Researcher Tech** przeszukuje dokumentacje, benchmarki, blogi, repozytoria
5. **Researcher Tech** produkuje raport: TOP 3-5 opcji z pros/cons, benchmarkami, ryzykami
6. **Orkiestrator** ewaluuje raport -- czy kompletny? Czy wystarczajacy do decyzji?
7. **Orkiestrator** deleguje do Backend Dev -- raport + instrukcja budowy POC
8. **Backend Dev** tworzy Proof of Concept na podstawie rekomendacji #1 z raportu
9. **Orkiestrator** ewaluuje POC -- dziala? Spenia kryteria? GO/NO-GO

**WAZNE:** Fazy sa SEKWENCYJNE. Researcher KONCZY zanim Builder ZACZYNA. To
swiadomy wybor -- Builder potrzebuje raportu, nie moze dzialac rownolegle.

> **Czy wiesz, ze...?**
> Zespoly stosujace faze badawcza przed implementacja notuja **40-60% mniej
> refaktoringu**. Koszt godziny researchu zwraca sie 10-krotnie w oszczedzonych
> godzinach poprawek.

### Use Cases -- KIEDY uzywac Recon

**ZIELONE SWIATLO:**
- POC (Proof of Concept) nowej technologii
- Spike techniczny -- "czy da sie to zrobic?"
- Badanie wykonalnosci (feasibility study)
- Wybor biblioteki/frameworka (3+ opcje do porownania)
- Prototyp integracji z zewnetrznym API

**CZERWONE SWIATLO:**
- Technologia juz zdecydowana (research niepotrzebny -- uzyj Solo lub Quick Fix)
- Pelny feature produkcyjny (POC to nie produkcja -- eskaluj do Startup MVP)
- Zadanie wymagajace QA (brak audytora -- dodaj Quick Fix lub Bug Hunter)

### Anti-patterny Recon

1. **"Research bez pytania"** -- Researcher przeszukuje wszystko bez fokusa. Wynik: raport 50-stronicowy, ktory nic nie mowi.
2. **"Build bez czytania raportu"** -- Builder ignoruje raport i buduje na czuja. Wynik: caly research na marne.
3. **"Recon do znanych technologii"** -- uzywanie Recon, gdy stack jest juz zdecydowany. Narzut: ~$0.04 niepotrzebnego researchu.

---

## 6. Preset #04: Classic Trio

### Metadane

| Parametr | Wartosc |
|----------|---------|
| **ID** | `trio` |
| **Nazwa** | Classic Trio |
| **Tier** | 1 (MINIMAL) |
| **Agentow** | 3 |
| **Wzorzec** | Triangle (peer-to-peer) |
| **Tokeny** | ~120-180K |
| **Koszt** | $0.10-0.30 |
| **Latencja** | ~60-120 sekund |

### Filozofia -- "Zespol z Reddit: BE + FE + QA"

Na forach programistycznych -- Reddit, Hacker News, Dev.to -- od lat trwa debata:
jaki jest **minimalny zespol do budowy pelnego feature'a full-stack?** Odpowiedz,
ktora powraca konsekwentnie: **Backend Developer + Frontend Developer + QA Tester.**

Dlaczego? Bo podzial backend/frontend to **najbardziej naturalny podzial** w web
development. Backend pisze API, modele danych, logike biznesowa. Frontend pisze
komponenty UI, formularze, state management. QA testuje integracje obu warstw.
Zadna z tych rol nie duplikuje drugiej. Kazda ma **wlasny, rozlaczny zakres
odpowiedzialnosci**.

Analogia: restauracja. Szef kuchni (Backend) przygotowuje dania -- smak, jakos,
proporcje. Kelner (Frontend) serwuje -- prezentacja, interakcja z klientem,
doswiadczenie. Inspektor sanitarny (QA) sprawdza -- czystosc, temperatura,
standardy. Trzy role, zero duplikacji, pelen serwis.

### Unikalna cecha: BRAK Orkiestratora

Classic Trio jest **jedynym presetem Tier 1 bez Orkiestratora** (obok Reflective
Loop). To nie blad -- to **swiadomy wybor architektoniczny**.

| Aspekt | Z Orkiestratorem | Classic Trio (bez) |
|--------|-----------------|-------------------|
| Koordynacja | Centralna (hub) | Peer-to-peer |
| Overhead | ~15-30K tokenow na Opus | Zero |
| Elastycznosc | Wysoka (Opus decyduje) | Niska (ustalony flow) |
| Koszt | Wyzszy (Opus drogi) | Nizszy (3x Sonnet/Haiku) |
| Kiedy lepszy | Niejasne zadania | Dobrze zdefiniowane feature'y |

W Classic Trio agenci komunikuja sie **bezposrednio miedzy soba** -- Backend
mowi Frontend "Oto endpointy i kontrakty API", Frontend mowi QA "Oto komponent
do przetestowania", QA mowi Backend "Ten endpoint zwraca 500 przy pustym body."
Nie ma posrednika. To dziala, bo zadanie jest **dostatecznie proste**, zeby nie
wymagac centralnego koordynatora.

### Sklad Zespolu

**Agent B-01: Backend Dev**
- Model: Claude Sonnet ($3/$15 za 1M tokenow)
- Load: 75/100
- Warstwa: BUILD
- Narzedzia: Write, Edit, Bash, Read, Grep, Glob
- Tokeny/sesje: ~40-60K
- Rola: API endpoints, modele danych, logika biznesowa, walidacja

**Agent F-01: Frontend Dev**
- Model: Claude Sonnet ($3/$15 za 1M tokenow)
- Load: 70/100
- Warstwa: BUILD
- Narzedzia: Write, Edit, Bash, Read
- Tokeny/sesje: ~40-60K
- Rola: komponenty UI, formularze, state management, mobile-first, accessibility

**Agent Q-02: QA Quality**
- Model: Claude Haiku ($0.80/$4 za 1M tokenow)
- Load: 55/100
- Warstwa: QA/AUDYT
- Narzedzia: Read, Grep, Bash
- Tokeny/sesje: ~30-50K
- Rola: testy integracyjne, edge cases, regresja, raport PASS/FAIL

### Diagram Architektury

```
+=====================================================+
|            PRESET: CLASSIC TRIO                      |
|            Tier 1 -- Triangle (peer-to-peer)         |
+=====================================================+
|                                                     |
|    +----------------+    [two]    +----------------+ |
|    |  BACKEND DEV   | <--------> | FRONTEND DEV   | |
|    |  B-01 | Sonnet |  kontrakty |  F-01 | Sonnet | |
|    |  Load: 75      |   API      |  Load: 70      | |
|    +-------+--------+            +--------+-------+ |
|            |                              |         |
|            | [one] artefakt BE   artefakt FE [one]  |
|            |                              |         |
|            v                              v         |
|            +------- +----------------+ ---+         |
|                     |   QA QUALITY   |              |
|                     |  Q-02 | Haiku  |              |
|                     |  Load: 55      |              |
|                     +----------------+              |
|                                                     |
+=====================================================+
|  Topologia: Trojkat -- BE<->FE (two), BE->QA (one), |
|             FE->QA (one)                             |
+=====================================================+
```

### Workflow -- Triangle

1. **Uzytkownik** opisuje feature full-stack (np. "Dodaj formularz rejestracji z walidacja i API")
2. **Backend Dev** projektuje i implementuje:
   - Endpoint REST (np. POST /api/users)
   - Model danych (User schema)
   - Walidacja server-side
   - Testy jednostkowe backendu
3. **Backend Dev** przekazuje Frontend Dev **kontrakty API** (endpointy, payload, response)
4. **Frontend Dev** implementuje:
   - Komponent formularza (React/Vue/Svelte)
   - Walidacja client-side
   - Obsluga stanow (loading, error, success)
   - Accessibility (ARIA, keyboard nav)
5. **Frontend Dev** synchronizuje z Backend Dev (BE<->FE, polaczenie dwukierunkowe)
6. **QA Quality** otrzymuje oba artefakty i testuje:
   - Integracja BE+FE (czy formularz poprawnie komunikuje sie z API?)
   - Edge cases (puste pola, specjalne znaki, duplikaty)
   - Regresja (czy istniejace funkcje nadal dzialaja?)
7. **QA Quality** generuje raport PASS/FAIL
8. **Jesli FAIL**: konkretne uwagi wracaja do odpowiedniego agenta (BE lub FE)

### Kontrakty API -- Kluczowy Mechanizm

Serce Classic Trio to **kontrakty API** -- uzgodniony format komunikacji miedzy
Backend i Frontend. Backend definiuje endpointy, typy danych, kody odpowiedzi.
Frontend konsumuje te kontrakty. QA weryfikuje zgodnosc.

```
Przyklad kontraktu API:

POST /api/users
Request:  { "name": string, "email": string, "password": string }
Response: { "id": number, "name": string, "token": string }
Errors:   400 (walidacja), 409 (email exists), 500 (server error)
```

Bez kontraktow Backend moze zwracac `user_name`, a Frontend oczekiwac `name`.
Kontrakt eliminuje takie **rozbieznosci interfejsowe**.

> **Czy wiesz, ze...?**
> Brak Orkiestratora w Classic Trio to nie ograniczenie -- to **optymalizacja**.
> Dla dobrze zdefiniowanych feature'ow peer-to-peer jest efektywniejszy niz
> koordynacja centralna. Orkiestrator wnosi narzut ~15-30K tokenow Opus -- jesli
> zadanie jest jasne, ten narzut jest niepotrzebny.

### Use Cases -- KIEDY uzywac Classic Trio

**ZIELONE SWIATLO:**
- CRUD (Create-Read-Update-Delete) z interfejsem uzytkownika
- REST API + formularz/dashboard
- Landing page z dynamiczna trescia (API + UI)
- Feature pelnostackowy w istniejacym projekcie (np. dodaj "koszyk zakupowy")
- Prosty SPA (Single Page Application) z backendem

**CZERWONE SWIATLO:**
- Zadanie TYLKO backendowe (nie potrzebujesz Frontend -- uzyj Solo lub Quick Fix)
- Zadanie TYLKO frontendowe (nie potrzebujesz Backend -- uzyj Solo)
- Wymagajace planowania architektonicznego (brak Planera/Analityka)
- Wymagajace researchu (brak Researchera)
- Zlozone logiki wymagajace koordynacji centralnej (brak Orkiestratora)

### Anti-patterny Classic Trio

1. **"Trio do backendu"** -- uzywanie 3 agentow, gdy zadanie jest czysto backendowe. Narzut: Frontend bezczynny, koszt +$0.05-0.10.
2. **"Bez kontraktow"** -- Backend i Frontend buduja niezaleznie bez uzgodnienia interfejsu. Wynik: integracja sie rozsypuje.
3. **"QA na koncu"** -- QA dostaje artefakty dopiero po 100% implementacji. Lepiej: iteracyjne przekazywanie.
4. **"Zlozone problemy bez koordynatora"** -- Trio jest peer-to-peer. Jesli zadanie wymaga centralnych decyzji, brak Orkiestratora to problem.

---

## 7. Preset #05: Reflective Loop

### Metadane

| Parametr | Wartosc |
|----------|---------|
| **ID** | `reflect` |
| **Nazwa** | Reflective Loop |
| **Tier** | 1 (MINIMAL) |
| **Agentow** | 3 |
| **Wzorzec** | Elastic Reflective Trio |
| **Tokeny** | ~100-200K |
| **Koszt** | $0.08-0.35 |
| **Latencja** | ~120-300 sekund |

### Filozofia -- "Recenzja Naukowa z Diablem Adwokatem"

W swiecie akademickim kazda publikacja naukowa przechodzi przez peer review.
Naukowiec (Researcher) zbiera dane i formoluje hipoteze. Recenzent (Analityk)
interpretuje wyniki -- czy wnioski wynikaja z danych? A potem pojawia sie
**diabel adwokat** (Research Critic) -- osoba, ktorej jedynym zadaniem jest
znalezc slabosci, sprzecznosci i luki w argumentacji.

Ten trojstopniowy proces -- zbieranie -> interpretacja -> krytyka -- to
**potezny mechanizm eliminacji bledow poznawczych** (cognitive biases). Ludzie
(i modele AI) naturalnie sklanaja sie ku **confirmation bias** -- szukaniu
potwierdzenia swoich tez zamiast ich obalenia. Research Critic to antidotum:
agent, ktorego JEDYNYM celem jest podwazanie.

Reflective Loop jest **jedynym presetem Tier 1, ktory NIE produkuje kodu.**
Jego wynikiem jest **analiza, raport, rekomendacja** -- nigdy implementacja.

### Elastic Pattern -- co to znaczy?

Wzorzec "Elastic" oznacza, ze petla **nie ma stalej liczby iteracji**. Zamiast
tego Research Critic ocenia jakosc analizy na skali 1-10. Jesli score < 6/10,
analiza wraca do Researchera na poprawke. Jesli >= 6/10, analiza przechodzi.

To jak **gumka** -- rozciaga sie tyle, ile potrzeba. Prosta analiza moze przejsc
w 1 iteracji. Zlozona moze wymagac 3-4 rund, zanim Critic bedzie usatysfakcjonowany.
Stad nazwa: Elastic.

### Sklad Zespolu

**Agent R-01: Researcher Tech**
- Model: Claude Haiku ($0.80/$4 za 1M tokenow)
- Load: 55/100
- Warstwa: RESEARCH
- Narzedzia: WebSearch, WebFetch, Read, Grep, Glob
- Tokeny/sesje: ~30-60K
- Rola: zbieranie danych, wyszukiwanie zrodel, tworzenie raportu surowego

**Agent A-02: Analityk**
- Model: Claude Sonnet ($3/$15 za 1M tokenow)
- Load: 55/100
- Warstwa: PLANOWANIE/ANALIZA
- Narzedzia: Read, Write
- Tokeny/sesje: ~30-60K
- Rola: interpretacja danych, synteza, wnioski, identyfikacja wzorcow

**Agent RC-01: Research Critic**
- Model: Claude Sonnet ($3/$15 za 1M tokenow)
- Load: 85/100
- Warstwa: QA/AUDYT
- Narzedzia: Read
- Tokeny/sesje: ~30-60K
- Rola: walidacja, szukanie sprzecznosci, bias, luk. Score 1-10. Decyzja: PASS (>=6) lub REWIZJA (<6)

**Uwaga:** Load Research Critica to **85/100** -- najwyzszy w Tier 1. To celowe.
Critic musi byc **wymagajacy i surowy**. Niski load oznaczalby Critica, ktory
przepuszcza wszystko -- a to anuluje caly sens petli refleksyjnej.

### Diagram Architektury

```
+=====================================================+
|            PRESET: REFLECTIVE LOOP                   |
|            Tier 1 -- Elastic Reflective Trio         |
+=====================================================+
|                                                     |
|    +-------------------+                            |
|    | RESEARCHER TECH   |                            |
|    | R-01 | Haiku      |                            |
|    | Load: 55          |                            |
|    +--------+----------+                            |
|             |                                       |
|             | [one] surowe dane                      |
|             v                                       |
|    +-------------------+                            |
|    |    ANALITYK       |                            |
|    |  A-02 | Sonnet    |                            |
|    |  Load: 55         |                            |
|    +--------+----------+                            |
|             |                                       |
|             | [one] interpretacja + wnioski          |
|             v                                       |
|    +-------------------+                            |
|    | RESEARCH CRITIC   |                            |
|    | RC-01 | Sonnet    |                            |
|    | Load: 85          |                            |
|    +--------+----------+                            |
|             |                                       |
|             | Score >= 6/10? --> PASS (dostarczenie) |
|             | Score < 6/10?  --> [continuous] REWIZJA|
|             |                         |             |
|             +-------------------------+             |
|             |  powrot do Researchera                |
|             v                                       |
|    (Researcher zbiera brakujace dane,               |
|     Analityk poprawia interpretacje,                |
|     Critic ponownie ocenia)                         |
|                                                     |
+=====================================================+
|  Polaczenia: R->A (one), A->RC (one),               |
|              RC->R (continuous -- score < 6/10)      |
+=====================================================+
```

### Workflow -- Petla Refleksyjna

1. **Uzytkownik** zadaje pytanie badawcze (np. "Jakie sa ryzyka migracji z MongoDB na PostgreSQL?")
2. **Researcher Tech** przeszukuje zrodla: dokumentacja, benchmarki, case studies, blogi
3. **Researcher Tech** produkuje **surowy raport**: fakty, cytaty, statystyki, URLe zrodlowe
4. **Analityk** otrzymuje surowy raport i **interpretuje**:
   - Jakie wzorce wynikaja z danych?
   - Jakie wnioski mozna wyciagnac?
   - Jakie sa trade-offy?
   - Co rekomendowac?
5. **Analityk** produkuje **analize z wnioskami i rekomendacjami**
6. **Research Critic** otrzymuje analize i **krytykuje**:
   - Czy wnioski wynikaja z danych? (logiczna spojnosc)
   - Czy nie pominieto alternatywnych interpretacji? (confirmation bias)
   - Czy zrodla sa wiarygodne? (docs > blog > tweet)
   - Czy pokryto wszystkie aspekty pytania? (kompletnosc)
7. **Research Critic** przyznaje score w 5 kategoriach:
   - Completeness (kompletnosc)
   - Accuracy (dokladnosc)
   - Relevance (trafnosc)
   - Freshness (aktualnosc)
   - Actionability (przydatnosc praktyczna)
8. **Jesli sredni score >= 6/10**: PASS -- analiza dostarczana uzytkownikowi
9. **Jesli sredni score < 6/10**: REWIZJA -- Critic wskazuje konkretne braki, Researcher uzupelnia dane, Analityk poprawia interpretacje, Critic ocenia ponownie

### "Adversarial Collaboration" -- dlaczego krytyka poprawia jakosc?

Psychologia poznawcza zna zjawisko **confirmation bias** -- tendencje do szukania
informacji potwierdzajacych nasza teze i ignorowania sprzecznych. Modele AI
dziedzicza te tendencje z danych treningowych.

Research Critic to **wbudowany mechanizm anty-biasowy**. Jego jedynym zadaniem
jest podwazanie -- "A co jesli jest inaczej?", "Jakie dane przeczylby temu
wnioskowi?", "Czy to nie jest wishful thinking?". Ta technika, znana jako
**adversarial collaboration**, jest stosowana w najlepszych osrodkach badawczych.

> **Czy wiesz, ze...?**
> W systemie Anthropic Multi-Agent, dodanie agenta-krytyka do zespolu
> badawczego poprawilo jakosc raportow o **25-40%** mierzono metrykami
> kompletnosci i dokladnosci. Koszt dodatkowy: ~$0.03-0.05 za sesje.
> Stosunek korzysc/koszt: ~8:1.

### Use Cases -- KIEDY uzywac Reflective Loop

**ZIELONE SWIATLO:**
- Gleboki research technologiczny (porownanie architektur, frameworkow)
- Due diligence (ocena ryzyka przed decyzja)
- Analiza rynkowa / competitive intelligence
- Eliminacja bias w raportach
- Ewaluacja opcji strategicznych (build vs buy, monorepo vs polyrepo)
- Audyt dokumentacji / weryfikacja claimow

**CZERWONE SWIATLO:**
- Implementacja kodu (Reflective Loop produkuje TEKST, nie KOD)
- Proste pytania z jednoznaczna odpowiedzia (narzut petli nieoplacalny)
- Zadania wymagajace szybkiej odpowiedzi (<30s) -- petla trwa 2-5 minut
- Zadania, gdzie decyzja jest juz podjeta (research po fakcie to waste)

### Anti-patterny Reflective Loop

1. **"Reflect do kodowania"** -- uzywanie petli refleksyjnej do napisania kodu. Zero builderow w skladzie. Wynik: piekny raport, zero implementacji.
2. **"Nieskonczona petla"** -- Critic jest zbyt surowy (score zawsze <6/10). Petla kreci sie w nieskonczonosc. Rozwiazanie: max 3-4 iteracje, potem wymuszony PASS z adnotacja o brakach.
3. **"Miekki Critic"** -- Critic z niskim load przepuszcza wszystko. Wynik: analiza bez weryfikacji -- rownowazna single agentowi.
4. **"Research bez pytania"** -- Researcher zbiera dane bez jasno zdefiniowanego pytania badawczego. Wynik: szum informacyjny.

---

## 8. Drzewo Decyzyjne -- Ktory Preset Wybrac?

Ponizszy flowchart pomoze Ci wybrac odpowiedni preset w mniej niz 30 sekund:

```
START: Masz zadanie do wykonania
  |
  v
Czy wymagasz IMPLEMENTACJI (kodu)?
  |
  +-- NIE --> Czy wymaga glebiokiej analizy?
  |             |
  |             +-- TAK --> REFLECTIVE LOOP (#05)
  |             |
  |             +-- NIE --> To nie jest zadanie dla multi-agent
  |
  +-- TAK --> Czy zadanie wymaga FRONTENDU?
                |
                +-- TAK --> CLASSIC TRIO (#04)
                |
                +-- NIE --> Czy wiesz JAK to zrobic?
                              |
                              +-- TAK --> Czy to NAPRAWA bugu?
                              |            |
                              |            +-- TAK --> Czy wymaga NIEZALEZNEGO QA?
                              |            |            |
                              |            |            +-- TAK --> SZYBKA NAPRAWA (#02)
                              |            |            |
                              |            |            +-- NIE --> SOLO (#01)
                              |            |
                              |            +-- NIE --> SOLO (#01)
                              |
                              +-- NIE --> RECON SQUAD (#03)
```

### Reguly kciuka (szybki wybor)

| Pytanie | Odpowiedz | Preset |
|---------|-----------|--------|
| "Napraw tego buga, wiem co jest zle" | Proste, znane | **Solo** |
| "Napraw tego buga i upewnij sie ze dziala" | Naprawa + weryfikacja | **Quick Fix** |
| "Nie wiem jaka technologie wybrac" | Nieznane, potrzeba researchu | **Recon** |
| "Zrob formularz z API" | Full-stack, BE+FE | **Classic Trio** |
| "Przeanalizuj opcje i daj rekomendacje" | Research, analiza, brak kodu | **Reflective Loop** |

---

## 9. Porownanie Kosztow i Wydajnosci

### Koszt za typowe zadanie

```
KOSZT ($)     $0.00   $0.10   $0.20   $0.30   $0.40
              |-------|-------|-------|-------|
Solo          |####   |       |       |       |  $0.04-0.15
Quick Fix     |  #####|##     |       |       |  $0.08-0.20
Recon         |  #####|##     |       |       |  $0.08-0.20
Classic Trio  |    ###|######|#      |       |  $0.10-0.30
Reflect       |  #####|######|######|#      |  $0.08-0.35
```

### Zuzycie tokenow

```
TOKENY (K)    0K      50K     100K    150K    200K
              |-------|-------|-------|-------|
Solo          |####   |       |       |       |  ~40-80K
Quick Fix     |  #####|###    |       |       |  ~80-120K
Recon         |  #####|###    |       |       |  ~80-120K
Classic Trio  |    ###|######|###    |       |  ~120-180K
Reflect       |   ####|######|######|##     |  ~100-200K
```

### Latencja (czas do wyniku)

| Preset | Latencja | Dlaczego? |
|--------|----------|-----------|
| Solo | <30s | 1 delegacja, 1 walidacja |
| Quick Fix | ~60-120s | Petla Fix-Test, 1-3 iteracje |
| Recon | ~90-180s | Sekwencja: research POTEM build |
| Classic Trio | ~60-120s | Rownolegle BE/FE, potem QA |
| Reflective Loop | ~120-300s | Petla elastyczna, moze krecic sie 2-4 razy |

### Stosunek koszt / jakosc

| Preset | Koszt wzgledny | Jakosc wzgledna | Efektywnosc |
|--------|---------------|-----------------|-------------|
| Solo | Najnizszy (1x) | Dobra (7/10) | Najwyzsza |
| Quick Fix | Niski (2x) | Wysoka (8/10) | Bardzo wysoka |
| Recon | Niski (2x) | Dobra (7/10, ale swiadoma) | Wysoka |
| Classic Trio | Sredni (3x) | Wysoka (8.5/10) | Dobra |
| Reflective Loop | Zmienny (2-4x) | Bardzo wysoka (9/10) | Dobra (jesli potrzebna glebokosc) |

> **Czy wiesz, ze...?**
> Uzycie presetu Solo zamiast Full Gold Standard (14 agentow) dla prostego
> bugfixa oszczedza **~95% kosztow** i **~90% czasu**. $0.05 vs ~$1.00.
> 25 sekund vs ~5 minut. A jakosc wystarczajaca dla 45% zadan.

---

## 10. Eskalacja -- Kiedy Przejsc na Tier 2?

### 5 Sygnalow Eskalacji

1. **Wielokrotne niepowodzenia** -- 3+ iteracje bez poprawy. Preset jest zbyt maly.
2. **Wielodomenowosci** -- zadanie wymaga jednoczesnie backend + frontend + design + security.
3. **Potrzeba planowania** -- zadanie jest na tyle zlozone, ze wymaga Analityka i Planera.
4. **Wiele zrodel researchu** -- 1 Researcher nie wystarczy (potrzeba Reddit + GitHub + Docs).
5. **Wymagania bezpieczenstwa** -- brak QA Security w Tier 1 (poza Bug Hunter w Tier 2).

### Mapa Eskalacji

```
TIER 1 MINIMAL (2-3)           TIER 2 SMALL (4-5)
========================        ========================
Solo + Walidator --------+----> Bug Hunter (4) -- dodaj 2x QA
                         |
Quick Fix ---------------+----> Plan & Execute (4) -- dodaj planowanie
                         |
Recon Squad -------------+----> Startup MVP (5) -- dodaj analityke + QA
                         |
Classic Trio ------------+----> Feature Sprint (7) -- dodaj research + planowanie
                         |
Reflective Loop ---------+----> Research Belt (9) -- dodaj 5 researcherow
```

### Koszt eskalacji vs koszt porazki

| Scenariusz | Koszt | Czas |
|-----------|-------|------|
| Solo dziala za 1 razem | $0.05 | 25s |
| Solo fail 3x, potem eskalacja do Quick Fix | $0.15 + $0.15 = $0.30 | 90s + 90s = 3min |
| Solo fail 5x (brak eskalacji) | $0.15 * 5 = $0.75 | 5x25s = 2min (ale BEZ wyniku!) |

**Wniosek:** Wczesna eskalacja po 3 niepowodzeniach jest TANSZA niz uparte
powtarzanie. Regula: **"3 strikes and escalate"**.

---

## 11. Quick Reference Cards

### KARTA #01: Solo + Walidator

```
+-----------------------------------------------+
|  SOLO + WALIDATOR          Tier 1 | 2 agentow |
+-----------------------------------------------+
|  Orkiestrator (Opus) + Backend Dev (Sonnet)    |
|  Wzorzec: Direct Delegation                    |
|  Tokeny: ~40-80K | Koszt: $0.04-0.15 | <30s   |
|  USE: Bugi, refactoring, skrypty, config       |
|  NO:  Multi-domain, security, research         |
|  ESKALACJA: Quick Fix, Recon, Classic Trio     |
+-----------------------------------------------+
```

### KARTA #02: Szybka Naprawa

```
+-----------------------------------------------+
|  SZYBKA NAPRAWA            Tier 1 | 3 agentow |
+-----------------------------------------------+
|  Orkiestrator + Backend Dev + QA Quality       |
|  Wzorzec: Fix-Test Loop (continuous)           |
|  Tokeny: ~80-120K | Koszt: $0.08-0.20 | ~90s  |
|  USE: Bugfixy, hotfixy, patche, regresje       |
|  NO:  Nowe feature, research, multi-domain     |
|  ESKALACJA: Bug Hunter, Plan & Execute         |
+-----------------------------------------------+
```

### KARTA #03: Recon Squad

```
+-----------------------------------------------+
|  RECON SQUAD               Tier 1 | 3 agentow |
+-----------------------------------------------+
|  Orkiestrator + Researcher Tech + Backend Dev  |
|  Wzorzec: Hub-and-Spoke (mini, sekwencyjny)    |
|  Tokeny: ~80-120K | Koszt: $0.08-0.20 | ~120s |
|  USE: POC, spike, feasibility, wybor techno    |
|  NO:  Znana technologia, produkcja, QA         |
|  ESKALACJA: Startup MVP, Research Belt         |
+-----------------------------------------------+
```

### KARTA #04: Classic Trio

```
+-----------------------------------------------+
|  CLASSIC TRIO              Tier 1 | 3 agentow |
+-----------------------------------------------+
|  Backend Dev + Frontend Dev + QA Quality       |
|  Wzorzec: Triangle (peer-to-peer, BEZ Ork.)   |
|  Tokeny: ~120-180K | Koszt: $0.10-0.30 | ~90s |
|  USE: CRUD, REST+UI, full-stack feature        |
|  NO:  Backend-only, research, planowanie       |
|  ESKALACJA: Feature Sprint, UI Overhaul        |
+-----------------------------------------------+
```

### KARTA #05: Reflective Loop

```
+-----------------------------------------------+
|  REFLECTIVE LOOP           Tier 1 | 3 agentow |
+-----------------------------------------------+
|  Researcher Tech + Analityk + Research Critic  |
|  Wzorzec: Elastic Reflective Trio              |
|  Tokeny: ~100-200K | Koszt: $0.08-0.35 | ~3min|
|  USE: Deep research, due diligence, analiza    |
|  NO:  Implementacja kodu, proste pytania       |
|  ESKALACJA: Research Belt (9 agentow)          |
+-----------------------------------------------+
```

---

## 12. Slowniczek

| Termin | Definicja |
|--------|-----------|
| **Direct Delegation** | Wzorzec, w ktorym Orkiestrator deleguje calosc jednemu workerowi. Najprostszy mozliwy pattern. |
| **Fix-Test Loop** | Petla ciagle, w ktorej Builder naprawia -> QA testuje -> FAIL -> powrot. Az do PASS. |
| **Hub-and-Spoke** | Topologia gwiazdowa -- centralny wezel (hub) komunikuje sie z wieloma agentami (spokes). |
| **Triangle** | Topologia trojkata -- 3 agentow komunikuje sie peer-to-peer, bez centralnego wezla. |
| **Elastic Pattern** | Wzorzec z dynamiczna liczba iteracji, kontrolowana przez score/prog jakosci. |
| **Narrow Context Principle** | Zasada: kazdy agent dostaje TYLKO informacje potrzebne do swojego zadania. Mniej danych = mniej halucynacji. |
| **Regula 45%** | Obserwacja, ze ~45% zadan programistycznych moze byc wykonanych przez 2 agentow. |
| **PASS/FAIL** | Binarny wynik walidacji: PASS = akceptacja, FAIL = powrot do poprawki. |
| **Continuous** | Typ polaczenia, w ktorym agent raportuje ciagle az do spenienia warunku (np. PASS). |
| **POC (Proof of Concept)** | Minimalny prototyp demonstrujacy wykonalnosc rozwiazania. Nie jest kodem produkcyjnym. |
| **Spike** | Krotki eksperyment techniczny majacy odpowiedziec na pytanie "Czy da sie?". |
| **Confirmation Bias** | Tendencja do szukania informacji potwierdzajacych teze i ignorowania sprzecznych. |
| **Adversarial Collaboration** | Technika, w ktorej jeden uczestnik celowo podwaza wnioski, zeby poprawic jakosc analizy. |
| **Load** | Parametr 0-100 okreslajacy "surowosci" agenta. Wysoki load = bardziej wymagajacy, dokladniejszy, ale druzszy. |
| **Tier** | Poziom zlozonosci presetu: Tier 1 (2-3 agentow), Tier 2 (4-5), Tier 3 (6-8), Tier 4 (9-12), Tier 5 (13+). |
| **Kontrakty API** | Uzgodniony format komunikacji miedzy Backend i Frontend: endpointy, typy danych, kody bledow. |
| **GO/NO-GO** | Brama decyzyjna: czy kontynuowac do kolejnej fazy (GO) czy powtorzyc obecna (NO-GO). |

---

## 13. Zrodla

1. Anthropic — "Building Effective Agents" (2024) — multi-agent patterns, Orchestrator-Workers
2. Anthropic — "Multi-Agent Research System" — Opus 4 + Sonnet 4 podagenci, +90.2% vs single agent
3. Google Research — "Scaling Laws for Multi-Agent Systems" — diminishing returns, optimal team size
4. Google — "Agent2Agent Protocol" — parallel task execution, +80.9% improvement
5. Regula 45% — analiza empiryczna zadan w projektach programistycznych (Gold Standard 2026)
6. Reddit, Hacker News, Dev.to — dyskusje o optymalnym skladzie zespolu (BE+FE+QA pattern)
7. Microsoft Research — "AutoGen: Multi-Agent Conversation Framework" — reflective patterns
8. OpenAI — "Swarm" — lightweight multi-agent orchestration, handoff patterns
9. LangChain — "LangGraph: Multi-Agent Workflows" — elastic loops, conditional routing
10. Gold Standard 2026 — Agent Architecture Designer — referencyjne konfiguracje presetow

---

# PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

```
Stworz prezentacje wideo (16:9, 5-7 minut) o 5 presetach Tier 1 MINIMAL
z architektury Gold Standard 2026 multi-agent AI. Prezentacja obejmuje
wszystkie presety: Solo + Walidator, Szybka Naprawa, Recon Squad,
Classic Trio i Reflective Loop.

HOOK OTWIERAJACY (pierwsze 10 sekund):
"70% zadan programistycznych wymaga maksymalnie 3 agentow."
Duzy numer "70%" z efektem electric glow na ciemnym tle.
Animacja: 14 agentow → zoom out → 70% z nich zanikaja,
zostaja 2-3 podswietlone na zolto.
Tytul: "TIER 1 MINIMAL — Mniej Znaczy Wiecej"

MOTYW WIZUALNY:
- Kolor glowny: Electric Yellow (#EAB308)
- Tlo: ciemny grafit (#1F2937) z subtelnymi liniami siatki (blueprint)
- Kolor sekundary: ciepla biel (#FAFAF9)
- Akcent pozytywny: emerald (#10B981) -- dla PASS, zielonych swiatel
- Akcent negatywny: rose (#EF4444) -- dla FAIL, czerwonych swiatel
- Akcent neutralny: slate (#94A3B8) -- dla porownawczych szarosci
- Motyw graficzny: piec ikon presetow w rzedzie, jak panele sterowania
- Efekty: szybkie przejscia slide-in, electric sparks miedzy agentami
- Font: Inter Bold / Poppins SemiBold, duze numbery (120px), male opisy (24px)
- Animacje polaczen: swiecace linie miedzy agentami, pulsujace nodes

STRUKTURA SLAJDOW:

1. INTRO — FILOZOFIA MINIMALIZMU (0:00-0:40)
   - Hook "70%" z electric glow, glitch effect
   - "Regula 45%": animowany pie chart — 45% zolty, reszta szara
   - Statystyka: "Solo pokrywa 45%, Quick Fix 25%, Recon 15%..."
   - Formula: n(n-1)/2 → tabela zlozonosci komunikacyjnej
   - Animacja: 2 agentow = 1 kanal (proste), 14 = 91 (chaos)
   - Tlo: siatka z delikatnymi liniami, ciemny grafit

2. PRZEGLAD PIECIU PRESETOW (0:40-1:30)
   - 5 kart preset w jednym rzedzie, kazda z ikona, nazwa, liczba agentow
   - Karty wjezdzaja jedna po drugiej z lewej (stagger animation 0.1s)
   - Pod kazdym badge'em: wzorzec architektoniczny
   - Porownawcza tabela: tokeny, koszt, latencja, use case
   - Highlight po kolei — kazda karta "zasweca sie" na 2s
   - Dolny pasek: gradient od Solo ($0.04) do Reflect ($0.35)

3. SOLO + WALIDATOR — Deep Dive (1:30-2:30)
   - Animacja: 2 wezly (Orkiestrator, Backend Dev) laczy swiecaca linia
   - Ikona blyskawicy miedzy nimi
   - Workflow w 8 krokach — timeline od lewej do prawej
   - Split-screen analogia: Mistrz w warsztacie (lewa) | AI (prawa)
   - Metryki w lewym dolnym rogu: $0.05, 25s, 60K tokenow
   - "Regula 45%" — donut chart z animacja fill
   - Anti-pattern flash: "Solo do multi-domain" z czerwonym X
   - Sygnalizacja swietlna: 3 kolumny zielony/zolty/czerwony

4. SZYBKA NAPRAWA — Deep Dive (2:30-3:30)
   - 3 wezly w pionowej linii: Orkiestrator → Backend → QA
   - Animacja petli: strzalka FAIL wraca z QA do Backendu — pulsuje na czerwono
   - Strzalka PASS idzie z QA do gory — sweci na zielono
   - Petla kreci sie 2-3 razy w animacji, za kazdym razem szybciej
   - Analogia: serwis samochodowy — mechanik + kontroler
   - Porownanie: Solo (1 perspektywa) vs Quick Fix (2 perspektywy)
   - Stat: "60-80% redukcja defektow dzieki feedback loop"
   - Typ polaczenia "continuous" — wyjasnienie z animacja pulsujacego linka

5. RECON SQUAD — Deep Dive (3:30-4:15)
   - 3 wezly w trojkacie: Orkiestrator na gorze, Researcher i Builder na dole
   - SEKWENCYJNOSC podkreslona: Researcher sweci PIERWSZY, Builder czeka (szary)
   - Potem Researcher gasnie, Builder zasweca (zolty)
   - Raport "przelewa sie" z Researchera do Buildera (animacja dokumentu)
   - Analogia: zwiad wojskowy → raport → atak
   - Stat: "40-60% mniej refaktoringu gdy research PRZED kodem"
   - Anti-pattern: "Build without Read" — czerwony X

6. CLASSIC TRIO — Deep Dive (4:15-5:00)
   - 3 wezly w trojkacie: Backend i Frontend na gorze, QA na dole
   - BRAK ORKIESTRATORA — podkreslone: przekreslony wezel orkiestratora
   - Dwukierunkowa strzalka BE <-> FE: "Kontrakty API"
   - Strzalki BE->QA i FE->QA: "artefakty do testow"
   - Analogia: szef kuchni + kelner + inspektor sanitarny
   - Stat: "Reddit golden team — najczesciej rekomendowana konfiguracja"
   - Mini-demo: formularz rejestracji — BE endpoint + FE komponent + QA test

7. REFLECTIVE LOOP — Deep Dive (5:00-5:50)
   - 3 wezly w pionie: Researcher → Analityk → Critic
   - Animator: "score <6/10" → strzalka REWIZJA wraca do gory (czerwona)
   - "score >=6/10" → strzalka PASS na dol (zielona)
   - Petla kreci sie 1-3 razy z progressbar score: 4/10 → 5/10 → 7/10 → PASS
   - UWAGA: "ZERO KODU" — duzy badge czerwony, pulsujacy
   - Analogia: peer review naukowy + diabel adwokat
   - Stat: "25-40% poprawa jakosci raportow dzieki Critic"
   - Load Critica 85/100 — wizualizacja bar chart "surowosci"

8. DRZEWO DECYZYJNE (5:50-6:20)
   - Animowany flowchart — uzytkownik "klika" decyzje
   - 4 pytania, 5 sciezek, kazda konczy na jednym z 5 presetow
   - Podswietlenie wybranej sciezki na zolto
   - Tabelka "reguly kciuka" — 5 pytan, 5 odpowiedzi

9. POROWNANIE I ESKALACJA (6:20-6:50)
   - Horizontal bar chart: koszt 5 presetow (od Solo do Reflect)
   - Drugie bar chart: latencja
   - Mapa eskalacji: strzalki z Tier 1 do Tier 2 (animacja "upgrade")
   - "3 strikes and escalate" — regula z animacja trzech X-ow

10. OUTRO (6:50-7:00)
    - "Prostota to nie ograniczenie — to supermoc."
    - 5 ikon presetow zasweca sie po kolei
    - CTA: "Poznaj Tier 2 — Bug Hunter, Plan & Execute, Startup MVP"
    - Koncowe logo: "Gold Standard 2026"

MUZYKA: Upbeat electronic, 120-140 BPM, soft bass drop przy "70%" hook,
energy build przy kazdym deep dive, spokojniejszy ambient przy drzewie decyzyjnym
NARRATOR: Pewny, energiczny glos, pauzy przy kluczowych liczbach,
wolniejsze tempo przy tlumaczeniu wzorcow, szybsze przy use cases
PRZEJSCIA: Slide-in z lewej (nowy temat), fade (kontynuacja),
electric spark (zmiana presetu), zoom-in (deep dive)
```

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Stworz pionowa infografike (1080x4000px) o 5 presetach Tier 1 MINIMAL
z architektury Gold Standard 2026 multi-agent AI. Jeden dokument
porownujacy wszystkie presety: Solo + Walidator, Szybka Naprawa,
Recon Squad, Classic Trio i Reflective Loop.

STYL WIZUALNY:
- Tlo: ciemny grafit (#1F2937) z subtylna siatka hexagonalna
- Kolor glowny: Electric Yellow (#EAB308)
- Kolor sekundary: ciepla biel (#FAFAF9) na tekst
- Akcent pozytywny: emerald (#10B981) -- PASS, zalety
- Akcent negatywny: rose (#EF4444) -- FAIL, ograniczenia
- Akcent neutralny: slate (#475569) -- tla kart, separatory
- Font naglowkow: bold sans-serif (Inter, Poppins) 48-72px
- Font body: regular sans-serif 18-24px
- Font danych: monospace (JetBrains Mono) 16-20px
- Separatory: cienka zolta linia (#EAB308) z glow (blur 8px)
- Ikony: minimalistyczne outline, zolte na ciemnym tle
- Karty: tlo #374151, border-radius 16px, border 1px #EAB308
- Numeracja sekcji: duzy numer (120px, opacity 0.15) w tle + maly (24px) na przedzie

SEKCJA 1: HERO HEADER (300px)
- Tytul: "TIER 1 — MINIMAL" w Electric Yellow, font 72px, glow effect
- Podtytul: "5 Presetow dla 70% Zadan" font 28px, bialy
- 5 ikon presetow w rzedzie: blyskawica | klucz | lupa | trojkat | petla
- Kazda ikona w kolku 60px, tlo #374151, border zolty
- Pod ikonami: nazwy presetow, font 14px, uppercase
- Badge'e na gorze: "2-3 Agentow" | "Gold Standard 2026" | "$0.04-$0.35"
- Tlo sekcji: gradient radialny od srodka (#EAB308 opacity 0.05) → ciemny

SEKCJA 2: REGULA 45% (250px)
- Donut chart (200px srednica) centralnie:
  45% Electric Yellow ("SOLO"), 25% emerald ("QA"), 15% cyan ("RESEARCH"),
  10% purple ("FULL-STACK"), 5% szary ("COMPLEX")
- Obok chartu: "Prawie polowa zadan = 2 agentow"
- Pod spodem: "Solo + Quick Fix + Recon + Trio = 95% Tier 1"
- Formola n(n-1)/2 z mini-tabela: 2→1, 3→3, 5→10, 14→91

SEKCJA 3: TABELA POROWNAWCZA (400px)
- Tabela 6 kolumn (Parametr + 5 presetow) x 10 wierszy
- Naglowki: ikona + nazwa presetu, zolte tlo
- Wiersze: Agentow, Sklad, Wzorzec, Orkiestrator?, Tokeny, Koszt,
  Latencja, Use case, Sila, Slabosc
- Kolorystyka: zielony dla zalet, czerwony dla ograniczen
- Cell padding: 12px, border: 1px #475569, font 16px

SEKCJA 4: KARTA — SOLO + WALIDATOR (350px)
- Lewa kolumna (50%): diagram 2 wezlow, strzalka dwukierunkowa
  Orkiestrator (zolty okrag) <-> Backend Dev (niebieski okrag)
  Etykiety: "instrukcja" / "artefakt" / "feedback"
- Prawa kolumna (50%): karta agentow:
  * A-00: Opus, Load 50, STRATEGIA
  * B-01: Sonnet, Load 75, BUILD
  Pod spodem: mini-timeline 8 krokow w jednej linii
- Dol karty: sygnalizacja swietlna — 3 kolumny (UZYWAJ | ROZWAZ | NIE UZYWAJ)
  z 3-4 punktami w kazdej
- Badge: "~40-80K | $0.04-0.15 | <30s"

SEKCJA 5: KARTA — SZYBKA NAPRAWA (350px)
- Centralny diagram: 3 wezly w pionie (Ork → BE → QA)
  Strzalka FAIL z QA do BE (czerwona, zakrzywiona)
  Strzalka PASS z QA do gory (zielona)
  Etykieta na FAIL: "continuous loop"
- Prawa kolumna: karty 3 agentow (Opus, Sonnet, Haiku) ze statystykami
- Dol: porownanie Solo vs Quick Fix w 2 kolumnach
- Badge: "~80-120K | $0.08-0.20 | ~90s"
- Stat highlight: "60-80% redukcja defektow"

SEKCJA 6: KARTA — RECON SQUAD (350px)
- Diagram: Orkiestrator na gorze → dwoch agentow na dole (Researcher, Builder)
  SEKWENCJA zaznaczona: Researcher = "FAZA 1", Builder = "FAZA 2"
  Strzalka raportu z Researchera do Buildera (przerywana linia)
- Prawa kolumna: karty 3 agentow
- Dol: "Research PRZED Build" — podkreslone, duzy font
- Badge: "~80-120K | $0.08-0.20 | ~120s"
- Stat highlight: "40-60% mniej refaktoringu"

SEKCJA 7: KARTA — CLASSIC TRIO (350px)
- Diagram: trojkat — BE i FE na gorze, QA na dole
  BE <-> FE: dwukierunkowa strzalka "Kontrakty API"
  BE -> QA, FE -> QA: jednokierunkowe strzalki "artefakty"
  Przekreslona ikona Orkiestratora z adnotacja "peer-to-peer"
- Prawa kolumna: karty 3 agentow (2x Sonnet, 1x Haiku)
- Dol: "Reddit Golden Team: BE + FE + QA"
- Badge: "~120-180K | $0.10-0.30 | ~90s"
- Stat highlight: "Najwyzszy output kodu w Tier 1"

SEKCJA 8: KARTA — REFLECTIVE LOOP (350px)
- Diagram: 3 wezly w pionie (Researcher → Analityk → Critic)
  Strzalka REWIZJA z Critic do Researchera (czerwona, zakrzywiona)
  Strzalka PASS z Critic w dol (zielona)
  Score meter: 0-10 z progiem 6 zaznaczonym
- Prawa kolumna: karty 3 agentow
  Critic z wyroznionym Load 85/100 (czerwony bar, prawie pelny)
- Dol: "ZERO KODU — tylko analiza i raport" — duzy badge czerwony
- Badge: "~100-200K | $0.08-0.35 | ~3min"
- Stat highlight: "25-40% poprawa jakosci raportow"

SEKCJA 9: DRZEWO DECYZYJNE (350px)
- Flowchart od gory do dolu:
  START → "Potrzebujesz kodu?" → TAK/NIE
  TAK → "Potrzebujesz frontendu?" → TAK → CLASSIC TRIO
                                     NIE → "Wiesz jak?" → TAK → "Bug?" → Solo/QuickFix
                                                           NIE → RECON
  NIE → "Gleboka analiza?" → TAK → REFLECTIVE LOOP
- Kazdy wezel decyzyjny: romb (zolty border), kazdy preset: prostokatny (zielony)
- Strzalki: zolte linie z etykietami TAK/NIE

SEKCJA 10: POROWNANIE KOSZTOW (300px)
- 5 horizontal bar chartow:
  * Koszt ($): Solo najkrotszy → Reflect najdluzszy
  * Tokeny (K): Solo najkrotszy → Trio/Reflect najdluzsze
  * Latencja (s): Solo najkrotszy → Reflect najdluzszy
  * Jakosc (/10): Reflect najdluzszy → Solo najkrotszy
  * Efektywnosc: Solo najdluzszy → Reflect najkrotszy
- Bary w gradiencie: zolty (maly) → czerwony (duzy)
- Wartosci liczbowe na koncu kazdego bara

SEKCJA 11: MAPA ESKALACJI (250px)
- 5 kart Tier 1 z lewej → strzalki → 5 kart Tier 2 z prawej
  Solo → Bug Hunter
  Quick Fix → Plan & Execute
  Recon → Startup MVP
  Trio → Feature Sprint
  Reflect → Research Belt
- Strzalki: zolte, z ikonka "upgrade" (+agenty)
- Adnotacja: "3 strikes and escalate"

SEKCJA 12: STOPKA (100px)
- "Gold Standard 2026 | Tier 1 MINIMAL | 5 Presetow | 2-3 Agentow"
- Logo/watermark: Agent Architecture Designer
- Data: Kwiecien 2026

DEKORACJE:
- Hexagonalna siatka na tle (opacity 0.03)
- Electric glow na separatorach (yellow blur 8px)
- Delikatne gradient orbs (zolte, opacity 0.02) rozrzucone po tle
- Numeracja sekcji: "01 //", "02 //", itp. w duzym foncie (opacity 0.1)
- Micro-ikony jako bullet points zamiast standardowych punktow
- Zaokraglone rogi na wszystkich kartach (16px border-radius)
- Cien na kartach: 0 4px 20px rgba(0,0,0,0.3)
```

---

*Dokument wygenerowany dla systemu Gold Standard 2026 Multi-Agent AI Architecture.*
*Tier: 1 MINIMAL | 5 Presetow | 2-3 Agentow | $0.04-$0.35 za zadanie.*
