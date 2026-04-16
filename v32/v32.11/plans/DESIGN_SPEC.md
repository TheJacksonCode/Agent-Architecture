# v32.11 DESIGN SPEC

## Decision: Pattern #1 (Dual Verdict Panel)

Per R1 research recommendation. Justification:
- True 2-3s scan via pre-attentive color (green/red) + shape (check/cross) + position (left/right) + header chip redundancy
- Hard 50/50 split = binary categorization 3x faster than 3-way per cognitive load theory
- CVD-safe (color + shape + position triple redundancy)
- Maps 1:1 to PRESET_GREEN_PL (5 bullets) and PRESET_RED_PL (4 bullets) from R2
- ~60 lines vanilla CSS, no JS, no DOM bloat
- Fits existing dark glassmorphism aesthetic

## Sidebar width adjustment

Current: `.side-r{width:320px}` (line 1121). Inner usable after 12px padding = 296px. Per column = 146px - too tight for 5-6 word bullets in 11.5px font.

**Change:** bump base width 320 -> 360px (+40px). Inner = 336px, per column = 168px. Comfortable for "Idealne na test ceny lub rejestracji" (5 words).

Responsive breakpoints (`@media 1100px` 260, `@media 900px` 220) **left unchanged** - those are degraded modes for cramped screens, the verdict block can compress with text wrapping there.

## Color tokens (existing, no new tokens)

| Token | Value (dark) | Value (light) | Use |
|---|---|---|---|
| `--mc-haiku` | `#34D399` | `#10B981` | Green column accent |
| `--mc-haiku-rgb` | `52,211,153` | `16,185,129` | Green washes |
| `--ph-qa` | `#F87171` | `#DC2626` | Red column accent |
| `--ph-qa-rgb` | `248,113,113` | `220,38,38` | Red washes |
| `--bg-card` | inherits | inherits | Outer glass base |
| `--bg-input` | inherits | inherits | Body text fallback bg |
| `--t1` | inherits | inherits | Body text color |

No new CSS variables needed.

## CSS recipe (drop-in)

Copy from R1 `R1_ui_patterns.md` lines 67-247 verbatim with these adaptations:
- Selector prefix `verdict` -> `vd` (matches existing v32 abbreviation pattern, e.g. `ds`, `pa`, `pr`)
- Body text: `--t1` instead of hardcoded `#E6E7EC` (already theme-aware)
- Light theme: use `#065F46` / `#7F1D1D` chip text per R1 recommendation (Tailwind emerald-900 / red-900)
- Min-height: 140px (slightly less than R1's 160px to keep card compact since we have only 4-5 bullets not 6)

## Render position in pokazInfoPr

Current order (after v32.10):
1. Header card (icon + name)
2. KIEDY UZYWAC (PRESET_MID_PL)
3. SZCZEGOLOWY OPIS (PRESET_LONG_PL collapsible)
4. CLAUDE CODE COMMAND
5. SKLAD
6. ZMIEN MODEL
7. ZALETY (PM[].p) **<- REMOVE**
8. WADY (PM[].m) **<- REMOVE**
9. CZYM JEST (pk.who) **<- REMOVE**
10. CO ROBI (pk.whenToUse) **<- REMOVE**
11. CZEGO NIE ROBI (pk.whenNotToUse) **<- REMOVE**
12. Encyklopedia button

New order (v32.11):
1. Header card
2. KIEDY UZYWAC
3. **VERDICT PANEL (NEW - replaces 5 sections)** <- positioned above SZCZEGOLOWY OPIS for "should I bother reading more" gate per R1
4. SZCZEGOLOWY OPIS
5. CLAUDE CODE COMMAND
6. SKLAD
7. ZMIEN MODEL
8. Encyklopedia button

Per R1 advice: place Verdict Panel HIGH so it serves as the "gate" - if user sees the green column matches their need, they read on; if they see red column blocks them, they bail immediately.

## Content source

PRESET_GREEN_PL + PRESET_RED_PL constants from `plans/R2_content.md`. Drop-in ready, 42 entries each, plain Polish, escHtml() applied at render time.

## i18n

No EN translation in this version - PL only for v32.11. Match aktStatHTML() data-i18n keys for "Nadaje sie do" / "Nie dla" labels:
- PL: `Nadaje sie do` -> EN: `Good fit for`
- PL: `Nie dla` -> EN: `Not for`

Add to I18N_EN.text dict.

## Removed code (cleanup)

After verdict block ships, the following becomes orphan in pokazInfoPr ONLY (still used elsewhere):
- `getPresetPros(pid)` - still used? Check.
- `getPresetCons(pid)` - still used? Check.
- `getPresetKnowledge(pid)` reference for sidebar - still used in bento encyclopedia, leave intact.

Per scope discipline (v32.10 rule): only delete in pokazInfoPr, don't touch other surfaces.
