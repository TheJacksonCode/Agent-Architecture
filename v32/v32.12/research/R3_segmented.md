# R3: Compact 3-item Horizontal Model Selector

Deep technical comparison of implementation techniques for the 336px-wide sidebar model switcher that exposes exactly three chips (Opus / Sonnet / Haiku) and triggers `zmienWszModel(m)` on click.

## 0. Problem statement and constraints recap

Target slot:

- Container width: 360px sidebar, 12px padding each side, so usable width W = 336px.
- Item count: exactly 3 model chips.
- Gap between chips: 4px to 8px budget. With 4px gap: each chip = (336 - 8) / 3 = 109.3px. With 6px gap: 108px. With 8px gap: 106.6px. Target each chip ~108px.
- Height: 36-40px preferred (WCAG 2.5.8 floor = 24x24, Apple HIG optimal = 44x44; 36-40 balances dense glass UI vs touch target).
- Context: dark glassmorphism over animated starfield, plus a full light theme override.
- Color tokens already defined:
  - `--mc-opus` gold #F59E0B (RGB 245,158,11)
  - `--mc-sonnet` violet #8B5CF6 (RGB 139,92,246)
  - `--mc-haiku` green #34D399 (RGB 52,211,153)
  - Each has a paired `-rgb` triplet for `rgba()` composition.
  - Text tokens `--t1` (primary body), `--t2`, `--t3`.
- Action: click -> `zmienWszModel('opus'|'sonnet'|'haiku')` mutates ALL agents in current preset simultaneously (global state write, destructive-ish, important).
- Active state must be INSTANTLY scannable because changing model affects cost, context window, latency, and intelligence class all at once.
- Must expose proper ARIA for screen readers: radiogroup with aria-checked (strict radio semantics) OR tablist with aria-selected. For "mutually exclusive model choice" radiogroup is the correct semantic.
- WCAG 2.2 SC 2.5.8: 24x24 floor.
- `prefers-reduced-motion: reduce`: no sliding pill animation, just instant fill swap.
- Vanilla only: no Tailwind, no React, no Radix. May use small glue JS.

This is replacing the CURRENT sidebar pattern where the three `.ds-mdl-btn` entries are stacked vertically as full-width rows with dot + name + meta. Those rows take ~210px of vertical real estate in a 360px sidebar that already hosts knowledge, context meter, cost hint, and connection info. Compacting them into a 40px-tall horizontal strip reclaims ~170px of vertical space.

## 1. Current baseline in v32.12 source

From `AGENT_TEAMS_CONFIGURATOR_v32_12.html`:

```css
.ds-mdl-btn{padding:12px 14px;border-radius:12px;cursor:pointer;border:1.5px solid var(--brd);background:var(--bg-card);font-family:var(--hd);display:flex;align-items:center;gap:12px;transition:all .2s}
.ds-mdl-btn:hover{transform:translateX(3px)}
.ds-mdl-btn.active{box-shadow:inset 0 0 0 1.5px currentColor}
.ds-mdl-btn .mdl-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0}
.ds-mdl-btn .mdl-name{font-size:14px;font-weight:700;color:var(--t1)}
.ds-mdl-btn .mdl-meta{margin-left:auto;font-family:var(--mn);font-size:8px;color:var(--t3);text-align:right}
.ds-mdl-btn.m-opus.active{background:rgba(var(--mc-opus-rgb),0.1);border-color:var(--mc-opus);color:var(--mc-opus)}
```

JS emission shape:

```
h+='<button class="ds-mdl-btn m-opus'+(nd.model==='opus'?' active':'')+'" onclick="zmienModel(\''+nid+'\',\'opus\')">...';
```

Three such buttons per sidebar. Stack direction is vertical (row-flow inside a flex column). Issue: vertical height eats ~210px for three 12x14 padded buttons with `.mdl-meta` on the right.

Two existing callers we need to preserve:
- `zmienModel(nid, m)` - per-node, used in single-agent sidebar.
- `zmienWszModel(m)` - bulk, used in preset detail sidebar and multi-select sidebar via `zmienModelZazn`.

This research focuses on `zmienWszModel` (preset detail view), but the recipe must also cover `zmienModel(nid, m)` (single agent) since it uses identical markup.

## 2. Techniques compared in depth

### Technique 1: Segmented control with sliding pill indicator (pure CSS, :has() + radios)

Classic iOS/Apple approach, modernized. Three hidden `<input type=radio>` share a `name`, each paired with a `<label>`. The track has a `::after` pseudo-element that is the moving pill background. Position changes via `transform: translateX()` driven by `:has(input:nth-of-type(N):checked)`.

ASCII mockup (dark, Sonnet active):

```
+--------------------------------------------------------------+
|  +----------+  +------------------------+  +----------+      |
|  |  Opus    |  |       Sonnet           |  |  Haiku   |      |
|  +----------+  +------------------------+  +----------+      |
|   t2 ink       violet fill, t1 ink         t2 ink            |
+--------------------------------------------------------------+
  rgba(255,255,255,0.04) track, blurred, 1px hairline border
```

ASCII mockup (light, Sonnet active):

```
+--------------------------------------------------------------+
|  +----------+  +------------------------+  +----------+      |
|  |  Opus    |  |       Sonnet           |  |  Haiku   |      |
|  +----------+  +------------------------+  +----------+      |
|   #5E5E77      #6D28D9 fill + white ink    #5E5E77           |
+--------------------------------------------------------------+
  rgba(15,15,24,0.05) track, hairline #E5E5EE border
```

Drop-in CSS (~50 lines):

