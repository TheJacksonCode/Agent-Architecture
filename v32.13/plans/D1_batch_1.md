# D1 Batch 1 - Strategy + Research (12 agents)

## AGENT_LONG_PL entries

```js
  orchestrator: '<p>Orkiestrator to centralny dyrygent zespolu dzialajacy na poziomie 0 hierarchii, jedyny agent z pelnym widokiem calego systemu i uprawnieniem do delegowania zadan. Dekomponuje duzy problem uzytkownika na mniejsze podzadania wg specjalizacji agentow, deleguje kazde podzadanie do wlasciwego specjalisty i kontroluje bramy jakosci G0-G4 podejmujac decyzje GO lub NO-GO miedzy fazami. Pracuje na Claude Opus, bo jedna zla decyzja delegacyjna moze kosztowac dziesiatki tysiecy tokenow zmarnowanych u tanszych agentow.</p><p>Syntezuje koncowy wynik z outputow wszystkich zaangazowanych agentow i rozwiazuje konflikty kiedy dwa agenty zwracaja sprzeczne rekomendacje. Nie pisze kodu, nie prowadzi researchu, nie projektuje UI - od tego ma specjalistow. Sweet spot to zespol 6-10 agentow; ponizej lepiej iscie liniowo, powyzej wolaj dwoch orkiestratorow hierarchicznie. Wzorzec dominujacy to Hub-and-Spoke, nie "kazdy z kazdym".</p>',
  synthesizer: '<p>Syntetyk to pamiec projektu i kronikarz, jedyny agent ktory patrzy na prace w wymiarze czasowym. Utrzymuje MANIFEST.md w trybie append-only jako zywe archiwum decyzji, zbiera outputy z kazdej zakonczonej fazy, aktualizuje ADR (Architecture Decision Records) z uzasadnieniem i flaguje konflikty miedzy artefaktami z roznych faz. Po kompakcji kontekstu to wlasnie jego dokumentacja pozwala zrekonstruowac "gdzie jestesmy" bez zgadywania.</p><p>Jest jedynym agentem z przywilejem komunikacji bezposredniej miedzy innymi agentami jako broker informacji, ale nie decydent. Nie podejmuje decyzji projektowych, nie pisze kodu, nie komunikuje sie z uzytkownikiem koncowym i nigdy nie usuwa historii z archiwum. Wiele zespolow po wdrozeniu Syntetyka odnotowuje spadek ADR driftu o 60 procent. Pracuje na Opus lub Sonnet z narzedziami Read, Grep, Glob i Write.</p>',
  analyst: '<p>Analityk to dekompozytor problemu i architekt grafow zaleznosci. Bierze duze mgliste "zbuduj to" i zamienia na precyzyjny DAG atomowych podzadan w sweet spocie 8-20 pozycji, z ocena zlozonosci S/M/L/XL i kategoryzacja wg specjalizacji agentow. Pracuje w kompletnej izolacji od kodu i designu, ma tylko Read i Write, sesja trwa 15-25 sekund - rekord krotkosci w fazie planowania.</p><p>Kluczowa zasada to CO vs KIEDY: Analityk mowi co trzeba zrobic i co od czego zalezy, a Planer (A-03) bierze jego JSON i tworzy harmonogram z timingiem. Zadne estymaty czasowe w minutach, bo Analityk nie wie jak szybko dany agent wykona zadanie. Wola Claude Sonnet - Haiku bylby za slaby do grafow zaleznosci, Opus zbyt drogi. Anty-wzorce to Monolith Decomposer (jedno gigantyczne zadanie) i Micro Decomposer (200 drobnych taskow).</p>',
  planner: '<p>Planer to taktyk harmonogramu, ktory odbiera od Analityka liste zadan z zaleznosciami i odpowiada na pytanie "jak to wykonac najtaniej i najszybciej". Tworzy execution schedule, identyfikuje sciezke krytyczna (najdluzsza sekwencje zaleznosci), definiuje 5 bram jakosciowych G0-G4 jako punkty GO/NO-GO i wybiera jeden z 4 trybow wykonania dla kazdej grupy zadan. Pracuje na Sonnet, ma tylko Read i Write, identyczny zestaw narzedzi jak Analityk.</p><p>Cztery tryby wykonania: SEQUENTIAL (najbezpieczniejszy), PARALLEL (najszybszy dla 6 researcherow), PARALLEL_THEN_SEQUENTIAL (hybryda research-build) i SEQUENTIAL_WITH_COLLABORATION (rzadki, drogi). Plan-and-Execute pattern daje do 83 procent oszczednosci tokenow vs pojedynczy monolityczny agent. Anty-wzorce to Over-Sequential (traci parallelism), Vague Gates (bramki bez kryteriow akceptacji) i brak fallback planu gdy krytyczny agent sie zawiesi.</p>',
  res_tech: '<p>Researcher Tech to techniczny wywiadowca pierwszy z szesciu researcherow fazy RESEARCH. Jego domena to twarde zrodla techniczne w hierarchii: oficjalna dokumentacja > engineering blogi (Netflix, Uber, Shopify) > publikowane benchmarki > tutoriale > fora > tweety. Porownuje technologie z minimum 3 opcjami i 3 wymiarami, analizuje benchmarki wydajnosciowe i identyfikuje ryzyka techniczne (compatibility, lock-in, security, maturity).</p><p>Obowiazuje zasada 3-3-3: minimum 3 alternatywy, 3 zrodla na alternatywe, 3 wymiary porownania. Kazdy claim ma confidence label CERTAIN/PROBABLE/SPECULATION. Kluczowa zasada anty-groupthink: researcherzy nie rozmawiaja ze soba i nie widza swoich raportow, dopiero Orkiestrator lub Syntetyk laczy 6 izolowanych perspektyw. Pracuje na Haiku, nie pisze kodu, nie podejmuje decyzji architektonicznych - dostarcza dane, wybor zostawia Planerowi.</p>',
  res_ux: '<p>Researcher UX to skaut trendow designerskich, drugi z 6 researcherow patrzacy na swiat wizualny. Jego zadaniem jest zbudowac mood board z minimum 5 referencjami z roznych zrodel i dostarczyc audyt dostepnosci WCAG 2.1 AA, ale nie pisac ani jednej linii CSS. Siega do 7 glownych zrodel: Dribbble, Behance, Awwwards, Mobbin, Material Design, Apple HIG i WCAG. Pracuje na Claude Haiku z WebSearch i WebFetch.</p><p>Kluczowa granica jest podkreslana w dokumentacji: "Designer ktory jednoczesnie szuka inspiracji i pisze CSS ma za duzo w oknie kontekstowym". Rozdzielenie UX research od Design implementation pozwala kazdemu agentowi dzialac w waskim kontekscie. Audyt dostepnosci jest rowniez wazny jak trend scouting - kontrast 4.5:1, focus visible, keyboard navigation, touch target 44x44px. Nie wybiera finalnej palety, dostarcza Designerowi uzasadnione opcje z plusami i minusami.</p>',
  res_reddit: '<p>Researcher Reddit to antropolog spolecznosci dev, trzeci z 6 researcherow. Pracuje jak dziennikarz sledczy - sluch rozmow praktykow w kluczowych subredditach (r/webdev, r/programming, r/reactjs, r/SaaS, r/devops, r/experienceddevs, r/cscareerquestions), gdzie ludzie pod pseudonimem sa duzo bardziej szczerzy niz w oficjalnych case studies. Kazdy subreddit ma swoja kulture i bias, ktory trzeba rozumiec.</p><p>Kluczowa technika to ground truth: "uzywamy X w produkcji od 3 lat" jest warto\'sciowsze niz najlepszy marketing post. Drugi filar to sentiment analysis i detekcja rageposts - pojedynczy ragepost to nic, 20 w tygodniu to czerwona flaga. Wymaga triangulation: minimum 3 niezalezne komentarze dla claimu. Anty-wzorce to Single Comment Truth, Outdated Thread (cytowanie watkow sprzed 3 lat), Echo Chamber i Karma Blindness. Pracuje na Haiku w izolacji od innych researcherow.</p>',
  res_x: '<p>Researcher X to korespondent wojenny trendow, czwarty z 6 researcherow skupiony na platformie X (dawniej Twitter). Monitoruje trendy tech community, sledzi reakcje na product launche w pierwszych 24h, analizuje dluzsze watki ekspertow i mapuje influencerow na skali Tier 1 (Dan Abramov, Evan You, Rich Harris) do Tier 5 (mikroinfluencerzy z 1000-5000 followerow, czesto najbardziej wiarygodni). Hype score 0-10 mierzy nastroj community.</p><p>Najmniejsze obciazenie ze wszystkich researcherow (45/100) bo tweety sa krotkie. X jest jak rynek finansowy - content szybki, viralowy, pelen emocji. Jest dobrym wczesnym ostrzeganiem (trend zaczyna sie tu zanim dojdzie do Reddita), ale kiepski dla ground truth. Anty-wzorce to Hype Follower, Influencer Worship (jeden tweet od znanego przewaza 100 praktykow) i Engagement = Truth. Raportuje co jest trendem, nie czy trend jest prawdziwy - walidacja to rola Tech i Reddit.</p>',
  res_github: '<p>Researcher GitHub to archeolog repozytoriow, piaty z 6 researcherow wchodzacy w skore reverse engineera. GitHub z 420 milionow repozytoriow jest najwieksza baza wiedzy o tym jak ludzie faktycznie rozwiazuja problemy w kodzie. Discovery z filtrem stars > 100, architecture analysis (monorepo vs multi-repo, stack, wzorce), health assessment wg 8 metryk (commit frequency, contributors, issues, PR merge time, release cadence, test coverage, dep freshness, docs quality).</p><p>Najwyzsze obciazenie wsrod researcherow (70/100) bo repozytoria sa duze. Kluczowe kroki to pattern extraction (co mozna zaadoptowac uznajac licencje) i issue analysis (czy maintainer jest responsywny). Najwieksze pulapki to Star Worship (50k gwiazdek nie znaczy jakosci), Abandoned Repo Adoption (repo bez commitu od 2 lat) i README Deception (README nie odzwierciedla actual code quality). Nie pisze wlasnego kodu, nie klonuje repo lokalnie - czyta przez GitHub API/WebFetch.</p>',
  res_forums: '<p>Researcher Forums to przewodnik po bibliotekach Q&A, szosty z 6 researcherow wyspecjalizowany w Stack Overflow (58 milionow odpowiedzi), Dev.to, Medium, Hacker News i Hashnode. Odnajduje rozwiazania znanych problemow, ocenia jakosc odpowiedzi wg upvotes/accepted status/komentarzy/dat, ekstrahuje lessons learned z dyskusji i zbiera wysokiej jakosci tutoriale. Najmniejsze obciazenie (50/100) bo fora sa dobrze ustrukturyzowane.</p><p>Wielka pulapka to Upvote Blindness - odpowiedz z 500 upvotes moze byc z 2015 roku i nie dzialac w wersji 2026, zawsze trzeba sprawdzic date i komentarze. Cargo Cult (kopiowanie bez zrozumienia) i Outdated Answer to kolejne anty-wzorce. Czesto najciekawsze informacje sa nie w samej odpowiedzi, tylko w komentarzach pod nia ("this worked for me but only when X"). Pracuje na Haiku, nie pisze kodu, nie waliduje czy rozwiazanie dziala w konkretnym kontekscie - to robi Koder.</p>',
  res_docs: '<p>Researcher Docs to specjalista od oficjalnych dokumentacji frameworkow i narzedzi, prawnik czytajacy ustawy a nie opinie. Zbiera getting started, best practices, performance tips, security guidelines i config snippety z autoryzowanych zrodel producenta technologii. Ekstrahuje fakty z precyzyjnymi odniesieniami URLi i tworzy structured reference guide z excerptami z wielu zrodel. Najnizsze obciazenie w research (40/100) bo zbieranie fragmentow jest prostsze niz gleboka analiza.</p><p>Kluczowa zasada: oficjalna dokumentacja jest source of truth dla faktow technicznych, ale nie dla opinii o jakosci. ZAWSZE sprawdza zgodnosc wersji - cytowanie docs dla Next.js 13 gdy projekt uzywa Next.js 15 to anty-wzorzec Version Mismatch. Czesto paired z Researcher Tech: Docs daje fakty, Tech daje porownania i rekomendacje. Nie interpretuje opinii uzytkownikow, nie porownuje technologii, nie ocenia jakosci frameworka.</p>',
  res_critic: '<p>Research Critic to walidator i straznik jakosci fazy badawczej, jedyny agent oceniajacy prace WSZYSTKICH 6 researcherow jednoczesnie. Analizuje raporty szukajac sprzecznosci (np. Tech mowi React, Reddit mowi Svelte), confirmation bias, luk w danych i przestarzalych zrodel. Scoring wg rubryki: Completeness 25%, Accuracy 25%, Relevance 20%, Freshness 20%, Actionability 10%. Score ponizej 6/10 obliguje do REVISE.</p><p>Najwyzszy load w research (85/100) bo musi przeczytac i porownac outputy 6 agentow naraz. Jedyny w warstwie RESEARCH uzywajacy Sonnet zamiast Haiku - wymaga rozumowania i syntezy, nie pattern matching. Dziala jak peer reviewer z Nature: kazde twierdzenie bez dowodu oznaczone, kazda sprzecznosc wylowiona, kazdy bias zidentyfikowany. Anty-wzorce to Rubber Stamp (akceptowanie bez glebokiej analizy) i Overcritical Block (blokowanie z powodu minor issues). Nie prowadzi wlasnego researchu, nie podejmuje decyzji.</p>',
```

