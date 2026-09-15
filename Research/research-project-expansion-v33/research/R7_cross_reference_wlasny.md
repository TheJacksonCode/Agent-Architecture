# R7: Cross-reference (niezalezna ocena)

Metodologia: szybki skan `C:/Projekty Claude Code/` (nazwy folderow + pierwsze linie MANIFEST/README/ARCHITECTURE), lektura naglowkow 35 skilli w `~/.claude/skills/*.md` i 42 komend w `~/.claude/commands/*.md`, oraz pelna lektura `PRESET_CATALOG.md`. Ten raport to niezalezny "drugi zestaw oczu" - nie czekalem na R1-R6, wnioski moga sie pokrywac lub rozjezdzac z nimi; to jest zamierzone.

## Co widac na dysku

Skan `C:/Projekty Claude Code/` pokazuje ok. 19 folderow projektowych. Po przeczytaniu naglowkow rysuje sie wyrazny, powtarzalny wzorzec, ktory NIE jest "buduje SaaS" tylko:

1. **Agent_Architecture** - meta-projekt: single-HTML edukacyjny konfigurator agentow (ten wlasnie system).
2. **Prywatny-A/pokoj_kota** - viewer 3D pokoju dla kota (`top-view.html`, `viewer.html`, `room.json`) - lekki, wizualny/spatial tool.
3. **DO CC** - luzne pliki, w tym `UiPathPlatformRobot.msi` (RPA), eksport Instagrama.
4. **Kariera-A** - przygotowanie kandydata do rozmowy rekrutacyjnej na stanowisko analityczne w sektorze finansowym - coaching kariery / narracja osobista, nie kod.
5. **NaukaAI** - duze osobiste centrum nauki AI: portfolio, design system, audyty, research, notebookLM, nauka Pythona.
6. **nauka-python** - nauka jezyka Python, wersjonowane `v1/`.
7. **Prywatny-E** - sim racing / iRacing, instalatory gier, hobby.
8. **OrgChart-Agent-Core** - samodzielny multi-agent Python pipeline (org chart + Five Minds + HITL) - jedyny prawdziwie "software engineering" projekt w tym skanie poza samym Agent_Architecture.
9. **Prywatny-B** - nieznane, `v1/` (prawdopodobnie research/planowanie kolonii dla dzieci).
10. **Kariera-D** - branding osobisty / content na LinkedIn.
11. **Kariera-B** - audyty CV (jakosc, bezpieczenstwo "Swiss standard"), portfolio.
12. **Prompt_Engineering** - research promptow, prezentacje HTML, brainstormy "Hive Mind".
13. **Kariera-C** - raport researchu o automatyzacji workflow.
14. **Prywatny-D** - mimo nazwy sugerujacej hardware, MANIFEST to **research konsumencki o grze Riders Republic** (decyzja zakupowa/hobby, nie inzynieria).
15. **Prywatny-H** - **research konsumencki/zdrowotny** o odmianach konopi medycznych dopasowanych do preferowanego profilu efektu.
16. **Prywatny-F** - awatar, `v1/`.
17. **Prywatny-C** - **research konsumencki** o plecakach-transporterach dla kota (Reddit-heavy).
18. **Prywatny-G** - research + instrukcja lokalnego AI video face/scene swap na Windows (tooling, ale mocno "how-to" a nie "zbuduj mi apke").

Wniosek ogolny: uzytkownik uzywa tego systemu multi-agent GLOWNIE do trzech typow pracy, ktore nie sa "budowa oprogramowania produkcyjnego":
- (A) **Osobisty/konsumencki research decyzyjny** (Prywatny-H, Prywatny-C, Prywatny-D/Riders Republic, Prywatny-G, czesciowo Prompt_Engineering) - pytania typu "co kupic/wybrac/zainstalowac", czesto z naciskiem na Reddit/social proof, bez zadnego kodu na wyjsciu.
- (B) **Osobisty rozwoj/kariera/branding** (Kariera-A, Kariera-D, Kariera-B, NaukaAI) - coaching, CV, LinkedIn, nauka.
- (C) **Male, samodzielne narzedzia single-file / wizualizacje** (pokoj_kota, katownik-3d.html w rootcie, Agent_Architecture, Prywatny-F) - HTML/JS bez backendu, bez infrastruktury.
- (D) Jeden wyjatek: **OrgChart-Agent-Core** - prawdziwy wieloagentowy system Python z architektura enterprise (Five Minds, HITL, dual-hemisphere).

