# PRESET_EDU_PL entry schema - v32.15

Each preset entry is a JS object literal with 18 fields matching the agent schema but adapted for presets.

## Sources (read these for each preset)

1. **PM (team composition)** - `v32.15/build/preset_src_PM.txt` - Full PM={} object with team members, roles, connections per preset. Parse for agent count, model mix, phase structure.
2. **PRESET_KNOWLEDGE** - `v32.15/build/preset_src_PK.txt` - who/analogy/whenToUse/whenNotToUse/keyFeatures per preset. Primary content source.
3. **PRESET_LONG_PL** - `v32.15/build/preset_src_PL.txt` - detailed Polish description (~250 words) per v32.6 premium preset. Use for whoIs + missionShort + realExample.
4. **PRESET_MID_PL** - `v32.15/build/preset_src_PMID.txt` - 2-3 sentence summary per preset.
5. **PRESET_GREEN_PL** - `v32.15/build/preset_src_PGN.txt` - verdict card (when to use).
6. **PRESET_RED_PL** - `v32.15/build/preset_src_PRD.txt` - verdict card (when NOT to use).
7. **md files in notebookLM/** - full deep-dive Polish content for some presets (see mapping below).

## Preset-md mapping

- solo -> notebookLM/2.1 Preset_Solo/preset_01_solo.md
- quick_fix -> notebookLM/2.2 Preset_Quick_Fix/preset_02_quick_fix.md
- recon -> notebookLM/2.3 Preset_Recon/preset_03_recon.md
- Tier1 bundle -> notebookLM/2.0 Presety_Tier1_Minimal/presety_tier1_minimal.md (covers trio, reflect, bug_hunt)
- Tier2A bundle -> notebookLM/3.0 Presety_Tier2A_Core/presety_tier2a_core.md
- Tier2B bundle -> notebookLM/3.5 Presety_Tier2B_Core/presety_tier2b_core.md
- security -> notebookLM/4.1 Preset_Security/preset_security_hardening.md
- design_sys, api_modern -> notebookLM/4.2 Preset_Design_API/preset_design_api.md (shared)
- ui_overhaul, feature_sprint -> notebookLM/4.3 Preset_UI_Feature/preset_ui_feature.md (shared)
- standard, data_pipe -> notebookLM/4.4 Preset_Standard_Data/preset_standard_data.md (shared)
- research -> notebookLM/5.1 Preset_Research_Swarm/preset_research_swarm.md
- legacy -> notebookLM/5.2 Preset_Legacy_Refactor/preset_legacy_refactor.md
- saas -> notebookLM/5.3 Preset_SaaS/preset_fullstack_saas.md
- microservices -> notebookLM/5.4 Preset_Microservices/preset_microservices.md
- full -> notebookLM/5.5 Preset_Full_Hierarchy/preset_full_hierarchy.md
- deep -> notebookLM/5.6 Preset_Deep_Research_Build/preset_deep_research_build.md
- five_minds -> notebookLM/5.7 Preset_Five_Minds/preset_five_minds_protocol.md
- deep_five_minds -> notebookLM/5.8 Preset_Deep_Five_Minds/preset_deep_five_minds.md
- All v32.6 premium presets (deep_research_swarm_pro, migration_crew, fullstack_premium, security_multi_vector, perf_squad, prd_to_launch, ab_test_lab, kb_constructor, tech_writing_pipe, five_minds_strategic, soc2_sweep, data_analysis_pipe, incident_war_room) -> NO md, use PRESET_LONG_PL content which is already rich (~250 words each)

## Style rules (ABSOLUTE)

- Language: Polish
- NO diacritics: write `a e z s c n l o z` instead of ą ę ż ś ć ń ł ó ź
- NO em-dashes, NO en-dashes - only regular hyphens `-`
- Escape apostrophes in JS strings with backslash

## Schema (18 fields)

```javascript
preset_id: {
  tagline: 'one-line essence max 80 chars - what the preset solves in a phrase',
  missionShort: '2-3 sentences - what the preset delivers and for whom',
  whoIs: '2-3 sentences - who SHOULD reach for this preset, in what situation',
  analogy: 'one metaphor sentence - "Ten preset to jak X, ktory Y"',
  howItWorks: [
    {label: 'Faza 1 name', desc: 'What happens in phase 1 - which agents, what deliverables.'},
    {label: 'Faza 2 name', desc: '...'},
    {label: 'Faza 3 name', desc: '...'},
    {label: 'Faza 4 name', desc: '...'}
  ],
  inputs: [
    '4 items - what the user brings (problem statement, constraints, existing code, success criteria)'
  ],
  outputs: [
    '5 items - concrete deliverables (reports, code, decisions, artifacts)'
  ],
  does: [
    '7-8 capabilities - what this team accomplishes'
  ],
  doesNotDo: [
    '7 limits - what this preset skips, when to use a different preset'
  ],
  antiPatterns: [
    '5 anti-patterns - named failure modes: "Name - description"'
  ],
  keyConcepts: [
    {term: 'Concept 1', def: '1 sentence.'},
    {term: 'Concept 2', def: '1 sentence.'},
    {term: 'Concept 3', def: '1 sentence.'},
    {term: 'Concept 4', def: '1 sentence.'},
    {term: 'Concept 5', def: '1 sentence.'}
  ],
  stats: [
    {label: 'Agenci', value: 'X'},
    {label: 'Fazy', value: 'X'},
    {label: 'Koszt est.', value: '$X'},
    {label: 'Czas', value: 'X min'}
  ],
  bestFor: [
    '3 items - "Gdy..." format'
  ],
  worstFor: [
    '3 items - "Gdy..." format'
  ],
  relatedPresets: ['preset_id1', 'preset_id2', 'preset_id3'],
  glossary: [
    {term: 'term1', definition: '1 sentence.'},
    {term: 'term2', definition: '1 sentence.'},
    {term: 'term3', definition: '1 sentence.'},
    {term: 'term4', definition: '1 sentence.'},
    {term: 'term5', definition: '1 sentence.'}
  ],
  learningQuote: 'One impactful sentence about the preset philosophy.',
  realExample: 'One paragraph scenario: "Wyobraz sobie ze... - ten preset..."'
}
```

## Length targets

Same as agent schema (see SCHEMA_GUIDE.md). Stats field has a different default set for presets (Agenci, Fazy, Koszt, Czas).

## Available preset IDs for relatedPresets

solo, quick_fix, recon, trio, reflect, bug_hunt, content, plan_exec, perf_boost, startup, cascade, test_suite, a11y, security, review, design_sys, api_modern, ui_overhaul, feature_sprint, standard, data_pipe, research, legacy, saas, microservices, full, deep, five_minds, deep_five_minds, deep_research_swarm_pro, migration_crew, fullstack_premium, security_multi_vector, perf_squad, prd_to_launch, ab_test_lab, kb_constructor, tech_writing_pipe, five_minds_strategic, soc2_sweep, data_analysis_pipe, incident_war_room

## Output format

Each batch agent writes to `v32.15/build/edu_preset_batch_{name}.js`:

```javascript
// Batch: {name}
  preset_id1: { ...18 fields... },
  preset_id2: { ... },
```

No wrapper const, trailing comma on last entry.
