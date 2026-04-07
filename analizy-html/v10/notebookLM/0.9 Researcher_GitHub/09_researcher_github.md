# Researcher GitHub (R-05) -- Archeolog Dzialajacego Kodu w Systemach Wieloagentowych

## Kompletny przewodnik po roli GitHub Research Agent w architekturze Gold Standard 2026

**Seria:** Architektura Agentow AI -- Role i Specjalizacje
**Numer roli:** R-05 (Research Layer)
**Model:** Claude Haiku ($0.80/$4.00 per 1M tokenow input/output)
**Warstwa:** RESEARCH (Faza 1) -- Deep Research Belt
**Obciazenie:** 55/100 (NAJWYZSZE wsrod researcherow -- analiza kodu jest token-intensive)
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Kim jest Researcher GitHub?

Wyobraz sobie archeologa odkopujacego ruiny starozytnej cywilizacji. Nie czyta ksiazek o tym, jak tamta cywilizacja MIALA zyc wedlug swoich filozofow -- on widzi, JAK naprawde zyla. Widzi fundamenty budynkow, ktore przetrwaly wieki, i te, ktore sie zawalily po dekadzie. Widzi sciezki wydeptane przez tysiace stop -- nie te narysowane na planach architekta, ale te, ktorymi ludzie naprawde chodzili. Kazda warstwa ziemi opowiada inna historie: tu bylo ognisko, tu warsztat, tu mur obronny wzniesiony w posiechu. Archeolog odroznia to, co ZAMIERZANO zbudowac, od tego, co FAKTYCZNIE zbudowano. Researcher GitHub (oznaczenie R-05 w architekturze Gold Standard 2026) jest wlasnie takim archeologiem. Nie czyta dokumentacji o tym, jak POWINNO sie budowac aplikacje -- on odkopuje repozytoria, w ktorych widac, jak je NAPRAWDE zbudowano. Fundamenty (architektura), narzedzia (dependencies), bledy konstrukcyjne (Issues) i historia napraw (Pull Requesty).

Wyobraz sobie tez inzyniera odwrotnego (reverse engineera), ktory dostaje produkt konkurencji do analizy. Nie interesuje go reklama tego produktu, broszura marketingowa ani obietnice CEO na konferencji. Rozbiera produkt na czesci pierwsze -- patrzy, z czego jest zrobiony, jakie kompromisy podjeto przy konstrukcji, gdzie uzyto tanszych materialow, a gdzie nie oszczedzano. Badza polaczenia, testuje wytrzymalosc, sprawdza, czy etykieta "premium" odpowiada temu, co jest w srodku. Researcher GitHub robi dokladnie to samo z repozytoriami open-source: rozbiera je na czesci, analizuje architekture, ocenia jakosc kodu, sprawdza, czy maintainerzy reaguja na zgloszenia problemow.

I wreszcie -- wyobraz sobie inspektora budowlanego, ktory sprawdza dom przed zakupem. Kupujacy widzi swiezy tynk, ladna elewacje, piekny ogrod i nowoczesna kuchnie. Inspektor patrzy na fundamenty, instalacje elektryczna, rury w scianach i wilgoc w piwnicy. Otwiera skrzynke bezpiecznikow, puka w sciany, sprawdza nachylenie dachu. README repozytorium to ta ladna elewacja -- zawsze wyglada obiecujaco. Researcher GitHub to inspektor, ktory zaglada pod README, do Issues, do Pull Requestow, do historii commitow. I dopiero wtedy mowi: "Ten fundament jest solidny" albo "Uciekaj, zanim sie zawali".

W systemie wieloagentowym Researcher GitHub jest jednym z **maksymalnie szesciu rownoleglych researcherow** w tak zwanym "Deep Research Belt" -- pasie badawczym, gdzie kazdy specjalista przeszukuje inne zrodla informacji:

| Agent | Oznaczenie | Specjalizacja zrodlowa |
|-------|-----------|------------------------|
| Researcher Tech | R-01 | Dokumentacja, benchmarki, blogi techniczne |
| Researcher UX | R-02 | Dribbble, Behance, Awwwards, Mobbin |
| Researcher Reddit | R-03 | r/webdev, r/programming, r/reactjs, r/SaaS |
| Researcher X | R-04 | X/Twitter -- trendy, launche, influencerzy |
| **Researcher GitHub** | **R-05** | **Repozytoria open-source, architektura, Issues** |
| Researcher Forums | R-06 | StackOverflow, Dev.to, Medium, Hacker News |

Wsrod tej szostki Researcher GitHub ma wyjatkowa role. Oto jak mozna podsumowac roznice:

- **Tech:** TEORIA + DOKUMENTACJA -- co mowi PRODUCENT
- **Reddit:** OPINIE -- co mysla DEWELOPERZY
- **X:** TRENDY -- co jest NOWE
- **GitHub:** DZIALAJACY KOD -- co faktycznie DZIALA w produkcji
- **Forums:** TUTORIALE -- jak inni ROZWIAZALI problemy

Inni researcherzy zbieraja opinie, dokumentacje, trendy i tutoriale. Researcher GitHub zbiera cos, czego zaden inny researcher nie moze dostarczyc: **DZIALAJACY KOD**. Nie teorie. Nie obietnice. Nie opinie. Realny, przetestowany w boju, wdrozony w produkcji kod, ktory mozna przeczytac, zrozumiec i wykorzystac jako referencje.

> **CZY WIESZ, ZE...?**
> Wedlug danych z marca 2026, GitHub hostuje ponad **420 milionow repozytoriow** i ma ponad **100 milionow aktywnych deweloperow**. To najwieksza baza dzialajacego kodu na swiecie. Dla Researchera GitHub to jak biblioteka aleksandryjska -- ale zamiast zwojow, sa tam dzialajace aplikacje, ktore mozna przeczytac linia po linii. Problem? 90% tych repozytoriow to opuszczone prototypy, projekty studenckie i weekendowe eksperymenty. Dlatego filtrowanie -- gwiazdki, commity, Issues -- jest absolutnie krytyczne.

---

## 2. Kluczowe Obowiazki

Researcher GitHub ma piec glownych obszarow odpowiedzialnosci. Kazdy jest scisle zdefiniowany -- co robi, czego NIE robi, i jaki output produkuje.

### 2.1 Wyszukiwanie repozytoriow referencyjnych (Repository Discovery)

Pierwszym zadaniem jest **znalezienie repozytoriow podobnych do analizowanego projektu**. To nie jest "wpisz w GitHub search i wez pierwsze 5 wynikow". To systematyczny proces:

1. Zidentyfikuj kluczowe cechy projektu (technologia, domena, architektura)
2. Sformuluj precyzyjne zapytania wyszukujace (np. "SaaS boilerplate Next.js Stripe")
3. Przefiltruj wyniki wedlug metryk zdrowia (stars, commity, Issues)
4. Odrzuc repozytoria ponizej progu jakosci (stars <100, brak commitow >2 lata)
5. Wybierz TOP 5 do glebokiej analizy

**Zasada kardynalna:** Stars >100 jako absolutne minimum. Ponizej tego progu -- ryzyko, ze repo jest projektem weekendowym bez produkcyjnej wartosci.

### 2.2 Analiza architektury kodu (Architecture Analysis)

