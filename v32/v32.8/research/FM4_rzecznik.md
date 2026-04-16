# FM4 Rzecznik Uzytkownika - Position Paper

## Opening statement

The spec package looks premium on paper, but the most harmed user is the keyboard-only, screen-reader, or reduced-motion operator on a 13-inch 1280 px laptop at 75 percent brightness with Polish UI strings. DESIGN_SPEC and LAYOUT_SPEC name the right primitives (focus ring, prefers-reduced-motion, skip link, ARIA), yet they under-specify WCAG 2.2 AA NEW criteria (2.4.11, 2.5.8), empty/loading/error coverage, discoverability of the CTX MAX HUD cell, and Polish-string width budget. Ship only after these gaps close. The starfield stays.

## WCAG 2.2 AA audit

- **1.4.3 Contrast (Minimum) - PARTIAL.** DESIGN_SPEC targets APCA Lc 75+ for body, but R-02 in MANIFEST admits APCA is not yet measured on the final palette. `--t2 #B5BAC7` on `--s-2` needs verification; light-theme values are derived, not audited.
- **1.4.11 Non-text Contrast - PARTIAL.** Hairline borders `rgba(255,255,255,0.08)` on `--s-2` are below 3:1 against `--s-3` adjacency; `prefers-contrast: more` mitigation exists (line 1221), but default fallback for light theme drops to `rgba(11,13,18,0.10)` which R-04 flags as risky on glass.
- **2.1.1 Keyboard - PARTIAL.** Canvas is listed as "single focusable" in LAYOUT_SPEC line 1031. Marquee rect select, drag-to-connect, and context menu agent-placement actions have no documented keyboard equivalent. Drag is not keyboard reachable.
- **2.4.7 Focus Visible - PASS.** DESIGN_SPEC Section 4.10 + LAYOUT_SPEC Section 8.1 specify 2 px violet ring with 2 px offset on `:focus-visible` only. Good.
- **2.4.11 Focus Not Obscured (Minimum, WCAG 2.2 NEW) - FAIL.** Topbar is `position: fixed` 56 px tall glass chrome. When user Tabs through a sidebar scroll list the focused row at the top of the viewport will be occluded by the topbar. No `scroll-padding-top: 56px` is specified in either spec. This fails 2.4.11 as written.
- **2.5.8 Target Size (Minimum 24x24, WCAG 2.2 NEW) - PARTIAL.** Topbar icon buttons are 32x32 (OK). HUD cells 32 px tall (OK). BUT: pa-search clear button "X" is 14x14 (LAYOUT_SPEC line 355) - FAIL. Connection control dots on canvas and minimap buttons have no stated minimum size. Agent orbs on canvas are 48 (OK). Category header chevron / count chip undocumented.
- **1.4.12 Text Spacing - PARTIAL.** Sidebar dense row 32 px with `--fs-13 line-height 1.30` will break at line-height 1.5 user override (row content overflows 32 px). Needs `min-height` not fixed height, and `.pa-desc` ellipsis needs to not clip mid-grapheme for Polish diacritics.
- **1.4.13 Content on Hover/Focus - PARTIAL.** Rail-collapsed mode (LAYOUT_SPEC line 453) says "hover tooltip shows name" with no spec for dismissible (Esc), persistent (stays on hover of tooltip), or keyboard trigger. Canvas node speech bubbles similarly underspecified.
- **3.2.6 Consistent Help (WCAG 2.2 NEW) - PASS.** Topbar help button `?` + `Skroty klawiszowe` present and consistent.
- **3.3.8 Accessible Authentication - N/A.** No auth in app.

**Fail or partial count: 7 of 9 applicable SC (1 FAIL, 6 PARTIAL, 2 PASS).**

## Keyboard + focus order review

1. **App open -> skip link -> topbar.** Skip link targets `main.workspace` (LAYOUT_SPEC line 1032). Good, but the problem textarea `probIn` sits inside topbar, so Tab from topbar logo goes through 10+ HUD cells + action buttons before reaching the palette. Propose: skip link offers two targets (workspace + palette) or palette gets its own landmark.
2. **Selecting a preset with keyboard.** `role="option"` + `tabindex=0` on `.pr-item` is present (line 395), but no `role="listbox"` wiring to Arrow/Home/End keys is documented. Without roving tabindex + arrow-key navigation, a screen reader user must Tab through every row to reach preset #13.
3. **Cost modal keyboard navigation.** Tab order inside moCost (4 tabs + sortable table + sliders) is not specified. Sortable table header click needs `role="columnheader" aria-sort`. Sliders need keyboard value announcement.
4. **Triggering + pausing simulation.** M starts, Space pauses in Live Monitor. But Space in palette scroll also pages the listbox per native behavior - conflict risk. Pause during Debate Arena undocumented.
5. **Custom Agent Creator wizard.** 5-step wizard needs `aria-current="step"` + Prev/Next keyboard flow, and Wizard mode vs Form mode toggle needs `role="radiogroup"`. Neither is specified.

**Biggest gap:** no documented roving tabindex pattern for palette rows or HUD cells. Tab-only reach is O(n) across the whole app.

## Reduced-motion + reduced-transparency coverage

DESIGN_SPEC line 1123-1169 and Section 3.3 lines 191-202 cover reduced-motion with the universal `*` rule and preserve opacity fades, focus rings, LIVE pulse, spinners. Starfield downgrades correctly (lines 362, 1067): static at 40 percent opacity, no twinkle, no drift, no shooting stars, NEVER vanishes. Good.

