# RESEARCH SWARM -- Maksymalna Glebokosc Badawcza

## Kompletny Przewodnik | Tier 4 ENTERPRISE | Preset #22 | Gold Standard 2026

**Seria:** Architektura Agentow AI -- Presety i Konfiguracje
**Preset ID:** `research_swarm`
**Nazwa:** Research Swarm (Roj Badawczy)
**Ikona:** 🧠
**Tier:** 4 (ENTERPRISE)
**Liczba agentow:** 9
**Wzorzec:** Parallel Fan-out → Critique
**Koszt tokenowy:** ~200-400K
**Koszt dolarowy:** $0.20-$0.60
**Latencja:** ~90-240 sekund
**Charakter:** PURE RESEARCH -- zero implementacji
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Dlaczego szesciu researcherow, krytyk i syntetyk?

Wyobraz sobie sprawe kryminalna tak skomplikowana, ze jeden detektyw nie wystarczy. Szef policji wyznacza SZESCIU detektywow -- kazdy bada te sama sprawe, ale z INNEJ perspektywy. Pierwszy przesluchuje swiadkow (Reddit). Drugi analizuje nagrania z kamer (GitHub). Trzeci sprawdza zapisy telefoniczne (X/Twitter). Czwarty bada dokumenty finansowe (Tech/Docs). Piaty przeszukuje fora internetowe (Forums). Szosty analizuje dokumentacje urzedowa (Docs). Kazdy wraca z raportem. Ale szes raportow to jeszcze nie rozwiazanie. Potrzebny jest ktos, kto oceni JAKOSC kazdego raportu -- czy detektyw nie poszedl za falszywym tropem, czy nie pominal kluczowego dowodu, czy jego wnioski sa spojne z faktami. To jest **Research Critic** -- prokurator, ktory kwestionuje kazdy raport, zanim sprawa trafi do sadu. I wreszcie -- ktos musi zebrac wszystkie zweryfikowane ustalenia w jeden, spojny akt oskarzyenia. To jest **Synthesizer** -- analityk, ktory laczy szesc perspektyw w jedna narracje z flagami sprzecznosci.

Taka jest filozofia presetu **Research Swarm** -- najglebszego presetu badawczego w calym ekosystemie Gold Standard 2026. Dziewiec agentow. Szesc rownoczesnych badaczy. Jeden krytyk. Jeden syntetyk. Jeden orkiestrator. I ZERO builderow -- bo Research Swarm nie pisze ani jednej linijki kodu. Jego jedynym produktem jest **wiedza**.

### Trzy analogie do zrozumienia Research Swarm

**Analogia 1: Szesc detektywow badajacych te sama sprawe z roznych katow**

W serialach kryminalnych zawsze jest jeden detektyw-geniusz, ktory sam rozwiazuje sprawe. W rzeczywistosci najtrudniejsze sprawy rozwiazuje ZESPOL -- kazdy czlonek wnosi inna perspektywe, inne zrodla informacji, inne metody dochodzenia. Jeden detektyw moze przeoczyc kluczowy dowod, bo szukal nie w tym miejscu. Szesciu detektywow pokrywa szesc roznych "terytoriow informacyjnych" -- prawdopodobienstwo przeoczenia spada eksponencjalnie. Ale sam liczba detektywow nie gwarantuje sukcesu. Potrzebny jest nadzorca (Critic), ktory sprawdzi, czy raporty sa rzetelne, i analityk (Synthesizer), ktory zlozy puzzle w calosci.

**Analogia 2: Due diligence przed przejsciem firmy za 100 milionow**

Gdy fundusz inwestycyjny rozwazywa akwizycje firmy technologicznej, nie wysyla jednego analityka. Wysyla ZESPOL: prawnika (dokumentacja), analityka finansowego (metryki), inzyniera (stack technologiczny), specjaliste HR (kultura firmy), eksperta rynkowego (konkurencja), analityka mediow spolecznosciowych (reputacja). Kazdy bada jeden aspekt i produkuje niezalezny raport. Nastepnie partner zarzadzajacy (Critic) ocenia wszystkie raporty pod katem rzetelnosci, a glowny analityk (Synthesizer) tworzy unified investment memo z rekomendacja GO/NO-GO. Koszt due diligence to ulamek procenta wartosci transakcji -- ale bez niego fundusz ryzykuje miliony na podstawie niekompletnych informacji.

**Analogia 3: Sklad naukowy peer-reviewed journal**

W nauce kazdy artykul przechodzi przez recenzentow (peer review). Autor (Researcher) przedstawia wyniki. Recenzenci (Critic) oceniaja metodyke, szukaja bledow, identyfikuja brakujace zrodla. Redaktor (Synthesizer) zbiera recenzje i decyduje o publikacji. Research Swarm to ten sam proces, ale zamiast jednego autora masz szesciu, a recenzja jest zautomatyzowana i wielowymiarowa.

> **Czy wiesz, ze...?**
> Badania Anthropic nad Multi-Agent Research Systems wykazaly, ze zespol orkiestrator + wielu podagentow osiaga wyniki o **90.2% lepsze** niz pojedynczy agent na zadaniach badawczych. Klucz: kazdy agent dostaje **waski, precyzyjny zakres** -- nie "zbadaj wszystko", ale "zbadaj TO w TYM zrodle w TYM formacie". Research Swarm formalizuje ten wzorzec do 6 rownoleglych strumieni z krytyczna ewaluacja.

> **Uwaga!**
> Research Swarm to preset **CZYSTO BADAWCZY**. Nie produkuje kodu, nie buduje POC, nie tworzy UI. Jego jedynym outputem jest MANIFEST.md z ujednoliconym raportem badawczym. Jesli potrzebujesz implementacji -- wynik Swarm przekaz do presetu Startup, Feature Sprint lub Full Stack. Jesli potrzebujesz research + POC w jednym -- uzyj Recon Squad.

---

## 2. Sklad zespolu -- Dziewiec agentow, trzy warstwy

Research Swarm sklada sie z **9 agentow** zorganizowanych w trzy funkcjonalne warstwy: KOORDYNACJA (1 agent), RESEARCH (6 agentow), EWALUACJA (2 agentow).

### Agent 1: Orkiestrator (A-00)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | KOORDYNACJA -- definiowanie pytan badawczych, dispatch, decyzje |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50/100 |
| **Narzedzia** | Agent, TaskCreate, TaskUpdate, Read |
| **Zakaz** | Write, Edit, Bash, WebSearch |
| **Tokeny/sesja** | ~25-40K |
| **Koszt/sesja** | ~$0.03-$0.08 |

Orkiestrator w Research Swarm pelni piecu kluczowych funkcji:
1. **Definiuje pytania badawcze** -- rozbija temat na 3-6 konkretnych pytan dla kazdego researchera
2. **Dispatches (fan-out)** -- wysyla pytania do WSZYSTKICH 6 researcherow ROWNOLEGLE
3. **Monitoruje postep** -- sprawdza, czy wszystkie raporty wrocily
4. **Przekazuje do Critica** -- po zebraniu 6 raportow deleguje ewaluacje
5. **Podejmuje decyzje koncowa** -- na podstawie syntezy zatwierdza lub eskaluje

### Agent 2: Researcher Tech (R-01)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- dokumentacja techniczna, benchmarki, blogi |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~20-35K |
| **Koszt/sesja** | ~$0.02-$0.05 |

Specjalizacja: oficjalna dokumentacja, changelogi, benchmarki wydajnosciowe, porownania techniczne na blogach (np. Vercel Blog, Netlify Blog, engineering blogs). Odpowiada na pytanie: **"Co mowi PRODUCENT o tej technologii?"**

### Agent 3: Researcher Reddit (R-03)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- opinie spolecznosciowe, realne doswiadczenia |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 50/100 |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~15-25K |
| **Koszt/sesja** | ~$0.01-$0.03 |

Specjalizacja: r/webdev, r/programming, r/reactjs, r/node, r/SaaS -- anonimowe opinie developerow, "real talk" bez filtra PR. Odpowiada na pytanie: **"Co NAPRAWDE mysla programisci?"**

### Agent 4: Researcher GitHub (R-05)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- repozytoria, architektura, Issues, PR-y |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~20-35K |
| **Koszt/sesja** | ~$0.02-$0.05 |

Specjalizacja: repozytoria open-source, analiza star count/fork ratio, Issues (otwarte vs zamkniete), PR activity, architektura kodu, zdrowie maintainerow. Odpowiada na pytanie: **"Jak to NAPRAWDE wyglada w dzialajacym kodzie?"**

### Agent 5: Researcher Forums (R-06)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- rozwiazane problemy, tutoriale, post-mortem |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 50/100 |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~15-25K |
| **Koszt/sesja** | ~$0.01-$0.03 |

Specjalizacja: StackOverflow (zaakceptowane odpowiedzi), Dev.to (artykuly techniczne), Medium (case studies), Hacker News (dyskusje ekspertow). Odpowiada na pytanie: **"Jakie PROBLEMY napotykaja inni i jak je rozwiazali?"**

### Agent 6: Researcher Docs (R-07)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- oficjalna dokumentacja, API reference, changelogi |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 50/100 |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~15-30K |
| **Koszt/sesja** | ~$0.01-$0.04 |

Specjalizacja: oficjalna dokumentacja API, migration guides, breaking changes, deprecation notices, SDK reference. Rozni sie od Tech Researchera tym, ze czyta TYLKO pierwotne zrodla (docs), nie blogi ani opinie. Odpowiada na pytanie: **"Co DOKLADNIE jest w dokumentacji -- limity, breaking changes, deprecacje?"**

### Agent 7: Researcher X/Twitter (R-04)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- trendy, launche, sygnaly wczesne, influencerzy |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 45/100 |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent |
| **Tokeny/sesja** | ~10-20K |
| **Koszt/sesja** | ~$0.01-$0.02 |

Specjalizacja: X/Twitter -- threadsech technicznych, reakcje na launche, pozycje influencerow (Guillermo Rauch, Dan Abramov, Swyx, Theo). Najszybszy sygnal, najwyzszy szum. Odpowiada na pytanie: **"Co jest TERAZ na topie i dokad zmierzaja trendy?"**

### Agent 8: Research Critic (C-01)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | EWALUACJA -- scoring, bias detection, gap analysis |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 70/100 |
| **Narzedzia** | Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent, WebSearch |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.03-$0.08 |

Research Critic to JEDYNY agent w Swarm, ktory NIE produkuje nowego researchu. Jego rola to **ewaluacja jakosci** szesciu raportow badawczych. Nie szuka informacji -- ocenia informacje dostarczone przez innych. Uzywa modelu Sonnet (nie Haiku), bo ewaluacja wymaga silniejszego rozumowania niz zbieranie danych. Szczegolowy opis rubryk -- patrz sekcja 8.

### Agent 9: Synthesizer (S-01)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | SYNTEZA -- MANIFEST.md, cross-functional insights, contradiction flags |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 65/100 |
| **Narzedzia** | Read, Write, Grep, Glob |
| **Zakaz** | Edit, Bash, Agent, WebSearch |
| **Tokeny/sesja** | ~30-50K |
| **Koszt/sesja** | ~$0.03-$0.08 |

Synthesizer jest "pamiecia dlugoterminowa" calego Swarm. Zbiera 6 raportow badawczych + ewaluacje Critica i produkuje jeden ujednolicony MANIFEST.md. Nie dodaje wlasnych opinii -- wyciaga wnioski WYLACZNIE z dostarczonych danych. Szczegolowy opis -- patrz sekcja 9.

### Diagram architektury

