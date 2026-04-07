# QA Quality (Q-02) — Audytor Jakosci w Architekturze Multi-Agent

## Przewodnik edukacyjny | Gold Standard 2026

---

# 1. Wprowadzenie — Kim jest QA Quality?

QA Quality (Q-02) to agent odpowiedzialny za **audyt jakosci kodu i zgodnosci ze specyfikacja**
w systemie multi-agentowym. Dziala w warstwie QA/AUDYT (Level 4) — **najwyzszej warstwie
architektury**, obok QA Security (Q-01), ale z zupelnie inna perspektywa. Gdzie Q-01 pyta
"Jak to mozna zlamac?", Q-02 pyta: **"Czy to dziala poprawnie?"**

## Trzy analogie, zeby zrozumiec role

### Analogia 1: Recenzent naukowy (peer reviewer)

Wyobraz sobie, ze naukowiec napisal artykul o nowym leku. Zanim artykul zostanie opublikowany
w prestiowym czasopismie, przechodzi przez **recenzje naukowa**. Recenzent nie pisze artykulu
od nowa. Nie prowadzi badan. Ale sprawdza: czy metodologia jest poprawna? Czy dane potwierdzaja
wnioski? Czy eksperymenty mozna odtworzyc? Czy niczego nie pominieto? Jesli znajdzie braki
— pisze raport z uwagami, a autorzy poprawiaja. QA Quality robi dokladnie to samo z kodem:
sprawdza, czy artefakt spelnia specyfikacje, czy testy pokrywaja scenariusze, czy kod jest
czytelny i wydajny.

### Analogia 2: Kontroler jakosci w fabryce samochodow

Na linii produkcyjnej Toyota kazdy samochod przechodzi przez stacje kontroli jakosci.
Kontroler nie buduje samochodu — on go **testuje**. Sprawdza, czy drzwi zamykaja sie
prawidlowo, czy silnik odpala za kazdym razem, czy hamulce reaguja w zakresie normy.
Ma liste kryteriow i wartosci progowe. Jesli cos nie spelnia normy — samochod wraca
na linie. QA Quality to taki kontroler: ma checklist (specyfikacja), ma progi akceptacji
(>80% pokrycia testami, funkcje <50 linii, zagniezdzenie <3 poziomy) i systematycznie
weryfikuje kazdy artefakt.

### Analogia 3: Egzaminator na uczelni

Student (Koder) napisal prace (artefakt). Promotor (Orkiestrator) wyslal ja do recenzenta
(QA Quality). Egzaminator sprawdza: czy praca odpowiada na postawione pytania (specyfikacja)?
Czy argumenty sa poparte dowodami (testy)? Czy nie ma bledow logicznych (edge cases)?
Czy tekst jest czytelny (code quality)? Egzaminator nie przepisuje pracy — pisze recenzje.
Jesli praca jest ponizej standardu, student ja poprawia. Dokladnie tak dziala cykl
QA Quality -> raport -> Koder poprawia -> ponowny audyt.

> **Czy wiesz, ze...?**
> QA Quality i QA Security dzialaja **ROWNOLEGLE** — w tym samym czasie, niezaleznie
> od siebie. To celowa decyzja architektoniczna zapobiegajaca groupthink (mysli grupowej).
> Kazdy z nich pisze wlasny raport, nie znajac wynikow drugiego. Dopiero Manager QA
> (Q-03) widzi oba raporty i syntetyzuje je w jedna decyzje GO/NO-GO.

> **Uwaga!**
> QA Quality NIGDY nie naprawia kodu. Jesli znajdzie brakujacy test, nieobsluzony
> edge case lub funkcje na 120 linii — raportuje to. Orkiestrator odsyla artefakt
> do Kodera, ktory dokonuje naprawy. Audytor, ktory naprawia to co audytuje,
> traci obiektywnosc — to fundamentalna zasada rozdzielenia obowiazkow.

---

# 2. Kluczowe Obowiazki

QA Quality (Q-02) realizuje **6 fundamentalnych obowiazkow**:

## 2.1 Weryfikacja zgodnosci ze specyfikacja (Spec Compliance Verification)

Najwazniejszy obowiazek. QA Quality porownuje dostarczony artefakt z oryginalna specyfikacja
punkt po punkcie. Kazde wymaganie musi miec odpowiadajacy mu fragment implementacji.

```javascript
// SPECYFIKACJA mowi: "Formularz rejestracji z walidacja email i hasla min. 8 znakow"

// QA Quality sprawdza:
// [OK] Formularz rejestracji istnieje           -> src/components/RegisterForm.js
// [OK] Walidacja email istnieje                 -> validateEmail(input) w linii 23
// [BRAK] Walidacja dlugosci hasla               -> NIGDZIE w kodzie!
// [BRAK] Komunikat bledu dla krotkiego hasla    -> Nie zaimplementowano

// Raport: QLT-001 | HIGH | Spec Compliance
// "Brak walidacji minimalnej dlugosci hasla — wymaganie ze specyfikacji niespelnione"
```

## 2.2 Analiza pokrycia testami (Test Coverage Analysis)

QA Quality identyfikuje brakujace testy, niepokryte sciezki wykonania i dazy do
progu **>80% pokrycia**. Uzywa narzedzia Bash do uruchomienia testow i narzedzi
pokrycia (np. `jest --coverage`, `pytest --cov`).

```bash
# QA Quality uruchamia testy:
Bash("npm test -- --coverage")

# Wynik:
# Statements: 72%    <- PONIZEJ PROGU 80%
# Branches:   58%    <- KRYTYCZNIE NISKI
# Functions:  81%    <- OK
# Lines:      74%    <- PONIZEJ PROGU

# QA Quality identyfikuje brakujace testy:
# - src/payment.js: linia 42-67 (obsluga bledow platnosci) -> 0% pokrycia
# - src/cart.js: linia 88-95 (rabat dla VIP) -> brak testu
```

## 2.3 Testowanie edge case'ow (Edge Case Testing)

Systematyczne sprawdzanie warunkow granicznych: null, undefined, puste tablice,
wartosci ujemne, bardzo duze liczby, znaki specjalne, puste stringi.

```javascript
// QA Quality szuka nieobsluzonych edge case'ow:

// ZNALEZIONE: Funkcja obliczajaca rabat NIE obsluguje:
function calculateDiscount(price, discountPercent) {
  return price * (1 - discountPercent / 100);
}
// Edge cases BEZ obslugi:
// - price = 0          -> zwraca 0, OK
// - price = -50        -> zwraca ujemna wartosc! BEZ WALIDACJI
// - discountPercent = 150 -> zwraca ujemna cene! BEZ WALIDACJI
// - price = null       -> zwraca NaN! BEZ WALIDACJI
// - price = undefined  -> zwraca NaN! BEZ WALIDACJI
// - price = "abc"      -> zwraca NaN! BEZ WALIDACJI

// Raport: QLT-002 | HIGH | Edge Case
// "Funkcja calculateDiscount nie waliduje wejscia — brak obslugi null, ujemnych, >100%"
```

## 2.4 Wykrywanie code smells (Code Smells Detection)

Identyfikacja problematycznych wzorcow w kodzie: zbyt dlugie funkcje, glebokie
zagniezdzenie, duplikacja kodu, niejasne nazewnictwo.

```javascript
// ZLE: Funkcja na 87 linii z 5 poziomami zagniezdzenia
function processOrder(order) {           // Linia 1
  if (order) {                           // Poziom 1
    if (order.items.length > 0) {        // Poziom 2
      for (let item of order.items) {    // Poziom 3
        if (item.inStock) {              // Poziom 4
          if (item.price > 0) {          // Poziom 5 <- PRZEKROCZONY PROG!
            // ... 60 linii logiki ...
          }
        }
      }
    }
  }
}

// Raport: QLT-003 | MEDIUM | Code Smell
// "Funkcja processOrder: 87 linii (prog <50), zagniezdzenie 5 (prog <3).
//  Rekomendacja: rozbic na mniejsze funkcje, zastosowac early return pattern."
```

