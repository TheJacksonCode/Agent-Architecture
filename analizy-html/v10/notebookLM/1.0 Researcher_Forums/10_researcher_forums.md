# Researcher Forums (R-06) -- Tropiciel Pulapek i Rozwiazan w Systemach Wieloagentowych

## Kompletny przewodnik po roli Forums Research Agent w architekturze Gold Standard 2026

**Seria:** Architektura Agentow AI -- Role i Specjalizacje
**Numer roli:** R-06 (Research Layer)
**Model:** Claude Haiku ($0.80/$4.00 per 1M tokenow input/output)
**Warstwa:** RESEARCH (Faza 1) -- Deep Research Belt
**Obciazenie:** 50/100 (najnizsze wsrod researcherow -- zwiezle odpowiedzi forumowe)
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Kim jest Researcher Forums?

Wyobraz sobie bibliotekarza w technicznej bibliotece, ktory zna kazda polke nie dlatego, ze skatalogowal ksiazki alfabetycznie, ale dlatego, ze wie, KTORE ksiazki maja pozaginane rogi. Nie te najnowsze, nie te z najladniejszymi okladkami, ale te, do ktorych praktycy ciagle wracaja, bo znalezli w nich rozwiazanie swojego problemu. Ten bibliotekarz nie poleci ci bestsellera -- poleci ci ksiazke, ktora uratowala projekt trojga inzynierow w zeszlym kwartale. Na pytanie "jaka ksiazka o bazach danych?" nie odpowie "ta z najlepsza recenzja", tylko "ta na stronie 247 ma rozwiazanie dokladnie tego problemu z deadlockiem, ktory opisujesz". Researcher Forums (oznaczenie R-06 w architekturze Gold Standard 2026) jest wlasnie takim bibliotekarzem. Nie szuka tego, co POPULARNE -- szuka tego, co ROZWIAZUJE PROBLEMY.

Wyobraz sobie tez doswiadczonego przewodnika gorskiego, ktory zbiera notatki od kazdego wspinacza, ktory przeszedl szlak przed toba. Nie opiera sie na oficjalnej mapie szlaku (to domena Tech Researchera), nie na tym, co ludzie pisza na Instagramie o szlaku (to domena X Researchera), ani na forumowych klotniach o to, czy szlak jest za trudny (to domena Reddit Researchera). Zbiera KONKRETNE notatki: "na wysokosci 2400m jest oblodzona skalka po lewej -- obejdz ja od prawej", "most na rzece wyglada solidnie, ale trzecia deska jest sprochniala", "schronisko zamyka kuchnie o 20:00, nie o 21:00 jak pisze na stronie". Kazda notatka to rozwiazany problem. Kazda to lekcja od kogos, kto NAPRAWDE tam byl.

I wreszcie -- wyobraz sobie bieglego sadowego przegladadajacego akta spraw. Kazda zaakceptowana odpowiedz na StackOverflow to zamknieta sprawa z orzeczeniem. Kazdy artykul na Dev.to to raport powypadkowy (post-mortem). Kazdy watek na Hacker News to zeznanie eksperta przed trybunalem. Biegly nie wymysla wlasnych teorii -- analizuje DOWODY z zamknietych spraw, zeby znalezc wzorce. "W 7 na 10 przypadkow problem z wydajnoscia wynikal z N+1 queries." "W 4 na 5 projektow migracja z REST do GraphQL trwala 3x dluzej niz szacowano." Researcher Forums robi dokladnie to -- gromadzi dowody z rozwiazanych problemow i wyodrebnia z nich wzorce.

W systemie wieloagentowym Researcher Forums jest **ostatnim z szesciu rownoleglych researcherow** w tak zwanym "Deep Research Belt" -- pasie badawczym, gdzie kazdy specjalista przeszukuje inne zrodla informacji:

| Agent | Oznaczenie | Specjalizacja zrodlowa |
|-------|-----------|------------------------|
| Researcher Tech | R-01 | Dokumentacja, benchmarki, blogi techniczne |
| Researcher UX | R-02 | Dribbble, Behance, Awwwards, Mobbin |
| Researcher Reddit | R-03 | r/webdev, r/programming, r/reactjs, r/SaaS |
| Researcher X | R-04 | X/Twitter -- trendy, launche, influencerzy |
| Researcher GitHub | R-05 | Repozytoria open-source, architektura, Issues |
| **Researcher Forums** | **R-06** | **StackOverflow, Dev.to, Medium, Hacker News** |

Wsrod tej szostki Researcher Forums ma unikalna perspektywe. Odpowiada na pytanie, ktorego nikt inny nie zadaje:

- **Tech (R-01):** TEORIA + DOKUMENTACJA -- co mowi PRODUCENT
- **UX (R-02):** DESIGN -- jak to powinno WYGLADAC
- **Reddit (R-03):** OPINIE -- co MYSLA deweloperzy
- **X (R-04):** TRENDY -- co jest NOWE
- **GitHub (R-05):** DZIALAJACY KOD -- co faktycznie DZIALA w produkcji
- **Forums (R-06):** PULAPKI I ROZWIAZANIA -- jak inni je ROZWIAZALI

Podczas gdy Tech Researcher czyta, co PRODUCENCI mowia o swoich narzedziach, a Reddit Researcher czyta, na co DEWELOPERZY NARZEKAJA, Forums Researcher czyta, czego PRAKTYCY UCZA -- ustrukturyzowane pary problem-rozwiazanie z zaakceptowanymi odpowiedziami.

> **CZY WIESZ, ZE...?**
> StackOverflow ma ponad **58 milionow odpowiedzi** na ponad 24 miliony pytan (dane z marca 2026). Z tego okolo 37% pytan ma zaakceptowana odpowiedz -- co oznacza, ze autor pytania potwierdzil skutecznosc rozwiazania. To ponad **8 milionow zweryfikowanych rozwiazan**. Dla Researchera Forums to kopalnia zlota -- kazda zaakceptowana odpowiedz to problem, ktory ktos mial w produkcji i ktory ktos inny rozwiazal. Problem? Nie kazda zaakceptowana odpowiedz jest nadal aktualna. Dlatego filtrowanie po dacie, wersji technologii i glosach jest absolutnie krytyczne.

---

## 2. Kluczowe Obowiazki

Researcher Forums ma piec glownych obszarow odpowiedzialnosci. Kazdy jest scisle zdefiniowany -- co robi, czego NIE robi i jaki output produkuje.

### 2.1 Wyszukiwanie rozwiazan i pulapek (Solution Discovery)

Pierwszym zadaniem jest **systematyczne przeszukiwanie forow i blogow w poszukiwaniu rozwiazan konkretnych problemow**. To nie jest "wpisz pytanie w Google i przeczytaj pierwszy wynik". To ustrukturyzowany proces:

1. Zidentyfikuj kluczowy problem techniczny (np. "memory leak w Next.js App Router z Server Components")
2. Sformuluj precyzyjne zapytania dla kazdej platformy (inne dla SO, inne dla Dev.to)
3. Przefiltruj wyniki wedlug jakosci odpowiedzi (glosy, zaakceptowane, data)
4. Wyodrebnij konkretne rozwiazania z kontekstem
5. Skataloguj pulapki (gotchas) zidentyfikowane w dyskusjach

**Zasada kardynalna:** Priorytet maja odpowiedzi ZAAKCEPTOWANE i WYSOKO GLOSOWANE. Odpowiedzi bez glosow traktuj jako hipotezy, nie jako fakty.

### 2.2 Analiza jakosci odpowiedzi (Answer Quality Assessment)

