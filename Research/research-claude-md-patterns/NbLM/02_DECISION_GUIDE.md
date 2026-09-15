---
title: CLAUDE.md Decision Guide - Where does it go, which pattern, how to debug
campaign: research-claude-md-patterns
date: 2026-04-17
file: 02_DECISION_GUIDE.md
sibling_files: [00_FUNDAMENTALS.md, 01_PATTERNS.md, 03_MEDIA_PROMPTS.md]
source_of_truth: plans/SYNTHESIS.md
target_reader: developer in the middle of work, needs a specific answer fast
word_target: 2000-3000
---

# 02 Decision Guide - Problem X, gdzie to ide

Plik zaklada ze znasz fundamenty (00) i wzorce (01). Tu sa trzy decision trees, top-10 anti-patterns quick-reference, troubleshooting table objaw -> przyczyna -> fix oraz open questions (co zrobic gdy docs milcza).

## 1. Decision tree 1 - Gdzie umiescic konwencje?

```
START: "Chce zeby Claude pamietal o X"
 |
 +-- Czy X jest dynamicznym state (git branch, open PR count, recent changes)?
 |   +-- TAK -> NIE do CLAUDE.md.
 |   |          Uzyj SessionStart hook z hookSpecificOutput.additionalContext
 |   |          (per SYNTHESIS Part 5.3, R1.C25).
 |   +-- NIE -> kontynuuj
 |
 +-- Czy X jest sekretem (API key, token, password)?
 |   +-- TAK -> NIE do CLAUDE.md (Issue #2142 landmark).
 |   |          Sekret do .env + gitleaks pre-commit hook.
 |   |          Advisory w managed policy CLAUDE.md (cannot be excluded).
 |   +-- NIE -> kontynuuj
 |
 +-- Czy X jest regula ktora MUSI zadzialac 100% razy?
 |   +-- TAK -> NIE do CLAUDE.md (70% compliance vs 100% hooks).
 |   |          Uzyj PreToolUse/PostToolUse hook ALBO permissions.deny
 |   |          w settings.json (per SYNTHESIS Part 6.6, R7.C16).
 |   +-- NIE -> kontynuuj (advisory jest OK)
 |
 +-- Czy X jest linter-enforceable (indent, quotes, imports order)?
 |   +-- TAK -> NIE do CLAUDE.md.
 |   |          Configure Biome/ESLint/oxlint. Opcjonalnie 1 linia w CLAUDE.md:
 |   |          "Run `biome check --write` before commits."
 |   +-- NIE -> kontynuuj
 |
 +-- Czy X jest ephemeral (current sprint, TODO, task state)?
 |   +-- TAK -> NIE do CLAUDE.md.
 |   |          Move to plans/CURRENT.md lub GitHub issues.
 |   +-- NIE -> kontynuuj
 |
 +-- Zakres X?
     +-- Personal, all projects -> ~/.claude/CLAUDE.md (User tier)
     +-- Team project-wide -> ./CLAUDE.md (Project tier)
     +-- Personal per-project, nie committed -> ./CLAUDE.local.md (Local tier)
     +-- Org-wide, cannot be excluded -> managed policy
     +-- Only when Claude touches specific files:
     |     +-- Project-wide glob scope -> .claude/rules/X.md z `paths:` frontmatter
     |     +-- Package-specific monorepo -> packages/<pkg>/CLAUDE.md
     +-- Multi-step procedure (playbook, checklist) -> skills/X/SKILL.md
```

### 1.1 Przyklady tego drzewa w akcji

**"Chce zeby Claude uzywal pnpm nie npm w tym repo."**
- Nie dynamic, nie sekret, nie 100% enforcement (advisory OK), nie linter-job, nie ephemeral.
- Zakres: team project-wide -> `./CLAUDE.md`. Linia: "This repo uses pnpm, not npm. `npm install` will fail."

**"Chce zeby Claude NIGDY nie commitowal API keys."**
- To jest 100% enforcement -> NIE do CLAUDE.md jako jedyna warstwa.
- Pre-commit hook + gitleaks + `permissions.deny` w settings.
- DODATKOWO advisory w managed policy (org-wide): "Never write secrets to any file including .env.local."

**"Chce zeby Claude wiedzial jaka jest aktualna wersja package.json."**
- To jest dynamic (package.json moze sie zmienic mid-session). Nie do CLAUDE.md.
- Zamiast tego SessionStart hook lub po prostu Claude przeczyta package.json on demand.

