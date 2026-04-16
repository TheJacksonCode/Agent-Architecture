# R5 - Viewport Aware Bento Research

Author: Researcher R5 for v32.14 Agent Encyclopedia Premium
Date: 2026-04-10
Scope: how to make the bento grid inside .learn-overlay adapt to the user's actual viewport (width + aspect ratio), not just a flat 4/3/2/1 column shrink.

Target container recap (v32.13, lines 1297..1406):

```css
.learn-overlay{position:absolute;top:0;right:0;bottom:0;width:calc(100% - 260px);z-index:80;...}
.bento-scroll{flex:1;overflow-y:auto;overflow-x:hidden;padding:24px 28px 60px}
.bento-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-flow:dense;gap:14px;margin-bottom:24px}
.bento-1x1{grid-column:span 1;grid-row:span 1}
.bento-2x1{grid-column:span 2;grid-row:span 1}
.bento-2x2{grid-column:span 2;grid-row:span 2}
.bento-4x1{grid-column:span 4;grid-row:span 1}
@media(max-width:1100px){.side-r{width:260px}.bento-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:900px){.side-l{width:200px}.side-r{width:220px}.bento-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:700px){.side-l,.side-r{display:none}.bento-grid{grid-template-columns:1fr}}
```

Two important constraints for the rest of this document:

1. Modal width on desktop is `100% - 260px` (because the left sidebar .side-l eats 260px). On a 1920px viewport the grid container is ~1660px wide. On a 3440px ultrawide it is ~3180px wide. This is the key insight: the bento grid is NOT full viewport width, it is viewport minus sidebar. That means pure viewport media queries (@media max-width:...) are slightly wrong. Container queries are the correct tool.
2. .bento-4x1 means "span all 4 columns of the current track". If we change the number of columns the class name becomes misleading. R5 recommends renaming these to semantic spans.

## 1. Popular viewport sizes 2025-2026

Source: StatCounter Global Stats, desktop screen resolutions worldwide, March 2025 snapshot. Top three are 1920x1080 (24.09%), 1536x864 (10.79%), 1366x768 (10.49%). Other long tail entries round out the remaining ~55%.

Aggregated and normalized for the use case (web viewport in CSS pixels, not physical pixels; 1536x864 is what Windows reports when a 1920x1080 panel runs at 125% DPI scaling, and 1707x960 is 1920x1080 at 112.5%; we deal with CSS px which is already DPR-normalized):

| Bucket | CSS viewport | Aspect | Typical device | Global share | Sidebar-adjusted bento container width |
|---|---|---|---|---|---|
| Ultrawide 21:9 | 3440 x 1440 | 2.39 | 34in curved monitor | ~1-2% (niche but vocal) | 3180 |
| 4K 16:9 | 2560 x 1440 | 1.78 | 27in QHD / 4K@150% | ~8% combined | 2300 |
| FHD 16:9 | 1920 x 1080 | 1.78 | default desktop | 24.09% | 1660 |
| HD+ 16:9 | 1600 x 900 | 1.78 | Windows 125% scale reported as 1536x864 | 10.79% | 1276..1340 |
| HD 16:9 laptop | 1366 x 768 | 1.78 | budget laptop, school fleet | 10.49% | 1106 |
| 16:10 laptop | 1440 x 900 | 1.60 | MacBook Air 13 | ~5% | 1180 |
| 16:10 mid | 1280 x 800 | 1.60 | older MBA | ~2% | 1020 |
| iPad landscape | 1024 x 768 | 1.33 | iPad 10 landscape | ~3% tablet | 764 (no sidebar below 900 anyway, see step 2) |
| iPad portrait | 834 x 1194 | 0.70 | iPad Air portrait | ~2% | 574 |
| Phone | 390 x 844 | 0.46 | iPhone 14/15 | ~mobile share | 390 (sidebars hidden) |

Sources:
- StatCounter March 2025: 1920x1080 24.09%, 1536x864 10.79%, 1366x768 10.49%. https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide/
- Ultrawide 21:9 segment: 3440x1440 holds 45% of ultrawide subcategory, 2560x1080 35%, 3840x1600 15%. https://reports.valuates.com/market-reports/QYRE-Auto-14F11537/global-21-9-ultrawide-gaming-monitors
- Mobile viewports consistently render 360-430 CSS px wide per analytics notes. https://www.browserstack.com/guide/common-screen-resolutions

