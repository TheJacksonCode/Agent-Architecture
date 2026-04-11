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
  qa_security: {
    tagline: 'Ostatnia linia obrony - etyczny haker skanujacy artefakt zanim trafi do produkcji',
    missionShort: 'QA Security to audytor bezpieczenstwa dzialajacy w warstwie QA/AUDYT Level 4. Jego misja: znalezc kazda podatnosc OWASP, kazdy zahardkodowany sekret i kazda luke prompt injection zanim kod dotrze do uzytkownika. Nie naprawia - raportuje z severity i remediacja.',
    whoIs: 'QA Security to kontroler bezpieczenstwa na lotnisku architektury agentowej. Zachowuje sie jak white-hat pentester: mysli jak atakujacy, systematycznie probuje zlamac system uzywajac metodologii OWASP, ale raportuje luki zamiast je wykorzystywac. Pracuje wylacznie w trybie odczytu.',
    analogy: 'QA Security jest jak inspektor budowlany z lista kontrolna OWASP - nie stawia scian, tylko sprawdza czy instalacja elektryczna nie grozi pozarem.',
    howItWorks: [
      {label: 'Inwentaryzacja plikow', desc: 'Uzywa Glob aby zmapowac wszystkie pliki artefaktu: kod zrodlowy, konfiguracje, pliki zaleznosci, .env. Buduje liste powierzchni ataku.'},
      {label: 'Skanowanie OWASP', desc: 'Systematycznie przechodzi przez OWASP Top 10 uzywajac wzorcow Grep: innerHTML, eval, konkatenacja SQL, brak middleware auth, hardcoded secrets.'},
      {label: 'Analiza AI-specific', desc: 'Szuka prompt injection, agent output poisoning, tool abuse i token exfiltration - zagrozen unikalnych dla systemow multi-agent.'},
      {label: 'Raport JSON', desc: 'Kompiluje znalezienia w ustrukturyzowany raport z severity (CRITICAL/HIGH/MEDIUM/LOW), dokladna lokalizacja plik:linia i remediacja dla kazdego findingu.'}
    ],
    inputs: [
      'Artefakt do audytu przekazany przez Integratora',
      'Kod zrodlowy, konfiguracje, pliki zaleznosci, .env',
      'Specyfikacja bezpieczenstwa projektu (jesli istnieje)',
      'Lista wzorcow OWASP Top 10 i zagrozen AI-specific'
    ],
    outputs: [
      'Raport JSON z lista findings uporzadkowanych wedlug severity',
      'Kazdy finding ma id, category, lokalizacje plik:linia, opis i remediacje',
      'Scan summary z liczbami CRITICAL/HIGH/MEDIUM/LOW',
      'Rekomendacja BLOKADA WDROZENIA lub GO dla Managera QA',
      'Sciezka eksploitacji dla kazdego krytycznego znalezienia'
    ],
    does: [
      'Skanuje kod pod katem OWASP Top 10: XSS, SQLi, CSRF, IDOR, insecure deserialization',
      'Wykrywa hardcoded secrets (klucze API, hasla, tokeny, connection strings)',
      'Analizuje prompt injection i agent output poisoning w systemach multi-agent',
      'Sprawdza wersje pakietow w package.json pod katem znanych CVE',
      'Identyfikuje niezabezpieczone endpointy bez middleware autentykacji',
      'Kategoryzuje znalezienia wedlug severity i pisze jasne remediacje',
      'Dokumentuje sciezke eksploitacji - jak atakujacy moglby wykorzystac luke',
      'Sprawdza pliki konfiguracyjne .env, docker-compose.yml, nginx.conf, workflows CI/CD'
    ],
    doesNotDo: [
      'Nie naprawia kodu - audytor nie moze modyfikowac tego co audytuje',
      'Nie ocenia jakosci kodu, czytelnosci czy zgodnosci ze specyfikacja (to QA Quality)',
      'Nie podejmuje decyzji GO/NO-GO - to obowiazek Managera QA',
      'Nie komunikuje sie z QA Quality - niezaleznosc zapobiega groupthink',
      'Nie uruchamia kodu (brak Bash) - zapobiega przypadkowym uszkodzeniom',
      'Nie uzywa WebSearch - audytuje artefakt, nie bada internetu',
      'Nie traktuje kazdego console.log jako CRITICAL - priorytezuje ryzyko kontekstowo'
    ],
    antiPatterns: [
      'Compliance Theater - odhaczenie OWASP Top 10 bez zrozumienia kontekstu, checklist bez sensu',
      'Vuln Noise Flooding - zgloszenie 100 findings gdzie 95 to false positives, szum zabija sygnal',
      'False Severity Inflation - oznaczanie wszystkiego jako CRITICAL aby wygladac kompetentnie',
      'Missing Threat Model - skanowanie wzorcow bez zrozumienia rzeczywistej powierzchni ataku',
      'Fix-While-Auditing - naprawianie luk podczas audytu, co niszczy niezaleznosc audytora'
    ],
    keyConcepts: [
      {term: 'OWASP Top 10', def: 'Kanoniczna lista 10 najczestszych podatnosci webowych aktualizowana co kilka lat przez OWASP Foundation.'},
      {term: 'Prompt injection', def: 'Atak specyficzny dla LLM polegajacy na manipulacji promptem aby zmusic agenta do ignorowania instrukcji.'},
      {term: 'Severity rating', def: 'Klasyfikacja podatnosci w 4 poziomach CRITICAL/HIGH/MEDIUM/LOW determinujacych pilnosc naprawy.'},
      {term: 'Read-only audit', def: 'Zasada ze audytor ma dostep wylacznie do odczytu - nie moze modyfikowac badanego systemu.'},
      {term: 'Attack surface', def: 'Suma wszystkich punktow wejscia dostepnych dla atakujacego - kazdy endpoint, formularz, import.'}
    ],
    stats: [
      {label: 'Kategorie OWASP', value: '10+5 AI'},
      {label: 'Koszt/zadanie', value: '$0.02-0.08'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'Gdy chcesz bramke bezpieczenstwa przed wdrozeniem - ostatnia linie obrony',
      'Gdy pracujesz z kodem obslugujacym dane uzytkownikow, platnosci lub autentykacje',
      'Gdy budujesz system multi-agent podatny na prompt injection i output poisoning'
    ],
    worstFor: [
      'Gdy potrzebujesz naprawy podatnosci (on tylko raportuje, naprawa to Koder)',
      'Gdy chcesz oceny jakosci kodu lub pokrycia testami (to QA Quality)',
      'Gdy potrzebujesz pentestu na zywo z exploitami (on skanuje statycznie)'
    ],
    relatedAgents: ['qa_quality', 'qa_perf', 'qa_manager'],
    glossary: [
      {term: 'owasp', definition: 'Open Web Application Security Project - organizacja tworzaca standardy bezpieczenstwa webowego i lista Top 10.'},
      {term: 'xss', definition: 'Cross-Site Scripting - wstrzykniecie zlowrogiego skryptu do strony przez niezanityzowany input.'},
      {term: 'cve', definition: 'Common Vulnerabilities and Exposures - baza znanych podatnosci z unikalnymi identyfikatorami.'},
      {term: 'remediation', definition: 'Rekomendacja naprawy podatnosci - konkretna instrukcja co zrobic aby ja wyeliminowac.'},
      {term: 'idor', definition: 'Insecure Direct Object Reference - dostep do obiektow bez sprawdzenia uprawnien uzytkownika.'}
    ],
    learningQuote: 'Jeden przeoczony innerHTML moze kosztowac miliony - QA Security nie szuka bledow, szuka sciezek eksploitacji.',
    realExample: 'Pewnego razu skanowalem artefakt aplikacji platniczej i znalazlem klucz Stripe sk_live zahardkodowany w src/config/api.js linia 8. W tym samym pliku endpoint /api/admin/users byl dostepny bez middleware autentykacji. Zaraportowalem dwa findings HIGH i rekomendacje BLOKADA. Manager QA zablokowal wdrozenie, Koder przeniosl klucz do env i dodal requireAuth. Drugi audyt - zero findings, GO.'
  },
  qa_quality: {
    tagline: 'Inspektor jakosci z checklista - zamiast pytac jak to zlamac, pyta czy to w ogole dziala',
    missionShort: 'QA Quality to audytor jakosci kodu i zgodnosci ze specyfikacja. Jego misja: zweryfikowac czy artefakt robi to co powinien, czy testy pokrywaja scenariusze, czy kod jest czytelny i wydajny. Dziala rownolegle do QA Security ale z calkowicie inna perspektywa - poprawnosc zamiast bezpieczenstwa.',
    whoIs: 'QA Quality to recenzent naukowy i kontroler jakosci w fabryce Toyota w jednej osobie. Nie pisze artykulu ani nie buduje samochodu - sprawdza czy metodologia jest poprawna i czy drzwi zamykaja sie prawidlowo. Ma checklist z progami: >80% pokrycia, funkcje <50 linii, zagniezdzenie <3 poziomy.',
    analogy: 'QA Quality jest jak egzaminator na uczelni - nie przepisuje pracy studenta, czyta ja i pisze recenzje z uwagami, student sam poprawia.',
    howItWorks: [
      {label: 'Weryfikacja spec', desc: 'Porownuje artefakt z oryginalna specyfikacja punkt po punkcie. Kazde wymaganie musi miec odpowiadajacy mu fragment implementacji zweryfikowany Grep plus Read.'},
      {label: 'Uruchomienie testow', desc: 'Uzywa Bash aby odpalic npm test, pytest lub jest coverage. Zbiera metryki pokrycia statements, branches, functions, lines i porownuje z progiem 80%.'},
      {label: 'Skanowanie smells', desc: 'Szuka code smells: funkcje >50 linii, zagniezdzenie >3 poziomy, duplikacja, zapytania N+1, brak lazy loading, nieobsluzone edge cases null/undefined/ujemne.'},
      {label: 'Raport JSON', desc: 'Kompiluje findings w hierarchii CORRECTNESS > TESTS > PERFORMANCE > CODE QUALITY. Kazdy finding ma kategorie, severity, lokalizacje i rekomendacje.'}
    ],
    inputs: [
      'Artefakt do audytu - kod zrodlowy, testy, konfiguracja',
      'Oryginalna specyfikacja wymagan ze strategicznej fazy',
      'Istniejace testy jednostkowe i integracyjne',
      'Progi jakosci projektu (coverage, long functions, complexity)'
    ],
    outputs: [
      'Raport JSON z findings uporzadkowanych wedlug priorytetow',
      'Statystyki pokrycia testami z podzialem statements/branches/functions',
      'Lista brakujacych edge cases i nieobsluzonych error paths',
      'Metryki code smells: dlugosc funkcji, zagniezdzenie, duplikacja',
      'Rekomendacja WDROZENIE lub BLOKADA dla Managera QA'
    ],
    does: [
      'Weryfikuje zgodnosc ze specyfikacja porownujac wymagania z implementacja',
      'Uruchamia testy i mierzy pokrycie statements/branches/functions dzieki Bash',
      'Identyfikuje brakujace testy dla error paths i edge cases',
      'Wykrywa code smells: dlugie funkcje, glebokie zagniezdzenie, duplikacja',
      'Testuje edge cases: null, undefined, ujemne, puste, znaki specjalne',
      'Znajduje problemy wydajnosciowe: N+1 queries, brak cache, brak lazy loading',
      'Sprawdza linter wyniki i zgodnosc ze stylem projektu',
      'Priorytezuje findings wedlug hierarchii CORRECTNESS > TESTS > PERFORMANCE > STYLE'
    ],
    doesNotDo: [
      'Nie naprawia kodu - raportuje braki, Koder je uzupelnia',
      'Nie pisze brakujacych testow - identyfikuje BRAKI, implementacja to Koder',
      'Nie sprawdza bezpieczenstwa XSS/SQLi/secrets - to domena QA Security',
      'Nie podejmuje decyzji GO/NO-GO - raport idzie do Managera QA',
      'Nie komunikuje sie z QA Security - niezaleznosc zapobiega groupthink',
      'Nie modyfikuje plikow - narzedzia READ-ONLY plus Bash tylko do testow',
      'Nie ocenia jakosci designu UX - skupia sie na poprawnosci i jakosci kodu'
    ],
    antiPatterns: [
      'Metrics Gaming - optymalizacja pod metryki pokrycia zamiast pod rzeczywiste testowanie zachowan',
      'Coverage Cheating - pisanie testow bez asercji tylko po to aby podbic procent coverage',
      'Nit-Picking Storm - zalewanie raportu uwagami stylistycznymi zamiast skupienia na correctness',
      'Missing User Impact - raportowanie smells bez oceny czy blad rzeczywiscie dotyka uzytkownika',
      'Checklist Myopia - sprawdzanie tylko tego co na liscie, ignorowanie nietypowych problemow'
    ],
    keyConcepts: [
      {term: 'Test coverage', def: 'Procent kodu wykonywany przez testy - statements, branches, functions, lines z progiem minimalnym 80%.'},
      {term: 'Edge case', def: 'Warunek graniczny: null, undefined, 0, ujemna wartosc, pusty string, znak specjalny, bardzo duza liczba.'},
      {term: 'Code smell', def: 'Problematyczny wzorzec w kodzie wskazujacy na glebszy problem projektowy - dlugie funkcje, duplikacja, God Class.'},
      {term: 'N+1 query', def: 'Anty-wzorzec wydajnosci: petla wywoluje N dodatkowych zapytan zamiast pobrac dane jednym JOIN.'},
      {term: 'Correctness first', def: 'Hierarchia priorytetow poprawnosc > testy > wydajnosc > styl, kazdy kolejny poziom zalezy od poprzedniego.'}
    ],
    stats: [
      {label: 'Prog coverage', value: '>80%'},
      {label: 'Max funkcja', value: '<50 lin'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'Gdy chcesz zweryfikowac czy kod rzeczywiscie spelnia wymagania specyfikacji',
      'Gdy potrzebujesz raportu pokrycia testami z wskazaniem brakujacych scenariuszy',
      'Gdy szukasz code smells i anti-patternow wydajnosciowych przed wdrozeniem'
    ],
    worstFor: [
      'Gdy potrzebujesz audytu bezpieczenstwa XSS lub CVE (to QA Security)',
      'Gdy chcesz aby ktos napisal brakujace testy (on je identyfikuje, nie tworzy)',
      'Gdy potrzebujesz oceny UX lub designu wizualnego (on ocenia kod)'
    ],
    relatedAgents: ['qa_security', 'qa_perf', 'qa_manager'],
    glossary: [
      {term: 'coverage', definition: 'Pokrycie testami - procent kodu wykonywany podczas uruchomienia testow jednostkowych i integracyjnych.'},
      {term: 'edge case', definition: 'Warunek graniczny wejscia jak null, undefined, zero, wartosci ujemne czy ekstremalnie duze.'},
      {term: 'code smell', definition: 'Powierzchniowa oznaka glebszego problemu w kodzie - nie blad ale symptom slabego projektu.'},
      {term: 'n+1 query', definition: 'Problem wydajnosciowy gdy jedno zapytanie glowne generuje N dodatkowych zapytan w petli.'},
      {term: 'linter', definition: 'Narzedzie statycznej analizy kodu jak ESLint czy Pylint sprawdzajace zgodnosc ze stylem i wzorcami.'}
    ],
    learningQuote: 'Pieknie sformatowany kod ktory nie spelnia specyfikacji jest bezwartosciowy - poprawnosc zawsze przed stylem.',
    realExample: 'Pewnego razu audytowalem modul platnosci i uruchomilem npm test coverage. Statements 72%, branches 58% - ponizej progu. Grep pokazal ze funkcja calculateDiscount nie waliduje null, undefined ani ujemnej ceny, a processOrder mial 87 linii przy progu 50. Zaraportowalem 4 findings HIGH plus 3 MEDIUM. Manager QA zleca naprawe, Koder dodaje walidacje i rozbija funkcje, drugi audyt - coverage 89%, GO.'
  },