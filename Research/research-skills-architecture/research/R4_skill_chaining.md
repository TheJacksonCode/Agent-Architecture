# R4 - Skill Chaining + Composition

**Researcher:** res_github (Sonnet, persona)
**Data:** 2026-04-17
**Zrodla:** cashandcache.substack.com (practical chain), gist.github.com/kieranklaassen (swarm orchestration), mindstudio.ai (patterns framework), github.com/anthropics/skills, github.com/hesreallyhim/awesome-claude-code

## Summary

Skill chaining w Claude Code dziala dwoma mechanizmami: (1) orchestrator skill zawiera sekwencyjne `/skill-name` wywolania w body SKILL.md ktore Claude wykonuje wewnatrz wlasnego kontekstu lub w forked subagent (jesli `context: fork` ustawione), oraz (2) shared state pattern - orchestrator i worker skills komunikuja przez JSON file na disku (Claude czyta/pisze stan, zaden skill bezposrednio nie wola drugiego). Wazne rozstrzygniecie: per MindStudio i community analysis "skills don't call each other, Claude passes data between them". Nie ma literal skill-to-skill function call. Cztery komunikujace sie wzorce: (A) Sequential Chain (A -> B -> C sequential), (B) Fan-Out/Merge (jeden skill produkuje N worker tasks, parallel execution przez Task tool, merger skill konsoliduje), (C) Conditional Routing (orchestrator klasyfikuje request, routes do roznych skills per category), (D) Iterative Loop (skill runs until condition met, np. writer -> evaluator -> revise loop). Drugi model: Swarm Orchestration (kieranklaassen gist) z rozbudowana TeammateTool + Task system w `~/.claude/tasks/`/`~/.claude/teams/` - persistent teammates komunikuja przez inbox JSON files, shared task queue, cleanup obligatory. Bug #17283 WAZNE dla chaining: `context: fork` ignorowane gdy skill wywolywany via Skill tool - tylko slash /name respektuje fork. Praktyczna rekomendacja: dla chain workflows uzywaj `.claude/agents/` subagents (stable) zamiast polegania na skills z `context: fork` przy programmatic invocation.

## Details

### 1. Fundamental mechanism: "Claude mediates, not skill-to-skill"

Z MindStudio analysis (wielokrotnie cytowane w 2026 wpisach blog):

> "The skill collaboration pattern lets Claude Code orchestrate multi-step workflows by chaining skills with compatible input/output contracts, where Claude acts as the coordinator - skills don't call each other, Claude passes data between them."

Potwierdza Cash&Cache autor: "An orchestrator is a skill file that contains a sequence of /skill-name commands instead of a single task. When you trigger the orchestrator, Claude runs Skill A, takes the output, feeds it into Skill B, takes that output, feeds it into Skill C. Each stage has full access to everything the previous stage produced."

Mechanism nie jest function call. Nie ma "SKILL:A wola SKILL:B". Jest:
1. User invokes orchestrator skill X
2. Skill X body zawiera `Run /skill-a with args...` instructions
3. Claude (w kontekscie conversation) wywoluje Skill tool: `command: "skill-a"`
4. Skill A content wchodzi do konwersacji, Claude wykonuje
5. Claude czyta output, formatuje dla skill B
6. Claude wywoluje Skill tool: `command: "skill-b"` z danymi
7. Cykl kontynuuje

Czyli Claude jest middleware. Kazda "chain step" to Claude reasoning + Skill tool invocation. Dla programistycznego umyslu: to jest `await skill_a(); await skill_b();` ale execution w transformer forward pass, nie function call.

### 2. Cztery kanoniczne wzorce chaining

Z MindStudio four-pattern framework + Cash&Cache przyklad + gist Swarm:

#### Pattern A: Sequential Chain

Najprostszy. Orchestrator body:
```
Step 1: Run /research "$ARGUMENTS" to gather raw findings
Step 2: Run /curation with output of Step 1 to organize into comparison grid
Step 3: Run /analysis with output of Step 2 to write narrative
Step 4: Run /formatting with output of Step 3 to polish deliverable
Return final result.
```

Cash&Cache przyklad real: `/competitive-intel "Anthropic" "Google"`:
1. `/research` - gathers pricing, features, funding dla kazdej firmy
2. `/curation` - organizes to comparison grid
3. `/analysis` - writes narrative assessment
4. `/formatting` - polishes deliverable

"They triggered /competitive-intel "Anthropic" "Google", walked away, and returned to a complete formatted report."

**Isolation:** dodanie `context: fork` do orchestratora -> caly pipeline runs w isolated subagent. "only the final result comes back to your session" bez intermediate outputs zasmiecajacych kontekst main. **ALE pamietaj o bugu #17283** - fork dziala tylko przy /slash invocation, nie przy Skill tool call.

