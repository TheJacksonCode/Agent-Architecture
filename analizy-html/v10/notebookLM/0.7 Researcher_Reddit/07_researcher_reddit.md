# RESEARCHER REDDIT (R-03) -- Agent Wywiadu Spolecznosciowego w Systemach Wieloagentowych AI

## Kompletny Przewodnik Edukacyjny | Gold Standard 2026

**Seria:** Architektura Agentow AI -- Role i Specjalizacje
**Numer roli:** R-03 (Research Layer)
**Model:** Claude Haiku ($0.80/$4.00 per 1M tokenow input/output)
**Warstwa:** RESEARCH (Faza 1)
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Kim jest Researcher Reddit?

Wyobraz sobie dziennikarza sledczego, ktory pracuje pod przykryciem. Nie tego, ktory dzwoni do rzecznika prasowego i dostaje wygladzony komunikat. Tego, ktory wchodzi do fabryki jako zwykly robotnik, siada w stolowce, slucha rozmow i po trzech miesiacach wie wiecej o prawdziwych problemach firmy niz caly zarzad. Rzecznik powie: "Nasz produkt jest swietny, klienci sa zadowoleni." Robotnik w stolowce powie: "Trzecia zmiana narzeka, ze maszyna znow sie zepsula i nikt nie chce naprawiac." Kto ma racje? Obaj -- ale prawda robotnika jest bardziej uzyteczna, jesli chcesz NAPRAWIC problem.

Researcher Reddit (oznaczenie R-03 w architekturze Gold Standard 2026) jest wlasnie takim dziennikarzem sledczym. To agent AI wyspecjalizowany w przeszukiwaniu Reddita -- platformy, na ktorej developerzy mowia to, czego nie powiedza na konferencji, w oficjalnej dokumentacji ani w blogpostu sponsorowanym przez vendora. Reddit to miejsce, gdzie anonimowy programista o nicku `frustrated_dev_2024` napisze: "LangGraph jest swietny koncepcyjnie, ale spedzilismy 3 tygodnie debugujac memory leaki w produkcji i nikt na GitHubie nie odpowiedzial na nasze issue." Tego nie znajdziesz w oficjalnych docs.

Druga analogia: Researcher Reddit to **antropolog badajacy plemienna wiedze**. Antropolog nie pyta wodza plemienia "jak zyje twoj lud?" -- bo wodz powie to, co chce, zeby uslysal swiat. Antropolog siada z ludzmi przy ognisku, obserwuje ich codzienne zachowania, slucha historii opowiadanych po zmroku. Reddit to takie ognisko -- miejsce, gdzie developerzy dzielai sie doswiadczeniami bez filtra PR. Nie mowia co POWINNI robic (jak na konferencji), mowia co NAPRAWDE robia (bo sa anonimowi i nie grozi im konsekwencja).

Trzecia analogia: **tajemniczy klient** (mystery shopper). Wielkie sieci handlowe zatrudniaja osoby, ktore udaja zwyklych klientow, robia zakupy i raportuja REALNE doswiadczenie -- nie to, co pokazuje reklama. Reddit jest platformia, na ktorej tysiace "tajemniczych klientow" technologii codziennie publikuja swoje doswiadczenia: "Probowalem tego frameworka i oto co sie stalo." Te raporty sa nieocenione, bo sa szczere, anonimowe i filtrowane przez system glosowania spolecznosci.

Dlaczego Reddit jest UNIKATOWYM zrodlem informacji w porownaniu z innymi platformami?

| Cecha Reddita | Dlaczego to wazne | Czego nie da Ci inne zrodlo |
|---------------|-------------------|-----------------------------|
| **Anonimowosc** | Ludzie mowia prawde, gdy nie groza im konsekwencje | Oficjalna dokumentacja nigdy nie powie "nasz produkt ma ten bug" |
| **System glosowania (upvote/downvote)** | Spolecznosc filtruje slabe odpowiedzi -- najlepsze tresci wyplywaja na gore | Na blogu kazda opinia wyglada rownie wiarygodnie |
| **Watki dyskusyjne (threads)** | Kontekst i niuanse -- nie pojedyncze twierdzenie, a cala dyskusja z argumentami i kontrargumentami | Tweet ma 280 znakow -- nie ma miejsca na niuanse |
| **Subreddity tematyczne** | Precyzyjna segmentacja -- r/reactjs to INNY tlum niz r/programming | Ogolne wyszukiwanie miesza poziomy zaawansowania |
| **Historycznosc** | Mozna sledzic, jak opinie zmienialy sie w czasie (post z 2023 vs 2026) | Dokumentacja pokazuje tylko aktualny stan |

W systemie wieloagentowym Researcher Reddit jest jednym z **szesciu rownoleglych researcherow** w "Deep Research Belt" -- pasie badawczym, gdzie kazdy specjalista przeszukuje inne zrodla informacji:

| Agent | Oznaczenie | Specjalizacja | Pytanie kluczowe |
|-------|-----------|---------------|-------------------|
| Researcher Tech | R-01 | Dokumentacja, benchmarki, blogi techniczne | "JAK zbudowac?" |
| Researcher UX | R-02 | Dribbble, Behance, Awwwards, Mobbin | "JAK powinno WYGLADAC?" |
| **Researcher Reddit** | **R-03** | **r/webdev, r/programming, r/reactjs, r/SaaS** | **"Co NAPRAWDE mysla devs?"** |
| Researcher X | R-04 | X/Twitter -- trendy, launche, influencerzy | "Co jest NOWE?" |
| Researcher GitHub | R-05 | Repozytoria open-source, architektura, Issues | "Jak INNI to zbudowali?" |
| Researcher Forums | R-06 | StackOverflow, Dev.to, Medium, Hacker News | "Jakie sa PULAPKI?" |

Researcher Reddit zajmuje unikalna nisze: podczas gdy Tech szuka FAKTOW (co mowi dokumentacja), a UX szuka WIZUALNYCH TRENDOW (jak to wyglada) -- Reddit szuka **NIEFILTROWNAYCH OPINII** (co naprawde mysla praktycy). To "ground truth" -- prawda z pierwszej linii frontu, od ludzi ktory faktycznie uzywaja tych technologii na co dzien.

> **CZY WIESZ, ZE...?**
> Anonimowe opinie na Reddicie sa statystycznie bardziej szczere niz opinie podpisane imieniem i nazwiskiem. Badania z zakresu psychologii spolecznej potwierdzaja tzw. "online disinhibition effect" -- ludzie w anonimowym srodowisku mowia prawde, ktora ukrywaliby w kontekscie profesjonalnym. Dla Researchera Reddit to **feature, nie bug** -- wlasnie dlatego Reddit jest bezcennym zrodlem "ground truth". Deweloper, ktory publicznie chwali framework na konferencji, na Reddicie pod anonimem napisze: "Szczerze? Przeszlismy na to pod presja managementu i teraz zarzadzamy 200 obejsc."

---

## 2. Kluczowe Obowiazki

Researcher Reddit ma piec glownych obszarow odpowiedzialnosci. Kazdy z nich jest scisle zdefiniowany -- co robi, czego NIE robi, i jaki output produkuje.

### 2.1 Wyszukiwanie dyskusji i opinii (Discussion Discovery)

Pierwszym zadaniem jest **znalezienie relevantnych dyskusji** na Reddicie dla danego zagadnienia. To nie jest "wpisz temat w wyszukiwarke Reddita." To systematyczny proces:

1. Zidentyfikuj relevantne subreddity (nie wszystkie subreddity sa rowne -- r/experienceddevs to inny poziom niz r/learnprogramming)
2. Sformuluj precyzyjne zapytania wyszukiwania (keyword + subreddit + timeframe)
3. Filtruj wyniki po dacie -- post sprzed 2 lat w technologii AI to jak gazeta sprzed dekady
4. Priorytetyzuj watki z duza liczba komentarzy (duzo komentarzy = kontrowersja lub wazny temat)
5. Sprawdz gilded/awarded posty -- spolecznosc nagrodzila je za wartosc

**Zasada kardynalna:** Szukaj KONTROWERSJI i NARZEKANIA. Jesli wszyscy sa zadowoleni -- to nie jest interesujacy insight. Prawdziwa wartosc lezy w konfliktach opinii, w narzekaniach, w "unpopular opinions." Bo narzekania = szanse na lepsze rozwiazanie.

### 2.2 Analiza sentymentu spolecznosci (Community Sentiment Analysis)

Researcher Reddit nie tylko zbiera posty -- **analizuje nastroj spolecznosci** wobec danej technologii, narzedzia lub podejscia. Sentiment moze byc:

- **POSITIVE** -- spolecznosc chwali, rekomenduje, broni
- **NEGATIVE** -- spolecznosc krytykuje, narzeka, odradza
- **MIXED** -- opinie sa podzielone, trwa aktywna debata
- **SHIFTING** -- sentiment zmienia sie w czasie (np. byl pozytywny w 2024, stal sie negatywny w 2026)

