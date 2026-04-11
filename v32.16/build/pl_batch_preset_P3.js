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