# R1 - Apple HIG 2026 + visionOS

Research for v32.8 premium dark sidebar redesign. Focus: translating Apple's 2026 design language (Liquid Glass, Materials, visionOS depth cues) into CSS for a 2D dark dashboard with a preserved animated starfield background.

## TLDR (5 bullets max)

- Apple 2026 is governed by Liquid Glass: a translucent material that blurs + lightly tints the backdrop, carries a hairline inner specular rim, and casts one soft ambient shadow. It is layered, never stacked flat [1][2].
- On dark backgrounds Apple uses vibrancy, not solid fills: labels/fills/separators read THROUGH the material instead of sitting on top of it. Typical recipe: rgba(255,255,255,0.06-0.10) background + backdrop-filter: blur(20-30px) saturate(180%) + 1px inner rgba(255,255,255,0.12) border [3][6].
- Four principles still drive the HIG: Clarity, Deference, Depth, Consistency. "Deference" is the key word for v32.8 - the chrome must defer to the canvas (starfield + agent nodes) [2].
- visionOS depth language (ornaments, lifted panels, shadow-on-floor) translates to 2D as: panels float above the canvas with a soft drop shadow + a 0.5-1px top-edge specular line. Hover = +2-4px lift, never a color flip [4].
- Concrete numbers: corner radius 18-22px on panels and 10-12px on controls, backdrop-blur 24px, panel shadow 0 20px 60px rgba(0,0,0,0.45), hairline border rgba(255,255,255,0.10), body text #E8E8ED@88%, muted #9C9CA8@72%, accent violet/cyan desaturated by 10-15%.

## Core principles

1. **Deference over decoration.** The interface yields to content. For v32.8 this means the sidebars are dark glass plates, not opaque slabs, so the starfield and agent nodes remain the visual protagonists [2].
2. **Clarity through vibrancy.** Instead of stacking a bright label on a dark panel, Apple pulls the label's luminance from the layer underneath. Practically: use rgba white for foreground elements and let the backdrop-filter handle contrast [6].
3. **Depth via layered glass.** Each "layer" of the interface sits on a distinct plane. Apple uses exactly 3 elevations: base (canvas), content (panel), floating (popover/tooltip/menu). Never more [2][4].
4. **Concentricity.** Corner radii inherit: a 20px panel contains 12px cards which contain 8px buttons. Radii step down by roughly equal padding gaps [2].
5. **Motion is functional.** Ease-out 250-350ms on open, ease-in 180-220ms on close. No bounce on chrome elements (bounce is reserved for content affordances) [2].

## Material system (with concrete CSS values)

Apple exposes five material levels: ultraThin, thin, regular, thick, chrome [6]. For a dark dashboard with a busy starfield behind, use three:

```css
:root {
  /* v32.8 Liquid Glass material tokens */
  --lg-thin-bg:     rgba(255,255,255,0.04);
  --lg-regular-bg:  rgba(255,255,255,0.07);
  --lg-thick-bg:    rgba(20,20,28,0.72);
  --lg-chrome-bg:   rgba(14,14,22,0.82);

  --lg-blur-thin:    blur(14px) saturate(160%);
  --lg-blur-regular: blur(24px) saturate(180%);
  --lg-blur-thick:   blur(36px) saturate(180%);

  --lg-border:       1px solid rgba(255,255,255,0.10);
  --lg-border-soft:  1px solid rgba(255,255,255,0.06);
  --lg-specular:     inset 0 1px 0 rgba(255,255,255,0.14);

  --lg-label:        rgba(255,255,255,0.88);  /* primary */
  --lg-label-2:      rgba(255,255,255,0.72);  /* secondary */
  --lg-label-3:      rgba(255,255,255,0.52);  /* tertiary */
  --lg-label-4:      rgba(255,255,255,0.36);  /* quaternary, avoid on thin */
  --lg-separator:    rgba(255,255,255,0.08);
  --lg-fill:         rgba(255,255,255,0.06);
  --lg-fill-hover:   rgba(255,255,255,0.10);
}

.panel {
  background: var(--lg-regular-bg);
  backdrop-filter: var(--lg-blur-regular);
  -webkit-backdrop-filter: var(--lg-blur-regular);
  border: var(--lg-border);
  box-shadow: 0 20px 60px rgba(0,0,0,0.45),
              var(--lg-specular);
  border-radius: 20px;
}
```

The `saturate(180%)` step is what makes dark glass feel alive instead of dead grey - it pulls the violet/cyan accents from the starfield up into the panel tint [1][3].

## Hierarchy + elevation (concrete shadow/blur specs)

Three elevations, each with a fixed shadow recipe. Never mix.

