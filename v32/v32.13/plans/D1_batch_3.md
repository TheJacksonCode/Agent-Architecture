# D1 Batch 3 - QA + Five Minds + HITL + Data (12 agents)

JS constant entries for v32.13 agent detail sidebar polish. Ready to paste into AGENT_TEAMS_CONFIGURATOR_v32_13.html.

## Source notes

- qa_security - R2 (R2_notebooklm_extraction.md section 16)
- qa_quality - R2 (R2 section 17)
- qa_perf - AK (AGENT_KNOWLEDGE fallback, lines 3442-3469)
- qa_manager - R2 (R2 section 18)
- expert_pragmatist - AK (lines 3494-3521)
- expert_innovator - AK (lines 3522-3549)
- expert_analyst - AK (lines 3550-3577)
- expert_user - AK (lines 3578-3605)
- expert_devil - AK (lines 3606-3633)
- decision_presenter - AK (lines 3634-3660)
- statistician - AK (AD role+prompt only, no AGENT_KNOWLEDGE; lines 4283-4286)
- eda_analyst - AK (AD role+prompt only, no AGENT_KNOWLEDGE; lines 4287-4290)

---

## AGENT_LONG_PL

```js
const AGENT_LONG_PL = {
  qa_security: '<p>QA Security to ostatnia linia obrony przed wdrozeniem na produkcje. Dziala jak pentester white-hat - mysli jak atakujacy, ale raportuje luki zamiast je wykorzystac. Jego metodologia to OWASP Top 10 rozszerzone o zagrozenia specyficzne dla systemow agentowych: Indirect Prompt Injection, Agent Output Poisoning, Tool Abuse, Token Exfiltration, System Prompt Leakage.</p><p>Jedyne narzedzia to Read, Grep i Glob - pelen read-only. Brak Bash, Write, Edit jest celowy bo audytor ktory moze modyfikowac kod ktory audytuje traci obiektywnosc. Pracuje w calkowitej izolacji od QA Quality, zeby uniknac groupthink. Model: Haiku, bo to praca pattern-matchingowa. Koszt 0.02-0.08 USD na zadanie.</p>',

  qa_quality: '<p>QA Quality jest partnerem QA Security w warstwie audytu, ale z zupelnie innej perspektywy. Gdzie Security pyta jak to zlamac, Quality pyta czy to dziala poprawnie. Kluczowa architektoniczna roznica: Quality MA dostep do Bash, wiec moze naprawde uruchomic npm test, pytest, eslint czy jest --coverage i zobaczyc prawdziwe dane zamiast tylko skanowac wzorce.</p><p>Quality checklist ma cztery priorytety hierarchiczne: CORRECTNESS (zgodnosc ze spec) > TEST COVERAGE (>80% statements, >75% branches) > PERFORMANCE (N+1, brak cache, brak lazy loading) > CODE QUALITY (funkcje <50 linii, zagniezdzenie <3). Kolejnosc nie jest przypadkowa: pieknie sformatowany kod ktory nie spelnia specyfikacji jest bezwartosciowy. Pracuje w izolacji od QA Security by zapobiec groupthink.</p>',

  qa_perf: '<p>QA Perf jest jedynym agentem w systemie specjalizujacym sie WYLACZNIE w metrykach wydajnosci. Mierzy response time, bundle size, memory leaks, query performance i Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1). Dziala jak inzynier tuningujacy silnik na dynamometrze - mierzy kazdy parametr i wskazuje konkretny bottleneck.</p><p>Nie pisze kodu i nie naprawia - tylko raportuje. Najlzejszy w QA (load 45/100) bo pomiary sa bardziej pattern-based niz analityczne. Model: Haiku. Uzywany przez dedykowany preset Performance Boost jako centralny miernik.</p>',

  qa_manager: '<p>Manager QA jest sedzia. Nie prowadzi sledztwa, nie przesluchuje swiadkow, nie audytuje kodu. Czyta raporty od QA Security i QA Quality i wydaje wyrok: GO albo NO-GO. Jest JEDYNYM agentem w calym systemie ktory widzi zarowno raport bezpieczenstwa jak i raport jakosci jednoczesnie - Q-01 i Q-02 pracuja w izolacji.</p><p>Framework decyzyjny to skala 1-10 z progiem 6.0. Artefakt startuje z wynikiem 10.0 i traci punkty: CRITICAL -3.0, HIGH -1.0, MEDIUM -0.5, LOW -0.1. Warunki automatycznego NO-GO: jakikolwiek CRITICAL, pokrycie <70%, niezalatana luka security. Jedyny agent QA na Sonnet (nie Haiku) bo wymaga rozumowania, nie pattern matchingu. Ma tylko Read i Write - najmniejszy zestaw narzedzi remis z Planerem.</p>',

  expert_pragmatist: '<p>Pragmatyk to ekspert Five Minds od wykonalnosci, kosztow, timeline i zasobow. Dziala jak CFO firmy - widzi kazdy pomysl przez pryzmat budzetu, terminu i dostepnych ludzi. Gdy inni wolaja microservices, on pyta kto za to zaplaci i ile to potrwa. Ocenia czas implementacji, estymuje w godzinach i dolarach, szuka kompromisow 80/20.</p><p>W naturalnym napieciu z Innowatorem - ambicja kontra realizm. Nie zabija innowacji, pilnuje by innowacja byla WYKONALNA. Nie jest pesymista, jest realist: pesymista mowi niemozliwe, realist mowi oto co jest potrzebne. Model: Sonnet, bo debata wymaga dobrego rozumowania.</p>',

  expert_innovator: '<p>Innowator to ekspert Five Minds od przewagi konkurencyjnej i nowych podejsc. Dziala jak CTO startupu - widzi technologie przyszlosci i chce byc pierwszy na rynku. Nie akceptuje wystarczajaco dobrego, szuka najlepszego mozliwego rozwiazania. Proponuje KONKRETNE nazwy technologii i benchmarki, nie ogolniki.</p><p>W naturalnym napieciu z Pragmatykiem - ambicja kontra realizm. Argumentuje danymi rynkowymi, user research i case studies, nie opiniami. Nie jest naiwny, wie ze innowacja kosztuje, ale ROI moze byc stukrotny. Jego mandat: zapobiegac stagnacji i dlugu technicznemu ukrytemu pod etykieta bezpieczny wybor.</p>',

  expert_analyst: '<p>Analityk Danych to ekspert Five Minds od dowodow, benchmarkow, metryk i KPI. Jedyny ekspert bez wlasnej agendy - jego agenda to FAKTY. Dziala jak Data Scientist w zarzadzie: gdy ktos mowi to standard branzy, on pyta jaki benchmark, jaka probka, jaki rok. Nie akceptuje storytellingu bez danych.</p><p>Jego supermoc to zmuszanie innych do udowadniania twierdzen. Porownuje z branzowymi standardami (Gartner, Forrester, Anthropic benchmarks). Czesto w konflikcie z Innowatorem (dane kontra wizja) i Pragmatykiem (dane kontra doswiadczenie). Nie proponuje rozwiazan - waliduje te proponowane przez innych. Model: Sonnet, bo analiza danych wymaga precyzyjnego rozumowania.</p>',

  expert_user: '<p>Rzecznik Uzytkownika to ekspert Five Minds reprezentujacy perspektywe koncowego odbiorcy - jedyny ekspert ktory NIE mysli jak inzynier. Dziala jak Product Manager z empatia: zna uzytkownikow osobiscie, testowal prototypy z babcia i wie ze ludzie nie czytaja instrukcji. Gdy inzynierowie dyskutuja o architekturze, on pyta ile klikniec potrzebuje uzytkownik.</p><p>Mowi jezykiem koncowego odbiorcy, nie technicznym. Pilnuje WCAG 2.1 AA, keyboard navigation, screen readers. Ocenia onboarding: czy nowy uzytkownik zrozumie aplikacje w 30 sekund. Kwestionuje rozwiazania techniczne kosztem UX, bo technologia sluzy ludziom, nie odwrotnie. W konflikcie z Analitykiem - dane nie zawsze mowia pelnej historii o emocjach uzytkownikow.</p>',

  expert_devil: '<p>Cien (Devil\\'s Advocate) to jedyny agent w calym systemie bez lojalnosci domenowej. Moze atakowac pozycje KAZDEGO eksperta - Pragmatyka, Innowatora, Analityka i Rzecznika rowno. Jego mandat: zapobiegac groupthink. Jesli wszyscy sie zgadzaja, to ALARM - konsensus bez konfliktu jest podejrzany.</p><p>Atakuje najsilniejsza pozycje, te z ktora wiekszosc sie zgadza. Testuje zalozenia, szuka slepych punktow, wymusza pre-mortem (wyobraz sobie ze projekt sie NIE udal - dlaczego). Nie proponuje alternatyw - jego rola to destrukcja konsensusu, nie budowanie. Nie jest miekki - brutalna szczerosc to mandat. Inspiracja: Advocatus Diaboli w Watykanie, proces istnieje od 1587 roku bo DZIALA. Najwyzszy load w Five Minds (70/100).</p>',

  decision_presenter: '<p>Decision Presenter to bramownik Human-in-the-Loop. Dziala jak kontroler ruchu lotniczego: samoloty (agenci) leca autonomicznie, ale w krytycznych momentach czlowiek na wiezy podejmuje finalna decyzje. Prezentuje 2-3 opcje decyzyjne w formie czytelnych kart z opisami pro/contra i pauzuje pipeline miedzy fazami dajac czas na refleksje.</p><p>Zarzadza timerem 120s z wizualnym odliczaniem i progressbarem; po uplywie czasu auto-decyduje wybierajac rekomendowana opcje. Nie podejmuje decyzji sam - jego rola to PREZENTACJA opcji. Model: Haiku, bo to UI layer, nie compute layer. W Deep Five Minds obsluguje 3 bramy: Strategia->Research, Debata->Build, Build->QA.</p>',

  statistician: '<p>Statystyk to straznik poprawnosci metodologicznej. Projektuje eksperymenty bez p-hackingu: formalizuje hipotezy H0/H1, dobiera test pasujacy do typu danych (parametryczny/nieparametryczny, niezalezne/sparowane), sprawdza zalozenia (normalnosc, homoscedastycznosc, niezaleznosc) i oblicza wielkosc proby dla zadanej mocy.</p><p>Planuje korekcje dla testow wielokrotnych (Bonferroni/BH) i definiuje primary metric PRZED patrzeniem na dane, by uniknac cherry pickingu. Zawsze raportuje effect size i CI obok p-value - samo p<0.05 nic nie mowi przy malej probie. Odrozienia istotnosc statystyczna od praktycznej. Narzedzia: Read, Write, Bash (R/Python).</p>',

  eda_analyst: '<p>EDA Analyst to specjalista od Exploratory Data Analysis. Odkrywa strukture, jakosc i niespodzianki w danych ZANIM ktos na nich buduje model. Profiluje kazda kolumne (typ, NULL, unikaty, statystyki), wykrywa anomalie metodami IQR/z-score, sprawdza rozklady (skosnosc, kurtoza) i proponuje transformacje (log, Box-Cox).</p><p>Liczy korelacje Pearson/Spearman i oznacza pary z |r|>0.8 jako ryzyko multicollinearity. Generuje minimum 5 wizualizacji: histogramy, boxploty, scatter matrix, heatmape korelacji, missing map. Nie czysci danych bez zgody - raportuje i proponuje. Odstania NIGDY nie sa usuwane bez decyzji biznesowej. Narzedzia: Read, Write, Bash (Python/pandas/matplotlib).</p>'
};
```

