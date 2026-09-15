---
researcher: R1_Official_Docs_Primary
campaign: claude-md-patterns-2026
date: 2026-04-17
model: claude-opus-4-7
scope: CLAUDE.md oficjalne zrodla Anthropic (docs.claude.com/code.claude.com, GitHub anthropics/claude-code)
primary_sources:
  - https://code.claude.com/docs/en/memory
  - https://code.claude.com/docs/en/context-window
  - https://code.claude.com/docs/en/hooks
  - https://code.claude.com/docs/en/plugins
  - https://code.claude.com/docs/en/features-overview
  - https://code.claude.com/docs/en/best-practices
  - https://code.claude.com/docs/en/cli-reference
  - https://code.claude.com/docs/en/overview
  - https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md
redirect_note: "docs.claude.com/en/docs/claude-code/* zwraca HTTP 301 -> code.claude.com/docs/en/*. Cytaty URL uzywaja nowej domeny."
words_target: 3000-4500
gaps_flagged: 9
status: DONE
---

# R1: Official Docs - CLAUDE.md Reference

## 1. Abstract

Ten raport zbiera pelny obraz CLAUDE.md z oficjalnych zrodel Anthropic (stan na 2026-04-17, Claude Code v2.1.112 na kanale stabilnym). Obejmuje 4 tiery ladowania (Managed, Project, User, Local), hierarchiczne walkowanie katalogow, lazy-load subfolderow, `@path` import syntax (max 5 hops, relative + absolute + home), interakcje z `/compact` przez `InstructionsLoaded` hook z `load_reason: "compact"`, nowy system `.claude/rules/` z `paths:` frontmatter jako oficjalny mechanizm splittingu, `claudeMdExcludes` do wylaczania CLAUDE.md w monorepo, oraz status `AGENTS.md` (explicit: "Claude Code reads CLAUDE.md, not AGENTS.md"). Flaguje 9 gaps, z ktorych najwazniejsze dotycza dokladnej semantyki precedencji Managed vs Project przy konflikcie, braku oficjalnego max rozmiaru pliku (tylko miekki target 200 linii), oraz niejasnej relacji miedzy plugin `settings.json` a plugin CLAUDE.md (plugin CLAUDE.md nie istnieje jako koncept - tylko `.claude/rules/` w `--add-dir`).

## 2. Definicja i rola w pipeline

CLAUDE.md to plik markdown ktory daje Claude trwale instrukcje dla projektu, osobistego workflow lub calej organizacji. Docs formuluja to tak: "CLAUDE.md files are markdown files that give Claude persistent instructions for a project, your personal workflow, or your entire organization. You write these files in plain text; Claude reads them at the start of every session" [memory.md > "CLAUDE.md files"].

Claude Code rozroznia dwa komplementarne mechanizmy pamieci, obydwa ladowane na starcie kazdej konwersacji:

| Aspekt | CLAUDE.md | Auto memory (`MEMORY.md`) |
| :-- | :-- | :-- |
| Kto pisze | Uzytkownik | Claude sam |
| Zawartosc | Instrukcje, zasady | Odkrycia, patterns |
| Scope | Project, user, org | Per working tree (per repo) |
| Ladowanie | Kazda sesja, pelna tresc | Kazda sesja, `first 200 lines or 25KB` |
| Zastosowanie | Coding standards, workflows, architecture | Build commands, debugging insights, discovered preferences |

Source: memory.md sekcja "CLAUDE.md vs auto memory".

Kluczowa dystynkcja z docs: "Claude treats them as context, not enforced configuration. The more specific and concise your instructions, the more consistently Claude follows them" [memory.md > "CLAUDE.md vs auto memory"]. To oznacza ze CLAUDE.md to miekka warstwa wplywu, nie hard policy. Dla hard enforcement sluzy warstwa settings (`permissions.deny`, `sandbox.enabled`, `forceLoginMethod`).

Pozycja w context window na starcie sesji (dane z interaktywnej wizualizacji `/en/context-window`, reprezentatywne wartosci liczb):

1. System prompt (~4200 tok) - zawsze pierwszy
2. Auto memory `MEMORY.md` (~680 tok, cap 200 linii / 25KB)
3. Environment info (cwd, platform, shell, git branch) (~280 tok)
4. MCP tool names (deferred) (~120 tok)
5. Skill descriptions (~450 tok) - NIE przezywa `/compact`
6. `~/.claude/CLAUDE.md` (~320 tok)
7. Project CLAUDE.md (~1800 tok) - zalecenie <200 linii
8. Pierwszy user prompt

Source: code.claude.com/docs/en/context-window, ContextWindow EVENTS table.

Techniczna wazna uwaga z Troubleshoot: "CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself. Claude reads it and tries to follow it, but there's no guarantee of strict compliance, especially for vague or conflicting instructions" [memory.md > "Claude isn't following my CLAUDE.md"]. Dlatego dla hard constraints oficjalnie poleca sie `--append-system-prompt` albo hooks.

