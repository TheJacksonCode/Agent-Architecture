# Researcher Tech (R-01) -- Wywiadowca Technologiczny w Systemach Wieloagentowych

## Kompletny przewodnik po roli Technical Research Agent w architekturze Gold Standard 2026

**Seria:** Architektura Agentow AI -- Role i Specjalizacje
**Numer roli:** R-01 (Research Layer)
**Model:** Claude Haiku ($0.80/$4.00 per 1M tokenow input/output)
**Warstwa:** RESEARCH (Faza 1)
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Kim jest Researcher Tech?

Wyobraz sobie detektywa. Nie tego z filmow, ktory biega z pistoletem i wlamuje sie do budynkow. Raczej tego starej szkoly -- siedzacego w archiwum, przegladajacego tysiace dokumentow, porownujacego zrodla, szukajacego wzorcow i sprzecznosci. Detektywa, ktory nigdy nie aresztuje nikogo sam -- jego praca konczy sie w momencie, gdy polozony jest na biurku przelozonego **starannie udokumentowany raport z dowodami**.

Researcher Tech (oznaczenie R-01 w architekturze Gold Standard 2026) jest wlasnie takim detektywem. To Technical Research Agent -- agent AI wyspecjalizowany w przeszukiwaniu oficjalnej dokumentacji technicznej, analizie benchmarkow, badaniu repozytoriow GitHub, sprawdzaniu statystyk npm/PyPI oraz monitorowaniu blogow technologicznych. Jego jedynym celem jest dostarczenie **faktow technicznych z podanymi zrodlami**, na podstawie ktorych inni agenci podejma decyzje.

W systemie wieloagentowym Researcher Tech nigdy nie pracuje sam. Jest jednym z **maksymalnie szesciu rownoleglych researcherow** w tak zwanym "Deep Research Belt" -- pasie badawczym, gdzie kazdy specjalista przeszukuje inne zrodla informacji:

| Agent | Oznaczenie | Specjalizacja zrodlowa |
|-------|-----------|------------------------|
| **Researcher Tech** | R-01 | Dokumentacja, benchmarki, blogi techniczne |
| Researcher UX | R-02 | Dribbble, Behance, Awwwards, Mobbin |
| Researcher Reddit | R-03 | r/webdev, r/programming, r/reactjs, r/SaaS |
| Researcher X | R-04 | X/Twitter -- trendy, launche, influencerzy |
| Researcher GitHub | R-05 | Repozytoria open-source, architektura, Issues |
| Researcher Forums | R-06 | StackOverflow, Dev.to, Medium, Hacker News |

Ta szostka to **zwiadowcy** -- wyslani rownolegle na poczatku kazdej misji, w rozne zakatki internetu, szukajacy danych z roznych perspektyw. Researcher Tech jest wsrod nich **specjalista od twardych faktow technicznych** -- nie opinii, nie trendow, nie estetyki -- ale od tego, co mowi oficjalna dokumentacja, co pokazuja benchmarki i co wynika z analiz porownawczych.

> **CZY WIESZ, ZE...?**
> W systemie Anthropic Multi-Agent Research System, zespol Opus 4 (lider) + Sonnet 4 (podagenci) osiagnal wyniki o **90.2% lepsze** niz pojedynczy agent Opus 4 na zadaniach badawczych. Klucz do sukcesu? Kazdy podagent dostal **szczegolowy opis zadania** -- cel, format outputu, narzedzia i granice. Bez tego agenci duplikowali prace lub zostawiali luki. To dokladnie model, w ktorym pracuje Researcher Tech -- waski, precyzyjny zakres odpowiedzialnosci.

---

## 2. Kluczowe Obowiazki

Researcher Tech ma cztery glowne obszary odpowiedzialnosci. Kazdy z nich jest scisle zdefiniowany -- co robi, czego NIE robi, i jaki output produkuje.

### 2.1 Wyszukiwanie i walidacja zrodel (Source Discovery & Validation)

Pierwszym zadaniem jest **znalezienie wiarygodnych zrodel technicznych** dla danego zagadnienia. To nie jest po prostu "wygoogluj temat". To systematyczny proces:

1. Zidentyfikuj oficjalna dokumentacje technologii
2. Znajdz najnowsza wersje dokumentacji (sprawdz date!)
3. Zlokalizuj sekcje relevant: getting started, best practices, performance, security
4. Zweryfikuj, czy zrodlo jest aktualne (dokumentacja sprzed 2 lat moze byc nieaktualna)
5. Oznacz kazde twierdzenie URLem zrodlowym

**Zasada kardynalna:** Kazde twierdzenie techniczne MUSI miec URL zrodla. Brak zrodla = brak faktu. To nie jest sugestia -- to twarda regula.

### 2.2 Analiza benchmarkow (Benchmark Analysis)

Researcher Tech nie tylko znajduje benchmarki -- **analizuje je krytycznie**:

- Jaki hardware uzyto? (wyniki na M3 Max != wyniki na t2.micro)
- Jaka wersja oprogramowania? (benchmark Next.js 13 nie jest relevant dla Next.js 15)
- Kto przeprowadzil benchmark? (vendor benchmark vs niezalezny test)
- Jak duza probka? (1 test vs 1000 testow)
- Czy wyniki sa powtarzalne?

### 2.3 Porownanie technologii (Technology Comparison)

Dla kazdego zagadnienia Researcher Tech **porownuje minimum 3 opcje**. Nigdy nie rekomenduje pierwszej znalezionej technologii. Kazde porownanie zawiera:

- Pros/cons kazdej opcji
- Snippet kodu setup (dzialajacy przyklad > opis slowny)
- Znane issues i ograniczenia
- Aktywnosc maintenance (ostatni commit, czestotliwosc releaseow)
- Rozmiar community (GitHub stars, npm downloads, aktywnosc na forach)

### 2.4 Identyfikacja ryzyk (Risk Identification)

Kazda rekomendacja technologiczna niesie ryzyka. Researcher Tech jawnie je identyfikuje:

- **Lock-in risk:** Czy technologia jest model-agnostic? Vendor-locked?
- **Maintenance risk:** Kiedy byl ostatni release? Ile otwartych issues?
- **Security risk:** Znane CVE? Audit history?
- **Scalability risk:** Jak zachowuje sie pod obciazeniem?
- **Breaking changes risk:** Jak czesto zdarzaja sie breaking changes?

> **CZY WIESZ, ZE...?**
> Wedlug badania z marca 2026, **65% porazek wdrozen AI w enterprise** wynikalo z "context drift" -- utraty kontekstu podczas wielokrokowego rozumowania. Dlatego Researcher Tech operuje na **waskim kontekscie** -- dostaje TYLKO pytanie badawcze, nie caly kontekst projektu. To celowe ograniczenie, ktore redukuje ryzyko halucynacji i obniaza koszty tokenowe.

---

## 3. Zrodla danych -- Skad Researcher Tech czerpie informacje?

Researcher Tech ma scisle okreslona hierarchie zrodel. Nie wszystkie zrodla sa rowne -- oficjalna dokumentacja jest wazniejsza niz blog, a blog wazniejszy niz tweet.

### Hierarchia wiarygodnosci zrodel

```
POZIOM 1 (najwyzszy): Oficjalna dokumentacja (docs)
POZIOM 2: Oficjalne blogi firmowe (engineering blogs)
POZIOM 3: Niezalezne benchmarki i badania (peer-reviewed)
POZIOM 4: Renomowane blogi techniczne (Towards Data Science, InfoQ)
POZIOM 5: Tutoriale (Dev.to, Medium)
POZIOM 6: Posty na forach (StackOverflow, HN)
POZIOM 7 (najnizszy): Tweety, komentarze Reddit
```

### 3.1 Oficjalna dokumentacja

To **arbiter prawdy**. Kiedy dokumentacja mowi jedno, a blog mowi drugie -- dokumentacja wygrywa. Researcher Tech sprawdza:

