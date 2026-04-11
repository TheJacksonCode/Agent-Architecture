# v32.8 LAYOUT_SPEC - Sidebar + Topbar + Modal + Canvas Redesign

Status: POST-DEBATE (Phase D merge complete, ready for Phase E HITL Gate 1)
Owner: Layout writer (Phase C3) + Syntetyk (Phase D merge)
Consumers: Phase E HITL Gate 1, Phase F Build implementers (F1-F6).
Inputs: MANIFEST.md (primary, 28 DDs post-merge), CRITIC.md (trust shortlist), R5_premium_tools.md (pixel measurements), FM1-FM5 Five Minds position papers (10 resolutions R-01 through R-10 applied in-line).
Rule: mockups + pixel values below are the BUILD blueprint. F2/F3/F4 must not improvise geometry that contradicts this file.
Constraint reminder: starfield preserved everywhere, no em-dashes or en-dashes, all v32.7 features retained, .pa-* / .ds-* / .nd / .topbar / .mo-* class names preserved.

---

## 1. Global layout (topbar + 3-column grid)

v32.8 keeps the v32.7 `body > header.topbar + main.workspace + footer.statbar` skeleton. No structural rework. The visual changes are chrome-only.

### 1.1 Viewport at 1440 x 900

```
+--------------------------------------------------------------------------------+  y=0
|                              topbar (.topbar)  height 56                       |  L1 glass, z=40
+-------+-----------------------------------------------------+------------------+  y=56
|       |                                                     |                  |
|       |                                                     |                  |
| left  |                                                     |     right        |
| palet |                                                     |     detail       |
| te    |                  canvas area (.cv-area)             |     sidebar      |
| (.sid |                  [STARFIELD + SVG]                  |     (.side-r)    |
|  e-l) |                  L0 no background                   |     L1 glass     |
|  260  |                  1060 wide at 1440vw                |     320          |
|  L1   |                                                     |     fixed        |
|  glas |                                                     |                  |
|  s    |                                                     |                  |
|       |                                                     |                  |
+-------+-----------------------------------------------------+------------------+  y=876
|                         statbar (.statbar)  height 24                          |  L1 glass
+--------------------------------------------------------------------------------+  y=900
  x=0   x=260                                                 x=1120             x=1440
```

### 1.2 Viewport at 1920 x 1080

Same layout, canvas grows to 1540 wide. Sidebars stay locked at 260 and 320. Topbar still 56. Statbar still 24.

### 1.3 Exact measurements (from MANIFEST DD18)

| Region             | W x H                  | Surface   | Border                    | Shadow    |
|--------------------|------------------------|-----------|---------------------------|-----------|
| topbar             | 100vw x 56             | Thin L1   | border-bottom `--border`  | `--elev-1`|
| left palette       | 260 x (100vh - 56 - 24)| Thin L1   | border-right `--border-faint`| `--elev-1`|
| left palette rail  | 56 x (same)            | Thin L1   | same                      | `--elev-1`|
| canvas             | (100vw - 260 - 320) x (100vh - 56 - 24) | L0 starfield | none | none |
| right detail       | 320 x (100vh - 56 - 24)| Thin L1   | border-left `--border-faint` | `--elev-1`|
| statbar            | 100vw x 24             | Thin L1   | border-top `--border-faint`  | none      |

### 1.4 Z-index stack

```
z=0      body + .cv-area (L0)
z=5      canvas#starfield
z=10     .cv-transform + svg#svg (connections + node orbs .nd)
z=20     .cv-info + .zm-ctrl + .minimap + .dialog-timeline
z=30     .side-l (.pa) + .side-r (.ds) (L1 glass chrome)
z=40     header.topbar + footer.statbar (L1 glass chrome)
z=50     .suggest-bar + .toast (transient L1 floaters)
z=80     .cv-ctrl context bar (hovers over canvas, L2)
z=100    .mo modals (moCost, moKrt, moLearn, moMer) (L2 thick chrome)
z=120    .hitl-overlay (L2 thick chrome, debate arena host)
z=140    focus trap sentinels
```

L0/L1/L2 from MANIFEST DD7. Three elevation layers only. Nothing stacks beyond L2 except focus-trap sentinels.

---

## 2. Topbar HUD (header.topbar)

### 2.1 Anatomy at 1440 wide

```
+--------------------------------------------------------------------------------+ y=0
|                                                                                |
|  [*] Agent Designer  v32.8  |  [Szukaj...........]  |  [COST][TOK][MIX][CTX]   | h=56
|  ^brand 212w              sep^  ^problem/search 320w ^HUD cluster 4x 92 = 368 + gaps 3x8 = 392
|                                                                                |  [>][FP][Exp][Mer][Imp] [?][Th][Lang]
|                                                                                |  ^action cluster auto-fit right
+--------------------------------------------------------------------------------+ y=56
```

Revised geometry (reading left -> right, fixed widths so numerics align):

```
0       16      228 244                 564 580               972 988                 1440
|-16 gap|BRAND   |sep|PROBLEM textarea   |sep|     HUD cluster  |sep|     ACTIONS        |
| 16px  |212px   |16 |320px              |16 |392px              |16 |flex-right         |
```

### 2.2 Per-cell spec

#### Brand cell `.tb-brand`

- Dimensions 212 x 40 (centered vertically in 56)
- Content: 22 x 22 logo glyph (* unicode) + wordmark "Agent Designer" (--fs-14 --fw-semibold --t1 tracking -0.01em) + "v32.8" meta (--fs-11 --fw-medium --t3 ml-6)
- Background none (topbar glass shows through)
- Click opens MANIFEST.md viewer modal (future, already stubbed)

#### Separator `.tb-sep`

- 1 x 24 vertical bar
- `background var(--border)`
- 16 px horizontal gap both sides

#### Problem/search cell `.tb-problem`

- 320 x 40
- Contains `<textarea id="probIn">` (auto-grow 1-line, max 1 line in topbar - multi-line modal on expand)
- Padding 10 x 12 inside
- `--r-2 6px` radius
- Background `rgba(26,31,43,0.35)` (`--s-3` at 35 percent alpha)
- Border 1 px `--border-faint`
- Placeholder "Opisz projekt lub problem... (Describe project or problem...)" --fs-13 --t3
- Focus state: border swaps to `--border-focus` + 2 px outer offset ring rgba(167,139,250,0.35)
- Text color --t1 on type

#### HUD cluster `.tb-hud` (NEW wrapper for 4 cells)

- 392 x 40, flex row, 8 px gap
- 4 cells, each 92 x 32 (centered vertically in 40)
- **HUD cells are interactive, must meet 24x24 target size (DD28, R-08)**: 32
  tall satisfies floor. COST cell is a `<button>` with aria-label and opens the
  Cost Command Center modal on click.
- **DD24 / R-06 View Transitions shared name**: the COST cell carries
  `view-transition-name: vt-cost-hud` (declared in DESIGN_SPEC Section 4.3). The
  Cost modal header `#moCost .cbm-hdr` carries the same name. When the user
  clicks the COST cell, JS calls `document.startViewTransition(() => openCostModal())`
  and the browser morphs the cell into the modal header automatically. Fallback:
  if `document.startViewTransition` is not a function, the JS calls
  `openCostModal()` directly and the existing CSS `mo-pop` keyframe runs.

Per cell geometry:

```
+----------------------+
| COST        92x32    |  <-- .hud-cell
|  +----+   +-------+  |
|  |icon|   |label  |  |
|  | 14 |   |p50 p90|  |
|  +----+   +-------+  |
+----------------------+
```

Internal layout: 10 px icon column + 8 px gap + label/value column, 4 px vertical padding, 8 px horizontal padding.

| Cell | Icon | Label      | Value format                     | Font                       |
|------|------|------------|----------------------------------|----------------------------|
| COST | $    | KOSZT      | `$0.42 - $0.78`                  | `.hud-num` Geist Mono 13px |
| TOK  | #    | TOKENY     | `124k in / 48k out` (bar below)  | Geist Mono 12 px           |
| MIX  | o    | MIX MODELI | three colored dots (o/s/h)       | -                          |
| CTX  | []   | CTX MAX    | `62% ph-warning` (bar below 3 px)| Geist Mono 13px            |

Numerics use `font-variant-numeric: tabular-nums slashed-zero lining-nums` (MANIFEST DD13).

Cell chrome:

- Background `rgba(26,31,43,0.35)`
- Border 1 px `--border-faint`
- Radius `--r-2 6px`
- Hover: `translateY(-2px)` + background `rgba(36,43,58,0.55)` + border `--border`
- Severity states: `.sev-safe` border `--state-success`, `.sev-warn` border `--state-warning`, `.sev-high` border `--state-info`, `.sev-danger` border `--state-danger`
- Severity flash on change: border-color transition `--dur-base --ease-spring-snappy`

#### Actions cluster `.tb-actions`

Right-aligned flex row, 8 px gap. Icon-only buttons 32 x 32 `--r-2` with tooltips. Order left -> right:

```
[>Symulacja] [FP] [Export] [Mermaid] [Import] | [?] [Theme] [Lang]
```

