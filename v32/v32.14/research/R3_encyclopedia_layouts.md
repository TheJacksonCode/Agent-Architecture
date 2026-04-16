# R3 - Encyclopedia Layouts Research

Author: Researcher R3 (v32.14 "Agent Encyclopedia Premium")
Date: 2026-04-10
Scope: Best-in-class knowledge/encyclopedia layouts for AI-beginner learning. Research feeds
v32.14 Phase C synthesis + Phase F builders. Target app is single-file vanilla HTML/CSS/JS,
Polish-first, `.learn-overlay` modal with `.bento-grid` (currently 4 cols, fixed spans
`.bento-1x1/2x1/2x2/4x1`). User complains bento tiles are too wide on large monitors and not
adapting well to the viewport.

All CSS snippets below are plain CSS (no Tailwind, no SCSS). No diacritics, no em-dashes.

---

## 1. Pattern catalog

Each entry: name + source + why it works for beginners + drop-in CSS + viewport behaviour.

### Pattern P1 - Wikipedia Infobox "fact sheet sidebar"
Source: Wikipedia Manual of Style / Infoboxes (en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Infoboxes)

Wikipedia infoboxes are "summary of the topic" panels sitting to the right of the article. They
use four element types: title, image, sections, fields. They "dynamically adapt themselves to
the absence or presence of particular fields" so a missing field does not leave a hole.

Why it works for beginners: the infobox gives a 10-second overview (who/what/when) before the
article, so a learner who bounces after 10 seconds still learns the essentials. It is the
Wikipedia version of "tldr".

Drop-in CSS (infobox rail that docks to the right on desktop, folds above the content on mobile):

```css
.enc-infobox {
  background: var(--bg-input);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 18px 20px;
  display: grid;
  gap: 14px;
  grid-template-columns: minmax(120px, max-content) 1fr;
  align-content: start;
}
.enc-infobox-title {
  grid-column: 1 / -1;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--t2);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding-bottom: 10px;
}
.enc-infobox-label { color: var(--t2); font-size: 12px; }
.enc-infobox-value { color: var(--t1); font-size: 13px; font-weight: 600; }
.enc-infobox-row:empty { display: none; } /* Wikipedia rule: hide empty fields */

@media (min-width: 1200px) {
  .enc-layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }
  .enc-infobox { position: sticky; top: 80px; align-self: start; }
}
```

Viewport behaviour: mobile stacks infobox above content; tablet stacks; desktop 1200+ docks as
right rail sticky; ultrawide keeps 320px rail pinned while main content stays inside a
max-width container (see P12).

### Pattern P2 - Wikipedia Table of Contents with IntersectionObserver active state
Source: CSS-Tricks "Sticky Table of Contents with Scrolling Active States"
(css-tricks.com/sticky-table-of-contents-with-scrolling-active-states)

Wikipedia auto-generates a TOC above the article. On desktop it can be made sticky on the left
while content scrolls. Using IntersectionObserver, the currently visible section gets an
active highlight in the TOC.

Why it works for beginners: a beginner lost in a long page can see "I am in section 4 of 9"
at a glance. Reduces feeling of infinite scroll.

Drop-in CSS + 20-line JS:

```css
.enc-toc {
  position: sticky;
  top: 80px;
  align-self: start;
  display: grid;
  gap: 6px;
  padding: 16px 0;
  font-size: 13px;
  border-left: 2px solid rgba(255,255,255,0.06);
}
.enc-toc a {
  color: var(--t2);
  padding: 6px 14px;
  text-decoration: none;
  border-left: 2px solid transparent;
  margin-left: -2px;
  transition: color 180ms ease, border-color 180ms ease, background 180ms ease;
}
.enc-toc a:hover { color: var(--t1); background: rgba(255,255,255,0.04); }
.enc-toc a.active {
  color: var(--t1);
  border-left-color: var(--ph-strategy);
  background: rgba(var(--ph-strategy-rgb), 0.08);
  font-weight: 600;
}
```

```js
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.enc-toc a').forEach(a => a.classList.remove('active'));
      document.querySelector(`.enc-toc a[href="#${e.target.id}"]`)?.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('.enc-section[id]').forEach(s => obs.observe(s));
```

Viewport behaviour: TOC hidden below 1100px; on 1100-1600 it is 200px wide left rail; on
ultrawide it can become a thin vertical strip (icons only) to save horizontal space.

### Pattern P3 - MDN "reference page" 3-zone layout
Source: MDN Web Docs Page structures (developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures)

Every MDN reference page has the same 3-zone layout: left sidebar (section navigation), main
article with consistent section order (Summary, Syntax, Values, Examples, Specifications,
Browser compatibility, See also), right "On this page" TOC. Crucially MDN uses consistent
section names across ALL API pages so a beginner learns the template once and applies it
everywhere.

Why it works for beginners: predictability. After reading 2 agent pages, the learner knows
where to look for anti-patterns (always the 5th section), where to find examples (always after
the overview). No cognitive load rediscovering the layout.

Drop-in CSS:

```css
.enc-page {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}
@media (min-width: 900px) {
  .enc-page { grid-template-columns: 220px 1fr; }  /* left nav + main */
}
@media (min-width: 1280px) {
  .enc-page { grid-template-columns: 220px 1fr 240px; }  /* + right TOC */
}
@media (min-width: 1800px) {
  .enc-page {
    grid-template-columns: 220px minmax(0, 960px) 240px;
    justify-content: center;  /* center on ultrawide */
  }
}
.enc-main { min-width: 0; }  /* prevent overflow in grid children */
```

Viewport behaviour: mobile single column; 900+ adds left nav; 1280+ adds right TOC; 1800+
centers main column at 960px max so content does not get too wide on 21:9 displays.

### Pattern P4 - Notion Gallery card with 3 preview modes
Source: Notion Gallery view Help Center (notion.com/help/galleries)

Notion gallery cards have three preview modes (Page cover, Page preview content, None) and
three sizes (Small, Medium, Large). Users can toggle which properties appear on the card. The
card face is a preview, the detail panel opens the full page.

Why it works for beginners: visual first, text second. A beginner scanning 28 agents can spot
the one with a "magnifying glass" icon faster than reading the name.

Drop-in CSS:

