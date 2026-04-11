# CRITIC - Synthesis and Validation of R1-R5 (v32.13)

**Date:** 2026-04-10
**Scope:** Validate R1 (sidebar audit), R2 (notebookLM extraction), R3 (versions archaeology), R4 (agent profile design), R5 (agent data audit). Flag conflicts, produce PASS/REVISE verdicts, define consensus for Phase C (MANIFEST + DESIGN_SPEC + LAYOUT_SPEC + HITL_GATE_1).

---

## 1. Per-researcher verdicts

### R1 - Sidebar Audit (pokazInfoPr vs pokazWezel delta)
**Verdict: PASS**

Strengths:
- Exact line ranges for both functions (pokazInfoPr 6635-6687, pokazWezel 5791-5834) verified against the actual file during Phase A.
- Complete CSS inventory with line ranges, so Phase C can reference every reusable block without re-greping.
- 7-item prioritized gap list with CRITICAL/HIGH/MEDIUM/LOW labels.
- Correct identification that `.vd*`, `.ds-longdesc`, `.ds-mdl-row`, `.btn-learn.is-rich` are already GENERIC (not preset-scoped) - zero CSS changes needed.

Gaps:
- No mention of pokazDef (the palette variant, lines 5836-5850). R1 lists it in section 3 but does not include it in the delta matrix. **Minor - Phase D2 must remember to patch both.**
- No sticky-hero consideration; R4 later adds this. Not a defect in R1, but a signal the audit was markup-level not interaction-level.

### R2 - NotebookLM Extraction
**Verdict: PASS with 1 caveat**

Strengths:
- All 18 agent profiles delivered (1035 lines total, ~60 lines per agent).
- 11 structured fields per agent: Source, Role label, Analogia, Kim jest, Co robi (5-7), Czego NIE robi (4-6), Anti-patterns (3-5), Ciekawostki (3-5), Kiedy uzywac zielone (4-6), Kiedy NIE uzywac czerwone (4-6), Dlugi opis (~200 words).
- Plain ASCII, no em-dashes, Polish-first (meets MEMORY.md rules).
- Self-reported confidence: "bogaty" for 15/18, "sredni" for res_ux, interpretations flagged.

Caveats:
- **Backend vs frontend split is interpretation-only.** notebookLM has one Koder file; R2 split it per user instruction with slant labels (backend = API/DB/infra, frontend = UI/state). Phase D1 must honor this and flag both in constants as "interpreted".
- **R2 covers 18 agents.** Our AD array has 35 agents (28 base + 7 v32.6 new: db_architect, observability_engineer, gtm_strategist, statistician, eda_analyst, control_mapper, telemetry_surfer). So 17 agents have NO notebookLM source. **Phase D1 must fallback to AGENT_KNOWLEDGE for those 17 and mark them as "AGENT_KNOWLEDGE-derived".**
- res_ux anti-patterns are name-only interpretations (R2 self-flagged).
- res_forums anti-patterns are fully interpreted (R2 self-flagged).
- Five Minds experts (expert_pragmatist/innovator/analyst/user/devil) NOT in R2. They are in AGENT_KNOWLEDGE. **Use AGENT_KNOWLEDGE for them.**
- decision_presenter NOT in R2. In AGENT_KNOWLEDGE.

Phase D1 plan: R2 provides rich source for ~18 agents, AGENT_KNOWLEDGE provides 35/35 coverage but shorter prose. Merge strategy: use R2 where it exists (19 if we count backend/frontend split), use AGENT_KNOWLEDGE for the rest, and mark interpreted entries so a future editor pass can re-enrich them.

### R3 - Versions Archaeology
**Verdict: PASS**

Strengths:
- Correct trajectory v28 -> v31 -> v32.11 -> v32.12 with accurate feature attribution.
- 5 anti-patterns from history documented (hover tooltips, multi-tab, stacked bar chart, vertical .ds-mdl-big, flat btn-learn).
- Reuse recommendations match R1 independently, giving us consensus on CSS drop-ins.
- Confirms AGENT_*_PL constants DO NOT EXIST in any prior version (no reuse possible at data layer).