- `.btn-sim` (RUN SIM) - 32 x 32, icon only on topbar (triangle play icon), label "Symulacja/Run" only in tooltip. Active state: background `--state-info` at 20 percent, pulsing LIVE dot.
- `.btn-p` (FINAL PROMPT) - 32 x 32, icon "zap"
- `.btn-a` (EXPORT) - 32 x 32, icon "arrow-up-right"
- Mermaid export btn - 32 x 32, icon "diamond"
- Import - 32 x 32, icon "arrow-down-left"
- 8 px gap divider (small 1 x 16 bar color `--border-faint`)
- Help `?` - 32 x 32
- Theme toggle (moon/sun) - 32 x 32
- Lang toggle (EN/PL) - 32 x 32, text "EN" or "PL" in Geist Mono 11px bold

All 32 x 32 buttons: `--s-3` background, 1 px `--border-faint`, hover background `--s-4` and border `--border` + `translateY(-2px)`.

### 2.3 HTML skeleton (compatible with v32.7 classes)

```html
<header class="topbar glass">
  <div class="tb-brand">
    <svg class="tb-logo" width="22" height="22" aria-hidden="true">...</svg>
    <h1>Agent Designer</h1>
    <small class="tb-version">v32.8</small>
  </div>
  <div class="tb-sep" role="separator"></div>
  <div class="tb-problem">
    <textarea id="probIn" rows="1" placeholder="Opisz projekt lub problem..." aria-label="Opis projektu"></textarea>
  </div>
  <div class="tb-sep" role="separator"></div>
  <div class="tb-hud" role="group" aria-label="Metryki zespolu">
    <button class="hud-cell sev-safe" id="hudCost" onclick="pokazCostBreakdown()" aria-label="Otworz szczegoly kosztow">
      <span class="hud-ico">$</span>
      <span class="hud-col">
        <span class="hud-label">KOSZT</span>
        <span class="hud-num" id="hudCostVal">$0.00 - $0.00</span>
      </span>
    </button>
    <div class="hud-cell sev-safe" id="hudTok">
      <span class="hud-ico">#</span>
      <span class="hud-col">
        <span class="hud-label">TOKENY</span>
        <span class="hud-num" id="hudTokVal">0k / 0k</span>
        <span class="hud-bar"><i style="width:0"></i></span>
      </span>
    </div>
    <div class="hud-cell" id="hudMix">
      <span class="hud-ico">o</span>
      <span class="hud-col">
        <span class="hud-label">MIX</span>
        <span class="hud-dots"><i class="d-op"></i><i class="d-so"></i><i class="d-ha"></i></span>
      </span>
    </div>
    <div class="hud-cell sev-safe" id="hudCtx">
      <span class="hud-ico">[]</span>
      <span class="hud-col">
        <span class="hud-label">CTX MAX</span>
        <span class="hud-num" id="hudCtxVal">0%</span>
        <span class="hud-bar"><i style="width:0"></i></span>
      </span>
    </div>
  </div>
  <div class="tb-sep" role="separator"></div>
  <div class="tb-actions">
    <button class="btn btn-sim" id="simBtn" onclick="symPrzelacz()" aria-label="Symulacja" title="Symulacja / Run simulation (M)">&#9654;</button>
    <button class="btn btn-p" onclick="generujPrompt()" aria-label="Final prompt" title="Final Prompt">&#9889;</button>
    <button class="btn btn-a" onclick="eksportujKfg()" aria-label="Eksport" title="Export JSON">&#8599;</button>
    <button class="btn" onclick="pokazMermaid()" aria-label="Mermaid" title="Eksport Mermaid">&#9670;</button>
    <button class="btn" onclick="importujKfg()" aria-label="Import" title="Import JSON">&#8601;</button>
    <div class="tb-divider" aria-hidden="true"></div>
    <button class="btn" onclick="pokazSkroty()" aria-label="Skroty" title="Skroty klawiszowe">?</button>
    <button class="theme-toggle" id="themeToggle" onclick="przelMotyw()" aria-label="Motyw" title="Przelacz motyw">&#9790;</button>
    <button class="btn lang-toggle" id="langBtn" onclick="switchLang()" aria-label="Language" title="Switch language">EN</button>
  </div>
</header>
```

### 2.4 Behaviors

- **Click COST cell** opens Cost Command Center modal (v32.4 preserved). Keyboard K shortcut unchanged.
- **Click TOK/MIX/CTX cells** opens Cost Modal on the matching tab (Breakdown / Overview / Context).
- **Click SIM btn** toggles simulation. Active state = button background `--state-info` at 20 percent + pulsing LIVE dot beside label. Keyboard M unchanged.
- **Hover any HUD cell** lifts `translateY(-2px)` + tooltip appears 8 px above cell, --fs-11 --t2, 150 ms fade.
- **Theme toggle** swaps `data-theme` attribute on `<html>`, animation: icon rotates 180 deg in `--dur-base --ease-emphasized`, whole body fades across 180 ms (transition background only).
- **Severity flash**: when COST/TOK/CTX crosses threshold, the cell border animates `--dur-base --ease-spring-snappy` to new severity color. Value number blink once (opacity 0.4 -> 1 in 220 ms).
- **prefers-reduced-motion**: lift and flash downgrade to opacity fades only. LIVE pulse preserved (state signal per MANIFEST DD21).

---

## 3. Left palette sidebar (aside.side-l, class .pa root)

> **Phase D resolution R-05 / DD27**: the rail-collapsed 56 px mode documented
> in Section 3.7 is DEFERRED TO v32.9. For v32.8 ship scope the left palette is
> always 260 px expanded. The rail mockup stays below as reference for future
> continuity. F2 Build does NOT need to implement the Cmd+B toggle, width
> transition, or icon-only layout in v32.8. The class `.pa-box[data-rail="true"]`
> selector stays unreachable (no code path sets it) but the CSS can ship for
> v32.9 without harm.

### 3.1 Anatomy (expanded 260 px)

```
+--------------------------+  y=56 (under topbar)
|  SEARCH bar (40 tall)    |  --r-2  6 px, inset 12 px
|                          |
+--------------------------+  y=104
|  TABS Agenci Presety Zap |  .sl-tabs 36 tall, pill style
+--------------------------+  y=140
|                          |
|  [CAT] MICRO (2-3)       |  sticky header 28 tall
|  +--------------------+  |
|  | orb name   [OP]    |  |  row 32 tall
|  | orb name   [SO]    |  |
|  +--------------------+  |
|                          |
|  [CAT] MALE (4-5)        |
|  ...                     |
|                          |
|  scroll region           |
|                          |
+--------------------------+  bottom
|  FOOTER [+ Custom Agent] |  48 tall, fixed, not scroll
|        [Import MD]       |
+--------------------------+  y = 100vh - 24 (above statbar)
```

### 3.2 Row density spec

#### Agent row (`.pa-item`, dense 32 px)

```
+--------------------------------------------------+
|  [ ] [name ........................] [OP]       |  32 tall
|  30  name --fs-13 --fw-medium --t1   26 w badge  |
|  orb + 1-line desc --fs-11 --t2 ellipsis
+--------------------------------------------------+
```

- Height 32 (MANIFEST 4.1 dense). Padding 6 vertical / 10 horizontal.
- Orb `.pa-orb` 30 x 30, `--r-2 6px` background rgba(var(--ph-X-rgb),0.10), 1 px `--border`, SVG icon 18 px centered in `--c-X` phase-relative color.
- Name `.pa-name` --fs-13 --fw-medium --t1 tracking `+0.005em`.
- Desc `.pa-desc` --fs-11 --fw-regular --t2, 1 line ellipsis, starts below name. When height is 32, description is hidden (use tooltip on hover). When height is 36 comfy, description shows.
- Model mini badge `.pa-badge` 26 x 16 auto-sized pill, --r-1 4px, --fs-10 Geist Mono (ONE exception to "no 10"), bg `rgba(var(--mc-X-rgb),0.12)`, border 1 px `rgba(var(--mc-X-rgb),0.30)`, text color `--mc-X`. Labels OP/SO/HA.
- Row `--r-3 8px`.
- Hover `background rgba(255,255,255,0.04)` (MANIFEST: `--s-4` equivalent state-hover token).
- Selected: 2 px left bar in phase color (absolute positioned, left 0, top 4, bottom 4, width 2 px) + `background rgba(var(--ph-X-rgb),0.12)` (Stripe env-strip pattern, MANIFEST 4.1).

#### Preset row (`.pr-item`, comfy 40 px)

```
+--------------------------------------------------+
|  [ ] name.................... [NEW]   12        |  40 tall
|  30  descrip --fs-11 --t2                 count  |
|  orb     --fs-13 --fw-medium                     |
+--------------------------------------------------+
```

- Height 40 (MANIFEST 4.1 comfy). Padding 8 vertical / 10 horizontal.
- Orb 30 x 30 identical to agent orb.
- Name line: preset name --fs-13 --fw-medium --t1 + optional NEW badge (small outlined haiku-green chip 28 x 14, --fs-10 --fw-bold uppercase, 4 px padding, retained from v32.7 DD19).
- Desc line: preset short desc --fs-11 --t2, 1 line ellipsis.
- Right side: agent count chip `.pr-cnt`, 24 x 18, `--r-2 6px`, `--s-3` bg, --fs-11 Geist Mono tabular-nums, `--t2`.
- Selected state same as agent row (left bar in preset phase color + tint background).
- Featured preset (`.pr-item.featured`) adds a 1 px subtle gradient border (var(--mc-opus) -> var(--mc-sonnet) stroke in ::before pseudo) retained for Deep Five Minds.

