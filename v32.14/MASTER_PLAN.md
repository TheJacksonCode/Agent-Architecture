# v32.14 MASTER PLAN - Agent Encyclopedia Premium (4 Pilot Agents)

## Mission
Redesign the Agent Encyclopedia (bento view in `rysujBentoAgenta`) into a top-tier learning experience for AI beginners, showcased on 4 pilot agents: **res_reddit, res_x, res_github, res_forums**. Embed the notebookLM infographic (with click-to-zoom lightbox + in-modal pan/zoom) and the PDF presentation. Skip video (too heavy). Future versions will scale the pattern to remaining 31 agents.

## User directives (verbatim translation)
- Focus only on what displays when a user opens the "Encyklopedia tego agenta" (bento)
- Source content: notebookLM/ folder (agents 0.7, 0.8, 0.9, 1.0 are the ones that are properly structured - earlier agents 0.1-0.6 have incomplete material)
- Bento tiles must NOT be too wide - adapt to viewport (16:9 desktop vs other popular ratios)
- Must feel premium, animated, position-responsive, beautiful
- Infographic is MUST HAVE with zoom capability (click small -> expand -> zoom in further inside modal)
- PDF presentation is NICE TO HAVE (user said "may be" - justify based on research)
- Video is OUT OF SCOPE (too heavy for 35+ agents at scale)
- Emphasis on LEARNING for beginners entering the AI world
- Only 4 agents this round - later versions scale the pattern

## Scope
- **IN:** `rysujBentoAgenta(aid)` at line 7536, `.bento-*` CSS at lines 1298-1406, `.learn-overlay` container, grid breakpoints, 4 new data constants for pilot agents, new lightbox/zoom modal, new resources card (infographic thumb + PDF link + mindmap thumb), viewport-aware grid template selection.
- **OUT:** `rysujBentoPreset` (presets untouched this version), other 31 agents, video embedding, `pokazWezel` sidebar (already done in v32.13).

## Phases
- **A** - Setup + discovery (DONE)
- **B** - 5 parallel research agents
- **B2** - CRITIC synthesis
- **C** - MANIFEST + DESIGN_SPEC + LAYOUT_SPEC + HITL_GATE_1 (STOP)
- **D** - Build (content + CSS + renderer + zoom modal + resources + i18n + version bumps + mirror)
- **E** - QA + ship

## Hard constraints
- Pure vanilla HTML/CSS/JS, single file, Polish-first
- Zero em-dashes, zero en-dashes, zero Polish diacritics
- No external libs (no CDN, no import) - zoom/pan implemented with native Pointer Events + CSS transforms
- Infographics embedded as base64 inside AGENT_MEDIA constant (offline-first philosophy)
- Respect prefers-reduced-motion
- APCA-compliant text contrast (Lc >= 75 on body)
- WCAG 2.2 keyboard nav + focus management in new modal
- Viewport-aware grid: different layouts for 16:9 desktop (1920+), 1440 desktop, 1280 laptop, tablet, mobile
- 4 target agents only: res_reddit, res_x, res_github, res_forums
- Backward compat: localStorage `acV32_14_custom` with migration chain from v32_13 back to v32_custom

## File locations
- Main edit: `v32.14/AGENT_TEAMS_CONFIGURATOR_v32_14.html` (baseline copied from v32.13, 7820 lines)
- Research: `v32.14/research/R{1..5}_*.md` + `CRITIC.md`
- Plans: `v32.14/plans/MANIFEST.md`, `DESIGN_SPEC.md`, `LAYOUT_SPEC.md`, `HITL_GATE_1.md`
- Mirror: `C:/Projekty Claude Code/Agent_Architecture/index.html`

## Success criteria
- All 4 target agents open premium bento with embedded infographic + zoom modal working
- Bento grid adapts correctly at 1920/1440/1280/1024/768/480 breakpoints
- Infographic zoom: click small thumb -> full-screen lightbox -> wheel/pinch/buttons to zoom 1x-4x -> pan while zoomed -> Esc closes
- Other 31 agents still open their existing (legacy) bento without errors (graceful fallback based on AGENT_EDU_PL presence check)
- 0 JS parse errors, 0 diacritics, 0 em-dashes
