# UI/UX OVERHAUL & FEATURE SPRINT -- Presety 7-Agentowe

## Kompletny Przewodnik | Tier 3 PRO | Gold Standard 2026

**Seria:** Architektura Agentow AI -- Presety i Konfiguracje
**Preset IDs:** `ui_overhaul` | `feature_sprint`
**Tier:** 3 (PRO)
**Liczba agentow:** 7 (kazdy preset)
**Wzorce:** UI Redesign Pipeline | Sprint Pipeline
**Koszt tokenowy:** ~180-300K (oba presety)
**Koszt dolarowy:** $0.15-0.48
**Latencja:** ~180-420 sekund
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Dwa oblicza tej samej mocy

Wyobraz sobie dwa scenariusze z zycia firmy technologicznej.

**Scenariusz A:** Twoja aplikacja ma 5 lat. Interfejs wyglada jak z ery Material Design 1.0. Konkurencja ma glassmorphism, mikro-animacje, dark mode. Uzytkownicy narzekaja na "przestarzaly wyglad". Musisz zrobic pelny redesign -- od researchu trendow, przez projekt wizualny, po implementacje frontendu. To jest moment na **UI/UX Overhaul**.

**Scenariusz B:** Twoja aplikacja potrzebuje nowej funkcji -- eksport raportow do PDF z generowaniem AI. Trzeba zbadac technologie, zrozumiec oczekiwania uzytkownikow, zbudowac backend, frontend, przetestowac. To jest moment na **Feature Sprint**.

Oba presety uzywaja **7 agentow**. Oba naleza do **Tier 3 PRO**. Oba korzystaja z dwoch rownoleglych sciezek badawczych. Ale ich architektura jest fundamentalnie rozna -- i ta roznica decyduje o sukcesie lub porazce zadania.

### Analogia 1: Remont mieszkania vs budowa nowego pokoju

**UI/UX Overhaul** to generalny remont mieszkania. Nie budujesz nowego pokoju -- zmieniasz wyglad ISTNIEJACYCH pokojow. Konsultant wnetrzarski (Researcher UX) przynosi inspiracje z Pinterestu i magazynow. Rzeczoznawca budowlany (Researcher Docs) sprawdza, czy sciany sa nosne, gdzie biegna przewody, co wolno zburzyc. Na podstawie ich raportow analityk (Analyst) planuje remont. Potem architekt wnetrz (Designer) projektuje nowy wyglad, a ekipa remontowa (Frontend Dev) realizuje projekt. Na koncu inspektor (QA Quality) sprawdza, czy wszystko jest proste, ladne i bezpieczne.

**Feature Sprint** to budowa nowego pokoju. Inzynier budowlany (Researcher Tech) sprawdza mozliwosci konstrukcyjne. Konsultant UX (Researcher UX) pyta mieszkancow czego potrzebuja. Analityk (Analyst) planuje budowe. Hydraulik/elektryk (Backend Dev) ciagna rury i kable. Wykonawca wykanczajacy (Frontend Dev) kladzie plytki i maluje. Inspektor (QA Quality) odbiera prace.

Remont zmienia wyglad. Budowa dodaje funkcje. Oba wymagaja planowania, specjalistow i kontroli -- ale sciezki pracy sa ROZNE.

### Analogia 2: Chirurgia plastyczna vs przeszczep narządu

**UI/UX Overhaul** to chirurgia plastyczna -- zmieniasz wyglad, ale organy wewnetrzne (backend) zostaja nienaruszone. Jeden chirurg (Designer) modeluje nowy wyglad, drugi (Frontend) szyje. Konsultanci (Researcher UX + Researcher Docs) przygotowuja plan na podstawie aktualnych standardow piekna i historii medycznej pacjenta. Anestezjolog (Analyst) koordynuje.

**Feature Sprint** to przeszczep nowego narzadu -- dodajesz cos, czego wczesniej nie bylo. Jeden chirurg (Backend Dev) podlacza nowy organ do ciala, drugi (Frontend Dev) zamyka i upieksza. Konsultanci (Researcher Tech + Researcher UX) przygotowuja kompatybilnosc. Anestezjolog (Analyst) koordynuje. QA Quality sprawdza, czy organizm nie odrzuca przeszczepu.

### Analogia 3: Rebranding firmy vs lansowanie nowego produktu

**UI/UX Overhaul** to jak rebranding Burger Kinga -- nowe logo, nowy wystroj restauracji, nowe opakowania. Wszystko wyglada inaczej, ale menu (backend) w zasadzie to samo. Agencja brandingowa (Researcher UX + Designer) tworzy nowa identyfikacje, dokumentalista (Researcher Docs) sprawdza wytyczne marki, analityk (Analyst) planuje wdrozenie, ekipa wykonawcza (Frontend) montuje nowe elementy, kontroler jakosci (QA) zatwierdza.

**Feature Sprint** to jak lansowanie McFlurry w McDonald's -- nowy produkt, nowa receptura (Backend), nowy design kubka (Frontend), badanie rynku (Researcher UX + Tech), analiza wykonalnosci (Analyst), testy smaku (QA Quality).

> **Czy wiesz, ze...?**
> Oba presety uzywaja dokladnie **7 agentow**, ale ich uklad jest inny. UI/UX Overhaul
> ma DWOCH researcherow na wejsciu (rownolegle) i DWOCH builderow (Designer + Frontend,
> sekwencyjne). Feature Sprint ma analityke na wejsciu, potem DWOCH researcherow
> (rownolegle) i DWOCH builderow (Backend + Frontend, rownolegle). Ta roznica w
> sekwencji determinuje, do jakiego typu zadan kazdy preset pasuje.

> **Uwaga!**
> UI/UX Overhaul **NIE** zmienia logiki biznesowej. Jesli potrzebujesz nowego endpointu
> API albo nowej tabeli w bazie danych -- to juz Feature Sprint lub wiekszy preset.
> Overhaul to WYLACZNIE warstwa prezentacji: CSS, komponenty, layout, animacje.
> Feature Sprint natomiast **NIE** jest do redesignu calej aplikacji -- to dodanie
> JEDNEJ nowej funkcji z backendem i frontendem.

---

## 2. Sklad zespolu -- Preset #1: UI/UX Overhaul

UI/UX Overhaul to **7 agentow** w konfiguracji UI Redesign Pipeline. Dwa zrodla badawcze (UX + Docs) zasilaja analityke, ktora przekazuje plan do dwoch builderow designowych (Designer + Frontend), z finalnym audytem QA.

### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Rola** | STRATEGIA -- koordynacja, delegacja, walidacja |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50/100 |
| **Warstwa** | ORKIESTRACJA (Level 0) |
| **Narzedzia** | Agent (delegacja), Read, Grep, Glob |
| **Tokeny/sesja** | ~20-35K |
| **Koszt/sesja** | ~$0.03-0.07 |

W UI/UX Overhaul Orkiestrator pelni role **dyrektora kreatywnego projektu redesignu**:
1. Analizuje scope redesignu -- ile ekranow? Jakie komponenty? Pelny rebranding czy refresh?
2. Deleguje ROWNOLEGLE do Researcher UX i Researcher Docs
3. Przekazuje oba raporty do Analysta
4. Kieruje plan Analysta do Designera, a output Designera do Frontendu
5. Na koncu waliduje raport QA Quality -- PASS lub iteracja

### Agent R-02: Researcher UX

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- trendy wizualne, inspiracje, dostepnosc |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | RESEARCH (Level 1) |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Tokeny/sesja** | ~20-30K |
| **Koszt/sesja** | ~$0.02-0.04 |

W kontekscie Overhaul, Researcher UX to **kurator trendow wizualnych**:
- Przeszukuje Dribbble, Behance, Awwwards, Mobbin w poszukiwaniu aktualnych trendow
- Buduje mood board: palety, typografia, spacing, animacje, mikro-interakcje
- Audytuje dostepnosc: kontrast WCAG 2.2, focus states, screen reader compatibility
- Produkuje raport "UX Findings" z minimum 5 referencjami wizualnymi

### Agent R-03: Researcher Docs

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- dokumentacja, API, istniejacy codebase |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | RESEARCH (Level 1) |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Tokeny/sesja** | ~20-30K |
| **Koszt/sesja** | ~$0.02-0.04 |

Researcher Docs to **archeologista istniejacego systemu**:
- Analizuje istniejaca dokumentacje designu (design system, component library)
- Sprawdza zaleznosci komponentow -- co jest globalnie uzywane, co lokalne
- Mapuje istniejace CSS/style -- zmienne, breakpointy, theming
- Identyfikuje ograniczenia: browser support, framework constraints, legacy dependencies
- Produkuje raport "Docs Findings" z mapa obecnego stanu i ograniczen

### Agent C-01: Analyst

| Parametr | Wartosc |
|----------|---------|
| **Rola** | ANALIZA -- synteza, planowanie, priorytetyzacja |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 65/100 |
| **Warstwa** | ANALIZA (Level 2) |
| **Narzedzia** | Read, Write, Grep, Glob |
| **Tokeny/sesja** | ~25-40K |
| **Koszt/sesja** | ~$0.03-0.06 |

Analyst to **strateg redesignu**:
- Otrzymuje dwa raporty: UX Findings + Docs Findings
- Syntetyzuje: "Trend mowi glassmorphism, ale istniejacy system nie ma backdrop-filter support"
- Tworzy plan redesignu z priorytetami: co zmienic, w jakiej kolejnosci, jakie ryzyka
- Definiuje design tokeny do zmiany: kolory, fonty, spacing, border-radius, shadows
- Produkuje "Redesign Plan" -- konkretna instrukcje dla Designera

### Agent B-02: Designer

| Parametr | Wartosc |
|----------|---------|
| **Rola** | BUILD -- implementacja wizualna, design system, CSS |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Warstwa** | BUILD (Level 3) |
| **Narzedzia** | Write, Edit, Read, Grep, Glob |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.04-0.08 |

Designer to **implementator wizualny**:
- Otrzymuje Redesign Plan od Analysta
- Implementuje design tokeny: CSS custom properties, palette, typography scale
- Tworzy nowe style komponentow: buttons, cards, forms, navbars, modals
- Definiuje animacje i przejscia: hover states, transitions, loading states
- Produkuje "Design Artifacts" -- pliki CSS/SCSS, design tokens JSON, component styles

### Agent B-03: Frontend Dev

| Parametr | Wartosc |
|----------|---------|
| **Rola** | BUILD -- implementacja komponentow, integracja |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Warstwa** | BUILD (Level 3) |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.04-0.08 |

Frontend Dev to **wykonawca implementacji**:
- Otrzymuje Design Artifacts od Designera
- Integruje nowe style z istniejacymi komponentami React/Vue/Svelte
- Aktualizuje HTML/JSX -- nowe klasy, nowe struktury DOM
- Uruchamia testy wizualne: responsywnosc, cross-browser, snapshot testy
- Produkuje "Implemented Components" -- dzialajacy frontend z nowymi stylami

### Agent Q-02: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Rola** | QA/AUDYT -- weryfikacja jakosci i zgodnosci |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT (Level 4) |
| **Narzedzia** | Read, Grep, Bash, Glob |
| **Tokeny/sesja** | ~20-30K |
| **Koszt/sesja** | ~$0.02-0.04 |

QA Quality to **inspektor odbioru redesignu**:
- Sprawdza zgodnosc implementacji z Redesign Plan
- Weryfikuje dostepnosc: kontrast, aria-labels, focus management
- Testuje responsywnosc: mobile, tablet, desktop breakpointy
- Sprawdza performance: czy nowe style nie spowalniaja renderowania
- Produkuje raport PASS/FAIL z konkretnym feedbackiem

### Diagram architektury -- UI/UX Overhaul