## 3. 3 tiery plus Managed i Local (paths + discovery)

Docs dokumentuja **cztery** scope'y CLAUDE.md, nie trzy. Piaty kandydat - plugin CLAUDE.md - nie istnieje (patrz sekcja 3.5).

### 3.1 Managed policy CLAUDE.md (organization)

| OS | Path |
| :-- | :-- |
| macOS | `/Library/Application Support/ClaudeCode/CLAUDE.md` |
| Linux + WSL | `/etc/claude-code/CLAUDE.md` |
| Windows | `C:\Program Files\ClaudeCode\CLAUDE.md` |

Source: memory.md > "Choose where to put CLAUDE.md files" + "Deploy organization-wide CLAUDE.md".

Cel: "Organization-wide instructions managed by IT/DevOps". Deploy przez MDM, Group Policy, Ansible. Krytyczna wlasciwosc: "Managed policy CLAUDE.md files cannot be excluded. This ensures organization-wide instructions always apply regardless of individual settings" [memory.md > "Exclude specific CLAUDE.md files"].

### 3.2 Project CLAUDE.md

Sciezki (obie rowne semantycznie): `./CLAUDE.md` lub `./.claude/CLAUDE.md` [memory.md > "Set up a project CLAUDE.md"].

Cel: team-shared via source control. Komenda startowa: `/init`. Od wersji z flagi `CLAUDE_CODE_NEW_INIT=1` `/init` uruchamia interaktywny multi-phase flow ktory pyta ktore artefakty stworzyc (CLAUDE.md, skills, hooks) i robi codebase exploration przez subagent przed wyprodukowaniem propozycji [memory.md > "Set up a project CLAUDE.md"].

### 3.3 User CLAUDE.md

Sciezka: `~/.claude/CLAUDE.md` [memory.md > table "Choose where to put..."].

Cel: "Personal preferences for all projects. Code styling preferences, personal tooling shortcuts. Shared with: Just you (all projects)".

### 3.4 Local CLAUDE.md

Sciezka: `./CLAUDE.local.md` (root repo).

CLAUDE.local.md **istnieje oficjalnie** i jest pierwszo-klasowym obywatelem: "For private per-project preferences that shouldn't be checked into version control, create a `CLAUDE.local.md` at the project root. It loads alongside `CLAUDE.md` and is treated the same way" [memory.md > "Import additional files"]. Zalecenie: dodac do `.gitignore` (robi to automatycznie `/init` z opcja "personal").

Wartosc order merge w obrebie katalogu: "Within each directory, `CLAUDE.local.md` is appended after `CLAUDE.md`, so when instructions conflict, your personal notes are the last thing Claude reads at that level" [memory.md > "How CLAUDE.md files load"]. Czyli w konflikcie wewnatrz directory Local wygrywa nad Project.

Worktree quirk: "If you work across multiple git worktrees of the same repository, a gitignored `CLAUDE.local.md` only exists in the worktree where you created it. To share personal instructions across worktrees, import a file from your home directory instead" [memory.md > "Import additional files"].

### 3.5 Plugin CLAUDE.md - NIE ISTNIEJE

Pluginy **nie** ladauja wlasnych CLAUDE.md. Plugin directory structure [plugins.md > "Plugin structure overview"] obejmuje: `.claude-plugin/plugin.json`, `skills/`, `commands/`, `agents/`, `hooks/hooks.json`, `.mcp.json`, `.lsp.json`, `monitors/`, `bin/`, `settings.json` - bez slotu na CLAUDE.md. Plugin `settings.json` oficjalnie "supports only `agent` and `subagentStatusLine` keys" [plugins.md > "Ship default settings with your plugin"]. Wnioski:

- Plugin nie rozszerza CLAUDE.md
- Plugin rozszerza kontekst przez skills (on-demand) + hooks (side effects) + agents (custom subagents)
- Jesli zespol chce enforce reguly przez pluginy, robi to przez skills z `disable-model-invocation: false` ktore ladauja descriptions do prompta, albo przez hooks

Flag gap (sekcja 11): docs nie mowia co sie stanie jesli uzytkownik wrzuci plik `CLAUDE.md` do katalogu plugina. Prawdopodobnie jest ignorowany, ale nie ma explicit confirmation.

### 3.6 Precedencja: "More specific wins"

Docs mowia: "More specific locations take precedence over broader ones" [memory.md > "Choose where to put CLAUDE.md files"]. Praktycznie oznacza to kolejnosc od najogolniejszej do najbardziej specyficznej: Managed > User > Project > Local (w obrebie tego samego katalogu).

ALE kluczowe sformulowanie: "All discovered files are concatenated into context rather than overriding each other" [memory.md > "How CLAUDE.md files load"]. Czyli nie jest to override - wszystkie wchodza do kontekstu, a "precedencja" jest emergent: Claude czyta Local jako ostatnie w danym katalogu, wiec ma najswiezsze w pamieci.