Analiza sentymentu wymaga czytania NIE TYLKO postow, ale tez komentarzy. Czesto post jest pozytywny, ale komentarze pod nim sa pelne krytyki -- i to komentarze mowia prawde, bo autor posta moze miec confirmation bias.

### 2.3 Identyfikacja "ground truth" -- problemow ukrytych w dokumentacji

Oficjalna dokumentacja mowi: "Nasz framework obsluguje 10,000 requestow na sekunde." Reddit mowi: "Probowalem 10K rps i po 15 minutach server zaczal OOM-owac. Dokumentacja o tym milczy." To jest **ground truth** -- prawda, ktora dokumentacja nie ujawnia, bo:

- Vendor nie chce pokazywac slabosci
- Dokumentacja opisuje "happy path," nie edge cases
- Oficjalne benchmarki sa robione na idealnych warunkach
- Changelog nie zawsze mowi o breaking changes, ktore nie sa oficjalnie "breaking"

Researcher Reddit poluje na te ukryte prawdy. Jeden post "Help: my app crashed after upgrading to v3.2" moze byc warty wiecej niz cala sekcja "Getting Started" w dokumentacji.

### 2.4 Zbieranie rekomendacji stacku (Stack Recommendations)

Reddit jest JEDNYM z najlepszych zrodel rekomendacji stacku technologicznego. Dlaczego? Bo ludzie pytaja: "Buduje SaaS do zarzadzania projektami, jaki stack w 2026?" I dostaja 50 odpowiedzi od ludzi, ktory NAPRAWDE zbudowali SaaS-y -- z konkretnymi doswiadczeniami, liczbami, i warnings.

Researcher Reddit zbiera te rekomendacje, identyfikuje WZORCE (jesli 8 z 10 odpowiedzi mowi "Next.js + Supabase" -- to jest wzorzec) i raportuje je z kontekstem: kto rekomenduje, dlaczego, jakie sa zastrzezenia.

### 2.5 Wykrywanie kontrowersji i flamewars (Controversy Detection)

Flamewary na Reddicie -- "React vs Vue vs Svelte" -- nie sa bezuzytecznym szumem. Sa **nieocenionym zrodlem informacji** o trade-offach technologicznych. W flamewars ludzie wyciagaja najsilniejsze argumenty ZA i PRZECIW -- bo walcza o swoja ulubiona technologie. Researcher Reddit analizuje obie strony konfliktu i wyodrebnia merytoryczne argumenty z emocjonalnego szumu.

Kluczowe: flamewar to nie jest "React jest lepszy" vs "Vue jest lepszy". To: "React ma wieksza ecosystem i latwiej znalezc developerow" vs "Vue ma prostszy mental model i krotszy onboarding nowych ludzi w zespole." OBA argumenty sa wazne -- a flamewar je ujawnil.

> **CZY WIESZ, ZE...?**
> W systemie Anthropic Multi-Agent Research System, agenci z dostepem do ROZNYCH zrodel (docs + Reddit + GitHub) produkowali raporty o **45% wyzszej kompletnosci** niz agenci z dostepem do jednego zrodla. Researcher Reddit jest kluczowy dla tej kompletnosci -- dostarcza perspektywe, ktorej NIE MA w oficjalnej dokumentacji. Bez niego system widzi tylko "official story," nie "real story."

---

## 3. Zrodla danych -- Subreddity i ich specjalizacje

Researcher Reddit nie przeszukuje CALEGO Reddita -- to byloby jak szukanie igly w stogu siana. Operuje na precyzyjnie wybranych subredditach, z ktorych kazdy dostarcza inny typ informacji.

### 3.1 Hierarchia subredditow

| Subreddit | Rozmiar | Specjalizacja | Co tu znajdziesz | Poziom zaawansowania |
|-----------|---------|---------------|-------------------|---------------------|
| **r/webdev** | ~2.5M | Ogolny web development | Stack debates, tooling opinions, career advice | Mieszany (junior-senior) |
| **r/programming** | ~6M | Informatyka ogolna | Architecture patterns, CS theory, industry trends | Sredni-Zaawansowany |
| **r/reactjs** | ~400K | Ekosystem React | React-specific issues, Next.js, ecosystem tools | Sredni |
| **r/SaaS** | ~150K | Biznes SaaS | Pricing, go-to-market, stack for startups, revenue | Biznesowy |
| **r/devops** | ~300K | Infrastruktura | CI/CD, deployment, monitoring, Docker, K8s | Zaawansowany |
| **r/experienceddevs** | ~200K | Senior perspektywa | Career wisdom, architecture decisions, leadership | Zaawansowany |
| **r/cscareerquestions** | ~1M | Kariera w IT | Job market, salaries, company reviews, interview prep | Junior-Sredni |

### 3.2 Hierarchia jakosci tresci na Reddicie

Nie wszystkie posty i komentarze sa rowne. Researcher Reddit stosuje hierarchie wiarygodnosci:

```
POZIOM 1 (najwyzszy): Gilded/Awarded odpowiedzi (spolecznosc nagrodzila za wartosc)
POZIOM 2: Wysoko upvotowane odpowiedzi (100+ upvotes)
POZIOM 3: Umiarkowanie upvotowane (20-99 upvotes)
POZIOM 4: Regularne komentarze (1-19 upvotes)
POZIOM 5: Kontrowersyjne (duzo upvotes I downvotes)
POZIOM 6 (najnizszy): Downvotowane komentarze (negatywna karma)
```

**Wazne:** Poziom 5 (kontrowersyjne) nie jest "zly" -- kontrowersja czesto oznacza, ze ktos powiedzial NIEPOPULARNA PRAWDE. Researcher Reddit powinien czytac kontrowersyjne komentarze z uwaga -- moga zawierac insight, ktory wiekszosc nie chce uslyszec.

### 3.3 Jak czytac subreddit efektywnie

Researcher Reddit nie czyta kazdego posta. Stosuje strategiczne filtry:

1. **Sort by: Top (Past Year/Past Month)** -- najwyzej oceniane tresci z ostatniego okresu
2. **Search: [technology] + "moved from" / "switched to" / "regret"** -- szuka historii migracji i rozczarowan
3. **Flair: [Discussion] / [Rant] / [Ask]** -- flairs pomagaja identyfikowac typ tresci
4. **Komentarze > Post** -- prawdziwa wartosc jest w komentarzach, nie w tytule posta

**Przykladowe zapytania WebSearch:**
```
site:reddit.com r/webdev "LangGraph" 2026
site:reddit.com r/programming "multi-agent" problems
site:reddit.com r/reactjs "switched from" Next.js 2025 2026
site:reddit.com r/SaaS "tech stack" recommendation 2026
site:reddit.com r/experienceddevs "regret" framework choice
```

### 3.4 Czego NIE szukac na Reddicie

Reddit jest swietny dla OPINII, ale NIE jest zrodlem FAKTOW. Researcher Reddit nigdy nie traktuje posta na Reddicie jako dowodu technicznego:

- "Reddit user mowi, ze React jest szybszy niz Vue" -- to OPINIA, nie benchmark
- "Reddit user podaje kod, ktory rozwiazuje problem" -- to SUGESTIA, nie zweryfikowane rozwiazanie
- "Reddit user mowi, ze firma X zwalnia 50% ludzi" -- to PLOTKA, nie fakt

Fakty weryfikuje Researcher Tech (dokumentacja, benchmarki). Reddit dostarcza PERSPEKTYWE i KONTEKST.

> **UWAGA!**
> Researcher Reddit NIGDY nie traktuje pojedynczego komentarza na Reddicie jako prawdy absolutnej. Pojedynczy komentarz to JEDEN glos -- moze byc genialny lub calkowicie mylny. Wartosc Reddita lezy we WZORCACH: jesli 15 roznych osob w 8 roznych watkach mowi to samo -- to jest wzorzec warty zaraportowania. Jeden komentarz to anegdota. Pietnascie komentarzy to trend.

---

## 4. Format raportu -- Co dostarcza Researcher Reddit

Kazdy output Researcher Reddit to **ustrukturyzowany raport sentymentu spolecznosci** w formacie JSON. Nie wolny tekst, nie lista linkow. Precyzyjny, parsowalny dokument z linkami zrodlowymi.

### Szablon raportu