- Getting started guides
- Best practices sections
- Performance optimization guides
- Security guidelines
- Migration guides i changelogi
- RFC (Request for Comments) -- daja wglad w decyzje maintainerow

**Przykladowe zrodla:** Next.js docs, React docs, Anthropic API docs, Google ADK docs, LangGraph docs

### 3.2 Repozytoria GitHub

GitHub to zrodlo **dzialajacego kodu**, nie teorii. Researcher Tech analizuje:

- **Stars i forks** -- popularnosc (ale stars != jakosc)
- **Data ostatniego commitu** -- repo bez commitu >2 lata = potencjalnie porzucone
- **Aktywnosc Issues** -- duzo otwartych issues moze oznaczac problemy lub aktywna spolecznosc
- **Pull Requesty** -- czy maintainerzy reaguja na PR?
- **Architektura plikow** -- jak zorganizowany jest kod?

### 3.3 Statystyki npm/PyPI

Twarde dane o adopcji technologii:

- Miesieeczne pobrania (npm trends, PyPI stats)
- Trend wzrostowy/spadkowy
- Liczba zaleznych pakietow (dependents)
- Czas od ostatniego releasu

**Przykladowe dane (marzec 2026):**
| Pakiet | Miesiezne pobrania | GitHub Stars |
|--------|-------------------|-------------|
| LangGraph | 38M+ PyPI | ~24,800 |
| CrewAI | 12M+ PyPI | ~45,900 |
| MCP SDK | 97M+ laczne | 10,000+ serwerow |

### 3.4 Benchmarki i porownania

Researcher Tech szuka niezaleznych benchmarkow z powtarzalna metodologia:

- Czas odpowiedzi (latency)
- Przepustowosc (throughput)
- Zuzycie pamieci (memory footprint)
- Koszt per request
- Accuracy na standardowych datasetach

### 3.5 Blogi techniczne

Renomowane zrodla wiedzy technologicznej:

- Anthropic Engineering Blog
- Google Developers Blog
- Towards Data Science
- InfoQ
- The New Stack
- Dev.to (z weryfikacja jakosci)

> **UWAGA!**
> Researcher Tech NIE przeszukuje Reddita, X/Twittera ani forow dyskusyjnych. To domena **innych researcherow** (Reddit Researcher, X Researcher, Forum Researcher). Kazdy researcher ma **swoj wydzielony teren** -- to zasada specjalizacji, ktora zapobiega duplikacji pracy i gwarantuje pelne pokrycie zrodel.

---

## 4. Format raportu badawczego

Kazdy output Researcher Tech to **ustrukturyzowany raport badawczy** w formacie JSON. Nie wolny tekst. Nie "luza rozmowa". Precyzyjny, parsowalny, walidowalny dokument.

### Szablon raportu

```json
{
  "agent_id": "R-01",
  "report_type": "technical_research",
  "research_question": "Jaki framework multi-agent wybrac do projektu SaaS?",
  "timestamp": "2026-04-01T10:30:00Z",
  "token_usage": {
    "input": 12500,
    "output": 8200,
    "total": 20700
  },
  "findings": [
    {
      "topic": "LangGraph",
      "relevance": "HIGH",
      "effort": "MEDIUM",
      "summary": "Najbardziej battle-tested framework w produkcji...",
      "pros": [
        "Explicit state graphs z checkpointingiem",
        "Time-travel debugging",
        "Model-agnostic"
      ],
      "cons": [
        "Stroma krzywa uczenia",
        "Wymaga zrozumienia grafow stanow"
      ],
      "setup_snippet": "from langgraph.graph import StateGraph...",
      "known_issues": [
        "Memory leak w wersji <0.2.1 przy duzych grafach"
      ],
      "sources": [
        "https://langchain-ai.github.io/langgraph/",
        "https://particula.tech/blog/langgraph-vs-crewai-2026"
      ],
      "source_date": "2026-03",
      "confidence_score": 0.92
    },
    {
      "topic": "CrewAI",
      "relevance": "HIGH",
      "effort": "LOW",
      "summary": "Najszybszy prototyping, ale 3x wiecej tokenow...",
      "pros": ["..."],
      "cons": ["..."],
      "sources": ["..."],
      "confidence_score": 0.85
    },
    {
      "topic": "Claude Agent SDK",
      "relevance": "MEDIUM",
      "effort": "MEDIUM",
      "summary": "Safety-first, MCP-native, ale Claude-only...",
      "pros": ["..."],
      "cons": ["..."],
      "sources": ["..."],
      "confidence_score": 0.88
    }
  ],
  "recommendations": [
    "LangGraph dla zlozonych workflow z loops i gates",
    "CrewAI dla szybkiego MVP z 3-5 agentami",
    "Claude Agent SDK jesli ekosystem juz oparty na Claude"
  ],
  "risks": [
    "CrewAI: 3x wiecej tokenow niz LangChain na single tool calls",
    "Claude Agent SDK: OOM przy wielu subagentach bez zarzadzania zasobami"
  ],
  "gaps": [
    "Brak benchmarkow head-to-head na identycznym zadaniu",
    "Brak danych o koszcie produkcyjnym >1000 req/day"
  ],
  "freshness": "2026-Q1"
}
```

### Kluczowe pola raportu

| Pole | Opis | Wymagane? |
|------|------|-----------|
| `agent_id` | Zawsze "R-01" | TAK |
| `research_question` | Dokladne pytanie badawcze | TAK |
| `findings` | Tablica znalezisk (min. 3 opcje) | TAK |
| `confidence_score` | 0.0-1.0 -- pewnosc znaleziska | TAK |
| `sources` | URL kazdego zrodla | TAK |
| `source_date` | Data zrodla (freshness) | TAK |
| `recommendations` | Rekomendacje z uzasadnieniem | TAK |
| `risks` | Zidentyfikowane ryzyka | TAK |
| `gaps` | Luki w danych -- czego NIE znaleziono | TAK |
| `token_usage` | Zuzycie tokenow | TAK |

**Pole `gaps` jest krytyczne.** Researcher Tech musi jawnie powiedziec, czego NIE udalo sie znalezc. To pozwala Research Critic ocenic, czy potrzebna jest dodatkowa runda badawcza.

> **CZY WIESZ, ZE...?**
> Pole `confidence_score` (wynik pewnosci) to nie subiektywna ocena agenta. Ma scisla definicje: **0.9+** oznacza dane z oficjalnej dokumentacji lub peer-reviewed badania; **0.7-0.89** to dane z renomowanych blogow z weryfikowalnymi zrodlami; **0.5-0.69** to dane z forow lub pojedynczych zrodel; **ponizej 0.5** to spekulacja lub dane z niezweryfikowanych zrodel. Research Critic odrzuca findings z confidence_score ponizej 0.5.

---

## 5. Czego Researcher Tech NIE robi

Rownie wazne jak obowiazki sa **jawne wykluczenia**. Researcher Tech ma scisle ograniczony zakres -- i to celowo.

### 5.1 NIE pisze kodu

Researcher Tech dostarcza snippety setup jako czesc raportu, ale **nigdy nie implementuje rozwiazania**. Nie pisze aplikacji. Nie tworzy plikow. Nie edytuje kodu. To rola builderow (Backend, Frontend, Feature Developer).

### 5.2 NIE podejmuje decyzji

Researcher Tech **rekomenduje**, ale nie **decyduje**. Ostateczna decyzja nalazy do Orkiestratora lub Analityka. Raport badawczy to dane wejsciowe do decyzji, nie decyzja sama w sobie.

### 5.3 NIE przeszukuje zrodel innych researcherow

Reddit to domena Reddit Researchera. Dribbble to domena UX Researchera. GitHub repo to domena GitHub Researchera. **Kazdy researcher ma swoj teren** i nie wchodzi na cudzy. Ta separacja zapobiega duplikacji pracy i gwarantuje pelne pokrycie.

### 5.4 NIE waliduje wynikow innych agentow

