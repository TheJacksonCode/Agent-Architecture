# SZYBKA NAPRAWA (Quick Fix) — Preset #02 w Architekturze Multi-Agent

## Kompletny Przewodnik Edukacyjny | Tier 1 MINIMAL | Fix-Test Loop

---

## 1. Wprowadzenie — Czym jest preset Szybka Naprawa?

Wyobraz sobie, ze w Twoim oprogramowaniu pojawia sie blad. Uzytkownik zglasza: "Po kliknieciu Zapisz nic sie nie dzieje." Masz do wyboru dwie drogi: wyslac jednego programiste, zeby naprawil i sam przetestowal — albo wyslac programiste z niezaleznym testerem, ktory bedzie weryfikowal kazda poprawke, dopoki nie bedzie idealnie.

Preset **Szybka Naprawa** (Quick Fix) to druga droga. To **najmniejszy mozliwy zespol z petla zwrotna** — trzy agenty pracujace w cyklu naprawczym, dopoki problem nie zostanie calkowicie rozwiazany. W odroznieniu od presetu Solo, gdzie orkiestrator sam ocenia wynik, tutaj mamy **niezaleznego audytora**, ktory testuje i weryfikuje fix w sposob ciagly.

### Analogia 1: Mechanik i kontroler jakosci w serwisie samochodowym

Klient przywozi samochod z dziwnym dzwiekiem przy hamowaniu. Kierownik serwisu (Orkiestrator) przyjmuje zlecenie i przydziela mechanikowi (Backend Dev). Mechanik diagnozuje — zuzyty klocek — wymienia czesc. Ale zanim samochod wroci do klienta, kontroler jakosci (QA Quality) robi jazde probna. Sprawdza: czy dzwiek zniknal? Czy hamowanie jest plynne? Czy inne elementy nie ucierpialy?

Jesli kontroler znajdzie problem — samochod wraca do mechanika. I tak w kolko, az kontroler podpisze: "PASS — samochod bezpieczny." **Samochod nie opuszcza serwisu, dopoki kontroler nie zaakceptuje naprawy.** To jest istota Fix-Test Loop.

### Analogia 2: Chirurg, anestezjolog i monitor zycia

Chirurg (Backend Dev) operuje — naprawia uszkodzony organ. Monitor zycia (QA Quality) **caly czas obserwuje** — tetno, cisnienie, saturacja. Nie sprawdza raz na koncu — monitoruje CIAGLE. Jesli parametry spadna ponizej normy — alarm! Chirurg reaguje. Lekarz prowadzacy (Orkiestrator) nadzoruje i podejmuje strategiczne decyzje.

Kluczowe slowo: **CIAGLE**. Polaczenie typu `continuous` oznacza wlasnie to — QA nie sprawdza raz, ale monitoruje i raportuje az do momentu, gdy wszystko jest stabilne.

### Analogia 3: Redaktor, korektor i wydawca

Redaktor (Backend Dev) poprawia blad w artykule. Korektor (QA Quality) czyta poprawiony tekst i szuka dalszych problemow: "Poprawiles date, ale w trzecim akapicie jest jeszcze stara wersja." Artykul wraca do redaktora. Wydawca (Orkiestrator) decyduje, kiedy jest gotowy do druku.

Wiele rund korekty to **norma, nie porazka**. Kazda runda poprawia jakosc.

> **Czy wiesz, ze...?**
> W systemach multi-agentowych petle zwrotne redukuja liczbe defektow o 60-80%
> w porownaniu z jednorazowym wykonaniem. Badanie Google wykazalo, ze iteracyjne
> podejscie przewyzsza jednorazowe o +80.9% w zadaniach rownolegych.

> **Uwaga!**
> Szybka Naprawa jest do NAPRAWIANIA bledow, nie do BUDOWANIA nowych funkcji.
> Jesli potrzebujesz fazy badawczej lub planowania, uzyj presetu Recon lub Plan_Exec.

---

## 2. Sklad zespolu — Trzy role, trzy perspektywy

Quick Fix to **minimalny zespol z petla zwrotna**. Trzy agenty, trzy role, zero redundancji.

### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Opus |
| **Load** | 50/100 |
| **Warstwa** | STRATEGIA |
| **Narzedzia** | Agent (delegacja), Read (przeglad kodu), Write (instrukcje) |
| **Koszt/zadanie** | ~$0.03-$0.06 (20-30K tokenow) |

W kontekscie Quick Fix, Orkiestrator pelni role **kierownika naprawy**: przyjmuje raport o bledzie, tworzy precyzyjna instrukcje naprawy (Narrow Context — TYLKO kod i opis buga), monitoruje petla Fix-Test, interpretuje raporty QA i decyduje: PASS, kolejna iteracja, czy eskalacja. Ogranicza liczbe iteracji do max 3-4.

### Agent B-01: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet |
| **Load** | 75/100 |
| **Warstwa** | BUILD |
| **Narzedzia** | Write, Edit, Bash (testy), Read (kontekst) |
| **Koszt/zadanie** | ~$0.03-$0.08 (30-50K tokenow) |

Backend Dev to **jedyny builder** w zespole — jego najwieksza sila i glowne ograniczenie. Diagnozuje przyczyne bledu (root cause), implementuje naprawe, pisze test regresji i w kolejnych iteracjach reaguje na konkretne uwagi QA.

### Agent Q-02: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT |
| **Narzedzia** | Read (kod), Grep (wzorce), Bash (testy, lintery) |
| **Koszt/zadanie** | ~$0.02-$0.04 (20-30K tokenow) |