#### Category header (`.pa-cat` / `.pr-cat`, 28 px sticky)

```
+--------------------------------------------------+
|  MICRO (2-3)                                  5  |  28 tall
|  11 px ALL CAPS --fw-semibold tracking 0.04em     count chip 18
+--------------------------------------------------+
```

- Height 28 (MANIFEST 4.1: 24 min, bumped to 28 for tabular-nums count chip).
- `position: sticky; top: 0;` within scroll container. `background: rgba(18,20,28,0.85); backdrop-filter: blur(8px);` (small blur to preserve legibility when sticky stops over a row, perf-safe since sticky elements are small).
- NOTE: MANIFEST rule "no backdrop-filter on scrolling containers" applies to the OUTER .side-l glass (it is non-scrolling outer chrome, inner .pa-scroll scrolls). Sticky headers are individual elements inside scroll but their blur is localized 8 px max, not the full container.
- Border-bottom 1 px `--border-faint`.
- Label --fs-11 --fw-semibold uppercase tracking `+0.04em` color `--t3`.
- Count chip right-aligned, 18 x 14, `--fs-10` Geist Mono, `--t3`.

### 3.3 Search input spec (`.pa-search`)

```
+----------------------------------------+
| [Q] Szukaj agenta...                   |  40 tall
+----------------------------------------+
```

- 40 tall, full width within palette (260 - 24 inset = 236 wide).
- Margin 16 top / 12 horizontal / 12 bottom from palette top.
- Background `rgba(26,31,43,0.50)` (`--s-3` 50 percent alpha).
- Border 1 px `--border`.
- Radius `--r-2 6px`.
- Icon "Q" (magnifier SVG 14 px) left 12, centered.
- Input padding-left 36, padding-right 36, --fs-13 --t1.
- Placeholder color `--t3`.
- Focus: border `--border-focus` violet, outer ring 2 px rgba(167,139,250,0.35), `--dur-fast`.
- Right side: clear button `X` (shown when query not empty), **24 x 24 minimum per WCAG 2.2 SC 2.5.8 (DD28, R-08)**, icon glyph 14 x 14 centered inside the 24 x 24 tap target, `--t3` hover `--t1`. Class `.pa-search-clear` carries the interactive floor from DESIGN_SPEC Section 3 `:where(...)` safety net.
- Keyboard shortcut hint: `Cmd K` in small pill right of input text, --fs-10 --t3, `--s-3` bg. The pill is NOT interactive (text-only indicator), so it can stay below 24 px.

### 3.4 Scroll behavior

- `.pa-scroll` wraps tabs panels (`.sl-panels`). `overflow-y: auto; overscroll-behavior: contain;`
- Scrollbar thin 6 px, thumb `rgba(255,255,255,0.10)`, hover thumb `rgba(255,255,255,0.18)`, track transparent.
- Outer `.side-l` has thin glass L1. The SCROLLING child `.pa-scroll` does NOT carry backdrop-filter (MANIFEST R4 perf rule).
- Category headers `position: sticky; top: 0` within `.pa-scroll`.
- Smooth scroll on keyboard nav (PageUp/PageDown/Home/End).

### 3.5 HTML skeleton

```html
<aside class="side-l glass" id="sL" aria-label="Panel agentow i presetow">
  <div class="pa-search-wrap">
    <svg class="pa-search-icon" width="14" height="14" aria-hidden="true">...</svg>
    <input class="pa-search" id="paS" placeholder="Szukaj agenta..." oninput="filtrujPalete()" aria-label="Szukaj agenta">
    <kbd class="pa-search-hint">Ctrl K</kbd>
  </div>
  <div class="sl-tabs" role="tablist">
    <button class="sl-tab on" role="tab" aria-selected="true" onclick="zmienTab('ag',this)">Agenci</button>
    <button class="sl-tab" role="tab" aria-selected="false" onclick="zmienTab('pr',this)">Presety</button>
    <button class="sl-tab" role="tab" aria-selected="false" onclick="zmienTab('sv',this)">Zapisane</button>
  </div>
  <div class="sl-panels pa-scroll">
    <div class="sl-pan on" id="panAg">
      <div class="pa-cat ph-strategy">STRATEGIA <span class="pa-cat-cnt">2</span></div>
      <div class="pa-item ph-strategy" data-id="orchestrator" tabindex="0" role="option">
        <div class="pa-orb">{{ svg }}</div>
        <div class="pa-txt">
          <div class="pa-name">Orchestrator</div>
          <div class="pa-desc">Koordynuje caly workflow...</div>
        </div>
        <span class="pa-badge b-op">OP</span>
      </div>
      <!-- more rows -->
    </div>
    <div class="sl-pan" id="panPr">
      <div class="pr-cat">MICRO (2-3) <span class="pr-cat-cnt">5</span></div>
      <div class="pr-item featured" data-id="deep_five_minds" tabindex="0" role="option">
        <div class="pr-orb">{{ svg }}</div>
        <div class="pr-txt">
          <div class="pr-name">Deep Five Minds <span class="pa-tier-badge">NEW</span></div>
          <div class="pr-desc">6 researcherow + 2x debata...</div>
        </div>
        <span class="pr-cnt">27</span>
      </div>
    </div>
    <div class="sl-pan" id="panSv"><!-- saves list --></div>
  </div>
  <footer class="pa-footer">
    <button class="btn btn-p" onclick="otworzKreator()">+ Dodaj wlasnego agenta (Add custom)</button>
    <button class="btn" onclick="importujAgentaMD()">Import .md</button>
  </footer>
</aside>
```

Class names preserved: `.pa-cat`, `.pa-item`, `.pa-orb`, `.pa-txt`, `.pa-name`, `.pa-desc`, `.pa-badge`, `.pa-tier-badge`, `.pr-cat`, `.pr-item`, `.pr-orb`, `.pr-name`, `.pr-desc`, `.pr-cnt`, `.sl-tabs`, `.sl-tab`, `.sl-pan`. NEW wrappers: `.pa-search-wrap`, `.pa-search-clear`, `.pa-footer`, `.pa-scroll`, `.pa-cat-cnt`, `.pr-cat-cnt`.

**Roving tabindex (DD28, R-10)**: the skeleton above shows `tabindex="0"` on every `.pa-item` and `.pr-item`, but in the actual Build implementation ONLY ONE row at a time carries `tabindex="0"` (the active row). All others carry `tabindex="-1"`. A keyboard handler on the `.pa-scroll` container listens for ArrowUp/ArrowDown/Home/End/PageUp/PageDown and moves focus between rows by toggling tabindex and calling `.focus()`. This gives keyboard users exactly one tab stop on the palette instead of ~150. Arrow key behavior: Down moves to next row, Up to previous, Home to first row of the active tab panel, End to last, PageUp/PageDown jump by 8 rows. Enter/Space activates (same as click). When the user Tabs out and back in, the last-active row regains focus (stored in a local variable per tab panel). This pattern is WAI-ARIA listbox keyboard navigation, see https://www.w3.org/WAI/ARIA/apg/patterns/listbox/. F2 Build owns the JS wiring. F6 Integrator validates in a11y audit.

### 3.6 Empty state + loading state

Empty state (no matches in filter):

```
+--------------------------+
|           [ ? ]          |  48 px icon --t3
|                          |
|      Brak wynikow        |  --fs-14 --t2
|  Sprobuj innej frazy     |  --fs-12 --t3
|                          |
|    [ Wyczysc filtr ]     |  --fs-12 btn ghost
+--------------------------+
```

Centered, 140 px tall, --s-2 card.

Loading state: 3 skeleton rows. Each row 32 tall, `.pa-item.skeleton`:

- Orb placeholder: 30 x 30 radius 6, background gradient shimmer `linear-gradient(90deg, --s-3 0%, --s-4 50%, --s-3 100%)` animated 1.2 s linear loop.
- Name placeholder: 120 x 10 radius 4, same gradient shimmer.
- Desc placeholder: 180 x 8 radius 4, same gradient shimmer, 60 percent opacity.

`prefers-reduced-motion` -> shimmer replaced with static `--s-3`, pulse via opacity 0.6 -> 1.0 cycle.

### 3.7 Rail collapsed mode (56 px) - DEFERRED TO v32.9

> **DD27 / R-05**: not in v32.8 Build scope. Mockup preserved below as reference.
> Cmd+B toggle, width transition, and icon-only layout shipped in v32.9.

Cmd/Ctrl + B toggles to rail mode. Persisted in `localStorage.paRailMode`.

```
+-----+  y=56
|     |
| [Q] |  search becomes icon-only 32x32 button, click opens command palette overlay
|     |
| [A] |  tab: Agenci icon only
| [P] |  tab: Presety icon only
| [S] |  tab: Zapisane icon only
|     |
| orb |  agent rows collapse to 32x32 orbs only, hover tooltip shows name
| orb |
| orb |
|     |
| [+] |  footer "Dodaj custom" icon only
+-----+
```

