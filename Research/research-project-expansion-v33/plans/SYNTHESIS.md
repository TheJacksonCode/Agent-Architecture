# SYNTHESIS - Rozbudowa projektu Agent Architecture Designer (v33)

> Raport decyzyjny. ZERO zmian w kodzie do momentu zatwierdzenia zakresu przez uzytkownika (Maciej).
> Kampania: deep-research-v2. Rola: Syntetyk Lean. Data: 2026-08-21.
> Zrodla: R1-R7 + CRITIC.md z `Research/research-project-expansion-v33/research/`.
> Zasada nadrzednosci: gdzie surowe raporty (R2/R3/R5) sa sprzeczne co do liczb, obowiazuja rozstrzygniecia Krytyka (CRITIC.md).

---

## 1. Executive Summary

Ta kampania odpowiada na jedno pytanie: czy portfolio agentow i presetow projektu Agent Architecture Designer jest dopasowane do tego, jak Maciej realnie uzywa systemu. Odpowiedz jest jednoznaczna i stanowi glowny insight kampanii: **system jest zbudowany pod software engineering, a realne uzycie jest w wiekszosci non-software (research decyzyjny i osobisty)** (R1 wniosek 7, R7 uwaga koncowa, CRITIC Konflikt 4). To nie jest wada architektury - to rozdzwiek miedzy podaza (dev-centryczny katalog) a popytem (research/decyzje zyciowe).

Drugi, rownie wazny wniosek: **najpilniejsza poprawka to nie dodanie niczego nowego, lecz naprawa dryfu miedzy plikami a katalogiem routingu.** Najczesciej realnie uzywany preset, `deep-research-v2` (~8 kampanii, R5), fizycznie istnieje jako plik komendy, ale NIE MA GO w `PRESET_CATALOG.md`, wiec auto-router nigdy go nie zaproponuje (CRITIC Konflikt 6). To defekt, nie brak funkcji.

Kluczowe liczby (rozstrzygniete przez Krytyka, uzywaj tych, nie z R2/R3/R5):
- **37 plikow skills** na dysku (nie 35 - "35" to liczba encyklopedyczna z HTML) (CRITIC Konflikt 1).
- **44 pliki commands** fizycznie, ale tylko **42 w PRESET_CATALOG.md**. Poza katalogiem: `bento-redesign` i `deep-research-v2` (CRITIC Konflikt 2).
- `deep-five-minds` ma realnie **25 agentow** (plik komendy), katalog blednie mowi 27 (CRITIC Konflikt 3).

### Top 5 rekomendacji (priorytet)

1. **[P0] Naprawa dryfu katalogu.** Dodac `deep-research-v2` i `bento-redesign` do `PRESET_CATALOG.md`; poprawic `deep-five-minds` 27 -> 25. Zero ryzyka, twardy dowod, natychmiastowa wartosc (CRITIC sekcja "Ocena rekomendacji", pkt 1).
2. **[P1] Wariant/flaga `/research --no-tech`** (odciecie res_github/res_docs/res_tech) zamiast nowego presetu `/consumer-research`. Dowod n=3 (Prywatny-H, Prywatny-C, Prywatny-D), ale tansze i odwracalne (CRITIC ocena consumer-research; R7 pkt 8).
3. **[P1] Reorganizacja routingu, nie kasowanie plikow.** Presety enterprise (`/saas`+`/fullstack-premium`+`/prd-to-launch`, oraz `/soc2-sweep`, `/microservices`, `/api-modern`, `/ab-test-lab`) demote do "long tail" w katalogu (CRITIC Konflikt 5 + ocena; R7 pkt 2-4, 9).
4. **[P2] Uzupelnienie luk keywordowych w katalogu** (deployment/CI-CD, mobile, ML/AI features, observability) - dopisac frazy do istniejacych presetow, nie tworzyc nowych (R4 sekcja luki).
5. **[P2 / backlog] `interview_coach` i `content_social` do backlogu z progiem "drugi przypadek uzycia".** Dowod n=1 (Kariera-A) i n=0 (pusty folder linkedin) - za slaby na staly byt (CRITIC ocena; R1 wiersz Kariera-D; R7 pkt 5-6).

Pod tymi rekomendacjami stoi jedno otwarte pytanie do uzytkownika (HITL, sekcja 8): czy projekt ma zostac dev-centryczny, czy dorosnac o osobna, lekka sciezke "personal/consumer research". To decyzja o celu, nie o danych - nie da sie jej rozstrzygnac z samych raportow (CRITIC Gap 6).

---

## 2. Profil pracy uzytkownika

Podstawa: R1 (inwentaryzacja 18 folderow w `C:/Projekty Claude Code/`) potwierdzona niezaleznym skanem R7. Krytyk ocenil R1 jako PASS z mocnym uzasadnieniem per pozycja (CRITIC werdykt R1).

### Dominujacy wzorzec: research-first, code-optional

Zdecydowana wiekszosc folderow to projekty czysto researchowe, gdzie deliverable to markdown, nie dzialajacy kod (R1 wniosek 1). Liczbowo (R1 podsumowanie):
- Czysto research/dokumentacja bez kodu: **11 z 18** folderow.
- Frontend/HTML mikro-aplikacje: 3 (Prywatny-A/pokoj kota, nauka-python, Kariera-B/cv-project).
- Prawdziwy kod/backend z testami: **1** (OrgChart-Agent-Core).
- Tresc kreatywna: 1 (Prywatny-F).
- Foldery-smietniki/puste: 2 (DO CC, Kariera-D).

Tematyka siega daleko poza IT: sim racing, medyczna produkt z kategorii zdrowie (Prywatny-H), transportery dla kota (Prywatny-C), Prywatny-B dla dziecka (Prywatny-B), ocena gry wideo (Prywatny-D/Riders Republic), przygotowanie do rozmowy o prace (Kariera-A) (R1 wniosek 1, R7 sekcja "Co widac na dysku").

### Kontrast software vs personal/lifestyle

R7 grupuje realne uzycie w cztery typy (R7 sekcja "Co widac na dysku"):
- (A) Osobisty/konsumencki research decyzyjny: Prywatny-H, Prywatny-C, Prywatny-D, Prywatny-G.
- (B) Osobisty rozwoj/kariera/branding: Kariera-A, Kariera-D, Kariera-B, NaukaAI.
- (C) Male, samodzielne narzedzia single-file / wizualizacje: pokoj kota, Agent_Architecture, Prywatny-F.
- (D) Jeden wyjatek software engineering: OrgChart-Agent-Core (Python, pytest, wlasny framework agentowy zbudowany na konwencjach Agent_Architecture v32.16).

