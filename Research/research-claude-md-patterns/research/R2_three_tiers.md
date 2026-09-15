# R2: Three Tiers Deep Dive - project / user / global

Kampania: **Claude Code CLAUDE.md Patterns 2026**
Researcher: **R2 (Opus 4.7)**
Data: **2026-04-17**
Target: **3000-4500 slow, dense prose + tabele + konkretne examples**

---

## 1. Abstract

Claude Code nie ma "jednego" pliku CLAUDE.md. Ma **cztery pozyomy** lokalizacji (managed policy, user, project, local) plus **piaty** specjalny - plugin CLAUDE.md i **szosty** - hierarchia subfolderow. Wszystkie pliki sa **konkatenowane** (nie nadpisywane) do jednego user message dostarczanego do Claude po system prompt. Nie ma tu "override" w sensie CSS - sa kolejne warstwy instrukcji, a Claude sam rozstrzyga konflikty na podstawie **ostatniej widzianej linii** (tail bias) i poziomu specyficznosci. Managed policy to jedyna warstwa ktora uzytkownik nie moze wykluczyc (`claudeMdExcludes` nie dziala na nia). Reszta to miekkie priorytety oparte na kolejnosci ladowania i konwencji: project > user w praktyce, ale nie przez twardy mechanizm - przez to, ze project ladowany jest **po** user i przez to, ze jest blizszy "kontekstu zadania".

Ten raport pokazuje: (a) ktora warstwa do czego, (b) jak naprawde dziala precedensja (spoiler: concat + tail bias, nie override), (c) co sie dzieje w monorepo i z subfolderami (ancestor immediate, descendant lazy), (d) piec konkretnych scenariuszy konfliktow i ich rozstrzygniecie, (e) budzety tokenow per tier.

**Kluczowa teza:** CLAUDE.md to nie config, to instruction stack. Kto na dole stosu, ten ma najswiezszy glos - ale Claude nadal moze wszystko olac, bo to user message po system prompt, nie hard rule.

---

## 2. Tier 1: Project CLAUDE.md

### Lokalizacja

Dwie akceptowane sciezki (oficjalnie rownowazne):

- `./CLAUDE.md` (root repo)
- `./.claude/CLAUDE.md` (wewnatrz `.claude/` folder)

Plus lokalny wariant:

- `./CLAUDE.local.md` - identyczny format, ale gitignored, ladowany **po** `CLAUDE.md` w tym samym folderze

### Use cases

| Use case | Przyklad wpisu |
|---|---|
| **Stack i toolchain** | "Use pnpm, not npm. Node 20 LTS. PostgreSQL 16 + Prisma." |
| **Build/test commands** | "`pnpm dev` to start, `pnpm test` before commit, `pnpm typecheck` blocks PR." |
| **Architektura** | "API handlers live in `src/api/handlers/`. Business logic in `src/domain/`. Never import DB client outside `src/infra/`." |
| **Konwencje nazewnictwa** | "Files: kebab-case. Components: PascalCase. Types suffixed `Type`, interfaces `Interface`." |
| **Team workflows** | "Branch from `main`, PR requires 1 review, squash-merge only." |
| **Project-specific gotchas** | "Redis must be running locally for API tests. `seed.sql` auto-runs on `pnpm db:reset`." |

### Kto zarzadza

- **Zespol**, commit do repo (version control)
- Review w PR jak kazdy inny plik
- `/init` generuje szkielet z analizy kodu

### Co NIE wrzucac

- **Secrets** - kluczy API, URLi sandboxowych, credential
- **Personal preferences** - "ja lubie tabulatory" kiedy team uzywa spacji to wlasnie twoj problem, nie project
- **Instrukcje dla jednego feature area** - daj do `.claude/rules/testing.md` z `paths` frontmatter zamiast pchac do root CLAUDE.md
- **Duplikaty z AGENTS.md** - Claude Code czyta **tylko CLAUDE.md**, nie AGENTS.md. Jesli masz AGENTS.md dla innych agentow, w CLAUDE.md zrob `@AGENTS.md` na poczatku, potem dodaj Claude-specific sekcje ponizej
- **Diatryby na 500 linii** - target `< 200 lines`, potem split do imports lub `.claude/rules/`

### Example (dobry)

```markdown
# Project: AcmePay Checkout

## Stack
- Next.js 14 App Router
- PostgreSQL 16 + Prisma ORM
- Stripe Payments API

## Commands
- pnpm dev - local dev (port 3000)
- pnpm test - run Vitest suite
- pnpm db:reset - wipe + reseed local DB

## Conventions
- Use TypeScript strict mode, no `any`
- API handlers: `app/api/<resource>/route.ts`
- Validate input with Zod, never trust client

## Gotchas
- Stripe webhooks need ngrok in dev (`pnpm tunnel`)
- `seed.sql` auto-runs in `db:reset`, idempotent
```

### Antipattern

```markdown
# CLAUDE.md

## My personal notes
- I prefer vim keybindings in my editor
- Use 4-space indent (even though repo has .editorconfig with 2)
- My sandbox URL is https://sandbox-maciej.acme.test
- API key for testing: sk_test_abc123  <-- SECRET!
```