Researcher Forums nie tylko ZNAJDUJE odpowiedzi -- **ocenia ich wiarygodnosc**:

- **Glosy (votes):** Ile osob potwierdzilo uzytecznosc? (ale glosy != prawda techniczna)
- **Status akceptacji:** Czy autor pytania potwierdzil skutecznosc?
- **Data publikacji:** Czy odpowiedz jest aktualna dla obecnych wersji?
- **Reputacja autora:** Czy autor ma track record na platformie?
- **Komentarze:** Czy sa poprawki, aktualizacje, ostrzezenia?

To jest kluczowa roznica miedzy bezmyslnym cytowaniem odpowiedzi a swiadomym raportowaniem -- Researcher Forums MUSI ocenic jakosc kazdego znaleziska.

### 2.3 Ekstrakcja lekcji z doswiadczen (Lessons Learned Extraction)

Najcenniejszy output -- **wyodrebnianie powtarzalnych lekcji** z tresci forumowych:

- Jakie bledy pojawiaja sie najczesciej przy migracji do nowej wersji?
- Jakie obejscia (workarounds) sa powszechnie stosowane?
- Jakie "oficjalne rozwiazania" NIE dzialaja w praktyce?
- Jakie konfiguracje powoduja problemy w produkcji?

Przyklad realnego wgladu: *"W 6 z 8 watkow SO dotyczacych Server Actions w Next.js 15, uzytkownicy raportuja problem z revalidatePath() w nested layouts. Obejscie: uzyj revalidateTag() zamiast revalidatePath()."*

### 2.4 Identyfikacja powtarzajacych sie problemow (Pattern Recognition)

Kiedy ten sam problem pojawia sie na StackOverflow, Dev.to I Hacker News -- to nie anegdota, to WZORZEC. Researcher Forums identyfikuje:

- **Problemy powtarzajace sie miedzy platformami** -- wyzszy confidence score
- **Problemy specyficzne dla wersji** -- flagi do sprawdzenia aktualnosci
- **Problemy z "oficjalnymi" rozwiazaniami** -- gdy dokumentacja mowi A, a praktycy mowia B
- **Ewolucje rozwiazan** -- jak podejscie do problemu zmienilo sie w czasie

### 2.5 Zbieranie tutoriali i praktycznych przewodnikow (Tutorial Collection)

Dev.to, Medium i Hashnode to skarbnice **ustrukturyzowanych tutoriali**:

- Step-by-step przewodniki implementacji
- Porownania technologii z konkretnymi benchmarkami
- Architektury referencyjne z wyjasnionymi kompromisami
- Post-mortemy projektow z lekcjami na przyszlosc

> **CZY WIESZ, ZE...?**
> Dev.to publikuje srednio ponad **1,500 artykulow dziennie** (dane 2026). Z tego okolo 15-20% to artykuly techniczne z konkretnymi tutorialami i przykladami kodu. To ponad 200 nowych tutoriali kazdego dnia. Problem? Jakosc jest skrajnie zroznicowana -- obok swietnych artykulow doswiadczonych inzynierow znajdziesz "My First React App" napisane przez kogos po pierwszym tygodniu nauki. Dlatego filtrowanie po reakcjach, komentarzach i profilu autora jest absolutnie krytyczne.

---

## 3. Zrodla danych -- Ekosystem forow i blogow

Researcher Forums nie traktuje wszystkich platform jednakowo. Kazda ma inny profil jakosci, inny format tresci i inny stosunek sygnalu do szumu.

### 3.1 StackOverflow -- Zloty standard Q&A

| Parametr | Wartosc |
|----------|---------|
| **Format** | Pytanie-odpowiedz z glosowaniem i akceptacja |
| **Sygnal/szum** | NAJWYZSZY -- moderowane, tagowane, glosowane |
| **Sila** | Konkretne problemy z konkretnymi rozwiazaniami |
| **Slabosc** | Przestarzale odpowiedzi, elitaryzm moderacji |
| **Uzycie** | Szukanie rozwiazan KONKRETNYCH problemow technicznych |

StackOverflow to **sad najwyzszy** forow technicznych. Odpowiedzi sa glosowane przez spolecznosc, moderowane przez doswiadczonych deweloperow i oznaczane jako zaakceptowane przez autorow pytan. Kazda zaakceptowana odpowiedz to WYROK -- zweryfikowane rozwiazanie problemu.

### 3.2 Dev.to -- Spolecznosc blogerow-praktykow

| Parametr | Wartosc |
|----------|---------|
| **Format** | Artykuly blogowe, tutoriale, serie |
| **Sygnal/szum** | SREDNI -- otwarty dostep, brak paywall, ale tez brak ostrej moderacji |
| **Sila** | Tutoriale step-by-step, doswiadczenia z projektow |
| **Slabosc** | Duzo contentu dla poczatkujacych, zroznicowana jakosc |
| **Uzycie** | Szukanie tutoriali, experience reports, porownan |

### 3.3 Medium (publikacje techniczne) -- Gleboka analiza

| Parametr | Wartosc |
|----------|---------|
| **Format** | Dlugie artykuly, analizy architektoniczne, case studies |
| **Sygnal/szum** | ZMIENNY -- od swietnych artykulow po SEO spam |
| **Sila** | Doglebne analizy, architektura, post-mortemy |
| **Slabosc** | Paywall (3 artykuly/miesiac za darmo), SEO-optimized clickbait |
| **Uzycie** | Analizy architektoniczne, case studies z duzych firm |

> **UWAGA!**
> Medium paywall to powazny problem operacyjny. Jesli Researcher Forums cytuje artykul za paywallem, inni agenci (i uzytkownicy) moga nie miec do niego dostepu. Zasada: ZAWSZE oznaczaj artykuly z Medium jako "PAYWALL POSSIBLE" w raporcie. Jesli to mozliwe, szukaj tego samego contentu na blogu autora poza Medium.

### 3.4 Hacker News -- Elitarny trybunal techniczny

| Parametr | Wartosc |
|----------|---------|
| **Format** | Dyskusje, komentarze do artykulow, launche (Show HN) |
| **Sygnal/szum** | NAJWYZSZY w kategori dyskusji -- eksperci, CTOs, zalozyciele |
| **Sila** | Gleboka wiedza ekspercka, launch feedback, architektoniczne debaty |
| **Slabosc** | Maly wolumen, elitaryzm, tendencja do bikeshedding |
| **Uzycie** | Reakcje na nowe technologie, eksperckie opinie, deep dives |

### 3.5 Hashnode, LogRocket Blog, Smashing Magazine -- Zrodla uzupelniajace

| Zrodlo | Specjalizacja | Sygnal/szum |
|--------|---------------|-------------|
| **Hashnode** | Blogi deweloperow, tutoriale | Sredni |
| **LogRocket Blog** | Frontend, debugging, performance | Wysoki |
| **Smashing Magazine** | Frontend, UX, CSS, dostepnosc | Wysoki |

### 3.6 Hierarchia jakosci tresci forumowych

