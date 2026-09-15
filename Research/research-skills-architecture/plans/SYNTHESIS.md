# SYNTHESIS - Claude Code Skills Architecture 2026

**Owner:** Syntetyk (Opus)
**Date:** 2026-04-17
**Sources:** R1-R7 + E1-E7 + CRITIC (wszystkie PASS)
**Format:** 7 Parts, ~9000 slow, load-bearing claims cytowane jako R<N>.C<M>.
**Audience:** Maciej Palczewski - operator 35 skills + 42 commands v32.16, AI Native Engineer. Tekst SYSTEMATYZUJACY, nie uczacy.

---

## Executive summary (przed Part I)

Claude Code Skills to **filesystem-based mechanizm rozszerzania** z progressive disclosure: metadata na starcie, cialo skilla na invocation, resources on-demand. Ekosystem zbudowal 4-tier architekture (MCP / Skills / Subagents / Hooks) ktora **rozwiazuje rozne problemy** i **nie konkuruje**: MCP to dane, Skills to prompty, Subagents to izolacja, Hooks to triggery. W Claude Code 2.1+ custom commands zostaly **zmerge'owane z skills** - slash command to po prostu user-invocable skill; skill wygrywa przy kolizji nazw.

Maciejowy system (35 agent-skills + 42 orchestrator-command-skills) realizuje **rzadki pattern "orchestrator-architecture"** - wiekszosc community buduje biblioteki pojedynczych skilli; jego bilingual PL/EN coverage + design-first toolkit (HTML designer + encyclopedia + regeneration scripts) to unikalny value prop w landscape 2026.

Najgorzej udokumentowane (oznaczone niska pewnoscia): (a) Plugin vs project namespace priority (R6.C17), (b) plugin update mid-session behavior (R6.GAP1), (c) empiryczne token footprint premium skilli. Najgrozniejszy bug: #17283 - context:fork ignorowany gdy skill invokowany przez Skill tool, **blokuje parallel fan-out patterns** bez workaround.

Najwyzsza-dzwignia patterns: (1) commitment-before-generation (Frontend Design, Trail of Bits), (2) progressive disclosure full-stack (SKILL.md jako index + references/), (3) trigger-rich descriptions dla reliable auto-invocation.

---

## Part I: Fundamenty - jak Skills sa zbudowane

### I.1 Scope level i priority

Claude Code skanuje 4 lokalizacje w trakcie startupa sesji [R1.C1]:

| Level | Path | Reach |
|-------|------|-------|
| Enterprise | managed settings | All users in organization |
| Personal | `~/.claude/skills/<name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<name>/SKILL.md` (namespaced `plugin-name:skill-name`) | Where plugin enabled |

Konflikt nazw rozstrzyga **priority order Enterprise > Personal > Project**. Plugin skills maja namespace `plugin-name:skill-name` i **nie moga wejsc w konflikt** z innymi poziomami [R1.C2] - to elegancka izolacja ktora obchodzi problem kolizji calkowicie.

**Praktyczna implikacja dla Maciejowego systemu:** 35 skilli w `~/.claude/skills/` (Personal scope) sa dostepne we wszystkich projektach, a project-local override mozna dodac w razie potrzeby bez resetu.

**Nierozstrzygniete (flag, low confidence):** gdy plugin instaluje skill `deploy` (namespace `vercel:deploy`) i user ma project-local `.claude/skills/deploy.md`, ktory wygrywa przy wpisaniu `/deploy` bez prefiksu? Community reports sugeruja project wins, ale brak authoritative docs [R6.C17, CRITIC 3.1]. Unikaj load-bearing decyzji na tej ambiguity.

### I.2 Commands merge (Claude Code 2.1+)

Kluczowa zmiana architektury w 2.1: custom commands (`.claude/commands/name.md`) i skills (`.claude/skills/name/SKILL.md`) zostaly **zmerge'owane** - oba tworza `/name` slash command [R1.C3, R3.C5]. Gdy obie struktury istnieja z ta sama nazwa, **skill wygrywa**. Dla backward compatibility stare komendy dalej dzialaja, ale skills sa rekomendowane bo wspieraja:
- Supporting files (reference.md, scripts/, examples/)
- Pelny zestaw frontmatter features
- Progressive disclosure

**Implikacja dla Maciejowej struktury:** 42 komendy w `~/.claude/commands/` to de facto user-invocable orchestrator skills. Migracja do struktury `skills/<orchestrator-name>/SKILL.md` nie jest wymuszona, ale przy rozbudowie (dodanie resources per-preset) bedzie naturalna.

### I.3 Progressive disclosure - three-level architecture

Wszystkie skille load-on-demand w 3 poziomach [R1.C4]:

| Level | When loaded | Token cost | Content |
|-------|-------------|------------|---------|
| 1: Metadata | Always (startup) | ~37-100 tokens/skill | name + truncated description |
| 2: Instructions | Skill triggered | <5k tokens | SKILL.md body |
| 3: Resources | As needed | Unlimited | Bundled files read via bash |

Anthropic engineering blog raportuje ~1500 tokens total overhead dla **40 skilli** dzieki progressive disclosure [R1.C5]. Resource tier to game-changer: `examples/sample-001.md` moze miec 10k tokens ale wchodzi w context tylko jesli Claude eksplicite zdecyduje ze potrzebuje.

**Triangulacja token numbers [CRITIC 2.1]:** Anthropic eng (~37/skill metadata) i Lee Hanchung (~100 startup + ~1500/turn) nie sa sprzeczne. 37 to metadata-only. 100 to pelen listing entry gdy description+when_to_use blisko 1536 char cap. 1500/turn to Level 2 body po invocation. Uzywaj obu zaleznie od kontekstu planowania budzetu.

### I.4 Skill description budget - dynamika w runtime

Gdy zainstalowanych jest duzo skilli (35+ Maciej, 1000+ sickn33), kluczowy jest **skill description budget** [R1.C8]:

- **All skill NAMES** zawsze included w system prompt
- **Descriptions** sa shortened jesli przekraczaja budget
- Budget: **1% context window** z fallback **8000 chars**
- Override via `SLASH_COMMAND_TOOL_CHAR_BUDGET` env var
- Per-entry cap: **1536 chars** (description + when_to_use combined)

Przy 200k context window budget wynosi 2000 chars per skill przy 35 skillach (Maciejowy wypadek) - komfortowo miesci. Przy 1000+ skillach i 200k context mamy 2 chars/skill - descriptions skrocone do niczego, auto-invocation gorsza.

**Maciejowa checklist:** audit descriptions 35 skilli pod katem zwiezlosci + trigger richness. Cel: 200-500 chars per skill z keywords triggerujacymi (patrz Part VII).

### I.5 Content lifecycle + auto-compaction

Skill raz invokowany staje sie **jedna wiadomoscia w konwersacji** i zostaje przez reszte sesji - Claude Code nie re-reads na kolejnych turnach [R1.C9, CRITIC 2.5].

Auto-compaction pattern:
- Przenosi aktywne skille forward w limicie tokenow
- Po compaction: re-attach **most recent invocation of each skill, keeping first 5,000 tokens**
- Total re-attached skills share **25,000 tokens combined budget**
- Starsze skille w chainie moga zostac DROPPED entirely

**Implikacja dla chainu:** chain dluzszy niz ~16 skilli (25k / 1500 per body) po compaction traci najstarsze kroki. Rekomendacja: chain depth max 3-5 skilli [R4.C17, R7.C12].

### I.5a Glebokie spojrzenie na compaction mechanics

Auto-compaction jest **niewidzialnym limiterm** dla dluzszych sesji. Mechanika zarysowana wyzej daje dyrektywne konsekwencje dla designu skilli:

**Konsekwencja 1: reference content > task content przy long-running**. Skille typu "style guide" (conventions, patterns, domain knowledge) maja pokonac granice compaction bo Claude widzi ich body ponownie. Skille typu "task" (deploy, commit) moga byc porzucone - Claude i tak re-invokuje je manualnie gdy trzeba. Konkretny test: jesli dodanie twojego skilla zmienia **systemowe zachowanie** (style, convention) przez sesje - to **reference**. Jesli dodanie twojego skilla **wykonuje akcje** (commit code) - to **task**.

**Konsekwencja 2: skille o duzym body** (powyzej 5k tokenow) sa **strukturalnie niebezpieczne**. Po compaction tylko pierwsze 5k tokenow wraca - reszta przepada. Jesli logika skilla wymaga punktu na linii 200 (wkroczyl za cap), skill po compaction **silently fails** bo Claude widzi tylko pierwsza polowe. Rekomendacja: SKILL.md body <= 4k tokenow (z marginesem bezpieczenstwa pod 5k).