Dla `.claude/rules/` regula jest odwrotna: "User-level rules are loaded before project rules, giving project rules higher priority" [memory.md > "User-level rules"]. Czyli sekwencja ladowania jest taka sama (ogolne -> specyficzne), ale wyraznie nazwana jako priority.

### 3.7 Hierarchical loading (walk up + lazy-load down)

Mechanizm oficjalny: "Claude Code reads CLAUDE.md files by walking up the directory tree from your current working directory, checking each directory along the way for `CLAUDE.md` and `CLAUDE.local.md` files. This means if you run Claude Code in `foo/bar/`, it loads instructions from `foo/bar/CLAUDE.md`, `foo/CLAUDE.md`, and any `CLAUDE.local.md` files alongside them" [memory.md > "How CLAUDE.md files load"].

Lazy-load w dol: "Claude also discovers `CLAUDE.md` and `CLAUDE.local.md` files in subdirectories under your current working directory. Instead of loading them at launch, they are included when Claude reads files in those subdirectories" [memory.md > "How CLAUDE.md files load"].

Dodatkowe katalogi: domyslnie `--add-dir` NIE laduje CLAUDE.md. Aby wlaczyc trzeba env var:
```bash
CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1 claude --add-dir ../shared-config
```
[memory.md > "Load from additional directories"]. Wtedy laduje `CLAUDE.md`, `.claude/CLAUDE.md`, `.claude/rules/*.md`, i `CLAUDE.local.md` z dodatkowych sciezek. `CLAUDE.local.md` jest pomijany jesli wykluczysz `local` z `--setting-sources`.

`claude --bare` "Minimal mode: skip auto-discovery of hooks, skills, plugins, MCP servers, auto memory, and CLAUDE.md so scripted calls start faster" [cli-reference.md > `--bare`]. Ustawia tez env var `CLAUDE_CODE_SIMPLE`.

## 4. @import syntax szczegolowo

### 4.1 Format

Skladnia: `@path/to/file.md` - w dowolnym miejscu pliku CLAUDE.md.

Source [memory.md > "Import additional files"]: "CLAUDE.md files can import additional files using `@path/to/import` syntax. Imported files are expanded and loaded into context at launch alongside the CLAUDE.md that references them."

Verbatim przyklad z docs:
```text
See @README for project overview and @package.json for available npm commands for this project.

# Additional Instructions
- git workflow @docs/git-instructions.md
```

### 4.2 Relative vs absolute vs home

"Both relative and absolute paths are allowed. Relative paths resolve relative to the file containing the import, not the working directory" [memory.md].

Explicit obslugiwane formy:
- Relative: `@docs/git-instructions.md`
- Absolute: `@/etc/shared/rules.md` (nieudokumentowany przyklad ale implikowany)
- Home `~/`: "To share personal instructions across worktrees, import a file from your home directory instead: `@~/.claude/my-project-instructions.md`" [memory.md]
- Bez rozszerzenia: `@README` i `@package.json` - widocznie akceptuje paths bez `.md` (README bez rozszerzenia, arbitralne pliki typu JSON)

### 4.3 Max depth i recursion

"Imported files can recursively import other files, with a maximum depth of five hops" [memory.md > "Import additional files"]. Piec hops to jedyny udokumentowany limit. Circular references: docs nie mowia explicite o circular detection dla `@import`, ale wspominaja ze "circular symlinks are detected and handled gracefully" dla `.claude/rules/` - prawdopodobnie podobnie dla CLAUDE.md import, ale to gap (sekcja 11).

### 4.4 Approval dialog

"The first time Claude Code encounters external imports in a project, it shows an approval dialog listing the files. If you decline, the imports stay disabled and the dialog does not appear again" [memory.md Warning callout].

Praktyczna konsekwencja: jesli projekt pierwszy raz odpalony, user musi zaakceptowac imports, potem persistuje. Jesli odrzucil, imports sa martwe dopoki nie wyczysci tego stanu (docs nie mowia gdzie to jest trzymane - gap sekcja 11).

### 4.5 Remote URLs

Docs nie mowia nic o URL-ach jako target `@import`. Tylko paths (relative, absolute, `~/`). Remote `@https://example.com/shared.md` jest najprawdopodobniej **niewspierane** - brak wzmianki w docs. Sekcja plugins sugeruje ze distribucja remote instrukcji idzie przez plugin marketplace, nie przez `@import`. Gap (sekcja 11).

### 4.6 Import wewnatrz code block

"Comments inside code blocks are preserved" [memory.md > "How CLAUDE.md files load"] - dotyczy HTML comments, ale z tego mozna wnioskowac ze code blocks sa respektowane. Czy `@foo` wewnatrz code blocka jest ignorowany (jak w wiekszosci markdown parserow)? Docs nie mowia explicite, ale "expanded and loaded into context" sugeruje pre-processing ktory moze byc niewrazliwy na code blocks. Gap.