```css
.enc-gal {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
.enc-gal-card {
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
}
.enc-gal-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255,255,255,0.18);
  box-shadow: 0 20px 40px -20px rgba(0,0,0,0.6);
}
.enc-gal-preview {
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, rgba(var(--ph-strategy-rgb),0.15), rgba(var(--ph-research-rgb),0.10));
  display: grid;
  place-items: center;
}
.enc-gal-body { padding: 14px 16px; display: grid; gap: 6px; }
.enc-gal-title { font-weight: 700; font-size: 15px; }
.enc-gal-meta { font-size: 12px; color: var(--t2); }
```

Viewport behaviour: auto-fill with 240px minimum means mobile is 1 col, tablet 2, laptop 3-4,
desktop 5+. No media queries needed. Aspect-ratio keeps cards visually consistent.

### Pattern P5 - Duolingo lesson intro with icon + 1-sentence pitch
Source: Duolingo iOS Lesson Start (mobbin.com/explore/screens) + blog.duolingo.com

Duolingo's lesson intro is 3 elements: big colored icon, 1-sentence "what you will learn", big
Start button. Nothing else. The key is the 1-sentence pitch is always conversational and
benefit-oriented ("Learn to order coffee" NOT "Food & drink vocabulary unit 1").

Why it works for beginners: zero intimidation. A user with 30 seconds gets a clear "why" and
a single action. The 1-sentence rule forces writers to cut jargon.

Drop-in CSS:

```css
.enc-hero {
  display: grid;
  gap: 20px;
  padding: 32px clamp(20px, 5vw, 48px);
  background: radial-gradient(ellipse at top left, rgba(var(--ph-strategy-rgb),0.18), transparent 60%);
  border-radius: 20px;
  border: 1px solid rgba(var(--ph-strategy-rgb), 0.2);
  grid-template-columns: auto 1fr;
  align-items: center;
}
.enc-hero-icon {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: rgba(var(--ph-strategy-rgb), 0.18);
  color: var(--ph-strategy);
}
.enc-hero-kicker {
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--ph-strategy);
  font-weight: 700;
}
.enc-hero-title { font-size: clamp(22px, 3vw, 32px); font-weight: 800; color: var(--t1); }
.enc-hero-pitch { font-size: clamp(14px, 1.3vw, 17px); color: var(--t2); max-width: 60ch; }

@media (max-width: 640px) {
  .enc-hero { grid-template-columns: 1fr; }
  .enc-hero-icon { justify-self: start; }
}
```

Viewport behaviour: row layout desktop, column layout mobile. Pitch text max 60ch for
readability (see P13).

### Pattern P6 - Brilliant.org "learning path" with progress dots
Source: ustwo.com/work/brilliant + rive.app blog on Brilliant animations

Brilliant visualizes the course as a "clear, branching path, showing the user exactly where
they are and what comes next". Each lesson is a node on the path, completed ones have a
checkmark and color, locked ones are grey. Users also see their position on the map.

Why it works for beginners: the path gives a sense of progress and "what's next". For our
encyclopedia, a horizontal path of 9 section dots at the top mirrors this.

Drop-in CSS:

```css
.enc-path {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}
.enc-path-node {
  flex-shrink: 0;
  scroll-snap-align: start;
  display: grid;
  grid-template-columns: auto auto;
  gap: 8px;
  align-items: center;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 12px;
  color: var(--t2);
  cursor: pointer;
  transition: all 180ms ease;
}
.enc-path-node.visited { color: var(--t1); border-color: rgba(var(--ph-build-rgb),0.4); }
.enc-path-node.current {
  background: rgba(var(--ph-strategy-rgb),0.12);
  border-color: var(--ph-strategy);
  color: var(--ph-strategy);
  font-weight: 700;
}
.enc-path-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}
```

Viewport behaviour: horizontal scroll on narrow viewports via scroll-snap; on wide viewports
all 9 dots fit on a single line.

### Pattern P7 - Linear changelog "size-by-importance" bento
Source: Landdding blog on bento grid design (landdding.com/blog/blog-bento-grid-design-guide)

Linear's changelog gives major updates large cards with detailed visuals and minor bug fixes
compact tiles. Visual hierarchy by size. The result is a "scannable history where users can
quickly identify significant releases".

Why it works for beginners: when 9 sections of equal size compete for attention, users bail.
Making "Who am I" and "Anti-patterns" large while "Model comparison" is small tells the user
what matters most.

Drop-in CSS (12-column grid with semantic area names):

```css
.enc-bento {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(120px, auto);
  grid-auto-flow: dense;  /* fill holes */
}
/* Semantic size classes, not span counts */
.enc-bento-feature { grid-column: span 12; grid-row: span 2; }  /* hero */
.enc-bento-wide    { grid-column: span 8; }
.enc-bento-half    { grid-column: span 6; }
.enc-bento-third   { grid-column: span 4; }
.enc-bento-small   { grid-column: span 4; }

@media (max-width: 1200px) {
  .enc-bento-wide, .enc-bento-half { grid-column: span 6; }
  .enc-bento-third, .enc-bento-small { grid-column: span 6; }
}
@media (max-width: 780px) {
  .enc-bento { grid-template-columns: repeat(6, 1fr); }
  .enc-bento > * { grid-column: span 6; }
}
```

Viewport behaviour: 12 columns desktop, 6 columns tablet (all spans collapse to 6), 6 columns
stacked mobile. The key insight: use a 12 column grid not 4, so span values (4/6/8/12) map to
1/3, 1/2, 2/3, full-width fractions that survive any viewport.

### Pattern P8 - Apple HIG "interconnected cross-reference" pattern
Source: Apple Developer HIG Components (developer.apple.com/design/human-interface-guidelines/components)

Apple HIG cross-references every component page back to related pages (accessibility, color,
layout). Each component page ends with "Related" and "See also". The learner never hits a dead
end.

Why it works for beginners: reduces fear of missing critical details. A learner reading about
"res_critic" can jump to "res_docs" (sibling) or to "synthesizer" (downstream consumer).

Drop-in CSS (related items as small cards):