QA Quality to **niezalezny weryfikator**. Nie pisze kodu — testuje i raportuje. Uruchamia suite testow, sprawdza edge cases (null, undefined, granice), weryfikuje brak regresji i generuje raport PASS/FAIL. W trybie `continuous` raportuje az do pelnego PASS.

### Diagram architektury zespolu

```
    +-------------------+
    |  ORKIESTRATOR      |
    |  A-00 | Opus       |
    |  Load: 50          |
    +--------+----------+
             |
             | [one] delegacja
             v
    +-------------------+         +-------------------+
    |  BACKEND DEV       |  [one]  |  QA QUALITY        |
    |  B-01 | Sonnet     | ------> |  Q-02 | Haiku      |
    |  Load: 75          | artefakt|  Load: 55          |
    +-------------------+         +--------+----------+
             ^                             |
             |      [continuous]           |
             +--------  FAIL  <------------+
                                           |
    +-------------------+                  |
    |  ORKIESTRATOR      | <--- PASS ------+
    |  (dostarcza wynik) |
    +-------------------+
```

> **Czy wiesz, ze...?**
> Quick Fix uzywa trzech roznych modeli celowo: Opus (najdrozszy) do decyzji
> strategicznych, Sonnet (sredni) do kodowania, Haiku (najtanszy) do testowania.
> To Smart Model Routing — najdrozszy model tam, gdzie blad kosztuje najwiecej.

---

## 3. Wzorzec architektoniczny — Fix-Test Loop

### Czym jest Fix-Test Loop?

Fix-Test Loop to **wzorzec petli zwrotnej**, w ktorym Builder naprawia, QA testuje. Jesli test przechodzi — cykl konczy sie sukcesem. Jesli nie — Builder otrzymuje feedback i probuje ponownie. To przeniesienie Red-Green-Refactor z TDD do swiata multi-agent.

### Trzy typy polaczen

| Polaczenie | Typ | Znaczenie |
|-----------|-----|-----------|
| Orkiestrator -> Backend Dev | `one` | Jednorazowa delegacja |
| Backend Dev -> QA Quality | `one` | Przekazanie artefaktu |
| QA Quality -> Orkiestrator | `continuous` | Ciagly feedback az do zakonczenia |

Polaczenie `continuous` jest kluczowe — QA Quality **nie sprawdza raz i konczy**, ale monitoruje i raportuje az do PASS. To fundamentalna roznica miedzy jednorazowa walidacja (Solo) a iteracyjnym udoskonalaniem (Quick Fix).

### Jednorazowa walidacja vs iteracyjne udoskonalanie

```
SOLO (jednorazowa):
  Orkiestrator -> Builder -> wynik -> Orkiestrator sprawdza -> KONIEC
  Gwarancja: NISKA (kto waliduje walidatora?)

QUICK FIX (iteracyjne):
  Orkiestrator -> Builder -> QA -> FAIL -> Builder -> QA -> PASS -> Orkiestrator
  Gwarancja: WYSOKA (niezalezna weryfikacja + iteracja)
```

### Warunki zakonczenia petli

1. **PASS od QA** — wszystkie testy przechodza, brak regresji, edge cases pokryte
2. **Limit iteracji** — po 3-4 probach QA nadal FAIL -> eskalacja do wiekszego presetu
3. **Nadpisanie przez Orkiestratora** — problem wymaga innego podejscia (np. to nie bug, lecz brakujaca funkcja)

### Zlozonosc komunikacyjna

```
Bazowa:    O(3) — trzy polaczenia
Z petla:   O(3 + 2*i) — gdzie i = liczba iteracji
  1 iteracja:  5 komunikatow
  2 iteracje:  7 komunikatow
  3 iteracje:  9 komunikatow
```

Liniowy wzrost — akceptowalny koszt za wyzsza jakosc.

> "Petle zwrotne sa fundamentem jakosci w systemach multi-agentowych."
> Bez petli system polega na nadziei. Z petla — na gwarancji.

---

## 4. Anatomia petli naprawczej — Krok po kroku

### Pelny cykl naprawczy

**Krok 1-3: Orkiestrator** — Przyjmuje raport o bledzie, analizuje (severity, scope, affected files) za pomoca Read, tworzy precyzyjna instrukcje naprawy zgodnie z Narrow Context Principle (TYLKO opis buga + dotkniety kod + powiazane testy).

**Krok 4-5: Backend Dev** — Diagnozuje root cause, implementuje naprawe, pisze test regresji, uruchamia testy lokalnie:

```python
def fix_cycle(instruction):
    root_cause = analyze_code(instruction.affected_files)
    fix = implement_fix(root_cause)
    regression_test = write_regression_test(instruction.bug)
    local_result = run_tests(instruction.test_suite + [regression_test])
    return Artifact(fix, regression_test, local_result)
```

**Krok 6-7: QA Quality** — Kompleksowa weryfikacja:

```python
def verify_fix(artifact):
    full_suite = bash("npm test")                    # pelna suite
    regression = bash("npm test -- regression")       # test regresji
    edge_cases = check_edges([None, "", 0, -1, []])  # przypadki brzegowe
    no_regression = verify_no_new_failures()          # brak nowych bledow
    
    if all_pass([full_suite, regression, edge_cases, no_regression]):
        return Report(verdict="PASS")
    return Report(verdict="FAIL", failures=get_failures())
```

**Krok 8: PASS** — QA raportuje sukces, Orkiestrator dostarcza wynik.

**Krok 9: FAIL** — QA raportuje konkretne failures. Orkiestrator tworzy korekte instrukcji:

