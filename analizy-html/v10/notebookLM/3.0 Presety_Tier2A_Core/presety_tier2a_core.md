# PRESETY TIER 2A -- CORE (4 Agentow)

## Kompletny Przewodnik Edukacyjny | Gold Standard 2026

**Seria:** Architektura Agentow AI -- Presety i Konfiguracje
**Tier:** 2A (CORE)
**Liczba agentow:** 4 w kazdym presecie
**Presety w tym dokumencie:** Bug Hunter, Content Pipeline, Plan & Execute, Performance Boost
**Koszt calkowity:** $0.08-$0.30 per task
**Tokeny calkowite:** ~100-200K per task
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Sila Czworki

Wyobraz sobie, ze organizujesz ekipe do pracy. Masz do wyboru: wysylasz jednego czlowieka, dwoch, trzech... albo czterech. Dlaczego czworo to magiczna liczba?

W Tier 1 (2-3 agentow) masz fundamenty: delegacja, feedback loop, moze jednego specjaliste. Ale brakuje Ci **glebokosci specjalizacji**. Solo (2 agenty) nie ma QA. Quick Fix (3 agenty) ma QA, ale nie ma researchu ani planowania. Recon (3 agenty) ma research, ale nie ma QA.

W Tier 2B-3 (5-14 agentow) masz pelna orkiestre, ale koszt komunikacji rosnie kwadratowo. 5 agentow = 10 mozliwych polaczen. 7 agentow = 21 polaczen. 14 agentow = 91 polaczen. Overhead koordynacji zjada zyski ze specjalizacji.

**Czworo agentow to sweet spot.** Dlaczego?

### Regula 4-agentowego optimum

1. **Wystarczajaco duzo na specjalizacje** -- mozesz miec Orkiestratora + 2 specjalistow + QA, albo Orkiestratora + 3 specjalistow w pipeline. Kazdy agent ma jasna, waska role.

2. **Wystarczajaco malo na niska komunikacje** -- 4 agenty = max 6 polaczen (w praktyce 3-4 aktywnych). Overhead koordynacji: 15-20% budzetu tokenowego. Przy 7 agentach: 30-40%.

3. **Optymalne ROI** -- Koszt $0.08-0.30 za zadanie, ktore w Tier 1 kosztowaloby $0.04-0.20, ale z 2-3x lepsza jakoscia (dual QA, planning, parallel research). Inwestujesz 50-100% wiecej, dostajesz 200-300% wiecej wartosci.

4. **Minimalna konfiguracja dla wzorcow zaawansowanych** -- Fork pattern (2 rownolegle galerie), Pipeline (3+ fazy sekwencyjne), Plan-and-Execute (planowanie + egzekucja), Measure-Fix Cycle (analiza + naprawa) -- wszystkie wymagaja minimum 4 agentow.

### Trzy analogie do zrozumienia Tier 2A

**Analogia 1: Zespol chirurgiczny**

W Tier 1 miales chirurga i pielegniarke (Solo) lub chirurga, pielegniarke i anestezjologa (Quick Fix). W Tier 2A dochodzi czwarty czlonek: **specjalista**. Moze to byc kardiolog, neurolog albo radiolog -- ktos, kto wnosi perspektywe, ktorej reszta zespolu nie ma. Cztery osoby na sali operacyjnej to standard w wiekszosci procedur. Mniej = ryzykowne. Wiecej = chaos koordynacyjny.

**Analogia 2: Kwartet muzyczny**

Kwartet smyczkowy -- dwoje skrzypiec, altowka, wiolonczela -- to najbardziej wyrazista formacja w muzyce kameralnej. Mniej instrumentow = za cienkie brzmienie. Wiecej = orkiestra, ktora potrzebuje dyrygenta. Kwartet gra BEZ dyrygenta -- kazdy slucha pozostalych trzech i reaguje. W Tier 2A Orkiestrator pelni subtelniejsza role niz w duzych zespolach -- jest raczej primus inter pares niz dowodca.

**Analogia 3: Maly startup (4 osoby)**

CEO (Orkiestrator), CTO (Builder), Tester (QA) i Researcher/Planner. Najskuteczniejsze startupy na poczatkowej fazie to 3-5 osob. Mniej -- brakuje kompetencji. Wiecej -- biurokracja. Tier 2A to architektoniczny odpowiednik garazu z czterema krzeslami.

> **Czy wiesz, ze...?**
> Badania nad zespolami programistycznymi (Brooks "Mythical Man-Month", Amazon "Two Pizza Rule")
> konsekwentnie wskazuja, ze male zespoly (3-5 osob) dostarczaja oprogramowanie szybciej
> niz duze zespoly (10+). W swiecie agentow AI ta prawidlowosc jest jeszcze silniejsza,
> bo overhead komunikacji miedzy agentami jest mierzalny w tokenach i dolarach.

> **Uwaga!**
> Tier 2A NIE zastepuje Tier 1. Jesli Twoje zadanie to prosty bugfix -- uzyj Quick Fix (3 agenty).
> Jesli to jednorazowa implementacja -- uzyj Solo (2 agenty). Tier 2A jest dla zadan, ktore
> WYMAGAJA specjalizacji: dual QA, planowanie, research wielozrodlowy lub cykl pomiaru/naprawy.
> Eskalacja do Tier 2A bez potrzeby to marnowanie tokenow.

---

## 2. Przeglad 4 Presetow -- Tabela Porownawcza

| Aspekt | Bug Hunter | Content Pipeline | Plan & Execute | Performance Boost |
|--------|-----------|-----------------|----------------|-------------------|
| **ID** | `bug_hunter` | `content_pipeline` | `plan_exec` | `perf_boost` |
| **Agentow** | 4 | 4 | 4 | 4 |
| **Wzorzec** | Fork (Dual QA) | Linear Pipeline | Plan-and-Execute Loop | Measure-Fix Cycle |
| **Specjalizacja** | Debugowanie, security | Dokumentacja, content | Migracje, refactoring | Optymalizacja, performance |
| **Orkiestrator** | A-00 (Opus) | A-00 (Opus) | A-00 (Opus) | A-00 (Opus) |
| **Agent 2** | B-01 Backend Dev | R-01 Researcher Forums | A-02 Analyst | A-02 Analyst |
| **Agent 3** | Q-01 QA Security | R-02 Researcher Tech | A-03 Planner | B-01 Backend Dev |
| **Agent 4** | Q-02 QA Quality | W-01 Writer | Q-02 QA Quality | Q-03 QA Performance |
| **Fazy** | Fix + Dual Audit | Research + Synth + Write | Plan + Execute + Verify | Measure + Fix + Verify |
| **Tokeny** | ~120-180K | ~100-180K | ~120-200K | ~100-160K |
| **Koszt** | $0.10-$0.28 | $0.08-$0.25 | $0.10-$0.30 | $0.08-$0.25 |
| **Latencja** | ~90-180s | ~120-240s | ~120-240s | ~90-180s |
| **Kiedy uzywac** | Bugi z implikacjami sec | Docs, README, raporty | Migracje, refactoring | API perf, Core Web Vitals |
| **Kiedy NIE** | Prosty bugfix | Kod, nie content | Proste taski | Funkcjonalnosc, nie perf |

### Diagram pozycjonowania

```
                    SPECJALIZACJA
                         |
    Content Pipeline     |     Plan & Execute
    (Docs, raporty)      |     (Migracje, refactoring)
                         |
  -------- SEKWENCYJNE --+-- ROWNOLEGLE --------
                         |
    Performance Boost    |     Bug Hunter
    (Optymalizacja)      |     (Security + Quality)
                         |
                    WERYFIKACJA
```

---

## 3. BUG HUNTER -- Podwojny Audyt Bezpieczenstwa

### Karta presetu

| Parametr | Wartosc |
|----------|---------|
| **ID** | `bug_hunter` |
| **Nazwa** | Bug Hunter (Lowca Bledow) |
| **Tier** | 2A (CORE) |
| **Agentow** | 4 |
| **Wzorzec** | Fork Pattern (Dual QA Parallel) |
| **Tokeny** | ~120-180K |
| **Koszt** | $0.10-$0.28 |
| **Latencja** | ~90-180 sekund |

### Czym jest Bug Hunter?

Przypomnij sobie preset Quick Fix (3 agenty): Backend Dev naprawia bug, QA Quality testuje, petla trwa az do PASS. Dobrze -- ale co, jesli bug ma **implikacje bezpieczenstwa**? Co, jesli null pointer exception to objaw glębszego problemu -- SQL injection, ktora jednoczesnie tworzy visible crash i invisible backdoor?

Quick Fix ma JEDNEGO audytora -- QA Quality. Sprawdza, czy bug naprawiony, czy testy przechodza, czy nie ma regresji. Ale QA Quality **nie mysli jak atakujacy**. Nie szuka SQL injection, XSS, path traversal, race conditions w kontekscie bezpieczenstwa. Do tego potrzebujesz **drugiego specjalisty** -- QA Security.

Bug Hunter to Quick Fix na sterydach: ten sam Builder (Backend Dev), ale **dwa niezalezne audyty** dzialajace ROWNOLEGLE. QA Security pyta: "Czy ta naprawa nie otwiera nowej luki?" QA Quality pyta: "Czy ta naprawa faktycznie dziala i nie lamie niczego innego?"

### Trzy analogie

**Analogia 1: Mechanik + inspektor BHP + kontroler jakosci**

Samochod wraca z wypadku. Mechanik naprawia karoserie (Backend Dev). Ale zanim samochod wyjdzie z warsztatu, przechodzi DWIE niezalezne kontrole: inspektor BHP (QA Security) sprawdza, czy poduszki powietrzne dzialaja, czy pasy sa pewne, czy konstrukcja wytrzyma kolejne zderzenie. Kontroler jakosci (QA Quality) sprawdza, czy lakier jest rowny, czy drzwi sie domykaja, czy silnik dziala plynnie. Dwie rozne perspektywy na ten sam artefakt. Dwie rozne checklisty. Dwie niezalezne decyzje.

**Analogia 2: Audit finansowy -- rewident i compliance officer**

Firma przechodzi audyt. Rewident (QA Quality) sprawdza: czy liczby sie zgadzaja? Czy bilans zamyka sie do zera? Czy faktury sa prawdziwe? Compliance officer (QA Security) sprawdza: czy firma nie prala pieniedzy? Czy transakcje nie lamia sankcji? Czy dane osobowe sa chronione? Ten sam material -- dwie zupelnie rozne perspektywy. Obie MUSZA dac PASS, zeby firma przeszla audyt.

**Analogia 3: Peer review naukowy z recenzentem bezpieczenstwa**

Artykul o nowym leku. Recenzent merytoryczny (QA Quality): "Czy badanie jest poprawne metodologicznie? Czy wyniki sa odtwarzalne?" Recenzent ds. bezpieczenstwa (QA Security): "Czy lek nie ma niebezpiecznych interakcji? Czy dawkowanie nie grozi przedawkowaniem? Czy probka badawcza nie wykluczyla grup ryzyka?" Oba PASS = publikacja. Jeden FAIL = poprawki.

> **Czy wiesz, ze...?**
> W architekturze Gold Standard 2026 QA Security i QA Quality dzialaja ROWNOLEGLE
> i NIE znaja wynikow drugiego agenta az do momentu, gdy oba raporty trafia do
> Orkiestratora. Ta izolacja zapobiega groupthink -- jesli QA Quality mowi PASS,
> nie wplywa to na niezalezna ocene QA Security.

> **Uwaga!**
> Bug Hunter NIE jest do prostych bugfixow. Jesli bug to bledna walidacja formularza
> bez implikacji bezpieczenstwa -- uzyj Quick Fix. Bug Hunter jest SPECJALNIE
> dla bugow z potencjalnym wektorem ataku: input handling, auth, session management,
> file access, database queries, API endpoints.

### Sklad zespolu

#### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50/100 |
| **Warstwa** | STRATEGIA |
| **Narzedzia** | Agent (delegacja), Read, Grep, Glob |
| **Tokeny/zadanie** | ~20-30K |
| **Koszt/zadanie** | ~$0.03-$0.06 |

W Bug Hunter Orkiestrator pelni role **triagera**: przyjmuje bug report, ocenia severity (critical/high/medium/low), identyfikuje potencjalne wektory bezpieczenstwa, tworzy precyzyjna instrukcje naprawy z Narrow Context, deleguje do Backend Dev, a po otrzymaniu artefaktu -- **fork'uje** delegacje do obu QA rownolegle. Na koncu syntetyzuje oba raporty QA i podejmuje finalna decyzje: PASS, FAIL+feedback, lub eskalacja.

#### Agent B-01: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Warstwa** | BUILD |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |
| **Tokeny/zadanie** | ~30-50K |
| **Koszt/zadanie** | ~$0.03-$0.08 |

Backend Dev w Bug Hunter dziala identycznie jak w Quick Fix: diagnozuje root cause, implementuje naprawe, pisze testy regresji. Roznica: w Quick Fix feedback przychodzi od jednego QA. W Bug Hunter -- od DWOCH. Backend Dev musi adresowac uwagi OBU audytorow w kolejnej iteracji.

#### Agent Q-01: QA Security

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT |
| **Narzedzia** | Read, Grep, Bash (SAST tools, dependency check) |
| **Tokeny/zadanie** | ~15-25K |
| **Koszt/zadanie** | ~$0.01-$0.03 |

QA Security sprawdza artefakt pod katem OWASP Top 10: SQL injection, XSS, broken auth, sensitive data exposure, broken access control, security misconfiguration, insecure deserialization, known vulnerabilities (CVE), insufficient logging. Produkuje raport: PASS/FAIL + lista findings z severity rating. NIE naprawia -- tylko raportuje.

#### Agent Q-02: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT |
| **Narzedzia** | Read, Grep, Bash (testy, lintery, coverage) |
| **Tokeny/zadanie** | ~15-25K |
| **Koszt/zadanie** | ~$0.01-$0.03 |

QA Quality sprawdza: testy jednostkowe (PASS/FAIL), pokrycie testow (>80%), regresja (brak nowych failures), edge cases (null, undefined, granice), czystosc kodu (zagniezdzenie <3, funkcje <50 linii), zgodnosc ze specyfikacja. Produkuje raport PASS/FAIL z konkretnymi uwagami.

### Diagram architektury -- Fork Pattern

```
+================================================================+
|                   BUG HUNTER -- Fork Pattern                    |
|                   Tier 2A | 4 Agentow                          |
+================================================================+
|                                                                 |
|    +-------------------+                                        |
|    |   ORKIESTRATOR     |                                       |
|    |   A-00 | Opus      |                                       |
|    |   STRATEGIA        |                                       |
|    +--------+----------+                                        |
|             |                                                   |
|             | [one] instrukcja naprawy                          |
|             v                                                   |
|    +-------------------+                                        |
|    |   BACKEND DEV      |                                       |
|    |   B-01 | Sonnet    |                                       |
|    |   BUILD            |                                       |
|    +--------+----------+                                        |
|             |                                                   |
|             | artefakt (kod + testy)                            |
|             |                                                   |
|        +----+----+  <-- FORK: rownolegle do obu QA             |
|        |         |                                              |
|        v         v                                              |
|  +-----------+ +-----------+                                    |
|  | QA SEC    | | QA QUAL   |                                    |
|  | Q-01      | | Q-02      |                                    |
|  | Haiku     | | Haiku     |                                    |
|  | SECURITY  | | QUALITY   |                                    |
|  +-----+-----+ +-----+-----+                                   |
|        |             |                                          |
|        v             v                                          |
|  [sec_report]  [qual_report]                                    |
|        |             |                                          |
|        +------+------+  <-- JOIN: oba raporty do Orkiestratora  |
|               |                                                 |
|               v                                                 |
|    +-------------------+                                        |
|    |   ORKIESTRATOR     |                                       |
|    |   syntetyzuje      |                                       |
|    |   PASS/FAIL        |                                       |
|    +-------------------+                                        |
|               |                                                 |
|          PASS = dostarcza wynik                                 |
|          FAIL = feedback -> Backend Dev (kolejna iteracja)      |
|                                                                 |
+================================================================+
|  Polaczenia: 5 (Ork->B, B->Q1, B->Q2, Q1->Ork, Q2->Ork)     |
|  Tokeny: ~120-180K | Koszt: $0.10-$0.28 | ~90-180s            |
+================================================================+
```

### Wzorzec architektoniczny -- Fork Pattern (Dual QA)

#### Czym jest Fork Pattern?

