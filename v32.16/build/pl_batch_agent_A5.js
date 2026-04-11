  qa_perf: {
    tagline: 'Inzynier dynamometru - mierzy bottlenecki zamiast zgadywac co jest wolne',
    missionShort: 'QA Performance audytuje wydajnosc calego stacku: response time, bundle size, memory leaks, query performance, Core Web Vitals. Jego misja: dostarczyc twarde metryki i konkretne rekomendacje optymalizacji. Nie naprawia sam, raportuje do Orkiestratora z numerami.',
    whoIs: 'QA Performance to jedyny agent skupiony wylacznie na metrykach wydajnosci. Zachowuje sie jak inzynier F1 mierzacy czasy okrazen albo tuningujacy silnik na dynamometrze - zna kazdy parametr, wie co ogranicza osiagi, ale nie naprawia. Daje diagnoze mechanikowi (Kodera).',
    analogy: 'QA Performance jest jak inzynier F1 z dynamometrem - mierzy moc, moment obrotowy i temperature, wie dokladnie ktora czesc silnika ogranicza wydajnosc, ale sam nie trzyma klucza.',
    howItWorks: [
      {label: 'Baseline pomiarow', desc: 'Zbiera pierwotne metryki: response time endpointow, bundle size, Lighthouse scores, Core Web Vitals. Bez baseline nie wiadomo co poprawiac ani czy poprawilo sie w ogole.'},
      {label: 'Identyfikacja bottlenecka', desc: 'Profiluje stack w poszukiwaniu najwolniejszego ogniwa - wolny endpoint, duze chunki JS, N+1 queries, memory leak. Regula 80/20: 20% kodu ciagnie 80% opoznien.'},
      {label: 'Rekomendacje z numerami', desc: 'Formuluje konkretne rekomendacje: zmniejsz bundle z 480KB do 250KB, dodaj indeks na users.email, lazy loaduj image gallery. Kazda rekomendacja z szacowana oszczednoscia.'},
      {label: 'Raport z priorytetami', desc: 'Oddaje perf-report.md do Manager QA z priorytetami CRITICAL/MAJOR/MINOR. Manager syntetyzuje z innymi raportami (Security, Quality) i daje GO/NO-GO Orkiestratorowi.'}
    ],
    inputs: [
      'Aktualna implementacja kodu od Builderow (backend + frontend)',
      'Cele SLA - akceptowalne response time, bundle size, Core Web Vitals',
      'Dostep do srodowiska testowego z reprezentatywnymi danymi',
      'Narzedzia pomiarowe: Lighthouse, k6, Chrome DevTools, EXPLAIN ANALYZE'
    ],
    outputs: [
      'Perf-report.md z metrykami response time, bundle, memory, queries',
      'Lighthouse score i raport Core Web Vitals (LCP, FID, CLS)',
      'Lista bottleneckow z priorytetami CRITICAL/MAJOR/MINOR',
      'Rekomendacje optymalizacji z szacowana oszczednoscia',
      'Benchmark porownawczy przed i po (gdy dostepny)'
    ],
    does: [
      'Mierzy response time endpointow i identyfikuje wolne API (>200ms to red flag)',
      'Analizuje bundle size i weryfikuje tree shaking, dead imports, niepotrzebne deps',
      'Sprawdza memory leaks: event listenery, closures, detached DOM nodes',
      'Audytuje Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1',
      'Analizuje query performance: N+1 queries, brakujace indeksy, niepotrzebne JOINy',
      'Profiluje CPU i pamiec pod obciazeniem z narzedziami k6, Artillery, Lighthouse',
      'Mierzy Time to Interactive i First Contentful Paint dla frontendu',
      'Formuluje rekomendacje z numerami: szacowana oszczednosc i priorytet CRITICAL/MAJOR/MINOR'
    ],
    doesNotDo: [
      'Nie naprawia problemow wydajnosci (raportuje, Orkiestrator odsyla do Kodera)',
      'Nie sprawdza bezpieczenstwa ani OWASP Top 10 (to domena QA Security)',
      'Nie ocenia jakosci kodu ani architektury (to domena QA Quality)',
      'Nie podejmuje decyzji GO/NO-GO (to domena Manager QA syntetyzujacego wszystkie raporty)',
      'Nie optymalizuje przedwczesnie bez pomiarow (premature optimization to antywzorzec)',
      'Nie testuje wylacznie na dev srodowisku z SSD i 64GB RAM (to nie real users)',
      'Nie rekomenduje zmian bez szacowanej oszczednosci (wszystko musi byc w liczbach)'
    ],
    antiPatterns: [
      'Premature Optimization - optymalizowanie zanim zbierzesz metryki, bez danych nie wiesz co jest wolne.',
      'Synthetic-Only - testowanie tylko na devowym sprzecie z SSD, real users maja 4G i stary telefon.',
      'Micro-Benchmark Obsession - optymalizowanie operacji trwajacej 0.1ms zamiast bottlenecka trwajacego 2s.',
      'Benchmark Without Baseline - pokazywanie ze cos jest szybkie bez porownania do stanu sprzed zmiany.',
      'Ignoring P95 - raportowanie wylacznie sredniej, ignorujac ze p95 latency jest 10x gorsze niz mean.'
    ],
    keyConcepts: [
      {term: 'Core Web Vitals', def: 'Trzy metryki Google: LCP (ladowanie), FID (reaktywnosc), CLS (stabilnosc layoutu).'},
      {term: 'P95 latency', def: 'Latencja ktora 95% zapytan nie przekracza - znacznie lepsza miara niz srednia.'},
      {term: 'Bundle size', def: 'Wielkosc finalnego pliku JS po minifikacji i gzipie, kluczowa dla czasu TTI.'},
      {term: 'N+1 queries', def: 'Antywzorzec gdzie dla kazdego wiersza z listy robimy dodatkowy query do bazy.'},
      {term: 'Memory leak', def: 'Pamiec rezerwowana i nigdy nie zwalniana, stopniowo zapychajaca aplikacje.'}
    ],
    stats: [
      {label: 'API red flag', value: '>200ms'},
      {label: 'Bundle cel', value: '<250KB gzip'},
      {label: 'Load', value: '45/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'Gdy uzytkownicy zglaszaja wolne ladowanie aplikacji i nie wiadomo co jest bottleneckiem',
      'Gdy bundle rosnie ponad 250KB i Lighthouse score spada ponizej 90',
      'Gdy trzeba zweryfikowac ze deployment nie wprowadzil regresji wydajnosci'
    ],
    worstFor: [
      'Gdy problemem jest bezpieczenstwo lub podatnosci OWASP (to QA Security)',
      'Gdy chcesz audytu jakosci kodu i czytelnosci (to QA Quality)',
      'Gdy nie masz jeszcze zaimplementowanego kodu do zmierzenia (to builderzy pierwsi)'
    ],
    relatedAgents: ['qa_quality', 'qa_security', 'qa_manager'],
    glossary: [
      {term: 'lighthouse', definition: 'Narzedzie Google mierzace performance, accessibility, SEO i best practices strony.'},
      {term: 'lcp', definition: 'Largest Contentful Paint - czas wyrenderowania najwiekszego elementu widocznego w viewport.'},
      {term: 'cls', definition: 'Cumulative Layout Shift - miara stabilnosci layoutu, niska wartosc oznacza brak skakania elementow.'},
      {term: 'k6', definition: 'Narzedzie load testingu pozwalajace symulowac tysiace uzytkownikow pod obciazeniem.'},
      {term: 'flamegraph', definition: 'Wizualizacja profilera CPU pokazujaca ktore funkcje zajmuja ile czasu.'}
    ],
    learningQuote: 'Bez metryk kazda optymalizacja jest zgadywaniem - mierz przed zmiana, mierz po zmianie, i nigdy nie wierz intuicji ze wiesz co jest wolne.',
    realExample: 'Pewnego dnia audytowalem API listy zamowien i zauwazylem p95 latency 2.3s podczas gdy srednia byla 180ms. Okazalo sie ze pojedynczy endpoint robil N+1 query do tabeli produktow - 800 zapytan dla jednego requesta. Dodanie joina zbilo p95 do 140ms i Lighthouse score wrocil z 72 do 94.'
  },
  qa_manager: {
    tagline: 'Sedzia sali sadowej QA - syntetyzuje dwa niezalezne audyty w jedna decyzje GO/NO-GO',
    missionShort: 'Manager QA to orkiestrator warstwy QA i jedyny agent widzacy zarowno raport bezpieczenstwa jak i jakosci. Jego misja: zagregowac findings z QA Security i QA Quality, przyznac wynik 1-10, podjac binarna decyzje wdrozenia i zaplanowac kolejnosc napraw. Uzywa Sonnet bo to praca rozumowania, nie wzorcow.',
    whoIs: 'Manager QA to sedzia na sali sadowej QA: prokurator Security prezentuje dowody zagrozenia, obronca Quality stan kodu, a sedzia wydaje wyrok GO lub NO-GO. Zachowuje sie jak kontroler lotow - nie pilotuje samolotu, ale wydaje cleared to land na podstawie danych z wielu radarow. Wlada tylko dwoma narzedziami: Read i Write.',
    analogy: 'Manager QA jest jak redaktor naczelny - nie pisze artykulow, ale to on decyduje czy wydanie idzie do druku i w jakiej kolejnosci poprawki.',
    howItWorks: [
      {label: 'Agregacja raportow', desc: 'Czyta dwa raporty JSON od QA Security i QA Quality. Laczy findings w jedna spojna liste z oznaczeniem zrodla Q-01 lub Q-02.'},
      {label: 'Kalkulacja wyniku', desc: 'Start od 10.0 i odejmuje: -3.0 za kazde CRITICAL, -1.0 za HIGH, -0.5 za MEDIUM, -0.1 za LOW. Sprawdza warunki blokujace jak coverage <70% lub jakikolwiek CRITICAL.'},
      {label: 'Planowanie napraw', desc: 'Okresla optymalna kolejnosc napraw z uwzglednieniem zaleznosci. Laczy powiazane findings aby zredukowac liczbe iteracji naprawczych.'},
      {label: 'Decyzja GO/NO-GO', desc: 'Wynik >=6.0 bez blokerow to GO, ponizej to NO-GO. Pisze uzasadnienie i przekazuje Orkiestratorowi. Max 2 iteracje potem eskalacja.'}
    ],
    inputs: [
      'Raport JSON od QA Security z findings bezpieczenstwa',
      'Raport JSON od QA Quality z findings jakosci i coverage',
      'Progi decyzyjne projektu (minimum coverage, blocking conditions)',
      'Historia poprzednich iteracji (aby wykryc regresje)'
    ],
    outputs: [
      'Raport syntezy JSON z decyzja GO lub NO-GO',
      'Wynik liczbowy 1-10 z uzasadnieniem kalkulacji',
      'Lista fix_order z priorytetami i zaleznosciami',
      'Estymacja effortu naprawczego per finding',
      'Komunikacja ryzyka do Orkiestratora w 30 sekund'
    ],
    does: [
      'Agreguje findings z dwoch niezaleznych audytorow Security i Quality',
      'Priorytezuje findings wedlug hierarchii CRITICAL > HIGH > MEDIUM > LOW',
      'Kalkuluje wynik 1-10 wedlug jasnego wzoru odejmowania punktow za severity',
      'Sprawdza warunki blokujace automatycznego NO-GO (CRITICAL, coverage <70%)',
      'Planuje optymalna kolejnosc napraw z uwzglednieniem zaleznosci miedzy findings',
      'Wydaje binarna decyzje GO/NO-GO z pelnym uzasadnieniem',
      'Kontroluje proces iteracyjny maksymalnie 2 iteracje potem eskalacja',
      'Komunikuje ryzyko do Orkiestratora w formacie actionable bez zargonu'
    ],
    doesNotDo: [
      'Nie audytuje kodu bezposrednio - czyta WYLACZNIE raporty od Q-01 i Q-02',
      'Nie otwiera plikow zrodlowych i nie uruchamia testow (brak Grep, Glob, Bash)',
      'Nie naprawia znalezien - decyduje, Koder implementuje',
      'Nie komunikuje sie bezposrednio z Q-01 lub Q-02 - tylko czyta ich raporty',
      'Nie podejmuje decyzji architektonicznych - to odpowiedzialnosc Orkiestratora',
      'Nie przeprowadza skanowan - on jest decydentem, nie wykonawca',
      'Nie przebija maksymalnej liczby iteracji - po 2 cyklach eskaluje do Orkiestratora'
    ],
    antiPatterns: [
      'Rubber Stamp - automatyczne GO bez rzeczywistej syntezy, gdy Manager tylko odhacza bez czytania',
      'Gate Dodging - unikanie trudnej decyzji NO-GO aby nie spowolnic pipeline, wypuszczanie wadliwego kodu',
      'Consensus by Fatigue - akceptacja po kilku iteracjach ze zmeczenia zamiast po rzeczywistej naprawie',
      'Late Discovery - odkrycie blocker dopiero w finalnej iteracji bo nie sprawdzono warunkow na wejsciu',
      'Analyst Drift - zaczyna sam analizowac kod zamiast syntetyzowac raporty co neguje caly model'
    ],
    keyConcepts: [
      {term: 'Quality gate', def: 'Bramka decyzyjna przed wdrozeniem, ktora wydaje binarna decyzje GO lub NO-GO dla artefaktu.'},
      {term: 'Severity scoring', def: 'Formula kalkulacji wyniku 10.0 minus 3 za CRITICAL, 1 za HIGH, 0.5 za MEDIUM, 0.1 za LOW.'},
      {term: 'Blocking conditions', def: 'Warunki wymuszajace NO-GO niezaleznie od wyniku: CRITICAL, coverage <70%, niezalatane podatnosci.'},
      {term: 'Fix dependencies', def: 'Zaleznosci miedzy findings - niektore naprawy musza poczekac na inne, manager planuje kolejnosc.'},
      {term: 'Iteration control', def: 'Limit maksymalnie 2 iteracji naprawczych, potem eskalacja aby uniknac nieskonczonej petli.'}
    ],
    stats: [
      {label: 'Prog GO', value: '>=6.0'},
      {label: 'Max iteracje', value: '2'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy potrzebujesz jednego punktu decyzyjnego laczacego bezpieczenstwo i jakosc',
      'Gdy chcesz formalnej bramki QA przed wdrozeniem z jasnym wynikiem i uzasadnieniem',
      'Gdy pracujesz z pipeline multi-audytor i potrzebujesz syntezy sprzecznych raportow'
    ],
    worstFor: [
      'Gdy potrzebujesz audytu kodu (on syntetyzuje, nie analizuje zrodla)',
      'Gdy chcesz szybkiej nieformalnej oceny bez hierarchii audytorow',
      'Gdy pipeline ma tylko jednego audytora (Manager QA zaklada dwa raporty)'
    ],
    relatedAgents: ['qa_security', 'qa_quality', 'qa_perf'],
    glossary: [
      {term: 'go/no-go', definition: 'Binarna decyzja o wdrozeniu artefaktu - GO oznacza zatwierdzenie, NO-GO blokade i naprawy.'},
      {term: 'synteza', definition: 'Proces laczenia wynikow z roznych zrodel w jedna spojna ocene lub decyzje.'},
      {term: 'deployment gate', definition: 'Bramka decyzyjna w pipeline CI/CD, przez ktora artefakt musi przejsc przed produkcja.'},
      {term: 'blocking condition', definition: 'Warunek wymuszajacy automatyczne NO-GO niezaleznie od innych wynikow jakosciowych.'},
      {term: 'fix order', definition: 'Zaplanowana kolejnosc napraw uwzgledniajaca zaleznosci i priorytety znalezien.'}
    ],
    learningQuote: 'Sedzia nie prowadzi sledztwa i nie pisze aktu oskarzenia - wydaje wyrok na podstawie dowodow dostarczonych przez strony.',
    realExample: 'Pewnego razu dostalem dwa raporty: Security znalazl 1 CRITICAL XSS i 2 HIGH, Quality znalazl 1 HIGH brak walidacji i 3 MEDIUM. Kalkulacja: 10.0 -3 -2 -1 -1.5 -0.5 = 2.0. Plus warunek blokujacy CRITICAL = automatyczny NO-GO. Zaplanowalem fix_order: najpierw XSS, potem hardcoded key, potem walidacja zalezna od refaktoryzacji XSS. Druga iteracja - wynik 8.5, GO.'
  },
  expert_pragmatist: {
    tagline: 'Realista od wysylki - ile to kosztuje, kto to zrobi i czy zdazymy do piatku',
    missionShort: 'Ekspert Pragmatyk jest glosem rzeczywistosci operacyjnej w debacie Five Minds - jego misja to sprowadzenie ambitnych pomyslow do realiow budzetu, zespolu, deadlinu i zdolnosci wykonawczej. Broni pragmatycznej perspektywy kompromisow i trade-offow, pyta kto to zbuduje i kiedy. Dziala w fazie debate1 protokolu.',
    whoIs: 'Pragmatyk to skrzyzowanie kierownika budowy z doswiadczonym CTO - widzial juz dziesiec razy jak piekne plany rozbijaja sie o realia zespolu i kalendarza. W debacie gra role mostu miedzy wizja a produkcja: kiedy Innowator mowi 10x lepiej, Pragmatyk pyta czy mamy 2x wiecej czasu i 5x wiecej budzetu.',
    analogy: 'Ekspert Pragmatyk to cieszla na placu budowy luksusowych willi - widzial juz wszystkie architektonicze fantazje i wie ktorej drewno wytrzyma zime a ktorej zawali sie w marcu.',
    howItWorks: [
      {label: 'Opening - audyt zasobow', desc: 'Otwiera runde inwentaryzacja - ile osobo-tygodni mamy, jakie skille w zespole, jaki budzet infrastrukturalny, co juz jest na tapecie. Realia przed ambicjami.'},
      {label: 'Defense - MVP i trade-off', desc: 'Broni propozycji przez najmniejszy sensowny zakres ktory dowiedzie wartosci. Liczba total cost of ownership - koszt build, run, maintain na 3 lata.'},
      {label: 'Cross-exam - kto zrobi i kiedy', desc: 'Atakuje propozycje innych pytaniem imienne kto to zbuduje, w jakim sprincie, jaka jest sciezka krytyczna. Wyprowadza ukryte zalozenia o zasobach.'},
      {label: 'Closing - realistyczny plan', desc: 'Zamyka glosem za rozwiazaniem ktore ma jasny owner, timeline, budzet i exit criteria. Odrzuca opcje bez przyjacielskiego terminu dostawy.'}
    ],
    inputs: [
      'Pytanie debaty (np. czy zbudowac wlasne ML pipeline czy uzyc SaaS)',
      'Propozycje pozostalych ekspertow z rundy pierwszej',
      'Zasoby zespolu - liczba inzynierow, skille, obciazenie kalendarzy',
      'Budzet projektu i deadline dostawy'
    ],
    outputs: [
      'Ustrukturyzowane stanowisko z explicitnym kosztem i timeline',
      'Trzy argumenty oparte na trade-offach time vs cost vs scope',
      'Liczenie total cost of ownership na 3-letni horyzont',
      'Lista zalozen o zasobach ktorych pozostali eksperci nie policzyli',
      'Koncowy glos za Gold Solution z jawnym owner, timeline i exit criteria'
    ],
    does: [
      'Liczy realny koszt build + run + maintain dla kazdej propozycji',
      'Identyfikuje najkrotsza sciezke do dowiedzenia wartosci - MVP logika',
      'Wyprowadza trade-offy time vs scope vs quality jawnie na stol',
      'Pyta imiennie kto to zbuduje i czy ma wolne rece',
      'Przypomina o koszcie odrzuconej alternatywy (opportunity cost)',
      'Mierzy zlozonosc zmiany liczba zespolow i systemow dotknietych',
      'Uzywa planning poker i story point heuristics dla realistycznych estymacji',
      'Preferuje odwracalne decyzje nad nieodwracalne przy podobnej wartosci'
    ],
    doesNotDo: [
      'Nie gloryfikuje wizji bez planu - to robota Innowatora bez kontroli',
      'Nie zadaje dowodow statystycznych - to robota Analityka',
      'Nie broni uzytkownika koncowego - to robota Rzecznika',
      'Nie atakuje kazdej tezy - to robota Devila',
      'Nie pisze kodu ani specyfikacji technicznej',
      'Nie akceptuje planu bez wlasciciela i terminu',
      'Nie mylu opportunity cost z direct cost'
    ],
    antiPatterns: [
      'Status Quo Worship - odrzucanie kazdej zmiany jako za drogiej tylko dlatego ze nowa',
      'Scope Creep Denial - nieuznawanie ukrytego rozszerzenia zakresu w propozycji',
      'Hero Assumptions - planowanie w oparciu o to ze kazdy inzynier bedzie najlepszy',
      'MVP Abuse - okreslanie MVP tak waskim ze nie dowodzi niczego wartosciowego',
      'Deadline Theater - akceptowanie narzuconego terminu bez kontr-propozycji realnego planu'
    ],
    keyConcepts: [
      {term: 'MVP', def: 'Minimum Viable Product - najmniejszy zakres ktory pozwala zweryfikowac kluczowa hipoteze produktowa.'},
      {term: 'Total cost of ownership', def: 'Pelen koszt rozwiazania na calym cyklu zycia wliczajac build, run, maintain, migrate.'},
      {term: 'Opportunity cost', def: 'Utracona wartosc najlepszej alternatywy ktora odrzuca sie wybierajac dana opcje.'},
      {term: 'Critical path', def: 'Sekwencja zadaс ktorej dlugosc okresla minimalny czas ukoсczenia calego projektu.'},
      {term: 'Two way door', def: 'Decyzja latwo odwracalna - wymagajaca mniejszej ostroznosci niz decyzja jednokierunkowa.'}
    ],
    stats: [
      {label: 'Rundy debaty', value: '3 rundy'},
      {label: 'Argumentow', value: '10-14 na debate'},
      {label: 'Load', value: '85/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'Gdy debata ulatuje w abstrakcji a potrzebujesz sprowadzenia jej na ziemie',
      'Gdy projekt ma ostry deadline i wymagana jest brutalna priorytetyzacja',
      'Gdy budzet jest ograniczony i kazdy tydzieс ma imienna wartosc'
    ],
    worstFor: [
      'Gdy zespol potrzebuje przelomu a nie optymalizacji w obecnych ramach',
      'Gdy projekt jest moonshotem ktory wymaga tolerancji dla ryzyka',
      'Gdy innowacja jest strategicznie krytyczna i zwyczajne TCO jest bez znaczenia'
    ],
    relatedAgents: ['planner', 'expert_innovator', 'synthesizer'],
    glossary: [
      {term: 'velocity', definition: 'Srednia iloscic story pointow jakie zespol dostarcza w sprincie - baza do realistycznych estymacji.'},
      {term: 'technical debt', definition: 'Ukryty koszt przyszly decyzji o szybkim ale niedoskonalym rozwiazaniu zaciagniete jako kredyt.'},
      {term: 'build vs buy', definition: 'Dylemat miedzy budowa wlasnego rozwiazania a zakupem gotowego produktu z rynku.'},
      {term: 'burn rate', definition: 'Tempo wydawania srodkow finansowych przez zespol lub projekt mierzone zwykle miesiecznie.'},
      {term: 'runway', definition: 'Liczba miesiecy ktore projekt lub firma moze dzialac przy obecnym burn rate zanim skoсcza sie srodki.'}
    ],
    learningQuote: 'Pieknay plan bez wlasciciela i terminu to tylko kosztowne zyczenie - moja robota to zapytac kto, kiedy i za ile zanim zespol sie zakocha w wizji.',
    realExample: 'Pewnego razu debata dotyczyla migracji z monolitu na mikroserwisy dla poprawy skalowania. Cztery umysly chwalily architekturalna czystosc. Policzylem total cost of ownership - 18 osobo-miesiecy build, 40 procent wzrost infra cost, 6 miesiecy spadek velocity w transition. Wskazalem opcje modular monolith ktora daje 80 procent korzysci za 20 procent kosztu. Zespol zaoszczedzil 14 osobo-miesiecy i dowiozl release na czas.'
  },
  expert_innovator: {
    tagline: 'Wizjoner od pierwszych zasad - pyta co gdyby zrobic na odwrot i rozbija konwencje',
    missionShort: 'Ekspert Innowator jest moonshot advocate w debacie Five Minds - jego misja to zmuszenie pozostalych umyslow do zakwestionowania obecnego rozwiazania od fundamentow. Pyta dlaczego to w ogole istnieje, co by bylo gdyby rozwiazac problem inaczej, i gdzie sa 10x szanse ktorych nikt jeszcze nie zauwazyl. Dziala w fazie debate1 protokolu.',
    whoIs: 'Innowator to Elon Musk stereotypu skrzyzowany z fizykiem-teoretykiem - zawsze zaczyna od pierwszych zasad, odrzuca argumenty tak-sie-robi i szuka nieoczywistych analogii z innych domen. W debacie gra rolg rozmrazacza mysli: kiedy pozostali czterej zgadzaja sie zbyt szybko, on rzuca prowokacje ktora rozbija konsensus i wymusza powrot do rysownicy.',
    analogy: 'Ekspert Innowator to fizyk-teoretyk na warsztacie stolarskim - zadna deska go nie interesuje dopoki ktos mu nie wyjasni dlaczego w ogole budujemy krzeslo a nie dlon pneumatyczna.',
    howItWorks: [
      {label: 'Opening - kwestionowanie', desc: 'Otwiera runde pytaniem od pierwszych zasad: dlaczego w ogole rozwiazujemy ten problem w ten sposob? Szuka ukrytych zalozen ktore wszyscy traktuja jako oczywiste.'},
      {label: 'Defense - analogie z innych domen', desc: 'Broni swojej propozycji przez cross-pollination: jak podobny problem rozwiazano w biologii, fizyce, branzy muzycznej, lotnictwie. Laduje kontekst spoza dziedziny.'},
      {label: 'Cross-exam - stress test status quo', desc: 'Podczas debaty ataktuje konwencjonalne rozwiazania pytaniem co gdyby bylo odwrotnie i zadaje pozostalym policzenie alternatywy o ktorej nie pomysleli.'},
      {label: 'Closing - 10x lub 0x', desc: 'Zamyka wlasne stanowisko glosem za rozwiazaniem 10x lepszym albo rezygnacja z problemu w ogole. Nie akceptuje poprawek o 10 procent jako innowacji.'}
    ],
    inputs: [
      'Pytanie debaty (np. jak skalowac aplikacje do 1M uzytkownikow)',
      'Opinie pozostalych czterech ekspertow z rundy pierwszej',
      'Historia poprzednich rund debaty (argumenty i kontrargumenty)',
      'Constrainty projektu z fazy strategii - tylko jako punkt wyjscia do podwazenia'
    ],
    outputs: [
      'Ustrukturyzowane stanowisko z jedna smiala teza kontrariariska',
      'Trzy kluczowe argumenty oparte na pierwszych zasadach i analogiach',
      'Lista ukrytych zalozen ktore reszta ekspertow wziela za pewnik',
      'Minimum jedna propozycja 10x poprawy albo rewriting problemu od nowa',
      'Koncowy glos za Gold Solution z uzasadnieniem dlaczego nie status quo'
    ],
    does: [
      'Zadaje pytania od pierwszych zasad, nie od best practice',
      'Wprowadza analogie z odleglych domen do stress-testowania pomyslow',
      'Identyfikuje ukryte zalozenia pozostalych ekspertow i nazywa je wprost',
      'Proponuje rozwiazania kontrariariskie nawet jesli wydaja sie absurdalne',
      'Mierzy ambicja propozycji skala 1x vs 10x vs 100x',
      'Prowokuje Devil\u0027s Advocate do bronienia status quo aby pokazac jak slabe jest',
      'Szuka szans typu blue ocean tam gdzie wszyscy widza tylko czerwony',
      'Fowardzi szalone pomysly do fazy syntezy zamiast samemu je odrzucac'
    ],
    doesNotDo: [
      'Nie akceptuje incremental improvement jako innowacji - to robota Pragmatyka',
      'Nie domaga sie dowodow empirycznych - to robota Analityka',
      'Nie broni konkretnego uzytkownika - to robota Rzecznika Uzytkownika',
      'Nie atakuje kazdej tezy mechanicznie - to robota Devila',
      'Nie pisze kodu ani planow implementacji - to robota Buildera',
      'Nie mediuje miedzy stanowiskami - to robota Syntetyka',
      'Nie przestaje prowokowac dopoki konsensus nie zostal naprawde sprawdzony'
    ],
    antiPatterns: [
      'Shiny Object Syndrome - gonienie za nowa technologia bez sprawdzenia czy rozwiazuje rzeczywisty problem',
      'Not Invented Here - odrzucanie sprawdzonych rozwiazan tylko dlatego ze nie sa nowe',
      'Moonshot Paralysis - proponowanie pomyslow tak ambitnych ze debata wpadnie w impas',
      'Analogy Overreach - wyciaganie falszywych wnioskow z odleglej analogii bo brzmi ladnie',
      'Incrementalism Contempt - pogardzanie drobnymi usprawnieniami ktore daja realny zysk'
    ],
    keyConcepts: [
      {term: 'First principles', def: 'Rozklad problemu na fundamenty fizyczne lub ekonomiczne zamiast opierania sie na analogiach.'},
      {term: 'Adjacent possible', def: 'Przestrzen rozwiazan dostepnych gdy polacza sie istniejace klocki w nowy sposob.'},
      {term: 'Moonshot', def: 'Propozycja z 10x ambicja i niskim prawdopodobieсstwem ale ogromnym wyplata.'},
      {term: 'Cross-pollination', def: 'Transfer rozwiazania z jednej dziedziny do drugiej poprzez analogie strukturalna.'},
      {term: 'Strong opinions loosely held', def: 'Mocne tezy przedstawiane z przekonaniem ale gotowe do porzucenia wobec lepszego argumentu.'}
    ],
    stats: [
      {label: 'Rundy debaty', value: '3 rundy'},
      {label: 'Argumentow', value: '8-12 na debate'},
      {label: 'Load', value: '85/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'Gdy zespol utknal w lokalnym optimum i potrzebuje rozmrozenia mysli',
      'Gdy problem wyglada na rozwiazany ale czujesz ze cos wazniejszego pomijasz',
      'Gdy projekt wymaga przelomu 10x a nie kolejnych 10 procent optymalizacji'
    ],
    worstFor: [
      'Gdy deadline to jutro i potrzebujesz wdrozenia sprawdzonego rozwiazania',
      'Gdy problem jest calkowicie rutynowy i innowacja to overkill',
      'Gdy zespol jest juz w paralizie analitycznej a nie w fazie generowania'
    ],
    relatedAgents: ['expert_devil', 'expert_pragmatist', 'synthesizer'],
    glossary: [
      {term: 'steel man', definition: 'Technika argumentacji polegajaca na wzmocnieniu tezy przeciwnika przed jej atakowaniem.'},
      {term: 'blue ocean', definition: 'Nowa przestrzeс rynkowa bez konkurencji uzyskana przez redefinicje problemu.'},
      {term: 'second order thinking', definition: 'Przemyslenie konsekwencji konsekwencji a nie tylko bezposredniego skutku decyzji.'},
      {term: 'inversion', definition: 'Rozwiazywanie problemu przez zapytanie jak spowodowac porazke zamiast jak osiagnac sukces.'},
      {term: 'premise busting', definition: 'Aktywne kwestionowanie zalozen ktore reszta uczestnikow przyjela bez sprawdzenia.'}
    ],
    learningQuote: 'Najwazniejsze pytanie w debacie to nie jak lepiej zrobic to co robimy, tylko dlaczego w ogole to robimy - jak odpowiedz brzmi bo zawsze tak robilismy, to znalazlem zlota zyle.',
    realExample: 'Pewnego razu debata dotyczyla skalowania kolejki zadaс do 10 mln wiadomosci dziennie. Cztery umysly dyskutowaly o Kafka vs Pulsar vs RabbitMQ. Zadaлem pytanie od pierwszej zasady - dlaczego w ogole mamy kolejke, skoro 90 procent zadaс mozna policzyc na brzegu przy uzytkowniku. Debata przeniosla sie z wyboru brokera na architekture edge computing i rozwiazanie okazalo sie 10x taсsze.'
  },
  expert_analyst: {
    tagline: 'Empiryk z kalkulatorem - gdzie sa dane, base rates i dowody, a nie opinie',
    missionShort: 'Ekspert Analityk Danych jest glosem empiryzmu w debacie Five Minds - jego misja to zmuszenie dyskusji do oparcia kazdej tezy na liczbach, benchmarkach i historycznych base rates. Broni perspektywy opartej na danych, atakuje argumenty intuicyjne i wymaga confidence intervals przy kazdej predykcji. Dziala w fazie debate1 protokolu.',
    whoIs: 'Analityk to skrzyzowanie statystyka Bayesian z detektywem-sledczym - nie wierzy w opowiesci, wierzy w liczby i ich rozklady. W debacie gra rolge audytora epistemologicznego: kiedy ktos rzuca teze brzmi przekonujaco, Analityk pyta na jakich danych, z jaka proba, z jaka niepewnoscia i czy juz gdzies ta hipoteza byla testowana.',
    analogy: 'Ekspert Analityk Danych to sedzia sledczy z XIX wieku w laboratorium Bayesa - kazde slowo swiadka musi miec pokrycie w liczbach a kazda pewnosc musi byc zwazona prawdopodobieсstwem a priori.',
    howItWorks: [
      {label: 'Opening - stan danych', desc: 'Otwiera runde inwentaryzacja tego co juz wiemy - jakie sa historyczne base rates, benchmarki branzowe, publikowane wyniki A/B testow. Bez danych brak tezy.'},
      {label: 'Defense - intervals zamiast punktow', desc: 'Broni swoich rekomendacji przedstawiajac rozklady a nie pojedyncze liczby. Zamiast 100ms podaje 80-120ms p50 i 180-220ms p95 z zrodlem.'},
      {label: 'Cross-exam - falsyfikacja', desc: 'Atakuje tezy innych pytaniem jaki dowod by cie przekonal ze jestes w bledzie. Jesli ktos nie umie odpowiedziec, oznacza teze jako nieweryfikowalna.'},
      {label: 'Closing - decision under uncertainty', desc: 'Zamyka glosem za rozwiazaniem o najwyzszym expected value przy znanej niepewnosci. Explicit rozroznia co wiemy, co zgadujemy i co trzeba jeszcze zmierzyc.'}
    ],
    inputs: [
      'Pytanie debaty (np. ktory framework wybrac do nowego projektu)',
      'Raporty researcherow z benchmarkami, liczbami i zrodlami',
      'Opinie pozostalych ekspertow z runda pierwsza - do zadania o dane',
      'Historyczne dane z poprzednich projektow jesli dostepne'
    ],
    outputs: [
      'Ustrukturyzowane stanowisko z tezami zwiazanymi z konkretnymi liczbami',
      'Trzy argumenty kazdy z minimum jednym benchmarkiem lub base rate',
      'Lista zalozen nieudowodnionych oznaczonych jako ryzyka epistemiczne',
      'Confidence label per teza - CERTAIN / PROBABLE / SPECULATION',
      'Koncowy glos za Gold Solution z wyliczeniem expected value pod niepewnoscia'
    ],
    does: [
      'Wymaga zrodla i liczby za kazda teza przedstawiona w debacie',
      'Szuka base rates i rozkladow zamiast pojedynczych anegdot',
      'Kwantyfikuje niepewnosc poprzez confidence intervals i error bars',
      'Identyfikuje biasy poznawcze w rozumowaniu pozostalych ekspertow',
      'Porownuje predykcje do historycznych benchmarkow',
      'Oznacza tezy jako weryfikowalne lub niefalsyfikowalne',
      'Liczy expected value alternatyw pod ryzykiem i niepewnoscia',
      'Wymaga pre-registered hypothesis zamiast p-hackingu post-hoc'
    ],
    doesNotDo: [
      'Nie broni pomyslow pieknych ale bez dowodow - to robota Innowatora',
      'Nie broni uzytkownika jako priorytetu - to robota Rzecznika',
      'Nie atakuje kazdej tezy mechanicznie - to robota Devila',
      'Nie ocenia wykonalnosci budzetowej - to robota Pragmatyka',
      'Nie produkuje planow implementacyjnych ani kodu',
      'Nie akceptuje tez niefalsyfikowanych jako argumentow',
      'Nie kompresuje niepewnosci do pojedynczej liczby jesli nie ma dowodu'
    ],
    antiPatterns: [
      'Analysis Paralysis - wymaganie coraz wiekszej ilosci danych az decyzja nigdy nie zapadnie',
      'P-Hacking - wybieranie tylko tych statystyk ktore pasuja do preferowanej tezy',
      'Scientism - traktowanie kazdej liczby jako prawdy tylko dlatego ze jest liczba',
      'Base Rate Neglect - ignorowanie historycznych rozkladow przy ocenie unikalnego przypadku',
      'False Precision - podawanie 97.3 procent gdy rzeczywista niepewnosc to 60-95 procent'
    ],
    keyConcepts: [
      {term: 'Base rate', def: 'Historyczna czestosc zdarzenia w populacji stanowiaca punkt odniesienia dla predykcji unikalnego przypadku.'},
      {term: 'Confidence interval', def: 'Zakres wartosci w ktorym z okreslona pewnoscia znajduje sie rzeczywisty parametr.'},
      {term: 'Falsifiability', def: 'Warunek naukowej tezy - musi istniec mozliwy dowod ktory by ja obalil.'},
      {term: 'Bayesian update', def: 'Aktualizacja przekonaс na podstawie nowego dowodu wazaca go przeciwko prior a priori.'},
      {term: 'Expected value', def: 'Srednia wazona wyplat alternatyw z uwzglednieniem prawdopodobieсstw kazdego scenariusza.'}
    ],
    stats: [
      {label: 'Rundy debaty', value: '3 rundy'},
      {label: 'Argumentow', value: '10-14 na debate'},
      {label: 'Load', value: '85/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'Gdy decyzja ma wysoki koszt i dostepne sa historyczne dane do porownaсnia',
      'Gdy debata osуnie w stronge opinii i trzeba ja zakotwiczyc w liczbach',
      'Gdy trzeba wybrac miedzy dwiema podobnymi opcjami i rozstrzyga niuans statystyczny'
    ],
    worstFor: [
      'Gdy problem jest calkowicie nowy i nie istnieja base rates ani benchmarki',
      'Gdy decyzja musi zapasc w 10 minut a analiza wymaga 10 godzin',
      'Gdy najwazniejsza jest wizja przyszlosci a nie ekstrapolacja z przeszlosci'
    ],
    relatedAgents: ['statistician', 'eda_analyst', 'synthesizer'],
    glossary: [
      {term: 'prior', definition: 'Poczatkowe przekonanie o prawdopodobieсstwie hipotezy przed zobaczeniem nowych danych.'},
      {term: 'posterior', definition: 'Zaktualizowane przekonanie po polaczeniu priora z dowodem przez twierdzenie Bayesa.'},
      {term: 'effect size', definition: 'Wielkosc efektu niezalezna od wielkosci proby wskazujaca czy roznica ma znaczenie praktyczne.'},
      {term: 'p-value', definition: 'Prawdopodobieсstwo zaobserwowania wyniku co najmniej tak ekstremalnego przy prawdziwej hipotezie zerowej.'},
      {term: 'confirmation bias', definition: 'Tendencja do szukania dowodow wspierajacych istniejaca teze i ignorowania kontr-dowodow.'}
    ],
    learningQuote: 'Opinia bez liczby to tylko dobrze ubrana intuicja - pokaz mi base rate a powiem ci czy twoja smiala teza jest odwazna czy nieostrozna.',
    realExample: 'Pewnego razu debata dotyczyla przepisania backendu z Node na Go dla poprawy performance. Cztery umysly podawaly anegdoty o 5x szybszym Go. Zadaлem bazowe pytanie - jaka jest historyczna czestosc sukcesu rewrite projektow o podobnej skali. Base rate wyniosl 12 procent. Z taka znajomoscia zespol wybral profilowanie Node a nie rewrite i zaoszczedzil 9 miesiecy.'
  },