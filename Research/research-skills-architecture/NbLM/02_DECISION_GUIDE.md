# 02_DECISION_GUIDE - Claude Code Skills Architecture

**Actionable decision trees + recipes (NotebookLM briefing)**

## DT1. Czy potrzebuje skill czy inny tier?

```
Zadanie do automatyzacji
  |
  v
Czy wymaga EXTERNAL DATA (API, DB, service)?
  | YES -> MCP (+ opcjonalnie Skill wrapping)
  | NO
  v
Czy to REUSABLE PROMPT PATTERN uzywany w 5+ miejscach?
  | YES -> SKILL
  | NO
  v
Czy potrzebuje KONTEKST ISOLATION (swoja pamiec)?
  | YES -> SUBAGENT (lub Skill z context:fork)
  | NO
  v
Czy to LIFECYCLE EVENT (pre-commit, post-edit, ...)?
  | YES -> HOOK
  | NO
  v
Prawdopodobnie nie potrzebujesz nic budowac; Claude Code defaults wystarcza.
```

## DT2. Jak napisac dobry skill od zera

```
Krok 1: Zdefiniuj DOMAIN i use case
  -> Wypisz 3-5 unique keywords charakteryzujacych twoja domene
  -> Wypisz 3-5 capabilities (verb + noun phrases)
  -> Wypisz 3-5 use cases ("use when...")

Krok 2: Napisz description (three-layer)
  -> Layer 1: domain keywords
  -> Layer 2: capabilities
  -> Layer 3: use cases
  -> Target: 200-500 chars

Krok 3: Wybierz invocation type
  -> Reference skill (style guide, conventions) -> default (auto + manual)
  -> Task skill (deploy, commit) -> disable-model-invocation:true (manual only)
  -> Hybrid (commitment + execution) -> default + commitment in body

Krok 4: Napisz body (<1500 tokens cel)
  -> Sekcje: Context / Steps / Output format
  -> Resources heavy? Wylozyc do references/

Krok 5: Wybierz model
  -> Simple parsing -> model: haiku
  -> Standard reasoning -> no model field (session default)
  -> Creative/orchestration -> model: opus

Krok 6: Test auto-invocation
  -> Opisz zadanie 5 roznymi sposobami (paraphrase)
  -> Sprawdz czy Claude invokuje skill w >=4/5 przypadkach
  -> Jesli <4, dodaj keywords do description
```

## DT3. Task-oriented vs Reference skill

| Pytanie | Task | Reference |
|---------|------|-----------|
| Ma side effects (pisze/deletes)? | YES | NO |
| Wymaga user consent? | YES | NO |
| Uzywane 1x per session? | Czesto | Rzadko |
| Pisze kod vs konsumuje kontekst? | Pisze | Konsumuje |
| Best invocation? | Manual (/name) | Auto |
| Best frontmatter | disable-model-invocation:true | default |

**Przyklady:**
- Task: `/commit`, `/deploy`, `/refactor-file`
- Reference: `typescript-conventions`, `security-patterns`, `company-style-guide`

## DT4. Chain design - ile glebokich skilli?

```
Chain <=3 skilli:
  -> Level 1 state (conversation text) OK
  -> Bez filesystem persistence
  -> Simple compose pattern

Chain 4-5 skilli:
  -> Level 2 state (filesystem artifacts) RECOMMENDED
  -> Consider intermediate compaction checkpoints
  -> Monitor chain success rate

Chain >5 skilli:
  -> Level 2 state MANDATORY
  -> Consider Swarm Orchestration alternative
  -> Or break into smaller chains z user checkpoints
```

## DT5. Kiedy plugin, kiedy standalone

```
Uzywam prywatnie, sam?
  -> STANDALONE (zero narzut)

Uzywam z 1-3 osobami w teamie?
  -> STANDALONE + git repo do sync

Publikuje dla public/komercyjny?
  -> PLUGIN + marketplace submission
  -> Bundle MCP/hooks jesli skill ich wymaga
  -> Add semver versioning

Teamy enterprise z governance?
  -> PLUGIN + managed marketplace
  -> Signed (via Anthropic official)
  -> Audit trail via hooks
```

## DT6. Model routing decision

```
Zadanie wymaga reasoning depth? (synthesis, orchestration, critic)
  | YES -> OPUS
  | NO
  v
Zadanie ma output >2000 tokenow lub multi-turn?
  | YES -> SONNET
  | NO
  v
Zadanie to structured extraction (JSON, classification, parsing)?
  | YES -> HAIKU
  | NO
  v
Default: SONNET (balanced)
```

Plus considerations:
- High-criticality (synthesis, decisions) -> upgrade tier
- Iterative (tests, loops) -> upgrade tier (fewer retries)
- Disposable (extracts) -> downgrade tier (cost savings)

## R1. Recipe: skill z three-layer description

```yaml
---
name: rust-safety-audit
description: |
  Memory safety audit for Rust code using CodeQL patterns.
  Handles lifetimes analysis, unsafe block review, concurrency correctness.
  Use when reviewing Rust code for memory/thread safety issues, NOT for
  general code quality (use /code-review for that).
allowed-tools: Bash(cargo *) Bash(rustc *)
model: opus
effort: high
---

# Body z commitment pattern
## Step 1: Choose threat model
Before audit, commit to one: [memory-safety / data-races / unsafe-blocks]
...
```