```
+====================================================================+
|            PRESET: UI/UX OVERHAUL (7 agentow)                       |
|            Tier 3 PRO | UI Redesign Pipeline                        |
+====================================================================+
|                                                                      |
|                    +-------------------+                              |
|                    |   ORKIESTRATOR    |                              |
|                    |  A-00 | Opus      |                              |
|                    |  Load 50 | STRAT  |                              |
|                    +----+--------+----+                               |
|                         |        |                                    |
|            [one]        |        |        [one]                       |
|       scope redesignu   |        |   scope dokumentacji               |
|                         v        v                                    |
|            +---------------+  +---------------+                      |
|            | RESEARCHER UX |  | RESEARCHER    |                      |
|            | R-02 | Haiku  |  | DOCS          |                      |
|            | Load 55       |  | R-03 | Haiku  |                      |
|            | RESEARCH      |  | Load 55       |                      |
|            +-------+-------+  | RESEARCH      |                      |
|                    |          +-------+-------+                       |
|                    |                  |                                |
|          UX Findings        Docs Findings                             |
|                    |                  |                                |
|                    v                  v                                |
|                  +--------------------+                               |
|                  |     ANALYST        |                               |
|                  |  C-01 | Sonnet    |                               |
|                  |  Load 65 | ANALIZA|                               |
|                  +--------+----------+                                |
|                           |                                           |
|                  Redesign Plan                                        |
|                           |                                           |
|                           v                                           |
|                  +-------------------+                                |
|                  |    DESIGNER       |                                |
|                  |  B-02 | Sonnet   |                                |
|                  |  Load 75 | BUILD |                                |
|                  +--------+----------+                                |
|                           |                                           |
|                  Design Artifacts                                     |
|                           |                                           |
|                           v                                           |
|                  +-------------------+                                |
|                  |   FRONTEND DEV    |                                |
|                  |  B-03 | Sonnet   |                                |
|                  |  Load 75 | BUILD |                                |
|                  +--------+----------+                                |
|                           |                                           |
|                  Implemented Components                               |
|                           |                                           |
|                           v                                           |
|                  +-------------------+                                |
|                  |   QA QUALITY      |                                |
|                  |  Q-02 | Haiku    |                                |
|                  |  Load 55 | QA    |                                |
|                  +-------------------+                                |
|                           |                                           |
|                     PASS / FAIL                                       |
|                           |                                           |
|                           v                                           |
|                    ORKIESTRATOR                                       |
|                   (dostarcza wynik)                                   |
|                                                                      |
+====================================================================+

  LEGENDA POLACZEN:
  Orkiestrator → R-UX:     [one]  scope UX
  Orkiestrator → R-Docs:   [one]  scope dokumentacji
  R-UX → Analyst:          [one]  UX Findings
  R-Docs → Analyst:        [one]  Docs Findings
  Analyst → Designer:      [one]  Redesign Plan
  Designer → Frontend:     [one]  Design Artifacts
  Frontend → QA Quality:   [one]  Implemented Components
  QA Quality → Orkiestr.:  [one]  Raport PASS/FAIL
```

**Kluczowa cecha:** Designer i Frontend sa **sekwencyjni** -- Frontend nie moze zaczac, dopoki Designer nie skonczy. To dlatego, ze Frontend integruje gotowe style, a nie tworzy je od zera. Ta sekwencyjnosc dodaje ~60s do latencji, ale gwarantuje spojnosc wizualna.

---

## 3. Sklad zespolu -- Preset #2: Feature Sprint

Feature Sprint to **7 agentow** w konfiguracji Sprint Pipeline. Analyst na wejsciu planuje, dwoch researcherow (Tech + UX) rownolegle bada, dwoch builderow (Backend + Frontend) rownolegle buduja, QA zamyka.

### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Rola** | STRATEGIA -- koordynacja, delegacja, walidacja |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50/100 |
| **Warstwa** | ORKIESTRACJA (Level 0) |
| **Narzedzia** | Agent (delegacja), Read, Grep, Glob |
| **Tokeny/sesja** | ~20-35K |
| **Koszt/sesja** | ~$0.03-0.07 |

W Feature Sprint Orkiestrator pelni role **scrum mastera sprintu**:
1. Analizuje scope nowej funkcji -- feature flag? A/B test? Integracja z API?
2. Deleguje do Analysta jako pierwszy krok (planowanie PRZED researchem)
3. Rozsyla plan Analysta do Researcher Tech i Researcher UX rownolegle
4. Przekazuje findings do Backend Dev i Frontend Dev rownolegle
5. Waliduje raport QA Quality -- PASS, iteracja, lub eskalacja

### Agent C-01: Analyst

| Parametr | Wartosc |
|----------|---------|
| **Rola** | ANALIZA -- dekompozycja, scope definition, risk mapping |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 65/100 |
| **Warstwa** | ANALIZA (Level 2) |
| **Narzedzia** | Read, Write, Grep, Glob |
| **Tokeny/sesja** | ~25-40K |
| **Koszt/sesja** | ~$0.03-0.06 |

W Feature Sprint, Analyst to **architekt nowej funkcji**:
- Otrzymuje user story lub feature request od Orkiestratora
- Dekomponuje na: backend tasks, frontend tasks, research questions
- Definiuje contract API miedzy Backend a Frontend (interfejs)
- Identyfikuje ryzyka: zewnetrzne API, performance, security, UX
- Produkuje "Feature Plan" z konkretnymi pytaniami dla kazdego Researchera

### Agent R-01: Researcher Tech

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- technologie, biblioteki, API, benchmarki |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | RESEARCH (Level 1) |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Tokeny/sesja** | ~20-30K |
| **Koszt/sesja** | ~$0.02-0.04 |

Researcher Tech to **inzynier rozwiazujacy zagadke technologiczna**:
- Bada biblioteki i API potrzebne do nowej funkcji (np. jsPDF vs Puppeteer vs React-PDF)
- Porownuje minimum 3 opcje z pros/cons, benchmarkami, kompatybilnoscia
- Sprawdza rate limits, pricing, SLA zewnetrznych API
- Produkuje "Tech Findings" z rekomendacja TOP 3 i confidence score

### Agent R-02: Researcher UX

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- UX patterns, user expectations, accessibility |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | RESEARCH (Level 1) |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Tokeny/sesja** | ~20-30K |
| **Koszt/sesja** | ~$0.02-0.04 |

W Feature Sprint, Researcher UX pyta **"jak uzytkownicy OCZEKUJA ze ta funkcja bedzie dzialac?"**:
- Bada jak analogiczne funkcje wygladaja w konkurencyjnych produktach
- Analizuje UX patterns: wizardy, stepper forms, progress indicators, empty states
- Sprawdza dostepnosc nowej funkcji: keyboard navigation, screen reader
- Produkuje "UX Findings" z wzorcami interakcji i referencjami wizualnymi

### Agent B-01: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Rola** | BUILD -- logika biznesowa, API, baza danych |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Warstwa** | BUILD (Level 3) |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.04-0.08 |

Backend Dev to **inzynier zaplecza nowej funkcji**:
- Implementuje logike biznesowa: nowe endpointy, serwisy, modele danych
- Buduje integracje z zewnetrznymi API (na bazie Tech Findings)
- Implementuje feature flag / A/B test framework
- Pisze testy jednostkowe i integracyjne
- Produkuje "Backend Artifacts" -- dzialajace API z testami

### Agent B-03: Frontend Dev

| Parametr | Wartosc |
|----------|---------|
| **Rola** | BUILD -- interfejs uzytkownika, komponenty |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Warstwa** | BUILD (Level 3) |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.04-0.08 |

Frontend Dev to **budowniczy interfejsu nowej funkcji**:
- Implementuje komponenty UI na bazie UX Findings
- Integruje z Backend API (na bazie contract API z Feature Plan)
- Obsluguje loading states, error states, empty states
- Implementuje responsywnosc i animacje
- Produkuje "Frontend Artifacts" -- dzialajace komponenty z testami

### Agent Q-02: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Rola** | QA/AUDYT -- weryfikacja end-to-end |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Warstwa** | QA/AUDYT (Level 4) |
| **Narzedzia** | Read, Grep, Bash, Glob |
| **Tokeny/sesja** | ~20-30K |
| **Koszt/sesja** | ~$0.02-0.04 |

QA Quality w Feature Sprint to **tester calosciowy nowej funkcji**:
- Testuje cala sciezke: frontend → API → logika → baza → odpowiedz → UI
- Sprawdza edge cases: brak danych, timeout, concurrent access
- Weryfikuje feature flag: czy wylaczenie flagi nie psuje reszty aplikacji
- Testuje A/B variants jesli istnieja
- Produkuje raport PASS/FAIL z konkretnym feedbackiem

### Diagram architektury -- Feature Sprint

```
+====================================================================+
|            PRESET: FEATURE SPRINT (7 agentow)                       |
|            Tier 3 PRO | Sprint Pipeline                              |
+====================================================================+
|                                                                      |
|                    +-------------------+                              |
|                    |   ORKIESTRATOR    |                              |
|                    |  A-00 | Opus      |                              |
|                    |  Load 50 | STRAT  |                              |
|                    +--------+----------+                              |
|                             |                                        |
|                    [one] feature request                              |
|                             |                                        |
|                             v                                        |
|                    +-------------------+                              |
|                    |     ANALYST       |                              |
|                    |  C-01 | Sonnet   |                              |
|                    |  Load 65 | ANALIZ|                              |
|                    +----+--------+----+                               |
|                         |        |                                    |
|            [one]        |        |        [one]                       |
|       pytania tech      |        |   pytania UX                      |
|                         v        v                                    |
|            +---------------+  +---------------+                      |
|            | RESEARCHER    |  | RESEARCHER UX |                      |
|            | TECH          |  | R-02 | Haiku  |                      |
|            | R-01 | Haiku  |  | Load 55       |                      |
|            | Load 55       |  | RESEARCH      |                      |
|            | RESEARCH      |  +-------+-------+                      |
|            +-------+-------+          |                               |
|                    |                  |                                |
|           Tech Findings         UX Findings                           |
|                    |                  |                                |
|                    v                  v                                |
|            +---------------+  +---------------+                      |
|            | BACKEND DEV   |  | FRONTEND DEV  |                      |
|            | B-01 | Sonnet |  | B-03 | Sonnet |                      |
|            | Load 75       |  | Load 75       |                      |
|            | BUILD         |  | BUILD         |                      |
|            +-------+-------+  +-------+-------+                      |
|                    |                  |                                |
|         Backend Artifacts     Frontend Artifacts                      |
|                    |                  |                                |
|                    +--------+---------+                               |
|                             |                                        |
|                             v                                        |
|                    +-------------------+                              |
|                    |   QA QUALITY      |                              |
|                    |  Q-02 | Haiku    |                              |
|                    |  Load 55 | QA    |                              |
|                    +-------------------+                              |
|                             |                                        |
|                       PASS / FAIL                                    |
|                             |                                        |
|                             v                                        |
|                      ORKIESTRATOR                                    |
|                     (dostarcza wynik)                                |
|                                                                      |
+====================================================================+

  LEGENDA POLACZEN:
  Orkiestrator → Analyst:    [one]  feature request + kontekst
  Analyst → R-Tech:          [one]  pytania techniczne
  Analyst → R-UX:            [one]  pytania UX
  R-Tech → Backend:          [one]  Tech Findings
  R-UX → Frontend:           [one]  UX Findings
  Backend → QA Quality:      [one]  Backend Artifacts
  Frontend → QA Quality:     [one]  Frontend Artifacts
  QA Quality → Orkiestr.:    [one]  Raport PASS/FAIL
```