Warto przejsc przez najbardziej reprezentatywne foldery, bo to one - a nie abstrakcyjne kategorie - sa dowodem na profil (R1 tabela):
- **Prywatny-H** - ranking odmian produktu z kategorii zdrowie dopasowanych do preferowanego profilu efektu, z ciekawym wzorcem "sesja 2 nadrzedna do sesji 1" (iteracyjne poglebianie przez genealogie genetyczna z SeedFinder). Ukonczony, WebSearch/WebFetch-driven, zero kodu.
- **Prywatny-C** - research plecakow-transporterow dla kota w miescie, wymaganie Reddit-first (60%+ zrodel), wzorcowy przyklad "przemapowania" rol technicznych (res_github -> consumer reports, res_docs -> IATA) na temat konsumencki (R1 tabela + wniosek 1).
- **Prywatny-D** - ocena gry Riders Republic pod katem gracza z 7000h w Rocket League; mimo nazwy sugerujacej hardware to research konsumencki decyzji zakupowej (R7 pkt 14). Wczesna faza/mozliwie porzucony.
- **Kariera-A** - przygotowanie osoby trzeciej do rozmowy na stanowisko analityczne w sektorze finansowym, mapowanie doswiadczenia AML na wymagania KYC. Struktura v1/ wg standardu Research+Plans, preset docelowy explicite `deep-five-minds` (R1 tabela; R5 tabela dowodow).
- **OrgChart-Agent-Core** - jedyny dojrzaly kodowo projekt: kod Python w modulach (agents/, orchestrator.py), testy (pytest_cache), ARCHITECTURE.md 35KB, JOURNEY.md 43KB, zbudowany na tych samych konwencjach co Agent_Architecture (HITL gates, Five Minds). To dowod, ze uzytkownik juz raz "wyeksportowal" architekture multi-agent do samodzielnego produktu - potencjalny "graduation path" (R1 wniosek 4).

Krytyczna obserwacja R7 (potwierdzona przez R1 wniosek 7): w calym skanie **nie ma ani jednego** folderu z mikroserwisami, wersjonowaniem API, migracja bazy, compliance SOC2, aplikacja SaaS z platnosciami czy incydentem produkcyjnym (R7: "Zero."). To dokladnie te domeny, pod ktore zaprojektowano najciezsze presety.

### Niekonsekwencja w stosowaniu standardu wersjonowania

Global CLAUDE.md wymusza strukture `v{N}/MASTER_PLAN + PROGRESS + research/ + plans/` dla projektow "wiekszych". Widac ja w Kariera-A, NaukaAI, nauka-python, Prywatny-F - ale wiele rownie nietrywialnych projektow research-heavy (Prywatny-H, Prywatny-C, Prywatny-B, Prywatny-D, Prywatny-G) uzywa plaskiego MANIFEST.md bez pelnej struktury, mimo ze temat jest wielosesyjny i wieloagentowy (R1 wniosek 2). Granica miedzy "male" a "wieksze" jest rozmyta w praktyce (np. Prywatny-G ma DD1-DD5 i 4 watki, a nie ma pelnej struktury v{N}/). To nie jest bezposrednio problem katalogu agentow, ale sygnal, ze uzytkownik czesto odpala krotsze presety dla zadan jednorazowych - co wzmacnia teze o zapotrzebowaniu na lekki research-preset (sekcja 6, P1.1).

### Foldery-huby mieszajace binaria z dokumentacja

DO CC, Prywatny-E, Prywatny-G mieszaja markdown-research z duzymi plikami binarnymi (instalatory gier .exe/.msi rzedu setek MB, PDF-y 20-30MB) (R1 wniosek 3). DO CC to wrecz folder-smietnik bez struktury projektowej. To generuje szum przy skanowaniu katalogu i ryzyko przypadkowego odczytu duzych binariow przez narzedzia. Poza zakresem v33 (to higiena repozytoriow uzytkownika, nie katalogu agentow), ale warte odnotowania jako kontekst.

### Powtarzalny wzorzec metodologiczny

Uzytkownik swiadomie stosuje szablon "software-project-planning" (MANIFEST.md z sekcjami Zadanie / Decyzje Architektoniczne DD / Stack / Known Risks / Open Questions) nawet do tematow calkowicie nietechnicznych (R1 wniosek 5). Wzorcowy przyklad to Prywatny-C: role typowo techniczne sa "przemapowane" na temat konsumencki (res_github -> consumer reports, res_docs -> standardy IATA) (R1 tabela, wiersz Prywatny-C). To nie jest przypadkowa improwizacja - to spojny, powtarzalny sposob pracy.

### Rozproszony watek kariery

Watki CV/job-search pojawiaja sie w co najmniej 3-4 miejscach: Kariera-B, Prywatny-G/cv, Kariera-C (sierota po nieudanym zapisie na D:), oraz Kariera-A (R1 wniosek 6). To sugeruje jeden nadrzedny cel (kariera) rozproszony po niepowiazanych folderach bez zrodla prawdy.

### Wniosek dla v33

Aktualny portfel jest silnie wyskalowany pod software engineering, ale realne uzycie lokalne jest w >80% non-software, research/decision-heavy (R1 wniosek 7 - "najwazniejszy wniosek"). To fundament dla sekcji 4-6. Uwaga rownowazaca (CRITIC Gap 6): kontekst zawodowy Maciej (AI Native Engineer, POC dla Michala) moze oznaczac, ze trajektoria profesjonalna wroci do software - co oslabia teze "przeorientuj na personal". Dlatego kierunek domenowy to pytanie HITL, nie automatyczna rekomendacja.

---

## 3. Stan agentow

Podstawa: R2 (najwyzsza rzetelnosc liczbowa w calym korpusie wg CRITIC werdykt R2) + rozstrzygniecia Krytyka.

### Inwentaryzacja: 37 plikow, ~35-36 rol

Fizycznie w `~/.claude/skills/*.md` jest **37 plikow**, nie 35 (R2 uwaga metodologiczna, CRITIC Konflikt 1). Liczba "35" pochodzi z `AGENT_EDU_PL` (35 wpisow encyklopedycznych w HTML v32.16) i jest powtarzana w CLAUDE.md/MEMORY.md. Delta:
- `synthesizer_lean.md` to wariant `synthesizer.md` (ta sama rola, 2 tryby wykonania: klasyczny sonnet vs lean/map-reduce opus) - koncepcyjnie 1 kompetencja, formalnie 2 pliki (R2 duplikat 1).
- `db_architect.md` i `observability_engineer.md` to nowsze dodatki spoza pierwotnych 35 (R2 uwaga metodologiczna).

Liczba odrebnych rol to zatem ~35-36. **Dla v33: pracowac na 37 plikach / ~36 rolach, ale utrzymac "35" jako liczbe encyklopedyczna do czasu swiadomej decyzji o synchronizacji encyklopedii HTML z warstwa skills** (CRITIC Konflikt 1). To jedna z otwartych kwestii HITL (sekcja 8).

