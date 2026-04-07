# SOLO + WALIDATOR (Preset #01) — Sila Prostoty w Architekturze Multi-Agent

## Kompletny Przewodnik Edukacyjny | Wersja 2026

---

## 1. Wprowadzenie — Czym jest preset Solo + Walidator?

Wyobraz sobie proste zadanie: naprawic cieknacy kran. Czy wzywasz cala ekipe
remontowa — hydraulika, elektryka, murarza, kierownika i inspektora? Nie.
Wystarczy jeden sprawny fachowiec i ktos, kto sprawdzi efekt.

Taka jest filozofia presetu **Solo + Walidator** — najminimalniejszej
konfiguracji w systemie multi-agent. Dwa agenty. Jedno zadanie. Zero narzutu.

### Trzy Analogie do Zrozumienia Presetu Solo

**Analogia 1: Mistrz i uczen w warsztacie**

Mistrz (Orkiestrator) przyjmuje zamowienie, analizuje co zrobic, wydaje
instrukcje uczniowi (Backend Dev). Uczen wykonuje prace — tnie, szlifuje,
montuje. Gotowy produkt wraca do Mistrza. Mistrz oglada, sprawdza spoiny.
Jesli OK — zatwierdza. Jesli nie — wskazuje co poprawic. Proste, bezposrednie,
skuteczne. Bez komitetow, bez narad — jest mistrz, uczen i zadanie.

**Analogia 2: Pilot i kontroler lotow (jeden pas)**

Male lotnisko z jednym pasem. Kontroler (Orkiestrator) nadzoruje jeden samolot
(Backend Dev) — start, lot, ladowanie. Nie potrzeba radarow dla dwudziestu
samolotow ani koordynacji z innymi lotniskami. Jeden kontroler, jeden pilot.
Zlozonosc minimalna, bezpieczenstwo maksymalne.

**Analogia 3: Szef kuchni i kucharz**

Szef kuchni (Orkiestrator) dostaje zamowienie, przekazuje przepis kucharzowi
(Backend Dev). Kucharz gotuje. Szef probuje i ocenia. Jesli spelnia standardy
— idzie do klienta. Jesli nie — "za malo soli", "dosmaz cebule". Bez
sous-chefow, bez sommelier — tylko delegacja i walidacja.

---

> **Czy wiesz, ze...?**
> Okolo **45% wszystkich zadan** w typowych projektach programistycznych moze
> byc skutecznie wykonanych przez zaledwie 2 agentow. Prawie POLOWA zadan nie
> wymaga researchu, planowania, QA ani wielu builderow. Ten fenomen nazywamy
> **Regula 45%** i jest to fundament filozofii presetu Solo.

---

> **Uwaga!**
> Solo NIE jest rozwiazaniem uniwersalnym. NIE uzywaj do: zadan wymagajacych
> wielu perspektyw (frontend + backend), kodu security-critical (brak QA
> Security), zadan wymagajacych researchu (brak Researchera), ani funkcji
> obejmujacych wiele domen. Koszt eskalacji jest zawsze nizszy niz koszt
> wielokrotnych nieudanych iteracji.

---

## 2. Sklad zespolu — Kto gra w tej druzynie?

Preset Solo to dokladnie **2 agentow** — najmniejszy mozliwy zespol multi-agent.

### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | A-00 |
| **Rola** | STRATEGIA — analiza, delegacja, walidacja |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50/100 |
| **Token budget** | ~15-30K |
| **Narzedzia** | Agent (delegacja), Read, Grep, Glob |

**Co robi Orkiestrator w Solo?**

1. **Analizuje zadanie** — Zlozonosc S/M? Rozwiazanie znane? Solo wystarczy?
2. **Tworzy instrukcje** — Narrow Context: TYLKO potrzebne informacje
3. **Deleguje do Backend Dev** — jedno wywolanie z instrukcja i kontekstem
4. **Waliduje wynik** — poprawnosc, testy, error handling, zgodnosc
5. **Decyduje PASS/FAIL** — PASS: dostarcza wynik. FAIL: feedback → iteracja

Orkiestrator NIE pisze kodu, NIE prowadzi researchu, NIE projektuje.
Jego praca to wylacznie meta-rozumowanie.

### Agent B-01: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-01 |
| **Rola** | BUILD — implementacja, testy, error handling |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Token budget** | ~25-50K |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |

**Co robi Backend Dev w Solo?**