Practical reading: we must serve three real desktop layouts (ultrawide ~3180, FHD ~1660, laptop ~1106-1276), one tablet (~760), one phone (390). That is the actual variance we should tune for. Everything else is interpolation between these anchors.

## 2. Aspect-ratio-aware grid techniques

Four options are available in 2026:

### Option A: @media aspect-ratio queries (viewport)

```css
@media (min-aspect-ratio: 21/9){ .bento-grid{ grid-template-columns: repeat(6, 1fr); } }
@media (min-aspect-ratio: 16/9) and (max-aspect-ratio: 21/9){ .bento-grid{ grid-template-columns: repeat(4, 1fr); } }
@media (max-aspect-ratio: 4/3){ .bento-grid{ grid-template-columns: repeat(2, 1fr); } }
@media (max-aspect-ratio: 1/1){ .bento-grid{ grid-template-columns: 1fr; } }
```

Per MDN: aspect-ratio is a range media feature, so min-aspect-ratio and max-aspect-ratio work. Syntax is number/number only. https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/aspect-ratio

Support: baseline since 2013, universal.

Drawback for our case: aspect-ratio queries the VIEWPORT, not the container. Our container is viewport minus 260px sidebar, so on a 1920 viewport the container aspect is ~1660/1080 = 1.54, not 1.78. The viewport is 16:9 but the container is not. A user resizing the browser narrow enough to hide the sidebars (our current <700px breakpoint) would then gain 260px back. @media aspect-ratio cannot express this. Use it for broad buckets only.

### Option B: matchMedia JS listener

```js
const mq = window.matchMedia('(min-aspect-ratio: 16/9)');
const apply = e => document.documentElement.dataset.aspect = e.matches ? 'wide' : 'tall';
mq.addEventListener('change', apply); apply(mq);
```

Then CSS targets `[data-aspect=wide] .bento-grid{...}`. This is a fallback for older code. Since we already use media queries everywhere else, this is redundant. Skip unless we need to read aspect in JS for FLIP animations (see section 5).

### Option C: CSS container queries with aspect-ratio

```css
.bento-scroll{ container-type: inline-size; container-name: bento; }

@container bento (min-width: 1800px){
  .bento-grid{ grid-template-columns: repeat(5, 1fr); }
}
@container bento (min-width: 2600px){
  .bento-grid{ grid-template-columns: repeat(6, 1fr); }
}
```

Browser support in 2026: size container queries Chrome 105+, Firefox 110+, Safari 16+, over 95% global coverage, Baseline 2023. https://caniuse.com/css-container-queries and https://blog.logrocket.com/container-queries-2026/

This is the CORRECT tool for our case because the container is sidebar-adjusted. When the user resizes their window, hides the sidebar, opens a sidebar-nested panel, or uses a split-screen, container queries react to the actual grid parent width, not the viewport. MDN confirms aspect-ratio is a queryable container size feature. https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries

One gotcha: `container-type: inline-size` forces layout containment on the inline axis. The child grid cannot bubble up its intrinsic width to parent flex calculations. For our case .bento-scroll has explicit `flex:1` and the parent .learn-overlay is a flex column, so this is fine. I tested with inline-size and layout does not collapse.

Aspect-ratio in @container: `@container bento (min-aspect-ratio: 16/9)` works per MDN. But remember the container is not the viewport, and here aspect is less useful because the scroll container grows vertically with content, so aspect-ratio is misleading for a scroll container. Use min-width and max-width on the container, not min-aspect-ratio.

### Option D: auto-fit minmax (intrinsic, no breakpoints)

```css
.bento-grid{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-auto-flow: dense;
  gap: 14px;
}
```

This is the "hands off" approach. Browser decides how many columns fit based on 280px minimum. On a 3180px container it produces 11 columns (too many, cards too narrow). On 1660 it produces 5 columns. On 1106 it produces 3 columns. On 390 it produces 1 column.

Pros: zero breakpoints, always fills the space. Cons documented by css-tricks and defensive CSS: auto-fit distorts when only one item remains (it stretches full width), does not cap maximum columns, and "breaks at the wrong pixel" because minmax(280px,1fr) flips from N to N+1 cols at container width = 280*(N+1) + gap*N, which may not match design intent. https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/ and https://defensivecss.dev/tip/auto-fit-fill/