Researcher GitHub nie tylko ZNAJDUJE repozytoria -- **analizuje ich architekture**:

- Struktura katalogow (monorepo vs polyrepo, src/ layout, organizacja modulow)
- Wzorce projektowe (MVC, hexagonal, clean architecture, event-driven)
- Warstwa abstrakcji (jak oddzielono logike biznesowa od infrastruktury)
- Routing i nawigacja (struktura pages/routes)
- Stan aplikacji (Redux, Zustand, context, server state)

To jest to, czego zaden inny researcher nie dostarcza -- **realny wglad w to, jak ludzie NAPRAWDE organizuja kod**, nie jak podreczniki mowia, ze powinni.

### 2.3 Ocena zdrowia repozytorium (Repository Health Assessment)

Kazde repozytorium jest oceniane wedlug **osmiu metryk zdrowia**:

| Metryka | Dobry sygnal | Zly sygnal |
|---------|-------------|------------|
| Stars | >100 | <10 |
| Ostatni commit | <6 miesiecy | >2 lata |
| Otwarte Issues | Aktywny triage | 500+ bez obslugi |
| Pull Requesty | Mergowane regularnie | Ignorowane miesiiacami |
| Kontrybutorzy | 5+ | 1 (bus factor) |
| Licencja | MIT/Apache | Brak/proprietary |
| Testy | CI/CD passing | Brak testow |
| README | Szczegolowe, przyklady | Puste lub nieaktualne |

**Health Score** to srednia wazona tych metryk. Repozytorium z health score ponizej 4/10 jest oznaczane jako "ryzykowne" i nie trafia do rekomendacji.

### 2.4 Ekstrakcja wzorcow i praktyk (Pattern Extraction)

Najcenniejszy output Researchera GitHub -- **wyodrebnianie powtarzalnych wzorcow** z najlepszych repozytoriow:

- Jakie pakiety npm/PyPI pojawiaja sie w 4 z 5 top repozytoriow?
- Jaki wzorzec architektury dominuje?
- Jak organizowane sa pliki konfiguracyjne?
- Jakie podejscie do autentykacji jest najczestsze?
- Jaka struktura testow sie powtarza?

Przyklad realnego wgladu: *"Top 5 SaaS boilerplates: 4/5 uzywa Next.js. 3/5 uzywa Prisma jako ORM. 5/5 ma oddzielny katalog /lib dla logiki biznesowej."*

### 2.5 Analiza Issues i znanych problemow (Issue Analysis)

Issues na GitHubie to **kopalnia wiedzy o problemach produkcyjnych**. Researcher GitHub analizuje:

- **Najczesciej zglaszane bugi** -- co sie psuje w produkcji?
- **Feature requesty** -- czego brakuje uzytkownikom?
- **Dyskusje architektoniczne** -- jakie kompromisy podjeto i dlaczego?
- **Breaking changes** -- co sie zmienilo miedzy wersjami?
- **Czas odpowiedzi maintainerow** -- czy projekt jest aktywnie utrzymywany?

> **CZY WIESZ, ZE...?**
> W systemie Anthropic Multi-Agent Research System, zespol badawczy z wyspecjalizowanymi agentami osiagnal wyniki o **90.2% lepsze** niz pojedynczy agent na zadaniach badawczych. Researcher GitHub jest czescia tego zespolu specjalistow -- ale jego unikalna wartosc polega na tym, ze dostarcza DOWODY W FORMIE KODU, nie opinie. Kiedy Researcher Tech mowi "LangGraph jest dobry do workflow", a Researcher GitHub pokazuje "70% top repos w React uzywa LangGraph", masz teorie potwierdzona praktyka.

---

## 3. Zrodla danych -- Anatomia repozytorium

Researcher GitHub nie czyta repozytorium jak zwykly przegladacz -- czyta je jak **rentgen**. Kazdy element ma swoje znaczenie diagnostyczne.

### 3.1 README.md -- Pierwsze wrazenie

README to **wizytowka** repozytorium. Ujawnia: cel projektu, stack technologiczny, instrukcje instalacji, przyklady uzycia. Ale UKRYWA: realne problemy produkcyjne, dlug technologiczny i performance w skali. **Zasada:** README jest punktem wejscia, nie punktem konczowym analizy.

### 3.2 package.json / requirements.txt -- Prawdziwy stack

Pliki zaleznosci to **obiektywna prawda** o stacku -- nie to, co README deklaruje, ale to, co projekt FAKTYCZNIE uzywa:

```json
// package.json ujawnia PRAWDE:
{
  "dependencies": {
    "next": "^15.1.0",        // framework
    "prisma": "^6.2.0",       // ORM
    "stripe": "^14.0.0",      // platnosci
    "next-auth": "^5.0.0",    // autentykacja
    "tailwindcss": "^4.0.0"   // styling
  }
}
```

### 3.3 Struktura /src -- Organizacja kodu

Struktura katalogow mowi wiecej niz tysiace slow dokumentacji. Researcher GitHub porownuje layouty `/src`, `/app`, `/lib`, `/components` miedzy repozytoriami i wyodrebnia **dominujace wzorce organizacyjne**.

### 3.4 .github/workflows -- Dojrzalosc CI/CD

Obecnosc katalogu `.github/workflows` jest silnym sygnalem jakosci:

| Element | Sygnal |
|---------|--------|
| Workflow na push/PR | Podstawowa higiena CI |
| Testy automatyczne | Troska o jakosc |
| Linting w CI | Dbalosc o standardy kodu |
| Deploy pipeline | Produkcyjna gotowosc |
| Dependabot config | Aktywne zarzadzanie zaleznosci |
| Brak .github/ | Powazny alarm -- brak CI w 2026 to red flag |

### 3.5 Issues -- Problemy ze swiata rzeczywistego

Issues to **najcenniejsze zrodlo** w calym repozytorium. README mowi, co POWINNO dzialac. Issues mowia, co NIE DZIALA. Bug reports, feature requests, questions, discussions -- to **wywiad z uzytkownikami**, ktorego nie musisz sam prowadzic.

**Zasada: Czytaj Issues ZANIM adoptujesz repozytorium.**

### 3.6 Pull Requesty -- Kultura code review

PR-y ujawniaja **kulture inzynierska**: czy sa reviewowane, jak szybko mergowane, czy sa testy w PR-ach, jak maintainerzy komunikuja sie z kontrybutorami. Repo, gdzie PR-y wisza miesiiacami bez odpowiedzi, to repo z chorym procesem.

### 3.7 Stars/Forks -- Popularnosc (ale != jakosc!)

Stars to **sygnal popularnosci**, nie jakosci. **Forks** sa bardziej informatywne -- oznaczaja, ze ktos UZYWA kodu, nie tylko go "polubil". Stosunek forks/stars ponad 20% to silny sygnal praktycznej uzytecznosci.

### 3.8 Contributors -- Bus factor i zdrowie spolecznosci

| Kontrybutorzy | Ocena |
|---------------|-------|
| 1 | Krytyczne ryzyko (bus factor = 1) |
| 2-4 | Maly zespol, umiarkowane ryzyko |
| 5-20 | Zdrowa spolecznosc |
| 20+ | Dojrzaly projekt open-source |