#### Pattern B: Fan-Out + Merge

Orchestrator dzieli prace na parallel tasks, spawn N workers przez Task tool, merger zbiera.

Przyklad: 50 leads w CSV -> 50 parallel researchers -> merger laczy do enriched file.

Mechanism:
1. Orchestrator reads CSV, splits into N chunks
2. For each chunk, spawn Task tool subagent z worker skill + chunk data
3. All workers run parallel (independent contexts)
4. Orchestrator waits for all completions
5. Merger skill konsoliduje outputy

Kluczowe: workers nie komunikuja miedzy soba. Workers nie znaja innych workerow. Orchestrator jest single point of coordination.

#### Pattern C: Conditional Routing

Orchestrator klasyfikuje input, routes do roznych skills.

Przyklad: support ticket -> `/classifier` okresla kategorie (billing/technical) -> routes do `/billing-skill` or `/technical-skill` based on output.

```
Step 1: Run /classifier with ticket content
Step 2: Check classifier output:
  - If "billing" -> Run /billing-skill
  - If "technical" -> Run /technical-skill
  - Else -> Escalate to human
```

Decision logic lezy w orchestrator body jako plain English lub structured JSON schema.

#### Pattern D: Iterative Loop

Skill runs until condition met.

Przyklad: content generation z quality gate:
1. Generate draft
2. Evaluate against rubric (score 0-10)
3. If score < 8, revise based on critique, goto 2
4. If score >= 8, finalize

```
Step 1: Run /writer with $ARGUMENTS
Step 2: Run /evaluator on writer output
Step 3: If score >= 8, return
Step 4: Run /reviser with writer + evaluator feedback, goto Step 2
Step 5: Max 3 iterations, then force return
```

Kluczowe: loop control w orchestrator body (Claude reasoning). Brak eksplicitnej petli w YAML.

### 3. Swarm Orchestration (advanced alternative)

Gist github.com/kieranklaassen/4f2aba89594a4aea4ad64d753984b2ea - "Claude Code Swarm Orchestration Skill":

**3 foundational primitives:**

**Agents & Teams:** "A Claude instance that can use tools. Subagents are agents you spawn." Teams = named groups with leader + teammates w `~/.claude/teams/{name}/config.json`.

**Communication:** teammates interact via inbox files containing JSON messages. "The leader receives teammate messages, approves plans/shutdowns" via structured message types (shutdown requests, idle notifications, task completions).

**Task System:** shared work queue with dependencies. `~/.claude/tasks/{team}/N.json`.

**Dwa spawning methods:**

| Method | Pattern | Lifecycle | Communication |
|:-------|:--------|:----------|:--------------|
| Subagent | Task tool alone | synchronous lub async | return to caller |
| Teammate | Task + team_name + name | persistent until shutdown | shared inbox + tasks |

**13 operations TeammateTool:** `spawnTeam`, `write`, `broadcast`, `requestShutdown`, `cleanup` + 8 wiecej. Kluczowy pattern: "Your text output is NOT visible to the team. You MUST use write to communicate."

**Orchestration patterns w swarm:**
1. Parallel Specialists (multiple reviewers: security + performance + simplicity)
2. Pipeline (sequential dependencies, auto-unblock)
3. Swarm (workers self-organize, claim available tasks from pool)
4. Research+Implementation (sync research feeds async impl)

**Spawn backends (auto-detected):**
- in-process (same Node.js, invisible, fastest)
- tmux (separate panes, visible, persistent)
- iterm2 (macOS-only)

**Cleanup discipline:** "Don't leave orphaned teams. Always call cleanup when done."

**Porownanie Skill Chaining vs Swarm:**
- Skill Chaining: in-session, single Claude context, simple linear flow
- Swarm: multi-process lub multi-tmux, persistent teammates, robust inter-process communication, wiekszy overhead

Maciej ma 42 presets w Claude Code commands - to sa orchestrators na wzor Pattern A/B/C. Swarm model by pasowal dla multi-week projektow.

### 4. Anthropic official skills repo patterns

github.com/anthropics/skills zawiera:
- Skill Creator - meta-skill dla tworzenia nowych skills
- Claude API - up-to-date SDK docs dla 8 jezykow
- Codebase Explorer
- Document Processing skills (PDF, DOCX, XLSX, PPTX)

Patterns obserwowane:
- Reference + Task content mixed (pattern 1 z best-practices docs)
- Progressive disclosure heavy (SKILL.md -> 2-3 pliki reference)
- Scripts for deterministic operations (`python scripts/extract.py`)
- Plan-validate-execute dla batch ops

### 5. Praktyczne implikacje bugu #17283 dla chaining

Cash&Cache autor pisze: "Adding context: fork tells Claude Code to run the entire pipeline in a separate, isolated subagent. Think of it as a background worker with its own context window."

