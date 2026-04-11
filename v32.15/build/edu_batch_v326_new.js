// Batch: v32.6 new agents (db_architect, observability_engineer, gtm_strategist, statistician, eda_analyst, control_mapper, telemetry_surfer)
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
  gtm_strategist: {
    tagline: 'Choreograf launchu - od ICP do pierwszej sprzedazy',
    missionShort: 'Strateg GTM projektuje plan wejscia produktu na rynek: definiuje idealny profil klienta, positioning, pricing i kanaly akwizycji. Jego misja to polaczyc wynik badan uzytkownikow z mechanika wdrozenia, by launch nie byl wypuszczeniem funkcji w prozni.',
    whoIs: 'Strateg GTM to dowodca operacji ladowania desantu - analizuje teren, wybiera plaze (beachhead), planuje logistyke i koordynuje moment uderzenia. Rozni go od zwyklego marketera to, ze patrzy na caly cykl od ICP po retencje, nie tylko na reklame.',
    analogy: 'Strateg GTM jest jak choreograf premiery Apple - wszystko od keynote po pudelko ma grac wspolnie w ten sam dzwiek.',
    howItWorks: [
      {label: 'ICP i beachhead', desc: 'Definiuje idealny profil klienta (ICP) na podstawie badan, a nastepnie wybiera waska beachhead market - pierwsza grupe, ktora pokochac ma produkt bezwarunkowo.'},
      {label: 'Positioning i pricing', desc: 'Projektuje propozycje wartosci odroznajaca od konkurencji i ustala pricing (anchor, tiers). Testuje narracje na jezyku klienta, nie jezyku produktu.'},
      {label: 'Kanaly akwizycji', desc: 'Wybiera kanaly (content, outbound, partnerships, community, paid) dobrane do dlugosci cyklu sprzedazy i jednostkowej ekonomiki. Mapuje AARRR funnel.'},
      {label: 'Plan launchu', desc: 'Tworzy kalendarz wydania z kamieniami milowymi: pre-launch, launch day, post-launch follow-up. Dobiera metryki sukcesu i uczy sie iteracyjnie.'}
    ],
    inputs: [
      'Opis produktu i jego propozycja wartosci',
      'Wyniki badan uzytkownikow i analizy konkurencji',
      'Budzet launchowy i harmonogram',
      'Dane historyczne jesli to kolejny produkt w portfelu'
    ],
    outputs: [
      'Dokument ICP i beachhead market z uzasadnieniem',
      'Strategia positioningu i pricing grid',
      'Mapa kanalow akwizycji z priorytetami i ROI',
      'Plan launchu z kamieniami milowymi i metrykami sukcesu',
      'Komunikacja launchowa (narracja, copy, PR angle)'
    ],
    does: [
      'Definiuje ICP na podstawie badan a nie wishful thinking o rynku',
      'Wybiera beachhead market w ktorym produkt moze dominowac zanim wejdzie szerzej',
      'Projektuje positioning odroznajacy produkt od konkurencji jednym zdaniem',
      'Ustala pricing strategy z kotwiczeniem psychologicznym (anchor price)',
      'Mapuje lejek AARRR i identyfikuje wski gardla kazdej sciezki konwersji',
      'Dobiera kanaly akwizycji do CAC, LTV i dlugosci cyklu sprzedazy',
      'Przygotowuje plan launchu z konkretnymi metrykami sukcesu na 30/60/90 dni',
      'Pisze narracje marketingowa opartar na jezyku klienta z badan, nie slowach firmy'
    ],
    doesNotDo: [
      'Nie prowadzi badan uzytkownikow (to domena res_ux)',
      'Nie pisze kodu ani nie implementuje produktu (to domena buildu)',
      'Nie decyduje o architekturze technicznej ani stacku',
      'Nie projektuje UI ani visual identity (to domena designera)',
      'Nie zajmuje sie obsluga klienta po sprzedazy jako rola operacyjna',
      'Nie zastepuje SDR ani account executive w realnej sprzedazy',
      'Nie robi analiz finansowych na poziomie controllingu firmy'
    ],
    antiPatterns: [
      'Boiling Ocean - targetowanie wszystkich jednoczesnie zamiast wyboru beachhead market',
      'Feature Launch - komunikat o funkcjach bez mapowania na bol klienta i jobs-to-be-done',
      'Inside Out Positioning - jezyk produktu i firmy zamiast slow ktorymi mowi klient',
      'Unit Economics Blindness - skalowanie kanalu zanim ustalono ze CAC < LTV',
      'Big Bang Launch - jedno ogromne wydarzenie bez fazy pre-launch i post-launch'
    ],
    keyConcepts: [
      {term: 'ICP', def: 'Idealny profil klienta - waska charakterystyka kupca dla ktorego produkt jest must-have.'},
      {term: 'Beachhead market', def: 'Pierwszy waski segment w ktorym startup moze dominowac zanim wejdzie szerzej (Moore).'},
      {term: 'AARRR', def: 'Lejek piratski Acquisition, Activation, Retention, Referral, Revenue - metryki sukcesu produktu.'},
      {term: 'Anchor pricing', def: 'Efekt kotwiczenia - wysoka cena referencyjna, ktora sprawia ze srednia wydaje sie okazja.'},
      {term: 'TAM SAM SOM', def: 'Calkowity rynek, rynek dostepny i rynek osiagalny - trzy poziomy estymacji wielkosci rynku.'}
    ],
    stats: [
      {label: 'Faza', value: 'BUILD'},
      {label: 'Kategoria', value: 'Produkt'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy przygotowujesz launch nowego produktu i nie wiesz od czego zaczac',
      'Gdy produkt dziala ale nikt nie kupuje bo positioning jest niejasny',
      'Gdy trzeba wybrac pomiedzy kilkoma segmentami rynku i brak ci dyscypliny beachhead'
    ],
    worstFor: [
      'Gdy potrzebujesz tylko wykonawcy kampanii reklamowej, nie strategii',
      'Gdy produkt nie ma jeszcze product-market-fit i trzeba najpierw badac uzytkownikow',
      'Gdy szukasz analizy technicznej lub architektonicznej, nie biznesowej'
    ],
    relatedAgents: ['res_ux', 'writer', 'analyst'],
    glossary: [
      {term: 'ICP', definition: 'Idealny profil klienta - dokladny opis kupca dla ktorego produkt jest rozwiazaniem must-have.'},
      {term: 'beachhead', definition: 'Waski segment rynku, ktory startup wybiera na pierwszy cel ladowania, by zbudowac tam dominacje.'},
      {term: 'AARRR', definition: 'Piate metryki lejka: Acquisition, Activation, Retention, Referral, Revenue.'},
      {term: 'anchor price', definition: 'Wysoka cena referencyjna ustalona tak, by srednia oferta wygladala jak okazja.'},
      {term: 'TAM/SAM/SOM', definition: 'Total, Serviceable Available, Serviceable Obtainable Market - trzy poziomy estymacji rynku.'}
    ],
    learningQuote: 'Launch nie jest wydarzeniem jednego dnia - to trzy fazy: pre-launch, dzien wydania i to co dzieje sie po, gdy zaczynasz sluchac danych.',
    realExample: 'Pewnego dnia projektowalem GTM dla narzedzia dla zespolow devops. Zamiast szerzenia komunikatu do wszystkich inzynierow wybralem beachhead: zespoly SRE 10-30 osob w fintechu. Pierwsze 40 klientow zamknelo sie w 6 tygodni bo jezyk landing page mowil ich slowami o burn rate, nie ogolnikami o efektywnosci.'
  },
  statistician: {
    tagline: 'Naukowiec sadowy liczb - nie zezna dopoki nie ma power analysis',
    missionShort: 'Statystyk projektuje eksperymenty i analizy tak, by wyniki mialy wartosc poznawcza. Jego misja to dobrac test, wielkosc proby, moc i korekcje dla porownan wielokrotnych. Chroni zespol przed wnioskami z hazardowych danych, ktore w koncu zawioda na produkcji.',
    whoIs: 'Statystyk to naukowiec sadowy - zanim cokolwiek powie w sadzie, sprawdza trzy razy czy dane pozwalaja na ten wniosek. Bez power analysis i preregistracji nie bedzie zeznawal, bo jego reputacja zalezy od tego, ze kazde jego wnioskowanie wytrzymuje replike.',
    analogy: 'Statystyk jest jak biegly sadowy ktory odmawia zezania bez odpowiedniego materialu dowodowego - wolal zbadac sprawe niz zgadnac.',
    howItWorks: [
      {label: 'Hipoteza i plan', desc: 'Formuluje hipoteze zerowa i alternatywna precyzyjnie. Zapisuje plan analizy zanim zobaczy dane (preregistration) by uniknac p-value hackingu.'},
      {label: 'Power i wielkosc proby', desc: 'Oblicza wymagana wielkosc proby pod zadany efekt, poziom istotnosci (alfa) i moc (zwykle 0.8). Odmawia eksperymentow z zbyt mala proba.'},
      {label: 'Dobor testu', desc: 'Wybiera test odpowiedni do typu danych i zalozen (t-test, Mann-Whitney, chi kwadrat, regresja). Sprawdza zalozenia (normalnosc, wariancje, niezaleznosc).'},
      {label: 'Wnioskowanie i raport', desc: 'Raportuje effect size i confidence interval, nie tylko p-value. Koryguje dla porownan wielokrotnych (Bonferroni, BH). Jasno oddziela correlation od causation.'}
    ],
    inputs: [
      'Pytanie badawcze lub biznesowe do zweryfikowania',
      'Opis zbierania danych i dostepnych pomiarow',
      'Oczekiwana wielkosc efektu lub dane pilotazowe',
      'Ograniczenia czasowe i budzetowe eksperymentu'
    ],
    outputs: [
      'Dokument planu analizy (preregistration) z hipotezami',
      'Wyliczenie mocy i wymaganej wielkosci proby',
      'Raport wyniku z effect size i confidence interval',
      'Korekcja dla porownan wielokrotnych jesli stosowana',
      'Rekomendacja wnioskow z jasnym confidence labeling'
    ],
    does: [
      'Formuluje hipoteze zerowa i alternatywna w sposob testowalny',
      'Oblicza wymagana moc statystyczna i wielkosc proby przed startem eksperymentu',
      'Dobiera test hipotez odpowiedni do rozkladu, wariancji i typu danych',
      'Raportuje effect size i confidence interval a nie tylko p-value',
      'Koryguje dla porownan wielokrotnych by uniknac false positive',
      'Rejestruje plan analizy przed zobaczeniem danych (preregistration)',
      'Odroznia statystyczna istotnosc od praktycznej znacznosci efektu',
      'Ostrzega przed wnioskami causal z danych obserwacyjnych'
    ],
    doesNotDo: [
      'Nie prowadzi eksploracyjnej analizy danych (to domena eda_analyst)',
      'Nie buduje modeli ML ani pipeline trenowania',
      'Nie pisze kodu produkcyjnego ani ETL',
      'Nie zbiera danych z uzytkownikow sam (to domena res_ux)',
      'Nie akceptuje p-value hackingu w imie deadline u biznesowego',
      'Nie formuluje hipotezy po zobaczeniu wynikow (HARKing)',
      'Nie zastepuje product managera w decyzji czy funkcja idzie na produkcje'
    ],
    antiPatterns: [
      'P-hacking - testowanie wielu hipotez i raportowanie tylko tych z p < 0.05',
      'HARKing - Hypothesising After Results are Known, dopisywanie hipotezy pod wyniki',
      'Underpowered Study - eksperyment na zbyt malej probie, wykrywa tylko gigantyczne efekty',
      'P Value Worship - raportowanie tylko p-value bez effect size i confidence interval',
      'Correlation as Causation - wnioski przyczynowe z danych czysto obserwacyjnych'
    ],
    keyConcepts: [
      {term: 'Null hypothesis', def: 'Hipoteza zerowa zakladajaca brak efektu, ktora test stara sie odrzucic.'},
      {term: 'Type I/II error', def: 'Bledy I rodzaju (false positive) i II rodzaju (false negative) sa nieuniknione, mozna je balansowac.'},
      {term: 'Power', def: 'Prawdopodobienstwo wykrycia prawdziwego efektu; standardowy cel to 0.8, wymaga wielkosci proby.'},
      {term: 'Effect size', def: 'Miara wielkosci efektu (Cohen d, r, OR) niezalezna od wielkosci proby, wazniejsza niz p-value.'},
      {term: 'Preregistration', def: 'Rejestracja planu analizy przed zbieraniem danych, chroni przed p-hackingiem.'}
    ],
    stats: [
      {label: 'Faza', value: 'STRATEGY'},
      {label: 'Kategoria', value: 'Dane'},
      {label: 'Load', value: '45/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy projektujesz eksperyment A/B i musisz wiedziec ile tygodni go pusczac',
      'Gdy zespol chce wyciagnac wnioski z danych i potrzebujesz kontroli poprawnosci',
      'Gdy trzeba zbadac czy pozorny wynik nie jest efektem szumu lub porownan wielokrotnych'
    ],
    worstFor: [
      'Gdy potrzebujesz eksploracyjnej analizy i szukasz wzorcow (to eda_analyst)',
      'Gdy decyzja jest jakosciowa i nie opiera sie na metryce ktora mozna policzyc',
      'Gdy masz 30 minut do konca spotkania i potrzebujesz prostej odpowiedzi'
    ],
    relatedAgents: ['eda_analyst', 'analyst', 'expert_analyst'],
    glossary: [
      {term: 'null hypothesis', definition: 'Hipoteza zerowa - wyjsciowe zalozenie, ze nie ma efektu, ktore test probuje odrzucic.'},
      {term: 'power', definition: 'Moc testu - prawdopodobienstwo wykrycia efektu gdy rzeczywiscie istnieje, standardowy cel 0.8.'},
      {term: 'effect size', definition: 'Miara wielkosci efektu niezalezna od wielkosci proby, np Cohen d albo iloraz szans.'},
      {term: 'p-hacking', definition: 'Manipulowanie danymi lub testami az do uzyskania p < 0.05, zlamanie rygorow statystyki.'},
      {term: 'preregistration', definition: 'Publiczna rejestracja hipotez i planu analizy przed zobaczeniem danych, broni przed HARKingiem.'}
    ],
    learningQuote: 'P-value to nie jest wyrocznia - effect size i wielkosc proby mowia wiecej o rzeczywistosci niz magiczne 0.05.',
    realExample: 'Pewnego dnia zespol chcial wypuscic nowy onboarding bo wstepny test pokazal poprawe konwersji o 3 procent przy p = 0.04. Policzylem moc: proba byla za mala, a efekt prawdopodobnie zawiera sie w 95 procentowym CI od -0.5 do 6.5. Zablokowalem wdrozenie, poprosilem o dluzszy eksperyment i finalnie okazalo sie ze prawdziwy efekt to 1.2 procenta, czyli nieistotny biznesowo.'
  },
  eda_analyst: {
    tagline: 'Detektyw danych z lupa - opisuje rzeczywistosc zanim ktos ja modeluje',
    missionShort: 'Analityk EDA prowadzi eksploracyjna analize danych: profilowanie, wykrywanie anomalii, korelacje i wizualizacje. Jego misja to opisac dane tak, by zespol wiedzial z czym pracuje zanim zbuduje model lub podejmie decyzje, i by ukryte pulapki wyszly na jaw wczesnie.',
    whoIs: 'Analityk EDA to detektyw z lupa w reku - nie stawia tezy zanim nie zobaczy miejsca zbrodni. Chodzi po kolumnach, kartkuje rozklady, patrzy na punkty odstajace i slucha co dane probuja mu powiedziec. Jego praca to pytania, nie gotowe odpowiedzi.',
    analogy: 'Analityk EDA jest jak astronom przed budowa teleskopu - najpierw patrzy na niebo golym okiem i mapuje gdzie sa gwiazdy, a gdzie pustki.',
    howItWorks: [
      {label: 'Profilowanie danych', desc: 'Opisuje kazda kolumne: typ, braki, unikalne wartosci, rozklad, statystyki. Tworzy data dictionary jako wspolna podstawe dla zespolu.'},
      {label: 'Wizualizacje rozkladow', desc: 'Buduje histogramy, boxploty i density ploty dla zmiennych liczbowych oraz bar charty dla kategorycznych. Patrzy na skew, kurtoze i modalnosc.'},
      {label: 'Korelacje i relacje', desc: 'Liczy macierze korelacji, pair ploty i cross-tabulacje. Szuka potencjalnych leak features i kolinearnosci ktore popsulyby model.'},
      {label: 'Anomalie i raport', desc: 'Identyfikuje wartosci odstajace, braki systematyczne, duplikaty i paradoksy typu Simpson. Pisze raport z kluczowymi obserwacjami i rekomendacjami.'}
    ],
    inputs: [
      'Surowy zbior danych (CSV, Parquet, tabela SQL)',
      'Opis pochodzenia danych i kontekstu biznesowego',
      'Pytanie badawcze lub hipoteza robocza do potwierdzenia',
      'Slownik kolumn jesli istnieje albo tylko metadata'
    ],
    outputs: [
      'Data dictionary z typami, brakami i rozkladami',
      'Zestaw wizualizacji rozkladow i korelacji',
      'Lista anomalii, outlierow i problemow jakosci',
      'Raport z kluczowymi obserwacjami i rekomendacjami',
      'Notatnik Jupyter lub skrypt odtwarzalny dla zespolu'
    ],
    does: [
      'Profiluje dane kolumna po kolumnie z typami, brakami i unikalnosciami',
      'Buduje histogramy, boxploty i density plots wychwytujace ksztalt rozkladu',
      'Liczy macierz korelacji Pearsona i Spearmana wykrywajac kolinearnosci',
      'Identyfikuje wartosci odstajace metodami IQR, z-score i wizualnie',
      'Wykrywa paradoksy Simpsona i ukryte warunkowania zmienne',
      'Oznacza braki systematyczne (MCAR vs MAR vs MNAR) z konsekwencjami',
      'Rysuje pair ploty i cross-tabulacje dla zmiennych kategorycznych',
      'Tworzy odtwarzalny notatnik ktory mozna przekazac modelarzom i statystykowi'
    ],
    doesNotDo: [
      'Nie buduje modeli ML ani nie trenuje sieci neuronowych',
      'Nie prowadzi testow hipotez z rygorem statystycznym (to statistician)',
      'Nie podejmuje decyzji biznesowych na podstawie danych',
      'Nie robi ETL ani nie czyste dane poza wykryciem problemow',
      'Nie projektuje schematu bazy danych (to db_architect)',
      'Nie przypisuje braki metodami zaawansowanymi bez konsultacji',
      'Nie wyciaga wnioskow causal z danych obserwacyjnych'
    ],
    antiPatterns: [
      'Jump to Model - pominiecie EDA i przejscie od razu do trenowania modelu',
      'Mean Addiction - opisywanie zmiennych tylko srednia bez rozkladu i odchylenia',
      'Correlation Equals Causation - wnioski przyczynowe z korelacji w danych obserwacyjnych',
      'Outlier Removal Without Reason - wycinanie outlierow bo przeszkadzaja wykresom',
      'Aggregated Blindness - patrzenie tylko na agregaty globalne ignorujac segmenty i Simpson paradox'
    ],
    keyConcepts: [
      {term: 'Simpson paradox', def: 'Trend widoczny w agregatach znika lub odwraca sie po rozbiciu na podgrupy.'},
      {term: 'Outlier', def: 'Wartosc odstajaca - moze byc bledem, anomalia lub najwazniejsza informacja w zbiorze.'},
      {term: 'Skewness', def: 'Asymetria rozkladu - mowi czy srednia ciagnie w lewo lub prawo od mediany.'},
      {term: 'Correlation vs causation', def: 'Korelacja nie implikuje przyczynowosci, trzeba sprawdzic zmienne ukryte i kolejnosc czasowa.'},
      {term: 'Missingness', def: 'Wzorzec brakow danych: MCAR losowy, MAR warunkowy, MNAR systematyczny i informacyjny.'}
    ],
    stats: [
      {label: 'Faza', value: 'BUILD'},
      {label: 'Kategoria', value: 'Dane'},
      {label: 'Load', value: '60/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy dostajesz nowy zbior danych i chcesz zrozumiec z czym pracujesz',
      'Gdy model nie dziala dobrze i podejrzewasz problem z jakoscia danych',
      'Gdy planujesz eksperyment i chcesz wiedziec czy dane maja niewidoczne pulapki'
    ],
    worstFor: [
      'Gdy potrzebujesz testowania hipotez z rygorem statystycznym (to statistician)',
      'Gdy chcesz tylko wytrenowac model bez rozumienia danych (nie polecane ale...)',
      'Gdy dane sa juz dobrze opisane i zespol zna kazda kolumne na pamiec'
    ],
    relatedAgents: ['statistician', 'analyst', 'db_architect'],
    glossary: [
      {term: 'Simpson paradox', definition: 'Efekt w ktorym kierunek zwiazku odwraca sie po rozbiciu danych na podgrupy.'},
      {term: 'outlier', definition: 'Wartosc znaczaco odbiegajaca od pozostalych, wymagajaca decyzji czy to blad czy sygnal.'},
      {term: 'z-score', definition: 'Znormalizowany dystans od sredniej mierzony w odchyleniach standardowych.'},
      {term: 'histogram', definition: 'Wykres slupkowy pokazujacy rozklad czestosci wartosci w przedzialach.'},
      {term: 'pair plot', definition: 'Siatka wykresow rozrzutu par zmiennych z histogramami na przekatnej.'}
    ],
    learningQuote: 'Zanim zbudujesz model, zrozum dane - sredniej nie mozna ufac jesli nie widzisz rozkladu ani odchylenia.',
    realExample: 'Pewnego dnia profilowalem zbior transakcji e-commerce dla nowej rekomendacji. Wykrylem ze 12 procent rekordow mialo ujemne ceny (return-y zakodowane blednie), a korelacja ceny z konwersja odwracala sie przy rozbiciu na regiony (Simpson paradox). Zespol ML oszczedzil miesiac trenowania modelu na zepsutych danych.'
  },
  control_mapper: {
    tagline: 'Tlumacz miedzy legalesem a kodem - jak GDPR staje sie konkretnym commitem',
    missionShort: 'Mapper Kontroli tlumaczy wymagania regulacyjne (GDPR, SOC2, ISO27001, HIPAA) na konkretne kontrole techniczne i procesowe. Jego misja to zbudowac matryce kontroli, identyfikowac luki i wskazac dowody zgodnosci, zanim audytor zapuka do drzwi.',
    whoIs: 'Mapper Kontroli to tlumacz przysiegly miedzy swiatem prawnym i inzynierskim. Czyta regulacje jak ustawy, ale mowi kodem, konfiguracja i ticketem. Rozumie, ze kazda klauzula GDPR na koncu musi wyladowac jako checkbox w rolach IAM albo polityka retencji w bazie.',
    analogy: 'Mapper Kontroli jest jak tlumacz na dwujezycznej rozprawie sadowej - po jednej stronie paragraf, po drugiej commit, a on musi zadbac by obaj mowili o tym samym.',
    howItWorks: [
      {label: 'Analiza wymagan', desc: 'Czyta ramy regulacyjne (GDPR art, SOC2 trust services, ISO27001 Annex A, HIPAA Security Rule) i ekstraktuje konkretne wymagania dotyczace danych i procesow.'},
      {label: 'Mapowanie kontroli', desc: 'Dla kazdego wymagania identyfikuje kontrole techniczna (szyfrowanie, RBAC, logi audytu) lub procesowa (przeglad kwartalny, DPIA). Unika duplikatow przez reuse kontroli CIS/NIST.'},
      {label: 'Matryca zgodnosci', desc: 'Buduje matryce wymagania vs kontrole vs dowody. Pokazuje gdzie brakuje dowodu, gdzie sa kompensacje i gdzie jest luka.'},
      {label: 'Gap analysis', desc: 'Wskazuje luki z priorytetyzacja (blocker, major, minor) i rekomenduje konkretne kroki. Przygotowuje dokument audytorski pod zewnetrznych kontrolerow.'}
    ],
    inputs: [
      'Lista ram regulacyjnych objetych scope (np GDPR + SOC2)',
      'Opis systemu, architektury i przeplywu danych',
      'Istniejace polityki i dokumenty compliance jesli sa',
      'Dostep do evidence (logi, konfiguracje, polityki)'
    ],
    outputs: [
      'Matryca kontroli wymagania vs kontrole vs evidence',
      'Lista luk z priorytetami i rekomendacjami',
      'Specyfikacja kontroli technicznych do implementacji',
      'Dokumentacja procesow i polityk compliance',
      'Raport gotowosci audytowej (audit-ready checklist)'
    ],
    does: [
      'Mapuje wymagania GDPR, SOC2, ISO27001, HIPAA na kontrole techniczne i procesowe',
      'Buduje matryce wymagania vs kontrole vs evidence wielu frameworkow jednoczesnie',
      'Identyfikuje luki i priorytetyzuje je wedlug ryzyka biznesowego i prawnego',
      'Wybiera kontrole kompensacyjne gdy pelna kontrola jest niemozliwa',
      'Reuse bazowych kontroli CIS/NIST zamiast wymyslania wszystkiego na nowo',
      'Dokumentuje DPIA dla GDPR i procesow przetwarzania danych osobowych',
      'Mapuje STRIDE na kontrole zapobiegajace konkretnym zagrozeniom',
      'Przygotowuje dokumentacje audytowa dla zewnetrznych kontrolerow (ISO, SOC2 type 2)'
    ],
    doesNotDo: [
      'Nie implementuje kontroli technicznych (to domena backendu i qa_security)',
      'Nie pisze kodu i konfiguracji infrastruktury',
      'Nie prowadzi audytow zewnetrznych jako niezalezny auditor',
      'Nie decyduje o ryzyku biznesowym firmy (to rola CISO i prawnika)',
      'Nie tlumaczy z jezyka prawnego na polski potoczny (to domena legal)',
      'Nie ignoruje luk dla kompromisu z deadline u biznesowego',
      'Nie testuje penetracyjnie systemu (to qa_security)'
    ],
    antiPatterns: [
      'Checkbox Compliance - odfajkowywanie wymagan bez rzeczywistego dowodu implementacji',
      'Framework Silos - osobna dokumentacja per framework zamiast reuse bazowych kontroli',
      'Evidence Theater - gromadzenie screenshotow bez polaczenia z realna kontrola',
      'Control Sprawl - setki kontroli bez priorytetow, nikt nie wie ktore sa krytyczne',
      'Last Minute Audit - zbieranie dowodow dzien przed audytem zamiast ciaglego monitoringu'
    ],
    keyConcepts: [
      {term: 'CIA triad', def: 'Podstawowe cele bezpieczenstwa: Confidentiality, Integrity, Availability.'},
      {term: 'SOC2 trust services', def: 'Piec kategorii: Security, Availability, Processing integrity, Confidentiality, Privacy.'},
      {term: 'GDPR DPIA', def: 'Data Protection Impact Assessment - ocena skutkow dla ochrony danych osobowych przy wysokim ryzyku.'},
      {term: 'STRIDE', def: 'Model zagrozen: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.'},
      {term: 'Compensating control', def: 'Kontrola zastepcza gdy oryginalna nie jest mozliwa - musi zapewnic rownowazne zmniejszenie ryzyka.'}
    ],
    stats: [
      {label: 'Faza', value: 'BUILD'},
      {label: 'Kategoria', value: 'Compliance'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy firma szykuje sie do audytu SOC2 lub ISO27001 i nie ma matrycy kontroli',
      'Gdy wdrazasz produkt dla klientow w EU i musisz spelnic GDPR z ewidencja',
      'Gdy masz wiele frameworkow jednoczesnie (SOC2 + HIPAA + GDPR) i chcesz reuse kontroli'
    ],
    worstFor: [
      'Gdy potrzebujesz testu penetracyjnego systemu (to qa_security)',
      'Gdy problem jest techniczny w kodzie, nie w zgodnosci regulacyjnej',
      'Gdy szukasz doradcy prawnego do interpretacji klauzul (to prawnik, nie agent)'
    ],
    relatedAgents: ['qa_security', 'backend', 'writer'],
    glossary: [
      {term: 'CIA triad', definition: 'Confidentiality, Integrity, Availability - trzy filary bezpieczenstwa informacji.'},
      {term: 'SOC2 TSC', definition: 'SOC2 Trust Services Criteria - piec kategorii kontroli dla audytu AICPA.'},
      {term: 'DPIA', definition: 'Data Protection Impact Assessment wymagane GDPR przy przetwarzaniu wysokiego ryzyka.'},
      {term: 'STRIDE', definition: 'Model zagrozen Microsoft uzywany do threat modelingu aplikacji i infrastruktury.'},
      {term: 'compensating control', definition: 'Kontrola zastepcza wdrozona gdy oryginalna jest niemozliwa, musi rownowazyc ryzyko.'}
    ],
    learningQuote: 'Zgodnosc nie istnieje bez dowodu - checkbox w dokumencie ktory nie ma polaczenia z konfiguracja systemu to fikcja.',
    realExample: 'Pewnego dnia mapowalem SOC2 i GDPR dla startupu HR-tech. Zamiast pisac dwie osobne matryce zbudowalem jedna bazowa na CIS Controls i zmapowalem 78 procent kontroli do obu frameworkow jednoczesnie. Audytor SOC2 type 2 przeszedl na tych samych dowodach co DPIA, a zespol zaoszczedzil trzy miesiace pracy duplikujacej.'
  },
  telemetry_surfer: {
    tagline: 'Strazak z kamera termowizyjna - sledzi incydent poprzez zapytania PromQL',
    missionShort: 'Surfer Telemetrii przeszukuje istniejaca telemetrie (metryki, logi, traces) w poszukiwaniu wzorcow, anomalii i sladow incydentow. Jego misja to odpowiadac na pytania co sie stalo i co sie dzieje teraz przy uzyciu reproducibilnych zapytan PromQL, LogQL i trace search.',
    whoIs: 'Surfer Telemetrii to strazak z kamera termowizyjna wchodzacy do ciemnego budynku. Nie widzi ogniem na wprost, widzi temperature, dym i ruch powietrza, i z tych sygnalow sklada obraz tego co sie pali. Jego jezykiem sa zapytania, nie zgadywanki.',
    analogy: 'Surfer Telemetrii jest jak ratownik gorski z echosonda - nie kopie w sniegu na slepo, odczytuje sygnaly i lokalizuje zrodlo problemu po danych.',
    howItWorks: [
      {label: 'Formulacja pytania', desc: 'Przekodowuje mglisty raport incydentu (cos nie dziala) na konkretne pytanie telemetryczne: jaka metryka, jaki period, jaki serwis.'},
      {label: 'Zapytania PromQL i LogQL', desc: 'Pisze reproducowalne zapytania rate(), histogram_quantile(), sum by, LogQL stream selector. Unika scenariuszy gdzie query zwraca cos innego po godzinie.'},
      {label: 'Korelacja trzech filarow', desc: 'Laczy anomalie metryk z konkretnym trace span (exemplar), a nastepnie z logami za pomoca traceid. Uklada chronologie zdarzen.'},
      {label: 'Raport i runbook', desc: 'Pisze raport z konkretna hipoteza, dowodami, zapytaniami do reprodukcji i propozycja akcji. Uzupelnia runbook by nastepny raz byl szybszy.'}
    ],
    inputs: [
      'Opis incydentu lub pytanie operacyjne co sie stalo',
      'Dostep do Prometheus/Loki/Tempo lub rowowaznych',
      'Zakres czasowy i lista podejrzanych serwisow',
      'Istniejace dashboardy i runbooki jesli sa'
    ],
    outputs: [
      'Chronologia incydentu z timestampami',
      'Reproducowalne zapytania PromQL/LogQL w raporcie',
      'Korelacja metryka ze trace span i logami po traceid',
      'Hipoteza przyczyny z poziomem pewnosci',
      'Aktualizacja runbooku dla nastepnego podobnego zdarzenia'
    ],
    does: [
      'Formuluje pytania telemetryczne z mglistych raportow incydentow',
      'Pisze reproducowalne zapytania PromQL z rate(), histogram_quantile, sum by',
      'Wyszukuje logi za pomoca LogQL stream selector i wyrazen regex',
      'Laczy metryki z trace span przez exemplary i z logami przez traceid',
      'Wykrywa korelacje czasowe miedzy deployem a wzrostem error rate',
      'Porownuje zachowanie przed i po zdarzeniu dla tej samej metryki',
      'Identyfikuje eksplozje kardynalnosci i drogie zapytania dezynfekujace TSDB',
      'Pisze raport sledczy z dowodami i propozycja runbook update'
    ],
    doesNotDo: [
      'Nie instrumentuje systemu ani nie dodaje nowych metryk (to observability_engineer)',
      'Nie naprawia kodu ktory spowodowal incydent (to domena buildu)',
      'Nie buduje dashboardow ani SLO od zera (to observability_engineer)',
      'Nie podejmuje decyzji o rollback produkcji bez decision presenter',
      'Nie zglasza incydentow jako pierwsza linia support',
      'Nie pisze post-mortemu zamiast manager QA',
      'Nie wyciaga wnioskow o kulturze zespolu z danych telemetrycznych'
    ],
    antiPatterns: [
      'Eye Balling Graphs - zgadywanie z wykresu bez konkretnego zapytania reproducowalnego',
      'Single Pillar Investigation - patrzenie tylko na metryki albo tylko na logi zamiast korelacji trzech filarow',
      'Cardinality Query - grupowanie po wysokiej kardynalnosci polu wywalajace sam Prometheus',
      'Post Hoc Correlation - laczenie zdarzen tylko dlatego ze wydarzyly sie obok czasu',
      'Irate Over Long Range - uzycie irate() na dlugim oknie dajace bezwartosciowe wyniki'
    ],
    keyConcepts: [
      {term: 'histogram_quantile', def: 'Funkcja PromQL liczaca kwantyle (p50/p95/p99) z histogramu bucketow.'},
      {term: 'rate vs irate', def: 'rate() liczy srednia na oknie, irate() chwilowy stosunek - uzywa sie inaczej zaleznie od kontekstu.'},
      {term: 'LogQL stream selector', def: 'Filtr strumieni logow w Loki wg etykiet, np {app="api", level="error"}.'},
      {term: 'Trace span', def: 'Jednostka tracingu reprezentujaca operacje z czasem start/stop i relacja parent-child.'},
      {term: 'Exemplar', def: 'Przykladowy trace span powiazany z punktem metryki, klikalny z wykresu do trace.'}
    ],
    stats: [
      {label: 'Faza', value: 'RESEARCH'},
      {label: 'Kategoria', value: 'Ops'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy masz incydent produkcyjny i musisz w minutach ustalic co sie dzieje',
      'Gdy cos zwolnilo i nie wiadomo ktory serwis, a telemetria istnieje',
      'Gdy chcesz odtworzyc chronologie zdarzen z dowodami do post-mortemu'
    ],
    worstFor: [
      'Gdy system nie ma wystarczajacej telemetrii (najpierw observability_engineer)',
      'Gdy problem jest w designie UI lub w produkcie, nie w operacjach',
      'Gdy potrzebujesz dlugoterminowego planu SLO i dashbordow od podstaw'
    ],
    relatedAgents: ['observability_engineer', 'qa_perf', 'res_tech'],
    glossary: [
      {term: 'histogram_quantile', definition: 'Funkcja PromQL liczaca kwantyl (np p99) z histogramu metryki.'},
      {term: 'rate vs irate', definition: 'rate() liczy srednia z okna, irate() chwilowa zmiane z dwoch ostatnich probek.'},
      {term: 'LogQL', definition: 'Jezyk zapytan Loki laczacy stream selector z wyrazeniami regex i pipe operatorami.'},
      {term: 'traceid', definition: 'Identyfikator tracea propagowany przez wszystkie spany i powiazane logi.'},
      {term: 'exemplar', definition: 'Przyklad trace span dolaczony do punktu metryki, pozwala skoczyc z wykresu do tracea.'}
    ],
    learningQuote: 'Jesli nie potrafisz zreprodukowac wyniku zapytaniem za godzine, to nie jest sledztwo tylko wrozenie z wykresow.',
    realExample: 'Pewnego dnia badalem incydent gdzie p99 latency API skoczyl z 200 ms do 4 sekund bez widocznego bledu. Napisalem rate(http_request_duration_seconds_bucket) z histogram_quantile 0.99 i zobaczylem ze skok zaczal sie dokladnie o 14:32. Exemplar prowadzil do trace span w warstwie DB, a log po traceid pokazal query planner wybrany full scan po migracji indeksu. Minut 12, nie godzin.'
  },
