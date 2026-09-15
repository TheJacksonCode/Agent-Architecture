---
title: CLAUDE.md Fundamentals - What it is, how it loads, when to use it
campaign: research-claude-md-patterns
date: 2026-04-17
file: 00_FUNDAMENTALS.md
sibling_files: [01_PATTERNS.md, 02_DECISION_GUIDE.md, 03_MEDIA_PROMPTS.md]
source_of_truth: plans/SYNTHESIS.md
target_reader: practitioner meeting CLAUDE.md for the first time
word_target: 2000-3000
---

# 00 Fundamentals - Czym jest CLAUDE.md

## 1. TL;DR - CLAUDE.md w jednym akapicie

CLAUDE.md to NIE jest plik konfiguracyjny. To **stos instrukcji** (instruction stack) doklejany do kazdego promptu jako wiadomosc uzytkownika po system prompt. Claude Code zbiera go z czterech warstw (Managed policy, User, Project, Local) plus mechanizmow pomocniczych (`.claude/rules/*.md`, `@import`, ancestor walk, lazy subfolder overlay) i **konkatenuje**, nie overrajduje. Nic nie "wygrywa" z niczym na poziomie ladowania - konflikty rozstrzyga sam Claude probabilistycznie, z tail bias (ostatnia instrukcja zwykle wygrywa) i specificity (bardziej konkretna bije ogolna). To jedna z najwazniejszych zmian modelu mentalnego dla kogos kto przychodzi z `.eslintrc.json` czy `pyproject.toml` - tam ostatni plik wygrywa deterministycznie, tu nie ma takiego mechanizmu.

## 2. CLAUDE.md to instruction stack, NIE config

### 2.1 Dostarczony jako user message, nie system prompt

Najwazniejszy pojedynczy fakt architektoniczny calego tematu. CLAUDE.md jest doklejany do kontekstu **jako wiadomosc uzytkownika po system promptie**, a nie jako czesc system promptu (per SYNTHESIS Part 1.1, memory docs "Claude isn't following my CLAUDE.md"). Trzy konsekwencje tego faktu, ktorych praktycy notorycznie nie widza:

1. **System-level instructions potrafia nadpisac CLAUDE.md.** Plan mode zawiera w swoim system prompcie zdanie "This supersedes any other instructions". Nawet `IMPORTANT: OVERRIDE` w user CLAUDE.md nie ma wobec tego mocy. Issue #30634 dokumentuje ten efekt i zostal zamkniety bez zmiany API (per SYNTHESIS Part 1.1, R2.C6).
2. **Brak gwarancji strict-compliance.** Docs mowia to wprost: Claude **stara sie** zastosowac do CLAUDE.md, ale nie ma zadnej technicznej gwarancji, zwlaszcza dla wieloznacznych lub sprzecznych regul. Dlatego CLAUDE.md jest zla warstwa dla twardych regul (patrz sekcja 6 nizej i 01_PATTERNS).
3. **Cache breakpoint siedzi na granicy system / messages.** Kazda edycja CLAUDE.md uniewaznia cache prefix od tego miejsca wprzod i uruchamia turn cache-miss z 25% write-rate narzutem (per SYNTHESIS Part 2.6).

Jak raz internalizujesz ten jeden fakt, wszystko inne robi sie czytelne: dlaczego bloat boli (wypelnia user message), dlaczego compliance spada z dlugoscia sesji (user message oddala sie), dlaczego hooks wymuszaja gdzie CLAUDE.md nie potrafi (hooks dzialaja poza petla LLM), dlaczego Plan mode ignoruje override.

### 2.2 Concat, nie override

Memory docs sformulowane verbatim: "All discovered CLAUDE.md files are concatenated into context rather than overriding each other." Wszystkie znalezione pliki laduja do jednego bloku user message. Kolejnosc: Managed -> User -> Project ancestors -> `.claude/CLAUDE.md` -> `.claude/rules/` -> `CLAUDE.local.md` -> lazy subfolder overlay (per SYNTHESIS Part 1.2).

Co wyglada jak "precedencja" jest emergentne z trzech czynnikow:

- **Ordering** (concat order) - ostatni w stos to ten, ktory Claude czytal ostatnio.
- **Tail bias** - LLM ma recency bias przy podazaniu za instrukcjami. Ostatnia instrukcja na temat X zwykle zwycieza gdy sa sprzeczne.
- **Specificity** - konkretne, ograniczone zakresem instrukcje biaja ogolne. "This repo uses npm" wygra z "pnpm preferred" gdy obie sa zaladowane.

Docs eksplicytnie ostrzegaja: "if two rules contradict each other, Claude may pick one arbitrarily." Nie ma deterministycznego resolvera konfliktow. Praktyczna konsekwencja: nie ufaj kolejnosci, unikaj konfliktow w zrodle, nie dubluj regul w nadziei na "wzmocnienie".

## 3. 4-tier model (Managed / User / Project / Local)

Cztery tiery udokumentowane w oficjalnych memory docs, zgodnosc HIGH w czterech z siedmiu raportow (R1, R2, R5, R6; CRITIC Konflikt 2). Nie piec - tier pluginowy NIE istnieje (patrz sekcja 5). Nie trzy - Managed policy jest czesto pomijany w community folklore ale pozostaje jednym z czterech kanonicznych (per SYNTHESIS Part 1.3).

| Tier | Sciezka | Zakres | Dystrybucja |
|------|---------|--------|-------------|
| **Managed policy** | macOS `/Library/Application Support/ClaudeCode/CLAUDE.md`, Linux/WSL `/etc/claude-code/CLAUDE.md`, Windows `C:\Program Files\ClaudeCode\CLAUDE.md` | Org-wide, nie mozna wykluczyc | MDM, Group Policy, Ansible |
| **User** | `~/.claude/CLAUDE.md` | Osobisty, we wszystkich projektach | Dotfile, prywatny |
| **Project** | `./CLAUDE.md` lub `./.claude/CLAUDE.md` | Team-shared przez git | Repo git |
| **Local** | `./CLAUDE.local.md` | Per-project, osobisty, gitignored | `.gitignore` |

Dwie cechy szczegolne:

### 3.1 Managed NIE mozna wykluczyc

`claudeMdExcludes` w settings (user/project/local/managed) NIE dotyczy Managed policy CLAUDE.md. To jedyna warstwa z twarda gwarancja zaladowania niezaleznie od indywidualnych settings (per SYNTHESIS Part 1.3, R1.C14). Wlasciwe zastosowanie: enterprise security/compliance, ktore musi dotrzec do kazdej sesji. Wszystko co jest Managed - dociera. Wszystko ponizej - moze zostac wylaczone przez inzyniera.

### 3.2 CLAUDE.local.md NIE jest deprecated

Community folklore (watki HN, posty dev.to) czasem traktuje CLAUDE.local.md jak przezytek. To nieprawda. Current memory docs potwierdzaja: "It loads alongside CLAUDE.md and is treated the same way" (per SYNTHESIS Part 1.3, CRITIC Konflikt 9 rozstrzygniety na rzecz R5 i R1 primary). Pierwszoklasowy tier.

### 3.3 Plus trzy mechanizmy pomocnicze

Poza czterema tierami sa trzy pomocnicze sposoby wciagania tresci:

- **`.claude/rules/*.md`** z opcjonalnym YAML `paths:` frontmatter - scoped lazy loading po globach. Bez `paths:` = eager z ta sama priorytetem co CLAUDE.md (per SYNTHESIS Part 4.2).
- **`@import`** syntax - maksymalnie 5 hopow rekursji, eager przy launch. Sciezki relatywne rozwiazuja sie wzgledem pliku zawierajacego import (nie cwd), dopuszczalne sa absolute i home-relative `@~/.claude/...` (per SYNTHESIS Part 2.4).
- **Ancestor walk + lazy subfolder overlay** - przy starcie chodzi od cwd do roota filesystem, laduje wszystkie CLAUDE.md po drodze eager; subfoldery **ponizej** cwd laduja dopiero gdy Claude pierwszy raz czyta plik z tego podfolderu (per SYNTHESIS Part 2.1, R2.C11).

To ostatnie (lazy subfolder overlay) to killer feature dla monorepo. `packages/api/CLAUDE.md` nie zajmuje miejsca w kontekscie dopoki nie dotkniesz pliku w `packages/api/`. `packages/web/CLAUDE.md` NIGDY nie pojawi sie gdy pracujesz w `packages/api/`. Sibling isolation jest automatyczna.

