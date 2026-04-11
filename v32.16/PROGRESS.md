# v32.16 PROGRESS LOG

Source of truth for v32.16 "Universal Bilingual".

## Status: SHIPPED

5700295 bytes, 27415 lines, JS parse 1/1 blocks OK, 0 em/en-dashes. I18N_EN extended from 18 to 28 namespaces. 10 new EN namespaces with 385 top-level keys (35+42+35+35+35+35+42+42+42+42) covering ~1694 translated fields. Mirrored to index.html.

## Log

### 2026-04-11 - Phase A complete
- Created v32.16/{research,plans,build}
- Copied v32.15 HTML -> v32.16 baseline (4981965 bytes)
- Extracted 10 PL source files: pl_src_AGENT_EDU_PL.js (232316B), pl_src_PRESET_EDU_PL.js (291035B), 4 AGENT_*_PL (4k-22k), 4 PRESET_*_PL (5k-55k)
- Split EDU files into 14 batch source files (pl_batch_agent_A1..A7 + pl_batch_preset_P1..P7)
- MASTER_PLAN.md written
- 35 agents + 42 presets confirmed via indent=2 regex

### 2026-04-11 - Phase B complete (18 parallel translation batches)
- 7 EDU_AGENT batches (A1..A7): 35 agents x 18 fields each, all verified
- 7 EDU_PRESET batches (P1..P7): 42 presets x 18 fields each, all verified
- 2 AGENT sidebar batches (AS1 first 18, AS2 last 17): 4 sub-objects each (LONG/MID/GREEN/RED)
- 2 PRESET sidebar batches (PS1 first 21, PS2 last 21): 4 sub-objects each
- 0 em/en-dashes across all 18 batch files
- Total translated: 385 top-level entries across 10 namespaces

### 2026-04-11 - Phase C complete (aggregation)
- agg_edu_agent_en.js: 236195B, 35 entries, parse OK
- agg_edu_preset_en.js: 295077B, 42 entries, parse OK
- agg_sidebar_en_merged.json: 120250B (8 sub-namespaces via JS Object.assign)
- I18N_EN_V16_EXTENSIONS.js: 716329B final fragment, 10 namespaces, parse OK, types preserved (string/array)

### 2026-04-11 - Phase D complete (injection)
- inject16.py executed 12 mutations:
  1. Title v32.15 -> v32.16 Universal Bilingual
  2. Inserted 10 EN namespaces at top of I18N_EN (before agentNames)
  3. Patched 4 existing agent sidebar getters (getAgentLongPl/MidPl/GreenPl/RedPl) to be lang-aware
  3b. Added 6 new getters: getAgentEdu, getPresetEdu, getPresetLongPl, getPresetMidPl, getPresetGreenPl, getPresetRedPl
  4. rysujBentoAgentaV14 -> reads via getAgentEdu dispatcher
  5. rysujBentoPresetV15 -> reads via getPresetEdu dispatcher
  6-8. pokazInfoPr MID + verdict panel (GREEN/RED) + LONG description all patched to getters
  9. V15 renderer deep-dive pgn/prd -> dispatcher
  10. Agent banner text v32.15 Encyklopedia Universal -> v32.16 Universal Bilingual
  11. buildCostJSON version 32.15 -> 32.16, eksportujKfg v 32.15 -> 32.16
  12. localStorage acV32_15_custom -> acV32_16_custom + migration chain extended

### 2026-04-11 - Phase F (UI chrome fix pass)
User QA found that while all DATA constants were translated, the UI labels hardcoded inside render function bodies were still Polish. Reported untranslated: 'przyklad z zycia', 'kiedy zawodze', 'ciekawostki', 'scenariusz', 'zanurkuj', 'sklad zespolu', 'agenci w zespole', plus Cost Command Center chrome. Fixed IN v32.16 (no new version).
- Added 63 new I18N_EN.ui entries: encyclopedia section kickers (DLACZEGO JA, JAK PRACUJE, META, CO UMIEM, CZEGO NIE, PRZYKLAD Z ZYCIA, KIEDY ZAWODZE, CIEKAWOSTKI, ZANURKUJ, Scenariusz, Techniczne szczegoly, NASTEPNY AGENT/PRESET, ZESPOL, DLACZEGO TEN PRESET, JAK DZIALA, CO OSIAGASZ, CZEGO NIE OSIAGNIESZ, Sklad zespolu + przeplyw + porownanie, Przeplyw faz, Agenci w zespole, Zielone swiatlo, Czerwone swiatlo, Koszt, Scenariusz, faza/fazy/faz plural, Koszt est., Wzorzec, Tokens, etc.) + cost modal gap chrome (Tok In/Out, Cached, Cost p50/p90, total p50, brak, do, (p90), avg, est. cache:, Breakdown kosztow per agent, Rozklad kosztow na fazy, Klikaj naglowki..., Cached = wejscie...).
- inject16_ui.py executed 56 atomic mutations wrapping hardcoded PL strings in `t('...')` across rysujBentoAgentaV14, rysujBentoPresetV15, pokazInfoPr, renderCbmOverview, renderCbmBreakdown, renderCbmWhatif, renderCbmExport, cbmDownload.
- V15 banner fixed: "v32.15 Encyklopedia Universal" -> "v32.16 Universal Bilingual" (was still showing old text).
- JS parse verified: 1/1 blocks OK, 5730690 bytes, 27478 lines, 0 em/en-dashes.
- Mirrored to index.html (cmp identical).

### 2026-04-11 - Phase E complete (QA + ship)
- JS parse: 1/1 blocks OK
- em/en-dash audit: 0
- I18N_EN namespace audit: 28 total (18 existing + 10 new). Per-namespace counts verified:
  - eduAgent: 35, eduPreset: 42
  - agentLong/Mid/Green/Red: 35 each
  - presetLong/Mid/Green/Red: 42 each
- Spot checks: eduAgent.orchestrator.tagline + agentLong.orchestrator + presetGreen.solo all present in HTML
- Dispatcher function definitions verified (getAgentEdu/getPresetEdu/getPresetLongPl)
- V14/V15 renderer call-sites verified using dispatchers
- Banner text verified: "v32.16 Universal Bilingual"
- Title verified: "Agent Architecture Designer v32.16 | Universal Bilingual"
- Mirrored to C:/Projekty Claude Code/Agent_Architecture/index.html (cmp: identical, 5700295 bytes)
