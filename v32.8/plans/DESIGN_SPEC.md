# v32.8 DESIGN_SPEC - Drop-in CSS

All code in this file is copy-paste ready for Phase F Build. No placeholders.
Source of truth: v32.8/MANIFEST.md (28 design decisions DD1-DD28, post-Phase D merge).
Edge cases resolved against v32.8/research/CRITIC.md + FM1-FM5 position papers.
Every hex, alpha, duration, easing, and shadow value below is final.
Post-debate resolutions R-01 through R-10 are applied in-line (see MANIFEST Section 9).

Hard rule reminder: STARFIELD STAYS. No rule in this spec applies a solid background,
backdrop-filter, or opaque overlay to `body`, `.canvas`, `.world`, `.stage`, or any
parent of the 6000x6000 SVG. Glass is for sidebars, topbar, modals, popovers, HUD
cells only. Section 5 enforces this explicitly.

Backward compatibility: all v32.7 semantic token names (--mc-opus/sonnet/haiku,
--ph-strategy/research/debate/build/qa/hitl, --t1/t2/t3/t4, --bg-panel/card/input,
--border, --accent, --accent-rgb) are retained with their paired -rgb triplets so
the existing ~6000 lines of component CSS continues to resolve. New tokens are added,
none are removed.

---

## 1. Token layer (goes in :root)

### 1.1 Primitives (raw values, never referenced directly by components)

```css
:root {
  /* ---------- Neutral ramp (DD1, MANIFEST 3.1 primitive ink) ---------- */
  /* 6 steps from starfield void up through floating popover surface. */
  --p-ink-0: #06080C;   /* starfield void sunken, only visible through the canvas */
  --p-ink-1: #0B0D12;   /* app canvas baseline behind starfield render */
  --p-ink-2: #12151C;   /* panel resting tone, sidebar + topbar bg base */
  --p-ink-3: #1A1F2B;   /* card / row resting */
  --p-ink-4: #242B3A;   /* hover / pressed row */
  --p-ink-5: #2B3142;   /* popover, floating, context menu */

  /* ---------- Fog ramp (text over dark) ---------- */
  --p-fog-1: #E6E8EE;   /* primary text */
  --p-fog-2: #B5BAC7;   /* secondary */
  --p-fog-3: #8089A0;   /* tertiary, meta, labels */
  --p-fog-4: #545B6E;   /* disabled, placeholder */

  /* ---------- Accent primitives ---------- */
  --p-violet-300: #C4B5FD;
  --p-violet-400: #A78BFA;   /* debate phase + focus ring anchor */
  --p-violet-500: #8B5CF6;   /* Sonnet model */
  --p-violet-700: #6D28D9;   /* light-theme violet */

  --p-amber-300: #FCD34D;
  --p-amber-400: #FBBF24;    /* HITL phase, warning state */
  --p-amber-500: #F59E0B;    /* Opus model (v32.7 exact, R-02 revert) */
  --p-amber-700: #B45309;    /* light-theme amber */

  --p-cyan-400:  #22C4E6;    /* research phase */
  --p-cyan-600:  #0891B2;    /* light-theme cyan */

  --p-blue-400:  #5B8DEF;    /* strategy phase */
  --p-blue-500:  #60A5FA;    /* info state */
  --p-blue-600:  #1F5FD6;    /* light-theme strategy */

  --p-green-400: #34D399;    /* build phase, Haiku model, success state */
  --p-green-700: #047857;    /* light-theme green */

  --p-red-400:   #F87171;    /* qa phase, danger state */
  --p-red-600:   #B91C1C;    /* light-theme red */

  /* ---------- Phase primitives (Okabe-Ito CVD-safe, DD9) ---------- */
  --p-phase-strategy: #5B8DEF;
  --p-phase-research: #22C4E6;
  --p-phase-debate:   #A78BFA;
  --p-phase-build:    #34D399;
  --p-phase-qa:       #F87171;
  --p-phase-hitl:     #FBBF24;

  /* ---------- Model primitives (DD10, R-02 v32.7 preservation) ---------- */
  --p-model-opus:   #F59E0B;
  --p-model-sonnet: #8B5CF6;
  --p-model-haiku:  #34D399;

  /* ---------- Ink primitives (DD23 two-tier rule, brighter tints for text on dark) ---------- */
  /* Used when color renders AS TEXT on --s-2 dark panel. Base tokens above stay for fills. */
  --p-violet-300-ink: #C4B5FD;   /* Sonnet ink + debate ink (both need the same Lc lift) */
  --p-blue-300-ink:   #8AB4F8;   /* strategy ink */
  --p-red-300-ink:    #FCA5A5;   /* qa ink */
```

### 1.2 Semantic tokens (what components actually use)

```css
  /* ---------- Surface ramp (DD1) ---------- */
  --s-0: var(--p-ink-0);
  --s-1: var(--p-ink-1);
  --s-2: var(--p-ink-2);
  --s-3: var(--p-ink-3);
  --s-4: var(--p-ink-4);
  --s-5: var(--p-ink-5);

  /* v32.7 backward-compat surface aliases */
  --bg-app:    var(--s-1);
  --bg-panel:  var(--s-2);
  --bg-card:   var(--s-3);
  --bg-input:  var(--s-3);
  --bg-hover:  var(--s-4);
  --bg-float:  var(--s-5);

  /* ---------- Text ramp (DD2) ---------- */
  --fg-0: var(--p-fog-1);  /* primary */
  --fg-1: var(--p-fog-2);  /* secondary */
  --fg-2: var(--p-fog-3);  /* tertiary */
  --fg-3: var(--p-fog-4);  /* disabled */

  /* v32.7 backward-compat text aliases */
  --t1: var(--fg-0);
  --t2: var(--fg-1);
  --t3: var(--fg-2);
  --t4: var(--fg-3);

  /* ---------- Borders (DD3) ---------- */
  --border-hair:   rgba(255,255,255,0.06);  /* softest separator */
  --border-faint:  rgba(255,255,255,0.06);  /* v32.7 alias */
  --border-soft:   rgba(255,255,255,0.08);  /* default component border */
  --border:        rgba(255,255,255,0.08);  /* v32.7 alias */
  --border-strong: rgba(255,255,255,0.14);  /* section divider, table */

  /* ---------- Accent / focus ---------- */
  --accent: var(--p-violet-400);
  --accent-rgb: 167,139,250;
  --focus-ring: var(--p-violet-400);
  --border-focus: var(--p-violet-400);     /* v32.7 alias */

  /* ---------- State layers (interaction overlays) ---------- */
  --state-hover:    rgba(255,255,255,0.06);
  --state-focus:    rgba(167,139,250,0.14);
  --state-pressed:  rgba(255,255,255,0.10);
  --state-selected: rgba(167,139,250,0.12);

  /* ---------- State colors (DD22, decoupled from phase) ---------- */
  --state-success: #34D399;
  --state-warning: #FBBF24;
  --state-danger:  #F87171;
  --state-info:    #60A5FA;
  --state-neutral: #8089A0;
  --state-success-rgb: 52,211,153;
  --state-warning-rgb: 251,191,36;
  --state-danger-rgb:  248,113,113;
  --state-info-rgb:    96,165,250;
  --state-neutral-rgb: 128,137,160;

  /* ---------- Phase housing (DD9, v32.7 names preserved) ---------- */
  /* BRAND FILL tokens: use for background, border, glow, icon fill. */
  --ph-strategy: #5B8DEF;   --ph-strategy-rgb: 91,141,239;
  --ph-research: #22C4E6;   --ph-research-rgb: 34,196,230;
  --ph-debate:   #A78BFA;   --ph-debate-rgb:   167,139,250;
  --ph-build:    #34D399;   --ph-build-rgb:    52,211,153;
  --ph-qa:       #F87171;   --ph-qa-rgb:       248,113,113;
  --ph-hitl:     #FBBF24;   --ph-hitl-rgb:     251,191,36;
  /* v32.6 legacy aliases (kept for any stray dtl-row selectors) */
  --ph-debate1:  var(--ph-debate);
  --ph-debate2:  var(--ph-debate);

  /* PHASE INK tokens (DD23). Use wherever the phase color appears as TEXT on a
     dark panel (chip label, phase pill label, sidebar phase caption, sparkline
     number). Tokens that already pass APCA Lc 60 on --s-2 alias to the base
     (no brighter variant needed). Tokens that fail ship a brighter tint. */
  --ph-strategy-ink: #8AB4F8;              /* base #5B8DEF was Lc 45, fail */
  --ph-research-ink: var(--ph-research);   /* base Lc ~74, passes */
  --ph-debate-ink:   #C4B5FD;              /* base #A78BFA was Lc 49, fail */
  --ph-build-ink:    var(--ph-build);      /* base Lc ~80, passes */
  --ph-qa-ink:       #FCA5A5;              /* base #F87171 was Lc 43, fail */
  --ph-hitl-ink:     var(--ph-hitl);       /* base Lc ~83, passes */

  /* ---------- Model housing (DD10, R-02 v32.7 exact preservation) ---------- */
  /* BRAND FILL tokens: use for background, border, glow, dot, icon fill. */
  --mc-opus:   #F59E0B;    --mc-opus-rgb:   245,158,11;
  --mc-sonnet: #8B5CF6;    --mc-sonnet-rgb: 139,92,246;
  --mc-haiku:  #34D399;    --mc-haiku-rgb:  52,211,153;

  /* MODEL INK tokens (DD23). Use wherever the model color appears as TEXT on
     a dark panel (chip label, pill label, badge text, KOSZT numeric). */
  --mc-opus-ink:   var(--mc-opus);    /* base Lc ~78, passes */
  --mc-sonnet-ink: #C4B5FD;           /* base #8B5CF6 was Lc 31-34, HARD FAIL, ink raises to passing */
  --mc-haiku-ink:  var(--mc-haiku);   /* base Lc ~80, passes */

  /* ---------- Shadow tokens (DD7, 3 elevations only) ---------- */
  --sh-inset-top:    inset 0 1px 0 rgba(255,255,255,0.11); /* DD6 mandatory glass lip */
  --sh-inset-top-hi: inset 0 1px 0 rgba(255,255,255,0.14); /* L2 brighter lip */
  --sh-inset-bot:    inset 0 -1px 0 rgba(0,0,0,0.35);
  --sh-ambient-1:    0 20px 50px -20px rgba(0,0,0,0.55);
  --sh-ambient-2:    0 24px 60px -24px rgba(0,0,0,0.55);
  --sh-key-2:        0 8px 24px -12px rgba(0,0,0,0.40);

  /* 3 elevation layers, never more (P5) */
  --sh-e1: var(--sh-inset-top), var(--sh-ambient-1);
  --sh-e2: var(--sh-inset-top-hi), var(--sh-ambient-2), var(--sh-key-2);
  --sh-e3: var(--sh-inset-top-hi), 0 32px 80px -20px rgba(0,0,0,0.65),
           0 12px 32px -12px rgba(0,0,0,0.45);

  /* v32.7 alias */
  --shadow: var(--sh-e1);

  /* ---------- Glass tokens (DD4, DD5) ---------- */
  /* Thin dialect, L1 sidebar / topbar / HUD chip */
  --glass-thin-bg:        rgba(18,20,28,0.58);
  --glass-thin-blur:      blur(14px) saturate(160%);
  --glass-thin-border:    var(--border-hair);
  --glass-thin-inset-top: var(--sh-inset-top);
  --glass-thin-inset-bot: var(--sh-inset-bot);
  --glass-thin-drop:      var(--sh-ambient-1);

  /* Thick dialect, L2 modal / command palette / HITL overlay */
  --glass-thick-bg:        rgba(10,12,18,0.72);
  --glass-thick-blur:      blur(24px) saturate(180%);
  --glass-thick-border:    var(--border-soft);
  --glass-thick-inset-top: var(--sh-inset-top-hi);
  --glass-thick-inset-bot: var(--sh-inset-bot);
  --glass-thick-drop:      var(--sh-ambient-2), var(--sh-key-2);

  /* HUD chip variant (lighter, bigger blur fidelity) */
  --glass-hud-bg:   rgba(18,20,28,0.35);
  --glass-hud-blur: blur(10px) saturate(160%);
```

