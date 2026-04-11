# FM1 Pragmatyk - Position Paper

## Opening statement

The spec is beautiful but front-loads the single biggest implementation risk: translucent thin-glass chrome sitting over a 6000x6000 animated SVG with 20+ node pulses, shooting stars, and connection particles, on hardware we have not measured. MANIFEST R-01 and R-05 flag this and then move on. We should ship v32.8 with a one-line perf kill-switch (`data-glass="solid"` on `<html>`) that collapses every `.glass-thin/.glass-thick` rule to its documented solid fallback, wired to a single topbar toggle. Everything else in the spec is good; this one guardrail converts a demo-quality risk into a production-safe feature.

## Concerns

1. **backdrop-filter over live SVG is unmeasured.**
   Evidence: MANIFEST R-01 "Frame budget un-measured" (Section 6) and CRITIC gap "backdrop-filter perf on 6000x6000 SVG canvas" (CRITIC Gaps block). DESIGN_SPEC 4.1 applies `blur(14px) saturate(160%) + will-change` to every sidebar. `will-change: backdrop-filter` promotes a layer per panel; four glass panels (left, right, topbar, HUD cells) x animated canvas = potential layer-count blowup.
   Severity: HIGH.
   Mitigation: add a `data-glass="solid"` kill-switch on `<html>`. One CSS block `[data-glass="solid"] .glass-thin, ... { backdrop-filter: none; background: rgba(18,20,28,0.95); }`. Wire to topbar toggle and auto-enable on first paint budget breach (single `requestIdleCallback` probe measuring frame time at boot).

2. **Nested HUD cells each with their own blur = 4 extra compositor layers.**
   Evidence: DESIGN_SPEC 4.2 `.topbar-hud-cell { background: var(--glass-hud-bg); backdrop-filter: var(--glass-hud-blur); will-change: backdrop-filter; }`. LAYOUT_SPEC 2.2 shows 4 HUD cells. Blur-over-blur (cell-on-topbar-on-starfield) is exactly the Safari/Firefox slow path.
   Severity: MED.
   Mitigation: HUD cells should drop to `background-color` only (no `backdrop-filter`). The parent `.topbar` already carries the thin glass. Remove the inner blur layer entirely.

3. **Google Fonts CDN breaks offline-first and "single HTML file" rule.**
   Evidence: DESIGN_SPEC Section 7 adds `<link>` to fonts.googleapis.com. MANIFEST OOS-04 says "No dependency additions beyond two font `<link>` tags", which technically permits this, but MANIFEST Q-04 explicitly flags the tradeoff as unresolved.
   Severity: MED.
   Mitigation: keep `<link>` tags but ensure `font-display: swap` and that the system-ui fallback in `--ff-sans` renders identically at `--fw-medium 520`. Ship without self-hosting; accept first-paint FOUT. Do NOT treat CDN failure as a blocker.

4. **Variable font weights 420/520/580/680 silently fall back to 400/500/600/700 when Inter Variable fails.**
   Evidence: DESIGN_SPEC 1.3 `--fw-regular 420`. These values require the VARIABLE axis. If the CDN gives us a static Inter (or the user is offline), non-standard weights snap to nearest standard weight with zero warning. Tracking `+0.005em` on top of snapped weight = visual drift.
   Severity: LOW.
   Mitigation: add `@supports (font-variation-settings: 'wght' 420)` fallback mapping 420->400, 520->500, 580->600, 680->700, or simply commit to standard weights.

5. **P3 progressive enhancement block silently shifts hex under CVD users on Retina Macs.**
   Evidence: DESIGN_SPEC Section 6 wraps phase + model tokens in `@media (color-gamut: p3)`. A debate/Sonnet pair at `display-p3 0.66 0.55 0.98` vs `display-p3 0.55 0.36 0.96` may push them CLOSER together than the sRGB fallback. R-06 is already flagged for sRGB.
   Severity: MED.
   Mitigation: hold P3 block until HITL Gate 1 confirms sRGB pair is distinguishable first. Ship P3 only after manual visual verification on a real P3 display.

6. **`contain: paint` on `.nd` with inline top/left positioning.**
   Evidence: DESIGN_SPEC 4.8 `.nd { contain: layout paint; }`. v32.7 positions nodes via inline `style="top:...;left:..."`. `contain: layout` forbids layout leak but also kills absolute-positioned descendants from extending outside the orb's box, which currently applies to `.nd-speech`, `.nd-check`, `.nd-anc` (see LAYOUT_SPEC 5.2 "simulation states preserved").
   Severity: HIGH.
   Mitigation: drop `contain: layout`, keep `contain: paint` only. Test that speech bubbles and anchors still render outside the 48px orb during simulation.

7. **`.pa-cat { position: sticky; backdrop-filter: blur(8px); }` inside a scroll container.**
   Evidence: LAYOUT_SPEC 3.2 justifies this as "localized 8px max". But this is exactly the rule MANIFEST DD-glass forbids: "No blur on scrolling containers". The mitigation text in LAYOUT_SPEC tries to reason its way around its own rule.
   Severity: MED.
   Mitigation: use solid `background: rgba(18,20,28,0.94)` on sticky `.pa-cat`. Good enough. Don't blur.

