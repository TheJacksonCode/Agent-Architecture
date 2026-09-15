# R1 - Skills Official Docs (Anthropic source of truth)

**Researcher:** res_docs (Sonnet, persona simulated by Orchestrator)
**Data:** 2026-04-17
**Zrodla primary:** code.claude.com/docs/en/skills, platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices, anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
**Wersja dokumentacji:** stan 2026-04, Claude Code Skills + Agent Skills (API)

## Summary

Skills system Anthropic to filesystem-based mechanizm rozszerzania Claude z progressive disclosure: na starcie sesji laduja sie tylko metadane (name + description) z kazdego SKILL.md, a pelne cialo skill plus bundled files laduja sie on-demand przez bash read. Claude Code wspiera cztery scope level (Enterprise > Personal ~/.claude/skills > Project .claude/skills > Plugin z namespace), custom commands w .claude/commands zostaly polaczone ze skills (skill wygrywa przy konflikcie nazw). Frontmatter ma 13 oficjalnie udokumentowanych pol (wszystkie optional, tylko description zalecany) z hard caps: name do 64 znakow, description do 1024 znakow per Agent Skills spec API ale Claude Code truncuje combined description + when_to_use do 1536 znakow w skill listing. Budget skill listing dynamic: 1% kontextu z fallback 8000 znakow, configurable przez SLASH_COMMAND_TOOL_CHAR_BUDGET env var. Skill raz invokowany zostaje jako jedna wiadomosc w konwersacji; auto-compaction re-attaches tylko pierwsze 5000 tokens z 25000 tokens combined budget. Trzy sciezki invocation: description-match auto (Claude sam decyduje), /skill-name manual, Skill tool program dostep dla agentow. `disable-model-invocation: true` odcina auto. `user-invocable: false` ukrywa z / menu ale Claude nadal moze przez Skill tool. Konflikt nazw rozstrzyga kolejnosc Enterprise > Personal > Project; Plugin ma wlasny namespace `plugin-name:skill-name`. Progressive disclosure wynik: ~100 tokens per skill w system prompt na starcie, SKILL.md body < 5000 tokens po invocation, bundled files bez kosztu az do czytania.

## Details

### 1. Location hierarchy (scope level)

Oficjalna tabela z code.claude.com/docs/en/skills:

| Location | Path | Applies to |
|:---------|:-----|:-----------|
| Enterprise | managed settings | All users in your organization |
| Personal | `~/.claude/skills/<skill-name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<skill-name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<skill-name>/SKILL.md` | Where plugin is enabled |

Konflikt priority: "higher-priority locations win: enterprise > personal > project. Plugin skills use a plugin-name:skill-name namespace, so they cannot conflict with other levels" (code.claude.com/docs/en/skills). Plugin namespace pattern jest CZYSTY - plugin skill nigdy nie koliduje.

Commands backward-compat: "if a skill and a command share the same name, the skill takes precedence" (ten sam zrodlo). Anthropic zrobil merge custom commands w skills - plik w `.claude/commands/deploy.md` i skill w `.claude/skills/deploy/SKILL.md` obie tworza `/deploy`. Stare komendy dalej dzialaja ale skills sa rekomendowane bo wspieraja supporting files i frontmatter features.

### 2. File anatomy (SKILL.md + supporting)

Struktura katalogu (z overview + best-practices):

```
my-skill/
├── SKILL.md           # Required - frontmatter + body
├── reference.md       # Optional - loaded on demand
├── examples.md        # Optional - loaded on demand
├── template.md        # Optional - template for Claude
├── examples/
│   └── sample.md
└── scripts/
    └── helper.py      # Executed via bash, not loaded into context
```

**Critical path rule (code.claude.com/docs/en/skills):** "The most frequent installation error is nesting the skill one level too deep. The path must be `~/.claude/skills/skill-name/SKILL.md`, not `~/.claude/skills/skill-name/another-folder/SKILL.md`" (doc: agensi.io/learn/where-are-claude-skills-stored).

Dla Claude Code: filesystem-based, no API upload. Dla Claude API i claude.ai: upload jako zip (claude.ai) lub przez Skills API endpoints /v1/skills.

### 3. Progressive disclosure (three-level architecture)