1. **Odbiera instrukcje** — precyzyjne zadanie + relevantny kontekst kodu
2. **Implementuje** — logika biznesowa, API, funkcje, klasy
3. **Pisze testy** — jednostkowe, glowna sciezka + edge cases
4. **Obsluguje bledy** — error handling, walidacja, defensywne programowanie
5. **Zwraca artefakt** — gotowy kod z testami

**Zakazane:** Agent, WebSearch, WebFetch (nie deleguje, nie researchu-je).

### Diagram architektury

```
+=====================================================+
|              PRESET: SOLO + WALIDATOR                |
|              Tier 1 — MINIMAL                        |
+=====================================================+
|                                                     |
|    +------------------+     +------------------+    |
|    |   ORKIESTRATOR   |     |   BACKEND DEV    |    |
|    |     (A-00)       |     |     (B-01)       |    |
|    |  Opus | Load 50  |     | Sonnet | Load 75 |    |
|    |  STRATEGIA       |     |  BUILD           |    |
|    +--------+---------+     +--------+---------+    |
|             |    instrukcja          |              |
|             +----------------------->|              |
|             |    artefakt (kod)      |              |
|             |<-----------------------+              |
|             |  feedback (jesli FAIL) |              |
|             +----------------------->|              |
+=====================================================+
|  Polaczenie: dwukierunkowe (typ: "two")             |
|  Tokeny: ~40-80K | Koszt: $0.04-$0.15 | <30s       |
+=====================================================+
```

---

## 3. Wzorzec architektoniczny — Direct Delegation

### Czym jest Direct Delegation?

Direct Delegation to **najprostszy wzorzec komunikacji** w systemach multi-agent.
Wariant Hub-and-Spoke zredukowany do minimum: jedna piasta (Orkiestrator),
jedna szprycha (Backend Dev). Jak rower z jednym kolem — najprostszy pojazd,
ktory jeszcze sie porusza.

### Polaczenie dwukierunkowe (typ `two`)

- **Kierunek 1:** Orkiestrator → Backend Dev — instrukcja, kontekst, wymagania
- **Kierunek 2:** Backend Dev → Orkiestrator — artefakt (kod + testy)
- **Kierunek 3 (opcja):** Orkiestrator → Backend Dev — feedback jesli FAIL

Gdyby polaczenie bylo jednokierunkowe, walidacja bylaby niemozliwa — a walidacja
jest istota Solo.

### Zlozonosc komunikacyjna: O(2) — absolutne minimum

| Konfiguracja | Agentow | Potencjalne kanaly |
|-------------|---------|-------------------|
| **Solo** | **2** | **1** |
| Trio | 3 | 3 |
| Startup | 5 | 10 |
| Full GS | 14 | 91 |

Zero szansy na zagubione wiadomosci, brak deadlockow, brak race conditions.

### Dlaczego 2 jest lepsze niz 1?

| Aspekt | Single Agent | Solo (2 agenty) |
|--------|-------------|------------------|
| Strategia | Ten sam model | Opus (najlepszy) |
| Implementacja | Ten sam model | Sonnet (optymalny) |
| Walidacja | Brak (self-review) | Niezalezna |
| Kontekst | Wszystko w 1 oknie | Rozdzielony |
| Koszt | Opus za wszystko ($$$) | Opus+Sonnet ($$) |
| Halucynacje | Wyzsze ryzyko | Nizsze (cross-check) |

**Orkiestrator wnosi meta-rozumowanie**, Backend Dev wnosi **ekspertyze**.
Jeden agent robiacy oba naraz ma gorszy wynik w obu. To zasada specjalizacji.

> **Czy wiesz, ze...?**
> Google Research odkryl efekt "diminishing returns" w multi-agent — po pewnym
> progu dodawanie agentow nie poprawia jakosci. Dla prostych zadan prog = 2.

---

## 4. Regula 45% — Fundament filozofii Solo

### Skad sie wziela ta liczba?

Analiza tysiecy zadan w realnych projektach programistycznych:

- **~45%** wymaga TYLKO implementacji — rozwiazanie znane, jeden builder
- **~25%** wymaga dodatkowego QA — testowanie, audyt, walidacja jakosci
- **~15%** wymaga researchu — dokumentacja, porownanie technologii
- **~10%** wymaga planowania — dekompozycja, architektura, koordynacja
- **~5%** wymaga pelnego pipeline'u — wszystkie warstwy