Walidacja to rola **Research Critic** (agenta bramkowego). Researcher Tech produkuje dane -- Critic je weryfikuje. Te role sa celowo rozdzielone, zeby uniknac "samosprawdzania" (agent walidujacy wlasna prace).

### 5.5 NIE ma dostepu do kontekstu projektu

Researcher Tech dziala wedlug **Narrow Context Principle** -- dostaje TYLKO pytanie badawcze. Nie wie, jaki jest budzet projektu. Nie wie, jaki framework juz uzywa zespol. Nie wie, jakie sa preferencje klienta. To celowe ograniczenie, ktore:

- Redukuje zuzycie tokenow (mniej danych wejsciowych)
- Minimalizuje confirmation bias (nie szuka potwierdzenia z gory przyjetych zalozen)
- Zapobiega halucynacjom (mniej kontekstu = mniej mozliwosci do "kreatywnej interpretacji")

> **UWAGA!**
> Narrow Context Principle to jedna z najwazniejszych zasad projektowania agentow badawczych. Pelny kontekst projektu powinien byc widoczny TYLKO dla Orkiestratora i Syntetyka. Kazdy inny agent dostaje **minimum informacji potrzebne do wykonania swojego zadania**. Badania Anthropic potwierdzaja: "detailed task descriptions per subagent" -- z jasno okreslonymi granicami -- to klucz do unikniecia duplikacji pracy i luk.

---

## 6. Model i Koszt -- Dlaczego najtanszy model?

### 6.1 Claude Haiku -- ekonomia skali

Researcher Tech uzywa **Claude Haiku** -- najtanszego modelu w ofercie Anthropic. Ceny (marzec 2026):

| Model | Input (per 1M tokenow) | Output (per 1M tokenow) | Zastosowanie |
|-------|------------------------|------------------------|--------------|
| Claude Opus | $15.00 | $75.00 | Orkiestrator, strategia |
| Claude Sonnet | $3.00 | $15.00 | Buildery, krytyka |
| **Claude Haiku** | **$0.80** | **$4.00** | **Research, QA** |

Researcher Tech kosztuje **~18.75x mniej na input** niz Opus i **~3.75x mniej** niz Sonnet.

### 6.2 Dlaczego najtanszy model wystarczy?

Research to zadanie **high-volume, low-complexity**:

- **Wysoki wolumen:** Researcher Tech przetwarza duze ilosci tekstu -- dokumentacje, blogi, benchmarki. To duzo tokenow wejsciowych.
- **Niska zlozonosc rozumowania:** W przeciwienstwie do Orkiestratora (ktory podejmuje strategiczne decyzje) czy Research Critica (ktory musi wykrywac subtelne sprzecznosci miedzy raportami), Researcher Tech wykonuje stosunkowo proste operacje: wyszukaj, przeczytaj, wyodrebnij, porownaj, sformatuj.
- **Ustrukturyzowany output:** Format JSON z predefiniowanymi polami to idealny task dla mniejszego modelu -- nie wymaga kreatywnosci, wymaga precyzji.

### 6.3 Ekonomia zespolu badawczego

W pelnym "Research Swarm" (6 researcherow + Critic + Syntetyk) koszty rosna multiplikatywnie:

```
Scenariusz A: Wszyscy na Opus
  6 researcherow x ~20K tokenow input = 120K tokenow
  Koszt input: 120K x $15/1M = $1.80
  + 6 x ~8K output = 48K tokenow
  Koszt output: 48K x $75/1M = $3.60
  RAZEM: ~$5.40

Scenariusz B: Wszyscy na Haiku (Gold Standard)
  6 researcherow x ~20K tokenow input = 120K tokenow
  Koszt input: 120K x $0.80/1M = $0.096
  + 6 x ~8K output = 48K tokenow
  Koszt output: 48K x $4/1M = $0.192
  RAZEM: ~$0.29

OSZCZEDNOSC: ~$5.11 (94.6%) per runda badawcza
```

Przy wielokrotnych rundach badawczych (typowe: 2-3 rundy, jesli Critic zada rewizji), roznica jest jeszcze wieksza. Na pelnym systemie 18-agentowym ("Deep Research+Build"), oszczednosci siegaja **szescdziesieciu--siedemdziesieciu procent calkowitego budzetu tokenowego**.

### 6.4 Kiedy Haiku NIE wystarczy?

Istnieja sytuacje, w ktorych Haiku moze byc niewystarczajacy:

- Bardzo dlugie dokumenty (>50K tokenow) -- mniejsze okno kontekstowe
- Zlozony reasoning miedzy wieloma sprzecznymi zrodlami
- Generowanie zaawansowanych snippetow kodu

W takich przypadkach mozna **upgrade'owac do Sonnet** dla pojedynczego researchera, zachowujac reszte na Haiku. To podejscie "smart routing" -- dopasowanie modelu do konkretnego zadania.

> **UWAGA!**
> Nie myl taniosci modelu z niska jakoscia wynikow. Haiku to model **zoptymalizowany pod predkosc i koszt**, nie "gorszy model". Dla zadan wyszukiwania i ekstrakcji informacji jego performance jest porownywalna z drozsymi modelami. To jak uzywanie skutera zamiast Ferrari do dostawy pizzy -- skuter jest szybszy w korkach i tanszy w utrzymaniu, mimo ze Ferrari ma wiecej koni mechanicznych.

---

## 7. Narzedzia -- Arsenale Wywiadowcy

Researcher Tech ma dokladnie **piec narzedzi**. Nie wiecej, nie mniej. Kazde sluzy konkretnemu celowi.

### 7.1 WebSearch -- Wyszukiwanie w internecie

**Najwazniejsze narzedzie.** Bez WebSearch, Researcher Tech bazuje wylacznie na danych z treningu modelu (cutoff date). WebSearch pozwala na:

- Wyszukiwanie aktualnych dokumentacji
- Znajdowanie najnowszych benchmarkow
- Sprawdzanie aktualnych statystyk npm/PyPI
- Lokalizowanie blogow i artykulow technicznych

**Dobre zapytanie WebSearch:**
```
"LangGraph vs CrewAI benchmark 2026 production performance"
```

**Zle zapytanie WebSearch:**
```
"best AI framework" (zbyt ogolne, brak kontekstu czasowego)
```

### 7.2 WebFetch -- Pobieranie zawartosci stron

Po znalezieniu URL przez WebSearch, WebFetch pobiera pelna zawartosc strony. Uzywany do:

- Czytania pelnych artykulow i dokumentacji
- Pobierania tabel porownawczych
- Ekstrakcji snippetow kodu z tutoriali
- Sprawdzania daty publikacji i autora

### 7.3 Read -- Czytanie plikow lokalnych

Pozwala czytac pliki z lokalnego systemu plikow. Uzywany do:

- Czytania istniejacego kodu projektu (zeby zrozumiec aktualny stack)
- Czytania MANIFEST.md (shared scratchpad systemu)
- Czytania wynikow innych agentow (jesli Orkiestrator je udostepni)

### 7.4 Grep -- Wyszukiwanie wzorcow w plikach

Narzedzie do przeszukiwania zawartosci plikow za pomoca wyrazen regularnych:

- Szukanie importow i zaleznosci w kodzie
- Identyfikacja uzycia konkretnych API
- Znajdowanie konfiguracji i zmiennych srodowiskowych

### 7.5 Glob -- Wyszukiwanie plikow po wzorcu nazwy

Szybkie wyszukiwanie plikow po nazwie:

- Znajdowanie plikow konfiguracyjnych (`*.config.js`, `*.yaml`)
- Lokalizowanie plikow testowych (`*.test.ts`, `*.spec.js`)
- Identyfikacja struktury projektu

### Narzedzia, ktorych Researcher Tech NIE ma

| Narzedzie | Powod braku |
|-----------|-------------|
| Write | Researcher NIE tworzy plikow -- tylko raportuje |
| Edit | Researcher NIE modyfikuje kodu |
| Bash | Researcher NIE uruchamia komend systemowych |
| Agent | Researcher NIE deleguje do innych agentow |
| TaskCreate | Researcher NIE tworzy zadan |