## 4. Auto-loading mental model

### 4.1 Session start (cold start)

Przy starcie sesji Claude Code wykonuje w kolejnosci (per SYNTHESIS Part 2.1):

1. **Managed policy** z OS-specific sciezki (jesli istnieje).
2. **User** z `~/.claude/CLAUDE.md`.
3. **User-level rules** z `~/.claude/rules/*.md` (bez `paths:` eager, z `paths:` lazy).
4. **Ancestor walk** - od cwd w gore do roota filesystem, laduje kazdy napotkany CLAUDE.md eager.
5. **Project** `./CLAUDE.md` lub `./.claude/CLAUDE.md`.
6. **Project rules** z `.claude/rules/*.md` (to samo eager/lazy rozroznienie).
7. **CLAUDE.local.md** w cwd, doklejany po CLAUDE.md na tym samym poziomie.

Subfolder CLAUDE.md ponizej cwd: **odkryty ale NIE zaladowany** przy starcie. Ladowanie nastepuje lazy przy pierwszej operacji Claude na pliku z tego subfolderu - wywoluje InstructionsLoaded hook z `load_reason: 'nested_traversal'`.

Typowe token-budgety (per SYNTHESIS Part 2.1, R1.C27):
- `~/.claude/CLAUDE.md` - okolo 320 tokenow
- Project CLAUDE.md - okolo 1800 tokenow
- Per-skill description - okolo 450 tokenow
- Per path-scoped rule - okolo 380 tokenow

Worst-case enterprise monorepo: okolo 9200 tokenow startup (Managed 1600 + User 1600 + User rules 1200 + Project root 2400 + Project rules 2000 + Local 400) - 9-12% okna 100k przed pierwszym zadaniem. Empiryczny pomiar z Issue #19105: pusta wiadomosc "hi" do Claude Code zjada okolo 53k tokenow startowych, z czego memory files 10k-18k (19-34%). CRITIC flagujemy te liczby jako rzad wielkosci, nie precyzyjny budzet, ale trend jest solidny.

### 4.2 Steady state - edits are inert

Edytowanie CLAUDE.md w trakcie sesji NIE powoduje re-read przez Claude. Edycje pozostaja **inert** dopoki nie nastapi event re-injection. Sa tylko dwa takie eventy: session start oraz `/compact`. Komenda `/memory` otwiera CLAUDE.md do edycji ale NIE wymusza re-read (per SYNTHESIS Part 2.2, R3.C05, R3.C28).

To jest asymetria z skills - skills MAJA live change detection, docs mowia: "Claude Code watches skill directories for file changes." CLAUDE.md nie ma odpowiednika (per SYNTHESIS Part 2.2, R3.C25).

Dwie implikacje:

- **`/reload` nie istnieje.** Feature requesty #17127 i #22085 zamkniete jako duplicate w styczniu 2026. Jedyny sposob wymuszenia re-read: `/compact` lub restart sesji (R3.C03).
- **CwdChanged hook** odpala sie przy `cd` ale NIE re-walkuje drzewa ancestrow. Nowe CLAUDE.md z nowego subtree laduja nadal lazy przy nastepnym file read z tego subtree, nie eager (R3.C06).

Dla dynamicznego kontekstu ktory MUSI wejsc w srodku sesji (aktualny git branch, liczba open PRs, recent changes) uzyj SessionStart hook z `hookSpecificOutput.additionalContext` - NIE CLAUDE.md. R1.C25 ujmuje to kanonicznie: "For static context that does not require a script, use CLAUDE.md instead."

### 4.3 /compact - co przezywa, co ginie, co sie re-injectuje

Kanoniczne zrodlo: tabela "What survives compaction" w context-window.md (per SYNTHESIS Part 2.3, R1.C5):

| Item | Po /compact |
|------|-------------|
| Project-root CLAUDE.md + unscoped rules | Re-injected z dysku |
| Rules z `paths:` frontmatter | Stracone do momentu kolejnego file read pasujacego do globa |
| Nested CLAUDE.md w subdirectories | Stracone do momentu kolejnego file read z tego subfolderu |
| Invoked skill bodies | Re-injected, cap 5k tokenow per skill i 25k razem, najstarsze dropowane pierwsze |
| Startup skill listing | Dropped, rebuild przy cwd resolution |
| Auto-memory MEMORY.md | Re-read, pierwsze 200 linii lub 25KB cokolwiek mniejsze |