```
NAJWYZSZY SYGNAL:
  [1] StackOverflow -- zaakceptowana odpowiedz z 50+ glosami
  [2] Hacker News -- komentarz eksperta (>500 karma) z konkretnymi danymi
  [3] Smashing Magazine / LogRocket -- redagowane artykuly techniczne

WYSOKI SYGNAL:
  [4] StackOverflow -- wysoko glosowana odpowiedz (bez akceptacji)
  [5] Dev.to -- artykul z 100+ reakcjami i konkretnymi przykladami kodu
  [6] Medium -- artykul w publikacji techniczne (Better Programming, etc.)

SREDNI SYGNAL:
  [7] Dev.to -- artykul z 20-100 reakcjami
  [8] Hacker News -- komentarz z 10+ punktami
  [9] Hashnode -- artykul z konkretnymi przykladami

NISKI SYGNAL (UWAGA):
  [10] StackOverflow -- odpowiedz bez glosow
  [11] Medium -- artykul poza publikacja, potencjalny SEO spam
  [12] Dev.to -- artykul z <10 reakcjami, potencjalnie poczatkujacy autor

BRAK SYGNALU (ODRZUC):
  [13] StackOverflow -- pytanie bez odpowiedzi
  [14] Medium -- paywall bez alternatywnego zrodla
  [15] Dowolny post bez daty (nie mozna ocenic aktualnosci)
```

---

## 4. Format raportu

Researcher Forums generuje raport w formacie JSON, zoptymalizowanym pod przetwarzanie przez inne agenty w systemie:

```json
{
  "agent": "Forums Researcher (R-06)",
  "query": "Server Actions performance issues Next.js 15",
  "timestamp": "2026-04-01T14:30:00Z",
  "sources_searched": [
    "StackOverflow", "Dev.to", "Medium", "Hacker News"
  ],
  "total_results_scanned": 47,
  "top_10_takeaways": [
    {
      "rank": 1,
      "title": "revalidatePath() fails in nested layouts",
      "source_platform": "StackOverflow",
      "source_url": "https://stackoverflow.com/questions/...",
      "answer_score": 127,
      "accepted": true,
      "post_date": "2026-02-15",
      "technology_version": "Next.js 15.1.0",
      "problem": "revalidatePath() nie odswierza cache w nested layouts",
      "solution": "Uzyj revalidateTag() z explicitnym tagiem zamiast sciezkowej rewalidacji",
      "gotcha": "Dokumentacja Next.js nie wspomina o tym ograniczeniu",
      "practical_applicability": "HIGH",
      "confidence": 0.92,
      "cross_validated": true,
      "cross_validation_sources": ["Dev.to artykul", "HN komentarz"]
    },
    {
      "rank": 2,
      "title": "Server Actions timeout w Vercel Edge Runtime",
      "source_platform": "Dev.to",
      "source_url": "https://dev.to/...",
      "answer_score": 89,
      "accepted": null,
      "post_date": "2026-03-01",
      "technology_version": "Next.js 15.1.2",
      "problem": "Server Actions timeout po 10s na Vercel Edge",
      "solution": "Przenies ciezkie operacje do Route Handlers z maxDuration",
      "gotcha": "Edge Runtime ma limit 25s, ale Server Actions dzialaja pod osobnym limitem",
      "practical_applicability": "HIGH",
      "confidence": 0.85,
      "cross_validated": false,
      "cross_validation_sources": []
    }
  ],
  "patterns_identified": [
    {
      "pattern": "Server Actions caching issues",
      "frequency": "6/10 top wynikow",
      "severity": "HIGH",
      "recommendation": "Testuj cache invalidation w nested layouts przed wdrozeniem"
    }
  ],
  "anti_patterns_flagged": [],
  "metadata": {
    "model": "claude-haiku",
    "tokens_used": 12400,
    "cost_estimate": "$0.012",
    "search_duration_seconds": 8.3
  }
}
```

Kluczowe pola specyficzne dla raportow forumowych:

| Pole | Znaczenie | Dlaczego wazne |
|------|-----------|----------------|
| `answer_score` | Liczba glosow na odpowiedz | Walidacja spolecznosciowa |
| `accepted` | Czy autor pytania zaakceptowal | Potwierdzenie skutecznosci |
| `post_date` | Data publikacji | Aktualnosc rozwiazania |
| `technology_version` | Wersja technologii | Kompatybilnosc |
| `gotcha` | Ukryta pulapka zidentyfikowana | KLUCZOWA wartosc Forums Researchera |
| `cross_validated` | Czy znaleziono potwierdzenie w innym zrodle | Confidence booster |

---

## 5. Czego NIE robi Researcher Forums

Zasada Least Privilege oznacza, ze Researcher Forums ma scisle zdefiniowane granice. Oto czego NIGDY nie robi:

### 5.1 NIE czyta oficjalnej dokumentacji

To domena **Tech Researchera (R-01)**. Forums Researcher czyta, co PRAKTYCY pisza o dokumentacji ("docs mowia X, ale w praktyce Y"), ale nie czyta samej dokumentacji. To kluczowe rozroznienie -- unika duplikacji pracy.

### 5.2 NIE szuka inspiracji wizualnych

To domena **UX Researchera (R-02)**. Nawet jesli na Dev.to pojawi sie artykul o designie, Forums Researcher go pomija -- to nie jego obszar.

### 5.3 NIE analizuje repozytoriow

To domena **GitHub Researchera (R-05)**. Forums Researcher moze trafic na link do repozytorium w odpowiedzi SO, ale NIE analizuje samego repo -- tylko cytuje link i przekazuje sygnal.

### 5.4 NIE podejmuje decyzji

Researcher Forums RAPORTUJE pulapki i rozwiazania. NIE decyduje, czy projekt powinien uzyc technologii X czy Y. Ta decyzja nalezy do Analityka (w ALPHA) lub Planera (w OMEGA).

### 5.5 NIE pisze kodu, nie edytuje plikow, nie uruchamia procesow

READ-ONLY agent. Zero zdolnosci modyfikacji srodowiska. Moze czytac, przeszukiwac i raportowac -- nic wiecej.

```
GRANICE RESEARCHER FORUMS (R-06):

  ROBI:                         NIE ROBI:
  + Szuka rozwiazan na forach    - Nie czyta oficjalnych docs
  + Ocenia jakosc odpowiedzi     - Nie szuka inspiracji wizualnych
  + Wyodrebnia pulapki           - Nie analizuje repozytoriow
  + Identyfikuje wzorce          - Nie podejmuje decyzji
  + Zbiera tutoriale             - Nie pisze/edytuje kodu
  + Raportuje TOP 10             - Nie uruchamia procesow
```

---

## 6. Model i Koszt

### 6.1 Dlaczego Claude Haiku?

Researcher Forums uzywa **Claude Haiku** -- najszybszego i najtanszego modelu w rodzinie Claude:

| Parametr | Wartosc |
|----------|---------|
| **Model** | Claude Haiku |
| **Koszt input** | $0.80 per 1M tokenow |
| **Koszt output** | $4.00 per 1M tokenow |
| **Szybkosc** | Najszybszy w rodzinie Claude |
| **Okno kontekstu** | 200K tokenow |
| **Load** | 50/100 |

Dlaczego nie Sonnet? Dlaczego nie Opus? Bo zadanie Forums Researchera nie wymaga glebokiego rozumowania -- wymaga **szybkiego przeszukiwania, filtrowania i ekstrakcji**. Haiku swietnie sobie radzi z:

- Parsowaniem stron wynikow wyszukiwania
- Ekstrakcja kluczowych informacji z artykulow
- Klasyfikacja odpowiedzi wedlug jakosci
- Generowanie ustrukturyzowanych raportow JSON

### 6.2 Kalkulacja kosztow

```
Typowe zapytanie badawcze:

  Wyszukiwania (WebSearch):     ~4 zapytan
  Pobrania stron (WebFetch):    ~10 stron
  Tokeny input (strony + prompt): ~15,000 tokenow
  Tokeny output (raport JSON):   ~3,000 tokenow

  Koszt input:  15,000 / 1,000,000 * $0.80 = $0.012
  Koszt output:  3,000 / 1,000,000 * $4.00 = $0.012
  ----------------------------------------
  KOSZT CALKOWITY:                           $0.024

  Porownanie:
  - Sonnet: ~$0.11 (4.5x drozej)
  - Opus:   ~$0.38 (16x drozej)
```

