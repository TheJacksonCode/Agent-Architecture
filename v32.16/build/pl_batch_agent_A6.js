  expert_user: {
    tagline: 'Adwokat czlowieka w maszynie - broni empatii kiedy wszyscy mowia o systemach',
    missionShort: 'Ekspert Rzecznik Uzytkownika jest glosem empatii w debacie Five Minds - jego misja to pilnowanie aby kazda decyzja architektoniczna byla przetlumaczona na realne doswiadczenie koncowego uzytkownika. Reprezentuje uzytkownikow ktorzy nie siedza przy stole - starszych, niewidomych, mobile-only, z wolnym internetem. Dziala w fazie debate1 protokolu.',
    whoIs: 'Rzecznik Uzytkownika to terapeuta skrzyzowany z etnografem - rozumie zarowno frustracje Marii z Kielc jak i strach Pawla ktory nigdy nie uzywal aplikacji bankowej. W debacie gra role sumienia: kiedy inzynierzy i analitycy dyskutuja o TPS i p99, on przypomina ze na drugim koсcu jest czlowiek ktory chce tylko wroblic paragon.',
    analogy: 'Ekspert Rzecznik Uzytkownika to terapeuta par na konferencji inzynierow - jedyny w sali ktory wciaz pyta ale co czuja osoby na ktore te systemy dzialaja.',
    howItWorks: [
      {label: 'Opening - journey uzytkownika', desc: 'Otwiera runde od konkretnego journey - wybiera Marie 58 lat z mobilem na 3G i prowadzi ja przez proponowany flow. Pokazuje wszystkie punkty friction.'},
      {label: 'Defense - persona i emocje', desc: 'Broni swojej rekomendacji opowiadajac historia konkretnej persony - jej celow, frustracji, emocjonalnego kontekstu. Liczby zawsze laczy z twarzami.'},
      {label: 'Cross-exam - test accesabilnosci', desc: 'Atakuje propozycje innych pytaniem jak to brzmi screen-readerem, jak dziala na 3G, co robi osoba slabowidzaca, dziecko, senior. Wyprowadza ukryte wykluczenia.'},
      {label: 'Closing - mierzalna empatia', desc: 'Zamyka glosem za rozwiazaniem ktore mozna zmierzyc metrykami uzytkownika - SUS score, task success rate, WCAG AA, czas do pierwszego kliknieccia.'}
    ],
    inputs: [
      'Pytanie debaty (np. jak uproscic proces rejestracji)',
      'Raporty UX researcherow z personami i journey maps',
      'Opinie pozostalych ekspertow - do przetlumaczenia na wplyw ludzki',
      'Dane dotychczasowe od uzytkownikow - NPS, tickets, nagrania sesji'
    ],
    outputs: [
      'Ustrukturyzowane stanowisko oparte na minimum dwoch personach',
      'Trzy argumenty kazdy z journey przyklad i emocjonalnym kontekstem',
      'Lista ukrytych grup uzytkownikow wykluczonych przez propozycje innych',
      'Kryteria akceptacji WCAG 2.2 i mierzalne user metrics',
      'Koncowy glos za Gold Solution z oczekiwanym wplywem na SUS i task success'
    ],
    does: [
      'Buduje i broni persony reprezentujace realnych uzytkownikow produktu',
      'Przechodzi przez kazdy flow oczami konkretnej osoby z jej ograniczeniami',
      'Detektuje ukryte wykluczenia - ageizm, ableizm, bandwidth privilege',
      'Laczy kazda decyzje techniczna z konkretnym wplywem emocjonalnym',
      'Wymaga WCAG 2.2 AA jako podlogi a nie jako bonusu',
      'Mierzy sukces metrykami uzytkownika nie tylko technicznymi',
      'Szuka niewidocznych grup ktorych reszta zespolu nie reprezentuje',
      'Przeklada abstrakcyjne decyzje systemowe na jezyk codziennego uzytkownika'
    ],
    doesNotDo: [
      'Nie broni wizji technicznej - to robota Innowatora',
      'Nie wymaga dowodow statystycznych - to robota Analityka',
      'Nie ocenia kosztow i deadline - to robota Pragmatyka',
      'Nie atakuje kazdej tezy - to robota Devila',
      'Nie pisze kodu ani specyfikacji technicznej',
      'Nie ignoruje konfliktu uzytkownik vs biznes - aktywnie go nazywa',
      'Nie uznaje ze wystarczy zapytac jednego uzytkownika bo sam sie domysli'
    ],
    antiPatterns: [
      'User Worship - ignorowanie realnych ograniczeс biznesu w imie mitycznego uzytkownika',
      'Persona Fiction - wymyslanie person bez badaс terenowych pod swoja teze',
      'Accessibility Theater - deklaracja WCAG bez faktycznego testowania z narzedziami asystujacymi',
      'HiPPO Projection - zakladanie ze reszta zespolu to reprezentatywny sample uzytkownikow',
      'Empathy Fatigue - stopniowa utrata kontaktu z uzytkownikiem przez nadmierne rytualy personowe'
    ],
    keyConcepts: [
      {term: 'Persona', def: 'Archetypowa reprezentacja grupy uzytkownikow z konkretnymi celami, ograniczeniami i kontekstem uzycia.'},
      {term: 'Jobs to be done', def: 'Framework opisujacy co uzytkownik stara sie osiagnac w zyciu a nie jak uzywa narzedzia.'},
      {term: 'Accessibility first', def: 'Projektowanie zaczynajace od skrajnych przypadkow dostepnosci ktore poprawia doswiadczenie dla wszystkich.'},
      {term: 'Emotional journey', def: 'Mapa emocji uzytkownika wzdluz flow od frustracji do satysfakcji lub odwrotnie.'},
      {term: 'Cognitive load', def: 'Iloscic pamieci roboczej wymagana do wykonania zadania - minimalizowanie jej to rdzen dobrego UX.'}
    ],
    stats: [
      {label: 'Rundy debaty', value: '3 rundy'},
      {label: 'Argumentow', value: '8-12 na debate'},
      {label: 'Load', value: '80/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'Gdy zespol zoptymalizowal metryki techniczne a uzytkownicy zaczynaja odchodzic',
      'Gdy projekt dotyka wrazliwych grup - seniorzy, dzieci, niepelnosprawni',
      'Gdy nowa funkcja komplikuje flow dla korzysci wewnetrznej zespolu'
    ],
    worstFor: [
      'Gdy problem jest czysto backendowy bez bezposredniej interakcji uzytkownika',
      'Gdy debata dotyczy wyboru narzedzia dev - uzytkownik nie jest klientem',
      'Gdy trzeba zamknac debate szybko a analiza person to dwa dni'
    ],
    relatedAgents: ['res_ux', 'designer', 'synthesizer'],
    glossary: [
      {term: 'SUS score', definition: 'System Usability Scale - standardowa ankieta 10 pytaс oceniajaca uzyteczno od 0 do 100.'},
      {term: 'WCAG', definition: 'Web Content Accessibility Guidelines - miedzynarodowy standard dostepnosci tresci webowych.'},
      {term: 'task success', definition: 'Procent uzytkownikow ktorzy ukoсczyli zadanie bez pomocy w zalozonym czasie.'},
      {term: 'friction', definition: 'Wszelkie elementy flow ktore spowalniaja lub frustruja uzytkownika dochodzacego do celu.'},
      {term: 'dark pattern', definition: 'Element interfejsu zaprojektowany aby zmanipulowac uzytkownika do akcji ktora nie leza w jego interesie.'}
    ],
    learningQuote: 'Kazda metryka techniczna ma twarz konkretnej osoby po drugiej stronie - moja robota to pamietac o niej kiedy wszyscy patrza na wykresy.',
    realExample: 'Pewnego razu debata dotyczyla uproszczenia rejestracji z 8 pol do 3 poprzez automatyczne wykrywanie z pesel. Cztery umysly chwalily efficiency. Przedstawilem persone Marii 67 lat ktora panicznie boji sie wpisywaс pesel online. Zaproponowalem opcjonalny flow manualny. Metryka task success dla seniorow wzrosla o 34 procent a churn first day spadl o 18 procent.'
  },
  expert_devil: {
    tagline: 'Adwokat diabla bez lojalnosci - atakuje kazdy konsensus i szuka ukrytej porazki',
    missionShort: 'Ekspert Cien jest strukturalnym przeciwnikiem w debacie Five Minds - jego misja to zakwestionowanie kazdej tezy, szukanie luk w rozumowaniu i stress-testowanie konsensusu zanim zostanie zatwierdzony. Nie ma lojalnosci domenowej - atakuje nawet Innowatora jesli debata wymaga wzmocnienia przez destrukcje. Dziala w fazie debate1 protokolu.',
    whoIs: 'Cien to prokurator sledczy skrzyzowany z red teamem cyber - jedyny ekspert ktory nie broni zadnego stanowiska. Jego rola jest celowo antagonistyczna: kiedy cztery pozostale umysly zaczynaja sie zgadzac, on wchodzi z pytaniem co moze pojsc nie tak i wyciaga ukryte wektory porazki. To rola wynajetego paranoika w sluzbie zespolu.',
    analogy: 'Ekspert Cien to prokurator sledczy na wlasnej rozprawie - celowo atakuje wszystkich swiadkow w tym wlasnego klienta, bo tylko tak mozna znalezc prawdy ktorej nikt inny nie chce wyslyszec.',
    howItWorks: [
      {label: 'Opening - pre-mortem', desc: 'Otwiera runde wyobrazeniem sobie ze projekt uz upadl - buduje retrospektywe z przyszlosci opisujac wszystkie sposoby w jakie mogl sie nie udac.'},
      {label: 'Defense - bez wlasnej tezy', desc: 'Nie broni wlasnej propozycji - jego pozycja to permanentna opozycja. Broni prawa do atakowania i wymaga od pozostalych obrony logicznej.'},
      {label: 'Cross-exam - steel manning', desc: 'Atakuje najsilniejsza wersje argumentu drugiej strony a nie strawmana. Odwraca rozumowanie i pyta jakie dowody zmienilyby zdanie autora.'},
      {label: 'Closing - warunkowe GO', desc: 'Zamyka glosem warunkowym - nigdy pelne TAK, zawsze TAK pod warunkiem ze rozwiazuje wektory porazki X Y Z ktore znalazl.'}
    ],
    inputs: [
      'Pytanie debaty (np. czy uruchamiac feature w piatek wieczorem)',
      'Propozycje pozostalych czterech ekspertow z rundy pierwszej',
      'Emerging consensus z rundy drugiej - glowny cel ataku',
      'Historia incydentow i post-mortemow z poprzednich projektow'
    ],
    outputs: [
      'Lista wektorow porazki uporzadkowana wg likelihood i blast radius',
      'Steel-mannowana wersja kazdej tezy z pozostalych ekspertow przed atakiem',
      'Pre-mortem opisujacy konkretne scenariusze klkeski',
      'Warunki akceptacji (GO pod warunkami X Y Z) nigdy bezwarunkowe TAK',
      'Koncowy glos z jawnym zakwestionowaniem Gold Solution nawet jesli zostanie przeglosowany'
    ],
    does: [
      'Atakuje najsilniejsze wersje argumentow a nie latwych strawmanow',
      'Prowadzi pre-mortem z perspektywy projektu ktory juz upadl',
      'Identyfikuje ukryte zalozenia ktorych nikt nie kwestionowal',
      'Szuka rzadkich ale katastrofalnych wektorow porazki',
      'Zadaje aby kazdy ekspert nazwal warunki zmiany swojego zdania',
      'Odnajduje konflikty interesow i motywacje za tezami',
      'Przypomina historyczne porazki o podobnej sygnaturze',
      'Wymusza warunkowe akceptacje zamiast bezwarunkowych zgody'
    ],
    doesNotDo: [
      'Nie broni zadnego konkretnego rozwiazania - bez lojalnosci domenowej',
      'Nie szuka kompromisu - od tego jest Syntetyk',
      'Nie gloryfikuje innowacji - to robota Innowatora',
      'Nie wymaga dowodow empirycznych - to robota Analityka',
      'Nie broni uzytkownika - to robota Rzecznika',
      'Nie wycofuje sie z ataku tylko dlatego ze zesp ol sie niecierpliwi',
      'Nie akceptuje ze jeden pre-mortem wystarczy - pyta co jeszcze'
    ],
    antiPatterns: [
      'Contrarianism For Its Own Sake - atakowanie dla atakowania bez konstruktywnej tresci',
      'Strawman Fallacy - atakowanie slabszej wersji argumentu zamiast najsilniejszej',
      'Nihilism Spiral - uznanie ze kazda decyzja ma wady wiec zadna nie jest dobra',
      'Chicken Little - przesadne ostrzeganie przed ryzykami o niskim prawdopodobieсstwie',
      'Post-Mortem Tourism - cytowanie wszystkich porazek swiata bez zrozumienia kontekstu'
    ],
    keyConcepts: [
      {term: 'Pre-mortem', def: 'Technika wyobrazenia porazki projektu i pracy wstecznej do aktualnego momentu aby zapobiec znanym pulapkom.'},
      {term: 'Steel man', def: 'Reprezentacja argumentu przeciwnika w jego najsilniejszej moznej wersji przed atakowaniem.'},
      {term: 'Red team', def: 'Zespol wynajety do atakowania wlasnej organizacji aby znalezc luki zanim zrobi to przeciwnik.'},
      {term: 'Fat tail risk', def: 'Rzadkie zdarzenia o katastrofalnych konsekwencjach ktorych tradycyjna statystyka nie wykryje.'},
      {term: 'Black swan', def: 'Zdarzenie o niskim prawdopodobieсstwie i wielkim wplywie ktore wyjasnia sie tylko post-hoc.'}
    ],
    stats: [
      {label: 'Rundy debaty', value: '3 rundy'},
      {label: 'Argumentow', value: '12-16 na debate'},
      {label: 'Load', value: '90/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'Gdy zespol zbyt szybko osiagnal konsensus i podejrzewasz group-think',
      'Gdy koszt porazki jest wysoki - produkcja, bezpieczeсstwo, finanse',
      'Gdy trzeba stress-testowac plan przed kosztowna inwestycja'
    ],
    worstFor: [
      'Gdy zespol jest demoralizowany i potrzebuje raczej wsparcia niz ataku',
      'Gdy decyzja jest maloinwazyjna i mozna ja odwolac w 5 minut',
      'Gdy budzet czasowy nie pozwala na pelny pre-mortem'
    ],
    relatedAgents: ['expert_innovator', 'qa_security', 'synthesizer'],
    glossary: [
      {term: 'devil advocate', definition: 'Rola strukturalna polegajaca na celowym bronieniu stanowiska przeciwnego aby wzmocnic debate.'},
      {term: 'groupthink', definition: 'Zjawisko kiedy spoisty zespol daje priorytet harmonii ponad krytyczna ocena alternatyw.'},
      {term: 'normal accidents', definition: 'Teoria Charlesa Perrowa o katastrofach wynikajacych z nieuniknionych interakcji w zlozonych systemach.'},
      {term: 'swiss cheese', definition: 'Model porazki bezpieczeсstwa w ktorym dziurki w kolejnych warstwach obrony ustawiaja sie linia.'},
      {term: 'epistemic humility', definition: 'Uznanie granic wlasnej wiedzy i gotowosc do zmiany zdania w swietle dowodu.'}
    ],
    learningQuote: 'Moja lojalnosc nie jest wobec zadnej tezy tylko wobec prawdy - a prawda to czesto najblizej kryje sie tam gdzie zespol chce najmniej patrzec.',
    realExample: 'Pewnego razu zespol konsensualnie planowal release w piatek o 17 bo featureje byl prosty. Zrobiлem pre-mortem i znalazlem ze ostatnie trzy wielkie incydenty w firmie byly w piatki bo on-call junior. Wymusilem warunkowe GO - release tak, ale w srode rano. Wdrozenie przeszlo gladko, Devil zostal wymieniony w post-mortemie jako powod dla ktorego nie stalo sie nic zlego.'
  },
  decision_presenter: {
    tagline: 'Neutralny bramownik Human-in-the-Loop - prezentuje opcje bez rekomendacji',
    missionShort: 'Decision Presenter zbiera propozycje z poprzedniej fazy, identyfikuje 2-3 opcje z kompromisami i prezentuje je uzytkownikowi bezstronnie. Jego misja: dac czlowiekowi kontrole nad kluczowymi rozgalezieniami pipelinu. Pauzuje prace agentow, czeka na decyzje, loguje werdykt.',
    whoIs: 'Decision Presenter to agent-bailiff w sali rozpraw - staje miedzy fazami pipelinu, pauzuje prace pozostalych agentow i prezentuje czlowiekowi opcje. Zachowuje sie jak neutralny moderator debaty: nigdy nie rekomenduje, nigdy nie faworyzuje, tylko uklada karty opcji z plusami i minusami.',
    analogy: 'Decision Presenter jest jak bailiff sali rozpraw - nie jest sedzia ani prokuratorem, tylko prezentuje sprawy stojacy obok lawy sedziowskiej i czeka az sedzia (czlowiek) powie werdykt.',
    howItWorks: [
      {label: 'Zbior propozycji', desc: 'Czyta wyniki poprzedniej fazy (research, debata Five Minds, build) i ekstrahuje 2-3 rozwazane kierunki. Kazdy kierunek musi byc istotnie rozny, zeby wybor mial sens.'},
      {label: 'Formatowanie opcji', desc: 'Uklada karty A/B/C z zestandaryzowana struktura: tytul, opis, plusy, minusy, koszt, timeline, ryzyka. Wszystkie karty maja identyczna forme, zeby zadna nie wygladala lepiej wizualnie.'},
      {label: 'Prezentacja z timerem', desc: 'Wyswietla overlay HITL z kartami i timerem 120s. Uzytkownik widzi odliczanie i moze wybrac opcje klikiem lub czekac na auto-decyzje.'},
      {label: 'Log i kontynuacja', desc: 'Zapisuje decyzje do Dialog Timeline: czas reakcji, wybor, auto vs manualna. Wznawia pipeline z wybrana opcja i nie ingeruje juz w dalsza prace.'}
    ],
    inputs: [
      'Wyniki poprzedniej fazy (raporty researcherow, debata ekspertow, prototyp)',
      'Predefiniowane warianty decyzji per brama (np. stack A/B/C)',
      'Timeout w sekundach (default 120s) i opcja rekomendowana na auto',
      'Kontekst projektu (cele, budzet, timeline) do wyswietlenia w naglowku'
    ],
    outputs: [
      'Overlay HITL z 2-3 kartami opcji A/B/C i timerem',
      'Werdykt czlowieka zapisany do Dialog Timeline',
      'Metadata: czas reakcji, auto vs manualna, uzytkownik',
      'Wznowiony pipeline z wybrana opcja jako argumentem kolejnej fazy',
      'Audit trail ktory mozna pozniej przegladac jako historie decyzji'
    ],
    does: [
      'Prezentuje 2-3 opcje decyzyjne w kartach z pro/contra i jednolita struktura',
      'Zarzadza timerem 120s z wizualnym odliczaniem i progressbarem',
      'Auto-decyduje po uplywie czasu wybierajac opcje oznaczona jako rekomendowana',
      'Loguje wszystkie decyzje (czas reakcji, wybor, auto vs manualna) do Dialog Timeline',
      'Pauzuje pipeline miedzy fazami dajac czas na refleksje czlowiekowi',
      'Zbiera wyniki poprzedniej fazy jako kontekst dla uzytkownika',
      'Dziala jako audit trail - kazda decyzja ma papierowy slad z uzasadnieniem',
      'Pokazuje ryzyka i koszty kazdej opcji w tej samej skali wizualnej'
    ],
    doesNotDo: [
      'Nie rekomenduje ani nie faworyzuje zadnej opcji (neutralnosc to podstawa roli)',
      'Nie generuje opcji dynamicznie (opcje sa predefiniowane per brama decyzyjna)',
      'Nie blokuje pipelinu na stale (timeout 120s gwarantuje kontynuacje)',
      'Nie ingeruje w prace agentow (dziala miedzy fazami, nie podczas)',
      'Nie interpretuje wynikow poprzedniej fazy (cytuje dokladnie jak sa)',
      'Nie zmienia raz wyswietlonych opcji (uzytkownik widzi stabilny zestaw)',
      'Nie komunikuje sie z innymi agentami poza Orkiestratorem, ktory go wola'
    ],
    antiPatterns: [
      'Hidden Bias - prezentacja opcji gdzie jedna ma wiekszy font lub lepsze kolory, sugerujaca wybor.',
      'Decision Fatigue - zbyt wiele bram HITL w pipeline, 3 bramy w Deep Five Minds to optimum.',
      'Rubber Stamp - uzytkownik zawsze wybiera rekomendowana bez czytania, bo opcje sa slabo zroznicowane.',
      'False Choice - opcje ktore sa praktycznie identyczne, stwarzajac iluzje wyboru bez realnego rozgalezienia.',
      'No Auto Fallback - brak opcji domyslnej gdy uzytkownik jest offline, pipeline zawiesza sie na zawsze.'
    ],
    keyConcepts: [
      {term: 'HITL gate', def: 'Brama Human-in-the-Loop miedzy fazami pipeline gdzie czlowiek podejmuje kluczowa decyzje.'},
      {term: 'Auto-decision', def: 'Mechanizm bezpieczenstwa wybierajacy domyslna opcje po timeout gdy uzytkownik nie odpowiada.'},
      {term: 'Neutral presentation', def: 'Zasada ze wszystkie opcje maja identyczny format wizualny, zeby zadna nie dominowala.'},
      {term: 'Audit trail', def: 'Papierowy slad decyzji z timestampem, wyborem i uzasadnieniem do pozniejszego przegladu.'},
      {term: 'Decision fatigue', def: 'Spadek jakosci decyzji gdy czlowiek musi wybierac zbyt czesto, znany problem UX.'}
    ],
    stats: [
      {label: 'Timeout', value: '120s'},
      {label: 'Opcje', value: '2-3'},
      {label: 'Load', value: '30/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'Gdy pipeline ma kluczowe rozgalezienie (wybor stacku, kierunku, architektury) wymagajace wiedzy domenowej',
      'Gdy chcesz audit trail decyzji dla audytu compliance lub retrospektywy projektu',
      'Gdy projekt jest na tyle wazny ze auto-decyzje bez czlowieka byloby zbyt ryzykowne'
    ],
    worstFor: [
      'Gdy zadanie jest proste i bramy HITL dodaja tylko tarcie bez wartosci',
      'Gdy uzytkownik jest offline i nie mozna czekac na decyzje czlowieka',
      'Gdy decyzja jest mechaniczna i mozna ja zautomatyzowac deterministycznym regulamin'
    ],
    relatedAgents: ['orchestrator', 'expert_devil', 'qa_manager'],
    glossary: [
      {term: 'hitl', definition: 'Human-in-the-Loop - paradygmat gdzie czlowiek interweniuje w kluczowych punktach decyzyjnych pipelinu.'},
      {term: 'timeout', definition: 'Maksymalny czas oczekiwania na decyzje uzytkownika, po ktorym aktywuje sie auto-decision.'},
      {term: 'overlay', definition: 'Warstwa UI wyswietlona nad glownym interfejsem pauzujaca interakcje z tlem.'},
      {term: 'audit trail', definition: 'Zapisany slad kazdej decyzji z timestampem i meta-danymi do pozniejszej inspekcji.'},
      {term: 'neutrality', definition: 'Zasada bezstronnosci gdzie prezenter nigdy nie sugeruje wyboru, tylko pokazuje opcje.'}
    ],
    learningQuote: 'Neutralny prezenter jest trudniejszy niz mogloby sie wydawac - najmniejsza sugestia w kolorze lub kolejnosci opcji zniekstalca decyzje czlowieka, dlatego format musi byc identyczny dla kazdej karty.',
    realExample: 'Pewnego dnia prezentowalem trzy opcje stacku po fazie researchu: Next.js, SvelteKit, Astro. Kazda karta miala identyczny font, identyczny uklad pro/contra i identyczny naglowek. Uzytkownik wybral SvelteKit po 40 sekundach, a jego decyzje zapisalem do Dialog Timeline jako manualna z czasem reakcji 40.2s.'
  },
  db_architect: {
    tagline: 'Urbanista danych - projektuje autostrady indeksow zanim ruszy ruch zapytan',
    missionShort: 'Architekt Bazy projektuje schemat, klucze, indeksy, constraints i plan migracji bezprzerwowych. Jego misja to dobranie modelu danych (relacyjny, dokumentowy, kolumnowy) pod realne wzorce zapytan i wolumen, zanim aplikacja uderzy produkcyjnie w baze.',
    whoIs: 'Architekt Bazy to inzynier transportu miejskiego, ktory rysuje siec drog, wezlow i swiatel, zanim pierwszy samochod wjedzie do miasta. Mysli latami naprzod, bo migracja schematu na zywej bazie to jak przebudowa skrzyzowania w godzinach szczytu.',
    analogy: 'Architekt Bazy jest jak urbanista, ktory projektuje autostrady, zjazdy i sygnalizacje tak, by godzina szczytu nie zablokowala calego miasta.',
    howItWorks: [
      {label: 'Analiza domeny', desc: 'Rozpoznaje encje, relacje, kardynalnosci i wzorce zapytan. Odroznia dane transakcyjne OLTP od analitycznych OLAP i wybiera model danych pod charakter obciazenia.'},
      {label: 'Schemat i klucze', desc: 'Projektuje tabele, typy kolumn, klucze glowne, klucze obce i constraints. Dobiera normalizacje lub swiadomie denormalizuje dla wydajnosci odczytu.'},
      {label: 'Indeksy i partycje', desc: 'Buduje indeksy pod konkretne zapytania (covering, czesciowe, funkcyjne), definiuje strategie partycjonowania i archiwizacji. Liczy query plan przed wdrozeniem.'},
      {label: 'Plan migracji', desc: 'Pisze migracje zero-downtime z rollback, kolejnoscia krokow i oknami utrzymaniowymi. Opisuje ryzyka lockowania i kompatybilnosc backward.'}
    ],
    inputs: [
      'Model domenowy i opis przypadkow uzycia aplikacji',
      'Szacowany wolumen danych, QPS, rozmiar rekordow',
      'Wymagania SLA (read latency, write latency, retencja)',
      'Istniejacy schemat lub baza do migracji jesli jest'
    ],
    outputs: [
      'Diagram ERD i pelna definicja DDL (CREATE TABLE, constraints)',
      'Lista indeksow z uzasadnieniem per zapytanie',
      'Strategia partycjonowania i archiwizacji danych',
      'Skrypty migracji zero-downtime z rollback',
      'Raport ryzyk i punktow kontaktowych aplikacji'
    ],
    does: [
      'Projektuje schematy relacyjne i NoSQL pod realne wzorce zapytan',
      'Dobiera indeksy covering i czesciowe redukujace czas zapytan o rzedy wielkosci',
      'Buduje strategie partycjonowania czasowego i hashowego dla duzych tabel',
      'Pisze migracje zero-downtime wykorzystujac shadow tables i backfill',
      'Analizuje query plan i wykrywa full scan oraz missing index przed wdrozeniem',
      'Definiuje klucze, constraints i triggery wymuszajace integralnosc danych',
      'Rekomenduje connection pooling, read replica i caching warstwowy',
      'Oblicza budzet storage i przewiduje wzrost na 12-24 miesiace'
    ],
    doesNotDo: [
      'Nie pisze kodu aplikacji ani warstwy ORM (to domena backendu)',
      'Nie projektuje UI do wyswietlania danych (to domena designera)',
      'Nie uruchamia migracji produkcyjnych bez zatwierdzenia manager QA',
      'Nie decyduje o retencji danych wrazliwych bez control mapper',
      'Nie konfiguruje infrastruktury serwerowej ani kopii zapasowych (to ops)',
      'Nie prowadzi EDA ani modelowania statystycznego (to eda_analyst)',
      'Nie optymalizuje pojedynczych zapytan bez kontekstu calego wzorca obciazenia'
    ],
    antiPatterns: [
      'Index Everything - zakladanie indeksow na kazdej kolumnie zamiast projektowania pod zapytania',
      'Big Bang Migration - jedna migracja blokujaca tabele na godziny zamiast krokow inkrementalnych',
      'Premature Denormalization - denormalizacja zanim wiadomo jakie zapytania naprawde beda czeste',
      'Missing Foreign Keys - rezygnacja z FK dla wydajnosci zapisu kosztem integralnosci danych',
      'Cargo Cult NoSQL - wybor dokumentowej bazy bo tak robia inni, bez analizy wzorca dostepu'
    ],
    keyConcepts: [
      {term: 'Query plan', def: 'Plan wykonania zapytania ujawniajacy czy silnik uzyje indeksu, full scan czy hash join.'},
      {term: 'Covering index', def: 'Indeks zawierajacy wszystkie kolumny potrzebne zapytaniu, eliminujacy odczyt z tabeli.'},
      {term: 'MVCC', def: 'Multi-version concurrency control - wersjonowanie wierszy umozliwiajace czytanie bez blokowania zapisow.'},
      {term: 'Zero-downtime migration', def: 'Migracja w krokach backward-compatible pozwalajaca na rollback bez przestoju aplikacji.'},
      {term: 'Lock contention', def: 'Rywalizacja o blokady wierszy lub tabel skutkujaca timeoutami i spowolnieniem zapisow.'}
    ],
    stats: [
      {label: 'Faza', value: 'BUILD'},
      {label: 'Kategoria', value: 'Dane'},
      {label: 'Load', value: '70/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy startujesz nowy projekt i musisz dobrac model danych oraz schemat pod kilka lat rozwoju',
      'Gdy planujesz migracje schematu na zywej bazie bez przestoju uslugi',
      'Gdy aplikacja zwalnia i trzeba rozpoznac czy problem lezy w schemacie, indeksach czy zapytaniach'
    ],
    worstFor: [
      'Gdy potrzebujesz tylko szybkiej zmiany pojedynczego query w istniejacym schemacie',
      'Gdy problem jest w warstwie aplikacji lub cache, a baza dziala poprawnie',
      'Gdy decyzja dotyczy tylko infrastruktury lub operacji backupow, nie modelu danych'
    ],
    relatedAgents: ['backend', 'eda_analyst', 'qa_perf'],
    glossary: [
      {term: 'covering index', definition: 'Indeks zawierajacy wszystkie kolumny zapytania, eliminujacy dodatkowy odczyt z tabeli.'},
      {term: 'query plan', definition: 'Wyjscie komendy EXPLAIN pokazujace jak silnik bazy wykona zapytanie i uzyje indeksow.'},
      {term: 'lock contention', definition: 'Rywalizacja transakcji o te same blokady wierszy lub tabel, skutkujaca oczekiwaniem i timeoutami.'},
      {term: 'WAL', definition: 'Write-ahead log - dziennik zmian zapisywany przed modyfikacja tabel dla trwalosci i replikacji.'},
      {term: 'MVCC', definition: 'Multi-version concurrency control - mechanizm wersjonowania wierszy umozliwiajacy rownolegle czytanie i pisanie.'}
    ],
    learningQuote: 'Dobry schemat bazy nie powstaje przy pierwszym requescie - powstaje po zrozumieniu, jakie zapytania beda dzialac za rok.',
    realExample: 'Pewnego dnia projektowalem schemat dla platformy logowania zdarzen z 200 mln rekordow miesiecznie. Zamiast jednej tabeli events dodalem partycjonowanie miesieczne i covering index na (tenant_id, created_at). Zapytania analityczne przyspieszyly z 45 sekund do 200 milisekund, a archiwizacja stara partycji zajmuje teraz sekunde zamiast godzin.'
  },
  observability_engineer: {
    tagline: 'Kontroler ruchu lotniczego systemu - trzy radary: metryki, logi, traces',
    missionShort: 'Inzynier Obserwowalnosci instrumentuje system trzema filarami: metrykami, logami i tracingami. Jego misja to dac zespolowi dashboard i alerty, dzieki ktorym incydent zostaje wykryty zanim klient zadzwoni, a przyczyna ustalona w minutach a nie godzinach.',
    whoIs: 'Inzynier Obserwowalnosci to kontroler ruchu lotniczego, ktory ma przed soba trzy rozne radary jednoczesnie. Kazdy pokazuje co innego - wysokosc, polozenie, prognoze - a jego praca polega na tym, by zanim cokolwiek przestanie latac, wiadomo bylo co sie stalo.',
    analogy: 'Inzynier Obserwowalnosci jest jak kontroler lotow patrzacy na trzy ekrany jednoczesnie - kazdy pokazuje inna warstwe prawdy o locie systemu.',
    howItWorks: [
      {label: 'Audyt trzech filarow', desc: 'Rozpoznaje co juz istnieje w metrykach, logach i tracingach. Identyfikuje luki pokrycia i punkty slepe, zwlaszcza na granicach miedzy serwisami.'},
      {label: 'Definicja SLI i SLO', desc: 'Dobiera kluczowe wskazniki (latency p99, error rate, traffic, saturation) i ustala budzety bledow. Lacze cele techniczne z umowami biznesowymi SLA.'},
      {label: 'Instrumentacja', desc: 'Dodaje OpenTelemetry w kluczowych punktach: request span, DB calls, external APIs. Dba o propagacje traceid i niska kardynalnosc etykiet.'},
      {label: 'Dashboardy i alerty', desc: 'Buduje dashboardy w ukladzie golden signals oraz alerty oparte o burn rate budzetu bledow, nie o suche progi. Dostraja alarmy by nie generowaly szumu.'}
    ],
    inputs: [
      'Architektura systemu i lista krytycznych sciezek uzytkownika',
      'Wymagania SLA (dostepnosc, latency p99)',
      'Istniejacy stack obserwowalnosci jesli istnieje',
      'Budzet i polityka retencji telemetrii'
    ],
    outputs: [
      'Specyfikacja SLI/SLO z budzetami bledow',
      'Plan instrumentacji OpenTelemetry per serwis',
      'Dashboardy Grafana/Datadog w ukladzie golden signals',
      'Reguly alertow oparte o burn rate (fast/slow)',
      'Runbook reagowania na kazdy alert z linkiem do dashboardu'
    ],
    does: [
      'Definiuje SLI i SLO pod rzeczywiste cele biznesowe, nie abstrakcyjne progi',
      'Instrumentuje aplikacje za pomoca OpenTelemetry bez vendor lock-in',
      'Projektuje dashboardy w ukladzie golden signals (latency, traffic, errors, saturation)',
      'Konfiguruje alerty na burn rate budzetu bledow redukujac fatige alarmow',
      'Wymusza niska kardynalnosc etykiet zapobiegajac eksplozji kosztow metryk',
      'Propaguje traceid przez granice serwisow laczac logi z trace span',
      'Identyfikuje punkty slepe pokrycia zwlaszcza na granicach asynchronicznych',
      'Pisze runbooki laczace kazdy alert z konkretnym dashboard i procedura'
    ],
    doesNotDo: [
      'Nie pisze kodu biznesowego aplikacji (to domena backendu)',
      'Nie zarzadza infrastruktura chmurowa ani sieciami (to ops)',
      'Nie decyduje o retencji danych osobowych bez control mapper',
      'Nie prowadzi sledztwa incydentow jako pierwsza linia (to telemetry_surfer)',
      'Nie testuje wydajnosci pod obciazeniem (to qa_perf)',
      'Nie naprawia bledow w kodzie wykrytych przez monitoring',
      'Nie zajmuje sie dashboardami biznesowymi marketingu ani sprzedazy'
    ],
    antiPatterns: [
      'Cardinality Explosion - etykiety o wysokiej kardynalnosci (user_id, request_id) wysadzajace pamiec metryk',
      'Alert Fatigue - dziesiatki alertow na suche progi generujacych szum zamiast sygnal',
      'Vanity Dashboard - kolorowe wykresy bez SLO ktore nie odpowiadaja na pytanie czy system zdrowy',
      'Log Everything - logowanie wszystkiego na INFO przepelniajace dyski i koszty',
      'Trace Blindspot - brak propagacji traceid na granicy async skutkujacy niedokonczonymi traces'
    ],
    keyConcepts: [
      {term: 'Golden signals', def: 'Cztery kluczowe metryki systemu: latency, traffic, errors, saturation (SRE Google).'},
      {term: 'SLI/SLO', def: 'Service Level Indicator mierzy realne zachowanie, SLO to cel ktory chcemy utrzymac.'},
      {term: 'Error budget', def: 'Dozwolona ilosc bledow w danym okresie, ponizej ktorej zespol moze ryzykowac zmiany.'},
      {term: 'Burn rate', def: 'Tempo konsumpcji budzetu bledow - pozwala alertowac szybciej niz suche progi.'},
      {term: 'Cardinality', def: 'Liczba unikalnych kombinacji etykiet metryki - wysoka kardynalnosc wysadza pamiec TSDB.'}
    ],
    stats: [
      {label: 'Faza', value: 'BUILD'},
      {label: 'Kategoria', value: 'Observability'},
      {label: 'Load', value: '65/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy startujesz produkcyjny system i chcesz od pierwszego dnia widziec co sie dzieje',
      'Gdy masz incydenty trwajace dlugo bo nikt nie wie gdzie patrzec',
      'Gdy rosna koszty telemetrii i trzeba ustalic co mierzyc a czego nie'
    ],
    worstFor: [
      'Gdy system ma dwoch uzytkownikow i nie istnieje prawdziwe obciazenie',
      'Gdy problem jest lokalny w jednym kawalku kodu a nie w architekturze telemetrii',
      'Gdy potrzebujesz sledztwa konkretnego incydentu tu i teraz (to telemetry_surfer)'
    ],
    relatedAgents: ['telemetry_surfer', 'qa_perf', 'backend'],
    glossary: [
      {term: 'golden signals', definition: 'Cztery kluczowe metryki zdrowia systemu: latency, traffic, errors, saturation.'},
      {term: 'cardinality', definition: 'Liczba unikalnych kombinacji etykiet metryki wplywajaca bezposrednio na koszt i wydajnosc bazy TSDB.'},
      {term: 'exemplar', definition: 'Przykladowy trace span powiazany z punktem w histogramie, klikalny prosto z wykresu do trace.'},
      {term: 'error budget', definition: 'Dozwolona pula bledow lub niedostepnosci w danym okresie wyznaczona przez SLO.'},
      {term: 'burn rate', definition: 'Tempo w jakim system konsumuje budzet bledow, podstawa nowoczesnych alertow.'}
    ],
    learningQuote: 'Jesli widzisz tylko jeden filar telemetrii, to latasz po omacku - pelna obserwowalnosc to metryki, logi i traces razem.',
    realExample: 'Pewnego dnia instrumentowalem mikroserwis platniczy, ktory gubil 2 procent transakcji bez zadnego bledu w logach. Dodalem trace span na webhook callback i odkrylem ze load balancer timeoutowal przy p99 latency skoku. Traceid powiazany z logiem pokazal dokladnie ktore pole payloadu powodowalo to spowolnienie.'
  },