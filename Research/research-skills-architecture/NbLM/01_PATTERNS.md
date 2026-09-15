# 01_PATTERNS - Claude Code Skills Architecture

**Pattern library + anti-patterns (NotebookLM briefing)**

## A. Premium skill DNA (5 cech)

1. **Vendor ownership** - Remotion team buduje Remotion skill, Anthropic buduje Frontend Design
2. **Frontmatter discipline** - trigger-rich description (200-500 char, keywords + capabilities + use cases)
3. **Multi-file resources** - SKILL.md jako index + references/ + scripts/ on-demand
4. **Commitment-before-generation** - wymusza explicit decisions PRZED outputem
5. **Security audit** - signed (Remotion via Agent Trust Hub + Socket), vetted (Trail of Bits)

## B. Commitment-before-generation pattern (highest-impact)

### Struktura
1. User request arrives
2. Skill activates
3. **Commitment phase**: skill wymusza wybor jednej z opcji (aesthetic direction / threat model / voice)
4. **Ban list enforcement**: odrzuca defaulty (np. Inter/Roboto/Arial for Frontend Design)
5. **Execution**: generuje zgodnie z commitment

### Dlaczego dziala
LLM ma bias toward statistical mean (purple gradient, Inter font, grid cards). Commitment + ban filtruje statistical mean EX ANTE, nie ex post.

### Przyklady
- Frontend Design: aesthetic direction (brutalist / maximalist / editorial / retro)
- Trail of Bits: threat model (memory safety / concurrency / auth)
- AgentSys: task decomposition PRZED delegation
- Writing skill: voice register (formal / casual / technical)

## C. Three-layer description structure

```yaml
description: |
  [LAYER 1 - DOMAIN KEYWORDS - 3-5 unique words]
  [LAYER 2 - CAPABILITIES - verb+noun phrases]
  [LAYER 3 - TRIGGERS - "Use when..." specific conditions]
```

### Przyklad (Remotion)
```yaml
description: |
  Best practices for programmatic video generation with React components.
  Handles animation timing, audio synchronization, captions, 3D rendering.
  Use when generating or modifying Remotion compositions, rendering pipelines,
  or React-based video workflows.
```

## D. 4 canonical chain patterns

### D1. Sequential (A -> B -> C)
- Kazdy skill processes output poprzedniego
- Przyklad: cashandcache competitive-intel (gather -> extract -> analyze -> report)
- Cost: N * (metadata + body)

### D2. Fan-Out/Merge (A -> [B, C, D] -> merge)
- Parallel via `context: fork` subagents
- Results synthesize w main
- Cost: N * (subagent startup ~2k + body)
- **BROKEN** by bug #17283 gdy wywolane via Skill tool

### D3. Conditional Routing (A decides B or C)
- Orchestrator skill z explicit decision prompt
- Opiera sie na Claude reasoning
- Maciejowy PRESET_CATALOG.md routing to przyklad

### D4. Iterative Loop (A until condition)
- Skill repeatedly invoked z termination criterion
- Use: refactor-until-tests-pass, generate-until-lint-clean
- Post-compaction 5k cap constraint

## E. State passing levels

| Level | Mechanism | Durability |
|-------|-----------|-----------|
| 1 Conversation text | Claude reformulates | Fragile, brittle for long chains |
| 2 Filesystem artifacts | Skill writes/reads files | Survives compaction |
| 3 MCP shared state | External server (Notion, Jira) | Multi-session coherence |

**Chain >3 skilli = Level 2 obowiazkowy.**

## F. Model routing decision framework

**Wymiar 1: Task complexity**
- Extraction / classification / parsing -> Haiku
- Research z reasoning / multi-step synthesis -> Sonnet
- Orchestration / quality judgments / creative synthesis -> Opus

**Wymiar 2: Output length**
- Short structured (JSON, list) -> Haiku
- Medium narrative (1-2k) -> Sonnet
- Long reasoning (5k+) -> Opus

**Wymiar 3: Iterative refinement**
- One-shot -> lower
- Multi-turn -> higher (lepiej zrobi dobrze pierwszy raz)

**Wymiar 4: Criticality**
- Disposable -> Haiku
- Synthesis / decision wrzedowych -> Opus

## G. 9 anti-patterns (CO NIE ROBIC)