Prawie polowa zadan = Solo! Uzycie wiekszego presetu to marnowanie zasobow
— jak wynajmowanie ciezarowki do przewiezienia jednej torby.

### Zadania pasujace do Solo vs NIE-Solo

| Solo (45%) | NIE-Solo (55%) |
|-----------|----------------|
| Bugfixy w jednym pliku | Feature'y frontend + backend |
| Proste refaktoringi | Integracje z nieznanym API |
| Skrypty jednorazowe | Kod security-critical |
| Zmiany konfiguracji | Redesign UI/UX |
| Operacje CRUD | Optymalizacja wydajnosci |
| Poprawki logiki | Migracja technologii |

### Schemat decyzyjny: "Czy powinienem uzyc Solo?"

```
                START
                  |
        Czy pojedynczy plik/modul?
              /        \
           NIE          TAK
            |             |
    Rozwaz wiekszy    Czy rozwiazanie ZNANE?
    preset               /        \
                      NIE          TAK
                       |             |
                  Uzyj RECON    Czy security-critical?
                  (+ researcher)    /        \
                               TAK          NIE
                                |             |
                           Uzyj BUG_HUNT   ⚡ SOLO!
```

### Analiza kosztow

| Preset | Agentow | Tokeny | Koszt | Czas |
|--------|---------|--------|-------|------|
| **Solo** | **2** | **40-80K** | **$0.04-$0.15** | **<30s** |
| Quick Fix | 3 | 80-150K | $0.08-$0.20 | ~90s |
| Trio | 3 | 100-200K | $0.10-$0.30 | ~90s |
| Plan & Exec | 4 | 150-300K | $0.15-$0.50 | ~180s |
| Full GS | 14+ | 500K-1M+ | $0.50-$2.00+ | ~10min |

Solo oszczedza **60-90% tokenow** i **80-95% kosztow** vs Gold Standard.

> **Czy wiesz, ze...?**
> Jesli 45% z 20 dziennych zadan obsluzy Solo zamiast pelnego pipeline'u,
> oszczednosci za tydzien siegaja **setek dolarow** na organizacje.

---

## 5. Przeplyw danych — Jak pracuje dwuosobowy zespol?

Przyklad: "Napraw bug w /api/users — 500 gdy user nie ma emaila."

**Krok 1:** User → Orkiestrator: zgloszenie buga

**Krok 2:** Orkiestrator analizuje: Zlozonosc S, backend, brak potrzeby
researchu → **Solo odpowiedni**

**Krok 3:** Orkiestrator tworzy instrukcje (Narrow Context):

```
ZADANIE: Napraw null pointer w /api/users
PLIK: src/routes/users.js (linie 45-60)
BUG: 500 gdy user.email jest null
WYMAGANIA:
  - Null-check na user.email
  - Zwroc email: null zamiast crash
  - Dodaj test jednostkowy
KONTEKST: [zawartosc users.js]
```

**Czego NIE wysyla:** calej struktury projektu, historii commitow,
dokumentacji API, kodow innych endpointow, plikow konfiguracyjnych.

**Krok 4:** Backend Dev implementuje:

```javascript
// PRZED (bug)
res.json({ email: user.email.toLowerCase() }); // CRASH jesli null

// PO (fix)
res.json({ email: user.email ? user.email.toLowerCase() : null });
```

**Krok 5:** Backend Dev pisze test:

```javascript
it('should handle user without email', async () => {
  const user = await createUser({ name: 'Test', email: null });
  const res = await request(app).get(`/api/users/${user.id}`);
  expect(res.status).toBe(200);
  expect(res.body.email).toBeNull();
});
```

**Krok 6:** Artefakt wraca do Orkiestratora

**Krok 7:** Orkiestrator waliduje: null-check OK, test OK, brak regresji → **PASS**

**Krok 8:** Wynik dostarczony uzytkownikowi. Koszt: $0.05, czas: 25s.

### Pseudokod orkiestracji

```python
def solo_workflow(user_request):
    analysis = orkiestrator.analyze(user_request)
    if analysis.complexity > "M":
        return escalate_to_larger_preset(user_request)

    instruction = orkiestrator.create_instruction(
        task=analysis.task,
        relevant_files=analysis.get_relevant_files_only()
    )
    artifact = backend_dev.execute(instruction)
    validation = orkiestrator.validate(artifact)

    if validation.passed:
        return deliver_to_user(artifact)

    # Max 2 iteracje
    for i in range(2):
        feedback = orkiestrator.create_feedback(validation.issues)
        artifact = backend_dev.execute(feedback)
        validation = orkiestrator.validate(artifact)
        if validation.passed:
            return deliver_to_user(artifact)

    return escalate_to_larger_preset(user_request)
```