To wszystko nalezy do `CLAUDE.local.md` (gitignored) lub `~/.claude/CLAUDE.md` (user tier).

---

## 3. Tier 2: User CLAUDE.md

### Lokalizacja

- `~/.claude/CLAUDE.md` - jedna lokalizacja, bez wariantow
- Komplementarne: `~/.claude/rules/*.md` - modularne rules user-scoped

### Use cases

| Use case | Przyklad |
|---|---|
| **Styl komunikacji** | "Odpowiadaj po polsku prostym jezykiem. Unikaj marketingowej nowomowy." |
| **Preferencje narzedzi** | "Preferuj `rg` nad `grep`. `jq` dla JSON. `fd` nad `find`." |
| **Formatowanie outputu** | "Nigdy nie uzywaj em-dashes. Tylko zwykle hyphens." |
| **Globalne workflowy** | "Przed duzym commitem pokaz mi `git diff` i pytaj o potwierdzenie." |
| **Role / osobowosc** | "Jestes senior engineer, nie enthusiastic helper. Short, technical." |
| **Bazowe preferencje techniczne** | "Preferuj TypeScript nad JavaScript, Tailwind nad CSS modules - chyba ze projekt mowi inaczej." |

### Kto zarzadza

- **Jeden user** na jednej maszynie
- Nie wersjonowane (git-niezale zne), ale mozna backupowac np. do dotfiles repo
- **Nie** synchronizuje sie miedzy maszynami automatycznie

### Co NIE wrzucac

- **Project-specific info** - "use pnpm" jest OK jako global (jesli lubisz pnpm), ale "API handlers zyja w `src/api/`" nie ma sensu globalnie, bo inne projekty maja inne struktury
- **Team standards** - to sa rzeczy w project CLAUDE.md (Git-commitowane)
- **Sekrety** - user CLAUDE.md nie jest gitignored defaultowo, ale i tak nie jest dobry storage dla kluczy
- **Nadmiar kontekstu** - kazde 100 linii = ~500-800 tokenow ladowanych w **kazdej sesji Claude Code na maszynie**. User CLAUDE.md to stala cena. Maly i sharp.

### Example (dobry)

```markdown
# Maciej - User Preferences

## Jezyk
Odpowiadaj po polsku, prostym jezykiem. Unikaj anglicyzmow gdy jest polski odpowiednik.

## Formatowanie
- Nigdy em-dashes ani en-dashes, tylko zwykle hyphens (-)
- Nie uzywaj emojis chyba ze uzytkownik sam prosi
- Kod w markdown bloku z jezykiem (```ts, ```python)

## Workflow
- Duze zmiany: najpierw plan, potem dopiero write/edit
- Commity: conventional commits (feat:, fix:, chore:)
- Przed `rm -rf` cokolwiek: pytaj

## Preferencje techniczne (chyba ze project mowi inaczej)
- TypeScript strict, no any
- Package manager: pnpm > npm > yarn
- Testing: Vitest > Jest
```

### Antipattern

```markdown
# ~/.claude/CLAUDE.md

## Client A project notes
- Database is on AWS RDS
- Deploy via GitHub Actions to EC2
- Slack channel #client-a for questions

## Client B project notes
- Database is Supabase
- Uses Vercel deploy
- ...
```

Project-specific info w user tier = ladowane przy **kazdym otwarciu Claude Code**, zamieca kontekst. Przenies do per-project `CLAUDE.md`.

---

## 4. Tier 3: Managed / Enterprise CLAUDE.md

### Czy istnieje jako osobna warstwa?

**Tak.** Od wydania "managed policy CLAUDE.md" Anthropic ma **oficjalnie trzy tiery** plus local:

- **Managed policy** (enterprise/organization)
- **User** (per-developer)
- **Project** (per-repo, team-shared)
- **Local** (per-developer, per-repo)

### Lokalizacja managed policy

| OS | Sciezka |
|---|---|
| macOS | `/Library/Application Support/ClaudeCode/CLAUDE.md` |
| Linux / WSL | `/etc/claude-code/CLAUDE.md` |
| Windows | `C:\Program Files\ClaudeCode\CLAUDE.md` |

Deploy przez MDM (Jamf, Kandji, Intune), Group Policy, Ansible - standardowe tooling dla IT.

### Use cases

- **Compliance reminders** - "Nigdy nie commituj PII do repozytoriow. HIPAA data tylko w approved encrypted storage."
- **Security policies** - "Nigdy nie uzywaj raw SQL concat - tylko parametrized queries. Nie zapisuj secrets w .env commited."
- **Mandatory coding standards** - "Wszystkie public APIs musza miec OpenAPI schema. Wszystkie migrations reversible."
- **Legal / licensing** - "Przy integracji OSS: sprawdzaj license compatibility z internal LEGAL_APPROVED_LICENSES.md."

### Kluczowa wlasciwosc: **CANNOT BE EXCLUDED**

Z dokumentacji: "Managed policy CLAUDE.md files cannot be excluded. This ensures organization-wide instructions always apply regardless of individual settings."

`claudeMdExcludes` w settings **nie dziala** na managed policy. To jedyna warstwa z taka gwarancja.

### Managed CLAUDE.md vs managed settings

To dwa **rozne** mechanizmy i Anthropic jasno rozdziela:

