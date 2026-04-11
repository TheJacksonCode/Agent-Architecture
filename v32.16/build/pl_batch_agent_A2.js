  res_ux: {
    tagline: 'Kurator cyfrowej galerii - mood board z 5 zrodel zamiast kopii z Dribbble',
    missionShort: 'Researcher UX przeszukuje Dribbble, Behance, Awwwards, Mobbin i oficjalne design systemy w poszukiwaniu trendow wizualnych, wzorcow interakcji i standardow dostepnosci. Jego misja: dostarczac syntetyzowany mood board z minimum 5 referencji i audyt WCAG zamiast plagiatowania jednego designu.',
    whoIs: 'Researcher UX to kurator galerii sztuki polaczony ze zwiadowca trendow modowych. Chodzi po cyfrowych wystawach, wybiera najlepsze prace i tworzy mood board - ale sam nie maluje obrazu. Jego unikalna nisza to odpowiedz na pytanie jak powinno wygladac i dzialac, podczas gdy Tech odpowiada jak to zbudowac.',
    analogy: 'Researcher UX to interior designer w fazie inspiracji - jezdzi na targi, fotografuje hole hotelowe, zbiera probki tkanin i wraca z mood boardem, na ktorym malarz oprze swoja prace.',
    howItWorks: [
      {label: 'Brief wizualny', desc: 'Odbiera brief z targetem, tonem komunikacji i ograniczeniami. Filtruje trendy pod kontem kontekstu projektu, zeby nie zebrac wszystkiego co modne.'},
      {label: 'Przeszukiwanie platform', desc: 'WebSearch po Dribbble, Behance, Awwwards, Mobbin plus oficjalne design systemy (Material, HIG, WCAG). Rozroznia koncepty od produkcji.'},
      {label: 'Synteza mood boardu', desc: 'Grupuje znaleziska w kategorie (kolory, typografia, layout, animacje, a11y) i wyciaga wzorce - gdy 7 z 10 stron uzywa bento grida, to wzorzec nie moda.'},
      {label: 'Audyt WCAG', desc: 'Dla kazdej palety sprawdza kontrast minimum 4.5:1, dla animacji prefers-reduced-motion, dla targetow dotykowych minimum 44x44 px. Flaguje problemy zamiast ignorowac.'}
    ],
    inputs: [
      'Brief projektu z targetem i tonem komunikacji',
      'Kategoria produktu (dashboard, e-commerce, edukacyjny)',
      'Tryby wymagane (dark/light, mobile/desktop breakpointy)',
      'Kontekst kulturowy i rynek docelowy'
    ],
    outputs: [
      'Mood board minimum 5 referencji z linkami i kategoriami',
      'Paleta kolorow primary/secondary/accent z wartosciami hex i kontrastem',
      'Rekomendacja typografii (heading/body/mono) ze skala rozmiarow',
      'Spacing system bazowany na siatce 4 px lub 8 px',
      'Audyt WCAG z flagami dostepnosci i specyfikacja animacji'
    ],
    does: [
      'Przeszukuje Dribbble, Behance, Awwwards, Mobbin w poszukiwaniu wzorcow',
      'Buduje mood board z minimum 5 referencji (sinteza, nie kopia)',
      'Analizuje oficjalne design systemy (Material, HIG, Fluent, Tailwind UI)',
      'Sprawdza kontrast WCAG 4.5:1 dla tekstu i 3:1 dla duzego tekstu',
      'Rozroznia koncepty Dribbble od produkcyjnych przykladow z Mobbin',
      'Flaguje trendy ktore odchodza (neumorphism umarl w 2024)',
      'Uwzglednia kontekst kulturowy kolorow i typografii',
      'Dostarcza rekomendacje dark mode i light mode rownolegle'
    ],
    doesNotDo: [
      'Nie pisze CSS ani tokenow - to rola Designera w fazie Build',
      'Nie czyta oficjalnej dokumentacji frameworkow (to domena res_tech)',
      'Nie projektuje wireframeow ani layoutow (to rola Designera)',
      'Nie uruchamia testow Lighthouse ani a11y (to rola QA Quality)',
      'Nie kopiuje jednego shotu z Dribbble - zawsze syntetyzuje z 5+',
      'Nie ignoruje mobile - mood board wymaga 2+ breakpointow',
      'Nie ma dostepu do Write/Edit/Bash - tylko WebSearch i WebFetch'
    ],
    antiPatterns: [
      'Trend Chaser - zbieranie kazdego modnego trendu bez filtrowania pod kontekst projektu, raport wewnetrznie sprzeczny',
      'No Accessibility - piekne palety z kontrastem 2:1, brak prefers-reduced-motion, lamanie European Accessibility Act',
      'Style Over Substance - rekomendowanie ciezkich animacji 3D ktore zabijaja performance na sredniej klasy Androidzie',
      'Missing Responsive - mood board wylacznie desktop 1440 px, brak referencji dla 375 px mobile',
      'Single Source Worship - caly mood board oparty o jeden shot z Dribbble, to plagiat z dodatkowym krokiem'
    ],
    keyConcepts: [
      {term: 'Mood board', def: 'Tablica inspiracji z min 5 referencji z roznych zrodel umozliwiajaca sinteze zamiast kopiowania jednego designu.'},
      {term: 'WCAG 2.2 AA', def: 'Standard dostepnosci wymuszajacy kontrast 4.5:1, touch targets 24x24 px minimum, prefers-reduced-motion i focus visible.'},
      {term: 'European Accessibility Act', def: 'Regulacja UE obowiazujaca od 28 czerwca 2025 wymagajaca zgodnosci cyfrowych produktow z WCAG - dostepnosc to obowiazek prawny.'},
      {term: 'Koncept vs produkcja', def: 'Dribbble zawiera koncept shots niezbudowane, Mobbin zawiera prawdziwe produkcyjne screeny - oba wymagaja oznaczenia w raporcie.'},
      {term: 'Mobile-first', def: 'Zasada projektowania od najmniejszego ekranu do najwiekszego - 60%+ ruchu pochodzi z mobile, desktop to dodatek.'}
    ],
    stats: [
      {label: 'Min. referencji', value: '5 zrodel'},
      {label: 'Kontrast WCAG', value: '4.5:1 tekst'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'Gdy potrzebujesz mood boardu z trendow 2026 a nie kopii jednego shotu',
      'Gdy chcesz audyt WCAG 2.2 z konkretnymi liczbami kontrastu',
      'Gdy projekt celuje w dark mode i light mode rownolegle z palette per tryb'
    ],
    worstFor: [
      'Gdy potrzebujesz implementacji CSS i tokenow (to rola Designera w Build)',
      'Gdy szukasz benchmarkow technologii lub frameworkow (to domena res_tech)',
      'Gdy musisz uruchomic realny test Lighthouse lub axe (to rola QA Quality)'
    ],
    relatedAgents: ['res_tech', 'designer', 'res_critic'],
    glossary: [
      {term: 'dribbble', definition: 'Platforma z shotami designerow - swietne dla trendow, ale wiele to koncepty nigdy nie wdrozone.'},
      {term: 'behance', definition: 'Portfolio Adobe wymagajace kompletnych case study - pokazuje proces projektowy nie tylko efekt.'},
      {term: 'awwwards', definition: 'Serwis nagradzajacy najlepsze strony - stan sztuki web designu oceniany przez jurorow.'},
      {term: 'mobbin', definition: 'Baza realnych produkcyjnych screenow aplikacji - ground truth zamiast konceptow z Dribbble.'},
      {term: 'wcag', definition: 'Web Content Accessibility Guidelines - standard W3C z wymogami kontrastu, nawigacji klawiaturowej i ARIA.'}
    ],
    learningQuote: 'Piec referencji to synteza, jedna to plagiat z dodatkowym krokiem - Researcher UX nie kopiuje ladnych obrazkow, on destyluje wzorce.',
    realExample: 'Pewnego dnia zbudowalem mood board dla strony edukacyjnej o agentach AI. Znalazlem ze 7 z 10 nagrodzonych stron na Awwwards Q1 2026 uzywa bento grida z ciemnym motywem i Space Grotesk - to byl wzorzec. Oznaczylem kontrast 4.6:1 na proponowanej palecie i zespol dostal gotowy kierunek zamiast rozpraszajacych opcji.'
  },
  res_reddit: {
    tagline: 'Etnograf cyfrowych plemion - tlumacz pasji i frustracji uzytkownikow na insighty produktowe',
    missionShort: 'Researcher Reddit przeszukuje anonimowe platformy dyskusyjne w poszukiwaniu niefiltrowanych opinii developerow. Jego misja: dostarczac ground truth - rzeczywiste doswiadczenia praktykow, nie marketingowe obietnice. Dziala w specjalizacji opinii spolecznosci.',
    whoIs: 'Researcher Reddit to agent AI, ktory zachowuje sie jak antropolog badajacy plemiona developerow. Siedzi w cyfrowych tavernach (subreddity takie jak r/webdev, r/programming), slucha dyskusji bez filtra i wyciaga z nich rzeczywiste bolaczki praktykow.',
    analogy: 'Researcher Reddit to tajemniczy klient w sklepie technologicznym - nie czyta broszur sprzedawcy, tylko siada przy kawie z innymi klientami i slucha co im sie nie podoba na produktach ktore kupili.',
    howItWorks: [
      {label: 'Wybor subredditow', desc: 'Identyfikuje relevantne subreddity (r/webdev, r/programming, r/reactjs, r/SaaS, r/devops) i formuluje precyzyjne zapytania z operatorem site:reddit.com.'},
      {label: 'Czytanie watkow', desc: 'Priorytetyzuje watki z duzymi liczba komentarzy i gilded postami. Czyta pelne dyskusje, nie tylko tytuly, bo wartosc lezy w komentarzach.'},
      {label: 'Wzorce i sentyment', desc: 'Wyodrebnia sentymenty (POSITIVE, NEGATIVE, MIXED, SHIFTING) i szuka wzorcow - gdy ten sam problem pojawia sie w 5+ watkach, to wzorzec, nie anegdota.'},
      {label: 'Raport JSON', desc: 'Formatuje raport z TOP 10 insightami, linkami, upvote_range i confidence scores. Dodaje sekcje Patterns, Controversies i Gaps.'}
    ],
    inputs: [
      'Pytanie badawcze (np. Jaki framework multi-agent preferuje spolecznosc Reddit)',
      'Kluczowe slowa technologiczne do wyszukiwania',
      'Czasami poprzedni raport badawczy w celu iteracji',
      'Opcjonalny kontekst z innych agentow (zwykle brak - zasada izolacji)'
    ],
    outputs: [
      'Ustrukturyzowany raport JSON z TOP 10 insightami',
      'Kazdy insight z sentiment, frequency i reprezentatywnymi cytatami',
      'Linki zrodlowe (reddit.com/r/... URLs) i upvote range',
      'Sekcje Patterns Detected, Controversies i Gaps',
      'Confidence scores 0.0-1.0 dla kazdego findingu'
    ],
    does: [
      'Znajduje niefiltrowane, szczere opinie developerow dzieki anonimowosci',
      'Identyfikuje ukryte problemy pomijane w dokumentacji',
      'Detektuje trendy poprzez wzorce (10 osob niezaleznie raportuje ten sam problem)',
      'Zbiera rekomendacje stacku od ludzi z realnym doswiadczeniem',
      'Wyodrebia trade-offy z flamewarow (React vs Vue itd)',
      'Weryfikuje spolecznosc poprzez glosy (upvotes = crowdsourced peer review)',
      'Analizuje sentyment spolecznosci w czasie (SHIFTING sentymenty)'
    ],
    doesNotDo: [
      'Nie czyta oficjalnej dokumentacji (to domena Researcher Tech)',
      'Nie szuka inspiracji wizualnych lub designu (to domena Researcher UX)',
      'Nie analizuje kodu zrodlowego ani Issues (to domena Researcher GitHub)',
      'Nie podejmuje decyzji - tylko rekomenduje',
      'Nie komunikuje sie z innymi researcherami (zasada izolacji)',
      'Nie traktuje pojedynczego komentarza jako prawdy (szuka wzorcow)',
      'Nie ignoruje kontrowersji - aktywnie je szuka'
    ],
    antiPatterns: [
      'Single Comment Truth - jeden komentarz z 3 upvotami jako opinia spolecznosci',
      'Outdated Thread - cytowanie postow sprzed 2 lat jako aktualnych opinii',
      'Echo Chamber - przeszukiwanie TYLKO jednego subreddita (np. tylko r/reactjs pro-React)',
      'Rage Sampling - zbieranie TYLKO negatywnych opinii, ignorowanie pochwal',
      'Karma Blindness - traktowanie komentarza z 2 upvotami rowno z komentarzem z 500 upvotami'
    ],
    keyConcepts: [
      {term: 'Semantyka subredditow', def: 'Kazdy subreddit ma inny bias i poziom zaawansowania - trzeba wiedziec gdzie szukac.'},
      {term: 'Ground truth', def: 'Prawda z pierwszej linii frontu, od praktykow w terenie, a nie z marketingowych broszur.'},
      {term: 'Online disinhibition', def: 'Anonimowosc sprzyja szczerosci - ludzie mowia na Reddicie co mysla naprawde.'},
      {term: 'Survivorship bias', def: 'Widzisz glownie problemy (ludzie szukaja pomocy) i sukcesy, ignorujesz ciche porazki.'},
      {term: 'Flamewar', def: 'Goraca dyskusja ujawniajaca najsilniejsze argumenty pro i contra dla konkurencyjnych technologii.'}
    ],
    stats: [
      {label: 'Uzytkownicy Reddit', value: '430 mln/mc'},
      {label: 'r/programming', value: '6 mln sub'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'Gdy chcesz wiedziec na co naprawde narzekaja developerzy, nie co mowia oficjalnie',
      'Gdy szukasz ukrytych problemow frameworka pomijanych w dokumentacji',
      'Gdy chcesz zorientowac sie w sentymencie spolecznosci wobec technologii'
    ],
    worstFor: [
      'Gdy szukasz faktow technicznych (to domena Tech Researcher)',
      'Gdy szukasz wizualnych trendow i inspiracji designu (to domena UX)',
      'Gdy masz tylko godzine i potrzebujesz szybkich odpowiedzi'
    ],
    relatedAgents: ['res_x', 'res_forums', 'res_github'],
    glossary: [
      {term: 'karma', definition: 'Reputacja uzytkownika na Reddit - suma glosow za/przeciw wszystkim jego postom.'},
      {term: 'subreddit', definition: 'Tematyczne subforum na Reddit, np r/webdev skupiajacy web developerow.'},
      {term: 'upvote/downvote', definition: 'System glosowania - komunita filtruje tresci poprzez glosy.'},
      {term: 'gilded', definition: 'Post lub komentarz nagrodzony zlotem przez innego uzytkownika - oznaka wysokiej wartosci.'},
      {term: 'flamewar', definition: 'Goraca dyskusja miedzy zwolennikami roznych technologii - zrodlo argumentow pro/con.'}
    ],
    learningQuote: 'Narzekania na Reddicie to szanse na lepsze rozwiazanie - Researcher Reddit nie szuka opinii co jest dobre, lecz gdzie sa problemy.',
    realExample: 'Pewnego dnia przeanalizowalem 200 watkow na r/nextjs o bledach server actions i znalazlem, ze 40 osob niezaleznie zglaszalo ten sam problem z revalidateTag w middleware. To byl wzorzec, nie anegdota - i ostrzezenie dla zespolu przed migracja.'
  },
  res_x: {
    tagline: 'Lowca trendow w ruchu - wychwytuje sygnaly technologiczne zanim stana sie mainstream',
    missionShort: 'Researcher X monitoruje X/Twitter w poszukiwaniu najszybszych sygnalow o nowych technologiach, launchach produktow i trendach. Jego misja: dostarczac wczesne ostrzeganie o zmianach w ekosystemie. Dziala szybko, ale wymaga walidacji z innymi zrodlami.',
    whoIs: 'Researcher X to korespondent wojenny technologii - stoi na linii frontu ekosystemu X, wychwytujac wiadomosci zanim trafia do blogow czy dokumentacji. Jego moc lezy w szybkosci, ale ta szybkosc ma cene - X to medium o najwyzszym wskazniku szumu do sygnalu.',
    analogy: 'Researcher X to radar dalekiego zasiegu na statku - wykrywa sygnaly najwczesniej, ale czasem widzi falszywe echa. Kapitan musi sluchac radaru, ale weryfikowac kazdy sygnal zanim zmieni kurs.',
    howItWorks: [
      {label: 'Rozbicie zapytania', desc: 'Odbiera pytanie badawcze od Orkiestratora i rozbija na pod-zapytania specyficzne dla X (trendy, launche, thready techniczne).'},
      {label: 'Skan postow', desc: 'Wykonuje WebSearch z operatorami site:x.com i site:twitter.com. Pobiera pelne thready z WebFetch, nie tylko snippety z wyszukiwarki.'},
      {label: 'Ocena autorow', desc: 'Sprawdza Tier autora (1=tworca tech, 5=komentator) i credentials. Oblicza hype_score 0-10 dla kazdego findingu.'},
      {label: 'Walidacja i raport', desc: 'Oznacza validation_status (VALIDATED/PARTIALLY/REQUIRES_VALIDATION) i formatuje raport JSON z TOP 10 postami, engagement_metrics i confidence scores.'}
    ],
    inputs: [
      'Pytanie badawcze (np. Jakie sa trendy w AI agents w Q2 2026)',
      'Slowa kluczowe technologiczne do sledzenia',
      'Czasowy zakres (ostatnie 48h, tydzien, miesiac)',
      'Opcjonalnie poprzedni raport z kontekstem'
    ],
    outputs: [
      'TOP 10 postow z linkami do tweeta',
      'Engagement metrics (likes, retweets, replies, bookmarks)',
      'Author credentials i Tier (1-5)',
      'Hype score 0-10 i validation_status dla kazdego findingu',
      'Sekcje Hype Assessment i Gaps'
    ],
    does: [
      'Wychwytuje nowe launche i ogloszenia zanim pojawia sie w dokumentacji',
      'Identyfikuje trendy poprzez wzorce postow (50 osob w tydzien pisze o X = trend)',
      'Detektuje hype cycle i rozroznia szum od sygnalu',
      'Zbiera opinie ekspertow (Tier 1-2 influencerow)',
      'Analizuje debaty porownawcze (X vs Y) i ujawnia trade-offy',
      'Mierzy engagement jako sygnal zainteresowania (ale NIE prawdy)',
      'Weryfikuje thready techniczne od doswiadczonych inzynierow'
    ],
    doesNotDo: [
      'Nie podaza za hype bez walidacji - flaguje jako REQUIRES_VALIDATION',
      'Nie traktuje lajkow jako dowodu jakosci technicznej',
      'Nie czyta oficjalnej dokumentacji (to domena Tech)',
      'Nie szuka wizualnych inspiracji (to domena UX)',
      'Nie analizuje repozytoriow (to domena GitHub)',
      'Nie podejmuje decyzji - raportuje co mowi X, nie czy to prawda',
      'Nie komunikuje sie z innymi researcherami (zasada izolacji)'
    ],
    antiPatterns: [
      'Hype Follower - przejmowanie narracji z X bez weryfikacji (raport brzmi jak entuzjastyczny tweet)',
      'Influencer Worship - traktowanie opinii popularnych osob jako autorytatywne niezaleznie od kompetencji',
      'Engagement = Truth - sortowanie po lajkach zamiast wartosci merytorycznej',
      'Thread Cherry-Picking - selekcja tylko potwierdzajacych tweetow, ignorowanie krytyki',
      'Recency Obsession - tylko tweety z ostatnich 24h, ignorowanie wartosciowych z tygodnia'
    ],
    keyConcepts: [
      {term: 'Hype cycle', def: 'Faza zycia trendu: dzien 1 eksplozja, dzien 7 krytyka, dzien 30 cisza. Trzeba wiedziec gdzie jestesmy.'},
      {term: 'Noise-to-signal ratio', def: 'Stosunek szumu do wartosciowych tresci - na X najwyzszy ze wszystkich zrodel researchu.'},
      {term: 'Influencer Tier', def: 'Hierarchia wiarygodnosci: tworca tech - principal engineer - DevRel - content creator - komentator.'},
      {term: 'Validation status', def: 'Czy finding potwierdzony z innym zrodlem czy wymaga walidacji (VALIDATED/PARTIALLY/REQUIRES_VALIDATION).'},
      {term: 'Context collapse', def: 'Brak kontekstu w 280 znakach - trzeba czytac caly thread i replies, zeby nie zgubic sensu.'}
    ],
    stats: [
      {label: 'Uzytkownicy X', value: '500 mln/mc'},
      {label: 'Polokres postu', value: '4.2 h'},
      {label: 'Load', value: '45/100'},
      {label: 'Koszt/run', value: '0.03 USD'}
    ],
    bestFor: [
      'Gdy chcesz wiedziec o nowych launchach przed blogami i dokumentacja',
      'Gdy chcesz detektowac trendy zanim stana sie mainstream',
      'Gdy chcesz wczesne ostrzeganie o bugach i kontrowersji'
    ],
    worstFor: [
      'Gdy szukasz glebokich, szczegolowych analiz (280 znakow to za malo)',
      'Gdy szukasz faktu zamiast opinii (X jest pelne hype i marketing)',
      'Gdy nie chcesz zmagac sie z botami i manipulacja'
    ],
    relatedAgents: ['res_reddit', 'res_forums', 'res_github'],
    glossary: [
      {term: 'hype_score', definition: 'Skala 0-10 oceniajaca poziom hype wokol tematu na X.'},
      {term: 'thread', definition: 'Wieloczesciowy post na X - posty polaczone w watek, kluczowy format dla technicznych analiz.'},
      {term: 'hot_take', definition: 'Szybka, kontrowersyjna opinia - zazwyczaj uproszczona i wymaga walidacji.'},
      {term: 'engagement_metrics', definition: 'Likes, retweets, replies, bookmarks - sygnaly zainteresowania, ale nie prawdy.'},
      {term: 'validation_status', definition: 'VALIDATED/PARTIALLY/REQUIRES_VALIDATION - czy potwierdzono z innym zrodlem.'}
    ],
    learningQuote: 'X jest najszybszym medium, ale ta szybkosc ma cene - szybkosc bez walidacji to ryzyko, szybkosc z walidacja to przewaga konkurencyjna.',
    realExample: 'Pewnego dnia wychwycilem thread od principal engineera Anthropic o nowym model routingu 6 godzin przed oficjalnym blog postem. Oznaczylem jako VALIDATED po cross-checku z res_tech i zespol zdazyl zaplanowac migracje przed konkurencja.'
  },
  res_github: {
    tagline: 'Archeolog dzialajacego kodu - wykopuje wzorce z najlepszych repozytoriow open-source',
    missionShort: 'Researcher GitHub przeszukuje repozytoria open-source w poszukiwaniu dzialajacego kodu, architektury i wzorcow. Jego misja: dostarczac dowody w formie kodu, nie opinie. Unika 90% porzuconych projektow i rekomenduje TOP 5 z health scoreami.',
    whoIs: 'Researcher GitHub to archeolog badajacy ruiny dzialajacych aplikacji. Nie czyta dokumentacji o tym jak powinno sie budowac - odkopuje repozytoria i widzi jak faktycznie sie buduje. Patrzy na fundamenty, narzedzia, bledy i historie napraw. Dokumentacja mowi co powinno dzialac, GitHub mowi co faktycznie dziala w produkcji.',
    analogy: 'Researcher GitHub to inspektor budowlany sprawdzajacy dom przed zakupem - nie patrzy na swiezy tynk i ladna elewacje, ale zajrzy pod README, do Issues, commitow i architektury. I dopiero wtedy mowi: ten fundament jest solidny albo uciekaj, zanim sie zawali.',
    howItWorks: [
      {label: 'Wyszukiwanie repos', desc: 'Rozbija pytanie na pod-zapytania z operatorami GitHub (stars>100, pushed>data, language:typescript) i wyszukuje TOP 10-15 repozytoriow.'},
      {label: 'Filtr zdrowia', desc: 'Odrzuca porzucone projekty - filtruje po metrikach: stars >100, commit <6 miesiecy, licencja MIT/Apache. Zostaje TOP 5 do glebokiej analizy.'},
      {label: 'Analiza kodu', desc: 'Czyta README, package.json, struktura /src, .github/workflows. Przeglada Issues (problemy) i Pull Requesty (jak reaguja maintainerzy).'},
      {label: 'Cross-repo patterns', desc: 'Ocena 8 metryk zdrowia, bus factor, i wyodrebia wzorce miedzy 5 repos - co powtarza sie w 4 z 5. Raport JSON z rekomendacjami.'}
    ],
    inputs: [
      'Pytanie badawcze (np. Jaka architektura dominuje w SaaS repos)',
      'Slowa kluczowe technologiczne i typ architektur',
      'Czasami istniejacy kod projektu do porownania',
      'Kontekst zespolu (rozmiar, poziom zaawansowania) - opcjonalnie'
    ],
    outputs: [
      'TOP 5 repozytoriow z URL i metrykami (stars, forks, last commit)',
      'Health_score 0-10, architektura, tech stack per repo',
      'Notable Issues i Code patterns powtarzajace sie w repozytorium',
      'Cross-repo patterns - wzorce miedzy wszystkimi 5 repos (kluczowe)',
      'Recommendations, Risks i Gaps'
    ],
    does: [
      'Znajduje dzialajacy kod w dziesiatkach milionow repozytoriow GitHub',
      'Wyodrebia architekture z realnych implementacji (nie teorii z podrecznikow)',
      'Ocenia zdrowie repozytorium poprzez 8 metryk (health score)',
      'Identyfikuje ukryte problemy poprzez czytanie Issues',
      'Wydobywa cross-repo patterns - co robia najlepsze repos',
      'Weryfikuje adopcje technologii poprzez liczenie usage w top repos',
      'Ocenia ryzyko - bus factor, zdrowie spolecznosci, aktywnosc maintainerow',
      'Dostarcza dowody w formie kodu, nie opinii'
    ],
    doesNotDo: [
      'Nie kopiuje kodu do projektu (to rola Buildera)',
      'Nie uruchamia kodu (npm test, docker compose up) - nie ma dostepu do Bash',
      'Nie ocenia estetyki interfejsu (to domena UX)',
      'Nie podejmuje decyzji - rekomenduje, decyzja nalezy do Orchestratora',
      'Nie przeszukuje zrodel innych researcherow (kazdy ma swoj teren)',
      'Nie traktuje pojedynczego repo jako prawdy - porownuje minimum 5',
      'Nie ignoruje daty - repo z commitami sprzed 2 lat to abandoned'
    ],
    antiPatterns: [
      'Star Worship - wybieranie repo wylacznie po liczbie gwiazdek (15K stars, ale porzucone od 2023)',
      'Blind Copy - rekomendowanie skopiuj architekture z repo X bez analizy kontekstu',
      'Abandoned Repo Adoption - rekomendowanie repo bez commitow od 2 lat',
      'README Deception - ocenianie repo tylko po README bez sprawdzenia kodu i Issues',
      'Single Repo Fixation - cala analiza na jednym repozytorium, bez porownania alternatyw'
    ],
    keyConcepts: [
      {term: 'bus_factor', def: 'Liczba kontrybutorow ktorzy musza odejsc zeby projekt umarl - 1 = krytyczne ryzyko.'},
      {term: 'cross_repo_pattern', def: 'Wzorzec powtarzajacy sie w wielu repozytoriach (4/5 uzywa Prisma = wzorzec).'},
      {term: 'health_score', def: 'Ocena zdrowia repo 0-10 bazowana na 8 metrykach: Stars, Last Commit, Issues, PRs, Contributors, License, Tests, README.'},
      {term: 'dependency_health', def: 'Czy pakiety w package.json sa aktywnie utrzymywane i czy maja znane CVE.'},
      {term: 'code_smell', def: 'Subtelne problemy w architekturze - zle oddzielenie concerns, duze komponenty, brak testow.'}
    ],
    stats: [
      {label: 'Repozytoria', value: '420 mln+'},
      {label: 'Porzucone', value: '90%'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'Gdy chcesz zobaczyc jak naprawde buduja najlepsze projekty',
      'Gdy szukasz architektur referencyjnych i wzorcow kodu',
      'Gdy chcesz zweryfikowac czy technologia ma adopcje w top repos'
    ],
    worstFor: [
      'Gdy szukasz szybkich odpowiedzi (GitHub research zajmuje 45-120s)',
      'Gdy szukasz teorii lub benchmarkow (to domena Tech)',
      'Gdy projekt jest zbyt nowy i nie ma jeszcze public repos'
    ],
    relatedAgents: ['res_reddit', 'res_forums', 'res_tech'],
    glossary: [
      {term: 'fork', definition: 'Kopia repozytorium - jesli ktos forkuje repo, oznacza ze go uzywa lub chce modyfikowac.'},
      {term: 'pull_request', definition: 'Propozycja zmian - pokazuje kulture code review i komunikacje maintainerow.'},
      {term: 'issue', definition: 'Problem zgloszony przez uzytkownika - Issues to wywiad z uzytkownikami repo.'},
      {term: 'health_score', definition: 'Ocena zdrowia repo 0-10 z 8 metryk: Stars, Last Commit, Issues, PRs, Contributors, License, Tests, README.'},
      {term: 'github_actions', definition: 'Automatyzacja CI/CD - Workflows pokazuja czy projekt ma testy i jak dojrzaly jest proces.'}
    ],
    learningQuote: 'GitHub daje realny kod, nie teorie - bo kod albo dziala, albo nie. TOP 5 repos z GitHub jest kotwica calej analizy wieloagentowej.',
    realExample: 'Pewnego dnia porownalem 5 najlepszych boilerplates SaaS w Next.js i odkrylem, ze 4 z 5 uzywaja Prisma + tRPC + NextAuth - to byl cross-repo pattern, ktory stal sie kotwica rekomendacji dla zespolu startupu.'
  },
  res_forums: {
    tagline: 'Tropiciel pulapek i rozwiazan - kataloguje gdzie wszyscy sie potkneli i jak sie uratowali',
    missionShort: 'Researcher Forums przeszukuje fora, blogi i platformy Q&A w poszukiwaniu rozwiazanych problemow i ukrytych pulapek. Jego misja: dostarczac konkretne, zweryfikowane rozwiazania z kodem. Kazda zaakceptowana odpowiedz na SO to rozwiazany problem w produkcji.',
    whoIs: 'Researcher Forums to bibliotekarz technicznej biblioteki, ktory zna kazda polke nie alfabetycznie, ale poprzez to ktore ksiazki maja pozaginane rogi - bo praktycy wciaz do nich wracaja. Przeszukuje StackOverflow, Dev.to, Medium i Hacker News. Kazda zaakceptowana odpowiedz to wyrok - zweryfikowane rozwiazanie.',
    analogy: 'Dokumentacja mowi ci sciezke szczescia. Fora mowia ci gdzie wszyscy sie potkneli - bo za kazda zaakceptowana odpowiedzia na StackOverflow stoi blizna po rozwiazanym problemie w produkcji.',
    howItWorks: [
      {label: 'Pod-zapytania', desc: 'Rozbija pytanie na pod-zapytania specyficzne dla kazdej platformy i uzywa operatorow site:stackoverflow.com, site:dev.to, site:medium.com, site:news.ycombinator.com.'},
      {label: 'Filtrowanie jakosci', desc: 'Odrzuca pytania bez odpowiedzi, posty starsze niz 18 miesiecy, odpowiedzi z mniej niz 5 glosami. Pobiera tresc TOP 10-15 wynikow.'},
      {label: 'Wyciaganie gotchas', desc: 'Ocenia Answer Quality Score 1-10 i wyodrebia gotchas - ukryte pulapki typu dziala ALE... lub dokumentacja mowi X, ale w praktyce....'},
      {label: 'Cross-validate i raport', desc: 'Sprawdza czy ten sam problem pojawil sie na 2+ platformach (SO+Dev.to = confidence 0.85). Formatuje raport JSON z TOP 10 takeaways.'}
    ],
    inputs: [
      'Pytanie badawcze (np. Problemy migracji Prisma v5 do v6)',
      'Slowa kluczowe technologiczne',
      'Zakres czasowy: ostatnie 12-18 miesiecy (starsze = ryzykowne)',
      'Czasami poprzedni raport dla iteracji'
    ],
    outputs: [
      'TOP 10 takeaways - praktyczne rozwiazania z linkami',
      'Answer_score, post_date, technology_version per finding',
      'Accepted flag - czy autor pytania potwierdzil skutecznosc',
      'Gotchas - ukryte pulapki (najcenniejsza czesc raportu)',
      'Cross-validated flag i confidence score 0.0-1.0'
    ],
    does: [
      'Znajduje zweryfikowane rozwiazania (zaakceptowane odpowiedzi SO)',
      'Identyfikuje powtarzajace sie problemy miedzy platformami',
      'Wyodrebia gotchas - ukryte pulapki nie wymienione w dokumentacji',
      'Zbiera tutoriale step-by-step z konkretnymi benchmarkami',
      'Analizuje praktyczna zastosowanosc rozwiazan',
      'Weryfikuje poprzez cross-platform validation (SO + Dev.to + HN)',
      'Ocenia autorow - czy senior engineer czy poczatkujacy',
      'Pomija tresci stare i przestarzale API'
    ],
    doesNotDo: [
      'Nie czyta oficjalnej dokumentacji (to domena Tech)',
      'Nie szuka inspiracji wizualnych (to domena UX)',
      'Nie analizuje kodu w repozytoriach (to domena GitHub)',
      'Nie podejmuje decyzji - raportuje problemy i rozwiazania',
      'Nie komunikuje sie z innymi researcherami (zasada izolacji)',
      'Nie cytuje pytan bez odpowiedzi jako dowodow na problemy',
      'Nie traktuje liczby glosow jako absolutnego wskaznika prawdy'
    ],
    antiPatterns: [
      'Unanswered Echo - cytowanie pytan bez odpowiedzi jako dowodu na istnienie problemu',
      'Upvote Worship - traktowanie liczby glosow jako absolutnego wskaznika poprawnosci (500 glosow z 2019 = przestarzale)',
      'Medium Paywall Trap - cytowanie artykulow za paywallem bez sprawdzenia dostepnosci',
      'Outdated Tutorial - cytowanie tutoriala dla starej wersji technologii jako aktualnego',
      'Single Source Syndrome - cala rekomendacja na jednym poscie forumowym, bez cross-validation'
    ],
    keyConcepts: [
      {term: 'accepted_answer', def: 'Odpowiedz na SO oznaczona przez autora pytania jako rozwiazujaca problem - potwierdzenie skutecznosci.'},
      {term: 'gotcha', def: 'Ukryta pulapka ktora nie wynika z oficjalnej dokumentacji - kluczowa wartosc forum research.'},
      {term: 'cross_platform_validation', def: 'Potwierdzenie znaleziska w wiecej niz jednym zrodle (SO+Dev.to+HN = highest confidence).'},
      {term: 'practical_applicability', def: 'Czy znalezisko da sie wdrozyc od razu w projekcie bez dodatkowych modyfikacji.'},
      {term: 'tutorial_freshness', def: 'Aktualnosc tutoriala - czy dotyczy biezacej wersji technologii (kluczowe dla szybko zmieniajacych sie frameworkow).'}
    ],
    stats: [
      {label: 'Odpowiedzi SO', value: '58 mln'},
      {label: 'Accepted', value: '8 mln+'},
      {label: 'Load', value: '50/100'},
      {label: 'Koszt/run', value: '0.024 USD'}
    ],
    bestFor: [
      'Gdy dokumentacja mowi happy path, ale chcesz wiedziec gdzie sie ludzie potykaja',
      'Gdy szukasz konkretnych, zweryfikowanych rozwiazan z kodem',
      'Gdy chcesz wiedziec o pulapkach (gotchas) nie wymienionych w docs'
    ],
    worstFor: [
      'Gdy szukasz szybkich odpowiedzi (wiele wyszukiwan i WebFetch callow)',
      'Gdy szukasz oficjalnych specyfikacji i benchmarkow (to domena Tech)',
      'Gdy szukasz bardzo nowych technologii (wciaz brak pytan na SO)'
    ],
    relatedAgents: ['res_reddit', 'res_github', 'res_tech'],
    glossary: [
      {term: 'accepted', definition: 'Odpowiedz zaakceptowana przez autora pytania - oznacza ze rozwiazala problem.'},
      {term: 'upvote', definition: 'Glos poparcia - ale glosy moga byc stare i nieaktualne dla nowych wersji technologii.'},
      {term: 'gotcha', definition: 'Ukryta pulapka, np. revalidateTag() nie dziala w middleware.ts mimo ze docs tego nie mowia.'},
      {term: 'cross_validation', definition: 'Potwierdzenie znaleziska w 2+ zrodlach - zwieksza confidence score.'},
      {term: 'tutorial_freshness', definition: 'Czy tutorial dotyczy biezacej wersji technologii - krytyczne dla frameworkow.'}
    ],
    learningQuote: 'Dokumentacja mowi sciezke szczescia. Fora mowia gdzie wszyscy sie potkneli - kazda zaakceptowana odpowiedz na StackOverflow to rozwiazany problem kogos innego.',
    realExample: 'Pewnego dnia znalazlem 8 watkow na SO z tym samym gotcha: revalidateTag nie dziala w middleware.ts w Next.js 14. Wszystkie zaakceptowane odpowiedzi wskazywaly workaround z route handler - uratowalo to zespol przed 3-dniowa debugging session.'
  },