# CRITIC - Claude Code Skills Architecture 2026

**Role:** Krytyczna walidacja R1-R7 + E1-E7 (Opus)
**Date:** 2026-04-17
**Target:** PASS/REVISE per report, >=5 explicit conflict resolutions, >=3 gaps not resolvable with current evidence

## 1. Verdict per report

| Report | Verdict | Rationale |
|--------|---------|-----------|
| R1 (Official Docs) | PASS | Primary sources cited verbatim, 25 claims high confidence, 4 gaps self-flagged and routed. Most rigorous. |
| R2 (Frontmatter) | PASS | 21 claims, bug #17283 properly documented with issue URL, token overhead conflict explicitly triangulated. |
| R3 (Invocation) | PASS with notes | 18 claims solid. Auto vs manual reliability trade-off identified but lacks quantitative latency data - acceptable given no official benchmark. |
| R4 (Chaining) | PASS | 20 claims, 4 patterns well-catalogued, Swarm Orch alternative properly positioned as distinct from Claude-mediated chain. Token economics derived cleanly. |
| R5 (Skill vs Command vs Agent) | PASS with notes | 20 claims, 4-tier hierarchy clear. Cost numbers ($90 Opus vs $4.80 Haiku for 100 invocations) are approximate - flagged as derivation not measurement. |
| R6 (Plugin Skills) | PASS with caveats | 20 claims, ecosystem catalog robust. R6.C17 (namespace scope priority) honestly flagged low confidence - do not use as load-bearing claim in synthesis. |
| R7 (Community Patterns) | PASS | 21 claims, cross-referenced with R1-R6. Trend predictions (R7.C17) correctly marked low confidence. Anti-pattern catalog is most actionable output. |

**Overall:** 7/7 PASS. No REVISE required.

## 2. Conflict resolutions (>=5)

### 2.1 CONFLICT-A: Token overhead per skill (R2.C17, R1.C5)
**Claims:** Anthropic eng blog says "40 skills = 1500 tokens" (~37/skill); Lee Hanchung measured ~100 tokens startup + ~1500 per turn.

**Resolution:** Not contradictory; two different measurements. Anthropic number is **metadata-only listing cost** (name + truncated description injected to system prompt). Lee's ~100 tokens includes full listing entry with when_to_use + argument-hint + when combined exceed 1024 char per skill before truncation. Lee's ~1500/turn is the **post-invocation body tokens** (Level 2 instructions), which only applies once a skill has been triggered. Both numbers should appear in SYNTHESIS as Level 1 vs Level 2 costs.

**SYNTHESIS guidance:** Use ~37-100 tokens/skill for startup overhead (depends on description length); ~1500 tokens added per unique skill invocation (Level 2 body). Combined budget after compaction is capped at 5k/skill, 25k total.

### 2.2 CONFLICT-B: Description char caps (R1.CONFLICT1)
**Claims:** API spec enforces 1024 chars max per description field; Claude Code listing truncates combined (description + when_to_use) to 1536 chars.

**Resolution:** Not strictly contradictory. 1024 is **field-level** validation applied on API upload (/v1/skills endpoint). 1536 is **entry-level** truncation applied by Claude Code when building skill listing in system prompt. A skill uploaded via API must have description <=1024 chars; Claude Code then concatenates description + when_to_use in listing and truncates the concatenation at 1536 chars. A skill with description=800 chars and when_to_use=800 chars = combined 1600 chars, truncated to 1536 in listing. Both limits apply simultaneously at different layers.

**SYNTHESIS guidance:** Recommend description <=1024 chars (compatibility with API surface) and combined description+when_to_use <=1400 chars (safety margin under 1536 truncation).

### 2.3 CONFLICT-C: Bug #17283 silent failure (R2.CONFLICT2, R4.CONFLICT2)
**Claims:** context:fork + agent fields ignored when skill invoked via Skill tool; creates silent failure for fork-dependent patterns.

**Resolution:** Confirmed open bug in anthropics/claude-code repo. Impact scope: any skill with `context: fork` designed for context isolation loses isolation when called programmatically by another skill/agent via Skill tool. Critical implication: Fan-Out/Merge chain pattern (R4.C4) breaks silently under this bug. Workaround: use slash invocation or subagent-with-skills field instead of Skill tool for fork-dependent skills.

