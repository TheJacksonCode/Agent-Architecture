// Batch: strategy (orchestrator, synthesizer, analyst, planner)
  orchestrator: {
    tagline: 'Dyrygent systemu wieloagentowego - dekomponuje, deleguje, decyduje GO/NO-GO',
    missionShort: 'Orkiestrator to centralny agent decyzyjny zarzadzajacy calym systemem wieloagentowym. Jego misja: analizowac zadanie, rozbijac je na podzadania, delegowac do specjalistow i kontrolowac bramy jakosci miedzy fazami. Nie wykonuje pracy merytorycznej - koordynuje tych, ktorzy to robia.',
    whoIs: 'Orkiestrator gra role kierownika budowy, dyrygenta orkiestry i kontrolera ruchu lotniczego w jednej osobie. Widzi caly plac budowy z lotu ptaka, ale sam nie muruje scian ani nie ciagnie kabli. Jego moc lezy w strategicznym rozumowaniu i dyscyplinie delegowania.',
    analogy: 'Orkiestrator to dyrygent orkiestry, ktory nie gra na zadnym instrumencie, ale bez niego wszyscy muzycy razem tworza kakofonie zamiast muzyki.',
    howItWorks: [
      {label: 'Dekompozycja zadania', desc: 'Rozbija polecenie uzytkownika na niezalezne podzadania S/M/L/XL tak, aby kazde bylo wykonalne przez jednego agenta z jasnym wejsciem i wyjsciem.'},
      {label: 'Delegowanie specjalistom', desc: 'Wybiera najlepszego agenta do kazdego podzadania i przekazuje mu TYLKO waski kontekst potrzebny do pracy (Narrow Context Principle).'},
      {label: 'Kontrola bram GO/NO-GO', desc: 'Miedzy fazami sprawdza czy wyniki spelniaja kryteria jakosci. Jesli nie - odsyla do poprawki. Nie pozwala na propagacje bledow miedzy fazami.'},
      {label: 'Synteza i rozstrzyganie', desc: 'Zbiera wyniki od specjalistow, rozwiazuje konflikty miedzy rekomendacjami i laczy czesci w spojny produkt dla uzytkownika.'}
    ],
    inputs: [
      'Polecenie uzytkownika (cel, ograniczenia, zakres projektu)',
      'Raporty i outputy od agentow specjalistow z kazdej fazy',
      'Aktualny stan MANIFEST.md z decyzjami architektonicznymi',
      'Flagi sprzecznosci eskalowane przez Syntetyka'
    ],
    outputs: [
      'Plan dekompozycji z przypisaniem agentow do podzadan',
      'Decyzje GO/NO-GO na kazdej bramie miedzy fazami',
      'Rozstrzygniecia konfliktow miedzy rekomendacjami agentow',
      'Koncowy zsyntetyzowany produkt dla uzytkownika',
      'Podsumowanie procesu z uzasadnieniem kluczowych decyzji'
    ],
    does: [
      'Dekomponuje zlozone zadania na male, niezalezne podzadania dla pojedynczych agentow',
      'Deleguje prace do specjalistow z zasada waskiego kontekstu',
      'Kontroluje bramy jakosci GO/NO-GO miedzy fazami pipeline',
      'Rozstrzyga konflikty miedzy sprzecznymi rekomendacjami agentow',
      'Syntetyzuje wyniki wszystkich faz w spojna calosc',
      'Zarzadza wzorcem Hub-and-Spoke lub hierarchia dla 4-18 agentow',
      'Monitoruje postep prac poprzez odczyt MANIFEST.md i TaskStatus',
      'Eskaluje trudne decyzje do uzytkownika gdy trzeci cykl rewizji nie pomaga'
    ],
    doesNotDo: [
      'Nie generuje kodu - od tego sa Koderzy Backend i Frontend',
      'Nie prowadzi researchu - od tego sa Researcherzy',
      'Nie pisze dokumentacji ani raportow - od tego jest Redaktor',
      'Nie projektuje interfejsow ani palet - od tego jest Designer',
      'Nie naprawia bugow samodzielnie - odsyla do Kodera z notatka co poprawic',
      'Nie deleguje rozstrzygania konfliktow - to jego wylaczna odpowiedzialnosc',
      'Nie ladowuje pelnego kontekstu projektu - widzi tylko MANIFEST i aktualne decyzje'
    ],
    antiPatterns: [
      'Micro-Manager - Orkiestrator sam pisze kod zamiast delegowac do Kodera, tworzac waskie gardlo i eksplozje kosztow Opus',
      'God Agent - prowba ogarniecia calego kontekstu projektu prowadzi do efektu Lost in the Middle i halucynacji',
      'Blind Delegation - delegacja bez kontekstu (napisz backend) bez specyfikacji, technologii i kryteriow akceptacji',
      'Token Waste - 15 agentow do zadania ktore mozna zrobic 3, over-engineering z ceremonia i debatami',
      'Missing Gates - automatyczna akceptacja wynikow bez bram GO/NO-GO prowadzaca do Hallucination Cascade'
    ],
    keyConcepts: [
      {term: 'Hub-and-Spoke', def: 'Wzorzec architektoniczny gdzie orkiestrator jest centrum a specjalisci dookola, cala komunikacja przechodzi przez hub.'},
      {term: 'Gate Control', def: 'Bramy GO/NO-GO miedzy fazami zapobiegajace propagacji bledow, wymagaja spelnienia precyzyjnych kryteriow.'},
      {term: 'Narrow Context', def: 'Zasada ze kazdy agent dostaje tylko informacje niezbedna do swojej pracy, nie caly kontekst projektu.'},
      {term: 'Smart Routing', def: 'Dynamiczne przypisywanie modeli - Opus dla decyzji strategicznych, Sonnet dla buildu, Haiku dla researchu i QA.'},
      {term: 'Single Responsibility', def: 'Orkiestrator ma jeden cel - zarzadzanie systemem, nie wykonywanie pracy merytorycznej.'}
    ],
    stats: [
      {label: 'Koordynuje', value: '4-18 agentow'},
      {label: 'Wywolan systemu', value: '~10%'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'Gdy zadanie wymaga koordynacji 4+ agentow i przekracza jeden lancuch sekwencyjny',
      'Gdy projekt ma wiele faz z bramami jakosci (research, build, QA, delivery)',
      'Gdy pojawiaja sie sprzecznosci miedzy rekomendacjami specjalistow wymagajace arbitrazu'
    ],
    worstFor: [
      'Gdy zadanie jest proste i wystarczy jeden agent (quick fix, mala edycja)',
      'Gdy masz 2-3 agentow w prostym lancuchu i nie potrzebujesz centralnego arbitra',
      'Gdy szukasz taniej orkiestracji - Opus jest najdrozszym modelem i nie oplaca sie dla mikro-zadan'
    ],
    relatedAgents: ['synthesizer', 'analyst', 'planner'],
    glossary: [
      {term: 'dekompozycja', definition: 'Rozbicie zlozonego zadania na mniejsze, niezalezne podzadania wykonalne przez pojedynczych agentow.'},
      {term: 'brama', definition: 'Punkt kontrolny miedzy fazami gdzie orkiestrator podejmuje decyzje GO/NO-GO na podstawie kryteriow jakosci.'},
      {term: 'hub-and-spoke', definition: 'Topologia gwiazdy gdzie centralny orkiestrator komunikuje sie ze wszystkimi specjalistami bez komunikacji peer-to-peer.'},
      {term: 'manifest', definition: 'Centralny dokument (MANIFEST.md) sluzacy jako wspolna tablica komunikacyjna i Single Source of Truth.'},
      {term: 'delegacja', definition: 'Przekazanie podzadania agentowi specjaliscie wraz z waskim kontekstem i kryteriami akceptacji.'}
    ],
    learningQuote: 'Kapitan ktory sam bierze sie za sprzatanie pokladu to kapitan ktory traci statek - orkiestrator nigdy nie wykonuje pracy swoich podwladnych.',
    realExample: 'Pewnego dnia zdekomponowalem zadanie budowy interaktywnej strony edukacyjnej na 14 podzadan w 4 fazach. Uruchomilem 3 researcherow rownolegle, potem zsyntetyzowalem ich wyniki, delegowalem build do Kodera, Designera i Redaktora, i zatrzymalem cykl na Bramie 2 bo Designer nie dostarczyl typografii. Calosc kosztowala 6 dolarow zamiast 25 jakie wydalabym na samym Opus.'
  },
  synthesizer: {
    tagline: 'Pamiec cross-fazowa systemu - straznik MANIFESTu i lowca sprzecznosci',
    missionShort: 'Syntetyk to agent strategiczny ktorego jedynym zadaniem jest utrzymywanie MANIFEST.md jako Single Source of Truth. Zbiera wyniki z kazdej fazy, dokumentuje decyzje architektoniczne, flaguje sprzecznosci miedzy agentami i wyciaga wnioski cross-funkcyjne ktorych pojedynczy specjalista nie zobaczy.',
    whoIs: 'Syntetyk gra role korporacyjnego historyka, bibliotekarza i protokolanta spotkan w jednej osobie. Jest pamiecia dlugoterminowa calego systemu - pamieta co zdecydowano w fazie research, co zbudowano w fazie build i co znaleziono w fazie QA. Nie decyduje, tylko dokumentuje i flaguje.',
    analogy: 'Syntetyk to bibliotekarz wielkiego projektu ktory czyta kazdy raport z ta sama uwaga co pierwszy i laczy kropki ktorych nikt inny nie widzi.',
    howItWorks: [
      {label: 'Odczyt wszystkich wynikow', desc: 'Po zakonczeniu fazy uzywa Read i Grep do zebrania outputow wszystkich agentow oraz aktualnego stanu MANIFEST.md.'},
      {label: 'Ekstrakcja esencji', desc: 'Syntetyzuje 2000-slowne raporty do 50-150 slownych wpisow z kluczowymi decyzjami, alternatywami i zrodlami.'},
      {label: 'Lowienie sprzecznosci', desc: 'Aktywnie porownuje kazdy raport z kazdym innym szukajac konfliktow rekomendacji, metryk i faktow. Flaguje bez rozstrzygania.'},
      {label: 'Aktualizacja MANIFESTu', desc: 'Zapisuje nowe ADR z timestampem, dokumentuje sprzecznosci na gorze dokumentu i wysyla Synthesis Report do Orkiestratora.'}
    ],
    inputs: [
      'Raporty 6-14 agentow z biezacej fazy (research, build, QA)',
      'Aktualny stan MANIFEST.md z poprzednich faz',
      'Ocena Research Critica z scoringiem jakosci raportow',
      'Sygnal od Orkiestratora ze faza jest zakonczona i czas na synteze'
    ],
    outputs: [
      'Zaktualizowany MANIFEST.md z nowymi ADR i decyzjami',
      'Synthesis Report w formacie JSON z executive summary',
      'Lista aktywnych konfliktow [CONFLICT-NNN] eskalowana do Orkiestratora',
      'Wnioski cross-funkcyjne laczace domeny (QA + Frontend, Design + Backend)',
      'Zwiezle podsumowanie fazy z rekomendacja GO lub wymaganie dodatkowego researchu'
    ],
    does: [
      'Utrzymuje MANIFEST.md jako Single Source of Truth dla calego systemu',
      'Tworzy ADR (Architecture Decision Records) z kontekstem CO/KTO/DLACZEGO/ALTERNATYWY',
      'Flaguje sprzecznosci miedzy raportami agentow z priorytetem krytycznosci',
      'Wyciaga wnioski cross-funkcyjne laczac insighty z roznych domen',
      'Stosuje zasade append-only - nigdy nie usuwa, tylko oznacza jako REVISED',
      'Pelni role doradcy dla Builderow w fazie build (Builder Advisory)',
      'Tworzy dwie wersje MANIFESTu w Deep Research Belt - executive summary i pelna'
    ],
    doesNotDo: [
      'Nie podejmuje decyzji - to wylaczna odpowiedzialnosc Orkiestratora',
      'Nie rozwiazuje konfliktow - tylko je flaguje i eskaluje',
      'Nie pisze kodu ani nie tworzy designu - tylko dokumentuje cudze decyzje',
      'Nie uruchamia subagentow - nie ma narzedzia Agent',
      'Nie weryfikuje danych przez WebSearch - to rola Researcherow',
      'Nie kopiuje calych raportow do MANIFESTu - syntetyzuje do esencji 50-150 slow',
      'Nie czeka z flagowaniem krytycznych konfliktow do konca fazy'
    ],
    antiPatterns: [
      'Decision Maker - Syntetyk sam rozwiazuje konflikt piszac decyzja React zamiast eskalowac, co prowadzi do split-brain z Orkiestratorem',
      'Info Hoarder - kopiowanie calej zawartosci raportow do MANIFESTu, dokument rosnie do 10000 slow i nikt go nie czyta',
      'Passive Observer - zbieranie danych bez aktywnego szukania sprzecznosci, 60% niedojrzalych implementacji ma ten blad',
      'Stale Manifest - aktualizacja raz na tydzien zamiast po kazdej fazie, builderzy pracuja na nieaktualnych decyzjach',
      'Silent Conflict - flagowanie bez priorytetu, krytyczne sprzecznosci gina w szumie niskiej wagi'
    ],
    keyConcepts: [
      {term: 'Single Source of Truth', def: 'MANIFEST.md jako jedyne autorytatywne zrodlo prawdy o stanie projektu, aktualizowane tylko przez Syntetyka.'},
      {term: 'Append-only', def: 'Zasada ze stare decyzje nie sa usuwane tylko oznaczane jako REVISED, zachowujac historie zmian.'},
      {term: 'Bidirectional awareness', def: 'Unikalny przywilej Syntetyka - moze bezposrednio pytac agentow o doprecyzowanie, pomijajac Orkiestratora.'},
      {term: 'Cross-funkcyjny insight', def: 'Wniosek laczacy fakty z roznych domen, niewidoczny dla pojedynczego specjalisty (np. CORS issue + brak credentials w fetch).'},
      {term: 'ADR', def: 'Architecture Decision Record - ustrukturyzowany wpis decyzji z kontekstem, zrodlem, alternatywami i statusem.'}
    ],
    stats: [
      {label: 'Input na sesje', value: '15-100k tok'},
      {label: 'Sekcje MANIFEST', value: '50-150 slow'},
      {label: 'Load', value: '65/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy system ma 6+ agentow i pojawia sie information gap miedzy fazami',
      'Gdy potrzebujesz historycznego zapisu decyzji architektonicznych z uzasadnieniem',
      'Gdy wazne jest aktywne wykrywanie sprzecznosci miedzy rekomendacjami specjalistow'
    ],
    worstFor: [
      'Gdy masz 2-3 agentow i Orkiestrator sam moze utrzymac spojnosc',
      'Gdy projekt jest jednorazowy i historia decyzji nie ma wartosci',
      'Gdy potrzebujesz aktywnego decydenta - Syntetyk nigdy nie wybiera strony'
    ],
    relatedAgents: ['orchestrator', 'res_critic', 'analyst'],
    glossary: [
      {term: 'manifest', definition: 'Centralny dokument MANIFEST.md zbierajacy wszystkie decyzje, stack, ryzyka i konflikty projektu.'},
      {term: 'adr', definition: 'Architecture Decision Record - wpis dokumentujacy decyzje architektoniczna z pelnym kontekstem.'},
      {term: 'synthesis report', definition: 'Migawka JSON tworzona na koniec fazy jako formalna rekomendacja dla Orkiestratora.'},
      {term: 'conflict flag', definition: 'Oznaczenie sprzecznosci miedzy raportami agentow wymagajace decyzji Orkiestratora.'},
      {term: 'split-brain', definition: 'Niespojnosc miedzy decyzjami Orkiestratora a stanem MANIFESTu, grozna dla builderow.'}
    ],
    learningQuote: 'Syntetyk dokumentuje, Orkiestrator decyduje - zero wyjatkow, bo neutralna pamiec systemu jest cenniejsza niz jeszcze jeden decydent.',
    realExample: 'Pewnego dnia syntetyzowalem raporty 6 researcherow o stacku SaaS 2026. Znalazlem konsensus na Next.js 15 (4 z 6 glosow), ale Researcher Reddit i Researcher X flaguja hype na Remix. Zamiast rozstrzygac, zapisalem [CONFLICT-007] w MANIFESCIE z pelnym kontekstem i eskalowalem do Orkiestratora. Dodatkowo wylapalem cross-funkcyjny insight - Next.js 15 ma natywne CSS variables wiec dark mode nie wymaga dodatkowej biblioteki.'
  },
  analyst: {
    tagline: 'Chirurg problemow - rozklada zlozone zadania na niezalezne podzadania S/M/L/XL',
    missionShort: 'Analityk to specjalista dekompozycji zlozonych problemow na atomowe, realizowalne podzadania. Jego misja: przeksztalcic abstrakcyjne polecenie uzytkownika w strukturalna liste zadan z zalezosciami, estymacja zlozonosci i kategoryzacja. Na jego pracy bazuje caly dalszy pipeline.',
    whoIs: 'Analityk gra role inzyniera systemowego, chirurga planujacego operacje i szefa kuchni z gwiazda Michelin. Widzi caly problem jak na stole operacyjnym - wie co trzeba zrobic, w jakiej kolejnosci i co mozna rownolegle. Nie wykonuje pracy, tylko buduje mape dla tych ktorzy beda ja wykonywac.',
    analogy: 'Analityk to chirurg ktory przed pierwszym ruchem skalpela rozklada cala operacje na etapy, identyfikuje punkty krytyczne i decyduje co mozna robic rownolegle.',
    howItWorks: [
      {label: 'Analiza problemu', desc: 'Czyta polecenie od Orkiestratora i identyfikuje zakres, ograniczenia oraz rodzaj pracy wymaganej do realizacji celu.'},
      {label: 'Dekompozycja na atomy', desc: 'Rozbija zadanie na podzadania tak male ze kazde moze byc wykonane przez JEDNEGO agenta z jasnym wejsciem i wyjsciem.'},
      {label: 'Mapa zaleznosci', desc: 'Buduje graf zaleznosci pokazujacy ktore podzadania sa niezalezne (paralelne) a ktore wymagaja wynikow innych.'},
      {label: 'Estymacja i kategoryzacja', desc: 'Przypisuje kazdemu podzadaniu zlozonosc S/M/L/XL i kategorie (RESEARCH/DESIGN/BUILD/QA/CONTENT) dla Planera.'}
    ],
    inputs: [
      'Polecenie uzytkownika przekazane przez Orkiestratora z waskim kontekstem',
      'Cel, ograniczenia i zakres projektu (goal, constraints, scope)',
      'Aktualny stan MANIFEST.md jesli juz istnieja jakies decyzje',
      'Opcjonalne referencje i materialy wejsciowe od uzytkownika'
    ],
    outputs: [
      'Strukturalny dokument dekompozycji w formacie Markdown',
      'Lista podzadan z unikalnymi ID (T-001, T-002, ...) i opisami',
      'Graf zaleznosci pokazujacy niezaleznosci i sciezki paralelne',
      'Estymacja zlozonosci S/M/L/XL dla kazdego podzadania',
      'Kategoryzacja zadan (RESEARCH/DESIGN/BUILD/INTEGRATE/QA/CONTENT)'
    ],
    does: [
      'Dekomponuje zlozone problemy na atomowe, realizowalne podzadania',
      'Identyfikuje niezaleznosci i zaleznosci tworzac graf skierowany',
      'Estymuje zlozonosc w skali S/M/L/XL (nie w jednostkach czasu)',
      'Kategoryzuje zadania wedlug typu pracy dla Orkiestratora',
      'Tworzy strukturalny plan dekompozycji jako kontrakt dla reszty systemu',
      'Rozdziela prace merytoryczna (research) od implementacji (build)',
      'Dziala raz na poczatku projektu - dekompozycja to jednorazowa operacja'
    ],
    doesNotDo: [
      'Nie pisze kodu ani nie implementuje podzadan ktore sam zdekomponowal',
      'Nie prowadzi researchu - tylko okresla ze trzeba zbadac temat X',
      'Nie tworzy harmonogramu - to rola Planera (kiedy i w jakiej kolejnosci)',
      'Nie podejmuje decyzji architektonicznych (framework, baza danych, paleta)',
      'Nie estymuje czasu - tylko zlozonosc S/M/L/XL niezalezna od modelu',
      'Nie uruchamia kodu - nie ma narzedzia Bash, tylko analiza statyczna',
      'Nie uruchamia subagentow - nie ma narzedzia Agent, to rola Orkiestratora'
    ],
    antiPatterns: [
      'Scope Creep - Analityk zaczyna robic prace merytoryczna (kod, research) zamiast dekompozycji, dekompozycja staje sie powierzchowna',
      'Time Estimation - estymowanie w godzinach zamiast w zlozonosci, czas zalezy od modelu a zlozonosc jest stala',
      'Giant Task - podzadanie wymagajace dwoch agentow jednoczesnie, trzeba je dalej rozlozyc na atomy',
      'Dependency Blindness - pominiecie zaleznosci miedzy podzadaniami, builderzy pracuja na sprzecznych zalozeniach',
      'Category Confusion - mieszanie kategorii RESEARCH z BUILD w jednym podzadaniu, agent traci czas na nie swoja prace'
    ],
    keyConcepts: [
      {term: 'Plan-and-Execute', def: 'Wzorzec Analityk-Planer-Builder-QA dajacy 83% oszczednosci kosztow w porownaniu z podejsciem ad-hoc.'},
      {term: 'Complexity S/M/L/XL', def: 'Skala zlozonosci niezalezna od czasu - Small jeden krok, Medium kilka krokow, Large wiele komponentow, XL krytyczne.'},
      {term: 'Dependency Graph', def: 'Graf skierowany pokazujacy ktore podzadania wymagaja wynikow innych, klucz do identyfikacji paralelnosci.'},
      {term: 'Narrow Context', def: 'Analityk dostaje tylko goal/constraints/scope, nie pelny kontekst projektu - pozwala skupic sie na dekompozycji.'},
      {term: 'Atomic Task', def: 'Podzadanie na tyle male ze moze je wykonac jeden agent z jasno okreslonym wejsciem i wyjsciem.'}
    ],
    stats: [
      {label: 'Czas sesji', value: '15-25 sek'},
      {label: 'Oszczednosci', value: '83% vs ad-hoc'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy zadanie jest zlozone i wymaga 5+ podzadan dla roznych specjalistow',
      'Gdy chcesz zmaksymalizowac paralelizacje i zidentyfikowac niezaleznosci',
      'Gdy pipeline wymaga kontraktu miedzy planowaniem a wykonaniem'
    ],
    worstFor: [
      'Gdy zadanie jest trywialne i wystarczy jeden agent end-to-end',
      'Gdy potrzebujesz harmonogramu z datami - to rola Planera, nie Analityka',
      'Gdy projekt nie ma jasnego celu - Analityk potrzebuje precyzyjnego inputu'
    ],
    relatedAgents: ['planner', 'orchestrator', 'synthesizer'],
    glossary: [
      {term: 'dekompozycja', definition: 'Rozbicie zlozonego problemu na male niezalezne podzadania realizowalne przez pojedynczych agentow.'},
      {term: 'graf zaleznosci', definition: 'Wizualna mapa pokazujaca ktore podzadania od siebie zaleza, uzywana do identyfikacji sciezek paralelnych.'},
      {term: 'zlozonosc', definition: 'Ocena trudnosci zadania w skali S/M/L/XL, niezalezna od modelu i czasu wykonania.'},
      {term: 'kategoria', definition: 'Typ pracy wymaganej przez podzadanie - RESEARCH, DESIGN, BUILD, INTEGRATE, QA lub CONTENT.'},
      {term: 'atomic task', definition: 'Podzadanie na tyle male ze jeden agent moze je wykonac samodzielnie od wejscia do wyjscia.'}
    ],
    learningQuote: 'Jesli Analityk sie pomyli - nie bedzie czego budowac po drugiej stronie, bo bledna dekompozycja propaguje sie przez system jak pekniecie w fundamencie.',
    realExample: 'Pewnego dnia dostalem polecenie zbuduj dashboard analityczny dla e-commerce. Rozlozylem to na 13 podzadan w 6 kategoriach, oznaczylem 8 z nich jako paralelne (65% potencjalu rownoleglosci), ocenilem 3 jako XL (integracje API, system uprawnien, optymalizacja zapytan) i przekazalem graf Planerowi. Caly moj proces zajal 22 sekundy, ale oszczedzil projektowi dwie iteracje przebudow.'
  },
  planner: {
    tagline: 'Rezyser harmonogramu - zmienia dekompozycje w plan faz z bramami i sciezka krytyczna',
    missionShort: 'Planer tworzy harmonogram wykonania na podstawie dekompozycji od Analityka. Jego misja: decydowac ktore zadania sa sekwencyjne a ktore paralelne, identyfikowac sciezke krytyczna, definiowac bramy jakosci G0-G4 i maksymalizowac paralelizacje aby skrocic calkowity czas projektu.',
    whoIs: 'Planer gra role kierownika budowy, szefa logistyki wojskowej i rezysera filmowego. Ma gotowy scenariusz od Analityka ale musi zdecydowac ktore sceny krecic rownolegle, ktore wymagaja efektow specjalnych z poprzedniego etapu i gdzie wstawic punkty kontrolne jakosci. Jest taktykiem miedzy strategia a wykonaniem.',
    analogy: 'Planer to kierownik budowy ktory wie ze elektryk i hydraulik moga pracowac rownolegle na roznych pietrach, ale dachu nie polozymy przed postawieniem scian.',
    howItWorks: [
      {label: 'Analiza zaleznosci', desc: 'Czyta graf zaleznosci od Analityka i identyfikuje ktore podzadania moga byc wykonywane rownolegle a ktore musza czekac.'},
      {label: 'Wybor trybu wykonania', desc: 'Dla kazdej fazy wybiera tryb SEQUENTIAL, PARALLEL, PARALLEL_THEN_SEQUENTIAL lub SEQUENTIAL_WITH_COLLABORATION.'},
      {label: 'Sciezka krytyczna', desc: 'Identyfikuje najdluzszy ciag zaleznych zadan determinujacy minimalny czas projektu i oznacza zadania na tej sciezce jako wysoki priorytet.'},
      {label: 'Definicja bram G0-G4', desc: 'Tworzy precyzyjne kryteria GO/NO-GO dla bram miedzy fazami (Input, Decomposition, Research, Build, QA) ktore Orkiestrator bedzie egzekwowal.'}
    ],
    inputs: [
      'Strukturalna dekompozycja z lista podzadan od Analityka',
      'Graf zaleznosci pokazujacy niezaleznosci i sciezki paralelne',
      'Estymacje zlozonosci S/M/L/XL dla kazdego podzadania',
      'Ograniczenia budzetu tokenowego i czasowego od Orkiestratora'
    ],
    outputs: [
      'Harmonogram wykonania podzielony na fazy z trybami SEQ/PARALLEL',
      'Identyfikacja sciezki krytycznej z oznaczeniem zadan priorytetowych',
      'Definicje bram jakosci G0-G4 z precyzyjnymi kryteriami GO/NO-GO',
      'Oszacowanie potencjalu paralelizacji (% zadan ktore mozna wykonac rownolegle)',
      'Rekomendacje limitow iteracji dla petli feedbackowych (max 2-3)'
    ],
    does: [
      'Tworzy harmonogram wykonania z fazami sekwencyjnymi i paralelnymi',
      'Identyfikuje sciezke krytyczna determinujaca minimalny czas projektu',
      'Definiuje bramy jakosci G0-G4 z precyzyjnymi kryteriami GO/NO-GO',
      'Maksymalizuje paralelizacje aby skrocic calkowity czas (40-60% oszczednosci)',
      'Wybiera tryb wykonania dla kazdej fazy sposrod czterech standardowych',
      'Okresla limity iteracji dla petli feedbackowych (max 2 dla QA, max 3 dla krytycznych)',
      'Wykrywa konflikty zasobow (dwa zadania zapisujace do tego samego pliku)'
    ],
    doesNotDo: [
      'Nie dekomponuje zadan - tego juz dokonal Analityk w poprzednim kroku',
      'Nie wykonuje zadan - tylko planuje ich kolejnosc i tryb wykonania',
      'Nie egzekwuje bram jakosci - definiuje je a Orkiestrator je egzekwuje',
      'Nie pisze kodu ani nie prowadzi researchu - jest wylacznie taktykiem',
      'Nie dobiera modeli dla agentow - to decyzja Orkiestratora na podstawie zlozonosci',
      'Nie modyfikuje dekompozycji Analityka - jesli jest wadliwa, eskaluje do Orkiestratora',
      'Nie pozwala na nieskonczone iteracje - zawsze definiuje limit max_iterations'
    ],
    antiPatterns: [
      'False Parallelism - ustawienie zadan jako paralelne bez sprawdzenia konfliktow zasobow, generuje race conditions i nadpisywanie plikow',
      'Missing Critical Path - brak identyfikacji sciezki krytycznej prowadzi do zlych priorytetow i opoznien calego projektu',
      'Loose Gates - bramy jakosci z kryterium wystarczy ze cos jest, przepuszczaja wadliwe wyniki do nastepnej fazy',
      'Infinite Iteration - brak limitu max_iterations dla SEQUENTIAL_WITH_COLLABORATION, system wpada w nieskonczona petle poprawek',
      'Sequential Bias - domyslne ustawianie zadan jako sekwencyjne bez analizy niezaleznosci, marnuje potencjal paralelizacji'
    ],
    keyConcepts: [
      {term: 'Sciezka krytyczna', def: 'Najdluzszy ciag zaleznych zadan determinujacy minimalny czas projektu, zadania na niej maja priorytet.'},
      {term: 'Tryb wykonania', def: 'Jeden z czterech wzorcow - SEQUENTIAL, PARALLEL, PARALLEL_THEN_SEQUENTIAL, SEQUENTIAL_WITH_COLLABORATION.'},
      {term: 'Brama G0-G4', def: 'Standardowe bramy jakosci - Input, Decomposition, Research, Build, Quality - z precyzyjnymi kryteriami GO/NO-GO.'},
      {term: 'Paralelizacja', def: 'Wykonywanie niezaleznych zadan jednoczesnie, skraca czas o 40-60% w porownaniu z sekwencja.'},
      {term: 'Max iterations', def: 'Limit petli feedbackowych zapobiegajacy nieskonczonym cyklom poprawek, zazwyczaj 2-3 iteracje.'}
    ],
    stats: [
      {label: 'Paralelizacja', value: '+40-60%'},
      {label: 'Bramy G0-G4', value: '5 standardowych'},
      {label: 'Load', value: '40/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy projekt ma wiele faz i potrzeba precyzyjnej koordynacji sekwencji',
      'Gdy chcesz zmaksymalizowac paralelizacje dla skrocenia czasu dostarczenia',
      'Gdy krytyczne sa bramy jakosci z precyzyjnymi kryteriami GO/NO-GO'
    ],
    worstFor: [
      'Gdy projekt ma mniej niz 4 podzadania - harmonogram jest oczywisty',
      'Gdy wszystkie zadania sa sekwencyjne - nie ma czego planowac',
      'Gdy potrzebujesz wykonawcy a nie planisty - Planer nie pisze kodu'
    ],
    relatedAgents: ['analyst', 'orchestrator', 'qa_manager'],
    glossary: [
      {term: 'harmonogram', definition: 'Dokument okreslajacy kolejnosc wykonania podzadan podzielony na fazy z trybami sekwencyjnymi i paralelnymi.'},
      {term: 'sciezka krytyczna', definition: 'Najdluzszy ciag zaleznych zadan determinujacy minimalny czas realizacji calego projektu.'},
      {term: 'brama', definition: 'Punkt kontrolny miedzy fazami z precyzyjnymi kryteriami GO/NO-GO egzekwowany przez Orkiestratora.'},
      {term: 'tryb wykonania', definition: 'Wzorzec wspolpracy agentow w fazie - sekwencyjny, paralelny, mieszany lub z feedback loops.'},
      {term: 'max iterations', definition: 'Limit cykli feedbackowych w trybie SEQUENTIAL_WITH_COLLABORATION, zapobiega nieskonczonym petlom.'}
    ],
    learningQuote: 'Rownolegly Research UX moze sie opoznic o 20% bez wplywu na projekt - ale Research Tech na sciezce krytycznej opoznia wszystkich.',
    realExample: 'Pewnego dnia dostalem dekompozycje na 13 podzadan od Analityka. Zidentyfikowalem 3 researcherow jako paralelnych (oszczednosc 14 minut na fazie 1), ustawilem build na PARALLEL_THEN_SEQUENTIAL bo Integrator musi czekac na Kodera i Designera, i zdefiniowalem brame G2 z kryterium kazdy researcher dostarczyl raport z min 3 zrodlami. Sciezka krytyczna przebiegala przez Research Tech do Kodera do Integratora - tam skierowalem uwage Orkiestratora.'
  },
