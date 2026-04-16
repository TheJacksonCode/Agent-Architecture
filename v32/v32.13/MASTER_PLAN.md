# v32.13 MASTER PLAN

**Theme:** Agent Detail Sidebar Premium Polish (mirror v32.12 preset sidebar treatment)

**Constraints (hard, from user):**
- Apply SAME design language as v32.12 preset sidebar (rich header card, verdict panel, szczegolowy opis card, rich encyclopedia CTA, compact model row)
- Source detailed agent info from `C:/Projekty Claude Code/Agent_Architecture/notebookLM/` (18 agent MD files: 0.1 Orkiestrator .. 1.7 Manager_QA)
- Reuse research from prior v32.* versions
- Use MAXIMUM parallel research agents - "nie oszczedzaj"
- Work broken into small sections; ASK USER every 1-2 sections whether to compact (target <60-70% context)
- Stay in v32.13 (new version, not patch)
- No em-dash/en-dash (global rule), plain ASCII hyphens only
- Polish-first bilingual (PL + I18N_EN overlay)
- Preserve starfield, Material Expressive theme from v32.8
- Preserve all other sections (preset sidebar, canvas, Live Monitor, cost center, etc.)

**Workflow (Phase A .. E):**

### Phase A - Setup + discovery [IN PROGRESS]
- Create v32.13/{research,plans} [DONE]
- Copy v32.12 HTML -> v32.13/AGENT_TEAMS_CONFIGURATOR_v32_13.html (7503 baseline) [DONE]
- Scan notebookLM folder structure [DONE: 18 agent folders, each has `*_agent.md` 700-1000 lines + video/infographic/mindmap assets]
- Audit current pokazWezel (lines 5791-5834) [DONE]
- Reuse grep in v32.*/research/ [DONE: 13 files mention "agent sidebar" / "pokazWezel" but none are deep-dives on agent detail UX - greenfield]
- Write MASTER_PLAN + PROGRESS

### Phase B - Parallel research (5 agents in parallel, 2 in background)
- R1 (Explore, thorough): Current v32.12 agent sidebar audit + preset sidebar comparison. What sections exist, what CSS classes, what renders, where in file. Delta matrix.
- R2 (general-purpose, background): NotebookLM extraction. Read all 18 agent MD files + extract structured data per agent (role, analogy, who, does, does_not, anti_patterns, facts, when_to_use, when_not_to_use, verdict_green, verdict_red, long_description). Output JS-ready object literals.
- R3 (Explore, thorough): Previous versions archaeology. v15/v16/v21/v27/v28 had encyclopedia/knowledge work. What sections/CSS/patterns were introduced, which survived, which were deprecated.
- R4 (general-purpose, background): Design patterns for "profile/agent detail" sidebars. NotebookLM, Linear, Notion, Wikipedia infobox, Steam profile, GitHub profile cards. Adapt to match v32.12 preset sidebar language (verdict panel, rich header, encyclopedia CTA).
- R5 (Explore): AGENT_KNOWLEDGE + AGENT_TOKENS + existing Polish constants completeness audit. Which agents already have full knowledge vs sparse? Check i18n coverage.

### Phase B2 - CRITIC synthesis
- CRITIC.md: PASS/REVISE per researcher, conflict matrix, consensus recommendations
- **STOP & ASK USER: compact or continue to Phase C?**

### Phase C - Design
- MANIFEST.md: DD01..DDN design decisions with rationale
- DESIGN_SPEC.md: tokens, recipes, utilities (drop-in ready)
- LAYOUT_SPEC.md: section order, ASCII mockup, class names
- HITL_GATE_1.md: options for user to choose (section order variants, visual density variants)
- **STOP & ASK USER: compact or continue to Phase D?**

### Phase D1 - Data layer
- Add AGENT_LONG_PL (detailed descriptions per agent)
- Add AGENT_GREEN_PL (verdict green bullets: "kiedy uzyc")
- Add AGENT_RED_PL (verdict red bullets: "kiedy nie uzyc")
- Add AGENT_MID_PL if needed (short 2-3 sentence "kiedy uzywac")
- Enrich AGENT_KNOWLEDGE where sparse from notebookLM data

### Phase D2 - UI layer
- CSS additions (if needed): verdict panel scoped to agent sidebar, long-desc card, reuse .ds-comp / .ds-cmd / .ds-mdl-row / .ds-mdl-chip / .btn-learn.is-rich from v32.12
- Patch pokazWezel with new section order + rich markup
- Patch pokazDef (palette detail) to match where applicable
- i18n: new EN entries
- Version bumps: title v32.13, eksportujKfg, buildCostJSON, localStorage acV32_13_custom

### Phase E - QA + ship
- node JS parse check (1/1 blocks, 0 errors)
- grep audit for preserved sections (preset sidebar, cost HUD, Live Monitor, SKLAD micro-bar, verdict panel, etc.)
- i18n audit
- Update memory project_v32_13_status.md

**Compaction recovery:** read this file + PROGRESS.md.
