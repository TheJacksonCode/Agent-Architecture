# RECON SQUAD -- Preset Rozpoznawczy w Architekturze Wieloagentowej

## Kompletny Przewodnik po Presecie #03 | Seria: Presety Agentowe 2026

**Seria:** Architektura Agentow AI -- Presety i Konfiguracje
**Preset ID:** `recon`
**Nazwa:** Recon Squad (Zespol Rozpoznawczy)
**Ikona:** 🔍
**Tier:** 1 (MINIMAL)
**Liczba agentow:** 3
**Wzorzec:** Hub-and-Spoke (mini)
**Koszt tokenowy:** ~80-120K
**Koszt dolarowy:** $0.08-$0.20
**Latencja:** ~90-180 sekund
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Czym jest preset Recon Squad?

Wyobraz sobie trzy sytuacje z zycia codziennego. Kazda z nich opowiada ta sama historie -- historie o tym, dlaczego NAJPIERW trzeba zbadac teren, a DOPIERO POTEM dzialac.

### Analogia 1: Zwiad wojskowy przed misja

Przed kazda operacja wojskowa dowodca wysyla zwiadowcow. Ich zadanie jest proste: sprawdzic teren, zidentyfikowac zagrozenia, znalezc najlepsza droge. Dopiero na podstawie raportu zwiadowczego glowne sily ruszaja do akcji. Zwiadowca (Researcher Tech) mapuje teren technologiczny. Saper (Backend Dev) buduje przyczolkowe rozwiazanie. Dowodca (Orkiestrator) koordynuje obie grupy i podejmuje decyzje strategiczne.

Zadna armia nie atakuje na slepo. I zaden zespol programistyczny nie powinien kodowac na slepo.

### Analogia 2: Geodeta i architekt przed budowa

Zanim postawisz dom, musisz zbadac dzialke. Geodeta (Researcher Tech) sprawdza grunt: nosnosc, poziom wod gruntowych, dostep do mediow, granice dzialki. Na podstawie jego raportu architekt (Backend Dev) projektuje fundamenty dostosowane do RZECZYWISTYCH warunkow, a nie do zalozen. Kierownik budowy (Orkiestrator) pilnuje, zeby raport geodety trafil do architekta zanim ten narysuje pierwsza kreske.

Budowa bez badania gruntu to fundamenty, ktore pekaja. Kod bez researchu to refaktoring, ktory kosztuje.

### Analogia 3: Lekarz -- diagnoza przed leczeniem

Dobry lekarz nigdy nie przepisuje lekow na podstawie zgadywania. Najpierw zleca badania: krew, USG, RTG, rezonans (Research). Dopiero na podstawie wynikow wybiera leczenie (Build). Koordynator opieki (Orkiestrator) upewnia sie, ze diagnoza prowadzi do terapii, a nie ze badania ida w jednym kierunku, a leczenie w drugim.

Recon Squad to dokladnie ten model: DIAGNOZA zanim LECZENIE. ZWIAD zanim ATAK. BADANIE zanim BUDOWA.

> **Czy wiesz, ze...?**
> Badania nad projektami software'owymi pokazuja, ze zespoly stosujace faze badawcza przed implementacja notuja **40-60% mniej refaktoringu**. Koszt godziny researchu zwraca sie 10-krotnie w oszczedzonych godzinach poprawek. Preset Recon Squad formalizuje te filozofie -- zamiast liczyc na szczescie, inwestujesz w odkrywanie.

> **Uwaga!**
> Recon Squad sluzy do **EKSPLORACJI**, nie do produkcji. Wynikiem pracy tego presetu jest POC (Proof of Concept) lub spike techniczny -- NIE gotowa funkcjonalnosc do wdrozenia. Jesli potrzebujesz pelnego feature'a, uzyj presetu startup lub feature_sprint z wieksza ekipa.

---

## 2. Sklad zespolu -- Trojkat rozpoznawczy

Recon Squad to **trzech agentow** w minimalnej konfiguracji Hub-and-Spoke. Kazdy ma scisle okreslona role, model i zestaw narzedzi.

### Agent 1: Orkiestrator (A-00)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | STRATEGIA -- koordynacja, ewaluacja, decyzje |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50% |
| **Narzedzia** | Agent, TaskCreate, TaskUpdate, Read |
| **Zakaz** | Write, Edit, Bash, WebSearch |
| **Tokeny/sesja** | ~20-30K |
| **Koszt/sesja** | ~$0.02-$0.06 |

Orkiestrator w Recon Squad pelni trzy kluczowe funkcje:
1. **Definiuje pytania badawcze** -- rozbija niejasnosc technologiczna na konkretne, ograniczone, mierzalne pytania
2. **Koordynuje fazy** -- najpierw research, potem build (nigdy rownolegle w tym presecie)
3. **Ewaluuje wyniki** -- ocenia research pod katem kompletnosci, nastepnie POC pod katem wykonalnosci. Podejmuje decyzje GO/NO-GO.

### Agent 2: Researcher Tech (R-01)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- badanie opcji technicznych |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55% |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~20-30K |
| **Koszt/sesja** | ~$0.02-$0.04 |

Researcher Tech w Recon Squad odpowiada za:
1. **Wyszukiwanie opcji** -- frameworki, biblioteki, API, architektury
2. **Porownywanie minimum 3 opcji** -- kazda z pros/cons, benchmarkami, kosztami
3. **Produkcje strukturalnego raportu** -- TOP 5 opcji z uzasadnieniem, confidence score, zrodlami
4. **Identyfikacje ryzyk** -- lock-in, maintenance, security, scalability

### Agent 3: Backend Dev (B-01)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | BUILD -- tworzenie Proof of Concept |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75% |
| **Narzedzia** | Read, Write, Edit, Bash, Grep, Glob |
| **Zakaz** | Agent, WebSearch |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.04-$0.10 |

