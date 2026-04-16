# v32.9 MASTER PLAN

**Status:** IN PROGRESS
**Started:** 2026-04-10
**Baseline:** v32.8 (7093 lines, 537217 chars, 0 parse errors)
**Target:** Iterative polish version. v32.9 is the WIP branch; when all planned tasks are polished the version will be released as v33.

## Philosophy

v32.9 is an umbrella for multiple focused polish tasks. Each task gets its own mini-pipeline (task folder under v32.9/plans/ and its own entries in PROGRESS.md). Research is REUSED aggressively from v32.8/research/ per the workflow standard in CLAUDE.md. Ship happens only once at v33 release.

## Constraints (inherited from v32.8)

- MOTYW GWIAZD (starfield) stays, no replacement
- Single self-contained HTML file
- Polish + EN i18n via aktStatHTML + I18N_EN
- No em-dashes / en-dashes
- Backward localStorage migration chain extends: acV32_9_custom -> acV32_8_custom -> ... -> acV32_custom
- All v32.8 functionality preserved (no regressions)
- APCA-compliant ink tokens, Okabe-Ito phase palette, glass-thin vs thick-chrome split, 6-step motion ramp, WCAG 2.2 audit - all inherited

## Planned tasks (grows as user adds)

### Task 1 - Preset sidebar parity with agent palette [ACTIVE]
User feedback: left palette Agents tab is beautifully done; the Presets tab looks comparatively flat. Bring Presets to parity - same visual quality, readability, phase-housing, NEW tier badge treatment, hover/selected states.

**Pipeline:**
- T1-A Setup + baseline (done with this file)
- T1-B Research audit: read v32.8/research/R5_premium_tools.md for sidebar pattern reuse
- T1-C Code delta map: grep pa-* and pr-* CSS + render to identify gaps
- T1-D Delta research: 1 researcher on preset/template picker patterns (builds on R5)
- T1-E DESIGN_SPEC + LAYOUT_SPEC for preset sidebar (reuses v32.8 tokens)
- T1-F HITL Gate #1: 2-3 visual options presented to user via AskUserQuestion
- T1-G Build: CSS + rPresety edits, JS parse
- T1-H QA + mini-ship (to v32.9 HTML only, NOT to index.html yet)

### Future tasks (placeholder, added as user requests)
- [ ] Task 2 - TBD
- [ ] Task 3 - TBD
- [ ] ...

## Ship criteria for v33

All active tasks must:
1. Have complete PROGRESS.md entries with JS parse numbers
2. Be accepted by user (no open feedback)
3. Pass mini-QA (XSS escHtml coverage, WCAG preserved, no regressions)
4. Have updated MANIFEST entries in v32.9/plans/

Only then: copy v32.9 HTML to index.html, rename folder to v33/ if desired, update CLAUDE.md with v33 entry, update memory with v33 status.

## Research reuse log

Existing research files that will be cited across v32.9 tasks:
- v32.8/research/R1_apple_hig.md - HIG 2026, visionOS, restraint principles
- v32.8/research/R2_material3.md - M3 Expressive 2026
- v32.8/research/R3_dark_mode_2026.md - OLED blacks, surface elevation
- v32.8/research/R4_glass_neumorph.md - thin glass vs thick chrome recipe
- **v32.8/research/R5_premium_tools.md - sidebar patterns (Linear, Cursor, Vercel, Arc, Raycast, Figma, Notion, Claude.ai) [PRIMARY REUSE for Task 1]**
- v32.8/research/R6_typography.md - type scale, line-height, OpenType
- v32.8/research/R7_motion.md - easing, spring, reduced-motion
- v32.8/research/R8_color_a11y.md - APCA Lc values, contrast measurements

## Compaction recovery protocol

1. Read v32.9/MASTER_PLAN.md (this file)
2. Read v32.9/PROGRESS.md for latest state
3. Identify current task and sub-phase
4. Read referenced research + design files
5. Resume from last incomplete step