Ten sam overview platform.claude.com/docs/en/agents-and-tools/agent-skills/overview:

| Level | When Loaded | Token Cost | Content |
|-------|------------|------------|---------|
| Level 1: Metadata | Always (startup) | ~100 tokens per Skill | name + description z YAML |
| Level 2: Instructions | Skill triggered | < 5k tokens | SKILL.md body |
| Level 3: Resources | As needed | Effectively unlimited | Bundled files via bash, never loaded if not read |

Kluczowy cytat z Anthropic eng blog: "the amount of context that can be bundled into a skill is effectively unbounded" bo filesystem-access agents nie laduja calego skillu naraz.

Empiryczny target z docs: "With progressive disclosure, the overhead is roughly 1,500 tokens total for all 40 skills" (eng blog / wielokrotnie cytowane w 3rd party guides).

Mechanism zaczyna sie od startupa: "Claude Code scans both directories at session startup and loads the frontmatter from every SKILL.md it finds" (agensi.io/learn). Potem wstrzykuje jako `<available_skills>` sekcje w systemie. Claude Code builds this section based on skill folders; name i description pochodza wprost z YAML.

Pelny loading cycle:
1. Startup: scan ~/.claude/skills + .claude/skills + plugin skills, parse YAML, build skill listing (name + description + when_to_use, truncate at 1536 char per entry)
2. User request -> Claude pattern-matches z descriptions
3. Claude wywoluje bash read(SKILL.md) -> body wlata do kontekstu jako jedna wiadomosc
4. Jesli body linkuje do reference.md, Claude bash read tego pliku
5. Jesli body linkuje scripts/helper.py z instrukcja "run this", Claude wywoluje bash python helper.py -> tylko output (nie kod) wpada w kontekst

### 4. Frontmatter reference - kompletna lista pol

Z code.claude.com/docs/en/skills - oficjalna tabela:

| Field | Required | Description |
|:------|:---------|:------------|
| `name` | No | Display name. Jesli omit, uses directory name. Lowercase letters, numbers, hyphens only (max 64 chars). |
| `description` | Recommended | What the skill does and when to use it. Combined description + when_to_use truncated at 1536 chars in skill listing. |
| `when_to_use` | No | Dodatkowy kontekst dla Claude kiedy invokowac. Appended do description w listing, counts do 1536-char cap. |
| `argument-hint` | No | Hint w autocomplete (np. `[issue-number]`). |
| `disable-model-invocation` | No | `true` -> Claude nie moze auto-invoke. Default false. |
| `user-invocable` | No | `false` -> ukryte z / menu. Default true. NIE blokuje Skill tool - tylko menu visibility. |
| `allowed-tools` | No | Tools bez permission prompt. Space-separated string lub YAML list. |
| `model` | No | Model override dla tego skillu. |
| `effort` | No | Effort level (low, medium, high, xhigh, max). Override session. |
| `context` | No | `fork` -> run in forked subagent context. |
| `agent` | No | Subagent type gdy `context: fork` (np. `Explore`, `Plan`, `general-purpose`). |
| `hooks` | No | Hooks scoped do skillu (see /en/hooks). |
| `paths` | No | Glob patterns - skill laduje auto tylko gdy edytujesz pasujace pliki. |
| `shell` | No | `bash` default lub `powershell`. Windows-only opcja. |

Agent Skills spec (platform.claude.com) dorzuca hard validation rules:
- `name`: max 64 chars, lowercase/numbers/hyphens, brak XML tags, brak reserved words "anthropic" i "claude"
- `description`: max 1024 chars (API), non-empty, brak XML

UWAGA o dwoch caps: spec API mowi description max 1024, Claude Code doc mowi combined description + when_to_use truncated at 1536 w skill listing. To nie jest sprzecznosc: pojedyncze pole description ma cap 1024 per API, ale Claude Code pokazuje description + when_to_use jako combined entry i cap 1536 to LISTING cap po concatenacji. **[GAP: nie znalazlem eksplicitnej walidacji czy Claude Code enforces 1024 na pojedyncze description.]**

### 5. String substitutions (dynamic content)

Claude Code docs daja 5 zmiennych:

| Variable | Description |
|:---------|:------------|
| `$ARGUMENTS` | Cale args. Jesli nie present w content, dodane jako `ARGUMENTS: <value>` na koncu. |
| `$ARGUMENTS[N]` | N-ty arg (0-based). `$ARGUMENTS[0]` pierwszy. |
| `$N` | Shorthand dla `$ARGUMENTS[N]`. `$0` = pierwszy. |
| `${CLAUDE_SESSION_ID}` | Current session ID. |
| `${CLAUDE_SKILL_DIR}` | Directory z SKILL.md. Dla plugin skills: skill subdir, nie plugin root. |

Indexed args shell-style: `/my-skill "hello world" second` -> `$0` = "hello world", `$1` = "second". $ARGUMENTS = caly string jak wpisano.

### 6. Dynamic context injection (!-commands)

Syntax: `` !`<command>` `` inline lub fenced `` ```! ``. Command uruchamia sie PRZED tym jak skill content wchodzi w kontekst. Output replace placeholder. Przyklad z docs:

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
```

Security: mozna wylaczyc przez `"disableSkillShellExecution": true` w settings - kazda komenda zamieniana na `[shell command execution disabled by policy]`. Bundled i managed skills nie sa afected. Najczesciej uzyteczne w managed settings gdzie user nie moze override.

### 7. Invocation paths (trzy sciezki)

Claude Code docs opisuja trzy drogi:

**(a) Automatic model invocation (description-match)** - Claude sam decyduje na podstawie description. Zawsze dzialaja dla skills z default frontmatter. Blokada: `disable-model-invocation: true`.

**(b) Manual slash invocation `/skill-name`** - user wpisuje. Blokada: `user-invocable: false` (hide z menu). Uzywane dla task-oriented skills z side effects (commit, deploy).

**(c) Skill tool (programmatic)** - inne skills/agents moga wywolac. Blokada: permission rule `Skill(name)` deny w settings, lub `disable-model-invocation: true` blokuje calkowicie. **UWAGA (docs):** "The user-invocable field only controls menu visibility, not Skill tool access. Use disable-model-invocation: true to block programmatic invocation."

Oficjalna tabela zachowania:

| Frontmatter | You invoke | Claude invoke | Context loading |
|:------------|:-----------|:--------------|:----------------|
| (default) | Yes | Yes | Description in context, full skill on invoke |
| `disable-model-invocation: true` | Yes | No | **Description NOT in context**, full skill on user invoke |
| `user-invocable: false` | No | Yes | Description in context, full skill on invoke |

Kluczowe: `disable-model-invocation: true` USUWA description z kontekstu zeby oszczedzic tokeny. Skill dostepny tylko manual.