Backend Dev w Recon Squad odpowiada za:
1. **Tworzenie POC** -- minimalny dzialajacy przyklad demonstrujacy podejscie wybrane na bazie researchu
2. **Implementacja spike'a** -- 1-3 pliki testujace jedna hipoteze technologiczna
3. **Walidacja wykonalnosci** -- "Czy to naprawde dziala, czy tylko wyglada dobrze w dokumentacji?"
4. **Raport z budowy** -- co zadzialalo, co nie, jakie problemy napotkano

### Diagram architektury

```
         ┌─────────────────┐
         │  ORKIESTRATOR    │
         │  (A-00, Opus)   │
         │  STRATEGIA       │
         └────┬────────┬────┘
              │        │
    pytania   │        │  instrukcje
    badawcze  │        │  budowy
              ↓        ↓
   ┌──────────────┐  ┌──────────────┐
   │ RESEARCHER   │  │ BACKEND DEV  │
   │ TECH (R-01)  │→→│ (B-01)       │
   │ Haiku        │  │ Sonnet       │
   │ RESEARCH     │  │ BUILD        │
   └──────────────┘  └──────────────┘
          findings ──→
```

**Trzy polaczenia:**
1. `Orkiestrator → Researcher`: typ `one` -- pytania badawcze
2. `Orkiestrator → Backend Dev`: typ `one` -- instrukcje budowy + wyniki researchu
3. `Researcher → Backend Dev`: typ `one` -- findings (dane z badania informuja implementacje)

> **Czy wiesz, ze...?**
> Recon Squad to jedyny preset Tier 1, ktory posiada agenta badawczego. Solo (2 agenty) i Quick Fix (2 agenty) nie maja fazy badawczej -- przechodza od razu do implementacji. Dodanie jednego Researchera to roznica miedzy "zgadywaniem" a "decyzja na bazie danych".

---

## 3. Wzorzec architektoniczny -- Hub-and-Spoke (mini)

### Teoria Hub-and-Spoke

Hub-and-Spoke to jeden z najczesciej stosowanych wzorcow w architekturze wieloagentowej. Nazwa pochodzi z transportu lotniczego, gdzie wielkie lotniska (huby) laczyla sie z mniejszymi portami (spokes) gwiazdzistym ukladem polaczen. W kontekscie agentowym: **Hub** = Orkiestrator (centralny punkt koordynacji), **Spokes** = agenty robocze. Kazda komunikacja przechodzi przez hub. Spokes nie komunikuja sie ze soba BEZPOSREDNIO... z jednym wyjatkiem.

### Dlaczego "mini"?

Pelny Hub-and-Spoke w architekturze Gold Standard 2026 moze miec **5-6 spoke'ow**: Researcher, Builder, QA, Designer, Integrator, Redaktor. Recon Squad uzywa TYLKO 2 spoke'ow: Researcher i Builder -- to najprostrzy wariant z faza badawcza.

### Cross-spoke communication

W klasycznym Hub-and-Spoke spokes NIE rozmawiaja ze soba -- wszystko przechodzi przez Hub. Recon Squad lamie te zasade w jednym miejscu: **Researcher → Backend Dev**. Research findings sa przekazywane bezposrednio do Buildera. Dlaczego? Bo Orkiestrator to Claude Opus -- najdrozszy model. Przepuszczanie pelnego raportu badawczego (20-30K tokenow) przez Opus tylko po to, zeby go przeslal dalej, kosztowaloby dodatkowe $0.02-0.04 BEZ wartosci dodanej.

### Model routing w Recon Squad

| Agent | Model | Dlaczego ten model? |
|-------|-------|---------------------|
| Orkiestrator | Opus | Decyzje strategiczne wymagaja najsilniejszego rozumowania |
| Researcher Tech | Haiku | Zbieranie danych to task dla taniego modelu -- duzo inputu, strukturalny output |
| Backend Dev | Sonnet | Pisanie kodu wymaga dobrego rozumowania, ale nie na poziomie Opus |

Efekt: **60% kosztow na najtanszym modelu** (Haiku), **35% na srednim** (Sonnet), **5% na najdrozszym** (Opus). To Smart Model Routing w miniaturze. Zlozonosc komunikacji: **O(3)** polaczen -- niemal minimalna (Solo ma O(1), Quick Fix ma O(2)).

> **Uwaga!**
> Hub-and-Spoke mini NIE skaluje sie dobrze. Jesli potrzebujesz dodac QA, Designera lub drugiego Researchera -- przejdz na pelny Hub-and-Spoke (preset startup) lub Pipeline (preset feature_sprint). Recon jest zoptymalizowany pod PROSTOTE, nie rozszerzalnosc.

---

## 4. Zasada "Look Before You Leap"

Recon Squad istnieje, zeby wyeliminowac **dwa katastrofalne anty-wzorce**, ktore niszcza projekty software'owe. Oba sa przeciwlegle, ale rownolegie destrukcyjne.

### Anty-wzorzec #1: Analysis Paralysis (Paraliz Analityczny)

**Definicja:** Zespol bada technologie bez konca, nigdy nie przechodzac do implementacji. Objawy: 500-stronicowe specyfikacje, cotygodniowe spotkania "porownujace frameworki" od 6 miesiecy, arkusze z 47 kolumnami, zero dzialajacego kodu. Koszt: projekty z Analysis Paralysis czesto w ogole nie dochodza do fazy implementacji.

**Jak Recon eliminuje:** Researcher ma OGRANICZONY budzet tokenowy (~20-30K). Musi dostarczyc raport w jednym przebiegu. Backend Dev CZEKA na wyniki -- istnienie Buildera tworzy naturalna presje na zakonczenie fazy badawczej.

### Anty-wzorzec #2: Blind Building (Slepie Budowanie)