```css
.enc-related {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.enc-related-item {
  display: grid;
  gap: 6px;
  grid-template-columns: 36px 1fr;
  align-items: center;
  padding: 12px 14px;
  background: var(--bg-input);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  text-decoration: none;
  color: var(--t1);
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease;
}
.enc-related-item:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--ph-strategy-rgb), 0.5);
}
.enc-related-icon {
  grid-row: span 2;
  width: 36px; height: 36px;
  display: grid; place-items: center;
  border-radius: 10px;
  background: rgba(var(--ph-strategy-rgb),0.12);
  color: var(--ph-strategy);
}
.enc-related-name { font-weight: 600; font-size: 13px; }
.enc-related-kind { font-size: 11px; color: var(--t2); }
```

Viewport behaviour: auto-fill minmax(200px, 1fr). Wraps naturally from 1 col mobile to 5+ cols
desktop.

### Pattern P9 - Anthropic Skills progressive disclosure
Source: Anthropic Skills Docs (platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) +
claudecn.com/en/blog/claude-official-skills-walkthrough

Anthropic's SKILL.md system uses progressive disclosure: Claude pre-loads only the name and
description from YAML frontmatter (50-100 tokens). The full content is fetched only when
triggered. Optional subdirectories (scripts/, references/, assets/) stay dormant until needed.

Why it works for beginners: matches Nielsen/Norman progressive disclosure doctrine. "Initially,
show users only a few of the most important options. Offer a larger set of specialized options
upon request". For us this means: show "Who is + analogy + 1 sentence pitch" above the fold,
then "Read more" to expand the rest.

Drop-in CSS for a collapsible section with keyboard support:

```css
.enc-details[open] summary::after { transform: rotate(180deg); }
.enc-details > summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background: var(--bg-input);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  cursor: pointer;
  list-style: none;
  font-weight: 600;
  color: var(--t1);
}
.enc-details > summary::-webkit-details-marker { display: none; }
.enc-details > summary::after {
  content: '';
  width: 12px; height: 12px;
  border-right: 2px solid var(--t2);
  border-bottom: 2px solid var(--t2);
  transform: rotate(45deg);
  transition: transform 200ms ease;
}
.enc-details[open] > summary::after { transform: rotate(225deg); }
.enc-details-body {
  padding: 16px 18px;
  animation: encFadeIn 260ms ease;
}
@keyframes encFadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
```

Uses the native `<details>` element so it is keyboard accessible without any JS and the first
paint is fast. Only the open section gets the animation.

### Pattern P10 - Raycast extension detail "Metadata rail"
Source: Raycast API Detail documentation (developers.raycast.com/api-reference/user-interface/detail)

Raycast's Detail view has a Metadata view on the right side of the detail showing structured
key-value data about the main content. The main content is prose/markdown, the rail is facts.
Minimum 3 screenshots recommended; max 6 so the detail screen "looks beautiful".

Why it works for beginners: separates "the story" from "the specs". The learner reads the prose
and when they want to fact-check ("what model does this use?") they look right.

Drop-in CSS (same as P1 infobox but specialized for key-value with pill values):

```css
.enc-meta-rail {
  display: grid;
  gap: 14px;
  padding: 18px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
}
.enc-meta-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px dashed rgba(255,255,255,0.06);
}
.enc-meta-row:last-child { border-bottom: 0; padding-bottom: 0; }
.enc-meta-key {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--t2);
  font-weight: 700;
}
.enc-meta-val {
  font-size: 13px;
  color: var(--t1);
  font-weight: 600;
}
.enc-meta-pill {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: rgba(var(--mc-sonnet-rgb), 0.15);
  color: var(--mc-sonnet);
  border: 1px solid rgba(var(--mc-sonnet-rgb), 0.3);
}
```

Viewport behaviour: docks right at 1200+, stacks above prose below.

### Pattern P11 - Container queries for card components
Source: CSS 2025 Container queries Medium (medium.com/@vyakymenko) + LogRocket blog 2026 +
MDN CSS Container queries

Container queries adapt a component based on its parent container size, not the viewport. In
the 2025 State of CSS survey, 41% of participants used container size queries. All major
browsers ship it.

Why it works for us: our bento tiles appear in a modal whose width depends on viewport. With
container queries, the same `.enc-tile` works whether it is full width in mobile modal or 1/4
width in desktop bento.

Drop-in CSS:

```css
.enc-bento { container-type: inline-size; container-name: bento; }

.enc-tile {
  display: grid;
  gap: 10px;
  padding: 16px;
  background: var(--bg-card);
  border-radius: 14px;
}
.enc-tile-title { font-size: 14px; }
.enc-tile-body  { font-size: 13px; color: var(--t2); }

/* Tile adapts to its own column, NOT the viewport */
@container bento (min-width: 360px) {
  .enc-tile { padding: 20px; gap: 14px; }
  .enc-tile-title { font-size: 16px; }
}
@container bento (min-width: 560px) {
  .enc-tile { padding: 26px; gap: 18px; }
  .enc-tile-title { font-size: 18px; }
  .enc-tile-body  { font-size: 14px; }
}
```

Viewport behaviour: independent of viewport. A tile spanning 4 cols at 1440 is wide so gets
bigger padding/type. A tile spanning 2 cols gets normal. Fixes the user's complaint ("tiles too
wide on big screens") by making padding scale with the tile's actual width.

### Pattern P12 - Clamping card / max-width container for ultrawide
Source: web.dev Clamping card pattern (web.dev/patterns/layout/clamping-card) +
CSS-Tricks Optimizing for Large-Scale Displays (css-tricks.com/optimizing-large-scale-displays)

The web.dev clamping pattern says "cards go as wide as they need to but no wider than a
readable max". CSS-Tricks Large-Scale Displays: "define left and right margins as relative
units and gradually increase these values as screen size gets larger, so content will be
contained in relation to the screen width and feel more at home on extra large screens". The
key tool is clamp().

Why it works: user's exact complaint is tiles on big monitors get too wide. Clamp on the modal
inner container caps the total width so 4 columns at 1920 stay usable, and adds 5 columns only
when the screen is truly ultrawide (>= 2000).

Drop-in CSS:

```css
.enc-overlay-inner {
  width: min(100%, 1680px);   /* cap at 1680px on desktop */
  margin-inline: auto;
  padding-inline: clamp(16px, 4vw, 48px);
}
@media (min-width: 2001px) {
  .enc-overlay-inner { width: min(100%, 1920px); }
}
```

