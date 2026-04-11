# H2 QA Quality - v32.8

## Verdict: GO-WITH-FIXES
## Score: 8/10

File audited: `C:\Projekty Claude Code\Agent_Architecture\v32.8\AGENT_TEAMS_CONFIGURATOR_v32_8.html` (7072 lines)

## CRITICAL
None. Core a11y skeleton is solid: semantic landmarks (header/main/aside/footer), skip-link, sr-only live region, 8 role="dialog" with aria-modal + aria-labelledby, 0 duplicate IDs, 0 em-dashes, 0 `var` declarations, 0 `console.log`, 0 TODO/FIXME, html lang="pl" dynamic.

## HIGH
1. **Starfield JS animation ignores prefers-reduced-motion** (line 6937-6969 `inicjGwiazdy`). CSS line 1500-1512 dims `#starfield` opacity but the `requestAnimationFrame(draw)` recursion runs forever burning CPU. DD21 says "never hide motion entirely", but the spec also says user preference should *freeze* motion. Fix: check `matchMedia('(prefers-reduced-motion: reduce)').matches` inside `draw()` and return (or skip the rAF recursion).
2. **DD28 roving tabindex on palette not implemented.** Line 5242 `rPalete()` emits `tabindex="0"` on EVERY `.pa-item` (~150 rows). Spec DD28 + MANIFEST line 66 + R-10 require exactly ONE tab stop on palette container with arrow-key roving. Currently works keyboard-wise (Enter/Space handler present) but fails the "one tab stop" requirement. Fix: only first `.pa-item` gets `tabindex="0"`, rest `tabindex="-1"`, add ArrowUp/ArrowDown handler on `#paL` that shifts focus + tabindex.
3. **Spacebar conflict on focused buttons**: line 6945 binds global `Space` to `symPrzelacz()` and only guards against INPUT/TEXTAREA. A keyboard user focusing any `.btn` and pressing Space will both click the button AND toggle simulation. Add `e.target.tagName!=='BUTTON'` to the guard.

## MEDIUM
1. **`@media (prefers-reduced-transparency)` missing value** (line 1603). Should be `(prefers-reduced-transparency: reduce)`. Current boolean form technically parses but is nonstandard and unreliable in Firefox.
2. **Tabs missing `aria-controls`**: `.sl-tabs` (line 2043), `.cbm-tabs` (line 2189), `.ca-mode-bar` (line 2216) all use `role="tablist"` + `role="tab"` but no `aria-controls` pointing to the corresponding panel id. WCAG 4.1.2 partial fail.
3. **No `aria-current="step"` on active phase-pill**. Phase-pill is the primary wayfinder but active state is communicated by color/class only. Screen reader users can't tell which phase is active.
4. **Active tab missing `tabindex` management**: tabs use `aria-selected` but all remain `tabindex="0"`. APG tab pattern expects roving tabindex on tablist.
5. **`#dtlInner` has `tabindex="0"` but no accessible name**. Reachable by keyboard but announced as "group" only.

## LOW
1. **I18N duplicate keys** in `ui:` object: `'Faza'` (5063 vs 5086), `'Kontekst'` (5013 vs 5088), `'Agentow:'` (5037 vs 5120), `'Zamknij'` (5093 vs 5098), `'Importuj'`/`'Anuluj'`/`'Pozostaly czas'`/`'Wklej JSON...'` all declared twice. Later wins silently; not a bug but confusing.
2. **143 inline `style=""` attributes**. Many are one-shot (e.g. `.btn` margin tweaks) but several are repeated patterns (font-size overrides, width calc) that should be classes. Non-blocking.
3. **9 `<label>` tags, 0 `for=` associations.** Since they wrap their inputs implicit association works, but explicit `for` is more robust.
4. **`probIn` textarea** (line 2028) uses `aria-label` but has no visible label - acceptable, works with SR.
5. **`.sl-tab` buttons missing `id`** so even adding `aria-controls` later needs id plumbing.
6. **`#svg` connection canvas**: `aria-hidden="true"` is correct, but the connections convey information. If user wants to inspect connections, only the Mermaid export provides a text equivalent. Consider adding `aria-describedby` pointing to `#cvI` node count summary.