```
                        ┌──────────────────┐
                        │   ORKIESTRATOR    │
                        │   (A-00, Opus)    │
                        │   KOORDYNACJA     │
                        └─┬──┬──┬──┬──┬──┬─┘
              fan-out     │  │  │  │  │  │     dispatch pytania
         ┌────────────────┤  │  │  │  │  ├────────────────┐
         │     ┌──────────┤  │  │  │  ├──────────┐        │
         │     │     ┌────┤  │  │  ├────┐        │        │
         ↓     ↓     ↓   ↓  ↓  ↓  ↓    ↓        ↓        ↓
      ┌──────┬──────┬──────┬──────┬──────┬──────┐
      │ TECH │REDDIT│GITHUB│FORUMS│ DOCS │X/TWI │  6 Researcherow
      │ R-01 │ R-03 │ R-05 │ R-06 │ R-07 │ R-04 │  (Haiku, parallel)
      │Haiku │Haiku │Haiku │Haiku │Haiku │Haiku │
      └──┬───┴──┬───┴──┬───┴──┬───┴──┬───┴──┬───┘
         │      │      │      │      │      │
         ↓      ↓      ↓      ↓      ↓      ↓
      ┌──────────────────────────────────────────┐
      │            6 x Structured JSON            │
      │         (research_report format)          │
      └────────────────┬─────────────────────────┘
                       │ aggregate
                       ↓
              ┌──────────────────┐
              │  RESEARCH CRITIC │
              │  (C-01, Sonnet)  │
              │  EWALUACJA       │
              └────────┬─────────┘
                       │ scored + flagged
                       ↓
              ┌──────────────────┐
              │   SYNTHESIZER    │
              │  (S-01, Sonnet)  │
              │  SYNTEZA         │
              └────────┬─────────┘
                       │ MANIFEST.md
                       ↓
              ┌──────────────────┐
              │   ORKIESTRATOR    │
              │   (A-00, Opus)    │
              │   FINALNA DECYZJA │
              └──────────────────┘
```

> **Czy wiesz, ze...?**
> Research Swarm to jedyny preset w Gold Standard 2026, ktory ma ZERO builderow. Wszystkie 9 agentow sluzy badaniu, ewaluacji i syntezie wiedzy. To swiadomy wybor architektoniczny -- mieszanie badania z implementacja w tym samym presecie prowadzi do "premature implementation bias", gdzie zespol zaczyna budowac zanim naprawde zrozumie problem.

---

## 3. Workflow krok po kroku -- 12 etapow od pytania do manifestu

Research Swarm realizuje scisle zdefiniowany, 12-krokowy workflow. Kazdy krok ma okreslony INPUT, PROCES i OUTPUT.

### Krok 1: Przyjecie zlecenia badawczego

**Kto:** Orkiestrator (A-00)
**Input:** Pytanie badawcze od uzytkownika (np. "Jaki framework AI wybrac do budowy chatbota enterprise?")
**Proces:** Analiza pytania -- identyfikacja domeny, zakresu, ograniczen
**Output:** Wewnetrzna klasyfikacja: domena, zlozonosc, wymagane perspektywy

### Krok 2: Dekompozycja na pytania badawcze

**Kto:** Orkiestrator (A-00)
**Input:** Sklasyfikowane zlecenie
**Proces:** Rozbicie jednego pytania na 3-6 pod-pytan, kazde dopasowane do specjalizacji konkretnego researchera
**Output:** Research Brief -- JSON z pytaniami per researcher

```json
{
  "research_brief": {
    "topic": "Framework AI do enterprise chatbota",
    "questions": {
      "tech": "Porownaj LangChain vs LlamaIndex vs Semantic Kernel -- architektura, benchmarki, ekosystem",
      "reddit": "Jakie sa realne doswiadczenia developerow z LangChain/LlamaIndex w produkcji? Pain points?",
      "github": "Analiza repozytoriow: star trend, issue resolution time, PR activity, architektura kodu",
      "forums": "Najczestsze problemy z frameworkami AI na StackOverflow/HackerNews i ich rozwiazania",
      "docs": "Breaking changes w ostatnich 6 mies., migration guides, deprecation notices kazdego frameworka",
      "x_twitter": "Najnowsze launche, reakcje influencerow, trendy w ekosystemie AI frameworkow"
    },
    "constraints": {
      "max_options": 5,
      "focus_domain": "enterprise",
      "required_metrics": ["latency", "token_cost", "ecosystem_size", "maintenance_burden"],
      "deadline_tokens": 30000
    }
  }
}
```

### Krok 3: Parallel dispatch (Fan-out)

**Kto:** Orkiestrator (A-00)
**Input:** Research Brief
**Proces:** ROWNOLEGLE wywolanie 6 researcherow -- kazdy dostaje SWOJE pytanie + format outputu
**Output:** 6 aktywnych taskow badawczych
**Czas:** ~0 sekund (dispatch jest natychmiastowy)

### Krok 4-9: Szesc rownoleglych badan (PARALLEL)

**Kto:** 6 Researcherow (R-01 do R-07, z wylaczeniem R-02 UX)
**Input:** Indywidualne pytanie badawcze + format outputu
**Proces:** Kazdy researcher przeszukuje SWOJE zrodla i produkuje structured JSON
**Output:** 6 niezaleznych raportow w formacie `research_report`
**Czas:** ~30-90 sekund (rownolegle -- czas = najdluzszy z szesciu)

Przyklad outputu jednego researchera (Tech):

```json
{
  "researcher": "R-01_Tech",
  "topic": "Framework AI do enterprise chatbota",
  "findings": [
    {
      "option": "LangChain",
      "score": 7.8,
      "pros": ["Najwiekszy ekosystem", "1200+ integracji", "Aktywna spolecznosc"],
      "cons": ["Overengineered API", "Breaking changes co 2 tyg.", "Stroma krzywa nauki"],
      "metrics": {
        "latency_p99": "340ms",
        "weekly_downloads": "2.1M",
        "github_stars": "92K",
        "open_issues": "2847"
      }
    },
    {
      "option": "LlamaIndex",
      "score": 8.4,
      "pros": ["Prostsza architektura", "Lepsze RAG", "Stabilniejsze API"],
      "cons": ["Mniejszy ekosystem", "Mniej integracji"],
      "metrics": {
        "latency_p99": "280ms",
        "weekly_downloads": "890K",
        "github_stars": "38K",
        "open_issues": "643"
      }
    }
  ],
  "confidence": 0.82,
  "sources": ["docs.langchain.com", "docs.llamaindex.ai", "python.langchain.com/changelog"],
  "gaps": ["Brak benchmarkow dla Semantic Kernel w produkcji"]
}
```

### Krok 10: Aggregacja i przekazanie do Critica

**Kto:** Orkiestrator (A-00)
**Input:** 6 raportow badawczych
**Proces:** Sprawdzenie kompletnosci (czy wszystkie 6 wrocily?), polaczenie w jeden payload
**Output:** Aggregated Research Package → Research Critic

### Krok 11: Ewaluacja krytyczna

**Kto:** Research Critic (C-01)
**Input:** 6 raportow badawczych (aggregated)
**Proces:** 5-wymiarowa rubyka oceny kazdego raportu (szczegoly w sekcji 8)
**Output:** Evaluation Report z scoringiem, flagami bias, gap analysis

### Krok 12: Synteza i MANIFEST.md

**Kto:** Synthesizer (S-01)
**Input:** 6 raportow + Evaluation Report od Critica
**Proces:** Cross-functional analysis, contradiction detection, unified recommendations
**Output:** **MANIFEST.md** -- finalny produkt Research Swarm

### Calkowity przeplyw -- ASCII flow

```
USER: "Jaki framework AI?"
        │
        ↓
[KROK 1-2] Orkiestrator: analiza + dekompozycja
        │
        ↓ dispatch (fan-out)
        │
   ┌────┼────┬────┬────┬────┬────┐
   ↓    ↓    ↓    ↓    ↓    ↓    ↓
[K4] [K5] [K6] [K7] [K8] [K9]
Tech  Red  Git  For  Doc  X/T     ← PARALLEL (~30-90s)
   │    │    │    │    │    │
   └────┼────┴────┴────┴────┘
        │
        ↓ 6 x JSON reports
[KROK 10] Orkiestrator: aggregacja
        │
        ↓
[KROK 11] Research Critic: ewaluacja 5D
        │
        ↓ scored + flagged
[KROK 12] Synthesizer: MANIFEST.md
        │
        ↓
   ORKIESTRATOR: finalna decyzja
        │
        ↓
   MANIFEST.md → uzytkownik
```

**Calkowity czas:** ~90-240 sekund
**Calkowite tokeny:** ~200-400K
**Calkowity koszt:** ~$0.20-$0.60

> **Czy wiesz, ze...?**
> Dzieki rownoleglosci 6 researcherow, Research Swarm nie trwa 6x dluzej niz preset z 1 researcherem. Czas jest okreslony przez NAJWOLNIEJSZEGO researchera (zwykle GitHub -- analiza repozytoriow jest token-intensive). W praktyce Swarm z 6 researcherami trwa ~1.5-2x dluzej niz Recon z 1 researcherem, ale produkuje ~6x wiecej danych.

---

## 4. INPUT -- Co podajesz Research Swarm?

Research Swarm przyjmuje JEDEN input: **pytanie badawcze** (research question) z opcjonalnymi parametrami.

### Minimalne wymaganie

Jedno pytanie w jezyku naturalnym:

> "Jaki framework AI wybrac do enterprise chatbota z RAG?"

### Optymalne wejscie (research_request)

```json
{
  "question": "Jaki framework AI wybrac do enterprise chatbota z RAG?",
  "domain": "enterprise SaaS",
  "constraints": {
    "budget": "< $500/mies. na API",
    "team_size": "3 backend devs, 1 ML engineer",
    "timeline": "MVP w 8 tygodni",
    "must_have": ["RAG", "streaming", "multi-model support"],
    "nice_to_have": ["self-hosted option", "TypeScript SDK"],
    "exclude": ["rozwiazania closed-source bez self-host"]
  },
  "depth": "maximum",
  "focus_areas": ["production_readiness", "cost", "ecosystem", "stability"]
}
```

### Czego NIE podajesz

- Kodu do analizy (to nie jest code review)
- Specyfikacji do implementacji (Swarm nie buduje)
- Prostych pytan z jedna odpowiedzia (do tego wystarczy Solo)
- Pytan designowych/UX (Swarm nie ma Researcher UX -- uzyj presetu z UX researcherem)

### Jak sformulowac dobre pytanie badawcze?

| Zle pytanie | Dobre pytanie | Dlaczego? |
|-------------|---------------|-----------|
| "Jaki framework?" | "Jaki framework AI do enterprise chatbota z RAG, budzet <$500/mies?" | Kontekst + ograniczenia |
| "React czy Vue?" | "React vs Vue vs Svelte dla dashboardu analitycznego z 50+ wykresami real-time" | Konkretny use case + skala |
| "Najlepsza baza danych" | "PostgreSQL vs ClickHouse vs TimescaleDB dla IoT analytics, 10M eventow/dzien" | Domena + metryki + skala |

> **Uwaga!**
> Research Swarm jest **overkill** dla prostych pytan. "React czy Vue?" nie wymaga 6 researcherow. Uzyj Recon Squad (3 agentow, 1 researcher) dla pytan z 2-5 opcjami. Swarm uruchamiaj gdy: (a) domena jest wielowymiarowa, (b) potrzebujesz cross-platform insights, (c) decyzja ma wysokie koszty odwrocenia (lock-in na lata).

---

## 5. OUTPUT -- Co dostajesz z Research Swarm?

Research Swarm produkuje trzy artefakty. Wszystkie sa czysto tekstowe -- zero kodu, zero UI.

### Artefakt 1: MANIFEST.md (glowny output)

Ujednolicony raport badawczy zawierajacy:

```markdown
# MANIFEST.md -- Research Swarm Report
## Topic: Framework AI do enterprise chatbota z RAG
## Date: 2026-04-01
## Agents: 9 | Researchers: 6 | Tokens: ~320K | Cost: $0.38

---

## Executive Summary
LlamaIndex (score: 8.4/10) rekomendowany dla enterprise RAG chatbota.
Stabilniejsze API niz LangChain, lepsze RAG out-of-the-box, nizszy maintenance burden.
LangChain jako alternatywa dla zespolow z istniejacym ekosystemem LangChain.

## Scored Findings (posortowane wg score)
| # | Opcja | Score | Confidence | Zrodla zgodne | Zrodla sprzeczne |
|---|-------|-------|------------|---------------|------------------|
| 1 | LlamaIndex | 8.4 | 0.87 | Tech, GitHub, Forums | Reddit (mixed) |
| 2 | LangChain | 7.8 | 0.79 | Tech, X | Reddit, Forums (pain points) |
| 3 | Semantic Kernel | 7.2 | 0.61 | Docs, Tech | GitHub (low activity) |
| 4 | Haystack | 6.9 | 0.72 | Forums, GitHub | X (low visibility) |

## Contradiction Map
- [CONFLICT] Reddit vs Tech: Reddit raportuje "LangChain breaking changes co 2 tyg."
  Tech docs: "Stable release cycle." Rozwiazanie: Reddit odnosi sie do v0.1→v0.2
  migration, docs do v0.2+ (stabilniejsze). VERDICT: obie strony maja racje w swoim
  kontekscie czasowym.
- [CONFLICT] GitHub vs X: GitHub pokazuje spadajacy PR activity dla Haystack.
  X influencerzy promuja Haystack 2.0. VERDICT: Haystack przeszedl rewrite --
  stare repo stagnuje, nowe (haystack-ai) rosnie.

## Cross-Functional Insights
1. Zespoly <5 osob preferuja LlamaIndex (Reddit + Forums zgodne)
2. Enterprise z istniejacym Azure stack -- Semantic Kernel (Docs + Tech zgodne)
3. RAG-first approach -- LlamaIndex dominuje (Tech + GitHub + Forums)
4. Agent-first approach -- LangChain dominuje (Tech + X)

## Gap Analysis (Critic flags)
- Brak benchmarkow produkcyjnych dla Semantic Kernel w non-Azure env
- Reddit sample bias: wiecej narzekania niz pochwaly (survival bias)
- X data: influencerzy moga miec sponsorowane partnerstwa

## Recommendations
PRIMARY: LlamaIndex (enterprise RAG chatbot)
SECONDARY: LangChain (jesli potrzebny agent framework)
AVOID: Haystack (w trakcie rewrite, niestabilne API)

## Decision Factors
- Jesli RAG > Agents → LlamaIndex
- Jesli Agents > RAG → LangChain
- Jesli Azure-first → Semantic Kernel

## Next Steps
1. Eskaluj do Recon Squad -- POC z LlamaIndex (estimated: $0.12, 120s)
2. Jesli POC OK → Feature Sprint z LlamaIndex integration
3. Jesli POC FAIL → ponow Recon z LangChain
```

### Artefakt 2: Evaluation Report (od Critica)

Raport ewaluacji z 5-wymiarowym scoringiem kazdego z 6 raportow badawczych (szczegoly rubryk w sekcji 8).

### Artefakt 3: Raw Research Data

6 oryginalnych raportow badawczych w formacie JSON -- dostepne jako zalaczniki do MANIFEST.md dla pelnej transparentnosci i audytu.

> **Czy wiesz, ze...?**
> Contradiction Map to UNIKALNA cecha Research Swarm, ktorej nie da sie osiagnac jednym researcherem. Gdy jeden agent bada wszystko, nie ma kim "sprzeczac sie" z jego wnioskami. Dopiero gdy 6 niezaleznych agentow bada to samo z roznych perspektyw, sprzecznosci WYPLYWAJA naturalnie -- a Synthesizer je dokumentuje. To ten sam mechanizm co peer review w nauce: roznorodnosc perspektyw redukuje blad systemowy.

---

## 6. Fan-out → Critique pattern -- Architektura

Research Swarm implementuje wzorzec **Parallel Fan-out → Sequential Critique** -- jeden z najbardziej zaawansowanych patternow w architekturze wieloagentowej.

### Czym jest Fan-out?

Fan-out to moment, w ktorym Orkiestrator wysyla IDENTYCZNE (lub wyspecjalizowane) zadanie do WIELU agentow ROWNOCZESNIE. Nazwa pochodzi z elektroniki -- "fan-out" to liczba wejsc, ktore moze obsluyc jedno wyjscie logiczne. W kontekscie agentowym: jedno pytanie badawcze (wyjscie Orkiestratora) obsuguje 6 researcherow (wejscia).

```
                    PYTANIE
                       │
            ┌──────────┼──────────┐
            │     ┌────┼────┐     │
            │     │    │    │     │
            ↓     ↓    ↓    ↓     ↓     ↓
           R-01  R-03  R-04  R-05  R-06  R-07
           Tech  Red   X    Git   For   Docs
```

### Czym jest Critique?

Po Fan-out nastepuje faza sekwencyjna: Research Critic CZEKA na WSZYSTKIE 6 raportow, a nastepnie ewaluuje je RAZEM. To jest kluczowe -- Critic nie ocenia kazdego raportu w izolacji, ale POROWNUJE je ze soba, szukajac:

1. **Sprzecznosci miedzy raportami** -- Tech mowi A, Reddit mowi B
2. **Powtarzajacych sie wzorow** -- jesli 4/6 researcherow niezaleznie wskazuja ten sam problem, to silny sygnal
3. **Luk informacyjnych** -- temat, ktorego ZADEN researcher nie poruszyl
4. **Bias detection** -- czy zrodlo ma systemowe nastawienie (np. vendorski blog chwalacy wlasny produkt)
5. **Confidence calibration** -- czy researcher przypisal odpowiedni confidence score swoim findings

### Dlaczego sekwencyjnie, a nie rownolegle?

Critique MUSI byc sekwencyjna -- Critic potrzebuje WSZYSTKICH raportow naraz, zeby je porownac. Gdyby Critic ewaluowal kazdy raport osobno (rownolegle), nie wykrylby sprzecznosci miedzy raportami. To jak recenzent naukowy -- musi przeczytac CALY artykul, zanim wyda ocene.

### Porownanie z innymi wzorcami

| Wzorzec | Opis | Preset |
|---------|------|--------|
| **Direct** | 1 agent, brak koordynacji | Solo |
| **Hub-and-Spoke** | Centralny hub + spoke'i | Recon, Startup |
| **Pipeline** | Sekwencyjny A → B → C | Feature Sprint |
| **Fan-out → Critique** | Parallel research + sequential eval | **Research Swarm** |
| **Full Mesh** | Kazdy z kazdym (pelna siatka) | Gold Standard (14 agents) |

### Zlozonosc komunikacji

Research Swarm ma **O(n+2)** polaczen, gdzie n = liczba researcherow:
- 6 polaczen: Orkiestrator → kazdy Researcher
- 6 polaczen: kazdy Researcher → aggregator (Orkiestrator)
- 1 polaczenie: Orkiestrator → Critic
- 1 polaczenie: Critic → Synthesizer
- 1 polaczenie: Synthesizer → Orkiestrator

**Lacznie: 15 polaczen** -- to wiecej niz Recon (3), ale znacznie mniej niz Full Mesh (O(n^2) = 91 dla 14 agentow).

> **Uwaga!**
> Fan-out → Critique NIE jest skalowalne w nieskonczonosc. Kazdy dodatkowy researcher dodaje ~20-35K tokenow do inputu Critica. Przy 6 researcherach Critic przetwarza ~120-210K tokenow. Przy 12 researcherach przekroczyliby context window wiekszosci modeli. 6 to optymalna liczba -- pokrywa wszystkie glowne kategorie zrodel bez przeciazania Critica.

---

## 7. Szesciu Researcherow -- Tabela porownawcza

Kazdy researcher w Swarm ma unikalna specjalizacje, unikalne zrodla i unikalny typ insights. Razem tworzya "Deep Research Belt" -- pas badawczy pokrywajacy cale spektrum zrodel informacji technologicznej.

### Pelna tabela porownawcza

| Wymiar | Tech (R-01) | Reddit (R-03) | GitHub (R-05) | Forums (R-06) | Docs (R-07) | X/Twitter (R-04) |
|--------|-------------|---------------|---------------|---------------|-------------|------------------|
| **Specjalizacja** | Dokumentacja, benchmarki | Opinie, doswiadczenia | Repozytoria, kod | Rozwiazane problemy | API reference, changelogi | Trendy, launche |
| **Zrodla** | Blogi tech, docs oficjalne | r/webdev, r/programming | GitHub repos, Issues | StackOverflow, Dev.to | Oficjalna dokumentacja | X threads, influencerzy |
| **Pytanie kluczowe** | "Co mowi producent?" | "Co mysla devsi?" | "Jak wyglada kod?" | "Jakie sa pulapki?" | "Co jest w docs?" | "Co jest na topie?" |
| **Typ insights** | Fakty, benchmarki | Opinie, pain points | Architektura, zdrowie repo | Patterns, anti-patterns | Limity, breaking changes | Sygnaly wczesne |
| **Bias risk** | Vendorski marketing | Negativity bias | Star inflation | Outdated answers | Laguje za reality | Hype cycle |
| **Signal-to-noise** | Wysoki (8/10) | Sredni (6/10) | Wysoki (8/10) | Sredni (7/10) | Bardzo wysoki (9/10) | Niski (4/10) |
| **Predkosc info** | Srednia (tygodnie) | Srednia (dni-tygodnie) | Wolna (miesiace) | Wolna (tygodnie-miesiace) | Wolna (miesiace) | Najszybsza (godziny) |
| **Load** | 55/100 | 50/100 | 55/100 | 50/100 | 50/100 | 45/100 |
| **Tokeny/sesja** | ~20-35K | ~15-25K | ~20-35K | ~15-25K | ~15-30K | ~10-20K |
| **Koszt/sesja** | ~$0.02-0.05 | ~$0.01-0.03 | ~$0.02-0.05 | ~$0.01-0.03 | ~$0.01-0.04 | ~$0.01-0.02 |

### Co kazdy researcher WIDZI, a czego NIE WIDZI

**Tech (R-01):** WIDZI oficjalne benchmarki, porownania wydajnosci, architekture techniczna. NIE WIDZI: realnych doswiadczen w produkcji, ukrytych problemow, opinii spolecznosci.

**Reddit (R-03):** WIDZI anonimowe opinie, pain points, realne doswiadczenia z produkcji. NIE WIDZI: obiektywnych benchmarkow, oficjalnej dokumentacji, stanu kodu.

**GitHub (R-05):** WIDZI dzialajacy kod, architekture, PR activity, issue resolution time. NIE WIDZI: dlaczego ludzie wybrali ta technologie, trendow, opinii.

**Forums (R-06):** WIDZI rozwiazane problemy, anti-patterns, tutoriale, post-mortem. NIE WIDZI: najnowszych zmian, trendow, oficjalnych roadmap.

**Docs (R-07):** WIDZI dokladne API, limity, breaking changes, migration guides, deprecation notices. NIE WIDZI: realnej adopcji, opinii, kodu produkcyjnego.

**X/Twitter (R-04):** WIDZI najnowsze launche, reakcje influencerow, wczesne sygnaly trendow. NIE WIDZI: glebokiej analizy, obiektywnych danych, rozwiazanych problemow.

### Dlaczego potrzebujemy WSZYSTKICH szesciu?

Kazde zrodlo ma "slepie pole" (blind spot). Pol-informacja jest gorsza niz brak informacji, bo daje falszywe poczucie pewnosci. Przyklad:

- **Tylko Tech:** "LangChain ma 92K stars i 1200 integracji!" → brzmi swietnie
- **+ Reddit:** "...ale developerzy narzekaja na breaking changes co 2 tygodnie"
- **+ GitHub:** "...i 2847 otwartych issues z medianem resolution 47 dni"
- **+ Forums:** "...a StackOverflow pelen jest pytan o workaroundy dla tych issues"
- **+ Docs:** "...a migration guide z v0.1 do v0.2 ma 47 stron breaking changes"
- **+ X:** "...za to Anthropic wlasnie ogolosilo natywna integracje z LangChain v0.3"