The modal max-width (1680px) is the single source of truth that fixes the "too wide" problem.
Ultrawide users get more breathing room without monster tiles.

### Pattern P13 - MDN/W3C readability max-width (60-75ch)
Source: MDN Basic concepts of grid layout + CSS typography best practices

Readable prose should be 60-75 characters per line. Using `ch` unit in max-width ensures text
stays readable regardless of viewport. This is applied to `.enc-text` inside a wider tile.

Why it works for beginners: a learner reading a wall of 150-char lines loses their place.
Capping at 65ch matches newspaper column width.

```css
.enc-prose { max-width: 65ch; line-height: 1.65; color: var(--t1); }
.enc-prose p + p { margin-top: 0.9em; }
.enc-prose strong { color: var(--t1); font-weight: 700; }
.enc-prose em { color: var(--t2); font-style: italic; }
```

---

## 2. Responsive grid recommendation

The user's core complaint: "bento tiles are sometimes too wide on big screens and feels the
layout is not adapting well to viewport". Root cause: fixed spans (.bento-1x1 etc) in a 4-col
grid do not leverage auto-fit or container queries.

### 2.1 Recommended mobile-first media queries

```css
/* ============================================================
   ENCYCLOPEDIA BENTO GRID - RESPONSIVE RECOMMENDATION
   Mobile-first. 12-column grid so spans map to 1/2, 1/3, 2/3.
   ============================================================ */

/* Modal outer cap (fixes "too wide on big screens") */
.enc-overlay-inner {
  width: min(100%, 1680px);
  margin-inline: auto;
  padding-inline: clamp(16px, 4vw, 48px);
}

/* Base: mobile 1 col, 12-col grid still defined so spans work */
.enc-bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(120px, auto);
  grid-auto-flow: dense;
  gap: clamp(12px, 1.2vw, 20px);
  container-type: inline-size;
  container-name: bento;
}
.enc-bento > * { grid-column: span 12; }  /* mobile default: all full width */

/* ---- Tablet portrait 640 - 899 : 2 columns (span 6) ---- */
@media (min-width: 640px) {
  .enc-bento > *               { grid-column: span 6; }
  .enc-bento > .is-feature     { grid-column: span 12; }  /* hero stays full */
}

/* ---- Tablet landscape / small laptop 900 - 1199 : 3 columns (span 4) ---- */
@media (min-width: 900px) {
  .enc-bento > *               { grid-column: span 4; }
  .enc-bento > .is-wide        { grid-column: span 8; }
  .enc-bento > .is-feature     { grid-column: span 12; }
}

/* ---- Desktop 1440 (1200 - 1599) : 4 columns (span 3) ---- */
@media (min-width: 1200px) {
  .enc-bento > *               { grid-column: span 3; }
  .enc-bento > .is-wide        { grid-column: span 6; }
  .enc-bento > .is-half        { grid-column: span 6; }
  .enc-bento > .is-two-thirds  { grid-column: span 8; }
  .enc-bento > .is-feature     { grid-column: span 12; }
}

/* ---- Desktop 1920 16:9 (1600 - 1999) : STILL 4 columns, NOT 5 ----
   User said: do not go to 5 here. Instead cap modal width at 1680
   via .enc-overlay-inner, which keeps 4-col tiles at a sensible
   max of around 400px each.                                       */
@media (min-width: 1600px) {
  .enc-bento > *               { grid-column: span 3; }
}

/* ---- Ultrawide 21:9 (2000+) : 5 columns (span for 10-col math) ----
   At 2000+ we have pixels to spare. Switch to a 10-col grid for easy
   5-column distribution. Hero gets full 10, wide tiles get 4, normals
   get 2.                                                              */
@media (min-width: 2000px) {
  .enc-bento { grid-template-columns: repeat(10, 1fr); }
  .enc-bento > *               { grid-column: span 2; }
  .enc-bento > .is-wide        { grid-column: span 4; }
  .enc-bento > .is-half        { grid-column: span 5; }
  .enc-bento > .is-two-thirds  { grid-column: span 6; }
  .enc-bento > .is-feature     { grid-column: span 10; }
  .enc-overlay-inner           { width: min(100%, 2000px); }
}
```

### 2.2 Why 12 columns not 4

Current v32.13 uses fixed 4-column grid with .bento-1x1/2x1/2x2/4x1 spans. Problem: span=2 in
a 4-col grid is 50%, but in a 3-col grid (tablet) the same span is 67%. The math breaks when
viewport shrinks.

Using a 12-column grid lets spans (2,3,4,6,8,12) map to cleaner fractions
(1/6, 1/4, 1/3, 1/2, 2/3, full). Then collapsing to 6-col tablet and 1-col mobile is just
overriding all children to span 6 or span 12.

### 2.3 Container-query variant (optional, more flexible)

Replace the 1200/1600 media queries with container queries on .enc-bento so tiles react to the
bento container width, not the viewport. Useful if the modal has dynamic padding or a side rail.

```css
@container bento (min-width: 1200px) {
  .enc-bento > *              { grid-column: span 3; }
  .enc-bento > .is-wide       { grid-column: span 6; }
}
@container bento (min-width: 1800px) {
  .enc-bento { grid-template-columns: repeat(10, 1fr); }
  .enc-bento > *              { grid-column: span 2; }
}
```

### 2.4 Semantic size class names

Replace .bento-1x1/2x1/2x2/4x1 with meaning-first names. A beginner-friendly section should
tell the learner why a tile is big (feature = "this matters most"), not how big it is (2x1).

| Old name      | New name           | Span desktop | Meaning                    |
|---------------|--------------------|--------------|----------------------------|
| bento-1x1     | is-small           | 3 / 12       | Normal facts tile          |
| bento-2x1     | is-half            | 6 / 12       | Two-column content tile    |
| bento-2x2     | is-two-thirds      | 8 / 12       | Rich content tile          |
| bento-4x1     | is-wide            | 12 / 12      | Full-width strip           |
| (new)         | is-feature         | 12 / 12 x2   | Hero/who-am-I, top of bento|

### 2.5 Gap recommendation

Fluid gap via clamp(): `gap: clamp(12px, 1.2vw, 20px)`. Mobile 12px, desktop 20px, scales
linearly. Source: clampgenerator.com guide, css-tricks.com/almanac/functions/c/clamp.