---

## AGENT_MID_PL

```js
const AGENT_MID_PL = {
  qa_security: 'Uzywaj dla kazdego artefaktu przed wdrozeniem na produkcje, zwlaszcza kodu dotykajacego autentykacji, danych wrazliwych lub systemow agentowych.',
  qa_quality: 'Uzywaj gdy masz spec i wymagasz pokrycia testami >80% - audyt jakosci przed release, weryfikacja zgodnosci z wymaganiami produktowymi.',
  qa_perf: 'Uzywaj gdy zalezy ci na Core Web Vitals, response time, bundle size albo memory leaks - Performance Boost preset to jego naturalne srodowisko.',
  qa_manager: 'Uzywaj gdy potrzebujesz formalnej decyzji GO/NO-GO przed release - syntetyzuje raporty Security i Quality w jeden werdykt 1-10.',
  expert_pragmatist: 'Uzywaj w debatach Five Minds gdy debata grozi odjazdem od realizmu budzetu, timeline albo kompetencji zespolu.',
  expert_innovator: 'Uzywaj w debatach Five Minds gdy zespol grozi wyborem bezpiecznych starych rozwiazan zamiast sprawdzenia nowych przewag konkurencyjnych.',
  expert_analyst: 'Uzywaj w debatach Five Minds gdy decyzja wymaga twardych danych i benchmarkow zamiast opinii, intuicji albo storytellingu.',
  expert_user: 'Uzywaj w debatach Five Minds gdy zespol ryzykuje projektowanie dla inzynierow zamiast dla koncowego uzytkownika - strazuje UX i dostepnosci.',
  expert_devil: 'Uzywaj w debatach Five Minds gdy wszyscy sie za szybko zgadzaja - bez Cienia system jest slepy na wlasne bledy i groupthink.',
  decision_presenter: 'Uzywaj gdy pipeline ma krytyczne punkty decyzyjne i chcesz by czlowiek mial ostatnie slowo - 3 bramy w Deep Five Minds.',
  statistician: 'Uzywaj przy projektowaniu eksperymentow, A/B testow i analiz wymagajacych testow hipotez - zanim dotkniesz danych, nie po.',
  eda_analyst: 'Uzywaj jako pierwszy krok na nowym datasecie - profiluje dane, wykrywa anomalie i niespodzianki zanim zaczniesz modelowanie.'
};
```

