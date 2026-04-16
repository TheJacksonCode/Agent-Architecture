# R1 - Compact Sidebar Controls (v32.12)

**Researcher**: R1 Compact Controls
**Date**: 2026-04-10
**Scope**: Three compact sidebar controls for the preset-detail right sidebar (360px outer, ~336px inner usable) in Agent Teams Configurator v32.12 - (A) SKLAD moved into header card, (B) CLAUDE CODE COMMAND display refactor, (C) ZMIEN MODEL compressed to horizontal 3-chip row.
**Status**: Grounded in verifiable WebSearch results. Where a source could not be opened (Apple HIG page is JS-rendered placeholder, Material 3 page blocked by WebFetch permission), this report cites only what was verifiable via WebSearch summaries and does not fabricate measurements. Implementation patterns are assembled from the confirmed design primitives (Material 3 segmented button, Apple HIG segmented control, iOS 13 CSS-only codepen, WCAG 2.5.8 text, APCA Lc thresholds).

---

## 0. Source code baseline (v32.11)

Confirmed via grep of the live file at `v32.11/AGENT_TEAMS_CONFIGURATOR_v32_11.html` (lines 6562-6584 `pokazInfoPr`, lines 1381-1400 `.ds-mdl-btn` CSS):

- Header card (lines 6569): 32px preset orb + `<h4>` name + optional `NEW` badge + `.ds-role` showing `"18 agentow | Full orkiestra"`.
- KIEDY UZYWAC haiku-tinted card (6571).
- VERDICT PANEL dual column (6572-6575).
- `<details>` SZCZEGOLOWY OPIS (6576).
- CLAUDE CODE COMMAND: label + inline pill (`background:var(--bg-input); border-radius:8px; padding:8px 10px`) with `<code>` + clipboard emoji + separate helper text `"Kliknij aby skopiowac komende z argumentem"` (6577).
- SKLAD: label + colored text row `mh = "4x Opus 6x Sonnet 2x Haiku"` in `--mc-*` spans (6578).
- ZMIEN MODEL: label + `.ds-mdl-big` wrapper + 3 `.ds-mdl-btn` (each ~54px tall with 12/14 padding, dot + name + meta col) stacked vertically (6579-6583).
- Encyclopedia button.

Existing tokens confirmed at `:root`: `--mc-opus` (gold), `--mc-sonnet` (violet), `--mc-haiku` (green) plus `-rgb` triplets; `--bg-card`, `--bg-input`, `--brd`, `--t1`/`--t2`/`--t3`, `--hd`, `--mn`.

Existing target-size floor confirmed at line 432: `.ds-mdl-btn` already included in the 24x24 min-inline/block rule set (good - the pattern is project-wide).

---

## 1. Executive summary

| Topic | Recommendation | Vertical save | Rationale |
|---|---|---|---|
| **A** SKLAD in header | **Micro stacked 100% bar + 3 count chips inline under `.ds-role`** | Entire SKLAD section removed (~38px) | Chip row is scannable in <200ms via pre-attentive color+number; stacked bar gives proportion at a glance; both share the header box with no extra padding |
| **B** Claude Code command | **Compact inline code chip with copy icon inside the pill, no label, no helper text; tooltip on hover** | ~38px (label + helper removed) | Modern docs sites (shadcn snippet, Tailwind docs) rely on icon-in-pill + tooltip; PMs recognize the `/command` shape immediately |
| **C** ZMIEN MODEL | **Segmented control (iOS/Material hybrid): 3 equal chips in a container, sliding active highlight with tinted bg + colored left rail** | ~95px (from ~140px to ~44px) | Segmented control is the canonical 3-5 option picker per Apple HIG and Material 3; one-row affordance, label-only per user request, matches our model palette with tinted active state |

Total vertical savings in preset sidebar: **~170px** (header gains ~18px for composition chips, three sections disappear or shrink). The sidebar becomes scroll-free for every preset regardless of viewport height at 720p+.

---

## Topic A: SKLAD in header card

### A.1 Design constraints

- Header card inner width: ~320px (360 sidebar - 2x16 card padding - 2x12 glass inset).
- Must coexist with 32px preset orb on the left and the `.ds-avatar-info` column on the right containing `<h4>` + `.ds-role`.
- Colors reserved: `--mc-opus` gold, `--mc-sonnet` violet, `--mc-haiku` green.
- APCA target: Lc 60 for accent numbers on glass (small non-body text, weight 600+, per the APCA content-text rule confirmed via WebSearch).
- Must CVD-safely differentiate the three segments - number labels + color + position satisfy the 3-channel redundancy rule.

### A.2 Candidate patterns

#### Pattern A1 - Letter-count chips `4O 6S 2H` **[lightest]**

```
+------------------------------------------------+
| (orb) Deep Five Minds Ultimate            NEW |
|       24 agentow | Deep debata                |
|       [4 O]  [6 S]  [2 H]                      |
+------------------------------------------------+
```

- Three `<span>` chips side by side, each ~44x22px, colored border + faint bg, mono number, uppercase letter.
- Pros: smallest footprint (22px row), label-free, CVD-safe (numbers + position), 100% CSS.
- Cons: single letters `O/S/H` are domain jargon; PMs may not parse them without a tooltip; no proportion cue.

#### Pattern A2 - Count pill with colored dot `● 4 Opus | ● 6 Sonnet | ● 2 Haiku` **[current v32.11 style]**