Fork Pattern to wzorzec, w ktorym **jeden strumien pracy rozdziela sie na dwa (lub wiecej) rownolegle strumienie**, ktore pozniej lacza sie (join) w jednym punkcie. W Bug Hunter: artefakt od Backend Dev jest fork'owany do QA Security i QA Quality JEDNOCZESNIE. Oba QA pracuja niezaleznie, produkuja osobne raporty, a Orkiestrator je laczy (join) w finalna decyzje.

#### Dlaczego rownolegle, a nie sekwencyjnie?

Sekwencyjnie (najpierw security, potem quality) byloby prostsze, ale:
1. **Podwojna latencja** -- QA Security ~30-60s + QA Quality ~30-60s = 60-120s. Rownolegle: max(30-60s, 30-60s) = 30-60s. Oszczednosc 50% czasu.
2. **Brak bias** -- Jesli QA Security idzie pierwszy i daje PASS, QA Quality moze podswiadomie byc mniej krytyczne (confirmation bias). Rownolegla praca eliminuje ten efekt.
3. **Niezaleznosc** -- Kazdy QA widzi TYLKO artefakt, bez raportu drugiego. Groupthink jest niemozliwy.

#### Typy polaczen

| Polaczenie | Typ | Kierunek | Opis |
|-----------|-----|----------|------|
| Orkiestrator -> Backend Dev | `one` | jednokierunkowe | Instrukcja naprawy |
| Backend Dev -> QA Security | `one` | jednokierunkowe | Artefakt do audytu sec |
| Backend Dev -> QA Quality | `one` | jednokierunkowe | Artefakt do audytu qual |
| QA Security -> Orkiestrator | `continuous` | feedback | Raport security |
| QA Quality -> Orkiestrator | `continuous` | feedback | Raport quality |

#### Zlozonosc komunikacyjna

```
Agentow: 4
Polaczen aktywnych: 5
Polaczen mozliwych: 4*(4-1)/2 = 6
Wspolczynnik komunikacji: 5/6 = 0.83 (wysoki, ale uzasadniony)
Overhead tokenowy: ~15-20% (akceptowalny)
```

### Workflow krok po kroku

```
KROK 1: Orkiestrator odbiera bug report
         |
         | Triage: severity, wektor bezpieczenstwa, scope
         v
KROK 2: Orkiestrator tworzy instrukcje (Narrow Context)
         - Opis bugu + reprodukcja
         - Relevantne pliki (Read, Grep)
         - Ograniczenie scope: "TYLKO ten bug"
         |
         v
KROK 3: Backend Dev diagnozuje i naprawia
         - Root cause analysis
         - Implementacja fix
         - Test regresji
         - Zwraca: artefakt (pliki + testy)
         |
         +--- FORK ----+
         |              |
         v              v
KROK 4a: QA Security  KROK 4b: QA Quality
  OWASP check           Test suite
  Dependency audit       Edge cases
  Input validation       Regression check
  Auth/AuthZ review      Code quality
  Raport: PASS/FAIL      Raport: PASS/FAIL
         |              |
         +--- JOIN -----+
         |
         v
KROK 5: Orkiestrator syntetyzuje
         - Oba PASS -> DOSTARCZENIE
         - Jakikolwiek FAIL -> feedback -> KROK 3 (iteracja)
         - Po 3 iteracjach -> eskalacja do wiekszego presetu
```

### Warunki zakonczenia

| Warunek | Akcja |
|---------|-------|
| Oba QA: PASS | Dostarczenie wyniku uzytkownikowi |
| QA Security: FAIL, QA Quality: PASS | Feedback do Backend Dev (focus: security) |
| QA Security: PASS, QA Quality: FAIL | Feedback do Backend Dev (focus: quality) |
| Oba QA: FAIL | Feedback do Backend Dev (obie listy uwag) |
| 3 iteracje FAIL | Eskalacja do Tier 2B (bug_hunt_extended) |
| Bug okazuje sie feature | Eskalacja do startup lub feature_sprint |

### Input/Output

**Input (od uzytkownika):**
- Bug report z opisem objawow
- Sciezka do problematycznego pliku/modulu (opcjonalnie)
- Severity estimate (opcjonalnie -- Orkiestrator oceni sam)
- Kryteria akceptacji (opcjonalnie)

**Output (do uzytkownika):**
- Naprawiony kod z testami regresji
- Raport security audit (findings + mitigations)
- Raport quality audit (test results + coverage)
- Changelog: co zmieniono, dlaczego, jakie ryzyka zmitigowano

### Use cases -- kiedy uzywac Bug Huntera

```
[+] UZYJ Bug Hunter gdy:
    - Bug ma implikacje bezpieczenstwa (SQL injection, XSS, auth bypass)
    - Bug dotyczy input handling (user input, API input, file upload)
    - Bug jest w warstwie auth/session/permission
    - Bug moze eksponowac dane uzytkownikow
    - Code review wykazal potencjalna podatnosc
    - Compliance wymaga dual audit (SOC2, HIPAA, GDPR)

[-] NIE UZYWAJ Bug Hunter gdy:
    - Prosty bugfix bez implikacji sec (-> Quick Fix)
    - Nowa funkcjonalnosc (-> startup / feature_sprint)
    - Nieznana przyczyna bugu (-> Recon Squad najpierw)
    - Bug w UI/CSS (-> Frontend-oriented preset)
    - Bug wymaga refaktoringu calego modulu (-> Plan & Execute)
```

### Anti-patterny

#### Anti-pattern 1: Bug Hunter do prostych bugfixow

```
ZLE:  "TypeError: undefined.map()" -> Bug Hunter (4 agenty, $0.15)
      QA Security: "Brak findings security." Zmarnowane $0.02 na audyt sec.
DOBRZE: "TypeError: undefined.map()" -> Quick Fix (3 agenty, $0.09)
        Prosty null check, QA Quality wystarczy.
```

#### Anti-pattern 2: Ignorowanie raportu jednego QA

```
ZLE:  QA Security: PASS. QA Quality: FAIL (edge case).
      Orkiestrator: "Security OK, dostarczamy." -> bug w edge case na produkcji
DOBRZE: OBA musza dac PASS. Jeden FAIL = iteracja. Bez wyjatkow.
```

#### Anti-pattern 3: Sekwencyjne QA zamiast rownoleglego

```
ZLE:  Backend Dev -> QA Security -> QA Quality (sekwencyjnie)
      Latencja: 120s + 120s = 240s. QA Quality widzi raport QA Security = bias.
DOBRZE: Backend Dev -> [QA Security || QA Quality] (rownolegle)
        Latencja: max(120s, 120s) = 120s. Brak bias. Niezaleznosc.
```

### Realny scenariusz: SQL Injection w endpoint /api/users

**Bug report:** "Aplikacja pada przy wyszukiwaniu uzytkownikow z apostrofem w nazwisku: O'Brien"

**KROK 1 -- Triage (Orkiestrator):**
Orkiestrator analizuje: apostrof w inpucie powoduje crash -> potencjalna SQL injection. Severity: HIGH. Wektor bezpieczenstwa: TAK. Decyzja: Bug Hunter (nie Quick Fix).

**KROK 2 -- Instrukcja:**
```
BUG: Crash przy /api/users?search=O'Brien
ROOT CAUSE HYPOTHESIS: Brak parametryzacji SQL query
PLIKI: src/routes/users.js, src/db/queries.js
FIX: Uzyj parameterized queries zamiast string concatenation
TESTY: 1) O'Brien dziala 2) Robert'); DROP TABLE users;-- NIE dziala
```

**KROK 3 -- Backend Dev:**
```javascript
// PRZED (podatne):
const query = `SELECT * FROM users WHERE name LIKE '%${search}%'`;

// PO (bezpieczne):
const query = `SELECT * FROM users WHERE name LIKE $1`;
const params = [`%${search}%`];
```
+ test regresji dla O'Brien + test dla SQL injection attempt

**KROK 4a -- QA Security:**
```
OWASP CHECK:
[PASS] SQL Injection: Parameterized query eliminuje wektor
[PASS] Input sanitization: % znaki nie sa escapowane podwojnie
[PASS] Error handling: Query failure nie eksponuje stack trace
[WARN] Logging: Brak logowania prob SQL injection (LOW severity)
VERDICT: PASS (z rekomendacja dodania logowania)
```

**KROK 4b -- QA Quality (rownolegle):**
```
TEST SUITE: 12/12 PASS
REGRESSION: 0 nowych failures
EDGE CASES: null -> OK, empty string -> OK, unicode -> OK
COVERAGE: 87% (powyzej progu 80%)
CODE QUALITY: Funkcja <30 linii, zagniezdzenie 1
VERDICT: PASS
```

**KROK 5 -- Synteza:**
Oba QA: PASS. Orkiestrator dostarcza wynik + rekomendacje (dodac logowanie prob injection).

**Wynik:** 1 iteracja | ~140K tokenow | $0.16 | ~120s

### Sciezka eskalacji

```
Bug Hunter (4) -> Bug Hunt Extended (5-6):
  KIEDY: Bug wymaga researchu (np. niezidentyfikowany CVE)
  CO DODAJE: Researcher Security + Manager QA

Bug Hunter (4) -> Full Stack Hunt (6-7):
  KIEDY: Bug dotyczy frontend + backend + database
  CO DODAJE: Frontend Dev + Researcher + Integrator

Bug Hunter (4) -> Quick Fix (3):
  KIEDY: Orkiestrator ocenia, ze brak wektora security
  CO ODEJMUJE: QA Security (deeskalacja)
```

---

## 4. CONTENT PIPELINE -- Fabryka Dokumentacji

### Karta presetu

| Parametr | Wartosc |
|----------|---------|
| **ID** | `content_pipeline` |
| **Nazwa** | Content Pipeline (Rurociag Tresci) |
| **Tier** | 2A (CORE) |
| **Agentow** | 4 |
| **Wzorzec** | Linear Pipeline |
| **Tokeny** | ~100-180K |
| **Koszt** | $0.08-$0.25 |
| **Latencja** | ~120-240 sekund |

### Czym jest Content Pipeline?

Wiekszosci presetow koncentruje sie na KODZIE -- naprawianiu, budowaniu, testowaniu. Ale jest ogromna kategoria zadan, ktora wymaga zupelnie innego podejscia: **tworzenie tresci**. Dokumentacja techniczna, README, artykuly, raporty, changelogi, tutoriale, opisy API.

Content Pipeline to **jedyny preset Tier 2A zaprojektowany specjalnie do produkcji tresci, nie kodu**. Jego architektura to klasyczny pipeline -- kazdy agent przetwarza material i przekazuje dalej, jak na tasmie produkcyjnej.

Klucz: **dwoch Researcherow pracuje ROWNOLEGLE** (Researcher Forums + Researcher Tech), ich wyniki sa syntetyzowane, a nastepnie Writer tworzy finalny dokument, ktory przechodzi przez QA Quality.

### Trzy analogie

**Analogia 1: Redakcja gazety**

Dwoch reporterow bada temat: jeden rozmawia z ludzmi na forach i w spolecznosciach (Researcher Forums), drugi analizuje dane techniczne i dokumentacje (Researcher Tech). Redaktor naczelny (Orkiestrator) zleca im pytania. Oba raporty trafiaja do dziennikarza (Writer), ktory pisze artykul. Korektor (QA Quality) sprawdza: czy tekst jest czytelny? Czy dane sie zgadzaja? Czy nie ma bledow? Jesli sa -- artykul wraca do dziennikarza. Jesli nie -- idzie do druku.

**Analogia 2: Linia montazowa w fabryce czekolady**

Surowce (kakao, cukier) przychodza z dwoch dostawcow rownolegle. Sa mieszane w jednym czanie (synteza). Czekoladnik formuje tabliczki (Writer). Kontroler jakosci sprawdza: ksztalt, smak, opakowanie. Jesli tabliczka nie spelnia normy -- wraca na poczatek linii.

**Analogia 3: Zespol filmowy - dokumentalny**

Dwoch researcher-dokumentalistow: jeden przeprowadza wywiady (Forums), drugi analizuje dane statystyczne (Tech). Producent (Orkiestrator) koordynuje. Scenarzysta (Writer) laczy obydwa zrodla w narracje. Recenzent (QA Quality) sprawdza fakty i czytelnosc.

> **Czy wiesz, ze...?**
> Dokumentacja to najczesciej pomijany artefakt w projektach software'owych.
> Badania GitHub pokazuja, ze projekty z dobra dokumentacja maja 3.5x wiecej
> kontrybutow niz projekty bez niej. Content Pipeline formalizuje proces
> tworzenia dokumentacji na tym samym poziomie rygoru co tworzenie kodu.

> **Uwaga!**
> Content Pipeline tworzy TEKST, nie KOD. Jesli potrzebujesz implementacji
> (nawet jesli opisujesz ja w dokumentacji) -- uzyj innego presetu.
> Writer NIE ma narzedzi do uruchamiania kodu (brak Bash).

### Sklad zespolu

#### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Opus |
| **Load** | 50/100 |
| **Warstwa** | STRATEGIA |
| **Narzedzia** | Agent, Read, Grep |
| **Tokeny/zadanie** | ~15-25K |
| **Koszt/zadanie** | ~$0.02-$0.05 |

Orkiestrator definiuje **brief contentowy**: co napisac, dla kogo, jaki format, jakie pytania badawcze. Deleguje do obu Researcherow rownolegle, syntetyzuje ich findings, przekazuje Writerowi, a na koncu ewaluuje raport QA.

#### Agent R-01: Researcher Forums

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku |
| **Load** | 55/100 |
| **Warstwa** | RESEARCH |
| **Narzedzia** | WebSearch, WebFetch, Read |
| **Tokeny/zadanie** | ~15-30K |
| **Koszt/zadanie** | ~$0.01-$0.03 |

Researcher Forums specjalizuje sie w **wiedzy spolecznosciowej**: fora (Stack Overflow, Reddit, Discord), dyskusje, opinie uzytkownikow, best practices spolecznosciowe, typowe problemy i rozwiazania, real-world experience reports. Dostarcza **perspektywe praktykow** -- co dziala w terenie, nie tylko w teorii.

#### Agent R-02: Researcher Tech

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku |
| **Load** | 55/100 |
| **Warstwa** | RESEARCH |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep |
| **Tokeny/zadanie** | ~15-30K |
| **Koszt/zadanie** | ~$0.01-$0.03 |

Researcher Tech specjalizuje sie w **wiedzy oficjalnej**: dokumentacja techniczna, API reference, changelogi, benchmarki, specyfikacje, RFC, white papers. Dostarcza **perspektywe autorytatywna** -- co mowi tworca technologii, jakie sa oficjalne limity i best practices.

#### Agent W-01: Writer (Redaktor)

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet |
| **Load** | 70/100 |
| **Warstwa** | BUILD (content) |
| **Narzedzia** | Write, Edit, Read |
| **Tokeny/zadanie** | ~30-50K |
| **Koszt/zadanie** | ~$0.03-$0.08 |

Writer to jedyny **builder** w tym presecie, ale buduje TEKST, nie kod. Otrzymuje syntetyzowane findings od obu Researcherow i tworzy finalny dokument: struktura, narracja, przyklady, formatowanie. Pisze w stylu okreslonaym przez brief (techniczny, tutorialowy, publicystyczny).

#### Agent Q-02: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT |
| **Narzedzia** | Read, Grep |
| **Tokeny/zadanie** | ~15-25K |
| **Koszt/zadanie** | ~$0.01-$0.03 |

QA Quality w Content Pipeline sprawdza INNY zestaw kryteriow niz w presetach kodowych: poprawnosc merytoryczna (czy fakty sie zgadzaja ze zrodlami), kompletnosc (czy brief jest pokryty), czytelnosc (zagniezdzenie naglowkow, dlugosc akapitow), formatowanie (Markdown, linki, przyklady kodu), spojnosc terminologiczna.

### Diagram architektury -- Linear Pipeline