Nie ma w tym skanie ani jednego folderu z: mikroserwisami, API do wersjonowania, migracja bazy danych, SOC2/compliance, aplikacja SaaS z platnosciami, incident produkcyjny. Zero.

## (a) Typy zadan uzytkownika bez dobrze dopasowanego agenta/presetu

1. **Osobisty research decyzyjny/konsumencki (kupno, hobby, zdrowie, rozrywka)** - Prywatny-H, Prywatny-C, Prywatny-D pokazuja powtarzajacy sie wzorzec: "oceniam produkt/opcje pod katem subiektywnych preferencji, chce rankingu 3-poziomowego, min. % zrodel z Reddita". `/research` (8 ag: tech, UX, Reddit, X, GitHub, forums, docs + krytyk) jest najblizszy, ale zaprojektowany pod tech/product research (GitHub researcher, docs researcher sa martwym kosztem dla "ranking odmian konopi" albo "plecak dla kota"). Brakuje lzejszego presetu "Consumer Decision Research" (Reddit + forums + krytyk + syntetyk rankingu, bez tech/GitHub/docs).

2. **Coaching kariery / przygotowanie do rozmowy kwalifikacyjnej** - Kariera-A to calkowicie inny typ zadania: symulacja rozmowy rekrutacyjnej, budowanie narracji STAR/behavioral, mapowanie doswiadczenia (AML) na wymagania (KYC). Zaden z 35 agentow nie jest "interview coach" ani "career narrative writer". Najblizszy `expert_pragmatist`/`writer`/`analyst` nie adresuje tego wprost.

3. **Nauka/tutoring sekwencyjny (skill building)** - nauka-python, NaukaAI/nauka Pythona. `kb-constructor` buduje baze wiedzy, ale nie projektuje sciezki nauczania z progresja trudnosci ani nie sprawdza zrozumienia. Brak "curriculum designer" / "tutor" agenta.

4. **Personal branding / social content (LinkedIn specyficznie)** - Kariera-D. `/content` (Researcher+Writer+Designer+Krytyk) jest ogolny pod blog/newsletter, nie ma nikogo kto rozumie mechanike LinkedIn (algorytm, hooks, dlugosc posta, personal voice). To rozne rzemioslo niz blog post.

5. **Audyt dokumentu osobistego (CV) pod katem jakosci i "bezpieczenstwa danych"** - Kariera-B ma `AUDIT_SECURITY_SWISS.md` co sugeruje traktowanie CV jak dokumentu do audytu prywatnosci/security (np. co ujawnia CV rekruterowi/scraperom). `qa_security` w repo jest zaprojektowany pod kod (OWASP), nie pod dokumenty PII.

6. **Male narzedzia wizualne/3D bez backendu** - pokoj_kota (`top-view.html`, `viewer.html`, `room.json`) to lekki 3D/spatial viewer. `/design-sys`, `/ui-overhaul` zakladaja istniejacy produkt/design system do przebudowy; tu chodzi o male, samodzielne demo wizualizacyjne - blizej `/solo`+`frontend`, ale bez dedykowanego "wizualizacja 3D/spatial" know-how w opisie agenta `frontend.md` (warto sprawdzic czy wspomina Three.js/WebGL - jesli nie, to luka).

7. **RPA / automatyzacja desktopowa (UiPath)** - `DO CC/UiPathPlatformRobot.msi` sugeruje eksperymenty z RPA. Zaden agent/preset nie adresuje automatyzacji desktop/RPA (to inna domena niz web dev).

8. **Lekki "how-to" / setup guide dla narzedzi lokalnych (AI tooling na wlasnym sprzecie)** - Prywatny-G (face/scene swap lokalnie, limit VRAM). Czesciowo pokrywa `/research`, ale koncowy artefakt to instrukcja krok-po-kroku z realistycznymi oczekiwaniami i nota prawna - blizej `tech-writing-pipe`, ale ten jest zaprojektowany pod dokumentacje API/ADR, nie pod "hardware-aware setup guide".

## (b) Agenci/presety nisza-do-niszy nakladajace sie lub nieadekwatne wobec typu pracy uzytkownika

Bazujac na faktycznym uzyciu (0 projektow SaaS/mikroserwisow/compliance w skanie):