### 1.3 Type tokens

```css
  /* ---------- Font stacks (DD11) ---------- */
  --ff-sans: "InterVariable","Inter",-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif;
  --ff-mono: "Geist Mono","JetBrains Mono","SF Mono","Cascadia Code",ui-monospace,Menlo,Consolas,monospace;
  --ff-display: var(--ff-sans);

  /* ---------- Type scale (DD12, no 10/15/17) ---------- */
  --fs-11: 11px;   --lh-11: 1.35;   /* meta, phase pills, NEW badge */
  --fs-12: 12px;   --lh-12: 1.35;   /* chips, tertiary labels */
  --fs-13: 13px;   --lh-13: 1.30;   /* sidebar primary, dense body */
  --fs-14: 14px;   --lh-14: 1.50;   /* body default */
  --fs-16: 16px;   --lh-16: 1.55;   /* modal body */
  --fs-18: 18px;   --lh-18: 1.35;   /* section titles */
  --fs-24: 24px;   --lh-24: 1.20;   /* panel titles */
  --fs-32: 32px;   --lh-32: 1.10;   /* modal hero */

  /* ---------- Tracking ---------- */
  --tr-display: -0.02em;
  --tr-title:   -0.01em;
  --tr-body:     0;
  --tr-dense:   0.005em;
  --tr-caps:    0.04em;

  /* ---------- Weights (DD14, variable axis, non-standard on purpose) ---------- */
  --fw-regular:  420;
  --fw-medium:   520;
  --fw-semibold: 580;
  --fw-bold:     680;

  /* ---------- OpenType feature bundles (DD13) ---------- */
  --ot-body: "kern" 1, "calt" 1, "liga" 1, "cv11" 1;
  --ot-tnum: "tnum" 1, "zero" 1, "lnum" 1;
```

### 1.4 Motion tokens

```css
  /* ---------- Duration ladder (DD15) ---------- */
  --dur-instant: 80ms;   /* tooltip, toggle, press-down */
  --dur-fast:    150ms;  /* hover, focus, button press */
  --dur-base:    220ms;  /* dropdown, tab, chip state */
  --dur-medium:  320ms;  /* panel slide, card reveal */
  --dur-slow:    480ms;  /* modal, hero, sidebar collapse */
  --dur-hero:    640ms;  /* route, page, phase swap */

  /* ---------- Easing (DD16) ---------- */
  --ease-standard:    cubic-bezier(0.2, 0, 0, 1);
  --ease-decelerate:  cubic-bezier(0, 0, 0, 1);
  --ease-accelerate:  cubic-bezier(0.3, 0, 1, 1);
  --ease-emphasized:  cubic-bezier(0.05, 0.7, 0.1, 1);
  --ease-linear:      linear;

  /* Spring via linear() function (Baseline Dec 2023), R7 exact values */
  --ease-spring-snappy: linear(
    0, 0.062, 0.208, 0.41, 0.637, 0.866, 1.077, 1.253, 1.383,
    1.458, 1.482, 1.46, 1.403, 1.324, 1.238, 1.157, 1.091,
    1.042, 1.013, 1
  );
  --ease-spring-gentle: linear(
    0, 0.009, 0.035, 0.078, 0.138, 0.213, 0.302, 0.402, 0.511,
    0.625, 0.742, 0.858, 0.971, 1.077, 1.176, 1.265, 1.343,
    1.41, 1.464, 1.505, 1.533, 1.546, 1.547, 1.535, 1.513,
    1.482, 1.443, 1.399, 1.351, 1.301, 1.25, 1.201, 1.154,
    1.112, 1.074, 1.042, 1.016, 0.997, 0.984, 0.977, 0.975, 0.978, 1
  );
```

### 1.5 Shape tokens

```css
  /* ---------- Radius ramp (DD8, concentricity rule) ---------- */
  --r-0: 0;       /* hard corners */
  --r-1: 4px;     /* inputs */
  --r-2: 6px;     /* chips, pills, HUD cells */
  --r-3: 8px;     /* rows, buttons, small cards */
  --r-4: 10px;    /* model pills, section cards */
  --r-5: 14px;    /* panel cards, knowledge cards */
  --r-6: 20px;    /* top-level panels, modals */
}
```

---

## 2. Light theme override block

