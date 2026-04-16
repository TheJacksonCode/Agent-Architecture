# HITL_GATE_1.md - v32.14 User Approval Gate (Before Build)

Author: Main thread (Phase C)
Date: 2026-04-10
Status: **APPROVED 2026-04-10** - user picks recorded below, Phase D building

This gate blocks Phase D (build). Below are all non-obvious decisions and
the 4 open questions from the CRITIC synthesis. User picks an option for
each; main thread writes the result back here and proceeds.

---

## Decisions locked (FYI, no action needed)

All 20 DDs in `MANIFEST.md` are drafted and internally consistent. The
user can veto any of them; default is accept-all.

Summary of the biggest moves:

1. **Scope**: only 4 pilot agents (res_reddit, res_x, res_github, res_forums).
   Other 31 agents keep the current v32.13 renderer via feature gate.

2. **Grid**: switch from viewport media queries to container queries on
   `.bento-scroll`. Breakpoints at 520/860/1200/1800/2200. Modal grid
   capped at 1680px width (widens to 2100/2400 at QHD/ultrawide).

3. **Section IA**: 10 sections, Polish-first, progressive-disclosed:
   HERO, DLACZEGO JA, JAK PRACUJE, META, CO UMIEM, CZEGO NIE, PRZYKLAD
   Z ZYCIA, KIEDY ZAWODZE, CIEKAWOSTKI, ZANURKUJ (collapsed `<details>`).

4. **Zoom lightbox**: new `#moZoom` modal with vanilla pan/zoom, opens
   from the infographic thumbnail inside DEEP DIVE. Wheel, pinch, buttons,
   keyboard, focus trap, Escape close.

5. **PDF presentation**: button inside DEEP DIVE opens the PDF in a new
   window. No embedding.

6. **Infographics**: embedded inline as base64 (offline-first). HTML grows
   from 836KB to ~4.3MB.

7. **New constants**: `AGENT_EDU_PL` (18 fields x 4 agents, diacritic-clean)
   and `AGENT_MEDIA` (inline infographic + relative PDF path).

---

## Q1 - Infographic file size strategy

The 4 notebookLM infographics are ~619-691KB each as JPEG. Embedded
inline as base64 they become ~3.5MB of string in the HTML file. Total
HTML grows from 836KB to ~4.3MB.

**Options:**

- **A)** Accept 4.3MB. Single-file, offline-first, zero optimization work.
  User downloads 4.3MB once, browser caches after. (DEFAULT RECOMMENDED)
- **B)** Convert to WebP 85% quality first. Should halve the size to
  ~1.8MB base64, final HTML ~2.6MB. Small quality loss barely visible on
  detailed infographics. Adds one command-line step in Phase D.
- **C)** Skip embedding, load via relative paths. Breaks file:// offline
  use. Only works when served via HTTP.

**Recommendation**: A.

**User pick**: **A** (inline base64, accept 4.3MB HTML size)

---

## Q2 - Reading progress bar at top of modal

A 3px colored gradient bar at the top of the encyclopedia that fills as
the user scrolls. Reduces "infinite scroll" anxiety for long pages.
Uses native CSS scroll-driven animations (Chrome 115+) with JS fallback
for older browsers.

**Options:**

- **A)** Include it (DEFAULT RECOMMENDED by R3, minor polish, ~25 lines CSS)
- **B)** Skip it (reduces code footprint, no polish loss on shorter pages)

**Recommendation**: A. Easy to remove if user dislikes.

**User pick**: **A** (include reading progress bar)

---

## Q3 - Glossary tooltips on AI jargon

Each occurrence of AI jargon (subagent, orchestrator, token, Opus, Sonnet,
Haiku, HITL, prompt, kontekst, RAG, embedding, few-shot, chain-of-thought,
scratchpad, tool use, MCP) wraps in a `<span class="enc-term">` with an
existing `dodajTooltip()` call showing a 1-2 sentence definition on hover
and focus.

**Options:**

- **A)** Top 15 terms (DEFAULT RECOMMENDED). Fixed list, maintainable.
  Each term's first occurrence per agent page gets the tooltip.