DOPIERO szesc perspektyw daje PELNY obraz. Kazda z osobna jest niekompletna.

---

## 8. Research Critic -- Jak dziala 5-wymiarowa rubyka oceny

Research Critic (C-01) to "prokurator" Research Swarm. Nie produkuje nowego researchu -- ocenia jakosc istniejacego. Uzywa Sonnet (nie Haiku), bo ewaluacja wymaga silniejszego rozumowania niz zbieranie danych.

### 5 wymiarow oceny

Kazdy z 6 raportow badawczych jest oceniany w 5 wymiarach, kazdy na skali 1-10:

**Wymiar 1: Kompletnosc (Completeness) -- max 10 pkt**
Czy raport odpowiedzial na WSZYSTKIE pytania z Research Brief? Czy nie pominat zadnej opcji? Czy pokrywa wymagane metryki?
- 10: Wszystkie pytania, metryki i opcje pokryte
- 7: Wiekszosc pokryta, 1-2 drobne braki
- 4: Polowa pytan bez odpowiedzi
- 1: Raport odbiega od tematu

**Wymiar 2: Wiarygodnosc zrodel (Source Quality) -- max 10 pkt**
Czy zrodla sa wiarygodne? Czy sa aktualne (2025-2026)? Czy researcher podal linki do zrodel?
- 10: Wszystkie zrodla zweryfikowane, aktualne, z linkami
- 7: Wiekszosci zrodel mozna zaufac, nieliczne przestarzale
- 4: Mieszanka wiarygodnych i watpliwych zrodel
- 1: Brak zrodel lub oczywiscie nieaktualne/sfabrykowane

**Wymiar 3: Obiektywnosc (Bias Detection) -- max 10 pkt**
Czy researcher wykazuje stronniczosc? Czy faworyzuje jedna opcje bez uzasadnienia? Czy pomija negatywne aspekty rekomendowanej opcji?
- 10: Zrownowazony, pros/cons dla kazdej opcji
- 7: Lekka tendencja, ale krytyka obecna
- 4: Wyrazna stronniczosc, slabe opcje ignorowane
- 1: Jawna reklama jednej opcji

**Wymiar 4: Glebokosc analizy (Depth) -- max 10 pkt**
Czy researcher poszedl glebiej niz powierzchowne porownanie? Czy dostarczyl metryki, benchmarki, case studies?
- 10: Metryki, benchmarki, case studies, edge cases
- 7: Solidne porownanie z kilkoma metrykami
- 4: Powierzchowne "ten jest dobry, ten jest zly"
- 1: Jednozdaniowe opinie bez danych

**Wymiar 5: Spojnosc z innymi raportami (Cross-Report Coherence) -- max 10 pkt**
Czy wnioski tego raportu sa spojne z innymi 5 raportami? Gdzie sa sprzecznosci? Czy sprzecznosci sa uzasadnione (rozne perspektywy) czy wynikaja z bledow?
- 10: W pelni spojne lub sprzecznosci logicznie uzasadnione
- 7: Drobne rozbieznosci, latwedl wyjanisnienia
- 4: Powazne sprzecznosci bez wyjasnienia
- 1: Raport calkowicie sprzeczny z pozostalymi

### Przyklad Evaluation Report

```
RESEARCH CRITIC EVALUATION
==========================

| Researcher | Completeness | Sources | Bias | Depth | Coherence | TOTAL | PASS? |
|------------|-------------|---------|------|-------|-----------|-------|-------|
| Tech R-01  |     9       |   9     |  7   |   8   |     9     | 42/50 |  YES  |
| Reddit R-03|     7       |   6     |  5   |   7   |     7     | 32/50 |  YES  |
| GitHub R-05|     9       |   9     |  8   |   9   |     8     | 43/50 |  YES  |
| Forums R-06|     8       |   7     |  7   |   6   |     8     | 36/50 |  YES  |
| Docs R-07  |     9       |  10     |  9   |   7   |     9     | 44/50 |  YES  |
| X/Twi R-04 |     6       |   4     |  4   |   5   |     6     | 25/50 |  FLAG |

FLAGS:
- [BIAS] Reddit R-03: Negativity bias -- 80% tresci to narzekania, brak pozytywnych
  doswiadczen. Korekta: wazony wynik Reddit obnizyc o 20%.
- [LOW_QUALITY] X R-04: 3/5 zrodel to tweety influencerow z potencjalnymi sponsorstwami.
  Korekta: traktowac X data jako "sygnal", nie "dowod".
- [GAP] ZADEN researcher nie zbadal kosztow self-hostingu vs cloud.
  Rekomendacja: uzupelnic w Synthesizer jako "unknown".
- [CONFLICT] Tech vs Reddit re: LangChain stabilnosc.
  Analiza: Tech bazuje na docs (oficjalne release notes), Reddit na doswiadczeniach
  (realne breaking changes w upgrade). Oba prawdziwe -- Critic rekomenduje "conditional
  confidence" (9/10 jesli nowy projekt, 6/10 jesli migracja z v0.1).
```

### Progi decyzyjne Critica

| Score | Decyzja | Akcja |
|-------|---------|-------|
| 40-50/50 | EXCELLENT | Raport idzie do Synthesizer bez modyfikacji |
| 30-39/50 | PASS | Raport idzie z notami korygujacymi |
| 20-29/50 | FLAG | Raport wymaga recenzji Orkiestratora -- moze byc ponowiony |
| <20/50 | REJECT | Raport odrzucony -- researcher musi powtorzyc badanie |

> **Czy wiesz, ze...?**
> W praktyce najczesciej flagowanym researcherem jest X/Twitter (R-04) -- z powodu niskiego signal-to-noise ratio platformy X. Sredni score X Researchera to 25-32/50 (FLAG-PASS granicy). To nie znaczy, ze X jest bezuzyteczny -- wczesnee sygnaly trendow sa cenne, ale wymagaja silniejszej korekty bias niz inne zrodla.

---

## 9. Synthesizer -- Tworzenie MANIFEST.md

Synthesizer (S-01) jest "madzem projektu" -- agentem, ktory widzi WSZYSTKO i produkuje jeden, spojny dokument z 6 perspektyw + ewaluacji Critica.

### Czym dokladnie zajmuje sie Synthesizer?

**Zadanie 1: Aggregacja findings**
Zbiera kluczowe findings z 6 raportow i grupuje je wg opcji technologicznej (nie wg researchera). Zamiast "co powiedzial Tech, co powiedzial Reddit" tworzy "co WIEMY o LangChain z WSZYSTKICH zrodel".

**Zadanie 2: Cross-functional insights**
Identyfikuje insights, ktore wynikaja TYLKO z polaczenia wielu perspektyw. Przyklad: Tech mowi "LangChain ma 1200 integracji", GitHub mowi "ale 40% z nich ma <10 commitow w ostatnim roku", Forums mowi "80% pytan o integracje dotyczy tych samych 5 najpopularniejszych". Cross-functional insight: "Ekosystem LangChain jest szeroki ale plytki -- 1200 integracji, ale tylko ~60 aktywnie utrzymywanych."

**Zadanie 3: Contradiction mapping**
Dokumentuje kazda sprzecznosc miedzy raportami z analiza: kto mowi co, dlaczego sie roznia, i jaki jest VERDICT (kto ma wiecej racji w danym kontekscie).

**Zadanie 4: Gap identification**
Na podstawie flag Critica identyfikuje tematy, ktorych ZADEN researcher nie pokryl. Zamiast ignorowac luki -- dokumentuje je jako "unknowns" z rekomendacja dalszego badania.

**Zadanie 5: Confidence-weighted scoring**
Laczony score kazdej opcji = srednia wazona confidence score'ow z kazdego researchera, z korekta Critica. Opcja z 8.0 od Tech (confidence 0.9) i 7.0 od Reddit (confidence 0.5, z korekta bias -20%) = inny wynik niz prosta srednia.

**Zadanie 6: Decision matrix**
Tworzy matryc decyzyjna "JESLI X to Y": "Jesli RAG-first → LlamaIndex", "Jesli Agent-first → LangChain", "Jesli Azure-first → Semantic Kernel". Nie narzuca jednej odpowiedzi -- dostarcza drzewo decyzyjne dopasowane do kontekstu uzytkownika.

### Struktura MANIFEST.md

```
MANIFEST.md
├── Executive Summary (3-5 zdan)
├── Scored Findings (tabela z cross-source scoring)
├── Contradiction Map (sprzecznosci + VERDICT)
├── Cross-Functional Insights (insights z polaczenia perspektyw)
├── Gap Analysis (unknowns + rekomendacje)
├── Decision Matrix (IF/THEN drzewo)
├── Recommendations (PRIMARY / SECONDARY / AVOID)
├── Next Steps (co robic po research -- eskalacja do implementacji)
├── Methodology (jak badano, jakie agenty, jakie zrodla)
└── Appendix: Raw Reports (6 x JSON)
```

### Czego Synthesizer NIE robi

- NIE dodaje wlasnych opinii -- syntetyzuje WYLACZNIE dane z raportow
- NIE przeszukuje internetu -- nie ma narzedzia WebSearch
- NIE rozwiazuje sprzecznosci -- FLAGUJE je i przekazuje z rekomendacja
- NIE implementuje -- produkuje dokument, nie kod

> **Uwaga!**
> Synthesizer jest najdrozszym agentem po Orkiestratorze (~$0.03-0.08/sesja na Sonnet), bo przetwarza OGROMNA ilosc inputu: 6 raportow + Evaluation Report = ~120-210K tokenow. To kwadrant "duzo inputu, sredni output" -- idealny case dla Sonnet, ktory ma swietny stosunek ceny do jakosci przy duzych kontekstach.

---

## 10. Koszt i tokeny -- Rozliczenie per agent

### Rozklad kosztow

| Agent | Model | Tokeny IN | Tokeny OUT | Koszt IN | Koszt OUT | TOTAL |
|-------|-------|-----------|------------|----------|-----------|-------|
| Orkiestrator | Opus ($15/$75) | ~15K | ~5K | $0.225 | $0.375 | ~$0.04-0.08 |
| Researcher Tech | Haiku ($0.80/$4) | ~25K | ~10K | $0.020 | $0.040 | ~$0.02-0.05 |
| Researcher Reddit | Haiku ($0.80/$4) | ~18K | ~7K | $0.014 | $0.028 | ~$0.01-0.03 |
| Researcher GitHub | Haiku ($0.80/$4) | ~25K | ~10K | $0.020 | $0.040 | ~$0.02-0.05 |
| Researcher Forums | Haiku ($0.80/$4) | ~18K | ~7K | $0.014 | $0.028 | ~$0.01-0.03 |
| Researcher Docs | Haiku ($0.80/$4) | ~20K | ~8K | $0.016 | $0.032 | ~$0.01-0.04 |
| Researcher X | Haiku ($0.80/$4) | ~12K | ~5K | $0.010 | $0.020 | ~$0.01-0.02 |
| Research Critic | Sonnet ($3/$15) | ~35K | ~8K | $0.105 | $0.120 | ~$0.03-0.08 |
| Synthesizer | Sonnet ($3/$15) | ~40K | ~10K | $0.120 | $0.150 | ~$0.03-0.08 |
| **TOTAL** | **mixed** | **~208K** | **~70K** | | | **~$0.20-0.46** |

### Rozklad procentowy kosztow

```
Orkiestrator (Opus):     ~15-18% kosztow  ████████░░░░░░░░░░░░
6x Researcherow (Haiku): ~35-40% kosztow  ████████████████░░░░
Research Critic (Sonnet): ~18-22% kosztow  ██████████░░░░░░░░░░
Synthesizer (Sonnet):     ~18-22% kosztow  ██████████░░░░░░░░░░
```