### 6.3 Load 50/100 -- Najnizszy wsrod researcherow

Load 50/100 oznacza, ze Researcher Forums jest **najmniej obciazony** wsrod szesciu researcherow:

| Researcher | Load | Dlaczego |
|-----------|-------|---------|
| Tech (R-01) | 55/100 | Duze dokumentacje, benchmarki |
| UX (R-02) | 50/100 | Wizualne zrodla, mniejszy tekst |
| Reddit (R-03) | 55/100 | Dlugie watki, wiele subredditow |
| X (R-04) | 50/100 | Krotkie posty, szybkie skanowanie |
| GitHub (R-05) | 55/100 | Analiza kodu -- token-intensive |
| **Forums (R-06)** | **50/100** | **Zwiezle odpowiedzi Q&A** |

Dlaczego najnizszy? Odpowiedzi na StackOverflow sa z natury ZWIEZLE -- problem + rozwiazanie + kod. Artykuly na Dev.to sa dluzsze, ale Researcher Forums nie czyta calych artykulow -- ekstrahuje kluczowe sekcje. To optymalny profil dla Haiku: szybko, tanio, efektywnie.

---

## 7. Narzedzia

Researcher Forums operuje na zestawie **pieciu narzedzi READ-ONLY**:

### 7.1 Narzedzia podstawowe (Primary)

| Narzedzie | Rola | Przyklad uzycia |
|-----------|------|-----------------|
| **WebSearch** | Wyszukiwanie w internecie | `site:stackoverflow.com Next.js Server Actions timeout` |
| **WebFetch** | Pobieranie tresci stron | Pobranie pelnej tresci odpowiedzi SO z glosami |

WebSearch i WebFetch to **para atakowke** Researchera Forums. WebSearch znajduje, WebFetch pobiera tresc do analizy.

### 7.2 Narzedzia wspomagajace (Supporting)

| Narzedzie | Rola | Przyklad uzycia |
|-----------|------|-----------------|
| **Read** | Czytanie plikow lokalnych | Wczytanie poprzedniego raportu badawczego |
| **Grep** | Przeszukiwanie tresci plikow | Szukanie wzorcow w zebranych danych |
| **Glob** | Wyszukiwanie plikow po wzorcu | Znalezienie raportow z poprzednich badan |

### 7.3 Narzedzia ZABLOKOWANE

| Narzedzie | Status | Powod |
|-----------|--------|-------|
| **Write** | ZABLOKOWANE | Researcher nie modyfikuje srodowiska |
| **Edit** | ZABLOKOWANE | Researcher nie edytuje plikow |
| **Bash** | ZABLOKOWANE | Researcher nie uruchamia procesow |
| **Agent** | ZABLOKOWANE | Researcher nie deleguje do sub-agentow |

> **UWAGA!**
> Brak narzedzia Agent oznacza, ze Researcher Forums NIE MOZE delegowac pracy. Jesli natrafi na problem wymagajacy glebszej analizy (np. repozytorium GitHub wymienione w odpowiedzi SO), MUSI oznaczyc to jako "DO WERYFIKACJI PRZEZ R-05" w raporcie, a nie probowac analizowac samodzielnie. To wlasnie zasada Least Privilege w dzialaniu -- kazdy agent robi TYLKO to, do czego ma narzedzia.

---

## 8. Workflow -- Od pytania do takeaways

### Pipeline 10-krokowy

```
KROK 1: ODBIOR ZAPYTANIA
  Input: Pytanie badawcze od Orkiestratora (narrow context)
  Przyklad: "Jakie sa znane problemy z Server Actions w Next.js 15?"

KROK 2: DEKOMPOZYCJA ZAPYTANIA
  Rozbicie na pod-pytania specyficzne dla platform:
  - SO: "Next.js 15 Server Actions error"
  - SO: "revalidatePath not working Next.js 15"
  - Dev.to: "Next.js 15 Server Actions tutorial gotchas"
  - Medium: "Next.js Server Actions production issues"
  - HN: "Next.js 15 Server Actions problems"

KROK 3: WYSZUKIWANIE (WebSearch)
  Wykonaj 4-6 zapytan z operatorami site:
  - site:stackoverflow.com [query]
  - site:dev.to [query]
  - site:medium.com [query]
  - site:news.ycombinator.com [query]

KROK 4: FILTROWANIE WYNIKOW
  Odrzuc wyniki:
  - Bez odpowiedzi (SO)
  - Starsze niz 18 miesiecy (chyba ze problem evergreen)
  - Z mniej niz 5 glosami (SO)
  - Za paywallem bez alternatywy (Medium)
  - Bez konkretnego kodu/rozwiazania

KROK 5: POBRANIE TRESCI (WebFetch)
  Pobierz pelna tresc TOP 10-15 wynikow
  Ekstrahuj: problem, rozwiazanie, glosy, date, wersje

KROK 6: OCENA JAKOSCI ODPOWIEDZI
  Dla kazdego wyniku ocenier:
  - Answer Quality Score (1-10)
  - Aktualnosc (czy dotyczy biezacej wersji?)
  - Praktycznosc (czy da sie wdrozyc od razu?)
  - Wiarygodnosc (glosy, akceptacja, autor)

KROK 7: IDENTYFIKACJA PULAPEK (GOTCHAS)
  Wyodrebnij ukryte pulapki:
  - "Dziala, ALE..."
  - "Dokumentacja mowi X, ale w praktyce..."
  - "Rozwiazanie A dziala tylko gdy..."
  - "UWAGA: nie uzywaj tego z..."

KROK 8: CROSS-VALIDATION
  Sprawdz, czy ten sam problem/rozwiazanie pojawia sie
  na wiecej niz jednej platformie:
  - SO + Dev.to = confidence 0.85
  - SO + Dev.to + HN = confidence 0.95
  - Tylko 1 zrodlo = confidence 0.60

KROK 9: RANKING I SELEKCJA TOP 10
  Posortuj wg: practical_applicability * confidence
  Wybierz TOP 10 z roznorodnych zrodel

KROK 10: GENEROWANIE RAPORTU JSON
  Output: Ustrukturyzowany raport z TOP 10 takeaways,
  linkami, gotchas i confidence scores
```

### Techniki wyszukiwania specyficzne dla StackOverflow

```
ZAAWANSOWANE OPERATORY SO:

  [tag]             --> [next.js] Server Actions timeout
  is:question       --> is:question [prisma] N+1
  hasaccepted:yes   --> hasaccepted:yes [react] hydration error
  score:50..        --> score:50.. [typescript] generic constraints
  created:2025..    --> created:2025.. [next.js] app router

PRZYKLADY EFEKTYWNYCH ZAPYTAN:
  site:stackoverflow.com [next.js] Server Actions created:2025..
  site:stackoverflow.com hasaccepted:yes [prisma] migration error
  site:stackoverflow.com score:20.. [react] server components hydration
```

---

## 9. Researcher Forums vs inne Researchery

### 9.1 Pelna tabela porownawcza