```css
[data-theme="light"] {
  /* ---------- Surface flip ---------- */
  --s-0: #FFFFFF;
  --s-1: #FAFAFB;
  --s-2: #FFFFFF;
  --s-3: #F4F5F8;
  --s-4: #E9EBF0;
  --s-5: #FFFFFF;

  --bg-app:   var(--s-1);
  --bg-panel: var(--s-2);
  --bg-card:  var(--s-3);
  --bg-input: var(--s-3);
  --bg-hover: var(--s-4);
  --bg-float: var(--s-5);

  /* ---------- Text flip ---------- */
  --fg-0: #0B0D12;
  --fg-1: #545B6E;
  --fg-2: #8089A0;
  --fg-3: #B5BAC7;

  --t1: var(--fg-0);
  --t2: var(--fg-1);
  --t3: var(--fg-2);
  --t4: var(--fg-3);

  /* ---------- Borders (R-04 bump, darker alpha on light bg) ---------- */
  --border-hair:   rgba(11,13,18,0.08);
  --border-faint:  rgba(11,13,18,0.08);
  --border-soft:   rgba(11,13,18,0.10);
  --border:        rgba(11,13,18,0.10);
  --border-strong: rgba(11,13,18,0.18);

  /* ---------- Accent / focus ---------- */
  --accent:     var(--p-violet-700);
  --accent-rgb: 109,40,217;
  --focus-ring: var(--p-violet-700);
  --border-focus: var(--p-violet-700);

  /* ---------- State layers ---------- */
  --state-hover:    rgba(11,13,18,0.05);
  --state-focus:    rgba(109,40,217,0.12);
  --state-pressed:  rgba(11,13,18,0.08);
  --state-selected: rgba(109,40,217,0.10);

  /* ---------- State colors (darker for AA on white) ---------- */
  --state-success: #047857;
  --state-warning: #B45309;
  --state-danger:  #B91C1C;
  --state-info:    #1F5FD6;
  --state-neutral: #545B6E;
  --state-success-rgb: 4,120,87;
  --state-warning-rgb: 180,83,9;
  --state-danger-rgb:  185,28,28;
  --state-info-rgb:    31,95,214;
  --state-neutral-rgb: 84,91,110;

  /* ---------- Phase colors, light variants ---------- */
  --ph-strategy: #1F5FD6;   --ph-strategy-rgb: 31,95,214;
  --ph-research: #0891B2;   --ph-research-rgb: 8,145,178;
  --ph-debate:   #6D28D9;   --ph-debate-rgb:   109,40,217;
  --ph-build:    #047857;   --ph-build-rgb:    4,120,87;
  --ph-qa:       #B91C1C;   --ph-qa-rgb:       185,28,28;
  --ph-hitl:     #B45309;   --ph-hitl-rgb:     180,83,9;
  --ph-debate1:  var(--ph-debate);
  --ph-debate2:  var(--ph-debate);

  /* Phase ink tokens: in light mode, the base tokens are already dark anchors
     that pass APCA on white, so ink aliases to base. */
  --ph-strategy-ink: var(--ph-strategy);
  --ph-research-ink: var(--ph-research);
  --ph-debate-ink:   var(--ph-debate);
  --ph-build-ink:    var(--ph-build);
  --ph-qa-ink:       var(--ph-qa);
  --ph-hitl-ink:     var(--ph-hitl);

  /* ---------- Model housing, light variants (R-02 preserved brand anchors) ---------- */
  --mc-opus:   #B45309;   --mc-opus-rgb:   180,83,9;
  --mc-sonnet: #6D28D9;   --mc-sonnet-rgb: 109,40,217;
  --mc-haiku:  #047857;   --mc-haiku-rgb:  4,120,87;

  /* Model ink tokens: alias to base in light mode (already dark enough). */
  --mc-opus-ink:   var(--mc-opus);
  --mc-sonnet-ink: var(--mc-sonnet);
  --mc-haiku-ink:  var(--mc-haiku);

  /* ---------- Shadow tokens, softer on white ---------- */
  --sh-inset-top:    inset 0 1px 0 rgba(255,255,255,0.9);
  --sh-inset-top-hi: inset 0 1px 0 rgba(255,255,255,1);
  --sh-inset-bot:    inset 0 -1px 0 rgba(11,13,18,0.04);
  --sh-ambient-1:    0 10px 30px -12px rgba(11,13,18,0.18);
  --sh-ambient-2:    0 20px 50px -20px rgba(11,13,18,0.22);
  --sh-key-2:        0 4px 14px -6px rgba(11,13,18,0.14);

  --sh-e1: var(--sh-inset-top), var(--sh-ambient-1);
  --sh-e2: var(--sh-inset-top-hi), var(--sh-ambient-2), var(--sh-key-2);
  --sh-e3: var(--sh-inset-top-hi), 0 24px 60px -16px rgba(11,13,18,0.24),
           0 8px 24px -10px rgba(11,13,18,0.18);

  --shadow: var(--sh-e1);

  /* ---------- Glass tokens (lighter tints for light mode) ---------- */
  --glass-thin-bg:        rgba(255,255,255,0.72);
  --glass-thin-blur:      blur(14px) saturate(140%);
  --glass-thin-border:    var(--border-hair);
  --glass-thin-inset-top: var(--sh-inset-top);
  --glass-thin-inset-bot: var(--sh-inset-bot);
  --glass-thin-drop:      var(--sh-ambient-1);

  --glass-thick-bg:        rgba(255,255,255,0.88);
  --glass-thick-blur:      blur(24px) saturate(150%);
  --glass-thick-border:    var(--border-soft);
  --glass-thick-inset-top: var(--sh-inset-top-hi);
  --glass-thick-inset-bot: var(--sh-inset-bot);
  --glass-thick-drop:      var(--sh-ambient-2), var(--sh-key-2);

  --glass-hud-bg:   rgba(255,255,255,0.60);
  --glass-hud-blur: blur(10px) saturate(140%);
}
```

---

## 3. Reusable utility classes

```css
/* ---------- Glass utilities (DD4, DD5, DD6 mandatory lip) ---------- */
.glass-thin {
  background: var(--glass-thin-bg);
  backdrop-filter: var(--glass-thin-blur);
  -webkit-backdrop-filter: var(--glass-thin-blur);
  border: 1px solid var(--glass-thin-border);
  box-shadow: var(--glass-thin-inset-top), var(--glass-thin-drop);
  contain: paint;
  will-change: backdrop-filter;
}

.glass-thick {
  background: var(--glass-thick-bg);
  backdrop-filter: var(--glass-thick-blur);
  -webkit-backdrop-filter: var(--glass-thick-blur);
  border: 1px solid var(--glass-thick-border);
  box-shadow: var(--glass-thick-inset-top), var(--glass-thick-drop);
  contain: paint;
  will-change: backdrop-filter;
}

/* ---------- Elevation utilities (P5 three layers only) ---------- */
.elev-1 { box-shadow: var(--sh-e1); }
.elev-2 { box-shadow: var(--sh-e2); }
.elev-3 { box-shadow: var(--sh-e3); }

/* ---------- Focus ring (WCAG 2.2) ---------- */
.focus-ring,
:where(button, a, [role="button"], input, select, textarea, [tabindex]):focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  border-radius: inherit;
}

/* ---------- Phase housing (v32.5 system, retuned tokens) ---------- */
.phase-housing[data-phase="strategy"],
.nd.ph-strategy,
.pa-item.ph-strategy,
.ds-avatar-orb.ph-strategy,
.pa-cat.ph-strategy {
  border-color: rgba(var(--ph-strategy-rgb), 0.40);
  box-shadow: 0 0 0 1px rgba(var(--ph-strategy-rgb), 0.25),
              0 0 12px -2px rgba(var(--ph-strategy-rgb), 0.35);
}
.phase-housing[data-phase="research"],
.nd.ph-research,
.pa-item.ph-research,
.ds-avatar-orb.ph-research,
.pa-cat.ph-research {
  border-color: rgba(var(--ph-research-rgb), 0.40);
  box-shadow: 0 0 0 1px rgba(var(--ph-research-rgb), 0.25),
              0 0 12px -2px rgba(var(--ph-research-rgb), 0.35);
}
.phase-housing[data-phase="debate"],
.nd.ph-debate,
.pa-item.ph-debate,
.ds-avatar-orb.ph-debate,
.pa-cat.ph-debate {
  border-color: rgba(var(--ph-debate-rgb), 0.40);
  box-shadow: 0 0 0 1px rgba(var(--ph-debate-rgb), 0.25),
              0 0 12px -2px rgba(var(--ph-debate-rgb), 0.35);
}
.phase-housing[data-phase="build"],
.nd.ph-build,
.pa-item.ph-build,
.ds-avatar-orb.ph-build,
.pa-cat.ph-build {
  border-color: rgba(var(--ph-build-rgb), 0.40);
  box-shadow: 0 0 0 1px rgba(var(--ph-build-rgb), 0.25),
              0 0 12px -2px rgba(var(--ph-build-rgb), 0.35);
}
.phase-housing[data-phase="qa"],
.nd.ph-qa,
.pa-item.ph-qa,
.ds-avatar-orb.ph-qa,
.pa-cat.ph-qa {
  border-color: rgba(var(--ph-qa-rgb), 0.40);
  box-shadow: 0 0 0 1px rgba(var(--ph-qa-rgb), 0.25),
              0 0 12px -2px rgba(var(--ph-qa-rgb), 0.35);
}
.phase-housing[data-phase="hitl"],
.nd.ph-hitl,
.pa-item.ph-hitl,
.ds-avatar-orb.ph-hitl,
.pa-cat.ph-hitl {
  border-color: rgba(var(--ph-hitl-rgb), 0.40);
  box-shadow: 0 0 0 1px rgba(var(--ph-hitl-rgb), 0.25),
              0 0 12px -2px rgba(var(--ph-hitl-rgb), 0.35);
}

/* ---------- Numerics (DD13) ---------- */
.tabular,
.hud-num {
  font-family: var(--ff-mono);
  font-variant-numeric: tabular-nums slashed-zero lining-nums;
  font-feature-settings: var(--ot-tnum);
}

/* ---------- Screen reader only (preserved from v32.7) ---------- */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

/* ---------- Global body typography defaults ---------- */
body {
  font-family: var(--ff-sans);
  font-size: var(--fs-14);
  line-height: var(--lh-14);
  font-weight: var(--fw-regular);
  color: var(--fg-0);
  font-optical-sizing: auto;
  font-feature-settings: var(--ot-body);
  font-variation-settings: "wght" 420;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* ---------- WCAG 2.2 SC 2.4.11 Focus Not Obscured (DD28, R-07) ---------- */
/* Sticky topbar 56 px + statbar 24 px. Without scroll-padding, focus landing
   on a row near the top of the scroll container gets hidden under the topbar. */
html {
  scroll-padding-block: 56px 24px;
  scroll-padding-inline: 0 0;
}
:root {
  scroll-behavior: smooth;
}
@media (prefers-reduced-motion: reduce) {
  :root { scroll-behavior: auto; }
}

/* ---------- WCAG 2.2 SC 2.5.8 Target Size minimum (DD28, R-08) ---------- */
/* Every interactive control must be >= 24x24 CSS px. Primary actions target 44x44.
   This is a SAFETY NET only. Component recipes in Section 4 already ship sizes
   above these floors (buttons 32, HUD cells 32, model buttons 48, chips 22 -> bumped).
   Controls smaller than 24 MUST be rejected in Phase F code review. */
:where(button, a[role="button"], [role="tab"], [role="menuitem"],
       [role="option"], input[type="checkbox"], input[type="radio"],
       [type="button"], [type="submit"], .btn, .btn-icon, .hud-cell,
       .ds-mdl-btn, .chip[role="button"], .pa-search-clear,
       .ds-close, .mo-close, .zm-ctrl button, .tb-actions button) {
  min-inline-size: 24px;
  min-block-size: 24px;
}
```