## R2. Recipe: fan-out parallel (avoiding bug #17283)

**WRONG (breaks on #17283):**
```yaml
---
name: research-parallel
description: Spawn 5 researchers in parallel
context: fork  # ignored via Skill tool
agent: Plan
---
# Skill invokes 5 others via Skill tool -> they all share main context
```

**RIGHT (workaround):**
```yaml
---
name: research-parallel
description: Research across 5 domains
---
# Body: explicit instruction to use /research-domain-A, /research-domain-B...
# User or orchestrator invokes via slash command (Path B)
# Each /research-domain-X has its own context:fork which works correctly
```

## R3. Recipe: commitment-before-generation skill

```markdown
# Frontend Design Skill

## Step 1: Commit to direction (REQUIRED)

You MUST choose ONE before writing code:
- BRUTALIST (raw, monospace, high contrast)
- MAXIMALIST (dense, ornate, rich palette)
- EDITORIAL (magazine, serif, whitespace)
- RETRO-FUTURISTIC (80s neon, gradient, pixel)

State explicitly: "I choose [DIRECTION] because [REASON]."

## Step 2: Ban list check

These are FORBIDDEN in output:
- Font: Inter, Roboto, Arial, Space Grotesk
- Color: purple gradient, generic blue (#3B82F6)
- Layout: uniform grid cards without visual hierarchy

## Step 3: Generate

Write code adhering to step 1 commitment, avoiding step 2 items.

## Step 4: Verify

Confirm: (a) commitment stated, (b) ban list avoided. If not, regenerate.
```

## R4. Recipe: research pipeline z filesystem state

**Orchestrator skill:**
```markdown
# Deep Research Pipeline

## Phase 1: Research (parallel)
Invoke 7 researcher skills, each writes to research/R{N}.md.

## Phase 2: Extract (parallel, Haiku)
Invoke 7 extractor skills, each reads research/R{N}.md, writes extracts/E{N}.json.

## Phase 3: Critique (Opus)
Read all extracts, write research/CRITIC.md.

## Phase 4: Synthesize (Opus)
Read all + CRITIC, write plans/SYNTHESIS.md.

## Phase 5: NbLM output
Read SYNTHESIS, generate 4 NbLM/*.md files.
```

Kazda faza zapisuje artefakty. Compaction mid-pipeline nie przerywa - kolejna faza czyta z dysku.

## R5. Recipe: auto-invocation test suite

Create `tests/auto-invocation.md`:
```
## Test 1: Rust safety audit
Prompt: "Review my Rust service for memory safety issues"
Expected: /rust-safety-audit triggered
Actual: [fill after test]

## Test 2: Frontend Design
Prompt: "Build a landing page for SaaS"
Expected: /frontend-design triggered
Actual: [fill after test]

...
```

Monthly run: measure hit rate, identify skills with <80% reliability, rewrite descriptions.

## Checklist: review existing skill

- [ ] `description` ma 200-500 chars z three-layer structure?
- [ ] `description` keywords pokrywaja typowe user prompty?
- [ ] Body <1500 tokenow (with references/ dla rest)?
- [ ] `model:` field set (lub deliberately omitted)?
- [ ] Task skill ma `disable-model-invocation: true`?
- [ ] Reference skill trigger w test suite >=80%?
- [ ] Brak hardcoded paths (C:\, /home/user/)?
- [ ] Brak zombie state (both disable + user-invocable:false)?
- [ ] Commitment pattern jesli generuje content?
- [ ] Post-compaction survival plan (filesystem state)?

## Common mistakes checklist

- [ ] Nested too deep: `~/.claude/skills/name/folder/SKILL.md` - WRONG, drop folder level
- [ ] Empty description: "Helps with..." - WRONG, rewrite three-layer
- [ ] Monolithic body >3k tokens - WRONG, extract to references/
- [ ] Chain >5 skills deep - WRONG, reconsider architecture
- [ ] context:fork via Skill tool - WRONG (bug #17283), use slash or preload
- [ ] Plugin for private use - WRONG, use standalone
- [ ] MCP for pure text transformation - WRONG, use Skill
- [ ] Subagent for 1-shot query - WRONG, fits main context

## For Maciej's 35+42 system

**Immediate actions:**
1. Audit 35 skill descriptions using three-layer checklist
2. Verify chain depth w 42 commands (zadne nie przekracza 5?)
3. Add auto-invocation test suite (50 prompts mapping to skills)

**Medium-term:**
4. Consider multi-file resources dla top-5 most-invoked skills
5. Add commitment patterns do skilli generujacych content
6. Document post-compaction recovery strategy per preset

**Long-term (if publishing):**
7. Plugin migration roadmap (VI.8a w SYNTHESIS.md)
8. Marketplace submission (Anthropic official + hesreallyhim awesome-claude-code)
9. Semver versioning + changelog
