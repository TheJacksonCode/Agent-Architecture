# Researcher X / Twitter (R-04) -- Wywiadowca Trendow w Systemach Wieloagentowych

## Kompletny przewodnik po roli X/Twitter Research Agent w architekturze Gold Standard 2026

**Seria:** Architektura Agentow AI -- Role i Specjalizacje
**Numer roli:** R-04 (Research Layer)
**Model:** Claude Haiku ($0.80/$4.00 per 1M tokenow input/output)
**Warstwa:** RESEARCH (Faza 1) -- Deep Research Belt
**Obciazenie:** 45/100 (najnizsze wsrod researcherow)
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Kim jest Researcher X?

Wyobraz sobie korespondenta wojennego. Nie tego, ktory pisze ksiazki w zaciszu gabinetu, ale tego, ktory stoi na linii frontu -- w kurzu, halasie i chaosie. Informacje plyna do niego szybciej niz do kogokolwiek innego: eksplozja tu, ruch wojsk tam, nowa ofensywa za rogiem. Jego depesza dotrze do redakcji godziny przed oficjalnym komunikatem. Ale -- i to jest kluczowe "ale" -- w chaosie frontu latwiej o pomylke. Plotka staje sie "faktem", a pilnosc dostawy kusi, zeby wyslac depesza przed sprawdzeniem. Korespondent wojenny jest **najszybszy, ale ponosi najwyzsze ryzyko dezinformacji**.

Wyobraz sobie tez day-tradera na gieldzie. Siedzi przed czterema monitorami, sledzac kazdy ruch cen. Widzi sygnal -- gwaltowny wzrost obrotow na spolce biotechnologicznej. Czy to poczatek rajdu, czy falszywy alarm? Day-trader musi w ulamku sekundy odroznic **szum od sygnalu**. Jesli zareaguje na kazdy blip, straci majatek na prowizjach. Jesli zignoruje prawdziwy sygnal, przegapi okazje zycia. Sztuka polega na **filtracji** -- reagowaniu na to, co ma wartosc, i ignorowaniu reszty.

Wyobraz sobie wreszcie skautke modowa na pokazach haute couture. Siedzi w pierwszym rzedzie na Fashion Week w Mediolanie, widzac kolekcje, ktore pojawia sie w sklepach za 6-12 miesiecy. Widzi trend zanim ktokolwiek na ulicy go zauwazy. Ale **80% tego, co pojawia sie na wybiegu, nigdy nie trafia do masowej produkcji**. Skautka musi odroznic trend, ktory zmieni mode, od eksperymentu, ktory umrze po jednym sezonie.

Researcher X (oznaczenie R-04 w architekturze Gold Standard 2026) laczy cechy wszystkich trzech postaci. To X/Twitter Research Agent -- agent AI wyspecjalizowany w monitorowaniu platformy X (dawniej Twitter) w poszukiwaniu trendow technologicznych, reakcji na launche produktow, threadow technicznych i pozycji influencerow. Jego misja: wychwycic **najszybsze sygnaly** i dostarczyc je w formacie raportu -- ze swiadomoscia, ze X jest medium o **najwyzszym wskazniku szumu do sygnalu** ze wszystkich zrodel w systemie.

W systemie wieloagentowym Researcher X jest jednym z **maksymalnie szesciu rownoleglych researcherow** w "Deep Research Belt":

| Agent | Oznaczenie | Specjalizacja zrodlowa |
|-------|-----------|------------------------|
| Researcher Tech | R-01 | Dokumentacja, benchmarki, blogi techniczne |
| Researcher UX | R-02 | Dribbble, Behance, Awwwards, Mobbin |
| Researcher Reddit | R-03 | r/webdev, r/programming, r/reactjs, r/SaaS |
| **Researcher X** | **R-04** | **X/Twitter -- trendy, launche, influencerzy** |
| Researcher GitHub | R-05 | Repozytoria open-source, architektura, Issues |
| Researcher Forums | R-06 | StackOverflow, Dev.to, Medium, Hacker News |

Wsrod tej szostki Researcher X pelni unikalna role: jest **najszybszy**, ale **najmniej wiarygodny**. Nowy launch frameworka pojawi sie na X godziny lub dni zanim trafi na blogi, do dokumentacji czy na Reddita. Ale ta predkosc ma cene -- 280 znakow to za malo na niuanse, influencerzy promuja produkty za pieniadze, a wiralowe posty czesto upraszczaja zlozana rzeczywistosc do chwytliwego hasla.

> **CZY WIESZ, ZE...?**
> W architekturze Gold Standard 2026 Researcher X ma najnizszy wskaznik obciazenia (load) wsrod wszystkich researcherow -- zaledwie **45/100**, podczas gdy Tech i GitHub maja po 55/100. Dlaczego? Detekcja trendow na X to zadanie **lzejsze obliczeniowo** -- posty sa krotkie (280 znakow), kontekst jest plytki, a glowna praca to filtracja i kategoryzacja, nie glebokie czytanie dokumentacji. Nizszy load oznacza, ze Researcher X moze byc uruchamiany czesciej i tanszym kosztem niz inni researcherzy.

---

## 2. Kluczowe Obowiazki

Researcher X ma piec glownych obszarow odpowiedzialnosci. Kazdy z nich adresuje inny aspekt ekosystemu X/Twitter jako zrodla danych technologicznych.

### 2.1 Monitorowanie trendow technologicznych (Trend Monitoring)

To podstawowe zadanie Researchera X. Przeszukuje X w poszukiwaniu trendow, ktore jeszcze nie zdazyly przeniknac do dokumentacji czy blogow. Szuka:

1. **Nowych narzedzi i frameworkow** -- ktos opublikowal thread o nowym frameworku, ktory rozwiazuje problem X lepiej niz istniejace rozwiazania
2. **Zmian w ekosystemie** -- "Just shipped v2.0" od oficjalnego konta frameworka
3. **Przesuniecia narracji** -- jesli przez tydzien 50 developerow pisze o tym samym temacie, to jest trend
4. **Dyskusji porownawczych** -- "X vs Y" debaty miedzy influencerami

Kluczowa roznica miedzy Researcherem X a Researcherem Tech: Tech szuka **faktow w dokumentacji** (powolne, ale pewne). X szuka **sygnalow w czasie rzeczywistym** (szybkie, ale niepewne). Obie perspektywy sa potrzebne -- i dopiero ich polaczenie (przez Syntetyka) daje pelny obraz.

### 2.2 Sledzenie reakcji na launche (Launch Reaction Tracking)