> **UWAGA!**
> Researcher GitHub NIGDY nie ocenia repozytorium na podstawie jednej metryki. Repo z 50,000 gwiazdkami, ale bez commita od 3 lat, jest GORSZE niz repo z 200 gwiazdkami i aktywnym committingiem. Stars sa jak "like" na Instagramie -- latwo je zdobyc, ale nie znacza, ze produkt jest dobry. Researcher GitHub patrzy na CALOSC: gwiazdki + commity + Issues + PR-y + kontrybutorzy + licencja + testy.

---

## 4. Format raportu

Kazdy output Researchera GitHub to **ustrukturyzowany raport** w formacie JSON. Nie wolny tekst. Nie opinia. Parsowalny, walidowalny dokument.

### Szablon raportu

```json
{
  "agent_id": "R-05",
  "report_type": "github_research",
  "research_question": "Top repos dla SaaS boilerplate w Next.js",
  "timestamp": "2026-04-01T10:30:00Z",
  "token_usage": {
    "input": 18500,
    "output": 9800,
    "total": 28300
  },
  "repositories": [
    {
      "repo_url": "https://github.com/example/saas-starter",
      "stars": 4200,
      "forks": 890,
      "last_commit": "2026-03-28",
      "architecture_pattern": "App Router + Server Actions",
      "tech_stack": [
        "Next.js 15", "Prisma 6", "Stripe",
        "NextAuth 5", "Tailwind 4", "TypeScript 5.7"
      ],
      "health_score": 8.2,
      "notable_issues": [
        "Memory leak w middleware przy >1000 req/s (#412)",
        "Stripe webhook race condition (#389)"
      ],
      "code_patterns": [
        "Feature-sliced directory structure",
        "Server Actions dla mutacji",
        "Zod schemas wspoldzielone client/server"
      ],
      "bus_factor": 12,
      "license": "MIT",
      "ci_cd": "GitHub Actions (lint + test + deploy)",
      "test_coverage": "78%"
    }
  ],
  "cross_repo_patterns": [
    "4/5 repos uzywa Next.js App Router",
    "3/5 repos uzywa Prisma jako ORM",
    "5/5 repos ma oddzielny /lib dla logiki biznesowej",
    "4/5 repos uzywa Stripe do platnosci"
  ],
  "recommendations": [
    "Adoptuj pattern feature-sliced directories",
    "Uzyj Server Actions zamiast API routes dla mutacji"
  ],
  "risks": [
    "Middleware performance issues przy high-traffic (3/5 repos)",
    "NextAuth v5 migration path niekompletny (2/5 repos na v4)"
  ],
  "gaps": [
    "Brak repos z multi-tenant architecture i >1000 stars",
    "Brak danych o performance >10K concurrent users"
  ],
  "freshness": "2026-Q1"
}
```

### Kluczowe pola raportu

| Pole | Opis | Wymagane? |
|------|------|-----------|
| `agent_id` | Zawsze "R-05" | TAK |
| `repositories` | Tablica TOP 5 repozytoriow z pelna analiza | TAK |
| `health_score` | 0-10 -- ogolna ocena zdrowia repo | TAK |
| `cross_repo_patterns` | Wzorce powtarzajace sie miedzy repos | TAK |
| `code_patterns` | Konkretne wzorce kodu w kazdym repo | TAK |
| `notable_issues` | Kluczowe Issues z numerami | TAK |
| `recommendations` | Rekomendacje z uzasadnieniem | TAK |
| `risks` | Zidentyfikowane ryzyka | TAK |
| `gaps` | Luki w danych -- czego NIE znaleziono | TAK |

**Pole `cross_repo_patterns` jest unikalne dla R-05.** Zaden inny researcher nie dostarcza informacji o tym, jakie wzorce powtarzaja sie miedzy wieloma repozytoriami. To esencja wartosci Researchera GitHub -- nie "co robi jedno repo", ale "co robia WSZYSTKIE najlepsze repos".

> **CZY WIESZ, ZE...?**
> Pole `health_score` to nie subiektywna ocena. Ma scisla formule: Stars (waga 10%) + Last Commit (20%) + Issues Activity (15%) + PR Responsiveness (15%) + Contributors (10%) + License (10%) + Tests (10%) + README Quality (10%) = 100%. Kazda metryka jest normalizowana do skali 0-10. Repozytorium z perfect health score 10.0 jest niezwykle rzadkie -- typowe "dobre" repo dostaje 7-8.

---

## 5. Czego Researcher GitHub NIE robi

Rownie wazne jak obowiazki sa **jawne wykluczenia**. Researcher GitHub ma scisle ograniczony zakres -- i to celowo.

### 5.1 NIE kopiuje kodu do projektu

Researcher GitHub ZNAJDUJE dzialajacy kod i go ANALIZUJE, ale **nigdy nie kopiuje go do projektu**. To rola Builderow (Backend Builder, Frontend Builder, Feature Developer). Researcher dostarcza referencje -- Builder decyduje, co i jak zaadaptowac.

### 5.2 NIE uruchamia kodu

Researcher GitHub nie ma dostepu do narzedzia Bash. Nie moze uruchomic `npm install`, `npm test`, `docker compose up`. Nie moze zweryfikowac, czy kod DZIALA -- moze tylko przeczytac i OCENIC jego strukture. Weryfikacja runtime to rola QA Engineer.

### 5.3 NIE ocenia estetyki

Wyglad interfejsu to domena **Researcher UX** (R-02). Researcher GitHub analizuje ARCHITEKTURE kodu, nie to, czy komponent Button jest ladny. Jesli repozytorium ma piekny landing page, ale fatalna architekture -- R-05 zignoruje wyglad i skoncentruje sie na kodzie.

### 5.4 NIE podejmuje decyzji

Researcher GitHub **rekomenduje**, ale nie **decyduje**. Ostateczna decyzja nalezy do Orkiestratora lub Analityka. Raport "TOP 5 repos" to dane wejsciowe do decyzji, nie decyzja sama w sobie.

### 5.5 NIE przeszukuje zrodel innych researcherow

Reddit to domena R-03. X/Twitter to domena R-04. Blogi techniczne to domena R-01. **Kazdy researcher ma swoj teren.** Researcher GitHub nie czyta postow na Reddicie o repozytorium -- czyta SAMO repozytorium.

> **UWAGA!**
> Najczestszym bledem przy projektowaniu Researchera GitHub jest danie mu mozliwosci Write lub Edit. To LAMANIE fundamentalnej zasady -- agent badawczy NIE MOZE modyfikowac srodowiska. Researcher GitHub z dostepem do Write moglby "przypadkowo" zaczac kopiowac kod z obcych repozytoriow do projektu -- bez code review, bez testow, bez zrozumienia kontekstu. READ-ONLY to nie ograniczenie -- to zabezpieczenie.

---

## 6. Model i Koszt -- Dlaczego Haiku, ale najwyzszy load?

### 6.1 Claude Haiku -- ekonomia skali

Researcher GitHub uzywa **Claude Haiku** -- najtanszego modelu w ofercie Anthropic:

| Model | Input (per 1M tokenow) | Output (per 1M tokenow) | Zastosowanie |
|-------|------------------------|------------------------|--------------|
| Claude Opus | $15.00 | $75.00 | Orkiestrator, strategia |
| Claude Sonnet | $3.00 | $15.00 | Buildery, krytyka |
| **Claude Haiku** | **$0.80** | **$4.00** | **Research, QA** |