Transition: width `260 -> 56` over `--dur-slow 480ms --ease-emphasized`. Content inside fades out at 0-60 percent, icon-only layout fades in at 40-100 percent.

---

## 4. Right detail sidebar (aside.side-r, class .ds root)

Two render modes: agent detail (via `pokazWezel`/`pokazWezelDef`) and preset detail (via `pokazInfoPr`).

### 4.1 Agent detail anatomy (320 px wide)

```
+----------------------------------------+  y=56 (under topbar)
|  [X]              320 x 96 HERO        |
|                                        |
|   [OORB ]   Orchestrator               |  avatar 56x56 + name + phase pill
|   | 56  |   STRATEGY | Golden Expert   |
|   \____/   [Strategy pill]             |
|                                        |
|  Opis jednej linii --fs-12 --t2        |
+----------------------------------------+  y=152
|  MODEL BUTTONS (sticky)                |
|  +--------+ +--------+ +--------+     |  96x64 each, 3 in row, 8 gap, 16 inset
|  | OPUS   | | SONNET | | HAIKU  |     |
|  | 1M ctx | | 1M ctx | | 200K   |     |
|  | $5/$25 | | $3/$15 | | $1/$5  |     |
|  +--------+ +--------+ +--------+     |
+----------------------------------------+  y=232
|  [SCROLL CONTENT] (.ds-scroll)          |
|                                        |
|  CONTEXT BUDGET                        |
|  +----------------------------------+  |  card --r-5
|  | Wykorzystanie kontekstu    62%   |  |
|  | [====================== 62%====] |  |  bar 6 tall, state color
|  | 13.9k / 22.4k tok                |  |  --fs-11 mono
|  | Bazowy: 22.4k + agent: 4.8k      |  |
|  +----------------------------------+  |
|                                        |
|  KOSZT NA WYWOLANIE                    |
|  +----------------------------------+  |
|  | $0.0042 / wywolanie              |  |
|  +----------------------------------+  |
|                                        |
|  POLACZENIA                            |
|  +----------------------------------+  |
|  | Wejscia: 2 | Wyjscia: 3          |  |
|  | -> Planner                        |  |  mini conn rows
|  | -> Researcher                     |  |
|  | -> Integrator                     |  |
|  +----------------------------------+  |
|                                        |
|  KIM JEST                              |
|  +----------------------------------+  |  knowledge card
|  | "Dyrygent w orkiestrze planowania" |  quoted italic --fs-13 --t2
|  +----------------------------------+  |
|                                        |
|  CO ROBI                               |
|  +----------------------------------+  |
|  | v Rozklada problem na fazy        |  --state-success green check
|  | v Przypisuje odpowiedzialnosci    |
|  | v Pilnuje harmonogramu            |
|  +----------------------------------+  |
|                                        |
|  CZEGO NIE ROBI                        |
|  +----------------------------------+  |
|  | x Nie pisze kodu                  |  --state-danger red x
|  | x Nie robi research               |
|  +----------------------------------+  |
|                                        |
|  ANTI-PATTERNS                         |
|  +----------------------------------+  |
|  | ! Nie micromanage pojedynczych    |  --state-warning amber !
|  | ! Nie pomijaj Syntetyka           |
|  +----------------------------------+  |
|                                        |
|  CIEKAWOSTKI                           |
|  +----------------------------------+  |
|  | o Wzorowany na Gustavo Dudamel    |  --state-info blue lightbulb
|  | o Dziala tez bez synth            |
|  +----------------------------------+  |
|                                        |
|  NARZEDZIA                             |
|  +----------------------------------+  |
|  | [Read] [Write] [Task] [Bash]     |  chips
|  +----------------------------------+  |
|                                        |
|  PROMPT AGENTA                         |
|  +----------------------------------+  |
|  | textarea edit 160 tall             |
|  +----------------------------------+  |
|                                        |
|  [Encyklopedia agenta]                 |  full-width btn --fs-13
+----------------------------------------+
```

### 4.2 Preset detail anatomy

> **DD28 / R-09 above-the-fold rule**: SZCZEGOLOWY OPIS (detailed description)
> is the FIRST content card below the hero row and the sticky "Laduj preset"
> button. FM4 Rzecznik Uzytkownika argued this is the primary value surface for
> the 13 new presets and must be reachable without scrolling. The short "CO TO
> JEST" (What it is) analogy sits BELOW the detailed description, inverting the
> v32.7 order. Rationale: in v32.7 the short description often repeated the
> palette row desc, so users had to scroll past it to find anything new. In
> v32.8 the first thing they see is the rich Pochodzenie/Pomysl/Co dostajesz
> block that justifies the preset.

```
+----------------------------------------+  y=56
|  [X]              320 x 112 HERO       |
|                                        |
|   [PORB ]   Deep Five Minds   [NEW]    |  56x56 orb + title + NEW badge
|   | 56  |   ENTERPRISE | 27 agentow    |  cat pill + count
|   \____/   source: Anthropic docs      |  source attribution --fs-11 --t3
+----------------------------------------+  y=168
|  [SCROLL]                              |
|                                        |
|  SZCZEGOLOWY OPIS  (DETAILED DESCRIPTION)|  <-- FIRST card, above the fold (R-09)
|  +----------------------------------+  |  card, haiku-tinted 4 percent bg
|  | Pochodzenie: Anthropic ...       |  |  --fs-13 --t1 line-height 1.55
|  | Pomysl: podwojny Five Minds ...  |  |  3-4 paragrafy ok. 250 slow
|  | Co dostajesz: 27 agentow ...     |  |
|  | Idealne dla: krytyczne decyzje   |  |
|  | Nie uzywaj: szybkich MVP         |  |
|  +----------------------------------+  |
|                                        |
|  CO TO JEST                            |
|  +----------------------------------+  |
|  | Pipeline lacza Deep Research ...  |  --fs-13 --t2
|  | "Jak panel ekspertow w sadzie"    |  italic analogy --t3
|  +----------------------------------+  |
|                                        |
|  KIEDY UZYWAC (WHEN TO USE)            |
|  +----------------------------------+  |
|  | v Krytyczne decyzje strategiczne  |
|  | v Wysokostawkowe pytania          |
|  | v Kiedy koszt nie gra roli        |
|  +----------------------------------+  |
|                                        |
|  KIEDY NIE UZYWAC (WHEN NOT TO USE)    |
|  +----------------------------------+  |
|  | x Szybki MVP/POC                  |
|  | x Proste zadania 1 agenta         |
|  | x Budzet ponizej $1/run           |
|  +----------------------------------+  |
|                                        |
|  KLUCZOWE CECHY (KEY FEATURES)         |
|  +----------------------------------+  |
|  | * 27 agentow w 6 fazach           |
|  | * Podwojna debata Five Minds      |
|  | * 3 HITL decision gates           |
|  +----------------------------------+  |
|                                        |
|  [ Laduj preset ]                      |  full-width primary btn
|  [ Encyklopedia ]                      |  full-width ghost btn
+----------------------------------------+
```

### 4.3 Model button spec (`.ds-mdl-btn`)

```
+-------------------------+
|  o   Opus 4.6           |  64 tall, 96 wide
|      1M ctx             |  12 px padding
|      $5 / $25           |
+-------------------------+
```

- Dimensions: 96 x 64, 3 in row with 8 px gap inside `.ds-mdl-big` container (96*3 + 8*2 = 304, fits in 320 - 16 inset).
- Radius `--r-4 10px`.
- Background default: `rgba(26,31,43,0.60)`.
- Border 1 px `--border`.
- Inner top highlight `--sh-inset-top`.
- Content rows:
  - Row 1: dot (8 x 8, rounded, `background var(--mc-opus)` with shadow `0 0 8px var(--mc-opus)`) + model name `.mdl-name` --fs-13 --fw-semibold --t1
  - Row 2: `.mdl-meta` ctx value --fs-11 Geist Mono --t2
  - Row 3: `.mdl-meta` price --fs-11 Geist Mono --t3
- Hover: `translateY(-2px)` + border --border-strong.
- Active: `background rgba(var(--mc-X-rgb),0.14)`, border `1.5 px var(--mc-X)`, `box-shadow: 0 0 0 1px var(--mc-X), 0 0 20px -4px rgba(var(--mc-X-rgb),0.45)`.
- `.m-opus` active uses `--mc-opus` gold, `.m-sonnet` uses `--mc-sonnet` violet, `.m-haiku` uses `--mc-haiku` green.

### 4.4 Card spec (`.ds-card`)

```
+----------------------------------+
| ROLA                             |  label 12px sticky
+----------------------------------+
|  Content body --fs-13 --t1 ...   |
|                                  |
+----------------------------------+
```

- Padding 14 px (MANIFEST 4.2: 12).
- Radius `--r-5 14px`.
- Background `--s-3`.
- Border 1 px `--border-faint`.
- Inner heading `.ds-l` / `.ds-section-h`: --fs-11 --fw-semibold uppercase tracking `+0.04em` --t3. Padding 0 0 8 0. Sticky inside scroll container.
- Separator between cards: 12 px margin, no extra divider (border handles the plane).
- Knowledge card variants:
  - `.ds-card-who`: --s-3 bg, italic quote icon top-left, body italic --fs-13 --t2.
  - `.ds-card-do`: green checkmark list, each li 6 px vertical gap, check in `--state-success`.
  - `.ds-card-dont`: red X list, in `--state-danger`.
  - `.ds-card-anti`: amber `!` triangle list, in `--state-warning`.
  - `.ds-card-facts`: blue lightbulb list, in `--state-info`.
  - `.ds-card-longdesc` (SZCZEGOLOWY OPIS): `background: color-mix(in srgb, var(--s-3) 96%, var(--mc-haiku) 4%);` (haiku-tinted 4 percent) + NEW chip beside header.