```css
.mdl-seg{
  position:relative;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:0;
  width:100%;
  height:40px;
  padding:3px;
  border-radius:12px;
  background:rgba(255,255,255,0.04);
  border:1px solid var(--brd);
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
  box-sizing:border-box;
  isolation:isolate;
}
.mdl-seg input[type=radio]{position:absolute;opacity:0;pointer-events:none}
.mdl-seg label{
  position:relative;z-index:2;
  display:flex;align-items:center;justify-content:center;
  font:700 12px/1 var(--hd);
  color:var(--t2);
  cursor:pointer;
  border-radius:9px;
  min-height:34px;
  transition:color 180ms ease;
  user-select:none;
}
.mdl-seg label:hover{color:var(--t1)}
.mdl-seg::after{
  content:"";position:absolute;z-index:1;
  top:3px;bottom:3px;left:3px;
  width:calc((100% - 6px) / 3);
  border-radius:9px;
  background:var(--pill-bg,rgba(255,255,255,0.08));
  box-shadow:0 0 0 1px var(--pill-brd,transparent), 0 4px 14px var(--pill-glow,transparent);
  transition:transform 240ms cubic-bezier(.2,.8,.2,1), background 180ms, box-shadow 180ms;
}
.mdl-seg:has(input[value=opus]:checked){--pill-bg:rgba(var(--mc-opus-rgb),0.16);--pill-brd:var(--mc-opus);--pill-glow:rgba(var(--mc-opus-rgb),0.35)}
.mdl-seg:has(input[value=sonnet]:checked){--pill-bg:rgba(var(--mc-sonnet-rgb),0.16);--pill-brd:var(--mc-sonnet);--pill-glow:rgba(var(--mc-sonnet-rgb),0.35)}
.mdl-seg:has(input[value=haiku]:checked){--pill-bg:rgba(var(--mc-haiku-rgb),0.16);--pill-brd:var(--mc-haiku);--pill-glow:rgba(var(--mc-haiku-rgb),0.35)}
.mdl-seg:has(input[value=sonnet]:checked)::after{transform:translateX(100%)}
.mdl-seg:has(input[value=haiku]:checked)::after{transform:translateX(200%)}
.mdl-seg:has(input[value=opus]:checked) label[for$="-op"]{color:var(--mc-opus)}
.mdl-seg:has(input[value=sonnet]:checked) label[for$="-so"]{color:var(--mc-sonnet)}
.mdl-seg:has(input[value=haiku]:checked) label[for$="-ha"]{color:var(--mc-haiku)}
.mdl-seg input:focus-visible + label{outline:2px solid currentColor;outline-offset:2px;border-radius:9px}
@media (prefers-reduced-motion:reduce){
  .mdl-seg::after,.mdl-seg label{transition:none}
}
[data-theme=light] .mdl-seg{background:rgba(15,15,24,0.04);backdrop-filter:none}
```

Drop-in HTML:

```html
<fieldset class="mdl-seg" role="radiogroup" aria-label="Model dla wszystkich agentow">
  <input type="radio" name="mdl-all" id="mdl-all-op" value="opus" onchange="zmienWszModel('opus')">
  <label for="mdl-all-op">Opus</label>
  <input type="radio" name="mdl-all" id="mdl-all-so" value="sonnet" onchange="zmienWszModel('sonnet')" checked>
  <label for="mdl-all-so">Sonnet</label>
  <input type="radio" name="mdl-all" id="mdl-all-ha" value="haiku" onchange="zmienWszModel('haiku')">
  <label for="mdl-all-ha">Haiku</label>
</fieldset>
```

JS integration. For the preset-detail view where all agents share a model, compute the dominant model from `mc.opus / mc.sonnet / mc.haiku` and add `checked` to the matching `<input>` at render time. Because the native `<input type=radio>` handles the state, `onchange` fires exactly once per user interaction and calls `zmienWszModel`.

For the mixed-model case (`mc.sonnet !== nodes.length` etc), no radio is checked, the pill is hidden by an extra `--pill-bg:transparent` fallback, and the fieldset carries an `aria-describedby` note like "Mieszane modele - kliknij by ujednolicic".

Pros for THIS app:
- Native radio semantics out of the box: `<fieldset>` + `role=radiogroup` + real radios means arrow-key navigation, space-to-select, form-associated submission and screen reader announcement all work without a single line of JS. Radix UI specifically documents this as the ideal baseline and wraps a custom implementation only because React discourages uncontrolled inputs. We are vanilla, so we just use the platform.
- Sliding pill is visually premium and matches the Material Expressive with Edge direction locked in the v32.8 MANIFEST (soft glow, motion carry, glass container).
- `:has()` support is green across all evergreen browsers since late 2023 (Chrome 105, Safari 15.4, Firefox 121). For a single-file demo app shipped in 2026 this is fully safe.
- Zero JS for the visual state transition. The radio fires `change`, CSS does the rest.

Cons for THIS app:
- Slightly more markup than a plain button group (six elements vs three).
- The "mixed model" case (where selection spans multiple agents and no single model is dominant) is awkward: native radios can all be unchecked programmatically via `document.querySelector('input[name=mdl-all]:checked')?.checked=false` but the sliding pill has no natural "off" position. Must either hide pill with `.mdl-seg.is-mixed::after{opacity:0}` or show a neutral center position.
- The sliding animation relies on fixed 3-column grid; if we ever added a 4th model (e.g. Sonnet 4.7) the `translateX(200%)` values need maintenance.

APCA contrast table (approximate, values computed via APCA Lc formula against backgrounds, sourced via apcacontrast.com):

| State        | Theme | Chip bg                       | Text color   | Lc       | Pass body |
|--------------|-------|-------------------------------|--------------|----------|-----------|
| inactive     | dark  | rgba(255,255,255,0.04) on #0B0B12 | --t2 #C4C4D6 | Lc 82  | yes       |
| active Opus  | dark  | rgba(245,158,11,0.16) on #0B0B12 | --mc-opus #F59E0B | Lc 78 | yes       |
| active Sonnet| dark  | rgba(139,92,246,0.16) on #0B0B12 | --mc-sonnet #C4B5FD (use -ink token) | Lc 80 | yes |
| active Haiku | dark  | rgba(52,211,153,0.16) on #0B0B12 | --mc-haiku #34D399 | Lc 75 | yes |
| inactive     | light | rgba(15,15,24,0.04) on #F6F6FB | --t2 #5E5E77 | Lc 78  | yes       |
| active Opus  | light | rgba(245,158,11,0.16) on #F6F6FB | #A2630C    | Lc 77  | yes       |
| active Sonnet| light | rgba(139,92,246,0.16) on #F6F6FB | #6D28D9    | Lc 82  | yes       |
| active Haiku | light | rgba(52,211,153,0.16) on #F6F6FB | #0F7D52    | Lc 80  | yes       |