```json
{
  "agent_id": "R-03",
  "report_type": "community_sentiment",
  "research_question": "Jaki framework multi-agent preferuje spolecznosc Reddit?",
  "timestamp": "2026-04-01T10:30:00Z",
  "token_usage": {
    "input": 15000,
    "output": 7500,
    "total": 22500
  },
  "subreddits_searched": [
    "r/webdev",
    "r/programming",
    "r/reactjs",
    "r/devops"
  ],
  "findings": [
    {
      "rank": 1,
      "topic": "LangGraph -- stroma krzywa uczenia",
      "sentiment": "MIXED",
      "frequency": "HIGH",
      "summary": "Spolecznosc uznaje LangGraph za potezny, ale narzeka na zlozonosc. Poczatkujacy czesto sie poddaja po 2-3 dniach. Experienced devs chwala po przejsciu krzywej uczenia.",
      "representative_quotes": [
        "LangGraph is powerful but the learning curve is STEEP. Took me 3 weeks to feel comfortable.",
        "Once you get it, LangGraph is amazing. But getting there is pain.",
        "We switched from CrewAI to LangGraph and regretted it for 2 months. Now we love it."
      ],
      "source_urls": [
        "https://reddit.com/r/programming/comments/example1",
        "https://reddit.com/r/webdev/comments/example2"
      ],
      "upvote_range": "45-320",
      "post_dates": "2025-11 to 2026-03",
      "confidence_score": 0.82
    },
    {
      "rank": 2,
      "topic": "CrewAI -- szybki prototyping, problemy w produkcji",
      "sentiment": "SHIFTING",
      "frequency": "MEDIUM",
      "summary": "Pozytywny sentiment w 2024-2025 zmienia sie w ostroznosc w 2026. Spolecznosc raportuje problemy z kosztami tokenow w produkcji.",
      "representative_quotes": ["..."],
      "source_urls": ["..."],
      "upvote_range": "30-180",
      "post_dates": "2025-06 to 2026-02",
      "confidence_score": 0.75
    },
    {
      "rank": 3,
      "topic": "Vue 3 -- prostszy onboarding",
      "sentiment": "POSITIVE",
      "frequency": "HIGH",
      "summary": "r/webdev konsekwentnie chwali Vue 3 za mniej boilerplate i szybszy onboarding nowych devow. Czesty argument w debacie React vs Vue.",
      "representative_quotes": [
        "r/webdev: Vue 3 prostszy, mniej boilerplate, szybszy onboarding nowych devow."
      ],
      "source_urls": ["..."],
      "upvote_range": "50-400",
      "post_dates": "2025-01 to 2026-03",
      "confidence_score": 0.88
    }
  ],
  "patterns_detected": [
    "Rosnacy sceptycyzm wobec frameworkow multi-agent -- czesc spolecznosci preferuje custom code",
    "Silna korelacja miedzy rozmiarem firmy a wyborem: startup = prostszy tool, enterprise = LangGraph",
    "Powtarzajacy sie motyw: 'documentation lies by omission' -- docs nie mowia o edge cases"
  ],
  "controversies": [
    "React vs Vue: 3 flamewary w Q1 2026, 500+ komentarzy lacznie",
    "Multi-agent vs single-agent: aktywna debata w r/programming"
  ],
  "recommendations": [
    "LangGraph dla zespolow z doswiadczeniem -- spolecznosc potwierdza wartosc PO przejsciu krzywej uczenia",
    "Vue 3 jako alternatywa React dla mniejszych zespolow -- konsensus r/webdev"
  ],
  "gaps": [
    "Brak danych o Claude Agent SDK na Reddicie -- zbyt nowy produkt",
    "r/SaaS ma malo dyskusji technicznych -- dominuje biznes"
  ],
  "freshness": "2026-Q1"
}
```

### Kluczowe pola raportu

| Pole | Opis | Wymagane? |
|------|------|-----------|
| `agent_id` | Zawsze "R-03" | TAK |
| `report_type` | Zawsze "community_sentiment" | TAK |
| `research_question` | Dokladne pytanie badawcze | TAK |
| `subreddits_searched` | Lista przeszukanych subredditow | TAK |
| `findings` | TOP 10 insightow z linkami | TAK |
| `sentiment` | POSITIVE/NEGATIVE/MIXED/SHIFTING | TAK |
| `frequency` | Jak czesto temat sie pojawia: HIGH/MEDIUM/LOW | TAK |
| `representative_quotes` | Cytaty z postow (dosowne) | TAK |
| `source_urls` | URL kazdego zrodla | TAK |
| `patterns_detected` | Wzorce wykryte miedzy wieloma wattkami | TAK |
| `controversies` | Aktywne debaty i flamewary | TAK |
| `confidence_score` | 0.0-1.0 -- pewnosc znaleziska | TAK |
| `gaps` | Czego NIE udalo sie znalezc | TAK |

**Pole `patterns_detected` jest krytyczne.** Pojedynczy post to anegdota. Wzorzec miedzy wieloma postami to insight. Researcher Reddit musi jawnie identyfikowac wzorce -- to jest jego glowna wartosc dodana.

> **CZY WIESZ, ZE...?**
> System glosowania Reddita (upvote/downvote) dziala jak **crowdsourced peer review**. Post z 300 upvotes i 15 awards zostal de facto zweryfikowany przez setki osob. To nie jest tak wiarygodne jak peer-reviewed badanie naukowe, ale jest ZNACZNIE bardziej wiarygodne niz pojedynczy blogpost lub tweet. Dlatego pole `upvote_range` w raporcie jest wazne -- daje kontekst ile osob "zaglosowalo" za danym insightem.

---

## 5. Czego Researcher Reddit NIE robi

Rownie wazne jak obowiazki sa **jawne wykluczenia**. Researcher Reddit ma scisle ograniczony zakres -- i to celowo.

### 5.1 NIE czyta oficjalnej dokumentacji

Dokumentacja to domena **Researcher Tech (R-01)**. Researcher Reddit szuka OPINII o dokumentacji ("docs are misleading," "getting started guide is outdated"), ale sam NIE czyta docs. Jesli Reddit user mowi "dokumentacja LangGraph jest slaba" -- Researcher Reddit to raportuje. Czy dokumentacja NAPRAWDE jest slaba? To weryfikuje Tech.

### 5.2 NIE szuka wizualnych inspiracji

Dribbble, Behance, Awwwards -- to domena **Researcher UX (R-02)**. Researcher Reddit moze trafic na post o UI/UX ("why does every SaaS look the same?"), ale nie analizuje wizualnych trendow. Raportuje OPINIE o designie, nie sam design.

### 5.3 NIE analizuje kodu zrodlowego

Repozytoria GitHub, architektura plikow, analiza Issues -- to domena **Researcher GitHub (R-05)**. Jesli ktos na Reddicie wkleja snippet kodu, Researcher Reddit traktuje go jako czesc opinii, nie jako zweryfikowane rozwiazanie techniczne.

### 5.4 NIE podejmuje decyzji

Researcher Reddit **rekomenduje**, ale nie **decyduje**. Moze powiedziec: "Spolecznosc r/webdev silnie faworyzuje Vue 3 nad React dla malych zespolow." Ale decyzja, czy projekt uzyje Vue czy React, nalezy do Orkiestratora. Researcher dostarcza dane -- decyzja jest gdzie indziej.

### 5.5 NIE komunikuje sie bezposrednio z innymi researcherami

To fundamentalna zasada izolacji w architekturze Gold Standard 2026. Researcher Reddit NIE wie, co znalazl Researcher Tech. NIE wie, co raportuje Researcher UX. Kazdy researcher pracuje niezaleznie, w swoich "rewirach" -- a ich raporty sa syntetyzowane przez **Syntetyka** lub weryfikowane przez **Research Critica**. Ta izolacja zapobiega:

- **Confirmation bias** -- gdyby Reddit wiedzial, ze Tech rekomenduje LangGraph, moze podswiadomie szukac pozytywnych opinii o LangGraph
- **Duplikacji pracy** -- jasne granice = brak overlapping search
- **Efektowi echa** -- niezalezne raporty daja pelniejszy obraz

> **UWAGA!**
> Zasada izolacji miedzy researcherami to nie jest biurokratyczne ograniczenie -- to **mechanizm zapewniania jakosci**. W badaniach naukowych nazywa sie to "double-blind" -- recenzent nie wie, kto jest autorem pracy. W systemie wieloagentowym, researcher nie wie, co znalezl inny researcher. Dzieki temu ich raporty sa niezalezne, a ewentualne sprzecznosci (Tech mowi "uzyj X", Reddit mowi "X ma problemy") sa CENNE -- ujawniaja pelna prawde, nie sanitized version.

---

## 6. Model i Koszt -- Dlaczego najtanszy model?

### 6.1 Claude Haiku -- ekonomia skali

Researcher Reddit uzywa **Claude Haiku** -- najtanszego modelu w ofercie Anthropic. Ceny (marzec 2026):

| Model | Input (per 1M tokenow) | Output (per 1M tokenow) | Zastosowanie |
|-------|------------------------|------------------------|--------------|
| Claude Opus | $15.00 | $75.00 | Orkiestrator, Syntetyk |
| Claude Sonnet | $3.00 | $15.00 | Buildery, Research Critic |
| **Claude Haiku** | **$0.80** | **$4.00** | **Researchery (Tech, UX, Reddit...), QA** |

Researcher Reddit kosztuje **~18.75x mniej na input** niz Opus i **~3.75x mniej** niz Sonnet.

### 6.2 Dlaczego Haiku wystarczy do czytania Reddita?

Praca Researcher Reddit to zadanie **high-volume, low-complexity**:

- **Wysoki wolumen tekstu:** Reddit to platforma tekstowa. Czytanie watkow z 50-200 komentarzami generuje duzo tokenow wejsciowych. Haiku radzi sobie z tym efektywnie.
- **Niska zlozonosc rozumowania:** W przeciwienstwie do Orkiestratora (ktory podejmuje strategiczne decyzje) czy Research Critica (ktory musi wykrywac sprzecznosci miedzy raportami), Researcher Reddit wykonuje stosunkowo proste operacje: wyszukaj watki, przeczytaj komentarze, wyodrebnij sentiment, zidentyfikuj wzorce, sformatuj raport.
- **Ustrukturyzowany output:** Format JSON z predefiniowanymi polami (sentiment, frequency, quotes, URLs) to idealny task dla Haiku -- wymaga precyzji, nie kreatywnosci.
- **Tekst, nie kod:** Reddit to glownie tekst naturalny, nie kod zrodlowy. Haiku jest doskonaly w analizie tekstu naturalnego.

### 6.3 Typowy koszt jednego runu

```
Typowy run Researcher Reddit:
  Input:  ~15,000 tokenow x $0.80/1M  = $0.012
  Output: ~7,500 tokenow  x $4.00/1M  = $0.030
  RAZEM: ~$0.04 per zadanie

Dla porownania na Opus:
  Input:  ~15,000 tokenow x $15.00/1M = $0.225
  Output: ~7,500 tokenow  x $75.00/1M = $0.563
  RAZEM: ~$0.79 per zadanie

OSZCZEDNOSC: ~$0.75 (95%) per run
```

Przy typowym "Research Swarm" (6 researcherow rownolegle), oszczednosc na Haiku vs Opus siega **kilku dolarow per runda badawcza**. Przy wielokrotnych rundach (Critic zada rewizji) -- roznica jest drastyczna.

### 6.4 Kiedy Haiku moze nie wystarczyc?

- Watki z **bardzo duzym kontekstem** (mega-threads z 500+ komentarzami) -- moze wymagac podzialu na czesci
- Analiza **wielojezycznych** watkow (np. r/de_EDV -- niemiecki subreddit o IT)
- Zadania wymagajace **glebokie go rozumowania sprzecznosci** miedzy wieloma zrodlami -- wtedy lepszy Sonnet

W takich przypadkach mozna **upgrade'owac do Sonnet** punktowo, zachowujac reszte researcherow na Haiku ("smart routing").

> **UWAGA!**
> Nie myl taniosci modelu z niska jakoscia wynikow. Haiku to model **zoptymalizowany pod predkosc i koszt**, nie "gorszy model." Dla zadan wyszukiwania i ekstrakcji opinii z Reddita jego performance jest porownywalna z drozsymi modelami. To jak uzywanie drona zwiadowczego zamiast mysliwca do rozpoznania terenu -- dron jest tanszy, szybszy i latwiejszy do wyslania, a zdjecia robi rownie dobre.

---

## 7. Narzedzia -- Arsenale Zwiadowcy Spolecznosciowego

Researcher Reddit ma celowo minimalny zestaw narzedzi. To nie jest ograniczenie -- to fundamentalna decyzja projektowa, ktora wymusza dyscypline roli.

### Narzedzia PODSTAWOWE (Primary)

| Narzedzie | Co robi | Jak Researcher Reddit tego uzywa |
|-----------|---------|----------------------------------|
| **WebSearch** | Przeszukuje internet | Kluczowe narzedzie -- zapytania `site:reddit.com r/webdev [temat]`, szukanie dyskusji, kontrowersji, rekomendacji |
| **WebFetch** | Pobiera tresc strony | Odczytywanie pelnych watkow Reddit, komentarzy, podwatkow -- nie tylko tytulowy post, ale cala dyskusja |

### Narzedzia WSPIERAJACE (Supporting)

| Narzedzie | Co robi | Kiedy uzywane |
|-----------|---------|---------------|
| **Read** | Czyta pliki lokalne | Gdy musi zapoznac sie z MANIFEST.md lub kontekstem projektu udostepnionym przez Orkiestratora |
| **Grep** | Przeszukuje pliki po wzorcach | Gdy szuka konkretnych slow kluczowych w istniejacych raportach |
| **Glob** | Szuka plikow po nazwie | Gdy musi znalezc pliki raportu w projekcie |

### Narzedzia ZAKAZANE

| Narzedzie | Dlaczego Researcher Reddit tego NIE MA |
|-----------|----------------------------------------|
| **Write** | Pisanie plikow = tworzenie tresci, nie zbieranie opinii |
| **Edit** | Edycja plikow = modyfikowanie kodu, nie czytanie Reddita |
| **Bash** | Uruchamianie komend = wykonywanie pracy, nie research |
| **Agent** | Uruchamianie subagentow = zarzadzanie, nie research |

### Filozofia: narzedzia definiuja role

Zasada obowiazujaca w calym systemie wieloagentowym: **jesli dasz agentowi narzedzie, uzyje go**. Jesli Researcher Reddit dostanie narzedzie Write, zacznie sam pisac podsumowania zamiast dostarczac surowe dane z Reddita. Jesli dostanie Agent, zacznie delegowac do podagentow zamiast samemu czytac watki. Ograniczenie narzedzi to mechanizm wymuszajacy dyscypline -- Researcher Reddit jest **read-only agent**. Moze CZYTAC internet, ale nie moze go ZMIENIAC. Ta zasada (Principle of Least Privilege) jest fundamentem bezpieczenstwa w systemach wieloagentowych.

### Dobre vs zle uzycie WebSearch

```
DOBRE zapytania:
  site:reddit.com r/webdev "LangGraph" 2026 problems
  site:reddit.com r/reactjs "Next.js vs Remix" switched
  site:reddit.com r/SaaS "tech stack" solo founder 2026
  site:reddit.com r/experienceddevs "regret" architecture decision
  site:reddit.com r/devops "CI/CD" frustration 2026

ZLE zapytania:
  "best framework reddit" (zbyt ogolne, brak subreddita, brak daty)
  "reddit programming" (zbyt szerokie, brak kontekstu)
  "react opinion" (brak site:reddit.com, brak timeframe)
```

> **CZY WIESZ, ZE...?**
> Badania Anthropic z 2025 roku pokazaly, ze **projektowanie interfejsow narzedzi** (tool design) jest rownie wazne jak prompt engineering. Researcher Reddit z WebSearch bez precyzyjnego opisu moze konczyc szukajac "reddit programming" zamiast "site:reddit.com r/webdev 'Next.js production issues' 2026." Dlatego system prompt Researcher Reddit zawiera KONKRETNE przyklady zapytan i subredditow -- zeby model wiedzial, jak efektywnie uzywac narzedzia.

---

## 8. Workflow -- Od subreddita do raportu

### 8.1 Cykl zycia zadania badawczego

```
Krok 1: ODBIORCA PYTANIA
  Orkiestrator --> Researcher Reddit
  Input: {"question": "Jaki framework multi-agent preferuje spolecznosc?"}
  TYLKO pytanie. Brak kontekstu projektu. Narrow Context Principle.

Krok 2: IDENTYFIKACJA SUBREDDITOW
  Researcher Reddit mapuje pytanie na relevantne subreddity:
  - "multi-agent framework" --> r/programming, r/webdev
  - "developer experience" --> r/experienceddevs
  - "SaaS context" --> r/SaaS

Krok 3: WYSZUKIWANIE (WebSearch)
  Serie precyzyjnych zapytan:
  - site:reddit.com r/programming "multi-agent" framework 2026
  - site:reddit.com r/webdev "LangGraph" vs "CrewAI"
  - site:reddit.com r/experienceddevs "AI agent" production experience
  - site:reddit.com r/SaaS "AI framework" stack choice

Krok 4: CZYTANIE WATKOW (WebFetch)
  Dla top 10-15 wynikow: pobranie pelnych watkow
  Czytanie NIE TYLKO posta, ale WSZYSTKICH komentarzy
  Zwrocenie uwagi na gilded/awarded odpowiedzi

Krok 5: EKSTRAKCJA INSIGHTOW
  Z kazdego watku wyodrebnienie:
  - Glowna teza posta
  - Najwyzej ocenione komentarze
  - Kontrowersyjne opinie
  - Konkretne doswiadczenia ("we used X for 6 months and...")

Krok 6: WYKRYWANIE WZORCOW
  Porownanie insightow miedzy watkami:
  - Czy ten sam problem pojawia sie w wielu watkach?
  - Czy ta sama rekomendacja wraca wielokrotnie?
  - Czy sentiment zmienia sie w czasie?

Krok 7: OCENA SENTYMENTU
  Dla kazdego finding: POSITIVE / NEGATIVE / MIXED / SHIFTING
  Bazowane na proporcji pozytywnych vs negatywnych komentarzy
  Uwzglednienie upvotow jako wagi

Krok 8: OCENA PEWNOSCI
  Kazdy finding dostaje confidence_score:
  - 0.9+: Wzorzec potwierdzony w 10+ watkach, 100+ upvotes lacznie
  - 0.7-0.89: Wzorzec w 5-9 watkach, spojny sentiment
  - 0.5-0.69: Powtarza sie w 2-4 watkach, ale male probki
  - <0.5: Pojedynczy komentarz lub spekulacja

Krok 9: FORMATOWANIE RAPORTU (JSON)
  TOP 10 insightow z linkami
  Patterns detected, controversies, recommendations, gaps

Krok 10: DOSTARCZENIE
  Researcher Reddit --> Research Critic (walidacja)
  lub Researcher Reddit --> Orkiestrator (jesli brak Critica)
```

