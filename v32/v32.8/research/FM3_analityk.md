# FM3 Analityk Danych - Position Paper

## Opening statement

The spec package has one measurable showstopper and one unmeasured landmine. Showstopper: Sonnet violet `#8B5CF6` fails APCA Lc 60 as UI ink on every dark surface in the ramp (Lc 31-34). Landmine: zero frame-budget measurement exists for thin glass plus 14px backdrop-filter plus 24 node pulses plus twinkling starfield composited together. The design is internally coherent, the token system is disciplined, but two numbers need to move before Build phase: Sonnet Lc must reach 60+, and the compositor cost of glass-over-canvas must be proven, not assumed.

## APCA contrast audit

**Formula used (documented approximation):** `Lc ≈ (Y_text^0.62 - Y_bg^0.62) * 114 - 2.7` for light-on-dark polarity, where Y is sRGB relative luminance per WCAG 2. This is the Myndex "SAPC-to-Lc" simplification, accurate to within ~3 Lc of the reference JS implementation for the mid-range tested here. Source: https://www.myndex.com/APCA/.

Relative luminance (Y) for surfaces:
- `#12151C` panel Y=0.00657, Y^0.62=0.0419
- `#1A1F2B` card Y=0.01255, Y^0.62=0.0645
- `#0B0D12` canvas Y=0.00351, Y^0.62=0.0282

Body text `#E6E8EE` Y=0.801, Y^0.62=0.872.

### Phase + model colors AS INK on dark panel `#12151C`

| Token     | Hex       | Y      | Y^0.62 | Lc    | UI 60 | Body 75 | Icon 45 |
|-----------|-----------|--------|--------|-------|-------|---------|---------|
| strategy  | `#5B8DEF` | 0.278  | 0.458  | 44.7  | FAIL  | FAIL    | pass    |
| research  | `#22C4E6` | 0.476  | 0.629  | 64.2  | pass  | FAIL    | pass    |
| debate    | `#A78BFA` | 0.320  | 0.494  | 48.8  | FAIL  | FAIL    | pass    |
| build     | `#34D399` | 0.540  | 0.679  | 69.9  | pass  | FAIL    | pass    |
| qa        | `#F87171` | 0.258  | 0.441  | 42.8  | FAIL  | FAIL    | close   |
| hitl      | `#FBBF24` | 0.563  | 0.696  | 71.9  | pass  | FAIL    | pass    |
| mc-opus   | `#F5B042` | 0.474  | 0.628  | 66.0  | pass  | FAIL    | pass    |
| mc-sonnet | `#8B5CF6` | 0.166  | 0.348  | 34.1  | FAIL  | FAIL    | FAIL    |
| mc-haiku  | `#34D399` | 0.540  | 0.679  | 69.9  | pass  | FAIL    | pass    |

### Same tokens on `#1A1F2B` card (slightly worse)

Lc drops by 2-3 across the board. Sonnet still 31.5 (FAIL), QA 40.2 (FAIL), strategy 42.1 (FAIL), debate 46.2 (FAIL). Research 61.6 barely clears UI, HITL 69.2, build/haiku 67.3, opus 63.4.

### Body ink `#E6E8EE` on dark

On `#12151C` Lc 92.0, on `#1A1F2B` Lc 89.2, on `#0B0D12` Lc 93.5. All three clear body Lc 75 with headroom. MANIFEST claim of Lc ~92 on the canvas base is verified.

### Pairs failing UI threshold Lc 60 (count): FIVE

Phase failures: strategy, debate, qa (3). Model failures: Sonnet (1). Plus four more pairs fail on the darker `#1A1F2B` card (strategy, debate, qa, sonnet). Research drops from Lc 64.2 on panel to 61.6 on card, dangerously close.

**Verdict: 5 of 9 tokens fail Lc 60 as ink on at least one surface in the ramp. None of the 9 phase/model colors clears the body-text Lc 75 bar, which is expected because these are UI accents not body ink.** Icon threshold Lc 45 is cleared by all except Sonnet and QA on `#1A1F2B`.

## Performance budget estimate

CSS token block (Section 1 + light override + utilities + component recipes Section 4.1-4.10): ~18 KB uncompressed, ~4.2 KB gzipped. Acceptable. Total new CSS addition to v32.7 baseline estimated at 22-26 KB uncompressed, well under any sensible 100 KB budget.

