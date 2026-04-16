// Batch: Five Minds experts (innovator, analyst, user, devil, pragmatist)
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