Kiedy firma ogłasza nowy produkt, pierwsze reakcje pojawiaja sie na X -- czesto w ciagu minut. Researcher X monitoruje:

- **Oficjalne ogloszenia** -- tweet od firmy lub CEO z linkiem do bloga/repozytorium
- **Reakcje community** -- co pisza developerzy? Entuzjazm? Sceptycyzm? Krytyka?
- **Porownania z konkurencja** -- "To jest jak X, ale gorsze/lepsze bo..."
- **Techniczne pytania** -- jakie watpliwosci pojawily sie w pierwszych godzinach?

Przyklad z zycia: kiedy Anthropic wypuscil Claude Agent SDK, pierwsze tweety pojawialy sie w ciagu godzin. Reddit potrzebowal 1-2 dni na glebokie komentarze. Oficjalne porownania na blogach -- tygodnie. Researcher X lowi te wczesne sygnaly.

### 2.3 Analiza threadow technicznych (Thread Analysis)

Thready techniczne na X (posty oznaczone symbolem nitki -- wieloczesciowe watkowe wpisy) to **najcenniejszy typ tresci na platformie**. Developer z 15-letnim doswiadczeniem pisze 20-czesciowy thread o tym, dlaczego migruje z frameworka A do B, jakie problemy napotkal i jakie wyciagnal wnioski. To nie jest 280-znakowy hot take -- to **mini-esej w formacie mikroblogowym**.

Researcher X identyfikuje takie thready, ekskstrahuje kluczowe insights i ocenia wiarygodnosc autora. Nie kazdy thread jest warty uwagi -- thread od studenta z 3-miesiecznym doswiadczeniem nie ma takiej wagi jak thread od principal engineera w FAANG.

### 2.4 Identyfikacja influencerow i ich pozycji (Influencer Mapping)

Na X istnieje hierarchia glosow technologicznych. Researcher X buduje mape:

| Poziom | Kto | Przyklad (archetyp) | Wiarygodnosc |
|--------|-----|---------------------|-------------|
| **Tier 1** | Tworcy technologii | Autor frameworka, core maintainer | Najwyzsza |
| **Tier 2** | Principal engineers | 10+ lat doswiadczenia, publiczne projekty | Wysoka |
| **Tier 3** | Developer advocates | Pracownicy firm technologicznych, DevRel | Srednia-Wysoka |
| **Tier 4** | Content creatorzy | YouTuberzy, blogerzy z duzym zasiegiem | Srednia |
| **Tier 5** | Komentatorzy | Aktywni w dyskusjach, ale bez publicznych projektow | Niska |

Pozycja influencera w hierarchii wplywa na wage jego opinii w raporcie. Tweet od twórcy Reacta o przyszlosci renderowania ma inny ciezar niz tweet od content creatora, ktory wczoraj probowal Reacta po raz pierwszy.

### 2.5 Wykrywanie hype vs wartosci (Hype Detection)

To **najtrudniejsze i najwazniejsze** zadanie Researchera X. Hype na X ma specyficzna dynamike:

```
Dzien 1: Influencer postuje "X zmienia WSZYSTKO!"
Dzien 2: 50 osob retweetuje, 10 pisze wlasne hot takes
Dzien 3: "X killer", "Y is dead", "Why X is the future"
Dzien 7: Pierwsze krytyczne glosy -- "Sprawdzilem X, ma problemy A, B, C"
Dzien 14: Narracja sie stabilizuje -- X jest OK, ale nie rewolucja
Dzien 30: Nikt juz o X nie mowi. Nowy hype cycle.
```

Researcher X musi ocenic, w ktorym punkcie cyklu znajduje sie dany temat i czy za hype stoi realna wartosc. Uzywa do tego skali "Hype Score" (0-10):

| Score | Znaczenie | Dzialanie |
|-------|-----------|-----------|
| 0-2 | Brak hype, stabilna technologia | Raportuj normalnie |
| 3-5 | Umiarkowane zainteresowanie | Raportuj z kontekstem |
| 6-8 | Silny hype, wymaga walidacji | Raportuj + flaguj do walidacji |
| 9-10 | Ekstremalny hype / virality | OBOWIAZKOWA walidacja z Tech i Docs |

> **CZY WIESZ, ZE...?**
> Cytat z dokumentacji Gold Standard 2026: *"Researcher X: 'Hype na Remix, ale Next.js wciaz dominuje enterprise'"*. Ten przyklad idealnie ilustruje role R-04 -- nie chodzi o to, co jest **glosne** na X, ale o to, co jest **prawdziwe**. Remix mial swoja faze hype na X, ale dane z Researchera Tech i GitHub pokazywaly, ze Next.js nadal dominuje w produkcji enterprise. Researcher X zlapal sygnal -- ale dopiero walidacja z innymi zrodlami dala pelny obraz.

---

## 3. Zrodla danych -- Ekosystem X/Twitter

X jest medium unikatowym. Zadna inna platforma nie oferuje takiej szybkosci informacji -- ale tez zadna inna nie generuje takiego szumu. Researcher X musi rozumiec **hierarchie jakosci tresci na X**.

### Hierarchia wartosci tresci na X

```
POZIOM 1 (najwyzszy): Techniczne thready -- analiza, kod, benchmarki
POZIOM 2: Oficjalne launch announcements -- link do docs/repo
POZIOM 3: Opinie ekspertow (Tier 1-2) -- substancjalne, ale krotkie
POZIOM 4: Debaty porownawcze -- "X vs Y" w replies
POZIOM 5: Hot takes / viralowe posty -- clickbait, ale sygnal hype
POZIOM 6 (najnizszy): Posty sponsorowane -- zero wartosci dowodowej
```

### 3.1 Techniczne thready

Najcenniejszy typ tresci na X. Developer pisze 10-25 czesciowy thread z fragmentami kodu, benchmarkami, konkretnymi problemami ("Probowalem Y i napotkałem bug Z") i porownaniami first-hand ("Uzywalem A przez rok, przeszedlem na B"). To odroznia substancje od opinii.

### 3.2 Oficjalne konta projektow

Researcher X monitoruje konta oficjalne frameworkow, bibliotek i narzedzi (@nextjs, @reactjs, @vercel, @openai, konta maintainerow, konta firm technologicznych). Oficjalny tweet to **punkt startowy**, nie punkt koncowy. "Just shipped v3.0!" wymaga sprawdzenia: co dokladnie zmienilo sie w v3.0? Jakie sa breaking changes?