### Smart Model Routing

Research Swarm uzywa trzech modeli strategicznie:

| Model | Rola | Dlaczego ten model? |
|-------|------|---------------------|
| **Opus** ($15/$75) | Orkiestrator | Decyzje strategiczne: jakie pytania zadac, jak dispatchwac, finalna decyzja |
| **Haiku** ($0.80/$4) | 6x Researcher | Zbieranie danych: duzo inputu (webpages), strukturalny output (JSON). Tanie, szybkie. |
| **Sonnet** ($3/$15) | Critic + Synthesizer | Ewaluacja + synteza: wymaga rozumowania, ale nie na poziomie Opus. Optymalny price/performance. |

**Efekt:** ~35-40% kosztow na najtanszym modelu (Haiku), ~36-44% na srednim (Sonnet), ~15-18% na najdrozszym (Opus). Gdyby WSZYSTKO bieglo na Opus, koszt wynioslby ~$2.50-5.00 za sesje -- 10x wiecej.

### Porownanie kosztow z alternatywami

| Podejscie | Koszt | Czas | Jakosc |
|-----------|-------|------|--------|
| 1 developer, 4h researchu | ~$200-400 (koszt pracy) | 4 godziny | Subjektywne, 1 perspektywa |
| ChatGPT jednorazowy prompt | ~$0.01-0.05 | 30 sekund | Powierzchowne, halucynacje |
| Recon Squad (3 agentow) | ~$0.08-0.20 | 90-180s | 1 perspektywa + POC |
| **Research Swarm (9 agentow)** | **~$0.20-0.60** | **90-240s** | **6 perspektyw + krytyka + synteza** |
| Konsultant zewnetrzny | ~$2000-5000 | 2-4 tygodnie | Najwyzsza, ale najdrozsza i najwolniejsza |

> **Czy wiesz, ze...?**
> Za $0.40 (sredni koszt Research Swarm) dostajesz ekwiwalent 4-8 godzin pracy juniora researchera, ale z 6 perspektywami naraz i bez ludzkiego zmeczenia. ROI w porownaniu z 4h pracy developera ($200-400): **50,000-100,000%**. Oczywiscie agent nie zastapi ludzkiego judgmentu w krytycznych decyzjach -- ale moze dostarczyc DANE, na podstawie ktorych czlowiek podejmie lepsza decyzje.

---

## 11. Kiedy uzywac Research Swarm (a kiedy NIE)

### Idealne scenariusze (ZIELONE SWIATLO)

| Scenariusz | Dlaczego Swarm? | Przyklad |
|------------|-----------------|----------|
| **Wybor frameworka/stacku** | Wielowymiarowa decyzja z lock-in | "LangChain vs LlamaIndex vs Semantic Kernel" |
| **Due diligence technologiczne** | Potrzeba 360-stopniowej perspektywy | "Czy Supabase jest gotowy na enterprise?" |
| **Analiza przed akwizycja** | Koszty blednej decyzji sa ogromne | "Stack technologiczny firmy X -- ryzyka?" |
| **Badanie nowego rynku** | Nieznana domena, wiele niewiadomych | "Ekosystem toolingu AI dla healthcare" |
| **Porownanie 5+ opcji** | Zbyt wiele opcji dla 1 researchera | "Top 7 vector databases -- ktora do czego?" |
| **Decyzja z wysokim lock-in** | Zmiana pozniej kosztuje 10-100x wiecej | "Chmura: AWS vs GCP vs Azure dla ML pipeline" |

### Overkill scenariusze (CZERWONE SWIATLO)

| Scenariusz | Dlaczego NIE Swarm? | Co zamiast? |
|------------|---------------------|-------------|
| **"React czy Vue?"** | Dwa opcje, znana domena | Recon Squad (3 agentow) |
| **Bug fix** | Nie trzeba badac, trzeba naprawic | Quick Fix (2 agentow) |
| **Znana technologia** | Juz wiesz co uzyc | Solo (2 agentow) |
| **Prototyp/POC** | Swarm nie buduje | Recon Squad (research + POC) |
| **Zadanie designowe** | Brak Researcher UX w Swarm | Preset z UX researcherem |
| **Implementacja feature** | Zero builderow w Swarm | Feature Sprint lub Startup |

### Drzewo decyzyjne

```
Mam pytanie technologiczne
    │
    ├─ Odpowiedz jest znana         → SOLO (2 agentow, $0.04-0.15)
    ├─ Bug do naprawy               → QUICK FIX (2 agentow, $0.05-0.15)
    ├─ 2-5 opcji, potrzebny POC     → RECON (3 agentow, $0.08-0.20)
    ├─ 5+ opcji, multi-domena       → RESEARCH SWARM (9 agentow, $0.20-0.60) ✓
    ├─ Pelny feature do zbudowania  → FEATURE SPRINT (5-7 agentow, $0.30-0.80)
    └─ Caly produkt                 → GOLD STANDARD (14 agentow, $1.00-3.00)
```

### 3 pytania testowe

Zanim uruchomisz Research Swarm, odpowiedz na 3 pytania:

1. **Czy decyzja ma wysoki koszt odwrocenia?** Jesli zmiana technologii pozniej kosztuje tygodnie pracy -- TAK, uzyj Swarm. Jesli mozesz zmienic zdanie jutro -- NIE.

2. **Czy potrzebujesz wielu perspektyw?** Jesli jedna perspektywa (docs) wystarczy -- NIE, uzyj Recon. Jesli potrzebujesz opinii spolecznosci + stanu kodu + trendow + dokumentacji -- TAK.

3. **Czy wynikiem ma byc WIEDZA, nie KOD?** Swarm produkuje MANIFEST.md, nie dzialajacy prototyp. Jesli potrzebujesz kodu -- dodaj etap Recon lub Feature Sprint po Swarm.

---

## 12. Scenariusze -- Przykladowe zastosowania

### Scenariusz 1: "Wybor frameworka AI do enterprise chatbota"

**Kontekst:** Startup z 8-osobowym zespolem buduje chatbota AI dla klientow B2B. CTO musi wybrac framework -- decyzja na nastepne 2 lata. Budzet API: <$500/mies.

**Research Swarm w akcji:**

- **Tech (R-01):** Analizuje oficjalne benchmarki LangChain, LlamaIndex, Semantic Kernel, Haystack. Porownuje architekture, ekosystem, pricing.
- **Reddit (R-03):** Znajduje watki "LangChain in production -- lessons learned" z r/MachineLearning. Developerzy narzekaja na breaking changes, ale chwalaly ekosystem.
- **GitHub (R-05):** Star count OK, ale issue resolution time LangChain = 47 dni (zle). LlamaIndex = 12 dni (dobrze). Haystack przeszedl rewrite -- stare repo stagnuje.
- **Forums (R-06):** StackOverflow: 80% pytan o LangChain dotyczy chain debugging. Dev.to: "How I migrated from LangChain to LlamaIndex in 3 days" -- popularny artykul.
- **Docs (R-07):** LangChain v0.2 migration guide: 47 stron breaking changes. LlamaIndex v0.10: migration guide 3 strony. Semantic Kernel: wymaga Azure.
- **X (R-04):** Guillermo Rauch tweetuje o integracji LlamaIndex z Vercel AI SDK. Hype na LangGraph (agent framework od LangChain).

**Critic evaluation:** Reddit flagged za negativity bias. X flagged za hype. Reszta PASS.

**MANIFEST.md verdict:** LlamaIndex PRIMARY (stabilniejsze API, lepsze RAG). LangChain SECONDARY (wiekszy ekosystem, jesli potrzebne agenty). Semantic Kernel AVOID (Azure lock-in). Next step: Recon POC z LlamaIndex ($0.12, 120s).

**Koszt calkowity:** $0.38 | **Czas:** 160 sekund | **Tokeny:** 310K

### Scenariusz 2: "Due diligence przed akwizycja startupu"

**Kontekst:** Fundusz VC rozwazywa inwestycje $5M w startup budujacy platforme no-code AI. Potrzebuje oceny stacku technologicznego przed termsheet.

**Research Swarm w akcji:**

- **Tech (R-01):** Analizuje stack: React + Supabase + Anthropic API. Benchmarki wydajnosci, skalowalnose.
- **Reddit (R-03):** Szuka opinii o Supabase w produkcji -- "Supabase vs Firebase at scale" watki. Mieszane opinie o skalowaniu ponad 100K users.
- **GitHub (R-05):** Analizuje publiczne repozytoria startupu (jesli dostepne). Ocenia jakose kodu, pokrycie testami, architekture.
- **Forums (R-06):** Szuka post-mortem z migracji Supabase → dedykowane rozwiazanie. Znajduje 3 case studies.
- **Docs (R-07):** Supabase pricing tiers, limits na free/pro/enterprise. Anthropic rate limits i pricing trajectory.
- **X (R-04):** Reakcje rynku na Supabase enterprise tier launch. Porownania z Neon, PlanetScale.

**MANIFEST.md verdict:** Stack jest solidny na skale 10-50K users. Ryzyko: Supabase nie sprawdzony na 500K+ users (gap). Rekomendacja: inwestycja OK z warunkiem migration path do dedykowanego Postgres jesli skala przekroczy limity Supabase.

**Koszt calkowity:** $0.42 | **Czas:** 190 sekund | **Tokeny:** 340K

### Scenariusz 3: "Wybor vector database do RAG systemu"

**Kontekst:** ML Engineer musi wybrac vector database. Opcje: Pinecone, Weaviate, Qdrant, Milvus, Chroma, pgvector, LanceDB.

**Research Swarm w akcji:**

- **Tech:** Benchmarki latency/throughput kazdej bazy. Architektura (managed vs self-hosted).
- **Reddit:** "Which vector DB in production?" watki. Pinecone chwalony za prostote, Qdrant za wydajnosc.
- **GitHub:** Star trends, PR activity, maintainer health. Chroma: gwaltowny wzrost stars, ale maly zespol.
- **Forums:** Najczestsze problemy: Milvus -- skomplikowany deployment. pgvector -- ograniczenia na >1M wektorow.
- **Docs:** Pricing (Pinecone drogi, pgvector darmowy), API (Weaviate GraphQL, Qdrant REST), limity.
- **X:** LanceDB -- nowy gracz, hype wsrod AI influencerow.

**MANIFEST.md verdict:** Decision matrix: managed → Pinecone (prosty, drogi). Self-hosted + wydajnosc → Qdrant. Prototypowanie → Chroma. Istniejacy Postgres → pgvector (darmowy, ale limity). Production RAG na skale → Weaviate.

**Koszt calkowity:** $0.51 | **Czas:** 220 sekund | **Tokeny:** 380K

---

## 13. Anti-patterns -- Czego unikac

### Anti-pattern #1: Critic Bottleneck

**Opis:** Research Critic staje sie waskim gardlem, bo musi przetworzyc ~120-210K tokenow z 6 raportow naraz. Jesli raporty sa zbyt dlugie, Critic przekracza context window lub produkuje powierzchowna ewaluacje.

**Objaw:** Critic evaluation ma score 10/10 dla WSZYSTKICH raportow -- nie ewaluuje, tylko "rubber stamps".

**Rozwiazanie:** Kazdy researcher musi dostarczyc raport w formacie structured JSON z limitem ~5-10K tokenow outputu. Critic dostaje STRESZCZENIA, nie surowe dane. Surowe dane ida do appendixu MANIFEST.md.

### Anti-pattern #2: Echo Chamber (Komora Echa)

**Opis:** Wszystkich 6 researcherow wraca z identycznymi wnioskami, bo szukali w tych samych zrodlach lub pytania byly zbyt podobne. Brak roznorodnosci perspektyw eliminuje glowna wartosc Swarm.

**Objaw:** Contradiction Map jest pusty. Wszystkie score'y sa identyczne. Zero flago od Critica.

