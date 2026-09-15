---
title: CLAUDE.md Patterns - Writing practices, multi-file organization, integrations
campaign: research-claude-md-patterns
date: 2026-04-17
file: 01_PATTERNS.md
sibling_files: [00_FUNDAMENTALS.md, 02_DECISION_GUIDE.md, 03_MEDIA_PROMPTS.md]
source_of_truth: plans/SYNTHESIS.md
target_reader: developer writing their first or next CLAUDE.md
word_target: 3000-4000
---

# 01 Patterns - Jak pisac CLAUDE.md

Ten plik zaklada ze przeczytales 00_FUNDAMENTALS. Tam jest mental model (instruction stack nie config, 4 tiery, auto-loading, token cost). Tu jest praktyka: co napisac, czego uniknac, jak organizowac multi-file, jak zintegrowac z reszta ekosystemu Claude Code.

## 1. Writing best practices - mid-level abstraction rule

### 1.1 Jaki poziom abstrakcji celujesz

Anthropic memory docs definiuja docelowa tresc jako "facts Claude should hold in every session" (per SYNTHESIS Part 3.1, R4.C7). Poziom operacyjny: **mid-level abstraction**. Nie banaly, nie code-visible detale, ale trwale prawdy ktore swieza Claude potrzebuje zeby zaczac uzyteczna prace.

Przyklady **mid-level facts** (dobrze):

- "This codebase uses pnpm, not npm. Commands like `pnpm install` will fail if you use `npm`."
- "Tests run via `npm test`. Lint runs via `biome check`. CI runs both before merge."
- "Zod is the validation library. Yup in `packages/legacy-api/` is intentional and must stay."
- "Comments, commits, PR descriptions in English. User-facing strings in Polish."

NIE mid-level (zle):

- "Use 2-space indentation" - to praca lintera (per SYNTHESIS Part 3.1, R4.C18).
- "Write clean code" - banal.
- "The `parseUserInput` function in `src/utils.ts` accepts a string and returns a parsed object" - code-visible, redundantne z czytaniem pliku.

### 1.2 Reactive-guardrails framing

Shrivu Shankar formuluje to jako **reactive curation**: buduj CLAUDE.md z rzeczywistych bledow Claude, nie preemptywnie z wszystkiego co sobie wyobrazasz (per SYNTHESIS Part 3.1, R4.C6).

- Gdy Claude sie myli dwa razy w roznych rozmowach na ten sam temat -> kandydat na mid-level fact w CLAUDE.md.
- Gdy Claude sie myli trzy+ razy PO dodaniu reguly do CLAUDE.md -> kandydat na migracje do hooka albo lint rule (R4.C13, three-strikes rule).

To jest dosc radykalne psychologicznie. Instynkt mowi "dodam cos zeby zapobiec" - Shrivu/HumanLayer mowia "nie dodawaj dopoki nie widzisz faktycznego failure". Rezultat: plik pozostaje maly, specyficzny, hand-curated.

## 2. Co wrzucac - osiem kategorii pozytywnych

Wyciagniete z SYNTHESIS Part 3.2 (R4.C1, R4.C7-C9, R4.C27, R7.C22):

1. **Non-guessable commands** - build, test, lint, typecheck, run, migrate. Konkretne invokacje. "`pnpm run test:integration` runs the Postgres-backed suite" (R4.C4 Metabase example).
2. **Tool preferences** - "Use `ripgrep` not `grep`. Use `fd` not `find`. Use `gh` for GitHub API, not `curl`." ETH Zurich study (MEDIUM confidence na liczbe, HIGH na kierunek) zmierzylo 160x effect tool-specific commands na tool usage frequency.
3. **Project conventions** - package manager, test framework, validation library, formatter, kluczowe decyzje architektury z nieoczywistymi tradeoffami.
4. **Directory semantics** - "Business logic w `src/domain/`. Adapters w `src/infra/`. Don't mix them."
5. **File:line reference pointers** - "For deployment rules see `docs/DEPLOY.md`. For on-call runbook see `docs/ONCALL.md`." File:line pointers bija pasted code blocks bo referencje sa zywe a snippety sie starzeja (per SYNTHESIS Part 3.2, R7.C15).
6. **Security/compliance statements** - ale tylko na poziomie advisory. Dla twardych regul patrz sekcja 5 (hooks).
7. **Language/communication conventions** - "Comments and commits in English. Conversation can be mixed PL/EN."
8. **Per-package scope w monorepo root** - "packages/api uses Express + Prisma. packages/web uses Next.js + Prisma. packages/shared is pure TypeScript, no runtime deps." Zbraja lazy subfolder overlay wlasciwym kontekstem.