```
+================================================================+
|              CONTENT PIPELINE -- Linear Pipeline                |
|              Tier 2A | 4 Agentow                               |
+================================================================+
|                                                                 |
|    +-------------------+                                        |
|    |   ORKIESTRATOR     |                                       |
|    |   A-00 | Opus      |                                       |
|    |   brief + pytania  |                                       |
|    +--------+----------+                                        |
|             |                                                   |
|        +----+----+  <-- PARALLEL: oba Research rownolegle       |
|        |         |                                              |
|        v         v                                              |
|  +-----------+ +-----------+                                    |
|  | RES FORUM | | RES TECH  |                                    |
|  | R-01      | | R-02      |                                    |
|  | Haiku     | | Haiku     |                                    |
|  | community | | official  |                                    |
|  +-----+-----+ +-----+-----+                                   |
|        |             |                                          |
|        +------+------+  <-- SYNTEZA: oba findings do Writer    |
|               |                                                 |
|               v                                                 |
|    +-------------------+                                        |
|    |   WRITER           |                                       |
|    |   W-01 | Sonnet    |                                       |
|    |   tworzy dokument  |                                       |
|    +--------+----------+                                        |
|             |                                                   |
|             v                                                   |
|    +-------------------+                                        |
|    |   QA QUALITY       |                                       |
|    |   Q-02 | Haiku     |                                       |
|    |   audyt tresci     |                                       |
|    +--------+----------+                                        |
|             |                                                   |
|        PASS | FAIL                                              |
|             v                                                   |
|    +-------------------+                                        |
|    |   ORKIESTRATOR     |                                       |
|    |   synteza + decyzja|                                       |
|    +-------------------+                                        |
|                                                                 |
|    FAIL -> feedback -> Writer (poprawki)                        |
|    PASS -> dostarczenie dokumentu                               |
|                                                                 |
+================================================================+
|  Polaczenia: 6 (Ork->R1, Ork->R2, R1->W, R2->W, W->QA, QA->O)|
|  Tokeny: ~100-180K | Koszt: $0.08-$0.25 | ~120-240s           |
+================================================================+
```

### Wzorzec architektoniczny -- Linear Pipeline

#### Czym jest Linear Pipeline?

Linear Pipeline to wzorzec, w ktorym dane przeplywaja przez serie etapow w jednym kierunku, jak na tasmie produkcyjnej: Research -> Synteza -> Build -> QA. Kazdy etap przetwarza output poprzedniego i produkuje input dla nastepnego.

W Content Pipeline mamy wariant z **rownoleglym wejsciem** (dwa Research rownolegle) i **sekwencyjnym dalszym przeplywem** (Writer -> QA). To hybrydowy pipeline -- Parallel-Fan-In na poczatku, Linear w srodku i na koncu.

#### Fazy pipeline'u

```
FAZA 1: RESEARCH (parallel)
  R-01 bada fora + spolecznosc  --+
                                   +--> FAZA 2: SYNTEZA
  R-02 bada docs + specs --------+
                                       (Orkiestrator lub Writer laczy)

FAZA 2: SYNTEZA
  Polaczenie findings w spojny brief roboczy

FAZA 3: BUILD (content)
  Writer tworzy dokument na bazie findings

FAZA 4: QA
  QA Quality audytuje tresc

FAZA 5: DECYZJA
  Orkiestrator: PASS -> dostarczenie | FAIL -> iteracja
```

### Workflow krok po kroku

```
KROK 1: Orkiestrator tworzy brief contentowy
         - Temat: "Dokumentacja API /users endpoint"
         - Audience: "Junior developers"
         - Format: "README z przykladami curl"
         - Pytania: "Jakie auth metody? Jakie limity? Jakie bledy?"
         |
         +--- PARALLEL ---+
         |                 |
         v                 v
KROK 2a: Researcher     KROK 2b: Researcher
         Forums                   Tech
  - Stack Overflow:        - Official API docs
    typowe problemy        - Changelogi
  - Reddit: UX issues      - RFC/specs
  - Discord: workarounds   - Benchmarki
         |                 |
         +--- JOIN --------+
         |
         v
KROK 3: Writer tworzy dokument
         - Struktura (H1-H3)
         - Narracja + przyklady
         - Code snippets (curl, JS, Python)
         - Tabele parametrow
         |
         v
KROK 4: QA Quality audytuje
         - Fakty vs zrodla
         - Kompletnosc vs brief
         - Czytelnosc + formatowanie
         - VERDICT: PASS/FAIL
         |
         v
KROK 5: Orkiestrator decyduje
         PASS -> dostarczenie
         FAIL -> Writer poprawia (max 3 iteracje)
```

### Input/Output

**Input:**
- Temat dokumentu
- Docelowy czytelnik (audience)
- Format (README, tutorial, artykul, raport, changelog)
- Zakres (co pokryc, co pominac)
- Styl (techniczny, publicystyczny, edukacyjny)

**Output:**
- Gotowy dokument w Markdown
- Lista zrodel (URLs, docs)
- Raport QA (co sprawdzono, co poprawiono)
- Metadata: word count, reading time, coverage score

### Use cases

```
[+] UZYJ Content Pipeline gdy:
    - Dokumentacja API (README, reference, quickstart)
    - Artykuly techniczne / blog posts
    - Raporty z analizy (porownania technologii)
    - Changelogi / release notes
    - Tutoriale / poradniki
    - Opisy architektoniczne

[-] NIE UZYWAJ Content Pipeline gdy:
    - Potrzebujesz kodu, nie tekstu (-> Solo, Quick Fix)
    - Potrzebujesz TYLKO researchu bez pisania (-> Recon Squad)
    - Potrzebujesz content + kod w jednym (-> Feature Sprint)
    - Dokument to 1-2 zdania (-> Solo z Writerem)
```

### Anti-patterny

#### Anti-pattern 1: Pipeline do kodu

```
ZLE:  "Napisz dokumentacje I zaimplementuj endpoint" -> Content Pipeline
      Writer nie ma Bash/Edit -> nie moze pisac kodu
DOBRZE: "Zaimplementuj endpoint" -> Solo/Quick Fix
        "Napisz dokumentacje endpointu" -> Content Pipeline
        Dwa osobne taski, dwa presety.
```

#### Anti-pattern 2: Pominiecje fazy Research

```
ZLE:  Orkiestrator -> Writer: "Napisz README dla React"
      Writer halucynuje: wymysla API, ktore nie istnieje
DOBRZE: Orkiestrator -> [R-01 + R-02] -> Writer
        Writer pisze NA PODSTAWIE DANYCH, nie wyobrazen
```

#### Anti-pattern 3: Zbyt szeroki brief

```
ZLE:  "Napisz kompletna dokumentacje calego systemu"
      -> 500K tokenow, $1.20, 4 godziny, niespojny wynik
DOBRZE: "Napisz README dla modulu auth" (1 modul, 1 dokument)
        Powtorz dla kazdego modulu osobno.
```

### Realny scenariusz: README dla biblioteki walidacji formularzy

**Brief:** "Napisz README.md dla naszej biblioteki form-validator. Audience: mid-level developers. Format: GitHub README z przykladami. Styl: techniczny ale przystepny."

**KROK 2a -- Researcher Forums:**
```
FINDINGS:
- Stack Overflow: 47 pytan o biblioteke, top 3 problemy:
  1. Async validation timeout (42 votes)
  2. Custom error messages not displaying (38 votes)
  3. Nested object validation confusion (31 votes)
- Reddit r/webdev: "Great lib but docs are lacking"
- Discord #form-validator: FAQ pinned z 12 common issues
```

**KROK 2b -- Researcher Tech:**
```
FINDINGS:
- Package.json: version 3.2.1, 14 dependencies
- API surface: 23 exported functions, 8 types
- TypeScript support: full, .d.ts included
- Bundle size: 12KB gzipped
- Test coverage: 94%
- Changelog: 3.0 breaking changes in validate() signature
```

**KROK 3 -- Writer produkuje:**
README.md z sekcjami: Installation, Quick Start, API Reference (23 functions), TypeScript Usage, Common Patterns (addressing top 3 SO issues), Migration from v2, FAQ (from Discord), Bundle Size, Contributing.

**KROK 4 -- QA Quality:**
```
MERYTORYKA: 22/23 funkcje udokumentowane (brak: validateAsync timeout param)
KOMPLETNOSC: Brief 95% pokryty (brak sekcji "Porownanie z innymi bibliotekami")
CZYTELNOSC: Flesch-Kincaid ~45 (techniczny, ale OK dla mid-level)
FORMAT: Markdown valid, linki dzialaja, code blocks poprawne
VERDICT: FAIL (brak validateAsync timeout + sekcja porownawcza z briefu)
```

**KROK 3 (iteracja 2):** Writer dodaje brakujace elementy. QA: PASS.

**Wynik:** 2 iteracje | ~150K tokenow | $0.18 | ~180s

### Sciezka eskalacji

```
Content Pipeline (4) -> Content Factory (6-7):
  KIEDY: Dokument wymaga grafik/diagramow + kodu + tekstu
  CO DODAJE: Designer + Backend Dev (code examples) + Integrator

Content Pipeline (4) -> Recon Squad (3):
  KIEDY: Nie wiadomo CO pisac (brak zdefiniowanego tematu)
  CO ROBI: Recon odkrywa temat, Pipeline go opisuje

Content Pipeline (4) -> Solo (2):
  KIEDY: Krotki dokument bez potrzeby researchu (np. changelog 5 linii)
  CO ODEJMUJE: Obaj Researcherzy (deeskalacja)
```

---

## 5. PLAN & EXECUTE -- Strategia Przed Akcja

### Karta presetu

| Parametr | Wartosc |
|----------|---------|
| **ID** | `plan_exec` |
| **Nazwa** | Plan & Execute (Planuj i Wykonaj) |
| **Tier** | 2A (CORE) |
| **Agentow** | 4 |
| **Wzorzec** | Plan-and-Execute Loop |
| **Tokeny** | ~120-200K |
| **Koszt** | $0.10-$0.30 |
| **Latencja** | ~120-240 sekund |

### Czym jest Plan & Execute?

Wiekszosci presetow przechodzi od razu do implementacji. Solo: dostaje zadanie -> koduje. Quick Fix: dostaje buga -> naprawia. To dziala swietnie dla zadan o znanej strukturze. Ale co zrobic, gdy zadanie jest **strukturalnie zlozone**?

Przyklad: "Zmigruj baze danych z MongoDB na PostgreSQL." To nie jest jednorazowy fix. To seria polaczonych krokow: analiza schematu, mapowanie typow, napisanie skryptow migracji, zmiana ORM, update queries, update testow, weryfikacja integralnosci danych. Jesli zaczniesz kodowac bez planu -- przegapisz zaleznosci, zapomnisz o edge cases, i skonczysz z polowa migracji, ktora nie dziala.

Plan & Execute dodaje **faze planowania** miedzy analiza a implementacja. Analyst rozbija zadanie na podzadania. Planner uklada je w harmonogram z zaleznosciami. Backend Dev wykonuje plan krok po kroku. QA Quality weryfikuje kazdy krok.

**Kluczowa statystyka:** Projekty z faza planowania osiagaja **83% oszczednosci kosztow** w porownaniu z ad-hoc execution. Dlaczego? Bo plan identyfikuje przeszkody ZANIM na nie trafisz, eliminuje powtarzanie pracy, i pozwala na inkrementalna walidacje.

### Trzy analogie

**Analogia 1: Przeprowadzka -- planer logistyczny**

Przeprowadzasz sie do nowego mieszkania. Mozesz po prostu zaczac pakowac (ad-hoc) -- i skonczysz z ksiazkami na dnie kartonu pod telewizorem, lodowka, ktora nie miesci sie w drzwiach, i meblem, ktory nie wchodzi do windy. Albo mozesz najpierw ZAPLANOWAC: zmierzyc meble i drzwi, obliczyc ile kartonow potrzebujesz, ustalic kolejnosc (najpierw duze meble, potem drobnica), zarezerwowac winde towarowa. Analyst mierzy i szacuje. Planner uklada harmonogram. Builder pakuje i przenosi. QA sprawdza, czy nic nie zginelo i nic sie nie zlamalo.

**Analogia 2: Operacja wojskowa -- plan bitwy**

Zaden dowodca nie atakuje bez planu operacyjnego. Analyst (wywiad) rozpoznaje: ile zolnierzy przeciwnika, jakie uzbrojenie, jaki teren. Planner (sztab) tworzy plan: ktore oddzialy gdzie, w jakiej kolejnosci, jakie sa plany awaryjne. Builder (zolnierze) wykonuje plan. QA (obserwator) raportuje: "Faza 1 zakonczona, straty minimalne, przechodzimy do Fazy 2" lub "Faza 1 zablokowana, wdroz plan B."

**Analogia 3: Remont mieszkania**

Nie remontujesz laznienki zaczynajac od kafelkow. Analyst: "Stan rur: do wymiany. Elektrika: OK. Scianki: do skucia w jednym miejscu." Planner: "Krok 1: demontaz. Krok 2: rury. Krok 3: elektrika. Krok 4: plytki. Krok 5: armatura." Builder realizuje plan. QA: "Rury szczelne? Sprawdzone. Plytki proste? Sprawdzone."

> **Czy wiesz, ze...?**
> Badanie Google z 2024 (Multi-Agent Systems) wykazalo, ze podejscie
> plan-then-execute poprawia jakosc o 47% w porownaniu z ad-hoc execution
> na zadaniach o zlozonosci M-L. Efekt jest silniejszy im wieksze zadanie.
> Dla zadan S (prostych) -- planowanie jest overhead'em. Dla zadan L-XL --
> planowanie to roznica miedzy sukcesem a porazka.

> **Uwaga!**
> Plan & Execute NIE jest dla prostych zadan. Jesli zadanie to "dodaj pole do formularza"
> -- uzyj Solo. Jesli to "napraw buga" -- uzyj Quick Fix. Plan & Execute jest dla zadan
> STRUKTURALNYCH: migracje, refactoring, reorganizacja kodu, zmiana architektury.
> Planowanie prostego taska to jak tworzenie planu bitwy do kupienia chleba.

### Sklad zespolu

#### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Opus |
| **Load** | 50/100 |
| **Warstwa** | STRATEGIA |
| **Narzedzia** | Agent, Read, Grep, Glob |
| **Tokeny/zadanie** | ~20-35K |
| **Koszt/zadanie** | ~$0.03-$0.07 |

Orkiestrator w Plan & Execute ma rozszerzona role: nie tylko deleguje i waliduje, ale **nadzoruje postep planu**. Po kazdym kroku planu sprawdza: czy krok zrealizowany? Czy wynik zgodny z oczekiwaniem? Czy nastepny krok moze ruszac? Jest taktycznym dowodca, ktory trzyma sie planu, ale modyfikuje go gdy sytuacja tego wymaga.

#### Agent A-02: Analyst

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet |
| **Load** | 65/100 |
| **Warstwa** | PLANOWANIE |
| **Narzedzia** | Read, Grep, Glob, Bash (analiza, nie budowa) |
| **Tokeny/zadanie** | ~20-40K |
| **Koszt/zadanie** | ~$0.02-$0.06 |

Analyst analizuje codebase i zadanie: identyfikuje moduly dotkniecte zmiana, szacuje zlozonosc (S/M/L/XL), mapuje zaleznosci miedzy plikami/modulami, identyfikuje ryzyka. Produkuje **raport dekompozycji**: lista podzadan z estymacjami i zaleznosciami.

#### Agent A-03: Planner

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet |
| **Load** | 60/100 |
| **Warstwa** | PLANOWANIE |
| **Narzedzia** | Read, Grep (referencja do kodu) |
| **Tokeny/zadanie** | ~15-30K |
| **Koszt/zadanie** | ~$0.02-$0.05 |

Planner otrzymuje dekompozycje od Analysta i tworzy **harmonogram wykonania**: kolejnosc krokow, zaleznosci, fazy rownolegle/sekwencyjne, checkpointy, kryteria PASS/FAIL dla kazdego kroku. Nie koduje, nie analizuje codebase -- planuje egzekucje.

#### Agent B-01: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet |
| **Load** | 75/100 |
| **Warstwa** | BUILD |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |
| **Tokeny/zadanie** | ~35-55K |
| **Koszt/zadanie** | ~$0.04-$0.09 |

Backend Dev w Plan & Execute wykonuje plan KROK PO KROKU. Nie dostaje calego zadania naraz -- dostaje jeden krok z kontekstem. Po zakonczeniu kroku, Orkiestrator weryfikuje i deleguje nastepny. Ta inkrementalna egzekucja redukuje ryzyko: jesli krok 3 sie nie uda, straciles tylko koszt kroku 3, nie calego zadania.

#### Agent Q-02: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT |
| **Narzedzia** | Read, Grep, Bash (testy) |
| **Tokeny/zadanie** | ~15-25K |
| **Koszt/zadanie** | ~$0.01-$0.03 |

QA Quality weryfikuje KAZDY KROK planu, nie tylko finalny artefakt. Po kazdym kroku: testy przechodza? Brak regresji? Krok spelnia kryteria z planu? Ten ciagly audyt to "safety net" -- blad wykryty w kroku 2 kosztuje $0.02. Blad wykryty na koncu kosztuje $0.30 (powrot do poczatku).

### Diagram architektury -- Plan-and-Execute Loop