**Definicja:** Zespol zaczyna kodowac natychmiast, bez sprawdzenia jaka technologia jest optymalna. Objawy: "Wez React, to sie nada" bez porownania, ciagly refaktoring, odkrywanie ograniczen PO zainwestowaniu 200 godzin kodu. Koszt: refaktoring jest 5-20x drozszy niz wlasciwy wybor na poczatku.

**Jak Recon eliminuje:** Backend Dev NIE zaczyna budowac, dopoki Researcher nie dostarczy raportu, a Orkiestrator nie zatwierdzi kierunku. Istnienie Researchera wymusza faze odkrywania PRZED kodowaniem.

### Recon jako rownowaga

```
ANALYSIS PARALYSIS                    BLIND BUILDING
     ←←←←←←←←←                         →→→→→→→→→
100% research                         0% research
  0% build                           100% build
     PORAZKA                             PORAZKA

                   RECON SQUAD
                   ←←←←||→→→→
                   40% research
                   60% build
                      SUKCES
```

Recon Squad celowo ustawia rownowage: okolo 40% wysilku na research, 60% na build. Build jest wazniejszy, bo produkuje namacalny artefakt (POC). Ale te 40% researchu sprawia, ze build idzie we WLASCIWYM kierunku.

### Diagram decyzyjny: "Czy potrzebuje Recon?"

```
START: Mam zadanie technologiczne
         │
         ↓
Czy technologia jest juz zdecydowana?
    TAK → Solo / Quick Fix
    NIE ↓
Czy musze porownac opcje i wybrac najlepsza?
    NIE → Solo z research phase
    TAK ↓
Ile opcji / domen?
    2-5 opcji → RECON SQUAD ✓
    6+ opcji z wielu domen → Research Swarm
```

> **Czy wiesz, ze...?**
> Nazwa "Look Before You Leap" (Popatrz Zanim Skoczysz) pochodzi z przyslow angielskich XVI wieku. W kontekscie software'owym zostala spopularyzowana przez ruch Lean Software Development, ktory postuluje "decide as late as possible" -- podejmuj decyzje tak pozno, jak to mozliwe, zeby miec maksimum informacji.

---

## 5. Przeplyw danych -- Fazy rozpoznania

Recon Squad dziala w **dwoch sekwencyjnych fazach**: RESEARCH → BUILD, z bramami decyzyjnymi miedzy nimi.

### Krok 1-3: Przyjecie i analiza zlecenia

Uzytkownik przesyla zadanie z niepewnoscia technologiczna. Orkiestrator analizuje: "Co wiemy, a czego NIE wiemy?" Nastepnie tworzy konkretne pytania badawcze:

```json
{
  "research_questions": [
    "Porownaj PostgreSQL vs MongoDB vs ClickHouse dla real-time analytics",
    "Jaka baza obsluguje >10K insertow/sek z sub-100ms query latency?",
    "Jakie sa koszty hostingu kazdej opcji na skali 1TB danych?"
  ],
  "constraints": {
    "max_options": 5,
    "required_metrics": ["latency_p99", "throughput_writes", "cost_per_gb"],
    "deadline_tokens": 30000
  }
}
```

### Krok 4-5: FAZA 1 -- Research

Researcher Tech przeszukuje dokumentacje, benchmarki, blogi techniczne. Produkuje raport:

```json
{
  "research_report": {
    "query": "Baza danych dla real-time analytics",
    "top_recommendation": "ClickHouse",
    "confidence": 0.85,
    "options": [
      {
        "name": "ClickHouse", "score": 9.2,
        "pros": ["Sub-10ms query na 1B rows", "Column-oriented OLAP", "Open-source"],
        "cons": ["Slabe do OLTP", "Stroma krzywa nauki"],
        "latency_p99": "12ms", "throughput_writes": "500K inserts/sec"
      },
      {
        "name": "TimescaleDB", "score": 8.1,
        "pros": ["Znany SQL", "Hypertables"],
        "cons": ["Wolniejszy na duzych zbiorach"],
        "latency_p99": "45ms", "throughput_writes": "150K inserts/sec"
      },
      {
        "name": "MongoDB", "score": 6.5,
        "pros": ["Elastyczny schemat"],
        "cons": ["NIE zoptymalizowany pod analytics"],
        "latency_p99": "180ms", "throughput_writes": "80K inserts/sec"
      }
    ],
    "sources": ["clickhouse.com/docs", "docs.timescale.com", "mongodb.com/docs"]
  }
}
```

### Krok 6: BRAMA -- Ewaluacja Orkiestratora

Orkiestrator ocenia raport: Czy odpowiedzial na WSZYSTKIE pytania? Czy porownano min. 3 opcje? Czy sa benchmarki z zrodlami? Czy rekomendacja jest spojna z danymi? **Decyzja: GO** -- przejscie do fazy Build.

### Krok 7-8: FAZA 2 -- Build POC

Orkiestrator wysyla instrukcje: "Zbuduj POC z ClickHouse: polaczenie, insert 10K rekordow, query analityczny z sub-100ms". Backend Dev implementuje spike -- 3 pliki demonstrujace podejscie.

### Krok 9-10: Finalna ewaluacja

```json
{
  "poc_result": {
    "status": "SUCCESS",
    "files_created": 3,
    "key_metrics": {
      "insert_10k_time": "0.8s",
      "query_latency_avg": "23ms",
      "query_latency_p99": "67ms"
    },
    "issues_found": ["Wymaga clickhouse-driver", "Brak migration out-of-the-box"],
    "recommendation": "GO -- ClickHouse spelnia wymagania."
  }
}
```

**Calkowity przeplyw:**

```
User Request → [Orkiestrator: analiza] → [Pytania badawcze]
                                            ↓
                                     [Researcher: FAZA 1]
                                            ↓
                              [Orkiestrator: BRAMA GO/NO-GO]
                                            ↓ (GO)
                                     [Backend Dev: FAZA 2]
                                            ↓
                              [Orkiestrator: ewaluacja koncowa]
                                            ↓
                                     [Rekomendacja do usera]
```