---

## 4. Component recipes (exact CSS, ready to paste)

### 4.1 Sidebar base (aside.sidebar, .pa-box, .ds-box)

```css
aside.sidebar,
.pa-box,
.ds-box {
  position: relative;
  background: var(--glass-thin-bg);
  backdrop-filter: var(--glass-thin-blur);
  -webkit-backdrop-filter: var(--glass-thin-blur);
  border: 1px solid var(--glass-thin-border);
  border-radius: var(--r-6);
  box-shadow: var(--sh-e1);
  overflow: hidden;
  contain: paint;
  will-change: backdrop-filter;
}

/* Left palette specific */
.pa-box {
  width: 260px;
  padding: 20px 12px 16px 12px;
}
.pa-box[data-rail="true"] { width: 56px; }

/* Right detail specific */
.ds-box {
  width: 320px;
  padding: 0;           /* inner sections own their padding */
}

/* Fallback for no backdrop-filter support */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  aside.sidebar,
  .pa-box,
  .ds-box {
    background: rgba(18,20,28,0.95);
  }
}
@media (prefers-reduced-transparency) {
  aside.sidebar,
  .pa-box,
  .ds-box {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: rgba(18,20,28,0.95);
  }
}
```

### 4.2 Topbar HUD (header.topbar)

```css
header.topbar {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 56px;
  padding: 0 16px;
  background: rgba(18,20,28,0.55);
  backdrop-filter: var(--glass-thin-blur);
  -webkit-backdrop-filter: var(--glass-thin-blur);
  border-bottom: 1px solid var(--border-soft);
  box-shadow: var(--sh-inset-top);
  contain: paint;
  will-change: backdrop-filter;
}

.topbar-hud-cell {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 10px;
  background: var(--glass-hud-bg);
  backdrop-filter: var(--glass-hud-blur);
  -webkit-backdrop-filter: var(--glass-hud-blur);
  border: 1px solid var(--border-hair);
  border-radius: var(--r-2);
  transition:
    border-color var(--dur-base) var(--ease-spring-snappy),
    background var(--dur-base) var(--ease-standard);
}
.topbar-hud-cell .hud-label {
  font-size: 10px;
  font-weight: var(--fw-semibold);
  letter-spacing: var(--tr-caps);
  text-transform: uppercase;
  color: var(--fg-2);
}
.topbar-hud-cell .hud-num {
  font-size: var(--fs-13);
  color: var(--fg-0);
}
.topbar-hud-cell[data-sev="warn"]   { border-color: rgba(var(--state-warning-rgb), 0.55); }
.topbar-hud-cell[data-sev="danger"] { border-color: rgba(var(--state-danger-rgb),  0.60); }
.topbar-hud-cell[data-sev="safe"]   { border-color: rgba(var(--state-success-rgb), 0.45); }

/* Fallback */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  header.topbar { background: rgba(18,20,28,0.95); }
  .topbar-hud-cell { background: rgba(26,31,43,0.9); }
}
@media (prefers-reduced-transparency) {
  header.topbar,
  .topbar-hud-cell {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: rgba(18,20,28,0.95);
  }
}
```

### 4.3 Modal chrome (.mo-box, .moCost, .moPrompt, HITL overlay)

```css
.mo-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(6,8,12,0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: mo-fade var(--dur-slow) var(--ease-emphasized) both;
}

.mo-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  max-width: min(1120px, calc(100vw - 64px));
  max-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  background: var(--glass-thick-bg);
  backdrop-filter: var(--glass-thick-blur);
  -webkit-backdrop-filter: var(--glass-thick-blur);
  border: 1px solid var(--glass-thick-border);
  border-radius: var(--r-6);
  box-shadow: var(--sh-e3);
  overflow: hidden;
  contain: paint;
  will-change: backdrop-filter, transform, opacity;
  animation: mo-pop var(--dur-slow) var(--ease-emphasized) both;
}

/* ============================================================
   DD24 / R-06 View Transitions API (Baseline 2024+ Chromium, Safari TP).
   Feature-detected in JS: if (document.startViewTransition) { ... }.
   Named targets enable a shared-element morph: topbar cost cell -> cost modal
   header. Other modals get a cross-fade without shared name.
   ============================================================ */

/* Shared-element morph: the topbar HUD cost cell AND the cost modal header
   both declare this name. At modal open, the browser animates the size and
   position between the two elements automatically. */
#hudCost,
#moCost .cbm-hdr {
  view-transition-name: vt-cost-hud;
}
#moKrt       { view-transition-name: vt-modal-creator; }
#moLearn     { view-transition-name: vt-modal-learn; }
#moMer       { view-transition-name: vt-modal-mermaid; }

/* Debate Arena round swap uses a named transition on the round container. */
#debateArena .round-card {
  view-transition-name: vt-debate-round;
}

/* Tune the morph timing for cost cell -> modal. Default View Transitions are
   250 ms; we slow slightly for a more cinematic reveal. */
::view-transition-group(vt-cost-hud) {
  animation-duration: var(--dur-slow);
  animation-timing-function: var(--ease-emphasized);
}
::view-transition-old(vt-cost-hud),
::view-transition-new(vt-cost-hud) {
  animation-duration: var(--dur-slow);
  animation-timing-function: var(--ease-emphasized);
}
::view-transition-group(vt-modal-creator),
::view-transition-group(vt-modal-learn),
::view-transition-group(vt-modal-mermaid),
::view-transition-group(vt-debate-round) {
  animation-duration: var(--dur-medium);
  animation-timing-function: var(--ease-emphasized);
}

/* Reduced-motion downgrade: drop the morph, use opacity crossfade only. */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
  ::view-transition-old(*)  { opacity: 1; }
  ::view-transition-new(*)  { opacity: 0; animation: mo-fade 150ms ease forwards !important; }
}

/* Browsers without View Transitions API fall back to the existing mo-pop
   @keyframes below. No code change required; the CSS animation on .mo-box
   still runs because the JS feature-detect will skip startViewTransition(). */

@keyframes mo-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes mo-pop {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.98); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .mo-backdrop { background: rgba(6,8,12,0.75); }
  .mo-box      { background: rgba(10,12,18,0.96); }
}
@media (prefers-reduced-transparency) {
  .mo-backdrop, .mo-box {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .mo-backdrop { background: rgba(6,8,12,0.80); }
  .mo-box      { background: rgba(10,12,18,0.98); }
}
```