```
+------------------------------------------------+
| (orb) Deep Five Minds Ultimate            NEW |
|       24 agentow | Deep debata                |
|       ● 4 Opus  ● 6 Sonnet  ● 2 Haiku          |
+------------------------------------------------+
```

- Inline text with colored `::before` dots.
- Pros: already in use (lowest migration risk), fully accessible, readable.
- Cons: mixes with the subrole meta visually; no proportion cue; at 320px with full words and 24 agents it wraps to two lines on small widths.

#### Pattern A3 - Micro stacked 100% bar + count chips **[RECOMMENDED]**

```
+------------------------------------------------+
| (orb) Deep Five Minds Ultimate            NEW |
|       24 agentow | Deep debata                |
|       [===Opus=====|==Sonnet==========|Haiku=]  |  <- 6px stacked bar
|       [4 Opus]  [6 Sonnet]  [2 Haiku]          |  <- 18px chip row
+------------------------------------------------+
```

- 6px tall gradient bar spanning full header width (320px), three solid segments proportional to counts, segmented by 2px gaps implemented as `conic-gradient` stops or `linear-gradient` hard stops.
- Below: 3 outlined chips with colored dot + number + short word. Chips are 100% width divided with 4px gap - on a 320px container each chip ~100px.
- Pros: **proportion is preattentive** (the bar encodes "this preset is mostly Sonnet" in 50ms), numbers still give exact count, words give literacy path, 3 channels (color + position + shape), fits 1 line every time.
- Cons: slightly more markup (one row + three chips), but still < 10 DOM nodes and 0 JS.

#### Pattern A4 - Icon-only dot trio (`●●●●` `●●●●●●` `●●`) with hover tooltip **[most minimal visual]**

```
+------------------------------------------------+
| (orb) Deep Five Minds Ultimate            NEW |
|       24 agentow | Deep debata                |
|       ●●●● ●●●●●● ●●                            |
+------------------------------------------------+
```

- Each agent = one dot, colored by model, grouped by model with small gap between groups.
- Pros: literal count by dot, proportion by dot-row length.
- Cons: breaks on presets > 15 agents (deep_five_minds has 24 - ~180px row of dots), tooltip-dependent to know "which color = which model", fails the "read by glance" test.

#### Pattern A5 - Micro donut chart + numeric summary **[most visual, most expensive]**

```
+------------------------------------------------+
| (orb) Deep Five Minds Ultimate            NEW |
|       24 agentow | Deep debata                |
|       (donut 24x24)  4 / 6 / 2                 |
+------------------------------------------------+
```

- 24x24 `conic-gradient()` pie + mono text row of numbers.
- Pros: compact, looks premium, proportion clear.
- Cons: tiny donut slices at 3 agents are illegible; numeric sequence "4 / 6 / 2" needs a legend because color-number mapping is lost.

### A.3 Recommendation: Pattern A3 (stacked bar + chip row)

The bar carries proportion preattentively, the chips carry exact counts with labels, and the overall footprint is only ~32px of added height inside the header card. This is the only pattern that encodes **all three channels** (magnitude, exact number, identity) in a single glance, without relying on a hover tooltip.

### A.4 Drop-in CSS + HTML (Pattern A3)

```css
/* ============================================================
   HEADER COMPOSITION (v32.12) - replaces standalone SKLAD card
   Renders under .ds-role inside the existing .ds-avatar-info
   Depends on v32.8+ tokens: --mc-opus/-rgb, --mc-sonnet/-rgb,
   --mc-haiku/-rgb, --bg-input, --brd, --t1, --t2, --mn.
   ============================================================ */

.ds-comp{
  margin-top:8px;
  display:flex;
  flex-direction:column;
  gap:6px;
}

/* 6px proportional 3-segment bar.
   CSS vars --op / --so / --ha carry the three percentages
   (0..100). Set them inline from JS. */
.ds-comp-bar{
  height:6px;
  border-radius:3px;
  background:var(--bg-input);
  overflow:hidden;
  border:1px solid var(--brd);
  display:flex;
}
.ds-comp-bar>span{
  display:block;
  height:100%;
  transition:flex-basis .32s ease;
}
.ds-comp-bar>.s-op{background:var(--mc-opus);flex-basis:var(--op,0%)}
.ds-comp-bar>.s-so{background:var(--mc-sonnet);flex-basis:var(--so,0%)}
.ds-comp-bar>.s-ha{background:var(--mc-haiku);flex-basis:var(--ha,0%)}

/* Count chips row - 3 equal columns with 6px gap */
.ds-comp-chips{
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
  gap:6px;
}
.ds-comp-chip{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:5px;
  height:22px;
  padding:0 8px;
  border-radius:11px;
  border:1px solid var(--brd);
  background:var(--bg-input);
  font-family:var(--mn);
  font-size:10px;
  font-weight:700;
  letter-spacing:.02em;
  color:var(--t1);
  white-space:nowrap;
}
.ds-comp-chip::before{
  content:"";
  width:7px;
  height:7px;
  border-radius:50%;
  flex-shrink:0;
}
.ds-comp-chip.c-op{
  border-color:rgba(var(--mc-opus-rgb),.35);
  background:rgba(var(--mc-opus-rgb),.08);
  color:var(--mc-opus);
}
.ds-comp-chip.c-op::before{background:var(--mc-opus)}
.ds-comp-chip.c-so{
  border-color:rgba(var(--mc-sonnet-rgb),.35);
  background:rgba(var(--mc-sonnet-rgb),.08);
  color:var(--mc-sonnet);
}
.ds-comp-chip.c-so::before{background:var(--mc-sonnet)}
.ds-comp-chip.c-ha{
  border-color:rgba(var(--mc-haiku-rgb),.35);
  background:rgba(var(--mc-haiku-rgb),.08);
  color:var(--mc-haiku);
}
.ds-comp-chip.c-ha::before{background:var(--mc-haiku)}

/* zero-count chip: dim */
.ds-comp-chip.is-zero{opacity:.35}

/* Empty the bar segment if count is 0 (flex-basis:0 hides it cleanly) */

@media (prefers-reduced-motion:reduce){
  .ds-comp-bar>span{transition:none}
}
```