Skill tool zasady (code.claude.com/docs/en/skills -> Restrict Claude's skill access):
- `Skill` w deny rules -> Claude nie moze invokowac zadnego skill
- `Skill(commit)` w allow -> exact match
- `Skill(review-pr *)` w allow -> prefix match
- `Skill(deploy *)` w deny -> zablokowac konkretny

Built-in commands dostepne przez Skill tool: `/init`, `/review`, `/security-review`. Inne built-in jak `/compact` nie sa.

### 8. Content lifecycle + auto-compaction

Z docs Skill content lifecycle:
- Skill invokowany -> rendered SKILL.md content dodany jako JEDNA wiadomosc w konwersacji
- Content zostaje RESZTE sesji, Claude Code nie re-reads na kolejnych turnach
- Wniosek: "write guidance that should apply throughout a task as standing instructions rather than one-time steps"

Auto-compaction:
- Carries invoked skills forward within token budget
- Po compaction: "Claude Code re-attaches the most recent invocation of each skill after the summary, keeping the first 5,000 tokens of each"
- Re-attached skills share combined budget **25,000 tokens**
- Fill starts from most recent - starsze moga zostac DROPPED entirely
- Recommendation: jesli skill przestal dzialac po compaction, re-invoke

### 9. Skill description budget (krytyczne dla wielu skills)

Z sekcji Troubleshooting:
- Wszystkie skill NAMES zawsze included
- Jesli duzo skills, DESCRIPTIONS sa shortened zeby miescic sie w budgecie
- Budget scales dynamically: **1% context window**, fallback 8000 chars
- Env var: `SLASH_COMMAND_TOOL_CHAR_BUDGET` do raising
- Per-entry cap: 1536 chars dla description + when_to_use

**Praktyczna implikacja dla Macieja (35 skills):** przy 200k context window to 2000 chars per skill srednio - spokojnie miesci. Ale przy 50 skills + plugin skills + 100k context rezerwowanego na konwersacje, budget moze sie zaczac tightening. Dyscyplina: front-load kluczowy use case w description.

### 10. Subagent integration (context: fork)

Dwa kierunki skill + subagent:

| Approach | System prompt | Task | Also loads |
|:---------|:--------------|:-----|:-----------|
| Skill with `context: fork` | Z agent type (Explore, Plan) | SKILL.md content | CLAUDE.md |
| Subagent with `skills` field | Subagent body | Claude's delegation message | Preloaded skills + CLAUDE.md |

Z `context: fork`: nowy isolated context, subagent dostaje SKILL.md content jako prompt, `agent` field okresla environment (model, tools, permissions). Results summarized i zwrocone do main.

**Ostrzezenie z docs:** "context: fork only makes sense for skills with explicit instructions. If your skill contains guidelines like 'use these API conventions' without a task, the subagent receives the guidelines but no actionable prompt, and returns without meaningful output."

Drugi kierunek: subagents z `skills` field preload full skill content (nie tylko description) na startup subagenta. Rozni sie od regular session gdzie pelna tresc laduje sie dopiero na invoke.

### 11. Live change detection

"Claude Code watches skill directories for file changes. Adding, editing, or removing a skill under `~/.claude/skills/`, the project `.claude/skills/`, or a `.claude/skills/` inside an `--add-dir` directory takes effect within the current session without restarting."

Wyjatek: tworzenie top-level skills directory ktory nie istnial na starcie sesji WYMAGA restart bo watcher nie byl zarejestrowany.

Nested discovery (monorepo): "if you're editing a file in packages/frontend/, Claude Code also looks for skills in packages/frontend/.claude/skills/".

Additional dirs via `--add-dir`: flag grants file access NOT configuration, ale skills to wyjatek - .claude/skills/ w added dir laduje sie auto. Inne configs (subagents, commands, output styles) NIE laduja sie z additional dirs.

### 12. Pre-approve tools via allowed-tools

Format: `allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)` - space-separated lub YAML list.

"It does not restrict which tools are available: every tool remains callable, and your permission settings still govern tools that are not listed."

Aby zablokowac skill od uzycia konkretnych tools -> deny rules w permission settings, nie allowed-tools.

### 13. Content types (reference vs task)

**Reference content**: dodaje knowledge dla current work. Conventions, patterns, style guides, domain knowledge. Runs INLINE z conversation context.

**Task content**: step-by-step dla specific action (deploy, commit, code gen). Czesto invokowane bezposrednio `/skill-name`. Dodaj `disable-model-invocation: true` zeby zabronic auto-trigger.

Docs recommend: "Your SKILL.md can contain anything, but thinking through how you want the skill invoked (by you, by Claude, or both) and where you want it to run (inline or in a subagent) helps guide what to include."

### 14. Cross-surface limitations

Claude.ai / Claude API / Claude Code - **skills NIE syncuja sie miedzy surface**. Claude Code to filesystem-based, osobny od claude.ai (upload zip) i API (upload via /v1/skills endpoints). Trzeba zarzadzac osobno per surface.

Runtime:
- claude.ai: varying network access (per user/admin)
- Claude API: NO network, NO runtime package install, pre-configured deps only
- Claude Code: FULL network (as host machine), ale discourage global package install (polluting user env)

### 15. Agent Skills open standard

Cytat z Claude Code docs: "Claude Code skills follow the Agent Skills open standard, which works across multiple AI tools. Claude Code extends the standard with additional features like invocation control, subagent execution, and dynamic context injection."

Strona standardu: agentskills.io. OpenCode i inne AI tools adoptuja ten sam format. Core fields (name, description) sa przenosne; invocation control/subagents/dynamic injection to Claude Code extensions.

### 16. Pre-built skills Anthropic

- Claude Code: bundled skills `/simplify`, `/batch`, `/debug`, `/loop`, `/claude-api` (prompt-based, Claude orkiestruje przez swoje tools)
- Claude API + claude.ai: pptx, xlsx, docx, pdf (container-based, Anthropic hosted)
- Open-source repo: github.com/anthropics/skills (Claude API skill z up-to-date SDK docs dla 8 jezykow)

## Issues / Flags

**Ambiguity #1:** description cap. API spec mowi 1024 chars, Claude Code listing mowi 1536 combined description+when_to_use. Jak Claude Code obchodzi sie z description > 1024 przy API upload? Gap do eksperymentu.

**Ambiguity #2:** `user-invocable: false` + `disable-model-invocation: true` jednoczesnie - czy skill jest w ogole wykonywalny? Z tabeli oficjalnej wynika ze NIE z zadnej sciezki (Claude nie widzi description, user nie ma w menu). Skill zombie - tylko przez direct Skill tool call ktory jednak jest zablokowany przez disable-model-invocation. Docs tego nie rozstrzygaja explicite.

**Ambiguity #3:** `context: fork` + `agent: X` - co sie dzieje jesli agent X ma sam `skills:` field? Rekursja? Docs nie mowia.

**Conflict:** "description in context vs not" przy different frontmatter. Tabela mowi `disable-model-invocation: true` -> description NOT in context. Ale to sprzeczne z intuicja bo jesli user wpisze `/name`, skad Claude wie ze skill istnieje? Odpowiedz: skill directory zawsze skanowany, tylko description nie injected do system prompt (Claude widzi tylko nazwe w / menu). Potwierdzic empirycznie.

**Gap #1:** Skill chaining (skill wola skill) - docs nie maja eksplicitnie sekcji "skill can invoke another skill". Sa namieszki via `context: fork` i subagents-with-skills, ale direct chain? Pozostawione dla R4.

**Gap #2:** Plugin skill priority vs user skill - docs mowia "Plugin skills use plugin-name:skill-name namespace, so they cannot conflict". OK, ale co gdy user instaluje plugin ktory ma skill `commit` i user ma wlasny skill `commit`? Plugin dostaje namespace `myplugin:commit`, user ma `commit`. Czyli obie istnieja rownolegle. Ale kiedy user wpisze /commit, ktora sie uruchomi? Domniemanie: user-level wygrywa bez namespace. Do potwierdzenia w R6.

**Gap #3:** Max skills practical limit. Docs mowia 1% budget z fallback 8000 chars - przy 1536 char cap per entry to teoretycznie 5 skills w 8k budget. Ale Maciej ma 35 - czyli albo jego descriptions sa short, albo budget dynamiczny dziala. Anthropic eng blog mowi "40 skills = 1500 tokens". Do zweryfikowania empirycznie w R2.

**Recency concern:** docs stan 2026-04. Field `user-invocable` pojawia sie w Claude Code table ale nie w Agent Skills API spec (tam tylko name + description). Mozliwe ze user-invocable to Claude Code extension. Confirmed: yes.

## Recommendation

GO do Phase 2. R1 ma twardy material:
- 13 pol frontmatter udokumentowanych explicite
- Trzy level loading z token costs
- Trzy sciezki invocation z permission rules
- Conflict resolution order explicite (Enterprise > Personal > Project, Plugin namespace)
- Pre-built list + open standard reference

Dla SYNTHESIS:
- Part "Fundamenty" dostaje tu solidny material
- Tabela scope level = gotowa do cytowania
- Table frontmatter fields = reuse 1:1

Deep confidence on: frontmatter spec, scope priority, progressive disclosure three-level, content lifecycle + compaction numbers (5k/25k), skill description budget (1% / 8000 / 1536).

Medium confidence on: description cap conflict (1024 vs 1536), user-invocable semantics gdy combined z disable-model-invocation.

Low confidence on: skill chaining mechanism (gap do R4), plugin vs user skill ties przy same name (gap do R6).

### Zrodla

- code.claude.com/docs/en/skills - Claude Code Skills documentation (primary)
- platform.claude.com/docs/en/agents-and-tools/agent-skills/overview - Agent Skills API overview (primary)
- platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices - best practices guide (primary)
- anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills - engineering blog
- agensi.io/learn/where-are-claude-skills-stored + agensi.io/learn/claude-code-skills-folder-location-setup - secondary, cytaty z Anthropic docs potwierdzone