**"Chce zeby Claude zawsze uruchamial testy przed ukonczeniem zadania."**
- Multi-step procedure. Skill, nie CLAUDE.md section.
- `.claude/skills/test-before-done/SKILL.md` z triggerami.

## 2. Decision tree 2 - Hook vs CLAUDE.md vs settings.json

```
START: "Jak wyegzekwowac regule R"
 |
 +-- Jak krytyczne jest compliance 100%?
 |   +-- Bezwzglednie (security, data handling, legal):
 |   |     -> Hook (PreToolUse/PostToolUse/Stop/PreCommit)
 |   |        LUB permissions.deny w settings.json
 |   |        DODATKOWO advisory w CLAUDE.md (nie szkodzi, dokumentuje intent)
 |   +-- Wazne ale nie krytyczne:
 |   |     -> CLAUDE.md (advisory, 70% compliance) + monitoring przez hook (audit only)
 |   +-- Soft preference:
 |         -> CLAUDE.md tylko
 |
 +-- Czy regula zalezy od dynamic state?
 |   +-- TAK (np. "nie deployuj w piatek" - wymaga sprawdzenia dnia tygodnia):
 |   |     -> Hook z skryptem (data, API call, config read)
 |   +-- NIE (static "never import from lodash"):
 |         -> CLAUDE.md advisory + hook enforce jesli krytyczne
 |
 +-- Czy regula powinna byc widoczna dla Claude podczas reasoningu?
 |   +-- TAK ("preferuj Zod schemas w validation"):
 |   |     -> CLAUDE.md (advisory shape's reasoning)
 |   +-- NIE ("deny execution of rm -rf"):
 |         -> Hook lub permissions.deny tylko
 |
 +-- Czy regula jest harness configiem (model, theme, env var, permissions)?
      +-- TAK -> settings.json / settings.local.json
      +-- NIE -> CLAUDE.md lub hook per powyzsze
```

### 2.1 CLAUDE.md vs settings.json - kluczowa granica

**CLAUDE.md**: instrukcje dla Claude (advisory), shape reasoning, NIE enforcement.
**settings.json**: konfiguracja harness Claude Code (deterministic), permissions, env vars, hooks, theme, model.

Anthropic docs: "Settings rules are enforced by the client regardless of what Claude decides to do. CLAUDE.md instructions shape Claude's behavior but are not a hard enforcement layer" (per SYNTHESIS Part 6.6, R6.C15).

Jesli piszesz "Claude should ONLY allow X, Y, Z bash commands" w CLAUDE.md - **jestes w zlej warstwie**. To jest `permissions.allow` w settings.json.

Jesli piszesz "Claude Opus model preferred for heavy reasoning" w CLAUDE.md - **tez zla warstwa**. To jest `model` w settings.json (albo komend routing).

Jesli piszesz "Zod jest validation library w tym repo" w CLAUDE.md - **wlasciwa warstwa**. To jest convention ktora Claude ma wziac pod uwage przy pisaniu kodu.

## 3. Decision tree 3 - Split CLAUDE.md czy zostawic monolit?

```
START: CLAUDE.md size check
 |
 +-- Rozmiar < 60 linii?
 |   -> Zostaw. Sweet spot. Dont split.
 |
 +-- Rozmiar 60-100 linii?
 |   -> Zostaw jesli spojne. Jesli widac mozliwe sekcje do ekstrakcji - split prewencyjnie.
 |
 +-- Rozmiar 100-200 linii?
 |   -> Zaczynac splittowanie:
 |      (a) Czy sa sekcje path-scoped ("w packages/api/...", "dla plikow *.test.ts")?
 |          -> TAK: wyciagnij do .claude/rules/X.md z `paths:` frontmatter (lazy)
 |      (b) Czy sa multi-step procedures (checklisty, playbook)?
 |          -> TAK: wyciagnij do skills/X/SKILL.md (description eager, body lazy)
 |      (c) Czy sa deep documentation sections (how auth works, deployment flow)?
 |          -> TAK: przenies do docs/X.md, w CLAUDE.md tylko file:line pointer
 |      (d) Czy jestes w monorepo?
 |          -> TAK: zacznij packages/*/CLAUDE.md overlays
 |
 +-- Rozmiar 200-500 linii?
 |   -> Above Anthropic soft ceiling. Split agresywnie. Cel: 60-100 linii.
 |
 +-- Rozmiar 500+ linii?
     -> Crisis split. Zacznij od nowa z 30-60 linii
        i dopiero potem add back co rzeczywiscie dzialalo
        (Shrivu's reactive-guardrails approach: reactive do real failures).
```

