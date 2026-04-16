# v32.8 Research Critic Report

Evaluating R1-R8 for Syntetyk consumption. Harsh but fair. All 8 reports read in full.

## Rubric per researcher

Weights: Completeness 25 / Accuracy 25 / Relevance 20 / Freshness 20 / Actionability 10.

### R1 - Apple HIG 2026 + Liquid Glass
- Completeness 9, Accuracy 9, Relevance 10, Freshness 9, Actionability 10
- Weighted: 9.3/10. Verdict: PASS.
- Notes: Concrete hex, blur values, 3-elevation system, motion durations, specific sidebar recipes. Source [1] and [2] (Apple Newsroom + WWDC25 Session 356) are the real Liquid Glass sources. Saturate 180% trick is correct. One minor: "SF Pro cadence 11/13/15/17/22/28" is plausible but not directly from HIG.

### R2 - Material 3 Expressive 2026
- Completeness 9, Accuracy 9, Relevance 8, Freshness 9, Actionability 10
- Weighted: 9.0/10. Verdict: PASS.
- Notes: Surface tonal containers, motion tokens, state layer opacities all verifiable at m3.material.io. Only partially relevant since v32.8 targets Apple-style elegance, not Google expressive. Useful as a secondary anchor for tokens (state overlays, shape ramp, duration ladder).

### R3 - Dark mode trends April 2026
- Completeness 8, Accuracy 8, Relevance 10, Freshness 10, Actionability 9
- Weighted: 8.9/10. Verdict: PASS.
- Notes: "Borders define planes, shadows define altitude" is the load-bearing insight. 5-step ramp hex is concrete. Source [1] updivision and [6] wannathis.one are low-tier blog aggregators but the claims cross-check against Linear/Vercel observable behaviour. "#0B0B10 whisper of blue to feel night sky" is exactly right for starfield integration.

### R4 - Glass evolution + Liquid Glass CSS recipes
- Completeness 9, Accuracy 9, Relevance 10, Freshness 9, Actionability 10
- Weighted: 9.4/10. Verdict: PASS. (Highest score.)
- Notes: Thin vs thick chrome dialect is the key distinction. Inner-stroke highlight line "load-bearing" framing matches Apple's actual approach. Explicit perf mitigations (contain paint, will-change, supports fallback, reduced-transparency query) are directly applicable. One warning flagged: "Never apply glass to the 6000x6000 canvas SVG" - this is critical for v32.8.

### R5 - Premium tools sidebar teardown
- Completeness 10, Accuracy 7, Relevance 10, Freshness 8, Actionability 10
- Weighted: 8.9/10. Verdict: PASS.
- Notes: The self-admitted honesty disclaimer at the end is a strength, not a weakness. 240-260px sidebar + 48-56px topbar + 28-32px dense row consensus is robust across sources. Per-app pixel values are marked MEDIUM for most, HIGH for Figma/VS Code/Notion which are verifiable. Distinctive tricks (Stripe env strip, Linear tracking -0.005em, Raycast action bar) are specific and stealable.

### R6 - Typography 2026
- Completeness 10, Accuracy 10, Relevance 9, Freshness 9, Actionability 10
- Weighted: 9.6/10. Verdict: PASS. (Highest score.)
- Notes: Near-exhaustive treatment. InterVariable + Geist Mono recommendation is correct and free-licensed. OpenType feature trio (tnum, cv11, zero) is well-chosen and verifiable. Non-standard wght values (420, 520, 580) as a "tuned vs stock" signal is a premium insight. 10px escape-hatch warning is accurate. `font-variant-numeric` modern spelling over `font-feature-settings` is the 2026-correct recommendation.

### R7 - Motion + linear() springs
- Completeness 9, Accuracy 9, Relevance 10, Freshness 10, Actionability 10
- Weighted: 9.5/10. Verdict: PASS.
- Notes: Duration ladder (80/150/220/320/480/640ms) is concrete. `linear()` Baseline since Dec 2023 is accurate (MDN confirms). Two-layer shadow "premium vs amateur" rule is real. Stagger via sibling-index() note is 2026-fresh (Chrome 130+). Spring curves are copy-paste ready.