- `/microservices` (9 ag) - dekompozycja monolitu. Uzytkownik nie ma zadnego monolitu do dekompozycji w widocznych projektach. Wysokie ryzyko "martwego" presetu.
- `/api-modern` (7 ag) - migracja REST->GraphQL, wersjonowanie API. Brak jakiegokolwiek API w skanowanych projektach poza OrgChart (ktory jest samodzielnym pipeline'em Python, nie webowym API do modernizacji).
- `/migration-crew` (10 ag) - migracja frameworka/bazy/clouda. Zero projektow migracyjnych na dysku.
- `/soc2-sweep` (9 ag) - SOC2/ISO27001/GDPR compliance. Zaden projekt uzytkownika nie jest produktem podlegajacym formalnemu audytowi compliance (to sa osobiste narzedzia i research, nie firma SaaS).
- `/saas`, `/fullstack-premium`, `/prd-to-launch`, `/full` - cztery ciezkie presety "zbuduj caly produkt" (10-12 ag), silnie nakladajace sie funkcjonalnie (front+back+DB+QA+GTM w roznych proporcjach). Przy braku faktycznego projektu SaaS na dysku to czterokrotna redundancja tej samej niszy "duzy produkt od zera".
- `/ab-test-lab` (7 ag) - A/B testy statystyczne wymagaja zywego produktu z ruchem/danymi uzytkownikow. Nic w skanie na to nie wskazuje.
- `/incident-war-room` (10 ag) - incydent produkcyjny z telemetria/observability. Uzytkownik nie prowadzi zadnej us
ugi produkcyjnej z monitoringiem (poza mozliwie OrgChart, ale to nie jest live service).
- `/data-pipe` (7 ag, ETL/scheduled jobs) vs `/data-analysis-pipe` (9 ag, EDA+model+raport) - dwa osobne presety danych, ale uzytkownik nie ma zadnego ETL/pipeline infra na dysku; jego "dane" to raczej jednorazowe rankingi/analizy (Prywatny-H, Prywatny-C) czyli blizej analysis niz pipe. `data-pipe` wyglada na niszowy wobec realnego uzycia.
- `res_github.md` w ramach `/research` - researcher GitHuba jest przydatny dla projektow technicznych (np. Prywatny-G, OrgChart), ale bezuzyteczny/kosztowny balast dla research konsumenckiego (Prywatny-H, Prywatny-C, Prywatny-D), gdzie uzytkownik explicite chce "min. 60% Reddit". To sugeruje, ze `/research` powinien miec wariant lzejszy bez GitHub/docs researcherow do zadan nietechnicznych.
- `gtm_strategist.md` - agent Go-To-Market ma sens tylko w `/prd-to-launch`; przy braku realnych launchow produktowych to bardzo wasko wykorzystywany, jednorazowy agent.

## (c) Konkretni kandydaci (5-10)

1. **Dodac lekki preset `/consumer-research` (Reddit + Forums + Krytyk + Syntetyk, ~4-5 ag, tani)** do domeny "decyzje osobiste/konsumenckie", bo Prywatny-H, Prywatny-C i Prywatny-D(Riders Republic) pokazuja powtarzalny wzorzec: subiektywny ranking opcji na bazie doswiadczen spolecznosci, bez potrzeby res_tech/res_github/res_docs. Obecny `/research` (8 ag) jest przewymiarowany i kosztowo nieadekwatny dla tego typu zadan - platnosc za agentow ktorzy nigdy nie znajda tresci do researchu (np. GitHub dla odmiany konopi).

2. **Skonsolidowac `/saas`, `/fullstack-premium`, `/prd-to-launch` w jedna eskalowana rodzine z jasnym rozroznieniem, a nie 3 rownolegle flagowe presety.** Wszystkie trzy robia "zbuduj produkt od poczatku do konca" rozna tylko liczba dodatkow (DB architect, observability, GTM). Przy zerowym realnym uzyciu SaaS przez uzytkownika, utrzymywanie 3 osobnych ciezkich wariantow (10-12 ag kazdy) to duplikacja dokumentacji/kosztu utrzymania bez dowodu popytu.

3. **`/soc2-sweep` jest martwy preset wobec profilu uzytkownika** - zero projektow wymagajacych formalnego compliance (SOC2/ISO/GDPR jako produkt firmowy). Rozwazyc oznaczenie jako "enterprise-only, nie dla projektow osobistych" albo usuniecie z domyslnej listy szybkiego doboru, zeby nie zabieral miejsca w PRESET_CATALOG.md przy Auto-routingu.

4. **`/microservices` i `/api-modern` nie pasuja do zadnego zaobserwowanego projektu** - uzytkownik nie ma monolitow ani publicznych API do modernizacji. Kandydat do przesuniecia w "long tail" katalogu (nizszy priorytet w routing guide) zamiast trzymania w sekcji ZAAWANSOWANE na rowni z realnie uzywanymi presetami.

5. **Dodac agenta/preset pod "Career & Personal Narrative Coaching"** (np. `interview_coach.md` + lekki preset `/interview-prep`: researcher wymagan roli + coach narracji STAR + krytyk devil's-advocate symulujacy trudne pytania) - bo Kariera-A to konkretny, powtarzalny typ zadania (mapowanie doswiadczenia kandydata na wymagania oferty + symulacja rozmowy), a obecny roster (analyst/writer/expert_pragmatist) nie ma nikogo wyspecjalizowanego w rekrutacyjnych dynamikach ani behavioral interviewing.

6. **Rozwazyc dedykowany agent "content_social.md" pod LinkedIn/personal branding**, odrebny od `writer.md` w `/content` - Kariera-D pokazuje, ze uzytkownik traktuje to jako osobny gatunek (algorytm, hooks, dlugosc, glos osobisty), co rozni sie od blog/newsletter copy, na ktory `/content` jest dzis skalibrowany.

7. **`/data-pipe` (ETL) wyglada na niszowy/nieadekwatny wobec profilu** - uzytkownik nie prowadzi zadnej infrastruktury danych ze scheduled jobs; jego prace danowe (NaukaAI, Prywatny-H rankingi) to raczej jednorazowa eksploracja i synteza, blizej `/data-analysis-pipe`. Kandydat do redukcji priorytetu `/data-pipe` w routing guide albo polaczenia obu w jeden preset z opcjonalnym ETL-modulem.

8. **`res_github.md` i `res_docs.md` powinny byc opcjonalne/wylaczalne w `/research`**, nie stale wliczone w 8-agentowy sklad - dla zadan nietechnicznych (konsumenckie/zdrowotne/hobby) generuja koszt bez wartosci. Prosty flag "--no-tech" w preset config obcinalby 2 agentow z 8 dla zadan typu Prywatny-H/Prywatny-C.

9. **`/ab-test-lab` (7 ag) jest martwy wobec profilu uzytkownika** - wymaga zywego produktu z danymi uzytkownikow i ruchem; zaden folder na dysku tego nie sugeruje. Kandydat do oznaczenia jako "wymaga aktywnego produktu produkcyjnego" w opisie, zeby auto-routing nigdy go nie proponowal dla osobistych projektow.

10. **Dodac krotki agent/preset "3D/spatial visualization"** (rozszerzenie `frontend.md` o Three.js/WebGL/CSS 3D transform know-how, lub dedykowany tag w `design-sys`) - pokoj_kota (`top-view.html`, `viewer.html`, `room.json`) i `katownik-3d.html` w rootcie pokazuja powtarzajacy sie wzorzec lekkich, samodzielnych wizualizacji 3D w przegladarce, ktore dzis nie maja wyraznego "domowego" agenta poza ogolnym frontendem.

## Uwaga koncowa

Silny, powtarzajacy sie sygnal ze skanu: co najmniej 6 z 19 folderow (Prywatny-H, Prywatny-C, Prywatny-D, Prywatny-G, Kariera-A, Kariera-D, Kariera-B) to praca **nietechniczna/osobista**, dla ktorej caly obecny katalog 35 agentow/42 presetow (zaprojektowany wokol backend/frontend/QA/DB/observability/GTM) jest strukturalnie niedopasowany - uzytkownik "wygina" `/research` i `/content` pod zadania, dla ktorych te presety nie byly projektowane. To najwazniejszy wniosek do porownania z R1-R6: mozliwe, ze warto rozwazyc calkiem nowa, mniejsza "domene osobista" (personal/consumer/lifestyle) rownolegle do istniejacej domeny "software engineering", zamiast dorzucania pojedynczych agentow do istniejacego dev-centrycznego rdzenia.