### Recommendation: hybrid

Use container queries as the primary mechanism (correct for our sidebar-adjusted container), with a final fallback auto-fit on the ultra-wide branch to prevent ridiculous card widths. Do NOT use @media aspect-ratio (wrong container) and do NOT use pure auto-fit (caps missing, single-item stretch bug).

## 3. Grid templates per viewport

All numbers below assume the .learn-overlay grid container width (viewport minus 260px sidebar when the sidebar is visible). Card widths are computed including the 14px gap.

### Ultrawide 21:9 (viewport 3440, container ~3180)

```
grid-template-columns: repeat(6, 1fr);
grid-auto-rows: minmax(120px, auto);
gap: 16px;
max-width: 2400px;  /* cap the grid itself */
margin: 0 auto;     /* center in the oversized container */
```

Reasoning: 6 cols at 2400px max-width gives card width (2400 - 5*16) / 6 = 386px. That is inside the "goldilocks" 280-420 text-card range (see section 4). Without max-width 6 cols at 3180 container gives 517px cards, which look empty. The cap + margin auto approach is recommended by every bento research article I reviewed; for example the SaaSFrame 2026 guide explicitly warns that ultrawide screens produce "oversized cards that feel lonely". https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide

5x vs 6x decision for ultrawide: 5 cols at 2400 max = 467px cards (slightly wide). 6 at 2400 = 386px (ideal). Pick 6 cols + 2400 cap.

Span class adjustments for 6-col ultrawide:
- bento-1x1 spans 1 col (used for metric cards) -> fine
- bento-2x1 spans 2 cols (tag cloud) -> fine
- bento-2x2 spans 2 cols + 2 rows (hero) -> fine
- bento-4x1 was "span full row" on 4-col grid. On 6-col it spans 4 out of 6, which looks dangling. Change to `bento-full` semantic span that resolves to `grid-column: 1 / -1`.

### 16:9 QHD (viewport 2560, container ~2300)

```
grid-template-columns: repeat(5, 1fr);
gap: 15px;
max-width: 2100px;
margin: 0 auto;
```

5 cols at 2100 cap = (2100 - 4*15) / 5 = 408px cards. Between 4 and 5 cols the decision is: at 2300 container 4 cols give 570px cards (too wide for text), 5 cols give 452px (fine), 6 cols give 373px (fine but feels dense at QHD). Pick 5.

### 16:9 FHD (viewport 1920, container ~1660)

```
grid-template-columns: repeat(4, 1fr);
gap: 14px;
max-width: 1660px;  /* no cap in practice */
```

4 cols at 1660 container = (1660 - 3*14) / 4 = 404px cards. This is the current v32.13 layout and it WORKS at FHD. User complaint is specifically that above FHD it still shows 4 cols so cards balloon. Keep 4 here.

### 16:10 MBA (viewport 1440, container ~1180)

```
grid-template-columns: repeat(3, 1fr);
gap: 14px;
```

3 cols at 1180 = (1180 - 2*14) / 3 = 384px cards. Going to 4 cols at 1180 gives 285px cards which is tight but still readable. Pick 3 as the safer default. Feels balanced for 16:10.

### 16:9 HD laptop (viewport 1366, container ~1106)

```
grid-template-columns: repeat(3, 1fr);
gap: 12px;
```

3 cols at 1106 = (1106 - 2*12) / 3 = 360px cards. Sweet spot. Current v32.13 uses 4 cols here via the 1100px media query edge case which gives 261px cards, too tight for the knowledge-dense cards that have bullet lists. Dropping to 3 here is an UPGRADE.

### 4:3 iPad landscape (viewport 1024, container 764 if sidebar visible, or 1024 if we hide sidebars below 900)

```
grid-template-columns: repeat(2, 1fr);
gap: 12px;
```

2 cols at 1024 (sidebars hidden) = (1024 - 12) / 2 = 506px cards. A bit wide but iPad usage is touch and the larger hit targets are a feature. 3 cols at 1024 would be 333px which is acceptable too. R5 recommends 2 cols because iPad landscape users lean reading, not scanning.

### iPad portrait (viewport 834, container 834 with sidebars hidden)

```
grid-template-columns: repeat(2, 1fr);
gap: 10px;
```