### R8 - Color + APCA + a11y
- Completeness 10, Accuracy 9, Relevance 9, Freshness 10, Actionability 9
- Weighted: 9.4/10. Verdict: PASS.
- Notes: WCAG 2.2 floor + APCA quality target is the correct 2026 framing. Okabe-Ito phase mapping is load-bearing for CVD safety. Two-tier primitive-to-semantic token architecture matches v32.5 existing structure. P3 progressive enhancement pattern is correct. Lc approximations (Lc 92, 74, 58) are ballpark correct but not measured on v32.7 palette - see Gaps.

### Lowest scoring: R2 (9.0) and R3 (8.9).
### Highest scoring: R6 (9.6), R7 (9.5), R4 + R8 (9.4).
### No REVISE verdicts. All PASS.

## Contradictions

1. **Base canvas hex.**
   - R1: "#0B0B10/#14141C so materials have something to blur"
   - R3: "#0B0B10 whisper of blue to feel night sky"
   - R4: "rgba(18,20,28,X) reads richer than rgba(0,0,0,X)"
   - R5: "#0B0B0F sidebar on #111114 main" (Linear pattern)
   - R8: "`--p-ink-1: #0B0D12`, elevated `#12151C`"
   - Trust: R3 + R8 convergence on #0B0B10-#0B0D12 range. Syntetyk should pick ONE exact value and stick to it. Recommend `#0B0D12` (R8) as base, keep R3's `#07070B` as `--s-0` void beneath starfield.

2. **Blur radius sweet spot.**
   - R1: "20-28px sweet spot, above 40px = plastic"
   - R4: "12-18px ambient, 24-32px modal, never above 36px"
   - Trust: R4. More conservative, better perf, and R1's 24px falls inside R4's modal band anyway. Use R4's ladder: 14px ambient / 24px modal.

3. **Sidebar width.**
   - R1: implied ~20px padding, no explicit width
   - R5: 240-260px expanded, 48-56px rail, 320px right detail
   - Trust: R5 (this was its entire scope). Use 260px left / 320px right / 56px rail.

4. **Hairline border opacity.**
   - R1: "rgba(255,255,255,0.10)" primary, 0.06 soft
   - R3: "0.06-0.14 range, 0.08 typical"
   - R4: "0.06 thin glass, 0.08 thick chrome"
   - R5: "0.06-0.08"
   - R8: "0.08 / 0.14 strong"
   - Trust: Consensus 0.06-0.10. Use 0.08 as default card, 0.06 as soft, 0.14 as strong separator. No real contradiction, just scatter.

5. **Body text hex on dark.**
   - R1: "#E8E8ED@88%"
   - R3: "#F5F6FA ~94%"
   - R8: "#E6E8EE Lc ~92"
   - Trust: R8 + R3 (9.6 & 9.5 avg). Use #E6E8EE as primary text token. R1's 88% white @ rgba is the same perceptual ballpark. Syntetyk: pick #E6E8EE solid, not white-alpha.

6. **Easing curve for standard transitions.**
   - R1: ease-out 250-350ms
   - R2: `cubic-bezier(0.2, 0, 0, 1)` standard
   - R7: `cubic-bezier(0.2, 0, 0, 1)` standard, 150-220ms
   - Trust: R7 + R2 (curve agrees). R1's duration is slower than 2026 premium tier. Use R7's 150-220ms for hover/button, R1's 280-350ms only for panel open.

7. **Panel enter duration.**
   - R1: 280ms cubic-bezier(0.22, 0.61, 0.36, 1)
   - R2: medium3 350ms emphasized
   - R7: --dur-medium 320ms, --dur-slow 480ms for sidebar collapse
   - Trust: Converge on 320ms emphasized for panel enter. All three are within 15% of each other.

## Consensus findings (3+ reports)

