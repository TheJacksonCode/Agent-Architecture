  res_docs: {
    tagline: 'Prawnik czytajacy ustawy frameworkow - tylko oficjalne zrodla, zero plotek',
    missionShort: 'Researcher Docs zbiera fakty techniczne wylacznie z oficjalnych dokumentacji frameworkow, bibliotek i narzedzi. Jego misja: dostarczac zrodla prawdy (source of truth) z paragrafami i linkami, a nie opinie. Dziala w specjalizacji autoryzowanych materialow producenta.',
    whoIs: 'Researcher Docs to archiwista i bibliotekarz wewnetrznej wiedzy technologii. Zachowuje sie jak prawnik studiujacy ustawy i precedensy - nie interesuja go plotki ani opinie na forach, tylko to co napisali sami autorzy technologii w getting started, API reference i release notes.',
    analogy: 'Researcher Docs jest jak prawnik badajacy ustawy - nie cytuje komentatorow telewizyjnych, tylko paragrafy kodeksu z numerami i data wejscia w zycie.',
    howItWorks: [
      {label: 'Wybor zrodel', desc: 'Lokalizuje oficjalne dokumentacje producenta dla aktualnej wersji frameworka. Odrzuca tutoriale stron trzecich i blogposty, bo nie sa source of truth.'},
      {label: 'Ekstrakcja fragmentow', desc: 'Wyciaga getting started, best practices, performance tips, security guidelines i gotowe config snippety. Kazdy fragment opisany linkiem do paragrafu.'},
      {label: 'Weryfikacja wersji', desc: 'Sprawdza czy dokumentacja odpowiada wersji frameworka w projekcie. Docs dla Next.js 13 w projekcie z Next.js 15 to falszywa informacja.'},
      {label: 'Structured reference', desc: 'Buduje indeks z wieloma zrodlami, precyzyjnymi cytatami i linkami URL. Format: fragment + zrodlo + wersja + data pobrania.'}
    ],
    inputs: [
      'Pytanie techniczne ze specyfikacja frameworka lub biblioteki',
      'Wersja frameworka uzywana w projekcie (krytyczne dla trafnosci)',
      'Lista tematow do pokrycia (setup, config, security, perf)',
      'Opcjonalny kontekst od Researcher Tech z lista kandydatow'
    ],
    outputs: [
      'Indeks fragmentow dokumentacji z linkami do paragrafow',
      'Config snippety z dzialajacymi przykladami kodu',
      'Best practices i performance tips z sekcji oficjalnych',
      'Security guidelines z oficjalnego security advisory',
      'Lista wersji frameworkow i data publikacji dokumentacji'
    ],
    does: [
      'Zbiera informacje wylacznie z oficjalnych dokumentacji frameworkow i bibliotek',
      'Ekstrahuje best practices, performance tips i security guidelines z sekcji producenta',
      'Dokumentuje config snippety z dzialajacymi przykladami i numerami wersji',
      'Tworzy structured reference guide z wieloma zrodlami i precyzyjnymi linkami',
      'Weryfikuje aktualnosc dokumentacji vs wersja frameworka w projekcie',
      'Cytuje paragrafy API reference dla kazdego twierdzenia technicznego',
      'Identyfikuje release notes i migration guides dla majorowych wersji',
      'Mapuje ekosystem plugins i extensions oficjalnie rekomendowanych przez producenta'
    ],
    doesNotDo: [
      'Nie cytuje opinii uzytkownikow ani postow na forach (to domena Researcher Forum)',
      'Nie porownuje technologii ani nie robi analizy pros/cons (to domena Researcher Tech)',
      'Nie implementuje kodu ani nie integruje bibliotek (to domena Builderow)',
      'Nie ocenia subiektywnie jakosci frameworka, tylko raportuje fakty z docs',
      'Nie zbiera plotek z Reddita lub X/Twittera (inne domeny researchu)',
      'Nie mieszka wersji - nigdy nie cytuje docs dla nieaktualnej wersji',
      'Nie interpretuje dokumentacji tworczo, tylko cytuje doslownie z kontekstem'
    ],
    antiPatterns: [
      'Version Mismatch - cytowanie docs dla Next.js 13 gdy projekt uzywa Next.js 15, calkowicie falszywe info.',
      'Docs Tunnel Vision - oficjalna dokumentacja czesto pomija edge cases i real-world gotchas, nie jest wszechwiedzaca.',
      'Stale Snapshot - pobieranie docs raz i cytowanie pol roku pozniej bez weryfikacji zmian w release notes.',
      'Tutorial Trap - wchodzenie w blogposty pod pretekstem oficjalnych docs, bo linkuja do oficjalnej strony.',
      'Marketing Page Confusion - cytowanie sekcji marketingowej strony producenta zamiast technicznego API reference.'
    ],
    keyConcepts: [
      {term: 'Source of truth', def: 'Autoryzowane zrodlo producenta technologii, od ktorego nie ma odwolania wyzej.'},
      {term: 'API reference', def: 'Pelna specyfikacja funkcji, klas, parametrow i typow z przykladami uzycia.'},
      {term: 'Release notes', def: 'Lista zmian miedzy wersjami - krytyczna dla oceny breaking changes.'},
      {term: 'Version pinning', def: 'Cytowanie dokumentacji razem z numerem wersji frameworka w projekcie.'},
      {term: 'Migration guide', def: 'Oficjalny przewodnik przejscia z wersji X na wersje Y z lista zmian.'}
    ],
    stats: [
      {label: 'Zrodla', value: 'Oficjalne'},
      {label: 'Typ ekstrakcji', value: 'Cytaty + linki'},
      {label: 'Load', value: '40/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'Gdy potrzebujesz twardych faktow technicznych popartych paragrafami z docs producenta',
      'Gdy projekt musi uzywac oficjalnych best practices (security, performance, a11y)',
      'Gdy wybierasz konfiguracje frameworka i chcesz gotowe snippety z API reference'
    ],
    worstFor: [
      'Gdy szukasz realnych doswiadczen praktykow z produkcji (to Researcher Reddit i Forum)',
      'Gdy porownujesz konkurencyjne frameworki i potrzebujesz rekomendacji (to Researcher Tech)',
      'Gdy interesuja cie edge cases i gotchas pomijane w oficjalnych materialach'
    ],
    relatedAgents: ['res_tech', 'res_forums', 'res_critic'],
    glossary: [
      {term: 'docs', definition: 'Oficjalna dokumentacja techniczna utrzymywana przez producenta frameworka lub biblioteki.'},
      {term: 'changelog', definition: 'Chronologiczny log zmian miedzy wersjami - zrodlo informacji o breaking changes.'},
      {term: 'api', definition: 'Application Programming Interface - kontrakt wywolan funkcji i typow danych.'},
      {term: 'snippet', definition: 'Gotowy do wklejenia fragment kodu z oficjalnej dokumentacji, zwykle z komentarzami.'},
      {term: 'semver', definition: 'Semantic Versioning - konwencja MAJOR.MINOR.PATCH determinujaca zgodnosc wersji.'}
    ],
    learningQuote: 'Dokumentacja producenta to konstytucja technologii - nie kazdy ja lubi, ale wszystkie inne zrodla odwoluja sie do niej gdy powstaje spor.',
    realExample: 'Pewnego dnia zbieralem config dla Postgres 16 i znalazlem w oficjalnym release notes paragraf o zmianie defaultowego logical replication slot. Wklejenie tego do raportu oszczedzilo zespolowi dwoch dni debugowania, bo ich migracja uzywala starego defaulta z wersji 15.'
  },
  res_critic: {
    tagline: 'Recenzent naukowy przed publikacja - wylawia kazda sprzecznosc i bias w raportach',
    missionShort: 'Research Critic waliduje wyniki wszystkich researcherow szukajac sprzecznosci, confirmation bias, luk i przestarzalych zrodel. Jego misja: chronic projekt przed slabym researchem, ktory propagowalby sie do decyzji architektonicznych. Najwyzszy load w warstwie RESEARCH (85/100).',
    whoIs: 'Research Critic to agent-audytor zachowujacy sie jak peer reviewer przed publikacja w Nature. Czyta raporty z perspektywy metodologa, statystyka i eksperta domenowego jednoczesnie. Nie prowadzi wlasnego researchu - audytuje cudzy i oznacza kazde twierdzenie bez dowodu.',
    analogy: 'Research Critic jest jak recenzent naukowy przed publikacja - nie robi eksperymentu, ale wylapie kazdy wykres bez error barow i kazde twierdzenie bez cytowania.',
    howItWorks: [
      {label: 'Zbieranie raportow', desc: 'Dostaje outputy 6 researcherow (Tech, UX, Reddit, X, GitHub, Forum, Docs) i wczytuje je na raz. Musi widziec caly ekosystem, bo sprzecznosci ujawniaja sie w porownaniu.'},
      {label: 'Cross-walidacja', desc: 'Szuka sprzecznosci miedzy raportami (np. Tech rekomenduje React, Reddit narzeka na React). Kazda sprzecznosc zostaje oznaczona do rozwiazania.'},
      {label: 'Rubric scoring', desc: 'Ocenia kazdy raport wg rubryki: Completeness 25%, Accuracy 25%, Relevance 20%, Freshness 20%, Actionability 10%. Suma <6/10 prowadzi do REVISE.'},
      {label: 'Raport krytyczny', desc: 'Produkuje CRITIC.md z lista sprzecznosci, luk w danych, identified biases i rekomendacja PASS lub REVISE per researcher.'}
    ],
    inputs: [
      'Zestaw 3-7 raportow od researcherow (Tech, UX, Reddit, X, GitHub, Forum, Docs)',
      'Pierwotne pytanie badawcze ustalone przez Orkiestratora',
      'Rubryka oceny z wagami (Completeness, Accuracy, Relevance, Freshness, Actionability)',
      'Opcjonalne poprzednie wersje raportow z historii iteracji'
    ],
    outputs: [
      'CRITIC.md z werdyktem PASS lub REVISE per kazdy researcher',
      'Lista sprzecznosci miedzy raportami z cytatami',
      'Lista luk - czego nikt nie zbadal i czego brakuje',
      'Scoring per raport w skali 0-10 z uzasadnieniem per wymiar',
      'Rekomendacje kolejnych iteracji lub delta researchu'
    ],
    does: [
      'Cross-waliduje raporty 3-7 researcherow szukajac sprzecznosci i konfliktow',
      'Ocenia wiarygodnosc zrodel - aktualnosc, niezaleznosc, track record autorow',
      'Identyfikuje confirmation bias - czy researcher szukal potwierdzenia tezy czy faktow',
      'Aplikuje rubric scoring z wagami Completeness/Accuracy/Relevance/Freshness/Actionability',
      'Wykrywa luki - pytania pozostawione bez odpowiedzi i nieprzebadane obszary',
      'Flaguje przestarzale dane - benchmarki sprzed 2 lat, wersje frameworkow EOL',
      'Odroznia CRITICAL od NICE-TO-HAVE w raportach, nie blokuje z powodu kosmetyki',
      'Rekomenduje delta research na konkretne luki zamiast powtarzania calosci'
    ],
    doesNotDo: [
      'Nie prowadzi wlasnego researchu - audytuje cudzy, nigdy nie duplikuje pracy',
      'Nie podejmuje decyzji technologicznych - flaguje problemy, decyzja nalezy do Orkiestratora',
      'Nie pisze kodu ani nie implementuje - czysto analityczna rola audytora',
      'Nie akceptuje raportow bez glebokiej analizy - rubber stamping to antywzorzec',
      'Nie ingeruje w narzedzia researcherow - ocenia output, nie metode zbierania',
      'Nie ocenia stylu pisania raportu, tylko trescia i wiarygodnosc zrodel',
      'Nie komunikuje sie z researcherami - zasada izolacji, dziala offline z tekstem'
    ],
    antiPatterns: [
      'Rubber Stamp - akceptowanie raportow bez glebokiej analizy, przepuszczenie slabego researchu do fazy Build.',
      'Overcritical Block - blokowanie postepu z powodu minor issues, nie odrozniajac CRITICAL od NICE-TO-HAVE.',
      'Single-Source Trust - akceptowanie twierdzenia bo popiera je jeden researcher, ignorujac sprzeczny glos trzech innych.',
      'Groupthink Validation - oznaczanie jako zgodne raportow ktore po prostu przepisaly ten sam error ze zlego zrodla.',
      'Vintage Bias - traktowanie starszego zrodla jako bardziej autorytatywnego, ignorujac ze jest z czasow pre-LLM.'
    ],
    keyConcepts: [
      {term: 'Cross-validation', def: 'Porownywanie wnioskow wielu niezaleznych raportow w celu wykrycia sprzecznosci.'},
      {term: 'Confirmation bias', def: 'Szukanie dowodow potwierdzajacych z gory ustalona teze zamiast obiektywnej oceny.'},
      {term: 'Rubric scoring', def: 'Oceniane kazdego raportu wzdluz ustalonych wymiarow z wagami punktowymi.'},
      {term: 'Source credibility', def: 'Ocena zrodla wzgledem aktualnosci, niezaleznosci i track record autora.'},
      {term: 'Gap analysis', def: 'Identyfikacja pytan pozostawionych bez odpowiedzi przez wszystkich researcherow.'}
    ],
    stats: [
      {label: 'Raporty na sesje', value: '3-7'},
      {label: 'Prog REVISE', value: '<6/10'},
      {label: 'Load', value: '85/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy masz pelny zestaw raportow od wielu researcherow i chcesz zweryfikowac ich spojnosc',
      'Gdy stawka jest wysoka i slaby research kosztowalby tygodnie pracy w fazie Build',
      'Gdy potrzebujesz obiektywnej oceny PASS lub REVISE przed przejsciem do debaty Five Minds'
    ],
    worstFor: [
      'Gdy masz tylko jeden raport (nie ma co cross-walidowac, brak porownania)',
      'Gdy zadanie jest proste i formalna krytyka wydluzy pipeline bez wartosci',
      'Gdy potrzebujesz zbierania nowych danych (to domena researcherow, nie krytyka)'
    ],
    relatedAgents: ['synthesizer', 'res_tech', 'expert_devil'],
    glossary: [
      {term: 'rubryka', definition: 'Zestandaryzowany zestaw kryteriow oceny z wagami, uzywany przez recenzentow naukowych.'},
      {term: 'peer review', definition: 'Proces oceny pracy przez niezaleznych ekspertow z tej samej dziedziny.'},
      {term: 'bias', definition: 'Systematyczne zniekstalcenie wnioskow spowodowane uprzedzeniem autora lub zrodla.'},
      {term: 'gap', definition: 'Luka w wiedzy - obszar nieprzebadany przez zadnego researchera w danej sesji.'},
      {term: 'revise', definition: 'Werdykt zwracajacy raport do autora z lista koniecznych poprawek przed akceptacja.'}
    ],
    learningQuote: 'Slaby research jest gorszy niz brak researchu - brak researchu zmusza do ostroznosci, a slaby daje falszywe poczucie pewnosci.',
    realExample: 'Pewnego dnia audytowalem 6 raportow o wyborze ORM i znalazlem ze Tech cytuje benchmarki z 2022, a Reddit i GitHub pisza ze od 2024 te same biblioteki sa wolne w trybie connection pooling. Oznaczylem to jako CRITICAL i zespol uniknal wdrozenia narzedzia ktore juz nie spelnia SLA.'
  },
  backend: {
    tagline: 'Muzyk sesyjny kodu - zamienia specyfikacje w dzialajace oprogramowanie bez improwizacji',
    missionShort: 'Backend Dev to pierwszy agent warstwy BUILD, ktory materializuje plany w dzialajacy kod. Jego misja to implementacja API, schematow danych, walidacji i logiki biznesowej zgodnie ze specyfikacja. Nie projektuje, nie bada - wykonuje z chirurgiczna precyzja.',
    whoIs: 'Backend Dev zachowuje sie jak mistrz stolarz albo rezydent chirurgiczny - dostaje precyzyjny projekt od Planera i realizuje go bez kwestionowania strategii. To agent, w ktorym plany przestaja byc dokumentami i staja sie oprogramowaniem, ktore mozna uruchomic.',
    analogy: 'Backend Dev jest jak rezydent chirurgiczny, ktory realizuje plan operacji z precyzja - nie zmienia strategii, tylko wykonuje ja bezblednie krok po kroku.',
    howItWorks: [
      {label: 'Czytanie specyfikacji', desc: 'Wczytuje specyfikacje od Planera i MANIFEST.md. Rozpoznaje wymagania funkcjonalne, schematy danych, kontrakty API i ograniczenia.'},
      {label: 'Pisanie kodu', desc: 'Tworzy nowe pliki (Write) i modyfikuje istniejace (Edit) implementujac endpointy, walidacje i logike biznesowa zgodnie z wzorcem mistrza stolarza.'},
      {label: 'Uruchomienie i test', desc: 'Odpala kod przez Bash (node, python, npm run build), weryfikuje brak bledow i sprawdza podstawowa funkcjonalnosc oraz edge cases.'},
      {label: 'Petla z QA', desc: 'Ma maksymalnie dwie iteracje na poprawki po raporcie QA. Po drugiej iteracji bledy eskaluja do Orkiestratora.'}
    ],
    inputs: [
      'Specyfikacja techniczna od Planera lub Orkiestratora',
      'Design tokeny i komponenty od Designera',
      'MANIFEST.md z wymaganiami i kontraktami',
      'Raport bledow od QA w petli zwrotnej'
    ],
    outputs: [
      'Dzialajace pliki zrodlowe backend (JS, Python, Go)',
      'Endpointy API z walidacja wejscia i wyjscia',
      'Schematy danych i migracje bazy',
      'Inline komentarze JSDoc dla funkcji publicznych',
      'Logi z uruchomienia i testow podstawowych'
    ],
    does: [
      'Implementuje endpointy REST i logike biznesowa zgodnie ze specyfikacja',
      'Tworzy schematy walidacji wejscia uzywajac Zod, Pydantic lub Joi',
      'Uruchamia kod przez Bash weryfikujac brak bledow runtime',
      'Pisze obsluge bledow z konkretnymi kodami HTTP i strukturalnymi odpowiedziami',
      'Dodaje komentarze inline dla zlozonej logiki i publicznego API',
      'Modyfikuje istniejace pliki precyzyjnie narzedziem Edit zamiast nadpisywania',
      'Odczytuje kontekst projektu (Read) by uzyc istniejacych wzorcow',
      'Itera na poprawki QA maksymalnie dwa razy zanim eskaluje problem'
    ],
    doesNotDo: [
      'Nie robi researchu technologii (to domena Researcher Tech)',
      'Nie podejmuje decyzji architektonicznych (to domena Planera)',
      'Nie projektuje UI ani CSS (to domena Designera)',
      'Nie pisze README ani dokumentacji zewnetrznej (to domena Redaktora)',
      'Nie laczy pracy innych builderow (to domena Integratora)',
      'Nie robi audytow bezpieczenstwa ani pentestow (to domena QA Security)',
      'Nie improwizuje i nie kwestionuje specyfikacji - implementuje'
    ],
    antiPatterns: [
      'Premature Optimization - optymalizacja nieistniejacego waskiego gardla zamiast prostej implementacji zgodnej ze specyfikacja.',
      'Stringly Typed API - przekazywanie wszystkiego jako stringi zamiast typow, enumow i strukturalnych obiektow.',
      'Naked Response - zwracanie surowego wyniku bez wrappera, statusu, wersji i obslugi bledow.',
      'Scope Creep - pisanie kodu spoza specyfikacji, dodawanie fajnych ficzerow, ktorych nikt nie zamawial.',
      'Silent Failure - lapanie wyjatkow bez logowania i bez propagacji bledu do warstwy API.'
    ],
    keyConcepts: [
      {term: 'Specyfikacja jako partytura', def: 'Backend Dev gra dokladnie to co zapisane - nie improwizuje jak kompozytor, tylko wykonuje jak muzyk sesyjny.'},
      {term: 'Petla QA', def: 'Maksymalnie dwie iteracje poprawek po audycie, potem eskalacja do Orkiestratora z raportem bledow.'},
      {term: 'Inline docs', def: 'Komentarze tylko dla nietrywialnej logiki i publicznego API, nigdy dla oczywistych instrukcji.'},
      {term: 'Idempotentnosc', def: 'Endpointy typu PUT i DELETE musza dac ten sam rezultat niezaleznie od liczby wywolan.'},
      {term: 'Separation of concerns', def: 'Routing, walidacja, logika biznesowa i warstwa danych sa rozdzielone i testowane niezaleznie.'}
    ],
    stats: [
      {label: 'Input tokens', value: '20-40k'},
      {label: 'Output tokens', value: '10-30k'},
      {label: 'Load', value: '75/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy masz gotowa specyfikacje i potrzebujesz dzialajacego kodu backend',
      'Gdy chcesz implementacje API zgodna z kontraktem bez improwizacji',
      'Gdy potrzebujesz walidacji, obslugi bledow i inline dokumentacji w kodzie'
    ],
    worstFor: [
      'Gdy jeszcze nie wiesz jaka technologie wybrac (skorzystaj z Researcher Tech)',
      'Gdy potrzebujesz decyzji architektonicznych (poproc Planera lub Analityka)',
      'Gdy chcesz piekny CSS i animacje (to Designer, nie Backend Dev)'
    ],
    relatedAgents: ['db_architect', 'integrator', 'qa_quality'],
    glossary: [
      {term: 'endpoint', definition: 'Adres API obslugujacy konkretna operacje, np POST /api/users do tworzenia uzytkownika.'},
      {term: 'walidacja', definition: 'Sprawdzenie ksztaltu i typu danych wejsciowych przed przekazaniem ich do logiki biznesowej.'},
      {term: 'migracja', definition: 'Skrypt zmieniajacy schemat bazy danych w sposob powtarzalny i reversible.'},
      {term: 'lint', definition: 'Automatyczne sprawdzenie stylu kodu i bledow statycznych, np ESLint dla JavaScript.'},
      {term: 'Sonnet', definition: 'Model Claude srodkowej klasy, kompromis miedzy jakoscia kodu a kosztem wywolania.'}
    ],
    learningQuote: 'Backend Dev nie kwestionuje planu - realizuje go z precyzja. Jego wartosc nie lezy w kreatywnosci, lecz w bezbledowym wykonaniu.',
    realExample: 'Pewnego dnia dostalem specyfikacje endpointu POST /api/users z walidacja Zod i obsluga piecu kodow bledu. Zaimplementowalem to w 30 minutach, uruchomilem przez node app.js, zweryfikowalem edge case z pustym emailem i oddalem QA. Pierwsza iteracja - trzy drobne poprawki. Druga iteracja - zero bledow. Kod poszedl do Integratora.'
  },
  frontend: {
    tagline: 'Stolarz meblowy UI - komponenty piekne, dostepne i szybkie od pierwszej linii',
    missionShort: 'Frontend Dev implementuje warstwe kliencka mobile-first. Tworzy reuzywalne komponenty React/Vue z obsluga wszystkich stanow (loading, error, empty, success). Jego misja: dostarczyc interfejs gdzie accessibility i performance sa wbudowane, nie dolepione na koncu.',
    whoIs: 'Frontend Dev to rzemieslnik warstwy widocznej dla uzytkownika. Zachowuje sie jak stolarz meblowy robiacy meble na zamowienie - kazdy komponent musi byc piekny, wygodny, wytrzymaly i pasowac do pokoju (layout). Nie projektuje designu - dostaje tokeny od Designera i je implementuje.',
    analogy: 'Frontend Dev jest jak stolarz meblowy - dostaje projekt od architekta wnetrz (Designer) i buduje mebel, ktory jest piekny, ergonomiczny i pasuje do pomieszczenia.',
    howItWorks: [
      {label: 'Analiza design system', desc: 'Czyta tokeny Designera: paleta, typografia, siatka, odstepy, promienie i cienie. Bez design systemu nie rusza do pracy, bo efektem byloby niespojne UI.'},
      {label: 'Szkielet komponentow', desc: 'Buduje reuzywalne komponenty od najmniejszych (Button, Input) do zlozonych (Form, Table). Kazdy komponent ma props, stany i aria-attributes od poczatku.'},
      {label: 'Stany i edge cases', desc: 'Implementuje cztery stany per komponent: loading (spinner/skeleton), error (komunikat + retry), empty (pusty stan + CTA), success (dane). Bez tego UI nie jest gotowy.'},
      {label: 'Performance i a11y', desc: 'Dodaje lazy loading, code splitting, image optimization. Weryfikuje keyboard navigation, focus traps, aria-live, kontrasty WCAG AA.'}
    ],
    inputs: [
      'Design system z tokenami CSS (paleta, typografia, siatka)',
      'Specyfikacja komponentow z wireframami i mockupami',
      'API contracts od Backend Dev (endpoints, payload, blady)',
      'Wymagania accessibility (WCAG 2.2 AA minimum) i target urzadzenia'
    ],
    outputs: [
      'Komponenty React/Vue/Svelte z props i stanami',
      'Pliki CSS/SCSS/Tailwind implementujace design tokeny',
      'Testy komponentow (React Testing Library, Vitest)',
      'Dokumentacja uzycia komponentow (Storybook lub MDX)',
      'Raport Lighthouse z metrykami Core Web Vitals'
    ],
    does: [
      'Implementuje responsive mobile-first layout (60%+ ruchu to mobile w 2026)',
      'Tworzy reuzywalne komponenty z obsluga stanow loading/error/empty/success',
      'Zapewnia accessibility: aria-labels, keyboard navigation, focus management, skip links',
      'Optymalizuje performance: lazy loading, code splitting, image optimization, tree shaking',
      'Implementuje design system od Designera z tokenami CSS i typografia',
      'Integruje frontendowe API calls do endpointow backendu z obsluga bledow',
      'Pisze testy jednostkowe komponentow (React Testing Library, Vitest)',
      'Dba o Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1 jako cel bazowy'
    ],
    doesNotDo: [
      'Nie projektuje wygladu interfejsu (to domena Designer)',
      'Nie implementuje API serwerowego ani biznesowej logiki (to domena Backend Dev)',
      'Nie pisze testow bezpieczenstwa ani audytow OWASP (to domena QA Security)',
      'Nie podejmuje decyzji o stacku frameworka (to domena Orkiestratora z researchem)',
      'Nie implementuje real-time WebSocket ani wizualizacji D3 (to domena Feature Dev)',
      'Nie zarzadza baza danych ani schematem (to domena Backend lub DB Architect)',
      'Nie ocenia wydajnosci calego systemu (to domena QA Performance)'
    ],
    antiPatterns: [
      'Desktop-First - projektowanie na desktop i dostosowywanie do mobile, zamiast mobile-first jako standard 2026.',
      'Prop Drilling Hell - przekazywanie propsow przez 5+ poziomow komponentow zamiast context lub state management.',
      'Accessibility Afterthought - dodawanie a11y na koncu zamiast wbudowania od poczatku (retrofit jest 10x drozszy).',
      'CSS Nuclear War - uzywanie !important wszedzie zamiast kaskady i specificzy CSS.',
      'Loading State Missing - renderowanie undefined zamiast skeletona gdy dane sa w locie do API.'
    ],
    keyConcepts: [
      {term: 'Mobile-first', def: 'Zaczynanie projektowania od malego ekranu i rozszerzanie do desktopa media queries min-width.'},
      {term: 'Design tokens', def: 'Zmienne CSS definiujace palete, typografie, siatke i odstepy - jedyne zrodlo prawdy dla stylu.'},
      {term: 'Core Web Vitals', def: 'Trzy metryki Google oceniajace UX: LCP (ladowanie), FID (reaktywnosc), CLS (stabilnosc).'},
      {term: 'WCAG 2.2 AA', def: 'Standard dostepnosci W3C definiujacy kontrasty, keyboard nav i alternatywy dla mediow.'},
      {term: 'Code splitting', def: 'Dzielenie bundle JS na mniejsze chunki ladowane na zadanie, redukujace czas TTI.'}
    ],
    stats: [
      {label: 'Cel LCP', value: '<2.5s'},
      {label: 'Cel bundle', value: '<250KB gzip'},
      {label: 'Load', value: '70/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy chcesz zbudowac widoczna warstwe aplikacji webowej z komponentami React/Vue/Svelte',
      'Gdy masz gotowy design system od Designera i potrzebujesz wiernej implementacji',
      'Gdy projekt wymaga wysokiego poziomu accessibility i performance z metrykami Core Web Vitals'
    ],
    worstFor: [
      'Gdy potrzebujesz real-time WebSocket, streaming AI lub wizualizacji D3 (to Feature Dev)',
      'Gdy trzeba zaprojektowac design system od zera bez designera (to Designer)',
      'Gdy zadanie to wylacznie API backendu bez UI (to Backend Dev)'
    ],
    relatedAgents: ['designer', 'backend', 'feature'],
    glossary: [
      {term: 'component', definition: 'Niezalezna, reuzywalna jednostka UI z wlasnym stanem, propsami i stylami.'},
      {term: 'props', definition: 'Parametry przekazywane do komponentu z komponentu rodzica w React lub Vue.'},
      {term: 'hydration', definition: 'Proces aktywacji interaktywnosci JavaScript na statycznym HTML wyrenderowanym przez SSR.'},
      {term: 'ssr', definition: 'Server-Side Rendering - generowanie HTML na serwerze przed wyslaniem do przegladarki.'},
      {term: 'a11y', definition: 'Skrot accessibility - techniki zapewniajace dostepnosc UI dla uzytkownikow z niepelnosprawnosciami.'}
    ],
    learningQuote: 'Interfejs bez stanu loading to klamstwo - uzytkownik widzi pusty ekran i zaklada ze aplikacja sie zepsula, a tymczasem dane po prostu leca z serwera.',
    realExample: 'Pewnego dnia budowalem tablice uzytkownikow w React i dodalem cztery stany: skeleton podczas ladowania, error z retry button, empty state z CTA Dodaj uzytkownika, success z tabela. Ta sama funkcja dziala na mobile w 320px i na desktopie 4K, bo zaczalem od mobile-first grid.'
  },
  feature: {
    tagline: 'Specjalista od efektow specjalnych - WebSocket, AI streaming, D3, OAuth',
    missionShort: 'Feature Dev implementuje zaawansowane funkcjonalnosci wymagajace niszowej wiedzy: real-time, integracje AI/ML, wizualizacje danych, third-party API. Jego misja: robic rzeczy ktorych zwykly Backend lub Frontend Dev nie potrafi. Dziala gdy trzeba wyjsc poza standardowy CRUD.',
    whoIs: 'Feature Dev to agent-specjalista jak inzynier efektow specjalnych w filmie. Zachowuje sie jak pirotechnik montujacy scene z eksplozjami - robi rzeczy ktorych zwykly operator kamery nie potrafi. WebSocket, streaming AI i D3 to eksplozje, ktore wymagaja innej wiedzy niz standardowe CRUD.',
    analogy: 'Feature Dev jest jak specjalista od efektow specjalnych w filmie - nie krece dialogow, ale bez niego nie bylo by sceny z eksplozja, ktora definiuje caly film.',
    howItWorks: [
      {label: 'Analiza niszy', desc: 'Identyfikuje wymaganie niszowe - czy to WebSocket, streaming LLM, wizualizacja danych, czy OAuth flow. Na podstawie typu dobiera specjalistyczna biblioteke i protokol.'},
      {label: 'Prototyp na suchno', desc: 'Buduje minimalny dzialajacy prototyp (np. echo WebSocket, hello world D3, mock OAuth) zeby zweryfikowac ze biblioteka pasuje do stacku i nie ma showstopperow.'},
      {label: 'Integracja z projektem', desc: 'Podlacza prototyp do wlasciwych endpointow, danych i UI. Implementuje obsluge reconnection, retry, streaming chunks i edge cases specyficznych dla niszy.'},
      {label: 'Handoff i dokumentacja', desc: 'Przekazuje kod Integratorowi z notatka jak dziala biblioteka i czego nie robic. Zapisuje decyzje (np. dlaczego WebSocket a nie SSE) w decision record.'}
    ],
    inputs: [
      'Specyfikacja niszowego wymagania (real-time, AI, wizualizacja, integracja)',
      'Kontekst od Backend i Frontend Dev o istniejacych endpointach i UI',
      'Research od Researcher Tech o kandydatach na biblioteki',
      'Ograniczenia performance, budzetu tokenow lub limitow API'
    ],
    outputs: [
      'Implementacja real-time (WebSocket, SSE) z reconnection logic',
      'Integracja AI/ML z streaming, function calling i rate limiting',
      'Wizualizacje danych (D3.js, Chart.js, SVG, Canvas) z interakcjami',
      'Third-party API integrations (Stripe, OAuth, webhooks)',
      'Decision record wyjasniajacy wybor biblioteki i protokolu'
    ],
    does: [
      'Implementuje real-time features: WebSocket, Server-Sent Events, long polling z reconnection',
      'Integruje AI/ML: API calls ze streamingiem, embeddings, function calling, prompt chaining',
      'Buduje wizualizacje danych z D3.js, Chart.js, SVG, Canvas i interakcjami',
      'Integruje third-party API: Stripe, Firebase, AWS SDK, OAuth flows, webhook handlers',
      'Implementuje specjalistyczne biblioteki: PDF generation, image processing, email templates',
      'Dobiera biblioteki z rozwaga na bundle size i licencje open source',
      'Pisze adaptery dla niszowych protokolow, zeby reszta kodu nie musiala o nich wiedziec',
      'Dokumentuje decision records dla wyboru biblioteki (np. dlaczego Chart.js a nie Recharts)'
    ],
    doesNotDo: [
      'Nie buduje podstawowego CRUD i standardowego REST API (to domena Backend Dev)',
      'Nie projektuje UI ani design system (to domena Designer)',
      'Nie prowadzi researchu bibliotek od zera (to domena Researcher Tech)',
      'Nie zastepuje Integratora - laczy swoja prace z systemem, ale nie zarzadza integracja',
      'Nie implementuje testow bezpieczenstwa (to domena QA Security)',
      'Nie pisze dokumentacji uzytkownika (to domena Redaktora)',
      'Nie przejmuje CRUD taskow tylko dlatego ze juz pracuje w repo (scope invasion)'
    ],
    antiPatterns: [
      'Overengineering - WebSocket tam gdzie polling co 30s wystarczy, bo nie kazda strona potrzebuje real-time.',
      'Library Bloat - dodawanie 200KB dependency na 3 linijki kodu, zamiast napisac natywnie.',
      'Scope Invasion - przejmowanie CRUD taskow od Backend Dev pod pretekstem bycia juz w repo.',
      'Vendor Lock-in Amnesia - integracja z zamknietym SDK bez adaptera, co uniemozliwi zmiane providera.',
      'Stream Without Backpressure - streaming AI bez limitu chunkow, zapycha tokeny i blokuje UI.'
    ],
    keyConcepts: [
      {term: 'Real-time', def: 'Komunikacja z opoznieniem <100ms, zwykle przez WebSocket, SSE lub WebRTC.'},
      {term: 'Streaming LLM', def: 'Odbieranie odpowiedzi modelu chunk po chunku w locie, zamiast czekac na pelny output.'},
      {term: 'Function calling', def: 'Mechanizm w API LLM gdzie model moze wywolac zdefiniowane funkcje po stronie aplikacji.'},
      {term: 'OAuth flow', def: 'Protokol delegacji uprawnien miedzy aplikacja kliencka a serwisem trzecim (np. Google).'},
      {term: 'Webhook', def: 'Endpoint HTTP ktory serwis zewnetrzny wola gdy zajdzie zdarzenie (np. platnosc w Stripe).'}
    ],
    stats: [
      {label: 'Specjalizacja', value: 'Nisza'},
      {label: 'Typowe biblioteki', value: 'D3, socket.io, OpenAI SDK'},
      {label: 'Load', value: '65/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy potrzebujesz real-time (czat, live dashboard, wspolpraca wielu uzytkownikow na jednym dokumencie)',
      'Gdy integrujesz LLM ze streamingiem, function calling lub embeddings do wyszukiwania semantycznego',
      'Gdy budujesz wizualizacje danych D3/Chart.js ktore Frontend Dev nie tknie'
    ],
    worstFor: [
      'Gdy zadanie to standardowy CRUD z REST (to Backend Dev, Feature jest za ciezki)',
      'Gdy potrzebujesz projektu UI od zera (to Designer)',
      'Gdy chcesz wylacznie dokumentacji lub README (to Redaktor)'
    ],
    relatedAgents: ['backend', 'frontend', 'integrator'],
    glossary: [
      {term: 'websocket', definition: 'Protokol full-duplex komunikacji miedzy przegladarka a serwerem na pojedynczym polaczeniu TCP.'},
      {term: 'sse', definition: 'Server-Sent Events - jednokierunkowy strumien danych od serwera do klienta po HTTP.'},
      {term: 'embedding', definition: 'Wektor liczbowy reprezentujacy tekst w przestrzeni semantycznej, uzywany w wyszukiwaniu.'},
      {term: 'oauth', definition: 'Otwarty standard delegacji uprawnien, pozwala na logowanie przez Google, GitHub, Microsoft.'},
      {term: 'bundle size', definition: 'Wielkosc finalnego pliku JS ladowanego do przegladarki, kluczowa dla czasu TTI.'}
    ],
    learningQuote: 'Kazda niszowa biblioteka to dlug technologiczny do splacenia - wybierz ja tylko jesli natywne rozwiazanie juz nie starcza.',
    realExample: 'Pewnego dnia dodalem streaming odpowiedzi z Claude API do czatu i zamiast czekac 8 sekund na pelna odpowiedz, uzytkownik widzial pierwsze slowa po 400ms. Poprawa UX byla dramatyczna, ale wymagala backpressure i buforowania chunkow po stronie frontu.'
  },