# DEEP RESEARCH + BUILD -- Pelna Orkiestra 18 Agentow

## Kompletny Przewodnik | Tier 4 ENTERPRISE | Preset #27 | Maksymalna Konfiguracja

**Seria:** Architektura Agentow AI -- Presety i Konfiguracje
**Preset ID:** `deep_research_build`
**Nazwa:** Deep Research + Build (Pelna Orkiestra)
**Ikona:** 🎼
**Tier:** 4 (ENTERPRISE)
**Liczba agentow:** 18
**Wzorzec:** Full Orchestra (Fan-out Research → Critic Evaluation → Synthesis → Build Squad → Triple QA)
**Koszt tokenowy:** ~600-1200K
**Koszt dolarowy:** $0.70-$2.00
**Latencja:** ~600-1500 sekund (10-25 minut)
**Paralelizacja:** 76.9% (14 z 18 agentow moze pracowac rownolegle w szczytowym momencie)
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Pelna Orkiestra

Wyobraz sobie start misji kosmicznej NASA. Setki specjalistow pracuja rownolegle: zespoly propulsji testuja silniki, nawigatorzy obliczaja trajektorie, zespoly komunikacji weryfikuja lacza, inzynierowie bezpieczenstwa analizuja setki scenariuszy awaryjnych. Zaden pojedynczy czlowiek nie jest w stanie ogarnac calego zakresu. Ale wszyscy razem -- orkiestrowani przez Mission Control -- tworza cos, czego zaden z nich nie zbudowalby samodzielnie: bezpieczny lot w kosmos.

Deep Research + Build to architektoniczny odpowiednik takiego startu. Osiemnascie wyspecjalizowanych agentow. Cztery warstwy operacyjne. Szesc rownoleglych sciezek badawczych. Czterech builderow z integratorem. Potrojne QA z managerem. Krytyk oceniajacy kazdy research. Syntetyk laczacy wszystko w spojna calosc. I jeden Orkiestrator -- Mission Control calej operacji.

To nie jest preset do szybkich poprawek. To nie jest preset do prototypow. To jest MAKSYMALNA konfiguracja calego systemu -- uruchamiana wtedy, gdy stawka jest najwyzsza, gdy kazda decyzja technologiczna musi byc poparta gleboka analiza, gdy budowane rozwiazanie musi przejsc potrojna kontrole jakosci, i gdy koszt BLEDU wielokrotnie przekracza koszt ANALIZY.

### Analogia 1: Misja kosmiczna NASA

Mission Control (Orkiestrator) definiuje misje. Szesc zespolow naukowo-badawczych (Researchers) rownolegle analizuje kazdy aspekt: propulsja, nawigacja, komunikacja, life-support, landing, re-entry. Recenzent (Research Critic) weryfikuje kazdy raport -- czy dane sie zgadzaja? Czy wnioski sa poparte dowodami? Glowny Naukowiec (Synthesizer) laczy szesc raportow w jeden spointy plan misji. Czterech inzynierow (Build Squad) buduje poszczegolne systemy. Integrator laczy je w jedna kapsuIe. Trojka inspektorow (Triple QA) sprawdza bezpieczenstwo, jakosc i wydaje koncowe GO/NO-GO.

Nikt nie leci w kosmos bez pelnego audytu. I nikt nie powinien budowac platformy enterprise bez pelnego researchu.

### Analogia 2: Budowa wiezowca -- od geologii do odbioru

Zanim wbije sie pierwsza lopate, geolodzy badaja grunt. Hydrolodzy sprawdzaja wody gruntowe. Urbanisci analizuja przepisy zagospodarowania. Architekci studiuja warunki wiatrowe. Konstruktorzy obliczaja obciazenia. Kazdy raport przechodzi review (Krytyk). Glowny architekt (Syntetyk) laczy wszystkie analizy w jeden projekt. Dopiero wtedy ruszaja ekipy budowlane: fundamenty, konstrukcja stalowa, instalacje, fasada. Inspektor budowlany sprawdza bezpieczenstwo. Komisja odbioru sprawdza jakosc. Kierownik wydaje pozwolenie na uzytkowanie.

Osiemnascie agentow. Kazdy jest konieczny. Zaden nie jest nadmiarowy.

### Analogia 3: Film pelnorazowy -- od scenariusza do premiery

Rezyser (Orkiestrator) definiuje wizje. Scenarzysta (Planner) tworzy plan. Szesc grup researchowych analizuje rynek, publicznosc, trendy, technologie VFX, lokacje, konkurencje. Krytyk wewnetrzny recenzuje scenariusz. Producent (Synthesizer) laczy wszystkie elementy. Ekipy produkcyjne buduja scenografie, nagrywaja dzwiek, filmuja, montuja. Trojka kontroli jakosci: rating board (Security), test audience (Quality), studio head (Manager QA) -- GO/NO-GO na premiere.

> **Czy wiesz, ze...?**
> W systemach wieloagentowych kazde dodanie agenta powyzej 10 zwieksza potencjal paralelizacji, ale rownoczesnie dodaje logarytmiczny narzut komunikacyjny. Przy 18 agentach osiagamy 76.9% paralelizacji -- najwyzszy wskaznik w calym ekosystemie presetow. Ale komunikacja pochIania okolo 15-20% calkowitego budzetu tokenowego. To swiadomy trade-off: placi sie za komunikacje, zyskuje na jakosci i pokryciu.

> **Uwaga!**
> Deep Research + Build to NAJDROZSZY preset w systemie. Przy $0.70-$2.00 za sesje jest 10-20x drozszy niz Solo. Uzywaj go WYLACZNIE gdy: (a) decyzja technologiczna dotyczy calej platformy, (b) wymagana jest gleboka analiza wielu zrodel, (c) budowane rozwiazanie musi przejsc audyt bezpieczenstwa i jakosci, (d) koszt zlej decyzji liczona jest w tysiacach dolarow, nie w minutach dewelopera.

---

## 2. Dlaczego 18 agentow -- kiedy nic mniejszego nie wystarczy

### Problem: Enterprise Due Diligence + Production Build

Wyobraz sobie zadanie: "Zaprojektuj i zbuduj system platnosci dla platformy marketplace obslugujacy 50 krajow, 12 walut, PCI DSS compliance, z integracjami Stripe/PayPal/Adyen, obslugazapytan 10K TPS."

Jedno zadanie. Ale rozloz je na skladowe:

| Aspekt | Wymaga analizy | Wymaga budowy | Wymaga audytu |
|--------|---------------|---------------|---------------|
| Dostawcy platnosci | Reddit opinie, GitHub issues, Docs API | Backend integracje | Security PCI DSS |
| UX checkout flow | UX research, konkurencja | Frontend components | Quality testing |
| Regulacje 50 krajow | Forums prawne, Docs regulatorow | Compliance engine | Security + Quality |
| Architektura TPS | GitHub benchmarki, Tech docs | Backend + integracje | Security + Quality |
| Multi-currency | Forums fintech, X/Twitter trendy | Feature logic | Quality edge cases |

Kazdy wiersz wymaga MINIMUM 3 agentow. Lacznie -- nie ma presetu ponizej 18, ktory pokryje ten zakres BEZ kompromisow.

### Kiedy nic mniejszego nie wystarczy?

| Sytuacja | Dlaczego nie mniejszy preset? |
|----------|-------------------------------|
| Due diligence technologiczny dla inwestora | 6 roznych zrodel, Krytyk walidujacy, formalny raport |
| Platform migration (monolith → microservices) | Research kazdego serwisu + pelna budowa + audyt |
| Regulated industry (fintech, healthtech, edtech) | Compliance wymaga wielozrodlowego researchu + Security QA |
| Multi-vendor evaluation | Reddit + GitHub + Docs + Forums + X -- kazde zrodlo inny insight |
| Enterprise RFP response | Gleboka analiza + dzialajacy prototyp + raport jakosci |

### Roznica miedzy "wystarczajaco" a "kompletnie"

```
Full Hierarchy (13 agentow):
  Research: 4 researcherzy, BEZ Krytyka, BEZ dedykowanego Docs
  Build: 3 builderzy (brak Feature Dev)
  QA: 2 (brak Manager QA -- brak formalnego GO/NO-GO)
  Luka: Brak walidacji researchu. Brak dedykowanego Feature Dev. Brak formalnej bramy jakosci.

Deep Research + Build (18 agentow):
  Research: 6 researcherow + Krytyk + Syntetyk
  Build: 4 builderow (z Feature Dev)
  QA: 3 (z Manager QA -- formalne GO/NO-GO)
  Pokrycie: 100%. Kazdy aspekt ma dedykowanego agenta. Kazdy raport przechodzi review.
```

Pieciu dodatkowych agentow to nie nadmiar. To:
1. **Research Critic** -- waliduje 6 raportow, eliminuje halucynacje i slabe zrodla
2. **Researcher Docs** -- dedykowany agent do oficjalnej dokumentacji (nie mieszany z forumami)
3. **Feature Dev** -- buduje logike biznesowa, nie infrastrukture
4. **Manager QA** -- formalna brama GO/NO-GO z raportem dla stakeholderow
5. **Pelna paralelizacja** -- 6 researcherow rownolegle zamiast 4

> **Czy wiesz, ze...?**
> Roznica miedzy 13-agentowym Full Hierarchy a 18-agentowym Deep Research + Build to nie 38% wiecej agentow. To jakoosciowa zmiana paradygmatu: z "zbuduj dobrze" na "zbadaj gleboko, zweryfikuj krytycznie, zbuduj solidnie, przetestuj potrójnie". To jak roznica miedzy samolotowymi procedurami preflight (checklista) a kosmicznymi procedurami prelauncha (miesiac testow kazdego komponentu).

---

## 3. Architektura -- 4 warstwy, 18 agentow, wszystkie polaczenia

### Diagram architektury

```
                                    ┌─────────────────────────────────────┐
                                    │         WARSTWA STRATEGII           │
                                    │                                     │
                     ┌──────────────┤  A-00 ORKIESTRATOR (Opus)           │
                     │              │  Mission Control calej operacji     │
                     │              └──────┬────────────┬─────────────────┘
                     │                     │            │
            ┌────────┴──────┐    ┌────────┴──────┐   ┌┴──────────────┐
            │  A-01 ANALYST │    │ A-02 PLANNER  │   │ A-03 SYNTHE-  │
            │  (Opus)       │    │ (Sonnet)      │   │ SIZER (Opus)  │
            │  Analiza      │    │ Plan budowy   │   │ Synteza       │
            │  zlozonosci   │    │ i research    │   │ raportow      │
            └───────────────┘    └───────────────┘   └───────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                           WARSTWA BADAWCZA (RESEARCH)                       │
│                                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  │ R-01     │ │ R-02     │ │ R-03     │ │ R-04     │ │ R-05     │ │ R-06     │
│  │ Reddit   │ │ X/Twitter│ │ UX       │ │ GitHub   │ │ Forums   │ │ Docs     │
│  │ Haiku    │ │ Haiku    │ │ Haiku    │ │ Haiku    │ │ Haiku    │ │ Haiku    │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
│       │             │            │             │            │            │     │
│       └─────────────┴────────────┴──────┬──────┴────────────┴────────────┘     │
│                                         │                                     │
│                                  ┌──────┴──────┐                              │
│                                  │ R-07 CRITIC │                              │
│                                  │ (Opus)      │                              │
│                                  │ Recenzja    │                              │
│                                  │ wszystkich  │                              │
│                                  │ raportow    │                              │
│                                  └─────────────┘                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                            WARSTWA BUDOWY (BUILD)                           │
│                                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ B-01 BACKEND │ │ B-02 FRONT-  │ │ B-03 FEATURE │ │ B-04 INTE-   │        │
│  │ DEV          │ │ END DEV      │ │ DEV          │ │ GRATOR       │        │
│  │ Sonnet       │ │ Sonnet       │ │ Sonnet       │ │ Sonnet       │        │
│  │ API, DB,     │ │ UI, UX,      │ │ Logika       │ │ Laczenie     │        │
│  │ infrastruk.  │ │ komponenty   │ │ biznesowa    │ │ komponentow  │        │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘        │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                        WARSTWA JAKOSCI (QUALITY ASSURANCE)                   │
│                                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐             │
│  │ Q-01 QA      │ │ Q-02 QA      │ │ Q-03 MANAGER QA          │             │
│  │ SECURITY     │ │ QUALITY      │ │ (Sonnet)                  │             │
│  │ (Sonnet)     │ │ (Sonnet)     │ │ Formalne GO/NO-GO         │             │
│  │ Audyt bezp.  │ │ Testy funk.  │ │ Raport koncowy            │             │
│  └──────────────┘ └──────────────┘ └──────────────────────────┘             │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mapa polaczen -- kto z kim rozmawia

```
Orkiestrator (A-00) → Analyst (A-01)      : "Przeanalizuj zlozonosc"
Orkiestrator (A-00) → Planner (A-02)      : "Stworzplan badawczy i budowlany"
Orkiestrator (A-00) → R-01..R-06          : "Fan-out: 6 rownoleglych researchow"
Orkiestrator (A-00) → Research Critic (R-07) : "Oceniewaluuj 6 raportow"
Orkiestrator (A-00) → Synthesizer (A-03)  : "Polacz wszystko w synteze"
Orkiestrator (A-00) → B-01..B-04          : "Budujcie wedlug syntezy"
Orkiestrator (A-00) → Q-01..Q-03          : "Audytujcie efekty budowy"