```
+================================================================+
|           PLAN & EXECUTE -- Plan-and-Execute Loop               |
|           Tier 2A | 4 Agentow                                  |
+================================================================+
|                                                                 |
|  FAZA 1: ANALIZA                                                |
|    +-------------------+     +-------------------+              |
|    |   ORKIESTRATOR     | --> |   ANALYST          |             |
|    |   A-00 | Opus      |     |   A-02 | Sonnet    |            |
|    +-------------------+     +--------+----------+              |
|                                       |                         |
|                                       v dekompozycja            |
|  FAZA 2: PLANOWANIE                                             |
|    +-------------------+                                        |
|    |   PLANNER          |                                       |
|    |   A-03 | Sonnet    |                                       |
|    +--------+----------+                                        |
|             |                                                   |
|             v harmonogram                                       |
|  FAZA 3: EGZEKUCJA (krokowa)                                   |
|    +-------------------+     +-------------------+              |
|    |   BACKEND DEV      | --> |   QA QUALITY       |             |
|    |   B-01 | Sonnet    |     |   Q-02 | Haiku     |            |
|    +--------+----------+     +--------+----------+              |
|             ^                         |                         |
|             |    FAIL                 |                         |
|             +-------------------------+                         |
|                                       |                         |
|             PASS                      v                         |
|    +-------------------+                                        |
|    |   ORKIESTRATOR     |                                       |
|    |   nastepny krok?   |                                       |
|    +--------+----------+                                        |
|             |                                                   |
|        +----+----+                                              |
|        |         |                                              |
|     TAK: krok    NIE: wszystkie                                 |
|     N+1 -> B-01  kroki done -> DOSTARCZENIE                     |
|                                                                 |
+================================================================+
|  Polaczenia: 6 (Ork->An, An->Pl, Ork->B, B->QA, QA->Ork, Ork)|
|  Tokeny: ~120-200K | Koszt: $0.10-$0.30 | ~120-240s           |
+================================================================+
```

### Wzorzec architektoniczny -- Plan-and-Execute Loop

#### Czym jest Plan-and-Execute Loop?

Plan-and-Execute to wzorzec dwufazowy: najpierw **planowanie** (Analyst + Planner tworzą plan), potem **egzekucja** (Backend Dev + QA Quality realizuja plan krok po kroku). Kluczowa cecha: egzekucja jest **inkrementalna** -- kazdy krok planu jest osobnym cyklem Build+Verify.

#### Dlaczego inkrementalna egzekucja?

```
AD-HOC (bez planu):
  Builder dostaje cale zadanie -> koduje 60 min -> QA: FAIL
  -> poprawki 30 min -> QA: FAIL -> poprawki 20 min -> QA: PASS
  Koszt bledu na koncu: WYSOKI (musisz wrocic do poczatku)

PLAN-AND-EXECUTE (z planem):
  Krok 1: 10 min -> QA: PASS
  Krok 2: 10 min -> QA: FAIL -> poprawka 5 min -> QA: PASS
  Krok 3: 10 min -> QA: PASS
  Krok 4: 10 min -> QA: PASS
  Koszt bledu w kroku 2: NISKI (wracasz o 1 krok, nie o 4)
```

#### 83% oszczednosci -- skad ta liczba?

Scenariusz: migracja 4 endpointow z REST na GraphQL.

**Ad-hoc:** Builder migruje wszystkie 4 na raz. Po 50 minutach QA: "Endpoint /users dziala, /orders ma blad w relacji, /products brakuje pola, /auth nie obsluguje tokenow." Builder musi zdebugoac 3 endpointy NARAZ, w kontekscie 4 zmian jednoczesnie. Koszt: ~300K tokenow, $0.45.

**Plan & Execute:** Planner: "Krok 1: /users. Krok 2: /orders. Krok 3: /products. Krok 4: /auth." Kazdy krok osobno. Blad w /orders wykryty PO JEDNYM endpoincie, nie po czterech. Koszt: ~200K tokenow, $0.30. Ale kluczowe: zero powrotow do poczatku, zero debugowania splatanych zmian.

Realna oszczednosc: czas debugowania spada o 83% bo problemy sa izolowane.

### Workflow krok po kroku

```
KROK 1: Orkiestrator przyjmuje zadanie strukturalne
         "Zmigruj ORM z Sequelize na Prisma"
         |
         v
KROK 2: Analyst analizuje codebase
         - Read: schema, modele, relacje
         - Grep: uzycia Sequelize w kodzie (87 plikow)
         - Dekompozycja:
           Podzadanie 1: Schemat Prisma (S)
           Podzadanie 2: Modele CRUD (M)
           Podzadanie 3: Relacje (M)
           Podzadanie 4: Migracje danych (L)
           Podzadanie 5: Update testow (M)
         |
         v
KROK 3: Planner tworzy harmonogram
         Faza 1: Schemat Prisma [sekw., brak zaleznosci]
         Faza 2: Modele CRUD [sekw., zalezy od Faza 1]
         Faza 3: Relacje [sekw., zalezy od Faza 2]
         Faza 4: Migracja danych [sekw., zalezy od Faza 3]
         Faza 5: Update testow [sekw., zalezy od Faza 4]
         Checkpointy: po kazdej fazie
         Kryterium PASS: testy przechodzace, brak regresji
         |
         v
KROK 4: Egzekucja krokowa
         Faza 1: B-01 tworzy schema.prisma -> Q-02: PASS
         Faza 2: B-01 migruje modele -> Q-02: FAIL (relacja M:N)
           -> B-01 poprawia -> Q-02: PASS
         Faza 3: B-01 dodaje relacje -> Q-02: PASS
         Faza 4: B-01 migruje dane -> Q-02: PASS
         Faza 5: B-01 updatuje testy -> Q-02: PASS
         |
         v
KROK 5: Orkiestrator: wszystkie kroki PASS -> DOSTARCZENIE
```

### Input/Output

**Input:**
- Zadanie strukturalne (migracja, refactoring, reorganizacja)
- Codebase (dostep przez Read/Grep)
- Ograniczenia (deadline, budzet tokenowy, priorytet)

**Output:**
- Plan wykonania (harmonogram z fazami)
- Zrealizowany kod (po wszystkich krokach)
- Raporty QA per krok
- Changelog: co zmieniono w kazdym kroku

### Use cases

```
[+] UZYJ Plan & Execute gdy:
    - Migracja bazy danych / ORM
    - Refactoring duzego modulu
    - Zmiana architektury (monolith -> microservices)
    - Reorganizacja struktury katalogow
    - Update wersji frameworka z breaking changes
    - Wielokrokowe zadanie z zaleznosciami

[-] NIE UZYWAJ Plan & Execute gdy:
    - Prosty bugfix (-> Quick Fix)
    - Nowy feature bez zaleznosci (-> Solo)
    - Research (-> Recon Squad)
    - Zadanie S (proste, 1 plik) -- planowanie to overhead
    - Zadanie wymagajace security audit (-> Bug Hunter)
```

### Anti-patterny

#### Anti-pattern 1: Planowanie prostych zadan

```
ZLE:  "Dodaj pole email do formularza" -> Plan & Execute
      Analyst: "1 podzadanie." Planner: "1 krok." 30K tokenow na planowanie NICZEGO.
DOBRZE: "Dodaj pole email" -> Solo (2 agenty, $0.06)
```

#### Anti-pattern 2: Plan bez checkpointow

```
ZLE:  Planner: "Krok 1. Krok 2. Krok 3. Krok 4. Krok 5. Sprawdz na koncu."
      -> Blad w Kroku 2 wykryty po Kroku 5. Cofniecie o 3 kroki.
DOBRZE: Checkpoint po KAZDYM kroku. QA weryfikuje INKREMENT, nie calosc.
```

#### Anti-pattern 3: Rigid plan (brak adaptacji)

```
ZLE:  Plan mowi "Krok 3: migruj tabele users."
      W Kroku 2 odkrywasz: tabela users ma 47 relacji.
      Builder kontynuuje oryginalny plan -> chaos.
DOBRZE: Orkiestrator re-planuje: "Krok 2 ujawnil zlozonosc.
        Nowy krok 2.5: rozwiaz relacje users. Zaktualizowany plan."
```

#### Anti-pattern 4: Caly plan w jednej delegacji

```
ZLE:  Orkiestrator -> Backend Dev: "Oto plan 5 krokow. Zrob wszystko."
      -> Backend Dev robi Krok 1-3, traci kontekst, Krok 4-5 sa bledne.
DOBRZE: Orkiestrator -> Backend Dev: "Krok 1: [szczegoly]."
        Po Krok 1 PASS: "Krok 2: [szczegoly + kontekst z Krok 1]."
```

### Realny scenariusz: Migracja z JavaScript na TypeScript

**Zadanie:** "Skonwertuj modul auth/ z JS na TS"

**Analyst:**
```
DEKOMPOZYCJA:
  auth/
    login.js (120 linii, 3 exportowane funkcje, 2 typy)
    register.js (90 linii, 2 funkcje, 3 typy)
    middleware.js (60 linii, 1 funkcja, 2 typy)
    types/ (brak -- trzeba utworzyc)
    tests/ (login.test.js, register.test.js -- do konwersji)

ZALEZNOSCI:
  types/ -> login.ts, register.ts, middleware.ts (typy musza istniec pierwsze)
  middleware.ts -> login.ts, register.ts (middleware importuje auth functions)

ZLOZONOSC: M (5 plikow, jasne zaleznosci)
```

**Planner:**
```
KROK 1: Utworz types/auth.ts (interfejsy User, Session, AuthResult)
KROK 2: Konwertuj login.js -> login.ts (uzyj typow z Krok 1)
KROK 3: Konwertuj register.js -> register.ts
KROK 4: Konwertuj middleware.js -> middleware.ts
KROK 5: Konwertuj testy + uruchom pelna suite
CHECKPOINT: Po kazdym kroku: tsc --noEmit PASS, existing tests PASS
```

**Egzekucja:** 5 krokow, 1 iteracja w Kroku 3 (brakujacy typ dla validation), reszta PASS od razu.

**Wynik:** 6 iteracji total (5 krokow + 1 poprawka) | ~180K tokenow | $0.24 | ~200s

### Sciezka eskalacji

```
Plan & Execute (4) -> Plan & Execute Extended (5-6):
  KIEDY: Zadanie dotyczy frontend + backend (potrzebny Frontend Dev)
  CO DODAJE: Frontend Dev, QA Security (jesli migracja auth)

Plan & Execute (4) -> Full Migration (7-8):
  KIEDY: Migracja calego systemu (baza + backend + frontend + testy + docs)
  CO DODAJE: Designer, Redaktor, Integrator, dodatkowi QA

Plan & Execute (4) -> Quick Fix (3):
  KIEDY: Analyst ocenia: 1 podzadanie, brak zaleznosci
  CO ODEJMUJE: Analyst + Planner (deeskalacja)
```

---

## 6. PERFORMANCE BOOST -- Cykl Pomiaru i Naprawy

### Karta presetu

| Parametr | Wartosc |
|----------|---------|
| **ID** | `perf_boost` |
| **Nazwa** | Performance Boost (Turbo Wydajnosci) |
| **Tier** | 2A (CORE) |
| **Agentow** | 4 |
| **Wzorzec** | Measure-Fix Cycle |
| **Tokeny** | ~100-160K |
| **Koszt** | $0.08-$0.25 |
| **Latencja** | ~90-180 sekund |

### Czym jest Performance Boost?

Inne presety naprawiaja BLEDY (Quick Fix, Bug Hunter) lub BUDUJA nowe rzeczy (Solo, Content Pipeline). Performance Boost robi cos innego: **naprawia to, co DZIALA, ale dziala ZA WOLNO**.

Twoj endpoint /api/products odpowiada w 2.3 sekundy. Nie jest zlamany -- dziala poprawnie, zwraca prawidlowe dane. Ale uzytkownicy odchodza, bo czas ladowania przekracza 1 sekunde. Problem nie jest w poprawnosci -- jest w WYDAJNOSCI.

Performance Boost to preset zaprojektowany specjalnie do **mierzalnej optymalizacji**. Klucz: MIERZALNEJ. Nie "popraw cos, zeby bylo szybciej" -- ale "zmierz, zidentyfikuj waskie gardlo, napraw, zmierz ponownie, potwierdz poprawe."

### Trzy analogie

**Analogia 1: Tuning samochodu sportowego**

Samochod jezdzi. Silnik dziala. Ale chcesz wiecej mocy, szybszego przyspieszenia, lepszej oszczednosci paliwa. Mechanik (Analyst) najpierw podlacza diagnostyke: hamownia, telemetria, analiza spalin. Dane mowia: "Turbo ma 15% leak, uklad wydechowy ma za duzy opor, mapa wtrysku jest konserwatywna." Tuner (Backend Dev) naprawia: uszczelnia turbo, wymienia wydech, modyfikuje mape. Diagnostyka ponownie (QA Performance): "+47HP, 0.8s szybsze 0-100, spalanie -8%." Integrator laczy wszystkie zmiany i sprawdza, ze dzialaja RAZEM, nie tylko osobno.

**Analogia 2: Lekarz sportowy i zawodnik**

Biegacz jest zdrowy -- nie jest chory. Ale chce poprawic czas maratonu z 3:45 na 3:15. Lekarz sportowy (Analyst) analizuje: VO2max, tetno spoczynkowe, technika biegu, dieta. Identyfikuje: "Twoja kadencja jest za niska (165/min), a nawadnianie w trakcie biegu nieoptymalne." Trener (Backend Dev) modyfikuje plan treningowy. Diagnostyk (QA Performance) mierzy ponownie po 4 tygodniach: "Kadencja 178/min, nawodnienie +30%, prognozowany czas 3:20." Koordynator (Integrator) upewnia sie, ze zmiany w kadencji nie pogorszyly wytrzymalosci.

**Analogia 3: Optymalizacja linii produkcyjnej**

Fabryka produkuje 100 sztuk na godzine. Nie jest zepsuta -- produkuje. Ale konkurencja robi 150. Inzynier procesu (Analyst) analizuje: "Stacja 3 jest waskim gardlem -- 45s/sztuka, podczas gdy reszta 25-30s." Technik (Backend Dev) optymalizuje stacje 3: nowe narzedzie, lepsza sekwencja. Kontroler (QA Performance): "Stacja 3: 28s/sztuka. Calosc: 140 sztuk/godzine." Kierownik (Integrator) sprawdza: czy optymalizacja stacji 3 nie spowolnila stacji 4?

> **Czy wiesz, ze...?**
> Core Web Vitals (Google) -- LCP, FID, CLS -- bezposrednio wplywaja na ranking
> w wyszukiwarce. Strona z LCP > 2.5s traci do 30% organicznego ruchu.
> Performance Boost jest zaprojektowany specjalnie do systematycznej poprawy
> tych metryk za pomoca cyklu Measure -> Fix -> Verify.

> **Uwaga!**
> Performance Boost optymalizuje ISTNIEJACY kod. Jesli Twoj endpoint nie istnieje --
> musisz go najpierw ZBUDOWAC (Solo, startup). Jesli endpoint jest ZLAMANY
> (zwraca 500) -- to bug, uzyj Quick Fix. Performance Boost jest WYLACZNIE
> dla kodu, ktory DZIALA, ale dziala ZA WOLNO.

### Sklad zespolu

#### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Opus |
| **Load** | 50/100 |
| **Warstwa** | STRATEGIA |
| **Narzedzia** | Agent, Read, Grep |
| **Tokeny/zadanie** | ~15-25K |
| **Koszt/zadanie** | ~$0.02-$0.05 |

Orkiestrator definiuje **cel wydajnosciowy** (np. "LCP < 1.5s") i koordynuje cykl Measure-Fix-Verify. Interpretuje metryki od Analysta, deleguje optymalizacje do Backend Dev, ewaluuje wyniki QA Performance, i decyduje: czy cel osiagniety, czy potrzebna kolejna iteracja, czy eskalacja.

#### Agent A-02: Analyst

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet |
| **Load** | 65/100 |
| **Warstwa** | PLANOWANIE |
| **Narzedzia** | Read, Grep, Bash (profiling, benchmarki) |
| **Tokeny/zadanie** | ~20-35K |
| **Koszt/zadanie** | ~$0.02-$0.06 |

Analyst w Performance Boost pelni role **profilera**: uruchamia benchmarki, analizuje flame graphs, identyfikuje waskie gardla (bottlenecks), mierzy baseline. Produkuje **raport wydajnosciowy**: metryki BEFORE, top 3 bottlenecks z estymowanym impactem, rekomendacje optymalizacji uszeregowane od highest-impact.

