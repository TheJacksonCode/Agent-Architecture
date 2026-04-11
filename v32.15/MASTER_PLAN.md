# v32.15 "Encyclopedia Universal" MASTER PLAN

Extending v32.14 Agent Encyclopedia Premium from 4 pilot agents to ALL 35 agents + all 42 presets.

## Scope

**Agents (35):**
- 4 DONE (v32.14): res_reddit, res_x, res_github, res_forums (keep AGENT_MEDIA)
- 13 WITH md in notebookLM: orchestrator, synthesizer, analyst, planner, res_tech, res_ux, backend(koder), designer, writer(redaktor), integrator, qa_security, qa_quality, qa_manager
- 18 WITHOUT md (generate from prompt + research): res_docs, res_critic, frontend, feature, qa_perf, expert_innovator/analyst/user/devil/pragmatist, decision_presenter, db_architect, observability_engineer, gtm_strategist, statistician, eda_analyst, control_mapper, telemetry_surfer

**Presets (42):**
- 18 WITH md (solo, quick_fix, recon, security, design_api, ui_feature, standard, research, legacy, saas, microservices, full, deep, five_minds, deep_five_minds + Tier1/2A/2B bundles)
- 24 WITHOUT md (need generation: trio, reflect, bug_hunt, content, plan_exec, perf_boost, startup, cascade, test_suite, a11y, review, feature_sprint, data_pipe, 13 premium v32.6 presets)

## Non-goals

- No new infographics for non-pilot agents (AGENT_MEDIA stays only for 4 pilots)
- No PDF presentations for non-pilot agents
- No v32.14 CSS/JS infrastructure changes (V14 renderer already gracefully skips missing media)

## Phases

**A. Audit + setup (DONE)**
- Identified 35 agents + 42 presets
- V14 renderer already handles missing media via `if(media.infographic)` guards
- ENC_V14_PILOTS restriction needs fix (next-agent cycle should use AD, not 4 pilots)

**B. Parallel content extraction/generation**
- B1: Launch 4 parallel extractors for 13 md-backed agents (3-4 agents per extractor)
- B2: Launch 3 parallel generators for 18 non-md agents (6 agents per generator)
- B3: Launch 3 parallel extractors for 18 md-backed presets
- B4: Launch 2 parallel generators for 24 non-md presets (leveraging existing PRESET_KNOWLEDGE/LONG_PL/GREEN_PL/RED_PL)
- All agents output JS object literals ready to insert

**C. Aggregate + build**
- Combine all agent outputs into single AGENT_EDU_PL.js staged block
- Create PRESET_EDU_PL.js staged block (new constant, 42 entries)
- Design PRESET V15 renderer (rysujBentoPresetuV15) mirroring agent V14 10-section layout
- Update rysujBentoPresetu wrapper with feature gate

**D. Build injection**
- inject15.py atomic script:
  1. Title bump v32.14 -> v32.15
  2. Replace AGENT_EDU_PL block with expanded version
  3. Insert PRESET_EDU_PL constant after AGENT_EDU_PL
  4. Insert preset V15 renderer + wrapper JS
  5. Fix ENC_V14_PILOTS next-agent cycle
  6. Version bumps in eksportujKfg + buildCostJSON
  7. localStorage migration acV32_14 -> acV32_15

**E. QA**
- node --check JS parse
- Diacritic audit (0 Polish diacritics, 0 em-dashes)
- Integrity: all 35 AGENT_EDU_PL keys present, all 42 PRESET_EDU_PL keys present
- Spotcheck a few agents in browser (visual)
- Mirror to index.html

## Constraints

- Polish content, NO diacritics (a e z s c etc replaced with ASCII: a e z s c n l o z)
- NO em-dashes (use hyphens)
- Each AGENT_EDU_PL entry: 18 fields per v32.14 schema
- Each PRESET_EDU_PL entry: same 18-field schema adapted for presets
- Content length targets: tagline <=80 chars, missionShort 2-3 sentences, whoIs 2-3 sentences, analogy 1 metaphor sentence, howItWorks 4 steps label+desc, inputs 4, outputs 5, does 7-8, doesNotDo 7, antiPatterns 5, keyConcepts 5, stats 4, bestFor 3, worstFor 3, relatedAgents 3, glossary 5, learningQuote 1 sentence, realExample 1 paragraph