## AGENT_MID_PL entries

```js
  orchestrator: 'Uzywaj gdy masz 3+ rownoleglych specjalistow i wyrazne fazy z bramami jakosciowymi G0-G4 do koordynacji.',
  synthesizer: 'Uzywaj w projektach dluzszych niz jedna sesja gdzie MANIFEST.md i ADR sa krytyczne dla recovery po kompakcji.',
  analyst: 'Uzywaj gdy masz zlozone zadanie 8+ podzadan z niejasnymi zaleznosciami wymagajacymi dekompozycji i grafu DAG.',
  planner: 'Uzywaj gdy pipeline ma 5+ zadan z mozliwym parallelizmem i potrzebujesz bram jakosciowych G0-G4 z kryteriami akceptacji.',
  res_tech: 'Uzywaj przy wyborze frameworka lub stacku wymagajacym benchmarkow, porownan 3+ opcji i twardych danych technicznych.',
  res_ux: 'Uzywaj dla nowego projektu bez ustalonego design systemu gdzie potrzebujesz mood boardu i audytu WCAG.',
  res_reddit: 'Uzywaj gdy potrzebujesz ground truth od praktykow uzywajacych rozwiazania w produkcji, nie marketingu vendora.',
  res_x: 'Uzywaj do wczesnego wykrywania trendow tech community i pomiaru reakcji na product launch w real-time.',
  res_github: 'Uzywaj gdy szukasz reference implementation patternu lub chcesz ocenic health otwartej biblioteki przed adopcja.',
  res_forums: 'Uzywaj dla konkretnych problemow "how do I X in Y" gdzie ktos juz znalazl rozwiazanie na Stack Overflow.',
  res_docs: 'Uzywaj gdy potrzebujesz autoryzowanych faktow z oficjalnej dokumentacji frameworka z precyzyjnymi URLami.',
  res_critic: 'Uzywaj gdy masz 4+ rownoleglych raportow researcherow do cross-walidacji pod katem sprzecznosci i bias.',
```