Analyst (A-01) → Orkiestrator             : "Zlozonosc XL, 6 domen badawczych"
Planner (A-02) → Orkiestrator             : "Plan 20-krokowy z timeline"
R-01..R-06 → Research Critic (R-07)       : "Raporty badawcze do recenzji"
Research Critic (R-07) → Synthesizer (A-03) : "Zrecenzowane raporty ze scorami"
Synthesizer (A-03) → Orkiestrator         : "Ujednolicona synteza"
B-01..B-03 → Integrator (B-04)            : "Komponenty do integracji"
Integrator (B-04) → Q-01, Q-02            : "Zintegrowany build do audytu"
Q-01 → Manager QA (Q-03)                  : "Raport bezpieczenstwa"
Q-02 → Manager QA (Q-03)                  : "Raport jakosci"
Manager QA (Q-03) → Orkiestrator          : "GO / NO-GO z uzasadnieniem"
```

### Liczba polaczen

| Warstwa | Agentow | Polaczen wewn. | Polaczen z Ork. | Razem |
|---------|---------|-----------------|-----------------|-------|
| Strategia | 4 | 3 | 3 | 6 |
| Research | 7 | 7 | 7 | 14 |
| Build | 4 | 4 | 4 | 8 |
| QA | 3 | 3 | 3 | 6 |
| **TOTAL** | **18** | **17** | **17** | **34** |

34 aktywne kanaly komunikacyjne. Kazdy z nich to wymiana tokenow. Dlatego overhead komunikacyjny to 15-20% budzetu.

---

## 4. Wszystkie 18 agentow -- szczegolowe karty

### WARSTWA STRATEGII (4 agenty)

#### Agent A-00: Orkiestrator (Mission Control)

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | A-00 |
| **Rola** | STRATEGIA -- koordynacja calej operacji 18 agentow |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 85% (najwyzszy -- koordynuje wszystko) |
| **Narzedzia** | Agent (delegacja), TaskCreate, TaskUpdate, Read |
| **Zakaz** | Write, Edit, Bash, WebSearch |
| **Tokeny/sesja** | ~60-120K |
| **Koszt/sesja** | ~$0.06-$0.18 |

Orkiestrator w Deep Research + Build to najbardziej obciazony Orkiestrator w calym ekosystemie presetow. Koordynuje 17 podleglych agentow w 4 fazach. Jego odpowiedzialnosci:

1. **Analiza wstepna** -- zleca Analystowi ocene zlozonosci, potwierdzenie ze Tier 4 jest uzasadniony
2. **Definicja zakresu badawczego** -- formyluje 6 zestawow pytan badawczych, po jednym dla kazdego Researchera
3. **Fan-out dispatch** -- uruchamia 6 Researcherow ROWNOLEGLE (kluczowy moment paralelizacji)
4. **Koordynacja recenzji** -- przekazuje 6 raportow do Research Critica
5. **Zlecenie syntezy** -- po recenzji, przekazuje materialy Synthesizerowi
6. **Plan budowy** -- na bazie syntezy, zleca Plannerowi plan techniczny
7. **Build dispatch** -- uruchamia 4 builderow (czesc rownolegle, czesc sekwencyjnie)
8. **Triple QA orchestration** -- uruchamia Security i Quality rownolegle, wyniki do Managera QA
9. **Final GO/NO-GO** -- na bazie raportu Manager QA, podejmuje ostateczna decyzje

> **Uwaga!**
> Orkiestrator w tym presecie zuzywa 60-120K tokenow -- 3-4x wiecej niz w presetach Tier 1. To koszt koordynacji 17 agentow. Probuj NIE dodawac do niego dodatkowych zadan (np. pisania kodu) -- jego jedyna odpowiedzialnosc to ORKIESTRACJA.

#### Agent A-01: Analyst (Diagnosta)

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | A-01 |
| **Rola** | ANALIZA -- ocena zlozonosci, dekompozycja problemu |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 40% |
| **Narzedzia** | Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent, WebSearch |
| **Tokeny/sesja** | ~20-40K |
| **Koszt/sesja** | ~$0.02-$0.06 |

Analyst to "radiolog" zespolu. Nie leczy -- diagnozuje. Jego zadania:

1. **Ocena zlozonosci** -- S/M/L/XL/XXL. Deep Research + Build uruchamia sie przy XL/XXL
2. **Identyfikacja domen badawczych** -- ile niezaleznych obszarow wymaga researchu?
3. **Mapowanie zaleznosci** -- ktore komponenty budowy zaleza od ktorych wynikow badawczych?
4. **Risk assessment** -- co moze pojsc nie tak? Gdzie sa najwieksze niewiadome?
5. **Rekomendacja presetu** -- potwierdzenie, ze 18 agentow jest uzasadnionych (a nie overkill)

#### Agent A-02: Planner (Strateg Taktyczny)

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | A-02 |
| **Rola** | PLANOWANIE -- plan badawczy i plan budowy |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 50% |
| **Narzedzia** | Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent, WebSearch |
| **Tokeny/sesja** | ~25-50K |
| **Koszt/sesja** | ~$0.01-$0.03 |

Planner tworzy dwa kluczowe artefakty:

1. **Research Plan** -- 6 zestawow pytan badawczych, kryteria oceny, priorytety, oczekiwane formaty raportow
2. **Build Plan** -- kolejnosc budowy komponentow, zaleznosci, definicja "done", kryteria akceptacji
3. **Timeline** -- szacunkowy czas kazdej fazy, identyfikacja sciezki krytycznej
4. **Contingency plan** -- co robic gdy research daje sprzeczne wyniki? Gdy build napotka blokery?

#### Agent A-03: Synthesizer (Glowny Naukowiec)

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | A-03 |
| **Rola** | SYNTEZA -- laczenie 6 raportow badawczych w spojna calosc |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 55% |
| **Narzedzia** | Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent, WebSearch |
| **Tokeny/sesja** | ~40-80K |
| **Koszt/sesja** | ~$0.04-$0.12 |

Synthesizer to agent, ktory zamienia SZESC oddzielnych raportow badawczych w JEDEN koherentny dokument. To jedna z najtrudniejszych rol w calym systemie:

1. **Eliminacja sprzecznosci** -- gdy Reddit mowi "X jest najlepszy" a GitHub issues pokazuja krytyczne bugi
2. **Wyznaczanie confidence score** -- wazone usrednienie ocen z roznych zrodel
3. **Tworzenie rekomendacji** -- TOP 3 opcje z uzasadnieniem wielozrodlowym
4. **Identyfikacja luk** -- czego researcherzy NIE znalezli? Gdzie brakuje danych?
5. **Raport dla builderow** -- przetlumaczenie findings na actionable specs

> **Czy wiesz, ze...?**
> Synthesizer zuzywa wiecej tokenow niz jakikolwiek pojedynczy Researcher, bo musi przeczytac i przetworzyc WSZYSTKIE 6 raportow (kazdym po 15-30K tokenow). To dlatego uzywa Opus -- tanssze modele gubia kontekst przy tak duzym inputcie.

---

### WARSTWA BADAWCZA -- RESEARCH (7 agentow)

#### Agent R-01: Researcher Reddit

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-01 |
| **Rola** | RESEARCH -- analiza dyskusji na Reddit |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 50% |
| **Narzedzia** | WebSearch, WebFetch, Read |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~15-30K |
| **Koszt/sesja** | ~$0.01-$0.03 |

Reddit to "glos ludu" -- prawdziwe opinie deweloperow, nie marketingowe materialy. R-01 specjalizuje sie w:

1. **Wyszukiwanie subredditow** -- r/programming, r/webdev, r/devops, r/experienceddevs, r/node, r/python + niszowe
2. **Filtrowanie po jakosci** -- posty z >50 upvotes, komentarze z nagrodami, AMA z autorami
3. **Ekstrakcja sentymentu** -- stosunek pozytywnych do negatywnych opinii o kazdej opcji
4. **Identyfikacja red flags** -- "nie uzywajcie X, bo...", "migrowalismy z Y po 6 miesiacach..."
5. **Raport:** TOP 5 watkow, kluczowe cytaty, sentiment score, confidence

#### Agent R-02: Researcher X/Twitter

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-02 |
| **Rola** | RESEARCH -- analiza trendow i opinii ekspertow na X/Twitter |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 45% |
| **Narzedzia** | WebSearch, WebFetch, Read |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~12-25K |
| **Koszt/sesja** | ~$0.01-$0.02 |

X/Twitter to "pulse" branzy tech. R-02 specjalizuje sie w:

1. **Sledzenie thought leaderow** -- CTOs, framework authorrow, DevRel, influencerow tech
2. **Analiza announcementow** -- nowe releasy, deprecacje, zmiany licencji, przejecia
3. **Thread mining** -- dlugietweet-thready z glebokimi analizami technologicznymi
4. **Trend detection** -- co zyskuje popularnosc, co traci. Hype vs substancja
5. **Raport:** kluczowe tweety/posty, lista ekspertow, trend analysis, hype score

#### Agent R-03: Researcher UX

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-03 |
| **Rola** | RESEARCH -- analiza UX, wzorcow interfejsu, dostepnosci |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 50% |
| **Narzedzia** | WebSearch, WebFetch, Read |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~15-30K |
| **Koszt/sesja** | ~$0.01-$0.03 |

R-03 bada doswiadczenie uzytkownika -- nie kod, nie infrastrukture, a to, jak LUDZIE beda uzywac budowanego systemu:

1. **Competitive UX audit** -- jak wyglada checkout u Stripe? Jak wyglada dashboard u Vercel?
2. **Wzorce interakcji** -- najlepsze praktyki dla danego typu aplikacji (marketplace, SaaS, dashboard)
3. **Accessibility standards** -- WCAG 2.2, ARIA, keyboard navigation, screen reader compatibility
4. **User flow analysis** -- ile klikniec do celu? Gdzie userzy sie gubia?
5. **Raport:** benchmarki UX, rekomendowane wzorce, accessibility checklist, wireframe suggestions

#### Agent R-04: Researcher GitHub

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-04 |
| **Rola** | RESEARCH -- analiza repozytoriow, issues, benchmarkow |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55% |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~18-35K |
| **Koszt/sesja** | ~$0.02-$0.03 |

GitHub to "prawda o kodzie" -- nie marketing, nie opinie, a rzeczywisty stan projektow:

1. **Repository health** -- stars, forks, last commit, open issues, contributor count, bus factor
2. **Issue analysis** -- krytyczne bugi, regression history, response time maintainerow
3. **Benchmark mining** -- czy sa benchmarki? Jakie wyniki? Kto je robil? Reproducible?
4. **Code quality signals** -- test coverage, CI/CD, documentation quality, TypeScript adoption
5. **Dependency analysis** -- ile dependencji? Jakie transitive? Znane CVE?
6. **Raport:** health score kazdego repo, issue tracker analysis, benchmark comparison, risk matrix

#### Agent R-05: Researcher Forums

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-05 |
| **Rola** | RESEARCH -- analiza forow technicznych i spolecznosciowych |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 45% |
| **Narzedzia** | WebSearch, WebFetch, Read |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~12-25K |
| **Koszt/sesja** | ~$0.01-$0.02 |

Fora techniczne to "dlugoterminowa pamiec" spolecznosci -- w przeciwienstwie do ulotnych postow na X:

1. **Stack Overflow** -- najwyzej oceniane odpowiedzi, najczestsze problemy, deprecated solutions
2. **Hacker News** -- dyskusje o architekturze, skalowaniu, tradeoffach. Komentarze >100 slow
3. **Dev.to / Hashnode** -- artykuly praktyczne, tutoriale, case studies
4. **Discord/Slack communities** -- oficjalne kanaly frameworkow, FAQ, pinned messages
5. **Raport:** TOP problemy ze SO, HN insights, community health, migration stories

#### Agent R-06: Researcher Docs

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-06 |
| **Rola** | RESEARCH -- analiza oficjalnej dokumentacji |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55% |
| **Narzedzia** | WebSearch, WebFetch, Read |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~18-35K |
| **Koszt/sesja** | ~$0.02-$0.03 |

Oficjalna dokumentacja to "zrodlo prawdy" -- ale tez potencjalne zrodlo bledow (nieaktualna, niekompletna, myIaca):

1. **API documentation** -- endpointy, limity, rate limiting, autentykacja, webhooks
2. **Migration guides** -- oficjalne sciezki migracji, breaking changes, deprecation notices
3. **Architecture guides** -- rekomendowane wzorce, best practices, known limitations
4. **Pricing documentation** -- modele cenowe, limity free tier, enterprise pricing, SLA
5. **Changelog analysis** -- czestotliwosc releasow, breaking changes frequency, LTS policy
6. **Raport:** API capability matrix, pricing comparison, migration complexity score, docs quality score

#### Agent R-07: Research Critic (Recenzent)

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | R-07 |
| **Rola** | RECENZJA -- walidacja i scoring raportow badawczych |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 60% |
| **Narzedzia** | Read, Grep |
| **Zakaz** | Write, Edit, Bash, Agent, WebSearch |
| **Tokeny/sesja** | ~35-70K |
| **Koszt/sesja** | ~$0.04-$0.10 |

Research Critic to agent, ktorego NIE MA w zadnym innym presecie ponizej 18 agentow. To "peer reviewer" -- czyta WSZYSTKIE 6 raportow i je ocenia:

1. **Source credibility** -- czy zrodla sa wiarygodne? Reddit post z 3 upvotes ≠ oficjalna dokumentacja
2. **Internal consistency** -- czy raport sam sobie nie zaprzecza?
3. **Cross-report validation** -- czy wyniki z Reddit zgadzaja sie z GitHub issues? Czy Docs potwierdza Forums?
4. **Bias detection** -- czy Researcher nie mial bias na rzecz jednej opcji? Czy uwzglednil kontra-argumenty?
5. **Gap identification** -- czego brakuje? Jakie pytania zostaly bez odpowiedzi?
6. **Scoring** -- kazdy raport dostaje score 0.0-1.0 z uzasadnieniem. Score < 0.6 = do poprawki

> **Czy wiesz, ze...?**
> Research Critic uzywa Opus (nie Haiku) celowo. Ocena jakosci analizy wymaga GLEBSZEGO rozumowania niz samo prowadzenie analizy. Haiku moze wyszukac informacje, ale Opus potrafi ocenic czy te informacje sa WIARYGODNE i KOMPLETNE. To jedna z kluczowych roznic miedzy "tanim researchem" a "zwalidowanym researchem".

---

### WARSTWA BUDOWY -- BUILD (4 agenty)

#### Agent B-01: Backend Developer

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-01 |
| **Rola** | BUILD -- backend: API, bazy danych, infrastruktura |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 80% |
| **Narzedzia** | Read, Write, Edit, Bash, Grep, Glob |
| **Zakaz** | Agent, WebSearch |
| **Tokeny/sesja** | ~50-100K |
| **Koszt/sesja** | ~$0.02-$0.06 |

Backend Dev buduje "silnik" systemu:

1. **API endpoints** -- REST/GraphQL, autentykacja, autoryzacja, rate limiting
2. **Database schema** -- modelowanie danych, migracje, indeksy, relacje
3. **Infrastructure code** -- Docker, CI/CD, environment configuration
4. **Integrations** -- zewnetrzne API (Stripe, AWS, etc.), message queues, caching
5. **Error handling** -- graceful degradation, retry logic, circuit breakers

#### Agent B-02: Frontend Developer

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-02 |
| **Rola** | BUILD -- frontend: UI, komponenty, interakcje |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75% |
| **Narzedzia** | Read, Write, Edit, Bash, Grep, Glob |
| **Zakaz** | Agent, WebSearch |
| **Tokeny/sesja** | ~40-80K |
| **Koszt/sesja** | ~$0.02-$0.04 |

Frontend Dev buduje "twarz" systemu:

1. **Component architecture** -- design system, reusable components, state management
2. **Page layouts** -- routing, navigation, responsive design
3. **Forms & validation** -- input handling, error states, user feedback
4. **API integration** -- data fetching, caching, optimistic updates
5. **Accessibility** -- ARIA labels, keyboard navigation, screen reader support (na bazie raportu R-03 UX)

#### Agent B-03: Feature Developer

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-03 |
| **Rola** | BUILD -- logika biznesowa, feature-specific code |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 70% |
| **Narzedzia** | Read, Write, Edit, Bash, Grep, Glob |
| **Zakaz** | Agent, WebSearch |
| **Tokeny/sesja** | ~35-70K |
| **Koszt/sesja** | ~$0.01-$0.04 |

Feature Dev buduje "mozg" systemu -- logike biznesowa, ktora nie jest ani infrastruktura (Backend), ani interfejsem (Frontend):

1. **Business rules engine** -- walidacje, obliczenia, reguiy workflow
2. **Domain-specific logic** -- platnosci, subskrypcje, uprawnienia, raporty
3. **Algorithm implementation** -- sorting, filtering, search, recommendation engines
4. **Event processing** -- webhooks handling, real-time updates, notification logic
5. **Configuration systems** -- feature flags, A/B testing, multi-tenancy logic

#### Agent B-04: Integrator

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | B-04 |
| **Rola** | BUILD -- laczenie komponentow, rozwiazywanie konfliktow |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 65% |
| **Narzedzia** | Read, Write, Edit, Bash, Grep, Glob |
| **Zakaz** | Agent, WebSearch |
| **Tokeny/sesja** | ~30-60K |
| **Koszt/sesja** | ~$0.01-$0.03 |

Integrator to "dyrygenttechniczny" fazy budowy:

1. **Component merging** -- laczenie backendu, frontendu i feature logic w dzialajaca calosc
2. **Interface contracts** -- walidacja ze API endpointy pasuja do frontend calls
3. **Conflict resolution** -- gdy Backend i Frontend robia rzeczy niezgodne, Integrator naprawia
4. **Smoke testing** -- czy zintegrowany system uruchamia sie? Czy podstawowe flowy dzialaja?
5. **Build artifacts** -- finalna wersja kodu gotowa do QA

> **Czy wiesz, ze...?**
> Integrator jest jedynym agentem w warstwie Build, ktory czyta KOD WSZYSTKICH innych builderow. To dlatego jego token budget jest wysoki (30-60K) -- musi zrozumiec kontekst 3 roznych agentow i polaczyc ich prace w spojna calosc.

---

### WARSTWA JAKOSCI -- QUALITY ASSURANCE (3 agenty)

#### Agent Q-01: QA Security

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | Q-01 |
| **Rola** | QA -- audyt bezpieczenstwa |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 60% |
| **Narzedzia** | Read, Grep, Glob, Bash |
| **Zakaz** | Write, Edit, Agent, WebSearch |
| **Tokeny/sesja** | ~25-50K |
| **Koszt/sesja** | ~$0.01-$0.03 |

QA Security to "red team" -- szuka sposobow, zeby zlamac system:

1. **OWASP Top 10 scan** -- SQL injection, XSS, CSRF, broken authentication, etc.
2. **Dependency audit** -- znane CVE w dependencjach, outdated packages
3. **Authentication/Authorization review** -- czy token validation jest poprawna? Czy RBAC dziala?
4. **Data exposure check** -- czy API nie zwraca wrazliwych danych? Czy logi nie zawieraja PII?
5. **Infrastructure security** -- env variables, secrets management, CORS policy, HTTPS enforcement
6. **Raport:** lista findings z severity (Critical/High/Medium/Low), rekomendacje napraw

#### Agent Q-02: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | Q-02 |
| **Rola** | QA -- testy funkcjonalne, code quality, edge cases |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 60% |
| **Narzedzia** | Read, Grep, Glob, Bash |
| **Zakaz** | Write, Edit, Agent, WebSearch |
| **Tokeny/sesja** | ~25-50K |
| **Koszt/sesja** | ~$0.01-$0.03 |

QA Quality to "test engineer" -- sprawdza czy system DZIALA poprawnie:

1. **Functional testing** -- czy kazdy endpoint robi to, co powinien? Czy UI renderuje poprawnie?
2. **Edge case detection** -- co jesli user wpisze emoji w pole email? Co jesli timeout?
3. **Error handling verification** -- czy bledy sa ladnie obslugiwane? Czy user dostaje sensowny feedback?
4. **Code quality review** -- DRY, naming conventions, complexity metrics, test coverage
5. **Performance signals** -- N+1 queries, unnecessary re-renders, memory leaks
6. **Raport:** lista findings z priority, test coverage %, code quality score

#### Agent Q-03: Manager QA (Brama GO/NO-GO)

| Parametr | Wartosc |
|----------|---------|
| **Identyfikator** | Q-03 |
| **Rola** | QA -- agregacja raportow, decyzja GO/NO-GO |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 45% |
| **Narzedzia** | Read, Grep |
| **Zakaz** | Write, Edit, Bash, Agent, WebSearch |
| **Tokeny/sesja** | ~20-40K |
| **Koszt/sesja** | ~$0.01-$0.02 |

Manager QA to "brama koncowa" -- jedyny agent, ktory moze dac formalne GO lub NO-GO:

1. **Agregacja raportow** -- laczy findings z Security i Quality w jeden obraz
2. **Severity assessment** -- ile Critical? Ile High? Czy sa showstoppers?
3. **Risk evaluation** -- co sie stanie jesli puoscimy z tymi findingsami? Co jesli nie?
4. **GO/NO-GO decision** -- formalna decyzja z uzasadnieniem:
   - **GO** = zero Critical, max 2 High z planned fix, Quality score > 0.7
   - **CONDITIONAL GO** = 1-3 High findings z mitigation plan
   - **NO-GO** = Critical findings LUB > 3 High LUB Quality score < 0.5
5. **Stakeholder report** -- podsumowanie zrozumiale dla nie-technicznego odbiorcy

> **Uwaga!**
> Manager QA NIE NAPRAWIA bledow. Jego rola to DECYZJA, nie implementacja. Jesli da NO-GO, Orkiestrator kieruje findings do odpowiedniego buildera (Security issues → Backend, Quality issues → Frontend/Feature) i po naprawie uruchamia QA ponownie.

---

## 5. Workflow -- 20+ krokow przez wszystkie fazy

### Faza 0: INICJALIZACJA (kroki 1-3)

```
Krok 1: USER REQUEST → Orkiestrator
        "Zbuduj system platnosci dla marketplace, 50 krajow, PCI DSS..."
        
