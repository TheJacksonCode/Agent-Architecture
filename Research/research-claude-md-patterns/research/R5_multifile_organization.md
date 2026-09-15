# R5: Multi-file + Organization

**Researcher:** R5 (Opus 4.7)
**Data:** 2026-04-17
**Scope:** CLAUDE.md splitting strategies, @import syntax, plugin overlay, monorepo patterns, layered organization, shared templates.
**Target:** 3000-4500 slow, dense prose, ASCII trees, import graphs, 3+ real examples.

---

## 1. Abstract

CLAUDE.md przeszlo w 2025-2026 droge od pojedynczego pliku "wrzucam wszystko" do ekosystemu warstw: per-projekt, per-podfolder, per-user, per-plugin, per-rule. Anthropic udostepnilo trzy komplementarne mechanizmy multi-file: (1) `@path/to/file.md` imports, ktore expanduja sie do kontekstu lazownie/eagernie (max 5 hopow, recursive), (2) hierarchiczne discovery (Claude chodzi w gore od cwd i laduje KAZDY CLAUDE.md po drodze), oraz (3) `.claude/rules/*.md` - path-scoped moduly z YAML frontmatter `paths:`. Pluginy nie overlayuja CLAUDE.md w sensie merge'owania z project CLAUDE.md; zamiast tego plugin sam moze dostarczyc skills/agents/hooks/settings.json, a jego zawartosc zyje pod `plugin-name:` namespace. Dla monorepos kanoniczna recepta to lean root CLAUDE.md (200-300 linii, uniwersalne regulki) + per-package CLAUDE.md w `packages/*/CLAUDE.md` ladowane **on-demand** kiedy Claude czyta pliki w tym subfolderze. Layered organization (user -> project -> module -> task) zapewnia separation of concerns i context hygiene. `@import` nie wspiera remote URLs - tylko local paths (relative / absolute / `~/` home-relative); brakujace pliki nie rzucaja bledu (silent skip z ostrzezeniem) a circular imports sa wykrywane na poziomie loadera i handled gracefully. Ponizej: kompletna mapa mechanizmow z cytowanymi fragmentami docs, konkretnymi monorepo prikladami (Claude Code docs self-host, browser-use, Turborepo acme-platform) i gap analysis co jest niedookumentowane.

---

## 2. @import syntax kompletny (7 aspektow)

### 2.1 Format i sygnatura

Oficjalna definicja z docs:

> "CLAUDE.md files can import additional files using `@path/to/import` syntax. Imported files are expanded and loaded into context at launch alongside the CLAUDE.md that references them."
> (https://code.claude.com/docs/en/memory#import-additional-files)

Anchor: `@` musi byc bezposrednio przed sciezka, bez spacji. Przyklad z docs:

```text
See @README for project overview and @package.json for available npm commands for this project.

# Additional Instructions
- git workflow @docs/git-instructions.md
```

Import moze wystepowac **w dowolnym miejscu** w CLAUDE.md - inline w zdaniu ("See @README"), jako bullet ("- @docs/git-instructions.md") lub jako samodzielna linia. Pod katem parse'a: Claude Code szuka `@` nastepujacego po bialym znaku lub poczatku linii, followed by sciezka. Kazdy import jest replaced inline - tekst na pozycji `@docs/x.md` zostaje zamieniony na pelna zawartosc `docs/x.md`.

### 2.2 Relative vs absolute paths

Docs explicite:

> "Both relative and absolute paths are allowed. Relative paths resolve relative to the file containing the import, not the working directory."

Krytyczny niuans: relative paths NIE sa resolved wzgledem cwd. To znaczy, ze jesli `~/.claude/CLAUDE.md` importuje `@./preferences.md`, resolved do `~/.claude/preferences.md` - nie do `$(pwd)/preferences.md`. To upraszcza shared templates (plik w `~/.claude/common/` zawsze widzi swoje sasiadowki nawet gdy Claude Code startuje z innego katalogu).

Absolute paths sa plain POSIX paths: `/Users/foo/company-docs/standards.md`. Na Windows wspierane sa zarowno forward jak i backslash separatory.

### 2.3 `@~/...` home-relative

Tilde expansion jest wspierana. Docs daja konkretny przyklad dla worktrees:

```text
# Individual Preferences
- @~/.claude/my-project-instructions.md
```

Uzytkownik Maciej ma ten pattern w swoim globalnym `~/.claude/CLAUDE.md` (widoczne w context codzisiaj - `[Research+plans per version]` etc. odwoluja sie do `feedback_*.md` w memory folderze, nie przez @import jednak).

### 2.4 Remote URLs - NIE wspierane oficjalnie

Oficjalna dokumentacja **nie wspomina** wsparcia dla `@https://example.com/rules.md`. Wszystkie przyklady w docs ograniczaja sie do local filesystem paths. Nie znaleziono zadnego github issue ani release notes potwierdzajacego URL imports.

Praktyka community (Reddit, Dev.to) potwierdza ten brak: ludzie chcacy shared company rules klonuja private GitHub repo do `~/company-rules/` i importuja `@~/company-rules/standards.md`, albo uzywaja symlinkow (see sekcja 2.5 o `.claude/rules/` symlinki - oficjalnie wspierane).

**Workaround:** curl + symlink w CI lub post-clone hook. Brak native remote imports jest gap (patrz sekcja 11).

### 2.5 Max depth (recursion limit)

Docs explicite:

> "Imported files can recursively import other files, with a maximum depth of five hops."

Interpretacja: `CLAUDE.md (hop 0) -> A.md (hop 1) -> B.md (hop 2) -> C.md (hop 3) -> D.md (hop 4) -> E.md (hop 5)`. Szosty hop `E -> F.md` jest blokowany/ignorowany. Brak oficjalnej specyfikacji jak blokada sie manifestuje - warning? silent truncation? error dialog? Community tests (morphllm.com/claude-md-examples) sugeruja silent truncation z ewentualnym logowaniem jesli wlaczony `InstructionsLoaded` hook.

Dla ogromnej wiekszosci projektow limit 5 jest niewazki - typowy pattern to 2 hops (CLAUDE.md -> docs/architecture.md -> (stop)). Dopiero szablony typu "meta-templates z N poziomow delegacji" uderzaja w limit.

### 2.6 Circular refs handling

Docs NIE ma osobnej sekcji o circular refs w @import. Ale **analogicznie do skills** (ktore tez ladowane sa przez ten sam loader):

> "When Claude Code initializes a skill, it walks the dependency tree before executing any code. The loader maintains a 'currently loading' set. If it encounters a skill that is already in that set, it knows a cycle exists and raises the error immediately rather than entering an infinite loop."
> (https://claudecodeguides.com/claude-code-skill-circular-dependency-detected-error-fix/)

Community tests (https://stevekinney.com/courses/ai-development/referencing-files-in-claude-code) potwierdzaja: ze cykliczne `@` referencje (A.md z `@B.md`, B.md z `@A.md`) sa wykrywane przez eager load. Zamiast infinite recursion loader raise "Circular Dependency Detected" i pomija drugi wkaz. Konkretne error surfaces nie sa dokumentowane w memory docs (gap).

Dodatkowo: symlinki w `.claude/rules/` maja osobne explicite wsparcie:

> "Symlinks are resolved and loaded normally, and circular symlinks are detected and handled gracefully."
> (https://code.claude.com/docs/en/memory#share-rules-across-projects-with-symlinks)

### 2.7 Error handling (brak pliku)

Docs nie dokumentuja explicite. Z testow community (dev.to anvodev, reddit):

- **Brak pliku:** silent skip. Import jak `@missing.md` zostaje usuniety z kontekstu bez bledu, Claude po prostu nie widzi tego bloku. Zaleca sie testowanie przez `/memory` command (listuje wszystkie zaladowane pliki).
- **Permissions dialog:** jesli importowany plik jest **zewnatrz cwd**, Claude Code przy pierwszym zetknieciu pokazuje approval dialog:

> "The first time Claude Code encounters external imports in a project, it shows an approval dialog listing the files. If you decline, the imports stay disabled and the dialog does not appear again."

To jest powod bug #1321 (https://github.com/anthropics/claude-code/issues/1321) - Claude pokazywal false positive warning przy `@AGENTS.md` w monorepo subfolder, chociaz oba pliki byly w tym samym katalogu.

- **Syntax error w @ path:** np. `@ ./file.md` (spacja po @) - traktowane jako plain tekst, nie import.

---

## 3. Splitting strategie (5 podejsc)

### 3.1 Per topic (doc-per-concern)

Najpopularniejszy pattern z community. HumanLayer blog (https://www.humanlayer.dev/blog/writing-a-good-claude-md) rekomenduje:

```
agent_docs/
├── building_the_project.md
├── running_tests.md
├── code_conventions.md
├── service_architecture.md
├── database_schema.md
└── service_communication_patterns.md
```

W CLAUDE.md nie importujesz wszystkich przez `@`; zamiast tego listujesz z 1-zdaniowym opisem i instruujesz Claude zeby sam wybral ktory przeczytac:

> "Include a list of these files with a brief description of each, and instruct Claude to decide which (if any) are relevant and to read them before it starts working."

Zalety: nie zjadasz kontekstu na starcie; Claude czyta tylko te pliki ktore potrzebuje dla biezacego taska. Wada: Claude moze czasem pominac relevantny plik (brak enforcement).

### 3.2 Per audience

Osobne pliki dla roznych audytorow:

- `CLAUDE.md` - dla Claude Code
- `AGENTS.md` - open standard dla innych AI agents (Cursor, Copilot, Codex)
- `README.md` - dla ludzi

Anthropic rozumie potrzebe:

> "Claude Code reads CLAUDE.md, not AGENTS.md. If your repository already uses AGENTS.md for other coding agents, create a CLAUDE.md that imports it so both tools read the same instructions without duplicating them."

Rekomendowany pattern:

```markdown
<!-- CLAUDE.md -->
@AGENTS.md

## Claude Code

Use plan mode for changes under `src/billing/`.
```

Symlink alternative (https://solmaz.io/log/2025/09/08/claude-md-agents-md-migration-guide/):

```bash
mv CLAUDE.md AGENTS.md && ln -s AGENTS.md CLAUDE.md
```

Ale symlinki maja swoje pulapki z git tracking (czasem git traktuje symlink jako plain plik z zawartoscia) - dlatego Onur Solmaz rekomenduje osobny `utils/setup-claude-symlinks.sh` uruchamiany po klonowaniu + wpis `CLAUDE.md` w `.gitignore`.

### 3.3 Per lifecycle

Rozdzielenie persistent vs ephemeral:

- `CLAUDE.md` - persistent (survives compaction, committed do git)
- `plans/CURRENT.md` - ephemeral (aktualny task, wyrzucony po zakonczeniu)
- `CLAUDE.local.md` - local personal (gitignored)

Claude Code docs explicite potwierdzaja co survives compaction:

> "Project-root CLAUDE.md survives compaction: after `/compact`, Claude re-reads it from disk and re-injects it into the session. Nested CLAUDE.md files in subdirectories are not re-injected automatically; they reload the next time Claude reads a file in that subdirectory."

Implikacja dla splitting: **ephemeral** pliki (plans/CURRENT.md) NIE powinny byc importowane do CLAUDE.md przez @, bo po /compact ich zawartosc sie roznic od tego co Claude pamieta. Zamiast tego: odnos sie tylko z poziomu chatu ("przeczytaj plans/CURRENT.md i wykonaj zadania").

### 3.4 Per path scope (`.claude/rules/`)

Modularna alternatywa dla @imports. Docs:

```
your-project/
├── .claude/
│   ├── CLAUDE.md
│   └── rules/
│       ├── code-style.md
│       ├── testing.md
│       ├── api-design.md
│       └── security.md
```

Kazdy plik moze miec YAML frontmatter `paths:`:

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules
- All API endpoints must include input validation
- Use the standard error response format
```

**Kluczowa roznica vs @imports:** rules bez `paths:` ladowane sa unconditionally na starcie sesji (zjadaja kontekst); rules z `paths:` ladowane **lazownie** tylko gdy Claude czyta pliki pasujace do glob pattern. Token-efficient dla duzych projektow.

Glob syntax: `**/*.ts`, `src/**/*`, `*.md`, `src/**/*.{ts,tsx}` (brace expansion).

### 3.5 Per agent persona (skills/agents)

Wynosz wieksze, zadaniowe procedury do skills/agents zamiast do CLAUDE.md:

> "If an entry is a multi-step procedure or only matters for one part of the codebase, move it to a skill or a path-scoped rule instead."

Skills maja model-invoked activation (YAML `description:` in SKILL.md) - ladowane tylko gdy Claude uzna za relevant. Idealnie pasuje do "how to migrate Prisma schema" lub "how to write integration tests for API routes" - rzeczy ktore nie musza byc w kontekscie *kazdej* sesji.

---

## 4. Plugin CLAUDE.md overlay

### 4.1 Jak plugin sie integruje

Wbrew intuicji **plugin nie dostarcza wlasnego CLAUDE.md** ktory overlayuje project CLAUDE.md. Struktura plugina (https://code.claude.com/docs/en/plugins):

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json         # manifest
├── skills/
│   └── code-review/
│       └── SKILL.md
├── agents/
├── commands/
├── hooks/
│   └── hooks.json
├── .mcp.json
├── .lsp.json
└── settings.json           # default settings
```

Plugin kontrybutuje: skills (namespaced `/plugin-name:skill-name`), agents, commands, hooks, MCP servers, LSP servers, monitors, `settings.json` (z ograniczonymi kluczami `agent` i `subagentStatusLine`). **Brak** `CLAUDE.md` w plugin root - plugin nie dostarcza persistent instructions do kontekstu.

### 4.2 Order ladowania i override

Dla `settings.json`:

> "Settings from `settings.json` take priority over `settings` declared in `plugin.json`. Unknown keys are silently ignored."

Plugin settings nie merguja sie w stylu deep-merge z project `.claude/settings.json`; raczej plugin dostarcza **default** settings ktore sa aktywne gdy plugin jest enabled. Uzytkownik nadal moze override na poziomie local settings.

Dla skills/agents/commands: plugin `skills/` jest namespaced przez `plugin.json.name`. Gdy project i plugin obydwa definiuja skill "review":

- Project: `.claude/skills/review/SKILL.md` -> slash `/review`
- Plugin "security-kit": `security-kit/skills/review/SKILL.md` -> slash `/security-kit:review`

Brak konfliktu; namespacing prevents it.

### 4.3 Gdzie plugin "overlayuje" project

Najczesciej wywierany wplyw: hooks w `hooks/hooks.json`. Plugin hooks **dodaja sie** do project hooks (nie overridujja). Jesli plugin definiuje `PostToolUse` i project tez, obydwa wykonywane sa sekwencyjnie.

Podobnie MCP: plugin `.mcp.json` rejestruje dodatkowe serwery MCP ktore Claude widzi w sesji. Nie override'uje project MCP, tylko rozszerza.

### 4.4 `--plugin-dir` local override

> "When a `--plugin-dir` plugin has the same name as an installed marketplace plugin, the local copy takes precedence for that session."

Wazne dla development flow: mozesz testowac modyfikacje pluginu bez odinstalowania marketplace version.

---

## 5. Monorepo patterns

### 5.1 Base pattern: hierarchiczne discovery

Kluczowy mechanizm z docs:

> "Claude Code reads CLAUDE.md files by walking up the directory tree from your current working directory, checking each directory along the way for `CLAUDE.md` and `CLAUDE.local.md` files. This means if you run Claude Code in `foo/bar/`, it loads instructions from `foo/bar/CLAUDE.md`, `foo/CLAUDE.md`, and any `CLAUDE.local.md` files alongside them."

> "All discovered files are concatenated into context rather than overriding each other."

> "Claude also discovers `CLAUDE.md` and `CLAUDE.local.md` files in subdirectories under your current working directory. Instead of loading them at launch, they are included when Claude reads files in those subdirectories."

Implikacje:
- **Parent directories: eager** (ladowane na starcie)
- **Sibling subdirectories: lazy** (ladowane on-demand)

### 5.2 Kanoniczna struktura (Turborepo/acme-platform)

Z https://github.com/MuhammadUsmanGM/claude-code-best-practices/blob/main/examples/claude-md-monorepo.md:

```
acme-platform/
├── CLAUDE.md                    # Root - global conventions (~150 lines)
├── .claude/
│   ├── settings.json            # team settings
│   ├── settings.local.json      # personal (gitignored)
│   ├── rules/
│   │   ├── code-style.md        # unconditional
│   │   └── testing.md           # paths: "tests/**"
│   └── agents/
│       ├── db-migrator.md
│       └── web-auditor.md
├── packages/
│   ├── api/
│   │   ├── CLAUDE.md            # API-specific (~100 lines)
│   │   └── src/
│   ├── web/
│   │   ├── CLAUDE.md            # Web app-specific
│   │   └── src/
│   ├── shared/
│   │   ├── CLAUDE.md            # Shared lib (WARNING: breaking changes)
│   │   └── src/
│   └── cli/
│       └── src/                 # No CLAUDE.md - inherits root only
└── infrastructure/
    └── terraform/
```

Root CLAUDE.md content (abridged):
- Tech stack: Turborepo, Node 20, pnpm workspaces
- Workspace commands: `pnpm install`, `pnpm build`, `pnpm --filter @acme/api test`
- Universal rules: TS strict, named exports only, no circular deps, workspace:* protocol

Kazdy package CLAUDE.md zaweza scope:
- `packages/api/CLAUDE.md`: Express, Prisma, Zod, port 4000, async error wrapper
- `packages/web/CLAUDE.md`: Next.js 14, Server Components by default, Tailwind, TanStack Query, port 3000
- `packages/shared/CLAUDE.md`: "No runtime dependencies; 100% test coverage; breaking changes affect everything"

### 5.3 Import graph example

Przyklad realistycznego grafu:

```
ROOT CLAUDE.md
  │
  ├─ @AGENTS.md                     (shared open standard)
  │    │
  │    └─ @docs/conventions.md      (linting, typing, naming)
  │         │
  │         └─ @docs/glossary.md    (terms, domain lang)
  │
  ├─ @README.md                     (project overview)
  │
  └─ @docs/workflows.md             (PR process, deploy)

SUBDIR packages/api/CLAUDE.md       (lazy, loaded when cd-ing into api/)
  │
  ├─ @../shared/contracts/api-types.ts  (type contracts)
  │
  └─ @./docs/route-conventions.md
```

Hops od root: `CLAUDE.md (0) -> AGENTS.md (1) -> conventions.md (2) -> glossary.md (3)`. Bezpiecznie w limicie 5.

### 5.4 Alternate: Virtual Monorepo

Medium article (https://medium.com/devops-ai/the-virtual-monorepo-pattern-how-i-gave-claude-code-full-system-context-across-35-repos-43b310c97db8) opisuje pattern dla firm z 35+ repos:

```
workspace/
├── .repos                         # bash clone script
├── CLAUDE.md                      # system reference map
├── README.md                      # architectural narrative
├── services/
│   ├── event-ingestion-service/   # full git repo
│   ├── stream-processor/          # full git repo
│   └── analytics-api/
├── infrastructure/
│   ├── streaming-cluster/
│   └── database-cluster/
└── frontends/
    ├── ops-dashboard/
    └── customer-portal/
```

Kazdy subfolder to **niezalezny git repo** (teams keep their workflows). Root CLAUDE.md opisuje **interconnections**:

```
@services/event-ingestion-service
Publishes normalized events to `events.normalized`

@services/stream-processor
Subscribes to `events.normalized`
Writes results to @infrastructure/database-cluster
```

To pozwala Claude na cross-service reasoning bez modyfikacji workflow poszczegolnych zespolow.

### 5.5 `claudeMdExcludes` dla duzych monorepos

Gdy parent CLAUDE.md of innej druzyny jest irrelevant:

```json
// .claude/settings.local.json
{
  "claudeMdExcludes": [
    "**/monorepo/CLAUDE.md",
    "/home/user/monorepo/other-team/.claude/rules/**"
  ]
}
```

Docs:

> "Patterns are matched against absolute file paths using glob syntax. You can configure `claudeMdExcludes` at any settings layer: user, project, local, or managed policy. Arrays merge across layers."

Wazne: managed policy CLAUDE.md NIE moze byc excluded.

### 5.6 `--add-dir` + env var

Dla prac miedzy-repo:

```bash
CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1 claude --add-dir ../shared-config
```

Wtedy CLAUDE.md z `../shared-config/` tez sie ladluje. Default behaviour: `--add-dir` daje access do plikow, ale CLAUDE.md z tego folderu NIE ladowane. Env var to zmienia.

---

## 6. Layered organization (4 warstwy)

Inspired przez layered ML docs i general systems design, CLAUDE.md ecosystem natural organizuje sie w 4 warstwy:

| Layer | Lokacja | Scope | Typowa tresc | Share |
|-------|---------|-------|-------------|-------|
| **L1 Universal** | `~/.claude/CLAUDE.md` | Ja w kazdym projekcie | Personal coding preferences, polski jezyk flag, hitl-pipeline reflexes | Just me |
| **L2 Project-wide** | `./CLAUDE.md` lub `./.claude/CLAUDE.md` | Ten projekt, caly zespol | Stack, commands, conventions, architecture overview | Team via git |
| **L3 Module-specific** | `./packages/api/CLAUDE.md` lub `.claude/rules/api-design.md` | Submodul / glob scope | Per-service rules, framework-specifics | Team via git, lazy load |
| **L4 Task-specific** | `plans/CURRENT.md`, `docs/migration-v2.md` | Biezacy task/feature | Migration plan, sprint goals, ephemera | Team via git ale short-lived |

### 6.1 Przyklady per warstwe

**L1 Universal** (z context usera Maciej):

```markdown
# Global user instructions

## Research+plans folder standard
Dla projektow non-trivial:
- v{N}/MASTER_PLAN.md
- v{N}/research/R{1..N}_{topic}.md
...

## Agent Architecture (v32.16)
Maciej ma system multi-agent pipeline z 42 presetami...

## Auto-dobor presetu
Gdy uzytkownik opisuje zadanie BEZ presetu, czytaj ~/.claude/PRESET_CATALOG.md...
```

**L2 Project-wide** (z `Agent_Architecture/CLAUDE.md`):

```markdown
# CLAUDE.md - Agent Architecture Designer

## What is this project
Single-HTML visual designer for multi-agent AI systems.
35 agents, 42 presets, PL/EN bilingual.

## Current version
v32.16 "Universal Bilingual"
Source: v32/AGENT_TEAMS_CONFIGURATOR_v32.html
```

**L3 Module-specific** (hypothetical `.claude/rules/html-generation.md`):

```markdown
---
paths:
  - "v32/**/*.html"
  - "generate_*.js"
---

# HTML Generation Rules
- Single-file HTML only, zero dependencies
- Base64 inline SVG for icons
- No <script src="...">; wszystkie JS inline
```

**L4 Task-specific** (`v32.17/plans/MIGRATION.md` - aktualny task):

```markdown
# v32.17 Migration Plan
Cel: ES6 modules + splitting na 3 chunki
Phase 1: ekstrakcja JS do v32.17/js/core.js
Phase 2: ...
```

### 6.2 Loading order i conflicts

Z docs:

> "Within each directory, `CLAUDE.local.md` is appended after `CLAUDE.md`, so when instructions conflict, your personal notes are the last thing Claude reads at that level."

> "User-level rules are loaded before project rules, giving project rules higher priority."

Hierarchia precedentencji (rule of thumb "later > earlier" jesli direct conflict):

1. Managed policy CLAUDE.md (cannot be excluded)
2. User rules (`~/.claude/rules/`)
3. User CLAUDE.md (`~/.claude/CLAUDE.md`)
4. Project CLAUDE.md (parent dir -> closer dir -> cwd)
5. Project rules (`.claude/rules/`)
6. Project CLAUDE.local.md
7. Lazy subdirectory CLAUDE.md (gdy Claude czyta pliki tam)
8. Auto memory (MEMORY.md pierwsze 200 linii / 25KB)
9. Conversation messages

Ale: Claude nie enforce'uje "last write wins" stricte. Konflikty sa rozwiazywane probabilistycznie; docs ostrzegaja:

> "If two rules contradict each other, Claude may pick one arbitrarily."

Rada: dbasz o explicite "override" w nizszym poziomie, np. "THIS RULE OVERRIDES THE GENERAL PYTHON 2-SPACE RULE: In this module use 4 spaces".

---

## 7. Lazy vs eager loading

| Co | Lazy/Eager | Kiedy ladowane |
|----|-----------|----------------|
| `~/.claude/CLAUDE.md` | Eager | Start sesji |
| `./CLAUDE.md` (cwd root) | Eager | Start sesji |
| Parent `../CLAUDE.md` | Eager | Start sesji |
| Subdir `packages/api/CLAUDE.md` (gdy cwd = root) | **Lazy** | Gdy Claude czyta plik w `packages/api/` |
| `@import` inside CLAUDE.md | **Eager** | Expanded przy ladowaniu parent CLAUDE.md |
| `.claude/rules/*.md` bez `paths:` | Eager | Start sesji |
| `.claude/rules/*.md` z `paths:` | **Lazy** | Gdy Claude czyta pliki matching glob |
| Skills (SKILL.md) | Meta-eager + lazy body | Name+desc eager (~100 tokens); body lazy na model invocation |
| Plugin components | Controlled by plugin | Zaleznie od kategorii (skills lazy; hooks always active) |

Implikacje dla token budget:

> "CLAUDE.md files are loaded into the context window at the start of every session, consuming tokens alongside your conversation."

Dla duzego monorepo lean root + lazy subdir CLAUDE.md + path-scoped rules daje drastyczna redukcje kontekstu na starcie. Primer:

- Bez strategie: root CLAUDE.md 2000 linii = ~30000 tokenow eager
- Z strategie: root 200 linii (~3000 tokenow) + 5 subdir x 150 linii (lazy, ~0 tokenow na start) + 3 rules z paths (~0 tokenow)
- **Savings: ~90% startup context**

Dev.to article anvodev (https://dev.to/anvodev/how-i-organized-my-claudemd-in-a-monorepo-with-too-many-contexts-37k7) reported reduction 47k words -> 9k words w main CLAUDE.md (-80%) poprzez przeniesienie scoped content do packages.

**Nuance dla @import:** imports sa eager. Jesli importujesz duzy plik przez @, nie oszczedzasz tokenow - po prostu organizujesz. Dla lazy loading uzywaj subdir CLAUDE.md lub path-scoped rules.

---

## 8. Shared templates (centralized)

### 8.1 `~/.claude/common/` strategia

Najprostsze podejscie: wszystkie user-level shared pliki w `~/.claude/common/`. Przyklad:

```
~/.claude/
├── CLAUDE.md                          # global preferences
├── common/
│   ├── company-standards.md           # firma coding rules
│   ├── ci-cd-conventions.md
│   ├── security-baseline.md
│   └── secret-scan-patterns.md
├── rules/                             # user-level rules (loaded everywhere)
│   ├── preferences.md
│   └── workflows.md
├── commands/                          # personal slash commands
├── skills/
└── agents/
```

Import w `~/.claude/CLAUDE.md`:

```markdown
# Global preferences

@~/.claude/common/company-standards.md
@~/.claude/common/security-baseline.md

## Personal
- Use polish language for internal comments
```

Widzialny w kazdym projekcie.

### 8.2 Private GitHub dla company-wide templates

Workflow dla zespolow (nie-oficjalnie wspierany ale powszechny):

1. Firma tworzy repo `acme-corp/claude-code-standards` (private)
2. Developers klonuja do `~/acme-standards/`
3. Cron / post-receive hook syncuje (git pull)
4. `~/.claude/CLAUDE.md` zawiera:

```markdown
@~/acme-standards/security.md
@~/acme-standards/typescript-conventions.md
@~/acme-standards/git-workflow.md
```

Plus: deweloper moze override w local `./CLAUDE.md` lub `./CLAUDE.local.md`.

### 8.3 Symlinks w `.claude/rules/`

Docs oficjalnie wspieraja:

```bash
ln -s ~/shared-claude-rules .claude/rules/shared
ln -s ~/company-standards/security.md .claude/rules/security.md
```

> "Symlinks are resolved and loaded normally, and circular symlinks are detected and handled gracefully."

Zalety vs @import:
- Pojawiaja sie w `/memory` listingu
- Wspieraja path-scoping (YAML frontmatter w pliku source)
- Mniej hopow (caly katalog = jeden symlink)

### 8.4 Managed policy (enterprise)

Dla IT/DevOps organizacji:

| OS | Path |
|----|------|
| macOS | `/Library/Application Support/ClaudeCode/CLAUDE.md` |
| Linux/WSL | `/etc/claude-code/CLAUDE.md` |
| Windows | `C:\Program Files\ClaudeCode\CLAUDE.md` |

> "This file cannot be excluded by individual settings."

Deploy przez MDM, Group Policy, Ansible, Puppet. Zwykle zawiera:
- Security policies (no secrets in code, data classification)
- Compliance reminders (GDPR, SOC2)
- Company coding standards

NIE nadaje sie do technical enforcement - do tego sluza managed settings (`permissions.deny`). CLAUDE.md = behavioural guidance tylko.

### 8.5 Plugin as template distribution

Najnowszy pattern 2026: plugins jako sposob dystrybucji templates. Plugin moze zawierac:

```
acme-team-kit/
├── .claude-plugin/plugin.json
├── agents/
│   ├── pr-reviewer.md
│   └── security-auditor.md
├── skills/
│   └── deploy/SKILL.md
├── hooks/hooks.json           # pre-commit linter
└── settings.json              # default agent: pr-reviewer
```

Instaluje sie przez plugin marketplace. Plus: plugins sa versioned, shared przez update mechanism. Minus: plugin **nie moze** dostarczyc CLAUDE.md dla projektow ktore go uzywaja.

---

## 9. Konkretne examples (3+ repos)

### 9.1 Example 1: acme-platform (Turborepo + full stack)

Repo: https://github.com/MuhammadUsmanGM/claude-code-best-practices

Struktura opisana w sekcji 5.2. Kluczowe cechy:
- Root 150 linii, tylko universal rules
- 3 package CLAUDE.md (api, web, shared)
- Package `cli/` celowo NIE ma CLAUDE.md (inherits root only)
- Uzyty Prisma + Zod dla walidacji API; Next.js 14 + Tailwind + shadcn dla web; 100% coverage dla shared

### 9.2 Example 2: browser-use (Python + TS monorepo)

Gist: https://gist.github.com/pirate/ef7b8923de3993dd7d96dbbb9c096501

Struktura (browser-use + cloud + bubus + web-ui + workflow-use):

```
browser-use-workspace/
├── CLAUDE.md                      # master: system overview
├── browser-use/                   # independent git repo
│   └── [Python code, uv, pytest]
├── cloud/
│   ├── backend/                   # FastAPI + uv
│   └── frontend/                  # Next.js + yarn
├── bubus/                         # event bus library
├── web-ui/                        # Gradio
└── workflow-use/
    └── ui/                        # npm (different from yarn!)
```

Charakterystyka:
- Kazdy sub-projekt ma wlasny git repo (multi-repo workspace style, nie pure monorepo)
- CLAUDE.md zawiera specyfike na poziomie tooling: "cloud/frontend uses yarn; workflow-use/ui uses npm" (explicit)
- Style conventions zroznicowane per subprojekt: "Tabs for indentation in browser-use and cloud; spaces in bubus" - Claude musi wiedziec
- Testing: "Write failing tests first. Use real objects instead of mocks (except LLM)"

### 9.3 Example 3: claude-md-templates (meta-template repo)

Repo: https://github.com/abhishekray07/claude-md-templates

Struktura:

```
claude-md-templates/
├── README.md
├── global/
│   └── CLAUDE.md                  # template dla ~/.claude/
├── project/
│   ├── nextjs-typescript/CLAUDE.md
│   ├── python-fastapi/CLAUDE.md
│   └── generic/CLAUDE.md
├── local/
│   └── CLAUDE.local.md            # template dla gitignored
├── rules/                         # moduly z path-scoping
│   ├── testing.md
│   ├── api-design.md
│   └── code-style.md
└── workflows/                     # structured planning patterns
```

Workflow: sklonuj repo, symlinkuj lub skopiuj wybrane pliki do nowego projektu. Jest to pattern "templates-as-library" - nie dziala runtime, ale przyspiesza bootstrap nowych projektow.

### 9.4 Example 4: User's own Agent_Architecture repo (self-reference)

Z context codzisiaj:

```
Agent_Architecture/
├── CLAUDE.md                      # project overview (v32 specific)
├── .claude/
│   ├── skills/                    # 35 agent skills (global)
│   └── commands/                  # 42 team presets (global)
├── v32/
│   └── AGENT_TEAMS_CONFIGURATOR_v32.html
├── docs/
│   ├── SKILLS_ARCHITECTURE.md
│   └── ROUTING_SYSTEM.md
└── Research/
    └── research-claude-md-patterns/   # v{N} pattern standard
```

W user's `~/.claude/CLAUDE.md` widac:
- Research+plans folder standard (L1 policy)
- Agent Architecture v32.16 (L1 project-specific ale L1 bo user-persistent)
- Auto-dobor presetu (L1 workflow)

Agent_Architecture `CLAUDE.md` (L2):
- v32 context
- File map
- Documentation links

Nie uzywa `@import` explicite ale `docs/*.md` sa referenced by name. Moglby zostac udoskonalony przez:

```markdown
@docs/SKILLS_ARCHITECTURE.md
@docs/ROUTING_SYSTEM.md
```

---

## 10. Limits i edge cases

### 10.1 Max depth testing

Brak oficjalnego community testu dla "co sie dzieje przy hop 6". Maybe to gap research. Hipoteza na podstawie architektury:
- Loader na kazdym `@` robi `if currentDepth >= 5 return placeholder` lub `silent skip`
- Warning w `/memory` output? Niepotwierdzone

**Action item:** manualne testowanie z lancuchem A -> B -> C -> D -> E -> F -> G, sprawdzic co `/memory` pokazuje.

### 10.2 Circular @import

Unofficial community testing wskazuje na eager detection (analogicznie do skills). Nie zglossone w oficjalnych docs w sekcji memory.

### 10.3 Remote URLs

**NIE wspierane.** Jeden z najczesciej requestowanych features (github issues). Workaround: CI-driven git clone + local import.

### 10.4 `@` w code blocks

Otwarte pytanie: czy `@import` jest parsowany w bloku fenced code?

```markdown
Here is code:
```js
const path = "@some/path";
```
```

Prawdopodobnie NIE jest parsowany (zachowanie jak w markdown renderers). Ale tego w oficjalnych docs nie ma. Testable.

### 10.5 Block-level HTML comments stripping

Useful pattern:

> "Block-level HTML comments (`<!-- maintainer notes -->`) in CLAUDE.md files are stripped before the content is injected into Claude's context."

Czyli mozesz zostawiac notatki dla ludzi w CLAUDE.md bez placenia tokenami:

```markdown
# Project Rules

<!-- Note to future maintainer: dodac sekcje o migracjach gdy backfill zakonczony -->

- Use TypeScript strict mode
```

Comments w code blocks nie sa stripped - zostaja.

### 10.6 `/compact` behavior

> "Project-root CLAUDE.md survives compaction... Nested CLAUDE.md files in subdirectories are not re-injected automatically."

Implikacja: jesli wazna regula jest w `packages/api/CLAUDE.md` i po /compact Claude nie czyta nowego pliku z `packages/api/`, regula znika z kontekstu. Mitigation: duplikuj kluczowe regulki w root CLAUDE.md albo polegaj na re-read triggered by `@` file mention.

### 10.7 Approval dialog at first external import

> "The first time Claude Code encounters external imports in a project, it shows an approval dialog listing the files."

Jesli uzytkownik declines, imports sa trwale wylaczone dla projektu. Nie ma jawnego UI zeby to cofnac. Workaround: edytuj `.claude/settings.local.json` recznie.

### 10.8 CLAUDE.local.md deprecation status

Tricky. GitHub issue #2950 wskazuje ze dokumentacja raz mowi deprecated, raz nie. Obecna dokumentacja (https://code.claude.com/docs/en/memory) nadal go opisuje:

> "For private per-project preferences that shouldn't be checked into version control, create a `CLAUDE.local.md` at the project root. It loads alongside `CLAUDE.md` and is treated the same way."

Czyli - NIE deprecated, dalej dzialajacy. Ale community trend: importy przez `@~/.claude/my-project-preferences.md` sa bardziej portable (dziala w kazdym worktree).

---

## 11. Gaps

Obszary niedokumentowane lub wymagajace empirycznej weryfikacji:

1. **Remote URL imports** - brak oficjalnego wsparcia, niepotwierdzony whether anything like `@https://raw.githubusercontent.com/foo/bar/main/CLAUDE.md` dziala.

2. **Exact error mode przy hop 6+** - czy silent truncation, warning, hard error? Brak spec.

3. **Circular @import error message** - community mowi ze jest detekcja; oficjalna dokumentacja memory NIE wspomina o tym. Jest tylko dla skills i symlinks.

4. **Plugin -> CLAUDE.md overlay** - plugin NIE moze dostarczyc CLAUDE.md; to jest zamierzone ale mogloby byc feature request. Use case: "plugin dla Next.js konfiguruje projekt tak, ze Claude widzi 'Use app router by default'".

5. **@import w CLAUDE.local.md** - czy local tez wspiera imports? Oficjalnie: "loaded alongside CLAUDE.md and is treated the same way" implikuje TAK, ale explicit confirmation brakuje.

6. **Interakcja @import z `claudeMdExcludes`** - jesli excludowany plik jest importowany przez @, czy import rozwiazuje sie czy nie? Prawdopodobnie exclude ma wyzsza rage, ale niepotwierdzone.

7. **Relative path z `..`** - czy `@../../shared/rules.md` jest dozwolone? Prawdopodobnie tak (standard POSIX resolution) ale external-import approval dialog moze sie pojawic.

8. **Max single file size** - czy jest limit na jeden importowany plik? CLAUDE.md mowi "target 200 lines" ale to recommendation. Hard limit nieznany.

9. **Async reload** - czy `/memory` po `/compact` pokazuje zaktualizowana liste (czy moze pokazuje stara)?

10. **Layered order precedence empirical tests** - mamy rules of thumb ale brak formalnej definicji co wygrywa w edge cases (np. user rule `paths: src/api/**` vs project rule bez paths - ktora wygrywa w `src/api/foo.ts`?)

---

## 12. Bibliografia

### Oficjalne Anthropic docs

- **Memory docs (@import section):** https://code.claude.com/docs/en/memory (sekcje: "Import additional files", "How CLAUDE.md files load", "Organize rules with `.claude/rules/`", "Share rules across projects with symlinks")
- **Plugins docs:** https://code.claude.com/docs/en/plugins
- **Common workflows:** https://code.claude.com/docs/en/common-workflows
- **Official blog:** https://claude.com/blog/using-claude-md-files
- **Docs index (meta):** https://code.claude.com/docs/llms.txt

### GitHub Issues (Anthropic repo)

- **#1321** - Monorepo false positive external-import warning: https://github.com/anthropics/claude-code/issues/1321
- **#2950** - Imports vs CLAUDE.local.md (deprecation confusion): https://github.com/anthropics/claude-code/issues/2950
- **#2365** - Feature request: better monorepo support: https://github.com/anthropics/claude-code/issues/2365

### Community examples (repositories)

- **MuhammadUsmanGM/claude-code-best-practices** - acme-platform Turborepo example: https://github.com/MuhammadUsmanGM/claude-code-best-practices/blob/main/examples/claude-md-monorepo.md
- **abhishekray07/claude-md-templates** - meta-template library: https://github.com/abhishekray07/claude-md-templates
- **davila7/claude-code-templates** - community templates: https://github.com/davila7/claude-code-templates
- **browser-use workspace (gist by pirate):** https://gist.github.com/pirate/ef7b8923de3993dd7d96dbbb9c096501

### Dev.to / Medium / blogs

- **anvodev Dev.to** - Monorepo organization (47k -> 9k words): https://dev.to/anvodev/how-i-organized-my-claudemd-in-a-monorepo-with-too-many-contexts-37k7
- **The Prompt Shelf** - Claude Code Monorepo Setup Guide: https://thepromptshelf.dev/blog/claude-code-monorepo-setup/
- **Owen Zanzal (Medium)** - Virtual Monorepo Pattern for 35 repos: https://medium.com/devops-ai/the-virtual-monorepo-pattern-how-i-gave-claude-code-full-system-context-across-35-repos-43b310c97db8
- **HumanLayer blog** - Writing a good CLAUDE.md: https://www.humanlayer.dev/blog/writing-a-good-claude-md
- **Builder.io** - CLAUDE.md guide: https://www.builder.io/blog/claude-md-guide
- **Onur Solmaz** - CLAUDE.md to AGENTS.md migration: https://solmaz.io/log/2025/09/08/claude-md-agents-md-migration-guide/
- **Morphllm** - CLAUDE.md examples 2026: https://www.morphllm.com/claude-md-examples
- **Morphllm** - Reddit what developers say: https://www.morphllm.com/claude-code-reddit
- **Daily Dose of DS** - Anatomy of .claude/: https://blog.dailydoseofds.com/p/anatomy-of-the-claude-folder
- **Steve Kinney course** - Referencing files in Claude Code: https://stevekinney.com/courses/ai-development/referencing-files-in-claude-code
- **Elegant Software** - CLAUDE.md patterns that work: https://www.elegantsoftwaresolutions.com/blog/claude-code-mastery-claude-md-patterns

### Guides / reference

- **claudecodeguides.com** - Circular dependency fix: https://claudecodeguides.com/claude-code-skill-circular-dependency-detected-error-fix/
- **codewithmukesh** - CLAUDE.md for .NET: https://codewithmukesh.com/blog/claude-md-mastery-dotnet/
- **claudefa.st** - Project templates: https://claudefa.st/blog/guide/development/project-templates
- **Sid Saladi substack** - Secret weapon / 60+ templates (paywall): https://sidsaladi.substack.com/p/claude-codes-secret-weapon-the-complete
- **Tessl.io** - AGENTS.md open standard: https://tessl.io/blog/the-rise-of-agents-md-an-open-standard-and-single-source-of-truth-for-ai-coding-agents/
- **deployhq.com** - Configure every AI coding assistant: https://www.deployhq.com/blog/ai-coding-config-files-guide
- **mindstudio.ai** - What is CLAUDE.md: https://www.mindstudio.ai/blog/what-is-claude-md-file-permanent-instruction-manual

---

**Word count:** ~3700 slow
**Confidence level:**
- High (oficjalne docs + community confirm): @import syntax, 5-hop limit, lazy vs eager loading, hierarchical discovery, symlinks, `.claude/rules/` path-scoping, plugin structure, managed policy
- Medium (community tests, nie w oficjalnych docs): circular @import detection w memory loader, error handling for missing imports, CLAUDE.local.md deprecation status
- Low (niepotwierdzone, gaps): remote URL imports, exact error mode at 6+ hops, interakcja @import z claudeMdExcludes, plugin-provided CLAUDE.md