---

## 6. Koszt i tokeny — Dlaczego Solo jest najtanszy?

### Rozklad kosztow

**Orkiestrator (Opus):** ~15-30K tokenow → ~$0.001-$0.003
**Backend Dev (Sonnet):** ~25-50K tokenow → ~$0.001-$0.003
**Suma czysta:** ~$0.002-$0.006. Z overhead systemu: **$0.04-$0.15**

### Koszt typowych zadan

| Zadanie | Tokeny | Koszt | Czas |
|---------|--------|-------|------|
| Bugfix (null check) | ~40K | ~$0.04 | ~15s |
| Refactoring | ~60K | ~$0.08 | ~25s |
| Skrypt migracji | ~50K | ~$0.06 | ~20s |
| CRUD endpoint | ~70K | ~$0.10 | ~28s |
| Zmiana konfiguracji | ~35K | ~$0.04 | ~12s |

### Model Routing — dlaczego Opus + Sonnet?

- **Opus** ($15/$75) dla strategii — najlepsze rozumowanie do analizy i walidacji
- **Sonnet** ($3/$15) dla implementacji — 5x tanszy, wystarczajacy do kodowania

Gdyby oba uzywaly Opus: koszt 3-5x wyzszy bez proporcjonalnego wzrostu jakosci.
Gdyby oba uzywaly Haiku: jakosc walidacji drastycznie spadlaby.

### Kiedy Solo kosztuje WIECEJ niz powinien?

Paradoks: jesli Backend Dev potrzebuje 5 iteracji (bo zadanie za trudne),
kazda to ~40K tokenow. Po 5 iteracjach = 200K+ — wiecej niz Trio w jednym
przejsciu. **Zasada: jesli Solo wymaga >2 iteracji, eskaluj.**

---

## 7. Kiedy uzywac (a kiedy NIE)

### Sygnalizacja swietlna

```
  ZIELONE (UZYWAJ)          ZOLTE (ROZWAZ)         CZERWONE (NIE UZYWAJ)
  ==================       ==================      ====================
  • Bugfix 1 plik          • Srednia zlozonosc     • Multi-domain
  • Refactoring            • Znane rozwiazanie     • Security-critical
  • Skrypt jednorazowy       ale wiele plikow      • Wymaga researchu
  • Zmiana konfiguracji    • Prototypowanie        • UI/UX redesign
  • CRUD endpoint          • Czas krytyczny        • Wiele komponentow
  • Poprawka logiki                                • Optymalizacja perf.
  • Bump zaleznosci                                • Migracja technologii
```

### Przyklady decyzji

| Zadanie | Decyzja | Dlaczego |
|---------|---------|----------|
| Bug 500 error w API | ⚡ Solo | 1 plik, znane rozwiazanie |
| Dashboard z wykresami | ❌ NIE | Frontend + backend + design |
| Skrypt SQL migracji | ⚡ Solo | Jednorazowy, jasne wymagania |
| Integracja Stripe | ❌ NIE | Research dokumentacji |
| Zmiana nazwy zmiennej | ⚡ Solo | Prosty refactoring |
| System autentykacji | ❌ NIE | Security-critical |
| Dodanie pola do User | ⚡ Solo | CRUD, 1 model, 1 endpoint |
| Implementacja Redis cache | ❌ NIE | Research + planowanie |

---

## 8. Scenariusze z zycia wziate

### Scenariusz 1: Bugfix — PASS w 25 sekund

```
[T=0s]  User: "Fix /api/users/123 — 500 gdy brak emaila"
[T=2s]  Orkiestrator: zlozonosc S, backend, brak researchu → Solo ⚡
[T=5s]  Instrukcja → Backend Dev (Narrow Context: tylko users.js)
[T=18s] Backend Dev: null-check + test → artefakt
[T=22s] Orkiestrator: walidacja → PASS ✓
[T=25s] Wynik dostarczony

KOSZT: ~40K tokenow, ~$0.05 | CZAS: 25s | ITERACJE: 0
```

### Scenariusz 2: Refactoring — PASS po 1 feedback