**Rozwiazanie:** Orkiestrator musi definiowac UNIKALNE pytania per researcher, wykorzystujac specjalizacje kazdego. Nie "zbadaj LangChain" do wszystkich -- ale "Tech: benchmarki", "Reddit: pain points", "GitHub: kod i architektura", "Forums: pulapki", "Docs: breaking changes", "X: trendy".

### Anti-pattern #3: Research Without Action (Badanie Bez Dzialania)

**Opis:** Uzytkownik uruchamia Research Swarm, dostaje MANIFEST.md... i nic z nim nie robi. Raport lezy na dysku, decyzja nie zapada, implementacja nie startuje. To drogi odpowiednik "czytania artykulow o produktywnosci zamiast bycia produktywnym".

**Objaw:** Wielokrotne uruchomienia Swarm na ten sam temat z minimalnymi zmianami pytan. "Moze jeszcze jeden research..."

**Rozwiazanie:** MANIFEST.md ZAWSZE konczy sie sekcja "Next Steps" z konkretnymi akcjami. Orkiestrator aktywnie rekomenduje eskalacje do Recon/Feature Sprint. Research Swarm to FAZA, nie CEL.

### Anti-pattern #4: Swarm na proste pytanie (Overkill)

**Opis:** Uzytkownik uruchamia 9-agentowy Swarm na pytanie "React czy Vue?" -- pytanie, na ktore Recon z 1 researcherem odpowie w 90 sekund za $0.12.

**Objaw:** 6 researcherow wraca z raportami, z ktorych 4 powtarzaja to samo. Koszt 3-5x wyzszy niz potrzeba. Czas 2x dluzszy.

**Rozwiazanie:** Orkiestrator powinien ODMOWIC uruchomienia Swarm jesli pytanie ma <3 opcje lub dotyczy jednej, znanej domeny. Zamiast tego: eskaluje w DOL do Recon.

### Anti-pattern #5: Ignorowanie Critic flags

**Opis:** Synthesizer ignoruje flagi Critica i tworzy MANIFEST.md jakby wszystkie raporty mialy pelna wiarygodnosc. Bias X Researchera propaguje sie do finalnych rekomendacji.

**Objaw:** MANIFEST.md nie zawiera sekcji "Gap Analysis" ani "Contradiction Map". Rekomendacje sa zdecydowane bez zastrzezen.

**Rozwiazanie:** Synthesizer MUSI uwzglednic KAZDA flage Critica. Jesli Critic flaguje Reddit za negativity bias -- Synthesizer obniza wage opinii Reddit w scoring. Jesli Critic identyfikuje gap -- Synthesizer dokumentuje go jako "unknown".

---

## 14. Porownanie z mniejszymi presetami -- Recon 3 vs Swarm 9

### Tabela porownawcza

| Aspekt | Recon Squad (3) | Research Swarm (9) |
|--------|-----------------|-------------------|
| **Agentow** | 3 | 9 |
| **Tier** | 1 (MINIMAL) | 4 (ENTERPRISE) |
| **Wzorzec** | Hub-and-Spoke mini | Fan-out → Critique |
| **Researcherow** | 1 (Tech) | 6 (Tech, Reddit, GitHub, Forums, Docs, X) |
| **Critic** | Brak | 1 (Research Critic) |
| **Synthesizer** | Brak | 1 (Synthesizer) |
| **Builder** | 1 (Backend Dev) | 0 (BRAK -- pure research) |
| **Output** | Research + POC | MANIFEST.md (tylko wiedza) |
| **Koszt** | $0.08-0.20 | $0.20-0.60 |
| **Tokeny** | ~80-120K | ~200-400K |
| **Latencja** | 90-180s | 90-240s |
| **Perspektyw** | 1 zrodlo | 6 zrodel |
| **Ewaluacja jakosci** | Orkiestrator (subiektywna) | Critic z 5D rubyka (systematyczna) |
| **Contradiction detection** | Brak (1 researcher) | Automatyczna (6 perspektyw) |

### Kiedy Recon, kiedy Swarm?

```
RECON SQUAD:
✓ 2-5 opcji do porownania
✓ Potrzebujesz research + POC
✓ Jedna domena (np. "jaka baza danych?")
✓ Budzet <$0.20
✓ Czas ma znaczenie (<3 min)

RESEARCH SWARM:
✓ 5+ opcji lub wielowymiarowa analiza
✓ Potrzebujesz TYLKO wiedzy (bez POC)
✓ Wiele domen (np. "stack dla calego produktu")
✓ Decyzja ma wysoki koszt odwrocenia (lock-in)
✓ Potrzebna ewaluacja jakosci (Critic)
✓ Potrzebna detekcja sprzecznosci
```

### Pipeline: Swarm → Recon → Build

Najczesciej Swarm i Recon pracuja SEKWENCYJNIE, nie alternatywnie:

```
RESEARCH SWARM (9 agentow)
    │
    ↓ MANIFEST.md z rekomendacja
    │
RECON SQUAD (3 agentow)
    │
    ↓ POC potwierdzajacy rekomendacje
    │
FEATURE SPRINT (5-7 agentow)
    │
    ↓ Pelna implementacja
```

Calkowity koszt pipeline: ~$0.60-1.50
Alternatywa bez Swarm: "zgaduj i buduj" → refaktoring za $5.00-50.00

---

## 15. Quick Reference Card + Slowniczek + Zrodla

### Quick Reference Card

```
+================================================================+
|                                                                 |
|         🧠 RESEARCH SWARM -- Quick Reference Card               |
|         Preset #22 | Tier 4 (ENTERPRISE)                       |
|                                                                 |
+================================================================+
|                                                                 |
|  SKLAD ZESPOLU:                                                 |
|  ┌──────────────────┬─────────┬──────┬──────────┐              |
|  │ Agent            │ Model   │ Load │ Rola     │              |
|  ├──────────────────┼─────────┼──────┼──────────┤              |
|  │ Orkiestrator     │ Opus    │ 50%  │ DISPATCH │              |
|  │ Researcher Tech  │ Haiku   │ 55%  │ DOCS/BM  │              |
|  │ Researcher Reddit│ Haiku   │ 50%  │ OPINIE   │              |
|  │ Researcher GitHub│ Haiku   │ 55%  │ KOD      │              |
|  │ Researcher Forums│ Haiku   │ 50%  │ PULAPKI  │              |
|  │ Researcher Docs  │ Haiku   │ 50%  │ API/DOCS │              |
|  │ Researcher X     │ Haiku   │ 45%  │ TRENDY   │              |
|  │ Research Critic  │ Sonnet  │ 70%  │ SCORING  │              |
|  │ Synthesizer      │ Sonnet  │ 65%  │ SYNTEZA  │              |
|  └──────────────────┴─────────┴──────┴──────────┘              |
|                                                                 |
|  WZORZEC:     Parallel Fan-out → Sequential Critique            |
|  TOKENY:      ~200-400K                                         |
|  KOSZT:       $0.20-$0.60                                       |
|  LATENCJA:    ~90-240 sekund                                    |
|  OUTPUT:      MANIFEST.md (zero kodu)                           |
|                                                                 |
|  WORKFLOW:                                                      |
|  1. Orkiestrator: dekompozycja pytania                          |
|  2. Fan-out: 6 researcherow rownolegle                         |
|  3. Aggregacja: 6 x JSON reports                                |
|  4. Critic: 5-wymiarowy scoring                                 |
|  5. Synthesizer: MANIFEST.md                                    |
|  6. Orkiestrator: finalna decyzja                               |
|                                                                 |
|  IDEALNE DLA:                                                   |
|  ✓ Wybor frameworka / stacku (5+ opcji)                        |
|  ✓ Due diligence technologiczne                                |
|  ✓ Analiza nowej domeny / rynku                                |
|  ✓ Decyzje z wysokim lock-in                                   |
|  ✓ Porownanie multi-source                                     |
|                                                                 |
|  NIE UZYWAJ DO:                                                 |
|  ✗ Proste pytania (→ Recon Squad)                               |
|  ✗ Bug fix (→ Quick Fix)                                        |
|  ✗ Implementacja (→ Feature Sprint)                             |
|  ✗ Design/UX research (brak UX Researcher)                     |
|  ✗ Znana technologia (→ Solo)                                   |
|                                                                 |
|  KLUCZOWA ZASADA:                                               |
|  "6 detektywow, 1 prokurator, 1 analityk"                     |
|  Szerokosc x Glebokosc x Krytyka = Pewnosc decyzji             |
|                                                                 |
|  TOP 3 ANTI-PATTERNY:                                           |
|  1. Echo Chamber (identyczne wnioski ze wszystkich zrodel)      |
|  2. Critic Bottleneck (zbyt dlugie raporty → slaba ewaluacja)  |
|  3. Research Without Action (raport bez nastepnego kroku)       |
|                                                                 |
|  PO RESEARCH SWARM:                                             |
|  MANIFEST.md → Recon Squad (POC) → Feature Sprint (build)      |
|                                                                 |
+================================================================+
```

### Slowniczek

| Termin | Definicja |
|--------|-----------|
| **Fan-out** | Wzorzec rownoczesnego wysylania zadania do wielu agentow. W Swarm: 1 pytanie → 6 researcherow. |
| **Critique pattern** | Sekwencyjna ewaluacja wynikow wielu agentow przez jednego krytyka. Wymaga WSZYSTKICH raportow naraz. |
| **MANIFEST.md** | Ujednolicony raport badawczy -- Single Source of Truth. Produkowany przez Synthesizer. |
| **Contradiction Map** | Sekcja MANIFEST.md dokumentujaca sprzecznosci miedzy raportami z analiza i VERDICT. |
| **Cross-Functional Insight** | Wniosek wynikajacy z POLACZENIA wielu perspektyw, niewidoczny dla zadnego pojedynczego researchera. |
| **5D Rubric** | Piecio-wymiarowa rubyka oceny Critica: Completeness, Source Quality, Bias, Depth, Coherence. |
| **Deep Research Belt** | Pas 6 rownoleglych researcherow, kazdy specjalizujacy sie w innym zrodle informacji. |
| **Signal-to-Noise Ratio** | Stosunek uzytecznej informacji do szumu. X/Twitter: najnizszy (4/10). Docs: najwyzszy (9/10). |
| **Confidence Score** | Ocena pewnosci (0.0-1.0) przypisywana przez researchera do swoich findings. |
| **Research Brief** | JSON z pytaniami per researcher, produkowany przez Orkiestratora w Kroku 2. |
| **Aggregated Research Package** | 6 raportow polaczonych w jeden payload dla Critica. |
| **Bias Detection** | Wymiar oceny Critica -- identyfikacja stronniczosci w raporcie (np. vendorski marketing, negativity bias). |
| **Gap Analysis** | Identyfikacja tematow, ktorych ZADEN researcher nie pokryl. Dokumentowane jako "unknowns". |
| **Decision Matrix** | Drzewo IF/THEN w MANIFEST.md: "Jesli X to Y" -- nie jedna odpowiedz, ale mapa decyzji. |
| **Smart Model Routing** | Strategia doboru modeli: Opus dla decyzji, Sonnet dla ewaluacji, Haiku dla zbierania danych. |
| **Rubber Stamping** | Anti-pattern Critica: ewaluacja "10/10" dla wszystkich bez faktycznej analizy. |
| **Premature Implementation Bias** | Tendencja do zaczynania budowy zanim badanie jest kompletne. Swarm eliminuje to przez brak builderow. |
| **Lock-in** | Zablokowanie w technologii, ktorej zmiana jest kosztowna. Wysoki lock-in = uzasadnienie dla Swarm. |

### Zrodla