## 2.5 Analiza wydajnosci (Performance Analysis)

Wykrywanie typowych problemow wydajnosciowych: zapytania N+1, brak cache'owania,
nieoptymalne importy, brak lazy loading.

```javascript
// ZNALEZIONE: Klasyczny problem N+1 query
async function getOrdersWithProducts() {
  const orders = await db.query("SELECT * FROM orders");  // 1 zapytanie
  for (const order of orders) {
    order.products = await db.query(                       // N zapytan!
      "SELECT * FROM products WHERE order_id = ?", order.id
    );
  }
  return orders;
}
// Przy 1000 zamowien = 1001 zapytan do bazy danych!

// Raport: QLT-004 | HIGH | Performance
// "N+1 query w getOrdersWithProducts — 1+N zapytan zamiast 1-2.
//  Rekomendacja: uzyc JOIN lub batch query (WHERE order_id IN (...))"
```

## 2.6 Generowanie raportu jakosci (Report Generation)

Kompilacja wszystkich znalezien w ustrukturyzowany raport JSON z kategoria,
poziomem krytycznosci, dokladna lokalizacja i rekomendacja naprawy.

> **Czy wiesz, ze...?**
> QA Quality moze uruchamiac testy i lintery dzieki dostepowi do narzedzia Bash!
> To kluczowa roznica w porownaniu z QA Security (Q-01), ktory NIE MA dostepu
> do Bash. Q-02 moze wykonac `npm test`, `pytest`, `eslint`, `jest --coverage`
> — co daje mu realne dane o pokryciu testami i jakosci kodu.

---

# 3. Czego QA Quality NIE robi

Rownie wazne jak obowiazki sa **wyrazne granice odpowiedzialnosci**:

| Czynnosc                              | Kto to robi?              | Dlaczego NIE QA Quality?                          |
|----------------------------------------|---------------------------|---------------------------------------------------|
| Naprawianie kodu                       | Koder (po zleceniu Ork.)  | Audytor nie moze modyfikowac tego, co audytuje     |
| Pisanie nowych testow                  | Koder                     | QA Quality identyfikuje BRAKI, nie pisze testow    |
| Audyt bezpieczenstwa (XSS, SQLi, etc.) | QA Security (Q-01)        | Oddzielna specjalizacja — rozdzielenie obowiazkow  |
| Decyzja GO/NO-GO                       | Manager QA (Q-03)         | QA Quality raportuje, Manager decyduje             |
| Komunikacja z QA Security              | ZABRONIONA                | Niezaleznosc audytorow — zapobiega groupthink      |
| Modyfikacja plikow (Write/Edit)        | Koder                     | QA Quality ma narzedzia READ-ONLY + test execution |

> **Uwaga!**
> QA Quality NIE sprawdza bezpieczenstwa — to wylaczna domena QA Security (Q-01).
> Jesli Q-02 zacznie raportowac podatnosci XSS, a Q-01 zacznie oceniac czytelnosc
> kodu, granice sie rozmywaja i powstaje chaos. Kazdy audytor ma swoj wyrazny zakres.
> To jak gdyby kardiolog zaczal oceniac zeby pacjenta — nie po to jest.

---

# 4. Checklist jakosci (Code Quality Checklist)

QA Quality stosuje hierarchiczny checklist uporzadkowany wedlug priorytetow.
Priorytet oznacza kolejnosc sprawdzania — jesli artefakt nie przechodzi
CORRECTNESS, dalsze sprawdzanie jest bezcelowe.

## Priorytet 1: CORRECTNESS (Poprawnosc — zgodnosc ze specyfikacja)

| # | Kryterium                                      | Prog / Standard                        |
|---|------------------------------------------------|----------------------------------------|
| 1 | Wszystkie wymagania ze specyfikacji zaimplementowane | 100% wymagan pokrytych kodem       |
| 2 | Logika biznesowa dziala poprawnie              | Testy jednostkowe przechodza            |
| 3 | Dane wejsciowe sa walidowane                   | Kazdy input sprawdzany przed uzyciem    |
| 4 | Bledy sa obslugiwane gracefully                | try/catch, error boundaries, fallbacks  |
| 5 | Stan aplikacji jest spojny                     | Brak race conditions, brak stanu zombie |

## Priorytet 2: TEST COVERAGE (Pokrycie testami)

| # | Kryterium                                      | Prog / Standard                        |
|---|------------------------------------------------|----------------------------------------|
| 1 | Pokrycie ogolne (statements)                   | >80%                                    |
| 2 | Pokrycie galezi (branches)                     | >75%                                    |
| 3 | Happy path pokryty testami                     | 100% glownych sciezek                  |
| 4 | Error path pokryty testami                     | Kazdy catch/error handler testowany     |
| 5 | Edge cases pokryte                             | null, undefined, empty, boundary values |
| 6 | Testy integracyjne istnieja                    | Minimum dla krytycznych flow            |

## Priorytet 3: PERFORMANCE (Wydajnosc)

| # | Kryterium                                      | Prog / Standard                        |
|---|------------------------------------------------|----------------------------------------|
| 1 | Brak zapytan N+1                               | 0 wystapien                             |
| 2 | Cache zastosowany gdzie mozliwe                | Powtarzalne zapytania cache'owane       |
| 3 | Lazy loading dla ciezkich zasobow              | Obrazy, komponenty, modulow             |
| 4 | Bundle size optymalny                          | Tree-shaking, code splitting            |
| 5 | Brak wyciekow pamieci                          | Event listenery czyszczone, subscriptions |

## Priorytet 4: CODE QUALITY (Jakosc kodu / Styl)

| # | Kryterium                                      | Prog / Standard                        |
|---|------------------------------------------------|----------------------------------------|
| 1 | Dlugosc funkcji                                | <50 linii                               |
| 2 | Poziom zagniezdzenia                           | <3 poziomy (max 3)                      |
| 3 | Duplikacja kodu                                | <5% duplikacji                          |
| 4 | Nazewnictwo zmiennych i funkcji                | Opisowe, konsekwentne, w jezyku domeny  |
| 5 | Komentarze i dokumentacja                      | JSDoc/docstring dla publicznych API     |
| 6 | Konsystencja stylu                             | Zgodnosc z linterem projektu            |

> **Czy wiesz, ze...?**
> Kolejnosc priorytetow nie jest przypadkowa. Pieknie sformatowany kod, ktory
> nie spelnia specyfikacji, jest bezwartosciowy. Kod z 100% pokryciem testami,
> ale z bledna logika, przechodzi testy — ale nie dziala poprawnie. Dlatego
> CORRECTNESS jest zawsze na pierwszym miejscu:
> **Poprawnosc > Testy > Wydajnosc > Styl**

---

# 5. Model i Koszt

## Dlaczego Claude Haiku?

| Parametr                | QA Quality (Q-02)        | Dla porownania: Koder    |
|-------------------------|--------------------------|--------------------------|
| Model                   | Claude Haiku 4.5         | Claude Sonnet            |
| Koszt Input (1M tok.)   | $0.80                    | $3.00                    |
| Koszt Output (1M tok.)  | $4.00                    | $15.00                   |
| Token budget (input)    | 1,000 - 3,000            | 4,000 - 12,000           |
| Token budget (output)   | 500 - 1,500              | 2,000 - 6,000            |
| Token budget (total)    | 2,000 - 5,000            | 6,000 - 18,000           |
| Koszt na zadanie        | $0.02 - $0.08            | $0.10 - $0.50            |

### Dlaczego najtanszy model wystarcza?

