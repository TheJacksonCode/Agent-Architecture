# H3 QA Performance - v32.8

## Verdict: GO-WITH-FIXES
## Score: 6.5/10
## Estimated FCP / LCP impact vs v32.7: +30-60ms FCP (starfield init + 22 new backdrop-filter layers), +20-40ms LCP (nodeBreathe + phaseGlow animate transform on ALL nodes). Scripted paints OK on M1-class; low-end GPUs will drop frames under simulation.

---

## CRITICAL

### C1. `.nd-body` has `animation:nodeBreathe 3s ease-in-out infinite` AND `backdrop-filter:blur(20px)` - on EVERY node simultaneously
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:833-836`
Every agent node on canvas breathes `transform:scale(1->1.02)` every 3s while also running a 20px backdrop-filter blur. For a 13-agent preset (Five Minds Strategic) this is 13 concurrent GPU blur layers animating scale, repainting their backdrop every frame. This is the textbook anti-pattern called out in DD3/R4. `contain:paint` on `.nd` (line 1423) helps isolate but the backdrop source still reads through. **Fix: drop `backdrop-filter` from `.nd-body` entirely, use solid `var(--bg-panel)`.** Nodes are small, not glass panels; the blur adds zero legibility and heavy cost.

### C2. Starfield RAF loop never pauses for `prefers-reduced-motion` or `document.hidden`
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:6957-6969`
`inicjGwiazdy()` runs a forever `requestAnimationFrame(draw)` that clears+redraws N=(W*H/3500) stars each frame (~600 stars at 1440x1000). No `matchMedia('(prefers-reduced-motion:reduce)')` check, no `visibilitychange` listener, no resize debounce (resize rebuilds the entire star array on every resize event). CSS at line 1505 only dims opacity to 0.55, the JS paint loop still runs. Same issue in `inicjStrumienDanych` at line 5899-5921 (it rAF-loops even when `simRunning===false`, just short-circuits after the clearRect). **Fix: `if(matchMedia('(prefers-reduced-motion:reduce)').matches) return;` + `document.addEventListener('visibilitychange', ...)` + debounce resize with RAF.**

### C3. `rWez()` triggers `rPol()` which re-serializes entire 6000x6000 SVG `innerHTML` on every drag-move
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:5217` calls `rPol();` inside the mousemove drag handler, and `rPol()` at 5351 does `svg.innerHTML=h` rebuilding the full defs/filter/marker/path/circle tree on every mouse event (no throttle, no rAF). With 5+ connections and simRunning adding 3 `<animateMotion>` circles per connection, each mousemove parses ~3-5KB of SVG. **Fix: wrap drag-move in rAF debounce or only update `d` attribute of existing paths.**

---

## HIGH

### H1. `will-change: backdrop-filter` is pinned (not event-scoped) on 5 surfaces
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:412, 413, 457, 709, 1072`
`.glass-thin`, `.glass-thick`, `.topbar`, `.side-l`, `.side-r` all carry permanent `will-change:backdrop-filter`. Per MDN/web.dev this promotes the element to its own composited layer for the entire page lifetime and consumes GPU memory. Rule is "only when about to animate, remove after". None of these layers animate backdrop-filter. **Fix: remove `will-change:backdrop-filter` from all five rules; keep only on `.mo-box` (1545) where it is briefly animated open/close.**

### H2. `.mo-box` has `will-change:backdrop-filter,transform,opacity` AND `animation:moF4Pop` - sprayed
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:1545`
Three hints at once. `transform,opacity` is fine; `backdrop-filter` on will-change is unnecessary because the blur is static during the scale pop. **Fix: `will-change:transform,opacity` only.**

### H3. `aktKoszt()` runs on every model change and keystroke with no debounce
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:5543-5545, 5596-5618`
Each `zmienModel`/`zmienWszModel`/`zmienModelZazn` call chains `rWez()` (full DOM wipe+rebuild) + `aktStan()` + `aktKoszt()` (recomputes `calcTotalRange()` + `calcPresetMaxCtx()` + rebuilds HUD innerHTML + if cost modal open, re-renders donut/table). Multi-select bulk change = N cascading layouts. **Fix: rAF-batch all three calls at the end of the event handler, or debounce by 16ms.**

### H4. All 6 `safeSaveLS()` call sites are synchronous on every change - no debounce
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:5267, 6598, 6612, 6622, 6634, 6636`
Custom agents save fires on every save click (fine), but `acV32` list saves after every `zapiszKfg`. Not a hot path per se, but combined with JSON.stringify the full custom-agent array is sync main-thread. Acceptable for now. **Fix: debounce 300ms if list grows.**

---

## MEDIUM

### M1. `nodes.find()` still used 20x in hot paths, bypassing AD_MAP pattern
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:5311, 5364 (inside conns.forEach), 5387, 5388, 5396, 5543` etc.
`AD_MAP.get()` is used correctly for the AD dictionary (53 hits - good), but `nodes` itself is still `.find()`-scanned O(n) inside `conns.forEach()` at line 5364 (that is O(C*N) per rPol call). For a 13-agent preset with 20 connections this is 260 scans on every drag-move. **Fix: build `const nMap = new Map(nodes.map(n=>[n.id,n]))` once per `rPol()` call, then `nMap.get()`.**