| Wymiar | Tech (R-01) | UX (R-02) | Reddit (R-03) | X (R-04) | GitHub (R-05) | **Forums (R-06)** |
|--------|------------|-----------|---------------|----------|--------------|-----------------|
| **Pytanie** | "JAK zbudowac?" | "JAK powinno wygladac?" | "Co NAPRAWDE mysla devs?" | "Co jest NOWE?" | "Jak INNI to zbudowali?" | **"Jakie sa PULAPKI?"** |
| **Zrodla** | Docs, benchmarki | Dribbble, Behance | Reddit | X/Twitter | GitHub repos | **SO, Dev.to, Medium, HN** |
| **Format** | Specs, API refs | Screenshoty, mockupy | Watki dyskusji | Tweety, thready | Kod, Issues | **Q&A, artykuly, tutoriale** |
| **Perspektywa** | Producent | Designer | Uzytkownik-krytyk | Influencer/early adopter | Builder | **Praktyk-nauczyciel** |
| **Sila** | Dokladnosc techniczna | Wizualna inspiracja | Surowe opinie | Szybkosc trenddow | Dzialajacy kod | **Rozwiazane problemy** |
| **Slabosc** | Idealizacja | Brak kontekstu tech | Bias, skargi | Szum, hype | Przestarzale repos | **Przestarzale odpowiedzi** |
| **Unikalna wartosc** | "Co mowi producent" | "Jak to robia najlepsi" | "Na co narzekaja" | "Co nadchodzi" | "Co dziala w produkcji" | **"Gdzie inni sie potkneli"** |
| **Load** | 55/100 | 50/100 | 55/100 | 50/100 | 55/100 | **50/100** |
| **Model** | Haiku | Haiku | Haiku | Haiku | Haiku | **Haiku** |

### 9.2 Synergie miedzy researcherami

Forums Researcher najsilniej wspolpracuje z:

1. **Tech Researcher (R-01):** Tech mowi "Oficjalnie nalezy uzyc metody X". Forums odpowiada "Praktycy mowia, ze metoda X ma bug -- uzywaja workaround Y". Razem daja pelny obraz: teoria + praktyka.

2. **GitHub Researcher (R-05):** GitHub mowi "70% top repos uzywa Prisma". Forums odpowiada "Na SO jest 200 pytan o problemy z migracjami Prisma w CI/CD". Razem daja: adopcja + znane problemy.

3. **Reddit Researcher (R-03):** Reddit mowi "Devs narzekaja na Vercel pricing". Forums mowi "Na Dev.to jest 15 artykulow o self-hostingu Next.js jako alternatywie". Razem daja: problem + rozwiazanie.

```
SYNERGIA W PRAKTYCE:

  Tech R-01:   "Next.js 15 ma Server Actions -- oficjalna dokumentacja"
  Reddit R-03: "Deweloperzy narzekaja na performance Server Actions"
  GitHub R-05: "W top repos 60% uzywa Server Actions, 40% Route Handlers"
  Forums R-06: "Na SO 3 zaakceptowane odpowiedzi o timeout fix,
                na Dev.to tutorial o optymalizacji"

  RAZEM: Pelny obraz -- co producent mowi, co devs mysla,
         co dziala w kodzie, jak rozwiazac problemy.
```

---

## 10. Anty-wzorce

### 10.1 Unanswered Echo (Cytowanie Pytan bez Odpowiedzi)

**Objaw:** Raport zawiera linki do pytan na StackOverflow, ktore NIE MAJA odpowiedzi, jako "dowod" na istnienie problemu.

**Skutek:** Falszywy sygnal. Pytanie bez odpowiedzi moze oznaczac, ze problem jest niszowy, zle sformulowany lub juz rozwiazany w innym watku. Cytowanie go jako "znany problem" jest misleading.

```
ZLE:
  Zrodlo: stackoverflow.com/questions/12345
  Status: 0 odpowiedzi, 0 glosow
  Raport: "Znany problem z Server Actions timeout"

DOBRZE:
  Zrodlo: stackoverflow.com/questions/67890
  Status: 3 odpowiedzi, zaakceptowana, 47 glosow
  Raport: "Potwierdzony problem z Server Actions timeout.
           Rozwiazanie: uzyj maxDuration w route config."
```

**Rozwiazanie:** NIGDY nie cytuj pytan bez odpowiedzi jako dowodow. Pytania bez odpowiedzi mozesz wymiienic TYLKO w sekcji "open questions" z nota "BRAK POTWIERDZONEGO ROZWIAZANIA".

### 10.2 Upvote Worship (Glosy jako Dowod Techniczny)

**Objaw:** Traktowanie liczby glosow jako absolutnego wskaznika poprawnosci technicznej.

**Skutek:** Odpowiedz z 500 glosami z 2019 roku moze byc kompletnie nieaktualna w 2026. Glosy mierza POPULARNOSC i HISTORYCZNA przydatnosc, nie AKTUALNA poprawnosc.

```
ZLE:
  "Najlepsza odpowiedz (487 glosow): uzyj componentWillMount()"
  [componentWillMount zostal deprecated w React 16.3 -- 2018!]

DOBRZE:
  "Odpowiedz z najwyzszymi glosami (487) jest PRZESTARZALA
   (componentWillMount, deprecated 2018).
   Aktualne rozwiazanie (23 glosy, 2026): uzyj useEffect()
   lub Server Component z async/await."
```

**Rozwiazanie:** ZAWSZE sprawdzaj DATE odpowiedzi i WERSJE technologii. Odpowiedz z mniejsza liczba glosow, ale nowsza data, czesto jest lepsza.

### 10.3 Medium Paywall Trap (Pulapka Paywalla)

**Objaw:** Cytowanie artykulow z Medium, ktore sa za paywallem, bez sprawdzenia dostepnosci.

**Skutek:** Inni agenci i uzytkownicy nie moga zweryfikowac zrodla. Raport staje sie niesprawdzalny.

```
ZLE:
  Zrodlo: medium.com/@author/amazing-article-12345
  [Artykul za paywallem -- WebFetch moze go pobrac,
   ale inni agenci i uzytkownicy NIE]
  Raport: "Wedlug artykulu na Medium..."

DOBRZE:
  Zrodlo: medium.com/@author/amazing-article-12345
  [PAYWALL DETECTED]
  Alternatywne zrodlo: author.hashnode.dev/same-article
  Raport: "Wedlug artykulu (zrodlo alternatywne: Hashnode)..."

  LUB:
  Raport: "Artykul za paywallem -- BRAK alternatywnego zrodla.
           Confidence obnizony do 0.50."
```

**Rozwiazanie:** Zawsze oznaczaj artykuly Medium jako "PAYWALL POSSIBLE". Szukaj tego samego contentu na blogu autora, Hashnode lub Dev.to. Jesli brak alternatywy -- obniz confidence score.

### 10.4 Outdated Tutorial (Przestarzaly Tutorial)

**Objaw:** Cytowanie tutorialu napisanego dla starej wersji technologii jako aktualnego rozwiazania.

**Skutek:** Wdrozenie rozwiazania, ktore nie dziala z aktualna wersja. Godziny debugowania z powodu deprecated API.

```
ZLE:
  "Tutorial na Dev.to: 'How to use getServerSideProps in Next.js'"
  [getServerSideProps to Pages Router -- Next.js 15 uzywa App Router
   z Server Components]

DOBRZE:
  "Tutorial na Dev.to: 'How to use getServerSideProps in Next.js'"
  [PRZESTARZALY -- dotyczy Pages Router, nie App Router]
  [Aktualny odpowiednik: Server Components z async/await]
  [Confidence: 0.20 -- NIE REKOMENDOWAC]
```

**Rozwiazanie:** ZAWSZE sprawdzaj wersje technologii w tutorialu. Jesli artykul nie podaje wersji -- traktuj z podwyzszonym ryzykiem. Preferuj artykuly z ostatnich 12 miesiecy.

