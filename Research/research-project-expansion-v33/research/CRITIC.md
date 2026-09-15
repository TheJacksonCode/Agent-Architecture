# CRITIC.md - Walidacja researchu v33 (Project Expansion)

Rola: Research Critic, kampania deep-research-v2. Zakres: 7 raportow R1-R7 dot. dopasowania 35/42 (faktycznie 37/44) agentow i presetow do realnego profilu pracy Maciej.

Metoda krytyka: lektura calosci 7 raportow + niezalezna weryfikacja spornych liczb bezposrednio na dysku (`~/.claude/skills/`, `~/.claude/commands/`, `PRESET_CATALOG.md`, `deep-five-minds.md`). Wszystkie rozstrzygniecia liczbowe ponizej sa poparte faktycznym listingiem plikow, nie tylko cytatami z raportow.

---

## Werdykty per raport (R1-R7)

- **R1 (projekty lokalne): PASS.** Inwentarz 18-19 folderow jest per-pozycja poparty odczytem MANIFEST/README, a kluczowy wniosek ">80% pracy to non-software research/decision" wynika bezposrednio z tabeli (11 folderow czysto researchowych, 1 realny kod). Rekomendacje presetowe (pkt 7) sa slabiej uzasadnione niz sam inwentarz - patrz sekcja ryzyka.

- **R2 (agenci/skills): PASS.** Najwyzsza rzetelnosc liczbowa w calym korpusie: jako jedyny wykryl i poprawnie opisal, ze fizycznie jest **37 plikow skills, nie 35**, i rozdzielil to od liczby encyklopedycznej. Analiza duplikatow (res_docs/res_tech, observability/telemetry) i luk (mobile, DevOps) jest oparta na lekturze plikow, nie na spekulacji.

- **R3 (presety/commands): PASS z zastrzezeniem.** Analiza wzorcow organizacji i 10 par nakladajacych sie jest solidna i oparta na pelnej lekturze plikow (np. trafne wykrycie, ze `/five-minds` nie zawiera realnej debaty Five Minds). Zastrzezenie: przypis o liczbie presetow (43 vs 42) jest chaotyczny i pozostawiony jako "nalezy zweryfikowac" zamiast rozstrzygniety - krytyk rozstrzyga to nizej.

- **R4 (routing/katalog): PASS.** Trafny opis mechaniki routingu jako czysto-promptowej (brak atomowych keywordow, LLM-semantic matching) i luk pokrycia (mobile, ML/AI features, deployment). Slabosc: powtarza deklaratywne "42 presety" i `deep-five-minds = 27` z katalogu bez skonfrontowania z plikami komend (gdzie liczby sa inne) - to zrodlo dwoch konfliktow nizej.

- **R5 (faktyczne uzycie): REVISE.** Kierunek wnioskow trafny (system uzywany "na sobie samym", `deep-research-v2` i `deep-five-minds` to jedyne z twardym dowodem), ale (a) naglowek deklaruje "35 agentow" i **wypisuje 37 nazw** - wewnetrzna sprzecznosc; (b) statystyki "33/42 presetow bez sladu = 79% nieuzywane" sa podane ze zbyt duza pewnoscia jak na metode opartia wylacznie na auto-memory (raport sam to dyskwalifikuje w uwadze metodologicznej, ale potem cytuje liczby jako mocny sygnal). Wniosek jakosciowy zostaje, liczby wymagaja obnizenia rangi do "proxy, nie pomiar".

- **R6 (istniejacy research): PASS.** Wierne streszczenie 8 kampanii + 2 dokumentow, z trafnym kluczowym ustaleniem: caly dotychczasowy korpus **nie rekomendowal redukcji** liczby agentow/presetow, a wszystkie niewdrozone rekomendacje to rozszerzenia infrastruktury (MCP/Hooks/observability), nie zmiana skladu. To wazny kontrapunkt dla R3/R7.