#### Agent B-01: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet |
| **Load** | 75/100 |
| **Warstwa** | BUILD |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |
| **Tokeny/zadanie** | ~25-40K |
| **Koszt/zadanie** | ~$0.03-$0.07 |

Backend Dev implementuje optymalizacje zidentyfikowane przez Analysta. Typowe interwencje: cache'owanie, optymalizacja query (indeksy, JOINy), lazy loading, code splitting, bundle optimization, connection pooling, batching, pagination. Nie zgaduje -- implementuje KONKRETNE rekomendacje z raportu Analysta.

#### Agent Q-03: QA Performance

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT |
| **Narzedzia** | Read, Grep, Bash (benchmarki, load testing) |
| **Tokeny/zadanie** | ~15-25K |
| **Koszt/zadanie** | ~$0.01-$0.03 |

QA Performance to **specjalistyczny audytor wydajnosci**. Nie sprawdza poprawnosci kodu (to rola QA Quality) -- sprawdza METRYKI. Uruchamia te same benchmarki co Analyst (baseline), porownuje BEFORE vs AFTER, i decyduje: czy cel wydajnosciowy osiagniety? Czy optymalizacja nie wpanedzila regresji wydajnosciowej w innym miejscu? Produkuje raport z delta metryk.

#### Agent B-04: Integrator

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet |
| **Load** | 65/100 |
| **Warstwa** | BUILD (integracja) |
| **Narzedzia** | Write, Edit, Bash, Read, Grep |
| **Tokeny/zadanie** | ~15-25K |
| **Koszt/zadanie** | ~$0.02-$0.05 |

Integrator laczy optymalizacje od Backend Dev z reszta systemu i weryfikuje, ze zmiany dzialaja w kontekscie calosci. Kluczowa rola: **regression check** -- czy optymalizacja endpointu /products nie spowolnila /orders? Czy nowy cache nie powoduje stale data? Czy bundle split nie zlamal lazy loading w innym miejscu?

### Diagram architektury -- Measure-Fix Cycle

```
+================================================================+
|          PERFORMANCE BOOST -- Measure-Fix Cycle                 |
|          Tier 2A | 4 Agentow                                   |
+================================================================+
|                                                                 |
|  FAZA 1: MEASURE (baseline)                                    |
|    +-------------------+     +-------------------+              |
|    |   ORKIESTRATOR     | --> |   ANALYST          |             |
|    |   A-00 | Opus      |     |   A-02 | Sonnet    |            |
|    |   "cel: LCP<1.5s"  |     |   profiling        |            |
|    +-------------------+     +--------+----------+              |
|                                       |                         |
|                        raport: baseline + bottlenecks           |
|                                       |                         |
|  FAZA 2: FIX                          v                         |
|    +-------------------+                                        |
|    |   BACKEND DEV      |                                       |
|    |   B-01 | Sonnet    |                                       |
|    |   optymalizacja    |                                       |
|    +--------+----------+                                        |
|             |                                                   |
|             v artefakt (zoptymalizowany kod)                    |
|                                                                 |
|  FAZA 3: VERIFY                                                |
|    +-------------------+     +-------------------+              |
|    | QA PERFORMANCE     | --> |   INTEGRATOR       |             |
|    | Q-03 | Haiku       |     |   B-04 | Sonnet    |            |
|    | benchmarki AFTER   |     |   integration test  |           |
|    +--------+----------+     +--------+----------+              |
|             |                         |                         |
|        delta metryki            system-wide check               |
|             |                         |                         |
|             +----------+--------------+                         |
|                        |                                        |
|                        v                                        |
|    +-------------------+                                        |
|    |   ORKIESTRATOR     |                                       |
|    |   cel osiagniety?  |                                       |
|    +--------+----------+                                        |
|             |                                                   |
|        +----+----+                                              |
|        |         |                                              |
|    TAK: DONE  NIE: kolejny bottleneck -> FAZA 2                 |
|                                                                 |
+================================================================+
|  Polaczenia: 6 (Ork->An, Ork->B, B->QP, B->Int, QP->Ork,     |
|              Int->Ork)                                          |
|  Tokeny: ~100-160K | Koszt: $0.08-$0.25 | ~90-180s            |
+================================================================+
```

### Wzorzec architektoniczny -- Measure-Fix Cycle

#### Czym jest Measure-Fix Cycle?

Measure-Fix Cycle to wzorzec iteracyjny oparty na **danych, nie intuicji**. Kazda iteracja: zmierz (Analyst), napraw (Backend Dev), zweryfikuj (QA Performance + Integrator). Cykl trwa az do osiagniecia zdefiniowanego celu lub wyczerpania budzetu.

Jest to adaptacja cyklu Deming (Plan-Do-Check-Act) do swiata agentowego: Plan (Analyst identyfikuje bottleneck), Do (Backend Dev optymalizuje), Check (QA Performance mierzy), Act (Orkiestrator decyduje: nastepny bottleneck lub koniec).

#### Dlaczego Measure PRZED Fix?

```
BEZ POMIARU (intuicja):
  Developer: "Pewnie baza jest wolna" -> dodaje cache Redis
  -> Endpoint nadal wolny -> "Moze to frontend?" -> dodaje lazy loading
  -> Nadal wolno -> "Moze CDN?" -> konfiguruje CDN
  -> Odkrycie: problem byl w N+1 query. 3 zmarnowane optymalizacje.

Z POMIAREM (Measure-Fix):
  Analyst: "Flame graph: 78% czasu w getProductsByCategory() --
  N+1 query, 47 SELECTow zamiast 1 JOIN."
  Backend Dev: dodaje JOIN + eager loading.
  QA Performance: "Endpoint: 2.3s -> 0.4s. Cel osiagniety."
  1 optymalizacja, 0 zmarnowanych.
```

#### Rownolegle vs sekwencyjne w fazie Verify

QA Performance i Integrator dzialaja **rownolegle** w fazie Verify:
- QA Performance mierzy METRYKI: czas odpowiedzi, przepustowosc, zuzycie pamieci
- Integrator sprawdza INTEGRACJE: czy optymalizacja nie zlamala czegos innego

Te dwie perspektywy sa komplementarne i niezalezne -- moga pracowac jednoczesnie.

### Workflow krok po kroku

```
KROK 1: Orkiestrator definiuje cel
         "Zoptymalizuj /api/products: cel LCP < 1.5s (obecne: 2.3s)"
         |
         v
KROK 2: Analyst profiluje (MEASURE)
         - Bash: ab -n 100 /api/products -> avg 2.3s, p95 3.1s
         - Bash: node --prof -> flame graph analysis
         - Identyfikacja:
           Bottleneck 1: N+1 query (78% czasu) -> impact: HIGH
           Bottleneck 2: Brak kompresji gzip (12% czasu) -> impact: MEDIUM
           Bottleneck 3: Brak cache headers (5% czasu) -> impact: LOW
         |
         v
KROK 3: Backend Dev optymalizuje (FIX)
         - Bottleneck 1: JOIN + eager loading (zamiast N+1)
         - Bottleneck 2: app.use(compression()) middleware
         - [Bottleneck 3: pominiety -- cel mozliwy bez niego]
         |
         +--- PARALLEL ---+
         |                 |
         v                 v
KROK 4a: QA Performance  KROK 4b: Integrator
  BEFORE: 2.3s avg        - /api/orders: OK (brak regresji)
  AFTER:  0.6s avg         - /api/users: OK
  Delta: -74%              - /api/auth: OK
  p95: 0.9s (< 1.5s)      - Bundle size: -2KB (gzip)
  Memory: stabilne         - All tests: PASS
  VERDICT: PASS            VERDICT: PASS
         |                 |
         +------+----------+
                |
                v
KROK 5: Orkiestrator: cel osiagniety (0.6s < 1.5s) -> DOSTARCZENIE
```

### Input/Output

**Input:**
- Cel wydajnosciowy (np. "LCP < 1.5s", "p95 < 500ms", "bundle < 200KB")
- Scope optymalizacji (endpoint, modul, caly system)
- Metryki baseline (opcjonalnie -- Analyst zmierzy)
- Ograniczenia (np. "nie zmieniaj bazy danych", "zachowaj kompatybilnosc API")

**Output:**
- Zoptymalizowany kod
- Raport BEFORE/AFTER z delta metryk
- Raport integracyjny (brak regresji)
- Lista zastosowanych optymalizacji z impactem kazdej

### Use cases

```
[+] UZYJ Performance Boost gdy:
    - API endpoint zbyt wolny (response time > SLA)
    - Core Web Vitals ponizej progow Google (LCP, FID, CLS)
    - Bundle size za duzy (> 500KB dla SPA)
    - Database queries za wolne (> 100ms avg)
    - Memory leaks lub excessive GC
    - Load test: system nie wytrzymuje docelowej liczby RPS

[-] NIE UZYWAJ Performance Boost gdy:
    - Endpoint nie dziala (-> Quick Fix -- to bug, nie perf)
    - Potrzebujesz nowej funkcjonalnosci (-> Solo, startup)
    - Problem jest w architekturze, nie w kodzie (-> Plan & Execute)
    - Optymalizacja premature (profil nieznany) -- NAJPIERW zmierz!
    - Frontend-only perf (-> Frontend-specific preset)
```

### Anti-patterny

#### Anti-pattern 1: Optymalizacja bez pomiaru

```
ZLE:  "Endpoint wolny" -> Backend Dev: "Dodam cache."
      -> Cache dodany, endpoint nadal wolny (problem byl w query, nie w cache)
DOBRZE: Analyst mierzy -> "N+1 query: 78% czasu" -> Backend Dev naprawia N+1
```

#### Anti-pattern 2: Optymalizacja wszystkiego naraz

```
ZLE:  Backend Dev: naprawia 5 bottleneckow jednoczesnie
      -> QA: "Szybciej, ale ktora zmiana pomogla?" -> niemierzalne
DOBRZE: 1 bottleneck per iteracje -> mierzalny impact kazdej zmiany
```

#### Anti-pattern 3: Brak regression check (Integrator pominiety)

```
ZLE:  /api/products: 2.3s -> 0.4s! Sukces!
      Ale /api/orders: 0.5s -> 3.2s (bo wspoldzielony cache inwalidowany)
DOBRZE: Integrator sprawdza WSZYSTKIE powiazane endpointy po optymalizacji
```

#### Anti-pattern 4: Cel nieosiagalny bez zmiany architektury

```
ZLE:  Cel: "p95 < 10ms" (obecne: 2.3s). Backend Dev optymalizuje i optymalizuje
      -> 5 iteracji, $0.50, nadal 400ms. Problem: architektura jest single-threaded.
DOBRZE: Po 2 iteracjach bez postepow -> eskalacja do Plan & Execute
        (zmiana architektury, nie mikro-optymalizacja)
```

### Realny scenariusz: Core Web Vitals dla e-commerce

**Cel:** "LCP < 2.5s, CLS < 0.1 (obecne: LCP 4.2s, CLS 0.35)"

**Analyst (MEASURE):**
```
PROFILING REPORT:
  LCP (4.2s):
    Bottleneck 1: Hero image 2.4MB bez kompresji (55% LCP)
    Bottleneck 2: Render-blocking CSS (25% LCP)
    Bottleneck 3: Synchronous JS bundle 1.2MB (20% LCP)
  CLS (0.35):
    Bottleneck 4: Brak width/height na obrazkach
    Bottleneck 5: Font swap powoduje layout shift
  REKOMENDACJA: Fix 1+4 najpierw (highest combined impact)
```

**Backend Dev (FIX -- iteracja 1):**
- Image: WebP conversion + srcset + lazy loading (2.4MB -> 180KB)
- Images: Explicit width/height attributes
- CSS: Critical CSS inline + async load reszty

**QA Performance + Integrator (VERIFY):**
```
AFTER iteracja 1:
  LCP: 4.2s -> 2.1s (PASS < 2.5s)
  CLS: 0.35 -> 0.08 (PASS < 0.1)
  Regresja: BRAK
  VERDICT: PASS -- cel osiagniety w 1 iteracji
```

**Wynik:** 1 iteracja | ~120K tokenow | $0.14 | ~130s

Gdyby cel nie zostal osiagniety po iteracji 1, Orkiestrator delegowalby Backend Dev do naprawienia Bottleneck 2 i 3 w iteracji 2.

### Sciezka eskalacji

```
Performance Boost (4) -> Performance Deep Dive (6-7):
  KIEDY: Optymalizacja wymaga zmian frontend + backend + database
  CO DODAJE: Frontend Dev + DBA + dodatkowy QA

Performance Boost (4) -> Plan & Execute (4):
  KIEDY: Problem wymaga zmiany architektury, nie mikro-optymalizacji
  CO ZMIENIA: Analyst -> Planner, inny workflow

Performance Boost (4) -> Quick Fix (3):
  KIEDY: "Wolny endpoint" to tak naprawde bug (np. nieskonczona petla)
  CO ODEJMUJE: Analyst + Integrator, dodaje QA Quality (deeskalacja + zmiana presetu)
```

---

## 7. Drzewo Decyzyjne -- Ktory Preset Wybrac?

```
Mam zadanie...
    |
    +-- Czy to NOWY content (tekst, docs, README)?
    |     +-- TAK -> CONTENT PIPELINE
    |     +-- NIE -> kontynuuj
    |
    +-- Czy to BUG do naprawy?
    |     +-- TAK -> Czy ma implikacje SECURITY?
    |     |           +-- TAK -> BUG HUNTER
    |     |           +-- NIE -> Czy prosty (1 plik, znany root cause)?
    |     |                       +-- TAK -> Quick Fix (Tier 1)
    |     |                       +-- NIE -> BUG HUNTER
    |     +-- NIE -> kontynuuj
    |
    +-- Czy to OPTYMALIZACJA WYDAJNOSCI?
    |     +-- TAK -> Czy kod DZIALA (nie jest zlamany)?
    |     |           +-- TAK -> PERFORMANCE BOOST
    |     |           +-- NIE -> Quick Fix (najpierw napraw buga)
    |     +-- NIE -> kontynuuj
    |
    +-- Czy to zadanie STRUKTURALNE (migracja, refactoring, reorganizacja)?
    |     +-- TAK -> Czy ma wiele krokow z zaleznosciami?
    |     |           +-- TAK -> PLAN & EXECUTE
    |     |           +-- NIE -> Solo lub Quick Fix (Tier 1)
    |     +-- NIE -> kontynuuj
    |
    +-- Czy to PROSTY TASK (1 plik, S/M zlozonosc)?
    |     +-- TAK -> Solo (Tier 1)
    |     +-- NIE -> kontynuuj
    |
    +-- Czy NIE WIEM jaka technologie uzyc?
    |     +-- TAK -> Recon Squad (Tier 1)
    |     +-- NIE -> kontynuuj
    |
    +-- Czy to PELNY FEATURE (frontend + backend + testy)?
          +-- TAK -> Tier 2B/Tier 3 (startup, feature_sprint)
```

### Skrot decyzyjny -- jedna minuta

| Pytanie | Odpowiedz | Preset |
|---------|-----------|--------|
| Bug z security? | TAK | Bug Hunter |
| Dokumentacja? | TAK | Content Pipeline |
| Migracja/refactoring? | TAK | Plan & Execute |
| Wydajnosc? | TAK | Performance Boost |
| Prosty bug? | TAK | Quick Fix (Tier 1) |
| Proste zadanie? | TAK | Solo (Tier 1) |
| Nie wiem co wybrac? | -- | Recon Squad (Tier 1) |

---

## 8. Porownanie Kosztow

### Tabela kosztow per preset

| Preset | Agentow | Tokeny (bazowo) | Koszt min | Koszt max | Koszt/iteracja |
|--------|---------|-----------------|-----------|-----------|----------------|
| Solo (Tier 1) | 2 | ~40-80K | $0.04 | $0.15 | N/A |
| Quick Fix (Tier 1) | 3 | ~80-120K | $0.08 | $0.20 | +$0.04-$0.09 |
| Recon (Tier 1) | 3 | ~80-120K | $0.08 | $0.20 | N/A |
| **Bug Hunter** | **4** | **~120-180K** | **$0.10** | **$0.28** | **+$0.06-$0.12** |
| **Content Pipeline** | **4** | **~100-180K** | **$0.08** | **$0.25** | **+$0.04-$0.08** |
| **Plan & Execute** | **4** | **~120-200K** | **$0.10** | **$0.30** | **+$0.05-$0.10/krok** |
| **Performance Boost** | **4** | **~100-160K** | **$0.08** | **$0.25** | **+$0.05-$0.10** |
| Startup (Tier 2B) | 5 | ~200-350K | $0.20 | $0.50 | +$0.08-$0.15 |

