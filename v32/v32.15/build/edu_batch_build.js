// Batch: build (backend, designer, writer, integrator)
  backend: {
    tagline: 'Muzyk sesyjny kodu - zamienia specyfikacje w dzialajace oprogramowanie bez improwizacji',
    missionShort: 'Backend Dev to pierwszy agent warstwy BUILD, ktory materializuje plany w dzialajacy kod. Jego misja to implementacja API, schematow danych, walidacji i logiki biznesowej zgodnie ze specyfikacja. Nie projektuje, nie bada - wykonuje z chirurgiczna precyzja.',
    whoIs: 'Backend Dev zachowuje sie jak mistrz stolarz albo rezydent chirurgiczny - dostaje precyzyjny projekt od Planera i realizuje go bez kwestionowania strategii. To agent, w ktorym plany przestaja byc dokumentami i staja sie oprogramowaniem, ktore mozna uruchomic.',
    analogy: 'Backend Dev jest jak rezydent chirurgiczny, ktory realizuje plan operacji z precyzja - nie zmienia strategii, tylko wykonuje ja bezblednie krok po kroku.',
    howItWorks: [
      {label: 'Czytanie specyfikacji', desc: 'Wczytuje specyfikacje od Planera i MANIFEST.md. Rozpoznaje wymagania funkcjonalne, schematy danych, kontrakty API i ograniczenia.'},
      {label: 'Pisanie kodu', desc: 'Tworzy nowe pliki (Write) i modyfikuje istniejace (Edit) implementujac endpointy, walidacje i logike biznesowa zgodnie z wzorcem mistrza stolarza.'},
      {label: 'Uruchomienie i test', desc: 'Odpala kod przez Bash (node, python, npm run build), weryfikuje brak bledow i sprawdza podstawowa funkcjonalnosc oraz edge cases.'},
      {label: 'Petla z QA', desc: 'Ma maksymalnie dwie iteracje na poprawki po raporcie QA. Po drugiej iteracji bledy eskaluja do Orkiestratora.'}
    ],
    inputs: [
      'Specyfikacja techniczna od Planera lub Orkiestratora',
      'Design tokeny i komponenty od Designera',
      'MANIFEST.md z wymaganiami i kontraktami',
      'Raport bledow od QA w petli zwrotnej'
    ],
    outputs: [
      'Dzialajace pliki zrodlowe backend (JS, Python, Go)',
      'Endpointy API z walidacja wejscia i wyjscia',
      'Schematy danych i migracje bazy',
      'Inline komentarze JSDoc dla funkcji publicznych',
      'Logi z uruchomienia i testow podstawowych'
    ],
    does: [
      'Implementuje endpointy REST i logike biznesowa zgodnie ze specyfikacja',
      'Tworzy schematy walidacji wejscia uzywajac Zod, Pydantic lub Joi',
      'Uruchamia kod przez Bash weryfikujac brak bledow runtime',
      'Pisze obsluge bledow z konkretnymi kodami HTTP i strukturalnymi odpowiedziami',
      'Dodaje komentarze inline dla zlozonej logiki i publicznego API',
      'Modyfikuje istniejace pliki precyzyjnie narzedziem Edit zamiast nadpisywania',
      'Odczytuje kontekst projektu (Read) by uzyc istniejacych wzorcow',
      'Itera na poprawki QA maksymalnie dwa razy zanim eskaluje problem'
    ],
    doesNotDo: [
      'Nie robi researchu technologii (to domena Researcher Tech)',
      'Nie podejmuje decyzji architektonicznych (to domena Planera)',
      'Nie projektuje UI ani CSS (to domena Designera)',
      'Nie pisze README ani dokumentacji zewnetrznej (to domena Redaktora)',
      'Nie laczy pracy innych builderow (to domena Integratora)',
      'Nie robi audytow bezpieczenstwa ani pentestow (to domena QA Security)',
      'Nie improwizuje i nie kwestionuje specyfikacji - implementuje'
    ],
    antiPatterns: [
      'Premature Optimization - optymalizacja nieistniejacego waskiego gardla zamiast prostej implementacji zgodnej ze specyfikacja.',
      'Stringly Typed API - przekazywanie wszystkiego jako stringi zamiast typow, enumow i strukturalnych obiektow.',
      'Naked Response - zwracanie surowego wyniku bez wrappera, statusu, wersji i obslugi bledow.',
      'Scope Creep - pisanie kodu spoza specyfikacji, dodawanie fajnych ficzerow, ktorych nikt nie zamawial.',
      'Silent Failure - lapanie wyjatkow bez logowania i bez propagacji bledu do warstwy API.'
    ],
    keyConcepts: [
      {term: 'Specyfikacja jako partytura', def: 'Backend Dev gra dokladnie to co zapisane - nie improwizuje jak kompozytor, tylko wykonuje jak muzyk sesyjny.'},
      {term: 'Petla QA', def: 'Maksymalnie dwie iteracje poprawek po audycie, potem eskalacja do Orkiestratora z raportem bledow.'},
      {term: 'Inline docs', def: 'Komentarze tylko dla nietrywialnej logiki i publicznego API, nigdy dla oczywistych instrukcji.'},
      {term: 'Idempotentnosc', def: 'Endpointy typu PUT i DELETE musza dac ten sam rezultat niezaleznie od liczby wywolan.'},
      {term: 'Separation of concerns', def: 'Routing, walidacja, logika biznesowa i warstwa danych sa rozdzielone i testowane niezaleznie.'}
    ],
    stats: [
      {label: 'Input tokens', value: '20-40k'},
      {label: 'Output tokens', value: '10-30k'},
      {label: 'Load', value: '75/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy masz gotowa specyfikacje i potrzebujesz dzialajacego kodu backend',
      'Gdy chcesz implementacje API zgodna z kontraktem bez improwizacji',
      'Gdy potrzebujesz walidacji, obslugi bledow i inline dokumentacji w kodzie'
    ],
    worstFor: [
      'Gdy jeszcze nie wiesz jaka technologie wybrac (skorzystaj z Researcher Tech)',
      'Gdy potrzebujesz decyzji architektonicznych (poproc Planera lub Analityka)',
      'Gdy chcesz piekny CSS i animacje (to Designer, nie Backend Dev)'
    ],
    relatedAgents: ['db_architect', 'integrator', 'qa_quality'],
    glossary: [
      {term: 'endpoint', definition: 'Adres API obslugujacy konkretna operacje, np POST /api/users do tworzenia uzytkownika.'},
      {term: 'walidacja', definition: 'Sprawdzenie ksztaltu i typu danych wejsciowych przed przekazaniem ich do logiki biznesowej.'},
      {term: 'migracja', definition: 'Skrypt zmieniajacy schemat bazy danych w sposob powtarzalny i reversible.'},
      {term: 'lint', definition: 'Automatyczne sprawdzenie stylu kodu i bledow statycznych, np ESLint dla JavaScript.'},
      {term: 'Sonnet', definition: 'Model Claude srodkowej klasy, kompromis miedzy jakoscia kodu a kosztem wywolania.'}
    ],
    learningQuote: 'Backend Dev nie kwestionuje planu - realizuje go z precyzja. Jego wartosc nie lezy w kreatywnosci, lecz w bezbledowym wykonaniu.',
    realExample: 'Pewnego dnia dostalem specyfikacje endpointu POST /api/users z walidacja Zod i obsluga piecu kodow bledu. Zaimplementowalem to w 30 minutach, uruchomilem przez node app.js, zweryfikowalem edge case z pustym emailem i oddalem QA. Pierwsza iteracja - trzy drobne poprawki. Druga iteracja - zero bledow. Kod poszedl do Integratora.'
  },
  designer: {
    tagline: 'Architekt wnetrz aplikacji - zamienia mood boardy w dzialajacy CSS i design tokeny',
    missionShort: 'Designer to agent implementacji wizualnej w warstwie BUILD. Otrzymuje raporty Researcher UX i przeksztalca je w dzialajacy CSS, design tokeny, palety kolorow, typografie i animacje. Jest mostem miedzy inspiracja wizualna a kodem produkcyjnym.',
    whoIs: 'Designer to agent AI, ktory zachowuje sie jak architekt wnetrz albo kolorysta filmowy. Klient przynosi mood board, a Designer wybiera dokladny odcien, dokladna tkanine, dokladna krzywa animacji. Nie szuka inspiracji - implementuje na podstawie badania, ktore zrobil Researcher UX.',
    analogy: 'Designer jest jak zecer w drukarni, ktory nie pisze tresci, ale sprawia ze tekst wyglada profesjonalnie na stronie dzieki wlasciwym fontom, odstepom i rytmowi.',
    howItWorks: [
      {label: 'Lektura raportu UX', desc: 'Wczytuje raport od Researcher UX z trendami, paleta i wymaganiami dostepnosci. Rozpoznaje kierunek estetyczny i ograniczenia.'},
      {label: 'Tokeny trzypoziomowe', desc: 'Buduje trzy poziomy tokenow - primitive (slate-900), semantic (color-text) i component (button-bg). Zmiana poziomu drugiego propaguje sie na caly projekt.'},
      {label: 'System typografii i spacing', desc: 'Definiuje skale fontow, line-height, grid bazowy 4px, layout container i responsywne breakpointy. Implementuje system nie pojedyncze strony.'},
      {label: 'Animacje i a11y', desc: 'Dodaje mikro-interakcje z respektowaniem prefers-reduced-motion, focus-visible 2px i minimalne target 44x44px dla WCAG.'}
    ],
    inputs: [
      'Raport Researcher UX z trendami i mood boardem',
      'Wymagania dostepnosci WCAG 2.1 AA',
      'MANIFEST.md z konstraintami brandu i platformy',
      'Feedback Integratora o konfliktach wizualnych'
    ],
    outputs: [
      'Kompletny design system w pliku tokens.css',
      'Paleta kolorow primitive, semantic i component',
      'System typografii ze skala fontow i interlinii',
      'Utility klasy grid, flex, container i spacing',
      'Animacje z prefers-reduced-motion i focus-visible'
    ],
    does: [
      'Tworzy design tokeny w trzech poziomach (primitive, semantic, component)',
      'Definiuje palete kolorow z tokenami success, error, warning i neutralami',
      'Projektuje skale typografii z responsywnymi rozmiarami',
      'Implementuje spacing scale na bazie gridu 4px (space-1 do space-16)',
      'Pisze mikro-animacje z transition i keyframes dla kart i przyciskow',
      'Zapewnia kontrast minimum 4.5:1 i focus-visible na wszystkich interaktywnych elementach',
      'Dodaje media query prefers-reduced-motion wylaczajace animacje dla wrazliwych',
      'Tworzy utility container, grid-auto i breakpointy dla responsywnosci'
    ],
    doesNotDo: [
      'Nie szuka inspiracji ani trendow (to domena Researcher UX)',
      'Nie pisze logiki JavaScript (to domena Backend Dev i Frontend Dev)',
      'Nie tworzy tresci tekstowych (to domena Redaktora)',
      'Nie laczy CSS z HTML w finalny artefakt (to domena Integratora)',
      'Nie audytuje wizualnej a11y w gotowym produkcie (to domena QA Quality)',
      'Nie rysuje makiet w Figmie - generuje kod CSS',
      'Nie definiuje content copywritingu w tokenach'
    ],
    antiPatterns: [
      'Inconsistent Spacing - mieszanie 12px, 13px, 14px, 15px zamiast trzymania sie gridu 4px lub 8px.',
      'Invisible Errors - komunikat bledu bez ikony, bez koloru i bez kontrastu, ginacy w layoucie.',
      'Hero Section Addiction - traktowanie kazdej strony jak landing page z ogromnym headerem zabierajacym 80 procent ekranu.',
      'Low Contrast Ignored - szary tekst na jasnoszarym tle z kontrastem 2:1 zamiast wymaganego 4.5:1.',
      'Magic Number Hell - wartosci 37px, 129px, 0.618rem w CSS zamiast tokenow semantycznych.'
    ],
    keyConcepts: [
      {term: 'Design tokeny', def: 'Zmienne CSS przechowujace wartosci designu w jednym miejscu - slowniczek kolorow, rozmiarow i odleglosci projektu.'},
      {term: 'Trzy poziomy', def: 'Primitive (blue-500), semantic (color-primary) i component (button-bg) - zmiana w srodkowej warstwie propaguje sie na caly system.'},
      {term: 'Grid 4px', def: 'Wszystkie odstepy to wielokrotnosci 4px co daje wizualna regularnosc i przewidywalnosc rytmu.'},
      {term: 'WCAG AA', def: 'Minimum kontrastu 4.5:1 dla tekstu i target 44x44px dla elementow interaktywnych.'},
      {term: 'Motion safety', def: 'Respektowanie prefers-reduced-motion i skracanie animacji do 0.01ms dla uzytkownikow wrazliwych.'}
    ],
    stats: [
      {label: 'Input tokens', value: '15-30k'},
      {label: 'Output tokens', value: '8-20k'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy potrzebujesz spojny design system w postaci tokenow CSS',
      'Gdy chcesz animacje i mikro-interakcje z respektem dla a11y',
      'Gdy chcesz zmienic cala palete kolorow jedna edycja pliku tokens.css'
    ],
    worstFor: [
      'Gdy jeszcze nie masz badania UX i trendow (poproc Researcher UX)',
      'Gdy potrzebujesz makiet w Figmie zamiast kodu CSS',
      'Gdy chcesz pisanie copywritingu i mikrotekstow (to Redaktor)'
    ],
    relatedAgents: ['res_ux', 'frontend', 'integrator'],
    glossary: [
      {term: 'token', definition: 'Zmienna CSS w :root przechowujaca wartosc designu, np --color-primary: #2563eb.'},
      {term: 'primitive', definition: 'Pierwszy poziom tokenow - surowe wartosci jak blue-500 lezace w izolacji od znaczenia.'},
      {term: 'semantic', definition: 'Drugi poziom tokenow nadajacy znaczenie primitive - np color-primary wskazuje na blue-500.'},
      {term: 'focus visible', definition: 'CSS pseudo-class pokazujaca ramke focus tylko dla klawiatury, nie dla myszki.'},
      {term: 'reduced motion', definition: 'Preferencja systemowa wylaczajaca animacje dla uzytkownikow z epilepsja i vestibular disorders.'}
    ],
    learningQuote: 'Design system to nie kolekcja piekne ekranow - to slownik, ktory pozwala zmienic caly produkt jedna linijka CSS.',
    realExample: 'Pewnego dnia dostalem raport Researcher UX z kierunkiem Slate plus Amber accent i trendem glassmorphism. Zbudowalem trzy poziomy tokenow, skale typografii Inter, spacing 4px grid i animacje kart z respektowaniem prefers-reduced-motion. Zmiana koloru primary z niebieskiego na zielony zajmowala pozniej jedna linijke kodu.'
  },
  writer: {
    tagline: 'Kurator muzealny tekstu - zamienia surowe notatki w dokumenty gotowe do druku',
    missionShort: 'Redaktor to agent jakosci tresci w warstwie BUILD. Otrzymuje surowy tekst od Kodera, Designera lub Integratora i przeksztalca go w finalny, czytelny dokument. Dziala w izolowanym document sandbox bez dostepu do Bash i bez mozliwosci uruchamiania programow.',
    whoIs: 'Redaktor zachowuje sie jak redaktor w wydawnictwie literackim, inzynier dzwieku miksujacy album albo kurator muzealny piszacy etykiety eksponatow. Otrzymuje 50 stron surowej prozy i zamienia je w klarowny tekst, ktory mozna pokazac klientowi.',
    analogy: 'Redaktor jest jak kurator muzealny, ktory z 50-stronicowej publikacji naukowej potrafi wydestylowac etykiete o 50 slowach objasniajaca eksponat kazdemu.',
    howItWorks: [
      {label: 'Lektura surowego tekstu', desc: 'Wczytuje surowe notatki od Kodera, komentarze Designera i raporty Integratora. Identyfikuje bledy gramatyczne, niespojna terminologie i rozwlekle fragmenty.'},
      {label: 'Redakcja i struktura', desc: 'Poprawia gramatyke, ujednolica terminologie, dodaje naglowki, listy i tabele. Usuwa powtorzenia i zapewnia logiczny przeplyw informacji.'},
      {label: 'Komentarze inline', desc: 'Dodaje komentarze do kodu tylko dla nietrywialnej logiki - nigdy dla oczywistych instrukcji jak x = 5. Komentuje TODO, FIXME i publiczne API.'},
      {label: 'README i CHANGELOG', desc: 'Tworzy pliki dokumentacyjne projektu zapewniajace spojny ton, jednolite formatowanie i jasne instrukcje uruchomienia.'}
    ],
    inputs: [
      'Surowy tekst dokumentacji od Kodera lub Integratora',
      'Komentarze inline i docstringi do polerowania',
      'Lista terminow do ujednolicenia w calym projekcie',
      'MANIFEST.md ze standardem stylu i terminologii'
    ],
    outputs: [
      'README.md z opisem projektu i instrukcja uruchomienia',
      'CHANGELOG.md z historia zmian miedzy wersjami',
      'Wypolerowane komentarze inline w kodzie',
      'Decision records dokumentujace wybory architektoniczne',
      'Glosariusz terminow i ujednolicona terminologia'
    ],
    does: [
      'Poprawia gramatyke, ortografie i interpunkcje w dokumentacji',
      'Ujednolica terminologie w calym projekcie (jedno slowo zamiast trzech)',
      'Tworzy README z sekcjami what, why, how, install i usage',
      'Pisze CHANGELOG w formacie Keep a Changelog z wersjami semver',
      'Dodaje komentarze inline TYLKO dla nietrywialnej logiki',
      'Upraszcza zargon techniczny zachowujac precyzje terminow kluczowych',
      'Strukturyzuje dlugie teksty w naglowki, listy i tabele',
      'Produkuje dokumentacje API z opisami parametrow, typow i przykladow uzycia'
    ],
    doesNotDo: [
      'Nie pisze kodu logicznego ani algorytmow (to domena Backend Dev)',
      'Nie projektuje CSS ani layoutu (to domena Designera)',
      'Nie prowadzi researchu ani nie uzywa WebSearch (to domena Researcherow)',
      'Nie integruje komponentow ani nie laczy plikow (to domena Integratora)',
      'Nie uruchamia zadnych programow - nie ma narzedzia Bash',
      'Nie podejmuje decyzji architektonicznych (to domena Planera)',
      'Nie upraszcza do poziomu banalnosci - zachowuje precyzje techniczna'
    ],
    antiPatterns: [
      'Jargon Overload - pisanie synchronous asynchronous iteration with lazy evaluation zamiast dane przetwarzane porcjami.',
      'Passive Voice Addiction - zostalo zaimplementowane zamiast zaimplementowalismy, co maskuje odpowiedzialnosc i wydluza tekst.',
      'Missing Examples - dokumentacja API bez przykladu wywolania i odpowiedzi, wymuszajaca zgadywanie.',
      'Wall of Text - jeden akapit na 500 slow bez naglowkow, list i tabel, ktorego nikt nie przeczyta.',
      'Obvious Comment - komentarz ustawia x na 5 nad linijka x = 5, dodajacy szum bez wartosci.'
    ],
    keyConcepts: [
      {term: 'Document sandbox', def: 'Izolowane srodowisko Redaktora z dostepem tylko do plikow tekstowych, bez Bash i bez uruchamiania.'},
      {term: 'Inline only nontrivial', def: 'Komentarze w kodzie tylko dla niejasnej logiki, nigdy dla instrukcji ktore czyta sie same.'},
      {term: 'Style consistency', def: 'Caly projekt mowi jednym glosem - jeden termin, jeden ton, jedno formatowanie.'},
      {term: 'Keep a Changelog', def: 'Standard formatu CHANGELOG.md z sekcjami Added, Changed, Deprecated, Removed, Fixed, Security.'},
      {term: 'Semantic versioning', def: 'Wersjonowanie major.minor.patch informujace o skali zmian i backward compatibility.'}
    ],
    stats: [
      {label: 'Input tokens', value: '10-25k'},
      {label: 'Output tokens', value: '5-15k'},
      {label: 'Load', value: '35/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy chcesz profesjonalny README i CHANGELOG dla projektu open-source',
      'Gdy masz surowa dokumentacje API wymagajaca struktury i przykladow',
      'Gdy potrzebujesz ujednolicenia terminologii w calym projekcie'
    ],
    worstFor: [
      'Gdy musisz uruchomic skrypt - Redaktor nie ma Bash',
      'Gdy tresc wymaga badania i zrodel (to Researcherzy)',
      'Gdy piszesz copywriting marketingowy ze storytellingiem (to GTM Strategist)'
    ],
    relatedAgents: ['backend', 'integrator', 'res_docs'],
    glossary: [
      {term: 'changelog', definition: 'Plik historii zmian projektu opisujacy co sie zmienilo miedzy wersjami i dlaczego.'},
      {term: 'semver', definition: 'Semantic versioning - format major.minor.patch komunikujacy skale zmian API.'},
      {term: 'jsdoc', definition: 'Komentarze specjalnego formatu w JavaScript opisujace parametry, typy i zwracana wartosc funkcji.'},
      {term: 'inline', definition: 'Komentarz w tej samej linii lub bezposrednio nad kodem, nie w zewnetrznym pliku.'},
      {term: 'style guide', definition: 'Dokument opisujacy konwencje pisania w projekcie - terminologia, ton, formatowanie.'}
    ],
    learningQuote: 'Dobra dokumentacja nie dodaje informacji - usuwa szum. Redaktor mierzy sukces tym co udalo mu sie wyciac, nie co dopisal.',
    realExample: 'Pewnego dnia dostalem od Kodera surowy tekst ta funkcja bierze liste uzytkownikow i zwraca tych co sa aktywni. Zamienilem to w sekcje filterActiveUsers z tabela parametrow, opisem zwracanej wartosci i przykladem wywolania. Dodalem wpis w CHANGELOG i zaktualizowalem README. Cala dokumentacja projektu nagle zaczela mowic jednym glosem.'
  },
  integrator: {
    tagline: 'Monter filmowy systemu - lacze prace rownoleglych workerow w jeden spojny artefakt',
    missionShort: 'Integrator to ostatni agent warstwy BUILD i brama miedzy BUILD a QA. Laczy kod od Backend Dev, CSS od Designera i tresc od Redaktora w jeden dzialajacy produkt. Rozwiazuje konflikty, waliduje zgodnosc z MANIFEST.md i testuje calosc E2E.',
    whoIs: 'Integrator to dyrygent proby generalnej i szef kuchni na wydawce. Jest JEDYNYM agentem BUILD, ktory widzi prace wszystkich pozostalych workerow jednoczesnie - dlatego to on znajduje miejsca gdzie elementy sie gryza i komponuje je w harmonijna calosc.',
    analogy: 'Integrator jest jak monter filmowy, ktory z godzin surowego materialu z kamery, dzwieku i muzyki buduje film - bo kazdy z tych elementow osobno to jeszcze nie jest kino.',
    howItWorks: [
      {label: 'Zbiera outputy', desc: 'Pobiera kod HTML/JS od Backend Dev, style CSS od Designera i tresc od Redaktora. Jako jedyny builder widzi wszystkie trzy strumienie pracy razem.'},
      {label: 'Rozwiazuje konflikty', desc: 'Identyfikuje sprzecznosci - nazwy klas sie nie zgadzaja, tytul nie miesci sie w kontenerze, tekst wypelnia biala przestrzen. Dobiera minimalne rozwiazania szanujace intencje wszystkich workerow.'},
      {label: 'Testuje E2E', desc: 'Uruchamia zintegrowany artefakt (Bash), sprawdza linki, weryfikuje CSS, testuje interaktywne elementy i responsywnosc.'},
      {label: 'Waliduje MANIFEST', desc: 'Sprawdza czy kazdy wymog z MANIFEST.md ma odzwierciedlenie w artefakcie. Produkuje finalny pakiet do warstwy QA z raportem konfliktow i testow.'}
    ],
    inputs: [
      'Kod HTML, JS i backend od Backend Dev',
      'CSS tokens i komponenty od Designera',
      'Tresc, README i inline komentarze od Redaktora',
      'MANIFEST.md z wymaganiami do walidacji'
    ],
    outputs: [
      'Zintegrowany artefakt gotowy dla warstwy QA',
      'Raport rozwiazanych konfliktow miedzy workerami',
      'Log z testow E2E (linki, CSS, interakcje, responsywnosc)',
      'Potwierdzenie zgodnosci z MANIFEST.md',
      'Lista eskalacji jesli konflikty sa fundamentalne'
    ],
    does: [
      'Laczy wyjscia trzech builderow w jeden spojny artefakt',
      'Rozwiazuje konflikty nazw klas, rozmiarow i intencji minimalnymi zmianami',
      'Uruchamia testy E2E w srodowisku testowym przez Bash',
      'Weryfikuje kazdy wymog MANIFEST.md jako checklist do odhaczenia',
      'Dodaje text-overflow ellipsis i tooltip gdy tekst nie miesci sie w layoucie',
      'Zachowuje intencje wszystkich workerow zamiast narzucania jednej perspektywy',
      'Eskaluje fundamentalne konflikty do Orkiestratora z jasnym raportem',
      'Produkuje dokumentacje zmian jakie wprowadzil podczas integracji'
    ],
    doesNotDo: [
      'Nie pisze nowego kodu od zera (to domena Backend Dev)',
      'Nie projektuje UI ani nie dobiera kolorow (to domena Designera)',
      'Nie tworzy tresci tekstowych ani copywritingu (to domena Redaktora)',
      'Nie prowadzi badan (to domena Researcherow)',
      'Nie decyduje CO budowac, tylko JAK polaczyc (to domena Orkiestratora)',
      'Nie testuje bezpieczenstwa ani jakosci kodu (to domena QA Security i Quality)',
      'Nie przepisuje calych modulow - klei, nie buduje od nowa'
    ],
    antiPatterns: [
      'False Consensus - udawanie ze konflikt nie istnieje i wybranie losowej wersji zamiast jawnego rozwiazania.',
      'Lowest Common Denominator - usuwanie cech wyroznialnych zeby uniknac konfliktu, zamiast znalezc kompromis zachowujacy wartosc.',
      'Hidden Merge Conflict - pozostawienie markerow merge w kodzie i przekazanie tak do QA, ktore oznacza sie w blednych miejscach.',
      'Rewriting Instead of Gluing - przepisywanie calego modulu Backend Dev zamiast minimalnej poprawki nazwy klasy CSS.',
      'MANIFEST Amnesia - pomijanie walidacji MANIFEST.md i przepuszczenie artefaktu z brakujacym wymogiem.'
    ],
    keyConcepts: [
      {term: 'Minimalna zmiana', def: 'Rozwiazywanie konfliktu najmniejsza mozliwa modyfikacja zachowujaca intencje wszystkich workerow.'},
      {term: 'E2E testing', def: 'Testy calosci artefaktu - linki, CSS, interakcje - nie bezpieczenstwa ani jakosci kodu.'},
      {term: 'MANIFEST validation', def: 'Sprawdzenie punkt po punkcie czy kazdy wymog z umowy MANIFEST.md ma realizacje w artefakcie.'},
      {term: 'Brama do QA', def: 'Integrator jest ostatnim punktem kontroli przed przekazaniem produktu do warstwy QA - tu zatrzymuje sie nietestowalny kod.'},
      {term: 'Cross-cutting view', def: 'Jedyny agent BUILD widzacy prace wszystkich pozostalych - dzieki temu moze rozstrzygac konflikty.'}
    ],
    stats: [
      {label: 'Input tokens', value: '20-40k'},
      {label: 'Output tokens', value: '5-15k'},
      {label: 'Load', value: '70/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy masz rownolegla prace kilku workerow i potrzebujesz spojnej calosci',
      'Gdy konflikty miedzy kodem, designem i trescia wymagaja minimalnego rozstrzygniecia',
      'Gdy potrzebujesz walidacji MANIFEST.md przed przekazaniem do QA'
    ],
    worstFor: [
      'Gdy masz jednego workera i nic do integrowania',
      'Gdy potrzebujesz nowego kodu (to Backend Dev)',
      'Gdy chcesz code review jakosci (to QA Quality)'
    ],
    relatedAgents: ['backend', 'designer', 'writer'],
    glossary: [
      {term: 'e2e', definition: 'End-to-end test - sprawdza cala sciezke uzytkownika od wejscia do wyjscia w artefakcie.'},
      {term: 'manifest', definition: 'Dokument umowy miedzy zleceniodawca a systemem opisujacy wymagania do spelnienia.'},
      {term: 'merge conflict', definition: 'Sytuacja gdy dwa zrodla zmieniaja to samo miejsce i narzedzie nie potrafi wybrac wersji.'},
      {term: 'artefakt', definition: 'Gotowy produkt BUILD przechodzacy do QA - jeden plik lub zestaw plikow do review.'},
      {term: 'eskalacja', definition: 'Przekazanie problemu do Orkiestratora gdy Integrator nie moze rozwiazac konfliktu samodzielnie.'}
    ],
    learningQuote: 'Wielki monter sprawia ze indywidualne czesci zaczynaja spiewac razem - Integrator nie gra na zadnym instrumencie, ale tworzy harmonie.',
    realExample: 'Pewnego dnia dostalem HTML z klasa btn-primary od Backend Dev, CSS ze stylem button-main od Designera i 87-znakowy tytul od Redaktora, a kontener mial max-width 200px. Zamiast przepisywac cokolwiek, dodalem alias CSS btn-primary, wstawilem text-overflow ellipsis i tooltip z pelna trescia. Trzy intencje zachowane, jeden artefakt gotowy do QA.'
  },