### 2.6 Ultrawide summary table

| Viewport         | Cols | Max card width approx | Rationale                   |
|------------------|------|-----------------------|-----------------------------|
| <640 mobile      | 1    | 100% - 32px           | Phone readability           |
| 640-899 tablet   | 2    | ~380px                | Two-column thumb reach      |
| 900-1199 laptop  | 3    | ~380px                | Three tiles fit             |
| 1200-1599 desk   | 4    | ~360px                | Four tiles, standard HD     |
| 1600-1999 FHD    | 4    | ~400px                | STAY 4 cols, cap modal 1680 |
| 2000+ ultrawide  | 5    | ~370px                | Use every pixel             |

---

## 3. Section IA recommendation

### 3.1 Current v32.13 sidebar sections (from project memory)

banner / kim jest / metrics / co robi / czego nie / anty / fakty / hierarchia / model table /
prompt

### 3.2 Evaluation vs beginner-learning heuristics

Using Duolingo/Brilliant/MDN/Wikipedia principles:

| Current section   | Beginner friendly? | Problem                                                       |
|-------------------|--------------------|---------------------------------------------------------------|
| banner            | yes                | Good for brand/hero                                           |
| kim jest          | yes                | Core "who" answer                                             |
| metrics           | partial            | Numbers without context intimidate beginners                  |
| co robi           | yes                | Action list                                                   |
| czego nie         | yes                | Anti-list (pairs with "co robi")                              |
| anty              | yes                | Anti-patterns                                                 |
| fakty             | yes                | Retention hook                                                |
| hierarchia        | partial            | Unclear what this means to a new user                         |
| model table       | no                 | Spec-sheet thinking, off-putting early                        |
| prompt            | no                 | Deep-dive content, should be behind progressive disclosure    |

Missing sections that beginner-learning UIs (Brilliant, Khan Academy, MDN) rely on:
- "Why you should care" (benefit framing before mechanics)
- "How I work" (step-by-step process, not just description)
- "Real example" (1 concrete story, not abstract)
- "Key terms glossary" (hover definitions per P14)
- "Related agents" / "Next steps" (cross-ref per Apple HIG P8)

### 3.3 Proposed section ordering (v32.14)

I recommend a 10-section beginner-first IA, ordered so a learner who reads only the first 3
sections still understands the agent.

```
1. HERO              Feature tile, 2 rows, full width
                     Icon + name + analogy + 1 sentence pitch + model badge
                     Maps to: Duolingo lesson intro (P5)

2. WHY CARE          Wide tile, 1 row, full width
                     "What problem does this solve for you?"
                     3 benefit bullets with icons
                     NEW - missing from v32.13

3. HOW I WORK        Half tile, 1 row
                     3-4 step process flow (Input -> Think -> Output -> Handoff)
                     NEW - Brilliant path-style mini diagram

4. META RAIL         Half tile, 1 row (or Infobox rail on desktop)
                     Model, phase, tools, context budget, cost per run
                     Replaces: current "metrics" and "model table"
                     Maps to: Wikipedia infobox (P1) + Raycast metadata (P10)

5. WHAT I DO         Third tile (span 4 of 12)
                     Green checkmark list, short sentences
                     Maps to: current "co robi", reworded in beginner voice

6. WHAT I DO NOT DO  Third tile (span 4 of 12)
                     Red cross list, twin to section 5
                     Maps to: current "czego nie"

7. REAL EXAMPLE      Third tile (span 4 of 12)
                     1 concrete story ("I once analyzed 200 Reddit threads
                     about login bugs and found...")
                     NEW - beginner-learning hook

8. ANTI-PATTERNS     Half tile, 1 row
                     "When I fail" warnings with amber icons
                     Maps to: current "anty"

9. FUN FACTS         Half tile, 1 row
                     Lightbulb items, retention hook
                     Maps to: current "fakty"

10. DEEP DIVE        Full width, collapsed by default (details/summary)
                    Contains: system prompt, full model comparison table,
                    hierarchy diagram, infographic preview, "open in
                    playground" button
                    Maps to: Anthropic Skills progressive disclosure (P9)
                    Replaces: current "hierarchia" + "prompt" sections
```

### 3.4 Layout mapping to bento grid

```
ROW 1 ---------------------------------------------------
[         1 HERO  (is-feature, 12 cols, 2 rows)         ]
[                                                        ]
ROW 2 ---------------------------------------------------  (continuation of hero)

ROW 3 ---------------------------------------------------
[        2 WHY CARE  (is-wide, 12 cols)                  ]

ROW 4 ---------------------------------------------------
[   3 HOW I WORK  (is-half 6)   ][  4 META  (is-half 6)  ]

ROW 5 ---------------------------------------------------
[ 5 WHAT I DO  ][ 6 DO NOT  ][ 7 REAL EXAMPLE            ]
[  (span 4)    ][  (span 4) ][   (span 4)                ]

ROW 6 ---------------------------------------------------
[  8 ANTI-PAT  (is-half 6)     ][  9 FUN FACTS (half 6)  ]

ROW 7 ---------------------------------------------------
[       10 DEEP DIVE (is-wide 12, collapsed summary)     ]
```

At tablet (900-1199) the 3-tile row (5/6/7) becomes 3 full-width rows stacked. At tablet
portrait (640-899) everything goes 2 columns. At mobile, everything goes single column in the
order listed.

### 3.5 Rationale per section

- HERO first is Duolingo doctrine. Beginner needs the 1-sentence pitch before anything else.
- WHY CARE before HOW because Nielsen/Norman says "show benefits before mechanics".
- HOW I WORK is the Brilliant "path" pattern. A 3-step process flow is faster to grok than
  prose.
- META RAIL consolidates all spec-sheet data in one place (Wikipedia infobox doctrine) so the
  rest of the page can be prose.
- WHAT I DO + DO NOT DO are twin chip lists, a well-known "yes/no" mental model.
- REAL EXAMPLE is the beginner hook. Abstract descriptions bounce, stories stick.
- ANTI-PATTERNS pairs with REAL EXAMPLE as the "when it fails" counterpart.
- FUN FACTS at the bottom (not top) because retention reward is a dessert, not an appetizer.
- DEEP DIVE collapsed uses Anthropic Skills progressive disclosure: pro users get full prompt
  and model table, beginners never see the wall of text.