### 8.2 Przyklad z zycia -- case study

Orkiestrator wysyla pytanie: "Jaki frontend framework wybrać dla nowej aplikacji edukacyjnej?"

**Researcher Reddit przeprowadza nastepujacy research:**

1. Szuka na r/webdev: "frontend framework 2026 education app"
2. Szuka na r/reactjs: "Next.js for educational platform"
3. Szuka na r/programming: "React vs Vue vs Svelte 2026"
4. Czyta 12 watkow, 180+ komentarzy
5. Wykrywa wzorzec: "Vue 3 prostszy, mniej boilerplate, szybszy onboarding nowych devow"
6. Wykrywa kontrowersje: "React lepszy ekosystem, ale Vue prostszy mental model"
7. Raportuje finding: `"r/webdev: Vue 3 prostszy, mniej boilerplate, szybszy onboarding nowych devow"`

Ten insight trafia do Syntetyka, ktory laczy go z raportem Researcher Tech (benchmarki) i Researcher GitHub (repozytoria) -- tworzac pelny obraz.

### 8.3 Typowy czas i koszt zadania

| Metryka | Wartosc |
|---------|---------|
| Sredni czas wykonania | 45-120 sekund |
| Srednie zuzycie tokenow (input) | 12,000-20,000 |
| Srednie zuzycie tokenow (output) | 5,000-10,000 |
| Sredni koszt per zadanie | $0.02-0.05 |
| Typowa liczba WebSearch calls | 4-8 |
| Typowa liczba WebFetch calls | 5-10 |
| Typowa liczba przeczytanych watkow | 10-15 |
| Typowa liczba przeanalizowanych komentarzy | 100-300 |

### 8.4 Interakcja z Research Critic

Po dostarczeniu raportu, **Research Critic** waliduje wyniki:

| Kryterium | Waga | Co sprawdza |
|-----------|------|-------------|
| Completeness | 25% | Czy pokryto wiele subredditow? Czy TOP 10 jest pelne? |
| Accuracy | 25% | Czy cytaty sa dokladne? Czy linki dzialaja? |
| Relevance | 20% | Czy findings odpowiadaja na pytanie badawcze? |
| Freshness | 20% | Czy posty sa z ostatnich 12 miesiecy? |
| Actionability | 10% | Czy rekomendacje sa konkretne i uzyteczne? |

**Score ponizej 6/10 = REWIZJA.** Typowe powody odrzucenia raportu Reddit:
- Za malo subredditow przeszukanych (tylko 1-2 zamiast 4-6)
- Brak wzorcow -- lista pojedynczych opinii zamiast syntezy
- Stare posty (sprzed >12 miesiecy) bez oznaczenia daty
- Brak linkow zrodlowych
- Ignorowanie kontrowersji (tylko pozytywne lub tylko negatywne opinie)

> **CZY WIESZ, ZE...?**
> Caly workflow Researcher Reddit -- od otrzymania pytania do dostarczenia raportu -- trwa typowo **45-120 sekund**. Agent wykonuje 4-8 wywolan WebSearch i 5-10 wywolan WebFetch, analizuje 100-300 komentarzy i generuje ustrukturyzowany raport. Ludzki researcher potrzebowalby na analogiczne zadanie **4-8 godzin** przegladania Reddita, robienia notatek i pisania podsumowania. To jest roznica rzedu 100-200x w predkosci.

---

## 9. Researcher Reddit vs inne Researchery

### 9.1 Tabela porownawcza szostki badawczej

| Wymiar | Tech (R-01) | UX (R-02) | **Reddit (R-03)** | X (R-04) | GitHub (R-05) | Forums (R-06) |
|--------|-------------|-----------|-------------------|----------|---------------|---------------|
| **Cel** | Fakty techniczne | Trendy design | **Opinie deweloperow** | Szybkie trendy | Dzialajacy kod | Tutoriale, lessons learned |
| **Zrodla** | Docs, benchmarki | Dribbble, Behance | **r/webdev, r/programming** | X/Twitter | Repozytoria OS | SO, Dev.to, Medium |
| **Pytanie kluczowe** | "JAK zbudowac?" | "JAK powinno WYGLADAC?" | **"Co NAPRAWDE mysla devs?"** | "Co jest NOWE?" | "Jak INNI to zbudowali?" | "Jakie sa PULAPKI?" |
| **Typ outputu** | Porownanie 3+ opcji | Mood board 5+ referencji | **TOP 10 insightow z linkami** | TOP 10 postow z kontekstem | TOP 5 repo z analiza | TOP 10 z takeaways |
| **Wiarygodnosc** | Wysoka | Srednia | **Srednia (wzorce > anegdoty)** | Niska | Wysoka (kod) | Srednia |
| **Sila** | Oficjalne dane | Wizualna inspiracja | **Szczerosc, anonimowosc** | Predkosc, real-time | Kod produkcyjny | Szczegolowe how-to |
| **Slabosc** | Brak opinii users | Koncepty vs realnosc | **Szum, trolling, bias** | Krotki format | Brak kontekstu biznes. | Przestarzale odpowiedzi |
| **Model** | Haiku | Haiku | **Haiku** | Haiku | Haiku | Haiku |
| **Load** | 55% | 50% | **50%** | 45% | 55% | 50% |

### 9.2 Synergie miedzy researcherami

Researchery NIE komunikuja sie bezposrednio miedzy soba. Ale ich wyniki sa **komplementarne** i weryfikuja sie wzajemnie:

- **Tech mowi "uzyj LangGraph"** + **Reddit mowi "LangGraph ma stroma krzywa uczenia"** = pelny obraz (oficjalna rekomendacja + realne doswiadczenie)
- **Tech mowi "React 19 SSR jest szybki"** + **Reddit mowi "r/webdev: Vue 3 prostszy, mniej boilerplate"** = decyzja zalezy od priorytetow (performance vs developer experience)
- **GitHub mowi "repo X ma 50K stars"** + **Reddit mowi "nikt z moich znajomych nie uzywa X w produkcji"** = stars != adopcja (popularnosc vs realne uzycie)
- **UX mowi "dark mode jest trendem"** + **Reddit mowi "r/webdev: wszyscy robia dark mode, ale uzytkownicy wlaczaja light mode"** = trend vs preference uzytkownikow

To **Research Critic** lub **Syntetyk** wykrywa te sprzecznosci i tworzy pelny obraz. Researchery sa celowo izolowane -- kazdy patrzy swoimi oczami.

### 9.3 Unikalna wartosc Researcher Reddit

Co TYLKO Researcher Reddit moze dostarczyc (czego nie daja inni)?

1. **Niefiltrowane opinie** -- zadne inne zrodlo nie daje dostepu do tak szczerej krytyki technologii
2. **Realne doswiadczenia migracji** -- "switched from X to Y and here's what happened" -- te historie sa bezcenne
3. **Ukryte problemy** -- bugi, edge cases, performance issues ktore dokumentacja pomija
4. **Sentyment spolecznosci** -- czy technologia jest "on the rise" czy "on the decline" w percepcji developerow
5. **Kontrowersje i debaty** -- flamewary ujawniaja trade-offy, o ktorych oficjalne zrodla milcza

> **UWAGA!**
> Researcher Reddit NIGDY nie zastapi Researcher Tech. Opinie na Reddicie to nie sa fakty -- to percepcje, doswiadczenia, uprzedzenia. Post "LangGraph is terrible" moze byc napisany przez kogos, kto spedzil 2 godziny zamiast 2 tygodnie na nauce. Reddit daje PERSPEKTYWE -- ale FAKTY nadal musza pochodzic z oficjalnej dokumentacji i benchmarkow. Dlatego oba researchery sa potrzebne: Tech dla prawdy obiektywnej, Reddit dla prawdy subiektywnej. Razem daja PELNA prawde.

---

## 10. Anty-wzorce -- Czego unikac

Kazdy z ponizszych anty-wzorcow zostal zaobserwowany w realnych wdrozeniach systemow wieloagentowych i jest udokumentowany w materialach Gold Standard 2026.

### 10.1 Single Comment Truth (Pojedynczy komentarz jako prawda)

**Objaw:** Researcher Reddit traktuje jeden komentarz z 3 upvotami jako "prawde spolecznosci" i bazuje na nim caly finding.

**Skutek:** Raport oparty na anegdocie, nie na wzorcu. Rekomendacja moze byc calkowicie mylna -- jeden frustrowany dev nie reprezentuje calej spolecznosci.

