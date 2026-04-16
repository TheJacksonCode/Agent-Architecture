# v32.8 QA REPORT - Deep Five Minds Phase H

## Aggregate Verdict: GO-WITH-FIXES
## Aggregate Score: 5/10 (worst-case: H1 Security floor drives the ship decision)
## Date: 2026-04-08

## Executive summary
v32.8 is structurally sound (clean semantics, zero ship-blocking CRITICALs from any auditor) but ships with a **systemic innerHTML hygiene regression** that makes the Custom Agent Creator a persistent XSS vector, a **GPU-hostile glass cascade on every canvas node**, and a **starfield rAF leak that ignores reduced-motion**. None of these require architectural changes. All BLOCKERS are mechanical fixes estimated at 1.5-2h total. The H2 accessibility skeleton is the strongest layer (8/10) and passes APCA/WCAG 2.2 on the landmarks, contrast, targets, and reduced-motion coverage already in place. Ship after fixing the 6 BLOCKERS below; defer the rest.

## Sub-scores
- H1 Security: 5/10 - Solid guards on clipboard/LS/VT/eval, but Custom Agent `name` flows unescaped into 8 innerHTML sinks.
- H2 Quality:  8/10 - Strong a11y baseline, 3 HIGH gaps (reduced-motion, roving tabindex, Space shortcut).
- H3 Perf:     6.5/10 - Clean AD_MAP + contain:paint, broken by backdrop-filter on .nd-body and forever-rAFs.

## SHIP BLOCKERS (must fix before v32.8 ships)

### B1. Custom Agent XSS via unescaped `getAgentName` (8 innerHTML sinks)
- **Source**: H1 finding HIGH-1
- **File**: `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5242, 5307, 5410, 5431-5432, 5449, 5888, 6313, 6689`
- **Why blocker**: User-controllable, persisted to localStorage, fires on every page load after one poisoned save. Creating an agent named `<img src=x onerror=alert(1)>` pwns the app across sessions. This is the canonical "stored XSS" definition.
- **Fix**: Wrap every `getAgentName(...)` and `getAgentDesc(...)` that reaches innerHTML with `escHtml(...)`. Same for `d.role` / `nd.cp`. Pattern already proven safe at `rZapisy` (5268).
- **Effort**: S (30 min - mechanical sed + grep verify)

### B2. Custom Agent `tools` chip innerHTML injection
- **Source**: H1 finding HIGH-2
- **File**: `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5412, 5450`
- **Why blocker**: Same persistence vector as B1; localStorage-crafted `tools` string bypasses the checkbox UI and lands in innerHTML directly. Any attacker with one-time DevTools/extension access gets permanent XSS.
- **Fix**: `escHtml(tool.trim())` inside the `.map()`.
- **Effort**: S (5 min)

### B3. `.nd-body` glass cascade: backdrop-filter(20px) + animated breathe on every node
- **Source**: H3 finding C1
- **File**: `AGENT_TEAMS_CONFIGURATOR_v32_8.html:833-836`
- **Why blocker**: 13-agent Five Minds Strategic preset = 13 simultaneous animated GPU blur layers. Textbook DD3/R4 anti-pattern; drops frames on integrated GPUs, thermal-throttles on laptops. Nodes are 48px orbs - the blur contributes zero legibility.
- **Fix**: Drop `backdrop-filter` from `.nd-body`, use solid `var(--bg-panel)`. Keep the scale breathe.
- **Effort**: S (5 min, single rule)

### B4. Starfield + data-stream rAF loops ignore `prefers-reduced-motion` and `document.hidden`
- **Source**: H2 HIGH-1 AND H3 C2 (duplicate - merged)
- **File**: `AGENT_TEAMS_CONFIGURATOR_v32_8.html:6957-6969` (starfield), `5899-5921` (data-stream)
- **Why blocker**: WCAG 2.3.3 + user-setting compliance failure; burns GPU on idle background tabs; resize rebuilds full ~600-star array on every event. Fixing this single function unblocks BOTH H2's reduced-motion requirement AND H3's perf complaint.
- **Fix**: Early-return in `draw()` if `matchMedia('(prefers-reduced-motion:reduce)').matches`; add `visibilitychange` listener to cancel rAF; debounce resize 150ms.
- **Effort**: S (15 min)