---

## AGENT_GREEN_PL

```js
const AGENT_GREEN_PL = {
  qa_security: [
    'Audyt pre-release',
    'OWASP Top 10',
    'Prompt injection scan',
    'Hardcoded secrets hunt',
    'Dependency CVE scan',
    'Compliance SOC2/ISO27001'
  ],
  qa_quality: [
    'Spec compliance check',
    'Test coverage audit',
    'Edge case review',
    'N+1 query detection',
    'Code smell audit',
    'Pre-release QA gate'
  ],
  qa_perf: [
    'Core Web Vitals audit',
    'Bundle size analysis',
    'Response time measurement',
    'Memory leak detection',
    'Query performance review'
  ],
  qa_manager: [
    'Formal GO/NO-GO gate',
    'Multi-dimensional audit synthesis',
    'Release risk assessment',
    'Iterative fix loop control',
    'Stakeholder risk reporting'
  ],
  expert_pragmatist: [
    'Budget reality check',
    'Timeline estimation',
    'ROI analysis',
    'Resource feasibility',
    'Cost/quality tradeoffs'
  ],
  expert_innovator: [
    'Competitive edge hunt',
    'New tech evaluation',
    'Cross-domain inspiration',
    'Market trend analysis',
    'Differentiation strategy'
  ],
  expert_analyst: [
    'Benchmark validation',
    'KPI definition',
    'Evidence demand',
    'Data-driven decisions',
    'Claim fact-checking'
  ],
  expert_user: [
    'UX perspective advocacy',
    'Accessibility (a11y) check',
    'Onboarding assessment',
    'Click-count reduction',
    'End-user empathy'
  ],
  expert_devil: [
    'Groupthink prevention',
    'Pre-mortem analysis',
    'Assumption testing',
    'Worst-case identification',
    'Blind spot discovery'
  ],
  decision_presenter: [
    'HITL decision gates',
    'Pipeline pause for human',
    'Option card presentation',
    'Timer-based auto-decide',
    'Decision logging'
  ],
  statistician: [
    'Hypothesis design',
    'Sample size calculation',
    'Test selection',
    'Multiple testing correction',
    'Effect size reporting',
    'A/B test planning'
  ],
  eda_analyst: [
    'Dataset profiling',
    'Anomaly detection',
    'Correlation analysis',
    'Distribution checks',
    'Missing data mapping',
    'Pre-modeling reconnaissance'
  ]
};
```

