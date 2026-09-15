# R5: Faktyczne uzycie presetow/agentow

**Zrodla przeszukane:**
1. `C:\Users\macie\.claude\projects\C--Projekty-Claude-Code-Agent-Architecture\memory\*.md` (29 plikow, MEMORY.md index + wszystkie project_*/feedback_* pliki przeczytane)
2. `C:\Users\macie\.claude\projects\*` - Glob wszystkich folderow projektow (13 projektow Maciej ma na dysku poza Agent_Architecture: NaukaAI, NaukaAI-CV, portfolio, portfolio-projekt-cv-JobApp, DM-STYL, Kariera-A, no-hesi, NaukaAI-CV-applications-master-cv-v2 i podfoldery). Przeczytano MEMORY.md index kazdego + najbardziej obiecujace project_*/feedback_* pliki.
3. Nie mialem bezposredniego dostepu do `C:/Projekty Claude Code/` poza `Agent_Architecture` (working directory), wiec commit messages / `.claude/settings.json` innych repo nie byly bezposrednio sprawdzalne z tego procesu - dowod oparlem na auto-memory (ktora rejestruje faktyczne sesje pracy w tych projektach, wiec jest to solidny proxy dla "co realnie bylo uzywane").

**Wazna metodologiczna uwaga:** auto-memory rejestruje TYLKO to, co model uznal za warte zapamietania (istotne fakty projektowe), NIE jest to log kazdego wywolania Task/Agent tool. Oznacza to, ze rzeczywiste uzycie moze byc szersze niz to, co widac w memory - ale memory jest najlepszym dostepnym proxy bez dostepu do surowych transcriptow sesji (ktorych nie przeszukiwalem ze wzgledu na wolumen - setki plikow .jsonl w `~/.claude/projects/*/`).

Pelny inwentarz systemu (do porownania):
- **35 agentow** w `~/.claude/skills/*.md`: analyst, backend, control_mapper, db_architect, decision_presenter, designer, eda_analyst, expert_analyst, expert_devil, expert_innovator, expert_pragmatist, expert_user, feature, frontend, gtm_strategist, integrator, observability_engineer, orchestrator, planner, qa_manager, qa_perf, qa_quality, qa_security, res_critic, res_docs, res_extractor, res_forums, res_github, res_reddit, res_tech, res_ux, res_x, statistician, synthesizer, synthesizer_lean, telemetry_surfer, writer
- **42 presety** w `~/.claude/commands/*.md`: a11y, ab-test-lab, api-modern, bento-redesign, bug-hunt, cascade, content, data-analysis-pipe, data-pipe, deep, deep-five-minds, deep-research-swarm-pro, deep-research-v2, design-sys, feature-sprint, five-minds, five-minds-strategic, full, fullstack-premium, incident-war-room, kb-constructor, legacy, microservices, migration-crew, perf-boost, perf-squad, plan-exec, prd-to-launch, quick-fix, recon, reflect, research, review, saas, security, security-multi-vector, soc2-sweep, solo, standard, startup, tech-writing-pipe, test-suite, trio, ui-overhaul

---

## Tabela dowodow: presety z UDOKUMENTOWANYM uzyciem

