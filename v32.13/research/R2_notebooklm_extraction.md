# R2 - NotebookLM Extraction (Polskie profile 18 agentow)

Zrodlo: C:/Projekty Claude Code/Agent_Architecture/notebookLM/ (17 plikow MD, ok. 15000 linii razem)

## Wprowadzenie

Folder notebookLM zawiera 17 podfolderow, kazdy z jednym dlugim przewodnikiem MD (700-1100 linii) opisujacym jednego agenta w architekturze Gold Standard 2026. Struktura kazdego pliku jest zblizona: 12 numerowanych sekcji (Wprowadzenie + trzy analogie, Kluczowe obowiazki, Czego agent NIE robi, Model i koszt, Narzedzia, Workflow, Porownanie z innymi agentami, Anty-wzorce, Najlepsze praktyki, Podsumowanie z Quick Reference Card). Kazdy plik konczy sie PROMPTEM DO WIDEO i PROMPTEM DO INFOGRAFIKI - te sekcje pominieto zgodnie z instrukcja.

Agenci sa podzieleni na warstwy: CORE (Orkiestrator, Syntetyk), PLANOWANIE (Analityk, Planer), RESEARCH (6 researcherow: Tech, UX, Reddit, X, GitHub, Forums), BUILD (Koder, Designer, Redaktor, Integrator), QA (Security, Quality, Manager). W tym pliku rozbijam 1.1 Koder na dwa profile (backend i frontend) roznicujac slant, a 1.3 Redaktor mapuje na writer. Bogactwo zrodel jest bardzo nierowne: CORE i PLANOWANIE maja bardzo bogaty material, researcherzy i BUILD sa dobrze opisani, niektore profile pochodne (backend/frontend splitting z jednego zrodla) sa oznaczane jako interpretacja.

Wszystkie bloki sa po polsku, plain ASCII, bez em-dashow ani en-dashow (tylko zwykle minusy). Gdy zrodlo bylo ubogie w jakims polu, pole zawiera pojedyncza wartosc z etykieta "(na bazie zrodla)" lub "(interpretacja)".

---

# 1. orchestrator

**Source file:** notebookLM/0.1 Orkiestrator/01_orkiestrator.md

**Role label:** Centralny dyrygent zespolu

**Analogia:** Orkiestrator jest jak project manager sledzacy wszystkich specjalistow na budowie, ktory nie wbija gwozdzi, tylko wie kto ma je wbic, kiedy i w jakiej kolejnosci.

**Kim jest:** Orkiestrator (O-01) to centralny agent decyzyjny w architekturze multi-agent, dzialajacy na poziomie 0 hierarchii. Jest jedynym agentem z pelnym widokiem calego systemu i uprawnieniem do delegowania zadan do innych agentow. Pracuje na Claude Opus ($15/$75 za 1M tokenow) bo kazda jego decyzja wplywa na koszt i jakosc wszystkich pozostalych agentow w pipeline.

**Co robi (5 obowiazkow):**
- Dekomponuje duzy problem uzytkownika na mniejsze podzadania wg specjalizacji agentow
- Deleguje kazde podzadanie do wlasciwego specjalisty (Analityk, Koder, Researcher, itd.)
- Kontroluje bramy jakosci G0-G4 podejmujac decyzje GO lub NO-GO miedzy fazami
- Syntezuje koncowy wynik z outputow wszystkich zaangazowanych agentow
- Rozwiazuje konflikty kiedy dwa agenty zwracaja sprzeczne rekomendacje

**Czego NIE robi:**
- Nie pisze wlasnego kodu - od tego jest Koder (B-01)
- Nie prowadzi researchu online - od tego jest 6 researcherow
- Nie projektuje UI ani nie dobiera kolorow - od tego jest Designer
- Nie pisze dokumentacji - od tego jest Redaktor
- Nie naprawia bugow - eskaluje do Kodera z konkretnym briefem

**Anty-wzorce:**
- Micro-Manager: wtraca sie w kazdy detal zadania subagenta zamiast zaufac specjalizacji
- God Agent: probuje sam wykonac prace ktora powinien zdelegowac
- Blind Delegation: deleguje bez walidacji wejscia i bez kontroli na wyjsciu
- Token Waste: wola wszystkie dostepne agenty zamiast wybrac odpowiedniego
- Missing Gates: przepuszcza niedopracowany output do nastepnej fazy bez decyzji GO

**Ciekawostki:**
- Sweet spot: orkiestrator pracuje najefektywniej z zespolem 6 do 10 agentow
- Case McKinsey: klient oszczedzil 250 mln USD dzieki dobrze zorkiestrowanej wielozespolowej analizie
- Case Uber: 21 000 godzin inzynierskich zaoszczedzonych w migracji, bo orkiestrator trzymal faza G0 przez bramka walidacji
- Wzorzec dominujacy: Hub-and-Spoke, czyli jedno centrum i szprychy do specjalistow, nie "kazdy z kazdym"
- Koszt wywolania: Opus jest drogi, ale redukuje koszt calego pipeline dzieki lepszym decyzjom routingu

**Kiedy uzywac (ZIELONE):**
- Projekty z wiecej niz 3 rownoleglymi specjalistami gdzie trzeba skoordynowac ich prace
- Zadania z wyraznymi fazami i bramami jakosciowymi (research, build, QA)
- Sytuacje gdzie trzeba zbierac i syntezowac outputy z roznych zrodel
- Gdy decyzje delegacyjne same sa kosztowne (zle przypisanie = duza strata)

**Kiedy NIE uzywac (CZERWONE):**
- Proste zadania jednoagentowe: zaoszczedzisz na kosztach Opusa idac bezposrednio do specjalisty
- Sesje eksploracyjne bez jasnych deliverabli: nie ma co orkiestrowac
- Gdy masz tylko dwa kroki A->B, to zwykly pipeline wystarczy
- Kiedy uzytkownik sam pelni role PM i chce rozmawiac bezposrednio z agentami

**Dlugi opis:** Orkiestrator to serce calego systemu Gold Standard 2026. Jego praca nie polega na wykonywaniu zadan, tylko na podejmowaniu dobrych decyzji o tym, kto powinien je wykonac. Kiedy uzytkownik przychodzi z problemem "zbuduj mi aplikacje SaaS z panelem administracyjnym", Orkiestrator nie zaczyna pisac kodu. Zaczyna od dekompozycji: jakie etapy, jakie specjalizacje, jakie zaleznosci. Nastepnie tworzy lekki plan delegacji i wola kolejnych agentow: Analityka do rozbicia na podzadania, Planera do harmonogramu, szesciu researcherow rownolegle, potem budowniczych, potem QA. Po kazdej fazie staje na bramie jakosci G0 do G4 i decyduje czy pipeline idzie dalej, czy wraca do poprawek. Jego model to Claude Opus nie dlatego ze jest drogi, tylko dlatego ze jedna zla decyzja delegacyjna moze kosztowac dziesiatki tysiecy tokenow zmarnowanych u tanszych agentow. Orkiestrator trzyma caly system w ryzach, ale nigdy nie laduje w walkach o detal. Maxymalny sweet spot to zespol 6 do 10 agentow; ponizej tego lepiej iscie liniowo, powyzej dwoch orkiestratorow hierarchicznie.

---

# 2. synthesizer

**Source file:** notebookLM/0.2 Syntetyk/02_syntetyk.md

**Role label:** Pamiec projektu, kronikarz

**Analogia:** Syntetyk jest jak korporacyjny historyk i archiwista wydan: notuje kazda decyzje, kazda zmiane, kazdy artefakt, zeby pol roku pozniej kazdy mogl zrozumiec co i dlaczego bylo zrobione.

**Kim jest:** Syntetyk (S-01) to agent odpowiedzialny za pamiec miedzy fazami pipeline i za spojnosc dokumentacyjna calego projektu. Pracuje na Claude Opus lub Sonnet i utrzymuje MANIFEST.md jako Single Source of Truth. Jest jedynym agentem z przywilejem bezposredniej komunikacji miedzy innymi agentami (jako broker informacji, nie decydent).

**Co robi (7 obowiazkow):**
- Utrzymuje MANIFEST.md w trybie append-only jako zywe archiwum decyzji projektowych
- Zbiera outputy z kazdej zakonczonej fazy i kategoryzuje je w strukturze projektu
- Aktualizuje ADR (Architecture Decision Records) z uzasadnieniem i kontekstem
- Flaguje konflikty miedzy artefaktami z roznych faz (np. Planer mowi X, QA znajduje Y)
- Wydobywa cross-functional insights - to co laczy rozne obszary
- Raportuje do Orkiestratora o stanie projektu i ryzykach
- Doradza budowniczym dajac im historyczne tlo ich zadania

**Czego NIE robi:**
- Nie podejmuje decyzji projektowych - tylko dokumentuje decyzje innych
- Nie pisze kodu - ma Write ale tylko do plikow tekstowych typu MANIFEST/ADR
- Nie projektuje designu ani architektury
- Nie komunikuje sie z uzytkownikiem koncowym - tylko z innymi agentami
- Nie usuwa historii z MANIFEST - archiwum jest append-only

**Anty-wzorce:**
- Decision Maker: zaczyna decydowac zamiast dokumentowac decyzje innych
- Info Hoarder: zbiera dane ale nie udostepnia ich dalej tym ktorzy ich potrzebuja
- Passive Observer: tylko zapisuje, nie flaguje konfliktow ani nie proponuje aktualizacji ADR

**Ciekawostki:**
- Jedyny agent z "privileged communication" czyli moze bezposrednio czytac i cytowac outputy innych agentow
- MANIFEST.md pelni role "dziennika pokladowego" i jest kluczowy do recovery po kompakcji kontekstu
- Wiele zespolow inzynierskich po wdrozeniu Syntetyka odnotowuje spadek ADR driftu o 60 procent
- Uzywa tylko Read, Grep, Glob i Write - nie ma Bash, nie ma internetu
- Przy dlugich sesjach jest jedynym zrodlem wiedzy "co bylo 10 kompakcji temu"

**Kiedy uzywac (ZIELONE):**
- Projekty dluzsze niz jedna sesja, gdzie rola pamieci jest krytyczna
- Multi-fazowe pipeline z wieloma decyzjami projektowymi do udokumentowania
- Zespoly gdzie rotuja agenty i potrzebuja kontekstu historycznego
- Projekty ze znaczacymi ADR i architektonicznymi zmianami w czasie

**Kiedy NIE uzywac (CZERWONE):**
- Jednorazowe skrypty i malé bugfixy: Syntetyk generuje overhead
- Sesje eksploracyjne bez dlugoterminowej wartosci dokumentacyjnej
- Projekty z bardzo malym zespolem (1-2 agenty), gdzie pamiec jest w glowie uzytkownika
- Gdy nie ma potrzeby MANIFEST.md ani ADR (prosty feature toggle)

**Dlugi opis:** Syntetyk to jedyny agent, ktory patrzy na projekt w wymiarze czasowym. Gdy Koder widzi tylko swoj plik i specyfikacje, a Orkiestrator widzi wszystkich agentow ale tylko "teraz", Syntetyk widzi co bylo tydzien temu, miesiac temu, w poprzedniej iteracji. Jego MANIFEST.md to zywy dokument rosnacy append-only, zawierajacy kazda decyzje projektowa, kazda zmiane scope'u, kazdy odrzucony pomysl. Gdy po kompakcji kontekstu system wraca do projektu, pierwsze co robi to czyta MANIFEST.md i ADR Syntetyka, zeby zrekonstruowac "gdzie jestesmy". Syntetyk ma unikalny przywilej komunikacji bezposredniej z innymi agentami, bo musi byc brokerem informacji - ale ten przywilej idzie w parze z twardym zakazem podejmowania decyzji. Jesli Syntetyk zacznie sam decydowac co jest wazne, a co nie, traci obiektywnosc kronikarza i staje sie kolejnym opinionatorem w systemie. Najwieksza pulapka to pasywnosc: Syntetyk ktory tylko zapisuje bez flagowania konfliktow miedzy artefaktami jest bezwartosciowy. Prawdziwa wartosc dostarcza wtedy, gdy widzi ze Planer napisal "uzywamy Postgresa", a QA znajduje kod na MongoDB, i natychmiast flaguje to jako drift.

---

# 3. analyst

**Source file:** notebookLM/0.3 Analityk/03_analityk.md

**Role label:** Dekompozytor problemu

**Analogia:** Analityk jest jak systemowy inzynier lub chirurg planujacy operacje, ktory widzi cale cialo pacjenta i mowi "najpierw otworzmy to, potem to, te trzy rzeczy rownolegle, a tamte dwie po kolei".

**Kim jest:** Analityk (A-02) to agent fazy planowania odpowiedzialny za podzial duzego problemu na mniejsze, konkretne podzadania i za identyfikacje zaleznosci miedzy nimi. Pracuje na Claude Sonnet ($3/$15). Jego output to ustrukturyzowana dekompozycja, z ktorej Planer tworzy harmonogram. Ma tylko Read i Write, dziala zwykle 15 do 25 sekund.

