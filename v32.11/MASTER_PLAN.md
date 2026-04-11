# v32.11 MASTER PLAN

**Theme:** Sidebar Combined Pros/Cons Visual Card

## Goal
Sidebar preset detail view (`pokazInfoPr`) currently has 5 separate sections after KIEDY UZYWAC + SZCZEGOLOWY OPIS:
1. ZALETY (PM[].p - tech jargon like "~100-250K tok", "Zero overhead")
2. WADY (PM[].m)
3. CZYM JEST (pk.who - tech jargon: "Hub-and-Spoke", "Direct Delegation", "Reflective Loop")
4. CO ROBI / KIEDY UZYWAC (pk.whenToUse - 4 bullets, partially tech)
5. CZEGO NIE ROBI / KIEDY NIE UZYWAC (pk.whenNotToUse)

User feedback (2026-04-10):
- Remove CZYM JEST entirely (same problem as OPIS removed in v32.10 - tech jargon, duplicates SZCZEGOLOWY OPIS)
- MERGE ZALETY + CO ROBI / KIEDY UZYWAC into one "green" block
- MERGE WADY + CZEGO NIE ROBI / KIEDY NIE UZYWAC into one "red" block
- Plain Polish content (no jargon like "Hub-and-Spoke", "tokeny", "overhead")
- Visually striking 2-5 second comprehension - user must SEE at a glance "this preset is for X, doesn't do Y"
- Sidebar can be widened by ~10-20px if needed for readability
- Reuse content from prior iterations (existing PM, PRESET_KNOWLEDGE, PRESET_LONG_PL "Idealne dla" / "Nie uzywaj" sections)

## Constraints
- Plain Polish, no IT jargon, business/PM/marketing audience
- Visually striking - color-coded green/red, scannable in 2-5s
- Must fit in sidebar (currently around 380-420px wide, can grow to ~440px)
- No dependency on tech terms (tokens, overhead, patterns)
- Reuse existing data sources, do not invent new content from thin air
- Star background + glassmorphism aesthetic preserved
- WCAG 2.2 AA contrast (APCA Lc 75+ for body text)
- escHtml() on all dynamic content (XSS hardening kept from v32.8)

## Workflow phases

### Phase A - Setup (this file)
- v32.11/{research,plans} folders
- Copy v32.10 HTML to v32.11 baseline
- MASTER_PLAN.md + PROGRESS.md

### Phase B - Research (parallel agents)
- **R1 - UI/UX patterns**: Research modern 2026 patterns for "pros vs cons" / "good fit vs bad fit" visual cards. Sources: Tailwind UI components, shadcn/ui, Linear changelog UI, Vercel docs, Stripe docs, Notion docs, Cursor docs, Apple HIG comparison cards. Look for 2-column comparison layouts, decision matrices, traffic-light layouts, badge/chip clouds, side-by-side cards. Output: 3-5 concrete pattern recommendations with visual diagrams (ASCII), pixel measurements, contrast ratios, drop-in CSS snippets.
- **R2 - Content rewrite**: Read existing PM[].p/.m, PRESET_KNOWLEDGE pk.whenToUse/whenNotToUse, PRESET_LONG_PL "Idealne dla" / "Nie uzywaj gdy" sections. Synthesize into PRESET_GREEN_PL (combined zalety + kiedy uzywac, 4-5 bullets per preset, plain Polish, max ~5 words per bullet) and PRESET_RED_PL (combined wady + kiedy nie uzywac, 3-4 bullets per preset). All 42 presets. Style guide enforced (no jargon, no apostrophes that break JS strings, lowercase consistent, present tense, action-oriented).

### Phase C - Design + Plan
- Read R1 + R2 outputs
- Choose ONE pattern from R1 (justify why)
- Write DESIGN_SPEC.md (CSS tokens for green/red cards, padding, borders, animation, hover)
- Write LAYOUT_SPEC.md (HTML structure, class names, ASCII mockup, responsive widths)
- Optional Gate #1 to user if multiple equally good options

### Phase D - Implementation
- Add PRESET_GREEN_PL constant (42 entries)
- Add PRESET_RED_PL constant (42 entries)
- Add new CSS for `.ds-decision-card` (or chosen class name)
- Patch `pokazInfoPr` (linie 6468-6474) to remove ZALETY/WADY/CZYM JEST/CO ROBI/CZEGO NIE ROBI sections, replace with single combined block
- Sidebar width adjustment if recommended by R1
- Version bumps: title v32.10 -> v32.11, eksportujKfg v='32.11', buildCostJSON version='32.11'
- localStorage migration: acV32_11_custom + fallback chain

### Phase E - QA + Ship
- node --check JS parse (must be 1/1 blocks, 0 errors)
- grep audit:
  - `PRESET_GREEN_PL` count = 42 entries
  - `PRESET_RED_PL` count = 42 entries
  - Removed strings absent: `'CZYM JEST'`, no orphan `pk.whenToUse` in pokazInfoPr
  - localStorage chain `acV32_11_custom` present
- Update PROGRESS.md
- Mark SHIPPED
- Defer mirror to index.html (per established workflow)

## Success criteria
- User opens sidebar -> sees 1 visually striking comparison block (green left/top, red right/bottom)
- User reads in 2-5s without scrolling -> understands "what this preset is for" and "what it is NOT for"
- No tech jargon visible
- Sidebar fits comfortably, no horizontal scroll
- All 42 presets covered
