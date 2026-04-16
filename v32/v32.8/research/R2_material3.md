# R2 - Google Material 3 Expressive 2026

## TLDR (5 bullets)
- M3 Expressive (Google I/O May 2025) is an extension, not a replacement, of Material You / M3. It layers a richer color role system, spring-physics motion, shape-morphing, and a more expressive type scale on top of the existing M3 tokens [1][5].
- The big 2025/2026 additions are: (a) expanded tonal surface containers (surfaceContainerLowest -> surfaceContainerHighest) replacing the old "surface + elevation overlay" trick, (b) fixed and fixed-dim color roles for immovable brand anchors, (c) shape system tokens (not just corners) with shape-morph animations, (d) spring-based motion tokens alongside the cubic-bezier ones [3][6].
- Dark-mode elevation in M3 is NO LONGER a white alpha overlay. Elevation is expressed as a tonal STEP across 5 surfaceContainer roles - each is a precomputed tonal value from the neutral palette [3][6].
- Motion tokens split into emphasized (hero, expressive) and standard (productive, utilitarian). Durations ramp from 50ms to 1000ms across short1-long4 buckets [2].
- State layers are additive color overlays at fixed opacities: hover 8%, focus 10%, pressed 10%, dragged 16% - applied over the role color, not the surface [7].

## Color role system (drop-in CSS variables)
Dark-mode role values generated from a neutral-violet source (close to v32.7 palette) via Material Theme Builder. These are dignified, low-saturation tones suitable for a restrained dashboard [3][6].

```css
:root[data-theme="dark"] {
  /* Primary role */
  --md-sys-color-primary:            #C7BFFF;
  --md-sys-color-on-primary:         #2E2776;
  --md-sys-color-primary-container:  #453E8E;
  --md-sys-color-on-primary-container:#E4DFFF;

  /* Secondary (softer, supporting actions) */
  --md-sys-color-secondary:            #C8C5DC;
  --md-sys-color-on-secondary:         #303041;
  --md-sys-color-secondary-container:  #464658;
  --md-sys-color-on-secondary-container:#E4E1F6;

  /* Tertiary (accent, not action) */
  --md-sys-color-tertiary:             #EBB8CF;
  --md-sys-color-on-tertiary:          #482537;
  --md-sys-color-tertiary-container:   #613B4D;
  --md-sys-color-on-tertiary-container:#FFD8E7;

  /* Surface tonal palette (NEW in M3 Expressive) */
  --md-sys-color-surface:              #141318;
  --md-sys-color-surface-dim:          #141318;
  --md-sys-color-surface-bright:       #3A383E;
  --md-sys-color-surface-container-lowest:#0E0D13;
  --md-sys-color-surface-container-low:#1C1B20;
  --md-sys-color-surface-container:    #201F25;
  --md-sys-color-surface-container-high:#2B2930;
  --md-sys-color-surface-container-highest:#36343B;
  --md-sys-color-on-surface:           #E5E1E9;
  --md-sys-color-on-surface-variant:   #C8C5D0;

  /* Outline */
  --md-sys-color-outline:              #928F9A;
  --md-sys-color-outline-variant:      #47464F;

  /* Fixed (immovable brand anchors, identical in light+dark) */
  --md-sys-color-primary-fixed:        #E4DFFF;
  --md-sys-color-primary-fixed-dim:    #C7BFFF;

  /* Semantic */
  --md-sys-color-error:                #FFB4AB;
  --md-sys-color-on-error:             #690005;
}
```

## Surface elevation in dark mode
M3 Expressive kills the old "white-overlay at X% per dp" rule. Instead, elevation = pick the right surfaceContainer role [3][6].

| Use           | Role                      | Hex (dark) | Replaces old dp |
|---------------|---------------------------|------------|-----------------|
| App canvas    | surfaceContainerLowest    | #0E0D13    | 0dp             |
| Cards resting | surfaceContainerLow       | #1C1B20    | 1dp overlay 5%  |
| Sheets        | surfaceContainer          | #201F25    | 3dp overlay 8%  |
| Menus         | surfaceContainerHigh      | #2B2930    | 6dp overlay 11% |
| Modals, FAB   | surfaceContainerHighest   | #36343B    | 12dp overlay 14%|

Shadow is still used (narrow dark cast) but tonal step does the heavy lifting. This gives depth WITHOUT lifting contrast - ideal for dignified dark dashboards.

## Shape ramp
Corner radii are now tokenized. April 2026 spec uses the classic 5-step ramp with full morph support [4].

```css
:root {
  --md-sys-shape-corner-none:         0px;
  --md-sys-shape-corner-extra-small:  4px;
  --md-sys-shape-corner-small:        8px;
  --md-sys-shape-corner-medium:       12px;
  --md-sys-shape-corner-large:        16px;
  --md-sys-shape-corner-extra-large:  28px;  /* bumped from 24px in Expressive */
  --md-sys-shape-corner-full:         9999px;
}
```
Guidance: extra-small for chips, small for buttons, medium for cards, large for sheets, extra-large for hero containers.

## Motion tokens (cubic-bezier + ms)
M3 ships three easing families plus the new spring system. Use cubic-bezier here since springs require JS [2][5].