**Scaffold HumanLayer WHAT/WHY/HOW** dla plikow sub-100-line (R4.C8):
- WHAT - stack, architektura
- WHY - cel, nieoczywisty kontekst
- HOW - workflows, commands

Trzy sekcje, kazda po kilka linii, konkretne, pozytywne.

## 3. Czego NIE wrzucac - dziesiec anti-kategorii

Per SYNTHESIS Part 3.3:

1. **Ephemera** - current sprint plans, TODO lists, task state, "working on feature X this week." Idzie do `plans/`, GitHub issues, scratch files. CLAUDE.md jest timeless (R4.C22).
2. **Sekrety** - API keys, tokens, passwords. CLAUDE.md jest auto-committed. Issue #2142 (czerwiec 2025) - 3 live API keys committed MIMO 150+ liniowej security sekcji (R7.C7). Bezwzglednie uzyj hookow i gitleaks.
3. **Linter-enforceable rules** - indentation, quote style, trailing commas, semicolons, import order. HumanLayer: "Never send an LLM to do a linter's job. LLMs are comparably expensive and incredibly slow compared to traditional linters and formatters." Zamiast tego skonfiguruj Biome/Prettier/ESLint/oxlint (R4.C18, R7.C14).
4. **Code-visible details** - sygnatury funkcji, type shapes, exact implementation. Claude czyta pliki na demand; duplikacja nadyma plik i starzeje sie.
5. **Sprzeczne reguly w roznych sekcjach** - "if two rules contradict each other, Claude may pick one arbitrarily" (R4.C20). Duplikacja nie pomaga compliance, tworzy sprzecznosci.
6. **Emphasis inflation** - IMPORTANT, YOU MUST, CRITICAL, NEVER na kazdym bullecie. Gdy wszystko jest emphasized, nic nie jest. Anthropic: emphasis tuning adherence "when used sparingly" - 2-3 razy max per plik (R4.C19, R4.C24).
7. **Negation-heavy phrasing** - "Do NOT use semicolons" aktywuje koncept semicolons. "Use named exports" bije "no default exports". Restrictions bez alternatives confuse agents (R4.C10, R4.C11).
8. **Pasted code blocks zamiast file:line refs** - snippety sie starzeja, referencje zostaja zywe (R7.C15).
9. **Wszystko co zmienilo sie w ostatnim sprincie** - jesli edytujesz CLAUDE.md tydzien po tygodniu, dziala jako journal, nie konstytucja. Idzie do `docs/CHANGELOG.md` albo GitHub.
10. **`/init` boilerplate zostawiony bez pruningu** - output `/init` to draft. HumanLayer: "Don't use `/init` or auto-generate your CLAUDE.md." Jesli uzyjesz, pruj manualnie. ETH Zurich study (R7.C9) zmierzylo ze auto-generated CLAUDE.md **aktywnie obniza success rates i podnosi koszt okolo 20%** (per SYNTHESIS Part 3.3, R4.C21, R7.C12; MEDIUM confidence na liczby, HIGH na kierunek).

## 4. Rozmiar - framework 30 / 60-100 / 200 linii

CRITIC Konflikt 11 rozstrzyga pozornie sprzeczne rekomendacje jako dwustopniowy framework (per SYNTHESIS Part 3.4):

| Prog | Zrodlo | Znaczenie |
|------|--------|-----------|
| 30 linii | dev.to docat0209 "30-Line Rule" | Extreme minimalism, viable dla solo/simple (R4.C2) |
| 54 linie | Metabase root CLAUDE.md in production | Real-world minimalist benchmark (R4.C4, R7.C18) |
| < 60 linii | HumanLayer target | Najczesciej cytowany 2026 best practice; anegdotyczny raport o poprawie compliance po przepisaniu z ~180 do < 60 (R4.C3, R7.C5, R7.C6) |
| 80 linii | abhishekray07 template rule | Community-observed threshold "Claude zaczyna ignorowac czesci" (R7.C13) |
| < 200 linii | Anthropic soft target | Official ceiling z memory docs: "longer files consume more context and reduce adherence" (R1.C12, R4.C1) |
| 200-300 linii | Reddit complaints ceiling | "Past this Claude reliably ignores content" (R7.C13, R7.C25) |
| 400+ linii | Shrivu Shankar "constitution" | Professional exception, wymaga meticulous curation |
| 600+ linii | Reddit failure reports | "My CLAUDE.md is 600 lines and Claude clearly stopped reading" (R7.C25) |

Operacyjne zalecenia:

- **Root CLAUDE.md: celuj w 60-100 linii.** Empiryczny sweet spot z best-in-class public examples.
- **Hard ceiling: 200 linii** per Anthropic, powyzej ktorego koszt i adherence mierzalnie degraduja.
- **Przy przekroczeniu 80-100 linii rozbijaj:**
  - Path-scoped rules -> `.claude/rules/*.md` z `paths:` frontmatter (lazy).
  - Multi-step procedures -> skills (descriptions zostaja, bodies lazy).
  - Deep documentation -> `docs/*.md` + file:line pointers (NIE `@import` bo to eager-load).
  - Monorepo subsystems -> `packages/*/CLAUDE.md` overlays (lazy).

Matematyka per-inference cost (per SYNTHESIS Part 3.4, R4.C15): 500-tokenowe CLAUDE.md to 500 tokenow na KAZDYM turnie wnioskowania. 2000-liniowe drenuje 25k tokenow z kazdego budgetu - 25% okna 100k przed zadaniem.

## 5. Positive over negative, specific over vague

Dwa style guidelines z silnymi empirycznymi podstawami (per SYNTHESIS Part 3.6):

### 5.1 Positive over negative

LLMs walcza z negacja - prohibited concept zostaje aktywowany mimo wszystko. "Do NOT use semicolons" aktywuje koncept semicolons w attention Claude. Przepisuj pozytywnie z pairowana alternatywa:

| Bad | Good |
|-----|------|
| "Do NOT use semicolons" | "Use ASI; omit trailing semicolons." |
| "NEVER commit secrets" | "Commit only code; secrets go in `.env` (gitignored) loaded via `dotenv`." |
| "Do NOT import from lodash" | "Use native `Array.prototype.*` and optional chaining. When you need something lodash provides, check `src/utils/functional.ts` first." |

### 5.2 Specific over vague

Anthropic: "Use 2-space indentation" bije "Format code properly" (R4.C9). Im bardziej konkretna i weryfikowalna instrukcja, tym bardziej konsekwentnie Claude stosuje.

Konkretne heurystyki:

- Dokladna komenda (nie "run the tests" ale `pnpm test:unit`).
- Dokladna sciezka (nie "check the docs" ale `docs/DEPLOY.md`).
- Specyficzny tool (nie "use a linter" ale `biome check --write`).
- Reguly weryfikowalne ("PR title starts with JIRA ticket ID" jest weryfikowalne; "write good PR titles" nie jest).

Pozytywne + specyficzne + z alternatywami razem produkuja najwyzsze zmierzone compliance rates.

## 6. Multi-file organization

### 6.1 @import - eager, 5 hops, relatywne do pliku

`@path/to/file.md` jest eager-loaded przy launch. Importowane pliki sa expanded i laduja do kontekstu obok parent CLAUDE.md. Maksymalna glebia rekursji: 5 hopow (per SYNTHESIS Part 2.4, R1.C6, R3.C10, R5.C2).

Zasady sciezek:

- **Relatywne** rozwiazuja sie wzgledem pliku zawierajacego import, NIE cwd. Krytyczne dla shared templates w `~/.claude/common/` (R5.C3).
- **Absolute** dozwolone (`@/etc/company/rules.md`).
- **Home-relative** przez `@~/.claude/my-project-instructions.md` udokumentowane i zalecane dla multi-worktree personal overlays (R3.C24, R5.C4).
- **Remote URLs** (`@https://...`) NIE udokumentowane jako supported. Community testing sugeruje silent skip. Workaround: git clone private repo + local import, lub symlinks (R1.C7, R5.C5).

External imports (sciezki poza cwd) triggeruja approval dialog za pierwszym razem. Declined = trwale wylaczone do edycji settings (R1.C20, R3.C30).

Brakujace importy sa **silently skipped**. `@missing.md` zostaje usuniety z injected block bez bledu. Uzyj `/memory` do weryfikacji listy zaladowanych plikow.

`@import` jest **drogi**. Uzywaj dla tresci ktora NAPRAWDE musi byc w kazdej sesji. Dla deep docs na demand uzyj file:line pointer references zamiast (Shrivu "pitch don't embed" model, R4.C25).

### 6.2 `.claude/rules/*.md` z `paths:` frontmatter

Oficjalny system splittowania CLAUDE.md na topic-scoped files. Kluczowe rozroznienie:

**Bez `paths:`** - loaded przy session start z ta sama priorytet co `.claude/CLAUDE.md` (eager). Unscoped rules **przezywaja `/compact` re-injection**. Use case: project-wide conventions ktore nie zaleza od tego jakie pliki sa touched (per SYNTHESIS Part 4.2, R1.C8, R5.C20).

**Z `paths:`** - lazy. Loaded tylko gdy Claude czyta plik pasujacy do glob. Event: `load_reason: 'path_glob_match'`. **NIE przezywaja `/compact`** - reloaduja sie przy nastepnym matching file read.

