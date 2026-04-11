# R7 - Motion + micro-interactions 2026

## TLDR (5 bullets)
- Premium 2026 motion is SHORT (150-400ms for most UI), uses EMPHASIZED easing for hero moments and STANDARD easing everywhere else, not a single generic "ease-out" [1][2].
- Material 3 now ships emphasized curves plus spring slots as design tokens; the drop-in defaults are `cubic-bezier(0.2, 0, 0, 1)` standard and `cubic-bezier(0.2, 0, 0, 1.2)` emphasized [1].
- CSS `linear()` is Baseline (all major browsers since Dec 2023, ~88% support as of Oct 2025) and is the correct 2026 way to ship spring/bounce without JS [2][3].
- Hover lift pattern: `translateY(-2px)` to `-4px` with a TWO-LAYER shadow on `180-200ms` `ease-out`. Bigger lifts and `0.5s` transitions read as amateur [4].
- prefers-reduced-motion means "reduced", NOT "none": replace TRANSLATE/SCALE with opacity fades, keep state-change cues [5][6].

## Easing curves (concrete cubic-bezier set)

Ship these as CSS variables. These are the Material 3 + community premium defaults for 2026 [1][2][4]:

```css
:root {
  /* Standard - 95% of UI transitions */
  --ease-standard:      cubic-bezier(0.2, 0, 0, 1);
  /* Decelerate - entering elements (panels, modals in) */
  --ease-decelerate:    cubic-bezier(0, 0, 0, 1);
  /* Accelerate - exiting elements (panels out, dismiss) */
  --ease-accelerate:    cubic-bezier(0.3, 0, 1, 1);
  /* Emphasized - hero moments, page nav (M3 signature) */
  --ease-emphasized:    cubic-bezier(0.2, 0, 0, 1);
  --ease-emphasized-in: cubic-bezier(0.05, 0.7, 0.1, 1);
  --ease-emphasized-out:cubic-bezier(0.3, 0, 0.8, 0.15);
  /* Spring-ish overshoot (tiny bounce) */
  --ease-spring-soft:   cubic-bezier(0.34, 1.3, 0.64, 1);
  --ease-spring-snappy: cubic-bezier(0.2, 0, 0, 1.2);
  /* Linear - ONLY for progress bars, spinners, loading shimmers */
  --ease-linear: linear;
}
```

Rule: if you are not sure, use `--ease-standard`. Use `--ease-emphasized` only for "the app is changing state" moments (route change, overlay open, sidebar collapse).

## Duration ladder

Premium apps in 2026 are FASTER than the old 300ms default. Ladder [1][4]:

```css
:root {
  --dur-instant:  80ms;   /* tooltip, toggle state, color flip */
  --dur-fast:    150ms;   /* hover, focus ring, button press */
  --dur-base:    220ms;   /* most transitions (dropdowns, tabs) */
  --dur-medium:  320ms;   /* panels sliding, cards reveal */
  --dur-slow:    480ms;   /* hero, modal, sidebar collapse */
  --dur-hero:    640ms;   /* page / route transitions */
}
```

Avoid `600ms+` for anything the user touches frequently. 400ms is the 2026 "slow" ceiling for hover/click feedback [4].

## Spring via linear() function

Browser support for `linear()` is ~88% and Baseline since Dec 2023 [2][3]. Use it for bounces and springs without JS:

```css
:root {
  /* Gentle spring, ~500ms perceived */
  --spring-gentle: linear(
    0, 0.009, 0.035, 0.078, 0.138, 0.213, 0.302, 0.402, 0.511,
    0.625, 0.742, 0.858, 0.971, 1.077, 1.176, 1.265, 1.343,
    1.41, 1.464, 1.505, 1.533, 1.546, 1.547, 1.535, 1.513,
    1.482, 1.443, 1.399, 1.351, 1.301, 1.25, 1.201, 1.154,
    1.112, 1.074, 1.042, 1.016, 0.997, 0.984, 0.977, 0.975, 0.978, 1
  );
  /* Snappy spring, ~350ms perceived */
  --spring-snappy: linear(
    0, 0.062, 0.208, 0.41, 0.637, 0.866, 1.077, 1.253, 1.383,
    1.458, 1.482, 1.46, 1.403, 1.324, 1.238, 1.157, 1.091,
    1.042, 1.013, 1
  );
}
```

Generate your own at `linear-easing-generator` or `easings.dev`. Use on `popover` open, `checkbox` check, small pills. NOT on sliding panels, they feel wobbly.

## Hover lift micro-pattern (concrete CSS)

```css
.card {
  transform: translateY(0);
  box-shadow:
    0 1px 2px rgba(0,0,0,.06),
    0 2px 6px rgba(0,0,0,.04);
  transition:
    transform var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard),
    border-color var(--dur-fast) var(--ease-standard);
  will-change: transform;
}
.card:hover,
.card:focus-visible {
  transform: translateY(-2px);
  box-shadow:
    0 2px 4px rgba(0,0,0,.08),
    0 12px 28px rgba(0,0,0,.14);
}
.card:active {
  transform: translateY(0);
  transition-duration: var(--dur-instant);
}
```

Rules [4][7]:
- `translateY(-2px)` for dense lists, `-4px` for hero cards. Never `-8px` on content cards.
- Two-layer shadow (tight ambient + wide key) reads as premium. Single big shadow = amateur.
- Chain `:focus-visible` next to `:hover` always.
- Press-down on `:active` at instant duration is the "click feel" premium apps have.

