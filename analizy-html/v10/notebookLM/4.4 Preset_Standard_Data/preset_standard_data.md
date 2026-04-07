# STANDARD DEV & DATA PIPELINE -- Presety 8-Agentowe
## Kompletny Przewodnik | Tier 3 PRO | Gold Standard 2026

**Seria:** Architektura Agentow AI -- Presety i Konfiguracje
**Preset ID:** `standard` / `data_pipe`
**Nazwy:** Standard Dev / Data Pipeline
**Ikony:** Tryb / Wykres
**Tier:** 3 (PRO)
**Liczba agentow:** 8 / 8
**Wzorce:** Hierarchical Pipeline / Data Engineering Pipeline
**Koszt tokenowy:** ~250-400K / ~200-350K
**Koszt dolarowy:** $0.25-0.65 / $0.20-0.55
**Latencja:** ~180-300 sekund / ~150-250 sekund
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Dwa Filary Tier 3 PRO

Wyobraz sobie dwa rozne warsztaty w jednym budynku. Na pierwszym pietrze dziala **studio architektoniczne** -- projektuje domy, biurowce, centra handlowe. Kazdy projekt jest inny, ale proces zawsze ten sam: analiza terenu, projekt, budowa, inspekcja. Na drugim pietrze dziala **rafineria** -- przyjmuje rope naftowa, przetwarza ja przez szereg destylacji, laczy produkty posrednie i wypuszcza gotowe paliwo. Proces jest specjalistyczny, liniowy, zoptymalizowany pod przeplyw materialu.

Studio to **Standard Dev**. Rafineria to **Data Pipeline**.

Oba presety maja po 8 agentow. Oba naleza do Tier 3 PRO. Ale ich architektura, przeplyw danych i specjalizacja sa fundamentalnie rozne. Ten przewodnik pokazuje DLACZEGO, KIEDY i JAK uzywac kazdego z nich.

### Trzy Analogie dla Standard Dev

**Analogia 1: Firma budowlana**

Dyrektor (Orkiestrator) przyjmuje zlecenie na budynek. Inzynier (Analityk) bada teren i rysuje plan. Kierownik budowy (Planer) uklada harmonogram. Dwoch konsultantow (Researcher Tech + Researcher UX) sprawdza materialy i trendy projektowe. Murarz (Backend Dev) stawia sciany. Glazurnik (Frontend Dev) wykonczywa wnetrza. Inspektor BHP (QA Security) sprawdza bezpieczenstwo konstrukcji. Osiem osob, pelny cykl, od fundamentow po odbiory.

**Analogia 2: Redakcja gazety**

Redaktor naczelny (Orkiestrator) planuje wydanie. Dziennikarz sledczy (Analityk) identyfikuje tematy. Sekretarz redakcji (Planer) uklada kolumnowke. Researcher (Tech) weryfikuje fakty techniczne. Researcher (UX) sprawdza co czytelnicy chca czytac. Autor artykulow (Backend) pisze tresc. Grafik (Frontend) projektuje layout. Prawnik (QA Security) sprawdza, czy nic nie narusza przepisow.

**Analogia 3: Ekipa filmowa (mala produkcja)**

Rezyser (Orkiestrator) ma wizje filmu. Scenarzysta (Analityk) pisze fabule. Asystent rezysera (Planer) planuje plan zdjec. Researcher techniczny sprawdza realia. Researcher UX bada preferencje widowni. Operator kamery (Backend) kreci sceny. Montazysta (Frontend) sklada obraz. Konsultant prawny (QA Security) sprawdza prawa autorskie.

### Trzy Analogie dla Data Pipeline

**Analogia 1: Rafineria naftowa**

Dyrektor zakladu (Orkiestrator) nadzoruje proces. Inzynier procesowy (Analityk) analizuje sklad surowca. Planer produkcji (Planer) ustala kolejnosc destylacji. Laborant (Researcher Tech) bada parametry. Dokumentalista (Researcher Docs) zbiera specyfikacje techniczne. Operator destylacji (Backend Dev) obsluguje glowny proces. Operator krakingu (Feature Dev) obsluguje specjalistyczne transformacje. Kontroler jakosci (Integrator) laczy frakcje i weryfikuje produkt koncowy.

**Analogia 2: Fabryka przetwarzania zywnosci**

Szef produkcji (Orkiestrator) koordynuje linie. Technolog (Analityk) analizuje surowce. Planer (Planer) uklada partie produkcyjne. Laborant (Researcher Tech) sprawdza normy. Specjalista od receptur (Researcher Docs) zbiera dokumentacje. Operator linii glownej (Backend) przetwarza surowce. Operator mieszalni (Feature Dev) tworzy specjalne mieszanki. Kontroler koncowy (Integrator) pakuje i weryfikuje gotowy produkt.

**Analogia 3: System wodociagowy**

Dyrektor wodociagow (Orkiestrator) zarzadza cala siecia. Hydrolog (Analityk) bada zrodla wody. Inzynier (Planer) planuje system rurociagow. Chemik (Researcher Tech) analizuje jakosc. Inspektor norm (Researcher Docs) sprawdza przepisy sanitarne. Operator stacji uzdatniania (Backend) filtruje i oczyszcza. Operator chlorowni (Feature Dev) dodaje srodki dezynfekujace. Kontroler sieci (Integrator) laczy wszystko w sprawny system dystrybucji.

> **Czy wiesz, ze...?**
> 8 agentow to statystyczny "sweet spot" w architekturze wieloagentowej. Presety z 8 agentami obsluguja **~70% typowych zadan produkcyjnych** -- wystarczajaco duzo specjalistow na pelny cykl, ale jeszcze bez dramatycznego overhead komunikacyjnego. Przy 8 agentach potencjalna liczba kanalow to 28 (formula n*(n-1)/2), ale dzialki hierarchiczny pipeline ogranicza faktyczne polaczenia do 8-10.

> **Uwaga!**
> Standard Dev to **preset domyslny** -- jesli nie wiesz, czego uzyc, zacznij od niego. Data Pipeline to **preset specjalistyczny** -- uzywaj TYLKO do zadan zwiazanych z danymi, ETL, analytics. Uzywanie Data Pipeline do typowego web devu to jak uzywanie ciagnika do jazdy po autostradzie -- dojedziesz, ale to nie jest optymalne.

---

## 2. Sklad zespolu -- Standard Dev (8 agentow)

Standard Dev to **uniwersalny zespol deweloperski**. Pelny cykl: planowanie, research, budowa, audyt bezpieczenstwa. Hierarchical Pipeline w 4 warstwach.

### Warstwa 1: STRATEGIA

#### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | A-00 (orchestrator) |
| **Rola** | STRATEGIA -- analiza, dekompozycja, delegacja, walidacja |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50/100 |
| **Narzedzia** | Agent, Read/Write, Bash, TaskCreate |
| **Zakaz** | NIE generuje tresci, NIE pisze kodu |
| **Token budget** | ~25-40K |
| **Koszt/sesja** | ~$0.04-$0.08 |

Orkiestrator w Standard Dev pelni role **dyrektora projektowego**: przyjmuje zlecenie, dokonuje wstepnej analizy zlozonosci, deleguje do Analityka i Planera, potem koordynuje fazy research i build, a na koncu zbiera wynik z QA Security. Kontroluje 3 bramy GO/NO-GO (po planowaniu, po researchu, po buildzie).

### Warstwa 2: PLANOWANIE

#### Agent P-01: Analityk

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | P-01 (analyst) |
| **Rola** | PLANOWANIE -- dekompozycja problemu, identyfikacja zaleznosci |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 55/100 |
| **Narzedzia** | Read, Write |
| **Token budget** | ~20-35K |
| **Koszt/sesja** | ~$0.03-$0.06 |

Analityk rozbija zlecenie na niezalezne podzadania. Identyfikuje: co jest research, co jest implementacja. Szacuje zlozonosc kazdego zadania (S/M/L/XL). Tworzy mape zaleznosci -- "Backend wymaga wynikow Researcher Tech", "Frontend wymaga wynikow Researcher UX". Okresla priorytet i kolejnosc.

#### Agent P-02: Planer

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | P-02 (planner) |
| **Rola** | PLANOWANIE -- harmonogram, sciezka krytyczna, gate'y |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 40/100 |
| **Narzedzia** | Read, Write |
| **Token budget** | ~15-25K |
| **Koszt/sesja** | ~$0.02-$0.04 |

Planer bierze dekompozycje od Analityka i tworzy harmonogram. Identyfikuje co moze iscc ROWNOLEGLE (Researcher Tech + Researcher UX) i co musi byc SEKWENCYJNE (Backend po Research, QA po Build). Definiuje gate'y synchronizacji i estymuje czas kazdej fazy.

### Warstwa 3: RESEARCH

#### Agent R-01: Researcher Tech

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-01 (res_tech) |
| **Rola** | RESEARCH -- badanie frameworkow, bibliotek, API |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Narzedzia** | WebSearch, WebFetch, Read |
| **Token budget** | ~20-35K |
| **Koszt/sesja** | ~$0.02-$0.04 |

Researcher Tech bada strone techniczna: porownuje frameworki, sprawdza kompatybilnosc bibliotek, analizuje API dokumentacje, szuka benchmarkow i znanych issues. Produkuje raport z minimum 3 opcjami, pros/cons, snippetami kodu i linkami do zrodel.

#### Agent R-02: Researcher UX

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-02 (res_ux) |
| **Rola** | RESEARCH -- trendy UI/UX, accessibility, mood board |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 50/100 |
| **Narzedzia** | WebSearch, WebFetch |
| **Token budget** | ~15-30K |
| **Koszt/sesja** | ~$0.01-$0.03 |

Researcher UX bada strone uzytkownika: trendy interfejsow, kolory, typografia, layouty, mikro-interakcje. Sprawdza WCAG 2.1 AA. Zbiera inspiracje z Dribbble, Behance, Awwwards. Tworzy mood board z referencjami wizualnymi, ktore trafaja do Frontend Deva.

**Kluczowy INSIGHT:** Researcher Tech i Researcher UX dzialaja ROWNOLEGLE. To fundament wydajnosci Standard Dev -- podczas gdy Tech bada frameworki, UX zbiera inspiracje. Zero czekania.

### Warstwa 4: BUILD

#### Agent B-01: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-01 (backend) |
| **Rola** | BUILD -- API, schematy danych, logika biznesowa |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Narzedzia** | Write, Edit, Bash, Read |
| **Token budget** | ~35-60K |
| **Koszt/sesja** | ~$0.05-$0.10 |

Backend Dev to glowny builder. Implementuje: API endpoints (REST/GraphQL), schematy bazy danych, walidacje, logike biznesowa, error handling. Pisze testy jednostkowe (TDD). Dokumentuje API w OpenAPI/Swagger. Korzysta z wynikow Researcher Tech.

#### Agent B-02: Frontend Dev

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-02 (frontend) |
| **Rola** | BUILD -- komponenty UI, responsywnosc, accessibility |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 70/100 |
| **Narzedzia** | Write, Edit, Bash, Read |
| **Token budget** | ~30-50K |
| **Koszt/sesja** | ~$0.04-$0.08 |