**Konsekwencja 3: combined budget 25k** ogranicza effective liczbe **aktywnie re-attachowanych** skilli do max 5 (przy 5k kazdy). Jesli konwersacja aktywowala 7 skilli przed compaction, starsze 2 **nie wracaja**. Dla Maciejowego /deep-research-v2 z 17 agentami = wielokrotna compaction po drodze, co oznacza ze **wczesne researchery (R1-R5)** moga byc dropowane zanim dojdzie do syntezy.

**Praktyczny workaround**: persist critical state do filesystem. Po R1-R5 zapisuje extrakty do `extracts/E1-E5.json` (co faktycznie robi Deep Research v2 - kazdy extract pozostaje na dysku i nie zalezy od session memory).

### I.6 File anatomy

Struktura katalogu skilla [R1.C4, R7 section 2.2]:

```
my-skill/
  SKILL.md              # Required, frontmatter + body
  reference.md          # Optional, loaded on-demand
  examples.md           # Optional
  template.md           # Optional template for Claude
  examples/
    sample.md
  scripts/
    helper.py           # Executed via bash, output only in context
```

**Krytyczny path rule** [R1.C25]: najczestszy blad to **nesting jednego poziomu za gleboko**. Prawidlowe: `~/.claude/skills/skill-name/SKILL.md`. Nieprawidlowe: `~/.claude/skills/skill-name/folder/SKILL.md`.

Premium pattern (Frontend Design, Remotion) to **SKILL.md jako index** (~1500 tokens) + knowledge roztargniona po `references/` i `scripts/` loadowanych on-demand przez Read [R7.C2].

---

## Part II: Frontmatter DNA - 13 pol i pulapki

### II.1 Pelna tabela pol

Z oficjalnej dokumentacji, 13 pol YAML [R1.C6, R2.C1]:

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `name` | string | No | Display name; default = directory name |
| `description` | string | Recommended | What skill does + when to use |
| `when_to_use` | string | No | Extra trigger context; appended to description |
| `argument-hint` | string | No | Autocomplete placeholder |
| `disable-model-invocation` | bool | No | Block auto + Skill tool |
| `user-invocable` | bool | No | Hide from / menu (default true) |
| `allowed-tools` | string/list | No | Pre-approved tools |
| `model` | string | No | Per-skill model override |
| `effort` | enum | No | low / medium / high / xhigh / max |
| `context` | string | No | `fork` only supported |
| `agent` | string | No | Subagent type (with context:fork) |
| `hooks` | object | No | Skill-scoped hooks |
| `paths` | list | No | Glob patterns for auto-load |
| `shell` | string | No | `bash` (default) / `powershell` |

### II.2 Walidacja Agent Skills API

Twarde reguly z API spec [R1.C7, R2.C2]:
- **name**: max 64 chars, `[a-z0-9-]` only (lowercase, digits, hyphens), brak XML tags, **reserved words** `anthropic` i `claude` **forbidden**
- **description**: max 1024 chars per field, non-empty, brak XML tags
- Unicode allowed (w tym emoji, ale emoji **discouraged** bo psuje retrieval relevance)

**Dwa caps conflict [CRITIC 2.2]:** API enforces 1024/field; Claude Code truncates **combined description+when_to_use** do 1536 chars w skill listing. Oba limity dzialaja rownoczesnie na roznych warstwach. Rekomendacja: description <=1024 + combined <=1400 (safety margin).

### II.3 Invocation control: dual mechanism

Dwa pola kontroluja dostepnosc [R1.C11, R1.C12, R2.C6, R2.C7]:

| Combo | Path A (auto) | Path B (manual) | Path C (Skill tool) | Description in context |
|-------|---------------|-----------------|---------------------|------------------------|
| default | yes | yes | yes | yes |
| `disable-model-invocation: true` | **no** | yes | **no** | **no** (token savings) |
| `user-invocable: false` | yes | **no** | yes | yes |
| both | **no** | **no** | **no** | **no** |

**Zombie skill state [CRITIC 2.4]:** kombinacja `disable-model-invocation: true` + `user-invocable: false` czyni skill **unreachable przez zadna sciezke**. Foot-gun - linter powinien ostrzegac. Nie znaleziono legitymizowanego use case.

### II.4 context:fork + agent - delegation mechanism

Kluczowa dla subagent patternow [R1.C16, R2.C11]:
```yaml
context: fork
agent: Explore    # lub Plan, general-purpose, custom agent type
allowed-tools: Bash(gh *)
```

Semantyka: nowy **isolated context**, subagent dostaje SKILL.md jako prompt, `agent` field okresla environment (model, tools, permissions), results summarized i zwrocone do main session.

**Krytyczne ostrzezenie docs:** "context:fork only makes sense for skills with **explicit instructions**. If your skill contains guidelines like 'use these API conventions' without a task, the subagent receives the guidelines but no actionable prompt, and returns without meaningful output."

### II.5 Bug #17283 - systemowa wada

Od stycznia 2026 aktywny bug [R2.C13, R3.C10, R4.C9, R6.C16, CRITIC 2.3]: **context:fork i agent fields sa ignorowane gdy skill jest invokowany przez Skill tool** (path C). Skill uruchamia sie w caller's context zamiast w forked isolation.

**Impact:**
- Fan-Out/Merge chain pattern [R4.C4] silently breaks (brak izolacji = wspoldzielony pamieciowo chaos)
- Parallel researchers w Maciejowej architekturze /deep-research-v2 - jesli implementowane przez Skill tool, pracuja w shared context
- Workaround: **uzywaj slash invocation** (path B) lub `skills:` preload field w subagent definition, zamiast Skill tool call

**Status:** open bug w anthropics/claude-code. Do fix, avoid programmatic fork.

### II.6 paths field - auto-load na glob match

`paths: ['src/**/*.ts', 'lib/**/*.ts']` - skill auto-loaduje **tylko gdy Claude edytuje pasujace pliki** [R2.C15]. Dla language-specific skilli (TypeScript conventions, Rust safety patterns) to naturalny trigger.

**Niejasne [R3.GAP2]:** czy paths filter wplywa na description listing w Path A? Tzn. czy skill z paths jest ukryty w auto-invocation gdy nie edytujesz matching files? Wymaga eksperymentu.

### II.7 hooks, shell, effort - mniej uzywane

- `hooks` object: scoped hooks dla pojedynczego skilla (zdarzenia tool-use, edit, pre/post). Szczegoly w `/en/hooks` docs.
- `shell: powershell` - Windows-only.
- `effort`: override session-level effort dla skilla; top premium (Frontend Design) uzywaja `effort: high`.

### II.8 Model field - per-skill routing

`model: claude-opus-4-5` override sessyjny [R2.C9, R5.C8, R5.C13]. Standardowy pattern w multi-agent orchestracji:
- Orchestrator: Opus (koordynacja, reasoning)
- Researchers: Sonnet (execution)
- Extractors: Haiku (structured parsing)
- Critic / Synthesizer: Opus (quality gates)

Maciejowa architektura Deep Research v2 uzywa dokladnie tego routingu [R5.C13].

### II.8a Model field - decision framework

Wybor modelu per skill to **najwiekszy pojedynczy driver cost** w architekturze multi-agent. Zamiast heurystycznego "use Sonnet as default", rozwazaj 4 wymiary:

**Wymiar 1: Task complexity**
- Extraction, classification, parsing z jasnym schema -> Haiku
- Research with reasoning, multi-step synthesis -> Sonnet
- Orchestration decisions, quality judgments, creative synthesis -> Opus

**Wymiar 2: Output length / tokenow output**
- Short structured output (JSON, list) -> Haiku wystarcza
- Medium narrative (1-2k tokenow) -> Sonnet
- Long reasoning (5k+ tokenow, multiple sections) -> Opus justified

**Wymiar 3: Iterative refinement**
- One-shot -> nizszy model ok
- Multi-turn correction -> wyzszy model (lepiej zrobi dobrze za pierwszym)

**Wymiar 4: Criticality**
- Disposable extracts -> Haiku (jeden blad nie kosztuje duzo)
- Synthesis / decision wrzedowych -> Opus (blad kosztuje duzo re-work)

Maciejowa architektura Deep Research v2 trafnie mapuje:
- Extractors (Haiku): krotkie JSON z claims - wymiar 1/2 niski, disposable
- Researchers (Sonnet): multi-step research z reasoning - wymiar 1 medium
- Orchestrator / Critic / Syntetyk (Opus): quality decisions - wymiar 1/4 high

### II.8b Effort field - rzadka ale potezna

`effort: high` (lub xhigh, max) najczesciej pomijane przy projektowaniu skilli. Kiedy opłaca się podniesc effort:
- Skille syntezujace (Critic, Syntetyk) - reasoning depth sie oplaca
- Skille design (Frontend Design uzywa high)
- Pierwsze uzycie w chainie gdzie kolejne kroki zaleza od quality