### 10.5 Single Source Syndrome (Syndrom Pojedynczego Zrodla)

**Objaw:** Cala rekomendacja oparta na JEDNYM poscie forumowym, bez cross-validation.

**Skutek:** Brak perspektywy. Jeden post moze byc bledny, specyficzny dla nietypowej konfiguracji lub po prostu byc opinia, nie faktem.

```
ZLE:
  "Wedlug odpowiedzi na SO, Prisma ma problemy z duzymi datasetami.
   Rekomendacja: nie uzywaj Prisma."
  [Na podstawie JEDNEJ odpowiedzi z 3 glosami]

DOBRZE:
  "Prisma a duze datasety -- analiza cross-platform:
   - SO: 4 watki o problemach z >1M rekordow (lacznie 89 glosow)
   - Dev.to: 2 artykuly o optymalizacji Prisma dla duzych datasetow
   - HN: watek z benchmarkami Prisma vs Drizzle (312 punktow)
   Wniosek: Problem potwierdzony w wielu zrodlach.
   Rozwiazanie: Raw SQL dla ciezkich queries, Prisma dla CRUD."
```

**Rozwiazanie:** ZAWSZE szukaj potwierdzenia w minimum 2 zrodlach. Jedno zrodlo = confidence 0.60. Dwa zrodla = 0.85. Trzy+ = 0.95.

> **UWAGA!**
> Anty-wzorce 10.1 i 10.5 sa ze soba powiazane. Single Source Syndrome jest GORSZY gdy to zrodlo to pytanie bez odpowiedzi (Unanswered Echo). Kombinacja obu anty-wzorcow to "cytowanie pytania bez odpowiedzi jako jedynego dowodu na problem" -- absolutny najgorszy scenariusz w raportowaniu forumowym.

---

## 11. Najlepsze Praktyki 2025-2026

### 11.1 Zasada "Accepted + Upvoted > Upvoted Only"

Na StackOverflow odpowiedz zaakceptowana I wysoko glosowana to zloty standard. Ale uwaga: odpowiedz zaakceptowana z niskimi glosami moze byc gorsza niz niezaakceptowana z wysokimi glosami -- bo autor pytania mogl zaakceptowac pierwsza dzialajaca odpowiedz, nie najlepsza.

```
Hierarchia wiarygodnosci SO:
  [1] Zaakceptowana + >50 glosow = ZLOTO
  [2] Niezaakceptowana + >100 glosow = SREBRO (czesto lepsza niz [1])
  [3] Zaakceptowana + <10 glosow = SPRAWDZ (moze byc first-fit)
  [4] Niezaakceptowana + <10 glosow = NISKI CONFIDENCE
  [5] 0 glosow = IGNORUJ (chyba ze jedyna odpowiedz)
```

### 11.2 Zasada "Date > Votes"

W swiecie technologii aktualnosc bije popularnosc. Odpowiedz z 2026 roku i 15 glosami jest prawdopodobnie lepsza niz odpowiedz z 2021 roku i 300 glosami. API sie zmieniaja, frameworki ewoluuja, best practices sie aktualizuja.

### 11.3 Zasada "Cross-Platform = High Confidence"

Jesli ten sam problem i rozwiazanie pojawiaja sie na StackOverflow, Dev.to I Hacker News -- confidence score automatycznie wzrasta do 0.90+. To nie zbieg okolicznosci -- to wzorzec potwierdzony przez rozne spolecznosci.

### 11.4 Zasada "Gotcha > Solution"

Rozwiazania mozna znalezc w dokumentacji. PULAPKI mozna znalezc tylko na forach. Dlatego Researcher Forums powinien PRIORYTETOWO raportowac gotchas -- ukryte ograniczenia, edge cases, niezgodnosci miedzy dokumentacja a rzeczywistoscia.

```
WARTOSC GOTCHAS vs SOLUTIONS:

  Solution: "Uzyj revalidateTag() do cache invalidation"
  --> Mozna to znalezc w docs Next.js

  Gotcha: "revalidateTag() nie dziala w middleware.ts --
           musisz wywolac go z Server Action lub Route Handler"
  --> Tego NIE MA w docs. Znalazl to ktos po 3h debugowania
      i opisal na SO. TO jest wartosc Forums Researchera.
```

### 11.5 Zasada "Version Pinning"

ZAWSZE zapisuj wersje technologii, ktorej dotyczy znalezisko. Rozwiazanie dla Next.js 14 moze nie dzialac w Next.js 15. Rozwiazanie dla React 17 moze byc anty-wzorcem w React 19.

### 11.6 Zasada "Author Reputation Matters"

Na Dev.to i Medium sprawdzaj profil autora:
- Ile artykulow napisal?
- Jakie ma reakcje i komentarze?
- Czy pracuje w branzy?
- Czy inne artykuly sa dobrej jakosci?

Artykul od Senior Engineera z 5-letnim track recordem na Dev.to ma inna wage niz artykul od kogos, kto zalozyl konto wczoraj.

### 11.7 Zasada "Comments Are Gold"

Na StackOverflow komentarze pod odpowiedziami czesto zawieraja WAZNIEJSZE informacje niz sama odpowiedz:

- "Uwaga: to rozwiazanie nie dziala z wersja 15.2+"
- "Prostsze podejscie: uzyj X zamiast Y"
- "Ten kod ma memory leak -- dodaj cleanup w useEffect"

ZAWSZE czytaj komentarze, nie tylko odpowiedzi.

### 11.8 Zasada "Tutorial Freshness Check"

Przed cytowaniem tutorialu sprawdz:

1. **Date publikacji** -- czy <12 miesiecy?
2. **Wersja technologii** -- czy dotyczy aktualnej wersji?
3. **Komentarze** -- czy ktos zglosil, ze tutorial jest przestarzaly?
4. **Alternatywy** -- czy jest nowszy tutorial na ten sam temat?

```
TUTORIAL FRESHNESS CHECKLIST:

  [ ] Data < 12 miesiecy?
  [ ] Wersja technologii aktualna?
  [ ] Brak komentarzy o przestarzalosci?
  [ ] Kod kompiluje sie z aktualnymi zaleznosciami?
  [ ] Autor aktywny (ostatni post < 6 miesiecy)?

  WYNIK:
  5/5 = FRESH (confidence 0.90)
  4/5 = OK (confidence 0.75)
  3/5 = STALE WARNING (confidence 0.50)
  <3  = EXPIRED (nie cytuj)
```

---

## 12. Podsumowanie + Quick Reference Card

### 12.1 Kluczowe wnioski

Researcher Forums (R-06) to **tropiciel pulapek i rozwiazan** w architekturze Gold Standard 2026. Jego unikalna wartosc:

1. **ROZWIAZANE PROBLEMY jako referencje** -- nie teorie, nie opinie, nie trendy, ale zweryfikowane rozwiazania z zaakceptowanymi odpowiedziami
2. **Gotchas i pulapki** -- wiedza, ktorej nie ma w oficjalnej dokumentacji
3. **Cross-platform validation** -- potwierdzenie wzorcow miedzy SO, Dev.to, Medium i HN
4. **Tutorial curation** -- filtrowanie tysiecy artykulow do TOP 10 z konkretnymi takeaways
5. **Practical applicability** -- kazde znalezisko ocenione pod katem mozliwosci natychmiastowego wdrozenia

Dokumentacja mowi, co POWINNO dzialac. Reddit mowi, na co ludzie NARZEKAJA. A fora mowia, jak inni ROZWIAZALI te problemy -- z kodem, kontekstem i glosami spolecznosci.