Frontend Dev buduje warstwe kliencka. Mobile-first, reuzywalne komponenty, stany ladowania i bledow, ARIA labels, keyboard navigation. Korzysta z wynikow Researcher UX (mood board, paleta kolorow, referencje). Optymalizuje lazy loading i code splitting.

**Kluczowy INSIGHT:** Backend Dev i Frontend Dev dzialaja ROWNOLEGLE, podobnie jak Researcherzy. To drugi poziom rownoleglej pracy w Standard Dev -- podwaja efektywnosc fazy Build.

### Warstwa 5: QA / AUDYT

#### Agent Q-01: QA Security

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | Q-01 (qa_security) |
| **Rola** | QA/AUDYT -- audyt OWASP Top 10, CVE, secrets |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 50/100 |
| **Narzedzia** | Read, Grep, Bash |
| **Token budget** | ~20-30K |
| **Koszt/sesja** | ~$0.02-$0.03 |

QA Security to **ostatnia linia obrony**. Skanuje CALY artefakt (backend + frontend) pod katem OWASP Top 10: XSS, SQL Injection, CSRF, hardcoded secrets, niezabezpieczone endpointy, CVE zalenosci, polityki CORS. NIE naprawia -- RAPORTUJE z severity, lokalizacja i sugerowana remediacja. Jesli znajdzie krytyczna podatnosc, artefakt wraca do builderow.

### Diagram architektury Standard Dev

```
+==========================================================+
|            PRESET: STANDARD DEV (8 agentow)              |
|            Tier 3 PRO | Hierarchical Pipeline            |
+==========================================================+
|                                                          |
|  W1: STRATEGIA                                           |
|           +--------------------+                         |
|           |    ORKIESTRATOR    |                          |
|           |   A-00 | Opus     |                          |
|           |   Load: 50        |                          |
|           +--------+-+--------+                          |
|                    | |                                   |
|  W2: PLANOWANIE    | |                                   |
|           +--------v-+    +----------+                   |
|           |  ANALITYK |    |  PLANER  |                  |
|           |  P-01     |    |  P-02    |                  |
|           |  Sonnet   |    |  Sonnet  |                  |
|           |  Load: 55 |    |  Load: 40|                  |
|           +-----+-----+    +-----+----+                  |
|                 |                 |                       |
|  W3: RESEARCH   |                 |     <<PARALLEL>>     |
|       +---------v-------+  +-----v-----------+           |
|       | RESEARCHER TECH |  | RESEARCHER UX   |           |
|       | R-01 | Haiku    |  | R-02 | Haiku    |           |
|       | Load: 55        |  | Load: 50        |           |
|       +--------+--------+  +--------+--------+           |
|                |                     |                   |
|  W4: BUILD     |                     |  <<PARALLEL>>     |
|       +--------v--------+  +--------v--------+           |
|       |   BACKEND DEV   |  |  FRONTEND DEV   |           |
|       |  B-01 | Sonnet  |  |  B-02 | Sonnet  |           |
|       |  Load: 75       |  |  Load: 70       |           |
|       +--------+--------+  +--------+--------+           |
|                |                     |                   |
|  W5: QA        +----------+----------+                   |
|                           |                              |
|                +----------v---------+                    |
|                |    QA SECURITY     |                    |
|                |  Q-01 | Haiku     |                    |
|                |  Load: 50         |                    |
|                +--------------------+                    |
|                                                          |
+==========================================================+
|  Polaczenia: 8 (typ: one)                                |
|  Orkiestrator->Analityk, Orkiestrator->Planer            |
|  Orkiestrator->ResTech, Orkiestrator->ResUX              |
|  ResTech->Backend, ResUX->Frontend                       |
|  Backend->QASec, Frontend->QASec                         |
+==========================================================+
```

---

## 3. Sklad zespolu -- Data Pipeline (8 agentow)

Data Pipeline to **specjalistyczny zespol do inzynierii danych**. ETL, data warehouse, analytics, batch processing. Kluczowa roznica vs Standard Dev: zamiast Frontend Dev + Researcher UX + QA Security, ma Researcher Docs + Feature Dev + Integrator.

### Warstwa 1: STRATEGIA

#### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | A-00 (orchestrator) |
| **Rola** | STRATEGIA -- koordynacja pipeline'u danych |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50/100 |
| **Narzedzia** | Agent, Read/Write, Bash, TaskCreate |
| **Token budget** | ~20-35K |
| **Koszt/sesja** | ~$0.03-$0.07 |

Orkiestrator w Data Pipeline koordynuje przeplyw od planowania przez research, budowe az po integracje. Specyfika: kontroluje bramy jakosci danych (schema validation, data integrity checks) zamiast typowych bram code review.

### Warstwa 2: PLANOWANIE

#### Agent P-01: Analityk

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | P-01 (analyst) |
| **Rola** | PLANOWANIE -- analiza zrodel danych, mapowanie transformacji |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 55/100 |
| **Narzedzia** | Read, Write |
| **Token budget** | ~20-30K |
| **Koszt/sesja** | ~$0.03-$0.05 |

W kontekscie Data Pipeline, Analityk ma specjalna role: mapuje zrodla danych (bazy, API, pliki CSV/Parquet), identyfikuje transformacje potrzebne na kazdym etapie, szacuje wolumeny i definiuje wymagania SLA (latency, freshness, completeness).

#### Agent P-02: Planer

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | P-02 (planner) |
| **Rola** | PLANOWANIE -- harmonogram ETL, scheduling, partycjonowanie |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 40/100 |
| **Narzedzia** | Read, Write |
| **Token budget** | ~15-25K |
| **Koszt/sesja** | ~$0.02-$0.04 |

Planer w Data Pipeline planuje: kolejnosc ekstrakcji, okna czasowe batch processingu, strategia partycjonowania, retry policy, dead letter queues. Ustala co moze isc rownolegle (np. ekstrakcja z wielu zrodel) i co musi byc sekwencyjne (transformacja po ekstrakcji).

### Warstwa 3: RESEARCH

#### Agent R-01: Researcher Tech

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-01 (res_tech) |
| **Rola** | RESEARCH -- badanie narzedzi data engineering |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Narzedzia** | WebSearch, WebFetch, Read |
| **Token budget** | ~20-30K |
| **Koszt/sesja** | ~$0.02-$0.03 |

W Data Pipeline, Researcher Tech bada specyficznie: Apache Spark vs dbt vs Apache Beam, formaty danych (Parquet, Avro, ORC), bazy analityczne (ClickHouse, BigQuery, Snowflake, DuckDB), narzedzia orchestracji (Airflow, Dagster, Prefect). Porownuje throughput, koszt za TB, latencje zapytan.

#### Agent R-02: Researcher Docs

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-02 (res_docs) |
| **Rola** | RESEARCH -- dokumentacja techniczna, best practices |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 40/100 |
| **Narzedzia** | WebSearch, WebFetch, Read |
| **Token budget** | ~15-25K |
| **Koszt/sesja** | ~$0.01-$0.02 |

Researcher Docs to **specjalista od oficjalnych dokumentacji**. Zbiera getting started guides, best practices, performance optimization tips, config snippety i changelogi. W Data Pipeline jego rola jest krytyczna -- narzedzia data engineering czesto maja skomplikowana konfiguracje (Spark tuning, Airflow DAG patterns, dbt materialization strategies).

**Kluczowa roznica vs Standard Dev:** Zamiast Researcher UX (trendy UI), Data Pipeline ma Researcher Docs (dokumentacja techniczna). Dane nie maja interfejsu uzytkownika -- potrzebuja DOKUMENTACJI konfiguracji.

### Warstwa 4: BUILD

#### Agent B-01: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-01 (backend) |
| **Rola** | BUILD -- core ETL pipeline, ekstrakcja, glowna transformacja |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Narzedzia** | Write, Edit, Bash, Read |
| **Token budget** | ~30-50K |
| **Koszt/sesja** | ~$0.04-$0.08 |

Backend Dev w Data Pipeline implementuje: connectors do zrodel danych, logike ekstrakcji, core transformacje (mapping, filtering, aggregation), schematy walidacji, error handling z retry logic. Pisze testy jednostkowe dla kazdej transformacji.

#### Agent B-02: Feature Dev

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-02 (feature) |
| **Rola** | BUILD -- specjalistyczne transformacje danych |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 65/100 |
| **Narzedzia** | Write, Edit, Bash, Read |
| **Token budget** | ~25-40K |
| **Koszt/sesja** | ~$0.03-$0.06 |

Feature Dev w Data Pipeline to **specjalista od zaawansowanych transformacji**: real-time streaming (WebSocket/Kafka consumers), integracje AI/ML (feature extraction, model inference), wizualizacje danych (dashboard queries), third-party API integrations (np. pobieranie danych z zewnetrznych serwisow). Jest KOMPLEMENTARNY do Backend Dev -- Backend buduje core pipeline, Feature Dev dodaje specjalistyczne moduly.

**Kluczowa roznica vs Standard Dev:** Zamiast Frontend Dev (UI), Data Pipeline ma Feature Dev (specjalistyczne transformacje). Pipeline danych nie potrzebuje interfejsu -- potrzebuje SPECJALISTYCZNYCH TRANSFORMACJI.

### Warstwa 5: INTEGRACJA

#### Agent I-01: Integrator

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | I-01 (integrator) |
| **Rola** | INTEGRACJA -- laczenie modulow, testy E2E, finalna walidacja |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 70/100 |
| **Narzedzia** | Read, Write, Edit, Bash |
| **Token budget** | ~25-40K |
| **Koszt/sesja** | ~$0.03-$0.06 |

Integrator laczy prace Backend Dev i Feature Dev w **spojny pipeline**. Weryfikuje: API contracts miedzy modulami, schema compatibility, naming conventions, data flow end-to-end. Tworzy testy E2E calego pipeline'u. Sprawdza MANIFEST.md.

**Kluczowa roznica vs Standard Dev:** Zamiast QA Security (audyt bezpieczenstwa), Data Pipeline ma Integrator (laczenie modulow). Pipeline danych wymaga INTEGRACJI wiecej niz security audytu -- czesci musza ze soba wspolpracowac.

### Diagram architektury Data Pipeline

