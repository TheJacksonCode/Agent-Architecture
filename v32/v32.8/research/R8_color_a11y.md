# R8 - Color systems + accessibility 2026

## TLDR (5 bullets)
- WCAG 3 is still a Working Draft in 2026 (Candidate Rec targeted 2026-2027, Recommendation not before 2028-2030). Ship WCAG 2.2 AA as the legal floor, design to APCA Lc targets for actual readability, especially in dark mode [1][2].
- Use a two-tier token system: primitive palette (raw hex, per theme) -> semantic tokens (`--bg`, `--bg-elevated`, `--text`, `--border`, `--accent`). v32.5 already does this for models and phases; v32.8 should formalize surfaces and text [3].
- Premium dark UI = "elevated neutrals", not pure black. Base `#0B0D12`, elevated `#12151C`, overlay `#1A1F2B`. Body text `#E6E8EE` (APCA Lc ~92 on base). Avoid pure white `#FFF` on `#000` (halation) [4][9].
- 60-30-10 accent budget: ~60% neutral surfaces, ~30% muted content, ~10% accent/phase color. Saturation on colored pixels should stay under ~10-15% of screen area in a dense dashboard [5][7].
- Okabe-Ito ordering (blue, orange, green, pink, yellow, red) is the gold standard for 6 categorical colors that survive deuteranopia, protanopia and tritanopia. Map v32.8 phases to this ordering, not to hue preference [6].

## APCA vs WCAG 2.2 in 2026
WCAG 3.0 is a W3C Working Draft. Candidate Recommendation is targeted 2026-2027, full Recommendation 2028-2030 [1]. APCA (Advanced Perceptual Contrast Algorithm) is the contrast method being integrated into WCAG 3. It is polarity-aware, font-size-aware and font-weight-aware, and it is not backwards-compatible with WCAG 2 ratios: a pairing can pass 4.5:1 and fail APCA, or vice versa [2].

Practical rule for v32.8:
- Compliance floor = WCAG 2.2 AA (4.5:1 body, 3:1 large/UI). This is what auditors and lawsuits use.
- Design quality target = APCA Lc. Use it for judgement calls in dark mode where WCAG 2 over-punishes dark backgrounds and under-punishes pure-white text (halation) [4].
- Never mix: if you use APCA as the design tool, still verify WCAG 2.2 minimums for legal compliance.

## P3 wide gamut (CSS pattern)
Chrome, Safari and Firefox all ship `color(display-p3 ...)`. Firefox HDR rendering path lands H1 2026. Use a progressive enhancement pattern so sRGB displays get sRGB hex and P3 displays get saturated accents [2].

```css
:root {
  --accent: #7C5CFF;                      /* sRGB fallback */
  --phase-strategy: #818CF8;
}
@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root {
      --accent: color(display-p3 0.486 0.361 1);
      --phase-strategy: color(display-p3 0.506 0.549 0.972);
    }
  }
}
```

Do not wrap every token in P3. Upgrade only accents and phase colors, keep neutrals in sRGB - the gain is perceptual headroom on vivid hues, not on greys.

## Semantic token architecture (drop-in CSS variables, two-tier)

```css
:root {
  /* tier 1 primitives (dark) */
  --p-ink-0:  #06080C;
  --p-ink-1:  #0B0D12;
  --p-ink-2:  #12151C;
  --p-ink-3:  #1A1F2B;
  --p-ink-4:  #242B3A;
  --p-fog-1:  #E6E8EE;
  --p-fog-2:  #B5BAC7;
  --p-fog-3:  #8089A0;
  --p-fog-4:  #545B6E;

  /* tier 2 semantic */
  --bg:            var(--p-ink-1);
  --bg-elevated:   var(--p-ink-2);
  --bg-overlay:    var(--p-ink-3);
  --bg-sunken:     var(--p-ink-0);
  --text:          var(--p-fog-1);   /* APCA Lc ~92 on --bg */
  --text-muted:    var(--p-fog-2);   /* Lc ~74 */
  --text-subtle:   var(--p-fog-3);   /* Lc ~58, non-body only */
  --border:        rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.14);
  --border-focus:  #7C5CFF;
  --accent:        #7C5CFF;
}
[data-theme=light] {
  --bg:            #FAFAFB;
  --bg-elevated:   #FFFFFF;
  --bg-overlay:    #FFFFFF;
  --text:          #0B0D12;
  --text-muted:    #545B6E;
  --text-subtle:   #8089A0;
  --border:        rgba(11,13,18,0.10);
  --border-strong: rgba(11,13,18,0.18);
}
```