```json
{
  "type": "correction",
  "iteration": 2,
  "original_bug": "Null pointer w /api/orders",
  "qa_feedback": {
    "failures": [
      "Edge case undefined: oczekiwano 400, otrzymano 500",
      "Regression: test_order_list spadl z PASS na FAIL"
    ],
    "suggestions": [
      "Dodaj obsluge undefined obok null",
      "Sprawdz wplyw zmian na listOrders"
    ]
  }
}
```

Backend Dev poprawia fix z precyzyjnym feedbackiem — teraz wie CO dokladnie naprawic.

**Krok 10: Bezpieczenstwo** — Max 3-4 iteracje, potem eskalacja:

```python
MAX_ITERATIONS = 4
for i in range(1, MAX_ITERATIONS + 1):
    artifact = backend_dev.fix(instruction)
    report = qa_quality.verify(artifact)
    if report.verdict == "PASS":
        return deliver(artifact)
    instruction = create_correction(instruction, report)
return escalate(preset="bug_hunt", reason="Limit iteracji")
```

### Przykladowy raport QA (format JSON)

```json
{
  "preset": "quick_fix",
  "iteration": 2,
  "agent": "QA Quality (Q-02)",
  "verdict": "FAIL",
  "findings": [
    {
      "id": "QF-101", "severity": "CRITICAL", "category": "Regression",
      "description": "test_order_list FAIL — zmiana w getOrder wplynela na listOrders",
      "suggestion": "Rozdziel logike getOrder i listOrders"
    },
    {
      "id": "QF-201", "severity": "HIGH", "category": "Edge Case",
      "description": "undefined nie obsluzony — tylko null ma guard clause",
      "suggestion": "Uzyj == null zamiast === null"
    }
  ],
  "tests": { "total": 45, "passed": 43, "failed": 2, "coverage": "78%" },
  "recommendation": "FAIL — napraw regresje i edge case"
}
```

---

## 5. Koszt i tokeny

### Rozklad kosztow per agent

| Agent | Model | Tokeny (in+out) | Koszt |
|-------|-------|-----------------|-------|
| Orkiestrator (A-00) | Opus | ~20K | ~$0.03-$0.06 |
| Backend Dev (B-01) | Sonnet | ~35K | ~$0.03-$0.08 |
| QA Quality (Q-02) | Haiku | ~23K | ~$0.02-$0.04 |
| **RAZEM (1 iteracja)** | | **~80K** | **$0.08-$0.18** |

### Koszt per iteracja

| Iteracje | Tokeny razem | Koszt ($) | Czas (~s) |
|----------|-------------|-----------|-----------|
| 1 (ideal) | ~80-120K | $0.08-$0.18 | ~60s |
| 2 (typowe) | ~125-180K | $0.12-$0.27 | ~90s |
| 3 (zlozony) | ~170-240K | $0.16-$0.36 | ~120s |
| 4 (limit) | ~215-300K | $0.20-$0.45 | ~150s |

Kazda dodatkowa iteracja: +~45-63K tokenow (+$0.04-$0.09).

### Smart Model Routing

- **Opus dla Orkiestratora** — decyzje strategiczne kosztuja malo tokenow, ale bledna decyzja kosztuje caly cykl
- **Sonnet dla Backend Dev** — kodowanie wymaga rozumowania i dlugich outputow
- **Haiku dla QA** — testowanie to pattern matching: czy test przeszedl? Czy coverage > 80%?

### Porownanie z Solo

| Metryka | Solo (2 agenty) | Quick Fix (3 agenty) | Roznica |
|---------|-----------------|---------------------|---------|
| Koszt bazowy | $0.04-$0.15 | $0.08-$0.18 | +$0.04 |
| QA niezalezne | Brak | Tak | KRYTYCZNA |
| Feedback loop | Brak | Continuous | +60-80% mniej defektow |

Dodatkowe $0.04 za niezalezna walidacje QA to **najlepsza inwestycja** dla nietrywialnego buga. To jak ubezpieczenie: maly koszt, ogromna wartosc gdy go potrzebujesz.

### Gdzie plyna tokeny?

Warto zrozumiec, co generuje tokeny w kazdej iteracji:

- **Orkiestrator** zuzywa najmniej — krotka analiza raportu QA i stworzenie korekty instrukcji. Ale uzywa Opus, wiec kazdy token jest drogi.
- **Backend Dev** zuzywa najwiecej — czyta kontekst, generuje kod naprawy i test regresji. Sonnet to balans miedzy jakoscia a cena.
- **QA Quality** jest posrodku — uruchamia testy (malo tokenow na wejsciu), ale generuje szczegolowy raport (wiecej na wyjsciu). Haiku jest najtanszy, wiec nawet dlugi raport kosztuje grosze.

Paradoks: **najtanszy agent (QA) generuje najwieksza wartosc** — jego raport decyduje o jakosci calego fixa.

---

## 6. Narzedzia w akcji

### Mapowanie narzedzi

| Agent | Narzedzie | Uzycie w Quick Fix |
|-------|-----------|-------------------|
| Orkiestrator | Agent | Delegacja do Backend Dev i QA Quality |
| Orkiestrator | Read | Przegladanie kodu, zrozumienie buga |
| Orkiestrator | Write | Tworzenie instrukcji naprawy |
| Backend Dev | Edit | Modyfikacja istniejacego kodu (naprawa) |
| Backend Dev | Write | Tworzenie nowych plikow (testy regresji) |
| Backend Dev | Bash | Uruchamianie testow lokalnie |
| Backend Dev | Read | Czytanie kodu, kontekst |
| QA Quality | Read | Czytanie kodu i specyfikacji |
| QA Quality | Grep | Szukanie wzorcow i anti-patternow |
| QA Quality | Bash | Uruchamianie testow, linterow, coverage |