### 4.5 HTML skeleton

```html
<aside class="side-r glass" id="sR" aria-label="Szczegoly agenta">
  <button class="ds-close" onclick="zamknijSidebar()" aria-label="Zamknij panel szczegolow">x</button>
  <header class="ds-hdr">
    <div class="ds-avatar">
      <div class="ds-avatar-orb ph-strategy">{{ svg 32 }}</div>
      <div class="ds-avatar-info">
        <h4>Orchestrator</h4>
        <div class="ds-role">STRATEGIA <span class="ph-pill ph-strategy">Strategia</span></div>
      </div>
    </div>
    <p class="ds-tagline">Koordynuje caly workflow, rozklada na fazy i przypisuje odpowiedzialnosci.</p>
  </header>
  <div class="ds-mdl-sticky">
    <div class="ds-mdl-big">
      <button class="ds-mdl-btn m-opus active">
        <span class="mdl-dot"></span>
        <span class="mdl-name">Opus 4.6</span>
        <span class="mdl-meta">1M ctx</span>
        <span class="mdl-meta">$5 / $25</span>
      </button>
      <button class="ds-mdl-btn m-sonnet">...</button>
      <button class="ds-mdl-btn m-haiku">...</button>
    </div>
  </div>
  <div class="ds-scroll" id="srS">
    <!-- renders from pokazWezel() existing logic, new card wrappers -->
    <section class="ds-card ds-card-ctx">
      <div class="ds-l">KONTEKST (CTX)</div>
      <div class="ds-ctx-box ctx-warn">
        <div class="ds-ctx-hdr"><span>Wykorzystanie</span><span class="ds-ctx-pct hud-num">62%</span></div>
        <div class="ds-ctx-bar"><span style="width:62%"></span></div>
        <div class="ds-ctx-meta">13.9k / 22.4k tok</div>
        <div class="ds-ctx-meta">Bazowy narzut: 22.4k + agent: 4.8k</div>
      </div>
    </section>
    <section class="ds-card ds-card-cost">
      <div class="ds-l">KOSZT</div>
      <div class="ds-cost-value">~$0.0042 / wywolanie</div>
    </section>
    <section class="ds-card ds-card-conn">...</section>
    <section class="ds-card ds-card-who">
      <div class="ds-l">KIM JEST</div>
      <blockquote class="ds-who-quote">"Dyrygent w orkiestrze planowania"</blockquote>
    </section>
    <section class="ds-card ds-card-do">...</section>
    <section class="ds-card ds-card-dont">...</section>
    <section class="ds-card ds-card-anti">...</section>
    <section class="ds-card ds-card-facts">...</section>
    <section class="ds-card ds-card-tools">
      <div class="ds-l">NARZEDZIA</div>
      <div class="ds-tools-list">
        <span class="ds-tool-chip">Read</span>
        <span class="ds-tool-chip">Write</span>
      </div>
    </section>
    <section class="ds-card ds-card-prompt">
      <div class="ds-l">PROMPT AGENTA</div>
      <textarea class="ds-ta" id="nP" rows="8"></textarea>
    </section>
    <button class="btn btn-learn">Encyklopedia agenta</button>
  </div>
</aside>
```

Class names preserved: `.side-r`, `.ds-card`, `.ds-avatar`, `.ds-avatar-orb`, `.ds-avatar-info`, `.ds-l`, `.ds-mdl-big`, `.ds-mdl-btn`, `.mdl-dot`, `.mdl-name`, `.mdl-meta`, `.ds-tools-list`, `.ds-tool-chip`, `.ds-prompt`, `.ds-ta`, `.ds-ctx-box`, `.ds-ctx-bar`, `.ds-ctx-hdr`, `.ds-ctx-pct`, `.ds-ctx-meta`. NEW: `.ds-close`, `.ds-hdr`, `.ds-mdl-sticky`, `.ds-scroll`, `.ds-tagline`, `.ds-cost-value`, `.ph-pill`, `.ds-card-*` variants, `.ds-who-quote`.

### 4.6 Scroll + sticky behavior

- `.ds-hdr` (hero 96-112 tall) and `.ds-mdl-sticky` (80 tall with padding) stay `position: sticky; top: 0` inside `.side-r` flex layout but actually pinned absolutely since content below scrolls.
- Actual structure: .side-r flex column: hero (fixed) + model-sticky (fixed) + scroll region (overflow-y auto).
- Section headers `.ds-l` inside `.ds-scroll` are `position: sticky; top: 0` within each card (sticky per card so they pin to top of card while you scroll its body, Figma pattern).

---

## 5. Canvas + node orbs + connections

### 5.1 Starfield layer (untouched, motif preserved)

The starfield stays exactly as v32.7 implements it, with refinement applied PER MANIFEST Section 5 only.

- `<canvas id="starfield">` remains a DIRECT child of `.cv-area`, not wrapped in any container that has `backdrop-filter`.
- `.cv-area { background: var(--s-0); }` is the ONLY background on the canvas parent. The starfield draws on top.
- No glass, no blur, no tonal container, no gradient, no image overlays the canvas area.
- SVG `#svg` with the 6000 x 6000 viewBox sits on top of the starfield canvas. Both are transparent where no content exists so the void color `#07070B` shows through.
- **Shooting stars preserved.** 1 every 6-12 seconds.
- **Parallax** 3 layers (far dim, mid twinkle, near bright + shooting stars) per MANIFEST 5. Speed ratio 1:2:4. Implementation in existing `starfieldDraw()` function.
- **Twinkle** capped at 40 percent opacity delta, 3-5 s cycle per star.
- **prefers-reduced-motion** -> static starfield at 40 percent opacity, twinkle stopped, shooting stars stopped. Field remains visible.
- **Light theme** -> starfield opacity 15 percent but motif preserved.

**Starfield NOT overlaid by any chrome within this section.** Left palette and right sidebar sit at x=0-260 and x=1120-1440 (at 1440 wide). Between them the starfield is 100 percent visible as the canvas void.

F3 Build implementer MUST NOT:

- Add backdrop-filter to `.cv-area`, `.cv-container`, `.cv-transform`, `#svg`, `#starfield`, `body`, or any ancestor.
- Replace the starfield with dots, grid, particles, or any alternative motif.
- Disable the starfield in light mode.
- Apply `filter: blur(...)` anywhere in the canvas tree.

### 5.2 Node orb (.nd)

```
+------------------+
|   +----------+   |
|   |  ICON 26 |   |  48 x 48 orb
|   |  phase   |   |  border 1 px, radius 24 (full circle)
|   +----------+   |  background rgba(var(--ph-X-rgb), 0.10)
|                  |
|  Agent Name      |  --fs-11 --t1 below orb, 8 px gap
|  [MODEL]  [load] |  model badge 22 x 12 + load bar 60 x 3
+------------------+
```

- `.nd` container 96 px wide auto height.
- `.nd-orb` 48 x 48, radius `--r-6 20` (not full circle; 20 px rounding gives "squircle" premium feel similar to iOS app icons).
- Phase housing ring `.nd.ph-X`: 2 px border in `var(--ph-X)` + outer glow `0 0 12px -2px rgba(var(--ph-X-rgb), 0.40)`.
- Idle state: border alpha drops to 0.60, glow alpha to 0.25 (de-emphasized so selected state has room to brighten).
- Hover: `translateY(-2px)`, glow alpha 0.60, brightness filter `1.08`, `--dur-fast --ease-standard`.
- Selected (`.nd.sel`): 2 px solid border, glow alpha 0.80 + outer 6 px ring `rgba(var(--ph-X-rgb), 0.50)`.
- Five Minds expert (`.five-minds-expert`): `--mc-opus` gold border accent layered on top of phase ring, `box-shadow: 0 0 0 1px var(--mc-opus), 0 0 24px -4px rgba(var(--mc-opus-rgb), 0.45)`.
- `.nd-lbl` name label --fs-11 --fw-medium --t1 centered under orb.
- `.nd-mdl` model badge 22 x 12 pill, --r-1 4 px, `--mc-X` tinted.
- `.nd-load` load bar 60 x 3, radius 2, background `rgba(255,255,255,0.06)`, fill `var(--state-*)` by load percent.
- Just-dropped animation `.just-dropped`: scale 0.9 -> 1.05 -> 1 + glow flash, `--dur-base --ease-spring-snappy`.
- Simulation states (preserved from v32.7): `.nd-sim-progress`, `.nd-speech`, `.nd-check`, `.nd-anc` anchors. Only their colors retuned to new phase tokens.

### 5.3 Connection paths (`svg#svg path`)