QA Quality wykonuje **pattern matching i weryfikacje checklistowa** — nie potrzebuje
zaawansowanego rozumowania kreatywnego. Jego zadania to:
- Porownywanie specyfikacji z implementacja (checklist)
- Uruchamianie testow i analiza wynikow (pattern matching)
- Identyfikacja code smells wedlug jasnych kryteriow (progi liczbowe)
- Wykrywanie znanych anti-patternow (N+1, brak walidacji, duplikacja)

To praca **systematyczna oparta na kryteriach**, nie kreatywne rozwiazywanie problemow.
Haiku jest do tego idealny — szybki, tani, precyzyjny w stosowaniu regulek.

### Porownanie kosztow z innymi agentami QA

| Agent             | Model        | Load  | Koszt/zadanie  | Rola                      |
|-------------------|-------------|-------|----------------|---------------------------|
| QA Security (Q-01)| Haiku 4.5   | 50    | $0.02 - $0.08  | Audyt bezpieczenstwa       |
| QA Quality (Q-02) | Haiku 4.5   | 55    | $0.02 - $0.08  | Audyt jakosci             |
| Manager QA (Q-03) | Sonnet      | 45    | $0.08 - $0.30  | Synteza + decyzja GO/NO-GO |

> **Czy wiesz, ze...?**
> Przy koszcie $0.02-$0.08 za zadanie, mozesz uruchomic QA Quality **1000 razy**
> za mniej niz $80. To taniej niz jedna godzina pracy ludzkiego code reviewera
> na poziomie senior ($100-$200/h w branzy technologicznej).

### Obciazenie (Load): 55/100

QA Quality ma obciazenie 55 — nieco wyzsze niz QA Security (50). Dlaczego?
Zakres QA Quality jest **szerzszy**: sprawdza zgodnosc ze specyfikacja, pokrycie testami,
edge cases, code smells I wydajnosc. Q-01 skupia sie wylacznie na bezpieczenstwie.
Szersza odpowiedzialnosc = wiecej pracy = wyzszy load. Mimo to, 55/100 to umiarkowane
obciazenie — zadania sa powtarzalne i oparte na checklistach, nie wymagaja glebokiego
rozumowania.

### Rozklad budzetu tokenow

```
INPUT (1,000 - 3,000 tokenow):
  - Artefakt do audytu:           ~600 - 2,000 tokenow
  - Oryginalna specyfikacja:      ~200 - 500 tokenow
  - System prompt + instrukcje:   ~200 - 500 tokenow

OUTPUT (500 - 1,500 tokenow):
  - Raport JSON ze znalezieniami: ~300 - 1,000 tokenow
  - Podsumowanie audytu:          ~100 - 300 tokenow
  - Rekomendacja:                 ~100 - 200 tokenow

TOTAL: 2,000 - 5,000 tokenow na zadanie
```

---

# 6. Narzedzia — Arsenal analityczny

## Dostepne narzedzia

| Narzedzie | Funkcja                                    | Uzycie w audycie jakosci                           |
|-----------|--------------------------------------------|-----------------------------------------------------|
| **Read**  | Odczyt plikow                              | Czytanie kodu zrodlowego, specyfikacji, konfiguracji |
| **Grep**  | Wyszukiwanie wzorcow w plikach             | Szukanie code smells, duplikacji, anti-patternow     |
| **Bash**  | Uruchamianie komend w terminalu            | Testy, lintery, coverage tools, build check          |

## Kluczowa roznica: Q-02 MA dostep do Bash!

To najwazniejsza roznica miedzy QA Quality a QA Security w kontekscie narzedzi.
QA Security (Q-01) moze TYLKO czytac kod. QA Quality (Q-02) moze **uruchamiac testy,
lintery i narzedzia pokrycia**:

```bash
# QA Quality moze to zrobic:
Bash("npm test")                           # Uruchomienie testow jednostkowych
Bash("npm test -- --coverage")             # Pokrycie testami
Bash("npx eslint src/ --format json")      # Linter z raportem JSON
Bash("npx jest --testPathPattern=payment") # Testy konkretnego modulu
Bash("python -m pytest --cov=src tests/")  # Pytest z pokryciem

# QA Security NIE MOZE tego zrobic — nie ma Bash!
```

## Zabronione narzedzia — i DLACZEGO

| Narzedzie     | Dlaczego zabronione?                                                          |
|---------------|-------------------------------------------------------------------------------|
| **Write**     | Audytor NIE MOZE tworzyc plikow — to domena Kodera                           |
| **Edit**      | Audytor NIE MOZE modyfikowac kodu — konflikt interesow                       |
| **Agent**     | Nie moze delegowac — audyt musi byc wykonany osobiscie, bez posrednikow      |
| **WebSearch** | Audytuje istniejacy artefakt, nie bada Internetu                              |
| **WebFetch**  | Jak wyzej — calosc pracy odbywa sie na lokalnym artefakcie                   |

> **Uwaga!**
> Zasada READ-ONLY + test execution to nie ograniczenie — to **fundamentalny wymog
> niezaleznosci audytu**. QA Quality moze CZYTAC kod i URUCHAMIAC testy, ale NIE MOZE
> MODYFIKOWAC kodu. To jak inspektor w fabryce, ktory moze wlaczyc maszyne i sprawdzic
> czy dziala, ale nie moze jej naprawic — bo wtedy sam bylby odpowiedzialny za wynik
> inspekcji. Kto wtedy zaudytuje naprawe?

### Praktyczny przyklad lancucha uzycia narzedzi

```
# Krok 1: Read — przeczytaj specyfikacje
Read("spec/requirements.md")
-> "Aplikacja musi: 1) walidowac email, 2) haslo min 8 znakow, 3) rabat VIP 15%"

# Krok 2: Grep — szukaj implementacji wymagan
Grep("validateEmail|email.*valid", type="js")
-> src/validators.js:12: function validateEmail(email) { ... }

Grep("password.*length|minLength.*8|min.*password", type="js")
-> [BRAK WYNIKOW] <- Wymaganie niespelnione!

Grep("discount.*vip|vip.*15|VIP_DISCOUNT", type="js")
-> src/pricing.js:34: const VIP_DISCOUNT = 0.15;

# Krok 3: Bash — uruchom testy i sprawdz pokrycie
Bash("npm test -- --coverage --json")
-> { "testResults": [...], "coverageMap": { "statements": 72 } }

# Krok 4: Grep — szukaj code smells
Grep("function.*\{", type="js")
-> [analiza dlugosci kazdej znalezionej funkcji]

# Krok 5: Read — weryfikuj podejrzane fragmenty
Read("src/payment.js", offset=40, limit=30)
-> [widzi funkcje processPayment na 87 linii z 5 poziomami zagniezdzenia]

# Wynik: Raport z 4 znalezieniami (1 HIGH, 2 MEDIUM, 1 LOW)
```

---

# 7. Format raportu jakosci

## Szablon JSON raportu