| Concern | Gdzie konfigurowac |
|---|---|
| Block narzedzi, komend, sciezek | Managed settings: `permissions.deny` |
| Sandbox isolation | Managed settings: `sandbox.enabled` |
| Env vars, API routing | Managed settings: `env` |
| Auth method, org lock | Managed settings: `forceLoginMethod`, `forceLoginOrgUUID` |
| **Code style, quality guidelines** | **Managed CLAUDE.md** |
| **Data handling, compliance reminders** | **Managed CLAUDE.md** |
| **Behavioral instructions dla Claude** | **Managed CLAUDE.md** |

Settings = **twarde** enforcement (klient Claude Code blokuje przed LLM). CLAUDE.md = **miekkie** guidance (LLM decyduje czy posluchac).

### Example managed CLAUDE.md

```markdown
# Acme Corp - Global Engineering Standards

## Compliance
- All customer PII must be encrypted at rest and in transit
- Never log passwords, tokens, or credit card numbers
- HIPAA data requires approved encrypted storage only

## Security
- Never commit secrets to git (use Vault)
- Always parameterize SQL queries, never concat user input
- All external APIs must be called through approved SDK

## Quality
- All public functions require TSDoc/JSDoc
- Test coverage target: 80%+
- No `any` or `unknown` without justification comment
```

### Antipattern

Wrzucenie do managed policy rzeczy ktore powinny byc w project CLAUDE.md ("use pnpm w Acme Checkout app"). Managed policy obejmuje **cala firme**, wiec pisz tylko to co dotyczy wszystkich: compliance, security, universal quality baselines. Project-specific rzeczy zmus teamy zeby napisaly w swoich repos.

---

## 5. Bonus: Plugin CLAUDE.md

### Czy istnieje?

Plugin system w Claude Code (`.claude-plugin/plugin.json` w osobnym katalogu pluginu) **nie ma pierwszoklasowego CLAUDE.md** jako komponentu. Dokumentacja pluginow wymienia:

- `skills/` - SKILL.md per skill
- `commands/` - flat MD files
- `agents/` - definicje subagentow
- `hooks/hooks.json`
- `.mcp.json`, `.lsp.json`
- `monitors/monitors.json`
- `bin/`
- `settings.json` (default settings applied when enabled)

**Nie ma "CLAUDE.md" w tej liscie.**

### Co to znaczy w praktyce?

Plugin dostarcza instrukcje **tylko przez**:
1. **Skills** (SKILL.md) - ladowane na zadanie, namespaced (`/plugin-name:skill-name`)
2. **Agents** - subagenty z wlasnym system promptem
3. **Settings** - `agent` key moze aktywowac custom agenta jako main thread, zastepujac system prompt

Nie ma mechanizmu "automatyczne wstrzyknij ten CLAUDE.md jak plugin jest aktywny". Jesli autor pluginu chce globalne instrukcje, musi zrobic to przez `settings.json` z `agent` key lub liczyc na to ze user sam doda `@plugins/foo/README.md` w swoim CLAUDE.md.

### Unofficial workaround

Spolecznosc czasem umieszcza `CLAUDE.md` wewnatrz folderu plugina dla **dokumentacji dla Claude** gdy user explicite channel do tego katalogu (np. `--add-dir`). Ale to nie jest oficjalny mechanizm.

### Wniosek

Plugin CLAUDE.md **nie istnieje jako ładowana warstwa**. "Plugin instructions" = skills + agents + settings. Jesli ktos mowi "plugin CLAUDE.md", najpewniej ma na mysli `README.md` dokumentacyjny lub nieoficjalny workaround.

---

## 6. Precedensja i merge semantyka

### Oficjalny mechanizm: CONCAT, NOT OVERRIDE

Kluczowy cytat z docs: "All discovered files are concatenated into context rather than overriding each other."

Claude Code nie robi "project overrides user". Robi **konkatenacje** wszystkich CLAUDE.md ktore znajdzie, w okreslonej kolejnosci, do jednego user message. Claude dostaje to wszystko naraz.

### Kolejnosc ladowania (tail bias = "wygrywa ostatni")

Poniewaz wszystko jest concat, **ostatnia linia instrukcji na temat X bedzie tym co Claude widzi jako najnowsze** - i LLMy maja bias na freshness/recency w instrukcjach. To jest defacto mechanizm "precedencji".

Empirycznie obserwowana kolejnosc (na podstawie docs + community):

```
1. Managed policy CLAUDE.md (organization)
2. User CLAUDE.md (~/.claude/CLAUDE.md)
3. User rules (~/.claude/rules/*.md)
4. Ancestors CLAUDE.md (walking up from cwd, najstarszy najpierw)
   ...aż do project root CLAUDE.md
5. Project .claude/CLAUDE.md
6. Project .claude/rules/*.md (bez paths frontmatter = always-on)
7. CLAUDE.local.md (obok CLAUDE.md, zawsze po nim)
8. Subfolder CLAUDE.md (lazy, on-demand gdy Claude czyta plik z subfolderu)
```

Tail bias oznacza: **CLAUDE.local.md i subfolder CLAUDE.md sa "najblizej" Claude'a** - wygrywaja konflikty de facto.

### Tabela precedence + merge behavior