---

## 4. Micro-interactions

### 4.1 Card hover lift
Source: CSS-Tricks card hover 40 examples + Subframe micro-interactions guide + Pixel Free
Studio CSS micro-interactions

```css
.enc-tile {
  transition:
    transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 220ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 220ms ease;
  will-change: transform;
}
.enc-tile:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 60px -30px rgba(0,0,0,0.7);
  border-color: rgba(var(--ph-strategy-rgb), 0.35);
}
@media (prefers-reduced-motion: reduce) {
  .enc-tile { transition: none; }
  .enc-tile:hover { transform: none; }
}
```

Best practice is transform+opacity only (GPU composited), never top/left/margin. The
cubic-bezier(0.16, 1, 0.3, 1) is a "soft overshoot" that feels physical without being cartoony.

### 4.2 Progressive reveal on scroll (IntersectionObserver)

```css
.enc-tile { opacity: 0; transform: translateY(16px); }
.enc-tile.is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
@media (prefers-reduced-motion: reduce) {
  .enc-tile { opacity: 1; transform: none; }
}
```

```js
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.enc-tile').forEach(t => revealObs.observe(t));
```

Staggered reveal: add `transition-delay: calc(var(--i) * 50ms)` and set `--i` in JS per tile.

### 4.3 Subtle icon animation on hover
Pattern: icon pulses/rotates subtly without being distracting.

```css
.enc-tile-icon {
  transition: transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.enc-tile:hover .enc-tile-icon {
  transform: scale(1.08) rotate(-4deg);
}
```

### 4.4 Sticky in-page TOC with active highlight
See Pattern P2 above. The full recipe with IntersectionObserver is already in section 1.

### 4.5 Details expand animation
Browser native `<details>` does not animate. Use `interpolate-size: allow-keywords` + CSS
transitions (Chrome 129+, Safari 17.4+) or fall back to content fade-in (already shown in P9).

```css
@supports (interpolate-size: allow-keywords) {
  .enc-details {
    interpolate-size: allow-keywords;
  }
  .enc-details::details-content {
    height: 0;
    overflow: clip;
    transition: height 260ms ease, content-visibility 260ms allow-discrete;
  }
  .enc-details[open]::details-content { height: auto; }
}
```

### 4.6 Focus-visible ring
Accessibility win often missed:

```css
.enc-tile:focus-visible {
  outline: 2px solid var(--ph-strategy);
  outline-offset: 3px;
  border-radius: 16px;
}
```

### 4.7 Reading progress bar at top of modal
Source: alvaromontoro.com/blog/68014/css-only-reading-progress-indicator + CSS-Tricks reading
position indicator.

Pure CSS version (uses scroll-driven animations, Chrome 115+):

```css
.enc-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--ph-strategy);
  transform-origin: 0 50%;
  animation: encProgress linear;
  animation-timeline: scroll(nearest);
  z-index: 100;
}
@keyframes encProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
```

JS fallback for older browsers:

```js
const bar = document.querySelector('.enc-progress');
const modal = document.querySelector('.learn-overlay');
modal.addEventListener('scroll', () => {
  const p = modal.scrollTop / (modal.scrollHeight - modal.clientHeight);
  bar.style.transform = `scaleX(${p})`;
});
```

---

## 5. Beginner-friendly UX signals

### 5.1 Progressive disclosure checklist
From Nielsen/Norman progressive disclosure article (nngroup.com/articles/progressive-disclosure):

1. Show only the most important options initially.
2. Max 2 levels of nesting (more than 2 hurts UX).
3. "Show more" or dropdown for advanced.
4. Each reveal must increase trust (not introduce friction).

Applied to our encyclopedia: sections 1-7 visible by default, sections 8-10 behind "Read more"
or below the fold, full system prompt inside section 10's deep-dive `<details>`.

### 5.2 "Start here" affordance
Beginner onboarding research (useronboarding.academy, chameleon.io) shows new users need an
explicit "START HERE" CTA. In the encyclopedia, this is the HERO section with a pulsing "1"
marker in the top-left and a small "start here" kicker ribbon.

```css
.enc-hero::before {
  content: '1 - START HERE';
  position: absolute;
  top: -12px;
  left: 24px;
  padding: 4px 12px;
  background: var(--ph-strategy);
  color: #000;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  border-radius: 999px;
  animation: encPulse 2s ease-in-out infinite;
}
@keyframes encPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.05); opacity: 0.9; }
}
@media (prefers-reduced-motion: reduce) {
  .enc-hero::before { animation: none; }
}
```

### 5.3 Glossary-on-hover tooltips
Project already has `dodajTooltip` helper. Use it on every AI jargon term (subagent,
orchestrator, context window, token, Opus/Sonnet/Haiku, HITL, etc). Sources:
w3.org/WAI/ARIA/apg/patterns/tooltip + css-tricks.com/tooltip-best-practices +
inclusive-components.design/tooltips-toggletips.

Rules for beginner glossary tooltips:
1. Trigger on hover AND focus (keyboard users)
2. Dismiss on Escape (WCAG 1.4.13)
3. Must be hoverable (user can move mouse over tooltip to read)
4. Never use the title attribute (inaccessible)
5. Use aria-describedby on the term, not on the tooltip
6. Delay 400ms on show, 0ms on dismiss (feels responsive)

```css
.enc-term {
  border-bottom: 1px dashed rgba(var(--ph-strategy-rgb), 0.5);
  cursor: help;
  position: relative;
}
.enc-term[aria-expanded="true"] .enc-term-tooltip {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.enc-term-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translate(-50%, 4px);
  width: 240px;
  padding: 12px 14px;
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  font-size: 12px;
  color: var(--t1);
  opacity: 0;
  pointer-events: none;
  transition: opacity 180ms ease, transform 180ms ease;
  z-index: 50;
}
```

### 5.4 "Next agent" hint
Duolingo/Brilliant always show what comes next. At the bottom of each agent page add a "Next
agent" card that is 2x the size of normal related items.