```
+==========================================================+
|            PRESET: DATA PIPELINE (8 agentow)             |
|            Tier 3 PRO | Data Engineering Pipeline        |
+==========================================================+
|                                                          |
|  W1: STRATEGIA                                           |
|           +--------------------+                         |
|           |    ORKIESTRATOR    |                          |
|           |   A-00 | Opus     |                          |
|           |   Load: 50        |                          |
|           +--------+-+--------+                          |
|                    | |                                   |
|  W2: PLANOWANIE    | |                                   |
|           +--------v-+    +----------+                   |
|           |  ANALITYK |    |  PLANER  |                  |
|           |  P-01     |    |  P-02    |                  |
|           |  Sonnet   |    |  Sonnet  |                  |
|           |  Load: 55 |    |  Load: 40|                  |
|           +-----+-----+    +-----+----+                  |
|                 |                 |                       |
|  W3: RESEARCH   |                 |     <<PARALLEL>>     |
|       +---------v-------+  +-----v-----------+           |
|       | RESEARCHER TECH |  | RESEARCHER DOCS |           |
|       | R-01 | Haiku    |  | R-02 | Haiku    |           |
|       | Load: 55        |  | Load: 40        |           |
|       +--------+--------+  +--------+--------+           |
|                |                     |                   |
|  W4: BUILD     |                     |  <<PARALLEL>>     |
|       +--------v--------+  +--------v--------+           |
|       |   BACKEND DEV   |  |   FEATURE DEV   |           |
|       |  B-01 | Sonnet  |  |  B-02 | Sonnet  |           |
|       |  Load: 75       |  |  Load: 65       |           |
|       +--------+--------+  +--------+--------+           |
|                |                     |                   |
|  W5: INTEGRACJA+----------+----------+                   |
|                           |                              |
|                +----------v---------+                    |
|                |     INTEGRATOR     |                    |
|                |  I-01 | Sonnet    |                    |
|                |  Load: 70         |                    |
|                +--------------------+                    |
|                                                          |
+==========================================================+
|  Polaczenia: 8 (typ: one)                                |
|  Orkiestrator->Analityk, Orkiestrator->Planer            |
|  Analityk->ResTech, Planer->ResDocs                      |
|  ResTech->Backend, ResDocs->FeatureDev                   |
|  Backend->Integrator, FeatureDev->Integrator             |
+==========================================================+
```

---

## 4. Wzorce architektoniczne -- Hierarchical Pipeline vs Data Engineering

### 4.1 Standard Dev: Hierarchical Pipeline

Hierarchical Pipeline to wzorzec, w ktorym praca plynie **z gory na dol** przez warstwy hierarchii. Kazda warstwa przetwarza dane i przekazuje wynik w dol. Kluczowe cechy:

1. **Jednorazowe przekazanie** -- kazdy agent wykonuje prace RAZ i przekazuje dalej (brak petli zwrotnych wewnatrz warstw)
2. **Rownoleglosc na warstwe** -- agenty w tej samej warstwie pracuja JEDNOCZESNIE (Researcher Tech || Researcher UX, Backend || Frontend)
3. **Bramy miedzy warstwami** -- Orkiestrator kontroluje przejscie do nastepnej warstwy (GO/NO-GO)
4. **Schemat Y** -- dwoch researcherow zbiega sie w dwoch builderow, ktorzy zbiegaja sie w jednym QA

```
Przeplyw Standard Dev (widok uproszczony):

    [Orkiestrator]
         |
    +----+----+
    |         |
 [Analityk] [Planer]
    |         |
    +----+----+
    |         |
 [R.Tech]  [R.UX]    <<< ROWNOLEGLE
    |         |
    +----+----+
    |         |
 [Backend] [Frontend]  <<< ROWNOLEGLE
    |         |
    +----+----+
         |
    [QA Security]
```

**Zlozonosc komunikacyjna:** O(8) polaczen aktywnych, O(28) potencjalnych. Efektywnosc: 8/28 = 28.6% uzycia kanalow. To zdrowy wskaznik -- nizszy oznaczalby zbyt duza centralizacje, wyzszy oznaczalby chaos.

### 4.2 Data Pipeline: Data Engineering Pipeline

Data Engineering Pipeline to wariant Hierarchical Pipeline zoptymalizowany pod **przeplyw danych**. Roznice:

1. **Routing Analityk-Planer do roznych Researcherow** -- Analityk kieruje do Researcher Tech, Planer do Researcher Docs (w Standard Dev oba id do orkiestratora)
2. **Feature Dev zamiast Frontend** -- specjalistyczne transformacje zamiast UI
3. **Integrator zamiast QA Security** -- laczenie modulow zamiast audytu bezpieczenstwa
4. **Silniejszy nacisk na dokumentacje** -- Researcher Docs zamiast Researcher UX

```
Przeplyw Data Pipeline (widok uproszczony):

    [Orkiestrator]
         |
    +----+----+
    |         |
 [Analityk] [Planer]
    |         |
    v         v
 [R.Tech]  [R.Docs]    <<< ROWNOLEGLE
    |         |
    v         v
 [Backend] [Feature]    <<< ROWNOLEGLE
    |         |
    +----+----+
         |
    [Integrator]
```

**Kluczowa roznica w routingu:** W Standard Dev Orkiestrator bezposrednio wysyla do wszystkich 4 agentow warswy 2 i 3. W Data Pipeline routing jest bardziej liniowy: Orkiestrator -> Analityk/Planer, Analityk -> ResTech, Planer -> ResDocs. To tworzy bardziej deterministyczny flow, typowy dla pipeline'ow ETL.

### 4.3 Porownanie polaczen (edges)

| Polaczenie | Standard Dev | Data Pipeline |
|-----------|-------------|---------------|
| Orkiestrator -> Analityk | TAK | TAK |
| Orkiestrator -> Planer | TAK | TAK |
| Orkiestrator -> Researcher Tech | TAK | NIE |
| Orkiestrator -> Researcher UX | TAK | -- |
| Analityk -> Researcher Tech | NIE | TAK |
| Planer -> Researcher Docs | -- | TAK |
| Researcher Tech -> Backend | TAK | TAK |
| Researcher UX -> Frontend | TAK | -- |
| Researcher Docs -> Feature Dev | -- | TAK |
| Backend -> QA Security | TAK | -- |
| Frontend -> QA Security | TAK | -- |
| Backend -> Integrator | -- | TAK |
| Feature Dev -> Integrator | -- | TAK |

Standard Dev ma **wiecej polaczen z Orkiestratora** (4 vs 2), co daje mu wiecej centralnej kontroli. Data Pipeline ma **bardziej liniowy flow** z routingiem przez warstwe planowania.

---

## 5. Przeplyw danych -- Standard Dev

### Scenariusz: "Zbuduj REST API + panel administracyjny do zarzadzania produktami"

**Krok 1-2: Orkiestrator przyjmuje i analizuje**

```json
{
  "task": "REST API + admin panel do zarzadzania produktami",
  "complexity": "M",
  "domains": ["backend (API)", "frontend (panel admin)"],
  "requires_research": true,
  "requires_ux": true,
  "preset_match": "standard_dev"
}
```

Orkiestrator identyfikuje: potrzebny research techniczny (jaki framework API?), research UX (jak wyglada dobry admin panel?), backend (API + DB), frontend (panel), security audit (OWASP).

**Krok 3-4: Analityk + Planer (SEKWENCYJNIE)**

Analityk produkuje dekompozycje:

```markdown
## Dekompozycja: Admin Panel + API

### Podzadanie 1: Research Tech (R-01)
- Porownaj: Express.js vs Fastify vs NestJS
- ORM: Prisma vs TypeORM vs Drizzle
- Baza: PostgreSQL vs MySQL
- Zlozonosc: S | Priorytet: 1

### Podzadanie 2: Research UX (R-02)
- Admin panel inspiracje (Retool, AdminJS, Filament)
- Tabele, filtry, CRUD interface best practices
- Dark/light mode, responsywnosc
- Zlozonosc: S | Priorytet: 1

### Podzadanie 3: Backend (B-01)
- REST API: CRUD produktow, autentykacja, paginacja
- Schema DB, migracje, seedy
- Testy jednostkowe
- Zlozonosc: M | Priorytet: 2 | Zalezy od: R-01

### Podzadanie 4: Frontend (B-02)
- Panel admin: lista, formularz, edycja, usuwanie
- Responsywnosc, filtry, sortowanie
- Zlozonosc: M | Priorytet: 2 | Zalezy od: R-02

### Podzadanie 5: QA Security (Q-01)
- OWASP scan: XSS, SQL Injection, CSRF
- Autentykacja: tokeny, rate limiting
- Zlozonosc: S | Priorytet: 3 | Zalezy od: B-01, B-02
```

Planer uklada harmonogram:

```
FAZA 1 (PARALLEL): R-01 + R-02           [~30s]
  GATE 1: Orkiestrator sprawdza raporty   [~5s]
FAZA 2 (PARALLEL): B-01 + B-02           [~60s]
  GATE 2: Orkiestrator sprawdza artefakty [~5s]
FAZA 3 (SEKWENCYJNE): Q-01               [~20s]
  GATE 3: Orkiestrator sprawdza raport QA [~5s]
TOTAL ESTYMACJA: ~125s + overhead = ~150-200s
```

**Krok 5-6: Research (ROWNOLEGLE)**

Researcher Tech raportuje:

```json
{
  "recommendation": "NestJS + Prisma + PostgreSQL",
  "confidence": 0.88,
  "alternatives": [
    {"name": "Fastify + Drizzle", "score": 8.1},
    {"name": "Express + TypeORM", "score": 7.2}
  ],
  "rationale": "NestJS: modularnosc, dekoratory, DI. Prisma: type-safe ORM, migracje. PostgreSQL: JSONB, full-text search."
}
```

Researcher UX raportuje:

```json
{
  "mood_board": "Retool-inspired clean admin",
  "color_palette": ["#1F2937", "#3B82F6", "#10B981", "#FFFFFF"],
  "patterns": [
    "Dense data tables z sortowaniem i filtrami",
    "Slide-over forms zamiast osobnych stron",
    "Breadcrumb navigation",
    "Dark/light toggle"
  ],
  "accessibility": "WCAG 2.1 AA, min kontrast 4.5:1"
}
```

**Krok 7-8: Build (ROWNOLEGLE)**

Backend Dev implementuje (na bazie raportu R-01):
- NestJS projekt ze structura modulowa
- Prisma schema: Product, Category, User
- REST endpoints: GET/POST/PUT/DELETE /api/products
- Autentykacja JWT, rate limiting
- Testy jednostkowe: 12 testow

Frontend Dev implementuje (na bazie raportu R-02):
- React/Next.js admin panel
- Data table z sortowaniem/filtrami
- Slide-over CRUD formularze
- Dark/light mode toggle
- WCAG 2.1 AA compliance

**Krok 9: QA Security**

```json
{
  "scan_result": "3 findings",
  "critical": 0,
  "high": 1,
  "medium": 2,
  "findings": [
    {
      "severity": "HIGH",
      "type": "Missing rate limiting on /api/auth/login",
      "location": "src/auth/auth.controller.ts:23",
      "remediation": "Dodaj @Throttle(5, 60) dekorator"
    },
    {
      "severity": "MEDIUM",
      "type": "No CORS policy defined",
      "location": "src/main.ts",
      "remediation": "app.enableCors({origin: ALLOWED_ORIGINS})"
    },
    {
      "severity": "MEDIUM",
      "type": "Missing helmet middleware",
      "location": "src/main.ts",
      "remediation": "app.use(helmet())"
    }
  ],
  "verdict": "CONDITIONAL PASS - fix HIGH before deployment"
}
```

**Krok 10: Orkiestrator -- finalna decyzja**

Orkiestrator analizuje raport QA: 0 critical, 1 high (rate limiting). Odsyla artefakt do Backend Dev z instrukcja naprawy. Po naprawie -> PASS. Calkowity koszt: ~$0.35, czas: ~200s.

---

## 6. Przeplyw danych -- Data Pipeline

### Scenariusz: "Zbuduj ETL pipeline: dane sprzedazowe z 3 zrodel -> data warehouse -> dashboard queries"