### QA Quality + Bash = klucz do niezaleznosci

QA Quality ma dostep do Bash — moze **URUCHAMIAC testy**, nie tylko czytac kod:

```bash
Bash("npm test")                                   # pelna suite
Bash("npm test -- --coverage")                     # pokrycie testami
Bash("npx eslint src/ --format json")              # linter
Bash("npm test -- --testPathPattern=regression")   # test regresji
```

Bez Bash QA moglby tylko czytac — z Bash moze weryfikowac. Roznica miedzy "wyglada dobrze" a "dziala poprawnie."

### Przykladowy lancuch narzedzi

```
Orkiestrator:  Read(bug) -> Write(instrukcja) -> Agent(Backend Dev)
Backend Dev:   Read(kontekst) -> Edit(fix) -> Write(test) -> Bash(npm test)
QA Quality:    Bash(npm test --coverage) -> Grep(edge cases) -> Read(review)
```

> **Uwaga!**
> QA Quality NIE MA narzedzi Write i Edit — nie moze modyfikowac kodu.
> Audytor, ktory naprawia to co audytuje, traci obiektywnosc.

### Roznica miedzy Bash w Backend Dev a Bash w QA Quality

Oba agenty maja Bash, ale uzywaja go w roznych celach:

| Agent | Bash — cel | Przyklady komend |
|-------|-----------|------------------|
| Backend Dev | Weryfikacja lokalna | `npm test`, `node fix.js`, `git diff` |
| QA Quality | Niezalezna walidacja | `npm test --coverage`, `eslint`, `tsc --noEmit` |

Backend Dev uruchamia testy, zeby sprawdzic czy jego fix dziala. QA Quality uruchamia testy, zeby sprawdzic czy fix naprawde dziala i nie lamal nic innego. Ta sama komenda, inna perspektywa — i na tym polega niezaleznosc audytu.

---

## 7. Kiedy uzywac (a kiedy NIE)

### Tabela decyzyjna — sygnalizacja swietlna

| Status | Scenariusz | Uzasadnienie |
|--------|-----------|--------------|
| ZIELONY | Znany bug z jasnymi objawami | Idealny przypadek |
| ZIELONY | Hotfix potrzebny ASAP | Szybki cykl fix-test |
| ZIELONY | Patch do istniejacego kodu | Niewielka zmiana |
| ZIELONY | Naprawa regresji | Test juz istnieje |
| ZIELONY | Poprawki obslugi bledow | Dodanie null checks, walidacji |
| ZOLTY | Zlozony bug w wielu plikach | Czy jeden Builder wystarczy? |
| ZOLTY | Problem wydajnosciowy | Rozwaaz perf_boost |
| ZOLTY | Bug z niejasna przyczyna | Moze Recon najpierw? |
| CZERWONY | Nowa funkcja | NIGDY — uzyj startup/feature_sprint |
| CZERWONY | Nieznana przyczyna bledu | Recon najpierw |
| CZERWONY | Luka bezpieczenstwa | Bug Hunt z QA Security |
| CZERWONY | Refactoring duzej skali | Plan_Exec z planowaniem |

### Przyklady decyzji

```
ZIELONY: "Button Zapisz nie reaguje" -> Bug jasny -> Quick Fix
ZIELONY: "API zwraca 500 gdy brak email" -> Brak walidacji -> Quick Fix
ZOLTY:   "Strona laduje sie 8s" -> Moze N+1, cache... -> rozwaaz perf_boost
CZERWONY: "Dodaj system powiadomien push" -> NOWA FUNKCJA -> NIE Quick Fix!
CZERWONY: "Cos nie dziala w platosciach, nie wiem co" -> Recon najpierw
```

> **Czy wiesz, ze...?**
> Najczestszy blad: uzywanie Quick Fix do "bugow" ktore sa brakujacymi feature'ami.
> "Dashboard nie pokazuje wykresow" — jesli wykresy nigdy nie byly zaimplementowane,
> Quick Fix bedzie sie krecil w petli probujac naprawic cos, co nie istnieje.

---

## 8. Scenariusze z zycia wziete

### Scenariusz 1: Null pointer w /api/orders — PASS w 1. iteracji

**Kontekst:** E-commerce API. "Po zamowieniu bez adresu strona pokazuje 500."

**Orkiestrator:** Read → linia 34: `const city = user.address.city;` → jesli `user.address` jest null → TypeError. Instrukcja: "Dodaj null check, zwroc 400, napisz test regresji."

**Backend Dev:**
```javascript
// PRZED: const city = user.address.city;
// PO:
if (!user.address) {
  return res.status(400).json({ error: "Adres dostawy jest wymagany" });
}
const city = user.address.city;

// Test regresji:
test("zwraca 400 gdy brak adresu", async () => {
  const res = await request(app).post("/api/orders").send({ userId: 1 });
  expect(res.status).toBe(400);
});
```

**QA Quality:** `npm test` → 47/47 PASS. Coverage 84%. Edge cases: null ✓, undefined ✓, {} ✓. Brak regresji. **Raport: PASS.**

**Wynik:** 1 iteracja | $0.10 | ~50s