### 6.2 Najwyzszy load wsrod researcherow

Researcher GitHub ma load **55/100** -- najwyzszy wsrod wszystkich szesciu researcherow, na rowni z Researcher Tech. Dlaczego?

**Analiza kodu jest token-heavy.** Przeczytanie package.json, przeanalizowanie struktury katalogow, przetworzenie README, sprawdzenie Issues i PR-ow -- to duzo wiecej tekstu niz przeczytanie 10 tweetow (X Researcher, load 45) czy 10 postow na Reddicie (Reddit Researcher, load 50).

| Researcher | Load | Powod |
|-----------|------|-------|
| Tech (R-01) | 55 | Dlugie dokumentacje, benchmarki |
| UX (R-02) | 50 | Opisy designow, specyfikacje |
| Reddit (R-03) | 50 | Watki dyskusyjne, komentarze |
| X (R-04) | 45 | Krotkie posty, mniej tokenow |
| **GitHub (R-05)** | **55** | **Kod zrodlowy, Issues, PR-y** |
| Forums (R-06) | 50 | Artykuly, odpowiedzi |

### 6.3 Koszt typowego zadania

```
Typowe zadanie Researchera GitHub:
  Input: ~18,500 tokenow | Output: ~9,800 tokenow | Total: ~28,300

  Haiku:  $0.054 per zadanie
  Opus:   $1.01 per zadanie
  OSZCZEDNOSC: ~$0.96 (94.7%) per zadanie
```

Przy 20 zadaniach dziennie: Haiku = $1.08/dzien, Opus = $20.20/dzien. Roznica w skali miesiaca: **~$574**.

### 6.4 Kiedy Haiku moze byc niewystarczajacy?

Bardzo duze repozytoria (>100 plikow), zlozony reasoning o architekturze lub analiza subtelnych code smell -- wtedy mozna **upgrade'owac do Sonnet** dla pojedynczego zadania, zachowujac Haiku jako default.

> **UWAGA!**
> Load 55 nie oznacza, ze Researcher GitHub jest "przeciazony". Load to miara intensywnosci obliczeniowej zadania, nie obciazenia agenta. Load 55 oznacza, ze zadanie GitHub research zuzywa 55% typowego budzetu tokenowego na agenta. Przy Haiku to nadal tanie -- $0.05 per zadanie. Ale przy Opus byloby to ponad dolar -- i tu ekonomia Haiku swietnie sie sprawdza.

---

## 7. Narzedzia -- Arsenal Archeologa Kodu

Researcher GitHub ma dokladnie **piec narzedzi**. Wszystkie sa READ-ONLY. Zadne nie pozwala na modyfikacje.

### 7.1 WebSearch -- Wyszukiwanie repozytoriow

**Kluczowe narzedzie do odkrywania repozytoriow.** Researcher GitHub formuluje precyzyjne zapytania, np. `"Next.js SaaS boilerplate stars:>100 pushed:>2025-01-01"`. Zle zapytanie: `"best GitHub repo"` (zbyt ogolne, zbyt wiele szumu).

### 7.2 WebFetch -- Czytanie zawartosci repozytorium

**NAJCZESCIEJ uzywane narzedzie R-05.** Pobiera pelna zawartosc: README.md, package.json, strukture katalogow, .github/workflows, Issues i PR-y. Wiekszosc czasu agenta to czytanie tresci repozytoriow, nie szukanie ich.

### 7.3 Read -- Czytanie plikow lokalnych

Czytanie MANIFEST.md, aktualnego kodu projektu (porownanie z referencjami), wynikow innych agentow przekazanych przez Orkiestratora.

### 7.4 Grep -- Wyszukiwanie wzorcow

Przeszukiwanie plikow za pomoca wyrazen regularnych: importy, API, konfiguracje, nazwy pakietow.

### 7.5 Glob -- Wyszukiwanie plikow

Szybkie wyszukiwanie plikow po nazwie: `**/*.tsx`, `**/*.config.js`, `*.test.ts`.

### Narzedzia, ktorych Researcher GitHub NIE ma

| Narzedzie | Powod braku |
|-----------|-------------|
| Write | Researcher NIE tworzy plikow -- tylko raportuje |
| Edit | Researcher NIE modyfikuje kodu |
| Bash | Researcher NIE uruchamia komend (npm, git, docker) |
| Agent | Researcher NIE deleguje do innych agentow |

Researcher GitHub jest **calkowicie read-only**. Moze czytac caly internet i caly lokalny system plikow, ale nie moze zmienic ani jednego bajtu. To fundamentalna zasada bezpieczenstwa -- **Principle of Least Privilege**.

> **CZY WIESZ, ZE...?**
> Roznica miedzy Researcherem GitHub a Researcherem Tech w kwestii narzedzi jest subtelna, ale wazna. Oba maja TEN SAM zestaw narzedzi (WebSearch, WebFetch, Read, Grep, Glob). Roznica lezy w tym, JAK ich uzywaja. Tech uzywa WebSearch do szukania dokumentacji i benchmarkow. GitHub uzywa WebSearch do szukania REPOZYTORIOW. Tech uzywa WebFetch do czytania artykulow. GitHub uzywa WebFetch do czytania KODU ZRODLOWEGO. Te same narzedzia, rozne cele -- jak ten sam skalpel w rekach chirurga i rzezbiarza.

---

## 8. Workflow -- Od zapytania do analizy repo

### 8.1 Cykl zycia zadania badawczego

```
Krok 1: ODBIORCA ZAPYTANIA
  Orkiestrator --> Researcher GitHub
  Input: {"question": "Znajdz top repos dla SaaS boilerplate"}
  TYLKO pytanie. Brak kontekstu projektu. Narrow Context.

Krok 2: FORMULOWANIE ZAPYTAN
  Researcher GitHub rozbija pytanie na pod-zapytania:
  - "SaaS boilerplate Next.js stars:>100 2025-2026"
  - "SaaS starter kit TypeScript Stripe open-source"
  - "multi-tenant SaaS architecture GitHub production"

Krok 3: WYSZUKIWANIE (WebSearch)
  Rownolegle zapytania do WebSearch
  Zbieranie URLi repozytoriow, stars, opisow

Krok 4: FILTROWANIE WEDLUG METRYK ZDROWIA
  Odrzuc repos z:
  - Stars < 100
  - Ostatni commit > 2 lata
  - Brak licencji
  - Brak README
  Zostaw TOP 10 kandydatow

Krok 5: GLEBOKA ANALIZA TOP 5 (WebFetch)
  Dla kazdego z 5 najlepszych:
  - Przeczytaj README
  - Przeczytaj package.json
  - Przeanalizuj strukture katalogow
  - Sprawdz .github/workflows
  - Przejrzyj ostatnie Issues (top 10)
  - Przejrzyj ostatnie PR-y (top 5)

Krok 6: EKSTRAKCJA WZORCOW
  Porownaj 5 repos:
  - Jakie technologie sie powtarzaja?
  - Jakie wzorce architektury dominuja?
  - Jakie problemy zglaszaja uzytkownicy?

Krok 7: OCENA ZDROWIA
  Dla kazdego repo: health_score 0-10
  Bazowany na 8 metrykach

Krok 8: IDENTYFIKACJA LUK
  Co NIE zostalo znalezione?
  Gdzie dane sa niepelne?

Krok 9: FORMATOWANIE RAPORTU
  Structured JSON output
  Wszystkie pola wymagane

Krok 10: DOSTARCZENIE
  Researcher GitHub --> Research Critic
  (lub Researcher GitHub --> Orkiestrator, jesli brak Critica)
```