**Rozwiazanie:** Minimum **3 niezalezne zrodla** (rozne watki, rozne subreddity) potwierdzajace ten sam insight. Jeden komentarz = anegdota. Trzy komentarze z roznych watkow = poczatek wzorca. Dziesiec = solidny insight.

```
ZLE:
  1 komentarz z r/webdev: "LangGraph is terrible"
  --> Finding: "Spolecznosc odrzuca LangGraph"

DOBRZE:
  5 watkow z r/webdev, r/programming, r/experienceddevs
  Lacznie 12 komentarzy o trudnosciach z LangGraph
  --> Finding: "Powtarzajacy sie wzorzec: stroma krzywa uczenia LangGraph
      (sentiment MIXED -- krytyka onboardingu, ale pozytywne opinie
      po przejsciu krzywej)"
```

### 10.2 Outdated Thread (Ignorowanie daty postow)

**Objaw:** Researcher Reddit raportuje insight z watku sprzed 2 lat jako aktualny stan rzeczy. W swiecie technologii (szczegolnie AI) -- 2 lata to cala epoka.

**Skutek:** Rekomendacja oparta na nieaktualnych danych. Framework ktory byl kiepski w 2024 moze byc doskonaly w 2026 (i na odwrot). React Server Components byl kontrowersyjny w 2024 -- w 2026 jest standardem.

**Rozwiazanie:** Zawsze sprawdz date posta. Priorytetyzuj watki z ostatnich **6-12 miesiecy**. Starsze watki uzywaj TYLKO do analizy trendu ("jak zmienial sie sentiment w czasie"), nie jako zrodlo aktualnych opinii.

```
ZLE:
  Post z 2023: "Vue 3 is not ready for production"
  --> Finding: "Spolecznosc uwaza Vue 3 za niedojrzaly"

DOBRZE:
  Post z 2023: "Vue 3 is not ready for production"
  Post z 2025: "Vue 3 has matured significantly, we migrated our app"
  Post z 2026: "Vue 3 + Nuxt 4 is our go-to stack for new projects"
  --> Finding: "Sentiment wobec Vue 3 zmienil sie z NEGATIVE (2023)
      na POSITIVE (2025-2026). Spolecznosc uznaje Vue 3 za dojrzaly."
```

### 10.3 Echo Chamber (Czytanie tylko jednego subreddita)

**Objaw:** Researcher Reddit przeszukuje TYLKO r/reactjs i raportuje, ze "spolecznosc preferuje React." Niespodzianka -- subreddit poswiecony Reactowi preferuje Reacta.

**Skutek:** Confirmation bias. Kazdy subreddit ma swoj bias -- r/reactjs bedzie pro-React, r/vuejs bedzie pro-Vue, r/SaaS bedzie pro-whatever-makes-money.

**Rozwiazanie:** Przeszukuj **minimum 3-4 rozne subreddity** dla kazdego zagadnienia. Porownuj sentiment miedzy subredditami. Jesli r/reactjs mowi "React is best" ale r/webdev mowi "Vue is simpler for small teams" -- oba insight'y sa wazne.

### 10.4 Rage Sampling (Zbieranie tylko negatywnych opinii)

**Objaw:** Researcher Reddit zbiera WYLACZNIE narzekania i krytyki, ignorujac pozytywne opinie i rekomendacje. Raport maluje obraz, w ktorym KAZDA technologia jest zla.

**Skutek:** Cyniczny raport, ktory nie pomaga w podjeeciu decyzji. Jesli wszystko jest "zle" -- to nic nie jest "gorsze" ani "lepsze." Brak dyferencjacji = brak wartosci.

**Rozwiazanie:** Zbieraj opinie **obu stron** -- pozytywne I negatywne. Raportuj sentiment jako MIXED, nie jako wylacznie NEGATIVE. Narzekania sa wartosciowe, ale TYLKO w kontekscie rownoczesnych pochwal. "70% opinie pozytywne, 30% narzeka na krzywa uczenia" -- to jest insight. "Wszyscy narzekaja" -- to jest bias.

### 10.5 Karma Blindness (Ignorowanie liczby glosow)

**Objaw:** Researcher Reddit traktuje komentarz z 2 upvotami tak samo jak komentarz z 500 upvotami. Jeden jest opiniai losowej osoby, drugi jest de facto konsensusem spolecznosci.

**Skutek:** Szum informacyjny. Raport nie rozroznia miedzy szeptem a krzykiem -- wszystko jest "opinia z Reddita."

**Rozwiazanie:** Zawsze raportuj **upvote_range** dla kazdego finding. Komentarz z 500+ upvotes to INNA kategoria informacji niz komentarz z 3 upvotes. W raporcie, findings z wyzszymi upvotami powinny miec wyzszy confidence_score.

```
ZLE:
  "Uzytkownik Reddita mowi, ze Svelte jest lepszy od React"
  (komentarz: 2 upvotes)

DOBRZE:
  "Komentarz z 450 upvotes i 3 awards na r/programming:
   'After 5 years of React, I switched to Svelte.
   The DX improvement is real -- 40% less code, faster builds.'
   Potwierdzony przez 6 innych watkow z lacznie 800+ upvotes."
```

> **UWAGA!**
> Najniebezpieczniejszym anty-wzorcem jest polaczenie **Single Comment Truth + Outdated Thread** -- pojedynczy, stary komentarz traktowany jako aktualna prawda. W swiecie AI, gdzie frameworki zmieniaja sie co kwartal, opinia sprzed roku moze byc calkowicie nieaktualna. Researcher Reddit MUSI sprawdzac daty i MUSI szukac wzorcow, nie pojedynczych anegdot.

---

## 11. Najlepsze praktyki 2025-2026

### 11.1 Zasada "TOP 10 z linkami"

Kazdy raport Researcher Reddit MUSI zawierac **TOP 10 insightow**, kazdy z **linkiem zrodlowym**. Nie TOP 5 (za malo), nie TOP 20 (za duzo szumu). TOP 10 to sweet spot -- wystarczajaco duzo, zeby pokryc temat, wystarczajaco malo, zeby zachowac fokus.

### 11.2 Szukaj NARZEKANIA, nie POCHWALY

Paradoksalnie, narzekania sa BARDZIEJ wartosciowe niz pochwaly. Dlaczego? Bo **narzekania = szanse na lepsze rozwiazanie**. Kiedy 50 osob narzeka na ten sam problem z frameworkiem X -- to jest informacja, ze frameworki Y i Z moga byc lepsze w tym aspekcie. Pochwaly potwierdzaja status quo. Narzekania ujawniaja mozliwosci.

### 11.3 Datuj KAZDE zrodlo

Kazdy finding w raporcie musi miec `post_dates`. To pozwala na:
- Filtrowanie nieaktualnych informacji
- Sledzenie zmian sentymentu w czasie
- Identyfikacje, czy problem jest "stary i znany" czy "nowy i narastajacy"

### 11.4 Szukaj wzorcow miedzy wattkami, nie pojedynczych opinii

Pojedyncza opinia to szum. Wzorzec miedzy 5+ watkami to sygnal. Researcher Reddit musi aktywnie SZUKAC wzorcow:

- Czy ten sam problem pojawia sie w roznych subredditach?
- Czy rozni uzytkownicy niezaleznie doszli do tego samego wniosku?
- Czy sentiment zmienia sie w czasie (SHIFTING)?

### 11.5 Kontrowersje sa WARTOSCIOWE

Flamewary "React vs Vue" nie sa bezuzytecznym szumem. Sa **najlepszym zrodlem informacji o trade-offach**. W flamewars ludzie wyciagaja najsilniejsze argumenty -- bo walcza o swoja ulubiona technologie. Researcher Reddit powinien AKTYWNIE szukac kontrowersji i wyodrebniac merytoryczne argumenty z emocjonalnego szumu.

### 11.6 Sprawdz autora (jesli mozliwe)

Na Reddicie autor jest anonimowy, ale czesto zdradza swoj poziom doswiadczenia: "I've been a senior dev for 15 years" vs "I'm a junior learning React." Obie opinie sa wazne, ale maja inna wage. Researcher Reddit powinien notowac poziom doswiadczenia autora, jesli jest dostepny.

### 11.7 Porownuj subreddity miedzy soba

Ten sam temat na r/reactjs i r/webdev moze generowac calkowicie rozne opinie. r/reactjs bedzie pro-React (bias subskrybentow), r/webdev bedzie bardziej neutralny. Porownanie opinii miedzy subredditami daje **bardziej zrownowazony obraz**.

### 11.8 Raportuj LUKI jawnie

Jesli Researcher Reddit NIE znalazl dyskusji o danym temacie na Reddicie -- to tez jest informacja! Brak dyskusji moze oznaczac:
- Technologia jest zbyt nowa (jeszcze nikt jej nie uzyl)
- Technologia jest zbyt niszowa (za malo uzytkownikow)
- Temat nie jest kontrowersyjny (wszyscy sie zgadzaja -- co jest rzadkie)