Krok 2: Orkiestrator → Analyst
        "Przeanalizuj zlozonosc. Ile domen? Jaki tier?"
        
Krok 3: Analyst → Orkiestrator
        "Zlozonosc: XXL. Domeny: 6 (platnosci, UX, regulacje, architektura, 
         multi-currency, security). Rekomendacja: Deep Research + Build (18)."
```

### Faza 1: PLANOWANIE (kroki 4-5)

```
Krok 4: Orkiestrator → Planner
        "Stworz Research Plan (6 zestawow pytan) i Build Plan (4 builderow)"
        
Krok 5: Planner → Orkiestrator
        Research Plan: 6 zestawow pytan, kryteria oceny, priorytety
        Build Plan: kolejnosc komponentow, zaleznosci, DoD
        Timeline: Research ~5min, Critic ~2min, Synthesis ~2min,
                  Build ~8min, QA ~3min. Total: ~20min
```

### Faza 2: FAN-OUT RESEARCH (kroki 6-11) -- ROWNOLEGLE

```
      ┌─────────────────────────────────────────────────────┐
      │         6 RESEARCHEROW ROWNOLEGLE                   │
      │                                                     │
Krok 6:  R-01 Reddit    → "opinie o Stripe vs Adyen vs PayPal"
Krok 7:  R-02 X/Twitter → "trendy payment infra, eksperci fintech"
Krok 8:  R-03 UX        → "najlepsze checkout flows, A11Y w platno."
Krok 9:  R-04 GitHub    → "repo health Stripe SDK, Adyen SDK, issues"
Krok 10: R-05 Forums    → "SO: PCI DSS compliance, HN: payment arch"
Krok 11: R-06 Docs      → "Stripe API limits, Adyen pricing, PayPal TOS"
      │                                                     │
      │  CZAS: ~3-5 minut (ROWNOLEGLE, nie sekwencyjnie!)   │
      └─────────────────────────────────────────────────────┘
```

### Faza 3: RECENZJA KRYTYCZNA (krok 12)

```
Krok 12: Orkiestrator → Research Critic
         "Oto 6 raportow. Oceniewaluuj kazdy. Score 0.0-1.0."
         
         Critic czyta wszystkie 6 raportow i:
         - Reddit: 0.82 (silne opinie, ale bias ku Stripe)
         - X/Twitter: 0.71 (dobre trendy, slabe zrodla)
         - UX: 0.88 (solidny audit, brak A11Y dla mobile)
         - GitHub: 0.91 (najlepszy raport, twarde dane)
         - Forums: 0.65 (za duzo Stack Overflow z 2021, nieaktualne)
         - Docs: 0.85 (kompletny, ale brak porownania SLA)
         
         Critic: "Forums wymaga uzupelnienia -- za stare zrodla.
                  X/Twitter: weryfikuj claim o Adyen growth 300%."
```

### Faza 4: SYNTEZA (krok 13)

```
Krok 13: Orkiestrator → Synthesizer
         "Polacz 6 zrecenzowanych raportow w synteze."
         
         Synthesizer produkuje:
         ┌─────────────────────────────────────────────────┐
         │            UNIFIED RESEARCH SYNTHESIS            │
         │                                                  │
         │  Rekomendacja #1: Stripe (score 8.7/10)          │
         │  - Reddit: 85% pozytywny sentyment               │
         │  - GitHub: 47K stars, 98.9% uptime, 2.1K issues  │
         │  - Docs: najlepsza dokumentacja z trojki          │
         │  - UX: najlepszy checkout flow (3 kliki)          │
         │  - Forums: zalecany dla PCI DSS SAQ-A             │
         │  - X: "industry standard" -- 12 CTOs potwierdza   │
         │                                                  │
         │  Rekomendacja #2: Adyen (score 7.4/10)           │
         │  Rekomendacja #3: PayPal (score 5.9/10)          │
         │                                                  │
         │  Luki: brak danych o latency w Azji-Pacyfik      │
         │  Confidence: 0.84                                │
         └─────────────────────────────────────────────────┘
```

### Faza 5: BUILD (kroki 14-18)

```
Krok 14: Orkiestrator → Backend Dev (B-01)
         "Zbuduj Stripe integration: webhooks, checkout session, 
          subscription management. Schema: payments, subscriptions."
          
Krok 15: Orkiestrator → Frontend Dev (B-02) [ROWNOLEGLE z 14]
         "Zbuduj checkout UI: multi-step form, card input (Stripe Elements),
          currency selector, order summary."
          
Krok 16: Orkiestrator → Feature Dev (B-03) [ROWNOLEGLE z 14, 15]
         "Zbuduj logike multi-currency: conversion rates, rounding rules,
          tax calculation per country, subscription proration."

Krok 17: B-01, B-02, B-03 → Integrator (B-04) [PO zakonczeniu 14-16]
         "Polacz backend API + frontend UI + feature logic.
          Sprawdz interfejsy. Uruchom smoke test."
          
Krok 18: Integrator → Orkiestrator
         "Build COMPLETE. 47 plikow, 3200 LOC. Smoke test: 12/12 PASS."
```

### Faza 6: TRIPLE QA (kroki 19-22)

```
Krok 19: Orkiestrator → QA Security (Q-01) [ROWNOLEGLE z 20]
         "Audytuj zintegrowany build pod katem bezpieczenstwa."
         
Krok 20: Orkiestrator → QA Quality (Q-02) [ROWNOLEGLE z 19]
         "Przetestuj jakosc: functional tests, edge cases, code quality."
         
Krok 21: Q-01 + Q-02 → Manager QA (Q-03) [PO zakonczeniu 19-20]
         Security Report: 0 Critical, 1 High (missing CSP header), 3 Medium
         Quality Report: 89% test coverage, 2 edge cases nieobsluzonych
         
Krok 22: Manager QA → Orkiestrator
         "CONDITIONAL GO. 1 High finding (CSP header) -- fix w 5 minut.
          2 edge cases niskiego ryzyka -- backlog. Quality score: 0.82."