### 8.2 Interakcja z Research Critic

**Research Critic** waliduje wyniki wedlug 5 kryteriow: Completeness (25%), Accuracy (25%), Relevance (20%), Freshness (20%), Actionability (10%). **Score ponizej 6/10 = REWIZJA** -- raport wraca do Researchera z notatkami, co poprawic.

### 8.3 Typowy czas i koszt

| Metryka | Wartosc |
|---------|---------|
| Sredni czas wykonania | 45-120 sekund |
| Sredni koszt per zadanie | $0.04-0.07 |
| Typowa liczba WebSearch calls | 4-6 |
| Typowa liczba WebFetch calls | 8-15 |

> **UWAGA!**
> Researcher GitHub zuzywa WIECEJ WebFetch calls niz jakikolwiek inny researcher. Powod: czytanie kodu zrodlowego wymaga pobrania wielu plikow z jednego repozytorium (README + package.json + struktura + CI config + Issues). Researcher X moze przeczytac 10 tweetow jednym WebFetch. Researcher GitHub potrzebuje 3-4 WebFetch calls na JEDNO repozytorium. To wyjasnia najwyzszy load (55) wsrod researcherow.

---

## 9. Researcher GitHub vs inne Researchery

### 9.1 Co kazdy researcher dostarcza -- mapa perspektyw

| Researcher | Oznaczenie | Perspektywa | Pytanie kluczowe | Typ outputu |
|-----------|-----------|-------------|-------------------|-------------|
| Tech | R-01 | TEORIA + DOCS | "Co mowi PRODUCENT?" | Porownanie 3+ opcji z benchmarkami |
| UX | R-02 | DESIGN + ESTETYKA | "Jak powinno WYGLADAC?" | Mood board 5+ referencji |
| Reddit | R-03 | OPINIE deweloperow | "Co NAPRAWDE mysla devs?" | TOP 10 insightow z linkami |
| X | R-04 | TRENDY + NOWOSCI | "Co jest NOWE?" | TOP 10 postow z kontekstem |
| **GitHub** | **R-05** | **DZIALAJACY KOD** | **"Jak INNI to zbudowali?"** | **TOP 5 repos z analiza** |
| Forums | R-06 | TUTORIALE + PULAPKI | "Jakie sa PULAPKI?" | TOP 10 z takeaways |

### 9.2 Pelna tabela porownawcza

| Wymiar | Tech | UX | Reddit | X | **GitHub** | Forums |
|--------|------|-----|--------|---|------------|--------|
| **Zrodla** | Docs, benchmarki | Dribbble, Behance | r/webdev, r/programming | X/Twitter | **Repozytoria OS** | SO, Dev.to |
| **Wiarygodnosc** | Wysoka | Srednia | Srednia-Niska | Niska | **Bardzo wysoka (kod)** | Srednia |
| **Aktualnosc** | Zmienna | Aktualna | Aktualna | Najaktualniejsza | **Zmienna (sprawdz commity)** | Zmienna |
| **Unikalnosc** | Fakty techniczne | Trendy design | Glos spolecznosci | Wczesne sygnaly | **Dzialajace implementacje** | Rozwiazania problemow |
| **Load** | 55 | 50 | 50 | 45 | **55** | 50 |
| **WebFetch calls** | 3-6 | 3-5 | 2-4 | 2-4 | **8-15** | 3-6 |
| **Ryzyko** | Vendor bias | Trend chasing | Mob mentality | Hype cycle | **Star worship** | Outdated answers |

### 9.3 Synergie miedzy researcherami

Researchery NIE komunikuja sie bezposrednio. Ale ich wyniki sa **komplementarne** i weryfikuja sie wzajemnie:

```
Researcher Tech mowi: "LangGraph jest najlepszy do workflow"
Researcher GitHub mowi: "70% top repos w React uzywa LangGraph"
  --> SILNE POTWIERDZENIE: teoria zgadza sie z praktyka

Researcher Tech mowi: "CrewAI jest najprostszy"
Researcher GitHub mowi: "4/5 repos CrewAI ma >50 otwartych Issues"
  --> SYGNAL OSTRZEGAWCZY: prostota nie znaczy brak problemow

Researcher Reddit mowi: "Deweloperzy polecaja Prisma"
Researcher GitHub mowi: "Top 5 SaaS boilerplates: 3/5 uzywa Prisma"
  --> KORELACJA: opinia spolecznosci potwierdzona adopcja

Researcher X mowi: "Drizzle ORM to nowy trend"
Researcher GitHub mowi: "0/5 top repos uzywa Drizzle"
  --> ROZBIEZNOSC: hype nie przelozyl sie na adopcje
```

To **Research Critic** i **Syntetyk** wykrywaja te korelacje i rozbieznosci. Researchery sa celowo izolowane -- kazdy patrzy swoimi oczami, bez wiedzy o tym, co znalazl inny agent.

> **CZY WIESZ, ZE...?**
> Researcher GitHub jest jedynym researcherem, ktory dostarcza **dowody w formie kodu** -- nie opinie, nie opisy, nie trendy, ale DZIALAJACE IMPLEMENTACJE. Kiedy Syntetyk sklada raporty od 6 researcherow, raport GitHub jest czesto "kotwica" calej analizy -- bo kod albo dziala, albo nie. Opinie moga sie roznic. Kod jest obiektywny.

---

## 10. Anty-wzorce -- Czego unikac

### 10.1 Star Worship (Kult Gwiazdek)

**Objaw:** Researcher GitHub wybiera repozytoria WYLACZNIE na podstawie liczby gwiazdek, ignorujac inne metryki.
**Skutek:** Rekomendowanie porzuconych lub niezrownowazonych repozytoriow tylko dlatego, ze maja duzo stars.

```
ZLE:
  Repo A: 15,000 stars, ostatni commit 2023, 400 otwartych Issues
  Repo B: 800 stars, ostatni commit wczoraj, 12 otwartych Issues
  Wybor: Repo A (bo wiecej stars)

DOBRZE:
  Repo A: health_score 3.2 (stars high, ale porzucone)
  Repo B: health_score 8.1 (stars moderate, ale zdrowe)
  Wybor: Repo B (bo zdrowsze)
```

**Rozwiazanie:** Stars to JEDNA z osmiu metryk. Health score jest wazniejszy niz stars count.

### 10.2 Blind Copy (Slepe Kopiowanie)

**Objaw:** Raport rekomenduje "skopiuj architekture z repo X" bez analizy DLACZEGO ta architektura istnieje i CZY pasuje do kontekstu projektu.
**Skutek:** Kopiowanie kodu bez zrozumienia kontekstu -- **najgorszy anty-wzorzec** w calej architekturze.

