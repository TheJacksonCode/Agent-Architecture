# CRITIC.md - v32.14 Research Synthesis

Author: Main thread (Phase B2)
Date: 2026-04-10
Role: Validate R1..R5, surface conflicts, issue PASS/REVISE verdicts, and
prescribe the canonical decisions the Phase C planners must follow.

Zero diacritics, zero em-dashes, Polish-first for user-facing strings.

---

## 1. Per-report verdict

| ID | Topic                          | Verdict  | Confidence | Notes                                        |
|----|--------------------------------|----------|------------|----------------------------------------------|
| R1 | Code audit                     | PASS     | HIGH       | Clean inventory, risks explicit              |
| R2 | MD content extraction          | PASS*    | MED-HIGH   | *with Phase D diacritic cleanup pass         |
| R3 | Encyclopedia layout patterns   | PASS     | HIGH       | IA + micro-interactions adopted wholesale    |
| R4 | Zoom lightbox                  | PASS     | HIGH       | Drop-in ready, no rework needed              |
| R5 | Viewport-aware bento           | PASS     | HIGH       | Container query approach wins cleanly       |

All 5 reports are accepted. Minor adjustments documented below.

---

## 2. Conflict resolution matrix

### CFL-01 - Grid mechanism: 12-col media queries (R3) vs 4/5/6-col container queries (R5)

R3 proposes a 12-column base grid with semantic spans (`is-small`, `is-half`,
`is-wide`, `is-feature`) switched by `@media (min-width: X)` queries.

R5 proposes keeping the current 4/5/6-col grids with the existing
`.bento-1x1/2x1/2x2/4x1` spans, but driven by `@container bento (min-width: X)`
queries on `.bento-scroll`.

**Resolution: R5 wins on mechanism.**

Why:
1. The `.learn-overlay` modal is `calc(100% - 260px)` wide due to the 260px
   left sidebar. Viewport media queries give wrong answers for grid width.
   Only container queries on `.bento-scroll` reflect the real container size.
2. Keeping `.bento-1x1/2x1/2x2/4x1` class names = zero JS string changes in
   `rysujBentoAgenta`. Renaming is a gratuitous breaking change.
3. 12 columns is overkill for 11-13 tiles. 4/5/6 cols with explicit spans
   reads clearer in devtools.
4. R5's mobile-first cascade is additive and compositionally cleaner than
   R3's desktop-first max-width stack.

**BUT we borrow 2 things from R3:**
- R3's `min(100%, 1680px)` modal cap via `.enc-overlay-inner` wrapper stays.
  This caps the whole modal on >1680px screens BEFORE R5's container queries
  fire, and is the single most impactful fix for "too wide on big screens".
  R5's 2400px ultrawide cap applies only at the 2200+ container branch.
- R3's 12-col semantic intent maps onto R5's existing classes:
  - `is-feature` = `bento-4x1` + `grid-row: span 2` (hero)
  - `is-wide`    = `bento-4x1` (full strip)
  - `is-half`    = `bento-2x1`
  - `is-third`   = `bento-1x1` on 3-col or `span 2` on 6-col

### CFL-02 - Modal max-width: R3 says 1680, R5 says 2100/2400 at ultrawide

R3 caps the whole modal inner container at 1680px, then 1920px >2000vw.
R5 caps the grid track at 2100 at 5-col (QHD) and 2400 at 6-col (ultrawide).

**Resolution: stack both.**

```css
.learn-overlay .bento-scroll {
  container-type: inline-size;
  container-name: bento;
}
.bento-grid {
  width: min(100%, 1680px);       /* R3 master cap */
  margin-inline: auto;
}
@container bento (min-width: 1800px){
  .bento-grid { max-width: 2100px; }  /* R5 QHD override */
}
@container bento (min-width: 2200px){
  .bento-grid { max-width: 2400px; }  /* R5 ultrawide override */
}
```

Net effect: under 1680 container there is no cap, grid fills naturally. Above
1680 but below 1800 the grid is capped at 1680 (R3 rule). At 1800+ the cap
widens to 2100 (5-col QHD). At 2200+ the cap widens to 2400 (6-col ultrawide).
This is exactly what the user asked for ("nie za szerokie na 16:9 desktop").

### CFL-03 - Section IA: keep v32.13 seven rows vs R3 ten-section proposal

R3 proposes 10 sections: HERO, WHY CARE, HOW I WORK, META, WHAT I DO, WHAT I
DO NOT DO, REAL EXAMPLE, ANTI-PATTERNS, FUN FACTS, DEEP DIVE (collapsed).

Current v32.13 has 7 rows: banner, kim jest, 4 metrics, do/dont, anti/facts,
hierarchy, model table, prompt.

**Resolution: adopt R3's 10-section IA in full.**

