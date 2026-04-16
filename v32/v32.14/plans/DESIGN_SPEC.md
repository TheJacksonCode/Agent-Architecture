# DESIGN_SPEC.md - v32.14 Tokens, Recipes, Utilities

Author: Main thread (Phase C)
Date: 2026-04-10
Scope: CSS tokens, component recipes, and utilities ready for Phase D
drop-in. All from R3/R4/R5 + v32.8 motion ladder + existing v32.13 var
system.

---

## 1. Token reuse (no new CSS vars needed)

All tokens already exist in v32.13. Use them verbatim.

### 1.1 Color tokens from v32.13

- Background: `var(--bg-panel)`, `var(--bg-card)`, `var(--bg-input)`
- Text: `var(--t1)`, `var(--t2)` (APCA Lc >= 75 on body, >= 60 on UI)
- Accents: `var(--accent1)`, `var(--accent2)`, `var(--accent3)`
- Phase palette: `var(--ph-strategy)`, `var(--ph-research)`, `var(--ph-debate)`,
  `var(--ph-build)`, `var(--ph-qa)`, `var(--ph-hitl)`
- Phase RGB triplets: `var(--ph-strategy-rgb)` etc (for rgba composition)
- Model palette: `var(--mc-opus)`, `var(--mc-sonnet)`, `var(--mc-haiku)`
- Phase ink (APCA two-tier): `var(--ph-strategy-ink)` etc

### 1.2 Motion tokens from v32.8

```
--dur-instant:  80ms;
--dur-fast:    150ms;
--dur-base:    220ms;
--dur-medium:  320ms;
--dur-slow:    480ms;
--dur-hero:    640ms;
--ease-standard:   cubic-bezier(0.2, 0, 0, 1);
--ease-emphasized: cubic-bezier(0.05, 0.7, 0.1, 1);
```

New micro-interactions use these tokens. No `.5s` hardcodes.

### 1.3 Physical overshoot easing (new)

R3's hover lift uses `cubic-bezier(0.16, 1, 0.3, 1)` for a soft physical
overshoot. Inline use only (not added as a token) because it appears in
exactly 2 places.

---

## 2. Container + grid recipe (the canonical fix)

Replace v32.13 lines 1322-1328 and 1404-1406 with:

```css
/* ===== v32.14 Bento grid (container query driven) ===== */

.learn-overlay .bento-scroll{
  container-type: inline-size;
  container-name: bento;
}

.bento-grid{
  display: grid;
  grid-template-columns: 1fr;             /* mobile base */
  grid-auto-flow: dense;
  grid-auto-rows: minmax(80px, auto);
  gap: 10px;
  margin: 0 auto 24px;
  width: min(100%, 1680px);               /* master cap */
}

/* Span helpers: mobile default = full width */
.bento-1x1,
.bento-2x1,
.bento-2x2,
.bento-4x1{
  grid-column: 1 / -1;
  grid-row: span 1;
}
.bento-2x2{
  grid-row: auto;
  min-height: 260px;
}

/* Tablet portrait 2 cols */
@container bento (min-width: 520px){
  .bento-grid{ grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .bento-1x1{ grid-column: span 1; }
  .bento-2x1{ grid-column: span 2; }
  .bento-2x2{ grid-column: span 2; grid-row: span 2; min-height: 0; }
  .bento-4x1{ grid-column: 1 / -1; }
}

/* Laptop 3 cols */
@container bento (min-width: 860px){
  .bento-grid{ grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .bento-1x1{ grid-column: span 1; }
  .bento-2x1{ grid-column: span 2; }
  .bento-2x2{ grid-column: span 2; grid-row: span 2; }
  .bento-4x1{ grid-column: 1 / -1; }
}

/* FHD 4 cols */
@container bento (min-width: 1200px){
  .bento-grid{ grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .bento-1x1{ grid-column: span 1; }
  .bento-2x1{ grid-column: span 2; }
  .bento-2x2{ grid-column: span 2; grid-row: span 2; }
  .bento-4x1{ grid-column: 1 / -1; }
}

/* QHD 5 cols (cap 2100) */
@container bento (min-width: 1800px){
  .bento-grid{
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    max-width: 2100px;
  }
  .bento-2x2{ grid-column: span 2; grid-row: span 2; }
  .bento-4x1{ grid-column: 1 / -1; }
}

/* Ultrawide 6 cols (cap 2400) */
@container bento (min-width: 2200px){
  .bento-grid{
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
    max-width: 2400px;
  }
  .bento-2x2{ grid-column: span 2; grid-row: span 2; }
  .bento-4x1{ grid-column: 1 / -1; }
}

/* Keep sidebar viewport queries (UNCHANGED from v32.13) */
@media (max-width: 1100px){ .side-r{ width: 260px; } }
@media (max-width: 900px){  .side-l{ width: 200px; } .side-r{ width: 220px; } }
@media (max-width: 700px){  .side-l, .side-r{ display: none; } }
```