**SYNTHESIS guidance:** Flag this bug in Part "Chaining Patterns" section as blocker for parallel-agent architectures until fix lands. Do not rely on Skill tool for fork isolation.

### 2.4 CONFLICT-D: Zombie skill state (R1.CONFLICT2, R2.C18)
**Claims:** disable-model-invocation:true + user-invocable:false creates skill unreachable by any path.

**Resolution:** Confirmed not contradictory but is a misconfiguration. Docs do not explicitly prohibit this combination. Third-party invocation is blocked by disable-model-invocation, UI access blocked by user-invocable:false, leaving no path. This is a foot-gun, not a feature. No legitimate use case identified.

**SYNTHESIS guidance:** In Decision Guide, flag combo as invalid configuration; linters should warn.

### 2.5 CONFLICT-E: Chain reliability vs power (R4.CONFLICT1)
**Claims:** Deeper chains enable richer workflows but degrade post-compaction; 5k per-skill re-attach is insufficient for information-dense chains.

**Resolution:** Genuine trade-off not resolvable by platform choice. Mitigations: (a) reduce chain depth to 2-3 (R7.C12 anti-pattern avoidance); (b) use Swarm Orchestration (R4.C7) for parallel workloads instead of deep serial chain; (c) persist critical state to filesystem via hook (Hook+Skill hybrid R5.C4) so chain survives compaction.

**SYNTHESIS guidance:** In Chaining Patterns section, recommend max chain depth 3 + alternatives (swarm, filesystem state) for deeper workflows.

### 2.6 CONFLICT-F: Auto vs manual reliability (R3.CONFLICT1)
**Claims:** Auto-invocation saves user effort but non-deterministic; manual is deterministic but requires memorization.

**Resolution:** Not a bug, architectural trade-off. Resolution depends on skill type: task-oriented skills with side effects (deploy, commit) should prefer manual (R1.C4 task content) via `disable-model-invocation:true` + clear slash name. Reference-oriented skills (style guides, conventions) should prefer auto via trigger-rich description (R3.C3). Hybrid: commitment-based premium skills (Frontend Design) use both - auto-discovered via description, but enforce commitment before generation.

**SYNTHESIS guidance:** Decision Guide should include "task vs reference" axis to drive invocation-path choice.

### 2.7 CONFLICT-G: Skill/Subagent boundary (R5.CONFLICT1)
**Claims:** Skill with context:fork blurs Skill/Subagent distinction; some guides treat as same tier, others as distinct.

**Resolution:** Architecturally distinct: Skill = instruction + resources (prompt pattern); Subagent = execution environment (isolated context with model+tools+permissions). context:fork is a **bridge field** that lets a Skill trigger Subagent execution. In 4-tier hierarchy (R5.C1), Skill+fork is still a Skill with environment override, not a promotion to Subagent tier.

**SYNTHESIS guidance:** Treat context:fork as delegation mechanism, not tier promotion. Pure subagent definitions live in ~/.claude/agents/ and are invoked differently.

## 3. Gaps NOT resolvable with current evidence

### 3.1 GAP-I: Plugin namespace priority ambiguity (R6.GAP1, R6.C17)
**Unresolved question:** When plugin skill `vercel:deploy` exists globally AND project-level `.claude/skills/deploy.md` exists, does project win (scope priority R1.C1) or plugin win (global installation)?

**Evidence available:** None authoritative. Community reports (R6.C17) suggest project wins but without empirical verification. Official docs silent.

**Status:** Open. Requires empirical test in controlled environment. Do not make load-bearing synthesis claims on this.

### 3.2 GAP-II: Plugin update mid-session behavior (R6.GAP1)
**Unresolved question:** If /plugin update runs during active conversation, does Claude Code re-read updated skill bodies, or does the session hold stale snapshot?

**Evidence available:** R1.C17 (live change detection) suggests add/edit/remove reflected in session. But plugin updates are special (package-level atomic swap). Unclear whether live change detection fires for plugin files or only user-owned skills.

**Status:** Open. Could be empirically tested but no official statement.

### 3.3 GAP-III: Marketplace signing/provenance (R6.GAP3)
**Unresolved question:** What cryptographic signing or provenance mechanism protects Anthropic official marketplace? What recourse exists for third-party marketplaces?