To celowe ograniczenie -- Researcher Tech jest **read-only agent**. Moze CZYTAC swiat, ale nie moze go ZMIENIAC. Ta zasada (Principle of Least Privilege) jest fundamentem bezpieczenstwa w systemach wieloagentowych.

> **CZY WIESZ, ZE...?**
> Badania Anthropic z 2025 roku pokazaly, ze **projektowanie interfejsow narzedzi** (tool design) jest rownie wazne jak prompt engineering. Zle opisane narzedzie kieruje agenta na zupelnie bledna sciezke. Dlatego w Gold Standard kazde narzedzie ma precyzyjny opis: co robi, kiedy je uzywac, i -- co kluczowe -- kiedy go NIE uzywac. Researcher Tech z WebSearch bez dobrego opisu moze konczyc szukajac "React vs Angular" zamiast "React 19 vs Angular 18 SSR benchmark 2026".

---

## 8. Workflow -- Od pytania do raportu

### 8.1 Cykl zycia zadania badawczego

```
Krok 1: ODBIORCA PYTANIA
  Orkiestrator --> Researcher Tech
  Input: {"question": "Jaki framework multi-agent dla SaaS?"}
  TYLKO pytanie. Brak kontekstu projektu. Narrow Context.

Krok 2: PLANOWANIE WYSZUKIWANIA
  Researcher Tech rozbija pytanie na pod-zapytania:
  - "multi-agent framework comparison 2026"
  - "LangGraph production deployment"
  - "CrewAI enterprise use cases"
  - "Claude Agent SDK vs OpenAI Agents SDK"

Krok 3: WYSZUKIWANIE (WebSearch)
  Rownolegle zapytania do WebSearch
  Zbieranie URLi, tytulów, snippetow

Krok 4: POGLEBIONE CZYTANIE (WebFetch)
  Dla top 5-10 wynikow: pelne pobranie strony
  Ekstrakcja kluczowych danych

Krok 5: ANALIZA LOKALNA (Read, Grep, Glob)
  Sprawdzenie lokalnego kodu projektu
  Identyfikacja aktualnego stacku

Krok 6: SYNTEZA I POROWNANIE
  Minimum 3 opcje z pros/cons
  Snippety setup dla kazdej
  Znane issues i ryzyka

Krok 7: OCENA PEWNOSCI
  Kazdy finding dostaje confidence_score
  Bazowany na hierarchii zrodel

Krok 8: IDENTYFIKACJA LUK
  Co NIE zostalo znalezione?
  Gdzie dane sa niepelne?

Krok 9: FORMATOWANIE RAPORTU
  Structured JSON output
  Wszystkie pola wymagane

Krok 10: DOSTARCZENIE
  Researcher Tech --> Research Critic
  (lub Researcher Tech --> Orkiestrator, jesli brak Critica)
```

### 8.2 Interakcja z Research Critic

Po dostarczeniu raportu, **Research Critic** (agent bramkowy) waliduje wyniki wedlug rubryki:

| Kryterium | Waga | Opis |
|-----------|------|------|
| Completeness | 25% | Czy pokryto wszystkie aspekty pytania? |
| Accuracy | 25% | Czy fakty sa poprawne i zweryfikowane? |
| Relevance | 20% | Czy findings sa relevant dla pytania? |
| Freshness | 20% | Czy zrodla sa aktualne? |
| Actionability | 10% | Czy rekomendacje sa konkretne i wykonalne? |

**Score ponizej 6/10 = REWIZJA.** Researcher Tech musi poprawic raport na podstawie feedbacku Critica. Typowe powody rewizji:

- Brak zrodel dla kluczowych twierdzen
- Przestarzale dane (zrodla sprzed >12 miesiecy)
- Brak porownania alternatyw (mniej niz 3 opcje)
- Luki w analizie ryzyk
- Niskie confidence scores bez wyjasnien

### 8.3 Typowy czas i koszt zadania

| Metryka | Wartosc |
|---------|---------|
| Sredni czas wykonania | 30-90 sekund |
| Srednie zuzycie tokenow (input) | 15,000-25,000 |
| Srednie zuzycie tokenow (output) | 6,000-12,000 |
| Sredni koszt per zadanie | $0.03-0.06 |
| Typowa liczba WebSearch calls | 4-8 |
| Typowa liczba WebFetch calls | 3-6 |

---

## 9. Researcher Tech vs inne Researchery

### 9.1 Tabela porownawcza

| Wymiar | Tech | UX | Reddit | X | GitHub | Forums | Docs |
|--------|------|-----|--------|---|--------|--------|------|
| **Cel** | Fakty techniczne | Trendy design | Opinie deweloperow | Szybkie trendy | Dzialajacy kod | Tutoriale, lessons learned | Oficjalna prawda |
| **Zrodla** | Docs, benchmarki, blogi | Dribbble, Behance | r/webdev, r/programming | X/Twitter | Repozytoria OS | SO, Dev.to, Medium | Oficjalna dokumentacja |
| **Pytanie kluczowe** | "JAK zbudowac?" | "JAK powinno WYGLADAC?" | "Co NAPRAWDE mysla devs?" | "Co jest NOWE?" | "Jak INNI to zbudowali?" | "Jakie sa PULAPKI?" | "Co mowi PRODUCENT?" |
| **Typ outputu** | Porownanie 3+ opcji | Mood board 5+ referencji | TOP 10 insightow z linkami | TOP 10 postow z kontekstem | TOP 5 repo z analiza | TOP 10 z takeaways | Index z excerptami |
| **Wiarygodnosc** | Wysoka | Srednia | Srednia-Niska | Niska | Wysoka (kod) | Srednia | Najwyzsza |
| **Model** | Haiku | Haiku | Haiku | Haiku | Haiku | Haiku | Haiku |
| **Load** | 55% | 50% | 50% | 45% | 55% | 50% | 40% |

### 9.2 Synergie miedzy researcherami

Researchery NIE komunikuja sie bezposrednio miedzy soba. Ale ich wyniki sa **komplementarne** i weryfikuja sie wzajemnie:

- **Tech mowi "uzyj LangGraph"** + **Reddit mowi "LangGraph ma stroma krzywa uczenia"** = pelny obraz
- **Tech mowi "CrewAI jest najszybszy do prototypu"** + **GitHub mowi "3 builderow nie moze zmergowac kodu"** = sygnał ostrzegawczy
- **Tech mowi "benchmark A > benchmark B"** + **Docs mowi "wersja z benchmarku jest deprecated"** = nieaktualne dane

To **Research Critic** wykrywa te sprzecznosci i luki. Researchery sa celowo izolowane -- kazdy patrzy swoimi oczami, nie wiedzac, co znalezl kolega.

### 9.3 Kiedy potrzeba wszystkich 6 researcherow?

Nie kazdy projekt wymaga pelnego "Research Swarm":

| Wielkosc zespolu | Liczba researcherow | Kiedy? |
|-----------------|---------------------|--------|
| Recon Squad (3 agenty) | 1 (Tech) | POC, spike, badanie wykonalnosci |
| Content Pipeline (4) | 2 (Forums + Tech) | Dokumentacja, artykuly |
| Startup MVP (5) | 1 (Tech) | MVP, maly SaaS |
| Standard Dev (8) | 2 (Tech + UX) | Typowe projekty web |
| Research Swarm (9) | 6 + Critic + Syntetyk | Due diligence, analiza rynku |
| Deep Research+Build (18) | 6 + Critic + Syntetyk + 4 build + 3 QA | Enterprise z gleboka analiza |

**Researcher Tech jest JEDYNYM researcherem obecnym we WSZYSTKICH presetach** -- od najmniejszego (Recon Squad) po najwiekszy (Full Orchestra). To potwierdza jego status jako **fundamentalnego agenta badawczego**.

---

## 10. Anty-wzorce -- Czego unikac