## AGENT_GREEN_PL entries

```js
  orchestrator: ['3+ specjalistow rownolegle','Wyrazne fazy pipeline','Bramy jakosciowe G0-G4','Synteza wielu zrodel','Koordynacja delegacji'],
  synthesizer: ['Dlugie projekty multi-sesja','MANIFEST jako SSoT','Archiwum ADR','Recovery po kompakcji','Broker miedzy agentami'],
  analyst: ['Dekompozycja 8+ podzadan','Graf DAG zaleznosci','Structured handoff','Complexity S/M/L/XL','Kategorie specjalizacji'],
  planner: ['Harmonogram z parallelism','Sciezka krytyczna','Bramy jakosciowe G0-G4','4 tryby wykonania','Plan-and-Execute pattern'],
  res_tech: ['Wybor frameworka','Benchmarki wydajnosciowe','Porownanie 3+ opcji','Rule 3-3-3','Hierarchia zrodel'],
  res_ux: ['Mood board 5+ ref','Audyt WCAG 2.1 AA','Trendy designerskie','Analiza design systemow','Brak ustalonego stylu'],
  res_reddit: ['Ground truth praktykow','Sentyment community','Walidacja vs marketing','Detekcja rageposts','Triangulation komentarzy'],
  res_x: ['Early warning trendow','First 24h reakcje','Hype score 0-10','Influencer mapping','Thread analysis'],
  res_github: ['Reference implementation','Health assessment 8 metryk','Pattern extraction','Analiza architektury','Issue analysis'],
  res_forums: ['Konkretne how-to','Stack Overflow lookup','Lessons learned','Pattern recognition','Long form tutorials'],
  res_docs: ['Oficjalne fakty','Config snippety','Best practices','Security guidelines','Version-matched docs'],
  res_critic: ['Cross-walidacja raportow','Detekcja sprzecznosci','Confirmation bias check','Scoring rubryka','Wykrywanie luk'],
```