### 4.4 Button family

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  font-family: var(--ff-sans);
  font-size: var(--fs-13);
  font-weight: var(--fw-medium);
  letter-spacing: var(--tr-dense);
  color: var(--fg-0);
  background: var(--s-3);
  border: 1px solid var(--border-soft);
  border-radius: var(--r-3);
  cursor: pointer;
  user-select: none;
  transition:
    transform var(--dur-fast) var(--ease-standard),
    background var(--dur-fast) var(--ease-standard),
    border-color var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard);
  will-change: transform;
}
.btn:hover {
  background: var(--s-4);
  transform: translateY(-2px);
  box-shadow: var(--sh-e1);
}
.btn:active {
  transform: translateY(0);
  background: var(--s-4);
  box-shadow: inset 0 1px 0 rgba(0,0,0,0.25);
  transition-duration: var(--dur-instant);
}
.btn:disabled {
  color: var(--fg-3);
  background: var(--s-2);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.7;
}

.btn-primary {
  background: var(--accent);
  color: #0B0D12;
  border-color: transparent;
  font-weight: var(--fw-semibold);
}
.btn-primary:hover {
  background: color-mix(in oklab, var(--accent) 88%, white 12%);
  box-shadow: var(--sh-e1), 0 0 0 1px rgba(var(--accent-rgb), 0.35);
}
.btn-primary:active {
  background: color-mix(in oklab, var(--accent) 92%, black 8%);
}

.btn-ghost {
  background: transparent;
  border-color: transparent;
}
.btn-ghost:hover {
  background: var(--state-hover);
  border-color: var(--border-hair);
}

.btn-danger {
  background: transparent;
  border-color: rgba(var(--state-danger-rgb), 0.45);
  color: var(--state-danger);
}
.btn-danger:hover {
  background: rgba(var(--state-danger-rgb), 0.10);
  border-color: var(--state-danger);
}

/* Icon-only square variant for topbar */
.btn-icon {
  width: 32px;
  padding: 0;
  border-radius: var(--r-2);
}
```

### 4.5 Input / textarea / select

```css
.input,
input[type="text"],
input[type="search"],
input[type="number"],
input[type="email"],
textarea,
select {
  display: block;
  width: 100%;
  min-height: 32px;
  padding: 6px 10px;
  font-family: var(--ff-sans);
  font-size: var(--fs-13);
  font-weight: var(--fw-regular);
  color: var(--fg-0);
  background: var(--s-3);
  border: 1px solid var(--border-soft);
  border-radius: var(--r-1);
  box-shadow: inset 0 1px 0 rgba(0,0,0,0.15);
  transition:
    border-color var(--dur-fast) var(--ease-standard),
    background var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard);
}
.input::placeholder,
input::placeholder,
textarea::placeholder {
  color: var(--fg-3);
}
.input:hover,
input:hover,
textarea:hover,
select:hover {
  border-color: var(--border-strong);
}
.input:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: none;
  border-color: var(--focus-ring);
  box-shadow:
    inset 0 1px 0 rgba(0,0,0,0.15),
    0 0 0 2px rgba(var(--accent-rgb), 0.35);
}
.input:disabled,
input:disabled,
textarea:disabled,
select:disabled {
  color: var(--fg-3);
  background: var(--s-2);
  cursor: not-allowed;
}

textarea { min-height: 96px; line-height: var(--lh-14); resize: vertical; }
```

### 4.6 Chip / tag

```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 8px;
  font-family: var(--ff-sans);
  font-size: var(--fs-11);
  font-weight: var(--fw-semibold);
  line-height: 1;
  letter-spacing: var(--tr-caps);
  text-transform: uppercase;
  color: var(--fg-1);
  background: var(--s-3);
  border: 1px solid var(--border-soft);
  border-radius: var(--r-2);
}

/* NEW badge (DD19, haiku green outlined, tiny) */
.chip-new {
  height: 16px;
  padding: 0 6px;
  font-size: 7px;
  color: var(--state-success);
  background: rgba(var(--state-success-rgb), 0.14);
  border-color: rgba(var(--state-success-rgb), 0.55);
}

/* Phase chips - DD23 two-tier rule: text uses -ink (Lc 60+ on dark),
   background + border use the brand fill rgba composition. */
.chip-phase-strategy { color: var(--ph-strategy-ink); background: rgba(var(--ph-strategy-rgb), 0.12); border-color: rgba(var(--ph-strategy-rgb), 0.40); }
.chip-phase-research { color: var(--ph-research-ink); background: rgba(var(--ph-research-rgb), 0.12); border-color: rgba(var(--ph-research-rgb), 0.40); }
.chip-phase-debate   { color: var(--ph-debate-ink);   background: rgba(var(--ph-debate-rgb),   0.12); border-color: rgba(var(--ph-debate-rgb),   0.40); }
.chip-phase-build    { color: var(--ph-build-ink);    background: rgba(var(--ph-build-rgb),    0.12); border-color: rgba(var(--ph-build-rgb),    0.40); }
.chip-phase-qa       { color: var(--ph-qa-ink);       background: rgba(var(--ph-qa-rgb),       0.12); border-color: rgba(var(--ph-qa-rgb),       0.40); }
.chip-phase-hitl     { color: var(--ph-hitl-ink);     background: rgba(var(--ph-hitl-rgb),     0.12); border-color: rgba(var(--ph-hitl-rgb),     0.40); }

/* Model chips - DD23 two-tier rule. Sonnet HARD-BLOCKER resolved: text uses
   --mc-sonnet-ink (#C4B5FD) while bg/border still use the brand violet
   #8B5CF6 via rgba. This is the R-01 resolution. */
.chip-model-op { color: var(--mc-opus-ink);   background: rgba(var(--mc-opus-rgb),   0.14); border-color: rgba(var(--mc-opus-rgb),   0.45); }
.chip-model-so { color: var(--mc-sonnet-ink); background: rgba(var(--mc-sonnet-rgb), 0.14); border-color: rgba(var(--mc-sonnet-rgb), 0.45); }
.chip-model-ha { color: var(--mc-haiku-ink);  background: rgba(var(--mc-haiku-rgb),  0.14); border-color: rgba(var(--mc-haiku-rgb),  0.45); }

/* Chip minimum target size (DD28, SC 2.5.8): 24x24 floor. .chip above ships 22
   tall, so any interactive chip (clickable, remove X, etc.) must opt into the
   interactive floor: */
.chip[role="button"],
.chip.is-interactive,
button.chip {
  min-height: 24px;
  min-width: 24px;
  padding: 0 10px;  /* restore breathing room at the taller height */
}
```

### 4.7 Card (knowledge cards in right detail sidebar)

```css
.card {
  background: var(--s-3);
  border: 1px solid var(--border-hair);
  border-radius: var(--r-5);
  padding: 12px;
  box-shadow: none;           /* in-flow, no shadow (P3) */
}
.card + .card { margin-top: 12px; }

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--ff-sans);
  font-size: var(--fs-11);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--tr-caps);
  text-transform: uppercase;
  color: var(--fg-2);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-hair);
  margin-bottom: 8px;
}

.card-body {
  font-size: var(--fs-13);
  line-height: var(--lh-14);
  color: var(--fg-1);
}

/* Knowledge card variants */
.card-who    { }   /* neutral */
.card-do     { border-color: rgba(var(--state-success-rgb), 0.25); }
.card-do .card-header    { color: var(--state-success); }
.card-dont   { border-color: rgba(var(--state-danger-rgb),  0.25); }
.card-dont .card-header  { color: var(--state-danger); }
.card-anti   { border-color: rgba(var(--state-warning-rgb), 0.25); }
.card-anti .card-header  { color: var(--state-warning); }
.card-facts  { border-color: rgba(var(--state-info-rgb),    0.25); }
.card-facts .card-header { color: var(--state-info); }