## Stagger choreography

Modern 2026 approach uses `sibling-index()` (Chrome 130+) or CSS custom props [8]:

```css
/* Modern: sibling-index (Chrome 130+, progressive) */
.list > * {
  animation: enter var(--dur-medium) var(--ease-decelerate) both;
  animation-delay: calc(sibling-index() * 40ms);
}
/* Fallback: index custom prop set via inline style --i */
.list > * { animation-delay: calc(var(--i, 0) * 40ms); }

@keyframes enter {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Stagger interval: `30-60ms` between items. Above 80ms the list feels laggy. Cap total stagger at ~400ms so a 20-item list does not take forever.

## prefers-reduced-motion (concrete CSS pattern)

Motion-first with a targeted override (recommended 2026 pattern) [5][6]:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* Preserve state-change cues via opacity */
  .card:hover { transform: none; }
  .list > * { animation: fade var(--dur-fast) linear both; }
  @keyframes fade { from {opacity:0} to {opacity:1} }
}
```

Key: do NOT strip all feedback. Replace translate/scale with opacity. Keep loading spinners (they convey state).

## Sidebar collapse/expand motion

Linear-style collapse pattern [4]:

```css
.sidebar {
  width: 260px;
  transition:
    width var(--dur-slow) var(--ease-emphasized),
    transform var(--dur-slow) var(--ease-emphasized);
  will-change: width;
}
.sidebar[data-collapsed="true"] { width: 56px; }
.sidebar .label {
  opacity: 1;
  transition: opacity var(--dur-fast) var(--ease-standard);
}
.sidebar[data-collapsed="true"] .label { opacity: 0; }
```

Rules: animate `width` with emphasized easing at `480ms`, fade labels OUT at `150ms` during collapse (so they disappear before the width finishes). On expand, fade labels IN with a `120ms` delay so the container opens first. Persist collapsed state in localStorage. Linear and Arc both do exactly this.

## Amateur mistakes to AVOID

1. One global `transition: all .3s ease` on every element. Use per-property transitions with named easing.
2. 500ms+ hover durations. Hover should feel instant (150-220ms).
3. `ease-in-out` on everything. It feels sluggish; prefer `ease-out` / decelerate for entries.
4. Big `translateY(-10px)` lifts on content cards. Signals tutorial-grade CSS.
5. Single flat shadow `0 4px 8px rgba(0,0,0,0.2)`. Premium uses multi-layer ambient+key.
6. Animating `left` / `top` / `width` instead of `transform`. Layout thrash, jank.
7. `animation: bounce infinite` on interactive elements. Distracting, unprofessional.
8. Ignoring `prefers-reduced-motion` entirely, OR killing ALL motion including focus/opacity cues.
9. Same duration for enter and exit. Exit should be ~70% of enter duration.
10. Stagger delays above 80ms per item. Lists feel slow to populate.

## Direct application to v32.8 (motion tokens drop-in)

Add to `:root` in v32.8 CSS:

```css
:root {
  /* Duration ladder */
  --dur-instant:  80ms;
  --dur-fast:    150ms;
  --dur-base:    220ms;
  --dur-medium:  320ms;
  --dur-slow:    480ms;
  --dur-hero:    640ms;

  /* Easing */
  --ease-standard:     cubic-bezier(0.2, 0, 0, 1);
  --ease-decelerate:   cubic-bezier(0, 0, 0, 1);
  --ease-accelerate:   cubic-bezier(0.3, 0, 1, 1);
  --ease-emphasized:   cubic-bezier(0.05, 0.7, 0.1, 1);
  --ease-spring-snappy:cubic-bezier(0.2, 0, 0, 1.2);
}
```

Apply map for v32.8:
- Canvas node hover lift: `--dur-fast --ease-standard`, `translateY(-2px)`.
- Palette item hover: `--dur-fast --ease-standard`.
- Sidebar `pokazWezel` slide in: `--dur-medium --ease-decelerate`.
- Modal `moCost` / `moPrompt` open: `--dur-slow --ease-emphasized` with opacity + `scale(.98 -> 1)`.
- Debate Arena phase swap: `--dur-hero --ease-emphasized`.
- Topbar cost HUD severity flash: `--dur-base --ease-spring-snappy` (tiny overshoot).
- Stagger palette render: `sibling-index() * 30ms` with `fade+translateY(6px)`.
- Respect `prefers-reduced-motion`: strip translate/scale, keep opacity, keep spinner + LIVE pulse.

## Sources

- [1] Material Design 3 - Easing and duration tokens - https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
- [2] Josh W. Comeau - Springs and Bounces in Native CSS (linear() guide) - https://www.joshwcomeau.com/animation/linear-timing-function/
- [3] MDN - CSS linear() easing function - https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear
- [4] Josh W. Comeau - An Interactive Guide to CSS Transitions - https://www.joshwcomeau.com/animation/css-transitions/
- [5] MDN - prefers-reduced-motion - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- [6] W3C WAI - C39 prefers-reduced-motion technique - https://www.w3.org/WAI/WCAG21/Techniques/css/C39
- [7] Magic UI - Mastering CSS Buttons Hover Effects - https://magicui.design/blog/css-buttons-hover
- [8] Frontend Masters - Staggered Animation with CSS sibling-* Functions - https://frontendmasters.com/blog/staggered-animation-with-css-sibling-functions/
- [9] Chrome for Developers - Create complex animation curves with linear() - https://developer.chrome.com/docs/css-ui/css-linear-easing-function