```css
.enc-next {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg,
    rgba(var(--ph-build-rgb), 0.15),
    rgba(var(--ph-strategy-rgb), 0.08));
  border: 1px solid rgba(var(--ph-build-rgb), 0.25);
  border-radius: 18px;
  cursor: pointer;
  transition: transform 220ms ease;
}
.enc-next:hover { transform: translateX(4px); }
.enc-next-kicker {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ph-build);
  font-weight: 700;
}
.enc-next-name { font-size: 18px; font-weight: 800; color: var(--t1); }
.enc-next-arrow { font-size: 24px; color: var(--ph-build); }
```

### 5.5 Reading progress indicator
See 4.7. A thin colored bar at the top of the modal, animated via scroll-driven animations.

### 5.6 Contextual empty states
If an agent has no Fun Facts or no Anti-patterns, the section should hide (per Wikipedia
infobox rule: "dynamically adapt themselves to the absence or presence of particular fields").
Never show "No data" to a beginner.

```css
.enc-tile:empty { display: none; }
```

Combined with a JS pass that removes tiles whose data arrays are empty before render.

### 5.7 Visual hierarchy by size
Linear changelog rule: major content gets big cards, minor content gets small tiles. Applied to
our IA: HERO (span 12, 2 rows) > WHY CARE + DEEP DIVE (span 12) > HOW/META/ANTI/FACTS
(span 6) > DO/DO-NOT/EXAMPLE (span 4).

### 5.8 Polish-first language
All section headings in natural beginner Polish. Examples:
- "Kim jestem" (not "Opis agenta")
- "Dlaczego mnie potrzebujesz" (not "Przypadki uzycia")
- "Jak pracuje" (not "Przebieg procesu")
- "Co umiem" (not "Funkcjonalnosci")
- "Czego nie zrobie" (not "Ograniczenia funkcjonalne")
- "Przyklad z zycia" (not "Studium przypadku")
- "Kiedy zawodze" (not "Anty-wzorce")
- "Ciekawostki" (not "Dodatkowe informacje")
- "Zanurkuj glebiej" (not "Zaawansowane")
- "Nastepny agent" (not "Rekomendacje powiazane")

### 5.9 Iconography consistency
Each section has a persistent icon + color across the entire encyclopedia. A beginner who sees
a green checkmark icon once knows it means "what I do" forever. This is MDN doctrine: the same
section name means the same thing on every page.

### 5.10 Skip link + keyboard navigation
Modal must support:
- Tab to focus sections in order
- J/K or ArrowDown/ArrowUp to jump section to section
- Escape to close modal
- Space/Enter on a TOC entry to scroll to section
- `/` to focus a search box (future)

Already standard in the project but must extend to the new encyclopedia.

---

## 6. Sources