---

## 6. Koszt i tokeny

### Rozklad kosztow na agentow

| Agent | Model | Tokeny | Koszt laczny |
|-------|-------|--------|--------------|
| Orkiestrator | Opus ($15/$75) | ~20-30K | ~$0.02-$0.06 |
| Researcher Tech | Haiku ($0.80/$4) | ~20-30K | ~$0.02-$0.04 |
| Backend Dev | Sonnet ($3/$15) | ~30-50K | ~$0.04-$0.10 |
| **RAZEM** | -- | **~80-120K** | **$0.08-$0.20** |

### ROI fazy badawczej

```
SCENARIUSZ A: Z RECON (research + build)
  Research:  $0.03  |  Build POC: $0.07  |  Refaktoring: $0.00
  KOSZT CALKOWITY: $0.10

SCENARIUSZ B: BEZ RECON (blind build)
  Build v1:  $0.07 (zla tech)  |  Refaktoring: $0.15  |  Build v3: $0.10
  KOSZT CALKOWITY: $0.32
```

**ROI researchu: 320% zwrot z inwestycji.** Za $0.03 researchu oszczedzasz $0.22 refaktoringu. W duzych projektach efekt sie multiplikuje -- jesli bledna decyzja kosztuje $2-5, to $0.03 researchu daje **ROI 66x-166x**.

### Porownanie kosztow z innymi presetami

| Preset | Agentow | Tokeny | Koszt | Research? |
|--------|---------|--------|-------|-----------|
| Solo | 2 | ~40-80K | $0.04-$0.15 | NIE |
| Quick Fix | 2 | ~50-90K | $0.05-$0.15 | NIE |
| **Recon** | **3** | **~80-120K** | **$0.08-$0.20** | **TAK** |
| Startup | 5 | ~150-300K | $0.15-$0.40 | TAK |
| Feature Sprint | 7 | ~250-450K | $0.25-$0.60 | TAK |
| Research Swarm | 9 | ~200-400K | $0.20-$0.60 | TAK (6x) |

> **Czy wiesz, ze...?**
> Koszt jednej sesji Recon Squad ($0.08-$0.20) to mniej niz jedna kawa z automatu. A moze uchronic przed wielodniowym refaktoringiem. Stosunek ceny do wartosci czyni Recon jednym z najbardziej efektywnych kosztowo presetow w calym ekosystemie.

---

## 7. Kiedy uzywac (a kiedy NIE)

### ZIELONE SWIATLO -- Idealne zastosowania

| Scenariusz | Przyklad | Dlaczego Recon? |
|------------|----------|-----------------|
| Wybor frameworka | "React vs Vue vs Svelte dla dashboardu" | Porownanie opcji z POC |
| Ewaluacja biblioteki | "D3 vs Chart.js vs Recharts" | Research + spike |
| Wykonalnosc API | "Czy Stripe API obsluguje subscription pause?" | Sprawdzenie docs + POC |
| Nowa technologia | "Czy WebAssembly nadaje sie do naszego use case?" | Research + minimalny POC |
| Migracja | "Czy warto migrowac z Express do Fastify?" | Porownanie + spike migracyjny |

### ZOLTE SWIATLO -- Mozliwe, ale rozwaznie

| Scenariusz | Uwaga |
|------------|-------|
| Srednia zlozonosc, znana domena | Recon moze byc overkill -- moze wystarczy Solo |
| Znane narzedzia, nowy kontekst | Research moze nie wniesc wiele |
| Porownanie 2 bardzo podobnych opcji | Czasem lepiej po prostu sprobowac obie (2x Solo) |

### CZERWONE SWIATLO -- NIE uzywaj Recon

| Scenariusz | Lepszy preset | Dlaczego? |
|------------|---------------|-----------|
| Technologia zdecydowana | Solo / Quick Fix | Research zbedny |
| Pelna funkcjonalnosc | Startup / Feature Sprint | Recon buduje tylko POC |
| Audyt bezpieczenstwa | Bug Hunt | Brak QA agenta |
| Wiele domen badawczych | Research Swarm | 1 Researcher to za malo |
| Prosty bug fix | Quick Fix | Nie potrzebujesz researchu |
| Frontend + Backend | Startup | Brak Designera/Frontendu |

### Przyklady decyzji

```
"Stripe vs PayPal dla platnosci?"    → TAK, RECON ✓
"Napraw blad renderowania w React"   → NIE (Solo / Quick Fix)
"Zbuduj caly dashboard z chartami"   → NIE (Startup -- za duzy scope)
"Zbadaj 10 dostawcow AI i hosting"   → NIE (Research Swarm -- za wiele domen)
"Czy GraphQL zastapi nam REST API?"  → TAK, RECON ✓
```

---

## 8. Scenariusze z zycia wziate

### Scenariusz 1: Wybor bazy danych -- SQL vs NoSQL

**Kontekst:** Startup buduje platforme real-time analytics. 50M eventow/dzien, sub-100ms latency.

**Przebieg:** Orkiestrator formyluje pytania: porownaj PostgreSQL vs MongoDB vs ClickHouse vs TimescaleDB vs DuckDB. Researcher Tech bada i raportuje: ClickHouse score 9.2 (najszybsze analityczne zapytania), TimescaleDB 8.1 (dobry kompromis SQL + time-series), MongoDB 5.5 (nie zoptymalizowany pod analytics). Orkiestrator ewaluuje: "ClickHouse wygrywa. GO."

Backend Dev buduje POC: polaczenie z ClickHouse Cloud, insert 100K rekordow, 5 zapytan analitycznych. Wynik: avg query latency 23ms, p99 = 67ms.

**Rezultat:** GO z ClickHouse. **Koszt:** $0.12 | **Czas:** ~120s | **Zaoszczedzony refaktoring:** ~$0.50-2.00

### Scenariusz 2: Migracja frameworka -- Express → Fastify