### 3.3 Engagement jako sygnal (nie dowod)

| Metryka | Co MOZE oznaczac | Co NIE oznacza |
|---------|-------------------|----------------|
| Wysoka liczba retweetow | Temat rezonuje z community | Temat jest poprawny technicznie |
| Duzo odpowiedzi | Temat jest kontrowersyjny lub wazny | Community sie zgadza |
| Duzo lajkow | Post jest chwytliwy lub trafny | Post jest prawdziwy |
| Mala liczba interakcji | Temat jest niszowy | Temat jest niewazny |
| Bookmark to like ratio | Temat jest uzyteczny (ludzie zapisuja) | Automatycznie wiarygodne |

**Zasada kardynalna:** Engagement NIGDY nie jest dowodem jakosci technicznej. 10,000 lajkow na "Y is dead!" nie oznacza, ze Y naprawde jest martwe. To oznacza, ze post chwycil -- moze dlatego, ze jest prawdziwy, a moze dlatego, ze jest kontrowersyjny, zabawny lub prowokacyjny.

### 3.4 Unikalne wyzwania X jako zrodla danych

| Wyzwanie | Strategia mitygacji |
|----------|---------------------|
| **Limit 280 znakow** | Szukaj threadow, nie pojedynczych postow |
| **Influencer bias** | Weryfikuj credentials autora |
| **Tresci promocyjne** | Sprawdzaj "#ad", "#sponsored", powiazania |
| **Recency bias** | Porownuj z danymi historycznymi |
| **Context collapse** | Czytaj caly thread + replies |
| **Echo chambers** | Szukaj glosow spoza glownego bubla |
| **Bot activity** | Weryfikuj profile, szukaj wzorcow |

> **UWAGA!**
> X jest jedynym zrodlem w systemie Gold Standard 2026, gdzie **obowiazuje zasada walidacji krzyzowej**: "Waliduj z Tech Researcher i Docs". Zadne finding z X nie moze byc przekazane dalej bez potwierdzenia z innego zrodla. Reddit Researcher i Forum Researcher nie maja tak ostrego wymogu -- ich zrodla sa inherentnie bardziej rozwiniete (dluzsze posty, wiecej kontekstu). X, ze swoim limitem 280 znakow i kultura hot takes, wymaga dodatkowej warstwy weryfikacji.

---

## 4. Format raportu

Kazdy output Researchera X to **ustrukturyzowany raport** w formacie JSON. Nie wolny tekst, nie lista linkow -- parsowalny, walidowalny dokument ze scisle zdefiniowanymi polami.

### Szablon raportu

```json
{
  "agent_id": "R-04",
  "report_type": "x_twitter_research",
  "research_question": "Jakie sa reakcje community na launch Claude Agent SDK?",
  "timestamp": "2026-04-01T14:00:00Z",
  "token_usage": {
    "input": 9800,
    "output": 6400,
    "total": 16200
  },
  "findings": [
    {
      "topic": "Claude Agent SDK -- reakcje na launch",
      "source_author": "@anthropic",
      "author_credentials": "Tier 1 -- tworca technologii",
      "tweet_url": "https://x.com/anthropic/status/...",
      "content_type": "launch_announcement",
      "engagement_metrics": {
        "likes": 4200,
        "retweets": 1100,
        "replies": 380,
        "bookmarks": 890
      },
      "hype_score": 7,
      "key_insight": "Safety-first, MCP-native, ale Claude-only...",
      "sentiment": "positive",
      "validation_status": "REQUIRES_VALIDATION",
      "validation_note": "Sprawdz z Tech Researcher -- oficjalna dokumentacja",
      "confidence_score": 0.65
    }
  ],
  "top_10_summary": [
    "1. Anthropic launch -- silna reakcja, 4200 likes",
    "2. Thread porownawczy -- Claude vs OpenAI Agents SDK",
    "..."
  ],
  "hype_assessment": {
    "overall_hype_level": "HIGH (7/10)",
    "peak_day": "2026-03-28",
    "trend_direction": "stabilizing",
    "requires_validation": true
  },
  "recommendations": [
    "Walidacja z Tech Researcher: sprawdz oficjalna dokumentacje",
    "Walidacja z GitHub Researcher: sprawdz aktywnosc repozytorium"
  ],
  "gaps": [
    "Brak danych o adopcji w enterprise",
    "Brak benchmarkow porownawczych z niezaleznych zrodel"
  ],
  "freshness": "2026-Q1"
}
```

### Kluczowe pola specyficzne dla R-04

| Pole | Opis | Wymagane? |
|------|------|-----------|
| `source_author` | Handle autora tweeta | TAK |
| `author_credentials` | Tier influencera (1-5) + uzasadnienie | TAK |
| `tweet_url` | Bezposredni link do tweeta | TAK |
| `engagement_metrics` | Likes, retweets, replies, bookmarks | TAK |
| `hype_score` | 0-10 -- poziom hype wokol tematu | TAK |
| `validation_status` | VALIDATED / PARTIALLY / REQUIRES | TAK |
| `content_type` | thread / hot_take / launch / debate | TAK |

**Pole `validation_status` jest unikalne dla Researchera X.** Zaden inny researcher nie ma obowiazkowego pola walidacji -- bo zaden inny nie operuje na zrodle o tak niskim wskazniku sygnalu do szumu.

> **CZY WIESZ, ZE...?**
> System prompt Researchera X jest jednym z najkrotszych w calej architekturze: *"Jestes X/Twitter Researcher. Szukaj trendow, launchow, threadow technicznych. Output: TOP 10 postow z kontekstem."* Ta lakonicznosc jest celowa -- Researcher X dostaje waskie zadanie i nie powinien "rozszerzac" swojej misji. Im waszy prompt, tym mniejsze ryzyko, ze agent zacznie halucynowac lub wchodzic na teren innych researcherow.

---

## 5. Czego Researcher X NIE robi

Granice roli sa rownie wazne jak obowiazki. W systemie wieloagentowym przekraczanie zakresu prowadzi do chaosu.

### 5.1 NIE podaza za hype bez walidacji

To **fundamentalny anty-wzorzec** Researchera X i jednoczesnie jego najwazniejsza regula. Cytat z Gold Standard 2026:

> "Podazanie za hype bez walidacji" -- glowny anty-wzorzec R-04

Researcher X RAPORTUJE hype, ale go nie AKCEPTUJE. Roznica jest kluczowa:

```
ZLE:  "Wszystko wskazuje, ze Framework Z zmieni branze!"
      (agent przejal narracje z X)

DOBRZE: "Framework Z generuje hype score 8/10 na X.
         Wymaga walidacji z Tech Researcher i Docs.
         Brak niezaleznych benchmarkow."
      (agent raportuje hype jako fakt o hype, nie jako fakt techniczny)
```

### 5.2 NIE traktuje lajkow jako dowodu jakosci

10,000 lajkow nie oznacza poprawnosci technicznej. Researcher X uzywa engagement metrics jako **sygnalu zainteresowania**, nie jako **dowodu prawdziwosci**.

### 5.3 NIE tworzy kodu ani nie podejmuje decyzji

Researcher X jest agentem **read-only** i **opinion-neutral**. Nie pisze kodu, nie tworzy plikow, nie edytuje istniejacych dokumentow. Nie rekomenduje technologii -- raportuje, co X mowi o technologiach.

### 5.4 NIE komunikuje sie z innymi researcherami

Researchery sa celowo izolowane. R-04 nie wie, co znalazl R-01, R-03 czy R-05. Izolacja zapobiega confirmation bias -- synteza nastepuje dopiero na poziomie Syntetyka.

### 5.5 NIE przeszukuje zrodel innych researcherow

Reddit to domena R-03. Dokumentacja to domena R-01. GitHub to domena R-05. Researcher X operuje **wylacznie** na X/Twitter -- zasada specjalizacji.

> **UWAGA!**
> Regula "Waliduj z Tech Researcher i Docs" nie oznacza, ze Researcher X sam idzie do dokumentacji i sprawdza. Oznacza, ze w raporcie FLAGUJE findings jako "REQUIRES_VALIDATION" -- a Research Critic lub Syntetyk porownuje je z raportami od Tech Researchera i Docs Researchera. Researcher X sygnalizuje potrzebe walidacji, ale NIE przeprowadza jej sam.

---

## 6. Model i Koszt -- Ekonomia najszybszego zwiadowcy

### 6.1 Claude Haiku -- predkosc i oszczednosc

Researcher X uzywa **Claude Haiku** -- najtanszego modelu w ofercie Anthropic:

| Model | Input (per 1M tokenow) | Output (per 1M tokenow) | Zastosowanie |
|-------|------------------------|------------------------|--------------|
| Claude Opus | $15.00 | $75.00 | Orkiestrator, strategia |
| Claude Sonnet | $3.00 | $15.00 | Buildery, krytyka |
| **Claude Haiku** | **$0.80** | **$4.00** | **Research, QA** |

### 6.2 Najnizszy load w zespole (45/100)

Researcher X ma load **45/100** -- najnizszy wsrod wszystkich researcherow:

| Researcher | Load | Powod |
|-----------|------|-------|
| Tech (R-01) | 55% | Dlugie dokumentacje, benchmarki |
| UX (R-02) | 50% | Wiele zrodel wizualnych |
| Reddit (R-03) | 50% | Dlugie watki dyskusyjne |
| **X (R-04)** | **45%** | **Krotkie posty, szybka filtracja** |
| GitHub (R-05) | 55% | Analiza kodu i architektury |
| Forums (R-06) | 50% | Rozbudowane odpowiedzi |

Dlaczego najnizszy? Posty na X sa krotkie (280 znakow), thready rzadko przekraczaja 5000 znakow. Wiecej zrodel, ale kazde krotsze = nizsze zuzycie tokenow.

### 6.3 Koszt per zadanie

```
Typowe zadanie Researchera X:
  Input: ~10,000 tokenow (zapytania + odczytane tweety)
  Output: ~6,000 tokenow (raport JSON)
  
  Koszt input:  10,000 x $0.80/1M  = $0.008
  Koszt output:  6,000 x $4.00/1M  = $0.024
  RAZEM: ~$0.032 per zadanie

Dla porownania:
  Ten sam task na Opus:
  Input:  10,000 x $15/1M  = $0.15
  Output:  6,000 x $75/1M  = $0.45
  RAZEM: ~$0.60 per zadanie

  OSZCZEDNOSC: ~$0.57 (95%) per zadanie
```

### 6.4 Kiedy Haiku wystarczy, a kiedy nie

Haiku jest **idealny** dla Researchera X, bo:

- Posty na X sa krotkie -- nie potrzeba duzego okna kontekstowego
- Zadanie to filtracja i kategoryzacja, nie gleboki reasoning
- Format outputu jest z gory zdefiniowany (JSON)

Haiku moze byc **niewystarczajacy** gdy thread ma 50+ czesci z gleboka analiza, wymagana jest wielojezyczna analiza sentymentu, lub kontekst wymaga zrozumienia subtelnej ironii. W takich przypadkach -- upgrade do Sonnet (podejscie "smart routing").

> **CZY WIESZ, ZE...?**
> Przy pelnym "Research Swarm" (6 researcherow + Critic + Syntetyk), Researcher X stanowi zaledwie **5-8% calkowitego kosztu tokenowego** rundy badawczej. Jego niski load (45%) i krotkie zrodla oznaczaja, ze jest to **najtanszy researcher w zespole** -- idealny do szybkiego skanowania, ktore uzupelnia glebokie badania droższych kolegów.

---

## 7. Narzedzia -- Arsenal lowcy trendow

Researcher X dysponuje dokladnie **piecioma narzedziami**. Kazde sluzy konkretnemu celowi, a ich zestaw jest identyczny jak u innych researcherow -- roznica lezy w **sposobie uzycia**.

### 7.1 WebSearch -- Okno na X

Najwazniejsze narzedzie. WebSearch pozwala przeszukiwac X/Twitter w poszukiwaniu tresci. Kluczowa umiejetnosc Researchera X to **formulowanie zapytan** zoptymalizowanych pod ekosystem X:

**Dobre zapytania WebSearch dla X:**
```
"site:x.com Claude Agent SDK launch reactions 2026"
"site:twitter.com LangGraph vs CrewAI thread"
"X/Twitter tech trends AI agents April 2026"
"[framework name] launch reactions developer community X"
```

**Zle zapytania WebSearch:**
```
"best AI framework" (zbyt ogolne, brak kontekstu X)
"twitter" (bez konkretnego tematu)
"AI news" (za szerokie, zaleje szumem)
```

### 7.2 WebFetch -- Pobranie pelnej tresci

Po znalezieniu URL tweeta lub threada, WebFetch pobiera pelna zawartosc. Krytyczne dla:

- Czytania calych threadow (nie tylko pierwszego tweeta)
- Przechwytywania engagement metrics
- Sprawdzania profilu autora (bio, liczba followers, weryfikacja)

