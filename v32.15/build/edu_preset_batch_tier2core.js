// Batch: preset tier2 core (content, plan_exec, perf_boost, startup, cascade, test_suite, a11y, review, security)
  content: {
    tagline: 'Rurociag redakcyjny dla tekstu - dwoch zrodlowcow, redaktor i korekta pracujacy jak redakcja magazynu',
    missionShort: 'Content Pipeline to czteroosobowy zespol wyspecjalizowany w produkcji tresci, nie kodu. Dwoch researcherow rownolegle zbiera dane z forum i oficjalnej dokumentacji, Writer syntetyzuje findings w spojny dokument, a QA Quality weryfikuje fakty, kompletnosc i formatowanie.',
    whoIs: 'Siegnij po ten preset gdy potrzebujesz dokumentacji API, artykulu technicznego, raportu lub changelogu ktory ma byc bezpieczny faktograficznie. Idealny gdy tresc musi pogodzic perspektywe praktykow (forum, Stack Overflow) z oficjalnymi specyfikacjami (docs, RFC).',
    analogy: 'Ten preset to jak redakcja magazynu - dwoch dziennikarzy zbiera informacje z roznych frontow, redaktor pisze artykul z obydwu zrodel, korekta sprawdza fakty i gramatyke zanim pojdzie do druku.',
    howItWorks: [
      {label: 'Faza 1 - Brief i fan-out research', desc: 'Orkiestrator definiuje brief contentowy (temat, audience, format, pytania) i rownolegle odpala dwoch researcherow: Researcher Forums (Stack Overflow, Reddit, Discord) i Researcher Tech (oficjalne docs, API reference, changelogi).'},
      {label: 'Faza 2 - Synteza findings', desc: 'Oba raporty sa laczone w jeden brief roboczy zawierajacy perspektywe spolecznosci i perspektywe oficjalna. To wejscie dla Writera zastepuje zgadywanie danymi.'},
      {label: 'Faza 3 - Pisanie dokumentu', desc: 'Writer (Sonnet) buduje strukture H1-H3, narracje, przyklady, code snippets, tabele parametrow w stylu okreslonym przez brief. Nie ma Bash ani Edit - produkuje tylko tekst.'},
      {label: 'Faza 4 - Audyt Quality i iteracja', desc: 'QA Quality sprawdza merytoryke (fakty vs zrodla), kompletnosc (pokrycie briefu), czytelnosc i format Markdown. PASS idzie do dostarczenia, FAIL wraca do Writera (max 3 iteracje).'}
    ],
    inputs: [
      'Temat dokumentu i audience (np. junior developers, CTO, klient biznesowy)',
      'Format docelowy (README, tutorial, blog post, raport porownawczy, changelog)',
      'Zakres merytoryczny (co pokryc, co pominac) i styl (techniczny, publicystyczny, edukacyjny)',
      'Opcjonalne zrodla wymagane do cytowania lub zakazane'
    ],
    outputs: [
      'Gotowy dokument w Markdown z sekcjami H1-H3 i przykladami',
      'Lista zrodel z linkami URL do forow i oficjalnej dokumentacji',
      'Raport QA Quality z tym co zostalo sprawdzone i poprawione',
      'Metadata dokumentu: word count, reading time, coverage score vs brief',
      'Raport z driftu wzgledem briefu gdy pokrycie jest niepelne'
    ],
    does: [
      'Produkuje dokumentacje techniczna opartà na dwoch niezaleznych zrodlach',
      'Laczy perspektywe praktykow z forum z oficjalna dokumentacja',
      'Tworzy README, artykuly, raporty porownawcze, changelogi, tutoriale',
      'Weryfikuje fakty przed publikacja i loguje zrodla kazdej tezy',
      'Iteruje poprawki jesli QA Quality wykryje braki lub bledy faktograficzne',
      'Respektuje styl, audience i format okreslony w briefie',
      'Wylapuje rozbieznosci miedzy tym co mowi dokumentacja a tym jak uzywa sie technologii w praktyce',
      'Skaluje dokumentacje modul po module (jeden preset = jeden dokument)'
    ],
    doesNotDo: [
      'Nie generuje kodu - Writer nie ma narzedzi Bash ani Edit do uruchamiania skryptow',
      'Nie implementuje funkcji opisanych w dokumentacji (do tego uzyj Solo lub Feature Sprint)',
      'Nie robi SEO research ani optymalizacji (od tego jest tech_writing_pipe)',
      'Nie tworzy diagramow ani grafik (preset bez Designera)',
      'Nie dziala dobrze dla krotkich tekstow - 5 linii changelogu to overhead',
      'Nie zastepuje wywiadu z prawdziwym uzytkownikiem koncowym (to rola Researcher UX)',
      'Nie obsluguje bardzo specjalistycznych dziedzin (medycyna, prawo) gdzie potrzebny ekspert ludzki'
    ],
    antiPatterns: [
      'Pipeline do kodu - proba uzycia Writera do implementacji endpointu zamiast dokumentacji; Writer nie ma Bash',
      'Pominiecie researchu - delegacja prosto do Writera bez fazy zrodlowej; koncowy dokument halucynuje API ktore nie istnieje',
      'Zbyt szeroki brief - zadanie "napisz dokumentacje calego systemu" generuje 500K tokenow i niespojny wynik',
      'Jedno zrodlo - uzycie tylko Researcher Tech bez perspektywy spolecznosci; dokument brzmi jak broszura marketingowa',
      'Brief bez audience - Writer pisze dla nikogo konkretnego i produkuje tekst za techniczny dla juniorow i za plytki dla seniorow'
    ],
    keyConcepts: [
      {term: 'Linear Pipeline', def: 'Wzorzec architektoniczny gdzie dane przeplywaja przez serie etapow w jednym kierunku, jak na tasmie produkcyjnej.'},
      {term: 'Parallel Fan-In', def: 'Hybrydowy wariant pipeline - dwa researcherzy pracuja rownolegle, ich outputy lacza sie przed Writerem.'},
      {term: 'Brief contentowy', def: 'Ustrukturyzowana instrukcja dla Writera zawierajaca temat, audience, format i pytania badawcze.'},
      {term: 'Drift wzgledem briefu', def: 'Roznica miedzy tym co mialo byc opisane a tym co Writer faktycznie pokryl - QA Quality mierzy coverage score.'},
      {term: 'Dual sourcing', def: 'Zasada ze kazda kluczowa teza musi byc oparta na co najmniej dwoch niezaleznych zrodlach (forum + docs).'}
    ],
    stats: [
      {label: 'Agenci', value: '4'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.20-0.55'},
      {label: 'Czas', value: '2-4 min'}
    ],
    bestFor: [
      'Gdy piszesz dokumentacje API lub README ktory musi byc zgodny z faktami',
      'Gdy robisz raport porownawczy technologii i musisz przytoczyc glosy praktykow i oficjalne limity',
      'Gdy piszesz artykul techniczny lub tutorial wymagajacy przykladow z prawdziwego zycia'
    ],
    worstFor: [
      'Gdy potrzebujesz kodu zamiast tekstu - to zadanie dla Solo lub Feature Sprint',
      'Gdy dokument to 1-2 zdania - preset jest przerostem formy',
      'Gdy potrzebujesz grafik, diagramow lub interaktywnych wizualizacji'
    ],
    relatedPresets: ['tech_writing_pipe', 'recon', 'reflect'],
    glossary: [
      {term: 'coverage score', definition: 'Procent pytan badawczych z briefu ktore dokument faktycznie adresuje.'},
      {term: 'fan-in', definition: 'Moment w pipeline gdzie wyjscia z wielu rownoleglych agentow spotykaja sie w jednym miejscu.'},
      {term: 'ground truth', definition: 'Prawdziwe doswiadczenia praktykow z forum, niefiltrowane przez marketing.'},
      {term: 'dual sourcing', definition: 'Regula ze kazda teza potrzebuje dwoch niezaleznych potwierdzen zanim trafi do dokumentu.'},
      {term: 'brief drift', definition: 'Odchylenie tego co napisano od tego co mialo byc napisane, mierzone przez QA.'}
    ],
    learningQuote: 'Dokumentacja bez researchu to fikcja z dobrymi intencjami - Content Pipeline traktuje pisanie z tym samym rygorem co kodowanie.',
    realExample: 'Wyobraz sobie ze masz biblioteke form-validator bez dokumentacji, a na Stack Overflow 47 osob pyta o te same 3 problemy - ten preset wysyla Researcher Forums by wylapal te 3 bolaczki, Researcher Tech by zbieral oficjalne API 23 funkcji, Writer laczy oba zrodla w README adresujace realne problemy, a QA Quality wylapuje ze brakuje jednego parametru. Jedna iteracja poprawki i masz README ktore naprawde odpowiada na pytania uzytkownikow.'
  },
  plan_exec: {
    tagline: 'Plan przed akcja - Analyst rozbija, Planner harmonogramuje, Backend buduje krok po kroku',
    missionShort: 'Plan and Execute to czteroagentowy wzorzec dla zadan strukturalnych gdzie chaos ad-hoc kosztuje wiecej niz planowanie. Analyst dekomponuje zadanie na podzadania z zaleznosciami, Planner tworzy harmonogram fazowy, Backend Dev wykonuje plan inkrementalnie, QA Quality weryfikuje kazdy krok osobno.',
    whoIs: 'Siegnij po ten preset gdy masz migracje bazy danych, refactoring duzego modulu, zmiane architektury lub update frameworka z breaking changes. Idealny wszedzie tam gdzie zaleznosci miedzy krokami powoduja ze chaos-first kosztuje 2x wiecej niz plan-first.',
    analogy: 'Ten preset to jak zespol budowlany z architektem - architekt mierzy i dekomponuje, kierownik uklada harmonogram i rezerwuje winde, robotnicy wykonuja krok po kroku, inspektor odbiera kazda faze zanim rusza nastepna.',
    howItWorks: [
      {label: 'Faza 1 - Analiza dekompozycji', desc: 'Analyst (Sonnet) czyta codebase, identyfikuje moduly dotkniete zmiana, szacuje zlozonosc S/M/L/XL, mapuje zaleznosci miedzy plikami i produkuje raport dekompozycji - lista podzadan z estymacjami.'},
      {label: 'Faza 2 - Harmonogramowanie', desc: 'Planner (Sonnet) uklada podzadania w harmonogram fazowy: kolejnosc, zaleznosci, checkpointy, kryteria PASS/FAIL dla kazdej fazy. Nie koduje, nie analizuje - planuje egzekucje.'},
      {label: 'Faza 3 - Inkrementalna egzekucja', desc: 'Backend Dev dostaje JEDEN krok z kontekstem, nie caly plan. Po ukonczeniu Orkiestrator weryfikuje wynik i deleguje nastepny krok. Blad w kroku 2 kosztuje jeden krok, nie caly zestaw.'},
      {label: 'Faza 4 - Walidacja per krok', desc: 'QA Quality audytuje KAZDY krok osobno - testy przechodza, brak regresji, krok spelnia kryteria z planu. Dopiero wtedy nastepuje progresja do kolejnego kroku.'}
    ],
    inputs: [
      'Zadanie strukturalne (migracja, refactoring, reorganizacja, zmiana architektury)',
      'Dostep do codebase przez Read i Grep dla fazy analitycznej',
      'Ograniczenia: deadline, budzet tokenowy, priorytet',
      'Kontekst architektoniczny (frameworki, konwencje, warstwy)'
    ],
    outputs: [
      'Raport dekompozycji od Analysta z zaleznosciami miedzy podzadaniami',
      'Harmonogram wykonania od Plannera (fazy, kolejnosc, checkpointy)',
      'Zrealizowany kod po wszystkich krokach planu',
      'Raporty QA per krok zamiast jednego raportu koncowego',
      'Changelog z opisem co zmieniono w kazdym kroku - pelna traceability'
    ],
    does: [
      'Dekomponuje duze zadanie na mniejsze kroki z wyraznymi zaleznosciami',
      'Tworzy harmonogram ktory identyfikuje przeszkody zanim na nie wpadniesz',
      'Wykonuje plan inkrementalnie - jeden krok, jedna walidacja, potem nastepny',
      'Izoluje bledy do jednego kroku zamiast rozlewac je po calym zadaniu',
      'Osiaga ~83 procent redukcji kosztow vs chaos-first dla zadan M i L',
      'Adaptuje plan gdy nowe odkrycia w trakcie egzekucji wymagaja re-planowania',
      'Dostarcza pelna historie zmian - co, kiedy, dlaczego dla kazdego kroku',
      'Gwarantuje ze kazdy krok przechodzi kryteria PASS zanim ruszy nastepny'
    ],
    doesNotDo: [
      'Nie jest dla prostych bugfixow - planowanie 1-krokowego zadania to overhead',
      'Nie jest dla pilnych hotfixow gdzie liczy sie predkosc, nie dokladnosc',
      'Nie ma fazy researchu - zaklada ze znasz stack i wzorce',
      'Nie ma designera - nie projektuje interfejsow ani systemow wizualnych',
      'Nie ma frontend dev - tylko Backend Dev jako jedyny builder',
      'Nie tworzy nowych funkcji od zera - jest dla zmian w istniejacym kodzie',
      'Nie zastepuje audytu bezpieczenstwa (do tego uzyj security lub review)'
    ],
    antiPatterns: [
      'Planowanie prostych zadan - wysylanie "dodaj pole email" do Plan and Execute; Analyst produkuje 1 podzadanie za 30K tokenow',
      'Plan bez checkpointow - harmonogram "5 krokow, sprawdz na koncu"; blad w kroku 2 wykrywany dopiero po kroku 5',
      'Rigid plan - kontynuacja oryginalnego planu po odkryciu nowej zlozonosci w kroku 2; zero re-planowania',
      'Caly plan w jednej delegacji - Orkiestrator przekazuje Backend Devowi 5 krokow naraz; builder traci kontekst',
      'Plan bez estymacji - Analyst nie klasyfikuje zlozonosci S/M/L/XL; Planner nie wie ktore kroki sa krytyczne'
    ],
    keyConcepts: [
      {term: 'Plan-and-Execute Loop', def: 'Wzorzec dwufazowy: najpierw plan, potem egzekucja krok po kroku z weryfikacja per krok.'},
      {term: 'Inkrementalna egzekucja', def: 'Kazdy krok to osobny cykl Build plus Verify, nie jeden duzy przelot przez cale zadanie.'},
      {term: 'Checkpoint', def: 'Punkt w planie w ktorym QA Quality sprawdza czy krok spelnia kryteria zanim rusza nastepny.'},
      {term: 'Re-planowanie', def: 'Adaptacja planu gdy nowe odkrycia w trakcie egzekucji ujawniaja nieprzewidziane zaleznosci.'},
      {term: '83 procent oszczednosci', def: 'Empirycznie zmierzona redukcja kosztow vs chaos-first dla zadan M i L (Google Multi-Agent 2024).'}
    ],
    stats: [
      {label: 'Agenci', value: '4'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.60-1.50'},
      {label: 'Czas', value: '2-4 min'}
    ],
    bestFor: [
      'Gdy masz migracje bazy danych lub ORM z wieloma zaleznymi krokami',
      'Gdy refaktorujesz duzy modul gdzie kolejnosc zmian ma znaczenie',
      'Gdy robisz update frameworka z breaking changes rozsianymi po codebase'
    ],
    worstFor: [
      'Gdy masz prosty bug do naprawy - uzyj quick_fix zamiast tego',
      'Gdy potrzebujesz pilnego hotfixa na produkcji - planowanie to strata minut',
      'Gdy zadanie ma 1 podzadanie bez zaleznosci - Analyst i Planner to overhead'
    ],
    relatedPresets: ['quick_fix', 'migration_crew', 'standard'],
    glossary: [
      {term: 'dekompozycja', definition: 'Rozbicie jednego duzego zadania na mniejsze podzadania z jasnymi granicami.'},
      {term: 'harmonogram fazowy', definition: 'Uporzadkowana sekwencja krokow z zaleznosciami i checkpointami.'},
      {term: 'checkpoint', definition: 'Moment weryfikacji miedzy krokami planu, nie dopiero na koncu.'},
      {term: 'zlozonosc S/M/L/XL', definition: 'Czterostopniowa skala estymacji pracy (small, medium, large, extra large).'},
      {term: 'chaos-first', definition: 'Podejscie bez planu - builder dostaje cale zadanie naraz i koduje na czuja.'}
    ],
    learningQuote: 'Pare minut na plan oszczedza godziny na niezaplanowanym chaosie - Plan and Execute traktuje myslenie jako tansza forma pracy niz debugowanie.',
    realExample: 'Wyobraz sobie migracje z Sequelize na Prisma w projekcie z 87 plikami - Analyst dekomponuje na 5 podzadan (schemat, CRUD, relacje, dane, testy), Planner ustawia fazy z checkpointami po kazdej, Backend Dev migruje schemat - PASS, modele - FAIL na relacji M:N - poprawka - PASS, dalej relacje, dalej dane, dalej testy. Blad w fazie 2 kosztowal 5 minut. Bez planu bylby to debugging 4 splatanych zmian naraz. Wynik: 6 iteracji, 180K tokenow, 200 sekund.'
  },
  perf_boost: {
    tagline: 'Mierz, napraw, zmierz ponownie - cykl Measure-Fix dla kodu ktory dziala ale dziala za wolno',
    missionShort: 'Performance Boost to czteroagentowy preset dla mierzalnej optymalizacji kodu ktory nie jest zlamany, tylko wolny. Analyst profiluje i identyfikuje bottlenecki, Backend Dev implementuje konkretne poprawki, QA Performance mierzy delta, Integrator sprawdza brak regresji w pokrewnych endpointach.',
    whoIs: 'Siegnij po ten preset gdy Twoj endpoint odpowiada za wolno, Core Web Vitals sa ponizej progu Google, bundle size za duzy lub baza ma wolne query. Idealny gdy masz KONKRETNY cel wydajnosciowy (np. LCP ponizej 1.5s, p95 ponizej 500ms) i potrzebujesz systematycznej optymalizacji zamiast zgadywania.',
    analogy: 'Ten preset to jak tuning silnika sportowego - diagnosta podlacza telemetrie i wskazuje ze turbo ma 15 procent leak, mechanik wymienia wydech i modyfikuje mape wtrysku, dynamometr weryfikuje +47HP, a koordynator sprawdza czy nowa mapa nie spalila zuzycia paliwa.',
    howItWorks: [
      {label: 'Faza 1 - Measure baseline', desc: 'Analyst uruchamia benchmarki, analizuje flame graphs, profiluje i identyfikuje top 3 bottlenecki z estymowanym impactem. Produkuje raport BEFORE z konkretnymi metrykami i rekomendacjami od highest-impact do lowest.'},
      {label: 'Faza 2 - Fix najwiekszego bottlenecka', desc: 'Backend Dev implementuje konkretna rekomendacje od Analysta (cache, indeksy, JOIN, lazy loading, bundle split, connection pooling). Jeden bottleneck per iteracje - nie wszystkie naraz.'},
      {label: 'Faza 3 - Verify rownolegle', desc: 'QA Performance i Integrator pracuja JEDNOCZESNIE. QA Perf mierzy delta metryk (BEFORE vs AFTER, p95, memory). Integrator sprawdza czy pokrewne endpointy nie ucierpialy - /products szybsze ale /orders nie wolniejsze?'},
      {label: 'Faza 4 - Decyzja iteracyjna', desc: 'Orkiestrator ocenia: cel osiagniety - dostarczenie. Cel nieosiagniety - Backend Dev naprawia bottleneck numer 2. Po 2 iteracjach bez postepow - eskalacja do Plan and Execute (zmiana architektury).'}
    ],
    inputs: [
      'Konkretny cel wydajnosciowy (LCP, p95, bundle size, RPS, memory footprint)',
      'Scope optymalizacji (jeden endpoint, modul, caly system)',
      'Metryki baseline jesli sa - Analyst i tak zmierzy, ale to oszczedza czas',
      'Ograniczenia (nie zmieniac bazy, zachowac kompatybilnosc API, budzet 2 iteracje)'
    ],
    outputs: [
      'Zoptymalizowany kod po implementacji rekomendacji',
      'Raport BEFORE vs AFTER z konkretnymi liczbami i delta metryk',
      'Raport integracyjny potwierdzajacy brak regresji w pokrewnych miejscach',
      'Lista zastosowanych optymalizacji z impactem kazdej osobno',
      'Priorytetyzowana lista bottleneckow pozostalych do przyszlej optymalizacji'
    ],
    does: [
      'Mierzy baseline ZANIM cokolwiek poprawi - dane, nie intuicja',
      'Identyfikuje top 3 bottlenecki w kolejnosci impactu',
      'Naprawia jeden bottleneck na iteracje dla mierzalnego efektu',
      'Weryfikuje poprawe twardymi liczbami BEFORE vs AFTER',
      'Sprawdza brak regresji w pokrewnych endpointach i modulach',
      'Iteruje az do osiagniecia celu lub wyczerpania budzetu',
      'Dokumentuje kazda optymalizacje z liczbowym impactem',
      'Eskaluje do Plan and Execute gdy problem jest architektoniczny'
    ],
    doesNotDo: [
      'Nie naprawia bledow - endpoint ktory zwraca 500 to zadanie dla quick_fix',
      'Nie optymalizuje frontend layout i CSS - preset bez Frontend Dev',
      'Nie zgaduje bez pomiaru - bez raportu Analysta nie ma optymalizacji',
      'Nie optymalizuje wszystkiego naraz - tylko top N bottleneckow',
      'Nie zmienia architektury - dla tego jest Plan and Execute',
      'Nie buduje nowych funkcji - tylko poprawia istniejace',
      'Nie robi load testingu na skalowalnosc distributed (do tego perf_squad)'
    ],
    antiPatterns: [
      'Optymalizacja bez pomiaru - Backend Dev dodaje cache bo "baza wolna"; problem byl w N+1 query',
      'Optymalizacja wszystkiego naraz - 5 bottleneckow naprawionych w jednej iteracji; nie wiadomo ktora zmiana pomogla',
      'Brak regression check - /products przyspieszone ale /orders zwolnione przez wspoldzielony cache',
      'Cel nieosiagalny architektonicznie - 5 iteracji mikro-optymalizacji kiedy potrzeba zmiany architektury',
      'Optymalizacja zdrowego kodu - wysylanie presetu dla endpointu ktory i tak spelnia SLA; zbedny koszt'
    ],
    keyConcepts: [
      {term: 'Measure-Fix Cycle', def: 'Wzorzec iteracyjny: zmierz, napraw, zweryfikuj, powtarzaj do osiagniecia celu.'},
      {term: 'Cykl Deminga', def: 'Plan-Do-Check-Act - filozoficzny pradziad Measure-Fix zaadoptowany do systemow agentowych.'},
      {term: 'Bottleneck impact', def: 'Procentowy udzial jednego miejsca w calkowitym czasie odpowiedzi - klucz do priorytetyzacji.'},
      {term: 'Regression check', def: 'Sprawdzenie czy optymalizacja jednego miejsca nie zepsula pokrewnych endpointow.'},
      {term: 'Core Web Vitals', def: 'Metryki Google (LCP, FID, CLS) ktore bezposrednio wplywaja na ranking w wyszukiwarce.'}
    ],
    stats: [
      {label: 'Agenci', value: '4'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.65-1.55'},
      {label: 'Czas', value: '2-3 min'}
    ],
    bestFor: [
      'Gdy API odpowiada za wolno i znasz docelowy SLA (p95 ponizej X ms)',
      'Gdy Core Web Vitals sa ponizej progu Google (LCP, FID, CLS)',
      'Gdy baza ma wolne query i masz dostep do flame graphs'
    ],
    worstFor: [
      'Gdy endpoint nie dziala - to bug, uzyj quick_fix',
      'Gdy masz tylko ogolne wrazenie "wydaje sie wolne" bez konkretnego celu',
      'Gdy problem jest we frontendzie (layout, hydration) - preset bez Frontend Dev'
    ],
    relatedPresets: ['perf_squad', 'quick_fix', 'plan_exec'],
    glossary: [
      {term: 'LCP', definition: 'Largest Contentful Paint - czas do wyrenderowania najwiekszego elementu nad linia zgiecia.'},
      {term: 'p95', definition: 'Wartosc metryki ponizej ktorej miesci sie 95 procent probek - realny worst case dla uzytkownikow.'},
      {term: 'N+1 query', definition: 'Antypatterrn gdy petla wykonuje po jednym query na iteracje zamiast jednego JOIN.'},
      {term: 'flame graph', definition: 'Wizualizacja profilu wykonania pokazujaca ktore funkcje zjadaja ile czasu CPU.'},
      {term: 'regression', definition: 'Nowe pogorszenie wydajnosci spowodowane przez zmiane majaca go poprawic.'}
    ],
    learningQuote: 'Nie optymalizuj bez pomiaru, nie mierz bez celu, nie dostarczaj bez regresji - Performance Boost zamienia zgadywanie w metoda.',
    realExample: 'Wyobraz sobie strone e-commerce z LCP 4.2s i CLS 0.35 - Google penalizuje ranking, konwersja spada. Analyst profiluje i pokazuje ze hero image 2.4MB bez kompresji zjada 55 procent LCP. Backend Dev konwertuje do WebP z srcset, dodaje explicit width i height, Critical CSS inline. Po jednej iteracji: LCP 2.1s, CLS 0.08, oba PASS, zero regresji w pokrewnych widokach. 120K tokenow, 130 sekund, cel osiagniety za pierwszym razem.'
  },
  startup: {
    tagline: 'Pelny cykl zycia MVP w pieciu osobach - minimalny zespol do dowiezienia kompletnego produktu',
    missionShort: 'Startup MVP to najmniejszy zespol zdolny do dostarczenia kompletnego produktu od wymagania do dzialajacego kodu. Orkiestrator koordynuje, Analyst robi user stories, Researcher Tech wybiera stack, Backend Dev buduje, QA Quality waliduje - kazdy jest niezbedny, zero redundancji.',
    whoIs: 'Siegnij po ten preset gdy budujesz MVP aplikacji webowej, prototyp pod pitch, maly SaaS z logowaniem i 1-2 funkcjami, microservice lub bota z integracja API. Idealny gdy masz ograniczony budzet, tight deadline i potrzebujesz szybko dostarczyc cos co dziala end-to-end.',
    analogy: 'Ten preset to jak startup w garazu - CEO koordynuje, product manager analizuje wymagania, tech lead wybiera technologie, jedyny developer buduje, jedyny tester sprawdza. Kazdy jest krytyczny, brak jednego zagraza misji.',
    howItWorks: [
      {label: 'Faza 1 - Analiza i research rownolegle', desc: 'Analyst rozklada wymagania na user stories, acceptance criteria i priorytetyzuje wg MoSCoW. Jednoczesnie Researcher Tech przeszukuje docs, porownuje biblioteki, rekomenduje stack ktory pozwoli najszybciej dostarczyc dzialajacy produkt.'},
      {label: 'Faza 2 - Build z pelnym briefem', desc: 'Backend Dev dostaje DWIE rzeczy jednoczesnie: specyfikacje CO budowac (od Analysta) i rekomendacje JAK budowac (od Researcher Tech). Implementuje logike, API, endpointy, modele danych, walidacje i testy.'},
      {label: 'Faza 3 - QA przeciwko specyfikacji', desc: 'QA Quality testuje artefakt PRZECIWKO specyfikacji Analysta, nie "czy kod wyglada ladnie". Edge cases, error handling, zgodnosc z acceptance criteria, testy automatyczne. Produkuje raport PASS/FAIL z konkretnymi uwagami.'},
      {label: 'Faza 4 - Iteracja lub dostarczenie', desc: 'PASS - Orkiestrator dostarcza wynik. FAIL - Backend Dev poprawia wg uwag QA (max 2-3 iteracje). CRITICAL FAIL - eskalacja do feature_sprint lub saas jesli potrzeba wiecej agentow.'}
    ],
    inputs: [
      'Wymagania uzytkownika dla MVP (co ma robic, dla kogo, jakie kluczowe funkcje)',
      'Ograniczenia (deadline, stack preferowany, platforma docelowa)',
      'Kryteria sukcesu dla pierwszego release (must-have vs nice-to-have)',
      'Opcjonalny dostep do istniejacego codebase jesli MVP nie jest od zera'
    ],
    outputs: [
      'Dzialajacy kod MVP z testami jednostkowymi',
      'Specyfikacja z user stories i acceptance criteria (artefakt Analysta)',
      'Raport technologiczny z rekomendacja stacku i uzasadnieniem',
      'Raport QA z lista sprawdzonych edge cases i uwagami',
      'Koncowy artefakt gotowy do pitch demo lub pierwszego deploya'
    ],
    does: [
      'Dostarcza pelny cykl zycia od wymagania do dzialajacego produktu',
      'Rownoleglym analiza i research oszczedzajac 30-40 procent czasu vs sekwencyjnie',
      'Wybiera stack i technologie zamiast zgadywac',
      'Weryfikuje kod przeciwko formalnym acceptance criteria',
      'Osiaga 92 procent efektywnosci 14-agentowego systemu przy 35 procent kosztu',
      'Dostarcza dzialajacy demo na pitch inwestorski w jednym przejsciu',
      'Dostarcza minimalna ale kompletna dokumentacje techniczna',
      'Skaluje sie eskalacja gdy MVP staje sie pelnym produktem'
    ],
    doesNotDo: [
      'Nie ma Frontend Dev ani Designera - brak zaawansowanego UI/UX',
      'Nie ma QA Security - MVP bez audytu bezpieczenstwa nie jest dla finansow',
      'Nie ma wielu builderow - jeden Backend Dev jako waskie gardlo',
      'Nie robi deep research - jeden Researcher Tech zamiast swarm 6 zrodel',
      'Nie buduje dla wielu mikroserwisow - brak integracji rozproszonej',
      'Nie jest dla enterprise - brak planowania i dokumentacji potrzebnej skali',
      'Nie zastepuje prawdziwego zespolu produktowego dla dlugoterminowego produktu'
    ],
    antiPatterns: [
      'Pominiecie Analityka - Backend Dev dostaje surowe wymaganie i nie wie CO budowac',
      'Pominiecie Researchera - Backend Dev zgaduje stack i refaktoruje po tygodniu',
      'Sekwencyjny research i analiza - tracisz optymalizacje "rownolegle" presetu',
      'QA na koncu po 3 iteracjach - zbyt pozno na poprawki, koszt rosnie',
      'Orkiestrator pisze kod - zamieszanie rol, orkiestrator TYLKO koordynuje'
    ],
    keyConcepts: [
      {term: 'Hub-and-Spoke', def: 'Wzorzec gdzie Orkiestrator jest centralnym hubem a 4 specjalisci szprychami wychodzacymi z niego.'},
      {term: 'MoSCoW prioritization', def: 'Must have / Should have / Could have / Won\'t have - klasyczna technika priorytetyzacji wymagan.'},
      {term: 'Parallel analysis', def: 'Analyst i Researcher Tech pracujacy jednoczesnie zamiast sekwencyjnie - oszczednosc 30-40 procent czasu.'},
      {term: 'Minimum viable product', def: 'Najmniejsza wersja produktu ktora daje wartosc uzytkownikowi i pozwala walidowac hipoteze.'},
      {term: 'Acceptance criteria', def: 'Formalna lista warunkow ktore musza byc spelnione by QA zaakceptowalo funkcjonalnosc.'}
    ],
    stats: [
      {label: 'Agenci', value: '5'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.80-1.95'},
      {label: 'Czas', value: '3-5 min'}
    ],
    bestFor: [
      'Gdy budujesz MVP aplikacji webowej od zera z ograniczonym budzetem',
      'Gdy potrzebujesz dzialajacego prototypu na pitch inwestorski w jeden dzien',
      'Gdy robisz mikro-serwis z API, logika, testami bez frontu'
    ],
    worstFor: [
      'Gdy budujesz enterprise system z wieloma domenami - za malo agentow',
      'Gdy MVP ma zaawansowany frontend lub redesign UI - brak Designera',
      'Gdy system jest security-critical - brak QA Security'
    ],
    relatedPresets: ['trio', 'feature_sprint', 'saas'],
    glossary: [
      {term: 'MVP', definition: 'Minimum Viable Product - najmniejsza wersja produktu dajaca wartosc uzytkownikowi.'},
      {term: 'user story', definition: 'Krotka forma wymagania: jako X chce Y zeby osiagnac Z.'},
      {term: 'acceptance criteria', definition: 'Formalne warunki ktore musza byc spelnione by funkcjonalnosc byla zaakceptowana.'},
      {term: 'hub-and-spoke', definition: 'Wzorzec architektoniczny z centralnym koordynatorem i 4 szprychami specjalistow.'},
      {term: 'MoSCoW', definition: 'Metoda priorytetyzacji: Must, Should, Could, Won\'t.'}
    ],
    learningQuote: 'Startup MVP to dowod ze piec dobrze dobranych glow osiaga 92 procent tego co 14 - nie dodawaj ludzi, dodawaj rownoleglosc.',
    realExample: 'Wyobraz sobie ze masz weekend na prototyp task managera pod pitch VC w poniedzialek - ten preset odpala Analysta ktory robi user stories CRUD + filtrowanie + sortowanie, jednoczesnie Researcher Tech porownuje Express vs Fastify i rekomenduje Express z better-sqlite3. Backend Dev dostaje oba artefakty i buduje REST API z walidacjami. QA Quality testuje puste tytuly, ujemne ID, duplikaty. PASS po jednej iteracji. 4 minuty, 22 centy, masz co pokazac w poniedzialek.'
  },
  cascade: {
    tagline: 'Kaskadowa eskalacja kosztow - tanie modele rozwiazuja 70-80 procent, drogie tylko trudne',
    missionShort: 'Cascade Cost to pieciowarstwowy system gdzie tanie modele (Haiku) na froncie obsluguja 70-80 procent zadan, Sonnet w srodku przetwarza 20 procent, a Opus na samym koncu tylko 5-10 procent wymagajacych syntezy. Wzorzec znany z IBM Watson, AWS Bedrock i Google Vertex AI.',
    whoIs: 'Siegnij po ten preset gdy masz duze wolumeny powtarzalnych zadan, batch processing, customer support triage, content moderation lub data pipeline. Idealny gdy jakosc musi byc zachowana ale budzet tokenow jest napiety i plac jakosci nie wymaga Opus do kazdego zapytania.',
    analogy: 'Ten preset to jak system triazu na szpitalnym SOR-ze - pielegniarka obsluguje 70 procent przypadkow, lekarz ogolny 20 procent, specjalista tylko 10 procent. Nie wysylasz kardiochirurga do kazdego drasniecia.',
    howItWorks: [
      {label: 'Faza 1 - Front-line triage na Haiku', desc: 'Dwaj Researcher Haiku pracuja rownolegle. H1 klasyfikuje zlozonosc (S/M/L/XL) i filtruje szum. H2 enrichuje dane z zewnetrznych zrodel. 70-80 procent prostych zapytan rozwiazuje sie tu za grosze ($0.001-0.005 per zapytanie).'},
      {label: 'Faza 2 - Mid-tier build na Sonnet', desc: 'Backend Dev (Sonnet) wchodzi do akcji gdy zadanie wymaga tworzenia, nie tylko czytania. Otrzymuje przetworzone dane od Haiku i buduje: generuje kod, transformuje formaty, implementuje logike.'},
      {label: 'Faza 3 - Mid-tier validate na Sonnet', desc: 'QA Quality (Sonnet) to quality gate przed eskalacja do Opus. Weryfikuje artefakty Backend Dev, uruchamia testy, sprawdza zgodnosc. PASS - wynik gotowy. FAIL - powrot do Backend Dev (max 2 iteracje).'},
      {label: 'Faza 4 - Final arbiter na Opus', desc: 'Orkiestrator (Opus) wchodzi TYLKO gdy potrzebna strategiczna synteza, rozstrzygniecie konfliktu lub decyzja architektoniczna. Zuzywa 15-30K tokenow zamiast 50-80K w klasycznym modelu - oszczednosc 50-70 procent na samym Opus.'}
    ],
    inputs: [
      'Duzy wolumen podobnych zadan (setki/tysiace dziennie)',
      'Regula routingu okreslajaca kiedy eskalowac z Haiku do Sonnet',
      'Acceptance criteria dla warstwy Haiku (co musi obsluzyc sama)',
      'Budzet tokenow i celowa redukcja kosztow'
    ],
    outputs: [
      'Przetworzone zadania z dystrybucja per warstwa',
      'Metryki rate eskalacji (ile procent trafia do kazdej warstwy)',
      'Raport kosztow z oszczednosciami vs klasyczny model wszystko-Opus',
      'Koncowe wyniki dostarczone w formacie zgodnym z kontraktem',
      'Logi decyzji eskalacyjnych dla audytu routingu'
    ],
    does: [
      'Redukuje koszty o 70-80 procent vs klasyczny model Opus wszystko',
      'Obsluguje setki/tysiace zapytan dziennie bez burzy kosztowej',
      'Uzywa najtanszego modelu ktory potrafi zadanie obsluzyc',
      'Eskaluje do drozszego modelu tylko gdy niezbedne',
      'Trzyma jakosc dzieki QA gate przed Opus',
      'Implementuje ten sam wzorzec co IBM Watson i AWS Bedrock',
      'Dziala rownolegle na Haiku dla maksymalnego throughputu',
      'Mierzy distribution eskalacji by optymalizowac regule routingu'
    ],
    doesNotDo: [
      'Nie jest dla zadan wymagajacych Opus od pierwszego kroku (architektura, strategia)',
      'Nie oplaca sie dla malych wolumenow - overhead kaskady zjada oszczednosci',
      'Nie pasuje do zadan kreatywnych wymagajacych najwyzszej jakosci od razu',
      'Nie dziala bez jasnej reguly routingu miedzy warstwami',
      'Nie gwarantuje Opus-level jakosci dla kazdego zapytania - tylko dla eskalowanych',
      'Nie zastepuje security review (Haiku moze przeoczyc zagrozenie)',
      'Nie jest elastyczny - dodaj Opus do kazdego zapytania i stracisz sens wzorca'
    ],
    antiPatterns: [
      'Opus na froncie - 10x drozszy bez powodu; cala idea kaskady zdruzgotana',
      'Brak triage - wszystko idzie od razu do Sonnet; tracisz front-line filtr Haiku',
      'Skip QA - bledy w masowych outputach rozlewaja sie do produkcji',
      'Jeden Haiku - waskie gardlo przy batch; 2x Haiku rownolegle to minimum',
      'Opus do kazdego zapytania - brak eskalacji znaczy brak kaskady, plaskie koszty'
    ],
    keyConcepts: [
      {term: 'Cascade Escalation', def: 'Wzorzec lancuchowy gdzie zadanie przechodzi przez coraz drozsze warstwy tylko gdy to konieczne.'},
      {term: 'Model routing', def: 'Logika decyzyjna wybierajaca tani lub drogi model na podstawie zlozonosci zadania.'},
      {term: 'Front-line triage', def: 'Pierwsza warstwa klasyfikujaca trudnosc i filtrujaca proste zapytania na tanim modelu.'},
      {term: 'Quality gate', def: 'QA Quality sprawdza artefakty przed kosztowna eskalacja do Opus.'},
      {term: '70-80 rule', def: 'Empirycznie zmierzony rozklad - 70-80 procent zadan rozwiazuje Haiku, 15-25 procent Sonnet, 5-10 Opus.'}
    ],
    stats: [
      {label: 'Agenci', value: '5'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.65-1.65'},
      {label: 'Czas', value: '2-4 min'}
    ],
    bestFor: [
      'Gdy masz 1000+ ticketow supportu dziennie do przetworzenia',
      'Gdy robisz batch processing dokumentow z filtrowaniem i klasyfikacja',
      'Gdy masz pipeline ETL z walidacja jakosci na roznych warstwach'
    ],
    worstFor: [
      'Gdy masz maly wolumen (dziesiatki zadan) - overhead nieoplacalny',
      'Gdy kazde zadanie wymaga Opus od poczatku - stracisz 70 procent cashflow wzorca',
      'Gdy projekt jest mission-critical bez kompromisow - ryzyko miss na Haiku'
    ],
    relatedPresets: ['data_pipe', 'kb_constructor', 'standard'],
    glossary: [
      {term: 'cascade', definition: 'Lancuchowa eskalacja przez warstwy o rosnacych kosztach i mozliwosciach.'},
      {term: 'front-line', definition: 'Pierwsza linia obslugi zapytan przez najtanszy model.'},
      {term: 'eskalacja', definition: 'Przekazanie zadania do drozszej warstwy gdy obecna sobie nie radzi.'},
      {term: 'routing logic', definition: 'Regula decydujaca kiedy zadanie eskalowac miedzy warstwami.'},
      {term: 'model tier', definition: 'Warstwa w kaskadzie okreslona przez uzywany model (Haiku, Sonnet, Opus).'}
    ],
    learningQuote: 'Nie wysylaj kardiochirurga do drasniecia - Cascade Cost uczy ze najdrozszy zasob ma sens tylko dla najtrudniejszych przypadkow.',
    realExample: 'Wyobraz sobie firme z 1000 ticketow supportu dziennie - klasyczny model Opus wszystko kosztuje $150/dzien ($54750/rok). Cascade Cost: Haiku H1 i H2 rownolegle klasyfikuja, 700 prostych dostaje odpowiedz automatyczna (Haiku koszt $0.003), 200 srednich idzie do Backend Dev (Sonnet $0.025), 100 trudnych trafia do QA i Opus ($0.036). Koszt dzienny: ~$11.70. Oszczednosc: 92 procent, $138.30 dziennie, ponad $50000 rocznie. Jakosc koncowa nieruszona bo 100 trudnych i tak dostaje Opus.'
  },
  test_suite: {
    tagline: 'Trzy niezalezne bramki QA i Manager z decyzja GO/NO-GO - komisja egzaminacyjna dla kodu',
    missionShort: 'Testing Suite to pieciowarstwowy preset walidacyjny bez builderow. Trzy niezalezne QA (Security, Quality, Performance) audytuja artefakt rownolegle z wlasnymi perspektywami, QA Manager agreguje raporty, syntetyzuje severity i wydaje finalna decyzje GO / CONDITIONAL GO / NO-GO.',
    whoIs: 'Siegnij po ten preset przed waznym release, jako CI/CD quality gate, przed audytem compliance (SOC2, HIPAA, PCI-DSS) lub po duzym merge przed deploy. Idealny wszedzie gdzie potrzebujesz trzech niezaleznych glosow zamiast jednego i formalnej decyzji GO/NO-GO.',
    analogy: 'Ten preset to jak komisja egzaminacyjna na uczelni - trzech recenzentow ocenia niezaleznie (merytoryke, metodologie, oryginalnosc), przewodniczacy komisji zbiera glosy, dziekan zatwierdza wynik. Wszyscy trzech musza podpisac zanim student broni.',
    howItWorks: [
      {label: 'Faza 1 - Dystrybucja artefaktu', desc: 'Orkiestrator przyjmuje kod/artefakt do przetestowania i dystrybuuje rownolegle do trzech QA. Kazdy dostaje TEN SAM artefakt ale z innymi instrukcjami: Security - OWASP/auth/crypto, Quality - testy/edge cases/standardy, Performance - benchmarki/memory/queries.'},
      {label: 'Faza 2 - Parallel testing', desc: 'Trzy QA pracuja JEDNOCZESNIE w ciszy, zero overlapa. QA Security skanuje pod OWASP Top 10. QA Quality weryfikuje poprawnosc logiki i pokrycie testami. QA Performance analizuje zlozonosc algorytmiczna i memory. Kazdy produkuje osobny raport.'},
      {label: 'Faza 3 - Agregacja raportow', desc: 'QA Manager odbiera trzy raporty, laczy issues, sortuje wg severity (CRITICAL/HIGH/MEDIUM/LOW) i aplikuje matryce decyzyjna. CRITICAL w Security - automatyczny NO-GO. HIGH wiecej niz 3 - NO-GO. Tylko MEDIUM/LOW - CONDITIONAL GO. Brak - GO.'},
      {label: 'Faza 4 - Decyzja i raport', desc: 'QA Manager wydaje finalny werdykt z konkretnymi uwagami do poprawy. GO - release zatwierdzony. CONDITIONAL GO - release z known issues. NO-GO - blokada z precyzyjnymi uwagami co naprawic przed re-testem.'}
    ],
    inputs: [
      'Gotowy artefakt do testowania (kod, modul, deployment package)',
      'Kontekst srodowiska docelowego (prod, staging, compliance requirements)',
      'Kryteria akceptacji biznesowe i techniczne',
      'Opcjonalny baseline do regression testing'
    ],
    outputs: [
      'Raport QA Security z lista podatnosci OWASP i severity',
      'Raport QA Quality z metrykami pokrycia testami i standardow',
      'Raport QA Performance z metrykami wydajnosci i bottleneckami',
      'Synteza QA Manager z matryce decyzyjna i finalnym werdyktem',
      'Decyzja GO / CONDITIONAL GO / NO-GO z konkretnymi uwagami do poprawy'
    ],
    does: [
      'Audytuje artefakt z trzech niezaleznych perspektyw jednoczesnie',
      'Wykrywa problemy ktore jeden QA by przeoczyl (security vs quality vs perf)',
      'Skraca czas o 3x dzieki rownoleglosci zamiast sekwencyjnosci',
      'Aplikuje formalna matryce decyzyjna GO/NO-GO',
      'Dostarcza pelny raport severity dla kazdej warstwy',
      'Chroni przed CRITICAL security nawet przy PASS quality',
      'Dziala jako CI/CD gate przed kazdym release',
      'Nadaje priorytety issues (CRITICAL/HIGH/MEDIUM/LOW)'
    ],
    doesNotDo: [
      'Nie buduje kodu - to preset czysto walidacyjny, bez builderow',
      'Nie naprawia bugow - tylko je wykrywa i raportuje',
      'Nie zastapi profesjonalnego pentestingu - to automatyczna pierwsza linia',
      'Nie dziala dla prostych zadan - armata na muche dla bugfixa',
      'Nie testuje na produkcji - weryfikuje artefakt pre-deploy',
      'Nie dziala w trakcie developmentu - za wczesnie, za drogo',
      'Nie obsluguje artefaktow bez kodu (dokumenty, designy)'
    ],
    antiPatterns: [
      'Sekwencyjne QA - security potem quality potem performance; 3x wolniejsze bez korzysci',
      'Brak QA Managera - kto podejmuje GO/NO-GO? Bez syntezy decyzja jest subiektywna',
      'QA pisze kod - zamieszanie rol; QA TYLKO testuje i raportuje',
      'Ignorowanie LOW - kumulacja dlugu technicznego; LOW loguj do backlogu',
      'FAIL = koniec - blokada bez sciezki naprawy; FAIL musi miec konkretne uwagi'
    ],
    keyConcepts: [
      {term: 'Triple QA Gate', def: 'Wzorzec architektoniczny trzech niezaleznych audytorow pracujacych rownolegle na tym samym artefakcie.'},
      {term: 'GO/NO-GO decision', def: 'Formalna brama ktora musi zostac przejdziona zanim artefakt trafi na produkcje.'},
      {term: 'Severity classification', def: 'Skala CRITICAL/HIGH/MEDIUM/LOW ktora okresla jakie issues blokuja release a jakie nie.'},
      {term: 'Parallel aggregation', def: 'Rownolegly audyt plus agregacja zamiast sekwencyjnego lancucha.'},
      {term: 'Conditional GO', def: 'Decyzja posrednia - release dozwolony z lista known issues do adresowania pozniej.'}
    ],
    stats: [
      {label: 'Agenci', value: '5'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.50-1.25'},
      {label: 'Czas', value: '3-5 min'}
    ],
    bestFor: [
      'Gdy masz pre-release validation wazna publikacja',
      'Gdy ustawiasz CI/CD quality gate przed kazdym deployem',
      'Gdy przygotowujesz sie do audytu compliance SOC2/HIPAA/PCI-DSS'
    ],
    worstFor: [
      'Gdy chcesz budowac kod - to preset tylko walidacyjny, brak builderow',
      'Gdy naprawiasz bug - zamiast tego uzyj bug_hunt lub quick_fix',
      'Gdy zadanie jest male - armata na muche i koszt bez sensu'
    ],
    relatedPresets: ['security', 'review', 'bug_hunt'],
    glossary: [
      {term: 'quality gate', definition: 'Formalna bramka walidacyjna w pipeline ktora trzeba przejsc przed nastepnym etapem.'},
      {term: 'severity', definition: 'Klasyfikacja wagi issue (CRITICAL/HIGH/MEDIUM/LOW) okreslajaca jego wplyw na decyzje release.'},
      {term: 'fan-out', definition: 'Wzorzec gdzie jeden agent rozsyla to samo zadanie rownolegle do wielu wykonawcow.'},
      {term: 'aggregate', definition: 'Laczenie wielu raportow w jeden spojny werdykt przez Managera.'},
      {term: 'CI/CD gate', definition: 'Automatyczny quality check wbudowany w pipeline Continuous Integration/Deployment.'}
    ],
    learningQuote: 'Trzy oczy widza wiecej niz jedno - Testing Suite wprowadza formalny proces GO/NO-GO tam gdzie bylaby pojedyncza subiektywna opinia.',
    realExample: 'Wyobraz sobie pre-release API e-commerce przed production deploy - /orders, /payments, /users, /products. Orkiestrator dystrybuuje kod do trzech QA rownolegle. QA Security wykrywa CRITICAL - plaintext card storage na /payments. QA Quality PASS z 2 MEDIUM. QA Performance HIGH - N+1 na /products. QA Manager: 1 CRITICAL w security = NO-GO automatyczny. Raport: "Napraw plaintext card storage, dodaj AES-256, potem re-test". Koszt $0.18, czas 4 minuty, wart unikniecia wycieku danych kart i pozwow.'
  },
  a11y: {
    tagline: 'Sprint dostepnosci WCAG - audit, redesign, implementacja, walidacja i dokumentacja zgodnosci',
    missionShort: 'Accessibility Sprint to pieciofazowy pipeline wyspecjalizowany w WCAG 2.1/2.2 AA compliance. Researcher UX audytuje bariery, Designer projektuje rozwiazania inclusive, Frontend Dev implementuje semantic HTML i ARIA, QA Quality uruchamia axe-core i Lighthouse, Writer tworzy VPAT i developer guide.',
    whoIs: 'Siegnij po ten preset gdy potrzebujesz audytu WCAG przed launchem, remediation istniejacego produktu, przygotowania pod ADA/EAA compliance, redesignu dostepnosci po external audit, lub obowiazkowej zgodnosci government/public sector. Idealny gdy aplikacja ma juz interfejs ale bariery a11y blokuja odbiorcow.',
    analogy: 'Ten preset to jak inspekcja budowlana pod katem dostepnosci - inspektor bada bariery, architekt projektuje rampy, budowlancy implementuja, inspektor odbiera, dokumentalista tworzy raport zgodnosci dla urzedu.',
    howItWorks: [
      {label: 'Faza 1 - A11y audit', desc: 'Researcher UX skanuje HTML/CSS/JS pod WCAG 2.1/2.2. Sprawdza semantic HTML, alt texty, kontrasty (AA 4.5:1, AAA 7:1), keyboard navigation, ARIA labels, screen reader compatibility, prefers-reduced-motion. Produkuje raport z lista naruszen per severity.'},
      {label: 'Faza 2 - Inclusive redesign', desc: 'Designer projektuje rozwiazania dla kazdego naruszenia: nowa paleta z kontrastami, focus states, skip navigation, responsive typography z rem/em, ikony z opisami tekstowymi, formularze z proper labels i error messages.'},
      {label: 'Faza 3 - Implementation', desc: 'Frontend Dev implementuje redesign w kodzie: semantic HTML zamiast divow, ARIA role/label/describedby/live, CSS focus-visible i high-contrast media queries, JS keyboard event handlers, skip navigation links, prefers-reduced-motion.'},
      {label: 'Faza 4 - Walidacja tool-based', desc: 'QA Quality uruchamia axe-core (automatyczny WCAG audit), Lighthouse a11y score (cel 95+), pa11y compliance checker, manual keyboard test, contrast checker. Produkuje raport PASS/FAIL per kryterium WCAG.'},
      {label: 'Faza 5 - Dokumentacja zgodnosci', desc: 'Writer tworzy VPAT (Voluntary Product Accessibility Template), A11y Statement dla strony, Developer Guide dla przyszlych zmian, Testing Checklist dla QA, liste Known Issues z planem naprawy.'}
    ],
    inputs: [
      'Kod zrodlowy HTML/CSS/JS aplikacji lub strony',
      'Docelowy poziom WCAG (AA standard, AAA dla pelnej zgodnosci)',
      'Wymagania compliance (ADA, EAA, Section 508)',
      'Opcjonalny raport z zewnetrznego audytu jesli juz byl'
    ],
    outputs: [
      'Raport audytu WCAG z lista naruszen wg severity (Critical/High/Medium)',
      'Specyfikacja redesignu z nowymi tokenami kolorow i komponentami',
      'Poprawiony kod z semantic HTML i ARIA',
      'Raport walidacji z Lighthouse score i axe-core verdykt',
      'VPAT, A11y Statement, Developer Guide i Testing Checklist'
    ],
    does: [
      'Audytuje WCAG 2.1 AA i 2.2 compliance systematycznie',
      'Projektuje rozwiazania dla kazdego naruszenia znalezionego przez audit',
      'Implementuje semantic HTML i ARIA zgodnie z W3C specs',
      'Uruchamia axe-core, Lighthouse, pa11y jako automatyczne narzedzia',
      'Testuje keyboard navigation i screen reader flow',
      'Generuje VPAT i A11y Statement dla compliance reporting',
      'Dostarcza Developer Guide dla przyszlych zmian',
      'Osiaga typowo Lighthouse a11y score 95+'
    ],
    doesNotDo: [
      'Nie zmienia backendu - fokus na warstwe prezentacji',
      'Nie implementuje logiki biznesowej - tylko warstwe dostepnosci',
      'Nie robi QA Security ani Performance (uzyj test_suite)',
      'Nie dziala dla wewnetrznych narzedzi bez wymogow a11y',
      'Nie zastepuje testow z prawdziwymi uzytkownikami asystentow',
      'Nie tlumaczy tresci na jezyk migowy (to inny zakres)',
      'Nie obsluguje aplikacji bez warstwy UI (np. czyste API)'
    ],
    antiPatterns: [
      'Skip audytu - Designer zaczyna redesign bez wiedzy co jest zlamane; redesign w ciemno',
      'Brak axe-core/pa11y - reczne testy pokazuja wiele dziur; automatyczne narzedzia sa baseline',
      'Ignorowanie keyboard - 15 procent uzytkownikow bez myszy; kazdy komponent musi byc testowany Tab',
      'A11y jako afterthought - dodawanie dostepnosci po launchu kosztuje 10x wiecej',
      'Brak dokumentacji - regresja przy nastepnych zmianach bo developerzy nie znaja standardu'
    ],
    keyConcepts: [
      {term: 'WCAG 2.1/2.2', def: 'Web Content Accessibility Guidelines - oficjalny standard dostepnosci W3C.'},
      {term: 'Semantic HTML', def: 'Uzycie znacznikow H1-H6, nav, main, article, aside zamiast generycznych div.'},
      {term: 'ARIA labels', def: 'Atrybuty accessible rich internet applications dla screen readerow.'},
      {term: 'VPAT', def: 'Voluntary Product Accessibility Template - standardowy format raportu zgodnosci.'},
      {term: 'Lighthouse score', def: 'Google tool ktory mierzy a11y score od 0 do 100 (cel presetu: 95+).'}
    ],
    stats: [
      {label: 'Agenci', value: '5'},
      {label: 'Fazy', value: '5'},
      {label: 'Koszt est.', value: '$0.60-1.50'},
      {label: 'Czas', value: '3-5 min'}
    ],
    bestFor: [
      'Gdy przygotowujesz aplikacje pod WCAG 2.1 AA compliance',
      'Gdy dostales external audit raport i musisz naprawic bariery',
      'Gdy obslugujesz klientow government/public sector z ADA/EAA wymogami'
    ],
    worstFor: [
      'Gdy aplikacja nie ma UI (czyste API lub CLI)',
      'Gdy piszesz wewnetrzne narzedzie dla zespolu bez wymogow a11y',
      'Gdy potrzebujesz zmian w logice biznesowej lub backendu'
    ],
    relatedPresets: ['design_sys', 'ui_overhaul', 'feature_sprint'],
    glossary: [
      {term: 'WCAG', definition: 'Web Content Accessibility Guidelines - miedzynarodowy standard dostepnosci cyfrowej.'},
      {term: 'ARIA', definition: 'Accessible Rich Internet Applications - W3C spec dodajaca semantyke dla screen readerow.'},
      {term: 'axe-core', definition: 'Open source engine do automatycznego audytu WCAG uzywany w Lighthouse i Deque.'},
      {term: 'VPAT', definition: 'Voluntary Product Accessibility Template - standardowy raport zgodnosci a11y.'},
      {term: 'contrast ratio', definition: 'Stosunek jasnosci tekstu do tla - WCAG AA wymaga 4.5:1 dla body text.'}
    ],
    learningQuote: 'Dostepnosc to nie feature, to prawo - Accessibility Sprint traktuje bariery cyfrowe jak bariery fizyczne do usuniecia.',
    realExample: 'Wyobraz sobie sklep internetowy przed launchem: Researcher UX skanuje 4 strony i znajduje 47 naruszen WCAG (8 Critical, 15 High, 24 Medium). Designer tworzy nowa palete (kontrast 8.2:1), focus rings, skip nav. Frontend Dev aplikuje 47 poprawek. QA Quality: axe-core 0 Critical, 0 High, 3 Medium akceptowalne. Lighthouse z 52 do 97. Writer generuje VPAT i Developer Guide. Koszt $0.24, 5 minut, wart unikniecia pozwu ADA (srednia kara $75000).'
  },
  review: {
    tagline: 'Build plus osobny review - Analyst planuje, dwaj builderzy buduja, dwaj recenzenci oceniaja niezaleznie',
    missionShort: 'Code Review to szesciowarstwowy preset ktory laczy budowe nowej funkcjonalnosci z obowiazkowym peer review. Analyst tworzy implementation plan, Backend Dev i Frontend Dev buduja rownolegle, potem QA Security i QA Quality audytuja gotowy artefakt niezaleznie. Wzorzec AWS Pull Request z separacja piszacego od recenzenta.',
    whoIs: 'Siegnij po ten preset gdy masz krytyczny feature wymagajacy peer review, PR dotykajacy security-sensitive kodu, compliance-requiring zmiane lub wazna funkcjonalnosc gdzie autor nie powinien sam siebie walidowac. Idealny gdy potrzebujesz separacji build i review, nie tylko tych samych osob.',
    analogy: 'Ten preset to jak publikacja naukowa - autor pisze artykul, dwoch niezaleznych recenzentow ocenia metodologie i jasnosc, redaktor naczelny decyduje accept/revise/reject. Autor NIGDY nie recenzuje siebie.',
    howItWorks: [
      {label: 'Faza 1 - Analiza i plan', desc: 'Analyst otrzymuje feature request, rozklada go na konkretne zadania budowy, identyfikuje pliki do zmiany, okresla granice backend vs frontend, definiuje testy. Produkuje implementation plan bedacy kontraktem dla builderow i referenzja dla QA.'},
      {label: 'Faza 2 - Parallel build', desc: 'Backend Dev i Frontend Dev pracuja JEDNOCZESNIE na podstawie tego samego planu. Backend buduje API/DB/logic/middleware. Frontend buduje components/state/API integration/styling. Kazdy ma swoja czesc planu i testy integracyjne.'},
      {label: 'Faza 3 - Parallel audit', desc: 'QA Security i QA Quality audytuja POLACZONY artefakt jednoczesnie. QA Security skanuje NOWY kod pod top 5 OWASP (Injection, XSS, Broken Access Control, Misconfig, Vulnerable Components). QA Quality weryfikuje zgodnosc z planem Analysta i metryki jakosci.'},
      {label: 'Faza 4 - Decyzja PASS/REVISE/REJECT', desc: 'Orkiestrator syntetyzuje oba raporty QA. PASS - kod merge-ready. REVISE - micro-loop, poprawki w builderach bez zmiany planu. REJECT - macro-loop, Analyst re-planuje i cykl od nowa. Max 3 iteracje, potem eskalacja.'}
    ],
    inputs: [
      'Feature request z opisem nowej funkcjonalnosci',
      'Specyfikacja wymagania biznesowe i techniczne',
      'Istniejacy codebase do modyfikacji lub rozbudowy',
      'Kryteria akceptacji i kontekst architektoniczny (stack, konwencje)'
    ],
    outputs: [
      'Implementation plan od Analysta z mapowaniem plikow',
      'Artefakt Backend z nowym/zmodyfikowanym kodem serwerowym i testami',
      'Artefakt Frontend z kodem UI i testami komponentow',
      'Raport QA Security z audytem OWASP top 5 nowego kodu',
      'Raport QA Quality z plan matching i metrykami + decyzja PASS/REVISE/REJECT'
    ],
    does: [
      'Separuje piszacego od recenzenta (AWS Pattern)',
      'Tworzy formalna faze recenzji jak Pull Request w ludzkim zespole',
      'Buduje rownoleglag backend i frontend z jednego planu',
      'Audytuje nowy kod (nie caly codebase) jak git diff review',
      'Sprawdza zgodnosc budowy z planem (drift detection)',
      'Oferuje trzy poziomy feedback loop (revise/reject/eskalacja)',
      'Wylapuje security issues w nowym kodzie przed mergem',
      'Dostarcza pelna traceability od planu do artefaktu'
    ],
    doesNotDo: [
      'Nie robi fazy researchu - zaklada ze znasz wymagania',
      'Nie dziala dla drobnych zmian - za ciezki dla literowek',
      'Nie audytuje calego codebase - tylko nowy kod (diff)',
      'Nie ma QA Performance - fokus na security i quality',
      'Nie zastepuje profesjonalnego code review przez seniora',
      'Nie dziala bez konkretnego feature request - potrzebuje inputu',
      'Nie robi eksploracji - dla tego recon lub reflect'
    ],
    antiPatterns: [
      'Autor recenzuje siebie - naruszenie AWS Pattern, brak separacji',
      'Brak Analysta - Builderzy zgaduja kontrakt, QA nie ma baseline do walidacji',
      'Sekwencyjny build - Backend czeka na Frontend lub odwrotnie; 30-40 procent dluzej',
      'Audyt calego codebase - zamiast git diff, 10x wiekszy koszt, 90 procent nieistotnych issue',
      'Max iteracji przekroczony bez eskalacji - Orkiestrator musi wejsc po 3 iteracjach'
    ],
    keyConcepts: [
      {term: 'AWS Pattern', def: 'Build i review jako osobne, rownolegle fazy z separacja osob piszacych od recenzujacych.'},
      {term: 'Pipeline + Fan-out', def: 'Hybrydowa architektura - najpierw linia (Analyst), potem rownolegle (Builderzy, potem QA).'},
      {term: 'Micro-loop', def: 'REVISE - QA zwraca uwagi, Builderzy poprawiaja, ten sam plan, QA weryfikuje ponownie.'},
      {term: 'Macro-loop', def: 'REJECT - QA kwestionuje plan, Analyst re-planuje, Builderzy od zera, QA weryfikuje.'},
      {term: 'Plan matching', def: 'QA Quality sprawdza czy artefakt robi dokladnie to co bylo w implementation planie.'}
    ],
    stats: [
      {label: 'Agenci', value: '6'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.05-2.70'},
      {label: 'Czas', value: '4-6 min'}
    ],
    bestFor: [
      'Gdy masz krytyczny feature wymagajacy obowiazkowego review przed merge',
      'Gdy zmiana dotyka security-sensitive kodu (auth, payments, user data)',
      'Gdy potrzebujesz compliance audit trail (kto budowal, kto recenzowal)'
    ],
    worstFor: [
      'Gdy robisz drobne zmiany jak literowki lub copy changes',
      'Gdy potrzebujesz szybkiego researchu - brak fazy badawczej',
      'Gdy projekt jest bez ryzyka i overhead review nie jest uzasadniony'
    ],
    relatedPresets: ['security', 'test_suite', 'feature_sprint'],
    glossary: [
      {term: 'pull request', definition: 'Formalna prosba o review i merge zmian w kodzie - odpowiednik tego presetu.'},
      {term: 'AWS Pattern', definition: 'Praktyka Amazon Web Services z separacja builderow od recenzentow.'},
      {term: 'drift', definition: 'Odchylenie budowy od planu - gdy builder zrobil cos innego niz Analyst zaplanowal.'},
      {term: 'micro-loop', definition: 'Krotka petla poprawek bez zmiany planu - tylko uwagi od QA do builderow.'},
      {term: 'macro-loop', definition: 'Duza petla - powrot do Analysta po re-planowanie i ponowna budowe.'}
    ],
    learningQuote: 'Kto pisal nie recenzuje - Code Review aplikuje zlota zasade inzynierii Amazon jako strukturalny wzorzec multi-agent.',
    realExample: 'Wyobraz sobie feature "system powiadomien email" dla SaaS - Analyst tworzy plan z 7 zadaniami Backend (EmailService, rate limiter, endpoints) i 5 Frontend (preferences page, toggle, hook). Backend Dev i Frontend Dev buduja rownolegle po 55 i 60 sekund. QA Security znajduje MEDIUM - brak walidacji ze user modyfikuje SWOJE preferencje. QA Quality PASS z 82 procent coverage. Orkiestrator: PASS z adnotacja "dodac middleware weryfikujacy req.user.id przed production". 235K tokenow, $0.32, 280 sekund, merge-ready.'
  },
  security: {
    tagline: 'Trojstopniowy audyt bezpieczenstwa z GO/NO-GO - OWASP, quality, performance i Manager syntetyzujacy werdykty',
    missionShort: 'Security Hardening to szesciowarstwowy preset pre-deployment audit. Backend Dev hartuje kod (walidacje, sanityzacje, rate limiting, security headers), a nastepnie trzy niezalezne QA (Security pod OWASP Top 10, Quality pod jakosc kodu, Performance pod wydajnosc) audytuja rownolegle. QA Manager syntetyzuje trzy raporty w formalna decyzje GO / CONDITIONAL GO / NO-GO.',
    whoIs: 'Siegnij po ten preset gdy robisz pre-release security audit, compliance verification (PCI DSS, HIPAA, SOC2), production deployment gate lub przygotowanie pod audyt zewnetrzny. Idealny wszedzie gdzie koszt incydentu (sredni $4.88M wg IBM 2025) wielokrotnie przewyzsza koszt automatycznego audytu za 0.75-1.95 dolara.',
    analogy: 'Ten preset to jak inspekcja mostu przed otwarciem - inzynier konstrukcji bada nosnosc, ekspert sejsmiczny odpornosc na wstrzasy, inspektor bezpieczenstwa ogolne ryzyko. Naczelny inspektor wydaje pozwolenie dopiero gdy wszystkich trzech powiedzialo TAK. Bez zgody wszystkich most nie otwiera sie.',
    howItWorks: [
      {label: 'Faza 1 - Hardening przez Backend Dev', desc: 'Orkiestrator odbiera artefakt, Backend Dev wzmacnia kod (nie buduje nowych funkcji): dodaje walidacje inputow, sanityzacje outputow, rate limiting, security headers (CSP, HSTS, X-Frame-Options), CORS, security logging. Zwraca zahartowany artefakt.'},
      {label: 'Faza 2 - Fan-out trojstopniowy audyt', desc: 'Orkiestrator dystrybuuje zahartowany artefakt JEDNOCZESNIE do trzech QA. Q-01 Security skanuje pod OWASP Top 10 (Injection, Broken Access Control, Crypto Failures, Auth, Misconfig, Logging). Q-02 Quality weryfikuje DRY/SOLID/testy/dokumentacje. Q-04 Performance analizuje Big-O/N+1/memory/I/O.'},
      {label: 'Faza 3 - Agregacja przez QA Manager', desc: 'QA Manager (jedyny agent ktory widzi wszystkie trzy raporty) syntetyzuje je wg matrycy decyzyjnej. CRITICAL w Security = automatyczny NO-GO. HIGH w dowolnej warstwie = WARUNKOWY GO. Tylko MEDIUM/LOW = GO z adnotacja. Regula nadrzedna: CRITICAL Security ZAWSZE blokuje release.'},
      {label: 'Faza 4 - Decyzja koncowa', desc: 'Orkiestrator dostarcza wynik: GO - pelen release approved. WARUNKOWY GO - release z lista known issues i adnotacjami do sprintu. NO-GO - eskalacja do Backend Dev po konkretne poprawki, a potem ponowny cykl audytu.'}
    ],
    inputs: [
      'Gotowy kod zrodlowy do audytu (JS/TS/Python/Go/etc.)',
      'Konfiguracje - .env, docker-compose, nginx.conf, Dockerfile',
      'Specyfikacje - opis co kod ma robic (do weryfikacji zgodnosci)',
      'Kontekst wdrozenia i wymagania compliance (SOC2, GDPR, HIPAA, PCI-DSS)'
    ],
    outputs: [
      'Zahartowany artefakt po pass Backend Dev (walidacje, rate limiting, headers)',
      'Raport QA Security z lista podatnosci OWASP i klasyfikacja severity',
      'Raport QA Quality z metrykami DRY, SOLID, coverage, cyclomatic complexity',
      'Raport QA Performance z Big-O, N+1 queries, memory leaks, bottleneckami',
      'Synteza QA Manager i formalna decyzja GO / CONDITIONAL GO / NO-GO'
    ],
    does: [
      'Audytuje kod z trzech niezaleznych perspektyw (security, quality, performance)',
      'Wykrywa 70-85 procent typowych podatnosci pre-deployment',
      'Mapuje issues do OWASP Top 10 kategorii z severity',
      'Aplikuje formalna matryce decyzyjna GO/NO-GO',
      'Gwarantuje ze CRITICAL security zawsze blokuje release',
      'Dostarcza audit trail dla compliance (SOC2, HIPAA, PCI-DSS)',
      'Hartuje kod Backend Devem zanim QA zaczna audyt',
      'Iteruje poprawki dopoki werdykt nie bedzie GO lub CONDITIONAL'
    ],
    doesNotDo: [
      'Nie zastepuje profesjonalnego pentestingu przez ludzi',
      'Nie zastepuje manualnego code review przez senior inzyniera',
      'Nie wykrywa logicznych luk biznesowych wymagajacych kontekstu domeny',
      'Nie testuje na produkcji ani nie uruchamia live exploit',
      'Nie naprawia wykrytych podatnosci automatycznie (tylko Backend Dev wzmacnia na starcie)',
      'Nie dziala dla feature requestow bez gotowego kodu',
      'Nie robi full OWASP ASVS audit (to zakres pentester ludzki)'
    ],
    antiPatterns: [
      'Sekwencyjny audyt - security potem quality potem performance; 3x wolniejsze bez zysku',
      'Brak QA Managera - trzy niezalezne raporty bez syntezy; decyzja GO/NO-GO subiektywna',
      'Pomijanie Backend Dev hardening - od razu audyt bez wstepnej ochrony; wiecej issues do naprawy',
      'Ignorowanie CRITICAL - proba release mimo blokady security; zagrozenie incydentem',
      'Brak compliance context - audit bez wymogow SOC2/HIPAA/PCI; raport nie pasuje do audytora'
    ],
    keyConcepts: [
      {term: 'Fan-out to Aggregate', def: 'Wzorzec gdzie Orkiestrator rozsyla zadanie do wielu specjalistow, a Manager zbiera raporty w synteze.'},
      {term: 'OWASP Top 10', def: 'Standard bezpieczenstwa web aplikacji - dziesiec najczestszych kategorii podatnosci.'},
      {term: 'GO/NO-GO gate', def: 'Formalna brama decyzyjna ktora musi byc przejdziona zanim artefakt trafi na produkcje.'},
      {term: 'Severity matrix', def: 'Tabela decyzyjna mapujaca kombinacje severity trzech warstw na decyzje GO/CONDITIONAL/NO-GO.'},
      {term: 'Hardening pass', def: 'Wstepne wzmocnienie kodu (walidacje, headers, rate limiting) zanim zacznie sie audyt.'}
    ],
    stats: [
      {label: 'Agenci', value: '6'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.75-1.95'},
      {label: 'Czas', value: '3-6 min'}
    ],
    bestFor: [
      'Gdy robisz pre-release security audit przed production deploy',
      'Gdy przygotowujesz sie do compliance audit (PCI DSS, HIPAA, SOC2)',
      'Gdy chcesz formalna brame GO/NO-GO zamiast subiektywnej opinii'
    ],
    worstFor: [
      'Gdy probujesz zastapic profesjonalny pentest - to pierwsza linia, nie jedyna',
      'Gdy robisz kosmetyczne zmiany w UI - za ciezki preset',
      'Gdy aplikacja nie ma wrazliwych danych i audit bezpieczenstwa nie jest potrzebny'
    ],
    relatedPresets: ['security_multi_vector', 'review', 'test_suite'],
    glossary: [
      {term: 'OWASP', definition: 'Open Web Application Security Project - organizacja standaryzujaca bezpieczenstwo web.'},
      {term: 'hardening', definition: 'Proces wzmacniania kodu przez dodawanie walidacji, sanityzacji i security controls.'},
      {term: 'severity', definition: 'Klasyfikacja wagi podatnosci: CRITICAL, HIGH, MEDIUM, LOW.'},
      {term: 'PCI DSS', definition: 'Payment Card Industry Data Security Standard - wymog dla aplikacji z kartami platniczymi.'},
      {term: 'fan-out', definition: 'Wzorzec rozsylania jednego artefaktu rownolegle do wielu audytorow.'}
    ],
    learningQuote: 'Trzy niezalezne glosy i matryce decyzyjna - Security Hardening zamienia subiektywny strach przed wlamaniem w strukturalny proces GO/NO-GO.',
    realExample: 'Wyobraz sobie API e-commerce 2 tygodnie przed Black Friday - 12 plikow Node/Express, docker-compose, nginx, .env.production. Backend Dev hartuje: walidacje inputow, rate limiting, security headers, CORS. Fan-out: QA Security wykrywa HIGH - brak walidacji kart wg PCI. QA Quality PASS z MEDIUM na brak JSDoc. QA Performance HIGH - N+1 w /orders. QA Manager: HIGH security plus HIGH performance = WARUNKOWY GO z adnotacjami "napraw przed Black Friday". Orkiestrator deleguje poprawki, ponowny audyt PASS, GO. Koszt $0.35, 5 minut, uniknieto kosztu incydentu.'
  },