| Tier | Loaded when | Merge semantyka | Can be excluded? | Kto wygrywa konflikt |
|---|---|---|---|---|
| Managed policy | Session start | Append (pierwsza) | **NIE** - hard requirement | Rzadko, bo inne tiery ladowane po |
| User (~/.claude/CLAUDE.md) | Session start | Append | Tak (CLI flags, claudeMdExcludes) | Przegrywa z project (tail bias) |
| Project (./CLAUDE.md) | Session start | Append | Tak (claudeMdExcludes) | Przegrywa z local i subfolder |
| .claude/CLAUDE.md | Session start | Append (tresc = project tier) | Tak | jw. |
| .claude/rules/ bez paths | Session start | Append (same priority jak .claude/CLAUDE.md) | Tak | jw. |
| .claude/rules/ z paths | On-demand (path match) | Append gdy trigger | Tak | Lazy, moze "przegrac" jesli nie trigger |
| CLAUDE.local.md | Session start | Append **po** CLAUDE.md w tym folderze | Tak | Wygrywa w obrebie projektu (tail) |
| Subfolder CLAUDE.md | Lazy - gdy Claude czyta plik w subfolderze | Injected do konwersacji | Tak | Wygrywa lokalnie (najswiezsze) |

### Nie ma hard override

Waznie: **konflikt nie jest rozstrzygany deterministicznie**. Jesli project mowi "use tabs", user mowi "use spaces", a managed mowi "use 2-space indent" - Claude widzi **wszystkie trzy** i sam decyduje. Docs mowia wprost:

> "if two rules contradict each other, Claude may pick one arbitrarily"

> "Review your CLAUDE.md files [...] periodically to remove outdated or conflicting instructions"

To LLM judgment call, nie config resolver.

### Post-compaction behavior

Tylko **project-root CLAUDE.md** przezywa `/compact`. Po kompakcji Claude ponownie czyta go z dysku i wstrzykuje do kontekstu. Nested CLAUDE.md w subfolderach **nie sa** re-injected automatycznie - ladowane ponownie dopiero gdy Claude zacznie czytac plik z tego subfolderu. User CLAUDE.md tez przezywa (jest czesc startup loading).

---

## 7. Hierarchical loading (subfolder + parent)

### Tak, dziala jak .gitignore - ale z roznicami

Z dokumentacji: "Claude Code reads CLAUDE.md files by walking up the directory tree from your current working directory, checking each directory along the way for CLAUDE.md and CLAUDE.local.md files."

Jesli jestes w `/repo/packages/api/src/handlers/`:
- `/repo/packages/api/src/handlers/CLAUDE.md` - load immediate
- `/repo/packages/api/src/CLAUDE.md` - load immediate
- `/repo/packages/api/CLAUDE.md` - load immediate
- `/repo/packages/CLAUDE.md` - load immediate
- `/repo/CLAUDE.md` - load immediate
- `/CLAUDE.md` (jesli istnieje - nie powinno) - load immediate

To **ancestor loading, immediate**. Wszystkie ladowane od razu przy starcie sesji.

### Descendant loading - LAZY

Pliki CLAUDE.md w subfolderach **ponizej** current working directory:
- Odkrywane przy starcie (Claude wie ze istnieja)
- **Nie ladowane**, dopoki Claude nie czyta pliku z tego subfolderu
- Wstrzykiwane do konwersacji gdy trigger nastepuje

Przyklad: cwd = `/repo/`. Istnieje `/repo/packages/web/CLAUDE.md`.
- Start sesji: `packages/web/CLAUDE.md` **NIE jest ladowany** (lazy)
- Claude wykonuje `Read /repo/packages/web/src/page.tsx` -> teraz `packages/web/CLAUDE.md` jest wstrzykiwany
- Claude nie siega po `packages/api/` w tej sesji -> `packages/api/CLAUDE.md` **nigdy** nie jest ladowany (sibling isolation)

### Sibling isolation

Pracujesz w `packages/api/`. `packages/web/CLAUDE.md` **nie jest** ladowany do Twojej sesji - chyba ze jawnie czytasz plik z `packages/web/`. To oszczedza kontekst i chroni przed cross-contamination reguly z innych pakietow.

### Znany bug (2025-2026)

GitHub issue #2571: user zglaszal ze subfolder CLAUDE.md **nie sa** automatycznie ladowane gdy Claude czyta plik z subfolderu. Issue zamkniete "not planned" bez rozwiazania. W praktyce: tryb lazy loading czasem zawodzi, zwlaszcza dla plikow otwieranych przez tool ktory nie jest `Read` (np. Edit bezposrednio). **Workaround:** jawnie `Read /repo/packages/web/CLAUDE.md` na poczatku pracy z tym folderem, albo dodaj `@packages/web/CLAUDE.md` import w root CLAUDE.md.

### Monorepo use case - concretne layouts

```
my-monorepo/
  CLAUDE.md                    <- universal rules, 150 linii max
  .claude/
    rules/
      testing.md               <- wszystkie testy (paths: **/*.test.ts)
      security.md              <- wszystkie API (paths: **/api/**)
  packages/
    api/
      CLAUDE.md                <- API-specific: handlers layout, Zod schemas
    web/
      CLAUDE.md                <- Web-specific: component conventions, Tailwind
    shared/
      CLAUDE.md                <- Shared lib: tylko pure functions, no side-effects
    docs/
      CLAUDE.md                <- Docs only: no code edits, only MDX
```