**Kluczowa cecha:** Backend i Frontend pracuja **ROWNOLEGLE** -- bo Analyst zdefiniowal contract API z gory. To oszczedza ~60-120s latencji. W UI/UX Overhaul Designer i Frontend sa sekwencyjni -- bo Frontend potrzebuje gotowych designow.

---

## 4. Wzorce architektoniczne

### 4.1 UI Redesign Pipeline (UI/UX Overhaul)

UI Redesign Pipeline to wzorzec **sekwencyjno-rownoleglej transformacji wizualnej**. Ma dwa etapy rownoleglosci (research) i dwa etapy sekwencyjne (design → build), zakonczone audytem.

**Fazy:**

```
FAZA 1: ROWNOLEGLY RESEARCH         FAZA 2: ANALIZA
+------------------+                 +------------------+
| Researcher UX    |---+             |    Analyst       |
| (trendy, mood    |   |--[merge]-->| (synteza,        |
| board, WCAG)     |   |             |  priorytetyzacja,|
+------------------+   |             |  plan redesignu) |
+------------------+   |             +------------------+
| Researcher Docs  |---+                     |
| (component map,  |                         v
| CSS audit,       |              FAZA 3: SEKWENCYJNY BUILD
| constraints)     |              +------------------+
+------------------+              |    Designer      |
                                  | (design tokeny,  |
                                  |  CSS, palette,   |
                                  |  animacje)       |
                                  +------------------+
                                          |
                                          v
                                  +------------------+
                                  |   Frontend Dev   |
                                  | (integracja,     |
                                  |  komponenty,     |
                                  |  responsywnosc)  |
                                  +------------------+
                                          |
                                          v
                                  FAZA 4: AUDYT
                                  +------------------+
                                  |   QA Quality     |
                                  | (zgodnosc, WCAG, |
                                  |  responsywnosc,  |
                                  |  performance)    |
                                  +------------------+
```

**Dlaczego ten uklad?** Bo redesign wymaga NAJPIERW zrozumienia -- co jest trendy (UX) i co juz istnieje (Docs). Dopiero po polaczeniu obu perspektyw Analyst moze stworzyc realny plan. Designer musi zakonczyc przed Frontendem, bo Frontend integruje gotowe style.

### 4.2 Sprint Pipeline (Feature Sprint)

Sprint Pipeline to wzorzec **analyze-first, build-parallel**. Analityk planuje pierwszy, dwoch researcherow bada rownolegle, dwoch builderow buduje rownolegle, QA zamyka.

**Fazy:**

```
FAZA 1: ANALIZA                   FAZA 2: ROWNOLEGLY RESEARCH
+------------------+              +------------------+
|    Analyst       |---+          | Researcher Tech  |
| (dekompozycja,   |   |--+      | (API, biblioteki,|
|  contract API,   |   |  |      |  benchmarki)     |
|  risk mapping)   |   |  |      +------------------+
+------------------+   |  |      +------------------+
                       |  +----->| Researcher UX    |
                       |         | (wzorce UI, UX   |
                       |         |  patterns, a11y) |
                       |         +------------------+
                       |                  |
                       v                  v
              FAZA 3: ROWNOLEGLY BUILD
              +------------------+  +------------------+
              |  Backend Dev     |  |  Frontend Dev    |
              | (API, logika,   |  | (komponenty,     |
              |  testy, feature |  |  integracja,     |
              |  flag)          |  |  responsywnosc)  |
              +------------------+  +------------------+
                       |                  |
                       +--------+---------+
                                |
                                v
                       FAZA 4: AUDYT
                       +------------------+
                       |   QA Quality     |
                       | (end-to-end,     |
                       |  edge cases,     |
                       |  feature flag)   |
                       +------------------+
```

**Dlaczego Analyst PIERWSZY?** Bo w Feature Sprint nie wiesz jeszcze CO badac. Analyst dekomponuje feature request na konkretne pytania techniczne i UX. Bez Analysta researcherzy badaliby na slepo. To kluczowa roznica od Overhaul, gdzie scope redesignu jest znany (istniejacy UI) i researcherzy moga ruszac od razu.

---

## 5. INPUT / OUTPUT kazdego agenta

### 5.1 UI/UX Overhaul -- Lancuch danych

```
INPUT USER: "Zrob redesign dashboardu analitycznego — nowoczesny look,
            dark mode, animacje, zgodnosc z WCAG 2.2"

ORKIESTRATOR
  INPUT:  User request + istniejacy codebase
  OUTPUT: 2x scope dla Researcherow
    → do R-UX: "Zbadaj trendy dashboard 2026, dark mode patterns,
                micro-animations, WCAG 2.2 dashboard compliance"
    → do R-Docs: "Zmapuj istniejace komponenty dashboardu, CSS zmienne,
                  breakpointy, browser support, framework constraints"

RESEARCHER UX (R-02)
  INPUT:  Scope od Orkiestratora
  OUTPUT: UX Findings Report
    - TOP 5 trendow dashboard 2026 (np. bento grids, glassmorphism, neo-brutalism)
    - Mood board: 5+ referencji z Dribbble/Awwwards
    - Dark mode best practices (prefers-color-scheme, zmienne CSS)
    - WCAG 2.2 checklist dla dashboardow
    - Rekomendowana paleta: primary, secondary, accent, semantic colors

RESEARCHER DOCS (R-03)
  INPUT:  Scope od Orkiestratora
  OUTPUT: Docs Findings Report
    - Mapa komponentow: 23 komponenty, 8 globalnych, 15 lokalnych
    - Istniejace CSS zmienne: --primary, --bg, --text (12 zmiennych)
    - Breakpointy: 768px, 1024px, 1440px
    - Framework: React 18 + TailwindCSS 3.4
    - Ograniczenia: brak backdrop-filter w IE11 (ale IE11 dropped)

ANALYST (C-01)
  INPUT:  UX Findings + Docs Findings
  OUTPUT: Redesign Plan
    - Priorytet 1: Dark mode (CSS variables + prefers-color-scheme)
    - Priorytet 2: Bento grid layout (zamiana flex → CSS Grid)
    - Priorytet 3: Glassmorphism cards (backdrop-filter: blur)
    - Priorytet 4: Micro-animations (entry, hover, transition)
    - Design tokeny do zmiany: 12 kolorow, 3 fonty, 4 spacing
    - Risk: animacje na mobile mogą spowalniać (reduce-motion)

DESIGNER (B-02)
  INPUT:  Redesign Plan od Analysta
  OUTPUT: Design Artifacts
    - design-tokens.css: 48 zmiennych CSS (light + dark)
    - components.css: style 23 komponentow
    - animations.css: 8 kluczowych animacji
    - typography.css: scale typograficzny (xs → 4xl)

FRONTEND DEV (B-03)
  INPUT:  Design Artifacts od Designera
  OUTPUT: Implemented Components
    - Zaktualizowane 23 komponenty React
    - Nowy ThemeProvider z dark/light toggle
    - Storybook z nowymi komponentami
    - Snapshot testy zaktualizowane

QA QUALITY (Q-02)
  INPUT:  Implemented Components od Frontendu
  OUTPUT: Raport PASS/FAIL
    - WCAG 2.2 AA: 21/23 komponenty PASS (2 wymagaja fix: contrast na small text)
    - Responsywnosc: PASS na 768px, 1024px, 1440px
    - Dark mode: PASS — toggle dziala, prefers-color-scheme dziala
    - Performance: Lighthouse 94 (z 91 przed redesignem)
    - VERDICT: CONDITIONAL PASS — fix 2 kontrasty
```

### 5.2 Feature Sprint -- Lancuch danych

```
INPUT USER: "Dodaj eksport raportow do PDF z AI-generated summaries,
            feature flag, A/B test (2 warianty layoutu)"

ORKIESTRATOR
  INPUT:  User request + istniejacy codebase
  OUTPUT: Feature request do Analysta
    → "Feature: PDF export z AI summary. Scope: backend API, frontend UI,
       feature flag, A/B test. Zbadaj tech opcje i UX wzorce."

ANALYST (C-01)
  INPUT:  Feature request od Orkiestratora
  OUTPUT: Feature Plan
    - Backend tasks: endpoint /api/reports/export, AI summary generation,
      PDF rendering, feature flag middleware
    - Frontend tasks: przycisk "Eksportuj PDF", modal z opcjami,
      progress bar, 2 warianty layoutu (A/B)
    - Contract API: POST /api/reports/export {reportId, format, variant}
                    Response: {jobId, status, downloadUrl}
    - Pytanie do R-Tech: "Porownaj jsPDF vs Puppeteer vs React-PDF vs
      Playwright PDF. Metryki: jakosc, rozmiar, czas generowania, serwerowosc"
    - Pytanie do R-UX: "Zbadaj UX patterns eksportu PDF w SaaS:
      stepper/wizard, inline progress, modal. A/B test best practices."

RESEARCHER TECH (R-01)
  INPUT:  Pytania techniczne od Analysta
  OUTPUT: Tech Findings Report
    - jsPDF: 7.2/10 (lekki, client-side, slaba jakosc zlozonego CSS)
    - Puppeteer: 9.1/10 (full Chrome rendering, server-side, heavy)
    - React-PDF: 6.8/10 (React-native, ograniczony styling)
    - Playwright: 8.5/10 (cross-browser, lekszy od Puppeteer)
    - Rekomendacja: Puppeteer dla jakosci, Playwright jesli waga serwera priorytet
    - AI Summary: OpenAI GPT-4o-mini (tani, szybki) vs Claude Haiku (dokladniejszy)

RESEARCHER UX (R-02)
  INPUT:  Pytania UX od Analysta
  OUTPUT: UX Findings Report
    - Pattern 1: Inline progress bar (jak Notion export) — najczestszy
    - Pattern 2: Modal z opcjami → progress → download (jak Google Docs)
    - Pattern 3: Background job z notyfikacja (jak Figma export)
    - A/B test: Variant A = compact layout (tabele, dane dense),
                Variant B = spacious layout (karty, whitespace, wykresy)
    - Accessibility: aria-live na progress, focus trap w modalu

BACKEND DEV (B-01)
  INPUT:  Feature Plan + Tech Findings
  OUTPUT: Backend Artifacts
    - routes/export.ts: POST /api/reports/export
    - services/pdfGenerator.ts: Puppeteer rendering
    - services/aiSummary.ts: Claude Haiku integration
    - middleware/featureFlag.ts: isFeatureEnabled("pdf-export")
    - middleware/abTest.ts: getVariant("pdf-layout", userId)
    - tests/export.test.ts: 12 testow (happy path + edge cases)

FRONTEND DEV (B-03)
  INPUT:  Feature Plan + UX Findings
  OUTPUT: Frontend Artifacts
    - components/ExportButton.tsx: przycisk z dropdown opcji
    - components/ExportModal.tsx: modal z progress bar
    - components/ReportPreview.tsx: podglad A/B variants
    - hooks/useExport.ts: logika polaczenia z API
    - tests/Export.test.tsx: 8 testow (render, interactions)

QA QUALITY (Q-02)
  INPUT:  Backend Artifacts + Frontend Artifacts
  OUTPUT: Raport PASS/FAIL
    - API endpoint: PASS — 200ms avg, poprawne PDF
    - AI Summary: PASS — generuje, timeout handled
    - Feature flag OFF: PASS — przycisk ukryty, API zwraca 404
    - Feature flag ON: PASS — pelna sciezka dziala
    - A/B Variant A: PASS — compact layout renderuje
    - A/B Variant B: PASS — spacious layout renderuje
    - Edge case: brak danych → PASS — empty state z komunikatem
    - Edge case: timeout AI → PASS — fallback "Summary unavailable"
    - VERDICT: PASS
```

---

## 6. Kiedy UI/UX Overhaul vs Feature Sprint?