Pole `gaps` w raporcie sluzy do jawnego raportowania tych luk.

> **CZY WIESZ, ZE...?**
> Na Reddicie istnieje zjawisko zwane "survivorship bias" -- widzisz glownie posty ludzi, ktory MAJA problemy (bo szukaja pomocy) lub sa BARDZO zadowoleni (bo chca sie podzielic sukcesem). Nie widzisz milionow uzytkownikow, ktory po prostu codziennie uzywaja technologii bez problemow i nie pisza o tym. Researcher Reddit musi byc swiadomy tego biasu -- duzo narzekania na Reddicie nie oznacza, ze technologia jest zla. Moze oznaczac, ze jest po prostu popularna (wiecej uzytkownikow = wiecej potencjalnych problemow).

---

## 12. Podsumowanie + Quick Reference Card

### 12.1 Kluczowe wnioski

1. **Researcher Reddit to zwiadowca w spolecznosci developerow.** Szuka niefiltrownych opinii, ukrytych problemow i realnych doswiadczen -- tego, czego oficjalna dokumentacja nie ujawni.

2. **Reddit daje "ground truth."** Anonimowosc = szczerosc. Downvotes = filtrowanie. Watki = kontekst. To kombinacja, ktorej nie daje zadne inne zrodlo.

3. **Narzekania = szanse na lepsze rozwiazanie.** Paradoksalnie, negatywne opinie sa bardziej wartosciowe niz pozytywne -- ujawniaja problemy, ktore mozna rozwiazac.

4. **Wzorce > anegdoty.** Jeden komentarz to szum. Dziesiec komentarzy mowiacych to samo w roznych watkach to sygnal. Researcher Reddit szuka WZORCOW.

5. **Izolacja miedzy researcherami to feature.** Reddit NIE wie, co znalazl Tech. Tech NIE wie, co znalazl Reddit. Dzieki temu ich raporty sa niezalezne, a sprzecznosci ujawniaja pelna prawde.

6. **Model Haiku, koszt ~$0.02-0.05 per run.** Najtanszy model wystarcza, bo czytanie Reddita to high-volume, low-complexity task.

7. **TOP 10 insightow z linkami -- zawsze.** Nie mniej (za malo danych), nie wiecej (za duzo szumu). Kazdy insight z linkiem zrodlowym.

8. **Datuj zrodla.** Post z 2023 o AI to jak gazeta sprzed dekady. Priorytetyzuj ostatnie 6-12 miesiecy.

9. **Przeszukuj minimum 3-4 subreddity.** Jeden subreddit = echo chamber. Wiele subredditow = zrownowazony obraz.

10. **Sprzecznosc miedzy Tech a Reddit to najcenniejszy insight.** Kiedy oficjalna dokumentacja mowi jedno, a spolecznosc mowi drugie -- masz pelny obraz. Tech + Reddit = kompletna prawda.

### 12.2 Analogia koncowa

Jesli system wieloagentowy to statek na oceanie zadan, to:

- **Orkiestrator** to Kapitan na mostku
- **Analityk** to Nawigator z mapa
- **Researcher Tech** to Zwiadowca z lornetka (widzi daleko, ale tylko to, co oficjalne)
- **Researcher Reddit** to **Szpieg w portowej tawernie** -- slucha rozmow marynarzy, dowiaduje sie o ukrytych rafach, piratkach i sztormach, o ktorych oficjalne mapy milcza. Bez niego, Kapitan ma mape, ale nie zna prawdziwych niebezpieczenstw.

### 12.3 Quick Reference Card

```
+===============================================+
|        RESEARCHER REDDIT (R-03)               |
|        Quick Reference Card                   |
+===============================================+
|                                               |
|  WARSTWA:    RESEARCH (Faza 1)                |
|  MODEL:      Claude Haiku                     |
|  KOSZT:      $0.80/$4.00 per 1M tokenow      |
|  LOAD:       50%                              |
|  KOSZT/RUN:  ~$0.02-0.05                      |
|                                               |
|  NARZEDZIA:  WebSearch | WebFetch             |
|  WSPIERAJACE: Read | Grep | Glob             |
|  BRAK:       Write | Edit | Bash | Agent      |
|                                               |
|  SUBREDDITY: r/webdev | r/programming         |
|              r/reactjs | r/SaaS               |
|              r/devops | r/experienceddevs      |
|              r/cscareerquestions               |
|                                               |
|  INPUT:      Pytanie badawcze (narrow context)|
|  OUTPUT:     TOP 10 insightow z linkami       |
|              Structured JSON report           |
|              (community_sentiment)            |
|                                               |
|  RAPORTUJE DO: Research Critic lub            |
|                Orkiestrator                    |
|                                               |
|  GATE:       Critic score <6/10 = REWIZJA     |
|                                               |
|  ZASADY:                                      |
|  - TOP 10 insightow z linkami (ZAWSZE)        |
|  - Szukaj WZORCOW, nie anegdot               |
|  - Datuj KAZDE zrodlo (freshness)             |
|  - Min. 3-4 subreddity per pytanie            |
|  - Narzekania = szanse na rozwiazanie         |
|  - NIE podejmuj decyzji -- REKOMENDUJ         |
|  - NIE wchodz na teren innych researcherow    |
|  - NIE traktuj 1 komentarza jako prawdy       |
|                                               |
|  ANTY-WZORCE:                                 |
|  x Single Comment Truth (1 opinia = fakt)     |
|  x Outdated Thread (stare posty)              |
|  x Echo Chamber (1 subreddit)                 |
|  x Rage Sampling (tylko narzekania)           |
|  x Karma Blindness (ignorowanie glosow)       |
|                                               |
|  HIERARCHIA TRESCI REDDIT:                    |
|  Gilded > Upvoted (100+) > Upvoted (20+) >   |
|  > Regular > Controversial > Downvoted        |
|                                               |
|  KLUCZOWY INSIGHT:                            |
|  "Narzekania = szanse na lepsze rozwiazanie"  |
|  "Anonimowe opinie = szczere opinie"          |
|  "Dyskusje ujawniaja problemy o ktorych       |
|   dokumentacja milczy"                        |
|                                               |
+===============================================+
```

### 12.4 Slowniczek kluczowych terminow

| Termin | Definicja |
|--------|-----------|
| **Ground truth** | Prawda z pierwszej linii frontu -- realne doswiadczenia praktyków, nie teoria z dokumentacji |
| **Sentiment** | Nastroj/nastawienie spolecznosci wobec technologii: POSITIVE, NEGATIVE, MIXED, SHIFTING |
| **Subreddit** | Tematyczny podforum na Reddicie -- np. r/webdev skupia sie na web development |
| **Upvote/Downvote** | System glosowania na Reddicie -- crowdsourced peer review tresci |
| **Gilded** | Post lub komentarz nagrodzony "zlotem" przez innego uzytkownika -- oznaka wysokiej wartosci |
| **Flamewar** | Goracy spor miedzy zwolennikami roznych technologii -- cenne zrodlo argumentow pro/con |
| **Confirmation bias** | Tendencja do szukania informacji potwierdzajacych istniejace przekonania |
| **Survivorship bias** | Widzisz glownie skrajne przypadki (problemy lub sukcesy), nie "cicha wiekszosc" |
| **Echo chamber** | Sytuacja, w ktorej slyszysz tylko opinie zgodne z jednym punktem widzenia |
| **Narrow Context Principle** | Zasada, ze agent dostaje TYLKO informacje potrzebne do swojego zadania, nie caly kontekst projektu |
| **Read-only agent** | Agent ktory moze CZYTAC informacje, ale nie moze ZMIENIAC srodowiska (brak Write/Edit/Bash) |
| **Deep Research Belt** | "Pas badawczy" -- 6 rownoleglych researcherow, kazdy przeszukujacy inne zrodla |
| **Research Critic** | Agent bramkowy, ktory waliduje raporty researcherow wedlug 5-wymiarowej rubryki |
| **Syntetyk** | Agent laczacy raporty z wielu researcherow w jeden spojny obraz |
| **Smart routing** | Dobieranie modelu AI (Haiku/Sonnet/Opus) do zlozonosci zadania -- nie kazde zadanie wymaga najdrozszego modelu |

### 12.5 Hierarchia w systemie

```
Level 0: Orkiestrator (Opus) ............... Strategia
Level 1: Analityk + Planer ................ Planowanie
Level 2: >>> RESEARCHER REDDIT (R-03) <<< .. Research  <-- TU JESTES
         + Tech (R-01), UX (R-02),
           X (R-04), GitHub (R-05),
           Forums (R-06)
Level 3: Backend, Frontend, Designer ....... Build
Level 4: QA Tester, Accessibility QA ....... Quality
```

---

