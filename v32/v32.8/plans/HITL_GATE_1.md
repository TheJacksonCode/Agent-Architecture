# HITL Gate #1 - Visual Direction Decision

## Status
All planning complete. 28 design decisions locked. 140+ tokens defined. 10 component recipes written. 13 layout mockups drawn. Starfield motif preserved. APCA ink tokens added (DD23). View Transitions feature-detected (DD24). Glass kill-switch in place (DD25).

Phase F Build is blocked on ONE user decision: which visual flavor should the 5 parallel implementers favor when they hit trade-offs inside the 6110-line HTML file?

## TL;DR
**Default (if user does not respond within the gate window):** Option A.
**All 3 options are APCA-safe, WCAG 2.2 compliant, starfield-preserving, and ship-ready.** All three honor the locked spec - none of them rewrite tokens or override DD1-DD28.
**The only real difference:** how much Liquid Glass, how much motion, and how cinematic the canvas feels.

## The 3 options

### Option A - "Dignified Apple" (recommended default)
One-line vibe: A quiet premium dark UI that feels like macOS Tahoe 26 System Settings.

Key visual choices:
- Thin glass sidebars exactly per DD4 (alpha 0.58, blur 14px), thick chrome modals exactly per DD5
- Borders define planes, shadows reserved for floating L2 only (DD3 + DD7 read literally)
- Minimal motion: hover lift 2px (DD17), 150ms standard easing, no spring overshoot
- View Transitions API wired but ONLY on the 4 modal opens (DD24 minimum). NO shared morph from HUD cost cell to Cost modal
- Per-phase housing rings on nodes use cheap box-shadow spread, no filter
- All ink tokens (DD23) applied verbatim. Sonnet ink #C4B5FD only on chip text
- Starfield: v32.7 density preserved, only easing polish on existing twinkle

Who this is for: a senior engineer who wants v32.8 to feel LESS busy than v32.7, more stable, more adult, and who would rather ship an extra week early than chase a screenshot.

Risks: Innowator (FM2) would call this "spec-compliant but emotionally flat". The user may later wish for one cinematic moment.

Effort: LOWEST. Closest mapping to the recipes already in DESIGN_SPEC. Phase H QA surface is smallest.

### Option B - "Material Expressive with Edge" (balanced, my recommendation)
One-line vibe: Dark premium with restrained but expressive motion. Adopts View Transitions morphs and M3 Expressive easing where they earn their keep.