```json
{
  "agent": "QA Quality (Q-02)",
  "timestamp": "2026-04-01T14:30:00Z",
  "artifact_id": "ART-2026-0401-001",
  "spec_reference": "SPEC-2026-0401-001",
  "audit_summary": {
    "files_analyzed": 23,
    "issues_found": 7,
    "test_coverage": {
      "statements": "72%",
      "branches": "58%",
      "functions": "81%",
      "lines": "74%"
    },
    "critical": 0,
    "high": 2,
    "medium": 3,
    "low": 2
  },
  "findings": [
    {
      "id": "QLT-001",
      "severity": "HIGH",
      "category": "Spec Compliance",
      "location": "src/validators.js (BRAK)",
      "description": "Brak walidacji minimalnej dlugosci hasla — wymaganie #2 ze specyfikacji niespelnione",
      "spec_requirement": "Haslo minimum 8 znakow",
      "suggestion": "Dodac funkcje validatePassword(pwd) z warunkiem pwd.length >= 8"
    },
    {
      "id": "QLT-002",
      "severity": "HIGH",
      "category": "Test Coverage",
      "location": "src/payment.js:42-67",
      "description": "Obsluga bledow platnosci (linie 42-67) ma 0% pokrycia testami",
      "spec_requirement": "N/A — standard jakosci",
      "suggestion": "Dodac testy: payment_declined, timeout, insufficient_funds, network_error"
    },
    {
      "id": "QLT-003",
      "severity": "MEDIUM",
      "category": "Performance",
      "location": "src/orders.js:15-30",
      "description": "Zapytanie N+1 w getOrdersWithProducts — 1+N zapytan zamiast JOIN",
      "spec_requirement": "N/A — standard wydajnosci",
      "suggestion": "Zastapic petla z zapytaniami pojedynczym JOIN lub batch query"
    },
    {
      "id": "QLT-004",
      "severity": "MEDIUM",
      "category": "Code Quality",
      "location": "src/checkout.js:10-97",
      "description": "Funkcja processCheckout ma 87 linii (prog: <50) i 5 poziomow zagniezdzenia (prog: <3)",
      "spec_requirement": "N/A — standard czytelnosci",
      "suggestion": "Rozbic na: validateCart(), calculateTotals(), applyDiscount(), submitOrder()"
    }
  ],
  "recommendation": "BLOKADA — 2 HIGH (brak walidacji hasla, brak testow platnosci). Wymagana naprawa przed release."
}
```

### Poziomy krytycznosci (severity)

| Severity   | Znaczenie                                                    | Akcja                            |
|------------|--------------------------------------------------------------|----------------------------------|
| CRITICAL   | Artefakt fundamentalnie niezgodny ze specyfikacja            | BLOKADA — natychmiastowa naprawa |
| HIGH       | Powazny brak (wymaganie niespelnione, brak testow krytyczne) | BLOKADA — naprawa przed release  |
| MEDIUM     | Problem jakosciowy o umiarkowanym wplywie                    | OSTRZEZENIE — naprawa zalecana   |
| LOW        | Drobna uwaga, dobra praktyka, styl                           | INFORMACJA — naprawa opcjonalna  |

### Kategorie znalezien

| Kategoria          | Co obejmuje                                                    | Prefix     |
|--------------------|----------------------------------------------------------------|------------|
| Spec Compliance    | Wymagania niespelnione, brakujace funkcjonalnosci              | QLT-1xx    |
| Test Coverage      | Brakujace testy, niskie pokrycie, niepokryte sciezki           | QLT-2xx    |
| Edge Case          | Nieobsluzone wartosci graniczne, null, empty, boundary         | QLT-3xx    |
| Performance        | N+1, brak cache, brak lazy loading, duzy bundle                | QLT-4xx    |
| Code Quality       | Dlugie funkcje, gleboki nesting, duplikacja, nazewnictwo       | QLT-5xx    |

> **Uwaga!**
> Raport z chocby jednym znalezieniem CRITICAL lub HIGH skutkuje rekomendacja
> **BLOKADY WDROZENIA**. Manager QA (Q-03) podejmuje ostateczna decyzje, ale
> QA Quality jasno komunikuje ryzyko. Raport z samymi MEDIUM/LOW moze zostac
> zaakceptowany przez Managera QA z ostrzezeniem.

---

# 8. Workflow — Cykl zycia audytu jakosci

## 7-krokowy pipeline audytu

```
Krok 1: ODBIOR ARTEFAKTU + SPECYFIKACJI
  Integrator (I-01) przekazuje skompletowany artefakt do warstwy QA
  Q-02 otrzymuje artefakt ORAZ oryginalna specyfikacje
  (Rownoczesnie Q-01 otrzymuje ten sam artefakt — rownolegle!)
  |
  v
Krok 2: WERYFIKACJA SPEC COMPLIANCE (Read + Grep)
  Punkt po punkcie: specyfikacja vs implementacja
  Grep szuka implementacji kazdego wymagania
  Read weryfikuje kontekst znalezionych fragmentow
  |
  v
Krok 3: URUCHOMIENIE TESTOW I POKRYCIA (Bash)
  Bash("npm test -- --coverage") lub odpowiednik
  Analiza wynikow: ktore testy przechodza, ktore nie
  Identyfikacja niepokrytych sciezek (<80% = finding)
  |
  v
Krok 4: ANALIZA EDGE CASES (Read + Grep)
  Sprawdzenie obslugi: null, undefined, empty, boundary values
  Szukanie funkcji bez walidacji inputu
  Grep("if.*null|if.*undefined|\.length\s*[=><!]")
  |
  v
Krok 5: SKANOWANIE CODE SMELLS (Grep + Read)
  Grep szuka dlugich funkcji, glebokich zagniezdzen
  Read weryfikuje podejrzane fragmenty
  Analiza duplikacji (podobne bloki kodu w roznych plikach)
  |
  v
Krok 6: ANALIZA WYDAJNOSCI (Grep + Read)
  Szukanie N+1 queries, brak cache, brak lazy loading
  Grep("for.*await.*query|\.map.*await|forEach.*await")
  Read kontekstu: czy to rzeczywisty problem N+1?
  |
  v
Krok 7: GENEROWANIE RAPORTU JSON
  Kompilacja znalezien: severity, kategoria, lokalizacja, suggestion
  Obliczenie audit_summary (liczba plikow, issues, coverage)
  Rekomendacja: GO / BLOKADA / OSTRZEZENIE
  Dostarczenie raportu do Manager QA (Q-03)
```

### Diagram wspolpracy z innymi agentami QA

```
                    +------------------+
                    |   Integrator     |
                    |    (I-01)        |
                    +--------+---------+
                             |
                    Artefakt + Spec
                             |
              +--------------+--------------+
              |                             |
              v                             v
    +------------------+          +------------------+
    |  QA Security     |          |  QA Quality      |
    |    (Q-01)        |          |    (Q-02)        |
    |                  |          |                  |
    | Bezpieczenstwo   |          | Jakosc + Testy   |
    | Read, Grep, Glob |          | Read, Grep, Bash |
    +--------+---------+          +--------+---------+
             |                             |
             |    BRAK KOMUNIKACJI!        |
             |    (niezaleznosc)           |
             |                             |
             +-------------+---------------+
                           |
                  Dwa niezalezne raporty
                           |
                           v
                 +------------------+
                 |  Manager QA      |
                 |    (Q-03)        |
                 |                  |
                 | Synteza raportow |
                 | Decyzja GO/NO-GO|
                 +--------+---------+
                          |
                   GO lub BLOKADA
                          |
                          v
                 +------------------+
                 |  Orkiestrator    |
                 |    (O-01)        |
                 +------------------+
```

> **Czy wiesz, ze...?**
> Rownolegly audyt Q-01 i Q-02 to nie tylko kwestia szybkosci — to przede wszystkim
> kwestia **niezaleznosci**. W lotnictwie pilot i kopilot niezaleznie wykonuja
> listy kontrolne przed startem. Gdyby jeden mogl powiedziec "ja juz sprawdzilem,
> nie musisz" — ryzyko przeoczenia bledu rosnie dramatycznie. Ta sama zasada
> obowiazuje w architekturze Gold Standard 2026.

### Co sie dzieje po raporcie?

Raport QA Quality trafia do Manager QA (Q-03). Mozliwe scenariusze:

| Scenariusz                           | Co robi Manager QA?                                      |
|--------------------------------------|-----------------------------------------------------------|
| 0 CRITICAL, 0 HIGH, coverage >80%   | Laczy z raportem Q-01 -> potencjalnie GO                 |
| 1+ CRITICAL lub HIGH                | BLOKADA -> Orkiestrator odsyla do Kodera                 |
| Tylko MEDIUM/LOW, coverage >75%     | Ocenia ryzyko -> moze zaakceptowac z ostrzezeniem         |
| Coverage <70%                        | BLOKADA -> zbyt niskie pokrycie testami                   |
| Sprzecznosc z raportem Q-01          | Dodatkowa analiza -> moze zlecic ponowny audyt            |