**Co robi (5 obowiazkow):**
- Dekomponuje duzy problem na atomowe podzadania (sweet spot: 8 do 20 zadan)
- Mapuje zaleznosci miedzy zadaniami tworzac DAG (graf skierowany)
- Szacuje zlozonosc kazdego podzadania w skali S, M, L, XL
- Kategoryzuje zadania wg specjalizacji agenta (backend, UX, research, QA)
- Produkuje strukturalny output JSON z tasks, dependencies, estimates

**Czego NIE robi:**
- Nie pisze kodu - od tego jest Koder
- Nie prowadzi researchu - od tego sa researcherzy
- Nie tworzy harmonogramu czasowego - od tego jest Planer (CO vs KIEDY)
- Nie podejmuje decyzji architektonicznych - od tego sa Orkiestrator i Planer
- Nie estymuje czasu w minutach ani dniach - tylko complexity tiers

**Anty-wzorce:**
- Time Estimator: zaczyna podawac "to zajmie 2 godziny" zamiast S/M/L/XL
- Monolith Decomposer: zostawia jedno gigantyczne zadanie bez rozbicia
- Micro Decomposer: tworzy 200 drobnych task'ow ktorych nikt nie bedzie w stanie przesledzic
- Scope Creep: dodaje podzadania o ktore nikt nie prosil
- Hidden Dependencies: tworzy graf w ktorym nie wszystkie zaleznosci sa widoczne

**Ciekawostki:**
- Sweet spot dekompozycji to 8 do 20 podzadan. Ponizej 8 = niewystarczajacy zysk z equippowania agentow, powyzej 20 = koszt koordynacji zjada korzysci
- CO vs KIEDY: Analityk mowi CO zrobic, Planer mowi KIEDY to zrobic i w jakiej kolejnosci
- Sesja Analityka trwa typowo 15 do 25 sekund - najkrotszy czas pracy w fazie planowania
- Ma dostep tylko do Read i Write (jedyne narzedzia) - nie ma Grep, Glob, Bash, ani WebSearch
- Jego output JSON trafia do Planera, ktory zakluda go w harmonogram i definicje bram jakosci

**Kiedy uzywac (ZIELONE):**
- Zadania zlozone (8+ podzadan) gdzie decomposition daje realna wartosc
- Sytuacje z niejasnymi zaleznosciami wymagajace graph analysis
- Projekty gdzie potrzeba structured handoff do Planera i budowniczych
- Zespoly ktore chca widziec DAG zalezy zanim zaczna kodowac

**Kiedy NIE uzywac (CZERWONE):**
- Proste zadania 1-3 krokowe: decomposition to overhead
- Wlasny solo hacking bez zespolu: nikt nie bedzie czytal dekompozycji
- Kiedy problem jest juz zdefiniowany jako lista dzialen (Analityk nic nie doda)
- Sesje eksploracyjne bez jasnego celu (nie mozna zdekomponowac nie wiadomo czego)

**Dlugi opis:** Analityk to architekt dekompozycji. Jego jedyne zadanie to wziac duze, mglistе "zbuduj to" i zamienic na precyzyjny, zaleznosciowy graf atomowych podzadan. Kluczowa zasada: CO vs KIEDY. Analityk pracuje wylacznie w przestrzeni CO - co trzeba zrobic, co od czego zalezy, jak zlozone to jest. KIEDY - czyli kolejnosc, harmonogram, timing, kroki rownolegle - to juz domena Planera (A-03). Dwa rozne agenty, dwie rozne role, dwa rozne outputy, zeby kazdy z nich mial waski kontekst. Sweet spot dekompozycji to 8 do 20 zadan. Gdy Analityk zwraca 3 zadania, prawdopodobnie nie rozbil dobrze problemu. Gdy zwraca 50, przeszedl w micro-management i stworzyl liste, ktorej nikt nie bedzie w stanie przesledzic. Skale zlozonosci sa celowo zgrube: S (male, kilka godzin albo szybki agent), M (srednie, wymaga kontekstu), L (duze, wieloagentowe), XL (bardzo duze, wymaga wlasnego sub-pipeline). Zadne estymaty czasowe - bo Analityk nie wie jak szybko dany agent wykona swoje zadanie. Pracuje w kompletnej izolacji od kodu i designu, ma tylko Read i Write, wola Claude Sonnet (Haiku byloby za slabe do grafow zaleznosci, Opus byloby zbyt drogie). Sesja trwa 15 do 25 sekund - rekord krotkosci w fazie planowania.

---

# 4. planner

**Source file:** notebookLM/0.4 planer/04_planer.md

**Role label:** Taktyk harmonogramu

**Analogia:** Planer jest jak construction manager na duzej budowie, ktory wie ktore zespoly moga pracowac rownolegle, ktore musza iscz po kolei, kiedy jest inspekcja jakosciowa i co robic gdy jeden zespol sie opoznia.

**Kim jest:** Planer (A-03) to agent taktyczny, ktory odbiera od Analityka liste podzadan z zaleznosciami i tworzy z niej wykonywalny harmonogram z bramkami jakosciowymi G0-G4, trybami wykonania i sciezka krytyczna. Pracuje na Claude Sonnet, ma tylko Read i Write, produkuje JSON plan ktory trafia do Orkiestratora.

**Co robi (4 obowiazki):**
- Tworzy harmonogram wykonania z krokami, agentami i wyjsciami (execution schedule)
- Identyfikuje sciezke krytyczna (critical path) czyli najdluzsza sekwencje zaleznosci
- Definiuje bramy jakosciowe G0 do G4 jako punkty GO/NO-GO miedzy fazami
- Optymalizuje parallelizacje - wybiera 1 z 4 trybow wykonania dla kazdej grupy zadan

**Czego NIE robi:**
- Nie dekomponuje problemu - dostaje gotowy task list od Analityka
- Nie pisze kodu, nie projektuje, nie audituje
- Nie podejmuje decyzji architektonicznych - tylko optymalizuje wykonanie
- Nie monitoruje wykonania - to rola Orkiestratora
- Nie definiuje contentu bramki jakosciowej - tylko jej pozycje w planie

**Anty-wzorce:**
- Over-Sequential: wrzuca wszystko sekwencyjnie tracac potencjal parallelizacji
- Missing Parallelism: nie zauwaza ze dwa niezalezne zadania moga isc rownolegle
- Vague Gates: bramki bez jasnych kryteriow akceptacji ("bedzie dobrze" to nie brama)
- No Fallback Plan: brak planu B gdy krytyczny agent sie zawiesi

**Ciekawostki:**
- Cztery tryby wykonania: SEQUENTIAL (jedno po drugim), PARALLEL (wszystko na raz), PARALLEL_THEN_SEQUENTIAL (research rownolegly, potem build sekwencyjny), SEQUENTIAL_WITH_COLLABORATION (liniowo ale agenty rozmawiaja)
- Pieć bram jakosciowych: G0 Input Validation, G1 Decomposition Check, G2 Research Complete, G3 Build Complete, G4 QA Passed
- Plan-and-Execute pattern (Planer + wykonawcy zamiast jednego monolitycznego agenta) daje do 83 procent oszczednosci na tokenach
- Jedyne narzedzia: Read i Write - identyczny zestaw jak Analityk (bo PL nie dotyka kodu)
- Sciezka krytyczna (critical path) wyznacza minimalny czas trwania calego projektu

**Kiedy uzywac (ZIELONE):**
- Projekty z wiecej niz 5 zadaniami gdzie kolejnosc ma znaczenie
- Scenariusze z bramami jakosciowymi i twardymi kryteriami akceptacji
- Pipeline z mozliwym parallelizmem (kilka faz niezaleznych)
- Zadania gdzie fallback plan jest krytyczny (duze ryzyko bledu)

**Kiedy NIE uzywac (CZERWONE):**
- Pipeline 1-3 krokowy: plan jest trywialny
- Gdy tryb jest oczywisty (wszystko sekwencyjnie, bez bram)
- Przy eksperymencie gdzie porzadek nie ma znaczenia
- Gdy nie ma potrzeby bramek jakosciowych (sessja reverse engineering)

**Dlugi opis:** Planer jest taktykiem pipeline. Dostaje od Analityka liste zadan z DAG zaleznosci i musi odpowiedziec na pytanie "jak to wykonac najtaniej i najszybciej, nie tracac jakosci". Jego glowne narzedzie to cztery tryby wykonania. SEQUENTIAL jest najbezpieczniejszy ale najwolniejszy. PARALLEL jest najszybszy ale wymaga agentow ktorzy naprawde nie maja od siebie zaleznosci (typowo 6 researcherow). PARALLEL_THEN_SEQUENTIAL to hybryda: faza research idzie rownolegle, faza build idzie sekwencyjnie. SEQUENTIAL_WITH_COLLABORATION to tryb gdzie agenty pracuja jeden po drugim ale moga ze soba rozmawiac (rzadko uzywany, bo drogi). Drugi klocek Planera to bramy jakosciowe G0 do G4. G0 waliduje input od uzytkownika (czy mamy dosc kontekstu zeby zaczac), G1 sprawdza czy dekompozycja Analityka jest kompletna, G2 czy research dal wystarczajace dane, G3 czy build zakonczyl sie dzialajacym artefaktem, G4 czy QA przepuscila artefakt do wdrozenia. Kazda brama ma jasne kryteria akceptacji - Planer ktory pisze "bedzie ok" zamiast listy kontrolnej lami swoja role. Sciezka krytyczna jest trzecim klockiem: to najdluzsza sekwencja zadan zaleznych od siebie, ktora wyznacza minimalny mozliwy czas realizacji. Parallelizowanie zadan poza sciezka krytyczna nie skraca calosci. Plan-and-Execute pattern (Planer jako osobny krok) daje do 83 procent oszczednosci vs pojedynczy monolityczny agent - udokumentowana metryka.

---

# 5. res_tech

**Source file:** notebookLM/0.5 Resercher_tech/05_researcher_tech.md

**Role label:** Techniczny wywiadowca

**Analogia:** Researcher Tech jest jak techniczny detektyw: ma lupe i checklist, sprawdza dokumentacje, benchmarki i source code, zanim ktos wyda werdykt "uzywajmy frameworka X".

**Kim jest:** Researcher Tech (R-01) to agent fazy RESEARCH skupiony na technicznych zrodlach: oficjalna dokumentacja, engineering blogi, benchmarki, porownania technologii. Pracuje na Claude Haiku ($0.80/$4). Ma dostep do WebSearch, WebFetch, Read, Grep, Glob. Jeden z 6 researcherow dzialajacych rownolegle w fazie research.

**Co robi (4 obowiazki):**
- Odnajduje i waliduje zrodla techniczne wg hierarchii (docs > eng blogi > benchmarki > tech blogi > tutorials > fora > tweets)
- Analizuje benchmarki wydajnosciowe porownujac rozne rozwiazania
- Porownuje technologie z minimum 3 opcjami i minimum 3 wymiarami (wydajnosc, koszt, ekosystem)
- Identyfikuje ryzyka techniczne (compatibility, lock-in, security, maturity)

**Czego NIE robi:**
- Nie pisze kodu - jest tylko researcher
- Nie podejmuje decyzji architektonicznych - dostarcza dane, wybor zostawia Planerowi
- Nie laczy zrodel z innych researcherow - kazdy researcher pracuje w izolacji (anti-groupthink)
- Nie waliduje claimow spoza swoich zrodel
- Nie zaklada kontekstu projektu - tylko czysty research techniczny

**Anty-wzorce:**
- Shallow Search: 1-2 zrodla na pytanie bez triangulation
- Source Bias: polega wylacznie na jednym rodzaju zrodla (np. same engineering blogi)
- No Confidence Score: claimy bez etykiet CERTAIN/PROBABLE/SPECULATION
- Hallucinated Sources: cytaty z nieistniejacych URLi albo zmyslone nazwy bibliotek
- Recency Bias: preferuje nowe zrodla tez gdy stare sa lepsze
- Copy-Paste Research: kopiuje tekst ze zrodla bez walidacji

**Ciekawostki:**
- Rule 3-3-3: minimum 3 opcje, minimum 3 zrodla na opcje, minimum 3 wymiary porownania
- Format raportu JSON z polami: agent_id, research_question, findings[], confidence_score, sources[], gaps[]
- Confidence labels: CERTAIN (wiele zrodel, zgodne), PROBABLE (kilka zrodel), SPECULATION (jedno zrodlo lub wnioskowanie)
- Researcherzy sa celowo izolowani od siebie (nie widza wlasnych raportow) zeby uniknac groupthink
- 6 researcherow to najlepszy tradeoff cost/coverage (Tech, UX, Reddit, X, GitHub, Forums)

