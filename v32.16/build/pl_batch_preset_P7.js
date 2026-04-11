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