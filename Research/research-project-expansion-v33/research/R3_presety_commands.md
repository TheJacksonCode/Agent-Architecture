# R3: Inwentaryzacja 42 presetow (Claude Code commands)

Zrodlo: `C:\Users\macie\.claude\commands\*.md` (42 pliki, wersja katalogu wg v32.16 skills/commands generator). Kazdy plik to definicja jednego presetu-komendy `/nazwa`, uzywanego do orkiestracji zespolu subagentow.

Metodologia: przeczytano wszystkie 42 pliki .md w calosci (front-matter description + sekcje OPIS PRESETU, fazy, tabela agent/model/skill). Liczba agentow liczona jako liczba unikalnych wierszy w tabeli "REFERENCJE DO SKILLS" (nie liczba wywolan runtime - niektore presety uruchamiaja tego samego agenta wielokrotnie z rozna rola, np. bento-redesign 2x Analityk).

## Legenda wzorcow organizacji

- **Fan-out rownolegly** - wiele agentow tej samej "warstwy" uruchamianych jednoczesnie (najczesciej Research)
- **Hierarchia sekwencyjna** - fazy nastepuja po sobie z bramami (STRATEGIA -> RESEARCH -> BUILD -> QA)
- **Petla iteracyjna** - fix-test-fix, cascade, powtarzanie fazy do spelnienia warunku
- **Debata/critique** - Five Minds (5 ekspertow + Cien/Devil's Advocate), lub pojedynczy Critic recenzujacy
- **HITL gate** - explicit czekanie na decyzje uzytkownika miedzy fazami
- **Mieszany** - kombinacja powyzszych (najczesciej: fan-out + hierarchia + czasem HITL/debata)

Koszt/ciezar szacowany po liczbie agentow: **Lekki** (2-5), **Sredni** (6-9), **Ciezki** (10-14), **Bardzo ciezki** (15-25).

## Tabela pelna (42 wiersze)

| # | Nazwa (/preset) | Agentow | Wzorzec organizacji | Zastosowanie (1 zdanie) | Koszt |
|---|---|---|---|---|---|
| 1 | `/a11y` | 5 | Hierarchia sekwencyjna (Research -> Build -> QA) | WCAG audit i naprawa dostepnosci UI | Lekki |
| 2 | `/ab-test-lab` | 7 | Mieszany: hierarchia + debata (Cien red-team) + HITL | Projektowanie testow A/B z rygorem statystycznym (H0/H1, power calc) | Sredni |
| 3 | `/api-modern` | 6 | Hierarchia sekwencyjna | Modernizacja API (REST->GraphQL), refaktor warstwy serwerowej | Sredni |
| 4 | `/bento-redesign` | 8 (7 unikalnych rol, Analityk uzyty 2x) | Mieszany: fan-out research + sekwencyjna architektura + fan-out build + QA | Redesign dashboardu w ukladzie bento z audytem danych i fill-ratio | Sredni |
| 5 | `/bug-hunt` | 4 | Hierarchia + fan-out QA (2 QA rownolegle) | Debugowanie i triage bugow | Lekki |
| 6 | `/cascade` | 5 | Petla eskalacji kosztowej (Haiku->Sonnet->Opus) | Batch/wolumenowe zadania przy minimalizacji kosztu (70-80% taniej) | Lekki |
| 7 | `/content` | 4 | Fan-out research (2) -> sekwencja | Tworzenie dokumentacji, README, raportow | Lekki |
| 8 | `/data-analysis-pipe` | 9 | Hierarchia sekwencyjna z fan-out w kazdej fazie | Data science pipeline: collect->clean->EDA->model->report | Sredni |
| 9 | `/data-pipe` | 8 | Hierarchia sekwencyjna, fan-out research i build | ETL / data warehouse engineering | Sredni |
| 10 | `/deep` (Deep Research+Build) | 18 | Bardzo mieszany: hierarchia + duzy fan-out research (6) + critique + fan-out build + fan-out QA | Enterprise projekt z gleboka analiza przed budowa | Bardzo ciezki |
| 11 | `/deep-five-minds` | 25 | Maksymalny mieszany: fan-out research(6)+HITL+Five Minds debata(6)+HITL+fan-out build(5)+fan-out QA(3)+HITL | Decyzje enterprise krytyczne/nieodwracalne, maksymalny preset systemu | Bardzo ciezki |
| 12 | `/deep-research-swarm-pro` | 10 | Fan-out research (7, wszyscy Sonnet) -> Critique -> Synthesis | Due diligence / deep research wysokiej jakosci (Anthropic-style swarm) | Ciezki |
| 13 | `/deep-research-v2` | 17 | Fan-out research(7) -> fan-out extract(7, Haiku) -> Critique -> lean Synthesis | Kampanie badawcze z duzym korpusem (30k+ slow), map-reduce dla oszczednosci | Bardzo ciezki |
| 14 | `/design-sys` | 6 | Hierarchia sekwencyjna, fan-out research(2) i build(3) | Budowa design systemu / style guide | Sredni |
| 15 | `/feature-sprint` | 7 | Hierarchia sekwencyjna, fan-out research(2) i build(2) | Nowa funkcja / feature flag | Sredni |
| 16 | `/five-minds` | 14 | Mieszany: hierarchia + fan-out research(4) + fan-out build(4) + fan-out QA(3) | Decyzje architektoniczne (bez pelnej debaty Five Minds mimo nazwy - w praktyce standard pipeline) | Ciezki |
| 17 | `/five-minds-strategic` | 13 | Mieszany: fan-out research(4) -> Analiza -> pelna debata Five Minds(5, wszyscy Opus) -> Synteza -> HITL | Strategiczne decyzje nieodwracalne (architektura, platforma, duze inwestycje) | Ciezki |
| 18 | `/full` (Full Hierarchy) | 13 | Hierarchia 5-warstwowa, fan-out w kazdej warstwie | Enterprise, mission-critical, "Gold Standard" pelny pipeline | Ciezki |
| 19 | `/fullstack-premium` | 12 | Hierarchia sekwencyjna z rownoleglymi parami (DB+Design, BE+FE) | Premium full-stack z obserwowalnoscia i architektura DB | Ciezki |
| 20 | `/incident-war-room` | 10 | Mieszany: triage -> fan-out investigation(3) -> diagnostics(2) -> Devil -> HITL rollback gate -> build+postmortem | Incident response, postmortem, debugging produkcyjny | Ciezki |
| 21 | `/kb-constructor` | 10 | Fan-out ingest(4) -> dedup/synteza -> fan-out write -> critique+integrate | Budowa bazy wiedzy / dokumentacji wewnetrznej z 4 zrodel | Ciezki |
| 22 | `/legacy` (Legacy Refactor) | 9 | Hierarchia sekwencyjna, fan-out research(2), build(3), QA(2) | Refaktor / migracja frameworka legacy | Sredni |
| 23 | `/microservices` | 11 | Hierarchia sekwencyjna, fan-out build(4) i QA(3) | Dekompozycja monolitu, service mesh, konteneryzacja | Ciezki |
| 24 | `/migration-crew` | 10 | Mieszany: fan-out explore(3) -> HITL gate -> build -> QA | Migracja systemow legacy / zmiana stacku z bramą decyzyjną | Ciezki |
| 25 | `/perf-boost` | 4 | Petla measure-fix, minimalna hierarchia | Optymalizacja API, Core Web Vitals - szybki audyt wydajnosci | Lekki |
| 26 | `/perf-squad` | 8 | Mieszany: fan-out diagnostyka(3) -> Devil (adversarial) -> QA verify -> Synteza | Audyt wydajnosci z adversarialna weryfikacja optymalizacji | Sredni |
| 27 | `/plan-exec` | 4 | Hierarchia sekwencyjna prosta | Migracje/refactoring z planem i harmonogramem | Lekki |
| 28 | `/prd-to-launch` | 11 | Mieszany: research(2) -> PRD -> fan-out parallel tracks(4: tickets/design/proto/GTM) -> critique -> HITL launch gate | Od pomyslu do launchu: JTBD, PRD, GTM plan | Ciezki |
| 29 | `/quick-fix` (Szybka Naprawa) | 3 | Petla fix-test-fix | Bugfixy, hotfixy, patche | Lekki |
| 30 | `/recon` (Recon Squad) | 3 | Hub-and-spoke, minimalna hierarchia | POC, spike, badanie wykonalnosci | Lekki |
| 31 | `/reflect` (Reflective Loop) | 3 | Sekwencja research->krytyka | Gleboki research / due diligence na mala skale | Lekki |
| 32 | `/research` (Research Swarm) | 9 | Fan-out research(6) -> Critique | Due diligence, wybor stacku technologicznego (wersja Haiku-first, tansza od swarm-pro) | Sredni |
| 33 | `/review` (Code Review) | 6 | Hierarchia + fan-out QA(2) | Feature z code review, krytyczne PR | Sredni |
| 34 | `/saas` (Full-Stack SaaS) | 10 | Hierarchia sekwencyjna, fan-out build(4) i QA(2) | SaaS od zera / dashboard, squady hierarchiczne | Ciezki |
| 35 | `/security` (Security Hardening) | 6 | Fan-out QA (4, aggregate) po build | Audyt bezpieczenstwa z decyzja GO/NO-GO | Sredni |
| 36 | `/security-multi-vector` | 9 | Mieszany: fan-out scan(4) -> Devil (STRIDE) -> Synteza -> HITL gate | Kompleksowy audyt bezpieczenstwa / pen testing z adversarial layer | Sredni |
| 37 | `/soc2-sweep` | 9 | Mieszany: fan-out research/mapping(3) -> gap analysis+docs -> fan-out QA(2) -> HITL sign-off | Przygotowanie do audytu SOC2/ISO27001/GDPR | Sredni |
| 38 | `/solo` (Solo + Walidator) | 2 | Direct delegation (orkiestrator->1 worker) | Male bugi, refactoring, skrypty - najmniejszy preset | Lekki |
| 39 | `/standard` (Standard Dev) | 8 | Hierarchia sekwencyjna klasyczna | Typowe projekty web/SaaS - preset domyslny/generalist | Sredni |
| 40 | `/startup` (Startup MVP) | 5 | Hub-and-spoke | MVP, maly SaaS, prototyp | Lekki |
| 41 | `/tech-writing-pipe` | 8 | Mieszany: research(2) -> fan-out build(4) -> critique | Dokumentacja techniczna, tutoriale, API docs z diagramami i SEO | Sredni |
| 42 | `/test-suite` (Testing Suite) | 5 | Fan-out QA(4), brak fazy build | Pre-release / CI-CD gate - czysty QA bez implementacji | Lekki |
| - | `/trio` (Classic Trio) | 3 | Prosta hierarchia (Build->QA) | Full-stack CRUD, REST API + UI, najprostszy build-preset | Lekki |
| - | `/ui-overhaul` (UI/UX Overhaul) | 7 | Hierarchia sekwencyjna, fan-out research(2) | Redesign UI, modernizacja frontendu | Sredni |

(Tabela zawiera wszystkie 42 pliki znalezione w katalogu commands: a11y, ab-test-lab, api-modern, bento-redesign, bug-hunt, cascade, content, data-analysis-pipe, data-pipe, deep, deep-five-minds, deep-research-swarm-pro, deep-research-v2, design-sys, feature-sprint, five-minds, five-minds-strategic, full, fullstack-premium, incident-war-room, kb-constructor, legacy, microservices, migration-crew, perf-boost, perf-squad, plan-exec, prd-to-launch, quick-fix, recon, reflect, research, review, saas, security, security-multi-vector, soc2-sweep, solo, standard, startup, tech-writing-pipe, test-suite, trio, ui-overhaul - to 43 pozycje bo lista plikow z `ls` pokazala 43 nazwy [42 wg description w plikach + trio doliczony na koncu tabeli]; liczba plikow fizycznych = 43, ale skills-katalog i CLAUDE.md deklaruja "42 presety" - prawdopodobnie jeden z wpisow to duplikat funkcjonalny lub `trio`/`recon` nie jest liczony w oficjalnym katalogu 42. Nalezy zweryfikowac z PRESET_CATALOG.md przy nastepnej regeneracji.)

## Grupy tematyczne

### Research-heavy (badanie/synteza wiedzy, brak lub minimalny build)
- `/research` (Research Swarm, 9) - fan-out 6 researcherow Haiku + Critic
- `/deep-research-swarm-pro` (10) - jak wyzej ale wszyscy Sonnet + Opus Critic/Synth, wyzsza jakosc
- `/deep-research-v2` (17) - map-reduce z faza Extract (Haiku), do dlugich korpusow
- `/reflect` (Reflective Loop, 3) - lekki research + krytyka
- `/recon` (Recon Squad, 3) - szybki spike/POC z 1 researcherem
- `/five-minds-strategic` (13) - research + pelna debata Five Minds do decyzji strategicznych
- `/kb-constructor` (10) - budowa bazy wiedzy z 4 ingesterow
- `/data-analysis-pipe` (9) - analiza danych/data science (mieszane z build)

### Build/Feature (implementacja nowej funkcjonalnosci / produktu)
- `/standard` (Standard Dev, 8) - generalist domyslny
- `/feature-sprint` (7)
- `/startup` (Startup MVP, 5)
- `/saas` (Full-Stack SaaS, 10)
- `/fullstack-premium` (12)
- `/trio` (Classic Trio, 3) - najprostszy build
- `/solo` (Solo + Walidator, 2) - najmniejszy w calym katalogu
- `/prd-to-launch` (11) - od pomyslu produktowego do launchu (JTBD->PRD->GTM)
- `/microservices` (11)
- `/data-pipe` (8) - ETL/data engineering

### Security/Audit
- `/security` (Security Hardening, 6)
- `/security-multi-vector` (9) - najbardziej rozbudowany, STRIDE + release gate
- `/soc2-sweep` (9) - compliance (SOC2/ISO27001/GDPR)

### QA/Testing
- `/test-suite` (Testing Suite, 5) - czysty QA gate bez build
- `/bug-hunt` (4)
- `/review` (Code Review, 6)
- `/quick-fix` (Szybka Naprawa, 3)

### Refactor/Legacy/Migracja
- `/legacy` (Legacy Refactor, 9)
- `/migration-crew` (10) - z HITL gate na strategie migracji
- `/api-modern` (API Modernization, 6)
- `/plan-exec` (Plan & Execute, 4)

### Performance/Reliability
- `/perf-boost` (4) - lekki measure-fix
- `/perf-squad` (8) - adversarial diagnostyka
- `/incident-war-room` (10) - incident response/postmortem

### Content/Docs
- `/content` (Content Pipeline, 4)
- `/tech-writing-pipe` (8) - z diagramami/SEO

### Data
- `/data-pipe` (8)
- `/data-analysis-pipe` (9)
- `/ab-test-lab` (7) - eksperymenty statystyczne

### UI/UX/Design
- `/design-sys` (Design System, 6)
- `/ui-overhaul` (UI/UX Overhaul, 7)
- `/bento-redesign` (8) - specjalizowany layout dashboardow
- `/a11y` (Accessibility Sprint, 5)

### Meta/Planning/Maksymalne orkiestracje
- `/deep` (Deep Research+Build, 18)
- `/deep-five-minds` (25) - maksymalny preset systemu
- `/five-minds` (Five Minds Protocol, 14)
- `/full` (Full Hierarchy, 13) - "Gold Standard"
- `/cascade` (Cascade Cost, 5) - optymalizacja kosztowa przez eskalacje modeli

## Nakladanie sie funkcjonalne (kandydaci do konsolidacji)

1. **`/research` vs `/deep-research-swarm-pro` vs `/deep-research-v2`** - trzy presety do tego samego zadania (deep research/due diligence), rozne tylko modelem researcherow i obecnoscia fazy Extract. `/research` = 9 agentow Haiku-first (tani), `/deep-research-swarm-pro` = 10 agentow Sonnet-first (jakosciowy), `/deep-research-v2` = 17 agentow z map-reduce (do dlugich korpusow). To NAJSILNIEJSZE nakladanie w calym katalogu - trzy warstwy tego samego workflow roznia sie tylko routingiem modeli i obecnoscia Extract fazy. Kandydat do konsolidacji we FLAGI jednego presetu (`--budget`/`--standard`/`--premium`/`--long-corpus`), co juz czesciowo robi `/deep-research-v2` (ma wlasne flagi --premium/--budget/--ultra-budget). Rekomendacja: scalic `/research` i `/deep-research-swarm-pro` w jeden preset z flaga jakosci, zostawic `/deep-research-v2` osobno bo ma realnie inna architekture (Extract phase).

2. **`/five-minds` vs `/five-minds-strategic` vs `/deep-five-minds`** - trzy presety nazwane wokol "Five Minds" ale o roznym zakresie: `/five-minds` (14 agentow) w praktyce NIE zawiera pelnej debaty 5 ekspertow (ma tylko fan-out research+build+QA, brak faktycznej sekcji Five Minds w fazach!) - to mylaca nazwa, bardziej przypomina `/full`. `/five-minds-strategic` (13) ma prawdziwa debate 5 ekspertow (Innowator/Pragmatyk/Analityk Danych/Rzecznik/Cien) na Opus + HITL. `/deep-five-minds` (25) to superset: deep research + 2x Five Minds + build + QA + 3 HITL gates. Rekomendacja: `/five-minds` powinien byc albo przemianowany (bo nie robi tego co nazwa sugeruje) albo scalony z `/full` (oba to 13-14 agentowe hierarchie bez realnej debaty), a `/five-minds-strategic` i `/deep-five-minds` zostawic jako prawdziwa rodzine debaty.

3. **`/full` (Full Hierarchy, 13) vs `/five-minds` (14)** - niemal identyczna struktura faz (STRATEGIA->RESEARCH->BUILD->QA, fan-out research 3-4, fan-out build 4, fan-out QA 3), roznica to +1 Syntetyk w five-minds i troche inny research fan-out (4 vs 3 researcherow). Silne nakladanie, `/five-minds` wyglada jak `/full` + Syntetyk, mimo calkowicie roznych nazw sugerujacych rozny cel.

4. **`/standard` (Standard Dev, 8) vs `/saas` (Full-Stack SaaS, 10) vs `/feature-sprint` (7)** - trzy warianty tego samego "web/SaaS build pipeline" roznia sie glownie liczba agentow w fazie BUILD (Standard: BE+FE; SaaS: BE+FE+Designer+Integrator; Feature Sprint: BE+FE) i obecnoscia QA Security vs QA Quality. Rekomendacja: rozwazyc scalenie w jeden preset ze skalowalnym zakresem (np. `/standard --scope=mvp|saas|feature`).

5. **`/legacy` (Legacy Refactor, 9) vs `/api-modern` (API Modernization, 6) vs `/plan-exec` (Plan & Execute, 4)** - wszystkie trzy adresuja "zmiana istniejacego kodu/architektury" z rosnaca liczba agentow. `/plan-exec` to najprostszy szkielet (Analityk+Planer+Backend+QA), `/api-modern` dodaje Research+Integrator, `/legacy` dodaje jeszcze QA Security i 2 researcherow. To progresja tego samego zadania a nie 3 rozne zadania - kandydat do konsolidacji jako preset ze skalowalnym zakresem albo jasniejszej segmentacji "co odroznia je od `/migration-crew`" (ktory tez robi migracje ale z HITL gate na strategie).

6. **`/perf-boost` (4) vs `/perf-squad` (8)** - oba do optymalizacji wydajnosci, `/perf-boost` to lekki 1-agentowy audyt+fix, `/perf-squad` to pelny adversarial pipeline z Devil's Advocate. Nie jest to duplikacja tak silna jak powyzsze (rozny koszt/glebokosc uzasadnia obie), ale nazwy sa myloco podobne - warto w opisach jasniej rozgraniczyc "quick perf fix" vs "comprehensive perf audit".

7. **`/security` (Security Hardening, 6) vs `/security-multi-vector` (9)** - podobnie jak wyzej: `/security` to szybki audyt fan-out QA, `/security-multi-vector` to pelny STRIDE + adversarial + HITL. Roznica glebokosci uzasadnia obie, ale mogloby to byc jeden preset z flaga `--multi-vector`.

8. **`/quick-fix` (Szybka Naprawa, 3) vs `/solo` (Solo + Walidator, 2) vs `/bug-hunt` (Bug Hunter, 4)** - trzy bardzo male presety do naprawy/bugow. `/solo` to Orkiestrator+1 worker (najmniejszy mozliwy), `/quick-fix` dodaje QA Quality, `/bug-hunt` dodaje jeszcze QA Security. To wyrazna drabinka tego samego zadania (fix bug) z 3 poziomami rygoru - naturalny kandydat do jednego presetu z parametrem `--rigor=minimal|standard|thorough`.

9. **`/recon` (Recon Squad, 3) vs `/reflect` (Reflective Loop, 3) vs `/startup` (Startup MVP, 5)** - wszystkie trzy to lekkie hub-and-spoke presety do szybkiej eksploracji/POC. `/recon` i `/startup` sa niemal identyczne (Orkiestrator+Researcher+Backend, startup dodaje Analityka i QA) - `/startup` wyglada jak `/recon` + 2 agentow. Mniej krytyczne nakladanie niz powyzsze, ale warto rozwazyc.

10. **`/deep` (Deep Research+Build, 18) vs `/full` (Full Hierarchy, 13) vs `/deep-five-minds` (25)** - trzy "duze" presety enterprise roznia sie glownie glebokoscia research fan-out (3 vs 6 researcherow) i obecnoscia Five Minds/HITL. Tworzy sie wyrazna drabinka rozmiaru: `/full` (13) < `/deep` (18) < `/deep-five-minds` (25), co jest sensowna progresja - NIE jest to zbedne nakladanie, raczej dobrze zaprojektowana hierarchia kosztowa, warta zachowania jako "tiers" tego samego zadania klasy enterprise.

## Podsumowanie rekomendacji konsolidacyjnych

Najsilniejsze kandydaci do redukcji liczby presetow (bez utraty funkcjonalnosci, tylko przez sflagowanie):

1. `/research` + `/deep-research-swarm-pro` -> jeden preset z flaga jakosci modeli (analogicznie do `/deep-research-v2 --standard/--premium/--budget`)
2. `/quick-fix` + `/solo` + `/bug-hunt` -> jeden preset z flaga `--rigor`
3. `/legacy` + `/api-modern` + `/plan-exec` -> jeden preset ze skalowalnym scope refactoringu
4. `/five-minds` (mylaca nazwa, brak realnej debaty) -> albo scalic z `/full`, albo naprawic faktyczna zawartosc zeby odpowiadala nazwie
5. `/perf-boost` + `/perf-squad` oraz `/security` + `/security-multi-vector` -> rozwazyc flagi glebokosci zamiast osobnych presetow

Presety BEZ nakladania (unikalne, warte zachowania w obecnej formie): `/deep-research-v2` (jedyny z faza Extract), `/bento-redesign` (jedyny wyspecjalizowany layout), `/incident-war-room` (jedyny incident response), `/kb-constructor` (jedyny KB builder), `/prd-to-launch` (jedyny JTBD->GTM), `/soc2-sweep` (jedyny compliance), `/ab-test-lab` (jedyny statystyczny), `/tech-writing-pipe` (jedyny z diagramami/SEO), `/migration-crew` (jedyny z HITL na strategie migracji), `/cascade` (jedyny czysto kosztowy wzorzec eskalacji), `/deep-five-minds` (jedyny maksymalny 25-agentowy).