### 10.1 Shallow Search (Plytkie wyszukiwanie)

**Objaw:** Researcher Tech zwraca wyniki z jednego zapytania WebSearch, bez poglebionego czytania.
**Skutek:** Powierzchowne dane, brak nuansow, falszywe porownania.
**Rozwiazanie:** Minimum 4 zapytania WebSearch + 3 pelne WebFetch per zadanie badawcze.

```
ZLE:
  WebSearch("React vs Vue 2026") --> 3 linki --> raport

DOBRZE:
  WebSearch("React 19 SSR performance benchmark 2026")
  WebSearch("Vue 4 production deployment enterprise")
  WebSearch("React vs Vue bundle size comparison")
  WebSearch("React 19 known issues migration")
  WebFetch(top 5 wynikow)
  --> pelna analiza --> raport
```

### 10.2 Source Bias (Stronniczosc zrodel)

**Objaw:** Wszystkie zrodla pochodza od jednego vendora lub z jednego ekosystemu.
**Skutek:** Rekomendacja oparta na marketingu, nie na faktach.
**Rozwiazanie:** Minimum 3 niezalezne zrodla dla kazdej rekomendacji. Vendor docs + niezalezny benchmark + community feedback.

```
ZLE:
  Zrodla: next.js docs, vercel blog, vercel case study
  Rekomendacja: "Next.js jest najlepszy"

DOBRZE:
  Zrodla: next.js docs, niezalezny benchmark, reddit r/webdev, 
          porownanie z Remix/Astro, production case study non-Vercel
  Rekomendacja: "Next.js najlepszy dla SSR, Astro dla static, Remix dla forms"
```

### 10.3 No Confidence Score (Brak oceny pewnosci)

**Objaw:** Wszystkie findings maja taki sam poziom pewnosci lub brak confidence_score.
**Skutek:** Research Critic nie moze priorytetyzowac. Orkiestrator traktuje spekulacje jak fakty.
**Rozwiazanie:** Kazdy finding z jawnym confidence_score 0.0-1.0 z uzasadnieniem.

### 10.4 Hallucinated Sources (Wymyslone zrodla)

**Objaw:** URL w raporcie prowadzi do 404 lub do strony o innej tresci.
**Skutek:** Caly raport traci wiarygodnosc. Research Critic powinien odrzucic calosc.
**Rozwiazanie:** **Kazdy URL z WebFetch**, nie z pamieci modelu. Jesli nie mozna znalezc zrodla przez WebSearch -- to nie jest fakt, to spekulacja. Oznacz jawnie: `"confidence_score": 0.3, "note": "nie znaleziono zrodla potwierdzajacego"`.

### 10.5 Recency Bias (Stronniczosc na nowe)

**Objaw:** Rekomendowanie najnowszej technologii tylko dlatego, ze jest nowa, ignorujac sprawdzone rozwiazania.
**Skutek:** Niestabilne rekomendacje oparte na hype, nie na battle-tested rozwiazaniach.
**Rozwiazanie:** Zawsze porownaj z "nudna, ale sprawdzona" opcja. Nowa technologia potrzebuje wyzszego progu dowodow.

### 10.6 Copy-Paste Research (Kopiuj-Wklej)

**Objaw:** Raport to dosowna kopia fragmentow dokumentacji bez analizy i kontekstualizacji.
**Skutek:** Brak wartosci dodanej -- Orkiestrator moglby sam przeczytac docs.
**Rozwiazanie:** Kazdy finding z wlasna analiza: dlaczego to relevant? Jakie ryzyka? Jak to porownuje sie z alternatywami?

> **UWAGA!**
> Najnibezpieczniejszym anty-wzorcem jest **Hallucinated Sources**. Modele jezykowe maja tendencje do generowania "prawdopodobnych" URLi, ktore nie istnieja. W systemie wieloagentowym jeden falszywy URL moze propagowac sie przez caly pipeline -- Critic go akceptuje, builder na nim bazuje, QA nie weryfikuje zrodel. Dlatego Gold Standard wymaga, zeby **kazdy URL byl wynikiem realnego WebSearch + WebFetch**, nigdy z pamieci modelu.

---

## 11. Najlepsze praktyki 2025-2026

### 11.1 Zasada "3-3-3"

Minimum **3 opcje** porownania, minimum **3 niezalezne zrodla** per opcja, minimum **3 wymiary** porownania (performance, koszt, maintenance).

### 11.2 Freshness Check

Zawsze sprawdz date zrodla. Technologia zmienia sie szybko:

- Zrodlo z 2024: **moze byc nieaktualne** (sprawdz wersje)
- Zrodlo z Q1-Q2 2025: **prawdopodobnie aktualne** (zweryfikuj)
- Zrodlo z Q3 2025-2026: **aktualne** (uzyj z wysokim confidence)

### 11.3 Snippet > Opis

Dzialajacy snippet kodu jest warty wiecej niz 1000 slow opisu. Dla kazdej rekomendowanej technologii podaj:

```
// Minimalny working example
import { StateGraph } from "@langchain/langgraph";

const graph = new StateGraph({
  channels: { messages: { value: [] } }
});
// ... konfiguracja nodes i edges
const app = graph.compile();
const result = await app.invoke({ messages: ["Hello"] });
```

### 11.4 Known Issues First

Zanim zarekomenduj technologie, sprawdz:

1. GitHub Issues z labelem "bug" w ostatnich 30 dniach
2. npm/PyPI changelogi -- breaking changes?
3. Security advisories (CVE)
4. Migration guides (czy jest sciezka upgrade?)

### 11.5 Vendor Lock-in Assessment

Dla kazdej technologii ocen:

| Poziom lock-in | Opis | Przyklad |
|----------------|------|---------|
| Brak | W pelni model-agnostic, open-source | LangGraph |
| Niski | Open-source, ale mocne powiazanie z ekosystemem | CrewAI |
| Sredni | Zamkniety produkt, ale standardowe API | OpenAI Agents SDK |
| Wysoki | Zamkniety, wlasne protokoly | Zintegrowane rozwiazania cloud |

### 11.6 Porownanie z "Do-Nothing" opcja

Kazde porownanie powinno zawierac opcje **"nie rob nic"** lub **"napisz custom"**. Czesto najlepszym frameworkiem jest brak frameworka:

> "Most production agents don't use a framework at all. They're custom code -- a few hundred lines of Python or TypeScript." -- BirJob, 2026

### 11.7 Saturacja agentow

Badania z 2026 pokazuja, ze **saturacja efektywnosci nastepuje przy 4 agentach** -- powyzen tej liczby, narzut koordynacji zjada zyski. Researcher Tech powinien uwzgledniac ten fakt w rekomendacjach dotyczacych rozmiaru zespolu.

### 11.8 Multi-Source Triangulation

Najlepsza rekomendacja to taka, ktora jest potwierdzona przez **3 rozne typy zrodel**:

```
Oficjalna dokumentacja (co PRODUCENT mowi)
  + Niezalezny benchmark (co DANE pokazuja)
  + Community feedback (co UZYTKOWNICY doswiadczaja)
  = WYSOKA PEWNOSC rekomendacji
```

> **CZY WIESZ, ZE...?**
> Wedlug danych z marca 2026, **MCP (Model Context Protocol)** osiagnal 97 milionow lacznych pobrań SDK w zaledwie 16 miesiecy -- szybciej niz React osiagnal 100 milionow na npm (co zajelo ~3 lata). To pokzuje, jak szybko zmienia sie krajobraz technologiczny. Researcher Tech, ktory nie uzywa WebSearch i bazuje tylko na wiedzy z treningu, operuje na danych sprzed miesiecy -- a w swiecie AI to cala epoka.

---

## 12. Podsumowanie + Quick Reference Card

### 12.1 Kluczowe wnioski

Researcher Tech (R-01) to **fundamentalny agent badawczy** w architekturze Gold Standard 2026. Jest obecny w kazdym presecie -- od 3-agentowego Recon Squad po 18-agentowy Deep Research+Build. Jego sila lezy w:

1. **Specjalizacji** -- szuka TYLKO faktow technicznych (docs, benchmarki, blogi), nie opinii
2. **Strukturze** -- output to parsowany JSON, nie wolny tekst
3. **Ekonomii** -- Haiku model redukuje koszty o ~95% vs Opus
4. **Izolacji** -- Narrow Context Principle minimalizuje halucynacje
5. **Walidacji** -- Research Critic weryfikuje kazdy raport wedlug 5-wymiarowej rubryki

### 12.2 Analogia koncowa

Jesli system wieloagentowy to statek na oceanie zadan, to:

- **Orkiestrator** to Kapitan na mostku
- **Analityk** to Nawigator z mapa
- **Researcher Tech** to **Zwiadowca wysylany na lad** -- bada teren, zbiera informacje, wraca z raportem. Nie podejmuje decyzji o kursie statku. Nie buduje portu. Nie naprawia kadluba. Jego wartosc jest w **jakosci informacji, ktore przynosi**. Bez niego, Kapitan plynie na slepo.

### 12.3 Quick Reference Card

```
+===============================================+
|        RESEARCHER TECH (R-01)                 |
|        Quick Reference Card                   |
+===============================================+
|                                               |
|  WARSTWA:    RESEARCH (Faza 1)                |
|  MODEL:      Claude Haiku                     |
|  KOSZT:      $0.80/$4.00 per 1M tokenow      |
|  LOAD:       55%                              |
|                                               |
|  NARZEDZIA:  WebSearch | WebFetch | Read      |
|              Grep | Glob                      |
|                                               |
|  BRAK:       Write | Edit | Bash | Agent      |
|                                               |
|  INPUT:      Pytanie badawcze (narrow context)|
|  OUTPUT:     Structured JSON report           |
|                                               |
|  MINIMUM:    3 opcje porownania               |
|              3 niezalezne zrodla per opcja     |
|              Confidence score 0.0-1.0         |
|              URL przy KAZDYM twierdzeniu       |
|                                               |
|  RAPORTUJE DO: Research Critic lub            |
|                Orkiestrator                    |
|                                               |
|  GATE:       Critic score <6/10 = REWIZJA     |
|                                               |
|  ZASADY:                                      |
|  - Kazde twierdzenie z URL zrodla             |
|  - Snippet kodu > opis slowny                 |
|  - Porownaj min. 3 opcje (ZAWSZE)             |
|  - Sprawdz date zrodla (freshness)            |
|  - Jawnie identyfikuj LUKI w danych           |
|  - NIE podejmuj decyzji -- REKOMENDUJ         |
|  - NIE wchodz na teren innych researcherow    |
|                                               |
|  ANTY-WZORCE:                                 |
|  x Shallow Search (1 zapytanie)               |
|  x Source Bias (vendor-only zrodla)           |
|  x No Confidence Score                        |
|  x Hallucinated Sources (wymyslone URL)       |
|  x Recency Bias (nowe = lepsze)               |
|  x Copy-Paste Research (brak analizy)         |
|                                               |
|  HIERARCHIA ZRODEL:                           |
|  Docs > Eng Blog > Benchmark > Tech Blog >   |
|  > Tutorial > Forum > Tweet                   |
|                                               |
+===============================================+
```

---

> **UWAGA! -- Przypomnienie koncowe**
> Researcher Tech jest agentem **read-only**. Moze czytac caly internet i caly lokalny system plikow, ale nie moze zmienic ani jednego bajtu. To nie jest wada -- to **fundamentalna zasada bezpieczenstwa** (Principle of Least Privilege). W systemie wieloagentowym, agent ktory zbiera informacje NIE powinien moc modyfikowac srodowiska. To separacja, ktora chroni przed przypadkowa (lub celowa) destrukcja danych przez agenta badawczego.

---

*Dokument przygotowany na podstawie Gold Standard Agent Architecture 2026, AGENT_TEAMS_CONFIGURATOR v8.0, analiz ALPHA/OMEGA Team oraz badan multi-agent systems 2025-2026. Wszystkie dane o cenach i statystykach aktualne na marzec-kwiecien 2026.*


---

# PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