> **Uwaga!**
> Manager QA (Q-03) kontroluje maksymalnie **2 iteracje naprawy**. Jesli po
> dwoch poprawkach artefakt nadal nie spelnia standardow — caly task jest
> eskalowany do Orkiestratora z rekomendacja przebudowy.

---

# 9. Anti-patterny (ZLE vs DOBRZE)

## 6 najczestszych bledow w roli QA Quality

### 9.1 Fix-While-Auditing (Naprawianie zamiast raportowania)

```
ZLE:  QA Quality znajduje brakujacy test -> uzywa Write, zeby napisac test -> raportuje "naprawione"
      Problem: Kto zaudytuje napisany test? Audytor nie moze byc jednoczesnie autorem kodu.
      Dodatkowy problem: Q-02 NIE MA narzedzia Write — proba uzycia zakonczy sie bledem!

DOBRZE: QA Quality znajduje brakujacy test -> raportuje:
        { "id": "QLT-201", "severity": "HIGH", "category": "Test Coverage",
          "description": "Brak testu dla sciezki payment_declined",
          "suggestion": "Dodac test: expect(processPayment({status:'declined'})).toThrow()" }
        Orkiestrator odsyla do Kodera -> Koder pisze test -> Q-02 audytuje ponownie
```

### 9.2 Edge Case Blindness (Pomijanie edge case'ow)

```
ZLE:  QA Quality sprawdza TYLKO happy path:
      "Funkcja calculateDiscount(100, 10) zwraca 90 — OK, test przechodzi"
      Ignoruje: calculateDiscount(-1, 200), calculateDiscount(null, "abc"),
      calculateDiscount(Infinity, 0), calculateDiscount(0, 0)

DOBRZE: QA Quality systematycznie sprawdza 6 kategorii edge case:
        1. null / undefined / NaN
        2. Puste stringi, puste tablice, pusty obiekt
        3. Wartosci ujemne
        4. Wartosci bardzo duze (Infinity, MAX_SAFE_INTEGER)
        5. Wartosci graniczne (0, 1, -1, 100, 101)
        6. Typy bledne (string zamiast number, obiekt zamiast tablicy)
```

### 9.3 Style Over Substance (Styl wazniejszy niz poprawnosc)

```
ZLE:  QA Quality poswieca 80% raportu na uwagi o nazewnictwie i formatowaniu:
      "QLT-501: Zmienna 'x' powinna miec lepsza nazwe — LOW"
      "QLT-502: Brak spacji przed nawiasem — LOW"
      "QLT-503: Uzyto var zamiast const — LOW"
      ...a pomija, ze 3 wymagania ze specyfikacji sa niezaimplementowane!

DOBRZE: QA Quality przestrzega hierarchii priorytetow:
        NAJPIERW: Correctness (specyfikacja) -> 2 znalezienia HIGH
        POTEM:    Test Coverage               -> 1 znalezienie HIGH
        POTEM:    Performance                 -> 1 znalezienie MEDIUM
        NA KONCU: Code Quality/Style          -> 2 znalezienia LOW
```

### 9.4 Komunikacja z Q-01 (Lamanie zasady niezaleznosci)

```
ZLE:  QA Quality widzi, ze Q-01 juz skonczyl audyt i pyta:
      "Hej Q-01, znalazles cos w module platnosci? Bo ja tez cos widzialem..."
      To LAMIE zasade niezaleznosci! Efekt zakotwiczenia zniszczy obiektywnosc.

DOBRZE: QA Quality NIE WIE, co znalazl Q-01. Prowadzi wlasny, niezalezny audyt.
        Oba raporty trafiaja do Q-03 (Manager QA), ktory je syntetyzuje.
        Jesli obaj niezaleznie znajda ten sam problem — to wzmacnia confidence.
        Jesli tylko jeden znajdzie — Q-03 moze zlecic poglebiona analize.
```

### 9.5 Przepuszczanie artefaktu z niskim coverage (<70%)

```
ZLE:  Test coverage wynosi 52%. QA Quality raportuje:
      "Coverage 52% — MEDIUM. Zalecane podwyzszenie."
      Artefakt przechodzi dalej z polowa kodu niesprawdzona przez testy.

DOBRZE: Test coverage wynosi 52%. QA Quality raportuje:
        { "id": "QLT-200", "severity": "HIGH", "category": "Test Coverage",
          "description": "Pokrycie testami 52% — znacznie ponizej progu 80%.
          Niepokryte: src/payment.js (12%), src/cart.js (34%), src/auth.js (45%)",
          "suggestion": "Priorytetowo dodac testy dla: payment, cart, auth" }
        Rekomendacja: BLOKADA do czasu podwyzszenia coverage >80%
```

### 9.6 Ignorowanie wynikow testow (testy failuja, ale Q-02 nie raportuje)

```
ZLE:  Bash("npm test") zwraca: "12 passed, 3 failed, 1 error"
      QA Quality ignoruje 3 failed testy i skupia sie tylko na coverage
      "Coverage 85% — OK!" (ale 3 testy nie przechodza!)

DOBRZE: QA Quality NAJPIERW sprawdza, czy testy przechodza:
        { "id": "QLT-100", "severity": "CRITICAL", "category": "Spec Compliance",
          "description": "3 testy nie przechodza: test_payment_refund, test_cart_empty,
          test_auth_expired. Artefakt zawiera regresje.",
          "suggestion": "Naprawic failing testy przed dalszym audytem" }
```

> **Czy wiesz, ze...?**
> Kolejnosc priorytetow w anti-patternach odzwierciedla kolejnosc checklistu:
> najpierw poprawnosc (9.1, 9.6), potem testy (9.2, 9.5), potem styl (9.3),
> a zasada niezaleznosci (9.4) jest fundamentem calej architektury QA.

---

# 10. Scenariusze z zycia wziete

## Scenariusz 1: Audyt modulu platnosci e-commerce

**Kontekst:** Koder dostarczyl modul platnosci obslugujacy karty kredytowe, przelewy
i portfele cyfrowe. Specyfikacja wymaga obslugi 5 metod platnosci, walidacji kwot,
obslugi bledow i generowania potwierdzen.

**Krok 1 — Weryfikacja specyfikacji:**
```
Read("spec/payment-module.md")
-> Wymagania: 1) Karta kredytowa, 2) Przelew bankowy, 3) PayPal,
   4) Apple Pay, 5) Google Pay, 6) Walidacja kwot >0, 7) Obsluga timeout,
   8) Potwierdzenie email

Grep("paypal|PayPal|PAYPAL", type="js")
-> src/payment/paypal.js:5: class PayPalPayment { ... }  [OK]

Grep("applePay|ApplePay|apple_pay", type="js")
-> [BRAK WYNIKOW]  <- Wymaganie #4 NIESPELNIONE!

Grep("googlePay|GooglePay|google_pay", type="js")
-> [BRAK WYNIKOW]  <- Wymaganie #5 NIESPELNIONE!
```

**Krok 2 — Uruchomienie testow:**
```
Bash("npm test -- --coverage --testPathPattern=payment")
-> Tests: 18 passed, 2 failed
   Failed: test_payment_timeout, test_refund_partial
   Coverage: statements 64%, branches 51%
```

**Krok 3 — Analiza edge cases:**
```
Read("src/payment/creditCard.js", offset=20, limit=40)
-> function chargeCard(amount, cardToken) {
     const result = await stripe.charges.create({ amount, currency: 'usd' });
     // BRAK: walidacja amount > 0
     // BRAK: obsluga amount = 0
     // BRAK: obsluga amount = Infinity
     // BRAK: obsluga blednego typu (string)
```