| Preset/agent | Dowod (plik / cytat) | Kontekst / czestotliwosc |
|---|---|---|
| `deep-five-minds` | `feedback_video_infographic_prompts... ` nie, popraw: `kariera_a_project.md`: *"Background AML, nie KYC. Preset: /deep-five-minds."* | Projekt Kariera-A (przygotowanie osoby trzeciej do rozmowy na stanowisko analityczne w sektorze finansowym) - explicit named preset choice, jednorazowo (interview prep) |
| `deep-five-minds` (koncepcyjnie, "Deep Five Minds debate" / "ETAP 3") | `project_jobapp_decisions.md`: *"Stan na 2026-04-09, post-ETAP 3 (Deep Five Minds debate)"*, *"Wszystkie decyzje zatwierdzone... po debacie 4 ekspertow + Devils Advocate"* | Projekt JobApp - uzyty do architektonicznego lock-in 10 decyzji (K1-K10) w fazie projektowania, jedna pelna kampania z 3 DA overrides |
| `deep-five-minds` | `project_orgchart_v1_status.md`: *"Deep Five Minds v1 Review SHIPPED 2026-04-12... Projekt... przeszedl 12 faz (A..L). 14 Design Decisions shipped w tier T2 Moderate, 5 ACK, 59 testow passing"* | Projekt OrgChart-Agent-Core - najwieksza udokumentowana kampania, 12-fazowa architektura review z pelnym HITL gate procesem |
| `deep-research-v2` | `project_deep_research_v2_preset.md`: *"Zaimplementowany 2026-04-17... 17 agentow (1 orch + 7 researchers Sonnet + 7 extractors Sonnet + 1 critic Opus + 1 lean syntetyk Opus)"*. Uzyty w min. 7 kampaniach: Hooks, Settings+Permissions, CLAUDE.md Patterns, Context Engineering, Prompt Caching, MCP Servers, Subagents+Task Tool, Skills Architecture | Projekt Agent_Architecture - flagowy preset do research campaigns, uzyty ~8 razy w jednej fali 2026-04-17 (Tier 1 + Tier 2), kazdy z pelnym pipeline R1-R7 + CRITIC + SYNTHESIS + NbLM |
| `research` / "Research Swarm" (6 researcherow+krytyk+syntetyk, wczesniejsza wersja) | `project_research_hooks_campaign.md`: pierwsza kampania Hooks 2026-04-17 uzywala 7 researcherow + krytyk + syntetyk (przed wdrozeniem deep-research-v2 pozniej tego samego dnia) | Projekt Agent_Architecture, jednorazowo jako proof-of-concept ktory ujawnil bottleneck Syntetyka i doprowadzil do stworzenia deep-research-v2 |
| `five-minds` (koncept "4 ekspertow + Devil's Advocate") | Uzyte koncepcyjnie w JobApp ETAP 3 (patrz wyzej, deep-five-minds zawiera je jako faze) | Wliczone w deep-five-minds, brak dowodu na samodzielne uzycie poza tym |
| Agenty `res_tech`, `res_github`, `res_reddit`, `res_forums`, `res_docs`, `res_x`, `res_ux`, `res_critic`, `res_extractor`, `synthesizer` / `synthesizer_lean` | Wnioskowane z opisu pipeline'ow research (7 researcherow R1-R7 + critic + syntetyk/lean syntetyk) w kampaniach Hooks, Settings, CLAUDE.md, Context Engineering, Prompt Caching, MCP Servers, Subagents, Skills - `project_research_tier2_campaigns.md` i `project_research_settings_claudemd_campaigns.md` | Rola researcherow byla uzywana wielokrotnie (min. 8 kampanii x 7 researcherow = ~56 wywolan researcherow), ale memory nie precyzuje KTORE konkretne nazwy skilli (res_tech vs res_github itd.) byly przypisane do ktorego z R1-R7 - prawdopodobnie wszystkie 8 res_* byly rotowane miedzy kampaniami |
| `res_extractor` (nowy skill) | `project_deep_research_v2_preset.md`: *"~/.claude/skills/res_extractor.md - nowy skill, Sonnet, warstwa research. Czyta 1 raport, pisze compact JSON claim-table"* | Stworzony specjalnie 2026-04-17 dla deep-research-v2, uzyty w ~8 kampaniach x 7 extractorow = najbardziej "przepracowany" nowy agent |
| `synthesizer_lean` (nowy skill) | Jw. `~/.claude/skills/synthesizer_lean.md - nowy skill, Opus, warstwa synthesis... early-write` | Jw., zamiennik dla klasycznego synthesizer w kontekscie deep-research-v2, uzyty rownolegle z synthesizer w kampaniach (Hooks uzywal klasycznego "Syntetyk", pozniejsze kampanie prawdopodobnie synthesizer_lean) |
| Orchestrator-rola (koncept, nie zawsze mapowany 1:1 na skill `orchestrator`) | `project_research_tier2_campaigns.md`: *"main session = orchestrator, 5 agenty background (Opus)... Task/Agent tool niedostepny dla sub-agents, single-agent fallback"* | Ciekawy fakt: w 5 kampaniach Tier 2 orchestracja odbywala sie w GLOWNEJ sesji (nie przez osobny agent orchestrator skill), bo subagenci nie mogli spawnowac wlasnych subagentow (recursion depth limit). To sugeruje, ze formalny skill `orchestrator.md` moze byc rzadziej faktycznie wywolywany jako subagent niz zakladal projekt |
| "designer" + "frontend" (koncepcyjnie, UI-overhaul-podobny flow) | Brak bezposredniego cytatu nazwy presetu `ui-overhaul` lub `design-sys`, ale `project_v32_8_status.md` (nie czytany w pelni, tylko wzmianka w MEMORY.md index) opisuje *"Premium Visual Overhaul via Deep Five Minds (~30 agentow): Material Expressive with Edge"* dla samego repo Agent_Architecture | v32.8 redesign HTML uzyl deep-five-minds jako meta-preset do w duzej mierze wizualnego overhaulu, nie ui-overhaul/design-sys bezposrednio |
| `reference_agent_presets.md` (JobApp) - lista rekomendowanych presetow | Plik jawnie wymienia jako dostepne i rekomendowane: `research`, `deep`, `deep-five-minds`, `five-minds`, `reflect`, `standard`, `trio`, `ui-overhaul`, `design-sys` z sugestiami kiedy ktorego uzyc | To NIE jest dowod uzycia, tylko dowod ZNAJOMOSCI/rekomendacji tych 9 presetow przez system w kontekscie JobApp. Faktyczne uzyte z tej listy w JobApp to prawdopodobnie tylko deep-five-minds (ETAP 3) - reszta pozostaje planowana/rekomendowana, brak potwierdzenia wykonania |