- Stroke color idle: `rgba(var(--ph-X-rgb), 0.35)` where X is the SOURCE phase.
- Stroke width idle: 1.5 px.
- Stroke width hover: 2.5 px (`pointer-events: stroke` on path).
- Stroke-dasharray idle: solid.
- Active (during sim): stroke alpha 1.0 + `filter: url(#glow)` + particle stream animation.
- Particle (data packet): 4 px circle, `fill: var(--ph-X)`, animated along path via `<animateMotion>` or offset-path, `--dur-hero 640ms --ease-linear` repeating.
- Connection type markers: `-> one-way`, `<-> bidirectional`, `~ continuous` rendered as mid-path SVG icon (existing v32.7 glyphs preserved).
- Selected connection: stroke 2.5 + 2 px outer halo in `--border-focus` violet.

### 5.4 Selection rectangle (`.mrq`)

```
+- - - - - - - - +
|                |
|                |
|                |  dashed 1 px --border-focus
|                |  background rgba(167,139,250,0.08)
+- - - - - - - - +
```

- Dashed 1 px `--border-focus` (debate violet).
- Background `rgba(167,139,250,0.08)`.
- Appears on left-mouse drag over empty canvas.
- On mouseup: selects all nodes whose center falls inside the rect.
- Animation: opacity fade in `--dur-fast`, fade out on release `--dur-instant`.

### 5.5 Zoom + minimap

- `.zm-ctrl` zoom controls: bottom-right corner of canvas, 16 inset, 32 x 128 vertical stack `+ / % / - / reset`. Each button 32 x 32 with thin glass chrome.
- `.minimap`: top-right corner of canvas, 16 inset under topbar, 140 x 100, thin glass L1, border 1 px `--border-faint`, shows `#mmapCanvas` render of all nodes at 1:40 scale.

### 5.6 Control bar `.cv-ctrl`

Floating pill above canvas bottom, centered. `--r-6 20 px`, thin glass L1.

```
    +------------------------------------------------------+
    | [Polacz] [Auto-polacz] [Layout] [Dialog] [Usun] [X]  |
    +------------------------------------------------------+
```

- 48 tall, auto width (8 px gap between buttons, 12 px inset).
- Bottom 24 px from canvas bottom.
- `.has-sel`, `.hint-conn`, `.hint-del`, `.conn-active` state classes preserved from v32.7.
- Drop pulse animation (`.drop-flash`) preserved.

---

## 6. Modals

### 6.1 Cost modal (`#moCost`)

- Dimensions: max-width 1080 px, max-height 720 px, centered. Width 80vw min 900. Height 70vh.
- Backdrop: `rgba(0,0,0,0.60) + blur(4 px)`.
- Chrome: glass-thick (MANIFEST DD5: `rgba(10,12,18,0.72) + blur(24 px) saturate(180%)`), border 1 px `--border`, `box-shadow: var(--elev-2)`, radius `--r-6 20` px (spec says 28, but MANIFEST ramp stops at 20; use 20).
- **View Transitions shared-element morph (DD24, R-06)**: the modal header `.cbm-hdr` carries `view-transition-name: vt-cost-hud` matching the topbar `#hudCost` cell. On open via `document.startViewTransition(...)`, the browser morphs the cell into the header. On close, the reverse morph animates back. See DESIGN_SPEC Section 4.3.
- Anatomy:

```
+--------------------------------------------------------------+  y=0 of modal
|  $ Cost Command Center               [x] close 32x32        |  header 72 tall
|  sticky, border-bottom --border-faint                        |
+--------------------------------------------------------------+  y=72
|  [Overview] [Breakdown] [What-if] [Export] [Kontekst]        |  tabs 44 tall
|  sticky, border-bottom --border-faint                        |
+--------------------------------------------------------------+  y=116
|                                                              |
|  TAB CONTENT (scrollable)                                    |
|                                                              |
|  Overview:                                                   |
|  +--------+ +--------+ +--------+ +--------+                 |
|  | KPI1   | | KPI2   | | KPI3   | | KPI4   |  120 tall each  |
|  +--------+ +--------+ +--------+ +--------+                 |
|                                                              |
|  +--------------+ +---------------------------------+        |
|  | DONUT CHART  | | PHASE STACKED BAR               |        |
|  | conic grad   | | horizontal stacked, 6 phase     |        |
|  | 240x240      | | 560 wide 48 tall                |        |
|  +--------------+ +---------------------------------+        |
|                                                              |
+--------------------------------------------------------------+
|  Footer: [Zamknij]                                           |  56 tall sticky
+--------------------------------------------------------------+
```

- 5 tabs (Kontekst added in v32.6 preserved).
- Each tab internal content preserved from v32.6 implementation (`renderCbmOverview/Breakdown/Whatif/Export/Context`).
- All number displays use `.hud-num` tabular-nums.
- Donut chart uses conic-gradient driven by model mix (Opus/Sonnet/Haiku) with CSS var colors.
- Phase stacked bar uses gradient `--ph-*` colors.

### 6.2 Custom Agent Creator (`#moKrt`)

- Dimensions: max-width 1120, max-height 780. Two-column split.
- Chrome: glass-thick (identical to cost modal).

```
+--------------------------------------------------------------+
|  + Custom Agent Creator           [Form] [Wizard]  [x]       |  header + mode toggle
+--------------------------------------------------------------+
|                                 |                            |
|  LEFT: FORM (660 wide)          |  RIGHT: PREVIEW (380)      |
|  padding 20                     |  padding 20                |
|  scroll                         |  sticky, not scroll        |
|                                 |                            |
|  Name     [__________]          |  +----------------------+  |
|  Phase    [v dropdown]          |  |    [ORB 48]         |  |
|  Model    [Opus|Sonnet|Haiku]   |  |    Agent Name        |  |
|  Icon     [picker grid]         |  |    [MODEL badge]     |  |
|  Color    [am cy bl vi ro mu]   |  |    phase pill        |  |
|  Role     [text 2 lines]        |  +----------------------+  |
|  Tools    [chip input]          |                            |
|  Prompt   [textarea 300 tall]   |  QUALITY SCORE [84/100]    |
|                                 |  [ROLE v] [INPUT v] ...    |
|  Clone from [v existing agent]  |  [LEN v] [TOOLS v]         |
|                                 |                            |
|  Model rec: [Sonnet 4.6 heur]   |  MOCK TEST PLAYGROUND      |
|                                 |  [Run test]                |
|  [Import MD] [Export MD]        |  {narrative output}        |
|                                 |                            |
|  [Anuluj] [Zapisz]              |                            |
+--------------------------------------------------------------+
```

- Form left 660 wide, scrollable.
- Preview right 380 wide, sticky.
- Icon picker modal (nested popover) appears on click: 8-col grid, category tabs (Built-in / 10 categories), search input, max-height 480.
- Wizard mode swaps form for 5-step wizard: step 1 Name+Phase, step 2 Model, step 3 Icon+Color, step 4 Role+Tools, step 5 Prompt. Nav `< Prev | Next >`.
- All v32.1/v32.2 functionality preserved.

### 6.3 Encyclopedia (`#moLearn` / `.learn-overlay`)

- Dimensions: full-bleed overlay 92 vw x 86 vh, centered.
- Chrome: glass-thick + decorative floating orbs background (`.bento-bg .bento-orb`) preserved from v32.7.
- Anatomy:

```
+--------------------------------------------------------------+
|  [<]  Orchestrator (12/28)  [>]              [x] Zamknij     |  nav bar 64 tall
+--------------------------------------------------------------+
|                                                              |
|  HERO ROW                                                    |
|  +-------+  Orchestrator                  [STRATEGY]        |
|  | 96x96 |  Dyrygent w orkiestrze planowania               |  --fs-32 hero title
|  | orb   |  ROLA | STRATEGIA | OPUS                         |
|  +-------+                                                  |
|                                                              |
|  BENTO GRID (3 cols)                                         |
|  +---------+ +---------+ +---------+                         |
|  | WHO     | | DOES    | | DOES NOT|                         |
|  +---------+ +---------+ +---------+                         |
|  +---------+ +---------+ +---------+                         |
|  | ANTI    | | FACTS   | | TOOLS   |                         |
|  +---------+ +---------+ +---------+                         |
|                                                              |
+--------------------------------------------------------------+
```

- Nav arrows cycle through agents OR presets depending on context.
- Keyboard: Left/Right navigate, Esc close.
- Bento cards 280 wide 220 tall, `--r-5 14` radius, `--s-3` bg, border `--border-faint`.
- Hero title --fs-32 --fw-bold tracking -0.02em.

### 6.4 Mermaid export (`#moMer`)

- Dimensions: max-width 720, max-height 560. Centered.
- Chrome: glass-thick.

```
+------------------------------------------+
|  Mermaid Export            [x]           |  header 56
+------------------------------------------+
|                                          |
|  +------------------------------------+  |
|  | flowchart TD                       |  |  textarea readonly
|  |  orchestrator --> research         |  |  --fs-12 Geist Mono
|  |  research --> build                |  |  height 360
|  |  ...                               |  |  padding 16
|  +------------------------------------+  |
|                                          |
|  [Copy to clipboard] [Download .mmd]     |  footer btn row
+------------------------------------------+
```

- Textarea `--s-3` bg, border `--border-faint`, monospaced.
- Copy button: `.btn.btn-p`, confirms with toast "Skopiowano do schowka".

### 6.5 Modal chrome spec (applies to all .mo)