**Krok 1-2: Orkiestrator przyjmuje i analizuje**

```json
{
  "task": "ETL pipeline: 3 zrodla -> warehouse -> analytics",
  "complexity": "M",
  "domains": ["data engineering", "ETL", "analytics"],
  "sources": ["PostgreSQL (zamowienia)", "REST API (platnosci)", "CSV (magazyn)"],
  "preset_match": "data_pipe"
}
```

**Krok 3-4: Analityk + Planer**

Analityk mapuje zrodla danych:

```markdown
## Analiza Zrodel Danych

### Zrodlo 1: PostgreSQL (zamowienia)
- Tabele: orders, order_items, customers
- Wolumen: ~50K rekordow/dzien
- Format: relacyjny, normalized
- Transformacje: denormalizacja, kalkulacja sum

### Zrodlo 2: REST API (platnosci)
- Endpoint: GET /api/payments?date_from=...
- Format: JSON, paginacja (100/strona)
- Wolumen: ~30K transakcji/dzien
- Transformacje: mapping ID, waluta -> PLN

### Zrodlo 3: CSV (magazyn)
- Plik: inventory_YYYYMMDD.csv
- Format: CSV z naglowkami, ; separator
- Wolumen: ~5K SKU
- Transformacje: parsing, walidacja, normalizacja

### Docelowy schema warehouse:
- fact_sales (zamowienia + platnosci)
- dim_products (magazyn + zamowienia)
- dim_customers (zamowienia)
```

Planer uklada pipeline:

```
FAZA 1: Research (PARALLEL)
  R-01: Narzedzia ETL (dbt vs Spark vs custom Python)
  R-02: Dokumentacja konektorow i formatow

FAZA 2: Build (PARALLEL)
  B-01: Core pipeline (ekstrakcja 3 zrodla + transformacja)
  B-02: Feature Dev (streaming updates + ML feature extraction)

FAZA 3: Integracja
  I-01: Polacz moduly, testy E2E, schema validation

SCHEDULING:
  Batch: codziennie 02:00 UTC
  Incremental: co 15 min (PostgreSQL CDC)
  Full refresh: niedziele 04:00 UTC
```

**Krok 5-6: Research (ROWNOLEGLE)**

Researcher Tech raportuje:

```json
{
  "recommendation": "dbt + DuckDB (dev) / ClickHouse (prod)",
  "confidence": 0.82,
  "rationale": "dbt: SQL-based transformacje, wersjonowanie, testy. DuckDB: blazing fast dev. ClickHouse: column-store OLAP production.",
  "alternatives": [
    {"name": "Apache Spark", "score": 7.5, "note": "Overkill dla 50K/dzien"},
    {"name": "Custom Python (pandas)", "score": 6.8, "note": "Brak wersjonowania transformacji"}
  ],
  "connectors": {
    "postgresql": "dbt-postgres adapter",
    "rest_api": "Custom Python extractor + requests",
    "csv": "dbt seed / Python pandas"
  }
}
```

Researcher Docs raportuje:

```json
{
  "dbt_setup": {
    "getting_started": "dbt init project -> profiles.yml -> models/",
    "best_practices": [
      "Staging -> Intermediate -> Marts pattern",
      "One model per source per staging",
      "Incremental models dla fact tables"
    ],
    "materialization": {
      "staging": "view",
      "intermediate": "ephemeral",
      "marts": "incremental"
    },
    "testing": "schema.yml: unique, not_null, relationships, accepted_values"
  },
  "clickhouse_config": {
    "engine": "MergeTree ORDER BY (date, product_id)",
    "partitioning": "toYYYYMM(order_date)",
    "settings": "max_memory_usage = 10G"
  }
}
```

**Krok 7-8: Build (ROWNOLEGLE)**

Backend Dev implementuje core pipeline:
- Python extractors: PostgreSQL (psycopg2), REST API (requests + pagination), CSV (pandas)
- dbt models: stg_orders, stg_payments, stg_inventory
- dbt models: int_orders_enriched, int_payments_mapped
- dbt marts: fact_sales, dim_products, dim_customers
- dbt tests: unique, not_null, relationships
- Airflow DAG: daily_etl_pipeline

Feature Dev implementuje specjalistyczne moduly:
- Kafka consumer do real-time CDC z PostgreSQL
- ML feature extraction: RFM scoring per customer
- Dashboard-ready aggregacje: daily_revenue, top_products, cohort_retention
- Monitoring: data freshness alerts, row count anomaly detection

**Krok 9: Integrator**

```json
{
  "integration_report": {
    "modules_integrated": 2,
    "e2e_test_result": "PASS",
    "schema_validation": "PASS - all marts match expected schema",
    "data_flow_test": {
      "source_rows": 85000,
      "warehouse_rows": 84997,
      "delta": 3,
      "delta_reason": "3 rekordy z NULL primary key - poprawnie odfiltrowane"
    },
    "api_contracts": "PASS - extractor output matches dbt source schema",
    "naming_conventions": "PASS - snake_case, stg_/int_/fct_/dim_ prefixes",
    "verdict": "PASS - pipeline ready for deployment"
  }
}
```

Calkowity koszt: ~$0.30, czas: ~180s.

---

## 7. Porownanie Standard Dev vs Data Pipeline

### Tabela glowna

| Aspekt | Standard Dev | Data Pipeline |
|--------|-------------|---------------|
| **Sklad** | Ork+Ana+Plan+RTech+RUX+BE+FE+QASec | Ork+Ana+Plan+RTech+RDocs+BE+FDev+Int |
| **Wzorzec** | Hierarchical Pipeline | Data Engineering Pipeline |
| **Tier** | 3 PRO | 3 PRO |
| **Agentow** | 8 | 8 |
| **Tokeny** | ~250-400K | ~200-350K |
| **Koszt** | $0.25-0.65 | $0.20-0.55 |
| **Latencja** | ~180-300s | ~150-250s |
| **Modele** | 1xOpus + 4xSonnet + 3xHaiku | 1xOpus + 5xSonnet + 2xHaiku |
| **Rownoleglosc** | 2 pary (research, build) | 2 pary (research, build) |
| **Polaczenia** | 8 | 8 |
| **Frontend** | TAK (Frontend Dev) | NIE |
| **UX Research** | TAK (Researcher UX) | NIE |
| **Security** | TAK (QA Security) | NIE |
| **Docs Research** | NIE | TAK (Researcher Docs) |
| **Feature Dev** | NIE | TAK (specjalistyczne transformacje) |
| **Integrator** | NIE | TAK (laczenie modulow) |

### Trojkat kompromisow

```
            UNIWERSALNOSC
                 /\
                /  \
               / SD \
              /______\
             /        \
            /   obie   \
           /   pokrywaja\
          /______________\
         /                \
        /       DP         \
       /____________________\
  SPECJALIZACJA          INTEGRACJA
      (dane)              (moduly)

SD = Standard Dev   DP = Data Pipeline
```

Standard Dev wygrywa **uniwersalnoscia**: obsluguje web, SaaS, API + UI, security. Data Pipeline wygrywa **specjalizacja**: ETL, transformacje, integracja modulow danych.

### Rozklad kosztow (szacunkowy)

**Standard Dev ($0.25-0.65):**

| Agent | Model | % budzetu | Koszt |
|-------|-------|-----------|-------|
| Orkiestrator | Opus | ~15% | $0.04-$0.10 |
| Analityk | Sonnet | ~10% | $0.03-$0.06 |
| Planer | Sonnet | ~7% | $0.02-$0.04 |
| Researcher Tech | Haiku | ~7% | $0.02-$0.04 |
| Researcher UX | Haiku | ~6% | $0.01-$0.03 |
| Backend Dev | Sonnet | ~22% | $0.05-$0.14 |
| Frontend Dev | Sonnet | ~18% | $0.04-$0.11 |
| QA Security | Haiku | ~7% | $0.02-$0.04 |
| **Narzut orkiestracji** | -- | ~8% | $0.02-$0.09 |

**Data Pipeline ($0.20-0.55):**

| Agent | Model | % budzetu | Koszt |
|-------|-------|-----------|-------|
| Orkiestrator | Opus | ~14% | $0.03-$0.08 |
| Analityk | Sonnet | ~10% | $0.02-$0.05 |
| Planer | Sonnet | ~8% | $0.02-$0.04 |
| Researcher Tech | Haiku | ~7% | $0.02-$0.04 |
| Researcher Docs | Haiku | ~5% | $0.01-$0.03 |
| Backend Dev | Sonnet | ~20% | $0.04-$0.11 |
| Feature Dev | Sonnet | ~16% | $0.03-$0.09 |
| Integrator | Sonnet | ~12% | $0.02-$0.06 |
| **Narzut orkiestracji** | -- | ~8% | $0.01-$0.05 |

**Dlaczego Data Pipeline jest tanszy?** Researcher Docs (Haiku, Load 40) jest najlzejszym agentem w obu presetach. Brak QA Security (Haiku, Load 50) zamieniony na Integrator (Sonnet, Load 70) dodaje koszt, ale Feature Dev (Load 65) jest lzejszy niz Frontend Dev (Load 70). Netto: Data Pipeline oszczedza ~$0.05-0.10 na sesje.

---

## 8. Kiedy uzywac ktorego? -- Schemat decyzyjny

```
START: Mam zadanie do wykonania
         |
         v
Czy zadanie dotyczy DANYCH (ETL, pipeline, analytics)?
    TAK --> Czy wymaga UI/frontendu?
              TAK --> Standard Dev (lub Feature Sprint)
              NIE --> Czy wymaga integracji wielu modulow danych?
                        TAK --> DATA PIPELINE
                        NIE --> Czy wystarczy prostszy preset?
                                  TAK --> Recon / Plan_Exec
                                  NIE --> DATA PIPELINE
    NIE --> Czy zadanie wymaga backend + frontend?
              TAK --> Czy wymaga security audytu?
                        TAK --> STANDARD DEV
                        NIE --> Feature Sprint (7 agentow)
              NIE --> Czy wymaga TYLKO backendu?
                        TAK --> Plan_Exec (4) lub Bug Hunt (4)
                        NIE --> Recon (3) lub Solo (2)
```

### Sygnalizacja swietlna: Standard Dev

| ZIELONY (uzywaj) | ZOLTY (rozwaz) | CZERWONY (nie uzywaj) |
|-------------------|----------------|----------------------|
| Typowe projekty web | Projekt TYLKO backend | ETL/data pipeline |
| SaaS MVP z panelem | Projekt TYLKO frontend | ML/AI training |
| REST API + admin UI | Prosta strona statyczna | Batch data processing |
| Dashboard + API | Bugfix w jednym pliku | Data warehouse design |
| E-commerce backend+FE | Refaktoring backendu | Real-time streaming |
| CRUD aplikacja | Maly skrypt | Infrastructure as Code |
| Portal klienta | Dokumentacja | Mobile app (native) |

### Sygnalizacja swietlna: Data Pipeline