```

### Faza 7: FIX + FINAL (kroki 23-25)

```
Krok 23: Orkiestrator → Backend Dev
         "Dodaj Content-Security-Policy header."
         
Krok 24: Orkiestrator → QA Security
         "Re-check CSP header."
         QA Security: "PASS. 0 Critical, 0 High."
         
Krok 25: Manager QA → Orkiestrator
         "GO. Wszystkie criteria spelnione."
         
         Orkiestrator → USER
         "Build COMPLETE. Stripe payment system: 47 plikow, 3200 LOC.
          Przeszedl Triple QA. Confidence: 0.84. Koszt: $1.23."
```

---

## 6. INPUT -- co trafia do presetu

Deep Research + Build oczekuje ZLOZONYCH zadan enterprise. Typowy input:

### Format optymalnego inputu

```
DOMAIN:        [platnosci / healthcare / edtech / fintech / marketplace]
SCALE:         [uzytkownicy, transakcje/dzien, regiony]
REQUIREMENTS:  [5-15 punktow z priorytetami P0/P1/P2]
CONSTRAINTS:   [regulacje, budzet, stack technologiczny, timeline]
RESEARCH FOCUS:[co SPECJALNIE trzeba zbadac -- np. "porownaj 3 dostawcow platnosci"]
BUILD SCOPE:   [co DOKLADNIE ma powstac -- np. "payment module z checkout UI"]
QA CRITERIA:   [co jest showstopper -- np. "PCI DSS compliance wymagany"]
```

### Przyklad rzeczywistego inputu

```
DOMAIN:        Marketplace platnosci miedzynarodowych
SCALE:         100K aktywnych sprzedawcow, 2M kupujacych, 50K transakcji/dzien
REQUIREMENTS:
  P0: Multi-currency checkout (USD, EUR, GBP, PLN + 8 walut)
  P0: PCI DSS SAQ-A compliance
  P0: Subscription management z proration
  P1: Seller payouts w 47 krajach
  P1: Fraud detection basic
  P2: Dispute management dashboard
  P2: Revenue analytics per seller

CONSTRAINTS:
  - Stack: Next.js 14, PostgreSQL, Stripe preferred (ale zbadajcie alternatywy)
  - Timeline: MVP w 2 tygodnie
  - Budget: nie wiecej niz $50/miesiac na payment infra w fazie beta
  - Regulacje: GDPR (EU), CCPA (California), PSD2 (strong auth)

RESEARCH FOCUS:
  - Stripe vs Adyen vs PayPal: koszt, API quality, multi-currency support, payout speed
  - Subscription billing: Stripe Billing vs Chargebee vs custom
  - Fraud detection: Stripe Radar vs Sift vs custom rules

BUILD SCOPE:
  - Checkout flow (3-step) z Stripe Elements
  - Backend payment service: sessions, webhooks, refunds
  - Subscription engine z proration logic
  - Admin dashboard: transactions, payouts, disputes

QA CRITERIA:
  - ZERO XSS/SQL injection (Critical = NO-GO)
  - PCI DSS SAQ-A compliance verified
  - All currency conversions accurate to 2 decimal places
```

---

## 7. OUTPUT -- co produkuje preset

Deep Research + Build produkuje DWA glowne artefakty (czego nie robi zaden mniejszy preset):

### Artefakt 1: Unified Research Report

```
📄 RESEARCH SYNTHESIS REPORT
├── Executive Summary (1 strona)
├── Methodology: 6 zrodel, 6 researcherow, Critic review
├── Findings per domain (6 sekcji)
│   ├── Payment Providers (Stripe vs Adyen vs PayPal)
│   ├── UX Patterns (checkout flow benchmarki)
│   ├── Community Sentiment (Reddit + X + Forums)
│   ├── Technical Health (GitHub repo analysis)
│   ├── Official Capabilities (Docs deep dive)
│   └── Regulatory Landscape (PCI, GDPR, PSD2)
├── Cross-Source Validation Matrix
├── Critic Scores per source (0.0-1.0)
├── Recommendations: TOP 3 z confidence scores
├── Identified Gaps & Risks
└── Appendix: raw data, source links, timestamps
```

### Artefakt 2: Production-Ready Codebase

```
📁 INTEGRATED BUILD OUTPUT
├── /src
│   ├── /api         (Backend Dev -- endpoints, middleware)
│   ├── /components  (Frontend Dev -- UI components)
│   ├── /lib         (Feature Dev -- business logic)
│   ├── /config      (Integrator -- environment, constants)
│   └── /types       (Integrator -- shared TypeScript types)
├── /tests           (QA Quality -- test files)
├── /docs
│   ├── API.md       (endpoint documentation)
│   └── SECURITY.md  (QA Security -- findings & mitigations)
├── docker-compose.yml (Backend Dev)
├── .env.example     (Integrator)
└── QA_REPORT.md     (Manager QA -- GO/NO-GO decision)
```

### Artefakt 3: QA Report

```
📋 TRIPLE QA REPORT
├── Security Audit
│   ├── OWASP Top 10 checklist (10/10 PASS)
│   ├── Dependency audit (0 Critical CVE)
│   ├── PCI DSS SAQ-A compliance: VERIFIED
│   └── Findings: 0 Critical, 0 High, 3 Medium
├── Quality Assessment
│   ├── Test coverage: 89%
│   ├── Code quality score: 0.82
│   ├── Edge cases tested: 24/26
│   └── Performance: avg response 45ms, p99 120ms
├── Manager QA Decision
│   ├── Status: GO
│   ├── Conditions: 3 Medium findings → backlog
│   └── Overall confidence: 0.84
└── Stakeholder Summary (non-technical)
```

---

## 8. Research Phase Deep-Dive -- 6 researcherow rownolegle

### Dlaczego 6 a nie 1? Problem "jednego zrodla"

Wyobraz sobie, ze kupujesz samochod i pytasz TYLKO dealera. "Swietne auto, najlepsze na rynku!" -- co innego mialby powiedziec? Teraz dodaj: opinie na Reddit (prawdziwi wlasciciele), recenzje ekspertow (X/Twitter), testy bezpieczenstwa (GitHub -- dane crash testow), dokumentacje techniczna (oficjalne specs), fora wlascicieli (problemy po 50K km), porownanie UX (jak sie prowadzi vs konkurencja).

SZESC perspektyw na TEN SAM problem. Kazda widzi cos innego:

| Researcher | Widzi | Nie widzi |
|------------|-------|-----------|
| Reddit (R-01) | Prawdziwe opinie, frustracje, hidden gems | Dane techniczne, oficjalne limity |
| X/Twitter (R-02) | Trendy, announcements, expert opinions | Dlugoterminowe problemy, edge cases |
| UX (R-03) | User experience, accessibility, flows | Backend performance, security |
| GitHub (R-04) | Code quality, issues, benchmarks | User sentiment, business viability |
| Forums (R-05) | Deep dives, migration stories, gotchas | Nowe trendy, oficjalne zmiany |
| Docs (R-06) | Official capabilities, limits, pricing | Real-world problems, community opinion |

### Fan-out execution model

```
t=0s    Orkiestrator wysyla 6 requestow ROWNOLEGLE
t=0-5s  Kazdy Researcher rozpoczyna WebSearch
t=5-60s Researcherzy czytaja, analizuja, pisza raporty (NIEZALEZNIE)
t=60-90s Raporty gotowe -- 6 dokumentow po 15-30K tokenow
t=90s   Orkiestrator zbiera raporty, przekazuje do Critica

CALKOWITY CZAS RESEARCHU: ~60-90 sekund (NIE 6 x 60 = 360 sekund!)
OSZCZEDNOSC DZIEKI PARALELIZACJI: ~75%
```

### Jak Critic ocenia raporty

Research Critic stosuje 5-punktowa skale oceny dla kazdego raportu:

| Kryterium | Waga | Opis |
|-----------|------|------|
| Source Quality | 25% | Czy zrodla sa aktualne (< 12 mies.)? Wiarygodne? Pierwszy-reka? |
| Completeness | 20% | Czy pytania badawcze sa odpowiedziane? Brak lukow? |
| Objectivity | 20% | Czy uwzgledniono kontra-argumenty? Brak bias? |
| Actionability | 20% | Czy findings sa konkretne, mierzalne, implementowalne? |
| Consistency | 15% | Czy wyniki nie zaprzeczaja innym raportom? Cross-validation? |

Przyklad scoringu:

```
R-01 Reddit:   Sources 0.7 | Complete 0.9 | Objective 0.7 | Action 0.9 | Consist 0.9 = 0.82
R-04 GitHub:   Sources 1.0 | Complete 0.9 | Objective 0.9 | Action 0.8 | Consist 0.9 = 0.91
R-05 Forums:   Sources 0.4 | Complete 0.7 | Objective 0.8 | Action 0.6 | Consist 0.7 = 0.65
```

Raport z score < 0.6 → Critic zglasza do Orkiestratora → Orkiestrator moze zlecic ponowny research lub zaakceptowac z ostrzezeniem.

### Jak Synthesizer laczy 6 raportow

Synthesizer nie kopiuje -- INTEGRUJE. Proces:

1. **Extract claims** -- z kazdego raportu wyciaga twierdzenia: "Stripe ma 99.99% uptime" (Docs), "Stripe webhooks timeout po 30s" (GitHub issues)
2. **Cross-validate** -- czy claim z Reddit jest potwierdzony przez Docs? Czy GitHub issue jest nadal otwarty?
3. **Resolve conflicts** -- Reddit mowi "Adyen jest lepszy", Docs pokazuja ze Stripe ma wiecej features. Synthesizer wazy dowody
4. **Produce unified view** -- jeden raport z jednym zestawem rekomendacji, nie szesc sprzecznych opinii
5. **Highlight uncertainty** -- "Brak danych o Stripe latency w Azji-Pacyfik. Confidence dla tego regionu: 0.5"

---

## 9. Build Phase Deep-Dive -- 4 builderow z Integratorem

### Podzia pracy w Build Squad

```
RESEARCH SYNTHESIS
       │
       ▼
  ┌────────────────┐
  │   ORKIESTRATOR  │ ← tworzy Build Instructions na bazie Syntezy + Planu
  └──┬─────┬─────┬─┘
     │     │     │
     ▼     ▼     ▼        (ROWNOLEGLE -- 3 builderow naraz)
  ┌──────┐ ┌──────┐ ┌──────┐
  │B-01  │ │B-02  │ │B-03  │
  │Back  │ │Front │ │Feat  │
  │API,  │ │UI,   │ │Logic,│
  │DB,   │ │comp, │ │rules,│
  │infra │ │forms │ │calc  │
  └──┬───┘ └──┬───┘ └──┬───┘
     │        │        │
     └────────┼────────┘
              ▼                (SEKWENCYJNIE -- po 3 builderach)
        ┌──────────┐
        │  B-04    │
        │Integrator│
        │ merge,   │
        │ test,    │
        │ validate │
        └──────────┘
              │
              ▼
         BUILD COMPLETE
```

### Narrow Context Principle w Build

Kazdy builder dostaje TYLKO informacje potrzebne do SWOJEGO zadania:

| Builder | Dostaje | NIE dostaje |
|---------|---------|-------------|
| Backend Dev | API specs, DB schema, Stripe docs | UI wireframes, UX research, frontend code |
| Frontend Dev | Component specs, UX findings, API contract | DB schema, Stripe webhooks, infra config |
| Feature Dev | Business rules, domain logic specs | UI components, DB queries, Docker config |

Dlaczego? Bo kazdy dodatkowy token kontekstu:
- Kosztuje pieniadze (Sonnet: $3/$15 za 1M)
- Zwieksza ryzyko halucynacji (wiecej szumu = wiecej bledow)
- Spowalnia generowanie (wiekszy prompt = dluzszy czas)

### Integrator -- dlaczego jest konieczny

Bez Integratora, 3 builderow produkuja 3 ODDZIELNE fragmenty kodu, ktore MOGA byc niekompatybilne:

```
BEZ INTEGRATORA:
  Backend Dev: POST /api/checkout → returns { session_id: string }
  Frontend Dev: await fetch('/api/checkout') → expects { id: number, url: string }
  Feature Dev: calculateTotal() → returns number (cents? dollars? string?)
  
  PROBLEM: 3 rozne interfejsy. Kod nie skompilowalby sie.

Z INTEGRATOREM:
  Integrator czyta wszystkie 3 outputy:
  1. Ujednolica typy: session_id → id (number), dodaje url
  2. Ujednolica formaty: total zawsze w CENTS jako integer
  3. Tworzy shared types: /types/payment.ts
  4. Uruchamia smoke test: 12/12 PASS
  
  WYNIK: Spojna calosc gotowa do QA.
```

---

## 10. QA Phase -- Triple QA z Manager GO/NO-GO

### Dlaczego TROJKA a nie jeden QA?

| Aspekt | QA Security | QA Quality | Manager QA |
|--------|-------------|------------|------------|
| **Perspektywa** | "Jak to zlamac?" | "Czy to dziala?" | "Czy mozna wydac?" |
| **Narzedzia** | OWASP checklist, CVE scan | Test runner, linter, coverage | Risk matrix, decision framework |
| **Output** | Lista vulnerabilities | Lista defects + metrics | GO/NO-GO decision |
| **Blad typu I** | False positive security alert | False positive test failure | Zbyt ostrozne NO-GO |
| **Blad typu II** | Przeoczony exploit | Przeoczony bug | Zbyt wczesne GO |

Trzy perspektywy = trzy warstwy ochrony. Kazda lowi inne bledy:

```
Przyklad: API endpoint /api/admin/users

QA Security widzi: "Brak rate limiting. Brak IP whitelist. Potential brute force."
QA Quality widzi: "Pagination broken na > 1000 records. Missing error handling for invalid page."
Manager QA widzi: "Security: 1 High (rate limit). Quality: 1 Medium (pagination).
                    CONDITIONAL GO: rate limit to P0 fix, pagination to backlog."