## 5. Auto-loading mechanics (timing, cache, re-read triggers)

### 5.1 Session start timeline

Kolejnosc ladowania (wg [context-window.md]) dla CLAUDE.md:
1. System prompt
2. Auto memory (pierwszy fragment MEMORY.md)
3. Env info
4. MCP tool names
5. Skill descriptions
6. `~/.claude/CLAUDE.md` (User)
7. Project CLAUDE.md (`./CLAUDE.md` lub `./.claude/CLAUDE.md`)
8. `CLAUDE.local.md` jesli istnieje (appended after project)
9. `.claude/rules/*.md` bez `paths:` frontmatter
10. Walk-up CLAUDE.md z parent katalogow (concatenated)

Dodatkowe informacje (kolejnosc precyzyjnie): "Within each directory, `CLAUDE.local.md` is appended after `CLAUDE.md`".

Managed CLAUDE.md (tier 1) z docs nie mam explicit kolejnosci, ale "more specific wins" + fakt ze nie da sie wykluczyc sugeruje ze ladowany pierwszy w lancuchu CLAUDE.md (najogolniejszy).

### 5.2 Full content vs truncation

"CLAUDE.md files are loaded in full regardless of length, though shorter files produce better adherence" [memory.md > "How it works" pod Auto memory].

To jest wazna asymetria:
- `MEMORY.md` - truncated do `first 200 lines or 25KB`
- CLAUDE.md - **loaded in full**, bez hard cap

Ale soft cap: "target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence" [memory.md > "Write effective instructions"].

Dlaczego? Bo za duzo tokenow + LLM performance degraduje sie gdy kontekst rosnie. Docs mowia wprost: "Files over 200 lines consume more context and may reduce adherence" [memory.md > "My CLAUDE.md is too large"].

### 5.3 Lazy-load dla subdirectories

Nested CLAUDE.md w podkatalogach **nie** ladauje sie na starcie. "Files in subdirectories load on demand when Claude reads files in those directories" [memory.md > table + "How CLAUDE.md files load"]. Trigger: Read/Grep/Glob na pliku w tym subfolderze.

Consequence dla `.claude/rules/` z `paths:` frontmatter: "Path-scoped rules trigger when Claude reads files matching the pattern, not on every tool use" [memory.md > "Path-specific rules"]. Czyli operacja Bash, czy Write bez uprzedniego Read, moze nie triggerowac laz-load.

### 5.4 Cache prompta a CLAUDE.md

Docs wzmiankuja `--exclude-dynamic-system-prompt-sections`: "Move per-machine sections from the system prompt (working directory, environment info, memory paths, git status) into the first user message. Improves prompt-cache reuse across different users and machines running the same task" [cli-reference.md]. Sugeruje ze CLAUDE.md paths sa per-machine i domyslnie nie sa cache-friendly miedzy roznymi uzytkownikami, ale per-uzytkownik cache dziala normalnie (ten sam prompt prefix = cache hit).

### 5.5 Discovery po `cd` (subfolder change)

Docs nie opisuja explicite co sie dzieje jesli w trakcie sesji zrobisz `cd` (przez Bash tool). Najprawdopodobniej:
- CLAUDE.md z nowego cwd sie NIE re-laduje automatycznie
- Nested lazy-load ciagle dziala bo to trigger na Read

Gap (sekcja 11): co z CLAUDE.md odkrytym gdy sesja startowala w root repo a teraz sie pracuje w `apps/backend/` ktory ma wlasny CLAUDE.md ktory NIE byl na walk-up (bo startowa cwd byla wyzej). Lazy-load wg "files in subdirectories" powinien to zlapac gdy Claude czyta plik w `apps/backend/`.

### 5.6 Token budget mapping

Brak oficjalnej formuly word->token, ale reprezentatywne wartosci z wizualizacji context-window:
- Pelny `~/.claude/CLAUDE.md` ~320 tok
- Project CLAUDE.md ~1800 tok
- Skill description ~450 tok (jedna skill)
- Path-scoped rule ~380 tok

Heurystyka: ~4 char/tok, ~0.75 word/tok dla angielskiego. Dla 200 linii CLAUDE.md = ~2000-3000 tok.

## 6. Interakcja z /compact i hooks

### 6.1 "What survives compaction" tabela oficjalna

Verbatim z [context-window.md > "What survives compaction"]:

| Mechanism | After compaction |
| :-- | :-- |
| System prompt and output style | Unchanged; not part of message history |
| Project-root CLAUDE.md and unscoped rules | Re-injected from disk |
| Auto memory | Re-injected from disk |
| Rules with `paths:` frontmatter | Lost until a matching file is read again |
| Nested CLAUDE.md in subdirectories | Lost until a file in that subdirectory is read again |
| Invoked skill bodies | Re-injected, capped at 5,000 tokens per skill and 25,000 tokens total; oldest dropped first |
| Hooks | Not applicable; hooks run as code, not context |

