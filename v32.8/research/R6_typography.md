# R6 - Premium typography 2026

## TLDR (5 bullets)
- Neo-grotesques (Inter, Geist, Sohne, GT America) have replaced geometric sans like Poppins/Montserrat as the dominant "premium" UI tone in 2026 [1][2]. For a dark, Apple/Google-elegant admin, ship InterVariable as default and Geist Mono or JetBrains Mono for code and HUD numerics.
- Variable fonts are now baseline, not trend. The axes premium apps actually tune are wght and opsz. slnt and GRAD are niche and rarely needed for dashboards [3][4].
- Three OpenType features move the needle from amateur to premium: tnum (tabular numerics for HUDs), cv11 (single-storey a for cleaner headings), and zero (slashed zero for money, IDs, metrics) [5][6].
- Type scale must be the 4px grid: 11/12/13/14/16/18/24/32/48 with line-heights 1.1 display, 1.3 dense list, 1.5 body. Avoid 10px (unreadable) and 15px/17px (dated bootstrap smell).
- Dark mode needs +1 relative weight and about +0.005em tracking on small text. Thin weights below 400 on dark backgrounds is the single biggest amateur signal after #000 backgrounds and Poppins headings [7][8].

## Font shortlist (free + premium)
Primary free picks for a premium dark dashboard, ranked:
1. InterVariable [4] - free OFL, variable wght 100-900 + opsz 14-32, 40+ OT features, the category reference for UI. Default choice.
2. Geist Sans + Geist Mono [2] - free OFL by Vercel, variable, opinionated neo-grotesque that pairs perfectly with code, strong on dark backgrounds. Slight roundness so less "enterprise cold" than Inter.
3. JetBrains Mono [9] - free OFL, 8 weights true italics, 139 programming ligatures, the most readable free mono at 12-13px on dark. Best for the simulation log and Mermaid export views.
4. Geist Mono [2] - cleaner than JB Mono, less personality, great for HUD numerics and table cells.
5. Commit Mono [9] - free, intentionally neutral, ideal if Geist Mono feels too branded.

Premium licensed (for reference, NOT to bundle):
- Sohne (Klim), GT America (Grilli Type), SF Pro (Apple restricted) - the "ChatGPT / Linear / Vercel marketing" tier.
- Berkeley Mono, MonoLisa, Operator Mono - the premium dev mono tier, only meaningful in editors [9].

Recommendation for v32.8: InterVariable everywhere, Geist Mono for HUD numerics and code blocks. Zero licensing cost, instantly reads as "Linear / Vercel / Arc" premium.

## Variable axes that matter
In practice dashboards only touch two axes:

```css
/* wght: 100-900 continuous */
font-variation-settings: "wght" 520;

/* opsz: Inter is 14-32 */
font-variation-settings: "wght" 520, "opsz" 14;
```

- wght: use non-standard values (440, 520, 580) instead of 400/500/600 to look tuned, not stock [3][4].
- opsz: let the browser handle it with `font-optical-sizing: auto` on body, manual override only on display text. Inter's display cut (opsz 32) has thinner strokes and more contrast, exactly what a hero title wants [3][4].
- slnt and GRAD: skip. slnt looks like a typo on dense UI, GRAD is only Roboto Flex and adds payload without payoff.

## OpenType features for premium feel
Enable globally on body, then selectively unlock per context.

Always on for a premium feel:
- `"calt" 1` contextual alternates (Inter shaping fixes)
- `"liga" 1` standard ligatures
- `"kern" 1` kerning (on by default but be explicit)
- `"ss03" 1` on Inter for softer curves (optional, more "product" feel) [6]
- `"cv11" 1` on Inter for single-storey a in headings [5][6]

Numerics contexts (HUD, cost badge, tables):
- `"tnum" 1` tabular figures so 1 and 8 share width, no jitter [5][10]
- `"lnum" 1` lining figures (default is lining on Inter but be explicit)
- `"zero" 1` slashed zero - critical for token counts, IDs, and cost strings like "$0.40" [6]

Avoid in UI: `dlig` (discretionary ligatures, feels "wedding font"), `smcp` at small sizes (muddy on dark), `onum` (old-style figures, clash with data UIs).

## Type scale (drop-in CSS variables)
8/4-grid, modular but not rigid. Every v32.8 component should pull from these.