### 3.1 Post-split validation

Po splittingu:
1. Uruchom sesje test. `/memory` pokazuje co faktycznie zaladowane.
2. Dotknij plik z kazdego subfolderu - zweryfikuj InstructionsLoaded hook firuje z `load_reason: 'nested_traversal'`.
3. Zrob `/compact` - sprawdz ze root + unscoped rules re-inject, a nested gone do nastepnego file read.

### 3.2 Kiedy NIE splittowac

- Projekt 1-file script. Sub-30-line monolit wystarczy.
- Plik jest juz 60-100 linii i spojny - nie dziel dla dzielenia.
- Sekcja ma tylko 5-10 linii - za maly ROI do osobnego pliku.

## 4. Anti-patterns quick reference - top 10 "NIGDY nie rob"

Z SYNTHESIS Part 6, skoncentrowane:

### A1 - 500+ line monolith (bloat)

- **Objaw**: CLAUDE.md 500-2000 linii. "Claude ignoruje czesci."
- **Mechanism**: per-inference cost na kazdym turnie, compliance decay z message count, lost-in-the-middle, instruction budget saturation (per SYNTHESIS Part 6.1).
- **Fix**: split per sekcja 3 powyzej. Target 60-100 linii root.

### A2 - Auto-generated /init left unpruned

- **Objaw**: 400-800 linii wygenerowane przez `/init` i commitowane. File-tree dumps, package.json paraphrases, platitudes.
- **Mechanism**: ETH Zurich study - auto-gen obniza success i podnosi koszt ~20% (per SYNTHESIS Part 6.2, R7.C9, MEDIUM confidence na liczbe).
- **Fix**: prune ruthlessly. Tylko mid-level facts. Usun wszystko co reading repo by ujawnilo.

### A3 - Negacje aktywujace zabronione

- **Objaw**: "Do NOT use semicolons", "NEVER commit secrets", "Do NOT import from lodash."
- **Mechanism**: negation aktywuje prohibited koncept (R4.C10). Restrictions bez alternatives confuse agents (R4.C11).
- **Fix**: positive + paired alternative.
  - Bad: "Do NOT use semicolons" -> Good: "Use ASI; omit trailing semicolons."
  - Bad: "NEVER commit secrets" -> Good: "Commit only code; secrets in .env via dotenv." Plus hook dla enforcement.
  - Bad: "Do NOT import from lodash" -> Good: "Use native Array.prototype + `src/utils/functional.ts`."

### A4 - Emphasis inflation (IMPORTANT na kazdym bullet)

- **Objaw**: IMPORTANT, CRITICAL, YOU MUST, ALWAYS, NEVER na kazdej linii.
- **Mechanism**: emphasis tunes adherence "when used sparingly" (R4.C24). Inflated = nullified signal.
- **Fix**: max 2-3 markerow per plik. Dla reszty uzyj specificity zamiast emphasis.

### A5 - Ephemera committed

- **Objaw**: "Current sprint: Q2 2026 API refactor", "Working on: rate limiting", "TODO: fix bug."
- **Mechanism**: zmienia sie co tydzien. Kazda zmiana invaliduje prompt cache (25% premium). Stale w dniach.
- **Fix**: `plans/CURRENT.md`, GitHub issues/milestones, project tracker.

### A6 - Sekrety i leakage (Issue #2142)

- **Objaw**: API keys w CLAUDE.md, albo security sekcja ignorowana.
- **Mechanism**: Issue #2142 canonical case - commit `09c203e` na `r0bug/YFEvents` czerwiec 2025 committed Gmail app password + Google Maps key + Firecrawl key MIMO 150+ linii security section (R7.C7).
- **Fix**: 
  - Pre-commit hook (PreToolUse on Bash `git commit`) grepujacy sekret-patterns i blokujacy.
  - `permissions.deny` w settings dla dangerous patterns.
  - `sandbox.enabled` dla constrained execution.
  - Managed policy CLAUDE.md dla advisory (cannot be excluded).

### A7 - LLM robiacy prace lintera

- **Objaw**: "Use 2-space indentation", "Single quotes", "Trailing commas", "Imports order."
- **Mechanism**: linter 10,000x tanszy i 100% deterministyczny (R4.C18, R7.C14).
- **Fix**: skonfiguruj linter. Max 1 linia w CLAUDE.md: "Run `biome check --write` before commits."

### A8 - Sprzeczne reguly w tierach

