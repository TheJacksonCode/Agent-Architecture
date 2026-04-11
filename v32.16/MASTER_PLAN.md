# v32.16 Universal Bilingual - MASTER PLAN

## Cel

Uzupelnienie tlumaczen EN dla wszystkich pol tekstowych, ktore w v32.15 istnialy tylko po polsku. Po v32.16 przelacznik PL/EN pokrywa 100% widocznego contentu - bez zostawionych po polsku fragmentow w sidebar, encyklopedii agentow i presetow.

## Kontekst i luka v32.15

I18N_EN juz pokrywa 19 namespace'ow (ui, agentNames, agentDescs, prompts, knowledge, presetKnowledge, speech, presetNames, presetDescs, presetLongDescs, presetUse, presetPros, presetCons, phases, agentCats, presetCats, glossary, hitl).

BRAKUJACE EN:

| Constant | Entries | Fields/entry | Miejsce w UI |
|---|---|---|---|
| AGENT_EDU_PL | 35 | 18 | encyklopedia agenta (bento V14) |
| PRESET_EDU_PL | 42 | 18 | encyklopedia presetu (bento V15) |
| AGENT_LONG_PL | 35 | 1 string | sidebar agenta - szczegolowy opis |
| AGENT_MID_PL | 35 | 1 string | sidebar agenta - opis skrocony |
| AGENT_GREEN_PL | 35 | 1 string | sidebar agenta - zielona karta kiedy uzywac |
| AGENT_RED_PL | 35 | 1 string | sidebar agenta - czerwona karta kiedy NIE |
| PRESET_LONG_PL | 42 | 1 string | sidebar presetu - szczegolowy opis |
| PRESET_MID_PL | 42 | 1 string | sidebar presetu - opis skrocony |
| PRESET_GREEN_PL | 42 | 1 string | sidebar presetu - zielona karta |
| PRESET_RED_PL | 42 | 1 string | sidebar presetu - czerwona karta |

Suma: ~1694 pol do przetlumaczenia.

## Architektura

1. **I18N_EN** rozszerzony o 10 nowych namespace'ow: eduAgent, eduPreset, agentLong, agentMid, agentGreen, agentRed, presetLong, presetMid, presetGreen, presetRed.
2. **10 nowych dispatcherow** w sekcji getterow (ok. linia 12300): `getAgentEdu(aid)`, `getPresetEdu(pid)`, `getAgentLong(aid)`, `getAgentMid(aid)`, `getAgentGreen(aid)`, `getAgentRed(aid)`, `getPresetLong(pid)`, `getPresetMid(pid)`, `getPresetGreen(pid)`, `getPresetRed(pid)`.
3. **Patch renderow** - wszystkie miejsca ktore obecnie czytaja `AGENT_EDU_PL[aid]`, `PRESET_EDU_PL[pid]`, `AGENT_LONG_PL[aid]` itd. zostaja przestawione na getter dispatchera.
4. **Content** osobno w plikach `v32.16/build/*_EN.js`, po agregacji injectowane atomowo przez `inject16.py`.

## Fazy

### Phase A - Setup + ekstrakcja PL (DONE)
- Utworzone: v32.16/{research,plans,build}
- Skopiowany baseline v32.15 -> v32.16/AGENT_TEAMS_CONFIGURATOR_v32_16.html
- Wyekstraktowane 10 plikow pl_src_*.js
- Splity batch source: pl_batch_agent_A1..A7 (35 agentow / 7) + pl_batch_preset_P1..P7 (42 presety / 7)

### Phase B - Parallel translation batches (18 agentow rownolegle)

**B1 - EDU_AGENT (7 batchy)**
- A1: orchestrator, synthesizer, analyst, planner, res_tech
- A2: res_ux, res_reddit, res_x, res_github, res_forums
- A3: res_docs, res_critic, backend, frontend, feature
- A4: designer, integrator, writer, qa_security, qa_quality
- A5: qa_perf, qa_manager, expert_pragmatist, expert_innovator, expert_analyst
- A6: expert_user, expert_devil, decision_presenter, db_architect, observability_engineer
- A7: gtm_strategist, statistician, eda_analyst, control_mapper, telemetry_surfer
- Output: `edu_agent_en_batch_A1..A7.js`