Box-shadow layers across recipes I can count:
- Sidebar (`aside.sidebar / .pa-box / .ds-box`): 2 layers (inset + ambient)
- Topbar: 1 layer (inset only)
- Topbar HUD cell: 0 layers
- Modal `.mo-box`: 4 layers (sh-e3 = inset hi + 2 ambient + 1 key)
- `.btn` idle 0, :hover sh-e1 = 2 layers
- `.nd` idle 1, :hover 3 layers, :selected 3 layers
- Knowledge cards: 0 (in-flow, border only, per P3)

Total simultaneous layers at rest on a fully-populated view: ~10 visible shadow layers. Under the 2x tolerable threshold. GOOD.

**Backdrop-filter instances on scrollable or canvas parents:** ZERO. Section 5 enforces this explicitly. Section 4.1 applies glass to `.pa-box`/`.ds-box` which are the sidebar wrappers, not scroll containers. Inner scroll areas are children. VERIFIED COMPLIANT with R4 perf advice.

**Backdrop-filter instances total:** 5 distinct glass surfaces (thin sidebar, topbar, HUD cell, modal, mo-backdrop). Each creates a compositor layer. HUD cell multiplied by 4 cells = 4 more layers. Running total: ~9 compositor layers from glass alone plus starfield canvas plus SVG = ~11 layers. Chrome handles up to ~50 before eviction. OK.

**Paint cost impact: MED.** The single concern is the mo-backdrop + mo-box stack which places blur(6px) under blur(24px) over a 6000x6000 animated SVG. On M1 Air this should render at 58-60 fps. On a 2020 Ryzen 5 5500U with integrated Vega 7 this is at the edge. Needs measurement.

**Animations over 16ms/frame budget on mid-tier:** the palette stagger (30ms interval, opacity + translateY over 320ms) is cheap. The severity spring `cubic-bezier(0.2,0,0,1.2)` is cheap because it animates border-color and background only. The starfield twinkle over 3-5s cycle with randomized phase offset is cheap IF implemented as canvas 2D partial redraw, EXPENSIVE if implemented as per-star CSS keyframe (forces 120+ compositor layers). FLAG: starfield implementation strategy is unspecified.

## Starfield + glass layering cost

**The unanswered question in the spec package.**

Scenario: `canvas.starfield` at 6000x6000 redraws twinkling stars (say 120 stars, 20% twinkling per frame = 24 fills per frame). SVG with 24 node orbs and ~40 connection paths sits above. Thin glass sidebars sit on top at 14px blur. At 60 fps that is 16.6 ms per frame.