```
ZLE:
  "Repo X uzywa mikrouslug, wiec my tez powinnismy."
  (Repo X ma 50 deweloperow. Nasz projekt ma 2.)

DOBRZE:
  "Repo X uzywa mikrouslug (50 kontrybutorzy, skala enterprise).
   Dla malego zespolu (2-5 osob) monorepo jest bardziej adekwatne.
   Zobacz Repo Y (podobna skala, monorepo pattern)."
```

**Rozwiazanie:** Kazda rekomendacja z kontekstem: DLA KOGO ta architektura dziala i DLACZEGO.

> **UWAGA!**
> "Kopiowanie kodu bez zrozumienia kontekstu" to **najniebezpieczniejszy anty-wzorzec** Researchera GitHub. Repo z 10,000 gwiazdek zostalo zbudowane przez zespol 30 osob z budzetem $5M. Kopiowanie ich architektury do projektu jednego dewelopera to jak kopiowanie planu wiezowca do budowy domku jednorodzinnego. Researcher GitHub MUSI dostarczac KONTEKST -- kto to zbudowal, jak duzy zespol, jaka skala -- nie tylko "ten kod jest fajny".

### 10.3 Abandoned Repo Adoption (Adopcja Porzuconego Repo)

**Objaw:** Rekomendowanie repozytorium, ktore nie mialo commitow od ponad 2 lat.
**Skutek:** Projekt bazuje na nieaktualnych wzorcach, nieaktualnych zaleznosciach i nielatanych lukach bezpieczenstwa.

```
ZLE:
  Repo: 3000 stars, ale ostatni commit: 2023-11-15
  Zaleznosci: React 17, Next.js 12, Node 16
  Rekomendacja: "Solidne repo, duzo stars"

DOBRZE:
  Repo: 3000 stars, ale ostatni commit: 2023-11-15
  Oznaczenie: ABANDONED (>2 lata bez commitow)
  Uwaga: "Zaleznosci 3 major versions za aktualnymi.
          16 known CVE w outdated dependencies.
          NIE REKOMENDOWANE do adopcji."
```

**Rozwiazanie:** Data ostatniego commitu > 2 lata = flaguj jako ABANDONED. > 6 miesiecy = INACTIVE. Tylko repos z commitem < 6 miesiecy sa bezpieczne do rekomendacji.

### 10.4 README Deception (Zwodnicze README)

**Objaw:** Ocenianie repozytorium WYLACZNIE na podstawie README, bez sprawdzenia faktycznego kodu i Issues.
**Skutek:** Rekomendowanie repo z pieknym README, ale fatalnym kodem i 200 otwartymi bugami.

```
ZLE:
  README: "Production-ready, fully tested, scalable SaaS kit"
  Realnosc: 0 testow, 0 CI/CD, 180 otwartych Issues, 1 kontrybutor
  Raport: "Swietne repo, README obiecuje production-readiness"

DOBRZE:
  README: "Production-ready, fully tested, scalable SaaS kit"
  Weryfikacja: test coverage 0%, brak .github/workflows/,
               180 otwartych Issues, bus factor = 1
  Raport: "README zwodnicze. Deklarowana production-readiness
           nie potwierdzona przez testy, CI/CD ani spolecznosc."
```

**Rozwiazanie:** ZAWSZE weryfikuj twierdzenia README przez sprawdzenie kodu, testow, CI/CD i Issues. README to hipoteza -- Issues to dowod.

### 10.5 Single Repo Fixation (Fiksacja na Jednym Repo)

**Objaw:** Cala analiza oparta na JEDNYM repozytorium, bez porownania z alternatywami.
**Skutek:** Brak perspektywy, brak alternatyw, ryzyko confirmation bias.

```
ZLE:
  "Znalazlem repo X. Jest idealne. Rekomenduje adopcje."
  (Bez sprawdzenia 4 alternatyw)

DOBRZE:
  "Przeanalizowalem 5 repos. Repo X jest najlepsze pod wzgledem
   architektury (score 8.2). Repo Y ma lepszy test coverage (92%).
   Repo Z ma aktywniejsza spolecznosc (25 kontrybutorzy).
   Rekomenduje architekture z X, podejscie do testow z Y."
```

**Rozwiazanie:** ZAWSZE minimum 5 repozytoriow w analizie. Czerpanie z wielu zrodel -- architektura z jednego, testy z drugiego, CI/CD z trzeciego.

---

## 11. Najlepsze Praktyki 2025-2026

### 11.1 Zasada "Stars >100 jako minimum"

Nie trac czasu na repozytoria ponizej 100 gwiazdek. To zazwyczaj projekty weekendowe, prototypy studenckie lub opuszczone eksperymenty. Wyjatek: nowe repos od znanych maintainerow (ale wtedy sprawdz ich inne projekty).

### 11.2 Zasada "Data commitu >2 lata = abandoned"

Dwa lata bez commita w swiecie technologii to cala epoka. Framework, ktory wygladal swietnie w 2023, moze byc kompletnie nieaktualny w 2026. Zawsze sprawdz date ostatniego commita ZANIM zaczniesz gleboka analize.

### 11.3 Zasada "Czytaj Issues zanim adoptujesz"

Issues to **wywiad z uzytkownikami** repozytorium. Nie musisz sam testowac kodu -- uzytkownicy juz to zrobili i zglasili problemy. 10 minut czytania Issues moze zaoszczedzic 10 godzin debugowania.

### 11.4 Cross-Repo Pattern Mining

Najcenniejszy output Researchera GitHub to nie analiza JEDNEGO repo, ale **wzorce miedzy wieloma repos**:

```
Analiza 5 top SaaS boilerplates (marzec 2026):

| Wzorzec          | Repo 1 | Repo 2 | Repo 3 | Repo 4 | Repo 5 | Adopcja |
|------------------|--------|--------|--------|--------|--------|---------|
| Next.js App Router | TAK  | TAK    | NIE    | TAK    | TAK    | 80%     |
| Prisma ORM       | TAK    | NIE    | TAK    | TAK    | NIE    | 60%     |
| Stripe           | TAK    | TAK    | TAK    | TAK    | TAK    | 100%    |
| NextAuth/Auth.js | TAK    | TAK    | TAK    | NIE    | TAK    | 80%     |
| Tailwind CSS     | TAK    | TAK    | TAK    | TAK    | TAK    | 100%    |
| Server Actions   | TAK    | TAK    | NIE    | TAK    | NIE    | 60%     |

Wniosek: Next.js + Tailwind + Stripe to "holy trinity" SaaS w 2026.
```

### 11.5 Health Score jako filtr, nie wyrok

Health score jest narzedziem **filtrowania**, nie ostateczna ocena. Repo z health score 6.0 moze miec swietna architekture (ktora warto analizowac), mimo slabej spolecznosci. Health score pomaga odrzucic oczywiscie zle repos, nie wybrac najlepsze.

### 11.6 Dependency Analysis

Sprawdzaj nie tylko JAKIE pakiety uzywa repo, ale tez ICH zdrowie:

```
Zlota regula dependency analysis:
  1. Czy dependency jest aktywnie utrzymywane?
  2. Ile ma znanych CVE?
  3. Jaki jest bus factor dependency?
  4. Czy sa alternatywy z wieksza adopcja?
  5. Czy uzywana wersja jest aktualna?
```

### 11.7 Bus Factor Assessment

