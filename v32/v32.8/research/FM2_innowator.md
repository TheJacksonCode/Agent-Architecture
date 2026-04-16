# FM2 Innowator - Position Paper

## Opening statement

The MANIFEST has nailed tokens, glass, and typography. What it lacks is a single moment of time-travel: something a user sees in the first 400 ms that is impossible to build without 2026 primitives. My thesis: wire the View Transitions API to phase swaps, debate rounds, and modal opens, and bind the starfield to a quiet `pointermove` parallax driven by a `linear()` spring. These two moves cost ~60 lines and turn "another glass dashboard" into "this feels alive". Starfield stays, elegance intact.

## What the current spec is missing

1. **No View Transitions API.** Modal opens use plain `opacity + scale`. 2026 browsers ship same-document `::view-transition-group` for free. (DESIGN_SPEC grep: zero hits.) Effort: LOW.
2. **No `@starting-style` entry choreography.** All entries rely on JS class toggles. `@starting-style` would let the palette stagger and modal open declaratively with no JS at all. R7 missed this. Effort: LOW.
3. **Starfield parallax is viewport-blind.** MANIFEST Section 5 defines 3 parallax layers with drift but they never respond to the cursor. visionOS depth cue (R1 point 4) is about head tracking; the web analog is `pointermove`. Effort: LOW.
4. **Liquid Glass refraction ruled out as OOS-01.** R4 section 10 ("Apple Liquid Glass concepts") explicitly calls out `feDisplacementMap` + `feSpecularLighting` as the SVG translation. OOS-01 kills it globally. I want it back, scoped to ONE hero surface (HITL overlay top edge). Effort: MED.
5. **`linear()` springs defined but unused outside severity flash.** DESIGN_SPEC line 252 defines `--ease-spring-snappy/gentle` but MANIFEST DD17 locks hover to `cubic-bezier(0.2,0,0,1)`. Wasted token. R7 section "Spring via linear() function" says this is the 2026 differentiator. Effort: LOW.
6. **No scroll-driven animations on sidebars.** Sidebar section headers could shrink-on-scroll via `animation-timeline: scroll()` (Baseline Chrome 115+, Safari 26). Premium apps (Arc, Linear command palette) use this. Effort: LOW.
7. **Debate violet vs Sonnet violet (Q-01) treated as risk not opportunity.** R1 point 3 says Apple uses vibrancy not fills. Two violets are a chance to show off `color-mix(in oklab, ...)` with a 12% tilt to show their relation. Effort: LOW.
8. **Topbar HUD severity flash uses `--dur-base` cubic-bezier.** Should use `--ease-spring-snappy` (R7 line 72) with overshoot 1.2. One char change, huge perceived quality lift. Effort: LOW.

## Specific proposals

### P1: View Transitions API for phase / modal / debate round swaps

```css
@view-transition { navigation: none; }
::view-transition-old(modal),
::view-transition-new(modal) {
  animation-duration: var(--dur-slow);
  animation-timing-function: var(--ease-emphasized);
}
.mo-box { view-transition-name: modal; }
```

```js
// pokazCostBreakdown, pokazHITL, debateNextRound all wrap their DOM swap in:
if (document.startViewTransition) {
  document.startViewTransition(() => mutate());
} else mutate();
```

Elegant because: declarative, falls back silently (feature detection), respects `prefers-reduced-motion` automatically. The cost modal morphs from the topbar HUD cell it was clicked from (shared `view-transition-name: hud-cost`) rather than fade-in. This is the Apple "zoom from source" trick, now native CSS. No JS bounce libs.

### P2: `linear()` springs on selection lock-in

Hover stays cubic (DD17 correct). But the moment of SELECTING a palette row, canvas node, or model button gets the spring:

```css
.pa-item[aria-selected="true"],
.ds-mdl-btn.m-active,
.nd.sel {
  transition: transform 320ms var(--ease-spring-snappy),
              box-shadow 220ms var(--ease-standard);
  transform: translateY(-2px) scale(1.015);
}
```

`--ease-spring-snappy` is already defined via `linear(0, 0.062, 0.208, 0.41, 0.637, 0.866, 1.077, 1.253, 1.383, 1.458, 1.482, 1.46, 1.403, 1.324, 1.238, 1.157, 1.091, 1.042, 1.013, 1)` (R7 line 68-72, unused). Overshoot is 1.5 pct max because scale is 1.015. Dignified not flashy: hover stays flat, selection gets the tiny confirmation kick. Linear and Raycast ship exactly this.

### P3: Scroll-driven section headers in sidebars

```css
.ds-section-h {
  animation: dsHdrShrink linear both;
  animation-timeline: scroll(nearest block);
  animation-range: 0 80px;
}
@keyframes dsHdrShrink {
  from { font-size: 14px; padding-block: 12px; border-bottom-color: transparent; }
  to   { font-size: 11px; padding-block: 6px;  border-bottom-color: var(--border-strong); }
}
```