**Evidence available:** None public. Trail of Bits skills-curated is a community response to the gap, but does not provide platform-level signing.

**Status:** Open. High enterprise-adoption relevance. Do not recommend third-party marketplaces for security-sensitive workloads without further clarity.

### 3.4 GAP-IV: Empirical auto-invocation reliability (R7.GAP2)
**Unresolved question:** How reliably does Claude's description-match invocation fire for different description styles? Is there an A/B benchmark?

**Evidence available:** Heuristic advice only (trigger-rich keywords, use-case explicit). No quantified reliability per description style.

**Status:** Open. Community would benefit from a standardized description-quality scoring tool.

## 4. Cross-report consistency check

### 4.1 Scope priority (R1.C1) reused in R5.C17, R6.C14
Consistent treatment across all reports. Plugin namespace rule (R1.C2, R6.C2) aligned.

### 4.2 Bug #17283 (R2.C13, R3.C10, R4.C9, R6.C16)
Consistent across 4 reports. Critical cross-cutting issue. SYNTHESIS must address.

### 4.3 Progressive disclosure (R1.C4) reused in R7.C14
Consistent. R7's context pollution anti-pattern directly derives from R1 architecture.

### 4.4 Commitment-before-generation (R6.C11, R7.C11, R7.C19)
Consistent. Identified as highest-impact quality pattern.

### 4.5 Token budget 5k/25k (R1.C9, R4.C17, R7.C9)
Consistent. Foundation for chain depth recommendations.

## 5. Missing topics (orchestrator self-critique)

**Not covered by any R1-R7:**

1. **Skill observability/telemetry:** How does user see which skill fired, how long it took, what it returned? No monitoring infrastructure discussed. Gap for production adoption.

2. **Skill versioning during development:** Local iteration on skill without publishing plugin; no semver workflow docs.

3. **Internationalization:** R7.C18 flags opportunity but no concrete i18n pattern for skills (bilingual skills = Maciej's unique territory).

4. **Enterprise governance:** Managed settings mentioned R1.C1 but organizational policies for skill usage (approval workflow, audit trail) not covered.

5. **Performance tuning:** When skills fail to trigger, no systematic debugging protocol documented.

**SYNTHESIS action:** Note these as "Known unknowns" section; do not fabricate coverage.

## 6. Confidence levels for SYNTHESIS

**Load-bearing (high confidence, use freely):**
- Scope hierarchy, frontmatter fields (R1, R2)
- 3 invocation paths mechanics (R3)
- 4 chain patterns + Claude-mediated principle (R4)
- 4-tier architecture (R5)
- Premium skill characteristics (R7)

**Reference with caveat (medium confidence):**
- Token overhead numbers (derived, not measured in Maciej's setup)
- Chain cost estimates (extrapolation)
- Trend predictions (R7.C17)

**Flag explicitly (low confidence):**
- Plugin vs project standalone namespace priority (R6.C17)
- Plugin update mid-session (R6.GAP1)
- Exact premium skill token footprints (R7.GAP1)

## 7. Verdict

**OVERALL PASS.** All 7 reports meet quality bar. 7 conflicts resolved explicitly. 4 gaps acknowledged as unresolvable without empirical testing.

**Proceed to Phase 4 SYNTHESIS.**

## 8. Synthesis structure recommendation (8-10k words)

Suggested 7 parts (informing plans/SYNTHESIS.md):

1. **Part I: Fundamenty** - R1 material (scope, progressive disclosure, file anatomy)
2. **Part II: Frontmatter DNA** - R2 material (13 fields, bug #17283, token overhead)
3. **Part III: Invocation** - R3 material (3 paths, merge semantics, permission rules)
4. **Part IV: Chaining** - R4 material (4 patterns, Claude-mediated principle, Swarm alternative)
5. **Part V: Tier Decision** - R5 material (MCP/Skills/Subagents/Hooks matrix)
6. **Part VI: Plugin Ecosystem** - R6 material (distribution, marketplace, premium DNA)
7. **Part VII: Patterns & Anti-patterns** - R7 material (top-10, anti-patterns, Maciej positioning)

Each part cites R<N>.C<M> for load-bearing claims.