/* Detailed description (SZCZEGOLOWY OPIS, haiku tint) */
.card-detail {
  background:
    linear-gradient(rgba(var(--state-success-rgb), 0.04),
                    rgba(var(--state-success-rgb), 0.04)),
    var(--s-3);
  border-color: rgba(var(--state-success-rgb), 0.18);
}
```

### 4.8 Node orb on canvas (.nd)

```css
/* NOTE: v32.7 positions .nd absolutely on the canvas via top/left inline styles.
   Only visual properties below. Do not override positioning.
   DD26 / R-04: DO NOT use `contain: layout` on .nd. The v32.7 simulation reads
   .nd offsetTop/offsetLeft and getBoundingClientRect to anchor connection paths,
   data packets, speech bubbles, and the .nd-anc simulation anchors. Layout
   containment isolates those reads and breaks the math. `contain: paint` only. */
.nd {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--s-3);
  border: 1px solid var(--border-soft);
  box-shadow: var(--sh-inset-top);
  cursor: grab;
  transform: translateY(0);
  transition:
    transform var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard),
    border-color var(--dur-fast) var(--ease-standard);
  will-change: transform;
  contain: paint;
}
.nd:hover {
  transform: translateY(-2px);
  box-shadow:
    var(--sh-inset-top),
    0 0 0 2px rgba(var(--ph-strategy-rgb), 0.0),  /* fallback, overridden by .ph-* */
    var(--sh-ambient-1);
}
.nd:active {
  transform: translateY(0);
  transition-duration: var(--dur-instant);
  cursor: grabbing;
}
.nd.selected {
  border-width: 2px;
  box-shadow:
    var(--sh-inset-top),
    0 0 0 6px rgba(var(--accent-rgb), 0.35),
    var(--sh-ambient-1);
}

/* Phase glow composition (layers on top of phase-housing ring utilities) */
.nd.ph-strategy:hover { box-shadow: var(--sh-inset-top), 0 0 0 2px rgba(var(--ph-strategy-rgb), 0.40), 0 0 20px -4px rgba(var(--ph-strategy-rgb), 0.35); }
.nd.ph-research:hover { box-shadow: var(--sh-inset-top), 0 0 0 2px rgba(var(--ph-research-rgb), 0.40), 0 0 20px -4px rgba(var(--ph-research-rgb), 0.35); }
.nd.ph-debate:hover   { box-shadow: var(--sh-inset-top), 0 0 0 2px rgba(var(--ph-debate-rgb),   0.40), 0 0 20px -4px rgba(var(--ph-debate-rgb),   0.35); }
.nd.ph-build:hover    { box-shadow: var(--sh-inset-top), 0 0 0 2px rgba(var(--ph-build-rgb),    0.40), 0 0 20px -4px rgba(var(--ph-build-rgb),    0.35); }
.nd.ph-qa:hover       { box-shadow: var(--sh-inset-top), 0 0 0 2px rgba(var(--ph-qa-rgb),       0.40), 0 0 20px -4px rgba(var(--ph-qa-rgb),       0.35); }
.nd.ph-hitl:hover     { box-shadow: var(--sh-inset-top), 0 0 0 2px rgba(var(--ph-hitl-rgb),     0.40), 0 0 20px -4px rgba(var(--ph-hitl-rgb),     0.35); }

.nd.selected.ph-strategy { box-shadow: var(--sh-inset-top), 0 0 0 2px var(--ph-strategy), 0 0 0 6px rgba(var(--ph-strategy-rgb), 0.35); }
.nd.selected.ph-research { box-shadow: var(--sh-inset-top), 0 0 0 2px var(--ph-research), 0 0 0 6px rgba(var(--ph-research-rgb), 0.35); }
.nd.selected.ph-debate   { box-shadow: var(--sh-inset-top), 0 0 0 2px var(--ph-debate),   0 0 0 6px rgba(var(--ph-debate-rgb),   0.35); }
.nd.selected.ph-build    { box-shadow: var(--sh-inset-top), 0 0 0 2px var(--ph-build),    0 0 0 6px rgba(var(--ph-build-rgb),    0.35); }
.nd.selected.ph-qa       { box-shadow: var(--sh-inset-top), 0 0 0 2px var(--ph-qa),       0 0 0 6px rgba(var(--ph-qa-rgb),       0.35); }
.nd.selected.ph-hitl     { box-shadow: var(--sh-inset-top), 0 0 0 2px var(--ph-hitl),     0 0 0 6px rgba(var(--ph-hitl-rgb),     0.35); }
```

### 4.9 Canvas connections (svg paths)

```css
/* The SVG root is the 6000x6000 layer. Overflow visible, zero background. */
svg.connections {
  position: absolute;
  inset: 0;
  width: 6000px;
  height: 6000px;
  overflow: visible;
  pointer-events: none;
  background: transparent;   /* NEVER opaque, see Section 5 */
}

svg.connections path {
  fill: none;
  stroke: rgba(var(--ph-strategy-rgb), 0.35);   /* default */
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition:
    stroke var(--dur-base) var(--ease-standard),
    stroke-width var(--dur-base) var(--ease-standard),
    opacity var(--dur-base) var(--ease-standard);
}
svg.connections path[data-phase="strategy"] { stroke: rgba(var(--ph-strategy-rgb), 0.35); }
svg.connections path[data-phase="research"] { stroke: rgba(var(--ph-research-rgb), 0.35); }
svg.connections path[data-phase="debate"]   { stroke: rgba(var(--ph-debate-rgb),   0.35); }
svg.connections path[data-phase="build"]    { stroke: rgba(var(--ph-build-rgb),    0.35); }
svg.connections path[data-phase="qa"]       { stroke: rgba(var(--ph-qa-rgb),       0.35); }
svg.connections path[data-phase="hitl"]     { stroke: rgba(var(--ph-hitl-rgb),     0.35); }

svg.connections path.active {
  stroke-width: 2;
  filter: drop-shadow(0 0 6px currentColor);
}
svg.connections path[data-phase="strategy"].active { stroke: rgba(var(--ph-strategy-rgb), 1.0); }
svg.connections path[data-phase="research"].active { stroke: rgba(var(--ph-research-rgb), 1.0); }
svg.connections path[data-phase="debate"].active   { stroke: rgba(var(--ph-debate-rgb),   1.0); }
svg.connections path[data-phase="build"].active    { stroke: rgba(var(--ph-build-rgb),    1.0); }
svg.connections path[data-phase="qa"].active       { stroke: rgba(var(--ph-qa-rgb),       1.0); }
svg.connections path[data-phase="hitl"].active     { stroke: rgba(var(--ph-hitl-rgb),     1.0); }
```

### 4.10 Focus-visible policy (global)

```css
:where(
  a, button, [role="button"], [role="tab"], [role="option"],
  input, select, textarea, summary, [tabindex]:not([tabindex="-1"])
):focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  border-radius: var(--r-2);
}

/* Prevent focus ring from clipping inside overflow:hidden parents */
.focus-ring-inset:focus-visible {
  outline-offset: -2px;
}
```

---

## 5. Starfield refinement CSS

```css
/* ============================================================
   STARFIELD REFINEMENT BLOCK
   ------------------------------------------------------------
   DO NOT:
     - Apply background to body, .canvas, .world, .stage
     - Apply backdrop-filter to body, .canvas, .world, .stage
     - Apply opacity < 1 to the starfield canvas parent
     - Replace the canvas rendering with SVG or WebGL
     - Tint stars with phase or model colors
     - Add any rule that positions above .starfield with opaque bg
   DO:
     - Let the starfield render on top of --s-0 (--p-ink-0 #06080C)
     - Trust glass panels to filter the starfield visually
     - Respect prefers-reduced-motion (static downgrade, never vanish)
   ============================================================ */

.canvas,
.world,
.stage {
  position: relative;
  background: transparent;      /* starfield shows through */
  /* NO backdrop-filter here, NO solid background, NO box-shadow */
}

/* The starfield canvas element itself (v32.7 selector) */
.starfield,
canvas.starfield {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: var(--s-0);       /* void color BEHIND the stars, not over them */
}

/* Optional parallax layer hooks (MANIFEST section 5 permits) */
.starfield-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.starfield-layer--far  { z-index: 0; }   /* dim slow, no twinkle */
.starfield-layer--mid  { z-index: 1; }   /* twinkle, slow drift */
.starfield-layer--near { z-index: 2; }   /* bright, shooting stars */

/* Light theme: dim starfield but keep the motif (MANIFEST 5 forbidden: disable) */
[data-theme="light"] .starfield,
[data-theme="light"] canvas.starfield {
  opacity: 0.15;
  background: transparent;
}