**Raport QA Quality:**
```
Znalezienia:
  QLT-101 | CRITICAL | Spec Compliance | Apple Pay niezaimplementowany
  QLT-102 | CRITICAL | Spec Compliance | Google Pay niezaimplementowany
  QLT-103 | HIGH     | Test Coverage   | 2 testy failuja (timeout, refund)
  QLT-104 | HIGH     | Test Coverage   | Coverage 64% (prog >80%)
  QLT-301 | HIGH     | Edge Case       | chargeCard nie waliduje kwoty
  QLT-401 | MEDIUM   | Performance     | Brak cache dla kursow walut
  QLT-501 | LOW      | Code Quality    | processPayment 72 linie (prog <50)

Rekomendacja: BLOKADA — 2 CRITICAL (brakujace metody platnosci), 3 HIGH
```

## Scenariusz 2: Audyt komponentu dashboard

**Kontekst:** Designer i Koder dostarczyli dashboard z wykresami sprzedazy,
tabela zamowien i filtrami daty. Specyfikacja wymaga responsywnosci,
lazy loading wykresow i eksportu do CSV.

**Krok 1 — Weryfikacja specyfikacji:**
```
Read("spec/dashboard.md")
-> Wymagania: 1) Wykres sprzedazy (liniowy), 2) Tabela zamowien (sortowalna),
   3) Filtry daty (last 7d, 30d, 90d, custom), 4) Responsywnosc (mobile),
   5) Lazy loading wykresow, 6) Eksport CSV

Grep("lazy|Lazy|React\.lazy|dynamic.*import", type="js")
-> [BRAK WYNIKOW]  <- Wymaganie #5 NIESPELNIONE!

Grep("csv|CSV|export.*csv|download.*csv", type="js")
-> src/dashboard/ExportButton.js:8: function exportToCSV(data) { ... }  [OK]
```

**Krok 2 — Uruchomienie testow i lintera:**
```
Bash("npm test -- --coverage --testPathPattern=dashboard")
-> Tests: 14 passed, 0 failed
   Coverage: statements 83%, branches 71%

Bash("npx eslint src/dashboard/ --format json")
-> 2 errors: unused-vars (ExportButton.js:3), no-console (Chart.js:45)
```

**Krok 3 — Analiza wydajnosci:**
```
Grep("import.*Chart|require.*Chart", type="js")
-> src/dashboard/Dashboard.js:2: import HeavyChart from 'chart-library';
   // Import synchroniczny — laduje 450KB przy kazdym renderze!
   // BRAK lazy loading = wolne ladowanie na mobile
```

**Raport QA Quality:**
```
Znalezienia:
  QLT-101 | HIGH   | Spec Compliance | Lazy loading niezaimplementowany
  QLT-201 | MEDIUM | Test Coverage   | Branches 71% (prog >75%)
  QLT-401 | HIGH   | Performance     | Sync import chart-library (450KB)
  QLT-501 | LOW    | Code Quality    | 2 ESLint errors (unused-vars, no-console)

Rekomendacja: BLOKADA — 2 HIGH (lazy loading, sync import). Naprawa przed release.
```

## Scenariusz 3: Audyt modulu autentykacji — prawie idealny

**Kontekst:** Koder dostarczyl modul logowania z JWT, refresh tokens i 2FA.
Specyfikacja w pelni zaimplementowana. Testy napisane starannie.

**Krok 1 — Testy i pokrycie:**
```
Bash("npm test -- --coverage --testPathPattern=auth")
-> Tests: 32 passed, 0 failed
   Coverage: statements 91%, branches 87%, functions 94%, lines 90%
```

**Krok 2 — Specyfikacja:**
```
Wszystkie 8 wymagan ze specyfikacji zaimplementowane i pokryte testami.
```

**Krok 3 — Code quality:**
```
Grep: najdluzsza funkcja = 38 linii (prog <50 — OK)
Nesting: max 2 poziomy (prog <3 — OK)
Duplikacja: <2% (prog <5% — OK)
```

**Raport QA Quality:**
```
Znalezienia:
  QLT-501 | LOW | Code Quality | refreshToken function — brak komentarza JSDoc
  QLT-502 | LOW | Code Quality | Zmienna 'tkn' — rekomendacja: 'refreshToken'

Rekomendacja: GO — 0 CRITICAL, 0 HIGH, 0 MEDIUM. 2 drobne uwagi LOW.
```

> **Czy wiesz, ze...?**
> Scenariusz 3 pokazuje, ze QA Quality nie szuka problemow na sile. Jesli artefakt
> jest wysokiej jakosci, raport jest krotki i pozytywny. Dlugi raport z wieloma
> znalezieniami to sygnale dla Kodera, a krotki raport to komplementy dla Kodera.
> Dobry audytor jest obiektywny — chwali dobrze wykonana prace rownie jasno,
> jak krytykuje bledy.

---

# 11. Quick Reference Card

```
+=========================================================================+
|                    QA QUALITY (Q-02) — QUICK REFERENCE                  |
+=========================================================================+
|                                                                         |
|  ROLA:       Audytor jakosci kodu i zgodnosci ze specyfikacja          |
|  WARSTWA:    QA / AUDYT (Level 4 — najwyzsza)                         |
|  MODEL:      Claude Haiku 4.5 ($0.80/$4.00 per 1M tokens)             |
|  LOAD:       55/100                                                     |
|  KOSZT:      $0.02 - $0.08 per task                                    |
|                                                                         |
+---------+---------------------------------------------------------------+
|  TOOLS  |  Read, Grep, Bash (READ-ONLY + test execution!)              |
+---------+---------------------------------------------------------------+
|PROHIBITED| Write, Edit, Agent, WebSearch, WebFetch                      |
+---------+---------------------------------------------------------------+
|                                                                         |
|  OBOWIAZKI:                                                             |
|    [1] Weryfikacja zgodnosci ze specyfikacja (Spec Compliance)         |
|    [2] Analiza pokrycia testami (Test Coverage >80%)                   |
|    [3] Testowanie edge case'ow (null, empty, boundary)                 |
|    [4] Wykrywanie code smells (<50 linii, <3 nesting, <5% dup)        |
|    [5] Analiza wydajnosci (N+1, cache, lazy loading)                   |
|    [6] Generowanie raportu JSON (severity + location + suggestion)     |
|                                                                         |
|  PRIORYTETY (kolejnosc!):                                               |
|    Correctness > Test Coverage > Performance > Code Quality/Style      |
|                                                                         |
|  SEVERITY LEVELS:                                                       |
|    CRITICAL -> BLOKADA natychmiastowa                                  |
|    HIGH     -> BLOKADA przed release                                   |
|    MEDIUM   -> OSTRZEZENIE, naprawa zalecana                           |
|    LOW      -> INFORMACJA, naprawa opcjonalna                          |
|                                                                         |
|  FINDING PREFIX: QLT-xxx                                                |
|    QLT-1xx = Spec Compliance                                           |
|    QLT-2xx = Test Coverage                                             |
|    QLT-3xx = Edge Cases                                                |
|    QLT-4xx = Performance                                               |
|    QLT-5xx = Code Quality                                              |
|                                                                         |
|  NIE ROBI:                                                              |
|    [x] Nie naprawia kodu (Read-Only + Bash for tests)                  |
|    [x] Nie sprawdza bezpieczenstwa (to QA Security Q-01)               |
|    [x] Nie decyduje GO/NO-GO (to Manager QA Q-03)                     |
|    [x] Nie komunikuje sie z QA Security Q-01                           |
|                                                                         |
|  WORKFLOW:                                                              |
|    Artefakt+Spec -> Read(spec) -> Grep(implementacja) ->               |
|    Bash(testy+coverage) -> Grep(edge cases) ->                         |
|    Grep(code smells) -> Grep(performance) -> Raport JSON -> Q-03      |
|                                                                         |
|  TOKEN BUDGET:                                                          |
|    Input: 1,000-3,000 | Output: 500-1,500 | Total: 2,000-5,000        |
|                                                                         |
|  MAX ITERACJE NAPRAWY: 2 (kontrolowane przez Q-03)                     |
|                                                                         |
+=========================================================================+
```