### 7.3 Read -- Czytanie lokalnych plikow

Czytanie MANIFEST.md (shared scratchpad), briefow od Orkiestratora, wynikow innych agentow.

### 7.4 Grep -- Wyszukiwanie wzorcow

Przeszukiwanie plikow za pomoca wyrazen regularnych -- szukanie wzmianek o technologiach, identyfikacja powtarzajacych sie tematow.

### 7.5 Glob -- Wyszukiwanie plikow po wzorcu

Znajdowanie raportow z poprzednich rund, lokalizowanie konfiguracji systemu.

### Narzedzia, ktorych Researcher X NIE ma

| Narzedzie | Powod braku |
|-----------|-------------|
| Write | Researcher NIE tworzy plikow -- tylko raportuje |
| Edit | Researcher NIE modyfikuje kodu ani dokumentow |
| Bash | Researcher NIE uruchamia komend systemowych |
| Agent | Researcher NIE deleguje do innych agentow |

To **Principle of Least Privilege** w praktyce. Researcher X jest agentem **read-only**: moze czytac swiat (internet + pliki lokalne), ale nie moze go zmieniac. Ta zasada chroni system przed przypadkowa (lub celowa) modyfikacja danych przez agenta badawczego.

> **UWAGA!**
> Roznica miedzy Researcherem X a innymi researcherami nie lezy w narzedziach (sa identyczne), ale w **sposobie uzycia WebSearch**. Researcher Tech szuka "React 19 SSR benchmark documentation 2026". Researcher X szuka "site:x.com React 19 launch reactions developer thread". Ten sam WebSearch, inne query, inne wyniki, inna wartosc dodana.

---

## 8. Workflow -- Od tweeta do raportu

### 8.1 Cykl zycia zadania

```
Krok 1: ODBIORCA PYTANIA
  Orkiestrator --> R-04: {"question": "Reakcje na launch Framework Z?"}
  TYLKO pytanie. Narrow Context Principle.

Krok 2: PLANOWANIE ZAPYTAN
  Rozbicie na pod-zapytania pod X:
  - "site:x.com Framework Z launch 2026"
  - "site:x.com Framework Z reactions developer"
  - "site:x.com Framework Z vs [konkurent] thread"

Krok 3-4: WYSZUKIWANIE + POBRANIE (WebSearch + WebFetch)
  Rownolegle zapytania --> zbieranie URLi --> pelna tresc top 10-15

Krok 5-6: FILTRACJA + OCENA AUTOROW
  Odrzucenie botow/spamu/duplikatow --> kategoryzacja
  Tier influencera (1-5) + credentials + konflikty interesow

Krok 7-8: HYPE ASSESSMENT + WALIDACJA
  Hype_score (0-10) + validation_status per finding
  VALIDATED / PARTIALLY / REQUIRES_VALIDATION

Krok 9-10: TOP 10 + DOSTARCZENIE
  Raport JSON --> Research Critic (lub Orkiestrator)
```

### 8.2 Pipeline walidacji -- co dzieje sie po raporcie

Raport R-04 przechodzi surowsza walidacje niz raporty innych researcherow:

```
R-04 --> raport --> Research Critic --> Porownanie z R-01 (Tech), R-05 (GitHub), R-07 (Docs)
  |
  Findings POTWIERDZONE przez inne zrodla --> PASS
  Findings CZESCIOWO potwierdzone --> FLAG + dodatkowy research
  Findings NIEPOTWIERDZONE --> ODRZUCONE lub oznaczone jako "hype only"
```

### 8.3 Typowy czas i koszt zadania

| Metryka | Wartosc |
|---------|---------|
| Sredni czas wykonania | 20-60 sekund |
| Srednie zuzycie tokenow (input) | 8,000-15,000 |
| Srednie zuzycie tokenow (output) | 5,000-8,000 |
| Sredni koszt per zadanie | $0.02-0.05 |
| Typowa liczba WebSearch calls | 3-6 |
| Typowa liczba WebFetch calls | 5-10 |

Researcher X jest **najszybszy i najtanszy** wsrod researcherow -- co odpowiada naturze jego zrodla (krotkie posty, szybka filtracja).

---

## 9. Researcher X vs inne Researchery

### 9.1 Fundamentalne rozroznienie -- co kazdy researcher dostarcza

| Researcher | Dostarcza | Kluczowe pytanie | Typ danych |
|-----------|-----------|-------------------|------------|
| **Tech (R-01)** | FAKTY z dokumentacji | "Jak to dziala wg producenta?" | Wolne, pewne |
| **UX (R-02)** | TRENDY wizualne | "Jak to powinno wygladac?" | Wizualne, inspiracyjne |
| **Reddit (R-03)** | OPINIE praktrykow | "Co naprawde mysla developerzy?" | Szczere, subiektywne |
| **X (R-04)** | TRENDY i REAKCJE | "Co jest NOWE i co ludzie myslą TERAZ?" | Najszybsze, najglosniejsze |
| **GitHub (R-05)** | DZIALAJACY KOD | "Jak inni to zbudowali?" | Konkretne, weryfikowalne |
| **Forums (R-06)** | TUTORIALE i LEKCJE | "Jakie sa pulapki i rozwiazania?" | Edukacyjne, praktyczne |

### 9.2 Pelna tabela porownawcza

| Wymiar | Tech | UX | Reddit | **X** | GitHub | Forums |
|--------|------|-----|--------|-------|--------|--------|
| **Szybkosc informacji** | Wolna | Srednia | Srednia | **Najszybsza** | Wolna | Srednia |
| **Wiarygodnosc** | Wysoka | Srednia | Srednia-Niska | **Najnizsza** | Wysoka | Srednia |
| **Glebokosc** | Wysoka | Srednia | Wysoka | **Niska** | Wysoka | Wysoka |
| **Szum (noise)** | Niski | Niski | Sredni | **Najwyzszy** | Niski | Sredni |
| **Load** | 55% | 50% | 50% | **45%** | 55% | 50% |
| **Koszt/zadanie** | ~$0.05 | ~$0.08 | ~$0.04 | **~$0.03** | ~$0.05 | ~$0.04 |
| **Wymaga walidacji?** | Nie | Nie | Czesciowo | **OBOWIAZKOWA** | Nie | Czesciowo |
| **Typ outputu** | 3+ opcje porownania | Mood board 5+ ref | TOP 10 insightow | **TOP 10 postow** | TOP 5 repo | TOP 10 takeaways |