1. **Generic names** (`my-skill`, `helper`, `utility`) - zero trigger uniqueness
2. **Empty description** (`Helps with coding tasks`) - auto-invocation martwa
3. **Body bloat** (>3000 tokens without resources) - post-compaction ejection
4. **Boolean prop proliferation** (5+ boolean fields) - rozproszona konfiguracja
5. **LLM-default capitulation** (no commitment) - statistical mean output
6. **Over-chaining** (>5 skills deep) - nonlinear token cost
7. **Testing debt** (brak golden outputs) - production fragility
8. **Context pollution** (5000+ tokens resources loaded upfront) - compaction failure
9. **Hardcoded paths** (absolute C:\ or /home/user/) - cross-platform break

## H. Zombie skill state (foot-gun)

```yaml
disable-model-invocation: true
user-invocable: false
```
= Skill unreachable by ANY path. No legitimate use case. Linter should warn.

## I. Task vs Reference - invocation design

| Type | Content | Best path | Rationale |
|------|---------|-----------|-----------|
| Reference | Style guides, conventions, domain knowledge | Path A (auto) | Runs inline, contributes context passively |
| Task | Deploy, commit, code-gen | Path B (manual) + disable-model-invocation | Side effects need user intent |
| Hybrid | Frontend Design | Path A + commitment enforcement | Auto-discovery + guardrails |

## J. Tier overlap zones + hybrydy

**Skill + Hook**: pre-commit quality check (Hook triggers, Skill provides logic)
**Skill + Subagent**: skill z `context: fork` + `agent:` field (skill = prompt, subagent = environment)
**Skill + MCP**: skill z `allowed-tools: [mcp-server__tool]` (skill wraps data layer)

## K. "Full-stack" architecture (all 4 tiers)

1. Hook trigger (np. pre-commit)
2. Skill orchestrator (decision logic)
3. Subagent (isolated execution)
4. MCP (external data)

Example: automated security review na kazdy PR.
**Koszt**: complexity wysoka. Use tylko gdy workflow wymaga wszystkich 4.

## L. Plugin vs Standalone trade-off

| Factor | Standalone | Plugin |
|--------|-----------|--------|
| Overhead | Zero | plugin.json + dir structure |
| Versioning | None | Semver |
| Distribution | Manual clone | /plugin install |
| Namespace | Global | plugin-name:skill-name |
| Bundle MCP/hooks | No | Yes |
| Private use | Ideal | Overkill |
| Public distribution | Doesn't scale | Purpose-built |

## M. Decision tree: ktory tier wybrac

1. Potrzebujesz external state/API? -> **MCP**
2. Reusable prompt logic? -> **Skill**
3. Context isolation needed? -> **Subagent** (or Skill+fork)
4. Lifecycle event automation? -> **Hook**

**Heuristic**: start najprostszym tiem ktory rozwiazuje problem. Eskaluj tylko gdy konieczne.

## N. 7 architectural principles

1. **Progressive disclosure wszedzie** - na kazdym poziomie (skill, chain, system)
2. **Commitment jest missing piece** - largest single quality jump
3. **Artifacts over memory** - persist state do filesystem dla dlugich chainow
4. **Simplest tier wins** - nie forsuj full-stack gdy 1-tier wystarczy
5. **Namespacing to discipline** - convention-based dla standalone, plugin dla public
6. **Bug #17283 jako architectural constraint** - design around it
7. **Opportunity zones** - multi-agent orch, non-EN, meta-skills underrepresented

## O. Post-compaction recovery strategies

**A. Re-invocation checkpoint** - orchestrator checks active skills, re-invokes jesli droppped
**B. Filesystem artifacts** (BEST) - kazdy krok persist output do pliku
**C. Minimal skill bodies** - <1500 tokens survive re-attach
**D. Session-startable chains** - dzialaja od dowolnego kroku dzieki persist state
**E. Accept compaction losses** - dla low-criticality, szybciej/tanio

## P. Top-10 consensus skills 2026

1. Frontend Design (Anthropic)
2. Remotion (Remotion team)
3. Trail of Bits Security
4. AgentSys / Agent Orchestrator
5. Book Factory
6. Memory Persistence
7. Structured Engineering Workflows
8. Web Extraction (Firecrawl)
9. Marketing Operations
10. Document Automation

**Categories distribution**: Engineering 43%, Document 22%, Web/research 18%, Marketing 12%, Security 5%.

**Opportunity zones** (underrepresented): multi-agent orchestration, non-English skills, meta-skills, educational.