No gaps found. This is a context-setting report and serves its purpose.

### R4 - Agent Profile Design Patterns
**Verdict: PASS with 1 critique**

Strengths:
- 14 reference profile UIs mapped with cross-reference matrix.
- Recommendation Variant B (Progressive Disclosure) well-argued on 3 grounds: muscle memory with v32.12, scroll budget (~936px = 1.0-1.2 screens on 1080p), no tab cost.
- Section order ranked 1-13 with rationale per position.
- Three ASCII mockups with height budget math.
- Open questions for Gate #1 enumerated (8 items).
- Confidence labels per claim (CERTAIN / PROBABLE / SPECULATION).

Critique:
- **R4 expands section count from our 13-section hypothesis.** R1 delta had 7 critical/high gaps; R4's final list has 13 sections. This is more ambitious than R1's "mirror v32.12 preset" framing. Our MANIFEST must decide: do we ship R4's full 13-section recipe, or a trimmed subset in v32.13 with the rest in a follow-up? **Recommend: ship the full 13 - the extra sections are either empty-state-hidden (connections, load, facts) or already partially present (tools, model, prompt).**
- **R4 proposes PROMPT PILL + MODAL** instead of in-sidebar textarea. This is a material change vs R1 which kept the textarea. R4's rationale (textarea destroys scroll budget, same pattern as v32.12 command pill) is strong. **Recommend: adopt prompt modal.**
- **R4 proposes STICKY HERO** - R1 does not mention stickiness. **Recommend: adopt, minor CSS change (position:sticky; top:0).**
- **R4 dynamic facts counter** - "6 sekcji wiedzy" should be dynamic getter over AGENT_KNOWLEDGE[id]. **Adopt.**
- **R4 proposes amber anti-pattern chips INLINE in CO ROBI / CZEGO NIE ROBI** rather than a separate ANTI-PATTERNS section. This conflicts with R1 section 7 which lists them as separate. **Resolution: merge - inline amber chips are more scan-efficient (R4 wins).** But we keep the inline strip visible, not hidden.
- **R4 prompt modal width** left as open question (600-800px or fullscreen). **Recommend for Gate #1: fullscreen modal on mobile, 720px centered on desktop.**

### R5 - Agent Data Audit
**Verdict: PASS**

Strengths:
- 100% coverage confirmation for AGENT_KNOWLEDGE (35/35 agents).
- All 4 AGENT_*_PL constants confirmed NON-EXISTENT (grep 0 matches).
- Line ranges for PRESET_*_PL templates to mirror 1:1.
- Verification table (0/35 -> 35/35 target for each constant).
- Helper function inventory (getAgentKnowledge etc.) lists 4 optional new getters (can skip).

No gaps. R5 is simple and correct.

---

## 2. Conflicts between researchers

### Conflict 1: R1 vs R4 on section count
- R1: 7-item gap list mirroring v32.12 preset -> ~13 total sections.
- R4: 13 explicit sections with sticky hero, prompt modal, dynamic CTA getter.
- **Resolution:** R4 superset is correct. R1 was markup-delta scope; R4 is IA/UX scope. Ship R4's full list with R1's CSS reuse.

### Conflict 2: R1 vs R4 on prompt editor placement
- R1: keep in-sidebar textarea (`ds-ta`).
- R4: move to modal behind 32px pill.
- **Resolution:** R4. The textarea is ~140px tall, blowing the scroll budget by ~15%. Pill + modal matches v32.12 CLAUDE CODE COMMAND pattern.

### Conflict 3: R1 vs R4 on anti-patterns
- R1: separate ANTI-PATTERNS card below CO/NIE ROBI (LOW priority).
- R4: inline amber chips mixed into CZEGO NIE ROBI column.
- **Resolution:** R4 inline. More compact, more scan-efficient, reuses the existing grid.