**Kontekst:** API na Express.js z 45 endpointami. Wydajnosc spada przy 1000 req/sec.

**Przebieg:** Researcher porownuje Express vs Fastify vs Koa vs Hono. Raport: Fastify 2-3x wiecej req/sec, inkrementalna migracja mozliwa dzieki fastify-express compatibility layer. Orkiestrator: "GO z Fastify."

Backend Dev buduje POC: 3 endpointy z Fastify, benchmark wrk. Wynik: Fastify 15,200 req/sec vs Express 6,800 req/sec (2.2x szybszy). Compatibility layer dziala.

**Rezultat:** GO z Fastify, inkrementalna migracja. **Koszt:** $0.15 | **Czas:** ~150s

### Scenariusz 3: FAIL -- Research bez jasnych pytan

**Kontekst:** Manager prosi "zbadaj narzedzia AI do naszego produktu".

**Przebieg:** Orkiestrator POWINIEN byl dopytac, ale przekazuje rozmyte pytanie. Researcher produkuje liste 40 narzedzi bez fokusa. Orkiestrator wybiera losowo: "Zbuduj POC z LangChain." Backend Dev buduje POC, ale manager mial na mysli narzedzia do generowania obrazow, nie chatbotow.

**Rezultat:** FAIL. Zmarnowane $0.18 i 180 sekund.
**Lekcja:** Konkretne pytania badawcze sa FUNDAMENTEM presetu Recon. Poprawna wersja: "Porownaj DALL-E 3 vs Midjourney API vs Stable Diffusion XL do generowania produktowych zdjec e-commerce" z mierzalnymi kryteriami (jakosc, koszt, latencja).

> **Uwaga!**
> Scenariusz FAIL jest celowy. Nawet najlepszy preset zawodzi, gdy input jest zly. GARBAGE IN = GARBAGE OUT.

---

## 9. Anti-patterny (ZLE vs DOBRZE)

### Anti-pattern #1: Recon gdy technologia jest zdecydowana

```
ZLE:  "Uzyjemy React. Odpal Recon Squad."
      → Zmarnowane $0.03 i 60s na research z gory zdeterminowany
DOBRZE: "Uzyjemy React. Odpal Solo." → Zero zmarnowanego researchu
```

### Anti-pattern #2: Rozmyte pytania badawcze

```
ZLE:  Orkiestrator → Researcher: "Zbadaj AI tools"
      → 40 narzedzi bez fokusa, raport bezuzyteczny
DOBRZE: "Porownaj OpenAI GPT-4o vs Claude Sonnet vs Gemini Pro
        dla chatbota e-commerce. Metryki: latencja, koszt, jakosc."
        → 3 opcje po 3 metrykach, raport decyzjotworczy
```

### Anti-pattern #3: Builder buduje feature zamiast POC

```
ZLE:  "Zbuduj integracje z Stripe" → pelny system platnosci,
      150K tokenow, $0.30 -- i to tylko POC!
DOBRZE: "POC Stripe: 1 plik, 1 charge, 1 refund" → 30K tokenow, $0.07
```

**Zasada:** POC = minimum viable demonstration. 1-3 pliki, testuje JEDNA hipoteze.

### Anti-pattern #4: Misalignment Researcher-Builder

```
ZLE:  Researcher bada "Najlepsza baza NoSQL"
      Builder dostaje "Zbuduj REST API w Express" → dwa osobne projekty
DOBRZE: Research findings BEZPOSREDNIO informuja co Builder implementuje
```

### Anti-pattern #5: Pominiecie bramy Orkiestratora

```
ZLE:  Researcher → Backend Dev (Orkiestrator pominiety)
      → Build na bazie NIEZWERYFIKOWANEGO raportu
DOBRZE: Researcher → Orkiestrator (GO/NO-GO) → Backend Dev
        → Sprawdzenie kompletnosci, spojnosci, zrodel PRZED buildem
```

### Anti-pattern #6: POC jako kod produkcyjny

```
ZLE:  "POC dziala! Wdrazamy na produkcje!"
      → Brak error handling, logow, testow, security → awaria w 48h
DOBRZE: "POC dziala! Eskalacja do startup/feature_sprint."
        → Pelny zespol (5-7 agentow) buduje production-ready wersje
```

---

## 10. Porownanie z innymi presetami

### Tabela porownawcza

| Aspekt | Solo | Quick Fix | **Recon** | Startup | Research Swarm |
|--------|------|-----------|-----------|---------|----------------|
| **Agentow** | 2 | 2 | **3** | 5 | 9 |
| **Tier** | 1 | 1 | **1** | 2 | 3 |
| **Wzorzec** | Direct | Direct | **Hub-Spoke mini** | Hub-Spoke | Parallel Fan |
| **Research** | Brak | Brak | **1 Researcher** | 1 Researcher | 6 Researchers + Critic |
| **Build** | 1 Builder | 1 Fixer | **1 Builder (POC)** | 1 Builder (full) | 0 (brak build) |
| **QA** | Brak | Brak | **Brak** | QA Quality | N/A |
| **Koszt** | $0.04-0.15 | $0.05-0.15 | **$0.08-0.20** | $0.15-0.40 | $0.20-0.60 |
| **Latencja** | 30-90s | 30-90s | **90-180s** | 120-300s | 90-240s |

### Recon vs Solo

Solo to "po prostu zbuduj". Recon to "najpierw sprawdz, potem zbuduj". Roznica: jeden agent (Researcher) i ~$0.03 wiecej -- ale ta roznica moze uchronic przed godzinami refaktoringu.
**Uzyj Solo gdy:** wiesz CO budowac i JAK. **Uzyj Recon gdy:** wiesz CO, ale nie wiesz JAK.

### Recon vs Research Swarm