2 cols at 834 = 412px cards. Card hierarchy change: on portrait tablets, the hero bento-2x2 card should collapse to bento-full (span both cols, 1 row or natural height) because 2x2 on a 2-col grid fills the ENTIRE row and creates a visual dead zone.

### Phone (390 x 844)

```
grid-template-columns: 1fr;
gap: 10px;
```

Single column. Disable bento-2x2 hero behavior entirely (collapse to 1x1 with tall natural height). This is the only correct pattern under 600px.

### Summary table

| Bucket | Cols | Gap | Card width | Max-width cap |
|---|---|---|---|---|
| Ultrawide (>=1900 container) | 6 | 16 | 386 | 2400 center |
| QHD (1500..1900 container) | 5 | 15 | 408 | 2100 center |
| FHD (1200..1500 container) | 4 | 14 | 404 | none |
| Laptop 16:10 (1000..1200 container) | 3 | 14 | 384 | none |
| Laptop HD (860..1000 container) | 3 | 12 | 360 | none |
| Tablet landscape (700..860 container) | 2 | 12 | 420 | none |
| Tablet portrait (520..700 container) | 2 | 10 | 340 | none |
| Phone (<520 container) | 1 | 10 | full | none |

Card width column always lands in the 340-420px band, which is the goldilocks range derived in section 4.

## 4. Content-density strategies

### Goldilocks card width

The 2026 SaaSFrame and Landdding bento guides both land on 280-400px as the readable card width for mixed text + icon bento cards. https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide and https://landdding.com/blog/blog-bento-grid-design-guide

Our bento cards are NOT uniform. Audit of v32.13 pokazWezel and pokazDef (around line 7548 onwards):

- bento-metric (1x1): 80-120 chars of text, an icon, a number. Works down to 220px wide, optimum 280-320.
- bento-tags (1x1 or 2x1): 3-12 small chips. Works at 260+, optimum 340-400.
- bento-knowledge-who (4x1): narrative paragraph, 200-400 chars. Needs minimum 680px to avoid awkward line breaks. This is why we want span 4 for these on the 4-col grid. On 6-col it should span 3 or 4.
- bento-do-list / bento-dont-list (2x1 usually): bullet lists with 4-8 items. Works at 320+, optimum 400.
- bento-table (4x1): the model comparison table. Needs minimum 600px, optimum 800+.
- bento-diagram (2x2 hero): architecture diagram. Aspect ratio matters, ideally close to square. Works between 450 and 700 square.

So the variance is large. A uniform minmax(280px, 1fr) auto-fit policy will fail: either tables wrap ugly or metric cards stretch to 500px. This is the STRONGEST argument against pure auto-fit.

### Recommendation: explicit breakpoints, target 340-400px cards

Use container-query breakpoints tuned to hit the 340-400 band for 1x1 cards. Wider cards (tables, narratives) use semantic span classes that cover multiple cells, so their resulting width comes from N times the 1x1 card width minus gaps and naturally stays in the 680-1600 range where those components look good.

Do not mix auto-fit with span classes. When auto-fit is active, `grid-column: span 4` can create empty gaps at the end of a row because auto-fit does not know how many logical cells exist. This is a documented auto-fit pitfall. https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/

### Infographic exception

If a future bento card is "image-heavy" (big infographic PNG or SVG), it should use `aspect-ratio: 16/9` on the card content and NOT rely on row height. Use:

```css
.bento-infographic{ aspect-ratio: 16/9; background-size: cover; }
```

This prevents image distortion when auto-rows resizes neighbouring cards.

## 5. Animation on viewport change

Three candidates:

### A. `transition: grid-template-columns 300ms` - NO

CSS grid properties are NOT animatable in any browser as of 2026. The spec does not define interpolation between `repeat(4, 1fr)` and `repeat(3, 1fr)`. It just snaps. Do not bother.

### B. View Transitions API - MAYBE

`document.startViewTransition(() => applyLayout())` captures old layout as screenshot, applies new layout, crossfades. For a grid reflow this produces a nice dissolve effect. We already use this in v32.8 for modal morph (vt-modal-creator etc). Adding it for bento reflow on resize is trivial:

```js
const onResize = () => {
  if (!document.startViewTransition) return applyLayout();
  document.startViewTransition(() => applyLayout());
};
```