| ZIELONY (uzywaj) | ZOLTY (rozwaz) | CZERWONY (nie uzywaj) |
|-------------------|----------------|----------------------|
| ETL z wielu zrodel | Prosta ekstrakcja z 1 zrodla | Typowy web dev |
| Data warehouse design | Prosty batch job | UI/frontend projekty |
| Analytics pipeline | Jednorazowy skrypt CSV | Security audit |
| Batch processing | Dashboard (jesli prosta query) | Design system |
| Data migration | Log aggregation | Content management |
| Feature engineering (ML) | Data validation | Mobile app |
| Real-time CDC pipeline | Report generation | E-commerce frontend |

### Scenariusze porownawcze

**Scenariusz 1: "Zbuduj API do zarzadzania uzytkownikami z panelem admin"**
- **Odpowiedz:** STANDARD DEV. Jest backend (API) + frontend (panel admin) + potrzeba security audytu (dane uzytkownikow). Wszystkie 3 filary Standard Dev.

**Scenariusz 2: "Zbierz dane sprzedazowe z 3 zrodel i zbuduj hurtownie danych"**
- **Odpowiedz:** DATA PIPELINE. Klasyczny ETL: extraction z 3 zrodel, transformation, load do warehouse. Zero UI. Integracja modulow krytyczna.

**Scenariusz 3: "Zbuduj REST API z endpointami analitycznymi i wizualizacja danych"**
- **Odpowiedz:** STANDARD DEV jesli wizualizacja = frontend dashboard. DATA PIPELINE jesli wizualizacja = pre-computed queries bez UI.

**Scenariusz 4: "Migruj dane z legacy MySQL do nowego PostgreSQL ze zmiana schematu"**
- **Odpowiedz:** DATA PIPELINE. Migracja danych = ETL. Researcher Docs zbiera dokumentacje obu baz. Feature Dev obsluguje transformacje schematu. Integrator weryfikuje integralnosc.

**Scenariusz 5: "Zbuduj dashboard SaaS z platnosciami Stripe"**
- **Odpowiedz:** STANDARD DEV. Dashboard = frontend, Stripe = backend API, platnosci = security audit (PCI compliance).

---

## 9. Anti-patterny -- Czego NIE robic

### Anti-patterny Standard Dev

**Anti-pattern #1: Uzywanie Standard Dev do pure data tasks**

```
ZLE:  "Zbuduj ETL pipeline" -> Standard Dev
      Researcher UX szuka trendow UI... dla pipeline'u danych???
      Frontend Dev buduje UI... dla batch processingu???
      QA Security skanuje OWASP... dla wewnetrznego ETL???

DOBRZE: "Zbuduj ETL pipeline" -> Data Pipeline
```

Marnujesz 2 agentow (Researcher UX + Frontend Dev) i nie masz Integratora, ktory jest KLUCZOWY dla pipeline'ow danych.

**Anti-pattern #2: Pomijanie fazy research**

```
ZLE:  Orkiestrator -> od razu Build (pomija Analityka, Planera, Researcherow)
      "Wiemy co robic, po co badac?" -> refaktoring w 3 iteracji

DOBRZE: Pelny flow przez wszystkie warstwy, nawet jesli research jest krotki
```

Nawet 30 sekund researchu ($0.03) oszczedza 5 minut refaktoringu ($0.20+).

**Anti-pattern #3: Naduzywanie dla prostych zadan**

```
ZLE:  "Popraw literowke w README" -> Standard Dev (8 agentow, $0.35)
DOBRZE: "Popraw literowke w README" -> Solo (2 agentow, $0.05)
```

Regula kciuka: jesli zadanie da sie opisac w 1 zdaniu i dotyczy 1-2 plikow -> Solo lub Quick Fix.

**Anti-pattern #4: Brak eskalacji gdy zlozonosc rosnie**

```
ZLE:  "Zbuduj platform e-commerce z 15 modulami" -> Standard Dev (8 agentow)
      8 agentow na 15 modulow -> przeciazenie, brak pokrycia

DOBRZE: Eskaluj do Full-Stack SaaS (10) lub Full Hierarchy (13)
```

### Anti-patterny Data Pipeline

**Anti-pattern #1: Uzywanie Data Pipeline do web devu**

```
ZLE:  "Zbuduj strone internetowa" -> Data Pipeline
      Researcher Docs szuka dokumentacji... zamiast trendow UX
      Feature Dev buduje WebSocket streaming... zamiast UI
      Integrator laczy moduly... zamiast audytu security

DOBRZE: "Zbuduj strone internetowa" -> Standard Dev
```

**Anti-pattern #2: Pominiecie Integratora**

```
ZLE:  Backend Dev i Feature Dev buduja osobno, nikt nie laczy
      -> Niezgodne schematy, konflikty naming, broken data flow

DOBRZE: Integrator jako OBOWIAZKOWY ostatni krok
```

**Anti-pattern #3: Feature Dev jako "drugi Backend Dev"**

```
ZLE:  Backend Dev: API endpoints
      Feature Dev: wiecej API endpoints
      (Feature Dev robi to samo co Backend Dev)

DOBRZE: Backend Dev: core ETL (extract + transform)
        Feature Dev: SPECJALISTYCZNE moduly (streaming, ML, alerts)
```

Feature Dev istnieje dla NISZOWYCH, SPECJALISTYCZNYCH funkcjonalnosci -- nie jako kopia Backend Dev.

**Anti-pattern #4: Brak Researcher Docs przy nowym stacku**

```
ZLE:  "Uzyj Apache Beam" -> pomijasz Researcher Docs
      Backend Dev gada z Beam na slepo -> 5 iteracji prb i bledow

DOBRZE: Researcher Docs zbiera: getting started, best practices, config snippety
        Backend Dev implementuje z WIEDZA
```

---

## 10. Eskalacja do Tier 4 -- Kiedy 8 agentow to za malo

### Sygnaly, ze potrzebujesz wiecej niz Standard Dev (8)

| Sygnal | Obecny preset | Eskalacja do |
|--------|--------------|-------------|
| Potrzebujesz Designera (Figma/CSS system) | Standard Dev | Full-Stack SaaS (10) |
| Potrzebujesz wielu builderow (>2) | Standard Dev | Legacy Refactor (9) |
| Potrzebujesz QA Quality + QA Security | Standard Dev | Full Hierarchy (13) |
| Potrzebujesz Integratora + QA | Standard Dev | Full-Stack SaaS (10) |
| Projekt ma >10 modulow | Standard Dev | Microservices (11) |

### Sygnaly, ze potrzebujesz wiecej niz Data Pipeline (8)

| Sygnal | Obecny preset | Eskalacja do |
|--------|--------------|-------------|
| Pipeline ma >5 zrodel danych | Data Pipeline | Legacy Refactor (9) z 3 builderami |
| Potrzebujesz QA Security na danych | Data Pipeline | Full-Stack SaaS (10) |
| Pipeline + dashboard UI | Data Pipeline | Full Hierarchy (13) |
| Real-time + batch + ML | Data Pipeline | Deep Research+Build (18) |
| >1000 transformacji | Data Pipeline | Microservices (11) |

### Schemat eskalacji

```
                    ESKALACJA
    Standard Dev (8) -----> Full-Stack SaaS (10)
         |                        |
         |    +----> Legacy Refactor (9)
         |    |                   |
         +----+----> Full Hierarchy (13) <---+
                                             |
    Data Pipeline (8) -----> Legacy Refactor (9)
         |                        |
         +--------> Full Hierarchy (13)
         |
         +--------> Deep Research+Build (18)
```

### Deeskalacja -- kiedy 8 to za duzo

| Sygnal | Obecny preset | Deeskaluj do |
|--------|--------------|-------------|
| Tylko backend, brak frontendu | Standard Dev | Feature Sprint (7) lub Plan_Exec (4) |
| Proste CRUD, znany stack | Standard Dev | Startup (5) |
| Jeden plik/modul | Standard Dev | Solo (2) |
| Tylko research, brak buildu | Data Pipeline | Research Swarm (9) |
| Proste ETL, 1 zrodlo | Data Pipeline | Recon (3) |

---

## 11. Zaawansowane scenariusze

### Scenariusz A: Wieloetapowy projekt -- Standard Dev -> Data Pipeline -> Standard Dev

Duzy projekt SaaS z modelem analytics:

1. **Sprint 1: Standard Dev** -- zbuduj REST API + panel admin (uzytkownicy, produkty)
2. **Sprint 2: Data Pipeline** -- zbuduj ETL: dane sprzedazowe -> warehouse -> metryki
3. **Sprint 3: Standard Dev** -- zbuduj dashboard frontend konsumujacy metryki z warehouse

Kazdy sprint uzywa INNEGO presetu dopasowanego do zadania. To **preset switching** -- zamiast uzywac jednego wielkiego presetu do wszystkiego, przelaczasz sie miedzy optymalnymi.

### Scenariusz B: Real-time analytics platform

```
Wymagania:
- Ingest z Kafka (real-time events)
- Batch ETL z PostgreSQL (nightly)
- Transformacje dbt
- Dashboard z wykresami (React)
- Alerting (Slack notifications)

Analiza:
- Real-time + batch = Data Pipeline (core ETL)
- Dashboard = Frontend = Standard Dev
- ALE: oba naraz = za duzo dla 8 agentow

Decyzja:
- Sprint 1: Data Pipeline -> ETL + transformacje + alerting
- Sprint 2: Standard Dev -> Dashboard API + React frontend
- Sprint 3: Solo -> polaczenie (integracja gotowych modulow)
```

### Scenariusz C: Migracja legacy monolitu

```
Wymagania:
- Legacy PHP monolit -> Node.js microservices
- Migracja bazy MySQL -> PostgreSQL
- Nowe API + admin panel
- Zero downtime

Analiza:
- Migracja bazy = Data Pipeline
- Nowe API + UI = Standard Dev
- ALE: Legacy Refactor (9 agentow) ma OBIE mozliwosci

Decyzja: Legacy Refactor (9) jest lepszy niz dwa osobne sprinty
  bo ma: Researcher GitHub (wzorce migracji) + 3 builderow + 2 QA
```

---

## 12. Quick Reference Cards

### Quick Reference: Standard Dev

```
+-----------------------------------------------+
|  STANDARD DEV                                  |
|  Tier 3 PRO | 8 Agentow | Hierarchical        |
+-----------------------------------------------+
|  SKLAD:                                        |
|  A-00  Orkiestrator     Opus    Load 50        |
|  P-01  Analityk         Sonnet  Load 55        |
|  P-02  Planer           Sonnet  Load 40        |
|  R-01  Researcher Tech  Haiku   Load 55        |
|  R-02  Researcher UX    Haiku   Load 50        |
|  B-01  Backend Dev      Sonnet  Load 75        |
|  B-02  Frontend Dev     Sonnet  Load 70        |
|  Q-01  QA Security      Haiku   Load 50        |
+-----------------------------------------------+
|  METRYKI:                                      |
|  Tokeny:  ~250-400K                            |
|  Koszt:   $0.25-0.65                           |
|  Latencja: ~180-300s                           |
|  Polaczenia: 8 (all one-way)                   |
|  Modele: 1x Opus, 4x Sonnet, 3x Haiku         |
+-----------------------------------------------+
|  USE CASES: Web, SaaS, REST API + FE, CRUD     |
|  ANTI: ETL, data pipeline, pure backend        |
|  ESKALACJA: Full-Stack SaaS (10), FH (13)      |
|  DEESKALACJA: Feature Sprint (7), Plan_Exec(4) |
+-----------------------------------------------+
```