**B2 - EDU_PRESET (7 batchy)**
- P1: solo, quick_fix, recon, trio, reflect, bug_hunt
- P2: content, plan_exec, perf_boost, startup, cascade, test_suite
- P3: a11y, review, security, design_sys, api_modern, ui_overhaul
- P4: feature_sprint, standard, data_pipe, research, legacy, saas
- P5: microservices, full, deep, five_minds, deep_five_minds, deep_research_swarm_pro
- P6: migration_crew, fullstack_premium, security_multi_vector, perf_squad, prd_to_launch, ab_test_lab
- P7: kb_constructor, tech_writing_pipe, five_minds_strategic, soc2_sweep, data_analysis_pipe, incident_war_room
- Output: `edu_preset_en_batch_P1..P7.js`

**B3 - AGENT sidebar (2 batchy)**
- AS1: first 18 agents (LONG+MID+GREEN+RED each = 72 stringow)
- AS2: last 17 agents (68 stringow)
- Output: `agent_sidebar_en_batch_AS1.js`, `agent_sidebar_en_batch_AS2.js`

**B4 - PRESET sidebar (2 batchy)**
- PS1: first 21 presets (84 stringow)
- PS2: last 21 presets (84 stringow)
- Output: `preset_sidebar_en_batch_PS1.js`, `preset_sidebar_en_batch_PS2.js`

### Phase C - Aggregation
- Merge 18 batch files do finalnego `I18N_EN_V16_EXTENSIONS.js` z 10 namespace'ami.
- Verify key count (35+42+35x4+42x4 = 1694 stringow).
- node --check na wszystkich plikach.

### Phase D - inject16.py (atomic mutations)
1. Title v32.15 -> v32.16
2. Insert 10 nowych namespace'ow do I18N_EN (przed ui)
3. Dodaj 10 dispatcherow (po istniejacych getterach)
4. Patch rysujBentoAgentaV14 - czytaj przez getAgentEdu zamiast AGENT_EDU_PL[aid]
5. Patch rysujBentoPresetV15 - getPresetEdu zamiast PRESET_EDU_PL[pid]
6. Patch pokazWezel / pokazDef - getAgentLong/Mid/Green/Red
7. Patch pokazInfoPr - getPresetLong/Mid/Green/Red
8. Banner v32.15 Universal -> v32.16 Bilingual
9. buildCostJSON version 32.15 -> 32.16
10. eksportujKfg v 32.15 -> 32.16
11. localStorage acV32_15_custom -> acV32_16_custom + chain extension

### Phase E - QA + Ship
- JS parse 1/1 blocks OK
- Diacritic audit (PL strings zachowane bez diakrytykow, EN strings mozna z diakrytykami ale BEZ em/en-dashes)
- Key count audit na kazdym nowym namespace
- Spot-check: 5 losowych agentow + 5 losowych presetow w trybie EN
- Mirror v32.16 -> index.html
- Update PROGRESS.md + memory project_v32_16_status.md

## Constrainty (ABSOLUTE)

1. **US English** (optimize/color/behavior, not optimise/colour/behaviour)
2. **NO em-dashes, NO en-dashes** - tylko zwykle `-`
3. **Ton zgodny z PL** - techniczny, direct, "top of the top", bez corporate fluff
4. **Zachowaj strukture** - identyczne klucze, identyczna kolejnosc pol, identyczne typy (array stays array, object stays object)
5. **Zachowaj ID** w relatedAgents/relatedPresets - to sa techniczne identyfikatory, nie tlumaczymy
6. **Escape JS apostrofow** - `don\\'t`, `it\\'s`
7. **Nie dodawaj i nie usuwaj pol** - 18 pol in, 18 pol out
8. **Zachowaj dlugosci** - jesli PL ma 7 items w `does`, EN tez ma 7 items
