# SECURITY HARDENING & CODE REVIEW — Presety Bezpieczenstwa i Jakosci

## Kompletny Przewodnik | Tier 3 PRO | Gold Standard 2026

**Seria:** Architektura Agentow AI — Presety i Konfiguracje
**Kategoria:** Bezpieczenstwo i Jakosc Kodu
**Tier:** 3 (PRO)
**Presety w dokumencie:**
- Preset `security_hardening` — 6 agentow | Fan-out → Aggregate | Trojstopniowy audyt
- Preset `code_review` — 6 agentow | Pipeline + Fan-out | AWS Pattern
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie — Dlaczego bezpieczenstwo potrzebuje dedykowanych presetow?

Wyobraz sobie wielki most. Inzynierowie go zaprojektowali. Robotnicy go wybudowali. Wyglada pieknie. Ale zanim pierwszy samochod na niego wjedzie, musi przejsc **trojstopniowa kontrole**: inspektor konstrukcji sprawdza nosnosc (QA Quality), ekspert od sejsmiki bada odpornosc na wstrzasy (QA Security), a naczelny inspektor wydaje koncowe pozwolenie (QA Manager). Jesli ktorykolwiek z nich powie "NIE" — most nie zostanie otwarty. Bez wzgledu na budzet, bez wzgledu na presje czasu.

W swiecie oprogramowania ten most to Twoj kod produkcyjny. A trojstopniowa kontrola to presety **Security Hardening** i **Code Review**.

### Dlaczego mniejsze presety nie wystarczaja?

Preset Solo (2 agenty) nie ma zadnego QA — Orkiestrator sam waliduje. Preset Quick Fix (3 agenty) ma jednego QA Quality, ale zero QA Security. Preset Recon (3 agenty) w ogole nie ma fazy audytu. Nawet presety Tier 2 z 4-5 agentami majaz maksymalnie jednego audytora.

Problem? **Bezpieczenstwo wymaga specjalizacji.**

Jeden audytor nie jest w stanie jednoczesnie:
- Skanowac pod katem OWASP Top 10 (XSS, SQLi, CSRF...)
- Weryfikowac jakosc kodu (DRY, SOLID, czytelnosc, testy)
- Mierzyc wydajnosc (latencja, memory leaks, N+1 queries)
- Syntetyzowac te trzy perspektywy w spojny werdykt

Dlatego Tier 3 PRO wprowadza **trojstopniowy audyt** — trzech wyspecjalizowanych audytorow, z ktorych kazdy patrzy na artefakt z innej perspektywy, plus Manager QA ktory syntetyzuje ich raporty w ostateczna decyzje GO/NO-GO.

> **Czy wiesz, ze...?**
> Wedlug raportu IBM "Cost of a Data Breach 2025", sredni koszt naruszenia bezpieczenstwa
> wynosi $4.88 miliona. Automatyczny audyt bezpieczenstwa w pipeline CI/CD wykrywa 70-85%
> typowych podatnosci PRZED wdrozeniem. Presety Security Hardening i Code Review sa
> odpowiednikiem tego automatycznego audytu w architekturze wieloagentowej — trojstopniowa
> linia obrony za $0.12-0.45 zamiast wielomilionowego incydentu.

> **Uwaga!**
> Te presety NIE zastepuja profesjonalnego pentestingu ani manualnego code review przez
> doswiadczonych inzynierow. Sa warstwa automatycznej weryfikacji, ktora wylapuje
> najczestsze problemy i redukuje ilosc pracy dla zespolu ludzkiego. Dla systemow
> krytycznych (finanse, medycyna, infrastruktura) zawsze wymagaj dodatkowego audytu ludzkiego.

---

## 2. Tabela porownawcza — Security Hardening vs Code Review

| Parametr | Security Hardening | Code Review |
|----------|-------------------|-------------|
| **Preset ID** | `security_hardening` | `code_review` |
| **Liczba agentow** | 6 | 6 |
| **Tier** | 3 PRO | 3 PRO |
| **Wzorzec** | Fan-out → Aggregate | Pipeline + Fan-out |
| **Glowny cel** | Audyt bezpieczenstwa pre-deployment | Code review z budowa i weryfikacja |
| **INPUT** | Gotowy kod/artefakt do audytu | Feature request + specyfikacja |
| **OUTPUT** | Raport audytu + decyzja GO/NO-GO | Zrecenzowany, zbudowany i zweryfikowany kod |
| **Agenty BUILD** | 1 (Backend) | 2 (Backend + Frontend) |
| **Agenty QA** | 3 (Security + Quality + Performance) | 2 (Security + Quality) |
| **Manager QA** | Tak — syntetyzuje 3 raporty | Nie — Orkiestrator syntetyzuje |
| **Faza budowy** | Minimalna (hardening fixes) | Pelna (feature implementation) |
| **Faza audytu** | Rozbudowana (3 rownolegle audyty) | Podwojna (2 rownolegle audyty) |
| **OWASP mapping** | Pelny OWASP Top 10 | Selektywny (top 5 dla kontekstu) |
| **Tokeny** | ~150-280K | ~180-280K |
| **Koszt ($)** | $0.12-$0.40 | $0.15-$0.45 |
| **Latencja** | ~180-360s | ~200-400s |
| **Kiedy uzywac** | Pre-release, compliance, security audit | Feature development z review, krytyczne PR |

---

## 3. SECURITY HARDENING — Pelny Deep-Dive

### 3.1 Czym jest Security Hardening?

Security Hardening to preset zaprojektowany do jednego celu: **upewnic sie, ze kod jest bezpieczny zanim trafi na produkcje**. Nie buduje nowych funkcji. Nie refaktoruje. Bierze istniejacy artefakt i przepuszcza go przez trojstopniowy audyt — bezpieczenstwo, jakosc, wydajnosc — a nastepnie syntetyzuje wyniki w ostateczna decyzje GO/NO-GO.

### Trzy analogie do zrozumienia Security Hardening

**Analogia 1: Kontrola jakosci w fabryce samochodow**

Samochod zjechal z linii produkcyjnej. Zanim trafi do salonu, przechodzi przez TRZY stacje kontrolne. Stacja 1: crash test (QA Security) — czy samochod jest bezpieczny przy zderzeniu? Stacja 2: inspekcja lakieru i wnętrza (QA Quality) — czy wszystko jest jak nalezy? Stacja 3: test na torze (QA Performance) — czy osiagi odpowiadaja specyfikacji? Kazda stacja pracuje NIEZALEZNIE i wydaje wlasny raport. Dopiero kierownik kontroli jakosci (QA Manager) czyta WSZYSTKIE trzy raporty i decyduje: "GO — do salonu" albo "NO-GO — wrocic na linie."

**Analogia 2: Trojstopniowa kontrola w elektrowni jadrowej**

Reaktor jadrowy ma trzy niezalezne systemy bezpieczenstwa. Kazdy moze SAMODZIELNIE zatrzymac reaktor. Nie dlatego, ze jeden jest niedokladny — ale dlatego, ze kazdy patrzy na inne parametry. System 1 monitoruje temperature (Security), System 2 monitoruje cisnienie (Quality), System 3 monitoruje promieniowanie (Performance). Dopiero operator (Manager QA), widząc dane ze WSZYSTKICH trzech systemow, podejmuje decyzje operacyjna.

**Analogia 3: Audyt finansowy "Big Four"**

Wielka firma przygotowuje sprawozdanie finansowe. Zanim trafi do inwestorow, audytor z "Big Four" przeprowadza trojstopniowy audyt: (1) Zgodnosc z regulacjami — compliance (QA Security), (2) Poprawnosc ksiegowan — accuracy (QA Quality), (3) Efektywnosc operacyjna — performance (QA Performance). Partner audytowy (QA Manager) podpisuje opinie: "bez zastrzezen" (GO), "z zastrzezeniami" (warunkowe GO) lub "negatywna" (NO-GO).

### 3.2 Sklad zespolu — 6 agentow

#### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50/100 |
| **Warstwa** | STRATEGIA |
| **Narzedzia** | Agent (delegacja), Read, Grep, Glob |
| **Tokeny/sesja** | ~20-35K |
| **Koszt/sesja** | ~$0.03-$0.07 |

Orkiestrator w Security Hardening pelni specyficzna role: przyjmuje artefakt do audytu, deleguje go do Backend Dev na ewentualne poprawki hardening, a nastepnie koordynuje trojstopniowy audyt. Kluczowe: NIE sam audytuje — DELEGUJE audyt do specjalistow. Po otrzymaniu syntezy od QA Manager, dostarcza koncowy wynik uzytkownikowi.

#### Agent B-01: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 70/100 |
| **Warstwa** | BUILD |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |
| **Tokeny/sesja** | ~25-50K |
| **Koszt/sesja** | ~$0.03-$0.08 |

Backend Dev w tym presecie pelni role **hardenera** — nie buduje nowych funkcji, ale wzmacnia istniejacy kod. Dodaje walidacje inputow, sanityzacje outputow, implementuje rate limiting, poprawia error handling. Otrzymuje instrukcje od Orkiestratora z konkretnymi obszarami do wzmocnienia.

#### Agent Q-01: QA Security

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 60/100 |
| **Warstwa** | QA/AUDYT |
| **Narzedzia** | Read, Grep, Bash (testy bezpieczenstwa) |
| **Tokeny/sesja** | ~20-40K |
| **Koszt/sesja** | ~$0.02-$0.04 |

QA Security to specjalista od OWASP Top 10. Skanuje kod pod katem: XSS (Cross-Site Scripting), SQL Injection, CSRF (Cross-Site Request Forgery), Broken Authentication, Security Misconfiguration, Sensitive Data Exposure, Insecure Deserialization, XXE, Broken Access Control, Insufficient Logging. Generuje raport z klasyfikacja CRITICAL/HIGH/MEDIUM/LOW.

#### Agent Q-02: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT |
| **Narzedzia** | Read, Grep, Bash (lintery, testy jednostkowe) |
| **Tokeny/sesja** | ~20-35K |
| **Koszt/sesja** | ~$0.02-$0.03 |