- **Objaw**: user CLAUDE.md "always use pnpm"; project "this repo uses npm."
- **Mechanism**: "if two rules contradict each other, Claude may pick one arbitrarily" (R4.C20). Tail bias + specificity heurystycznie ale nie deterministycznie.
- **Fix**: user-tier rules jako **defaults, nie absolutes**. "Prefer pnpm unless the project specifies otherwise" bije "always use pnpm." W subfolder overlays explicytnie uznaj root: "Root says Zod; this subfolder uses Yup intentionally because legacy migration incomplete."

### A9 - Pasted code blocks zamiast file:line refs

- **Objaw**: CLAUDE.md zawiera 50+ linii code block showing "correct way to X."
- **Mechanism**: snippety starzeja sie przy refactorze. Referencje zostaja zywe (R7.C15). Plus inflacja pliku.
- **Fix**: "For the reducer pattern, see `src/store/reducers/user.ts` (lines 42-60)." Claude czyta na demand i zawsze widzi current code.

### A10 - Duplikowanie regul w hope of enforcement

- **Objaw**: "Napisalem ALWAYS use X 5 razy, Claude nadal uzywa Y."
- **Mechanism**: duplikacja nie poprawia compliance - tworzy sprzecznosci jesli ktorakolwiek kopia rozni sie frazowaniem, nadyma plik, wszystkie reguly driftuja do compliance floor.
- **Fix**: three-strikes rule (R4.C13): "Jesli powiedziales Claude nie rob X trzy razy i nadal to robi, przenies regule z CLAUDE.md do hooka." Napisz regule RAZ, specyficznie, pozytywnie, z alternatywa. Jesli fails repeatedly - escalate do hook lub lint.

## 5. Troubleshooting table - objaw -> przyczyna -> fix

