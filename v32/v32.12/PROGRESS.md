# v32.12 PROGRESS LOG

Source of truth for v32.12 "Header Composition + Compact Controls".

## Current task
**SHIPPED**

## Log

### 2026-04-10 - Phase A complete
- Created v32.12/{research,plans} folder structure
- Copied v32.11 HTML -> v32.12/AGENT_TEAMS_CONFIGURATOR_v32_12.html (7399 lines baseline)
- Wrote MASTER_PLAN.md (3 topics: SKLAD header, command display, compact model switcher)
- Wrote PROGRESS.md
- User request captured: SKLAD moved to header card; CLAUDE CODE COMMAND review; ZMIEN MODEL compact horizontal 3-chip row with short labels Opus/Sonnet/Haiku
- User reminder: maximize agent usage to save context

### 2026-04-10 - Phase B (parallel research, background)
- R1 launched (general-purpose): 3 topics with 4-5+ candidates each + drop-in CSS + APCA + sources -> 615 lines -> v32.12/research/R1_compact_controls.md
- R2 launched (Explore): scope audit .ds-mdl-btn / SKLAD / CLAUDE CODE COMMAND / zmienWszModel / .ds-card structure / orphan detection -> R2 was read-only so I saved its findings to v32.12/research/R2_scope_audit.md
- R3 launched (general-purpose): segmented control deep dive 5 techniques -> 680 lines -> v32.12/research/R3_segmented.md
- R1 recommended A3 (micro stacked bar + 3 chips), B2 (32px pill no label), C-Pat2 (Material 3 choice chip row per-model tint)
- R3 recommended T1 (sliding pill with native radios + :has()) - REJECTED in favor of R1 because per-model colors are core language since v32.5
- R2 confirmed clean refactor boundary: only pokazInfoPr lines 6578 (delete) + 6579-6583 (replace), all CSS / showND / showZazn untouched

### 2026-04-10 - Phase C (design)
- DESIGN_SPEC.md - DD01 micro bar + chips, DD02 32px pill, DD03 Material 3 choice chips, DD08 APCA option-2 fallback (label at --t2 rest, colored only hover+active), DD05 keep all .ds-mdl-btn CSS for other sidebars
- LAYOUT_SPEC merged into DESIGN_SPEC for context efficiency

### 2026-04-10 - Phase D (implementation)
- Title v32.11 -> v32.12
- Added .ds-comp* / .ds-cmd / .ds-mdl-row / .ds-mdl-chip CSS classes after .ds-mdl-btn:focus-visible (line 1400-onwards), ~70 lines
- Added I18N_EN entries: 'Sklad modeli', 'Skopiuj komende', 'Skopiowano', 'Zmien model dla wszystkich agentow presetu'
- Patched pokazInfoPr (lines 6566-6584):
  - Added compHtml computation between mc count and innerHTML (tot + pct + 3-chip + bar)
  - Added domModel computation for active state on compact chips
  - Injected compHtml inside .ds-avatar-info after .ds-role
  - REMOVED CLAUDE CODE COMMAND ds-block label + helper text
  - REPLACED with .ds-cmd 32px pill (SVG clipboard, title tooltip, cmd-flash on copy)
  - REMOVED middle SKLAD ds-block entirely
  - REPLACED ZMIEN MODEL ds-block with .ds-mdl-row radiogroup + 3 .ds-mdl-chip buttons
- Patched kopiujCmd to add .is-copied class toggle + announce()
- Version bumps: title v32.12, eksportujKfg v='32.12', buildCostJSON version='32.12'
- localStorage: replace_all acV32_11_custom -> acV32_12_custom (5 occurrences via Edit), migration chain extended with v32_11 fallback