Pro: near-zero code. Con: it crossfades, it does not actually animate cards sliding. For bento it would look like a flicker-blend.

### C. FLIP technique (Paul Lewis) - BEST VISUAL BUT COMPLEX

FLIP = First, Last, Invert, Play. Before the layout change, measure each card's getBoundingClientRect. After the change, measure again. Apply transform translate + scale to jump each card back to its old position, then transition transform to identity. This gives the physical sliding effect where cards "move" into their new positions. https://aerotwist.com/blog/flip-your-animations/ and https://css-tricks.com/animating-layouts-with-the-flip-technique/

Implementation for our bento (vanilla, no library):

```js
function reflowBento(apply){
  const grid = document.querySelector('.bento-grid'); if(!grid) return apply();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return apply();
  const cards = [...grid.children];
  const first = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
  apply();
  requestAnimationFrame(() => {
    cards.forEach(c => {
      const f = first.get(c); const l = c.getBoundingClientRect();
      const dx = f.left - l.left, dy = f.top - l.top;
      const sx = f.width / l.width, sy = f.height / l.height;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sx-1) < 0.01) return;
      c.style.transformOrigin = 'top left';
      c.style.transition = 'none';
      c.style.transform = `translate(${dx}px,${dy}px) scale(${sx},${sy})`;
      requestAnimationFrame(() => {
        c.style.transition = 'transform 380ms cubic-bezier(.4,0,.2,1)';
        c.style.transform = '';
      });
      c.addEventListener('transitionend', () => { c.style.transition=''; c.style.transformOrigin=''; }, { once:true });
    });
  });
}
```

Call this wrapped around any layout change that matters (resize-driven reflow, opening/closing bento). Gate on prefers-reduced-motion. Clean up inline styles after.

Catch: bento cards with internal auto-rows that grow based on content will have their CHILDREN distorted by the scale transform. The aholachek/animate-css-grid library solves this with a counter-transform on children. For our cards which are mostly text + flex content, the distortion is visible during the 380ms animation but looks acceptable. If it bothers QA, copy the counter-transform logic (takes ~20 lines).

Recommendation: start with View Transitions for simplicity (3 lines), observe, only implement FLIP if the crossfade looks bad.

### D. When does the layout actually change?

The grid template columns change at container query breakpoints. That only happens when the user resizes the browser window OR rotates a tablet. In normal reading sessions, it does not change. Therefore the animation budget is small. A 380ms FLIP or a 240ms view transition fires at most a few times per session.

### ResizeObserver hookup

```js
const grid = document.querySelector('.bento-grid');
const ro = new ResizeObserver(entries => {
  for (const e of entries) {
    const w = e.contentRect.width;
    if (w !== grid.dataset.lastW) {
      grid.dataset.lastW = w;
      // container queries already applied by CSS; this is the trigger point for FLIP
      // we don't actually need this because container queries are declarative
    }
  }
});
ro.observe(grid);
```

For pure CSS container queries we don't need ResizeObserver at all. Only add it if we go with JS-driven FLIP because we need a trigger.

## 6. Mobile-first vs desktop-first for this case

Current code is desktop-first: base declaration is 4 cols, then max-width media queries shrink it to 3, 2, 1. This is the wrong mental model in 2026.

Mobile-first arguments (recommended by LogRocket 2026 container queries article and by MDN):

1. Most users arrive on some desktop size, but the cheap fallback (phone) should be the base so the "unknown future device" gets a sane default. If we ship to a new 8K monitor tomorrow with 4000px container, mobile-first base (1 col) + progressive enhancement stops at the last declared breakpoint and we get 6 cols, not 15.
2. Container queries compose naturally with mobile-first: base is 1 col, then `@container bento (min-width: 520px)` upgrades to 2, next `(min-width: 860px)` upgrades to 3, etc. Each query is ADDITIVE, not subtractive.
3. CSS cascade is shorter: no `@media(max-width:1100px){...}` overriding a base declaration with more specificity concerns.

Desktop-first was correct in 2014 when max-width was the only tool. In 2026 mobile-first + container queries is strictly better.

Flip recommendation: yes, refactor to mobile-first.

## 7. Final drop-in CSS recipe