Effort override jest **session-level propagating** - jesli skill A ma `effort: high` i invokuje skill B bez effort, B dziedziczy high z sesji. Uwaga na koszt kaskady.

### II.9 SDK differences

Claude Agent SDK vs Claude Code roznice [R2.C20, R3.C12]:
- **SDK NIE wspiera** `allowed-tools` field
- **SDK NIE ma** path B (slash commands to Claude Code UI feature)
- SDK wspiera path A (auto) i path C (programmatic) z cala semantyka frontmatter

Implikacja: skille projektowane z myslac o SDK interop powinny miec **minimalny frontmatter** (name, description, body) i unikac Claude Code-specific features.

---

## Part III: Invocation - trzy sciezki i jak je wybrac

### III.1 Trzy paths + mechanism

Claude Code wspiera [R1.C10, R3.C1]:

**Path A - Automatic description-match:**
Claude sam decyduje na bazie description. Mechanism **pure LLM forward pass** [R3.C2] - brak regex, brak keyword matching, brak scoring exposed userowi. Reliability zalezy od **trigger-rich keywords** w description [R3.C3].

**Path B - Manual slash `/skill-name`:**
User wpisuje. Deterministyczne. Wspiera argument passing przez $ARGUMENTS substitution. Blokada: `user-invocable: false`.

**Path C - Skill tool (programmatic):**
Agenty / inne skille wywoluja. Permission rules w settings kontroluja dostep. Blokada: `Skill(name)` w deny lub `disable-model-invocation: true`.

### III.2 Path A reliability

Auto-invocation dziala niezawodnie tylko dla **trigger-rich descriptions** [R7.C7, R7.C8]. Anti-pattern:
```yaml
description: Helps with coding tasks      # 26 char, zero keywords, nigdy auto-triggers
```
Patron premium (Remotion):
```yaml
description: |
  Best practices for programmatic video generation with React components.
  Handles animation timing, audio synchronization, captions, 3D rendering.
  Use when generating or modifying Remotion compositions, rendering pipelines,
  or React-based video workflows.
```
Trzy warstwy: domain keywords (video, React, Remotion) + handles (animation, timing, audio, 3D) + use cases (when generating/modifying).

### III.3 Argument passing differences

| Path | Supports args? | Mechanism |
|------|----------------|-----------|
| A (auto) | No (Claude generates call without user args) | N/A |
| B (manual) | Yes | `$ARGUMENTS` (full string), `$0`/`$1` (positional) |
| C (Skill tool) | Yes | Skill tool input schema |

Argument substitutions [R1.C14]: `$ARGUMENTS` = caly string, `$N` = shorthand dla `$ARGUMENTS[N]`, `${CLAUDE_SESSION_ID}` + `${CLAUDE_SKILL_DIR}` jako environment variables.

### III.4 Permission rules - syntax i scope

Dla Path C [R1.C13, R3.C7]:
```
Skill                    # deny all skills via Skill tool
Skill(commit)            # exact match
Skill(review-pr *)       # prefix match
Skill(deploy *)          # w deny: blokuje konkretny prefix
```

Rules applicable w allow i deny sets w settings (managed, user, project poziomy).

### III.5 Built-in commands via Skill tool

Ograniczone do trzech [R1.C24, R3.C13]: `/init`, `/review`, `/security-review`. Inne built-ins (np. `/compact`) **niedostepne** programmatically - user-only. To blokuje automated context management dla chainow dlugoterminowych [R3.CONFLICT2].

### III.6 Live change detection

Claude Code watcher **reaguje na add/edit/remove** w `~/.claude/skills/`, `.claude/skills/`, `.claude/skills/` w `--add-dir` directorach - zmiany reflect w kolejnej inwokacji tej samej sesji [R1.C17, R3.C11]. Jedyny wyjatek: **tworzenie top-level skills directory ktory nie istnial na starcie** wymaga restartu.

Dla monorepo nested discovery [R1.C18]: edytujesz `packages/frontend/foo.ts` -> Claude szuka takze w `packages/frontend/.claude/skills/`. Sygnal: skille mozna lokalizowac gdzie potrzebne, Claude ich znajdzie przy editing patterns.

### III.6a Description engineering - techniki pisania

Rzeczywista zdolnosc auto-invocation to efekt **description engineering**. Kilka wypracowanych przez community technik:

**Technika A: Three-layer structure**
Layer 1: Domain keywords (co to jest) - 3-5 unique words
Layer 2: Capabilities (co robi) - verb + noun phrases
Layer 3: Triggers (kiedy) - "Use when..." with specific conditions

**Technika B: Negative triggers**
"Use when X, but NOT when Y" - pomaga Claude zdecydowac miedzy nakladajacymi sie skillami. Przyklad z community:
```yaml
description: |
  Rust safety audit with CodeQL patterns.
  Use when reviewing Rust code for memory safety, concurrency issues.
  NOT for general code quality (use /code-review for that).
```

**Technika C: Exact tool names w description**
Wspominanie nazw tooli/frameworkow zwieksza trigger reliability:
- "React components" (nie "frontend components")
- "Next.js app router" (nie "web framework")
- "Remotion compositions" (nie "video code")

**Technika D: Avoid weasel words**
"helps with", "assists in", "can do" - nie triggeruja niczego. Zamiast: "generates", "analyzes", "audits", "refactors".

**Techniki empirycznie weryfikowane**: gdy uzytkownik opisuje zadanie dokladnymi slowami uzytymi w description, auto-invocation reliability skacze z <50% do >90%. Dla Maciejowych 35 skilli to oznacza zeby keywords w descriptions odzwierciedlaly jezyk w ktorym Maciej pisze prompty.

### III.7 Task vs Reference skill - invocation design

Decyzja invocation depends on **skill content type** [R1.C13, CRITIC 2.6]:

| Type | Content | Best path | Why |
|------|---------|-----------|-----|
| Reference | Conventions, style guides, domain knowledge | Path A (auto) | Runs inline, contributes context |
| Task | Deploy, commit, code-gen | Path B (manual) + `disable-model-invocation: true` | Side effects require user intent |
| Hybrid | Frontend Design (aesthetic commitment + execution) | Path A + enforced commitment | Auto-discovery + guardrails |

Commitment hybrid (Part VII) to najsilniejszy pattern 2026.

---

## Part IV: Chaining - jak skille wspolpracuja

### IV.1 Fundamental mechanism

**Skills don't call each other directly.** Claude mediuje wszystkie chainy [R4.C1]. Brak "skill-to-skill API" - gdy skill A wymaga skill B, Claude po zakonczeniu A decyduje o invocation B na bazie konwersacji.

**Implikacja:** I/O contract miedzy skillami to **text przez konwersacje** [R4.C10]. Brak schema enforcement. Dla dlugich chainow kruchy - musisz zaprojektowac eksplicite output format w skill A zeby skill B go poprawnie odczytal.

### IV.2 Cztery canonical patterns

[R4.C2, R4.C3, R4.C5, R4.C6]

**Pattern 1: Sequential (A -> B -> C)**
- Cashandcache competitive-intel 4-stage: gather -> extract -> analyze -> report
- Claude maintains state w konwersacji miedzy skillami
- Cost: N * (metadata + body)

**Pattern 2: Fan-Out/Merge (A -> [B, C, D] -> merge)**
- Parallel via `context: fork` subagents
- Results wracaja do main, Claude synthesizes
- Cost: N * (subagent startup ~2k + skill body)
- **BLOCKED by bug #17283** gdy wywolane via Skill tool (shared context zamiast forked)

**Pattern 3: Conditional Routing (A decides -> B lub C)**
- Orchestrator skill z explicit decision logic: "if task is simple use skill-S, else use skill-L"
- Pattern opiera sie na Claude reasoning, nie code branching
- Maciejowy PRESET_CATALOG.md routing system to przyklad

**Pattern 4: Iterative Loop (A until condition)**
- Claude invokes skill repeatedly az do spelnienia warunku
- Use cases: refactor-until-tests-pass, generate-until-lint-clean
- Each invocation re-reads skill body; post-compaction 5k cap is constraint

### IV.3 Swarm Orchestration alternative

Advanced alternative dla massively-parallel [R4.C7]. Uzywa TeammateTool + Task system + ~/.claude/teams/ config, bypassing Claude-mediated chain z explicit team definitions.

Kiedy: 10+ parallel agents, strukturalne map-reduce, workflow dluzszy niz 30+ minut. Overhead: konfiguracja teams + Task tool availability.

Maciejowa /deep-research-v2 preset z 17 agentami to kandydat na Swarm (obecnie uzywa orchestrator + manual sequencing z powodu braku Task tool w srodowisku Claude Agent SDK).

### IV.4 Anthropic official chain examples

[R4.C8]
- `commit-commands`: stage -> diff-analyze -> message-draft -> commit
- `code-review`: lint -> static-analysis -> summary