### Drzewo decyzyjne

```
Mam zadanie do wykonania
    |
    +-- Czy dotyczy WYGLADU istniejacego UI?
    |       |
    |       +-- TAK: Czy zmienia logike biznesowa (backend)?
    |       |       |
    |       |       +-- NIE → UI/UX OVERHAUL ✓
    |       |       |
    |       |       +-- TAK → Feature Sprint lub wiekszy preset
    |       |
    |       +-- NIE: Czy dodaje NOWA funkcjonalnosc?
    |               |
    |               +-- TAK: Czy wymaga backend + frontend?
    |               |       |
    |               |       +-- TAK → FEATURE SPRINT ✓
    |               |       |
    |               |       +-- NIE (tylko backend) → Plan & Execute
    |               |       |
    |               |       +-- NIE (tylko frontend) → UI/UX Overhaul
    |               |
    |               +-- NIE → Solo / Quick Fix (za maly scope)
    |
    +-- Czy to bug / naprawa?
            |
            +-- TAK → Quick Fix / Bug Hunt (nie te presety)
```

### Szybki test kwalifikacji

```
UI/UX OVERHAUL — uzyj gdy:
"Zrob redesign dashboardu"                 → TAK ✓
"Modernizuj wyglad calej aplikacji"        → TAK ✓
"Dodaj dark mode"                          → TAK ✓
"Zmien paleta kolorow na nowoczesniejsza"  → TAK ✓
"Dodaj animacje i micro-interactions"      → TAK ✓
"Zrob rebranding interfejsu"              → TAK ✓

FEATURE SPRINT — uzyj gdy:
"Dodaj eksport PDF z AI summary"           → TAK ✓
"Zaimplementuj feature flag system"        → TAK ✓
"Dodaj A/B testing do checkoutu"           → TAK ✓
"Zintegruj Stripe payments"                → TAK ✓
"Dodaj real-time notyfikacje"              → TAK ✓
"Zbuduj system komentarzy"                → TAK ✓

ZADEN Z NICH:
"Napraw blad 500 na /api/users"           → Quick Fix
"Zbadaj czy GraphQL lepszy od REST"       → Recon Squad
"Zbuduj caly SaaS od zera"               → Gold Standard
"Tylko backend, bez UI"                   → Plan & Execute
```

---

## 7. Scenariusze z zycia wziete

### Scenariusz 1: UI/UX Overhaul -- Modernizacja dashboardu SaaS

**Kontekst:** Firma SaaS ma dashboard analityczny zbudowany 3 lata temu w Material Design v1. Klienci Enterprise narzekaja na "przestarzaly wyglad". Konkurencja (Vercel, Linear) ma nowoczesne UI z glassmorphism, subtle animations, premium feel.

**Przebieg:**

```
[T=0s]   User: "Modernizuj dashboard — nowoczesny look jak Vercel/Linear"
[T=3s]   Orkiestrator: scope duzy, dotyczy wygladu, bez backend zmian
         → UI/UX OVERHAUL
[T=8s]   ROWNOLEGLE:
         → R-UX: "Zbadaj trendy dashboard SaaS 2026, Vercel/Linear jako ref"
         → R-Docs: "Zmapuj istniejace komponenty, CSS, framework"
[T=45s]  R-UX wraca: glassmorphism, subtle gradients, Inter font,
         8px/16px spacing grid, reduced motion support
         R-Docs wraca: React 18, TailwindCSS, 31 komponentow,
         14 CSS zmiennych, brak design tokens formalnych
[T=50s]  Analyst syntetyzuje: "Tailwind juz wspiera backdrop-filter.
         Priorytet: tokens → paleta → karty → sidebar → charts.
         Risk: charts (Recharts) nie wspieraja glassmorphism natywnie."
[T=55s]  Analyst → Designer: Redesign Plan z 5 priorytetami
[T=95s]  Designer produkuje: tailwind.config.ts update, 31 klas
         komponentow, 6 animacji w @keyframes, dark mode config
[T=100s] Designer → Frontend Dev: Design Artifacts
[T=155s] Frontend integruje: 31 komponentow zaktualizowanych,
         ThemeToggle dodany, Storybook zaktualizowany
[T=160s] Frontend → QA Quality
[T=185s] QA: 29/31 PASS, 2 FAIL (chart tooltips brak contrast w dark mode)
[T=190s] CONDITIONAL PASS → Orkiestrator → feedback do Frontend
[T=220s] Frontend fix → QA retest → PASS

KOSZT: ~250K tokenow, ~$0.28 | CZAS: 220s | ITERACJE: 1
```

### Scenariusz 2: Feature Sprint -- Export PDF z AI Summary

**Kontekst:** Platforma raportowa chce dodac eksport raportow do PDF. Klienci chca "one-click download z krotkim podsumowaniem AI na poczatku".

**Przebieg:**

```
[T=0s]   User: "Dodaj eksport PDF z AI summary, feature flag, 2 warianty A/B"
[T=3s]   Orkiestrator: nowa funkcja, backend + frontend, research needed
         → FEATURE SPRINT
[T=5s]   Orkiestrator → Analyst: feature request
[T=30s]  Analyst: dekompozycja na 4 backend tasks, 3 frontend tasks,
         contract API zdefiniowany, pytania do researcherow
[T=35s]  ROWNOLEGLE:
         → R-Tech: "Porownaj Puppeteer vs Playwright vs jsPDF dla server PDF"
         → R-UX: "Zbadaj UX patterns eksportu w SaaS, A/B layout warianty"
[T=70s]  R-Tech: Puppeteer 9.1/10, Playwright 8.5, jsPDF 6.2
         R-UX: Modal z progress → download pattern, 2 layout warianty
[T=75s]  ROWNOLEGLE:
         → Backend: Puppeteer PDF + Claude Haiku summary + feature flag
         → Frontend: ExportButton + ExportModal + A/B variants
[T=150s] Backend: 6 plikow, 12 testow | Frontend: 4 komponenty, 8 testow
[T=155s] Oba → QA Quality
[T=190s] QA: 14/14 scenariuszy PASS | Feature flag ON/OFF: PASS
         A/B routing: PASS | Edge cases: PASS
[T=195s] VERDICT: PASS

KOSZT: ~280K tokenow, ~$0.34 | CZAS: 195s | ITERACJE: 0
```

### Scenariusz 3: Feature Sprint -- FAIL -- Zly preset

**Kontekst:** Manager prosi "dodaj platnosci Stripe z subskrypcjami, webhooks, fakturami i portalem klienta".

**Przebieg:**

```
[T=0s]   User: "Pelna integracja Stripe: platnosci, subskrypcje,
         webhooks, faktury, portal klienta"
[T=3s]   Orkiestrator POWINIEN eskalowac (scope za duzy na Feature Sprint)
         ALE probuje Feature Sprint mimo wszystko...
[T=30s]  Analyst: dekompozycja na 12 backend tasks, 8 frontend tasks
         → ZA DUZO dla 2 builderow
[T=70s]  R-Tech: raport Stripe API pelny — 30K tokenow samego raportu
         R-UX: portal klienta to osobna aplikacja — 4 ekrany
[T=150s] Backend: zaimplementowal platnosci i subskrypcje,
         ale webhooks hardcoded, brak retry logic, brak idempotency
         Frontend: zbudowal checkout, ale portal klienta szkicowy
[T=190s] QA: FAIL — 6/14 scenariuszy FAIL
         webhook handling: FAIL (brak retry), invoice generation: FAIL,
         customer portal: FAIL (incomplete)

ZMARNOWANE: ~300K tokenow, ~$0.42
LEKCJA: Scope przekroczyl mozliwosci Feature Sprint.
        Pelna integracja Stripe = minimum 9-12 agentow (Gold Standard).
        Feature Sprint moze zrobic JEDEN aspekt: np. "basic checkout z Stripe".
```

### Scenariusz 4: UI/UX Overhaul -- FAIL -- Ukryte zmiany backendu

**Kontekst:** "Zmien dashboard na real-time — dane aktualizuja sie na zywo."

**Przebieg:**

```
[T=0s]   User: "Zrob dashboard real-time z WebSocket updates"
[T=3s]   Orkiestrator klasyfikuje jako UI/UX Overhaul (blad!)
[T=45s]  R-UX: trendy real-time dashboards, animacje live data
         R-Docs: istniejace API jest REST polling co 30s
[T=50s]  Analyst: "PROBLEM — zmiana na WebSocket wymaga BACKENDU.
         REST → WebSocket to nie redesign, to nowa architektura."
         → Raportuje do Orkiestratora: MISKLASYFIKACJA
[T=55s]  Orkiestrator: ESKALACJA do Feature Sprint lub wiekszego presetu

ZMARNOWANE: ~60K tokenow, ~$0.06 (maly koszt — Analyst zlapal wczesnie)
LEKCJA: Jesli "redesign" wymaga zmian backendu — to NIE jest Overhaul.
        Analyst pelni role strażnika — wykrywa scope creep.
```

---

## 8. Anti-patterny (ZLE vs DOBRZE)

### Anti-pattern #1: Overhaul do funkcji wymagajacej backendu

```
ZLE:  "Dodaj platnosci Stripe" → UI/UX Overhaul
      → Brak Backend Dev w zespole! Designer nie stworzy API.
DOBRZE: "Dodaj platnosci Stripe" → Feature Sprint
        → Backend Dev buduje API, Frontend integruje.
```

### Anti-pattern #2: Feature Sprint do czystego redesignu

```
ZLE:  "Zmien kolory i fonty" → Feature Sprint
      → Analyst marnuje czas na dekompozycje backendowa, ktora nie istnieje.
      → R-Tech bada technologie, ale nie ma CZEGO badac technicznie.
DOBRZE: "Zmien kolory i fonty" → UI/UX Overhaul
        → R-UX bada trendy, R-Docs mapuje istniejace style. Flow naturalny.
```

### Anti-pattern #3: Brak contract API w Feature Sprint

```
ZLE:  Analyst nie definiuje contract API →
      Backend buduje POST /api/export {report_id}
      Frontend oczekuje POST /api/reports/export {reportId, format}
      → NIEZGODNOSC na etapie integracji, QA FAIL
DOBRZE: Analyst definiuje contract API PRZED researchem →
        Backend i Frontend pracuja wedlug tego samego interfejsu.
        Zero niespodzianek na etapie integracji.
```

**Zasada:** Contract API to FUNDAMENT rownoleglego buildu. Bez niego Backend i Frontend buduja dwa osobne produkty zamiast jednego spojnego.

### Anti-pattern #4: Designer i Frontend rownolegle w Overhaul

```
ZLE:  Designer i Frontend rusza jednoczesnie →
      Frontend "zgaduje" style → Designer konczy ze zmianami →
      Frontend musi PRZEPISAC polowe pracy
DOBRZE: Designer konczy → POTEM Frontend zaczyna →
        Frontend integruje GOTOWE style. Zero przepisywania.
```

### Anti-pattern #5: Over-scope w Feature Sprint

```
ZLE:  "Dodaj platnosci + subskrypcje + faktury + portal + analytics"
      → 12 backend tasks, 8 frontend tasks dla 2 builderow
      → Kazdy builder ma 6+ taskow → jakosc spada → QA FAIL
DOBRZE: "Dodaj basic checkout z Stripe" (1 feature na sprint)
        → 3 backend tasks, 2 frontend tasks → wysoka jakosc → QA PASS
```

**Zasada:** Feature Sprint = JEDNA funkcja. Nie feature set. Nie epic. Jedna funkcja z backendem, frontendem i testami.

### Anti-pattern #6: Pominiecie Researcher Docs w Overhaul

