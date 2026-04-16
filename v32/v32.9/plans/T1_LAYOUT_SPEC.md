# v32.9 Task 1 - LAYOUT_SPEC: Preset sidebar visual layout

## Current state (v32.8) - flat, low information density

```
+---------------------------------+
| PRESETY                         |
+---------------------------------+
| MICRO (2-3)                     |
|---------------------------------|
| [icon] solo              [2]    |
|        Jeden agent do zada...   |
|---------------------------------|
| [icon] quick_fix         [3]    |
|        Szybka naprawa bug...    |
|---------------------------------|
| SREDNIE (6-8)                   |
|---------------------------------|
| [icon] ab_test_lab  [NEW] [7]   |
|        Eksperymenty A/B...      |
+---------------------------------+
```

Problems visible:
- Flat rows all the same color (no phase hint)
- NEW badge uses wrong CSS class (cross-wired from .pa-tier-badge)
- Count chip `[N]` is purple blob without meaning
- No way to tell at a glance "what kind of workflow is this"
- Category header no count
- deep_five_minds has gold gradient but no other preset has any differentiation

## Target state (v32.9) - phase fingerprint + count suffix + polish

Row anatomy (48px):

```
+-----------------------------------------+
| [ICN] Preset name              [NEW]    |   line 1: icon (30px) + name (13/600) + optional NEW
|       Short description in gray...      |   line 2a: desc (11/400 t2, ellipsis)
|       [* 7] |====|==========|===|       |   line 2b: count chip + stacked phase bar
+-----------------------------------------+
  ^                                     ^
  |--- 2px left border = dominant phase color (phase housing)
```

Where `|====|==========|===|` is a 4px tall bar with flex-proportional segments:
- `|====|`       = strategy (violet)
- `|==========|` = research (cyan)
- `|===|`        = qa (red)

Each segment colored with its phase var, proportional to agent count in that phase.

## Example layouts per preset type (ASCII)

### solo (1 agent, build phase)
```
+-----------------------------------------+
| [i] solo                                |  b = build green left border
|     Jeden agent do pojedynczego zadania |
|     [* 1] |==============|              |  bar = 100% build green
+-----------------------------------------+
```

### deep_research_swarm_pro (8 research + 1 synth, research dominant)
```
+-----------------------------------------+
| [i] deep_research_swarm_pro   [NEW]     |  r = research cyan left border
|     Swarm glebokich researcherow z...   |
|     [* 9] |s|=========|===|             |  bar: strategy tiny + research huge + build small
+-----------------------------------------+
```

### five_minds_strategic (4 research + 5 debate + 1 hitl + 3 build, debate dominant)
```
+-----------------------------------------+
| [i] five_minds_strategic    [NEW]       |  d = debate violet left border
|     4 researcherow + 5 ekspertow...     |
|     [* 13] |====|======|==|===|         |  bar: research + debate (biggest) + hitl + build
+-----------------------------------------+
```

### deep_five_minds (26 agents, featured tier)
```
+=========================================+    tinted background (featured)
+ [i] deep_five_minds                    +    thin accent border around whole row
+     Najbardziej zaawansowany workflow  +
+     [* 26] |==|======|=====|====|==|   +    all 6 phases represented
+=========================================+
```

### data_analysis_pipe (3 collect + 3 EDA + 2 model + 2 report, balanced)
```
+-----------------------------------------+
| [i] data_analysis_pipe          [NEW]   |  r = research cyan (EDA+collect = most)
|     Pipeline analizy: collect, clean... |
|     [* 10] |=====|=====|===|===|        |
+-----------------------------------------+
```

## Category headers

### v32.8
```
SREDNIE (6-8)
```

### v32.9
```
SREDNIE (6-8) - 11
```
(the `11` is the pr-cat-count suffix, 9px/500 in --t4, inline after the static label)

Render: `<div class="pr-cat">SREDNIE (6-8)<span class="pr-cat-count">&middot; 11</span></div>`

## Density comparison

| element               | v32.8  | v32.9  |
|-----------------------|--------|--------|
| Row min-height        | 40px   | 48px   |
| Padding               | 8 12   | 7 12   |
| Line 1 content        | icon name desc badge | icon name NEW  |
| Line 2 content        | -      | desc   |
| Line 3 content        | -      | chip + phase-bar |
| Phase indicator       | none   | 4px stacked bar + 2px left border |
| NEW badge             | broken .pa-tier-badge | .pr-tier-new (correct hook) |
| Category count        | none   | inline `&middot; N` |
| Featured treatment    | only deep_five_minds gold gradient | generalized tint + border for any tier='featured' |

48px is a 20% vertical increase but information density is +100% (phase composition, category count, proper featured treatment, corrected badge).

## Scroll performance

42 items x 48px = **2016px** total content height. At 260px sidebar height ~700px visible, virtual scroll not needed. Keep as plain DOM list.

`.pr-phases` segments are 6 spans max per row, total DOM = 42x(base ~8 nodes + 6 segments) = ~588 nodes. No perf concern.

## Focus-visible rings (inherited from v32.8)

`.pr-item:focus-visible` already gets the WCAG 2.2 SC 2.4.7 ring from v32.8 global focus-visible style. No new work.

## prefers-reduced-motion

Transitions only on background-color, border-color, opacity, transform. Hover transform 1px. Matches v32.8 reduced-motion policy (transforms under 4px are acceptable per DD26).

## Decision points for HITL Gate #1

The spec above locks the skeleton. HITL Gate #1 asks the user to pick between **3 variants** of **secondary decisions**:

1. **Phase bar style**: 4px slim (this spec, minimal) vs 6px medium (more prominent) vs stacked dots row (6 dots instead of bar)
2. **Featured tier aggressiveness**: subtle tint (this spec) vs bold gradient (v32.8 deep_five_minds style for all featured) vs corner ribbon
3. **Row density**: 48px 2-line (this spec) vs 56px 3-line with full desc unclamped vs 40px compact 2-line with phase bar inline right

Gate options will combine these into 3 cohesive directions rather than asking 3 separate questions.