Claude pracujacy w `packages/api/` widzi: `monorepo/CLAUDE.md` + `packages/api/CLAUDE.md` + relevant rules (paths match). **Nie widzi** `packages/web/CLAUDE.md`. To jest koronny use case hierarchii.

### User-level hierarchia

`~/.claude/rules/` tez istnieje. Loaded **przed** project rules (user pierwsze, project drugie - project ma wyzsza "priority" w tail bias):

- `~/.claude/rules/preferences.md`
- `~/.claude/rules/workflows.md`

Uzyteczne dla "global across machines" workflow bez pchania do user CLAUDE.md.

---

## 8. Konflikty i rozwiazania (5 scenariuszy)

### Scenariusz 1: Jezyk komunikacji (user vs project)

- **User** (`~/.claude/CLAUDE.md`): "Odpowiadaj po polsku"
- **Project** (`./CLAUDE.md`): "All documentation and commits in English"

**Rozstrzygniecie:** Project ladowany po user (tail bias). Claude typowo odpowiada po angielsku dla tego projektu. W konwersacji moze mieszac jesli user pisze po polsku i pyta o kod. **Najlepsze rozwiazanie:** precyzja - project powinien mowic "Code, comments, and git commits in English, ale rozmowa z developerem moze byc po polsku" - to likwiduje konflikt.

### Scenariusz 2: Emojis (user NO vs project YES)

- **User**: "Nigdy nie uzywaj emojis"
- **Project**: "W PR descriptions uzywaj emojis dla sekcji (:rocket: Features, :bug: Fixes)"

**Rozstrzygniecie:** Claude widzi oba, w specyficznym kontekscie (pisanie PR description) wygra project (recency + specificity). W ogolnej konwersacji wygra user. W praktyce Claude wplata emoji tylko gdzie project jawnie wymaga. **Workaround:** w user napisz "nigdy emojis, **chyba ze** project jawnie prosi".

### Scenariusz 3: Package manager (managed vs user vs project)

- **Managed policy**: (brak na ten temat)
- **User**: "pnpm always"
- **Project**: "This repo uses npm, lockfile is package-lock.json"

**Rozstrzygniecie:** Project wygrywa (tail bias + specificity - "this repo" jest konkretne). Claude uzywa `npm install`. Jesli user napisal "pnpm always" **bez** "unless project says otherwise", moze byc drobne tarcie - Claude czasem zasugeruje pnpm. **Best practice:** user tier formuluje preferencje jako **defaulty** ("preferuj X gdy nic nie stoi na przeszkodzie"), nie jako absoluts.

### Scenariusz 4: Security (managed vs project - managed WYGRYWA via enforcement)

- **Managed policy** CLAUDE.md: "Never use raw SQL concat, always parameterize"
- **Project** CLAUDE.md: "Legacy codebase, some endpoints still use `query = 'SELECT * FROM t WHERE id = ' + id`"

**Rozstrzygniecie:** Managed CLAUDE.md nie jest hard enforcement - Claude moze ulec project. **Ale** jesli organizacja dodala `managed-settings.json` z `permissions.deny` dla patternu SQL concat, to **settings blokuja tool call** niezaleznie od Claude'a decyzji. Tu widac roznice: managed CLAUDE.md to **behavioral**, managed settings to **technical firewall**. **Best practice dla enterprise:** duplikuj kluczowe zasady w obu - CLAUDE.md dla guidance, settings dla enforcement.

### Scenariusz 5: Subfolder vs root (lokalny override de facto wygrywa)

- **Root** `/repo/CLAUDE.md`: "Use Zod for validation everywhere"
- **Subfolder** `/repo/packages/legacy-api/CLAUDE.md`: "Ten pakiet uzywa Yup (legacy, migracja in progress). Nie zamieniaj Yup na Zod w existing endpoints - tylko nowe."

**Rozstrzygniecie:** Gdy Claude pracuje w `packages/legacy-api/`, widzi root + subfolder. Tail bias + specificity: subfolder wygrywa. Claude zostawia Yup w starych endpointach, Zod w nowych. Jak tylko Claude wyjdzie do `packages/new-api/` - root bierze verze, Zod wszedzie. **To dziala dobrze** - to wlasnie koronny use case hierarchii.

### Bonus scenariusz 6: Plan mode override (dokumentowany bug)

GitHub issue #30634: user ma w `~/.claude/CLAUDE.md` "IMPORTANT: workflow = write plan to `tasks/todo.md`". Wchodzi w plan mode. System injectuje "Write your final plan to the plan file (the only file you can edit)". Claude slucha **systemu**, ignoruje user CLAUDE.md.

**Dlaczego?** System prompt i plan mode instructions sa **przed** CLAUDE.md w stack. Plus plan mode zawiera "This supercedes any other instructions" jawnie. User CLAUDE.md nie ma zadnej mocy wobec system-level instructions w special modes.