Ale issue #17283 mowi: przy programmatic Skill tool invocation (Path C z R3), `context: fork` i `agent:` IGNOROWANE.

Ambiguity: czy jak user wpisze `/orchestrator` (Path B slash), i orchestrator body zawiera `Run /worker` ktory ma `context: fork`, to wewnatrz wywolana jest Path C (Skill tool) i fork ignored?

**Prawdopodobnie TAK** - orchestrator executes child skills via Skill tool (programmatic), wiec child `context: fork` jest ignored. Fork dziala tylko gdy user bezposrednio wpisze `/worker-skill` bez orchestratora.

**Workaround rekomendowany przez community:** dla isolacji workerow uzyj `.claude/agents/<worker>.md` (subagent definition) + Task tool spawning zamiast skills z `context: fork`. Subagents ZAWSZE runs w isolated context, bez zaleznosci od frontmatter bug.

### 6. Input/Output contracts

Z MindStudio framework: "Clean output contracts - each skill needs to produce output in a predictable format the next skill can consume."

Best practices dla chain:
- Output format explicite w skill body (np. "Output as JSON with fields: title, content, citations")
- Version output schema (np. "Schema v1: {...}")
- Validate input at start of each worker skill

Claude jest loose middleware - moze improwizowac jesli output skill A nie pasuje do input skill B. Ale niepewne, zawartosc degradacyjna. Strict schema = predictable behavior.

### 7. Shared state pattern

Dla complex chains ktore wymagaja persistent state miedzy invocations (lub miedzy sesjami):

**MindStudio recommendation:** "Read the state file, identify the current stage, call the appropriate skill for that stage, update the state file with results."

Orchestrator skill body:
```
Step 1: Read state from .claude/state/pipeline.json
Step 2: Identify current stage (field "stage")
Step 3: Based on stage, run appropriate /worker skill
Step 4: Update state with worker output
Step 5: If stage != "done", goto Step 1
```

State file:
```json
{
  "stage": "research_complete",
  "research": {...},
  "curation": null,
  "analysis": null,
  "started": "2026-04-17T10:00:00Z"
}
```

Benefits:
- Resumable: killed session wraca do same stage
- Inspectable: developer czyta state file
- Composable: inne orchestrators moga dzielic state

Pattern popular w Book Factory, Claude Code Agents enterprise examples.

### 8. Recursion?

Czy skill A moze wywolac siebie przez Skill tool? Docs tego nie odradzaja ani nie potwierdzaja. Community patterns nie pokazuja use case.

Teoretycznie mozliwe: skill body zawiera `Run /self-name` - Claude wywola przez Skill tool. Bez rate limiting w engine, moze byc infinite loop.

**Prawdopodobnie UNSAFE:** skill content zostaje w konwersacji na reszte sesji. Rekursja akumulowalaby kopie w kontekscie.

### 9. Cross-paradigm invocation: Skill wola Command?

Przed mergem commands+skills to bylo otwarte pytanie. Po mergu (Claude Code 2.1): commands sa de facto skills. Wiec skill moze wywolac "command" (ktory jest teraz skill) przez `/command-name`.

Skill moze tez wywolac MCP tool jesli ma uprawnienia. Format: `/mcp__github__create_issue` (namespaced MCP command). Per Alex Op guide: "Skills compose those capabilities into workflows. Combine them: Skills call /mcp__github__* commands internally."

### 10. Common patterns from awesome-claude-code

Z github.com/hesreallyhim/awesome-claude-code:

**AgentSys (avifenesh):** "Workflow automation system with plugins, agents, and skills for task-to-production workflows and multi-agent code review"
- Orchestrator skill: `/agentsys-run` laduje pipeline
- Worker skills per role (code-review, test-gen, deploy)
- Shared state w `.agentsys/state/`

**Book Factory (Robert Guss):** "Comprehensive pipeline replicating traditional publishing infrastructure for nonfiction book creation"
- Sequential chain: outline -> draft -> edit -> format -> publish
- Each stage separate skill
- Persistent state dla resumability

**Claude Code Agents (comprehensive E2E):**
- Subagent-based (nie skill-based) dla parallel auditors
- Orchestrator pattern z Task tool spawning
- Browser-based QA via Playwright

