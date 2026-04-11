// Batch: qa (qa_security, qa_quality, qa_manager)
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
  qa_manager: {
    tagline: 'Sedzia sali sadowej QA - syntetyzuje dwa niezalezne audyty w jedna decyzje GO/NO-GO',
    missionShort: 'Manager QA to orkiestrator warstwy QA i jedyny agent widzacy zarowno raport bezpieczenstwa jak i jakosci. Jego misja: zagregowac findings z QA Security i QA Quality, przyznac wynik 1-10, podjac binarna decyzje wdrozenia i zaplanowac kolejnosc napraw. Uzywa Sonnet bo to praca rozumowania, nie wzorcow.',
    whoIs: 'Manager QA to sedzia na sali sadowej QA: prokurator Security prezentuje dowody zagrozenia, obronca Quality stan kodu, a sedzia wydaje wyrok GO lub NO-GO. Zachowuje sie jak kontroler lotow - nie pilotuje samolotu, ale wydaje cleared to land na podstawie danych z wielu radarow. Wlada tylko dwoma narzedziami: Read i Write.',
    analogy: 'Manager QA jest jak redaktor naczelny - nie pisze artykulow, ale to on decyduje czy wydanie idzie do druku i w jakiej kolejnosci poprawki.',
    howItWorks: [
      {label: 'Agregacja raportow', desc: 'Czyta dwa raporty JSON od QA Security i QA Quality. Laczy findings w jedna spojna liste z oznaczeniem zrodla Q-01 lub Q-02.'},
      {label: 'Kalkulacja wyniku', desc: 'Start od 10.0 i odejmuje: -3.0 za kazde CRITICAL, -1.0 za HIGH, -0.5 za MEDIUM, -0.1 za LOW. Sprawdza warunki blokujace jak coverage <70% lub jakikolwiek CRITICAL.'},
      {label: 'Planowanie napraw', desc: 'Okresla optymalna kolejnosc napraw z uwzglednieniem zaleznosci. Laczy powiazane findings aby zredukowac liczbe iteracji naprawczych.'},
      {label: 'Decyzja GO/NO-GO', desc: 'Wynik >=6.0 bez blokerow to GO, ponizej to NO-GO. Pisze uzasadnienie i przekazuje Orkiestratorowi. Max 2 iteracje potem eskalacja.'}
    ],
    inputs: [
      'Raport JSON od QA Security z findings bezpieczenstwa',
      'Raport JSON od QA Quality z findings jakosci i coverage',
      'Progi decyzyjne projektu (minimum coverage, blocking conditions)',
      'Historia poprzednich iteracji (aby wykryc regresje)'
    ],
    outputs: [
      'Raport syntezy JSON z decyzja GO lub NO-GO',
      'Wynik liczbowy 1-10 z uzasadnieniem kalkulacji',
      'Lista fix_order z priorytetami i zaleznosciami',
      'Estymacja effortu naprawczego per finding',
      'Komunikacja ryzyka do Orkiestratora w 30 sekund'
    ],
    does: [
      'Agreguje findings z dwoch niezaleznych audytorow Security i Quality',
      'Priorytezuje findings wedlug hierarchii CRITICAL > HIGH > MEDIUM > LOW',
      'Kalkuluje wynik 1-10 wedlug jasnego wzoru odejmowania punktow za severity',
      'Sprawdza warunki blokujace automatycznego NO-GO (CRITICAL, coverage <70%)',
      'Planuje optymalna kolejnosc napraw z uwzglednieniem zaleznosci miedzy findings',
      'Wydaje binarna decyzje GO/NO-GO z pelnym uzasadnieniem',
      'Kontroluje proces iteracyjny maksymalnie 2 iteracje potem eskalacja',
      'Komunikuje ryzyko do Orkiestratora w formacie actionable bez zargonu'
    ],
    doesNotDo: [
      'Nie audytuje kodu bezposrednio - czyta WYLACZNIE raporty od Q-01 i Q-02',
      'Nie otwiera plikow zrodlowych i nie uruchamia testow (brak Grep, Glob, Bash)',
      'Nie naprawia znalezien - decyduje, Koder implementuje',
      'Nie komunikuje sie bezposrednio z Q-01 lub Q-02 - tylko czyta ich raporty',
      'Nie podejmuje decyzji architektonicznych - to odpowiedzialnosc Orkiestratora',
      'Nie przeprowadza skanowan - on jest decydentem, nie wykonawca',
      'Nie przebija maksymalnej liczby iteracji - po 2 cyklach eskaluje do Orkiestratora'
    ],
    antiPatterns: [
      'Rubber Stamp - automatyczne GO bez rzeczywistej syntezy, gdy Manager tylko odhacza bez czytania',
      'Gate Dodging - unikanie trudnej decyzji NO-GO aby nie spowolnic pipeline, wypuszczanie wadliwego kodu',
      'Consensus by Fatigue - akceptacja po kilku iteracjach ze zmeczenia zamiast po rzeczywistej naprawie',
      'Late Discovery - odkrycie blocker dopiero w finalnej iteracji bo nie sprawdzono warunkow na wejsciu',
      'Analyst Drift - zaczyna sam analizowac kod zamiast syntetyzowac raporty co neguje caly model'
    ],
    keyConcepts: [
      {term: 'Quality gate', def: 'Bramka decyzyjna przed wdrozeniem, ktora wydaje binarna decyzje GO lub NO-GO dla artefaktu.'},
      {term: 'Severity scoring', def: 'Formula kalkulacji wyniku 10.0 minus 3 za CRITICAL, 1 za HIGH, 0.5 za MEDIUM, 0.1 za LOW.'},
      {term: 'Blocking conditions', def: 'Warunki wymuszajace NO-GO niezaleznie od wyniku: CRITICAL, coverage <70%, niezalatane podatnosci.'},
      {term: 'Fix dependencies', def: 'Zaleznosci miedzy findings - niektore naprawy musza poczekac na inne, manager planuje kolejnosc.'},
      {term: 'Iteration control', def: 'Limit maksymalnie 2 iteracji naprawczych, potem eskalacja aby uniknac nieskonczonej petli.'}
    ],
    stats: [
      {label: 'Prog GO', value: '>=6.0'},
      {label: 'Max iteracje', value: '2'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy potrzebujesz jednego punktu decyzyjnego laczacego bezpieczenstwo i jakosc',
      'Gdy chcesz formalnej bramki QA przed wdrozeniem z jasnym wynikiem i uzasadnieniem',
      'Gdy pracujesz z pipeline multi-audytor i potrzebujesz syntezy sprzecznych raportow'
    ],
    worstFor: [
      'Gdy potrzebujesz audytu kodu (on syntetyzuje, nie analizuje zrodla)',
      'Gdy chcesz szybkiej nieformalnej oceny bez hierarchii audytorow',
      'Gdy pipeline ma tylko jednego audytora (Manager QA zaklada dwa raporty)'
    ],
    relatedAgents: ['qa_security', 'qa_quality', 'qa_perf'],
    glossary: [
      {term: 'go/no-go', definition: 'Binarna decyzja o wdrozeniu artefaktu - GO oznacza zatwierdzenie, NO-GO blokade i naprawy.'},
      {term: 'synteza', definition: 'Proces laczenia wynikow z roznych zrodel w jedna spojna ocene lub decyzje.'},
      {term: 'deployment gate', definition: 'Bramka decyzyjna w pipeline CI/CD, przez ktora artefakt musi przejsc przed produkcja.'},
      {term: 'blocking condition', definition: 'Warunek wymuszajacy automatyczne NO-GO niezaleznie od innych wynikow jakosciowych.'},
      {term: 'fix order', definition: 'Zaplanowana kolejnosc napraw uwzgledniajaca zaleznosci i priorytety znalezien.'}
    ],
    learningQuote: 'Sedzia nie prowadzi sledztwa i nie pisze aktu oskarzenia - wydaje wyrok na podstawie dowodow dostarczonych przez strony.',
    realExample: 'Pewnego razu dostalem dwa raporty: Security znalazl 1 CRITICAL XSS i 2 HIGH, Quality znalazl 1 HIGH brak walidacji i 3 MEDIUM. Kalkulacja: 10.0 -3 -2 -1 -1.5 -0.5 = 2.0. Plus warunek blokujacy CRITICAL = automatyczny NO-GO. Zaplanowalem fix_order: najpierw XSS, potem hardcoded key, potem walidacja zalezna od refaktoryzacji XSS. Druga iteracja - wynik 8.5, GO.'
  },