Premium chainy sa **sequentiallne**, nie fan-out. Fan-out to rzadkosc oficjalnie, czesciowo przez bug #17283.

### IV.5 Chain depth - rekomendacja

**Max 3-5 skilli w chainie** [R4.C17, R7.C12, CRITIC 2.5]. Powody:
- Post-compaction 5k cap per skill re-attach -> starsze skille drop
- Token cost nonlinearny: N * (~100 metadata + ~1500 body + reasoning)
- Dla 5 skilli: ~8k + reasoning; dla 10 skilli: ~16k + reasoning -> compaction ryzyko

**Deeper workflows** wymagaja jedno z:
- Swarm Orchestration (R4.C7)
- Persist critical state do filesystem (Hook + Skill hybryda)
- Re-invoke skill po compaction jako manual checkpoint

### IV.6 Cross-paradigm chain

Skill -> MCP tool jest natywnie wspierany [R4.C13] przez `allowed-tools` field. Przyklad:
```yaml
allowed-tools: mcp-jira__get-issue mcp-github__create-pr
```
Skill invokuje MCP dla external data (Jira, GitHub), przetwarza inline, decyduje o nastepnym kroku. Nie mylic z chainem skill -> skill.

### IV.7 Recursion hazard

Skill A -> Skill B -> Skill A: **platform nie prevents** [R4.C12]. Brak depth limit w docs. Ryzyko runaway invocation jesli Claude reasoning zawiedzie termination. Community anti-pattern; dodaj **termination condition** w orchestrator skill body.

### IV.7a State passing - trzy poziomy abstrakcji

Miedzy skillami w chainie stan przekazywany jest na trzech poziomach:

**Poziom 1: Conversation text (default)**
Skill A produkuje output w text, Claude reformuluje jako input dla Skill B. Prosty, brak schema, brak wersjonowania. Kruchy przy dlugich chainach.

**Poziom 2: Filesystem artifacts**
Skill A zapisuje do pliku (extracts/E1.json, research/R1.md). Skill B read's plik. Persistuje przez compaction. Dlatego Maciejowa architektura research/extracts/plans/NbLM dziala niezaleznie od session memory.

**Poziom 3: MCP shared state**
MCP server trzyma state (np. Notion doc, Jira issue). Skille wszystkie pytaja MCP. Maksymalny persistence + multi-session coherence, ale zalezy od external infrastructure.

Dla chainu >3 skilli - **poziom 2 obowiazkowy** (artifact persistence). Poziom 1 wystarcza dla 2-skillowych sequencji gdzie Claude trzyma state w konwersacji.

### IV.8 Maciej w kontekscie chainu

35 skills = agent definitions (individual roles) [R4.C20]. 42 commands = orchestrator-skills ktore invokuja 3-15 sub-skills w preset order. Architekturalnie **orchestrator-skill pattern na command layer + agent-skill pattern na skill layer**. Claude Code 2.1+ merge komend/skilli validuje ten design - kazdy orchestrator to de facto user-invocable skill.

---

## Part V: Tier Decision - MCP / Skills / Subagents / Hooks

### V.1 4-tier hierarchy

Cztery niezalezne mechanizmy rozszerzania Claude Code [R5.C1, R5.C2]:

| Tier | Rola | Key field | When |
|------|------|-----------|------|
| MCP | External tools/data | Server config | Need API, DB, external service |
| Skills | Reusable instruction patterns | SKILL.md frontmatter | Need repeatable prompt logic |
| Subagents | Isolated task execution | ~/.claude/agents/ | Need context isolation |
| Hooks | Lifecycle triggers | ~/.claude/hooks/ | Need event-driven automation |

**Sa komplementarne, nie konkurencyjne.** MCP nie zastepuje Skills i odwrotnie.

### V.2 Decision tree

Sequencja pytan przy wyborze tiera [R5.C3]:
1. **Potrzebujesz external state / API?** -> **MCP** (data layer)
2. **Reusable prompt logic ktorej chcesz uzyc w 5+ kontekstach?** -> **Skill**
3. **Potrzebujesz izolacji kontekstu (niezalezna pamiec, osobny model)?** -> **Subagent** (bezposrednio lub via skill z context:fork)
4. **Potrzebujesz automation na lifecycle event (pre-commit, post-edit)?** -> **Hook**

Mozna kombinowac - patrz overlap zones.

### V.3 Overlap zones i hybrydy

[R5.C4, R5.C5, R5.C6]

**Skill + Hook:** pre-commit quality check - Hook triggers, Skill provides logic. Hybrid gdy potrzebujesz **OS-level event** + **LLM reasoning**.

**Skill + Subagent:** skill z `context: fork` + `agent:` field. Skill dostarcza prompt, subagent zapewnia environment. Blur the line, ale architektonicznie **skill ze subagent-delegation** nie promocja do tier Subagent [CRITIC 2.7].

**Skill + MCP:** skill z `allowed-tools: [mcp-server__tool]` bundles MCP invocation. Skill to workflow wrapping MCP data layer.

### V.4 Token economics

Przyblizone koszty per 100 inwokacji [R5.C7]:

| Tier | Model | Cost estimate |
|------|-------|---------------|
| Skills | Haiku | ~$4.80 |
| Skills | Sonnet | ~$18 |
| Skills | Opus | ~$90 |
| + Subagent | - | +$2 per invocation (fork overhead ~2k tokens) |
| + MCP call | - | API fees (external, not tokens) |

**Derived, not measured** - flag w CRITIC.md. Uzywaj jako order-of-magnitude, nie precision cost.

### V.5 Model routing - per-skill optymalizacja

`model:` field w skill frontmatter daje per-skill cost optimization [R5.C8, R5.C13]:
- **Haiku**: extractors (JSON parsing), simple classifications
- **Sonnet**: default researcher, most skill execution
- **Opus**: orchestrator, critic, synthesizer

Maciejowa architektura /deep-research-v2 dokladnie implementuje: Orch Opus, Researchers Sonnet, Extractors Haiku, Critic + Syntetyk Opus. Flagi `--premium/--budget/--ultra-budget` override per session.

### V.6 Commands w tier hierarchy

Custom commands **nie sa osobnym tiem** [R5.C11] - w Claude Code 2.1+ to UX-level abstraction (slash-invocable skill). W 4-tier hierarchy commands = user-invocable skills.

### V.7 Anti-patterns w tier selection

[R5.C15, R5.C16]
- **MCP gdy skill wystarcza**: wrapping text transformation jako MCP server dodaje I/O overhead + deployment complexity. Skill wystarcza.
- **Subagent dla simple lookups**: `context: fork` ma startup cost ~2k tokens. Nie oplaca sie dla 1-shot queries.
- **Hook dla LLM reasoning**: Hooks dzialaja OUTSIDE Claude reasoning. Nie mozna zrobic "Hook ktory sprawdza czy kod jest czysty" - to jest zadanie Skilla.

### V.8 "Full-stack agent architecture"

Najbardziej rozwinięty pattern laczy wszystkie 4 [R5.C20]:
1. **Hook** triggers (np. pre-commit)
2. **Skill** orchestrator decyduje action
3. **Subagent** wykonuje isolated task
4. **MCP** dostarcza external data (API calls)

Complexity hit. Uzywac gdy workflow wymaga wszystkich 4; nie forsowac dla prostych use cases.

### V.8a Przyklad "full-stack" workflow

Aby zrozumiec praktyczna zlozonosc all-4-tier workflow, nasz przyklad: automated security review na kazdy PR.

**Tier 1 - Hook (trigger):**
```
event: pre-commit
action: trigger /security-review-auto
```
Hook wykonuje sie przy probie commita; nie obsluguje logiki, tylko triggers skill.

**Tier 2 - Skill (orchestrator):**
```yaml
name: security-review-auto
description: Runs security audit on current diff using CodeQL + LLM analysis.
model: opus
context: fork
agent: Plan
```
Orchestrator-skill decyduje kolejnosc: (a) MCP call dla diff, (b) CodeQL analyze via subagent, (c) Claude LLM analyze, (d) synthesis.

**Tier 3 - Subagent (isolated execution):**
`agent: Plan` daje izolowana pamiec. Subagent nie widzi glownej sesji - tylko prompt + skill body. Kompartmentalizacja ogranicza blad kaskadowy.

**Tier 4 - MCP (external tools):**
```
allowed-tools: mcp-github__get-diff mcp-codeql__run-query
```
MCP dostarcza diff i CodeQL output. Skill processuje output.

**Efekt koncowy**: developer robi git commit -> automatic security audit za 30s -> ewentualnie blocking comment w PR + auto-review summary. Nie wykonywalne jedym tie (skill) - wymaga 4-tier kolaboracji.

### V.8b Kiedy nie warto full-stack