```
ZLE:  Tylko R-UX bada trendy, nikt nie sprawdza istniejacego kodu →
      Designer proponuje CSS Grid, ale istniejacy framework to Bootstrap 3 →
      Frontend nie moze zintegrowac bez pelnego przepisania
DOBRZE: R-Docs mapuje ograniczenia PRZED designem →
        Analyst wie: "Bootstrap 3, wiec CSS Grid = duzy refactoring.
        Alternatywa: Flexbox layout w ramach Bootstrap." → Realny plan.
```

### Anti-pattern #7: Ignorowanie feature flag w Feature Sprint

```
ZLE:  Backend wdaza nowa funkcje bez feature flag →
      Bug w PDF export psuje caly system raportowania →
      Rollback wymaga revert + deploy (30 min downtime)
DOBRZE: Feature flag → isFeatureEnabled("pdf-export") →
        Bug? Wylacz flag. Zero downtime. Fix w spokoju.
```

### Anti-pattern #8: A/B test bez hipotezy

```
ZLE:  "Zrob A/B test" → 2 losowe warianty → "ktory wygral?"
      → Nie wiadomo CO mierzysz i DLACZEGO
DOBRZE: "Hipoteza: compact layout (A) ma wyzszy click-through
        niz spacious layout (B) dla power users."
        → Metryka: CTR na przycisk download. Czas: 2 tygodnie.
```

---

## 9. Porownanie kosztow

### Tabela kosztow UI/UX Overhaul

| Agent | Model | Tokeny | Koszt min | Koszt max |
|-------|-------|--------|-----------|-----------|
| Orkiestrator | Opus | 20-35K | $0.03 | $0.07 |
| Researcher UX | Haiku | 20-30K | $0.02 | $0.04 |
| Researcher Docs | Haiku | 20-30K | $0.02 | $0.04 |
| Analyst | Sonnet | 25-40K | $0.03 | $0.06 |
| Designer | Sonnet | 30-50K | $0.04 | $0.08 |
| Frontend Dev | Sonnet | 30-50K | $0.04 | $0.08 |
| QA Quality | Haiku | 20-30K | $0.02 | $0.04 |
| **TOTAL** | | **~180-265K** | **$0.20** | **$0.41** |

### Tabela kosztow Feature Sprint

| Agent | Model | Tokeny | Koszt min | Koszt max |
|-------|-------|--------|-----------|-----------|
| Orkiestrator | Opus | 20-35K | $0.03 | $0.07 |
| Analyst | Sonnet | 25-40K | $0.03 | $0.06 |
| Researcher Tech | Haiku | 20-30K | $0.02 | $0.04 |
| Researcher UX | Haiku | 20-30K | $0.02 | $0.04 |
| Backend Dev | Sonnet | 30-50K | $0.04 | $0.08 |
| Frontend Dev | Sonnet | 30-50K | $0.04 | $0.08 |
| QA Quality | Haiku | 20-30K | $0.02 | $0.04 |
| **TOTAL** | | **~180-265K** | **$0.20** | **$0.41** |

### Porownanie z innymi presetami

| Aspekt | Solo | Quick Fix | Recon | **Overhaul** | **Feature Sprint** | Gold Standard |
|--------|------|-----------|-------|--------------|--------------------|---------------|
| **Agentow** | 2 | 3 | 3 | **7** | **7** | 14 |
| **Tier** | 1 | 1 | 1 | **3 PRO** | **3 PRO** | 4 ENT |
| **Researcherow** | 0 | 0 | 1 | **2** | **2** | 6 |
| **Builderow** | 1 | 1 | 1 | **2** | **2** | 3 |
| **QA** | 0 | 1 | 0 | **1** | **1** | 3 |
| **Analyst** | 0 | 0 | 0 | **1** | **1** | 1 |
| **Koszt** | $0.04-0.15 | $0.05-0.15 | $0.08-0.20 | **$0.20-0.41** | **$0.20-0.41** | $0.60-1.50 |
| **Latencja** | <30s | ~90s | ~120s | **~220s** | **~195s** | ~420s |
| **Scope** | 1 task | 1 bug | 1 POC | **UI redesign** | **1 feature** | **caly produkt** |

### ROI Analysis

```
UI/UX Overhaul ($0.28 avg) vs manualny redesign:
- Manualny redesign bez researchu: $0.50-1.00 (blind building → iteracje)
- Overhaul z researchu + planem: $0.20-0.41
- OSZCZEDNOSC: 40-60% | ROI: 150-250%

Feature Sprint ($0.34 avg) vs ad-hoc implementacja:
- Ad-hoc (Solo × 3 iteracje + brak feature flag): $0.45-0.90
- Feature Sprint z planem + flag + A/B: $0.20-0.41
- OSZCZEDNOSC: 30-55% | ROI: 120-220%
```

---

## 10. Sciezki eskalacji

### Z UI/UX Overhaul

```
OVERHAUL → QA FAIL (1x)?
    → Orkiestrator daje feedback do Frontend → poprawka → QA retest

OVERHAUL → QA FAIL (2x)?
    → Orkiestrator sprawdza: czy problem w designie czy integracji?
    → Design problem → feedback do Designer → nowe artifacts
    → Integracja problem → feedback do Frontend → reintegracja

OVERHAUL → QA FAIL (3x)?
    → ESKALACJA do Gold Standard — dodaj wiecej oczu (QA Security, Integrator)

OVERHAUL → Analyst wykrywa potrzebe backendu?
    → ESKALACJA do Feature Sprint lub wiekszego presetu

OVERHAUL → Scope za duzy (50+ komponentow)?
    → Podziel na 2+ Overhaul sesje: "Overhaul Phase 1: core components"
      "Overhaul Phase 2: secondary components"
```

### Z Feature Sprint

```
FEATURE SPRINT → QA FAIL (1x)?
    → Orkiestrator analizuje: backend bug? frontend bug? integracja?
    → Kieruje feedback do wlasciwego buildera

FEATURE SPRINT → QA FAIL (2x)?
    → Orkiestrator sprawdza: czy contract API byl poprawny?
    → Jesli nie → Analyst redefiniuje → nowa iteracja buildu

FEATURE SPRINT → QA FAIL (3x)?
    → ESKALACJA: dodaj QA Security (bezpieczenstwo), lub Integrator (integracja)
    → Lub podziel na mniejszy scope

FEATURE SPRINT → Scope za duzy?
    → Podziel na 2+ sprinty: "Sprint 1: basic checkout"
      "Sprint 2: subscriptions" "Sprint 3: invoices"

FEATURE SPRINT → Tech nie istnieje / zbyt nowa?
    → COFNIJ do Recon Squad (POC) → potem wróc do Feature Sprint
```

### Mapa eskalacji wizualna

```
                    +------------------+
                    |  RECON SQUAD     |
                    |  (POC, research) |
                    +--------+---------+
                             |
                    tech validated?
                             |
              +------YES-----+-----NO------+
              |                            |
              v                            v
    +-------------------+        Research Swarm
    | UI/UX OVERHAUL    |        (glebszy research)
    | (tylko UI)        |
    +--------+----------+
             |
    wymaga backendu?
             |
    +---YES--+---NO---+
    |                 |
    v                 v
+-------------------+ kontynuuj
| FEATURE SPRINT    | Overhaul
| (backend + front) |
+--------+----------+
         |
    scope za duzy?
         |
    +--YES--+--NO--+
    |              |
    v              v
GOLD STANDARD   kontynuuj
(14 agentow)    Feature Sprint
```

---

## 11. Quick Reference Cards

### Quick Reference -- UI/UX Overhaul

```
+====================================================================+
|                                                                     |
|     UI/UX OVERHAUL -- Quick Reference Card                          |
|     Tier 3 PRO | 7 Agentow | UI Redesign Pipeline                  |
|                                                                     |
+====================================================================+
|                                                                     |
|  SKLAD ZESPOLU:                                                     |
|  +--------------------+----------+-------+-----------+              |
|  | Agent              | Model    | Load  | Rola      |              |
|  +--------------------+----------+-------+-----------+              |
|  | Orkiestrator       | Opus     | 50%   | STRATEGIA |              |
|  | Researcher UX      | Haiku    | 55%   | RESEARCH  |              |
|  | Researcher Docs    | Haiku    | 55%   | RESEARCH  |              |
|  | Analyst            | Sonnet   | 65%   | ANALIZA   |              |
|  | Designer           | Sonnet   | 75%   | BUILD     |              |
|  | Frontend Dev       | Sonnet   | 75%   | BUILD     |              |
|  | QA Quality         | Haiku    | 55%   | QA/AUDYT  |              |
|  +--------------------+----------+-------+-----------+              |
|                                                                     |
|  WZORZEC: UI Redesign Pipeline (parallel research → sequential     |
|           build)                                                    |
|  TOKENY:  ~180-265K                                                 |
|  KOSZT:   $0.20-$0.41                                               |
|  LATENCJA: ~180-300 sekund                                          |
|                                                                     |
|  FLOW:                                                              |
|    Ork → [R-UX || R-Docs] → Analyst → Designer → Frontend → QA     |
|                                                                     |
|  IDEALNE DLA:                                                       |
|  + Pelny redesign interfejsu                                        |
|  + Dark mode / light mode implementation                            |
|  + Rebranding — nowe kolory, fonty, ikony                           |
|  + Modernizacja design systemu                                      |
|  + WCAG compliance overhaul                                         |
|  + Animacje i micro-interactions                                    |
|                                                                     |
|  NIE UZYWAJ DO:                                                     |
|  - Nowa funkcja z backendem (Feature Sprint)                        |
|  - Bug fix (Quick Fix)                                              |
|  - Pelny produkt (Gold Standard)                                    |
|  - Tylko 1 komponent (Solo)                                         |
|  - Zmiana logiki API (Plan & Execute)                               |
|                                                                     |
|  KLUCZOWA ZASADA:                                                   |
|  "Research before redesign, design before build."                   |
|  2 badania + 1 analiza + 2 buildy = spojny redesign.               |
|                                                                     |
+====================================================================+
```

### Quick Reference -- Feature Sprint

```
+====================================================================+
|                                                                     |
|     FEATURE SPRINT -- Quick Reference Card                          |
|     Tier 3 PRO | 7 Agentow | Sprint Pipeline                      |
|                                                                     |
+====================================================================+
|                                                                     |
|  SKLAD ZESPOLU:                                                     |
|  +--------------------+----------+-------+-----------+              |
|  | Agent              | Model    | Load  | Rola      |              |
|  +--------------------+----------+-------+-----------+              |
|  | Orkiestrator       | Opus     | 50%   | STRATEGIA |              |
|  | Analyst            | Sonnet   | 65%   | ANALIZA   |              |
|  | Researcher Tech    | Haiku    | 55%   | RESEARCH  |              |
|  | Researcher UX      | Haiku    | 55%   | RESEARCH  |              |
|  | Backend Dev        | Sonnet   | 75%   | BUILD     |              |
|  | Frontend Dev       | Sonnet   | 75%   | BUILD     |              |
|  | QA Quality         | Haiku    | 55%   | QA/AUDYT  |              |
|  +--------------------+----------+-------+-----------+              |
|                                                                     |
|  WZORZEC: Sprint Pipeline (analyze-first → parallel research →     |
|           parallel build)                                           |
|  TOKENY:  ~180-265K                                                 |
|  KOSZT:   $0.20-$0.41                                               |
|  LATENCJA: ~150-300 sekund                                          |
|                                                                     |
|  FLOW:                                                              |
|    Ork → Analyst → [R-Tech || R-UX] → [Backend || Frontend] → QA   |
|                                                                     |
|  IDEALNE DLA:                                                       |
|  + Nowa funkcja z backend + frontend                                |
|  + Feature flag implementation                                      |
|  + A/B test nowej funkcji                                           |
|  + Integracja z zewnetrznym API                                     |
|  + Eksport / import danych                                          |
|  + Real-time notifications                                          |
|                                                                     |
|  NIE UZYWAJ DO:                                                     |
|  - Czysty redesign (UI/UX Overhaul)                                 |
|  - Pelny produkt / epic (Gold Standard)                             |
|  - Bug fix (Quick Fix)                                              |
|  - Research bez buildu (Recon Squad)                                |
|  - Wiele funkcji naraz (podziel na sprinty)                         |
|                                                                     |
|  KLUCZOWA ZASADA:                                                   |
|  "Analyze first, build in parallel."                                |
|  Contract API = fundament rownoleglego buildu.                      |
|  1 feature na sprint. Nie epic. Nie feature set.                    |
|                                                                     |
+====================================================================+
```