### B5. `rPol()` full SVG innerHTML rebuild on every mousemove drag event
- **Source**: H3 finding C3
- **File**: `AGENT_TEAMS_CONFIGURATOR_v32_8.html:5217, 5351`
- **Why blocker**: 3-5KB SVG re-parse per mousemove = janky drag on any preset with connections. Makes the primary interaction (arranging canvas) feel broken on mid-tier hardware.
- **Fix**: rAF-debounce `rPol()` calls from the drag handler; write the frame accumulator, flush once per rAF.
- **Effort**: M (30-45 min - needs drag handler refactor + test)

### B6. Global Space shortcut steals keyboard clicks from focused buttons
- **Source**: H2 finding HIGH-3
- **File**: `AGENT_TEAMS_CONFIGURATOR_v32_8.html:6945`
- **Why blocker**: Any keyboard user pressing Space on a focused button both activates it AND toggles simulation. This breaks the fundamental button contract for keyboard-only users (WCAG 2.1.1).
- **Fix**: Add `&& e.target.tagName !== 'BUTTON'` to the guard alongside the existing INPUT/TEXTAREA check.
- **Effort**: S (2 min)

**BLOCKERS total effort: ~1.5-2h**

## SHOULD-FIX (HIGH but not blocker - fix in v32.8 if time permits, else v32.9)

### S1. Mermaid string injection via Custom Agent name
- **Source**: H1 HIGH-3
- **File**: `:6296`
- **Why not blocker**: Exfil-via-copy-paste, not in-app XSS. Requires user to paste into mermaid.live.
- **Fix**: Strip `"[]{}` + backticks + newlines from name before templating.
- **Effort**: S (10 min)

### S2. CSV formula injection (`=+-@\t\r` leading sigils) in `buildCostCSV`
- **Source**: H1 HIGH-4
- **File**: `:5805-5809`
- **Why not blocker**: Requires user to open exported CSV in Excel/Sheets; no in-app impact. But CWE-1236 is well-known and trivially fixed.
- **Fix**: Prefix `'` to cells matching `/^[=+\-@\t\r]/`; double embedded `"`.
- **Effort**: S (10 min)

### S3. Markdown injection via name in cost MD / final prompt MD
- **Source**: H1 HIGH-5
- **File**: `:5802`
- **Fix**: Escape `|` -> `\|`, strip newlines, fullwidth `[` `]`.
- **Effort**: S (10 min)

### S4. DD28 roving tabindex on palette not implemented
- **Source**: H2 HIGH-2
- **File**: `:5242` (`rPalete`)
- **Why not blocker**: Keyboard works today (Enter/Space fire), only "one tab stop" APG pattern fails. Real users complete the task.
- **Fix**: First `.pa-item` gets `tabindex="0"`, rest `-1`; ArrowUp/Down handler on `#paL`.
- **Effort**: M (45 min)

### S5. `will-change:backdrop-filter` pinned on 5 permanent surfaces
- **Source**: H3 HIGH-1
- **File**: `:412, 413, 457, 709, 1072`
- **Fix**: Remove from `.glass-thin/.glass-thick/.topbar/.side-l/.side-r`; keep on `.mo-box` only.
- **Effort**: S (5 min, high GPU-memory win)

### S6. `aktKoszt()` + cascading `rWez`/`aktStan` unthrottled on model change
- **Source**: H3 HIGH-3
- **File**: `:5543-5545, 5596-5618`
- **Fix**: rAF-batch the three calls in bulk-change handler.
- **Effort**: S (15 min)

**SHOULD-FIX total effort: ~1.5h.** Strong recommendation to include S1-S3 (security-adjacent, trivial) with the blocker batch.