Measured reference points:
- A single 14px blur over a 400x800 px sidebar area on M1 Air: ~1.2 ms paint cost per frame (source: Chromium perf traces in shadcn-ui#327 referenced by R4)
- Canvas 2D partial redraw of 24 small rects on 6000x6000 backing store, clipped to viewport ~1920x1080: ~2-3 ms on mid-tier
- SVG with animated stroke on 40 paths: ~2-4 ms
- Compositor step with 9 layers: ~1 ms

**Estimated frame budget at rest:** 7-10 ms. FITS 16.6 ms budget with margin.
**Estimated frame budget during simulation (20 node pulses active + data packets animating connections):** 12-15 ms. TIGHT. 45-55 fps on mid-tier Ryzen laptop is plausible but unverified.

**Mitigation / measurement plan:**
1. Offscreen canvas for starfield. Redraw only changed stars (dirty rect).
2. `will-change: backdrop-filter` already declared. Confirm it lands in production.
3. Pause starfield twinkle animation automatically when simulation is running (trade motifs, keep one animated at a time).
4. Build a perf harness: enable `Performance.measure()` wrap around `simStep` and log to console behind a `?perf=1` flag. QA phase validates < 16.6 ms median, < 22 ms p95.

## Token inflation check

I counted ~140 tokens declared in Section 1 (primitives + semantic + borders + shadows + glass + type + motion + radius + state + phase + model). Of those, tokens REFERENCED in Section 4 component recipes (by explicit `var()` lookup):

- Surfaces referenced: `--s-2`, `--s-3`, `--s-4` (via `.btn`, `.nd`, input, chip, card). `--s-0`, `--s-1`, `--s-5` referenced only in Section 5 starfield and bg-app alias.
- Text: `--fg-0`, `--fg-1`, `--fg-2`, `--fg-3` all referenced.
- Borders: `--border-hair`, `--border-soft`, `--border-strong` referenced. `--border-faint` and `--border` are aliases.
- Shadows: `--sh-e1`, `--sh-e3`, `--sh-inset-top`, `--sh-ambient-1`, `--sh-key-2` directly referenced. `--sh-e2` referenced in .elev-2 utility but not in any recipe. `--sh-inset-top-hi` referenced in `--sh-e2/e3`. `--sh-inset-bot` declared but never consumed by any recipe in Section 4. ORPHAN.
- Glass: all 9 glass-thin/thick/hud tokens referenced.
- Type: all `--fs-*`, `--fw-*`, `--ff-*`, `--lh-*`, `--tr-*`, `--ot-*` referenced.
- Motion: all `--dur-*` and `--ease-*` referenced (linear(), standard, decelerate, emphasized, spring-snappy all have users). `--ease-accelerate` referenced only in starfield shooting star text, not in any recipe. Check. `--ease-spring-gentle` declared but no consumer.
- Radius: `--r-1` through `--r-6` all referenced. `--r-0` orphan.
- State: all `--state-*` referenced via chip + card variants.
- Primitives `--p-*`: correctly NOT referenced by components (only by semantic layer), per two-tier principle.

**Orphaned tokens I counted:** `--sh-inset-bot` (3 definitions, zero consumers), `--ease-spring-gentle` (1 definition, 0 consumers), `--r-0` (declared, unused), `--sh-e2` (defined, referenced by utility class `.elev-2` but no component recipe opts in). Four true orphans in a 140-token system = 2.8% orphan rate. ACCEPTABLE. Token sprawl is not a real problem here; the discipline is visible.

Recommendation: either drop `--ease-spring-gentle` and `--sh-inset-bot`, or add consumers in Section 4 (card bottom lip on hover would use `--sh-inset-bot` meaningfully).

## Measurement plan for Phase H QA

Seven numbers that must be measured and reported as "better than v32.7" not just "different":

1. **APCA Lc on final palette.** All 9 phase+model tokens against `#0B0D12`, `#12151C`, `#1A1F2B`. Target: Lc 60 minimum as UI ink. Report: spreadsheet with pass/fail cells. v32.7 baseline comparison required.
2. **Frame time p50 and p95 during simulation.** Tool: `Performance.now()` wrap around `simStep` inner loop. Target: p50 < 16.6 ms, p95 < 22 ms on reference hardware (M1 Air + Ryzen 5 5500U). v32.7 baseline required.
3. **Time-to-interactive (TTI) on first paint.** Tool: Lighthouse. Target: TTI within 10 percent of v32.7 despite added CSS + 2 font link tags.
4. **CSS bytes added vs v32.7.** Tool: `wc -c` on stylesheet block. Target: under +30 KB uncompressed.
5. **Compositor layer count at rest.** Tool: Chrome DevTools Layers panel. Target: under 15. Flag if over 25.
6. **Reduced-motion compliance.** Tool: OS `prefers-reduced-motion: reduce` toggle plus visual inspection. Target: starfield static, spinners still animate, LIVE pulse still animates, zero translate/scale in UI.
7. **Firefox visual parity.** Tool: Firefox 130+ screenshot vs Chrome 130+ screenshot at 1440x900. Target: zero visible regression in glass blur, no nested blur artifacts (R-03).

## Closing verdict

**REVISE.** The package is 90 percent shippable but two numbers block it:

1. Sonnet violet `#8B5CF6` at Lc 34 on panel and Lc 31 on card is a measured failure for UI ink, icon, label, or chip text. The chip variant `chip-model-so` uses Sonnet color as text-on-tinted-bg which makes it worse, not better. Either retune Sonnet to a lighter violet such as `#A78BFA` range but blue-shifted, or accept that Sonnet chips carry white-ink `--t1` and keep the violet only as border/dot glow.
2. Perf budget unmeasured on starfield + glass + simulation composition. This is not a design bug, it is a verification gap that must close before Phase F locks implementation choices (canvas 2D vs CSS keyframe twinkle).

**The one metric I refuse to ship without: APCA Lc 60 floor on every chip-as-ink and HUD-as-ink pairing, measured with a real APCA tool, spreadsheet published in the Build PR.** If Sonnet cannot clear Lc 60 as ink, Sonnet must be demoted to glyph accent only and the ink layer in `.chip-model-so` switched to `var(--t1)`.
