# R5: Agent Data Layer Completeness Audit

**File:** v32.13/AGENT_TEAMS_CONFIGURATOR_v32_13.html (7503 lines)

## 1. AGENT_KNOWLEDGE audit (lines 2940-3661)

ALL 35 AGENTS COMPLETE. No sparse entries. Typical shape:
- `who`: 1-2 sentences
- `analogy`: 1 sentence metaphor
- `does[]`: 4-7 action bullets
- `doesNot[]`: 3-5 negations
- `antiPatterns[]`: 2-4 pitfalls
- `facts[]`: 3-4 facts

Sample counts (representative): orchestrator (5/5/2/3), synthesizer (5/3/2/3), analyst (5/3/2/3), res_tech (4/3/2/3), backend (7/3/2/3), decision_presenter (4/3/2/3), db_architect/telemetry_surfer (5/3/2/3).

## 2. Full agent list (AD array, lines 4153-4320)

**Total: 35 agents** (28 base + 7 new from v32.6).

- Strategy (4): orchestrator, synthesizer, analyst, planner
- Research (8): res_tech, res_ux, res_reddit, res_x, res_github, res_forums, res_docs, res_critic
- Build (11): backend, frontend, feature, designer, integrator, writer, db_architect, observability_engineer, gtm_strategist, control_mapper, telemetry_surfer
- QA (4): qa_security, qa_quality, qa_perf, qa_manager
- Five Minds (5): expert_pragmatist, expert_innovator, expert_analyst, expert_user, expert_devil
- HITL (1): decision_presenter
- Data (2): statistician, eda_analyst

## 3. Polish constants for agents - CHECK

grep(AGENT_LONG_PL|AGENT_GREEN_PL|AGENT_RED_PL|AGENT_MID_PL|AGENT_VERDICT|AGENT_DESC_PL) = 0 matches.

**NONE EXIST.** Must be created in Phase D.

## 4. I18N_EN coverage (lines ~4558+)

Agent-adjacent objects present:
- `agentNames`: 35 entries
- `agentDescs`: 35 entries
- `prompts`: 35 entries
- `knowledge`: partial (may be sparse)
- `agentCats`: category labels

Missing i18n keys for sidebar render:
- KIM JEST (will need EN), CO ROBI, CZEGO NIE ROBI - check
- ANTI-PATTERNS, CIEKAWOSTKI - NOT labeled yet
- "Nadaje sie do" / "Nie dla" - already present (preset verdict uses them)
- SZCZEGOLOWY OPIS - already present (preset uses it)
- KIEDY UZYWAC - already present

Labels likely needing NEW EN entries:
- ANTY-WZORCE / ANTI-PATTERNS
- CIEKAWOSTKI / FUN FACTS or CURIOSITIES
- Rich CTA copy: "ENCYKLOPEDIA" "Pelna encyklopedia" "6 sekcji - ..." (preset reuses 5, agent needs 6 sections)

## 5. Helper functions (lines 5421-5431)

```js
function getAgentName(id)   // EN i18n -> AD.name -> id
function getAgentDesc(id)   // EN i18n -> AD.role -> ''
function getAgentPrompt(id) // EN i18n -> AD.p -> ''
function getAgentKnowledge(id)  // EN i18n -> AGENT_KNOWLEDGE[id]
function getCatLabel(pl)    // EN i18n -> pl fallback
```

All check `currentLang === 'en'` first. **To add in Phase D** (optional - can use direct access):
- getAgentLongPl(id)
- getAgentMidPl(id)
- getAgentGreenPl(id)
- getAgentRedPl(id)

## 6. Preset parallel templates (ready for mirror)

- PRESET_KNOWLEDGE (lines 3666-3962): 41 entries, narrative + arrays
- PRESET_LONG_PL (lines 3967-4010): 41 HTML entries
- PRESET_MID_PL (lines 4015-4058): 41 plain text entries
- PRESET_GREEN_PL (lines 4061-4104): 41 array entries (4-5 bullets)
- PRESET_RED_PL (lines 4105-4148): 41 array entries (3-4 bullets)

**Mirror 1:1 for agents.**

## 7. Gap summary for Phase D

1. Create AGENT_LONG_PL (~120 lines): 35 agents x 3-4 paragraph HTML each. Source: AGENT_KNOWLEDGE + notebookLM synthesis
2. Create AGENT_MID_PL (~60 lines): 35 x 1-2 sentence plain. Source: who + analogy synthesis
3. Create AGENT_GREEN_PL (~70 lines): 35 x 4-5 bullet array. Source: does + facts selection
4. Create AGENT_RED_PL (~60 lines): 35 x 3-4 bullet array. Source: doesNot + antiPatterns selection
5. Optional: add new i18n labels (ANTI-PATTERNS, CIEKAWOSTKI, rich CTA copy for agent)
6. Optional: helper functions (getAgentLongPl etc.)

## Verification

| Metric | Current | Target | Gap |
|--------|---------|--------|-----|
| Agents in AGENT_KNOWLEDGE | 35 | 35 | 0 |
| AGENT_LONG_PL entries | 0 | 35 | 35 |
| AGENT_MID_PL entries | 0 | 35 | 35 |
| AGENT_GREEN_PL entries | 0 | 35 | 35 |
| AGENT_RED_PL entries | 0 | 35 | 35 |
| Helper functions for new constants | 0 | 4 (or use direct) | 4 |

**Conclusion:** Phase D (data layer) is entirely content-generation work + simple constant definitions. No architectural changes. notebookLM MD files are the richest content source for LONG and enrichment.