### Quick Reference: Data Pipeline

```
+-----------------------------------------------+
|  DATA PIPELINE                                 |
|  Tier 3 PRO | 8 Agentow | Data Engineering    |
+-----------------------------------------------+
|  SKLAD:                                        |
|  A-00  Orkiestrator     Opus    Load 50        |
|  P-01  Analityk         Sonnet  Load 55        |
|  P-02  Planer           Sonnet  Load 40        |
|  R-01  Researcher Tech  Haiku   Load 55        |
|  R-02  Researcher Docs  Haiku   Load 40        |
|  B-01  Backend Dev      Sonnet  Load 75        |
|  B-02  Feature Dev      Sonnet  Load 65        |
|  I-01  Integrator       Sonnet  Load 70        |
+-----------------------------------------------+
|  METRYKI:                                      |
|  Tokeny:  ~200-350K                            |
|  Koszt:   $0.20-0.55                           |
|  Latencja: ~150-250s                           |
|  Polaczenia: 8 (all one-way)                   |
|  Modele: 1x Opus, 5x Sonnet, 2x Haiku         |
+-----------------------------------------------+
|  USE CASES: ETL, warehouse, analytics, batch   |
|  ANTI: Web dev, UI/frontend, security audit    |
|  ESKALACJA: Legacy Refactor (9), FH (13)       |
|  DEESKALACJA: Recon (3), Plan_Exec (4)         |
+-----------------------------------------------+
```

---

## 13. Porownanie z innymi presetami Tier 2-3

| Preset | Agentow | Tier | Frontend | Research | QA | Integrator | Koszt | Use Case |
|--------|---------|------|----------|----------|-----|-----------|-------|----------|
| Feature Sprint | 7 | 2 | TAK | 2x | 1x Quality | NIE | $0.15-0.48 | Nowa funkcja |
| **Standard Dev** | **8** | **3** | **TAK** | **2x** | **1x Security** | **NIE** | **$0.25-0.65** | **Uniwersalny** |
| **Data Pipeline** | **8** | **3** | **NIE** | **2x** | **NIE** | **TAK** | **$0.20-0.55** | **ETL/dane** |
| Research Swarm | 9 | 3 | NIE | 6x | NIE | NIE | $0.20-0.60 | Pure research |
| Legacy Refactor | 9 | 3 | TAK | 2x | 2x | TAK | $0.25-0.65 | Modernizacja |
| Full-Stack SaaS | 10 | 4 | TAK | 1x | 2x | TAK | $0.35-0.80 | SaaS od zera |

**INSIGHT:** Standard Dev i Data Pipeline to **komplementarna para**. Standard Dev pokrywa web/SaaS, Data Pipeline pokrywa data engineering. Razem obsluguja ~80% typowych zadan Tier 3.

---

## 14. Zaawansowane metryki i optymalizacja

### Model Routing -- rozklad kosztow na modele

**Standard Dev:**
```
Opus:   1 agent  (~15% budzetu)  --> decyzje strategiczne
Sonnet: 4 agenty (~57% budzetu)  --> planowanie + budowa
Haiku:  3 agenty (~28% budzetu)  --> research + QA

Efektywnosc: 85% budzetu na tanie/srednie modele
```

**Data Pipeline:**
```
Opus:   1 agent  (~14% budzetu)  --> decyzje strategiczne
Sonnet: 5 agentow (~72% budzetu) --> planowanie + budowa + integracja
Haiku:  2 agenty (~14% budzetu)  --> research

Efektywnosc: 86% budzetu na tanie/srednie modele
```

Data Pipeline ma **wiecej Sonnetow** (5 vs 4) i **mniej Haiku** (2 vs 3). To oznacza wyzszy % budzetu na modele srednie, ale lepsza jakosc integracji (Integrator na Sonnet >> QA Security na Haiku pod wzgledem rozumowania).

### Throughput i bottleneck

**Standard Dev bottleneck:** Backend Dev (Load 75, najwyzszy). Wszystko czeka, az Backend skonczy. Mitygacja: rownolegla praca z Frontend Dev.

**Data Pipeline bottleneck:** Backend Dev (Load 75) i Integrator (Load 70). Integrator musi CZEKAC, az oba buildery skoncza. Mitygacja: Integrator moze zaczac od walidacji schematu zanim moduly sa gotowe.

### Formula kosztow

```
Koszt(Standard Dev) = 
  Opus(~30K * $15/1M) + 
  4 * Sonnet(~30K * $3/1M) + 
  3 * Haiku(~25K * $0.80/1M) + 
  Output(~50K * $75/1M Opus + ~80K * $15/1M Sonnet + ~30K * $4/1M Haiku)
  
  = $0.45 + $0.36 + $0.06 + overhead
  ~= $0.25-0.65 (z marginesem na retry/feedback loops)

Koszt(Data Pipeline) = 
  Opus(~25K * $15/1M) + 
  5 * Sonnet(~28K * $3/1M) + 
  2 * Haiku(~22K * $0.80/1M) + 
  Output(similar)
  
  = $0.375 + $0.42 + $0.035 + overhead
  ~= $0.20-0.55
```

---

## 15. Slownik (Glosariusz)

| Termin | Definicja |
|--------|-----------|
| **Tier 3 PRO** | Poziom presetow z 8-9 agentami. Pelny cykl bez luk. "Sweet spot" miedzy jakoscia a kosztem. |
| **Hierarchical Pipeline** | Wzorzec architektoniczny: praca plynie z gory na dol przez warstwy hierarchii. Brak petli zwrotnych wewnatrz warstw. |
| **Data Engineering Pipeline** | Wariant Hierarchical Pipeline zoptymalizowany pod przeplyw danych (ETL). Routing przez warstwe planowania. |
| **ETL** | Extract-Transform-Load: wzorzec pobierania danych ze zrodla, transformacji i ladowania do celu (np. warehouse). |
| **Data Warehouse** | Centralna baza danych analitycznych. Zoptymalizowana pod odczyt (OLAP), nie pod zapis (OLTP). |
| **CDC** | Change Data Capture: technika sledzenia zmian w bazie danych w czasie rzeczywistym (np. Debezium, WAL). |
| **Batch Processing** | Przetwarzanie danych w duzych partiach w zaplanowanych oknach czasowych (np. codziennie o 2:00). |
| **Feature Dev** | Agent specjalistyczny: real-time, AI/ML, data viz, third-party API. NIE jest kopia Backend Dev. |
| **Integrator** | Agent laczacy moduly w calosc. Weryfikuje API contracts, schema compatibility, tworzy testy E2E. |
| **Researcher Docs** | Agent zbierajacy oficjalna dokumentacje: getting started, best practices, config snippety. |
| **Researcher UX** | Agent badajacy trendy UI/UX: kolory, typo, layouty, accessibility. Tworzy mood board. |
| **QA Security** | Agent audytujacy bezpieczenstwo: OWASP Top 10, CVE, secrets. NIE naprawia -- RAPORTUJE. |
| **Smart Model Routing** | Strategia: najdrozszy model (Opus) do decyzji, sredni (Sonnet) do buildu, najtanszy (Haiku) do researchu/QA. |
| **Sweet Spot** | Optymalny punkt rownowagi. 8 agentow to sweet spot: pelny cykl z umiarkowanym narzutem. |
| **Preset Switching** | Strategia uzywania roznych presetow dla roznych sprintow w jednym projekcie. |
| **OWASP Top 10** | Lista 10 najczestszych podatnosci webowych (XSS, SQLi, CSRF, etc.) publikowana przez OWASP Foundation. |
| **dbt** | Data Build Tool: framework do transformacji danych w SQL. Staging -> Intermediate -> Marts pattern. |
| **Airflow** | Apache Airflow: narzedzie do orkiestracji workflow'ow danych (DAG-based scheduling). |
| **Narrow Context Principle** | Agent dostaje TYLKO informacje potrzebne do zadania. Mniej kontekstu = mniej halucynacji, nizszy koszt. |
| **GO/NO-GO Gate** | Brama decyzyjna miedzy fazami. Orkiestrator ewaluuje wynik i decyduje: kontynuuj lub wracaj. |
| **Cross-spoke Communication** | Bezposrednia komunikacja miedzy agentami roboczymi z pominieciem Orkiestratora. Np. Researcher -> Builder. |
| **Load** | Obciazenie agenta w skali 0-100. Wyzsze = wiecej pracy, dluzszy czas, wiecej tokenow. |
| **SLA** | Service Level Agreement: uzgodnione parametry jakosci (latency < Xms, freshness < Ymin, completeness > Z%). |

---

## 16. Zrodla

- **Gold Standard Agent Architecture 2026** -- referencyjny template 14 agentow w 5 warstwach (STRATEGIA, PLANOWANIE, RESEARCH, BUILD, QA)
- **MASTERCLASS: Zespoly Agentow AI 2026** -- kompletny przewodnik z anty-wzorcami, kalkulatorem kosztow i 27 presetami
- **Agent Teams Configurator v9/v12** -- narzedzie do wizualnego projektowania architektur z presetami standard i data_pipe
- **Anthropic Model Pricing 2026** -- oficjalne ceny: Opus ($15/$75), Sonnet ($3/$15), Haiku ($0.80/$4) za 1M tokenow
- **dbt Documentation** (docs.getdbt.com) -- best practices: staging/intermediate/marts, materializations, testing
- **Apache Airflow Documentation** -- DAG patterns, scheduling, executor types
- **ClickHouse Documentation** -- MergeTree engine, partitioning, performance tuning
- **OWASP Top 10 (2024)** -- aktualna lista najczestszych podatnosci webowych
- **Google Multi-Agent Research 2025** -- +80.9% improvement z wieloagentowym podejsciem w zadaniach rownoleglych
- **Hub-and-Spoke Architecture Patterns** -- analiza wzorcow komunikacji w systemach rozproszonych
- **Lean Software Development** (Poppendieck & Poppendieck) -- "decide as late as possible", minimize waste
- **IDC Report: AI Model Routing Strategies 2026** -- 70% enterprise adopcja model routingu do 2028

---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