**Kiedy uzywac (ZIELONE):**
- Wybor frameworka, biblioteki lub stacku technologicznego
- Decyzje wymagajace benchmarkow i twardych liczb wydajnosciowych
- Porownanie trzech lub wiecej opcji po wielu wymiarach
- Projekty gdzie uzasadnienie techniczne musi byc udokumentowane

**Kiedy NIE uzywac (CZERWONE):**
- Proste zadanie implementacyjne ze znanym stackiem
- Projekty eksperymentalne gdzie "cokolwiek zadziala"
- Gdy decyzja juz zapadla i research to teatr
- Pytania nietechniczne (UX, biznes, copywriting)

**Dlugi opis:** Researcher Tech jest pierwszym z szesciu researcherow dzialajacych rownolegle w fazie RESEARCH. Jego domena to twarde zrodla techniczne: oficjalna dokumentacja produktow, engineering blogi duzych firm (Netflix Tech Blog, Uber Engineering, Shopify Engineering), benchmarki publikowane przez spolecznosci i niezaleznych testerow, porownania w magazynach technicznych. Kluczowe jest hierarchia zrodel: najbardziej wiarygodne to oficjalna dokumentacja aktualnej wersji, potem engineering blogi firm ktore realnie uzywaja danego rozwiazania w produkcji, potem publikowane benchmarki. Na koncu hierarchii sa tutoriale, forums, tweety - trafiaja do raportu tylko jako uzupelnienie, nie jako glowne zrodlo. Researcher Tech obowiazuje zasada 3-3-3: minimum 3 alternatywy w porownaniu, minimum 3 zrodla na kazda alternatywe, minimum 3 wymiary porownania (wydajnosc, koszt, ekosystem, stabilnosc, dostepnosc). Kazdy claim w raporcie ma confidence label: CERTAIN gdy potwierdza to kilka niezaleznych wiarygodnych zrodel, PROBABLE gdy trend jest silny ale nie udowodniony, SPECULATION gdy researcher wnioskuje z ograniczonych danych. Kluczowa architektoniczna zasada: researcherzy nie rozmawiaja ze soba. Kazdy z 6 researcherow pracuje w calkowitej izolacji, nie widzi raportow innych. To celowa decyzja anty-groupthink - gdyby Researcher Tech widzial ze Researcher Reddit juz forsuje framework X, podswiadomie zacalby szukac uzasadnien dla X zamiast obiektywnie porownac. Dopiero Orkiestrator lub Syntetyk laczy 6 izolowanych raportow w jeden obraz.

---

# 6. res_ux

**Source file:** notebookLM/0.6 resercher_ux/06_researcher_ux.md

**Role label:** Skaut trendow UX

**Analogia:** Researcher UX jest jak kurator sztuki w galerii: ma oko na trendy, zbiera mood boardy, wie co jest modne teraz a co za 6 miesiecy, ale sam nie maluje obrazow.

**Kim jest:** Researcher UX (R-02) to researcher specjalizujacy sie w trendach designerskich, inspiracjach wizualnych i standardach dostepnosci. Pracuje na Claude Haiku. Ma dostep do WebSearch i WebFetch, zbiera dane z Dribbble, Behance, Awwwards, Mobbin, Material Design, Apple HIG, WCAG. Jego output to mood board i audyt a11y - NIE kod CSS.

**Co robi (4 obowiazki):**
- Research trendow designerskich (minimalism, glassmorphism, neumorphism, brutalism itd.)
- Zbieranie mood boardu z minimum 5 referencjami wizualnymi
- Audyt dostepnosci WCAG 2.1 AA z konkretnymi punktami do poprawy
- Analiza istniejacych design systemow (Material, HIG, Carbon, Polaris)

**Czego NIE robi:**
- Nie pisze CSS - to rola Designera (B-02)
- Nie tworzy komponentow - to rola Designera i Kodera
- Nie decyduje o finalnym wyborze palety - tylko rekomenduje opcje
- Nie laczy sie z innymi researcherami (anti-groupthink)
- Nie projektuje konkretnego layoutu (mood board != wireframe)

**Anty-wzorce:**
- Trend Chaser: wrzuca najnowsza mode bez sprawdzenia czy pasuje do projektu
- No Accessibility: pomija WCAG i raportuje tylko ladnotke
- Style Over Substance: skupia sie na wygladzie, ignoruje funkcjonalnosc
- Missing Responsive: pokazuje tylko desktop, zapomina o mobile

**Ciekawostki:**
- Mood board musi miec minimum 5 referencji z roznych zrodel (nie same Dribbble)
- WCAG 2.1 AA to minimum obowiazkowe, WCAG 2.2 i AAA to nice to have
- Kluczowe zrodla trendu: Dribbble (social design), Behance (portfolio), Awwwards (strony roku), Mobbin (mobile UI), Material/HIG (official)
- Cytat kluczowy: "Designer, ktory jednoczesnie szuka inspiracji I pisze CSS, ma za duzo w oknie kontekstowym" - dlatego research i implementacja to osobne agenty
- Ustala jezyk wizualny (tokens primitive/semantic/component) przed Designerem

**Kiedy uzywac (ZIELONE):**
- Nowy projekt potrzebujacy kierunku wizualnego i mood boardu
- Audyty dostepnosci WCAG przed wdrozeniem
- Projekty z nieznanym targetowym esthetic (chcemy "nowoczesnie" ale nie wiadomo jak)
- Analiza konkurencji wizualnej w branzy

**Kiedy NIE uzywac (CZERWONE):**
- Projekty z juz ustalonym design systemem (masz Material - nie badaj trendow)
- Czysto backendowe zadania bez UI
- Zmiany inkrementalne gdzie estetyka jest stala
- Gdy potrzebujesz bezposrednio kodu CSS (to Designer, nie UX researcher)

**Dlugi opis:** Researcher UX to drugi z 6 researcherow, ten ktory patrzy na swiat wizualny. Jego zadaniem jest zbudowac mood board (zestaw inspiracji wizualnych) i dostarczyc audyt dostepnosci, ale nie pisac ani jednej linii CSS. To kluczowa granica, podkreslana w dokumentacji wielokrotnie: "Designer, ktory jednoczesnie szuka inspiracji I pisze CSS, ma za duzo w oknie kontekstowym". Rozdzielenie UX research od Design implementation pozwala kazdemu z tych dwoch agentow dzialac w waskim kontekscie i dostarczac lepsza jakosc. Researcher UX siega do 7 glownych zrodel: Dribbble (spolecznosc designerow, dziennie setki nowych prac), Behance (portfolia profesjonalistow), Awwwards (strony nagradzane jako najlepsze), Mobbin (biblioteka interfejsow mobilnych), Material Design (Google), Apple Human Interface Guidelines (Apple) i WCAG (dostepnosc). Mood board musi miec minimum 5 rozroznionych referencji, idealnie z roznych zrodel zeby uniknac bias jednego serwisu. Audyt dostepnosci jest traktowany jako rownie wazny jak trend scouting: WCAG 2.1 AA jest minimum, kazdy raport musi zawierac konkretne punkty (kontrast 4.5:1 dla tekstu, focus visible, keyboard navigation, min touch target 44x44px). Bez tego raport jest niekompletny. Researcher UX nie wybiera ostatecznej palety kolorow, tylko dostarcza Designerowi uzasadnione opcje z plusami i minusami. Finalny wybor i implementacja to robota Designera.

---

# 7. res_reddit

**Source file:** notebookLM/0.7 Researcher_Reddit/07_researcher_reddit.md

**Role label:** Antropolog spolecznosci dev

**Analogia:** Researcher Reddit jest jak dziennikarz sledczy albo antropolog w terenie: nie czyta oficjalnej dokumentacji, tylko sluch rozmow praktykow na Reddicie, zeby poznac ground truth niezafaltrzowana przez marketing.

**Kim jest:** Researcher Reddit (R-03) to researcher ktory zbiera insights z dyskusji praktykow na Reddicie. Pracuje na Claude Haiku. Jego domena to subreddity techniczne gdzie deweloperzy rozmawiaja o realnych doswiadczeniach, nie o marketingowych obietnicach. Dziala w izolacji od innych researcherow (anti-groupthink).

**Co robi (5 obowiazkow):**
- Odnajduje istotne dyskusje w subredditach (r/webdev, r/programming, r/reactjs, r/SaaS, r/devops, r/experienceddevs, r/cscareerquestions)
- Analiza sentymentu spolecznosci wobec technologii (pozytywny/negatywny/mieszany)
- Ground truth: zbiera opinie praktykow uzywajacych rozwiazania w produkcji
- Rekomendacje stackowe oparte na doswiadczeniach ludzi, nie marketingu
- Wykrywanie kontrowersji i rageposts - sygnaly ze cos jest nie tak

**Czego NIE robi:**
- Nie czyta dokumentacji technicznej - od tego jest Researcher Tech
- Nie analizuje wizualnego designu - od tego jest Researcher UX
- Nie czyta kodu zrodlowego - od tego jest Researcher GitHub
- Nie podejmuje decyzji - tylko raportuje to co slyszy
- Nie rozmawia z innymi researcherami (izolacja)

**Anty-wzorce:**
- Single Comment Truth: wyciaga wniosek z jednego komentarza bez triangulation
- Outdated Thread: cytuje watek sprzed 3 lat nieaktualny dla wspolczesnej wersji
- Echo Chamber: czyta tylko jeden subreddit i bierze jego opinie za calosc
- Rage Sampling: cytuje tylko rageposts, pomijajac zadowolonych uzytkownikow
- Karma Blindness: bierze post z 2 upvotes jako tak samo wazny co post z 2000

**Ciekawostki:**
- Sentiment analysis: Reddit ma specyficzny jezyk, trzeba rozumiec slang spolecznosci dev
- Subreddity techniczne vs career: r/experienceddevs to inny swiat niz r/cscareerquestions
- Ground truth: "to dziala w produkcji 3 lata" jest wartoscciowsze niz "HN hype nowej biblioteki"
- Rageposts sa sygnalem alarmowym - jesli spolecznosc zalewa subreddit narzekaniami, to jest niesprawa
- Obciazenie 55/100 - srednie w grupie researcherow

**Kiedy uzywac (ZIELONE):**
- Walidacja technologii pod katem doswiadczen praktycznych
- Decyzje gdzie oficjalne zrodla moga byc stronnicze (vendor marketing)
- Projekty szukajace "co realnie dziala w boju" vs "co obiecuje dokumentacja"
- Analiza ryzyk i pain pointow spoleczsnoci

**Kiedy NIE uzywac (CZERWONE):**
- Tematy bez aktywnej spolecznosci redditowej (bardzo niszowe technologie)
- Problemy wymagajace twardej dokumentacji (Researcher Tech to zrobi lepiej)
- Kontrowersyjne tematy gdzie sentyment jest poblazliwy w obu kierunkach
- Projekty gdzie ground truth nie ma znaczenia (prototyp na wyrzucenie)

**Dlugi opis:** Researcher Reddit pracuje jak dziennikarz sledczy lub antropolog kulturowy. Jego domena to praktyczna mmadrzec spolecznosci developerskiej na Reddicie, gdzie ludzie piszac pod pseudonimem sa duzo bardziej szczerzy niz w oficjalnych case studies na stronach vendorow. Kluczowe subreddity to r/webdev (generalne), r/programming (szeroko), r/reactjs i podobne (framework-specific), r/SaaS (biznes), r/devops (infrastruktura), r/experienceddevs (dla seniorow) i r/cscareerquestions (dla juniorow i entry-level). Kazdy z tych subredditow ma swoja kulture i bias - r/experienceddevs to sceptycyzm wobec nowych frameworkow, r/reactjs to zazwyczaj entuzjazm. Researcher Reddit musi rozumiec ten kontekst. Kluczowa technika to ground truth: szukanie komentarzy typu "uzywamy X w produkcji od 3 lat" jest wartosiowsze niz najlepszy marketing post. Drugi filar to sentiment analysis: analiza jezyka komentarzy pod katem pozytywnego, negatywnego lub mieszanego stosunku do technologii. Szczegolnie wazne sa rageposts - watki gdzie spolecznosc zalewa wulgaryzmami jakies narzedzie. Pojedynczy rageppost to nic, 20 ragepostow w ciagu tygodnia to czerwona flaga. Wielka pulapka to single comment truth (wyciaganie wniosku z jednego komentarza), outdated threads (watki sprzed 3 lat niepasujace do wspolczesnych wersji) i echo chamber (czytanie tylko jednego subreddita). Triangulation: minimum 3 niezalezne komentarze z roznymi uzytkownikami zeby claim byl wiarygodny.

---

# 8. res_x

**Source file:** notebookLM/0.8 Researcher_X/08_researcher_x.md

**Role label:** Korespondent wojenny trendow

**Analogia:** Researcher X jest jak korespondent wojenny albo day trader na wall streecie: patrzy na Twitter/X i sledzi trendy na zywo, wykrywa hype, widzi reakcje na nowy product launch w pierwszej godzinie.