8. **Squircle orb via `border-radius: 20px` on a 48x48 box.**
   Evidence: LAYOUT_SPEC 5.2: "not full circle; 20 px rounding gives squircle premium feel". v32.7 uses `border-radius: 50%` (full circle). Changing 28 agents + all canvas nodes from circle to 20px squircle is a visible identity shift, NOT a token retune.
   Severity: HIGH.
   Mitigation: keep 48x48 circles (`50%`). Save squircles for a later version. Changing node shape touches the user's primary mental model.

## Specific objections to MANIFEST decisions

**DD10 Opus retune `#F59E0B` -> `#F5B042`.** The v32.7 gold is already etched in users' eyes over 8 versions. Shifting 3 hex steps to "harmonize with cyan research" is the kind of change that generates "something feels off" bug reports without anyone being able to name it. Q-05 flags it. Propose: preserve v32.7 `#F59E0B` exactly. Harmonize by tuning research, not Opus.

**DD9 phase remap to Okabe-Ito.** The motivation is CVD safety (good) but the new debate violet `#A78BFA` vs Sonnet violet `#8B5CF6` collision is the exact problem v32.7 set out to fix by going violet in the first place. R-06 and Q-01 flag it. Propose: shift debate to `#93C5FD` periwinkle as CRITIC suggests. One hex change, problem solved.

**DD11 fonts via CDN.** Conflicts with the project's offline-first spirit. Per Concern #3, I accept CDN but this is the biggest "single HTML file" purity violation in the manifest. Flag for HITL.

**DD18 56px rail-collapse mode.** New state, new JS logic, new localStorage key, new keyboard shortcut, new transition. Q-03 flags it as open. Propose: cut from v32.8, ship in v32.9. Visual-only release should not add new interaction modes.

**DD21 reduced-motion preserves LIVE pulse.** Users who explicitly request reduced motion and get a pulsing light on their screen will file accessibility complaints. The WCAG argument for "state signal" is contested. Propose: LIVE pulse downgrades to solid red dot under reduced-motion. State is still signaled, just not animated.

## Specific objections to DESIGN_SPEC

**4.1 sidebars.** `will-change: backdrop-filter` on every sidebar is a known GPU-memory tax on Chromium. Use it conditionally: only set `will-change` on hover/open transition, remove it after. Otherwise every page hold 4 compositor layers 100 percent of the time.

**4.3 modal `will-change: backdrop-filter, transform, opacity`.** Three-property will-change is almost always wrong. Modals open once, then sit still. Set `will-change` only during the `animation` via a class, remove after animationend.

**4.8 `.nd` phase-hover rules.** Eight different `.nd.ph-X:hover` rules each with a 3-layer shadow on a box that is `contain: layout paint`. Shadow layers interact with `contain: paint` unpredictably in Chromium pre-120. Test before ship.

**Section 6 `@media (prefers-contrast: more)` border bump.** Increasing `--border-hair` from `0.06` to `0.14` changes every hairline in the app simultaneously. Good intent, but cascades into card borders, divider borders, input borders, etc. A subset of these WILL look heavy. Spot-audit after build.

## Specific objections to LAYOUT_SPEC

**Section 2.2 geometry budget at 1440 wide.** Brand 212 + sep 16 + problem 320 + sep 16 + HUD 392 + sep 16 + actions "flex-right" = 972 px consumed before actions. Actions cluster has 8 buttons at 32 wide + gaps + divider = ~320 px. Total 1292. Leaves 148 px slack at 1440 wide. At 1280 (the stated minimum) we are 12 px SHORT. Problem textarea must shrink or brand must collapse.

**Section 3.7 rail collapsed mode.** Transition is `width: 260 -> 56 over --dur-slow 480ms --ease-emphasized` with cross-fading content inside. This is a 480ms relayout of the palette and reflow of canvas width. At 480ms the user perceives a stall. Either make it `--dur-base 220ms` or drop the feature (see DD18 concern).

**Section 4.6 sticky-per-card section headers.** "sticky per card so they pin to top of card while you scroll its body, Figma pattern". This is subtle and tends to fight with overall scroll container `.ds-scroll`. Nested sticky inside a scroll parent works in Chrome but has historical Firefox quirks. Low severity but flag for QA.

**Section 5.2 node orb redesign.** See Concern #8. Squircle shape change is not a token swap.

## What to KEEP unchanged

1. **v32.7 `.nd { border-radius: 50% }` full circle.** Core visual identity. Do not squircle.
2. **v32.7 `--mc-opus: #F59E0B` exact hex.** 8 versions of muscle memory.
3. **v32.7 single-file architecture with inline JS/CSS.** No self-hosted fonts, no build step.
4. **v32.7 simulation animations (`.nd-speech`, `.nd-check`, `.nd-sim-progress`).** LAYOUT_SPEC 5.2 says "only colors retuned" but Concern #6 shows `contain: layout` would break them. Keep them working over token changes.
5. **v32.7 canvas SVG structure (no backdrop-filter anywhere in the tree).** DESIGN_SPEC Section 5 honors this. Guard it with a code-review rule.

## Closing

**Verdict: REVISE.** The spec package is 90 percent ready and 10 percent speculative. Add the `data-glass="solid"` kill-switch, drop HUD-cell inner blur, drop `contain: layout` on `.nd`, preserve v32.7 Opus gold and circle orb, defer rail mode to v32.9. Those five revisions take the spec from "risky ship" to "safe ship".