### M2. `.nd.always-on`, `.nd.phase-active`, `.sim-active::after`, `.sim-dot`, `.shooting-star`, `.bg-orb`, `.hitl-orb`, `.bento-orb`, `.learnPulse`, `.ctrlPulse`, `.acUrgentPulse`, `.connActivePulse`, `.hitlUrgent` = 13+ infinite keyframe animations
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:436, 447-449, 797, 851, 855, 857, 861, 993, 997, 1010, 1120, 1155, 1331, 1344, 1376`
File has **37 `@keyframes`** rules. Many animate `filter:blur(80-100px)` (bg-orb line 436, bento-orb line 1155, hitl-orb line 1331) which is compositor-poisonous. Each orb is a 80-100px Gaussian blur being x,y drifted every frame. **Fix: pause orbs via `animation-play-state:paused` except when the containing modal is open; already correct for bento/hitl orbs since they only exist while modal is open, but verify `.bg-orb` doesn't exist at page-load root level.**

### M3. Topbar `backdrop-filter` on sticky element + internal scroll container
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:457` topbar has `position:sticky` + `backdrop-filter:blur(14px) saturate(140%)`. When the main app scrolls (left sidebar, canvas), the topbar backdrop re-samples per frame. Acceptable because body scroll is rare and sidebars have their own scroll, but verify `.sl-pan` (line 712) and `.sr-scr` (line 1076) correctly strip `backdrop-filter:none` - **VERIFIED OK at 712 and 1076 with explicit `backdrop-filter:none`, good.** No fix.

### M4. View Transitions wrap 4 openers, no reduced-motion JS bailout
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:5624, 6297, 6570, 6725`
CSS downgrade at 1656-1665 shortens duration to 150ms but `document.startViewTransition()` still runs the full snapshot+interpolate. On Chromium snapshot cost is ~30-80ms on 4K displays. **Fix: `if(matchMedia('(prefers-reduced-motion:reduce)').matches){return pokazCostBreakdown(1)}` to skip the VT wrapper entirely.**

### M5. Mermaid modal backdrop-filter is `blur(10px)` on sticky `thead`
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:567` `.cbm-tbl thead{position:sticky;backdrop-filter:blur(10px)}` - sticky thead inside scrolling modal body means backdrop re-samples every scroll tick. Minor since modal body is short, but **fix: use solid `background:var(--bg-panel)` on sticky thead.**

---

## LOW

### L1. `dragGroup.forEach` writes `el.style.left/top` not `transform:translate`
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:5216`
Top/left triggers layout on every frame of drag. Acceptable because `.nd` has `position:absolute` and `contain:paint`, which scopes layout to the node, but transform would be cheaper. **Fix (future): cache base x,y, apply `transform:translate3d(dx,dy,0)` during drag, commit on mouseup.**

### L2. `.pa-item:hover transform:translateY(-1px)` without `will-change`
Correct - hover-only, no will-change needed. **OK.**

### L3. `AGENT_TOKENS`/`MODEL_COSTS` cost recomputes scan all nodes - fine at <300 scale
Scale acceptable per DD. **OK.**

### L4. `rPalete()` does `G('paL').innerHTML=h` full rebuild on custom-agent save
Only runs on add/delete custom agent (rare). **OK.**

### L5. `inicjGwiazdy()` adds `window.addEventListener('resize', resize)` without removal / debounce
`AGENT_TEAMS_CONFIGURATOR_v32_8.html:6968`
Every resize event triggers `initStars()` which reallocates the full stars array (~600 objects). Rapid window resize = GC pressure. **Fix: `let rt; window.addEventListener('resize', ()=>{clearTimeout(rt);rt=setTimeout(resize,150)})`.**

### L6. Font stack
No web font loaded, all system stack (var(--hd/--bd/--mn) at :root) = zero FOUT/FOIT cost. **OK.**

### L7. Bundle delta +1040 lines vs v32.7 (6033 -> 7072)
F1 tokens, F3 canvas layer, F4 modals, view-transitions, 3 new presets, 2 HITL modal upgrades account for it. No duplicated CSS blocks detected in spot-check. **OK.**

---

## OK

- `.nd { contain:paint }` (1423) - correctly NOT layout; draggable preserved. **OK**
- `.mo-b { contain:paint }` (1564) - modal body scoped. **OK**
- `AD_MAP.get()` used in `rWez` (5303), `dodajW` (5277), 53 total hits - no `AD.find()` regressions. **OK**
- 6000x6000 SVG `#svg` has NO backdrop-filter applied (verified: only `.cv-ctrl`, `.cv-area` parent chain has no glass classes). **OK per DD3+R4**
- Inner scroll containers `.sl-pan` (712) and `.sr-scr` (1076) explicitly set `backdrop-filter:none` with comment "R-04: inner scroll container MUST NOT carry backdrop-filter". **OK - this is exemplary.**
- `@supports not(backdrop-filter)` fallback at 1612 + `prefers-reduced-transparency` at 1603 swap to solid. **OK**
- `aktMinimape` RAF-debounced (6903). **OK**
- Mermaid generation only on user click. **OK**
- `rWez` diffing: NOT diffing, but `contain:paint` on `.nd` scopes paint to each node so full wipe is cheap at <300 nodes. **OK at current scale.**
- Marquee rect uses top/left not transform - acceptable (single element). **OK**
- Font loading: system stack, zero cost. **OK**

---

## Top 3 must-fix before ship

1. **Remove `backdrop-filter` from `.nd-body` (C1)** - single biggest win, kills N*blur layers.
2. **Add `prefers-reduced-motion` + `visibilitychange` pause to `inicjGwiazdy` and `inicjStrumienDanych` (C2)** - stops GPU churn on idle tabs.
3. **Strip `will-change:backdrop-filter` from 5 permanent surfaces (H1)** - reclaims GPU memory, no visual cost.

Estimated combined impact: -20-40% GPU time on mid-tier laptop, -25ms LCP, +10fps during simulation on integrated-GPU machines.