**Dlaczego to idealny scenariusz dla Quick Fix?** Bug ma jasna przyczyne (brak null check), jasny objaw (500 na /api/orders), jedno miejsce w kodzie. Backend Dev naprawia, QA weryfikuje, petla zamyka sie w jednej iteracji. Koszt niski, czas krotki, jakosc gwarantowana.

---

### Scenariusz 2: Race condition w checkout — PASS w 2. iteracji

**Kontekst:** Podwojone zamowienia pod obciazeniem.

**Iteracja 1 — Backend Dev:** Dodaje distributed lock z TTL 5000ms.
**QA Quality:** FAIL — deadlock: `test_concurrent_checkout` nie przechodzi, lock TTL za krotki.

**Iteracja 2 — Backend Dev:** TTL 10000ms, retry logic, double-check na istniejace zamowienie:
```javascript
async function checkout(userId, cartId) {
  const lock = await redis.lock(`checkout:${userId}`, { ttl: 10000, retryCount: 3 });
  try {
    const existing = await Order.findOne({ userId, cartId, status: "pending" });
    if (existing) return existing;
    return await createOrder(userId, cartId);
  } finally { await lock.unlock(); }
}
```
**QA Quality:** 58/58 PASS, brak regresji. **Raport: PASS.**

**Wynik:** 2 iteracje | $0.18 | ~95s

**Dlaczego 2 iteracje to norma, nie porazka?** Pierwsza iteracja ujawnila ukryty problem (deadlock), ktory nie byl widoczny w oryginalnym bug reporcie. Bez QA Quality ten deadlock trafilby na produkcje. Druga iteracja naprawila i oryginalny bug, i ukryty problem. To jest sila feedback loop — wykrywa problemy, ktorych nikt nie przewidzial.

---

### Scenariusz 3: Feature disguised as bug — FAIL i eskalacja

**Kontekst:** "Bug: dashboard nie pokazuje wykresow sprzedazy."

**Iteracja 1:** Backend Dev szuka kodu wykresow → `Grep("chart|Chart")` → BRAK WYNIKOW. Probuje napisac minimalny komponent. QA: FAIL — brak testow, brak specyfikacji.

**Iteracja 2:** Backend Dev rozszerza komponent, integruje z API. QA: FAIL — endpoint /api/sales/chart-data nie istnieje.

**Iteracja 3:** Backend Dev pisze endpoint. QA: FAIL — brak tabeli sales_daily_summary w bazie.

**Orkiestrator eskaluje:** "To nie jest bug — to niezaimplementowana funkcja. Uzyj presetu startup."

**Wynik:** 3 iteracje zmarnowane | $0.38 | Lekcja: Quick Fix nie jest dla nowych feature'ow.

> **Uwaga!**
> Prawidlowa reakcja po iteracji 1: "Brak kodu do naprawy -> to nie bug -> eskalacja."
> Rozpoznawanie false bugs to krytyczna umiejetnosc Orkiestratora.

---

## 9. Anti-patterny (ZLE vs DOBRZE)

### 9.1 Quick Fix do nowych feature'ow

```
ZLE:  "Bug: brak trybu ciemnego" -> Quick Fix -> petla bez konca
DOBRZE: "Tryb ciemny nie byl zaimplementowany -> to feature -> startup/feature_sprint"
```

### 9.2 Nieskonczona petla bez limitu

```
ZLE:  while qa != "PASS": fix(); test()  # petla w nieskonczonosc
DOBRZE: for i in range(1, 5): ... else: escalate()  # max 4 iteracje
```

### 9.3 QA testuje TYLKO happy path

```
ZLE:  createOrder({userId: 1, address: "Warszawa"}) -> 200 OK -> "PASS!"
      [ignoruje: null, undefined, empty cart, duplicate, negative qty]

DOBRZE: Happy path ✓, Null ✓, Undefined ✓, Empty ✓, Boundary (0, -1) ✓, Regression ✓
```

### 9.4 Sycophancy loop — QA zawsze mowi PASS

```
ZLE:  Backend: "Oto fix." QA: "Swietnie! PASS." (bez uruchamiania testow)
DOBRZE: QA ma rubryke: 1) Suite PASS? 2) Regresja PASS? 3) Coverage >80%?
        4) Edge cases? 5) Brak nowych failures? Kazde NIE = FAIL.
```

### 9.5 Orkiestrator nie czyta raportu QA

```
ZLE:  QA: {verdict: "FAIL", details: [...]} -> Orkiestrator: "Napraw." (bez szczegolow)
DOBRZE: Orkiestrator analizuje raport i deleguje z konkretnymi szczegolami z QA
```

### 9.6 Pomijanie testu regresji

```
ZLE:  Fix bez testu regresji -> fix naprawia bug ale lamie 3 inne rzeczy
DOBRZE: Kazdy fix = naprawa + test regresji + pelna suite testow
```

> **Czy wiesz, ze...?**
> Sycophancy loop jest szczegolnie niebezpieczny w AI — modele maja tendencje
> do potwierdzania. Dlatego QA MUSI miec binarne kryteria (TAK/NIE), nie pytanie "czy OK?"

### Podsumowanie anti-patternow — tabela szybkiego odniesienia

| # | Anti-pattern | Konsekwencja | Rozwiazanie |
|---|-------------|-------------|-------------|
| 9.1 | Quick Fix do features | Nieskonczona petla, zmarnowane tokeny | Rozpoznaj i eskaluj |
| 9.2 | Brak limitu iteracji | Plonace tokeny, brak postepow | Max 3-4, potem eskalacja |
| 9.3 | Tylko happy path | Bugi w edge cases trafiaja na produkcje | Systematyczny checklist |
| 9.4 | Sycophancy loop | Wadliwy kod przepuszczany | Binarne kryteria QA |
| 9.5 | Slepy Orkiestrator | Backend Dev strzela na slepo | Analizuj raport QA |
| 9.6 | Brak test regresji | Fix lamie inne rzeczy | Kazdy fix = fix + test |