Research Swarm ma 6 Researcherow + Critica, ale NIE ma Buildera. Recon ma 1 Researchera I Buildera.
**Uzyj Recon gdy:** potrzebujesz research I POC. **Uzyj Swarm gdy:** potrzebujesz TYLKO gleboki research.

### Recon vs Startup

Startup to "zbuduj pelny feature z QA i frontendem". Recon to "sprawdz czy sie da".
**Uzyj Recon gdy:** nie wiesz czy technologia jest wykonalna. **Uzyj Startup gdy:** chcesz pelna implementacje.

### Drzewo decyzyjne

```
Mam zadanie technologiczne
    │
    ├─ Znana tech, prosty build         → SOLO
    ├─ Znana tech, bug do naprawy       → QUICK FIX
    ├─ Nieznana tech, potrzebny POC     → RECON ✓
    ├─ Znana tech, pelny feature        → STARTUP
    ├─ Nieznana domena, gleboki research → RESEARCH SWARM
    └─ Pelny produkt, wiele domen       → GOLD STANDARD
```

---

## 11. Quick Reference Card

```
+================================================================+
|                                                                 |
|          🔍 RECON SQUAD -- Quick Reference Card                 |
|          Preset #03 | Tier 1 (MINIMAL)                         |
|                                                                 |
+================================================================+
|                                                                 |
|  SKLAD ZESPOLU:                                                 |
|  ┌──────────────────┬─────────┬──────┬──────────┐              |
|  │ Agent            │ Model   │ Load │ Rola     │              |
|  ├──────────────────┼─────────┼──────┼──────────┤              |
|  │ Orkiestrator     │ Opus    │ 50%  │ STRATEGIA│              |
|  │ Researcher Tech  │ Haiku   │ 55%  │ RESEARCH │              |
|  │ Backend Dev      │ Sonnet  │ 75%  │ BUILD    │              |
|  └──────────────────┴─────────┴──────┴──────────┘              |
|                                                                 |
|  WZORZEC:     Hub-and-Spoke (mini) -- 3 polaczenia             |
|  TOKENY:      ~80-120K                                          |
|  KOSZT:       $0.08-$0.20                                       |
|  LATENCJA:    ~90-180 sekund                                    |
|                                                                 |
|  FAZY:        1. Research (Haiku bada opcje)                    |
|               2. Gate (Orkiestrator ewaluuje)                   |
|               3. Build (Sonnet tworzy POC)                      |
|               4. Ewaluacja (Orkiestrator decyduje GO/NO-GO)     |
|                                                                 |
|  IDEALNE DLA:                                                   |
|  ✓ Wybor frameworka / biblioteki                                |
|  ✓ Ewaluacja API / technologii                                  |
|  ✓ Feasibility study / POC                                      |
|  ✓ Spike techniczny                                             |
|  ✓ "Czy powinnismy uzyc X czy Y?"                              |
|                                                                 |
|  NIE UZYWAJ DO:                                                 |
|  ✗ Znana technologia (→ Solo)                                   |
|  ✗ Bug fix (→ Quick Fix)                                        |
|  ✗ Pelny feature (→ Startup)                                    |
|  ✗ Multi-domena research (→ Research Swarm)                     |
|  ✗ Kod produkcyjny (→ eskaluj po POC)                           |
|                                                                 |
|  KLUCZOWA ZASADA:                                               |
|  "Look Before You Leap"                                         |
|  Research PRZED Build. Diagnoza PRZED leczeniem.                |
|  40% research + 60% build = rownowaga.                          |
|                                                                 |
|  TOP 3 ANTI-PATTERNY:                                           |
|  1. Rozmyte pytania badawcze (brak fokusa)                      |
|  2. Builder buduje feature zamiast POC (over-scope)             |
|  3. Recon do zdecydowanej technologii (zmarnowany research)     |
|                                                                 |
|  PO RECON:                                                      |
|  POC udany → eskaluj do startup/feature_sprint                  |
|  POC nieudany → iteruj lub zmien technologie                    |
|                                                                 |
+================================================================+
```

---

## 12. Glosariusz

| Termin | Definicja |
|--------|-----------|
| **Hub-and-Spoke** | Wzorzec z centralnym wezlem (Hub = Orkiestrator) i polaczonymi specjalistami (Spokes). Cala komunikacja przechodzi przez Hub. |
| **Hub-and-Spoke (mini)** | Uproszczona wersja z tylko 2 spoke'ami. Uzywana w Recon Squad. |
| **POC (Proof of Concept)** | Minimalny dzialajacy przyklad demonstrujacy wykonalnosc podejscia. 1-3 pliki, testuje jedna hipoteze. NIE jest kodem produkcyjnym. |
| **Spike (techniczny)** | Eksperymentalna implementacja badajaca nieznana technologie. Synonim POC w metodologii Agile. |
| **Feasibility Study** | Badanie wykonalnosci -- czy podejscie techniczne jest realistyczne w ramach ograniczen projektu. |
| **Look Before You Leap** | Filozofia "Popatrz Zanim Skoczysz" -- zbadaj opcje przed podjaciem decyzji. Fundamentalna zasada Recon. |
| **Analysis Paralysis** | Anty-wzorzec: nieskonczone badanie bez przejscia do implementacji. 100% research, 0% build. |
| **Blind Building** | Anty-wzorzec: natychmiastowe kodowanie bez badania opcji. 0% research, 100% build. |
| **Framework Evaluation** | Systematyczne porownanie frameworkow wedlug metryk: wydajnosc, ekosystem, krzywa nauki, community. |
| **Research Questions** | Konkretne, ograniczone, mierzalne pytania od Orkiestratora dla Researchera. Fundament skutecznego badania. |
| **Gate (GO/NO-GO)** | Brama decyzyjna miedzy fazami. Orkiestrator ewaluuje i decyduje: dalej (GO) lub wrocic (NO-GO). |
| **Narrow Context Principle** | Agent dostaje TYLKO informacje potrzebne do zadania. Mniej kontekstu = mniej halucynacji. |
| **Smart Model Routing** | Opus dla decyzji, Sonnet dla buildu, Haiku dla researchu. Redukuje koszty o 70-90%. |
| **Cross-Spoke Communication** | Bezposrednia komunikacja miedzy spoke'ami z pominieciem Huba. W Recon: Researcher → Builder. |
| **ROI (Return on Investment)** | Zwrot z inwestycji. W Recon: ile oszczedzasz na refaktoringu dzieki fazie badawczej. |
| **Confidence Score** | Ocena pewnosci rekomendacji (0.0-1.0). Score >0.8 = wysoka pewnosc. |
| **Escalation** | Przekazanie do wiekszego presetu (np. Recon → Startup) po udanym POC. |
| **Tier** | Poziom zlozonosci presetu. Tier 1 = minimalny (2-3 agenty), Tier 2 = sredni (4-7), Tier 3 = zaawansowany (8+). |