### 9.3 Synergie i walidacja krzyzowa

Sam R-04 produkuje dane niskiej pewnosci. Z walidacja -- staje sie nieocenionym czujnikiem:

| Sygnal z X | Walidacja z... | Wynik |
|------------|----------------|-------|
| "Framework Z zmieni branze!" | Tech: docs i benchmarki | Hype lub substancja? |
| "Y is dead!" | GitHub: aktywnosc repo | Czy Y naprawde traci? |
| "Bug w produkcji!" | Tech + Forums: CVE, watki | Realny problem czy panika? |
| "Thread: migracja A-->B" | Reddit: potwierdzenie doswiadczen | Czy inni tez migruja? |
| "Launch: nowy tool" | Docs: dokumentacja | Czy tool ma substancje? |

**R-04 bez walidacji = gazeta brukowa. R-04 z walidacja = system wczesnego ostrzegania.**

---

## 10. Anty-wzorce -- Czego unikac

### 10.1 Hype Follower (Podazanie za hype)

**Objaw:** Raport brzmi jak entuzjastyczny tweet, nie jak obiektywna analiza.

```
ZLE:  "Framework Z to absolutna rewolucja! Wszyscy migruja."

DOBRZE: "Framework Z: hype score 8/10. 230 postow w 48h.
         Brak benchmarkow, 0 case studies. REQUIRES_VALIDATION."
```

**Fix:** Kazde finding z hype_score i validation_status. NIGDY slowa "rewolucja", "gamechanger" -- to jezyk marketingu, nie badania.

### 10.2 Influencer Worship (Kult influencerow)

**Objaw:** Opinie popularnych osob traktowane jako autorytatywne niezaleznie od kompetencji.

```
ZLE:  "@PopularDev (500K followers) mowi Y najlepsze. Uzyj Y."

DOBRZE: "@PopularDev (Tier 4, content creator, brak production XP z Y).
         REQUIRES_VALIDATION z Tech Researcher."
```

**Fix:** Obowiazkowe `author_credentials` z Tierem. Popularnosc (followers) != kompetencja.

### 10.3 Engagement = Truth (Lajki = Prawda)

**Objaw:** TOP 10 posortowane po lajkach, zakladajac popularnosc = poprawnosc.

```
ZLE:  #1: "Y is dead" (12K likes) --> "Y umiera"

DOBRZE: #1: Thread od core maintainera Y o roadmapie (800 likes)
        #7: "Y is dead" (12K likes) -- hot_take, hype 9/10, REQUIRES_VALIDATION
```

**Fix:** Sortowanie po wartosci merytorycznej, nie po engagement.

### 10.4 Thread Cherry-Picking (Wybieranie pod teze)

**Objaw:** Selekcja tylko potwierdzajacych tweetow, ignorowanie krytyki.

```
ZLE:  10 pozytywnych, 0 krytycznych --> "Community jednoglosnie popiera Z."

DOBRZE: 7 pozytywnych, 3 krytyczne --> "Sentyment 70% pozytywny,
        ale realne obawy o stabilnosc."
```

**Fix:** TOP 10 z reprezentatywnym przekrojem sentymentu.

### 10.5 Recency Obsession (Obsesja nowosci)

**Objaw:** TYLKO posty z ostatnich 24h, ignorowanie wartosciowych threadow sprzed tygodnia.

```
ZLE:  TOP 10 = wszystko z ostatnich 24h (thread core maintainera sprzed
      2 tygodni pominienty)

DOBRZE: Mix: 5 z 48h + 3 z tygodnia + 2 evergreen thready
```

**Fix:** Okno minimum 30 dni. Bookmark-to-like ratio > 0.3 = priorytet niezaleznie od daty.

> **UWAGA!**
> Najniebezpieczniejszy anty-wzorzec Researchera X to **kombinacja 10.1 + 10.3** -- Hype Follower + Engagement = Truth. Agent przejmuje hype i uzasadnia go liczbami engagement. "Framework Z to przyszlosc -- 12K lajkow potwierdza!" To nie jest research, to echo chamber w formacie JSON. Research Critic powinien natychmiast odrzucic taki raport.

---

## 11. Najlepsze Praktyki 2025-2026

### 11.1 Zasada "Odrozniaj hype od wartosci"

To oficjalne best practice z Gold Standard 2026 i fundament pracy Researchera X. Implementacja:

1. **Kazdy finding z hype_score (0-10)** -- jawna ocena poziomu hype
2. **Kazdy finding z validation_status** -- czy potwierdzono z innego zrodla?
3. **Kazdy finding z confidence_score** -- jak pewne jest to znalezisko?
4. **Nigdy nie uzywaj jezyka marketingowego** -- "rewolucja", "gamechanger", "must-have" to slowa z tweetow, nie z raportow badawczych

### 11.2 Zasada "Check author credentials"

Sprawdzaj: bio na profilu (doswiadczenie?), publiczne projekty (kod na GitHub?), historie tweetow (regularnie o temacie?), miejsce pracy (relevant firma?), konflikty interesow (promuje wlasny produkt? sponsorowany?).

### 11.3 Zasada "X has short attention span"

X ma krotka pamiec zbiorowa. Temat, ktory dwa tygodnie temu wydawal sie "rewolucja", tydzien pozniej jest zapomniany. Researcher X powinien:

- Nie reagowac na trendy mlodsze niz 48h (za wczesnie na ocene)
- Sprawdzac, czy trend utrzymuje sie >7 dni (sygnal trwalosci)
- Szukac "evergreen threads" -- tresci, ktore zbieraja bookmarki dlugo po publikacji

### 11.4 Walidacja krzyzowa -- zlota regula R-04

> "X jest najszybszym medium. Waliduj z Tech Researcher i Docs." -- Gold Standard 2026

Hype_score >= 6: MUSI miec `validation_status: REQUIRES_VALIDATION` + wskazanie czego brakuje. Hype_score < 6: moze byc `PARTIALLY_VALIDATED`, ale `confidence_score < 0.8` (X sam nie daje wysokiej pewnosci).

### 11.5 Bookmark-to-like ratio jako miernik wartosci

Unikalna metryka dla X: stosunek bookmarkow do lajkow. Bookmarki oznaczaja, ze ktos zapisal post do pozniejszego uzycia -- to sygnal **trwalej wartosci**, nie chwilowej reakcji.