```

### Flowchart decyzji Manager QA

```
                    ┌─────────────────┐
                    │ Security Report  │
                    │ Quality Report   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Any CRITICAL?   │
                    └────────┬────────┘
                        YES  │  NO
                    ┌────────▼──┐  ┌──▼────────┐
                    │  NO-GO    │  │ High > 3?  │
                    │ (instant) │  └──┬─────────┘
                    └───────────┘  YES│  NO
                              ┌──────▼───┐  ┌──▼────────────┐
                              │  NO-GO   │  │Quality > 0.7? │
                              └──────────┘  └──┬────────────┘
                                           NO  │  YES
                                   ┌───────▼──┐  ┌──▼────────────┐
                                   │  NO-GO   │  │ High = 1-3?   │
                                   └──────────┘  └──┬────────────┘
                                                YES │  NO (0 High)
                                        ┌──────▼────────┐  ┌──▼──┐
                                        │CONDITIONAL GO │  │ GO  │
                                        │(z mitigation) │  │     │
                                        └───────────────┘  └─────┘
```

### Re-test po naprawach

Gdy Manager QA da NO-GO lub CONDITIONAL GO z wymaganymi fixami:

1. Orkiestrator przekazuje findings do odpowiedniego buildera
2. Builder naprawia (fix jest wazny -- zwykle 1-5 minut)
3. Orkiestrator uruchamia TYLKO tego QA agenta, ktory znalazl problem (nie caly Triple QA)
4. Jesli PASS → Manager QA updatuje decyzje na GO
5. Jesli nadal FAIL → eskalacja do Orkiestratora (moze wymagac design change)

---

## 11. 76.9% paralelizacji -- co biegnie rownolegle, co sekwencyjnie

### Mapa paralelizacji

```
CZAS →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→

FAZA 0: INIT        ███ Orkiestrator + Analyst (sekwencyjne)
FAZA 1: PLAN          ██ Planner (sekwencyjne)

FAZA 2: RESEARCH       ██████████████████████████████
                        ██████████████████████████████  ← 6 ROWNOLEGLE
                        ██████████████████████████████
                        ██████████████████████████████
                        ██████████████████████████████
                        ██████████████████████████████

FAZA 3: CRITIC                                         ████████ (sekwencyjne)
FAZA 4: SYNTHESIS                                               ██████ (sekwencyjne)

FAZA 5: BUILD                                                          █████████████████
                                                                       █████████████████ ← 3 ROWNO.
                                                                       █████████████████
                                                                                        █████████ B-04

FAZA 6: QA                                                                                      ████████
                                                                                                ████████ ← 2 ROWNO.
                                                                                                        ████ Q-03
```

### Obliczenie 76.9% paralelizacji

| Faza | Agentow | Rownoleglych | Sekwencyjnych | Czas rownol. | Czas sekw. |
|------|---------|-------------|---------------|--------------|------------|
| Init | 2 | 0 | 2 | 0s | 30s |
| Plan | 1 | 0 | 1 | 0s | 20s |
| Research | 6 | 6 | 0 | 90s | 0s |
| Critic | 1 | 0 | 1 | 0s | 60s |
| Synthesis | 1 | 0 | 1 | 0s | 45s |
| Build | 4 | 3 + 1 sekw. | 1 | 120s | 60s |
| QA | 3 | 2 + 1 sekw. | 1 | 40s | 20s |
| **TOTAL** | **18** | **~14** | **~7** | **250s** | **235s** |

Efektywny czas: ~485s (zamiast ~1350s gdyby WSZYSTKO bylo sekwencyjne)

**Paralelizacja: (1350 - 485) / 1350 × 100 = ~64% oszczednosci czasu**

**Potencjal paralelizacji agentow: 14 z 18 = 76.9% agentow moze pracowac rownolegle**

### Sciezka krytyczna (Critical Path)

Sciezka krytyczna to najdluzsza sekwencja SEKWENCYJNYCH krokow:

```
Orkiestrator → Analyst → Planner → [Research PARALLEL] → Critic → Synthesizer
→ [Build PARALLEL] → Integrator → [QA PARALLEL] → Manager QA → Orkiestrator

Liczba sekwencyjnych krokow: 10
Liczba rownoleglych "blobkow": 3 (Research, Build, QA)
```

Kazdeopoznienie na sciezce krytycznej opoznia CALY preset. Dlatego:
- Critic MUSI byc szybki (Opus, ale skoncentrowany)
- Synthesizer MUSI byc efektywny (nie powtarza, tylko integruje)
- Integrator MUSI zaczac natychmiast po builderach (nie czeka na "nice-to-have")

---

## 12. Analiza kosztow -- pelny rozklad

### Koszt per agent, per sesja

| Agent | Model | Tokeny IN | Tokeny OUT | Koszt IN | Koszt OUT | TOTAL |
|-------|-------|----------|------------|----------|-----------|-------|
| A-00 Orkiestrator | Opus | 60K | 20K | $0.90 | $1.50 | ~$0.12* |
| A-01 Analyst | Opus | 20K | 10K | $0.30 | $0.75 | ~$0.04 |
| A-02 Planner | Sonnet | 25K | 15K | $0.08 | $0.23 | ~$0.02 |
| A-03 Synthesizer | Opus | 50K | 20K | $0.75 | $1.50 | ~$0.10 |
| R-01 Reddit | Haiku | 15K | 10K | $0.01 | $0.04 | ~$0.02 |
| R-02 X/Twitter | Haiku | 12K | 8K | $0.01 | $0.03 | ~$0.01 |
| R-03 UX | Haiku | 15K | 10K | $0.01 | $0.04 | ~$0.02 |
| R-04 GitHub | Haiku | 18K | 12K | $0.01 | $0.05 | ~$0.02 |
| R-05 Forums | Haiku | 12K | 8K | $0.01 | $0.03 | ~$0.01 |
| R-06 Docs | Haiku | 18K | 12K | $0.01 | $0.05 | ~$0.02 |
| R-07 Critic | Opus | 45K | 15K | $0.68 | $1.13 | ~$0.08 |
| B-01 Backend | Sonnet | 50K | 40K | $0.15 | $0.60 | ~$0.05 |
| B-02 Frontend | Sonnet | 40K | 30K | $0.12 | $0.45 | ~$0.04 |
| B-03 Feature | Sonnet | 35K | 25K | $0.11 | $0.38 | ~$0.03 |
| B-04 Integrator | Sonnet | 30K | 20K | $0.09 | $0.30 | ~$0.03 |
| Q-01 Security | Sonnet | 25K | 15K | $0.08 | $0.23 | ~$0.02 |
| Q-02 Quality | Sonnet | 25K | 15K | $0.08 | $0.23 | ~$0.02 |
| Q-03 Manager | Sonnet | 20K | 10K | $0.06 | $0.15 | ~$0.02 |

*Koszty zaokraglone. Opus dominuje koszt -- 4 agenty Opus = ~70% calkowitego kosztu.

### Koszt per faza

| Faza | Agentow | Tokeny | Koszt | % calkowity |
|------|---------|--------|-------|-------------|
| Strategia (Init + Plan) | 3 | ~75-130K | $0.18 | ~14% |
| Research (6 researcherow) | 6 | ~90-180K | $0.10 | ~8% |
| Recenzja (Critic) | 1 | ~60-100K | $0.08 | ~6% |
| Synteza | 1 | ~70-120K | $0.10 | ~8% |
| Build (4 builderow) | 4 | ~155-310K | $0.15 | ~12% |
| QA (Triple) | 3 | ~70-140K | $0.06 | ~5% |
| Komunikacja (overhead) | - | ~80-220K | ~$0.03-0.08 | ~5% |
| **TOTAL** | **18** | **~600-1200K** | **$0.70-$2.00** | **100%** |

### Dlaczego rozrzut $0.70-$2.00?

Dolna granica ($0.70): Proste zadanie enterprise. Research szybki, build kompaktowy, QA bez iteracji.
Gorna granica ($2.00): Zlozony build z iteracjami QA. Critic zleca re-research. Builder poprawia 2-3 razy. Full 1200K tokenow.

### Smart Model Routing -- oszczednosc 80%

Co gdyby WSZYSTKO bylo na Opus?

| Scenariusz | Tokeny | Koszt |
|------------|--------|-------|
| All Opus (bez routingu) | 800K | ~$8-12 |
| Smart Routing (Opus/Sonnet/Haiku) | 800K | ~$0.70-2.00 |
| **Oszczednosc** | | **~80-85%** |

Haiku dla researchu: $0.80/$4 zamiast $15/$75. To 19x taniej na input, 19x taniej na output. Dla 6 researcherow, ktore glownie wyszukuja i organizuja informacje (a nie rozumuja gleboko) -- Haiku jest idealny.

---

## 13. Token economics -- 600-1200K rozlozenie

### Jak 18 agentow generuje 600-1200K tokenow

```
TOKEN BUDGET BREAKDOWN (scenariusz typowy: ~800K)

STRATEGIA:     ████████████ 120K (15%)
  Orkiestrator:  80K (instrukcje, ewaluacje, koordynacja)
  Analyst:       25K (analiza zlozonosci)
  Planner:       15K (plan badawczy i budowlany)

RESEARCH:      ██████████████████████ 220K (27.5%)
  6x Researcher: 6 × 25K = 150K (wyszukiwanie, analiza, raporty)
  Critic:        70K (czytanie 6 raportow + ocena kazdego)

SYNTHESIS:     ████████ 80K (10%)
  Synthesizer:   80K (czytanie zrecenzowanych raportow + tworzenie syntezy)

BUILD:         ██████████████████████████ 260K (32.5%)
  Backend:       80K (API, DB, infra)
  Frontend:      60K (UI, componenty)
  Feature:       50K (logika biznesowa)
  Integrator:    70K (merge + smoke test)

QA:            ████████████ 120K (15%)
  Security:      40K (audyt bezpieczenstwa)
  Quality:       40K (testy, code review)
  Manager:       25K (agregacja, decyzja)
  QA overhead:   15K (re-test po fixach)
```

### Porownanie token consumption z innymi presetami

| Preset | Agentow | Tokeny | Wzrost vs Solo |
|--------|---------|--------|----------------|
| Solo | 2 | ~40-80K | baseline |
| Quick Fix | 2 | ~50-90K | +25% |
| Recon | 3 | ~80-120K | +100% |
| Startup | 5 | ~150-300K | +275% |
| Feature Sprint | 7 | ~250-450K | +525% |
| SaaS Builder | 10 | ~350-700K | +775% |
| Full Hierarchy | 13 | ~450-900K | +1025% |
| **Deep Research + Build** | **18** | **~600-1200K** | **+1400%** |

1400% wiecej tokenow niz Solo. Ale tez 1400% wiecej pokrycia, jakosci i pewnosci.

> **Czy wiesz, ze...?**
> 600-1200K tokenow to okolo 450-900 stron A4 tekstu. To jak napisac caloksztaltny raport naukowy + zbudowac dzialajacy prototyp + przeprowadzic audyt -- w 10-25 minut. Czlowiek potrzebowalby na to tygodnie.

---

## 14. Use cases -- kiedy uzywac Deep Research + Build

### Use Case 1: Enterprise Platform Due Diligence

**Scenariusz:** CTO potrzebuje raportu technologicznego due diligence przed decyzja o wyborze stacku dla nowej platformy. Board wymaga udokumentowanych rekomendacji z wieloma zrodlami.

**Dlaczego 18 agentow:**
- 6 researcherow pokrywa WSZYSTKIE perspektywy (community, code, docs, UX, trends, forums)
- Research Critic eliminuje bias i weryfikuje twierdzenia
- Synthesizer tworzy raport jakosci "boardroom-ready"
- Build Squad tworzy POC potwierdzajacy wykonalnosc
- Triple QA waliduje ze POC spenia kryteria enterprise

**Wynik:** 20-stronicowy raport + dzialajacy POC + raport QA. Koszt: ~$1.50. Czas: ~20 min. Alternatywa: 2-3 tygodnie pracy zespolu 4-6 osob.

### Use Case 2: Regulated Industry Compliance Build

**Scenariusz:** Startup healthtech buduje patient portal. HIPAA compliance wymagany. FDA guidelines for digital health. Multi-state licensing.

**Dlaczego 18 agentow:**
- R-01 Reddit: opinie deweloperow healthtech o compliance frameworkach
- R-05 Forums: SO odpowiedzi o HIPAA technical requirements
- R-06 Docs: oficjalne HIPAA guidelines, FDA 21 CFR Part 11
- R-07 Critic: KRYTYCZNY -- w regulowanej branzy zle zrodlo = zly compliance
- Q-01 Security: audyt HIPAA-specific (encryption at rest/transit, access logs, BAA)
- Q-03 Manager: formalne GO/NO-GO z compliance checklist

### Use Case 3: Platform Migration (Monolith → Microservices)

**Scenariusz:** Legacy monolith PHP (500K LOC) migruje do Node.js microservices. 47 endpointow, 23 tabele DB, 8 integracji zewnetrznych.

**Dlaczego 18 agentow:**
- Research musi pokryc: Node.js framework selection, DB migration strategy, API gateway choice, message queue selection, container orchestration
- Build musi pokryc: API service, frontend rebuild, business logic extraction, integration layer
- QA musi pokryc: security (new attack surface), quality (functional parity), manager (GO/NO-GO per service)

### Use Case 4: Multi-Vendor Evaluation + Prototyping

**Scenariusz:** Enterprise ocenia 5 dostawcow AI/ML platform (AWS SageMaker, GCP Vertex, Azure ML, Databricks, custom). Potrzeba POC z kazdym TOP 2.

**Dlaczego 18 agentow:** Kazdy vendor wymaga analizy z wielu zrodel. 6 researcherow pokrywa community (Reddit, X), technical (GitHub, Docs), user experience (UX) i real-world stories (Forums). Po syntezie, Build Squad tworzy 2 POC-e z TOP vendorami.

### Use Case 5: Enterprise RFP Technical Response

**Scenariusz:** Firma softwareowa odpowiada na RFP (Request for Proposal) duzego klienta enterprise. RFP wymaga: analizy technicznej, prototypu integracji, raportu bezpieczenstwa.

**Dlaczego 18 agentow:** RFP to dokladnie "deep research + build" -- musisz ZBADAC wymagania klienta, ZBUDOWAC prototyp, i dostarczyc RAPORT jakosci. Trojka artefaktow = trojka warstw presetu.

---

## 15. Anti-patterny -- czego NIE robic z 18 agentami

### Anti-pattern #1: 18 agentow dla bug fixa

```
ZLE:
  User: "Napraw blad 404 na stronie /settings"
  → Deep Research + Build (18 agentow)
  → 6 researcherow bada przyczyny 404...
  → 4 builderow naprawia...
  → Triple QA audytuje...
  → Koszt: $1.20, Czas: 15 minut
  
