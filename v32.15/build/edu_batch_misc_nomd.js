// Batch: misc no-md (res_docs, res_critic, frontend, feature, qa_perf, decision_presenter)
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
  qa_perf: {
    tagline: 'Inzynier dynamometru - mierzy bottlenecki zamiast zgadywac co jest wolne',
    missionShort: 'QA Performance audytuje wydajnosc calego stacku: response time, bundle size, memory leaks, query performance, Core Web Vitals. Jego misja: dostarczyc twarde metryki i konkretne rekomendacje optymalizacji. Nie naprawia sam, raportuje do Orkiestratora z numerami.',
    whoIs: 'QA Performance to jedyny agent skupiony wylacznie na metrykach wydajnosci. Zachowuje sie jak inzynier F1 mierzacy czasy okrazen albo tuningujacy silnik na dynamometrze - zna kazdy parametr, wie co ogranicza osiagi, ale nie naprawia. Daje diagnoze mechanikowi (Kodera).',
    analogy: 'QA Performance jest jak inzynier F1 z dynamometrem - mierzy moc, moment obrotowy i temperature, wie dokladnie ktora czesc silnika ogranicza wydajnosc, ale sam nie trzyma klucza.',
    howItWorks: [
      {label: 'Baseline pomiarow', desc: 'Zbiera pierwotne metryki: response time endpointow, bundle size, Lighthouse scores, Core Web Vitals. Bez baseline nie wiadomo co poprawiac ani czy poprawilo sie w ogole.'},
      {label: 'Identyfikacja bottlenecka', desc: 'Profiluje stack w poszukiwaniu najwolniejszego ogniwa - wolny endpoint, duze chunki JS, N+1 queries, memory leak. Regula 80/20: 20% kodu ciagnie 80% opoznien.'},
      {label: 'Rekomendacje z numerami', desc: 'Formuluje konkretne rekomendacje: zmniejsz bundle z 480KB do 250KB, dodaj indeks na users.email, lazy loaduj image gallery. Kazda rekomendacja z szacowana oszczednoscia.'},
      {label: 'Raport z priorytetami', desc: 'Oddaje perf-report.md do Manager QA z priorytetami CRITICAL/MAJOR/MINOR. Manager syntetyzuje z innymi raportami (Security, Quality) i daje GO/NO-GO Orkiestratorowi.'}
    ],
    inputs: [
      'Aktualna implementacja kodu od Builderow (backend + frontend)',
      'Cele SLA - akceptowalne response time, bundle size, Core Web Vitals',
      'Dostep do srodowiska testowego z reprezentatywnymi danymi',
      'Narzedzia pomiarowe: Lighthouse, k6, Chrome DevTools, EXPLAIN ANALYZE'
    ],
    outputs: [
      'Perf-report.md z metrykami response time, bundle, memory, queries',
      'Lighthouse score i raport Core Web Vitals (LCP, FID, CLS)',
      'Lista bottleneckow z priorytetami CRITICAL/MAJOR/MINOR',
      'Rekomendacje optymalizacji z szacowana oszczednoscia',
      'Benchmark porownawczy przed i po (gdy dostepny)'
    ],
    does: [
      'Mierzy response time endpointow i identyfikuje wolne API (>200ms to red flag)',
      'Analizuje bundle size i weryfikuje tree shaking, dead imports, niepotrzebne deps',
      'Sprawdza memory leaks: event listenery, closures, detached DOM nodes',
      'Audytuje Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1',
      'Analizuje query performance: N+1 queries, brakujace indeksy, niepotrzebne JOINy',
      'Profiluje CPU i pamiec pod obciazeniem z narzedziami k6, Artillery, Lighthouse',
      'Mierzy Time to Interactive i First Contentful Paint dla frontendu',
      'Formuluje rekomendacje z numerami: szacowana oszczednosc i priorytet CRITICAL/MAJOR/MINOR'
    ],
    doesNotDo: [
      'Nie naprawia problemow wydajnosci (raportuje, Orkiestrator odsyla do Kodera)',
      'Nie sprawdza bezpieczenstwa ani OWASP Top 10 (to domena QA Security)',
      'Nie ocenia jakosci kodu ani architektury (to domena QA Quality)',
      'Nie podejmuje decyzji GO/NO-GO (to domena Manager QA syntetyzujacego wszystkie raporty)',
      'Nie optymalizuje przedwczesnie bez pomiarow (premature optimization to antywzorzec)',
      'Nie testuje wylacznie na dev srodowisku z SSD i 64GB RAM (to nie real users)',
      'Nie rekomenduje zmian bez szacowanej oszczednosci (wszystko musi byc w liczbach)'
    ],
    antiPatterns: [
      'Premature Optimization - optymalizowanie zanim zbierzesz metryki, bez danych nie wiesz co jest wolne.',
      'Synthetic-Only - testowanie tylko na devowym sprzecie z SSD, real users maja 4G i stary telefon.',
      'Micro-Benchmark Obsession - optymalizowanie operacji trwajacej 0.1ms zamiast bottlenecka trwajacego 2s.',
      'Benchmark Without Baseline - pokazywanie ze cos jest szybkie bez porownania do stanu sprzed zmiany.',
      'Ignoring P95 - raportowanie wylacznie sredniej, ignorujac ze p95 latency jest 10x gorsze niz mean.'
    ],
    keyConcepts: [
      {term: 'Core Web Vitals', def: 'Trzy metryki Google: LCP (ladowanie), FID (reaktywnosc), CLS (stabilnosc layoutu).'},
      {term: 'P95 latency', def: 'Latencja ktora 95% zapytan nie przekracza - znacznie lepsza miara niz srednia.'},
      {term: 'Bundle size', def: 'Wielkosc finalnego pliku JS po minifikacji i gzipie, kluczowa dla czasu TTI.'},
      {term: 'N+1 queries', def: 'Antywzorzec gdzie dla kazdego wiersza z listy robimy dodatkowy query do bazy.'},
      {term: 'Memory leak', def: 'Pamiec rezerwowana i nigdy nie zwalniana, stopniowo zapychajaca aplikacje.'}
    ],
    stats: [
      {label: 'API red flag', value: '>200ms'},
      {label: 'Bundle cel', value: '<250KB gzip'},
      {label: 'Load', value: '45/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'Gdy uzytkownicy zglaszaja wolne ladowanie aplikacji i nie wiadomo co jest bottleneckiem',
      'Gdy bundle rosnie ponad 250KB i Lighthouse score spada ponizej 90',
      'Gdy trzeba zweryfikowac ze deployment nie wprowadzil regresji wydajnosci'
    ],
    worstFor: [
      'Gdy problemem jest bezpieczenstwo lub podatnosci OWASP (to QA Security)',
      'Gdy chcesz audytu jakosci kodu i czytelnosci (to QA Quality)',
      'Gdy nie masz jeszcze zaimplementowanego kodu do zmierzenia (to builderzy pierwsi)'
    ],
    relatedAgents: ['qa_quality', 'qa_security', 'qa_manager'],
    glossary: [
      {term: 'lighthouse', definition: 'Narzedzie Google mierzace performance, accessibility, SEO i best practices strony.'},
      {term: 'lcp', definition: 'Largest Contentful Paint - czas wyrenderowania najwiekszego elementu widocznego w viewport.'},
      {term: 'cls', definition: 'Cumulative Layout Shift - miara stabilnosci layoutu, niska wartosc oznacza brak skakania elementow.'},
      {term: 'k6', definition: 'Narzedzie load testingu pozwalajace symulowac tysiace uzytkownikow pod obciazeniem.'},
      {term: 'flamegraph', definition: 'Wizualizacja profilera CPU pokazujaca ktore funkcje zajmuja ile czasu.'}
    ],
    learningQuote: 'Bez metryk kazda optymalizacja jest zgadywaniem - mierz przed zmiana, mierz po zmianie, i nigdy nie wierz intuicji ze wiesz co jest wolne.',
    realExample: 'Pewnego dnia audytowalem API listy zamowien i zauwazylem p95 latency 2.3s podczas gdy srednia byla 180ms. Okazalo sie ze pojedynczy endpoint robil N+1 query do tabeli produktow - 800 zapytan dla jednego requesta. Dodanie joina zbilo p95 do 140ms i Lighthouse score wrocil z 72 do 94.'
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