### Klastry (R2 sekcja "Klastry tematyczne")

1. Orchestration/Meta/Planning (4): analyst, planner, orchestrator, decision_presenter. Brak nakladania - kazdy ma odrebna faze cyklu.
2. Build - Software Delivery (6): backend, frontend, feature, designer, integrator, db_architect. feature.md jest swiadomym "wypelniaczem luk" (real-time, AI/ML), co unika duplikacji.
3. Build - Content/Docs (1): writer.
4. QA/Audit (4): qa_quality, qa_security, qa_perf, qa_manager. Czysty podzial domenowy.
5. Research - zewnetrzne zrodla (7): res_tech, res_docs, res_github, res_reddit, res_forums, res_x, res_ux. Najbardziej rozbudowany klaster.
6. Research - Meta/Processing (3 + wariant): res_critic, res_extractor, synthesizer (+ synthesizer_lean).
7. Debate - Five Minds (5): expert_pragmatist, expert_devil, expert_innovator, expert_analyst, expert_user. Wszyscy na Opus.
8. Compliance/Governance (1): control_mapper.
9. Strategy/GTM (1): gtm_strategist.
10. Ops/Incident/Observability (2): observability_engineer, telemetry_surfer.
11. Data Science (2): eda_analyst, statistician.

Model-routing jest konsekwentny i to jeden z najmocniejszych elementow architektury (R2 rozklad modeli):
- **Opus (7):** orchestrator, expert_pragmatist, expert_devil, expert_innovator, expert_analyst, expert_user, synthesizer_lean. Caly panel Five Minds na Opus, bo to praca rozumowania/argumentacji wysokiej stawki.
- **Sonnet (22):** cala warstwa build + wiekszosc syntezy + researcherzy wymagajacy glebszej analizy (res_github, res_forums, res_x, res_critic, res_extractor).
- **Haiku (8):** decision_presenter, cala warstwa QA poza managerem (qa_quality, qa_security, qa_perf), oraz researcherzy faktograficzni (res_tech, res_docs, res_reddit, res_ux).

Zasada jest czytelna: Opus = decyzje/debata wysokiego ryzyka, Sonnet = wykonanie, Haiku = praca wzorcowa/checklistowa. Krytyk i cały korpus istniejacego researchu potwierdzaja, ze ten routing jest zwalidowany wzorcem oficjalnym Anthropic - code-review.md Borisa Cherny'ego (R6 pkt 1, pkt 7). Co wiecej, kampania subagents-task-tool cytuje Deep Research v2 jako kanoniczny przyklad "advisor strategy" - routing Opus/Sonnet/Haiku obcial wydatki na Opus o ~60% vs baseline all-Opus przy zachowaniu jakosci (R6 pkt 8). To sugeruje, ze dalsze inwestycje warto kierowac w uogolnienie tego routingu na pozostale presety (R6 niewdrozone rekomendacje pkt 11), a nie w mnozenie agentow.

### Duplikaty / nakladajace sie kompetencje (R2 sekcja "Duplikaty")

1. **synthesizer vs synthesizer_lean** - swiadomy, udokumentowany duplikat (2 tryby jednej roli), nie przypadkowy. Nie ruszac.
2. **res_docs vs res_tech** - najbardziej realne ryzyko redundancji: oba czytaja "oficjalne zrodla" z URL/cytatem, zakresy moga sie pokrywac przy tym samym query (R2 duplikat 2). Kandydat do doprecyzowania keywordow w katalogu, nie do kasowania.
3. **observability_engineer vs telemetry_surfer** - bliskie nazewnictwo, rozne fazy ("instrumentuje" vs "przeszukuje"). Ryzyko routingu niskie, ale warto pilnowac keywordow (R2 duplikat 3).
4. **res_forums vs res_reddit** - oba to opinie spolecznosci, roznica to kanal. Czesciowe pokrywanie przy "co ludzie mowia o X" (R2 duplikat 4).
5. **qa_quality vs qa_manager** - nie duplikat funkcjonalny (audytuje vs agreguje), tylko latwe do pomylenia nazewniczo (R2 duplikat 5).

Wniosek: brak duplikatow wymagajacych kasowania. Wszystkie to kwestie doprecyzowania keywordow w routingu (P2).

### Luki domenowe (R2 sekcja "Luki")

Najwyrazniejsze (R2 luki 1-2, podsumowanie):
- **Brak dedykowanego agenta mobile** (iOS/Android/React Native) - frontend.md deklaruje "mobile-first" ale to web frontend.
- **Brak dedykowanego agenta DevOps/Infra/CI-CD** - jest observability i db_architect, ale nikt nie odpowiada za infrastrukture jako kod, deployment, konteneryzacje.

Pozostale, mniej dotkliwe: brak agenta Legal (poza compliance technicznym control_mapper), brak Cost/FinOps, brak i18n/lokalizacji, slaba reprezentacja growth/SEO poza gtm_strategist, brak dedykowanego Test Engineer (swiadomy wybor - wpada w backend/frontend), brak competitive intelligence (R2 luki 3-8).

Wazna uwaga wiazaca luki agentow z profilem uzytkownika: luki mobile i DevOps sa realne wzgledem *best-practices platformy*, ale wzgledem *realnego uzycia* Maciej (sekcja 2) sa marginalne - on nie robi ani mobile, ani DevOps. Priorytet tych luk jest wiec niski w kontekscie v33 (patrz sekcja 7).

---

## 4. Stan presetow

Podstawa: R3 (PASS z zastrzezeniem - solidna analiza wzorcow, ale chaotyczny przypis o liczbie presetow; CRITIC werdykt R3) + rozstrzygniecia Krytyka.

### Inwentaryzacja: 44 pliki, 42 w katalogu

Fizycznie w `~/.claude/commands/*.md` jest **44 pliki komend**, ale `PRESET_CATALOG.md` dokumentuje **42** (CRITIC Konflikt 2). R3 sam sie w tym zgubił (naliczyl 43 i zostawil jako "nalezy zweryfikowac", R3 uwaga pod tabela) - Krytyk rozstrzyga: dwie komendy istnieja jako pliki, ale nigdy nie dodano ich do katalogu routingu:
- **`bento-redesign`** (istnieje jako skill i komenda, 8 agentow, R3 wiersz 4).
- **`deep-research-v2`** (17 agentow, R3 wiersz 13) - i to jest kluczowy defekt, bo to najczesciej uzywany preset (sekcja 5).

To nie jest tylko rozbieznosc liczbowa - to defekt: preset o najsilniejszym dowodzie realnego uzycia jest niewidoczny dla auto-routera (CRITIC Konflikt 2 i 6). Liczba "42" opisuje pokrycie routingu, nie stan repo; realny stan to 44 komendy z 2 poza katalogiem.