- **R7 (cross-reference): PASS z zastrzezeniem.** Niezalezny skan potwierdza sygnal R1 (silna zbieznosc = mocny dowod, nie echo). Zastrzezenie: czesc rekomendacji stoi na n=1 lub na dowodach wewnetrznie sprzecznych z R1 (rekomendacja `content_social` pod LinkedIn opiera sie m.in. na folderze `Kariera-D`, ktory R1 ustalil jako **pusty, 0 plikow**) - R7 tego nie flaguje. Kierunek PASS, konkretne nowe-agenty over-reach.

---

## Konflikty rozstrzygniete

### Konflikt 1: Liczba agentow - 35 (brief, CLAUDE.md, R5) vs 37 (R2)
**Rozstrzygniecie: 37 plikow skills jest prawda operacyjna; 35 to liczba kanoniczna z encyklopedii HTML.** Zweryfikowane listingiem: `~/.claude/skills/*.md` = **37 plikow**. Liczba "35" pochodzi z `AGENT_EDU_PL` (35 wpisow encyklopedycznych w v32.16 HTML) i jest powtarzana w CLAUDE.md/MEMORY.md. Delta = 2 pliki warstwy skills bez osobnego wpisu encyklopedycznego; dodatkowo `synthesizer_lean` to wariant `synthesizer` (ta sama rola, 2 tryby), wiec liczba *odrebnych rol* to ~35-36. R2 ma racje faktograficznie (37 plikow). R5 popelnil blad: naglowek "35" przy wypisanych 37 nazwach. **Dla v33: pracowac na 37 plikach / ~36 rolach, ale utrzymac "35" jako liczbe encyklopedyczna do czasu swiadomej decyzji o synchronizacji encyklopedii z warstwa skills.**

### Konflikt 2: Liczba presetow - 42 (katalog, CLAUDE.md, R5) vs 43 (R3) vs 44 (weryfikacja krytyka)
**Rozstrzygniecie: 44 pliki komend fizycznie, 42 udokumentowane w PRESET_CATALOG.md. Rozbieznosc = 2 komendy istnieja jako pliki, ale nigdy nie dodano ich do katalogu routingu: `bento-redesign` i `deep-research-v2`.** Zweryfikowane: `~/.claude/commands/*.md` = **44 pliki**; `PRESET_CATALOG.md` deklaruje "42" i `comm` potwierdza, ze dokladnie te dwa pliki nie wystepuja w katalogu. R3 (43) i R5 (42) to snapshoty w roznych momentach; oba niepelne. **To nie jest tylko rozbieznosc liczbowa - to defekt: najczesciej uzywany preset wedlug R5 (`deep-research-v2`, ~8 kampanii) jest NIEROUTOWALNY przez auto-router, bo nie ma go w katalogu.** Rozstrzygniecie kierunkowe dla Syntezy: liczba "42" opisuje pokrycie routingu, nie stan repo; realny stan to 44 komendy z 2 poza katalogiem.

### Konflikt 3: Sklad `deep-five-minds` - 25 agentow (R3) vs 27 (R4/katalog)
**Rozstrzygniecie: 25 to prawda wykonywalna.** Plik `deep-five-minds.md` w naglowku mowi wprost "25 unikalnych agentow", a tabela referencji konczy sie na wierszu **25** (`qa_manager`). Katalog (`PRESET_CATALOG.md`, cytowany przez R4) podaje 27 - liczba nieaktualna lub liczaca wywolania runtime, nie unikalne role. R3 czytal plik komendy (zrodlo egzekucji) i ma racje. R4 zacytowal katalog bez cross-checku. **Katalog wymaga korekty 27 -> 25.**