Total replacement: ~70 lines for ~11 lines removed. Net +59 lines.

---

## 3. Section tile recipes

### 3.1 HERO tile (section 1)

```css
.enc-hero{
  position: relative;
  padding: 28px 32px;
  background:
    radial-gradient(ellipse at top right, rgba(var(--ph-strategy-rgb), 0.18), transparent 60%),
    var(--bg-card);
  border: 1px solid rgba(var(--ph-strategy-rgb), 0.25);
  border-radius: 18px;
  display: grid;
  gap: 14px;
  overflow: hidden;
}
.enc-hero::before{
  content: '1 START TU';
  position: absolute;
  top: 14px;
  left: 24px;
  padding: 4px 12px;
  background: var(--ph-strategy);
  color: #0b0e1a;
  font: 800 10px/1 'Space Grotesk', system-ui, sans-serif;
  letter-spacing: 0.12em;
  border-radius: 999px;
  animation: encPulse 2.4s ease-in-out infinite;
}
@keyframes encPulse{
  0%, 100%{ transform: scale(1); opacity: 1; }
  50%     { transform: scale(1.06); opacity: 0.9; }
}
@media (prefers-reduced-motion: reduce){
  .enc-hero::before{ animation: none; }
}
.enc-hero-top{
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}
.enc-hero-icon{
  width: 72px; height: 72px;
  display: grid; place-items: center;
  background: rgba(var(--ph-strategy-rgb), 0.12);
  border-radius: 18px;
}
.enc-hero-name{
  font: 800 28px/1.15 'Space Grotesk', system-ui, sans-serif;
  color: var(--t1);
}
.enc-hero-tagline{
  font: 500 14px/1.4 'Inter', system-ui, sans-serif;
  color: var(--t2);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.enc-hero-mission{
  max-width: 65ch;
  font: 500 15px/1.55 'Inter', system-ui, sans-serif;
  color: var(--t1);
}
.enc-hero-quote{
  padding: 14px 18px;
  border-left: 3px solid var(--ph-strategy);
  background: rgba(var(--ph-strategy-rgb), 0.06);
  border-radius: 0 10px 10px 0;
  font: italic 500 14px/1.5 'Inter', system-ui, sans-serif;
  color: var(--t2);
}
```

### 3.2 Section header kicker

Shared kicker component for sections 2-10:

```css
.enc-section-kicker{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  background: rgba(var(--ph-research-rgb), 0.14);
  border: 1px solid rgba(var(--ph-research-rgb), 0.3);
  border-radius: 999px;
  font: 700 10px/1 'Space Grotesk', system-ui, sans-serif;
  letter-spacing: 0.12em;
  color: var(--ph-research);
  text-transform: uppercase;
  margin-bottom: 10px;
}
.enc-section-kicker-num{
  display: inline-grid;
  place-items: center;
  width: 18px; height: 18px;
  background: var(--ph-research);
  color: #0b0e1a;
  border-radius: 50%;
  font-size: 10px;
}
.enc-section-title{
  font: 700 18px/1.25 'Space Grotesk', system-ui, sans-serif;
  color: var(--t1);
  margin-bottom: 12px;
}
```

### 3.3 Benefit list (DLACZEGO JA, section 2)

```css
.enc-benefit-list{
  display: grid;
  gap: 12px;
  margin: 0; padding: 0;
  list-style: none;
}
.enc-benefit-item{
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 14px;
  align-items: start;
}
.enc-benefit-icon{
  width: 32px; height: 32px;
  display: grid; place-items: center;
  background: rgba(var(--ph-build-rgb), 0.15);
  color: var(--ph-build);
  border-radius: 10px;
  font-size: 16px;
}
.enc-benefit-text{
  font: 500 14px/1.5 'Inter', system-ui, sans-serif;
  color: var(--t1);
}
```