---

## 10. Porownanie z innymi presetami

### Tabela porownawcza

| Aspekt | Solo | Quick Fix | Bug Hunt | Plan Exec |
|--------|------|-----------|----------|-----------|
| **Agentow** | 2 | 3 | 4 | 4 |
| **Tier** | 0 (Micro) | 1 (Minimal) | 2 (Standard) | 2 (Standard) |
| **QA** | Brak | QA Quality | QA Sec + Qual | QA Quality |
| **Feedback** | Brak | Continuous | Dual parallel | Plan->Exec |
| **Iteracje** | 0 | 1-4 | 1-3 per QA | 1-3 |
| **Koszt** | $0.04-0.15 | $0.08-0.20 | $0.10-0.28 | $0.10-0.30 |
| **Tokeny** | ~40-80K | ~80-120K | ~100-180K | ~100-200K |
| **Latencja** | ~30-60s | ~60-120s | ~90-180s | ~90-180s |
| **Research** | Brak | Brak | Brak | Planowanie |

### Kiedy upgrade z Quick Fix?

```
Quick Fix -> Bug Hunt:
  KIEDY: Bug ma implikacje bezpieczenstwa (SQL injection, auth bypass)
  DLACZEGO: Dodaje QA Security obok QA Quality

Quick Fix -> Plan Exec:
  KIEDY: Naprawa wymaga planowania (zmiana architektury)
  DLACZEGO: Dodaje faze planowania przed implementacja

Quick Fix -> Recon + Quick Fix:
  KIEDY: Nie wiadomo, co powoduje bug
  DLACZEGO: Recon odkrywa przyczyne, Quick Fix naprawia

Solo -> Quick Fix:
  KIEDY: Bug nietrywalny, wymaga niezaleznej weryfikacji
  DLACZEGO: Dodaje QA Quality i feedback loop
```

### Diagram decyzyjny

```
Czy to BUG czy FEATURE?
  +-- FEATURE -> startup / feature_sprint
  +-- BUG -> Czy znasz przyczyne?
              +-- NIE -> Recon -> potem Quick Fix
              +-- TAK -> Czy implikacje bezpieczenstwa?
                          +-- TAK -> Bug Hunt
                          +-- NIE -> Czy zmiana architektury?
                                      +-- TAK -> Plan Exec
                                      +-- NIE -> QUICK FIX
```

---

## 11. Quick Reference Card

```
+=========================================================================+
|              SZYBKA NAPRAWA (QUICK FIX) — QUICK REFERENCE               |
+=========================================================================+
|                                                                         |
|  PRESET ID:    quick_fix                                                |
|  IKONA:        (klucz)                                                  |
|  TIER:         1 (MINIMAL)                                              |
|  PATTERN:      Fix-Test Loop (Continuous Feedback)                      |
|  AGENTOW:      3                                                        |
|  TOKENY:       ~80-120K (bazowo)                                        |
|  KOSZT:        $0.08-$0.20                                              |
|  LATENCJA:     ~60-120 sekund                                           |
|                                                                         |
+---------+---------------------------------------------------------------+
|  ZESPOL |                                                               |
+---------+---------------------------------------------------------------+
|  A-00   |  Orkiestrator  | Opus   | Load 50 | STRATEGIA               |
|  B-01   |  Backend Dev   | Sonnet | Load 75 | BUILD                   |
|  Q-02   |  QA Quality    | Haiku  | Load 55 | QA/AUDYT                |
+---------+---------------------------------------------------------------+
|                                                                         |
|  WORKFLOW:                                                              |
|    Orkiestrator --[one]--> Backend Dev --[one]--> QA Quality            |
|                                  ^                    |                  |
|                                  +--- FAIL <----------+                 |
|                                       (continuous)                      |
|    QA Quality --[PASS]--> Orkiestrator --> Uzytkownik                   |
|                                                                         |
+---------+---------------------------------------------------------------+
|  POLACZENIA                                                             |
+---------+---------------------------------------------------------------+
|  Orkiestrator -> Backend Dev  | one        | delegacja                 |
|  Backend Dev -> QA Quality    | one        | artefakt                  |
|  QA Quality -> Orkiestrator   | continuous | feedback loop             |
+---------+---------------------------------------------------------------+
|                                                                         |
|  NARZEDZIA:                                                             |
|    A-00: Agent, Read, Write                                             |
|    B-01: Write, Edit, Bash, Read                                        |
|    Q-02: Read, Grep, Bash (test execution!)                             |
|                                                                         |
|  USE CASES:                                                             |
|    [+] Bugfixy, hotfixy, patche, regresje                              |
|    [-] Nowe feature'y, research, security, refactoring                 |
|                                                                         |
|  MAX ITERACJI: 3-4 (potem eskalacja)                                   |
|  KOSZT/ITERACJA: +$0.04-$0.09                                          |
|                                                                         |
|  ESKALACJA DO:                                                          |
|    Bug Hunt (security) | Plan Exec (architektura) | Recon (diagnoza)   |
|                                                                         |
|  ZASADA GLOWNA:                                                         |
|    "Feedback loop to roznica miedzy nadzieja a gwarancja"              |
|                                                                         |
+=========================================================================+
```