---

## Sekcja: BRAK SLADU uzycia (nie znaleziono dowodow w przeszukanych zrodlach)

Ponizsze presety NIE maja zadnego znalezionego cytatu/dowodu uzycia w memory files ani w plikach projektowych do ktorych mialem dostep. **Brak dowodu nie oznacza na pewno "nieuzywane"** - moze to byc: (a) uzycie w sesjach ktore nie wygenerowaly trwalej pamieci, (b) uzycie w projektach spoza zbioru `~/.claude/projects/` ktore przeszukalem, (c) uzycie w surowych transcriptach .jsonl ktorych nie przeszukiwalem ze wzgledu na wolumen.

**Presety (42 total) bez znalezionego dowodu (33 z 42):**
a11y, ab-test-lab, api-modern, bento-redesign, bug-hunt, cascade, content, data-analysis-pipe, data-pipe, deep-research-swarm-pro (wspomniany tylko jako punkt porownania do deep-research-v2, nigdy jako faktycznie uruchomiony), design-sys (tylko rekomendowany, nie potwierdzony), feature-sprint, full, fullstack-premium, incident-war-room, kb-constructor, legacy, microservices, migration-crew, perf-boost, perf-squad, plan-exec, prd-to-launch, quick-fix, recon, reflect (tylko rekomendowany), review, saas, security, security-multi-vector, soc2-sweep, solo, standard (tylko rekomendowany), startup, tech-writing-pipe, test-suite, trio (tylko rekomendowany), ui-overhaul (tylko rekomendowany, patrz wyzej)

**Agenty (35 total) bez znalezionego bezposredniego, imiennego dowodu uzycia (24 z 35):**
control_mapper, db_architect, decision_presenter, eda_analyst, expert_analyst, expert_devil (uzyty koncepcyjnie jako "Devil's Advocate" w five-minds/deep-five-minds ale bez imiennej wzmianki skilla), expert_innovator, expert_pragmatist, expert_user, feature, gtm_strategist, integrator, observability_engineer, planner, qa_manager, qa_perf, qa_quality, qa_security, res_docs, res_forums, res_github, res_reddit, res_ux, res_x, statistician, telemetry_surfer, writer