### 3.4 How-it-works flow (JAK PRACUJE, section 3)

```css
.enc-flow{
  display: grid;
  gap: 10px;
}
.enc-flow-step{
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 12px;
  padding: 10px 12px;
  background: var(--bg-input);
  border-radius: 10px;
  position: relative;
}
.enc-flow-num{
  width: 28px; height: 28px;
  display: grid; place-items: center;
  background: var(--ph-strategy);
  color: #0b0e1a;
  border-radius: 50%;
  font: 700 13px/1 'Space Grotesk', sans-serif;
}
.enc-flow-step:not(:last-child)::after{
  content: '';
  position: absolute;
  left: 23px; top: 100%;
  width: 2px; height: 10px;
  background: rgba(var(--ph-strategy-rgb), 0.4);
}
.enc-flow-label{
  font: 600 13px/1.4 'Inter', sans-serif;
  color: var(--t1);
}
.enc-flow-desc{
  font: 500 12px/1.4 'Inter', sans-serif;
  color: var(--t2);
  margin-top: 2px;
}
```

### 3.5 Meta rail (META, section 4)

Compact infobox-style key/value pairs:

```css
.enc-meta-grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px;
  margin-top: 4px;
}
.enc-meta-row{
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  padding: 8px 10px;
  background: var(--bg-input);
  border-radius: 8px;
  align-items: center;
}
.enc-meta-label{
  font: 500 11px/1 'Inter', sans-serif;
  color: var(--t2);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.enc-meta-value{
  font: 700 13px/1 'Space Grotesk', sans-serif;
  color: var(--t1);
}
.enc-meta-pill{
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font: 700 11px/1 'Space Grotesk', sans-serif;
  background: rgba(var(--mc-sonnet-rgb), 0.15);
  color: var(--mc-sonnet);
  border: 1px solid rgba(var(--mc-sonnet-rgb), 0.3);
}
```

### 3.6 Do / Dont lists (sections 5, 6)

Reuse existing `.bento-do-list` and `.bento-dont-list` from v32.13 lines
1394-1400. No new CSS needed.

### 3.7 Real example tile (section 7)

```css
.enc-example{
  padding: 18px;
  background: linear-gradient(135deg,
    rgba(var(--ph-research-rgb), 0.08),
    rgba(var(--ph-strategy-rgb), 0.04));
  border: 1px dashed rgba(var(--ph-research-rgb), 0.35);
  border-radius: 14px;
}
.enc-example-label{
  font: 700 10px/1 'Space Grotesk', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--ph-research);
  margin-bottom: 10px;
  display: flex; gap: 8px; align-items: center;
}
.enc-example-body{
  font: 500 14px/1.55 'Inter', sans-serif;
  color: var(--t1);
  max-width: 65ch;
}
```

### 3.8 Anti-patterns + Facts (sections 8, 9)

Reuse `.bento-anti-list` and `.bento-facts-list` from v32.13. No new CSS.

### 3.9 Deep Dive details (section 10)

```css
.enc-deep{
  padding: 18px 22px;
  background: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
}
.enc-deep summary{
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font: 700 16px/1.3 'Space Grotesk', sans-serif;
  color: var(--t1);
  padding: 4px 0;
  list-style: none;
}
.enc-deep summary::-webkit-details-marker{ display: none; }
.enc-deep summary::before{
  content: '>';
  display: inline-block;
  width: 22px; height: 22px;
  line-height: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 6px;
  font-size: 12px;
  color: var(--t2);
  transition: transform var(--dur-base) var(--ease-standard);
}
.enc-deep[open] summary::before{
  transform: rotate(90deg);
}
.enc-deep-body{
  display: grid;
  gap: 18px;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.enc-deep-body > *{
  animation: encFadeIn var(--dur-medium) var(--ease-standard);
}
@keyframes encFadeIn{
  from{ opacity: 0; transform: translateY(6px); }
  to  { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce){
  .enc-deep-body > *{ animation: none; }
  .enc-deep summary::before{ transition: none; }
}
```

### 3.10 Infographic thumb button (inside DEEP DIVE)