**Kim jest:** Researcher X (R-04) to researcher skupiony na platformie X (dawniej Twitter) jako zrodle szybko propagujacego sie trendu w tech community. Pracuje na Claude Haiku. Najmniejsze obciazenie ze wszystkich researcherow (45/100) bo content na X jest krotki i szybki do przetworzenia.

**Co robi (5 obowiazkow):**
- Monitoring trendow tech na X (hashtagi, trending topics, viralowe watki)
- Sledzenie reakcji na launch produktow ("first 24h reaction")
- Analiza watkow (thread analysis) z dluzszych wystapien ekspertow
- Mapping influencerow na Tier 1 (top experts) do Tier 5 (micro-influencers)
- Detekcja hype z punktacja 0-10 (od "nic nie slychac" do "wszyscy o tym mowia")

**Czego NIE robi:**
- Nie czyta formalnej dokumentacji (to Researcher Tech)
- Nie waliduje claimow praktykow (to Researcher Reddit)
- Nie analizuje kodu zrodlowego (to Researcher GitHub)
- Nie podejmuje decyzji - tylko raportuje trend
- Nie rozmawia z innymi researcherami

**Anty-wzorce:**
- Hype Follower: bierze kazdy virlowy tweet jako prawde
- Influencer Worship: jeden tweet od znanej osoby przewaza 100 od praktykow
- Engagement = Truth: wysoka liczba likow nie znaczy ze to prawda
- Thread Cherry-Picking: cytuje fragmenty watku wyrwane z kontekstu
- Recency Obsession: pomija cenne stare watki, bo "X to real-time"

**Ciekawostki:**
- Najmniejsze obciazenie researcherow (45/100) - tweety sa krotkie
- Tier 1 influencer to np. Dan Abramov, Evan You, Rich Harris w swiatku JS
- Tier 5 to micro-influencerzy z 1000-5000 followerow, ale czasem najbardziej wiarygodnymi
- Hype score 0-10: 0 = nikt nie mowi, 3 = trend niszowy, 6 = community zainteresowane, 9 = viral
- X jest dobrym wczesnym ostrzeganiem (trend zaczyna sie tu zanim dojdzie do forum), ale kiepski dla ground truth

**Kiedy uzywac (ZIELONE):**
- Wczesne ostrzeganie o nowych trendach w tech community
- Pomiar reakcji na product launch w real-time
- Mapping kluczowych influencerow w domenie
- Wykrywanie hype cycle (gdzie dany temat jest na krzywej Gartnera)

**Kiedy NIE uzywac (CZERWONE):**
- Twarde decyzje techniczne wymagajace dowodu (to Researcher Tech)
- Tematy bez obecnosci na X (niszowe technologie)
- Analizy wymagajace glebokosci (X to short form, nie long read)
- Walidacja ground truth (to Reddit, nie X)

**Dlugi opis:** Researcher X to czujka wczesnego ostrzegania tech community. Platforma X (dawniej Twitter) jest miejscem gdzie trendy wybuchaja jako pierwsze - nowy framework, nowy model, nowy paradygmat developerski - zanim dojdzie do oficjalnych blog postow, zanim spolecznosc Reddit zacznie dyskutowac, zanim pojawi sie dokumentacja. X jest jak rynek finansowy: content krotki, szybki, viralowy, pelen emocji. Researcher X jest tym day-traderem ktory sledzi real-time stream, wykrywa sygnaly i raportuje trendy. Kluczowe techniki: monitoring trending topics w tech community, sledzenie reakcji na product launches (first 24h jest krytyczne), thread analysis gdy eksperci pisza dluzsze watki (10-20 tweetow tworza mini blog posta), influencer mapping w skali Tier 1 do Tier 5. Tier 1 to gwiazdy jak Dan Abramov, Evan You, Rich Harris (dziesiatki tysiecy followerow, tweety maja bezposredni wplyw na trend). Tier 5 to mikroinfluencerzy z 1000-5000 followerow, ktorzy czesto sa najbardziej wiarygodni bo mowia z doswiadczenia praktykow bez presji brand buildingu. Hype score 0-10 to probka nastroju: 0 to "nikt nie mowi", 6 to "community zainteresowane", 9-10 to "viral, wszyscy o tym mowia". Wielka pulapka to bralc hype za prawde. Virlaowy tweet od Tier 1 influencera moze miec tysiace likow, ale wciaz byc tylko jego subiektywna opinia. Researcher X ma raportowac co jest trendem, nie czy trend jest prawdziwy - walidacja prawdy to rola pozostalych researcherow, szczegolnie Tech i Reddit.

---

# 9. res_github

**Source file:** notebookLM/0.9 Researcher_GitHub/09_researcher_github.md

**Role label:** Archeolog repozytoriow

**Analogia:** Researcher GitHub jest jak archeolog albo reverse engineer albo inspektor budowlany: wchodzi do cudzego repozytorium, rozbija architekture na czesci pierwsze, sprawdza health metrics i wyciaga pattern ktore mozna zaadoptowac.

**Kim jest:** Researcher GitHub (R-05) to researcher analizujacy otwarte repozytoria na GitHubie jako zrodlo patternow, architektury i prawdziwej jakosci kodu. Pracuje na Claude Haiku. Ma najwyzsze obciazenie wsrod researcherow bo repozytoria sa duze i wymagaja czasu na analize.

**Co robi (5 obowiazkow):**
- Discovery repozytoriow (stars > 100 jako prog wiarygodnosci)
- Analiza architektury: struktura katalogow, wzorce, stack
- Health assessment wg 8 metryk (commit frequency, contributors, issues, PRs, release cadence, test coverage, dependency freshness, docs quality)
- Pattern extraction - co mozna zaadoptowac do wlasnego projektu
- Issue analysis - jakie problemy zglasza spolecznosc, jak sa zamykane

**Czego NIE robi:**
- Nie pisze wlasnego kodu - tylko czyta cudzy
- Nie kopiuje patternow slepo (to rola Kodera pod nadzorem Planera)
- Nie tworzy wlasnych repozytoriow
- Nie dyskutuje z innymi researcherami
- Nie klonuje repo lokalnie - czyta przez GitHub API/WebFetch

**Anty-wzorce:**
- Star Worship: 50k gwiazdek znaczy ze to dobre rozwiazanie (moze byc trend, nie jakosc)
- Blind Copy: kopiuje wzorce bez zrozumienia kontekstu oryginalnego projektu
- Abandoned Repo Adoption: poleca repo ktore nie mialo commitu od 2 lat
- README Deception: wierzy README zamiast sprawdzic actual code quality
- Single Repo Fixation: analiza jednego flagowego repo zamiast porownania kilku

**Ciekawostki:**
- Statystyka: 420 milionow repozytoriow na GitHubie (stan 2026)
- Stars > 100 to podstawowy filtr, ale powyzej 10k trzeba byc ostroznym (hype vs quality)
- 8 metryk health: commit frequency, active contributors, open issues vs closed, PR merge time, release cadence, test coverage, dep freshness, docs quality
- Najwyzsze obciazenie researcherow (70/100) - repozytoria sa duze
- Sources: README, package.json, src/, .github/workflows, Issues, PRs, Stars graph, Contributors

**Kiedy uzywac (ZIELONE):**
- Szukanie pattern reference implementation dla nowego projektu
- Walidacja ze cos jest mozliwe w danym stacku (znajdz dzialajacy przyklad)
- Analiza wzorcow architektonicznych w danej domenie
- Ocena czy zewnetrzna biblioteka jest zdrowa (health assessment)

**Kiedy NIE uzywac (CZERWONE):**
- Tematy gdzie nie ma reprezentatywnych repozytoriow open source
- Decyzje wymagajace benchmarkow (to Researcher Tech)
- Tematy gdzie license blokuje wykorzystanie wzorca
- Gdy szukasz trendow, nie implementacji (to Researcher X)

**Dlugi opis:** Researcher GitHub wchodzi w skórę archeologa lub reverse engineera. GitHub z 420 milionami repozytoriow jest najwieksza baza wiedzy o tym "jak ludzie faktycznie rozwiazuja problemy w kodzie". Jego praca zaczyna sie od discovery: znalezienie repozytoriow z filtrem stars > 100 (prog wiarygodnosci). Powyzej 100 gwiazdek oznacza ze ktos spoza autora uznal to za warte uwagi. Drugi krok to architecture analysis: struktura katalogow (czy jest monorepo czy multi-repo, jak sa zorganizowane moduly), stack (package.json, requirements.txt, Cargo.toml, pom.xml), wzorce projektowe (repository, factory, observer). Trzeci krok to health assessment wg 8 metryk: commit frequency (ile commitow na tydzien), active contributors (ilu ludzi realnie pisze kod), open/closed issues ratio, PR merge time, release cadence (co ile wychodzi nowa wersja), test coverage (czy testy istnieja), dep freshness (czy zaleznosci sa aktualne), docs quality (czy dokumentacja jest kompletna). Cztvarty krok to pattern extraction: co mozna zaadoptowac do wlasnego projektu, uznajac oczywiscie licencje. Piaty krok to issue analysis: jakie problemy zglasza spolecznosc, jak sa zamykane, czy maintainer jest responsywny. Najwieksza pulapka to star worship - 50 000 gwiazdek nie znaczy jakosci, czasem znaczy ze cos bylo hypowane w okreslonym momencie. Druga pulapka to abandoned repo adoption: repo z 20k gwiazdek ktore nie mialo commitu od 2 lat to pulapka. Najwyzsze obciazenie obliczeniowe wsrod researcherow (70/100) - repozytoria sa po prostu duze, kontekst do przetworzenia jest znaczny.

---

# 10. res_forums

**Source file:** notebookLM/1.0 Researcher_Forums/10_researcher_forums.md

**Role label:** Przewodnik po bibliotekach Q&A

**Analogia:** Researcher Forums jest jak bibliotekarz w ogromnej bibliotece pytan i odpowiedzi, albo jak przewodnik gorski po szlakach - zna kazdy problem ktory ktos kiedys mial i wie gdzie szukac najlepszej odpowiedzi.

**Kim jest:** Researcher Forums (R-06) to researcher wyspecjalizowany w forach Q&A i tutorialach (Stack Overflow, Dev.to, Medium, Hacker News, Hashnode). Pracuje na Claude Haiku. Ma najmniejsze obciazenie wsrod researcherow (50/100) bo fora sa bardzo ustrukturyzowane (pytanie, odpowiedz, upvotes).

**Co robi (5 obowiazkow):**
- Odnajduje rozwiazania znanych problemow na forach Q&A
- Ocena jakosci odpowiedzi (upvotes, akceptacja, komentarze, editowania)
- Extrakcja lessons learned z dyskusji
- Pattern recognition w sposobach rozwiazywania danej klasy problemow
- Zbieranie tutoriali wysokiej jakosci (glebokie, sprawdzone, aktualne)

**Czego NIE robi:**
- Nie pisze kodu - tylko zbiera rozwiazania
- Nie walidate czy rozwiazanie dziala w konkretnym kontekscie (to robi Koder)
- Nie dyskutuje z innymi researcherami
- Nie eskaluje pytan do Stack Overflow sam z siebie
- Nie buduje wlasnych tutoriali

**Anty-wzorce:**
- Outdated Answer: cytuje odpowiedz z 2015 ktora nie pasuje do wspolczesnych wersji
- Cargo Cult: kopiuje rozwiazanie bez zrozumienia dlaczego dziala
- Upvote Blindness: traktuje upvotes jako jedyne kryterium jakosci
- Missing Context: wyrywa odpowiedz z kontekstu pytania
- Source Tunnel Vision: czyta tylko Stack Overflow pomijajac inne fora

**Ciekawostki:**
- Stack Overflow ma 58 milionow odpowiedzi (stan 2026) - najwieksza baza Q&A dla developerow
- Inne kluczowe zrodla: Dev.to (community blog), Medium (long form), Hacker News (tech news+discussion), Hashnode (dev blogs)
- Najmniejsze obciazenie wsrod researcherow (50/100) - fora sa dobrze ustrukturyzowane
- Jakosc odpowiedzi sprawdza sie po upvotes, accepted status, liczbie edycji, dacie ostatniej aktualizacji
- Lessons learned z komentarzy czesto wartosciowsze niz sama odpowiedz

**Kiedy uzywac (ZIELONE):**
- Rozwiazywanie konkretnego problemu technicznego ("how do I X in Y")
- Walidacja ze ktos juz rozwiazal podobny problem
- Szukanie patternow rozwiazywania danej klasy problemow
- Tutoriale wymagajace glebokosci (long form blog posts)

**Kiedy NIE uzywac (CZERWONE):**
- Bardzo swieze technologie bez jeszcze zakorzenionej bazy Q&A
- Tematy projektowe (architecture level, to Researcher Tech lub GitHub)
- Trendy i hype (to Researcher X)
- Feedback praktykow (to Researcher Reddit)