```
Stworz 5-7 minutowa prezentacje wideo o agencie RESEARCHER TECH (R-01) -- Technical Facts Researcher w architekturze Gold Standard 2026 Multi-Agent AI.

HOOK OTWARCIA (0:00-0:25):
Zacznij od prowokacyjnego stwierdzenia: "Twoi agenci AI sa tak dobrzy, jak ICH research. Jesli karmisz ich smieci -- wypluja smieci w zlotej ramce."
Natychmiast pokaz statystyke: "MCP osiagnal 97 milionow pobran SDK w 16 miesiecy -- szybciej niz React osiagnal 100 milionow na npm. Agent bez WebSearch operuje na danych sprzed miesiecy -- a w swiecie AI to cala epoka."
Wizualnie: ciemne tlo (#0F172A), animowany tekst w kolorze Electric Blue (#3B82F6), efekt "pulse" na statystykach.

SEKCJA 1 -- KIM JEST RESEARCHER TECH (0:25-1:15):
Pokaz agenta R-01 jako "Detektywa Technologicznego" -- nie tego z pistoletem, ale tego z archiwum.
Animacja: sylwetka agenta z lupa przegladajacego stosy dokumentow, ktore zamieniaja sie w ustrukturyzowany JSON.
Kluczowe fakty na ekranie:
- Warstwa: RESEARCH (Faza 1 -- zawsze pierwszy)
- Model: Claude Haiku ($0.80/$4.00 per 1M tokenow) -- najtanszy
- Rola: READ-ONLY -- moze czytac caly internet, nie moze zmienic ani jednego bajtu
- JEDYNY researcher obecny we WSZYSTKICH presetach (od 3-agent Recon do 18-agent Deep Research)
Pytanie kluczowe na pelnym ekranie: "JAK ZBUDOWAC?"

SEKCJA 2 -- NARZEDZIA I OGRANICZENIA (1:15-2:15):
Animacja split-screen: LEWA strona = "ARSENAL" (5 narzedzi), PRAWA = "ZAKAZANE" (4 narzedzia).
Arsenal (zielone ikony #10B981, animacja pojawiania sie jeden po drugim):
1. WebSearch -- lupa z globusem -- "Wyszukiwanie w internecie"
2. WebFetch -- strzalka pobierania -- "Pelne pobieranie stron"
3. Read -- oko -- "Czytanie plikow lokalnych"
4. Grep -- regex symbol -- "Wyszukiwanie wzorcow"
5. Glob -- folder z gwiazdka -- "Wyszukiwanie plikow po nazwie"
Zakazane (czerwone ikony #EF4444, przekreslone):
Write, Edit, Bash, Agent -- z podpisem "Principle of Least Privilege"
Animacja: sciana ogniowa miedzy arsenelem a zakazanymi narzedziami.

SEKCJA 3 -- LIVE RESEARCH FLOW (2:15-3:30):
KLUCZOWA SEKCJA -- pokaz zywego procesu badawczego krok po kroku.
Animacja flowchart od lewej do prawej:
[Orkiestrator] --pytanie--> [R-01] --WebSearch x4--> [Wyniki] --WebFetch x3--> [Pelne dane]
                                    --Read/Grep--> [Lokalny kod]
                                    --Synteza--> [JSON Report] --dostarczenie--> [Research Critic]
Kazdy krok z licznikiem czasu (30-90s total) i kosztu ($0.03-0.06).
Pokaz przykladowe zapytania WebSearch:
- "multi-agent framework comparison 2026"
- "LangGraph production deployment"
- "CrewAI enterprise use cases"
Pod spodem: Narrow Context Principle -- "Dostaje TYLKO pytanie. Nie wie o budzecie. Nie wie o preferencjach. CELOWO."

SEKCJA 4 -- PIRAMIDA ZRODEL I ZASADA 3-3-3 (3:30-4:30):
Animowana piramida hierarchii zrodel (od dolu do gory, od najmniej do najbardziej wiarygodnych):
Poziom 7 (dol): Tweet -- szary, najwaszy
Poziom 6: Forum (SO, Dev.to) -- jasny niebieski
Poziom 5: Tutorial (Medium) -- niebieski
Poziom 4: Tech Blog (InfoQ) -- sredni niebieski
Poziom 3: Benchmark (niezalezny) -- ciemny niebieski
Poziom 2: Eng Blog (oficjalny) -- Electric Blue
Poziom 1 (gora): Docs (oficjalna dokumentacja) -- zloty (#F59E0B)
Obok piramidy: animacja zasady 3-3-3:
- 3 OPCJE porownania (trzy karty)
- 3 ZRODLA per opcja (trzy linki pod kazda karta)
- 3 WYMIARY porownania (performance / koszt / maintenance)
Confidence Score: animowany termometr: 0.9+ zielony, 0.7-0.89 zolty, 0.5-0.69 pomaranczowy, <0.5 czerwony.

SEKCJA 5 -- GALERIA ANTY-WZORCOW (4:30-5:30):
Szesc kart anty-wzorcow, kazda z ikona ostrzezenia (#EF4444):
1. Shallow Search -- lupa z jednym wynikiem -- "1 zapytanie to nie research"
2. Source Bias -- trzy linki od tego samego vendora -- "3 linki od Vercela != 3 niezalezne zrodla"
3. No Confidence Score -- puste pole -- "Bez oceny pewnosci, spekulacja = fakt"
4. Hallucinated Sources -- URL z 404 -- "Wymyslony URL to gorzej niz brak URL"
5. Recency Bias -- kalendarz z "NEW!" -- "Nowe != lepsze"
6. Copy-Paste Research -- ctrl+c/ctrl+v -- "Kopiowanie docs to nie analiza"
Najgroniejszy: Hallucinated Sources -- podswietl czerwona ramka z animacja pulsowania.
Pokaz propagacje: falszywy URL --> Critic akceptuje --> Builder bazuje --> QA nie weryfikuje --> KATASTROFA.

SEKCJA 6 -- EKONOMIA I POROWNANIE (5:30-6:15):
Tabela animowana: koszt 6 researcherow na Opus ($5.40) vs Haiku ($0.29) = oszczednosc 94.6%.
Wizualizacja: dwie wiezy monet -- wysoka (Opus) vs niska (Haiku), z ta sama jakoscia outputu.
Porownanie z innymi researcherami: tabela 6 kolumn (Tech/UX/Reddit/X/GitHub/Forums).
Podkresli: R-01 = jedyny obecny we WSZYSTKICH presetach. Najwyzsze Load (55%).
Metafora: "Haiku to skuter w korkach -- szybszy i tanszy niz Ferrari do dostawy pizzy."

ZAMKNIECIE (6:15-6:50):
Metafora statku: Orkiestrator = Kapitan, Analityk = Nawigator, Researcher Tech = Zwiadowca wysylany na lad.
"Bez Zwiadowcy, Kapitan plynie na slepo."
Quick Reference Card na pelnym ekranie -- wszystkie kluczowe dane w jednym miejscu.
Ostatni ekran: "Researcher Tech -- fundamentalny agent badawczy. Obecny ZAWSZE. Pierwszy w akcji. Ostatni w kosztach."

STYL WIZUALNY:
- Tlo: ciemny granat (#0F172A), lekki gradient do (#1E293B)
- Glowny kolor: Electric Blue (#3B82F6) -- naglowki, podkreslenia, ikony
- Akcent pozytywny: Emerald Green (#10B981) -- zweryfikowane zrodla, poprawne praktyki
- Akcent negatywny: Red (#EF4444) -- anty-wzorce, zakazane narzedzia, hallucynacje
- Akcent ostrzezenia: Amber (#F59E0B) -- uwagi, dokumentacja oficjalna (najwyzsza hierarchia)
- Tekst: bialy (#F8FAFC) na ciemnym tle
- Font: monospace dla kodu i JSON, sans-serif dla narracji
- Motyw przewodni: lupa (wyszukiwanie), antena satelitarna (zbieranie danych), radar (skanowanie zrodel)
- Animacje: plynne fade-in, slide-from-left dla flowchartow, pulse na statystykach
- Muzyka: ambientowa, technologiczna, niska intensywnosc -- bez wokalu

NARRATOR:
- Ton: profesjonalny, rzeczowy, z nutka fascynacji technologia
- Tempo: umiarkowane, z pauzami na kluczowe statystyki
- Jezyk: polski, bez diacritics w napisach na ekranie (ASCII-only)
```

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Stworz pionowa infografike (1080x3200px) o agencie RESEARCHER TECH (R-01) -- Technical Facts Researcher w architekturze Gold Standard 2026 Multi-Agent AI.

