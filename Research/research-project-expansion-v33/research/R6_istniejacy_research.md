# R6: Synteza istniejacego researchu

Cel: streszczenie 8 kampanii researchowych + 2 dokumentow architektury juz wykonanych w repo `Agent_Architecture`, zeby kampania v33 nie powielala pracy. Kazde zrodlo ma streszczenie kluczowych ustalen, ze szczegolnym naciskiem na rekomendacje dot. dodania/usuniecia/konsolidacji agentow lub presetow oraz status wdrozenia.

---

## 1. Research/research-preset-routing/ (SYNTHESIS.md, 2026-04-16, R1-R7 + Critic)

**Zakres:** optymalizacja systemu routingu 42 presetow (CLAUDE.md -> PRESET_CATALOG.md -> commands).

**Kluczowe ustalenia:**
- CLAUDE.md musi byc krotki (<200 linii, <5K tokenow) - potwierdzone w 4+ raportach, cytujac Borisa Cherny'ego (tworca Claude Code, ~100 linii). Projektowy CLAUDE.md byl wtedy ~10K tokenow, 2x za duzo.
- Commands (nie Skills) sa poprawnym mechanizmem dla 42 presetow - lazy-loaded, zero kosztu startowego (0 vs 4200 tok dla 42 skilli).
- Model routing Opus/Sonnet/Haiku per-agent jest zwalidowany wzorcem oficjalnym Anthropic (code-review.md Borisa Cherny'ego).
- Subagent isolation = MAX nie SUM kontekstu - potwierdzone jako architektonicznie poprawne.
- System 42 presetow uznany za **UNIKATOWY w ekosystemie** - najblizszy konkurent (Fabric, ~100 single-agent patterns) nie ma multi-agent team templates z model routing i kosztorysem; wshobson/agents ma tylko 7 preset teams.

**Rekomendacje dot. agentow/presetow:** Brak rekomendacji DODANIA lub USUNIECIA konkretnych agentow/presetow. Cala synteza dotyczy warstwy ROUTINGU (jak dobierac istniejace 42 presety), nie zawartosci samego systemu 35 agentow/42 presetow.

**Priorytetyzowane rekomendacje (TIER 1-3):**
- TIER 1 (zrobic natychmiast): odchudzenie CLAUDE.md do <5K tok, wzbogacenie PRESET_CATALOG.md o przyklady/antyprzyklady, routing w globalnym CLAUDE.md (~100 tok) - **wszystkie WDROZONE** (oznaczone "DONE" w SYNTHESIS).
- TIER 2 (nastepna iteracja): macierz kosztow w katalogu, drzewo eskalacji, fallback custom pipeline info - **status niejasny, prawdopodobnie czesciowo wdrozone** (PRESET_CATALOG.md ma dzis cost matrix i escalation tree wg docs/ROUTING_SYSTEM.md, wiec TIER 2 wyglada na zrealizowane).
- TIER 3 (dlugoterminowo): hooks enforcement dla krytycznych regul (np. wersjonowanie, brak em-dash), `.claude/rules/` glob-scoped, worktree isolation per agent w ciezkich presetach - **status: brak dowodu wdrozenia**, hooks/rules nie sa wzmiankowane w SKILLS_ARCHITECTURE.md ani ROUTING_SYSTEM.md jako zaimplementowane.

**Weryfikacja stanu obecnego:** `~/.claude/CLAUDE.md` ma dzis 7-liniowa sekcje routingu (zgodnie z docs/ROUTING_SYSTEM.md), PRESET_CATALOG.md istnieje z macierza kosztow i drzewem eskalacji - TIER 1 i wieksza czesc TIER 2 sa faktycznie zaimplementowane w obecnym stanie repo.

---

## 2. Research/research-context-engineering/ (plans/SYNTHESIS.md, 2026-04-17, E1-E7 + Critic)

**Zakres:** dyscyplina zarzadzania kontekstem Claude Code 2026 - auto-compact, tokenizery, baseline overhead, .claudeignore, anti-patterny.

**Kluczowe ustalenia istotne dla projektu:**
- Auto-compact threshold to 4 rozne pojecia: nominal 95%, effective 83.5% (po buforze 33K), quality-degradation 20-40%, proactive community recommendation 60-80%. Jakosc modelu degraduje juz przy 20-40% zapelnienia kontekstu, NIE przy 80-95%.
- Skill loading: standalone (`~/.claude/skills/*.md`) = progressive disclosure dziala, ~61-100 tok/skill dopoki nieuzyty, body 1500-5000 tok on-demand. Plugin-owe skille laduja pelne body od startu (3-6K/skill, 50K+ przy wielu pluginach). **To bezposrednio potwierdza poprawnosc architektury Maciejowej (standalone skills, nie pluginy).**
- Command files maja **zero kosztu baseline** - body nie laduje sie do kontekstu az do invocation. Dla systemu 42 presetow koszt startowy = 0 tokenow (zgodne z ustaleniem z research-preset-routing).
- CLAUDE.md size tiers: community target <500 tok globalny, <500 linii (200 target) projektowy. Tylko 7.4% tresci CLAUDE.md jest relewantne per sesja - 10K token CLAUDE.md = 5K zmarnowanych per turn.
- 10 anti-patternow zidentyfikowanych (bloated CLAUDE.md, recursive imports, MCP schema bomb, Read bez limitu, niekontrolowany Bash output, context rot, autocompact thrashing, invisible token inflation, kitchen sink session, cache expiry).

**Rekomendacje dot. agentow/presetow:** Brak bezposrednich rekomendacji dot. dodania/usuwania agentow lub presetow - to research o mechanice kontekstu Claude Code jako platformy, nie o architekturze Maciejowego systemu. Posrednio wspiera: (a) trzymanie CLAUDE.md chudym, (b) unikanie pluginow na rzecz standalone skills, (c) rozwage przy chainowaniu dlugich presetow (session per task doctrine, PROGRESS.md + HANDOVER.md pattern).

**Status wdrozenia:** Maciejowy projektowy CLAUDE.md jest krotki (zgodny z rekomendacja); brak dowodu na wdrozenie PROGRESS.md/HANDOVER.md pattern czy hookow PreCompact w projekcie Agent_Architecture.

---

## 3. Research/research-hooks-best-practices/ (plans/SYNTHESIS.md, 2026-04-17, R1-R7 PASS/REVISE)

**Zakres:** 28 lifecycle events, 4 typy handlerow (command/http/prompt/agent), security hardening, community top-10 patterns.

**Kluczowe ustalenia:**
- Top 5 rekomendacji: `exit 2` (nie `exit 1`) do blokowania, pin `allowedHttpHookUrls`/`httpHookAllowedEnvVars`, preferuj `permissions.deny`/`sandbox` nad PreToolUse hooks dla prostych pattern-matchy, migracja progow PreCompact ~25% w dol na Opus 4.7 (nowy tokenizer +35% tokenow), `async: true` dla telemetrii.
- Community top-10 wzorcow: auto-format on write, block destructive Bash, protect sensitive files, TTS/notifications, session context injection, audit logging, auto-run tests, lint before commit, prompt injection scanning, inter-agent communication bus (HCOM).
- Hierarchia bezpieczenstwa: `sandbox` > `permissions.deny` > hooks.

**Rekomendacje dot. agentow/presetow:** Brak. To research czysto o mechanizmie hooks Claude Code, nie o architekturze 35-agentow/42-presetow. Jedyny punkt styku: TIER 3 z research-preset-routing sugerowal "hooks enforcement dla krytycznych regul" (wersjonowanie, brak em-dash) - to jest zrodlo wiedzy jak taki hook zaimplementowac, ale sam hook w projekcie **nie jest wdrozony** wedlug dostepnej dokumentacji projektu.

**Status wdrozenia:** Zero dowodow uzycia hooks w projekcie Agent_Architecture (brak `.claude/settings.json` z sekcja hooks wzmiankowanym w CLAUDE.md czy docs/).

---

## 4. Research/research-mcp-servers/ (plans/SYNTHESIS.md, 2026-04-17, R1-R7 + Critic)

**Zakres:** MCP jako "LSP dla AI" - spec, budowa serwerow, security (CVE-2025-59536, CVE-2026-21852), ekosystem, decision matrix MCP vs Skill vs Command vs Hook.

**Kluczowe ustalenia:**
- Decision tree: external system access -> MCP, workflow customization -> Skill, reusable shortcut -> Command, event automation -> Hook. **To bezposrednio potwierdza wybor architektoniczny Maciejowego systemu** (35 Skills + 42 Commands, zero MCP, zero Hooks) jako typowy i poprawny dla "workflow customization + reusable shortcuts" use case.
- Typowa produkcyjna topologia: 3 MCP + 5-10 Skills + 10-20 Commands + 3-5 Hooks. **Maciej ma 35 Skills + 42 Commands + 0 MCP + 0 Hooks** - odbiega od typowej topologii przez brak MCP/Hooks, ale to spojne z charakterem projektu (edukacyjny designer, nie agent operacyjny z dostepem do zewnetrznych systemow).
- Tool Search Tool redukuje token overhead MCP tool-defs o 46.9-85%.

**Rekomendacje dot. agentow/presetow:** Brak bezposrednich. Posrednio: skoro Maciejowy system nie uzywa MCP, kazdy nowy agent/preset ktory wymagalby dostepu do zewnetrznego systemu (np. GitHub API, baza danych) powinien rozwazyc MCP zamiast proby symulowania tego przez Skill/Bash.

**Status wdrozenia:** N/A (brak MCP w projekcie, zgodnie z jego charakterem).

---

## 5. Research/research-prompt-caching/ (plans/SYNTHESIS.md, 2026-04-17, R1-R7, 7/7 PASS)

**Zakres:** mechanika prompt caching, TTL, ekonomia, Claude Code CLI specifics, design patterns.

**Kluczowe ustalenia:**
- Cache hierarchia: `tools -> system -> messages`. Zmiana w wyzszej warstwie kasuje wszystkie ponizsze.
- Dodanie 1 message NIE kasuje cache; dodanie 1 tool (np. nowy MCP server) kasuje CALY cache.
- CLAUDE.md economics: 87% oszczednosci przy stabilnym CLAUDE.md + wysokim cache hit rate.
- Krytyczne dla Maciejowego systemu: edytowanie CLAUDE.md w trakcie sesji = pelny rebuild cache. Dodawanie MCP tool mid-session = katastrofa cache.

**Rekomendacje dot. agentow/presetow:** Brak bezposrednich rekomendacji strukturalnych. Praktyczna implikacja: skoro system agentow uzywa duzo skill-body invocation, **stabilnosc tool array (nie dodawac/usuwac MCP mid-session) i CLAUDE.md (nie edytowac w trakcie dlugich sesji) sa krytyczne dla ekonomiki** - istotne przy projektowaniu nowych presetow z dluga sekwencja subagentow.

**Status wdrozenia:** N/A - to wiedza o platformie Anthropic, nie feature do wdrozenia w projekcie.

---

## 6. Research/research-settings-permissions/ (plans/SYNTHESIS.md, 2026-04-17, R1-R7 + Critic, 12 konfliktow rozstrzygnietych)

**Zakres:** settings.json/permissions hierarchia (Managed > CLI > Local > Project > User), merge semantics, enterprise MDM, bugs (#17017 array replace zamiast merge), CVE-2025-59536/CVE-2026-21852.

**Kluczowe ustalenia:**
- F1: settings.json to wykonywalny kod parsowany PRZED trust dialog - RCE wektor przy klonowaniu untrusted repo.
- F3: bug #17017 - tablice permissions.allow/deny zachowuja sie jak REPLACE (nie concat+dedup wbrew docs) miedzy warstwami.
- 5 archetypow community: Minimalist (~35%), Power User (~25%), Enterprise Managed (~10%), Security-Paranoid (~10%), OSS Maintainer (~20%).

**Rekomendacje dot. agentow/presetow:** Brak. To research o Claude Code jako platformie (settings/permissions), calkowicie ortogonalny do architektury 35 agentow/42 presetow Maciejowego projektu. Punkt styku: skoro Maciejowe 42 komendy sa GLOBALNE (`~/.claude/commands/`), nie project-scoped, nie dotycza ich bugi z project-vs-user merge (#17017) - to jest niejako "bezpieczne" domyslnie.

**Status wdrozenia:** N/A dla tego projektu.

---

## 7. Research/research-skills-architecture/ (plans/SYNTHESIS.md, 2026-04-17, R1-R7 + Critic, WSZYSTKIE PASS) - **NAJWAZNIEJSZE ZRODLO dla v33**

**Zakres:** architektura Skills w Claude Code 2026 - scope/priority, frontmatter (13 pol), invocation (3 sciezki), chaining, tier decision (MCP/Skills/Subagents/Hooks), plugin ecosystem, patterns/anti-patterns. **Ten raport explicite analizuje Maciejowy system 35 skills + 42 commands i formuluje rekomendacje.**

**Kluczowe ustalenia specyficzne dla Maciejowego systemu:**
- System zidentyfikowany jako **rzadki wzorzec "orchestrator-architecture"** - wiekszosc community buduje biblioteki pojedynczych skilli, nie 2-warstwowa hierarchie agent-skill + orchestrator-skill.
- Unique value props: (a) 35 skills + 42 commands orchestrator-architecture - rzadki pattern, (b) bilingual PL/EN parity - wczesny sygnal trendu (community przewiduje fale lokalizowanych skilli H2 2026), (c) design-first toolkit (HTML designer + encyclopedia + regeneration scripts) - nikt inny community tego nie ma, (d) routing system (PRESET_CATALOG.md) - systematyczne rozwiazanie problemu "ktory preset".
- Under-represented opportunity zones w calym ekosystemie: multi-agent orchestration architecture, non-English (localized) skills, meta-skills (skills for designing skills). **Maciej pokrywa wszystkie 3.**
- Skill description budget: przy 200K context window i 35 skillach - komfortowo miesci sie (2000 chars/skill). Rekomendacja: audit 35 opisow pod katem zwiezlosci + trigger richness (200-500 chars, keywords).
- Chain depth: max 3-5 skilli w chainie (post-compaction 5K token cap per re-attached skill, budget 25K combined). **Maciejowy /deep-research-v2 z 17 agentami to kandydat na Swarm Orchestration** zamiast prostego chaina - obecnie uzywa orchestrator + manual sequencing z powodu braku Task tool w srodowisku.
- Bug #17283: `context:fork` + `agent` fields sa ignorowane gdy skill jest invokowany przez Skill tool (nie przez slash command) - **blokuje parallel fan-out patterns bez workaround**. Workaround: uzywac slash invocation zamiast Skill tool call.
- Model routing decision framework (4 wymiary: complexity, output length, iterative refinement, criticality) - Maciejowa architektura Deep Research v2 (Orch Opus, Researchers Sonnet, Extractors Haiku, Critic+Syntetyk Opus) **trafnie mapuje na wszystkie 4 wymiary**.
- Standalone vs Plugin: Maciejowy system jest slusznie standalone (private use, zero narzutu) - plugin-izacja uzasadniona TYLKO jesli publikacja publiczna. Raport zawiera szczegolowy roadmap migracji standalone->plugin (5 faz, ~8h) na wypadek publikacji.

**Rekomendacje dot. DODANIA/USUNIECIA agentow lub presetow:**
- **Brak rekomendacji redukcji/konsolidacji** istniejacych 35 agentow lub 42 presetow.
- **Potencjalne rozszerzenia zasugerowane** (Part V.9): MCP integracja z Notion/GitHub dla agent data sync, Hooks - auto-run `/deep-research-v2` na keyword w commit messages, Subagents - explicit `~/.claude/agents/` dla top-used roli zamiast skill-with-fork. **To sa jedyne konkretne rekomendacje rozszerzenia w calym korpusie researchu** i **nie sa wdrozone** (projekt nadal ma 0 MCP, 0 Hooks, 0 native subagents wedlug docs/SKILLS_ARCHITECTURE.md).
- Migracja 42 commands do struktury `skills/<orchestrator-name>/SKILL.md` (post Claude Code 2.1+ merge komend/skilli) zasugerowana jako "naturalna przy rozbudowie" ale **nie wymuszona i nie wdrozona** - obecny system nadal uzywa `~/.claude/commands/*.md`.

**Status wdrozenia:** Zerowy postep na rekomendacjach rozszerzen (MCP/Hooks/native Subagents) i migracji struktury command->skill. Architektura bazowa (standalone, PL/EN, orchestrator pattern) juz jest zgodna z best practices - nie wymaga zmian.

---

## 8. Research/research-subagents-task-tool/ (plans/SYNTHESIS.md, 2026-04-17, R1-R7 + Critic) - **DRUGIE NAJWAZNIEJSZE ZRODLO dla v33**

**Zakres:** trzy mechanizmy "nieblokujace glownego watku" (Task/Agent tool, run_in_background+Monitor, Agent Teams+SendMessage), model routing ROI, parallel execution, worktree isolation, anti-pattern catalogue. **Explicite cytuje Maciejowy Deep Research v2 jako case study.**

**Kluczowe ustalenia specyficzne dla Maciejowego systemu:**
- Deep Research v2 case study (R4.C7): routing Opus/Sonnet/Haiku (Orchestrator Opus, Researchers Sonnet, Extractors Haiku, Critic+Syntetyk Opus) **cut Opus spend by ~60% vs all-Opus baseline** przy zachowaniu jakosci - cytowany jako kanoniczny przyklad "advisor strategy".
- Kazdy subagent placi 20-50K token "entry tax" (system prompt + CLAUDE.md chain + MCP tool descriptions) przed produkcja uzytecznego outputu. Przy 5 rownoleglych subagentach = 100-250K tokenow overhead.
- Max recursion depth = 1 - subagenci NIE moga spawnowac subagentow. Deep Research v2 z 17 agentami dziala jako orchestrator + manual sequencing wlasnie z tego powodu (nie ma dostepu do prawdziwego Task tool w tym srodowisku SDK).
- 3-5 agentow to sweet spot rownoleglosci, 10 - twardy limit (queue FIFO powyzej).
- "Think like your agents" - meta-zasada Anthropic: symulowac co widzi subagent na starcie, zanim zaprojektuje sie prompt.
- 12-punktowy katalog anti-patternow z Deep Research v2 relevancja: "delegate understanding" (subagent powinien zwracac raw material, nie summary-of-summary do dalszego rozumowania), "over-spawning" (Opus 4.6 ma bias do nadmiernego spawnowania bez explicit effort tier w promptcie), "model inheritance" (93.8% realnego community usage biegnie na Opus przez brak explicit `model:` per subagent).

**Rekomendacje dot. DODANIA/USUNIECIA agentow lub presetow:**
- **Brak rekomendacji redukcji** istniejacych 35 agentow.
- Sekcja 20.6 "skills-vs-memory tension": przy >30 skills (jak Maciejowe 35) - **rekomendacja rozwazenia przeniesienia czesci skilli do project scope** (auto-loading tylko gdy relewantne) lub plugin scope (load on demand), zamiast trzymania wszystkich w user scope (`~/.claude/skills/`) gdzie sa ambient context dla kazdej sesji. **Nie wdrozone** - wszystkie 35 skilli pozostaje w `~/.claude/skills/` (global, zawsze dostepne metadata).
- Sekcja 20.7 "Observability gap": brak wbudowanego dashboardu dla subagent token usage, cost attribution wymaga manual session-log parsing. Community narzedzia (`claude-code-agent-monitor`, `claude-code-hooks-multi-agent-observability`) sugerowane jako gap-fillery. **Nie wdrozone w projekcie Maciej.**
- Playbook 15.7 "cut Opus bill in half" - audit checklist per-subagent model assignment (search/grep/enumerate/extract -> Haiku; edits/routine -> Sonnet; planning/synthesis/conflict -> Opus). Maciej juz to robi w Deep Research v2, ale **brak dowodu ze ten audit zostal systematycznie zastosowany do pozostalych 41 presetow** poza Deep Research v2.

**Status wdrozenia:** Model routing pattern z Deep Research v2 nie zostal jeszcze uogolniony/zaudytowany na pozostale presety wedlug dostepnej dokumentacji.

---

## 9. docs/SKILLS_ARCHITECTURE.md (dokument projektowy, aktualizowany 2026-04-16, v32.16)

**Tresc:** dokumentacja techniczna 35 skilli (`~/.claude/skills/`) i ich relacji do 42 komend (`~/.claude/commands/`). Opisuje single-source-of-truth design: skille = definicje agentow (~1000 tok/agent, 8-sekcyjna struktura: ROLE/INPUT/OUTPUT/RESPONSIBILITIES/RULES/WHAT YOU DO NOT DO/ANTI-PATTERNS/REPORT FORMAT), komendy = orchestracja + referencje do skilli (bez duplikacji promptow, -73% rozmiaru plikow po refaktorze `generate_commands.js`).

Zawiera skrypty regeneracji `generate_skills.js` + `generate_commands.js` z HTML jako zrodla prawdy (AGENT_EDU_PL / PR objects). Model routing tabela: Opus (orchestrator, 5 ekspertow Five Minds, synteza), Sonnet (build, QA management, planowanie), Haiku (skanowanie research, lekkie QA, HITL).

**Rekomendacje dot. agentow/presetow:** Brak - to dokument opisowy stanu obecnego, nie rekomendacyjny. Instrukcja "Adding New Agents" (6 krokow) jest gotowym runbookiem gdyby v33 chcial dodac nowego agenta - juz istnieje proces, nie trzeba go projektowac od nowa.

---

## 10. docs/ROUTING_SYSTEM.md (dokument projektowy, aktualizowany 2026-04-16)

**Tresc:** architektura routingu (CLAUDE.md -> PRESET_CATALOG.md -> commands -> skills), token budget (~4100-5600 tok per routing event, ~0.41-0.56% okna kontekstowego), struktura PRESET_CATALOG.md (decision guide + 42 presety w 5 tierach + cost matrix + escalation tree + fallback custom pipeline).

Cytuje bezposrednio wnioski z research-preset-routing/SYNTHESIS.md: unikatowosc systemu, commands jako poprawny mechanizm, CLAUDE.md <200 linii/<5K tok, oszczednosc ~51% dzieki model routing vs uniform Opus.

**Rekomendacje dot. agentow/presetow:** Brak nowych - to jest juz zaimplementowany stan koncowy rekomendacji TIER 1 z research-preset-routing.

---

## Podsumowanie krzyzowe: gdzie kampanie sie nakladaja

Cztery kampanie (context-engineering, hooks, mcp-servers, prompt-caching, settings-permissions) dotycza **Claude Code jako platformy** i sa ogolnowiedzowe - nie analizuja specyficznie Maciejowego systemu 35 agentow/42 presetow. Nowa kampania v33 **nie powinna ich powielac** jesli temat to "jak dziala X w Claude Code" (X = hooks, MCP, caching, settings, context) - ta wiedza jest juz udokumentowana z cytatami R<N>.C<M> i data 2026-04-17.

Dwie kampanie (**skills-architecture** i **subagents-task-tool**) SA bezposrednio o architekturze Maciejowego projektu i zawieraja explicit case studies + rekomendacje. Te dwa raporty to **najwazniejszy punkt startowy** dla jakiejkolwiek kampanii v33 dotyczacej rozbudowy/redukcji/reorganizacji systemu agentow i presetow.

Kampania **preset-routing** jest w duzej mierze zrealizowana (TIER 1 i wieksza czesc TIER 2 wdrozone) - delta research powinien sprawdzic tylko TIER 3 (hooks enforcement, .claude/rules/, worktree isolation) ktory pozostaje niewdrozony.

---

## Niewdrozone rekomendacje

Lista wszystkich konkretnych rekomendacji z istniejacego researchu, ktore NIE zostaly jeszcze zaimplementowane w projekcie (na podstawie dostepnej dokumentacji CLAUDE.md, docs/SKILLS_ARCHITECTURE.md, docs/ROUTING_SYSTEM.md):

1. **[research-preset-routing, TIER 3]** Hooks enforcement dla krytycznych regul projektowych (np. "nigdy nie nadpisuj wersji", "brak em-dash") przez `.claude/settings.json` hooks zamiast polegania na CLAUDE.md (~70% compliance vs ~100% dla hookow).
2. **[research-preset-routing, TIER 3]** `.claude/rules/` z glob-scoped regulami (np. `html-versioning.md` z `applyTo: "*.html"`), wzorem Cursor `.mdc`.
3. **[research-preset-routing, TIER 3]** Deklaracja `isolation: worktree` per agent w ciezkich presetach (np. deep-five-minds, full).
4. **[skills-architecture, V.9]** MCP integracja (np. Notion/GitHub) dla agent data sync - obecnie 0 serwerow MCP w projekcie.
5. **[skills-architecture, V.9]** Hooks - np. auto-run `/deep-research-v2` na keyword w commit messages - obecnie 0 hookow.
6. **[skills-architecture, V.9]** Explicit `~/.claude/agents/` (native Claude Code subagent definitions) dla top-used roli, zamiast obecnego wzorca "skill jako prompt referencyjny czytany przez orchestratora" - obecny system nie uzywa natywnego mechanizmu subagentow Claude Code w ogole.
7. **[skills-architecture, I.4]** Audit 35 opisow skilli pod katem zwiezlosci + trigger richness (rekomendowane 200-500 znakow z keywords) - nie potwierdzone czy wykonane.
8. **[skills-architecture, VI.8a]** Migracja standalone -> plugin (gdyby projekt mial byc publikowany jako dystrybuowalny plugin) - obecnie pozostaje standalone, co jest OK dla private use, ale roadmap migracji istnieje nieuzyty.
9. **[subagents-task-tool, 20.6]** Rozwazenie przeniesienia czesci z 35 skilli z user scope do project lub plugin scope, zeby zmniejszyc ambient context przy kazdej sesji (przy >30 skillach to juz zalecany prog uwagi).
10. **[subagents-task-tool, 20.7]** Instrumentacja observability dla subagent token usage / cost attribution (community narzedzia: `claude-code-agent-monitor`, hooks-based SQLite logging) - brak dashboardu, cost tracking manualny.
11. **[subagents-task-tool, 15.7]** Systematyczny audit model-routing (Haiku/Sonnet/Opus) na wszystkich 42 presetach wedlug 4-wymiarowego frameworku (complexity/output length/iterative refinement/criticality) - obecnie potwierdzony tylko dla Deep Research v2 preset, nie dla calej reszty.
12. **[context-engineering]** PROGRESS.md + HANDOVER.md pattern dla dlugich sesji multi-agent (np. deep-five-minds, deep-research-v2) - brak dowodu wdrozenia w samym projekcie Agent_Architecture (choc uzytkownik ma to jako globalna regule CLAUDE.md dla wiekszych projektow ogolnie, wiec czesciowo pokryte na poziomie procesu, nie technicznie jako plik/hook).
13. **[context-engineering]** PreCompact hook do archiwizacji transkryptow przy dlugich sesjach multi-agent presetow.

Zadna z powyzszych pozycji nie dotyczy REDUKCJI liczby agentow lub presetow (35/42) - caly istniejacy research jest zgodny co do tego, ze obecna liczba i architektura jest poprawna i unikatowa; wszystkie niewdrozone rekomendacje to rozszerzenia infrastruktury (MCP/Hooks/native subagents/observability) lub higiena procesu (hooks enforcement, scope optimization), nie zmiana skladu 35 agentow czy 42 presetow.