- **Gold Standard Agent Architecture 2026** -- referencyjny template 14 agentow w 4 fazach
- **MASTERCLASS: Zespoly Agentow AI 2026** -- kompletny przewodnik z anty-wzorcami i kalkulatorem kosztow
- **Agent Teams Configurator v8/v9** -- narzedzie do wizualnego projektowania architektur z 27 presetami
- **Anthropic Model Pricing 2026** -- oficjalne ceny Opus ($15/$75), Sonnet ($3/$15), Haiku ($0.80/$4)
- **Anthropic Multi-Agent Research Systems (2026)** -- 90.2% improvement z wieloagentowym researchem
- **Parallel Fan-out Architecture Patterns** -- analiza wzorcow rownoczesnego dispatchu w systemach rozproszonych
- **Peer Review in Scientific Publishing** -- analogia do Critic pattern w research systemach
- **IDC Report: AI Model Routing Strategies 2026** -- 70% enterprise adopcja model routingu do 2028
- **OBSERVATORY Architecture** -- case study systemu z orkiestracja wieloagentowa

---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz 5-7 minutowa prezentacje wideo o presecie **Research Swarm** (Roj Badawczy) z systemu architektur wieloagentowych AI. Prezentacja powinna byc edukacyjna, wizualnie anganzujaca i prowadzic widza od zera do pelnego zrozumienia najglebszego presetu badawczego w Gold Standard 2026.

### Struktura prezentacji:

