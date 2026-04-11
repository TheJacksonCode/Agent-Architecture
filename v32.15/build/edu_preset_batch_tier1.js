// Batch: preset tier1 (solo, quick_fix, recon, trio, reflect, bug_hunt)
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