Nie kazdy workflow potrzebuje 4 tierow. Prosty heurystyka:
- **1 tier (Skill only)**: ksztaltowanie odpowiedzi, re-use template (80% use cases)
- **2 tier (Skill + MCP)**: skill potrzebuje external data (15%)
- **3 tier (+ Subagent)**: context isolation + model override (4%)
- **4 tier (+ Hook)**: automation na event (1%)

Dla Maciejowego systemu 35 skills + 42 commands - prawie wszystko 1-tier. Potencjalne upgrade candidates: `/deep-research-v2` (4-tier candidate jesli dodasz Hook trigger + MCP dla real-time data).

### V.9 Maciejowa mapa

35 skills = tier **Skills** (agent definitions) [R5.C12]. 42 commands = tier **Skills** (orchestrator skills). Maciej nie uzywa tier Subagents / Hooks / MCP w obecnym v32.16 setup. Potencjal rozszerzen:
- **MCP**: integracja z Notion / GitHub dla agent data sync
- **Hooks**: auto-run `/deep-research-v2` na keyword w commit messages
- **Subagents**: explicit ~/.claude/agents/ dla top-used roles (zamiast skill-with-fork)

---

## Part VI: Plugin Ecosystem - dystrybucja, marketplace, premium DNA

### VI.1 Plugin jako distribution container

Plugin bundluje wszystko razem [R6.C1]:
```
my-plugin/
  .claude-plugin/
    plugin.json
    marketplace.json      # opcjonalnie
  skills/<name>/SKILL.md
  agents/<name>.md
  commands/<name>.md
  mcp/server.json
  hooks/pre-commit.sh
```

Standalone skill = tylko SKILL.md. Plugin = atomic unit z wersjonowaniem + dystrybucja.

### VI.2 Namespacing

Format per zasob [R6.C2]:
- Skill: `plugin-name:skill-name` (np. `vercel:deploy`)
- Agent: `@plugin-name:agent-name` (np. `@team-conventions:migration-agent`)
- Command: `/plugin-name:cmd-name` (np. `/commit-commands:commit`)

**Permission rules** sa first-class: `Skill(vercel:deploy)`, `Skill(netlify:*)`.

### VI.3 Marketplace levels

Trzy poziomy [R6.C4]:
1. **Official Anthropic marketplace** (`claude-plugins-official`): auto-available po starcie. Highest trust. Zawiera `commit-commands`, `code-review`, `merge-assistant`.
2. **Public third-party** (claudemarketplaces.com, skillsmp.com): submit via PR do marketplace.json.
3. **Custom self-hosted**: `extraKnownMarketplaces` w settings.json. Akceptuje GitHub repos, Git URLs, local paths, remote URLs [R6.C5].

### VI.3a Anatomia plugin.json - detaliczna