---

## Zrodla

- **Gold Standard Agent Architecture 2026** -- referencyjny template 14 agentow w 4 fazach
- **MASTERCLASS: Zespoly Agentow AI 2026** -- kompletny przewodnik z anty-wzorcami i kalkulatorem kosztow
- **Agent Teams Configurator v8/v9** -- narzedzie do wizualnego projektowania architektur z 27 presetami
- **Anthropic Model Pricing 2026** -- oficjalne ceny Opus ($15/$75), Sonnet ($3/$15), Haiku ($0.80/$4)
- **Lean Software Development: An Agile Toolkit** (Poppendieck & Poppendieck) -- filozofia "decide as late as possible"
- **Hub-and-Spoke Architecture Patterns** -- analiza wzorcow komunikacji w systemach rozproszonych
- **OBSERVATORY Architecture** -- case study systemu z orkiestracja wieloagentowa
- **Multi-Agent Research Systems** (Anthropic, 2026) -- 90.2% improvement z wieloagentowym researchem
- **IDC Report: AI Model Routing Strategies 2026** -- 70% enterprise adopcja model routingu do 2028

---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz 5-7 minutowa prezentacje wideo o presecie **Recon Squad** (Zespol Rozpoznawczy) z systemu architektur wieloagentowych AI. Prezentacja powinna byc edukacyjna, wizualnie anganzujaca i prowadzic widza od zera do pelnego zrozumienia.

### Struktura prezentacji:

**[0:00-0:30] HOOK -- Statystyka szokowa**
Ekran: Duza liczba "60%" z animacja glitch. Tekst: "60% refaktoringu mozna bylo uniknac jednym krokiem: ROZPOZNANIEM". Pokazac wizualnie before/after: po lewej chaotyczny kod z czerwonymi przekresleniami (blind building), po prawej czysty kod z zielonymi checkmarkami (po Recon). Pytanie retoryczne: "Ile razy zmieniales framework W TRAKCIE projektu?"

**[0:30-1:30] TRZY ANALOGIE -- Animowane scenki**
1. Zwiad wojskowy: animacja dronow zwiadowczych lecacych nad terenem, mapujacych zagrozenia. Dowodca daje sygnal "GO" i glowne sily ruszaja precyzyjnie.
2. Geodeta przed budowa: animacja geodety mierzacego dzialke laserem, dane plyna do tabletu architekta, ktory rysuje fundamenty dopasowane do terenu.
3. Lekarz-diagnosta: animacja RTG, wynikow badan, lekarz ogladajacy dane i przepisujacy celowane leczenie.

**[1:30-2:30] ARCHITEKTURA -- Hub-and-Spoke mini**
Animacja budowania diagramu: Orkiestrator (centralny wezel, zloty), potem Researcher (lewy, niebieski), potem Backend Dev (prawy, zielony). Strzalki laczace sie z animacja flow. Oznaczenia modeli: Opus, Haiku, Sonnet z kolorami odpowiadajacymi kosztom.

**[2:30-3:30] DWA ANTY-WZORCE -- Wizualizacja porazek**
Ekran podzielony na dwie sciezki:
- LEWA: Analysis Paralysis -- zespol tonacy w dokumentach, zegar sie kreci, zero kodu. "FAIL".
- PRAWA: Blind Building -- zespol kodujacy szalenco, wielki czerwony "X" i refaktoring. "FAIL".
- SRODEK: Recon Squad -- rownowaga 40/60, zielona etykieta "SUCCESS". Animacja wagi/balansu.

**[3:30-5:00] LIVE SCENARIO -- Wybor bazy danych w 3 minuty**
Krok po kroku: user request → Orkiestrator analizuje → Researcher przeszukuje docs → raport jako animowana tabela → Orkiestrator daje "GO" → Backend Dev buduje POC → metryki "23ms avg latency" z checkmarkiem → finalny ekran: "Rekomendacja: ClickHouse | Koszt: $0.12 | Czas: 120s"

**[5:00-5:45] ANTI-PATTERNY i POROWNANIE**
Galeria 6 anty-patternow jako "wanted posters". Tabela porownawcza Recon vs Solo vs Research Swarm z animowanym podswietlaniem roznic.

**[5:45-6:30] POROWNANIE KOSZTOW i ROI**
Animowany wykres slupkowy: koszt Recon ($0.12) vs blind building z refaktoringiem ($0.32). Strzalka "ROI: 320%".

**[6:30-7:00] ZAMKNIECIE**
Ekran: "Nie koduj w ciemno. Nie badaj bez konca. Recon to rownowaga."
Trzy ikony: 🔍 Researcher → ⚖️ Orkiestrator → 🔨 Builder
Call to action: "Nastepnym razem gdy nie wiesz JAKA technologie wybrac -- odpal Recon Squad."