---

# 12. Glossary (Slowniczek)

| Termin                    | Definicja                                                                      |
|---------------------------|--------------------------------------------------------------------------------|
| **Test Coverage**         | Procent kodu pokryty testami automatycznymi — mierzony jako statements, branches, functions, lines |
| **Edge Case**             | Warunek graniczny — sytuacja na krawedzi normalnego uzycia (np. null, pusta tablica, maksymalna wartosc) |
| **Code Smell**            | Wzorzec w kodzie sugerujacy glebszy problem — np. zbyt dluga funkcja, glebokie zagniezdzenie, duplikacja |
| **N+1 Query**             | Anti-pattern wydajnosciowy — 1 zapytanie glowne + N dodatkowych w petli zamiast jednego JOIN |
| **Spec Compliance**       | Zgodnosc implementacji z oryginalna specyfikacja — kazde wymaganie musi byc spelione |
| **Happy Path**            | Glowna, oczekiwana sciezka wykonania programu — scenariusz "wszystko idzie dobrze" |
| **Error Path**            | Sciezka wykonania przy bledach — obsluga wyjatkow, timeout, odrzucenie, brak danych |
| **Boundary Value**        | Wartosc na granicy zakresu — np. 0, -1, MAX_INT, pusty string, tablica z 1 elementem |
| **Lazy Loading**          | Ladowanie zasobow dopiero gdy sa potrzebne — zamiast ladowania wszystkiego na starcie |
| **Bundle Size**           | Rozmiar pliku JavaScript po kompilacji — wplywa na czas ladowania strony |
| **Tree Shaking**          | Usuwanie nieuzywnego kodu z bundla — optymalizacja kompilacji |
| **Code Splitting**        | Dzielenie bundla na mniejsze czesci ladowane na zadanie — React.lazy(), dynamic import |
| **Groupthink**            | Zjawisko psychologiczne — tendencja grupy do konformizmu kosztem krytycznego myslenia |
| **Anchoring Bias**        | Efekt zakotwiczenia — tendencja do opierania sie na pierwszej informacji (kotwicy) |
| **Regression**            | Regresja — blad w dzialajacym kodzie spowodowany nowa zmiana |
| **Linter**                | Narzedzie do statycznej analizy kodu — wykrywa bledy stylu i potencjalne problemy (ESLint, Pylint) |
| **Severity**              | Poziom krytycznosci znalezienia: CRITICAL, HIGH, MEDIUM, LOW |
| **Early Return Pattern**  | Wzorzec zmniejszajacy zagniezdzenie — walidacja na poczatku funkcji z return zamiast glebokich if/else |
| **DRY Principle**         | Don't Repeat Yourself — zasada unikania duplikacji kodu |
| **Cyclomatic Complexity** | Miara zlozonosci kodu — liczba niezaleznych sciezek wykonania w funkcji |

---

**Zrodla:** OMEGA Multi-Agent Architecture Analysis, Gold Standard 2026 Blueprint,
IEEE Standard for Software Quality Assurance, ISO/IEC 25010 (Software Quality Model),
Agent Architecture Observatory.

---
---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz prezentacje wideo (5-7 minut) o agencie QA Quality (Q-02) w architekturze Gold Standard 2026.

**Hook otwierajacy (0:00-0:30):**
"Kod przeszedl code review. Testy napisane. Deploy gotowy. Ale nikt nie sprawdzil, czy 3 z 8 wymagan specyfikacji w ogole zostaly zaimplementowane." Ekran: animacja rakiety startowej, ktora w polowie lotu traci silnik — bo ktos zapomnial go zainstalowac. Dramatyczna pauza. Napis pojawia sie litera po literze: "Dlatego istnieje QA Quality." Tlo: ciemny gradient przechodzacy w indigo (#4F46E5).

**Sekcja 1 — Kim jest QA Quality? (0:30-1:45):**
Trzy analogie wizualne animowane sekwencyjnie:
1) Recenzent naukowy — animacja: artykul naukowy z czerwonymi adnotacjami "brak danych", "niepowtarzalny eksperyment", "wniosek niepodparty" (15 sekund).
2) Kontroler jakosci w fabryce — animacja linii produkcyjnej Toyota: samochod jedzie po tasmie, kontroler ze schowkiem sprawdza drzwi, hamulce, silnik — jeden element nie przechodzi, samochod wraca na linie (20 sekund).
3) Egzaminator na uczelni — animacja: praca dyplomowa z ocena "do poprawy", lista uwag, student poprawia, praca wraca z ocena "zaakceptowana" (15 sekund).
Na koniec sekcji: split screen — QA Security po lewej ("Jak to mozna zlamac?", czerwona tarcza) vs QA Quality po prawej ("Czy to dziala poprawnie?", niebieska lupa). Podkreslenie: oba dzialaja ROWNOLEGLE.

**Sekcja 2 — Checklist jakosci — piramida priorytetow (1:45-3:00):**
Animowana piramida budowana od dolu:
- Baza (najszersza): CORRECTNESS — specyfikacja. Animacja: lista wymagan z checkmarkami pojawiajacymi sie jeden po drugim. Niektore maja czerwony X — to znalezienia.
- Drugi poziom: TEST COVERAGE — >80%. Animacja: pasek procentowy wypelniajacy sie od 0% do 72% (czerwony), potem do 85% (zielony) po naprawie.
- Trzeci poziom: PERFORMANCE — N+1, cache, lazy loading. Animacja: dwa diagramy — wolne zapytanie (1001 strzalek do bazy) vs szybkie (2 strzalki z JOIN).
- Szczyt (najwezszy): CODE QUALITY — styl, nazewnictwo. Animacja: kod "przed" (dlugi, zagniezdzony) transformuje sie w kod "po" (krotki, czytelny).
Kazdy poziom pojawia sie z dzwiekiem "klik" i numerem priorytetu.

**Sekcja 3 — Workflow 7 krokow (3:00-4:15):**
Animowana os czasu (timeline) przesuwajaca sie od lewej do prawej. Kazdy krok to stacja na linii: ikona narzedzia (Read, Grep, Bash), nazwa kroku, krotki opis. Przy kroku 3 (Bash) specjalne podkreslenie: "QA Quality MOZE uruchamiac testy! QA Security NIE MOZE." Animacja terminala z wynikami npm test -- --coverage.

**Sekcja 4 — Q-02 vs Q-01 — porownanie (4:15-5:00):**
Animowany split screen:
Lewa strona (indygo/granatowy) — QA Quality: lupa, checklist, terminal z testami, raport QLT-xxx.
Prawa strona (karmazynowy) — QA Security: tarcza, OWASP lista, Grep wzorce, raport SEC-xxx.
Srodek: przegroda z napisem "BRAK KOMUNIKACJI — niezaleznosc!". Na dole: strzalki od obu stron prowadza do Manager QA (Q-03) — zlota ramka z napisem "SYNTEZA + DECYZJA".

**Sekcja 5 — Demo raportu (5:00-6:15):**
Animacja budowania raportu JSON w czasie rzeczywistym. Tlo: ciemny terminal. Tekst pojawia sie linia po linii jak w edytorze kodu. Kazde znalezienie ma kolorowy badge:
- QLT-101 CRITICAL (czerwony pulsujacy) — "Apple Pay niezaimplementowany"
- QLT-103 HIGH (pomaranczowy) — "2 testy failuja"
- QLT-301 HIGH (pomaranczowy) — "chargeCard nie waliduje kwoty"
- QLT-401 MEDIUM (zolty) — "Brak cache kursow walut"
- QLT-501 LOW (szary) — "processPayment 72 linie"
Na koniec: rekomendacja BLOKADA pojawia sie z animacja czerwonego stempla.

