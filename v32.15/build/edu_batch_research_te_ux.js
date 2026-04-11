// Batch: research tech/ux
  res_tech: {
    tagline: 'Archiwista oficjalnej prawdy - czyta docs i RFC, cytuje URL zamiast pamieci',
    missionShort: 'Researcher Tech przeszukuje oficjalna dokumentacje, RFC, specyfikacje i benchmarki w poszukiwaniu twardych faktow technicznych. Jego misja: dostarczac ground truth od producenta i peer-reviewed badan, nigdy opinii. Kazde twierdzenie musi miec URL zrodla - bez zrodla nie ma faktu.',
    whoIs: 'Researcher Tech to bibliotekarz prawniczej biblioteki i detektyw w archiwum zarazem. Siedzi w czytelni oficjalnych docsow, porownuje wersje, sprawdza daty publikacji i RFC, i nigdy nie cytuje z pamieci. Jego domena to arbiter prawdy - co mowi producent, co pokazuja niezalezne benchmarki, co wynika z changelogow.',
    analogy: 'Researcher Tech to prawnik przed sadem - zamiast mowic slyszalem ze, wyciaga z teczki dokument, pokazuje akapit, cytuje paragraf i dodaje URL zrodla.',
    howItWorks: [
      {label: 'Pytanie badawcze', desc: 'Odbiera waskie pytanie od Orkiestratora (Narrow Context Principle) i rozbija na pod-zapytania z kontekstem czasowym i wersja technologii.'},
      {label: 'Hierarchia zrodel', desc: 'Wyszukuje wedlug piramidy: oficjalne docs > engineering blog > niezalezny benchmark > tutorial. Odrzuca zrodla starsze niz 12 miesiecy dla szybko zmieniajacych sie framewkorkow.'},
      {label: 'Porownanie 3 opcji', desc: 'Dla kazdego zagadnienia porownuje minimum 3 alternatywy z pros/cons, snippetami setup, znanymi issues i aktywnoscia maintenance. Nigdy nie rekomenduje pierwszej znalezionej.'},
      {label: 'Raport JSON', desc: 'Formatuje ustrukturyzowany raport z findings, confidence scores 0.0-1.0, risks, gaps i URL przy kazdym twierdzeniu. Jawnie wskazuje luki w danych dla Research Critica.'}
    ],
    inputs: [
      'Pytanie badawcze (np. Jaki framework multi-agent dla SaaS)',
      'Slowa kluczowe technologiczne i wersje frameworkow',
      'Zakres czasowy zrodel (freshness window)',
      'Opcjonalnie poprzedni raport dla iteracji lub rewizji'
    ],
    outputs: [
      'Minimum 3 opcje porownania z pros/cons i snippetami',
      'URL zrodla przy kazdym twierdzeniu technicznym',
      'Confidence score 0.0-1.0 wedlug hierarchii zrodel',
      'Sekcja risks (lock-in, maintenance, security, scalability)',
      'Sekcja gaps - czego nie udalo sie znalezc w zrodlach'
    ],
    does: [
      'Czyta oficjalna dokumentacje i RFC jako arbiter prawdy',
      'Analizuje krytycznie benchmarki (hardware, wersja, metodologia, powtarzalnosc)',
      'Porownuje minimum 3 alternatywy dla kazdej rekomendacji technologii',
      'Weryfikuje statystyki adopcji (npm downloads, GitHub stars, PyPI)',
      'Sprawdza changelog i CVE dla zidentyfikowania breaking changes',
      'Ocenia vendor lock-in i model-agnostic character rozwiazania',
      'Dostarcza working setup snippet dla kazdej rekomendowanej opcji',
      'Oznacza kazde twierdzenie URL zrodla - zasada kardynalna'
    ],
    doesNotDo: [
      'Nie czyta Reddita ani opinii spolecznosci (to domena res_reddit)',
      'Nie szuka wizualnych trendow i mood boardow (to domena res_ux)',
      'Nie analizuje repozytoriow i Issues (to domena res_github)',
      'Nie cytuje forow SO jako zrodel glownych (to domena res_forums)',
      'Nie pisze kodu ani implementacji (to rola Buildera)',
      'Nie podejmuje decyzji - rekomenduje z confidence score',
      'Nie komunikuje sie z innymi researcherami (zasada izolacji)'
    ],
    antiPatterns: [
      'Shallow Search - jeden query WebSearch i trzy linki jako raport bez poglebionego WebFetch',
      'Hallucinated Source - URL wygenerowany z pamieci modelu prowadzacy do 404',
      'Source Bias - wszystkie zrodla od jednego vendora (nextjs docs + vercel blog + vercel case)',
      'Recency Obsession - rekomendacja najnowszej technologii tylko dlatego ze jest nowa',
      'Copy-Paste Research - doslowne cytaty z dokumentacji bez analizy i kontekstualizacji'
    ],
    keyConcepts: [
      {term: 'Narrow Context Principle', def: 'Researcher dostaje TYLKO pytanie badawcze bez kontekstu projektu - redukuje halucynacje i confirmation bias.'},
      {term: 'Hierarchia zrodel', def: 'Docs > Eng Blog > Benchmark > Tech Blog > Tutorial > Forum > Tweet - oficjalne zrodlo pokonuje blog za kazdym razem.'},
      {term: 'Confidence score', def: '0.9+ dla oficjalnej dokumentacji, 0.7-0.89 dla renomowanych blogow, 0.5-0.69 dla forow, ponizej 0.5 odrzucane przez Critica.'},
      {term: 'Freshness check', def: 'Zrodlo starsze niz 12 miesiecy dla frameworka wymaga weryfikacji z aktualna wersja - technologia starzeje sie szybko.'},
      {term: 'Multi-source triangulation', def: 'Wysoka pewnosc wymaga potwierdzenia przez 3 rozne typy zrodel: docs + benchmark + community feedback.'}
    ],
    stats: [
      {label: 'Min. opcji', value: '3 porownania'},
      {label: 'Hierarchia', value: '7 poziomow'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'Gdy potrzebujesz twardych faktow technicznych z URL zrodla zamiast opinii',
      'Gdy wybierasz miedzy 3+ frameworkami i potrzebujesz porownania pros/cons',
      'Gdy musisz zweryfikowac benchmark, wersje API lub breaking changes'
    ],
    worstFor: [
      'Gdy szukasz opinii praktykow co naprawde dziala (to domena res_reddit)',
      'Gdy szukasz inspiracji wizualnych i trendow UX (to domena res_ux)',
      'Gdy pytanie dotyczy bardzo nowej technologii bez ustalonej dokumentacji'
    ],
    relatedAgents: ['res_docs', 'res_github', 'res_critic'],
    glossary: [
      {term: 'rfc', definition: 'Request for Comments - dokument techniczny definiujacy standardy i decyzje projektowe maintainerow.'},
      {term: 'freshness', definition: 'Aktualnosc zrodla - data publikacji wzgledem aktualnej wersji technologii.'},
      {term: 'confidence_score', definition: 'Ocena pewnosci znaleziska 0.0-1.0 bazowana na hierarchii zrodel i liczbie potwierdzen.'},
      {term: 'vendor_lock_in', definition: 'Stopien zaleznosci od jednego dostawcy - od open-source (brak) po zamkniete protokoly (wysoki).'},
      {term: 'narrow_context', definition: 'Zasada ograniczenia kontekstu do pytania badawczego - zapobiega halucynacjom i confirmation bias.'}
    ],
    learningQuote: 'Bez URL zrodla nie ma faktu - jest tylko spekulacja. Researcher Tech nie cytuje z pamieci, on pokazuje dokument i akapit.',
    realExample: 'Pewnego dnia porownalem LangGraph, CrewAI i Claude Agent SDK dla SaaS multi-agent. LangGraph wygrywal battle-tested (confidence 0.92), ale znalazlem issue o memory leak <0.2.1. Oznaczylem w risks i zespol wybral wersje stabilna z obejsciem, zamiast dowiadywac sie o bugu na produkcji.'
  },
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