```css
:root {
  /* Emphasized (hero, entering, expressive) */
  --md-sys-motion-easing-emphasized:          cubic-bezier(0.2, 0, 0, 1);
  --md-sys-motion-easing-emphasized-decel:    cubic-bezier(0.05, 0.7, 0.1, 1);
  --md-sys-motion-easing-emphasized-accel:    cubic-bezier(0.3, 0, 0.8, 0.15);

  /* Standard (productive, small changes) */
  --md-sys-motion-easing-standard:            cubic-bezier(0.2, 0, 0, 1);
  --md-sys-motion-easing-standard-decel:      cubic-bezier(0, 0, 0, 1);
  --md-sys-motion-easing-standard-accel:      cubic-bezier(0.3, 0, 1, 1);

  /* Linear (progress, scrubs) */
  --md-sys-motion-easing-linear:              cubic-bezier(0, 0, 1, 1);

  /* Durations */
  --md-sys-motion-duration-short1:  50ms;
  --md-sys-motion-duration-short2:  100ms;
  --md-sys-motion-duration-short3:  150ms;
  --md-sys-motion-duration-short4:  200ms;
  --md-sys-motion-duration-medium1: 250ms;
  --md-sys-motion-duration-medium2: 300ms;
  --md-sys-motion-duration-medium3: 350ms;
  --md-sys-motion-duration-medium4: 400ms;
  --md-sys-motion-duration-long1:   450ms;
  --md-sys-motion-duration-long2:   500ms;
  --md-sys-motion-duration-long3:   550ms;
  --md-sys-motion-duration-long4:   600ms;
  --md-sys-motion-duration-xlong1:  700ms;
  --md-sys-motion-duration-xlong4:  1000ms;
}
```
Rule of thumb: small UI (chip, checkbox) = short2 + standard; full-panel transition = medium3 + emphasized; sheet/modal enter = long2 + emphasized-decel.

## State layer opacities
Additive overlay in the role color on top of any surface [7].

```css
:root {
  --md-sys-state-hover-opacity:       0.08;
  --md-sys-state-focus-opacity:       0.10;
  --md-sys-state-pressed-opacity:     0.10;
  --md-sys-state-dragged-opacity:     0.16;
  --md-sys-state-disabled-content:    0.38;
  --md-sys-state-disabled-container:  0.12;
}
```
Example: `.btn:hover { background: color-mix(in srgb, var(--md-sys-color-primary) 8%, transparent); }`

## Typography ramp
M3 Expressive keeps 15 sizes, 5 families [8].

| Role          | Size | Weight | Tracking | LH  |
|---------------|------|--------|----------|-----|
| display-large | 57   | 400    | -0.25    | 64  |
| display-medium| 45   | 400    | 0        | 52  |
| display-small | 36   | 400    | 0        | 44  |
| headline-large| 32   | 400    | 0        | 40  |
| headline-med  | 28   | 400    | 0        | 36  |
| headline-small| 24   | 400    | 0        | 32  |
| title-large   | 22   | 400    | 0        | 28  |
| title-medium  | 16   | 500    | 0.15     | 24  |
| title-small   | 14   | 500    | 0.1      | 20  |
| body-large    | 16   | 400    | 0.5      | 24  |
| body-medium   | 14   | 400    | 0.25     | 20  |
| body-small    | 12   | 400    | 0.4      | 16  |
| label-large   | 14   | 500    | 0.1      | 20  |
| label-medium  | 12   | 500    | 0.5      | 16  |
| label-small   | 11   | 500    | 0.5      | 16  |

## What M3 AVOIDS
- No pure #000 backgrounds (too harsh). Dark canvas is always #14-#1C range [3].
- No saturated primary colors in dark mode (tonal palette stays muted, dignified).
- No white-overlay elevation trick (obsoleted by tonal containers).
- No sub-200ms motion for panel-level transitions (feels abrupt).
- No uniform 8px corners across the app (use the ramp).
- No stacked drop-shadow piles. One subtle shadow + tonal step.
- No state layers on the raw surface. Always layer on primary / secondary role.
- No motion on prefers-reduced-motion (set everything to 0.01ms).

## Direct application to v32.8 sidebars
1. Replace `--bg-panel` with `var(--md-sys-color-surface-container-low)` = #1C1B20. Replace `--bg-card` with `surface-container` = #201F25. This creates the step.
2. Agent detail sidebar = `surface-container-high` #2B2930 (one step above canvas cards), signaling "focused inspection panel".
3. Premium model buttons = `surface-container-highest` #36343B with `border: 1px solid var(--md-sys-color-outline-variant)`. Active state fills with `color-mix(primary-container 70%, surface)`.
4. Hover overlays on palette items: `background: color-mix(in srgb, var(--md-sys-color-primary) 8%, transparent)` via ::before pseudo so no relayout.
5. Corner radii: card = medium 12px, sidebar = large 16px, modal = extra-large 28px.
6. All sidebar enter/exit: `transform 350ms var(--md-sys-motion-easing-emphasized)`.
7. Respect `@media (prefers-reduced-motion: reduce)` - cut to 0.01ms.
8. Keep the starfield behind `surface` (alpha #141318ee) - tonal containers stay opaque.

## Sources
[1] Android Developers Blog, "Designing with personality: Introducing Material 3 Expressive", Aug 2025, https://android-developers.googleblog.com/2025/08/introducing-material-3-expressive-for-wear-os.html
[2] m3.material.io, "Easing and duration - tokens specs", https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
[3] m3.material.io, "Learn About Tone-based Surfaces in Material 3", https://m3.material.io/blog/tone-based-surface-color-m3/
[4] m3.material.io, "Shape - corner radius scale", https://m3.material.io/styles/shape/corner-radius-scale
[5] m3.material.io, "M3 Expressive: New Motion System", https://m3.material.io/blog/m3-expressive-motion-theming
[6] m3.material.io, "Color roles", https://m3.material.io/styles/color/roles
[7] m3.material.io, "States - State layers", https://m3.material.io/foundations/interaction/states/state-layers
[8] m3.material.io, "Typography - Applying type", https://m3.material.io/styles/typography/applying-type
[9] Google I/O 2025, "Build next-level UX with Material 3 Expressive", https://io.google/2025/explore/technical-session-24/