---

## 12. Glossary (Slowniczek)

| Termin | Definicja |
|--------|-----------|
| **Fix-Test Loop** | Wzorzec petli zwrotnej: Builder naprawia, QA testuje, petla trwa az do PASS lub limitu iteracji |
| **Feedback Loop** | Mechanizm zwrotny — wyjscie jednego komponentu staje sie wejsciem drugiego, umozliwiajac iteracyjne udoskonalanie |
| **Continuous Connection** | Typ polaczenia: agent raportuje w sposob ciagly, az do zakonczenia zadania (nie jednorazowo) |
| **Regression** | Blad w dzialajacym kodzie spowodowany nowa zmiana |
| **Regression Test** | Test reprodukujacy oryginalny bug — weryfikuje, ze naprawa dziala i bug nie wroci |
| **Edge Case** | Przypadek brzegowy: null, undefined, pusta tablica, wartosc ujemna, Infinity |
| **Sycophancy** | Tendencja do potwierdzania zamiast krytycznej oceny — QA ktore zawsze mowi PASS |
| **Sycophancy Loop** | QA i Builder w cyklu wzajemnego potwierdzania bez rzeczywistego testowania |
| **Hotfix** | Pilna naprawa buga na produkcji — idealny use case dla Quick Fix |
| **Patch** | Niewielka zmiana naprawiajaca konkretny problem |
| **Narrow Context Principle** | Agent dostaje TYLKO informacje potrzebne do zadania — mniej halucynacji, nizszy koszt |
| **Smart Model Routing** | Dopasowanie modelu do zadania: najtanszy gdzie wystarczy, najdrozszy gdzie blad kosztuje |
| **Root Cause Analysis** | Identyfikacja fundamentalnej przyczyny bledu, nie tylko objawow |
| **Race Condition** | Blad z nieoczekiwanej kolejnosci operacji wspolbieznych |
| **Deadlock** | Blokada wzajemna — dwa procesy czekaja na siebie, zaden nie kontynuuje |
| **Escalation** | Przekazanie zadania do wiekszego presetu gdy obecny nie wystarcza |
| **GO/NO-GO** | Brama decyzyjna: Orkiestrator decyduje PASS (GO) lub kolejna iteracja (NO-GO) |
| **One-shot Execution** | Jednorazowe wykonanie bez petli zwrotnej |
| **Iterative Refinement** | Wielokrotne poprawki na podstawie feedbacku — kazda iteracja poprawia jakosc |

---

**Zrodla:** OMEGA Multi-Agent Architecture Analysis, Gold Standard 2026 Blueprint,
Google Multi-Agent Systems Study (iterative vs one-shot: +80.9%), Agent Architecture
Observatory, IEEE Standard for Software Quality Assurance, TDD Red-Green-Refactor,
Toyota Production System (Quality Control Gates).

---
---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz prezentacje wideo (5-7 minut) o presecie Szybka Naprawa (Quick Fix) w architekturze Gold Standard 2026.

**Hook otwierajacy (0:00-0:30):**
"Jeden bug. Trzy rundy. Zero regresji." Ekran: ciemne tlo z animacja trzech zazebiajacych sie kol — fix, test, feedback — obracajacych sie jak zebatki. Kazde kolo podswietla sie pomaranczowo (#EA580C) gdy przechodzi gorna pozycje. Tekst litera po literze: "Szybka Naprawa — Petla Doskonalosci." Podtekst: "Feedback loop to roznica miedzy nadzieja a gwarancja." Tlo: ciemny gradient (#1F2937 -> #111827) z subtelnymi liniami obwodow elektronicznych.

**Sekcja 1 — Trzy analogie (0:30-2:00):**
1) Serwis samochodowy (30s) — Samochod wjezdza. Mechanik (pomaranczowa ikona klucza) naprawia. Kontroler (niebieska lupa) testuje. Czerwony X — wraca do mechanika. Ponowna naprawa. Zielony check — kierownik (zlota ikona) zatwierdza. Klucz: samochod NIE wyjezdza bez podpisu kontrolera.
2) Chirurg i monitor (25s) — Split screen: chirurg operuje, monitor CIAGLE obserwuje. Alarm! Reakcja. Stabilizacja. Klucz: CIAGLY monitoring, nie jednorazowy.
3) Redaktor i korektor (20s) — Tekst, poprawka, korekta, kolejna poprawka. Wiele rund = norma. Wydawca stempluje "DO DRUKU".

**Sekcja 2 — Zespol i architektura (2:00-2:45):**
Animacja trojkata: trzy wezly z efektem "wlaczania". Gora: Orkiestrator (Opus, zloty). Lewy dol: Backend Dev (Sonnet, pomaranczowy). Prawy dol: QA Quality (Haiku, niebieski). Strzalki z etykietami [one], [one], [continuous]. Strzalka "continuous" pulsuje. Swiecace punkty przeplywaja po strzalkach.

**Sekcja 3 — Fix-Test Loop w akcji (2:45-4:15):**
Animacja cyklu na przykladzie null pointer: bug report (czerwona koperta) -> Orkiestrator analizuje -> instrukcja (pomaranczowa kartka) -> Backend Dev koduje (terminal) -> artefakt do QA (niebieska paczka) -> QA uruchamia testy -> PASS, confetti! Nastepnie: race condition — 2 iteracje, FAIL po pierwszej (czerwony X), poprawka, PASS. Split screen: Solo (brak QA) vs Quick Fix (trojkat z petla). "+$0.04 za gwarancje."