Concat (jak pliki laduja razem), tail bias (jak Claude rozstrzyga konflikty behavioralnie) i re-injection (co zostaje re-read po compact) to trzy rozne warstwy tego samego systemu - nie mieszaj ich (CRITIC Konflikt 3).

Jedno nierozstrzygniete pytanie: **user CLAUDE.md post-compact**. Tabela wymienia tylko "Project-root CLAUDE.md and unscoped rules". R2 twierdzi ze user survives, R3 flaguje jako gap. CRITIC uznaje ostroznosc R3 za bezpieczniejsza pozycje (confidence MEDIUM). Weryfikacja empiryczna mozliwa przez InstructionsLoaded hook z `load_reason: 'compact'`.

### 4.4 Cache behavior - edycje boli bardziej w 2026

Trzy regresje 2026 ktore wplywaja na CLAUDE.md cache (per SYNTHESIS Part 2.3, CRITIC Konflikt 5):

1. **Feb 5 2026** - Anthropic przeszedl z cache scope org-level na workspace-level. Koledzy z tej samej org nie dziela juz cache entries.
2. **v2.1.62 resume cache regression** (Issue #29230) - sesje ktore przeszly `/compact` maja cichy prompt cache break przy `--resume`, rebuild tokenow od zera na kazdym turnie, do 20x cost spike.
3. **Marzec 2026 TTL regression** (Issue #46829) - default ephemeral cache TTL cicho zregresowal z 1 godziny do 5 minut.

Zbiorcza implikacja: edycje CLAUDE.md sa drozsze w 2026 niz w 2025. Pod regresja v2.1.62+ praktycy powinni preferowac zimny restart nad `--resume` po `/compact` dopoki KV cache bug nie zostanie zalatany.

## 5. Token cost - CLAUDE.md to wydatek na kazdym turnie

Kluczowa linijka z alexop.dev cytowana w SYNTHESIS Part 3.4: **1 token CLAUDE.md to 1 token zuzyty na kazdym turnie wnioskowania, dopoki sesja nie zostanie zamknieta**. 500-tokenowe CLAUDE.md to 500 tokenow per turn. 2000-liniowe CLAUDE.md drenuje okolo 25k tokenow z kazdego budgetu turnu - 25% okna 100k przed jakimkolwiek zadaniem.

**Dodatkowo** - kazda edycja invaliduje cache prefix i uruchamia cache-miss turn z 25% write-rate premium (per SYNTHESIS Part 2.6). Im wiekszy plik, tym wiekszy rewrite cost.

**Dodatkowo** - LLM maja compliance decay z ilosca wiadomosci (per SYNTHESIS Part 3.5, Wiegold compliance curve z atrybucja MEDIUM confidence):
- Wiadomosci 1-2: 95%+ compliance
- Wiadomosci 3-5: 60-80%
- Wiadomosci 6-10: 20-60%
- Powyzej 10: "originaly mostly lost"

**Dodatkowo** - instruction budget jest skonczony. HumanLayer cytuje "frontier thinking LLMs follow 150-200 instructions with reasonable consistency". Claude Code system prompt zjada okolo 50, zostaje okolo 100-150 dla CLAUDE.md. Kazda slaba instrukcja **rozciencza** silne instrukcje proporcjonalnie (R2.C18).

**Dodatkowo** - primacy + recency bias. "Lost in the middle" - informacja pogrzebana w srodku dlugiego kontekstu jest gorzej odpamietywana niz ta na poczatku albo na koncu (R4.C16). Gora i dol CLAUDE.md to cenna real estate; srodek znika.

**Skumulowany wniosek:** im mniejszy CLAUDE.md, tym lepsze compliance, tanszy per-turn, mniejsza kara za edycje. Dlatego community skonwergowalo w 2026 na "less is more" orthodoxy (patrz 01_PATTERNS sekcja o rozmiarze).

## 6. Kiedy CLAUDE.md ma sens, kiedy NIE

### 6.1 Ma sens dla

CLAUDE.md jest wlasciwa warstwa dla:

- **Faktow mid-level abstraction** - prawd ktore Claude powinien pamietac w kazdej sesji na tym repo. Nie banaly ("pisz dobry kod"), nie code-visible detale ("ta funkcja bierze string"), ale trwale fakty ktore swieza Claude potrzebuje zeby zaczac uzyteczna prace (per SYNTHESIS Part 3.1, memory docs).
- **Non-guessable commands** - build, test, lint, typecheck, run, migrate. Konkretne invokacje, nie generycze nazwy.
- **Tool preferences** - "Use `ripgrep` not `grep`. Use `fd` not `find`. Use `gh` not `curl` for GitHub." Instrukcje tool-specific mialy zmierzony 160x efekt w studium ETH Zurich (MEDIUM confidence na liczbe, HIGH na kierunek).
- **Project conventions** - package manager, test framework, validation library, formatter, kluczowe decyzje architektury z nieoczywistymi tradeoffami.
- **Directory semantics** - "Business logic w `src/domain/`. Adapters w `src/infra/`. Nie miksuj."
- **File:line reference pointers** - "Deployment rules: `docs/DEPLOY.md`. Oncall runbook: `docs/ONCALL.md`." File:line bije pasted code blocks - referencje zostaja zywe, snippety sie starzeja (R7.C15).
- **Language/communication conventions** - "Komentarze i commity po angielsku. Rozmowa moze byc PL/EN mixed." (R2.C12).
- **Per-package scope w monorepo root** - "packages/api uses Express + Prisma. packages/web uses Next.js + Prisma." To zbraja lazy subfolder overlay wlasciwym kontekstem.

### 6.2 NIE ma sensu dla

CLAUDE.md jest **zla** warstwa dla (per SYNTHESIS Part 3.3, rozwiniete w 01_PATTERNS):

- **Hard enforcement** - jesli regula MUSI zadzialac 100% razy, CLAUDE.md daje okolo 70% compliance (community triangulation). Uzyj hooka, `permissions.deny`, albo managed settings.
- **Sekretow** - API keys, tokens, credentials. CLAUDE.md jest auto-committed do git przez tier projektowy. Issue #2142 (czerwiec 2025) to landmark case: 3 live API keys committed przez Claude Code MIMO 150+ liniowej security sekcji w CLAUDE.md (R7.C7).
- **Ephemera** - current sprint plans, TODO lists, task state, "working on feature X this week." CLAUDE.md jest timeless constitution, nie dziennik. To idzie do `plans/CURRENT.md` albo GitHub issues.
- **Linter-enforceable rules** - indentacja, quote style, trailing commas, semicolons, import order. Linter jest 10,000x tanszy i 100% deterministyczny (R4.C18, R7.C14).
- **Code-visible details** - sygnatury funkcji, type shapes, exact implementation. Claude czyta pliki na zawolanie; duplikowanie kodu w CLAUDE.md nadyma plik i starzeje sie.
- **Configa harness Claude Code** - permissions, env vars, hooki, theme. To idzie do `settings.json` (patrz 02_DECISION_GUIDE sekcja "settings.json vs CLAUDE.md").

### 6.3 Hooks > CLAUDE.md dla enforcement - centralna teza

Anthropic managed-settings docs mowia wprost: "Settings rules are enforced by the client regardless of what Claude decides to do. CLAUDE.md instructions shape Claude's behavior but are not a hard enforcement layer" (per SYNTHESIS Part 6.6, R6.C15).

Wiegold ujmuje to jako operational two-liner: "CLAUDE.md is guidance for flexible decisions. Hooks are enforcement for non-negotiable rules." Corpus-wide consensus: CLAUDE.md okolo 70% compliance, hooks okolo 100% enforcement (per SYNTHESIS Part 6.6, R7.C16, CRITIC Konflikt 10 HIGH confidence).

Trzy-strikes rule z dev.to docat0209 (R4.C13): "Jesli powiedziales Claude nie rob X trzy razy i nadal to robi, przeniesc regule z CLAUDE.md do hooka."

## 7. Plugin CLAUDE.md NIE istnieje (rozprawienie z mitem)

Cztery z siedmiu raportow (R1, R2, R5, R6) niezaleznie potwierdzaja: plugin docs strukturalnie NIE maja slotu na CLAUDE.md. Plugin directory structure zawiera: `.claude-plugin/plugin.json`, `skills/`, `commands/`, `agents/`, `hooks/hooks.json`, `.mcp.json`, `.lsp.json`, `monitors/`, `bin/`, `settings.json` (per SYNTHESIS Part 1.4, CRITIC Konflikt 2 HIGH confidence).

Co plugin moze dostarczyc zamiast CLAUDE.md:

- **Skills** - opisy eager (cap 1536 chars), body lazy przy invokacji.
- **Subagents** przez `agents/`.
- **Hooki** przez `hooks/hooks.json` - dodawane sekwencyjnie do projektowych, nie overrajduja.
- **MCP servers** przez `.mcp.json`.
- **Settings** - tylko `agent` i `subagentStatusLine` keys honorowane.

Intended path dla plugin-contributed guidance to **skill z `user-invocable: false`**, ktory laduje description bezwarunkowo a body tylko przy invokacji. Plugin skills sa zawsze namespaced `plugin-name:skill-name` i nie moga zaslonic project/user skills.

Dla kontekstu projektu uzytkownika: istnieje sprawdzony pattern tworzenia plugin-like struktur poza systemem pluginow. Trzy-tier lazy load w ktorym `~/.claude/CLAUDE.md` zawiera 7-linijkowa routing instruction, `~/.claude/PRESET_CATALOG.md` laduje przy pierwszej decyzji routingowej, a per-preset prompty laduja przy invokacji - jest tansza niz jakikolwiek monolityczny CLAUDE.md ze wszystkimi preset promptami i gracefully przezywa `/compact` (per SYNTHESIS Part 1.4, R6.C_PRESET_CATALOG). To jest dokladnie wzorzec Agent_Architecture v32.16 w tym repo.

## 8. Quick mental model checklist

Zeby sprawdzic czy zlapales fundamenty:

- [ ] CLAUDE.md to user message, nie system prompt.
- [ ] Nie ma overridow - jest concat.
- [ ] Konflikty rozstrzyga Claude probabilistycznie, nie deterministycznie.
- [ ] Cztery tiery: Managed / User / Project / Local. Plus `.claude/rules/`, `@import`, ancestor walk, lazy subfolder overlay.
- [ ] Plugin CLAUDE.md nie istnieje.
- [ ] Edycje sa inert do `/compact` lub restart.
- [ ] `/reload` nie istnieje. `/memory` otwiera do edycji ale nie wymusza re-read.
- [ ] 1 token CLAUDE.md = 1 token kazdy turn.
- [ ] Compliance spada z dlugoscia sesji. "Less is more" ma empiryczne podstawy.
- [ ] Hooks > CLAUDE.md dla hard enforcement. Issue #2142 to landmark proof.
- [ ] CLAUDE.local.md nie jest deprecated.
- [ ] Subagent AUTO-loaduje CLAUDE.md (przez cwd walk), ale nie dziedziczy parent conversation. Explore/Plan subagenty skipuja CLAUDE.md specjalnie.

Jak masz 11/12+ zaznaczonych, fundamenty sa. Przejdz do 01_PATTERNS po praktyczne wzorce pisania.

---

## Dalsze czytanie

- **01_PATTERNS.md** - co wrzucac, co nie, multi-file organization, integracje, starter templates.
- **02_DECISION_GUIDE.md** - decision trees, anti-patterns quick ref, troubleshooting tabelka, open questions.
- **03_MEDIA_PROMPTS.md** - video overview + 3 infografiki dla NotebookLM Studio (jakosc 9.5/10).
- **../plans/SYNTHESIS.md** - master dokument 11k slow ze wszystkimi cytatami primary.
- **../research/CRITIC.md** - walidacja 7 raportow, 12 konfliktow rozstrzygnietych.

Primary docs:
- Memory: https://code.claude.com/docs/en/memory
- Context window: https://code.claude.com/docs/en/context-window
- Hooks: https://code.claude.com/docs/en/hooks
- Best practices: https://code.claude.com/docs/en/best-practices
- Plugins: https://code.claude.com/docs/en/plugins

Landmark case studies:
- Issue #2142 - API keys committed MIMO security section
- Issue #29230 - v2.1.62 resume cache regression
- Issue #46829 - Mar 2026 TTL 1h -> 5min regression