```css
/* L0 - canvas (starfield). No shadow. */

/* L1 - sidebars, top HUD. Resting plate. */
.elev-1 {
  box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset,
              0 12px 40px rgba(0,0,0,0.35);
}

/* L2 - cards inside the sidebar (agent rows, preset rows). */
.elev-2 {
  box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset,
              0 6px 18px rgba(0,0,0,0.28);
}

/* L3 - floating: popover, tooltip, context menu, model-buttons overlay. */
.elev-3 {
  box-shadow: 0 1px 0 rgba(255,255,255,0.14) inset,
              0 24px 72px rgba(0,0,0,0.55);
}
```

Hover lift: `transform: translateY(-2px)` with a 220ms ease-out, never a color change on the base. For focus rings use `outline: 2px solid rgba(139,92,246,0.60); outline-offset: 2px;` (violet keeps parity with --mc-sonnet).

Typography scale matching SF Pro cadence: 11 / 13 / 15 / 17 / 22 / 28 px. Line heights 1.35 for body, 1.15 for display. Letter-spacing -0.01em on display, +0.02em on 11px tertiary labels.

Padding rhythm: 8 / 12 / 16 / 20 / 24. Sidebar outer padding 20, row padding 12, chip padding 8/12.

## What Apple AVOIDS (anti-patterns)

- Hard black `#000` backgrounds. Apple's dark mode base is closer to `#0B0B10`/`#14141C` so that materials have something to actually blur [2].
- Neon saturated accents at 100%. Accents are desaturated 10-15% vs the web default and ride on top of glass, not underneath it.
- Multiple competing drop shadows. One ambient shadow per element, period.
- Heavy 2px+ borders. Apple uses 0.5-1px hairlines at rgba white 6-14%.
- Gradients as decoration. Gradients appear only as subtle specular highlights (top 1px inset) or as model pills.
- Over-blurring. Above ~40px blur the backdrop reads as frosted plastic, not glass. Sweet spot is 20-28px [3].
- Stacking more than 3 elevation layers. More = spatial confusion.
- Color-flipping on hover. Hover is lift + brightness, never hue change.
- Emoji as chrome iconography (the v32 SVG icons are already correct; keep them).

## Direct application to v32.8 sidebars

**Left palette sidebar** - L1 plate. `var(--lg-regular-bg)` + `blur(24px) saturate(180%)` + 20px radius on outer + 12px on agent rows. Category headers use 11px +0.04em tertiary labels. Row hover = `--lg-fill-hover` + 2px lift, selected = 1px violet hairline at rgba(139,92,246,0.45).

**Right detail sidebar** - also L1 plate, mirrored radius (20px). The agent avatar orb becomes a concentric 12px card inside. Knowledge sections (WHO / WHAT / NOT / ANTI / FACTS) become L2 cards with 14px radius and `--lg-fill` background. Model buttons (Opus/Sonnet/Haiku) sit as L2 pills, 10px radius, 12/16 padding, with a 1px specular top-edge.

**Top HUD** - thickest glass (`--lg-chrome-bg` + `blur(36px)`) because it sits over the most varied canvas content. HUD cells get rgba(255,255,255,0.04) dividers instead of 1px borders. Cost/CTX pills use L2 elevation.

**Starfield preservation** - Because every panel is translucent, the starfield stays visible at the sidebar edges, at gaps between HUD cells, and subtly through the panels themselves. This is the whole point: the signature motif is never hidden, only filtered through glass.

**Motion budget** - panel open: 280ms cubic-bezier(0.22, 0.61, 0.36, 1). Panel close: 200ms cubic-bezier(0.4, 0, 1, 1). Hover lift: 220ms ease-out. Respect `prefers-reduced-motion: reduce` by collapsing all to 0ms and removing transforms.

## Sources (URLs)

- [1] Apple Newsroom, "Apple introduces a delightful and elegant new software design" - https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/
- [2] WWDC25 Session 356, "Get to know the new design system" - https://developer.apple.com/videos/play/wwdc2025/356/
- [3] CSS-Tricks, "Getting Clarity on Apple's Liquid Glass" - https://css-tricks.com/getting-clarity-on-apples-liquid-glass/
- [4] Think Design, "The Complete Guide to Designing for visionOS" - https://think.design/blog/the-complete-guide-to-designing-for-visionos/
- [5] Josh W. Comeau, "Next-level frosted glass with backdrop-filter" - https://www.joshwcomeau.com/css/backdrop-filter/
- [6] Apple HIG, "Materials" - https://developer.apple.com/design/human-interface-guidelines/materials
- [7] Wikipedia, "Liquid Glass" - https://en.wikipedia.org/wiki/Liquid_Glass
- [8] Nutrient.io, "An In-Depth Look at Blur Effect Materials on iOS" - https://www.nutrient.io/blog/blur-effect-materials-on-ios/