```css
:root{
  /* font stacks */
  --ff-sans: "InterVariable", "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif;
  --ff-mono: "Geist Mono", "JetBrains Mono", "SF Mono", "Cascadia Code", ui-monospace, Menlo, Consolas, monospace;
  --ff-display: "InterVariable", "Inter", system-ui, sans-serif;

  /* scale (px) */
  --fs-10: 10px; /* DO NOT USE, escape hatch only */
  --fs-11: 11px; /* badges, meta, phase pills */
  --fs-12: 12px; /* sidebar secondary, chips */
  --fs-13: 13px; /* sidebar primary, dense body */
  --fs-14: 14px; /* body default */
  --fs-16: 16px; /* comfortable body, modal body */
  --fs-18: 18px; /* section headings */
  --fs-24: 24px; /* panel title */
  --fs-32: 32px; /* page hero */
  --fs-48: 48px; /* marketing hero only */

  /* line-heights */
  --lh-tight: 1.1;   /* display 24+ */
  --lh-snug: 1.3;    /* dense sidebar lists, 11-13px */
  --lh-normal: 1.45; /* mid 14-16px */
  --lh-body: 1.55;   /* paragraph 16px */

  /* tracking */
  --tr-display: -0.02em;  /* tighten big text */
  --tr-title: -0.01em;    /* 18-24 */
  --tr-body: 0;            /* 14-16 */
  --tr-dense: 0.005em;     /* 11-13 on dark */
  --tr-micro: 0.04em;      /* ALL CAPS labels */

  /* weights (variable) */
  --fw-regular: 420;
  --fw-medium: 520;
  --fw-semibold: 580;
  --fw-bold: 680;
}

html, body{
  font-family: var(--ff-sans);
  font-size: var(--fs-14);
  line-height: var(--lh-normal);
  font-optical-sizing: auto;
  font-feature-settings: "kern" 1, "calt" 1, "liga" 1, "cv11" 1;
  font-variation-settings: "wght" 420;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

## Line-height system
- Display 32-48: `line-height: 1.1` with `letter-spacing: -0.02em`. Negative tracking is the #1 marker of a modern display type [1][7].
- Titles 18-24: `line-height: 1.25` with `-0.01em`.
- Body 14-16: `line-height: 1.5`, tracking 0.
- Dense lists 11-13: `line-height: 1.3` (snug, not tight). 1.1 collapses ascenders on "gj", 1.5 wastes vertical space.
- Code / HUD 12-13 mono: `line-height: 1.4`.

## Sidebar dense list typography (concrete CSS)
The left sidebar palette items and agent rows in v32.8. This is where "premium vs amateur" is decided.

```css
.pa-item{
  font-family: var(--ff-sans);
  font-size: var(--fs-13);           /* 13px, not 14, not 12 */
  line-height: var(--lh-snug);       /* 1.3 */
  font-variation-settings: "wght" 500;
  letter-spacing: var(--tr-dense);   /* 0.005em on dark */
  font-feature-settings: "cv11" 1, "calt" 1, "ss03" 1;
  color: var(--t1);
}
.pa-item .pa-desc{
  font-size: var(--fs-11);           /* 11px meta */
  line-height: 1.35;
  font-variation-settings: "wght" 420;
  letter-spacing: 0.01em;
  color: var(--t2);
}
.pa-cat{                              /* ALL CAPS category header */
  font-size: var(--fs-11);
  font-variation-settings: "wght" 600;
  letter-spacing: var(--tr-micro);   /* 0.04em */
  text-transform: uppercase;
  color: var(--t3);
}
```

## Topbar HUD numeric typography (concrete CSS)
Cost badges, token counts, timer, context usage. Must not jitter when values change.

```css
.hud-num{
  font-family: var(--ff-mono);
  font-size: var(--fs-13);
  line-height: 1;
  font-variation-settings: "wght" 500;
  font-feature-settings: "tnum" 1, "lnum" 1, "zero" 1, "calt" 0;
  font-variant-numeric: tabular-nums slashed-zero lining-nums;
  letter-spacing: 0;
  font-feature-settings: "tnum", "zero", "lnum"; /* fallback for older engines */
}
.hud-label{
  font-family: var(--ff-sans);
  font-size: 10px;                   /* labels can be 10, numbers cannot */
  font-variation-settings: "wght" 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--t3);
}
```

`font-variant-numeric: tabular-nums slashed-zero lining-nums` is the modern spelling and should be preferred, with `font-feature-settings` as the fallback [10].

## Letter-spacing in dark mode
On dark backgrounds, rasterized text visually dilates (stem thickening). Compensate with:
- Body 14-16px: tracking 0 or +0.002em.
- Dense 11-13px: +0.005em to +0.01em.
- ALL CAPS labels: +0.04em to +0.06em (always, dark or light).
- Display 32+: -0.02em.
- Bump weights one step relative to light mode - where light uses 400, dark uses 440 to 460 (variable font cheat) [7][8].

## Amateur signals to AVOID
1. Poppins, Montserrat, Nunito, Quicksand as primary UI. Instantly 2018 [1].
2. True #000000 background with #FFFFFF text. Blooming, halation, amateur [7][8].
3. Thin or light weights under 400 on dark. Invisible on low-end panels [7].
4. Helvetica or Arial as a "safe" fallback-only stack. System stack is better.
5. 10px body text. Fine for a micro label, never for readable content.
6. Line-height 1.0 on body text. Collapses descenders.
7. Em dashes used as decorations (project rule, also bad typography when unspaced).
8. Mixing three or more typefaces. Two max: one sans, one mono.
9. Proportional numerics in tables or HUDs (jitter on update) [5][10].
10. Justified text anywhere in a dashboard.
11. Hard-coded `font-weight: bold` with a variable font (wastes the axis).
12. Missing `font-optical-sizing: auto` when you shipped a font that supports opsz.
13. Letter-spacing 0 on ALL CAPS labels.
14. Inter without `cv11` or `ss03` in brand headings. Looks like the default Figma demo.
15. Using `font-feature-settings` to set weight (common Tailwind plugin bug).

## Direct application to v32.8
Concrete changes for `AGENT_TEAMS_CONFIGURATOR_v32_8.html`:

1. Add `@font-face` or `<link>` for InterVariable and Geist Mono (both free OFL). Self-host under `/v32.8/fonts/` to keep offline single-file ideal - or use Google Fonts for Inter and the Vercel CDN for Geist Mono if online.
2. Replace the current font stack (Space Grotesk / Inter / JetBrains Mono from v13 onwards) with the `--ff-sans` / `--ff-mono` variables above. Space Grotesk is fine but less refined than Inter at 13px dense body.
3. Add the `:root` type scale variable block above to the top of the `<style>` block.
4. Patch body rules in one sweep, adding `font-optical-sizing: auto` and the global feature settings.
5. Patch `.pa-item`, `.pa-desc`, `.pa-cat`, `.nd` label text, `.pr-name`, `.pr-desc` with the dense list recipe. Expected visual upgrade is significant at 13px.
6. Patch all numeric HUD cells (`.hud-num`, `.cbm-kpi`, cost topbar cells, CTX bar, timer in Mission Control, Live Monitor metrics, Dialog Timeline phase pills) to use the `hud-num` recipe - tabular-nums and slashed-zero.
7. Display elements (page title, modal titles `h1`/`h2`) get `letter-spacing: -0.02em` and `font-variation-settings: "wght" 620, "opsz" 32`.
8. Kill any remaining hard `font-weight: bold` in favor of wght 580 or 680 via variation settings.
9. Expected before/after: the app should read like Linear or Vercel dashboard, not like a Bootstrap admin template.

## Sources
[1] Made Good Designs, Trending Fonts in 2026, madegooddesigns.com/trending-fonts/
[2] Vercel, Geist font, vercel.com/font
[3] MDN Web Docs, font-variation-settings, developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings
[4] RSMS, Inter font family, rsms.me/inter/
[5] Responsive Web Typography, Facts about figures numeric styles with OpenType features, rwt.io/typography-tips/facts-about-figures-numeric-styles-opentype-features
[6] Lexington Themes, How to use Inter stylistic sets and OpenType features in CSS Tailwind, lexingtonthemes.com/blog/inter-stylistic-sets-css-tailwind
[7] Design Shack, Typography in Dark Mode How to Optimize Fonts for Low Light UI, designshack.net/articles/typography/dark-mode-typography/
[8] Tech-RZ, Dark Mode Design Best Practices in 2026, tech-rz.com/blog/dark-mode-design-best-practices-in-2026/
[9] Made Good Designs, Best Coding Fonts 20+ Monospace Typefaces for Developers 2026, madegooddesigns.com/coding-fonts/
[10] MDN Web Docs, font-variant-numeric, developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