```
Stworz 7-9 minutowa prezentacje wideo porownujaca dwa presety 8-agentowe
z architektury Gold Standard 2026: STANDARD DEV i DATA PIPELINE.
Prezentacja edukacyjna, wizualnie angazujaca, prowadzaca widza od
zrozumienia obu presetow do umiejetnosci wyboru wlasciwego.

STYL WIZUALNY:
- Kolor glowny: Blue #3B82F6 (standard dev) + Teal #14B8A6 (data pipeline)
- Tlo: ciemny grafit (#111827) z subtylna siatka izometryczna
- Akcentowy: bialy (#FFFFFF), sukces: zielony (#10B981), blad: czerwony (#EF4444)
- Motyw: dwa rownolegle pipeline'y -- tryby zebate (Standard Dev) i strumien danych (Data Pipeline)
- Efekty: plynne przejscia, split-screen porownania, animowane diagramy flow
- Font: nowoczesny sans-serif (Inter lub Geist), bold naglowki, czytelne tabele
- Kontrast: duzy tekst na ciemnym tle, minimum 4.5:1 ratio

STRUKTURA SLAJDOW:

1. HOOK (0:00-0:30)
   - Ekran: wielka liczba "8" z dual-glow (niebieski + teal)
   - Tekst: "Te same 8 agentow. Zupelnie inna misja."
   - Split-screen: po lewej tryby zebate (#3B82F6) animuja sie w panel admin,
     po prawej strumien danych (#14B8A6) animuje sie w pipeline ETL
   - Badge: "Tier 3 PRO | 8 Agentow | Gold Standard 2026"
   - Pytanie retoryczne: "Jak 3 rozne agenty zmieniaja WSZYSTKO?"
   - Muzyka: ambient buildup, napieciowy

2. TRZY ANALOGIE KAZDEGO PRESETU (0:30-2:00)
   - Split-screen ciagly: lewa strona niebieska, prawa tealowa
   - Animacja 1 (Standard Dev): firma budowlana -- inzynier, konsultanci,
     murarz, glazurnik, inspektor. Budynek rosnie etapami.
   - Animacja 1 (Data Pipeline): rafineria naftowa -- rury, destylatory,
     zbiorniki. Ropa wplywa, paliwo wyplywa.
   - Animacja 2 (SD): redakcja gazety -- dziennikarz, grafik, prawnik
   - Animacja 2 (DP): fabryka przetwarzania -- linia produkcyjna, mieszalnia
   - Animacja 3 (SD): ekipa filmowa -- kamera, montaz, inspekcja
   - Animacja 3 (DP): system wodociagowy -- filtracja, chlorowanie, dystrybucja
   - Kazda para analogii 30s z plynnym przejsciem

3. SKLAD ZESPOLOW -- POROWNANIE (2:00-3:15)
   - Animacja: 8 kart agentow pojawia sie jedna po drugiej
   - Lewa kolumna (#3B82F6): Standard Dev roster
     Orkiestrator(Opus) -> Analityk(Son) -> Planer(Son) ->
     R.Tech(Haiku) -> R.UX(Haiku) -> Backend(Son) -> Frontend(Son) -> QA Sec(Haiku)
   - Prawa kolumna (#14B8A6): Data Pipeline roster
     Orkiestrator(Opus) -> Analityk(Son) -> Planer(Son) ->
     R.Tech(Haiku) -> R.Docs(Haiku) -> Backend(Son) -> Feature(Son) -> Integrator(Son)
   - Highlightowanie ROZNIC: 3 karty migaja (R.UX vs R.Docs, Frontend vs Feature, QA vs Integrator)
   - Animacja ZOOM na kazda roznice z 5-sekundowym wyjasnieniem:
     "Researcher UX bada TRENDY UI. Researcher Docs zbiera DOKUMENTACJE."
     "Frontend Dev buduje INTERFEJS. Feature Dev buduje SPECJALISTYCZNE MODULY."
     "QA Security AUDYTUJE bezpieczenstwo. Integrator LACZY moduly."
   - Stat box: "5 wspolnych agentow, 3 unikalne = fundamentalnie inna misja"

4. ARCHITEKTURA -- DUAL DIAGRAM (3:15-4:15)
   - Animacja budowania diagramu krok po kroku
   - Lewa strona: Hierarchical Pipeline (Standard Dev)
     * Orkiestrator u gory (zloty wezel)
     * Strzalki w dol do Analityka i Planera
     * Dalej w dol do dwoch Researcherow (PARALLEL badge pulsuje)
     * Dalej do dwoch Builderow (PARALLEL badge)
     * Koncowy wezel: QA Security (czerwona tarcza)
   - Prawa strona: Data Engineering Pipeline (Data Pipeline)
     * Orkiestrator u gory (zloty wezel)
     * Strzalki w dol do Analityka i Planera
     * Analityk -> ResTech, Planer -> ResDocs (ROZNICA: routing!)
     * ResTech -> Backend, ResDocs -> Feature Dev
     * Oba -> Integrator (zielone ogniwo lancucha)
   - Podswietlenie: "Standard Dev: Orkiestrator kontroluje 4 agentow bezposrednio"
   - Podswietlenie: "Data Pipeline: routing przez warstwe planowania"
   - Animacja przeplywu danych: swietliste punkty plyna od gory do dolu obu diagramow

5. LIVE SCENARIO -- STANDARD DEV (4:15-5:30)
   - Tytul: "Scenariusz: REST API + Admin Panel"
   - Timer w rogu (counting up), koszt w drugim rogu
   - Krok 1: User request pojawia sie (typewriter effect)
   - Krok 2: Orkiestrator analizuje (pulsujacy wezel, "complexity: M")
   - Krok 3: Analityk + Planer produkuja dekompozycje (lista animowana)
   - Krok 4: PARALLEL badge -- Researcher Tech i UX pracuja jednoczesnie
     * R.Tech: "NestJS + Prisma + PostgreSQL" (confidence bar 88%)
     * R.UX: mood board (mini-screenshoty admin paneli)
   - Krok 5: PARALLEL badge -- Backend i Frontend buduja
     * Backend: kod API scrolluje sie (typewriter)
     * Frontend: komponenty React renderuja sie
   - Krok 6: QA Security skanuje -- "3 findings" (1 HIGH, 2 MEDIUM)
   - Krok 7: Orkiestrator: "CONDITIONAL PASS" -- fix rate limiting
   - Finalny ekran: "Koszt: $0.35 | Czas: 200s | Artefakt: API + Panel"
   - Timer zatrzymuje sie z satisfying "ding"

6. LIVE SCENARIO -- DATA PIPELINE (5:30-6:45)
   - Tytul: "Scenariusz: ETL z 3 zrodel -> Warehouse"
   - Timer + koszt (analogicznie)
   - Krok 1: 3 ikony zrodel danych: PostgreSQL, REST API, CSV
   - Krok 2: Orkiestrator: "data engineering task"
   - Krok 3: Analityk mapuje zrodla (tabela z wolumenami)
   - Krok 4: PARALLEL -- Researcher Tech bada narzedzia (dbt + ClickHouse)
     Researcher Docs zbiera konfiguracje
   - Krok 5: PARALLEL -- Backend buduje core ETL (stg -> int -> marts)
     Feature Dev buduje streaming + ML features + alerts
   - Krok 6: Integrator laczy moduly -- E2E test: "84997/85000 rows PASS"
   - Finalny ekran: "Koszt: $0.30 | Czas: 180s | Artefakt: ETL Pipeline"
   - Animacja: dane plyna przez pipeline jak swietliste cząsteczki

7. POROWNANIE I WYBOR (6:45-7:45)
   - Tabela porownawcza animowana wiersz po wierszu:
     Standard Dev vs Data Pipeline: sklad, koszt, use cases
   - Schemat decyzyjny (flowchart) z animowanymi strzalkami:
     "Dane/ETL? -> Data Pipeline"
     "Web/SaaS? -> Standard Dev"
     "Oba? -> Preset switching lub eskalacja"
   - Sygnalizacja swietlna: po 3 kolumny dla kazdego presetu
     ZIELONY (uzywaj) | ZOLTY (rozwaz) | CZERWONY (nie uzywaj)
   - Bar chart kosztow: SD vs DP vs inne presety (Feature Sprint, SaaS, FH)
   - Stat: "Razem pokrywaja ~80% zadan Tier 3"

8. ANTI-PATTERNY (7:45-8:15)
   - Galeria kart z czerwona ramka:
     * "Data Pipeline do web devu" -> Researcher Docs szuka UI trendow???
     * "Standard Dev do ETL" -> Frontend Dev buduje... batch processing???
     * "Feature Dev = drugi Backend Dev" -> 2x ten sam agent
     * "Pomijanie Integratora" -> broken data flow
   - Kazda karta: ZLE (czerwone) z animacja "X" -> DOBRZE (zielone) z checkmark

9. ESKALACJA I DEESKALACJA (8:15-8:45)
   - Animowana drabina presetow: Solo(2) -> Quick Fix(3) -> Recon(3) ->
     Plan_Exec(4) -> Startup(5) -> Feature Sprint(7) ->
     STANDARD DEV(8) / DATA PIPELINE(8) -> Legacy(9) -> SaaS(10) -> FH(13)
   - Podswietlenie SD i DP na 8 szczebelku
   - Strzalki eskalacji w gore ("+designer", "+QA", "+builder")
   - Strzalki deeskalacji w dol ("-frontend", "-researcher")

10. OUTRO (8:45-9:00)
    - Ekran: "8 agentow. 2 misje. 1 architektura."
    - Dual glow: niebieski tryb (SD) + tealowy strumien (DP)
    - Motto: "Nie uzywaj mlotka do srub. Nie uzywaj srubokretu do gwozdzi."
    - CTA: "Nastepny krok: Research Swarm (9 agentow) -- gdy potrzebujesz GLEBOKIEJ analizy"
    - Badge: "Gold Standard 2026 | Tier 3 PRO | Agent Architecture Designer"

MUZYKA I DZWIEK:
- Muzyka: electronic ambient, 100-120 BPM, budujaca napiecie w hookach
- Efekty dzwiekowe: "whoosh" przy przejsciach, "click" przy pojawieniu sie kart,
  "ding" przy PASS, "buzz" przy anti-patternach
- Narastajaca intensywnosc w scenariuszach live (4:15-6:45)
- Spokojna, podsumowujaca w outro
- Dual-tone: glebszy bas przy Data Pipeline, wyzszy ton przy Standard Dev

NARRATOR:
- Glos: profesjonalny, pewny, srednie tempo
- Pauzy: 1-2s przy kluczowych liczbach i INSIGHT-ach
- Emphasis: na roznicach miedzy presetami (3 unikalne agenty)
- Ton: edukacyjny, ale nie akademicki -- jak doswiadczony mentor
- Jezyk: polski, bez diacritykow w overlayach

ANIMACJE:
- Przejscia: smooth slide (lewo-prawo dla split-screen)
- Diagramy: budowane krok po kroku (node -> edge -> label)
- Dane: swietliste punkty plynace przez polaczenia
- Karty agentow: bounce-in z lekkim spring effect
- Tabele: wiersz po wierszu z fade-in
- Split-screen: cienka linia (#374151) dzielaca ekran na pol
- PARALLEL badge: pulsujacy z glow effect (#3B82F6 lub #14B8A6)
```

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Stworz pionowa infografike (1080x3500px) porownujaca dwa presety 8-agentowe
z architektury Gold Standard 2026: STANDARD DEV i DATA PIPELINE.
Infografika powinna byc czytelna, logicznie zorganizowana, wizualnie
atrakcyjna i funkcjonalna jako samodzielny material edukacyjny.