Why:
1. R2 content extraction delivered exactly the fields each new section needs:
   - missionShort -> WHY CARE
   - howItWorks   -> HOW I WORK
   - stats + keyConcepts -> META
   - does / doesNotDo -> WHAT I DO / WHAT I DO NOT DO
   - a picked example from howItWorks or bestFor -> REAL EXAMPLE
   - antiPatterns -> ANTI-PATTERNS
   - learningQuote + facts -> FUN FACTS
   - prompt + hierarchy + infographic + PDF -> DEEP DIVE (collapsed)
2. The 3 new sections (WHY CARE, HOW I WORK, REAL EXAMPLE) are beginner hooks
   and they map onto R2 fields we already extracted. Free content.
3. Demoting prompt + model table + hierarchy behind a collapsed `<details>`
   respects Nielsen/Norman progressive disclosure and reduces visual clutter
   for beginners. Pro users still get everything one click away.
4. Section order is literally the Duolingo/Brilliant/MDN doctrine.

### CFL-04 - Zoom lightbox keyboard event conflict

R4's `mzKey` handler registers on `document` with capture phase and calls
`stopPropagation` on Escape. The existing `learn-overlay` Escape handler is on
the same document. Risk: Escape on the zoom modal triggers both handlers if
capture + stopPropagation ordering is wrong.

**Resolution: documented in R4 and verified. No fix needed.**

R4 registers `addEventListener('keydown', mzKey, true)` (capture phase).
Capture phase fires BEFORE bubble phase, and `stopPropagation()` inside
`mzKey` stops the event from reaching the later-added learn-overlay handler.
Also R4 removes its listener in `zamknijZoom`. Clean.

One extra guard we add in Phase D: the existing learn-overlay Escape handler
should early-return if `moZoom` is visible (defensive, belt-and-braces).

### CFL-05 - FLIP reflow animation - include in v32.14 or skip?

R5 offers both View Transitions (3 lines, crossfade) and vanilla FLIP (25
lines, physical slide). R3 does not cover layout reflow animation.

**Resolution: skip FLIP in v32.14. Use View Transitions only.**

Why:
- Layout reflow fires only when the user resizes the browser window, which
  is rare mid-session. The budget for this feature is low.
- FLIP adds ~25 lines and a ResizeObserver, small but non-zero risk of jank
  on slow devices with our 7000+ line HTML.
- View Transitions are already wired in v32.8 for 4 modals. Adding one more
  `document.startViewTransition` wrapper around a fictional reflow trigger
  is free.
- If QA or the user complains about crossfade flicker during reflow, v32.15
  adds FLIP as a follow-up.

### CFL-06 - R2 diacritics and HTML entities

R2's extraction contains Polish diacritics (a, s, z, l etc with marks) and
HTML entities like `&gt;` that slipped through the extraction prompt.

**Resolution: Phase D cleanup pass during JS constant injection.**

When we inject `AGENT_EDU_PL` into the HTML, we run each string through a
sed-like replacement:

- ASCII-fold Polish diacritics (a-a, e-e, z-z, o-o, s-s, c-c, l-l, n-n,
  plus uppercase)
- `&gt;` -> `-`, `&lt;` -> `-`, `&amp;` -> `and`
- Em-dash (--) and en-dash (-) -> regular hyphen

This is a trivial find-replace pass. The content itself is correct and
usable; only the character set needs normalizing.

### CFL-07 - AGENT_KNOWLEDGE vs new AGENT_EDU_PL for the 4 pilots

R1 flagged that `rysujBentoAgenta` rows 1, 3, 4 are conditional on
`kn = getAgentKnowledge(aid)`. If the 4 pilots already have entries in
`AGENT_KNOWLEDGE`, we could merge the new fields into them. If not, we add a
new parallel constant.

**Resolution: introduce `AGENT_EDU_PL` as a new parallel constant keyed by
agent id, containing the 18 rich fields from R2.**

Why not merge into AGENT_KNOWLEDGE:
1. AGENT_KNOWLEDGE has the old schema (who/analogy/does/doesNot/antiPatterns/
   facts). Merging adds 12 new fields and breaks the schema for the other 24
   agents that still use the legacy renderer.
2. Parallel constant means the new renderer is gated on
   `AGENT_EDU_PL[aid]` presence. Pilots hit the new renderer, the other 31
   agents gracefully fall back to the legacy `rysujBentoAgenta`.
3. Phase D impl plan: wrap new renderer inside `rysujBentoAgenta` as an early
   branch `if (AGENT_EDU_PL[aid]) { return rysujBentoAgentaV14(aid); }`.
   Legacy path untouched for the other agents.

### CFL-08 - Infographic embedding size

R1 flagged: 4 infographics at ~650KB each = ~2.6MB raw, ~3.5MB after base64
encoding. HTML grows from 836KB to ~4.3MB.

**Resolution: embed inline as base64 in `AGENT_MEDIA` constant.**