```css
.enc-infographic-thumb{
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  background: transparent;
  border: 2px solid rgba(var(--ph-strategy-rgb), 0.25);
  border-radius: 14px;
  overflow: hidden;
  cursor: zoom-in;
  transition: transform var(--dur-base) var(--ease-standard),
              border-color var(--dur-base) var(--ease-standard);
}
.enc-infographic-thumb:hover{
  transform: translateY(-2px);
  border-color: var(--ph-strategy);
}
.enc-infographic-thumb:focus-visible{
  outline: 2px solid var(--ph-strategy);
  outline-offset: 3px;
}
.enc-infographic-thumb img{
  display: block;
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  object-position: center top;
}
.enc-zoom-hint{
  position: absolute;
  bottom: 12px; right: 12px;
  padding: 6px 12px;
  background: rgba(10, 12, 22, 0.82);
  color: var(--t1);
  backdrop-filter: blur(6px);
  border-radius: 999px;
  font: 600 11px/1 'Space Grotesk', sans-serif;
  display: inline-flex; gap: 6px; align-items: center;
}
@media (prefers-reduced-motion: reduce){
  .enc-infographic-thumb{ transition: none; }
}
```

### 3.11 PDF download button

```css
.enc-dl-btn{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  min-height: 44px;
  background: linear-gradient(135deg,
    rgba(var(--ph-qa-rgb), 0.18),
    rgba(var(--ph-qa-rgb), 0.08));
  border: 1px solid rgba(var(--ph-qa-rgb), 0.35);
  color: var(--t1);
  border-radius: 10px;
  font: 700 13px/1 'Space Grotesk', sans-serif;
  cursor: pointer;
  transition: transform var(--dur-base) var(--ease-standard),
              background var(--dur-base) var(--ease-standard);
}
.enc-dl-btn:hover{
  transform: translateY(-2px);
  background: linear-gradient(135deg,
    rgba(var(--ph-qa-rgb), 0.26),
    rgba(var(--ph-qa-rgb), 0.14));
}
.enc-dl-btn:focus-visible{
  outline: 2px solid var(--ph-qa);
  outline-offset: 3px;
}
```

### 3.12 Nastepny agent affordance

```css
.enc-next{
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: center;
  margin-top: 20px;
  padding: 20px 24px;
  background: linear-gradient(135deg,
    rgba(var(--ph-build-rgb), 0.14),
    rgba(var(--ph-strategy-rgb), 0.08));
  border: 1px solid rgba(var(--ph-build-rgb), 0.28);
  border-radius: 18px;
  cursor: pointer;
  transition: transform var(--dur-base) var(--ease-standard);
}
.enc-next:hover{ transform: translateX(4px); }
.enc-next:focus-visible{
  outline: 2px solid var(--ph-build);
  outline-offset: 3px;
}
.enc-next-kicker{
  font: 700 10px/1 'Space Grotesk', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--ph-build);
  margin-bottom: 4px;
}
.enc-next-name{
  font: 800 18px/1.2 'Space Grotesk', sans-serif;
  color: var(--t1);
}
.enc-next-arrow{
  font-size: 28px;
  color: var(--ph-build);
}
@media (prefers-reduced-motion: reduce){
  .enc-next{ transition: none; }
}
```

---

## 4. Card hover + reveal utilities

### 4.1 Hover lift (applies to all bento tiles in new renderer)

```css
.enc-tile{
  transition:
    transform var(--dur-base) cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow var(--dur-base) cubic-bezier(0.16, 1, 0.3, 1),
    border-color var(--dur-base) var(--ease-standard);
  will-change: transform;
}
.enc-tile:hover{
  transform: translateY(-6px);
  box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.7);
  border-color: rgba(var(--ph-strategy-rgb), 0.35);
}
@media (prefers-reduced-motion: reduce){
  .enc-tile{ transition: none; }
  .enc-tile:hover{ transform: none; }
}
```

### 4.2 Staggered reveal on scroll

```css
.enc-tile{
  opacity: 0;
  transform: translateY(16px);
}
.enc-tile.is-visible{
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity var(--dur-medium) var(--ease-standard),
    transform var(--dur-medium) cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--i, 0) * 50ms);
}
@media (prefers-reduced-motion: reduce){
  .enc-tile{ opacity: 1; transform: none; }
  .enc-tile.is-visible{ transition: none; transition-delay: 0s; }
}
```

JS to wire it (Phase D):

```js
function wireBentoReveal(){
  const tiles = document.querySelectorAll('.bento-grid .enc-tile');
  tiles.forEach((t, i) => t.style.setProperty('--i', i));
  if (!('IntersectionObserver' in window)){
    tiles.forEach(t => t.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  tiles.forEach(t => obs.observe(t));
}
```