**Trail of Bits Security Skills:**
- Chain: recon -> scanners -> analysis -> report
- Each stage isolated via fork (CAVEAT: bug #17283 - probably broken przy Skill tool path)

### 11. Anti-patterns w chaining

Obserwowane z community:

**Over-chaining:** 10+ stage pipelines. Kazdy stage dodaje lag + token cost. Recommendation: 3-5 stages max, konsolidowac gdzie mozna.

**Implicit contracts:** worker skills zakladaja format bez validacji. Gdy upstream zmienia output, downstream breaks silently. Fix: explicit schema w SKILL.md.

**Shared state dirty:** wielu workers modyfikuje ten sam state file bez lockingu. Race conditions w swarm. Fix: single-writer pattern, orchestrator jest jedynym modyfikatorem.

**Ignoring fork bug:** polegamy na `context: fork` dla isolation - broken przy programmatic invocation (bug #17283). Fix: `.claude/agents/` subagents.

**Orphan teammates:** swarm spawns teammates, forgets cleanup. Tmux panes zostaja, processes running. Fix: `cleanup` w swarm exit hook.

### 12. Token economics chaining

Sequential chain (4 stages):
- Orchestrator SKILL.md: ~1500 tokens jedna injection
- Each worker SKILL.md: ~1500 tokens per injection
- 4 stages + orchestrator = ~7500 tokens z same skills
- Plus intermediate outputs (task-dependent, 500-5000 tokens each)
- Total: ~10-25k tokens dla 4-stage chain

Z `context: fork` + isolation: intermediate outputs NIE wracaja do main session. Oszczednosc ~70-80% dla chain.

Fan-Out (50 workers) z Task tool subagents:
- 50 parallel contexts, kazdy SEPARATE context budget
- Main session widzi tylko orchestrator + merger outputs
- Bez fork: wszystkie outputs w main -> context explode

Wniosek: fork/Task tool essential dla skala.

## Issues / Flags

**Conflict #1:** community narracja "skill chain" sugeruje ze skill X wola skill Y directly. Realnosc: Claude jest middleware, kazdy step to tool invocation. Misnomer "chaining" wprowadza confusion dla nowicjuszy. Critic ma to wyjasnic w SYNTHESIS.

**Bug #17283:** krytyczny dla wszystkich "programmatic orchestration" patterns. Fork fields ignored przy Skill tool path. Workaround: subagents files. Not resolved by Anthropic do Apr 2026.

**Gap: recursion safety.** Docs nie mowia nic. Community nie testuje. Niewiadomo czy Claude Code ma guard przeciwko self-invocation loop.

**Gap: max chain depth.** Nie znalazlem limits. Prawdopodobnie limitated przez context window (25k compaction budget dla re-attached skills).

**Ambiguity: cross-plugin chain.** Plugin A skill moze wywolac Plugin B skill przez `/plugin-b:skill-name`? Per plugin docs: plugin skills sa w namespace, dostepne z / menu. Prawdopodobnie TAK ale nie explicite w docs.

**Gap: skill calls itself via different invocation path.** Np. skill body zawiera `Run /self-name --mode=recursive`. Nie testowane w community.

## Recommendation

GO do Phase 2. Chaining patterns sa dobrze udokumentowane w community, gorzej w Anthropic docs (brakuje formal spec).

Dla SYNTHESIS Part "Chaining Patterns":
- Tabela 4 wzorcow (Sequential, Fan-Out, Conditional, Iterative) = cytowalne
- Disambiguation "skills don't call each other, Claude mediates" = kluczowy punkt
- Swarm pattern jako advanced alternative = kontekst
- Bug #17283 warning dla fork-based chains

Praktyczna rekomendacja dla Macieja:
1. Jego `/deep-research-v2` preset jest PATTERN A Sequential + B Fan-Out hybrid (orchestrator -> 7 researchers parallel -> critic -> syntetyk). Community-standard ale uzywa subagents przez /commands, nie skills z `context: fork` - czyli omija bug #17283.
2. Dla extractorow (Haiku phase) Maciej uzywa Task tool spawning - to jest stabilna droga.
3. Warto udokumentowac "skills don't call each other" w jego `docs/SKILLS_ARCHITECTURE.md` zeby uniknac community mis-understanding.

Deep confidence on: 4 patterns (Sequential, Fan-Out, Conditional, Iterative), mechanism mediation przez Claude, bug #17283 impact.

Medium confidence on: swarm details (kieranklaassen gist - autor community, nie Anthropic), shared state best practices.

Low confidence on: recursion safety, cross-plugin chain mechanics, max chain depth.

### Zrodla
- cashandcache.substack.com/p/i-chained-4-claude-code-skills-together - 4-stage orchestrator
- gist.github.com/kieranklaassen/4f2aba89594a4aea4ad64d753984b2ea - Swarm Orchestration
- mindstudio.ai/blog/four-pattern-framework-claude-code-skills - framework
- mindstudio.ai/blog/claude-code-skill-collaboration-chaining-workflows - chaining mechanism
- github.com/anthropics/skills - official patterns
- github.com/hesreallyhim/awesome-claude-code - community exemplars
- github.com/anthropics/claude-code/issues/17283 - fork bug