Key visual choices:
- Everything in Option A, PLUS:
- View Transitions API on 4 modal opens AND on the shared `view-transition-name: vt-cost-hud` morph from topbar HUD cost cell into Cost modal header (DD24's full intent, the Innowator ask)
- M3 emphasized easing (`--ease-emphasized cubic-bezier(0.05,0.7,0.1,1)`) on panel enters, plus a `--ease-spring-snappy` overshoot on severity-flash chips when COST goes from safe to warn
- Slight phase-color ambient glow on the ACTIVE simulation node only (filter drop-shadow blur 8px at 0.4 alpha of `--ph-X`), idle nodes keep cheap box-shadow rings
- Per-agent "thinking" shimmer during simulation uses M3 emphasized easing on a 2-stop linear gradient sweep
- HUD cells grow from 28px to 32px tall to give APCA Lc 60+ headroom on the new ink tokens
- Starfield: v32.7 density + ONE additional parallax layer behind (slower drift, larger soft stars), depth ~30% opacity

Who this is for: a user who wants v32.8 to feel noticeably 2026 and cinematic in the moments that matter (cost reveal, debate transitions), but boring everywhere else.

Risks: more moving parts = more QA surface. View Transitions adds ~40 lines CSS + ~20 lines JS feature-detection (already budgeted in DD24). The shared morph requires both source and target to exist in the DOM at the right moment - one ordering bug and the morph silently falls back. Cien (FM5) flagged this as "the place where polish dies if rushed".

Effort: MEDIUM. About 1.3x Option A.

### Option C - "Liquid Glass Hero" (boldest elegance)
One-line vibe: Apple Liquid Glass dialect pushed as far as is safe on a 6000x6000 SVG canvas app.

Key visual choices:
- Everything in Option B, PLUS:
- Modal chrome thickened: blur 28px, alpha 0.74, with the inset specular highlight from DD6 amplified to a 2-stop inner stroke (top white 0.12, bottom white 0.04)
- SVG `feDisplacementMap` refraction on ONE hero surface only: the Custom Agent Creator modal header strip. Real Liquid Glass refraction, feature-detected via `@supports (filter: url(#refract))`, falls back to flat thick glass in Firefox and on `prefers-reduced-transparency`
- Per-phase housing rings become actual ring-shaped glass haloes (radial-gradient mask + backdrop-filter blur 6px), not just borders. Active phase ring breathes 0.6 - 1.0 alpha at 4s ease-in-out
- Sonnet violet (`--mc-sonnet`) and debate violet (`--ph-debate`) both pick up a subtle CSS `linear()` spring shimmer on focus, 320ms emphasized easing
- Starfield: v32.7 density + parallax layer (Option B) + depth blur on stars within 80px of any panel edge (creates focal depth, panel feels like a lens)

Who this is for: a user who wants v32.8 to BE the wow screenshot on a tech blog. The version you show off, not the version you live in.

Risks: `feDisplacementMap` is GPU-bound, Firefox partial support, intermittent jank on integrated graphics. The depth-blur starfield needs a second pass during scroll/zoom or it ghosts. Cien would call this "accidentally flashy". Higher chance of Phase H QA finding a regression that costs a build round to fix. The glass kill-switch (DD25) becomes load-bearing instead of optional.

Effort: HIGHEST. About 1.8x Option A. Approximately 120-160 extra lines of CSS, 30-50 extra lines of JS, plus a `<filter id="refract">` SVG def block.

## Comparison table

| Dimension                  | A Dignified | B Balanced  | C Liquid Hero |
|----------------------------|-------------|-------------|---------------|
| Visible "2026" feel        | 6/10        | 9/10        | 10/10         |
| Ship-time confidence       | 10/10       | 9/10        | 7/10          |
| Perf headroom on canvas    | HIGH        | MED         | LOW-MED       |
| View Transitions API       | OPENS only  | OPENS+morph | OPENS+morph   |
| SVG refraction             | NO          | NO          | YES (1 spot)  |
| Starfield refinement depth | MINOR       | MEDIUM      | DEEP          |
| Risk of QA rework          | LOW         | MED         | HIGHER        |
| Feels different from v32.7 | +15%        | +35%        | +55%          |
| Glass kill-switch role     | nice-to-have| nice-to-have| LOAD-BEARING  |
| Innowator (FM2) happiness  | LOW         | HIGH        | HIGHEST       |
| Cien (FM5) happiness       | HIGHEST     | OK          | LOW           |
| Pragmatyk (FM1) happiness  | HIGHEST     | HIGH        | OK            |

## Rejected / out of scope (so user knows these are NOT options)
- Removing the starfield (P1 hard constraint, locked in MANIFEST Section 1)
- Any flat / gradient / glass-only canvas background (violates P1 + DD1)
- Rainbow neon, oversaturated brand surfaces (violates P6 5% accent budget)
- Rail-collapse sidebar mode (deferred to v32.9 by DD27)
- Neumorphism (R4 + all 8 researchers agreed it is dead in 2026)
- Replacing Opus gold `#F59E0B` with the cooler `#F5B042` (rejected by Pragmatyk + DD10)
- Glass on `.canvas` / `.world` / `.stage` or any parent of the 6000x6000 SVG (P4)

## Known tradeoffs to be aware of regardless of option
- Sonnet violet now ships as a TWO-TIER token: `--mc-sonnet #8B5CF6` for fills/borders/glow, `--mc-sonnet-ink #C4B5FD` whenever the violet appears AS TEXT on a dark surface (chip label, badge label, sidebar mix display). This is new versus v32.7. Build has to use the right tier in the right place. Same applies to `--ph-strategy-ink`, `--ph-debate-ink`, `--ph-qa-ink`.
- v32.7 Opus gold `#F59E0B` is preserved exactly. Pragmatyk caught a regression where an earlier draft had cooled it to `#F5B042`. Do not let that creep back in.
- Glass kill-switch `html[data-glass="solid"]` is always present and Settings-toggleable. In Option A and B it is a low-power affordance. In Option C it becomes the actual escape hatch when the refraction filter or depth-blur starfield trips on a slow GPU.
- Debate violet `#A78BFA` and Sonnet violet `#8B5CF6` are perceptually distinct on fills, but their INK tints both happen to land near `#C4B5FD`. Distinguishability lives on the fill layer, never on text. HITL Gate 1 should eyeball this on a real screen before locking. See Q1 below.
- `contain: paint` only on `.nd` (DD26). Do NOT let any implementer add `contain: layout` back in - it breaks the canvas anchor math for connections, data packets, and speech bubbles.

## What Phase F Build needs from you
Just ONE letter: A, B, or C.

If no response in the HITL gate window, the protocol default is **A**.

You can also answer the optional questions below to tighten Build's edge-case behavior. None are required.

## Open questions you may answer alongside your pick (optional)

**Q1 - Tune debate violet and Sonnet violet further apart?**
Current: debate `#A78BFA`, Sonnet `#8B5CF6`. Already perceivable per FM3 Analityk Danych math, but on a glass surface at 13px chip text the difference can collapse. We can push debate to `#B79DF7` (more pinkish) or Sonnet to `#7C4FE6` (more blue). My recommendation: leave them, ship, and re-check in Phase H QA on real hardware. Answer "shift debate", "shift sonnet", or leave blank to keep current.

**Q2 - Phase housing ring glow technique?**
Cheap: `box-shadow: 0 0 0 1px var(--ph-X), 0 0 12px -2px rgba(var(--ph-X-rgb), 0.35)`. Pretty: `filter: drop-shadow(0 0 8px rgba(var(--ph-X-rgb), 0.5))` which renders nicely around non-circular elements but costs more GPU. Default for A = box-shadow. Default for B = box-shadow. Default for C = drop-shadow. Override here if you want.

**Q3 - View Transitions on modal CLOSE as well, or only on OPEN?**
Close transitions can look messy if the user clicks Esc twice or closes very fast. Default for A = N/A (no morphs). Default for B = OPEN only. Default for C = OPEN + CLOSE. Answer "open only" or "both" to override.

**Q4 - Starfield parallax layer (Option B and C only): how slow?**
Default drift speed for the new background layer is 0.4x of the existing foreground layer. 0.2x feels more cinematic but is harder to notice. Answer with a multiplier or leave blank for 0.4x.

---

Awaiting your pick.