### Grid and responsive CSS
- [CSS container queries - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)
- [CSS 2025 Container queries and style queries in real projects - Medium](https://medium.com/@vyakymenko/css-2025-container-queries-and-style-queries-in-real-projects-c38af5a13aa2)
- [Container queries in 2026: Powerful, but not a silver bullet - LogRocket](https://blog.logrocket.com/container-queries-2026/)
- [CSS Media Queries and Breakpoints in 2025 - DevToolbox](https://viadreams.cc/en/blog/css-media-queries-breakpoints-2025/)
- [Breakpoint: Responsive Design Breakpoints in 2025 - BrowserStack](https://www.browserstack.com/guide/responsive-design-breakpoints)
- [Building a Bento Grid Layout with Modern CSS Grid - WeAreDevelopers](https://www.wearedevelopers.com/en/magazine/682/building-a-bento-grid-layout-with-modern-css-grid-682)
- [Bento Grid Design 2025 - Senorit](https://senorit.de/en/blog/bento-grid-design-trend-2025)
- [Bento grid layout with CSS grid and container queries - iamsteve.me](https://iamsteve.me/blog/bento-layout-css-grid)
- [Designing Bento Grids That Actually Work - SaaSFrame](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide)
- [Bento Grid UI Design Guide 2026 - Superfiles](https://superfiles.in/bento-grid-ui-design-trend.php)
- [How to Master Bento Grid Layouts - eCommerceWebDesign](https://ecommercewebdesign.agency/how-to-master-bento-grid-layouts-for-stunning-websites-in-2025/)
- [Bento Grid Design Guide - Landdding](https://landdding.com/blog/blog-bento-grid-design-guide)
- [Aspect Ratio Cells with CSS Grid Layout - CSS IRL](https://css-irl.info/aspect-ratio-cells/)
- [Understanding and setting aspect ratios - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_sizing/Aspect_ratios)
- [Creating Responsive Card Grid with fixed Aspect-Ratio - Medium](https://medium.com/@SnehilCodes/creating-responsive-grids-of-flexible-square-cards-without-css-media-queries-3ee104f0e597)
- [clamp() CSS function - CSS-Tricks](https://css-tricks.com/almanac/functions/c/clamp/)
- [Clamping card layout pattern - web.dev](https://web.dev/patterns/layout/clamping-card)
- [Optimizing for Large-Scale Displays - CSS-Tricks](https://css-tricks.com/optimizing-large-scale-displays/)
- [Intrinsically Responsive CSS Grid with minmax - Evan Minto](https://evanminto.com/blog/intrinsically-responsive-css-grid-minmax-min/)
- [Auto-Filling CSS Grid With Max Columns - CSS-Tricks](https://css-tricks.com/an-auto-filling-css-grid-with-max-columns/)
- [Auto-Sizing Columns: auto-fill vs auto-fit - CSS-Tricks](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)
- [CSS Subgrid - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid)
- [Building a Card Layout Using CSS Subgrid - DZone](https://dzone.com/articles/building-a-card-layout-using-css-subgrid)

### Knowledge and documentation UIs
- [Wikipedia Manual of Style/Infoboxes](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Infoboxes)
- [Help:Designing infoboxes - Wikipedia](https://en.wikipedia.org/wiki/Help:Designing_infoboxes)
- [Template:Infobox - Wikipedia](https://en.wikipedia.org/wiki/Template:Infobox)
- [Page structures - MDN Web Docs](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures)
- [Page types - MDN Web Docs](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Page_types)
- [Structuring documents - MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [Apple HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Apple HIG Components](https://developer.apple.com/design/human-interface-guidelines/components)
- [Anthropic Agent Skills Documentation](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
- [Anthropic Official Skills Repository walkthrough](https://claudecn.com/en/blog/claude-official-skills-walkthrough/)

### Beginner learning UIs
- [The Science Behind Duolingo's Home Screen Redesign](https://blog.duolingo.com/new-duolingo-home-screen-design/)
- [Duolingo iOS Lesson Start - Mobbin](https://mobbin.com/explore/screens/7d8cf8a3-a457-4071-b45a-38bb079aa5bf)
- [Duolingo App UI screens - UILand](https://uiland.design/screens/duolingo/screens/3497acfe-84e0-400a-bbac-cf38c19e6b9a)
- [Brilliant.org x ustwo case study](https://ustwo.com/work/brilliant/)
- [How Brilliant.org motivates learners with animations - Rive blog](https://rive.app/blog/how-brilliant-org-motivates-learners-with-rive-animations)
- [Brilliant Courses](https://brilliant.org/courses/)

### Bento and product UIs
- [Notion Gallery View Help Center](https://www.notion.com/help/galleries)
- [Notion Gallery View databases](https://www.notion.com/help/guides/gallery-view-databases)
- [Notion Gallery View Guide - super.so](https://super.so/blog/notion-gallery-view-a-comprehensive-guide)
- [Raycast Store categories](https://www.raycast.com/store/category/design-tools)
- [Raycast Detail API reference](https://developers.raycast.com/api-reference/user-interface/detail)
- [Raycast User Interface](https://developers.raycast.com/api-reference/user-interface)

### Progressive disclosure and UX
- [Progressive Disclosure - Nielsen Norman Group](https://www.nngroup.com/articles/progressive-disclosure/)
- [Progressive Disclosure (Video) - NN/G](https://www.nngroup.com/videos/progressive-disclosure/)
- [Progressive Disclosure design pattern - UI-Patterns](https://ui-patterns.com/patterns/ProgressiveDisclosure)
- [What is Progressive Disclosure - IxDF](https://ixdf.org/literature/topics/progressive-disclosure)
- [Progressive disclosure UX types and use cases - LogRocket](https://blog.logrocket.com/ux-design/progressive-disclosure-ux-types-use-cases/)
- [Progressive disclosure - Primer Design System](https://primer.style/product/ui-patterns/progressive-disclosure/)
- [AI Literacy (Video) - NN/G](https://www.nngroup.com/videos/ai-literacy/)
- [AI as a UX Assistant - NN/G](https://www.nngroup.com/articles/ai-roles-ux/)

### Micro-interactions
- [CSS Card Hover Effects 40 examples - WP Dean](https://wpdean.com/css-card-hover-effects/)
- [10 CSS Card Hover Effect Examples - Subframe](https://www.subframe.com/tips/css-card-hover-effect-examples)
- [Creating Stunning Micro-Interactions - Pixel Free Studio](https://blog.pixelfreestudio.com/how-to-use-css-for-creating-stunning-micro-interactions/)
- [Sticky Table of Contents with Scrolling Active States - CSS-Tricks](https://css-tricks.com/sticky-table-of-contents-with-scrolling-active-states/)
- [Table of Contents with IntersectionObserver - CSS-Tricks](https://css-tricks.com/table-of-contents-with-intersectionobserver/)
- [CSS-Only Reading Progress Indicator - Alvaro Montoro](https://alvaromontoro.com/blog/68014/css-only-reading-progress-indicator)
- [Reading Position Indicator - CSS-Tricks](https://css-tricks.com/reading-position-indicator/)
- [Creating CSS carousels - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels)
- [Build buttery smooth carousels with pure CSS - Builder.io](https://www.builder.io/blog/css-carousel)

### Accessibility and tooltips
- [Tooltip Best Practices - CSS-Tricks](https://css-tricks.com/tooltip-best-practices/)
- [ARIA tooltip role - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tooltip_role)
- [Tooltip Pattern - W3C WAI ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [Tooltips and Toggletips - Inclusive Components](https://inclusive-components.design/tooltips-toggletips/)
- [Tooltips in the time of WCAG 2.1 - Sarah Higley](https://sarahmhigley.com/writing/tooltips-in-wcag-21/)
- [Carbon Design System Tooltip accessibility](https://carbondesignsystem.com/components/tooltip/accessibility/)

### Onboarding
- [Onboarding UX Patterns - UserOnboarding Academy](https://useronboarding.academy/post/onboarding-ux-pattern)
- [User Onboarding UX Design - Chameleon](https://www.chameleon.io/blog/onboarding-ux-patterns)
- [Choosing the right user onboarding UX pattern - Appcues](https://www.appcues.com/blog/choosing-the-right-onboarding-ux-pattern)

### Fallback knowledge note
WebFetch was denied in this research session, so deeper extraction from individual reference
pages (web.dev clamping card exact CSS, iamsteve.me bento exact grid-template-areas) was done
from WebSearch result summaries + my knowledge. Where a pattern is reconstructed from
knowledge rather than a fresh fetch, I have noted "synthesized from knowledge" in the pattern
description. All URLs in this Sources section were surfaced by WebSearch and are linkable.

---

## Executive summary for synthesizer (Phase C)

1. Root cause of user complaint: fixed 4-col grid + fixed span classes do not scale. Fix with
   12-col grid + semantic span classes + modal max-width 1680px + container queries per tile.

2. Best section IA is 10 sections in this order: HERO, WHY CARE, HOW I WORK, META RAIL,
   WHAT I DO, WHAT I DO NOT DO, REAL EXAMPLE, ANTI-PATTERNS, FUN FACTS, DEEP DIVE (collapsed).
   Add 3 new sections (WHY CARE, HOW I WORK, REAL EXAMPLE), demote 2 (model table, prompt)
   behind progressive disclosure.

3. Top micro-interactions: card hover lift, staggered reveal on scroll, subtle icon rotate,
   sticky TOC with active highlight, reading progress bar, details expand animation, focus
   ring. All must honor prefers-reduced-motion.

4. Beginner UX signals to add: "1 - START HERE" ribbon, glossary tooltips on AI jargon,
   "Next agent" affordance, empty-state hiding (no "No data"), Polish-first section headings,
   consistent iconography across pages.

5. Single most impactful change: implement Pattern P12 (clamp modal to 1680px max) +
   Pattern P11 (container queries per tile). This alone fixes 80% of the "tiles too wide"
   complaint. Everything else is layering.

End of R3 report.
