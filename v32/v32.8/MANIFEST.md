# v32.8 MANIFEST - Single Source of Truth

Status: POST-DEBATE (Phase D Syntetyk merge complete, ready for Phase E HITL Gate 1)
Consumers: Phase C2 DESIGN_SPEC, Phase C3 LAYOUT_SPEC, Phase D Five Minds debate, Phase E HITL.
Inputs synthesized: CRITIC.md (spine) + R1-R8 + FM1-FM5 (Five Minds position papers).
Rule: values in this file are decisions. Specs below expand them, debate amended them (see Section 9), HITL Gate 1 confirms them.

## 1. Design pillars

P1. Starfield is the motif. Every decision protects its visibility. Chrome filters it, never replaces it.
P2. Deference over decoration. Content (canvas + nodes) is the protagonist. Chrome dims, canvas brightens.
P3. Borders define planes, shadows define altitude. In-flow surfaces use hairline borders. Shadows only on things that float.
P4. Glass on chrome only. Sidebars, topbar, modals, popovers. NEVER on .canvas, .world, .stage, body, or any parent of the 6000x6000 SVG.
P5. Three elevations, never more. L0 canvas / L1 panel / L2 floating. Stacking beyond three = spatial confusion.
P6. One accent budget, spent with discipline. 5 percent saturated pixels ceiling. Phase color is ink, not fill.
P7. Dark-first tokens, light derived. Author dark palette, semantic tokens flip under [data-theme=light].

## 2. Decyzje designerskie