| Objaw | Prawdopodobna przyczyna | Fix |
|-------|-------------------------|-----|
| Claude ignoruje CLAUDE.md po 5-10 wiadomosciach | Compliance decay z message count (Wiegold curve, MEDIUM confidence na numerki). Instruction budget diluted przez dlugie CLAUDE.md. | (a) Przytnij CLAUDE.md do 60-100 linii. (b) `/compact` aby zresetowac prompt cache i forcowac re-injection. |
| Edytowalem CLAUDE.md ale Claude nadal uzywa starej wersji | Edycje sa inert mid-session. `/reload` nie istnieje. `/memory` otwiera do edycji ale nie wymusza re-read (R3.C03, R3.C05). | Uruchom `/compact` (force re-injection z disk) lub restart sesji. |
| `@import` pliku zostal silently zignorowany | Brakujacy plik silently skipped (R5.C9). Albo external import declined at approval dialog. | `/memory` pokaze loaded files. Zweryfikuj path relatywne do containing file, nie cwd. Dla external re-enable w settings. |
| Po `/compact` Claude zapomina nested CLAUDE.md | `/compact` re-injectuje tylko root + unscoped rules; nested i `paths:`-scoped lost (R1.C5). | To jest by design. Nested reload sie przy nastepnym file read z tego subfolderu. |
| Po `--resume` koszty skoczyly 20x | v2.1.62 resume cache regression (Issue #29230) - cicho lamie prompt cache. | Prefer zimny restart nad `--resume` dopoki bug nie zalatany (per SYNTHESIS Part 2.3). |
| Cache wygasa po 5 minutach zamiast 1h | Marzec 2026 TTL regression (Issue #46829) - default ephemeral TTL cicho zregresowal. | Affects all users. Watch for patch. Minimize CLAUDE.md edits aby unikac invalidation. |
| Puste "hi" prompt zjada 53k tokenow | Memory files + system prompt + tools baseline (R3.C07, rzad wielkosci MEDIUM confidence). | Zredukuj CLAUDE.md. `~/.claude/CLAUDE.md` + project + rules to typowo 3-9k z tego. |
| IMPORTANT: OVERRIDE w CLAUDE.md nie dziala w Plan mode | Plan mode system prompt zawiera "This supersedes any other instructions" - CLAUDE.md jest warstwa ponizej (R2.C6, Issue #30634). | Nie walcz z plan mode przez CLAUDE.md. Jesli naprawde potrzebujesz override - wyjdz z plan mode. |
| Subagent nie uzywa konwencji z CLAUDE.md | **False alarm** - subagent LADUJE CLAUDE.md via cwd walk (R6.C28). Ale nie inheritu je parent conversation. Explore/Plan SKIPUJA CLAUDE.md specjalnie. | Jesli to Explore/Plan - by design. Inaczej: zweryfikuj cwd subagenta via InstructionsLoaded hook logging. |
| Issue #2142 style - Claude commited sekret MIMO CLAUDE.md | CLAUDE.md to advisory, 70% compliance. Brak hard enforcement layer. | Pre-commit hook z gitleaks + `permissions.deny` na `git commit` jesli findings. |
| Managed policy CLAUDE.md nie laduje sie | OS-specific path wrong albo file permissions. | macOS `/Library/Application Support/ClaudeCode/CLAUDE.md`, Linux `/etc/claude-code/CLAUDE.md`, Windows `C:\Program Files\ClaudeCode\CLAUDE.md`. Verify przez InstructionsLoaded hook z `memory_type: 'Managed'`. |
| Claude uzyl user CLAUDE.md zasady wbrew project | Tail bias faworyzuje ostatnio zaladowana instrukcje. Project laduje AFTER user, wiec project powinien wygrac - jesli nie, prawdopodobnie specificity: user rule ma konkretniejsze phrasing. | Sformuluj user-tier jako default ("prefer X unless project specifies"), project-tier jako decision ("this project uses Y"). |
| InstructionsLoaded hook nie strzela dla nested CLAUDE.md | Nested laduja sie lazy dopiero przy pierwszym file read z subfolderu. | To jest by design. Dotknij plik z subfolderu - hook strzelizmy z `load_reason: 'nested_traversal'`. |
| Plugin nie widzi CLAUDE.md | Plugin CLAUDE.md NIE istnieje w architekturze (R1.C2, R6.C35). | Zamiast tego: skill z `user-invocable: false` w pluginie - description eager, body lazy. |

## 6. Open questions - co zrobic gdy docs milcza

Z SYNTHESIS Appendix C. Gdy nie mozesz znalezc oficjalnej odpowiedzi:

### OQ-1 Uzytkownik CLAUDE.md re-injectuje po /compact?
**Status**: DISPUTED. R2 claims yes, R3 flags gap, docs unclear.
**Co robic**: Zaloz ze NIE (safer default). Zweryfikuj przez InstructionsLoaded hook z `load_reason: 'compact'` + `memory_type: 'User'`. Do czasu weryfikacji: trzymaj user CLAUDE.md maly zeby niezaleznie od wyniku koszt byl niski.

### OQ-2 Jaki jest hard size limit CLAUDE.md?
**Status**: UNKNOWN. Docs mowia "loaded in full regardless of length" ale jakis hard cap musi istniec.
**Co robic**: Nie testuj wlasnymi skinami. 200-line soft ceiling Anthropic jest good enough target. Jesli musisz wiecej - split.

### OQ-3 Co sie dzieje przy @import hop 6?
**Status**: UNKNOWN. Docs mowia max 5 hops, failure mode undocumented. Community sugeruje silent truncation.
**Co robic**: Nie projektuj graphow importow z > 4 hops aby miec margines. `CLAUDE.md(0) -> AGENTS.md(1) -> conventions.md(2) -> glossary.md(3)` to typical shape safely under limit.

### OQ-4 Czy @import cycles sa detected?
**Status**: INFERRED YES (documented for skills/symlinks, inference dla @import).
**Co robic**: Nie polegaj na cycle detection. Projektuj DAG, nie graph. Jesli circular - restrukturyzuj.

### OQ-5 Czy remote URL imports sa supported?
**Status**: LIKELY NO. Docs milcza, community tests sugeruja silent skip.
**Co robic**: Zaloz NIE. Workaround: git clone repo z shared rules lokalnie, importuj relatywnie. Lub symlinks. Lub managed policy dla company-wide rules.

### OQ-6 Jaki jest ancestor-walk concat order?
**Status**: UNKNOWN. Docs nie specyfikuja root-first vs cwd-first.
**Co robic**: Zalozenie robocze: cwd-first (closest file loaded last = highest tail-bias priority). Zweryfikuj empirycznie przez InstructionsLoaded hook z timestamp logging.

### OQ-9 Precedencja Managed vs Project przy konflikcie?
**Status**: UNKNOWN. "Concat not override" + "picks arbitrarily" - brak deterministycznej odpowiedzi.
**Co robic**: Sformuluj tak aby konfliktu nie bylo. Managed ma absolutne konwencje org-wide (ktore projekty nie maja prawa zmieniac), project ma project-specific conventions. Jesli konflikt - znak projektowej wady architektury.

### OQ-11 Concurrency dla MEMORY.md przy parallel sessions?
**Status**: UNKNOWN. Undocumented race condition.
**Co robic**: Nie zakladaj atomicity. Jesli multiple sessions moga pisac do tej samej MEMORY.md (worktrees, parallel agents), zaprojektuj workflow tak aby tylko jedna sesja byla "authoritative writer", inne read-only.

### OQ-12 Czy `<important if="...">` tag dziala?
**Status**: UNKNOWN. Community invention (HumanLayer), not in docs.
**Co robic**: Nie polegaj. Jesli eksperymentujesz - A/B test with vs without i mierz compliance rates przez InstructionsLoaded + observation.

### OQ-13 Kiedy regula graduuje z CLAUDE.md do skilla?
**Status**: Rule-of-thumb only: 20 linii + multi-step procedure.
**Co robic**: Zasada 20-linii + multi-step to dobry threshold. Jesli sekcja stala sie 3-4 stepow z warunkami -> skill. Jesli to nadal 2-3 punkty konwencji -> zostaw w CLAUDE.md.

### Meta-rule dla open questions

Dla kazdego nieudokumentowanego zachowania: **zaloz safer default**, **weryfikuj empirycznie przez hook**, **nie polegaj na nieudokumentowanych assumptions w production**. Jesli docs milcza, to prawdopodobnie dlatego ze mechanizm moze sie zmienic miedzy wersjami.

## 7. Rapid-fire Q&A (cheat sheet)

| Pytanie | Odpowiedz |
|---------|-----------|
| Root CLAUDE.md lokalizacja? | `./CLAUDE.md` lub `./.claude/CLAUDE.md` (equivalent) |
| Personal rules gdzie? | `~/.claude/CLAUDE.md` |
| Per-project personal gitignored? | `./CLAUDE.local.md` (CLAUDE.local.md NIE deprecated) |
| Org-wide policy? | `/etc/claude-code/CLAUDE.md` (Linux) / OS-specific. Cannot be excluded. |
| Target size root? | 60-100 linii sweet spot. 200 hard ceiling. |
| Jak Claude dostaje CLAUDE.md? | User message AFTER system prompt |
| Override precedencja? | NIE. Concat + tail bias + specificity. Nie ma deterministic resolver. |
| `@import` glebokosc? | Max 5 hops, eager. |
| `@import` sciezki? | Relatywne (do pliku) / absolute / `@~/` home. Remote URL NIE. |
| Live reload CLAUDE.md? | NIE. Edits inert until `/compact` lub restart. `/reload` nie istnieje. |
| Co survives /compact? | Root + unscoped rules re-inject. Nested + `paths:` lost until refetch. |
| Subagent sees CLAUDE.md? | TAK via cwd walk. Explore/Plan SKIP. Brak parent conversation. |
| Plugin CLAUDE.md? | NIE istnieje. Uzyj skill z `user-invocable: false`. |
| AGENTS.md bridge? | `@AGENTS.md` jako pierwsza linia CLAUDE.md, Claude-specific ponizej. |
| Hard enforcement? | Hooks lub `permissions.deny`. NIE CLAUDE.md. ~70% vs ~100%. |
| Managed cannot be excluded? | TAK. Jedyna hard guarantee loading. |
| Emphasis max? | 2-3 markery per plik. Wiecej = nullifies signal. |
| Negacja phrasing? | Avoid. Pozytywne + paired alternative. |
| Monorepo pattern? | Lean root + `packages/*/CLAUDE.md` overlays (lazy). |
| Path-scoped rules? | `.claude/rules/*.md` + YAML `paths:` frontmatter. |
| Per-inference cost? | 1 token CLAUDE.md = 1 token per turn. |
| Observability? | InstructionsLoaded hook, 5 `load_reason` values. |
| Compliance rate? | ~70% CLAUDE.md vs ~100% hooks (community triangulation, HIGH confidence). |
| ETH Zurich finding? | Tool-specific commands 160x effect, auto-gen CLAUDE.md -20% success (MEDIUM confidence na numerki). |

---

## Dalsze czytanie

- **00_FUNDAMENTALS.md** - mental model, 4 tiery, auto-loading, token cost.
- **01_PATTERNS.md** - writing best practices, multi-file, integrations, 5 starter templates.
- **03_MEDIA_PROMPTS.md** - NotebookLM video + 3 infografiki (9.5/10 quality).
- **../plans/SYNTHESIS.md** - master 11k slow.
- **../research/CRITIC.md** - 12 konfliktow, 8 gaps, 3 top findings, confidence matrix.