### Konflikt 4: R1/R7 "profil uzytkownika jest w >80% non-software" vs R3 traktujacy presety enterprise/SaaS jako rdzen katalogu
**Rozstrzygniecie: komplementarne, nie sprzeczne - opisuja podaz vs popyt.** R3 inwentaryzuje co ISTNIEJE (katalog jest dev-centryczny: saas, microservices, api-modern, soc2). R1/R5/R7 mierza co jest UZYWANE (research/decyzje osobiste). Oba twierdzenia sa prawdziwe jednoczesnie i razem daja teze finalna: **portfolio jest zoptymalizowane pod software engineering, a realne uzycie jest w wiekszosci non-software.** To nie konflikt do rozstrzygniecia na korzysc jednej strony, tylko wlasnie glowny insight kampanii. Uwaga laczaca: dev-centryczne presety nie generuja kosztu gdy nieuzyte (lazy-load, zero baseline - potwierdzone w R6/context-engineering), wiec "nadmiar" jest kosztem katalogu/routingu, nie kosztem tokenow.

### Konflikt 5: R6 "caly dotychczasowy research NIE rekomenduje redukcji, architektura poprawna i unikatowa" vs R3/R7 rekomendujace konsolidacje i oznaczenie presetow jako "martwe"
**Rozstrzygniecie: odpowiadaja na dwa rozne pytania - oba wazne, brak realnej sprzecznosci.** R6 podsumowuje korpus, ktory ocenial architekture wzgledem *best-practices platformy Claude Code* (czy wzorzec orchestrator-architecture jest zdrowy? tak, i unikatowy). R3/R7 oceniaja *dopasowanie do profilu konkretnego uzytkownika* (czy Maciej potrzebuje wszystkich? nie). Poprzedni research nigdy nie zadal pytania o fit-to-usage - wiec R3/R7 nie zaprzeczaja R6, tylko wypelniaja luke, ktorej R6 explicite nie pokryl. **Reconciliacja dla Syntezy: zachowac wzorzec architektoniczny (R6 ma racje), ale krytyka dopasowania jest nowa i legalna (R3/R7 maja racje) - z zastrzezeniem, ze "redukcja" powinna oznaczac demote w routingu, nie kasowanie plikow (bo nieuzyte presety sa darmowe).**

### Konflikt 6: R5 "deep-research-v2 to flagowy, najczesciej uzywany preset" vs faktyczna nieobecnosc w katalogu routingu (R4 nie wykryl)
**Rozstrzygniecie: oba prawdziwe - i to jest defekt do naprawy.** R5 poprawnie dokumentuje `deep-research-v2` jako najlepiej udokumentowany uzyciowo (~8 kampanii, wlasna historia iteracji). R4 opisuje katalog jako "42 presety" nie zauwazajac, ze tego wlasnie presetu w katalogu nie ma (weryfikacja krytyka: `grep deep-research-v2 PRESET_CATALOG.md` = 0 trafien). Wniosek: **preset o najsilniejszym dowodzie realnego uzycia jest jednoczesnie niewidoczny dla auto-routera - to najpilniejsza, najtansza i najlepiej udowodniona poprawka w calej kampanii**, wazniejsza niz jakikolwiek nowy preset.

### Konflikt 7 (dodatkowy): R3 "`/five-minds` (14 ag) nie zawiera realnej debaty Five Minds, myląca nazwa, dubluje `/full`" vs R4/katalog klasyfikujacy `/five-minds` jako pelnoprawny preset "decyzja architektoniczna"
**Rozstrzygniecie: R3 ma racje, bo czytal fazy pliku komendy.** Katalog opisuje intencje/etykiete, R3 zweryfikowal faktyczna zawartosc faz (fan-out research+build+QA, brak sekcji debaty 5 ekspertow). To zwalidowany defekt nazewniczy, nie roznica zdan. Rekomendacja R3 (przemianowac lub naprawic zawartosc) jest zasadna i gotowa do Syntezy.

---

## Gaps (pytania bez pelnej odpowiedzi w zadnym z 7 raportow)

