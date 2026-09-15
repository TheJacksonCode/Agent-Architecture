# R5 - Skill vs Command vs Agent Decision Tree

**Researcher:** res_ux (Sonnet, persona)
**Data:** 2026-04-17
**Zrodla:** alexop.dev/posts/understanding-claude-code-full-stack, code.claude.com/docs (skills + subagents + commands), oneaway.io/blog/claude-code-commands-vs-skills, tokrepo.com/en/guide/save-token-costs, codewithseb.com

## Summary

W Claude Code ekosystemie 2026 istnieja cztery glowne sposoby rozszerzania: **Skills** (prompt-based playbook w SKILL.md z progressive disclosure), **Slash Commands** (pojedynczy markdown w .claude/commands z prostym promptem - OBECNIE scalone ze skills w 2.1), **Subagents** (.claude/agents/ z isolated context ekspercki role), **MCP Servers** (external tool integration JSON-RPC). Plus **Hooks** (event-driven enforcement PreToolUse/PostToolUse). Distinction skills vs commands jest obecnie LARGELY OBSOLETE po Claude Code 2.1 merge - oba sa dostepne przez /slash, jedyna roznica to ze skill directory pozwala na supporting files + progressive disclosure. Decision tree: Skill dla reusable domain knowledge/workflow (token-efficient progressive disclosure, 37-100 tokens startup, 1500 per invocation), Subagent dla isolated heavy work (parallel execution, bloat prevention), MCP dla external system integration (GitHub/Slack/DB), Hook dla deterministic enforcement event-driven. Token economics: 10 skills installed = ~1000 tokens overhead total (bo tylko metadata), subsequent triggers kosztuja 2-3 tokens (slash command length). Agent teams zuzywaja 7x wiecej tokens bo kazdy teammate ma wlasny context window. Hierarchia decyzji: najpierw sprawdz czy external system (MCP), potem czy event-driven (Hook), potem czy wymaga isolation (Subagent), potem czy reusable procedure (Skill), potem ad-hoc (prompt). Overlap zones: Skills + Hooks (enforcement vs pattern-match), Skills + Subagents (context: fork mostek - ale bug #17283), Skills + MCP (skills wrap MCP slash commands). Model routing: skill body moze miec `model:` field forcujacy Haiku dla mechanical vs Opus dla reasoning - najpelniejsza optymalizacja cost.

## Details

### 1. Czterostopniowa hierarchia rozszerzen

Z alexop.dev "Understanding Claude Code's Full Stack":

| Extension Type | Scope | Primary Use | Token Cost |
|:---------------|:------|:------------|:-----------|
| **MCP Servers** | Connect external systems/APIs | "connects Claude Code to external tools and data sources" | HIGH initial (tool schemas loaded), improving 2026 z deferred loading |
| **Skills** | Reusable workflows, domain knowledge | "Modular, context-aware, auto-invocable with frontmatter control" | LOW (loaded only when task matches description, ~100 tokens startup) |
| **Subagents** | Parallel/isolated heavy work | "Separate context windows prevent context poisoning" | HIGH per-subagent (separate context), prevents main bloat |
| **Hooks** | Event-driven enforcement | "React to lifecycle events without manual triggers" | MINIMAL (lightweight event handlers) |
| **Slash Commands** | Simple one-off prompts | "Single markdown files with simple prompts" | ZERO (merged into skills 2.1) |

Uwaga: Slash Commands po mergu to de facto skills. Historyczny podzial zaciera sie. OneAway.io: "Claude Code 2.1 merged skills and slash commands, with skills now appearing in the slash command menu by default, making the 'skills vs slash commands' distinction largely obsolete for invocation."

### 2. Decision tree alexop.dev (quick selection guide)

```
Need external system access (API, database, git platform)?
├─ YES -> MCP (+ optionally wrap in Skill for workflow)
└─ NO -> continue

Need automatic context-aware behavior triggered by conversation?
├─ YES -> Skill (with description field)
└─ NO -> continue

Need event-driven enforcement (after every edit, before bash)?
├─ YES -> Hook
└─ NO -> continue

Need parallel execution OR isolation from main context?
├─ YES -> Subagent (or Skill with context: fork, CAVEAT bug #17283)
└─ NO -> continue

Need delegation to specialist with different tools/model?
├─ YES -> Subagent
└─ NO -> Simple Slash Command (pojedynczy markdown)
```

### 3. Overlap zones

#### Skills vs Hooks

Both automate. Roznica:
- Hook: "enforce after every action" (e.g., auto-lint after each Edit). DETERMINISTIC.
- Skill: "enable when this pattern matches" (e.g., deploy workflow when user asks). LLM-DISCOVERED.

Use case hybrid: Skill `/lint-check` dla on-demand, Hook PostToolUse dla automatic po kazdym pliku edit.

Techniczne:
- Hooks: zdefiniowane w settings.json lub skill frontmatter `hooks:` field (scoped)
- Skills: zdefiniowane per SKILL.md

#### Skills vs Subagents

Both isolate work. Roznica:
- Skill runs in main context by default (chyba ze `context: fork`)
- Subagent ZAWSZE ma separate context

Docs explicite: "Skills run in main context by default. Add context: fork to a skill to make it spawn a subagent. Choose subagents when you need parallel execution."

CAVEAT: bug #17283 - `context: fork` ignored przy Skill tool invocation. Wiec dla niezawodnosci parallel/isolated work, uzyj `.claude/agents/` subagents.

**Skills with `context: fork` vs standalone Subagents:**

| Feature | Skill + `context: fork` | Standalone Subagent |
|:--------|:------------------------|:--------------------|
| Definition | SKILL.md w `.claude/skills/` | plik w `.claude/agents/` |
| Invocation | /name lub auto match | Task tool w parent |
| Own context | YES (if fork works) | YES always |
| Own tools | agent type defines | agent type defines |
| Bug risk | #17283 (fork ignored w Skill tool path) | NONE |
| Persistence | session only | session only (unless Swarm pattern) |

Anthropic docs: "Skills and subagents work together in two directions" - skills.md moze `context: fork` ustawic subagent; subagent moze miec `skills:` field preloading skills na startup.

#### Skills vs MCP

Skills wrapują capabilities. MCP exposuje je.

AlexOp: "MCP exposes external capabilities as slash commands. Skills compose those capabilities into workflows. Combine them: Skills call /mcp__github__* commands internally."

Przyklad hybrid:
- MCP server: `github` (provides create_issue, list_prs, comment tools)
- Skill: `/bug-triage` body zawiera:
  ```
  1. Run /mcp__github__list_prs to get open PRs
  2. For each PR, run /mcp__github__get_comments
  3. Classify as blocking vs non-blocking
  4. Run /mcp__github__create_issue with classification
  ```

MCP dostarcza executive primitives, Skill jest workflow orchestrator.

### 4. Token economics - deep dive

Z tokrepo.com "Cut Claude Code Token Costs by 50% with Agent Skills":

**Skills startup cost:**
- 10 skills installed: ~1000 tokens total (name + description per skill in system prompt)
- Not 50,000+ if all full bodies loaded
- Progressive disclosure = fundamental tokens savings

**Skill invocation cost:**
- When triggered: SKILL.md body loaded ~500-1500 tokens
- Subsequent triggers in same session: 2-3 tokens (tylko slash command length, body juz in context)
- Break-even: 2-3 triggers per session pokrywa initial 1500 tokens

**Agent teams cost (dla porownania):**
- "Agent teams use approximately 7x more tokens than standard sessions when teammates run in plan mode"
- Each teammate = own context window
- Cost scales ~linearly z team size

**Model selection w skill:**
- Skill z `model: haiku` override -> body uzywa Haiku (5x tansze niz Opus per input token)
- Skill z `model: opus` -> reserved dla complex reasoning (architecture, multi-file refactor)
- Default inherit: dziedziczy po session

#### Praktyczna oszczednosc z Haiku vs Opus

- Opus 4.7: $15/1M input, $75/1M output
- Sonnet 4.6: $3/1M input, $15/1M output
- Haiku 4.5: $0.8/1M input, $4/1M output

Stack odszkodowanie per 10k token skill:
- Opus: $0.15 input + $0.75 output = $0.90 per skill turn
- Sonnet: $0.03 input + $0.15 output = $0.18 per skill turn
- Haiku: $0.008 input + $0.04 output = $0.048 per skill turn

Dla 100 invocations:
- Opus: $90
- Sonnet: $18
- Haiku: $4.80

Skill frontmatter `model: haiku` dla mechanical tasks (formatting, extraction, simple transformations) = 18x taniej niz Opus bez utraty jakosci.

### 5. Use case mapping

Z Shipyard cheat sheet + analytics vidhya + Anthropic docs:

**Skills:**
- Replacing repetitive prompts (load instructions once, invoke z 3-token slash)
- Specialized instructions keeping base context small
- Reusable domain knowledge (`react-conventions`, `postgres-queries`)
- Complex procedures z supporting files (`book-factory`, `deploy`)

**Slash Commands (post merge = skills):**
- Simple one-off prompts bez supporting files
- Historical: backward compat dla `.claude/commands/*.md` files
- Now: prefer skills bo wspieraja supporting files + frontmatter

**Subagents:**
- Verbose output stays w subagent kontekscie, tylko summary wraca
- Tasks ktore bloatowaly main context
- Parallel execution (spawn 5 reviewers: security + perf + code-quality + a11y + test-coverage)
- Different model routing (research agent na Sonnet, main na Opus)

**MCP Servers:**
- External systems (PostgreSQL, GitHub, Jira, Slack)
- Typed API z schema validation
- Reusable across projects
- Centrally configured in settings

**Hooks:**
- Enforce conventions ("never use `any` type" -> PostToolUse hook)
- React to lifecycle events (auto-commit po passing tests)
- Quality gates (block deploy jesli lint fails)
- Security guardrails (audit log bash commands)

### 6. Decision matrix (practical)

Z OneAway:

| Decision point | Question | Go to |
|:---------------|:---------|:------|
| 1 | Czy potrzebujesz polaczyc zewnetrzny system? | YES -> MCP; NO -> 2 |
| 2 | Czy chcesz automatyczne zachowanie triggerowane eventem (post-edit, pre-bash)? | YES -> Hook; NO -> 3 |
| 3 | Czy task wymaga isolated context (parallel, heavy read, long analysis)? | YES -> Subagent; NO -> 4 |
| 4 | Czy procedure jest reusable cross-session? | YES -> Skill; NO -> 5 |
| 5 | Czy to jednorazowy prompt? | YES -> ad-hoc prompt; NO -> Skill (dla reusability) |

### 7. Overlap w Maciejowym systemie (v32.16)

Maciej ma:
- 35 skills (research agents - res_tech, res_docs, itp + worker agents - builder, qa, itp)
- 42 commands (team presets - /deep-research-v2, /five-minds, /security-hardening, itp)

Architektoniczna logika (z CLAUDE.md projektu):
> "How it works: User describes a task -> Claude reads the catalog -> proposes the best preset -> user confirms -> preset loads skill files for each agent -> agents run as subagents."

Czyli:
- Command (42 presets) = orchestrator skill definiujacy pipeline dla multi-agent workflow
- Skill (35 agents) = prompt content kazdego agenta (res_tech, res_critic, itp)
- Agents run as subagents = kazdy agent dostaje swoj separate context via Task tool

Maciej uzywa pattern A (Sequential) + B (Fan-Out) z R4 - klasyczny multi-agent research pipeline.

Decision tree Maciejowy:
- Chce dodac nowy agent researchy (np. `res_academic`) -> SKILL
- Chce dodac nowy preset orchestrator (np. `/legal-review`) -> COMMAND (zostaje command)
- Chce enforce ze kazdy agent musi skonczyc REPORT FORMAT -> HOOK PostToolUse
- Chce integracji z Linear dla tickets -> MCP

### 8. Model routing za pomoca skill.model field

Rozni skills na rozne modele - standard optymalizacja:

```yaml
# res_extractor (Haiku)
---
name: res_extractor
description: Extract claims from research reports into structured JSON
model: haiku
---
Extract claims in claim-table JSON format...

# res_critic (Opus)
---
name: res_critic
description: Critical review of research reports for conflicts
model: opus
---
Cross-reference reports, find conflicts, flag gaps...
```

Maciej juz to robi - 7 extractorow Haiku, Syntetyk/Critic/Orchestrator Opus, Researchers Sonnet. Tabela w deep-research-v2.md pokazuje optymalny STANDARD routing.

### 9. Kiedy skill NIE wystarczy

Docs i community flagują:
- Long-running tasks z persistent state miedzy sesjami -> Swarm/Teams, nie skill
- Tasks wymagajace real-time collaboration -> MCP notifications + hooks
- Skills z very large bundled content (> 100k tokens) -> supporting files + progressive disclosure (wewnatrz skill), nie przerzucac do kontekstu naraz
- Cross-session knowledge base -> CLAUDE.md lub custom memory store, skill to stateless body

### 10. Kiedy command vs skill (post merge)

Po mergu 2.1 roznice minimalne. Zostaw komende (.claude/commands/x.md) gdy:
- Masz juz dzialajacy command bez supporting files (backward compat, no refactor needed)
- Prompt 1-akapitowy, zero struktury

Przenies na skill (SKILL.md + directory) gdy:
- Chcesz supporting files (reference.md, examples.md, scripts/)
- Chcesz progressive disclosure (body < 500 lines, detail w innych plikach)
- Chcesz frontmatter features (disable-model-invocation, allowed-tools, paths, context: fork)

Anthropic docs: "Skills are recommended since they support additional features like supporting files."

### 11. Hidden costs chain decisions

**Skill invocation**
- Body injection: 1500 tokens (one-off per session)
- Subsequent: 2-3 tokens
- Compaction: first 5k tokens preserved, 25k combined budget
- Re-invocation cost: same 1500 tokens jesli droppd przez compaction

**Subagent invocation**
- Spawn overhead: ~200 tokens (Task tool call)
- Own context: 0-200k tokens zaleznie od work
- Return cost: return message ~500-5000 tokens to main
- Parallel spawn: N*spawn + N independent contexts

**MCP tool call**
- Schema load (one-off per session): 500-5000 tokens per server
- Per-call: ~200 tokens (tool name + args)
- Response: tool-specific

**Hook trigger**
- Zero tokens in Claude context for successful hook (runs in bash)
- Failed hook: error message ~100 tokens to Claude

Wniosek: hooks + MCP sa najbardziej cost-efficient per invocation. Skills sa efficient dla reusable workflows. Subagents drozsze per invocation ale chronią main context - netto win dla long tasks.

## Issues / Flags

**Conflict #1:** skills vs commands distinction - post-merge "largely obsolete" per OneAway, ale Anthropic docs nadal rozroznia w documentation. Community jest ahead of docs. Critic resolve.

**Conflict #2:** token cost claims - tokrepo mowi "98% token savings" (clickbait?), Anthropic mowi ~1500 tokens overhead dla 40 skills. Liczby roznia sie bo liczniki roznych rzeczy (savings vs overhead). Critic uporzadkuje.

**Gap:** decision tree dla HYBRID situations (skill + hook, skill + MCP). Docs nie formalizuja.

**Gap:** benchmark empiryczny kosztow per approach. Community twierdzi liczby bez metodologii. Syntetyk powinien uzyc conservative estimates.

**Bug:** `context: fork` bug #17283 zmienia optymalny decision tree - "use subagent instead of skill z fork" staje sie defacto standard dla isolacji.

**Ambiguity:** slash commands merging (2.1) - czy `.claude/commands/*.md` ma byc migrated na `.claude/skills/*/SKILL.md`? Docs: "recommended" ale commands "keep working". Community: gradual migration.

## Recommendation

GO do Phase 2. Decision tree jest dobrze opisany w community, mniej formalnie w Anthropic docs.

Dla SYNTHESIS Part "Skill vs Command vs Agent":
- Czterostopniowa hierarchia (MCP, Skill, Subagent, Hook) = core model
- Decision tree 5-point = quick reference
- Overlap zones z concrete examples
- Token economics table porownanie
- Model routing via `model:` field

Praktyczna rekomendacja dla Macieja:
1. Jego 35 skills + 42 commands = CORRECT split. Skills sa atomic agent definitions, commands sa workflow orchestrators. Post-merge mogloby byc wszystko skills ale semantyczne rozdzielenie (agent = skill, preset = command) jest czytelne.
2. Model routing `model:` w skill frontmatter to low-hanging fruit dla optymalizacji. Extractorzy maja model: haiku - good. Rozwazyc tez dla res_tech/res_ux (Sonnet ok, ale Haiku moze byc wystarczajacy dla structured retrieval).
3. Dla enforcement standardow (np. kazdy QA skill musi sprawdzic WCAG) rozwazyc PostToolUse hook scoped do skill, nie ponawiac w body kazdego skillu.
4. MCP integration dla external tools (GitHub, Linear) = next step gdy chcesz triggery automatyczne.

Deep confidence on: czterostopniowa hierarchia, decision tree, overlap zones, model routing.

Medium confidence on: empirical token costs (community numbers, no primary source), hybrid patterns.

Low confidence on: optimal migration path commands->skills dla istniejacych systemow.

### Zrodla
- alexop.dev/posts/understanding-claude-code-full-stack - decision tree
- alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents - hierarchy
- code.claude.com/docs/en/skills - Anthropic docs
- code.claude.com/docs/en/sub-agents - subagents docs
- oneaway.io/blog/claude-code-commands-vs-skills - merge analysis
- tokrepo.com/en/guide/save-token-costs - token economics
- codewithseb.com/blog/claude-code-skills-reusable-ai-workflows-guide - practical guide