STYL WIZUALNY:
- Tlo: bardzo ciemny grafit (#0F172A) z subtylna siatka izometryczna (opacity 5%)
- Kolor Standard Dev: Blue #3B82F6 z subtle glow (box-shadow 0 0 20px rgba(59,130,246,0.3))
- Kolor Data Pipeline: Teal #14B8A6 z subtle glow (box-shadow 0 0 20px rgba(20,184,166,0.3))
- Kolor wspolny: Purple #8B5CF6 dla elementow obecnych w obu presetach
- Tekst: bialy (#F8FAFC) dla naglowkow, jasny szary (#CBD5E1) dla body
- Akcent sukces: zielony (#10B981)
- Akcent blad: czerwony (#EF4444)
- Akcent ostrzezenie: zolty (#EAB308)
- Font: sans-serif (Inter lub Geist), H1 40px bold, H2 28px semibold,
  H3 20px medium, body 14px regular, caption 11px
- Zaokraglenia: 12px na kartach, 8px na badge'ach
- Separatory: cienka linia gradient (blue -> teal, opacity 30%)
- Ikony: outline style, 24px, monochromatyczne z akcentem kolorystycznym
- Cienie: brak (flat design), tylko glow na kluczowych elementach

SEKCJA 1: NAGLOWEK (1080x300px)
- Tytul: "STANDARD DEV & DATA PIPELINE" w duzym boldnym foncie
  "STANDARD DEV" w #3B82F6, "&" w #8B5CF6, "DATA PIPELINE" w #14B8A6
- Podtytul: "Dwa Filary Tier 3 PRO -- Przewodnik Porownawczy"
  w jasnym szarym (#CBD5E1), 20px
- Ikony: tryb zebaty (lewo, #3B82F6) i wykres (prawo, #14B8A6)
  polaczone subtylna linia przerywana (#8B5CF6)
- Rzad badge'ow (tlo #1E293B, border odpowiedni kolor):
  "Tier 3 PRO" | "8 Agentow" | "Gold Standard 2026" |
  "$0.20-0.65" | "~150-300s"
- Dekoracja: subtylny gradient radialny z centru (blue->teal blend, opacity 8%)

SEKCJA 2: DUAL ROSTER -- KARTY AGENTOW (1080x550px)
- Tytul sekcji: "SKLAD ZESPOLOW" z numerem "01 //"
- Dwie kolumny (480px kazda, 20px gap, 50px margines)
- Lewa kolumna: naglowek "STANDARD DEV" w #3B82F6
  8 mini-kart (tlo #1E293B, border-left 3px #3B82F6):
  * Orkiestrator | Opus | Load 50 | STRATEGIA [fioletowy -- wspolny]
  * Analityk | Sonnet | Load 55 | PLANOWANIE [fioletowy -- wspolny]
  * Planer | Sonnet | Load 40 | PLANOWANIE [fioletowy -- wspolny]
  * Researcher Tech | Haiku | Load 55 | RESEARCH [fioletowy -- wspolny]
  * Researcher UX | Haiku | Load 50 | RESEARCH [NIEBIESKI -- unikalny!]
  * Backend Dev | Sonnet | Load 75 | BUILD [fioletowy -- wspolny]
  * Frontend Dev | Sonnet | Load 70 | BUILD [NIEBIESKI -- unikalny!]
  * QA Security | Haiku | Load 50 | QA [NIEBIESKI -- unikalny!]
- Prawa kolumna: naglowek "DATA PIPELINE" w #14B8A6
  8 mini-kart (tlo #1E293B, border-left 3px #14B8A6):
  * Orkiestrator | Opus | Load 50 | STRATEGIA [fioletowy]
  * Analityk | Sonnet | Load 55 | PLANOWANIE [fioletowy]
  * Planer | Sonnet | Load 40 | PLANOWANIE [fioletowy]
  * Researcher Tech | Haiku | Load 55 | RESEARCH [fioletowy]
  * Researcher Docs | Haiku | Load 40 | RESEARCH [TEAL -- unikalny!]
  * Backend Dev | Sonnet | Load 75 | BUILD [fioletowy]
  * Feature Dev | Sonnet | Load 65 | BUILD [TEAL -- unikalny!]
  * Integrator | Sonnet | Load 70 | INTEGRACJA [TEAL -- unikalny!]
- Linie laczace wspolnych agentow (fioletowe przerywane miedzy kolumnami)
- Strzalki laczace unikalne agenty z etykietami:
  "R.UX <-> R.Docs" | "Frontend <-> Feature" | "QA Sec <-> Integrator"

SEKCJA 3: DUAL ARCHITECTURE DIAGRAM (1080x450px)
- Tytul: "ARCHITEKTURA" z numerem "02 //"
- Dwa diagramy obok siebie (uproszczone, z kolorowymi wezlami):
- Lewy diagram (Standard Dev, #3B82F6):
  Orkiestrator(zloty) -> Analityk+Planer -> R.Tech+R.UX(PARALLEL) ->
  Backend+Frontend(PARALLEL) -> QA Security
  Strzalki: swietliste niebieskie linie
- Prawy diagram (Data Pipeline, #14B8A6):
  Orkiestrator(zloty) -> Analityk+Planer ->
  Analityk->R.Tech + Planer->R.Docs(PARALLEL) ->
  Backend+Feature(PARALLEL) -> Integrator
  Strzalki: swietliste tealowe linie
- Podpis: "SD: 4 polaczenia z Orkiestratora | DP: 2 polaczenia, routing przez planowanie"
- Badge PARALLEL na obu diagramach przy rownolegych parach

SEKCJA 4: TABELA POROWNAWCZA (1080x400px)
- Tytul: "POROWNANIE" z numerem "03 //"
- Tabela 12 wierszy x 3 kolumny (Aspekt | Standard Dev | Data Pipeline)
- Naprzemienne tlo wierszy (#1E293B i #0F172A)
- Naglowki kolumn: szary | #3B82F6 | #14B8A6
- Wiersze: Sklad, Wzorzec, Tokeny, Koszt, Latencja, Modele,
  Frontend, UX Research, Security, Docs Research, Feature Dev, Integrator
- Checkmarki w zielonym, X-y w czerwonym
- Podswietlenie 3 kluczowych roznic (border #EAB308)

SEKCJA 5: SYGNALIZACJA SWIETLNA (1080x350px)
- Tytul: "KIEDY UZYWAC" z numerem "04 //"
- Dwa panele (lewa SD #3B82F6, prawa DP #14B8A6)
- Kazdy panel: 3 kolumny (ZIELONY | ZOLTY | CZERWONY)
- Po 5-6 bulletow w kazdej kolumnie
- Ikony: checkmark (zielony), pytajnik (zolty), X (czerwony)
- Rozdzielczosc: wyrazisty tekst 12-13px, czytelny na mobile

SEKCJA 6: SCHEMAT DECYZYJNY (1080x350px)
- Tytul: "FLOWCHART WYBORU" z numerem "05 //"
- Centralny flowchart z wezlami decyzyjnymi:
  START -> "Dane/ETL?" [TAK -> Data Pipeline] [NIE -> dalej]
  -> "Backend + Frontend?" [TAK -> Standard Dev] [NIE -> dalej]
  -> "Tylko backend?" -> "Plan_Exec (4)"
  -> "Tylko research?" -> "Research Swarm (9)"
- Wezly: zaokraglone prostokaty z odpowiednim kolorem
- Strzalki: z label TAK/NIE
- Finalny wezel kazdego presetu z ikona i kolorem

SEKCJA 7: DUAL SCENARIO (1080x400px)
- Tytul: "SCENARIUSZE" z numerem "06 //"
- Dwa panele (mini-komiks):
- Lewy (SD): "REST API + Admin Panel"
  4 panele: Request -> Research(PARALLEL) -> Build(PARALLEL) -> QA Security
  Etykieta: "$0.35 | 200s | API + Panel"
- Prawy (DP): "ETL: 3 zrodla -> Warehouse"
  4 panele: 3 Sources -> Research(PARALLEL) -> Build(PARALLEL) -> Integrator
  Etykieta: "$0.30 | 180s | ETL Pipeline"

SEKCJA 8: ANTI-PATTERNY (1080x300px)
- Tytul: "ANTY-WZORCE" z numerem "07 //"
- Siatka 2x3 z kartami (tlo #1E293B, border czerwony):
  * "Data Pipeline do web devu" -- Researcher Docs szuka UI???
  * "Standard Dev do ETL" -- Frontend Dev buduje batch???
  * "Feature Dev = drugi Backend" -- duplikacja roli
  * "Pomijanie Integratora" -- broken data flow
  * "8 agentow na 1-plikowy fix" -- uzyj Solo
  * "Brak eskalacji przy >10 modulach" -- uzyj Tier 4
- Kazda karta: ikona X w czerwonym kregu + krotki opis

SEKCJA 9: ESKALACJA / DEESKALACJA (1080x250px)
- Tytul: "KIEDY ESKALOWAC" z numerem "08 //"
- Pozioma os: presety od Solo(2) do Deep(18)
- SD i DP podswietlone na pozycji "8"
- Strzalki w gore (eskalacja do SaaS 10, FH 13) z etykietami
- Strzalki w dol (deeskalacja do Feature Sprint 7, Recon 3)
- Kolor osi: gradient blue -> teal

SEKCJA 10: QUICK REFERENCE (1080x250px)
- Tytul: "QUICK REFERENCE" z numerem "09 //"
- Dwie kompaktowe karty obok siebie (tlo #111827, zaokraglone 12px):
- Lewa karta (border #3B82F6):
  STANDARD DEV | Tier 3 | 8 agentow | ~250-400K | $0.25-0.65 | ~180-300s
  Modele: 1xOpus, 4xSonnet, 3xHaiku | Wzorzec: Hierarchical Pipeline
- Prawa karta (border #14B8A6):
  DATA PIPELINE | Tier 3 | 8 agentow | ~200-350K | $0.20-0.55 | ~150-250s
  Modele: 1xOpus, 5xSonnet, 2xHaiku | Wzorzec: Data Engineering

SEKCJA 11: STOPKA (1080x100px)
- Tekst centrowany: "Gold Standard 2026 | Tier 3 PRO | Standard Dev & Data Pipeline"
- Podtekst: "Agent Architecture Designer | Kwiecien 2026"
- Subtylna linia gradient (blue -> purple -> teal) jako gorny border

DEKORACJE GLOBALNE:
- Siatka izometryczna na tle (opacity 3-5%, linie #334155)
- Subtylne gradient blobs w rogach (blue top-left, teal bottom-right, opacity 5%)
- Numeracja sekcji: "01 //", "02 //", etc. w jasnym szarym, maly font
- Separatory miedzy sekcjami: gradient line (blue -> teal, 1px, opacity 30%)
- Brak emoji w finalnym renderze -- zastapione minimalistycznymi ikonami outline
- Spacja miedzy sekcjami: 30-40px
- Marginesy boczne: 40-50px
- Typografia: bold dla kluczowych danych, regular dla opisow
```

---

*Dokument opracowany na podstawie Gold Standard Agent Architecture 2026, MASTERCLASS Agent Teams, AGENT_TEAMS_CONFIGURATOR v9/v12, oficjalnych cen Anthropic 2026 oraz analiz wieloagentowych systemow. Dane kosztowe i tokenowe aktualne na kwiecien 2026.*
*Presety: Standard Dev (#standard) i Data Pipeline (#data_pipe) | Tier: 3 PRO | Wzorce: Hierarchical Pipeline / Data Engineering Pipeline*