```yaml
---
paths:
  - "packages/api/**/*.ts"
  - "packages/api/**/*.test.ts"
---

# API conventions
- Use Zod schemas for all request validation
- ...
```

User-level rules (`~/.claude/rules/*.md`) sa loaded **przed** project rules, dajac project rules wyzszy priorytet via tail bias (R1.C22).

Jedna asymetria w docs (CONFLICT-3 z R1): rules maja eksplicytny jezyk priorytetow ("user-level rules are loaded before project rules, giving project rules higher priority"), CLAUDE.md ma tylko "concatenated rather than overriding". Rules feature ma semantyke blizsza config-style precedence; CLAUDE.md pozostaje pure stack.

### 6.3 Monorepo - Turborepo canonical pattern

Kanoniczny Turborepo pattern (per SYNTHESIS Part 4.3, R5.C15) laczy **lean root + per-package overlays**:

```
/repo/
  CLAUDE.md                      # ~150 linii: tech stack, universal rules, package inventory
  .claude/
    rules/
      security.md                # eager, unscoped
      api-style.md               # paths: ["packages/api/**"]
  packages/
    api/
      CLAUDE.md                  # ~60 linii: Express, Prisma, Zod, port 4000
      src/
    web/
      CLAUDE.md                  # ~60 linii: Next.js, Prisma, port 3000
      app/
    shared/
      CLAUDE.md                  # ~30 linii: pure TS, no runtime deps
      src/
```

Jak to laduje:
- Session start w `/repo/`: Managed + User + `/repo/CLAUDE.md` + unscoped rules + CLAUDE.local.md.
- Sibling isolation: praca w `packages/api/` NIE laduje `packages/web/CLAUDE.md` (R2.C11, R5.C11).
- Lazy overlay: pierwszy file read z `packages/api/` triggeruje `load_reason: 'nested_traversal'` i `packages/api/CLAUDE.md` wchodzi do kontekstu.
- Post-compact: root + unscoped rules re-injectuja; nested `packages/*/CLAUDE.md` stracony do nastepnego file read z tego subfolderu.

Empiryczny raport dev.to anvodev (R5.C16): redukcja z 47k words do 9k words w main CLAUDE.md (okolo 80-90% oszczednosci) przez przeniesienie scoped content do packages. **Najwiekszy token-budget win dostepny z multi-file organization.**

Scenariusz konfliktu (R2.C16) ilustracyjny: jesli `packages/legacy-api/CLAUDE.md` mowi "use Yup" a root mowi "use Zod everywhere", praca w legacy-api laduje oba, tail bias + specificity = Yup wygrywa w tym subfolderze, Zod wygrywa wszedzie indziej. Hierarchia dziala poprawnie.

### 6.4 Virtual monorepo (N independent repos)

Rzadziej spotykany pattern dla platform/infra teams z 35+ niezaleznymi repo (R5.C17, SYNTHESIS Part 4.4): `workspace/` directory gdzie kazdy subfolder jest niezaleznym git repo z wlasnym CLAUDE.md, plus root `workspace/CLAUDE.md` opisujacy cross-service interconnections.

Root CLAUDE.md nie moze zakladac istnienia zadnego konkretnego pliku w subfolderach; opisuje system-of-systems na poziomie "payments-service depends on auth-service via gRPC on port 9090." Use case: platform/infra teams reasonujace przez wiele serwisow bez konsolidacji do monorepo. Jedyny pattern w corpusie specyficznie dla tej topologii.

### 6.5 claudeMdExcludes, --add-dir, env var

Trzy settings-level mechanizmy (per SYNTHESIS Part 4.5):

- **claudeMdExcludes** - glob patterns vs absolute paths, konfigurowalne na user/project/local/managed layer. Arrays merguja. Managed policy NIE moze byc wykluczony. Use case: monorepo, exclude `packages/*/CLAUDE.md` dla packages innych teamow.
- **--add-dir** - daje file access do directories poza cwd, ale NIE laduje CLAUDE.md z nich defaultowo. Deliberate design - read access != context pollution.
- **CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1** - env var opt-in na ladowanie CLAUDE.md z `--add-dir` paths. Cross-repo pattern dla shared company rules bez managed policy deployment.

## 7. Integracje z reszta ekosystemu

Z SYNTHESIS Part 5, najkrotszy mozliwy mapping integracji.

### 7.1 Skills - fact-vs-procedure

Canonical rule: **CLAUDE.md dla faktow, skills dla procedur**. Stworz skill gdy kopiujesz ten sam playbook/checklist/multi-step procedure kilka razy, albo gdy sekcja CLAUDE.md urosla w procedure zamiast fact (per SYNTHESIS Part 5.1, R6.C4).