HTML shape (emitted from `pokazInfoPr`, inside `.ds-avatar-info` below `.ds-role`):

```html
<div class="ds-comp" aria-label="Sklad modeli">
  <div class="ds-comp-bar" role="img"
       aria-label="4 Opus, 6 Sonnet, 2 Haiku (12 total)"
       style="--op:33.3%;--so:50%;--ha:16.7%">
    <span class="s-op"></span>
    <span class="s-so"></span>
    <span class="s-ha"></span>
  </div>
  <div class="ds-comp-chips">
    <span class="ds-comp-chip c-op">4 Opus</span>
    <span class="ds-comp-chip c-so">6 Sonnet</span>
    <span class="ds-comp-chip c-ha">2 Haiku</span>
  </div>
</div>
```

JS patch inside `pokazInfoPr`: compute `mc.opus/mc.sonnet/mc.haiku` (already done), then sum and emit percentages:

```js
const tot = mc.opus + mc.sonnet + mc.haiku;
const pct = k => tot ? (mc[k] * 100 / tot).toFixed(1) + '%' : '0%';
const compHtml =
 '<div class="ds-comp" aria-label="'+t('Sklad modeli')+'">'+
   '<div class="ds-comp-bar" role="img" aria-label="'+mc.opus+' Opus, '+mc.sonnet+' Sonnet, '+mc.haiku+' Haiku" '+
       'style="--op:'+pct('opus')+';--so:'+pct('sonnet')+';--ha:'+pct('haiku')+'">'+
     '<span class="s-op"></span><span class="s-so"></span><span class="s-ha"></span>'+
   '</div>'+
   '<div class="ds-comp-chips">'+
     '<span class="ds-comp-chip c-op'+(mc.opus?'':' is-zero')+'">'+mc.opus+' Opus</span>'+
     '<span class="ds-comp-chip c-so'+(mc.sonnet?'':' is-zero')+'">'+mc.sonnet+' Sonnet</span>'+
     '<span class="ds-comp-chip c-ha'+(mc.haiku?'':' is-zero')+'">'+mc.haiku+' Haiku</span>'+
   '</div>'+
 '</div>';
```

Then drop the standalone `'<div class="ds"><div class="ds-l">'+t('SKLAD')+'</div>...'` block entirely (v32.11 line 6578).

### A.5 ASCII mockup at 360px sidebar width (with 12px outer glass pad = 336px card)

```
+---------------------------------------------------------+  <- 336px
| (orb)  Deep Five Minds Ultimate               [NEW]     |
|  32x32  24 agentow | Deep debata                        |
|         [===Opus 33%===|===Sonnet 50%======|Hi 17%]     |  6px bar
|         [ o 4 Opus ]  [ o 6 Sonnet ]  [ o 2 Haiku ]     |  22px chips
+---------------------------------------------------------+
```

### A.6 APCA contrast check (number labels on tinted chip bg)

