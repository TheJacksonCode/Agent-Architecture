# v32.9 Task 1 - HITL Gate #1 Decision

**Date:** 2026-04-10
**Gate:** Visual direction for preset sidebar redesign
**Options presented:** 3 (Slim Fingerprint, Bold Fingerprint, Compact Dots)
**User choice:** **Compact Dots** (option C)

## What this means for Build

### Locked parameters (from the chosen option)
- **Row height: 40px** (unchanged from v32.8 - NOT increased to 48px)
- **Phase indicator: 6-dot row** instead of stacked bar
  - 6 dots total, one per phase (strategy / research / debate / build / qa / hitl)
  - Phase present in preset = full phase color at ~85% opacity
  - Phase absent = gray dot at ~15% opacity
  - Dominant phase dot = slightly larger (7px vs 6px) and full opacity
  - Rationale: less proportional info than stacked bar, but more compact. User prioritized density.
- **NEW badge: inline right of name** (not corner ribbon, despite option label - the preview clarified this)
- **Featured: handled via row tint** (same as option A - Notion/Vercel pattern)
- **Description: single line clamped**
- **Max presets visible on screen** (~15 at 600px sidebar height)

### Layout (final)
```
+-------------------------------------------+
| [i] preset_name      [NEW]     [* 9]      |   line 1: icon + name + optional NEW + count chip right
|     Short description text    . R . . . . |   line 2: desc left + 6 dots right
+-------------------------------------------+
  ^-- 2px left border = dominant phase color (phase housing)
```

### DD overrides vs base T1_DESIGN_SPEC
- **DD2 REVISED**: phase indicator is dots (.pr-dots) not stacked bar (.pr-phases). Keep 6 dots, highlight dominant.
- **DD9 REVISED**: row height stays at 40px (not 48px). Use CSS grid 2-column-3-row to fit count chip and dots on separate lines without growing the row.
- **DD5 KEPT**: featured = subtle tinted bg + accent border
- **DD1, DD3, DD4, DD6, DD7, DD8, DD10, DD11, DD12 KEPT as-is**

### CSS delta (replaces .pr-phases recipe in T1_DESIGN_SPEC.md section "Stacked phase bar")

```css
/* Compact 6-dot phase indicator (HITL Gate #1 choice: Compact Dots) */
.pr-dots{
  display:inline-flex; align-items:center; gap:3px;
  flex-shrink:0;
}
.pr-dots i{
  display:block; width:5px; height:5px; border-radius:50%;
  background:rgba(255,255,255,.12);
  transition:background var(--dur-2,160ms) ease,
             transform var(--dur-2,160ms) ease;
}
.pr-dots i.pr-dot-on.ph-strategy{background:var(--ph-strategy);opacity:.85;}
.pr-dots i.pr-dot-on.ph-research{background:var(--ph-research);opacity:.85;}
.pr-dots i.pr-dot-on.ph-debate{background:var(--ph-debate);opacity:.85;}
.pr-dots i.pr-dot-on.ph-build{background:var(--ph-build);opacity:.85;}
.pr-dots i.pr-dot-on.ph-qa{background:var(--ph-qa);opacity:.85;}
.pr-dots i.pr-dot-on.ph-hitl{background:var(--ph-hitl);opacity:.85;}
.pr-dots i.pr-dot-dom{width:7px; height:7px; opacity:1;}
.pr-item:hover .pr-dots i.pr-dot-on{opacity:1;}

/* Grid layout for 40px compact row */
.pr-item{
  display:grid;
  grid-template-columns: 30px 1fr auto;
  grid-template-rows: auto auto;
  column-gap: 10px;
  row-gap: 2px;
  padding: 6px 12px;
  min-height: 40px;
  /* border + rest from base spec DD10 */
}
.pr-item .pr-orb{grid-row:1 / span 2; grid-column:1; align-self:center;}
.pr-item .pr-name{grid-row:1; grid-column:2; align-self:center;
  display:flex; align-items:center; gap:6px; min-width:0;}
.pr-item .pr-desc{grid-row:2; grid-column:2; align-self:center;}
.pr-item .pr-cnt{grid-row:1; grid-column:3; align-self:center;}
.pr-item .pr-dots{grid-row:2; grid-column:3; align-self:center;}
```

### rPresety JS delta

```js
// compute phCount as in base spec, then instead of stacked bar segments:
const dotsHTML = ['strategy','research','debate','build','qa','hitl'].map(p=>{
  const present = phCount[p] > 0;
  const domCls = (p === dom && present) ? ' pr-dot-dom' : '';
  const onCls = present ? ' pr-dot-on ph-'+p : '';
  return '<i class="'+onCls+domCls+'"></i>';
}).join('');
// then in HTML:
// <div class="pr-dots" aria-hidden="true">'+dotsHTML+'</div>
```

## Rationale for the choice (user's perspective)
User picked max density - more presets visible on screen without scrolling, phase info is "hint-level" not proportional. Trade-off accepted: cannot tell "how much research vs build" at a glance, but CAN tell "this preset uses research" which is the primary decision signal for the picker.

## Go for Build
All decisions locked. Proceed to T1-G Build phase.