- Radius `--r-6 20 px` (revised from spec draft 28, MANIFEST ramp stops at 20).
- Background glass-thick: `rgba(10,12,18,0.72)` + `backdrop-filter: blur(24 px) saturate(180%)`.
- Border 1 px `--border`.
- Shadow `var(--elev-2)`.
- Inner top highlight `var(--sh-inset-top-hi)` mandatory.
- Close button: 32 x 32 (satisfies DD28 SC 2.5.8 24x24 floor), top-right 16 inset, `--r-2 6 px`, hover `--s-4`, class `.mo-close`.
- Backdrop: `rgba(0,0,0,0.60)` + `backdrop-filter: blur(4 px)`.
- Focus trap: first focusable element gets focus on open, Tab cycles within, Shift+Tab cycles back, focus returns to trigger on close.
- Escape closes modal in stack order (HITL > moKrt > moCost > moLearn > moMer).
- Entry animation: opacity 0 -> 1 + scale(0.98) -> scale(1), `--dur-slow 480 ms --ease-emphasized`.
- Exit animation: reverse, `--dur-base 220 ms --ease-accelerate`.
- `prefers-reduced-motion`: opacity fade only.
- **View Transitions API opt-in (DD24, R-06)**: each modal open handler should call
  `if (document.startViewTransition) { document.startViewTransition(() => openModal(id)); } else { openModal(id); }`.
  For moCost specifically the morph animates the topbar cost cell (`#hudCost`)
  into the modal header (`#moCost .cbm-hdr`) via shared `view-transition-name: vt-cost-hud`.
  moKrt / moLearn / moMer use single-element named transitions for a consistent
  premium feel without the morph. Debate Arena round swap uses
  `vt-debate-round`. All tuned via `::view-transition-group()` in DESIGN_SPEC Section 4.3.
  Reduced-motion downgrades to opacity crossfade only.

---

## 7. Responsive behavior

Minimum viewport: 1280 x 800. Below that show desktop-required notice.

| Viewport width | Left palette | Right detail       | Canvas  | Notes                             |
|----------------|--------------|--------------------|---------|-----------------------------------|
| >= 1920        | 260          | 320                | rest    | full layout as specified          |
| 1440 - 1919    | 260          | 320                | rest    | full layout as specified          |
| 1280 - 1439    | 260          | 280 (shrink)       | rest    | right cards stay but font-13->12  |
| 1024 - 1279    | 56 rail def  | 320 drawer (hidden)| rest    | click node opens slide-in drawer  |
| < 1024         | N/A          | N/A                | N/A     | show "Desktop required" notice    |

Drawer mode (<1280): right sidebar appears from right as a slide-in layer (not fixed column), dismissible via X or Esc, overlays canvas. Enter animation `translateX(100%) -> 0` `--dur-medium --ease-emphasized`.

Rail mode is user-toggleable at all sizes above 1024 (Cmd/Ctrl+B).

Below 1024 (tablet / phone): out of scope per MANIFEST OOS-05. Show fullscreen notice:

```
+--------------------------------------------------+
|                  [ desktop-ico ]                 |
|                                                  |
|        Aplikacja wymaga pulpitu                  |  --fs-24
|     (Desktop browser, min 1280 px wide)          |  --fs-14 --t2
|                                                  |
|  Agent Architecture Designer to zaawansowane     |
|  narzedzie zespolowe projektowane pod ekrany     |
|  dev-grade. Otworz na komputerze.                |
|                                                  |
|  [ Sprobuj mimo to ] [ Dokumentacja ]            |  ghost btns
+--------------------------------------------------+
```

---

## 8. A11y specs

### 8.1 Focus management

- **Focus trap in modals** (moCost, moKrt, moLearn, moMer, hitlOverlay). Uses sentinel elements before/after the modal content. First focusable element focused on open. On close, focus returns to the trigger button (stored in `lastFocused` variable).
- **Focus-visible indicators**: 2 px ring `var(--border-focus)` + 2 px offset (transparent gap) on `:focus-visible` only. Never on `:focus` without keyboard.
- **Tab order (updated per DD28, R-10 roving tabindex on palette)**: topbar actions (brand, problem textarea, each HUD cell as `<button>`, action cluster) -> left palette search -> left palette tabs (Agenci / Presety / Zapisane) -> left palette container (ONE tab stop, arrow keys move between rows, R-10) -> left palette footer buttons (Add custom, Import) -> canvas (single focusable handled by main workspace) -> right sidebar close button -> right sidebar model buttons (Opus/Sonnet/Haiku) -> right sidebar scroll content (cards in order) -> statbar.
- **Roving tabindex on palette (DD28, R-10)**. Left palette rows use the WAI-ARIA listbox keyboard pattern. At any moment exactly ONE row in the active tab panel carries `tabindex="0"`; all others carry `tabindex="-1"`. A key handler on `.pa-scroll` intercepts ArrowUp, ArrowDown, Home, End, PageUp, PageDown and moves focus between rows. Enter or Space activates the focused row. Keyboard users get ONE tab stop on the palette instead of ~150. When the user Tabs out and back in, the last-active row regains focus. Implementation owner: F2 Frontend Dev (sidebars). Test owner: F6 Integrator.
- **Scroll-padding for SC 2.4.11 Focus Not Obscured (DD28, R-07)**. DESIGN_SPEC Section 3 ships `html { scroll-padding-block: 56px 24px; }` so that a focused row inside `.pa-scroll` or `.ds-scroll` does not hide under the 56 px sticky topbar or 24 px statbar when brought into view by keyboard navigation. F6 Integrator must test this with Tab + arrow keys through a tall palette at 1280 px viewport.
- **Skip link**: `.skip-link` positioned absolute top: -40, focusable bumps to top:8, `Ctrl+/` also activates it. Targets `main.workspace`.

### 8.2 Escape key nesting

```
ESC order (top of stack first):
1. HITL overlay (if open)
2. Custom Agent Creator (if open)
3. Encyclopedia (if open)
4. Cost modal (if open)
5. Mermaid export (if open)
6. Context menu / icon picker popovers
7. Connection mode (exit to normal)
8. Clear selection (if selection active)
```

Each modal tracks its open state and Escape only closes the topmost.

### 8.3 ARIA

- `aria-label` on all icon-only buttons (32 x 32 topbar actions, 32 x 32 close buttons, zoom buttons, etc.)
- `role="dialog" aria-modal="true" aria-labelledby="..."` on each modal root.
- `role="tablist"` on tab containers, `role="tab" aria-selected="true|false"` on tab buttons, `role="tabpanel"` on panels.
- `role="option"` on palette rows, `role="listbox"` on palette containers.
- `aria-live="polite"` on `.sim-status`, `.cv-info`, `.toast`, `.sr-announcer`.
- `aria-live="assertive"` on HITL decision panel when it appears.
- `aria-pressed` on toggle buttons (theme, lang, icon mode).
- `aria-expanded` on collapsible sections.

### 8.4 prefers-reduced-motion downgrades

All animations with `transform: translate(...)`, `scale(...)`, or `rotate(...)` collapse to opacity fades only. Durations drop to `--dur-instant 80 ms`. Exceptions preserved (per MANIFEST DD21):

- LIVE pulse (state signal)
- Loading spinners (state signal)
- Starfield: stops twinkling, stops drifting, stops shooting stars. Base stars static at 40 percent opacity.

### 8.5 Color + icon pairing

All state colors (success/warning/danger/info) ALWAYS paired with an icon per WCAG 1.4.1. Never color-only.

- Success: green checkmark
- Warning: amber triangle !
- Danger: red X or octagon !
- Info: blue circle i or lightbulb
- Neutral: grey dash

### 8.6 APCA target

- Body text `--t1 #E6E8EE` on `--s-2 #12151C`: target Lc >= 90
- Secondary `--t2 #B5BAC7` on `--s-2`: target Lc >= 72
- Tertiary `--t3 #8089A0` on `--s-2`: target Lc >= 55 (non-body only)
- Model badge text (op/so/ha) on tinted bg: target Lc >= 60 (uses `--mc-X-ink` variant per DD23)
- Phase pill text (phase name on tinted bg): target Lc >= 60 (uses `--ph-X-ink` variant per DD23)

**DD23 two-tier rule enforcement (post-debate FM3 HARD BLOCKER resolved, R-01)**.
Any place a model or phase color is used AS TEXT on the `--s-2` panel surface
MUST use the `-ink` token, not the base. Base tokens (--mc-sonnet, --ph-strategy,
--ph-debate, --ph-qa) fail APCA Lc 60 as ink on dark and are only valid as
fills, borders, glows, or icon strokes. Components affected:
- `.chip-model-so` color uses `--mc-sonnet-ink` not `--mc-sonnet`
- `.chip-phase-strategy` color uses `--ph-strategy-ink` not `--ph-strategy`
- `.chip-phase-debate` color uses `--ph-debate-ink` not `--ph-debate`
- `.chip-phase-qa` color uses `--ph-qa-ink` not `--ph-qa`
- `.ph-pill` label text inherits the same rule
- `.pa-badge` model label uses `--mc-X-ink`
- `.cbm-tbl .tc-md.so` text in the cost breakdown table uses `--mc-sonnet-ink`
- any sparkline number, MIX chip label, phase mini-badge on dark panel