Dodatkowo: `deep-five-minds` ma realnie **25 agentow** (naglowek pliku komendy mowi "25 unikalnych agentow", tabela konczy sie na wierszu 25 = qa_manager), a katalog blednie podaje 27 (CRITIC Konflikt 3, R3 wiersz 11 ma poprawne 25, R4 zacytowal bledne 27 z katalogu).

### Grupy tematyczne (R3 sekcja "Grupy tematyczne")

Katalog dzieli sie na: Research-heavy (8 presetow), Build/Feature (10), Security/Audit (3), QA/Testing (4), Refactor/Legacy/Migracja (4), Performance/Reliability (3), Content/Docs (2), Data (3), UI/UX/Design (4), Meta/Planning/maksymalne orkiestracje (5). Rozklad pokazuje wyrazna dominacje presetow "build produkt" i "security/compliance" - czyli dokladnie tych domen, ktorych R1/R7 nie znalazly w realnych projektach.

### Nakladanie sie - kandydaci konsolidacji (R3 sekcja "Nakladanie")

R3 zidentyfikowal 10 par/grup nakladajacych sie. Najsilniejsze:

1. **`/research` vs `/deep-research-swarm-pro` vs `/deep-research-v2`** - trzy presety do tego samego zadania (deep research), rozne tylko modelem researcherow i obecnoscia fazy Extract (R3 nakladanie 1). NAJSILNIEJSZE nakladanie w katalogu. Rekomendacja R3: scalic `/research` + `/deep-research-swarm-pro` w jeden preset z flaga jakosci, zostawic `/deep-research-v2` osobno (ma realnie inna architekture - Extract phase).
2. **`/five-minds` vs `/five-minds-strategic` vs `/deep-five-minds`** - `/five-minds` (14 ag) w praktyce NIE zawiera pelnej debaty 5 ekspertow (tylko fan-out research+build+QA), mimo nazwy - dubluje `/full` (R3 nakladanie 2, CRITIC Konflikt 7). To zwalidowany defekt nazewniczy: R3 czytal fazy pliku, katalog opisuje intencje.
3. **`/standard` vs `/saas` vs `/feature-sprint`** - trzy warianty tego samego web/SaaS build pipeline (R3 nakladanie 4).
4. **`/quick-fix` vs `/solo` vs `/bug-hunt`** - drabinka tego samego zadania (fix bug) z 3 poziomami rygoru (R3 nakladanie 8).
5. **`/perf-boost` vs `/perf-squad`** oraz **`/security` vs `/security-multi-vector`** - pary "szybki vs pelny" (R3 nakladanie 6-7).
6. **`/legacy` vs `/api-modern` vs `/plan-exec`** - progresja tego samego zadania "zmiana istniejacego kodu" z rosnaca liczba agentow (4 -> 6 -> 9), kandydat do skalowalnego scope (R3 nakladanie 5).
7. **`/recon` vs `/reflect` vs `/startup`** - lekkie hub-and-spoke presety do szybkiej eksploracji; `/startup` wyglada jak `/recon` + 2 agentow (R3 nakladanie 9).

Wazne rozroznienie R3 (nakladanie 10): trojka `/full` (13) < `/deep` (18) < `/deep-five-minds` (25) to **NIE zbedne nakladanie, tylko dobrze zaprojektowana hierarchia kosztowa** - tiers tego samego zadania klasy enterprise, warte zachowania. Podobnie R3 wskazuje presety BEZ nakladania, unikalne i warte zachowania w obecnej formie: `/deep-research-v2` (jedyny z Extract), `/bento-redesign` (jedyny layout), `/incident-war-room`, `/kb-constructor`, `/prd-to-launch`, `/soc2-sweep`, `/ab-test-lab`, `/tech-writing-pipe`, `/migration-crew`, `/cascade`, `/deep-five-minds` (R3 sekcja "Presety BEZ nakladania"). Wniosek: konsolidacja dotyczy garstki rodzin, nie wiekszosci katalogu.

### KLUCZOWE: konsolidacja = REORGANIZACJA KATALOGU, nie kasowanie plikow

To najwazniejsze przeformulowanie w calej sekcji. R6 (synteza istniejacego researchu) ustalil, ze **nieuzyte presety maja zerowy koszt tokenowy** - command files sa lazy-loaded, body nie laduje sie do kontekstu az do wywolania, koszt startowy 42 presetow = 0 tokenow (R6 pkt 1, pkt 2 context-engineering). Dlatego konsolidacja NIE oszczedza tokenow - porzadkuje tylko katalog/routing (CRITIC Konflikt 5, ocena konsolidacji).

Krytyk rozstrzyga (CRITIC Konflikt 5): "redukcja" powinna oznaczac **demote w routingu, nie kasowanie plikow**. Presety enterprise, ktore R7 nazwal "martwymi" wobec profilu (`/soc2-sweep`, `/microservices`, `/api-modern`, `/ab-test-lab`), sa gotowe tylko jako DEMOTE - "brak projektu dzis" != "nigdy niepotrzebne", a kontekst zawodowy moze je przywrocic (CRITIC ocena "martwe presety"). Bezpieczna forma: oznaczenie "long tail" / "wymaga aktywnego produktu produkcyjnego" w routing guide, by auto-router ich nie proponowal dla zadan osobistych.

Kandydaci konsolidacji WPISOW katalogu (nie plikow):
- Rodzina "duzy produkt od zera": `/saas` + `/fullstack-premium` + `/prd-to-launch` -> jeden bucket z rozroznieniem (CRITIC ocena; R7 pkt 2).
- Naprawa lub przemianowanie `/five-minds` (mylaca nazwa) (R3 nakladanie 2, CRITIC Konflikt 7).
- Ujednolicenie rodziny research przez flagi (juz czesciowo zrobione w `/deep-research-v2 --premium/--budget/--ultra-budget`, R5 pkt 4).

---

## 5. Routing i dopasowanie do realnego uzycia

Podstawa: R4 (mechanika routingu i luki keywordowe, PASS) + R5 (faktyczne uzycie, REVISE - kierunek trafny, liczby do obnizenia rangi; CRITIC werdykt R5).

### Jak dziala routing (R4 sekcja "Jak dziala")

Auto-routing to **czysto promptowy** system - brak kodu, embeddingow, fuzzy-matchingu (R4 sekcja "Jak dziala"). `~/.claude/CLAUDE.md` jest zawsze zaladowany (7-liniowa instrukcja routingu), `PRESET_CATALOG.md` czytany na zadanie gdy user opisze zadanie bez podania presetu. Flow: trigger -> odczyt katalogu -> dopasowanie 1-3 presetow po "keywords i zlozonosci" -> ranking wg kosztu (przy watpliwosci mniejszy preset) -> propozycja -> potwierdzenie -> wywolanie (R4 kroki 1-7).