| Ratio | Interpretacja |
|-------|---------------|
| > 0.3 | Bardzo wysoka wartosc uzyteczna -- ludzie ZAPISUJA |
| 0.15-0.3 | Wysoka wartosc -- mieszanka viral + utility |
| 0.05-0.15 | Normalny viral -- entertainment > utility |
| < 0.05 | Niski utility -- post jest entertaining ale nieuzyteczny |

### 11.6 Diversyfikacja glosow

Szukaj glosow z roznych perspektyw: pro i anty, duze firmy i indie developerzy, rozne regiony (US != EU != Asia tech Twitter), juniorzy i seniorzy. Nie polegaj na jednym "babelku" (echo chamber).

### 11.7 Rozpoznawanie postow sponsorowanych

Sygnaly: hashtagi (#ad, #sponsored), formulowania ("excited to announce"), timing (dokladnie w dniu launchu), jednostronnosc (ZERO krytyki = podejrzane).

### 11.8 Multi-Source Triangulation dla X

Najlepsza praktyka to potwierdzenie z trzech typow zrodel:

```
Tweet od influencera (co KTOS MOWI)
  + Engagement pattern (jak COMMUNITY reaguje)
  + External source (co DANE pokazuja)
  = Najbardziej wiarygodne finding z X
```

> **CZY WIESZ, ZE...?**
> Badania z 2025 roku pokazaly, ze **posty na X o technologiach maja sredni "okres poltrwania" wynoszacy 4.2 godziny** -- po tym czasie engagement spada o 50%. Dla porownania, post na blogu ma okres poltrwania ~30 dni, a odpowiedz na StackOverflow -- nawet kilka lat. To oznacza, ze Researcher X operuje na **najbardziej ulotnym medium** w calym systemie. Co trenduje rano, jest zapomniane wieczorem. Dlatego kluczowe jest lapanie sygnalow WCZESNIE i walidowanie ich SZYBKO.

---

## 12. Podsumowanie + Quick Reference Card

### 12.1 Kluczowe wnioski

Researcher X (R-04) to **najszybszy, najtanszy i najryzykowniejszy** researcher w Gold Standard 2026. Wartosc: (1) szybkosc -- launche na X godziny przed blogami, (2) detekcja trendow -- wzorce zanim stana sie mainstream, (3) wczesne ostrzeganie -- bugi i kontrowersje jako pierwsze, (4) niski koszt -- ~$0.03/zadanie, (5) komplementarnosc -- z walidacja staje sie nieocenionym czujnikiem.

Glowne ryzyka: (1) najwyzszy noise-to-signal ratio, (2) naturalne wzmacnianie hype, (3) plytkosc 280 znakow, (4) boty i manipulacja.

### 12.2 Analogia koncowa

Jesli system wieloagentowy to statek na oceanie zadan, to:

- **Orkiestrator** to Kapitan na mostku
- **Researcher Tech** to Zwiadowca wysylany na lad
- **Researcher X** to **radar dalekiego zasiegu** -- wykrywa sygnaly najwczesniej, ale czasem "widzi" to, czego nie ma (falszywe echa). Bez radaru statek moze byc zaskoczony. Ale kapitan, ktory reaguje na kazdy blip radaru, nigdy nie doplynie do celu. Sztuka polega na tym, zeby **sluchac radaru, ale weryfikowac kazdy sygnal** zanim zmieni sie kurs.

### 12.3 Quick Reference Card

```
+===============================================+
|        RESEARCHER X / TWITTER (R-04)          |
|        Quick Reference Card                   |
+===============================================+
|                                               |
|  WARSTWA:    RESEARCH (Faza 1)                |
|  MODEL:      Claude Haiku                     |
|  KOSZT:      $0.80/$4.00 per 1M tokenow      |
|  LOAD:       45% (najnizszy wsrod research.)  |
|  KOSZT/RUN:  ~$0.03                           |
|                                               |
|  NARZEDZIA:  WebSearch | WebFetch | Read      |
|              Grep | Glob                      |
|                                               |
|  BRAK:       Write | Edit | Bash | Agent      |
|                                               |
|  INPUT:      Pytanie badawcze (narrow context)|
|  OUTPUT:     TOP 10 postow z kontekstem (JSON)|
|                                               |
|  SYSTEM PROMPT:                               |
|  "Jestes X/Twitter Researcher.                |
|   Szukaj trendow, launchow, threadow          |
|   technicznych. Output: TOP 10 postow         |
|   z kontekstem."                              |
|                                               |
|  KLUCZOWE POLA RAPORTU:                       |
|  - source_author + author_credentials         |
|  - tweet_url + engagement_metrics             |
|  - hype_score (0-10)                          |
|  - validation_status (VALIDATED/REQUIRES)     |
|  - confidence_score (0.0-1.0)                 |
|                                               |
|  RAPORTUJE DO: Research Critic lub            |
|                Orkiestrator                    |
|                                               |
|  ZLOTA REGULA:                                |
|  "X jest najszybszym medium.                  |
|   Waliduj z Tech Researcher i Docs."          |
|                                               |
|  ZASADY:                                      |
|  - Odrozniaj hype od wartosci                 |
|  - Sprawdzaj credentials autorow              |
|  - X ma krotka pamiec -- szukaj trwalosci     |
|  - Engagement != prawda                       |
|  - Obowiazkowa walidacja przy hype >= 6       |
|  - Bookmark/like ratio > 0.3 = wysoka wartosc |
|  - Reprezentatywny przekroj sentymentu        |
|                                               |
|  ANTY-WZORCE:                                 |
|  x Hype Follower (przejmowanie narracji)      |
|  x Influencer Worship (kult popularnosci)     |
|  x Engagement = Truth (lajki = prawda)        |
|  x Thread Cherry-Picking (selekcja pod teze)  |
|  x Recency Obsession (tylko najnowsze)        |
|                                               |
|  HIERARCHIA TRESCI NA X:                      |
|  Thread techniczny > Launch announcement >    |
|  > Ekspert opinion > Debata > Hot take >      |
|  > Post sponsorowany                          |
|                                               |
+===============================================+
```

### 12.4 Slownik pojec (Glossary)

| Termin | Definicja |
|--------|-----------|
| **Deep Research Belt** | Warstwa 6 rownoleglych researcherow w Gold Standard 2026 |
| **Hype Score** | Skala 0-10 oceniajaca poziom hype wokol tematu na X |
| **Hype Cycle** | Cykl zycia trendu: ekscytacja --> szczyt --> rozczarowanie --> stabilizacja |
| **Validation Status** | Pole raportu: czy finding zwalidowany z innym zrodlem |
| **Narrow Context Principle** | Researcher dostaje TYLKO pytanie, nie caly kontekst projektu |
| **Principle of Least Privilege** | Agent ma minimum narzedzi potrzebnych do zadania |
| **Noise-to-Signal Ratio** | Stosunek szumu do sygnalu w danych |
| **Thread** | Wieloczesciowy post na X -- posty polaczone w watek |
| **Hot Take** | Szybka, kontrowersyjna opinia -- zazwyczaj uproszczona |
| **Echo Chamber** | Babelek informacyjny ze wzajemnym wzmacnianiem opinii |
| **Bookmark-to-Like Ratio** | Miernik trwalej uzytecznosci posta na X |
| **Influencer Tier** | Hierarchia wiarygodnosci (Tier 1 = tworca technologii, Tier 5 = komentator) |
| **Research Critic** | Agent bramkowy walidujacy raporty researcherow |
| **Syntetyk** | Agent laczacy raporty z wielu researcherow w spojny obraz |
| **Cross-Validation** | Potwierdzenie findings z X przez inne zrodla |

---

*Dokument przygotowany na podstawie Gold Standard Agent Architecture 2026, AGENT_TEAMS_CONFIGURATOR v8.0, analiz ALPHA/OMEGA Team oraz badan multi-agent systems 2025-2026. Wszystkie dane o cenach i statystykach aktualne na marzec-kwiecien 2026.*

---

## PROMPT DO PREZENTACJI WIDEO (AI Presenter)

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz prezentacje wideo (5-7 minut) o Researcherze X (R-04) -- agencie AI monitorujacym X/Twitter w architekturze Gold Standard 2026.

**Hook (0:00-0:30):** Pokaz viralowego tweeta "Framework Z zmieni WSZYSTKO!" (12K lajkow). 2 tygodnie pozniej: krytyczny bug, 0 production deployments, repo porzucone. Zespol stracil 3 tygodnie. Pytanie: "Jak uniknac pulapki, korzystajac z najszybszego zrodla informacji?"

**Czesc 1 -- Problem (0:30-1:30):** X jest najszybszym medium -- launche i debaty pojawiaja sie godziny przed blogami. Ale najwyzszy noise-to-signal ratio: 280-znakowe uproszczenia, influencer bias, posty sponsorowane, echo chambers.

**Czesc 2 -- Kim jest R-04? (1:30-2:30):** Agent w RESEARCH layer. Model: Haiku. Load: 45%. Narzedzia: read-only. Analogia: korespondent wojenny -- najszybszy, najwyzsze ryzyko.

**Czesc 3 -- Obowiazki (2:30-3:30):** 5 obszarow: trend monitoring, launch tracking, thread analysis, influencer mapping (Tier 1-5), hype detection (0-10). Pokaz tabele i skale.

**Czesc 4 -- Hype Detection (3:30-4:30):** Cykl hype: Dzien 1 (eksplozja) --> Dzien 7 (krytyka) --> Dzien 14 (stabilizacja) --> Dzien 30 (cisza). Metryka: bookmark-to-like ratio > 0.3 = trwala wartosc.

**Czesc 5 -- Anty-wzorce (4:30-5:30):** 5 anty-wzorcow: Hype Follower, Influencer Worship, Engagement = Truth, Cherry-Picking, Recency Obsession. Kazdy z przykladem ZLE vs DOBRZE.

**Czesc 6 -- Reference Card + Zamkniecie (5:30-7:00):** Karta R-04. Zlota regula: "Waliduj z Tech Researcher i Docs." Powrot do hooka: Researcher X zlapalby tweeta PIERWSZY, ale oznaczyłby hype_score 9/10, REQUIRES_VALIDATION. Critic sprawdza z Tech i GitHub. Wynik: "Hype without substance." 3 tygodnie uratowane. "Szybkosc bez walidacji to ryzyko. Szybkosc z walidacja to przewaga."

**Styl:** Ciemny motyw (black). Akcenty X-blue (#1DA1F2) + biel. Tweety "wlatujace" na ekran, animowany hype gauge, timeline cyklu. Monospace dla danych, sans-serif dla narracji.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike edukacyjna o Researcherze X (R-04) w architekturze Gold Standard 2026.

**Sekcja 1 -- Header:**
Tytul: "RESEARCHER X (R-04) -- Lowca Trendow" na czarnym tle z akcentami w X-blue (#1DA1F2). Podtytul: "Najszybszy researcher. Najwyzszy szum. Obowiazkowa walidacja." Ikona: stylizowane logo X z lupa.

**Sekcja 2 -- Signal vs Noise:** Po lewej "SYGNAL" (thread techniczny, launch, ekspert opinion) w niebieskim. Po prawej "SZUM" (hot takes, sponsorowane, boty) w czerwonym. Posrodku filtr "RESEARCHER X". Statystyka: "Tylko ~15% tresci na X to sygnal wartosciowy."

**Sekcja 3 -- Hype Detection Framework:** Gauge hype_score 0-10. Gradient: 0-2 zielony (stabilna), 3-5 zolty (umiarkowane), 6-8 pomaranczowy (wymaga walidacji), 9-10 czerwony (OBOWIAZKOWA walidacja).

**Sekcja 4 -- Influencer Credibility:** Piramida 5-poziomowa: Tier 5 (Komentatorzy) --> Tier 1 (Tworcy technologii). Ikona, opis, archetyp przy kazdym.

**Sekcja 5 -- Tabela porownawcza:** R-04 vs inni: szybkosc, wiarygodnosc, glebokosc, szum, load, koszt. X w X-blue. Insight: "Najszybszy, ale wymaga walidacji."

**Sekcja 6 -- 5 Anty-wzorcow:** (1) Hype Follower, (2) Influencer Worship, (3) Engagement = Truth, (4) Cherry-Picking, (5) Recency Obsession. Ikonki + jednozdaniowe opisy.

**Sekcja 7 -- Statystyka:** "45/100" (load) i "~$0.03" (koszt). "Najtanszy i najszybszy researcher."

**Sekcja 8 -- Zlota regula:** "X jest najszybszym medium. Waliduj z Tech Researcher i Docs." -- Gold Standard 2026.

**Sekcja 9 -- Footer:** Logo serii, QR code, data: Kwiecien 2026.

**Kolorystyka:** Czarny (#000) + X-Blue (#1DA1F2) + Bialy (#FFF). Czerwony (#FF4444) dla ostrzezen. Monospace dla metryk, sans-serif (Inter/DM Sans) dla tekstu. Styl: "terminal meets dashboard".