### Rozklad kosztow per agent (typowe zadanie)

**Bug Hunter ($0.16 typowe):**
```
Orkiestrator (Opus):    $0.05  (31%)  -- strategia + synteza
Backend Dev (Sonnet):   $0.06  (38%)  -- implementacja fix
QA Security (Haiku):    $0.02  (13%)  -- audyt bezpieczenstwa
QA Quality (Haiku):     $0.03  (18%)  -- audyt jakosci
```

**Content Pipeline ($0.15 typowe):**
```
Orkiestrator (Opus):    $0.04  (27%)  -- brief + ewaluacja
Res. Forums (Haiku):    $0.02  (13%)  -- research spolecznosciowy
Res. Tech (Haiku):      $0.02  (13%)  -- research techniczny
Writer (Sonnet):        $0.05  (34%)  -- tworzenie dokumentu
QA Quality (Haiku):     $0.02  (13%)  -- audyt tresci
```

**Plan & Execute ($0.22 typowe):**
```
Orkiestrator (Opus):    $0.06  (27%)  -- koordynacja + checkpointy
Analyst (Sonnet):       $0.04  (18%)  -- dekompozycja
Planner (Sonnet):       $0.03  (14%)  -- harmonogram
Backend Dev (Sonnet):   $0.07  (32%)  -- egzekucja krokowa
QA Quality (Haiku):     $0.02  (9%)   -- walidacja per krok
```

**Performance Boost ($0.14 typowe):**
```
Orkiestrator (Opus):    $0.04  (28%)  -- cel + decyzja
Analyst (Sonnet):       $0.04  (28%)  -- profiling
Backend Dev (Sonnet):   $0.04  (28%)  -- optymalizacja
QA Performance (Haiku): $0.02  (16%)  -- benchmarki AFTER
```

### ROI -- Kiedy Tier 2A sie oplaca?

```
Bug Hunter vs Quick Fix:
  Dodatkowy koszt: +$0.06 (QA Security)
  Wartosc: Wykrycie SQL injection PRZED produkcja
  ROI: Koszt incydentu security >> $0.06

Content Pipeline vs Solo Writer:
  Dodatkowy koszt: +$0.04 (2 Researchers)
  Wartosc: Dokumentacja oparta na DANYCH, nie halucynacjach
  ROI: 1 godzina szukania bledow w docs > $0.04

Plan & Execute vs Ad-hoc:
  Dodatkowy koszt: +$0.08 (Analyst + Planner)
  Wartosc: 83% mniej debugowania, izolowane bledy
  ROI: 1 dodatkowa iteracja ad-hoc > $0.08

Performance Boost vs "po prostu optymalizuj":
  Dodatkowy koszt: +$0.04 (Analyst profiling)
  Wartosc: Naprawiasz PRAWDZIWY bottleneck, nie zgadywany
  ROI: 1 zmarnowana optymalizacja > $0.04
```

---

## 9. Eskalacja do Tier 2B i Tier 3

### Kiedy Tier 2A nie wystarczy

| Sytuacja | Z presetu | Do presetu | Tier | Dlaczego |
|----------|-----------|-----------|------|----------|
| Bug wymaga researchu | Bug Hunter | Bug Hunt + Recon | 2B | Dodaj Researcher Security |
| Content wymaga kodu | Content Pipeline | Feature Sprint | 2B | Dodaj Backend Dev |
| Plan za zlozony (10+ krokow) | Plan & Execute | Full Migration | 3 | Dodaj wiecej Builderow |
| Perf wymaga zmian arch | Performance Boost | Plan & Execute + Perf | 2B+ | Polacz 2 presety |
| Zadanie obejmuje 3+ domeny | Jakikolwiek | Gold Standard | 3 | Pelna orkiestra 14 agentow |

### Sygnaly eskalacji

```
ESKALUJ Z BUG HUNTER gdy:
  - 3 iteracje bez PASS od QA Security
  - Bug okazuje sie zlozonym exploitem (chain attack)
  - Naprawa wymaga refaktoringu calego modulu auth

ESKALUJ Z CONTENT PIPELINE gdy:
  - Dokument wymaga dzialajacych przykladow kodu (nie snippetow)
  - Research nie wystarczy -- potrzebny POC
  - Content obejmuje 3+ modulow systemu

ESKALUJ Z PLAN & EXECUTE gdy:
  - Dekompozycja ujawnia 10+ podzadan z M-XL zlozonosci
  - Zadanie wymaga frontend + backend + database
  - Brak pojedynczego Buildera -- potrzebnych 2-3

ESKALUJ Z PERFORMANCE BOOST gdy:
  - 2 iteracje bez mierzalnej poprawy
  - Problem wymaga zmiany architektury (np. caching layer)
  - Optymalizacja wymaga zmian w 3+ warstwach (FE + BE + DB)
```

### Deeskalacja -- kiedy Tier 2A to za duzo

```
DEESKALUJ DO TIER 1 gdy:
  Bug Hunter -> Quick Fix: Brak wektora security (Orkiestrator ocenia)
  Content Pipeline -> Solo: Krotki dokument bez potrzeby researchu
  Plan & Execute -> Solo: 1 podzadanie, brak zaleznosci
  Performance Boost -> Quick Fix: "Wolny endpoint" to bug (np. infinite loop)
```

---

## 10. Quick Reference Cards

### Bug Hunter -- Quick Reference

```
+=========================================================================+
|                BUG HUNTER -- Quick Reference Card                        |
+=========================================================================+
|                                                                         |
|  PRESET ID:    bug_hunter                                               |
|  TIER:         2A (CORE)                                                |
|  PATTERN:      Fork Pattern (Dual QA Parallel)                          |
|  AGENTOW:      4                                                        |
|  TOKENY:       ~120-180K                                                |
|  KOSZT:        $0.10-$0.28                                              |
|  LATENCJA:     ~90-180 sekund                                           |
|                                                                         |
+---------+---------------------------------------------------------------+
|  ZESPOL |                                                               |
+---------+---------------------------------------------------------------+
|  A-00   |  Orkiestrator  | Opus   | Load 50 | STRATEGIA  | triage     |
|  B-01   |  Backend Dev   | Sonnet | Load 75 | BUILD      | fix        |
|  Q-01   |  QA Security   | Haiku  | Load 55 | QA/AUDYT   | OWASP      |
|  Q-02   |  QA Quality    | Haiku  | Load 55 | QA/AUDYT   | testy      |
+---------+---------------------------------------------------------------+
|                                                                         |
|  WORKFLOW:                                                              |
|    Ork --[one]--> B-01 --[fork]--> Q-01 (sec) || Q-02 (qual)          |
|    Q-01 + Q-02 --[join]--> Ork --[PASS/FAIL]-->                        |
|                                                                         |
|  USE CASES: [+] SQL injection, XSS, auth bugs, security-critical code  |
|             [-] Proste bugi, nowe features, UI/CSS, research            |
|                                                                         |
|  ESKALACJA: Bug Hunt Extended (5-6) | Full Stack Hunt (6-7)            |
|  DEESKALACJA: Quick Fix (3) jesli brak wektora security                |
|                                                                         |
|  ZASADA: "Dwa niezalezne audyty > jeden podwojnie dokladny"            |
|                                                                         |
+=========================================================================+
```

### Content Pipeline -- Quick Reference

```
+=========================================================================+
|             CONTENT PIPELINE -- Quick Reference Card                     |
+=========================================================================+
|                                                                         |
|  PRESET ID:    content_pipeline                                         |
|  TIER:         2A (CORE)                                                |
|  PATTERN:      Linear Pipeline (Parallel Research)                      |
|  AGENTOW:      4                                                        |
|  TOKENY:       ~100-180K                                                |
|  KOSZT:        $0.08-$0.25                                              |
|  LATENCJA:     ~120-240 sekund                                          |
|                                                                         |
+---------+---------------------------------------------------------------+
|  ZESPOL |                                                               |
+---------+---------------------------------------------------------------+
|  A-00   |  Orkiestrator     | Opus   | Load 50 | STRATEGIA | brief     |
|  R-01   |  Researcher Forum | Haiku  | Load 55 | RESEARCH  | community |
|  R-02   |  Researcher Tech  | Haiku  | Load 55 | RESEARCH  | official  |
|  W-01   |  Writer           | Sonnet | Load 70 | BUILD     | content   |
|  Q-02   |  QA Quality       | Haiku  | Load 55 | QA/AUDYT  | review    |
+---------+---------------------------------------------------------------+
|                                                                         |
|  WORKFLOW:                                                              |
|    Ork --[parallel]--> R-01 || R-02 --[join]--> Writer --> QA --> Ork   |
|                                                                         |
|  USE CASES: [+] README, docs API, artykuly, raporty, changelogi        |
|             [-] Kod, implementacja, research-only, kroki teksty         |
|                                                                         |
|  ESKALACJA: Content Factory (6-7) | Feature Sprint (content + code)    |
|  DEESKALACJA: Solo (2) jesli brak potrzeby researchu                   |
|                                                                         |
|  ZASADA: "Dokumentacja oparta na danych, nie na wyobrazni"             |
|                                                                         |
+=========================================================================+
```

### Plan & Execute -- Quick Reference

```
+=========================================================================+
|              PLAN & EXECUTE -- Quick Reference Card                      |
+=========================================================================+
|                                                                         |
|  PRESET ID:    plan_exec                                                |
|  TIER:         2A (CORE)                                                |
|  PATTERN:      Plan-and-Execute Loop                                    |
|  AGENTOW:      4                                                        |
|  TOKENY:       ~120-200K                                                |
|  KOSZT:        $0.10-$0.30                                              |
|  LATENCJA:     ~120-240 sekund                                          |
|                                                                         |
+---------+---------------------------------------------------------------+
|  ZESPOL |                                                               |
+---------+---------------------------------------------------------------+
|  A-00   |  Orkiestrator  | Opus   | Load 50 | STRATEGIA  | koordynacja|
|  A-02   |  Analyst       | Sonnet | Load 65 | PLANOWANIE | dekompoz.  |
|  A-03   |  Planner       | Sonnet | Load 60 | PLANOWANIE | harmonogram|
|  B-01   |  Backend Dev   | Sonnet | Load 75 | BUILD      | egzekucja  |
|  Q-02   |  QA Quality    | Haiku  | Load 55 | QA/AUDYT   | per-krok   |
+---------+---------------------------------------------------------------+
|                                                                         |
|  WORKFLOW:                                                              |
|    Ork --> Analyst --> Planner --> [B-01 --> QA] x N krokow --> Ork     |
|                                                                         |
|  USE CASES: [+] Migracje, refactoring, reorganizacja, upgrade FW       |
|             [-] Proste taski, bugi, research, performance               |
|                                                                         |
|  ESKALACJA: Full Migration (7-8) | Plan Exec Extended (5-6)            |
|  DEESKALACJA: Solo (2) / Quick Fix (3) jesli 1 podzadanie              |
|                                                                         |
|  ZASADA: "83% oszczednosci: planuj inkrementalnie, wykonuj krokowo"    |
|                                                                         |
+=========================================================================+
```

### Performance Boost -- Quick Reference

```
+=========================================================================+
|            PERFORMANCE BOOST -- Quick Reference Card                     |
+=========================================================================+
|                                                                         |
|  PRESET ID:    perf_boost                                               |
|  TIER:         2A (CORE)                                                |
|  PATTERN:      Measure-Fix Cycle                                        |
|  AGENTOW:      4                                                        |
|  TOKENY:       ~100-160K                                                |
|  KOSZT:        $0.08-$0.25                                              |
|  LATENCJA:     ~90-180 sekund                                           |
|                                                                         |
+---------+---------------------------------------------------------------+
|  ZESPOL |                                                               |
+---------+---------------------------------------------------------------+
|  A-00   |  Orkiestrator     | Opus   | Load 50 | STRATEGIA | cel      |
|  A-02   |  Analyst          | Sonnet | Load 65 | PLANOWANIE| profiling|
|  B-01   |  Backend Dev      | Sonnet | Load 75 | BUILD     | optimize |
|  Q-03   |  QA Performance   | Haiku  | Load 55 | QA/AUDYT  | benchmark|
|  B-04   |  Integrator       | Sonnet | Load 65 | BUILD     | regresja |
+---------+---------------------------------------------------------------+
|                                                                         |
|  WORKFLOW:                                                              |
|    Ork --> Analyst (measure) --> B-01 (fix) --> [QP || Int] --> Ork     |
|                                                                         |
|  USE CASES: [+] API perf, Core Web Vitals, bundle size, query speed    |
|             [-] Bugs, nowe features, architektura, content              |
|                                                                         |
|  ESKALACJA: Perf Deep Dive (6-7) | Plan & Execute (zmiana arch)        |
|  DEESKALACJA: Quick Fix (3) jesli to bug, nie perf                     |
|                                                                         |
|  ZASADA: "Measure first. Fix what matters. Verify everything."         |
|                                                                         |
+=========================================================================+
```

---

## 11. Slowniczek

| Termin | Definicja |
|--------|-----------|
| **Fork Pattern** | Wzorzec rozgalezienia: jeden strumien dzieli sie na dwa rownolegle, ktore pozniej lacza sie (join). W Bug Hunter: artefakt fork'owany do 2 QA. |
| **Linear Pipeline** | Wzorzec sekwencyjny: dane przeplywaja przez serie etapow w jednym kierunku. Kazdy etap przetwarza output poprzedniego. |
| **Plan-and-Execute Loop** | Wzorzec dwufazowy: faza planowania (Analyst + Planner) tworzy harmonogram, faza egzekucji realizuje go krok po kroku z walidacja. |
| **Measure-Fix Cycle** | Wzorzec iteracyjny: zmierz (profiling) -> napraw (optymalizacja) -> zweryfikuj (benchmarki). Powtarzaj az do osiagniecia celu. |
| **Dual QA** | Dwa niezalezne audyty rownolegle: QA Security (bezpieczenstwo) + QA Quality (jakosc). Eliminuje single-point-of-failure w walidacji. |
| **Fork/Join** | Operacja rozdzielenia pracy na rownolegle strumienie (fork) i polaczenia wynikow (join). Redukuje latencje przy zachowaniu niezaleznosci. |
| **Bottleneck** | Waskie gardlo: element systemu ograniczajacy wydajnosc calosci. Identyfikowany przez profiling, nie intuicje. |
| **Baseline** | Pomiar referencyjny PRZED optymalizacja. Bez baseline nie mozna zmierzyc poprawy. |
| **Delta metryki** | Roznica miedzy BEFORE i AFTER: np. "LCP: 4.2s -> 0.6s, delta: -3.6s (-86%)". |
| **Inkrementalna egzekucja** | Realizacja planu krok po kroku z walidacja po kazdym kroku. Blad wykryty wczesnie = tani do naprawy. |
| **Checkpoint** | Punkt kontrolny w planie: QA weryfikuje inkrement przed przejsciem do nastepnego kroku. |
| **N+1 Query** | Anty-wzorzec bazodanowy: 1 query glowne + N dodatkowych per rekord. Rozwiazanie: JOIN lub eager loading. |
| **Core Web Vitals** | Metryki Google: LCP (Largest Contentful Paint), FID (First Input Delay), CLS (Cumulative Layout Shift). |
| **OWASP Top 10** | Lista 10 najczestszych podatnosci webowych: injection, broken auth, XSS, insecure deserialization, itd. |
| **Narrow Context Principle** | Agent dostaje TYLKO informacje potrzebne do zadania. Mniej kontekstu = mniej halucynacji, nizszy koszt. |
| **Smart Model Routing** | Dopasowanie modelu do zadania: Opus ($15) dla decyzji, Sonnet ($3) dla buildu, Haiku ($0.80) dla QA. |
| **Triage** | Wstepna ocena severity i typu problemu. Orkiestrator triaguje bug przed wyborem presetu/strategii. |
| **Deeskalacja** | Przekazanie do mniejszego presetu gdy obecny jest zbyt duzy (over-engineered) dla zadania. |
| **Groupthink** | Mysl grupowa: tendencja do konformizmu w grupie. Rownolegle QA eliminuje groupthink przez izolacje. |
| **Flame Graph** | Wizualizacja profilu wydajnosciowego: kazda funkcja jako pasek proporcjonalny do czasu wykonania. |
| **Regression Check** | Weryfikacja, ze nowa zmiana nie pogorszyla istniejacych funkcjonalnosci. |

---

## Zrodla

