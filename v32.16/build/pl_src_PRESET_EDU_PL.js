const PRESET_EDU_PL = {
  solo: {
    tagline: 'Mistrz i uczen w warsztacie - dwoch agentow, jedno zadanie, zero narzutu',
    missionShort: 'Solo + Walidator to najminimalniejsza konfiguracja multi-agent: Orkiestrator deleguje zadanie jednemu workerowi i sam waliduje efekt. Sluzy do prostych bugfixow, refactoringow i skryptow, gdzie rozwiazanie jest znane a zlozonosc minimalna.',
    whoIs: 'Po ten preset siegniesz gdy masz jedno, konkretne zadanie ze znanym rozwiazaniem: literowka w kodzie, drobny bug, maly refactor, skrypt CLI lub prosta implementacja CRUD. Reguls 45% mowi, ze prawie polowa wszystkich zadan programistycznych miesci sie wlasnie w tym formacie.',
    analogy: 'Ten preset to jak mistrz i czeladnik w warsztacie - mistrz przyjmuje zamowienie i deleguje czeladnikowi, a na koncu oglada spoiny i albo zatwierdza, albo wskazuje co poprawic.',
    howItWorks: [
      {label: 'Analiza zadania', desc: 'Orkiestrator ocenia zlozonosc (S/M) i decyduje czy Solo wystarczy, czy trzeba eskalowac do wiekszego presetu.'},
      {label: 'Instrukcja Narrow Context', desc: 'Orkiestrator tworzy precyzyjna instrukcje z TYLKO potrzebnymi informacjami i deleguje do Backend Dev.'},
      {label: 'Implementacja', desc: 'Backend Dev pisze kod, dodaje testy jednostkowe, obsluguje bledy i zwraca gotowy artefakt.'},
      {label: 'Walidacja PASS/FAIL', desc: 'Orkiestrator sprawdza poprawnosc i zgodnosc z wymaganiami. PASS - dostawa. FAIL - feedback i jedna dodatkowa iteracja.'}
    ],
    inputs: [
      'Opis konkretnego zadania (bug, refactor, skrypt, mala funkcja)',
      'Istniejacy kod lub wskazanie pliku ktory nalezy zmodyfikowac',
      'Kryteria akceptacji (co znaczy "dziala")',
      'Opcjonalnie: testy jednostkowe do zapewnienia'
    ],
    outputs: [
      'Gotowy kod naprawiajacy bug lub realizujacy zadanie',
      'Testy jednostkowe glownej sciezki i edge cases',
      'Raport Orkiestratora PASS z krotkim opisem zmiany',
      'Lista zmodyfikowanych plikow',
      'Opcjonalnie: adnotacje o pozostalych ryzykach do obserwacji'
    ],
    does: [
      'Naprawia proste bugi ze znanym rozwiazaniem',
      'Refaktoruje male fragmenty kodu bez zmian w API',
      'Pisze skrypty automatyzujace i narzedzia CLI',
      'Implementuje prosty CRUD w jednej warstwie stacku',
      'Dodaje testy jednostkowe tam gdzie ich brak',
      'Walidacja wyniku przez niezalezny meta-agent zamiast self-review',
      'Rozdziela meta-rozumowanie (Opus) od ekspertyzy kodu (Sonnet)',
      'Minimalizuje koszt przez absolutny brak koordynacji'
    ],
    doesNotDo: [
      'Nie prowadzi researchu (brak Researchera - uzyj Recon)',
      'Nie robi fazy planowania (brak Planera - uzyj Plan & Execute)',
      'Nie dotyka frontendu gdy zadanie jest full-stack (uzyj Trio)',
      'Nie audytuje bezpieczenstwa (brak QA Security - uzyj Security)',
      'Nie iteruje w petli fix-test (to domena Quick Fix)',
      'Nie obsluguje zadan wymagajacych wielu perspektyw eksperckich',
      'Nie skaluje sie powyzej zadan typu Small/Medium'
    ],
    antiPatterns: [
      'Solo na hot path - uzycie Solo do kodu platnosci lub autoryzacji bez QA Security',
      'Solo Overreach - pchanie skomplikowanego featura full-stack w 2 agentow zamiast eskalowac do Trio',
      'Infinite Retry - trzymanie Solo w kolko mimo ze Orkiestrator co chwila FAIL, zamiast eskalowac',
      'Research Skip - pomijanie researchu gdy technologia jest nieznana, czyli podejmowanie decyzji na slepo',
      'Solo dla MVP - proba zbudowania calego MVP jednym workerem zamiast uzyc presetu Startup'
    ],
    keyConcepts: [
      {term: 'Direct Delegation', def: 'Najprostszy wzorzec multi-agent: hub z jedna szprycha, jedno polaczenie dwukierunkowe.'},
      {term: 'Regula 45%', def: 'Empiryczne obserwacje mowia ze okolo polowa zadan programistycznych miesci sie w formacie 2 agentow.'},
      {term: 'Narrow Context', def: 'Zasada przekazywania agentowi TYLKO tych informacji ktore sa mu niezbedne, bez nadmiaru.'},
      {term: 'Specjalizacja modeli', def: 'Opus dla meta-rozumowania, Sonnet dla implementacji - kazdy model na swoim polu.'},
      {term: 'Self-review vs walidacja', def: 'Osobny walidator jest bardziej wiarygodny niz twoja wlasna ocena tego co wlasnie napisales.'}
    ],
    stats: [
      {label: 'Agenci', value: '2'},
      {label: 'Fazy', value: '2'},
      {label: 'Koszt est.', value: '$0.55-1.40'},
      {label: 'Czas', value: '<1 min'}
    ],
    bestFor: [
      'Gdy masz jedno konkretne zadanie ze znanym rozwiazaniem i nie potrzebujesz researchu',
      'Gdy zalezy ci na najnizszym mozliwym koszcie i najszybszym czasie odpowiedzi',
      'Gdy chcesz naprawic literowke, drobny bug lub dodac maly skrypt'
    ],
    worstFor: [
      'Gdy zadanie wymaga zrozumienia zarowno backendu jak i frontendu (uzyj Trio)',
      'Gdy zadanie dotyka kodu security-critical lub platnosci (uzyj Security)',
      'Gdy potrzebujesz iteracyjnej walidacji w petli fix-test (uzyj Quick Fix)'
    ],
    relatedPresets: ['quick_fix', 'recon', 'trio'],
    glossary: [
      {term: 'orkiestrator', definition: 'Agent strategiczny na Opusie ktory deleguje zadania i waliduje wyniki, nie pisze kodu.'},
      {term: 'backend dev', definition: 'Agent implementacyjny na Sonnecie ktory pisze kod, testy i obsluguje bledy.'},
      {term: 'POC', definition: 'Proof of Concept - dzialajacy przyklad demonstrujacy ze podejscie jest wykonalne.'},
      {term: 'narrow context', definition: 'Minimalistyczne przekazywanie tylko tych informacji ktore sa niezbedne do zadania.'},
      {term: 'direct delegation', definition: 'Wzorzec w ktorym orkiestrator deleguje zadanie bezposrednio jednemu workerowi bez warstw posrednich.'}
    ],
    learningQuote: 'Prostota to najwyzszy poziom wyrafinowania - Solo nie wybiera prostoty dlatego ze musi, ale dlatego ze dla polowy zadan to najlepszy mozliwy wybor.',
    realExample: 'Wyobraz sobie ze zglosze bug: formularz logowania nie walidouje pustego emaila. Znasz rozwiazanie - dodac if na frontendzie. Ten preset bierze twoj opis, Orkiestrator kieruje do Backend Dev ktory dodaje walidacje i test regresji, Orkiestrator potwierdza PASS w 30 sekund. Zero czekania, zero koordynacji, minimalny koszt.'
  },
  quick_fix: {
    tagline: 'Serwis samochodowy dla kodu - naprawiaj i testuj w kolko az zadziala',
    missionShort: 'Quick Fix to najmniejszy zespol z petla zwrotna: Backend Dev naprawia, niezalezny QA Quality testuje, cykl powtarza sie az do PASS. Zaprojektowany do pilnych bugfixow, hotfixow i patchy gdzie pojedyncza proba to za malo.',
    whoIs: 'Po ten preset siegniesz gdy masz bug ktory musisz wypuscic dzisiaj i nie mozesz pozwolic sobie na regresje. Trzech agentow w konfiguracji Fix-Test Loop redukuje defekty o 60-80% wzgledem jednorazowego wykonania, dzieki niezaleznemu audytorowi po kazdej probie.',
    analogy: 'Ten preset to jak serwis samochodowy: mechanik naprawia usterke, kontroler jakosci robi jazde probna i jesli znajdzie problem, samochod wraca do mechanika - i tak w kolko az kontroler podpisze PASS.',
    howItWorks: [
      {label: 'Przyjecie zgloszenia', desc: 'Orkiestrator przyjmuje raport o bledzie, analizuje severity i scope, tworzy precyzyjna instrukcje dla buildera.'},
      {label: 'Fix w Narrow Context', desc: 'Backend Dev diagnozuje root cause, implementuje naprawe, pisze test regresji i uruchamia testy lokalnie.'},
      {label: 'Niezalezny test', desc: 'QA Quality uruchamia suite testow, sprawdza edge cases i regresje, generuje raport PASS albo FAIL z konkretnymi uwagami.'},
      {label: 'Petla az do PASS', desc: 'Jesli FAIL - wracamy do kroku 2 z feedbackiem. Limit 3-4 iteracji, potem eskalacja do wiekszego presetu.'}
    ],
    inputs: [
      'Raport o bledzie ze steps to reproduce i oczekiwanym zachowaniem',
      'Istniejacy kod z dotknietego obszaru plus powiazane testy',
      'Severity buga (blocker, critical, major, minor)',
      'Kryteria akceptacji dla PASS (co musi dzialac)'
    ],
    outputs: [
      'Naprawiony kod z komentarzem wyjasniajacym root cause',
      'Test regresji zapobiegajacy ponownemu wystapieniu buga',
      'Raport QA Quality PASS po zaliczonej petli',
      'Lista iteracji z komentarzami co naprawiono w kazdej rundzie',
      'Rekomendacja eskalacji jesli QA ciagle FAIL po 3-4 rundach'
    ],
    does: [
      'Naprawia bugi wymagajace ciaglej walidacji po kazdej poprawce',
      'Obsluguje hotfixy i patche produkcyjne z niezalezna weryfikacja',
      'Wykrywa regresje przez niezaleznego audytora zamiast self-review',
      'Iteruje fix-test-fix az do prawdziwego PASS',
      'Wymusza test regresji dla kazdego buga',
      'Stosuje Smart Model Routing - Opus dla strategii, Sonnet dla kodu, Haiku dla testow',
      'Ogranicza liczbe iteracji i eskaluje gdy petla sie nie zbiega',
      'Redukuje defekty o 60-80% wzgledem jednorazowego wykonania'
    ],
    doesNotDo: [
      'Nie buduje nowych funkcji (to jest preset do NAPRAW - uzyj Feature Sprint)',
      'Nie prowadzi fazy researchu (uzyj Recon jesli nie wiesz jak naprawic)',
      'Nie dotyka frontendu gdy fix wymaga zmian UI (uzyj Trio)',
      'Nie audytuje bezpieczenstwa w glab (uzyj Security)',
      'Nie pracuje bez reprodukowalnego zgloszenia buga',
      'Nie obsluguje zmian w wielu modulach rownolegle',
      'Nie zastepuje code review przez senior developera'
    ],
    antiPatterns: [
      'Infinite Loop - Critic ciagle FAIL bez konkretnych uwag, petla kreci sie w nieskonczonosc',
      'Skipping Regression Test - builder naprawia bug ale nie dodaje testu ktory lapie powrot problemu',
      'Feature in Disguise - uzywanie Quick Fix do zamaskowania budowy nowej funkcji',
      'Shallow Fix - naprawianie objawu zamiast root cause, co gwarantuje powrot buga',
      'Noise Escalation - eskalacja do wiekszego presetu po pierwszej nieudanej iteracji zamiast dac petli zadzialac'
    ],
    keyConcepts: [
      {term: 'Fix-Test Loop', def: 'Wzorzec iteracyjnej petli w ktorym builder naprawia a niezalezny QA testuje az do PASS.'},
      {term: 'Continuous connection', def: 'Typ polaczenia w ktorym QA raportuje az do zakonczenia, nie jednorazowo.'},
      {term: 'Root cause analysis', def: 'Szukanie faktycznej przyczyny buga a nie tylko leczenie objawow.'},
      {term: 'Test regresji', def: 'Test ktory zapobiega powrotowi naprawionego buga w przyszlych zmianach.'},
      {term: 'Smart Model Routing', def: 'Przydzielanie modelu (Opus, Sonnet, Haiku) do roli w zaleznosci od stawki bledu.'}
    ],
    stats: [
      {label: 'Agenci', value: '3'},
      {label: 'Fazy', value: '3'},
      {label: 'Koszt est.', value: '$0.60-1.50'},
      {label: 'Czas', value: '1-3 min'}
    ],
    bestFor: [
      'Gdy masz pilny hotfix produkcyjny i nie mozesz pozwolic sobie na regresje',
      'Gdy bug ma wiele edge cases i jedna proba naprawy to za malo',
      'Gdy potrzebujesz niezaleznej walidacji po kazdej iteracji fixa'
    ],
    worstFor: [
      'Gdy budujesz nowa funkcje zamiast naprawiac bug (uzyj Feature Sprint)',
      'Gdy bug dotyka wielu modulow i wymaga koordynacji wielu builderow (uzyj Trio)',
      'Gdy potrzebujesz fazy researchu przed napraw (uzyj Recon)'
    ],
    relatedPresets: ['solo', 'bug_hunt', 'recon'],
    glossary: [
      {term: 'hotfix', definition: 'Pilna poprawka wdrazana bezposrednio na produkcji poza normalnym release cycle.'},
      {term: 'regresja', definition: 'Sytuacja w ktorej nowa zmiana psuje funkcjonalnosc ktora wczesniej dzialala.'},
      {term: 'edge case', definition: 'Skrajny przypadek uzycia (pusty input, maksymalna wartosc, null) ktory czesto ujawnia bugi.'},
      {term: 'PASS/FAIL', definition: 'Wynik audytu QA - PASS oznacza ze wszystkie testy przeszly, FAIL wymaga kolejnej iteracji.'},
      {term: 'continuous', definition: 'Typ polaczenia agentow gdzie audytor raportuje az do zakonczenia petli zamiast jednorazowo.'}
    ],
    learningQuote: 'Petle zwrotne sa fundamentem jakosci w systemach multi-agentowych - bez petli system polega na nadziei, z petla na gwarancji.',
    realExample: 'Wyobraz sobie ze uzytkownicy zglaszaja iz przycisk Zapisz nie dziala. Orkiestrator analizuje, Backend Dev naprawia race condition na fetch, QA Quality odkrywa ze teraz spin nie chodzi przy bledzie sieci i zglasza FAIL. Iteracja 2: builder dodaje error handling, QA znajduje missing toast. Iteracja 3: builder poprawia, QA daje PASS. Cykl zajal 4 minuty.'
  },
  recon: {
    tagline: 'Zwiad przed misja - najpierw zbadaj teren, dopiero potem buduj',
    missionShort: 'Recon Squad to trzyosobowy zespol rozpoznawczy: Researcher Tech bada opcje technologiczne, Backend Dev buduje POC na podstawie wynikow, Orkiestrator koordynuje sekwencyjne fazy. Sluzy do eksploracji nieznanych tematow i walidacji wykonalnosci przed glowna implementacja.',
    whoIs: 'Po ten preset siegniesz gdy stoisz przed nieznana technologia lub niejasnym wymaganiem i nie wiesz jak za to sie zabrac. Zamiast strzelac na slepo, wysylasz zwiadowce ktory sprawdza grunt, a dopiero potem inzynier buduje przyczolkowe rozwiazanie. Wynikiem jest POC, nie production-ready kod.',
    analogy: 'Ten preset to jak lekarz diagnozujacy przed leczeniem - najpierw zleca badania (Research), potem na podstawie wynikow wybiera terapie (Build POC), a koordynator opieki (Orkiestrator) pilnuje zeby jedno szlo za drugim a nie rownolegle w dwoch kierunkach.',
    howItWorks: [
      {label: 'Pytania badawcze', desc: 'Orkiestrator definiuje konkretne, ograniczone, mierzalne pytania badawcze na podstawie problemu uzytkownika.'},
      {label: 'Research Tech', desc: 'Researcher Tech przeszukuje dokumentacje, benchmarki i case studies, porownuje minimum 3 opcje i produkuje strukturalny raport z confidence scores.'},
      {label: 'Build POC', desc: 'Backend Dev bierze findings i buduje minimalny POC demonstrujacy wybrane podejscie (1-3 pliki, jedna hipoteza).'},
      {label: 'GO/NO-GO', desc: 'Orkiestrator ocenia kompletnosc researchu i wykonalnosc POC, wydaje rekomendacje GO, NO-GO lub przejscie do wiekszego presetu.'}
    ],
    inputs: [
      'Problem lub pytanie badawcze (np. jaki framework multi-agent wybrac)',
      'Kontekst istniejacego stacku i ograniczenia techniczne',
      'Kryteria sukcesu POC (co musi byc udowodnione)',
      'Budzet czasowy na eksploracje (godziny, nie dni)'
    ],
    outputs: [
      'Raport badawczy z TOP 3-5 opcjami, pros/cons, benchmarkami',
      'Minimalny POC w 1-3 plikach demonstrujacy wybrane podejscie',
      'Lista zidentyfikowanych ryzyk (lock-in, maintenance, security)',
      'Confidence scores dla kluczowych findingow',
      'Rekomendacja GO/NO-GO z uzasadnieniem'
    ],
    does: [
      'Eksploruje nieznane technologie przed zainwestowaniem w glowna implementacje',
      'Porownuje 3+ opcji z benchmarkami i zrodlami',
      'Buduje POC walidujacy wybrane podejscie',
      'Eliminuje bledy wyboru technologii przed rozpoczeciem projektu',
      'Implementuje wzorzec Hub-and-Spoke mini z jednym cross-spoke polaczeniem',
      'Stosuje Smart Model Routing - Opus strategii, Haiku researchu, Sonnet buildu',
      'Wymusza sekwencje Research THEN Build, nigdy rownolegle',
      'Oszczedza 10x godziny refaktoringu za godzine researchu'
    ],
    doesNotDo: [
      'Nie produkuje production-ready kodu (output to POC, nie release)',
      'Nie prowadzi researchu wielu zrodlowego (tylko 1 researcher - uzyj Research Swarm)',
      'Nie waliduje POC przez QA (brak audytora - uzyj Startup)',
      'Nie dotyka frontendu ani designu (brak FE Dev ani Designera)',
      'Nie podejmuje ostatecznej decyzji - tylko rekomenduje',
      'Nie zastepuje architekta systemowego dla duzych decyzji',
      'Nie skaluje sie do wielu paralelnych hipotez'
    ],
    antiPatterns: [
      'Analysis Paralysis - Researcher bada bez konca, POC nigdy nie powstaje',
      'Blind Building - pominiecie Researchera i skok do implementacji bez walidacji opcji',
      'POC as Production - uzywanie POC zamiast pelnej implementacji, co generuje dlug techniczny',
      'Single Source Research - cytowanie tylko jednego bloga jako kompletnego researchu',
      'Cross-Spoke Abuse - przekazywanie ogromnych raportow Researcher-Builder pomijajac Orkiestrator, bez walidacji'
    ],
    keyConcepts: [
      {term: 'Hub-and-Spoke mini', def: 'Minimalny wariant wzorca Hub-and-Spoke z jedna piasta i dwoma szprychami.'},
      {term: 'POC (Proof of Concept)', def: 'Minimalny dzialajacy przyklad udowadniajacy ze podejscie jest wykonalne.'},
      {term: 'Look Before You Leap', def: 'Zasada eliminujaca Analysis Paralysis i Blind Building przez wymuszone sekwencjonowanie.'},
      {term: 'Cross-spoke communication', def: 'Bezposrednie polaczenie dwoch szprych z pominieciem huba dla oszczednosci tokenow.'},
      {term: 'Confidence score', def: 'Liczbowa ocena pewnosci findingu, zwykle w skali 0.0-1.0.'}
    ],
    stats: [
      {label: 'Agenci', value: '3'},
      {label: 'Fazy', value: '3'},
      {label: 'Koszt est.', value: '$0.60-1.50'},
      {label: 'Czas', value: '2-4 min'}
    ],
    bestFor: [
      'Gdy oceniasz nowa technologie lub framework i nie wiesz od czego zaczac',
      'Gdy chcesz sprawdzic wykonalnosc podejscia zanim zainwestujesz w pelna implementacje',
      'Gdy potrzebujesz POC na spotkanie z klientem lub demo dla zarzadu'
    ],
    worstFor: [
      'Gdy rozwiazanie jest juz znane i nie potrzebujesz researchu (uzyj Solo)',
      'Gdy musisz wdrozyc production-ready kod (output to tylko prototyp)',
      'Gdy decyzja wymaga porownania wielu zrodel i adversarial critique (uzyj Reflect albo Research)'
    ],
    relatedPresets: ['solo', 'reflect', 'research'],
    glossary: [
      {term: 'spike', definition: 'Krotka, ograniczona eksploracja techniczna walidujaca konkretna hipoteze.'},
      {term: 'POC', definition: 'Proof of Concept - minimalny kod demonstrujacy ze podejscie dziala w praktyce.'},
      {term: 'researcher tech', definition: 'Agent na Haiku przeszukujacy dokumentacje i benchmarki, nie pisze kodu.'},
      {term: 'Hub-and-Spoke', definition: 'Wzorzec architektoniczny z centralnym hubem (Orkiestrator) i szprychami (workery).'},
      {term: 'GO/NO-GO', definition: 'Decyzja podsumowujaca POC - czy kontynuowac w pelnej implementacji czy porzucic pomysl.'}
    ],
    learningQuote: 'Jedna godzina researchu oszczedza dziesiec godzin refaktoringu - preset Recon formalizuje te zasade w najmniejszej mozliwej konfiguracji.',
    realExample: 'Wyobraz sobie ze rozwazasz migracje z Express na Fastify dla wiekszej wydajnosci. Orkiestrator definiuje pytania, Researcher Tech porownuje benchmarki i znajduje ze Fastify daje 2x throughput ale brak plugina dla waszego SSO, Backend Dev buduje POC z alternatywnym middleware ktory dziala. Rekomendacja: GO z zastrzezeniem dotyczacym SSO. Caly proces 3 minuty zamiast tygodnia spekulacji.'
  },
  trio: {
    tagline: 'Klasyczny trojkat Backend-Frontend-QA - minimalny zespol do pelnego stacku',
    missionShort: 'Classic Trio to trzech agentow dzielacych prace po naturalnych liniach full-stacku: Backend Dev pisze API i logike, Frontend Dev buduje UI i state, QA Quality testuje integracje. Jedyny preset Tier 1 bez Orkiestratora - agenci komunikuja sie peer-to-peer przez kontrakty API.',
    whoIs: 'Po ten preset siegniesz gdy budujesz prosta funkcje full-stack: formularz z walidacja, endpoint REST z UI, mini dashboard, CRUD z interfejsem. Zadanie musi byc dobrze zdefiniowane (koszt Orkiestratora Opus byl zbedny), a wyniki integracyjne musza przejsc przez niezaleznego testera.',
    analogy: 'Ten preset to jak trojka rzemieslnikow w restauracji - szef kuchni gotuje (Backend), kelner serwuje (Frontend), inspektor sanitarny sprawdza (QA) - trzy role, zero duplikacji, pelen serwis.',
    howItWorks: [
      {label: 'Backend API', desc: 'Backend Dev projektuje endpointy REST, modele danych, walidacje server-side i pisze testy jednostkowe.'},
      {label: 'Kontrakty i Frontend', desc: 'Backend przekazuje Frontendowi kontrakty API (endpointy, payloads, errors). Frontend buduje komponenty UI, state, walidacje client-side i accessibility.'},
      {label: 'Sync BE-FE', desc: 'Backend i Frontend synchronizuja sie peer-to-peer dwukierunkowo, poprawiajac kontrakty gdy wyjdzie rozbieznosc.'},
      {label: 'QA integracyjny', desc: 'QA Quality testuje integracje BE+FE, edge cases i regresje, generuje raport PASS/FAIL z konkretnymi uwagami do odpowiedniego agenta.'}
    ],
    inputs: [
      'Opis featura full-stack (formularz, CRUD, dashboard, REST API + UI)',
      'Stack technologiczny dla backendu i frontendu',
      'Kryteria akceptacji dla UI i API osobno',
      'Opcjonalny mockup lub schemat danych'
    ],
    outputs: [
      'Gotowy backend z endpointami REST i walidacjami server-side',
      'Gotowy frontend z komponentami UI, state i walidacjami client-side',
      'Kontrakty API udokumentowane miedzy BE i FE',
      'Raport QA Quality z integracyjnymi testami PASS/FAIL',
      'Testy jednostkowe backendu i testy integracyjne BE+FE'
    ],
    does: [
      'Buduje pelny feature full-stack w jednym przebiegu',
      'Dzieli prace po naturalnych liniach BE/FE/QA bez koordynatora',
      'Wymusza kontrakty API miedzy warstwami jako source of truth',
      'Testuje integracje BE+FE przez niezaleznego QA',
      'Oszczedza koszt Orkiestratora na Opus dla dobrze zdefiniowanych zadan',
      'Wspiera accessibility i edge cases po stronie UI',
      'Obsluguje peer-to-peer synchronization zamiast centralnej koordynacji',
      'Dostarcza gotowy feature w 60-120 sekund'
    ],
    doesNotDo: [
      'Nie prowadzi researchu (brak Researchera - uzyj Feature Sprint)',
      'Nie robi fazy planowania ani dekompozycji (brak Planera - uzyj Standard)',
      'Nie audytuje bezpieczenstwa (brak QA Security - uzyj Security)',
      'Nie koordynuje skomplikowanych zalezosci (brak Orkiestratora)',
      'Nie projektuje UX od zera (brak Designera - uzyj Design System)',
      'Nie dotyka baz danych jako dedykowanego problemu (uzyj Full-Stack Premium)',
      'Nie obsluguje multi-domain features z wieloma serwisami'
    ],
    antiPatterns: [
      'Trio do backendu - uzywanie 3 agentow gdy zadanie jest czysto backendowe i Frontend bezczynny',
      'Bez kontraktow - Backend i Frontend buduja niezaleznie bez uzgodnienia interfejsu, integracja sie rozsypuje',
      'QA na koncu - QA dostaje artefakty dopiero po 100% implementacji zamiast iteracyjnie',
      'Zlozone bez koordynatora - uzywanie Trio do problemu ktory wymaga centralnych decyzji',
      'Design w Trio - proby zrobienia redesignu UI bez Designera w zespole'
    ],
    keyConcepts: [
      {term: 'Triangle pattern', def: 'Peer-to-peer topologia trzech agentow bez centralnego koordynatora.'},
      {term: 'Kontrakty API', def: 'Uzgodniony format komunikacji miedzy Backend a Frontend eliminujacy rozbieznosci interfejsowe.'},
      {term: 'Peer-to-peer', def: 'Wzorzec komunikacji bez huba w ktorym agenci rozmawiaja bezposrednio.'},
      {term: 'Naturalny podzial BE/FE', def: 'Rozdzielenie pracy po liniach ktore w swiecie web developmentu sa najmniej sporne.'},
      {term: 'Integration testing', def: 'Testowanie wspolpracy BE i FE jako calosci zamiast osobnych warstw.'}
    ],
    stats: [
      {label: 'Agenci', value: '3'},
      {label: 'Fazy', value: '3'},
      {label: 'Koszt est.', value: '$0.60-1.50'},
      {label: 'Czas', value: '1-2 min'}
    ],
    bestFor: [
      'Gdy budujesz prosty full-stack feature typu CRUD albo formularz z API',
      'Gdy zadanie jest dobrze zdefiniowane i nie potrzebujesz Orkiestratora na Opus',
      'Gdy chcesz minimalny zespol zdolny dowiezc pelny feature BE+FE+QA'
    ],
    worstFor: [
      'Gdy zadanie wymaga researchu lub porownania opcji technologicznych (uzyj Feature Sprint)',
      'Gdy dotyka bezpieczenstwa i wymaga audytu (uzyj Security)',
      'Gdy jest czysto backendowe lub czysto frontendowe (uzyj Solo lub Quick Fix)'
    ],
    relatedPresets: ['feature_sprint', 'startup', 'solo'],
    glossary: [
      {term: 'frontend dev', definition: 'Agent na Sonnecie piszacy komponenty UI, formularze, state management i accessibility.'},
      {term: 'kontrakty API', definition: 'Specyfikacja endpointow, payloads i errorow uzgodniona miedzy Backend i Frontend.'},
      {term: 'QA Quality', definition: 'Agent audytorski na Haiku testujacy integracje, edge cases i regresje.'},
      {term: 'peer-to-peer', definition: 'Wzorzec komunikacji bezposredniej miedzy agentami bez centralnego koordynatora.'},
      {term: 'full-stack', definition: 'Feature obejmujacy zarowno backend (API, baze) jak i frontend (UI, state).'}
    ],
    learningQuote: 'Brak Orkiestratora w Classic Trio to nie ograniczenie ale optymalizacja - dla dobrze zdefiniowanych feature ow peer-to-peer jest efektywniejszy niz koordynacja centralna.',
    realExample: 'Wyobraz sobie ze musisz dodac formularz rejestracji z walidacja i API. Backend Dev projektuje POST /api/users z walidacja, Frontend Dev buduje komponent z walidacja client-side i obsluga stanow, QA Quality sprawdza ze integracja dziala dla pustych pol, duplikatow emaili i specjalnych znakow. Gotowy feature w 90 sekund, zero narzutu Opus.'
  },
  reflect: {
    tagline: 'Naukowiec z recenzentem - glebokie zrozumienie tematu przez krytyke',
    missionShort: 'Reflective Loop to trzy agenty w petli refleksyjnej: Researcher zbiera dane, Analityk interpretuje, Research Critic krytycznie ocenia i odsyla do poprawy jesli analiza jest slaba. Jedyny preset Tier 1 ktory NIE produkuje kodu - tylko analize, raport, rekomendacje.',
    whoIs: 'Po ten preset siegniesz gdy stoisz przed wazna decyzja wymagajaca rzetelnego zbadania tematu: due diligence, porownanie architektur, analiza ryzyka, ewaluacja opcji strategicznych. Chcesz eliminacji confirmation bias przez wbudowanego krytyka ktorego jedynym zadaniem jest podwazanie wnioskow.',
    analogy: 'Ten preset to jak peer review w akademii - naukowiec zbiera dane (Researcher), recenzent interpretuje (Analityk), diabel adwokat szuka slabosci (Critic) - i cykl powtarza sie az jakosc przekroczy prog.',
    howItWorks: [
      {label: 'Zbieranie danych', desc: 'Researcher Tech przeszukuje dokumentacje, benchmarki, case studies i blogi, produkuje surowy raport z faktami, cytatami i URLami zrodlowymi.'},
      {label: 'Interpretacja', desc: 'Analityk otrzymuje surowy raport i syntetyzuje wnioski, wzorce, trade-offy i rekomendacje.'},
      {label: 'Krytyka', desc: 'Research Critic ocenia analize w 5 kategoriach (Completeness, Accuracy, Relevance, Freshness, Actionability) i przyznaje score 1-10.'},
      {label: 'Petla elastyczna', desc: 'Jesli sredni score >= 6/10 - PASS i dostarczenie. Jesli < 6/10 - rewizja u Researchera, max 3-4 iteracje z wymuszonym PASS.'}
    ],
    inputs: [
      'Pytanie badawcze lub decyzja wymagajaca rzetelnego uzasadnienia',
      'Kryteria waznosci dla oceny (kompletnosc, dokladnosc, trafnosc)',
      'Opcjonalny kontekst biznesowy (budzet, deadline, stakeholders)',
      'Opcjonalna lista zrodel do obowiazkowego przejrzenia'
    ],
    outputs: [
      'Surowy raport danych z linkami do zrodel i cytatami',
      'Analiza z wnioskami, wzorcami i trade-offami',
      'Scorecard Critic w 5 kategoriach (1-10) z uzasadnieniem',
      'Finalna rekomendacja z uzasadnieniem opartym na danych',
      'Lista zidentyfikowanych ryzyk, luk i otwartych pytan'
    ],
    does: [
      'Prowadzi gleboki research z wbudowanym quality gate',
      'Eliminuje confirmation bias przez adversarial collaboration',
      'Ocenia analize w 5 kategoriach dla wyrafinowanego feedbacku',
      'Odsyla slabe analizy do poprawy zamiast przepuszczac',
      'Oferuje due diligence przed wazna decyzja strategiczna',
      'Dostarcza rekomendacje z uzasadnieniem i linkami do zrodel',
      'Implementuje wzorzec Elastic Reflective Trio',
      'Poprawia jakosc raportow o 25-40% wzgledem pojedynczego agenta'
    ],
    doesNotDo: [
      'NIE produkuje kodu - zero builderow w skladzie, tylko analiza',
      'Nie implementuje rekomendacji (to zadanie dla presetu z builderami)',
      'Nie prowadzi researchu wielu zrodlowego rownolegle (uzyj Research Swarm)',
      'Nie obsluguje szybkich odpowiedzi (petla trwa 2-5 min)',
      'Nie zastepuje eksperta domenowego dla bardzo specjalistycznych tematow',
      'Nie podejmuje decyzji - tylko rekomenduje z uzasadnieniem',
      'Nie radzi sobie z prostymi pytaniami o jednoznacznej odpowiedzi'
    ],
    antiPatterns: [
      'Reflect do kodowania - uzywanie petli refleksyjnej do napisania kodu (zero builderow - zero kodu)',
      'Nieskonczona petla - Critic zbyt surowy (score zawsze <6), petla kreci sie bez konca',
      'Miekki Critic - Critic z niskim load przepuszcza wszystko, analiza bez weryfikacji',
      'Research bez pytania - Researcher zbiera dane bez jasno zdefiniowanego pytania, szum informacyjny',
      'Single Source - analiza oparta na jednym blogu lub jednym dokumencie zamiast cross-reference'
    ],
    keyConcepts: [
      {term: 'Adversarial collaboration', def: 'Technika w ktorej dedykowany krytyk atakuje wnioski innych agentow dla eliminacji bias.'},
      {term: 'Elastic loop', def: 'Petla o zmiennej liczbie iteracji zalezna od jakosci wynikow (score >= prog).'},
      {term: 'Confirmation bias', def: 'Tendencja do szukania informacji potwierdzajacych teze zamiast ich obalenia.'},
      {term: 'Scorecard 5 kategorii', def: 'Ocena w Completeness, Accuracy, Relevance, Freshness, Actionability w skali 1-10.'},
      {term: 'Research Critic load 85', def: 'Najwyzszy load w Tier 1 - celowo wysoki zeby Critic byl wymagajacy i surowy.'}
    ],
    stats: [
      {label: 'Agenci', value: '3'},
      {label: 'Fazy', value: '3'},
      {label: 'Koszt est.', value: '$0.30-0.75'},
      {label: 'Czas', value: '2-5 min'}
    ],
    bestFor: [
      'Gdy robisz due diligence przed wazna decyzja strategiczna lub inwestycyjna',
      'Gdy chcesz wyeliminowac confirmation bias z raportow i analiz',
      'Gdy porownujesz architektury lub frameworki i potrzebujesz uzasadnienia'
    ],
    worstFor: [
      'Gdy potrzebujesz wygenerowania kodu (Reflect nic nie implementuje - uzyj Recon)',
      'Gdy pytanie jest proste i ma jednoznaczna odpowiedz (narzut petli nieoplacalny)',
      'Gdy musisz dostarczyc odpowiedz w 30 sekund (petla trwa 2-5 min)'
    ],
    relatedPresets: ['recon', 'research', 'five_minds'],
    glossary: [
      {term: 'critic', definition: 'Agent audytorski ktorego jedyna rola jest podwazanie wnioskow innych agentow.'},
      {term: 'adversarial collaboration', definition: 'Technika wspolpracy w ktorej krytyk aktywnie szuka slabosci tezy.'},
      {term: 'due diligence', definition: 'Rzetelne zbadanie tematu przed podjeciem decyzji, szczegolnie inwestycyjnej.'},
      {term: 'score 1-10', definition: 'Skala oceny jakosci raportu w kategoriach kompletnosci, dokladnosci i trafnosci.'},
      {term: 'elastic pattern', definition: 'Petla bez stalej liczby iteracji, konczaca sie gdy jakosc przekroczy prog.'}
    ],
    learningQuote: 'Dodanie agenta-krytyka do zespolu badawczego poprawia jakosc raportow o 25-40% przy koszcie dodatkowym 8 razy mniejszym niz korzysc - to najbardziej oplacalna inwestycja w jakosc analizy.',
    realExample: 'Wyobraz sobie ze rozwazasz migracje z MongoDB na PostgreSQL. Researcher zbiera benchmarki i case studies, Analityk interpretuje ze PostgreSQL wygrywa w ACID ale przegrywa w horizontal scaling, Research Critic ocenia: Completeness 4 (brak danych o kosztach migracji), PASS dopiero po drugiej iteracji gdy Researcher uzupelni TCO. Otrzymujesz rekomendacje z scorecard i zrodlami.'
  },
  bug_hunt: {
    tagline: 'Dwoch detektywow na scenie zbrodni - rownoleglosc Security i Quality',
    missionShort: 'Bug Hunter to czteroosobowy zespol: Orkiestrator koordynuje, Backend Dev naprawia, a DWOCH niezaleznych QA (Security i Quality) rownolegle testuje ten sam artefakt z roznych perspektyw. Wzorzec Fork QA zapobiega groupthink i wykrywa problemy ktore jeden tester przeoczyl.',
    whoIs: 'Po ten preset siegniesz gdy bug jest podejrzany, boisz sie ze naprawa jednego miejsca zepsuje drugie, albo gdy podejrzewasz powiazanie z bezpieczenstwem. Cztery agenty w sweet spocie - duze jak trzeba, male jak tylko mozna - z dwoma niezaleznymi liniami audytu rownolegle.',
    analogy: 'Ten preset to jak dwoch detektywow badajacych ta sama scene zbrodni niezaleznie - jeden szuka sladow wlamania (Security), drugi sladow zbrodni (Quality) - ich raporty sie uzupelniaja a grupowe mysli nie maja szans zaslepic obu.',
    howItWorks: [
      {label: 'Triage buga', desc: 'Orkiestrator przyjmuje zgloszenie, ocenia severity i scope, tworzy instrukcje dla Backend Dev i definiuje obszary audytu dla obu QA.'},
      {label: 'Fix implementacji', desc: 'Backend Dev diagnozuje root cause, implementuje naprawe z testem regresji i przekazuje artefakt obu QA rownolegle.'},
      {label: 'Rownolegly audyt', desc: 'QA Security szuka luk bezpieczenstwa (injection, authz, data exposure). QA Quality szuka regresji, edge cases i bledow integracyjnych. Oba raportuja niezaleznie.'},
      {label: 'Agregacja raportow', desc: 'Orkiestrator zbiera oba raporty, syntetyzuje w jedna decyzje PASS/FAIL i jesli FAIL - wraca do buildera z laczonym feedbackiem.'}
    ],
    inputs: [
      'Zgloszenie buga ze steps to reproduce i severity',
      'Istniejacy kod dotknietego obszaru z powiazanymi testami',
      'Kontekst security (czy bug dotyka autoryzacji, danych uzytkownika, platnosci)',
      'Kryteria akceptacji dla obu linii audytu'
    ],
    outputs: [
      'Naprawiony kod z root cause analysis',
      'Test regresji zapobiegajacy ponownemu wystapieniu',
      'Raport QA Security z audytem pod katem luk',
      'Raport QA Quality z testami integracji i edge cases',
      'Finalna decyzja Orkiestratora PASS/FAIL z agregowanym feedbackiem'
    ],
    does: [
      'Naprawia bugi z rownolegla walidacja z dwoch perspektyw',
      'Wykrywa podatnosci bezpieczenstwa jako efekt uboczny naprawy',
      'Zapobiega groupthink przez niezalezne audyty',
      'Wymusza test regresji i zabezpiecza przed powrotem buga',
      'Obsluguje pre-release bug sweep dla krytycznych funkcji',
      'Lapie ukryte szkody side-effects po naprawie',
      'Implementuje wzorzec Fork QA z 2 parallel auditors',
      'Operuje w sweet spocie 4 agentow - najmniejsze ale juz z dual perspective'
    ],
    doesNotDo: [
      'Nie buduje nowych funkcji (to preset do polowania na bugi)',
      'Nie prowadzi fazy researchu (brak Researchera - uzyj Recon jesli nie wiesz jak)',
      'Nie dotyka frontendu gdy bug jest FE (brak FE Dev - uzyj Trio)',
      'Nie zastepuje pentestu (brak pelnego audytu bezpieczenstwa - uzyj Security)',
      'Nie iteruje w fix-test-loop (jeden cykl - uzyj Quick Fix dla petli)',
      'Nie obsluguje bugow bez reprodukowalnego zgloszenia',
      'Nie skaluje sie do wielu modulow rownolegle'
    ],
    antiPatterns: [
      'QA Merge - polaczenie obu raportow QA w jeden przed pokazaniem Orkiestratorowi, kasujace wartosc niezaleznosci',
      'Trivial Bug - uzywanie Bug Hunter do literowki, co jest przerostem formy nad trescia (uzyj Solo)',
      'No Repro - proba polowania bez reprodukowalnego case, bo obaj QA nie maja na czym pracowac',
      'Security Skip - pomijanie QA Security w bugach platnosci lub autoryzacji, co niweczy caly sens',
      'Bug Hunt dla featura - uzywanie presetu do budowy nowej funkcji zamiast do naprawy istniejacego buga'
    ],
    keyConcepts: [
      {term: 'Fork QA pattern', def: 'Wzorzec w ktorym jeden artefakt jest audytowany rownolegle przez wielu niezaleznych QA.'},
      {term: 'Groupthink prevention', def: 'Unikanie zbioru konsensusu przez wymuszanie niezaleznych raportow zamiast wspolnej analizy.'},
      {term: 'Parallel auditors', def: 'Dwoch lub wiecej audytorow pracujacych rownolegle bez komunikacji miedzy soba.'},
      {term: 'Dual perspective', def: 'Dwa rozne katy spojrzenia na ten sam artefakt (np. security vs quality).'},
      {term: 'Sweet spot 4', def: 'Konfiguracja 4 agentow jako najmniejsza ktora juz oferuje rownolegle audyty bez nadmiaru.'}
    ],
    stats: [
      {label: 'Agenci', value: '4'},
      {label: 'Fazy', value: '3'},
      {label: 'Koszt est.', value: '$0.65-1.60'},
      {label: 'Czas', value: '2-4 min'}
    ],
    bestFor: [
      'Gdy bug jest podejrzany i boisz sie ukrytych szkod w innych obszarach',
      'Gdy bug dotyka autoryzacji lub danych uzytkownika i potrzebujesz audytu security',
      'Gdy robisz pre-release sweep i chcesz dwa niezalezne audyty zamiast jednego'
    ],
    worstFor: [
      'Gdy bug jest trywialny i wystarczy jeden tester (uzyj Solo lub Quick Fix)',
      'Gdy budujesz nowa funkcje zamiast naprawiac bug (uzyj Trio albo Feature Sprint)',
      'Gdy potrzebujesz iteracji fix-test w petli (uzyj Quick Fix dla continuous loop)'
    ],
    relatedPresets: ['quick_fix', 'security', 'solo'],
    glossary: [
      {term: 'QA Security', definition: 'Agent audytorski szukajacy luk bezpieczenstwa (injection, authz, data exposure).'},
      {term: 'QA Quality', definition: 'Agent audytorski testujacy integracje, edge cases i regresje funkcjonalne.'},
      {term: 'Fork QA', definition: 'Wzorzec rozwidlenia przeplywu do wielu rownoleglych audytorow ktorzy nie komunikuja sie ze soba.'},
      {term: 'groupthink', definition: 'Zjawisko w ktorym grupa dazy do konsensusu kosztem krytycznego myslenia.'},
      {term: 'regresja', definition: 'Sytuacja gdzie nowa zmiana psuje funkcjonalnosc ktora wczesniej dzialala.'}
    ],
    learningQuote: 'Dwa niezalezne oka widza wiecej niz jedno - Fork QA eliminuje groupthink na poziomie architektury, nie polegajac na dyscyplinie jednego audytora.',
    realExample: 'Wyobraz sobie ze uzytkownicy zglaszaja ze mozna pobrac raport innego klienta przez zmiane ID w URL. Orkiestrator kieruje do Backend Dev ktory naprawia authz check, QA Security znajduje ze dalej brakuje rate limitu na endpointe, QA Quality znajduje ze zwracany 403 lamie frontend bo oczekiwal 401. Orkiestrator agreguje - FAIL z dwoma uwagami - druga iteracja naprawia oba i PASS. Caly proces 3 minuty z dwoma niezaleznymi liniami audytu.'
  },
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
  saas: {
    tagline: 'Pelny zespol 10 agentow buduje produkt SaaS od researchu po deployment',
    missionShort: 'Full-Stack SaaS to hierarchiczny zespol dziesieciu specjalistow, ktory przeprowadza produkt od pomyslu do dzialajacego MVP. Dostarcza kompletny stack: backend z logika biznesowa, frontend z panelem uzytkownika, design system, integracje platnosci i logowania oraz dwuwarstwowe QA. Dla zalozycieli produktow webowych, ktorzy chca miec dzialajacego SaaS z jednego uruchomienia.',
    whoIs: 'Ten preset jest dla kogos, kto startuje nowy produkt webowy od zera i potrzebuje WSZYSTKIEGO: backendu, frontendu, designu i kontroli jakosci. Wybierz go, gdy masz wizje kompletnego produktu (nie tylko jednego kawalka) i chcesz dostac caly stack w jednym uruchomieniu zamiast skladac go z mniejszych presetow. Idealny do MVP dla inwestorow, pierwszej wersji dla klientow albo kompletnego refreshu starego produktu.',
    analogy: 'Full-Stack SaaS to jak firma budowlana, ktora stawia dom od fundamentow po dach - masz architekta, inzyniera konstrukcji, elektryka, hydraulika, dekoratora wnetrz, kierownika budowy i dwoch inspektorow, kazdy niezbedny zeby dom mogl byc zamieszkany.',
    howItWorks: [
      {label: 'Faza 1 - Research i analiza', desc: 'Orkiestrator przekazuje wizje analitykowi, ktory dekomponuje wymagania. Researcher Tech bada stos technologiczny (framework, baza, auth provider), Researcher UX zbiera trendy wizualne i wzorce onboardingu. Wynik: MANIFEST wymagan + rekomendacja stacku.'},
      {label: 'Faza 2 - Rownolegly build squad', desc: 'Trzech builderow pracuje jednoczesnie. Backend Dev stawia API, autentykacje, baze, platnosci. Frontend Dev tworzy panel uzytkownika i flowy. Designer przygotowuje design system, kolory, typografie i komponenty UI. Kazdy dostaje izolowany kontekst.'},
      {label: 'Faza 3 - Integracja', desc: 'Integrator laczy trzy strumienie w jedna calosc. Podpina frontend pod API, sprawdza spojnosc designu z komponentami, weryfikuje flow platnosci end-to-end. Ta faza jest krytyczna dla uniknania klasycznego problemu isolated dev.'},
      {label: 'Faza 4 - Dual QA', desc: 'QA Security audytuje autentykacje, sesje, ochrone danych uzytkownikow i zgodnosc z podstawami OWASP. QA Quality sprawdza flowy uzytkownika, stany bledow, edge case na formularzach. Obaj podpisuja GO/NO-GO na deployment.'}
    ],
    inputs: [
      'Wizja produktu i grupa docelowa (np. narzedzie SaaS dla fryzjerow, 50-500 klientow)',
      'Wymagania funkcjonalne (logowanie, platnosci, dashboard, powiadomienia)',
      'Preferencje technologiczne lub ograniczenia (Node vs Python, Postgres vs Mongo)',
      'Kryteria sukcesu (MVP w 2 tygodnie, 95 punktow Lighthouse, zgodnosc z RODO)'
    ],
    outputs: [
      'Dzialajacy backend z API, autentykacja i baza danych',
      'Frontend z panelem uzytkownika i onboardingiem',
      'Design system z gotowymi komponentami i dokumentacja',
      'Raport integracji z dzialajacymi flowami end-to-end',
      'Raporty dual QA (security + quality) z werdyktem GO/NO-GO'
    ],
    does: [
      'Buduje kompletny stack produktu SaaS od backendu po UI',
      'Projektuje spojny design system z biblioteka komponentow',
      'Integruje autentykacje, platnosci i bazy danych w jedna calosc',
      'Pokrywa research technologiczny i UX przed jakimkolwiek kodem',
      'Przeprowadza rownolegly build (3 squadry jednoczesnie) dla skrocenia czasu',
      'Zapewnia dual QA (security + quality) przed deploymentem',
      'Dziala hierarchicznie z wyrazna separacja faz',
      'Generuje gotowy produkt zdolny do onboardowania pierwszych klientow'
    ],
    doesNotDo: [
      'Nie zaklada istniejacego kodu ani refaktoruje legacy (od tego jest Legacy Refactor)',
      'Nie prowadzi eksperymentow A/B ani testow hipotez (od tego jest AB Test Lab)',
      'Nie zajmuje sie przeladowanym enterprise compliance (od tego jest Full Hierarchy)',
      'Nie optymalizuje wydajnosci istniejacego produktu (od tego jest Performance Boost)',
      'Nie generuje tresci marketingowych ani copy (od tego jest Content Pipeline)',
      'Nie przeprowadza pelnego pentestu bezpieczenstwa (od tego jest Security Hardening)',
      'Nie skaluje produktu do mikroserwisow (od tego jest Microservices)'
    ],
    antiPatterns: [
      'Isolated Silos - trzy squadry build kazdy w swoim swiecie, bez integratora ktory laczy calosc',
      'Design Afterthought - dodanie designera na koncu zamiast rownolegle z backendem',
      'Skipped Research - startowanie kodu bez researchu stacku i UX, powoduje drogi refactor',
      'Missing QA Security - pominiecie QA Security w produkcie SaaS, ktory trzyma dane uzytkownikow',
      'Scope Creep - zamawianie kolejnych funkcji w trakcie build, zamiast trzymac sie pierwotnego MANIFEST'
    ],
    keyConcepts: [
      {term: 'Hierarchical Squads', def: 'Struktura zespolu gdzie trzy rownolegle squadry pracuja niezaleznie pod jednym orkiestratorem.'},
      {term: 'Design System', def: 'Biblioteka gotowych komponentow, kolorow, typografii i wzorcow gwarantujaca spojny wyglad calego produktu.'},
      {term: 'Integrator role', def: 'Dedykowany agent ktory laczy wynik trzech squadrow i weryfikuje dzialanie end-to-end.'},
      {term: 'Dual QA gate', def: 'Podwojna kontrola koncowa - security i quality - z dwoma niezaleznymi werdyktami GO/NO-GO.'},
      {term: 'Parallel build', def: 'Jednoczesna praca backend, frontend i designer zamiast sekwencji, skraca latency o ~40%.'}
    ],
    stats: [
      {label: 'Agenci', value: '10'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.40-3.55'},
      {label: 'Czas', value: '5-8 min'}
    ],
    bestFor: [
      'Gdy startujesz nowy produkt SaaS od zera i potrzebujesz calego stacku',
      'Gdy robisz MVP pod pitch inwestorski i musisz pokazac dzialajacy produkt',
      'Gdy robisz kompletny refresh starego produktu z nowym designem'
    ],
    worstFor: [
      'Gdy chcesz tylko backend albo tylko frontend (ten preset wymusza cala trojke)',
      'Gdy budujesz wewnetrzne narzedzie dla 5 osob w firmie (overkill)',
      'Gdy masz istniejacy produkt i chcesz tylko dodac jedna funkcje (uzyj Feature Sprint)'
    ],
    relatedPresets: ['startup', 'fullstack_premium', 'standard'],
    glossary: [
      {term: 'MVP', definition: 'Minimum Viable Product - najmniejsza dzialajaca wersja produktu zdolna do onboardowania pierwszych klientow.'},
      {term: 'design system', definition: 'Zbior zasad, komponentow i tokenow wizualnych gwarantujacych spojnosc calego interfejsu.'},
      {term: 'auth provider', definition: 'Zewnetrzny dostawca autentykacji (Clerk, Auth0, Supabase Auth) zastepujacy wlasne rozwiazanie.'},
      {term: 'integrator', definition: 'Agent laczacy wyniki pracy rownoleglych squadrow w jedna spojna calosc.'},
      {term: 'GO/NO-GO', definition: 'Decyzja binarna z QA czy produkt moze isc na produkcje czy wymaga poprawek.'}
    ],
    learningQuote: 'Budowanie SaaS od zera to nie kodowanie - to koordynacja szesciu specjalizacji, ktore musza zagrac razem jak orkiestra.',
    realExample: 'Wyobraz sobie ze masz pomysl na SaaS dla fizjoterapeutow: rezerwacje wizyt, platnosci Stripe, powiadomienia SMS, panel pacjenta. Uruchamiasz Full-Stack SaaS - Orkiestrator przekazuje wizje analitykowi, ktory dekomponuje wymagania. Researcher Tech rekomenduje Next.js + Supabase + Stripe, Researcher UX pokazuje wzorce medycznych produktow. Trzech builderow startuje rownolegle: Backend stawia API rezerwacji, Frontend panel pacjenta, Designer przygotowuje spokojna palete medyczna. Integrator laczy wszystko. QA Security sprawdza RODO i szyfrowanie danych, QA Quality testuje flow rezerwacji. Po 7 minutach masz dzialajacy MVP gotowy na pierwszych klientow i spotkanie z inwestorem.'
  },
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
  kb_constructor: {
    tagline: 'Cztery agentow rownolegle sprzataja Slack wiki PDFy i GitHub do jednej bazy wiedzy',
    missionShort: 'KB Constructor to zespol 10 agentow do budowy bazy wiedzy z rozproszonych zrodel. Cztery ingesters rownolegle normalizuja Slack, wiki, PDFy i GitHub do wspolnego formatu chunkow, deduplikator usuwa powtorzenia, writer pisze artykuly, critic sprawdza fakty a integrator publikuje. Dla firm ktore utopily wiedze w silosach.',
    whoIs: 'To preset dla zespolow ktore maja wiedze rozproszona w wielu zrodlach i chca je polaczyc w jedna baze wiedzy. Idealny dla onboardingu nowych pracownikow, migracji wiki z Confluence do Notion, bazy wsparcia klienta. Nie dla pojedynczego zrodla ani dla bazy wymagajacej ciaglych aktualizacji real-time.',
    analogy: 'Ten preset to jak biblioteka cyfrowa zatrudniajaca czterech archiwistow, gdzie kazdy specjalizuje sie w innym formacie (czasopisma, manuskrypty, mikrofilmy, ksiazki) a potem redaktor pisze hasla i drukarnia publikuje.',
    howItWorks: [
      {label: 'Faza 1 - Parallel ingest', desc: 'Cztery ingesters pracuje rownolegle kazdy na swoim zrodle: Slack (kanal + wiadomosci), wiki (strony + metadane), PDFy (ekstrakcja tekstu + struktury), GitHub (README + docs). Kazdy zwraca chunki w jednolitym formacie.'},
      {label: 'Faza 2 - Dedup i structuring', desc: 'Deduplicator uzywa embeddingow i fuzzy matching do usuwania duplikatow (gdy dwa zrodla mowia to samo). Grupuje powiazane chunki w tematy i proponuje strukture kategorii.'},
      {label: 'Faza 3 - Writing i fact-check', desc: 'Writer drafts artykuly z najlepszych chunkow, zachowujac linki do oryginalow. Critic sprawdza ze kazda informacja ma zrodlo i flaguje sprzecznosci.'},
      {label: 'Faza 4 - Publish i reranking', desc: 'Integrator publikuje do docelowego systemu (Notion, Confluence, custom). Konfiguruje reranker dla wyszukiwania i testuje recall na probce zapytan.'}
    ],
    inputs: [
      'Lista zrodel z dostepami (Slack token, wiki creds, PDFy, repo)',
      'Docelowy system (Notion, Confluence, custom)',
      'Struktura kategorii (opcjonalnie - system moze zaproponowac)',
      'Lista krytycznych pytan do testowania recall'
    ],
    outputs: [
      'Strukture bazy wiedzy (kategorie i tagi)',
      'Artykuly uporzadkowane po tematach z linkami do zrodel',
      'Chunki bez duplikatow gotowe do embeddingu',
      'Raport z fact-checkingu z listed sprzecznosci',
      'Gotowy import do docelowego systemu'
    ],
    does: [
      'Normalizuje dane z czterech roznych zrodel do wspolnego formatu',
      'Dedupuje chunki za pomoca embeddingow i fuzzy matching',
      'Generuje strukture kategorii na podstawie tematow',
      'Pisze artykuly zachowujac linki do oryginalnych zrodel',
      'Fact-checkuje kazda teze przed publikacja',
      'Konfiguruje reranker dla jakosci wyszukiwania',
      'Testuje recall na zdefiniowanych zapytaniach',
      'Publikuje do systemu docelowego'
    ],
    doesNotDo: [
      'Nie dziala z jednym zrodlem (to przerost formy)',
      'Nie aktualizuje bazy w czasie rzeczywistym (operacja jednorazowa)',
      'Nie jest substytutem dla wektor DB (tylko przygotowuje dane)',
      'Nie tworzy polityk dostepu (to rola administratora)',
      'Nie zastapi eksperta domeny dla danych krytycznych',
      'Nie buduje semantycznego wyszukiwania (tylko strukture)',
      'Nie tlumaczy dokumentow (to inny pipeline)'
    ],
    antiPatterns: [
      'Dump and Dupe - zaladowanie wszystkiego bez dedupu robi baze z 50% smieci',
      'Lost Sources - artykuly bez linkow do zrodel zatrzymuja mozliwosc weryfikacji',
      'Unfactchecked - publikacja bez fact-check wypuszcza sprzecznosci do uzytkownikow',
      'Rigid Structure - predefiniowana struktura nie pasuje do danych i wymusi przepychanie',
      'Missing Reranker - wyszukiwanie bez rerankera daje niezwiazane wyniki'
    ],
    keyConcepts: [
      {term: 'Chunking', def: 'Dzielenie dokumentow na mniejsze kawalki o stalym rozmiarze dla embedding i retrievalu.'},
      {term: 'Dedup', def: 'Usuwanie duplikatow chunkow za pomoca embedding similarity i fuzzy matching.'},
      {term: 'Embedding', def: 'Konwersja tekstu na wektor liczb reprezentujacy znaczenie dla semantic search.'},
      {term: 'Reranker', def: 'Drugi etap wyszukiwania ktory rekapowuje top wyniki lepszym modelem pod katem istotnosci.'},
      {term: 'RAG', def: 'Retrieval Augmented Generation - LLM odpowiada na pytania siegajac do bazy wiedzy.'}
    ],
    stats: [
      {label: 'Agenci', value: '10'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.85-2.15'},
      {label: 'Czas', value: '30-60 min'}
    ],
    bestFor: [
      'Gdy migrujesz wewnetrzne wiki z Confluence do Notion lub odwrotnie',
      'Gdy budujesz baze wiedzy dla nowych pracownikow albo obslugi klienta',
      'Gdy firma ma wiedze rozproszona w Slacku, wiki, PDFach i GitHubie'
    ],
    worstFor: [
      'Gdy masz tylko jedno zrodlo informacji (za ciezki preset)',
      'Gdy potrzebujesz ciaglych aktualizacji real-time (to jednorazowa operacja)',
      'Gdy juz masz dobry system semantic search'
    ],
    relatedPresets: ['content', 'research', 'tech_writing_pipe'],
    glossary: [
      {term: 'chunking', definition: 'Dzielenie dokumentu na kawalki o stalym rozmiarze dla embedding.'},
      {term: 'dedup', definition: 'Usuwanie duplikatow chunkow za pomoca similarity.'},
      {term: 'embedding', definition: 'Wektor reprezentujacy znaczenie tekstu dla semantic search.'},
      {term: 'reranker', definition: 'Drugi etap wyszukiwania rekapowujacy wyniki lepszym modelem.'},
      {term: 'RAG', definition: 'Retrieval Augmented Generation - LLM siega do bazy wiedzy.'}
    ],
    learningQuote: 'Wiedza rozproszona po piec zrodlach jest gorsza niz zero wiedzy - nowy pracownik traci tygodnie na szukanie a odpowiedzi sa sprzeczne.',
    realExample: 'Wyobraz sobie ze twoja firma ma 300 pracownikow a wiedza jest rozrzucona w Slacku (3 lata kanal engineering), Confluence wiki (400 stron), folderze Drive z PDFami onboardingowymi i README w 40 repozytoriach. KB Constructor uruchamia 4 ingesters rownolegle, deduplicator znajduje ze 60% wpisow na Confluence to kopia wiadomosci ze Slacka, writer pisze 80 artykulow z kategoriami, critic lapie 7 sprzecznosci miedzy zrodlami a integrator publikuje do Notiona z rerankerem ktory odpowiada poprawnie na 85% testowych zapytan.'
  },
  tech_writing_pipe: {
    tagline: 'Plan plus research plus pisanie plus diagramy plus SEO plus fact-check w jednym pipelinie',
    missionShort: 'Tech Writing Pipeline to zespol 8 agentow do dluzszych tekstow technicznych. Analyst robi outline, dwoch researcherow rownolegle zbiera fakty (docs + GitHub), writer pisze, designer rysuje diagramy, SEO optymalizuje headery i meta, a critic sprawdza fakty i ton. Dla blogow technicznych, whitepaperow i prezentacji konferencyjnych.',
    whoIs: 'To preset dla zespolow marketingu technicznego, devrel albo pracownikow ktorzy pisza dluzsze materialy techniczne. Idealny dla blogow technicznych, whitepaperow, slajdow konferencyjnych i deep-dive case studies. Nie dla krotkich postow, tweetow, social media ani wewnetrznych notatek.',
    analogy: 'Ten preset to jak magazyn naukowo-techniczny z redakcja, gdzie research department zbiera fakty, redaktor pisze tekst, grafik tworzy ilustracje, SEO optymalizuje a fact-checker weryfikuje przed drukiem.',
    howItWorks: [
      {label: 'Faza 1 - Outline i audience', desc: 'Analyst definiuje dla kogo jest tekst (audience, knowledge level), formuluje main angle i tworzy outline z sekcjami. Ustala success criteria (czego czytelnik sie nauczy).'},
      {label: 'Faza 2 - Parallel research', desc: 'Dwoch researcherow rownolegle zbiera material: res_docs czyta oficjalna dokumentacje dla faktow technicznych, res_github szuka przykladow kodu i benchmarkow. Kazdy zwraca uporzadkowane znaleziska.'},
      {label: 'Faza 3 - Writing i enrichment', desc: 'Writer drafts tekst bazujac tylko na znaleziskach researcherow (nie zmysla). Designer rysuje diagramy dla zlozonych konceptow. SEO optimizer dobiera slowa kluczowe, headery H1-H3 i meta description.'},
      {label: 'Faza 4 - Fact-check i tone polish', desc: 'Critic sprawdza kazdy fakt przeciw zrodlom, flaguje sprzecznosci i weryfikuje ton (matching audience). Generuje checkliste przed publikacja.'}
    ],
    inputs: [
      'Temat i cel tekstu (blog, whitepaper, talk)',
      'Audience (beginners, advanced, decision-makers)',
      'Angle lub teza glowna (co chcesz przekazac)',
      'Opcjonalny rough outline lub bullet points'
    ],
    outputs: [
      'Dlugi artykul lub whitepaper z przykladami kodu',
      'Diagramy architektury i flow dla zlozonych konceptow',
      'Tytuly i opisy zoptymalizowane pod wyszukiwarki',
      'Lista cytowan z linkami do zrodel',
      'Checklista gotowosci do publikacji'
    ],
    does: [
      'Rozpoczyna od outline zamiast od razu pisac',
      'Uzywa dwoch researcherow dla faktow (docs + github)',
      'Izoluje writera od zmyslania - pisze tylko na bazie researchu',
      'Dodaje diagramy dla zlozonych konceptow',
      'Optymalizuje pod SEO bez keyword stuffingu',
      'Fact-checkuje kazdy stwierdzenie przed publikacja',
      'Dostosowuje ton do audience',
      'Generuje checkliste gotowosci'
    ],
    doesNotDo: [
      'Nie pisze krotkich postow na social media (przerost formy)',
      'Nie tworzy tweetow ani threadow',
      'Nie wykonuje kodu (designer rysuje, nie uruchamia)',
      'Nie publikuje samodzielnie (tylko przygotowuje gotowy tekst)',
      'Nie tlumaczy na inne jezyki (to inny pipeline)',
      'Nie zastepuje human editora dla stylu marki',
      'Nie gwarantuje pozycji w Google (tylko optymalizuje)'
    ],
    antiPatterns: [
      'Writer First - pisanie bez researchu daje hallucynacje',
      'SEO Stuffing - wpychanie keywordow do tekstu niszczy ton i czytelnosc',
      'No Fact-check - publikacja bez weryfikacji flaguje bledy u czytelnikow',
      'Generic Audience - tekst dla wszystkich jest dla nikogo',
      'Diagram Theater - diagramy ktore nic nie wyjasniaja tylko dodaja szum'
    ],
    keyConcepts: [
      {term: 'Outline-First', def: 'Zaczynanie od planu sekcji przed pisaniem - redukuje chaos i zmyslenia.'},
      {term: 'E-E-A-T', def: 'Experience, Expertise, Authoritativeness, Trust - sygnaly jakosci Google dla tresci.'},
      {term: 'Structured Data', def: 'Markup schema.org dla artykulu ktory pozwala Google lepiej zrozumiec tresc.'},
      {term: 'Audience Calibration', def: 'Dopasowanie slownictwa, zalozen i glebokosci do poziomu czytelnika.'},
      {term: 'Fact-check Loop', def: 'Dedykowany krok weryfikacji kazdej tezy przeciw zrodlom przed publikacja.'}
    ],
    stats: [
      {label: 'Agenci', value: '8'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$0.75-1.85'},
      {label: 'Czas', value: '20-40 min'}
    ],
    bestFor: [
      'Gdy piszesz glebokie wpisy na blog firmowy albo whitepaper dla klientow',
      'Gdy przygotowujesz prezentacje na konferencje lub deep-dive case study',
      'Gdy potrzebujesz dlugiego tekstu technicznego zweryfikowanego pod katem faktow'
    ],
    worstFor: [
      'Gdy piszesz krotki post na Twittera lub LinkedIna',
      'Gdy robisz wewnetrzna notatke dla zespolu',
      'Gdy masz 10 minut na tresc i nie chcesz pelnego pipeline'
    ],
    relatedPresets: ['content', 'research', 'kb_constructor'],
    glossary: [
      {term: 'outline', definition: 'Plan sekcji tekstu przed pisaniem - redukuje chaos.'},
      {term: 'E-E-A-T', definition: 'Experience Expertise Authoritativeness Trust - sygnaly jakosci Google.'},
      {term: 'SEO', definition: 'Search Engine Optimization - optymalizacja tresci pod wyszukiwarki.'},
      {term: 'audience', definition: 'Docelowy czytelnik okreslajacy slownictwo i glebokosc.'},
      {term: 'fact-check', definition: 'Weryfikacja kazdej tezy przeciw zrodlom przed publikacja.'}
    ],
    learningQuote: 'Bez outlinu i researchu writer zmysla a fact-checker musi to potem lapac - Tech Writing Pipeline wymusza kolejnosc: plan, fakty, pisanie, weryfikacja.',
    realExample: 'Wyobraz sobie ze twoj dev rel pisze deep-dive o Kubernetesie dla blogu firmowego i szef mowi "na jutro". Bez preset to przepis na hallucynacje. Tech Writing Pipeline: analyst robi outline dla audience senior platform engineers, res_docs czyta oficjalny k8s docs v1.32, res_github szuka real-world examples w kubernetes/examples repo, writer tworzy 2500 slow bazujac tylko na researchu, designer rysuje diagram reconciliation loop, SEO optymalizuje pod "kubernetes operator pattern", critic lapie jeden bledny fakt o leader election i tekst jest gotowy do publikacji.'
  },
  five_minds_strategic: {
    tagline: 'Najpierw twarde dane, potem debata - piec ekspertow z liczbami w reku zamiast wojna opinii',
    missionShort: 'Five Minds Strategic to zespol 13 agentow dla high-stakes decyzji strategicznych. Czterech researcherow rownolegle zbiera twarde dane (rynek, finanse, technologia, prawo), analyst frameuje pytanie, piec ekspertow + Devil debatuje trzy rundy, synthesizer pisze Gold Solution a PM sign-off zamyka. Dla pivotow, akwizycji i nieodwracalnych wyborow strategicznych.',
    whoIs: 'To preset dla zarzadow i senior leadership zespolow podejmujacych decyzje strategiczne na 3+ lat. Idealny dla decyzji o pivot firmy, oceny akwizycji, wyboru platformy na kolejne 5 lat. Nie dla decyzji taktycznych na dzisiaj, pilnych spraw ani gdy odpowiedz jest oczywista.',
    analogy: 'Ten preset to jak rada wojenna z dossier wywiadowczym, gdzie zwiadowcy najpierw zbieraja informacje, potem generalowie debatuja przez trzy rundy z prokuratorem a ostateczny plan idzie do prezydenta.',
    howItWorks: [
      {label: 'Faza 1 - Parallel intelligence', desc: 'Czterech researcherow rownolegle zbiera dane: market intel (rynek, konkurencja, trendy), financial (finanse, ROI, koszty), technical (wykonalnosc, ryzyka, stacki), legal (regulacje, compliance). Kazdy zwraca twarde liczby.'},
      {label: 'Faza 2 - Framing opcji', desc: 'Analyst syntezuje 4 raporty w sformalizowane opcje decyzyjne (2-5) z plusami, minusami i niepewnosciami. Prezentuje kazda opcje w tej samej strukturze.'},
      {label: 'Faza 3 - Three-round debate', desc: 'Piec ekspertow (innowator, analityk, pragmatyk, user, wizjoner) + Devil debatuje trzy rundy: opinia -> kontrargumenty -> synteza. Devil atakuje najsilniejsza propozycje szukajac slabosci.'},
      {label: 'Faza 4 - Gold Solution i HITL', desc: 'Synthesizer pisze Gold Solution lepsze od kazdej pojedynczej opcji (prawdziwa synteza a nie kompromis). PM podpisuje decyzje z uzasadnieniem i lista dissenting opinions.'}
    ],
    inputs: [
      'Pytanie strategiczne z definicja stakes (inwestycja, okres)',
      'Lista opcji do rozwazenia (lub obszar do zbadania)',
      'Kontekst firmy (etap, kultura, constraints)',
      'Deadline na decyzje (minimum dni na debate)'
    ],
    outputs: [
      'Cztery raporty z twardymi danymi (market, finanse, tech, legal)',
      'Log trzech rund debaty ekspertow z argumentami',
      'Gold Solution z analiza plusow i minusow',
      'Lista dissenting opinions dla zapamietania',
      'Podpisana decyzja PM z planem wdrozenia'
    ],
    does: [
      'Zbiera twarde dane przed debata (nie wojna opinii)',
      'Uzywa 4 wyspecjalizowanych researcherow w obszarach kluczowych',
      'Formalizuje debate w trzy rundy z explicit structure',
      'Uzywa Devil do adversarial challenge najsilniejszej propozycji',
      'Synthesizer pisze Gold Solution lepsze od wszystkich opcji',
      'Zapisuje dissenting opinions dla historical record',
      'Wymusza PM sign-off z uzasadnieniem',
      'Dokumentuje wszystko dla audytu decyzji'
    ],
    doesNotDo: [
      'Nie dla decyzji taktycznych na dzisiaj (za ciezkie)',
      'Nie dla pilnych spraw (trzy rundy debaty to czas)',
      'Nie pracuje bez czasu na research',
      'Nie zastepuje eksperta domeny w waskich obszarach',
      'Nie robi implementacji (tylko decyzja)',
      'Nie gwarantuje ze decyzja bedzie prawidlowa (tylko proces)',
      'Nie dziala gdy odpowiedz jest oczywista dla wszystkich'
    ],
    antiPatterns: [
      'Opinion War - debata bez danych zamienia sie w kto wiecej krzyczy',
      'Skipped Devil - zespol pomija adversarial challenge i leci z pierwsza propozycja',
      'Gold Compromise - synthesizer robi kompromis zamiast prawdziwej syntezy',
      'Silent Dissent - zgubienie odmiennych zdan pozbawia firmy nauki',
      'Rushed Rounds - skrocenie 3 rund do 1 gubi adversarial value'
    ],
    keyConcepts: [
      {term: 'Adversarial Collaboration', def: 'Wspolpraca gdzie rozni eksperci formalnie atakuja nawzajem swoje pozycje zeby znajdowac slabosci.'},
      {term: 'Pre-mortem', def: 'Technika wyobrazania sobie ze decyzja byla porazka i proba ustalenia dlaczego.'},
      {term: 'Steel Man', def: 'Odtworzenie najlepszej wersji argumentu przeciwnika zamiast atakowania slabej wersji.'},
      {term: 'Gold Solution', def: 'Synteza wszystkich rund debaty lepsza od pojedynczych propozycji, nie kompromis.'},
      {term: 'Dissenting Opinion', def: 'Formalny zapis odmiennego zdania dla historical record i nauki.'}
    ],
    stats: [
      {label: 'Agenci', value: '13'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.65-4.10'},
      {label: 'Czas', value: '45-90 min'}
    ],
    bestFor: [
      'Gdy decydujesz o pivot firmy albo akwizycji innej firmy',
      'Gdy wybierasz stack technologiczny lub dostawce na 5 lat',
      'Gdy stawka jest nieodwracalna i wymaga twardych danych plus debaty'
    ],
    worstFor: [
      'Gdy potrzebujesz decyzji tacktycznej dzisiaj',
      'Gdy masz pilna sprawe bez czasu na three-round debate',
      'Gdy odpowiedz jest oczywista dla kazdego i debata to strata czasu'
    ],
    relatedPresets: ['five_minds', 'deep_five_minds', 'deep_research_swarm_pro'],
    glossary: [
      {term: 'pivot', definition: 'Zmiana kierunku firmy lub strategii produktowej.'},
      {term: 'Gold Solution', definition: 'Synteza lepsza od pojedynczych opcji, nie kompromis.'},
      {term: 'pre-mortem', definition: 'Wyobrazenie sobie porazki decyzji i analiza dlaczego.'},
      {term: 'steel man', definition: 'Odtworzenie najlepszej wersji argumentu przeciwnika.'},
      {term: 'dissenting opinion', definition: 'Formalny zapis odmiennego zdania dla historical record.'}
    ],
    learningQuote: 'Debata bez twardych danych to wojna opinii - Five Minds Strategic wymusza research, debate i sign-off w jednym przebiegu.',
    realExample: 'Wyobraz sobie ze zarzad rozwaza akwizycje konkurenta za 50 milionow dolarow. Czterech researcherow rownolegle zbiera: market intel (udzial, trendy), financial (ROI, koszty, dlug), technical (stack compatibility, tech debt), legal (antitrust, pracownicy). Analyst formuluje trzy opcje (kupic caly, kupic tylko technologie, nie kupowac). Piec ekspertow debatuje trzy rundy, Devil atakuje opcje 1 znajdujac ryzyko overpay i culture clash. Synthesizer pisze Gold Solution: kupic tylko technologie i zatrudnic kluczowych inzynierow. PM podpisuje z listing dissenting opinion ze czlonek rady chcial pelnej akwizycji.'
  },
  soc2_sweep: {
    tagline: 'Przygotowanie do SOC2 Type II przez pelen zespol - mapowanie kontroli plus evidence plus gap',
    missionShort: 'SOC2 Sweep to zespol 9 agentow do przygotowania audytu SOC2 Type II. Policy reader czyta polityki firmy, control mapper przyporzadkowuje je do CC1-CC9, evidence collector zbiera dowody, gap analyzer flaguje braki, qa_security weryfikuje techniczne kontrole a CISO podpisuje gotowosc. Zgodny z Trust Services Criteria.',
    whoIs: 'To preset dla zespolow bezpieczenstwa i compliance przygotowujacych sie do audytu SOC2. Idealny dla startupow wchodzacych na rynek enterprise, kwartalnych przegladow i odpowiedzi na vendor risk assessment. Nie dla firm bez zadnych polityk, dla ciaglej zgodnosci (uzyj Vanta/Drata) ani drobnych poprawek.',
    analogy: 'Ten preset to jak audyt finansowy banku, gdzie jeden audytor czyta polityki, drugi mapuje na regulacje, trzeci zbiera dowody a czwarty wskazuje luki i dyrektor finansowy zatwierdza raport dla regulatora.',
    howItWorks: [
      {label: 'Faza 1 - Policy reading', desc: 'Policy reader czyta wszystkie SOPs, security policies, vendor agreements, incident runbooks firmy. Tworzy mape polityk z metadanymi (data, wlascicieli).'},
      {label: 'Faza 2 - Control mapping', desc: 'Control mapper przyporzadkowuje polityki do Trust Services Criteria CC1-CC9 (Control Environment, Communication, Risk Assessment, Monitoring, Control Activities, Logical Access, System Ops, Change Mgmt, Risk Mitigation).'},
      {label: 'Faza 3 - Evidence collection', desc: 'Evidence collector zbiera dowody dla kazdej kontroli: screenshots, configs, logs, audit trails, personnel records. Qa_security sprawdza techniczne kontrole (encryption, MFA, backup, access reviews).'},
      {label: 'Faza 4 - Gap analysis i CISO sign-off', desc: 'Gap analyzer flaguje braki w pokryciu kontroli, proponuje remediacje, szacuje priorytety. CISO przeglada raport gotowosci i podpisuje audit readiness z planem naprawczym.'}
    ],
    inputs: [
      'Zbior polityk firmy i SOPs',
      'Dostep do systemow produkcyjnych dla evidence',
      'Lista aktualnych pracownikow i ich rol',
      'Scope audytu (ktore produkty, ktore regiony)'
    ],
    outputs: [
      'Tabela zgodnosci z kazdym wymaganiem i dowodem',
      'Folder evidence (screenshots, configs, logs)',
      'Lista luk uporzadkowana od najwazniejszej',
      'Propozycje remediacji dla kazdej luki',
      'Podpisany raport audit readiness od CISO'
    ],
    does: [
      'Czyta wszystkie polityki firmy i mapuje na CC1-CC9',
      'Zbiera evidence automatycznie dla technicznych kontroli',
      'Sprawdza enkrypcje, MFA, backup, access reviews',
      'Flaguje luki w pokryciu Trust Services Criteria',
      'Proponuje remediacje z priorytetami P0-P3',
      'Generuje folder dla zewnetrznego audytora',
      'Wymusza CISO sign-off przed audytem',
      'Dokumentuje wszystko dla historical record'
    ],
    doesNotDo: [
      'Nie zastapi zewnetrznego audytora (tylko przygotowanie)',
      'Nie dziala bez istniejacych polityk (najpierw je napisz)',
      'Nie jest ciagla zgodnoscia (uzyj Vanta/Drata)',
      'Nie naprawia luk samodzielnie (tylko identyfikuje)',
      'Nie jest pentestem ani audytem bezpieczenstwa',
      'Nie pokrywa ISO27001 automatycznie (inny standard)',
      'Nie zastepuje HR dla personnel records'
    ],
    antiPatterns: [
      'Policy Theater - polityki istnieja na papierze ale nikt ich nie przestrzega',
      'Evidence Vacuum - dowody dla kontroli zebrane rok temu i juz nieaktualne',
      'Ignored Gaps - gap analyzer flaguje luki ktore potem nikt nie naprawia',
      'Missing CISO - sign-off bez zaangazowania CISO nie ma wartosci',
      'Scope Creep - probowanie pokryc wszystko zamiast wybranych produktow'
    ],
    keyConcepts: [
      {term: 'Trust Services Criteria', def: 'AICPA framework z 5 kategoriami: Security, Availability, Processing Integrity, Confidentiality, Privacy.'},
      {term: 'CC1-CC9', def: 'Dziewiec Common Criteria w SOC2: Control Environment, Communication, Risk, Monitoring, Control, Access, Ops, Change, Risk Mitigation.'},
      {term: 'Control Evidence', def: 'Dowody ze kontrola dziala w praktyce: screenshots, configs, logs, audit trails.'},
      {term: 'Gap Remediation', def: 'Plan naprawczy dla luk w pokryciu kontroli z priorytetami i timelinem.'},
      {term: 'SOC2 Type II', def: 'Audyt SOC2 obejmujacy okres minimum 6 miesiecy zamiast pojedynczego punktu w czasie.'}
    ],
    stats: [
      {label: 'Agenci', value: '9'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.10-2.75'},
      {label: 'Czas', value: '30-60 min'}
    ],
    bestFor: [
      'Gdy przygotowujesz sie do audytu SOC2 Type II dla klientow enterprise',
      'Gdy odpowiadasz na vendor risk assessment od duzego klienta',
      'Gdy robisz kwartalny przeglad compliance lub przygotowanie do ISO27001'
    ],
    worstFor: [
      'Gdy nie masz zadnych polityk firmy (najpierw je napisz)',
      'Gdy chcesz ciagla zgodnosc (uzyj Vanta lub Drata)',
      'Gdy potrzebujesz drobnych poprawek bezpieczenstwa'
    ],
    relatedPresets: ['security_multi_vector', 'security', 'test_suite'],
    glossary: [
      {term: 'SOC2', definition: 'Standard audytu bezpieczenstwa od AICPA dla vendorow chmurowych.'},
      {term: 'Trust Services Criteria', definition: 'Framework 5 kategorii: Security, Availability, Processing Integrity, Confidentiality, Privacy.'},
      {term: 'CC1-CC9', definition: 'Dziewiec Common Criteria w SOC2.'},
      {term: 'evidence', definition: 'Dowody ze kontrola dziala w praktyce.'},
      {term: 'Type II', definition: 'Audyt obejmujacy okres 6-12 miesiecy, nie pojedynczy punkt.'}
    ],
    learningQuote: 'SOC2 to nie dokumentacja na polce - to dowody ze kontrole dzialaja kazdego dnia, a ten preset automatyzuje zbieranie tych dowodow.',
    realExample: 'Wyobraz sobie ze twoj startup SaaS ma umowe z duzym korporacyjnym klientem warta 2 miliony rocznie ale klient wymaga SOC2 Type II w ciagu 6 miesiecy. Policy reader czyta 28 polityk, control mapper przyporzadkowuje na CC1-CC9, evidence collector zbiera konfiguracje AWS, logi access review i screenshots z Okta, gap analyzer flaguje 7 luk (brak formalnego vendor risk assessment, brak rocznego penetration testu, brak sformalizowanego incident response plan). CISO podpisuje raport z plan naprawczym na 3 miesiace przed audytem.'
  },
  data_analysis_pipe: {
    tagline: 'Dziewieciu agentow po kolei - zbior plus czyszczenie plus EDA plus model plus raport',
    missionShort: 'Data Analysis Pipeline to zespol 9 agentow do przeksztalcania surowych danych w stakeholder-ready raport. Data collector profiluje dataset, cleaner normalizuje, EDA analyst i SQL specialist rownolegle szukaja wzorcow, statistician sprawdza sensownosc, model builder opcjonalnie buduje prediction, writer pisze raport a designer robi wykresy. Oparty na arxiv 2510.04023.',
    whoIs: 'To preset dla analitykow danych i zespolow business intelligence ktorzy musza z surowego arkusza zrobic raport dla zarzadu. Idealny dla ad-hoc business questions, analiz churnu, pricing i A/B test post-mortem. Nie dla danych real-time streaming, ML production deployment ani bez dostepu do surowych danych.',
    analogy: 'Ten preset to jak zespol data science consulting firm, gdzie engineer ingestuje dane, analyst sprzata, scientist robi EDA, modeler trenuje a narrator pisze raport dla zarzadu z peer reviewem statystyki.',
    howItWorks: [
      {label: 'Faza 1 - Profiling i cleaning', desc: 'Data collector profiluje arkusz (schemat, statystyki, samples ~5k zamiast raw). Data cleaner normalizuje (brakujace wartosci, outliers, formaty dat, encoding).'},
      {label: 'Faza 2 - Parallel EDA', desc: 'EDA analyst szuka wzorcow (distributions, correlations, segments). SQL specialist pisze zapytania dla konkretnych hypotez biznesowych. Pracuja rownolegle.'},
      {label: 'Faza 3 - Stats sanity i modeling', desc: 'Statistician sprawdza czy wnioski sa statystycznie istotne, flaguje leakage, assumptions, multiple comparison problems. Opcjonalnie model builder tworzy prosty prediction model.'},
      {label: 'Faza 4 - Report i charts', desc: 'Writer pisze raport gotowy dla zarzadu z executive summary, kluczowymi insightami i rekomendacjami. Designer robi wykresy. Critic weryfikuje stats sanity.'}
    ],
    inputs: [
      'Dostep do surowych danych (CSV, DB, warehouse)',
      'Pytanie biznesowe (dlaczego sprzedaz spadla)',
      'Kontekst biznesowy (produkty, segmenty, okres)',
      'Audience raportu (zarzad, operacje, marketing)'
    ],
    outputs: [
      'Raport gotowy dla zarzadu z kluczowymi wnioskami',
      'Wykresy z narrative dla kazdego insightu',
      'Confidence dla kazdej tezy i limitations',
      'Opcjonalnie prosty model prediction',
      'Rekomendacje z konkretnymi akcjami'
    ],
    does: [
      'Profiluje dataset bez czytania calosci (samples + stats)',
      'Czysci dane (missing values, outliers, formats)',
      'Rownolegle uruchamia EDA i SQL dla roznych hipotez',
      'Sprawdza statystyczna sensownosc (leakage, assumptions)',
      'Opcjonalnie buduje prosty prediction model',
      'Generuje wykresy z narrative',
      'Pisze raport dla konkretnego audience',
      'Weryfikuje kazda teze przez critic'
    ],
    doesNotDo: [
      'Nie dla danych real-time streaming (inna architektura)',
      'Nie wdraza modeli na produkcje (to ML engineering)',
      'Nie dziala bez dostepu do surowych danych',
      'Nie zastepuje data engineera dla ETL',
      'Nie robi causal inference na observational data',
      'Nie tworzy dashboardow live (to BI tooling)',
      'Nie dostarcza insights spoza danych w arkuszu'
    ],
    antiPatterns: [
      'Full Data Dump - writer dostaje raw data i zmysla statystyki',
      'P-hacked Insight - EDA znajduje cos przypadkowego i raportuje jako finding',
      'Missing Baseline - brak porownania do poprzedniego okresu nie pokazuje zmiany',
      'Leakage Blind - model uzywa future features jako predyktory',
      'No Stats Check - raport publikowany bez statystycznego sanity check'
    ],
    keyConcepts: [
      {term: 'EDA', def: 'Exploratory Data Analysis - wizualizacja i statystyka pierwsza zeby zrozumiec dane.'},
      {term: 'Missingness', def: 'Wzorzec brakujacych wartosci ktory moze byc MCAR, MAR lub MNAR.'},
      {term: 'Leakage', def: 'Model uzywa informacji ktorej nie powinien miec w czasie predykcji (future features).'},
      {term: 'Model Card', def: 'Dokumentacja modelu z opisem celu, danych, metryk, limitations i zalecen uzycia.'},
      {term: 'Multiple Comparisons', def: 'Problem gdzie testowanie wielu hipotez inflacjonuje bledy typu I - wymaga korekty.'}
    ],
    stats: [
      {label: 'Agenci', value: '9'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.10-2.75'},
      {label: 'Czas', value: '25-50 min'}
    ],
    bestFor: [
      'Gdy zarzad pyta dlaczego sprzedaz spadla w marcu i potrzebujesz data-driven odpowiedzi',
      'Gdy analizujesz churn klientow lub pricing experiment',
      'Gdy robisz post-mortem A/B testu lub analize produktu'
    ],
    worstFor: [
      'Gdy masz dane strumieniowe na zywo (inna architektura)',
      'Gdy chcesz wdrozyc model na produkcje (to ML engineering)',
      'Gdy nie masz dostepu do surowych danych'
    ],
    relatedPresets: ['ab_test_lab', 'research', 'data_pipe'],
    glossary: [
      {term: 'EDA', definition: 'Exploratory Data Analysis - wstepna eksploracja i wizualizacja.'},
      {term: 'leakage', definition: 'Uzycie informacji future jako feature do predykcji.'},
      {term: 'model card', definition: 'Dokumentacja modelu z celem, danymi, metrykami i limitations.'},
      {term: 'missingness', definition: 'Wzorzec brakujacych wartosci: MCAR, MAR lub MNAR.'},
      {term: 'correlation', definition: 'Miara wspolwystepowania dwoch zmiennych, niekoniecznie przyczynowa.'}
    ],
    learningQuote: 'Bez stats sanity check latwo znalezc wzorce ktorych nie ma - Data Analysis Pipeline wymusza dyscypline od profilowania do raportu.',
    realExample: 'Wyobraz sobie ze CFO pyta dlaczego revenue Q3 spadl o 8% i ma na biurku CSV z 2 milionami transakcji. Data collector profiluje (14 kolumn, 12 dat, 4 numeric, 2 text), cleaner lapie 3% missing values w region field, EDA analyst widzi ze spadek jest skoncentrowany w dwoch regionach, SQL specialist izoluje konkretne produkty, statistician sprawdza ze to nie seasonality i to nie one-off anomaly. Writer pisze raport dla CFO z trzema rekomendacjami i wykresami, critic weryfikuje stats sanity.'
  },
  incident_war_room: {
    tagline: 'Trzech specjalistow rownolegle szuka przyczyny - Devil podwaza hipoteze a czlowiek decyduje o rollback',
    missionShort: 'Incident War Room to zespol 10 agentow dla triazu awarii produkcyjnych. Trzech investigators rownolegle (telemetry, logs, diff) szuka przyczyny, dwoch testerow (perf, security) rule-outuje swoje obszary, Devil atakuje wiodaca hipoteze, czlowiek decyduje o rollback a writer pisze postmortem z 5 whys. Oparty na Microsoft Magentic-One.',
    whoIs: 'To preset dla zespolow on-call i SRE podczas awarii produkcyjnych P0/P1. Idealny dla live triage, customer-impact regressions i postmortem generation. Nie dla planowanych prac konserwacyjnych, dlugofalowego sprzatania kodu ani ogolnych podejrzen "system wydaje sie wolny".',
    analogy: 'Ten preset to jak pokoj wojenny incident commandera, gdzie trzech zwiadowcow rownolegle (radar, satelita, agent terenowy) zbiera dane, prokurator atakuje teorie dowodcy a prezydent decyduje o rollback.',
    howItWorks: [
      {label: 'Faza 1 - Parallel investigation', desc: 'Trzech investigators rownolegle: telemetry surfer czyta metryki i traces z reproducible queries, log analyst szuka error patterns w logach, diff investigator analizuje ostatnie deploye i PR.'},
      {label: 'Faza 2 - Specialist rule-out', desc: 'Qa_perf analizuje czy to nie regression wydajnosci, qa_security czy to nie incident bezpieczenstwa. Kazdy wyklucza albo potwierdza swoj obszar.'},
      {label: 'Faza 3 - Devil adversarial', desc: 'Devil atakuje wiodaca hipoteze incident commandera: co jesli to nie deploy, co jesli to downstream service, co jesli to coincidence. Wymusza alternative hypotheses.'},
      {label: 'Faza 4 - Rollback HITL i postmortem', desc: 'Decision presenter prezentuje czlowiekowi dowody i opcje (rollback vs hotfix vs monitor). Czlowiek podpisuje decyzje. Comms officer pisze status page update, writer pisze postmortem z 5 whys.'}
    ],
    inputs: [
      'Dostep do metryk, logow i traces produkcji',
      'Lista ostatnich deployow i PR',
      'Alerty lub zgloszenia klientow',
      'Runbook i lista on-call contact'
    ],
    outputs: [
      'Harmonogram sledztwa (kto kiedy co zrobil)',
      'Glowna teoria z kontrargumentami od Devil',
      'Decyzja o rollback z uzasadnieniem',
      'Komunikat na status page dla klientow',
      'Postmortem z 5 whys i action items'
    ],
    does: [
      'Uruchamia 3 investigators rownolegle tnac time-to-RCA',
      'Uzywa reproducible PromQL/LogQL queries',
      'Wyklucza albo potwierdza perf i security jako domenny',
      'Wymusza alternative hypotheses przez Devil',
      'Daje czlowiekowi decyzje rollback (high stakes)',
      'Pisze status page update dla klientow',
      'Generuje postmortem z 5 whys',
      'Tworzy action items zapobiegajace powtorzeniu'
    ],
    doesNotDo: [
      'Nie dziala bez dostepu do prod observability',
      'Nie dla planowanych prac konserwacyjnych',
      'Nie robi dlugofalowego sprzatania kodu',
      'Nie jest substytutem dla wlasciwego incident commandera',
      'Nie naprawia awarii samodzielnie (tylko diagnoza)',
      'Nie komunikuje z prasa ani social media (tylko status page)',
      'Nie jest proaktywnym monitoringiem (reactive only)'
    ],
    antiPatterns: [
      'First Hypothesis Lock-in - zespol lata z pierwsza teoria bez alternatyw',
      'Rollback Without Evidence - rollback decision bez dowodow ze ostatni deploy jest winowajca',
      'Silent Status Page - awaria trwa a klienci nic nie wiedza',
      'Missing Postmortem - awaria skonczona bez nauki dla zespolu',
      'Shallow 5 Whys - zatrzymanie sie na wwierzchniej przyczynie zamiast root cause'
    ],
    keyConcepts: [
      {term: 'MTTR', def: 'Mean Time To Recovery - sredni czas od detekcji do odzyskania dzialania.'},
      {term: 'Rollback Window', def: 'Okno czasowe w ktorym mozna bezpiecznie cofnac ostatni deploy bez utraty danych.'},
      {term: 'War Room Roles', def: 'Formalne role podczas incydentu: commander, investigator, comms, scribe, executor.'},
      {term: '5 Whys', def: 'Technika znajdowania root cause przez pytanie "dlaczego" piec razy od symptomu do przyczyny.'},
      {term: 'Magentic-One Pattern', def: 'Microsoft framework dual-ledger (task ledger + progress ledger) dla incident response.'}
    ],
    stats: [
      {label: 'Agenci', value: '10'},
      {label: 'Fazy', value: '4'},
      {label: 'Koszt est.', value: '$1.30-3.30'},
      {label: 'Czas', value: '15-40 min'}
    ],
    bestFor: [
      'Gdy masz powazna awarie P0/P1 na produkcji i kazda minuta kosztuje',
      'Gdy regresja dotyka klientow i musisz zdecydowac o rollback',
      'Gdy awaria zakonczona i musisz napisac postmortem dla zarzadu'
    ],
    worstFor: [
      'Gdy nie masz dostepu do metryk ani obserwowalnosci',
      'Gdy to planowana praca konserwacyjna a nie awaria',
      'Gdy potrzebujesz dlugofalowego refaktoru zamiast szybkiej naprawy'
    ],
    relatedPresets: ['perf_squad', 'bug_hunt', 'security_multi_vector'],
    glossary: [
      {term: 'MTTR', definition: 'Mean Time To Recovery - sredni czas od detekcji do naprawy.'},
      {term: 'rollback', definition: 'Cofniecie ostatniego deployu do poprzedniej stabilnej wersji.'},
      {term: '5 whys', definition: 'Technika root cause analysis pytajaca dlaczego piec razy.'},
      {term: 'postmortem', definition: 'Raport po awarii z timeline, root cause i action items.'},
      {term: 'war room', definition: 'Tymczasowy zespol ludzi i systemow zaangazowanych w triaze awarii.'}
    ],
    learningQuote: 'Kazda minuta awarii to pieniadze, a osoba pod presja obstawia zla hipoteze - Incident War Room wymusza trzy rownolegle sledztwa i adversarial challenge przed rollbackiem.',
    realExample: 'Wyobraz sobie ze o 14:30 zaczynaja leciec alerty p99 latency > 5 sekund i dashboard support pokazuje 40 ticketow. Telemetry surfer widzi spike na database connection pool, log analyst lapie 500s w logach auth service, diff investigator znajduje deploy z 14:15 wprowadzajacy nowy middleware. Qa_perf potwierdza ze to nie pamiec ani CPU, qa_security wyklucza atak. Devil atakuje hipoteze: "co jesli to nie middleware a downstream cache invalidation". Decision presenter prezentuje czlowiekowi dowody, human wybiera rollback. O 14:45 serwis stabilny, writer pisze postmortem z 5 whys i action itemami.'
  }
};