Kluczowa obserwacja architektoniczna (R4): system nazywa sie "keyword routing", ale katalog **nie ma zadnego atomowego pola `keywords`**. Dopasowanie to semantyczne rozumienie przez LLM bloku "Uzyj gdy / NIE uzywaj gdy" - routing oparty na few-shot przykladach sytuacyjnych, nie na token matchingu (R4 sekcja "Jak dziala", punkt kluczowy). Zalety: odpornosc na synonimy. Wady: brak deterministycznosci, nie da sie zgrepowac pokrycia.

### Luki keywordowe (R4 sekcja "Luki w pokryciu")

R4 sprawdzil 11 typowych kategorii pracy. Luki o wysokim ryzyku zlego routingu:
- **Deployment / CI-CD** - zero wzmianek "deploy/CI-CD/release/canary/blue-green" w calym katalogu (R4 luka 1, ryzyko wysokie).
- **Mobile** - zero wzmianek "mobile/iOS/Android/React Native/Flutter", wszystko web-centryczne (R4 luka 5, ryzyko wysokie).
- **ML/AI features (LLM w produkcie)** - brak keywordu "LLM/prompt/RAG/embedding/AI feature"; ironiczne, bo to projekt o systemach multi-agent AI (R4 luka 6, ryzyko wysokie).
- **Monitoring/observability** - ukryte w 2 duzych presetach, brak jawnego keywordu "dodaj monitoring/alerty/dashboard" (R4 luka 2, ryzyko srednie-wysokie).

Dobrze pokryte: dokumentacja techniczna (`/tech-writing-pipe`), onboarding (`/kb-constructor`), code review (`/review`), incident response (`/incident-war-room`) (R4 luki 8-11).

Wzorzec (R4 podsumowanie luk): katalog jest silny tam, gdzie autor mial jasny mentalny model kategorii, a slaby tam, gdzie kategoria jest poprzeczna lub wschodzaca (AI features, mobile, DevOps). Wazne: te luki keywordowe to domeny, ktorych Maciej i tak nie uzywa (sekcja 2) - wiec to niski priorytet dla v33, poza tanim dopisaniem fraz (P2).

### Faktyczne uzycie - podaz vs popyt (R5)

R5 dostarcza najmocniejszy dowod na rozdzwiek. Uwaga metodologiczna Krytyka jest tu nadrzedna: R5 oparl sie WYLACZNIE na auto-memory jako proxy (nie na surowych transkryptach .jsonl), sam ja zdyskwalifikowal jako niepelna, ale potem cytuje liczby jak twardy sygnal (CRITIC werdykt R5, Gap 3). Dlatego:

**Twarde ustalenia jakosciowe (zostaja):**
- System jest silnie meta - najczesciej uzywany "na sobie samym": kampanie research o Claude Code (Hooks, Settings, CLAUDE.md, Context Engineering, Caching, MCP, Subagents, Skills) + redesigny v32.x przez deep-five-minds (R5 wniosek 1).
- Jedyne presety z jednoznacznym, imiennym dowodem uruchomienia: **`deep-five-minds`** i **`deep-research-v2`** (R5 tabela dowodow, wnioski 2 i 4). `deep-five-minds` to "preset zaufania" do sytuacji o wysokiej stawce decyzyjnej: Kariera-A (interview prep), JobApp (10 decyzji K1-K10 + Devil's Advocate overrides), OrgChart (najwieksza kampania, 12 faz A-L, 14 Design Decisions, 59 testow) (R5 tabela dowodow, wniosek 2).
- `deep-research-v2` to jedyny preset z "produkcyjna" historia iteracji - powstal jako rozwiazanie konkretnego bottlenecku (Syntetyk w kampanii Hooks, feedback_syntetyk_preset_redesign), wdrozony 2026-04-17 i natychmiast uzyty 7-8 razy z ustandaryzowanym model-routingiem (Orchestrator Opus / Researchers Sonnet / Extractors Haiku / Critic+Syntetyk Opus) (R5 wniosek 4, tabela dowodow).
- Nowo stworzone agenty `res_extractor` i `synthesizer_lean` to jedyne z bezposrednim imiennym dowodem uzycia - powstaly dla deep-research-v2 i natychmiast weszly do ~8 kampanii (R5 tabela dowodow, podsumowanie liczbowe).
- Ciekawy fakt techniczny: w 5 kampaniach Tier 2 orkiestracja odbywala sie w GLOWNEJ sesji, nie przez osobny skill `orchestrator`, bo subagenci nie moga spawnowac wlasnych subagentow (recursion depth = 1). To sugeruje, ze formalny skill orchestrator.md jest rzadziej wywolywany jako subagent, niz zakladano (R5 tabela dowodow, wiersz orchestrator; potwierdzone w R6 pkt 8).
- Duza czesc realnej pracy Maciej robi ad-hoc (pojedyncze "agent 1", "agent 2" przez Task tool), nie przez formalne presety - potwierdzone dla JobApp scanner, portfolio/CV, DM-STYL, no-hesi (R5 wniosek 3).
- Najbardziej dojrzala praktyka to NIE nowy preset, lecz routing modeli wewnatrz presetu (R5 wniosek 7) - sugeruje, ze priorytetem moze byc glebsza kontrola cost/model-routing, nie poszerzanie katalogu.
- Presety build (`trio`, `standard`, `saas`) i cala rodzina QA/Security/Compliance nie maja ani jednego sladu uzycia - spojne z tym, ze glowny projekt "mial byc do wizualnych rzeczy, nie jako idealny kod" (brak testow), a projekty zewnetrzne nie sa w fazie produkcyjnego hardeningu (R5 wnioski 5-6).

**Liczby do obnizenia rangi (proxy, nie pomiar):**
- "33/42 presetow bez sladu = 79% nieuzywane" (R5 podsumowanie liczbowe) - Krytyk: to artefakt pomiarowy oparty na niepelnej auto-memory, nie fakt (CRITIC werdykt R5, Gap 3). Realna czestotliwosc uzycia pozostaje NIEZNANA. Uzywac tej liczby jako slabego sygnalu kierunku, nie jako podstawy do decyzji o kasowaniu.

### Synteza rozdzwieku podaz-popyt

Skladajac R4 (co katalog oferuje) z R5 (co jest uzywane) i R1/R7 (co jest na dysku): **podaz jest dev-centryczna (build/security/compliance/data-infra), popyt jest research-heavy i osobisty** (CRITIC Konflikt 4). To nie konflikt do rozstrzygniecia na czyjas korzysc - to glowny insight. Dev-centryczne presety nie generuja kosztu gdy nieuzyte (lazy-load), wiec "nadmiar" jest kosztem katalogu/routingu (auto-router moze proponowac zle presety), nie kosztem tokenow (CRITIC Konflikt 4).

---

## 6. Rekomendacje z priorytetyzacja (P0/P1/P2)

Zasada priorytetyzacji (CRITIC sekcja "Ocena rekomendacji", zasada ogolna): najpierw naprawa dryfu (twardy dowod, zero ryzyka), potem tanie/odwracalne flagi, potem reorganizacja routingu, na koncu nowe byty tylko przy dowodzie n>=2-3. Kazda rekomendacja ma status: GOTOWE / DO BACKLOGU / ODRZUCONE.

### P0 - Zrobic najpierw (twardy dowod, zero ryzyka)

**P0.1 Naprawa dryfu katalog-vs-pliki. STATUS: GOTOWE.**
- Dodac `deep-research-v2` do `PRESET_CATALOG.md` (z keywords: research, kampania, duzy korpus, map-reduce, 30k+ slow). Uzasadnienie: to najczesciej realnie uzywany preset (R5 wniosek 4, ~8 kampanii), a auto-router go nie widzi (CRITIC Konflikt 6 - "najpilniejsza, najtansza i najlepiej udowodniona poprawka w calej kampanii").
- Dodac `bento-redesign` do katalogu (CRITIC Konflikt 2).
- Poprawic liczbe agentow `deep-five-minds`: 27 -> 25 (CRITIC Konflikt 3).
- Rozwazyc pelny audit dryfu 44 plikow komend vs 42 wpisow + 37 skilli vs referencje w komendach - Krytyk znalazl 3 rozbieznosci przy pobieznej weryfikacji, moga byc kolejne (CRITIC Gap 5).

Uzasadnienie priorytetu: to jedyna rekomendacja w calej kampanii z twardym dowodem i zerowym ryzykiem (CRITIC zasada ogolna). Wazniejsza niz jakikolwiek nowy preset.

Drop-in szkice wpisow do `PRESET_CATALOG.md` (do zatwierdzenia/edycji, spojne z formatem "Uzyj gdy / NIE uzywaj gdy" z R4):

```
### /deep-research-v2 (17 ag) - kampania badawcza na dlugim korpusie (map-reduce)
Uzyj gdy: gleboki research na 30k+ slow, wiele zrodel do skompresowania,
  kampania R1-R7 + Extract + Critic + lean Synteza, potrzeba 2-3x szybciej niz swarm-pro.
Flagi: --premium (wszyscy Sonnet+), --budget, --ultra-budget.
NIE uzywaj gdy: krotki research bez duzego korpusu -> /research lub /deep-research-swarm-pro;
  research konsumencki/nietechniczny -> /research --no-tech (patrz P1.1).

### /bento-redesign (8 ag) - redesign dashboardu w ukladzie bento
Uzyj gdy: przebudowa dashboardu/panelu na grid bento, audyt danych + fill-ratio,
  grid math + warstwa wizualna + QA pustki.
NIE uzywaj gdy: ogolny redesign UI -> /ui-overhaul; nowy design system -> /design-sys.
```

Analogicznie skorygowac liczbe w istniejacym wpisie `/deep-five-minds`: "27 ag" -> "25 ag" (CRITIC Konflikt 3).

### P1 - Wysoki priorytet (dobry dowod, odwracalne)

**P1.1 Flaga `/research --no-tech` zamiast nowego presetu `/consumer-research`. STATUS: GOTOWE Z ZAWEZENIEM.**
- Dodac do `/research` flage odcinajaca res_github/res_docs/res_tech dla zadan nietechnicznych (R7 pkt 8). Dowod n=3: Prywatny-H, Prywatny-C, Prywatny-D - powtarzalny wzorzec "subiektywny ranking na bazie doswiadczen spolecznosci, min. 60% Reddit, bez potrzeby res_tech/github/docs" (R1 wnioski 1 i 5, R7 pkt 1).
- Dlaczego flaga, nie nowy preset: brak dowodu, ze obecny `/research` zawiodl - uzytkownik ukonczyl te projekty repurposingiem (CRITIC ocena consumer-research). Flaga jest tansza, odwracalna, daje ten sam efekt. Nowy osobny preset dopiero po walidacji flagi (CRITIC: "zaczac od flagi, a nie od nowego bytu").

**P1.2 Reorganizacja routingu presetow enterprise (demote, NIE kasowanie). STATUS: GOTOWE JAKO DEMOTE.**
- Przesunac `/soc2-sweep`, `/microservices`, `/api-modern`, `/ab-test-lab` do "long tail" w routing guide z etykieta "wymaga aktywnego produktu produkcyjnego" (R7 pkt 3-4, 9; CRITIC ocena "martwe presety").
- Skonsolidowac WPISY (nie pliki) `/saas` + `/fullstack-premium` + `/prd-to-launch` w jeden bucket "duzy produkt od zera" z rozroznieniem (R7 pkt 2, CRITIC Konflikt 5).
- Absolutny warunek: to reorganizacja routingu/katalogu, NIE kasowanie plikow komend (nieuzyte presety maja zerowy koszt tokenowy - R6 pkt 1-2, CRITIC Konflikt 5).

**P1.3 Naprawa/przemianowanie `/five-minds`. STATUS: GOTOWE.**
- `/five-minds` (14 ag) nie zawiera realnej debaty Five Minds mimo nazwy - albo przemianowac, albo naprawic zawartosc faz, by odpowiadala nazwie (R3 nakladanie 2, CRITIC Konflikt 7 - zwalidowany defekt nazewniczy).

### P2 - Sredni priorytet (higiena, tanie mikro-edycje)

**P2.1 Uzupelnienie luk keywordowych w katalogu. STATUS: GOTOWE (mikro-edycje).**
- Dopisac frazy do istniejacych presetow: deployment/CI-CD (do `/saas`), ML/AI features (do `/feature-sprint`/`/trio`), observability (jawny keyword), mobile (wzmianka) (R4 podsumowanie luk). To dopiski do "Uzyj gdy", nie nowe presety.

**P2.2 Doprecyzowanie keywordow dla par nakladajacych sie agentow. STATUS: GOTOWE (mikro-edycje).**
- res_docs vs res_tech, observability_engineer vs telemetry_surfer - jasne rozroznienie keywordow w katalogu, by auto-router nie mylil (R2 duplikaty 2-3).

**P2.3 Rozszerzenie opisu `frontend.md` o 3D/spatial (Three.js/WebGL). STATUS: GOTOWE (mikro-edycja).**
- Dowod n=2 (pokoj kota, katownik-3d.html) - realny ale drobny. To dopisek do opisu agenta, nie nowy agent (R7 pkt 10, CRITIC ocena "3D/spatial viz").

### Backlog - Do obserwacji (dowod za slaby na staly byt)

**B.1 `interview_coach` + `/interview-prep`. STATUS: DO BACKLOGU.**
- Dowod = wylacznie Kariera-A (n=1), a `deep-five-minds` juz tam zadzialal (R5 tabela dowodow). Jeden przypadek nie uzasadnia stalego agenta + presetu w pipeline bilingual (CRITIC ocena interview_coach). Prog powrotu: drugi projekt tego typu.

**B.2 Rozszerzenie w kierunku personal/consumer domeny (nowa "domena osobista"). STATUS: DO BACKLOGU + PYTANIE HITL.**
- R7 sugeruje calkiem nowa, mniejsza "domene osobista" rownolegle do software engineering (R7 uwaga koncowa). To najwieksza zmiana kierunkowa - wymaga decyzji uzytkownika o celu projektu (sekcja 8), nie automatycznej rekomendacji (CRITIC Gap 6).

### Tabela decyzji per element (skrot operacyjny)

Zadna pozycja nie oznacza kasowania pliku. "Demote" = przesuniecie w routing guide, plik zostaje.

| Element | Decyzja | Priorytet | Zrodlo |
|---|---|---|---|
| `deep-research-v2` (poza katalogiem) | DODAC do PRESET_CATALOG.md | P0 | CRITIC K2/K6, R5 |
| `bento-redesign` (poza katalogiem) | DODAC do PRESET_CATALOG.md | P0 | CRITIC K2 |
| `deep-five-minds` liczba 27 | POPRAWIC na 25 | P0 | CRITIC K3, R3 |
| Audit dryfu 44 vs 42 + 37 skilli | ROZWAZYC pelny audit | P0/Q5 | CRITIC Gap 5 |
| `/research` dla zadan nietechnicznych | DODAC flage `--no-tech` | P1 | R7 pkt 8, CRITIC |
| `/saas`+`/fullstack-premium`+`/prd-to-launch` | KONSOLIDACJA WPISOW (bucket) | P1 | R7 pkt 2, CRITIC K5 |
| `/soc2-sweep`, `/microservices`, `/api-modern`, `/ab-test-lab` | DEMOTE do "long tail" | P1 | R7 pkt 3-4,9 |
| `/five-minds` (mylaca nazwa) | PRZEMIANOWAC lub naprawic fazy | P1 | R3, CRITIC K7 |
| Luki keywordowe (deploy/mobile/AI/observ.) | DOPISAC frazy do "Uzyj gdy" | P2 | R4 luki |
| res_docs/res_tech, observ./telemetry | DOPRECYZOWAC keywords | P2 | R2 dupl. 2-3 |
| `frontend.md` + 3D/spatial | DOPISEK do opisu | P2 | R7 pkt 10 |
| `interview_coach` + `/interview-prep` | BACKLOG (n=1) | - | CRITIC ocena |
| `content_social` pod LinkedIn | ODRZUCIC (n=0) | - | R1, CRITIC |
| Nowa "domena osobista" | HITL Q1 | - | R7, CRITIC Gap 6 |
| Redukcja/kasowanie plikow | NIE ROBIC | - | R6, CRITIC K5 |

---

## 7. Czego NIE robic

Rekomendacje odrzucone lub zdegradowane przez Krytyka jako nadinterpretacja pojedynczego researchera lub jako over-reach.

**NIE.1 Nie kasowac zadnych plikow agentow ani presetow.**
Caly dotychczasowy korpus researchu (8 kampanii) NIE rekomendowal redukcji liczby agentow/presetow - architektura zostala uznana za poprawna i unikatowa w ekosystemie (R6 pkt 1, pkt 7, podsumowanie krzyzowe). Nieuzyte presety maja zerowy koszt tokenowy (R6 pkt 1-2). "Redukcja" = demote w routingu, nigdy kasowanie (CRITIC Konflikt 5). R3/R7 nie zaprzeczaja R6 - odpowiadaja na inne pytanie (fit-to-usage vs best-practices), oba wazne (CRITIC Konflikt 5).

**NIE.2 Nie dodawac `content_social` pod LinkedIn.**
Rekomendacja R7 pkt 6 opiera sie m.in. na folderze `Kariera-D`, ktory R1 ustalil jako **pusty (0 plikow)** (R1 tabela, wiersz Kariera-D; CRITIC werdykt R7, ocena content_social). Dowod faktycznie n=0 dla LinkedIna. R7 tego nie sflagowal. ODRZUCIC w tej iteracji.

**NIE.3 Nie tworzyc nowego presetu `/consumer-research` od zera (na razie).**
Zamiast tego flaga `--no-tech` do `/research` (P1.1). Brak dowodu, ze obecny `/research` zawiodl - projekty zostaly ukonczone repurposingiem (CRITIC ocena consumer-research). Nowy byt dopiero po walidacji flagi.

**NIE.4 Nie traktowac liczby "79% presetow nieuzywanych" jako podstawy decyzji.**
To artefakt niepelnej auto-memory, nie pomiar (CRITIC werdykt R5, Gap 3). Realna czestotliwosc uzycia jest NIEZNANA - nikt nie przeszukal surowych transkryptow .jsonl (CRITIC Gap 3). Uzywac jako slaby sygnal kierunku, nie jako dowod.

**NIE.5 Nie priorytetyzowac luk mobile/DevOps w agentach.**
R2 slusznie zauwaza te luki wzgledem best-practices (R2 luki 1-2), ale wzgledem realnego uzycia Maciej sa marginalne - zero projektow mobile/DevOps na dysku (R1, R7). Niski priorytet dla v33.

**NIE.6 Nie wdrazac `interview_coach` w v33.**
n=1 (Kariera-A). Ryzyko nadinterpretacji pojedynczego researchera (R7) wysokie (CRITIC ocena). Do backlogu, nie do wdrozenia.

**NIE.7 Nie zmieniac niczego wizualnego w HTML w ramach tej kampanii.**
Zakres tej kampanii to warstwa skills/commands/routing. Zmiany w encyklopedii HTML (np. synchronizacja "35" vs 37) to osobna, swiadoma decyzja (CRITIC Konflikt 1) wymagajaca uwzglednienia parytetu bilingual PL/EN i pipeline generate_skills.js (CRITIC Gap 4).

---

## 8. Appendix: zrodla i otwarte pytania (HITL)

### Mapa zrodel

| Zrodlo | Zakres | Werdykt Krytyka | Kluczowy wklad do syntezy |
|---|---|---|---|
| R1 | Inwentaryzacja 18 folderow lokalnych | PASS | Profil uzytkownika: >80% non-software research (sekcja 2) |
| R2 | Inwentaryzacja 37 skilli | PASS (najwyzsza rzetelnosc) | Prawdziwa liczba 37, klastry, duplikaty, luki (sekcja 3) |
| R3 | Inwentaryzacja presetow | PASS z zastrzezeniem | 10 par nakladajacych sie, defekt `/five-minds` (sekcja 4) |
| R4 | Routing i katalog | PASS | Mechanika promptowego routingu, luki keywordowe (sekcja 5) |
| R5 | Faktyczne uzycie | REVISE | Podaz vs popyt, `deep-research-v2` flagowy (sekcja 5) |
| R6 | Synteza istniejacego researchu | PASS | Korpus NIE rekomenduje redukcji, zerowy koszt lazy-load (sekcja 7) |
| R7 | Cross-reference niezalezny | PASS z zastrzezeniem | Potwierdzenie R1, kandydaci nowych presetow (sekcje 2, 6) |
| CRITIC | Walidacja + rozstrzygniecia | (nadrzedny) | Wszystkie liczby, 7 konfliktow, 6 gapow, ocena rekomendacji |

Uwaga o istniejacym researchu (R6): dwie wczesniejsze kampanie sa bezposrednio o architekturze Maciejowego systemu - **skills-architecture** i **subagents-task-tool** (R6 pkt 7-8, podsumowanie krzyzowe). Obie potwierdzaja poprawnosc architektury (rzadki, unikatowy w ekosystemie wzorzec "orchestrator-architecture" z bilingual parity - R6 pkt 7) i zawieraja niewdrozone rekomendacje ROZSZERZEN infrastruktury, nie zmiany skladu.

Pelna lista niewdrozonych rekomendacji z korpusu (R6 sekcja "Niewdrozone rekomendacje", pkt 1-13) - zadna nie dotyczy redukcji liczby agentow/presetow, wszystkie to infrastruktura lub higiena procesu:
- Hooks enforcement dla regul projektowych (wersjonowanie, brak em-dash) - ~70% compliance CLAUDE.md vs ~100% hooki (pkt 1).
- `.claude/rules/` z glob-scoped regulami (pkt 2), `isolation: worktree` per agent w ciezkich presetach (pkt 3).
- MCP integracja (Notion/GitHub) dla agent data sync - obecnie 0 serwerow MCP (pkt 4).
- Explicit `~/.claude/agents/` (native subagenty) dla top-used roli zamiast skill-jako-prompt (pkt 6).
- Audit 35 opisow skilli pod katem zwiezlosci + trigger richness 200-500 znakow z keywords (pkt 7) - bezposrednio wspiera P2.1/P2.2 tej syntezy.
- Przeniesienie czesci z 37 skilli z user scope do project/plugin scope, by zmniejszyc ambient context (przy >30 skillach to zalecany prog uwagi) (pkt 9).
- Observability dla subagent token usage / cost attribution - brak dashboardu (pkt 10).
- Systematyczny audit model-routingu na wszystkich 42 presetach wg 4-wymiarowego frameworku - potwierdzony tylko dla deep-research-v2 (pkt 11).
- PROGRESS.md + HANDOVER.md + PreCompact hook dla dlugich sesji multi-agent (pkt 12-13).

To osobny watek od tej kampanii (fit-to-usage), ale wart uwagi przy planowaniu v33+ jako rownolegly backlog infrastrukturalny. Kluczowe: jesli Q1 (nizej) wskaze kierunek dev-centryczny, te rekomendacje sa prawdopodobnie wyzszej wartosci niz dodawanie nowych agentow.

### Gaps kampanii (CRITIC sekcja "Gaps")

1. Brak analizy ROI/kosztu proponowanych zmian - rekomendacje sa czysto jakosciowe (Gap 1).
2. Brak walidacji, czy nowe agenty bylyby uzyte >1 raz (prog n=? nie ustalony) (Gap 2).
3. Nikt nie przeszukal surowych transkryptow .jsonl - liczby uzycia to proxy (Gap 3).
4. Brak analizy wykonalnosci w zrodle v32.16 (parytet bilingual + generate_skills.js) (Gap 4).
5. Brak pelnego auditu dryfu katalog-vs-pliki - moga byc kolejne rozbieznosci (Gap 5).
6. Brak sygnalu o intencji uzytkownika co do kierunku domenowego (Gap 6).

### Otwarte pytania do uzytkownika (HITL)

Te pytania NIE moga byc rozstrzygniete z samych raportow - wymagaja decyzji Maciej przed zatwierdzeniem zakresu v33:

**Q1 (najwazniejsze - kierunek domenowy).** Czy chcesz rozwijac projekt dalej **dev-centrycznie** (utrzymac obecny rdzen software engineering, tylko naprawic routing), czy dodac **osobna, lekka sciezke "personal/consumer research"** (nowa domena rownolegla)? Kontekst zawodowy (POC dla Michala, AI engineering) sugeruje, ze trajektoria moze wrocic do software - co oslabialoby przeorientowanie na personal (CRITIC Gap 6, R7 uwaga koncowa). To decyzja o celu narzedzia.

**Q2 (liczba encyklopedyczna).** Czy synchronizowac encyklopedie HTML (obecnie "35 agentow") z warstwa skills (37 plikow / ~36 rol), czy swiadomie utrzymac rozdzielenie "35 encyklopedyczne / 37 operacyjne"? Synchronizacja dotyka parytetu bilingual PL/EN i pipeline generate_skills.js (CRITIC Konflikt 1, Gap 4).

**Q3 (nazwa 37. agenta / nowych bytow).** Jesli zdecydujesz o nowej domenie (Q1), jak nazwac potencjalne nowe agenty? Kandydaci z R7: `interview_coach` (backlog, n=1), `content_social` (odrzucony, n=0), "3D/spatial" (mikro-edycja frontend.md). Ktore z nich w ogole rozwazac?

**Q4 (prog dla nowych bytow).** Ile roznych projektow musi wykazac wzorzec, by uzasadnic staly preset/agent zamiast jednorazowego repurposingu? Prywatny-H/Prywatny-C/Prywatny-D (n=3) vs interview/LinkedIn (n=1/n=0) - gdzie stawiasz prog? (CRITIC Gap 2).

**Q5 (zakres P0).** Czy zlecasz od razu pelny audit dryfu 44 komend vs 42 wpisow + 37 skilli vs referencje w komendach (CRITIC Gap 5), czy tylko punktowa naprawe 3 znanych rozbieznosci (P0.1)?

### Rekomendowana kolejnosc dzialan po zatwierdzeniu

1. Odpowiedz na Q1-Q5 (HITL).
2. Wykonac P0.1 (naprawa dryfu) - niezaleznie od odpowiedzi na Q1, bo to czysta higiena.
3. Jesli Q1 = dev-centryczny: P1.2 (demote enterprise), P1.3 (`/five-minds`), P2.x (higiena keywordow).
4. Jesli Q1 = dodac personal: dodatkowo P1.1 (flaga `--no-tech`) jako pierwszy krok walidacji, dopiero potem ewentualny nowy preset.
5. Backlog (interview_coach, nowa domena) tylko przy jawnej zgodzie i progu z Q4.
