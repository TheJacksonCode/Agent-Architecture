  migration_crew: {
    tagline: 'Remont domu ktory ciagle musi byc zamieszkany - trzech specjalistow z rozlacznymi obszarami',
    missionShort: 'Migration Crew to zespol 10 agentow do bezpiecznej migracji starego systemu. Trzech parallel explorers czyta rozlaczne obszary kodu (auth, dane, route), planner proponuje strategie (big-bang vs strangler), brama HITL decyduje, a zespol buduje pod okiem testerow. Minimalizuje ryzyko i daje czlowiekowi kontrole nad nieodwracalnymi decyzjami.',
    whoIs: 'To preset dla zespolow ktore musza przeprowadzic migracje platformy ktora dziala na produkcji i nie moze byc wylaczona. Idealny dla Java 8 do 21, Angulara do Reacta, Pythona 2 do 3, REST do GraphQL lub rozbicia monolita. Nie dla greenfield ani pelnego rewrite od zera.',
    analogy: 'Ten preset to jak renowacja zabytku przez trzy zespoly konserwatorow, gdzie jeden zajmuje sie fundamentem, drugi instalacjami a trzeci elewacja i zaden nie wchodzi na cudzy teren.',
    howItWorks: [
      {label: 'Faza 1 - Inwentaryzacja', desc: 'Analyst robi mape starego systemu: zaleznosci, hot paths, obszary ryzyka. Planner dzieli kod na 3 rozlaczne obszary dla eksploratorow.'},
      {label: 'Faza 2 - Parallel exploration', desc: 'Trzech specjalistow czyta rownolegle swoje obszary (np. auth, dane, routing). Kazdy zwraca raport z liczba plikow, glebokoscia zaleznosci i propozycja strategii.'},
      {label: 'Faza 3 - HITL decision gate', desc: 'Decision presenter agreguje 3 raporty i prezentuje czlowiekowi wybor: big-bang vs strangler fig vs dual-write. Czlowiek podpisuje plan.'},
      {label: 'Faza 4 - Migracja i weryfikacja', desc: 'Trzech builderow wykonuje migracje w swoich obszarach z shadow traffic. QA weryfikuje kompatybilnosc wsteczna i sprawdza ze stare klienty dalej dzialaja.'}
    ],
    inputs: [
      'Dostep do starego kodu z historia gita',
      'Cel migracji (docelowa wersja jezyka, frameworka, protokolu)',
      'Lista krytycznych zaleznosci i integracji zewnetrznych',
      'Okno utrzymaniowe (czy mozna zrobic przerwe czy nie)'
    ],
    outputs: [
      'Mapa zaleznosci starego systemu z hot paths',
      'Trzy raporty z parallel exploration (jeden per obszar)',
      'Plan migracji z porownaniem opcji (big-bang vs strangler vs dual-write)',
      'Nowe wersje najwazniejszych czesci z kompatybilnoscia wsteczna',
      'Testy regresji i raport z weryfikacji kompatybilnosci'
    ],
    does: [
      'Dzieli stary kod na trzy rozlaczne obszary z explicit scope',
      'Eksploruje kod rownolegle redukujac czas o 60%',
      'Zatrzymuje sie przed nieodwracalnymi decyzjami dla podpisu czlowieka',
      'Proponuje strategie strangler fig zamiast big-bang rewrite',
      'Zachowuje kompatybilnosc wsteczna przez shadow traffic i dual-write',
      'Migruje kawalek po kawalku z mozliwoscia rollbacku kazdego kroku',
      'Testuje regresje dla starych klientow',
      'Dokumentuje kazda decyzje migracyjna z uzasadnieniem'
    ],
    doesNotDo: [
      'Nie dotyczy projektow greenfield (nie ma czego migrowac)',
      'Nie robi pelnego rewrite od zera (to inny zakres)',
      'Nie pracuje bez dostepu do starego kodu',
      'Nie decyduje za czlowieka o big-bang vs strangler (to HITL gate)',
      'Nie migruje danych runtime (tylko kod i schemat)',
      'Nie gwarantuje zero downtime bez odpowiedniej infrastruktury',
      'Nie zastapi testow integracyjnych calego systemu'
    ],
    antiPatterns: [
      'Big Bang Overnight - proba migracji calego systemu w jednym deploymencie bez feature flag',
      'Silent Incompatibility - nowa wersja API lamie stare klienty bez ostrzezenia',
      'Shared Scope - dwaj eksploratorzy czytaja ten sam plik i daja sprzeczne propozycje',
      'Missing Rollback - plan nie ma mechanizmu cofniecia jesli cos idzie zle',
      'Skipped HITL - zespol przeskoczy brame decyzyjna i wybierze strategie za czlowieka'
    ],
    keyConcepts: [
      {term: 'Strangler Fig Pattern', def: 'Stopniowa migracja gdzie nowy system opakowuje stary i zastepuje go kawalek po kawalku jak figa oplotajacy drzewo.'},
      {term: 'Dual-Write', def: 'Technika zapisywania danych rownoczesnie do starego i nowego systemu dla okresu przejsciowego.'},
      {term: 'Shadow Traffic', def: 'Kopia produkcyjnego ruchu kierowana rownolegle do nowego systemu bez wplywu na uzytkownikow.'},
      {term: 'Exploration Phase', def: 'Czytanie kodu bez zmian w celu zrozumienia zaleznosci przed proponowaniem strategii.'},
      {term: 'HITL Gate', def: 'Punkt w pipeline gdzie czlowiek musi podpisac decyzje przed dalszym krokiem.'}
    ],
    stats: [
      {label: 'Agenci', value: '10'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.10-2.80'},
      {label: 'Czas', value: '25-45 min'}
    ],
    bestFor: [
      'Gdy migrujesz dzialajacy system na nowa wersje jezyka lub frameworka',
      'Gdy dzielisz monorepo na mniejsze serwisy albo rozbijasz monolit',
      'Gdy przechodzisz z REST na GraphQL albo z jednej bazy na inna'
    ],
    worstFor: [
      'Gdy zaczynasz projekt od zera (nie ma czego migrowac)',
      'Gdy planujesz pelne przepisanie od zera (to inny zakres)',
      'Gdy nie masz dostepu do starego kodu ani jego historii'
    ],
    relatedPresets: ['legacy', 'api_modern', 'plan_exec'],
    glossary: [
      {term: 'strangler fig', definition: 'Wzorzec stopniowej migracji gdzie nowy system otacza stary i zastepuje go kawalek po kawalku.'},
      {term: 'big-bang migration', definition: 'Jednorazowa migracja calego systemu w jednym deploymencie - wysokie ryzyko.'},
      {term: 'dual-write', definition: 'Zapis do starego i nowego systemu rownoczesnie dla okresu przejsciowego.'},
      {term: 'shadow traffic', definition: 'Rownolegle kopiowanie produkcyjnego ruchu do nowego systemu bez wplywu na uzytkownikow.'},
      {term: 'HITL gate', definition: 'Brama decyzyjna gdzie czlowiek podpisuje plan przed dalsza akcja.'}
    ],
    learningQuote: 'Nie zawsze trzeba przepisac wszystko od zera - czasem najbezpieczniejsza droga to zamiana silnika w samolocie podczas lotu, kawalek po kawalku.',
    realExample: 'Wyobraz sobie ze masz monolit Ruby on Rails z 2014 roku ktory dziala na produkcji i obsluguje 50 tysiecy klientow. Chcesz przejsc na Node.js + GraphQL ale nie mozesz wylaczyc serwisu. Migration Crew robi inwentaryzacje (250 modeli, 80 kontrolerow), 3 eksploratorow rownolegle mapuje auth/dane/routing, planner proponuje strangler fig z 6-miesiecznym okresem dual-write. Czlowiek podpisuje strategie, zespol migruje kawalek po kawalku zaczynajac od najprostszych endpointow, a shadow traffic weryfikuje kompatybilnosc.'
  },
  fullstack_premium: {
    tagline: 'Funkcja gotowa na prawdziwych klientow - z dbA, monitoringiem i audytem w jednym pipelinie',
    missionShort: 'Full-Stack Premium to zespol 12 agentow oparty na wshobson fullstack baseline plus trzech specjalistow ktorych zwykle brakuje: database architect, observability engineer i UX researcher. Backend i frontend pracuja na disjoint file globs, a audyt bezpieczenstwa i konfiguracja monitoringu domyka kazda funkcja. Dla funkcji ktore MUSZA dzialac niezawodnie.',
    whoIs: 'To preset dla zespolow ktore buduja funkcje widoczne dla klientow i nie moga sobie pozwolic na bledy w produkcji. Idealny dla SaaS dashboardow, systemow platnosci, logowania uzytkownikow i wszystkiego co dotyka realnych pieniedzy. Nie dla prototypow, MVP ani malych wewnetrznych narzedzi.',
    analogy: 'Ten preset to jak studio architektoniczne z dedykowanym urbanista i meteorologiem, gdzie zaden projekt nie rusza bez planu sieci wodno-kanalizacyjnej i bez monitoringu pogody.',
    howItWorks: [
      {label: 'Faza 1 - Research i planowanie', desc: 'Orchestrator koordynuje, planisci robia plan, dwoch researcherow rownolegle (UX z wywiadow i docs z dokumentacji) zbiera kontekst. Db_architect projektuje schemat i indeksy.'},
      {label: 'Faza 2 - Parallel build', desc: 'Czterech rownolegle na disjoint file globs: designer robi UI, backend implementuje API, frontend laczy z UI, integrator spina calosc. Kazdy ma swoj zakres plikow i nie wchodzi w cudzy.'},
      {label: 'Faza 3 - Observability setup', desc: 'Observability engineer konfiguruje trzy filary: metryki (SLI/SLO), logi strukturalne i traces. Definiuje dashboard i alerty przed wdrozeniem na produkcje.'},
      {label: 'Faza 4 - Security audit i QA', desc: 'Qa_security robi audyt (OWASP, sekrety, auth), qa_quality testuje funkcje end-to-end, manager podpisuje ready-for-production z podsumowaniem ryzyk.'}
    ],
    inputs: [
      'Opis funkcji z perspektywy klienta (user story lub JTBD)',
      'Istniejacy stack technologiczny i constraint systemu',
      'SLO (np. latency p99 < 200ms, uptime > 99.9%)',
      'Dostep do produkcyjnej bazy danych i obserwowalnosci'
    ],
    outputs: [
      'Gotowa funkcja z zaprojektowana baza danych i indeksami',
      'Dashboard observability (metryki, logi, traces) z alertami',
      'Raport audytu bezpieczenstwa (OWASP Top 10, sekrety, auth)',
      'Interfejs uzytkownika oparty na wywiadach UX',
      'Dokumentacja techniczna i runbook na incident'
    ],
    does: [
      'Projektuje schemat bazy danych z indeksami i migracjami zero-downtime',
      'Konfiguruje obserwowalnosc (three pillars: metrics, logs, traces)',
      'Robi UX research przed mockupami - unika zgadywania potrzeb',
      'Buduje backend i frontend rownolegle na disjoint file globs',
      'Audytuje bezpieczenstwo przed kazdym wdrozeniem',
      'Definiuje SLI i SLO zamiast vanity metrics',
      'Pisze runbook na incident dla dyzurnego',
      'Integruje wszystkie czesci w spojna gotowa funkcje'
    ],
    doesNotDo: [
      'Nie dla prototypow na hackathon (zbyt ciezki)',
      'Nie dla malych wewnetrznych narzedzi (przerost formy)',
      'Nie dziala bez istniejacego stacku technologicznego',
      'Nie zastepuje wlasciwego procesu CI/CD (tylko generuje kod)',
      'Nie wdraza sam na produkcje (potrzebuje pipeline)',
      'Nie rozwiazuje problemow organizacyjnych (na tle kultury)',
      'Nie pisze fine-tuned ML modeli (to inny zakres)'
    ],
    antiPatterns: [
      'Dashboard Theater - metryki bez alertow ktore nikt nie patrzy',
      'Schema After Build - db_architect wchodzi po kodzie zamiast przed',
      'Vanity SLO - SLO na poziomie 100% bez budget erroru',
      'UX Skipped - designer robi mockup bez wywiadu z klientem',
      'Security At End - audyt bezpieczenstwa jako ostatni krok zamiast ciaglej praktyki'
    ],
    keyConcepts: [
      {term: 'Three Pillars Observability', def: 'Metryki + logi + traces jako trzy filary obserwowalnosci systemu produkcyjnego.'},
      {term: 'SLI/SLO', def: 'Service Level Indicator to mierzalna metryka, Objective to cel wyrazony w procentach przez okno czasu.'},
      {term: 'Zero-Downtime Migration', def: 'Migracja schematu bazy bez przestoju dla klientow - wymaga rozlacznych krokow add-backfill-swap-drop.'},
      {term: 'Disjoint File Globs', def: 'Backend i frontend maja zdefiniowane rozlaczne zakresy plikow zeby nie kolidowali w commitach.'},
      {term: 'Error Budget', def: 'Dozwolony procent bledow przed SLO - kompromis miedzy stabilnoscia a velocity deployowania.'}
    ],
    stats: [
      {label: 'Agenci', value: '12'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.55-3.85'},
      {label: 'Czas', value: '30-60 min'}
    ],
    bestFor: [
      'Gdy budujesz funkcje widoczna dla klientow placacych (logowanie, platnosci, dashboard)',
      'Gdy produkt ma SLO i musisz monitorowac wydajnosc na produkcji',
      'Gdy nieprzewidziany bug kosztowalby wiecej niz caly zespol'
    ],
    worstFor: [
      'Gdy robisz prototyp na hackathon albo MVP na demo',
      'Gdy budujesz male wewnetrzne narzedzie dla 5 osob',
      'Gdy nie masz jeszcze zadnego dzialajacego stacku'
    ],
    relatedPresets: ['saas', 'full', 'standard'],
    glossary: [
      {term: 'observability', definition: 'Zdolnosc do rozumienia wewnetrznego stanu systemu na podstawie metryk, logow i traces.'},
      {term: 'SLI', definition: 'Service Level Indicator - mierzalna metryka jak latency albo error rate.'},
      {term: 'SLO', definition: 'Service Level Objective - cel dla SLI wyrazony w procentach przez okno czasu.'},
      {term: 'db_architect', definition: 'Dedykowany agent do projektowania schematu bazy, indeksow i migracji zero-downtime.'},
      {term: 'disjoint file globs', definition: 'Rozlaczne zakresy plikow dla backendu i frontendu zeby uniknac kolizji w repo.'}
    ],
    learningQuote: 'Funkcja ktora dziala na laptopie programisty i funkcja gotowa na klientow to dwie rozne rzeczy - db design, observability i audyt bezpieczenstwa zmieniaja jedno w drugie.',
    realExample: 'Wyobraz sobie ze budujesz nowy dashboard analityczny dla klientow SaaS z wykresami live i exportem CSV. Standardowy zespol zrobi to w tydzien ale na produkcji okaze sie ze query dusza baze, nie ma alertow gdy endpoint pada, a export wyciage dane innych tenantow. Full-Stack Premium dodaje db_architect ktory projektuje indeksy pod hot queries, observability engineer konfiguruje dashboard z SLO latency p99 < 300ms, UX researcher potwierdza co klienci naprawde chca eksportowac, a qa_security lapie multi-tenant leak.'
  },
  security_multi_vector: {
    tagline: 'Piec niezaleznych skanerow rownolegle - kazdy w innym wektorze ataku',
    missionShort: 'Multi-Vector Security to zespol 9 agentow ktory rownolegle skanuje piec rozlacznych wektorow ataku (kod, zaleznosci, infrastruktura, sekrety, auth) po uprzednim modelu zagrozen STRIDE. Qa_manager agreguje wyniki w matryce severity, a HITL gate daje czlowiekowi decyzje GO/NO-GO przed release. Zgodny ze SOC2 i OWASP ASVS.',
    whoIs: 'To preset dla zespolow ktore musza przeprowadzic audyt bezpieczenstwa przed premiera albo po incydencie. Idealny dla customer-facing aplikacji, przygotowania do SOC2, odpowiedzi na ocene ryzyka korporacyjnego klienta. Nie dla ciaglego skanowania w tle (uzyj automatyzacji) ani dla malych wewnetrznych apek.',
    analogy: 'Ten preset to jak grupa antyterrorystyczna sprawdzajaca budynek, gdzie kazdy agent ma swoj pion (parter, piwnica, dach, instalacje, perimeter) i po koncu wszyscy raportuja dowodcy ktory daje GO/NO-GO.',
    howItWorks: [
      {label: 'Faza 1 - Threat modeling STRIDE', desc: 'Analyst tworzy model zagrozen STRIDE (Spoofing, Tampering, Repudiation, Info Disclosure, Denial, Elevation). Dzieli powierzchnie ataku na 5 rozlacznych wektorow.'},
      {label: 'Faza 2 - 5 parallel scanners', desc: 'Piec skanerow pracuje rownolegle: qa_security na kodzie (SAST), scanner na zaleznosciach (SBOM, CVE), infra (IaC misconfig), sekrety (TruffleHog patterns), auth (OWASP ASVS).'},
      {label: 'Faza 3 - Agregacja i severity', desc: 'Qa_manager zbiera wyniki, dedupuje findings, mapuje na severity CVSS, tworzy release-blocking matrix z priorytetami P0/P1/P2.'},
      {label: 'Faza 4 - Release HITL gate', desc: 'Decision presenter prezentuje czlowiekowi liste P0/P1 findings, propozycje naprawy i ryzyka. Czlowiek podpisuje GO/NO-GO przed release.'}
    ],
    inputs: [
      'Dostep do repo z kodem i historia gita',
      'Manifest zaleznosci (package.json, requirements.txt, go.mod)',
      'Definicja infrastruktury (Terraform, Kubernetes, Docker)',
      'Kontekst biznesowy (czym jest aplikacja, kto uzytkownicy)'
    ],
    outputs: [
      'Model zagrozen STRIDE z powierzchnia ataku',
      'Pelny audyt z piatki rozlacznych obszarow',
      'Lista findings uszeregowana od P0 do P3 z CVSS',
      'SBOM z lista znanych CVE w zaleznosciach',
      'Decyzja GO/NO-GO z uzasadnieniem i planem naprawczym'
    ],
    does: [
      'Modeluje zagrozenia wedlug STRIDE przed skanem',
      'Uruchamia 5 niezaleznych skanerow rownolegle (SAST, SBOM, IaC, secrets, auth)',
      'Agreguje wyniki dedupujac duplikaty miedzy skanerami',
      'Mapuje findings na CVSS i tworzy release-blocking matrix',
      'Sprawdza zgodnosc z OWASP ASVS dla auth/session',
      'Generuje SBOM z lista CVE w zaleznosciach',
      'Daje czlowiekowi decyzje GO/NO-GO z pelnym kontekstem',
      'Przygotowuje raport zgodny z SOC2 i ISO27001'
    ],
    doesNotDo: [
      'Nie zastepuje ciaglego skanowania w tle (uzyj Snyk, Dependabot)',
      'Nie naprawia bledow samodzielnie (to rola developera)',
      'Nie jest pentestem (tylko audyt kodu i konfiguracji)',
      'Nie zastepuje audytora zewnetrznego dla SOC2',
      'Nie testuje runtime anomalies (to rola WAF i SIEM)',
      'Nie sprawdza biznes logic flaws (to wymaga eksperta domeny)',
      'Nie dziala bez kontekstu biznesowego aplikacji'
    ],
    antiPatterns: [
      'CVE Tsunami - raport 500 findings bez priorytetyzacji ani severity',
      'Missing Threat Model - skan bez STRIDE gubi kontekst biznesowy',
      'Shared Vector - dwaj skanerzy sprawdzaja to samo zamiast rozlacznych obszarow',
      'Silent GO - release idzie bez HITL decyzji czlowieka',
      'Severity Theater - wszystkie findings oznaczone Critical zeby wymusic fix'
    ],
    keyConcepts: [
      {term: 'STRIDE', def: 'Model zagrozen Microsoft obejmujacy Spoofing, Tampering, Repudiation, Info Disclosure, Denial, Elevation.'},
      {term: 'SAST', def: 'Static Application Security Testing - analiza kodu statycznego bez uruchamiania programu.'},
      {term: 'DAST', def: 'Dynamic Application Security Testing - testowanie aplikacji uruchomionej w srodowisku testowym.'},
      {term: 'SBOM', def: 'Software Bill of Materials - lista wszystkich zaleznosci z wersjami dla audytu CVE.'},
      {term: 'OWASP ASVS', def: 'Application Security Verification Standard - checklisty bezpieczenstwa dla auth, session i danych.'}
    ],
    stats: [
      {label: 'Agenci', value: '9'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.20-3.00'},
      {label: 'Czas', value: '25-50 min'}
    ],
    bestFor: [
      'Gdy przygotowujesz sie do premiery funkcji customer-facing',
      'Gdy odpowiadasz na ocene ryzyka korporacyjnego klienta lub audyt SOC2',
      'Gdy masz incydent i potrzebujesz pelnej weryfikacji przed ponownym odpaleniem'
    ],
    worstFor: [
      'Gdy szukasz ciaglego skanowania w tle (uzyj narzedzi automatycznych)',
      'Gdy nie masz jeszcze modelu zagrozen ani kontekstu biznesowego',
      'Gdy robisz male wewnetrzne narzedzie dla 5 osob (przerost formy)'
    ],
    relatedPresets: ['security', 'soc2_sweep', 'test_suite'],
    glossary: [
      {term: 'STRIDE', definition: 'Model zagrozen dzielacy ryzyka na Spoofing, Tampering, Repudiation, Info Disclosure, Denial, Elevation.'},
      {term: 'SAST', definition: 'Static Application Security Testing - skanowanie kodu bez uruchamiania.'},
      {term: 'SBOM', definition: 'Software Bill of Materials - lista zaleznosci dla audytu CVE.'},
      {term: 'CVSS', definition: 'Common Vulnerability Scoring System - skala 0-10 dla wagi podatnosci.'},
      {term: 'OWASP ASVS', definition: 'Application Security Verification Standard - standard bezpieczenstwa aplikacji.'}
    ],
    learningQuote: 'Jeden skaner zawsze cos przegapi - tylko piec rownoleglych skanerow z rozlacznymi obszarami i czlowiek na koncu daje naprawde pokrycie.',
    realExample: 'Wyobraz sobie ze twoja platforma SaaS ma premiere za tydzien i enterprise klient pyta o raport bezpieczenstwa przed podpisaniem kontraktu za 500k. Multi-Vector Security robi STRIDE (spoofing w OAuth? tampering w webhookach?), piec skanerow rownolegle lapie 3 high severity (SQL injection w search, eksponowany AWS key w .env.example, brakujacy CSP header), qa_manager agreguje na release-blocking matrix, decision presenter prezentuje czlowiekowi ktory podejmuje NO-GO z planem fixow na 48h przed premiera.'
  },
  perf_squad: {
    tagline: 'Trzy hipotezy zamiast jednej - Adwokat Diabla podwaza kazda, pomiar daje dowod',
    missionShort: 'Performance Squad to zespol 8 agentow do root-cause analysis regresji wydajnosciowych. Trzech specjalistow warstwowych (db, backend, frontend) stawia niezalezne hipotezy, Five Minds Devil atakuje kazda szukajac bledow logicznych, a qa_perf benchmarkuje finalne fixy. Wynik: RCA doc z pomiarami przed i po oraz konkretne miejsca do poprawy ulozone od najwiekszego efektu.',
    whoIs: 'To preset dla zespolow ktore zauwazyly regresje wydajnosci po ostatnim wdrozeniu i nie wiedza gdzie jest przyczyna. Idealny dla prod regression triage, wzrostu latency p99, wyciekow pamieci i optymalizacji kosztow. Nie dla mikro-optymalizacji ani problemow spoza aplikacji (siec, dostawca).',
    analogy: 'Ten preset to jak sztab medyczny z trzema specjalistami i prokuratorem, gdzie kardiolog, neurolog i internista stawiaja diagnozy, prokurator podwaza kazda a lab testuje finalna terapie stoperem.',
    howItWorks: [
      {label: 'Faza 1 - Profiling i baseline', desc: 'Analyst zbiera profile, traces i metryki. Ustala baseline (co bylo przed regresja) i delta (co sie pogorszylo). Dzieli problem na 3 warstwy.'},
      {label: 'Faza 2 - Parallel hypothesizing', desc: 'Trzech specjalistow warstwowych (db_architect, backend, frontend) stawia niezalezne hipotezy. Kazdy proponuje root cause i fix. Pracuja rownolegle bez wymiany pomyslow.'},
      {label: 'Faza 3 - Devil adversarial', desc: 'Five Minds Devil atakuje kazda hipoteze szukajac dziur logicznych: czy to na pewno to, co jesli benchmark jest w zlym srodowisku, co jesli fix przesuwa problem a nie rozwiazuje.'},
      {label: 'Faza 4 - Benchmark i RCA doc', desc: 'Qa_perf uruchamia benchmarki na najlepszych kandydatach (przed i po fix), pisze RCA doc z pomiarami, timeline regresji i planem rollout dla fix.'}
    ],
    inputs: [
      'Baseline metryki (latency/memory/cost przed regresja)',
      'Dostep do profili i traces z produkcji',
      'Lista ostatnich deployow i zmian konfiguracji',
      'Okno czasowe regresji (od kiedy do kiedy)'
    ],
    outputs: [
      'RCA doc z trzema hipotezami i kontrhipotezami',
      'Konkretne miejsca do poprawy ulozone od najwiekszego efektu',
      'Pomiary benchmark przed i po (latency, memory, throughput)',
      'Timeline regresji z korelacja ze zmianami w kodzie',
      'Plan rollout dla fix z mozliwoscia rollbacku'
    ],
    does: [
      'Profiluje system i ustala baseline vs aktualne metryki',
      'Dzieli analize na trzy warstwy (db, backend, frontend)',
      'Generuje trzy niezalezne hipotezy zamiast jednego przypuszczenia',
      'Uzywa Devil do podwazania kazdej hipotezy (anti-groupthink)',
      'Mierzy wplyw fix przed commitem (benchmark przed i po)',
      'Dokumentuje golden path i bottleneck na flame graphie',
      'Oblicza wartosc fix w uzyteczncych jednostkach (ms, $, MB)',
      'Daje plan rollout z mozliwoscia rollbacku'
    ],
    doesNotDo: [
      'Nie dla mikro-optymalizacji prematury',
      'Nie dla problemow poza aplikacja (siec, dostawca, CDN)',
      'Nie dziala bez profili i baseline metryk',
      'Nie przewiduje przyszlych regresji (tylko analiza obecnej)',
      'Nie zastepuje ciaglego monitoringu produkcji',
      'Nie robi capacity planning (to inny zakres)',
      'Nie optymalizuje UX (tylko techniczne metryki)'
    ],
    antiPatterns: [
      'Single Hypothesis - jeden specjalista obstawia jedna teze bez alternatyw',
      'Missing Baseline - brak pomiaru przed regresja uniemozliwia porownanie',
      'Fix Without Benchmark - deploy fix bez potwierdzenia ze faktycznie pomoglo',
      'Skipped Devil - zespol pomija adversarial challenge i leci z pierwsza hipoteza',
      'Environment Mismatch - benchmark w srodowisku ktore nie odwzorowuje produkcji'
    ],
    keyConcepts: [
      {term: 'Root Cause Analysis', def: 'Metoda znajdowania pierwotnej przyczyny problemu zamiast leczenia objawow.'},
      {term: 'Flame Graph', def: 'Wizualizacja profilu CPU pokazujaca ktore funkcje zabieraja najwiecej czasu.'},
      {term: 'Golden Path', def: 'Najwazniejsza sciezka uzytkownika ktora musi dzialac szybko bez wzgledu na reszte.'},
      {term: 'Baseline vs Optimized', def: 'Pomiar stanu przed optymalizacja i po, umozliwiajacy obliczenie delty.'},
      {term: 'Devil Advocacy', def: 'Formalne podwazanie kazdej hipotezy w celu znalezienia slabosci rozumowania.'}
    ],
    stats: [
      {label: 'Agenci', value: '8'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.95-2.40'},
      {label: 'Czas', value: '20-40 min'}
    ],
    bestFor: [
      'Gdy aplikacja zaczela dzialac wolniej po ostatnim wdrozeniu i nie wiesz dlaczego',
      'Gdy latency p99 nagle podskoczylo albo memory leak zjada zasoby',
      'Gdy chcesz obnizyc koszty serwerow ale nie wiesz gdzie sa bottlenecki'
    ],
    worstFor: [
      'Gdy nie masz zadnych pomiarow ani profili (najpierw wlacz monitoring)',
      'Gdy problem jest w sieci, u dostawcy lub w CDN (to inne warstwy)',
      'Gdy chcesz zoptymalizowac cos na wyrost bez zmierzonego problemu'
    ],
    relatedPresets: ['perf_boost', 'bug_hunt', 'incident_war_room'],
    glossary: [
      {term: 'RCA', definition: 'Root Cause Analysis - metoda znajdowania pierwotnej przyczyny zamiast leczenia objawow.'},
      {term: 'flame graph', definition: 'Wizualizacja profilu CPU pokazujaca koszty funkcji w formie plomyki.'},
      {term: 'baseline', definition: 'Pomiar stanu przed zmiana umozliwiajacy porownanie.'},
      {term: 'p99 latency', definition: 'Czas odpowiedzi 99 percentyla - gorne ogony rozkladu.'},
      {term: 'Devil Advocacy', definition: 'Formalne podwazanie kazdej hipotezy w celu znalezienia slabosci.'}
    ],
    learningQuote: 'Bez pomiaru kazda optymalizacja to zgadywanie - Performance Squad wymusza trzy hipotezy, podwazanie ich i pomiary przed i po.',
    realExample: 'Wyobraz sobie ze po deploy w piatek latency p99 API skoczylo z 150ms do 900ms i klienci zaczeli narzekac. Trzech specjalistow rownolegle stawia hipotezy: db_architect obstawia brakujacy indeks na nowym query, backend obstawia N+1 w ORM, frontend obstawia blocking fetch w middleware. Devil atakuje kazda: "co jesli to warm-up po deployu", "co jesli Redis padl", "co jesli to tylko jeden endpoint". Qa_perf benchmarkuje kazda z hipotez w staging i potwierdza ze to N+1 query - fix deploy obniza p99 do 180ms.'
  },
  prd_to_launch: {
    tagline: 'Z rozmowy z klientem do gotowego pakietu launch - PRD plus tickety plus makiety plus GTM',
    missionShort: 'PRD to Launch to zespol 11 agentow ktory z nieformalnego inputu (idea, nagranie, transkrypt) produkuje pelen pakiet do wypuszczenia produktu. Analyst ekstraktuje JTBD, writer pisze PRD, a rownolegly build generuje tickety z RICE, makiety ekranow, teksty marketingowe i plan GTM. PM sign-off zamyka pipeline.',
    whoIs: 'To preset dla product managerow ktorzy maja pomysl albo transkrypt rozmowy z klientem i musza z tego zrobic pelen pakiet dla zespolu. Idealny gdy synchronizujesz dzialy przed launchem albo planujesz duza nowa funkcje przed kwartalem. Nie dla implementacji kodu ani decyzji czysto technicznych.',
    analogy: 'Ten preset to jak studio filmowe od scenariusza do premiery, gdzie scenarzysta wyciaga temat, rezyser pisze PRD, a zespoly produkcyjne pracuja rownolegle nad kostiumami, dekoracjami, kamera i marketingiem.',
    howItWorks: [
      {label: 'Faza 1 - JTBD extraction', desc: 'Analyst sluchaje transkryptu lub czyta idee i wyciaga Jobs-to-be-Done: co klient probuje osiagnac, co go frustruje, jakie sa aktualne obejscia. Formuluje problem statement.'},
      {label: 'Faza 2 - PRD writing', desc: 'Writer tworzy structured PRD: problem, propozycje, metryki sukcesu, zakres, non-goals, ryzyka, zaleznosci. Dokument gotowy do przegladu przez zespol.'},
      {label: 'Faza 3 - Parallel build', desc: 'Planner generuje tickety z RICE scoring i harmonogramem. Designer mockuje kluczowe ekrany. Writer pisze copy marketingowe. Gtm_strategist robi plan launch z ICP i pricingiem.'},
      {label: 'Faza 4 - PM sign-off', desc: 'Decision presenter agreguje wszystkie deliverables (PRD, tickety, makiety, copy, GTM), prezentuje PM do zatwierdzenia. PM podpisuje launch readiness.'}
    ],
    inputs: [
      'Transkrypt rozmowy z klientem albo surowa idea',
      'Istniejacy kontekst produktu (persony, stack, roadmapa)',
      'Budzet i timeline na launch',
      'Lista stakeholderow do zaangazowania'
    ],
    outputs: [
      'PRD ze strukturami problem/propozycja/metryki/ryzyka',
      'Lista ticketow dla zespolu z RICE i harmonogramem',
      'Makiety ekranow dla kluczowych przeplywow uzytkownika',
      'Teksty marketingowe (landing, emaile, social, release notes)',
      'Plan GTM z ICP, pricing, kanalami i metrykami sukcesu'
    ],
    does: [
      'Ekstrahuje Jobs-to-be-Done z nieformalnego inputu',
      'Pisze PRD zgodny z best practices produktowymi',
      'Generuje tickety z RICE scoring (Reach, Impact, Confidence, Effort)',
      'Mockuje kluczowe ekrany przed implementacja',
      'Pisze copy marketingowe dopasowane do persony',
      'Buduje plan GTM z ICP, pricing i kanalami',
      'Synchronizuje wszystkie deliverables w jeden pakiet',
      'Wymusza PM sign-off przed launchem'
    ],
    doesNotDo: [
      'Nie pisze kodu (to jest inny preset jak saas albo fullstack_premium)',
      'Nie podejmuje decyzji technologicznych (brak researcherow tech)',
      'Nie dziala bez kontaktu z klientami (brak voice of customer)',
      'Nie jest substytutem dla Product Managera - wspomaga go',
      'Nie robi user research (to jest design_sys albo ui_overhaul)',
      'Nie wdraza kampanii marketingowych (tylko je projektuje)',
      'Nie definiuje strategii firmy (to five_minds_strategic)'
    ],
    antiPatterns: [
      'Solution First - piszesz PRD bez JTBD i tworzysz rozwiazanie dla nieistniejacego problemu',
      'Ticket Dump - planner generuje 200 ticketow bez priorytetyzacji RICE',
      'Copy Before Message - writer pisze copy bez zatwierdzonego positioningu',
      'GTM Without ICP - gtm_strategist planuje kanaly bez zdefiniowanego klienta idealnego',
      'Skipped Sign-off - zespol startuje build bez PM sign-off i lata bez kierowcy'
    ],
    keyConcepts: [
      {term: 'JTBD', def: 'Jobs-to-be-Done - framework formuluje problem od strony "klient probuje osiagnac X".'},
      {term: 'RICE', def: 'Priorytyzacja ticketow wg Reach x Impact x Confidence / Effort - pomaga wybrac najcenniejsze.'},
      {term: 'PRD', def: 'Product Requirements Document - dokument opisujacy co i dlaczego budujemy.'},
      {term: 'GTM', def: 'Go-to-Market - plan wprowadzenia produktu na rynek z ICP, pricing i kanalami.'},
      {term: 'ICP', def: 'Ideal Customer Profile - precyzyjny opis najcenniejszego typu klienta do targetowania.'}
    ],
    stats: [
      {label: 'Agenci', value: '11'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.30-3.30'},
      {label: 'Czas', value: '30-50 min'}
    ],
    bestFor: [
      'Gdy masz nagranie rozmowy z klientem ale nie wiesz od czego zaczac',
      'Gdy planujesz duza nowa funkcje przed kwartalnym planowaniem',
      'Gdy musisz zsynchronizowac dzial produktu, inzynierii i marketingu przed launchem'
    ],
    worstFor: [
      'Gdy chcesz napisac kod (to nie ten preset)',
      'Gdy decydujesz o czysto technicznym wyborze (framework, baza)',
      'Gdy nie masz zadnego kontaktu z klientami (brak voice of customer)'
    ],
    relatedPresets: ['startup', 'feature_sprint', 'content'],
    glossary: [
      {term: 'JTBD', definition: 'Jobs-to-be-Done - framework formulujacy problem od strony celu klienta.'},
      {term: 'PRD', definition: 'Product Requirements Document - dokument opisujacy co i dlaczego budujemy.'},
      {term: 'RICE', definition: 'Priorytyzacja Reach x Impact x Confidence / Effort.'},
      {term: 'GTM', definition: 'Go-to-Market - plan wprowadzenia produktu na rynek.'},
      {term: 'ICP', definition: 'Ideal Customer Profile - opis najcenniejszego klienta do targetowania.'}
    ],
    learningQuote: 'Pomysl bez PRD i makiet to tylko pobozne zyczenie - PRD to Launch zamienia surowa idee w pakiet gotowy do wykonania w jednym przebiegu.',
    realExample: 'Wyobraz sobie ze masz godzine transkryptu rozmowy z klientem enterprise ktory skarzy sie ze nie widzi co dzieje sie w jego subskrypcji. Analyst ekstraktuje JTBD (klient chce przewidywac koszty przed fakturoa), writer pisze PRD dla Usage Forecast Dashboard, planner generuje 12 ticketow z RICE, designer mockuje 3 ekrany, writer robi copy email anonsujacy funkcje, gtm_strategist planuje launch dla 50 najwiekszych kont z webinarem. PM podpisuje pakiet i zespol ma wszystko na kwartalne planowanie.'
  },
  ab_test_lab: {
    tagline: 'Uczciwy test A/B zamiast naciaganej statystyki - power calc plus Devil plus stat sign-off',
    missionShort: 'A/B Test Lab to zespol 7 agentow do rygorystycznego projektowania testow A/B. Statistician oblicza sample size i power, designer mockuje warianty, Devil red-teamuje p-hacking ryzyka (SRM, peeking, Simpson paradox), a decision presenter wymusza stat sign-off przed startem. Chroni firme przed falszywymi wnioskami ze zlych testow.',
    whoIs: 'To preset dla zespolow ktore planuja wazny test A/B (cena, onboarding, checkout, landing) i nie moga sobie pozwolic na podejmowanie decyzji na podstawie naciaganej statystyki. Idealny gdy decyzja zalezy od wyniku testu. Nie dla drobnych zmian kosmetycznych ani projektow z malym ruchem.',
    analogy: 'Ten preset to jak laboratorium farmaceutyczne projektujace clinical trial, gdzie biostatystyk wylicza moc, klinicysta projektuje ramiona, prokurator szuka biasow a IRB zatwierdza plan przed startem.',
    howItWorks: [
      {label: 'Faza 1 - Problem framing', desc: 'Analyst ustala hipoteze biznesowa, primary metric i minimum detectable effect (MDE). Sprawdza czy test jest etyczny i ma jasny kierunek decyzji.'},
      {label: 'Faza 2 - Statistical design', desc: 'Statistician wylicza sample size na podstawie MDE, baseline conversion, power (0.8), alpha (0.05). Proponuje czas trwania testu i strategie alokacji.'},
      {label: 'Faza 3 - Variants i p-hacking audit', desc: 'Designer mockuje warianty (A baseline, B, opcjonalnie C). Devil red-teamuje plan: SRM risk, peeking problem, Simpson paradox, novelty effect, carryover. Flaguje all potential biases.'},
      {label: 'Faza 4 - Stat sign-off', desc: 'Decision presenter agreguje design, sample size i Devil findings. Prezentuje plan stakeholderom, ktorzy podpisuja stat sign-off przed uruchomieniem testu.'}
    ],
    inputs: [
      'Hipoteza biznesowa i propozycja zmiany',
      'Baseline metryki (conversion rate, revenue, churn)',
      'Oczekiwany minimum detectable effect (MDE)',
      'Dostep do traffic logs i platformy experymentow'
    ],
    outputs: [
      'Plan testu z obliczonym sample size i czasem trwania',
      'Dwa lub wiecej wariantow gotowych do pokazania',
      'Lista pulapek p-hacking do unikniecia (SRM, peeking, Simpson)',
      'Sukces kryteria i decision tree z wyprzedzeniem',
      'Podpisany dokument stat sign-off przed startem testu'
    ],
    does: [
      'Wylicza sample size na podstawie power analysis',
      'Projektuje warianty z jasnymi roznicami',
      'Audytuje plan pod katem p-hacking (SRM, peeking, Simpson)',
      'Wymusza ustalenie success criteria przed startem',
      'Chroni przed novelty effect i carryover bias',
      'Sprawdza czy baseline jest wystarczajacy (>1000 conversions)',
      'Tworzy decision tree (co robimy dla kazdego wyniku)',
      'Dokumentuje wszystko dla stat sign-off'
    ],
    doesNotDo: [
      'Nie uruchamia samego testu (to platform experimentation)',
      'Nie analizuje wynikow post-hoc (to inny workflow)',
      'Nie dziala bez baseline metryk',
      'Nie nadaje sie dla niewielkiego ruchu (<1000 konwersji)',
      'Nie testuje zmian etycznie problematycznych bez review',
      'Nie zastepuje data engineer (tylko projektuje test)',
      'Nie jest substytutem dla product analytics'
    ],
    antiPatterns: [
      'Peeking - sprawdzanie wynikow codziennie i zatrzymywanie testu jak widzisz "znaczace"',
      'Underpowered Test - sample size za maly, wynik jest losowy a wnioski fiktykcjine',
      'SRM Ignored - sample ratio mismatch ignorowany bo "mala roznica"',
      'Simpson Trap - agregacja wynikow pomija segment gdzie efekt jest odwrotny',
      'Post-hoc Hypothesis - zmiana primary metric po zobaczeniu wynikow'
    ],
    keyConcepts: [
      {term: 'Power Analysis', def: 'Obliczenie prawdopodobienstwa wykrycia rzeczywistego efektu danego rozmiaru przy danym sample size.'},
      {term: 'MDE', def: 'Minimum Detectable Effect - najmniejszy efekt jaki test jest w stanie wykryc statystycznie.'},
      {term: 'SRM', def: 'Sample Ratio Mismatch - niezamierzony dysbalans grup A/B ktory psuje wyniki.'},
      {term: 'Sequential Testing', def: 'Metoda pozwalajaca zagladac w wyniki bez inflacji bledu alpha.'},
      {term: 'Novelty Effect', def: 'Krotkoterminowy wzrost metryki spowodowany nowiosa wariantu a nie jego wartoscia.'}
    ],
    stats: [
      {label: 'Agenci', value: '7'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.80-2.00'},
      {label: 'Czas', value: '15-30 min'}
    ],
    bestFor: [
      'Gdy planujesz test nowego pricingu albo zmianie flow checkoutu',
      'Gdy testujesz landing page dla duzej kampanii marketingowej',
      'Gdy musisz bronic wynikow testu przed zarzadem lub analitykami'
    ],
    worstFor: [
      'Gdy masz za malo uzytkownikow (test bedzie trwal miesiace)',
      'Gdy to jest drobna zmiana kosmetyczna bez biznesowych konsekwencji',
      'Gdy nie wiesz jeszcze co chcesz mierzyc'
    ],
    relatedPresets: ['data_analysis_pipe', 'perf_squad', 'startup'],
    glossary: [
      {term: 'power', definition: 'Prawdopodobienstwo wykrycia efektu w tescie gdy efekt rzeczywiscie istnieje.'},
      {term: 'MDE', definition: 'Minimum Detectable Effect - najmniejszy efekt wykrywalny statystycznie.'},
      {term: 'SRM', definition: 'Sample Ratio Mismatch - niezamierzony dysbalans grup.'},
      {term: 'p-hacking', definition: 'Manipulowanie analiza zeby uzyskac znaczacy wynik (cherry picking, peeking).'},
      {term: 'alpha', definition: 'Prag bledu typu I - prawdopodobienstwo falszywie pozytywnego wyniku (zwykle 0.05).'}
    ],
    learningQuote: 'Zly test daje falszywe wnioski a decyzje oparte na zlych testach kosztuja wiecej niz cala infrastruktura - A/B Test Lab chroni przed tym jednym podpisem.',
    realExample: 'Wyobraz sobie ze CEO chce podniesc ceny o 20% i dyrektor produktu proponuje test A/B. Analyst formuluje hipoteze (efekt netto na revenue), statistician wylicza ze przy baseline 3% conversion i MDE +5% revenue potrzeba 28000 uzytkownikow per wariant, test musi trwac 14 dni. Devil flaguje trzy ryzyka: SRM bo cache pamieta uzytkownika, peeking bo CEO bedzie zagladal codziennie, Simpson bo mobile vs desktop maja rozny effect. Decision presenter prezentuje plan z zabezpieczeniami (sequential testing, no peeking, segmentacja), CEO podpisuje stat sign-off.'
  },