```
[T=0s]  User: "Rozbij processOrder() — 200 linii, niemozliwe do utrzymania"
[T=3s]  Orkiestrator: zlozonosc M, 1 plik, znana technika → Solo ⚡
[T=8s]  Instrukcja: wydziel validateOrder(), calculatePrice(),
        applyDiscount(), saveOrder()
[T=35s] Backend Dev: 4 funkcje + testy, ALE calculatePrice()
        nie obsluguje walut
[T=40s] Orkiestrator: walidacja → FAIL (brak walut)
[T=42s] Feedback: "calculatePrice() musi obslugiwac currency"
[T=58s] Backend Dev: poprawka + testy USD/EUR/PLN → artefakt
[T=62s] Orkiestrator: walidacja → PASS ✓

KOSZT: ~80K tokenow, ~$0.10 | CZAS: 62s | ITERACJE: 1
```

### Scenariusz 3: FAIL — eskalacja (zle dobrany preset)

```
[T=0s]  User: "Dodaj platnosci Stripe do e-commerce"
[T=3s]  Orkiestrator POWINIEN eskalowac (zlozonosc L, research needed)
        ALE probuje Solo mimo wszystko...
[T=30s] Backend Dev: uzywa przestarzalego API (halucynacja),
        brak webhookow, hardcoded API keys!
[T=35s] Orkiestrator: FAIL. Feedback.
[T=60s] Backend Dev: nadal zle — brak wiedzy o Stripe
[T=65s] FAIL 2x → ESKALACJA do recon

ZMARNOWANE: ~120K tokenow, ~$0.15
LEKCJA: Koszt nieudanych iteracji > koszt wiekszego presetu od razu
```

---

## 9. Anti-patterny (ZLE vs DOBRZE)

### 1. Solo do multi-domain feature

**ZLE:** "Zbuduj dashboard" → Solo → Backend pisze tez frontend → slaby wynik
**DOBRZE:** "Zbuduj dashboard" → eskalacja do preset startup (5 agentow)

### 2. Orkiestrator nie waliduje (one-shot)

**ZLE:** Orkiestrator → Backend → wynik → User (bez sprawdzenia!)
**DOBRZE:** Orkiestrator → Backend → wynik → **walidacja** → User

### 3. Context Overload

**ZLE:** "Napraw users.js. Oto 500 plikow projektu: [2M tokenow]"
**DOBRZE:** "Napraw users.js:47. Oto 30 relevantnych linii: [...]"

### 4. Solo do security-critical kodu

**ZLE:** "Dodaj JWT" → Solo → brak rotation, secret w kodzie, brak brute-force
**DOBRZE:** "Dodaj JWT" → preset bug_hunt/security z QA Security audytem

### 5. Nieskonczone iteracje zamiast eskalacji

**ZLE:** iteracja 1 → FAIL → iter 2 → FAIL → iter 3 → FAIL → iter 4...
**DOBRZE:** iter 1 → FAIL → iter 2 → FAIL → **ESKALACJA** do wiekszego presetu

### 6. Solo z lukami w wiedzy

**ZLE:** "Uzyj GraphQL Federation v2" → Solo → halucynacje (brak wiedzy)
**DOBRZE:** "Uzyj GraphQL Federation v2" → recon (Researcher czyta dokumentacje)

---

## 10. Porownanie z innymi presetami

### Tabela porownawcza

| Aspekt | Solo ⚡ | Quick Fix | Recon | Trio | Plan&Exec |
|--------|---------|-----------|-------|------|-----------|
| Agentow | 2 | 3 | 3 | 3 | 4 |
| Tier | 1 MIN | 1 MIN | 1 MIN | 2 CORE | 2 CORE |
| Builder | 1 (Back) | 1 (Back) | 1 (Back) | 1 (Back) | 2 (B+F) |
| QA | BRAK | Quality | BRAK | Quality | Quality |
| Research | BRAK | BRAK | Tech | BRAK | BRAK |
| Planer | BRAK | BRAK | BRAK | BRAK | Planer |
| Koszt | $0.04-0.15 | $0.08-0.20 | $0.08-0.20 | $0.10-0.30 | $0.15-0.50 |
| Latency | <30s | ~90s | ~120s | ~90s | ~180s |
| Walidacja | Orkiestr. | QA Agent | Orkiestr. | QA Agent | QA Agent |

### Kluczowe roznice