### 4.3 Focus ring

```css
.enc-tile:focus-visible,
.enc-term:focus-visible,
.enc-dl-btn:focus-visible,
.enc-infographic-thumb:focus-visible,
.enc-next:focus-visible{
  outline: 2px solid var(--ph-strategy);
  outline-offset: 3px;
  border-radius: 16px;
}
```

---

## 5. Reading progress bar

```css
.enc-progress{
  position: sticky;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg,
    var(--ph-strategy) 0%,
    var(--ph-research) 100%);
  transform-origin: 0 50%;
  transform: scaleX(0);
  z-index: 60;
  pointer-events: none;
}
@supports (animation-timeline: scroll()){
  .enc-progress{
    transform: scaleX(0);
    animation: encProgressFill linear;
    animation-timeline: scroll(nearest);
  }
  @keyframes encProgressFill{
    from{ transform: scaleX(0); }
    to  { transform: scaleX(1); }
  }
}
@media (prefers-reduced-motion: reduce){
  .enc-progress{ display: none; }
}
```

JS fallback (for browsers without scroll-driven animations):

```js
function wireEncProgress(){
  const bar = document.querySelector('.enc-progress');
  const scroll = document.querySelector('.bento-scroll');
  if (!bar || !scroll) return;
  if (CSS.supports('animation-timeline: scroll()')) return;
  scroll.addEventListener('scroll', () => {
    const p = scroll.scrollTop / Math.max(1, scroll.scrollHeight - scroll.clientHeight);
    bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, p)) + ')';
  }, { passive: true });
}
```

---

## 6. Glossary tooltip minimal shim

Assumes `dodajTooltip(el, text)` already exists in v32.13. Phase D reuses
it. New CSS just for the dotted underline affordance:

```css
.enc-term{
  border-bottom: 1px dashed rgba(var(--ph-strategy-rgb), 0.55);
  cursor: help;
}
.enc-term:hover{
  border-bottom-color: var(--ph-strategy);
  color: var(--t1);
}
```

---

## 7. Zoom lightbox CSS (R4 drop-in, unchanged)

See R4 section 2b. Copy verbatim. 70 lines. Uses existing `--t1`, `--t2`,
`--accent1` vars. Zero new tokens.

---

## 8. Light theme overrides

Add a short `[data-theme="light"]` block for the new .enc-* classes:

```css
[data-theme="light"] .enc-hero{
  border-color: rgba(var(--ph-strategy-rgb), 0.35);
}
[data-theme="light"] .enc-deep{
  border-color: rgba(0, 0, 0, 0.1);
}
[data-theme="light"] .enc-deep-body{
  border-top-color: rgba(0, 0, 0, 0.08);
}
[data-theme="light"] .enc-example{
  border-color: rgba(var(--ph-research-rgb), 0.45);
}
[data-theme="light"] .enc-hero::before{
  color: #fff;
}
```

(Expanded during Phase D with full audit against existing v32.13 light
theme block at lines 1589-1601.)

---

## 9. CSS budget

| Area                      | Lines approx | Source            |
|---------------------------|--------------|-------------------|
| Container + grid recipe   | 70           | R5 + R3 cap       |
| Hero tile                 | 60           | R3                |
| Section kicker + title    | 30           | R3                |
| Benefit / flow / meta     | 90           | R3                |
| Real example              | 25           | R3                |
| Deep dive                 | 55           | R3                |
| Infographic thumb         | 30           | R3                |
| PDF button                | 25           | R3                |
| Nastepny card             | 35           | R3                |
| Hover + reveal utilities  | 40           | R3                |
| Reading progress          | 25           | R3                |
| Glossary term             | 10           | R3                |
| Zoom lightbox (R4)        | 70           | R4                |
| Light theme overrides     | 30           | phase D audit     |
| **TOTAL**                 | ~595         |                   |

File growth: ~595 lines added, ~11 replaced, ~0 deleted. Net +584 CSS lines.

Combined with ~230 JS (zoom modal) + ~50 JS (observers + progress) + ~450
JS (rysujBentoAgentaV14) + ~3.5MB base64 infographics in AGENT_MEDIA +
~400 lines AGENT_EDU_PL constant: final HTML ~4.3MB, ~8500 lines.

End of DESIGN_SPEC.