**Sekcja 4 — Koszty i porownanie (4:15-5:00):**
Animowany wykres: Solo vs Quick Fix vs Bug Hunt vs Plan Exec. Quick Fix pomaranczowy. Tabela iteracji: 1=$0.08, 2=$0.12, 3=$0.16, 4=$0.20. "Liniowy koszt za wykladnicza jakosc."

**Sekcja 5 — Anti-patterny (5:00-6:00):**
6 "wanted posterow" — kazdy z ikona ostrzezenia, nazwa, opis, przekreslony. Sycophancy loop: dwoch agentow kiwa glowami. Obok ZLE: DOBRZE (zielona ramka).

**Sekcja 6 — Kiedy uzywac (6:00-6:30):**
Sygnalizacja: ZIELONY (bugfixy, hotfixy), ZOLTY (zlozne bugi), CZERWONY (features, security). Diagram decyzyjny z kolorowymi strzalkami.

**Zamkniecie (6:30-7:00):**
Trzy zebatki z hooka — teraz plynnie zsynchronizowane. "Feedback loop to roznica miedzy nadzieja a gwarancja." Quick Reference Card jako animowana karta.

**Motyw wizualny:** Ciemne tlo (#1F2937, #111827) z pomaranczowym (#EA580C) — estetyka mechaniczna/industrialna. Zebatki, klucze, obwody. Monospace (JetBrains Mono) dla kodu, sans-serif (Inter) dla narracji. PASS=#10B981, FAIL=#EF4444.

**Muzyka:** Rytmiczna, oparta na petlach — bazowa perkusja powtarza sie cyklicznie jak Fix-Test Loop. Z kazda sekcja nowy element. PASS = krotki fanfar. FAIL = przyciszenie, restart. Industrial/electronic, 100-110 BPM.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike (1080x3000px) o presecie Szybka Naprawa (Quick Fix).

**Naglowek (0-250px):**
"SZYBKA NAPRAWA — Petla Doskonalosci" na ciemnym tle (#1F2937) z pomaranczowa ikona klucza. Podtytul: "Preset #02 | Tier 1 MINIMAL | Fix-Test Loop." Bialy tekst, pomaranczowy akcent (#EA580C).

**Sekcja 1 — Trzy karty agentow w trojkacie (250-600px):**
Gora-srodek: Orkiestrator (A-00, zlota ramka, Opus, Load 50). Lewy dol: Backend Dev (B-01, pomaranczowa, Sonnet, Load 75). Prawy dol: QA Quality (Q-02, niebieska, Haiku, Load 55). Strzalki z typami: [one], [one], [continuous]. "Continuous" wyrosniona pomaranczowa przerywana linia.

**Sekcja 2 — Diagram Fix-Test Loop (600-1000px):**
Kolowy diagram: srodek = ikona buga. 12h: Orkiestrator. 5h: Backend Dev. 7h: QA Quality. PASS (zielona) -> "DELIVERED". FAIL (czerwona) -> petla do Backend Dev. "MAX 4 ITERACJE" w srodku.

**Sekcja 3 — Rozklad kosztow (1000-1350px):**
4 slupki: 1 iteracja $0.08-$0.18, 2 iteracje $0.12-$0.27, 3 iteracje $0.16-$0.36, 4 iteracje $0.20-$0.45 (z ramka "LIMIT"). Mini-tabela kosztow per agent. "Smart Model Routing."

**Sekcja 4 — Sygnalizacja swietlna (1350-1700px):**
ZIELONY (#10B981): "Znane bugi, hotfixy, patche, regresje". ZOLTY (#CA8A04): "Zlozone bugi, performance". CZERWONY (#EF4444): "Features, security, nieznana przyczyna" ze strzalkami do wlasciwych presetow.

**Sekcja 5 — Scenariusz krok po kroku (1700-2150px):**
Null pointer fix: Krok 1 Orkiestrator Read -> instrukcja. Krok 2 Backend Dev Edit+Write -> artefakt. Krok 3 QA Bash+Grep -> PASS. Fragmenty kodu w stylu terminala. "1 iteracja | $0.10 | 50s"

**Sekcja 6 — Anti-patterny (2150-2500px):**
Siatka 2x3: 1) Quick Fix do features, 2) Nieskonczona petla, 3) Tylko happy path, 4) Sycophancy loop, 5) Slepy Orkiestrator, 6) Brak testu regresji. Pomaranczowe ikony ostrzezenia.

**Sekcja 7 — Porownanie presetow (2500-2750px):**
Tabela: Solo, Quick Fix (pomaranczowa ramka), Bug Hunt, Plan Exec. Wiersze: Agentow, QA, Feedback, Koszt, Use case.

**Sekcja 8 — Quick Reference (2750-2950px):**
Kompaktowa karta na ciemnym tle z pomaranczowa ramka: Preset ID, Tier, Agentow, Pattern, Tokeny, Koszt, Motto.

**Stopka (2950-3000px):**
"Gold Standard 2026 | Preset #02 Quick Fix | Fix-Test Loop". Zrodla: OMEGA, Google Study, IEEE. "Petla zwrotna redukuje defekty o 60-80%."

**Kolorystyka:** Ciemne tlo (#1F2937) — estetyka industrialna. Pomaranczowy (#EA580C) przewodni. Bialy (#FFFFFF) tekst. Niebieski (#3B82F6) QA. Zloty (#F59E0B) Orkiestrator. Zielony (#10B981) PASS. Czerwony (#EF4444) FAIL. Styl: ciemny, mechaniczny — zebatki i klucze jako dekoracja.