DOBRZE:
  User: "Napraw blad 404 na stronie /settings"
  → Quick Fix (2 agentow)
  → Backend Dev naprawia route
  → Orkiestrator waliduje
  → Koszt: $0.08, Czas: 45 sekund
  
ROZNICA: 15x drozszy, 20x wolniejszy. ZERO dodatkowej wartosci.
```

**Regula:** Jesli znasz przyczyne problemu -- nie researchuj. Jesli fix to < 50 linii kodu -- nie potrzebujesz 4 builderow.

### Anti-pattern #2: Research Without Building

```
ZLE:
  Uzywasz Deep Research + Build ale...
  → 6 researcherow produkuje raporty
  → Critic recenzuje
  → Synthesizer laczy
  → Build Squad... nic nie buduje (user chcial "tylko raport")
  → 4 builderow + 3 QA = 7 agentow sie nudzi
  → Placisz za 18, uzywasz 11
  
DOBRZE:
  Jesli chcesz TYLKO research:
  → Research Swarm (9 agentow) -- dedykowany do badania bez budowy
  → Koszt: $0.40 zamiast $1.20
```

**Regula:** Deep Research + Build = RESEARCH + BUILD. Jesli nie budujesz, uzyj Research Swarm.

### Anti-pattern #3: Critic Bottleneck

```
ZLE:
  6 researcherow konczy jednoczesnie
  → Critic musi przeczytac 180K tokenow raportow
  → Critic potrzebuje 3-5 minut (najdluzszy single-agent step)
  → Caly pipeline CZEKA na jednego agenta
  
LEPIEJ:
  Orkiestrator wysyla raporty do Critica W MIARE jak przychodza
  (nie czeka na wszystkie 6). Critic zaczyna od najwazniejszych.
  
NAJLEPIEJ:
  Dwa Critics (w custom configuration) -- ale to juz 19 agentow.
  W standardowym presecie: akceptuj bottleneck jako swiadomy tradeoff.
```

**Regula:** Critic to swiadomy bottleneck. Nie probuj go obejsc pomijajac recenzje -- stracisz kluczowa warstwe walidacji.

### Anti-pattern #4: Idle Researchers During Build

```
ZLE:
  Faza Build trwa 8-10 minut
  → 6 Researcherow + Critic + Synthesizer = 8 agentow BEZ PRACY
  → Placisz za ich "istnienie" w kontekscie? NIE -- ale tracisz czas na init
  
DOBRZE:
  Researcherzy NIE sa utrzymywani podczas buildu.
  Orkiestrator zwalnia ich kontekst po fazie syntezy.
  Token savings: ~200K mniej w kontekscie.
```

**Regula:** Agenci nie sa "zatrudnieni na etat". Sa tworzeni na czas fazy i zwalniani po jej zakonczeniu. Deep Research + Build ma 18 agentow, ale NIGDY nie ma 18 agentow JEDNOCZESNIE aktywnych.

### Anti-pattern #5: Skipping Synthesis

```
ZLE:
  6 raportow badawczych → prosto do builderow
  → Builder dostaje 6 sprzecznych raportow
  → Builder sam musi zdecydowac co jest wazne
  → Builder nie jest od analizy -- jest od BUDOWANIA
  → Wynik: build oparty na losowo wybranym raporcie
  
DOBRZE:
  6 raportow → Critic → Synthesizer → JEDEN spointy dokument → Builder
  → Builder dostaje jasna rekomendacje
  → Builder buduje wedlug JEDNEGO planu
  → Wynik: build oparty na zwalidowanej syntezie
```

**Regula:** NIGDY nie pomijaj Synthesizera. Jest mostem miedzy chaosem 6 raportow a porządkiem 1 planu budowy.

### Anti-pattern #6: Treating QA as Optional

```
ZLE:
  "Pominiemy QA zeby zaoszczedzic $0.06 i 3 minuty"
  → Build trafia do usera BEZ audytu
  → XSS vulnerability w formularzu platnosci
  → Koszt naprawy po deploymencie: $500-5000
  
DOBRZE:
  Triple QA kosztuje $0.06 i 3 minuty
  → Security lapie XSS
  → Builder naprawia (2 minuty)
  → Re-test: PASS
  → Koszt: $0.08 dodatkowe
  
  ROI: $0.08 vs $500-5000 = 6250x-62500x zwrot z inwestycji
```

**Regula:** QA to NIE jest koszt. QA to UBEZPIECZENIE. Najdrozsza czesc systemu to ta, ktora NIE zostala przetestowana.

---

## 16. Porownanie: Deep 18 vs Full 13 vs SaaS 10

### Macierz porownawcza

| Aspekt | SaaS Builder (10) | Full Hierarchy (13) | Deep R+B (18) |
|--------|-------------------|---------------------|---------------|
| **Tier** | 3 (Advanced) | 3 (Advanced) | 4 (Enterprise) |
| **Researcherow** | 2 | 4 | 6 + Critic |
| **Builderow** | 3 | 4 | 4 |
| **QA** | 2 | 2 | 3 (z Manager) |
| **Synthesizer** | Tak | Tak | Tak |
| **Research Critic** | NIE | NIE | TAK |
| **Manager QA** | NIE | NIE | TAK |
| **Feature Dev** | NIE | Tak | TAK |
| **Docs Researcher** | NIE | NIE | TAK |
| **Paralelizacja** | ~60% | ~68% | ~76.9% |
| **Tokeny** | 350-700K | 450-900K | 600-1200K |
| **Koszt** | $0.35-$0.80 | $0.50-$1.20 | $0.70-$2.00 |
| **Latencja** | 5-12 min | 8-18 min | 10-25 min |

### Kiedy kazdy wygrywa

**SaaS Builder (10) wygrywa gdy:**
- Budujesz SaaS od zera z typowym stackiem (Next.js + Stripe + DB)
- Research potrzebny, ale 2 zrodla wystarczajace
- QA wazne, ale nie potrzebujesz formalnego GO/NO-GO
- Budget: do $0.80 per run

**Full Hierarchy (13) wygrywa gdy:**
- Budujesz zlozony system z wieloma domenami
- Research z 4 zrodel wystarczajacy (nie potrzebujesz Docs + Critic)
- QA Security + Quality wystarczajace (bez formalnego Manager)
- Budget: do $1.20 per run

**Deep Research + Build (18) wygrywa gdy:**
- Research MUSI byc z 6+ zrodel (due diligence, compliance)
- Kazdy raport badawczy MUSI byc zrecenzowany (regulated industry, high-stakes decision)
- Build MUSI przejsc formalne GO/NO-GO z raportem dla stakeholderow
- Budget: do $2.00 per run (ale koszt bledu >> $2.00)

### Decision tree

```
Czy potrzebujesz GLEBOKIEGO researchu z 6+ zrodel?
  NIE → Czy potrzebujesz 4+ builderow?
         NIE → SaaS Builder (10) lub mniejszy
         TAK → Full Hierarchy (13)
  TAK → Czy research musi byc RECENZOWANY (compliance, due diligence)?
         NIE → Full Hierarchy (13) + dodaj Researchera
         TAK → Czy potrzebujesz FORMALNEGO GO/NO-GO z raportem?
                NIE → Full Hierarchy (13)
                TAK → DEEP RESEARCH + BUILD (18)
```

---

## 17. Wyzwania orkiestracji w skali -- communication overhead i context management

### Problem 1: Communication Overhead

Kazda wiadomosc miedzy agentami kosztuje tokeny. Przy 34 aktywnych kanalach:

```
OVERHEAD FORMULA:
  Overhead = (liczba_wiadomosci × srednia_dlugosc_wiadomosci) / calkowite_tokeny
  
  Deep R+B: ~40 wiadomosci × ~2K tokenow = ~80K tokenow overhead
  80K / 800K = ~10% na czysta komunikacje
  
  Z kontekstem (kazdy agent musi "zrozumiec" swoja role):
  18 agentow × ~5K system prompt = ~90K tokenow
  
  TOTAL OVERHEAD: ~170K / 800K = ~21%
```

21% budzetu tokenowego idzie na "rozmowy" i "samowiadomosc" agentow. To cena orkiestracji.

### Problem 2: Context Window Management

Kazdy agent AI ma ograniczone okno kontekstowe (200K tokenow dla Opus, 200K dla Sonnet, 200K dla Haiku). W presecie 18-agentowym:

- Orkiestrator: musi pomiescic WSZYSTKIE raporty, plany, statusy → blisko limitu
- Research Critic: czyta 6 raportow po 15-30K = 90-180K → blisko limitu Opus
- Synthesizer: czyta zrecenzowane raporty + tworzy synteze → blisko limitu

**Strategia:** Orkiestrator uzywa SUMARYZACJI. Zamiast przekazywac pelne raporty, tworzy streszczenia (3-5K zamiast 20-30K).

### Problem 3: Error Propagation

Blad w jednej fazie propaguje sie do nastepnych:

```
Researcher Forums podaje nieaktualne dane (2021) →
  Critic NIE lapie (score 0.65 ale akceptuje) →
    Synthesizer wlacza to do syntezy →
      Builder buduje na bazie zlych danych →
        QA NIE lapie (bo nie wie o zrodlach) →
          USER dostaje bledny build