## OK
- **APCA contrast (dark theme)**: Sonnet ink `#C4B5FD` on `--s-2 #12151C` → Lc ≈ 85 (body pass); Strategy `#8AB4F8` → Lc ≈ 75; QA `#FCA5A5` → Lc ≈ 80; Debate `#C4B5FD` → same as Sonnet. Body text `#E6E8EE` on `#06080C` → Lc ≈ 100. All exceed Lc 60 UI / Lc 75 body targets. DD23 two-tier ink system works.
- **APCA contrast (light theme)**: lines 333-348 correctly alias ink tokens to darker base variants. Strategy `#1F5FD6`, Debate `#6D28D9`, QA `#B91C1C`, Sonnet `#6D28D9` on white → all Lc ≥ 70 body pass.
- **WCAG 2.4.11 Focus Not Obscured**: line 407 `html{scroll-padding-block:56px 24px}` verified (R-07).
- **WCAG 2.5.8 Target Size**: `.phase-pill` 24x24 (777), `.chip[role="button"]` 24x24 (1909), `.btn-sm` 24 (1800), `.btn-icon` 32 (1807), `.theme-toggle` 36 (1815), `.mo-h .btn-d` 32 (1574), `.pa-orb` 30x30 (731), `.nd-orb` 48x48 (881), modal close 32x32. All pass 24px floor.
- **WCAG 2.4.7 Focus Visible**: 21 `:focus-visible` rules with visible outline+offset. Skip-link visible on focus (line 1310).
- **WCAG 4.1.3 Status Messages**: `#srAnnounce` aria-live="assertive" (2014), `#cvI` aria-live="polite" (2064), `#simStatus` aria-live="polite" (2066), `#toast` role="status" aria-live="polite" (2070), HITL timer role="timer" aria-live="polite" (2134).
- **WCAG 3.2.6 Consistent Help**: `?` help button present in topbar (2036).
- **Reduced motion coverage**: 7 `@media (prefers-reduced-motion: reduce)` blocks cover scroll, canvas shooting stars, node breathing, marquee, btn/chip lifts, modal pop, view transitions.
- **i18n v32.8 strings present**: CBM_CONTEXT, Wykorzystanie kontekstu, Bazowy narzut, Najciezszy agent, Cel premium all have EN translations (5006-5014).
- **Okabe-Ito phase palette**: `#5B8DEF` (strategy/blue), `#22C4E6` (research/cyan), `#A78BFA` (debate/violet), `#34D399` (build/green), `#F87171` (qa/red), `#FBBF24` (hitl/amber). Debate-vs-strategy and QA-vs-hitl distinguishable under deuteranopia/protanopia simulation (different luminance + hue rotation); phase housings add border+shadow so color is not sole channel. Pass.
- **0 em-dashes / 0 en-dashes** in file.
- **8 modals correctly identified** with role+aria-modal+labelledby.
- **No duplicate IDs** across 119 unique ids.
- **Code quality**: 0 `var`, 0 `console.log`, 0 TODO/FIXME. All `const`/`let`.

## Summary of required fixes before ship
1. Patch `inicjGwiazdy` to halt rAF under `prefers-reduced-motion: reduce` (HIGH-1).
2. Implement roving tabindex + ArrowUp/Down on `#paL` per DD28 (HIGH-2).
3. Exclude `BUTTON` from spacebar shortcut guard (HIGH-3).
4. Fix `@media (prefers-reduced-transparency: reduce)` syntax (MEDIUM-1).
5. Add `aria-controls` to 3 tablists and `aria-current="step"` to active phase pill (MEDIUM-2/3).

Everything else is polish. Ship after fixing the 3 HIGH items.