- **Gold Standard Agent Architecture 2026** -- referencyjny template 14 agentow w 4 fazach
- **MASTERCLASS: Zespoly Agentow AI 2026** -- kompletny przewodnik z anty-wzorcami i kalkulatorem kosztow
- **Agent Teams Configurator v8/v9** -- narzedzie do wizualnego projektowania architektur z 27 presetami
- **Anthropic Model Pricing 2026** -- oficjalne ceny Opus ($15/$75), Sonnet ($3/$15), Haiku ($0.80/$4)
- **Google Multi-Agent Systems Study 2024** -- iterative vs one-shot: +80.9%, plan-then-execute: +47%
- **OWASP Top 10 (2025 Edition)** -- standard audytu bezpieczenstwa aplikacji webowych
- **Google Core Web Vitals Documentation** -- LCP, FID, CLS -- metryki wydajnosci webowej
- **Brooks, F. (1975) "The Mythical Man-Month"** -- komunikacja w zespolach rosnie kwadratowo
- **Amazon "Two Pizza Rule"** -- optymalna wielkosc zespolu: 3-8 osob
- **Deming Cycle (PDCA)** -- Plan-Do-Check-Act jako fundament cyklu Measure-Fix
- **IEEE Standard for Software Quality Assurance** -- dual audit, niezaleznosc audytorow
- **OBSERVATORY Architecture** -- case study systemu z orkiestracja wieloagentowa

---
---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz prezentacje wideo (5-7 minut) o czterech presetach Tier 2A CORE (Bug Hunter, Content Pipeline, Plan & Execute, Performance Boost) w architekturze Gold Standard 2026 -- dlaczego 4 agenty to "sweet spot" specjalizacji.