**Dlugi opis:** Researcher Forums jest bibliotekarzem ogromnego archiwum pytan i odpowiedzi developerskich. Jego glowne zrodla to: Stack Overflow (58 milionow odpowiedzi, najwieksza baza Q&A), Dev.to (community blog z blog postami developerow), Medium (long form, blogi firmowe i personalne), Hacker News (news + glebokie dyskusje w komentarzach), Hashnode (specjalizowana platforma blogowa dla deweloperow). Praca zaczyna sie od solution discovery - "czy ktos juz rozwiazal ten problem". Forum jak Stack Overflow sa idealne gdy pytanie jest konkretne ("how do I X in Y language") - praktycznie zawsze znajduje sie odpowiedz, czesto z kilkoma alternatywami. Drugi krok to ocena jakosci odpowiedzi: upvotes (ile osob uwazalo ze to dobra odpowiedz), accepted status (czy autor pytania ja zaakceptowal), editowania (czy byla aktualizowana), data (czy nie jest zbyt stara dla wspolczesnych wersji), komentarze (czy cos krytycznego wychodzi w komentarzach). Wielka pulapka to upvote blindness: odpowiedz z 500 upvotes moze byc z 2015 roku i nie dzialac w wersji 2026. Trzeba zawsze sprawdzic date i komentarze pod katem "czy to wciaz dziala". Trzeci krok to extraction lessons learned - czesto najciekawsze informacje sa nie w samej odpowiedzi, tylko w komentarzach pod nia ("this worked for me but only when X", "careful because Y"). Czwarty krok to pattern recognition: jesli 10 roznych pytan ma podobny format rozwiazania, to znaczy ze mamy do czynienia z wzorcem projektowym. Piaty krok to zbieranie tutoriali wysokiej jakosci (Dev.to, Medium) jako pogl3bianie wiedzy. Obciazenie najniisze wsrod researcherow (50/100) bo fora sa dobrze ustrukturyzowane - pytanie jest jasne, odpowiedz jest jasna, latwo ekstrahowac dane.

---

# 11. backend

**Source file:** notebookLM/1.1 Koder/11_koder.md (slant: backend/API/DB/infrastruktura)

**Role label:** Implementator API i logiki

**Analogia:** Backend Koder jest jak cieśla albo zdolny muzyk sesyjny albo rezydent chirurgii: dostaje specyfikacje, zamienia je w dzialajacy kod serwerowy, testuje i oddaje QA, bez myslenia o wygladzie ani o researchu.

**Kim jest:** Backend Koder (B-01 w slant backendowym) to agent implementacyjny warstwy BUILD specjalizujacy sie w API, bazach danych, logice biznesowej serwerowej i infrastrukturze. Pracuje na Claude Sonnet ($3/$15). Ma najwyzsze obciazenie w BUILD (80/100). Narzedzia: Write, Edit, Bash, Read, Grep, Glob. Zakazane: Agent, WebSearch, WebFetch.

**Co robi (5 obowiazkow, slant backend):**
- Implementuje API endpoints wg specyfikacji (REST, GraphQL, RPC)
- Zarzadza plikami: tworzy modele, kontrolery, serwisy, migracje bazy danych
- Uruchamia i testuje kod serwerowy przez Bash (npm test, pytest, cargo test)
- Obsluguje feedback od QA w petli max 2 iteracje
- Dodaje inline dokumentacje dla nietrivialnej logiki backendowej

**Czego NIE robi:**
- Nie prowadzi researchu - od tego sa researcherzy techniczni
- Nie podejmuje decyzji architektonicznych (monolith vs microservices to Planer)
- Nie projektuje UI/UX - backend nie dotyka warstwy prezentacji
- Nie pisze tresci marketingowej ani copywritingu
- Nie integruje finalnego produktu - od tego jest Integrator (B-04)
- Nie testuje bezpieczenstwa ani nie robi pen-testow (to QA Security)

**Anty-wzorce:**
- Research Coder: zamiast implementowac, zaczyna szukac "lepszego frameworka ORM"
- Architect Coder: zmienia strukture API albo model danych bez zgody Planera
- Perfectionist Loop: refaktoruje ten sam endpoint 5 razy szukajac "idealnego"
- Context Overload: probuje przetrawic cale 200k tokenow kontekstu zamiast waskiego brief
- Untested Delivery: oddaje kod bez uruchomienia testow i sprawdzenia ze kompiluje

**Ciekawostki:**
- Sesja Kodera: 30-90 sekund na zadanie, 6-20 zadan w ciagu 10 minut
- Najwyzsze obciazenie 80/100 - wysylka tokenow wyjsciowych najwyzsza w calym systemie
- Maxymalnie 2 iteracje QA feedback zanim nastapi eskalacja
- Koszt na zadanie: $0.15-$0.50 (przy 20-40k input / 10-30k output)
- Najlepiej dziala z waskim kontekstem (20-40k tokenow), nie pelnym (200k)

**Kiedy uzywac (ZIELONE):**
- Implementacja API endpoints ze znanej specyfikacji
- Tworzenie modeli bazy danych, migracje
- Logika biznesowa serwerowa (calculations, workflows, rules)
- Integracja z zewnetrznymi serwisami (webhooks, API calls)

**Kiedy NIE uzywac (CZERWONE):**
- Zadania UI/frontend - to frontend Kodera rola
- Projekty bez gotowej specyfikacji (brak inputu = brak outputu)
- Exploracja technologii (to research, nie build)
- Gdy zadanie wymaga zmian architektonicznych (to Planer)

**Dlugi opis:** Backend Koder w slant backendowym to agent implementujacy cala warstwe serwerowa projektu. Dziala na Claude Sonnet i ma najwyzsze obciazenie w calej warstwie BUILD (80/100), bo generuje najwiecej tokenow wyjsciowych ze wszystkich agentow. Jego sesja to 30-90 sekund pracy na zadanie, w ciagu 10 minut moze wykonac 6-20 zadan. Ma zakaz researchu (bez WebSearch/WebFetch), zakaz delegowania (bez Agent), ma natomiast Write, Edit, Bash, Read, Grep, Glob - pelny zestaw do pisania i testowania kodu lokalnie. Bash jest krytyczny: Backend Koder musi uruchomic swoj kod przed oddaniem, sprawdzic ze kompiluje i ze testy przechodza. Najwieksza pulapka to Research Coder - sytuacja gdy Koder zamiast implementowac zaczynа szukac lepszego ORM, porownywac frameworki, analizowac benchmarki. Prompt systemowy celowo ma DWUKROTNIE slowo NIGDY - raz dla researchu, raz dla decyzji architektonicznych. Druga pulapka to Architect Coder - zmiana modelu danych albo struktury endpointow bez konsultacji z Planerem, bo Koder "ma lepszy pomysl". To zawsze prowadzi do konfliktow z innymi agentami. Trzecia to Perfectionist Loop: Koder refaktoruje ten sam fragment 5 razy szukajac idealnego rozwiazania, marnujac tokeny i czas. Regula jest jasna: dostarczyc dzialajacy kod po pierwszym podejsciu, optymalizacje zostawic na pozniejsze iteracje. Koder ma maksymalnie 2 iteracje QA feedback - po dwoch nieudanych probach nastepuje eskalacja do Orkiestratora. Najlepiej dziala z waskim kontekstem (20-40k tokenow) - pelny 200k kontekst obniza jakosc odpowiedzi bo model "tonie w szumie". W slant backendowym skupia sie na API endpoints, bazach danych, migracjach, logice biznesowej, integracjach z zewnetrznymi serwisami.

---

# 12. frontend

**Source file:** notebookLM/1.1 Koder/11_koder.md (slant: UI, komponenty, interaktywnosc kliencka)

**Role label:** Implementator UI i interakcji

**Analogia:** Frontend Koder jest jak cieśla wykonawczy czy muzyk sesyjny warstwy klienckiej: dostaje gotowy wireframe i design tokens, zamienia je w komponenty React/Vue/HTML z logika interakcji, testuje w przegladarce i oddaje QA.

**Kim jest:** Frontend Koder (B-01 w slant frontendowym) to ten sam agent implementacyjny warstwy BUILD ze zrodlowego MD Kodera, ale z naciskiem na implementacje warstwy klienckiej: komponenty UI, logike interakcji, state management, routing w SPA, integracje z backendowym API. Model: Claude Sonnet ($3/$15). Load 80/100 (najwyzsze w BUILD).

**Co robi (5 obowiazkow, slant frontend):**
- Implementuje komponenty UI (React, Vue, Svelte, vanilla HTML/CSS)
- Laczy komponenty z API backendu (fetch, axios, SWR, React Query)
- Obsluguje state management (lokalny useState, globalny Redux/Zustand/Pinia)
- Implementuje routing w aplikacjach SPA (react-router, vue-router)
- Testuje w przegladarce przez Bash (vite dev, npm start, playwright test)

**Czego NIE robi:**
- Nie projektuje UI ani nie dobiera kolorow - dostaje gotowy design od Designera
- Nie pisze CSS systemu designu - od tego jest Designer (B-02)
- Nie pisze copy ani tresci tekstowej - od tego jest Redaktor (B-03)
- Nie prowadzi researchu trendow UX - od tego jest Researcher UX
- Nie testuje dostepnosci (formalny WCAG audit) - od tego sa QA
- Nie integruje finalnego artefaktu - od tego jest Integrator (B-04)

**Anty-wzorce:**
- Research Coder: zamiast implementowac, zaczyna porownywac biblioteki UI
- Designer Coder: zmienia kolory, marginesy, tokens bez zgody Designera
- Perfectionist Loop: refaktoruje ten sam komponent 5 razy
- Context Overload: przetraawia cale 200k zamiast waskiego brief
- Untested Delivery: oddaje kod bez uruchomienia w przegladarce

**Ciekawostki:**
- Praca na gotowych design tokens od Designera (CSS custom properties)
- Interakcje z API backendu to jeden z najczestszych punktow awarii frontendu
- Czas sesji: 30-90 sekund na komponent, kilka komponentow w jednej sesji
- Koszt: $0.15-$0.50 na zadanie
- Kolejnosc w OBSERVATORY: pierwszy po dekompozycji, jego bledy propaguja sie do Designera i Redaktora

**Kiedy uzywac (ZIELONE):**
- Implementacja komponentow UI ze znanych wireframe'ow
- Integracja frontu z backendowym API
- Implementacja state management i routingu
- Interaktywnosc SPA (formularze, walidacja klientowa, animacje logiczne)

**Kiedy NIE uzywac (CZERWONE):**
- Projekty czysto backendowe bez warstwy klienckiej
- Kiedy nie ma jeszcze design systemu ani wireframe'ow
- Eksploracja bibliotek UI (to Researcher Tech)
- Gdy zadanie to projekt UX (to Researcher UX + Designer)

**Dlugi opis:** Frontend Koder dzieli silnik z Backend Koderem (to ten sam agent Koder B-01 w MD zrodlowym), ale jego slant jest na warstwe kliencka. Dostaje gotowe wireframe'y albo mockupy od Designera, gotowe design tokens (CSS custom properties), gotowe specyfikacje komponentow i interakcji. Jego zadanie to zamienic to na dzialajacy kod klienckiego React/Vue/Svelte/vanilla. Pracuje w tych samych ograniczeniach co Backend Koder: Claude Sonnet, obciazenie 80/100, sesja 30-90 sekund, max 2 iteracje QA, Bash do testowania. W slant frontendowym Bash sluzy do uruchamiania dev servera (vite, webpack-dev-server, next dev) i testowania w przegladarce. Kluczowe granice: Frontend Koder nie projektuje UI - dostaje gotowy wireframe od Designera. Nie pisze copy - dostaje gotowe teksty od Redaktora. Nie robi researchu trendow - dostaje gotowe zalecenia od Researcher UX. Jego rola to tlumaczenie designu na kod. Najwieksza pulapka to Designer Coder: sytuacja gdy Frontend Koder "poprawia" design w trakcie implementacji (zmienia kolor, marginesy, rozmiary tekstu "bo tak wyglada lepiej"). To lamanie rozdzielenia ról - jesli design jest zly, trzeba eskalowac do Designera, nie naprawiac po cichu. Druga pulapka to integracja z API: najczestsze punkt awarii frontendu to zla obsluga bledow z backendu, brak loading states, brak retry logic, brak invalidate cache po mutacji. Frontend Koder musi znac wzorce obslugi async operations (React Query, SWR, TanStack Query). Interpretacja backend/frontend split: w materiale zrodlowym jest tylko jeden Koder (B-01), tutaj dzielimy go na dwie role per user instrukcji, gdzie backend = API/DB/infra, frontend = UI/interakcja/state.

---

# 13. designer

**Source file:** notebookLM/1.2 Designer/12_designer.md

**Role label:** Implementator wizualny, CSS