---

## 12. Slowniczek (Glossary)

| Termin | Definicja |
|--------|-----------|
| **UI Redesign Pipeline** | Wzorzec architektoniczny: parallel research → sequential design → build → QA. Uzyty w UI/UX Overhaul. |
| **Sprint Pipeline** | Wzorzec: analyze-first → parallel research → parallel build → QA. Uzyty w Feature Sprint. |
| **Contract API** | Formalny interfejs miedzy Backend a Frontend zdefiniowany PRZED implementacja. Umozliwia rownolegly build. |
| **Feature Flag** | Mechanizm wlaczania/wylaczania funkcji bez deployu. Klucz do bezpiecznych wdrozen. `isFeatureEnabled("feature-name")`. |
| **A/B Test** | Eksperyment: 2+ warianty interfejsu pokazywane roznym uzytkownikom. Mierzy metryki (CTR, conversion). |
| **Mood Board** | Tablica wizualnych inspiracji: palety, typografia, spacing, referencje. Tworzona przez Researcher UX. |
| **Design Tokens** | Atomowe zmienne designu: kolory, fonty, spacing, border-radius, shadows. Format: CSS custom properties lub JSON. |
| **WCAG 2.2** | Web Content Accessibility Guidelines — standard dostepnosci. AA = minimum, AAA = idealne. Kontrast, focus, aria. |
| **Glassmorphism** | Trend UI: polprzezroczyste tla z blur (backdrop-filter) i subtelnymi borderami. Popularny 2024-2026. |
| **Micro-interactions** | Male animacje reakcji na akcje uzytkownika: hover glow, click ripple, loading shimmer. |
| **Scope Creep** | Niekontrolowany wzrost zakresu zadania. Np. "redesign" staje sie "redesign + nowe funkcje + migracja". |
| **Sequential Build** | Build faza po fazie: Designer konczy → Frontend zaczyna. Uzyty w Overhaul. Dodaje latencje, gwarantuje spojnosc. |
| **Parallel Build** | Backend i Frontend buduja jednoczesnie. Wymaga contract API. Oszczedza 60-120s. Uzyty w Feature Sprint. |
| **Conditional PASS** | QA wynik: "prawie PASS, ale 1-2 drobne fixy potrzebne". Nie wymaga pelnej iteracji, tylko targeted fix. |
| **Narrow Context** | Agent dostaje TYLKO informacje potrzebne do zadania. Mniej kontekstu = mniej halucynacji, szybsze przetwarzanie. |
| **Smart Model Routing** | Opus (strategia, $15/$75) → Sonnet (build, $3/$15) → Haiku (research/QA, $0.80/$4). Najdrozszy model tam, gdzie blad kosztuje najwiecej. |
| **Hub-and-Spoke** | Topologia: centralny wezel (Orkiestrator) laczy sie z peryferyjnymi agentami. Cala komunikacja przez Hub. |
| **Tier 3 PRO** | Poziom presetu: 6-9 agentow, zaawansowane workflow, rownolegle sciezki. Miedzy Tier 2 CORE a Tier 4 ENTERPRISE. |
| **Eskalacja** | Przeniesienie do wiekszego presetu (np. Feature Sprint → Gold Standard) gdy scope przekracza mozliwosci. |
| **POC (Proof of Concept)** | Minimalny dzialajacy przyklad. Output presetu Recon. Input do Feature Sprint (po walidacji). |
| **Design System** | Ustandaryzowany zestaw komponentow, tokenow i zasad. Overhaul czesto modernizuje istniejacy design system. |
| **Storybook** | Narzedzie do izolowanego rozwoju i dokumentacji komponentow UI. Frontend Dev czesto uzywa w Overhaul. |

---

## Zrodla

1. **Gold Standard Agent Architecture 2026** — referencyjny template 14 agentow w 4 fazach, definicje presetow
2. **MASTERCLASS: Zespoly Agentow AI 2026** — kompletny przewodnik z anti-wzorcami i kalkulatorem kosztow
3. **Agent Teams Configurator v8/v9** — narzedzie do wizualnego projektowania architektur z 27 presetami
4. **Anthropic Model Pricing 2026** — oficjalne ceny: Opus ($15/$75), Sonnet ($3/$15), Haiku ($0.80/$4)
5. **WCAG 2.2 Guidelines (W3C)** — standard dostepnosci dla interfejsow webowych
6. **Feature Flags Best Practices (LaunchDarkly, 2026)** — strategie feature flag w produkcji
7. **A/B Testing at Scale (Optimizely Research, 2025)** — metodologia testow A/B
8. **Design Tokens Specification (W3C Community Group)** — formalny standard design tokenow
9. **Dribbble & Awwwards Trend Reports 2026** — trendy UI/UX w designie webowym
10. **Hub-and-Spoke Architecture Patterns** — analiza wzorcow komunikacji w systemach rozproszonych
11. **Multi-Agent Research Systems (Anthropic, 2026)** — 90.2% improvement z wieloagentowym researchem

---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz 7-9 minutowa prezentacje wideo o dwoch presetach 7-agentowych: **UI/UX Overhaul** i **Feature Sprint** z systemu architektur wieloagentowych AI Gold Standard 2026. Prezentacja powinna byc edukacyjna, wizualnie anganzujaca, prowadzic widza od zera do pelnego zrozumienia obu presetow, i wyraznic pokazywac ROZNICE miedzy nimi.

### Struktura prezentacji:

**[0:00-0:20] HOOK -- Podwojne uderzenie**
Ekran podzielony na pol. LEWA strona: stary, brzydki interfejs dashboardu — szary, flat, Material Design 1.0, z napisem "2021". PRAWA strona: nowoczesny, glassmorphism, animowany dashboard z napisem "2026". Animacja morph: stary → nowy w 3 sekundy. Tekst pojawiajacy sie z glitch efektem: "7 agentow. 4 minuty. Pelna transformacja." Nastepnie szybki flash: "Ale CZY redesign i nowa funkcja to TO SAMO?" Pauza. "NIE. I dlatego masz DWA presety." Tytul: "UI/UX OVERHAUL & FEATURE SPRINT — Dwa oblicza Tier 3 PRO".

**[0:20-1:20] TRZY ANALOGIE -- Animowane sceny porownawcze**
Ekran dzielony na 2 kolumny: LEWA = Overhaul, PRAWA = Feature Sprint.
1. **Remont vs Nowy pokoj** (0:20-0:40): LEWA — animacja mieszkania, sciany zmieniaja kolor, meble sie wymieniaja, ale uklad pokojow TEN SAM. PRAWA — animacja domu, z boku wyrasta NOWY pokoj, drzwi sie otwieraja, wnetrze sie buduje od fundamentow. Tekst dolny: "Overhaul zmienia WYGLAD. Sprint dodaje FUNKCJE."
2. **Chirurgia plastyczna vs Przeszczep** (0:40-1:00): LEWA — sylwetka twarzy, kontury sie zmieniaja (nowy nos, brow), organy wewnetrzne podswietlone — BEZ ZMIAN. PRAWA — cialo, nowy organ pojawia sie z animacja pulse, polaczenia naczyniowe sie podlaczaja. Tekst: "Overhaul: nowy wyglad, stary backend. Sprint: nowy organ w istniejacym ciele."
3. **Rebranding vs Nowy produkt** (1:00-1:20): LEWA — logo Burger King morph z starego na nowe, opakowania sie zmieniaja. PRAWA — McDonald's, pojawia sie nowy kubek McFlurry z efektem launch, confetti. Tekst: "Overhaul: nowe opakowanie. Sprint: nowy produkt."

**[1:20-2:30] DWA DIAGRAMY ARCHITEKTURY -- Build w czasie rzeczywistym**
Czarny ekran. Lewy diagram (roz podswietlenie): Orkiestrator pojawia sie jako centralny wezel (bialy z rozowym glow). Dwie strzalki w dol — R-UX i R-Docs pojawiaja sie ROWNOLEGLE z animacja rozszerzania. Strzalki schodza do Analyst. Potem sekwencyjnie: Designer → Frontend → QA. Etykiety flow pojawiaja sie jedna po drugiej. Tekst nad diagramem: "UI/UX OVERHAUL — Design before build."

Prawy diagram (rozowe podswietlenie): Orkiestrator → Analyst (pierwsza strzalka). Analyst rozwidla sie na R-Tech i R-UX rownolegle. R-Tech → Backend, R-UX → Frontend (rownolegle). Oba schodza do QA. Tekst: "FEATURE SPRINT — Analyze first, build in parallel."

Animacja porownawcza: podswietlenie sekwencyjnosci (Designer→Frontend) w Overhaul vs rownoleglości (Backend||Frontend) w Sprint. Flash text: "Sekwencyjny build = spojnosc. Rownolegly build = szybkosc."

**[2:30-3:30] CONTRACT API -- Klucz do Feature Sprint**
Animacja: Analyst pisze dokument "Contract API" (typewriter efekt):
```
POST /api/reports/export
Request:  {reportId, format, variant}
Response: {jobId, status, downloadUrl}
```
Strzalka w lewo: dokument leci do Backend Dev (buduje endpoint). Strzalka w prawo: dokument leci do Frontend Dev (buduje fetch call). Oba pracuja jednoczesnie — dwoch animowanych koderow piszacych na podzielonym ekranie. Timer w rogu: "60s oszczednosci dzieki rownoleglemu buildowi."

Flash text: "Bez Contract API = dwa osobne produkty. Z Contract API = jedna spojna funkcja."

**[3:30-5:00] LIVE SCENARIO -- Split-screen demo**
LEWA (Overhaul): "Modernizuj dashboard SaaS"
- [T=0s] Orkiestrator: "2 researcherow, rusz!" → timer starts
- [T=8s] R-UX: mood board z 5 obrazkami (animacja polaroid) + R-Docs: mapa 31 komponentow (animacja siatki)
- [T=45s] Analyst: "Glassmorphism + Tailwind = mozliwe. Priorytet: tokens→paleta→karty"
- [T=95s] Designer: 48 CSS zmiennych (animacja palety kolorow rozkwitajacej)
- [T=155s] Frontend: 31 komponentow (animacja checkmarkow)
- [T=185s] QA: "29/31 PASS" → conditional pass → fix → PASS
- [T=220s] DONE. Koszt: $0.28

PRAWA (Feature Sprint): "Dodaj PDF export z AI summary"
- [T=0s] Orkiestrator: "Analyst, zaplanuj" → timer starts
- [T=30s] Analyst: Feature Plan + Contract API (dokument z animacja)
- [T=35s] R-Tech: "Puppeteer 9.1/10" + R-UX: "Modal+progress pattern" (rownolegle)
- [T=75s] Backend: 6 plikow + Frontend: 4 komponenty (rownolegle, split keyboard)
- [T=155s] QA: "14/14 PASS" → wielki zielony checkmark
- [T=195s] DONE. Koszt: $0.34

