# HITL Gate #2 - Post-Build Status Briefing

## Status
- Phase F Build complete. User picked Option B "Material Expressive with Edge" at Gate #1.
- JS parse 1/1 blocks, 0 errors, 707918 chars, 7073 lines. File grew 963 lines (+16%) since Phase A baseline.
- All 6 implementers returned GO. Integrator verified version stamps (title v32.8, eksportujKfg v='32.8', buildCostJSON version='32.8'), grep audits clean, starfield integrity intact, zero em-dashes.
- Five Minds resolutions R-01..R-10 from Phase D are all applied or explicitly deferred.

## What landed vs plan

| Phase D resolution | Status | Where to find it |
|---|---|---|
| R-01 Sonnet APCA two-tier ink (`--mc-sonnet-ink #C4B5FD`) | LANDED | F1 token layer, F5 `.chip-model-so`, `.b-so` active |
| R-02 Phase-ink tokens (strategy/debate/qa) | LANDED | F1 `:root` + `[data-theme=light]`, F5 chip variants |
| R-03 Opus `#F59E0B` preservation (no creep to `#F5B042`) | LANDED | F1 token defs verified by F6 grep |
| R-04 Scroll-padding-top 56px for WCAG 2.4.11 | LANDED | F2 `html { scroll-padding-block:56px 24px }` |
| R-05 Target-size 24x24 floor on phase-pills | LANDED | F2 `.phase-pill` rules |
| R-06 Glass kill-switch `html[data-glass="solid"]` | PARTIAL | F1 CSS hook exists; UI toggle NOT wired |
| R-07 View Transitions on 4 modal opens + shared morph | LANDED | F4 `view-transition-name` x7, F6 `document.startViewTransition` feature-detect wrap |
| R-08 `.nd { contain: paint }` only (no layout) | LANDED | F3 canvas; DD26 comment in place, grep confirms 0 `contain:layout` on `.nd` |
| R-09 SZCZEGOLOWY OPIS above-fold on preset detail | LANDED | F2 `pokazInfoPr` reordered card |
| R-10 Starfield refinement without removal | LANDED | F3 canvas transparent, light-theme opacity 0.15, parallax hook ready |
| DD27 Rail-collapse sidebar | DEFERRED | Marked for v32.9, not in scope |
| DD28 Card order SZCZEGOLOWY OPIS first | LANDED | F2 render path |

## Observed risks before QA
1. **Glass kill-switch has no UI toggle yet.** The CSS selector `html[data-glass="solid"]` works, but no user-facing button sets the attribute. QA may flag it as dead code. Fix cost: ~10 min (one button + one click handler + localStorage persistence).
2. **View Transitions morph from topbar HUD to Cost modal header has never been verified in a live browser.** Both ends have `view-transition-name: vt-cost-hud`, and the opener is wrapped, but the shared-element morph requires both nodes to exist at the right instant. One DOM-order bug and the API silently falls back without erroring. Fix cost if broken: ~15 min.
3. **APCA Lc values on new ink tokens are calculated, not measured.** FM3 Analityk math says they pass, but we have not run an APCA runner against the actual rendered chip/badge backgrounds in both themes. Likely low risk, but this is exactly the class of thing Phase H quality agents catch. Fix cost if failing: shift token hex by 1-2 steps, ~5 min per token.
4. **Starfield parallax layer is hooked but not wired.** F3 prepared the DOM layer and the prefers-reduced-motion downgrade path, but the second canvas layer itself is not yet animating. The motif is preserved (F3 core goal) but the Option B "extra parallax layer" promise is partial. Fix cost: ~20 min.
5. **Custom Agent Creator live preview uses the new chip variants but was not exercised with every phase/model combination.** There are 6 phases x 3 models = 18 chip combos. F5 shipped CSS for all of them; F1-F4 did not click through them.

## Untested surfaces
Phase F is a headless build. These need a real browser or a human:
- View Transitions morph visual (shared-element HUD -> modal morph, reduced-motion kill-switch)
- APCA contrast on chips rendered in actual dark and light themes under real font rendering
- Glass kill-switch real user-facing toggle (CSS hook exists, no button)
- Preset detail sidebar with SZCZEGOLOWY OPIS card order (needs live click test on a preset with and without the extended description)
- Custom Agent Creator live preview with all 18 chip variant combinations
- Starfield under `prefers-reduced-motion`, light theme, and parallax hook activation

## 3 options

### Option G-A: Straight to QA (recommended default)
Proceed directly to Phase H (Security, Quality, Performance, QA Manager). Let QA find anything missed. This is the normal pipeline path and maps 1:1 to the Deep Five Minds protocol.
Risk: QA may surface issues (the 5 observed risks above) that would have been 5-20 minutes to fix now but cost a full re-build round later.
Effort: ZERO extra work before QA.

### Option G-B: Do 1-2 targeted fixes FIRST, then QA
Before handing off to QA, knock out the cheapest known gaps:
- Wire the glass kill-switch as an actual topbar toggle button (not just the CSS attribute hook)
- Wire the starfield parallax second layer so Option B's "extra parallax" promise is real, not just hooked
- Optionally: add a `requestAnimationFrame`-timed console assertion that verifies the shared `vt-cost-hud` element exists on both sides when `pokazCostBreakdown` fires
Effort: ~30 minutes of focused edits. Lower QA rework risk.

### Option G-C: Add one more polish pass before QA
Full manual polish pass in a real browser:
- Click every modal with dev tools open, verify View Transitions actually fire, screenshot the morph
- Toggle every theme and every sidebar state, verify starfield opacity and phase housing rings
- Run APCA runner against live DOM in both themes, patch any token that lands under Lc 60
- Walk through Custom Agent Creator with every phase/model combo
- Smoke-test simulation mode end to end
Requires user to click through, not just automated Claude work.
Effort: ~60+ minutes. Highest quality gate before QA, but overlaps with Phase H scope.

## Recommended
**Option G-A** unless user flags a specific concern above. The 5 observed risks are exactly what Phase H exists to catch, and the pipeline is designed so rework from QA is cheap (single implementer re-runs, not a full rebuild).

If the user is nervous about the View Transitions morph specifically (risk #2, which is the place Cien flagged in Phase D as "where polish dies if rushed"), Option G-B is the smart-money pick.

Option G-C is only worth it if the user wants to demo v32.8 to someone before QA finishes.

## What Phase G needs from user
One letter: **A**, **B**, or **C**.
If no response: default **A** (straight to QA).
