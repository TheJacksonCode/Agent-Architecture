// Batch: preset mid (design_sys, api_modern, ui_overhaul, feature_sprint, standard, data_pipe, research, legacy)
  design_sys: {
    tagline: 'Brand book i component library w jednym przebiegu - tokeny, komponenty, Storybook gotowy do wdrozenia',
    missionShort: 'Design System buduje spojny jezyk wizualny aplikacji: tokeny, palete, typografie, komponenty i dokumentacje. Output to biblioteka React/Vue zsynchronizowana ze Storybookiem, gotowa do wielokrotnego uzycia przez wszystkie produkty. Zero backendu, zero logiki biznesowej.',
    whoIs: 'Zespoly produktowe i startupy, ktore widza, ze kazdy nowy ekran wyglada inaczej i chca raz na zawsze ujednolicic wyglad. Szczegolnie przydatny przy starcie marki, rebrandingu lub gdy trzy zespoly frontendu tworza trzy rozne guzikowe stylistyki.',
    analogy: 'Ten preset to jak tworzenie brand booka dla domu mody - badacze trendow (UX + Docs) przeszukuja runway i dokumentacje, designer rysuje kolekcje, developer szyje gotowe ubrania, a copywriter spisuje zasady stylizacji.',
    howItWorks: [
      {label: 'Faza 1: Research UX + Docs', desc: 'Researcher UX analizuje trendy (Material 3, Radix, shadcn, Linear), a Researcher Docs przeszukuje dokumentacje frameworkow pod katem design tokens, theming API i accessibility constraints.'},
      {label: 'Faza 2: Design tokens + komponenty', desc: 'Designer tworzy palete, skale typograficzne, spacing scale i dark mode tokens. Definiuje warianty komponentow (button sizes, input states, card elevations) jako pojedyncze zrodlo prawdy.'},
      {label: 'Faza 3: Implementacja frontend', desc: 'Frontend Developer wdraza tokeny jako CSS custom properties lub theme object, koduje komponenty React/Vue z Radix/Headless UI pod spodem i buduje Storybook z kazdym wariantem.'},
      {label: 'Faza 4: Dokumentacja + guidelines', desc: 'Writer tworzy dokumentacje uzycia: kiedy uzywac primary vs secondary button, jak komponowac cards, jakie sa zasady spacing i typografii, w jakich sytuacjach lamac regulu.'}
    ],
    inputs: [
      'Existing aplikacja (screenshoty) lub moodboard dla nowej marki',
      'Tech stack frontendu (React, Vue, Svelte) i preferowane biblioteki bazowe',
      'Ograniczenia brandingowe (kolory firmowe, czcionki licencyjne, logo)',
      'Kryteria sukcesu (WCAG AA/AAA, dark mode, RTL support, min browser versions)'
    ],
    outputs: [
      'Design tokens w formacie CSS variables lub JSON (kolory, spacing, typografia, radii, shadows)',
      'Biblioteka komponentow React/Vue z pelnymi wariantami i states (hover, focus, disabled)',
      'Storybook z zywymi przykladami kazdego komponentu i wariantu',
      'Dokumentacja uzycia z przykladami DO/DONT i zasadami komponowania',
      'Raport accessibility: kontrasty, focus indicators, keyboard nav, ARIA compliance'
    ],
    does: [
      'Tworzy spojny jezyk wizualny od palety po mikro-interakcje',
      'Definiuje tokeny jako pojedyncze zrodlo prawdy dla wszystkich produktow',
      'Buduje biblioteke komponentow zsynchronizowana ze Storybookiem',
      'Wdraza dark mode i accessibility od pierwszego dnia (nie jako afterthought)',
      'Pisze guidelines z przykladami DO/DONT dla kazdego komponentu',
      'Integruje sie z istniejacymi bibliotekami (Radix, Headless UI) zamiast reinventing wheel',
      'Dostarcza screenshot tests i visual regression (Chromatic) aby chronic design przed driftem',
      'Waliduje kontrasty APCA/WCAG i typografie czytelnosci na etapie tokenow'
    ],
    doesNotDo: [
      'Nie tworzy backendu ani API (to domena API Modernization)',
      'Nie buduje logiki biznesowej ani stanow aplikacji',
      'Nie projektuje pojedynczych ekranow (to zadanie dla UI Overhaul lub Feature Sprint)',
      'Nie wdraza samego content managementu ani CMS',
      'Nie tworzy stron marketingowych ani landing pages',
      'Nie zastepuje gotowych systemow jak Material UI czy Ant Design gdy one wystarczaja',
      'Nie robi copywritingu produktowego (tylko dokumentacje systemu)'
    ],
    antiPatterns: [
      'Kolor Copy Paste - duplikowanie hexow po calej aplikacji zamiast referowania do tokenow',
      'One-Off Component - budowanie nowej wersji buttona dla kazdego ekranu zamiast wariantu',
      'Storybook Graveyard - Storybook tworzony na jednorazowy pokaz, a potem nikt go nie aktualizuje',
      'Design Token Overload - 400 kolorow w palecie zamiast 12 ktore mozna zapamietac',
      'Frankensystem - mieszanie Material UI, Chakra i custom komponentow bez wspolnej filozofii'
    ],
    keyConcepts: [
      {term: 'Design tokens', def: 'Nazwane, wielokrotnie uzywane wartosci (kolor, spacing, radius) wyrazone jako zmienne.'},
      {term: 'Storybook', def: 'Srodowisko do izolowanego tworzenia i dokumentowania komponentow UI z zywymi przykladami.'},
      {term: 'Headless components', def: 'Biblioteki jak Radix dostarczajace logike i dostepnosc bez narzuconych stylow.'},
      {term: 'Visual regression', def: 'Automatyczne screenshoty komponentow porownywane miedzy commitami dla wykrycia niechcianych zmian.'},
      {term: 'Theming API', def: 'Mechanizm przelaczania motywow (light/dark, brand A/B) bez przepisywania komponentow.'}
    ],
    stats: [
      {label: 'Agenci', value: '6'},
      {label: 'Fazy', value: '3'},
      {label: 'Koszt est.', value: '$0.85-2.15'},
      {label: 'Czas', value: '8-14 min'}
    ],
    bestFor: [
      'Gdy nowa marka lub rebrand wymaga spojnego jezyka wizualnego od pierwszego ekranu',
      'Gdy kilka zespolow frontendu tworzy rozbiezne style i chcesz to ujednolicic',
      'Gdy potrzebujesz component library wielokrotnego uzycia dla wielu produktow'
    ],
    worstFor: [
      'Gdy projekt potrzebuje logiki biznesowej lub backendu (brak tych rol w zespole)',
      'Gdy wystarczy gotowy Material UI lub shadcn bez customizacji',
      'Gdy masz tylko jeden ekran do dopieszczenia (za duzy narzut na pojedynczy widok)'
    ],
    relatedPresets: ['ui_overhaul', 'api_modern', 'a11y'],
    glossary: [
      {term: 'token', definition: 'Semantyczna zmienna designowa (color-primary, spacing-md) odwolywana przez komponenty.'},
      {term: 'variant', definition: 'Alternatywna forma komponentu (button primary vs secondary, size sm vs lg).'},
      {term: 'dark mode', definition: 'Alternatywny motyw z ciemnymi tlami i jasnym tekstem, wlaczany preferencja systemu.'},
      {term: 'APCA', definition: 'Accessible Perceptual Contrast Algorithm - nowsza metoda obliczania kontrastu dla WCAG 3.'},
      {term: 'headless UI', definition: 'Komponent dostarczajacy logike i a11y, ale pozostawiajacy stylizacje uzytkownikowi.'}
    ],
    learningQuote: 'Design system to nie kolekcja komponentow - to umowa, ktora sprawia, ze kazdy nowy ekran wyglada jakby go robila ta sama reka.',
    realExample: 'Wyobraz sobie startup SaaS, ktory przez dwa lata dodawal ekrany ad-hoc. Ma trzy rozne guziki "zapisz", cztery odcienie niebieskiego i szesc rozmiarow naglowkow. Nowy designer spedza polowe czasu pytajac "ktorego guzika uzyc?". Ten preset w jednym przebiegu tworzy tokeny, komponenty i Storybook - po wdrozeniu kazdy nowy ekran zaczyna wygladac jak z jednej ksiazki.'
  },
  api_modern: {
    tagline: 'Modernizacja silnika aplikacji bez dotykania interfejsu - wersjonowanie, kontrakty i backward compatibility',
    missionShort: 'API Modernization ewoluuje stare API bez ruszania frontendu: wprowadza wersjonowanie, migracje z REST do GraphQL, dodaje pagination, autoryzacje i idempotentnosc. Output to nowe kontrakty i integratorzy gwarantujacy, ze stare klienty dalej dzialaja, a nowe dostaja lepszy interfejs.',
    whoIs: 'Zespoly backendowe z dzialajacym API, ktore zaczyna hamowac rozwoj: brak wersjonowania, brak paginacji, mieszanka stylow, chaotyczne nazwy pol. Szczegolnie uzyteczny gdy trzeba wdrozyc GraphQL obok REST bez ryzyka ubijania integracji partnerskich.',
    analogy: 'Ten preset to jak wymiana instalacji w budynku podczas gdy ludzie dalej tam mieszkaja - rury i kable (API) sa modernizowane po cichu, a mieszkancy (frontend, mobile, partnerzy) widza dalej te same scianki i wylaczniki.',
    howItWorks: [
      {label: 'Faza 1: Analiza istniejacego API', desc: 'Analityk mapuje wszystkie endpointy, formaty, authentication, pagination i identyfikuje ukryte kontrakty (co partnerzy realnie konsumuja vs co jest w dokumentacji).'},
      {label: 'Faza 2: Research wzorcow', desc: 'Researcher Tech sprawdza wspolczesne standardy: OpenAPI 3.1, JSON:API, GraphQL, cursor pagination, idempotency keys, rate limiting, oraz migration patterns jak versioned URLs lub header-based versioning.'},
      {label: 'Faza 3: Build + integration', desc: 'Backend Developer pisze nowe endpointy lub rezolwery GraphQL, Integrator buduje warstwe kompatybilnosci (adapter od v1 do v2) aby stare klienty dalej dzialaly bez zmian.'},
      {label: 'Faza 4: QA kontraktow', desc: 'QA Quality testuje pelna zgodnosc: kontrakty (Pact), performance (response time), regression (czy stare klienty dalej dostaja identyczne odpowiedzi), wersjonowanie headerow.'}
    ],
    inputs: [
      'Existing API z dokumentacja (OpenAPI spec, Postman collection lub kod)',
      'Lista znanych konsumentow (frontend, mobile, partnerzy, webhooks)',
      'Cel migracji (REST to GraphQL, v1 to v2, dodanie paginacji)',
      'Constrainty kompatybilnosci (ile czasu utrzymywac stara wersje, SLA)'
    ],
    outputs: [
      'Nowy contract (OpenAPI 3.1 lub GraphQL schema) z wersjonowaniem',
      'Implementacja endpointow lub rezolwerow zgodna z nowym kontraktem',
      'Warstwa kompatybilnosci (adapter v1 to v2) dla starych klientow',
      'Migration guide dla konsumentow API z przykladami przed i po',
      'Contract tests (Pact lub Dredd) chroniace przed regresja kontraktow'
    ],
    does: [
      'Wprowadza wersjonowanie API (URL, header lub GraphQL schema evolution)',
      'Migruje pomiedzy stylami (REST to GraphQL, RPC to REST)',
      'Dodaje nowoczesna paginacje (cursor-based zamiast offset)',
      'Wdraza idempotency keys dla operacji write',
      'Buduje warstwe kompatybilnosci, zeby stare klienty dalej dzialaly',
      'Aktualizuje autoryzacje (OAuth 2.1, JWT, API keys) bez ubijania istniejacych tokenow',
      'Pisze contract tests chroniace przed niechcianymi breaking changes'
    ],
    doesNotDo: [
      'Nie projektuje interfejsow uzytkownika ani wygladu (brak Designera i FE)',
      'Nie dodaje nowych funkcji biznesowych (to zadanie dla Feature Sprint)',
      'Nie robi pelnej przebudowy baz danych (tylko adaptery nad istniejacym schematem)',
      'Nie ingeruje w logike frontendu klientow - tylko dostarcza kompatybilne API',
      'Nie tworzy SDK dla partnerow (to osobny pipeline)',
      'Nie zastepuje pentestow bezpieczenstwa (to domena Security Hardening)',
      'Nie migruje infrastruktury (AWS, Kubernetes) - tylko warstwe aplikacji'
    ],
    antiPatterns: [
      'Big Bang Migration - wylaczenie v1 w tym samym dniu gdy wchodzi v2 i zbijanie wszystkich klientow',
      'Silent Breaking Change - zmiana formatu odpowiedzi bez wersjonowania i alertu dla konsumentow',
      'Double Maintenance Hell - utrzymywanie v1 i v2 rownolegle bez planu wyjscia przez 3 lata',
      'Pagination Bait - wprowadzanie limitu 100 wynikow bez info w dokumentacji, klienty gubia dane',
      'GraphQL Cargo Cult - wdrazanie GraphQL tylko dlatego, ze jest modny, bez realnej potrzeby'
    ],
    keyConcepts: [
      {term: 'Contract versioning', def: 'Mechanizm wspolistnienia wielu wersji API jednoczesnie (URL, header, field).'},
      {term: 'Backward compatibility', def: 'Gwarancja ze stare klienty dalej dzialaja po wdrozeniu nowej wersji.'},
      {term: 'Cursor pagination', def: 'Paginacja oparta o nieprzerywalny klucz zamiast offsetu, stabilna przy wstawianiu rekordow.'},
      {term: 'Idempotency key', def: 'Identyfikator pozwalajacy bezpiecznie powtarzac zapytanie POST bez duplikacji efektu.'},
      {term: 'Contract test', def: 'Test, ktory porownuje kontrakt producenta API z oczekiwaniami konsumenta.'}
    ],
    stats: [
      {label: 'Agenci', value: '6'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.95-2.35'},
      {label: 'Czas', value: '10-16 min'}
    ],
    bestFor: [
      'Gdy legacy API dusi rozwoj i brakuje wersjonowania',
      'Gdy migrujesz REST do GraphQL, a partnerzy dalej musza dzialac na starych endpointach',
      'Gdy potrzebujesz dodac paginacje, autoryzacje lub idempotentnosc bez ruszania frontendu'
    ],
    worstFor: [
      'Gdy projekt wymaga zmian wizualnych lub UX (brak designera)',
      'Gdy nie ma istniejacego API - to preset do ewolucji, nie tworzenia od zera',
      'Gdy potrzebna jest nowa funkcja biznesowa widoczna dla klienta (uzyj Feature Sprint)'
    ],
    relatedPresets: ['design_sys', 'feature_sprint', 'legacy'],
    glossary: [
      {term: 'OpenAPI', definition: 'Standard opisu REST API (YAML/JSON) umozliwiajacy auto-generacje klientow i dokumentacji.'},
      {term: 'GraphQL', definition: 'Jezyk zapytan z typowanym schema, pozwala klientowi deklarowac dokladnie jakie pola potrzebuje.'},
      {term: 'deprecation', definition: 'Oznaczenie pola lub endpointu jako przestarzalego z wyprzedzeniem zanim zostanie usuniety.'},
      {term: 'Pact', definition: 'Framework do consumer-driven contract testing zapobiegajacy psuciu integracji.'},
      {term: 'versioning', definition: 'Strategia rownoleglego utrzymywania wielu wersji API (URL, header, field).'}
    ],
    learningQuote: 'Dobre API zmienia sie bez zatrzymywania konsumentow - zly preset wywala wszystkie integracje w piatek wieczorem.',
    realExample: 'Wyobraz sobie SaaS z REST API sprzed piec lat: offset pagination, brak wersji, pol nazwanych snake_case i camelCase naprzemiennie. Mobile app dostaje duplikaty przy przegladaniu, a partnerska integracja czasami gubi rekordy. Ten preset analizuje, projektuje v2 z cursor pagination, wdraza adapter dla v1, pisze contract testy i dostarcza migration guide - zero downtime, zero zbitych klientow.'
  },
  ui_overhaul: {
    tagline: 'Odswiezenie wygladu produktu bez dotykania backendu - nowe style, animacje i mikro-interakcje',
    missionShort: 'UI Overhaul redesignuje istniejacy interfejs aplikacji: nowa typografia, nowa paleta, nowoczesne komponenty, micro-interactions i dark mode. Backend pozostaje nietkniety, a uzytkownicy widza produkt, ktory zmienil sie jak po remoncie mieszkania. 7 agentow z podwojnym researchem UX+Docs dla pelnego pokrycia trendow i ograniczen.',
    whoIs: 'Zespoly z dzialajacym produktem, ktory wyglada przestarzale i traci przez to konwersje lub klientow. Idealny gdy SaaS dziala technicznie OK, ale interfejs wyglada jak z 2016 roku i nowi uzytkownicy odbijaja sie od strony glownej.',
    analogy: 'Ten preset to jak generalny remont mieszkania gdzie scianki nosne zostaja na swoim miejscu - architekt wnetrz bada trendy, sprawdza co mozna ruszyc, a co nie, projektuje nowy styl, a ekipa remontowa wymienia podlogi, farby i oswietlenie bez burzenia scian.',
    howItWorks: [
      {label: 'Faza 1: Dual research UX + Docs', desc: 'Researcher UX przeglada wzorce designu (Linear, Vercel, Arc, Notion) i trendy 2026. Researcher Docs rownolegle sprawdza ograniczenia frameworka, accessibility i wymagania browser support.'},
      {label: 'Faza 2: Analiza istniejacego UI', desc: 'Analityk inwentaryzuje wszystkie ekrany, komponenty, stany, mapuje ktore czesci mozna bezpiecznie zmienic, a ktore wymagaja wspolpracy z backendem (np. zmiana pagination API).'},
      {label: 'Faza 3: Design + implementation', desc: 'Designer tworzy nowy system wizualny (kolory, typografia, spacing, dark mode), a Frontend Developer rownolegle wdraza go jako refactor istniejacych komponentow, zachowujac te same propsy i API komponentow.'},
      {label: 'Faza 4: QA wizualne i a11y', desc: 'QA Quality robi visual regression tests, sprawdza kontrasty, animacje na urzadzeniach low-end, dark mode, responsive breakpoints i zgodnosc z WCAG 2.2 AA.'}
    ],
    inputs: [
      'Istniejaca aplikacja (screenshoty, URL, access do repo)',
      'Moodboard lub referencje designowe (Linear, Vercel, konkurencja)',
      'Ograniczenia (branding, browser support, performance budget)',
      'Kryteria sukcesu (konwersja, NPS, nowoczesnosc, dark mode)'
    ],
    outputs: [
      'Nowy design system zaimplementowany w istniejacym repo',
      'Refaktor komponentow z zachowaniem backward compatibility API komponentow',
      'Dark mode z automatycznym wykrywaniem preferencji systemu',
      'Micro-interactions i animacje z respektowaniem prefers-reduced-motion',
      'Visual regression suite chroniaca przed niechcianymi zmianami'
    ],
    does: [
      'Odswieza kolory, typografie, spacing i hierarchie wizualna',
      'Wprowadza dark mode i motywy od pierwszego dnia',
      'Dodaje micro-interactions i animacje gdzie maja sens',
      'Refaktoruje komponenty bez zmiany ich API (drop-in replace)',
      'Waliduje kontrasty, focus indicators i keyboard navigation',
      'Optymalizuje bundle size dla nowego CSS i assets',
      'Pisze visual regression testy chroniace nowy wyglad',
      'Integruje badania UX z ograniczeniami technicznymi frameworka'
    ],
    doesNotDo: [
      'Nie zmienia backendu, API ani modelu danych',
      'Nie dodaje nowych funkcji biznesowych (tylko istniejace w nowej formie)',
      'Nie projektuje od zera jesli nie ma istniejacego produktu (uzyj Feature Sprint)',
      'Nie robi pelnego tworzenia design systemu jako biblioteki (uzyj Design System)',
      'Nie zastepuje badan uzytkownikow (interviews, testy uzytecznosci)',
      'Nie migruje frameworka (React to Svelte) - tylko wyglad w obecnym stacku',
      'Nie robi copywritingu ani rebrandingu strategicznego'
    ],
    antiPatterns: [
      'Lipstick on a Pig - zmiana kolorow bez poprawiania information architecture ktora byla problemem',
      'Trend Chasing - wdrazanie glassmorphism tylko dlatego, ze jest modny, bez dopasowania do marki',
      'Animation Overload - animowanie kazdego elementu az strona staje sie bolesna dla epileptykow',
      'Dark Mode Half-Baked - dark mode zrobiony tylko dla glownych ekranow, reszta zostaje biala',
      'Component API Break - refaktor ktory zmusza zespoly produktowe do przepisania kazdego uzycia'
    ],
    keyConcepts: [
      {term: 'Visual regression', def: 'Automatyczne porownywanie screenshotow komponentow miedzy wersjami dla wykrycia zmian.'},
      {term: 'prefers-reduced-motion', def: 'Preferencja systemowa, ktora pozwala uzytkownikowi wylaczyc animacje, kazdy redesign musi ja respektowac.'},
      {term: 'Drop-in replace', def: 'Refaktor, ktory nie wymaga zmian w miejscach uzycia - nowy komponent ma to samo API co stary.'},
      {term: 'Micro-interaction', def: 'Drobna animacja sygnalizujaca reakcje na akcje uzytkownika (hover, click, state change).'},
      {term: 'APCA contrast', def: 'Wspolczesny algorytm kontrastu kolorow (WCAG 3 draft) dokladniejszy niz stare WCAG 2.1 ratios.'}
    ],
    stats: [
      {label: 'Agenci', value: '7'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.95-2.35'},
      {label: 'Czas', value: '10-18 min'}
    ],
    bestFor: [
      'Gdy produkt dziala technicznie OK, ale wyglada staromodnie i traci uzytkownikow',
      'Gdy chcesz dodac dark mode i nowoczesne micro-interactions do istniejacej aplikacji',
      'Gdy masz istniejacy stack React/Vue i nie chcesz go migrowac, tylko odswiezyc wyglad'
    ],
    worstFor: [
      'Gdy projekt wymaga zmian backendu lub nowych funkcji biznesowych',
      'Gdy startujesz od zera bez istniejacego UI (uzyj Feature Sprint lub Startup MVP)',
      'Gdy potrzebujesz pelnej biblioteki komponentow wielokrotnego uzycia (uzyj Design System)'
    ],
    relatedPresets: ['design_sys', 'feature_sprint', 'a11y'],
    glossary: [
      {term: 'redesign', definition: 'Przebudowa wygladu istniejacego interfejsu przy zachowaniu jego funkcjonalnosci.'},
      {term: 'dark mode', definition: 'Alternatywny motyw z ciemnymi tlami, wlaczany automatycznie lub recznie.'},
      {term: 'easing', definition: 'Krzywa tempa animacji okreslajaca jak element przyspiesza i zwalnia.'},
      {term: 'focus-visible', definition: 'CSS selektor pokazujacy obwodke focusu tylko gdy uzytkownik uzywa klawiatury.'},
      {term: 'scroll-snap', definition: 'CSS mechanizm zatrzymujacy scroll na konkretnych punktach dla karuzel i pelnoekranowych sekcji.'}
    ],
    learningQuote: 'Redesign nie jest o zmianie kolorow - jest o tym, ze produkt musi czuc sie jakby ktos go niedawno dotykal z milosc.',
    realExample: 'Wyobraz sobie SaaS dla zarzadzania projektami z piciu lat. Funkcje dobre, klienci placa, ale nowi uzytkownicy mowia "wyglada jak Trac". Ten preset robi dual research (trendy 2026 + ograniczenia Reacta), projektuje nowy system, wdraza dark mode, dodaje scroll animations przy liscie zadan - po tygodniu NPS wzrasta o 12 punktow, a demo sprzedaze rosna o 20% bez jednej zmiany w backendzie.'
  },
  feature_sprint: {
    tagline: 'Pelny cykl od pomyslu do wdrozenia nowej funkcji - analiza, research, backend, frontend, testy',
    missionShort: 'Feature Sprint dostarcza nowa funkcje end-to-end: analiza wymagan, badanie stanu technologii i UX, implementacja backendu i frontendu rownolegle oraz QA przed wypuszczeniem. Idealny gdy masz jasno zdefiniowany feature request i chcesz go dowiezc bez chaosu.',
    whoIs: 'Product managery i tech leady, ktorzy maja sprecyzowany pomysl na nowa funkcje (np. "komentarze w dokumentach" lub "export do CSV") i chca miec gotowy, przetestowany feature flagowalny w jednym przebiegu. Nie dla rebrandingow ani refactoringu.',
    analogy: 'Ten preset to jak budowa nowego pokoju w istniejacym domu - zbadaj czy fundamenty to wytrzymuja, zaprojektuj uklad, zainstaluj systemy (backend), wykoncz wnetrze (frontend), wreszcie odbior techniczny (QA).',
    howItWorks: [
      {label: 'Faza 1: Analiza wymagan', desc: 'Analityk dekomponuje feature request na konkretne user stories, definiuje edge cases, identyfikuje zaleznosci z istniejacym systemem i mierzy rozmiar zadania.'},
      {label: 'Faza 2: Dual research Tech + UX', desc: 'Dwoch researcherow rownolegle: Tech bada opcje implementacji (biblioteki, wzorce, tradeoffy) i UX sprawdza jak konkurencja i wzorce designu obsluguja podobne scenariusze.'},
      {label: 'Faza 3: Build backend + frontend', desc: 'Backend Developer buduje API i modele danych, Frontend Developer rownolegle implementuje interfejs. Komunikuja sie przez kontrakty API zdefiniowane w Fazie 2.'},
      {label: 'Faza 4: QA i feature flag', desc: 'QA Quality testuje manualnie i automatycznie, sprawdza regresje, mierzy performance. Feature jest wdrazany za flaga, co pozwala na stopniowe rolloutowanie.'}
    ],
    inputs: [
      'Feature request lub user story (co ma robic, dla kogo, po co)',
      'Constrainty (deadline, stack technologiczny, zaleznosci)',
      'Existing codebase access (aby nowy feature pasowal do konwencji)',
      'Kryteria sukcesu (metryki konwersji, performance, adopcja)'
    ],
    outputs: [
      'Implementacja backendu (API, modele danych, migracje bazy)',
      'Implementacja frontendu (komponenty, stany, integracja z API)',
      'Automatic tests (unit, integration, e2e krytyczne sciezki)',
      'Feature flag pozwalajacy na stopniowe wdrazanie i rollback',
      'Dokumentacja usera i developera (jak uzywac i jak rozwijac)'
    ],
    does: [
      'Dekomponuje vague feature request na konkretne user stories',
      'Bada wspolczesne wzorce technologiczne i UX zanim zacznie kodowac',
      'Implementuje backend i frontend rownolegle (skraca czas)',
      'Pisze testy dla krytycznych sciezek uzytkownika',
      'Wdraza feature flag aby umozliwic stopniowy rollout',
      'Dokumentuje API i interakcje dla zespolu developerskiego',
      'Waliduje zgodnosc z istniejaca konwencja kodowa i designu',
      'Mierzy baseline metryki przed wdrozeniem dla porownan pozniej'
    ],
    doesNotDo: [
      'Nie robi pelnego redesignu wygladu (uzyj UI Overhaul)',
      'Nie tworzy design systemu od zera (uzyj Design System)',
      'Nie naprawia bugow w istniejacym kodzie (uzyj Bug Hunter lub Quick Fix)',
      'Nie robi refactoringu calego modulu (uzyj Legacy Refactor)',
      'Nie robi deep researchu z 6 zrodel (uzyj Research Swarm)',
      'Nie robi adversarial debate nad architektura (uzyj Five Minds)',
      'Nie dziala bez jasno zdefiniowanego feature requesta'
    ],
    antiPatterns: [
      'Scope Creep - wymaganie pol-rebrandingu w trakcie wdrazania feature',
      'Copy From Competitor - slepe kopiowanie UI konkurenta bez zrozumienia kontekstu',
      'Skip the QA - wdrozenie feature na prod bez feature flaga i testow',
      'Ghost Feature - dodanie bez baseline metryk, nie wiadomo pozniej czy pomoglo',
      'Backend First Blocker - czekanie miesiac az backend skonczy, zanim frontend zacznie'
    ],
    keyConcepts: [
      {term: 'Feature flag', def: 'Mechanizm wlaczania/wylaczania feature w runtime bez deploymentu, pozwala na stopniowy rollout.'},
      {term: 'User story', def: 'Forma wymagania: jako [rola] chce [akcja] aby [cel biznesowy].'},
      {term: 'Canary release', def: 'Wdrozenie nowego feature dla malego procenta uzytkownikow przed pelnym rolloutem.'},
      {term: 'Contract-first', def: 'Podejscie gdzie BE i FE uzgadniaja API przed rozpoczeciem implementacji.'},
      {term: 'Baseline metrics', def: 'Pomiary KPI przed wdrozeniem, do porownania efektu po release.'}
    ],
    stats: [
      {label: 'Agenci', value: '7'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.10-2.70'},
      {label: 'Czas', value: '12-20 min'}
    ],
    bestFor: [
      'Gdy masz jasno zdefiniowany feature request i chcesz go dowiezc end-to-end',
      'Gdy nowa funkcja wymaga zarowno backendu jak i frontendu',
      'Gdy chcesz wdrazyc feature flag dla bezpiecznego stopniowego rolloutu'
    ],
    worstFor: [
      'Gdy chodzi tylko o odswiezenie wygladu (uzyj UI Overhaul)',
      'Gdy to pilny bugfix bez nowej funkcji (uzyj Quick Fix lub Bug Hunter)',
      'Gdy nie masz jeszcze jasnego pomyslu co chcesz zbudowac (uzyj Research Swarm lub Recon)'
    ],
    relatedPresets: ['standard', 'ui_overhaul', 'plan_exec'],
    glossary: [
      {term: 'user story', definition: 'Opis wymagania w formie narracji o uzytkowniku, jego celu i kontekscie.'},
      {term: 'feature flag', definition: 'Przelacznik w kodzie wlaczajacy funkcje tylko dla wybranych uzytkownikow.'},
      {term: 'contract', definition: 'Formalna specyfikacja API uzgodniona przez BE i FE przed implementacja.'},
      {term: 'rollout', definition: 'Proces stopniowego udostepniania nowej funkcji kolejnym grupom uzytkownikow.'},
      {term: 'regression', definition: 'Zepsucie dzialajacej wczesniej funkcji przez wdrozenie nowej zmiany.'}
    ],
    learningQuote: 'Dobry feature sprint to taki, ktorego uzytkownicy nie zauwazaja - po prostu pojawia sie cos, czego wczoraj nie bylo, i od razu dziala.',
    realExample: 'Wyobraz sobie SaaS do zarzadzania zadaniami: PM mowi "dodajmy komentarze do kart". Ten preset dekomponuje to na mentions, notyfikacje, edycje, usuwanie, bada jak Linear i Notion robia podobne rzeczy, buduje API i komponent rownolegle, wdraza za feature flagiem dla 10% userow i mierzy engagement - tydzien pozniej 28% kart ma przynajmniej jeden komentarz i decyzja o pelnym rolloutem jest oczywista.'
  },
  standard: {
    tagline: 'Uniwersalny zespol 8 agentow - bezpieczny domyslny wybor dla 70% typowych projektow webowych i SaaS',
    missionShort: 'Standard Dev dostarcza pelny cykl od planowania przez research i implementacje po QA dla typowych projektow webowych. 8 agentow w hierarchicznym pipeline: orkiestrator, analityk, planer, researcher, backend, frontend i dwoch testerow. Statystyczny sweet spot dla wiekszosci zadan SaaS i aplikacji webowych.',
    whoIs: 'Zespoly i freelancerzy, ktorzy nie chca zastanawiac sie nad wyborem presetu - Standard to bezpieczny default ktory pokrywa wiekszosc realnych potrzeb. Idealny dla admin paneli, dashboardow, CRUDowych aplikacji i sredniej wielkosci SaaS features.',
    analogy: 'Ten preset to jak biuro architektoniczne budujace biurowiec - dyrektor koordynuje, analityk zbiera wymagania, planer rysuje harmonogram, badacze sprawdzaja materialy, ekipa budowlana (BE+FE) wykonuje, a inspektor bezpieczenstwa odbiera.',
    howItWorks: [
      {label: 'Faza 1: Strategia + analiza', desc: 'Orkiestrator dekomponuje problem na fazy, Analityk analizuje wymagania i identyfikuje ryzyka, a Planer tworzy harmonogram zadan z kolejnoscia i zaleznosciami.'},
      {label: 'Faza 2: Research techniczny', desc: 'Researcher Tech sprawdza aktualne wzorce, biblioteki i wybory technologiczne dla planowanych zadan, dostarczajac rekomendacje stacku zanim zacznie sie kodowanie.'},
      {label: 'Faza 3: Build BE + FE parallel', desc: 'Backend Developer buduje API, modele i migracje, a Frontend Developer rownolegle wdraza UI. Oboje koordynuja sie przez kontrakt API zdefiniowany w fazie planowania.'},
      {label: 'Faza 4: Dual QA', desc: 'QA Quality testuje funkcjonalnosc i integracje, QA Security sprawdza podstawowe wektory ataku (input validation, auth, XSS). Obie scieki rownolegle przed wypuszczeniem.'}
    ],
    inputs: [
      'Opis projektu lub feature set z ogolnym zakresem',
      'Stack technologiczny (lub pozostawiony do rekomendacji researcha)',
      'Constrainty (budzet, deadline, wymagania compliance)',
      'Kryteria sukcesu (ilu userow, jakie metryki, wydajnosc)'
    ],
    outputs: [
      'Plan projektu z fazami, zadaniami i zaleznosciami',
      'Raport researchowy z rekomendacjami stacku i bibliotek',
      'Implementacja backendu (API, modele, testy)',
      'Implementacja frontendu (komponenty, stan, integracja)',
      'Raporty QA (quality + security) z listami znalezisk'
    ],
    does: [
      'Pokrywa pelny cykl od planowania po testy w jednym przebiegu',
      'Analizuje wymagania i dekomponuje duze zadania na mniejsze',
      'Tworzy harmonogram i kolejnosc zadan z zaleznosciami',
      'Robi research technologiczny zanim zacznie kodowac',
      'Implementuje backend i frontend rownolegle dla oszczednosci czasu',
      'Sprawdza jakosc i podstawowe bezpieczenstwo przed wypuszczeniem',
      'Dziala jako bezpieczny default gdy nie wiesz ktory preset wybrac',
      'Skaluje sie od sredniej feature do calego modulu aplikacji'
    ],
    doesNotDo: [
      'Nie robi deep researchu z 6 zrodel (uzyj Research Swarm)',
      'Nie zastepuje dedykowanego audytu bezpieczenstwa (uzyj Security Hardening)',
      'Nie zawiera designera (uzyj SaaS lub UI Overhaul dla design-heavy projektow)',
      'Nie robi pelnej dekompozycji monolitu (uzyj Microservices)',
      'Nie ma debaty ekspertow nad architektura (uzyj Five Minds)',
      'Nie jest optymalnym wyborem dla prostych bugfixow (za duzy narzut)',
      'Nie pasuje do czysto badawczych zadan bez implementacji (uzyj Research)'
    ],
    antiPatterns: [
      'Overkill Default - uzywanie Standard dla literowek i jednoliniowkow (przeplata 80% kosztow)',
      'Skipping Plan - pomijanie fazy planowania i skakanie od razu do kodu',
      'Research Overload - robienie tygodniowego researcha dla prostej funkcji',
      'QA Theater - testerzy przepuszczaja wszystko na zielono bez realnego testowania',
      'Scope Bloat - dodawanie kolejnych wymagan w trakcie jazdy, pipeline sie gubi'
    ],
    keyConcepts: [
      {term: 'Hierarchical pipeline', def: 'Wzorzec gdzie orkiestrator deleguje do warstw (strategia, research, build, QA).'},
      {term: 'Dual QA', def: 'Dwoch niezaleznych testerow (quality i security) sprawdza wyniki rownolegle.'},
      {term: 'Statistical sweet spot', def: '8 agentow pokrywa ~70% typowych zadan bez nadmiaru ani niedoboru.'},
      {term: 'Contract-first', def: 'Plan wymaga zdefiniowania API zanim backend i frontend zaczna kodowac.'},
      {term: 'Default preset', def: 'Bezpieczny wybor gdy nie wiesz ktory specjalistyczny preset pasuje.'}
    ],
    stats: [
      {label: 'Agenci', value: '8'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.25-3.10'},
      {label: 'Czas', value: '14-22 min'}
    ],
    bestFor: [
      'Gdy nie wiesz ktory preset wybrac - to domyslny bezpieczny strzal',
      'Gdy budujesz typowy web app lub SaaS feature z BE i FE',
      'Gdy projekt wymaga planowania, researchu i dual QA ale nie jest enterprise-critical'
    ],
    worstFor: [
      'Gdy zadanie to prosty bugfix (za duzy narzut, uzyj Quick Fix)',
      'Gdy potrzebujesz specjalistycznego researchu z wielu zrodel (uzyj Research Swarm)',
      'Gdy projekt wymaga designera lub refactoringu legacy (uzyj SaaS lub Legacy)'
    ],
    relatedPresets: ['saas', 'feature_sprint', 'plan_exec'],
    glossary: [
      {term: 'pipeline', definition: 'Sekwencyjny przeplyw zadan miedzy wyspecjalizowanymi agentami.'},
      {term: 'orchestrator', definition: 'Agent glowny, ktory deleguje zadania i koordynuje prace zespolu.'},
      {term: 'CRUD', definition: 'Create Read Update Delete - podstawowe operacje na zasobach.'},
      {term: 'QA gate', definition: 'Bramka przed release, ktorej nie przechodzi kod bez pozytywnej oceny testerow.'},
      {term: 'default preset', definition: 'Rekomendacja systemu gdy uzytkownik nie ma specyficznych wymagan.'}
    ],
    learningQuote: 'Standard to nie przecietnosc - to dowod, ze 8 wyspecjalizowanych rol pokrywa 70% realnych zadan lepiej niz geniuszny samotnik.',
    realExample: 'Wyobraz sobie PM-a, ktory ma do zrobienia admin panel do zarzadzania uzytkownikami w swoim SaaS: lista, filtry, eksport, edycja rol. Nie wie czy to wymaga researchu, ilu programistow, jakiego testowania. Wybiera Standard - w 20 minut dostaje plan, wybrany stack z uzasadnieniem, wdrozony BE+FE i raport dual QA. Panel trafia na staging bez niespodzianek.'
  },
  data_pipe: {
    tagline: 'Zespol do ETL i hurtowni danych - ingest, clean, transform, store, integrate',
    missionShort: 'Data Pipeline buduje pipeline przetwarzania danych: od ingestu przez czyszczenie i transformacje po zapis do hurtowni i integracje z narzedziami analitycznymi. 8 agentow z Feature Dev zamiast Frontendu, bo specjalizacja w libraries ETL (dbt, Airflow, Spark, Kafka) zamiast UI.',
    whoIs: 'Zespoly data engineering, ktore musza przenosic dane miedzy systemami, budowac hurtownie dla analityki lub raportowania. Idealny gdy masz rozne zrodla danych (CRM, analytics, database) i chcesz z nich zbudowac jedno miejsce prawdy dla stakeholderow biznesowych.',
    analogy: 'Ten preset to jak rafineria ropy - surowiec (raw data) jest analizowany, destylowany, przeksztalcany w rozne produkty (tables, marts), mieszany (joins) i poddawany kontroli jakosci zanim trafi na rynek (BI dashboards).',
    howItWorks: [
      {label: 'Faza 1: Planowanie + research zrodel', desc: 'Planer i Analityk mapuja wszystkie zrodla danych (bazy, API, pliki, streams), ich format, wolumen, frequency updates. Researcher Tech sprawdza wybor narzedzi ETL (dbt vs Airflow vs Fivetran).'},
      {label: 'Faza 2: Backend ingest', desc: 'Backend Developer buduje konektory do zrodel: extractory z API (REST, webhooks), database readers, file watchers, Kafka consumers. Zapisuje raw data do staging area.'},
      {label: 'Faza 3: Feature Dev transform', desc: 'Feature Dev (specjalizacja w data libraries) pisze transformacje: SQL w dbt, Python w pandas, cleansing, deduplication, enrichment. Buduje marts i dimensional models.'},
      {label: 'Faza 4: Integracja + QA', desc: 'Integrator laczy pipeline z BI tools (Looker, Metabase, Tableau) i alerting. QA Quality waliduje dane (schema tests, freshness, null checks) i pisze data quality gates.'}
    ],
    inputs: [
      'Lista zrodel danych (bazy, API, pliki, streams) z dostepem',
      'Target warehouse (BigQuery, Snowflake, Postgres, Redshift)',
      'Wymagania biznesowe (jakie metryki, jak czesto update, historia)',
      'Constrainty (SLA freshness, GDPR, koszt warehouse)'
    ],
    outputs: [
      'Konektory i extractory do kazdego zrodla danych',
      'Modele transformacji (dbt projects, SQL, Python scripts)',
      'Dimensional model w warehouse gotowy dla analityki',
      'Data quality tests i alerting na breakages',
      'Dokumentacja lineage (jak dane przeplywaja od zrodel do dashboard)'
    ],
    does: [
      'Mapuje zrodla danych i wybiera optymalny stack ETL',
      'Buduje extractory z API, baz i streams',
      'Pisze transformacje czyszczace, enrichujace i deduplikujace dane',
      'Tworzy dimensional models (facts, dimensions) w warehouse',
      'Waliduje jakosc danych (schema, freshness, null rate, duplicates)',
      'Integruje pipeline z BI tools i alerting',
      'Dokumentuje lineage od zrodla do dashboard dla auditability',
      'Optymalizuje koszty warehouse przez partitioning i incremental loads'
    ],
    doesNotDo: [
      'Nie buduje frontendu aplikacji webowej (brak tej roli w zespole)',
      'Nie trenuje modeli ML (to inny pipeline)',
      'Nie analizuje danych statystycznie (uzyj Data Analysis Pipeline)',
      'Nie zastepuje dedykowanej platformy SaaS jak Fivetran dla typowych zrodel',
      'Nie robi jednorazowych raportow ad-hoc (za duzy narzut)',
      'Nie zarzadza infrastruktura chmury (tylko pipeline aplikacyjny)',
      'Nie buduje streaming real-time (to wymaga innego stacku Kafka/Flink)'
    ],
    antiPatterns: [
      'God Table - zrzucanie wszystkiego do jednej tabeli 300 kolumn bez dimensional model',
      'No Idempotency - pipeline, ktory przy retry tworzy duplikaty zamiast upsertowac',
      'Silent Drift - brak testow schema, nowe pole w zrodle laman downstream raportu bez alertu',
      'SELECT STAR - transformacje ciagnace wszystkie kolumny z tabel surowych bez filtra',
      'Midnight ETL - wszystkie pipeline o polnocy bez orchestracji, jeden zawal wszystko'
    ],
    keyConcepts: [
      {term: 'Dimensional model', def: 'Struktura hurtowni: facts (pomiary) i dimensions (konteksty) dla szybkich zapytan analitycznych.'},
      {term: 'Idempotency', def: 'Wlasciwosc pipeline, ktora gwarantuje ze wielokrotne uruchomienie daje ten sam wynik.'},
      {term: 'Data lineage', def: 'Graf zaleznosci pokazujacy jak dane przeplywaja od zrodla do dashboard.'},
      {term: 'Schema test', def: 'Test, ktory waliduje strukture danych (kolumny, typy, null rate) przed downstream transformacja.'},
      {term: 'Incremental load', def: 'Strategia ladowania tylko nowych/zmienionych rekordow zamiast pelnego refresh.'}
    ],
    stats: [
      {label: 'Agenci', value: '8'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.30-3.20'},
      {label: 'Czas', value: '14-22 min'}
    ],
    bestFor: [
      'Gdy budujesz hurtownie danych lub data mart dla analityki',
      'Gdy masz wiele zrodel danych do polaczenia w jedno miejsce prawdy',
      'Gdy potrzebujesz niezawodnego pipeline ETL z quality gates'
    ],
    worstFor: [
      'Gdy projekt wymaga frontendu lub interfejsu (brak tej roli)',
      'Gdy to jednorazowa analiza ad-hoc (uzyj Data Analysis Pipeline)',
      'Gdy buduje streaming real-time z milisekundowym SLA (inny stack)'
    ],
    relatedPresets: ['data_analysis_pipe', 'standard', 'kb_constructor'],
    glossary: [
      {term: 'ETL', definition: 'Extract Transform Load - klasyczny wzorzec pipeline przetwarzania danych.'},
      {term: 'ELT', definition: 'Extract Load Transform - wariant gdzie transformacja dzieje sie w warehouse (modern pattern).'},
      {term: 'dbt', definition: 'Data Build Tool - framework transformacji danych w SQL z testami i dokumentacja.'},
      {term: 'warehouse', definition: 'Specjalizowana baza danych dla analityki (BigQuery, Snowflake, Redshift).'},
      {term: 'CDC', definition: 'Change Data Capture - technika propagowania zmian z operacyjnej bazy do warehouse.'}
    ],
    learningQuote: 'Dobry data pipeline to taki, ktorego analityk nigdy nie widzi - po prostu otwiera dashboard i widzi prawde.',
    realExample: 'Wyobraz sobie firme e-commerce z danymi rozproszenymi po Shopify, Stripe, Google Analytics i Mailchimpie. CFO pyta "ile zarobilismy w zeszlym kwartale po refundach i kosztach akwizycji?" - i nikt nie potrafi odpowiedziec szybko. Ten preset buduje pipeline ktory co godzine sciaga dane ze wszystkich zrodel, czysci je, liczy metryki jednolite i laduje do BigQuery. W piatek wieczorem CFO patrzy na Looker i dostaje odpowiedz w 3 sekundy.'
  },
  research: {
    tagline: 'Szesciu niezaleznych researcherow, krytyk i syntetyk - maksymalna glebokosc badawcza bez implementacji',
    missionShort: 'Research Swarm dostarcza kompleksowe raporty badawcze oparte na szesciu rownoleglych zrodlach: Tech docs, UX trends, Reddit, X/Twitter, GitHub i forums. Research Critic waliduje metodyke i laprze sprzecznosci, a Synthesizer produkuje MANIFEST.md - pojedynczy dokument z rekomendacjami i uzasadnieniem. Zero implementacji, czysta wiedza.',
    whoIs: 'Decydenci i tech leady stojacy przed nieodwracalnym wyborem (framework, architektura, vendor) ktorzy potrzebuja multi-source ground truth. Idealny gdy decyzja bedzie miala skutki przez lata i stac cie na 20 minut researchu zamiast trzech miesiecy zalu po wyborze.',
    analogy: 'Ten preset to jak sledztwo kryminalne z szescioma detektywami - kazdy bada inna perspektywe (swiadkowie, video, finanse, telefony, forum, dokumenty) niezaleznie, prokurator (Critic) waliduje dowody, a sedzia (Synthesizer) pisze wyrok z uzasadnieniem.',
    howItWorks: [
      {label: 'Faza 1: Fan-out do szesciu researcherow', desc: 'Orkiestrator rozglasza pytanie badawcze do szesciu rownoleglych researcherow (Tech, UX, Reddit, X, GitHub, Forums), kazdy pracuje w izolacji bez komunikacji z innymi aby uniknac groupthink.'},
      {label: 'Faza 2: Research w szesciu strumieniach', desc: 'Tech czyta dokumentacje, UX analizuje wzorce designu, Reddit lowi niefiltrowane opinie, X lowi trendy, GitHub bada kod i Issues, Forums lowi dyskusje techniczne. Kazdy produkuje strukturyzowany raport.'},
      {label: 'Faza 3: Critic waliduje metodyke', desc: 'Research Critic ocenia kazdy raport na piecio-wymiarowej rubyce (methodology, coverage, bias, confidence, gaps), flaguje sprzecznosci miedzy zrodlami i odsyla slabe raporty do poprawki.'},
      {label: 'Faza 4: Synthesis do MANIFEST.md', desc: 'Synthesizer skleja szesc zwalidowanych raportow w jeden MANIFEST.md: executive summary, scored findings, contradiction map, cross-functional insights, gap analysis i konkretne recommendations z uzasadnieniem.'}
    ],
    inputs: [
      'Jasno zdefiniowane pytanie badawcze (np. "ktory framework AI multi-agent dla enterprise chatbota")',
      'Kontekst i constrainty (stack, budzet, deadline, compliance)',
      'Kryteria oceny (co uwazasz za sukces rekomendacji)',
      'Timeline decyzji (kiedy musisz miec odpowiedz)'
    ],
    outputs: [
      'MANIFEST.md - syntetyczny raport z rekomendacjami i uzasadnieniem',
      'Szesc szczegolowych raportow per zrodlo z cytatami i linkami',
      'Contradiction map pokazujaca gdzie zrodla sie nie zgadzaja',
      'Scored findings z confidence levels (CERTAIN, PROBABLE, SPECULATION)',
      'Gap analysis - czego Critic nie dalo sie znalezc'
    ],
    does: [
      'Dostarcza multi-source ground truth z szeciu niezaleznych kanalow',
      'Wykrywa sprzecznosci miedzy oficjalna dokumentacja a realnymi doswiadczeniami',
      'Waliduje metodyke researchu przed oddaniem raportu',
      'Syntetyzuje szesc zrodel w jeden dokument decyzyjny',
      'Mierzy confidence kazdego findingu zamiast udawac pewnosc',
      'Flaguje gaps gdzie wiedzy brakuje, nie udaje ze wie',
      'Dziala w izolacji (zasada Anti-groupthink) gwarantujac rozne perspektywy',
      'Dostarcza 90% lepsze wyniki niz pojedynczy agent wg Anthropic benchmark'
    ],
    doesNotDo: [
      'Nie pisze kodu ani nie implementuje nic (zero builderow w zespole)',
      'Nie podejmuje decyzji za ciebie - tylko rekomenduje z uzasadnieniem',
      'Nie nadaje sie do pilnych odpowiedzi (za duzy narzut)',
      'Nie zastepuje ekspertow domenowych w niszowych obszarach',
      'Nie robi eksperymentow czy benchmarkow kodowych (tylko analiza istniejacych)',
      'Nie przewiduje przyszlosci (tylko raportuje state of the art)',
      'Nie angazuje realnych uzytkownikow do testow (tylko public sources)'
    ],
    antiPatterns: [
      'Single Source Truth - uzycie Research Swarm do potwierdzenia jednej opinii ktora juz mamy',
      'Research Paralysis - zamawianie researcha zamiast decyzji, po trzecim swarmie dalej nic',
      'Ignore the Critic - pomijanie flagow Criticow bo pasuja do naszego planu',
      'Confidence Blindness - cytowanie SPECULATION findingu jako pewnika w prezentacji',
      'Groupthink Bypass - reczne komunikowanie researcherow aby sie zgadzali'
    ],
    keyConcepts: [
      {term: 'Fan-out pattern', def: 'Wzorzec gdzie orkiestrator rozglasza zadanie do wielu niezaleznych workerow rownolegle.'},
      {term: 'Agent isolation', def: 'Zasada, ze researcherzy nie komunikuja sie miedzy soba aby uniknac groupthink.'},
      {term: 'Confidence labeling', def: 'Oznaczenie kazdego findingu jako CERTAIN, PROBABLE lub SPECULATION.'},
      {term: 'Contradiction map', def: 'Dokument pokazujacy gdzie zrodla sie nie zgadzaja i dlaczego.'},
      {term: 'MANIFEST.md', def: 'Format koncowego dokumentu syntetyzujacego wszystkie findings w decyzje.'}
    ],
    stats: [
      {label: 'Agenci', value: '9'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.80-2.05'},
      {label: 'Czas', value: '10-18 min'}
    ],
    bestFor: [
      'Gdy stoisz przed nieodwracalnym wyborem technologii lub architektury',
      'Gdy potrzebujesz multi-source ground truth a nie oficjalnej narracji vendora',
      'Gdy ma byc raport do decyzji strategicznej z confidence levels'
    ],
    worstFor: [
      'Gdy potrzebujesz implementacji (zero builderow w zespole)',
      'Gdy masz jedno oczywiste rozwiazanie (za duzy narzut na pewna decyzje)',
      'Gdy pytanie jest tak niszowe, ze public sources go nie obejmuja'
    ],
    relatedPresets: ['deep_research_swarm_pro', 'reflect', 'deep'],
    glossary: [
      {term: 'MANIFEST', definition: 'Koncowy dokument syntetyzujacy wszystkie findingi w decyzje z uzasadnieniem.'},
      {term: 'groupthink', definition: 'Zjawisko gdzie grupa konwerguje do wspolnej opinii tracac rozne perspektywy.'},
      {term: 'confidence', definition: 'Miara pewnosci findingu: CERTAIN, PROBABLE, SPECULATION.'},
      {term: 'contradiction', definition: 'Sytuacja gdy dwa zrodla podaja sprzeczne informacje na ten sam temat.'},
      {term: 'gap', definition: 'Obszar, w ktorym Researcher nie znalazl wystarczajacych danych aby podjac decyzje.'}
    ],
    learningQuote: 'Godzina researchu oszczedza miesiac regretu - szesciu niezaleznych detektywow widzi wiecej niz jeden geniusz z Googlem.',
    realExample: 'Wyobraz sobie CTO ktory wybiera framework AI dla chatbota enterprise obslugujacego HR (poufne dane, SOC2, 100 tys pracownikow). Ma trzy opcje: LangChain, Haystack, custom. Pojedynczy Google search daje sprzeczne odpowiedzi. Research Swarm odpala szesciu researcherow - Tech docs czytaja oficjalne SLA, Reddit lowi realne bolaczki production userow, GitHub bada open Issues i release frequency, Forums zbieraja enterprise case studies. Critic laprze sprzecznosc (doc mowi "production-ready", GitHub pokazuje 200 open bugs). Synthesizer daje MANIFEST: rekomendacja z CERTAIN justification, alternatywa jako backup, ryzyka i migracja path. CTO podejmuje decyzje w 20 minut zamiast trzech miesiecy wahania.'
  },
  legacy: {
    tagline: 'Modernizacja starego systemu bez psucia tego co dziala - analiza, migracja, dual QA dla aplikacji sprzed lat',
    missionShort: 'Legacy Refactor dostarcza pelny pipeline modernizacji istniejacego systemu: analiza codebase, GitHub research dla wzorcow migracji, trzech builderow rownolegle (BE+FE+Integrator) i dual QA. Priorytet: backward compatibility i zero-downtime podczas gdy produkt dalej dziala w produkcji.',
    whoIs: 'Zespoly z codebase sprzed lat (jQuery, Rails 4, Angular 1, Python 2, monolith) ktory dusi rozwoj, ale nie mozna go wylaczyc bo na nim zarabia. Idealny gdy kazda zmiana w legacy budzi strach, a 42% czasu programisty idzie na grzebanie w starym kodzie zamiast dostarczania wartosci.',
    analogy: 'Ten preset to jak wymiana silnika samolotu w trakcie lotu - trzeba leciec dalej (production uptime) podczas gdy trzy ekipy wymieniaja krytyczne czesci po kolei, a dwoch inspektorow sprawdza czy nic nie przecieka.',
    howItWorks: [
      {label: 'Faza 1: Analiza + GitHub research', desc: 'Analityk mapuje codebase (dependencies, hot paths, dark corners), Researcher GitHub szuka podobnych migracji (jQuery to React, Rails 4 to 7, Python 2 to 3) i wyciaga wzorce strangler fig, adapter, branch-by-abstraction.'},
      {label: 'Faza 2: Planowanie migracji', desc: 'Planer dzieli modernizacje na iteracje, ustala kolejnosc (ktory modul pierwszy, ktory ostatni), identyfikuje feature flags i rollback plan dla kazdego kroku.'},
      {label: 'Faza 3: Trzech builderow parallel', desc: 'Backend Developer przepisuje serwisy, Frontend Developer migruje komponenty, Integrator buduje adaptery i strangler facades aby stare i nowe dzialalo rownolegle. Backward compatibility jest priorytetem.'},
      {label: 'Faza 4: Dual QA i validation', desc: 'QA Security sprawdza czy migracja nie wprowadzila nowych wektorow ataku, QA Quality waliduje funkcjonalna rownowartosc z oryginalem (same inputs, same outputs). Manager koordynuje.'}
    ],
    inputs: [
      'Istniejacy legacy codebase z dostepem do repo',
      'Target stack (co chcesz osiagnac: React 19, Rails 7, Python 3)',
      'Constrainty (maksymalny downtime, budget, timeline, compliance)',
      'Lista krytycznych sciezek biznesowych, ktorych nie mozna zepsuc'
    ],
    outputs: [
      'Zmodernizowany kod w nowym stacku dzialajacy obok starego',
      'Migration guide z krokami, rollback planem i feature flags',
      'Adaptery i strangler facades umozliwiajace stopniowa migracje',
      'Raport z dual QA (security i quality) pokazujacy zero regresji',
      'Dokumentacja wzorcow dla zespolu do kontynuacji modernizacji'
    ],
    does: [
      'Modernizuje legacy stack bez ubijania dzialajacej produkcji',
      'Wprowadza wzorzec strangler fig dla stopniowej podmiany',
      'Buduje adaptery dla wspolistnienia starego i nowego kodu',
      'Szuka w GitHub wzorcow od zespolow ktore zrobily podobna migracje',
      'Waliduje funkcjonalna rownowartosc (old vs new daje te same wyniki)',
      'Chroni przed regresja bezpieczenstwa (QA Security)',
      'Wdraza feature flags dla bezpiecznego rollout i rollback',
      'Redukuje dlug technologiczny bez wielkiego big bang rewrite'
    ],
    doesNotDo: [
      'Nie buduje nowych greenfield projektow (uzyj SaaS lub Startup MVP)',
      'Nie naprawia pojedynczych bugow w legacy (uzyj Quick Fix lub Bug Hunter)',
      'Nie migruje infrastruktury chmury (tylko warstwa aplikacji)',
      'Nie robi big bang rewrite (to anti-pattern dla tego presetu)',
      'Nie zastepuje dedykowanej debat nad architektura (uzyj Five Minds)',
      'Nie dziala gdy klient akceptuje dlugie przerwy - wtedy prostsze presety wystarcza',
      'Nie pasuje do projektow bez testowej sieci bezpieczenstwa (najpierw dodaj testy)'
    ],
    antiPatterns: [
      'Big Bang Rewrite - przepisanie calego systemu od zera po roku lazy i z 40% funkcji zgubionych',
      'Refactor Without Tests - modernizacja legacy bez characterization tests, regresje wychodza u klientow',
      'Silent Strangler - wdrazanie strangler fig bez monitoringu, stare dalej serwuje 70% ruchu po roku',
      'Happy Path Migration - migracja tylko glownych sciezek, edge cases lamia sie u enterprise klientow',
      'Git Archeology Only - czytanie kodu bez gadania z ludzmi ktorzy go pisali, powielanie zalozen'
    ],
    keyConcepts: [
      {term: 'Strangler fig', def: 'Wzorzec stopniowej podmiany legacy przez nowy kod, bez big bang rewrite.'},
      {term: 'Branch by abstraction', def: 'Technika wprowadzenia abstrakcji ktora umozliwia stare i nowe implementacje wspolnie.'},
      {term: 'Characterization tests', def: 'Testy dokumentujace aktualne zachowanie legacy, chroniace przed regresja podczas refactoru.'},
      {term: 'Feature flag', def: 'Przelacznik runtime umozliwiajacy stopniowy rollout nowej implementacji i szybki rollback.'},
      {term: 'Backward compatibility', def: 'Gwarancja ze stare integracje i klienty dalej dzialaja po modernizacji.'}
    ],
    stats: [
      {label: 'Agenci', value: '9'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.30-3.20'},
      {label: 'Czas', value: '16-26 min'}
    ],
    bestFor: [
      'Gdy masz legacy system ktory dusi rozwoj, ale nie mozna go wylaczyc',
      'Gdy migrujesz framework (jQuery to React, Angular 1 to modern)',
      'Gdy potrzebujesz stopniowej modernizacji z backward compatibility i feature flags'
    ],
    worstFor: [
      'Gdy to greenfield projekt bez istniejacego kodu (uzyj SaaS lub Startup)',
      'Gdy to pojedynczy bug w legacy (uzyj Quick Fix, nie przerost)',
      'Gdy akceptujesz kilkutygodniowy downtime - prostsze presety wystarcza'
    ],
    relatedPresets: ['migration_crew', 'plan_exec', 'api_modern'],
    glossary: [
      {term: 'legacy', definition: 'Kod odziedziczony, ktory dziala w produkcji ale trudno go rozwijac lub bezpiecznie zmieniac.'},
      {term: 'technical debt', definition: 'Koszt przyszlych zmian wynikajacy z kompromisow jakosciowych w przeszlosci.'},
      {term: 'strangler fig', definition: 'Wzorzec stopniowego oplatania legacy nowym kodem az stary zniknie.'},
      {term: 'adapter', definition: 'Warstwa tlumaczaca miedzy starym a nowym interfejsem dla backward compatibility.'},
      {term: 'monolith', definition: 'Aplikacja gdzie caly kod jest w jednym deployowalnym artefakcie, przeciwienstwo mikroserwisow.'}
    ],
    learningQuote: 'Legacy to nie kod zly - to kod ktory przezyl. Modernizacja polega na tym, zeby dalej przezyl, ale zaczal znowu pomagac.',
    realExample: 'Wyobraz sobie SaaS B2B sprzed osmiu lat: backend w Rails 4, frontend w jQuery i CoffeeScript, baza PostgreSQL 9. Nowi developerzy nie chca tego dotykac, dodanie prostego feature trwa tydzien. Ten preset analizuje hot paths, szuka na GitHub jak inni migrowali Rails 4 to 7, planuje strangler fig (nowe endpointy w Rails 7 obok starych), przepisuje krytyczne moduly w React rownolegle. Po 40 minut modernizacji pierwszy modul dziala w produkcji za feature flagiem, dwaj QA potwierdzaja zero regresji, a zespol widzi jasna sciezke do modernizacji reszty.'
  },