Source: code.claude.com/docs/en/context-window#what-survives-compaction.

Kluczowe wnioski:
1. Project-root CLAUDE.md jest **re-injected from disk** po compact. To gwarancja.
2. Rules z `paths:` i nested CLAUDE.md **NIE** sa re-injected. Trzeba ponownie czytac matching file.
3. Skills bodies wracaja ale z cap: 5K tokens per skill, 25K total, LRU drop.

### 6.2 Troubleshoot "Instructions seem lost after /compact"

Verbatim [memory.md]: "Project-root CLAUDE.md survives compaction: after `/compact`, Claude re-reads it from disk and re-injects it into the session. Nested CLAUDE.md files in subdirectories are not re-injected automatically; they reload the next time Claude reads a file in that subdirectory. If an instruction disappeared after compaction, it was either given only in conversation or lives in a nested CLAUDE.md that hasn't reloaded yet. Add conversation-only instructions to CLAUDE.md to make them persist."

### 6.3 InstructionsLoaded hook (hooks.md)

Hook event: `InstructionsLoaded`. Fires "when a `CLAUDE.md` or `.claude/rules/*.md` file is loaded into context" [hooks.md].

Payload schema verbatim:
```json
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../transcript.jsonl",
  "cwd": "/Users/my-project",
  "hook_event_name": "InstructionsLoaded",
  "file_path": "/Users/my-project/CLAUDE.md",
  "memory_type": "Project",
  "load_reason": "session_start"
}
```

Pola:
- `file_path` - absolute path
- `memory_type` - jeden z `"User"`, `"Project"`, `"Local"`, `"Managed"`
- `load_reason` - jeden z `"session_start"`, `"nested_traversal"`, `"path_glob_match"`, `"include"`, `"compact"`
- `globs` - obecne tylko dla `path_glob_match`
- `trigger_file_path` - dla lazy loads (ktory plik wywolal)
- `parent_file_path` - dla `include` (import z innego CLAUDE.md)

Bardzo wazne: `load_reason: "compact"` potwierdza ze CLAUDE.md jest re-loadowany po `/compact` i hook odpala ponownie. Matcher Support: "Matches on `load_reason`. Example: `"matcher": "session_start"` fires only for files loaded at session start; `"matcher": "path_glob_match|nested_traversal"` fires only for lazy loads".

Decision control: "InstructionsLoaded hooks have no decision control. They cannot block or modify instruction loading. Use this event for audit logging, compliance tracking, or observability" [hooks.md].

Zastosowanie: audit trail do compliance (gdy Managed CLAUDE.md enforce policy), debugging jakie pliki sie rzeczywiscie zaladowaly.

### 6.4 PreCompact i PostCompact hooks

`PreCompact`:
- Fires "before context compaction"
- Matcher: `"manual"` lub `"auto"`
- Decision control: **exit code 2 blocks compaction**

`PostCompact`:
- Fires "after context compaction completes"
- Matcher: `"manual"` lub `"auto"`
- "Shows stderr to user only (no blocking capability)"

Source: [hooks.md > hooks table].

Wynika z tego ze mozna zbudowac pattern: PreCompact zapisuje snapshot stanu, PostCompact weryfikuje ze CLAUDE.md sie re-loadowalo (obserwujac InstructionsLoaded z `load_reason: "compact"`).

### 6.5 SessionStart hook jako alternatywa dla CLAUDE.md

`SessionStart` hook moze injectowac additionalContext: "Useful for loading development context like existing issues or recent changes to your codebase, or setting up environment variables. For static context that does not require a script, use [CLAUDE.md](/en/memory) instead" [hooks.md]. Payload ma pole `additionalContext`:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "My additional context here"
  }
}
```

Rekomendacja Anthropic: statyczne rzeczy -> CLAUDE.md. Dynamiczne (git status, open issues, env-specific) -> SessionStart hook.

## 7. Format pliku (markdown, frontmatter, comments)

### 7.1 Plain markdown

CLAUDE.md to plik markdown. Docs nie wymagaja konkretnego formatu ale rekomenduja structure:

- Markdown headers (`#`, `##`) i bullets grupuja powiazane instrukcje
- "Claude scans structure the same way readers do: organized sections are easier to follow than dense paragraphs" [memory.md > "Write effective instructions"]

### 7.2 Frontmatter - NIE dla CLAUDE.md

CLAUDE.md **nie** obsluguje YAML frontmatter jako oficjalna funkcja. Frontmatter jest zarezerwowany dla `.claude/rules/` (pole `paths:`). Verbatim przyklad z `.claude/rules/` [memory.md]:

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules

- All API endpoints must include input validation
```

To odroznia `.claude/rules/*.md` od CLAUDE.md. Rules z `paths:` frontmatter sa lazy-loaded. Rules bez `paths:` "are loaded at launch with the same priority as `.claude/CLAUDE.md`" [memory.md > "Set up rules"].

Gap (sekcja 11): Czy CLAUDE.md ignoruje YAML frontmatter na poczatku? Czy go renderuje jako text? Docs nie mowia.

### 7.3 Comments HTML - strip w runtime

"Block-level HTML comments (`<!-- maintainer notes -->`) in CLAUDE.md files are stripped before the content is injected into Claude's context. Use them to leave notes for human maintainers without spending context tokens on them. Comments inside code blocks are preserved. When you open a CLAUDE.md file directly with the Read tool, comments remain visible" [memory.md > "How CLAUDE.md files load"].

Implikacje:
- Mozesz komentowac sekcje dla siebie bez kosztu tokenow
- Komentarze w code blocks sa widoczne dla Claude (uwaga na secrets w code blockach!)
- Tool `Read` widzi komentarze, ale `/memory` injection je strip-uje

### 7.4 Full verbatim example CLAUDE.md z docs

**Example 1: Code style + workflow [best-practices.md]:**
```markdown
# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

**Example 2: Z importami [memory.md + best-practices.md]:**
```markdown
See @README for project overview and @package.json for available npm commands for this project.

# Additional Instructions
- git workflow @docs/git-instructions.md
- Personal overrides: @~/.claude/my-project-instructions.md
```

**Example 3: AGENTS.md re-export pattern [memory.md]:**
```markdown
@AGENTS.md

## Claude Code

Use plan mode for changes under `src/billing/`.
```

**Example 4: Individual preferences z home [memory.md]:**
```markdown
# Individual Preferences
- @~/.claude/my-project-instructions.md
```

## 8. AGENTS.md status

Bezposrednio z docs [memory.md > "AGENTS.md"]:

> "Claude Code reads `CLAUDE.md`, not `AGENTS.md`. If your repository already uses `AGENTS.md` for other coding agents, create a `CLAUDE.md` that imports it so both tools read the same instructions without duplicating them. You can also add Claude-specific instructions below the import."

Konkluzje:
1. `AGENTS.md` **nie jest** wspierany natywnie przez Claude Code
2. `AGENTS.md` **nie jest deprecated** - moze byc uzywany przez inne agenty (Cursor, Copilot, Codex, Aider) a Claude robi re-export via `@AGENTS.md` wewnatrz CLAUDE.md
3. Co-existence pattern: jeden plik `AGENTS.md` jako wspolne zrodlo prawdy dla agentow, plus `CLAUDE.md` ktory go importuje i dodaje Claude-specific sekcje

Oficjalny snippet pattern:
```markdown
@AGENTS.md

## Claude Code

Use plan mode for changes under `src/billing/`.
```

To znaczy: Claude laduje imported AGENTS.md przy session start, potem appenduje reszte CLAUDE.md (ktory moze byc Claude-only).

## 9. CLAUDE.local.md status

CLAUDE.local.md **istnieje oficjalnie** i jest udokumentowany jako Tier 4 (Local) w memory.md. Jest traktowany first-class:

- Ladowany z `CLAUDE.md` w kazdym katalogu na walk-up
- Appendowany po `CLAUDE.md` w obrebie katalogu
- Nested lazy-load dziala tak samo
- `/init` z opcja personal automatycznie dodaje do `.gitignore`
- `/memory` command pokazuje wszystkie zaladowane CLAUDE.local.md
- Moze byc wylaczony przez `--setting-sources` bez `local`

Nie jest to "legacy" ani "deprecated". Jedyna uwaga: "Managed policy CLAUDE.md files cannot be excluded" [memory.md], ale Local moze byc wylaczony lokalnie przez `--setting-sources`.

## 10. Limity i best practices oficjalne

### 10.1 Limity rozmiaru

Brak HARD limitu na CLAUDE.md w docs. Soft targets:

- "target under 200 lines per CLAUDE.md file" [memory.md > "Write effective instructions"]
- "Files over 200 lines consume more context and may reduce adherence" [memory.md > "My CLAUDE.md is too large"]
- Dla MEMORY.md (auto memory): **hard cap** "first 200 lines or 25KB, whichever comes first"
- Skills (po compact): hard cap 5K tokens per skill, 25K tokens total

Gap (sekcja 11): czy po przekroczeniu jakiegos limitu (np. 50KB, 100K tokens) CLAUDE.md jest truncated? Docs sugeruja "loaded in full regardless of length" ale zdrowy rozsadek mowi ze musi byc jakis hard limit. Nie znajdowalem go w docs.

### 10.2 Best practices Anthropic verbatim

Z [best-practices.md > "Write an effective CLAUDE.md"]:

Keep it short:
> "CLAUDE.md is loaded every session, so only include things that apply broadly. For domain knowledge or workflows that are only relevant sometimes, use [skills](/en/skills) instead. Claude loads them on demand without bloating every conversation."

Prune aggressively:
> "Keep it concise. For each line, ask: 'Would removing this cause Claude to make mistakes?' If not, cut it. Bloated CLAUDE.md files cause Claude to ignore your actual instructions!"

Tabela Include/Exclude verbatim:

| Include | Exclude |
| :-- | :-- |
| Bash commands Claude can't guess | Anything Claude can figure out by reading code |
| Code style rules that differ from defaults | Standard language conventions Claude already knows |
| Testing instructions and preferred test runners | Detailed API documentation (link to docs instead) |
| Repository etiquette (branch naming, PR conventions) | Information that changes frequently |
| Architectural decisions specific to your project | Long explanations or tutorials |
| Developer environment quirks (required env vars) | File-by-file descriptions of the codebase |
| Common gotchas or non-obvious behaviors | Self-evident practices like "write clean code" |

Emphasis tuning:
> "You can tune instructions by adding emphasis (e.g., 'IMPORTANT' or 'YOU MUST') to improve adherence."

Treat as code:
> "Treat CLAUDE.md like code: review it when things go wrong, prune it regularly, and test changes by observing whether Claude's behavior actually shifts."

Specificity rules [memory.md > "Write effective instructions"]:
- "Use 2-space indentation" > "Format code properly"
- "Run `npm test` before committing" > "Test your changes"
- "API handlers live in `src/api/handlers/`" > "Keep files organized"

Consistency check:
> "if two rules contradict each other, Claude may pick one arbitrarily. Review your CLAUDE.md files, nested CLAUDE.md files in subdirectories, and .claude/rules/ periodically to remove outdated or conflicting instructions"

### 10.3 "When to add to CLAUDE.md" trigger list

Z [memory.md]:
- "Claude makes the same mistake a second time"
- "A code review catches something Claude should have known about this codebase"
- "You type the same correction or clarification into chat that you typed last session"
- "A new teammate would need the same context to be productive"

### 10.4 Build your setup over time [features-overview.md]

Verbatim tabela triggerow:

| Trigger | Add |
| :-- | :-- |
| Claude gets a convention or command wrong twice | Add it to CLAUDE.md |
| You keep typing the same prompt to start a task | Save it as a user-invocable skill |
| You paste the same playbook or multi-step procedure into chat for the third time | Capture it as a skill |
| You keep copying data from a browser tab Claude can't see | Connect that system as an MCP server |
| A side task floods your conversation with output you won't reference again | Route it through a subagent |
| You want something to happen every time without asking | Write a hook |
| A second repository needs the same setup | Package it as a plugin |

### 10.5 CLAUDE.md vs Rules vs Skills [features-overview.md]

| Aspect | CLAUDE.md | `.claude/rules/` | Skill |
| :-- | :-- | :-- | :-- |
| Loads | Every session | Every session, or when matching files are opened | On demand, when invoked or relevant |
| Scope | Whole project | Can be scoped to file paths | Task-specific |
| Best for | Core conventions and build commands | Language-specific or directory-specific guidelines | Reference material, repeatable workflows |

### 10.6 claudeMdExcludes (monorepo hygiene)

Z [memory.md > "Exclude specific CLAUDE.md files"]:
```json
{
  "claudeMdExcludes": [
    "**/monorepo/CLAUDE.md",
    "/home/user/monorepo/other-team/.claude/rules/**"
  ]
}
```

"Patterns are matched against absolute file paths using glob syntax. You can configure `claudeMdExcludes` at any [settings layer](/en/settings#settings-files): user, project, local, or managed policy. Arrays merge across layers. Managed policy CLAUDE.md files cannot be excluded."

### 10.7 Full verbatim starter template (moj)

Bazujac na docs, minimalny reusable starter:
```markdown
# Project: <name>