### Styl wizualny:
- **Paleta glowna:** Search blue (#2563EB) na ciemnym tle (#1F2937)
- **Akcenty:** Zielony (#10B981) dla sukcesu, Czerwony (#EF4444) dla porazek
- **Tekst:** Bialy na ciemnym tle, bold dla kluczowych slow
- **Motyw graficzny:** Lupa/szklo powiekszajace jako leitmotiv, ikony zwiadowcow, mapy terenu
- **Animacje:** Plynne przejscia, budowanie diagramow krok po kroku, pulsujace wezly
- **Typografia:** Nowoczesny sans-serif (Inter lub similar), duze naglowki
- **Muzyka:** Eksploracyjna, budujaca ciekawosc (ambient + light electronic). Narastajaca gdy Researcher bada. Rozwiazujaca sie gdy POC sie udaje. Triumfalna na zakonczenie.
- **Tempo:** Dynamiczne, kazdy slajd 5-15 sekund. Animacje budujace napiecie.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike (1080x3000px) o presecie **Recon Squad** (Zespol Rozpoznawczy) z systemu architektur wieloagentowych AI. Infografika powinna byc czytelna, logicznie zorganizowana i wizualnie atrakcyjna.

### Struktura infografiki (od gory do dolu):

**[NAGLOWEK -- 1080x250px]**
Tytul: "RECON SQUAD -- Zwiad Przed Misja" w duzym, boldnym foncie. Ikona lupy 🔍 po lewej. Podtytul: "Preset #03 | Tier 1 | 3 Agenty | Hub-and-Spoke mini". Tlo: gradient od #1F2937 do #111827. Dekoracja: subtelne linie radarowe/sonarowe w tle.

**[SEKCJA 1: TROJKAT ROZPOZNAWCZY -- 1080x400px]**
Trzy karty agentow w ksztalcie trojkata (Hub-and-Spoke):
- Gora (srodek): Orkiestrator -- Opus -- zloty border -- ikona kompasu
- Dol-lewo: Researcher Tech -- Haiku -- niebieski border -- ikona lupy
- Dol-prawo: Backend Dev -- Sonnet -- zielony border -- ikona mlotka
Strzalki z etykietami: "pytania badawcze", "findings", "instrukcje budowy". Kazda karta: nazwa, model, load%, koszt/sesja.

**[SEKCJA 2: LOOK BEFORE YOU LEAP -- 1080x350px]**
Wizualizacja dwoch sciezek:
- LEWA (czerwona): "Blind Building" → "Zly framework" → "Refaktoring $$$" → "FAIL"
- PRAWA (zielona): "Recon Squad" → "Research" → "Trafna decyzja" → "POC" → "SUCCESS"
Srodkowa strzalka: "40-60% mniej refaktoringu"

**[SEKCJA 3: FLOW DIAGRAM -- 1080x400px]**
Przeplyw jako pionowy timeline: User Request → Orkiestrator analizuje → Pytania badawcze → FAZA 1 Research → Raport → BRAMA GO/NO-GO → FAZA 2 Build POC → POC gotowy → Ewaluacja → Rekomendacja. Czas: "90-180 sekund calkowicie"

**[SEKCJA 4: SYGNALIZACJA SWIETLNA -- 1080x300px]**
- ZIELONY: framework selection, library eval, API feasibility, POC, "X czy Y?"
- ZOLTY: srednia zlozonosc, znana domena + nowe narzedzia
- CZERWONY: znana tech (Solo), bug fix (Quick Fix), pelny feature (Startup), multi-domena (Swarm)

**[SEKCJA 5: KOSZT i ROI -- 1080x300px]**
Donut chart: Researcher $0.03 (niebieski), Builder $0.07 (zielony), Orkiestrator $0.04 (zloty). "TOTAL: $0.08-$0.20". ROI box: "Za $0.03 researchu oszczedzasz $0.22 refaktoringu = ROI 320%"

**[SEKCJA 6: SCENARIUSZ -- 1080x350px]**
Mini-komiks 4 panele: "SQL vs NoSQL?" → Researcher bada (ClickHouse 9.2, TimescaleDB 8.1) → Builder tworzy POC → "GO! ClickHouse -- 23ms latency". Etykieta: "Koszt: $0.12 | Czas: 120s"

**[SEKCJA 7: ANTI-PATTERNY -- 1080x300px]**
Siatka 2x3: ❌ Recon dla zdecydowanej tech | ❌ Rozmyte pytania | ❌ Feature zamiast POC | ❌ Misalignment Research-Build | ❌ Pominiecie bramy | ❌ POC jako production code

**[SEKCJA 8: POROWNANIE -- 1080x250px]**
Tabela: Solo vs Recon vs Startup vs Research Swarm. Kolumny: Agentow, Research, Build, QA, Koszt. Recon podswietlony jako "sweet spot".

**[SEKCJA 9: QUICK REFERENCE -- 1080x200px]**
Kompaktowa karta: Wzorzec | Tokeny | Koszt | Latencja | Fazy | Kluczowa zasada

**[STOPKA -- 1080x100px]**
"Agent Architecture Designer 2026 | Gold Standard Architecture"

### Styl wizualny:
- **Paleta:** Search blue (#2563EB), ciemne tlo (#1F2937), bialy tekst (#FFFFFF), zielony (#10B981), czerwony (#EF4444), zloty (#F59E0B)
- **Typografia:** Sans-serif, H1 36px bold, H2 24px semibold, body 14px regular
- **Ikony:** Outline style, monochromatyczne z akcentem kolorystycznym
- **Styl:** Flat design, minimalne cienie, zaokraglone rogi (8-12px), delikatne gradienty
- **Motyw:** Odkrywanie, eksploracja, lupa, radar, mapa -- narracja wizualna zwiadowcza

---

*Dokument opracowany na podstawie Gold Standard Agent Architecture 2026, MASTERCLASS Agent Teams, AGENT_TEAMS_CONFIGURATOR v8/v9 oraz analiz multi-agent research systems. Dane kosztowe aktualne na kwiecien 2026.*