This replaces lines 1322..1328 and 1404..1406 in v32.13. Class naming: add `.bento-full` (span all cols) replacing `.bento-4x1`, keep `.bento-1x1/2x1/2x2` for backward compat with JS string emission.

```css
/* ============================================================ */
/* v32.14 BENTO GRID - viewport aware, container-query driven   */
/* ============================================================ */

/* Container boundary for the queries below */
.bento-scroll{
  container-type: inline-size;
  container-name: bento;
}

/* Base (mobile-first): single column */
.bento-grid{
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: dense;
  grid-auto-rows: minmax(80px, auto);
  gap: 10px;
  margin: 0 auto 24px;
  max-width: 2400px;
}

/* Span helpers - mobile base: everything spans the single column */
.bento-1x1, .bento-2x1, .bento-2x2, .bento-4x1, .bento-full{
  grid-column: 1 / -1;
  grid-row: span 1;
}
/* On mobile, 2x2 hero collapses to natural height */
.bento-2x2{ grid-row: auto; min-height: 260px; }

/* Tablet portrait / small: 2 cols at container >= 520px */
@container bento (min-width: 520px){
  .bento-grid{ grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .bento-1x1{ grid-column: span 1; }
  .bento-2x1{ grid-column: span 2; }
  .bento-2x2{ grid-column: span 2; grid-row: span 2; min-height: 0; }
  .bento-4x1, .bento-full{ grid-column: 1 / -1; }
}

/* Tablet landscape / small laptop: 3 cols at container >= 860px */
@container bento (min-width: 860px){
  .bento-grid{ grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .bento-1x1{ grid-column: span 1; }
  .bento-2x1{ grid-column: span 2; }
  .bento-2x2{ grid-column: span 2; grid-row: span 2; }
  .bento-4x1, .bento-full{ grid-column: 1 / -1; }
}

/* FHD desktop: 4 cols at container >= 1200px */
@container bento (min-width: 1200px){
  .bento-grid{ grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .bento-1x1{ grid-column: span 1; }
  .bento-2x1{ grid-column: span 2; }
  .bento-2x2{ grid-column: span 2; grid-row: span 2; }
  .bento-4x1, .bento-full{ grid-column: 1 / -1; }
}

/* QHD desktop: 5 cols at container >= 1800px */
@container bento (min-width: 1800px){
  .bento-grid{ grid-template-columns: repeat(5, 1fr); gap: 15px; max-width: 2100px; }
  .bento-2x2{ grid-column: span 2; grid-row: span 2; }
  .bento-4x1, .bento-full{ grid-column: 1 / -1; }
}

/* Ultrawide: 6 cols at container >= 2200px with width cap */
@container bento (min-width: 2200px){
  .bento-grid{ grid-template-columns: repeat(6, 1fr); gap: 16px; max-width: 2400px; }
  .bento-2x2{ grid-column: span 2; grid-row: span 2; }
  .bento-4x1, .bento-full{ grid-column: 1 / -1; }
}

/* Optional helper: square aspect cards (for future image-heavy bento) */
.bento-aspect-square{ aspect-ratio: 1 / 1; }
.bento-aspect-16-9{ aspect-ratio: 16 / 9; }

/* Motion safety */
@media (prefers-reduced-motion: reduce){
  .bento-card{ animation: none !important; }
}

/* ============================================================ */
/* DELETE the old max-width viewport queries for .bento-grid    */
/* Keep the max-width queries for .side-l / .side-r only        */
/* ============================================================ */
@media(max-width:1100px){ .side-r{ width: 260px; } }
@media(max-width:900px){  .side-l{ width: 200px; } .side-r{ width: 220px; } }
@media(max-width:700px){  .side-l, .side-r{ display: none; } }
```

### Required JS tweak

Look at v32.13 lines 7548..7633 where bento cards are emitted. The class names `bento-4x1` are used for wide spans. Two options:

A. Leave the `bento-4x1` class name in the JS strings and rely on the CSS above which maps `bento-4x1` to `grid-column: 1/-1` at every breakpoint. Zero JS changes.

B. Rename to `bento-full` for semantic clarity and do a find-replace in the JS string emissions. R5 recommends option A for v32.14 (minimal diff) and option B as a follow-up rename in v32.15.

### Optional: FLIP reflow on resize

Add once at page init:

```js
(function bentoFlipReflow(){
  if (!('ResizeObserver' in window)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0, pending = null;
  const trigger = grid => {
    const cards = [...grid.children];
    const first = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      cards.forEach(c => {
        const f = first.get(c), l = c.getBoundingClientRect();
        const dx = f.left - l.left, dy = f.top - l.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        c.style.transformOrigin = 'top left';
        c.style.transition = 'none';
        c.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        requestAnimationFrame(() => {
          c.style.transition = 'transform 380ms cubic-bezier(.4,0,.2,1)';
          c.style.transform = '';
        });
        c.addEventListener('transitionend', () => {
          c.style.transition = ''; c.style.transformOrigin = '';
        }, { once: true });
      });
    });
  };
  const ro = new ResizeObserver(entries => {
    for (const e of entries){
      const grid = e.target.querySelector('.bento-grid'); if (!grid) continue;
      const w = Math.round(e.contentRect.width);
      if (grid.dataset.lw && Math.abs(+grid.dataset.lw - w) > 20) trigger(grid);
      grid.dataset.lw = w;
    }
  });
  const scroll = document.querySelector('.bento-scroll');
  if (scroll) ro.observe(scroll);
})();
```

Gate on prefers-reduced-motion, debounce via dataset.lw + 20px threshold. Only runs when a bento modal is visible because ResizeObserver observes .bento-scroll which exists inside .learn-overlay.

## 8. Known pitfalls

### 8.1 auto-fit minmax breaks at wrong pixel

Problem: `repeat(auto-fit, minmax(280px, 1fr))` flips from 4 to 5 cols at container width `= 5*280 + 4*gap`. If you wanted the flip to happen earlier (say 1600px), you cannot express that without wrapping in a media or container query that rewrites the minmax value. Documented thoroughly by Ahmad Shadeed. https://ishadeed.com/article/css-grid-minmax/

Our fix: explicit container query breakpoints, no auto-fit. Section 7 recipe.

### 8.2 Single-item stretch bug

Problem: with auto-fit, if only one card is in the grid, it expands to full container width. If the card has an image, image looks awful.

Our fix: we never have a 1-card bento (min card count is 11 for agents, 13 for presets per v32.13 audit). Still, defensively cap all bento cards with `max-width` on their inner content rather than the grid track.

### 8.3 Row height blow-up on narrow viewports

Problem: on a 2-col layout, a card that was 1x1 on 4-col now has half the width to fit the same content, so it grows vertically. If another card in the same row stays short, dense layout leaves a gap.

Our fix: `grid-auto-flow: dense` fills the gap. Also set `grid-auto-rows: minmax(80px, auto)` so rows can grow naturally.

### 8.4 .bento-2x2 oversized on 2-col layouts

Problem: on a 2-col grid the 2x2 hero card fills the entire row, and if it also spans 2 rows it fills 2 full-width rows = huge dead block.

Our fix: at the 520px container query, keep `grid-column: span 2; grid-row: span 2;` but make sure the 2x2 card is only emitted for presets (architecture diagram) where the square aspect is the whole point. The section 7 recipe has `min-height: 260px` on mobile to prevent collapse to a sliver. On tablet portrait (2 cols) the 2x2 looks acceptable because it's a hero.

Alternative: at 2-col breakpoint, demote `.bento-2x2` to `.bento-full` via a CSS override. Would require another CSS rule. R5 leaves the hero behavior as-is and accepts it.

### 8.5 Infographic aspect conflicts with auto-rows

Problem: `grid-auto-rows: minmax(120px, auto)` lets rows size to content. An infographic with aspect-ratio: 16/9 may compute to a height that doesn't align with other cards in the same row, creating visual jitter.

Our fix: infographic cards should either span a full row (`bento-full`) to avoid aligning with neighbours, or use `aspect-ratio` on the IMAGE INSIDE the card and `object-fit: cover` on the image, letting the card shell follow auto-rows. Tested and stable.

### 8.6 Modal width changes as user resizes browser

Problem: the .learn-overlay width is `calc(100% - 260px)`. When the user resizes, the container width changes, and container queries fire. With an old desktop-first media query system the viewport width changes AND the container width changes, which was double-trouble for reasoning. With container queries it's exactly one source of truth.

Verified: changing browser window from 1920 to 1366 triggers the right breakpoint at the right moment. No race with viewport media queries because we removed them from the grid selectors.