QA Quality sprawdza jakosc kodu: zgodnosc z konwencjami, DRY (Don't Repeat Yourself), SOLID principles, pokrycie testami, czytelnosc, dokumentacje, error handling. Generuje raport z metrykami jakosciowymi i ocena PASS/FAIL.

#### Agent Q-04: QA Performance

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT |
| **Narzedzia** | Read, Grep, Bash (benchmarki, profiling) |
| **Tokeny/sesja** | ~20-35K |
| **Koszt/sesja** | ~$0.02-$0.03 |

QA Performance analizuje wydajnosc: zlozonosc algorytmiczna (Big-O), potencjalne N+1 queries, memory leaks, nieoptymalne struktury danych, brakujace indeksy, blocking I/O, zbedne re-rendery (frontend). Generuje raport z metrykami wydajnosciowymi i ocena PASS/WARN/FAIL.

#### Agent Q-03: QA Manager

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT (nadzor) |
| **Narzedzia** | Read, Agent (odbior raportow) |
| **Tokeny/sesja** | ~25-45K |
| **Koszt/sesja** | ~$0.03-$0.07 |

QA Manager to **jedyny agent**, ktory widzi WSZYSTKIE trzy raporty audytowe jednoczesnie. Syntetyzuje dane z Q-01 (Security), Q-02 (Quality) i Q-04 (Performance) w jeden spojny werdykt. Uzywa Sonnet (nie Haiku) poniewaz wymaga rozumowania i wazenia priorytetow, nie prostego pattern matching.

### 3.3 Diagram architektury — Fan-out → Aggregate

```
+=====================================================================+
|             PRESET: SECURITY HARDENING (6 agentow)                  |
|             Tier 3 PRO | Fan-out → Aggregate                       |
+=====================================================================+
|                                                                     |
|  INPUT: Gotowy kod/artefakt do audytu bezpieczenstwa                |
|                                                                     |
|    +---------------------+                                          |
|    |    ORKIESTRATOR      |                                          |
|    |    (A-00) Opus       |                                          |
|    |    Load: 50          |                                          |
|    +----------+----------+                                          |
|               |                                                     |
|               | [one] instrukcje hardening                          |
|               v                                                     |
|    +---------------------+                                          |
|    |    BACKEND DEV       |                                          |
|    |    (B-01) Sonnet     |                                          |
|    |    Load: 70          |                                          |
|    |    HARDENER          |                                          |
|    +----------+----------+                                          |
|               |                                                     |
|               | zahartowany artefakt                                |
|               v                                                     |
|    +---------------------+                                          |
|    |    ORKIESTRATOR      |  <-- odbiera artefakt, uruchamia audyt   |
|    +----------+----------+                                          |
|               |                                                     |
|      FAN-OUT: |  trojstopniowy rownolegly audyt                     |
|       +-------+--------+-----------+                                |
|       |                |           |                                |
|       v                v           v                                |
|  +-----------+  +-----------+  +-----------+                        |
|  | QA SEC    |  | QA QUAL   |  | QA PERF   |                        |
|  | (Q-01)    |  | (Q-02)    |  | (Q-04)    |                        |
|  | Haiku     |  | Haiku     |  | Haiku     |                        |
|  | OWASP     |  | DRY/SOLID |  | Big-O     |                        |
|  | Load: 60  |  | Load: 55  |  | Load: 55  |                        |
|  +-----+-----+  +-----+-----+  +-----+-----+                       |
|        |              |              |                               |
|        | raport       | raport       | raport                       |
|        | security     | quality      | performance                  |
|        +-------+------+------+-------+                              |
|                |             |                                      |
|           AGGREGATE:  3 raporty → 1 synteza                         |
|                v                                                    |
|    +---------------------+                                          |
|    |    QA MANAGER        |                                          |
|    |    (Q-03) Sonnet     |                                          |
|    |    Load: 55          |                                          |
|    |    SYNTEZA + GO/NOGO |                                          |
|    +----------+----------+                                          |
|               |                                                     |
|               | werdykt GO / NO-GO / WARUNKOWY                      |
|               v                                                     |
|    +---------------------+                                          |
|    |    ORKIESTRATOR      |  <-- dostarcza wynik uzytkownikowi       |
|    +---------------------+                                          |
|                                                                     |
|  OUTPUT: Raport audytu (3 wymiary) + decyzja GO/NO-GO              |
|                                                                     |
+=====================================================================+
```

### 3.4 INPUT — Co wchodzi do presetu?

Security Hardening przyjmuje na wejsciu:
- **Kod zrodlowy** — pliki implementacyjne (JS/TS/Python/Go/Rust/etc.)
- **Konfiguracje** — pliki .env, docker-compose, nginx.conf, Dockerfile
- **Specyfikacje** — opis co kod powinien robic (dla weryfikacji zgodnosci)
- **Kontekst wdrozenia** — srodowisko docelowe (cloud, on-prem, edge)
- **Wymagania compliance** — SOC2, GDPR, HIPAA, PCI-DSS (opcjonalnie)

**Czego NIE przyjmuje:** feature requestow, idei, szkicow, prototypow. Security Hardening audytuje GOTOWY artefakt, nie buduje go od zera.

### 3.5 OUTPUT — Co wychodzi z presetu?

Security Hardening produkuje:
1. **Zahartowany artefakt** — kod po wzmocnieniu przez Backend Dev
2. **Raport Security** (Q-01) — lista podatnosci OWASP z klasyfikacja CRITICAL/HIGH/MEDIUM/LOW
3. **Raport Quality** (Q-02) — metryki jakosci: pokrycie testami, zlozonosc cyklomatyczna, DRY score
4. **Raport Performance** (Q-04) — metryki wydajnosci: Big-O analiza, memory profiling, latencja
5. **Synteza QA Manager** (Q-03) — polaczony werdykt ze wszystkich raportow
6. **Decyzja GO/NO-GO** — ostateczna: GO (bezpieczne do wdrozenia), NO-GO (wymaga poprawek), WARUNKOWY (GO z zastrzezeniami)

### 3.6 WHY — Dlaczego ten preset? Jaki problem rozwiazuje?

Security Hardening rozwiazuje problem, ktorego mniejsze presety nie sa w stanie adresowac:

**Problem 1: Jednowymiarowy audyt**
Preset Quick Fix ma jednego QA Quality. Sprawdzi testy, ale przeoczyCRITICAL SQLi. Preset z jednym QA Security znajdzie SQLi, ale przeoczyCRITICAL memory leak. Security Hardening patrzy z TRZECH perspektyw jednoczesnie.

**Problem 2: Brak syntezy**
Nawet jesli masz trzech audytorow, ktos musi POLACZYC ich raporty. Q-01 mowi "CRITICAL — XSS". Q-02 mowi "PASS — testy OK". Q-04 mowi "WARN — N+1 query". Kto decyduje? Czy CRITICAL security blokuje wdrozenie mimo PASS quality? QA Manager rozstrzyga te konflikty.

**Problem 3: Presja na "GO" bez danych**
Bez formalnego procesu GO/NO-GO, decyzja o wdrozeniu jest subiektywna. Security Hardening wprowadza **obiektywna brame** — dopoki QA Manager nie powie "GO", artefakt nie przechodzi dalej.

### 3.7 Workflow — Krok po kroku

**KROK 1: Odbiór artefaktu (Orkiestrator)**
```
Orkiestrator odbiera kod + kontekst od uzytkownika.
Analizuje: co to za artefakt? Jaki stack? Jakie srodowisko docelowe?
Tworzy instrukcje hardening dla Backend Dev.
```

**KROK 2: Hardening (Backend Dev)**
```
Backend Dev otrzymuje artefakt + instrukcje.
Wzmacnia kod:
  - Dodaje sanityzacje inputow (DOMPurify, parameterized queries)
  - Implementuje rate limiting (express-rate-limit, etc.)
  - Wzmacnia error handling (nie ujawniaj stacktrace'ow)
  - Dodaje security headers (CSP, X-Frame-Options, HSTS)
  - Ustawia CORS poprawnie
  - Dodaje logging bezpieczenstwa
Zwraca zahartowany artefakt Orkiestratorowi.
```

**KROK 3: Fan-out — trojstopniowy audyt (3 agenty rownolegole)**
```
Orkiestrator uruchamia JEDNOCZESNIE trzy audyty:
  Q-01 (Security): OWASP Top 10 scan
  Q-02 (Quality):  Code quality audit
  Q-04 (Performance): Performance profiling
Kazdy agent pracuje NIEZALEZNIE na tym samym artefakcie.
Kazdy generuje WLASNY raport.
```

**KROK 4: Aggregate — synteza (QA Manager)**
```
QA Manager odbiera 3 raporty.
Syntetyzuje:
  - Czy sa CRITICAL z Security? → automatyczny NO-GO
  - Czy sa HIGH z Quality? → warunkowy GO
  - Czy sa WARN z Performance? → adnotacja, nie blokuje
Wydaje werdykt: GO / NO-GO / WARUNKOWY GO
```

**KROK 5: Decyzja koncowa (Orkiestrator)**
```
GO → Orkiestrator dostarcza zahartowany artefakt + raport uzytkownikowi.
NO-GO → Orkiestrator eskaluje do Backend Dev (poprawki) → powrot do KROK 3.
WARUNKOWY → Orkiestrator dostarcza artefakt z lista zastrzezen.
```

### 3.8 Trojstopniowy audyt — szczegoly kazdego poziomu

#### Poziom 1: QA Security — OWASP Top 10 Mapping

| # | OWASP Kategoria | Co QA Security sprawdza | Klasyfikacja |
|---|----------------|------------------------|-------------|
| A01 | Broken Access Control | Brak autoryzacji endpointow, IDOR, privilege escalation | CRITICAL |
| A02 | Cryptographic Failures | Slabe algorytmy, plaintextowe hasla, brak TLS | CRITICAL |
| A03 | Injection | SQLi, XSS, command injection, LDAP injection | CRITICAL |
| A04 | Insecure Design | Brak threat modeling, logiczne luki biznesowe | HIGH |
| A05 | Security Misconfiguration | Domyslne kredencjale, otwarte porty, debug mode ON | HIGH |
| A06 | Vulnerable Components | Przestarzale zableznosci, znane CVE | HIGH |
| A07 | Auth Failures | Slabe sesje, brak 2FA, brute-force podatnosc | CRITICAL |
| A08 | Data Integrity Failures | Niezweryfikowane deserializacje, brak podpisow | HIGH |
| A09 | Logging Failures | Brak logowania zdarzen bezpieczenstwa, brak alertow | MEDIUM |
| A10 | SSRF | Server-Side Request Forgery, wewnetrzne endpointy | HIGH |

**Zasada klasyfikacji:**
- **CRITICAL** → natychmiastowy NO-GO, musi byc naprawiony
- **HIGH** → warunkowy GO, naprawa w nastepnym sprincie
- **MEDIUM** → GO z adnotacja w raporcie
- **LOW** → informacyjnie, nie blokuje

#### Poziom 2: QA Quality — Metryki jakosci kodu

| Metryka | Progi | Metoda weryfikacji |
|---------|-------|--------------------|
| Pokrycie testami | >80% = PASS, 60-80% = WARN, <60% = FAIL | Bash: coverage tool |
| Zlozonosc cyklomatyczna | <10 = PASS, 10-20 = WARN, >20 = FAIL | Grep: analiza galezi |
| DRY score | <3 duplikaty = PASS, 3-7 = WARN, >7 = FAIL | Grep: powtarzajace wzorce |
| Error handling | try/catch coverage >90% = PASS | Read: analiza kodu |
| Dokumentacja | JSDoc/docstring >50% publicznych API = PASS | Grep: komentarze |
| Zgodnosc z linterem | 0 errors = PASS, <5 warnings = PASS | Bash: eslint/pylint |

#### Poziom 3: QA Performance — Analiza wydajnosci

| Obszar | Co analizuje | Red flags |
|--------|-------------|-----------|
| Zlozonosc algorytmiczna | Big-O kazdej kluczowej funkcji | O(n^2) lub gorsza na duzych zbiorach |
| Zapytania do bazy | N+1 queries, brakujace indeksy | Petla z zapytaniem w srodku |
| Pamiec | Memory leaks, nieuzywane referencje | Event listenery bez cleanup |
| I/O | Blokujace operacje, brak cache | Synchroniczne odczyty plikow w hot path |
| Bundle size | Niepotrzebne importy, tree-shaking | Import calej biblioteki zamiast modulu |
| Rendering | Zbedne re-rendery, brak memoizacji | useEffect bez dependency array |

### 3.9 Bramy GO/NO-GO — Macierz decyzyjna QA Manager

QA Manager syntetyzuje trzy raporty wedlug nastepujacej macierzy:

```
+------------------------------------------------------------------+
|  MACIERZ DECYZYJNA QA MANAGER — Security Hardening               |
+------------------------------------------------------------------+
|                                                                  |
|  SECURITY    QUALITY    PERFORMANCE    →  DECYZJA                |
|  ─────────   ─────────  ─────────────     ────────               |
|  PASS        PASS       PASS          →  GO                     |
|  PASS        PASS       WARN          →  GO (z adnotacja)       |
|  PASS        WARN       PASS          →  WARUNKOWY GO           |
|  PASS        WARN       WARN          →  WARUNKOWY GO           |
|  PASS        FAIL       *             →  NO-GO (quality)        |
|  HIGH        *          *             →  WARUNKOWY GO           |
|  CRITICAL    *          *             →  NO-GO (security)       |
|  *           *          FAIL          →  NO-GO (performance)    |
|                                                                  |
|  Regula nadrzedna: CRITICAL z Security = ZAWSZE NO-GO            |
|  Regula eskalacji: 3x WARN = traktuj jak 1x FAIL                |
|                                                                  |
+------------------------------------------------------------------+
```

### 3.10 Scenariusz z zycia — Audyt API e-commerce przed Black Friday

**Kontekst:** Zespol zbudowal nowe API do obslugi zamowien. Black Friday za 2 tygodnie. Kod dziala na staging — ale nikt nie przeprowadzil formalnego audytu bezpieczenstwa.

**INPUT:** 12 plikow API (Node.js/Express), 3 pliki konfiguracyjne (docker-compose, nginx, .env.production), specyfikacja OpenAPI.

**KROK 1 — Orkiestrator:**
```
Analizuje: REST API, Node.js, Express, PostgreSQL, Redis cache.
Kontekst: e-commerce, dane karty platniczej, PCI-DSS relevantne.
Tworzy instrukcje hardening: "Wzmocnij sanityzacje inputow w endpointach
/orders i /payments. Dodaj rate limiting. Upewnij sie, ze .env.production
nie jest w repozytorium."
```

**KROK 2 — Backend Dev (hardening):**
```
- Dodaje express-validator do wszystkich endpointow (parametrized validation)
- Implementuje express-rate-limit: 100 req/min na IP
- Wzmacnia helmet.js: CSP, HSTS, X-Content-Type-Options
- Przenosi sekrety z .env do AWS Secrets Manager
- Dodaje structured logging (winston) z maskowaniem PII
- Czas: ~45 sekund | Tokeny: ~35K
```

**KROK 3 — Trojstopniowy audyt (rownolegle):**

*QA Security (Q-01):*
```
SKAN OWASP Top 10:
  A01: MEDIUM — /admin endpoint wymaga dodatkowej walidacji roli
  A02: PASS — TLS 1.3, bcrypt dla hasel
  A03: PASS — parametrized queries, express-validator OK
  A05: HIGH — debug mode wciaz ON w docker-compose.prod.yml
  A06: MEDIUM — lodash 4.17.19 (znany CVE-2021-23337)
  A09: PASS — structured logging OK

WERDYKT Q-01: HIGH (debug mode w produkcji)
```

*QA Quality (Q-02):*
```
METRYKI JAKOSCI:
  Pokrycie testami: 72% (WARN — ponizej 80%)
  Zlozonosc cyklomatyczna: avg 8.2 (PASS)
  DRY: 2 duplikaty (PASS)
  Error handling: 88% try/catch (PASS)
  Dokumentacja: 45% JSDoc (WARN — ponizej 50%)

WERDYKT Q-02: WARN (pokrycie testami + dokumentacja)
```

*QA Performance (Q-04):*
```
ANALIZA WYDAJNOSCI:
  GET /orders: O(n) — OK
  POST /orders: O(n log n) z sortowaniem — OK
  GET /orders/:id/history: O(n*m) — RED FLAG! N+1 query
  Memory: brak leakow w analiza statyczna
  Bundle: express + dependencies 12MB — OK
  Redis cache: TTL ustawione poprawnie

WERDYKT Q-04: WARN (N+1 query w history endpoint)
```

**KROK 4 — QA Manager (synteza):**
```
SYNTEZA 3 RAPORTOW:
  Security: HIGH (debug mode) + MEDIUM (lodash CVE, admin validation)
  Quality: WARN (testy 72%, JSDoc 45%)
  Performance: WARN (N+1 query)

DECYZJA: WARUNKOWY GO

UZASADNIENIE: Brak CRITICAL. HIGH z Security (debug mode) latwy do
naprawienia — jednolinijkowa zmiana w docker-compose. WARN z Quality
i Performance — nie blokuja wdrozenia, ale powinny byc zaadresowane
przed nastepnym release.

WARUNKI:
  1. [WYMAGANE] Wylaczyc debug mode w docker-compose.prod.yml
  2. [WYMAGANE] Zaktualizowac lodash do 4.17.21+
  3. [ZALECANE] Dodac eager loading w GET /orders/:id/history
  4. [ZALECANE] Zwiekszyc pokrycie testami do 80%+
```

**KROK 5 — Orkiestrator:**
```
Dostarcza uzytkownikowi:
  - Zahartowany artefakt (po krokach Backend Dev)
  - Pelny raport trojstopniowy
  - Decyzja: WARUNKOWY GO
  - Lista 2 wymagan (musza byc spelione) + 2 zalecen

Koszt calkowity: $0.28 | Tokeny: 210K | Czas: 240 sekund
```

### 3.11 Anty-wzorce Security Hardening

| # | Anty-wzorzec | Opis | Konsekwencja |
|---|-------------|------|-------------|
| 1 | **Security Theater** | Audyt bez uprawnien do blokowania — QA mowi "CRITICAL" ale deployment i tak idzie | Falszywe poczucie bezpieczenstwa |
| 2 | **Audit Fatigue** | Zbyt wiele MEDIUM/LOW findings — zespol ignoruje raporty | Przeoczone CRITICAL wsrod szumu |
| 3 | **Single-Point Audit** | Tylko jeden QA zamiast trzech — przeoczone wymiary | Bezpieczne ale wolne / szybkie ale dziurawe |
| 4 | **Hardening Without Audit** | Backend Dev wzmacnia kod, ale nikt tego nie weryfikuje | Hardening moze wprowadzic nowe bugi |
| 5 | **Audit Without Hardening** | Audyt znajduje problemy, ale nikt ich nie naprawia | Raporty rosna, problemy zostaja |
| 6 | **QA Manager Bypass** | Orkiestrator sam syntetyzuje raporty zamiast QA Manager | Brak specjalistycznej syntezy, przeoczone konflikty |
| 7 | **Sequential Audit** | Audyty jeden po drugim zamiast rownolegle | 3x dluzsza latencja bez korzysci jakosciowych |
| 8 | **Always-GO Bias** | QA Manager nigdy nie mowi NO-GO — presja na "dostarczanie" | Erozja zaufania do procesu audytu |

---

## 4. CODE REVIEW — Pelny Deep-Dive

### 4.1 Czym jest Code Review?

Code Review to preset laczacy **budowe nowej funkcjonalnosci** z **rownoleglym audytem jakosci i bezpieczenstwa**. W odroznieniu od Security Hardening, ktory TYLKO audytuje istniejacy kod, Code Review **BUDUJE I AUDYTUJE** w jednym przeplywie. To odpowiednik procesu Pull Request w zespole ludzkim — deweloper pisze kod, a recenzenci weryfikuja go przed mergem.

### Trzy analogie do zrozumienia Code Review

**Analogia 1: Dwoch budowlancow i dwoch inspektorow**

Firma budowlana dostaje zlecenie na rozbudowe domu. Murarz (Backend Dev) buduje sciane nosna. Elektryk (Frontend Dev) prowadzi instalacje. Po zakonczeniu prac przychodza dwaj inspektorzy: inspektor konstrukcji (QA Security) sprawdza, czy sciana nie zagraza statyce budynku, a inspektor instalacji (QA Quality) weryfikuje, czy elektryka spelnia normy. Kierownik budowy (Orkiestrator) koordynuje calosc i na podstawie raportow inspektorow decyduje: odebrac prace czy wrocic do poprawek.

**Analogia 2: Redakcja czasopisma naukowego (peer review)**

Naukowiec (Analyst) analizuje problem i pisze proposal. Na tej podstawie dwoch autorow (Backend + Frontend) pisze artykul. Nastepnie dwoch niezaleznych recenzentow (QA Security + QA Quality) recenzuje artykul: jeden pod katem metodologii (czy badanie jest poprawne?), drugi pod katem jasnosci (czy artykul jest zrozumialy?). Redaktor naczelny (Orkiestrator) zbiera recenzje i decyduje: "accept", "revise and resubmit" lub "reject".

**Analogia 3: Linia produkcyjna z kontrola inline**

Fabryka elektroniki: stanowisko 1 montuje plyte glowna (Analyst planuje), stanowisko 2 lutuje komponenty (Backend Dev), stanowisko 3 montuje obudowe (Frontend Dev). Po montazu — DWA testy: test elektryczny (QA Security) i test wizualny (QA Quality). Produkty z defektami wracaja na linie — produkty OK ida do pakowania.

### 4.2 Sklad zespolu — 6 agentow

#### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | STRATEGIA |
| **Narzedzia** | Agent (delegacja), Read, Grep, Glob |
| **Tokeny/sesja** | ~25-40K |
| **Koszt/sesja** | ~$0.04-$0.08 |

Orkiestrator w Code Review pelni role **tech leada** — odbiera feature request, deleguje analize, koordynuje budowe i audyt, syntetyzuje raporty QA (w tym presecie BEZ QA Manager — sam pelni te role). Podejmuje ostateczna decyzje PASS/REVISE/REJECT.

#### Agent AN-01: Analyst (Analityk)

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | ANALIZA |
| **Narzedzia** | Read, Grep, Glob |
| **Tokeny/sesja** | ~15-25K |
| **Koszt/sesja** | ~$0.01-$0.02 |

Analyst to **pierwszy agent w pipeline** — analizuje feature request, rozklada go na konkretne zadania budowy, identyfikuje pliki do zmiany i tworzy implementation plan. Jego output trafia do Backend Dev i Frontend Dev jako instrukcja budowy.

#### Agent B-01: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Warstwa** | BUILD |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.04-$0.08 |

Backend Dev buduje logike serwerowa: API endpointy, baza danych, business logic, middleware, testy integracyjne. Pracuje ROWNOLEGLE z Frontend Dev (Fan-out po fazie analizy).

#### Agent F-01: Frontend Dev

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Warstwa** | BUILD |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.04-$0.08 |

Frontend Dev buduje interfejs uzytkownika: komponenty React/Vue/Svelte, state management, API integration, CSS/styling, testy komponentow. Pracuje ROWNOLEGLE z Backend Dev.

#### Agent Q-01: QA Security

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 60/100 |
| **Warstwa** | QA/AUDYT |
| **Narzedzia** | Read, Grep, Bash |
| **Tokeny/sesja** | ~20-35K |
| **Koszt/sesja** | ~$0.02-$0.03 |

QA Security w Code Review skupia sie na **top 5 OWASP** najczestszych w nowym kodzie: Injection (A03), XSS (A03), Broken Access Control (A01), Security Misconfiguration (A05), Vulnerable Components (A06). Selektywny audyt — nie pelny OWASP jak w Security Hardening.

#### Agent Q-02: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT |
| **Narzedzia** | Read, Grep, Bash |
| **Tokeny/sesja** | ~20-35K |
| **Koszt/sesja** | ~$0.02-$0.03 |

QA Quality w Code Review weryfikuje: zgodnosc z implementation plan (czy zbudowano to co zaplanowano?), jakosc kodu (DRY, SOLID), pokrycie testami, czytelnosc, dokumentacje. Szczegolny nacisk na **zgodnosc z planem Analysta** — czy nie ma driftu miedzy analiza a implementacja.

### 4.3 Diagram architektury — Pipeline + Fan-out (AWS Pattern)

```
+=====================================================================+
|             PRESET: CODE REVIEW (6 agentow)                         |
|             Tier 3 PRO | Pipeline + Fan-out | AWS Pattern           |
+=====================================================================+
|                                                                     |
|  INPUT: Feature request + specyfikacja + istniejacy codebase        |
|                                                                     |
|  FAZA 1: PIPELINE (sekwencyjna)                                     |
|  ─────────────────────────────                                      |
|    +---------------------+                                          |
|    |    ORKIESTRATOR      |                                          |
|    |    (A-00) Opus       |                                          |
|    |    Load: 55          |                                          |
|    +----------+----------+                                          |
|               |                                                     |
|               | [one] feature request + kontekst                    |
|               v                                                     |
|    +---------------------+                                          |
|    |    ANALYST           |                                          |
|    |    (AN-01) Haiku     |                                          |
|    |    Load: 55          |                                          |
|    |    ANALIZA + PLAN    |                                          |
|    +----------+----------+                                          |
|               |                                                     |
|               | implementation plan                                 |
|               v                                                     |
|    +---------------------+                                          |
|    |    ORKIESTRATOR      |  <-- odbiera plan, uruchamia budowe      |
|    +----------+----------+                                          |
|               |                                                     |
|  FAZA 2: FAN-OUT — rownolegla budowa                                |
|  ─────────────────────────────────                                  |
|       +-------+-------+                                             |
|       |               |                                             |
|       v               v                                             |
|  +-----------+  +-----------+                                       |
|  | BACKEND   |  | FRONTEND  |                                       |
|  | DEV       |  | DEV       |                                       |
|  | (B-01)    |  | (F-01)    |                                       |
|  | Sonnet    |  | Sonnet    |                                       |
|  | API/DB    |  | UI/UX     |                                       |
|  | Load: 75  |  | Load: 75  |                                       |
|  +-----+-----+  +-----+-----+                                      |
|        |              |                                             |
|        | artefakt BE  | artefakt FE                                 |
|        +------+-------+                                             |
|               |                                                     |
|               v                                                     |
|    +---------------------+                                          |
|    |    ORKIESTRATOR      |  <-- zbiera artefakty, uruchamia audyt   |
|    +----------+----------+                                          |
|               |                                                     |
|  FAZA 3: FAN-OUT — rownolegly audyt                                 |
|  ─────────────────────────────────                                  |
|       +-------+-------+                                             |
|       |               |                                             |
|       v               v                                             |
|  +-----------+  +-----------+                                       |
|  | QA SEC    |  | QA QUAL   |                                       |
|  | (Q-01)    |  | (Q-02)    |                                       |
|  | Haiku     |  | Haiku     |                                       |
|  | OWASP top5|  | Plan match|                                       |
|  | Load: 60  |  | Load: 55  |                                       |
|  +-----+-----+  +-----+-----+                                      |
|        |              |                                             |
|        | raport sec   | raport qual                                 |
|        +------+-------+                                             |
|               |                                                     |
|          AGGREGATE: Orkiestrator syntetyzuje                        |
|               v                                                     |
|    +---------------------+                                          |
|    |    ORKIESTRATOR      |                                          |
|    |    PASS / REVISE /   |                                          |
|    |    REJECT            |                                          |
|    +---------------------+                                          |
|                                                                     |
|  OUTPUT: Zrecenzowany kod (BE+FE) + raporty QA + decyzja           |
|                                                                     |
+=====================================================================+
```

### 4.4 INPUT — Co wchodzi do presetu?

Code Review przyjmuje na wejsciu:
- **Feature request** — opis nowej funkcjonalnosci ("Dodaj system powiadomien email")
- **Specyfikacja** — wymagania biznesowe i techniczne
- **Istniejacy codebase** — pliki, ktore trzeba zmodyfikowac lub rozszerzyc
- **Kontekst architektoniczny** — stack technologiczny, konwencje zespolu
- **Kryteria akceptacji** — co musi byc spelnione, zeby feature byl "gotowy"

**Czego NIE przyjmuje:** gotowego kodu do audytu (to Security Hardening), bug reportow (to Quick Fix), pytan badawczych (to Recon).

### 4.5 OUTPUT — Co wychodzi z presetu?

Code Review produkuje:
1. **Implementation plan** (Analyst) — rozbicie feature'a na zadania z mapowaniem plikow
2. **Artefakt Backend** (B-01) — nowy/zmodyfikowany kod serwerowy z testami
3. **Artefakt Frontend** (F-01) — nowy/zmodyfikowany kod interfejsu z testami
4. **Raport Security** (Q-01) — audyt nowego kodu pod katem OWASP top 5
5. **Raport Quality** (Q-02) — zgodnosc z planem + metryki jakosci
6. **Decyzja Orkiestratora** — PASS (merge-ready), REVISE (poprawki w builderach), REJECT (feature wymaga re-analizy)

### 4.6 WHY — Dlaczego ten preset? Jaki problem rozwiazuje?

**Problem 1: Feature bez review = dług techniczny**
Presety budujace (Startup, Feature Sprint) nie maja fazy recenzji kodu. Buduja szybko, ale kod moze miec ukryte problemy. Code Review dodaje formalna faze weryfikacji — odpowiednik Pull Request review.

**Problem 2: Separacja analizy od budowy**
Bez Analysta, Backend Dev sam decyduje JAK zbudowac feature. To moze prowadzic do implementacji, ktora nie pokrywa wszystkich wymagan. Analyst tworzy plan — Builderzy go wykonuja — QA weryfikuje zgodnosc z planem. Pelna traceability.

**Problem 3: Rownoleglosc budowy**
W presetach z jednym builderem, Backend Dev buduje API, a potem Frontend Dev buduje UI SEKWENCYJNIE. Code Review uzywa Fan-out — oba buduja JEDNOCZESNIE na podstawie tego samego planu. Oszczednosc czasu: 30-40%.

**Problem 4: Brak audytu nowego kodu**
Nowy kod to najwieksze zrodlo podatnosci. Code Review audytuje DOKLADNIE ten kod, ktory zostal dodany — nie caly codebase, ale precyzyjnie zmiany. To odpowiednik `git diff` review.

### 4.7 Workflow — Krok po kroku

**KROK 1: Odbiór feature request (Orkiestrator)**
```
Orkiestrator odbiera feature request + specyfikacje.
Analizuje: zlozonosc, stack, wymagane zmiany BE/FE.
Deleguje do Analysta z kontekstem codebase.
```

**KROK 2: Analiza i planowanie (Analyst)**
```
Analyst analizuje:
  - Co trzeba zbudowac? (wymagania)
  - Gdzie trzeba zbudowac? (pliki do zmiany)
  - Jak rozdzielic Backend vs Frontend? (granica odpowiedzialnosci)
  - Jakie testy sa potrzebne? (kryteria akceptacji)

Generuje implementation plan:
  Backend: [lista zadan + pliki]
  Frontend: [lista zadan + pliki]
  Testy: [lista scenariuszy]
```

**KROK 3: Rownolegla budowa (Backend Dev + Frontend Dev)**
```
Orkiestrator uruchamia JEDNOCZESNIE:
  B-01: buduje API/DB/logic wedlug planu
  F-01: buduje UI/components/state wedlug planu

Oba agenty pracuja NIEZALEZNIE — kazdy ma swoja czesc planu.
Kazdy zwraca artefakt + testy.
```

**KROK 4: Rownolegly audyt (QA Security + QA Quality)**
```
Orkiestrator uruchamia JEDNOCZESNIE:
  Q-01: skanuje NOWY kod (diff) pod katem OWASP top 5
  Q-02: weryfikuje zgodnosc z planem Analysta + metryki jakosci

Oba audyty pracuja na POLACZONYM artefakcie (BE + FE).
```

**KROK 5: Synteza i decyzja (Orkiestrator)**
```
Orkiestrator czyta oba raporty QA.
Decyzja:
  PASS → kod jest merge-ready, dostarcza uzytkownikowi
  REVISE → konkretne uwagi do Backend Dev / Frontend Dev → powrot do KROK 3
  REJECT → analiza Analysta wymaga korekty → powrot do KROK 2

Max iteracji: 3 (potem eskalacja do uzytkownika)
```

### 4.8 AWS Pattern — Build + Review Separation

Code Review implementuje wzorzec znany z praktyk inzynieryjnych Amazon Web Services: **buduj i recenzuj jako osobne, rownolegle fazy**. W AWS kazdy Pull Request przechodzi przez:

1. **Automated checks** — lintery, testy, security scanners (odpowiednik naszych QA)
2. **Peer review** — inny inzynier recenzuje kod (odpowiednik QA Quality + plan matching)
3. **Approval gate** — tech lead zatwierdza merge (odpowiednik decyzji Orkiestratora)

Kluczowa zasada: **osoba ktora pisze kod NIGDY nie jest osoba ktora go zatwierdza**. W naszym presecie: Backend Dev i Frontend Dev BUDUJA, ale QA Security i QA Quality RECENZUJA. Orkiestrator DECYDUJE. Zero konfliktow interesow.

### 4.9 Feedback Loops — Petla zwrotna w Code Review

```
+-------------------------------------------------------------+
|  FEEDBACK LOOP: Code Review                                 |
+-------------------------------------------------------------+
|                                                             |
|  Analyst ---plan---> Builderzy ---artefakt---> QA           |
|                                                  |          |
|              PASS: koniec cyklu <----- PASS      |          |
|                                                  |          |
|              REVISE: --------> Builderzy <-- FAIL (uwagi)   |
|                                   |                         |
|                                   +--artefakt v2---> QA     |
|                                                  |          |
|              REJECT: --------> Analyst <---- FAIL (plan)    |
|                                   |                         |
|                                   +--plan v2---> Builderzy  |
|                                                             |
|  Max iteracji: 3 | Potem eskalacja do uzytkownika           |
+-------------------------------------------------------------+
```

Trzy poziomy feedback loop:
1. **Micro-loop (REVISE)** — QA → Builderzy → QA. Poprawki w kodzie bez zmiany planu.
2. **Macro-loop (REJECT)** — QA → Analyst → Builderzy → QA. Zmiana planu + przebudowa.
3. **Eskalacja** — Po 3 iteracjach Orkiestrator zwraca sie do uzytkownika z raportem problemow.

### 4.10 Scenariusz z zycia — Feature "System powiadomien email" dla platformy SaaS

**Kontekst:** Platforma SaaS potrzebuje systemu powiadomien email: potwierdzenia rejestracji, resetowania hasla, powiadomienia o aktywnosci. Stack: Next.js (frontend), Express (backend), PostgreSQL, SendGrid API.

**INPUT:** Feature request: "Jako uzytkownik chce otrzymywac powiadomienia email: (1) potwierdzenie rejestracji, (2) reset hasla z tokenem, (3) powiadomienia o nowych komentarzach. Wymagania: templates HTML, opt-out, rate limiting 10 emaili/h na uzytkownika."

**KROK 1 — Orkiestrator:**
```
Feature: email notifications. Stack: Next.js + Express + PostgreSQL + SendGrid.
Wymaga zmian BE (SendGrid integration, DB schema) I FE (ustawienia powiadomien).
Deleguje do Analysta.
```

**KROK 2 — Analyst:**
```
IMPLEMENTATION PLAN:

BACKEND (B-01):
  1. Model DB: tabela `email_notifications` (user_id, type, sent_at, status)
  2. Tabela `email_preferences` (user_id, type, enabled)
  3. Serwis: EmailService z metodami sendWelcome(), sendPasswordReset(), sendActivityNotification()
  4. Integration z SendGrid API (API key w env, templates)
  5. Rate limiter: max 10/h per user (Redis counter)
  6. Endpoint: POST /api/notifications/send, GET/PUT /api/notifications/preferences
  7. Testy: unit testy serwisu, integration test SendGrid mock

FRONTEND (F-01):
  1. Strona ustawien powiadomien: /settings/notifications
  2. Komponent NotificationPreferences z toggle per typ
  3. Hook useNotificationPreferences() — fetch + update
  4. Toast confirmation po zmianie ustawien
  5. Testy: komponent test, hook test
```

**KROK 3 — Rownolegla budowa:**

*Backend Dev:*
```
Buduje:
  - migrations/20260401_email_notifications.sql
  - src/services/EmailService.ts (SendGrid wrapper)
  - src/middleware/emailRateLimiter.ts (Redis)
  - src/routes/notifications.ts (REST endpoints)
  - tests/services/EmailService.test.ts
Czas: ~60 sekund | Tokeny: ~45K
```

*Frontend Dev:*
```
Buduje:
  - components/NotificationPreferences.tsx
  - hooks/useNotificationPreferences.ts
  - pages/settings/notifications.tsx
  - tests/NotificationPreferences.test.tsx
Czas: ~55 sekund | Tokeny: ~40K
```

**KROK 4 — Rownolegly audyt:**

*QA Security (Q-01):*
```
SKAN NOWEGO KODU:
  A03 (Injection): PASS — parametrized queries w migrations
  A01 (Access Control): MEDIUM — /api/notifications/preferences
       wymaga walidacji ze user modyfikuje SWOJE preferencje (nie cudze)
  A05 (Misconfiguration): PASS — SendGrid API key w env
  A06 (Components): PASS — SendGrid SDK aktualne

WERDYKT Q-01: MEDIUM (access control na preferencjach)
```

*QA Quality (Q-02):*
```
ZGODNOSC Z PLANEM:
  Backend: 7/7 zadan zrealizowanych ✓
  Frontend: 5/5 zadan zrealizowanych ✓
  Drift: BRAK — implementacja zgodna z planem

METRYKI:
  Pokrycie testami: 82% (PASS)
  DRY: 0 duplikatow (PASS)
  Error handling: 91% (PASS)
  Dokumentacja: 65% JSDoc (PASS)

WERDYKT Q-02: PASS
```

**KROK 5 — Orkiestrator (synteza):**
```
Security: MEDIUM (access control — nie blokuje)
Quality: PASS (pelna zgodnosc z planem)

DECYZJA: PASS z adnotacja

ADNOTACJA: Dodac middleware weryfikujacy ze req.user.id === params.userId
w PUT /api/notifications/preferences. Nie blokuje merge, ale powinno
byc zaadresowane przed production deploy.

Koszt calkowity: $0.32 | Tokeny: 235K | Czas: 280 sekund
```

---

## 5. Kiedy Security Hardening vs Kiedy Code Review?

### Uzywaj Security Hardening gdy:

```
✓ Masz GOTOWY kod i chcesz go ZAUDYTOWAC przed wdrozeniem
✓ Zbliża sie release/deployment (pre-release checklist)
✓ Wymagania compliance: SOC2, GDPR, HIPAA, PCI-DSS
✓ Kod dotyczy danych wrazliwych (platnosci, dane osobowe, medyczne)
✓ Chcesz pelny OWASP Top 10 audit (nie selektywny)
✓ Potrzebujesz formalnej decyzji GO/NO-GO z uzasadnieniem
✓ Audyt wydajnosci jest krytyczny (high-traffic API, Black Friday)
✓ Wymagana jest trojstopniowa weryfikacja (security + quality + performance)
```

### Uzywaj Code Review gdy:

```
✓ Budujesz NOWA FUNKCJONALNOSC i chcesz ja zrecenzowac
✓ Krytyczny Pull Request wymaga formalnego review
✓ Feature wymaga zmian ZAROWNO w backend JAK I frontend
✓ Chcesz separacje analizy od budowy (Analyst → Builders → QA)
✓ Legacy codebase wymaga ostroznych zmian z recenzja
✓ Potrzebujesz plan-matching (czy zbudowano to co zaplanowano?)
✓ Chcesz rownolegla budowe (BE + FE jednoczesnie)
✓ Nie potrzebujesz audytu wydajnosci (tylko security + quality)
```

### Tabela decyzyjna — szybki wybor

| Sytuacja | Preset | Dlaczego |
|----------|--------|----------|
| "Zaudytuj ten kod przed deployem" | Security Hardening | Audit-only, GO/NO-GO |
| "Zbuduj i zrecenzuj ten feature" | Code Review | Build + Review |
| "Sprawdz bezpieczenstwo API platnosci" | Security Hardening | Pelny OWASP, compliance |
| "Dodaj dark mode do aplikacji" | Code Review | Feature build + review |
| "Pre-release checklist przed v2.0" | Security Hardening | Trojstopniowy audyt |
| "Zrefaktoruj i zrecenzuj modul auth" | Code Review | Modyfikacja + review |
| "Audyt wydajnosci pod high traffic" | Security Hardening | Wlacza QA Performance |
| "Legacy migration z review" | Code Review | Plan → Build → Review |

---

## 6. Porownanie kosztow

### Security Hardening — rozklad kosztow

```
+----------------------------------------------------------+
|  SECURITY HARDENING — Kosztorys                          |
+----------------------------------------------------------+
|                                                          |
|  Agent          Model    Tokeny     Koszt      Udzial    |
|  ──────────     ──────   ──────     ──────     ──────    |
|  Orkiestrator   Opus     20-35K     $0.03-0.07   18%     |
|  Backend Dev    Sonnet   25-50K     $0.03-0.08   20%     |
|  QA Security    Haiku    20-40K     $0.02-0.04   10%     |
|  QA Quality     Haiku    20-35K     $0.02-0.03    8%     |
|  QA Performance Haiku    20-35K     $0.02-0.03    8%     |
|  QA Manager     Sonnet   25-45K     $0.03-0.07   18%     |
|  ──────────     ──────   ──────     ──────     ──────    |
|  RAZEM                   150-280K   $0.12-0.40  100%     |
|                                                          |
|  Orkiestrator+Manager (Opus+Sonnet): ~36% calkowitego    |
|  kosztu — decyzje strategiczne sa najdrozsze             |
|                                                          |
|  QA trojstopniowe (3x Haiku): ~26% calkowitego kosztu    |
|  — specjalizowany audyt jest tani dzieki Haiku           |
|                                                          |
+----------------------------------------------------------+
```

### Code Review — rozklad kosztow

```
+----------------------------------------------------------+
|  CODE REVIEW — Kosztorys                                 |
+----------------------------------------------------------+
|                                                          |
|  Agent          Model    Tokeny     Koszt      Udzial    |
|  ──────────     ──────   ──────     ──────     ──────    |
|  Orkiestrator   Opus     25-40K     $0.04-0.08   18%     |
|  Analyst        Haiku    15-25K     $0.01-0.02    5%     |
|  Backend Dev    Sonnet   30-50K     $0.04-0.08   18%     |
|  Frontend Dev   Sonnet   30-50K     $0.04-0.08   18%     |
|  QA Security    Haiku    20-35K     $0.02-0.03    7%     |
|  QA Quality     Haiku    20-35K     $0.02-0.03    7%     |
|  ──────────     ──────   ──────     ──────     ──────    |
|  RAZEM                   180-280K   $0.15-0.45  100%     |
|                                                          |
|  Builderzy (2x Sonnet): ~36% calkowitego kosztu          |
|  — budowa jest glownym kosztem w tym presecie            |
|                                                          |
|  Analyst (Haiku): ~5% kosztu — analiza jest tania        |
|  ale jej wartosc jest nieproporcjonalnie wysoka           |
|                                                          |
+----------------------------------------------------------+
```

### Porownanie z innymi presetami

| Preset | Agenty | Tokeny | Koszt | QA agentow | Wzorzec |
|--------|--------|--------|-------|-----------|---------|
| Solo | 2 | 40-80K | $0.04-$0.12 | 0 | Hub-Spoke |
| Quick Fix | 3 | 70-130K | $0.07-$0.18 | 1 | Fix-Test Loop |
| Recon | 3 | 80-120K | $0.08-$0.20 | 0 | Hub-Spoke mini |
| **Security Hardening** | **6** | **150-280K** | **$0.12-$0.40** | **3+1** | **Fan-out→Aggregate** |
| **Code Review** | **6** | **180-280K** | **$0.15-$0.45** | **2** | **Pipeline+Fan-out** |

> **Czy wiesz, ze...?**
> Security Hardening wydaje ~26% budzetu na audyt (3 agenty Haiku) — za mniej niz $0.10
> dostaje trojwymiarowa analize bezpieczenstwa, jakosci i wydajnosci. To odpowiednik
> trzech review'erow ludzkich za ulamek kosztu i w 1% czasu.

---

## 7. Quick Reference Cards

### Security Hardening — Karta referencyjna

```
+=====================================================+
|  SECURITY HARDENING — Quick Reference               |
+=====================================================+
|                                                     |
|  ID:        security_hardening                      |
|  Tier:      3 PRO                                   |
|  Agenty:    6 (Orkiestrator, Backend, 3xQA, Manager)|
|  Wzorzec:   Fan-out → Aggregate                     |
|  INPUT:     Gotowy kod + kontekst + compliance req  |
|  OUTPUT:    Raport audytu + GO/NO-GO                |
|                                                     |
|  Tokeny:    150-280K                                |
|  Koszt:     $0.12-$0.40                             |
|  Latencja:  180-360 sekund                          |
|                                                     |
|  Wzorzec flow:                                      |
|  Orkiestrator → Backend (hardening)                 |
|  → FAN-OUT [QA Sec | QA Qual | QA Perf]            |
|  → AGGREGATE QA Manager → GO/NO-GO                  |
|                                                     |
|  Kiedy: pre-release, compliance, security audit     |
|  Nie gdy: nowy feature, bug fix, research           |
|                                                     |
|  Kluczowa metryka: 0 CRITICAL findings = GO         |
+=====================================================+
```

### Code Review — Karta referencyjna

```
+=====================================================+
|  CODE REVIEW — Quick Reference                      |
+=====================================================+
|                                                     |
|  ID:        code_review                             |
|  Tier:      3 PRO                                   |
|  Agenty:    6 (Orkiestr, Analyst, 2xBuild, 2xQA)   |
|  Wzorzec:   Pipeline + Fan-out (AWS Pattern)        |
|  INPUT:     Feature request + spec + codebase       |
|  OUTPUT:    Zrecenzowany kod + raporty QA           |
|                                                     |
|  Tokeny:    180-280K                                |
|  Koszt:     $0.15-$0.45                             |
|  Latencja:  200-400 sekund                          |
|                                                     |
|  Wzorzec flow:                                      |
|  Orkiestrator → Analyst (plan)                      |
|  → FAN-OUT [Backend | Frontend] (build)             |
|  → FAN-OUT [QA Sec | QA Qual] (review)              |
|  → Orkiestrator PASS/REVISE/REJECT                  |
|                                                     |
|  Kiedy: feature dev, critical PR, legacy changes    |
|  Nie gdy: audit-only, bug fix, research             |
|                                                     |
|  Kluczowa metryka: plan-matching score = 100%       |
+=====================================================+
```

---

## 8. Glosariusz

| Termin | Definicja |
|--------|-----------|
| **Fan-out** | Wzorzec, w ktorym jeden agent deleguje prace do wielu agentow ROWNOCZESNIE. Uzyty w Security Hardening do uruchomienia 3 audytow naraz i w Code Review do rownoczesnej budowy BE+FE. |
| **Aggregate** | Wzorzec zbierania wynikow z wielu agentow w jeden punkt. W Security Hardening: QA Manager zbiera 3 raporty. |
| **Pipeline** | Wzorzec sekwencyjny: wyjscie agenta A staje sie wejsciem agenta B. W Code Review: Analyst → Builders. |
| **Pipeline + Fan-out** | Polaczenie: sekwencyjna analiza, potem rownoleglabuild/review. Wzorzec znany jako AWS Pattern. |
| **GO/NO-GO** | Formalna decyzja binarna (lub trojstanowa z WARUNKOWY): czy artefakt moze przejsc do nastepnej fazy. |
| **OWASP Top 10** | Lista 10 najczestszych podatnosci webowych publikowana przez Open Web Application Security Project. Referencja dla QA Security. |
| **CRITICAL/HIGH/MEDIUM/LOW** | Klasyfikacja waznosci znalezisk audytowych. CRITICAL blokuje deploy, LOW jest informacyjne. |
| **Hardening** | Proces wzmacniania bezpieczenstwa istniejacego kodu: sanityzacja, rate limiting, security headers, etc. |
| **Plan-matching** | Weryfikacja w Code Review, czy implementacja jest zgodna z planem Analysta. Unikanie driftu analiza-kod. |
| **Implementation plan** | Strukturalny dokument tworzony przez Analysta: lista zadan, pliki do zmiany, podzial BE/FE, kryteria testowe. |
| **Trojstopniowy audyt** | Unikalna cecha Security Hardening: trzy niezalezne audyty (Security + Quality + Performance) prowadzone rownolegle. |
| **Smart Model Routing** | Strategia: Opus ($15/$75) dla decyzji, Sonnet ($3/$15) dla buildu i syntezy, Haiku ($0.80/$4) dla audytu i analizy. Maksymalizuje ROI. |
| **AWS Pattern** | Wzorzec buduj-i-recenzuj z praktyk Amazon Web Services: separacja builderow od reviewerow, brak konfliktu interesow. |
| **Security Theater** | Anty-wzorzec: proces audytu ktory wyglada profesjonalnie ale nie ma mocy blokowania deploy. |
| **Audit Fatigue** | Anty-wzorzec: zbyt wiele drobnych findings prowadzi do ignorowania raportow, w tym krytycznych. |
| **Compliance** | Zgodnosc z regulacjami branżowymi: SOC2 (tech), GDPR (dane osobowe), HIPAA (medycyna), PCI-DSS (platnosci). |
| **Drift** | Rozjazd miedzy planem (Analyst) a implementacja (Builders). QA Quality w Code Review mierzy drift. |
| **Feedback loop** | Petla zwrotna: QA zgłasza problem → Builder poprawia → QA reweryfikuje. Iteracja az do PASS. |

---

## Zrodla

- **Gold Standard Agent Architecture 2026** — referencyjny template 14 agentow w 4 fazach (STRATEGIA, ANALIZA/RESEARCH, BUILD, QA/AUDYT)
- **MASTERCLASS: Zespoly Agentow AI 2026** — kompletny przewodnik z kalkulatorem kosztow i anty-wzorcami
- **Agent Teams Configurator v8/v9** — narzedzie do wizualnego projektowania architektur z 27 presetami
- **Anthropic Model Pricing 2026** — oficjalne ceny: Opus ($15/$75), Sonnet ($3/$15), Haiku ($0.80/$4) za 1M tokenow
- **OWASP Top 10:2021** — klasyfikacja 10 najczestszych podatnosci webowych (aktualna edycja)
- **IBM Cost of a Data Breach Report 2025** — sredni koszt naruszenia bezpieczenstwa: $4.88M
- **AWS Well-Architected Framework: Security Pillar** — best practices bezpieczenstwa w chmurze
- **Google: Scaling Multi-Agent Research (2026)** — 90.2% improvement z wieloagentowym podejsciem, +80.9% w zadaniach rownolegolych
- **Anthropic: Multi-Agent Orchestration Patterns (2026)** — dokumentacja wzorcow Fan-out, Pipeline, Aggregate
- **NIST Cybersecurity Framework 2.0** — ramowy standard bezpieczenstwa cyfrowego

---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz 7-9 minutowa prezentacje wideo o presetach **Security Hardening** i **Code Review** z systemu architektur wieloagentowych AI. Prezentacja powinna byc edukacyjna, wizualnie intensywna, z motywem bezpieczenstwa (tarcza, zamek, firewall) i dominujacym kolorem czerwonym (#EF4444). Prowadzi widza od zera do pelnego zrozumienia obu presetow, ich roznic i zastosowan.

### Struktura prezentacji:

**[0:00-0:30] HOOK — Statystyka szokowa**
Ekran: Duza liczba "$4.88M" animowana w stylu glitch z czerwonym podswietleniem. Tekst pojawia sie litera po literze: "Sredni koszt naruszenia bezpieczenstwa w 2025 roku." Nastepnie liczba zmienia sie plynna animacja na "$0.12-$0.45" z zielonym kolorem — "Koszt trojstopniowego audytu w architekturze wieloagentowej." Wizualizacja: po lewej plonacy serwer (czerwony, dym, alarmy), po prawej spokojna serwerownia z zielonymi diodami i ikonami tarcz. Pytanie retoryczne pojawia sie na dole: "Czy Twoj kod przechodzi przez trojstopniowa kontrole zanim trafi na produkcje?"

**[0:30-1:15] PROBLEM — Dlaczego mniejsze presety nie wystarczaja**
Animowana piramida presetow: Solo (2 agenty, brak QA), Quick Fix (3 agenty, 1 QA), Recon (3 agenty, 0 QA). Kazdy preset ma ikone tarczy — Solo ma tarcze z duzym "X" (czerwonym), Quick Fix ma tarcze w 1/3 wypelniona (zolta), Recon ma tarcze z pytajnikiem. Nastepnie pojawiaja sie Security Hardening i Code Review — pelne tarcze z checkmarkiem (zielone). Narration: "Mniejsze presety NIE maja wystarczajacej warstwy bezpieczenstwa. Oto dlaczego potrzebujesz dedykowanych presetow Tier 3 PRO."

**[1:15-2:30] SECURITY HARDENING — Architektura Fan-out → Aggregate**
Czarne tlo. Centralny Orkiestrator pojawia sie jako czerwony wezel z ikona tarczy. Strzalka w dol do Backend Dev (zielony wezel z ikona mlotka) — animacja "hardening": ikony zamkow pojawiaja sie wokol wezla. Nastepnie KLUCZOWA animacja: z Orkiestratora wychodza TRZY strzalki jednoczesnie (fan-out) do trzech wezlow QA: QA Security (czerwony, ikona lupy+zamka), QA Quality (niebieski, ikona checklisty), QA Performance (pomaranczowy, ikona stopera). Kazdy wezel pulsujeAnimacja "skanowania" — linie kodu przesuwaja sie przez kazdy wezel. Po zakonczeniu, trzy strzalki schodza sie (aggregate) do QA Manager (zloty wezel, ikona sedzia). QA Manager emituje animacje "GO" (zielony blast) lub "NO-GO" (czerwony blast z ikona stop).

**[2:30-3:15] TROJSTOPNIOWY AUDYT — Deep dive**
Ekran podzielony na trzy kolumny, kazda z innym kolorem:
- KOLUMNA 1 (czerwona): QA Security — OWASP Top 10 jako animowana lista, kazda kategoria pojawia sie z ikona (zamek, strzykawka, tarcza). Tekst: "XSS? SQLi? CSRF? Skanujemy WSZYSTKO."
- KOLUMNA 2 (niebieska): QA Quality — metryki jako animowane gauge'e: pokrycie testami (82%), zlozonosc (8.2), DRY (0 duplikatow). Tekst: "Czy kod spenia standardy?"
- KOLUMNA 3 (pomaranczowa): QA Performance — animowany wykres Big-O: linie O(1), O(n), O(n^2) z podswietleniem problematycznej funkcji. Tekst: "N+1 query? Memory leak? Znajdziemy."
Wszystkie trzy kolumny "zapalaja sie" jednoczesnie podkreslajac ROWNOLEGLOSC audytow.

**[3:15-4:00] MACIERZ GO/NO-GO**
Animowana macierz decyzyjna na ciemnym tle. Wiersze pojawiaja sie jeden po drugim: PASS+PASS+PASS → zielone "GO" z animacja confetti. CRITICAL+dowolne+dowolne → czerwone "NO-GO" z animacja alarm. Wizualizacja: semafor — zielony, zolty (WARUNKOWY), czerwony (NO-GO). Tekst: "JEDNA zasada nadrzedna: CRITICAL z Security = ZAWSZE NO-GO. Bez wyjatkow."

**[4:00-5:00] CODE REVIEW — Architektura Pipeline + Fan-out**
Nowy schemat na czarnym tle. Orkiestrator (czerwony wezel) → strzalka pipeline → Analyst (fioletowy wezel, ikona dokumentu). Analyst generuje "Implementation Plan" — animowany dokument z lista zadan. Nastepnie Fan-out: z planu wychodza DWE strzalki jednoczesnie do Backend Dev (zielony) i Frontend Dev (niebieski). Oba buduja ROWNOLEGLE — animacja "kodowania" (linie kodu pojawiaja sie w obu wezlach jednoczesnie). Po budowie, kolejny Fan-out: DWE strzalki do QA Security i QA Quality. Recenzja. Strzalki wracaja do Orkiestratora. Decyzja: PASS / REVISE (petla wstecz do builderow) / REJECT (petla wstecz do Analysta).

**[5:00-5:45] POROWNANIE — Security Hardening vs Code Review**
Ekran podzielony na pol. Lewa strona: Security Hardening z ikona tarczy i strzalkami Fan-out→Aggregate. Prawa strona: Code Review z ikona lupy-na-kodzie i strzalkami Pipeline+Fan-out. Animowana tabela porownawcza pojawia sie miedzy nimi: INPUT, OUTPUT, kiedy uzywac. Podswietlanie roznic: SH ma QA Performance i QA Manager, CR ma Analyst i Frontend Dev. Tekst: "Audyt GOTOWEGO kodu? Security Hardening. Budowa NOWEGO feature'a z review? Code Review."

**[5:45-6:45] LIVE SCENARIO — Audyt API e-commerce**
Krok po kroku z animacja: (1) Kod API wchodzi do systemu — animacja "upload". (2) Backend Dev wzmacnia — animacja zamkow pojawiajacych sie na endpointach. (3) Trojstopniowy audyt — trzy rownolegle paski postepu. (4) QA Security: "HIGH — debug mode ON" (czerwona flaga). (5) QA Quality: "WARN — testy 72%" (zolta flaga). (6) QA Performance: "WARN — N+1 query" (zolta flaga). (7) QA Manager: animacja "wazenia" trzech raportow na szali. (8) Werdykt: "WARUNKOWY GO" z lista warunkow. (9) Koszt: "$0.28 | 210K tokenow | 240 sekund" — animowany counter.

**[6:45-7:30] ANTI-PATTERNY — "Galeria hanby"**
Ciemne tlo, 8 "poster wanted" w siatce 2x4, kazdy z ikona czaszki:
1. Security Theater — "Audyt bez mocy blokowania"
2. Audit Fatigue — "Za duzo LOW findings"
3. Single-Point Audit — "Jeden QA na 3 wymiary"
4. Hardening Without Audit — "Wzmocniles ale kto sprawdzil?"
5. Always-GO Bias — "QA Manager ktory nigdy nie mowi NIE"
6. Feature without Review — "Nowy kod bez recenzji"
7. Plan Drift — "Zbudowano cos innego niz zaplanowano"
8. Sequential Audit — "Audyty po kolei zamiast rownolegle"
Kazdy poster ma 2-sekundowa animacje "ujawnienia" z efektem "Wanted" w stylu western.

**[7:30-8:15] KOSZTY i ROI**
Animowany wykres slupkowy: Security Hardening $0.12-$0.40 (czerwony), Code Review $0.15-$0.45 (niebieski), dla porownania: Solo $0.04-$0.12 (szary), Quick Fix $0.07-$0.18 (szary). Nastepnie donut chart rozkladu kosztow: Orkiestrator 18%, Builderzy 20-36%, QA 26-14%, Manager 18-0%. Strzalka ROI: "$0.28 za audyt vs $4.88M za breach = ROI: 17,000,000%".

**[8:15-9:00] ZAMKNIECIE — Call to Action**
Ekran: wielka ikona tarczy z checkmarkiem, pulsujaca w rytmie. Tekst pojawia sie zdanie po zdaniu:
"Trojstopniowy audyt. Trojwymiarowa ochrona."
"Security. Quality. Performance."
"Kazdy wymiar ma dedykowanego specjaliste."
"Kazdy specjalista pracuje NIEZALEZNIE."
"Kazdy raport trafia do JEDNEGO decydenta."
"GO lub NO-GO. Bez zgadywania."
Finalny ekran: "Security Hardening: AUDYTUJ gotowy kod. Code Review: BUDUJ I RECENZUJ nowy feature." Oba presety jako ikony: tarcza (SH) i lupa-na-kodzie (CR). Call to action: "Nastepnym razem gdy Twoj kod idzie na produkcje — przepusc go przez trojstopniowa kontrole."

### Styl wizualny:
- **Paleta glowna:** Czerwony (#EF4444) jako kolor dominujacy na ciemnym tle (#111827 do #1F2937)
- **Akcenty:** Zielony (#10B981) dla GO/PASS, Zolty (#F59E0B) dla WARN/WARUNKOWY, Niebieski (#3B82F6) dla QA Quality
- **Motyw graficzny:** Tarcza (shield) jako leitmotiv — pojawia sie w kazdej sekcji. Zamki, firewalle, skanery, sygnalizatory swietlne. Ikony OWASP
- **Tekst:** Bialy (#FFFFFF) na ciemnym tle, czerwony bold (#EF4444) dla kluczowych slow, zielony dla GO, czerwony dla NO-GO
- **Animacje:** Plynne budowanie diagramow wezel-po-wezle, pulsujace wezly QA podczas "skanowania", fan-out jako rozchodzace sie strzalki, aggregate jako schodziace sie strzalki, confetti na GO, alarm na NO-GO, glitch effect na hookach, gauge animations na metrykach
- **Typografia:** Nowoczesny sans-serif (Inter lub JetBrains Mono dla kodu), duze naglowki 48px, body 24px, monospacedkod 18px
- **Muzyka:** Napieciowa, budujaca poczucie "ochrony" — low synth bass + subtle alarm tones w tle. Narastajaca podczas audytow. Rozwiazujaca sie na GO (majestatyczny akord). Alarmowa na NO-GO (szybkie staccato). Triumfalna na zakonczenie.
- **Tempo:** Dynamiczne, kazdy slajd 5-12 sekund. Dluzsze pauzy (3-5s) na macierz GO/NO-GO i scenariusz. Szybkie ciecia w galerii anty-patternow.
- **Efekty specjalne:** Particle effects na polaczeniach miedzy agentami (czerwone iskry), scan-line effect na wezlach QA, shield glow na GO, crack effect na NO-GO, matrix-style falling code w tle sekcji OWASP

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike (1080x3500px) o presetach **Security Hardening** i **Code Review** z systemu architektur wieloagentowych AI. Infografika powinna byc czytelna, profesjonalna, z motywem bezpieczenstwa (tarcza, zamek, firewall) i dominujacym kolorem czerwonym (#EF4444) na ciemnym tle.

### Struktura infografiki (od gory do dolu):

**[NAGLOWEK — 1080x280px]**
Tytul: "SECURITY HARDENING & CODE REVIEW" w duzym, boldnym foncie bialym na ciemnym tle (#111827). Podtytul: "Presety Bezpieczenstwa i Jakosci | Tier 3 PRO | 6 Agentow | Gold Standard 2026". Ikona duzej tarczy z checkmarkiem po lewej stronie, w kolorze czerwonym (#EF4444) z subtelnym glow. Po prawej: dwie mniejsze ikony — tarcza (SH) i lupa na kodzie (CR). Tlo: gradient od #111827 do #1F2937 z subtelnymi liniami siatki (grid) w stylu cybersecurity. Dekoracja: cienkie czerwone linie tworzace wzor obwodu elektronicznego wzdluz krawedzi.

**[SEKCJA 1: POROWNANIE PRESETOW — 1080x350px]**
Dwie karty obok siebie, kazda z glassmorphism border:
- LEWA KARTA (czerwony border #EF4444): "SECURITY HARDENING" — ikona tarczy, "Fan-out → Aggregate", "Audyt gotowego kodu", "3 QA + Manager", "GO/NO-GO". Trzy male ikony agentow QA u dolu karty.
- PRAWA KARTA (niebieski border #3B82F6): "CODE REVIEW" — ikona lupy-na-kodzie, "Pipeline + Fan-out", "Budowa + Recenzja", "Analyst + 2 Builders + 2 QA", "PASS/REVISE/REJECT". Ikony Analysta i 2 Builderow u dolu.
Miedzy kartami: ikona "vs" w kolku z gradientem. Pod kartami: miniaturowa tabela 3 kolumny (Parametr, SH, CR) z 5 kluczowymi rozniciami.

**[SEKCJA 2: SECURITY HARDENING FLOW — 1080x450px]**
Pionowy diagram flow na ciemnym tle z czerwonymi akcentami:
1. INPUT (gora): ikona kodu + "Gotowy artefakt" w bialej ramce
2. Strzalka w dol → ORKIESTRATOR (wezel czerwony, Opus, ikona tarczy)
3. Strzalka w dol → BACKEND DEV (wezel zielony, Sonnet, ikona zamka, etykieta "HARDENING")
4. Strzalka w dol → trzy rownolegle wezly (FAN-OUT): QA Sec (czerwony), QA Qual (niebieski), QA Perf (pomaranczowy). Kazdy z ikona i nazwa modelu Haiku. Etykieta "TROJSTOPNIOWY AUDYT" w czerwonej ramce.
5. Trzy strzalki schodza sie (AGGREGATE) → QA MANAGER (zloty wezel, Sonnet, ikona sedzia)
6. OUTPUT (dol): "GO / NO-GO / WARUNKOWY" w trzech kolorach (zielony/czerwony/zolty)
Obok diagramu: mala adnotacja "Czas: 180-360s | Koszt: $0.12-$0.40"

**[SEKCJA 3: CODE REVIEW FLOW — 1080x450px]**
Pionowy diagram flow na ciemnym tle z niebieskimi akcentami:
1. INPUT (gora): ikona feature request + "Nowa funkcjonalnosc" w bialej ramce
2. Strzalka w dol → ORKIESTRATOR (wezel czerwony, Opus)
3. Strzalka w dol (PIPELINE) → ANALYST (wezel fioletowy, Haiku, ikona dokumentu, etykieta "PLAN")
4. Strzalka w dol → dwa rownolegle wezly (FAN-OUT BUILD): Backend Dev (zielony, Sonnet) + Frontend Dev (niebieski, Sonnet). Etykieta "ROWNOLEGLA BUDOWA"
5. Strzalka w dol → dwa rownolegle wezly (FAN-OUT REVIEW): QA Sec (czerwony, Haiku) + QA Qual (niebieski, Haiku). Etykieta "ROWNOLEGLY AUDYT"
6. Strzalka w dol → ORKIESTRATOR (synteza)
7. OUTPUT (dol): "PASS / REVISE / REJECT" z petlami zwrotnymi narysowanymi jako zakrzywione strzalki
Obok diagramu: mala adnotacja "Czas: 200-400s | Koszt: $0.15-$0.45"

**[SEKCJA 4: OWASP TOP 10 MAPPING — 1080x350px]**
Siatka 2x5 z 10 kartami OWASP, kazda z ikona, numerem (A01-A10), nazwa i klasyfikacja (CRITICAL/HIGH/MEDIUM) w odpowiednim kolorze:
- A01 Broken Access Control — CRITICAL (czerwony)
- A02 Cryptographic Failures — CRITICAL (czerwony)
- A03 Injection — CRITICAL (czerwony)
- A04 Insecure Design — HIGH (pomaranczowy)
- A05 Security Misconfiguration — HIGH (pomaranczowy)
- A06 Vulnerable Components — HIGH (pomaranczowy)
- A07 Auth Failures — CRITICAL (czerwony)
- A08 Data Integrity — HIGH (pomaranczowy)
- A09 Logging Failures — MEDIUM (zolty)
- A10 SSRF — HIGH (pomaranczowy)
Naglowek: "OWASP Top 10 — Co skanuje QA Security?" Podpis: "Security Hardening = pelny OWASP | Code Review = top 5 selektywnie"

**[SEKCJA 5: MACIERZ GO/NO-GO — 1080x300px]**
Tabela-macierz z kolorowym kodowaniem:
- Wiersze: kombinacje Security/Quality/Performance
- Kolumna wynikowa: GO (zielone tlo), WARUNKOWY (zolte tlo), NO-GO (czerwone tlo)
- Wyroznienie: "CRITICAL z Security = ZAWSZE NO-GO" w czerwonej ramce z ikona wykrzyknika
- Semafor wizualny po prawej: trzy kola (zielone/zolte/czerwone) z etykietami

**[SEKCJA 6: SCENARIUSZ E-COMMERCE — 1080x350px]**
Mini-komiks 5 paneli w stylu tech-noir:
Panel 1: Kod API wchodzi (ikona upload) — "12 plikow Node.js"
Panel 2: Backend Dev wzmacnia (ikony zamkow) — "rate-limit, helmet, sanityzacja"
Panel 3: Trojstopniowy audyt (3 ikony rownolegle) — "HIGH: debug mode | WARN: testy 72% | WARN: N+1"
Panel 4: QA Manager wazy (ikona wagi) — "Synteza 3 raportow"
Panel 5: Werdykt — "WARUNKOWY GO | $0.28 | 240s"

**[SEKCJA 7: KIEDY KTORY PRESET — 1080x300px]**
Dwie kolumny z ikonami checkmark/X:
- LEWA: "Uzywaj Security Hardening gdy:" — pre-release, compliance, dane wrazliwe, pelny OWASP, audyt wydajnosci
- PRAWA: "Uzywaj Code Review gdy:" — nowy feature, critical PR, BE+FE, legacy changes, plan-matching
Dolna czesc: "NIE uzywaj do:" — bug fix (Quick Fix), research (Recon), prosty task (Solo)

**[SEKCJA 8: KOSZTY — 1080x300px]**
Dwa donut charty obok siebie:
- LEWY (Security Hardening): Orkiestrator 18% (czerwony), Backend 20% (zielony), QA trio 26% (3 odcienie niebieskiego), Manager 18% (zloty). Srodek: "$0.12-$0.40"
- PRAWY (Code Review): Orkiestrator 18% (czerwony), Analyst 5% (fioletowy), Builderzy 36% (zielony+niebieski), QA duo 14% (2 odcienie). Srodek: "$0.15-$0.45"
Pod donut chartami: poziomy bar chart porownujacy 5 presetow: Solo, Quick Fix, Recon, SH, CR — z kolorowym kodowaniem i etykietami kosztow.

**[SEKCJA 9: ANTI-PATTERNY — 1080x250px]**
Siatka 2x4 z 8 "danger cards": kazda z ikona czaszki, nazwa anty-wzorca i jednozdaniowym opisem:
❌ Security Theater | ❌ Audit Fatigue | ❌ Single-Point Audit | ❌ Hardening Without Audit | ❌ Always-GO Bias | ❌ Feature without Review | ❌ Plan Drift | ❌ Sequential Audit
Kazda karta z czerwonym border i ciemnym tlem. Font maly ale czytelny.

**[SEKCJA 10: QUICK REFERENCE — 1080x200px]**
Dwie kompaktowe karty referencyjne obok siebie z kluczowymi parametrami:
- SH: 6 agentow | Fan-out→Aggregate | 150-280K | $0.12-$0.40 | GO/NO-GO
- CR: 6 agentow | Pipeline+Fan-out | 180-280K | $0.15-$0.45 | PASS/REVISE/REJECT

**[STOPKA — 1080x120px]**
"Agent Architecture Designer 2026 | Gold Standard Architecture | Security & Quality Presets"
Ikony: tarcza + lupa + zamek. Subtelny czerwony gradient na dole.

### Styl wizualny:
- **Paleta:** Czerwony (#EF4444) dominujacy, ciemne tlo (#111827 do #1F2937), bialy tekst (#FFFFFF), zielony (#10B981) dla GO/PASS, zolty (#F59E0B) dla WARN, niebieski (#3B82F6) dla QA Quality i Code Review, pomaranczowy (#F97316) dla QA Performance, fioletowy (#8B5CF6) dla Analysta, zloty (#EAB308) dla QA Manager
- **Typografia:** Sans-serif nowoczesny (Inter), H1 36px bold, H2 24px semibold, body 14px regular, monospace (JetBrains Mono) 12px dla kodu i metryk
- **Ikony:** Outline style z wypelnieniem kolorystycznym — tarcza, zamek, lupa, semafor, waga, czaszka, checkmark, X. Kazdy agent ma unikalna ikone
- **Styl:** Dark mode, flat design z subtelnymi gradientami, zaokraglone rogi (8-12px), glassmorphism na kartach porownawczych, cienkie czerwone linie obwodow jako dekoracja
- **Motyw:** Cybersecurity — tarcze, zamki, firewalle, skanery, obwody elektroniczne, grid w tle, czerwone akcenty na ciemnym tle. Narracja wizualna "ochrony i weryfikacji"
- **Separatory:** Cienkie linie w kolorze #374151 (szary) z czerwonym akcentem na srodku (maly romb lub ikona tarczy)
- **Kontrast:** Wszystkie teksty maja ratio >4.5:1 na ciemnym tle. CRITICAL/NO-GO w czerwonym, GO w zielonym, metryki w bialym

---

*Dokument opracowany na podstawie Gold Standard Agent Architecture 2026, MASTERCLASS Agent Teams, AGENT_TEAMS_CONFIGURATOR v8/v9, OWASP Top 10:2021 oraz IBM Cost of a Data Breach Report 2025. Dane kosztowe aktualne na kwiecien 2026.*