DD1. Base canvas sits on `--s-1 #0B0D12`. Panels on `--s-2 #12151C`. Cards/rows on `--s-3 #1A1F2B`. Hover on `--s-4 #242B3A`. Floating on `--s-5 #2B3142`. Starfield void beneath everything is `--s-0 #07070B`. [CRITIC contradiction #1 ruling: R8 base + R3 void.]
DD2. Body text `#E6E8EE`, muted `#B5BAC7`, subtle `#8089A0`, disabled `#545B6E`. Never `#FFF`, never `#000`. [CRITIC contradiction #5 ruling.]
DD3. Hairline border token defaults to `rgba(255,255,255,0.08)`. Soft variant `0.06`. Strong separator `0.14`. [CRITIC contradiction #4 consensus.]
DD4. Thin glass dialect (L1 sidebars, topbar, HUD chips): `rgba(18,20,28,0.58)` + `blur(14px) saturate(160%)`. [CRITIC shortlist #2, R4.]
DD5. Thick chrome dialect (L2 modals, command palette, HITL overlay): `rgba(10,12,18,0.72)` + `blur(24px) saturate(180%)`. [CRITIC contradiction #2 ruling: R4 ladder wins over R1.]
DD6. Every glass panel MUST carry the inner top specular highlight `inset 0 1px 0 rgba(255,255,255,0.11)`. Non-negotiable premium signature. [CRITIC shortlist #4.]
DD7. Three elevation layers only. L0 canvas (no shadow). L1 panel (inset top highlight + ambient `0 20px 50px -20px rgba(0,0,0,0.55)`). L2 floating (inset top highlight + `0 24px 60px -24px rgba(0,0,0,0.55)` + `0 8px 24px -12px rgba(0,0,0,0.4)`). [R1 + R3 + R7.]
DD8. Radius ramp 0 / 4 / 6 / 8 / 10 / 14 / 20 px. Concentricity rule: panel 20 -> card 14 -> row 8 -> chip 6 -> input 4. [R1 concentricity + R2 shape ramp.]
DD9. Phase palette remapped to Okabe-Ito anchors (dark): strategy `#5B8DEF`, research `#22C4E6`, debate `#A78BFA`, build `#34D399`, qa `#F87171`, hitl `#FBBF24`. [CRITIC shortlist #15, R8.] Token names preserved: `--ph-strategy/research/debate/build/qa/hitl`.
DD10. Model palette PRESERVES v32.7 brand colors (FM1 pragmatyk ruling, R-02 resolution): `--mc-opus #F59E0B` (gold, v32.7 exact, NOT the cooler `#F5B042` previously proposed), `--mc-sonnet #8B5CF6` (violet kept as v32.7), `--mc-haiku #34D399` (green kept as v32.7). All three ship paired `-rgb` triplets for rgba composition. See DD23 for the companion ink tokens used when these colors are rendered AS TEXT on dark surfaces.
DD11. Font stack: `--ff-sans` = InterVariable + Inter + system-ui fallback. `--ff-mono` = Geist Mono + JetBrains Mono + SF Mono fallback. Loaded via Google Fonts CDN + Vercel CDN link tags (system-ui covers offline). [R6 + R5.]
DD12. Type scale 11 / 12 / 13 / 14 / 16 / 18 / 24 / 32 px. No 10, no 15, no 17. 11 is meta only, 13 is sidebar primary, 14 is body default, 24 is panel title, 32 is modal hero. [R6 contradiction #6 ruling in CRITIC.]
DD13. Global OpenType `"kern","calt","liga","cv11" 1` on body. HUD numerics carry `font-variant-numeric: tabular-nums slashed-zero lining-nums`. [R6 premium signal.]
DD14. Variable weights 420 regular / 520 medium / 580 semibold / 680 bold. Non-standard values signal "tuned not stock". [R6.]
DD15. Duration ladder 80 / 150 / 220 / 320 / 480 / 640 ms. Hover uses `--dur-fast 150ms`. Panel enter uses `--dur-medium 320ms`. Modal open uses `--dur-slow 480ms`. [CRITIC contradictions #6 and #7 ruling.]
DD16. Easing: `--ease-standard cubic-bezier(0.2,0,0,1)` default. `--ease-emphasized cubic-bezier(0.05,0.7,0.1,1)` for panels and modals. `--ease-decelerate cubic-bezier(0,0,0,1)` for entering. `--ease-accelerate cubic-bezier(0.3,0,1,1)` for exiting. `--ease-spring-snappy cubic-bezier(0.2,0,0,1.2)` for severity flashes. `--ease-linear linear` for spinners only. [R2 + R7.]
DD17. Hover pattern locked: `translateY(-2px)` + shadow swap, `--dur-fast --ease-standard`, never hue flip. `:active` presses back down at `--dur-instant 80ms`. [R1 + R4 + R7 consensus.]
DD18. Sidebar widths: left palette 260 px expanded / 56 px rail, right detail 320 px fixed (Figma precedent), topbar 56 px. Dense row 32 px, comfy row 40 px. [CRITIC shortlist #13, R5.]
DD19. Category header "NEW" badge (v32.7 tier-new chip) retained as small outlined haiku-green chip at 7 px uppercase. No change.
DD20. `@supports not (backdrop-filter: blur(1px))` fallback + `@media (prefers-reduced-transparency)` downgrade -> solid `rgba(18,20,28,0.95)` with `backdrop-filter: none`. Every glass surface ships both. [R4.]
DD21. `prefers-reduced-motion` collapses translate/scale but preserves opacity cues, spinners, and the LIVE pulse. Starfield downgrades to static at 40 percent opacity. [R7 + R8.]
DD22. State colors decoupled from phase colors. `--state-success #34D399`, `--state-warning #FBBF24`, `--state-danger #F87171`, `--state-info #60A5FA`, `--state-neutral #8089A0`. Same hex as phases permitted, but distinct token so QA-phase red can retune without breaking danger semantics. [R8.]

DD23. **Two-tier color rule: brand fill vs text ink.** The `-primary` token (`--mc-X`, `--ph-X`) is the BRAND fill color used as background, border, glow, icon fill. The `-ink` variant is used WHENEVER the color appears AS TEXT on a dark surface (chip label, phase pill label, model badge label, sparkline number, KOSZT badge text). The ink variant is a brighter tint that passes APCA Lc 60 on the `--s-2` panel surface. Rule applied ONLY where the base token fails Lc 60; tokens that pass (Opus gold, Haiku green, research cyan, build green, hitl amber) do not ship a separate ink variant and reuse the base. [FM3 Analityk Danych APCA audit ruling, R-01 resolution.]

New ink tokens added in DESIGN_SPEC Section 1:
- `--mc-sonnet-ink #C4B5FD` (brighter violet, Lc passes on `--s-2`; base `#8B5CF6` stays for fills/borders/dot glow)
- `--ph-strategy-ink #8AB4F8` (brighter blue, base `#5B8DEF` was Lc 45, ink raises to >=60)
- `--ph-debate-ink #C4B5FD` (brighter violet, base `#A78BFA` was Lc 49, ink raises to >=60)
- `--ph-qa-ink #FCA5A5` (brighter coral, base `#F87171` was Lc 43, ink raises to >=60)

Tokens that already pass on dark without an ink variant (documented for Build): `--mc-opus #F59E0B` Lc ~78, `--mc-haiku #34D399` Lc ~80, `--ph-research #22C4E6` Lc ~74, `--ph-build #34D399` Lc ~80, `--ph-hitl #FBBF24` Lc ~83. These reuse the base token as ink.

Light-theme ink tokens: the existing `[data-theme=light]` overrides already use darker anchors (`#6D28D9` Sonnet, `#1F5FD6` strategy, etc.) that pass APCA on white, so the ink variant aliases back to the base in light. See DESIGN_SPEC Section 2.

DD24. **View Transitions API on modal opens and debate round swap.** v32.8 adopts the View Transitions API via `document.startViewTransition()` on 4 modal open events (moCost, moKrt, moLearn, moMer) and on the Five Minds Debate Arena round-to-round swap. Shared `view-transition-name` tokens enable a morph animation from the topbar HUD cost cell into the Cost modal header (cost cell and modal header both carry `view-transition-name: vt-cost-hud`). Feature-detected with `if (document.startViewTransition)`, falls back to the existing CSS `@keyframes mo-pop` animation on browsers without support. `prefers-reduced-motion` downgrades to opacity crossfade only. ~40 lines of CSS + ~20 lines of JS wiring, zero risk. [FM2 Innowator, R-06 resolution.]

DD25. **Backdrop-filter kill-switch attribute.** `html[data-glass="solid"]` attribute (writable from a Settings toggle, implementation wired in Phase F) swaps all `--glass-*-bg` tokens to their `@supports` solid fallback values and sets `backdrop-filter: none` on every glass surface. Users on low-end GPUs can flip it to recover frame budget over the 6000x6000 SVG canvas. DESIGN_SPEC Section 6 ships the CSS; the Settings toggle and localStorage persistence are Phase F wiring. [FM1 Pragmatyk perf mitigation, R-03 resolution.]

DD26. **contain:layout removed from .nd, paint only.** The v32.7 canvas simulation math reads `.nd` element positions (getBoundingClientRect, offsetTop/offsetLeft) for anchor points of connection paths, data packets, and speech bubbles. `contain: layout` breaks these reads in some browsers by isolating layout calculation from ancestor layout queries. DESIGN_SPEC Section 4.8 uses `contain: paint` only on `.nd`, which keeps the paint isolation benefit without breaking existing anchor math. [FM1 Pragmatyk regression fix, R-04 resolution.]

DD27. **Sidebar rail-collapse mode deferred to v32.9.** The 56 px rail mode (Cmd+B toggle, DD18 originally) is marked optional behind a feature flag in v32.8 and does not block Phase F. LAYOUT_SPEC Section 3.7 keeps the mockup as reference but moves the enable-by-default behavior to v32.9. Build scope for v32.8 = always-expanded 260 px left palette. [FM1 Pragmatyk scope cut, R-05 resolution.]

DD28. **WCAG 2.2 + target size hard requirements.** Three a11y fixes elevated to must-have for v32.8 ship:
- **SC 2.4.11 Focus Not Obscured**: `html { scroll-padding-block: 56px 24px; }` globally so focused rows beneath the sticky 56 px topbar and 24 px statbar scroll into view with clearance.
- **SC 2.5.8 Target Size minimum**: every interactive control minimum 24x24 CSS px, preferred 44x44 for primary actions. pa-search clear X, chip close buttons, tab triggers, minimap zoom controls, HUD cells all audited in LAYOUT_SPEC mockups; any control under 24x24 must grow.
- **Roving tabindex on palette**: left palette rows use roving tabindex so arrow keys move between agents/presets, not Tab. Keyboard users get one tab stop on the palette container instead of ~150. Implementation uses `tabindex="0"` on the active row, `tabindex="-1"` on all others, arrow-key handler to move focus and shift the tabindex. [FM4 Rzecznik Uzytkownika WCAG audit, R-07/R-08/R-10 resolutions.]

## 3. Stack wizualny

### 3.1 Color system

**Primitive tokens (dark, tier 1, never referenced by components):**

- `--p-ink-0 #06080C` (starfield void sunken)
- `--p-ink-1 #0B0D12` (app canvas)
- `--p-ink-2 #12151C` (panel resting)
- `--p-ink-3 #1A1F2B` (card, row)
- `--p-ink-4 #242B3A` (hover/pressed row)
- `--p-ink-5 #2B3142` (popover, floating)
- `--p-fog-1 #E6E8EE` (primary text, APCA Lc ~92 on --p-ink-1)
- `--p-fog-2 #B5BAC7` (secondary, Lc ~74)
- `--p-fog-3 #8089A0` (tertiary, Lc ~58, non-body)
- `--p-fog-4 #545B6E` (disabled/placeholder, Lc ~30)

**Primitive tokens (light, derived):**

- `--p-ink-1 #FAFAFB`, `--p-ink-2 #FFFFFF`, `--p-ink-3 #F4F5F8`, `--p-ink-4 #E9EBF0`, `--p-ink-5 #FFFFFF`
- `--p-fog-1 #0B0D12`, `--p-fog-2 #545B6E`, `--p-fog-3 #8089A0`, `--p-fog-4 #B5BAC7`

**Semantic surface tokens (tier 2, what components reference):**

- `--s-0` void starfield back = `--p-ink-0`
- `--s-1` app canvas = `--p-ink-1`
- `--s-2` panel = `--p-ink-2`
- `--s-3` card/row = `--p-ink-3`
- `--s-4` hover = `--p-ink-4`
- `--s-5` floating = `--p-ink-5`

**Semantic ink tokens:**

- `--t1 #E6E8EE` primary
- `--t2 #B5BAC7` muted
- `--t3 #8089A0` subtle
- `--t4 #545B6E` disabled

**Border tokens (alpha, auto-adapt across themes):**

- `--border-faint rgba(255,255,255,0.06)` (soft separators)
- `--border rgba(255,255,255,0.08)` (default)
- `--border-strong rgba(255,255,255,0.14)` (tables, section dividers)
- `--border-focus #A78BFA` (accent focus ring, 2 px + 2 px offset, inherits debate violet)

Light theme flip: `rgba(11,13,18,0.08/0.10/0.18)`.

**Model colors (v32.7 preservation, DD10 corrected):**

- `--mc-opus #F59E0B` dark (v32.7 exact) / `#B45309` light (rgb 245,158,11 / 180,83,9)
- `--mc-sonnet #8B5CF6` dark / `#6D28D9` light (rgb 139,92,246 / 109,40,217)
- `--mc-haiku #34D399` dark / `#047857` light (rgb 52,211,153 / 4,120,87)

**Model ink tokens (DD23 two-tier rule, used as TEXT on dark surfaces only):**

- `--mc-opus-ink` = `var(--mc-opus)` dark (Lc ~78 passes) / `var(--mc-opus)` light
- `--mc-sonnet-ink #C4B5FD` dark (brighter violet, Lc passes) / `var(--mc-sonnet)` light
- `--mc-haiku-ink` = `var(--mc-haiku)` dark (Lc ~80 passes) / `var(--mc-haiku)` light

**Phase colors (Okabe-Ito remap, CVD-safe, paired -rgb triplets):**

- `--ph-strategy #5B8DEF` / `#1F5FD6`
- `--ph-research #22C4E6` / `#0891B2`
- `--ph-debate   #A78BFA` / `#6D28D9`
- `--ph-build    #34D399` / `#047857`
- `--ph-qa       #F87171` / `#B91C1C`
- `--ph-hitl     #FBBF24` / `#B45309`

**Phase ink tokens (DD23 two-tier rule, used as TEXT on dark surfaces only):**

- `--ph-strategy-ink #8AB4F8` dark (brighter blue, base Lc 45 fail) / `var(--ph-strategy)` light
- `--ph-research-ink` = `var(--ph-research)` dark (Lc ~74 passes) / `var(--ph-research)` light
- `--ph-debate-ink #C4B5FD` dark (brighter violet, base Lc 49 fail) / `var(--ph-debate)` light
- `--ph-build-ink` = `var(--ph-build)` dark (Lc ~80 passes) / `var(--ph-build)` light
- `--ph-qa-ink #FCA5A5` dark (brighter coral, base Lc 43 fail) / `var(--ph-qa)` light
- `--ph-hitl-ink` = `var(--ph-hitl)` dark (Lc ~83 passes) / `var(--ph-hitl)` light

Debate violet `#A78BFA` sits blue-shifted from Sonnet `#8B5CF6`; distance is perceivable but HITL Gate 1 should confirm they are distinct enough on glass. Note: the two INK variants `--ph-debate-ink #C4B5FD` and `--mc-sonnet-ink #C4B5FD` happen to use the same brighter tint on dark backgrounds because both need the same Lc lift. Ink is used on text only, while the `-primary` tokens on fills/glows/borders remain distinct (`#A78BFA` vs `#8B5CF6`), so side-by-side distinguishability lives on the fill layer, not the ink layer. HITL Gate 1 must visually confirm.

**State tokens:** `--state-success #34D399`, `--state-warning #FBBF24`, `--state-danger #F87171`, `--state-info #60A5FA`, `--state-neutral #8089A0`. Always paired with icon per WCAG 1.4.1.

**P3 progressive enhancement:** wrap phase + model tokens in `@supports (color: color(display-p3 1 1 1)) { @media (color-gamut: p3) { ... } }`. Neutrals stay sRGB. [R8.]

### 3.2 Typography

**Font stack:**

```
--ff-sans: "InterVariable","Inter",-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif;
--ff-mono: "Geist Mono","JetBrains Mono","SF Mono","Cascadia Code",ui-monospace,Menlo,Consolas,monospace;
--ff-display: var(--ff-sans);
```

Load via `<link>` tags (Google Fonts Inter + Vercel Geist Mono). System stack is the offline fallback.

**Type scale (px):**

- `--fs-11` 11 px (lh 1.35) meta, badges, phase pills
- `--fs-12` 12 px (lh 1.35) chips, tertiary labels
- `--fs-13` 13 px (lh 1.30) sidebar primary, dense body
- `--fs-14` 14 px (lh 1.50) body default
- `--fs-16` 16 px (lh 1.55) modal body
- `--fs-18` 18 px (lh 1.35) section titles
- `--fs-24` 24 px (lh 1.20) panel titles
- `--fs-32` 32 px (lh 1.10) modal hero

No 10 px, no 15 px, no 17 px.

**Tracking:** display `-0.02em`, title `-0.01em`, body `0`, dense 11-13 `+0.005em` on dark, caps labels `+0.04em`.

**Weights (variable axis):** `--fw-regular 420`, `--fw-medium 520`, `--fw-semibold 580`, `--fw-bold 680`. Kill all hard `font-weight: bold`.

**Global feature settings:**

```
font-optical-sizing: auto;
font-feature-settings: "kern" 1, "calt" 1, "liga" 1, "cv11" 1;
font-variation-settings: "wght" 420;
-webkit-font-smoothing: antialiased;
```

**HUD numerics block:**

```
font-family: var(--ff-mono);
font-variant-numeric: tabular-nums slashed-zero lining-nums;
font-feature-settings: "tnum" 1, "zero" 1, "lnum" 1;
```

Applies to `.hud-num`, topbar COST/TOK/MIX/CTX cells, Mission Control timers, Live Monitor metrics, Dialog Timeline phase pills, cost modal KPI cards.

### 3.3 Motion

**Duration ladder:**

- `--dur-instant 80ms` tooltip, toggle, press-down
- `--dur-fast 150ms` hover, focus, button press
- `--dur-base 220ms` dropdown, tab, chip state
- `--dur-medium 320ms` panel slide, card reveal, sidebar state
- `--dur-slow 480ms` modal, hero, sidebar collapse width
- `--dur-hero 640ms` route, page, phase swap

**Easing:**

- `--ease-standard cubic-bezier(0.2,0,0,1)` - 95 percent of UI
- `--ease-decelerate cubic-bezier(0,0,0,1)` - entering
- `--ease-accelerate cubic-bezier(0.3,0,1,1)` - exiting (use ~70 percent of enter duration)
- `--ease-emphasized cubic-bezier(0.05,0.7,0.1,1)` - panels, modals, phase swaps
- `--ease-spring-snappy cubic-bezier(0.2,0,0,1.2)` - severity flash, checkbox tick, toast
- `--ease-linear linear` - progress bars, spinners, starfield twinkle cycle

**Applied map:**

- Canvas node hover lift: `translateY(-2px)` `--dur-fast --ease-standard`
- Palette row hover: `--dur-fast --ease-standard`
- Detail sidebar slide in: `--dur-medium --ease-decelerate`
- Modal open (moCost, moPrompt, HITL): `opacity + scale(0.98 -> 1)` `--dur-slow --ease-emphasized`
- Phase swap in Debate Arena: `--dur-hero --ease-emphasized`
- Topbar severity flash: `--dur-base --ease-spring-snappy`
- Palette stagger on render: `calc(sibling-index() * 30ms)` `--dur-medium --ease-decelerate`

**prefers-reduced-motion policy:**

```
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Preserve: opacity fades, focus rings, LIVE pulse (state signal), spinners (loading state), starfield downgrade to static at 40 percent opacity (does not vanish, only stops moving).

### 3.4 Shape + elevation

**Radius ramp:**

- `--r-0 0` hard corners
- `--r-1 4px` inputs
- `--r-2 6px` chips, pills, HUD cells
- `--r-3 8px` rows, buttons, small cards
- `--r-4 10px` model pills, section cards
- `--r-5 14px` panel cards, knowledge cards
- `--r-6 20px` top-level panels, modals

Concentricity: panel 20 -> section card 14 -> row 8 -> chip 6 -> input 4. Each step subtracts roughly the local padding gap.

**Elevation layers:**

- **L0 canvas** (body, .canvas, .world): no background on canvas, NO shadow, only the starfield rides on `--s-0`.
- **L1 panel** (sidebars, topbar, section cards): thin glass + `inset 0 1px 0 rgba(255,255,255,0.11)` + `0 20px 50px -20px rgba(0,0,0,0.55)`. `--border-faint` or `--border` hairline.
- **L2 floating** (modals, popovers, context menus, HITL overlay): thick chrome + `inset 0 1px 0 rgba(255,255,255,0.14)` + `0 24px 60px -24px rgba(0,0,0,0.55)` + `0 8px 24px -12px rgba(0,0,0,0.40)`. `--border` hairline.

**Shadow recipes (drop-in):**

```
--sh-inset-top:    inset 0 1px 0 rgba(255,255,255,0.11);
--sh-inset-top-hi: inset 0 1px 0 rgba(255,255,255,0.14);
--sh-inset-bot:    inset 0 -1px 0 rgba(0,0,0,0.35);
--sh-ambient-1:    0 20px 50px -20px rgba(0,0,0,0.55);
--sh-ambient-2:    0 24px 60px -24px rgba(0,0,0,0.55);
--sh-key-2:        0 8px 24px -12px rgba(0,0,0,0.40);

--elev-1: var(--sh-inset-top), var(--sh-ambient-1);
--elev-2: var(--sh-inset-top-hi), var(--sh-ambient-2), var(--sh-key-2);
```

In-flow cards carry hairline border only. Shadows ONLY on L1/L2.

### 3.5 Glass recipes

**Thin glass (L1 sidebars, topbar, HUD chips):**

```
background: rgba(18,20,28,0.58);
backdrop-filter: blur(14px) saturate(160%);
-webkit-backdrop-filter: blur(14px) saturate(160%);
border: 1px solid var(--border-faint);
box-shadow: var(--elev-1);
contain: paint;
will-change: backdrop-filter;
```

HUD chip variant drops alpha to `0.35` and blur to `10px`.

**Thick chrome (L2 modals, command palette, HITL):**

```
background: rgba(10,12,18,0.72);
backdrop-filter: blur(24px) saturate(180%);
-webkit-backdrop-filter: blur(24px) saturate(180%);
border: 1px solid var(--border);
box-shadow: var(--elev-2);
```

**Mandatory rule:** every `.glass` element ships the inner top highlight (`--sh-inset-top` or `--sh-inset-top-hi`). A glass panel without this highlight is amateur and must be rejected in code review.

**Fallback matrix:**

```
@supports not (backdrop-filter: blur(1px)) {
  .glass { background: rgba(18,20,28,0.95); }
  .glass-thick { background: rgba(10,12,18,0.96); }
}
@media (prefers-reduced-transparency) {
  .glass, .glass-thick { backdrop-filter: none; background: rgba(18,20,28,0.95); }
}
```

**FORBIDDEN:**

- No `backdrop-filter` on `body`, `.canvas`, `.world`, `.stage`, or any parent of the 6000x6000 SVG. [R4 + CRITIC.]
- No glass blur on scrolling containers (only on non-scrolling outer chrome).
- No blur radius above 32 px in any production element.
- No tint alpha below 0.45 on body-text-carrying panels.
- No `rgba(0,0,0,X)` tints (use the cool near-black `rgba(18,20,28,X)`).

## 4. Sidebar redesign contract

Hand-off to LAYOUT_SPEC writer. Pixel targets and behaviors below. LAYOUT_SPEC expands into concrete HTML class-by-class mockups.

### 4.1 Left palette sidebar (`.pa-*`)

- **Width** 260 px expanded, 56 px rail-collapsed (Cmd+B toggle, persisted in localStorage).
- **Surface** thin glass L1. `background: rgba(18,20,28,0.58)`. Borders: 1 px `--border-faint` on inner edge facing canvas.
- **Outer padding** 20 px top / 12 px sides / 16 px bottom.
- **Section cards** for AGENCI and PRESETY: `--r-5 14px` radius, `--s-3` background, hairline border, 12 px internal padding.
- **Category header** `.pa-cat`: sticky, `--fs-11 font-weight 580 uppercase tracking 0.04em color var(--t3)`. 24 px height, 8 px vertical padding, border-bottom `--border-faint`.
- **Row height** 32 px dense (agent rows), 40 px comfy (preset rows, 2-line: name + count). Padding 10 px horizontal / 6 px vertical.
- **Row radius** `--r-3 8px`.
- **Orb** 30 px diameter, stroke 1 px `--border`, phase glow ring on hover.
- **Name** `.pa-txt`: `--fs-13 font-weight 520 color --t1`, tracking `+0.005em`.
- **Desc** `.pa-desc`: `--fs-11 font-weight 420 color --t2`, 1 line ellipsis.
- **Hover** background `--s-4`, 2 px lift, 150 ms `--ease-standard`. No hue flip.
- **Selected** background `rgba(var(--ph-X-rgb),0.12)` + 2 px left accent bar in phase color (Stripe env-strip pattern).
- **Stagger** on initial render: 30 ms sibling-index with fade + translateY 6 px.

### 4.2 Right detail sidebar (`.ds-*`)

- **Width** 320 px fixed (Figma precedent).
- **Surface** thin glass L1, mirrored to left palette.
- **Sticky header** avatar orb 56 px + name + phase pill. 64 px tall, `--border-faint` bottom.
- **Sticky model buttons** (Opus / Sonnet / Haiku) directly below header, 48 px tall pills, `--r-4 10px`, mono numerics for ctx + price, active state `background: rgba(var(--mc-X-rgb),0.14)` + 1 px model-colored border + tinted dot.
- **Sections** ROLE / MODEL CTX / KNOWLEDGE (WHO/WHAT/NOT/ANTI/FACTS) / SZCZEGOLOWY OPIS. Each is an L2 card: `--s-3` background, `--r-5 14px`, 12 px padding, `--border-faint`.
- **Section header** `.ds-section-h` sticky inside card: `--fs-11 uppercase tracking 0.04em color --t3`.
- **Dividers between sections** 1 px `--border-faint`, 12 px margin.
- **Knowledge cards** (who / anti / facts) keep v32.7 icon + label structure, restyled with new radii and borders. Green checkmarks for do, red X for do-not, amber warning for anti, lightbulb for fun-fact. Colors reference state tokens.
- **SZCZEGOLOWY OPIS card** highlight: `--s-3` with faint haiku-green 4 percent tint background, small NEW chip retained.
- **CTX budget bar** 6 px tall, full width, severity color from `--state-*` tokens.

### 4.3 Topbar HUD

- **Height** 56 px, single row.
- **Surface** thin glass L1 with alpha 0.55 (slightly darker to float over starfield).
- **Border bottom** 1 px `--border`.
- **Left cluster** logo mark + preset title (`--fs-14 fw-semibold --t1`) + preset NEW badge if applicable.
- **Center cluster** HUD cells: COST / TOK / MIX / CTX MAX. Each cell:
  - 32 px tall, `--r-2 6px`, `--s-3` background `rgba(26,31,43,0.35)`, 1 px `--border-faint`.
  - Label `.hud-label` 10 px uppercase `--t3`.
  - Value `.hud-num` 13 px Geist Mono tabular-nums `--t1`.
  - Severity color flash on change: `--dur-base --ease-spring-snappy`, border-color shifts to `--state-warning/danger`.
  - 8 px gap between cells.
- **Right cluster** theme toggle, language toggle, icon PNG/SVG toggle, export, help. 32 px square buttons `--r-2`, icon only, hover `--s-4`.
- Click on COST cell opens Cost Command Center modal (v32.4+ preserved).

### 4.4 Canvas nodes (`.nd`, `.pa-orb` on canvas)

- **Orb size** 48 px (preserved from v32.7).
- **Idle** 1 px `--border` solid border, no glow, SVG icon at `--ph-X` phase color.
- **Hover** `translateY(-2px)` + 2 px phase-color glow ring at 40 percent alpha, `--dur-fast --ease-standard`.
- **Selected** 2 px solid phase-color border + 6 px outer glow at 60 percent alpha.
- **Active simulation** pulse ring animation (v32.7 preserved, retimed to `--dur-slow` linear loop).
- **Phase housing class** `.nd.ph-X` ring preserved from v32.5 Color Consistency Edition, retuned to new phase hex.
- **Connections** 1.5 px stroke, `rgba(var(--ph-X-rgb),0.35)` idle, 1.0 on active, with data packets animated at `--dur-hero --ease-linear`.
- **Starfield layer beneath** the SVG. Canvas root carries zero background except the starfield itself.

## 5. Starfield refinement spec

**Preserved (NEVER change):**

- The animated starfield exists. It is the signature motif.
- The canvas background = starfield. No solid fill, no gradient, no glass, no opaque tonal container covers it.
- Shooting stars exist and cross the field occasionally.
- The starfield sits on `--s-0 #07070B` as the underlying void color only (the SVG draws over this, never replaces it).

**Permitted refinement scope (C2/C3 spec may tune these):**

- **Density** target 0.00012 stars per pixel (approx 120 stars at 1000x1000, scaled to viewport). Currently un-audited in v32.7, C2 should measure and tune.
- **Parallax layers** 3 layers: far (dim, slow, no twinkle), mid (twinkle, slow drift), near (bright, shooting star layer). Speed ratio 1 : 2 : 4.
- **Twinkle easing** shift from linear to `--ease-standard` on a 3-5 s cycle per star with randomized phase offset. Cap twinkle amplitude at 40 percent opacity delta (not 0-100).
- **Shooting star rate** 1 every 6-12 seconds, angle randomized within +/- 20 degrees from top-left to bottom-right diagonal. Duration 800-1200 ms, `--ease-accelerate`.
- **Dim under chrome** no additional dim needed; thin glass already filters it. Verify visually.
- **prefers-reduced-motion downgrade** stars become static. Twinkle and drift stop. Shooting stars stop. Base star opacity caps at 0.40 so the field reads as "deep night" without visual motion. Starfield never vanishes.
- **Color tuning** stars remain neutral white/pale blue. Do NOT tint stars with phase colors.
- **Perf** ceiling target 120 active draws per frame, 60 fps on mid-tier hardware. No canvas-wide blur filters.

**Forbidden:**

- No replacing stars with particles, dots, grid, or any other motif.
- No glass or backdrop-filter on the starfield canvas parent.
- No disabling the starfield in light mode (light theme should dim it to 15 percent opacity but keep the motif).

## 6. Known risks

R-01. **backdrop-filter perf on 6000x6000 SVG canvas.** CRITIC gap. Translucent panels overlay the SVG, SVG animates connections + 20+ node pulses. Frame budget un-measured. Mitigation: `contain: paint`, `will-change: backdrop-filter`, cap blur at 14 px on ambient chrome, AND `html[data-glass="solid"]` kill-switch attribute (DD25) that swaps all glass to solid fallback tints at runtime. QA phase must benchmark in Chrome + Safari + Firefox.
R-02. **APCA not measured on final palette.** CRITIC gap. Lc targets in R8 are ballpark. Need audit of `--t1/t2/t3` on `--s-1/s-2/s-3` with a real APCA tool. Flag for QA. May need to lighten `--t2` a hair if Lc < 75 on `--s-2`.
R-03. **Firefox backdrop-filter edge cases.** Firefox supports backdrop-filter but has historic regression bugs with nested blur + transform (Mozilla #1718471). Fallback to solid `rgba(18,20,28,0.95)` documented in DD20, but needs visual QA.
R-04. **Light theme contrast on glass.** Thin glass over bright content in light mode can drop border hairline visibility. Light theme may need `rgba(11,13,18,0.10)` border bump to 0.14 as default.
R-05. **Starfield plus glass plus 20 node pulses simultaneously.** Animation frame budget untested. May require dropping ambient node pulses during simulation.
R-06. **Debate violet `#A78BFA` vs Sonnet `#8B5CF6` distinguishability.** Two violets within 15 degrees of each other on dark glass. HITL Gate 1 must visually confirm or shift debate to blue-violet `#93C5FD` cyan-violet or accept. 
R-07. **localStorage theme migration from v32.7.** v32.7 saved `data-theme` value. v32.8 changes underlying variables but keeps theme key. Users with saved theme should open v32.8 and see the new palette in their saved theme. No migration code needed, but flag for verification.
R-08. **Mobile / narrow viewport.** No mobile story in any research report. v32.8 is desktop-first. Minimum viewport 1280 px should be enforced, below that show a "desktop required" notice.

## 7. Open questions (HITL Gate 1)

Q-01. **Debate violet vs Sonnet violet.** `#A78BFA` (phase debate) and `#8B5CF6` (model Sonnet) are both violets. Acceptable on dark glass, or shift debate to `#93C5FD` periwinkle for cleaner separation?
Q-02. **Accent budget ceiling.** Research consensus = 5 percent of viewport saturated pixels. v32.7 Color Consistency Edition likely runs 8-10 percent. Accept 5 percent as hard target (desaturate palette icons by 40 percent) or allow 8 percent compromise?
Q-03. **Sidebar rail-collapse mode.** Add 56 px rail-collapsed state (Cmd+B) for left palette or keep always-expanded 260 px? Rail adds complexity but is industry standard (Linear/Vercel/VS Code).
Q-04. **Fonts self-hosted vs CDN.** Self-host InterVariable + Geist Mono under `/v32.8/fonts/` (breaks single-file ideal) or CDN load with system-ui fallback (single file preserved, requires network on first visit)?
Q-05. **Opus gold retune.** v32.7 uses `#F59E0B` (warm amber). DD10 draft proposed `#F5B042` (slightly cooler to harmonize with cyan research). **RESOLVED** in Phase D (R-02): preserved v32.7 exact `#F59E0B`. No HITL action needed.

## 8. Out of scope

OOS-01. No 3D refraction (SVG feDisplacementMap) on glass panels. CSS only.
OOS-02. No WebGL starfield. Canvas 2D stays.
OOS-03. No new features or functionality. v32.8 is visual-only. All v32.7 functionality (Cost Command Center, Context Budget, Custom Agent Creator, Icon Library, Mermaid export, simulation, HITL gates, Five Minds, etc.) preserved bit-for-bit.
OOS-04. No dependency additions beyond two font `<link>` tags.
OOS-05. No mobile layout. Desktop only, 1280 px minimum.
OOS-06. No replacement of v32 SVG agent icon library (28 built-in + 159 custom). Icons stay, only their color slots retune.
OOS-07. No change to i18n string keys. New CSS class names permitted, new JS data constants permitted, but I18N_EN overlay keys stay stable so translations do not break.
OOS-08. No WCAG 3 targeting. Compliance floor = WCAG 2.2 AA. APCA Lc is the design-quality target, not the compliance target.
OOS-09. No replacement of Polish-keyed function names. v32.7 ladujPreset, aktStatHTML, pokazWezel, etc. stay identical. Visual layer only.
OOS-10. No deletion of the starfield. Ever. Under any circumstance.

## 9. Five Minds Resolutions (Phase D)

Ten resolutions R-01 through R-10 emerged from the Five Minds debate. Each is tied to one or more new DDs (DD23-DD28) or a direct edit to existing DD, DESIGN_SPEC, or LAYOUT_SPEC sections.

- **R-01 Sonnet violet APCA fix** (FM3 HARD BLOCKER). Option B adopted. Added `--mc-sonnet-ink #C4B5FD` and phase ink variants `--ph-strategy-ink #8AB4F8`, `--ph-debate-ink #C4B5FD`, `--ph-qa-ink #FCA5A5`. Two-tier brand-fill vs text-ink rule. Adopted as DD23. DESIGN_SPEC Section 1.2 adds ink tokens and chip recipes split between fill-side and text-side. LAYOUT_SPEC Section 4.3 and Section 6 chip/badge specs use `-ink` for label text.
- **R-02 Preserve v32.7 Opus gold** (FM1). Reverted `--mc-opus` from the proposed `#F5B042` back to v32.7 exact `#F59E0B`. Adopted as correction to DD10. DESIGN_SPEC Section 1.1 primitive `--p-amber-500` corrected, Section 1.2 `--mc-opus` corrected, Section 2 light theme unchanged, Section 6 P3 block corrected.
- **R-03 Backdrop-filter perf kill-switch** (FM1). Added `html[data-glass="solid"]` attribute that swaps all glass tints to solid fallback at runtime. Adopted as DD25. DESIGN_SPEC Section 6 ships the CSS block. LAYOUT_SPEC Section 8 notes the Settings toggle for Phase F wiring. MANIFEST Section 6 R-01 mitigation updated.
- **R-04 Remove contain:layout from .nd** (FM1). Confirmed: DESIGN_SPEC Section 4.8 `.nd { contain: paint; }` (not `layout paint`). Breaks v32.7 simulation anchor math if layout is contained. Adopted as DD26. DESIGN_SPEC Section 4.8 edited.
- **R-05 Defer rail-collapse to v32.9** (FM1). Rail mode kept as mockup reference but behind a feature flag, not enabled by default in v32.8. Adopted as DD27. LAYOUT_SPEC Section 3.1 and 3.7 marked deferred. DD18 sidebar widths remains authoritative for the expanded 260 px state; rail is optional.
- **R-06 View Transitions API adoption** (FM2). Adopted on 4 modal opens plus Debate Arena round swap. Shared `view-transition-name: vt-cost-hud` morphs topbar cost cell to cost modal header. Adopted as DD24. DESIGN_SPEC Section 4.3 adds `view-transition-name` declarations plus `::view-transition-group` rules with reduced-motion downgrade. LAYOUT_SPEC Section 2.2 topbar cost cell and Section 6.1 modal header both carry the name; feature detection `if (document.startViewTransition)` documented.
- **R-07 WCAG 2.4.11 Focus Not Obscured** (FM4 HARD FAIL). `html { scroll-padding-block: 56px 24px; }` ships globally. Adopted as part of DD28. DESIGN_SPEC Section 3 global body typography block adds `html { scroll-padding-block: 56px 24px; }`. LAYOUT_SPEC Section 8.1 documents the fix.
- **R-08 2.5.8 Target Size 24x24 minimum** (FM4). Every interactive control minimum 24x24 CSS px, preferred 44x44 on primary actions. Audited in LAYOUT_SPEC mockups. Adopted as part of DD28. DESIGN_SPEC Section 4 button/chip recipes lift any control under 24x24. LAYOUT_SPEC Section 3.3 search clear X, Section 8.2/8.3 minimap zoom, all HUD cells, chip close buttons enumerated.
- **R-09 SZCZEGOLOWY OPIS above-the-fold** (FM4). Preset detail anatomy: SZCZEGOLOWY OPIS card becomes the first content card below the hero row, before CO TO JEST / analogy and other sections. LAYOUT_SPEC Section 4.2 reordered.
- **R-10 Roving tabindex on palette** (FM4). Left palette rows use roving tabindex pattern so arrow keys move between agents/presets and there is exactly one tab stop on the palette container instead of 150. Adopted as part of DD28. LAYOUT_SPEC Section 8.1 Tab order updated and Section 3.5 HTML skeleton notes tabindex rules.

Total new DDs: 6 (DD23-DD28). Total DDs after merge: 28. Total resolutions applied: 10.

## 10. Rejected proposals

- **FM5 Cien Devil's Advocate challenge to the starfield motif**: REJECTED. The user set "starfield stays" as a hard constraint twice on 2026-04-08 (initial directive + doprecyzowanie). The starfield is the signature motif of v32.8 and removal is out of scope under any argument. Cien's valid underlying concern (starfield plus glass plus 20 node pulses plus backdrop-filter = unmeasured frame budget) is addressed by R-03 kill-switch (`data-glass="solid"`) + MANIFEST Section 5 forbidden rules (no backdrop-filter on the canvas tree) + MANIFEST Section 6 R-01 QA benchmark requirement. Cien's contribution recorded here: the debate forced the team to converge on the Sonnet APCA fix as THE blocker, which is valuable.
- **Cooler Opus gold `#F5B042` proposal** (originally DD10 draft). REJECTED in favor of preserving v32.7 exact `#F59E0B`. Reason: FM1 Pragmatyk argument that brand continuity matters more than a 30 degree warmth shift to harmonize with cyan research. R-02 resolution.
- **FM1 argument to defer rail-collapse entirely out of v32.8**: PARTIALLY ADOPTED as deferral behind feature flag (DD27), NOT as full rejection. Mockup stays in LAYOUT_SPEC 3.7 for v32.9 continuity.
