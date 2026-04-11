# R3: Agent Detail Sidebar - Versions Archaeology

## 1. Introduction

Trajectory scanned: v28 (research-backed prompts / bento intro) -> v31 (audit + verdict modal HITL) -> v32.11 (verdict panel intro for presets) -> v32.12 (preset header composition + compact controls). Across all 4 years no version shipped a standalone "agent encyclopedia panel" - encyclopedia lives as (a) bento modal `rysujBentoAgenta` opened via learn button, and (b) short knowledge preview in sidebar. The sidebar itself never got the verdict + long-description treatment that v32.11/v32.12 gave presets.

**Consistent survivors since v21/v28:** AGENT_KNOWLEDGE structure (who/analogy/does/doesNot/antiPatterns/facts), getAgentKnowledge() accessor, .side-r 360px glassmorphism container, bento modal rendering system.

## 2. Per-version notes

### v28 | Research-Backed Prompts (2024 H2)
- First production introduction of AGENT_KNOWLEDGE (28 agents) + PRESET_KNOWLEDGE (29 presets)
- bento-* CSS classes introduced: bento-banner, bento-grid, bento-card, bento-metric
- rysujBentoAgenta(aid) renders full agent bento in overlay, read from AGENT_KNOWLEDGE
- Sidebar NARZEDZIA/MODEL/KOSZT/WYJSCIA/WEJSCIA structure stable
- Agent sidebar DID NOT yet render knowledge inline - only via bento overlay

### v31 | Audit Edition
- HITL overlay introduced (hitl-overlay, hitl-card, hitl-list.pros/cons) for decision gates
- First appearance of "pros/cons as sidebar list" pattern (but inside modal, not sidebar proper)
- XSS hardening (escHtml sweep), WCAG 2.2 upgrades
- Full PL/EN bilingual

### v32.11 | Verdict Panel - Combined Pros/Cons
- PRESET_GREEN_PL + PRESET_RED_PL arrays ADDED (lines ~4060-4147 in v32.13)
- .vd / .vd-col.fit / .vd-col.nofit / .vd-head / .vd-list CSS introduced (lines 1161-1174)
- pokazInfoPr patched to render dual-column verdict card replacing 5 stacked sections
- Plain Polish tone (shorter, more directive than prior AGENT_KNOWLEDGE prose)
- R1_ui_patterns.md researched it; winner pattern = Salesforce Trailhead / Stripe verdict cards

### v32.12 | Header Composition + Compact Controls
- .ds-comp .ds-comp-bar .ds-comp-chips stacked micro bar + count chips for preset SKLAD in header
- .ds-cmd 32px command pill with clipboard copy flash
- .ds-mdl-row .ds-mdl-chip compact horizontal model radiogroup (REPLACED .ds-mdl-big in preset sidebar, KEPT in agent sidebar)
- .btn-learn.is-rich split-card CTA (eyebrow/title/subtitle/arrow + shimmer + breath)
- Patch R4: encyclopedia CTA split-card
- PRESET_LONG_PL + PRESET_MID_PL + PRESET_GREEN_PL + PRESET_RED_PL all populated for ~42 presets

## 3. Data constants deep dive

### AGENT_KNOWLEDGE
- Shape: `{[id]: {who, analogy, does[], doesNot[], antiPatterns[], facts[]}}`
- Location v32.13: lines 2940-3661 (~720 lines)
- Coverage: 35 agents (28 base + 7 from v32.6)
- Completeness: 100% per R5 audit (5 does, 3-5 doesNot, 2 antiPatterns, 3 facts typical)

### PRESET_KNOWLEDGE
- Shape: `{[id]: {who, analogy, whenToUse[], whenNotToUse[], keyFeatures[]}}`
- Coverage: ~42 presets

### PRESET_LONG_PL / MID_PL / GREEN_PL / RED_PL
- All 4 populated for ~42 presets
- MID_PL: 1-2 sentence Polish haiku-box prose
- GREEN_PL: 4-5 bullet array (VERDICT green list)
- RED_PL: 3-5 bullet array (VERDICT red list)
- LONG_PL: HTML-formatted 2-4 paragraph (`<strong>` + `<br><br>`)
- NO AGENT equivalents yet

### AGENT_TOKENS
- Shape: `{[id]: {i:inputTok, o:outputTok}}`
- Powers calcAgentCost + calcAgentCtx
- Stable since v32.6

## 4. Reusable component inventory