> **UWAGA! -- Przypomnienie koncowe**
> Researcher Reddit jest agentem **read-only**. Moze czytac caly internet (a szczegolnie caly Reddit) i lokalny system plikow, ale nie moze zmienic ani jednego bajtu. To nie jest wada -- to **fundamentalna zasada bezpieczenstwa** (Principle of Least Privilege). W systemie wieloagentowym, agent ktory zbiera opinie NIE powinien moc modyfikowac srodowiska. Jego wartosc jest w **jakosci insightow, ktore przynosi z portowej tawerny** -- nie w tym, czy potrafi sam zbudowac statek.

---

*Dokument przygotowany na podstawie Gold Standard Agent Architecture 2026, AGENT_TEAMS_CONFIGURATOR v8.0, analiz ALPHA/OMEGA Team oraz badan multi-agent systems 2025-2026. Wszystkie dane o cenach i statystykach aktualne na marzec-kwiecien 2026.*

---

## PROMPT DO PREZENTACJI WIDEO (AI Presenter)

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz 5-7 minutowa prezentacje wideo o roli **Researcher Reddit (R-03)** w systemach wieloagentowych AI. Prezentacja powinna byc prowadzona przez AI prezentera w profesjonalnym, ale przystepnym tonie -- jak TED Talk o sile anonimowych opinii w technologii.

**Struktura prezentacji:**

1. **Hook (0:00-0:30):** Zacznij od kontrastu: na lewej stronie ekranu pokaz oficjalna dokumentacje frameworka ("10,000 req/s, zero downtime, easy setup"). Na prawej stronie pokaz post z Reddita ("After 3 weeks in production, this framework crashed our entire infrastructure. The docs never mentioned this."). Pytanie do widza: "Komu wierzysz -- oficjalnej reklamie czy anonimowemu developerowi, ktory nie ma powodu klamac?"

2. **Problem (0:30-1:30):** Wyjasnij, dlaczego oficjalna dokumentacja "klamie przez pominiecie." Uzyj analogii hotelowej: zdjecia na booking.com pokazuja piekny pokoj -- ale nie pokazuja budowy za oknem, halasu z ulicy ani zepsutej klimatyzacji. Recenzje gosci ujawniaja PRAWDE. Reddit to "recenzje gosci" swiata technologii. Pokaz statystyke: wiele porazek wdrozen wynikalo z problemow, o ktorych dokumentacja milczala.

3. **Kim jest R-03 (1:30-2:30):** Przedstaw Researcher Reddit -- jego pozycje w warstwie RESEARCH, model Haiku, narzedzia (WebSearch + WebFetch). Wizualizacja: schemat systemu wieloagentowego z podswietlonym R-03 w "Deep Research Belt." Pokaz 3 analogie: dziennikarz sledczy, antropolog, tajemniczy klient.

4. **5 obowiazkow w akcji (2:30-4:00):** Dla kazdego obowiazku pokaz krótka animacje:
   - Discussion Discovery: wizualizacja przeszukiwania 7 subredditow, posty "wplywaja" do systemu
   - Sentiment Analysis: termometr sentymentu -- POSITIVE / MIXED / NEGATIVE / SHIFTING
   - Ground Truth Detection: "dokumentacja mowi X" vs "Reddit mowi Y" -- rozdzwiek na split-screenie
   - Stack Recommendations: chmura slow z najczesciej rekomendowanymi technologiami
   - Controversy Detection: wizualizacja flamewara -- argumenty lataja miedzy stronami

5. **Mapa subredditow (4:00-4:45):** Wizualizacja w stylu mapy metro -- kazdy subreddit to "stacja" z opisem: co tam znajdziesz, jaki poziom zaawansowania, jaki bias. Linie metra lacza subreddity tematycznie (frontend line, backend line, career line, business line).

6. **Anty-wzorce (4:45-5:30):** "5 grzechow glownych Researcher Reddit" -- animowane karty z ikonami:
   - Single Comment Truth (ikona: lupa na jednym slowie)
   - Outdated Thread (ikona: kalendarz z kurzem)
   - Echo Chamber (ikona: lustro odbijajace lustro)
   - Rage Sampling (ikona: czerwony termometr)
   - Karma Blindness (ikona: przesloniete oczy)

7. **Quick Reference Card (5:30-6:00):** Animowane pojawienie sie ASCII Quick Reference Card na ekranie. Kazda sekcja pojawia sie z krotkim wyjasnieniem.

8. **Zamkniecie (6:00-6:30):** Cytat na ekranie: "Narzekania = szanse na lepsze rozwiazanie." Potem: "Anonimowe opinie = szczere opinie." Zakonczenie: "Researcher Reddit widzi to, czego oficjalne zrodla nie pokaza. Dlatego jest niezastapiony w kazdym powaznym systemie badawczym."

**Styl wizualny:** Ciemny motyw (dark navy #1a1a2e) z akcentami w kolorze Reddit Orange (#FF4500). Typografia: monospace dla cytatow z Reddita, sans-serif dla narracji. Animacje: plynne, subtelne -- nie kiczowate. Ikonografia: minimalistyczna, liniowa. Reddit-style karty z upvotami jako element graficzny.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike edukacyjna o roli **Researcher Reddit (R-03)** w systemach wieloagentowych AI. Format: dluga, scrollowalna grafika w stylu premium magazine -- ciemny motyw (dark navy #1a1a2e) z akcentami w Reddit Orange (#FF4500) i bialym tekstem.

**Struktura infografiki (od gory do dolu):**

1. **Naglowek:** Duzy tytul "RESEARCHER REDDIT (R-03)" w kolorze bialym z pomaraczowym akcentem na "REDDIT." Podtytul: "Agent Wywiadu Spolecznosciowego | Gold Standard 2026." Ikona: stylizowany alien Reddit (Snoo) z lupa, symbolizujacy research na platformie.

2. **Sekcja "Kim jest?":** 3 ikony z podpisami na pomaranczowym tle: (1) Dziennikarz sledczy -- pod przykryciem w spolecznosci developerow, (2) Antropolog -- bada realne zachowania, nie deklaracje, (3) Tajemniczy klient -- czyta prawdziwe opinie. Centralny cytat w ramce: "Narzekania = szanse na lepsze rozwiazanie."

3. **Mapa subredditow:** Wizualizacja w stylu konstelacji -- 7 subredditow jako "gwiazdy" polaczone liniami, z opisem specjalizacji kazdego. Centrum: r/webdev (najwazniejszy). Na orbicie: r/programming, r/reactjs, r/SaaS, r/devops, r/experienceddevs, r/cscareerquestions. Kazda "gwiazda" z ikona i jednozdaniowym opisem.

4. **Hierarchia jakosci tresci Reddit:** Wizualizacja w stylu piramidy -- od "Gilded/Awarded" na szczycie (zloto, #FFD700) przez "Highly Upvoted" (pomarancz, #FF4500) do "Downvoted" na dole (szary). Kazdy poziom z liczba upvotow i opisem wiarygodnosci.

5. **Sentiment Analysis Dashboard:** Cztery kolorowe karty -- POSITIVE (zielony), NEGATIVE (czerwony), MIXED (zolty), SHIFTING (gradient). Kazda z przykladem: "Vue 3 = POSITIVE (prostszy onboarding)", "LangGraph learning curve = MIXED (trudny start, swietny potem)."

6. **Porownanie z innymi researcherami:** Tabela 6 agentow w formie kart -- kazdy z ikona, kolorem i jednozdaniowym opisem. Researcher Reddit podswietlony na pomaranczowo. Strzalki pokazujace synergie: Tech + Reddit = "pelny obraz (oficjalna prawda + realna prawda)."

7. **Anty-wzorce:** 5 czerwonych kart z ikonami i jednozdaniowymi opisami: Single Comment Truth, Outdated Thread, Echo Chamber, Rage Sampling, Karma Blindness. Kazda z ikona "X" w czerwonym kole.

8. **Kluczowa statystyka:** Duza liczba na srodku: "45-120 sek" -- czas wykonania pelnego researchu Reddit. Podpis: "100-300 komentarzy przeanalizowanych. 10-15 watkow przeczytanych. TOP 10 insightow dostarczonych." Porownanie: "Ludzki researcher: 4-8 godzin."

9. **Cytat koncowy:** Na calej szerokosci, na ciemnym tle z pomaranczowa ramka: "Anonimowe opinie = szczere opinie. Downvotes filtruja slabe odpowiedzi. Dyskusje ujawniaja problemy o ktorych dokumentacja milczy."

10. **Stopka:** Logo "Gold Standard 2026", model "Claude Haiku ($0.80/$4.00)", load "50/100", seria "Architektura Agentow AI." Kody kolorow uzyte w infografice: #1a1a2e (navy), #FF4500 (Reddit Orange), #FFFFFF (bialy), #FFD700 (zloto).

**Kolorystyka:** Ciemny granat (#1a1a2e) jako tlo glowne. Reddit Orange (#FF4500) jako kolor akcentowy i wyrozniajacy. Bialy (#FFFFFF) dla tekstu. Zloto (#FFD700) dla elementow "gilded" i premium. Szarosci (#888888, #CCCCCC) dla elementow wtornych. Minimalistyczne ikony liniowe w bialym kolorze na ciemnym tle.