**Wniosek:** CLAUDE.md (we wszystkich tierach) jest **ponizej** system prompt i special modes. Nie ma mocy dyrektywnej wobec nich. Issue pozostaje nierozwiazany (closed as duplicate).

---

## 9. Token budget per tier

CLAUDE.md ladowany jest "in full" niezaleznie od rozmiaru, ale wieksze pliki = mniej adherence. Oficjalny target: `< 200 lines per file`.

| Tier | Typowy rozmiar | Tokeny | Frequency |
|---|---|---|---|
| Managed policy | 50-200 linii | 250-1600 | Kazda sesja na maszynie |
| User (~/.claude/CLAUDE.md) | 50-200 linii | 250-1600 | Kazda sesja na maszynie |
| User rules (~/.claude/rules/*) | 20-80 linii/plik x N plikow | 100-600/plik | Kazda sesja (unless paths-scoped) |
| Project (./CLAUDE.md) | 100-300 linii | 500-2400 | Kazda sesja w tym repo |
| Project rules (.claude/rules/*) | 20-80 linii/plik x N plikow | 100-600/plik | Kazda sesja (unless paths-scoped) |
| CLAUDE.local.md | 20-100 linii | 100-800 | Kazda sesja w tym repo |
| Subfolder CLAUDE.md | 20-80 linii | 100-600 | Lazy - tylko gdy trigger |

### Realistyczny worst-case

Duza firma + duzy monorepo + duzo preferencji user:

```
Managed:       200 lines  ~1600 tok
User CLAUDE.md: 200 lines ~1600 tok
User rules:    3 files x 50 lines ~1200 tok
Project root:  300 lines ~2400 tok
Project rules: 5 files x 50 lines ~2000 tok
CLAUDE.local:  50 lines ~400 tok
-----------------------------------------
TOTAL na start sesji: ~9200 tokenow
```

Plus kazda subfolder CLAUDE.md dodaje ~300-600 tokenow **gdy trigger**. W duzym monorepo gdzie Claude dotyka 5 packages w sesji: +3000 tokenow lazy.

Dla porownania: context window Sonnet 4.5 = 200k tokenow, ale **effective** okno (gdzie adherence jest dobra) to ~100k. 9-12k startup budget = 10-12% czego z gory brak na zadanie. Optymalizacja ma sens.

### Dlaczego specyficznosc > dlugosc

Anthropic engineering: effective compliance threshold to ~150-200 instrukcji. System prompt zajmuje ~50, zostaje ~100-150 dla CLAUDE.md. Kazda dodana "slabko" instrukcja **dilutuje** wszystkie pozostale rowno. "Use 2-space indentation" (silne, konkretne) zarabia swoje miejsce. "Write clean code" (slabe, wague) zjada slot bez wnoszenia wartosci.

### Optymalizacje

1. **Imports** - `@path/to/other.md` pozwala rozbic duzy plik bez utraty struktury
2. **Path-scoped rules** - rules z `paths` frontmatter laduja sie tylko gdy Claude pracuje z matching files. Oszczedza kontekst.
3. **claudeMdExcludes** - w monorepo mozesz wykluczyc CLAUDE.md innych teamow
4. **HTML comments** - `<!-- -->` block comments sa stripped przed injection. Uzywaj dla notatek dla siebie bez token cost.

---

## 10. Konkretne working examples (3 tiers razem)

### Przyklad: Freelancer Maciej pracuje dla dwoch klientow

**Tier 1 - User** (`~/.claude/CLAUDE.md`):
```markdown
# Maciej - User Preferences

## Jezyk i ton
- Polski, prostym jezykiem. Bez marketingowych smaczkow.
- Nigdy em-dashes ani emojis (chyba ze projekt prosi)

## Workflow default
- Duze zmiany: plan najpierw, potem zmiany
- Conventional commits: feat/fix/chore/docs
- Przed destrukcyjna operacja (rm, DROP, force-push): zatrzymaj sie i pytaj

## Defaulty techniczne (ustapia przed project)
- TypeScript strict
- pnpm > npm > yarn
- Vitest > Jest
```

**Tier 2 - Project A** (`~/work/client-acme/CLAUDE.md`):
```markdown
# Acme Checkout - Next.js 14

## Stack
- Next.js 14 App Router, React 18, TypeScript strict
- PostgreSQL 16 + Prisma
- Stripe Payments
- Biome zamiast ESLint+Prettier

## Commands
- pnpm dev - local port 3000
- pnpm test - Vitest, watch mode
- pnpm db:reset - wipe + reseed

## Conventions
- API routes: app/api/<resource>/route.ts
- Validate z Zod, error = NextResponse.json({error}, {status})
- Nie importuj Prisma client poza lib/db/

## Gotchas
- Stripe webhooks wymagaja ngrok (pnpm tunnel)
- Seed jest idempotent, bezpieczny do re-run
```

**Tier 2 - Project B** (`~/work/client-beta/CLAUDE.md`):
```markdown
# Beta Analytics - Python/Django

## Stack
- Python 3.12, Django 5, PostgreSQL
- Celery + Redis dla async
- pytest

## Commands
- make run - dev server port 8000
- make test - pytest + coverage
- make migrate - Django migrations

## Conventions
- Python: black + ruff
- Django: Class-based views
- Tests w tests/ obok modulu
```

**Tier 3 - Managed** (brak - freelancer nie ma IT department).

**Tier 4 - Local** (`~/work/client-acme/CLAUDE.local.md`, gitignored):
```markdown
## Maciej personal for Acme
- Sandbox URL: https://sandbox-maciej.acme.test
- Test Stripe key w .env.local
- Debug DB: DATABASE_URL_LOCAL w zshrc
```

**Jak to sie uklada kiedy Claude w client-acme:**

Concatenated do user message:
1. User prefs (polski, no emojis, pnpm default, etc.)
2. Project Acme (Next.js, Biome, Stripe gotchas)
3. Local Acme (sandbox URL, personal secrets)

Claude **nie widzi** Beta project (sibling isolation). Default `pnpm` z user matchuje Acme spec. Brak konfliktow major.

**Kiedy Claude w client-beta:**
1. User prefs (polski, pnpm default <- project override: make, pip, poetry)
2. Project Beta (Python, Django)
3. Brak local dla Beta

Konflikt: user mowi pnpm, project mowi Python (nie pnpm). Rozwiazanie: project specyficzniejszy + tail bias + kontekstowo oczywiste (pnpm bez sensu w Python). Claude uzywa make/pip.

### Przyklad: Enterprise SOC2 z hierarchia

**Managed** (`/etc/claude-code/CLAUDE.md`):
```markdown
# Acme Corp - Engineering Compliance

## SOC2 Mandatory
- Never log: passwords, tokens, PII, credit cards, SSN
- All DB queries: parameterized, no string concat
- Secrets: only via Vault/SecretManager, never in .env committed

## Licensing
- Check LEGAL_APPROVED_LICENSES.md before adding OSS dep
- GPL/AGPL: prohibited without legal approval

## Quality
- All public APIs: OpenAPI schema required
- Test coverage: >= 80% na nowym kodzie
```

**User** (developer X personal):
```markdown
## Preferencje stylu
- Preferuj async/await nad Promise chains
- Konwencjonalny camelCase w TS, snake_case w Py
```

**Project** (`./backend-api/CLAUDE.md`):
```markdown
# Backend API - Order Service

## Stack
- Kotlin 1.9, Spring Boot 3, PostgreSQL
- Gradle, Kotest

## Architecture
- Hexagonal: domain/ / application/ / infrastructure/
- Events: Kafka, topic naming: acme.order.<event>

## Gotchas
- PostgreSQL sequence gen: wymagane @Id @GeneratedValue
- Flyway migrations: versioned, immutable after merge
```

Concatenated: Managed (compliance baseline) + User (code style prefs) + Project (stack). Claude dostaje wszystko i pracuje spojnie. Jesli ktos prosilby "zhardkoduj haslo do testu", Claude powinien odmowic na podstawie managed. Jesli project mowi "uzyj string concat dla query" (co jest zlem), managed + user blokuja.

---

## 11. Gaps

Rzeczy ktore pozostaja niejasne lub slabo dokumentowane - kandydaci dla R3/R4 delta research:

1. **Dokladna kolejnosc concat w pliku finalnym.** Docs mowi ze managed ladowany jako "always apply regardless" ale nie mowi wprost czy managed jest pierwszy czy ostatni w user message. Community raportuje mix - warto empirycznie sprawdzic przez `InstructionsLoaded` hook.

2. **Czy user CLAUDE.md ma precedencje nad project przez jakis special flag?** Issue #30634 sugeruje ze user moze dodac "IMPORTANT: OVERRIDE" naglowek, ale to **nie dziala** wobec system prompt / plan mode. Nie ma oficjalnego mechanizmu wymuszania user > project.

3. **Subfolder CLAUDE.md vs `@import` w root.** Ktora strategia lepsza w monorepo? Docs nie daje oficjalnego zalecenia. Community debatuje.

4. **Path-scoped rules trigger conditions.** Docs mowi "when Claude reads files matching pattern" - ale co z Edit, Write, Grep? Czy Grep na pliki matchujace triggeruje rule? Niejasne.

5. **Plugin CLAUDE.md** - oficjalnie nie istnieje. Czy bedzie? Anthropic plugin roadmap nie adresuje.

6. **Konflikt miedzy `.claude/CLAUDE.md` a `./CLAUDE.md`.** Docs mowi oba sa akceptowane. Jesli oba istnieja w tym samym repo - ktory ladowany? Oba? W jakiej kolejnosci? Community raportuje "oba sa concat" ale brak oficjalnego potwierdzenia.

7. **Interaction z `.claude/rules/*` bez paths frontmatter vs z paths.** Dokladny order ladowania i merge niejasne.

8. **Czy auto memory (MEMORY.md) moze konfliktowac z CLAUDE.md?** Auto memory ma wlasny budget (200 lines, 25KB). Pipelinuje ze CLAUDE.md. Konflikt scenariusz nie dokumentowany.

---

## 12. Bibliografia

### Oficjalne Anthropic

1. Anthropic, **How Claude remembers your project** (Memory docs), `https://code.claude.com/docs/en/memory` - sekcje: "CLAUDE.md vs auto memory", "Choose where to put CLAUDE.md files", "How CLAUDE.md files load", "Manage CLAUDE.md for large teams", "Deploy organization-wide CLAUDE.md"
2. Anthropic, **Create plugins**, `https://code.claude.com/docs/en/plugins` - sekcja: "Plugin structure overview"
3. Anthropic, **Claude Code settings**, `https://code.claude.com/docs/en/settings` - sekcja: "Configuration scopes"

### GitHub Issues (anthropics/claude-code)

4. Issue #30634, **System plan mode instructions override user CLAUDE.md workflow directives**, `https://github.com/anthropics/claude-code/issues/30634` - konflikt system prompt vs user CLAUDE.md, status: duplicate
5. Issue #2571, **CLAUDE.md files in subdirectories are not being loaded**, `https://github.com/anthropics/claude-code/issues/2571` - bug w descendant loading, status: closed not planned
6. Issue #37344, **Support hierarchical .claude config discovery in monorepos**, `https://github.com/anthropics/claude-code/issues/37344` - feature request for monorepo config

### Community (blogs, dev.to, reddit)

7. Rushi, **The Full CLAUDE.md Hierarchy: From Enterprise Policy to Subdirectory Rules**, `https://www.rushis.com/the-full-claude-md-hierarchy-from-enterprise-policy-to-subdirectory-rules/` - kompletna tabela 5 tierow, konkretne conflict examples
8. Avi Chawla, **Anatomy of the .claude/ Folder**, `https://blog.dailydoseofds.com/p/anatomy-of-the-claude-folder` - kompletny anatomiczny przeglad folderu .claude
9. CodeWithMukesh, **Anatomy of the .claude Folder - Every File Explained (2026)**, `https://codewithmukesh.com/blog/anatomy-of-the-claude-folder/` - settings precedence, file scoping
10. Shahab Papoon, **Mastering CLAUDE.md: The Developer's Guide to Multi-Project AI Workflows**, `https://www.shahabpapoon.com/blog/mastering-claude-md-multi-project-workflow/` - multi-project konkretne przyklady, placement decision matrix
11. Shareuhack, **Claude Code Ignores Your CLAUDE.md? It's the Delivery Mechanism, Not a Bug (2026 Fix)**, `https://www.shareuhack.com/en/posts/claude-code-claude-md-setup-guide-2026` - delivery mechanism (user message vs system prompt), token budget guidance
12. Myougatheaxo (dev.to), **Claude Code in Monorepos: Hierarchical CLAUDE.md and Package-Scoped Instructions**, `https://dev.to/myougatheaxo/claude-code-in-monorepos-hierarchical-claudemd-and-package-scoped-instructions-1il9` - monorepo file tree, ancestor/descendant loading patterns
13. Anvodev (dev.to), **How I Organized My CLAUDE.md in a Monorepo with Too Many Contexts**, `https://dev.to/anvodev/how-i-organized-my-claudemd-in-a-monorepo-with-too-many-contexts-37k7` - practical monorepo organization
14. The Prompt Shelf, **Claude Code in a Monorepo: The Complete Setup Guide**, `https://thepromptshelf.dev/blog/claude-code-monorepo-setup/`
15. TrueFoundry, **Claude Code Governance: Building an Enterprise Usage Policy from Scratch**, `https://www.truefoundry.com/blog/claude-code-governance-building-an-enterprise-usage-policy-from-scratch` - enterprise deployment patterns
16. Anthropic Engineering Blog (syntezowane przez community), **Claude best practices 2026: the complete power user guide**, `https://www.the-ai-corner.com/p/claude-best-practices-power-user-guide-2026`
17. Steve Kinney, **CLAUDE.md | Developing with AI Tools**, `https://stevekinney.com/courses/ai-development/claude-dot-md` - edukacyjny overview
18. Shanraisshan, **Monorepo Support**, `https://deepwiki.com/shanraisshan/claude-code-best-practice/5.3-monorepo-support` - deepwiki synthesis

### Przeliczone cytowania (kluczowe fragmenty)

- **"All discovered files are concatenated into context rather than overriding each other."** - Anthropic Memory docs, sekcja "How CLAUDE.md files load"
- **"Managed policy CLAUDE.md files cannot be excluded."** - Anthropic Memory docs, sekcja "Deploy organization-wide CLAUDE.md"
- **"CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself."** - Anthropic Memory docs, sekcja "Troubleshoot memory issues"
- **"if two rules contradict each other, Claude may pick one arbitrarily"** - Anthropic Memory docs, sekcja "Write effective instructions"
- **"Files over 200 lines consume more context and may reduce adherence."** - Anthropic Memory docs, sekcja "Troubleshoot memory issues"

---

**Status raportu:** COMPLETE. Pokryte wszystkie 10 wymagane obszary. Tabela precedence + merge w sekcji 6. Min 5 konflikt scenariuszy w sekcji 8 (plus bonus 6). Kazdy tier ma use case + example + antipattern.

**Delta do innych researcherow (sugerowane):**
- R3: Weryfikacja empiryczna kolejnosci concat przez `InstructionsLoaded` hook (sekcja 11 gap #1)
- R4: Plugin CLAUDE.md landscape - czy jest unofficial workaround ktory warto udokumentowac (sekcja 5)
- R5: Auto memory vs CLAUDE.md - konflikt matrix (sekcja 11 gap #8)