## AGENT_RED_PL entries

```js
  orchestrator: ['Proste zadanie 1-agent','Pipeline 2-krokowy A->B','Sesje eksploracyjne','Uzytkownik jako PM'],
  synthesizer: ['Jednorazowe skrypty','Male bugfixy','Zespol 1-2 agenty','Prosty feature toggle'],
  analyst: ['Zadania 1-3 krokowe','Solo hacking','Gotowa lista dzialen','Sesje eksploracyjne'],
  planner: ['Pipeline 1-3 krokowy','Oczywista sekwencja','Eksperyment bez porzadku','Reverse engineering'],
  res_tech: ['Znany stack','Prototyp eksperymentalny','Decyzja juz zapadla','Pytania nietechniczne'],
  res_ux: ['Ustalony design system','Zadania backendowe','Zmiany inkrementalne','Implementacja CSS'],
  res_reddit: ['Niszowe technologie','Twarda dokumentacja','Prototyp na wyrzucenie','Kontrowersje bez konsensu'],
  res_x: ['Twarde decyzje techniczne','Niszowe bez obecnosci','Analizy glebokie','Walidacja ground truth'],
  res_github: ['Brak repo open source','Potrzeba benchmarkow','License blokuje wzorzec','Szukanie trendow'],
  res_forums: ['Swieze technologie','Architecture level','Trendy i hype','Feedback praktykow'],
  res_docs: ['Opinie uzytkownikow','Porownania technologii','Ocena jakosci','Implementacja kodu'],
  res_critic: ['Wlasny research','Decyzje technologiczne','Pisanie kodu','Rubber-stamping raportow'],
```

## Source notes

- orchestrator: R2 source (lines 15-67)
- synthesizer: R2 source (lines 69-121)
- analyst: R2 source (lines 123-175)
- planner: R2 source (lines 177-227)
- res_tech: R2 source (lines 229-281)
- res_ux: R2 source (lines 283-333)
- res_reddit: R2 source (lines 335-387)
- res_x: R2 source (lines 389-441)
- res_github: R2 source (lines 443-495)
- res_forums: R2 source (lines 497-549)
- res_docs: AGENT_KNOWLEDGE derived (v32_13.html lines 3186-3211)
- res_critic: AGENT_KNOWLEDGE derived (v32_13.html lines 3212-3239)