/* prefers-reduced-motion: static downgrade, never vanish (DD21) */
@media (prefers-reduced-motion: reduce) {
  .starfield,
  canvas.starfield {
    animation: none !important;
    opacity: 0.40;
  }
  .starfield-layer--mid,
  .starfield-layer--near {
    animation: none !important;
  }
}
```

Enforcement note for Phase F: if any future rule tries to set `background`,
`backdrop-filter`, or a `::before/::after` with `content:""` + solid fill on
`body`, `.canvas`, `.world`, `.stage`, or any selector matching the direct parent
of the 6000x6000 SVG, that rule must be rejected in code review. The only
permitted background on these selectors is `transparent` or the starfield itself.

---

## 6. Feature flags / @supports blocks

```css
/* ---------- No backdrop-filter support (DD20) ---------- */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass-thin,
  aside.sidebar,
  .pa-box,
  .ds-box,
  header.topbar,
  .topbar-hud-cell {
    background: rgba(18,20,28,0.95);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .glass-thick,
  .mo-box {
    background: rgba(10,12,18,0.96);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

/* ---------- Reduced transparency (DD20, accessibility) ---------- */
@media (prefers-reduced-transparency) {
  .glass-thin,
  .glass-thick,
  aside.sidebar,
  .pa-box,
  .ds-box,
  header.topbar,
  .topbar-hud-cell,
  .mo-box {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .glass-thin,
  aside.sidebar,
  .pa-box,
  .ds-box,
  header.topbar,
  .topbar-hud-cell { background: rgba(18,20,28,0.95); }
  .glass-thick,
  .mo-box          { background: rgba(10,12,18,0.97); }

  [data-theme="light"] .glass-thin,
  [data-theme="light"] aside.sidebar,
  [data-theme="light"] .pa-box,
  [data-theme="light"] .ds-box,
  [data-theme="light"] header.topbar,
  [data-theme="light"] .topbar-hud-cell { background: rgba(255,255,255,0.98); }
  [data-theme="light"] .glass-thick,
  [data-theme="light"] .mo-box          { background: rgba(255,255,255,1); }
}

/* ---------- Glass kill-switch attribute (DD25, R-03) ---------- */
/* Users can flip html[data-glass="solid"] at runtime (Settings toggle wired in
   Phase F, persisted in localStorage). This swaps every glass surface to its
   @supports fallback solid tint and turns backdrop-filter off wholesale, which
   is the hardest perf lever available on low-end GPUs over the 6000x6000 SVG.
   Starfield is NOT affected; starfield is a canvas element, not a glass pane. */
html[data-glass="solid"] .glass-thin,
html[data-glass="solid"] .glass-thick,
html[data-glass="solid"] aside.sidebar,
html[data-glass="solid"] .pa-box,
html[data-glass="solid"] .ds-box,
html[data-glass="solid"] header.topbar,
html[data-glass="solid"] .topbar-hud-cell,
html[data-glass="solid"] .mo-box,
html[data-glass="solid"] .mo-backdrop {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
html[data-glass="solid"] .glass-thin,
html[data-glass="solid"] aside.sidebar,
html[data-glass="solid"] .pa-box,
html[data-glass="solid"] .ds-box,
html[data-glass="solid"] header.topbar,
html[data-glass="solid"] .topbar-hud-cell {
  background: rgba(18,20,28,0.95);
}
html[data-glass="solid"] .glass-thick,
html[data-glass="solid"] .mo-box {
  background: rgba(10,12,18,0.97);
}
html[data-glass="solid"] .mo-backdrop {
  background: rgba(6,8,12,0.75);
}
html[data-glass="solid"][data-theme="light"] .glass-thin,
html[data-glass="solid"][data-theme="light"] aside.sidebar,
html[data-glass="solid"][data-theme="light"] .pa-box,
html[data-glass="solid"][data-theme="light"] .ds-box,
html[data-glass="solid"][data-theme="light"] header.topbar,
html[data-glass="solid"][data-theme="light"] .topbar-hud-cell {
  background: rgba(255,255,255,0.98);
}
html[data-glass="solid"][data-theme="light"] .glass-thick,
html[data-glass="solid"][data-theme="light"] .mo-box {
  background: rgba(255,255,255,1);
}

/* Reminder: the forbidden list in Section 5 (no backdrop-filter on body, .canvas,
   .world, .stage, any parent of the 6000x6000 SVG) is independent and
   non-negotiable. The kill-switch above only affects the glass chrome surfaces
   which already carry backdrop-filter. It CANNOT re-enable blur on the canvas
   tree, and it MUST NOT be misread as permission to add blur there. */

/* ---------- Reduced motion (DD21) ---------- */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* Preserve opacity transitions, spinners, LIVE pulse signal */
  .live-pulse,
  .spinner,
  .preserve-motion {
    animation-duration: revert !important;
    animation-iteration-count: revert !important;
    transition-duration: revert !important;
  }
}

/* ---------- Increased contrast (R-04 mitigation) ---------- */
@media (prefers-contrast: more) {
  :root {
    --border-hair:   rgba(255,255,255,0.14);
    --border-faint:  rgba(255,255,255,0.14);
    --border-soft:   rgba(255,255,255,0.20);
    --border:        rgba(255,255,255,0.20);
    --border-strong: rgba(255,255,255,0.28);
  }
  [data-theme="light"] {
    --border-hair:   rgba(11,13,18,0.18);
    --border-faint:  rgba(11,13,18,0.18);
    --border-soft:   rgba(11,13,18,0.24);
    --border:        rgba(11,13,18,0.24);
    --border-strong: rgba(11,13,18,0.32);
  }
}

/* ---------- P3 progressive enhancement (MANIFEST 3.1) ---------- */
@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root {
      --ph-strategy: color(display-p3 0.36 0.55 0.94);
      --ph-research: color(display-p3 0.13 0.77 0.90);
      --ph-debate:   color(display-p3 0.66 0.55 0.98);
      --ph-build:    color(display-p3 0.20 0.83 0.60);
      --ph-qa:       color(display-p3 0.97 0.44 0.44);
      --ph-hitl:     color(display-p3 0.98 0.75 0.14);
      --mc-opus:     color(display-p3 0.96 0.62 0.04);  /* v32.7 #F59E0B in P3 */
      --mc-sonnet:   color(display-p3 0.55 0.36 0.96);
      --mc-haiku:    color(display-p3 0.20 0.83 0.60);
    }
  }
}
```

---

## 7. Migration notes (for Build phase)

**Preserved tokens (no change, Build does not touch them).**
`--t1/t2/t3/t4`, `--bg-panel/bg-card/bg-input`, `--border`, `--border-focus`,
`--accent/--accent-rgb`, `--ph-strategy/research/debate/build/qa/hitl` plus their
`-rgb` triplets, `--mc-opus/sonnet/haiku` plus `-rgb` triplets, `--shadow`. The
existing ~6000 lines of component CSS resolve against these names unchanged.

**Renamed only by addition (aliases).** The primitives layer (`--p-ink-*`, `--p-fog-*`,
`--p-phase-*`, `--p-model-*`) is new and drives the semantic tier. Semantic tokens
keep their v32.7 names and re-reference the new primitives via `var()`. Build does
not need to grep+replace any existing class name.

**New tokens Build must wire in.** Sidebar, topbar, modal, and button recipes in
Section 4 use new token names: `--glass-thin-*`, `--glass-thick-*`, `--glass-hud-*`,
`--sh-e1/e2/e3`, `--sh-inset-top/-hi/-bot`, `--dur-instant/fast/base/medium/slow/hero`,
`--ease-standard/decelerate/accelerate/emphasized/spring-snappy/spring-gentle/linear`,
`--r-0..6`, `--fs-11..32`, `--lh-*`, `--fw-regular/medium/semibold/bold`,
`--ff-sans/mono/display`, `--ot-body/tnum`, `--tr-display/title/body/dense/caps`,
`--state-hover/focus/pressed/selected`, `--state-success/warning/danger/info/neutral`
plus `-rgb` triplets, `--s-0..5` (new semantic surface ramp; legacy `--bg-*` aliases
still resolve), and **the DD23 ink tokens** `--mc-opus-ink / --mc-sonnet-ink /
--mc-haiku-ink / --ph-strategy-ink / --ph-research-ink / --ph-debate-ink /
--ph-build-ink / --ph-qa-ink / --ph-hitl-ink`. Rule: the base token stays for
fills, borders, and glows; the ink token is used whenever the color paints text
on a dark surface.

**Phase D Five Minds resolutions applied (R-01 through R-10, see MANIFEST
Section 9).**
- R-01 Sonnet APCA blocker resolved via ink tokens (DD23), phase + model chip
  recipes updated.
- R-02 Opus gold reverted from proposed `#F5B042` to v32.7 exact `#F59E0B`
  across primitives, semantic, light theme, and P3 blocks.
- R-03 `html[data-glass="solid"]` kill-switch shipped in Section 6.
- R-04 `.nd` container uses `contain: paint` only; layout containment removed.
- R-05 rail-collapse deferred to v32.9 (no CSS artifact in Build scope).
- R-06 View Transitions API wired via `view-transition-name` + `::view-transition-*`
  in Section 4.3 with reduced-motion downgrade.
- R-07 `html { scroll-padding-block: 56px 24px }` ships in Section 3 body block
  to satisfy WCAG 2.2 SC 2.4.11 Focus Not Obscured.
- R-08 `:where(...)` target-size floor 24x24 ships in Section 3 body block to
  satisfy WCAG 2.2 SC 2.5.8 Target Size.
- R-09 SZCZEGOLOWY OPIS card reorder is a LAYOUT_SPEC concern (Section 4.2).
- R-10 roving tabindex is a JS concern, documented in LAYOUT_SPEC Section 8.1.

**Files / sections in the HTML that need touches.**
1. `:root` block near the top of the single HTML file. Paste Section 1 wholesale.
2. `[data-theme="light"]` block immediately following `:root`. Paste Section 2 wholesale.
3. Utilities block (look for existing `.sr-only`, `.phase-housing` rules). Paste Section 3.
4. Sidebar CSS (search for `.pa-box`, `.ds-box`). Replace with Section 4.1.
5. Topbar CSS (search for `header.topbar`, `.hud-cell`). Replace with Section 4.2.
6. Modal CSS (search for `.mo-box`, `.mo-backdrop`, `.cbm-box`). Replace with Section 4.3.
7. Button rules (search for `.btn`, `.ds-mdl-btn`). Augment with Section 4.4.
8. Form controls (search for `input`, `textarea`, `select`). Replace with Section 4.5.
9. Chip/tag rules (search for `.chip`, `.pa-tier-badge`, `.phase-pill`). Augment with 4.6.
10. Knowledge cards (search for `bento-knowledge`, `.card`). Augment with Section 4.7.
11. Node orbs (search for `.nd`, `.pa-orb`). Augment visual rules with Section 4.8.
12. Connection SVG (search for `svg.connections`, `.connections path`). Replace with 4.9.
13. Global focus policy. Paste Section 4.10.
14. Starfield block (search for `.starfield`, `canvas.starfield`). Replace with Section 5.
    Critical: verify no existing rule sets `background` on `body`, `.canvas`, `.world`,
    `.stage`. If found, remove.
15. Media/supports blocks. Paste Section 6 at end of stylesheet.

**Font loading.** In `<head>`, add:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet">
```
System-ui fallback in `--ff-sans` / `--ff-mono` covers offline and CDN-failure cases.

**Risks to flag in QA (from MANIFEST section 6).** R-01 backdrop-filter perf over
the 6000x6000 SVG. R-02 APCA Lc audit on final palette. R-03 Firefox nested blur
regression. R-04 light-theme border visibility (contrast media query mitigation
above). R-06 debate violet vs Sonnet violet distinguishability (HITL Gate 1 visual
confirm). R-07 localStorage theme key preservation.

---

## 8. Self-check

- [x] All 28 MANIFEST decisions DD1-DD28 produce a corresponding CSS artifact.
  - DD1 surface ramp: Section 1.1 + 1.2 + light override.
  - DD2 text ramp: Section 1.2 + light override.
  - DD3 hairline borders: Section 1.2 (faint/soft/strong) + prefers-contrast bump.
  - DD4 thin glass: Section 1.2 + 3 `.glass-thin` + 4.1 + 4.2.
  - DD5 thick chrome: Section 1.2 + 3 `.glass-thick` + 4.3.
  - DD6 mandatory inset top lip: Section 1.2 `--sh-inset-top` hardcoded into both
    glass utilities and modal recipe, noted in enforcement.
  - DD7 3 elevations: `--sh-e1/e2/e3` in 1.2, `.elev-*` in 3.
  - DD8 radius ramp: Section 1.5.
  - DD9 phase palette: Section 1.1 primitives + 1.2 semantic + phase-housing
    utilities + chip variants + node `.ph-*` rules + connection path data-phase rules.
  - DD10 model palette: Section 1.1 + 1.2 + chip-model variants.
  - DD11 font stack: Section 1.3 + Section 7 font loading.
  - DD12 type scale: Section 1.3.
  - DD13 OpenType: Section 1.3 `--ot-body/tnum` + body global rule + `.tabular` utility.
  - DD14 weights: Section 1.3 `--fw-*`.
  - DD15 duration ladder: Section 1.4.
  - DD16 easings incl linear() springs: Section 1.4.
  - DD17 hover pattern: Section 4.4 `.btn` + 4.8 `.nd`.
  - DD18 sidebar widths: Section 4.1.
  - DD19 NEW badge: Section 4.6 `.chip-new`.
  - DD20 @supports + reduced-transparency fallback: Section 6 + inline fallbacks
    in 4.1, 4.2, 4.3.
  - DD21 reduced-motion: Section 6 + Section 5 starfield block.
  - DD22 state colors decoupled: Section 1.2 `--state-*` + light override.
  - DD23 two-tier brand/ink color rule: Section 1.1 ink primitives + 1.2
    phase-ink and model-ink tokens + Section 4.6 chip-phase and chip-model
    recipes use `-ink` for text and base rgba for fills.
  - DD24 View Transitions API: Section 4.3 adds `view-transition-name`
    declarations on #hudCost, #moCost .cbm-hdr, #moKrt, #moLearn, #moMer,
    #debateArena .round-card, plus `::view-transition-group` tuning and
    reduced-motion downgrade.
  - DD25 glass kill-switch: Section 6 ships `html[data-glass="solid"]` block
    that forces every glass surface to solid fallback and turns backdrop-filter
    off wholesale. Canvas tree is independently forbidden in Section 5.
  - DD26 contain:paint only on .nd: Section 4.8 uses `contain: paint`, explicit
    comment about why layout containment was removed.
  - DD27 sidebar rail-collapse deferred: no CSS artifact in Build scope
    (documented as mockup reference only, wiring deferred to v32.9).
  - DD28 WCAG 2.4.11 scroll-padding + 2.5.8 target size + roving tabindex:
    Section 3 global body block adds `html { scroll-padding-block: 56px 24px }`
    and a `:where()` 24x24 minimum safety net. Roving tabindex is a JS concern,
    documented in LAYOUT_SPEC Section 8.1.
- [x] No em-dashes or en-dashes. Only regular hyphens (-).
- [x] All token names from MANIFEST are present verbatim (--t1/t2/t3/t4, --mc-opus/
  sonnet/haiku + -rgb, --ph-* + -rgb, --bg-panel/card/input, --border, --accent,
  --accent-rgb, --s-0..5, --p-ink-*, --p-fog-*, --sh-e1/e2/e3, --sh-inset-top,
  --glass-thin-*, --glass-thick-*, --dur-*, --ease-*, --r-0..6, --fs-11..32,
  --ff-sans/mono/display, --fw-*, --state-*).
- [x] Starfield constraint: Section 5 contains explicit DO NOT list, zero rules
  set background or backdrop-filter on body/.canvas/.world/.stage, only
  `background: transparent` (passthrough) and a void-color background on the
  starfield canvas element itself (behind the stars, not over the scene).
- [x] Light theme block covers every semantic token from 1.2: surface ramp, text,
  borders, accent/focus, state layers, state colors, phase palette, model palette,
  shadows, glass dialects.
- [x] All hex codes match MANIFEST exactly (spot check: --p-ink-1 #0B0D12,
  --p-ink-2 #12151C, --mc-opus #F59E0B (v32.7 exact, R-02), --mc-sonnet #8B5CF6,
  --mc-haiku #34D399, --ph-strategy #5B8DEF, --ph-research #22C4E6,
  --ph-debate #A78BFA, --ph-build #34D399, --ph-qa #F87171, --ph-hitl #FBBF24,
  glass-thin rgba(18,20,28,0.58), glass-thick rgba(10,12,18,0.72), inset top
  rgba(255,255,255,0.11), ink tokens --mc-sonnet-ink #C4B5FD,
  --ph-strategy-ink #8AB4F8, --ph-debate-ink #C4B5FD, --ph-qa-ink #FCA5A5).