## Build & test
- `npm install` - install deps
- `npm test` - run unit tests (prefer single tests, not full suite)
- `npm run typecheck` - run after changes

## Code style
- ES modules only (`import`/`export`)
- 2-space indent
- Destructure imports: `import { foo } from 'bar'`

## Architecture
- API handlers in `src/api/handlers/`
- Shared types in `src/types/`
- Never call external services from UI components

## Workflow
- Typecheck before committing
- Branch: `<username>/<feature>`
- PRs: follow template in `.github/PULL_REQUEST_TEMPLATE.md`

## Imports
- @AGENTS.md (shared agent instructions)
- @docs/testing.md (testing deep-dive)
```

## 11. Gaps / niejasne (flagi dla CRITIC)

G1. **Hard size limit CLAUDE.md**: docs mowia "loaded in full regardless of length" ale na pewno istnieje jakis limit (cache, token budget). Gdzie? Nie znalezione.

G2. **Circular reference w `@import`**: docs potwierdzaja max 5 hops, ale nie mowia o circular detection. Dla symlinks w `.claude/rules/` jest "detected and handled gracefully". Domyslam sie ze `@import` tez ma cycle detection, ale nie ma potwierdzenia.

G3. **Remote URLs w `@import`**: domyslnie niewspierane, ale docs nie mowia wprost "no remote URLs". Mozliwe ze jakas flaga albo env var wlacza to - nie znalezione.

G4. **`@foo` wewnatrz code blocka**: czy jest expanded? Docs milcza. Prawdopodobnie nie (markdown parser), ale nie potwierdzone.

G5. **Discovery po `cd`**: co sie dzieje jesli sesja startowala w root a potem Claude robi cd do subfolder? Czy laduje sie nowy CLAUDE.md? Nested lazy-load powinien zlapac przez Read, ale `cd` samo nie ma tooling event w dokumentacji.

G6. **YAML frontmatter w CLAUDE.md**: czy jest ignorowany? Rendered jako text? Parsed? Docs nie wspominaja. Podejrzewam ze jest po prostu renderowany jako plain text (bo CLAUDE.md nie ma frontmatter schema).

G7. **Co sie dzieje gdy plik CLAUDE.md jest w katalogu plugina**: plugin structure table go nie wymienia. Zakladam ze jest ignorowany, ale nie potwierdzone.

G8. **Precedencja Managed vs Project przy konflikcie**: docs mowia "concatenated not overriding" ale to nie tlumaczy co sie dzieje gdy Managed mowi "never use X" a Project mowi "always use X". Claude "picks arbitrarily" - ale czy jest bias dla Managed?

G9. **Gdzie trzymany jest state "declined imports"**: kiedy uzytkownik odrzuci approval dialog pierwszy raz, docs mowia "the dialog does not appear again". Gdzie to jest zapisane? `.claude/settings.local.json`? Nie znalezione w docs.

## 12. Bibliografia

Wszystkie zrodla oficjalne Anthropic. Nieoficjalne (Reddit, HN, dev blogs) sa zadaniem R7.

### Primary (content-heavy)

1. **memory.md** - `https://code.claude.com/docs/en/memory` (redirect z docs.claude.com/en/docs/claude-code/memory). Kanoniczne zrodlo dla CLAUDE.md. Sekcje cited: "CLAUDE.md vs auto memory", "CLAUDE.md files", "When to add to CLAUDE.md", "Choose where to put CLAUDE.md files", "Set up a project CLAUDE.md", "Write effective instructions", "Import additional files", "AGENTS.md", "How CLAUDE.md files load", "Load from additional directories", "Organize rules with .claude/rules/", "Path-specific rules", "User-level rules", "Manage CLAUDE.md for large teams", "Deploy organization-wide CLAUDE.md", "Exclude specific CLAUDE.md files", "Auto memory", "View and edit with /memory", "Troubleshoot memory issues".

