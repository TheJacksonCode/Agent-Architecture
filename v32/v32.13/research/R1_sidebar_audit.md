# R1: Sidebar Audit - Agent vs Preset Detail Panels

**File:** `C:/Projekty Claude Code/Agent_Architecture/v32.13/AGENT_TEAMS_CONFIGURATOR_v32_13.html`
**Generated:** 2026-04-10

## 1. PRESET SIDEBAR MAP (`pokazInfoPr`, lines 6635-6687)

| Section | Lines | Label | CSS Classes | Data | Purpose |
|---------|-------|-------|-------------|------|---------|
| Featured Banner (optional) | 6657 | `ULTIMATE PRESET` | `.show` | isFeatured | Gold gradient header for flagship |
| Avatar Card | 6658 | agent count + phase | `.ds-card .ds-avatar .ds-avatar-orb .ds-avatar-info .pr-tier-new` | getPresetName, m.c, m.tier | Rich header |
| Composition Bar + Chips | 6643-6652 | (implicit SKLAD) | `.ds-comp .ds-comp-bar .s-op/so/ha .ds-comp-chips .ds-comp-chip .c-op/so/ha` | mc.opus/sonnet/haiku | 6px stacked bar + 3 count pills |
| KIEDY UZYWAC | 6660 | t('KIEDY UZYWAC') | `.ds .ds-l` (haiku colored) | PRESET_MID_PL[pid] | Haiku-tinted gradient box |
| Verdict Panel | 6661-6664 | t('Nadaje sie do')/(Nie dla') | `.ds.vd .vd-col.fit/.nofit .vd-head .vd-list` | PRESET_GREEN_PL / PRESET_RED_PL | Dual column green/red with SVG bullets |
| SZCZEGOLOWY OPIS | 6665 | t('SZCZEGOLOWY OPIS') | `.ds.ds-longdesc <details> .ds-longdesc-body` | PRESET_LONG_PL[pid] | Collapsible details (sonnet chevron) |
| Command Pill | 6667-6671 | (copy) | `.ds-cmd code .cmd-icon .cmd-flash` | pid.replace(_,-) | 32px pill /preset-name |
| Model Switcher Compact | 6673-6680 | aria only | `.ds-mdl-row .ds-mdl-chip .m-opus/sonnet/haiku role=radiogroup` | zmienWszModel | 36px 3-chip tinted row |
| Rich Encyclopedia CTA | 6681-6687 | t('ENCYKLOPEDIA')/Pelna encyklopedia | `.btn.btn-learn.is-rich .bl-icon .bl-eyebrow .bl-title .bl-sub .bl-arrow` | otworzEncykl | 4-cell grid + shimmer + breath |

### Verdict Panel CSS (lines 1161-1174) - GENERIC, NOT PRESET-SCOPED
- `.vd-col.fit` green (haiku RGB), `.vd-col.nofit` red (qa RGB)
- Radial gradients 140% 80% asymmetric + inset colored borders
- `.vd-head::before` checkmark/X content
- `.vd-list li::before` SVG background icons
- **REUSABLE FOR AGENT AS-IS** (no rescoping needed)

## 2. AGENT SIDEBAR MAP (`pokazWezel`, lines 5791-5834)

| Section | Lines | Label | CSS | Data | Purpose |
|---------|-------|-------|-----|------|---------|
| Avatar Card | 5798 | (name+role) | `.ds-card .ds-avatar .ds-avatar-orb.ph-* .ds-avatar-info .ds-role` | getAgentName, getCatLabel, getAgentDesc | Phase-colored orb 32px |
| Tools | 5800 | NARZEDZIA | `.ds .ds-l .ds-tools-list .ds-tool-chip` | d.tools.split(',') | Tool pills |
| Model Selector OLD | 5802-5806 | MODEL | `.ds-mdl-big .ds-mdl-btn .m-* .mdl-dot .mdl-name .mdl-meta` | zmienModel | 3 VERTICAL stacked buttons ~140px |
| Context Budget | 5808-5814 | Wykorzystanie kontekstu | `.ds-ctx-box.ctx-* .ds-ctx-hdr .ds-ctx-pct .ds-ctx-bar .ds-ctx-meta` | calcAgentCtx | Severity badge + bar |
| Load Meter | 5816 | OBCIAZENIE | inline | d.load | 6px bar + BOTTLENECK warning |
| Cost | 5817 | KOSZT | inline monospace | calcAgentCost | "~$X.XXXX / wywolanie" |
| Connections Out | 5819 | WYJSCIA | `.ds .ds-conn-section .ds-conn-row .ds-cn-d` | conns.filter | arrow + name + delete |
| Connections In | 5820 | WEJSCIA | same | reversed | same |
| KIM JEST | 5824 | KIM JEST | inline styles | getAgentKnowledge.who | Plain 10px sparse |
| CO ROBI | 5825 | CO ROBI | inline ul + checkmark | _kn.does.slice(0,3) | 3 bullets inline |
| CZEGO NIE ROBI | 5826 | CZEGO NIE ROBI | inline ul + X | _kn.doesNot.slice(0,3) | 3 bullets inline |
| Prompt Display | 5829 | PROMPT AGENTA | `.ds .ds-prompt` | nd.cp OR getAgentPrompt | Read-only 200px |
| Prompt Editor | 5831 | EDYTUJ PROMPT | `.ds .ds-ta id=nP` | editable | 100px textarea |
| Flat Learn Button | 5833 | Encyklopedia agenta | `.btn.btn-learn` (NOT .is-rich) | otworzEncykl agent | Flat gradient |

## 3. PALETTE VARIANT (`pokazDef`, lines 5836-5850)
Read-only variant without: ctx box, model selector (uses .ds-v), prompt editor.
Adds: "+ Dodaj", "Auto-dodaj", "Edit" buttons.
Same flat `.btn-learn`.

## 4. DELTA MATRIX

| Section | Preset | Agent | Reusable CSS | Action |
|---------|--------|-------|--------------|--------|
| SKLAD composition bar | YES | NO | .ds-comp* | SKIP (agents aren't compositions) |
| KIEDY UZYWAC card | YES | NO | .ds .ds-l | ADD with AGENT_MID_PL |
| VERDICT PANEL dual-col | YES | NO | .ds.vd .vd-col* .vd-head .vd-list | **CRITICAL ADD** with AGENT_GREEN_PL + AGENT_RED_PL |
| SZCZEGOLOWY OPIS | YES | NO | .ds-longdesc details | **ADD** with AGENT_LONG_PL |
| Command Pill | YES | NO | .ds-cmd* | SKIP (no CLI for agents) |
| Compact model row | YES (.ds-mdl-row) | NO (uses .ds-mdl-big stack) | .ds-mdl-row .ds-mdl-chip | **HIGH: REPLACE** .ds-mdl-big |
| Rich CTA .is-rich | YES | NO (flat) | .btn-learn.is-rich .bl-* | **HIGH: REPLACE** flat btn-learn |
| Ctx budget | NO | YES | .ds-ctx-box* | KEEP agent-only |
| Load meter | NO | YES | inline | KEEP agent-only |
| Connections | NO | YES | .ds-conn-* | KEEP agent-only |
| Knowledge KIM/CO/NIE | NO | YES sparse inline | (none, needs class) | ENHANCE with classes + richer data |
| Prompt edit textarea | NO | YES | .ds-ta | KEEP agent-only |

## 5. CSS CLASS INVENTORY

### Reusable without change for agent sidebar:
- `.ds` (1127), `.ds-l` (1128), `.ds-v` (1129)
- `.ds-card` (1130-1134)
- `.ds-avatar` (1181), `.ds-avatar-orb` (1182-1183), `.ds-avatar-orb.ph-*` (1016-1021, phase-colored glow)
- `.ds-avatar-info h4` (1184), `.ds-role` (1185)
- `.ds-comp*` (1426-1440) - preset only, could be reused if needed
- `.ds-mdl-big` / `.ds-mdl-btn` (1401-1411) - current agent, will be replaced
- `.ds-mdl-row` / `.ds-mdl-chip` (1454-1472) - **TO ADOPT FOR AGENT**
- `.ds-ctx-box*` (489-501) - agent only
- `.vd .vd-col .vd-col.fit .vd-col.nofit .vd-head .vd-list` (1161-1174) - **TO ADOPT FOR AGENT**
- `.ds-longdesc .ds-longdesc > summary .ds-longdesc-body` (1146-1155) - **TO ADOPT FOR AGENT**
- `.ds-tools-list .ds-tool-chip` (1195-1196)
- `.ds-conn-section .ds-conn-row .ds-cn-d` (1192-1201) - agent only
- `.ds-prompt` (1188), `.ds-ta` (1189-1190)
- `.btn-learn` (1204-1205) - flat baseline
- `.btn-learn.is-rich .bl-icon .bl-eyebrow .bl-title .bl-sub .bl-arrow` (1208-1227) - **TO ADOPT FOR AGENT**

## 6. WIDTH / LAYOUT

- `.side-r` 360px base, 260px @1100, 220px @900, hidden @700 (lines 1121, 1363-1365)
- Sufficient for dual-column verdict (preset proves it)
- Content scrolls inside `#srS`

## 7. CONSTANTS FOUND

- PRESET_MID_PL (lines 4015-4058) ~44 entries, Polish 1-2 sentence
- PRESET_GREEN_PL (lines 4061-4103) ~44 entries, arrays 4-6 bullets
- PRESET_RED_PL (lines 4105-4147) ~44 entries, arrays 4-5 bullets
- PRESET_LONG_PL (lines 3967-4013) ~44 entries, HTML-safe 2-4 paragraphs
- **NO AGENT_*_PL equivalents exist** - must be created in Phase D

## KEY GAPS TO CLOSE IN v32.13 (in order)

1. **CRITICAL:** Verdict panel - needs AGENT_GREEN_PL + AGENT_RED_PL data + markup in pokazWezel
2. **CRITICAL:** SZCZEGOLOWY OPIS card - needs AGENT_LONG_PL data + .ds-longdesc reuse
3. **HIGH:** KIEDY UZYWAC mid card - needs AGENT_MID_PL + .ds .ds-l reuse
4. **HIGH:** Replace .ds-mdl-big stack with .ds-mdl-row compact chips (markup change only)
5. **HIGH:** Replace flat .btn-learn with .btn-learn.is-rich rich CTA (markup change only)
6. **MEDIUM:** Enrich KIM JEST/CO ROBI/CZEGO NIE ROBI with full notebookLM content (not 3 bullets truncated)
7. **LOW:** Add CIEKAWOSTKI + ANTI-PATTERNS sections (already in AGENT_KNOWLEDGE, just not rendered)