```

**Mitigation:** Research Critic MUSI miec progow minimalny score. Raport < 0.6 = obowiazkowy re-research. To dodaje czas, ale eliminuje cascade failure.

### Problem 4: Orchestrator Single Point of Failure

Orkiestrator to JEDYNY agent, ktory widzi cala operacje. Jesli popelni blad:
- Zly research plan → 6 researcherow bada nie to co trzeba
- Zly build dispatch → builderzy buduja niezgodnie ze synteza
- Zla interpretacja QA → GO zamiast NO-GO

**Mitigation:** Analyst jako "second opinion" -- jego analiza zlozonosci to niezalezna weryfikacja ze Orkiestrator dobrze zrozumial zadanie.

### Problem 5: Diminishing Returns

Czy 19-ty agent dalby cos wiecej? Prawdopodobnie nie -- krancowa wartosc spada:

| Agentow | Krancowa wartosc | Krancowy koszt | ROI krancowy |
|---------|-------------------|----------------|--------------|
| 1 → 2 | +100% (walidacja) | +$0.04 | 2500% |
| 2 → 5 | +80% (research + build) | +$0.15 | 533% |
| 5 → 10 | +60% (specjalizacja) | +$0.30 | 200% |
| 10 → 13 | +30% (QA + Synthesizer) | +$0.25 | 120% |
| 13 → 18 | +20% (Critic + Manager + Docs) | +$0.40 | 50% |
| 18 → 20+ | +5% (marginalna poprawa) | +$0.30 | 17% |

18 agentow to punkt, w ktorym ROI krancowy nadal jest > 1.0 (warto). Przy 20+ agentach zaczynamy placic wiecej niz zyskujemy.

> **Czy wiesz, ze...?**
> 18 agentow to nie przypadek. To wynik optymalizacji ROI: kazdy z 18 ma jasno zdefiniowana role, ktora NIE jest duplikowana przez innego agenta. Dodanie 19-tego wymagaloby albo nowej roli (jakiej?), albo duplikacji istniejacej (dlaczego?). System jest "saturated" -- wszystkie potrzebne role sa obsadzone.

---

## 18. Quick Reference + Slownik + Zrodla

### Quick Reference Card

```
┌───────────────────────────────────────────────────────────┐
│            DEEP RESEARCH + BUILD -- Quick Ref             │
├───────────────────────────────────────────────────────────┤
│  PRESET:       #27 deep_research_build                    │
│  TIER:         4 (ENTERPRISE)                             │
│  AGENTOW:      18 (4 Core + 7 Research + 4 Build + 3 QA) │
│  WZORZEC:      Full Orchestra                             │
│  TOKENY:       600-1200K                                  │
│  KOSZT:        $0.70-$2.00                                │
│  LATENCJA:     10-25 minut                                │
│  PARALELIZACJA: 76.9%                                     │
│  MODELE:       Opus (4x) + Sonnet (8x) + Haiku (6x)      │
│  FAZY:         Init → Plan → Research → Critic →          │
│                Synthesis → Build → QA → GO/NO-GO          │
│  KLUCZOWA CECHA: Jedyny preset z Research Critic          │
│                  i formalnym Manager QA GO/NO-GO           │
│  KIEDY:        Due diligence, regulated, migration,       │
│                multi-vendor eval, enterprise RFP           │
│  KIEDY NIE:    Bug fix, simple feature, known tech,       │
│                research-only, budget < $0.70               │
└───────────────────────────────────────────────────────────┘
```

### Slownik terminow

| Termin | Definicja |
|--------|-----------|
| **Full Orchestra** | Wzorzec architektoniczny: wszystkie 4 warstwy (Strategia, Research, Build, QA) w pelnym skladzie. Maksymalna konfiguracja. |
| **Fan-out** | Wzorzec komunikacji: jeden agent (Orkiestrator) wysyla zadania do wielu agentow (6 Researcherow) ROWNOLEGLE. |
| **Research Critic** | Agent recenzujacy raporty badawcze. Ocenia wiarygodnosc zrodel, spojnosc wewnetrzna, obiektywnosc. Unikat presetu #27. |
| **Synthesis** | Proces laczenia wielu raportow w jeden spointy dokument z ujednoliconymi rekomendacjami. |
| **Triple QA** | Trojwarstwowa kontrola jakosci: Security + Quality + Manager GO/NO-GO. |
| **GO/NO-GO** | Formalna brama decyzyjna. GO = build spelnia kryteria. NO-GO = blokujace problemy. CONDITIONAL GO = GO z planem napraw. |
| **Critical Path** | Najdluzsza sciezka sekwencyjnych krokow w presecie. Opoznienie na tej sciezce = opoznienie calego presetu. |
| **Smart Model Routing** | Opus dla rozumowan ($15/$75), Sonnet dla budowy ($3/$15), Haiku dla researchu ($0.80/$4). Oszczednosc ~80%. |
| **Narrow Context** | Agent dostaje TYLKO informacje potrzebne do zadania. Mniej kontekstu = mniej halucynacji = nizszy koszt. |
| **Communication Overhead** | Tokeny zuzywane na komunikacje miedzy agentami. Przy 18 agentach: ~15-20% budzetu. |
| **Confidence Score** | Ocena pewnosci rekomendacji (0.0-1.0). W Deep R+B: wazone usrednienie z 6 zrodel + recenzja Critica. |
| **Diminishing Returns** | Malejace korzysci krancowe z kazdego dodatkowego agenta. 18 = optimum. 20+ = marnotrawstwo. |
| **Due Diligence** | Systematyczne badanie technologii/dostawcy przed podjaciem decyzji. Typowe zastosowanie presetu #27. |
| **Cascade Failure** | Blad w jednej fazie propagujacy sie do nastepnych. Critic + QA minimalizuja ryzyko kaskady. |
| **Saturated System** | System, w ktorym wszystkie potrzebne role sa obsadzone. Dodanie agenta nie zwieksza wartosci. |
| **Boardroom-Ready** | Raport zrozumialy dla nie-technicznego odbiorcy (management, inwestor, board). Output Synthesizera. |

### Zrodla

- **Gold Standard Agent Architecture 2026** -- referencyjny template 14 agentow w 4 fazach, rozszerzony do 18 w presecie #27
- **MASTERCLASS: Zespoly Agentow AI 2026** -- kompletny przewodnik z anty-wzorcami, kalkulatorem kosztow i 27 presetami
- **Agent Teams Configurator v8/v9/v11/v12** -- narzedzie do wizualnego projektowania architektur wieloagentowych
- **Anthropic Model Pricing 2026** -- oficjalne ceny: Opus ($15/$75), Sonnet ($3/$15), Haiku ($0.80/$4) za 1M tokenow
- **Multi-Agent Orchestration Patterns** (Anthropic, 2026) -- Fan-out, Pipeline, Hub-and-Spoke, Full Orchestra
- **Research Validation in AI Systems** -- metodologia peer review dla agentow badawczych
- **Enterprise AI Due Diligence Framework** -- best practices dla wielozrodlowej analizy technologicznej
- **OWASP Top 10 (2025)** -- standard audytu bezpieczenstwa web applications
- **PCI DSS v4.0** -- Payment Card Industry Data Security Standard
- **Amdahl's Law Applied to Multi-Agent Systems** -- teoretyczne limity paralelizacji
- **IDC Report: AI Model Routing Strategies 2026** -- 70% enterprise adopcja model routingu do 2028
- **OBSERVATORY Architecture** -- case study systemu z orkiestracja wieloagentowa i Research Critic

---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz 7-minutowa prezentacje wideo o presecie **Deep Research + Build** (Pelna Orkiestra 18 Agentow) z systemu architektur wieloagentowych AI. To jest CROWN JEWEL calej serii -- najwiekszy, najzlozniejszy, najdrozszy preset. Prezentacja powinna byc epicka, wizualnie oszalamiajaca i prowadzic widza od "dlaczego 18?" do "jak to dziala krok po kroku".

### Struktura prezentacji:

**[0:00-0:30] HOOK -- Konstelacja zaswiecajacych sie wezlow**
Ekran: Calkowicie czarny. Pojedynczy punkt swiatla (Orkiestrator) pojawia sie na srodku. Pulsuje. Potem pojawiaja sie 3 wezly wokol niego (Analyst, Planner, Synthesizer) -- polaczone zlotymi liniami. Potem 7 wezlow research (niebieskie, fan-out) -- jednoczesnie. Potem 4 wezly build (zielone). Potem 3 wezly QA (fioletowe). W 10 sekund -- cala konstelacja 18 wezlow swieci na ekranie. Tekst pojawia sie: "18 AGENTOW. 4 WARSTWY. 1 MISJA." Podtytul: "Deep Research + Build — The Full Orchestra". Muzyka: niskoczestotliwosciowy hum przechodzacy w pelna orkiestre symfoniczna.

**[0:30-1:15] ANALOGIA NASA -- Animowana misja kosmiczna**
Animacja centrum kontroli misji NASA. Szesc ekranow monitorujacych rozne systemy (6 researcherow -- kazdy ekran innym kolorem). Jeden kontroler w centrum (Orkiestrator) ogladajacy WSZYSTKIE ekrany. Animacja: dane plyna z kazdego ekranu do centralnego dashboardu. Recenzent (Critic) sprawdza dane z kazdego ekranu -- stawia zielone checkmarki lub czerwone flagi. Glowny Naukowiec (Synthesizer) laczy dane w jeden plan lotu. Potem: 4 inzynierow buduje kapsuIe (Build Squad). 3 inspektorow sprawdza (Triple QA). Ostatnia scena: "LAUNCH APPROVED" -- rakieta startuje. Tekst: "Nikt nie leci w kosmos bez pelnego audytu. I nikt nie powinien budowac platformy enterprise bez pelnego researchu."

**[1:15-2:30] 4 WARSTWY -- Budowanie diagramu krok po kroku**
Animacja budowania diagramu 18 agentow warstwa po warstwie. WARSTWA 1 (zlota): Orkiestrator, Analyst, Planner, Synthesizer -- pojawiaja sie z gory, polaczeni zlotymi liniami. Etykieta: "STRATEGIA -- mozg operacji". WARSTWA 2 (niebieska): 6 Researcherow + Critic -- pojawiaja sie z lewej strony jako konstelacja polaczona niebieskimi liniami. Animacja "fan-out": 6 strzalek wychodzacych JEDNOCZESNIE z Orkiestratora. Etykieta: "RESEARCH -- 6 perspektyw, 1 prawda". WARSTWA 3 (zielona): 4 Builderow -- pojawiaja sie od dolu. 3 pracuja rownolegle, 4-ty (Integrator) laczy ich prace. Etykieta: "BUILD -- od syntezy do kodu". WARSTWA 4 (fioletowa): 3 QA -- pojawiaja sie z prawej. Security i Quality rownolegle, Manager QA jako brama. Etykieta: "QA -- potrojna kontrola". Finalna animacja: WSZYSTKIE 18 wezlow jednoczesnie pulsuja, polaczenia swieca -- pelna orkiestra w akcji. Counter w rogu: "34 aktywne kanaly komunikacji".

**[2:30-3:30] RESEARCH DEEP-DIVE -- 6 researcherow w akcji**
Ekran podzielony na 6 segmentow (jak monitoring kamer). Kazdy segment to jeden Researcher:
- Reddit: animacja scrollowania watkow, upvote'y wylatujace
- X/Twitter: tweet bubbles z opiniami ekspertow
- UX: wireframey checkout flow, A11Y checklisty
- GitHub: repo health bars, star counters, issue trackers
- Forums: Stack Overflow odpowiedzi, Hacker News komentarze
- Docs: oficjalna dokumentacja z podswietlonymi fragmentami

Potem: ZOOM OUT -- wszystkie 6 raportow "lecza" do jednego wezla: Research Critic. Critic przechodzi kazdy raport -- animacja: lupa skanujaca tekst, score'y pojawiajace sie obok (0.91, 0.82, 0.65...). Raport z 0.65 dostaje czerwona flage: "WEAK SOURCES -- REVIEW". Potem: zrecenzowane raporty plyna do Synthesizera. Synthesizer "tasuje" 6 dokumentow i produkuje 1: "UNIFIED SYNTHESIS". Animacja: 6 kolorowych strumieni laczacych sie w jeden bialy strumien. Confidence score: 0.84.

**[3:30-4:30] BUILD PHASE -- 4 builderow + Integrator**
Animacja "construction site" -- 4 strefa budowy. Backend Dev (szara strefa): kod API sypie sie jak klocki Tetris, budujac sciane. Frontend Dev (kolorowa strefa): komponenty UI spadaja i skladaja sie w interfejs. Feature Dev (logiczna strefa): flowcharty i decision trees animuja sie. Potem: ZOOM OUT -- 3 strefy sa oddzielone szczelinami. Integrator (pomaranczowy) laczy szczeliny -- animacja spawania/lutowania. Smoke test: 12 zielonych checkmarkow pojawia sie jeden po drugim. "BUILD COMPLETE: 47 files, 3200 LOC".

**[4:30-5:30] TRIPLE QA -- Brama GO/NO-GO**
Animacja trojstopniowej bramy. BRAMA 1 (czerwona): QA Security -- laser skanujacy kod, szukajacy dziur. Znajduje 1 High finding (pulsujacy czerwony punkt). BRAMA 2 (niebieska): QA Quality -- mrowka testujaca kazda sciezke w labiryncie kodu. 89% coverage. BRAMA 3 (zlota): Manager QA -- oba raporty lecza na stol. Manager czyta. Animacja: waga -- po jednej stronie "findings" (1 High, 3 Medium), po drugiej "quality" (89% coverage, 0.82 score). Waga przechyla sie w strone "quality". Tekst: "CONDITIONAL GO -- fix CSP header". Animacja: szybki fix (Backend Dev naprawia w 2 minuty). Re-test: "0 High, 0 Critical". Manager: PIECIATKA -- "GO". Wielkie zielone "APPROVED" na calym ekranie z animacja confetti.

**[5:30-6:15] KOSZTY i POROWNANIE -- Dlaczego warto**
Animowany wykres: os Y = wartosc/jakosc, os X = koszt. Punkty: Solo ($0.08, nisko), Recon ($0.12, srednio-nisko), Startup ($0.25, srednio), SaaS ($0.55, srednio-wysoko), Full ($0.85, wysoko), Deep R+B ($1.20, MAKSYMALNIE). Krzywa ROI: stromo w gore do Full, potem lagodniej do Deep R+B. Ale: dodatkowa kreska "ryzyko bledu" -- stromo w dol z rosnacosc presetu. Tekst: "Przy Deep R+B placisz $1.20 za sesje. Koszt ZLEJ DECYZJI enterprise to $5,000-50,000. ROI: 4,000-40,000x". Animacja: donut chart kosztow -- Opus (70%), Sonnet (22%), Haiku (8%). Podpis: "Smart Model Routing oszczedza 80% vs all-Opus". Tabela animowana: Deep 18 vs Full 13 vs SaaS 10 z podswietleniem Deep R+B w kolumnie "Research Depth" i "QA Formal".

**[6:15-6:45] ANTI-PATTERNY -- Szybkie ostrzezenia**
Animacja: 6 "czerwonych flag" wbijajacych sie w ziemie jedna po drugiej z dzwiekiem stempla. Kazda z etykieta: "18 agentow do bug fixa", "Research bez buildu", "Bottleneck na Criticu", "Idle researcherzy", "Pominiecie syntezy", "QA jako optional". Szybka animacja: kazda flaga przekreslona zielonym checkmarkiem i jednozdaniowa poprawka. Tempo szybkie -- 5 sekund na flage.

**[6:45-7:00] ZAMKNIECIE -- Pelna orkiestra**
Powrot do konstelacji 18 wezlow z hooka. Tym razem: kazdy wezel ma etykiete z nazwa agenta. Pulsuja synchronicznie -- jak bijace serce. Tekst centralny: "DEEP RESEARCH + BUILD". Podtytul: "Gdy stawka jest najwyzsza, orkiestra gra w pelnym skladzie." Koncowy ekran: "Preset #27 | 18 Agents | 4 Layers | 76.9% Parallel | $0.70-$2.00". Call to action: "Nastepnym razem gdy stoisz przed decyzja technologiczna wartoa tysioace dolarow -- nie szukaj odpowiedzi sam. Uruchom Pelna Orkiestre." Logo: Agent Architecture Designer 2026. Muzyka: pelna orkiestra symfoniczna -- crescendo na ostatnich 5 sekundach, potem cisza.

### Styl wizualny:
- **Paleta glowna:** Deep Blue (#1E40AF) jako bazowy kolor, Gold (#F59E0B) jako akcent premium
- **Tlo:** Gradient od #0F172A (prawie czarny) do #1E3A5F (granatowy). Subtelne gwiazdki/czasteczki w tle (konstelacja)
- **Warstwa Research:** Niebieski (#3B82F6) -- jasniejszy niz tlo, pulsujacy
- **Warstwa Build:** Zielony (#10B981) -- energetyczny, budujacy
- **Warstwa QA:** Fioletowy (#8B5CF6) -- kontrolny, powaony
- **Warstwa Strategia:** Zloty (#F59E0B) -- premium, decyzyjny
- **Akcent sukcesu:** Zielony (#22C55E) dla GO, checkmarkow
- **Akcent poraki:** Czerwony (#EF4444) dla NO-GO, findings, anti-patternow
- **Tekst:** Bialy (#FFFFFF) na ciemnym tle, bold dla kluczowych slow, semi-transparent dla drugorzednych
- **Motyw graficzny:** Orkiestra symfoniczna / konstelacja gwiazdozbiorow / NASA mission control. Te trzy motywy przeplataja sie: agenci jako gwiazdy w konstelacji, polaczenia jako orbity, Orkiestrator jako slonce centralne
- **Animacje:** Plynne, epickie. Budowanie diagramow warstwa po warstwie z efektem "materializing from particles". Polaczenia miedzy agentami jako strumienie swiatla. Fan-out research jako eksplozja 6 strzalek jednoczesnie. Integracja jako strumienie laczace sie w jeden. GO/NO-GO jako brama z efektem "unlocking"
- **Typografia:** Nowoczesny sans-serif (Inter lub Satoshi). Tytuly: 48px bold caps. Podnagowki: 32px semibold. Body: 18px regular. Countery i metryki: monospace (JetBrains Mono) dla efektu "data dashboard"
- **Muzyka:** Orkiestrowa/symfoniczna. Zaczyna cicho (pojedynczy instrument -- piano lub smyczki) przy hookz. Narasta z kazdowarstwa (dodawanie instrumentow = dodawanie agentow). Research phase: szybkie arpegia (szesc stron jednoczesnie). Build phase: perkusja (budowanie). QA phase: napieciowa pauza → triumfalne rozwiazanie przy GO. Crescendo na zakonczeniu -- PELNA ORKIESTRA. Ewentualnie: elektroniczna muzyka z orkiestrowymi sampIami (hybryda tech + klasyka)
- **Tempo:** Umiarkowane do szybkiego. Hook: szybki (5-10s na buildup). Analogia: wolniejszy (15-20s na scene). Diagram: umiarkowany (budowanie warstwa po warstwie). Research/Build/QA: dynamiczny (duzo animacji). Koszty: spokojny (dane, wykresy). Anti-patterny: szybki (5s/flaga). Zamkniecie: majestatyczny, powolny.
- **Transitions:** Miedzy sekcjami: efekt "constellation morph" -- wezly przeobrazaja sie w nowy uklad. Lub: "deep blue wave" -- fala koloru zamiatajaca ekran.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike (1080x4500px) o presecie **Deep Research + Build** (Pelna Orkiestra 18 Agentow) z systemu architektur wieloagentowych AI. To jest NAJWIEKSZA infografika w calej serii -- 18 agentow wymaga 4500px wysokosci. Infografika powinna byc czytelna, logicznie zorganizowana, wizualnie spektakularna i oddawac skale tego presetu.

### Struktura infografiki (od gory do dolu):

**[NAGLOWEK -- 1080x300px]**
Tytul: "DEEP RESEARCH + BUILD" w duzym, boldnym foncie (48px, #FFFFFF). Podtytul: "Pelna Orkiestra 18 Agentow" (28px, #F59E0B zloty). Ponizej: badge'y w linii: "Preset #27 | Tier 4 ENTERPRISE | 18 Agents | 76.9% Parallel | $0.70-$2.00". Tlo: gradient od #0F172A do #1E40AF (deep blue). Dekoracja: subtelna konstelacja 18 punktow polaczonych liniami w tle -- zapowiedz architektury. Gorna krawedz: zlota linia 2px (premium indicator).

**[SEKCJA 1: METRYKI NA PIERWSZY RZUT OKA -- 1080x250px]**
6 metrycznych kart w siatce 3x2, kazda z ikona, liczba i etykieta:
- 🎼 18 Agentow (najwiecej w systemie)
- ⚡ 76.9% Paralelizacji
- 📊 600-1200K Tokenow
- 💰 $0.70-$2.00 / sesja
- ⏱️ 10-25 min latencja
- 🔗 34 kanaly komunikacji
Tlo: ciemnogranatowe (#111827). Karty: glassmorphism (polprzezroczyste, blur, subtelny border). Ikony: zlote (#F59E0B) na ciemnym tle.

**[SEKCJA 2: ANALOGIA MISSION CONTROL -- 1080x300px]**
Ilustracja NASA Mission Control: centralny pulpit (Orkiestrator) z 6 ekranami (Researcherzy), panel recenzji (Critic), stol syntezy (Synthesizer), hala montazowa (Build), strefa inspekcji (QA). Styl: uproszczony, izometryczny, w palecie Deep Blue + Gold. Etykiety agentow przy kazdym elemencie. Cytat na dole: "Nikt nie leci w kosmos bez pelnego audytu."

**[SEKCJA 3: ARCHITEKTURA 4 WARSTW -- 1080x600px]**
Glowny diagram architektoniczny -- SERCE infografiki. 4 warstwy rozdzielone kolorowymi liniami:
- STRATEGIA (zlota #F59E0B): 4 wezly (Orkiestrator centralny, Analyst, Planner, Synthesizer) polaczone zlotymi liniami
- RESEARCH (niebieska #3B82F6): 7 wezlow (6 Researcherow w polkolu + Critic w centrum pod nimi). Strzalki fan-out z Orkiestratora do 6 Researcherow. Strzalki z Researcherow do Critica
- BUILD (zielona #10B981): 4 wezly (Backend, Frontend, Feature rownolegle + Integrator ponizej). Strzalki z 3 builderow do Integratora
- QA (fioletowa #8B5CF6): 3 wezly (Security i Quality rownolegle + Manager QA ponizej). Strzalki do Manager QA. Brama "GO/NO-GO" jako ikona zamka/klodki

Kazdy wezel: kolko z litera (A-00, R-01, B-01, Q-01), nazwa agenta, model (Opus/Sonnet/Haiku) oznaczony kolorem/ikona. Polaczenia: animowane linie (efekt dash pattern sugerujacy ruch). Legenda modeli: Opus = zloty ♛, Sonnet = srebrny ♕, Haiku = brazowy ♗.

**[SEKCJA 4: RESEARCH DEEP-DIVE -- 1080x450px]**
6 kart researcherskich w siatce 3x2, kazda z:
- Ikona zrodla (Reddit alien, X logo, lupa UX, GitHub octocat, forum bubble, dokument)
- Nazwa: Researcher Reddit / X / UX / GitHub / Forums / Docs
- Model: Haiku ($0.01-$0.03)
- 3 kluczowe specjalizacje (bullet points)
- Przyklad output: "sentiment score: 85% positive" / "repo health: 9.1/10" etc.

Pod kartami: RESEARCH CRITIC (wieksza karta, zlota ramka Opus):
- "Czyta WSZYSTKIE 6 raportow"
- Scoring: 5 kryteriow z wagami (pie chart mini)
- Threshold: score < 0.6 = re-research

Pod Criticem: SYNTHESIZER (wieksza karta, zlota ramka Opus):
- "6 raportow → 1 synteza"
- Confidence score: "0.84"
- Output: "TOP 3 rekomendacje z uzasadnieniem wielozrodlowym"

**[SEKCJA 5: BUILD DEEP-DIVE -- 1080x350px]**
4 karty builderow w linii:
- Backend Dev: ikona serwera, "API, DB, infra", Sonnet, 50-100K tokenow
- Frontend Dev: ikona ekranu, "UI, komponenty", Sonnet, 40-80K tokenow
- Feature Dev: ikona zebatki, "logika biznesowa", Sonnet, 35-70K tokenow
- Integrator: ikona puzzle, "merge + smoke test", Sonnet, 30-60K tokenow

Animacja flow: strzalki z 3 gornych (Backend, Frontend, Feature) do dolnego (Integrator). Etykieta: "3 builderow ROWNOLEGLE → Integrator LACZY". Output box: "47 plikow, 3200 LOC, 12/12 smoke test PASS".

**[SEKCJA 6: TRIPLE QA -- 1080x350px]**
3 karty QA + flowchart decyzji:
- QA Security: ikona tarczy, "OWASP Top 10, CVE scan, PCI DSS", severity levels (Critical/High/Medium/Low)
- QA Quality: ikona checklisty, "functional tests, edge cases, coverage", metryki (89% coverage, 0.82 quality score)
- Manager QA: ikona pieczeci/stempla, "GO / CONDITIONAL GO / NO-GO", decision flowchart (mini wersja z sekcji 10 dokumentu)

Wizualizacja flow: Security i Quality → dwa raporty → Manager QA → BRAMA GO/NO-GO. Brama jako duza ikona z 3 stanami: zielony (GO), zolty (CONDITIONAL), czerwony (NO-GO).

**[SEKCJA 7: WORKFLOW TIMELINE -- 1080x400px]**
Pionowy timeline 7 faz z czasami:
- INIT (30s): Orkiestrator + Analyst ███
- PLAN (20s): Planner ██
- RESEARCH (90s): 6 Researcherow ██████████████████ (PARALLEL -- szerokie, 6 rownoleglych pasow)
- CRITIC (60s): Research Critic █████████
- SYNTHESIS (45s): Synthesizer ██████
- BUILD (180s): 3+1 Builderow ████████████████████████ (3 parallel + 1 sequential)
- QA (60s): 2+1 QA ████████ (2 parallel + 1 sequential)
TOTAL: ~485s (~8 min efektywnie, vs ~22 min sekwencyjnie). Strzalka: "OSZCZEDNOSC 64% CZASU dzieki paralelizacji".

**[SEKCJA 8: KOSZT BREAKDOWN -- 1080x350px]**
Donut chart duzy (centralny): Opus 70%, Sonnet 22%, Haiku 8%. Etykiety z kwotami.
4 mini donut charts (per faza): Strategia $0.18, Research $0.18, Build $0.15, QA $0.06. Komunikacja $0.03-0.08.
Bar chart: porownanie kosztow: Solo $0.08 → Recon $0.12 → Startup $0.25 → SaaS $0.55 → Full $0.85 → Deep R+B $1.20. Deep R+B podswietlony zlotym.
ROI box: "Koszt sesji: $1.20 | Koszt zlej decyzji enterprise: $5,000-50,000 | ROI: 4,000-40,000x"

**[SEKCJA 9: POROWNANIE PRESETOW -- 1080x300px]**
Tabela porownawcza 3 presetow:
| | SaaS 10 | Full 13 | Deep R+B 18 |
Rzedy: Researcherow, Builderow, QA, Critic?, Manager QA?, Paralelizacja, Tokeny, Koszt, Latencja.
Deep R+B podswietlony zlota ramka. Kolumna "Deep R+B 18" z ikonami checkmarkow przy "Critic: TAK", "Manager QA: TAK".

**[SEKCJA 10: KIEDY UZYWAC -- 1080x300px]**
Dwie kolumny: ZIELONE SWIATLO (5 use cases z ikonami) vs CZERWONE SWIATLO (5 anti-use cases z ikonami).
ZIELONE: Due diligence, Regulated industry, Platform migration, Multi-vendor eval, Enterprise RFP.
CZERWONE: Bug fix, Simple feature, Known tech, Research-only, Budget < $0.70.

**[SEKCJA 11: ANTI-PATTERNY -- 1080x250px]**
6 kart w siatce 3x2 z czerwonym tlem i ikona ❌:
1. 18 agentow do bug fixa
2. Research bez buildu
3. Bottleneck na Criticu
4. Idle researcherzy
5. Pominiecie syntezy
6. QA jako opcjonalne
Kazda karta: 1-zdaniowe "poprawne podejscie" z zielonym checkmarkiem.

**[SEKCJA 12: QUICK REFERENCE -- 1080x200px]**
Kompaktowa karta w stylu "cheat sheet":
Preset #27 | 18 Agents | 4 Layers | Full Orchestra | Opus 4x + Sonnet 8x + Haiku 6x | 600-1200K | $0.70-$2.00 | 10-25 min | 76.9% parallel | Init → Plan → Research → Critic → Synthesis → Build → QA → GO/NO-GO

**[STOPKA -- 1080x100px]**
"Agent Architecture Designer 2026 | Gold Standard Architecture | Deep Research + Build -- Preset #27"
Zlota linia separatora. Tekst w #9CA3AF na ciemnym tle.

### Styl wizualny:
- **Paleta glowna:** Deep Blue (#1E40AF) + Gold (#F59E0B) -- premium enterprise feel
- **Tlo:** Gradient od #0F172A (gora) przez #111827 (srodek) do #0F172A (dol). Subtelna konstelacja/particle dots w tle calej infografiki
- **Karty agentow:** Glassmorphism -- polprzezroczyste (#FFFFFF10), blur backdrop, 1px border (#FFFFFF20), zaokraglone rogi 12px
- **Warstwy:** Kodowane kolorami -- Strategia (#F59E0B zloty), Research (#3B82F6 niebieski), Build (#10B981 zielony), QA (#8B5CF6 fioletowy)
- **Typografia:** Sans-serif. H1: 36px bold #FFFFFF. H2: 24px semibold #F59E0B. H3: 18px medium #E5E7EB. Body: 14px regular #9CA3AF. Metryki: JetBrains Mono 20px bold (monospace dla liczb)
- **Ikony:** Outline style, monochromatyczne z akcentem kolorystycznym odpowiadajacym warstwie. 24x24px dla kart, 32x32px dla sekcji
- **Separatory miedzy sekcjami:** Subtelna zlota linia 1px z gradientem fade na koncach
- **Wykresy:** Flat design, kolory warstw, zaokraglone konce slupkow, etykiety bezposrednie (bez legendy gdzie mozliwe)
- **Motyw:** Konstelacja + orkiestra symfoniczna. Wezly agentow jak gwiazdy, polaczenia jak orbity. Premium, enterprise, "najwazniejszy dokument w serii"

---

*Dokument opracowany na podstawie Gold Standard Agent Architecture 2026, MASTERCLASS Agent Teams, AGENT_TEAMS_CONFIGURATOR v8/v9/v11/v12 oraz analiz multi-agent orchestration patterns. Dane kosztowe aktualne na kwiecien 2026. Deep Research + Build to preset #27 -- ostatni i najzlozniejszy w calym ekosystemie 27 presetow.*