Skills laduja opisy eagerly (cap 1536 chars), bodies lazy na invokacji (R6.C5). Skill body laduje sie tylko gdy uzyty, wiec dlugi reference material kosztuje prawie nic dopoki nie potrzebny.

Rule of thumb: jesli sekcja CLAUDE.md przekracza 20 linii i opisuje multi-step procedure - kandydat na skill. Jesli 20 linii + conventions/facts - split do `.claude/rules/*.md` albo `packages/*/CLAUDE.md`.

**2026 change**: custom commands zostaly **zmergowane** w skills. `.claude/commands/deploy.md` i `.claude/skills/deploy/SKILL.md` oba tworza `/deploy` i dzialaja tak samo (R6.C13). Rozroznienie istnieje tylko jako file-organization convention.

### 7.2 Hooks - deterministic enforcement

Hooks uzupelniaja CLAUDE.md dwojako (per SYNTHESIS Part 5.3):

- Dynamiczny state ktorego CLAUDE.md nie moze dostarczyc (git branch, open PRs, recent changes) -> SessionStart hook z `hookSpecificOutput.additionalContext`.
- Deterministyczne enforcement (bo CLAUDE.md jest advisory) -> PreToolUse/PostToolUse/Stop/PreCommit.

Kluczowe hooki dla CLAUDE.md workflow:

- **SessionStart** - dynamic context injection
- **InstructionsLoaded** - observability on CLAUDE.md/rules loads (cannot block; payload z `load_reason`)
- **PreCompact** - MOZE blokowac compaction (exit code 2 lub JSON `{"decision": "block"}`). Dodany w v2.1.105.
- **PostCompact** - nie moze blokowac. Dobry dla post-compact side effects.
- **CwdChanged** - fires on `cd`. NIE re-walkuje ancestor tree (R3.C06).

Split odpowiedzialnosci: CLAUDE.md = advisory prose dla reasoningu Claude; hooks = deterministic enforcement ktory dziala niezaleznie od decyzji Claude.

### 7.3 MCP - CLAUDE.md hinting convention

W 2026 MCP tool schemas sa **deferred** przy starcie defaultowo. Claude laduje konkretne schemas on demand przez tool search (per SYNTHESIS Part 5.4, R6.C24). Alternatywy: `ENABLE_TOOL_SEARCH=auto` laduje upfront jesli miesci sie w 10% kontekstu; `ENABLE_TOOL_SEARCH=false` laduje wszystko.

Bo schemas sa deferred, CLAUDE.md jest **idiomatycznym miejscem** na hint MCP tool preferences. Przyklad z R6.C_TOOL_PREFS:

> For files under `docs/private/`, prefer `mcp__filesystem__read_file` (handles auth). For GitHub issues/PRs, use `mcp__github__*` rather than raw `gh` CLI.

Konwencja nazewnicza: `mcp__server__tool` z podwojnym underscore. To jest advisory only; dla hard enforcement uzyj `permissions.deny` w settings.

### 7.4 AGENTS.md coexistence via `@AGENTS.md` bridge

CRITIC Konflikt 8 HIGH confidence. Aktualna rzeczywistosc (per SYNTHESIS Part 5.5):

- Claude Code czyta CLAUDE.md, NIE AGENTS.md (R1.C10, R6.C44).
- AGENTS.md jest open standard uzywany przez Cursor, Copilot, Codex, Continue.
- **Oficjalny recommended bridge pattern**: `@AGENTS.md` jako pierwsza linia CLAUDE.md, Claude-specific dodatki ponizej. Oba tools czytaja te same instrukcje bez duplikacji.
- Claude Code NIE rozpoznaje natywnie `.cursorrules`, `.cursor/rules/*.mdc`, `.continuerules`, `.github/copilot-instructions.md` (R6.C43).
- Brak oznak deprecacji CLAUDE.md na rzecz AGENTS.md.

Dla multi-tool workflows bridge pattern unika maintenance burdenu duplikacji konwencji.

### 7.5 Subagenty - TAK laduja CLAUDE.md (z wyjatkami)

Najbardziej DISPUTED claim scope kampanii. R6 rozwiazal z primary citation. CRITIC Konflikt 1 HIGH confidence (per SYNTHESIS Part 5.6):