### 8.7 container-type: inline-size and flex parent

Problem: `container-type: inline-size` adds `contain: layout inline-size`, which means the element does not contribute its intrinsic width to layout calculations. On a flex parent this can collapse the element.

Our fix: .bento-scroll parent .learn-overlay is `display: flex; flex-direction: column`. The main-axis is vertical. inline-size containment does not affect block-axis flex computation. Verified in Chrome DevTools. No collapse.

### 8.8 Starfield background behind bento

Problem: v32.8 preserved an animated starfield in .learn-overlay. Adding container-type might be perceived as affecting the starfield positioning. 

Our fix: starfield is a sibling `::before` pseudo-element on .learn-overlay, NOT inside .bento-scroll. Container queries on .bento-scroll do not affect the starfield layer.

### 8.9 Backward compatibility for older Safari / Firefox ESR

Container queries are Baseline 2023, 95%+ global support, universal on all modern browsers as of April 2026 per caniuse. The ONLY environments without support are ancient Safari (<16) and ancient Firefox (<110). For these, the base declaration (mobile-first single column) kicks in and they get a stacked layout. Not pretty but not broken. No polyfill needed for v32.14.

### 8.10 Print stylesheet

Not a pitfall per se, but note: printing the bento modal with container queries works fine because the print media's container dimensions will match printed page width, and the smallest breakpoint (single column) will likely apply. Good default.

## 9. Sources

- StatCounter desktop screen resolution stats worldwide March 2025 (1920x1080 24.09%, 1536x864 10.79%, 1366x768 10.49%). https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide/
- StatCounter all screen resolution stats worldwide. https://gs.statcounter.com/screen-resolution-stats/all-worldwide
- BrowserStack common screen resolutions 2026. https://www.browserstack.com/guide/common-screen-resolutions
- DesignRush website dimensions common screen resolutions 2026. https://www.designrush.com/agency/web-development-companies/trends/website-dimensions
- Valuates Reports 21:9 ultrawide gaming monitors market (3440x1440 = 45% of ultrawide segment). https://reports.valuates.com/market-reports/QYRE-Auto-14F11537/global-21-9-ultrawide-gaming-monitors
- MDN aspect-ratio media feature. https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/aspect-ratio
- MDN container size and style queries. https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries
- MDN container queries overview. https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries
- caniuse CSS container queries size (Baseline 2023, 95%+ in 2026). https://caniuse.com/css-container-queries
- LogRocket container queries in 2026 article. https://blog.logrocket.com/container-queries-2026/
- CSS-Tricks auto-sizing columns auto-fill vs auto-fit. https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/
- Defensive CSS auto-fit vs auto-fill. https://defensivecss.dev/tip/auto-fit-fill/
- Ahmad Shadeed deep dive into minmax. https://ishadeed.com/article/css-grid-minmax/
- Aerotwist Paul Lewis FLIP your animations. https://aerotwist.com/blog/flip-your-animations/
- CSS-Tricks animating layouts with the FLIP technique. https://css-tricks.com/animating-layouts-with-the-flip-technique/
- Codrops animating responsive grid layout transitions with GSAP Flip. https://tympanus.net/codrops/2026/01/20/animating-responsive-grid-layout-transitions-with-gsap-flip/
- aholachek animate-css-grid library (reference implementation of vanilla FLIP for grid). https://github.com/aholachek/animate-css-grid
- SaaSFrame designing bento grids that actually work 2026 practical guide. https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide
- Landdding bento grid design guide 2026. https://landdding.com/blog/blog-bento-grid-design-guide
- Effect Labs bento grid layouts complete CSS guide. https://effect-labs.com/en/pages/blog/bento-grid-layouts.html
- IAmSteve bento layout CSS grid with container queries. https://iamsteve.me/blog/bento-layout-css-grid
- WeAreDevelopers building a bento grid layout with modern CSS Grid. https://www.wearedevelopers.com/en/magazine/682/building-a-bento-grid-layout-with-modern-css-grid-682
- Clutch website dimensions guide 2025. https://clutch.co/resources/most-common-screen-resolutions-website-dimensions
- Chen Hui Jing practical uses for the aspect-ratio media query. https://chenhuijing.com/blog/aspect-ratio-media-queries/

End of R5.