### Conflict 4: R2 coverage gap (18 agents) vs R5 target (35 agents)
- R2: 18 agent profiles extracted.
- R5: 35 agent targets needed.
- **Resolution (hybrid):** For 18 agents with R2 source -> use R2 (rich). For 17 agents without R2 -> use AGENT_KNOWLEDGE + R5-mentioned facts only, with slightly shorter AGENT_LONG_PL (150 words vs 200). Mark interpreted entries in code comments so a future editor can re-enrich.

No other conflicts found.

---

## 3. Consensus list for Phase C

### 3.1 Section order (13 sections, Variant B)
1. HERO (sticky, 88px): orb + name + role + phase chip + model micro-chip + load mini-bar
2. VERDICT PANEL (220px): dual-column KIEDY UZYC / KIEDY NIE UZYC (reuse .vd .vd-col.fit/.nofit)
3. KLUCZOWE KOMPETENCJE (140px collapsed): long description 3-5 sentences, "Wiecej" toggle at 4 lines
4. KIM JEST + ANALOGIA (72px): 1 sentence who + 1 italic analogy
5. CO ROBI / CZEGO NIE ROBI (100px): twin chip lists, amber chips INLINED for anti-patterns
6. NARZEDZIA (56px): single wrapping chip row
7. POLACZENIA (80px, conditional): WEJSCIA / WYJSCIA strips, hidden if empty
8. MODEL + COST + CTX (56px): compact .ds-mdl-row 3-chip radiogroup
9. EDYTUJ PROMPT (48px): 32px pill + [dup][copy][reset] icon strip, pill opens modal
10. ENCYKLOPEDIA CTA (76px): .btn-learn.is-rich with shimmer, dynamic facts count

Note: R4's original 13 collapses to 10 once we drop CIEKAWOSTKI and OBCIAZENIE as "empty-state-hidden" helpers. OBCIAZENIE stays as integrated into the Hero load mini-bar. CIEKAWOSTKI gets promoted to the ENCYKLOPEDIA modal (not sidebar) because it rarely has impactful 1-line items.

### 3.2 CSS reuse (zero new classes needed for 90% of work)
- `.vd .vd-col .vd-col.fit .vd-col.nofit .vd-head .vd-list` (lines 1161-1174) - drop-in
- `.ds-longdesc details + summary + .ds-longdesc-body` (lines 1146-1155) - drop-in
- `.ds-mdl-row .ds-mdl-chip .m-opus/sonnet/haiku` (lines 1454-1472) - drop-in
- `.btn-learn.is-rich .bl-icon .bl-eyebrow .bl-title .bl-sub .bl-arrow` (lines 1208-1227) - drop-in
- `.ds-cmd` command pill pattern (v32.12) - reuse shape for prompt pill
- `.ds-avatar-orb.ph-*` phase glow (lines 1016-1021) - already rendered
- `.ds-card .ds .ds-l` base cards - already rendered

New CSS needed (small):
- Sticky hero: `.ds-hero-sticky { position:sticky; top:0; z-index:2; background:var(--bg-panel); }`
- Twin chip grid: `.ds-twinchips { display:grid; grid-template-columns:1fr 1fr; gap:8px; }`
- Amber anti-pattern chip: `.ds-anti-chip { border:1px solid rgba(var(--mc-opus-rgb),0.35); ... }` or reuse existing warn color
- Load mini-bar in hero: 6px tall horizontal bar under role line
- Prompt pill: reuse `.ds-cmd` styling renamed to `.ds-prompt-pill` or just `.ds-cmd.is-prompt`
- Modal for prompt editor: reuse existing modal shell + new inner layout