- **B)** All AI jargon terms, every occurrence. More educational but
  visually noisy and hard to maintain (regex replacements risk false
  positives).
- **C)** Skip tooltips entirely. Definitions stay only in the
  `keyConcepts` array inside META / example sections.

**Recommendation**: A.

**User pick**: **A** (top 15 terms, first occurrence per agent)

---

## Q4 - DEEP DIVE default state

The `<details>` section 10 "Zanurkuj glebiej" contains infographic +
PDF button + full system prompt + hierarchy diagram + model comparison
table.

**Options:**

- **A)** Collapsed by default (DEFAULT RECOMMENDED). Beginners see a
  clean 9-section page; pro users one-click to expand. Nielsen/Norman
  progressive disclosure doctrine.
- **B)** Expanded by default. Infographic is visible immediately, prompt
  visible without clicking. More info density but also more visual noise.

**Recommendation**: A.

**User pick**: **A** (collapsed by default)

---

## Q5 - HERO small infographic preview

**Bonus question** not in CRITIC but worth asking:

The HERO tile (section 1) is the top full-width card with icon + name +
mission + quote. We could optionally add a small 120x80 infographic
thumbnail in the top-right corner of HERO as a preview, clicking of which
opens the zoom modal (same as DEEP DIVE thumbnail).

**Options:**

- **A)** No preview in HERO, keep clean. Only one infographic thumbnail
  in DEEP DIVE. (DEFAULT RECOMMENDED)
- **B)** Small preview in HERO + large thumbnail in DEEP DIVE. Double
  exposure, visual hook for beginners who bounce before reaching section
  10.

**Recommendation**: A for cleanliness. B is also reasonable.

**User pick**: **B** (mini 120x80 preview in HERO top-right + large thumbnail in DEEP DIVE)

Impact on MANIFEST: DD07 (HERO section) gets a third sub-element - small
infographic button (same `otworzZoom` handler as DEEP DIVE thumb).
LAYOUT_SPEC section 4.1 HERO recipe adds `.enc-hero-preview` slot.

---

## Decisions flow after user picks

Main thread will:
1. Record user picks inline in this file (next to "User pick" lines)
2. Update `MANIFEST.md` DDs affected by the picks
3. Mark Phase C tasks complete, start Phase D implementation
4. No further questions until HITL Gate #2 (post-build polish pass)

---

## Ready-to-build artifacts

All the following are locked and ready for Phase D:

- `research/R1_code_audit.md` - insertion points + risks
- `research/R2_md_extraction.md` - content for 4 agents (needs diacritic
  cleanup during injection)
- `research/R3_encyclopedia_layouts.md` - IA + micro-interactions + drop-in CSS
- `research/R4_zoom_lightbox.md` - drop-in HTML + CSS + JS for zoom modal
- `research/R5_viewport_bento.md` - container query grid recipe
- `research/CRITIC.md` - synthesis + decisions locked
- `plans/MANIFEST.md` - 20 design decisions with rationale
- `plans/DESIGN_SPEC.md` - all CSS tokens, recipes, utilities
- `plans/LAYOUT_SPEC.md` - DOM tree, class emissions, render pseudocode

---

## Phase D order of operations (after approval)

1. AGENT_EDU_PL constant (diacritic-cleaned, 400 lines)
2. AGENT_MEDIA constant (base64 infographics, ~3.5MB embedded)
3. CSS block: container queries + all .enc-* recipes (~595 lines)
4. HTML shell: #moZoom modal (16 lines)
5. JS: zoom modal functions (230 lines)
6. JS: rysujBentoAgentaV14 + helpers (290 lines)
7. JS: rename legacy + feature gate wrapper (3 lines)
8. Reveal observer + progress bar + glossary wiring (50 lines)
9. Version bumps (title, eksportujKfg, buildCostJSON, localStorage key)
10. Mirror to `index.html`

---

## STOP HERE

Do not proceed to Phase D until the user responds with picks for Q1-Q5
(or confirms "all defaults").

End of HITL_GATE_1.