2. **context-window.md** - `https://code.claude.com/docs/en/context-window`. Sekcja "What survives compaction" (tabela verbatim) + interaktywna ContextWindow (kolejnosc ladowania, representative token counts).

3. **hooks.md** - `https://code.claude.com/docs/en/hooks`. InstructionsLoaded hook schema, PreCompact/PostCompact, SessionStart additionalContext.

### Secondary (cross-reference)

4. **best-practices.md** - `https://code.claude.com/docs/en/best-practices`. Sekcja "Write an effective CLAUDE.md" (Include/Exclude tabela, emphasis tuning, prune rule).

5. **features-overview.md** - `https://code.claude.com/docs/en/features-overview`. "Build your setup over time" triggery, CLAUDE.md vs Rules vs Skills, CLAUDE.md vs Skill, MCP vs Skill, feature layering.

6. **cli-reference.md** - `https://code.claude.com/docs/en/cli-reference`. Flagi `--add-dir`, `--setting-sources`, `--bare`, `--append-system-prompt`, `--exclude-dynamic-system-prompt-sections`, env var `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD`.

7. **plugins.md** - `https://code.claude.com/docs/en/plugins`. Plugin structure table (no CLAUDE.md slot), confirmation ze plugin `settings.json` obsluguje tylko `agent` i `subagentStatusLine`.

8. **overview.md** - `https://code.claude.com/docs/en/overview`. Accordion "Customize with instructions, skills, and hooks" - link do /en/memory.

### Tertiary

9. **CHANGELOG.md** - `https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md`. Potwierdzone entries:
   - v2.1.89: "Nested CLAUDE.md files being re-injected dozens of times in long sessions that read many files" (bugfix)
   - Recent versions context: 2.1.112 (current stable), 2.1.111 (auto mode rebind), 2.1.110, 2.1.109, 2.1.108
   - NOTE: Changelog raw file nie zawiera wszystkich historycznych wpisow dla features typu `autoMemoryEnabled`, `claudeMdExcludes`, `InstructionsLoaded`. Te byly zapewne dodane wczesniej a plik byl trimowany.

### Redirect note

URLs docs.claude.com/en/docs/claude-code/* zwracaja HTTP 301 do code.claude.com/docs/en/*. W cytacie uzywam nowej domeny. Stare URLs nadal dzialaja przez redirect.