- **Subagent AUTO-loaduje CLAUDE.md** via cwd walk, tak samo jak main session. Cytat z context-window.md: "The subagent loads CLAUDE.md too. Same file, same content, but it counts against the subagent's context, not yours."
- Subagent **NIE dziedziczy** parent conversation history, parent auto-memory, parent skill descriptions. Laduje CLAUDE.md + MCP + skill setup swiezo (R6.C29).
- Built-in **Explore i Plan** agents **explicytnie SKIPUJA CLAUDE.md** dla mniejszego kontekstu (R6.C28).
- Skills z `context: fork` frontmatter biegaja w subagencie ktory laduje CLAUDE.md (R6.C30).
- Subagents z `skills:` frontmatter field **preloaduja full skill bodies plus CLAUDE.md**, bypassujac normal lazy contract (R6.C30).

**Wniosek**: powszechna misconception "orchestrator must brief subagents on project context" jest polowicznie poprawna. Orchestrator briefuje subagenty na TASK STATE (conversation, co zostalo wlasnie ustalone) - NIE na PROJECT CONVENTIONS (CLAUDE.md obsluguje to automatycznie). Praktycy piszacy "brief every subagent on the entire stack" marnuja tokeny.

### 7.6 Auto memory (MEMORY.md) vs CLAUDE.md

Decision matrix (per SYNTHESIS Part 5.7, R6.C40):

| Wymiar | CLAUDE.md | Auto memory (MEMORY.md) |
|--------|-----------|-------------------------|
| Pisany przez | Ciebie | Claude |
| Content type | Instrukcje i reguly | Learnings i patterns |
| Zakres | Project/user/org | Per working tree |
| Loaded | Every session | Every session (first 200 lines lub 25KB) |
| Typical content | Coding standards, workflows, architecture | Build commands, debugging insights, preferences |

Auto memory jest shared przez wszystkie worktrees i subdirectories w tym samym git repo, ale nie miedzy machines. **Concurrent writes** od dwoch parallel sessions nie maja udokumentowanej atomicity/locking semantyki - undocumented race condition (R3.C19, gap D5).

Rule of thumb: jesli TY NAPISALES deliberately -> CLAUDE.md. Jesli Claude **nauczyl sie** od pracy na repo -> MEMORY.md. Nie edytuj MEMORY.md bez powodu; jesli edytujesz i commitujesz, efektywnie promujesz learned pattern do constitutional rule - co nalezy do CLAUDE.md.

## 8. Community starter templates (5 archetypow)

Z SYNTHESIS Appendix B. Target length: 30-80 linii. Kazdy template zawiera stack-specific non-guessable commands, positive-framed rules, file:line reference pointers (nie pasted code).

### 8.1 TypeScript/React (Next.js + Prisma)

```markdown
# Acme Web

Next.js 15 + Prisma + TypeScript + Biome. pnpm workspace.

## Commands
- `pnpm dev` - Next dev server on :3000
- `pnpm test` - vitest unit + `@testing-library/react`
- `pnpm test:e2e` - Playwright against dev server
- `pnpm db:migrate` - Prisma migrate dev
- `pnpm lint` - Biome check + type-check

## Conventions
- Server components by default. `'use client'` only for interactive.
- Forms: react-hook-form + Zod schema in `src/schemas/`.
- DB access only in `src/server/db/`. Never import `@prisma/client` in client code.
- Use named exports; no default exports.

## Architecture pointers
- Auth: NextAuth v5, see `docs/AUTH.md`
- DB schema: `prisma/schema.prisma`
- API routes: `src/app/api/*/route.ts` pattern

## Before commit
- `pnpm lint` must pass (CI enforces)
- If schema changed, run `pnpm db:migrate`
```

### 8.2 Python ML (uv + polars + PyTorch)

```markdown
# Acme ML

Python 3.12 + uv + polars + PyTorch 2.5. GPU training on 4x A100.

## Commands
- `uv run python train.py` - start training
- `uv run pytest` - unit tests
- `uv run ruff check` - lint
- `uv run mypy src/` - type check

## Conventions
- Use uv for all package operations. pip and poetry are deprecated here.
- DataFrames: polars only. Do not import pandas (we migrated off it).
- Type-annotate public functions. `Any` requires a comment.
- Training config: `configs/*.yaml` via hydra. Never hardcode hyperparams.

## Architecture pointers
- Data pipeline: `src/data/`
- Models: `src/models/`
- Training loop: `src/train.py`
- Eval harness: `scripts/eval.py`

## GPU etiquette
- Check `gpustat` before long runs
- Checkpoint every 1000 steps
```

### 8.3 Rust CLI (cargo + clap)

```markdown
# Acme CLI

Rust 1.84 + cargo + clap v4 derive API.

## Commands
- `cargo build --release` - production binary
- `cargo test` - unit + integration
- `cargo clippy --all-targets -- -D warnings` - lint (CI enforces zero warnings)
- `cargo fmt --check` - format check

## Conventions
- Errors: anyhow for apps, thiserror for libraries.
- CLI: clap derive API only (no builder).
- Logs: tracing + tracing-subscriber. No println! outside examples.
- No unsafe without code review. Document invariants in comment.

## Architecture pointers
- Commands: `src/cmd/*.rs` with `Cmd` enum in `src/cli.rs`
- Library: `src/lib.rs` exports public API
- Integration tests: `tests/*.rs`

## Before commit
- `cargo clippy --all-targets -- -D warnings` must pass
- `cargo fmt --check` must pass
```

### 8.4 Monorepo root (Turborepo + pnpm workspaces)

```markdown
# Acme Platform

Turborepo monorepo. Node 20 + pnpm workspaces.

## Packages
- `packages/api` - Express + Prisma, port 4000
- `packages/web` - Next.js 15, port 3000
- `packages/shared` - pure TS, no runtime deps
- `packages/cli` - Node CLI tool

## Commands (from root)
- `pnpm dev` - all services in parallel (turbo)
- `pnpm test` - all tests
- `pnpm build` - build all
- `pnpm lint` - Biome across all packages

## Conventions
- Every package has its own CLAUDE.md with package-specific rules
- Zod for validation everywhere except `packages/legacy-api` (uses Yup, do not change)
- All cross-package imports via `@acme/*` workspace names
- Commits use conventional-commits + JIRA prefix: `feat(ACME-123): ...`

## Architecture pointers
- API docs: `packages/api/docs/OPENAPI.md`
- Deployment: `docs/DEPLOY.md`

## Before PR
- `pnpm lint && pnpm test` must pass (CI enforces)
```

Kazdy `packages/*/CLAUDE.md` ma 30-60 linii package-specific rules, loaded lazily gdy Claude dotyka plikow w tym package.

### 8.5 Library/SDK (npm publish)

```markdown
# Acme SDK

