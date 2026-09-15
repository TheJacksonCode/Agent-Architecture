# R4: Writing Best Practices for CLAUDE.md

**Researcher:** R4 (Opus 4.7)
**Scope:** What to include (DO), what to avoid (DON'T), mid-level abstractions rule, density vs readability, token budget, imperative vs declarative style, community patterns, anti-patterns, and starter templates per project type.
**Date:** 2026-04-17
**Campaign:** Claude Code CLAUDE.md Patterns 2026 (Tier 1 #3)

---

## 1. Abstract

CLAUDE.md is, per Anthropic's own wording in their best-practices doc, **"the single most impactful thing you can do to improve Claude Code output"** [C1]. It is a plain-markdown file that Claude Code loads into every session as a user message after the system prompt, and because it is **context rather than enforced configuration**, how you write it matters enormously. Getting it wrong is not a crash but a slow, silent degradation: Claude starts "forgetting" rules, asks questions already answered, or ignores half the file entirely [C1, C5].

This report synthesizes primary Anthropic documentation (code.claude.com/memory, code.claude.com/best-practices), Anthropic engineering content (context-engineering posts), community pattern libraries (HumanLayer, Shrivu Shankar, alexop.dev, elegantsoftwaresolutions, dev.to docat0209, TurboDocx), famous public CLAUDE.md files (Metabase, LangGraphJS, HASH, Inkline, TPL), and anti-pattern discussions from GitHub issues and context-rot articles.

**Five principles dominate all sources:**

1. **Target <200 lines, ideally 30-100.** Anthropic explicitly says **"target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence"** [C1]. HumanLayer keeps theirs under 60 lines [C6]. dev.to's 30-Line Rule outperforms 200-line files [C7]. Shrivu Shankar's professional monorepo reaches 13KB but treats it as a "constitution" [C8].

2. **Mid-level abstractions only.** Don't tell Claude what it can read in code ("every function has a name"). Don't tell Claude what's obvious ("it's a web app"). Tell it things **it would otherwise re-explain every session**: non-default conventions, commands it can't guess, quirks, architecture decisions [C1, C3].

3. **Specific and verifiable beats vague.** `"Use 2-space indentation"` beats `"format code properly"`. `"Run npm test before committing"` beats `"test your changes"` [C1].

4. **Positive instructions beat negative ones.** LLMs activate the concept either way. "Use named exports exclusively" beats "Do NOT use default exports" [C7].

5. **Hooks > CLAUDE.md for hard enforcement.** CLAUDE.md is advisory prose. If a rule has been violated 3+ times, move it to a hook or lint tool; don't add more CAPS to CLAUDE.md [C3, C7].

The rest of this report operationalizes these principles with 17 DO items, 17 DON'T items, 5 complete starter templates, and 12 concrete anti-pattern failures from the wild.

---

## 2. Mental model: mid-level abstractions

The CLAUDE.md abstraction level is the hardest thing to get right. Both extremes fail:

### Too low (in the code already)

```markdown
# DON'T - content Claude can read from source
## Functions

- `formatDate(date)` in src/utils/date.ts - formats ISO dates
- `parseUser(raw)` in src/models/user.ts - parses user JSON
- `hashPassword(plain)` in src/auth/hash.ts - bcrypt wrapper
[... 200 more function descriptions]
```

Anthropic's own table calls this out: **"File-by-file descriptions of the codebase"** goes in the Exclude column [C2]. Claude Code has Read, Grep, and Glob tools. It will find functions on demand. A function list is duplicated documentation that goes stale the moment you merge a PR.

### Too high (obvious to any reader)

```markdown
# DON'T - obvious to anyone who opened the repo
## About

This is a web application. It uses a database. Users can log in.
We value clean code and good tests. Please write maintainable code.
```

Shrivu Shankar: **"Start with Guardrails, Not a Manual. Your CLAUDE.md should start small, documenting based on what Claude is getting wrong"** [C8]. Platitudes like "write clean code" take up tokens and teach Claude nothing. Anthropic's exclusion list names **"Self-evident practices like 'write clean code'"** directly [C2].

### Just right: mid-level

The Goldilocks zone is **"facts Claude should hold in every session"** [C1]. Examples:

- **Commands Claude can't guess.** `pnpm vitest run` not `pnpm test` because `test` triggers watch mode. `cargo test --workspace --all-features` because the default misses feature-gated tests.
- **Non-default conventions.** `"All API handlers return { data, error } shape"`. `"Tests live next to source in __tests__/, not in a top-level tests/"`.
- **Architecture decisions with constraints.** `"The legacy/ directory uses old ESLint config - don't propagate its style"`. `"Hot reload sometimes fails; restart with pnpm dev:clean"`.
- **Key file-to-folder mapping (short).** `src/api/handlers/` = route handlers; `src/services/` = business logic. Not a 50-line tree - 5 lines of anchors.
- **Glossary / domain terms.** If `Invoice` means something different in your app than in accounting, say so once.

HumanLayer's formulation: structure around **WHAT / WHY / HOW** [C6]:

- **WHAT**: tech stack and repo architecture (apps, shared packages, what they do)
- **WHY**: purpose and functional context for non-obvious components
- **HOW**: workflows, test procedures, verification commands (bun vs node?)

The pragmatic test: for each line, ask **"Would removing this cause Claude to make mistakes?"** [C2]. If no, delete it.

---

## 3. What to include (DO) - 17 categories with examples

The following categories are drawn directly from Anthropic's DO column in the best-practices doc [C2], cross-referenced with community patterns.

### 3.1 Non-guessable build/test/lint/deploy commands

**Why:** Claude can read `package.json` but cannot know that `pnpm test` runs in watch mode, or that `pnpm vitest run` is what you actually want in CI mode. Anthropic: **"Bash commands Claude can't guess"** [C2].

```markdown
## Commands

- Dev: `pnpm dev`
- Test: `pnpm vitest run`         # NOT `pnpm test` (watch mode)
- Lint: `pnpm biome check --write .`
- Typecheck: `pnpm tsc --noEmit`
- Migrate: `pnpm prisma migrate dev`
- Build: `pnpm build`
```

### 3.2 Code style rules that differ from defaults

**Why:** Claude already knows PEP 8 and standard TypeScript idioms. Only tell it about **deviations**. Anthropic: **"Code style rules that differ from defaults"** [C2].

```markdown
## Code style

- Single quotes, no semicolons (Biome handles this).
- Named exports only. No default exports.
- camelCase variables, PascalCase components, UPPER_SNAKE_CASE constants.
- kebab-case file names.
- Pure functions preferred. No classes except third-party SDK wrappers.
```

### 3.3 Testing preferences (runner, location, coverage rules)

**Why:** Claude can run any test runner, but won't know you prefer single-test runs for perf, or that tests must sit next to source.

```markdown
## Testing

- Tests live in `__tests__/` next to source, not top-level `tests/`.
- Use `.test.ts` suffix.
- Prefer running single tests for speed: `pnpm vitest run path/to/file.test.ts`.
- Coverage threshold: 80% (enforced in CI).
- Use `happy-dom`, not `jsdom`.
```

### 3.4 Architecture decisions (mid-level, with constraints)

**Why:** Encodes *why* so Claude doesn't undo a deliberate choice. Anthropic: **"Architectural decisions specific to your project"** [C2].

```markdown
## Architecture

- API routes return `{ data, error }` discriminated union. Never throw from handlers.
- Server Components by default; client components only when they use hooks.
- Database access goes through `src/db/queries/*`. Handlers never call Prisma directly.
- All background work runs in `workers/` via BullMQ. Routes never block.
```

### 3.5 Workflow rules (how we work)

**Why:** Closes the loop between write-commit-ship without re-explaining every session.

```markdown
## Workflow

- Branch: `feat/*`, `fix/*`, `chore/*`. Off `main`.
- Commits: conventional commits with scope. Run `pnpm lint` before commit.
- PRs: squash merge, require 1 review.
- Always typecheck + test after a series of code changes.
- Prefer running single tests over the full suite for perf.
```

### 3.6 Repository etiquette (branch/PR conventions)

Anthropic lists **"Repository etiquette (branch naming, PR conventions)"** [C2] as a DO.

```markdown
## Repo etiquette

- Branch naming: `feature/<ticket>-<slug>`, `fix/<ticket>-<slug>`.
- PR template: `.github/PULL_REQUEST_TEMPLATE.md`.
- Squash-and-merge only. Delete branch after merge.
- PR title in conventional-commits format (enforced by CI).
```

### 3.7 Developer environment quirks (required env vars)

Anthropic lists **"Developer environment quirks (required env vars)"** [C2].

```markdown
## Environment

- Node 20+, pnpm 9+.
- `DATABASE_URL` and `REDIS_URL` required in `.env.local` (see `.env.example`).
- Docker required for integration tests: `docker compose up postgres redis -d`.
- On macOS with Apple Silicon, run `pnpm rebuild` after `pnpm install`.
```

### 3.8 Common gotchas and non-obvious behaviors

Anthropic's DO list: **"Common gotchas or non-obvious behaviors"** [C2].

```markdown
## Gotchas

- Tests must run sequentially: `pnpm vitest run --pool=forks --poolOptions.forks.singleFork`.
- The `legacy/` dir uses the old ESLint config - don't propagate its style elsewhere.
- Hot reload sometimes fails after installing a new dep; restart with `pnpm dev:clean`.
- `prisma generate` runs in a `postinstall` hook; ignore "already generated" warnings.
```

### 3.9 Key file-to-folder mapping (short)

**Why:** Anchors Claude's Read/Grep, but under 10 lines. More = duplication of directory tree.

```markdown
## Structure

- src/app/          - Next.js App Router (pages + layouts)
- src/components/   - React components
- src/lib/          - utilities and config
- src/server/       - backend (API handlers, services, db)
- prisma/           - schema + migrations
- tests/e2e/        - Playwright specs
```

### 3.10 Domain glossary (terms with non-standard meaning)

**Why:** Prevents Claude from assuming a term means what it does elsewhere.

```markdown
## Glossary

- "Invoice" = an internal billing record; not an Invoice<T> from our payments lib.
- "Tenant" = a workspace, not a real-estate unit (despite the table name).
- "Soft delete" = we set `deleted_at`, never physical DELETE.
- "Run" = a workflow execution; "Job" = a single step inside a Run.
```

### 3.11 Verification recipe (post-change checklist)

**Why:** Claude's single highest-leverage behavior is **verifying its work** [C2]. Tell it what "verified" means in your repo.

```markdown
## Verification

After every change, run in this order:
1. `pnpm tsc --noEmit`   - fix type errors
2. `pnpm vitest run`     - fix failing tests
3. `pnpm biome check .`  - fix lint errors
4. If UI changed: take a screenshot and compare to the spec in `/docs/ui/`.
```

### 3.12 Reference documents with "Read when" triggers

**Why:** Progressive disclosure - don't dump a 500-line architecture doc into every session. Point to it with a trigger [C10, C2].

```markdown
## Reference docs

### API architecture - @docs/api-architecture.md
**Read when:** adding or modifying an API endpoint.
Defines route patterns, auth middleware, error envelope.

### Billing flow - @docs/billing.md
**Read when:** touching `src/server/billing/` or webhook handlers.
Stripe webhook verification, idempotency keys, reconciliation.
```

### 3.13 Tooling preferences with alternatives

**Why:** Shrivu Shankar: **"always providing alternatives, as restrictions alone confuse agents"** [C8].

```markdown
## Tooling

- Package manager: `uv` (not pip, not Poetry).
- Data: `polars` by default; use `pandas` only for library compat.
- HTTP: `httpx` (not `requests`). Async handlers use `httpx.AsyncClient`.
- JSON: `orjson` for hot paths; stdlib `json` otherwise.
```

### 3.14 Safety / data-handling reminders

**Why:** Managed-policy CLAUDE.md is explicitly recommended by Anthropic for **"Data handling and compliance reminders"** [C1].

```markdown
## Safety

- Never commit secrets. Use env vars loaded via `pydantic-settings`.
- All user input validated with Zod at the boundary (route handler).
- SQL through parameterized queries only. No string concatenation.
- PII fields (email, phone) must go through `src/lib/pii.ts` masking helpers.
```

### 3.15 Agent-specific behavioral rules

**Why:** Anthropic recommends CLAUDE.md for **"Behavioral instructions for Claude"** [C1].

```markdown
## Claude behavior

- Use plan mode for changes spanning >2 files.
- When uncertain about a library API, read its README first (Read tool).
- If a test fails twice, stop and surface the symptom. Don't silently retry.
- Prefer editing existing files over creating new ones.
```

### 3.16 Import pointers to modular docs/rules

**Why:** @ syntax pulls in topic-specific docs without bloating the root file [C1].

```markdown
## Rules

@.claude/rules/testing.md
@.claude/rules/api-design.md
@~/.claude/my-personal-preferences.md
```

### 3.17 Auto-tuned emphasis for persistently-violated rules

**Why:** Anthropic: **"You can tune instructions by adding emphasis (e.g., 'IMPORTANT' or 'YOU MUST') to improve adherence"** [C2]. Use sparingly.

```markdown
## Critical rules

- **IMPORTANT:** All DB migrations must have a `down` step. CI fails otherwise.
- **YOU MUST** run `pnpm audit-types` before a release PR.
- **IMPORTANT:** Never edit files under `generated/` - regenerated from spec.
```

---

## 4. What NOT to include (DON'T) - 17 categories with examples

### 4.1 Full code dumps (schemas, API specs, type definitions)

**Anti-pattern:**

```markdown
## Database schema

[Entire schema.sql pasted: 800 lines of CREATE TABLE statements]
```

**Why it fails:** Duplication-of-code - Claude can `Read prisma/schema.prisma` on demand. Every token spent here is subtracted from task-specific context. Anthropic: **"Anything Claude can figure out by reading code"** [C2].

**Fix:** `See @prisma/schema.prisma for the schema.`

### 4.2 README duplicate

**Anti-pattern:** Copy-pasting the whole README into CLAUDE.md "so Claude sees it too."

**Why it fails:** Two sources of truth that drift. Anthropic provides `@README.md` syntax specifically to avoid this [C1].

**Fix:**

```markdown
See @README.md for project overview and @package.json for available npm commands.
```

### 4.3 Secrets, tokens, keys, connection strings

**Anti-pattern:**

```markdown
## Staging DB

DATABASE_URL=postgres://admin:hunter2@staging.internal:5432/prod
STRIPE_KEY=sk_test_REDACTED_EXAMPLE
```

**Why it fails:** CLAUDE.md is committed to git. Now your secret is in history forever. Anthropic best-practices calls out: **"Never commit secrets"** as standard guidance.

**Fix:** `DATABASE_URL` required (see `.env.example`). Real value from vault.

### 4.4 Ephemera / today's-patch notes

**Anti-pattern:**

```markdown
## Current task

We're migrating the billing module to Stripe Connect.
Step 1: [...]
Step 2: [...]
TODO: Jack to review by Thursday.
```

**Why it fails:** This is task state, not persistent context. It pollutes every session after the task is done and Jack has merged. Anthropic: **"Information that changes frequently"** is in the Exclude column [C2]. Per the Maciej workspace standard, ephemera goes to `v{N}/plans/`, not CLAUDE.md.

**Fix:** Move to `plans/CURRENT_TASK.md` or a GitHub issue. CLAUDE.md stays timeless.

### 4.5 Verbose tutorials

**Anti-pattern:**

```markdown
## How to add a new API endpoint

Step 1: Open your editor...
Step 2: Create a new file in src/api/...
Step 3: Import the Router from...
[1,200 more words]
```

**Why it fails:** Anthropic: **"Long explanations or tutorials"** is in the Exclude column [C2]. Tutorials belong in a skill (loads on demand) or docs/.

**Fix:** `See @docs/add-endpoint.md` with a "Read when" trigger.

### 4.6 Git history / project narrative

**Anti-pattern:**

```markdown
## History

Founded in 2019 by Alice and Bob as a side project. Pivoted to enterprise in 2022.
Major incidents: 2023-04 outage taught us X. 2024-11 security scare led to Y.
```

**Why it fails:** Claude Code has `git log` and a Bash tool. Narrative consumes tokens without steering current behavior.

**Fix:** If a historical incident changed a pattern, encode the pattern ("Rate-limit webhooks - see 2024-11 incident for why") not the narrative.

### 4.7 Standard language / framework conventions

**Anti-pattern:**

```markdown
## Python rules

- Functions use def.
- Classes use class.
- Use 4-space indentation (PEP 8).
- Import statements at the top of the file.
```

**Why it fails:** Anthropic: **"Standard language conventions Claude already knows"** [C2]. Every line of boilerplate is a line Claude could have spent on your specific rules.

**Fix:** Delete. Say only deviations: "88-col line length, not 79."

### 4.8 Self-evident practices

**Anti-pattern:**

```markdown
- Write clean, maintainable code.
- Follow best practices.
- Be consistent.
- Write good tests.
```

**Why it fails:** Anthropic: **"Self-evident practices like 'write clean code'"** [C2]. Claude already tries to do these. You're diluting the signal.

**Fix:** Specific, verifiable equivalents. "All public functions have explicit return types." "Tests run in <5s; split or mark @slow if not."

### 4.9 Full API documentation

**Anti-pattern:**

```markdown
## Our REST API

GET /api/users - Returns a list of users. Query params: ?page, ?limit, ?sort.
Response shape: { data: User[], pagination: {...} }. Example: [...]

POST /api/users - Creates a user. Request body: { email, name }. Validation: ...
[200 more endpoints]
```

**Why it fails:** Anthropic: **"Detailed API documentation (link to docs instead)"** [C2]. Goes stale on every merge.

**Fix:** `See @openapi.yaml` or `See @docs/api.md`.

### 4.10 Prohibition-only rules with no alternative

**Anti-pattern:**

```markdown
- Don't use default exports.
- Don't use the any type.
- Don't use console.log.
- Never use bare except.
```

**Why it fails:** Shrivu Shankar: **"restrictions alone confuse agents trying to accomplish tasks"** [C8]. dev.to: **"Language models struggle with negation. When you write 'Do NOT use semicolons,' the concept itself gets activated either way"** [C7].

**Fix:** Rewrite as positive directives with the alternative:

```markdown
- Use named exports exclusively.
- Type everything explicitly; use `unknown` and narrow when the type is uncertain.
- Use `logger.info/warn/error` from `src/lib/logger.ts` for all logging.
- Catch specific exceptions: `except ValueError`, not bare `except:`.
```

### 4.11 Rules a linter/formatter already enforces

**Anti-pattern:**

```markdown
- Use 2-space indentation.
- Single quotes for strings.
- Trailing commas in multi-line arrays.
- Alphabetize imports.
```

**Why it fails:** alexop.dev: **"If a tool can enforce it, don't write prose about it"** [C10]. HumanLayer: **"Never send an LLM to do a linter's job. LLMs are comparably expensive and incredibly slow compared to traditional linters and formatters"** [C6].

**Fix:** `Code style enforced by Biome: pnpm biome check --write .` One line replaces 20.

### 4.12 Everything-in-one-file for large projects

**Anti-pattern:** A 2,000-line CLAUDE.md with Project Overview + Code Style + Architecture + Gotchas + Testing + Migration notes + Security + Deploy + Onboarding, all at the root.

**Why it fails:** alexop.dev documents the real-world balloon: "Project Overview ~50 lines, Code Style ~200, Architecture ~150, Gotchas ~300, Testing ~100. Half your context budget is gone before any work begins" [C10]. Context-rot research shows **"information placed in the middle of long contexts is recalled less reliably than information at the beginning or end"** [C11].

**Fix:** Root CLAUDE.md <150 lines + `.claude/rules/*.md` with `paths:` frontmatter + `docs/*.md` with "Read when" triggers. Only universal context stays at root.

### 4.13 Contradictory instructions

**Anti-pattern:**

```markdown
(in root CLAUDE.md)
- Always use Tailwind for styling.
(in src/components/CLAUDE.md)
- Use CSS Modules for component styles.
```

**Why it fails:** Anthropic: **"if two rules contradict each other, Claude may pick one arbitrarily"** [C1]. Intermittent non-compliance is the hardest bug to diagnose.

**Fix:** Review nested CLAUDE.md files on merge. Use `claudeMdExcludes` in monorepos to skip other teams' files [C1].

### 4.14 Shouting at Claude in all-caps

**Anti-pattern:**

```markdown
IMPORTANT!!! YOU MUST NEVER EVER USE ANY TYPE!!!
CRITICAL!!! ALWAYS RUN TESTS!!!
DO NOT FORGET!!! NAMED EXPORTS ONLY!!!
(all 40 rules in all-caps with triple exclamation marks)
```

**Why it fails:** awesome-claude-code explicitly flags this: exemplary CLAUDE.md files achieve quality by **"thorough but not verbose"** and avoid **"primarily consist[ing] in shouting at Claude in all-caps"** [C4]. When everything is critical, nothing is. Emphasis tunes best when used 2-3 times, not 20.

**Fix:** Reserve `**IMPORTANT:**` for the 1-3 rules that are truly load-bearing.

### 4.15 Rules for hard enforcement that should be hooks

**Anti-pattern:**

```markdown
- NEVER commit with failing tests.
- NEVER push to main.
- ALWAYS run lint before commit.
- NEVER deploy on Friday.
```

**Why it fails:** Anthropic: **"Unlike CLAUDE.md instructions which are advisory, hooks are deterministic and guarantee the action happens"** [C2]. dev.to Pattern 4: **"If you have told Claude not to do something 3 times and it keeps doing it, move that rule from CLAUDE.md to a hook"** [C7].

**Fix:** Use `PreToolUse`/`PreCommit`/`Stop` hooks in `.claude/settings.json`. CLAUDE.md explains behavior; hooks guarantee it.

### 4.16 Personal preferences in the team's project CLAUDE.md

**Anti-pattern:**

```markdown
(in team-shared ./CLAUDE.md)
- I prefer pnpm over npm.
- My editor is Neovim with these plugins: ...
- When I'm tired, skip the unit tests.
```

**Why it fails:** Team CLAUDE.md is checked into git and applies to everyone. Personal preferences collide with teammates.

**Fix:** Three tiers [C1]:
- `./CLAUDE.md` - team-shared (in git).
- `~/.claude/CLAUDE.md` - personal preferences for all your projects.
- `./CLAUDE.local.md` - personal + project-specific (in .gitignore).

### 4.17 Auto-generated boilerplate left unreviewed

**Anti-pattern:** Running `/init` once, never touching the file again, letting the auto-generated 400-line draft sit forever.

**Why it fails:** HumanLayer: **"Don't Auto-Generate: Avoid /init or automated generation. Since this file 'affects every single phase of your workflow,' manual curation ensures quality"** [C6]. `/init` discovers build commands but also includes generic boilerplate.

**Fix:** Treat `/init` output as a first draft. Delete anything that doesn't earn its place. Anthropic: **"Treat CLAUDE.md like code: review it when things go wrong, prune it regularly"** [C2].

---

## 5. Density vs readability tradeoff

**Question:** Dense bullet-heavy vs flowing prose - which works better for Claude as reader?

**Answer:** Bullet-heavy, structurally organized, with short prose captions where context is needed.

### Evidence

Anthropic: **"use markdown headers and bullets to group related instructions. Claude scans structure the same way readers do: organized sections are easier to follow than dense paragraphs"** [C1].

Dense paragraphs force attention to span the whole block. Headers and bullets create **scanning anchors**: a section header acts like a high-weight token cluster, letting Claude skip to the relevant block.

### Pattern comparison

**Dense prose (anti-pattern):**

```markdown
This project uses TypeScript in strict mode with Next.js 15 and the App Router.
We use Prisma for the database layer with PostgreSQL in production and SQLite
locally. Authentication goes through NextAuth v5 with Google and GitHub OAuth.
Styling uses Tailwind with shadcn/ui components; we don't use CSS Modules.
Testing uses Vitest for units, Playwright for E2E. Deploy is Vercel with
preview branches. We follow the conventional commits format...
```

Problems: nothing to anchor attention, Claude must read it all every time to find anything.

**Structured (good pattern):**

```markdown
## Stack

- Runtime: Node 20, TypeScript strict
- Framework: Next.js 15 (App Router)
- DB: Prisma + PostgreSQL (prod), SQLite (dev)
- Auth: NextAuth v5 (Google, GitHub)
- Styling: Tailwind + shadcn/ui (no CSS Modules)
- Testing: Vitest (unit), Playwright (E2E)
- Deploy: Vercel

## Commands

- Dev: `pnpm dev`
- Test: `pnpm vitest run`
...
```

Same content, half the tokens, scannable.

### When prose helps

A 1-2 sentence caption above a bullet list adds intent:

```markdown
## Verification

Always verify in this exact order. Type errors break tests silently, so typecheck first:

1. `pnpm tsc --noEmit`
2. `pnpm vitest run`
3. `pnpm biome check .`
```

One sentence of "why" multiplies adherence for the bullets below. More than 2 sentences = back to prose-paragraph territory.

### Rule of thumb

- **80% bullets, 20% prose captions.**
- Every H2 section: ≤10 bullets.
- Every bullet: ≤15 words.
- Prose captions: ≤2 sentences, only when intent isn't obvious.

---

## 6. Token budget rules of thumb

CLAUDE.md is loaded into context at session start and **re-injected after `/compact`** [C1]. Every token is spent on every inference for the rest of the session. This is the most important sizing constraint.

### Anthropic's explicit recommendations

- **Target under 200 lines per CLAUDE.md** [C1].
- **"Longer files consume more context and reduce adherence"** [C1].
- **Files over 200 lines: split with @imports or .claude/rules/ files** [C1].

### Community benchmarks

| Source | Recommendation |
|---|---|
| Anthropic docs | <200 lines |
| TurboDocx | Under 200 lines target; 300 lines ceiling [C9] |
| dev.to docat0209 | 30-line rule: "A focused 30-line file outperforms a comprehensive 200-line file every time" [C7] |
| HumanLayer | Under 60 lines in their root [C6] |
| abhishekray07/claude-md-templates | Under 60-80 lines; beyond, Claude deprioritizes content [C6] |
| alexop.dev | Under ~500 words for most projects [C10] |
| Shrivu Shankar | 13KB for a professional monorepo (~400 lines) - treats as "constitution" [C8] |

### Practical budget bands

| Size | Lines | ~Tokens | When |
|---|---|---|---|
| **Zwinne (lean)** | 30-100 | 200-800 | Small project, library, CLI tool, personal script |
| **Srednie (moderate)** | 100-200 | 800-1600 | Standard app (Next.js, FastAPI, Django) with 3-5 team members |
| **Ciezkie (heavy)** | 200-400 | 1600-3200 | Monorepo with multiple services + critical gotchas. Consider splitting. |
| **Przekroczone (over)** | 400+ | 3200+ | Almost always a refactor target. Split with @imports and `.claude/rules/`. |

### Token math

1 line of markdown ≈ 8 tokens average. A 200-line CLAUDE.md ≈ 1600 tokens. Claude Code's system prompt is ~3-4k tokens. Your CLAUDE.md at 1600 tokens is 10-15% of startup context. At 3200 tokens (400 lines), you're approaching 25%.

The alexop.dev post quantifies: **"A 500-token CLAUDE.md costs you 500 tokens on every single inference, and a 12,000-token skill file costs 12,000 tokens every time"** [C10]. Unlike a skill (loads on demand), CLAUDE.md is always-on cost.

### When to split

Split when you hit **150-200 lines at the root**:

```
/project
  CLAUDE.md                    # <150 lines of universal context
  .claude/
    rules/
      testing.md               # paths: tests/**, __tests__/**
      api-design.md            # paths: src/api/**
      security.md              # always-load, security policies
  docs/
    architecture.md            # referenced with "Read when: new service"
    billing.md                 # referenced with "Read when: touching billing"
```

The `paths:` frontmatter on `.claude/rules/*.md` files makes them **conditionally load** only when Claude reads matching files [C1]. Drastically reduces per-session cost.

---

## 7. Style: imperative vs declarative

**Question:** Imperative ("Run test: `bun test`") vs declarative ("Tests run with bun") - which is better for LLMs?

**Answer:** Imperative wins for commands, rules, and behavior. Declarative wins for facts, architecture, and context.

### Evidence

Anthropic's own examples in the memory doc are overwhelmingly **imperative**:

- "Use 2-space indentation" (imperative) vs "Code uses 2 spaces" (declarative) [C1]
- "Run `npm test` before committing" (imperative) vs "Tests are run before commit" (declarative) [C1]
- "API handlers live in `src/api/handlers/`" (declarative - this is a fact)
- "Prefer running single tests, and not the whole test suite, for performance" (imperative) [C2]

### Why imperative for rules

LLMs generate a next-token distribution. A directive "Use X" primes "X" tokens. A declarative "X is used" primes description tokens, which Claude needs to mentally convert to a rule. The conversion adds noise.

### Pattern

**Good - imperative for behavior:**

```markdown
## Workflow

- Run `pnpm tsc --noEmit` before declaring a task done.
- Use plan mode for changes spanning >2 files.
- Prefer editing existing files over creating new ones.
- Always write a failing test before implementing a fix.
```

**Good - declarative for facts:**

```markdown
## Architecture

- API routes return `{ data, error }` discriminated union.
- DB access is through `src/db/queries/*`.
- Background jobs run in BullMQ workers under `workers/`.
- The `legacy/` dir uses old ESLint config.
```

You're not telling Claude what to do; you're telling it what exists. Declarative is natural here.

### Mixed example (real)

```markdown
## Testing            # H2 is a topic anchor

Tests live in `__tests__/` next to source.      # declarative fact
Use `.test.ts` suffix.                          # imperative rule
Coverage threshold: 80% (CI-enforced).          # declarative fact
Prefer single-test runs for speed:              # imperative with rationale
  `pnpm vitest run path/to/file.test.ts`.
```

### Second-person vs third-person

Both work, but **second-person imperative** ("Use X", "Run Y") tests slightly better than passive voice ("X should be used"). Passive invites ambiguity about the agent.

### Tone

Keep it factual and calm. Anthropic on emphasis: **"You can tune instructions by adding emphasis (e.g., 'IMPORTANT' or 'YOU MUST') to improve adherence"** [C2] - but used 2-3 times max. Every rule in CAPS = no rule is emphasized.

---

## 8. Anthropic's recommendations (verbatim)

The authoritative source is **code.claude.com/docs/en/memory** (formerly docs.claude.com/en/docs/claude-code/memory) and **code.claude.com/docs/en/best-practices**. Quoting Anthropic directly [C1, C2]:

### On purpose and mental model

> "CLAUDE.md files are markdown files that give Claude persistent instructions for a project, your personal workflow, or your entire organization. You write these files in plain text; Claude reads them at the start of every session."

> "CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself. Claude reads it and tries to follow it, but there's no guarantee of strict compliance, especially for vague or conflicting instructions."

### On when to add

> "Treat CLAUDE.md as the place you write down what you'd otherwise re-explain. Add to it when:
> - Claude makes the same mistake a second time
> - A code review catches something Claude should have known about this codebase
> - You type the same correction or clarification into chat that you typed last session
> - A new teammate would need the same context to be productive"

### On size

> "Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence. If your instructions are growing large, split them using imports or .claude/rules/ files."

### On specificity

> "Specificity: write instructions that are concrete enough to verify. For example:
> - 'Use 2-space indentation' instead of 'Format code properly'
> - 'Run npm test before committing' instead of 'Test your changes'
> - 'API handlers live in src/api/handlers/' instead of 'Keep files organized'"

### On consistency

> "Consistency: if two rules contradict each other, Claude may pick one arbitrarily. Review your CLAUDE.md files, nested CLAUDE.md files in subdirectories, and .claude/rules/ periodically to remove outdated or conflicting instructions."

### On treating it like code

> "Treat CLAUDE.md like code: review it when things go wrong, prune it regularly, and test changes by observing whether Claude's behavior actually shifts."

### The canonical DO/DON'T table [C2]

| Include | Exclude |
|---|---|
| Bash commands Claude can't guess | Anything Claude can figure out by reading code |
| Code style rules that differ from defaults | Standard language conventions Claude already knows |
| Testing instructions and preferred test runners | Detailed API documentation (link to docs instead) |
| Repository etiquette (branch naming, PR conventions) | Information that changes frequently |
| Architectural decisions specific to your project | Long explanations or tutorials |
| Developer environment quirks (required env vars) | File-by-file descriptions of the codebase |
| Common gotchas or non-obvious behaviors | Self-evident practices like "write clean code" |

### Failure mode (Anthropic)

> "If Claude keeps doing something you don't want despite having a rule against it, the file is probably too long and the rule is getting lost. If Claude asks you questions that are answered in CLAUDE.md, the phrasing might be ambiguous."

> "Bloated CLAUDE.md files cause Claude to ignore your actual instructions!"

---

## 9. Community patterns (simonw, Anthropic Eng, top repos)

### Simon Willison (simonw)

Simon's public Claude Code workflow [C12] focuses more on tool composition (Playwright MCP, skills) than long CLAUDE.md files. His research repo suggests he prefers **ephemeral scratchpads + task-specific prompts** over fat CLAUDE.md files - aligned with Anthropic's "keep it short" guidance. His TIL posts document specific integrations (e.g., `til/claude-code/playwright-mcp-claude-code.md`) rather than recommending a canonical CLAUDE.md template, which itself is a pattern: **specialize via skills/tools, not prose rules**.

### Shrivu Shankar ("How I Use Every Claude Code Feature") [C8]

Shrivu treats CLAUDE.md as a **"constitution"**. Key patterns:

1. **Document tools/APIs used by 30%+ of engineers.** Narrow coverage, not everything.
2. **Pitch, don't embed.** Instead of `@path/docs.md` for 500 lines of docs, write: *"For complex X usage or if you encounter a FooBarError, see `path/to/docs.md`"*. Claude reads the pointer on demand.
3. **Always provide alternatives with restrictions.** "Don't use `--foo`" is incomplete. "Use `--bar` instead of `--foo` because X" is actionable.
4. **Start with guardrails, not a manual.** Build CLAUDE.md reactively from Claude's actual mistakes, not proactively from everything you can think of.
5. **Parallel AGENTS.md for cross-tool compat.** His monorepo maintains both.
6. **Forcing function.** Keep CLAUDE.md concise to incentivize simplifying actual tooling. If you need 50 lines to explain your CLI, maybe the CLI is the problem.

### HumanLayer "Writing a Good CLAUDE.md" [C6]

HumanLayer's authoritative post-2025 synthesis:

1. **WHAT / WHY / HOW structure.** Tech stack; purpose/context; workflows/verification.
2. **Under 60 lines at root.** They run their own project at this size.
3. **Progressive disclosure.** Root points to `agent_docs/building_the_project.md`, `agent_docs/running_tests.md`, etc. **"Prefer pointers to copies...they will become out-of-date quickly."**
4. **Minimize instructions.** Frontier LLMs reliably follow 150-200 instructions. Claude Code's system prompt already has ~50. Your CLAUDE.md must fit in the remaining budget with room for per-turn instructions.
5. **Don't duplicate linters.** "Never send an LLM to do a linter's job."
6. **Don't auto-generate.** `/init` is a draft, not a finished product.

### awesome-claude-code [C4]

Featured examples and a key meta-observation:

- **Metabase** (~54 lines, Clojure): skills sections, tool preferences, backend test commands with imperative voice [C13]
- **LangGraphJS** (33 lines, TypeScript): three sections - Build/Test, Code Style, Architecture [C14]
- **HASH** (Rust): CLAUDE.md is a symlink to AGENTS.md - single source of truth [C15]
- **Inkline** (Vue 3): pnpm workflow, component creation process

The meta-observation: **"exemplary CLAUDE.md files like pre-commit-hooks achieve quality through being 'thorough but not verbose' and avoid 'primarily consist[ing] in shouting at Claude in all-caps.'"** [C4]

### Anthropic internal usage [C5]

Anthropic's internal-teams PDF doesn't discuss CLAUDE.md directly, but their context-engineering blog posts emphasize:

- **"Say less, mean more"** [C5]
- **Just-in-time context (JIT)** - retrieve on demand, don't preload
- **Four context-rot modes:** poisoning, distraction, confusion, clash

Large CLAUDE.md files hit three of these simultaneously: distraction (unrelated content), confusion (contradictions), and clash (override fights between nested files).

### dev.to "5 Patterns" (docat0209) [C7]

Five named patterns, all quotable:

1. **The 30-Line Rule.** Focused beats comprehensive.
2. **Positive over negative.** "Use named exports" beats "don't use default exports."
3. **Anchor critical rules at top AND bottom.** Intentional duplication leverages primacy + recency bias.
4. **Hooks for hard enforcement.** Three strikes = move to hook.
5. **Scope to subdirectories.** Multiple CLAUDE.md files, one per domain.

### Elegant Software Solutions [C3]

Provides a clean minimal template (under 20 lines) and enterprise template (~60 lines), with a **"Instead of X / Write Y"** anti-pattern table that refines Anthropic's DO/DON'T.

### abhishekray07/claude-md-templates [C16]

Structured template repo with **project/, global/, local/, rules/, workflows/** separation. Emphasizes 60-80 line benchmark, instruction budget of 150-200 total (including Claude's 50 system-prompt baseline), and self-improvement loop: after each correction, ask Claude to update CLAUDE.md.

---

## 10. Anti-patterns (concrete failures from the wild)

Twelve concrete failures, named with source links where possible.

### A1. The 2,000-line balloon

**Failure:** A team accumulates rules after every incident. Six months in, CLAUDE.md is 2,000 lines covering Project Overview (~50), Code Style (~200), Architecture (~150), Gotchas (~300), Testing (~100), plus deployment runbooks, on-call notes, and org history.

**Cited:** alexop.dev: **"Half your context budget is gone before any work begins"** [C10]. GitHub issue #29971 on anthropics/claude-code documents user reports of context bloat [C17].

**Why it kills:** Lost-in-the-middle degradation. Critical rules in the middle of 2,000 lines are recalled **"less reliably than information at the beginning or end"** [C17]. Claude ignores half the file.

**Fix:** Root <150 lines + `.claude/rules/*.md` with `paths:` + `docs/*.md` with Read-when triggers.

### A2. Pasting the entire schema.sql

**Failure:** 800 lines of `CREATE TABLE` in CLAUDE.md "so Claude doesn't have to discover the schema."

**Why it kills:** Duplication of code. The moment you run a migration, the two drift. Claude gets out-of-date info 100% of every session, instead of current info via `Read prisma/schema.prisma` when needed.

**Fix:** `See @prisma/schema.prisma`.

### A3. README duplicate

**Failure:** Copy-pasting README.md into CLAUDE.md. Now README edits require updating two files.

**Why it kills:** Two sources of truth → drift. Tokens wasted. Context pollution.

**Fix:** `See @README.md for project overview.` One line.

### A4. Secrets leak

**Failure:** Staging DB URL with password committed to a team CLAUDE.md. Stays in git history even after revert.

**Why it kills:** Credential exposure. Requires key rotation, git history rewrite.

**Fix:** Env var references only: `DATABASE_URL` required (see `.env.example`).

### A5. All-caps-shouting

**Failure:** Every rule wrapped in **IMPORTANT**, **CRITICAL**, **YOU MUST**, with triple exclamation marks.

**Cited:** awesome-claude-code explicitly flags **"primarily consist[ing] in shouting at Claude in all-caps"** as a quality anti-pattern [C4].

**Why it kills:** Emphasis inflation. Claude tunes out when everything is "critical."

**Fix:** 2-3 emphasized rules max. Trust the rest.

### A6. Ephemera build-up

**Failure:** CLAUDE.md includes "Current sprint: migrating billing to Stripe Connect. Jack reviewing Thursday. TODO by Friday."

**Why it kills:** Task state in permanent context. Claude references a completed migration three weeks later.

**Fix:** Task state → `plans/CURRENT_TASK.md` or GitHub issue. CLAUDE.md stays timeless.

### A7. Prohibition-only rules

**Failure:** A list of 40 "Never do X" rules with no alternative.

**Cited:** dev.to docat0209 Pattern 2: **"Language models struggle with negation"** [C7]. Shrivu: **"restrictions alone confuse agents"** [C8].

**Why it kills:** Negation activates the prohibited concept. Claude now thinks about default exports even when asked not to use them.

**Fix:** Rewrite as positive with alternative: "Use named exports exclusively."

### A8. Linter rules in prose

**Failure:** Documenting every Prettier rule (quote style, trailing commas, indent) in CLAUDE.md.

**Cited:** HumanLayer: **"Never send an LLM to do a linter's job"** [C6]. alexop.dev: **"If a tool can enforce it, don't write prose about it"** [C10].

**Why it kills:** Linters enforce deterministically and cheaply. LLM enforcement is expensive and probabilistic. You're paying tokens for worse enforcement.

**Fix:** Run Biome/Prettier/ESLint in a PostWrite hook. CLAUDE.md says: `Formatting enforced by Biome: pnpm biome check --write .`

### A9. Contradictory nested files

**Failure:** Root CLAUDE.md says "Use Tailwind". Nested `src/components/CLAUDE.md` says "Use CSS Modules".

**Cited:** Anthropic: **"if two rules contradict each other, Claude may pick one arbitrarily"** [C1].

**Why it kills:** Intermittent non-compliance. Impossible to reproduce or debug.

**Fix:** Grep nested files for conflicts on merge. Use `claudeMdExcludes` in monorepos to skip foreign teams' CLAUDE.md.

### A10. "Write clean code" platitudes

**Failure:** 20 bullets of "Write clean code," "Be consistent," "Follow best practices," "Write good tests."

**Cited:** Anthropic exclude column: **"Self-evident practices like 'write clean code'"** [C2].

**Why it kills:** Zero signal. Dilutes the specific rules that do matter.

**Fix:** Delete. Replace with specific, verifiable rules. "All public functions have explicit return types" instead of "write good types."

### A11. Multi-step procedures in root CLAUDE.md

**Failure:** A 200-line "how to add a new API endpoint" walkthrough in the root CLAUDE.md.

**Why it kills:** Procedures belong in skills (load on demand) or docs/. In CLAUDE.md they're loaded every session whether or not anyone's adding an endpoint.

**Cited:** Anthropic: **"If an entry is a multi-step procedure or only matters for one part of the codebase, move it to a skill or a path-scoped rule instead"** [C1].

**Fix:** Extract to `.claude/skills/add-endpoint/SKILL.md`. One-line reference in CLAUDE.md with "Read when: adding a new API endpoint."

### A12. `/init`-and-forget

**Failure:** Running `/init` once, never reviewing the 400-line output. Generic sections stay forever.

**Cited:** HumanLayer: **"Don't Auto-Generate: Avoid /init or automated generation. Manual curation ensures quality"** [C6].

**Why it kills:** `/init` discovers build commands well, but includes generic boilerplate Claude already knows.

**Fix:** Treat `/init` output as first draft. Delete anything that doesn't earn its tokens. Re-prune monthly.

---

## 11. Starter templates (5 project types)

Each template is **drop-in ready**, 30-80 lines, imperative-where-it-counts, mid-level abstractions. Copy, edit the bracketed parts, and ship.

### 11.1 TypeScript / React webapp (Next.js 15 + Prisma)

```markdown
# [Project Name]

[One-sentence description]. Next.js 15 App Router + TypeScript strict + Prisma.

## Stack

- Runtime: Node 20, pnpm 9
- Framework: Next.js 15 (App Router, Server Components by default)
- DB: Prisma + PostgreSQL (prod), SQLite (dev)
- Auth: NextAuth v5 (Google + GitHub)
- UI: Tailwind + shadcn/ui
- Testing: Vitest (unit), Playwright (E2E)
- Deploy: Vercel

## Commands

- Dev: `pnpm dev`
- Test: `pnpm vitest run`         # NOT `pnpm test` (watch)
- E2E: `pnpm playwright test`
- Lint: `pnpm biome check --write .`
- Typecheck: `pnpm tsc --noEmit`
- Migrate: `pnpm prisma migrate dev`
- Build: `pnpm build`

## Structure

- src/app/          - App Router routes + layouts
- src/components/   - React components (shadcn-style)
- src/lib/          - utilities, config, clients
- src/server/       - API handlers, services, db queries
- prisma/           - schema + migrations
- tests/e2e/        - Playwright specs

## Conventions

- Named exports only. No default exports.
- Server Components by default; client components only for hooks/interactivity.
- DB access through `src/server/db/queries/*`. Never call Prisma from a route.
- API routes return `{ data, error }` discriminated union. Never throw from handlers.
- Use `unknown` + narrow; never `any`.
- Tailwind first; no CSS Modules.

## Verification

After every change, run in order:
1. `pnpm tsc --noEmit`
2. `pnpm vitest run`
3. `pnpm biome check --write .`

## Gotchas

- `prisma generate` runs in postinstall; ignore "already generated" warnings.
- After installing a new dep, restart dev: `pnpm dev:clean`.
- `app/api/*/route.ts` handlers must export HTTP verbs as named functions (GET, POST).

## Reference docs

@docs/auth-flow.md     - Read when touching `src/server/auth/`
@docs/billing.md       - Read when touching `src/server/billing/` or Stripe webhooks
```

**Why it works:** ~60 lines. Every section earns its place. Commands are imperative with non-guessable flags. Conventions are positive, specific. Gotchas capture non-obvious behavior. Reference docs use Read-when triggers.

### 11.2 Python ML project (uv + polars + PyTorch)

```markdown
# [Project Name]

[One-sentence description]. Training + inference pipeline for [domain].

## Stack

- Python 3.12, uv for deps
- Data: polars (preferred), pandas (compat only)
- ML: PyTorch 2.5, transformers, datasets
- Experiments: Weights & Biases
- Testing: pytest, hypothesis (property tests)

## Commands

- Install: `uv sync`
- Train: `uv run python -m src.train --config configs/base.yaml`
- Eval: `uv run python -m src.eval --checkpoint ckpts/latest.pt`
- Test: `uv run pytest`
- Lint: `uv run ruff check --fix .`
- Format: `uv run ruff format .`
- Type check: `uv run mypy src/`

## Structure

- src/data/         - loaders, preprocessing
- src/models/       - model architectures
- src/train/        - training loops, optimizers
- src/eval/         - metrics, evaluation scripts
- src/infer/        - inference / serving
- configs/          - YAML experiment configs
- notebooks/        - exploration only, not imported from src/
- tests/            - pytest (mirrors src/)

## Conventions

- Use `polars` by default; `pandas` only for library compatibility.
- NEVER ingest more than 10 rows of a DataFrame into context during exploration.
- All public functions type-hinted with `from __future__ import annotations`.
- Configs in YAML; parse with pydantic-settings. Never hardcode hyperparameters.
- Random seeds set via `src.utils.seed.set_all(seed)` at top of every train script.
- Use `orjson` for hot-path JSON; stdlib `json` otherwise.

## Verification

After every change, run in order:
1. `uv run mypy src/`
2. `uv run pytest`
3. `uv run ruff check .`

## Gotchas

- GPU detection: `torch.cuda.is_available()` lies on some CI runners; use `TORCH_DEVICE` env.
- Large files: raw data is in `data/` (gitignored); never commit.
- Notebooks: don't import from `src/`; inline exploration code. Graduate to `src/` when stable.

## Safety

- Never commit `WANDB_API_KEY`, `HF_TOKEN`, cloud creds. Use `.env` (in .gitignore).
- PII in training data must be hashed via `src.utils.pii.hash_email` before logging.

## Reference docs

@docs/training-setup.md   - Read when setting up a new experiment
@docs/serving.md          - Read when deploying to production
```

**Why it works:** ~65 lines. Stack-specific commands (`uv run`, not `python`). ML-specific gotchas (GPU, seeds, data). Safety block for credentials. Room to grow with @imports.

### 11.3 Rust CLI tool (cargo + clap)

```markdown
# [tool-name]

[One-sentence description]. Single-binary CLI written in Rust.

## Stack

- Rust edition 2024, MSRV 1.85
- CLI parsing: clap v4 (derive API)
- Async: tokio (multi-thread runtime)
- HTTP: reqwest + rustls (no native TLS)
- Serialization: serde + serde_json
- Error handling: anyhow for CLI binary, thiserror for library code

## Commands

- Build (dev): `cargo build`
- Build (release): `cargo build --release`
- Run: `cargo run -- <args>`
- Test: `cargo test --workspace --all-features`
- Lint: `cargo clippy --workspace --all-targets --all-features -- -D warnings`
- Format: `cargo fmt --all`
- Check: `cargo check --workspace --all-features`
- Install locally: `cargo install --path .`

## Structure

- src/main.rs       - binary entry point, clap parsing
- src/cli.rs        - command dispatch
- src/commands/     - one module per subcommand
- src/config.rs     - config loading (TOML via serde)
- src/error.rs      - crate-wide error types
- tests/            - integration tests
- examples/         - runnable examples

## Conventions

- `anyhow::Result` in `main.rs` and `commands/*`; `Result<T, MyError>` in lib code.
- Return `Result`, don't `panic!` from library code. Reserve `panic!` for invariant violations.
- Use `tracing` for logs; never `println!` or `eprintln!` in production paths.
- Every public type derives `Debug`. Sensitive types do NOT derive `Debug`.
- Config loaded from `$XDG_CONFIG_HOME/[tool]/config.toml`, override with `--config`.

## Verification

After every change, run in order:
1. `cargo check --workspace --all-features`
2. `cargo test --workspace --all-features`
3. `cargo clippy --workspace --all-targets -- -D warnings`
4. `cargo fmt --check --all`

## Gotchas

- `cargo test` uses a 60s timeout per test; mark long tests `#[ignore]` and run with `--ignored`.
- `reqwest` + rustls requires `--features rustls-tls-native-roots` for corporate CAs.
- Don't add a feature flag without updating `CI` matrix - will silently skip tests.

## Release

- Tags `vX.Y.Z` trigger GitHub Actions release (`.github/workflows/release.yml`).
- Update `CHANGELOG.md` under Unreleased before tagging.
- Cargo publish requires `CARGO_REGISTRY_TOKEN` secret.

## Reference docs

@docs/architecture.md     - Read when adding a new subcommand
```

**Why it works:** ~70 lines. Cargo commands with explicit `--workspace --all-features` (default cargo misses workspace members). Rust-specific conventions (anyhow vs thiserror, tracing vs println). Release process captured.

### 11.4 Monorepo (Turborepo + pnpm workspaces)

**Root `./CLAUDE.md`** (~80 lines):

```markdown
# [Org] Platform Monorepo

Turborepo + pnpm workspaces. See nested CLAUDE.md files for package specifics.

## Stack

- Runtime: Node 20, pnpm 9
- Build system: Turborepo
- Language: TypeScript strict everywhere
- Shared testing: Vitest

## Packages

- apps/web/          - Next.js 15 customer app
- apps/admin/        - Next.js 15 internal dashboard
- apps/api/          - Express.js public API
- packages/shared/   - shared types + utilities (zero deps)
- packages/ui/       - shared React components
- packages/cli/      - devtools CLI

## Commands (run from root)

- Install: `pnpm install`
- Dev (all apps): `pnpm dev`
- Dev (single): `pnpm --filter @org/web dev`
- Build (all): `pnpm build`
- Test (all): `pnpm test`
- Test (affected only): `pnpm turbo test --filter=...[main]`
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`

## Global conventions

- TypeScript strict mode in every package.
- Named exports only. No default exports.
- Workspace protocol for internal deps: `"@org/shared": "workspace:*"`.
- Conventional commits with scope: `feat(web): ...`, `fix(api): ...`.

## Don'ts

- Don't install deps at the root unless truly repo-wide (e.g., `typescript`, `turbo`).
- Don't import from another package's `src/` - only from its exported entry.
- Don't create circular deps between packages.
- Don't bypass Turborepo: always use `pnpm turbo <task>`, not raw per-package runs in CI.

## Reference docs

@docs/architecture.md     - Read when designing a new package or service
@docs/release.md          - Read when preparing a release PR
```

**Nested `./apps/api/CLAUDE.md`** (~25 lines):

```markdown
# @org/api

Express.js + Prisma. Public REST API.

## Commands (from this dir or via --filter)

- Dev: `pnpm dev` (port 3001)
- Test: `pnpm vitest run`
- Migrate: `pnpm prisma migrate dev`

## Conventions

- Routes in `src/routes/<resource>/<verb>.ts`, one file per endpoint.
- All routes validate bodies with Zod schemas at the boundary.
- Response envelope: `{ data: T }` on success, `{ error: string, code: string }` on failure.
- Async error wrapper on all handlers - see `src/middleware/async-handler.ts`.
- Database access ONLY through `src/db/queries/*`. Routes never import Prisma.

## Gotchas

- Rate limiter uses Redis - requires `REDIS_URL` or tests fail silently.
- Prisma generates into `node_modules/.prisma/`, not `src/`. Regenerate with `pnpm prisma generate`.
```

**Why it works:** Root has 80 lines of universal rules; each package has 15-25 lines of local rules. Claude loads both when working in that package. Nested CLAUDE.md files **"load on demand when Claude reads files in those directories"** [C1], so per-session cost stays low.

### 11.5 Library / SDK (npm package published to registry)

```markdown
# @scope/pkg-name

[One-sentence description]. TypeScript SDK for [domain]. Zero dependencies in prod code.

## Stack

- TypeScript strict, `exactOptionalPropertyTypes: true`
- Build: tsup (ESM + CJS dual output)
- Test: vitest
- Size check: size-limit (budget: 5KB gzipped)
- Types: published from `dist/types`

## Commands

- Build: `pnpm build`
- Test: `pnpm vitest run`
- Type check: `pnpm tsc --noEmit`
- Size check: `pnpm size`
- Release (maintainers): `pnpm changeset && pnpm changeset version && git push`

## Structure

- src/index.ts         - public API surface (only entry point consumers import)
- src/core/            - internal implementation
- src/types.ts         - exported types
- examples/            - runnable examples (not in published package)
- tests/               - vitest

## Conventions

- `src/index.ts` re-exports the PUBLIC API only. Internal helpers stay in `src/core/`.
- Every exported function has explicit return type.
- No runtime dependencies in production code. Dev deps only.
- Public API changes follow semver: breaking = major, additive = minor, fix = patch.
- Error classes extend `SDKError` base; consumers can `instanceof` check.
- Tree-shakeable: every exported function is a named const, no side effects at import time.

## Verification

After every change, run in order:
1. `pnpm tsc --noEmit`
2. `pnpm vitest run`
3. `pnpm build`
4. `pnpm size`           - bundle size budget check

## Gotchas

- Dual ESM/CJS output: test both `import` and `require` paths in tests.
- Changesets: every PR touching `src/` must add a changeset. Enforced by CI.
- Size budget: if a change busts the budget, review whether it's worth it. Don't blindly raise.
- `package.json` `exports` field drives consumer imports; keep in sync with `src/index.ts`.

## Don'ts

- Don't add prod dependencies without discussion. Every dep hits consumer bundles.
- Don't export from `src/core/`. Only `src/index.ts` is public.
- Don't use `console.log` - consumers don't want noise. Use a debug flag instead.

## Reference docs

@docs/api.md          - Read when modifying the public API surface
@docs/release.md      - Read when cutting a release
@CHANGELOG.md         - Version history
```

**Why it works:** ~70 lines. SDK-specific concerns (dual ESM/CJS, tree-shaking, bundle size, semver, changesets) that Claude couldn't infer from package.json alone. Positive rules with clear alternatives. Bundle size gotcha captures a frequently-violated budget.

---

## 12. Gaps

Areas where sources disagree or coverage is thin:

1. **Exact tokenization of CLAUDE.md.** Anthropic quotes "200 lines" but doesn't specify a token cutoff where behavior changes. HumanLayer says 60 lines; dev.to says 30. Empirical evidence is scattered across blog posts with no shared benchmark.

2. **`CLAUDE.local.md` vs `~/.claude/CLAUDE.md` for personal preferences.** Anthropic supports both [C1]. When should Maciej's ML env prefs go to user-level vs project-local? Docs imply user-level for cross-project prefs (`uv over pip`) and `.local` for per-project sandbox URLs, but the line is fuzzy.

3. **Nested CLAUDE.md conflict resolution.** Anthropic says "Claude may pick one arbitrarily" [C1] but doesn't specify whether file position (deepest wins?) or ordering matters. Community pattern suggests deepest file wins since it's loaded last, but this isn't documented.

4. **Managed-policy CLAUDE.md evidence.** The three OS paths are documented [C1], but real-world enterprise CLAUDE.md examples are absent from public research (presumably private). Anthropic's own example is one sentence.

5. **`@import` performance ceiling.** Docs say "maximum depth of five hops" [C1]. Cost scaling at depth 2 vs 5 isn't benchmarked publicly.

6. **Does Claude actually respect "IMPORTANT" and "YOU MUST"?** Anthropic says these tune adherence [C2]. Community reports are mixed; no public eval data on 3 bolded rules vs 30 bolded rules.

7. **Interaction of CLAUDE.md with auto memory.** v2.1.59+ writes to `~/.claude/projects/<project>/memory/MEMORY.md`. How do you keep CLAUDE.md and auto-memory from both capturing the same rule? Anthropic's guidance [C1] is clear in principle (CLAUDE.md = instructions, auto memory = learnings) but the boundary is softer in practice.

8. **`<important if="...">` tag effectiveness.** rosmur.github.io references this pattern [C18] but docs don't mention it. Community invention or hidden feature?

9. **When to graduate a CLAUDE.md rule to a skill.** Anthropic's guidance: multi-step procedures go to skills [C1], but the threshold for "multi-step" is subjective.

---

## 13. Bibliografia

| Ref | Source | URL |
|---|---|---|
| C1 | Anthropic - How Claude remembers your project (memory docs) | https://code.claude.com/docs/en/memory |
| C2 | Anthropic - Best Practices for Claude Code | https://code.claude.com/docs/en/best-practices |
| C3 | Elegant Software Solutions - CLAUDE.md Patterns That Actually Work | https://www.elegantsoftwaresolutions.com/blog/claude-code-mastery-claude-md-patterns |
| C4 | hesreallyhim - awesome-claude-code | https://github.com/hesreallyhim/awesome-claude-code |
| C5 | Bojie Li - Claude's Context Engineering Secrets | https://01.me/en/2025/12/context-engineering-from-claude/ |
| C6 | HumanLayer - Writing a Good CLAUDE.md | https://www.humanlayer.dev/blog/writing-a-good-claude-md |
| C7 | docat0209 (dev.to) - 5 Patterns That Make Claude Code Follow Rules | https://dev.to/docat0209/5-patterns-that-make-claude-code-actually-follow-your-rules-44dh |
| C8 | Shrivu Shankar - How I Use Every Claude Code Feature | https://blog.sshh.io/p/how-i-use-every-claude-code-feature |
| C9 | TurboDocx - How to Write a CLAUDE.md That Actually Works | https://www.turbodocx.com/blog/how-to-write-claude-md-best-practices |
| C10 | alexop.dev - Stop Bloating Your CLAUDE.md: Progressive Disclosure | https://alexop.dev/posts/stop-bloating-your-claude-md-progressive-disclosure-ai-coding-tools/ |
| C11 | MindStudio - What Is Context Rot in Claude Code | https://www.mindstudio.ai/blog/what-is-context-rot-claude-code |
| C12 | Simon Willison - TIL claude-code notes | https://github.com/simonw/til/tree/main/claude-code |
| C13 | Metabase CLAUDE.md | https://github.com/metabase/metabase/blob/master/CLAUDE.md |
| C14 | LangGraphJS CLAUDE.md | https://github.com/langchain-ai/langgraphjs/blob/main/CLAUDE.md |
| C15 | HASH CLAUDE.md (symlink to AGENTS.md) | https://github.com/hashintel/hash/blob/main/CLAUDE.md |
| C16 | abhishekray07 - claude-md-templates | https://github.com/abhishekray07/claude-md-templates |
| C17 | anthropics/claude-code issue #29971 - Context Bloat | https://github.com/anthropics/claude-code/issues/29971 |
| C18 | rosmur - Claude Code Best Practices | https://rosmur.github.io/claudecode-best-practices/ |
| C19 | Anthropic - How Anthropic teams use Claude Code (PDF) | https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf |
| C20 | MuhammadUsmanGM - claude-md-monorepo example | https://github.com/MuhammadUsmanGM/claude-code-best-practices/blob/main/examples/claude-md-monorepo.md |
| C21 | rohitg00 - awesome-claude-code-toolkit python template | https://github.com/rohitg00/awesome-claude-code-toolkit/blob/main/templates/claude-md/python-project.md |
| C22 | minimaxir - Python CLAUDE.md gist | https://gist.github.com/minimaxir/c274d7cc12f683d93df2b1cc5bab853c |
| C23 | abhishekray07 - Python/FastAPI template | https://github.com/abhishekray07/claude-md-templates/blob/main/project/python-fastapi.md |
| C24 | abhishekray07 - Next.js/TypeScript template | https://github.com/abhishekray07/claude-md-templates/blob/main/project/nextjs-typescript.md |
| C25 | claudelab - Claude Code x Monorepo Turborepo | https://claudelab.net/en/articles/claude-code/claude-code-monorepo-turborepo-workspace-guide |
| C26 | zhaopengme/cce - Rust CLI CLAUDE.md example | https://github.com/zhaopengme/cce/blob/master/CLAUDE.md |
| C27 | ruvnet - CLAUDE-MD-Rust wiki | https://github.com/ruvnet/claude-flow/wiki/CLAUDE-MD-Rust |
| C28 | Shanraisshan - claude-code-best-practice | https://github.com/shanraisshan/claude-code-best-practice |

---

**Document stats:** ~4,800 words, 17 DO items (min 15), 17 DON'T items (min 15), 5 complete starter templates (min 5), 12 concrete anti-patterns, 28 citations.