**Zamkniecie (6:15-7:00):**
"QA Quality nie pisze kodu. Nie naprawia bledow. Nie podejmuje decyzji. Ale bez niego — artefakt z 52% pokryciem testami, trzema brakujacymi wymaganiami i funkcjami na 100 linii trafia prosto do uzytkownika." Ekran: lupa z napisem Q-02 — powoli powieksza fragment kodu, ujawniajac ukryty problem. Fade do indigo. Koncowy napis: "Poprawnosc > Testy > Wydajnosc > Styl".

**Motyw wizualny:** Jasno-ciemny motyw: biale tlo sekcji edukacyjnych, ciemny terminal dla sekcji kodu i raportu. Glowny kolor akcentu: indigo (#4F46E5). Dodatkowe kolory: bialy (#FFFFFF), jasnoszary (#F3F4F6), ciemny (#1F2937). Severity badges: CRITICAL=#DC2626, HIGH=#EA580C, MEDIUM=#CA8A04, LOW=#6B7280. Typografia: monospace (JetBrains Mono) dla kodu, sans-serif (Inter) dla narracji. Animacje: plynne, profesjonalne, minimalistyczne.

**Muzyka:** Spokojna, profesjonalna, elektroniczna z delikatnym pulsem — budujaca poczucie systematycznosci i precyzji. Cichsze fragmenty w momentach kodu i raportu, mocniejsze w hookach i zamknieciu.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike (format: 1080x3000px) o agencie QA Quality (Q-02).

**Naglowek (0-250px):**
Tytul: "QA QUALITY (Q-02) — Straznik Jakosci Kodu" na bialym tle z ikona lupy nad kodem. Podtytul: "Audytor jakosci w architekturze Gold Standard 2026". Kolorystyka: biale tlo (#FFFFFF) z akcentami indigo (#4F46E5) i ciemnogranatowym tekstem (#1E1B4B). Ikona: indigo lupa z checklistem wewnatrz.

**Sekcja 1 — Karta agenta (250-500px):**
Wizytowka agenta w stylu nowoczesnej karty identyfikacyjnej na jasnym tle z indigo obramowaniem:
- Nazwa: QA Quality (Q-02)
- Warstwa: QA/AUDYT — Level 4
- Model: Claude Haiku 4.5
- Load: 55/100 (pasek procentowy w indigo)
- Koszt: $0.80/$4.00 per 1M tokens
- Koszt/zadanie: $0.02-$0.08
- Tokeny: Input 1-3K, Output 0.5-1.5K, Total 2-5K
Ikona po lewej: stylizowana lupa w indigo.

**Sekcja 2 — Piramida priorytetow (500-900px):**
Piramida z 4 poziomami (od dolu):
1. CORRECTNESS (najszersza baza, kolor #4F46E5 indigo) — "Zgodnosc ze specyfikacja — 100% wymagan"
2. TEST COVERAGE (drugi poziom, #6366F1 lighter indigo) — "Pokrycie >80%, happy + error + edge"
3. PERFORMANCE (trzeci poziom, #818CF8 light indigo) — "Brak N+1, cache, lazy loading"
4. CODE QUALITY (szczyt, #A5B4FC lightest indigo) — "Funkcje <50 linii, nesting <3, dup <5%"
Strzalka po prawej z napisem: "Sprawdzaj od dolu! Poprawnosc > Testy > Wydajnosc > Styl"

**Sekcja 3 — Checklist jakosci (900-1400px):**
Cztery kolumny (po jednej na priorytet), kazda z 4-5 elementami checklisty. Kolorowe ikony: zielony checkmark dla OK, czerwony X dla BLOKADA, zolty trojkat dla OSTRZEZENIE. Tlo: jasne pasy naprzemiennie biale i jasnoszare (#F9FAFB). Kazdy element z wartoscia progowa (np. ">80%", "<50 linii").

**Sekcja 4 — Q-02 vs Q-01 porownanie (1400-1750px):**
Porownanie side-by-side w dwoch kolumnach:
Lewa (indigo #4F46E5) = QA Quality: lupa, "Czy to dziala?", Read+Grep+Bash, QLT-xxx, Spec+Testy+Performance+Quality.
Prawa (karmazynowa #DC2626) = QA Security: tarcza, "Jak to zlamac?", Read+Grep+Glob, SEC-xxx, OWASP+Secrets+AI+CVE.
Na srodku: przekreszona strzalka z napisem "BRAK KOMUNIKACJI". Na dole: strzalki od obu kolumn prowadza do zlotej ramki "Manager QA (Q-03) — SYNTEZA + DECYZJA".

**Sekcja 5 — Narzedzia (1750-2050px):**
Trzy duze ikony dozwolonych narzedzi z zielonymi checkmarkami:
- Read (ikona oka) — "Czytanie kodu i specyfikacji"
- Grep (ikona lupy) — "Wyszukiwanie wzorcow i anti-patternow"
- Bash (ikona terminala) — "Uruchamianie testow, linterow, coverage"
Ponizej: 5 mniejszych ikon zabronionych narzedzi z czerwonymi X:
- Write, Edit, Agent, WebSearch, WebFetch
Napis: "READ-ONLY + TEST EXECUTION = niezaleznosc audytu". Specjalne podkreslenie Bash: "Q-02 MA Bash — Q-01 NIE MA!"

**Sekcja 6 — Workflow timeline (2050-2500px):**
Pionowa os czasu z 7 krokami audytu. Kazdy krok: numer w indigo kregu, nazwa kroku, ikona narzedzia, krotki opis (1 linia). Strzalki laczace kroki. Krok 3 (Bash — testy) wyrozniany wieksza czcionka i ramka. Na koncu: strzalka do "Raport JSON -> Manager QA (Q-03)".

**Sekcja 7 — Anti-patterny (2500-2750px):**
6 mini-kart w siatce 2x3. Kazda karta: ikona ostrzezenia (zolty trojkat), nazwa anti-patternu, 1-zdaniowy opis. Karty:
1. Fix-While-Auditing — "Nie naprawiaj, raportuj!"
2. Edge Case Blindness — "Sprawdzaj null, empty, boundary!"
3. Style Over Substance — "Correctness > Style!"
4. Komunikacja z Q-01 — "Niezaleznosc to fundament!"
5. Niskie coverage OK — "Coverage <70% = BLOKADA!"
6. Ignorowanie failed testow — "Najpierw napraw failujace testy!"

**Sekcja 8 — Przyklad raportu (2750-2950px):**
Miniaturowy raport JSON na ciemnym tle (#1F2937) w stylu terminala/monospace:
2-3 znalezienia z kolorowymi badge'ami severity (CRITICAL=czerwony, HIGH=pomaranczowy, MEDIUM=zolty). Rekomendacja BLOKADA w czerwonej ramce. Czytelny, ale skompresowany — pokazuje format, nie pelna tresc.

**Stopka (2950-3000px):**
"Gold Standard 2026 | QA Layer | Agent Q-02" z ikona lupy w indigo. Zrodla: OMEGA Analysis, IEEE, ISO/IEC 25010. Drobny tekst: "Poprawnosc > Testy > Wydajnosc > Styl".

**Kolorystyka calej infografiki:** Biale tlo (#FFFFFF), indigo (#4F46E5) dla akcentow i glownych elementow, ciemny tekst (#1E1B4B), jasnoszary (#F3F4F6) dla sekcji alternatywnych, karmazyn (#DC2626) tylko dla Q-01 w porownaniu i severity CRITICAL/HIGH, zielony (#10B981) dla pozytywnych elementow (checkmarki, GO), zolty (#CA8A04) dla ostrzezen. Styl: czysty, profesjonalny, nowoczesny — biale tlo dominuje, indigo jako kolor przewodni.