Porownanie finalne: oba timery obok siebie. Overhaul: 220s, $0.28. Sprint: 195s, $0.34.

**[5:00-6:00] ANTI-PATTERNY -- "Wanted" gallery**
6 kart w stylu "wanted poster" na rozowym tle z ciemnym vignette:
1. "Overhaul do backendu" — czaszka i skrzyzowane kosci
2. "Sprint do redesignu" — przekreslony obrazek farby
3. "Brak Contract API" — rozpadajacy sie most
4. "Designer || Frontend" — zderzajace sie pociagi
5. "Over-scope Sprint" — implodujaca gwiazda
6. "Brak feature flag" — domino upadajace
Kazda karta flip na hover (3D rotation) pokazujaca "DOBRZE" po drugiej stronie.

**[6:00-7:00] DRZEWO DECYZYJNE -- Animowany flowchart**
Pytanie "Mam zadanie" pojawia sie na gorze. Strzalki prowadza do decyzji:
- "Czy dotyczy WYGLADU?" → TAK → "Zmienia backend?" → NIE → "UI/UX OVERHAUL" (rozowy highlight, pulse)
- "Czy dodaje FUNKCJE?" → TAK → "Backend + Frontend?" → TAK → "FEATURE SPRINT" (rozowy highlight, pulse)
- "Tylko bug?" → "Quick Fix" (szary)
- "Pelny produkt?" → "Gold Standard" (szary)
Animacja: uzytkownik "wrzuca" 5 zadan do drzewa, kazde leci wlasciwa sciezka z satisfying "pling" dzwiekiem.

**[7:00-7:45] POROWNANIE KOSZTOW i ROI**
Animowany bar chart: 5 presetow od Solo ($0.05) do Gold Standard ($1.00). Overhaul ($0.28) i Feature Sprint ($0.34) podswietlone na rozowo. Strzalka ROI: "Overhaul ROI 150-250%, Sprint ROI 120-220%".
Drugi wykres: latencja — te same presety. Overhaul ~220s, Sprint ~195s.
Flash text: "Tier 3 PRO: sweet spot miedzy kosztem a mozliwosciami."

**[7:45-8:30] ESKALACJA -- Mapa sciezek**
Animowana mapa: Recon Squad (maly wezel) → strzalka "tech validated" → rozwidlenie:
- "Tylko UI?" → UI/UX Overhaul (rozowy wezel)
- "Backend + UI?" → Feature Sprint (rozowy wezel)
- "Za duzy scope?" → Gold Standard (duzy wezel)
Animacja: kazda sciezka rozswietla sie po kolei jak obwod elektryczny.

**[8:30-9:00] ZAMKNIECIE**
Ekran: dwa diagramy obok siebie, oba pulsuja. Tekst centralny:
"Redesign to nie feature. Feature to nie redesign."
"Ale oba potrzebuja 7 agentow, planu i QA."
Rozowy flash → logo "Tier 3 PRO — Gold Standard 2026"
Call to action: "Uzyj UI/UX Overhaul do transformacji wygladu. Uzyj Feature Sprint do budowy nowych funkcji. Nie myyl jednego z drugim."
Koncowe badge: "7 agentow | 180-300K tokenow | $0.20-0.41 | Tier 3 PRO"