1. **Brak jakiejkolwiek ilosciowej ROI / analizy kosztu dla proponowanych zmian.** Zaden raport nie oszacowal, ile realnie oszczedza nowy `/consumer-research` (4-5 ag) wzgledem "wygietego" `/research` (8 ag) w tokenach/USD, ani ile kosztuje utrzymanie/regeneracja nowego agenta w pipeline `generate_skills.js`. Rekomendacje "dodaj/usun" sa czysto jakosciowe. Bez tego Synteza nie ma podstawy do priorytetyzacji (co pierwsze: nowy preset czy naprawa katalogu?).

2. **Brak walidacji, czy proponowane nowe agenty/presety bylyby uzyte wiecej niz raz.** `interview_coach` opiera sie na jednym projekcie (Kariera-A, n=1), `content_social` czesciowo na folderze `Kariera-D`, ktory R1 ustalil jako **pusty**. Zaden raport nie pyta: ile roznych projektow musi wykazac wzorzec, by uzasadnic *staly* preset zamiast jednorazowego repurposingu? Prywatny-H/Prywatny-C/Prywatny-D (n=3) sa mocniejsza podstawa niz interview/LinkedIn (n=1 / n=0), ale nikt tej progowej analizy nie przeprowadzil.

3. **Nikt nie przeszukal surowych transkryptow sesji (.jsonl).** R5 explicite oparl sie na auto-memory jako proxy i sam ja zdyskwalifikowal jako niepelna. W efekcie twierdzenie "79% presetow nieuzywanych" jest artefaktem pomiarowym, nie faktem. Ta luka podważa ilosciowa podstawe calej tezy "za duzo presetow" - realna czestotliwosc uzycia pozostaje NIEZNANA.

4. **Brak analizy wykonalnosci implementacyjnej w zrodle v32.16.** Nowe agenty/domeny musialyby wejsc przez `AGENT_EDU_PL` -> `generate_skills.js` oraz encyklopedie PL/EN (parytet bilingual). Zaden raport nie sprawdzil, czy dodanie "domeny osobistej" (R7) da sie zrobic bez zlamania parytetu jezykowego i pipeline regeneracji - a to determinuje realny koszt kazdej rekomendacji.

5. **Brak systematycznego auditu dryfu katalog-vs-pliki.** Krytyk znalazl 3 rozbieznosci (2 presety poza katalogiem, 1 zla liczba w `deep-five-minds`) przy pobieznej weryfikacji. Zaden researcher nie przeprowadzil pelnego diffu 44 plikow komend wzgledem 42 wpisow katalogu ani 37 skilli wzgledem referencji w komendach - moga istniec dalsze niespojnosci (np. komendy odwolujace sie do skilli, ktore nie istnieja, lub odwrotnie).

6. **Brak sygnalu o intencji uzytkownika.** Nikt nie rozstrzygnal, czy Maciej CHCE, by narzedzie obslugiwalo domene osobista/konsumencka, czy swiadomie trzyma je dev-centryczne i improwizuje reszte. Kontekst (Michal/POC, kierunek zawodowy AI) sugeruje, ze profesjonalna trajektoria moze wrocic do software - co oslabialoby teze "przeorientuj na personal/lifestyle". To pytanie o cel, nie o dane, i powinno trafic do HITL/uzytkownika, nie byc rozstrzygniete przez Synteze samodzielnie.

---

## Ocena rekomendacji wysokiego ryzyka (gotowosc do Syntezy)

**Zasada ogolna:** najlepiej udowodniona zmiana w calej kampanii to NIE nowy preset, lecz **naprawa dryfu katalogu** (dodac `deep-research-v2` i `bento-redesign` do PRESET_CATALOG.md, poprawic `deep-five-minds` 27->25). Zero ryzyka, twardy dowod, natychmiastowa wartosc (najczesciej uzywany preset staje sie routowalny). To powinien byc pkt 1 Syntezy przed jakimkolwiek dodawaniem agentow.