Right detail sidebar has ROLE / MODEL / KNOWLEDGE / SZCZEGOLOWY OPIS section headers. As user scrolls, each sticky header condenses from 14 px title to 11 px caps label when it reaches the top. Native CSS, zero JS, works in Safari 26 + Chrome 115+. Apple Music sidebar does this. Fallback: headers stay static. Effort: 15 lines.

### P4: Liquid Glass refraction on ONE hero surface

Overturn OOS-01 for exactly one element: the HITL overlay top edge (`moHITL`). R4 section 10 shows the SVG recipe:

```html
<svg width="0" height="0" style="position:absolute">
  <filter id="liquidGlassEdge">
    <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7"/>
    <feDisplacementMap in="SourceGraphic" scale="6"/>
  </filter>
</svg>
```

```css
.mo-hitl::before {
  content: "";
  position: absolute; inset: 0 0 auto 0; height: 3px;
  backdrop-filter: url(#liquidGlassEdge) blur(14px);
}
```

ONE place. Three-pixel strip. Static noise seed (no animation, zero frame cost). This is the "screenshot moment" for HITL because that is the highest-gravity modal in the app. Users WILL notice their decision is being caught on a real edge of light. Effort: MED, risk: Firefox fallback = straight hairline (acceptable).

### P5: Starfield depth parallax tied to pointer

```js
let px = 0, py = 0;
addEventListener('pointermove', e => {
  px = (e.clientX / innerWidth  - 0.5);
  py = (e.clientY / innerHeight - 0.5);
}, { passive: true });

// In starfieldDraw rAF loop, already running:
farLayer.x  = px *  4;   // near-zero drift
midLayer.x  = px *  9;
nearLayer.x = px * 18;   // shooting star layer responds most
// Ease toward target with lerp 0.08 so it feels like inertia not twitch.
```

Three existing layers (MANIFEST 5) get a 4/9/18 px offset range based on pointer position, lerped at 0.08 for silk inertia. Result: the starfield has real depth. Moving the cursor subtly tilts the universe. visionOS-grade. Effort: LOW, ~12 lines added to existing `starfieldDraw()`. `prefers-reduced-motion` disables it (stars go static, already specced).

### P6: Unexpected detail: cursor-reactive glass specular

```css
aside.sidebar {
  background:
    radial-gradient(circle 240px at var(--mx,50%) var(--my,-20%),
      rgba(255,255,255,0.05), transparent 70%),
    var(--glass-thin-bg);
}
```

```js
addEventListener('pointermove', e => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});
```

A single soft specular highlight follows the cursor across glass panels, as if a light source rode behind it. 5 pct alpha white so it never dominates body text (R4 tint alpha rule: stays above 0.45 base). This is the detail Arc users quote in tweets. The same `--mx/--my` vars power P5, so zero extra listeners. Effort: LOW.

## Proposed upgrades to MANIFEST

1. **DD15 + DD16**: add "`--ease-spring-snappy` applies to SELECTION transitions, not only severity flash". Selection is the app's highest-signal moment. Still elegant because overshoot is capped at 1.5 pct scale. [P2]
2. **OOS-01**: amend from "No SVG feDisplacementMap" to "No SVG feDisplacementMap EXCEPT one static-seed 3 px edge strip on HITL overlay". HITL is the single dramatic pause in the whole app. Earning one refraction there is deference, not flash. [P4]
3. **Section 5 (starfield)**: add "3-layer pointermove parallax at lerp 0.08, offset max 4/9/18 px, disabled under reduced-motion". Starfield stays (R1 visionOS depth point 4). [P5]
4. **DD17 hover pattern**: keep cubic hover, BUT add "`.pa-item:hover::before` = radial cursor specular via CSS `--mx/--my` vars, 5 pct alpha". [P6]
5. **New DD23**: "All modal opens and debate round swaps use `document.startViewTransition()` with feature detection. ::view-transition-group shared names link source cells to their modals (`hud-cost` <-> Cost modal, `nd-{id}` <-> agent detail)". [P1]

## Risks I accept

1. **`@supports` pyramid grows.** View Transitions, `linear()`, scroll-timeline, `feDisplacementMap` each need a feature check. CRITIC.md already tracks fallback layers. Worth it: every feature degrades gracefully to the spec as-written. No layout regression on Firefox.
2. **Pointer parallax on starfield could distract.** Mitigation: lerp 0.08 is slow enough to feel like inertia, not tracking. Max offset 18 px on the fastest layer is sub-perceptual except when swinging fast. Disabled under `prefers-reduced-motion`.
3. **View Transitions on heavy canvas SVG may hitch on low-end.** Mitigation: scoped `view-transition-name` only to chrome elements (modals, sidebars, HUD cells). Canvas and the 6000x6000 SVG are never named, so they are excluded from the snapshot.

## Closing

REVISE. The one move I most want: wire `document.startViewTransition()` to the five modal opens + debate round swap + HUD-cell-to-modal morph. It is 40 lines, feature-detected, and turns the whole app into "shipped by a team that read 2026 docs". Everything else is bonus.