Minimalny plik wymaga 4 pol:
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Short plugin description",
  "author": "Maciej Palczewski"
}
```

Rozszerzony (obserwowane w ekosystemie 2026):
```json
{
  "name": "agent-architecture",
  "version": "1.2.0",
  "description": "35 agents, 42 presets for multi-agent orchestration",
  "author": "Maciej Palczewski",
  "license": "MIT",
  "repository": "https://github.com/user/agent-architecture",
  "homepage": "https://agent-architecture.com",
  "keywords": ["multi-agent", "orchestration", "bilingual"],
  "skills": ["skills/researcher", "skills/synthesizer"],
  "agents": ["agents/orchestrator.md"],
  "commands": ["commands/deep-research-v2.md"],
  "mcp": { "server": "./mcp/server.json" },
  "hooks": {
    "pre-commit": "./hooks/pre-commit.sh",
    "post-invoke": "./hooks/log-invocation.sh"
  },
  "dependencies": {
    "anthropic-code-tools": ">=2.1.0",
    "@trailofbits/skills-curated": "^1.0.0"
  },
  "peerDependencies": {
    "mcp-atlassian": "^2.0.0"
  }
}
```

**Dependencies vs peerDependencies:**
- `dependencies` - plugin instaluje te wraz z soba
- `peerDependencies` - uzytkownik musi sam zainstalowac te MCP servery/inne pluginy

**Nie-oficjalne pola** (community convention, ignorowane przez parser):
- `keywords` - SEO dla marketplace search
- `homepage` - link do dokumentacji
- `funding` - support link (podobnie jak npm)

### VI.4 Installation + updates

```bash
/plugin install commit-commands@anthropics-claude-code
/reload-plugins           # aktywacja po instalacji
/plugin update plugin-name  # pull latest
```

`plugin.json: version` semver to source of truth [R6.C6]. Update semantyka mid-session **niejasna** [R6.GAP1] - unikaj update w trakcie dlugiej sesji.

### VI.5 Ekosystem 2026 - top marketplaces

| Repo | Skala | Specyfika |
|------|-------|-----------|
| sickn33/antigravity-awesome-skills | 33k+ stars, 1,410+ skills | Multi-agent (Claude+Cursor+Codex+Gemini), installer CLI |
| travisvn/awesome-claude-skills | 22k+ installs | Curated best-of |
| VoltAgent/awesome-agent-skills | 1000+ skills | Vendor-backed (Anthropic, Google, Vercel, Stripe, Cloudflare, Netlify, Trail of Bits, Sentry, Expo, HuggingFace, Figma, Remotion) |
| jeremylongshore/claude-code-plugins-plus-skills | 340 plugins + 1367 skills | CCPI package manager |
| hesreallyhim/awesome-claude-code | - | Canonical awesome-list |
| trailofbits/skills-curated | - | Security-focused vetted |
| ComposioHQ/awesome-claude-skills | - | Productivity cross-claude |
| alirezarezvani/claude-skills | 232+ | Multi-agent |

**Fragmentacja [R6.C19]**: brak kanonu, 7+ awesome-lists, 3+ package managers. Do H2 2026 spodziewana konsolidacja wokol Anthropic official.

### VI.6 Premium skilla DNA

Piec wspolnych cech [R6.C10, R7.C2]:

1. **Vendor ownership** - Remotion team robi Remotion skill, Anthropic robi Frontend Design
2. **Frontmatter discipline** - trigger-rich description (200-500 char, keywords + use cases)
3. **Multi-file resources** - SKILL.md jako index + `references/` + `scripts/` loadowane on-demand
4. **Commitment-before-generation** - wymuszone decyzje PRZED kodem (kluczowe, patrz Part VII)
5. **Security audit** - signed (Remotion via Agent Trust Hub + Socket), community-vetted (Trail of Bits skills-curated)

### VI.7 Flagowce premium

**Frontend Design (Anthropic official)** [R6.C11]:
- 277k+ installs
- Ban list: Inter, Roboto, Arial, Space Grotesk
- Wymusza commit do specific direction (brutalist / maximalist / retro / editorial)
- Struktura: SKILL.md + `references/font-pairings.md` + `color-systems.md` + `motion-principles.md` + `brutalism-guide.md` + ...

**Remotion (vendor)** [R6.C12]:
- 117k+ weekly installs
- Signed audit (Agent Trust Hub + Socket)
- Domain-specific reference (animations, timing, audio, captions, 3D)
- ~30-50 plikow w resources, per-topic

**Trail of Bits Security (vendor)** [R6.C13]:
- `trailofbits/skills` + `trailofbits/skills-curated`
- CodeQL + Semgrep integration + variant analysis + audit methodologies
- Bundled z MCP servers dla security tools (przypadek gdzie plugin > standalone)

### VI.8 Standalone vs Plugin - trade-off

| Factor | Standalone | Plugin |
|--------|-----------|--------|
| Overhead | Zero | plugin.json + .claude-plugin/ structure |
| Versioning | None | Semver w plugin.json |
| Dystrybucja | Manual clone | /plugin install |
| Namespace | Global (scope priority) | plugin-name:skill-name |
| Bundle MCP/hooks | Nie | Tak |
| Dla public | Nie skaluje | Cel |
| Dla private | Idealny | Overkill |

**Maciej**: 35 skills + 42 commands w `~/.claude/skills/` i `~/.claude/commands/` = **standalone** (private use, zero narzutu) [R6.C15]. Plugin-izacja uzasadniona **tylko jesli publish**.

### VI.8a Migracja standalone -> plugin - szczegolowy roadmap

Gdy (nie jesli) Maciej zdecyduje sie opublikowac system jako plugin, nastepujacy process minimalizuje breaking changes:

**Faza 1: Preparation (1-2h)**
1. Backup `~/.claude/skills/` i `~/.claude/commands/` do git repo
2. Utworzyc `~/plugins/agent-architecture/` jako development directory
3. Przeniesc skille: `cp -r ~/.claude/skills/* ~/plugins/agent-architecture/skills/`
4. Dodac `.claude-plugin/plugin.json` z initial `1.0.0-beta` version

**Faza 2: Namespace update (2-3h)**
42 komendy referuja skille po nazwie bez namespace. Po plugin-izacji nazwy zmieniaja sie na `agent-architecture:skill-name`. Mechaniczne:
```bash
cd ~/plugins/agent-architecture/commands/
sed -i 's/skill: res_docs/skill: agent-architecture:res_docs/g' *.md
# powtorzyc dla 35 skill names
```

**Faza 3: Test in isolated env (1-2h)**
```bash
cp -r ~/plugins/agent-architecture/ /tmp/test-plugin/
cd /tmp/test-plugin && claude code
# Verify auto-invocation still works
# Verify 42 commands resolve correctly
```

**Faza 4: Marketplace submit (1h)**
Opcje:
- **Self-hosted**: dodac GitHub repo do `extraKnownMarketplaces` + `/plugin install agent-architecture@<your-github>/agent-architecture`
- **Public**: PR do anthropics/claude-code official marketplace (dluga kolejka) lub submit do claudemarketplaces.com
- **awesome-lists**: PR do hesreallyhim/awesome-claude-code dla exposure

**Faza 5: Preserve backward compat (1-2h)**
Jesli chcesz zeby stare `.claude/skills/` + `.claude/commands/` dalej dzialaly u innych userow:
- Utworz migration script `install-from-plugin.sh` ktory kopiuje plugin skills do user standalone
- Dokumentuj oba path w README

**Total effort**: ~8h dla doswiadczonego usera. Breaking changes dla innych konsumentow: namespace prefix dla manual invocation (uzytkownicy musza `/agent-architecture:skill` zamiast `/skill`).

**Risk**: zalamanie compatibility jesli Claude Code plugin parser zmienia schema miedzy wersjami. Mitigation: pin `dependencies.anthropic-code-tools: ">=2.1.0 <3.0.0"`.

### VI.9 Supply chain risk

Official Anthropic marketplace **presumed to have cryptographic signing** (not publicly documented) [R6.C18, CRITIC 3.3]. Third-party marketplaces lack signing. Trail of Bits skills-curated proboje rozwiazac problem via community vetting, ale to nie platform-level solution.

**Enterprise adoption** bloker: do wyjasnienia signing/provenance story recommend ograniczyc do official marketplace dla sensitive workloads.

### VI.10 Cross-agent compatibility

Trend 2026 [R6.C20]: sickn33, VoltAgent, alirezarezvani pisza skille z frontmatterem kompatybilnym z Claude Code + Cursor + Codex CLI + Gemini CLI. Agent Skills open standard (agentskills.io) formalizuje - Claude Code-specific extensions (invocation control, subagents, dynamic injection) pozostaja poza core.

**Implikacja**: skille pisane dzis z minimalnym frontmatterem zostaja portable przez najblizsze lata.

---

## Part VII: Patterns & Anti-patterns - jakosc vs typowe pulapki

### VII.1 Top-10 consensus skills 2026

Triangulacja z 5+ list (firecrawl, composio, medium, Snyk, blockchain-council) [R7.C3]:

1. Frontend Design (Anthropic)
2. Remotion (Remotion team)
3. Trail of Bits Security
4. Agent Orchestrator / AgentSys
5. Book Factory
6. Memory Persistence
7. Structured Engineering Workflows
8. Web Extraction (Firecrawl-backed)
9. Marketing Operations
10. Document Automation

### VII.2 Categorization

Distribution w curated lists [R7.C4]:
- Engineering workflows: 43%
- Document automation: 22%
- Web + research: 18%
- Marketing / content: 12%
- Security: 5%

**Under-represented opportunity zones** [R7.C18]:
- Multi-agent orchestration architecture
- Non-English (localized) skills
- Meta-skills (skills for designing skills)

Maciej pokrywa wszystkie 3 - unikalny positioning.

### VII.3 Commitment-before-generation - HIGHEST-IMPACT pattern

Single highest-impact pattern w ekosystemie [R7.C19, R6.C11]. Skill wymusza **explicit decision PRZED outputem**, co lamie statystyczny srodek LLM.

**Bez commitmentu**: "Inter font, purple gradient, minimal animations, grid cards" = LLM default bo trenowany na statystycznym srodku [R7.C11].

**Z commitmentem (Frontend Design)**:
1. User request: "build landing page"
2. Skill activates
3. **Commitment phase**: wybierz direction (brutalist / maximalist / retro / editorial)
4. **Ban list enforcement**: odrzuca Inter/Roboto/Arial/Space Grotesk
5. **Execution**: generuje kod zgodny z commitment

Pattern replikowalny: Trail of Bits forces threat model choice przed audit. AgentSys forces task decomposition przed delegation.

### VII.4 Frontmatter discipline

Dobry description structure [R7.C7, R7.C8]:
```yaml
description: |
  [DOMAIN KEYWORDS - what this does]
  [CAPABILITIES - what it handles]
  [WHEN TO USE - specific triggers]
```
Przyklad (Remotion, R3.C3):
```
Best practices for programmatic video generation with React components.
Handles animation timing, audio synchronization, captions, 3D rendering.
Use when generating or modifying Remotion compositions, rendering pipelines,
or React-based video workflows.
```
- Domain keywords: programmatic, video, React, Remotion
- Capabilities: animation timing, audio, captions, 3D
- Triggers: generating/modifying Remotion compositions

### VII.5 Nine anti-patterns

[R7.C7 do R7.C15]

1. **Generic names** (`my-skill`, `helper`, `utility`): brak unique keywords -> auto-invocation martwa
2. **Empty description** (`Helps with coding tasks`): auto-invocation never triggers
3. **Body bloat** (>3000 tokens, no resources): przekroczony ~1500 token budget; post-compaction ejection
4. **Boolean prop proliferation** (`isCompact`, `showHeader`, `isRounded`): konfiguracja rozproszona; lepiej enum variant
5. **LLM-default capitulation** (no commitment pattern): generyczne purple/Inter/grid output
6. **Over-chaining** (>5 skills deep): nonlinear token cost; chain depth 2-3 optymalny
7. **Testing debt**: brak golden outputs; premium skills maja integration tests
8. **Context pollution** (5000+ token resources loaded upfront): degrades compaction survival
9. **Hardcoded paths** (`C:\Users\macie\`): brak cross-platform portability

### VII.6 Reddit / X / forum signal

Top 3 rady dla nowych autorow [R7.C16]:
1. **Test auto-invocation empirically** - jesli Claude nie trigger przy opisie zadania, description slaby
2. **Measure token footprint** - policz body words, nie przekraczaj ~1500
3. **Bundle MCP with plugin** gdy skill wymaga external tools

### VII.7 Authorship tiers

[R7.C5, R7.C6]

**Vendor-authored (highest trust):**
- Anthropic (Frontend Design, commit-commands, code-review)
- Vercel, Stripe, Cloudflare, Netlify (deploy/infra)
- Trail of Bits (security)
- Sentry (error tracking)
- Expo (React Native)
- HuggingFace (ML deployment)
- Figma (design-to-code)
- Remotion (video)

**Individual premium authors:**
- Jeremy Longshore (CCPI package manager)
- Travis Vann (awesome-claude-skills)
- sickn33 (antigravity installer)
- hesreallyhim (canonical awesome-claude-code)

### VII.8 Trend watch H2 2026

Predykcje low confidence [R7.C17]:
1. Konsolidacja package managerow -> Anthropic official dominuje
2. Vendor skills explosion - kazda wiodaca firma publikuje official skill
3. Signing standard - platform-level cryptographic provenance
4. Cross-agent compatibility formalized (Agent Skills standard v2)
5. Localized (non-English) skills fala - PL, DE, JP

### VII.9 Maciej positioning

Unique value props vs community [R7.C21]:
- **35 skills + 42 commands orchestrator-architecture** - rare pattern; wiekszosc buduje single skills
- **Bilingual PL/EN parity** - niche wczesny sygnal trendu 5
- **Design-first toolkit** (HTML designer + encyclopedia + regeneration scripts) - nikt inny tego nie ma
- **Routing system** (PRESET_CATALOG.md auto-match) - systematyczne rozwiazanie "ktory preset"

### VII.9a Deep dive: commitment pattern design

Pattern wart rozwiniecia bo highest-impact [R7.C19]. Jak zaprojektowac commitment-before-generation:

**Krok 1: Identifikuj decision point**
Kazdy skill generujacy content ma moment gdzie moze wybrac direction. Frontend: aesthetic style. Research: breadth vs depth. Writing: voice register (formal, casual, technical). Audit: threat model.

**Krok 2: Zamrozic wybory w skill body**
Nie pytaj uzytkownika - skill sam wymusza wybor na Claude. Przyklad:
```markdown
## Step 1: Commit to direction

Before writing anything, explicitly choose ONE of:
- BRUTALIST: raw concrete aesthetic, monospace, high contrast
- MAXIMALIST: dense composition, ornate details, rich palette
- EDITORIAL: magazine layout, serif pairs, generous whitespace
- RETRO-FUTURISTIC: 80s neon, gradient, pixel details

State your choice explicitly: "I choose [DIRECTION] because [REASON]."

Then proceed.
```

**Krok 3: Ban list dla defaultow**
```markdown
## Forbidden in output:
- Font: Inter, Roboto, Arial, Space Grotesk
- Colors: purple gradient, generic blue
- Layout: uniform grid cards
```

**Krok 4: Enforce w generation**
```markdown
After generating code, verify:
- Did you commit to direction in step 1? If not, return to step 1.
- Does your output avoid banned items? If not, regenerate.
```

**Dlaczego to dziala**: LLM nie ma intrinsic bias toward direction - ma bias toward statistical mean. Commitment + ban = filtruje statistical mean ex ante, nie ex post.

### VII.10 Rekomendacje dla Maciejowego systemu

Sposob wykorzystania research [R7 section 8, CRITIC section 8]:

1. **Audit descriptions 35 skilli** pod katem trigger richness (200-500 char z keywords + capabilities + use cases)
2. **Rozwazyc multi-file resources** - migracja SKILL.md jedno-plikowych do struktury `skill-name/SKILL.md + references/`
3. **Dodac commitment patterns** dla skilli generujacych content (ustal styl / focus / priority PRZED output)
4. **Audit chain depth** - 42 commands invokuja 3-15 sub-skills; weryfikowac czy nie przekraczaja chain-depth 5
5. **Testing layer** - dodac `tests/` directory z golden outputs nawet jako manual runbook
6. **Plugin migration** - **nie pilnie**; uzasadnione dopiero gdy publikacja jako open source

### VII.10a Benchmark-driven iteration

Gdy masz system 35+ skilli, heurystyka niewystarcza. Recommended benchmark framework:

**Metric 1: Auto-invocation hit rate**
- Test set: 50 prompts opisujacych zadania uzywajace 35 skilli
- Expected: kazde prompt powinien trafic w odpowiedni skill (known mapping)
- Measure: % promptow gdzie Claude faktycznie invokuje expected skill
- Target: >80% (premium skills osiagaja >90%)

**Metric 2: Token overhead per session**
- Baseline: session bez zadnych skilli (just Claude default)
- With skills: ta sama session z 35 skillami loaded
- Measure: difference w input tokens na startup
- Target: <4k overhead (zgodne z Anthropic eng blog ~1500 dla 40 skilli)

**Metric 3: Chain success rate**
- Test 42 commands, kazdy z typical input
- Measure: % chainow ktore ukonczyly sie bez early termination
- Target: >95%

**Metric 4: Post-compaction survival**
- Long session (>100k tokenow)
- Force compaction
- Measure: ile skilli zachowalo full content vs truncated/dropped
- Target: top-5 most-invoked skills survive

**Metric 5: Cost per task**
- Standardyzowane zadania (research, synthesis, code review)
- Measure: $ spent in tokens per task type
- Optimize: route to cheapest model that completes reliably

Framework niezbedny dla maturation systemu. Maciejowe 35 skilli nie maja jeszcze takiego benchmark suite - dodanie `tests/auto-invocation/` i `tests/chain-success/` z golden promptami zwiększyloby operational confidence znacznie.

### VII.10b Maintaining 35+ skills - operational burden

Skala systemu (35 skills + 42 commands) wprowadza operational overhead. Wypracowane community patterns:

**Pattern A: Generator-driven regeneration**
Maciejowy system uzywa `generate_skills.js` i `generate_commands.js` z HTML jako source of truth. Zalety: consistency, single edit point, easy multi-language updates. Wada: deviation od wygenerowanego szablonu wymaga custom layer (templates vs generated).

**Pattern B: Versioning w frontmatter**
Unofficial field `version: "1.2.0"` w skill frontmatter. Parser ignoruje, ale tooling (diff tools, changelog generators) uzywa. Do rozwazenia dla Maciejowych skilli.

**Pattern C: Bulk audit tools**
```bash
# Script: audit descriptions for trigger richness
for skill in ~/.claude/skills/*.md; do
  desc=$(yq '.description' "$skill")
  words=$(echo "$desc" | wc -w)
  if [ "$words" -lt 20 ]; then
    echo "WEAK: $skill ($words words)"
  fi
done
```

**Pattern D: Tests jako separate repo**
Skille w `~/.claude/skills/`, tests w `~/agent-architecture-tests/`. Nie mieszac - testy maja wlasny lifecycle.

**Pattern E: Monthly review cadence**
Raz w miesiacu: przejrzyj statystyki invokacji (ktora skill byl invoked najrzadziej?), zdeprekuj unused skille, zaktualizuj descriptions pod keywords ktore nie triggerowaly.

### VII.11 Known unknowns

[CRITIC section 5] - topics **nie pokryte** przez R1-R7, flagowane jako gaps ekosystemu:

1. **Skill observability / telemetry** - ktora skill fired, jak dlugo, co zwrocil
2. **Skill versioning during development** - semver bez publikowania pluginu
3. **Internationalization pattern** (Maciejowe territory)
4. **Enterprise governance** - approval workflow, audit trail
5. **Performance tuning** - systematyczny debugging protokol gdy skille nie triggeruja

---

## Part VIII: Integration - jak to wszystko sie skleja

Siedem poprzednich czesci operowalo na poziomie komponentow. Ta czesc lacza je w **spojne architekturalne principy**.

### VIII.1 Hierarchia abstrakcji - jak myslec o systemie

Claude Code Skills operuje w 4 warstwach:

**Warstwa 1: Invocation substrate**
Trzy paths (auto/manual/Skill tool). To warstwa najnizsza, bliska UX. Wybor tu dotyka **jak** skill jest aktywowany, nie **co** robi.

**Warstwa 2: Frontmatter configuration**
13 pol, invocation controls, model routing, tool permissions. Warstwa **zachowania** skilla - jak zachowuje sie w kontekscie sesji.

**Warstwa 3: Body + resources**
SKILL.md + references/ + scripts/. Warstwa **tresci** - pelna wiedza ktora skill wnosi.

**Warstwa 4: Orchestration**
Chainy, patterns, tier decisions. Warstwa **sistema** - jak skille wspolpracuja w wiekszej architekturze.

Projektanci zaczynajacy od warstwy 4 (co chcemy osiagnac) i zchodzacy do warstwy 1 (jak to zaimplementowac) tworza spojne systemy. Projektanci zaczynajacy od warstwy 1 (pobawmy sie / syntaxem) tworza chaotyczne zbiory skilli bez jasnego zastosowania.

### VIII.2 Pierwsza zasada: progressive disclosure wszedzie

Niepokazywane jawnie przez docs ale wynikajace z designu: **pattern progressive disclosure dziala na kazdym poziomie**.

**Na poziomie skilla**: metadata (cheap) -> body (on-trigger) -> resources (on-read)
**Na poziomie chainu**: kluczowe kroki zalaczaja kolejne skille, nie loadujac wszystkiego naraz
**Na poziomie systemu**: domain overview (catalog) -> skill description -> skill body -> resources

Maciejowy system v32.16 juz stosuje ten pattern:
- `PRESET_CATALOG.md` (1 plik, overview) -> komenda (1 plik per preset) -> skille (35 plikow per agent) -> HTML encyklopedia (szczegoly)

### VIII.3 Druga zasada: commitment jest "missing piece"

Chociaz docs nie mowia tego explicite, obserwacja ekosystemu 2026 pokazuje: **najwieksza single jump w quality jest commitment-before-generation**.

Dlaczego nie jest w docs: to emergent pattern od community (Frontend Design team Anthropic to pokazal pierwsza na skale), nie architectural feature platformy. Docs pokazuja **mechanizmy** (frontmatter, invocation), community pokazuje **wzorce uzycia** (commitment, three-layer description, multi-file resources).

Przejscie od "funkcjonalnego skilla" do "premium skilla" wymaga swiadomego zastosowania commitment pattern. Bez niego Claude produkuje statistical mean; z nim produkuje deliberate output.

### VIII.4 Trzecia zasada: artifacts over memory

Chainy dluzsze niz 3-5 skilli **musza** persist state do filesystem. Compaction limits (5k per skill, 25k combined) sprawiaja ze memory-only chainy sa structurally fragile.

Maciejowa /deep-research-v2 pipeline to kanoniczny przyklad:
- Research phase: 7 researchers -> 7 artefaktow R1.md...R7.md
- Extract phase: 7 artefaktow E1.json...E7.json
- Critique: CRITIC.md
- Synthesis: SYNTHESIS.md
- NbLM: 4 artefakty 00-03.md

Kazdy krok pisze do dysku. Kazdy nastepny krok czyta z dysku. Compaction nie przerywa pipeline'u bo state trzyma sie **poza** session memory.

### VIII.5 Czwarta zasada: simplest tier wins

R5 podkresla: **start with Skills**. Eskaluj do Subagent tylko gdy context isolation niezbedna. Dodaj MCP tylko gdy external integration konieczna. Dodaj Hook tylko gdy lifecycle automation sensowna.

Przeciwlegla pulapka: "jestem zaawansowanym userem, uzyje wszystkich 4 tierow od razu". Rezultat: system trudny do utrzymania, z redundantnymi mechanizmami (np. Hook+MCP robi to samo co Skill+allowed-tools).

Heuristics: jesli nie mozesz wyjasnic dlaczego uzywasz wiecej niz jednego tier w 1 zdaniu, prawdopodobnie **upraszczasz za malo**.

### VIII.6 Piąta zasada: namespacing to discipline, nie feature

Plugin namespacing (`vercel:deploy`) rozwiazuje kolizje nazw **architektonicznie**. Standalone skills polegaja na user discipline (nie nadaj dwoch skilli tej samej nazwy). Przy 35+ skilli user discipline zawodzi.

Maciejowi, jesli nie publikuje jako plugin, polecamy **convention-based namespacing** w nazwach:
- `res_docs` (researcher, docs domain)
- `a1_auditor` (auditor role prefix)
- `team_deep_research` (orchestrator prefix)

Prefix daje kategoryzacje bez formalnego namespace.

### VIII.7 Szosta zasada: bug #17283 jako architectural constraint

Bug #17283 nie jest incydentem - to **systemic architectural constraint** do fix. Dopoki aktywny, projektujac fan-out patterns:
1. NIE uzywaj `context: fork` via Skill tool call
2. UZYWAJ slash invocation lub subagent-with-skills-field
3. PERSISTUJ shared state do filesystem jako workaround dla isolation loss
4. DOKUMENTUJ w skill description: "DO NOT invoke via Skill tool"

To wpłynęlo na design Maciejowej /deep-research-v2: researcher spawning przez explicit Task tool (nie Skill tool) wlasnie zeby obejsc #17283 silent failure.

### VIII.8 Siodma zasada: opportunity zones sa latwo lapane

Community 2026 pokazuje koncentracje w engineering (43%), document automation (22%), web/research (18%). Under-represented zones:
- Multi-agent orchestration architecture
- Non-English localized skills
- Meta-skills (skille do projektowania skilli)
- Educational/tutorial skills (encyclopedic)

Maciejowy system pokrywa wszystkie 4 unique'nie. To nie przypadek - to rezultat **design-first thinking** (encyclopedia, HTML designer) w miejscu gdzie community zoptymalizowala na "ship fast".

### VIII.9 Siec referencji - mapa wzajemnych zaleznosci

Poniezsza tabela pokazuje **architektoniczne powiazania** miedzy konceptami; projektujac skill, warto swiadomie przeanalizowac wplyw na 2-3 sasiednie warstwy.

| Koncept | Bezposrednio wplywa na | Sposob wplywu |
|---------|------------------------|---------------|
| Scope (Enterprise/Personal/Project/Plugin) | Invocation priority | Rozstrzyga ktory skill wygrywa przy nazwie konfliktujacej |
| Progressive disclosure | Post-compaction survival | Skille z resources on-demand przetrwaja compaction lepiej |
| Bug #17283 | Fan-out chain patterns | Wymusza workaround (slash invocation, filesystem state) |
| model: field | Cost per session | Router per-skill od Haiku do Opus |
| context: fork | Memory isolation | Plus agent: field dla subagent delegacji |
| Auto-invocation | Description engineering | Keyword richness determinuje trigger reliability |
| Plugin namespace | Collision avoidance | Rozwiazuje conflict architectonically |
| Compaction 5k/25k budget | Chain depth limit | Max 3-5 skilli przed information loss |
| Path A vs B vs C | Permission granularity | Kazda sciezka ma wlasne rules |
| Commitment pattern | Output quality | Lamie statistical mean LLM |
| Effort: high | Reasoning depth | Propaguje session-wide, cost implications |
| allowed-tools | MCP integration | Wbudowuje external tools w skill |
| Skill merge 2.1+ | Commands UX | Command = user-invocable skill |

### VIII.10 Evolution path for new skill authors

Typowa ewolucja autorów skilli w 2026 (obserwowana community):

**Stage 1: First skill (week 1-2)**
- Kopiuje template z awesome-list
- Generic description ("helps with X")
- Monolityczny SKILL.md 3k+ tokenow
- Auto-invocation rzadko dziala
- User manualnie invokuje

**Stage 2: Trigger discipline (week 2-4)**
- Odkrywa ze auto-invocation zalezy od description keywords
- Rewrite description z three-layer structure
- Reliability skacze z ~30% do ~70%

**Stage 3: Progressive disclosure (month 2-3)**
- Skill rozrastal sie do 5k+ tokenow
- Odkrywa resources/ pattern
- Dzieli na SKILL.md (1500 t) + references/ (on-demand)
- Post-compaction survival poprawiona

**Stage 4: Model routing (month 3-4)**
- Zauwaza cost wzrasta przy uzyciu
- Dodaje `model: haiku` dla prostych skilli
- Oszczedza 5x-20x na niektórych

**Stage 5: Commitment patterns (month 4-6)**
- Odkrywa premium skille (Frontend Design)
- Probuje replicate commitment-before-generation
- Output quality dramatycznie sie poprawia

**Stage 6: Chain orchestration (month 6+)**
- Chce polaczyc skille w workflows
- Odkrywa Claude-mediated chain mechanics
- Experimentuje z context:fork, napotyka bug #17283
- Zdobywa zaufanie do Swarm Orchestration alternative

**Stage 7: Plugin publication (month 12+)**
- Chce podzielic sie ze spolecznoscia
- Napotyka fragmentacje marketplace
- Wybiera Anthropic official + 1-2 third-party awesome lists

Maciej jest currently na **Stage 7-equivalent**: 35 + 42 system ze **zero narzutem pluginizacji** bo prywatny use, ale architektura supportuje migration gdy czas nadejdzie.

### VIII.11 Post-compaction recovery strategies

Compaction jest nieuchronny w dluzszych sesjach. Strategies survival skilli:

**Strategy A: Re-invocation checkpoint**
W orchestrator skill dodaj step "Check if key skills still active. If not, re-invoke manually." Simple heuristic, pozwala odzyskac z majority compactions.

**Strategy B: Filesystem artifacts**
Najskuteczniejsza. Kazdy krytyczny skill pisze output do pliku. Kolejne skille czytaja z pliku. State persist niezaleznie od session memory.

**Strategy C: Minimal skill bodies**
Jesli skill body <1500 tokenow, cala tresc survive re-attach cap. Zamiast rozbudowanego body, krótkie SKILL.md + resources on-demand.

**Strategy D: Session-startable chains**
Projektuj chainy tak zeby mogly zaczynac od dowolnego kroku. Dzieki filesystem state (Strategy B), chain /deep-research-v2 Phase 3 moze wznowic od Phase 2 outputs bez re-running Phase 1.

**Strategy E: Accept compaction losses**
Dla low-criticality chainow, akceptuj ze srednie kroki moga zostac dropped. Szybsze i tańsze niz build-in survival logic.

Wybor strategii zalezy od criticality i chain length. Dla Maciejowego /deep-research-v2: Strategy B (filesystem artifacts) jako primary + Strategy D (session-startable).

## Podsumowanie (po Part VIII)

Claude Code Skills 2026 to architektura o wyraznych warstwach. Fundamenty (Part I) to scope + progressive disclosure + lifecycle; frontmatter (Part II) definiuje zachowanie 13 fieldsami z bug #17283 jako blocker dla fork-via-Skill-tool patterns; invocation (Part III) daje 3 paths z cost/reliability trade-offs; chaining (Part IV) opiera sie na Claude jako mediator z maksymalna glebokoscia 3-5 skilli; tier decision (Part V) positionuje Skills w 4-tier hierarchii z MCP/Subagents/Hooks; plugin ecosystem (Part VI) daje dystrybucje z namespacingiem i top marketplaces; patterns (Part VII) katalogizuja top-10, anti-patterny i commitment-before-generation jako highest-impact pattern.

Dla Maciejowego systemu SYNTHESIS rekomenduje:
- **Zostan przy standalone skills** (private use)
- **Audit descriptions dla trigger richness**
- **Dodac commitment patterns** w skillach generujacych content
- **Weryfikowac chain depth 42 commands**
- **Plugin-izacja dopiero przy publikacji**

Highest-impact pojedyncza zmiana: **commitment-before-generation pattern** w skillach typu research/write/design.