Reduced-transparency coverage (DESIGN_SPEC line 564, 631, 689) downgrades `.glass` and `.glass-thick` to solid `rgba(18,20,28,0.95)` and removes `backdrop-filter`. Good.

**Gaps:**
- CSS spring `--ease-spring-snappy cubic-bezier(0.2,0,0,1.2)` (line 176) is a bounce. Under reduced-motion the universal rule collapses duration to 0.01 ms, but a bounce-easing with duration of 0 still fires the overshoot frame. Propose: inside reduced-motion, also remap spring eases to `linear`.
- "Lift" animations (`translateY(-2px)` hover) are said to downgrade to "opacity fade only" in the Manifest (DD21) but the actual CSS rule is a blanket duration kill. That preserves the transform, just instantly. Vestibular-sensitive users still perceive the instant jump. Propose: `transform: none !important` inside reduced-motion for hover-lift classes.
- No `prefers-contrast: more` spec for focus ring (should bump ring to 3 px or add a second white outer ring for high-contrast mode).

## Cognitive + discoverability concerns

1. **CTX MAX HUD cell is the least self-explanatory of the four cells.** "CTX MAX" label with a percent bar and no baseline of "what is 100 percent of" - a new user will not know this is context-window utilization for the heaviest subagent. Propose tooltip-on-hover with Polish + EN explanation plus click-to-open Context tab in Cost modal.
2. **SZCZEGOLOWY OPIS card is inside a scrollable right sidebar, below 3 other cards.** New users opening a preset for the first time will see 3 knowledge cards and miss the longest, most informative card below the fold. Propose: section order in the right sidebar puts SZCZEGOLOWY OPIS second, after the model buttons, not last.
3. **Rail-collapsed mode (Cmd+B) is undiscoverable.** No visible toggle. If a user accidentally triggers it they have no UI affordance to re-expand. Propose visible chevron button at rail top.
4. **Severity color flash on HUD cells uses a spring bounce (line 187).** Colorblind users get no icon change, only a border hue shift. Propose: on severity change also swap the label icon from circle to triangle (warning) or octagon (danger).
5. **New built-in presets with tier "new" badge are tiny 7 px uppercase (DD19).** 7 px fails 1.4.4 Resize Text essentially - it cannot be enlarged without overflow because it is sized at a fixed minimum. Propose 10 px minimum.

## i18n concerns

Polish strings can be 30 to 40 percent longer than English. Examples from v32.7: "Pokaz szczegoly kosztow" vs "Show cost details" (24 vs 17 chars). "SZCZEGOLOWY OPIS" is 16 chars vs "DETAILED DESCRIPTION" at 20, but Polish verbs in labels are much longer: "WYGENEROWANY PROMPT KONCOWY" vs "GENERATED FINAL PROMPT".

**Problem:** LAYOUT_SPEC fixes right sidebar at 320 px and left palette at 260 px. Category header `.pa-cat` at `--fs-11 uppercase tracking +0.04em` at 260 px width with Polish labels like "AGENCI SPECJALIZOWANI W ANALIZIE DANYCH" will clip at roughly 28 characters. Propose: category headers use `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` PLUS a `title` attribute so full text is available on hover and screen reader.

**Problem:** HUD cell labels "COST / TOK / MIX / CTX MAX" are English only. Polish equivalent is "KOSZT / TOK / MIX / KONTEKST MAX" which is fine at 11 px uppercase, BUT no i18n key is documented for these in the spec. Propose: add `data-i18n` attributes and confirm English-first labels are acceptable (cost abbreviations are typically universal).

**Problem:** Tooltip on rail mode (CSS `title` or custom) must localize.

## Empty + loading + error states

The spec has palette empty state (line 417) and skeleton loading state (line 432). Good. Gaps:

1. **Canvas empty state (no preset loaded).** Undocumented. Should show a centered "Wybierz preset lub przeciagnij agenta" hint with arrow to left palette, `aria-live="polite"`, dismissible.
2. **Cost modal with zero agents.** What does the donut chart show? What do the KPI cards say? Undocumented. Propose: "Dodaj agentow aby zobaczyc koszt" empty card in each tab.
3. **Network error for font CDN.** Inter + Geist Mono load from Google Fonts + Vercel CDN. Offline-first user gets system-ui fallback, but no FOUT/FOIT policy. Propose `font-display: swap` with a `.fonts-failed` class on `html` if both load events fail inside 3 s - triggers a tighter system-ui tracking override so the layout does not shift.
4. **Custom Agent Creator validation error state.** Spec says "live preview + 6 quality chips" but no error state for invalid fields (duplicate ID, empty name). Propose `role="alert"` inline under each field.
5. **Simulation interrupted / failed.** Undocumented. If simulation mid-run encounters a HITL timeout or error, what does the user see? Propose a toast + phase timeline marker.

## Closing verdict

**REVISE.** The foundation is strong (focus ring, Escape nesting, ARIA, reduced-motion, skip link, tab order named) but three WCAG 2.2 items are fail-or-partial in ways that will hit real users, and three discoverability failures will waste premium work on features nobody finds. Top 3 fixes before HITL Gate 1:

1. **Fix 2.4.11 Focus Not Obscured**: add `scroll-padding-top: 56px` to scrollable containers + document the rule.
2. **Fix 2.5.8 Target Size + add roving tabindex** to palette listbox and HUD cell group. Bump pa-search clear X from 14 px to 24 px minimum.
3. **Promote SZCZEGOLOWY OPIS above the fold** in right sidebar and add tooltip + click-to-open on CTX MAX HUD cell. Make rail-collapse toggle visible.

Starfield stays. Polish + English stay. No em-dashes.
