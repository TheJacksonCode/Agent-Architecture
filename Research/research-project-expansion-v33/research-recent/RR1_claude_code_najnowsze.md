# RR1: Najnowsze aktualizacje Claude Code (luty-sierpien 2026)

Zakres: fakty z ostatnich 6 miesiecy (luty 2026 - sierpien 2026), dotyczace Claude Code (Agent Skills, Subagents/Task tool, MCP, modele Claude, CLI/harness). Kontekst projektu: "Agent Architecture Designer" - 35-37 agentow, 42-44 presety dla Claude Code, oparte o skills (~/.claude/skills/*.md) i commands (~/.claude/commands/*.md) generowane z HTML.

Uwaga metodologiczna: oficjalny changelog Anthropic (code.claude.com/docs/en/changelog) w praktyce udostepnia szczegolowe wpisy dopiero od polowy lipca 2026 (wersje 2.1.21x-2.1.238). Starsze wpisy z lutego-czerwca 2026 nie byly dostepne w pobranej tresci changeloga, ale kluczowe wydarzenia (Sonnet 5, Opus 5) potwierdzone osobnymi zrodlami ponizej.

---

## Chronologiczna lista aktualizacji

### 17 lutego 2026 - Claude Sonnet 4.6
Wydanie posredniej wersji Sonnet przed Sonnet 5 (wg timeline'u modeli).
Zrodlo: https://hidekazu-konishi.com/entry/anthropic_claude_model_release_timeline.html
**Relevancja:** SREDNIA. Projekt powinien traktowac Sonnet 4.6 jako przejsciowy - obecny model routing w presetach juz zaklada nowsze wersje (patrz nizej Sonnet 5/Opus 5).

### 30 czerwca 2026 - Claude Sonnet 5 (premiera)
Anthropic wypuscil Claude Sonnet 5 jednoczesnie w Claude apps, Claude Code i Claude Platform API. Opisany jako "najbardziej agentyczny Sonnet dotychczas" - silniejsze wykonanie zadan agentowych, coding, tool use, praca web/search, computer-use. Domyslny model dla planow Free/Pro; dostepny takze dla Max/Team/Enterprise. Cena startowa (do 31 sierpnia 2026): $2/Mtok input, $10/Mtok output; docelowa: $3/$15.
Zrodlo: https://www.anthropic.com/news/claude-sonnet-5 , https://techcrunch.com/2026/06/30/anthropic-launches-claude-sonnet-5-as-a-cheaper-way-to-run-agents/
**Relevancja:** WYSOKA. Projekt (agenci/presety) referuje konkretne modele Claude w routingu (np. "Sonnet researcher, Opus orchestrator/critic"). Nazwy modeli w encyklopedii/presetach powinny zostac zaktualizowane do generacji "5" (Sonnet 5, nie 4.x) jako nowy standard "srodkowego" modelu.

### 23-28 lipca 2026 - MCP spec 2026-07-28 ("stateless core")
Piata duza rewizja specyfikacji Model Context Protocol. Kluczowa zmiana: przejscie z protokolu stanowego (bidirectional, streamable HTTP z długotrwałym połączeniem) na stateless core (request/response), co pozwala hostowac serwery MCP na infrastrukturze serverless/edge. Dodatkowo: Multi Round-Trip Requests, header-based routing, cache'owalne wyniki list, wzmocniona autoryzacja, formalny framework rozszerzen, zaktualizowane SDK Tier 1. Tasks przechodzi z core do rozszerzenia `io.modelcontextprotocol/tasks` (poll-based `tasks/get` + nowe `tasks/update`). Roots, Sampling i Logging oznaczone jako deprecated (dzialaja jeszcze min. 12 miesiecy). MCP przekroczyl 400M pobran SDK miesiecznie (4x wzrost w tym roku).
Zrodlo: https://claude.com/blog/bringing-mcp-2026-07-28-to-claude , https://blog.modelcontextprotocol.io/posts/2026-07-28/ , https://www.theregister.com/devops/2026/07/23/model-context-protocol-prepares-to-break-with-its-stateful-past/5276722
**Relevancja:** WYSOKA (dlugoterminowo). Jesli projekt dokumentuje/edukuje o architekturze MCP (agent "MCP integrator" czy podobny), warto dodac wzmianke o przejsciu na stateless core i deprecation Roots/Sampling/Logging - to zmienia jak nalezy opisywac budowe serwerow MCP w materialach edukacyjnych.

### 24 lipca 2026 - Claude Opus 5 (premiera) + wersja Claude Code 2.1.219
Wydanie Claude Opus 5 (`claude-opus-5`) - nowy domyslny model Opus. 1M-token context window, do 128K tokenow output, adaptive thinking domyslnie wlaczone. Fast mode: $10/$50 za Mtok. Opus 4.7 usuniety z fast mode; `/fast` dziala teraz na Opus 5 i Opus 4.8. Dodano zmienna srodowiskowa `ANTHROPIC_DEFAULT_MODEL` (model dla nowych sesji, w odroznieniu od `ANTHROPIC_MODEL`).
Rownolegle w tej samej wersji: dodano nested subagent forwarding w stream-json (subagenci na glebokosci 2+ widoczni przy `--forward-subagent-text`); subagenci moga teraz spawnowac zagniezdzonych subagentow do glebokosci 3 domyslnie (bylo 1), `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH=1` wylacza. Dodano `notify_when_idle` do cross-session `SendMessage`.
Zrodlo: https://code.claude.com/docs/en/changelog
**Relevancja:** BARDZO WYSOKA. (1) Opus 5 z 1M context i domyslnym adaptive thinking - projekt powinien zaktualizowac opisy modeli w encyklopedii agentow (np. Orchestrator/Krytyk na Opus). (2) Zagniezdzone subagenty do glebokosci 3 to fundamentalna zmiana architektoniczna wzgledem modelu "flat" subagentow, na ktorym opiera sie obecny system presetow - warto rozwazyc dodanie prezentacji "nested pipelines" w encyklopedii.

### 17 lipca 2026 (v2.1.212) - Zmiany w Task tool i subagentach
Deprecated parametr `mode` w Task tool (jest ignorowany) - subagenci dziedzicza teraz tryb uprawnien sesji nadrzednej. Dodano limit spawnow subagentow na sesje (domyslnie 200, `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION`). `/fork` teraz kopiuje konwersacje do nowej sesji w tle (zamiast subagenta w sesji); subagent in-session zastapiony przez `/subtask`. Zmieniono `/commit-push-pr`, by niebezpieczne flagi git/gh (`--force`, `--amend`, `--no-verify`) nie byly auto-zatwierdzane.
Zrodlo: https://code.claude.com/docs/en/changelog
**Relevancja:** WYSOKA. Parametr `mode` w Task tool byl czescia wczesniejszej dokumentacji subagentow - jesli projekt gdziekolwiek dokumentuje wywolania Task tool z `mode`, trzeba to zaktualizowac (deprecated). Rozroznienie `/fork` (nowa sesja w tle) vs `/subtask` (in-session) to nowy prymityw wart uwzglednienia w opisie "jak dzialaja subagenci".

### 22 lipca 2026 (v2.1.218) - Limity concurrency subagentow
Dodano twardy limit rownoczesnie dzialajacych subagentow (domyslnie 20, `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`). Domyslnie subagenci NIE spawnuja juz zagniezdzonych subagentow (zmiana bazowa - potem 24 lipca podniesiono domyslna glebokosc do 3, patrz wyzej - kolejnosc wpisow w changelogu jest nieco niespojna dot. tej flagi, ale koncowy stan na 20-21 sierpnia to: max concurrency 20, max spawnow/sesje 200, max glebokosc 3). Naprawiono `--max-budget-usd` nie zatrzymywal subagentow w tle. `/code-review` zaczal dzialac jako background subagent.
Zrodlo: https://code.claude.com/docs/en/changelog
**Relevancja:** BARDZO WYSOKA. Projekt reklamuje presety z duza liczba agentow rownoczesnie (np. Deep Five Minds ~30 agentow, swarm 6-7 researcherow + krytyk). Limit 20 rownoczesnych subagentow i 200 na sesje to twardy sufit runtime'u Claude Code - warto dodac w dokumentacji projektu (docs/ROUTING_SYSTEM.md, docs/SKILLS_ARCHITECTURE.md) sekcje o tych limitach, zwlaszcza dla najwiekszych presetow (Deep Five Minds, Full Hierarchy, deep-research-swarm-pro), by user wiedzial ze przy duzych fan-out moze trafic na cap.

### 18 lipca 2026 (v2.1.214) - Telemetria i status agentow
Dodano `message.uuid`, `client_request_id`, `tool_source` do OpenTelemetry log events. Dodano reasoning effort do payloadu `subagentStatusLine` dla custom renderowania wierszy agentow.
Zrodlo: https://code.claude.com/docs/en/changelog
**Relevancja:** NISKA. Techniczne detale telemetrii, nie wplywa bezposrednio na projekt edukacyjny.

### 4 sierpnia 2026 (v2.1.221) - Skills w tle, `claude plugin validate`
Skille z `context: fork` teraz domyslnie dzialaja w tle (background); opt-out per skill przez `background: false`. Dodano `claude plugin validate` do walidacji katalogu `.claude/skills`. Dodano subcommand `prompt-audit` do skilla `claude-api` (audyt promptow/opisow narzedzi pod katem wzorcow pisanych dla starszych modeli). `/review` stal sie aliasem `/code-review`.
Zrodlo: https://code.claude.com/docs/en/changelog
**Relevancja:** SREDNIA-WYSOKA. `context: fork` + domyslne tlo to zmiana zachowania dla wszystkich 35 skilli projektu jesli ktorykolwiek z nich uzywa `context: fork` we frontmatter - warto sprawdzic generate_skills.js i wygenerowane pliki pod katem tego pola. `claude plugin validate` moze byc uzyteczny do CI/self-check repo.

### 12-13 sierpnia 2026 (v2.1.229, v2.1.232) - Plugin marketplace i nazewnictwo agentow
Zmieniono pliki markdown agentow tak, by odrzucaly nazwy agentow zawierajace `:` (zarezerwowane dla namespacingu pluginow). Dodano akceptowane wartosci `yes/no/on/off/1/0` (case-insensitive) dla boolean we frontmatter skill/plugin. Dodano zrodla `command` dla plugin marketplace.
Zrodlo: https://code.claude.com/docs/en/changelog
**Relevancja:** SREDNIA. Jesli generator commands.js/skills.js kiedykolwiek uzywalby `:` w nazwach presetow/agentow (np. przy przyszlym wsparciu dla namespacingu pluginow), trzeba to uwzglednic. Obecnie prawdopodobnie nie dotyczy - warto zweryfikowac konwencje nazw w `~/.claude/commands/*.md`.

### 13 sierpnia 2026 (v2.1.232) - Subagent forking domyslnie wlaczony
Duza zmiana: subagent forking teraz domyslnie wlaczony - `subagent_type: "fork"` dziedziczy pelna konwersacje i prompt cache. Spawny agentow "non-teammate" w sesjach interaktywnych domyslnie dzialaja teraz w tle. Dodano wzmianki `@` w promptcie by bezposrednio dotrzec do sesji przez `SendMessage`.
Zrodlo: https://code.claude.com/docs/en/changelog
**Relevancja:** BARDZO WYSOKA. To jedna z najwazniejszych zmian w tym polroczu dla architektury multi-agent. Fork z dziedziczeniem pelnej konwersacji + prompt cache oznacza nowy, tanszy sposob tworzenia wariantow agenta (np. do Cascade Cost presetu czy do specjalizowanych sub-krokow) - warto rozwazyc dodanie nowego prymitywu/presetu "Fork-based agent" wykorzystujacego to zachowanie (mniejszy koszt bo prompt cache jest dziedziczony).

### 14 sierpnia 2026 (v2.1.233) - Usuniecie narzedzi todo z najnowszych modeli
Narzedzia sledzenia zadan (TaskCreate/Get/Update/List, TodoWrite) NIE sa juz dostepne domyslnie na Opus 4.8, Sonnet 5, Fable 5, Mythos 5 i nowszych modelach; mozna przywrocic przez `CLAUDE_CODE_ENABLE_TODO_TOOLS=1`. Fable 5 ponownie dostepny jako doradca w `/advisor` dla organizacji z dostepem do Fable. `CLAUDE_CODE_DISABLE_1M_CONTEXT` teraz ogranicza kazdy model z natywnym oknem 1M do 200K przez auto-compaction.
Zrodlo: https://code.claude.com/docs/en/changelog
**Relevancja:** WYSOKA. Nowe modele (Sonnet 5, Opus 5) domyslnie NIE maja wbudowanych narzedzi todo-listy - to zmienia sposob w jaki orkiestratorzy/agenci w presetach projektu maja sledzic postep miedzy fazami (np. Deep Five Minds z wieloma bramami HITL). Trzeba sprawdzic, czy ktorys z 35 agentow/42 presetow opiera sledzenie postepu na wbudowanym TodoWrite - jesli tak, moze wymagac jawnego ustawienia zmiennej lub zmiany podejscia (np. plik PROGRESS.md jako zamiennik, co juz jest praktykowane w standardzie research+plans usera).

### 6-7 sierpnia 2026 (v2.1.223, v2.1.224) - Self-hosted runner i teleport
Dodano `claude self-hosted-runner` (Team/Enterprise) - wlasne maszyny/kontenery jako miejsce uruchamiania sesji web/mobile/desktop. Dodano `/teleport` - podpowiedz w sesjach chmurowych jak kontynuowac lokalnie przez `claude --teleport <session id>`. Dodano wsparcie flagi `--settings` z mergowaniem ustawien user/managed/project.
Zrodlo: https://code.claude.com/docs/en/changelog
**Relevancja:** NISKA-SREDNIA. Nie dotyczy bezposrednio architektury agentow/presetow, ale moze byc wzmianka w dokumentacji jako "jak uruchamiac agenty na wlasnej infrastrukturze" w kontekscie enterprise.

### 20 sierpnia 2026 (v2.1.238, v2.1.237) - MCP marketplace headers, prompt caching fixes
Plugin marketplaces: `headersHelper` na wpisie marketplace/catalog uruchamia komende generujaca naglowki HTTP dla fetchy katalogu. `claude mcp list`/`claude mcp get` pokazuja wylaczone serwery jako `⊘ Disabled` zamiast probowac laczyc. Naprawiono prompt caching dla sesji uzywajacych LLM gateway lub custom base URL. Dodano `claude self-hosted-runner --defer-shutdown-max-min` i `--proxy-authorization-command/-file`.
Zrodlo: https://code.claude.com/docs/en/changelog
**Relevancja:** NISKA. Detale operacyjne MCP marketplace, nie dotyczy bezposrednio edukacyjnej warstwy projektu.

---

## Co musimy zaktualizowac w projekcie

1. **Modele w encyklopedii/routingu** - zaktualizowac wszystkie referencje do "Sonnet 4.x" / "Opus 4.x" na Sonnet 5 (premiera 30.06.2026) i Opus 5 (premiera 24.07.2026, 1M context, domyslny Opus). Dotyczy `docs/SKILLS_ARCHITECTURE.md`, opisow modeli w encyklopedii agentow (35 agentow) i sekcji "model routing" w prezetach premium.

2. **Limity concurrency subagentow (KRYTYCZNE)** - dodac do `docs/ROUTING_SYSTEM.md` i do opisow najwiekszych presetow (Deep Five Minds ~30 agentow, deep-research-swarm-pro 7+ agentow, full 5-poziomowa hierarchia) jawna wzmianke o limitach Claude Code: max 20 rownoczesnych subagentow, max 200 spawnow/sesje, max glebokosc zagniezdzenia 3. To bezposrednio wplywa na to, czy najwieksze presety projektu faktycznie moga wykonac sie w calosci w jednej sesji bez throttlingu.

3. **Zniknięcie narzedzi todo z nowych modeli** - zweryfikowac, czy agenci-orkiestratorzy w presetach (np. Orkiestrator w `standard`, `solo`, `deep-five-minds`) polegaja na wbudowanym TodoWrite/TaskCreate do sledzenia faz. Jesli tak, dodac wskazowke o `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` lub polegac na wzorcu plikowym PROGRESS.md (juz stosowanym w standardzie research+plans).

4. **Nowy prymityw: subagent fork z dziedziczonym prompt cache (13.08.2026)** - rozwazyc dodanie do encyklopedii wyjasnienia czym rozni sie `subagent_type: "fork"` (dziedziczy pelna konwersacje + cache, tanszy) od zwyklego subagenta (czysty kontekst). Moze to zainspirowac nowy tani preset lub wariant istniejacego (np. Cascade Cost).

5. **`/fork` vs `/subtask` (17.07.2026)** - zaktualizowac wszelka dokumentacje uzywajaca starego rozroznienia in-session subagent - `/fork` teraz tworzy nowa sesje w tle, a `/subtask` zastapil dawny in-session subagent.

6. **Deprecated `mode` w Task tool** - jesli jakikolwiek command/skill w repo dokumentuje lub uzywa parametru `mode` przy wywolaniach Task tool, oznaczyc jako deprecated (subagenci dziedzicza teraz tryb uprawnien sesji nadrzednej).

7. **`context: fork` + `background: false` (04.08.2026)** - sprawdzic wygenerowane pliki skilli (`~/.claude/skills/*.md`, generowane przez `generate_skills.js`) pod katem pola `context: fork` - od tej daty takie skille domyslnie dzialaja w tle, co moze zmienic UX (agent nie blokuje glownej rozmowy, ale user musi wiedziec ze wynik przyjdzie asynchronicznie).

8. **MCP stateless core (23-28.07.2026)** - jesli projekt ma agenta/sekcje dot. integracji MCP, dodac wzmianke o nowej specyfikacji 2026-07-28: stateless core, deprecation Roots/Sampling/Logging (dzialaja jeszcze 12 miesiecy), nowy extensions framework dla Tasks. To zmienia jak nalezy uczyc budowy serwerow MCP w materialach edukacyjnych projektu.

9. **`ANTHROPIC_DEFAULT_MODEL`** - nowa zmienna srodowiskowa (24.07.2026, potwierdzona ponownie 19.08.2026) do ustawiania domyslnego modelu dla nowych sesji - warto dodac do dokumentacji konfiguracji projektu jesli jest tam sekcja o zmiennych srodowiskowych Claude Code.

10. **Liczba agentow/presetow w opisie projektu** - user w briefie wspomnial juz "37 agentow, 44 presety" (wersja v33?), co sugeruje ze rozbudowa jest juz w toku niezaleznie od tego researchu - potwierdzic czy te liczby sa docelowe dla v33 i czy nowe agenty/presety powinny odzwierciedlac powyzsze zmiany (np. nowy agent/preset wykorzystujacy `fork` subagent).
