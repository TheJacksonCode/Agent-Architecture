  microservices: {
    tagline: 'Rozbija monolit na ekosystem niezaleznych serwisow z 4 rownoleglymi builderami',
    missionShort: 'Microservices to zespol 11 agentow specjalizujacy sie w dekompozycji monolitu. Analizuje bounded contexts, planuje kolejnosc ekstrakcji, rownolegle buduje cztery serwisy i przechodzi potrojne QA. Dla zespolow enterprise, ktorych monolit stal sie zbyt duzy na utrzymanie i musi zostac podzielony na niezalezne serwisy bez psucia produkcji.',
    whoIs: 'Ten preset jest dla zespolu, ktory ma dzialajacy monolit i wie, ze musi go rozbic - deploymenty trwaja godziny, jeden bug blokuje caly system, zespoly siebie nawzajem blokuja. Wybierz go, gdy decyzja o migracji do mikroserwisow jest juz podjeta i potrzebujesz systematycznego podejscia: analiza coupling, plan ekstrakcji, rownolegly build i twarde bramki QA na kazdym kroku.',
    analogy: 'Microservices to jak urbanista przebudowujacy centrum handlowe w dzielnice sklepow - nie burzy wszystkiego naraz, tylko mapuje zaleznosci, wynosi po kolei piekarnie, apteke i bank do osobnych budynkow polaczonych drogami, tak zeby zaden klient nie zauwazyl przerwy.',
    howItWorks: [
      {label: 'Faza 1 - Planowanie i analiza', desc: 'Analyst skanuje monolit i mapuje bounded contexts wedlug DDD, wykrywa coupling i shared state. Planner tworzy Service Dependency DAG i ustala topologiczna kolejnosc ekstrakcji. Researcher bada wzorce API gateway, service mesh i inter-service communication.'},
      {label: 'Faza 2 - Rownolegly build 4 serwisow', desc: 'Czterech builderow (po jednym na rodzine serwisow) pracuje rownolegle. Kazdy wynosi swoj obszar: osobne repo, osobna baza, osobny deployment. Integrator dba o kontrakty API i wstecz kompatybilnosc.'},
      {label: 'Faza 3 - Integracja i API gateway', desc: 'Integrator konfiguruje API gateway (Kong, Envoy), zalatwia service discovery, circuit breakery i retry policies. Testuje komunikacje miedzy serwisami pod obciazeniem i sprawdza co sie dzieje gdy jeden serwis padnie.'},
      {label: 'Faza 4 - Triple QA gate', desc: 'QA Security audytuje komunikacje miedzyserwisowa, mTLS, secrets management. QA Quality testuje flowy biznesowe end-to-end przez kilka serwisow. QA Manager zbiera werdykty i wydaje koncowy GO/NO-GO na deployment.'}
    ],
    inputs: [
      'Istniejacy monolit z dostepem do kodu zrodlowego',
      'Lista bolaczek (dlugi deployment, blokady miedzyzespolowe, wspolny punkt awarii)',
      'Kryteria podzialu (bounded contexts, zespoly, cykle zycia)',
      'Ograniczenia runtime (Kubernetes vs ECS, czy mozemy miec downtime)'
    ],
    outputs: [
      'Mapa bounded contexts i Service Dependency DAG',
      'Plan topologicznej ekstrakcji krok po kroku',
      '4 niezalezne serwisy z wlasnymi repo, baza i deploymentem',
      'Skonfigurowany API gateway z service discovery',
      'Raport potrojnego QA z werdyktem GO/NO-GO'
    ],
    does: [
      'Mapuje bounded contexts i dependency graph monolitu',
      'Planuje topologiczna kolejnosc ekstrakcji bez psucia produkcji',
      'Rownolegle buduje cztery niezalezne serwisy',
      'Konfiguruje API gateway, service discovery i circuit breakery',
      'Implementuje wzorce resilience (retry, timeout, bulkhead)',
      'Audytuje bezpieczenstwo komunikacji miedzyserwisowej',
      'Testuje flowy biznesowe end-to-end przez wiele serwisow',
      'Chroni przed antywzorcem distributed monolith'
    ],
    doesNotDo: [
      'Nie jest dla greenfield projektow (od tego jest SaaS albo Standard)',
      'Nie pisze kodu od zera - dziala na istniejacym monolicie',
      'Nie zajmuje sie pojedynczym dodanym serwisem (overkill)',
      'Nie tworzy frontend aplikacji (ten preset jest backend-focused)',
      'Nie zastapi doswiadczonego SRE przy production cutover',
      'Nie generuje business casea dla decyzji o migracji',
      'Nie rozwiaze problemow organizacyjnych - tylko techniczne'
    ],
    antiPatterns: [
      'Distributed Monolith - rozbicie na serwisy ktore nadal sa ciasno sprzezone (62% pierwszych prob wedlug raportow enterprise)',
      'Big Bang Extraction - wyniesienie wszystkich serwisow naraz zamiast topologicznie',
      'Shared Database - kazdy serwis nadal gada z ta sama baza zamiast miec wlasna',
      'Missing Circuit Breaker - brak wzorcow resilience powoduje kaskadowe awarie',
      'Ignored Bounded Context - podzial po warstwach technicznych zamiast po domenie biznesowej'
    ],
    keyConcepts: [
      {term: 'Bounded Context', def: 'Obszar domeny biznesowej z wlasnym modelem i jezykiem, podstawa podzialu na serwisy wedlug DDD.'},
      {term: 'Service Dependency DAG', def: 'Graf zaleznosci miedzy serwisami uzywany do ustalenia kolejnosci ekstrakcji.'},
      {term: 'API Gateway', def: 'Jeden punkt wejscia dla wszystkich klientow, odpowiedzialny za routing, auth i rate limiting.'},
      {term: 'Circuit Breaker', def: 'Wzorzec chroniacy przed kaskadowymi awariami - gdy serwis pada, gateway przerywa ruch zamiast zalewac go requestami.'},
      {term: 'Strangler Fig', def: 'Wzorzec migracji gdzie stopniowo wynosimy funkcje z monolitu, az oryginal mozemy usunac.'}
    ],
    stats: [
      {label: 'Agenci', value: '11'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.70-4.25'},
      {label: 'Czas', value: '8-15 min'}
    ],
    bestFor: [
      'Gdy monolit stal sie zbyt duzy i zespoly siebie blokuja',
      'Gdy potrzebujesz niezaleznego skalowania roznych czesci systemu',
      'Gdy bounded contexts sa juz wyrazne i chcesz je wyniesc'
    ],
    worstFor: [
      'Gdy zaczynasz nowy projekt (greenfield) - zacznij od monolitu',
      'Gdy twoja apka ma 5 uzytkownikow (overkill)',
      'Gdy nie masz doswiadczenia z rozproszonymi systemami (nauka przez migracje jest bolesna)'
    ],
    relatedPresets: ['legacy', 'migration_crew', 'api_modern'],
    glossary: [
      {term: 'monolit', definition: 'Aplikacja zlozona w jeden duzy deployable, gdzie wszystkie moduly dzialaja w tym samym procesie.'},
      {term: 'DDD', definition: 'Domain-Driven Design - metodologia modelowania oprogramowania wokol obszarow biznesowych.'},
      {term: 'service mesh', definition: 'Warstwa infrastruktury zarzadzajaca komunikacja miedzy serwisami (Istio, Linkerd).'},
      {term: 'mTLS', definition: 'Mutual TLS - obie strony komunikacji uwierzytelniaja sie certyfikatami, standard w microservices.'},
      {term: 'topological sort', definition: 'Algorytm porzadkujacy wezly DAG tak, zeby zaleznosci byly wprowadzane przed zaleznymi.'}
    ],
    learningQuote: 'Mikroserwisy nie sa rozwiazaniem problemow technicznych - sa rozwiazaniem problemow organizacyjnych, ktore ujawniaja sie przez techniczne blokady.',
    realExample: 'Wyobraz sobie ze prowadzisz platforme e-commerce z monolitem ktory ma 500 tysiecy linii kodu i 40 deweloperow. Deployment trwa 2 godziny, jeden bug w modulu platnosci blokuje cala sprzedaz. Uruchamiasz Microservices - Analyst mapuje bounded contexts: katalog, zamowienia, platnosci, dostawy, uzytkownicy. Planner ustala kolejnosc: najpierw platnosci (highest pain), potem zamowienia, dostawy, katalog. Czterech builderow rownolegle wynosi cztery serwisy. Integrator konfiguruje API gateway z circuit breakerami. QA testuje co sie stanie gdy platnosci padna - reszta sklepu dalej dziala. Po 12 minutach masz plan, dzialajace serwisy i raport GO/NO-GO z kolejnoscia deploymentow na najblizsze 3 miesiace.'
  },
  full: {
    tagline: 'Gold Standard 13 agentow w 5-warstwowej hierarchii dla projektow mission-critical',
    missionShort: 'Full Hierarchy to architektura referencyjna calego systemu - 13 agentow w pieciu warstwach od strategii po triple QA. Kazda warstwa ma wlasna jasno okreslona odpowiedzialnosc: core, planowanie, research, build, QA. Dla enterprise projektow gdzie koszt bledu wielokrotnie przewyzsza koszt dodatkowej analizy i gdzie pominiecie jednego kroku moze kosztowac miesiace pracy.',
    whoIs: 'Ten preset jest dla zespolow pracujacych nad projektami mission-critical gdzie "chyba jest OK" nie wystarcza. Wybierz go gdy robisz projekt wymagajacy formalnego audytu, compliance albo gdy koszt awarii liczy sie w setkach tysiecy dolarow. To jest archetyp wobec ktorego mierzy sie wszystkie inne presety - gdy masz watpliwosci czy jakis inny preset ma wszystko czego trzeba, porownaj go z Full Hierarchy.',
    analogy: 'Full Hierarchy to jak pelna produkcja filmowa z najwyzszej polki - rezyser, scenarzysta, producent, trzech researcherow, operator, scenograf, aktor, montazysta i trzech recenzentow, kazdy niezbedny, bo film nie wychodzi do kin zanim szef studia nie powie GO.',
    howItWorks: [
      {label: 'Warstwa 0 - Core (Strategia)', desc: 'Orkiestrator przyjmuje zadanie, analizuje jego zakres, wyznacza bramy decyzyjne i nadzoruje caly pipeline. Jeden agent Opus z dostepem do kazdej fazy - Mission Control projektu.'},
      {label: 'Warstwa 1-2 - Planning i Research', desc: 'Analyst dekomponuje wymagania i mapuje zaleznosci, Planner tworzy harmonogram i alokacje zasobow. Potem trzech researcherow rownolegle: Tech bada stack, UX trendy wizualne, Docs oficjalne wytyczne i compliance. Wynik: MANIFEST + plan budowy.'},
      {label: 'Warstwa 3 - Build Squad (4 rownolegle)', desc: 'Backend Dev implementuje logike biznesowa i API. Frontend Dev buduje interfejs uzytkownika. Designer tworzy spojny system wizualny. Integrator laczy trzy strumienie i weryfikuje dzialanie end-to-end. Wszyscy pracuja rownolegle pod koordynacja orkiestratora.'},
      {label: 'Warstwa 4 - Triple QA Gate', desc: 'QA Security audytuje bezpieczenstwo (OWASP, data protection, auth). QA Quality testuje flowy uzytkownika, regresje i edge cases. QA Manager zbiera werdykty i wydaje formalny GO/NO-GO z uzasadnieniem. Zadna funkcja nie wychodzi bez potrojnego podpisu.'}
    ],
    inputs: [
      'Specyfikacja mission-critical projektu z wymaganiami biznesowymi',
      'Constrainty techniczne i compliance (SOX, PCI, HIPAA, RODO)',
      'Kryteria sukcesu i akceptacji (performance, availability, security)',
      'Istniejaca dokumentacja architektury lub brownfield constrainty'
    ],
    outputs: [
      'MANIFEST wymagan i plan 5-warstwowej egzekucji',
      'Trzy raporty research (Tech + UX + Docs) z wyborem stacku',
      'Kompletny build: backend, frontend, design, integracja',
      'Trzy raporty QA (Security + Quality + Manager) z werdyktem GO/NO-GO',
      'Audit trail ze wszystkich warstw dla formalnego compliance'
    ],
    does: [
      'Przeprowadza pelny cykl od strategii po deployment bez luk',
      'Zapewnia audit trail kazdej decyzji dla formalnego compliance',
      'Pokrywa trzy perspektywy researchu (Tech + UX + Docs)',
      'Rownolegle buduje cztery strumienie (BE + FE + Design + Integration)',
      'Wprowadza potrojny gate QA (Security + Quality + Manager)',
      'Sluzy jako architektura referencyjna dla porownan z innymi presetami',
      'Zatrzymuje sie przy kazdej bramie decyzyjnej na weryfikacje',
      'Gwarantuje, ze zadna warstwa nie zostanie pominieta'
    ],
    doesNotDo: [
      'Nie jest dla prostych zadan (massive overkill dla pojedynczego buga)',
      'Nie nadaje sie do pilnego delivery (pelny cykl zajmuje godziny)',
      'Nie pasuje do ograniczonych budzetow (13 agentow = wysoki koszt)',
      'Nie prototypuje - to preset do produkcji, nie do eksperymentow',
      'Nie zastapi ludzkich decyzji biznesowych przy bramach',
      'Nie przeprowadza gleobkiego researchu 6+ zrodel (od tego jest Deep)',
      'Nie zawiera adversarial debate (od tego jest Five Minds)'
    ],
    antiPatterns: [
      'Hierarchy Overkill - uzywanie Full Hierarchy do zadania, ktore zrobilyby 3 agenty (orkiestra symfoniczna grajaca Happy Birthday)',
      'Gate Skipping - przeskakiwanie bramek decyzyjnych bo "chyba jest OK"',
      'Research Shortcut - pominiecie jednej z trzech perspektyw researchu',
      'QA Collapse - lacznie Security, Quality i Managera w jednego agenta dla oszczednosci',
      'Missing Audit Trail - nieudokumentowanie decyzji, przez co compliance nie ma na czym sie oprzec'
    ],
    keyConcepts: [
      {term: '5-Layer Hierarchy', def: 'Pieciopoziomowa struktura Core-Planning-Research-Build-QA gdzie kazda warstwa ma jedna wyrazna odpowiedzialnosc.'},
      {term: 'Hub-and-Spoke + Pipeline + Parallel Fan', def: 'Kombinacja trzech wzorcow: hub centralny (Orkiestrator), sekwencyjny pipeline (warstwy) i rownolegle fan-out (3 research, 4 build, 3 QA).'},
      {term: 'Triple QA Gate', def: 'Trzy niezalezne kontrole jakosci - security, quality, manager - kazda z prawem weta.'},
      {term: 'Audit Trail', def: 'Dokumentacja kazdej decyzji na kazdej warstwie, wymagana dla formalnego compliance.'},
      {term: 'Reference Architecture', def: 'Wzorcowa architektura wobec ktorej mierzy sie wszystkie inne presety - jesli jakis preset jest gorszy, pokazuje czego brakuje.'}
    ],
    stats: [
      {label: 'Agenci', value: '13'},
      {label: 'Fazy', value: '5'},
      {label: 'Koszt est.', value: '$1.65-4.20'},
      {label: 'Czas', value: '10-15 min'}
    ],
    bestFor: [
      'Gdy projekt jest mission-critical i blad kosztuje wielokrotnie wiecej niz dodatkowa analiza',
      'Gdy potrzebujesz formalnego audit trail dla compliance (SOX, PCI, HIPAA)',
      'Gdy robisz enterprise architecture i potrzebujesz zerowych luk w procesie'
    ],
    worstFor: [
      'Gdy pracujesz nad prosta funkcja ktora nie wymaga 13 agentow',
      'Gdy masz napiety deadline i potrzebujesz wyniku w 5 minut',
      'Gdy budzet jest ograniczony i kazdy tysiac tokenow sie liczy'
    ],
    relatedPresets: ['deep', 'fullstack_premium', 'standard'],
    glossary: [
      {term: 'mission-critical', definition: 'System gdzie awaria ma powazne konsekwencje finansowe, prawne lub bezpieczenstwa.'},
      {term: 'compliance', definition: 'Zgodnosc z regulacjami (GDPR, HIPAA, PCI-DSS, SOX) wymagajaca formalnego audit trail.'},
      {term: 'Gold Standard', definition: 'Wzorzec referencyjny - najwyzszy standard wobec ktorego porownuje sie alternatywy.'},
      {term: 'gate decision', definition: 'Punkt w procesie gdzie nastepuje formalna akceptacja przejscia do nastepnej fazy.'},
      {term: 'fan-out', definition: 'Wzorzec gdzie jedno wejscie rozdziela sie na wiele rownoleglych strumieni pracy.'}
    ],
    learningQuote: 'Full Hierarchy nie istnieje po to, zebys jej zawsze uzywal - istnieje po to, zebys wiedzial co pominales gdy wybierasz mniejszy preset.',
    realExample: 'Wyobraz sobie ze budujesz platforme bankowosci internetowej dla klienta enterprise. Wymagania: PCI-DSS compliance, audit trail kazdej decyzji, dual sign-off na wszystkie zmiany, pelny pentest przed deployment. Uruchamiasz Full Hierarchy - Orkiestrator przyjmuje specyfikacje, Analyst dekomponuje na moduly, Planner tworzy harmonogram, trzech researcherow bada stack (Tech), wzorce fintech UX i dokumentacje PCI-DSS. Cztery squadry buduja rownolegle: backend transakcji, frontend panelu, design spokojnej palety, integrator laczy z zewnetrzynmi API. Triple QA audytuje bezpieczenstwo, testuje flowy i wystawia formalne GO/NO-GO z uzasadnieniem. Po 12 minutach masz dzialajacy moduI z kompletnym audit trail gotowym do pokazania audytorowi.'
  },
  deep: {
    tagline: 'Pelna orkiestra 18 agentow - maksymalny research 6 strumieni + potrojne QA',
    missionShort: 'Deep Research+Build to maksymalna konfiguracja non-ultimate: 18 agentow w pelnej orkiestrze. Szesciu researcherow rownolegle przeszukuje rozne zrodla (Tech, UX, Reddit, GitHub, Forums, X/Twitter), Critic ocenia jakosc kazdego raportu, Synthesizer laczy wszystko w spojny plan, czterech builderow z Integratorem buduje rozwiazanie, a potrojne QA wydaje formalny GO FOR LAUNCH. Dla enterprise gdzie implementacja wymaga naprawde gruntownego przygotowania.',
    whoIs: 'Ten preset jest dla zespolow, ktore staja przed decyzjami technologicznymi o konsekwencjach na cala platforme. Wybierz go gdy koszt zlej decyzji (wybor zlego frameworka, zlej bazy, zlego dostawcy) liczy sie w setkach tysiecy dolarow i miesiacach pracy. Idealny do due diligence technologicznego przed duza inwestycja, do enterprise platform creation, do multi-vendor evaluation powyzej 500 tysiecy dolarow i do regulowanych branz gdzie compliance wymaga wieloobrazowego researchu.',
    analogy: 'Deep Research+Build to jak start misji kosmicznej NASA - szesc zespolow naukowych analizuje propulsje, nawigacje, komunikacje, life-support, ladowanie i powrot rownolegle, recenzent waliduje kazdy raport, glowny naukowiec laczy wszystko w plan misji, ekipy inzynierskie buduja kapsuIe, a potrojna inspekcja bezpieczenstwa wydaje GO FOR LAUNCH.',
    howItWorks: [
      {label: 'Faza 1 - Fan-out Research (6 strumieni)', desc: 'Szesciu researcherow startuje rownolegle w izolacji (bez komunikacji miedzy soba, zapobiega groupthink). Researcher Tech bada oficjalne docsy i benchmarki, UX trendy Dribbble/Behance, Reddit niefiltrowane opinie, GitHub kod i issues, Forums tutoriale i lessons learned, X/Twitter szybkie trendy i breaking news.'},
      {label: 'Faza 2 - Critic Evaluation + Synthesis', desc: 'Research Critic czyta wszystkie 6 raportow i ocenia je pod katem jakosci dowodow, spojnosci z innymi zrodlami i confidence scores. Odsyla slabe raporty do poprawy. Synthesizer laczy zwalidowane raporty w jeden spojny plan budowy z rekomendacjami stacku i trade-offami.'},
      {label: 'Faza 3 - Build Squad (4 + Integrator)', desc: 'Czterech builderow pracuje rownolegle: Backend Dev stawia API i logike biznesowa, Frontend Dev interfejs uzytkownika, Feature Dev specyficzne funkcje biznesowe, Designer system wizualny. Integrator laczy wszystko i weryfikuje flowy end-to-end.'},
      {label: 'Faza 4 - Triple QA Gate', desc: 'QA Security audytuje bezpieczenstwo, QA Quality testuje flowy i regresje, QA Manager zbiera werdykty i wydaje formalny GO/NO-GO z uzasadnieniem. Trzy niezalezne kontrole, kazda z prawem weta.'}
    ],
    inputs: [
      'Strategiczne pytanie technologiczne lub duzy zakres enterprise',
      'Kryteria oceny i constrainty (budzet, timeline, compliance)',
      'Lista potencjalnych rozwiazan do porownania (jesli sa znane)',
      'Dostep do zrodel i dokumentacji (linki, repozytoria, specyfikacje)'
    ],
    outputs: [
      '6 niezaleznych raportow researchu z confidence scores i zrodlami',
      'Raport Critic ze scoringiem kazdego z 6 raportow (0.0-1.0)',
      'Syntezyczny plan budowy z rekomendacja stacku i trade-offami',
      'Kompletny build: backend + frontend + features + design + integracja',
      'Potrojny raport QA z formalnym GO/NO-GO'
    ],
    does: [
      'Przeprowadza research z szesciu niezaleznych zrodel rownolegle',
      'Waliduje kazdy raport przez niezaleznego Critica',
      'Osiaga 76.9% paralelizacji (najwyzszy wskaznik w systemie non-ultimate)',
      'Laczy zrodla formalne (docs) z niefiltrowanymi (Reddit, GitHub)',
      'Synthetizer tworzy spojny plan z czesto sprzecznych raportow',
      'Buduje rownolegle cztery strumienie kodu pod koordynacja integratora',
      'Wydaje potrojny GO/NO-GO dla mission-critical deploymentow',
      'Dostarcza pelny audit trail wszystkich decyzji'
    ],
    doesNotDo: [
      'Nie jest dla standardowego feature developmentu (overkill)',
      'Nie pasuje do prototypow (brak czasu na 18 agentow)',
      'Nie prowadzi debaty ekspertow (od tego jest Five Minds)',
      'Nie zawiera bram Human-in-the-Loop (od tego jest Deep Five Minds)',
      'Nie jest dla ograniczonego budzetu - najdrozszy preset non-ultimate',
      'Nie robi pojedynczego szybkiego researchu (od tego jest Recon)',
      'Nie szkoli modeli ani nie eksperymentuje z hiperparametrami'
    ],
    antiPatterns: [
      'Research Waste - uzywanie Deep do pytania, na ktore Solo odpowiedzialby w minute',
      'Isolation Break - pozwalanie researcherom czytac swoje raporty (niszczy izolacje = groupthink)',
      'Critic Bypass - pomijanie Critica i przekazywanie surowych raportow bezposrednio do Synthesizer',
      'Parallel Overload - wymuszanie synchronizacji na rownoleglych researcherach zamiast akceptacji asynchronicznosci',
      'Missing Synthesis - traktowanie 6 raportow jako wynik koncowy, zamiast syntezy w jeden plan'
    ],
    keyConcepts: [
      {term: 'Full Orchestra', def: 'Pattern 18 agentow w 4 warstwach gdzie kazda warstwa ma rownoleglosc: Research 6x, Build 4x, QA 3x.'},
      {term: 'Researcher Isolation', def: 'Zasada, ze researcherzy nie czytaja swoich raportow - zapobiega groupthink i gwarantuje niezalezne perspektywy.'},
      {term: 'Critic Evaluation', def: 'Niezalezna walidacja jakosci kazdego raportu researchu z prawem odeslania do poprawy.'},
      {term: 'Confidence Scores', def: 'Oceny 0.0-1.0 dla kazdego findingu, pozwalaja Synthesizerowi wazyc sprzeczne zrodla.'},
      {term: 'Parallelization Efficiency', def: 'Odsetek agentow ktorzy moga pracowac rownolegle - w Deep to 76.9% (14 z 18).'}
    ],
    stats: [
      {label: 'Agenci', value: '18'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$2.20-5.55'},
      {label: 'Czas', value: '10-25 min'}
    ],
    bestFor: [
      'Gdy podejmujesz decyzje technologiczna o konsekwencjach na cala platforme',
      'Gdy robisz due diligence przed inwestycja powyzej 500 tysiecy dolarow',
      'Gdy regulated industry wymaga wielozrodlowego researchu z audit trail'
    ],
    worstFor: [
      'Gdy robisz standard feature development (Standard preset wystarczy)',
      'Gdy prototypujesz i nie masz czasu na 18 agentow',
      'Gdy budzet nie pozwala na najdrozszy non-ultimate preset'
    ],
    relatedPresets: ['research', 'full', 'deep_five_minds'],
    glossary: [
      {term: 'fan-out', definition: 'Wzorzec gdzie jedno zadanie rozdziela sie na wiele rownoleglych strumieni pracy.'},
      {term: 'groupthink', definition: 'Zjawisko gdzie grupa dochodzi do konsensusu przez presje, nie przez rzetelna ocene - niszczy jakosc decyzji.'},
      {term: 'confidence score', definition: 'Liczba 0.0-1.0 wyrazajaca pewnosc agenta co do danego findingu.'},
      {term: 'synthesizer', definition: 'Agent laczacy wiele raportow w jeden spojny plan, rozwiazuje sprzecznosci miedzy zrodlami.'},
      {term: 'triple QA', definition: 'Trzy niezalezne gate kontrolne (security, quality, manager) kazdy z prawem weta.'}
    ],
    learningQuote: 'Szesc niezaleznych perspektyw jest lepsze niz jedna ekspercka opinia - nie dlatego, ze eksperci sie myla, tylko dlatego, ze zaden ekspert nie widzi calego slonia.',
    realExample: 'Wyobraz sobie ze jestes CTO startupu fintech ktory planuje budowe platformy platnosciowej dla 50 krajow. Stawka: 2 miliony dolarow inwestycji, 6 miesiecy pracy zespolu. Uruchamiasz Deep Research+Build. Szesciu researcherow rownolegle: Tech bada Stripe/PayPal/Adyen docs i PCI-DSS, UX wzorce checkoutu, Reddit niefiltrowane opinie developerow o trudnosci integracji, GitHub issues i workaroundy, Forums prawne o 50 krajach, X/Twitter breaking news o zmianach API. Critic ocenia raporty. Synthesizer wybiera: Adyen dla 50 krajow + wlasny checkout + Terraform dla infra. Cztery squadry buduja POC. Triple QA wydaje GO. Po 20 minutach masz raport due diligence ktorym obronisz te 2 miliony przed zarzadem plus dzialajacy prototyp platnosci.'
  },
  five_minds: {
    tagline: 'Strukturalna debata 4 ekspertow + Devil\'s Advocate dla decyzji architektonicznych',
    missionShort: 'Five Minds Protocol to jedyny preset w systemie z mechanizmem adversarial debate. Czterech ekspertow domenowych broni swoich pozycji z dowodami, piaty - Devil\'s Advocate - systematycznie atakuje kazde twierdzenie, a Synthesizer wydaje Gold Solution ktory transcenduje oryginalny konflikt. Dla strategicznych decyzji technologicznych gdzie nie ma oczywistego zwyciezcy i gdzie konsensus bylby gorszy niz dialektyka.',
    whoIs: 'Ten preset jest dla zespolow, ktore staja przed kontrowersyjna decyzja architektoniczna gdzie kazdy obozu ma silne argumenty i nie ma oczywistego wyboru. Wybierz go gdy jestes w pulapce analysis paralysis, gdy twoi inzynierowie kloca sie od tygodni bez rozstrzygniecia albo gdy boisz sie, ze konsensus zespolu wygladzi ostre krawedzie i podejmiecie suboptymalna decyzje.',
    analogy: 'Five Minds Protocol to jak rozprawa sadowa z adwokatem diabla - czterech swiadkow-ekspertow sklada sprzeczne zeznania z dowodami, piaty kwestionuje kazde twierdzenie, a sedzia wydaje wyrok lepszy niz propozycja ktorejkolwiek ze stron.',
    howItWorks: [
      {label: 'Faza 1 - Research ground truth', desc: 'Trzech researcherow przygotowuje material dowodowy dla ekspertow: dane rynkowe, benchmarki techniczne, opinie uzytkownikow. Kazdy dostaje te same dane w izolacji, zeby wszyscy debatowali na tej samej podstawie faktow.'},
      {label: 'Faza 2 - Opening statements (4 ekspertow)', desc: 'Czterech ekspertow rownolegle formuluje swoje otwarcia. Pragmatyk pyta "czy to wykonalne?". Innowator "czy to najlepsze?". Analityk Danych "co mowia liczby?". Rzecznik Uzytkownika "czy user to zrozumie?". Kazdy broni swojej pozycji z dowodami.'},
      {label: 'Faza 3 - Adversarial debate + Devil\'s Advocate', desc: 'Eksperci czytaja swoje otwarcia i przygotowuja rebuttals. Devil\'s Advocate (piaty, Cien) systematycznie atakuje KAZDA pozycje - nie reprezentuje zadnej strony, jego zadaniem jest tylko kwestionowanie. Szuka ukrytych zalozen, stronniczych dowodow i slepych punktow. Kilka rund wymiany.'},
      {label: 'Faza 4 - Gold Solution + Build', desc: 'Synthesizer (Opus) mediuje debate i wydaje Gold Solution - tworcza synteza ktora nie jest kompromisem ani wygrana jednego obozu, tylko rozwiazaniem lepszym niz wszystkie oryginalne propozycje. Build squad implementuje decyzje.'}
    ],
    inputs: [
      'Kontrowersyjna decyzja architektoniczna (framework, baza, wzorzec, strategia)',
      'Konkurujace wymagania lub cele (szybkosc vs niezawodnosc, cena vs jakosc)',
      'Dostepne opcje lub kandydaci do debaty (min 3 do porownania)',
      'Kontekst biznesowy i stakes (co tracimy jesli wybierzemy zle)'
    ],
    outputs: [
      'Otwarcia 4 ekspertow z dowodami i argumentacja',
      'Rebuttals i kontrargumenty z rundy debaty',
      'Raport Devil\'s Advocate z krytyka kazdej pozycji',
      'Gold Solution - tworcza synteza wydana przez Synthesizera',
      'Zaimplementowany build na podstawie Gold Solution'
    ],
    does: [
      'Uruchamia jedyny w systemie mechanizm adversarial debate',
      'Wymusza argumentacje zamiast zgadywania lub intuicji',
      'Chroni przed groupthink i premature consensus',
      'Produkuje Gold Solution transcendujacy oryginalne pozycje',
      'Testuje pozycje pod naporem systematycznej krytyki',
      'Ujawnia ukryte zalozenia i stronnicze dowody',
      'Dostarcza formalny audit trail decyzji dla interesariuszy',
      'Buduje implementacje na bazie zwyciezkiego rozwiazania'
    ],
    doesNotDo: [
      'Nie jest dla prostej implementacji z oczywistym wyborem (overkill)',
      'Nie przyspieszy pilnego delivery - debate wymaga czasu',
      'Nie zastapi decyzji biznesowych wymagajacych kontekstu organizacyjnego',
      'Nie generuje konsensusu - produkuje Gold Solution z konfliktu',
      'Nie prowadzi gleobkiego researchu 6+ zrodel (od tego jest Deep)',
      'Nie wykonuje podwojnej debaty przed i po build (od tego jest Deep Five Minds)',
      'Nie jest dla zespolu ktory nie jest gotowy na konfrontacje intelektualna'
    ],
    antiPatterns: [
      'Fake Debate - eksperci ktorzy zgadzaja sie zbyt szybko, bez genuine konfliktu (znak groupthink)',
      'Toothless Devil - Devil\'s Advocate ktory mowi "wyglada dobrze" zamiast systematycznie kwestionowac',
      'Compromise Trap - Synthesizer produkujacy kompromis zamiast Gold Solution (kompromis jest gorszy niz oryginal)',
      'Missing Evidence - eksperci debatujacy na podstawie opinii zamiast na podstawie ground truth z researchu',
      'Consensus Rush - zamykanie debaty po jednej rundzie zamiast iteracji az pozycje sa prawdziwie przetestowane'
    ],
    keyConcepts: [
      {term: 'Adversarial Debate', def: 'Strukturalny konflikt gdzie eksperci broni pozycji z dowodami, a niezalezny oponent systematycznie je kwestionuje.'},
      {term: 'Gold Solution', def: 'Synteza transcendujaca oryginalny konflikt - rozwiazanie lepsze niz propozycja ktorejkolwiek ze stron debaty.'},
      {term: 'Devil\'s Advocate Role', def: 'Agent ktory NIE reprezentuje zadnej strony - jego jedyne zadanie to kwestionowanie kazdego twierdzenia.'},
      {term: 'Dialectic vs Consensus', def: 'Dialektyka produkuje lepsze decyzje niz konsensus, bo nie wygladza ostrych krawedzi argumentow.'},
      {term: 'Ground Truth Grounding', def: 'Zasada, ze debate musi byc oparta o twarde dane z researchu, nie o opinie lub intuicje.'}
    ],
    stats: [
      {label: 'Agenci', value: '14'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.80-4.50'},
      {label: 'Czas', value: '7-15 min'}
    ],
    bestFor: [
      'Gdy stajesz przed kontrowersyjna decyzja architektoniczna bez oczywistego zwyciezcy',
      'Gdy zespol kloci sie od tygodni i nie moze dojsc do rozstrzygniecia',
      'Gdy boisz sie, ze konsensus zespolu wygladzi ostre krawedzie dobrych argumentow'
    ],
    worstFor: [
      'Gdy masz prosta implementacja z oczywistym wyborem (debate to strata czasu)',
      'Gdy potrzebujesz wyniku w 5 minut (debate wymaga rund)',
      'Gdy zespol nie jest gotowy na intelektualna konfrontacje i woli konsensus'
    ],
    relatedPresets: ['five_minds_strategic', 'deep_five_minds', 'research'],
    glossary: [
      {term: 'adversarial', definition: 'Przeciwstawny, konfrontacyjny - wzajemne atakowanie pozycji w celu ich testowania.'},
      {term: 'dialektyka', definition: 'Metoda dochodzenia do prawdy przez sprzeczne argumenty i synteze, nie przez kompromis.'},
      {term: 'rebuttal', definition: 'Kontrargument - odpowiedz na argument przeciwnika w debacie.'},
      {term: 'devil\'s advocate', definition: 'Osoba celowo kwestionujaca pozycje, nawet jesli sama sie z nia zgadza, zeby ja przetestowac.'},
      {term: 'premature consensus', definition: 'Przedwczesne porozumienie w grupie, ktore pomija istotne argumenty - objaw groupthink.'}
    ],
    learningQuote: 'Najlepsze decyzje nie rodza sie z konsensusu, tylko z kontrolowanego konfliktu gdzie kazda pozycja musi obronic sie pod systematycznym atakiem.',
    realExample: 'Wyobraz sobie ze jestes architektem platformy i musisz zdecydowac: monolit czy mikroserwisy dla nowego produktu. Twoj zespol kloci sie od miesiaca, kazdy ma dobre argumenty. Uruchamiasz Five Minds. Trzech researcherow przygotowuje dane: benchmarki Shopify (monolit), Netflix (microservices), DORA metrics. Pragmatyk broni monolitu: "szybsze MVP, latwiejsze debugowanie". Innowator broni mikroserwisow: "przyszlosciowe, niezalezne skalowanie". Analityk Danych pokazuje DORA metrics: 60% zespolow < 50 developerow dzialo szybciej na monolicie. Rzecznik Uzytkownika: "user nie wie co jest pod spodem". Devil atakuje kazdego: "czy wasze benchmarki sa z 2024 czy 2018? czy wasz zespol ma juz doswiadczenie z mikroserwisami?". Synthesizer wydaje Gold Solution: "Modularny monolit z wyraznymi bounded contexts, przygotowany do ekstrakcji do mikroserwisow gdy zespol urosnie powyzej 30 developerow". Build squad implementuje. Zamiast kompromisu masz decyzje lepsza niz kazda oryginalna propozycja.'
  },
  deep_five_minds: {
    tagline: 'ULTIMATE 27 agentow - Deep Research + DWUKROTNA debata + 3 bramy HITL dla decyzji nieodwracalnych',
    missionShort: 'Deep Five Minds to jedyny preset w Tier 5 ULTIMATE i najwiekszy w calym systemie. 27 agentow w 6 fazach: Deep Research (6 researcherow + Critic), Five Minds #1 (debate PRZED buildem), Build (5 agentow + Designer + Integrator), Five Minds #2 (debate PO buildzie), Triple QA. Miedzy fazami 3 bramy Human-in-the-Loop z timerem 120 sekund. Dla decyzji nieodwracalnych gdzie stawka przekracza 500 tysiecy dolarow i gdzie skutki beda odczuwane przez lata.',
    whoIs: 'Ten preset jest dla liderow stajacych przed decyzjami o konsekwencjach na 5+ lat, gdzie blad architektoniczny jest nieodwracalny i gdzie stawka liczy sie w setkach tysiecy dolarow lub wiecej. Wybierz go gdy robisz mission-critical architecture dla fintech, healthcare lub aerospace, gdy podejmujesz decyzje inwestycyjna powyzej 500K dolarow albo gdy regulacje wymagaja formalnego dwukrotnego audytu z udzialem czlowieka. Nie jest to preset do codziennego uzytku - to bron strategiczna.',
    analogy: 'Deep Five Minds to jak budowa wiezowca z podwojna inspekcja i trzema punktami kontrolnymi - szesc zespolow bada grunt i sejsmike, inwestor zatwierdza kierunek, pieciu architektow debatuje projekt, inwestor zatwierdza plan, ekipy buduja, ci SAMI pieciu ekspertow debatuje zbudowany obiekt, inwestor zatwierdza zakres testow, a trzech inspektorow podpisuje odbior koncowy.',
    howItWorks: [
      {label: 'Faza 0-1 - Strategia + Deep Research (10 agentow)', desc: 'Orkiestrator uruchamia zadanie. Analyst dekomponuje, Planner tworzy DAG, Synthesizer (Opus, 95% load, mozg systemu) przygotowuje centralna pamiec w MANIFEST.md. Szesciu researcherow rownolegle (Tech, Reddit, UX, GitHub, Forums, X/Twitter), Research Critic ocenia kazdy raport scores 0-1.0. BRAMA HITL #1: czlowiek zatwierdza kierunek researchu.'},
      {label: 'Faza 2 - Five Minds #1 Research Evaluation (6 agentow)', desc: 'Pierwsza debate PRZED buildem. Pragmatyk, Innowator, Analityk Danych, Rzecznik Uzytkownika oceniaja surowy research. Devil\'s Advocate atakuje kazda rekomendacje. Synthesizer mediuje i wydaje Gold Solution #1 - CO budowac i JAK. BRAMA HITL #2: czlowiek zatwierdza plan budowy z opcjami aprobata/modyfikacja/odrzucenie.'},
      {label: 'Faza 3 - Build Squad (7 agentow)', desc: 'Pieciu builderow pracuje rownolegle: Backend Dev, Frontend Dev, Feature Dev, Designer, Integrator. Kazdy dostaje Gold Solution #1 jako specyfikacje. Synthesizer utrzymuje spojnosc przez wspolna pamiec. Rownolegly build skraca latency o ~40% wzgledem sekwencyjnego.'},
      {label: 'Faza 4-5 - Five Minds #2 + Triple QA (8 agentow)', desc: 'Druga debate PO buildzie - ci SAMI eksperci oceniaja ZBUDOWANY produkt, nie plany. Pragmatyk: "czy rzeczywiscie dziala?". Innowator: "czy wykorzystano wszystkie mozliwosci?". Devil: "co sie stanie gdy uzytkownik zrobi X?". Synthesizer wydaje Gold Solution #2 - liste poprawek. Druga runda debaty odkrywa 23-37% wiecej bledow niz pojedyncza (badania Liang et al. 2024). BRAMA HITL #3: czlowiek zatwierdza zakres poprawek. Triple QA: Security + Quality + Manager z formalnym GO/NO-GO.'}
    ],
    inputs: [
      'Decyzja strategiczna o nieodwracalnych skutkach (platforma, stack, architektura)',
      'Stawki finansowe i biznesowe (min 50 tysiecy dolarow, idealnie 500K+)',
      'Constrainty regulacyjne i compliance (fintech, healthcare, aerospace)',
      'Dostepnosc stakeholdera dla 3 bram HITL (120 sekund na decyzje kazdorazowo)'
    ],
    outputs: [
      '6 niezaleznych raportow researchu + Critic scores',
      'Transkrypt Five Minds #1 debate + Gold Solution #1 (plan budowy)',
      'Kompletny build: backend + frontend + features + design + integracja',
      'Transkrypt Five Minds #2 debate + Gold Solution #2 (lista poprawek)',
      'Triple QA raport z formalnym GO/NO-GO + pelny audit trail wszystkich 3 bram HITL'
    ],
    does: [
      'Przeprowadza PODWOJNA debate ekspertow - przed buildem nad planami i po buildzie nad rzeczywistoscia',
      'Uruchamia 6 rownoleglych strumieni researchu z Critic validation',
      'Angazuje czlowieka w 3 bramach decyzyjnych HITL z timerem 120s',
      'Produkuje dwa Gold Solutions - plan budowy i liste poprawek',
      'Osiaga 79.2% paralelizacji (19 z 27 agentow moze pracowac rownolegle)',
      'Dostarcza pelny audit trail dla compliance najsurowszych regulatorow',
      'Odkrywa 23-37% wiecej bledow niz pojedyncza debate (iterated MAD)',
      'Sluzy jako jedyny preset Tier 5 - bron strategiczna na decyzje nieodwracalne'
    ],
    doesNotDo: [
      'Nie jest dla czegokolwiek ponizej 50 tysiecy dolarow stakow (overkill)',
      'Nie pasuje do standard feature development (uzyj Full lub Standard)',
      'Nie pracuje bez dostepnego stakeholdera - 3 bramy HITL wymagaja czlowieka',
      'Nie jest do prototypowania (27 agentow to zbyt wysoki koszt)',
      'Nie da sie ukonczyc w mniej niz 15 minut (podwojna debate + HITL wait)',
      'Nie zastapi biznesowej zgody na poziomie zarzadu - tylko ja wspiera danymi',
      'Nie jest dla zespolow ktore nie maja praktyki w intelektualnej konfrontacji'
    ],
    antiPatterns: [
      'Ultimate Abuse - uzywanie Deep Five Minds do decyzji o stakach 5 tysiecy dolarow (jak zwolanie zarzadu ONZ zeby wybrac kolor dlugopisow)',
      'HITL Skip - pozwalanie auto-fallback timerowi podejmowac wszystkie decyzje zamiast realnego zaangazowania czlowieka',
      'Single Debate Shortcut - pominiecie Five Minds #2 bo "juz debatowalismy przed buildem"',
      'Missing Post-Build Context - eksperci w drugiej debate nie maja dostepu do wynikow pierwszej - traca 23-37% wartosci',
      'Synthesizer Overload - probowanie odciazenia Synthesizera delegowanie jego roli mniejszym agentom (lamanie centralnej spojnosci)'
    ],
    keyConcepts: [
      {term: 'Double Adversarial Debate', def: 'Jedyny wzorzec w systemie gdzie debate odbywa sie DWA razy - przed i po buildzie, z tymi samymi ekspertami ale z roznym kontekstem.'},
      {term: 'Gold Solution #1 vs #2', def: '#1 to plan budowy przed startem; #2 to lista poprawek po zbudowaniu - dwie rozne syntezy z dwoch roznych perspektyw (plan vs rzeczywistosc).'},
      {term: 'Human-in-the-Loop Gates', def: 'Trzy bramy decyzyjne gdzie pipeline zatrzymuje sie i czeka na czlowieka - timer 120s z auto-fallback, ale eksperci polecaja realne zaangazowanie.'},
      {term: 'Iterated MAD Research', def: 'Badania Liang et al. 2024 pokazuja ze druga runda debaty odkrywa 23-37% wiecej bledow niz pojedyncza - bo eksperci maja kontekst implementacji.'},
      {term: 'Synthesizer Central Brain', def: 'Jeden agent Opus (95% load) mediujacy OBIE debaty i utrzymujacy centralna pamiec w MANIFEST.md - bez niego system sie rozjezdza.'}
    ],
    stats: [
      {label: 'Agenci', value: '27'},
      {label: 'Fazy', value: '6'},
      {label: 'Koszt est.', value: '$2.80-7.10'},
      {label: 'Czas', value: '15-40 min'}
    ],
    bestFor: [
      'Gdy podejmujesz decyzje inwestycyjna powyzej 500 tysiecy dolarow z skutkami na 5+ lat',
      'Gdy budujesz mission-critical architecture dla regulated industry (finanse, healthcare, aerospace)',
      'Gdy blad architektoniczny jest fizycznie nieodwracalny (migracja danych, zmiana formatu, publiczne API)'
    ],
    worstFor: [
      'Gdy stawki sa ponizej 50 tysiecy dolarow (masowy overkill, 40 minut czekania)',
      'Gdy nie masz stakeholdera dostepnego na 3 bramy HITL (auto-fallback zniszczy wartosc)',
      'Gdy potrzebujesz szybkiego wyniku - ten preset zajmuje 15-40 minut pelnego pipeline\'u'
    ],
    relatedPresets: ['deep', 'five_minds', 'five_minds_strategic'],
    glossary: [
      {term: 'ULTIMATE Tier 5', definition: 'Najwyzszy poziom zlozonosci w systemie, jedyny preset w tym tierze, zarezerwowany dla decyzji nieodwracalnych.'},
      {term: 'Human-in-the-Loop', definition: 'Wzorzec gdzie pipeline zatrzymuje sie w kluczowych punktach i czeka na decyzje czlowieka, opcjonalnie z timerem auto-fallback.'},
      {term: 'iterated MAD', definition: 'Iterated Multi-Agent Debate - badania pokazuja ze druga runda debaty odkrywa 23-37% wiecej bledow niz pierwsza.'},
      {term: 'MANIFEST.md', definition: 'Centralna pamiec pipeline\'u - plik ktory Synthesizer utrzymuje i z ktorego korzystaja wszystkie fazy.'},
      {term: 'auto-fallback', definition: 'Mechanizm zabezpieczajacy - jesli czlowiek nie odpowie w 120 sekund, pipeline stosuje domyslna decyzje, zeby sie nie zablokowac.'}
    ],
    learningQuote: 'Gdy stawka jest za wysoka zeby pozwolic sobie na blad, a decyzja jest nieodwracalna - potrzebujesz nie tylko najlepszych ekspertow, ale tez ich krytyki i ludzkiego zatwierdzenia, dwa razy.',
    realExample: 'Wyobraz sobie ze jestes CTO fintech ktory planuje migracje z MySQL na CockroachDB dla platformy przetwarzajacej 1 miliard dolarow rocznie. Stawka: blad w migracji to potencjalnie utrata danych transakcyjnych, kary regulacyjne (SOX, PCI-DSS) i reputacja firmy. Uruchamiasz Deep Five Minds. Szesciu researcherow bada: Tech benchmarki CockroachDB vs alternatyw, GitHub issues produkcyjne, Reddit opinie fintech inzynierow, Forums prawne o SOX compliance, UX dla dashboardow admina, X/Twitter breaking news o bugach. Critic ocenia. BRAMA HITL #1: akceptujesz kierunek. Five Minds #1 debate: Pragmatyk "czy rollback jest mozliwy?", Innowator "czy distributed SQL to przyszlosc?", Analityk Danych pokazuje koszty migracji, Rzecznik Uzytkownika "co z downtime?". Devil atakuje kazde zalozenie. Gold Solution #1: strangler fig migration z dual-write, 3 miesiace rownoleglego dzialania. BRAMA HITL #2: zatwierdzasz plan. Pieciu builderow buduje POC. Five Minds #2 ocenia zbudowany POC: "czy replikacja dziala pod obciazeniem?", "co z split-brain?". Devil: "testowaliscie scenariusz awarii AZ?". Gold Solution #2: lista 12 poprawek przed produkcja. BRAMA HITL #3: akceptujesz zakres. Triple QA wydaje formalny GO/NO-GO. Po 35 minutach masz: due diligence report, transkrypty obu debat, dzialajacy POC, plan migracji produkcyjnej i pelny audit trail dla audytorow SOX. Ta decyzja bedzie obowiazywala przez 5 lat - teraz wiesz, ze ja wytrzyma.'
  },
  deep_research_swarm_pro: {
    tagline: 'Siedmiu specjalistow rownolegle - kazdy w swoim zrodle, nikt nie wchodzi w cudzy obszar',
    missionShort: 'Deep Research Swarm Pro to zespol 10 agentow oparty na wzorcu Anthropic Lead Researcher. Lead dzieli pytanie badawcze na siedem rozlacznych obszarow, siedmiu researcherow pracuje rownolegle kazdy w swoim zrodle, krytyk lapie sprzecznosci, a syntetyk sklada jeden uporzadkowany raport. Dla decyzji ktore wymagaja porownania wielu zrodel.',
    whoIs: 'To preset dla zespolow ktore musza porownac 5-10 opcji przed strategiczna decyzja (baza danych, framework, dostawca). Gdy jeden czlowiek gubi sie w nawale informacji i zaczyna zgadywac, rozwiazaniem jest podzial pracy na specjalistow z EXPLICIT boundaries. Nie dla pilnych decyzji ani dla zespolow ktore juz maja jasna odpowiedz.',
    analogy: 'Ten preset to jak sztab wywiadu z siedmioma oficerami obszarowymi, gdzie kazdy odpowiada za wlasna dzialke a dowodca sklada ich raporty w jeden wniosek.',
    howItWorks: [
      {label: 'Faza 1 - Dekompozycja', desc: 'Lead researcher rozbija pytanie na 7 rozlacznych podpytan i przydziela kazde innemu specjalisce z explicit boundaries (nikt nie wchodzi na cudzy teren).'},
      {label: 'Faza 2 - Parallel research', desc: 'Siedmiu researcherow pracuje rownolegle w swoich zrodlach: dokumentacja, GitHub, Reddit, X, fora, UX, tech. Kazdy zwraca JSON z findingsami, cytatami i confidence scores.'},
      {label: 'Faza 3 - Krytyka', desc: 'Critic porownuje raporty szukajac sprzecznosci, luk i stronniczosci. Oznacza ktore tezy maja wiele niezaleznych potwierdzen, a ktore stoja na jednym zrodle.'},
      {label: 'Faza 4 - Synteza', desc: 'Synthesizer sklada 7 raportow w jeden dokument z krotkim podsumowaniem, porownaniem opcji, lista sprzecznosci i rekomendacja.'}
    ],
    inputs: [
      'Pytanie badawcze lub decyzja do podjecia (np. ktory vector DB wybrac)',
      'Lista opcji do porownania (jesli znasz) lub obszar do zbadania',
      'Kryteria sukcesu (cena, wydajnosc, wsparcie spolecznosci)',
      'Opcjonalnie wczesniejsze raporty lub dokumenty do uwzglednienia'
    ],
    outputs: [
      'Uporzadkowany raport z siedmiu perspektyw z linkami do zrodel',
      'Krotkie podsumowanie (executive summary) na pierwszej stronie',
      'Tabela porownawcza opcji z plusami i minusami',
      'Lista sprzecznosci miedzy zrodlami z komentarzem krytyka',
      'Confidence scores dla kazdej tezy i rekomendacja finalna'
    ],
    does: [
      'Dekomponuje zlozone pytanie na 7 rozlacznych czesci z explicit boundaries',
      'Uruchamia siedmiu researcherow rownolegle redukujac czas do najwolniejszego',
      'Zbiera dane z wielu zrodel (docs, GitHub, Reddit, X, fora, UX, tech)',
      'Lapie sprzecznosci miedzy zrodlami dzieki dedykowanemu krytykowi',
      'Izoluje researcherow zeby nie zarazali sie nawzajem bledami (antigroupthink)',
      'Sklada wyniki w jeden spojny raport z rekomendacja',
      'Oznacza pewnosc kazdej tezy i zrodlo dowodow',
      'Skaluje research do poziomu enterprise bez utraty jakosci'
    ],
    doesNotDo: [
      'Nie pisze kodu (brak builderow w zespole)',
      'Nie podejmuje decyzji - tylko rekomenduje (decyzja nalezy do czlowieka)',
      'Nie aktualizuje danych na zywo (to jednorazowa migawka)',
      'Nie zastapi eksperta domeny w waskich tematach (reguluje, medycyna)',
      'Nie pracuje dobrze gdy masz tylko jedno zrodlo (to przerost formy)',
      'Nie zamyka sie w 5 minut (7 rownoleglych researcherow + krytyk to czas)',
      'Nie debatuje (to rola Five Minds, nie Research Swarm)'
    ],
    antiPatterns: [
      'Single Source Bias - researcher ignoruje swoje granice i siega do cudzego zrodla',
      'Consensus Theater - synthesizer chowa sprzecznosci zamiast je pokazac',
      'Paper Avalanche - zbieranie 200 linkow bez priorytetyzacji ani confidence',
      'Echo Chamber - siedmiu researcherow czyta te same blogi zamiast roznych zrodel',
      'Unanswered Question - lead przydziela 7 roznych podpytan ale zadne nie odpowiada na glowne'
    ],
    keyConcepts: [
      {term: 'Lead Researcher Pattern', def: 'Wzorzec Anthropic gdzie orchestrator dekomponuje pytanie i koordynuje rownoleglych podagentow z explicit scope.'},
      {term: 'Explicit Boundaries', def: 'Kazdy researcher dostaje jasno okreslony obszar zrodel i nie wchodzi na cudzy teren - redukuje duplikacje.'},
      {term: 'Parallel Subagents', def: 'Rownolegle wywolania wielu researcherow tnie czas do czasu najwolniejszego zamiast sumy wszystkich.'},
      {term: 'Critic Loop', def: 'Dedykowany agent krytykujacy raporty przed synteza - lapie sprzecznosci i stronniczosci.'},
      {term: 'BM25 Re-ranking', def: 'Technika rankingu wynikow wyszukiwania wedlug istotnosci tokenow - pomaga priorytetyzowac cytaty.'}
    ],
    stats: [
      {label: 'Agenci', value: '10'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.40-3.50'},
      {label: 'Czas', value: '20-35 min'}
    ],
    bestFor: [
      'Gdy wybierasz technologie lub dostawce za duze pieniadze i potrzebujesz porownania wielu zrodel',
      'Gdy robisz analize konkurencji albo przeglad publikacji naukowych',
      'Gdy strategiczna decyzja wymaga dowodow z wielu niezaleznych perspektyw'
    ],
    worstFor: [
      'Gdy potrzebujesz kodu (ten preset nie buduje niczego)',
      'Gdy masz tylko jedno zrodlo informacji (za ciezki przerost formy)',
      'Gdy decyzja musi zapasc w 5 minut (research wymaga czasu)'
    ],
    relatedPresets: ['research', 'deep', 'five_minds_strategic'],
    glossary: [
      {term: 'lead researcher', definition: 'Orchestrator ktory dzieli pytanie na podpytania i koordynuje rownoleglych podagentow.'},
      {term: 'explicit boundaries', definition: 'Jasne granice zrodel dla kazdego researchera zeby nie duplikowali pracy.'},
      {term: 'critic', definition: 'Agent porownujacy raporty i lapiacy sprzecznosci przed synteza.'},
      {term: 'synthesizer', definition: 'Agent skladajacy wszystkie raporty w jeden spojny dokument z rekomendacja.'},
      {term: 'confidence score', definition: 'Ocena pewnosci 0-1 pokazujaca jak mocno dowody wspieraja dana teze.'}
    ],
    learningQuote: 'Siedmiu specjalistow w swoich obszarach widzi wiecej niz jeden ekspert probujacy ogarnac wszystko - pod warunkiem ze nikt nie wchodzi w cudzy teren.',
    realExample: 'Wyobraz sobie ze wybierasz vector DB dla produkcyjnego RAG i masz na stole Pinecone, Weaviate, Qdrant, Milvus, Chroma, pgvector i Elasticsearch. Lead rozbija pytanie na 7 obszarow (docs, GitHub issues, Reddit, X signals, fora, UX case studies, benchmarki). Siedmiu researcherow pracuje rownolegle w swoich zrodlach, krytyk lapie ze Qdrant i Pinecone maja konflikt co do latency p99, syntetyk sklada raport z rekomendacja Qdrant dla self-hosted + Pinecone dla managed.'
  },