---

## AGENT_RED_PL

```js
const AGENT_RED_PL = {
  qa_security: [
    'Wewnetrzne POC',
    'Kod izolowany offline',
    'Duplikacja zewnetrznego scannera',
    'Eksperymentalne prototypy',
    'Naprawianie kodu (tylko raport)'
  ],
  qa_quality: [
    'Prototypy bez spec',
    'MVP speed > quality',
    'Kod eksperymentalny',
    'Projekty z CI/CD auto-testami',
    'Naprawianie bledow'
  ],
  qa_perf: [
    'Wczesne prototypy',
    'Kod bez metryk baseline',
    'Optymalizacja mikroskopijna',
    'Audyt bezpieczenstwa',
    'Ocena code quality'
  ],
  qa_manager: [
    'MVP bez release gate',
    'Hotfix bez czasu',
    'Single-dimension QA',
    'Code review przez czlowieka',
    'Decyzje architektoniczne'
  ],
  expert_pragmatist: [
    'Implementacja kodu',
    'Sole innovation blocker',
    'Pesymistyczne blokady',
    'Debata czysto techniczna',
    'Szybkie solo decyzje'
  ],
  expert_innovator: [
    'Ignorowanie kosztow',
    'Shiny object syndrome',
    'Over-engineering MVP',
    'Hype-driven decyzje',
    'Implementacja kodu'
  ],
  expert_analyst: [
    'Proponowanie rozwiazan',
    'Analysis paralysis',
    'Vanity metrics worship',
    'Data cherry-picking',
    'Decyzje bez danych'
  ],
  expert_user: [
    'Decyzje architektoniczne',
    'Implementacja kodu',
    'Ignorowanie ograniczen tech',
    'Feature bloat advocacy',
    'Design by committee'
  ],
  expert_devil: [
    'Proponowanie alternatyw',
    'Lagodna krytyka',
    'Nihilistyczne blokowanie',
    'Atak bez substancji',
    'Budowanie konsensusu'
  ],
  decision_presenter: [
    'Podejmowanie decyzji',
    'Analiza techniczna',
    'Dynamiczne opcje',
    'Ingerencja w prace agentow',
    'Zbyt wiele bram HITL'
  ],
  statistician: [
    'Eksploracja danych (to EDA)',
    'Pipelines ML',
    'Biznesowa interpretacja',
    'Cherry-picking metryk',
    'P-hacking'
  ],
  eda_analyst: [
    'Budowanie modeli ML',
    'Testowanie hipotez',
    'Czyszczenie bez zgody',
    'Usuwanie odstan',
    'Feature engineering decyzje'
  ]
};
```