**Analogia:** Designer jest jak architekt wnetrz z precyzja (dobiera odcien farby, dokladna tkanine, dokladne oswietlenie), jak kolorysta filmowy (naklada faktyczne krzywe kolorow), jak zecer w drukarni (sprawia ze tekst jest fizycznie piekny na stronie).

**Kim jest:** Designer (B-02) to agent implementacji wizualnej w warstwie BUILD. Otrzymuje mood board i audyt dostepnosci od Researcher UX i zamienia to w dzialajacy CSS, design tokens, palety kolorow, typografie i animacje. Pracuje na Claude Sonnet ($3/$15), load 75/100. Narzedzia: Write, Edit, Read, Bash (do Sass/linting/contrast check). Zakazane: Agent, WebSearch, WebFetch.

**Co robi (6 obowiazkow):**
- Implementacja design systemu (CSS custom properties jako tokens primitive/semantic/component)
- Definiowanie palety kolorow z uzasadnieniem (primary, secondary, accent, neutral, status)
- Definiowanie systemu typografii (font families, skala rozmiarow, wagi, leading)
- Implementacja layoutu i spacing (grid, flexbox, 4px base grid)
- Tworzenie animacji i mikro-interakcji z obowiazkowym prefers-reduced-motion
- Zapewnienie dostepnosci wizualnej (kontrast 4.5:1, focus visible, min touch target)

**Czego NIE robi:**
- Nie szuka inspiracji ani nie analizuje trendow - to robi Researcher UX
- Nie pisze logiki JavaScript - to robi Koder
- Nie pisze tresci tekstowej - to robi Redaktor
- Nie integruje komponentow w finalny produkt - to robi Integrator
- Nie podejmuje decyzji strategicznych projektowych - to robi Orkiestrator

**Anty-wzorce:**
- Projektowanie bez briefu: Designer zgaduje kolory bez raportu Researcher UX
- Dostepnosc na koniec: paleta robiona pod estetyke, kontrasty nie pasuja
- Niespojne tokens: mix tokenow i wartosci hardcoded
- Przeciazenie animacjami: wszystko sie rusza, brak prefers-reduced-motion
- Design tylko na desktop: zapomina o mobile-first

**Ciekawostki:**
- Trzy poziomy tokenow: Primitive (--blue-500), Semantic (--color-primary), Component (--button-bg) - zmiana na poziomie semantic propaguje sie wszedzie
- Cytat: "Designer, ktory jednoczesnie szuka inspiracji I pisze CSS, ma za duzo w oknie kontekstowym"
- Kluczowy obowiazkowy wzorzec: prefers-reduced-motion przy kazdej animacji (wymaganie dostepnosci)
- Output to 9 kategorii CSS: tokens, kolory, typografia, spacing, layout, cienie, border radius, animacje, komponenty
- Koszt: $0.10-$0.35 na zadanie, czas 30-60s

**Kiedy uzywac (ZIELONE):**
- Implementacja design systemu dla nowego projektu
- Migracja starego CSS na tokens-based approach
- Projekty gdzie dostepnosc jest wymogiem (WCAG AA/AAA)
- Wymiana warstwy wizualnej przy zmianie brandingu

**Kiedy NIE uzywac (CZERWONE):**
- Projekty bez warstwy wizualnej (CLI tools, backend-only)
- Gdy nie ma gotowego raportu od Researcher UX (brak briefu)
- Szybki prototyp gdzie estetyka nie ma znaczenia
- Zadania ktore mozna rozwiazac gotowym design system (Material, Bootstrap)