**Solo vs Quick Fix:** Quick Fix dodaje QA Quality — niezalezne testowanie
przez oddzielnego agenta. Solo jest szybszy i tanszy, ale walidacja mniej
dokladna. Wybieraj Quick Fix gdy blad w produkcji bylby kosztowny i potrzebujesz
formalnego sprawdzenia jakosci kodu przez niezalezna "pare oczu".

**Solo vs Recon:** Recon dodaje Researcher Tech — badanie dokumentacji
i best practices przed implementacja. Uzyj Recon gdy nie znasz rozwiazania
z gory, pracujesz z nowym API lub potrzebujesz aktualnych informacji
wykraczajacych poza wiedze trenowana modelu.

**Solo vs Trio:** Trio dodaje formalny QA Quality z petla zwrotna do Buildera.
Lepszy gdy jakosc kodu jest priorytetem, blad bylby kosztowny w produkcji,
lub gdy potrzebujesz code review od oddzielnego agenta specjalizujacego sie
w testowaniu i walidacji.

### Drzewo eskalacji z Solo

```
SOLO → 1. iteracja PASS? → KONIEC
                    |
                   FAIL
                    |
        Problem = brak wiedzy? → TAK → RECON
                    |
                   NIE
                    |
        Problem = jakosc/testy? → TAK → QUICK FIX / TRIO
                    |
                   NIE
                    |
        2. iteracja PASS? → TAK → KONIEC
                    |
                   FAIL → PLAN & EXECUTE
```

---

## 11. Quick Reference Card

```
+================================================================+
|                                                                |
|          ⚡ QUICK REFERENCE — SOLO + WALIDATOR ⚡              |
|             Preset #01 | Tier 1 MINIMAL                        |
|                                                                |
+================================================================+
|  PRESET ID:    solo                                            |
|  WZORZEC:      Direct Delegation (Hub-and-Spoke minimal)       |
+----------------------------------------------------------------+
|  AGENCI:                                                       |
|    A-00 Orkiestrator | Opus   | Load 50 | STRATEGIA            |
|    B-01 Backend Dev  | Sonnet | Load 75 | BUILD                |
+----------------------------------------------------------------+
|  WORKFLOW:                                                     |
|    Orkiestrator →  Backend Dev → Orkiestrator (walidacja)      |
|    Polaczenie: two (dwukierunkowe) | Max iteracji: 2           |
+----------------------------------------------------------------+
|  KOSZTY:                                                       |
|    Tokeny: ~40-80K | Koszt: $0.04-$0.15 | Latency: <30s       |
+----------------------------------------------------------------+
|  UZYWAJ:  Bugfix, refactoring, skrypt, config, CRUD            |
|  UNIKAJ:  Multi-domain, security, research, UI redesign        |
+----------------------------------------------------------------+
|  ESKALACJA:                                                    |
|    Brak QA → quick_fix | Brak research → recon                 |
|    Za zlozony → plan_exec | >2 iteracji → eskaluj              |
+================================================================+
```

---

## 12. Slowniczek (Glossary)

| Termin | Definicja |
|--------|-----------|
| **Direct Delegation** | Najprostszy wzorzec multi-agent: orkiestrator deleguje do jednego workera |
| **Hub-and-Spoke** | Topologia: centralny wezel (hub) laczy sie z peryferyjnymi (spokes) |
| **Regula 45%** | ~45% zadan mozna wykonac 2 agentami (orkiestrator + 1 worker) |
| **Narrow Context** | Agent dostaje TYLKO informacje potrzebne do zadania |
| **Feedback Loop** | Petla zwrotna Orkiestrator-Builder. W Solo max 2 iteracje |
| **Token Budget** | Limit tokenow na zadanie. Solo: ~40-80K |
| **Model Routing** | Przypisanie modeli do rol: Opus (strategia) + Sonnet (implementacja) |
| **PASS/FAIL** | Decyzja walidacji: PASS = dostarcz, FAIL = feedback + iteracja |
| **Eskalacja** | Przeniesienie do wiekszego presetu po 2 nieudanych iteracjach |
| **Tier** | Poziom presetu: 1 MINIMAL, 2 CORE, 3 PRO, 4 ENTERPRISE |
| **Bidirectional** | Polaczenie dwukierunkowe (typ "two"): dane plyna w obie strony |
| **One-shot** | Wykonanie bez walidacji — anti-pattern w Solo |
| **Load** | Obciazenie agenta 0-100. Orkiestrator: 50, Backend Dev: 75 |
| **Artefakt** | Produkt pracy agenta: kod, testy, konfiguracja |
| **Single Responsibility** | Kazdy agent robi jedna rzecz: Ork. zarzadza, Backend implementuje |
| **Diminishing Returns** | Dodawanie agentow ponad prog nie poprawia jakosci |
| **Context Window** | Max tekst przetwarzany przez model. Opus: 200K tokenow |
| **Smart Routing** | Kierowanie zadan: proste→Solo, srednie→trio, zlozone→gold_standard |
| **Anti-pattern** | Wzorzec postepowania ktory wydaje sie poprawny, ale prowadzi do problemow |
| **Iteration Cap** | Limit iteracji w petli zwrotnej. Solo: max 2 przed eskalacja |