Bus factor = "ilu kontrybutorzy musi odejsc, zeby projekt umierl". Minimalne bezpieczenstwo to bus factor >= 3.

```
Bus Factor Evaluation:
  1 kontrybutor  --> KRYTYCZNE ryzyko
  2 kontrybutory --> Wysokie ryzyko
  3-5            --> Akceptowalne
  6-20           --> Zdrowe
  20+            --> Dojrzaly open-source
```

> **CZY WIESZ, ZE...?**
> Termin "bus factor" pochodzi od pytania "ilu czlonkow zespolu musi wpasc pod autobus, zeby projekt umierl?". W kontekscie open-source, bus factor 1 oznacza, ze JEDNA osoba odchodzaca (zmiana pracy, wypalenie, utrata zainteresowania) zabija caly projekt. Researcher GitHub MUSI raportowac bus factor -- bo rekomendowanie adopcji repo z bus factor 1 to rekomendowanie ryzyka, ze caly twoj projekt stanie, kiedy tamten maintainer zniknie.

---

## 12. Podsumowanie + Quick Reference Card

### 12.1 Kluczowe wnioski

Researcher GitHub (R-05) to **archeolog dzialajacego kodu** w architekturze Gold Standard 2026. Jego unikalna wartosc:

1. **DZIALAJACY KOD jako referencje** -- nie teorie, nie opinie, nie trendy, ale realne implementacje
2. **Cross-repo patterns** -- wzorce powtarzajace sie miedzy najlepszymi repozytoriami
3. **Health assessment** -- obiektywna ocena zdrowia repozytorium (8 metryk)
4. **Issue intelligence** -- wiedza o problemach produkcyjnych z pierwszej reki
5. **Architecture patterns** -- jak NAPRAWDE organizowany jest kod w najlepszych projektach

GitHub daje **REALNY kod, nie teorie**. Dokumentacja mowi, co POWINNO dzialac. Reddit mowi, co LUDZIE mysla. X mowi, co jest NOWE. A GitHub mowi, co FAKTYCZNIE DZIALA w produkcji.

### 12.2 Quick Reference Card

```
+===============================================+
|        RESEARCHER GITHUB (R-05)               |
|        Quick Reference Card                   |
+===============================================+
|                                               |
|  WARSTWA:    RESEARCH (Faza 1)                |
|  MODEL:      Claude Haiku                     |
|  KOSZT:      $0.80/$4.00 per 1M tokenow      |
|  LOAD:       55/100 (NAJWYZSZY)               |
|                                               |
|  NARZEDZIA:  WebSearch | WebFetch | Read      |
|              Grep | Glob (READ-ONLY)          |
|                                               |
|  BRAK:       Write | Edit | Bash | Agent      |
|                                               |
|  INPUT:      Pytanie badawcze (narrow context)|
|  OUTPUT:     TOP 5 repos z pelna analiza JSON |
|                                               |
|  SYSTEM PROMPT:                               |
|  "Jestes GitHub Researcher.                   |
|   Szukaj repo: stars, forks, architektura,    |
|   issues. Output: TOP 5 z analiza."           |
|                                               |
|  METRYKI ZDROWIA:                             |
|  - Stars > 100 (minimum)                      |
|  - Ostatni commit < 6 mies.                   |
|  - Issues: aktywny triage                     |
|  - PRs: mergowane regularnie                  |
|  - Kontrybutorzy >= 5                         |
|  - Licencja: MIT/Apache                       |
|  - Testy: CI/CD passing                       |
|  - README: szczegolowe + przyklady            |
|                                               |
|  RAPORTUJE DO: Research Critic lub            |
|                Orkiestrator                    |
|                                               |
|  GATE:       Critic score <6/10 = REWIZJA     |
|                                               |
|  ZASADY:                                      |
|  - Stars >100 jako minimum                    |
|  - Data commitu >2 lata = ABANDONED           |
|  - Czytaj Issues ZANIM adoptujesz             |
|  - TOP 5 repos (nigdy mniej)                  |
|  - Cross-repo patterns (OBOWIAZKOWE)          |
|  - Health score dla kazdego repo              |
|  - NIE kopiuj kodu -- ANALIZUJ                |
|  - NIE podejmuj decyzji -- REKOMENDUJ         |
|                                               |
|  ANTY-WZORCE:                                 |
|  x Star Worship (gwiazdki = jakosc)           |
|  x Blind Copy (kopiowanie bez kontekstu)      |
|  x Abandoned Repo (>2 lata = martwe)          |
|  x README Deception (ladne README != dobry    |
|    kod)                                       |
|  x Single Repo Fixation (1 repo = bias)       |
|                                               |
|  KLUCZOWE CYTATY:                             |
|  "GitHub daje REALNY kod, nie teorie."         |
|  "Stars >100 jako minimum."                   |
|  "Data commitu >2 lata = abandoned."          |
|  "Czytaj Issues zanim adoptujesz."            |
|                                               |
+===============================================+
```

### 12.3 Slownik pojec (Glossary)

| Termin | Definicja |
|--------|-----------|
| **Bus Factor** | Liczba kontrybutorzy, ktorzy musza odejsc, zeby projekt umierl |
| **Cross-Repo Pattern** | Wzorzec powtarzajacy sie w wielu repozytoriach (np. "4/5 uzywa Prisma") |
| **Health Score** | Ocena zdrowia repozytorium (0-10) bazowana na 8 metrykach |
| **Narrow Context Principle** | Zasada, ze researcher dostaje TYLKO pytanie, bez kontekstu projektu |
| **READ-ONLY Agent** | Agent, ktory moze czytac, ale nie moze modyfikowac srodowiska |
| **Repository Discovery** | Proces systematycznego wyszukiwania repozytoriow referencyjnych |
| **Star Worship** | Anty-wzorzec: ocenianie repo wylacznie po liczbie gwiazdek |
| **Deep Research Belt** | Pas badawczy -- 6 rownoleglych researcherow w architekturze Gold Standard |
| **Research Critic** | Agent bramkowy walidujacy raporty researcherow (score < 6/10 = rewizja) |
| **Principle of Least Privilege** | Zasada minimalnych uprawnien -- agent dostaje tylko narzedzia niezbedne |
| **Feature-Sliced Architecture** | Organizacja kodu wg funkcjonalnosci, nie wg typow plikow |
| **CI/CD Pipeline** | Zautomatyzowany proces budowania, testowania i wdrazania kodu |
| **Abandoned Repo** | Repozytorium bez commitow od >2 lat -- potencjalnie porzucone |
| **Confidence Score** | Ocena pewnosci znaleziska (0.0-1.0) bazowana na jakosci zrodel |

---

*Dokument przygotowany na podstawie Gold Standard Agent Architecture 2026, AGENT_TEAMS_CONFIGURATOR v9.0, analiz ALPHA/OMEGA Team oraz badan multi-agent systems 2025-2026. Wszystkie dane o cenach i statystykach aktualne na marzec-kwiecien 2026.*

---

## PROMPT DO PREZENTACJI WIDEO (AI Presenter)

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz **5-7 minutowa prezentacje wideo** o Researcherze GitHub (R-05) -- agencie AI wyspecjalizowanym w analizie repozytoriow open-source w architekturze wieloagentowej Gold Standard 2026.