## DEFERRED (MEDIUM/LOW - punt to v32.9)

- **H1-6/7/8/9** modal backdrop-click/focus-trap/LS schema validation - v32.9 architectural polish.
- **H2 M1-5** `prefers-reduced-transparency` syntax, `aria-controls` on tablists, `aria-current="step"`, tab tabindex management, `#dtlInner` accessible name - a11y polish batch for v32.9.
- **H2 L1-6** i18n duplicate keys, inline styles, explicit `for=` - code-hygiene cleanup.
- **H3 M1-5** `nMap` inside `rPol`, 37 keyframes audit, sticky thead backdrop, VT reduced-motion bailout, Mermaid sticky thead - minor perf wins, deliver together in v32.9 "perf pass".
- **H3 L1/L5** transform-based drag, resize debounce on starfield (partially covered by B4).

## What's solid (verified clean - reasons for confidence)

- View Transition recursion guards at all 4 wrappers (`:5624, 6297, 6570, 6725`) - zero infinite-loop risk.
- Clipboard: all 5 `writeText` calls have `.catch` handlers.
- `safeParseLS`/`safeSaveLS` with try/catch + QuotaExceededError coverage.
- Zero `eval`/`new Function`/string-setTimeout/`window.open`.
- `pokazToast`, `generujPrompt`, `importujMdPlik`, `rZapisy` all use safe DOM property paths.
- APCA contrast passes (Lc 75-100 body) in both themes; Okabe-Ito phase palette passes deuteranopia/protanopia.
- WCAG 2.4.11 Focus Not Obscured, 2.5.8 Target Size (24px floor on all interactive elements), 2.4.7 Focus Visible (21 `:focus-visible` rules), 4.1.3 Status Messages (5 live regions correctly wired).
- 7 `prefers-reduced-motion` CSS blocks cover scroll/shooting-stars/breathing/marquee/lifts/modal-pop/VT.
- 0 duplicate IDs, 0 em-dashes, 0 `var`, 0 `console.log`, 0 TODO/FIXME.
- `.nd { contain:paint }` + `.mo-b { contain:paint }` correctly scoped.
- `AD_MAP.get()` used consistently (53 hits, 0 `AD.find()` regressions).
- Inner scroll containers `.sl-pan` + `.sr-scr` explicitly `backdrop-filter:none` (exemplary DD3/R4 compliance).
- `@supports not(backdrop-filter)` fallback + `prefers-reduced-transparency` solid swap in place.
- RAF-debounced minimap already done.
- System font stack - zero FOUT/FOIT cost.

## Recommended next move

**Option (b+): Fix BLOCKERS B1-B6 plus SHIP-adjacent S1-S3 (security-related MD/CSV/Mermaid injection) -> ship v32.8. Defer everything else to v32.9.**

Rationale:
- (a) Ship-as-is is a hard NO. B1/B2 stored XSS is a real user-harm path, not theoretical.
- (b) Fixing just B1-B6 (~1.5-2h) brings verdict to solid GO and clears the ship floor.
- (b+, recommended) Adding S1-S3 (~30 min extra) closes the entire custom-agent-name injection family in one coherent pass, so you ship one "hygiene fix" instead of two. Same file, same diff review, same test cycle. **Total effort ~2-2.5h.**
- (c) All SHOULD-FIX costs ~3-4h and yields an 8/10 ship, but S4-S6 are independent and can land in v32.9 without regression risk.
- (d) Defer everything = NO-GO. Don't ship a stored XSS.

**Recommendation: do (b+).** One commit message: "v32.8.1 hotfix: escape custom agent fields in all innerHTML + CSV/Mermaid/MD exports; drop backdrop-filter from .nd-body; reduced-motion + visibility guards on starfield/data-stream; rAF-debounce rPol drag; exclude BUTTON from Space shortcut." Then tag v32.8 and schedule v32.9 for the S4-S6 + deferred list.