Published npm library. ESM + CJS dual builds. Node >= 20.

## Commands
- `pnpm build` - tsup ESM + CJS + d.ts
- `pnpm test` - vitest
- `pnpm test:types` - tsd type tests (see `tests/types.test-d.ts`)
- `pnpm release` - changesets publish
- `pnpm api:check` - API Extractor verifies no unexpected breaking changes

## Conventions
- Every export has a tsdoc comment. No comments = no export.
- Breaking changes require changeset `major`. Follow semver strictly.
- Entry point: `src/index.ts` - DO NOT add to exports without API council review
- Tree-shakeable: no side effects at module scope. `"sideEffects": false` in package.json

## Architecture pointers
- Public API surface: see `api-extractor.json` report
- Deprecated exports: search for `@deprecated` tags
- Changesets: `.changeset/*.md`

## Before publish
- `pnpm build && pnpm test && pnpm api:check` all green
- Changeset present for every PR with public change
```

### 8.6 Managed enterprise policy (skeleton)

Deploy via MDM/Group Policy/Ansible do OS-specific sciezki (R1.C19). Ta warstwa **nie moze byc wykluczona** przez `claudeMdExcludes`.

```markdown
# Acme Corp Developer Policy

This instruction file is deployed org-wide and cannot be excluded.

## Licensing
- Only MIT, Apache-2.0, BSD-3-Clause dependencies allowed without review.
- GPL and AGPL dependencies require Legal approval via `#legal-deps` Slack.
- Bundled dependency audits run via `pnpm licenses`.

## Security
- Never write API keys, tokens, or secrets to any file including .env.local.
- Suspected credential leak: immediately notify `#security-incidents` Slack.
- Pre-commit hooks enforce secret-scanning (gitleaks); managed settings deny git push if findings.

## Data handling
- No customer PII in git, in logs, or in test fixtures.
- Production data access requires `sudo acme-prod-access` with audit trail.

## Communication
- Commit messages and PR descriptions: English.
- All generated code: English identifiers and comments.