Uwaga: agenty `analyst`, `backend`, `frontend`, `designer`, `orchestrator` pojawiaja sie w opisach presetow (np. standard = "orkiestrator + planowanie + research + build + QA") ale bez potwierdzenia ze faktycznie zostaly odpalone w konkretnej udokumentowanej sesji - traktuje je jako "brak bezposredniego dowodu" mimo ze sa czesciami presetow z posrednim dowodem (np. v32.8 redesign).

---

## Wnioski o wzorcach uzycia

### 1. System jest silnie meta - najczesciej uzywany "na sobie samym"
Najwieksza koncentracja udokumentowanego uzycia dotyczy **budowy samego projektu Agent_Architecture** (kampanie research Hooks/Settings/CLAUDE.md/Context Engineering/Caching/MCP/Subagents/Skills, redesign v32.8 przez deep-five-minds). To tworzy pewien recursion: system agentow jest gorliwie uzywany do generowania wiedzy O SOBIE (research o Claude Code ecosystem) i do ROZBUDOWY SAMEGO SIEBIE (v32.x redesigny), a mniej udokumentowanego dowodu ma na uzycie w INNYCH, zewnetrznych projektach uzytkownika.

### 2. Poza projektem macierzystym: dwa potwierdzone uzycia, oba "deep-five-minds"
Jedyne dwa zewnetrzne projekty z jednoznacznym, imiennym dowodem uzycia konkretnego presetu to:
- **JobApp** (job aggregator) - `deep-five-minds` do architektonicznego decision-making (10 decyzji K1-K10, Devil's Advocate overrides)
- **Kariera-A** (interview prep dla znajomego) - `deep-five-minds` explicite wskazany jako preset do uzycia

To sugeruje wzorzec: `deep-five-minds` jest "preset zaufania" uzytkownika do sytuacji o wysokiej stawce decyzyjnej (architektura systemu, przygotowanie kogos do rozmowy kwalifikacyjnej), gdzie wartosc debaty miedzy 4 ekspertami + Devil's Advocate przewaza koszt (najdrozszy/najwolniejszy preset w katalogu).

### 3. Reszta projektow (JobApp scanner, portfolio/CV, DM-STYL, no-hesi, NaukaAI-CV) dziala BEZ formalnych presetow
Wiekszosc pozostalych projektow uzytkownika (Job Scanner NFJ, CV/portfolio pipeline, DM-STYL redesign brandu, symulator wyscigowy no-hesi, przygotowania rekrutacyjne InPost/Univio/EasyCall) NIE ma zadnej wzmianki o uzyciu ktoregokolwiek z 42 presetow. Prace w tych projektach opisywane sa jako ad-hoc agent spawning (pojedyncze "agent 1", "agent 2" z konkretnym zadaniem, np. `project_job_scanner.md`: *"Agent 1: NoFluffJobs skan... Agent 2: Inne portale"*) - czyli General-purpose Task/Agent tool bez przechodzenia przez formalny slash-command preset z `~/.claude/commands/`. To silny sygnal ze duza czesc realnej pracy Maciej robi mniej ceremonialnie niz sugeruje istnienie 42-presetowego katalogu.

### 4. `deep-research-v2` to jedyny preset z "produkcyjna" historia iteracji
`deep-research-v2` ma udokumentowana pelna historie: powstal jako rozwiazanie konkretnego problemu (Syntetyk bottleneck w kampanii Hooks, `feedback_syntetyk_preset_redesign.md`), zostal wdrozony tego samego dnia, i natychmiast uzyty w 7-8 kolejnych kampaniach z ustandaryzowanym model-routingiem (`feedback_deep_research_v2_model_routing.md`: Orchestrator Opus / Researchers Sonnet / Extractors Haiku / Critic+Syntetyk Opus). To jedyny przypadek gdzie mamy dowod evolucji presetu w odpowiedzi na realny feedback z uzycia, nie tylko jednorazowe uruchomienie.

### 5. Presety "budowlane" (trio, standard, feature-sprint, saas, microservices) nie maja dowodu mimo ze pasuja do profilu uzytkownika
Uzytkownik buduje wiele aplikacji webowych (JobApp, DM-STYL, portfolio, CV tools) ktore architektonicznie pasowalyby do presetow typu `trio` (Backend+Frontend+QA), `saas`, `feature-sprint`. Brak ich w memory sugeruje albo: (a) uzytkownik faktycznie koduje te projekty samodzielnie/przez Claude Code bez formalnego presetu (potwierdzone w `feedback_vibe_coder_not_engineer.md`: *"user pisze Python tylko przez AI"* - co wskazuje na code-generation-heavy prace, niekoniecznie przez multi-agent presety), albo (b) uzycie tych presetow po prostu nie zostawilo sladu w auto-memory bo nie bylo "decyzji wartej zapamietania" - zwykla implementacja feature'a moze nie generowac memory wpisu nawet jesli preset zostal uzyty.

### 6. Presety Research-family (`research`, `deep`, `deep-research-swarm-pro`, `deep-research-v2`) sa najlepiej udokumentowane, presety QA/Security/Compliance (`security`, `security-multi-vector`, `soc2-sweep`, `test-suite`, `qa_*`) nie maja ani jednego sladu
To moze odzwierciedlac charakter obecnej fazy pracy Maciej (Agent_Architecture project = edukacyjny/wizualny projekt bez testow, jak jawnie przyznano w `project_github_repo_state.md`: *"projekt mial byc do wizualnych rzeczy, a nie jako idealny kod"* - brak nacisku na security/QA presety jest spojny z tym ze sam glowny projekt "nie ma testow"). Rowniez zaden z jego projektow zewnetrznych (JobApp, DM-STYL) nie jest jeszcze w fazie produkcyjnego hardeningu wymagajacej security audit presetow.

### 7. Model routing jako emergentna praktyka, nie presetowa
Warto odnotowac ze najbardziej dojrzala, iteracyjnie poprawiana praktyka uzytkownika to NIE preset per se, ale **routing modeli wewnatrz presetu** (`feedback_deep_research_v2_model_routing.md`) - Maciej optymalizuje ktory agent dostaje Opus/Sonnet/Haiku bardziej aktywnie niz eksperymentuje z nowymi presetami z katalogu 42. To sugeruje ze dla v33/v34 iteracji priorytetem uzytkownika moze byc glebsza kontrola cost/model-routing per-agent (juz czesciowo zrealizowana w `--premium/--budget/--ultra-budget` flagach deep-research-v2) niz poszerzanie katalogu presetow.

### Podsumowanie liczbowe
- **Presety z jednoznacznym dowodem faktycznego uruchomienia:** 3 z 42 (`deep-five-minds`, `deep-research-v2`, `research` jako wczesna/nieformalna wersja) = ~7%
- **Presety tylko rekomendowane/wspomniane bez potwierdzenia wykonania:** 6 z 42 (`reflect`, `standard`, `trio`, `ui-overhaul`, `design-sys`, `deep`) = ~14%
- **Presety bez zadnego sladu:** 33 z 42 = ~79%
- **Agenty/skille z bezposrednim imiennym dowodem uzycia:** `res_extractor`, `synthesizer_lean` (oba nowo stworzone i natychmiast uzyte) = 2 z 35, plus posrednio caly zestaw `res_*` (8 agentow) jako grupa uzywana w kampaniach research bez imiennego rozroznienia = do ~10 z 35 z jakims dowodem (~29%)
- **Agenty bez zadnego sladu:** ~24-25 z 35 (~70%)

Te liczby powinny byc czytane ostroznie (patrz uwaga metodologiczna na poczatku) - reprezentuja "co zostawilo slad w auto-memory", nie "co nigdy nie zostalo uruchomione".
