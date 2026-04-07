# FIVE MINDS PROTOCOL -- Strukturalna Debata Ekspertow

## Kompletny Przewodnik | Tier 4 ENTERPRISE | Preset #28 | Gold Standard 2026

**Seria:** Architektura Agentow AI -- Presety i Konfiguracje
**Preset ID:** `five_minds_protocol`
**Nazwa:** Five Minds Protocol (Protokol Pieciu Umyslow)
**Tier:** 4 (ENTERPRISE)
**Liczba agentow:** ~15+
**Wzorzec:** Fan-out Research --> Structured Debate (4 Experts + Devil's Advocate) --> Fan-out Build
**Koszt tokenowy:** ~400-800K
**Koszt dolarowy:** $0.50-$1.50
**Latencja:** ~400-900 sekund (7-15 minut)
**Ocena architektury:** 9/10
**Unikalnosc:** JEDYNY preset z mechanizmem adversarial debate
**Faza kluczowa:** Phase 2 -- strategiczna brama decyzyjna miedzy research a implementacja
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Dlaczego debata, a nie konsensus?

Wyobraz sobie rozprawe sadowa. Na sali jest prokurator, obronca, czterech swiadkow-ekspertow, sedziowie i -- co najwazniejsze -- adwokat diabla. Prokurator twierdzi, ze oskarzonemu nalezy sie surowy wyrok. Obronca walczy o uniewinnienie. Kazdy swiadek-ekspert zeznaje ze swojej perspektywy: patolog, balistyk, psycholog, informatyk sledczy. Ich zeznania SPRZECZAJA SIE ze soba. I wlasnie dlatego, ze sie sprzeczaja, sedzia moze podjac najlepsza decyzje -- bo widzial problem ze WSZYSTKICH stron, wlacznie z perspektywa kogos, kto systemowo kwestiono wal kazde twierdzenie.

Teraz wyobraz sobie inny scenariusz: ta sama sprawa, ale zamiast rozprawy -- komitet. Piecia ekspertow siada przy jednym stole i ma "dojsc do konsensusu". Co sie dzieje? Groupthink. Ekspert z najsilniejsza osobowoscia narzuca swoje zdanie. Mniej pewni siebie eksperci milkna. Nikt nie chce byc "tym trudnym". Nikt nie kwestionuje fundamentalnych zalozen. I komitet jednoglosnie podejmuje decyzje, ktora jest GORSZA niz ta, ktora podjalby pojedynczy niezalezny ekspert -- bo konsensus wygladzi ostre krawedzie, kompromis zadowala wszystkich po trochu, ale tak naprawde nikogo w pelni.

To jest fundamentalny problem systemow wieloagentowych: **konsensus =/= jakosc**. Kiedy wielu agentow "zgadza sie" zbyt szybko, to nie jest znak efektywnosci -- to jest czerwona flaga groupthink. Prawdziwie lepsza decyzja rodzi sie z KONFLIKTU -- kontrolowanego, strukturalnego, produktywnego konfliktu.

**Five Minds Protocol** to jedyny preset w calym ekosystemie Gold Standard 2026, ktory wbudowal adversarial debate jako centralny mechanizm decyzyjny. Nie chodzi o to, zeby agenci klocili sie bezproduktywnie. Chodzi o to, zeby czterech ekspertow domenowych BRONILO swoich pozycji z dowodami, a piaty agent -- Devil's Advocate -- systematycznie KWESTIONOWAL kazde twierdzenie, kazde zalozenie, kazda domyslna "oczywistosc". I z tego kontrolowanego starcia rodzi sie cos, czego zaden pojedynczy ekspert nie wymyslilby sam: **Gold Solution** -- tworcza synteza, ktora TRANSCENDUJE oryginalny konflikt.

### Trzy analogie do zrozumienia Five Minds Protocol

**Analogia 1: Rozprawa sadowa z adwokatem diabla**

Czterech swiadkow-ekspertow (Dr. Elena Voss, Karol "Pixel" Nowakowski, Raven Blackwood, ekspert domenowy) sklada sprzeczne zeznania. Kazdy ma dowody. Kazdy jest autentycznie przekonany do swojej tezy. Ale piata osoba -- Cien (Shadow), adwokat diabla -- nie reprezentuje ZADNEJ strony. Jego jedynym mandatem jest kwestionowanie. "Czy pana dowody nie sa stronnicze?" "Czy ta technologia naprawde skaluje sie do miliona uzytkownikow?" "Co jesli pani zalozenie o zachowaniu uzytkownikow jest bledne?" I z tego procesu -- nie z kompromisu, ale z SYNTEZY -- sedzia (Synthesizer) wydaje wyrok, ktory jest lepszy niz propozycja ktorejkolwiek ze stron.

**Analogia 2: Debata oksfordzka z formatem parlamentarnym**

W formalnej debacie oksfordzkiej sa dwie strony: propozycja i opozycja. Kazda strona ma trzech mowcow, kazdy z okreslonego czasu na argumenty. Ale klucz to: obie strony SLUCHAJA siebie nawzajem i ODPOWIADAJA na argumenty przeciwnika. To nie jest monolog -- to dialektyka. Five Minds to debata oksfordzka z czterema stronami i jednym moderatorem-prowokatorem. Kazdy ekspert musi nie tylko przedstawic swoja pozycje, ale OBRONIC ja przed atakami trzech pozostalych ekspertow ORAZ adwokata diabla. Pozycja, ktora przetrwa ten proces, jest pozycja PRZETESTOWANA.

**Analogia 3: Peer review w nauce -- ale z obowiazkowym oponentem**

Czterech niezaleznych recenzentow czyta ten sam artykul naukowy. Kazdy ocenia go z perspektywy swojej specjalizacji: metodologia, statystyka, implikacje kliniczne, replikowalnosc. Ich recenzje sie sprzeczaja -- jeden mowi "przebojowy wynik", drugi "wadliwa metodologia". I jest piata osoba -- assigned devil's advocate -- ktora MA OBOWIAZEK szukac dziur. Nie moze powiedziec "wyglada dobrze". Jej praca to TYLKO kwestionowanie. Editor (Synthesizer) czyta wszystko i podejmuje decyzje: publish, revise, reject. Ale ta decyzja jest LEPSZA, bo widziala problem z pieciu katow, wlacznie z perspektywa systemowego sceptyka.

---

> **Czy wiesz, ze...?**
> Badania nad Multi-Agent Debate (Du et al., 2023) wykazaly, ze agenci, ktorzy DEBATUJA nad rozwiazaniem, osiagaja wyzsze wyniki niz agenci, ktorzy po prostu "glosuja" lub "usredniaja" odpowiedzi. Klucz: debata wymusza ARGUMENTACJE -- agent musi nie tylko podac odpowiedz, ale JA UZASADNIC i OBRONIC. Five Minds Protocol formalizuje ten mechanizm do produkcyjnego frameworka z piecioma specjalistycznymi rolami.

> **Uwaga!**
> Five Minds Protocol to preset do STRATEGICZNYCH DECYZJI -- nie do bugfixow, CRUDa, prostych feature'ow ani hotfixow. Uruchamianie debaty pieciu ekspertow dla zadania, ktore zrobilby jeden agent, to jak zwoanie pelnego zarzadu firmy, zeby zdecydowac o kolorze dlugopisow. Koszt debaty ($0.30-$0.80 za sama faze 2) jest uzasadniony TYLKO gdy koszt ZLEJ DECYZJI wielokrotnie go przekracza.

---

## 2. Czterech Ekspertow + Adwokat Diabla -- Piec Umyslow

Five Minds Protocol opiera sie na pieciu wyrazistych osobowosciach eksperckich, z ktorych KAZDA ma okreslona domene, styl rozumowania, mocne strony i slepie punkty. To nie sa generyczni "Agent 1, Agent 2" -- to sa pelne profesjonalne tozsamosci z domena autentycznym rozumowaniem.

### Ekspert 1: Dr. Elena Voss -- Specjalistka Domeny A (ATS Expert)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | DOMAIN SPECIALIST A -- ekspert domenowy, advokat swojego obszaru |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 75/100 |
| **Styl rozumowania** | Evidence-based, akademicki, powoluje sie na standardy i dane |
| **Za czym walczy** | Parsowalnosc, standardy branzy, kompatybilnosc z systemami |
| **Na co zgadza sie z oporami** | Kompromisy wizualne, jesli nie lamia parsowalnosci |
| **Slepie punkty** | Moze ignorowac user experience na rzecz technicznej poprawnosci |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.05-$0.10 |

Dr. Elena Voss to archetypowy ekspert domenowy. W przykladzie CV: walczy o ATS-first design, monochromatyczny uklad, single-column, maksymalna parsowalnosc. Jej argumenty sa poparte danymi: "87% duzych firm uzywa ATS, 62% odrzuca CV z powodu bledow parsowania." Nie akceptuje "ladnego" designu, ktory psuje maszynowa czytelnosc. Ale jej slepie punkt to tunelowe widzenie -- tak bardzo skupia sie na technicznej poprawnosci, ze moze przegapic fakt, iz CV musi tez ZAINTERESOWAC czlowieka, ktory je przeczyta.

### Ekspert 2: Karol "Pixel" Nowakowski -- Specjalista Domeny B (UI/UX Master)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | DOMAIN SPECIALIST B -- ekspert UX/UI, advocate uzytkownika |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 75/100 |
| **Styl rozumowania** | Wizualny, emocjonalny, orientowany na doswiadczenie uzytkownika |
| **Za czym walczy** | Estetyka, interaktywnosc, animacje, dark theme, portfolio-first |
| **Na co zgadza sie z oporami** | Uproszczenie, jesli zachowane zostaje "wow factor" |
| **Slepie punkty** | Moze faworyzowac design kosztem funkcjonalnosci i kompatybilnosci |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.05-$0.10 |

Karol "Pixel" Nowakowski to przeciwwaga Eleny. Gdzie ona widzi parsowalna tabele, on widzi react components z animacjami. Gdzie ona chce monochromatyczny single-column, on chce dark theme z gradient fill i interaktywnym portfolio. Jego argumenty sa rownie mocne, ale oparte na INNEJ metryce: "Rekruter spedza 6-8 sekund na CV -- bez wizualnego wyroznika nie przebije sie przez stos 200 aplikacji." To autentyczny konflikt: ATS-first vs Human-first. I ten konflikt jest PRODUKTYWNY, bo zmusza obie strony do znalezienia rozwiazania, ktore sluzy OBU celom.

### Ekspert 3: Raven Blackwood -- Specjalista Domeny C (Tech Recruiter)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | DOMAIN SPECIALIST C -- evidence-based, metrics-driven |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 75/100 |
| **Styl rozumowania** | Metryczny, oparty na dowodach, kazde twierdzenie musi miec liczbe |
| **Za czym walczy** | Profesjonalne framing, mierzalne rezultaty, konwersja |
| **Na co zgadza sie z oporami** | Kompromisy estetyczne, jesli metryki konwersji sa zachowane |
| **Slepie punkty** | Moze redukowac problem do liczb, ignorujac czynniki jakosciowe |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.05-$0.10 |

Raven Blackwood to agent-katalizator. W przykladzie CV to wlasnie ON dostarczyl przelamanie (breakthrough): koncepcje **"Dual-Output from One Source"** -- jeden zrodlowy plik, z ktorego generuja sie DWA wyjscia: ATS-parsowalne CV (Elena szczesliwa) ORAZ rich portfolio (Pixel szczesliwy). To rozwiazanie nie bylo kompromisem (ktory zadowalaloby obie strony "po trochu"). To byla SYNTEZA -- kreatywne rozwiazanie, ktore TRANSCENDOWALO oryginalny konflikt. Raven osiagnal to, bo jego domena to nie technologia ani design, ale REZULTATY -- a najlepszym rezultatem byla strategia, ktora maksymalizowala obie metryki jednoczesnie.

### Ekspert 4: Cien (Shadow) -- Adwokat Diabla

| Parametr | Wartosc |
|----------|---------|
| **Rola** | DEVIL'S ADVOCATE -- systematyczne kwestionowanie KAZDEJ decyzji |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 80/100 |
| **Styl rozumowania** | Sokratejski, destruktywno-konstruktywny, zero lojalnosci domenowej |
| **Za czym walczy** | Za NIC -- jego mandat to kwestionowanie, nie advokatura |
| **Na co zgadza sie z oporami** | Na nic -- zgadzanie sie jest zakazane w jego promptcie |
| **Slepie punkty** | Moze spowolnic proces nadmiernym kwestionowaniem (mitygowane limitem rund) |
| **Tokeny/sesja** | ~25-40K |
| **Koszt/sesja** | ~$0.04-$0.08 |

Cien (Shadow) to najbardziej unikalna rola w calym ekosystemie presetow. Nie ma domeny. Nie ma preferencji. Nie "walczy" o zadna technologie. Jego JEDYNYM mandatem jest kwestionowanie. Kazde twierdzenie eksperta musi przejsc przez filtr Cienia:

- "Skad wiesz, ze te dane sa aktualne?"
- "Czy to rozwiazanie nie jest over-engineered?"
- "Co jesli uzytkownik nie zachowuje sie tak, jak zakladasz?"
- "Jaki jest plan B, jesli ta technologia zostanie deprecated za 2 lata?"
- "Czy naprawde potrzebujemy tego poziomu zlozonosci, czy mozna uprascic o 60%?"

W przykladzie CV: Cien wymusil uproszczenie architektury. Poczatkowy plan byl zbyt zlozony -- React z SSR, GraphQL, headless CMS, Kubernetes deployment. Cien zakwestionowal: "Czy CV naprawde potrzebuje Kubernetes? Czy to nie jest CV, a nie platforma SaaS?" I mial racje. Architektura zostala uproszczona do static site z build-time rendering -- prostsza, tansza, szybsza, latwiejsza do utrzymania.

> **BUG-009 (Znany defekt):**
> W wczesnych wersjach Five Minds perspektywa Ciena (Devil's Advocate) byla POMIJANA w koncowym raporcie FIVE_MINDS_REPORT.md. Raport zawieral pozycje czterech ekspertow i Gold Solution, ale BRAKOWALO zapisu sceptycznych pytan i wyzwan Ciena. To jest blad krytyczny -- jesli nie zapisujesz historii kwestionowania, tracisz kontekst DLACZEGO pewne decyzje zostaly podjete i jakie ryzyka zostaly swiadomie zaakceptowane. Fix: FIVE_MINDS_REPORT.md MUSI zawierac sekcje "Devil's Advocate Challenges" z pelnym zapisem pytan Ciena i odpowiedzi ekspertow.

### Porownanie pieciu umyslow -- tabela

```
┌──────────────────┬──────────────┬───────────────┬──────────────┬──────────────────┐
│     PARAMETR     │   ELENA      │    PIXEL      │    RAVEN     │     CIEN         │
│                  │   (Domena A) │   (Domena B)  │  (Domena C)  │ (Devil's Adv.)   │
├──────────────────┼──────────────┼───────────────┼──────────────┼──────────────────┤
│ Domena           │ ATS/Systemy  │ UI/UX/Design  │ Metryki/     │ BRAK (kwestion.) │
│                  │              │               │ Recruiter    │                  │
├──────────────────┼──────────────┼───────────────┼──────────────┼──────────────────┤
│ Walczy o...      │ Parsowalnosc │ Estetyka      │ Konwersja    │ Prostota         │
│                  │ Standardy    │ Animacje      │ Metryki      │ (przeciw nadm.)  │
├──────────────────┼──────────────┼───────────────┼──────────────┼──────────────────┤
│ Styl argumentow  │ Dane,        │ Wizualne,     │ Liczby,      │ Pytania          │
│                  │ Standardy    │ Emocjonalne   │ ROI          │ Sokratejskie     │
├──────────────────┼──────────────┼───────────────┼──────────────┼──────────────────┤
│ Slepie punkty    │ Ignoruje UX  │ Ignoruje      │ Redukuje do  │ Moze spowalniac  │
│                  │              │ kompatybilnosc│ metryk       │                  │
├──────────────────┼──────────────┼───────────────┼──────────────┼──────────────────┤
│ Model            │ Opus         │ Opus          │ Opus         │ Opus             │
├──────────────────┼──────────────┼───────────────┼──────────────┼──────────────────┤
│ Tokeny           │ 30-50K       │ 30-50K        │ 30-50K       │ 25-40K           │
├──────────────────┼──────────────┼───────────────┼──────────────┼──────────────────┤
│ Kluczowe pytanie │ "Czy to jest │ "Czy to jest  │ "Jakie sa    │ "Dlaczego        │
│                  │  parsowalne?"│  piekne?"     │  liczby?"    │  w ogole?"       │
└──────────────────┴──────────────┴───────────────┴──────────────┴──────────────────┘
```

---

## 3. Pipeline 5 Faz -- Od badania do dostarczenia

Five Minds Protocol to nie TYLKO debata. Debata (Phase 2) to centralny, unikatowy element, ale jest osadzona w pelnym pipeline obejmujacym 5 faz: od rownolegiego badania przez strukturalna debate, budowe, QA, az po dostarczenie.

```
=========================================================================
                  FIVE MINDS PROTOCOL — PIPELINE 5 FAZ
=========================================================================

PHASE 1: RESEARCH INPUT (Rownolegle badania)
┌─────────────────────────────────────────────────────────────────────┐
│                      ORKIESTRATOR (A-00)                            │
│                   Claude Opus | Load 50/100                         │
│       Definiuje pytania badawcze → Dispatch do 4 researcherow      │
└──────────────────────┬──────────────────────────────────────────────┘
                       │
         ┌─────────────┼─────────────┬─────────────┐
         ▼             ▼             ▼             ▼
┌──────────────┐┌──────────────┐┌──────────────┐┌──────────────┐
│ RESEARCHER   ││ RESEARCHER   ││ RESEARCHER   ││ RESEARCHER   │
│ TECH (R-01)  ││ UX (R-02)    ││ MARKET (R-03)││ DOCS (R-04)  │
│ Haiku        ││ Haiku        ││ Haiku        ││ Haiku        │
│ Load 55      ││ Load 55      ││ Load 50      ││ Load 50      │
│ API, stack,  ││ Trendy UX,   ││ Reddit, X,   ││ Oficjalna    │
│ benchmarki   ││ a11y, design ││ opinie, dane ││ dokumentacja │
└──────┬───────┘└──────┬───────┘└──────┬───────┘└──────┬───────┘
       │               │               │               │
       ▼               ▼               ▼               ▼
  [Raport HTML]   [Raport HTML]   [Raport HTML]   [Raport HTML]
  [+ Markdown]    [+ Markdown]    [+ Markdown]    [+ Markdown]
       │               │               │               │
       └───────────────┴───────┬───────┴───────────────┘
                               ▼
                  ┌─── KNOWLEDGE BASE ───┐
                  │  4 raporty badawcze  │
                  │  = wspolna wiedza    │
                  │  dla wszystkich      │
                  │  ekspertow debaty    │
                  └──────────┬───────────┘
                             ▼

PHASE 2: STRUCTURED DEBATE (Faza unikatowa dla Five Minds)
=========================================================================
Phase 2a: POSITION STATEMENTS (Stanowiska)
         ┌─────────────┬─────────────┬─────────────┐
         ▼             ▼             ▼             ▼
┌──────────────┐┌──────────────┐┌──────────────┐┌──────────────┐
│ DR. ELENA    ││ PIXEL        ││ RAVEN        ││ EKSPERT 4    │
│ VOSS         ││ NOWAKOWSKI   ││ BLACKWOOD    ││ (domenowy)   │
│ Opus         ││ Opus         ││ Opus         ││ Opus         │
│ Load 75      ││ Load 75      ││ Load 75      ││ Load 75      │
│              ││              ││              ││              │
│ Czyta WSZYST-││ Czyta WSZYST-││ Czyta WSZYST-││ Czyta WSZYST-│
│ KIE 4 raporty││ KIE 4 raporty││ KIE 4 raporty││ KIE 4 raporty│
│              ││              ││              ││              │
│ Advokuje za  ││ Advokuje za  ││ Advokuje za  ││ Advokuje za  │
│ SWOJA domena ││ SWOJA domena ││ SWOJA domena ││ SWOJA domena │
│ z dowodami   ││ z dowodami   ││ z dowodami   ││ z dowodami   │
└──────┬───────┘└──────┬───────┘└──────┬───────┘└──────┬───────┘
       │               │               │               │
       ▼               ▼               ▼               ▼
  [Pozycja A]    [Pozycja B]    [Pozycja C]    [Pozycja D]
       │               │               │               │
       └───────────────┴───────┬───────┴───────────────┘
                               ▼
Phase 2b: CONFLICT SURFACED (Identyfikacja sprzecznosci)
┌─────────────────────────────────────────────────────────────────────┐
│ ORKIESTRATOR identyfikuje sprzecznosci miedzy pozycjami:           │
│                                                                     │
│  KONFLIKT 1: Elena (single-column) vs Pixel (rich interactive)     │
│  KONFLIKT 2: Elena (monochrome) vs Pixel (dark theme + gradients)  │
│  KONFLIKT 3: Raven (metryki konwersji) vs Elena (standardy ATS)    │
│  KONFLIKT 4: Pixel (React + SSR) vs pragmatyzm (static site)      │
│                                                                     │
│  Kazdy konflikt zostaje JAWNIE SFORMULOWANY i przekazany do 2c     │
└──────────────────────────────┬──────────────────────────────────────┘
                               ▼
Phase 2c: DEVIL'S ADVOCATE CHALLENGES (Adwokat Diabla)
┌─────────────────────────────────────────────────────────────────────┐
│                    CIEN (SHADOW)                                    │
│                    Opus | Load 80                                   │
│                                                                     │
│  Czyta: WSZYSTKIE pozycje + WSZYSTKIE konflikty                    │
│  Mandat: Zakwestionuj KAZDE zalozenie                              │
│                                                                     │
│  Challenge 1: "Czy naprawde potrzebujemy React do CV?"             │
│  Challenge 2: "Skad wiecie, ze te metryki ATS sa aktualne?"        │
│  Challenge 3: "Co jesli caly konflikt jest sztuczny i mozna        │
│                miec OBIE rzeczy bez kompromisu?"                    │
│  Challenge 4: "Jaka jest MINIMALNA wersja, ktora spelnia cel?"     │
│                                                                     │
│  Wynik: Lista wyzwan + wymuszone uproszczenia                     │
└──────────────────────────────┬──────────────────────────────────────┘
                               ▼
Phase 2d: BREAKTHROUGH RESOLUTION (Przelamanie)
┌─────────────────────────────────────────────────────────────────────┐
│  Eksperci odpowiadaja na wyzwania Ciena.                           │
│  Szukaja rozwiazania, ktore NIE JEST kompromisem,                  │
│  ale SYNTEZA -- kreatywnym rozwiazaniem transcendujacym konflikt.  │
│                                                                     │
│  BREAKTHROUGH: Raven proponuje "Dual-Output from One Source"       │
│  → Jeden zrodlowy plik generuje DWA wyjscia:                      │
│    • ATS-parsowalne CV (Elena ✓)                                   │
│    • Rich portfolio z animacjami (Pixel ✓)                         │
│    • Metryki konwersji na obu wersjach (Raven ✓)                   │
│    • Prosta architektura static site (Cien ✓)                      │
│                                                                     │
│  = GOLD SOLUTION -- zaden pojedynczy ekspert nie wymyslilby tego   │
└──────────────────────────────┬──────────────────────────────────────┘
                               ▼
Phase 2e: CONSENSUS & OUTPUT (Konsensus i dokument)
┌─────────────────────────────────────────────────────────────────────┐
│                     SYNTHESIZER (S-01)                               │
│                     Opus | Load 70                                   │
│                                                                     │
│  Produkuje GOLD SOLUTION DOCUMENT:                                  │
│  1. Executive Summary                                               │
│  2. Strategia z uzasadnieniem                                       │
│  3. Pozycje ekspertow z atrybucja (kto co powiedzial)              │
│  4. Devil's Advocate Challenges (BUG-009 fix!)                     │
│  5. Zidentyfikowane ryzyka + mitygacje                             │
│  6. Wytyczne implementacyjne dla Phase 3 builderow                 │
│                                                                     │
│  Output: FIVE_MINDS_REPORT.md + GOLD_SOLUTION.md                  │
└──────────────────────────────┬──────────────────────────────────────┘
                               ▼

PHASE 3: BUILD (Rownolegle budowanie wedlug Gold Solution)
         ┌─────────────┬─────────────┐
         ▼             ▼             ▼
┌──────────────┐┌──────────────┐┌──────────────┐
│ BUILDER 1    ││ BUILDER 2    ││ BUILDER 3    │
│ (Backend)    ││ (Frontend)   ││ (Integrator) │
│ Sonnet       ││ Sonnet       ││ Sonnet       │
│ Load 80      ││ Load 75      ││ Load 70      │
│ Implementuje ││ Implementuje ││ Laczy        │
│ Gold Solution││ Gold Solution││ artefakty    │
└──────┬───────┘└──────┬───────┘└──────┬───────┘
       │               │               │
       └───────────────┴───────┬───────┘
                               ▼

PHASE 4: QA (Kontrola jakosci)
┌─────────────────────────────────────────────────────────────────────┐
│                    QA AGENT (Q-01)                                   │
│                    Sonnet | Load 65                                  │
│                                                                     │
│  Weryfikuje: zgodnosc z Gold Solution, jakosc kodu,                │
│  bezpieczenstwo, wydajnosc, edge cases                             │
└──────────────────────────────┬──────────────────────────────────────┘
                               ▼

PHASE 5: DELIVERY (Dostarczenie)
┌─────────────────────────────────────────────────────────────────────┐
│  ORKIESTRATOR finalizuje:                                           │
│  • Zbudowany produkt (z Phase 3)                                   │
│  • FIVE_MINDS_REPORT.md (z Phase 2e)                               │
│  • GOLD_SOLUTION.md (z Phase 2e)                                   │
│  • QA Report (z Phase 4)                                           │
└─────────────────────────────────────────────────────────────────────┘
```

### Podsumowanie faz -- metryki

| Faza | Agentow | Modele | Tokeny | Koszt | Latencja |
|------|---------|--------|--------|-------|----------|
| Phase 1: Research | 4+1 | 4x Haiku + 1x Opus | ~80-120K | ~$0.06-$0.15 | ~60-120s |
| Phase 2: Debate | 5+1 | 5x Opus + 1x Opus | ~200-400K | ~$0.30-$0.80 | ~180-400s |
| Phase 3: Build | 3 | 3x Sonnet | ~80-180K | ~$0.08-$0.25 | ~120-300s |
| Phase 4: QA | 1 | 1x Sonnet | ~20-40K | ~$0.02-$0.06 | ~30-60s |
| Phase 5: Delivery | 1 | 1x Opus | ~10-20K | ~$0.02-$0.04 | ~15-30s |
| **LACZNIE** | **~15+** | **7x Opus, 4x Sonnet, 4x Haiku** | **~400-800K** | **$0.50-$1.50** | **~400-900s** |

> **Kluczowa obserwacja:** Phase 2 (debata) zuzywa 50-60% calkowitego budzetu tokenowego i kosztowego. To jest ZAMIERZONE. Debata wymaga Opus na kazdym ekspercie, bo argumentacja wymaga silnego rozumowania. Haiku nie jest w stanie prowadzic nuansowanej debaty z dowodami. To swiadomy trade-off: placimy wiecej za faze decyzyjna, bo JAKOSC DECYZJI determinuje jakosc calego projektu.

---

## 4. INPUT -- Co podajesz Five Minds?

Five Minds Protocol NIE JEST presetem ogolnego zastosowania. Jest zaprojektowany dla jednej, specyficznej klasy problemow: **strategicznych decyzji wymagajacych wielu perspektyw, gdzie koszt zlej decyzji jest wysoki**.

### Idealny input -- 5 charakterystyk

1. **Wielo-domenowosc:** Problem dotyka minimum 2-3 domen (np. technologia + UX + biznes + bezpieczenstwo). Jeden ekspert nie pokrywa calego zakresu.

2. **Autentyczny konflikt:** Istnieje PRAWDZIWY trade-off miedzy domenami. "ATS-first vs Human-first" to autentyczny konflikt. "Uzywac React czy nie" (bez kontekstu) to NIE jest konflikt wymagajacy debaty.

3. **Wysoka stawka:** Decyzja wplywa na miesiace pracy, tysiace dolarow, setki uzytkownikow. Jesli mozesz latwo cofnac decyzje -- nie potrzebujesz Five Minds.

4. **Brak oczywistej odpowiedzi:** Gdyby odpowiedz byla oczywista, jeden ekspert by wystarczyl. Five Minds jest dla sytuacji, gdzie KAZDA opcja ma istotne wady i zalety.

5. **Potrzeba audytowalnosci:** Musisz moc WYKAZAC, dlaczego podjales taka, a nie inna decyzje. FIVE_MINDS_REPORT.md daje pelna sciezke audytowa: kto co powiedzial, jakie konflikty zidentyfikowano, co zakwestionowal Devil's Advocate, jak doszlo do Gold Solution.

### Przyklady idealnych inputow

```
INPUT 1: "Wybierz stack technologiczny dla nowej platformy SaaS B2B:
  - React vs Vue vs Svelte (frontend)
  - Node.js vs Go vs Rust (backend)
  - PostgreSQL vs MongoDB vs DynamoDB (baza)
  - Monorepo vs polyrepo
  Platforma musi obsluzyc 10K uzytkownikow dziennie, 
  team 5 developerow, budzet $200K/rok."

INPUT 2: "Zaprojektuj strategie autentykacji dla platformy fintech:
  - Passwordless vs 2FA vs biometric
  - PCI DSS compliance wymagane
  - UX musi byc prosty (target: non-tech users)
  - Budzet security: max 15% calkowitego budzetu dev"

INPUT 3: "Zdecyduj o strategii migracji systemu legacy:
  - Monolith (500K LOC, Java 8, Oracle DB) --> microservices?
  - Big bang vs incremental refactoring vs strangler fig?
  - 3 zespoly, 18 miesiecy, $500K budzet
  - Zero downtime wymagane (SLA 99.95%)"
```

### Czego NIE podawac Five Minds

| Typ zadania | Dlaczego NIE Five Minds | Lepszy preset |
|-------------|------------------------|---------------|
| Bugfix | Jeden blad = jeden fix. Zero debaty. | Quick Fix (2 agentow) |
| Prosty CRUD | Standardowe operacje. Brak konfliktu domenowego. | Solo (1 agent) |
| Hotfix produkcyjny | Czas jest krytyczny. Debata to 7-15 min. | Quick Fix |
| Prosty feature | Dodaj przycisk, zmien kolor. Brak trade-offu. | Feature Sprint |
| Prototyp/POC | Eksploracja, nie decyzja strategiczna. | Recon Squad |
| Czysty research | Potrzebujesz wiedzy, nie decyzji. | Research Swarm |

---

## 5. OUTPUT -- Co dostajesz?

Five Minds Protocol produkuje PIECIOWARSTWOWY output -- od strategicznego dokumentu decyzyjnego, przez rejestr ryzyk, az po zbudowany produkt.

### Output 1: FIVE_MINDS_REPORT.md (Raport z debaty)

To jest UNIKALNY artefakt -- zaden inny preset go nie produkuje. Pelna historia debaty:

```markdown
# FIVE MINDS REPORT
## Temat: [Opis decyzji strategicznej]
## Data: [timestamp]
## Uczestincy: Elena Voss, Pixel Nowakowski, Raven Blackwood, [Ekspert 4], Cien (Shadow)

### 1. Executive Summary
[2-3 zdania: jaka decyzje podjeto i dlaczego]

### 2. Pozycje ekspertow
#### Dr. Elena Voss (Domena A):
[Pelna pozycja z argumentami i dowodami]

#### Karol "Pixel" Nowakowski (Domena B):
[Pelna pozycja z argumentami i dowodami]

#### Raven Blackwood (Domena C):
[Pelna pozycja z argumentami i dowodami]

#### [Ekspert 4] (Domena D):
[Pelna pozycja z argumentami i dowodami]

### 3. Zidentyfikowane konflikty
[Lista sprzecznosci miedzy pozycjami]

### 4. Devil's Advocate Challenges  ← BUG-009 FIX
[Pelna lista wyzwan Ciena + odpowiedzi ekspertow]

### 5. Gold Solution
[Opis syntezy transcendujacej oryginalne konflikty]

### 6. Ryzyka i mitygacje
[Tabela ryzyk zidentyfikowanych przez Ciena z planami mitygacji]

### 7. Wytyczne implementacyjne
[Konkretne instrukcje dla builderow Phase 3]
```

### Output 2: GOLD_SOLUTION.md (Dokument strategiczny)

Skondensowana wersja Gold Solution do bezposredniego uzycia:
- Executive summary (3-5 zdan)
- Strategia z uzasadnieniem
- Decyzje technologiczne z atrybucja ("wybrano X, bo Elena wykazala Y, Raven potwierdzil metryka Z")
- Ryzyka zaakceptowane swiadomie (z podpisem Ciena: "zakwestionowalem, eksperci uzasadnili")
- Implementation roadmap dla builderow

### Output 3: Zbudowany produkt (Phase 3)

Kod, artefakty, pliki -- zbudowane SCISLE wedlug Gold Solution. Builderzy Phase 3 nie podejmuja decyzji architektonicznych -- wszystkie decyzje zostaly juz podjete w Phase 2. Ich rola to IMPLEMENTACJA.

### Output 4: QA Report (Phase 4)

Raport jakosci weryfikujacy zgodnosc implementacji z Gold Solution.

### Roznica miedzy Five Minds a innymi presetami -- output

```
SOLO (1 agent):        Kod. Brak uzasadnienia decyzji.
RESEARCH SWARM (9):    MANIFEST.md z badaniami. Brak decyzji. Brak kodu.
FULL HIERARCHY (13):   Kod + QA. Decyzje podejmowane jednoosobowo przez Orkiestratora.
FIVE MINDS (15+):      Kod + QA + FIVE_MINDS_REPORT + GOLD_SOLUTION.
                       Decyzje podjete KOLEKTYWNIE przez 4 ekspertow + Devil's Advocate.
                       Pelna sciezka audytowa. Atrybucja pozycji. Rejestr ryzyk.
```

---

## 6. Mechanizm Debaty -- Jak dziala strukturalna argumentacja

Debata w Five Minds Protocol NIE JEST wolna dyskusja. To jest STRUKTURALNY PROCES z 5 fazami (2a-2e), jasnymi zasadami i zdefiniowanymi rolami. Wolna dyskusja degeneruje sie w chaos -- strukturalna debata produkuje Gold Solution.

### Zasady debaty

**Zasada 1: Position Staking (Obowiazkowe zajecie stanowiska)**
Kazdy ekspert MUSI zadeklarowac jednoznaczna pozycje. Nie wolno powiedziec "to zalezy" lub "obie opcje sa dobre". Musisz powiedziec: "Moim zdaniem najlepsza opcja to X, PONIEWAZ Y i Z." To wymusza precyzje myslenia.

**Zasada 2: Evidence Requirement (Wymaganie dowodow)**
Kazda pozycja musi byc poparta dowodami: danymi, badaniami, benchmarkami, case studies, doswiadczeniem eksperckim. "Mysle, ze React jest lepszy" to nie jest pozycja. "React ma 18M pobranego tygodniowo na npm, 73% udzial w rynku frontend frameworks wedlug State of JS 2025, i moj team ma 3 lata doswiadczenia z React" to jest pozycja.

**Zasada 3: Conflict Acknowledgment (Jawne uznanie konfliktu)**
Kiedy dwie pozycje sie sprzeczaja, konflikt musi byc JAWNIE SFORMULOWANY. Nie zamieciony pod dywan, nie zlekcewaazony jako "drobna roznica", ale postawiony na stol: "Elena twierdzi X. Pixel twierdzi nie-X. To jest konflikt, ktory musi zostac rozwiazany."

**Zasada 4: Devil's Advocate Mandate (Obowiazek kwestionowania)**
Cien (Shadow) MA OBOWIAZEK zakwestionowac KAZDA pozycje i KAZDA zaproponowana synteze. Nie wolno mu powiedziec "wyglada dobrze". Nawet jesli Gold Solution wydaje sie idealna, Cien musi zapytac: "A co jesli sie mylicie? Jaki jest plan B?"

**Zasada 5: Synthesis Over Compromise (Synteza ponad kompromis)**
Cel debaty to NIE kompromis ("wezmmy po trochu od kazdego"). Cel to SYNTEZA -- kreatywne rozwiazanie, ktore transcenduje oryginalny konflikt. Kompromis: "CV bedzie polowa ATS, polowa designerskie" (nic nie robi dobrze). Synteza: "Dual-output z jednego zrodla" (robi OBE rzeczy doskonale).

### Przebieg debaty -- pelny przyklad

Przyklad: Wybor stack technologicznego dla platformy marketplace.

```
PHASE 2a — POSITION STATEMENTS:

ELENA (Tech/Backend):
  "Wybieram Go + PostgreSQL + monorepo. Go daje nam 40x lepsza wydajnosc
   niz Node.js przy I/O-heavy workloadach. PostgreSQL ma 30 lat stabilnosci.
   Monorepo upraszcza CI/CD przy malym zespole."
   [Dowody: benchmarki TechEmpower, case study Uber, Stack Overflow Survey]

PIXEL (Frontend/UX):
  "Wybieram Svelte + TailwindCSS. Svelte generuje 40% mniejszy bundle
   niz React, szybszy TTI, lepszy UX. React jest overengineered
   dla marketplace."
   [Dowody: State of JS 2025 satisfaction scores, Svelte benchmarki]

RAVEN (Business/Metrics):
  "Wybieram React + Node.js + MongoDB. Najwiekszy talent pool (73% rynku),
   najszybszy czas rekrutacji (14 dni vs 45 dla Go), MongoDB flexible schema
   idealny dla marketplace z roznymi typami produktow."
   [Dowody: LinkedIn job market data, Indeed hiring metrics]

EKSPERT 4 (Security):
  "Wybieram Rust + PostgreSQL. Zero memory bugs. Type safety.
   Marketplace przetwarza platnosci -- zero tolerancji dla CVE."
   [Dowody: OWASP Top 10, CVE database analysis per language]

PHASE 2b — CONFLICTS:

  KONFLIKT 1: Go (Elena) vs Rust (Security) vs Node.js (Raven) — backend
  KONFLIKT 2: Svelte (Pixel) vs React (Raven) — frontend
  KONFLIKT 3: Performance (Elena+Security) vs Talent Pool (Raven) — hiring
  KONFLIKT 4: MongoDB (Raven) vs PostgreSQL (Elena+Security) — database

PHASE 2c — DEVIL'S ADVOCATE:

CIEN: "Cztery pytania:
  1. Raven, czy talent pool React naprawde jest 73%? A ile z tego to juniorzy?
     Czy nie lepiej miec 3 senior Go devow niz 10 junior React devow?
  2. Elena, Go jest szybki, ale czy marketplace naprawde potrzebuje 40x
     wydajnosci? Ilu uzytkownikow jednoczesnych REALNIE oczekujesz w Y1?
  3. Security, Rust jest bezpieczny, ale learning curve to 6-12 miesiecy.
     Ile opozni to launch? Czy opozniony launch nie jest wiekszym ryzykiem
     niz potencjalne CVE, ktore mozna mitygowac audytem?
  4. Pixel, Svelte ma 4% adoption. Jesli Svelte umrze jak Backbone,
     kto bedzie utrzymywal ten kod za 3 lata?"

PHASE 2d — BREAKTHROUGH:

  Po odpowiedzi na wyzwania Ciena:
  - Raven przyznaje: talent pool argument jest slabszy niz sadzil
  - Elena przyznaje: 40x wydajnosc nie jest potrzebna w Y1
  - Security przyznaje: Rust learning curve jest realnym ryzykiem
  - Pixel przyznaje: risk Svelte ekosystemu jest prawdziwy

  BREAKTHROUGH (Raven proponuje):
  "Go + React + PostgreSQL. Go na backend (dobra wydajnosc, prostszy
   niz Rust, szybszy do nauki niz Rust, lepszy niz Node.js).
   React na frontend (talent pool + ecosystem, NIE Svelte ryzyko).
   PostgreSQL (Elena + Security zgodni). Monorepo (Elena ma racje).
   Security: audyt kodu + SAST/DAST zamiast Rust."

PHASE 2e — GOLD SOLUTION:

  Go + React + PostgreSQL + monorepo + security auditing pipeline.
  Zaden ekspert nie zaproponowal tego stacku na poczatku.
  Kazdy musial USCIC swoja pozycje pod wplywem argumentow innych.
  To jest SYNTEZA, nie kompromis.
```

---

## 7. Devil's Advocate -- Dlaczego jest obowiazkowy

Cien (Shadow) to najwazniejsza innowacja Five Minds Protocol. Bez niego -- to jest po prostu "czterech ekspertow glosujacych". Z nim -- to jest mechanizm, ktory SYSTEMATYCZNIE eliminuje groupthink, confirmation bias i scope creep.

### Co robi Devil's Advocate

1. **Kwestionuje dowody:** "Skad te dane? Z jakiego roku? Z jakiej probki? Czy nie sa stronnicze?"
2. **Testuje zalozenia:** "Zakladasz 10K uzytkownikow dziennie. A jesli bedzie 500? A jesli bedzie 100K? Czy architektura skaluje sie w OBU kierunkach?"
3. **Szuka over-engineeringu:** "Naprawde potrzebujecie Kubernetes dla 5-osobowego zespolu? Naprawde potrzebujecie microservices przy 500K LOC?"
4. **Wymusza plan B:** "Co jesli wasza glowna technologia zostanie deprecated? Co jesli kluczowy dostawca zbankrutuje? Jaki jest exit strategy?"
5. **Weryfikuje synteze:** Nawet Gold Solution przechodzi przez filtr Ciena. "Czy ta synteza naprawde rozwiazuje konflikty, czy tylko je maskuje?"

### Co sie dzieje BEZ Devil's Advocate

| Patologia | Opis | Konsekwencja |
|-----------|------|--------------|
| **Groupthink** | Eksperci zbyt szybko sie zgadzaja, bo chca byc "mili" | Slaba decyzja, bo nikt nie kwestionowal zalozen |
| **Confirmation bias** | Eksperci szukaja dowodow potwierdzajacych ich teze, ignoruja sprzeczne | Stronnicza analiza, przeoczone ryzyka |
| **Scope creep** | Kazdy ekspert dodaje "jeszcze jedna rzecz" do rozwiazania | Over-engineered rozwiazanie, przekroczony budzet |
| **Domain imperialism** | Najglosniejszy ekspert narzuca swoje zdanie | Mono-perspektywiczna decyzja zamiast multi-perspektywicznej |
| **False consensus** | Eksperci mysla, ze sie zgadzaja, ale rozumuja rozne rzeczy pod tymi samymi slowami | Ambiguous Gold Solution, niespojona implementacja |

### Realny wplyw Ciena -- case study z projektu CV

```
BEZ CIENA (hipotetyczny przebieg):
  Elena: "ATS-first, single-column, monochrome"
  Pixel: "React, animacje, dark theme"
  Raven: "Dual-output"
  → Eksperci akceptuja Dual-output BEZ kwestionowania
  → Architektura: React + SSR + GraphQL + headless CMS + K8s
  → Koszt: ~$50/miesiac hosting, 200+ godzin developmentu
  → Problem: OVER-ENGINEERED dla CV!

Z CIEN (rzeczywisty przebieg):
  [te same pozycje ekspertow]
  CIEN: "Dual-output OK, ale DLACZEGO React + SSR + K8s dla CV?
         Czy static site z build-time rendering nie zrobi dokladnie
         tego samego za $0/miesiac hosting i 40 godzin developmentu?"
  → Architektura uproszczona: Static site + build-time rendering
  → Koszt: $0/miesiac hosting, 40 godzin developmentu
  → OSZCZEDNOSC: $600/rok hosting + 160 godzin developmentu
  → Ten sam wynik (dual-output), 5x prostsza architektura
```

Cien nie zaproponowal rozwiazania. Cien ZAKWESTIONOWAL zlozonosc rozwiazania. I to kwestionowanie wymusilo uproszczenie, ktore bylo lepsze dla WSZYSTKICH.

---

## 8. Gold Solution -- Sztuka syntezy

Gold Solution to centralny output Five Minds Protocol. To NIE jest kompromis. To NIE jest usrednienie pozycji. To NIE jest glosowanie. To jest TWORCZA SYNTEZA -- rozwiazanie, ktore:

1. **Transcenduje oryginalny konflikt** -- zamiast rozwiazywac "A vs B", zmienia pytanie na "jak miec A ORAZ B"
2. **Spelnia kryteria KAZDEGO eksperta** -- nie "po trochu", ale "w pelni, w inny sposob niz ekspert zakladal"
3. **Przetrwalo atak Devil's Advocate** -- Cien nie znalazl fundamentalnej wady
4. **Jest PROSTSZA niz suma czesci** -- bo Cien wymusil eliminacje zbednej zlozonosci

### Kompromis vs Synteza -- kluczowa roznica

```
PROBLEM: "ATS wymaga prostego tekstu. UX wymaga bogatego designu."

KOMPROMIS:
  "Zrobmy CV w polowie proste, w polowie designerskie."
  → ATS parsuje 60% tresci (Elena niezadowolona: 40% jest tracone)
  → Design jest przecietny (Pixel niezadowolony: ani ladne, ani funkcjonalne)
  → Metryki konwersji spadaja (Raven niezadowolony: gorsze niz obie czyste wersje)
  → Wynik: NIKT nie jest zadowolony. To jest "design by committee".

SYNTEZA (Gold Solution):
  "Dual-Output from One Source: jeden plik zrodlowy,
   DWA wyjscia -- ATS-pure + Rich Portfolio."
  → ATS parsuje 100% tresci (Elena: pelne parsowanie ✓)
  → Portfolio ma pelny design (Pixel: animacje, dark theme, wow factor ✓)
  → Obie wersje maja metryki (Raven: konwersja mierzalna na obu ✓)
  → Architektura prosta (Cien: static site, zero overengineering ✓)
  → Wynik: WSZYSCY sa zadowoleni. Nie dlatego, ze kompromis,
     ale dlatego, ze zmieniono FRAMING problemu.
```

### Jak dochodzi do Gold Solution -- mechanizm

Gold Solution nie pojawia sie magicznie. Pojawia sie, gdy:

1. **Konflikty sa jawne** -- eksperci precyzyjnie widza, CO dokladnie jest w sprzecznosci
2. **Cien eliminuje sztuczne konflikty** -- "Czy ten konflikt jest PRAWDZIWY, czy wynika z blednych zalozen?"
3. **Ekspert-katalizator (czesto Raven) zmienia framing** -- zamiast "A vs B" proponuje "A AND B through C"
4. **Pozostali eksperci weryfikuja** -- "Czy C naprawde daje mi pelne A?" (Elena), "Czy C naprawde daje mi pelne B?" (Pixel)
5. **Cien stress-testuje** -- "A co jesli C sie nie skaluje? Co jesli C jest zbyt drogie? Jaka jest MINIMALNA wersja C?"
6. **Synthesizer formalizuje** -- GOLD_SOLUTION.md z pelna dokumentacja

### Kiedy Gold Solution NIE powstaje

Nie kazda debata konczy sie Gold Solution. Czasem konflikty sa FUNDAMENTALNE i nie da sie ich zsyntezowac:

- **Budzet vs Ambicja:** Klient chce platforme Netflix za $10K. Zaden Gold Solution tego nie rozwiaze. Odpowiedz: "Redefine scope."
- **Regulacje vs UX:** Prawo wymaga 3-krotnej weryfikacji tozsamosci. UX chce "one-click login". Zaden Gold Solution tego nie rozwiaze. Odpowiedz: "Regulacje wygrywaja, UX dostosowuje sie."
- **Time vs Quality:** Deadline za 2 tygodnie, scope na 6 miesiecy. Odpowiedz: "Cut scope, nie quality."

W takich przypadkach Five Minds Report dokumentuje: "Gold Solution nie zostala osiagnieta. Powod: [fundamentalny konflikt]. Rekomendacja: [konkretna sciezka]."

---

## 9. Porownanie z 7 wzorcami debaty

Five Minds Protocol nie powstal w prozni. Jest inspirowany siedmioma istniejacymi wzorcami debaty w systemach wieloagentowych. Ponizej porownanie -- co Five Minds bierze z kazdego, a co robi inaczej.

### Tabela porownawcza

```
┌─────────────────────┬──────────────┬──────────────┬──────────────┬──────────┐
│ WZORZEC             │ ADVERSARIAL? │ PERSONA-     │ DEVIL'S      │ GOLD     │
│                     │              │ DRIVEN?      │ ADVOCATE?    │ SOLUTION?│
├─────────────────────┼──────────────┼──────────────┼──────────────┼──────────┤
│ Irving Debate       │ ✓ Pelne      │ ✗ Brak       │ ✗ Brak       │ ✗ Brak   │
│ (2018)              │              │              │              │          │
├─────────────────────┼──────────────┼──────────────┼──────────────┼──────────┤
│ Society of Mind     │ ~ Czesciowe  │ ~ Czesciowe  │ ✗ Brak       │ ✗ Brak   │
│ (Minsky-inspired)   │              │              │              │          │
├─────────────────────┼──────────────┼──────────────┼──────────────┼──────────┤
│ Multi-Agent Debate  │ ✓ Pelne      │ ✗ Brak       │ ✗ Brak       │ ~ Partia │
│ (Du et al., 2023)   │              │              │              │          │
├─────────────────────┼──────────────┼──────────────┼──────────────┼──────────┤
│ FORD                │ ~ Czesciowe  │ ✓ Pelne      │ ✗ Brak       │ ✗ Brak   │
│                     │              │              │              │          │
├─────────────────────┼──────────────┼──────────────┼──────────────┼──────────┤
│ ChatEval            │ ✓ Pelne      │ ✗ Brak       │ ✗ Brak       │ ✗ Brak   │
│                     │              │              │              │          │
├─────────────────────┼──────────────┼──────────────┼──────────────┼──────────┤
│ LLM-Debate          │ ✓ Pelne      │ ✗ Brak       │ ✗ Brak       │ ✗ Brak   │
│                     │              │              │              │          │
├─────────────────────┼──────────────┼──────────────┼──────────────┼──────────┤
│ A-HMAD              │ ✓ Pelne      │ ~ Czesciowe  │ ~ Czesciowe  │ ✗ Brak   │
│ (Adversarial HMAD)  │              │              │              │          │
├─────────────────────┼──────────────┼──────────────┼──────────────┼──────────┤
│ FIVE MINDS          │ ✓ Pelne      │ ✓ Pelne      │ ✓ MANDAT.    │ ✓ Pelne  │
│ PROTOCOL            │              │              │              │          │
└─────────────────────┴──────────────┴──────────────┴──────────────┴──────────┘
```

### Szczegolowe porownanie

**Irving Debate (2018):** Agenci debatuja, sedzia ocenia. Brak specjalizacji domenowej -- agenci sa generyczni. Five Minds dodaje: persony eksperckie, Devil's Advocate, Gold Solution.

**Society of Mind (Minsky-inspired):** Wiele "umyslow" wspolpracuje, ale brak formalnej struktury debaty. Umysly moga sie ignorowac. Five Minds dodaje: obowiazkowa konfrontacja, jawne konflikty, sekwencyjne fazy.

**Multi-Agent Debate (Du et al., 2023):** Najblizszy wzorzec. Agenci debatuja i poprawiaja odpowiedzi iteracyjnie. ALE: brak person -- wszyscy agenci sa identyczni. Brak Devil's Advocate. Brak Gold Solution jako formalnego outputu. Five Minds dodaje: specjalizacja domenowa, obowiazkowy sceptyk, formalny dokument syntezy.

**FORD (Framework for Open Reasoning and Deliberation):** Role-based deliberation z perspektywami. ALE: brak adversarial mandate -- agenci "dyskutuja", ale nie sa zobowiazani do kwestionowania. Five Minds dodaje: obowiazkowy Devil's Advocate, jawne konflikty, fazy debaty.

**ChatEval:** Wieloagentowa ewaluacja z debata. Skupiony na OCENIE (grading), nie na DECYZJI. Five Minds jest zaprojektowany do podejmowania decyzji strategicznych, nie do oceniania tekstow.

**LLM-Debate:** Dwa agenty debatuja, sedzia rozstrzyga. Prosty format 2-stronny. Five Minds rozszerza do 4+1 stron z domenami i strukturalnym procesem.

**A-HMAD (Adversarial Hierarchical Multi-Agent Debate):** Hierarchiczna debata z adversarial elementami. Najblizszy do Five Minds pod wzgledem struktury. ALE: brak formalnego Devil's Advocate jako ROLI (adversarial jest wbudowane w proces, nie w agenta). Brak Gold Solution. Five Minds dodaje: dedykowany agent-sceptyk, formalny dokument syntezy, pipeline research-->debate-->build.

### Co Five Minds UNIKALNIE laczy

1. **Persona-driven debate** (z FORD) + **Adversarial mandate** (z Irving/Du et al.)
2. **Formalny Devil's Advocate** (nie istniejacy w zadnym z 7 wzorcow jako ROLA)
3. **Gold Solution** jako artefakt (nie istniejacy w zadnym z 7 wzorcow)
4. **Pipeline end-to-end** (research-->debate-->build-->QA) -- inne wzorce to TYLKO debata
5. **Audytowalnosc** -- FIVE_MINDS_REPORT.md z pelna sciezka decyzyjna

---

## 10. Koszt i tokeny -- Dlaczego debata jest warta swojej ceny

Five Minds Protocol jest jednym z droiszych presetow w ekosystemie. Debata (Phase 2) zuzywa wiekszosc budzetu. Dlaczego to jest uzasadnione?

### Rozklad kosztow per faza

```
PHASE 1: RESEARCH (4 Haiku + 1 Opus)
┌─────────────────────────────────────────────────────────┐
│ 4x Researcher Haiku: 4 × ~20K tok = ~80K tok           │
│   Koszt: 4 × ~$0.02 = ~$0.08                           │
│ 1x Orkiestrator Opus: ~15K tok                          │
│   Koszt: ~$0.03                                         │
│ SUBTOTAL: ~95K tok | ~$0.11                             │
│ [████░░░░░░░░░░░░░░░░] 12% budzetu                     │
└─────────────────────────────────────────────────────────┘

PHASE 2: DEBATE (5 Opus + 1 Opus Synthesizer)
┌─────────────────────────────────────────────────────────┐
│ 4x Expert Opus: 4 × ~40K tok = ~160K tok                │
│   Koszt: 4 × ~$0.08 = ~$0.32                           │
│ 1x Devil's Advocate Opus: ~35K tok                      │
│   Koszt: ~$0.06                                         │
│ 1x Synthesizer Opus: ~45K tok                           │
│   Koszt: ~$0.08                                         │
│ 1x Orkiestrator (moderacja) Opus: ~20K tok              │
│   Koszt: ~$0.04                                         │
│ SUBTOTAL: ~260K tok | ~$0.50                            │
│ [████████████░░░░░░░░] 55% budzetu ← NAJDROZSZE        │
└─────────────────────────────────────────────────────────┘

PHASE 3: BUILD (3 Sonnet)
┌─────────────────────────────────────────────────────────┐
│ 3x Builder Sonnet: 3 × ~50K tok = ~150K tok             │
│   Koszt: 3 × ~$0.06 = ~$0.18                           │
│ SUBTOTAL: ~150K tok | ~$0.18                            │
│ [███████░░░░░░░░░░░░░] 25% budzetu                     │
└─────────────────────────────────────────────────────────┘

PHASE 4+5: QA + DELIVERY (1 Sonnet + 1 Opus)
┌─────────────────────────────────────────────────────────┐
│ 1x QA Sonnet: ~25K tok | ~$0.04                         │
│ 1x Orkiestrator (finalizacja) Opus: ~10K tok | ~$0.02   │
│ SUBTOTAL: ~35K tok | ~$0.06                             │
│ [██░░░░░░░░░░░░░░░░░░] 8% budzetu                      │
└─────────────────────────────────────────────────────────┘

TOTAL: ~540K tok (typowe) | ~$0.85 (typowe)
RANGE: 400-800K tok | $0.50-$1.50
```

### Dlaczego debata MUSI byc na Opus

Debata wymaga SILNEGO rozumowania. Ekspert musi:
- Przeczytac 4 raporty badawcze (czytanie ze zrozumieniem)
- Sformulowac pozycje z dowodami (reasoning + argumentation)
- Odpowiedziec na wyzwania innych ekspertow (counter-argumentation)
- Odpowiedziec na wyzwania Devil's Advocate (defense under pressure)
- Uczestniczyc w syntezie (creative problem solving)

Haiku NIE jest w stanie prowadzic nuansowanej debaty. Sonnet prowadzi ja "na pol gwizdka" -- argumenty sa plytsze, dowody mniej precyzyjne, synteza mniej kreatywna. Opus to jedyny model, ktory konsekwentnie produkuje argumenty na poziomie eksperckim.

### ROI -- kiedy koszt debaty sie zwraca

```
SCENARIUSZ: Wybor stack technologiczny dla platformy SaaS

BEZ Five Minds (decyzja jednoosobowa):
  CTO wybiera technologie na podstawie osobistych preferencji.
  Wybiera MongoDB, bo "lubie NoSQL".
  6 miesiecy pozniej: MongoDB nie skaluje sie dla relacyjnych danych
  marketplace. Migracja do PostgreSQL: 200 godzin dewelopera × $80/h = $16,000.

Z Five Minds ($0.85):
  Debata ujawnia: MongoDB jest ryzykowne dla relacyjnych danych (Elena).
  Cien kwestionuje: "Dlaczego NoSQL dla relacyjnych danych?"
  Gold Solution: PostgreSQL z JSONB dla flex schema.
  Oszczednosc: $16,000 migracji uniknieta.
  ROI: $16,000 / $0.85 = 18,824x zwrot z inwestycji.
```

---

## 11. Kiedy uzywac (a kiedy NIE)

### ZIELONA STREFA -- Uzywaj Five Minds

| Scenariusz | Dlaczego Five Minds? |
|------------|---------------------|
| **Wybor stack technologicznego** | 3+ technologie do porownania, kazda z trade-offami. Eksperci bronia swoich wyborow. Devil's Advocate eliminuje bias. |
| **Decyzja architektoniczna** | Monolith vs microservices vs modular monolith. Kazda opcja ma zwolennikow. Potrzeba syntezy. |
| **UX vs Performance tradeoff** | Animacje spowalniaja load time. UX chce rich experience. Performance chce <2s TTI. Jak miec oba? |
| **Security vs Usability** | 2FA spowalnia login. Passwordless jest wygodne, ale mniej bezpieczne. Biometric wymaga hardware. |
| **Strategia migracji** | Big bang vs incremental vs strangler fig. Kazda opcja ma zwolennikow i przeciwnikow w zespole. |
| **Risk assessment** | Kluczowa decyzja z wieloma niewiadomymi. Potrzeba systematycznego kwestionowania (Devil's Advocate). |
| **Vendor/tool selection** | Stripe vs Adyen vs PayPal. AWS vs GCP vs Azure. Kazdy vendor ma fanatykowgfdf i krytykow. Potrzeba obiektywnej debaty. |
| **Strategic pivot** | Firma rozwaaza zmiane modelu biznesowego. Multi-perspektywiczna analiza z stress-testingiem. |

### CZERWONA STREFA -- NIE uzywaj Five Minds

| Scenariusz | Dlaczego NIE? | Lepszy preset |
|------------|---------------|---------------|
| **Bugfix** | Jeden blad, jedna poprawka. Zero debaty. | Quick Fix (2 agentow) |
| **Prosty CRUD** | Standardowe operacje. Zero konfliktu domenowego. | Solo (1 agent) |
| **Hotfix produkcyjny** | Czas jest krytyczny. Debata = 7-15 min opoznienia. | Quick Fix |
| **Prosty feature** | Dodaj przycisk, zmien kolor. Zero trade-offu. | Feature Sprint (7) |
| **Prototyp/POC** | Eksploracja, nie decyzja. Badanie, nie debata. | Recon Squad (3) |
| **Czysty research** | Potrzebujesz wiedzy, nie decyzji. | Research Swarm (9) |
| **Code review** | Ocena istniejacego kodu, nie decyzja strategiczna. | QA preset |
| **Dokumentacja** | Pisanie docsow nie wymaga debaty ekspertow. | Solo |

### Drzewo decyzyjne

```
START: Mam zadanie do wykonania.

Q1: Czy zadanie wymaga DECYZJI STRATEGICZNEJ (nie implementacji)?
  NIE → Uzyj innego presetu (Solo, Feature Sprint, Full Hierarchy)
  TAK ↓

Q2: Czy decyzja dotyczy 2+ domen (np. tech + UX + business)?
  NIE → Uzyj Research Swarm (jednodomenkowy research) lub Solo
  TAK ↓

Q3: Czy istnieje AUTENTYCZNY KONFLIKT miedzy domenami?
  NIE → Brak konfliktu = brak potrzeby debaty. Uzyj Research Swarm.
  TAK ↓

Q4: Czy koszt ZLEJ decyzji jest > $500 (lub > 40h pracy dewelopera)?
  NIE → Decyzja niskoryzykowna. Solo lub Feature Sprint wystarczy.
  TAK ↓

Q5: Czy potrzebujesz AUDYTOWALNOSCI (pelneg historii "dlaczego tak")?
  NIE → Full Hierarchy (decyduje Orkiestrator jednoosobowo)
  TAK ↓

→ FIVE MINDS PROTOCOL
```

---

## 12. Scenariusze -- Trzy pelne przyklady

### Scenariusz 1: Stack technologiczny dla nowego SaaS

**INPUT:** "Zaprojektuj stack technologiczny dla platformy do zarzadzania projektami (Jira competitor). Team: 5 senior devow. Budzet: $150K/rok. Target: 5K firm, 50K uzytkownikow. Timeline: MVP w 6 miesiecy."

**Phase 2 -- Przebieg debaty:**

ELENA (Backend/Infra): "TypeScript + NestJS + PostgreSQL + Docker. NestJS daje enterprise patterns (DI, modules, guards). PostgreSQL z Prisma ORM. Docker dla reproducible deployments. Monorepo z Turborepo."

PIXEL (Frontend/UX): "React + Next.js 14 z App Router + Radix UI + Framer Motion. SSR dla SEO, server components dla wydajnosci, Radix dla accessible components, Framer dla micro-interactions. Dark mode domyslnie -- devtools audience."

RAVEN (Business/Growth): "Potrzebujemy SZYBKO na rynek. Next.js full-stack (API routes zamiast osobnego backendu). Jeden framework = szybszy dev. Supabase zamiast custom backendu -- auth, realtime, storage out-of-box. Vercel hosting -- zero DevOps."

CIEN: "Raven, Supabase jest vendor lock-in. Co jesli podniosą ceny 3x? Elena, NestJS + Prisma to 2 warstwy abstrakcji -- czy naprawde potrzebujecie OBU? Pixel, Framer Motion dodaje 40KB do bundle -- czy 50K uzytkownikow project management tool naprawde potrzebuje animacji?"

**GOLD SOLUTION:** Next.js 14 full-stack (kompromis Elena-Raven: nie osobny backend, ale z NestJS-like structure via route handlers). PostgreSQL z Drizzle ORM (lzejszy niz Prisma, co Cien uznal za wystarczajace). Radix UI (Pixel dostal accessible components). ZERO Framer Motion (Cien wygral -- project management tool nie potrzebuje fancy animacji). Self-hosted na Railway zamiast Supabase (Cien wygral -- brak vendor lock-in). Turborepo monorepo (Elena wygrala).

---

### Scenariusz 2: Security vs UX -- autentykacja fintech

**INPUT:** "Platforma do mikro-platnosci. Uzytkownicy: non-tech, 60% mobile. Regulacje: PSD2 (Strong Customer Authentication wymagane). UX goal: platnosc w <10 sekund. Budget: $30K na auth module."

**Phase 2 -- Przebieg debaty:**

ELENA (Security): "PSD2 wymaga SCA: minimum 2 z 3 faktorow (knowledge, possession, inherence). Implementacja: TOTP + biometric. Zadnych kompromisow -- regulacje to nie sugestie."

PIXEL (UX): "10 sekund na platnosc. TOTP to 15-30 sekund sam w sobie (otworz app, znajdz kod, wpisz 6 cyfr). Biometric: Touch ID/Face ID -- 1-2 sekundy. Passkeys: zero-friction. Proponuje: passkeys jako primary, biometric jako secondary."

RAVEN (Business): "Conversion rate spada 12% na kazdy dodatkowy krok autentykacji. Przy 100K transakcji/miesiac i sredniej 5 PLN, kazdy dodatkowy krok = -60K PLN/miesiac w utraconych transakcjach."

CIEN: "Elena, czy PSD2 NAPRAWDE wymaga TOTP? Czy biometric + device possession nie spelniaja SCA? Pixel, passkeys maja 23% adoption -- co z 77% uzytkownikow bez wsparcia? Raven, czy 12% drop rate dotyczy fintech, czy ogolnego e-commerce?"

**GOLD SOLUTION:** Biometric (inherence) + device binding (possession) = SCA compliant BEZ TOTP. Passkeys jako optional upgrade (nie primary -- zbyt niska adopcja, Cien mial racje). Fallback: SMS OTP (nie idealny, ale 100% device coverage). Platnosc w <8 sekund (biometric: 1-2s, device check: invisible, transaction: 3-5s). Koszt: $22K (ponizej budzetu -- Cien wymusil eliminacje zbednych komponentow).

---

### Scenariusz 3: Migracja monolith --> microservices

**INPUT:** "System ERP (500K LOC, Java 8, Oracle DB, 15 lat). 50 modulow, 200 tabel. SLA 99.95%. 3 zespoly (15 devow). Budzet: $400K. Timeline: 18 miesiecy. Cel: rozdzielenie na niezalezne serwisy, modernizacja do Java 17+."

**Phase 2 -- Przebieg debaty:**

ELENA (Architecture): "Strangler Fig pattern. Nie big bang -- zbyt ryzykowny przy 500K LOC. Nie incremental refactoring -- zbyt wolny, nigdy sie nie skonczy. Strangler Fig: budujemy nowe serwisy obok starego systemu, przekierowujemy ruch modulowo, stary system 'usycha'."

PIXEL (Developer Experience): "Jesli migrujemy 18 miesiecy, devsi beda pracowac w DWOCH systemach jednoczesnie. DX koszmar. Proponuje: modular monolith najpierw -- wydzielmy moduly WEWNATRZ monolitu (bounded contexts), a dopiero potem wyciagajmy je jako serwisy. Krok posredni zmniejsza cognitive load."

RAVEN (Business): "50 modulow, 18 miesiecy, 15 devow. Matematyka: 3.6 modulu na dewelopera. Przy strangler fig kazdy modul to ~2 miesiace. Nie starczy czasu na WSZYSTKIE 50. Proponuje: zidentyfikowac 10-15 kluczowych modulow (Pareto: 20% modulow generuje 80% wartosci) i TYLKO TE migrujemy."

CIEN: "Elena, strangler fig zaklada, ze mozna bezpiecznie przekierowac ruch. Ile cross-module dependencies macie? Jesli modul A zalezy od B, C i D, nie mozesz go wyciagnac bez nich. Pixel, modular monolith to dodatkowy krok -- ile miesiecy to doda? Raven, ktore 10-15 modulow? Czy macie dane o tym, ktore generuja wartosc, czy to 'gut feeling'?"

**GOLD SOLUTION:** Phase 1 (miesiace 1-6): Modular monolith -- wydzielenie bounded contexts WEWNATRZ monolitu (Pixel mial racje o DX). Phase 2 (miesiace 7-18): Strangler fig dla 12 kluczowych modulow zidentyfikowanych przez dependency analysis (nie gut feeling -- Cien wymuszil dane). Java 8 --> Java 17 w Phase 1 (latwiej w monolicie niz w microservices). Oracle --> PostgreSQL per-modul w Phase 2 (nie big bang migration calej bazy). Pozostale 38 modulow ZOSTAJE w zmodularyzowanym monolicie -- migracja do microservices w nastepnej fazie (jesli w ogole -- Cien: "Moze nie wszystko MUSI byc microservice?").

---

## 13. Human in the Loop -- Nadzor Czlowieka nad Debata

### 13.1 Koncept

Five Minds Protocol dziala w dwoch trybach: **AUTONOMICZNY** (domyslny) i **NADZOROWANY** (Human in the Loop, HITL). W trybie autonomicznym Orkiestrator prowadzi caly pipeline od Research do Delivery bez przerw. W trybie nadzorowanym czlowiek wchodzi w pipeline w scisle okreslonych **punktach interwencji** -- bramkach decyzyjnych.

Kluczowa zasada: czlowiek w trybie HITL **NIE robi pracy merytorycznej**. Od tego sa eksperci. Czlowiek kontroluje KIERUNEK debaty i podejmuje kluczowe decyzje w bramkach. Nie pisze kodu, nie analizuje danych, nie generuje argumentow -- to robia agenci. Czlowiek mowi: "TAK, kontynuuj", "NIE, zmien kurs" lub "DODAJ ten constraint, ktorego AI nie zna".

Analogia: **pilot z autopilotem**. Autopilot leci -- utrzymuje wysokosc, predkosc, kurs. Ale pilot decyduje o zmianie kursu, o ladowaniu, o reakcji na burze. Autopilot wykonuje 95% pracy, pilot podejmuje 5% decyzji -- ale te 5% sa krytyczne. W Five Minds HITL: agenci wykonuja cala prace merytoryczna, czlowiek podejmuje decyzje w 3 bramkach.

Tryb HITL nie jest "lepszy" niz autonomiczny. Jest INNY. Uzywasz go, gdy masz wiedze, ktorej AI nie ma, lub gdy stawka jest zbyt wysoka, zeby zdac sie wylacznie na agentow.

### 13.2 Trzy Punkty Interwencji

Pipeline Five Minds z bramkami HITL wyglada nastepujaco:

```
┌──────────┐    ┌──────────┐    ┌───────────┐    ┌─────────────────┐    ┌───────────┐    ┌──────────────┐    ┌───────────┐    ┌───────┐
│Researchers│───>│ Eksperci │───>│ HUMAN #1  │───>│Devil's Advocate │───>│ HUMAN #2  │───>│Gold Solution │───>│ HUMAN #3  │───>│ Build │
│ (Phase 1) │    │(Phase 2a)│    │(Gate/Bramka)│   │   (Phase 2c)    │    │(Gate/Bramka)│   │  (Phase 2e)  │    │(Gate/Bramka)│   │(Ph. 3)│
└──────────┘    └──────────┘    └───────────┘    └─────────────────┘    └───────────┘    └──────────────┘    └───────────┘    └───────┘
     auto            auto           STOP              auto                  STOP              auto                STOP           auto
```

#### Punkt Interwencji #1 -- Po pozycjach ekspertow (po Phase 2a)

Czlowiek widzi pozycje WSZYSTKICH czterech ekspertow -- ich argumenty, dowody, rekomendacje. To jest moment, w ktorym mozesz wstrzyknac informacje, ktorej AI NIE MIAL. Eksperci debatowali na podstawie danych z Research -- ale Ty znasz kontekst organizacyjny, polityczny, budzetowy.

**Opcje czlowieka:**
- **"Kontynuuj"** -- pozycje wyglada sensownie, niech debata toczy sie dalej
- **"Dodaj constraint"** -- "PostgreSQL, bo mamy DBA ktory go zna od 8 lat" -- eksperci MUSZA uwzglednic ten constraint w dalszej debacie
- **"Zmien kierunek"** -- "Ignorujcie opcje on-premise, jestesmy all-in na cloud" -- zaweza przestrzen decyzyjna

**Przyklad:** Eksperci debatuja o bazie danych dla SaaS. Elena proponuje MongoDB, Pixel chce Firebase, Raven argumentuje za DynamoDB. Czlowiek mowi: "PostgreSQL -- mamy Senior DBA, ktory go zna od 8 lat, i licencje enterprise na 3 lata." To informacja, ktorej AI nie mial. Eksperci musza teraz uwzglednic ten constraint -- debata zmienia kierunek, bo pojawil sie FAKT z realnego swiata.

#### Punkt Interwencji #2 -- Po Devil's Advocate (po Phase 2c)

Czlowiek widzi zastrzezenia Ciena -- lista krytycznych pytan, ryzyk, slabosci w argumentacji ekspertow. To jest moment, w ktorym oceniasz, czy sceptycyzm Ciena jest uzasadniony, czy przesadzony.

**Opcje czlowieka:**
- **"Cien ma racje"** -- "Faktycznie, uprosccie architekture. Dual-output to za duzo dla naszego zespolu 3-osobowego"
- **"Odrzucam sceptycyzm"** -- "Nie, dual-output zostaje. Mamy doswiadczenie z takim podejsciem i wiemy, ze dziala"
- **"Czesciowo"** -- "Punkty 1 i 3 Ciena sa trafne, punkt 2 ignorujcie"

**Przyklad:** Cien kwestionuje: "PostgreSQL wymaga wiecej DevOps niz managed DynamoDB. Czy macie DevOps inzyniera?" Czlowiek: "Tak, mamy dwoch. Akceptuje ryzyko. GO." Cien podnosil uzasadniony punkt -- ale czlowiek ma kontekst, ze ryzyko jest juz pokryte.

#### Punkt Interwencji #3 -- Przed Build (Gold Solution review)

Czlowiek widzi pelny **Gold Solution** -- finalny dokument strategiczny, ktory jest wynikiem syntezy debaty. To jest ostatnia bramka przed faza implementacji. Decyzja jest binarna z jednym wariantem:

**Opcje czlowieka:**
- **GO** -- "Buduj dokladnie wg Gold Solution"
- **NO-GO** -- "Wracaj do debaty. Problem: [opis]" -- pipeline wraca do Phase 2b (Conflict Surfacing) z nowym constraintem
- **PARTIAL GO** -- "Punkty 1-4 OK, punkt 5 do przerobienia. Zbuduj 1-4, punkt 5 wracaj do ekspertow"

**Przyklad:** Gold Solution proponuje 5-punktowy plan migracji. Czlowiek: "Punkty 1-4 sa swietne. Punkt 5 -- 'migracja bazy w weekend' -- to nierealne, mamy SLA 99.9%. Przerobcie punkt 5 na zero-downtime migration." Build startuje dla punktow 1-4, punkt 5 wraca do ekspertow.

### 13.3 Tryb Autonomiczny vs Nadzorowany -- Porownanie

| Parametr | Autonomiczny | Nadzorowany (HITL) |
|----------|-------------|-------------------|
| **Decyzje** | Orkiestrator | Czlowiek w bramkach |
| **Czas** | ~3-5 min | ~5-15 min (z oczekiwaniem na czlowieka) |
| **Ryzyko** | AI moze pojsc w zly kierunek | Czlowiek koryguje na biezaco |
| **Koszt tokenowy** | Taki sam | Taki sam |
| **Koszt calkowity** | Tokeny | Tokeny + czas czlowieka |
| **Kontekst organizacyjny** | Tylko z promptu | Prompt + wiedza czlowieka w bramkach |
| **Use case** | Rutynowe decyzje, zaufany pipeline | Krytyczne decyzje, nowy domain, wysoka stawka |
| **Powtarzalnosc** | Pelna automatyzacja | Wymaga obecnosci czlowieka |
| **Jakosc decyzji** | Wysoka (ale ograniczona do danych AI) | Najwyzsza (AI + wiedza domenowa czlowieka) |

### 13.4 Kiedy HITL, a kiedy autonomicznie?

**Uzywaj HITL gdy:**
- Decyzja jest **nieodwracalna lub kosztowna** -- migracja produkcyjnej bazy, wybor stacku na 3 lata, architektura dla 100-osobowego zespolu
- Pracujesz w **nowym domain** -- AI moze nie znac kontekstu Twojej organizacji, branzy, ograniczen prawnych
- Masz **wiedze domenowa, ktorej AI nie ma** -- "nasz DBA zna PostgreSQL", "mamy licencje na Oracle do 2028", "CEO nie zaakceptuje open-source"
- **Stawka jest wysoka** -- produkcja, klienci, compliance, regulacje, bezpieczenstwo
- **Zespol jest maly** -- przy 3 osobach kazda decyzja architektoniczna jest krytyczna, bo nie ma zasobow na poprawki

**Uzywaj trybu autonomicznego gdy:**
- Pipeline jest **zaufany i powtarzalny** -- robisz to juz po raz piaty i wiesz, ze AI dobrze sobie radzi
- Decyzja jest **odwracalna** -- prototyp, spike, proof of concept, ktory mozna wyrzucic
- **Czas jest krytyczny** -- hotfix w produkcji, deadline za 2 godziny (uwaga: wtedy moze Five Minds w ogole nie jest wlasciwym presetem)
- AI **zna domain lepiej niz Ty** -- porownanie benchmarkow, analiza 50 bibliotek, ocena kompatybilnosci wersji
- Koszt zlej decyzji jest **niski** -- wewnetrzny tool, side project, hackathon

### 13.5 Scenariusz HITL w praktyce

**Zadanie:** "Wybierz stack technologiczny dla SaaS do faktur dla polskiego rynku MiSP"

| Krok | Kto | Co sie dzieje | Czas |
|------|-----|---------------|------|
| 1. Research | 4x agenci (auto) | 4 raporty: frameworki, bazy danych, hosting, compliance PL | ~30s |
| 2. Eksperci | 4x eksperci (auto) | Elena: PostgreSQL + Django. Pixel: Supabase + Next.js. Raven: metryki konwersji. Ekspert4: KSeF compliance. | ~45s |
| **3. HUMAN #1** | **Czlowiek** | **"PostgreSQL -- mamy DBA. Django -- zespol zna Python. KSeF jest priorytetem nr 1."** | **~30s** |
| 4. Devil's Advocate | Cien (auto) | "Django + PostgreSQL to solidny wybor, ale: (1) PostgreSQL wymaga wiecej DevOps niz managed Supabase, (2) Django monolith nie skaluje sie latwo, (3) KSeF API jest niestabilne -- co jesli sie zmieni?" | ~20s |
| **5. HUMAN #2** | **Czlowiek** | **"Punkt 1: mamy DevOps. Punkt 2: akceptujemy, bo SaaS dla MiSP nie wymaga skali Netflixa. Punkt 3: sluszny -- dodajcie abstraction layer na KSeF. GO."** | **~10s** |
| 6. Gold Solution | Synthesizer (auto) | Dokument: Django 5 + PostgreSQL 16 + KSeF abstraction layer + Docker + AWS ECS. 5 punktow implementacji. | ~30s |
| **7. HUMAN #3** | **Czlowiek** | **"GO -- buduj. Ale zmiencie AWS ECS na Fly.io, bo budzet startupowy."** | **~10s** |
| 8. Build | 3x agenci (auto) | Kod, testy, deploy na Fly.io | auto |

**Laczny czas interwencji czlowieka: ~50 sekund.** Agenci zrobili cala prace merytoryczna w ~3 minuty. Czlowiek wstrzyknal 3 kluczowe informacje: (1) mamy DBA od PostgreSQL, (2) akceptujemy trade-offy Ciena, (3) Fly.io zamiast AWS. Te 50 sekund radykalnie zmienilo kierunek decyzji -- bez nich AI prawdopodobnie wybraloby Supabase + Vercel (popularne, ale nie pasujace do kontekstu).

### 13.6 Implementacja techniczna

Orkiestrator w trybie HITL zatrzymuje pipeline w zdefiniowanych punktach i czeka na input czlowieka. Technicznie:

- **Mechanizm:** Orkiestrator emituje event `AWAITING_HUMAN_INPUT` z payloadem zawierajacym dotychczasowy stan debaty. Pipeline jest wstrzymany (PAUSED), ale stan jest zachowany w pamieci.
- **Typy inputu:** Czlowiek moze odpowiedziec: (a) tekst -- nowy constraint lub informacja, (b) decyzja -- GO / NO-GO / PARTIAL GO, (c) modyfikacja -- "zmien X na Y w Gold Solution".
- **Timeout:** Konfigurowalne. Domyslnie: 10 minut. Jesli czlowiek nie odpowie w zadanym czasie, system moze: (a) przejsc w tryb autonomiczny i kontynuowac (domyslne), (b) wstrzymac pipeline do odpowiedzi, (c) wyslac przypomnienie (webhook, email, Slack).
- **Log:** Kazda interwencja czlowieka jest zapisywana w `FIVE_MINDS_REPORT.md` z tagiem `[HUMAN_OVERRIDE]`. Format: `[HUMAN_OVERRIDE] Gate #N | Decision: GO/NO-GO/CONSTRAINT | Input: "tresc" | Timestamp: ISO-8601`. To zapewnia pelna auditowalnosc -- po fakcie widac dokladnie, gdzie czlowiek zmienil kurs debaty.
- **Konfiguracja:** Tryb HITL wlacza sie flaga `hitl_mode: true` w konfiguracji presetu. Mozna tez wlaczyc selektywnie: `hitl_gates: [1, 3]` -- tylko bramka #1 i #3, bramka #2 pominieta (autonomiczna).

---

## 14. Anti-patterny -- Czego unikac

### Anti-pattern 1: Groupthink (Nadmierny konsensus)

**Objaw:** Wszyscy czterech ekspertow zgadza sie w Phase 2a. Brak konfliktow w Phase 2b. Debata konczy sie w 2 minuty.

**Przyczyna:** Promptowanie ekspertow jest zbyt ogolne -- nie maja WYRAZNEJ domeny do obrony. Lub temat jest zbyt prosty dla Five Minds.

**Rozwiazanie:** (a) Upewniaj sie, ze kazdy ekspert ma PRECYZYJNIE zdefiniowana domene z KONKRETNYMI preferencjami. (b) Jesli nie ma konfliktu -- temat nie nadaje sie do Five Minds. Uzyj Research Swarm lub Solo.

**Sygnaly ostrzegawcze:**
- Faza 2b (Conflict Surfaced) jest pusta
- Cien nie ma czego kwestionowac
- Gold Solution = pozycja jednego eksperta bez modyfikacji

### Anti-pattern 2: Silent Devil (Cichy adwokat diabla)

**Objaw:** Cien (Shadow) zadaje 1-2 slabe pytania i milknie. Eksperci nie czuja presji. Gold Solution nie przechodzi stress-testu.

**Przyczyna:** Prompt Ciena jest zbyt miekki. Cien "nie chce przeszkadzac" (anthropomorphizacja agenta).

**Rozwiazanie:** Prompt Ciena musi JAWNIE zawierac: "Musisz zakwestionowac MINIMUM 3 aspekty kazdej pozycji. Nie wolno Ci zaakceptowac zadnej pozycji bez co najmniej jednego challenge. Twoja wartosc jest PROPORCJONALNA do ilosci wyzwan, ktore stawiasz."

**Sygnaly ostrzegawcze:**
- Sekcja "Devil's Advocate Challenges" w FIVE_MINDS_REPORT.md ma mniej niz 5 pytan
- Eksperci nie modyfikuja swoich pozycji po Phase 2c
- Gold Solution jest identyczna z poczatkowa propozycja jednego eksperta

### Anti-pattern 3: Endless Debate (Debata bez konca)

**Objaw:** Eksperci debatuja w kolko. Cien cigle kwestionuje. Brak konwergencji. Phase 2 trwa 30+ minut i nie produkuje Gold Solution.

**Przyczyna:** Brak limitu rund. Brak definicji "wystarczajaco dobra synteza". Cien ma zbyt agresywny prompt.

**Rozwiazanie:** (a) Limit: maksimum 3 rundy debaty (pozycje → konflikty+challenge → synteza). Jesli po 3 rundach brak Gold Solution -- Orkiestrator podejmuje decyzje na podstawie zebranych argumentow. (b) Cien ma limit 5-7 wyzwan na runde.

**Sygnaly ostrzegawcze:**
- Phase 2 przekracza 15 minut
- Eksperci powtarzaja te same argumenty
- Cien kwestionuje juz zakwestionowane kwestie

### Anti-pattern 4: Domain Imperialism (Dominacja jednego eksperta)

**Objaw:** Jeden ekspert (najczesciej ten z najsilniejszym promptem) dominuje debate. Pozostali sie wycofuja. Gold Solution = pozycja dominujacego eksperta.

**Przyczyna:** Nierownowaga w promptach ekspertow. Jeden ekspert ma wiecej "personality" lub silniejsze instrukcje.

**Rozwiazanie:** (a) Rowna dlugosc i sila promptow dla wszystkich ekspertow. (b) Orkiestrator aktywnie moderuje: "Elena przedstawila pozycje. Pixel, jaka jest TWOJA pozycja, NIEZALEZNIE od Eleny?" (c) Cien kwestionuje ROWNO wszystkich, nie tylko slabszych.

**Sygnaly ostrzegawcze:**
- W FIVE_MINDS_REPORT.md jedna pozycja jest 3x dluzsza niz pozostale
- Gold Solution zawiera >80% elementow jednej pozycji
- Inni eksperci "zgadzaja sie z Eksperten X" zamiast broniac swojej domeny

### Anti-pattern 5: Fake Synthesis (Falazywa synteza)

**Objaw:** Gold Solution jest ogloszona, ale tak naprawde to kompromis (kazdy dostal cos, nikt nic w pelni) albo incoherent wish list ("zrobmy WSZYSTKO").

**Przyczyna:** Brak presji Ciena na stress-testowanie syntezy. Lub Synthesizer nie weryfikuje, czy synteza NAPRAWDE spelnia kryteria kazdego eksperta.

**Rozwiazanie:** (a) Po ogloszeniu Gold Solution -- KAZDY ekspert musi potwierdzic: "Czy Gold Solution spelnia TWOJE kluczowe kryterium? TAK/NIE. Jesli NIE -- CO brakuje?" (b) Cien pyta: "Czy ta synteza naprawde transcenduje konflikty, czy tylko maskuje?"

---

## 15. Porownanie z Research Swarm i Full Hierarchy

Trzy presety Tier 4 ENTERPRISE -- kazdy sluzy innemu celowi. Kiedy ktory?

### Tabela porownawcza

```
┌─────────────────────┬──────────────────┬──────────────────┬──────────────────┐
│ PARAMETR            │ RESEARCH SWARM   │ FIVE MINDS       │ FULL HIERARCHY   │
├─────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Agentow             │ 9                │ ~15+             │ 13               │
├─────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Cel glowny          │ WIEDZA           │ DECYZJA          │ PRODUKT          │
│                     │ (pure research)  │ (strategic call) │ (full build)     │
├─────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Debata?             │ ✗ Brak           │ ✓ CENTRALNA      │ ✗ Brak           │
│                     │                  │   (Phase 2)      │                  │
├─────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Devil's Advocate?   │ ✗ Brak           │ ✓ OBOWIAZKOWY    │ ✗ Brak           │
│                     │ (ma Critica,     │   (Cien/Shadow)  │                  │
│                     │  nie DA)         │                  │                  │
├─────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Buduje kod?         │ ✗ NIE            │ ✓ TAK (Phase 3)  │ ✓ TAK            │
├─────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Kto decyduje?       │ Synthesizer      │ 4 ekspertow +    │ Orkiestrator     │
│                     │ (podsumowuje)    │ Devil's Advocate  │ (jednoosobowo)   │
│                     │                  │ (kolektywnie)    │                  │
├─────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Output dokumenty    │ MANIFEST.md      │ FIVE_MINDS_      │ Kod + QA Report  │
│                     │                  │ REPORT.md +      │                  │
│                     │                  │ GOLD_SOLUTION.md │                  │
├─────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Audytowalnosc       │ Srednia          │ MAKSYMALNA       │ Niska            │
│                     │ (raporty zrodel) │ (pelna sciezka)  │ (brak historii   │
│                     │                  │                  │  decyzji)        │
├─────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Koszt               │ $0.20-$0.60      │ $0.50-$1.50      │ $0.45-$1.20      │
├─────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Latencja            │ 90-240s          │ 400-900s         │ 300-600s         │
├─────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Kiedy uzywac        │ "Chce WIEDZIEC"  │ "Chce ZDECYDOWAC"│ "Chce ZBUDOWAC" │
└─────────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

### Drzewo decyzyjne: ktory Tier 4 preset?

```
START: Mam zlozony problem enterprise.

Q1: Czy potrzebuje WIEDZY (research) czy DZIALANIA (decyzja+budowa)?
  WIEDZA → RESEARCH SWARM (9 agentow, $0.20-0.60, pure research)
  DZIALANIE ↓

Q2: Czy jest AUTENTYCZNY KONFLIKT DOMENOWY wymagajacy debaty?
  NIE → FULL HIERARCHY (13 agentow, $0.45-1.20, pelen build)
  TAK ↓

Q3: Czy potrzebuje AUDYTOWALNEJ SCIEZKI DECYZYJNEJ?
  NIE → FULL HIERARCHY (Orkiestrator decyduje, szybciej)
  TAK ↓

→ FIVE MINDS PROTOCOL (15+ agentow, $0.50-1.50, debata+build)
```

### Laczenie presetow

Five Minds moze byc uzywany w pipeline z innymi presetami:

```
RESEARCH SWARM (zbierz wiedze)
       ↓
FIVE MINDS (podejmij decyzje na podstawie wiedzy)
       ↓
[Gold Solution jako input]
       ↓
FULL HIERARCHY (zbuduj na podstawie decyzji)
```

Ten 3-presetowy pipeline to NAJDROZSZA ($1.50-$3.50) ale tez NAJGLEBSZA mozliwa konfiguracja: 6 researcherow → krytyk → syntetyk → 4 ekspertow → devil's advocate → synthesizer → 5 warstw budowy z potrojnym QA.

---

## 16. Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────────┐
│              FIVE MINDS PROTOCOL — QUICK REFERENCE                  │
│              Tier 4 ENTERPRISE | Preset #28 | 9/10                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  WZORZEC:    Fan-out Research → Structured Debate → Fan-out Build  │
│  AGENTOW:    ~15+ (4 Researchers + 4 Experts + DA + Synth + 3B)   │
│  MODELE:     7x Opus + 4x Sonnet + 4x Haiku                      │
│  TOKENY:     400-800K                                              │
│  KOSZT:      $0.50-$1.50                                           │
│  LATENCJA:   400-900 sekund (7-15 minut)                           │
│                                                                     │
│  5 FAZ:      Research → Debate (2a-2e) → Build → QA → Delivery    │
│  4 EXPERTS:  Elena (Domena A) + Pixel (Domena B)                   │
│              + Raven (Domena C) + Ekspert 4 (Domena D)             │
│  DEVIL'S ADVOCATE: Cien (Shadow) — OBOWIAZKOWY                    │
│                                                                     │
│  OUTPUT:     FIVE_MINDS_REPORT.md + GOLD_SOLUTION.md + Kod + QA   │
│  UZYJ:      Decyzje strategiczne, trade-offy, risk assessment     │
│  NIE UZYWAJ: Bugfix, CRUD, hotfix, prosty feature, prototyp       │
│                                                                     │
│  UNIKALNOSC: JEDYNY preset z adversarial debate mechanism          │
│              JEDYNY preset produkujacy Gold Solution                │
│              JEDYNY preset z obowiazkowym Devil's Advocate          │
│                                                                     │
│  BUG-009:    DA perspektywa MUSI byc w FIVE_MINDS_REPORT.md       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Slowniczek

| Termin | Definicja |
|--------|-----------|
| **Adversarial collaboration** | Wspolpraca przez produktywny konflikt -- eksperci nie zgadzaja sie, ale niezgoda sluzy lepszemu wynikowi |
| **Devil's Advocate (Adwokat Diabla)** | Agent bez lojalnosci domenowej, ktorego jedynym mandatem jest kwestionowanie kazdej decyzji i zalozenia |
| **Gold Solution** | Tworcza synteza transcendujaca oryginalne konflikty -- nie kompromis, ale rozwiazanie wyzszego rzedu |
| **Groupthink** | Patologia decyzyjna, gdy grupa dazy do konsensusu kosztem jakosci analizy -- nikt nie kwestionuje, wszyscy sie zgadzaja |
| **Position Staking** | Obowiazkowe zajecie jednoznacznego stanowiska z dowodami -- ekspert nie moze powiedziec "to zalezy" |
| **Structured Debate** | Debata z fazami (pozycje→konflikty→challenge→synteza), a nie wolna dyskusja |
| **Breakthrough Resolution** | Moment, gdy eksperci znajduja rozwiazanie transcendujace oryginalne konflikty -- czesto zaproponowane przez agent-katalizator |
| **Domain Imperialism** | Anti-pattern: jeden ekspert dominuje debate i narzuca swoja pozycje |
| **Silent Devil** | Anti-pattern: Devil's Advocate nie kwestionuje wystarczajaco mocno |
| **Fake Synthesis** | Anti-pattern: Gold Solution jest tak naprawde kompromisem lub incoherent wish list |
| **FIVE_MINDS_REPORT.md** | Pelny raport z debaty z pozycjami, konfliktami, challenge'ami i Gold Solution |
| **Fan-out** | Wzorzec rownolegiego uruchamiania wielu agentow jednoczesnie |
| **Strangler Fig** | Wzorzec migracji: nowy system budowany obok starego, ruch przekierowywany modulowo |
| **Dual-Output** | Strategia produkowania dwoch roznych wyjsc z jednego zrodla (np. ATS CV + Rich Portfolio) |
| **SCA (Strong Customer Authentication)** | Wymog PSD2: autentykacja z minimum 2 z 3 faktorow (knowledge, possession, inherence) |

---

## Zrodla i literatura

1. **Du, Y. et al. (2023)** — "Improving Factuality and Reasoning in Language Models through Multiagent Debate" — fundamentalna praca o multi-agent debate jako mechanizmie poprawy jakosci odpowiedzi LLM
2. **Irving, G. et al. (2018)** — "AI Safety via Debate" — Irving Debate jako mechanizm bezpieczenstwa AI poprzez adversarial argumentation
3. **Minsky, M. (1986)** — "The Society of Mind" — wielosc "umyslow" wspoltworzy inteligencje -- inspiracja dla multi-agent systems
4. **Anthropic Research (2024-2025)** — Multi-Agent Orchestration patterns: fan-out, pipeline, hierarchical coordination
5. **Gold Standard Agent Architecture 2026** — MASTERCLASS Agent Teams, AGENT_TEAMS_CONFIGURATOR v9, analiza 27 presetow
6. **FORD Framework** — Framework for Open Reasoning and Deliberation — role-based deliberation z perspektywami
7. **ChatEval (2023)** — Multi-agent evaluation through debate
8. **A-HMAD** — Adversarial Hierarchical Multi-Agent Debate — hierarchiczna debata z elementami adversarial
9. **Janis, I. (1972)** — "Victims of Groupthink" — klasyczna praca o patologii decyzji grupowych
10. **Sunstein, C. & Hastie, R. (2015)** — "Wiser: Getting Beyond Groupthink" — jak strukturalna niezgoda poprawia decyzje grupowe
11. **Kahneman, D. et al. (2021)** — "Noise: A Flaw in Human Judgment" — o roli adversarial review w redukcji szumu decyzyjnego

---

# PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

```
Tytul: "FIVE MINDS PROTOCOL -- Gdy Twoi Agenci AI Debatuja Lepiej Niz Twoj Zarzad"
Dlugosc: 5-7 minut (7-8 slajdow z timestampami)
Format: Prezentacja wideo z motion graphics i voice-over narration
Rozdzielczosc: 1920x1080

PALETA KOLOROW:
- Primary: Amber/Gold (#F59E0B) — kolor Gold Solution, syntezy, mądrości
- Background: Deep Slate (#0F172A) — ciemne tlo enterprise
- Conflict: Rose (#F43F5E) — kolor konfliktu, sprzecznosci, napięcia
- Resolution: Teal (#14B8A6) — kolor rozwiazania, syntezy, przełomu
- Expert A (Elena): Indigo (#6366F1) — akademickosc, dane, standardy
- Expert B (Pixel): Violet (#8B5CF6) — kreatywnosc, design, UX
- Expert C (Raven): Emerald (#10B981) — metryki, biznes, ROI
- Devil's Advocate (Cien): Crimson (#DC2626) — kwestionowanie, czerwona flaga
- Accent: White (#FFFFFF) na tekst glowny
- Subtle: Slate (#64748B) na tekst drugoplanowy

MOTYW WIZUALNY:
- Szachy: 4 ekspertow jako rozne figury szachowe (Elena = wieza/stabilnosc,
  Pixel = goniec/przekatne myslenie, Raven = hetman/wszechstronnosc,
  Cien = czarny krol/zagrożenie). Szachownica jako metaphora strategii.
- Sala sadowa / jury: 4 swiadkow-ekspertow na stanowisku, sedzia (Orkiestrator),
  adwokat diabla (Cien) w czarnej todze.
- Podium debaty: 4+1 podium z nazwiskami, mikrofony, reflektory.
- Alchemia: konflikty (surowce) --> debata (proces) --> Gold Solution (zloto).

HOOK (pierwsze 10 sekund):
"Co jesli Twoi agenci AI NIGDY sie ze soba nie zgadzaja -- i wlasnie DLATEGO
 podejmuja lepsze decyzje niz jakikolwiek pojedynczy agent? To jest Five Minds
 Protocol -- jedyny preset, w ktorym debata jest FEATURE, nie bug."

SLAJD 1 (0:00-0:45) — "Problem: Groupthink zabija decyzje"
- Animacja: 4 agenty AI (identyczne ikony) siedzace przy stole
- Wszystkie kiwaja glowami jednoczesnie (synchronized nodding animation)
- Napis: "CONSENSUS =/= QUALITY" w Rose (#F43F5E), pulsujacy
- Tekst: "Gdy wszyscy sie zgadzaja -- nikt nie mysli. Groupthink to cichy
  zabojca decyzji strategicznych. Jeden ekspert moze sie mylic. Czterech
  ekspertow kiwajacych glowami w zgadzie -- to GORZEJ niz jeden ekspert."
- Statystyki wjezdzajace: "Badania Janis (1972): 8/9 najwiekszych katastrof
  politycznych XX wieku wynikalo z groupthink."
- Przejscie: szachownica zaczyna sie materializowac z ciemnosci

SLAJD 2 (0:45-1:30) — "4 Ekspertow + 1 Adwokat Diabla"
- Animacja: na szachownicy pojawiaja sie 4 figury w swoich kolorach:
  Wieza/Indigo (Elena), Goniec/Violet (Pixel), Hetman/Emerald (Raven),
  czwarty ekspert domenowy. Potem -- z cieniem i czerwona poswiatą --
  pojawia sie czarny Krol (Cien/Shadow).
- Karty ekspertow wjezdzaja jedna po drugiej z lewej strony:
  [ELENA VOSS] "Dane. Standardy. Parsowalnosc." | Indigo
  [PIXEL NOWAKOWSKI] "Estetyka. Animacje. User Delight." | Violet
  [RAVEN BLACKWOOD] "Metryki. ROI. Konwersja." | Emerald
  [CIEN (SHADOW)] "Dlaczego? A co jesli nie? Udowodnij." | Crimson
- Voiceover: "Czterech ekspertow z ostrymi krawędziami. Kazdy broni SWOJEJ
  domeny. I piąty -- Devil's Advocate -- ktory nie broni NICZEGO. Jego jedyny
  mandat: kwestionowac WSZYSTKO."
- Efekt: karty Ciena ma delikatne trzesienie/glitch effect

SLAJD 3 (1:30-2:30) — "Pipeline 5 Faz"
- Animacja: poziomy flow z lewej do prawej
  Phase 1 (RESEARCH): 4 male ikony researcherow pracujacych rownolegle,
  strzalki leca do centralnej bazy wiedzy (Knowledge Base, ikona mózgu)
  Phase 2 (DEBATE): z bazy wiedzy strzalki do 5 podium -- 4 eksperckie
  (w domenowych kolorach) + 1 czerwone (Cien). Miedzy podiami -- iskry
  konfliktu (Rose #F43F5E sparks). Z debaty — zlota strzalka do:
  Phase 2d: BREAKTHROUGH — animacja wszystkich kolorow (Indigo, Violet,
  Emerald, Crimson) zlewajacych sie w ZLOTO (#F59E0B). Efekt alchemii.
  Phase 3 (BUILD): 3 builderow implementuje Gold Solution
  Phase 4-5 (QA + DELIVERY): tarcza jakosci + output
- Voiceover: "Phase 1: czterech researcherow zbiera dane. Phase 2: eksperci
  debatuja -- konflikty sa JAWNE, nie zamiatane pod dywan. Devil's Advocate
  stress-testuje KAZDE zalozenie. I wtedy dzieje sie magia -- BREAKTHROUGH.
  Rozwiazanie, ktore zaden ekspert nie wymyslilby sam. Gold Solution."
- Kluczowy moment: animacja breakthrough -- iskry konfliktu zamieniaja sie
  w zlote czasteczki, ktore formuja sie w napis "GOLD SOLUTION"

SLAJD 4 (2:30-3:30) — "Mechanizm Debaty -- Real Example"
- Animacja: split screen -- lewa strona: pozycje ekspertow (karty wjezdzaja),
  prawa strona: konflikty (czerwone linie laczace sprzeczne pozycje)
- Przyklad CV case: Elena: "Single-column, ATS-first" | Pixel: "React,
  dark theme, portfolio-first" | Raven: "Metryki konwersji obu wersji"
- Konflikty pojawiaja sie jako czerwone blyskawice miedzy kartami:
  Elena <--⚡--> Pixel (ATS vs Design)
- Potem Cien wchodzi z dolu ekranu (shadow animation, crimson glow):
  "Czy naprawde potrzebujecie React? Czy to CV, czy platforma SaaS?"
- Efekt: karty ekspertow lekko sie trzesa pod wplywem Ciena
- Voiceover: "Kazdy ekspert broni swojej pozycji. Konflikty sa JAWNE --
  nie ukryte za grzecznym 'zgadzam sie'. A potem wchodzi Cien i pyta
  pytanie, ktore nikt nie chcial zadac: 'Czy w ogole potrzebujecie
  tej zlozonosci?'"

SLAJD 5 (3:30-4:30) — "Gold Solution -- Breakthrough Moment"
- Animacja: moment przelomu. Cztery kolorowe orbity (Indigo, Violet,
  Emerald, Crimson) krazace wokol centralnego punktu -- przyspieszaja,
  zbligaja sie, i w wybuchu energii zlewaja w JEDEN ZLOTY ORB.
- Z orba wyplywa dokument: "GOLD SOLUTION: Dual-Output from One Source"
- Pod dokumentem: checkmarks w kolorach ekspertow:
  ✓ Elena: "100% ATS-parsowalne" (Indigo)
  ✓ Pixel: "Pelny portfolio design" (Violet)
  ✓ Raven: "Metryki na obu wersjach" (Emerald)
  ✓ Cien: "Static site, zero over-engineering" (Crimson --> Teal, bo zaakceptowal)
- Napis: "NIE KOMPROMIS. SYNTEZA." — gold text, glow effect
- Voiceover: "Gold Solution to nie kompromis -- to nie 'kazdy dostaje po trochu'.
  To SYNTEZA -- rozwiazanie wyzszego rzedu, ktore transcenduje oryginalny
  konflikt. Dual-Output: jeden plik zrodlowy, DWA doskonale wyjscia. Elena
  ma 100% parsowanie. Pixel ma pelny design. Raven mierzy obie wersje. A Cien?
  Cien wymusil prostote: static site zamiast React+Kubernetes."

SLAJD 6 (4:30-5:30) — "Porownanie z 7 wzorcami + Dlaczego DA jest obowiazkowy"
- Lewa polowa: tabela 7 wzorcow vs Five Minds (animowane checkmarki)
  Irving ✓Adversarial ✗Personas ✗DA ✗Gold
  Du et al. ✓Adversarial ✗Personas ✗DA ~Gold
  FORD ~Adversarial ✓Personas ✗DA ✗Gold
  Five Minds ✓✓✓✓ — wszystkie zielone checkmarki, zloty border
- Prawa polowa: "BEZ Ciena" vs "Z Cien" -- split comparison:
  BEZ: React+SSR+GraphQL+K8s → $50/mies, 200h dev
  Z: Static site → $0/mies, 40h dev
  Strzalka: "OSZCZEDNOSC: $600/rok + 160h" w Teal
- Voiceover: "Five Minds laczy najlepsze elementy siedmiu akademickich
  wzorcow debaty. Ale to, co go wyrozoania, to JEDNA rzecz: obowiazkowy
  Devil's Advocate. Bez Ciena -- ta sama debata produkuje over-engineered
  rozwiazanie za $50 miesiecznie. Z Cien -- proste, eleganckie, za zero."

SLAJD 7 (5:30-6:30) — "Kiedy Five Minds? + ROI"
- Lewa strona: Traffic Light
  ZIELONY: Stack selection, Architecture, Security vs UX, Migration
  CZERWONY: Bugfix, CRUD, Hotfix, Prototyp
- Prawa strona: ROI kalkulacja (animowany kalkulator)
  "Stack decision BEZ Five Minds: zla decyzja → migracja $16,000"
  "Stack decision Z Five Minds: dobra decyzja → $0.85"
  "ROI: 18,824x" — napis eksploduje w zlote confetti
- Dol ekranu: Quick Reference Card (glassmorphism, amber border)
  "15+ agentow | $0.50-1.50 | 7-15 min | JEDYNY preset z debata"
- Voiceover: "Five Minds Protocol to nie preset do codziennego uzytku.
  To jest strategiczna bron na KLUCZOWE decyzje. Ale kiedy jej uzywasz --
  zwrot z inwestycji jest astronomiczny. Osiemdziesiat pieciu centow
  zamiast szesnastu tysiecy dolarow na migracje."

SLAJD 8 (6:30-7:00) — "Outro + Call to Action"
- Animacja: szachownica z poczatku, ale teraz wszystkie figury sa na
  swoich miejscach -- gra w toku, strategia rozegrana. Zlota poswiatą
  na calej planszy.
- Napis glowny: "FIVE MINDS PROTOCOL" w Amber/Gold, duzy, centralny
- Pod spodem: "Adversarial Collaboration. Gold Solution. Zero Groupthink."
- Na dole: "Gold Standard 2026 | Tier 4 ENTERPRISE | Preset #28"
- Voiceover: "Five Minds Protocol. Bo najlepsze decyzje rodza sie
  z kontrolowanego konfliktu -- nie z grzecznego konsensusu.
  Gold Standard Architecture. Kwiecien 2026."
- Fade to black z zlotym particle effect

STYL GLOBALNY:
- Motion graphics: plynne przejscia, ease-in-out, 60fps
- Typografia: Inter/Satoshi sans-serif, H1 72px bold, H2 48px semibold
- Ikony: outline style z glow w kolorze domeny
- Tlo: deep slate z subtelnymi grid lines (szachownica motyw)
- Przejscia miedzy slajdami: chess piece move animation
- Muzyka: ambient electronic, budujaca napięcie w slajdach 2-4,
  release w slajdzie 5 (breakthrough), triumfalna w slajdzie 7 (ROI)
- Sound design: delikatne "szachowe" klikniecia przy pojawianiu sie figur,
  iskry przy konfliktach, dzwiek "transformacji" przy breakthrough
```

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Tytul: "FIVE MINDS PROTOCOL — Strukturalna Debata Ekspertow AI"
Format: Pionowa infografika
Wymiary: 1080x3500px
Rozdzielczosc: 2x (retina-ready)

PALETA KOLOROW:
- Primary: Amber/Gold (#F59E0B) — Gold Solution, synteza
- Background: Deep Slate (#0F172A)
- Conflict: Rose (#F43F5E) — sprzecznosci, napięcie
- Resolution: Teal (#14B8A6) — breakthrough, synteza
- Expert A (Elena): Indigo (#6366F1)
- Expert B (Pixel): Violet (#8B5CF6)
- Expert C (Raven): Emerald (#10B981)
- Devil's Advocate (Cien): Crimson (#DC2626)
- Text Primary: White (#FFFFFF)
- Text Secondary: Slate (#94A3B8)
- Cards bg: rgba(255,255,255,0.05) z border rgba(255,255,255,0.1)

SEKCJA 1: HEADER (1080x250px)
- Tytul: "FIVE MINDS PROTOCOL" w Amber/Gold (#F59E0B), 48px bold, centered
- Podtytul: "Strukturalna Debata Ekspertow AI" w White, 24px semibold
- Tier badge: "TIER 4 ENTERPRISE" w zlotej ramce, 14px uppercase
- Metryki w jednym wierszu: "15+ Agentow | 9/10 | $0.50-1.50 | 7-15 min"
- 4 male awatary ekspertow w kolku (Indigo, Violet, Emerald, Crimson) +
  piaty awatar (Cien) z czerwona poswiatą i "?" zamiast twarzy
- Tlo: gradient od #0F172A do #1E1B4B z subtelnymi szachowymi liniami
- Zlota linia u dolu headera

SEKCJA 2: PROBLEM — DLACZEGO DEBATA (1080x200px)
- Lewa strona: ikona 4 identycznych agentow kiwajacych glowami → napis
  "GROUPTHINK" w Rose, przekreslony
- Prawa strona: ikona 4 roznych ekspertow + 1 w czerwieni (Cien) debatujacych
  → napis "ADVERSARIAL COLLABORATION" w Gold
- Miedzy nimi: strzalka "vs" w bialym kole
- Dol: cytat w italic: "Konsensus =/= Jakosc. Najlepsze decyzje rodza sie
  z kontrolowanego konfliktu."
- Glassmorphism card background

SEKCJA 3: 4 EKSPERTOW + DEVIL'S ADVOCATE (1080x400px)
- 4 karty ekspertow w siatce 2x2 + 1 karta Ciena na dole (pelna szerokosc):
  
  [DR. ELENA VOSS — Domena A]        [KAROL "PIXEL" — Domena B]
  Ikona: wieza szachowa, Indigo       Ikona: goniec, Violet
  "Dane. Standardy. Parsowalnosc."    "Estetyka. Animacje. UX."
  "Za czym walczy: kompatybilnosc"    "Za czym walczy: user delight"
  Model: Opus | 30-50K tok            Model: Opus | 30-50K tok

  [RAVEN BLACKWOOD — Domena C]        [EKSPERT 4 — Domena D]
  Ikona: hetman, Emerald              Ikona: kon, domenowy kolor
  "Metryki. ROI. Konwersja."          "Perspektywa bezpieczenstwa/inna"
  "Za czym walczy: mierzalne wyniki"  "Za czym walczy: dodatkowa domena"
  Model: Opus | 30-50K tok            Model: Opus | 30-50K tok

  ┌─────────────────────────────────────────────────────────┐
  │ CIEN (SHADOW) — DEVIL'S ADVOCATE                        │
  │ Ikona: czarny krol szachowy z czerwona poswiatą         │
  │ "Dlaczego? A co jesli nie? Udowodnij. Uproszc."         │
  │ MANDAT: Kwestionuj KAZDE zalozenie. Zero lojalnosci.    │
  │ Model: Opus | 25-40K tok | Load: 80/100                 │
  │ Crimson border z glow effect                            │
  └─────────────────────────────────────────────────────────┘

- Kazda karta z border w kolorze eksperta (2px solid) i glow (4px blur)
- Cien's card: wieksza, crimson border, delikatny glitch/noise texture

SEKCJA 4: PIPELINE 5 FAZ (1080x450px)
- Pionowy flow diagram z 5 blokami:

  [PHASE 1: RESEARCH] — 4 ikony researcherow (Haiku) pracujacych rownolegle
  Strzalki do centralnej "Knowledge Base" (ikona mozgu)
  Czas: ~60-120s | Koszt: ~$0.11 | Tokeny: ~95K
  ↓

  [PHASE 2: STRUCTURED DEBATE] — NAJDLUZSZA sekcja, zloty border
  2a: Position Statements (4 karty w domenowych kolorach)
  2b: Conflicts Surfaced (czerwone blyskawice miedzy kartami)
  2c: Devil's Advocate (Cien kwestionuje — crimson strzalki)
  2d: BREAKTHROUGH (wszystkie kolory → zloto)
  2e: Gold Solution + FIVE_MINDS_REPORT.md
  Czas: ~180-400s | Koszt: ~$0.50 | Tokeny: ~260K | 55% BUDZETU
  ↓

  [PHASE 3: BUILD] — 3 builderow (Sonnet) implementuja Gold Solution
  Czas: ~120-300s | Koszt: ~$0.18
  ↓

  [PHASE 4: QA] — tarcza jakosci
  ↓

  [PHASE 5: DELIVERY] — output: kod + raporty

- Phase 2 powinna byc WIZUALNIE WYROZNIC — grubszy border, wiekszy blok,
  zlote tlo (rgba), napis "FAZA KLUCZOWA" w Gold

SEKCJA 5: MECHANIZM DEBATY — REAL EXAMPLE (1080x350px)
- Mini-komiks 4 panele:
  Panel 1: Elena: "Single-column, ATS-first!" (Indigo karta)
  Panel 2: Pixel: "React, dark theme, portfolio!" (Violet karta)
  Panel 3: Czerwone blyskawice miedzy nimi → KONFLIKT
  Panel 4: Cien z dolu: "Czy naprawde potrzebujecie React do CV?"
  Panel 5 (duzy, zloty): GOLD SOLUTION — "Dual-Output from One Source"
  → ✓ Elena: 100% ATS | ✓ Pixel: pelny design | ✓ Raven: metryki
  → ✓ Cien: static site, zero overengineering

- Strzalki flow: Pozycje → Konflikty → Challenge → BREAKTHROUGH
- Kolory zmieniaja sie od Rose (konflikt) do Teal (resolution) do Gold (synteza)

SEKCJA 6: GOLD SOLUTION vs KOMPROMIS (1080x250px)
- Split comparison (lewa/prawa):
  LEWA (Rose background): "KOMPROMIS"
  "Polowa ATS + polowa design = nic dobrze"
  Elena: 60% ✗ | Pixel: 50% ✗ | Raven: -30% ✗
  Ikona: broken/cracked medal

  PRAWA (Gold background): "SYNTEZA (Gold Solution)"
  "Dual-Output = OBIE rzeczy doskonale"
  Elena: 100% ✓ | Pixel: 100% ✓ | Raven: +40% ✓
  Ikona: zloty medal z korona

- Strzalka od KOMPROMIS do SYNTEZA: "Five Minds wybiera SYNTEZE, nie KOMPROMIS"

SEKCJA 7: POROWNANIE 7 WZORCOW (1080x300px)
- Tabela 8 wierszy × 5 kolumn:
  [Wzorzec | Adversarial | Personas | Devil's Adv | Gold Solution]
  Irving: ✓ ✗ ✗ ✗
  Society of Mind: ~ ~ ✗ ✗
  Du et al.: ✓ ✗ ✗ ~
  FORD: ~ ✓ ✗ ✗
  ChatEval: ✓ ✗ ✗ ✗
  LLM-Debate: ✓ ✗ ✗ ✗
  A-HMAD: ✓ ~ ~ ✗
  FIVE MINDS: ✓ ✓ ✓ ✓ ← ZLOTY BORDER, podswietlony wiersz
- Pod tabela: "JEDYNY wzorzec z pelnym: persona + adversarial + DA + Gold Solution"

SEKCJA 8: KOSZT I ROI (1080x250px)
- Donut chart z 4 segmentami:
  Phase 1 Research (Haiku): 12% — niebieski
  Phase 2 Debate (Opus): 55% — zloty (NAJDROZSZY, podswietlony)
  Phase 3 Build (Sonnet): 25% — fioletowy
  Phase 4-5 QA+Delivery: 8% — szary
  Srodek donuta: "TOTAL: $0.85 (typowe)"
- Obok donuta: ROI box:
  "Zla decyzja stacku → migracja $16,000"
  "Five Minds: $0.85"
  "ROI: 18,824x" w duzym zlotym foncie
- Pod spodem: "Debata zuzywa 55% budzetu — i WARTO. Bo jakosc DECYZJI
  determinuje jakosc calego projektu."

SEKCJA 9: KIEDY UZYWAC — SYGNALIZACJA SWIETLNA (1080x250px)
- ZIELONY: Stack selection | Architecture | Security vs UX | Migration |
  Risk assessment | Vendor selection | Strategic pivot
- CZERWONY: Bugfix → Quick Fix | CRUD → Solo | Hotfix → Quick Fix |
  Prototyp → Recon Squad | Pure research → Research Swarm
- Kazdy item z ikona i 1-zdaniowym wyjasnieniem

SEKCJA 10: ANTI-PATTERNY (1080x200px)
- Siatka 2x2 kart:
  ✗ Groupthink (wszyscy zgadzaja sie zbyt szybko) | Rose border
  ✗ Silent Devil (Cien nie kwestionuje) | Rose border
  ✗ Endless Debate (brak konwergencji) | Rose border
  ✗ Domain Imperialism (jeden ekspert dominuje) | Rose border
- Kazda karta: ikona ✗ w czerwonym kole, tytul, 1-liniowy opis, rozwiazanie

SEKCJA 11: POROWNANIE TIER 4 PRESETOW (1080x250px)
- Tabela: Research Swarm | Five Minds | Full Hierarchy
- Wiersze: Agentow, Cel, Debata, DA, Buduje kod, Audytowalnosc, Koszt, Latencja
- Five Minds kolumna podswietlona zlota ramka
- Pod tabela: drzewo decyzyjne: "Chce WIEDZIEC → Swarm | Chce ZDECYDOWAC →
  Five Minds | Chce ZBUDOWAC → Full Hierarchy"

SEKCJA 12: QUICK REFERENCE (1080x200px)
- Kompaktowa karta (tlo #1E1B4B, zloty border, border-radius 16px):
  Preset #28 | ~15+ Agentow | 5 Faz | 9/10 Architektura
  Tokeny: 400-800K | Koszt: $0.50-$1.50 | Latencja: 7-15 min
  Modele: 7 Opus + 4 Sonnet + 4 Haiku
  Wzorzec: Fan-out Research → Structured Debate → Fan-out Build
  Unikalnosc: JEDYNY preset z adversarial debate + Gold Solution
  BUG-009: DA perspektywa MUSI byc w FIVE_MINDS_REPORT.md
- 4 male figury szachowe w kolorach ekspertow jako dekoracja

SEKCJA 13: STOPKA (1080x100px)
- "Gold Standard 2026 | Preset #28 — Five Minds Protocol | Tier 4 ENTERPRISE"
- Zlota linia u gory stopki
- "Adversarial Collaboration. Gold Solution. Zero Groupthink." w Gold, centered
- Cztery figury szachowe + czarny krol jako dekoracja

DEKORACJE GLOBALNE:
- Szachowe siatki na calym tle (subtelne, 3-5% opacity)
- Figury szachowe jako watermark co ~700px (8% opacity)
- Numeracja sekcji: "01 //", "02 //", itp. w Amber/Gold
- Amber glow na kluczowych elementach (blur 12px, gold color)
- Czasteczki konfliktu (Rose) w sekcjach debaty, czasteczki zlote w sekcjach syntezy
- Gradient overlay na gore i dole (fade to deep slate)
- Kazda sekcja oddzielona zlota linia z mini-szachowa figura
- Premium feel: border-radius 12-16px, glassmorphism cards
- Motyw alchemii: surowce (4 kolory ekspertow) → proces (debata) → zloto (Gold Solution)
- Subtle chess piece silhouettes w tle sekcji o debacie
```

---

*Dokument opracowany na podstawie Gold Standard Agent Architecture 2026, MASTERCLASS Agent Teams, AGENT_TEAMS_CONFIGURATOR v9 oraz analiz multi-agent debate systems (Du et al. 2023, Irving 2018, FORD, ChatEval, A-HMAD). Dane kosztowe aktualne na kwiecien 2026. Five Minds Protocol to JEDYNY preset z wbudowanym mechanizmem adversarial debate -- jedyna architektura, w ktorej kontrolowany konflikt jest FEATURE, nie bug.*