- **`/consumer-research` (nowy lekki preset Reddit+Forums+Krytyk+Syntetyk) - GOTOWE Z ZAWEZENIEM.** Dowod n=3 (Prywatny-H, Prywatny-C, Prywatny-D), zbiezny miedzy R1 i R7, wzorzec spojny ("min. 60% Reddit", ranking 3-poziomowy). ALE brak dowodu, ze obecny `/research` zawiodl - uzytkownik ukonczyl te projekty repurposingiem. Rekomendacja krytyka: **zaczac od flagi `--no-tech` / wariantu `/research` odcinajacego res_github/res_docs (to wlasna alternatywa R7, pkt 8), a nie od nowego bytu.** Tansze, odwracalne, ten sam efekt. Nowy osobny preset dopiero po walidacji flagi.

- **`interview_coach` + `/interview-prep` - NIE GOTOWE, do backlogu.** Dowod = wylacznie Kariera-A (n=1), a R5 potwierdza, ze `deep-five-minds` juz tam zadzialal. Jeden przypadek nie uzasadnia stalego agenta + presetu w pipeline bilingual. Ryzyko nadinterpretacji pojedynczego researchera (R7) WYSOKIE. Zawezic do: "obserwowac; przy drugim projekcie tego typu wrocic". Nie wdrazac w v33.

- **Konsolidacja `/saas` + `/fullstack-premium` + `/prd-to-launch` - CZESCIOWO GOTOWE, przeformulowac.** Nakladanie strukturalne jest realne (R3 pkt, R7 pkt 2, zgodne). ALE R6 pokazuje, ze nieuzyte presety maja zerowy koszt tokenowy (lazy-load), wiec konsolidacja NIE oszczedza tokenow - tylko porzadkuje katalog/routing. Zawezic teze: **konsolidowac WPISY w PRESET_CATALOG.md / routing (jeden bucket "duzy produkt od zera" z rozroznieniem), nie kasowac plikow komend.** W tej formie gotowe; w formie "usun presety" - nie, bo brak dowodu szkody.

- **"Martwe presety" `/soc2-sweep`, `/microservices`, `/api-modern`, `/ab-test-lab` - GOTOWE TYLKO JAKO DEMOTE.** R7 slusznie zauwaza zero pasujacych projektow na dysku. ALE "brak projektu dzis" != "nigdy niepotrzebne", a kontekst zawodowy (POC, AI engineering) moze je przywrocic. Bezpieczna forma: **demote do "long tail" w routing guide / oznaczenie "wymaga aktywnego produktu produkcyjnego"** (by auto-router ich nie proponowal dla zadan osobistych). Kasowanie/usuwanie - NIE, over-reach.

- **`content_social` pod LinkedIn - NIE GOTOWE.** Opiera sie m.in. na pustym folderze `Kariera-D` (R1: 0 plikow) - R7 tego nie zauwazyl. Dowod faktycznie n=0 dla LinkedIna konkretnie. Odrzucic w tej iteracji.

- **Agent "3D/spatial viz" / rozszerzenie frontend.md o Three.js - NISKI PRIORYTET.** Dowod n=2 (pokoj_kota, katownik-3d.html), realny ale drobny. To raczej dopisek do opisu `frontend.md` (tania higiena) niz nowy agent. Gotowe jako mikro-edycja, nie jako nowy byt.

**Podsumowanie dla Syntezy:** rekomendacje R1/R7 sa czesciowo nadinterpretacja pojedynczego researchera tam, gdzie dowod to n=0/n=1 (interview_coach, content_social), a solidne tam, gdzie zbiegaja sie R1+R7+wzorzec n>=3 (consumer-research). Synteza powinna: (1) najpierw naprawic dryf katalogu - twardy dowod, zero ryzyka; (2) wdrozyc consumer-research jako FLAGE `/research`, nie nowy preset; (3) konsolidacje/martwe presety potraktowac jako reorganizacje ROUTINGU, nie kasowanie; (4) interview_coach i content_social odeslac do backlogu z progiem "drugi przypadek uzycia"; (5) pytanie o intencje domenowa (personal vs dev) eskalowac do uzytkownika przez HITL, bo to decyzja o celu, nie o danych.