### CSS (drop-in ready for agent sidebar):
- .side-r 360px glass (line 1121) - already shared
- .ds .ds-l .ds-card (lines 1127-1134) - already shared
- .ds-avatar .ds-avatar-orb .ds-avatar-orb.ph-* (lines 1016-1021, 1181-1185) - already shared
- .vd .vd-col.fit .vd-col.nofit .vd-head .vd-list (lines 1161-1174) - **GENERIC, ready for agent reuse**
- .ds-longdesc details + .ds-longdesc-body (lines 1146-1155) - **ready for agent reuse**
- .ds-mdl-row .ds-mdl-chip .m-opus/sonnet/haiku (lines 1454-1472) - **ready to replace agent stacked buttons**
- .btn-learn.is-rich .bl-icon .bl-eyebrow .bl-title .bl-sub .bl-arrow (lines 1208-1227) - **ready to replace agent flat button**
- .ds-tools-list .ds-tool-chip (1195-1196)
- .ds-ctx-box.ctx-* (lines 489-501) - agent only, keep
- .ds-conn-section .ds-conn-row .ds-cn-d (1192-1201) - agent only, keep
- .ds-prompt .ds-ta (1188-1190) - agent only, keep

### JS functions:
- getAgentKnowledge(id) i18n-aware accessor - reuse
- getAgentName(id), getAgentDesc(id), getAgentPrompt(id), getCatLabel(pl)
- rysujBentoAgenta, rysujBentoPreset, otworzEncykl
- calcAgentCost, calcAgentCtx, calcAgentCtx (ctx box data)
- pokazInfoPr as template for how to structurally compose agent sidebar

### Data:
- AGENT_KNOWLEDGE, PRESET_KNOWLEDGE, PRESET_LONG_PL/MID_PL/GREEN_PL/RED_PL, AGENT_TOKENS - unchanged

## 5. Anti-patterns tried and removed

- **A1: Knowledge in hover tooltip** - removed because content too rich for hover, replaced by sidebar + overlay modal
- **A2: Multi-tab encyclopedia** - removed in favor of single linear scroll
- **A3: Stacked bar cost chart** - removed in v32.12 in favor of inline SKLAD chips
- **A4: Vertical 3-stacked model buttons (.ds-mdl-big)** - kept in agent sidebar but replaced in preset. v32.13 should finish the migration by using .ds-mdl-row in agent sidebar too
- **A5: Neutral "Encyklopedia" flat button** - replaced in preset via R4 research with split-card .is-rich. Same treatment needed for agent sidebar in v32.13

## 6. Gap analysis (what no prior version has for agents)

- No agent verdict panel (dual column KIEDY UZYC / KIEDY NIE UZYC)
- No long-description card with origin/idea/deliverables/ideal for/not for structure
- No mid-description (1-2 sentence haiku box)
- No rich encyclopedia CTA for agent sidebar
- Knowledge preview is truncated to 3 bullets in sidebar (slice(0,3))
- ANTI-PATTERNS and CIEKAWOSTKI sections never rendered in sidebar (only in bento modal)
- Prompt editor takes significant vertical real estate with no collapse option

## 7. Recommendations for v32.13

### Drop-in (0 mods):
1. Reuse `.vd .vd-col .vd-head .vd-list` CSS for agent verdict panel (already generic, green/red colors already haiku/qa)
2. Reuse `.ds-longdesc details` CSS for agent long description
3. Reuse `.ds-mdl-row .ds-mdl-chip` CSS to replace agent .ds-mdl-big stack
4. Reuse `.btn-learn.is-rich .bl-*` CSS to replace agent flat button
5. Reuse getAgentKnowledge() accessor for enriched knowledge rendering

### Create new:
6. AGENT_LONG_PL, AGENT_MID_PL, AGENT_GREEN_PL, AGENT_RED_PL constants (~35 entries each) mirroring PRESET_*_PL shape
7. Patch pokazWezel with new section order + rich markup
8. Patch pokazDef (palette variant) for parallel experience

### Content source:
- AGENT_KNOWLEDGE (already in file) for who/does/doesNot/antiPatterns/facts
- notebookLM MD files for long-form prose, analogies, facts enrichment (18 agent files)

## Summary

v32.13 is a completion task: the sidebar polish that presets got in v32.11+v32.12 needs to be mirrored to agents. All CSS building blocks already exist and are generic enough to reuse. Only new code needed: 4 AGENT_*_PL data constants, enhanced pokazWezel markup, minor palette-variant parallel.