### Styl wizualny:
- **Paleta glowna:** Pink accent (#EC4899) na ciemnym tle (#0F172A — slate-900)
- **Paleta dodatkowa:** Cieplejszy roz (#F472B6) dla hovery i glow, ciemny roz (#BE185D) dla cieni i depth
- **Tlo:** Gradient od #0F172A (gora) do #1E1B4B (dol) — ciemny indigo/slate z subtelna siatka hexagonalna
- **Tekst:** Bialy (#FFFFFF) na ciemnym tle, rozowy (#EC4899) dla akcentow i kluczowych slow
- **Sukces:** Emerald (#10B981) — checkmarki, PASS, pozytywne metryki
- **Porazka:** Rose-500 (#F43F5E) — FAIL, anti-patterny, ostrzezenia (blizszy rozowi niz czysty czerwony, dla spojnosci palety)
- **Motyw graficzny:** Sprint/Design duality — po lewej stronie zawsze ikony designu (pedzel, paleta, Figma), po prawej ikony sprintu (rakieta, sprint board, feature flag). Centralny motyw: dwie polowki rozowego serca/diamentu ktore lacza sie w calosc.
- **Elementy dekoracyjne:** Floating orbs w rozowych odcieniach (#EC4899, #F472B6, #BE185D) z roznym opacity (0.1-0.3), subtelne particle connections miedzy wezlami diagramow, glassmorphism borders (1px rgba(236,72,153,0.3))
- **Animacje:** Plynne przejscia (ease-out 0.4s), build-up diagramow wezel po wezle z 200ms delay miedzy nimi, pulsujace wezly aktywnych agentow (scale 1.0→1.05→1.0, 2s cycle), particle trails na polaczeniach (maleduze rozowe kropki plynace wzdluz strzalek)
- **Typografia:** Inter (naglowki, bold 700, tracking -0.02em), JetBrains Mono (code snippets, regular 400), rozmiary: H1 48px, H2 36px, H3 24px, body 16px, caption 12px
- **Split screen:** Gdy porownanie Overhaul vs Sprint — lewa strona ma subtelny gradient ku fioletowemu (#7C3AED), prawa ku rozowemu (#EC4899). Linia podzialu: animowana, falujaca, 2px w bialym kolorze.
- **Karty agentow:** Zaokraglone rogi (16px), tlo rgba(15,23,42,0.8) z backdrop-filter blur(12px), border 1px rgba(236,72,153,0.2), shadow: 0 8px 32px rgba(236,72,153,0.1). Ikona agenta w lewym gornym rogu z rozowym glow.
- **Progress timery:** W prawym gornym rogu, font monospace, format "T=XXXs", kolor rozowy z pulsem co sekunde. Koszt obok: "$X.XX" z animacja count-up.
- **Przejscia miedzy sekcjami:** Fade-through z 0.5s rozowym flash (opacity 0 → 0.15 → 0), dzwiek "soft chime" na kazdym przejsciu.
- **Muzyka:** Ambient electronic z progressive build-up. Tempo: 100-120 BPM. Bass drop przy hookach statystycznych. Melodia: syntezatorowe pady w tonacji F minor (emocjonalna, nowoczesna). W czesci porownawczej — dwa rozne instrumenty (lewo: piano/pad, prawo: synth/pulse) symbolizujace dwa presety. Build-up w czesci live scenario, climax przy PASS. Outhro: spokojne, rozwiazujace, z rozowym shimmer sound.
- **Narrator:** Spokojny, pewny siebie, z entuzjazmem przy kluczowych odkryciach. Pauzy przy statystykach (2-3 sekundy). Glos meski lub zenski — neutralny, profesjonalny. Tempo: normalne w czesci edukacyjnej, przyspieszajace w live demo, zwolnione w podsumowaniu.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike (1080x3500px) o dwoch presetach 7-agentowych: **UI/UX Overhaul** i **Feature Sprint** z systemu architektur wieloagentowych AI Gold Standard 2026. Infografika powinna byc czytelna, logicznie zorganizowana, wizualnie premium i konsekwentnie uzywac motywu dualnosci (dwa presety obok siebie).

### Struktura infografiki (od gory do dolu):

**[NAGLOWEK -- 1080x300px]**
Tytul glowny: "UI/UX OVERHAUL & FEATURE SPRINT" w duzym, boldnym foncie (Inter 42px, white, tracking -0.03em) wycentrowany. Pod tytulem: cienka rozowa linia (#EC4899, 2px, szerokosc 60%, wycentrowana) z subtelnym glow (box-shadow 0 0 12px rgba(236,72,153,0.4)). Podtytul: "Tier 3 PRO | 7 Agentow kazdy | Gold Standard 2026" (Inter 16px, #94A3B8 — slate-400). Tlo: gradient od #0F172A (gora) do #1E1B4B (dol lewo) / #1E293B (dol prawo) — diagonal split symbolizujacy dualnosc. Dekoracja: dwa rozowe orby (okrag, #EC4899, opacity 0.08, 300px diameter) — jeden w lewym gornym rogu, drugi w prawym — nakrywa sie z tekstem tworzac subtelna glow. Maly badge pod podtytulem: dwa prostokaty zaokraglone obok siebie — lewy "UI Redesign Pipeline" (border #A78BFA — violet), prawy "Sprint Pipeline" (border #EC4899 — pink).

**[SEKCJA 1: DUALNOSC -- 1080x350px]**
Tytul sekcji: "01 // DWA PRESETY, JEDEN TIER" (Inter 20px semibold, #EC4899). Dwie karty obok siebie (kazda 480x280px, gap 20px, zaokraglone rogi 16px):
- LEWA karta "UI/UX OVERHAUL": tlo rgba(15,23,42,0.7) z backdrop-filter: blur(12px), border 1px rgba(167,139,250,0.3) (violet tint). Ikona: pedzel/paleta (outline, bialy, 32px). Tytul karty: "Overhaul" (bold, bialy). Opis: "Pelny redesign, modernizacja, rebranding. Zmienia WYGLAD, nie logike." (14px, #CBD5E1). Badge dolny: "2 Researcherow → Analyst → Designer → Frontend → QA".
- PRAWA karta "FEATURE SPRINT": tlo rgba(15,23,42,0.7), border 1px rgba(236,72,153,0.3) (pink tint). Ikona: rakieta (outline, bialy, 32px). Tytul: "Feature Sprint" (bold, bialy). Opis: "Nowa funkcja, feature flag, A/B test, integracja. Dodaje FUNKCJE." (14px, #CBD5E1). Badge: "Analyst → 2 Researcherow → Backend + Frontend → QA".
Miedzy kartami: ikona "vs" w rozowym okraglym badge (24px).

**[SEKCJA 2: KARTY AGENTOW OVERHAUL -- 1080x400px]**
Tytul: "02 // SKLAD: UI/UX OVERHAUL" (Inter 20px, #A78BFA — violet accent dla Overhaul). Siedem kart agentow ulozonych w flow pattern (gora-dol z rozgalezieniem):

Rzad 1 (srodek): Orkiestrator — karta 200x80px, border zloty (#F59E0B), ikona kompas, "Opus | Load 50 | $0.03-0.07"
Rzad 2 (dwie karty rownolegle): Researcher UX (lewy, border niebieski #3B82F6, ikona lupa, "Haiku | 55 | $0.02-0.04") + Researcher Docs (prawy, border niebieski, ikona dokument, "Haiku | 55 | $0.02-0.04")
Rzad 3 (srodek): Analyst — border fioletowy #8B5CF6, ikona wykresy, "Sonnet | 65 | $0.03-0.06"
Rzad 4 (srodek): Designer — border zielony #10B981, ikona Figma/pedzel, "Sonnet | 75 | $0.04-0.08"
Rzad 5 (srodek): Frontend Dev — border zielony, ikona React/kod, "Sonnet | 75 | $0.04-0.08"
Rzad 6 (srodek): QA Quality — border czerwony #F43F5E, ikona tarcza/check, "Haiku | 55 | $0.02-0.04"

Strzalki miedzy kartami: cienkie linie (#EC4899, 1.5px) z malymi trojkatami na koncach. Strzalki od Orkiestratora rozgaleziaja sie do R-UX i R-Docs rownolegle. Potem lacza sie w Analyst. Dalej sekwencyjnie w dol.

**[SEKCJA 3: KARTY AGENTOW FEATURE SPRINT -- 1080x400px]**
Tytul: "03 // SKLAD: FEATURE SPRINT" (Inter 20px, #EC4899 — pink accent dla Sprint). Siedem kart w flow pattern:

Rzad 1: Orkiestrator (srodek)
Rzad 2: Analyst (srodek)
Rzad 3: Researcher Tech (lewy, ikona chip) + Researcher UX (prawy, ikona lupa) — ROWNOLEGLE
Rzad 4: Backend Dev (lewy, ikona serwer, "Sonnet | 75") + Frontend Dev (prawy, ikona monitor) — ROWNOLEGLE
Rzad 5: QA Quality (srodek)

Strzalki: sekwencyjne Ork→Analyst, potem rozgalezienie Analyst→[R-Tech||R-UX], potem R-Tech→Backend i R-UX→Frontend, potem oba→QA. Kluczowa roznica wizualna vs Overhaul: SZEROKOSC rozgalezienia jest wieksza (dwa etapy rownolegle vs jeden).

**[SEKCJA 4: FLOW COMPARISON -- 1080x250px]**
Tytul: "04 // FLOW: POROWNANIE" (Inter 20px, bialy). Dwie poziome linie flow obok siebie:

GORA (Overhaul): Ork → [R-UX || R-Docs] → Analyst → Designer → Frontend → QA
Kazdy krok to maly okrag (20px) z ikona, polaczony linia. Kolory: zloty → niebieski|niebieski → fioletowy → zielony → zielony → czerwony.

DOL (Sprint): Ork → Analyst → [R-Tech || R-UX] → [Backend || Frontend] → QA
Te same okregi. Podswietlenie kluczowej roznicy: w Overhaul "Designer → Frontend" sa SEKWENCYJNE (strzalka prosta), w Sprint "Backend || Frontend" sa ROWNOLEGLE (rozwidlone strzalki).

Etykieta miedzy: "Sekwencyjny build = spojnosc wizualna" (nad Overhaul), "Rownolegly build = szybkosc" (pod Sprint).

**[SEKCJA 5: INPUT/OUTPUT -- 1080x350px]**
Tytul: "05 // CO WCHODZI, CO WYCHODZI" (Inter 20px, #EC4899). Dwa lancuchy danych jako pionowe timeline (lewy Overhaul, prawy Sprint):

LEWY timeline:
- INPUT: "Redesign dashboard" (rozowy badge)
- R-UX → "Mood board, 5 trendow, WCAG checklist"
- R-Docs → "Mapa 31 komponentow, CSS zmienne"
- Analyst → "Redesign Plan, 5 priorytetow"
- Designer → "48 CSS zmiennych, animacje"
- Frontend → "31 komponentow zaktualizowanych"
- QA → "PASS / CONDITIONAL PASS"

PRAWY timeline:
- INPUT: "PDF export z AI summary" (rozowy badge)
- Analyst → "Feature Plan, Contract API"
- R-Tech → "Puppeteer 9.1/10, 3 opcje"
- R-UX → "Modal+progress pattern"
- Backend → "6 plikow, 12 testow"
- Frontend → "4 komponenty, 8 testow"
- QA → "14/14 PASS"

Kazdy punkt timeline to maly dot (8px, #EC4899) z etykieta po prawej (12px, #CBD5E1).

**[SEKCJA 6: SYGNALIZACJA SWIETLNA -- 1080x300px]**
Tytul: "06 // KIEDY UZYC?" (Inter 20px, bialy). Dwie kolumny z sygnalizacja (lewa Overhaul, prawa Sprint):

OVERHAUL:
- ZIELONY (#10B981): Pelny redesign, dark mode, rebranding, WCAG, animacje, design system
- ZOLTY (#F59E0B): Zmiana 1-2 komponentow (moze Solo), polowa UI + polowa logiki (rozważ Sprint)
- CZERWONY (#F43F5E): Nowa funkcja z backendem, bug fix, pelny produkt, tylko 1 przycisk

SPRINT:
- ZIELONY: Nowa funkcja B+F, feature flag, A/B test, API integracja, eksport/import
- ZOLTY: Tylko backend (Plan&Execute), tylko 1 maly feature (Solo), nieznana tech (Recon)
- CZERWONY: Czysty redesign, bug fix, pelny SaaS, wiele features naraz

**[SEKCJA 7: KOSZT i ROI -- 1080x300px]**
Tytul: "07 // KOSZTY I ROI" (Inter 20px, #EC4899). Dwa donut charts obok siebie (kazdy 180px diameter):

LEWY (Overhaul): Segmenty: Orkiestrator $0.05 (zloty), R-UX $0.03 (niebieski), R-Docs $0.03 (niebieski), Analyst $0.04 (fioletowy), Designer $0.06 (zielony), Frontend $0.06 (zielony), QA $0.03 (czerwony). Srodek: "~$0.28 avg"

PRAWY (Sprint): Segmenty: Orkiestrator $0.05, Analyst $0.04, R-Tech $0.03, R-UX $0.03, Backend $0.06, Frontend $0.06, QA $0.03. Srodek: "~$0.34 avg"

Pod donutami: horizontal bar chart porownawczy (szerokosc 900px):
- Solo: $0.05 (najkrotszy slupek, szary)
- Quick Fix: $0.10 (szary)
- Recon: $0.14 (szary)
- **Overhaul: $0.28** (rozowy, podswietlony)
- **Sprint: $0.34** (rozowy, podswietlony)
- Gold Standard: $1.00 (szary)

ROI box (srodek, pod bar chart): "Overhaul ROI: 150-250% vs blind redesign | Sprint ROI: 120-220% vs ad-hoc build" (14px, bialy na tle rgba(236,72,153,0.15), zaokraglone rogi 8px, padding 12px).

**[SEKCJA 8: ANTI-PATTERNY -- 1080x250px]**
Tytul: "08 // CZEGO NIE ROBIC" (Inter 20px, #F43F5E). Siatka 2x4 malych kart (kazda ~240x50px, tlo rgba(244,63,94,0.1), border 1px rgba(244,63,94,0.3)):
1. X "Overhaul do backendu" — brak Backend Dev!
2. X "Sprint do redesignu" — brak Designera!
3. X "Brak Contract API" — Backend i Frontend niezgodne
4. X "Designer || Frontend" — brak gotowych stylow
5. X "Over-scope Sprint" — 1 feature, nie epic!
6. X "Brak feature flag" — rollback niemozliwy
7. X "Brak R-Docs w Overhaul" — slepota na constraints
8. X "A/B test bez hipotezy" — mierzenie bez celu

Kazda karta: ikona X (czerwona, 16px), tekst (12px, #CBD5E1).

**[SEKCJA 9: DRZEWO DECYZYJNE -- 1080x300px]**
Tytul: "09 // KTORY PRESET WYBRAC?" (Inter 20px, bialy). Animowane drzewo decyzyjne (statyczna wersja w infografice):

Start: "Nowe zadanie" (okrag, bialy) → "Dotyczy WYGLADU?" → TAK → "Zmienia backend?" → NIE → "UI/UX OVERHAUL" (rozowy box z glow)
Start → "Dodaje FUNKCJE?" → TAK → "Backend + Frontend?" → TAK → "FEATURE SPRINT" (rozowy box z glow)
Start → "Bug fix?" → "Quick Fix" (szary box)
Start → "Pelny produkt?" → "Gold Standard" (szary box)

Linie decyzyjne: 1.5px, #64748B (slate-500). Rozowe boxy: border 2px #EC4899, tlo rgba(236,72,153,0.15). Szare boxy: border 1px #475569.

**[SEKCJA 10: ESKALACJA -- 1080x200px]**
Tytul: "10 // SCIEZKI ESKALACJI" (Inter 20px, #EC4899). Pozioma mapa eskalacji:

[Recon] --tech OK--> [Overhaul] --wymaga BE--> [Feature Sprint] --scope za duzy--> [Gold Standard]

Kazdy wezel: okrag 50px z ikona. Strzalki: linie z etykietami warunkow. Aktywne presety (Overhaul, Sprint) w rozowym glow, pozostale w szarym.

**[SEKCJA 11: QUICK REFERENCE -- 1080x200px]**
Tytul: "11 // QUICK REFERENCE" (Inter 20px, bialy). Dwie kompaktowe karty obok siebie:

LEWA (Overhaul): "Wzorzec: UI Redesign Pipeline | Tokeny: ~180-265K | Koszt: $0.20-0.41 | Latencja: ~220s | Flow: Ork→[R-UX||R-Docs]→Analyst→Designer→FE→QA | Zasada: Research before redesign"

PRAWA (Sprint): "Wzorzec: Sprint Pipeline | Tokeny: ~180-265K | Koszt: $0.20-0.41 | Latencja: ~195s | Flow: Ork→Analyst→[R-Tech||R-UX]→[BE||FE]→QA | Zasada: Analyze first, build parallel"

Obie karty: tlo #111827, border 1px rgba(236,72,153,0.2), zaokraglone rogi 12px, padding 16px. Tekst 11px, #94A3B8. Tytuly w karcie bold.

**[STOPKA -- 1080x100px]**
Tekst centralny: "Agent Architecture Designer 2026 | Gold Standard Architecture | Tier 3 PRO" (Inter 12px, #64748B). Pod spodem: cienka rozowa linia (#EC4899, 1px, 40%, wycentrowana, z glow). Logo lub badge: "Powered by Claude Opus + Sonnet + Haiku" w rozproszonym tekście.

### Styl wizualny calej infografiki:
- **Paleta glowna:** Pink (#EC4899) jako glowny akcent, Violet (#A78BFA) jako secondary dla Overhaul, Slate (#0F172A, #1E293B) dla tel
- **Tekst:** Bialy (#FFFFFF) dla naglowkow, Slate-300 (#CBD5E1) dla body, Slate-400 (#94A3B8) dla caption, Pink (#EC4899) dla akcentow
- **Sukces:** Emerald (#10B981)
- **Ostrzezenie:** Amber (#F59E0B)
- **Porazka:** Rose (#F43F5E)
- **Typografia:** Inter (calosc), JetBrains Mono (code/metryki). H1: 42px bold. H2: 20px semibold. Body: 14px regular. Caption: 11-12px.
- **Karty:** Glassmorphism — tlo rgba(15,23,42,0.7), backdrop-filter: blur(12px), border 1px rgba(236,72,153,0.15), border-radius 16px, box-shadow: 0 4px 24px rgba(0,0,0,0.3)
- **Ikony:** Outline style (Lucide icons aesthetic), monochromatyczne biale z kolorowym akcentem przy hover/aktywnosci
- **Separatory miedzy sekcjami:** Cienka rozowa linia (1px, #EC4899, opacity 0.3, szerokosc 80%, wycentrowana) z 32px margin gora/dol
- **Numeracja sekcji:** Format "01 //", "02 //" itd. w #EC4899, 12px, uppercase, letter-spacing 0.1em
- **Dekoracje:** Floating orbs (rozowe, 200-400px, opacity 0.05-0.1) w tle — minimum 4 rozmieszczone nierownomiernie. Subtelna siatka hexagonalna w tle (1px, #1E293B, opacity 0.3). Dotted connector lines (2px dash, #334155) laczace sekcje wizualnie.
- **Motyw dualnosci:** Kazda sekcja porownawcza dzieli sie na LEWA (Overhaul, violet tint) i PRAWA (Sprint, pink tint). Linia podzialu: przerywana, 1px, #475569. Konsekwentne uzycie: violet-left / pink-right w CALEJ infografice.
- **Responsywnosc tekstu:** Najdluzszy tekst w wierszu: 50 znakow. Multi-line z line-height 1.5. Hierarchia: ikona → tytul → metryka → opis.

---

*Dokument opracowany na podstawie Gold Standard Agent Architecture 2026, MASTERCLASS Agent Teams, AGENT_TEAMS_CONFIGURATOR v8/v9 oraz analiz multi-agent research systems. Dane kosztowe aktualne na kwiecien 2026.*