SEKCJA 1 -- NAGLOWEK (0-280px):
Tlo: gradient od ciemnego granatu (#0F172A) do (#1E293B).
Tytul: "RESEARCHER TECH (R-01)" -- font bold 48px, kolor Electric Blue (#3B82F6).
Podtytul: "Wywiadowca Technologiczny | Gold Standard 2026" -- font 20px, kolor szary (#94A3B8).
Ikona: duza lupa z satelita w srodku -- motyw przewodni calej infografiki.
Badge w prawym gornym rogu: "WARSTWA: RESEARCH" -- tlo Electric Blue, tekst bialy.
Linia oddzielajaca: gradient Electric Blue --> transparent.

SEKCJA 2 -- METRYKI KLUCZOWE (280-520px):
Cztery karty metryk w rzedzie 2x2, kazda z ikona i wartoscia:
[Karta 1] Model: Claude Haiku -- ikona procesora -- tlo (#1E293B) z border Electric Blue
[Karta 2] Koszt: $0.80/$4.00 per 1M tokenow -- ikona monety -- tlo (#1E293B), tekst Emerald (#10B981)
[Karta 3] Czas: 30-90 sekund -- ikona zegara -- tlo (#1E293B)
[Karta 4] Load: 55% -- ikona progress bar -- tlo (#1E293B), bar Electric Blue
Pod kartami: pasek "Koszt per zadanie: $0.03-0.06" -- wyrozniony Emerald Green (#10B981).
Dodatkowy badge: "NAJTANSZY MODEL" z ikona pioruna.

SEKCJA 3 -- ARSENALE NARZEDZI (520-820px):
Split layout: lewa polowa "DOZWOLONE" (zielone), prawa "ZAKAZANE" (czerwone).
DOZWOLONE (border Emerald #10B981):
1. WebSearch -- ikona lupy z globusem -- "Wyszukiwanie w internecie"
2. WebFetch -- ikona strzalki pobierania -- "Pobieranie zawartosci stron"
3. Read -- ikona oka -- "Czytanie plikow lokalnych"
4. Grep -- ikona regex -- "Wyszukiwanie wzorcow w plikach"
5. Glob -- ikona folderu z * -- "Wyszukiwanie plikow po nazwie"
ZAKAZANE (border Red #EF4444, ikony przekreslone):
Write -- "NIE tworzy plikow"
Edit -- "NIE modyfikuje kodu"
Bash -- "NIE uruchamia komend"
Agent -- "NIE deleguje do innych"
Na dole sekcji: banner "READ-ONLY AGENT -- Principle of Least Privilege" -- tlo Red/10%, border Red.

SEKCJA 4 -- PIRAMIDA ZRODEL (820-1180px):
Centralna wizualizacja: piramida 7 poziomow (od dolu do gory):
Poziom 7 (najszerszy, dol): "Tweet" -- kolor szary (#64748B), confidence <0.5
Poziom 6: "Forum (SO, Dev.to)" -- kolor jasny niebieski (#93C5FD), confidence 0.5-0.6
Poziom 5: "Tutorial (Medium)" -- kolor niebieski (#60A5FA), confidence 0.6-0.7
Poziom 4: "Tech Blog (InfoQ)" -- kolor sredni niebieski (#3B82F6), confidence 0.7-0.8
Poziom 3: "Benchmark (niezalezny)" -- kolor ciemny niebieski (#2563EB), confidence 0.8-0.9
Poziom 2: "Eng Blog (oficjalny)" -- kolor indigo (#4F46E5), confidence 0.85-0.95
Poziom 1 (najwazszy, gora): "Oficjalna Dokumentacja" -- kolor zloty (#F59E0B), confidence 0.9+
Po prawej stronie piramidy: skala confidence_score z kolorowymi markerami.
Tytul sekcji: "HIERARCHIA WIARYGODNOSCI ZRODEL" -- Electric Blue.

SEKCJA 5 -- ZASADA 3-3-3 (1180-1450px):
Trzy duze kolumny z ikonami i liczbami:
[Kolumna 1] Wielka cyfra "3" w Electric Blue + "OPCJE porownania" -- ikona trzech kart
[Kolumna 2] Wielka cyfra "3" w Emerald + "ZRODLA per opcja" -- ikona trzech linkow
[Kolumna 3] Wielka cyfra "3" w Amber + "WYMIARY porownania" -- ikona performance/koszt/maintenance
Pod kolumnami: przykladowy mini-schemat:
"LangGraph vs CrewAI vs Claude Agent SDK"
"Docs + Benchmark + Community" (pod kazda opcja)
"Performance | Koszt | Maintenance" (wymiary)

SEKCJA 6 -- PRZYKLADOWY JSON OUTPUT (1450-1820px):
Sformatowany blok JSON z podswietlona skladnia:
{
  "agent_id": "R-01",
  "research_question": "Jaki framework multi-agent?",
  "findings": [
    {
      "topic": "LangGraph",
      "relevance": "HIGH",
      "confidence_score": 0.92,
      "sources": ["https://langchain-ai.github.io/langgraph/"],
      "source_date": "2026-03"
    }
  ],
  "recommendations": ["LangGraph dla zlozonych workflow..."],
  "risks": ["CrewAI: 3x wiecej tokenow..."],
  "gaps": ["Brak benchmarkow head-to-head..."]
}
Kolorowanie skladni: klucze w Electric Blue, stringi w Emerald, liczby w Amber, nawiasy w szarym.
Pod JSON: legenda pol: "confidence_score 0.0-1.0 | sources = URL WYMAGANY | gaps = czego NIE znaleziono"

SEKCJA 7 -- RESEARCH FLOW (1820-2150px):
Poziomy flowchart z ikonami i strzalkami:
[Orkiestrator] --(pytanie)--> [R-01 WebSearch x4] --(URLe)--> [WebFetch x3] --(dane)-->
[Read/Grep lokalne] --(synteza)--> [JSON Report] --(dostarczenie)--> [Research Critic]
Pod flowchartem: "Score <6/10 = REWIZJA" z czerwona strzalka powrotna do R-01.
Metryki na flowcharcie: "4-8 WebSearch calls | 3-6 WebFetch calls | 30-90s | $0.03-0.06"
Narrow Context Principle: chmurka z "Dostaje TYLKO pytanie -- brak kontekstu projektu".

SEKCJA 8 -- TABELA POROWNAWCZA RESEARCHEROW (2150-2520px):
Tabela 7 kolumn x 6 wierszy:
Kolumny: Tech (R-01) | UX (R-02) | Reddit (R-03) | X (R-04) | GitHub (R-05) | Forums (R-06)
Wiersze:
1. Cel: Fakty tech | Trendy design | Opinie devs | Szybkie trendy | Dzialajacy kod | Pulapki
2. Zrodla: Docs, benchmarki | Dribbble, Behance | r/webdev | X/Twitter | Repozytoria OS | SO, Dev.to
3. Pytanie: "JAK zbudowac?" | "JAK wyglada?" | "Co mysla devs?" | "Co nowe?" | "Jak inni?" | "Jakie pulapki?"
4. Wiarygodnosc: Wysoka | Srednia | Srednia-Niska | Niska | Wysoka | Srednia
5. Load: 55% | 50% | 50% | 45% | 55% | 50%
Kolumna Tech podswietlona Electric Blue z badge "OBECNY WE WSZYSTKICH PRESETACH".
Pozostale kolumny: tlo ciemniejsze, tekst szary.

SEKCJA 9 -- GALERIA ANTY-WZORCOW (2520-2880px):
Szesc kart w siatce 3x2, kazda z ikona ostrzezenia i krotkim opisem:
[1] Shallow Search -- "1 zapytanie != research" -- ikona: lupa z 1 wynikiem
[2] Source Bias -- "Vendor docs != niezalezne zrodla" -- ikona: 3 identyczne loga
[3] No Confidence Score -- "Bez oceny = chaos" -- ikona: puste pole
[4] Hallucinated Sources -- "NAJGRONIEJSZY -- URL 404" -- ikona: czerwony link -- PODSWIETLONA KARTA, wieksza, czerwone tlo
[5] Recency Bias -- "Nowe != lepsze" -- ikona: etykieta NEW z ostrzezeniem
[6] Copy-Paste Research -- "Kopiowanie != analiza" -- ikona: ctrl+c
Pod kartami: "Hallucinated Sources: falszywy URL --> Critic akceptuje --> Builder bazuje --> QA nie weryfikuje --> KATASTROFA" -- czerwona strzalka propagacji.

SEKCJA 10 -- STOPKA + STATYSTYKA (2880-3200px):
Duza statystyka: "MCP: 97M pobran w 16 miesiecy -- szybciej niz React na npm" -- Amber (#F59E0B), font 28px.
Ekonomia: "6 researcherow: Opus = $5.40 vs Haiku = $0.29 | Oszczednosc: 94.6%" -- dwie wiezy monet.
Metafora: "Haiku to skuter w korkach -- szybszy i tanszy niz Ferrari do dostawy pizzy."
Quick Reference: mini-karta z najwazniejszymi danymi:
"R-01 | Haiku | $0.03-0.06 | 30-90s | 55% load | READ-ONLY | 5 narzedzi | 3-3-3"
Logo/branding: "Gold Standard Agent Architecture 2026" -- Electric Blue.
Copyright: "Agent Architecture Designer | Kwiecien 2026"

PALETA KOLOROW:
- Tlo glowne: #0F172A (ciemny granat)
- Tlo kart: #1E293B (ciemny slate)
- Electric Blue: #3B82F6 (glowny kolor -- naglowki, ikony, podkreslenia)
- Emerald Green: #10B981 (pozytywne metryki, dozwolone narzedzia, oszczednosci)
- Red: #EF4444 (anty-wzorce, zakazane narzedzia, ostrzezenia)
- Amber: #F59E0B (statystyki, dokumentacja najwyzszej hierarchii, liczby)
- Tekst glowny: #F8FAFC (bialy)
- Tekst drugorzedny: #94A3B8 (szary)
- Border kart: #334155 (ciemny border)

TYPOGRAFIA:
- Naglowki: Inter Bold lub podobny sans-serif, rozmiary 48/36/24px
- Body: Inter Regular, 16-18px
- Kod/JSON: JetBrains Mono lub Fira Code, 14-16px
- Metryki: Inter Black, 56px (dla duzych liczb)

STYL:
- Ciemny motyw technologiczny -- profesjonalny, czytelny
- Zaokraglone rogi kart (border-radius 12px)
- Subtelne cienie (box-shadow z czarnym 20%)
- Ikony w stylu outline/line-art, jednokolorowe
- Separatory sekcji: gradient linie Electric Blue --> transparent
- Brak zdjec -- tylko ikony, wykresy, schematy
- Motyw przewodni: lupa + satelita + radar (wyszukiwanie informacji)
```

---

*Dokument wygenerowany dla systemu Gold Standard 2026 Multi-Agent AI Architecture.*
*Agent: Researcher Tech (R-01) | Warstwa: RESEARCH | Model: Claude Haiku*