### Motyw wizualny calej prezentacji:
- **Tlo:** Ciemny gradient (#111827 do #1F2937) -- estetyka "mission control" / centrum dowodzenia wojskowego
- **Kolor przewodni:** Zielony (#22C55E) -- energia, wzrost, optymalizacja
- **Kolory identyfikacyjne presetow:**
  - Bug Hunter = czerwony (#EF4444) -- alert, bezpieczenstwo, zagrozenie
  - Content Pipeline = niebieski (#3B82F6) -- wiedza, dokumentacja, przeplyw
  - Plan & Execute = zolty (#EAB308) -- strategia, planowanie, swiatlo
  - Performance Boost = zielony (#22C55E) -- szybkosc, wydajnosc, wzrost
- **Strzalki i polaczenia:** Swiecace neonowo w kolorze presetu, animowane "flow particles" plynace wzdluz polaczen
- **Typografia:** Monospace (JetBrains Mono) dla kodu, diagramow i metryk. Sans-serif (Inter) dla narracji i naglowkow. H1: 48px Bold. H2: 32px SemiBold. Body: 20px Regular.
- **Ikony:** Outline style, monochromatyczne z akcentem kolorystycznym presetu. Agenty jako kolka z literami (A-00, B-01, Q-01). Wzorce jako schematy blokowe.
- **Efekty specjalne:** Glow na aktywnych elementach (box-shadow: 0 0 20px kolor_presetu), subtylny scanline effect na tle (jak stary monitor CRT), pulsujace wezly agentow

### Struktura prezentacji:

**[0:00-0:35] HOOK -- "Sila Czworki"**
Ekran: absolutna czernia (#000000). Po 1 sekundzie w centrum pojawia sie liczba "4" animowana jako digital counter (0...1...2...3...4), kazda cyfra z efektem glitch/static. Z kazdym tickiem pojawia sie nowy wezel agenta swiecacy neonowo:
- Przy "1" -- jeden wezel (szary, pulsujacy slabo) -- "za malo"
- Przy "2" -- Solo (2 wezly, szare, polaczone jedna linia) -- "minimum"
- Przy "3" -- Quick Fix (3 wezly, szare, trojkat) -- "feedback loop"
- Przy "4" -- cztery neonowe wezly EKSPLODUJACE zielonym swiatlem (#22C55E), polaczone swiecacymi liniami tworzacymi rombus. Dźwiek: bass drop.
Tekst pojawia sie litera po literze, styl maszyna do pisania: "Cztery agenty. Cztery specjalizacje. Zero nadmiaru."
Podtekst fade-in: "Tier 2A CORE -- sweet spot architektury wieloagentowej."
Statystyka szokowa z animacja counter: "Przy 4 agentach: 6 mozliwych polaczen. Przy 7: 21. Przy 14: 91."
Animacja: siatka polaczen 4 agentow (prosta, czytelna, zielona) VS siatka 14 agentow (splatana, chaotyczna, szara) -- ogromna roznica wizualna. Tekst: "Zlozonosc rosnie KWADRATOWO. Efektywnosc NIE."

**[0:35-1:30] KONTEKST -- Cztery presety na osi**
Animacja budowania wykresu 2D na ciemnym tle z siatka (#333333 linie):
- Os X = "SEKWENCYJNE <---> ROWNOLEGLE" (biala etykieta)
- Os Y = "SPECJALIZACJA <---> WERYFIKACJA" (biala etykieta)
Cztery presety pojawiaja sie z efektem "drop-in" (spadaja z gory i odbijaja sie lekko):
- Content Pipeline (gorny lewy kwadrant, niebieski dot) -- label: "Docs & Raporty"
- Plan & Execute (gorny prawy, zolty dot) -- label: "Migracje & Refactoring"
- Performance Boost (dolny lewy, zielony dot) -- label: "Speed & Metryki"
- Bug Hunter (dolny prawy, czerwony dot) -- label: "Security & Debugowanie"
Strzalki od srodka wykresu do kazdego presetu z neonowa poswiatka. Tekst na srodku: "4 agenty, 4 filozofie, 1 tier."
Tabela porownawcza fade-in na 4 sekundy: kolumny Preset | Wzorzec | Agenty | Tokeny | Koszt. Kazdy wiersz podswietla sie kolorem presetu.
Dodatkowy element: mini-timeline na dole ekranu pokazujacy Tier 1 (2-3 agenty, szary) -> Tier 2A (4 agenty, zielony, "TU JESTESMY") -> Tier 2B (5-7, szary) -> Tier 3 (8-14, szary).

**[1:30-2:45] PRESET 1 -- Bug Hunter (czerwony motyw)**
Przejscie: czerwona fala (wipe) przeplywajaca przez ekran od lewej.
Tlo zmienia odcien na ciemno-czerwony (#1a0505) z subtylnym gradientem.
Naglowek: "BUG HUNTER" w Inter Bold 48px, czerwony (#EF4444), z ikona tarczy.
Animacja "FORK" -- kluczowy moment prezentacji:
1. Jeden strumien (Backend Dev, biale swiatlo) plynie w dol od Orkiestratora (zloty wezel u gory).
2. Strumien dociera do punktu rozwidlenia -- efekt "rozerwania" swiatla na dwa.
3. LEWY strumien (QA Security, czerwony) i PRAWY strumien (QA Quality, pomaranczowy) biegna rownolegle -- dwa pulsujace kanaly.
4. Oba strumienie lacza sie (JOIN) w Orkiestratorze na dole -- efekt fuzji swiatla.
Tekst nad animacja: "Dwa niezalezne audyty. Zero groupthink. Zero bias."
Scenariusz animowany (30s):
- Bug report: "Crash przy O'Brien" (czerwona koperta wlatuje na ekran)
- Terminal: kod BEFORE z czerwonym podswietleniem (string concatenation SQL query)
- Backend Dev koduje (animacja pisania w terminalu, biale znaki)
- Terminal: kod AFTER z zielonym podswietleniem (parameterized query)
- FORK: artefakt rozdziela sie na dwie sciezki
- QA Security: "OWASP CHECK: SQL Injection PASS. Input sanitization PASS." (zielone checkmarki)
- QA Quality: "12/12 PASS. Coverage 87%. Edge cases: OK." (zielone checkmarki)
- JOIN: Orkiestrator: "Oba QA PASS. Dostarczenie." (zloty stempel "APPROVED")
Metryki na dolnym pasku: "1 iteracja | ~140K tokenow | $0.16 | 120s"
Use cases: 3 zielone etykiety "SQL injection, XSS, auth bugs" + 3 czerwone "Proste bugi, UI/CSS, features"

**[2:45-3:50] PRESET 2 -- Content Pipeline (niebieski motyw)**
Przejscie: niebieska fala od prawej.
Tlo: ciemno-niebieski (#050a1a) z subtylnymi liniami przeplywu.
Naglowek: "CONTENT PIPELINE" w Inter Bold 48px, niebieski (#3B82F6), z ikona piora.
Animacja "PIPELINE" -- tasma produkcyjna:
1. Dwa wejscia rownolegle z lewej strony: Researcher Forums (ikona lupy + ikona forum) i Researcher Tech (ikona lupy + ikona dokumentu). Dwa strumienie danych (niebieskie swiecace cząsteczki) plyna rownolegle w prawo.
2. Oba strumienie wpadaja do "lejka syntezy" (animacja grawitacyjna, czasteczki wiruja i sie lacza).
3. Polaczony strumien plynie do Writer (biala ikona piora na niebieskim tle) -- animacja pisania tekstu, linia po linii.
4. Dokument (ikona pliku z tekstem) plynie do QA Quality (niebieska lupa) -- skanowanie.
5. PASS = dokument leci w prawo do uzytkownika z efektem "wydruku" (papier wylatuje z drukarki).
Analogia (5s): split screen -- LEWA: redakcja gazety (reporterzy, dziennikarz, korektor). PRAWA: diagram Content Pipeline.
Scenariusz (25s):
- Brief: "README dla form-validator, audience: mid-level devs"
- Researcher Forums: "Stack Overflow: 47 pytan, top 3 problemy" (animowane karty problemow)
- Researcher Tech: "23 funkcje, TS support, 12KB gzipped" (tabela specyfikacji)
- Writer: README formuje sie na ekranie sekcja po sekcji (animacja budowania dokumentu)
- QA: FAIL -- "Brak validateAsync timeout param" (czerwony X, zoom na brakujacy element)
- Iteracja 2: Writer dodaje. QA: PASS (zielony checkmark, confetti subtylne)
Metryki: "2 iteracje | ~150K tokenow | $0.18 | 180s"

**[3:50-5:00] PRESET 3 -- Plan & Execute (zolty motyw)**
Przejscie: zolta fala od dolu.
Tlo: ciemno-zolty (#1a1505) z subtylna siatka planowania (jak papier milimetrowy w zoltym odcieniu).
Naglowek: "PLAN & EXECUTE" w Inter Bold 48px, zolty (#EAB308), z ikona mapy ze szpilkami.
Animacja "PLAN" (20s):
1. Analyst (ikona lupy, zolta poswiatka) skanuje codebase -- pliki pojawiaja sie jako kafelki i sa "rozbijane" na puzzle (animacja fragmentacji).
2. Planner (ikona kalendarza, jasnozolta) uklada puzzle w timeline -- fazy pojawiaja sie jako paski Gantta animowane od lewej do prawej. Kazda faza z etykieta: "Krok 1: Schema", "Krok 2: Modele", "Krok 3: Relacje", "Krok 4: Migracja", "Krok 5: Testy".
Animacja "EXECUTE" (25s):
3. Backend Dev (ikona mlotka) realizuje krok po kroku -- po kazdym kroku progress bar wypelnia sie o 20%.
4. Po Kroku 1: QA daje zielony PASS (checkmark z dzwiekiem chime).
5. Po Kroku 2: QA daje zielony PASS.
6. Po Kroku 3: QA daje CZERWONY FAIL (X z dzwiekiem buzz). Backend Dev poprawia (szybka animacja edycji). QA ponownie: zielony PASS.
7. Po Kroku 4, 5: zielone PASS. Progress bar pelny. Zloty stempel "COMPLETE".
Tekst kluczowy: "83% oszczednosci vs ad-hoc."
Split screen porownanie (10s):
- LEWA (czerwona ramka): "AD-HOC" -- caly task naraz, blad na koncu, strzalka cofajaca do poczatku, duzy napis "$$$"
- PRAWA (zielona ramka): "PLAN & EXECUTE" -- krok-po-kroku, blad w kroku 3, strzalka cofajaca TYLKO krok 3, maly napis "$"
- Srodek: strzalka "83% taniej" w zlotym kolorze
Scenariusz: migracja JS -> TS. 5 krokow na pasku Gantta. Krok 3 pulsuje (iteracja). Metryki: "6 iteracji total | $0.24 | 200s".

**[5:00-5:50] PRESET 4 -- Performance Boost (zielony motyw)**
Przejscie: zielona fala od gory.
Tlo: ciemno-zielony (#051a0a) z subtylnymi liniami wykresow (jak ekran oscilloskopu).
Naglowek: "PERFORMANCE BOOST" w Inter Bold 48px, zielony (#22C55E), z ikona rakiety.
Animacja "CYCLE" -- kolo Deming (Plan-Do-Check-Act):
1. Kolo z 4 segmentami obraca sie powoli. Kazdy segment podswietla sie przy aktywacji:
   - MEASURE (Analyst, ikona stopera, zielony) -- flame graph pojawia sie z podswietlonym bottleneckiem (czerwony blok "N+1 query: 78% czasu")
   - FIX (Backend Dev, ikona rakiety, bialy) -- czerwony blok kurczy sie animacyjnie z 78% do 5%
   - VERIFY (QA Performance + Integrator, ikona wykresu, jasnozielony) -- metryki BEFORE (czerwone cyfry) transformuja sie w AFTER (zielone cyfry) z efektem "flip counter"
   - DECIDE (Orkiestrator, zloty) -- stempel "CEL OSIAGNIETY" lub strzalka "KOLEJNY BOTTLENECK"
2. Scenariusz Core Web Vitals (20s):
   - LCP 4.2s (duza czerwona cyfra, pulsujaca) -> analiza: "hero image 2.4MB" (ikona obrazka z wagą)
   - Backend Dev: WebP conversion + srcset + lazy loading (terminal z animacja kodu)
   - LCP 2.1s (duza zielona cyfra, efekt "celebration") -- strzalka w dol "-50%"
   - CLS 0.35 (czerwona) -> "brak width/height" -> explicit dimensions -> CLS 0.08 (zielona) -- "-77%"
3. Integrator: 4 endpointy jako kafelki, kazdy z zielonym checkmarkiem "brak regresji"
Metryki: "1 iteracja | ~120K tokenow | $0.14 | 130s"

**[5:50-6:30] DRZEWO DECYZYJNE -- interaktywny wybor**
Przejscie: fade z zielonego do neutralnego ciemnego.
Animacja drzewa decyzyjnego budujacego sie od korzenia:
1. Korzen: "Mam zadanie..." (bialy owal, centralnie, duzy)
2. Galaz 1 rozrasta sie w prawo: "Bug z security?" -- jesli TAK: czerwona swiecaca strzalka do "BUG HUNTER" (czerwona etykieta z ikona tarczy). Jesli NIE: szara strzalka w dol.
3. Galaz 2: "Dokumentacja?" -- TAK: niebieska strzalka do "CONTENT PIPELINE" (niebieska etykieta z ikona piora). NIE: szara w dol.
4. Galaz 3: "Migracja/refactoring?" -- TAK: zolta strzalka do "PLAN & EXECUTE" (zolta z mapa). NIE: szara w dol.
5. Galaz 4: "Wydajnosc?" -- TAK: zielona strzalka do "PERFORMANCE BOOST" (zielona z rakieta). NIE: szara w dol.
6. Dol: "Prosty task?" -- TAK: szara strzalka do "Solo/Quick Fix (Tier 1)".
Kazda galaz animuje sie sekwencyjnie (1.5s na galaz). Po zbudowaniu -- cale drzewo pulsuje raz jak neonowy schemat. Efekt: swiecacy schemat decyzyjny.

**[6:30-7:00] ZAMKNIECIE -- "Sweet Spot"**
Powrot do hooka: cztery neonowe wezly w rombusie na czarnym tle, kazdy w swoim kolorze. Wezly pulsuja synchronicznie z basem muzyki.
Tekst: "Cztery agenty. Szesc polaczen. Nieskonczone mozliwosci." (fade-in, bialy, bold, 48px)
Tabela podsumowujaca (5s): 4 wiersze, kazdy w kolorze presetu: Bug Hunter | Fork | $0.16 | Security. Content Pipeline | Pipeline | $0.15 | Docs. Plan & Execute | Plan-Exec | $0.22 | Migracje. Performance Boost | Measure-Fix | $0.14 | Speed.
Motto fade-in: "Tier 2A CORE -- wystarczajaco duzo na specjalizacje, wystarczajaco malo na efektywnosc."
Ostatnia klatka: logo "Gold Standard 2026" w srodku ekranu, otoczone czterema kolorowymi wezlami tworzacymi rombus. Linie miedzy wezlami swiecace neonowo. Pod logo: "agent-architecture.design" w 16px, opacity 60%. Fade to black.

### Muzyka i dzwiek:
- **Styl:** Elektroniczna, "mission control" vibe. Syntezatory analogowe, deep sub-bass, high-pass sweeps.
- **BPM:** 90-100 BPM. Stalyl puls basu przez cala prezentacje jak bicie serca systemu.
- **Motywy per preset:** Bug Hunter = napiety, alertowy (staccato stringi, alarm beeps w tle). Content Pipeline = plynny, flow (pad synths, delikatne arpeggia). Plan & Execute = rytmiczny, krokowy (click-click-click jak stukanie klawiatury, metronomowy beat). Performance Boost = przyspieszajacy, rosnacy (riser buildup, tempo +10% BPM w sekcji).
- **Efekty dzwiekowe:** Przejscia miedzy presetami: krotki "swoosh" (white noise sweep, 0.3s). PASS: krotki pozytywny chime (C major chord, bell synth). FAIL: przyciszony buzz (low frequency, 0.2s). Typing sounds: przy animacjach terminala. Drop/impact: przy pojawianiu sie wezlow agentow.
- **Hook i zamkniecie:** Pelna kompozycja ze wszystkimi elementami muzycznymi. Crescendo w ostatnich 10 sekundach -- wszystkie 4 motywy lacza sie w jeden akord (C major 7th z basem).

### Tempo i timing:
- Hook: 5s/klatka (szybkie, dynamiczne, przyciagajace)
- Kontekst: 6-8s/klatka (wystarczajaco na odczytanie tabeli)
- Presety: 8-12s/klatka (czas na zrozumienie diagramu)
- Scenariusze: 3-5s/klatka (szybkie animacje terminala, dynamiczne)
- Drzewo decyzyjne: 4s/galaz (czas na przeczytanie pytania i odpowiedzi)
- Zamkniecie: 8-10s/klatka (wolniejsze, refleksyjne, zapamietanie)
- Calkowity czas: 6:30-7:00

### Tekst na ekranie:
- ZAWSZE bialy (#FFFFFF) na ciemnym tle
- Kluczowe slowa w kolorze presetu (np. "Fork" w czerwonym, "Pipeline" w niebieskim)
- Metryki w JetBrains Mono (np. "$0.16", "120K tokenow", "83%")
- Naglowki w Inter Bold 48px
- Podtytuly w Inter Regular 24px
- Kod w JetBrains Mono 16px na ciemnym tle (#0D1117) z syntax highlighting (strings: zielone, keywords: fioletowe, komentarze: szare)
- Nigdy wiecej niz 3 linie tekstu na ekranie jednoczesnie

### Przejscia:
- Miedzy presetami: "wipe" kolorowa fala w kolorze NASTEPNEGO presetu (np. z czerwonego Bug Hunter na niebieski Content Pipeline: niebieska fala przeplywajaca przez ekran od lewej do prawej, czas: 0.5s)
- Miedzy sekcjami wewnatrz presetu: fade 0.3s z lekkim zoom-in (scale 1.0 -> 1.02)
- Miedzy krokami workflow: slide-left z efektem "karty przesuwane na stole" (ease-out, 0.4s)
- Hook -> Kontekst: dissolve 1.0s (powolne, budujace napiecie)
- Drzewo -> Zamkniecie: fade to black 0.5s, potem fade from black 0.5s (reset wizualny)

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike (1080x3500px) o czterech presetach Tier 2A CORE (Bug Hunter, Content Pipeline, Plan & Execute, Performance Boost) w architekturze Gold Standard 2026.

**Kolorystyka calej infografiki:** Ciemne tlo (#111827) z subtylnym noise texture. Cztery kolory identyfikacyjne presetow: Bug Hunter = czerwony (#EF4444), Content Pipeline = niebieski (#3B82F6), Plan & Execute = zolty (#EAB308), Performance Boost = zielony (#22C55E). Bialy tekst (#FFFFFF) z opacity 90% dla body, 100% dla naglowkow. Ramki kart: zaokraglone (border-radius 12px) z 1px border w kolorze presetu. Cienie: 0 4px 20px rgba(0,0,0,0.3). Ikony: outline style, monochromatyczne z akcentem kolorystycznym. Typografia: naglowki Inter Bold, body Inter Regular, kod JetBrains Mono. H1: 42px, H2: 28px, H3: 20px, body: 14px, code: 12px. Odstepy miedzy sekcjami: 40px.

**[NAGLOWEK -- 1080x280px]**
Ciemne tlo z subtylnym gradient (#111827 -> #0F172A). Centrum: tytul "PRESETY TIER 2A -- CORE" w Inter Bold 42px, bialy. Podtytul: "Sila Czworki | 4 Presety x 4 Agenty | Sweet Spot Specjalizacji" w Inter Regular 18px, opacity 70%. Pod tytulem: cztery male kolka w kolorach presetow (czerwony, niebieski, zolty, zielony) ustawione w linii, polaczone cieniutka biala linia. Pod kolkami etykiety: "Bug Hunter | Content Pipeline | Plan & Execute | Performance Boost" w 12px. Dekoracja: subtelna siatka hexagonalna w tle z opacity 5%. Lewy gorny rog: "Gold Standard 2026" w 10px, opacity 40%. Prawy gorny rog: "Tier 2A | 4 Agentow | $0.08-$0.30" w 10px.

**[SEKCJA 1: DLACZEGO 4 AGENTY? -- 1080x280px]**
Tytul sekcji: "Dlaczego 4 agenty to sweet spot?" z ikona diamentu w zielonym (#22C55E). Trzy kolumny:
- LEWA: "Tier 1 (2-3)" z szara ramka. Ikony: 2-3 malych kolek. Tekst: "Brak specjalizacji. QA LUB research, nigdy oba."
- SRODEK: "Tier 2A (4)" z zielona ramka (#22C55E), podswietlona. Ikony: 4 kolka polaczone. Tekst: "Specjalizacja + niska komunikacja. 6 polaczen max. 15-20% overhead."
- PRAWA: "Tier 3 (8-14)" z szara ramka. Ikony: 14 kolek polaczonych siatka. Tekst: "Pelna orkiestra ale 91 polaczen. 30-40% overhead."
Pod kolumnami: strzalka z etykieta "SWEET SPOT" wskazujaca na srodkowa kolumne. Statystyka: "ROI: +50-100% koszt, +200-300% wartosc vs Tier 1."

**[SEKCJA 2: PRZEGLAD 4 PRESETOW -- 1080x350px]**
Tytul: "4 Presety, 4 Filozofie" z ikona siatki 2x2. Siatka 2x2 z kartami:
- GORA-LEWO: Bug Hunter (czerwona ramka). Ikona: tarcza z lupia. "Fork Pattern | Dual QA | $0.10-$0.28 | 120-180K". Trzy slowa kluczowe: "Security. Debugowanie. Code review."
- GORA-PRAWO: Content Pipeline (niebieska ramka). Ikona: pioro z lupa. "Linear Pipeline | Parallel Research | $0.08-$0.25 | 100-180K". Trzy slowa: "Docs. README. Raporty."
- DOL-LEWO: Plan & Execute (zolta ramka). Ikona: mapa z checkmarkami. "Plan-and-Execute Loop | 83% savings | $0.10-$0.30 | 120-200K". Trzy slowa: "Migracje. Refactoring. Strukturalne."
- DOL-PRAWO: Performance Boost (zielona ramka). Ikona: rakieta z wykresem. "Measure-Fix Cycle | Data-driven | $0.08-$0.25 | 100-160K". Trzy slowa: "API. Web Vitals. Bundle."
Srodek siatki: male kolko z tekstem "4 agenty" w bialym.

**[SEKCJA 3: BUG HUNTER DETAIL -- 1080x350px]**
Tytul: "Bug Hunter -- Podwojny Audyt" z czerwona ikona tarczy. Czerwona subtelna poswietlenie tla (gradient z opacity 5%).
- LEWO (400px): Diagram Fork Pattern: Orkiestrator (zloty, gora) -> Backend Dev (bialy, srodek) -> FORK -> QA Security (czerwony) || QA Quality (pomaranczowy) -> JOIN -> Orkiestrator. Strzalki z etykietami: [one], [fork], [join]. Kluczowe: "ROWNOLEGLE -- brak bias".
- PRAWO (640px): 4 karty agentow (A-00 Opus, B-01 Sonnet, Q-01 Haiku, Q-02 Haiku) z Load i rola. Pod kartami: "Scenariusz: SQL Injection w /api/users. Fix: parameterized queries. Dual PASS. 1 iter | $0.16 | 120s."
- DOL: Pasek use-cases: zielone etykiety (+) "SQL injection, XSS, auth bugs" | czerwone etykiety (-) "Proste bugi, UI/CSS, features".

**[SEKCJA 4: CONTENT PIPELINE DETAIL -- 1080x350px]**
Tytul: "Content Pipeline -- Fabryka Dokumentacji" z niebieska ikona piora. Niebieskie subtylne poswietlenie.
- LEWO (400px): Diagram Linear Pipeline: dwa wejscia rownolegle (R-01 Forums, R-02 Tech, niebieskie) -> lejek syntezy -> Writer (bialy) -> QA Quality (jasnoniebieski) -> Output (dokument). Strzalki z etykietami: [parallel], [synth], [review].
- PRAWO (640px): 5 kart agentow (A-00, R-01, R-02, W-01, Q-02) z rolami. Pod kartami: "Scenariusz: README form-validator. 2 Researchers rownolegle. SO + API docs. Writer: README 8 sekcji. 2 iter | $0.18 | 180s."
- DOL: Pasek use-cases: niebieskie (+) "README, docs API, artykuly, changelogi" | szare (-) "Kod, implementacja, UI".

**[SEKCJA 5: PLAN & EXECUTE DETAIL -- 1080x350px]**
Tytul: "Plan & Execute -- Strategia Przed Akcja" z zolta ikona mapy. Zolte subtylne poswietlenie.
- LEWO (400px): Diagram Plan-and-Execute: Orkiestrator (zloty) -> Analyst (zolty) -> Planner (jasnozolty) -> [B-01 -> QA] x N -> Orkiestrator. Krokowy progress bar: Krok 1 (zielony check), Krok 2 (czerwony X, potem zielony), Krok 3 (zielony), Krok 4 (zielony), Krok 5 (zielony). Tekst: "Blad w kroku 2 = tani. Blad na koncu = drogi."
- PRAWO (640px): 5 kart agentow (A-00, A-02, A-03, B-01, Q-02). Pod kartami: "Scenariusz: JS -> TS migracja. 5 krokow. 1 poprawka krok 3. 6 iter | $0.24 | 200s. 83% savings vs ad-hoc."
- DOL: Pasek: zolte (+) "Migracje, refactoring, reorganizacja" | szare (-) "Proste taski, bugi".

**[SEKCJA 6: PERFORMANCE BOOST DETAIL -- 1080x350px]**
Tytul: "Performance Boost -- Cykl Pomiaru i Naprawy" z zielona ikona rakiety. Zielone subtylne poswietlenie.
- LEWO (400px): Diagram cyklu Deming: kolo z 4 segmentami: MEASURE (Analyst) -> FIX (Backend Dev) -> VERIFY (QA Perf + Integrator) -> DECIDE (Orkiestrator). Strzalka "CEL OSIAGNIETY" wychodzaca z DECIDE. Strzalka "KOLEJNY BOTTLENECK" wracajaca do MEASURE. Flame graph obok kola: blok "N+1 query 78%" podswietlony na czerwono.
- PRAWO (640px): 5 kart agentow (A-00, A-02, B-01, Q-03, B-04). Pod kartami: "Scenariusz: Core Web Vitals. LCP 4.2s -> 2.1s. CLS 0.35 -> 0.08. Hero 2.4MB -> 180KB. 1 iter | $0.14 | 130s."
- DOL: Pasek: zielone (+) "API perf, Web Vitals, bundle, queries" | szare (-) "Bugi, features, architektura".

**[SEKCJA 7: DRZEWO DECYZYJNE -- 1080x320px]**
Tytul: "Ktory preset wybrac?" z ikona drzewa. Tlo ciemne z subtylnym gradient.
Drzewo decyzyjne jako diagram: "Mam zadanie..." na gorze w bialym owalu. Cztery galezienie z kolorowymi strzalkami:
- "Bug + security?" -> czerwona strzalka -> "BUG HUNTER" (czerwona etykieta)
- "Dokumentacja?" -> niebieska -> "CONTENT PIPELINE" (niebieska)
- "Migracja/refactoring?" -> zolta -> "PLAN & EXECUTE" (zolta)
- "Wydajnosc?" -> zielona -> "PERFORMANCE BOOST" (zielona)
Dodatkowo szare strzalki "NIE" prowadzace w dol do: "Prosty task?" -> "Solo/Quick Fix (Tier 1)". Pod drzewem: tabela "Jedno pytanie = jeden preset" z 7 wierszami.

**[SEKCJA 8: POROWNANIE KOSZTOW -- 1080x300px]**
Tytul: "Koszty i ROI" z ikona kalkulatora. Wykres slupkowy: 7 presetow od Solo ($0.04) do Startup ($0.20). 4 presety Tier 2A wyrosnione kolorami. Pod wykresem: 4 mini donut charts (jeden per preset) z rozkladem kosztow per agent (Orkiestrator = zloty, Builder = bialy, QA = kolor presetu, Research = jasnoniebieski). Pod donut charts: "ROI" boxy: Bug Hunter "+$0.06 za eliminacje luk security", Content Pipeline "+$0.04 za dane zamiast halucynacji", Plan & Execute "+$0.08 za 83% mniej debugowania", Performance Boost "+$0.04 za trafne optymalizacje".

**[SEKCJA 9: ESKALACJA -- 1080x250px]**
Tytul: "Kiedy Tier 2A nie wystarczy?" z ikona strzalki w gore. Diagram: cztery kolorowe pola (4 presety) na gorze. Strzalki w dol do Tier 2B/3 presetow z etykietami "KIEDY" i "CO DODAJE". Strzalki w gore do Tier 1 z etykieta "deeskalacja". Kluczowe sygnaly: "3 iteracje FAIL", "3+ domeny", "frontend + backend + DB". Regula: "Eskaluj WCZESNIE -- zmarnowane iteracje sa drozsze niz wiekszy preset."

**[SEKCJA 10: QUICK REFERENCE -- 1080x280px]**
Tytul: "Quick Reference -- Cztery Karty" z ikona 4 kart. Siatka 2x2 z kompaktowymi kartami (po jednej per preset). Kazda karta: nazwa (bold), wzorzec, tokeny, koszt, jedna zasada. Kolorowa ramka. Format: "Bug Hunter | Fork | 120-180K | $0.10-$0.28 | Dual QA > Single QA". Podpis pod siatka: "Tier 2A CORE -- 4 agenty, 4 presety, 1 zasada: specjalizacja bez nadmiaru."

**[STOPKA -- 1080x100px]**
Ciemniejsze tlo (#0F172A). Tekst: "Gold Standard 2026 | Tier 2A CORE | Agent Architecture Designer" w 12px, opacity 60%. Zrodla: "OMEGA, Google Multi-Agent Study, OWASP, Core Web Vitals, Brooks Mythical Man-Month, IEEE SQA" w 10px. Cztery kolorowe kropki jako dekoracja finalna.

**Styl wizualny dodatkowy:**
- Separatory miedzy sekcjami: cieniutka linia (1px) z gradientem od transparentnego przez bialy (opacity 20%) do transparentnego
- Dane liczbowe ZAWSZE w JetBrains Mono (np. "$0.16", "120K", "83%")
- Ikony agentow: male awatary w kolku z literami (A-00, B-01, Q-01, Q-02, R-01, R-02, W-01, A-02, A-03, B-04, Q-03)
- Strzalki: zaokraglone, 2px, z mala glowka strzalki (triangle marker)
- Cienie na kartach: 0 4px 20px rgba(0,0,0,0.3)
- Hover-style podswietlenie na "aktywnej" karcie presetu (jakoby ktos najezdzal kursorem)
- Dekoracja: subtelne geometryczne ksztalty (hexagony, trojkaty) w tle z opacity 3-5%

---

*Dokument opracowany na podstawie Gold Standard Agent Architecture 2026, MASTERCLASS Agent Teams, AGENT_TEAMS_CONFIGURATOR v8/v9 oraz analiz multi-agent systems. Dane kosztowe aktualne na kwiecien 2026.*