---

## ZRODLA

1. Gold Standard 2026 — Architektura Multi-Agent AI (dokumentacja wewnetrzna)
2. Anthropic Claude Model Cards — specyfikacje Haiku, Sonnet, Opus
3. Agent Architecture Designer — konfiguracje presetow i pipeline'ow
4. Google Research — "Scaling Laws for Multi-Agent Systems" (diminishing returns)
5. Regula 45% — analiza empiryczna zadan w projektach programistycznych

---

# PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

```
Stworz prezentacje wideo (16:9, 5-7 minut) o presecie Solo + Walidator
z architektury Gold Standard 2026 multi-agent AI.

HOOK OTWIERAJACY (pierwsze 10 sekund):
"45% zadan nie potrzebuje wiecej niz 2 agentow."
Duzy numer "45%" z efektem glitch/flash na ciemnym tle.
Animacja: 14 agentow → zoom out → wiekszosc obsluzone przez 2 ikony.
Tytul: "SOLO + WALIDATOR — Sila Prostoty"

MOTYW WIZUALNY:
- Kolor glowny: Electric Yellow (#EAB308)
- Tlo: ciemny grafit (#1F2937) z subtelnymi liniami siatki
- Akcentowy: bialy (#FFFFFF), ostrzezenia: czerwony (#EF4444)
- Motyw: blyskawica ⚡ — szybkosc, energia, prostota
- Efekty: szybkie przejscia, electric sparks
- Font: bold sans-serif (Inter, Poppins)

STRUKTURA SLAJDOW:

1. INTRO (0:00-0:30)
   - Hook "45%" z electric glow
   - 14 agentow → 12 znika → zostaja 2
   - Badge: "Tier 1 | 2 agentow | <30s | $0.04-$0.15"

2. TRZY ANALOGIE (0:30-2:00)
   - Split-screen: analogia po lewej, AI po prawej
   - Mistrz+uczen: warsztat → Orkiestrator+Backend Dev
   - Pilot+kontroler: lotnisko → analiza+delegacja
   - Szef+kucharz: kuchnia → walidacja artefaktu
   - Kazda 30s z animacja ilustracyjna

3. SKLAD ZESPOLU (2:00-2:45)
   - Dwie karty z bounce-in:
     * Orkiestrator: Opus, Load 50, STRATEGIA
     * Backend Dev: Sonnet, Load 75, BUILD
   - Strzalka dwukierunkowa: "instrukcja →" / "← artefakt"
   - Stat: "Overhead: O(2) — minimum komunikacyjne"

4. REGULA 45% (2:45-3:45)
   - Pie chart: 45% zolty (Solo), reszta szara
   - Lista Solo-tasks z checkmark animation
   - Lista NIE-Solo z czerwonym X

5. WORKFLOW LIVE DEMO (3:45-5:00)
   - Bug fix w czasie rzeczywistym z timerem:
     [0s] request → [2s] analiza → [5s] instrukcja →
     [18s] implementacja (typewriter) → [22s] walidacja → [25s] PASS
   - Timer w rogu, koszt $0.05 w drugim rogu

6. ANTI-PATTERNS (5:00-5:45)
   - 5 kart w gallery carousel:
     Solo do multi-domain ✗ | Brak walidacji ✗ |
     Context overload ✗ | Solo do security ✗ | 5+ iteracji ✗
   - Kazda: ZLE (czerwone) vs DOBRZE (zielone)

7. POROWNANIE (5:45-6:30)
   - Bar chart: Solo (najkrotszy) → Gold Standard (najdluzszy)
   - Carousel: Solo vs Quick Fix vs Recon vs Trio

8. OUTRO (6:30-7:00)
   - "Prostota to nie ograniczenie — to supermoc."
   - Blyskawica ⚡ uderza w logo Solo
   - CTA: "Poznaj Quick Fix (#02)"

MUZYKA: Upbeat electronic, 120-140 BPM, drop przy 45% reveal
NARRATOR: Energiczny, szybki, pauzy przy kluczowych liczbach
```

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Stworz pionowa infografike (1080x3000px) o presecie Solo + Walidator
z architektury Gold Standard 2026 multi-agent AI.