### 12.2 System Prompt -- wzorzec

```
Jestes Forums Researcher.
Zrodla: StackOverflow, Dev.to, Medium, Hacker News
Szukaj rozwiazan, pulapek, lessons learned.
Output: TOP 10 z takeaways i linkami.
```

### 12.3 Quick Reference Card

```
+===============================================+
|        RESEARCHER FORUMS (R-06)               |
|        Quick Reference Card                   |
+===============================================+
|                                               |
|  WARSTWA:    RESEARCH (Faza 1)                |
|  MODEL:      Claude Haiku                     |
|  KOSZT:      $0.80/$4.00 per 1M tokenow      |
|  LOAD:       50/100 (NAJNIZSZY)               |
|                                               |
|  NARZEDZIA:  WebSearch | WebFetch | Read      |
|              Grep | Glob (READ-ONLY)          |
|                                               |
|  BRAK:       Write | Edit | Bash | Agent      |
|                                               |
|  INPUT:      Pytanie badawcze (narrow context)|
|  OUTPUT:     TOP 10 takeaways z linkami JSON   |
|                                               |
|  SYSTEM PROMPT:                               |
|  "Jestes Forums Researcher.                   |
|   Zrodla: StackOverflow, Dev.to, Medium, HN. |
|   Szukaj rozwiazan, pulapek, lessons learned. |
|   Output: TOP 10 z takeaways i linkami."      |
|                                               |
|  ZRODLA (hierarchia jakosci):                 |
|  [1] StackOverflow -- accepted + upvoted      |
|  [2] Hacker News -- komentarze ekspertow      |
|  [3] Dev.to -- tutoriale + experience reports |
|  [4] Medium -- analizy (uwaga: paywall)       |
|  [5] Hashnode, LogRocket, Smashing Magazine   |
|                                               |
|  RAPORTUJE DO: Research Critic lub            |
|                Orkiestrator                    |
|                                               |
|  GATE:       Critic score <6/10 = REWIZJA     |
|                                               |
|  ZASADY:                                      |
|  - Accepted + Upvoted > Upvoted Only          |
|  - Date > Votes (aktualnosc bije popularnosc) |
|  - Cross-platform = high confidence           |
|  - Gotcha > Solution (pulapki sa cenniejsze)  |
|  - Version pinning (ZAWSZE notuj wersje)      |
|  - Comments are gold (czytaj komentarze!)     |
|  - TOP 10 takeaways (nigdy mniej)             |
|  - Cross-validation (min. 2 zrodla)           |
|  - NIE cytuj pytan bez odpowiedzi             |
|  - NIE podejmuj decyzji -- RAPORTUJ           |
|                                               |
|  ANTY-WZORCE:                                 |
|  x Unanswered Echo (pytania bez odpowiedzi)   |
|  x Upvote Worship (glosy = prawda)            |
|  x Medium Paywall Trap (niesprawdzalnosc)     |
|  x Outdated Tutorial (przestarzale API)        |
|  x Single Source Syndrome (1 zrodlo = bias)   |
|                                               |
|  KLUCZOWE CYTATY:                             |
|  "Dokumentacja mowi happy path. Fora mowia,   |
|   gdzie wszyscy sie POTKNEELI."               |
|  "Accepted + Upvoted = Zloto."                |
|  "Date > Votes -- aktualnosc bije popularnosc"|
|  "Gotcha > Solution -- pulapki sa cenniejsze" |
|                                               |
+===============================================+
```

### 12.4 Slownik pojec (Glossary)

| Termin | Definicja |
|--------|-----------|
| **Accepted Answer** | Odpowiedz na SO oznaczona przez autora pytania jako rozwiazujaca problem |
| **Answer Quality Score** | Ocena jakosci odpowiedzi (1-10) bazowana na glosach, dacie, akceptacji |
| **Cross-Platform Validation** | Potwierdzenie znaleziska w wiecej niz jednym zrodle (SO + Dev.to + HN) |
| **Confidence Score** | Ocena pewnosci znaleziska (0.0-1.0) bazowana na jakosci i ilosci zrodel |
| **Deep Research Belt** | Pas badawczy -- 6 rownoleglych researcherow w architekturze Gold Standard |
| **Gotcha** | Ukryta pulapka, ktora nie wynika z oficjalnej dokumentacji |
| **Lessons Learned** | Wyciagniete lekcje z doswiadczen praktykow -- wzorce sukcesu i porazki |
| **Medium Paywall** | Ograniczenie dostepu do artykulow na Medium (3 darmowe/miesiac) |
| **Narrow Context Principle** | Zasada, ze researcher dostaje TYLKO pytanie, bez kontekstu projektu |
| **Pattern Recognition** | Identyfikacja powtarzajacych sie problemow/rozwiazan miedzy platformami |
| **Practical Applicability** | Ocena, czy znalezisko da sie natychmiast wdrozyc w projekcie |
| **READ-ONLY Agent** | Agent, ktory moze czytac, ale nie moze modyfikowac srodowiska |
| **Research Critic** | Agent bramkowy walidujacy raporty researcherow (score < 6/10 = rewizja) |
| **Signal-to-Noise Ratio** | Stosunek wartosciowych tresci do szumu na danej platformie |
| **Single Source Syndrome** | Anty-wzorzec: oparcie rekomendacji na jednym poscie forumowym |
| **Tutorial Freshness** | Aktualnosc tutorialu -- czy dotyczy biezacej wersji technologii |
| **Unanswered Echo** | Anty-wzorzec: cytowanie pytan bez odpowiedzi jako dowodow |
| **Upvote Worship** | Anty-wzorzec: traktowanie glosow jako absolutnego wskaznika prawdy |
| **Version Pinning** | Praktyka notowania wersji technologii, ktorej dotyczy znalezisko |

---

*Dokument przygotowany na podstawie Gold Standard Agent Architecture 2026, AGENT_TEAMS_CONFIGURATOR v9.0, analiz ALPHA/OMEGA Team oraz badan multi-agent systems 2025-2026. Wszystkie dane o cenach i statystykach aktualne na marzec-kwiecien 2026.*

---

## PROMPT DO PREZENTACJI WIDEO (AI Presenter)

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz **5-7 minutowa prezentacje wideo** o Researcherze Forums (R-06) -- agencie AI wyspecjalizowanym w przeszukiwaniu forow, platform Q&A i blogow technicznych w architekturze wieloagentowej Gold Standard 2026.

**Hook otwierajacy (0:00-0:30):** "Documentation tells you the happy path. Forums tell you where everyone FELL. Dokumentacja mowi ci szczesliwa sciezke. Fora mowia ci, gdzie wszyscy sie potkneli -- bo kazda zaakceptowana odpowiedz na StackOverflow to blizna po rozwiazanym problemie. Agent, ktory te blizny kolekcjonuje i kataloguje, to Researcher Forums."

**Struktura prezentacji:**

1. **(0:30-1:30) Problem: Dokumentacja vs Rzeczywistosc.** Dokumentacja frameworka X mowi: "Uzyj metody Y -- to proste i eleganckie". Ale na StackOverflow jest 47 pytan o problemy z metoda Y, z czego 12 ma zaakceptowane odpowiedzi opisujace workaroundy. Kto mowi prawde? Fora mowia prawde -- bo za kazdym pytaniem stoi REALNY programista, ktory mial REALNY problem w REALNYM projekcie. Pokaz roznice miedzy "dokumentacyjnym happy path" a "forumowa rzeczywistoscia".