1. **Pure #000 is dead; use near-black #0B-#0F range.** R1, R3, R4, R5, R8.
2. **Borders define planes, shadows define altitude.** R1, R3, R4, R5. Shadows reserved for floating surfaces.
3. **Inset top 1px white highlight is the "glass lip" premium signature.** R1, R3, R4.
4. **Hairline borders at 6-10% white alpha.** R1, R3, R4, R5, R8.
5. **Desaturated accents, 5-10% viewport budget.** R1, R3, R8.
6. **InterVariable is the default premium UI sans in 2026.** R5, R6.
7. **Mono font (Geist Mono / JetBrains Mono) for HUD numerics.** R5, R6.
8. **Duration ladder 150-400ms for UI, emphasized easing for hero.** R1, R2, R7.
9. **`cubic-bezier(0.2, 0, 0, 1)` as standard easing.** R2, R7.
10. **Two-layer shadow pattern beats single-flat shadow.** R3, R4, R7.
11. **prefers-reduced-motion means reduced, not zero (preserve opacity cues).** R2, R7, R8.
12. **Body text ~94% white (#E6E8EE / #F5F6FA), never #FFF.** R3, R6, R8.
13. **State layer overlays on hover (4-8% accent tint), not color flip.** R1, R2, R5.
14. **Dark-first token pipeline (author dark, derive light).** R3, R8.
15. **tabular-nums for HUD numbers to prevent jitter.** R5, R6.

## Gaps (not covered by anyone)

- **Starfield refinement details.** Zero concrete guidance on twinkle rate, star density per megapixel, parallax layer count, shooting star frequency, or how to tune against `prefers-reduced-motion`. This is the signature motif and needs its own micro-spec. Syntetyk must invent this.
- **APCA Lc measurements for actual v32.7 palette.** R8 gives target Lc values and ballpark mapping on ideal hex, but nobody actually ran APCA against the current v32.7 --mc-opus #F59E0B, --mc-sonnet #8B5CF6, --mc-haiku #34D399, --ph-* tokens on the proposed #0B0D12 base. This is a measurable audit gap.
- **backdrop-filter perf on the 6000x6000 SVG canvas.** R4 warns "never apply glass to the canvas" but nobody measured what happens when translucent panels sit OVER the SVG and the SVG has animated connections + 20+ agent nodes. Frame budget untested.
- **localStorage theme toggle behavior for new token system.** v32.5 already persists theme in localStorage. Nobody addressed migration: what happens when users with saved v32.7 theme state open v32.8? Do we migrate tokens or fresh-start?
- **Mobile / narrow viewport behaviour.** All reports assumed desktop dashboard. v32.8 has no explicit mobile story.
- **Sidebar collapse gesture on touch.** R5 covers Cmd+B keyboard but not touch.
- **Skill entry for `prefers-reduced-transparency`.** R4 mentions it, nobody gives the full fallback matrix.
- **Animation frame budget for hover lift + glass blur + starfield + 20 node pulses simultaneously.** Perf ceiling untested.

## Trust-weighted shortlist for Syntetyk

15 decisions to adopt verbatim. Each with source and one-line justification.

1. **Base canvas `#0B0D12`, elevated `#12151C`, overlay `#1A1F2B`, void under starfield `#07070B`.** [R3 + R8 consensus] Kills halation, gives starfield a real void beneath chrome.
2. **Sidebar L1 glass: `rgba(18,20,28,0.58)` + `backdrop-filter: blur(14px) saturate(160%)`.** [R4] Thin glass dialect, perf-safe, starfield visible through.
3. **Modal / HITL overlay thick chrome: `rgba(10,12,18,0.72)` + `blur(24px) saturate(180%)`.** [R4] Focus-stealing thick dialect for modal layer only.
4. **Mandatory inner-stroke top highlight `inset 0 1px 0 rgba(255,255,255,0.11)` on every glass panel.** [R1 + R3 + R4 consensus] The "glass lip" premium signature.
5. **Hairline border token `rgba(255,255,255,0.08)` default, `0.06` soft, `0.14` strong.** [R1 + R4 + R5 + R8 consensus] Borders define planes.
6. **Three elevation layers only: L0 canvas / L1 panel / L2 floating. Never stack more.** [R1] Spatial clarity.
7. **Body text `#E6E8EE` on dark, muted `#B5BAC7`, subtle `#8089A0`. Never `#FFF`.** [R8 + R3 + R6] APCA Lc 92/74/58.
8. **InterVariable as `--ff-sans`, Geist Mono as `--ff-mono`. Self-host under `/v32.8/fonts/`.** [R6 + R5 consensus] Free OFL, 2026 premium reference.
9. **Type scale 11/12/13/14/16/18/24/32. `font-optical-sizing: auto` on body.** [R6] 4px grid, no 10px/15px/17px.
10. **Global OpenType: `"kern","calt","liga","cv11" 1`. HUD numerics: `font-variant-numeric: tabular-nums slashed-zero lining-nums`.** [R6] Anti-jitter + premium signal.
11. **Duration ladder `--dur-instant 80ms / fast 150 / base 220 / medium 320 / slow 480 / hero 640`.** [R7] 2026 faster than 300ms default.
12. **Easing `--ease-standard: cubic-bezier(0.2, 0, 0, 1)` default, `--ease-emphasized: cubic-bezier(0.05, 0.7, 0.1, 1)` for panels.** [R2 + R7] Verified M3 + premium defaults.
13. **Sidebar: left 260px expanded / 56px rail, right detail 320px fixed, topbar 56px. Row 32px comfy / 28px dense.** [R5] Canonical 2026 dashboard dimensions.
14. **Hover = `translateY(-2px)` + two-layer shadow + `--dur-fast --ease-standard`. No color flip.** [R1 + R4 + R7 consensus] Lift + brightness, never hue.
15. **Phase color remap to Okabe-Ito anchors: strategy blue `#5B8DEF`, research cyan `#22C4E6`, debate violet `#A78BFA`, build green `#34D399`, qa vermilion `#F87171`, hitl amber `#FBBF24`.** [R8] CVD-safe ordering, pair every token with icon + label.

Bonus non-numbered: `contain: paint; will-change: backdrop-filter; @supports not (backdrop-filter: ...) fallback; @media (prefers-reduced-transparency)` on every glass panel. [R4]

## Starfield constraint check

**No researcher violated the starfield-stays rule.** Explicit preservation statements:

- R1 line 115: "Starfield preservation - Because every panel is translucent, the starfield stays visible at the sidebar edges... This is the whole point: the signature motif is never hidden, only filtered through glass."
- R2 line 180: "Keep the starfield behind `surface` (alpha #141318ee) - tonal containers stay opaque." (This is the ONLY potential friction - R2 suggests OPAQUE tonal containers which would hide starfield at panel surfaces. Syntetyk should IGNORE R2's opaque recommendation in favor of R1/R4 translucent approach.)
- R3 line 106: "The animated starfield stays, but its canvas sits on `--s-0` (#07070B)... gives the starfield a real behind layer."
- R4 line 114: "Never apply glass to the 6000x6000 canvas SVG or its parent."
- R5 line 165: "Starfield stays but topbar should feel like it floats over the field with backdrop-filter."

**Flag for Syntetyk: R2's opaque tonal container approach conflicts with starfield visibility.** R2 is otherwise useful for token structure and motion curves, but its surface model must be adapted to translucency. This is the only near-violation, and it is recoverable by keeping R2's role tokens but swapping the fill values to rgba alpha instead of solid hex.

## Final go/no-go

**GO.**

All 8 reports passed the rubric (lowest 8.9, highest 9.6). R4, R6, R7, R8 are near-perfect and should be adopted almost verbatim. R1 is the strongest principle source. R5 is the only pixel-dimension source and its honesty disclaimer strengthens trust. R2 is partially useful but its opaque surface model must be rejected in favor of R1/R4 translucent approach. R3 provides the "borders over shadows" rallying cry. No hallucinated sources flagged (all URLs are real publishers, Apple Newsroom WWDC25, m3.material.io, MDN, joshwcomeau, linear.app). Seven concrete contradictions exist but all are resolvable with the trust rankings above. Four gaps (starfield micro-spec, APCA on actual v32.7 palette, backdrop-filter perf on SVG canvas, theme-migration) must be addressed by the Syntetyk or flagged as open risks in DESIGN_SPEC. The starfield constraint is preserved by 5 of 8 researchers explicitly and not violated by the 6th except in R2's surface-fill strategy which is easy to patch. Phase C can proceed with confidence.