**[0:00-0:30] HOOK -- Statystyka szokowa**
Ekran: Duza liczba "90.2%" z animacja pulse glow na ciemnym tle (#1F2937). Tekst: "O tyle lepsze wyniki daje ZESPOL researcherow vs pojedynczy agent. Zrodlo: Anthropic 2026." Nastepnie animacja: jeden mozg (single agent) vs szesc mozgow polaczonych siecia (Research Swarm). Pytanie retoryczne: "Ile razy podejmowales decyzje technologiczna na podstawie JEDNEGO zrodla?" Szesc ikon zrodel (docs, reddit, github, forums, x, api docs) pojawiaja sie jedna po drugiej, tworzac krag wokol centralnego znaku zapytania.

**[0:30-1:30] TRZY ANALOGIE -- Animowane scenki**
1. Szesc detektywow: animacja szesciu postaci z lupami, kazda bada inna czesc tego samego terenu (docs, community, code, problems, api, trends). Nad kazdym detektywem ikona jego specjalizacji. Po zakonczeniu badania -- szesc raportow plynie do centralnej postaci z waga (Critic), ktory ocenia je na tablicy z rubrykami. Na koncu analityk (Synthesizer) przy duzym stole laczy puzzle w jeden obraz.
2. Due diligence: animacja funduszu inwestycyjnego -- 6 analitykow przy jednym stole konferencyjnym, kazdy z innym raportem (prawo, finanse, tech, HR, rynek, media). Partner zarzadzajacy (Critic) stawia pieczecie "PASS" / "FLAG" na raportach. Glowny analityk (Synthesizer) pisze investment memo na tablicy.
3. Peer review: animacja artykulu naukowego -- 6 recenzentow z lupami czyta rozne sekcje, oznacza komentarze zoltym markerem. Redaktor naczelny (Synthesizer) zbiera recenzje i tworzy finalny verdykt.

**[1:30-2:45] ARCHITEKTURA -- Fan-out → Critique**
Animacja budowania diagramu krok po kroku:
1. Orkiestrator (centralny wezel, szmaragdowy #10B981) pojawia sie na gorze
2. Szesc linii rozchodzi sie promieniście w dol (fan-out) -- kazda w innym kolorze
3. 6 researcherow pojawia sie na koncach linii: Tech (niebieski), Reddit (pomaranczowy), GitHub (szary), Forums (zielony), Docs (fioletowy), X (blekitny)
4. Sygnal "GO" -- szesc ikon rakiet startuje jednoczesnie (PARALLEL)
5. Po ~3 sekundach szesc raportow (JSON) plynie Z POWROTEM do centrum
6. Research Critic pojawia sie pod researcherami -- czerwona tarcza z lupa
7. Linie score'ow (42/50, 32/50, etc.) pojawiaja sie przy kazdym raporcie
8. Synthesizer pojawia sie na dole -- zlota ksiega "MANIFEST.md"
9. Finalny diagram: kompletna architektura z animowanymi strumieniami danych

**[2:45-3:45] RESEARCH CRITIC -- 5D Rubric**
Animacja tablicy z piecioma kolumnami: Completeness, Sources, Bias, Depth, Coherence. Szesc wierszy (po jednym na researchera). Liczby pojawiaja sie jedna po drugiej z animacja scoring. Czerwone podswietlenie na niskich scores (X/Twitter: 25/50). Zolta flaga animowana na bias detection. Zielone checkmarki na wysokich scores (Docs: 44/50). Na koncu: sumaryczna tabela z kolumna PASS/FLAG/REJECT.

**[3:45-4:45] SYNTHESIZER -- MANIFEST.md**
Animacja "budowania dokumentu": najpierw Executive Summary (3 zdania pojawiaja sie typed-effect), potem Scored Findings (tabela rysuje sie wiersz po wierszu), potem Contradiction Map (dwie strzalki zderzaja sie -- "CONFLICT" z animacja eksplozji, nastepnie "VERDICT" z animacja rozwiazania), potem Cross-Functional Insights (trzy linki laczace rozne sekcje -- "insight, ktorego ZADEN researcher sam nie zobaczy"), na koncu Decision Matrix ("JESLI RAG → LlamaIndex", "JESLI Agents → LangChain" -- drzewo z animowanymi galezami).

**[4:45-5:30] LIVE SCENARIO -- Wybor frameworka AI**
Speed-run calego workflow w przyspieszeniu:
- User wpisuje pytanie: "Jaki framework AI do enterprise chatbota?" (typed-effect, biale litery na ciemnym tle)
- Orkiestrator rozbija na 6 pytan (animacja: 1 strzalka rozdziela sie na 6, kazda w kolorze researchera)
- 6 researcherow pracuje rownolegle -- split-screen z szescioma mini-oknami, kazde pokazuje inny feed: docs, reddit threads, github repos, SO answers, API docs, X threads. Timer w rogu: "45s... 60s... 78s"
- Raporty plyna do Critica (szesc JSON ikon zesuwaja sie do centralnego wezla) -- scoring pojawia sie obok kazdego: Tech 42/50 (zielony check), Reddit 32/50 (zolty), GitHub 43/50 (zielony check), Forums 36/50 (zielony check), Docs 44/50 (zielony check), X 25/50 (czerwony FLAG)
- Synthesizer tworzy MANIFEST.md -- animacja "budowania dokumentu" z sekcjami pojawiajacymi sie jedna po drugiej
- Finalny ekran: szmaragdowa ramka z wynikiem: "Rekomendacja: LlamaIndex | Confidence: 0.87 | Koszt: $0.38 | Czas: 160s | Next: Recon POC z LlamaIndex"

**[5:30-6:15] ANTI-PATTERNY i POROWNANIE**
Trzy "wanted posters" z czaszkami na ciemnym tle z efektem "komisariat policji":
- Echo Chamber: szesc identycznych raportow w rzedzie -- "Where's the diversity?" Animacja: szesc kart odwraca sie -- wszystkie maja to samo -- czerwony stempel "FAIL".
- Critic Bottleneck: Critic tonacy w stosie papierow, zegar przyspiesza, output to "10/10 for everyone" -- rubber stamp. Stempel "FAIL".
- Research Without Action: MANIFEST.md z rosnaca pajeczyna, kurz osiadajacy, kalendarz odliczajacy tygodnie. Stempel "WASTE".
Nastepnie: tabela porownawcza Recon (3) vs Swarm (9) z animowanym podswietlaniem roznic -- kazdy wiersz zaswietla sie na szmaragdowo przy kluczowych przewagach Swarm. Pipeline: Swarm → Recon → Feature Sprint z animacja przeplywu i kosztami ($0.38 → $0.12 → $0.55 = $1.05 total).

**[6:15-6:45] KOSZT i ROI**
Animowany wykres slupkowy: Research Swarm ($0.38) vs 4h pracy developera ($300). Strzalka "ROI: 79,000%". Donut chart: Haiku (35-40%), Sonnet (36-44%), Opus (15-18%) -- Smart Model Routing w akcji. Podpis: "Za cene kawy dostajesz szesc perspektyw + krytyczna ewaluacje + ujednolicony raport."

**[6:45-7:00] ZAMKNIECIE**
Ekran: "Nie podejmuj decyzji na podstawie jednego zrodla." Szesc ikon researcherow formuje krag wokol centralnego mozgu (Research Swarm logo). Tekst: "6 detektywow. 1 prokurator. 1 analityk. Cala prawda." Call to action: "Nastepnym razem gdy stoisz przed wielowymiarowa decyzja technologiczna -- wysliij Roj Badawczy." Ostatni kadr: animacja pipeline Swarm → Recon → Feature Sprint z napisem "Od wiedzy do produktu."

### Styl wizualny:
- **Paleta glowna:** Szmaragdowy (#10B981) na ciemnym tle (#1F2937). Szmaragdowy symbolizuje wiedze, glebokosc i precyzje -- idealne kolory dla presetu badawczego.
- **Akcenty:** Zloty (#F59E0B) dla Orkiestratora i Synthesizera (moc decyzyjna). Niebieski (#3B82F6) dla researcherow (obiektywnosc, spokoj). Czerwony (#EF4444) dla Critica i anti-patternow (ostrzezenie, ewaluacja). Pomaranczowy (#F97316) dla Reddit i elementow spolecznosciowych.
- **Gradient tla:** Ciemny gradient od #1F2937 (gora) do #111827 (dol) z subtelnymi siatkami radarowymi w tle (okragle linie, 3-5% opacity, odstep 80px). Efekt: "centrum dowodzenia badawczego".
- **Tekst:** Bialy (#FFFFFF) na ciemnym tle, bold dla kluczowych slow. Monospace (JetBrains Mono) dla JSON, kodu i liczb. Gradient fill szmaragd-do-blekitnego dla naglowkow sekcji.
- **Motyw graficzny:** Mozg/siec neuronowa jako leitmotiv calej prezentacji. Radar/sonar dla researcherow (szesc "sektorow skanowania"). Tarcza/lupa dla Critica (ewaluacja). Ksiega/puzzle dla Synthesizera (laczenie perspektyw). Kompas dla Orkiestratora (nawigacja strategiczna).
- **Animacje:** Fan-out: promieniste rozejscie szesciu linii z centralnego wezla z motion blur. Particle effects na polaczeniach (male swietliste punkty plynace wzdluz linii). Budowanie diagramow krok po kroku (kazdy wezel pojawia sie z efektem "materializacji"). Typed-effect dla tekstu MANIFEST.md. Scoring z numerycznym odliczaniem (szybko rosnace liczby zatrzymujace sie na finalnym score). Pulse glow na aktywnych wezlach.
- **Typografia:** Nowoczesny sans-serif (Inter lub Satoshi) dla naglowkow i body text. Monospace (JetBrains Mono) dla JSON, kodu i score'ow. H1: 48px bold z gradient fill. H2: 32px semibold. Body: 18px regular. Caly tekst z lekkim text-shadow dla czytelnosci na ciemnym tle.
- **Muzyka:** Eksploracyjna, budujaca napiecie: ambient pads + light electronic beats. Narastajaca podczas fan-out (szesc sciezek muzycznych nakladajacych sie stopniowo -- kazdy researcher "dodaje swoj instrument"). Napieciowa podczas Critic (niskie tony, staccato na scoring). Rozwiazujaca sie podczas Synthesizer (harmonia, wszystkie instrumenty graja razem). Triumfalna na zakonczenie (pelny aranament z crescendo).
- **Tempo:** Dynamiczne, kazdy slajd 5-15 sekund. Moment fan-out: zwolnienie + przyspieszenie (bullet time effect -- linie rozchodza sie w slow-motion, potem przyspieszaja). Scoring: szybkie pojawianie sie liczb (staccato). Synteza: plynne, powolne budowanie dokumentu.
- **Efekty specjalne:** Glitch effect na statystyce 90.2% (cyfrowe znieksztalcenie, potem stabilizacja). Holograficzny efekt na MANIFEST.md (lekkie przeswiecenie, 3D depth). Pulse glow na wezlach diagramu (oddychajacy szmaragdowy blask). Motion blur na liniach fan-out. Particle trails na raportach plynacych do Critica (swietliste slady). Depth of field: aktywny element ostry, reszta lekko rozmyta.
- **Ikony per researcher:** Tech: ikona dokumentu z lupa. Reddit: ikona dwoch balonow dialogowych. GitHub: ikona brancha/forka. Forums: ikona znaku zapytania ze swiatlem. Docs: ikona otwartej ksiegi z zakladka. X/Twitter: ikona megafonu z fala dzwiekowa. Critic: tarcza z checkmarkiem. Synthesizer: puzzle skladajace sie w calosci.
- **Format:** 16:9 (1920x1080px), 30fps, eksport MP4 H.264 lub prezentacja Google Slides / Keynote z animacjami.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike (1080x3500px) o presecie **Research Swarm** (Roj Badawczy) z systemu architektur wieloagentowych AI. Infografika powinna byc czytelna, logicznie zorganizowana i wizualnie atrakcyjna, z centralnym motywem kola/tarczy radarowej symbolizujacej 6 researcherow pokrywajacych 360 stopni terenu informacyjnego.

### Struktura infografiki (od gory do dolu):

**[NAGLOWEK -- 1080x280px]**
Tytul: "RESEARCH SWARM -- 6 Detektywow, 1 Prawda" w duzym, boldnym foncie z gradient fill (szmaragdowy #10B981 do blekitnego #06B6D4). Ikona mozgu z siecia polaczen po lewej. Podtytul: "Preset #22 | Tier 4 ENTERPRISE | 9 Agentow | Pure Research". Tlo: ciemny gradient od #1F2937 do #111827 z subtelnymi liniami radarowymi/sonarowymi w tle (okragle linie co 60px, 5% opacity). Badge: "NO CODE -- PURE KNOWLEDGE" w prawym gornym rogu, szmaragdowy border.

**[SEKCJA 1: 6-RESEARCHER WHEEL DIAGRAM -- 1080x500px]**
Centralny element calej infografiki. Kolo radarowe/tarcza z 6 segmentami, kazdy w innym kolorze:
- Gora (12h): Tech R-01 -- kolor niebieski (#3B82F6) -- ikona dokumentu/benchmarku
- Prawa-gora (2h): Reddit R-03 -- kolor pomaranczowy (#F97316) -- ikona balonow dialogowych
- Prawa-dol (4h): GitHub R-05 -- kolor szary (#6B7280) -- ikona brancha git
- Dol (6h): Forums R-06 -- kolor zielony (#22C55E) -- ikona znaku zapytania/odpowiedzi
- Lewa-dol (8h): Docs R-07 -- kolor fioletowy (#8B5CF6) -- ikona ksiegi/API
- Lewa-gora (10h): X/Twitter R-04 -- kolor blekitny (#06B6D4) -- ikona megafonu/trendu

W samym centrum kola: maly szmaragdowy okrag z napisem "ORKIESTRATOR" i ikona kompasu.
Pod kolem: dwie postacie po bokach: Research Critic (lewa, czerwona tarcza #EF4444) i Synthesizer (prawa, zlota ksiega #F59E0B). Strzalki: Kolo → Critic → Synthesizer.
Kazdy segment zawiera: nazwe, model (Haiku), load, specjalizacje, pytanie kluczowe.

**[SEKCJA 2: FAN-OUT → CRITIQUE FLOW -- 1080x400px]**
Wizualizacja workflow jako pionowy flow z lewej do prawej:
- START: Ikona uzytkownika + pytanie "Jaki framework AI?"
- KROK 1: Orkiestrator (szmaragdowy wezel) -- "Dekompozycja na 6 pytan"
- KROK 2: 6 strzalek rozchodzacych sie promienscie (FAN-OUT) -- "PARALLEL 30-90s"
- KROK 3: 6 ikon JSON wracajacych do centrum -- "6 x Structured Reports"
- KROK 4: Critic (czerwona tarcza) -- "5D Scoring + Bias Detection"
- KROK 5: Synthesizer (zlota ksiega) -- "MANIFEST.md"
- END: MANIFEST.md ikona z checkmarkiem

Kazdy krok polaczony plynna linia z gradientem od szmaragdowego do zlotego. Czas: "90-240 sekund calkowicie" obok flow.

**[SEKCJA 3: 5D CRITIC RUBRIC -- 1080x350px]**
Wizualizacja 5 wymiarow jako 5 poziomych barometers/progress bars:
1. Completeness -- bar w kolorze niebieskim, przykladowy score 9/10
2. Source Quality -- bar w kolorze zielonym, przykladowy score 8/10
3. Bias Detection -- bar w kolorze pomaranczowym, przykladowy score 6/10 (z ikona ostrzezenia)
4. Depth -- bar w kolorze fioletowym, przykladowy score 8/10
5. Coherence -- bar w kolorze blekitnym, przykladowy score 9/10

Pod barami: mini-tabela z przykladowymi scores 6 researcherow (Tech: 42/50 PASS, Reddit: 32/50 PASS, GitHub: 43/50 PASS, Forums: 36/50 PASS, Docs: 44/50 PASS, X: 25/50 FLAG). Flagowany wiersz X/Twitter podswietlony na czerwono.

**[SEKCJA 4: MANIFEST.md ANATOMY -- 1080x400px]**
Wizualizacja struktury MANIFEST.md jako "rozlozony dokument" z 8 sekcjami:
1. Executive Summary (3 zdania, ikona streszczenia)
2. Scored Findings (tabela z ikonami medali: zloto, srebro, braz)
3. Contradiction Map (dwie strzalki zderzajace sie -- ikona konfliktu)
4. Cross-Functional Insights (trzy linie laczace sie -- ikona polaczenia)
5. Gap Analysis (ikona brakujacego puzzla)
6. Decision Matrix (drzewo IF/THEN)
7. Recommendations (PRIMARY/SECONDARY/AVOID z kolorami)
8. Next Steps (strzalka do Recon/Feature Sprint)

Kazda sekcja jako mini-karta z ikona, nazwa i 1-zdaniowym opisem. Polaczone pionowa linia z kropkami.

**[SEKCJA 5: POROWNANIE ZRODEL -- 1080x350px]**
Tabela 6 kolumn (researcherow) x 5 wierszy (metryki):
- Signal-to-Noise: skala 1-10 z kolorowymi barami (Docs 9, X 4)
- Predkosc info: ikony zegara (X: godziny, Docs: miesiace)
- Typ insights: ikony (fakty, opinie, kod, pulapki, API, trendy)
- Bias risk: ikony ostrzezen (X: wysoki, Docs: niski)
- Koszt/sesja: bary kosztowe ($0.01-0.05)

**[SEKCJA 6: SYGNALIZACJA SWIETLNA -- 1080x280px]**
- ZIELONY (uzyj Swarm): wybor stacku 5+ opcji, due diligence, nowa domena, wysoki lock-in, multi-source porownanie
- ZOLTY (rozwazone Swarm): 3-4 opcje w jednej domenie, sredni lock-in
- CZERWONY (NIE uzywaj Swarm): znana tech (→Solo), bug fix (→Quick Fix), potrzebny POC (→Recon), implementacja (→Feature Sprint), design/UX

**[SEKCJA 7: KOSZT i ROI -- 1080x300px]**
Donut chart z 3 segmentami: 6x Haiku ($0.08-0.22, 35-40%, niebieski), 2x Sonnet ($0.06-0.16, 36-44%, fioletowy), 1x Opus ($0.03-0.08, 15-18%, szmaragdowy). Srodek donuta: "TOTAL: $0.20-$0.60". Obok donuta: ROI box -- "Za $0.38 dostajesz ekwiwalent 4-8h pracy juniora z 6 perspektywami. ROI vs praca ludzka: 79,000%."

**[SEKCJA 8: SCENARIUSZ -- 1080x350px]**
Mini-komiks 6 paneli w stylu flat illustration:
Panel 1: CTO z pytaniem "Jaki framework AI?"
Panel 2: 6 researcherow startuje rownolegle (ikony rakiet)
Panel 3: Raporty plyna do Critica (scoring: 42, 32, 43, 36, 44, 25)
Panel 4: Critic flaguje X/Twitter, PASS dla reszty
Panel 5: Synthesizer tworzy MANIFEST.md na duzym ekranie
Panel 6: "Rekomendacja: LlamaIndex | $0.38 | 160s | Next: Recon POC"

**[SEKCJA 9: ANTI-PATTERNY -- 1080x250px]**
Siatka 1x3 z duyzmi ikonami:
- ❌ Echo Chamber: 6 identycznych raportow (ikona lustrzanych odbic)
- ❌ Critic Bottleneck: Critic tonacy w papierach (ikona stosu dokumentow)
- ❌ Research Without Action: MANIFEST.md z pajeczyna (ikona pajaka)
Pod kazda: 1-zdaniowe wyjasnienie i rozwiazanie.

**[SEKCJA 10: PIPELINE -- 1080x200px]**
Poziomy flow: RESEARCH SWARM (9, szmaragd) → strzalka "MANIFEST.md" → RECON SQUAD (3, niebieski) → strzalka "POC" → FEATURE SPRINT (7, fiolet) → strzalka "PRODUKT". Pod spodem: "$0.38 + $0.12 + $0.55 = $1.05 za pelny pipeline research→build"

**[SEKCJA 11: QUICK REFERENCE -- 1080x200px]**
Kompaktowa karta w ramce: Wzorzec: Fan-out→Critique | Agentow: 9 | Researcherow: 6 | Critic: 1 | Synthesizer: 1 | Tokeny: 200-400K | Koszt: $0.20-0.60 | Latencja: 90-240s | Output: MANIFEST.md | Builder: BRAK | Kluczowa zasada: "6 perspektyw > 1 perspektywa"

**[STOPKA -- 1080x100px]**
"Agent Architecture Designer 2026 | Gold Standard Architecture | Preset #22"
Logo lub ikona systemu po lewej. Data: "Kwiecien 2026".

### Styl wizualny:
- **Paleta:** Szmaragdowy (#10B981) jako kolor glowny, ciemne tlo (#1F2937), bialy tekst (#FFFFFF), akcenty per researcher: niebieski (#3B82F6), pomaranczowy (#F97316), szary (#6B7280), zielony (#22C55E), fioletowy (#8B5CF6), blekitny (#06B6D4). Critic: czerwony (#EF4444). Synthesizer: zloty (#F59E0B).
- **Typografia:** Sans-serif, H1 40px bold z gradient fill, H2 24px semibold, body 14px regular, monospace 12px dla JSON/kodu
- **Ikony:** Outline style, monochromatyczne z akcentem kolorystycznym per researcher. Kazdy researcher ma unikalna ikone specjalizacji.
- **Styl:** Dark mode flat design, minimalne cienie (box-shadow 0 4px 12px rgba(0,0,0,0.3)), zaokraglone rogi (12px), delikatne gradienty, glassmorphism na kartach (background: rgba(255,255,255,0.05), border: 1px solid rgba(255,255,255,0.1))
- **Motyw:** Mozg/siec neuronowa + radar/tarcza + detektyw/lupa. Centralna metafora: 6-segmentowe kolo radarowe pokrywajace 360 stopni terenu informacyjnego. Kazdy segment to "pole widzenia" jednego researchera.
- **Separatory:** Cienkie linie (1px, rgba(255,255,255,0.1)) miedzy sekcjami. Numeracja sekcji w malych szmaragdowych okragach po lewej.

---

*Dokument opracowany na podstawie Gold Standard Agent Architecture 2026, MASTERCLASS Agent Teams, AGENT_TEAMS_CONFIGURATOR v8/v9 oraz analiz multi-agent research systems. Dane kosztowe aktualne na kwiecien 2026.*
