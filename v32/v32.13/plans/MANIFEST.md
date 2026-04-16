# v32.13 MANIFEST - Agent Detail Sidebar Premium Polish

**Source:** v32.13/research/CRITIC.md section 3 (consensus).
**Scope:** Rewrite pokazWezel + pokazDef to mirror v32.12 preset sidebar polish.
**Hard constraints:** Polish-first, no em-dash, starfield preserved, APCA Lc>=75 body, WCAG 2.2 SC 2.5.8, localStorage migration chain intact.

---

## Design Decisions

### DD01 - Adopt Variant B Progressive Disclosure
**Source:** R4 recommendation, CRITIC conflict 1 resolution.
**Decision:** 10-section layout (R4's original 13 minus CIEKAWOSTKI and OBCIAZENIE and COST promoted to hero/encyclopedia).
**Rationale:** ~936px total (1-1.2 screens on 1080p). Keeps muscle memory with v32.12 preset. No tab cost. CTA below fold is acceptable as "more info" affordance.
**Rejected:** Variant A Information-dense (~1270px, too tall), Variant C Two-zone tabbed (~788px but tab friction).

### DD02 - Sticky hero (88px)
**Source:** R4 addition not in R1.
**Decision:** `.ds-hero-sticky { position:sticky; top:0; z-index:2; background:var(--bg-panel); }`.
**Content:** orb 40px + name + role + phase chip + model micro-chip + load mini-bar (6px horizontal).
**Rationale:** Name + model stay visible while user scrolls encyclopedia content. No JS.
**Reuse:** `.ds-avatar-orb.ph-*` phase glow already rendered.

### DD03 - Verdict panel drop-in (reuse .vd*)
**Source:** R1 CSS inventory, R4 recommendation.
**Decision:** Place `.vd .vd-col.fit / .vd-col.nofit` directly after hero. Dual-column green/red KIEDY UZYC vs KIEDY NIE UZYC.
**CSS reuse:** lines 1161-1174 - already generic, drop-in ready, zero changes.
**Data source:** new `AGENT_GREEN_PL[id]` and `AGENT_RED_PL[id]` (Phase D1).
**Height budget:** ~220px.

### DD04 - Kluczowe kompetencje (collapsible long description)
**Source:** R1 delta item, R5 templates.
**Decision:** Reuse `.ds-longdesc details + summary + .ds-longdesc-body` (lines 1146-1155). Collapsed 4 lines (~140px), "Wiecej" summary toggles to full text.
**Data source:** new `AGENT_LONG_PL[id]` (Phase D1) - HTML-formatted 3-5 sentences, 150-200 words.
**Rationale:** R1 flagged this as CRITICAL gap (agents have no long desc today).

### DD05 - Inline amber anti-patterns in CZEGO NIE ROBI column
**Source:** R4 wins over R1 (CRITIC conflict 3).
**Decision:** Render amber chips INLINE at bottom of CZEGO NIE ROBI column, not as separate card.
**CSS:** new class `.ds-anti-chip { border:1px solid rgba(var(--ph-qa-rgb),0.35); background:rgba(var(--ph-qa-rgb),0.08); color:var(--ph-qa-ink); }` or reuse existing warn color.
**Rationale:** More scan-efficient, reuses existing 2-column grid, no scroll cost.
**Rejected:** R1 separate ANTI-PATTERNS card (extra 80px scroll).

### DD06 - Prompt pill + modal (not in-sidebar textarea)
**Source:** R4 wins over R1 (CRITIC conflict 2).
**Decision:** Replace current ~140px `<textarea>` with 32px pill `.ds-cmd.is-prompt` that opens a modal.
**Modal:** reuses existing modal shell (like moCost). Inner textarea fullscreen on mobile, 720px centered on desktop.
**Icon strip:** [dup][copy][reset] 3-icon row next to pill.
**Rationale:** Textarea blows scroll budget by ~15%. Pill matches v32.12 CLAUDE CODE COMMAND pattern. Modal gives more room to read/edit.
**Open question for Gate #1:** desktop width 720px vs fullscreen.

### DD07 - Compact 3-chip model row
**Source:** R1 CSS inventory, R3 anti-pattern (v26 vertical .ds-mdl-big was tall).
**Decision:** Delete current `.ds-mdl-big` vertical stack. Reuse `.ds-mdl-row .ds-mdl-chip .m-opus/sonnet/haiku` (lines 1454-1472).
**Rationale:** 56px vs ~180px, saves ~124px, matches v32.12 preset sidebar.
**CSS reuse:** zero changes.

### DD08 - Rich Encyclopedia CTA with dynamic facts counter
**Source:** R4 addition, reuse v32.12 work.
**Decision:** Reuse `.btn-learn.is-rich .bl-icon .bl-eyebrow .bl-title .bl-sub .bl-arrow` (lines 1208-1227). Replace current flat `.btn-learn`.
**Dynamic facts count:** getter function `countAgentFacts(id)` counts populated fields of `AGENT_KNOWLEDGE[id]` among {who, analogy, does, doesNot, antiPatterns, facts}.
**Sub-label:** "Pelny profil, N sekcji wiedzy" (PL) / "Full profile, N knowledge sections" (EN).
**Height:** 76px.

### DD09 - Four new data constants (hybrid R2 + AGENT_KNOWLEDGE)
**Source:** R5 audit, CRITIC conflict 4 resolution.
**Decision:** Create AGENT_LONG_PL (35 HTML), AGENT_MID_PL (35 plain 1-2 sentences), AGENT_GREEN_PL (35 arrays 4-6 bullets), AGENT_RED_PL (35 arrays 4-5 bullets).
**Data strategy:**
- 18 agents with R2 source: use R2 rich content (~200 words LONG, curated GREEN/RED from "Kiedy" sections).
- 17 agents without R2: fallback to AGENT_KNOWLEDGE (~150 words LONG, derived GREEN from `does`, RED from `doesNot + antiPatterns`).
- Mark interpreted entries with `/* R2-derived */` or `/* AGENT_KNOWLEDGE-derived */` code comments.
- backend and frontend share notebookLM source with slant-only differentiation (backend=API/DB/infra, frontend=UI/state).
**Mirror templates:** PRESET_LONG_PL 3967-4013, PRESET_MID_PL 4015-4058, PRESET_GREEN_PL 4061-4103, PRESET_RED_PL 4105-4147.

### DD10 - localStorage migration chain + version bumps
**Source:** Ship checklist.
**Decision:** `acV32_13_custom` reads from `acV32_12_custom` then `acV32_11/10/.../v32_custom` on first load.
**Version bumps:** `<title>` "v32.13", `eksportujKfg` `v='32.13'`, `buildCostJSON` `version:'32.13'`.
**No data migration needed** for new AGENT_*_PL constants (they are hardcoded, not persisted).

---

## Reuse summary

| Asset | Location | New classes? |
|-------|----------|--------------|
| `.vd*` verdict panel | 1161-1174 | No |
| `.ds-longdesc` | 1146-1155 | No |
| `.ds-mdl-row` | 1454-1472 | No |
| `.btn-learn.is-rich` | 1208-1227 | No |
| `.ds-avatar-orb.ph-*` | 1016-1021 | No |
| `.ds-cmd` pill | v32.12 | rename to .ds-cmd.is-prompt |
| Sticky hero | new | `.ds-hero-sticky` (1 rule) |
| Twin chip grid | new | `.ds-twinchips` (1 rule) |
| Amber anti chip | new | `.ds-anti-chip` (1 rule) |
| Load mini-bar | new | `.ds-load-mini` (2 rules) |
| Prompt modal shell | reuse moCost | no new shell, just inner layout |

**Zero new classes for 90% of work.** New CSS surface: ~5-6 small rules totaling ~25 lines.

---

## Out of scope for v32.13

- CIEKAWOSTKI dedicated section (promoted to encyclopedia modal).
- OBCIAZENIE standalone section (integrated into hero load mini-bar).
- KOSZT standalone section (shown via compact model row + hero chip).
- Re-researching notebookLM for the 17 missing agents (deferred to future version).
- New Five Minds expert profiles in notebookLM (scope creep).

---

## Phase plan

- Phase C (this): write MANIFEST + DESIGN_SPEC + LAYOUT_SPEC + HITL_GATE_1. Stop for Gate #1.
- Phase D1: generate 4 AGENT_*_PL constants (content generation).
- Phase D2: patch pokazWezel + pokazDef + prompt modal + version bumps.
- Phase E: QA (JS parse, grep audit, i18n, APCA spot check) + ship.