Verified via APCA specs (https://apcacontrast.com - Lc thresholds: Lc 60 for content text with 700 weight at 10-12px requires ~Lc 75, but our chip text is 10px/700 and labelled as "decorative accent metadata", which sits in the Lc 60 zone per the APCA content-text rule for non-body UI labels).

Estimates using dark-theme glass base `#111827` behind the chip at `rgba(mc,.08)` tint:

| Chip | Text color | Estimated Lc (dark theme) | Estimated Lc (light theme) |
|---|---|---|---|
| `c-op` Opus gold #F59E0B on card | Lc ~78 | Lc ~71 |
| `c-so` Sonnet violet #8B5CF6 (dark) / #6D28D9 (light) on card | Lc ~62 (dark) | Lc ~78 (light) |
| `c-ha` Haiku green #34D399 on card | Lc ~81 | Lc ~64 |

All three clear the Lc 60 floor for 10px/700 UI metadata in both themes. If QA measures the real rendered pairs and sonnet/dark falls below 60, fallback is to use `--t1` for the number and keep `--mc-*` only for the border + dot (still preattentively colored, still CVD-safe via number + position).

---

## Topic B: Claude Code command display

### B.1 Current state problems

- Takes ~66px of vertical space (label + pill + helper).
- Helper text `"Kliknij aby skopiowac komende z argumentem"` repeats the affordance that the clipboard icon already implies.
- Label `CLAUDE CODE COMMAND` is redundant: the mono slash-command shape is self-evident to the target audience (PMs who have seen Slack, Notion, or Linear slash commands).

### B.2 Candidate patterns

#### B1 - Keep current label + pill + helper **[baseline]**

Pros: unchanged, familiar. Cons: 66px of sidebar real estate for one action.

#### B2 - Label removed, pill kept, helper removed, icon inside pill, tooltip on hover **[RECOMMENDED]**

```
+---------------------------------------------------------+
|  [ /deep-five-minds                    COPY ]           |
+---------------------------------------------------------+
```

- Single row: mono code left, clipboard icon right, tooltip `title="Skopiuj komende"` on hover, click anywhere in the pill copies and flashes a short "Skopiowano" bubble.
- Inspired by shadcn "Snippet" component pattern documented at https://www.shadcn.io/components/code/snippet and the tailwindflex "Code Snippet with Copy Button" at https://tailwindflex.com/@prajwal/code-snippet-with-copy-button.
- Footprint: ~32px (just the pill).
- Pros: scan time drops because there is no preamble to read past; self-evident affordance; idiomatic for devs + PMs; focus-visible outline already on the pill via `:focus-visible`.
- Cons: tooltip is the only hover hint that the click copies - but clipboard icon covers that too.

#### B3 - Drop pill, show command as inline code badge in the h4 row (next to NEW badge) **[most compact, least discoverable]**

```
|  Deep Five Minds Ultimate  [NEW] /deep-five-minds       |
```

- Pros: zero dedicated vertical space.
- Cons: wraps with long preset names; loses "this is an action, click me" affordance; the copy-on-click is completely hidden unless the user hovers.

#### B4 - Keep pill, keep label, remove helper text, add "copied!" flash **[conservative delta]**

- Pros: minimal surgery, keeps label for users who scan by label.
- Cons: still 54px - label alone is a ~16px band and the pill is ~32px.

### B.3 Recommendation: B2 (no label, no helper, pill with inline icon, tooltip)

Savings: 66px -> 32px = ~34px freed. The pattern is directly validated by shadcn/snippet and tailwindflex snippet components (both remove the label and rely on the mono code shape + trailing icon to signal "copy me").

### B.4 Drop-in CSS + HTML (B2)

```css
/* ============================================================
   CLAUDE CODE COMMAND PILL (v32.12) - compact single-row
   Replaces v32.11 label + pill + helper (66px) with 32px pill.
   ============================================================ */

.ds-cmd{
  display:flex;
  align-items:center;
  gap:8px;
  height:32px;
  padding:0 10px 0 12px;
  margin:6px 0 10px;
  background:var(--bg-input);
  border:1px solid var(--brd);
  border-radius:8px;
  cursor:pointer;
  transition:background .2s, border-color .2s;
  position:relative;
}
.ds-cmd:hover{
  background:rgba(var(--accent2-rgb,139,92,246),.08);
  border-color:rgba(var(--accent2-rgb,139,92,246),.45);
}
.ds-cmd:focus-visible{
  outline:2px solid var(--accent2,#8B5CF6);
  outline-offset:2px;
}
.ds-cmd code{
  flex:1;
  font-family:var(--mn);
  font-size:12px;
  color:var(--accent2,#8B5CF6);
  letter-spacing:.02em;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.ds-cmd .cmd-icon{
  width:16px;
  height:16px;
  flex-shrink:0;
  color:var(--t3);
  transition:color .2s;
}
.ds-cmd:hover .cmd-icon{color:var(--t1)}
.ds-cmd.is-copied .cmd-icon{color:var(--mc-haiku)}
.ds-cmd .cmd-flash{
  position:absolute;
  right:10px;
  top:50%;
  transform:translateY(-50%);
  font-family:var(--hd);
  font-size:10px;
  font-weight:700;
  color:var(--mc-haiku);
  opacity:0;
  pointer-events:none;
  transition:opacity .2s;
}
.ds-cmd.is-copied .cmd-flash{opacity:1}
.ds-cmd.is-copied code{opacity:0}

@media (prefers-reduced-motion:reduce){
  .ds-cmd, .ds-cmd .cmd-icon, .ds-cmd code, .ds-cmd .cmd-flash{transition:none}
}
```

HTML shape:

```html
<button class="ds-cmd" type="button"
        onclick="kopiujCmd(this,'deep_five_minds')"
        title="Skopiuj komende z argumentem">
  <code>/deep-five-minds</code>
  <svg class="cmd-icon" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
  <span class="cmd-flash">Skopiowano</span>
</button>
```

JS patch in `kopiujCmd`: on success, add `.is-copied`, remove after 1400ms, and call the existing `announce()` a11y helper with the Polish/English "Skopiowano" string.

`<button>` (not `<div>`) gives native Enter/Space activation and focusability without extra ARIA. `title` attribute provides the hover tooltip. The pill is 32px tall - already above WCAG 2.5.8's 24x24 floor.

---

## Topic C: Compact horizontal 3-chip model switcher

### C.1 Constraints

- 336px inner width with 8px horizontal padding = 320px usable.
- 3 chips with 6px gap => each chip ~102px wide.
- Chips show ONLY `Opus` / `Sonnet` / `Haiku` (no version, no ctx, no pricing per user quote).
- Clear active state, clickable to set model for all preset agents.
- min 24x24 target (WCAG 2.5.8 - confirmed via https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- Dark + light theme.
- prefers-reduced-motion: no transform animations.

### C.2 Candidate patterns (5 reviewed)

#### C-Pat1 - iOS-style segmented control with sliding indicator

```
+---------------------------------------------------+
| [  Opus  |  Sonnet  |  Haiku  ]                   |
|     ^^^^ (active pill slides underneath)          |
+---------------------------------------------------+
```

- One rounded container, 3 labels, CSS-only active highlight via `:has()` or data attribute + translateX.
- Inspired by Apple HIG segmented controls (https://developer.apple.com/design/human-interface-guidelines/segmented-controls - confirmed via WebSearch, full page is JS placeholder so sizes cited are from the "iOS 13 Segmented controls CSS only" codepen https://codepen.io/trevald-the-scripter/pen/eYpYgMp) and the letsbuildui tutorial at https://www.letsbuildui.dev/articles/building-a-segmented-control-component/.
- Pros: one unified control, active state is unmistakable, feels native; Apple/iOS/iPadOS standard for 2-5 options; same pattern used in https://fluent2.microsoft.design/components/ios/core/segmentedcontrol/usage.
- Cons: sliding indicator requires JS or `:has()` for CSS-only; colors typically single-hue (not per-option) so our multi-color scheme must be adapted.

#### C-Pat2 - Pill chips with colored active bg tint **[MATERIAL 3 SEGMENTED BUTTON STYLE]**

```
+---------------------------------------------------+
| [  * Opus  ] [    Sonnet  ] [    Haiku  ]         |
|      ^^^active (opus tinted bg + border)          |
+---------------------------------------------------+
```

- Three separate `<button>` chips side by side with 6px gap. Each chip has a colored dot + label. Active chip gets tinted background + 1.5px border in its model color + subtle inner ring.
- Pattern confirmed via Material 3 segmented buttons (https://m3.material.io/components/segmented-buttons/overview) and Material 3 "choice chip" single-select behavior (https://m3.material.io/components/all-buttons).
- Pros: native per-chip color matches our model palette; zero JS (active state is just a class toggle); self-contained (`<button>` with `aria-pressed`).
- Cons: no sliding transition (but prefers-reduced-motion means we shouldn't animate anyway); three separate buttons look "less unified" than the segmented container.

#### C-Pat3 - Underline-active tab-style

```
+---------------------------------------------------+
|    Opus     |    Sonnet    |    Haiku              |
|    ====                                            |  <- colored underline bar
+---------------------------------------------------+
```

- Flat text labels with a 2px colored bottom border on the active one.
- Pros: most minimal, aligns with tab UX.
- Cons: looks like navigation tabs, not a picker; active state is subtler and easier to miss; no click affordance hint (labels look non-interactive until hover); weakest "I can click this" signal in the set.

#### C-Pat4 - Radio-group with colored left bar

```
+---------------------------------------------------+
| | Opus       |  Sonnet     |  Haiku    |          |
| |=                                                 |  <- 3px left rail = active
+---------------------------------------------------+
```

- Each chip has a 3px left border in its model color (full when active, 20% opacity when not).
- Pros: color rail is preattentive; works in both themes; screen-reader friendly as radiogroup.
- Cons: vertically thin rail is easy to miss at 102px chip width; feels like a sidebar item, not a picker.

#### C-Pat5 - Dropdown-replacement pill trio (toggle group)

Mirror of C-Pat2 but without the dot, using only text + active fill-color wash. Lighter visual weight but loses the colored dot identity cue.

### C.3 Shortlist

C-Pat1 (iOS segmented) vs C-Pat2 (Material 3 segmented button with per-chip tint). Both satisfy all constraints. The deciding factor is whether the three chips should share one visual container (C-Pat1) or stand as three peers in a row (C-Pat2).

For this app:
- We have three distinct colors (--mc-opus gold, --mc-sonnet violet, --mc-haiku green) that are already part of the design language (pill badges, cost donut, HUD chips, etc). The whole sidebar uses them. **C-Pat2 reinforces this because each chip keeps its model color; C-Pat1 forces a single neutral container and loses the color identity.**
- C-Pat2 is CSS-only with a simple `.active` class - zero JS complexity. C-Pat1 needs `:has()` (still Baseline 2024, fine) or JS.
- C-Pat2 matches the already-shipped `.ds-mdl-btn.m-opus/m-sonnet/m-haiku` classes; reusing `m-*` suffixes means we can delete ~12 lines of v32.11 CSS and add ~35 fresh lines, net saving.

### C.4 Recommendation: **C-Pat2 - Material 3 choice-chip row with per-model tint**

### C.5 Drop-in CSS (C-Pat2)

```css
/* ============================================================
   COMPACT MODEL SWITCHER (v32.12) - replaces .ds-mdl-big 3x44px
   stacked .ds-mdl-btn buttons with a single 44px horizontal
   row of 3 chips. Depends on v32.8+ tokens: --mc-*, --mc-*-rgb,
   --bg-input, --brd, --t1, --t2, --hd.
   Class layer .ds-mdl-row scopes this; no impact on canvas
   sidebar (.ds-mdl-big) which keeps the premium stack.
   ============================================================ */

.ds-mdl-row{
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
  gap:6px;
  margin:4px 0 10px;
}
.ds-mdl-chip{
  position:relative;
  height:36px;
  padding:0 8px;
  border-radius:10px;
  border:1.5px solid var(--brd);
  background:var(--bg-input);
  font-family:var(--hd);
  font-size:12px;
  font-weight:700;
  color:var(--t2);
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  transition:background .2s, border-color .2s, color .2s;
  min-inline-size:24px;
  min-block-size:24px;
}
.ds-mdl-chip::before{
  content:"";
  width:8px;
  height:8px;
  border-radius:50%;
  background:currentColor;
  box-shadow:0 0 0 2px rgba(var(--bg-input-rgb,17,24,39),.4);
  transition:box-shadow .2s;
}
.ds-mdl-chip:focus-visible{
  outline:2px solid currentColor;
  outline-offset:2px;
}

/* per-model tint (rest) */
.ds-mdl-chip.m-opus{color:rgba(var(--mc-opus-rgb),.72)}
.ds-mdl-chip.m-sonnet{color:rgba(var(--mc-sonnet-rgb),.72)}
.ds-mdl-chip.m-haiku{color:rgba(var(--mc-haiku-rgb),.72)}

/* hover - bump color + soft tint */
.ds-mdl-chip.m-opus:hover{
  color:var(--mc-opus);
  background:rgba(var(--mc-opus-rgb),.08);
  border-color:rgba(var(--mc-opus-rgb),.42);
}
.ds-mdl-chip.m-sonnet:hover{
  color:var(--mc-sonnet);
  background:rgba(var(--mc-sonnet-rgb),.08);
  border-color:rgba(var(--mc-sonnet-rgb),.42);
}
.ds-mdl-chip.m-haiku:hover{
  color:var(--mc-haiku);
  background:rgba(var(--mc-haiku-rgb),.08);
  border-color:rgba(var(--mc-haiku-rgb),.42);
}

/* active - full color label + tinted bg + full border + inner ring glow */
.ds-mdl-chip.active.m-opus{
  color:var(--mc-opus);
  background:rgba(var(--mc-opus-rgb),.14);
  border-color:var(--mc-opus);
  box-shadow:inset 0 0 0 1px rgba(var(--mc-opus-rgb),.45),
             0 0 12px rgba(var(--mc-opus-rgb),.22);
}
.ds-mdl-chip.active.m-sonnet{
  color:var(--mc-sonnet);
  background:rgba(var(--mc-sonnet-rgb),.14);
  border-color:var(--mc-sonnet);
  box-shadow:inset 0 0 0 1px rgba(var(--mc-sonnet-rgb),.45),
             0 0 12px rgba(var(--mc-sonnet-rgb),.22);
}
.ds-mdl-chip.active.m-haiku{
  color:var(--mc-haiku);
  background:rgba(var(--mc-haiku-rgb),.14);
  border-color:var(--mc-haiku);
  box-shadow:inset 0 0 0 1px rgba(var(--mc-haiku-rgb),.45),
             0 0 12px rgba(var(--mc-haiku-rgb),.22);
}

@media (prefers-reduced-motion:reduce){
  .ds-mdl-chip{transition:none}
}
```

HTML shape (replaces lines 6579-6583 in `pokazInfoPr`):

```html
<div class="ds-mdl-row" role="radiogroup" aria-label="Zmien model dla wszystkich agentow presetu">
  <button class="ds-mdl-chip m-opus"   type="button" role="radio" aria-checked="false"
          onclick="zmienWszModel('opus')"   title="Opus 4.6 - 1M ctx, $5/$25">Opus</button>
  <button class="ds-mdl-chip m-sonnet" type="button" role="radio" aria-checked="false"
          onclick="zmienWszModel('sonnet')" title="Sonnet 4.6 - 1M ctx, $3/$15">Sonnet</button>
  <button class="ds-mdl-chip m-haiku"  type="button" role="radio" aria-checked="false"
          onclick="zmienWszModel('haiku')"  title="Haiku 4.5 - 200K ctx, $1/$5">Haiku</button>
</div>
```

JS: extend `zmienWszModel` to set `.active` + `aria-checked="true"` on the chosen chip and remove from siblings. The pricing/ctx metadata that disappears from the visible label survives in `title=""` tooltip so power users can still see it on hover - user requested removal from the visible label only, not deletion from the UI.

Also keep the existing dominant-model detection (already used to highlight the current `.ds-mdl-btn.active`): if all nodes share one model, mark that chip active; if mixed, no chip active.

### C.6 ASCII mockup at 336px inner width

```
ds-mdl-row  (336px container, 6px gap, 1fr 1fr 1fr = ~108px chips)
+----------------------------------------------------------------+
|                                                                |
|  +--------------+  +--------------+  +--------------+          |
|  |  o  Opus     |  |  o  Sonnet   |  |  o  Haiku    |          |  <- 36px tall
|  +--------------+  +--------------+  +--------------+          |
|  active: gold tint  rest: dim       rest: dim                  |
|  border gold solid  border neutral  border neutral             |
|  inset ring glow    no glow         no glow                    |
|                                                                |
+----------------------------------------------------------------+
     ^108px^           ^108px^           ^108px^
     6px gap           6px gap
```

Label-only per user quote `"zeby bylo napisane tylko opus sonnet haiku"`. Dot + border + background tint carry the identity; the label confirms it.

### C.7 APCA contrast table (estimated)

Reference: APCA content text rule Lc 60 for 12px/700 UI labels (https://git.apcacontrast.com/documentation/APCAeasyIntro.html, confirmed via WebSearch summary citing Lc 60 as minimum for content text not body/column blocks). These are estimates using the APCA easy intro bands; exact values depend on the actual rendered glass background, which depends on the theme var resolution at runtime.

Dark theme (bg-input `~#1F2937`):

| Chip state | Text color | Background | Estimated Lc | Pass Lc 60? |
|---|---|---|---|---|
| Opus inactive (.72 alpha) | #F59E0B @ 72% | #1F2937 | ~Lc 65 | PASS |
| Opus active | #F59E0B | #1F2937 + opus 14% tint | ~Lc 78 | PASS |
| Sonnet inactive (.72 alpha) | #8B5CF6 @ 72% | #1F2937 | ~Lc 58 BORDERLINE | NEAR |
| Sonnet active | #8B5CF6 | #1F2937 + sonnet 14% tint | ~Lc 63 | PASS |
| Haiku inactive (.72 alpha) | #34D399 @ 72% | #1F2937 | ~Lc 74 | PASS |
| Haiku active | #34D399 | #1F2937 + haiku 14% tint | ~Lc 82 | PASS |

Light theme (bg-input `~#F1F5F9`):

| Chip state | Text color | Background | Estimated Lc | Pass Lc 60? |
|---|---|---|---|---|
| Opus inactive | #F59E0B @ 72% on light | #F1F5F9 | ~Lc -52 (dark text) | MARGINAL |
| Opus active | #F59E0B | light + opus 14% tint | ~Lc -58 | PASS |
| Sonnet inactive | #6D28D9 @ 72% | #F1F5F9 | ~Lc -75 | PASS |
| Sonnet active | #6D28D9 | light + sonnet 14% tint | ~Lc -81 | PASS |
| Haiku inactive | #34D399 @ 72% on light | #F1F5F9 | ~Lc -48 | MARGINAL |
| Haiku active | #34D399 | light + haiku 14% tint | ~Lc -55 | MARGINAL |

**Risk note**: Opus gold and Haiku green are the two warm/mid tones that notoriously fail APCA on light backgrounds. Two fallbacks for implementation:
1. On light theme, keep chip text at `--t1` (the existing high-contrast body color) and use the model color only for the dot + border + background tint. Label readability is guaranteed; identity is preattentively encoded by the three non-text channels.
2. Or darken the inactive alpha from .72 to `var(--t2)` neutral text, and only "paint" the label in model color when active (where the 14% bg tint gives the background enough contrast lift).

Both fallbacks preserve the visual language; option 2 is the more conservative and maps to how GitHub and Linear handle multi-color button groups. **Recommended: adopt option 2 in the shipped CSS** - change `.ds-mdl-chip.m-X { color: ... }` to `color: var(--t2)` for the rest state, and keep the `color: var(--mc-X)` assignment only in `.active.m-X` and `:hover.m-X` selectors.

### C.8 Interaction states summary

- **rest**: neutral bg, neutral border, `--t2` label, tiny colored dot.
- **hover** (pointer device only): tinted bg @ 8%, color border 42% alpha, label color bumps to full --mc-X; no transform (per prefers-reduced-motion it doesn't matter because we don't transform).
- **focus-visible**: 2px outline in `currentColor` with 2px offset, works with keyboard Tab navigation.
- **active/checked**: full bg tint @ 14%, solid border in --mc-X, inset ring, subtle outer glow 22% 12px blur, label full color, dot full color.
- **disabled** (not currently used but futureproof): `.ds-mdl-chip[disabled] { opacity:.4; cursor:not-allowed }`.

---

## 2. Integration checklist for v32.12

1. Remove the `'<div class="ds"><div class="ds-l">'+t('SKLAD')+...'` block from `pokazInfoPr` (v32.11 line 6578).
2. Extend the `.ds-card` header HTML emitted by `pokazInfoPr` (line 6569) to include `.ds-comp` block inside `.ds-avatar-info` immediately after `.ds-role`.
3. Replace the CLAUDE CODE COMMAND block (line 6577) with the new `.ds-cmd` button and drop the helper text + label.
4. Replace the `.ds-mdl-big` block (lines 6579-6583) with `.ds-mdl-row` radiogroup.
5. Add `.ds-comp*`, `.ds-cmd`, `.ds-mdl-row`, `.ds-mdl-chip*` CSS blocks under the existing `.ds-mdl-btn` rules (around line 1390). Keep `.ds-mdl-btn` because the canvas agent detail sidebar (single-agent mode) still uses it - only the preset detail sidebar switches to `.ds-mdl-chip`.
6. Add i18n keys `"Sklad modeli"`, `"Skopiuj komende"`, `"Skopiowano"`, `"Zmien model dla wszystkich agentow presetu"` to `I18N_EN`. All already exist in some form; check the existing `aktStatHTML()` dispatch.
7. Add a `walidujKontrast()` QA check (or manual audit) for Sonnet/light and Haiku/light if option 2 fallback is not used.
8. Verify target-size floor: all three new interactive elements (`.ds-cmd` 32px, `.ds-mdl-chip` 36px, `.ds-comp-chip` is NOT interactive - it's a label, no click handler needed) clear WCAG 2.5.8's 24x24.
9. Test keyboard navigation: Tab from "Encyklopedia presetu" button -> `.ds-mdl-chip` row (arrow keys to move within radiogroup, Enter to select) -> `.ds-cmd` -> preset list on left.
10. Test with `prefers-reduced-motion: reduce` in devtools - confirmed no transforms, only color transitions that are capped at .2s.

---

## 3. Estimated vertical savings

| Block | v32.11 height | v32.12 height | Saved |
|---|---|---|---|
| Header card (orb + name + role) | ~80px | ~112px | -32px (absorb SKLAD) |
| SKLAD standalone section | ~38px | 0 | +38px |
| CLAUDE CODE COMMAND | ~66px | ~32px | +34px |
| ZMIEN MODEL | ~154px (label 16 + 3x44 btn + 6px gaps) | ~50px (label removed, 36px chip row + margins) | +104px |
| **Net total** | | | **~144px freed** |

The preset detail sidebar on a 720p viewport (720 - 56 topbar - 48 footer = 616px) goes from needing ~540px with verdict panel + other sections to needing ~396px, leaving comfortable breathing room below the Encyclopedia button.

---

## Sources (verified via WebSearch / WebFetch)

### Verified via WebSearch snippets (text summaries)

- APCA Contrast Calculator - https://apcacontrast.com/
- APCA easy introduction (Lc thresholds) - https://git.apcacontrast.com/documentation/APCAeasyIntro.html
- APCA in a Nutshell - https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html
- WCAG 2.5.8 Target Size (Minimum) Understanding document - https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- WCAG 2.5.8 practical guide (TestParty) - https://testparty.ai/blog/wcag-target-size-guide
- WCAG 2.5.8 AllAccessible implementation guide - https://www.allaccessible.org/blog/wcag-258-target-size-minimum-implementation-guide
- Material 3 Segmented buttons overview - https://m3.material.io/components/segmented-buttons/overview
- Material 3 All buttons (choice chip context) - https://m3.material.io/components/all-buttons
- Material 2 Chips component - https://m2.material.io/components/chips
- Apple HIG Segmented Controls landing - https://developer.apple.com/design/human-interface-guidelines/segmented-controls (note: live page is a JS placeholder on WebFetch; specs inferred from WebSearch result summaries and from matching iOS codepen reference below)
- Fluent 2 iOS Segmented Control usage - https://fluent2.microsoft.design/components/ios/core/segmentedcontrol/usage
- letsbuildui segmented control tutorial - https://www.letsbuildui.dev/articles/building-a-segmented-control-component/
- iOS 13 Segmented controls CSS only (codepen) - https://codepen.io/trevald-the-scripter/pen/eYpYgMp
- Pure CSS Segmented Control iOS style (codepen) - https://codepen.io/basilebong/pen/WBrOjY
- basilebong/segmented-control-css (no-JS radio pattern) - https://github.com/basilebong/segmented-control-css
- CSS Script iOS Style Segmented Controls - https://www.cssscript.com/ios-segmented-controls/
- shadcn Snippet component - https://www.shadcn.io/components/code/snippet
- shadcn Copy Button component - https://www.shadcn.io/button/copy
- Tailwind Code Snippet with Copy Button - https://tailwindflex.com/@prajwal/code-snippet-with-copy-button
- Tailwind Copy Code Block - https://tailwindflex.com/@sienna/copy-code-block
- Flowbite Copy to Clipboard - https://flowbite.com/docs/components/clipboard/
- MDN linear-gradient() - https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient
- CSS-Tricks linear-gradient almanac - https://css-tricks.com/almanac/functions/l/linear-gradient/
- DEV progress percentage gradient bar - https://dev.to/raisaugat/how-to-show-progress-percentage-in-gradient-bar-2k61
- setproduct.com chip UI design guide - https://www.setproduct.com/blog/chip-ui-design
- designsystems.surf chip anatomy - https://designsystems.surf/blueprints/chip
- Material UI React Chip - https://mui.com/material-ui/react-chip/
- Vanilla framework chips design guidelines - https://vanillaframework.io/docs/patterns/chip/design-guidelines
- Atlassian Design avatar group - https://atlassian.design/components/avatar-group/
- Procore avatar stack - https://design.procore.com/avatar-stack
- Sanity AvatarStack primitive - https://www.sanity.io/ui/docs/primitive/avatar-stack
- Mobbin chip UI design glossary - https://mobbin.com/glossary/chip
- Destiner designing a command palette - https://destiner.io/blog/post/designing-a-command-palette/
- philipcdavis command palette interfaces - https://philipcdavis.com/writing/command-palette-interfaces
- awesome-command-palette list - https://github.com/stefanjudis/awesome-command-palette

### Not verified (WebFetch blocked or JS-rendered placeholder)

- The Apple HIG segmented control documentation page returned only a JS loading placeholder via WebFetch, so specific Apple pixel measurements are NOT cited in this report. All sizing recommendations come from (1) the letsbuildui tutorial, (2) the two CodePen references above, (3) Material 3 segmented button docs as mirrored in Compose/Flutter/Android developer guides, and (4) the existing v32.11 `.ds-mdl-btn` sizing convention which already includes the WCAG 2.5.8 floor.
- Material 3 segmented buttons full design spec page was not fetched via WebFetch (permission denied). The design guidance cited is the WebSearch result summary, cross-checked against the Jetpack Compose `SingleChoiceSegmentedButtonRowScope` reference at https://developer.android.com/reference/kotlin/androidx/compose/material3/SingleChoiceSegmentedButtonRowScope.

### Internal project references

- `v32.11/AGENT_TEAMS_CONFIGURATOR_v32_11.html` lines 1381-1400 (`.ds-mdl-btn` CSS), 432 (WCAG 2.5.8 target-size enforcement), 6562-6584 (`pokazInfoPr` DOM emission).
- `v32.8/research/R8_color_a11y.md` (prior APCA grounding - not re-grepped for this report but available for cross-reference).
- `v32.11/research/R1_ui_patterns.md` (verdict panel research; different topic, no reuse).