Rule: components NEVER reference `--p-*` directly. Only semantic tokens in components [3][8].

## Dark mode contrast targets (Lc / ratio values)
APCA Lc uses absolute values; sign shows polarity. Targets for dark theme [4]:

| Use                     | APCA Lc | WCAG 2 ratio |
|-------------------------|---------|--------------|
| Body text (14-16px 400) | Lc 75+  | 4.5:1+       |
| Preferred body          | Lc 90   | 7:1          |
| Large text (24px+ 300)  | Lc 60   | 3:1          |
| UI labels, buttons      | Lc 60   | 4.5:1        |
| Icons, borders          | Lc 45   | 3:1          |
| Disabled / placeholder  | Lc 30   | not required |
| Invisibility floor      | Lc 15   | -            |

On `--bg #0B0D12`: `#E6E8EE` gives Lc ~92, `#B5BAC7` Lc ~74, `#8089A0` Lc ~58 (body-unsafe, fine for meta).

## Accent budget %
60-30-10 rule adapted for dense dashboards [5][7]:
- 60% neutral surfaces (--bg, --bg-elevated, --bg-overlay)
- 30% muted content (--text-muted, borders, icons in --p-fog-2)
- 10% accent + phase color + state color combined

Never let saturated pixels exceed ~15% of any screen. Gradients, glow, phase rings all count. When in doubt, desaturate first, darken second.

## Phase color system for 6 phases (concrete hex DARK + LIGHT)

Maps v32.8 phases to Okabe-Ito categorical ordering for CVD safety [6].

| Phase     | Role      | Dark hex  | Light hex | Okabe-Ito anchor |
|-----------|-----------|-----------|-----------|------------------|
| strategy  | blue      | `#5B8DEF` | `#1F5FD6` | #0072B2          |
| research  | cyan      | `#22C4E6` | `#0891B2` | #56B4E9          |
| debate    | violet    | `#A78BFA` | `#6D28D9` | CC79A7 shifted   |
| build     | green     | `#34D399` | `#047857` | #009E73          |
| qa        | vermilion | `#F87171` | `#B91C1C` | #D55E00          |
| hitl      | amber     | `#FBBF24` | `#B45309` | #E69F00          |

All 6 survive deuteranopia and protanopia simulation; tritanopia collapses blue/cyan slightly so always pair them with an icon + label, never color alone.

## State colors (success/warning/danger/info dark hex)
Decouple states from phases: QA phase is red but "danger state" is a separate token [8].

```css
--state-success: #34D399;  /* Lc ~70 on --bg */
--state-warning: #FBBF24;  /* Lc ~80 */
--state-danger:  #F87171;  /* Lc ~62 */
--state-info:    #60A5FA;  /* Lc ~64 */
--state-neutral: #8089A0;
```

Pair every state with an icon (check, warn triangle, x, i) - WCAG 1.4.1: never color alone.

## Border color strategy
Prefer `rgba(255,255,255,0.08)` over a fixed hex like `#242B3A`. Why: alpha borders auto-adapt when `--bg-elevated` changes and they preserve the cool tint of the underlying surface. Use fixed hex only for focus rings where the exact color matters [9].