Why:
1. The app is single-file offline-first by hard constraint. Relative paths
   break file:// protocol and require a web server.
2. 4.3MB is acceptable for a single-file app. Browser parses it once; after
   first paint it stays in memory. No network hit.
3. Lazy-loading (embedding only on first open) is a micro-optimization that
   complicates the constant definition. Skip for v32.14.
4. For v32.15 when we scale to 35 agents, the strategy flips: split to
   separate assets/ folder OR convert infographics to optimized SVG. This is
   already a known follow-up for v32.15.

Budget guardrail: enforce <= 700KB per raw jpg before base64 in Phase D. If
any of the 4 notebookLM jpgs exceeds it, run an imagemin pass first.

### CFL-09 - Shared CSS: .bento-* affects rysujBentoPreset too

R1 risk #5: `.bento-*` CSS is shared with `rysujBentoPreset`. Any layout
change ripples into the preset encyclopedia.

**Resolution: accept the shared upgrade.**

Why:
1. Preset encyclopedia also benefits from viewport-aware grid, modal cap,
   and mobile-first cascade. It is NOT a regression.
2. New sections (WHY CARE, HOW I WORK, REAL EXAMPLE, DEEP DIVE) are NOT
   added to the preset renderer. Preset keeps its current row structure.
   The CSS additions are purely grid mechanics (container queries, cap,
   classes), not new layout rules.
3. Phase D QA checklist item: open a preset encyclopedia before and after,
   eyeball compare.
4. If anything looks off post-change, we scope R5's container queries under
   `.bento-grid.is-agent-v14` and the preset grid gets the old mechanism.
   Fallback is cheap.

### CFL-10 - PDF presentation - include or skip?

User said "moze byc" (maybe). R1 found each of the 4 agents has a prezentacja
folder with PDF + PPTX. R3 pattern P9 puts the PDF behind progressive
disclosure in the DEEP DIVE section.

**Resolution: include as a button inside DEEP DIVE.**

Implementation:
- Button: `<button class="enc-dl-btn" onclick="...">Otworz prezentacje</button>`
- Action: open the PDF in a new window via `window.open(url)`
- Source: relative path to the notebookLM prezentacja/*.pdf
- Fallback: if file:// context and path resolution fails, show a small
  "Prezentacja dostepna w notebookLM/0.7 Researcher_Reddit/prezentacja/"
  hint instead of a broken link.

Zero size impact on HTML because PDFs are not embedded.

---

## 3. Consensus recommendations (feed Phase C directly)

### 3.1 Canonical grid recipe (from R5 + R3 modal cap)

```css
/* Container boundary */
.learn-overlay .bento-scroll {
  container-type: inline-size;
  container-name: bento;
}

/* Base: mobile single column + 1680 master cap */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: dense;
  grid-auto-rows: minmax(80px, auto);
  gap: 10px;
  margin: 0 auto 24px;
  width: min(100%, 1680px);
}
.bento-1x1, .bento-2x1, .bento-2x2, .bento-4x1 {
  grid-column: 1 / -1; grid-row: span 1;
}
.bento-2x2 { grid-row: auto; min-height: 260px; }