### 2026-04-10 - Phase E (QA + ship)
- node JS parse: 1/1 blocks, 0 errors, 786251 chars, 7476 lines (+77 from v32.11's 7399)
- grep audit:
  - .ds-comp / .ds-cmd / .ds-mdl-row / .ds-mdl-chip CSS present (lines 1405-1485)
  - compHtml computed line 6622, injected in header line 6637
  - domModel computed line 6634
  - .ds-cmd button render line 6645+ (16 ds-cmd occurrences)
  - .ds-mdl-row radiogroup line 6652 (3 .ds-mdl-row + 22 .ds-mdl-chip occurrences total)
  - t('SKLAD') / t('ZMIEN MODEL') / t('CLAUDE CODE COMMAND') REMOVED from pokazInfoPr (only in i18n table = OK)
  - .ds-mdl-btn render: 6 occurrences (3 in pokazWezel agent sidebar + 3 in pokazZazn multi-select) - PRESERVED
  - .ds-mdl-big render: 2 occurrences (lines 5781 + 5923 in showND + showZazn) - PRESERVED
  - PRESET_GREEN_PL / PRESET_RED_PL / PRESET_MID_PL / PRESET_LONG_PL all preserved
  - vd-col fit (v32.11 verdict panel) preserved
  - .side-r width:360px preserved
  - Title v32.12 PASS, eksportujKfg v='32.12' PASS, buildCostJSON version='32.12' PASS
  - acV32_12_custom 5x present + ladujCustomAgentow migration chain extended with v32_11
- Stan: SHIPPED
- NIE kopiowano do index.html - mirror odroczony per workflow

### 2026-04-10 - Patch: Encyclopedia CTA rich (R4)
- User feedback: przycisk "Encyklopedia presetu" nie zacheca do kliknienia, za plaski, brak scent of discovery
- R4 researcher (general-purpose, background): 485 lines -> v32.12/research/R4_encyclopedia_cta.md
  - Baseline audit (6 root causes: APCA Lc ~62 borderline, undersized, category copy, invisible pulse, no info scent, merges into chip row)
  - Topic 1: 8 copy candidates (Polish+EN). Winner C3: "Pelna encyklopedia" + subtitle "N sekcji - jak uzywac, anti-patterns, fakty"
  - Topic 2: 7 visual recipes (split-card, conic ring, frosted hero, shimmer, KBD pill, badge count, bento tiles) z drop-in CSS
  - Topic 3: 5 micro-interactions (arrow nudge, one-shot shimmer, breathing glow, icon shuffle, chip stagger) + reduced-motion
  - Topic 4 recommended combo: P1 split-card + C3 copy + M1 arrow nudge + M3 breathing glow + M2 one-shot shimmer
- Implementation (scoped to .btn-learn.is-rich to NIE dotknac agent buttons na liniach 5812/5827):
  - Dodane ~22 linii CSS po istniejacym .btn-learn block (1204-1206): .btn.btn-learn.is-rich grid 38/1fr/22 + bl-icon/eyebrow/title/sub/arrow + ::after shimmer + light theme override + @media prefers-reduced-motion + @keyframes blBreath + @keyframes blSweepOnce
  - Shimmer one-shot realizowany przez animation na ::after z 'forwards' - odpala sie naturalnie przy insercie elementu do DOM (pokazInfoPr innerHTML), nie wymaga JS class toggle
  - Markup rozbudowany z plain text button na grid z bl-icon/eyebrow/title/sub/svg-arrow, aria-label, type="button", svg chevron stroke-width:2 linecap:round zgodny z AGENT_SVG
  - 4 nowe I18N_EN klucze: ENCYKLOPEDIA, Pelna encyklopedia, sekcji-..., Otworz pelna encyklopedie presetu
- APCA: title #F2F2F8 na #16162A Lc 98.5, eyebrow #C9C9DE Lc 82, sub #C2C2D4 Lc 74.8, arrow #C4B5FD Lc 77 - wszystkie >= 75 body floor
- QA: node JS parse 1/1 blokow 0 errors, 790374 chars, 7503 linie (+27 od shipu)
- Agent encyklopedia buttons (linie 5812/5827) nietkniete - zachowuja stary flat layout
- Wersja pozostaje v32.12 (mala poprawka, nie nowa wersja)