STYL WIZUALNY:
- Tlo: ciemny grafit (#1F2937) z subtylna siatka
- Kolor glowny: Electric Yellow (#EAB308)
- Tekst: bialy (#FFFFFF) i jasny szary (#D1D5DB)
- Akcent pozytywny: zielony (#10B981)
- Akcent negatywny: czerwony (#EF4444)
- Font: bold sans-serif, czytelny
- Motyw: blyskawica, minimalizm, szybkosc
- Separatory: cienka zolta linia z glow

SEKCJA 1: NAGLOWEK (250px)
- Tytul: "SOLO + WALIDATOR" w Electric Yellow z glow
- Podtytul: "Sila Prostoty — Preset #01"
- Ikona blyskawicy ⚡ (80px)
- Badge'y: "Tier 1" | "2 Agentow" | "<30s" | "$0.04-$0.15"

SEKCJA 2: KARTY AGENTOW (400px)
- Dwie karty obok siebie (tlo #374151, zolte obramowanie):
  * ORKIESTRATOR (A-00): Opus, Load 50, STRATEGIA, $15/$75
  * BACKEND DEV (B-01): Sonnet, Load 75, BUILD, $3/$15
- Strzalka dwukierunkowa miedzy nimi w Electric Yellow

SEKCJA 3: REGULA 45% (350px)
- Donut chart (280px): 45% zolty "SOLO", reszta w odcieniach szarosci
- Lista: "✓ Bugfixy ✓ Refactoring ✓ Skrypty ✓ Config ✓ CRUD"
- Podpis: "Prawie polowa zadan = 2 agentow"

SEKCJA 4: WORKFLOW (350px)
- 2 wezly (zolte okregi): ORKIESTRATOR ↔ BACKEND DEV
- Strzalki: "1. Instrukcja →" / "← 2. Artefakt" / "3. Feedback →"
- Timeline 8 krokow: Analiza→Instrukcja→Delegacja→Implementacja→
  Testy→Artefakt→Walidacja→PASS/FAIL

SEKCJA 5: SYGNALIZACJA SWIETLNA (300px)
- 3 kolumny: ZIELONY (uzywaj) | ZOLTY (rozwaz) | CZERWONY (nie uzywaj)
- Po 5-7 punktow w kazdej kolumnie z ikonami ✓ / ? / ✗

SEKCJA 6: POROWNANIE KOSZTOW (300px)
- Horizontal bar chart: Solo→Quick Fix→Recon→Trio→Plan&Exec
- Solo najkrotszy slupek, adnotacja "Najnizszy koszt"
- Drugi wiersz: czas (<30s → ~90s → ~120s → ~90s → ~180s)

SEKCJA 7: SCENARIUSZ (250px)
- 5 paneli mini-komiksu bugfix:
  Bug → Analiza → Kodowanie → Walidacja → PASS
- "25 sekund | $0.05 | 0 iteracji"

SEKCJA 8: ANTI-PATTERNY (250px)
- Siatka 2x3 z kartami: multi-domain ✗ | brak walidacji ✗ |
  context overload ✗ | security ✗ | 5+ iteracji ✗ | luki wiedzy ✗

SEKCJA 9: QUICK REFERENCE (200px)
- Box (#111827) z zaokraglonymi rogami
- 2 kolumny kluczowych danych: preset, tier, agentow, koszt, czas

SEKCJA 10: STOPKA (100px)
- "Gold Standard 2026 | Preset #01 — Solo + Walidator | Tier 1"

DEKORACJE:
- Linie siatki na tle (blueprint)
- Electric glow na elementach (yellow blur 10px)
- Ikony ⚡ jako separatory
- Numeracja: "01 //", "02 //", itp.
```

---

*Dokument wygenerowany dla systemu Gold Standard 2026 Multi-Agent AI Architecture.*
*Preset: Solo + Walidator (#01) | Tier: 1 MINIMAL | Wzorzec: Direct Delegation*