### 3.3 Data layer (Phase D1)
Four new constants mirroring PRESET_*_PL shape:
- `AGENT_LONG_PL` - 35 entries, HTML-formatted 3-5 sentences (~100-200 words), R2 source for 18 + AGENT_KNOWLEDGE for 17
- `AGENT_MID_PL` - 35 entries, plain Polish 1-2 sentences (KIEDY UZYC haiku-card)
- `AGENT_GREEN_PL` - 35 entries, arrays 4-6 bullets, 2-4 words each, imperative
- `AGENT_RED_PL` - 35 entries, arrays 4-5 bullets, 2-4 words each, nominal

Optional helpers:
- `getAgentLongPl(id)`, `getAgentMidPl(id)`, `getAgentGreenPl(id)`, `getAgentRedPl(id)` with EN fallback support

### 3.4 New i18n entries (Polish-keyed with EN translations)
- "KLUCZOWE KOMPETENCJE" -> "KEY COMPETENCIES"
- "KIM JEST" -> "WHO IT IS" (already present for agents, verify)
- "ANALOGIA" -> "ANALOGY"
- "Wiecej" -> "More"
- "Mniej" -> "Less"
- "Edytuj prompt" -> "Edit prompt"
- "Poznaj tego agenta" -> "Meet this agent"
- "Pelny profil, N sekcji wiedzy" -> "Full profile, N knowledge sections"
- "Nadaje sie do" / "Nie dla" - already present (preset verdict)
- "SZCZEGOLOWY OPIS" - already present
- "KIEDY UZYWAC" - already present
- "OBCIAZENIE" - already present

### 3.5 Version bumps (Phase D2 final)
- `<title>` to "v32.13"
- `eksportujKfg` `v = '32.13'`
- `buildCostJSON` `version: '32.13'`
- `localStorage` key chain: `acV32_13_custom` with migration from `acV32_12_custom` / `acV32_11` / earlier

---

## 4. Risks flagged for HITL Gate #1

1. **17 agents without notebookLM source.** Phase D1 must accept that their AGENT_LONG_PL will be noticeably shorter. User should be informed before approving variant.
2. **Prompt modal width.** 720px desktop vs fullscreen. User pick needed.
3. **Analogy guardrails.** "Literal first, metaphorical second" needs 3 good + 3 bad examples in DESIGN_SPEC.md.
4. **Dynamic facts count.** Should count be of: (a) top-level keys in AGENT_KNOWLEDGE[id] populated, (b) static 6, (c) chip-able content sections? Recommendation: dynamic, count of populated fields in {who, analogy, does, doesNot, antiPatterns, facts}.
5. **Scroll budget on 720p laptops.** Variant B = 1.2 screens. Encyclopedia CTA will be below fold by ~180px. Acceptable because CTA is the "I want more" affordance, not the primary action.
6. **backend/frontend shared source.** Phase D1 will emit near-identical entries with slant tweaks. User should know both come from one notebookLM file.

---

## 5. Phase C input ready

Consensus is clear. All 5 researchers deliver non-contradictory findings once R1/R4 conflicts are resolved (R4 wins on 3/3 IA decisions). No revise cycles needed. Phase C can start immediately with:
- MANIFEST.md (DD01-DD10 built from this synthesis)
- DESIGN_SPEC.md (CSS tokens, new classes, APCA compliance)
- LAYOUT_SPEC.md (ASCII + HTML mockup of 13-section sidebar with class names)
- HITL_GATE_1.md (single recommendation Variant B + 3 open questions for user choice)

Phase C will produce ~4 plan documents. Expected ~600-800 lines total. After Gate #1 approval, Phase D1 (content constants) starts.

## Verdict summary table

| Researcher | Coverage | Confidence | Verdict |
|------------|----------|------------|---------|
| R1 Sidebar audit | Full delta | High | PASS |
| R2 NotebookLM | 18/35 agents | High where present | PASS w/ gap note |
| R3 Archaeology | Full history | High | PASS |
| R4 Agent profile design | Full IA + 3 variants | High (B recommended) | PASS w/ section expansion |
| R5 Data audit | Full | High | PASS |

**All systems GO for Phase C.**