@container bento (min-width: 520px)  { 2 cols }
@container bento (min-width: 860px)  { 3 cols }
@container bento (min-width: 1200px) { 4 cols }
@container bento (min-width: 1800px) { 5 cols, max-width 2100 }
@container bento (min-width: 2200px) { 6 cols, max-width 2400 }
```

Full code in R5 section 7.

### 3.2 Canonical section IA (from R3)

10 sections, Polish-first:

```
1. HERO           (bento-4x1, span 2 rows)  - kicker + icon + name + mission + quote
2. DLACZEGO JA    (bento-4x1)                - 3 benefit bullets (missionShort + why)
3. JAK PRACUJE    (bento-2x1)                - 4-step flow (howItWorks)
4. META           (bento-2x1)                - model, phase, tools, ctx, cost (infobox)
5. CO UMIEM       (bento-1x1 on 4-col)       - green checkmark list (does)
6. CZEGO NIE      (bento-1x1 on 4-col)       - red X list (doesNotDo)
7. PRZYKLAD       (bento-2x1)                - real example card (picked from howItWorks)
8. KIEDY ZAWODZE  (bento-2x1)                - anti-patterns
9. CIEKAWOSTKI    (bento-2x1)                - facts + learningQuote
10. ZANURKUJ      (bento-4x1, <details>)     - infographic thumb + PDF button + prompt
```

Plus side artifacts:
- Sticky reading progress bar at top of modal (R3 pattern P12, CSS-only)
- Glossary tooltips on AI jargon (R3 section 5.3, reuses `dodajTooltip`)
- "Nastepny agent" affordance at bottom (nav bar already has prev/next)

### 3.3 Canonical zoom lightbox (from R4)

- Single `<img>` + CSS transform + JS scalars `{scale, tx, ty}`
- `transform-origin: 0 0` (trivial focal-point math)
- 70 lines CSS + 230 lines JS + 16 lines HTML shell
- `otworzZoom(src, caption)` / `zamknijZoom()` API
- Wheel / pinch / button / dblclick / keyboard
- Full focus trap + screen reader announcement + 44x44 targets
- Drop-in code ready in R4 section 2

Integration point: bento DEEP DIVE card has a `<button>` wrapper around the
infographic thumbnail that calls `otworzZoom(AGENT_MEDIA[aid].infographic,
'Infografika: ' + name)`.

### 3.4 Micro-interactions to include (from R3)

- Card hover lift with `cubic-bezier(0.16, 1, 0.3, 1)` overshoot
- Staggered reveal on scroll via IntersectionObserver (`--i` var, 50ms step)
- Subtle icon scale + rotate on tile hover
- Sticky reading progress bar via CSS scroll-driven animations + JS fallback
- Focus-visible ring on tiles and buttons
- `<details>` expand animation (Chrome 129+ `interpolate-size`, fallback
  content fade-in)
- All gated on `prefers-reduced-motion`

### 3.5 Constants to add

1. `AGENT_EDU_PL` = R2 content, keyed by agent id, 18 fields, diacritic-clean
2. `AGENT_MEDIA` = `{ [aid]: { infographic: 'data:image/jpeg;base64,...',
                                 presentationPath: 'relative/path.pdf',
                                 mindmapPath: 'relative/path.png' } }`
3. `AGENT_GLOSSARY` (optional) = shared term definitions for tooltips

4 pilots only: res_reddit, res_x, res_github, res_forums.

---

## 4. Open questions for HITL Gate #1

None of these are blockers for Phase C planning, but the user must confirm
before Phase D build:

- **Q1**: 4.3MB HTML size after infographic embedding. Accept, or convert
  to optimized WebP first to halve the size?
- **Q2**: Reading progress bar at top of modal - yes/no? (R3 recommends,
  minor polish, easy to remove if user dislikes)
- **Q3**: Glossary tooltips on every AI jargon term - scope to top ~15 terms
  or open-ended (every occurrence of token/subagent/Opus/etc)?
- **Q4**: `<details>` in DEEP DIVE - default collapsed or expanded? R3 and
  Nielsen/Norman say collapsed. User preference may differ.

These go into HITL_GATE_1.md as decision bullets with recommendations.

---

## 5. Phase C input pack (what the planners need)

The 3 Phase C documents (MANIFEST, DESIGN_SPEC, LAYOUT_SPEC) should pull
from:

- R1: code audit (insertion points in rysujBentoAgenta, CSS lines, risks)
- R2: content (all 4 agents' 18 fields each, awaiting Phase D cleanup)
- R3: IA + micro-interactions + modal max-width + Polish-first labels
- R4: drop-in zoom lightbox (CSS, JS, HTML shell, integration point)
- R5: container-query grid recipe + breakpoints + span class strategy
- CRITIC (this file): decision matrix + conflict resolutions

Phase C does NOT need to re-research anything. All decisions are locked.

---

## 6. Risk register (carried over from R1, refined)

| ID | Risk                                            | Severity | Mitigation                                               |
|----|-------------------------------------------------|----------|----------------------------------------------------------|
| R1 | View Transitions API Safari/Firefox polyfill   | LOW      | Already wired in v32.8, graceful degradation proven      |
| R2 | Sparse AGENT_KNOWLEDGE for 4 pilots             | RESOLVED | Introduce AGENT_EDU_PL constant, legacy path untouched   |
| R3 | learnOpen global state leak with new zoom modal | LOW      | R4 uses its own `mzState`, zero collision                |
| R4 | Animation stagger cap with 11+ cards            | LOW      | Cap at 50ms step (R3), max total = 550ms                 |
| R5 | Shared .bento-* CSS affects rysujBentoPreset    | LOW      | Accepted upgrade, QA eyeball test in Phase E             |
| R6 | Infographic embedding size (3.5MB base64)       | MED      | Accept, enforce <=700KB per raw jpg, revisit in v32.15   |
| R7 | Container query browser support                 | LOW      | Baseline 2023, 95%+ in 2026, fallback = mobile layout    |
| R8 | R2 diacritics + HTML entities in content       | LOW      | Phase D cleanup pass during JS constant injection        |

---

## 7. PASS/REVISE summary

All 5 reports: **PASS**.

No REVISE items. No conflicting research needs to be re-run.

Phase C is unblocked. Proceed to MANIFEST + DESIGN_SPEC + LAYOUT_SPEC +
HITL_GATE_1.md, STOP at Gate #1 for user approval, then Phase D build.

End of CRITIC.md