## Reporting
- Weekly agent-usage dashboard at dashboard.acme-corp.internal/claude-code.
- Issues with Claude Code: `#dev-tools-feedback` Slack.
```

Ta warstwa jest **advisory**. Odpowiadajacy `managed-settings.json` musi wymuszac reguly security przez `permissions.deny` i pre-commit hooks (R2.C15). Duplikuj critical policies w obu - CLAUDE.md dla guidance, settings dla enforcement.

## 9. Five archetypes dominant w corpusie

Z SYNTHESIS Part 7.1 (R7.C2):

1. **Minimalist** (< 30 linii) - Metabase 54-line root wskazuje na `frontend/CLAUDE.md`; LangGraphJS 33 linie z Build/Test + Code Style + Architecture.
2. **Convention-heavy** - LangGraphJS 80-char line width, oxlint, NodeNext imports. Dense specific conventions.
3. **Command-driven** - HumanLayer 88 linii z TODO(0-4) priority system, PERF markers, language-specific conventions. Semantic conventions Claude nie moze zinferowac (R7.C19).
4. **Architecture-focused** - VoltAgent/awesome-claude-code-subagents 10-category orchestration taxonomy. Teams reasonujace przez wiele subsystemow.
5. **Meta-CLAUDE** (outlier) - Karpathy 4 zasady o tym jak agenty powinny myslec. Viral Jan 2026 tweet; Forrest Chang `andrej-karpathy-skills` derivative repo tens of thousands of stars w 2 tygodnie (R7.C3, R7.C4). Zasady Karpathy: think before coding, simplicity first, surgical changes, goal-driven execution.

**Co dziala** (R7.C18, R7.C5, R7.C6):

- **Metabase** ~54 linie, acts as router do domain-specific skills (`clojure-eval`, `clojure-write`, `clojure-review`, `typescript-write`, `typescript-review`) plus explicit pointer do `frontend/CLAUDE.md`. Textbook L3 Structured router.
- **HumanLayer** < 60 linii root z WHAT/WHY/HOW, TODO(0-4) priority system, explicit "TODO(0) should never merge." Anecdotal report: redukcja z ~180 do < 60 linii poprawila convention compliance.
- **LangGraphJS** 33 linie, 3 sekcje, zero fluff. Minimalist benchmark.
- **Karpathy/Forrest Chang meta-CLAUDE** 4 zasady, zero project-specific content. User-level CLAUDE.md applicable do kazdego projektu.

Cechy wspolne tego co dziala: minimal, specific, tool-rich, czesto acts as router do deeper content zamiast zawierac wszystko.

## 10. Co NIE dziala

- 500+ linowe monolity (A1 anti-pattern, sekcja 11 nizej).
- Auto-generated `/init` output committed as-is (A2) - ETH Zurich potwierdzil ze obniza success i podnosi koszt okolo 20%.
- Reddit recurring complaints: "Claude ignores instructions after 2-5 prompts", "My 600-line CLAUDE.md clearly stopped being read", "Duplicated ALWAYS rules still ignored".
- Reguly ignorujace enforcement gap: Issue #2142 committed keys MIMO security section.

Byme8 contrarian essay "You Don't Need a CLAUDE.md" (R7.C24) argumentuje ze dla malych projektow token cost przewaza value, strong naming + tests sa lepsza inwestycja. CRITIC LOW confidence contrarian view. Dla malych projektow sub-30-line CLAUDE.md jest cheap insurance; byme8 najmocniejszy dla single-file scripts.

## 11. Preview - 12 anti-patterns z fixami

Szczegoly w 02_DECISION_GUIDE sekcja "Anti-patterns quick reference". Tu skrotowa lista (per SYNTHESIS Part 6):

| # | Anti-pattern | Core fix |
|---|--------------|----------|
| A1 | 500+ line monolith | Split do `.claude/rules/` + skills + `packages/*/CLAUDE.md` |
| A2 | Auto-generated /init left unpruned | Treat as draft, prune to 60-100 linii |
| A3 | Negacje aktywujace prohibited | Positive phrasing + paired alternative |
| A4 | IMPORTANT na kazdym bullet | Max 2-3 emphasis markers per plik |
| A5 | Ephemera committed | Move do `plans/` lub GitHub issues |
| A6 | Sekrety w CLAUDE.md (Issue #2142) | Pre-commit hook + `permissions.deny` |
| A7 | LLM w roli lintera | Configure Biome/ESLint/oxlint |
| A8 | Sprzeczne reguly w tierach | User-tier as defaults, subfolder overlays explicit |
| A9 | Pasted code blocks | File:line reference pointers |
| A10 | Krytyczna regula w linii 180/300 | Top 5 i bottom 5 linii to cenna real estate |
| A11 | `/memory` traktowany jak live reload | Edit + `/compact` lub restart |
| A12 | Duplikowanie regul dla enforcement | Three-strikes: mov do hooka lub lint |

---

## Dalsze czytanie

- **00_FUNDAMENTALS.md** - mental model, 4 tiery, auto-loading, token cost.
- **02_DECISION_GUIDE.md** - decision trees, anti-patterns detail, troubleshooting table, open questions.
- **03_MEDIA_PROMPTS.md** - video + 3 infografiki dla NotebookLM.
- **../plans/SYNTHESIS.md** - master 11k slow z pelnymi cytatami primary.
- **../research/CRITIC.md** - 12 konfliktow, 8 gaps, 3 top findings.