Components using base tokens CORRECTLY (not affected): node orb border glow,
connection path stroke, modal dot indicator, phase pill BACKGROUND, phase
housing ring, model button ACTIVE border, data packet fill, cost donut chart
slice fill. These render as shapes, fills, or wide areas where APCA Lc 60 does
not apply.

F6 Integrator must run APCA Plus or Contrast Suite against the final palette
before merge and verify every `-ink` usage is correct. Acceptance: zero
chip/label/pill text below Lc 60 on `--s-2`.

### 8.7 Glass kill-switch Settings toggle (DD25, R-03)

F6 Integrator wires a "Solidne tlo (Solid mode)" toggle into the existing
Settings popover (or creates the popover if absent). Toggle writes
`html[data-glass="solid"]` attribute on on state, removes it on off state,
persists to `localStorage.glassMode` ("solid" or "glass"). On app load, read
the key and apply the attribute before first paint to avoid a flash. The
DESIGN_SPEC Section 6 CSS handles all visual swaps. This is the user-facing
escape hatch for low-end GPUs struggling with backdrop-filter over the
6000x6000 SVG. F2 can provide a mock toggle during build; F6 finalizes.

### 8.8 Target size audit checklist (DD28, SC 2.5.8, R-08)

F6 Integrator verifies every interactive control is at least 24x24 CSS px.
List of previously-small controls that MUST grow in v32.8:
- `.pa-search-clear` clear X: grew 14 -> 24 (icon stays 14 visually, tap target 24)
- Any close button on nested popovers (icon picker, context menu): min 24x24
- Tab triggers `.sl-tab`: already 36 tall, pass
- Minimap zoom buttons: already 32x32, pass
- HUD cells: already 32 tall, 92 wide, pass
- Chip close/remove X buttons in custom agent creator tool chips: lift to 24x24
- Model button `.ds-mdl-btn`: already 64 tall x 96 wide, pass
- Topbar action buttons: already 32x32, pass
- `.ds-close` right sidebar close: already 32x32, pass
- `.mo-close` modal close: already 32x32, pass
- Saved preset delete button (if present): min 24x24

Zero tolerance: any control below 24x24 at build time is a code-review reject.


---

## 9. Build phase hand-off checklist

| Owner | Section | What they implement | Test exit criteria |
|-------|---------|---------------------|--------------------|
| F1 Designer (DESIGN_SPEC) | Section 1 + all tokens | Author dark palette CSS vars, Inter + Geist Mono link tags, type/dur/ease/radius/shadow/glass token blocks | All tokens referenced elsewhere resolve; no hard-coded hex in layout CSS |
| F2 Frontend Dev (sidebars) | Sections 2, 3, 4 | Topbar HUD markup + CSS, left palette rows + tabs + search + scroll + rail mode, right sidebar hero + model sticky + card variants | Visual match to ASCII; all v32.7 features (filter, drag, select, detail, model change) still work |
| F3 Frontend Dev (canvas) | Section 5 | Node orb restyle (.nd.ph-X ring + squircle orb), connection stroke retune, marquee rect, zoom + minimap chrome, control bar pill | Starfield visible in all scenarios; no backdrop-filter added to canvas tree; simulation still animates nodes |
| F4 Feature Dev (modals) | Section 6 | moCost tabs restyle + donut, moKrt two-col + preview, moLearn bento + nav, moMer textarea + copy | Focus trap works in all modals; Escape closes correct one; all tab content renders |
| F5 Backend Dev (controls) | Section 4.3 + 2.2 buttons/inputs/chips globally | Model button premium style, input focus ring, chip hover, btn hover lift, kbd pills, severity states for HUD cells | All buttons pass keyboard-only interaction; hover lift is 2 px not jitter |
| F6 Integrator | Sections 7 + 8 | Responsive breakpoints, focus management, ESC stack, ARIA, skip link, APCA audit, prefers-reduced-motion pass, theme toggle persist | WCAG 2.2 AA pass, 1280 min width enforced, rail mode toggles correctly, theme saved in localStorage |

---

## 10. Self-check

- [x] All v32.7 functionality accounted for: palette filter/search/tabs, preset featured cards, agent detail with model buttons and knowledge cards, preset detail with SZCZEGOLOWY OPIS, cost HUD cells, theme toggle, lang toggle, simulation button, custom agent creator (form + wizard + icon picker), cost modal (5 tabs), encyclopedia bento, Mermaid export, HITL overlay, debate arena, context budget badges, rail collapse, auto-connect, marquee select, zoom, minimap, dialog timeline, statbar, save/load, import/export.
- [x] Starfield untouched in Section 5.1 (explicit preservation list + forbidden actions list).
- [x] All measurements from MANIFEST section 4 used: left palette 260 expanded / 56 rail, right detail 320 fixed, topbar 56, dense row 32, comfy row 40, agent orb 48, category header 28 (bumped from 24 for count chip), model button 64 tall.
- [x] Class names preserved: .topbar, .tb-brand, .tb-problem, .tb-actions, .side-l, .side-r, .pa-cat, .pa-item, .pa-orb, .pa-name, .pa-desc, .pa-badge, .pa-tier-badge, .pa-search, .pr-cat, .pr-item, .pr-orb, .pr-name, .pr-desc, .pr-cnt, .sl-tabs, .sl-tab, .sl-pan, .ds-card, .ds-avatar, .ds-avatar-orb, .ds-avatar-info, .ds-l, .ds-mdl-big, .ds-mdl-btn, .mdl-dot, .mdl-name, .mdl-meta, .ds-tools-list, .ds-tool-chip, .ds-prompt, .ds-ta, .ds-ctx-box, .ds-ctx-bar, .ds-ctx-hdr, .ds-ctx-pct, .ds-ctx-meta, .nd, .nd-orb, .nd-lbl, .nd-mdl, .nd-load, .nd-anc, .nd-check, .nd-speech, .nd-sim-progress, .cv-ctrl, .cv-area, .cv-info, .zm-ctrl, .minimap, .mo, .moCost, .moKrt, .moLearn, .moMer, .learn-overlay, .bento-scroll, .hitl-overlay.
- [x] New wrapper classes (documented additions): .pa-search-wrap, .pa-search-icon, .pa-search-hint, .pa-footer, .pa-scroll, .pa-cat-cnt, .pr-cat-cnt, .tb-hud, .hud-cell, .hud-ico, .hud-col, .hud-label, .hud-num, .hud-bar, .hud-dots, .tb-divider, .tb-version, .ds-close, .ds-hdr, .ds-mdl-sticky, .ds-scroll, .ds-tagline, .ds-cost-value, .ds-who-quote, .ds-card-ctx, .ds-card-cost, .ds-card-conn, .ds-card-who, .ds-card-do, .ds-card-dont, .ds-card-anti, .ds-card-facts, .ds-card-tools, .ds-card-prompt, .ds-card-longdesc, .ph-pill, .pa-tier-badge (preserved). No renames of existing classes.
- [x] No em-dashes or en-dashes in this document. Only regular hyphens and pipe separators.
- [x] Polish UI labels retained (SZCZEGOLOWY OPIS, KIEDY UZYWAC, KIEDY NIE UZYWAC, KLUCZOWE CECHY, KIM JEST, CO ROBI, CZEGO NIE ROBI, NARZEDZIA, PROMPT AGENTA, Dodaj wlasnego agenta, Szukaj agenta, Skroty klawiszowe, Symulacja, Final Prompt, Eksport, Import, Motyw) with EN in parentheses where ambiguous.
- [x] Accent budget respected: phase colors used for borders and icons, not large fills. Saturated pixel ceiling 5-8 percent per MANIFEST P6.
- [x] Three elevation layers strictly maintained (L0 canvas, L1 sidebar/topbar/statbar, L2 modal/popover). No L3.
- [x] Phase D Five Minds resolutions R-01 through R-10 applied:
  - R-01 Sonnet APCA fix: ink tokens referenced in Section 8.6 two-tier rule enforcement.
  - R-02 Opus gold v32.7 preserved: no layout change needed, DESIGN_SPEC reverted.
  - R-03 glass kill-switch: Settings toggle documented in Section 8.7.
  - R-04 .nd contain:paint only: DESIGN_SPEC change, LAYOUT_SPEC mockups unaffected.
  - R-05 rail-collapse deferred: Section 3 lead note + Section 3.7 header.
  - R-06 View Transitions API: Section 2.2 HUD cell view-transition-name + Section 6.1 cost modal + Section 6.5 modal chrome spec.
  - R-07 scroll-padding SC 2.4.11: Section 8.1 focus management note.
  - R-08 24x24 target size SC 2.5.8: Section 3.3 search clear X, Section 6.5 close buttons, Section 8.8 audit checklist.
  - R-09 SZCZEGOLOWY OPIS first: Section 4.2 lead note + mockup comment.
  - R-10 roving tabindex: Section 3.5 skeleton note + Section 8.1 tab order.
- [x] All 28 MANIFEST DDs referenced: DD1-DD28. New DDs DD23 (two-tier ink), DD24 (View Transitions), DD25 (glass kill-switch), DD26 (.nd contain), DD27 (rail deferred), DD28 (WCAG 2.2 bundle).
