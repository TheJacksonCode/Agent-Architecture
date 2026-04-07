# DESIGN SYSTEM & API MODERNIZATION -- Presety Specjalistyczne

## Kompletny Przewodnik | Tier 3 PRO | Gold Standard 2026

**Seria:** Architektura Agentow AI -- Presety i Konfiguracje
**Preset IDs:** `design_sys` + `api_modern`
**Nazwy:** Design System + API Modernization
**Ikony:** Paleta + Wtyczka
**Tier:** 3 (PRO)
**Liczba agentow:** 6 + 6
**Wzorce:** Design Pipeline + API Upgrade Pipeline
**Koszt tokenowy:** ~150-250K / ~150-260K
**Koszt dolarowy:** $0.12-$0.38 / $0.12-$0.40
**Latencja:** ~120-240s / ~150-300s
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## SPIS TRESCI

1. [Wprowadzenie -- Dwa oblicza Tier 3 PRO](#1-wprowadzenie)
2. [Preset #1: Design System -- Sklad zespolu](#2-design-system-sklad)
3. [Preset #2: API Modernization -- Sklad zespolu](#3-api-modernization-sklad)
4. [Workflow Design System -- Krok po kroku](#4-workflow-design-system)
5. [Workflow API Modernization -- Krok po kroku](#5-workflow-api-modernization)
6. [Porownanie -- Design System vs API Modernization](#6-porownanie)
7. [Przypadki uzycia i realne scenariusze](#7-przypadki-uzycia)
8. [Anti-patterny -- Czego NIE robic](#8-anti-patterny)
9. [Sciezki eskalacji](#9-sciezki-eskalacji)
10. [Drzewo decyzyjne -- Ktory preset wybrac?](#10-drzewo-decyzyjne)
11. [Analiza kosztow](#11-analiza-kosztow)
12. [Quick Reference Cards](#12-quick-reference)
13. [Slowniczek (Glossary)](#13-slowniczek)
14. [Zrodla](#14-zrodla)
15. [Prompt do prezentacji wideo](#prompt-video)
16. [Prompt do infografiki](#prompt-infografika)

---

## 1. Wprowadzenie -- Dwa oblicza Tier 3 PRO

Tier 3 PRO to poziom presetow, w ktorym zespol agentow jest wystarczajaco duzy, zeby objac PELNY cykl specjalistyczny -- od researchu po dostarczenie -- ale wystarczajaco maly, zeby nie generowac nadmiernego narzutu komunikacyjnego. Szesc agentow to punkt rownowagi miedzy glebokim specjalizowaniem a kontrolowalna zlozonoscia.

W tym przewodniku omawiamy DWA presety Tier 3 PRO, ktore reprezentuja dwie fundamentalnie rozne filozofie pracy:

- **Design System** -- buduje od ZEWNATRZ do WEWNATRZ. Zaczyna od tego, co widzi uzytkownik (UX, style, komponenty), i produkuje spojny system wizualny.
- **API Modernization** -- buduje od WEWNATRZ na ZEWNATRZ. Zaczyna od tego, czego uzytkownik NIE widzi (endpointy, schematy, kontrakty), i modernizuje wewnetrzna architekture.

### Analogia 1: Dwa typy remontow

Wyobraz sobie budynek biurowy z lat 90-tych. Potrzebuje modernizacji, ale mozna ja przeprowadzic na dwa sposoby:

**Remont fasady i wnetrz (Design System):** Zatrudniasz architekta wnetrz, ktory bada trendy, projektuje nowa palette kolorow, dobiera meble, tworzy system oznakowania. Kazdy pokoj, korytarz i sala konferencyjna dostaje ten sam, spojny styl wizualny. Hydraulika i elektryka zostaja bez zmian -- to nie o to chodzi w tym remoncie.

**Wymiana instalacji (API Modernization):** Zatrudniasz inzyniera, ktory analizuje stara instalacje elektryczna i wodna. Mapuje kazdy kabel, kazda rure. Planuje, jak wymienic miedziane przewody na swiatylowodowe, stare rury na nowoczesne. Scianki, podlogi i meble zostaja -- nikt nie widzi zmian, ale budynek dziala 10x sprawniej.

Oba remonty kosztuja podobnie. Oba angzauja 6-osobowe ekipy. Ale robia ZUPELNIE rozne rzeczy.

### Analogia 2: Chirurgia plastyczna vs kardiologia

**Design System** to chirurg plastyczny -- pracuje na powierzchni. Bada, co jest teraz na topie w estetyce (research UX), konsultuje sie z dokumentacja standardow (research docs), projektuje nowy wyglad (designer), implementuje go (frontend dev), i dokumentuje efekt (redaktor). Pacjent wyglada inaczej -- lepiej, nowoczesniej, bardziej atrakcyjnie.

**API Modernization** to kardiolog -- pracuje na wnetrzu. Analizuje stare serce systemu (analityk), bada nowoczesne technologie by-passow (researcher tech), operuje -- wymienia stare naczynia na nowe (backend dev), podlacza do reszty organizmu (integrator) i testuje, czy serce bije prawidlowo (QA quality). Pacjent z zewnatrz wyglada tak samo -- ale zyje 20 lat dluzej.

### Analogia 3: Rebranding vs migracja infrastruktury

**Design System** to rebranding firmy. Nowe logo, nowa paleta, nowe szablony prezentacji, nowe wytyczne brandowe. Kazdy pracownik dostaje "brand book" -- dokument mowiacy dokladnie, jaki odcien niebieskiego to "#0066CC", jaki font uzywac w naglowkach, ile pikseli marginesu zostawic. To wlasnie design system -- spojny zbior regul wizualnych.

**API Modernization** to migracja z serwerowni na chmure. Analiza obecnej infrastruktury, badanie opcji (AWS vs Azure vs GCP), przepisanie konfiguracji, testowanie polaczen. Klienci nie widza roznicy -- ale system jest szybszy, tanszy i skalowalny.

> **Czy wiesz, ze...?**
> W architekturze Gold Standard 2026 istnieje dokladnie **27 predefiniowanych presetow**. Design System i API Modernization sa jedynymi dwoma presetami Tier 3 PRO, ktore maja dokladnie 6 agentow i ZERO wspolnych agentow roboczych (oprocz Orkiestratora). Jeden jest w 100% frontend-oriented, drugi w 100% backend-oriented. To lustrzane odbicia.

> **Uwaga!**
> Design System NIE ma QA -- to swiadoma decyzja. Audyt wizualny jest wbudowany w workflow Designera (design review) i Redaktora (doc review). API Modernization NIE ma frontendu -- modernizacja API nie zmienia interfejsu uzytkownika. Jesli potrzebujesz obu naraz, uzyj presetu UI/UX Overhaul (7 agentow) lub Standard Dev (8 agentow).

---

## 2. Preset #1: Design System -- Sklad zespolu

Design System to **6 agentow** w konfiguracji Design Pipeline. Trzy warstwy: research, build, dokumentacja.

### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | A-00 |
| **Rola** | STRATEGIA -- koordynacja, ewaluacja, walidacja |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50/100 |
| **Token budget** | ~20-35K |
| **Narzedzia** | Agent (delegacja), Read, Grep, Glob |

W Design System Orkiestrator pelni role **dyrektora kreatywnego**: definiuje zakres designu, koordynuje faze badawcza (research UX + docs), nadzoruje budowe (designer + frontend), waliduje spojnosc i zapewnia, ze dokumentacja jest kompletna. NIE projektuje sam. NIE pisze CSS. NIE redaguje dokumentacji.

### Agent R-02: Researcher UX

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-02 |
| **Rola** | RESEARCH -- badanie trendow wizualnych, mood boardy, WCAG |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 50/100 |
| **Token budget** | ~20-30K |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep |

Researcher UX bada trendy na Dribbble, Behance, Awwwards. Tworzy mood board z minimum 5 referencjami. Audytuje standardy dostepnosci (WCAG 2.1/2.2 AA). Analizuje istniejace design systemy (Material Design, Apple HIG, Fluent). Produkuje raport z rekomendacjami dla Designera.

### Agent R-07: Researcher Docs

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-07 |
| **Rola** | RESEARCH -- dokumentacja frameworkow, best practices, changelogi |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 40/100 |
| **Token budget** | ~15-25K |
| **Narzedzia** | WebSearch, WebFetch, Read |

Researcher Docs zbiera informacje z oficjalnych dokumentacji frameworkow CSS (Tailwind, Radix, Shadcn/ui). Kompiluje getting started, best practices, changelogi i RFC. Jego raport informuje Designera o TECHNICZNYCH ograniczeniach i mozliwosciach, podczas gdy raport UX informuje o WIZUALNYCH trendach.

**Dlaczego DWA researchery?** Bo design system wymaga dwoch roznych typow wiedzy: (1) "Co jest teraz na topie wizualnie?" (UX) oraz (2) "Jak to technicznie zaimplementowac?" (Docs). Researcher UX mowi: "Glassmorphism jest trendy." Researcher Docs mowi: "backdrop-filter: blur() ma 96% wsparcia przegladarek, ale iOS Safari ma bug z border-radius."

### Agent B-02: Designer

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-02 |
| **Rola** | BUILD -- implementacja design tokenow, palety, typografii, CSS |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 55/100 |
| **Token budget** | ~30-50K |
| **Narzedzia** | Write, Edit, Read, Grep, Glob |

Designer to SERCE tego presetu. Otrzymuje raporty od obu researcherow i tworzy:
- Design tokeny (kolory, spacing, border-radius, shadow, z-index)
- Paleta kolorow (primary, secondary, accent, neutral, semantic)
- System typografii (font-family, font-size scale, line-height, letter-spacing)
- Animacje i przejscia (transition, keyframes, easing)
- Odpowiednik "brand book" w CSS

Designer NIE bada trendow (to robi UX), NIE szuka dokumentacji (to robi Docs), NIE pisze logiki komponentow (to robi Frontend). Designer IMPLEMENTUJE wizje na poziomie tokenow i CSS.

### Agent B-03: Frontend Dev

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-03 |
| **Rola** | BUILD -- komponenty, ARIA, responsive, implementacja |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 70/100 |
| **Token budget** | ~30-50K |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |

Frontend Dev bierze tokeny Designera i tworzy z nich dzialajace komponenty: buttony, inputy, karty, modale, nawigacje. Dodaje ARIA attributes (role, aria-label, aria-describedby). Implementuje responsive breakpoints. Testuje w przegladarce (Bash -> npm run dev). Frontend Dev to most miedzy abstrakcyjnym design systemem a konkretnym, dzialajacym kodem.

### Agent W-01: Redaktor

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | W-01 |
| **Rola** | BUILD/DOCS -- dokumentacja design systemu |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 35/100 |
| **Token budget** | ~15-25K |
| **Narzedzia** | Write, Edit, Read |

Redaktor tworzy dokumentacje design systemu -- opis kazdego tokenu, kazdy komponent z przykladami uzycia, guidelines "kiedy uzywac" i "kiedy NIE uzywac". Bez dokumentacji design system jest bezuzyteczny -- nikt nie wie, jak go uzywac. Redaktor to agent, ktory sprawia, ze design system jest UZYWALNY, nie tylko technicznie poprawny.

### Diagram architektury Design System

```
+===============================================================+
|                  PRESET: DESIGN SYSTEM                         |
|              Tier 3 PRO -- Design Pipeline                     |
|              6 agentow | ~150-250K | $0.12-$0.38              |
+===============================================================+
|                                                               |
|    Warstwa STRATEGIA:                                         |
|    +---------------------------------------------------+      |
|    |              ORKIESTRATOR (A-00)                   |      |
|    |              Opus | Load 50 | STRATEGIA            |      |
|    +----------+------------------------+----------+    |      |
|               |                        |               |      |
|               | pytania badawcze       | pytania docs  |      |
|               v                        v               |      |
|    Warstwa RESEARCH:                                          |
|    +-----------------+      +-----------------+               |
|    | RESEARCHER UX   |      | RESEARCHER DOCS |               |
|    | R-02 | Haiku    |      | R-07 | Haiku    |               |
|    | Load: 50        |      | Load: 40         |               |
|    | trendy, WCAG    |      | frameworki, RFC   |               |
|    +--------+--------+      +--------+---------+               |
|             |                         |                        |
|             | mood board + raport     | tech capabilities      |
|             v                         v                        |
|    Warstwa BUILD:                                              |
|    +-----------------+      +-----------------+               |
|    | DESIGNER (B-02) |      | FRONTEND (B-03) |               |
|    | Sonnet | Load 55|      | Sonnet | Load 70|               |
|    | tokeny, CSS     | ---> | komponenty, ARIA|               |
|    +-----------------+      +--------+--------+               |
|                                      |                        |
|                      tokeny + komponenty                      |
|                                      v                        |
|    Warstwa DOCS:                                              |
|    +-----------------------------------------+                |
|    |           REDAKTOR (W-01)               |                |
|    |           Sonnet | Load 35              |                |
|    |           dokumentacja design systemu   |                |
|    +-----------------------------------------+                |
|                                                               |
+===============================================================+
|  POLACZENIA:                                                  |
|    Orkiestrator -> Researcher UX      [one]                   |
|    Orkiestrator -> Researcher Docs    [one]                   |
|    Researcher UX -> Designer          [one]                   |
|    Researcher Docs -> Frontend Dev    [one]                   |
|    Designer -> Redaktor               [one]                   |
|    Frontend Dev -> Redaktor           [one]                   |
+===============================================================+
```

---

## 3. Preset #2: API Modernization -- Sklad zespolu

API Modernization to **6 agentow** w konfiguracji API Upgrade Pipeline. Cztery warstwy: analiza, research, build, QA.

### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | A-00 |
| **Rola** | STRATEGIA -- koordynacja, ewaluacja, walidacja |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50/100 |
| **Token budget** | ~20-35K |
| **Narzedzia** | Agent (delegacja), Read, Grep, Glob |

W API Modernization Orkiestrator pelni role **architekta systemowego**: definiuje zakres modernizacji, zleca analize obecnego stanu, koordynuje research technologiczny, nadzoruje refaktor backendu i integracje, waliduje raporty QA. Orkiestrator decyduje o strategii migracji: Big Bang vs Strangler Fig vs Feature Flags.

### Agent A-02: Analityk

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | A-02 |
| **Rola** | PLANOWANIE -- dekompozycja, mapowanie endpointow, analiza uzycia |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 55/100 |
| **Token budget** | ~25-40K |
| **Narzedzia** | Read, Grep, Glob, Write |

Analityk to pierwszy agent, ktory wchodzi do gry PO Orkiestratorze. Jego zadanie: ZMAPOWAC cale istniejace API. Ile jest endpointow? Ktore sa uzywane czesto, a ktore sa martwe? Jakie sa zaleznosci miedzy endpointami? Gdzie sa N+1 queries? Ktore endpointy lamiia REST conventions? Analityk produkuje "mape stanu obecnego" -- bez niej modernizacja jest strzelaniem na slepo.

**Kluczowa roznica vs Design System:** Design System zaczyna od ZEWNETRZNEGO researchu (trendy, inspiracje). API Modernization zaczyna od WEWNETRZNEJ analizy (istniejacy kod, endpointy, uzycie). To fundamentalnie inna strategia -- odkrywanie nowego vs mapowanie istniejacego.

### Agent R-01: Researcher Tech

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-01 |
| **Rola** | RESEARCH -- badanie technologii, benchmarki, porownania |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Token budget** | ~20-30K |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |

Researcher Tech bada opcje technologiczne NA PODSTAWIE mapy od Analityka. Jesli Analityk ustali, ze API ma 47 REST endpointow z problemami wersjonowania, Researcher Tech bada: GraphQL vs REST v2 vs gRPC -- co lepiej pasuje do TEGO KONKRETNEGO przypadku? Porownuje benchmarki, szuka case studies migracji, sprawdza ekosystem bibliotek.

### Agent B-01: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-01 |
| **Rola** | BUILD -- refaktor endpointow, implementacja nowego API |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Token budget** | ~35-60K |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |

Backend Dev to SILNIK tego presetu -- najwyzszy Load (75), najwiekszy budzet tokenow. Implementuje nowe endpointy, refaktoruje stare, dodaje wersjonowanie (v1 -> v2), pisze testy integracyjne. W przypadku migracji REST -> GraphQL: definiuje schema, resolvers, mutations. W przypadku wersjonowania: implementuje header-based lub URL-based versioning.

### Agent B-04: Integrator

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-04 |
| **Rola** | BUILD -- laczenie komponentow, testowanie polaczen |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 70/100 |
| **Token budget** | ~30-50K |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |

Integrator to kluczowy agent, ktorego NIE MA w Design System, a JEST w API Modernization. Dlaczego? Bo modernizacja API to nie pisanie kodu w izolacji -- to podlaczanie nowego API do ISTNIEJACEGO systemu. Integrator sprawdza, czy nowe endpointy dzialaja z istniejacymi klientami, czy migracja nie zrywa kompatybilnosci wstecznej, czy middleware i auth dzialaja poprawnie. Integrator to brama miedzy nowym a starym.

### Agent Q-02: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | Q-02 |
| **Rola** | QA/AUDYT -- testy, pokrycie, zgodnnosc ze specyfikacja |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Token budget** | ~20-30K |
| **Narzedzia** | Read, Grep, Bash (testy, lintery) |

QA Quality w API Modernization pelni role **audytora kontraktow API**. Sprawdza: czy nowe endpointy zwracaja poprawne statusy HTTP? Czy schemat odpowiedzi jest zgodny z dokumentacja? Czy backward compatibility jest zachowana? Czy testy pokrywaja happy path + edge cases + error paths? QA Quality NIGDY nie naprawia kodu -- raportuje i zwraca do Backendu lub Integratora.

**Kluczowa roznica vs Design System:** Design System NIE MA QA -- walidacja jest wbudowana w workflow Designera i Redaktora. API Modernization MA QA, bo bledne API moze zepsuc WSZYSTKICH klientow naraz. Ryzyko jest wielokrotnie wyzsze.

### Diagram architektury API Modernization

```
+===============================================================+
|              PRESET: API MODERNIZATION                         |
|          Tier 3 PRO -- API Upgrade Pipeline                    |
|          6 agentow | ~150-260K | $0.12-$0.40                 |
+===============================================================+
|                                                               |
|    Warstwa STRATEGIA:                                         |
|    +---------------------------------------------------+      |
|    |              ORKIESTRATOR (A-00)                   |      |
|    |              Opus | Load 50 | STRATEGIA            |      |
|    +------------------------+--------------------------+      |
|                             |                                 |
|                             | zakres modernizacji             |
|                             v                                 |
|    Warstwa PLANOWANIE:                                        |
|    +---------------------------------------------------+      |
|    |              ANALITYK (A-02)                       |      |
|    |              Sonnet | Load 55 | ANALIZA            |      |
|    |              mapa endpointow, zaleznosci           |      |
|    +------------------------+--------------------------+      |
|                             |                                 |
|                             | mapa stanu + wymagania          |
|                             v                                 |
|    Warstwa RESEARCH:                                          |
|    +---------------------------------------------------+      |
|    |           RESEARCHER TECH (R-01)                   |      |
|    |           Haiku | Load 55 | RESEARCH               |      |
|    |           benchmarki, opcje migracji               |      |
|    +-------------+-----------------+-------------------+      |
|                  |                 |                           |
|                  | rekomendacje    | tech capabilities        |
|                  v                 v                           |
|    Warstwa BUILD:                                             |
|    +-----------------+      +-----------------+               |
|    | BACKEND (B-01)  |      | INTEGRATOR(B-04)|               |
|    | Sonnet | Ld 75  |      | Sonnet | Ld 70  |               |
|    | nowe endpointy  | ---> | polaczenia,     |               |
|    | refaktor, testy |      | kompatybilnosc  |               |
|    +---------+-------+      +--------+--------+               |
|              |                       |                        |
|              +-------+-------+-------+                        |
|                      |                                        |
|                      v                                        |
|    Warstwa QA:                                                |
|    +---------------------------------------------------+      |
|    |              QA QUALITY (Q-02)                     |      |
|    |              Haiku | Load 55                       |      |
|    |              kontrakty API, testy, regresja        |      |
|    +---------------------------------------------------+      |
|                                                               |
+===============================================================+
|  POLACZENIA:                                                  |
|    Orkiestrator -> Analityk            [one]                  |
|    Analityk -> Researcher Tech         [one]                  |
|    Researcher Tech -> Backend Dev      [one]                  |
|    Researcher Tech -> Integrator       [one]                  |
|    Backend Dev -> QA Quality           [one]                  |
|    Integrator -> QA Quality            [one]                  |
+===============================================================+
```

---

## 4. Workflow Design System -- Krok po kroku

### INPUT: Co dostaje preset?

```
TYPOWY INPUT:
"Stworz design system dla naszej aplikacji SaaS. Obecny interfejs jest
niespojny -- kazda podstrona wyglada inaczej. Potrzebujemy: palety kolorow,
systemu typografii, spacing scale, komponentow (button, input, card, modal,
table) z wariantami, dark/light mode, dokumentacji."
```

### OUTPUT: Co produkuje preset?

```
ARTEFAKTY:
1. Design Tokens (CSS custom properties)     -- Designer
2. Paleta kolorow z kontrastem WCAG AA       -- Designer
3. System typografii (scale, line-height)    -- Designer
4. Komponenty HTML/CSS z wariantami          -- Frontend Dev
5. ARIA attributes i a11y                   -- Frontend Dev
6. Dokumentacja design systemu               -- Redaktor
```

### DLACZEGO TEN PRESET?

Uzyj Design System, gdy:
- Interfejs jest niespojny wizualnie
- Potrzebujesz "brand book" w kodzie (design tokeny)
- Tworzysz component library od zera
- Refaktorujesz CSS/SCSS w duzym projekcie
- Musisz spelnic WCAG 2.1/2.2 AA

NIE uzywaj, gdy:
- Potrzebujesz logiki biznesowej (brak backendu)
- Potrzebujesz audytu bezpieczenstwa (brak QA Security)
- Zmieniasz pojedynczy komponent (za duzy preset -- uzyj Solo lub Quick Fix)
- Potrzebujesz pelnego redesignu z analiza (uzyj UI/UX Overhaul z 7 agentami)

### Workflow ASCII

```
FAZA 1: RESEARCH (rownolegla)
=================================================================
  [Orkiestrator]
       |
       +---> [Researcher UX]       [Researcher Docs]
       |     Dribbble, Behance     Tailwind docs, Radix
       |     mood board            getting started
       |     WCAG audit            changelogi, RFC
       |     trend report          tech constraints
       |          |                       |
       |          v                       v
       |     RAPORT UX              RAPORT DOCS
       |     (trendy, mood,         (mozliwosci tech,
       |      a11y, inspiracje)      ograniczenia, API)
       |
FAZA 2: BUILD (sekwencyjna z fork)
=================================================================
       |
       +---> [Designer]             [Frontend Dev]
       |     <- RAPORT UX           <- RAPORT DOCS
       |     tokeny CSS             <- tokeny od Designera
       |     paleta kolorow         komponenty HTML
       |     typografia             ARIA attributes
       |     animacje               responsive
       |     spacing scale          testy przegladarkowe
       |          |                       |
       |          v                       v
       |     DESIGN TOKENS          COMPONENT LIBRARY
       |     (CSS :root)            (HTML + CSS + ARIA)
       |
FAZA 3: DOKUMENTACJA
=================================================================
       |
       +---> [Redaktor]
             <- DESIGN TOKENS
             <- COMPONENT LIBRARY
             dokumentacja uzycia
             guidelines "do/don't"
             przyklady kodu
                   |
                   v
             DESIGN SYSTEM DOCS
             (pelna dokumentacja)
=================================================================
  CZAS: ~120-240s | TOKENY: ~150-250K | KOSZT: $0.12-$0.38
```

### Szczesolowy przebieg -- 12 krokow

```
KROK  AGENT              AKCJA                          CZAS    TOKENY
----  -----------------  ------------------------------ ------  -------
 1    Orkiestrator       Parsuje request, definiuje     ~8s     ~5K
                         zakres designu
 2    Orkiestrator       Deleguje do Researcher UX:     ~3s     ~2K
                         "Zbadaj trendy dla SaaS
                         dashboard 2026"
 3    Orkiestrator       Deleguje do Researcher Docs:   ~3s     ~2K
                         "Zbadaj Tailwind v4, Radix,
                         Shadcn/ui"
 4    Researcher UX      Szuka na Dribbble, Behance,    ~25s    ~25K
                         Awwwards. Buduje mood board.
                         Audytuje WCAG. Raport.
 5    Researcher Docs    Szuka w dokumentacjach.         ~20s    ~20K
                         Kompiluje best practices.
                         Changelogi. Raport.
 6    Orkiestrator       Otrzymuje oba raporty.          ~5s     ~3K
                         Deleguje do Designera.
 7    Designer           Na bazie raportu UX tworzy     ~40s    ~40K
                         tokeny, palette, typografie,
                         animacje, spacing.
 8    Orkiestrator       Przekazuje tokeny do Frontend. ~3s     ~2K
 9    Frontend Dev       Na bazie tokenow + raportu     ~45s    ~50K
                         docs: komponenty, ARIA,
                         responsive, testy.
10    Orkiestrator       Zbiera artefakty. Deleguje     ~3s     ~2K
                         do Redaktora.
11    Redaktor           Dokumentuje caly design        ~25s    ~20K
                         system: tokeny, komponenty,
                         guidelines, przyklady.
12    Orkiestrator       Walidacja finalna. Sprawdza    ~10s    ~5K
                         spojnosc, kompletnosc.
                         Dostarcza wynik.
----  -----------------  ------------------------------ ------  -------
                         SUMA                           ~190s   ~176K
                         KOSZT                                  ~$0.22
```

---

## 5. Workflow API Modernization -- Krok po kroku

### INPUT: Co dostaje preset?

```
TYPOWY INPUT:
"Nasze REST API (v1) ma 47 endpointow, z czego 12 jest deprecated ale
ciagle uzywanych. Brak wersjonowania — kazda zmiana lamiie klientow.
Chcemy: migracje do GraphQL dla glownych zasobow, wersjonowanie URL-based
dla legacy REST, refaktor N+1 queries, dokumentacje OpenAPI 3.1."
```

### OUTPUT: Co produkuje preset?

```
ARTEFAKTY:
1. Mapa istniejacego API (endpointy, uzycie)    -- Analityk
2. Raport technologiczny (GraphQL vs REST v2)    -- Researcher Tech
3. Nowe endpointy / GraphQL schema               -- Backend Dev
4. Integracja z istniejacym systemem             -- Integrator
5. Raport QA (testy, kompatybilnosc)             -- QA Quality
6. Strategia migracji (Orkiestrator)             -- Orkiestrator
```

### DLACZEGO TEN PRESET?

Uzyj API Modernization, gdy:
- Migrujesz REST -> GraphQL (lub REST v1 -> v2)
- Potrzebujesz wersjonowania API
- Refaktorujesz endpointy (N+1 queries, over-fetching)
- Modernizujesz kontrakt API (OpenAPI 3.1)
- Lacznisz legacy API z nowym systemem

NIE uzywaj, gdy:
- Potrzebujesz zmian w UI (brak frontendu)
- Piszesz API od zera (to nie modernizacja -- uzyj Standard Dev)
- Potrzebujesz pelnego audytu bezpieczenstwa (brak QA Security -- uzyj Security Hardening)
- Zmieniasz jeden endpoint (za duzy preset -- uzyj Solo lub Quick Fix)

### Workflow ASCII

```
FAZA 1: ANALIZA (sekwencyjna)
=================================================================
  [Orkiestrator]
       |
       +---> [Analityk]
       |     mapowanie endpointow
       |     analiza uzycia (ktore zywe, ktore martwe)
       |     identyfikacja N+1 queries
       |     zaleznosci miedzy endpointami
       |     raport zlozonosci (S/M/L/XL)
       |          |
       |          v
       |     MAPA STANU API
       |     (47 endpointow, 12 deprecated,
       |      15 z N+1, 8 bez walidacji)
       |
FAZA 2: RESEARCH (sekwencyjna)
=================================================================
       |
       +---> [Researcher Tech]
       |     <- MAPA STANU (kontekst od Analityka)
       |     GraphQL vs REST v2 vs gRPC
       |     benchmarki migracji
       |     case studies (Shopify, GitHub)
       |     ekosystem narzedzi
       |          |
       |          v
       |     RAPORT TECHNOLOGICZNY
       |     (rekomendacja: GraphQL dla X,
       |      REST v2 dla Y, deprecation plan)
       |
FAZA 3: BUILD (rownolegle z fork)
=================================================================
       |
       +---> [Backend Dev]          [Integrator]
       |     <- RAPORT TECH          <- RAPORT TECH
       |     nowe endpointy          polaczenia z klientami
       |     GraphQL schema          middleware, auth
       |     resolvers, mutations    backward compatibility
       |     testy jednostkowe       testy integracyjne
       |          |                       |
       |          v                       v
       |     NOWE API               INTEGRATION LAYER
       |     (schema + resolvers)   (adaptery, proxy)
       |
FAZA 4: QA
=================================================================
       |
       +---> [QA Quality]
             <- NOWE API
             <- INTEGRATION LAYER
             testy kontraktow
             backward compatibility
             pokrycie edge cases
             raport PASS/FAIL
                   |
                   v
             QA REPORT
             (PASS/FAIL + szczegoly)
=================================================================
  CZAS: ~150-300s | TOKENY: ~150-260K | KOSZT: $0.12-$0.40
```

### Szczesolowy przebieg -- 14 krokow

```
KROK  AGENT              AKCJA                          CZAS    TOKENY
----  -----------------  ------------------------------ ------  -------
 1    Orkiestrator       Parsuje request, definiuje     ~10s    ~5K
                         strategie migracji
 2    Orkiestrator       Deleguje do Analityka:         ~3s     ~2K
                         "Zmapuj cale API v1"
 3    Analityk           Skanuje codebase. Mapuje       ~35s    ~35K
                         endpointy. Analiza uzycia.
                         Identyfikuje N+1. Raport.
 4    Orkiestrator       Otrzymuje mape. Deleguje       ~5s     ~3K
                         do Researcher Tech.
 5    Researcher Tech    Na bazie mapy bada opcje       ~25s    ~25K
                         migracji. GraphQL vs REST v2.
                         Benchmarki. Case studies.
 6    Orkiestrator       Otrzymuje raport tech.         ~5s     ~3K
                         Decyduje o strategii.
                         Deleguje do Backend + Integr.
 7    Backend Dev        Implementuje nowe endpointy.   ~50s    ~55K
                         GraphQL schema. Resolvers.
                         Testy jednostkowe.
 8    Integrator         Implementuje warstwa           ~45s    ~45K
                         integracji. Adaptery.
                         Backward compatibility.
                         Middleware. Auth. Testy.
 9    Orkiestrator       Zbiera artefakty od obu        ~5s     ~3K
                         builderow. Deleguje do QA.
10    QA Quality         Testuje nowe API.              ~30s    ~25K
                         Kontrakty. Regresja.
                         Edge cases. Raport.
11    Orkiestrator       Analizuje raport QA.           ~5s     ~3K
                         Jesli PASS -> krok 14.
                         Jesli FAIL -> krok 12.
12    Backend Dev (opt)  Naprawia issues z raportu QA.  ~20s    ~15K
13    QA Quality (opt)   Re-test po naprawach.          ~15s    ~10K
14    Orkiestrator       Walidacja finalna.             ~8s     ~5K
                         Dostarcza wynik.
----  -----------------  ------------------------------ ------  -------
                         SUMA (bez iteracji)            ~223s   ~206K
                         KOSZT (bez iteracji)                   ~$0.28
                         SUMA (z 1 iteracja)            ~258s   ~231K
                         KOSZT (z 1 iteracja)                   ~$0.33
```

---

## 6. Porownanie -- Design System vs API Modernization

### Tabela porownawcza

| Wymiar | Design System | API Modernization |
|--------|--------------|-------------------|
| **Ikona** | Paleta | Wtyczka |
| **Tier** | 3 PRO | 3 PRO |
| **Agentow** | 6 | 6 |
| **Wzorzec** | Design Pipeline | API Upgrade Pipeline |
| **Kierunek** | Outside-In (od UX do kodu) | Inside-Out (od kodu do API) |
| **Rozpoczyna** | Research (trendy zewnetrzne) | Analiza (kod wewnetrzny) |
| **Warstwy** | Research -> Build -> Docs | Analiza -> Research -> Build -> QA |
| **Research typ** | UX + Docs (wizualny + techiczny) | Tech (technologiczny) |
| **Builderzy** | Designer + Frontend Dev | Backend Dev + Integrator |
| **QA** | BRAK (walidacja wbudowana) | QA Quality (audyt kontraktow) |
| **Dokumentacja** | Redaktor (dedykowany agent) | Orkiestrator (inline) |
| **Tokeny** | ~150-250K | ~150-260K |
| **Koszt** | $0.12-$0.38 | $0.12-$0.40 |
| **Latencja** | ~120-240s | ~150-300s |
| **Rownolegosc** | Faza 1: UX + Docs parallel | Faza 3: Backend + Integrator parallel |
| **Ryzyko** | Niskie (wizualne zmiany) | Srednie (breaking changes API) |
| **Odwracalnosc** | Wysoka (CSS rollback) | Niska (klienci juz uzywaja nowego API) |
| **Use case** | Component library, style guide | REST->GraphQL, wersjonowanie |

### Wspolne cechy

Mimo fundamentalnych roznic, oba presety dziela kilka cech:

1. **Szesc agentow** -- Tier 3 PRO sweet spot. Wystarczajaco duzo na specjalizacje, wystarczajaco malo na kontrole.
2. **Orkiestrator na Opus** -- najdrozszy model do najwazniejszych decyzji.
3. **Researcherzy na Haiku** -- najtanszy model do zbierania danych (Smart Model Routing).
4. **Builderzy na Sonnet** -- sredni model do implementacji.
5. **Polaczenia typu `one`** -- wszystkie polaczenia sa jednorazowe. Brak petli zwrotnych (w odroznieniu od Quick Fix).
6. **Brak dedykowanego QA Security** -- zadnen z tych presetow nie audytuje bezpieczenstwa. Jesli potrzebujesz, eskaluj do Security Hardening.

### Kluczowe roznnice

```
DESIGN SYSTEM:                     API MODERNIZATION:
 "Co widzi uzytkownik?"             "Co laczy systemy?"
  +-----------+                      +-----------+
  | Research  |  (2 researchery)     | Analiza   |  (1 analityk)
  +-----------+                      +-----------+
       |                                  |
  +-----------+                      +-----------+
  |   Build   |  (designer+FE)      | Research  |  (1 researcher)
  +-----------+                      +-----------+
       |                                  |
  +-----------+                      +-----------+
  |   Docs    |  (redaktor)         |   Build   |  (backend+integr)
  +-----------+                      +-----------+
                                          |
                                     +-----------+
                                     |    QA     |  (qa quality)
                                     +-----------+

  3 warstwy, szersze na gorze         4 warstwy, waskie/glebsze
  (2 researchery -> 2 builderzy)     (1 analityk -> 1 researcher
                                      -> 2 builderzy -> 1 QA)
```

### Metryka zlozonosci komunikacyjnej

```
Design System:
  Polaczenia: 6
  Agenci: 6
  Ratio: 1.0 (polaczenie/agent)
  Topology: Wide (2+2+1+1)

API Modernization:
  Polaczenia: 6
  Agenci: 6
  Ratio: 1.0 (polaczenie/agent)
  Topology: Deep (1+1+1+2+1)
```

Oba presety maja identyczny ratio 1.0, ale ZUPELNIE inna topologie. Design System jest "szeroki" -- dwa researchery przekazuja do dwoch builderow. API Modernization jest "gleboki" -- kazda warstwa ma jednego agenta, az do fork na Build.

---

## 7. Przypadki uzycia i realne scenariusze

### Scenariusz 1: Design System -- Startup po Series A

**Kontekst:** Startup fintech po rundzie Series A. Produkt wzrosl z 3 do 15 podstron. Kazdy sprint dowal nowe style, bo nie bylo design systemu. Przycisk "Zapisz" ma 4 rozne warianty na roznych podstronach. Kolory sa niezdefiniowane -- kazdy developer dobiera "na oko."

**INPUT:**
```
"Zbuduj design system dla aplikacji fintech. Mamy: dashboard, ustawienia,
transakcje, raporty, onboarding. Obecne CSS to chaos -- 3 rozne odcienie
niebieskiego, 2 rozne fonty, brak tokenow. Potrzebujemy spojnosci."
```

**PRZEBIEG:**
1. Researcher UX bada: trendy fintech 2026 (dark mode, data visualization palettes), WCAG dla finansow (regulacje a11y)
2. Researcher Docs bada: Tailwind v4 tokeny, Radix Themes API, Chart.js color schemes
3. Designer tworzy: palette (brand blue #1E40AF, accent emerald #10B981, danger red #DC2626), typografia (Inter body, JetBrains Mono numbers), spacing 4px grid, tokeny w CSS custom properties
4. Frontend Dev buduje: Button (primary/secondary/ghost/danger), Input (text/number/date), Card (default/hover/active), Modal (small/medium/large), Table (sortable/filterable)
5. Redaktor dokumentuje: kazdy token z przykladem, kazdy komponent z kodem, guidelines "kiedy uzywac primary vs secondary button"

**OUTPUT:**
```
design-system/
  tokens/
    colors.css          (palette: 24 tokeny)
    typography.css      (fonts: 12 tokenow)
    spacing.css         (spacing: 8 tokenow)
    shadows.css         (shadows: 5 tokenow)
    animations.css      (transitions: 6 tokenow)
  components/
    button.html         (4 warianty, 3 rozmiary)
    input.html          (5 typow, stanow error/success)
    card.html           (3 warianty)
    modal.html          (3 rozmiary)
    table.html          (sortable, filterable)
  docs/
    design-system.md    (pelna dokumentacja)
    guidelines.md       (do's and don'ts)
```

**METRYKI:** ~180K tokenow, ~$0.24, ~180 sekund.

### Scenariusz 2: Design System -- Rebranding korporacyjny

**Kontekst:** Korporacja zmienia identyfikacje wizualna. Nowe logo, nowe kolory, nowa typografia. Trzeba zaaplikowac nowy branding do wszystkich wewnetrznych narzedzi (intranet, CRM, ticketing).

**INPUT:**
```
"Nowy branding: primary #6366F1 (indigo), secondary #EC4899 (pink),
font: Geist (body) + Geist Mono (code). Zaaplikuj do design systemu
z dark/light mode. 12 komponentow core."
```

**PRZEBIEG:** Researcher UX bada, jak najlepsze firmy implementuja rebranding (Figma case study, Spotify rebrand). Researcher Docs bada font Geist (variable font, subsetting, performance). Designer implementuje nowe tokeny z auto-dark-mode. Frontend buduje 12 komponentow. Redaktor dokumentuje migracje ze starego na nowy branding.

**METRYKI:** ~220K tokenow, ~$0.30, ~210 sekund.

### Scenariusz 3: API Modernization -- REST -> GraphQL

**Kontekst:** E-commerce platform z monolitycznym REST API (87 endpointow). Klienci mobilni narzekaja na over-fetching -- endpoint /products zwraca 40 pol, a aplikacja potrzebuje 6. Decyzja: migracja glownych zasobow do GraphQL, legacy do REST v2.

**INPUT:**
```
"Migracja API e-commerce. 87 REST endpointow, z czego 23 to produkty,
zamowienia, uzytkownicy (czeste). Reszta to admin, raporty (rzadkie).
Cel: GraphQL dla czestych, REST v2 z wersjonowaniem dla reszty.
Zachowaj backward compatibility min. 6 miesiecy."
```

**PRZEBIEG:**
1. Analityk mapuje 87 endpointow: 23 "hot" (>1000 req/dzien), 34 "warm" (100-1000), 30 "cold" (<100)
2. Researcher Tech bada: Apollo Server vs Yoga vs Mercurius, schema-first vs code-first, case study Shopify GraphQL migration
3. Backend Dev implementuje: GraphQL schema (Product, Order, User types), resolvers z DataLoader (eliminacja N+1), REST v2 z /api/v2/ prefix i header Accept-Version
4. Integrator podlacza: GraphQL gateway z istniejacym auth (JWT), REST v2 proxy dla legacy klientow, monitoring (latency, error rate)
5. QA Quality testuje: kontrakty GraphQL (introspection), backward compat REST v1 vs v2, edge cases (empty cart, deleted user, concurrent orders)

**OUTPUT:**
```
api-v2/
  graphql/
    schema.graphql      (types, queries, mutations)
    resolvers/          (product, order, user)
    dataloader.js       (N+1 elimination)
  rest-v2/
    routes/             (wersjonowane endpointy)
    middleware/          (version routing)
  integration/
    gateway.js          (GraphQL + REST proxy)
    auth-adapter.js     (JWT bridge)
  tests/
    contract.test.js    (schema validation)
    compat.test.js      (v1 vs v2 parity)
    load.test.js        (performance baseline)
```

**METRYKI:** ~240K tokenow, ~$0.36, ~270 sekund.

### Scenariusz 4: API Modernization -- Wersjonowanie endpointow

**Kontekst:** SaaS B2B z 200 klientami. Kazda zmiana API lamie integracje. Brak wersjonowania. Klienci zagrozili odejsciem jesli sytuacja sie nie poprawi.

**INPUT:**
```
"Wprowadz wersjonowanie URL-based (/api/v1/, /api/v2/) z sunset policy
(6 miesiecy od deprecation). 34 endpointy. Zachowaj v1 bez zmian.
V2: zmien snake_case na camelCase, dodaj pagination, poprawa error codes."
```

**PRZEBIEG:** Analityk mapuje 34 endpointy i identyfikuje breaking changes (case, pagination, error format). Researcher Tech bada best practices wersjonowania (URL vs header vs query param), sunset policy (Stripe model), migration guides. Backend Dev implementuje router wersji, nowe endpointy v2, deprecation headers. Integrator testuje z 5 glownymi klientami (sandbox). QA Quality sprawdza paritate v1/v2, deprecation headers, error codes.

**METRYKI:** ~200K tokenow, ~$0.28, ~220 sekund.

---

## 8. Anti-patterny -- Czego NIE robic

### Anti-patterny Design System

| # | Anti-pattern | Dlaczego to problem | Co robic zamiast |
|---|-------------|--------------------|--------------------|
| 1 | **Uzycie do logiki biznesowej** | Design System NIE MA backendu. Nie zbudujesz walidacji formularza, nie napiszesz API call, nie zaimplementujesz auth. | Uzyj Standard Dev lub Feature Sprint |
| 2 | **Pominiecje Researcher UX** | Designer bez raportu UX tworzy design na podstawie swoich "preferencji" -- to nie system, to osobista estetyka | ZAWSZE zacznij od researchu trendow |
| 3 | **Pominiecje Researcher Docs** | Frontend Dev bez raportu docs uzywa outdated API frameworka. Tailwind v3 syntax w projekcie Tailwind v4 | ZAWSZE zbadaj aktualna dokumentacje |
| 4 | **Design bez tokenow** | Hardcoded kolory (#1E40AF w 47 miejscach). Zmiana brandy = edycja 47 plikow | ZAWSZE tokeny jako CSS custom properties |
| 5 | **Brak dokumentacji** | Design system bez docs = design system, ktorego nikt nie uzywa. Nowy developer nie wie, ze istnieje --color-primary | Redaktor MUSI dokumentowac KAZDY token |
| 6 | **Uzywanie do jednego komponentu** | 6 agentow na jeden przycisk? Overkill. Solo (2 agenty) wystarczy | Uzywaj do SYSTEMU, nie do elementu |

### Anti-patterny API Modernization

| # | Anti-pattern | Dlaczego to problem | Co robic zamiast |
|---|-------------|--------------------|--------------------|
| 1 | **Modernizacja bez analizy** | Bez mapy endpointow refaktorujesz slepo. Pominiesz krytyczne endpointy. Zlamiesz integracje, o ktorych nie wiedziales | ZAWSZE zacznij od Analityka |
| 2 | **Big Bang migration** | Wymieniasz CALE API naraz. Jeden bug = WSZYSTKO nie dziala. 200 klientow naraz zglasza bledy | Strangler Fig: migruj endpoint po endpoincie |
| 3 | **Brak backward compatibility** | Nowe API lamie starych klientow. Klienci traca dane, zaufanie, cierpliwosc | ZAWSZE zachowaj stare API przez sunset period |
| 4 | **Pominiecje Integratora** | Backend Dev pisze piekne nowe API. Ale nie testuje z istniejacymi klientami. Deploy = katastrofa | Integrator MUSI testowac polaczenia |
| 5 | **Pominiecje QA** | "Testy przechodza na moim komputerze." Produkcja: 500 Internal Server Error | QA Quality testuje z perspektywy KLIENTA |
| 6 | **Nowe API od zera** | To NIE jest preset do budowania nowego API -- to preset do MODERNIZACJI istniejacego. Budowanie od zera to Standard Dev | Uzywaj do refaktoru, nie do greenfield |

---

## 9. Sciezki eskalacji

### Kiedy Design System nie wystarczy?

```
SCENARIUSZ                         ESKALACJA DO            DLACZEGO
---------------------------------  ----------------------  ----------------------
Potrzebujesz logiki biznesowej     Feature Sprint (7)      Dodaje Backend Dev
Potrzebujesz audytu a11y           Accessibility Sprint(5) Dodaje QA Quality
Potrzebujesz pelnego redesignu     UI/UX Overhaul (7)      Dodaje Analityka
Potrzebujesz BE + FE + design      Standard Dev (8)        Pelny cykl
Potrzebujesz security review       Security Hardening (6)  3x QA + Manager
Zadanie jest za proste              Solo (2) / Trio (3)    Mniej narzutu
```

### Kiedy API Modernization nie wystarczy?

```
SCENARIUSZ                         ESKALACJA DO            DLACZEGO
---------------------------------  ----------------------  ----------------------
Potrzebujesz zmian w UI            Feature Sprint (7)      Dodaje Frontend Dev
Potrzebujesz audytu security       Security Hardening (6)  3x QA specjalistyczne
Potrzebujesz data pipeline         Data Pipeline (8)       Dodaje Feature Dev
Potrzebujesz pelnego stacku        Standard Dev (8)        Pelny cykl
Potrzebujesz analizy rynku         Research Swarm (9)      6 researcherow
Zadanie jest za proste              Solo (2) / Quick Fix(3) Mniej narzutu
```

### Eskalacja krokowa

```
DESIGN SYSTEM -- Eskalacja po FAIL:
  Iteracja 1: Designer poprawia tokeny na feedback Orkiestratora
  Iteracja 2: Frontend poprawia komponenty
  Iteracja 3: ESKALACJA -> dodaj QA Quality (staje sie custom 7-agent)
  Iteracja 4: ESKALACJA -> UI/UX Overhaul (pelny 7-agent preset)

API MODERNIZATION -- Eskalacja po QA FAIL:
  Iteracja 1: Backend Dev naprawia issues z raportu QA
  Iteracja 2: Integrator poprawia kompatybilnosc
  Iteracja 3: ESKALACJA -> dodaj QA Security (staje sie custom 7-agent)
  Iteracja 4: ESKALACJA -> Security Hardening (6-agent z trojka QA)
```

---

## 10. Drzewo decyzyjne -- Ktory preset wybrac?

```
START: Masz zadanie do wykonania
  |
  +-- Dotyczy WYGLADU (kolory, fonty, komponenty)?
  |     |
  |     +-- Jeden komponent? --> Solo (2) lub Quick Fix (3)
  |     |
  |     +-- Caly system wizualny?
  |           |
  |           +-- Masz istniejacy design? --> UI/UX Overhaul (7)
  |           |
  |           +-- Budujesz od zera? --> DESIGN SYSTEM (6) <===
  |           |
  |           +-- Tylko a11y audit? --> Accessibility Sprint (5)
  |
  +-- Dotyczy API / BACKENDU (endpointy, schema, kontrakt)?
  |     |
  |     +-- Jeden endpoint? --> Solo (2) lub Quick Fix (3)
  |     |
  |     +-- Modernizacja istniejacego API?
  |           |
  |           +-- Bez zmian w UI? --> API MODERNIZATION (6) <===
  |           |
  |           +-- Ze zmianami w UI? --> Feature Sprint (7)
  |           |
  |           +-- Z audytem security? --> Security Hardening (6)
  |
  +-- Dotyczy OBU (frontend + backend)?
  |     |
  |     +-- Feature z UI + API? --> Feature Sprint (7)
  |     |
  |     +-- Pelny projekt? --> Standard Dev (8)
  |
  +-- Nie wiesz? --> Recon Squad (3) na rozpoznanie
```

### Macierz decyzyjna szybka

```
                         FRONTEND    BACKEND    SECURITY    RESEARCH
                         --------    -------    --------    --------
Design System              TAK         NIE        NIE         TAK
API Modernization          NIE         TAK        NIE         TAK
Security Hardening         NIE         TAK        TAK         NIE
Feature Sprint             TAK         TAK        NIE         TAK
UI/UX Overhaul            TAK         NIE        NIE         TAK
Standard Dev              TAK         TAK        TAK         TAK
```

---

## 11. Analiza kosztow

### Rozklad kosztow Design System

```
AGENT              MODEL    TOKENY      KOSZT INPUT    KOSZT OUTPUT    SUMA
-----------------  ------   ---------   -----------    ------------    -------
Orkiestrator       Opus     ~20-35K     $0.30-0.53     $0.08-0.15     ~$0.45
Researcher UX      Haiku    ~20-30K     $0.02-0.02     $0.01-0.01     ~$0.03
Researcher Docs    Haiku    ~15-25K     $0.01-0.02     $0.01-0.01     ~$0.02
Designer           Sonnet   ~30-50K     $0.09-0.15     $0.05-0.08     ~$0.16
Frontend Dev       Sonnet   ~30-50K     $0.09-0.15     $0.05-0.08     ~$0.16
Redaktor           Sonnet   ~15-25K     $0.05-0.08     $0.03-0.04     ~$0.09
-----------------  ------   ---------   -----------    ------------    -------
SUMA                        ~150-250K                                  $0.12-$0.38

DOMINUJACY KOSZT: Orkiestrator (Opus) = ~50% calkowitego kosztu
OPTYMALIZACJA: Researcherzy na Haiku = ~5% kosztu za ~30% tokenow
```

### Rozklad kosztow API Modernization

```
AGENT              MODEL    TOKENY      KOSZT INPUT    KOSZT OUTPUT    SUMA
-----------------  ------   ---------   -----------    ------------    -------
Orkiestrator       Opus     ~20-35K     $0.30-0.53     $0.08-0.15     ~$0.45
Analityk           Sonnet   ~25-40K     $0.08-0.12     $0.04-0.06     ~$0.14
Researcher Tech    Haiku    ~20-30K     $0.02-0.02     $0.01-0.01     ~$0.03
Backend Dev        Sonnet   ~35-60K     $0.11-0.18     $0.06-0.09     ~$0.19
Integrator         Sonnet   ~30-50K     $0.09-0.15     $0.05-0.08     ~$0.16
QA Quality         Haiku    ~20-30K     $0.02-0.02     $0.01-0.01     ~$0.03
-----------------  ------   ---------   -----------    ------------    -------
SUMA                        ~150-260K                                  $0.12-$0.40

DOMINUJACY KOSZT: Orkiestrator (Opus) = ~45% calkowitego kosztu
NAJDROZSZY BUILDER: Backend Dev (Sonnet, Load 75) = ~19% kosztu
OPTYMALIZACJA: Haiku agenci (Research + QA) = ~6% kosztu za ~25% tokenow
```

### Porownanie z innymi presetami

```
PRESET                    AGENTOW   TOKENY        KOSZT         KOSZT/AGENT
-----------------------   -------   -----------   -----------   -----------
Solo (Tier 1)             2         ~40-80K       $0.04-$0.15   $0.04
Quick Fix (Tier 1)        3         ~80-120K      $0.08-$0.20   $0.05
Recon (Tier 1)            3         ~80-120K      $0.08-$0.20   $0.05
*Design System (Tier 3)*  6         ~150-250K     $0.12-$0.38   $0.04
*API Modern. (Tier 3)*    6         ~150-260K     $0.12-$0.40   $0.04
Feature Sprint (Tier 3)   7         ~180-300K     $0.15-$0.48   $0.04
Standard Dev (Tier 3)     8         ~250-400K     $0.25-$0.65   $0.06
Full Team (Tier 4)        13        ~400-700K     $0.50-$1.20   $0.06

INSIGHT: Koszt/agent dla Tier 3 PRO (~$0.04) jest NIZSZY niz dla
Tier 4 (~$0.06) -- Smart Model Routing. Haiku na research i QA
obnizy koszt per agent.
```

### ROI -- Zwrot z inwestycji

**Design System ROI:**
- Koszt: ~$0.25 (srednia)
- Oszczednosc: eliminacja "CSS chaos" = ~2-4h pracy developera na sprint
- ROI: 1 przebieg presetu zastepuje ~$100-200 pracy ludzkiej (design system od zera)

**API Modernization ROI:**
- Koszt: ~$0.30 (srednia)
- Oszczednosc: eliminacja breaking changes = ~5-10h pracy devops + support na miesiac
- ROI: 1 przebieg presetu zastepuje ~$200-500 pracy ludzkiej (migracja API)

---

## 12. Quick Reference Cards

### Design System -- Quick Reference

```
+================================================================+
|                   DESIGN SYSTEM                                 |
|           Tier 3 PRO | 6 agentow | Design Pipeline            |
+================================================================+
|                                                                |
|  SKLAD:                                                        |
|    [A-00] Orkiestrator     Opus    | Load 50 | STRATEGIA       |
|    [R-02] Researcher UX    Haiku   | Load 50 | RESEARCH        |
|    [R-07] Researcher Docs  Haiku   | Load 40 | RESEARCH        |
|    [B-02] Designer         Sonnet  | Load 55 | BUILD           |
|    [B-03] Frontend Dev     Sonnet  | Load 70 | BUILD           |
|    [W-01] Redaktor         Sonnet  | Load 35 | DOCS            |
|                                                                |
|  FLOW:                                                         |
|    Ork -> UX + Docs (parallel) -> Designer -> Frontend -> Red  |
|                                                                |
|  OUTPUT: tokeny CSS, paleta, typografia, komponenty, docs      |
|                                                                |
|  METRYKI:                                                      |
|    Tokeny: ~150-250K | Koszt: $0.12-$0.38 | Czas: ~120-240s  |
|                                                                |
|  UZYWAJ DO: component library, style guide, CSS refaktor,     |
|             branding, WCAG compliance, design tokens           |
|                                                                |
|  NIE UZYWAJ DO: logika biznesowa, security, backend, API      |
|                                                                |
|  ESKALACJA:                                                    |
|    +logika -> Feature Sprint | +analiza -> UI/UX Overhaul     |
|    za proste -> Solo / Trio | +security -> Security Hardening  |
+================================================================+
```

### API Modernization -- Quick Reference

```
+================================================================+
|               API MODERNIZATION                                 |
|       Tier 3 PRO | 6 agentow | API Upgrade Pipeline           |
+================================================================+
|                                                                |
|  SKLAD:                                                        |
|    [A-00] Orkiestrator     Opus    | Load 50 | STRATEGIA       |
|    [A-02] Analityk         Sonnet  | Load 55 | PLANOWANIE      |
|    [R-01] Researcher Tech  Haiku   | Load 55 | RESEARCH        |
|    [B-01] Backend Dev      Sonnet  | Load 75 | BUILD           |
|    [B-04] Integrator       Sonnet  | Load 70 | BUILD           |
|    [Q-02] QA Quality       Haiku   | Load 55 | QA/AUDYT        |
|                                                                |
|  FLOW:                                                         |
|    Ork -> Analityk -> Res.Tech -> Backend + Integr. -> QA      |
|                                                                |
|  OUTPUT: mapa API, raport tech, nowe endpointy, integracja,   |
|          raport QA, strategia migracji                         |
|                                                                |
|  METRYKI:                                                      |
|    Tokeny: ~150-260K | Koszt: $0.12-$0.40 | Czas: ~150-300s  |
|                                                                |
|  UZYWAJ DO: REST->GraphQL, wersjonowanie, refaktor endpoint,  |
|             modernizacja kontraktu, OpenAPI migration           |
|                                                                |
|  NIE UZYWAJ DO: frontend, nowe API od zera, security audit    |
|                                                                |
|  ESKALACJA:                                                    |
|    +frontend -> Feature Sprint | +security -> Sec.Hardening   |
|    za proste -> Solo / Quick Fix | +data -> Data Pipeline      |
+================================================================+
```

---

## 13. Slowniczek (Glossary)

| Termin | Definicja |
|--------|-----------|
| **Design Pipeline** | Wzorzec architektoniczny: research -> design -> build -> docs. Liniowy z forkiem na research. |
| **API Upgrade Pipeline** | Wzorzec: analiza -> research -> build -> QA. Liniowy z forkiem na build. |
| **Design Tokeny** | Zmienne CSS (custom properties) definiujace kolory, spacing, typografie. Zrodlo prawdy design systemu. |
| **Mood Board** | Tablica wizualnych inspiracji: screenshoty, palety, fonty, animacje. Minimum 5 referencji. |
| **WCAG** | Web Content Accessibility Guidelines. Standard dostepnosci. AA = minimum, AAA = idealne. |
| **Backward Compatibility** | Nowe API nie lamie starych klientow. Stare endpointy dzialaja jak wczesniej. |
| **Strangler Fig** | Strategia migracji: nowy system obrasta stary, az stary obumiera. Endpoint po endpoincie. |
| **Big Bang Migration** | Strategia migracji: wymiana calego API naraz. Wysokie ryzyko, szybki efekt. |
| **Sunset Policy** | Okres, po ktorym stare API zostanie wylaczone. Typowo 6-12 miesiecy. |
| **N+1 Query** | Anti-pattern: 1 query po liste + N queries po szczegoly kazdego elementu. GraphQL DataLoader to fix. |
| **Over-fetching** | API zwraca wiecej danych niz klient potrzebuje. GraphQL rozwiazuje przez selektywne query. |
| **Schema-first** | Podejscie GraphQL: najpierw piszesz .graphql schema, potem implementujesz resolvers. |
| **Code-first** | Podejscie GraphQL: piszesz resolvers w kodzie, schema generuje sie automatycznie. |
| **Smart Model Routing** | Przypisanie modeli do rol: Opus (decyzje), Sonnet (build), Haiku (research/QA). |
| **Hub-and-Spoke** | Topologia: centralny wezel (Orkiestrator) laczy sie z peryferyjnymi (agenty robocze). |
| **Fan-out** | Wzorzec: jeden agent deleguje do WIELU rownolegle. Design System: Ork -> UX + Docs. |
| **Fork** | Punkt w pipeline, gdzie jeden strumien dzieli sie na dwa rownolegele. |
| **Tier 3 PRO** | Poziom presetu: 6-8 agentow, specjalistyczne zadania, pelny cykl bez enterprise overhead. |
| **Narrow Context** | Agent dostaje TYLKO informacje potrzebne do zadania. Minimalizacja tokenow i szumu. |
| **Eskalacja** | Przeniesienie do wiekszego presetu po wyczerpaniu mozliwosci obecnego. |
| **Artefakt** | Produkt pracy agenta: kod, design tokeny, raport, dokumentacja. |
| **OpenAPI 3.1** | Specyfikacja do opisywania REST API. Nastepca Swaggera. JSON Schema compatible. |
| **GraphQL** | Jezyk zapytan API od Facebooka. Klient wybiera dokladnie jakie dane chce. Eliminuje over-fetching. |
| **Integrator** | Agent laczacy osobne strumienie pracy w jeden spojny artefakt. Brama miedzy build a QA. |
| **Redaktor** | Agent tworzacy dokumentacje. W Design System: brand book, guidelines, przyklady uzycia. |

---

## 14. Zrodla

1. Gold Standard 2026 -- Architektura Multi-Agent AI (dokumentacja wewnetrzna)
2. Anthropic Claude Model Cards -- specyfikacje Haiku ($0.80/$4), Sonnet ($3/$15), Opus ($15/$75)
3. Agent Architecture Designer -- konfiguracje presetow i pipeline'ow (v9)
4. WCAG 2.1/2.2 -- Web Content Accessibility Guidelines (W3C)
5. GraphQL Foundation -- specyfikacja GraphQL, best practices migracji
6. Shopify Engineering Blog -- "Migrating to GraphQL" (case study)
7. GitHub Engineering -- "The GitHub GraphQL API" (case study)
8. Stripe API Versioning -- model sunset policy i backward compatibility
9. Tailwind CSS v4 Documentation -- design tokens, utility-first CSS
10. Material Design 3 -- Google design system guidelines
11. Radix UI / Shadcn/ui -- headless component library documentation
12. OpenAPI 3.1 Specification -- REST API description standard

---

# PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

```
Stworz prezentacje wideo (16:9, 7-9 minut) porownujaca dwa presety Tier 3 PRO:
Design System i API Modernization z architektury Gold Standard 2026 multi-agent AI.

HOOK OTWIERAJACY (pierwsze 12 sekund):
"Ten sam tier. Te same 6 agentow. ZERO wspolnych rol."
Duzy numer "6 vs 6" z efektem split-screen -- lewa strona w odcieniu fioletowym
(Design System), prawa w odcieniu zielonym (API Modernization).
Animacja: 6 ikon agentow po kazdej stronie, strzalki lacza sie w srodku
na ikonie "Tier 3 PRO". Efekt merge -> rozdzielajacy sie na dwa pipeline'y.
Tytul: "DESIGN SYSTEM & API MODERNIZATION -- Lustrzane Odbicia"

MOTYW WIZUALNY:
- Kolor glowny: Royal Purple (#8B5CF6) -- dominujacy, naglowki, akcenty
- Kolor drugorzedny: Emerald (#10B981) -- akcenty API, kontrast
- Tlo: ciemny navy (#0F172A) z subtylna siatka izometryczna
- Motyw graficzny: paleta malarska (Design) + wtyczka elektryczna (API)
  -- pojawiaja sie jako ikony sekcji, separatory, animowane elementy
- Paleta uzupelniajaca: Amber (#F59E0B) dla ostrzezen, Rose (#F43F5E) dla
  anti-patternow, Sky Blue (#38BDF8) dla metryk, bialy (#F8FAFC) dla tekstu
- Efekty: gradient transitions miedzy Purple a Emerald, floating orbs w tle,
  glassmorphism na kartach agentow (blur 12px, opacity 0.15)
- Font: Inter (body, metryki), JetBrains Mono (kod, tokeny, endpointy)
- Separatory sekcji: animowana linia gradient od Purple do Emerald
  z ikona palety po lewej i wtyczki po prawej

STRUKTURA SLAJDOW:

1. INTRO -- DLACZEGO DWA PRESETY? (0:00-0:45)
   - Split-screen: fasada budynku (Design) vs instalacja (API)
   - Analogia remontowa z animacja: dom rozdziela sie na warstwy
   - Tekst: "Jeden buduje to, co widac. Drugi buduje to, co dziala."
   - Badge animowany: "Tier 3 PRO | 6+6 agentow | $0.12-$0.40"
   - Tlo: gradient purple-to-emerald z floating orbs

2. DESIGN SYSTEM -- SKLAD ZESPOLU (0:45-1:45)
   - 6 kart agentow z bounce-in animation (stagger 150ms):
     * Orkiestrator: Opus, Load 50, STRATEGIA -- karta purple glow
     * Researcher UX: Haiku, Load 50, RESEARCH -- karta blue glow
     * Researcher Docs: Haiku, Load 40, RESEARCH -- karta blue glow
     * Designer: Sonnet, Load 55, BUILD -- karta emerald glow
     * Frontend Dev: Sonnet, Load 70, BUILD -- karta emerald glow
     * Redaktor: Sonnet, Load 35, DOCS -- karta amber glow
   - Polaczenia rysuja sie miedzy kartami (animated path drawing)
   - Ikona palety malarskiej (80px) w lewym gornym rogu
   - Smart Model Routing diagram: Opus($15) -> Sonnet($3) -> Haiku($0.80)

3. API MODERNIZATION -- SKLAD ZESPOLU (1:45-2:45)
   - 6 kart agentow z slide-in animation (od prawej, stagger 150ms):
     * Orkiestrator: Opus, Load 50, STRATEGIA -- karta purple glow
     * Analityk: Sonnet, Load 55, PLANOWANIE -- karta cyan glow
     * Researcher Tech: Haiku, Load 55, RESEARCH -- karta blue glow
     * Backend Dev: Sonnet, Load 75, BUILD -- karta emerald glow
     * Integrator: Sonnet, Load 70, BUILD -- karta emerald glow
     * QA Quality: Haiku, Load 55, QA -- karta rose glow
   - Polaczenia rysuja sie -- liniowy pipeline z forkiem na Build
   - Ikona wtyczki elektrycznej (80px) w lewym gornym rogu
   - Highlight: "QA Quality -- agent, ktorego Design System NIE MA"

4. SIDE-BY-SIDE POROWNANIE (2:45-3:45)
   - Tabela animowana -- wiersze pojawiaja sie jeden po drugim:
     Kierunek: Outside-In vs Inside-Out
     Start: Research vs Analiza
     Builderzy: Designer+FE vs Backend+Integr.
     QA: BRAK vs QA Quality
     Docs: Redaktor vs Orkiestrator
     Ryzyko: Niskie vs Srednie
   - Pie chart koszt: ~50% Orkiestrator w obu presetach (purple donut)
   - Topology viz: "Wide (2+2+1+1)" vs "Deep (1+1+1+2+1)"

5. WORKFLOW DESIGN SYSTEM -- LIVE DEMO (3:45-5:00)
   - Scenariusz "Startup fintech po Series A" z timerem w rogu
   - Faza 1: UX + Docs research (rownolegla) -- dwie strzalki w dol
     * UX: "Dribbble: dark mode fintech, glassmorphism dashboards"
     * Docs: "Tailwind v4: @theme directive, nowe tokeny"
   - Faza 2: Designer tworzy tokeny (typewriter animation na CSS)
     ```css
     :root { --color-primary: #1E40AF; --space-4: 1rem; }
     ```
   - Faza 3: Frontend buduje Button component (kodu snippet)
   - Faza 4: Redaktor pisze docs (markdown preview)
   - Timer: 190s | Koszt: $0.24 | Tokeny: 180K
   - Ikony palety jako transition markers miedzy fazami

6. WORKFLOW API MODERNIZATION -- LIVE DEMO (5:00-6:30)
   - Scenariusz "E-commerce REST -> GraphQL" z timerem w rogu
   - Faza 1: Analityk mapuje 87 endpointow (tabela animowana)
     * Hot (23): /products, /orders, /users -> GraphQL
     * Cold (30): /admin, /reports -> REST v2
   - Faza 2: Researcher Tech bada Apollo vs Yoga vs Mercurius
   - Faza 3: Backend + Integrator (parallel) -- split screen
     * Backend: GraphQL schema (typewriter)
     * Integrator: gateway config (typewriter)
   - Faza 4: QA Quality testuje -- progress bar 0% -> 100%
     * "Contract tests: PASS" (zielona animacja)
     * "Backward compat: PASS" (zielona animacja)
     * "Edge cases: 1 FAIL" -> iteracja -> "PASS"
   - Timer: 270s | Koszt: $0.36 | Tokeny: 240K
   - Ikony wtyczki jako transition markers miedzy fazami

7. ANTI-PATTERNY (6:30-7:15)
   - Split-screen: 3 anti-patterny Design System (lewo, purple tlo)
     vs 3 anti-patterny API Modern. (prawo, emerald tlo)
   - Kazdy anti-pattern: czerwona karta z X -> flip -> zielona z checkmark
   - Design: "logika biznesowa X" | "brak researchu X" | "brak tokenow X"
   - API: "brak analizy X" | "big bang migration X" | "brak compat X"
   - Animacja flip: 0.5s per karta, stagger 200ms

8. DRZEWO DECYZYJNE (7:15-8:00)
   - Interaktywna wizualizacja drzewa decyzji:
     "Dotyczy wygladu?" -> TAK -> "Caly system?" -> TAK -> DESIGN SYSTEM
     "Dotyczy API?" -> TAK -> "Modernizacja?" -> TAK -> API MODERNIZATION
   - Kazdy wezel: purple circle (pytanie), emerald square (odpowiedz)
   - Podswietlenie sciezki z glow animation
   - Quick matrix: FE/BE/SEC/RES dla kazdego presetu

9. OUTRO (8:00-8:45)
   - "Lustrzane odbicia. Ten sam tier. Zupelnie inne swiaty."
   - Animacja: paleta malarska + wtyczka elektryczna zbiegaja sie w centrum
     -> tworca logo "Tier 3 PRO" z efektem pulse glow
   - Statystyka finalna: "6 agentow, ~$0.30, <5 minut -- pelny pipeline
     specjalistyczny bez enterprise overhead"
   - CTA: "Poznaj UI/UX Overhaul (7) i Feature Sprint (7)"
   - Credits: "Gold Standard 2026 | Agent Architecture Designer"

MUZYKA: Chill electronic, 100-120 BPM, ambient pads z delikatnym bassem,
  build-up w sekcjach workflow, drop przy porownaniu, fade-out w outro.
  Styl: Tycho, Bonobo -- spokojny ale engaging.
NARRATOR: Spokojny, autorytatywny glos. Tempo umiarkowane. Pauzy przy
  kluczowych liczbach i porownaniach. Wyrazne akcentowanie "Design System"
  i "API Modernization" jako nazw wlasnych.
NAPISY: Polskie, bez znakow diakrytycznych. Kluczowe terminy w CAPS.
DLUGOSC: 7-9 minut (optymalna: 8:30)
ROZDZIELCZOSC: 1920x1080 (16:9), 30fps, eksport MP4 H.264
```

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Stworz pionowa infografike (1080x3500px) porownujaca dwa presety Tier 3 PRO:
Design System i API Modernization z architektury Gold Standard 2026 multi-agent AI.

STYL WIZUALNY:
- Tlo: ciemny navy (#0F172A) z subtylna siatka izometryczna (linie #1E293B)
- Kolor glowny: Royal Purple (#8B5CF6) -- naglowki, linie, akcenty
- Kolor drugorzedny: Emerald (#10B981) -- API Modernization, kontrast
- Tekst glowny: bialy (#F8FAFC) i jasny szary (#CBD5E1)
- Akcent pozytywny: zielony (#10B981) -- checkmarki, PASS
- Akcent negatywny: Rose (#F43F5E) -- anti-patterny, FAIL
- Akcent neutralny: Amber (#F59E0B) -- ostrzezenia, rozwaz
- Akcent informacyjny: Sky Blue (#38BDF8) -- metryki, statystyki
- Font naglowkow: Inter Bold, 28-36px, letter-spacing 0.05em
- Font body: Inter Regular, 16-20px, line-height 1.5
- Font kodu: JetBrains Mono, 14-16px, tlo #1E293B, border-radius 6px
- Motyw graficzny: paleta malarska (Design) + wtyczka elektryczna (API)
  -- pojawiaja sie jako ikony sekcji, dekoracje, separatory
- Glassmorphism na kartach: background rgba(139,92,246,0.08),
  backdrop-filter blur(12px), border 1px solid rgba(139,92,246,0.2)
- Border-radius: 12px na kartach, 8px na badge'ach
- Shadow: 0 4px 24px rgba(0,0,0,0.3) na kartach

SEKCJA 1: NAGLOWEK (300px)
- Tytul: "DESIGN SYSTEM & API MODERNIZATION" w gradient Purple-to-Emerald
  (text-fill gradient), font 36px bold, letter-spacing 0.08em
- Podtytul: "Tier 3 PRO -- Lustrzane Odbicia | Gold Standard 2026"
  w jasnym szarym, 18px
- Dwie ikony po bokach: paleta (lewo, purple glow) + wtyczka (prawo, emerald glow)
  -- kazda 64px z soft shadow
- Linia oddzielajaca: gradient od Purple (#8B5CF6) przez transparent do
  Emerald (#10B981), wysokosc 2px, szerokosc 80%
- Badge'y (3 w rzedzie, glassmorphism):
  "Tier 3 PRO" | "6 + 6 Agentow" | "$0.12-$0.40"

SEKCJA 2: POROWNANIE GLOWNE -- SPLIT VIEW (500px)
- Dwie kolumny obok siebie (kazda 480px szerokosc):
  LEWA KOLUMNA (purple accent, ikona palety w rogu):
    Tytul: "DESIGN SYSTEM" w Purple, 24px bold
    Podtytul: "Design Pipeline | Outside-In"
    6 wierszy agentow (mini karty, 60px wysokosc kazda):
      [A-00] Orkiestrator | Opus | 50 | STRATEGIA
      [R-02] Researcher UX | Haiku | 50 | RESEARCH
      [R-07] Researcher Docs | Haiku | 40 | RESEARCH
      [B-02] Designer | Sonnet | 55 | BUILD
      [B-03] Frontend Dev | Sonnet | 70 | BUILD
      [W-01] Redaktor | Sonnet | 35 | DOCS
    Kazda karta z lewym border-left 3px w kolorze warstwy
    (purple=strategia, blue=research, emerald=build, amber=docs)
  PRAWA KOLUMNA (emerald accent, ikona wtyczki w rogu):
    Tytul: "API MODERNIZATION" w Emerald, 24px bold
    Podtytul: "API Upgrade Pipeline | Inside-Out"
    6 wierszy agentow (mini karty):
      [A-00] Orkiestrator | Opus | 50 | STRATEGIA
      [A-02] Analityk | Sonnet | 55 | PLANOWANIE
      [R-01] Researcher Tech | Haiku | 55 | RESEARCH
      [B-01] Backend Dev | Sonnet | 75 | BUILD
      [B-04] Integrator | Sonnet | 70 | BUILD
      [Q-02] QA Quality | Haiku | 55 | QA/AUDYT
  Separator miedzy kolumnami: pionowa linia przerywana w srodku,
  tekst "VS" w kolku (40px, border purple+emerald)

SEKCJA 3: DIAGRAMY PIPELINE (500px)
- Dwa diagramy obok siebie (uproszczone z ASCII w formacie graficznym):
  LEWY (Design System -- purple linie):
    Ork -> [UX + Docs] -> [Designer + FE] -> Redaktor
    Wezly: kolka z ikonami agentow, 40px, glow purple
    Polaczenia: linie z animowanymi strzalkami
    Label: "3 warstwy | Wide topology"
  PRAWY (API Modern. -- emerald linie):
    Ork -> Analityk -> Res.Tech -> [Backend + Integr.] -> QA
    Wezly: kolka z ikonami, 40px, glow emerald
    Polaczenia: linie z strzalkami
    Label: "4 warstwy | Deep topology"

SEKCJA 4: TABELA POROWNAWCZA (350px)
- Tabela z glassmorphism tlem, 7 wierszy:
  | Wymiar      | Design System   | API Modernization |
  | Kierunek    | Outside-In      | Inside-Out        |
  | Start       | Research        | Analiza           |
  | Builderzy   | Designer + FE   | Backend + Integr. |
  | QA          | BRAK            | QA Quality        |
  | Dokumentacja| Redaktor        | Orkiestrator      |
  | Ryzyko      | Niskie          | Srednie           |
  | Odwracalnosc| Wysoka          | Niska             |
- Naglowki kolumn: purple (Design) / emerald (API)
- Wiersze z alternujacym tlem (rgba bialy 0.03 / 0.06)
- Ikona palety przy "Design System", wtyczki przy "API Modernization"

SEKCJA 5: USE CASES -- KIEDY UZYWAC (350px)
- Dwa boxy obok siebie z zielonymi checkmarkami:
  DESIGN SYSTEM (purple border-top 3px):
    Checkmark: component library
    Checkmark: style guide / brand book
    Checkmark: CSS refaktor
    Checkmark: WCAG compliance
    Checkmark: rebranding
    X (rose): logika biznesowa
    X (rose): security audit
  API MODERNIZATION (emerald border-top 3px):
    Checkmark: REST -> GraphQL
    Checkmark: wersjonowanie API
    Checkmark: refaktor endpointow
    Checkmark: backward compatibility
    Checkmark: N+1 query fix
    X (rose): zmiany w UI
    X (rose): nowe API od zera

SEKCJA 6: ANALIZA KOSZTOW (350px)
- Dwa horizontal bar charts obok siebie:
  DESIGN SYSTEM (purple bars):
    Orkiestrator:  ████████████ $0.45 (50%)
    Designer:      ████ $0.16
    Frontend Dev:  ████ $0.16
    Redaktor:      ███ $0.09
    Res. UX:       █ $0.03
    Res. Docs:     █ $0.02
  API MODERN. (emerald bars):
    Orkiestrator:  ████████████ $0.45 (45%)
    Backend Dev:   █████ $0.19
    Integrator:    ████ $0.16
    Analityk:      ████ $0.14
    Res. Tech:     █ $0.03
    QA Quality:    █ $0.03
- Adnotacja na dole w Sky Blue: "Orkiestrator (Opus) = ~50% kosztu w obu
  presetach. Haiku agenci = ~5% kosztu za ~25% tokenow."

SEKCJA 7: DRZEWO DECYZYJNE (350px)
- Flowchart pionowy (zmieszczony w 1080px szerokosc):
  START (kolko, bialy border)
    -> "Dotyczy wygladu?" (purple rombus)
      -> TAK -> "Caly system?" -> TAK -> "DESIGN SYSTEM" (purple prostokat)
      -> NIE -> "Dotyczy API?" (emerald rombus)
        -> TAK -> "Modernizacja?" -> TAK -> "API MODERN." (emerald prostokat)
        -> NIE -> "Oba?" -> "Feature Sprint / Standard Dev" (szary prostokat)
  Polaczenia z labelkami TAK/NIE w malych badge'ach
  Podswietlenie sciezek: purple i emerald glow

SEKCJA 8: ANTI-PATTERNY (300px)
- Siatka 2x3 -- 3 wiersze, 2 kolumny:
  Kolumna 1 (Design System, rose border-left):
    X "Uzywanie do logiki biznesowej"
    X "Pominiecje Researcher UX"
    X "Design bez tokenow"
  Kolumna 2 (API Modern., rose border-left):
    X "Modernizacja bez analizy"
    X "Big Bang migration"
    X "Brak backward compatibility"
  Kazda karta: tlo rgba(244,63,94,0.08), ikona X w rose circle

SEKCJA 9: METRYKI FINALNE (200px)
- Trzy metryki w rzedzie (glassmorphism cards, 300px kazda):
  TOKENY: "150-260K" (duzy numer w Sky Blue, 32px)
    podpis: "srednia dla obu presetow"
  KOSZT: "$0.12-$0.40" (duzy numer w Emerald, 32px)
    podpis: "~$0.30 srednia"
  CZAS: "120-300s" (duzy numer w Purple, 32px)
    podpis: "2-5 minut na pelny pipeline"
- Porownanie z innymi presetami w jednej linii:
  "Solo: $0.04 | Quick Fix: $0.08 | TIER 3 PRO: $0.30 | Full: $1.20"

SEKCJA 10: STOPKA (100px)
- Tekst: "Gold Standard 2026 | Tier 3 PRO | Design System + API Modernization"
  w jasnym szarym, 14px
- Ikony: paleta + wtyczka (24px, po bokach tekstu)
- Linia gorna: gradient Purple-to-Emerald, 1px
- Podpis: "Agent Architecture Designer | Kwiecien 2026"

DEKORACJE GLOBALNE:
- Floating orbs w tle: 3-4 kola (200-300px) z blur 80px,
  kolory purple rgba(139,92,246,0.06) i emerald rgba(16,185,129,0.04)
- Siatka izometryczna na tle: linie pod katem 30/60 stopni, kolor #1E293B
- Separatory sekcji: gradient linia Purple->Emerald z numeracja "01//", "02//"
- Numeracja sekcji: duze numery (48px, opacity 0.1) w tle kazdej sekcji
- Ikony palety i wtyczki jako male dekoracje (20px) przy naglowkach sekcji
- Wszystkie karty z hover-like shadow (statyczny, sugerujacy interaktywnosc)
- Tekst kodowy (endpointy, CSS tokeny) w JetBrains Mono na ciemnym tle #1E293B
```

---

*Dokument wygenerowany dla systemu Gold Standard 2026 Multi-Agent AI Architecture.*
*Presety: Design System + API Modernization | Tier: 3 PRO | Wzorce: Design Pipeline + API Upgrade Pipeline*