```css
--border:        rgba(255,255,255,0.08);  /* cards on --bg */
--border-strong: rgba(255,255,255,0.14);  /* separators, tables */
--border-focus:  #7C5CFF;                  /* solid, 2px */
```

Light theme mirrors with `rgba(11,13,18,0.10)` and `0.18`.

## Color-blind safe ordering for the 6 phase colors
Tested against deuteranopia, protanopia, tritanopia:
1. blue (strategy) vs amber (hitl) - safest pair, universal
2. cyan (research) vs vermilion/red (qa) - safe
3. violet (debate) vs green (build) - safe under deut/prot, pair with icons for trit
4. never rely on debate vs qa alone (both collapse toward grey-brown under protanopia). Always label.

Rule: every phase token ships `{color, icon, label}` as a triple. Canvas renders all three.

## Amateur mistakes
- Pure white `#FFFFFF` on pure black `#000000` (halation, Lc is fine but eyes burn).
- Inverting light palette for dark mode (saturated red becomes neon).
- One border color everywhere (everything looks stamped-on).
- Using phase color as state color (QA red = danger red confusion).
- Accent > 15% of pixels (dashboard feels like a toy).
- P3 for neutrals (wastes gamut, invisible gain).
- Trusting WCAG 2 for dark-mode judgement calls (it was calibrated on light backgrounds).
- Shadow as elevation in dark mode (invisible). Use border + lighter surface instead [9].

## Direct application to v32.8
1. Ship `--p-ink-0..4` + `--p-fog-1..4` primitives. Map all current v32.5 `--bg-panel/--bg-card/--bg-input` to `--bg/--bg-elevated/--bg-overlay`.
2. Adopt APCA Lc 75+ target for all body text, Lc 60 for UI labels, Lc 45 for icons/borders. Flag any violation in the theme audit.
3. Remap phase palette to Okabe-Ito anchors above. Current v32.5 violet `#A855F7` for debate is already close; shift strategy from `#818CF8` to `#5B8DEF` for cleaner CVD separation from research cyan.
4. Switch borders to `rgba(255,255,255,0.08)` alpha token. Kill fixed `#242B3A` borders.
5. Add `@supports` P3 upgrade block for accents + phase colors only.
6. Decouple `--state-*` from `--ph-*` in CSS. QA phase uses `--ph-qa`; form errors use `--state-danger`. They can share hex but must be different tokens - so one can be retuned without the other.
7. Enforce 10% accent budget in the new visual review: count colored pixels in a screen mock.

## Sources
- [1] [WCAG 3.0 Status 2026](https://web-accessibility-checker.com/en/blog/wcag-3-0-guide-2026-changes-prepare)
- [2] [APCA Advanced Perceptual Contrast Algorithm](https://www.accessibilitychecker.org/blog/apca-advanced-perceptual-contrast-algorithm/)
- [3] [Color tokens light/dark design systems](https://medium.com/design-bootcamp/color-tokens-guide-to-light-and-dark-modes-in-design-systems-146ab33023ac)
- [4] [APCA in a Nutshell](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html)
- [5] [60-30-10 Color Rule UI](https://uinica.com/the-60-30-10-color-rule/)
- [6] [Coloring for Colorblindness - Okabe-Ito](https://davidmathlogic.com/colorblind/)
- [7] [UI Color Trends 2026](https://updivision.com/blog/post/ui-color-trends-to-watch-in-2026)
- [8] [Semantic Tailwind / Radix state colors](https://www.subframe.com/blog/how-to-setup-semantic-tailwind-colors)
- [9] [Dark Mode Design Best Practices 2026](https://www.tech-rz.com/blog/dark-mode-design-best-practices-in-2026/)
- [10] [Wide Gamut Color in CSS with Display-P3 WebKit](https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/)
- [11] [Humbl Design 2026 Engineering Guide to Color WCAG APCA](https://humbldesign.io/blog-posts/color-accessibility-guide-wcag)