**Hook otwierajacy (0:00-0:30):** "Documentation tells you what should work. GitHub tells you what ACTUALLY works. Dokumentacja mowi ci, co POWINNO dzialac. GitHub mowi ci, co NAPRAWDE dziala -- bo mozesz to przeczytac linia po linii. A agent, ktory przeszukuje te miliony repozytoriow, to Researcher GitHub."

**Struktura prezentacji:**

1. **(0:30-1:30) Problem: Teoria vs Rzeczywistosc.** Dokumentacja obiecuje, ze framework X jest szybki i niezawodny. Ale w Issues na GitHubie 200 osob zglasza memory leaki. Kto mowi prawde? Kod mowi prawde. Pokaz roznice miedzy "oficjalna narracja" a "realnosc produkcyjna".

2. **(1:30-2:30) Kim jest R-05?** Archeolog dzialajacego kodu. Warstwa RESEARCH, Claude Haiku, load 55/100. Narzedzia READ-ONLY. Szuka TOP 5 repozytoriow, analizuje architekture, ocenia zdrowie, wyodrebnia wzorce. Animacja: agent "nurkujacy" pod powierzchnie README do kodu zrodlowego.

3. **(2:30-3:30) Framework oceny zdrowia repo.** 8 metryk: Stars, Last Commit, Issues, PRs, Contributors, License, Tests, README. Animacja: dashboard z metrami zdrowia dla przykladowego repo -- zielone/zolte/czerwone wskazniki. Pokaz repo z 15,000 stars, ale health score 3.2 (porzucone).

4. **(3:30-4:30) Ekstrakcja wzorcow architektury.** Cross-repo pattern mining: "4/5 uzywa Next.js, 3/5 uzywa Prisma, 5/5 ma /lib katalog." Animacja: 5 repos obok siebie z podswietlonymi wspolnymi wzorcami. To wglad, ktorego zaden inny researcher nie dostarcza.

5. **(4:30-5:30) 5 anty-wzorcow.** Star Worship, Blind Copy, Abandoned Repo, README Deception, Single Repo Fixation. Kazdy z animowanym przykladem "ZLE vs DOBRZE". Kluczowe: "Kopiowanie kodu bez zrozumienia kontekstu to najgorszy grzech."

6. **(5:30-6:30) Synergie z innymi researcherami.** Pokaz jak raporty 6 researcherow skladaja sie w pelny obraz. Tech mowi "uzyj X", GitHub potwierdza "70% top repos uzywa X", Reddit mowi "devs polecaja X" = silna rekomendacja. Animacja: puzzle -- kazdy researcher to jeden element.

7. **(6:30-7:00) Zamkniecie + Quick Reference Card.** "GitHub daje REALNY kod, nie teorie." Podsumowanie: Stars >100, commit <6 mies., czytaj Issues, TOP 5 repos, cross-repo patterns. Ekran koncowy z Quick Reference Card.

**Wizualizacja:** Ciemny motyw z akcentami GitHub green (#238636). Animacje repozytoriow jako "archeologiczne wykopaliska" -- warstwy README (powierzchnia), kod (srodek), Issues (glebokosc). Monospacjowy font dla kodu, sans-serif dla tekstu. Ton: profesjonalny, przystepny, z analogiami ze swiata realnego.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz **pionowa infografike** o Researcherze GitHub (R-05) w architekturze wieloagentowej Gold Standard 2026.

**Wymiary:** 1080 x 3400 px (format do scrollowania / social media / print).

**Sekcje od gory do dolu:**

1. **HEADER (200px):** Tytul "RESEARCHER GITHUB (R-05)" w duzym foncie. Podtytul: "Archeolog Dzialajacego Kodu". Badge: "RESEARCH Layer | Claude Haiku | Load 55/100". Tlo: ciemny gradient (#0d1117 --> #161b22, kolory GitHub dark mode).

2. **ANATOMIA REPOZYTORIUM (500px):** Wizualizacja "rentgenu" repozytorium GitHub -- warstwy jak przekroj geologiczny:
   - Warstwa 1 (powierzchnia): README.md -- "Fasada" (jasny kolor)
   - Warstwa 2: package.json -- "Prawdziwy Stack" (sredni kolor)
   - Warstwa 3: /src struktura -- "Architektura" (ciemniejszy)
   - Warstwa 4: .github/workflows -- "Dojrzalosc CI/CD"
   - Warstwa 5 (najglebiej): Issues + PRs -- "Prawda o Produkcji" (najciemniejszy, z czerwonymi akcentami)
   Strzalka od gory do dolu z napisem: "Researcher GitHub kopie W GLAB"

3. **DASHBOARD METRYK ZDROWIA (500px):** 8 kafelkow w siatce 4x2, kazdy z ikona, nazwa metryki, "dobry sygnal" (zielony) i "zly sygnal" (czerwony):
   Stars | Last Commit | Issues | PRs | Contributors | License | Tests | README
   Pod siatka: przykladowy Health Score = 8.2/10 z bar chart.

4. **CROSS-REPO PATTERNS (400px):** Wizualizacja porownania 5 repos:
   Tabela z kolorowymi checkmarks (zielone) i X (czerwone):
   Next.js: 4/5, Prisma: 3/5, Stripe: 5/5, Tailwind: 5/5, Auth.js: 4/5
   Wniosek w zielonej ramce: "Next.js + Tailwind + Stripe = SaaS Holy Trinity 2026"

5. **POROWNANIE 6 RESEARCHEROW (400px):** Ikony 6 researcherow w rzedzie, kazdy z krotkim opisem perspektywy:
   Tech: "TEORIA" | UX: "DESIGN" | Reddit: "OPINIE" | X: "TRENDY" | **GitHub: "DZIALAJACY KOD"** (podswietlony zielonym) | Forums: "TUTORIALE"

6. **5 ANTY-WZORCOW (500px):** Pionowa lista z ikonami ostrzezen (zolte trojkaty):
   1. Star Worship -- "Gwiazdki != Jakosc"
   2. Blind Copy -- "Kopiowanie bez kontekstu"
   3. Abandoned Repo -- ">2 lata = martwe"
   4. README Deception -- "Ladne README != dobry kod"
   5. Single Repo Fixation -- "1 repo = bias"
   Kazdy z krotkim opisem i ikona "ZLE" (czerwona) vs "DOBRZE" (zielona).

7. **KLUCZOWY STAT (200px):** Duzy napis w centrum: **"GitHub daje REALNY kod, nie teorie."** Pod spodem: "70% top repos w React uzywa LangGraph | Top 5 SaaS: 4/5 na Next.js"
   Tlo: gradient GitHub green (#238636) --> dark.

8. **FOOTER (200px):** Quick Reference: Model, Load, Narzedzia, System Prompt. Logo: "Gold Standard Agent Architecture 2026". Kolorystyka: ciemny + GitHub green (#238636) + bialy tekst.

**Kolorystyka:** Ciemne tlo (#0d1117, #161b22) + GitHub green (#238636) + bialy tekst (#ffffff) + czerwony (#da3633) dla ostrzezen + zolty (#d29922) dla uwag. Estetyka GitHub Dark Mode. Typografia: JetBrains Mono dla kodu, Inter dla tekstu. Styl: minimalistyczny, techniczny, ikony Octicons.