2. **(1:30-2:30) Kim jest R-06?** Tropiciel pulapek i rozwiazan. Warstwa RESEARCH, Claude Haiku, load 50/100. Narzedzia READ-ONLY. Przeszukuje StackOverflow, Dev.to, Medium, Hacker News. Dostarcza TOP 10 takeaways z linkami, gotchas i confidence scores. Animacja: agent "nurykujacy" w ocean pytan SO i wylaniajacy sie z TOP 10 perlami.

3. **(2:30-3:30) Ekosystem forow.** Hierarchia zrodel: SO (zaakceptowane odpowiedzi) > HN (eksperckie komentarze) > Dev.to (tutoriale) > Medium (analizy, ale paywall). Animacja: piramida jakosci tresci -- od "zlota" (accepted + upvoted SO answers) do "szumu" (pytania bez odpowiedzi). Pokaz jak Researcher Forums filtruje sygnal od szumu.

4. **(3:30-4:30) Wartosc gotchas.** "Rozwiazania znajdziesz w docs. PULAPKI znajdziesz TYLKO na forach." Pokaz 3 przyklady realnych gotchas: (a) revalidatePath nie dzialajacy w nested layouts, (b) Server Actions timeout na Edge Runtime, (c) Prisma N+1 w Server Components. Kazdy z animowanym porownaniem "docs mowi X" vs "SO mowi Y".

5. **(4:30-5:30) 5 anty-wzorcow.** Unanswered Echo, Upvote Worship, Medium Paywall Trap, Outdated Tutorial, Single Source Syndrome. Kazdy z animowanym przykladem "ZLE vs DOBRZE". Kluczowe: "Odpowiedz z 500 glosami z 2019 moze byc gorsza niz odpowiedz z 15 glosami z 2026."

6. **(5:30-6:30) Synergie z innymi researcherami.** Pokaz jak raporty 6 researcherow skladaja sie w pelny obraz. Tech mowi "uzyj Server Actions", Reddit mowi "devs narzekaja na performance", GitHub mowi "60% top repos uzywa Server Actions", Forums mowi "3 zaakceptowane rozwiazania problemu z timeout". Animacja: 6 puzzli laczacych sie w kompletna mape decyzyjna.

7. **(6:30-7:00) Zamkniecie + Quick Reference Card.** "Dokumentacja mowi happy path. Fora mowia, gdzie wszyscy sie potkneli." Podsumowanie: Accepted + Upvoted = Zloto, Date > Votes, Cross-platform = high confidence, TOP 10 takeaways. Ekran koncowy z Quick Reference Card.

**Wizualizacja:** Ciemny motyw z akcentami StackOverflow orange (#F48024). Animacje odpowiedzi forumowych jako "zamkniete sprawy" w aktach bieglego -- kazda z pieczatka "SOLVED", "ACCEPTED", "VERIFIED". Font monospacjowy dla kodu (JetBrains Mono), sans-serif dla tekstu (Inter). Ikony platform: SO orange, Dev.to czarny, Medium zielony, HN pomaranczowy. Ton: profesjonalny, przystepny, z analogiami z biblioteki i sadu.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz **pionowa infografike** o Researcherze Forums (R-06) w architekturze wieloagentowej Gold Standard 2026.

**Wymiary:** 1080 x 3400 px (format do scrollowania / social media / print).

**Sekcje od gory do dolu:**

1. **HEADER (200px):** Tytul "RESEARCHER FORUMS (R-06)" w duzym foncie. Podtytul: "Tropiciel Pulapek i Rozwiazan". Badge: "RESEARCH Layer | Claude Haiku | Load 50/100". Tlo: ciemny gradient (#1a1a2e --> #16213e) z akcentami StackOverflow orange (#F48024).

2. **EKOSYSTEM FOROW (500px):** Wizualizacja "piramidy jakosci tresci" -- 5 poziomow od gory (najwyzsza jakosc) do dolu (szum):
   - Poziom 1 (szczyt, zloty): SO Accepted + Upvoted (50+ votes)
   - Poziom 2 (srebrny): HN Expert Comments (500+ karma)
   - Poziom 3 (brazowy): Dev.to Top Articles (100+ reactions)
   - Poziom 4 (szary): Medium Publications (uwaga: paywall)
   - Poziom 5 (ciemny, przekreslony): Unanswered Questions, 0-vote posts
   Strzalka od dolu do gory z napisem: "Researcher Forums filtruje W GORE"

3. **ANSWER QUALITY FRAMEWORK (500px):** 5 kafelkow w kolumnie, kazdy z ikona, nazwa metryki, skala oceny:
   - Votes (glosy spolecznosci) -- bar chart
   - Accepted Status (pieczec akceptacji) -- check/x
   - Post Date (aktualnosc) -- timeline
   - Author Reputation (wiarygodnosc) -- gwiazdki
   - Cross-Validation (potwierdzenie miedzyplatformowe) -- ikony platform
   Pod kafelkami: przykladowy Confidence Score = 0.92 z breakdown.

4. **GOTCHA vs SOLUTION (400px):** Wizualne porownanie dwoch sciezek:
   - Lewa strona (niebieska): "SOLUTION -- znajdziesz w docs" --> strzalka do oficjalnej dokumentacji
   - Prawa strona (pomaranczowa, podswietlona): "GOTCHA -- znajdziesz TYLKO na forach" --> strzalka do SO/Dev.to/HN
   Duzy napis w centrum: "Pulapki sa CENNIEJSZE niz rozwiazania"
   3 przyklady gotchas w pomaranczowych ramkach.

5. **POROWNANIE 6 RESEARCHEROW (400px):** Ikony 6 researcherow w rzedzie, kazdy z krotkim opisem perspektywy:
   Tech: "TEORIA" | UX: "DESIGN" | Reddit: "OPINIE" | X: "TRENDY" | GitHub: "KOD" | **Forums: "PULAPKI"** (podswietlony pomaranczowym #F48024)
   Pod ikonami: "Dokumentacja mowi happy path. Fora mowia, gdzie wszyscy sie potkneli."

6. **5 ANTY-WZORCOW (500px):** Pionowa lista z ikonami ostrzezen (pomaranczowe trojkaty):
   1. Unanswered Echo -- "Pytania bez odpowiedzi != dowod"
   2. Upvote Worship -- "500 glosow z 2019 < 15 glosow z 2026"
   3. Medium Paywall Trap -- "Niesprawdzalne zrodlo"
   4. Outdated Tutorial -- "Deprecated API = pulapka"
   5. Single Source Syndrome -- "1 zrodlo = niski confidence"
   Kazdy z krotkim opisem i ikona "ZLE" (czerwona) vs "DOBRZE" (zielona).

7. **KLUCZOWY STAT (200px):** Duzy napis w centrum: **"58M+ odpowiedzi na StackOverflow. 8M+ zaakceptowanych rozwiazan. Forums Researcher je kataloguje."** Pod spodem: "Accepted + Upvoted = Zloto | Date > Votes | Cross-platform = 0.95 confidence"
   Tlo: gradient SO orange (#F48024) --> dark.

8. **FOOTER (200px):** Quick Reference: Model, Load, Narzedzia, System Prompt. Logo: "Gold Standard Agent Architecture 2026". Kolorystyka: ciemny + SO orange (#F48024) + bialy tekst.

**Kolorystyka:** Ciemne tlo (#1a1a2e, #16213e) + StackOverflow orange (#F48024) + bialy tekst (#ffffff) + czerwony (#da3633) dla ostrzezen + zielony (#238636) dla pozytywnych sygnalow. Typografia: JetBrains Mono dla kodu, Inter dla tekstu. Styl: minimalistyczny, techniczny, ikony platform forumowych.