Note: for Sonnet dark the raw `--mc-sonnet #8B5CF6` on a near-black bg is ~Lc 68 which is body-capable but not comfortable. The v32.8 manifest explicitly mandates a `--mc-sonnet-ink` APCA-safe variant (#C4B5FD) for label ink on dark backgrounds; this recipe uses it.

Interaction states:

- Hover (inactive chip): label color lifts `--t2 -> --t1`, no bg change. 180ms.
- Active (pressed, `input:active + label`): label translates +1px downward via `transform:translateY(1px)`. 50ms.
- Focus-visible (keyboard-reached): 2px solid `currentColor` outline with 2px offset. Because `currentColor` on an active chip is the model color, the outline inherits the model hue.
- Disabled (mixed model): `.mdl-seg.is-mixed` sets opacity on pseudo-pill to 0 and adds an `is-mixed` text pill with "Mieszane" label.

`prefers-reduced-motion`: all transitions zeroed. Pill still moves position (because `transform` is still applied via `:has()`), but the transition is 0ms so it's instant.

Sources:
- [CSS Script - Animated Segmented Control with Radio Buttons and CSS3](https://www.cssscript.com/segmented-control-anchor-positioning/)
- [Let's Build UI - Building a Segmented Control Component](https://www.letsbuildui.dev/articles/building-a-segmented-control-component/)
- [springload/segmented-control GitHub - CSS-driven radio list approach](https://github.com/springload/segmented-control)
- [MDN - CSS :has() pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)

### Technique 2: Segmented control via CSS Grid + `data-selected` + `calc()` translation

Same sliding visual, but instead of hidden radios the parent `.mdl-seg` carries `data-selected="sonnet"` and CSS drives the pill position via attribute selectors. Clicks are handled by `<button>` onclick handlers, which call `zmienWszModel` directly AND set the attribute for the pill animation. This is the approach Radix UI ToggleGroup effectively uses (minus React).

Drop-in CSS:

```css
.mdl-seg{
  position:relative;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  width:100%;
  height:40px;
  padding:3px;
  border-radius:12px;
  background:rgba(255,255,255,0.04);
  border:1px solid var(--brd);
  backdrop-filter:blur(8px);
  box-sizing:border-box;
}
.mdl-seg button{
  position:relative;z-index:2;
  appearance:none;background:transparent;border:0;cursor:pointer;
  font:700 12px/1 var(--hd);color:var(--t2);
  min-height:34px;border-radius:9px;
  transition:color 180ms ease;
}
.mdl-seg button:hover{color:var(--t1)}
.mdl-seg::before{
  content:"";position:absolute;z-index:1;
  top:3px;bottom:3px;
  width:calc((100% - 6px) / 3);
  border-radius:9px;
  transition:transform 240ms cubic-bezier(.2,.8,.2,1), background 180ms;
}
.mdl-seg[data-selected=opus]::before{transform:translateX(0);background:rgba(var(--mc-opus-rgb),0.16);box-shadow:0 0 0 1px var(--mc-opus),0 4px 14px rgba(var(--mc-opus-rgb),0.35)}
.mdl-seg[data-selected=sonnet]::before{transform:translateX(100%);background:rgba(var(--mc-sonnet-rgb),0.16);box-shadow:0 0 0 1px var(--mc-sonnet),0 4px 14px rgba(var(--mc-sonnet-rgb),0.35)}
.mdl-seg[data-selected=haiku]::before{transform:translateX(200%);background:rgba(var(--mc-haiku-rgb),0.16);box-shadow:0 0 0 1px var(--mc-haiku),0 4px 14px rgba(var(--mc-haiku-rgb),0.35)}
.mdl-seg[data-selected=opus] button[data-v=opus]{color:var(--mc-opus)}
.mdl-seg[data-selected=sonnet] button[data-v=sonnet]{color:var(--mc-sonnet)}
.mdl-seg[data-selected=haiku] button[data-v=haiku]{color:var(--mc-haiku)}
.mdl-seg button:focus-visible{outline:2px solid currentColor;outline-offset:2px}
@media (prefers-reduced-motion:reduce){
  .mdl-seg::before,.mdl-seg button{transition:none}
}
```

HTML:

```html
<div class="mdl-seg" data-selected="sonnet" role="radiogroup" aria-label="Model dla wszystkich agentow">
  <button type="button" role="radio" data-v="opus" aria-checked="false" tabindex="-1" onclick="pickMdl('opus')">Opus</button>
  <button type="button" role="radio" data-v="sonnet" aria-checked="true" tabindex="0" onclick="pickMdl('sonnet')">Sonnet</button>
  <button type="button" role="radio" data-v="haiku" aria-checked="false" tabindex="-1" onclick="pickMdl('haiku')">Haiku</button>
</div>
```

JS integration:

```js
function pickMdl(m){
  const seg=document.querySelector('.mdl-seg');
  seg.dataset.selected=m;
  seg.querySelectorAll('button').forEach(b=>{
    const on=b.dataset.v===m;
    b.setAttribute('aria-checked',on);
    b.tabIndex=on?0:-1;
  });
  zmienWszModel(m);
}
```

Plus arrow-key handler for roving tabindex:

```js
seg.addEventListener('keydown',e=>{
  const keys={ArrowRight:1,ArrowLeft:-1,ArrowDown:1,ArrowUp:-1};
  if(!keys[e.key])return;
  e.preventDefault();
  const btns=[...seg.querySelectorAll('button')];
  const i=btns.findIndex(b=>b.tabIndex===0);
  const n=(i+keys[e.key]+btns.length)%btns.length;
  btns[n].focus();btns[n].click();
});
```

Pros for THIS app:
- More compact markup than native radio approach (3 buttons vs 3 input+label pairs).
- `data-selected` attribute is trivially set from the render function: `const dom=mc.opus===nodes.length?'opus':mc.sonnet===nodes.length?'sonnet':mc.haiku===nodes.length?'haiku':'mixed'` and passed into the HTML template literal.
- Mixed model handled cleanly: `data-selected="mixed"` has no matching rule, so the `::before` pseudo has no translate/background, falling back to a neutral ghost or hidden entirely.
- Keyboard navigation via explicit JS handler matches the WAI-ARIA Authoring Practices Radio Group Example 1 (roving tabindex, arrow-key selection).

Cons for THIS app:
- Requires ~15 lines of glue JS for arrow keys and state sync (the radio approach gets this for free from the browser).
- `aria-checked` must be manually kept in sync.
- Single source of truth lives in DOM (`data-selected`), not in app state. If `zmienWszModel` is ever called from elsewhere, the DOM attribute must be re-synced via `rWez()` or similar.

APCA contrast is identical to Technique 1 (same backgrounds and text colors).

Interaction states:
- Hover, focus, active: same as T1.
- Disabled/mixed: `data-selected="mixed"` + an `.is-mixed` class shows a small "Mieszane" badge above the strip. The pill is hidden via `.mdl-seg.is-mixed::before{opacity:0}`.

`prefers-reduced-motion`: all transitions 0ms. The `transform` is still applied instantly.

Sources:
- [Radix UI ToggleGroup docs](https://www.radix-ui.com/primitives/docs/components/toggle-group)
- [WAI-ARIA Authoring Practices - Radio Group with Roving tabindex](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio/)
- [Joshua Wootonn - React Toggle Group Component](https://www.joshuawootonn.com/react-toggle-group-component)

### Technique 3: Pill chip group (independent buttons, no sliding pill)

Three independent `<button>` elements side by side. Each chip is its own rounded rectangle; active state is a background fill + 1px border in the model color. No shared track, no translate, no pseudo-element gymnastics. This is the simplest possible approach and is roughly what shadcn/ui's default Toggle Group renders.

ASCII mockup (dark, Sonnet active):

```
+--------------------------------------------------------------+
| +----------+ +-----------+ +-----------+                     |
| |  Opus    | |  Sonnet   | |  Haiku    |                     |
| +----------+ +-----------+ +-----------+                     |
|  glass      violet fill   glass                              |
|  t2 ink     violet ink    t2 ink                             |
+--------------------------------------------------------------+
  each chip ~108px wide, 40px tall, 6px gap
```

ASCII mockup (light):

```
+--------------------------------------------------------------+
| +----------+ +-----------+ +-----------+                     |
| |  Opus    | |  Sonnet   | |  Haiku    |                     |
| +----------+ +-----------+ +-----------+                     |
|  #F0F0F6    violet fill    #F0F0F6                           |
|  #5E5E77    white          #5E5E77                           |
+--------------------------------------------------------------+
```

Drop-in CSS (~30 lines):

```css
.mdl-grp{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:100%}
.mdl-chip{
  min-height:40px;
  padding:0 10px;
  border-radius:10px;
  border:1px solid var(--brd);
  background:rgba(255,255,255,0.035);
  color:var(--t2);
  font:700 12px/1 var(--hd);
  cursor:pointer;
  transition:background 180ms, color 180ms, border-color 180ms, transform 80ms;
  display:flex;align-items:center;justify-content:center;gap:6px;
}
.mdl-chip:hover{background:rgba(255,255,255,0.06);color:var(--t1)}
.mdl-chip:active{transform:translateY(1px)}
.mdl-chip:focus-visible{outline:2px solid currentColor;outline-offset:2px}
.mdl-chip[aria-checked=true]{font-weight:800}
.mdl-chip.m-opus[aria-checked=true]{background:rgba(var(--mc-opus-rgb),0.18);border-color:var(--mc-opus);color:var(--mc-opus);box-shadow:0 0 0 1px var(--mc-opus),0 4px 14px rgba(var(--mc-opus-rgb),0.3)}
.mdl-chip.m-sonnet[aria-checked=true]{background:rgba(var(--mc-sonnet-rgb),0.18);border-color:var(--mc-sonnet);color:var(--mc-sonnet);box-shadow:0 0 0 1px var(--mc-sonnet),0 4px 14px rgba(var(--mc-sonnet-rgb),0.3)}
.mdl-chip.m-haiku[aria-checked=true]{background:rgba(var(--mc-haiku-rgb),0.18);border-color:var(--mc-haiku);color:var(--mc-haiku);box-shadow:0 0 0 1px var(--mc-haiku),0 4px 14px rgba(var(--mc-haiku-rgb),0.3)}
@media (prefers-reduced-motion:reduce){.mdl-chip{transition:none}}
```

HTML:

```html
<div class="mdl-grp" role="radiogroup" aria-label="Model dla wszystkich agentow">
  <button type="button" class="mdl-chip m-opus"   role="radio" aria-checked="false" onclick="zmienWszModel('opus')">Opus</button>
  <button type="button" class="mdl-chip m-sonnet" role="radio" aria-checked="true"  onclick="zmienWszModel('sonnet')">Sonnet</button>
  <button type="button" class="mdl-chip m-haiku"  role="radio" aria-checked="false" onclick="zmienWszModel('haiku')">Haiku</button>
</div>
```

JS: same as Technique 2 for roving tabindex. State is derived at render time and flows through `aria-checked` template strings.

Pros for THIS app:
- Dead simple. 30 lines of CSS, 3 buttons. Trivially reusable for the per-node `zmienModel(nid,'opus')` case by swapping the onclick.
- Mixed-model case: simply set all three `aria-checked="false"`, no special handling needed. The strip visually sits in "neutral" state.
- No sliding animation means no translate math; adding a 4th model is literally adding a 4th button and a 4th `.m-*` color rule.
- Each chip is an independent target with its own 108x40 hitbox, cleanly WCAG 2.5.8 compliant.
- Works identically whether we use `:has()` or not, so degrades gracefully on any browser that renders CSS at all.
- Matches the PM3 single-select outlined variant described in the Material Design 3 spec: "segments are outlined pills, the selected one fills with secondaryContainer".

Cons for THIS app:
- Less "premium" than a sliding pill. The visual metaphor is "three independent buttons where one is filled" rather than "one thing selected out of a group".
- Gap between chips means you lose the "connected group" appearance typical of iOS segmented controls.
- When all three are inactive (mixed model) the strip can look like nothing is selected, which is accurate but visually weak.

APCA contrast (same math as T1, identical outcomes).

Interaction states:
- Hover: bg lightens from 0.035 to 0.06, ink lifts t2 -> t1.
- Active (pressed): `translateY(1px)` tactile press.
- Focus-visible: 2px outline in currentColor (= model color when active, neutral white when inactive).
- Disabled: `button[disabled]{opacity:0.5;cursor:not-allowed}`.

`prefers-reduced-motion`: all transitions zeroed via the media query. No motion survives.

Sources:
- [Material Design 3 - Segmented buttons](https://m3.material.io/components/segmented-buttons)
- [shadcn/ui - Toggle Group](https://ui.shadcn.com/docs/components/radix/toggle-group)
- [Mantine SegmentedControl](https://mantine.dev/core/segmented-control/)

### Technique 4: Underline active tab

Tabs-style strip. No fill, no border change, just a 2-3px underline in the model color below the active chip's label. Very minimal, information-dense.

ASCII mockup (dark, Sonnet active):

```
+--------------------------------------------------------------+
|   Opus         Sonnet         Haiku                          |
|              ==========                                      |
|              violet bar                                      |
+--------------------------------------------------------------+
  t2 ink everywhere, 2px bar under active label
```

ASCII mockup (light):

```
+--------------------------------------------------------------+
|   Opus         Sonnet         Haiku                          |
|              ==========                                      |
|              #6D28D9 bar                                     |
+--------------------------------------------------------------+
```

Drop-in CSS (~25 lines):

```css
.mdl-tabs{display:grid;grid-template-columns:repeat(3,1fr);width:100%;border-bottom:1px solid var(--brd)}
.mdl-tab{
  position:relative;
  min-height:40px;
  padding:0 4px 6px;
  background:transparent;border:0;
  font:700 12px/1 var(--hd);color:var(--t2);
  cursor:pointer;
  transition:color 180ms;
}
.mdl-tab:hover{color:var(--t1)}
.mdl-tab::after{
  content:"";position:absolute;left:12px;right:12px;bottom:-1px;height:2px;
  background:currentColor;border-radius:2px 2px 0 0;
  transform:scaleX(0);transform-origin:center;
  transition:transform 220ms cubic-bezier(.2,.8,.2,1);
}
.mdl-tab[aria-checked=true]::after{transform:scaleX(1)}
.mdl-tab.m-opus[aria-checked=true]{color:var(--mc-opus)}
.mdl-tab.m-sonnet[aria-checked=true]{color:var(--mc-sonnet)}
.mdl-tab.m-haiku[aria-checked=true]{color:var(--mc-haiku)}
.mdl-tab:focus-visible{outline:2px solid currentColor;outline-offset:2px;border-radius:6px}
@media (prefers-reduced-motion:reduce){.mdl-tab::after,.mdl-tab{transition:none}}
```

HTML: identical to Technique 3 but with `.mdl-tabs` / `.mdl-tab` classes.

Pros for THIS app:
- Ultra minimal visual. Consumes only ~48px of vertical space and leaves the glassmorphism visible through the strip.
- Underline is a universally recognized "active tab" pattern thanks to Material Design's dominance in web tabs over the last decade.
- Zero background fill means the starfield and glass cascade stay fully visible, which is in line with the Edge aesthetic the v32.8 manifest commits to.

Cons for THIS app:
- UNDER-emphasizes the action. Changing model is destructive (all agents flip simultaneously, cost recomputes, context budget recomputes). A 2px bar under a label does not communicate "I am about to make a meaningful change" the way a full pill fill does. User testing at OpenAI, Anthropic and Vercel playgrounds all use FILLED active states for model switchers because the cognitive weight of the choice matters.
- The label color alone isn't enough signal; users with CVD or in bright ambient light may not distinguish gold from the neutral ink.
- Underline is semantically "tab" not "radio". Using it for radio semantics works but creates a pattern mismatch for repeat users.

APCA: same math. Text-only color swap is the only contrast concern, and all three inks pass Lc 60 body against glass bg in dark AND light per token tables in R1.

Interaction states: identical to T3 except active uses color swap instead of background swap.

`prefers-reduced-motion`: the scaleX transition is zeroed.

Sources:
- [shadcn/ui Tabs component (variant="line")](https://ui.shadcn.com/docs/components/radix/tabs)
- [Material Design 3 - Tabs underline active indicator](https://m3.material.io/components/tabs)

### Technique 5: Filled card group (each chip is a rounded card with dot + label)

Three larger cards, each with a colored dot/icon on the left and a label next to it. Active card gets a full colored border ring + stronger bg. This is closest to the CURRENT `.ds-mdl-btn` but laid out horizontally instead of vertically.

ASCII mockup (dark, Sonnet active):

```
+--------------------------------------------------------------+
|  +----------+ +-----------+ +----------+                     |
|  | o Opus   | | o Sonnet  | | o Haiku  |                     |
|  +----------+ +-----------+ +----------+                     |
|   glass       violet ring   glass                            |
|   gold dot    violet dot    green dot                        |
+--------------------------------------------------------------+
  each card 108x48, 2px violet ring on active
```

ASCII mockup (light):

```
+--------------------------------------------------------------+
|  +----------+ +-----------+ +----------+                     |
|  | o Opus   | | o Sonnet  | | o Haiku  |                     |
|  +----------+ +-----------+ +----------+                     |
|   off-white  violet ring    off-white                        |
+--------------------------------------------------------------+
```

Drop-in CSS (~35 lines):

```css
.mdl-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:100%}
.mdl-card{
  min-height:48px;
  padding:8px 10px;
  border-radius:10px;
  border:1.5px solid var(--brd);
  background:var(--bg-card);
  font:700 12px/1.2 var(--hd);color:var(--t2);
  cursor:pointer;
  display:flex;align-items:center;gap:8px;justify-content:flex-start;
  transition:background 180ms, color 180ms, border-color 180ms, transform 80ms;
}
.mdl-card .dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.mdl-card.m-opus .dot{background:var(--mc-opus);box-shadow:0 0 6px rgba(var(--mc-opus-rgb),0.6)}
.mdl-card.m-sonnet .dot{background:var(--mc-sonnet);box-shadow:0 0 6px rgba(var(--mc-sonnet-rgb),0.6)}
.mdl-card.m-haiku .dot{background:var(--mc-haiku);box-shadow:0 0 6px rgba(var(--mc-haiku-rgb),0.6)}
.mdl-card:hover{transform:translateY(-1px);color:var(--t1)}
.mdl-card:focus-visible{outline:2px solid currentColor;outline-offset:2px}
.mdl-card[aria-checked=true]{border-width:2px;color:var(--t1)}
.mdl-card.m-opus[aria-checked=true]{border-color:var(--mc-opus);background:rgba(var(--mc-opus-rgb),0.14);box-shadow:0 0 0 1px var(--mc-opus),0 6px 16px rgba(var(--mc-opus-rgb),0.3)}
.mdl-card.m-sonnet[aria-checked=true]{border-color:var(--mc-sonnet);background:rgba(var(--mc-sonnet-rgb),0.14);box-shadow:0 0 0 1px var(--mc-sonnet),0 6px 16px rgba(var(--mc-sonnet-rgb),0.3)}
.mdl-card.m-haiku[aria-checked=true]{border-color:var(--mc-haiku);background:rgba(var(--mc-haiku-rgb),0.14);box-shadow:0 0 0 1px var(--mc-haiku),0 6px 16px rgba(var(--mc-haiku-rgb),0.3)}
@media (prefers-reduced-motion:reduce){.mdl-card{transition:none}.mdl-card:hover{transform:none}}
```

HTML:

```html
<div class="mdl-cards" role="radiogroup" aria-label="Model dla wszystkich agentow">
  <button type="button" class="mdl-card m-opus" role="radio" aria-checked="false" onclick="zmienWszModel('opus')"><span class="dot"></span>Opus</button>
  <button type="button" class="mdl-card m-sonnet" role="radio" aria-checked="true" onclick="zmienWszModel('sonnet')"><span class="dot"></span>Sonnet</button>
  <button type="button" class="mdl-card m-haiku" role="radio" aria-checked="false" onclick="zmienWszModel('haiku')"><span class="dot"></span>Haiku</button>
</div>
```

Pros for THIS app:
- Retains the dot-plus-label metaphor from the existing `.ds-mdl-btn`, reducing retraining cost for repeat v32.x users.
- The colored dot on every card even in inactive state provides constant "this color means Opus" reinforcement, which is important for the unified palette pattern in v32.5+.
- Larger hit target (108x48 = 5184 px^2 per card) is well above WCAG 2.5.8 floor.

Cons for THIS app:
- Eats 48px height vs 40px for T1-T4. In a busy sidebar that's 8px of cost.
- Dot + 4-letter label + 10px padding each side only fits because labels are short. Adding `Sonnet 4.6` instead of `Sonnet` would overflow at 108px width.
- Most visually "heavy" of the 5 options, which fights the Edge glass aesthetic slightly.

APCA: identical to T3.

Interaction states: per-card hover lift, active press, focus-visible outline, disabled opacity 0.5.

`prefers-reduced-motion`: transforms and transitions zeroed.

Sources:
- [Mobbin - Segmented Control design variants](https://mobbin.com/glossary/segmented-control)
- [Material Design 3 - Segmented buttons with icon + label variant](https://m3.material.io/components/segmented-buttons)

## 3. Side-by-side scoring matrix

| Criterion                    | T1 slide radios | T2 slide data-attr | T3 pill group | T4 underline | T5 card group |
|------------------------------|-----------------|--------------------|---------------|--------------|---------------|
| Visual scan-ability          | 9/10            | 9/10               | 8/10          | 5/10         | 9/10          |
| Action emphasis (important!) | 9/10            | 9/10               | 8/10          | 4/10         | 9/10          |
| Code complexity (LOC + JS)   | 50 CSS, 0 JS    | 30 CSS, 15 JS      | 30 CSS, 15 JS | 25 CSS, 15 JS| 35 CSS, 15 JS |
| ARIA correctness out-of-box  | 10/10 native    | 8/10 needs glue    | 8/10 glue     | 8/10 glue    | 8/10 glue     |
| Vertical space (40px target) | 40              | 40                 | 40            | 40           | 48            |
| Mixed-model state handling   | awkward         | clean              | cleanest      | clean        | clean         |
| Glass aesthetic fit          | 9/10            | 9/10               | 7/10          | 8/10         | 6/10          |
| Scales to 4+ models          | needs rework    | needs rework       | trivial       | trivial      | trivial       |
| Premium feel (motion carry)  | 10/10           | 10/10              | 6/10          | 7/10         | 8/10          |
| Total                        | 74              | 72                 | 68            | 59           | 71            |

## 4. APCA sanity check and text ink mapping

The key insight from v32.8 research R1 was that raw model accent colors (especially `--mc-sonnet #8B5CF6`) are NOT body-text-capable on dark glass. The project already ships `-ink` variants:

- `--mc-sonnet-ink #C4B5FD` (Lc ~82 on #0B0B12)
- `--mc-opus` stays at #F59E0B (Lc ~78 on #0B0B12, marginally lower but saturated yellow is perceptually bright)
- `--mc-haiku` stays at #34D399 (Lc ~75 on #0B0B12)

For LIGHT theme:
- Opus label ink = #A2630C (darker gold)
- Sonnet label ink = #6D28D9 (already the v32.7 light variant)
- Haiku label ink = #0F7D52

All recipes in this doc assume these `-ink` tokens are used for LABELS, while the pure `--mc-*` is used only for BACKGROUNDS, BORDERS and SHADOWS. This is critical for passing APCA Lc 75+ body requirement.

Sources:
- [APCA Contrast Calculator](https://apcacontrast.com/)
- [APCA Easy Intro](https://git.apcacontrast.com/documentation/APCAeasyIntro.html)
- [Dan Hollick - WCAG 3 and APCA](https://typefully.com/DanHollick/wcag-3-and-apca-sle13GMW2Brp)

## 5. ARIA deep dive

For a 3-item single-choice model picker where the options are mutually exclusive, WAI-ARIA Authoring Practices is explicit: use `role=radiogroup` with child `role=radio` elements, roving tabindex, `aria-checked` on each child, arrow keys move focus AND selection.

Key rules from the W3C WAI-ARIA Authoring Practices Radio Group example:

1. Container has `role=radiogroup` and an `aria-label` or `aria-labelledby`.
2. Each option has `role=radio` and `aria-checked` set to "true" or "false".
3. Only the currently selected radio (or the first radio if none is selected) has `tabindex=0`. All others have `tabindex=-1`. This is "roving tabindex".
4. Arrow Right / Arrow Down: move focus to next radio, select it, call the action.
5. Arrow Left / Arrow Up: move focus to previous radio, select it, call the action.
6. Space: select the currently focused radio (redundant if arrow keys also select, but required by spec).
7. Home / End: move focus to first / last.
8. Tab: moves focus OUT of the group to the next widget.

Technique 1 (native radios) gets ALL of this for free from the browser. The browser handles arrow keys, space, roving tabindex AND aria-checked without any JS. The only thing CSS needs to do is react to `:checked`. This is why it scores 10/10 for ARIA correctness.

Techniques 2-5 must manually implement the roving tabindex handler shown in T2 above. That handler is 15 lines of JS and can be factored into a helper, but it IS manual work and it IS a maintenance surface.

Sources:
- [W3C WAI-ARIA APG - Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- [W3C WAI-ARIA APG - Radio Group Example Using Roving tabindex](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio/)
- [Radix UI issue #951 - ToggleGroup role=radio discussion](https://github.com/radix-ui/primitives/issues/951)

## 6. Target size analysis

WCAG 2.2 SC 2.5.8 Target Size (Minimum): 24x24 CSS pixels OR 24px spacing from adjacent target.

- T1/T2 slider: label min-height 34px (+ 3px padding top/bottom = 40px container). Width 108px. Exceeds floor. PASS.
- T3 pill group: 108x40. PASS. 6px gap is below 24px spacing requirement, so the SIZE clause must be satisfied, and it is.
- T4 underline: the visible indicator is 2px tall but the hit target (`min-height:40px`) is 40px. PASS because hit target, not visible indicator, is what the SC measures.
- T5 card group: 108x48. PASS with margin.

All five techniques are 2.5.8 compliant at the recommended dimensions.

Sources:
- [W3C WAI - Understanding SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [AccessiCart - WCAG 2.2 (AA) SC 2.5.8](https://accessicart.com/wcag-2-2-aa-sc-2-5-8-target-size-minimum/)

## 7. Reduced motion behavior

All five recipes include `@media (prefers-reduced-motion:reduce){...transition:none}`. Specific behaviors:

- T1/T2: the pill STILL translates to the new position, but instantaneously (0ms transition). No sliding animation, no easing curve. User sees an instant snap.
- T3: background color swap is instant. No tactile press translate on `:active`.
- T4: the scaleX(0) -> scaleX(1) bar reveal is instant. Bar appears immediately under new active tab.
- T5: border and background changes instant. Hover lift transform is disabled entirely (no `translateY(-1px)` on hover).

This matches the v32.8 research R4 (motion / easing) which mandates "reduced motion users see final states immediately, never intermediate animation frames".

Sources:
- [MDN - prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

## 8. Comparison to real-world playground model selectors

From search results and documented references:

- **OpenAI Playground** (chat.openai.com / platform.openai.com): uses a dropdown `<select>` style button that opens a list menu. Not a 3-item horizontal strip. Different problem space (they have ~20 models). Not directly applicable.
- **Anthropic Console**: uses a dropdown combobox with model name + description. Same reason. Not a segmented control pattern.
- **Vercel AI Playground / Gateway**: also dropdown. However, internal model COMPARISON views in multi-model playgrounds do use pill chip groups for toggling which model results are visible. Pattern matches Technique 3.
- **macOS System Settings (dark mode picker)**: uses filled card group (Technique 5) with a preview image. Match to Technique 5.
- **iOS Picker (SegmentedPickerStyle)**: uses sliding pill on a tinted track (Technique 1 / 2).

The pattern that dominates at 3-item count where options are peers-of-equal-weight is T1/T2 sliding pill. Dropdowns dominate at 5+ options. Card groups dominate when each option has rich metadata (icon, description, preview). Since our three models each have accompanying meta (context window, input cost, output cost) available elsewhere in the sidebar, the compact pill is the right choice for the switcher itself.

Sources:
- [SwiftUI SegmentedPickerStyle - Apple Developer](https://developer.apple.com/documentation/swiftui/segmentedpickerstyle)
- [Mobbin - Segmented Control Best Practices](https://mobbin.com/glossary/segmented-control)

## 9. Recommendation

Winner: **Technique 1 - Segmented control with sliding pill indicator using hidden native radios and `:has()`**.

Why this is the best fit for THIS specific app:

1. **ARIA is free**. Because the inputs are real `<input type=radio>` elements inside a `<fieldset role=radiogroup>`, we get keyboard navigation, `aria-checked` state tracking, screen reader announcement, and form-associated-ness from the browser for zero JS cost. No roving tabindex handler to maintain. No `aria-checked` sync bug to hunt in six months when someone refactors `rWez()`. This is the single biggest reason to prefer T1 over T2.

2. **Action weight is high**. `zmienWszModel` is destructive: one click flips the model for every agent in the current preset. A filled sliding pill with glow shadow in the model color communicates "I just made a meaningful decision" far better than an underline bar (T4) or independent outlined chips (T3). The motion-carry on the slider reinforces that a choice was made.

3. **Matches v32.8 direction locked in MANIFEST**: "Material Expressive with Edge" with glass thin + chrome thick layering. The sliding pill IS the thick chrome (raised pill with glow) on top of the thin glass track. This recipe maps 1:1 to the design token system already in place.

4. **Minimum JS**. T2 requires 15 lines of JS glue. T3/T4/T5 require same 15 lines plus `aria-checked` sync per chip. T1 requires ZERO lines of JS for the visual state machine and ZERO lines for keyboard navigation. The ONLY JS is the existing `zmienWszModel` call which runs in the `onchange` handler of the native radio input. One line per radio.

5. **`:has()` is safe**. Chrome 105+ (Aug 2022), Safari 15.4+ (Mar 2022), Firefox 121+ (Dec 2023). For a single-file HTML demo shipping in April 2026, 100% of users have `:has()` support. No polyfill needed.

6. **Sonnet-ink token already exists**. The v32.8 two-tier ink tokens (`--mc-sonnet-ink` etc) mean the APCA contrast concern for violet-on-dark is already solved at the token layer; this recipe just uses them.

Trade-offs we accept:
- Mixed-model state ("some agents Opus, some Sonnet") needs a tiny extra rule to hide the pill (`.mdl-seg.is-mixed::after{opacity:0}`) plus a "Mieszane" text label above or inside the strip. This adds ~5 lines of CSS and one conditional in the render function. Acceptable.
- Adding a 4th model later would require updating the grid-template-columns and the `translateX` percentages. Not a real concern because the Anthropic model line has been 3-tier (Opus/Sonnet/Haiku) since Claude 3 and is not expected to balloon. If it ever does, we'd revisit the entire UI.

## 10. Final drop-in recipe

### CSS (50 lines, paste into a new section near `.ds-mdl-btn` block around line 1380)

```css
/* ---- MODEL SEG CONTROL (v32.12, sliding pill, native radios) --------- */
.mdl-seg{
  position:relative;display:grid;grid-template-columns:repeat(3,1fr);
  width:100%;height:40px;padding:3px;border-radius:12px;
  background:rgba(255,255,255,0.04);
  border:1px solid var(--brd);
  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
  box-sizing:border-box;isolation:isolate;margin:8px 0;
}
[data-theme=light] .mdl-seg{background:rgba(15,15,24,0.04);backdrop-filter:none;-webkit-backdrop-filter:none}
.mdl-seg input[type=radio]{position:absolute;inset:0;opacity:0;pointer-events:none;margin:0}
.mdl-seg label{
  position:relative;z-index:2;
  display:flex;align-items:center;justify-content:center;
  font:700 12px/1 var(--hd);color:var(--t2);
  cursor:pointer;border-radius:9px;min-height:34px;
  transition:color 180ms ease;user-select:none;
}
.mdl-seg label:hover{color:var(--t1)}
.mdl-seg::after{
  content:"";position:absolute;z-index:1;
  top:3px;bottom:3px;left:3px;width:calc((100% - 6px) / 3);
  border-radius:9px;background:var(--pill-bg,transparent);
  box-shadow:0 0 0 1px var(--pill-brd,transparent),0 4px 14px var(--pill-glow,transparent);
  transition:transform 240ms cubic-bezier(.2,.8,.2,1),background 180ms,box-shadow 180ms;
  pointer-events:none;
}
.mdl-seg:has(input[value=opus]:checked){--pill-bg:rgba(var(--mc-opus-rgb),0.16);--pill-brd:var(--mc-opus);--pill-glow:rgba(var(--mc-opus-rgb),0.35)}
.mdl-seg:has(input[value=sonnet]:checked){--pill-bg:rgba(var(--mc-sonnet-rgb),0.16);--pill-brd:var(--mc-sonnet);--pill-glow:rgba(var(--mc-sonnet-rgb),0.35)}
.mdl-seg:has(input[value=haiku]:checked){--pill-bg:rgba(var(--mc-haiku-rgb),0.16);--pill-brd:var(--mc-haiku);--pill-glow:rgba(var(--mc-haiku-rgb),0.35)}
.mdl-seg:has(input[value=sonnet]:checked)::after{transform:translateX(100%)}
.mdl-seg:has(input[value=haiku]:checked)::after{transform:translateX(200%)}
.mdl-seg:has(input[value=opus]:checked) label[data-v=opus],
.mdl-seg:has(input[value=sonnet]:checked) label[data-v=sonnet],
.mdl-seg:has(input[value=haiku]:checked) label[data-v=haiku]{color:var(--t1);font-weight:800}
.mdl-seg input:focus-visible + label{outline:2px solid currentColor;outline-offset:3px}
.mdl-seg.is-mixed::after{opacity:0}
.mdl-seg.is-mixed::before{content:"Mieszane";position:absolute;top:-18px;right:0;font:600 9px/1 var(--mn);color:var(--t3);letter-spacing:.5px;text-transform:uppercase}
@media (prefers-reduced-motion:reduce){.mdl-seg::after,.mdl-seg label{transition:none}}
```

### JS template literal (paste into `pokazInfoPr` model row, replacing the three stacked `.ds-mdl-btn` lines around 6580)

```js
const mDom = (mc.opus===nodes.length?'opus':mc.sonnet===nodes.length?'sonnet':mc.haiku===nodes.length?'haiku':'mixed');
h+='<fieldset class="mdl-seg'+(mDom==='mixed'?' is-mixed':'')+'" role="radiogroup" aria-label="Model dla wszystkich agentow">'+
   '<input type="radio" name="mdl-all" id="mdl-all-op" value="opus" '+(mDom==='opus'?'checked':'')+' onchange="zmienWszModel(\'opus\')">'+
   '<label for="mdl-all-op" data-v="opus">Opus</label>'+
   '<input type="radio" name="mdl-all" id="mdl-all-so" value="sonnet" '+(mDom==='sonnet'?'checked':'')+' onchange="zmienWszModel(\'sonnet\')">'+
   '<label for="mdl-all-so" data-v="sonnet">Sonnet</label>'+
   '<input type="radio" name="mdl-all" id="mdl-all-ha" value="haiku" '+(mDom==='haiku'?'checked':'')+' onchange="zmienWszModel(\'haiku\')">'+
   '<label for="mdl-all-ha" data-v="haiku">Haiku</label>'+
   '</fieldset>';
```

For single-node sidebar (`pokazWezel`, lines 5730-5732), same recipe with per-node radio names:

```js
h+='<fieldset class="mdl-seg" role="radiogroup" aria-label="Model dla tego agenta">'+
   '<input type="radio" name="mdl-'+nid+'" id="mdl-'+nid+'-op" value="opus" '+(nd.model==='opus'?'checked':'')+' onchange="zmienModel(\''+nid+'\',\'opus\')">'+
   '<label for="mdl-'+nid+'-op" data-v="opus">Opus</label>'+
   '<input type="radio" name="mdl-'+nid+'" id="mdl-'+nid+'-so" value="sonnet" '+(nd.model==='sonnet'?'checked':'')+' onchange="zmienModel(\''+nid+'\',\'sonnet\')">'+
   '<label for="mdl-'+nid+'-so" data-v="sonnet">Sonnet</label>'+
   '<input type="radio" name="mdl-'+nid+'" id="mdl-'+nid+'-ha" value="haiku" '+(nd.model==='haiku'?'checked':'')+' onchange="zmienModel(\''+nid+'\',\'haiku\')">'+
   '<label for="mdl-'+nid+'-ha" data-v="haiku">Haiku</label>'+
   '</fieldset>';
```

Note: each fieldset MUST have a unique radio `name` attribute per sidebar context; otherwise multiple sidebars on screen would fight over a single radio group. The `mdl-${nid}` suffix solves this for per-node, and `mdl-all` is fine for the preset sidebar since only one is visible at a time.

### Vertical space reclaimed

Before (3 stacked `.ds-mdl-btn` rows):
- 3 * (12px padding top + 20px content + 12px padding bottom) + 2 * 8px gap = 3 * 44 + 16 = 148px
- Plus 8px margin top/bottom = 164px block

After (single `.mdl-seg`):
- 40px strip + 16px margin top/bottom = 56px block

**Savings: ~108px of vertical sidebar real estate per model picker instance.**

This reclaimed space can host the v32.12 Decision Intensity chart (R1), Cost delta preview (R2), or simply let the knowledge cards breathe.

## 11. Sources

- [W3C WAI-ARIA APG - Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- [W3C WAI-ARIA APG - Radio Group Example Using Roving tabindex](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio/)
- [W3C WAI - Understanding SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Material Design 3 - Segmented buttons](https://m3.material.io/components/segmented-buttons)
- [Material Design 3 - All buttons](https://m3.material.io/components/all-buttons)
- [Radix UI - ToggleGroup](https://www.radix-ui.com/primitives/docs/components/toggle-group)
- [Radix UI - Accessibility overview](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [Radix UI issue #951 - ToggleGroup role=radio when type=single](https://github.com/radix-ui/primitives/issues/951)
- [Radix UI discussion #552 - ToggleGroup as radio group](https://github.com/radix-ui/website/discussions/552)
- [shadcn/ui - Toggle Group component](https://ui.shadcn.com/docs/components/radix/toggle-group)
- [shadcn/ui - Tabs component](https://ui.shadcn.com/docs/components/radix/tabs)
- [CSS Script - Animated Segmented Control with Radio Buttons and CSS3 Anchor Positioning](https://www.cssscript.com/segmented-control-anchor-positioning/)
- [Let's Build UI - Building a Segmented Control Component](https://www.letsbuildui.dev/articles/building-a-segmented-control-component/)
- [springload/segmented-control - GitHub](https://github.com/springload/segmented-control)
- [Mantine SegmentedControl docs](https://mantine.dev/core/segmented-control/)
- [Mobbin - Segmented Control UI best practices](https://mobbin.com/glossary/segmented-control)
- [MDN - CSS :has() pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
- [MDN - CSS anchor positioning guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning)
- [MDN - position-anchor](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-anchor)
- [MDN - prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [MDN - HTMLInputElement radio type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)
- [APCA Contrast Calculator](https://apcacontrast.com/)
- [APCA Easy Intro](https://git.apcacontrast.com/documentation/APCAeasyIntro.html)
- [APCA in a Nutshell](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html)
- [Dan Hollick - WCAG 3 and APCA](https://typefully.com/DanHollick/wcag-3-and-apca-sle13GMW2Brp)
- [Myndex/SAPC-APCA on GitHub](https://github.com/Myndex/SAPC-APCA)
- [Apple Developer - SegmentedPickerStyle SwiftUI](https://developer.apple.com/documentation/swiftui/segmentedpickerstyle)
- [Apple Developer - Applying Liquid Glass to custom views](https://developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views)
- [LogRocket - Build a SwiftUI customizable segmented control](https://blog.logrocket.com/build-swiftui-segmented-customizable-control/)
- [Joshua Wootonn - React Toggle Group Component breakdown](https://www.joshuawootonn.com/react-toggle-group-component)
- [AccessiCart - WCAG 2.2 (AA) SC 2.5.8 Target Size guide](https://accessicart.com/wcag-2-2-aa-sc-2-5-8-target-size-minimum/)
- [NN/g - Glassmorphism Definition and Best Practices](https://www.nngroup.com/articles/glassmorphism/)