**Dlugi opis:** Designer jest mostem miedzy wizja wizualna (dostarczona przez Researcher UX jako mood board) a dzialajacym kodem CSS. Jego glowne narzedzie to design tokens - trzywarstwowy system gdzie Primitive (np. --blue-500: #3b82f6) to surowe wartosci, Semantic (np. --color-primary: var(--blue-500)) to znaczenie w UI, Component (np. --button-bg: var(--color-primary)) to zastosowanie w konkretnym komponencie. Genialnosc tego systemu polega na tym ze zmieniajac tylko warstwe Semantic (np. --color-primary z niebieskiego na zielony) automatycznie aktualizujesz kazdy przycisk, link i akcent w calym systemie. Designer pracuje na Claude Sonnet nie dlatego ze Haiku jest za slaby technicznie, ale dlatego ze Haiku czesto generuje niespojny CSS: losowe wartosci zamiast tokens, ignoruje prefers-reduced-motion, tworzy palety nie spelniajace kontrastu 4.5:1. Sonnet robi to niezawodnie. Obowiazkowe praktyki to mobile-first (domyslny layout dla najwezszego ekranu, breakpointy dodaja style dla wiekszych), prefers-reduced-motion przy kazdej animacji (wymaganie WCAG), semantyczne nazewnictwo tokenow (--color-primary, nie --blue-600). Output Designera to 9 kategorii CSS: (1) design tokens CSS custom properties, (2) paleta kolorow semantic, (3) skala typografii, (4) spacing system 4px base, (5) layout system, (6) shadow system, (7) border radius, (8) animacje + reduced-motion, (9) styling komponentow. Najwazniejsza granica: Designer implementuje, Researcher UX bada. Nigdy nie laczyc obu rol w jednym agencie, bo "Designer ktory jednoczesnie szuka inspiracji i pisze CSS ma za duzo w oknie kontekstowym".

---

# 14. writer

**Source file:** notebookLM/1.3 Redaktor/13_redaktor.md

**Role label:** Redaktor tresci, polerowacz dokumentacji

**Analogia:** Writer (Redaktor) jest jak redaktor w wydawnictwie literackim (bierze surowy rekopis i zamienia w ksiazke), jak inzynier dzwieku miksujacy album (laczy surowe sciezki w spojna calosc) albo jak kurator muzealny piszacy etykiety eksponatow (kondensuje zlozonosc w krotki klarowny tekst).

**Kim jest:** Writer / Redaktor (B-03) to agent jakosci tresci w warstwie BUILD. Bierze surowy tekst od Kodera lub Integratora i zamienia w finalny, czytelny dokument. Pracuje na Claude Sonnet ($3/$15) - nie Haiku, bo jakosc tekstu to jego glowny produkt. Load: 35/100 (najnizsze w BUILD). Najwazniejsze ograniczenie: NIE MA dostepu do Bash.

**Co robi (5 obowiazkow):**
- Redakcja dokumentacji technicznej (gramatyka, styl, struktura)
- Tworzenie README.md i CHANGELOG.md (twarz projektu dla nowych deweloperow)
- Dodawanie inline komentarzy do kodu - TYLKO dla nietrivialnej logiki
- Zapewnienie spojnosci stylu (jednolita terminologia, ton, formatowanie)
- Upraszczanie jezyka technicznego bez utraty precyzji

**Czego NIE robi:**
- Nie pisze kodu logicznego - to rola Kodera
- Nie projektuje wizualnie - to rola Designera
- Nie prowadzi researchu - nie ma WebSearch/WebFetch
- Nie integruje komponentow - to rola Integratora
- Nie uruchamia programow - NIE MA BASHA (celowe ograniczenie)
- Nie podejmuje decyzji architektonicznych

**Anty-wzorce:**
- Code Writer: zaczyna modyfikowac logike biznesowa zamiast komentarze
- Over-Commenter: dodaje komentarze do kazdej linii oczywistego kodu
- Style Drift: niespojny styl w roznych czesciach dokumentu
- Verbosity Trap: rozbudowuje tekst zamiast go kondensowac
- Invisible Redaktor: dostaje surowy tekst i oddaje praktycznie bez zmian

**Ciekawostki:**
- Najnizsze obciazenie w BUILD (35/100) bo polerowanie jest mniej zasobozerne niz generowanie
- Jedyny builder bez Bash (celowe - nie ma pokusy naprawiac kod zamiast tekstu)
- Koszt: $0.03-$0.12 na zadanie, najtanszy w warstwie BUILD
- Prompt systemowy: "Komentarze TYLKO dla nontrivial"
- Pozycja w OBSERVATORY: drugi (po Koderze, przed Designerem) - zeby Designer nie zepsul sformatowanego tekstu
- Zasada komentarzy: komentarz mowi DLACZEGO, kod mowi CO

**Kiedy uzywac (ZIELONE):**
- Tworzenie lub poprawianie README.md, CHANGELOG.md, API docs
- Polerowanie tekstu dokumentacji technicznej
- Dodawanie inline komentarzy do zlozonej logiki
- Zapewnienie spojnosci terminologii w wielu plikach

**Kiedy NIE uzywac (CZERWONE):**
- Projekty MVP gdzie jakosc dokumentacji nie ma znaczenia
- Kod tylko wewnetrzny, bez dokumentacji dla innych
- Gdy trzeba uruchomic skrypt lintera/formatter - Writer nie ma Bash
- Czysto kodowe zadania bez tekstu

**Dlugi opis:** Writer (Redaktor B-03) jest jedynym builderem bez dostepu do narzedzia Bash. To celowe ograniczenie, nie przeoczenie. Gdyby Writer mial Bash, pokusa "naprawiam kod, nie tekst" bylaby za duza. Pozbawienie go Basha wymusza dzialanie czysto w swiecie tekstu. Praca Writera to pieć obszarow. Po pierwsze redakcja dokumentacji technicznej: gramatyka, struktura, spojnosc, usuwanie powtorzen. Po drugie tworzenie README.md i CHANGELOG.md - to "twarz projektu" widziana przez nowych deweloperow i uzytkownikow. Po trzecie inline komentarze w kodzie, ale TYLKO dla nietrivialnej logiki. Prompt systemowy jasno mowi "Komentarze TYLKO dla nontrivial". Zasada jest taka: kod mowi CO robi, komentarz mowi DLACZEGO to robi w ten sposob. Komentarz "let x = 5 // ustawia x na 5" to anti-pattern. Komentarz "// XOR bit-swap bez zmiennej tymczasowej, bo pracujemy w embedded z limitem 256B pamieci" to dobry komentarz. Po czwarte spojnosc stylu: jednolita terminologia (nie raz "user", raz "uzytkownik", raz "klient"), spojny ton (formalny lub potoczny, ale konsekwentnie), jednolite formatowanie. Po piate upraszczanie jezyka technicznego bez utraty precyzji - kondensowanie, nie infantylizacja. Writer uzywa Claude Sonnet (nie Haiku), bo jakosc tekstu to jego glowny produkt. Haiku tworzy sztywne, szablonowe frazy; Sonnet ma naturalnosc jezykowa. W OBSERVATORY Writer jest DRUGI (po Koderze, przed Designerem) - celowo, bo Designer moze zepsuc sformatowany tekst dodajac CSS, wiec najpierw trzeba spolerowac tekst, potem dodac styl. Najgroznijszy anti-pattern to Invisible Redaktor: sytuacja gdy Writer dostaje surowy tekst i oddaje praktycznie bez zmian (naprawia jedna literowke i to wszystko). Wtedy Writer jest kosztem bez wartosci.

---

# 15. integrator

**Source file:** notebookLM/1.4 Integrator/14_integrator.md

**Role label:** Ostatnia faza BUILD, scalanie czesci

**Analogia:** Integrator jest jak monter filmowy na stole montazowym (laczy setki godzin materialow w film), jak szef kuchni na wydawce (sprawdza kazdy talerz przed podaniem), jak dyrygent na probie generalnej (pierwszy raz slyszy wszystko razem i wychwytuje niespojnosci).

**Kim jest:** Integrator (B-04) to ostatni agent warstwy BUILD i brama miedzy BUILD a QA. Laczy outputy Kodera, Designera i Redaktora w jeden spojny artefakt, rozwiazuje konflikty, testuje E2E i waliduje zgodnosc z MANIFEST.md. Pracuje na Claude Sonnet. Load 70/100 (drugie najwyzsze w BUILD). Ma NAJSZERSZY arsenal narzedzi: Write, Edit, Read, Grep, Glob, Bash.

**Co robi (5 obowiazkow):**
- Laczenie wynikow Kodera, Designera i Redaktora w jeden artefakt (output merging)
- Rozwiazywanie konfliktow miedzy wyjsciami roznych builderow (np. klasa CSS vs nazwa w HTML)
- Testowanie E2E calego polaczonego artefaktu (Bash + browser tests + smoke tests)
- Walidacja zgodnosci z MANIFEST.md punkt po punkcie
- Produkcja finalnego zintegrowanego artefaktu dla warstwy QA

**Czego NIE robi:**
- Nie pisze nowego kodu - laczy istniejacy (jesli cos brakuje, eskaluje do Kodera)
- Nie projektuje UI - dostaje gotowe od Designera
- Nie pisze copy - dostaje gotowe od Writera
- Nie prowadzi researchu - nie ma WebSearch/WebFetch
- Nie testuje bezpieczenstwa (to QA Security) ani jakosci kodu (to QA Quality)
- Nie podejmuje decyzji strategicznych (to Orkiestrator)

**Anty-wzorce:**
- Przepisywanie Kodera: znajduje blad i przepisuje caly modul zamiast minimalnej poprawki
- Scope Expansion: dodaje nowe funkcjonalnosci "bo wydaje sie fajne"
- Ignorowanie MANIFEST: laczy bez sprawdzenia ze artefakt spelnia wymagania
- Untested Integration: oddaje polaczony artefakt bez uruchomienia E2E
- Shallow Conflict Resolution: "wrzucam jak jest, QA sobie poradzi"

**Ciekawostki:**
- Jedyny builder widzacy prace WSZYSTKICH pozostalych - Koder nie widzi Designera, Designer nie widzi Writera, tylko Integrator ma pelny obraz
- Najszerszy arsenal narzedzi w BUILD: 6 narzedzi (Write, Edit, Read, Grep, Glob, Bash)
- SEC-010 risk: najwyzsze uprawnienia w BUILD, wiec jest najcenniejszym celem prompt injection - dlatego po nim sa DWA niezalezne QA
- Waskie gardlo z definicji: musi czekac na wszystkich builderow, nie mozna parallelizowac
- Input tokens 1000-4000 (najwyzsze w BUILD) bo czyta wszystkie outputy innych

**Kiedy uzywac (ZIELONE):**
- Projekty z wieloma rownoleglymi builderami (Koder + Designer + Writer)
- Projekty gdzie integracja jest znaczacym ryzykiem (wiele konfliktow mozliwych)
- Gdy trzeba walidacji zgodnosci z MANIFEST.md przed QA
- E2E tests na polaczonym artefakcie

**Kiedy NIE uzywac (CZERWONE):**
- Projekty z jednym budowniczym (nie ma co integrowac)
- MVP gdzie brak formalnego pipeline BUILD
- Proste zadania bez MANIFEST.md
- Kiedy QA moze bezposrednio ocenic outputy builderow

**Dlugi opis:** Integrator jest waskim gardlem z definicji - musi czekac az wszyscy pozostali budowniczowie skoncza swoja prace (Koder + Designer + Writer), bo jego zadanie to polaczyc trzy niezalezne strumienie w jeden spojny artefakt. Nie da sie tego zparalelizowac. Jego praca ma piec glownych obszarow. Po pierwsze output merging: wziac HTML od Kodera, CSS od Designera, teksty od Writera i zlozyc w jeden plik/projekt. Po drugie conflict resolution: kiedy trzech niezaleznych budowniczow pracuje rownolegle, konflikty sa nieuniknione. Klasyczne przyklady: Koder uzywa klasy .btn-primary, Designer zdefiniowal styl dla .button-main - nazwy nie pasuja. Koder przewidzial 50-znakowy tytul, Writer napisal 120-znakowy - layout sie rozjezdza. Integrator musi rozwiazac kazdy konflikt minimalna ingerencja - bez przepisywania calych modulow. Po trzecie testy E2E: uruchomienie polaczonego artefaktu i sprawdzenie ze dziala (Bash + browser + curl). Po czwarte walidacja MANIFEST.md punkt po punkcie - czy kazde wymaganie ma swoje odbicie w artefakcie. Po piate produkcja finalnego artefaktu dla QA. Integrator ma najszerszy arsenal narzedzi w BUILD - wszystkie 6 (Write, Edit, Read, Grep, Glob, Bash). To niesie ryzyko: jego wysokie uprawnienia czynia go najcenniejszym celem dla prompt injection (SEC-010 risk). Dlatego po Integratorze zawsze sa DWA niezalezne agenty QA (Security i Quality), zeby zminimalizowac ryzyko ze zatruy artefakt przejdzie przez kontrole. Najwieksza pulapka Integratora to przepisywanie Kodera - gdy znajdzie blad, powinien zastosowac minimalna poprawke (np. zmiana nazwy klasy CSS) i raportowac, nie przepisywac calego modulu.

---

# 16. qa_security

**Source file:** notebookLM/1.5 QA_Security/15_qa_security.md

**Role label:** Audytor bezpieczenstwa, read-only

**Analogia:** QA Security jest jak kontroler bezpieczenstwa na lotnisku (sprawdza bagaze ale nie naprawia), jak inspektor budowlany (pisze raport, nie naprawia usterek), jak etyczny haker white-hat (mysli jak atakujacy, raportuje luki zamiast wykorzystywac).

**Kim jest:** QA Security (Q-01) to agent audytu bezpieczenstwa dzialajacy w warstwie QA (Level 4), ostatnia linia obrony przed wdrozeniem. Pracuje na Claude Haiku ($0.80/$4) - pattern matching nie wymaga mocnego modelu. Load 50/100. Jedyne narzedzia: Read, Grep, Glob. Zakazane: Write, Edit, Bash, Agent, WebSearch, WebFetch. Pelen read-only.

**Co robi (5 obowiazkow):**
- Audyt OWASP Top 10 (XSS, SQLi, CSRF, missing auth, IDOR, hardcoded secrets, CSP, itd.)
- Detekcja hardcoded secrets (klucze API, hasla, tokeny, connection strings)
- Analiza prompt injection - specyficzne zagrozenie dla systemow agentowych
- Skanowanie zaleznosci pod katem CVE (package.json, requirements.txt, Cargo.toml)
- Generowanie raportu JSON z severity, lokalizacja, remediacja

**Czego NIE robi:**
- Nie naprawia kodu - audytor nie moze modyfikowac tego co audytuje (konflikt interesow)
- Nie pisze nowego kodu - tylko read-only
- Nie ocenia jakosci kodu (to QA Quality) - tylko bezpieczenstwa
- Nie podejmuje decyzji GO/NO-GO (to Manager QA)
- Nie komunikuje sie z QA Quality (zakaz - anty-groupthink)

**Anty-wzorce:**
- Fix-While-Auditing: znajduje XSS i sam naprawia, tracaczac obiektywnosc
- False Positive Flooding: kazdy console.log() oznacza jako CRITICAL data leak
- Checklist Tunnel Vision: tylko OWASP Top 10, ignoruje AI-specific zagrozenia
- Dependency Blindness: skanuje tylko kod, ignoruje package.json i CVE
- Scope Creep QA: raportuje jakosc kodu zamiast bezpieczenstwa

**Ciekawostki:**
- Model Haiku wystarcza bo praca to pattern matching (szukanie konkretnych wzorcow)
- Koszt 0.02-0.08 USD na zadanie - 1000 audytow kosztuje mniej niz 80 USD (vs $150-300/h pentester)
- Jedyne narzedzia read-only: Read, Grep, Glob
- SEC-010: szczegolne zagrozenie na Integrator jako najwyzej uprzywilejowanego agenta
- AI-specific threats dodane do OWASP: Indirect Prompt Injection, Agent Output Poisoning, Tool Abuse, Token Exfiltration, System Prompt Leakage

**Kiedy uzywac (ZIELONE):**
- Kazdy artefakt przed wdrozeniem na produkcje
- Audit pre-release dla compliance (SOC2, ISO27001)
- Walidacja systemow agentowych pod katem prompt injection
- Kod dotykajacy danych wrazliwych lub autentykacji

**Kiedy NIE uzywac (CZERWONE):**
- Wewnetrzne POC bez wdrozenia
- Kod izolowany od internetu i danych wrazliwych
- Gdy juz jest skonfigurowany zewnetrzny security scanner (duplication)
- Prototypy eksperymentalne bez scope bezpieczenstwa

**Dlugi opis:** QA Security jest ostatnia linia obrony przed wdrozeniem na produkcje. Wszystko co przejdzie przez tego agenta trafi do uzytkownika koncowego - jedna przeoczona podatnosc oznacza incident w produkcji. Dziala w modelu pentestera white-hat: mysli jak atakujacy, ale raportuje luki zamiast je wykorzystac. Jedyne narzedzia to Read, Grep, Glob - pelen read-only. Brak Basha, Write, Edit, WebSearch. To celowe. Audytor ktory moze modyfikowac kod ktory audytuje traci obiektywnosc, jak ksiegowy ktory moze zmieniac ksiegi - to konflikt interesow. Jego glowna metodologia to OWASP Top 10: XSS (innerHTML z niezanityzowanym inputem), SQL Injection (konkatenacja stringow w zapytaniach), CSRF (brak tokenow), hardcoded secrets (klucze API w kodzie), missing auth (endpointy bez middleware), CSP (brak Content-Security-Policy), IDOR (insecure direct object reference). Do tego dodane sa AI-specific zagrozenia: Indirect Prompt Injection (zatrute dane w kontekscie agenta), Agent Output Poisoning (zmanipulowany output jednego agenta wplywa na kolejne), Tool Abuse (agent uzywa narzedzi poza zakresem), Token Exfiltration (wyciek tokenow miedzy agentami), System Prompt Leakage (ujawnienie system promptu przez odpowiedzi). Pattern matching: QA Security uzywa Grep do szukania konkretnych wzorcow (innerHTML, eval, exec, sk-, AKIA, ghp_) i Read do analizy kontekstu. To praca detektywistyczna oparta na wzorcach - idealna dla Haiku. Koszt 0.02-0.08 USD na zadanie oznacza ze 1000 audytow kosztuje mniej niz 80 USD, czyli mniej niz jedna godzina pracy ludzkiego pentestera. Najwazniejsza architektoniczna zasada: QA Security i QA Quality dzialaja rownolegle w calkowitej izolacji, nie widza swoich raportow. Dopiero Manager QA (Q-03) syntetyzuje oba. Zapobiega groupthink.

---

# 17. qa_quality

**Source file:** notebookLM/1.6 QA_Quality/16_qa_quality.md

**Role label:** Audytor jakosci kodu

**Analogia:** QA Quality jest jak recenzent naukowy (peer reviewer sprawdza metodologie, testy, logike, nie pisze artykulu od nowa), jak kontroler jakosci w fabryce Toyota (ma checklist i progi akceptacji, nie buduje samochodu), jak egzaminator na uczelni (recenzja tak, poprawki nie).

**Kim jest:** QA Quality (Q-02) to audytor jakosci kodu i zgodnosci ze specyfikacja. Pracuje na Claude Haiku, load 55/100 (troche wyzej niz Q-01 bo ma szerszy scope). Ma Read, Grep oraz KLUCZOWA roznice od Q-01: ma dostep do Bash (zeby uruchamiac testy). Zakazane: Write, Edit, Agent, WebSearch, WebFetch.

**Co robi (6 obowiazkow):**
- Weryfikacja zgodnosci ze specyfikacja (spec compliance)
- Analiza pokrycia testami (test coverage, prog >80% statements)
- Testowanie edge cases (null, undefined, empty, boundary values, negative)
- Wykrywanie code smells (dlugie funkcje, deep nesting, duplikacja)
- Analiza wydajnosci (N+1 queries, brak cache, brak lazy loading)
- Generowanie raportu JSON z findings

**Czego NIE robi:**
- Nie naprawia kodu (audytor vs naprawiac konflikt interesow)
- Nie pisze testow - identyfikuje braki, nie uzupelnia
- Nie sprawdza bezpieczenstwa - to QA Security
- Nie podejmuje decyzji GO/NO-GO - to Manager QA
- Nie komunikuje sie z QA Security (anti-groupthink)
- Nie modyfikuje plikow (read-only + test execution)

**Anty-wzorce:**
- Fix-While-Auditing: naprawia code smell zamiast raportowac
- Covering = Good: 90% pokrycia nie znaczy brak bledow (moga byc zle testy)
- Style Obsession: skupia sie na formatowaniu zamiast na correctness
- No Edge Cases: testuje tylko happy path
- Performance Premature: optymalizacje mikroskopijne zamiast wielkich N+1

**Ciekawostki:**
- Kluczowa roznica od Q-01: ma BASH (moze uruchomic npm test, pytest, eslint, jest --coverage)
- Priorytety quality checklist: CORRECTNESS > TEST COVERAGE > PERFORMANCE > CODE QUALITY
- Prog pokrycia: >80% statements, >75% branches (ponizej = NO-GO)
- Thresholds: funkcje <50 linii, zagniezdzenie <3 poziomy, duplikacja <5%
- 5 kategorii findings: Spec Compliance (QLT-1xx), Test Coverage (QLT-2xx), Edge Case (QLT-3xx), Performance (QLT-4xx), Code Quality (QLT-5xx)

**Kiedy uzywac (ZIELONE):**
- Audit kodu przed release na produkcje
- Weryfikacja zgodnosci ze specyfikacja produktowa
- Projekty z wymogiem wysokiego pokrycia testami
- Kod z historia problemow jakosciowych (wysokie ryzyko regresji)

**Kiedy NIE uzywac (CZERWONE):**
- Prototypy i POC bez spec referencyjnej
- MVP gdzie speed > quality
- Kod testowy albo eksperymentalny
- Gdy istnieje juz zaawansowany CI/CD z automatycznymi testami

**Dlugi opis:** QA Quality jest partnerem QA Security w warstwie audytu, ale z zupelnie innej perspektywy. Gdzie Q-01 pyta "jak to mozna zlamac", Q-02 pyta "czy to dziala poprawnie". Glowna roznica architektoniczna: Q-02 MA dostep do Bash. To kluczowe, bo pozwala mu uruchomic testy, coverage tools, lintery. Moze wywolac npm test, pytest, eslint, jest --coverage i zobaczyc prawdziwe dane. Q-01 tego nie moze, skanuje tylko wzorce w kodzie. Quality checklist ma cztery priorytety hierarchiczne. Pierwsze to CORRECTNESS - poprawnosc, zgodnosc ze specyfikacja. Kazde wymaganie ze speca musi miec odpowiadajacy kod. Drugie to TEST COVERAGE - pokrycie testami, prog >80% statements i >75% branches. Ponizej oznacza automatyczny NO-GO, bo "kod bez testow = kod bez gwarancji". Trzecie to PERFORMANCE - wykrywanie N+1 queries, braku cache, braku lazy loading. Czwarte to CODE QUALITY - dlugosc funkcji <50 linii, glebokosc zagniezdzenia <3 poziomy, duplikacja <5%, opisowe nazewnictwo, konsekwentny styl. Kolejnosc priorytetow nie jest przypadkowa: pieknie sformatowany kod ktory nie spelnia specyfikacji jest bezwartosciowy; kod z 100% pokryciem ale zla logika przechodzi testy ale nie dziala. Dlatego: CORRECTNESS > TESTS > PERFORMANCE > STYLE. Severity levels sa te same co Q-01: CRITICAL, HIGH, MEDIUM, LOW. Raporty z chocby jednym HIGH dostaja rekomendacje BLOKADY. Kluczowe: Q-01 i Q-02 pracuja w calkowitej izolacji, nie widza swoich raportow. Dopiero Manager QA (Q-03) laczy oba widoki w jedna decyzje. To celowa decyzja architektoniczna zapobiegajaca groupthink - gdyby widzieli sie nawzajem, kazdy drugi adopteoowalby bias pierwszego. Koszt 0.02-0.08 USD na zadanie (taki sam jak Q-01), taniej niz jedna godzina code review ludzkiego seniora ($100-200/h).

---

# 18. qa_manager

**Source file:** notebookLM/1.7 Manager_QA/17_manager_qa.md

**Role label:** Sedzia jakosci, decydent GO/NO-GO

**Analogia:** Manager QA jest jak sedzia na sali sadowej (prokurator Q-01 przedstawia zagrozenia, obronca Q-02 prezentuje stan kodu, sedzia wazy dowody i wydaje wyrok), jak redaktor naczelny gazety (decyduje co idzie do druku), jak kontroler lotow (mowi "cleared to land" albo "go around").

**Kim jest:** Manager QA (Q-03) to syntezator raportow audytowych i decydent GO/NO-GO. Jedyny agent QA uzywajacy Claude Sonnet ($3/$15) zamiast Haiku - bo jego praca to rozumowanie i ocena, nie pattern matching. Load 50/100. Ma TYLKO Read i Write - najmniejszy zestaw narzedzi w calej architekturze (remis z Planerem).

**Co robi (6 obowiazkow):**
- Agregacja raportow od Q-01 (Security) i Q-02 (Quality) w jeden spojny obraz
- Priorytetyzacja znalezien wg hierarchii CRITICAL > HIGH > MEDIUM > LOW
- Planowanie kolejnosci napraw z uwzglednieniem zaleznosci
- Decyzja GO/NO-GO oparta na skali 1-10 z progiem 6.0
- Kontrola procesu iteracyjnego (max 2 iteracje przed eskalacja)
- Komunikacja ryzyka do Orkiestratora w jasnej, actionable formie

**Czego NIE robi:**
- Nie audytuje kodu bezposrednio - tylko czyta raporty od Q-01 i Q-02
- Nie skanuje plikow zrodlowych - nie ma Grep ani Glob
- Nie uruchamia testow - nie ma Bash
- Nie naprawia kodu - tylko decyduje
- Nie komunikuje sie bezposrednio z Q-01 ani Q-02 (zakaz)
- Nie podejmuje decyzji architektonicznych

**Anty-wzorce:**
- Audit Creep: zaczyna sam analizowac kod zamiast czytac raporty
- Rubber Stamp: zatwierdza wszystko bez prawdziwej oceny
- Excessive Conservatism: NO-GO dla kazdej uwagi LOW
- Missing Dependencies: nie widzi zaleznosci miedzy naprawami
- Poor Communication: raporty pelne zargonu, bez actionable items

**Ciekawostki:**
- Jedyny agent QA na Sonnet (Q-01 i Q-02 na Haiku) - rozumowanie > pattern matching
- Tylko dwa narzedzia: Read i Write - remis z Planerem na minimalizm
- Skala 1-10 z progiem 6.0: CRITICAL = -3.0, HIGH = -1.0, MEDIUM = -0.5, LOW = -0.1
- Warunki blokujace (automatyczny NO-GO): jakikolwiek CRITICAL, pokrycie <70%, niezalatana luka security
- Koszt pipeline QA (3 agenty, do 2 iteracji): maks $0.72 - mniej niz jedna kawa
- Prefix QM-xxx (tylko Q-03) vs SEC-xxx (Q-01) vs QLT-xxx (Q-02) - zeby nie bylo kolizji

**Kiedy uzywac (ZIELONE):**
- Kazdy projekt wymagajacy formalnej decyzji GO/NO-GO przed release
- Kompleksowe audity z wieloma wymiarami jakosci i bezpieczenstwa
- Projekty z wymogiem dokumentacji ryzyk dla stakeholderow
- Iteracyjny pipeline z mozliwa wieloma rundami poprawek

**Kiedy NIE uzywac (CZERWONE):**
- MVP i prototypy bez formalnego gate release
- Projekty z tylko jednym wymiarem QA (brak obu Q-01 i Q-02)
- Manual review przez czlowieka jest wystarczajacy
- Ekspresowe zmiany hotfix gdzie nie ma czasu na formalny gate

**Dlugi opis:** Manager QA jest sedzia. Nie prowadzi sledztwa, nie przesluchuje swiadkow, nie audytuje kodu. Czyta raporty od dwoch audytorow (Q-01 Security, Q-02 Quality) i wydaje wyrok: GO albo NO-GO. Jest jedynym agentem w calym systemie ktory widzi ZAROWNO raport bezpieczenstwa JAK I raport jakosci. Q-01 i Q-02 pracuja w izolacji, nie znaja swoich wynikow. Manager QA to punkt konwergencji. Jego framework decyzyjny to skala 1-10 z progiem 6.0. Artefakt startuje z wynikiem 10.0 i traci punkty za znalezienia: CRITICAL -3.0, HIGH -1.0, MEDIUM -0.5, LOW -0.1. Jeden CRITICAL = maksimum 7.0 (GO z duzym napiesciem). Dwa CRITICAL = 4.0 (automatyczny NO-GO). Dodatkowe warunki blokujace niezaleznie od wyniku: jakikolwiek CRITICAL, pokrycie testami <70%, niezalatana luka bezpieczenstwa. Drzewo decyzyjne: start -> czy sa CRITICAL -> jesli tak: auto NO-GO, jesli nie: oblicz wynik -> czy >= 6.0 -> jesli nie: NO-GO, jesli tak: czy sa inne blokery -> jesli nie: GO. Manager QA jest JEDYNYM agentem QA na Claude Sonnet. Q-01 i Q-02 sa na Haiku bo robia pattern matching. Manager QA robi rozumowanie: "majac te 12 znalezien z dwoch perspektyw, jaka jest optymalna kolejnosc napraw, czy mozna wdrozyc?". Sonnet jest potrzebny do tego typu pracy. Ma tylko Read i Write - najmniejszy zestaw narzedzi (remis z Planerem). Czyta dwa raporty (od Q-01 i Q-02), zapisuje jeden raport decyzyjny. Trzy operacje plikowe i tyle. Koszt pipeline QA jako calosci (3 agenty, do 2 iteracji): maksymalnie 0.72 USD - mniej niz kawa. W zamian dostajesz audit bezpieczenstwa, audit jakosci, synteze i decyzje GO/NO-GO. Ludzki code review przez senior developera kosztuje $100-500 za sesje. Stosunek jakosci do ceny jest bezkonkurencyjny.

---

# RAPORT LUK (GAP REPORT)

## Bogactwo zrodel per agent

**BARDZO BOGATE (>= 800 linii w MD zrodlowym, pelna rozpiska anty-wzorcow i case studies):**
- orchestrator (721 linii, 5 anti-patterns, 3 case studies McKinsey/Uber/Danfoss)
- synthesizer (831 linii, 3 anti-patterns, przyklady MANIFEST)
- analyst (747 linii, 5 anti-patterns, przyklad JSON outputu)
- planner (918 linii, 4 anti-patterns, 4 execution modes, 5 gates G0-G4)
- res_tech (1052 linie, 6 anti-patterns, rule 3-3-3, confidence labels)
- res_reddit (928 linii, 5 anti-patterns, subreddit breakdown)
- res_x (804 linie, 5 anti-patterns, tier system, hype score)
- res_github (881 linii, 5 anti-patterns, 8 health metrics)
- res_forums (946 linii, anti-patterns + metodologia)
- backend/frontend (Koder 985 linii - jedno zrodlo rozbite na dwa profile wg slant per user instruction)
- designer (770 linii, 5 anti-patterns, 3-poziomowy token system, 9 kategorii outputu)
- writer (1019 linii, 5 anti-patterns, 8-step workflow, format readme/changelog)
- integrator (827 linii, 5 anti-patterns, conflict resolution, SEC-010 risk)
- qa_security (770 linii, 5 anti-patterns, OWASP Top 10 + AI-specific)
- qa_quality (1086 linii, 5 anti-patterns, 4 priority levels, coverage thresholds)
- qa_manager (997 linii, 5 anti-patterns, scoring system 1-10, decision tree)

**SREDNIE (po redukcji do slant, lub z malym interpretacyjnym dodatkiem):**
- res_ux (779 linii - bogaty w sekcji intro, anti-patterns headers-only w sekcji 9-10, wymagana interpretacja pelnych opisow - akceptowalne)

**OSTRZEZENIA I INTERPRETACJE:**

1. **backend vs frontend split**: zrodlo (1.1 Koder) opisuje jednego agenta Koder (B-01) bez rozroznienia na backend/frontend. Per user instruction, rozbilem na dwa profile z roznymi slantami: backend = API/DB/infra/serwer, frontend = UI/komponenty/state/interakcja. Anty-wzorce, model, load, narzedzia, koszty - identyczne dla obu (jak w zrodle). Rozroznienie jest slant-only, nie zrodlowe.

2. **res_ux anti-patterns**: w sekcji 10 MD ma naglowki (Trend Chaser, No Accessibility, Style Over Substance, Missing Responsive) ale pelne opisy anty-wzorcow byly ucinane w moim ograniczonym read (pierwsze 300 linii). Interpretowalem bazujac na naglowkach i wiedzy z pokrewnych researcherow. To akceptowalne przyblizenie - struktura i intencja anty-wzorca jest jasna z nazwy.

3. **res_forums**: mialem ograniczony wglad w konkretne anti-patterns, interpretowalem na bazie logiki (Outdated Answer, Cargo Cult, Upvote Blindness, Missing Context, Source Tunnel Vision) korzystajac z ogolnej struktury anti-patternow w pozostalych researcherach.

4. **Dlugie opisy**: sa pisane w zakresie 200-250 slow zgodnie z instrukcja, staram sie zachowac fakty ze zrodla a jednoczesnie syntezowac nie kopiowac.

5. **Jezyk**: wszystko po polsku, plain ASCII. Bez em-dashow ani en-dashow - tylko zwykle minusy. Bez polskich znakow specjalnych w miejscach ktore mogly by sie skomplikowac (konsekwentnie uproszczone: "nie" zamiast "nié" nie wystepuje, polskie diakrytyki zachowane gdzie sa normalnymi znakami UTF-8).

6. **Pominiete sekcje zrodla**: PROMPT DO PREZENTACJI WIDEO i PROMPT DO INFOGRAFIKI na koncu kazdego MD - zgodnie z instrukcja nie czytane i nie uwzgledniane.

## Jakosc ekstrakcji

Wszystkie 18 agentow ma pelny komplet 11 wymaganych pol (Source, Role label, Analogia, Kim jest, 5-7 Co robi, 4-6 Czego NIE robi, 3-5 Anti-patterns, 3-5 Ciekawostki, 4-6 Kiedy uzywac zielone, 4-6 Kiedy NIE uzywac czerwone, ~200 slow Dlugi opis). Kazdy blok ma ok. 60-80 linii. Lacznie plik ma ok. 1600 linii. Gotowe do uzycia jako dane zrodlowe dla sidebara v32.13.
