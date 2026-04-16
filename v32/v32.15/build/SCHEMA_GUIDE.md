# AGENT_EDU_PL entry schema - v32.15

Each agent entry is a JS object literal with exactly 18 fields. Reference implementation: `v32.14/build/AGENT_EDU_PL.js` lines 4-80 (res_reddit entry).

## Style rules (ABSOLUTE)

- Language: Polish
- NO diacritics: write `a e z s c n l o z` instead of ą ę ż ś ć ń ł ó ź
- NO em-dashes, NO en-dashes - only regular hyphens `-`
- NO semicolons except in code examples
- Use apostrophes carefully: escape with backslash if inside JS string quotes
- Keep content clear, authoritative, engaging - this is encyclopedia for learners

## Schema (18 fields)

```javascript
agent_id: {
  tagline: 'one-line essence max 80 chars - metaphor or role summary',
  missionShort: '2-3 sentences describing what the agent does, its specialty, its core value. Should feel like a short mission statement, not a job description.',
  whoIs: '2-3 sentences framing WHO the agent is as a persona - what kind of character it plays. Uses concrete analogies to human roles (journalist, archeologist, guard, etc).',
  analogy: 'One metaphor sentence. Must be a concrete visual metaphor: "Agent X is like a Y that Z". This is the quote shown in HERO under the mission.',
  howItWorks: [
    {label: 'Step name 1', desc: '1-2 sentences describing what happens in step 1.'},
    {label: 'Step name 2', desc: '1-2 sentences.'},
    {label: 'Step name 3', desc: '1-2 sentences.'},
    {label: 'Step name 4', desc: '1-2 sentences.'}
  ],
  inputs: [
    '4 items - what the agent receives as input (question, context, prior reports, constraints)'
  ],
  outputs: [
    '5 items - concrete deliverables the agent produces (report sections, formats, structures)'
  ],
  does: [
    '7-8 short sentences - concrete capabilities. Start with verbs in 3rd person singular (Finds, Identifies, Detects, Builds, Analyzes).'
  ],
  doesNotDo: [
    '7 items - explicit boundaries. Start with "Nie" (Nie czyta, Nie analizuje, Nie podejmuje). Include routing to other agents when relevant.'
  ],
  antiPatterns: [
    '5 items - named anti-patterns. Format: "English Name - Polish description of the failure mode."'
  ],
  keyConcepts: [
    {term: 'Concept 1', def: '1 sentence definition.'},
    {term: 'Concept 2', def: '1 sentence.'},
    {term: 'Concept 3', def: '1 sentence.'},
    {term: 'Concept 4', def: '1 sentence.'},
    {term: 'Concept 5', def: '1 sentence.'}
  ],
  stats: [
    {label: 'Stat label 1', value: 'value'},
    {label: 'Stat label 2', value: 'value'},
    {label: 'Load', value: 'X/100'},
    {label: 'Model', value: 'Opus|Sonnet|Haiku'}
  ],
  bestFor: [
    '3 items - "Gdy chcesz..." format, describing when to use this agent.'
  ],
  worstFor: [
    '3 items - "Gdy..." format, describing when NOT to use this agent.'
  ],
  relatedAgents: ['id1', 'id2', 'id3'],
  glossary: [
    {term: 'term1', definition: '1 sentence.'},
    {term: 'term2', definition: '1 sentence.'},
    {term: 'term3', definition: '1 sentence.'},
    {term: 'term4', definition: '1 sentence.'},
    {term: 'term5', definition: '1 sentence.'}
  ],
  learningQuote: 'One impactful sentence encapsulating the agent philosophy. No attribution.',
  realExample: 'One short paragraph (2-4 sentences) describing a first-person scenario: "Pewnego dnia przeanalizowalem X i znalazlem Y. To bylo wazne bo Z."'
}
```

## Field length targets (be specific, avoid fluff)

- tagline: 50-80 chars
- missionShort: 250-400 chars
- whoIs: 250-400 chars
- analogy: 100-200 chars
- howItWorks: 4 steps, each label 2-4 words + desc 80-150 chars
- inputs: 4 items, 30-80 chars each
- outputs: 5 items, 30-80 chars each
- does: 7-8 items, 40-100 chars each
- doesNotDo: 7 items, 40-100 chars each
- antiPatterns: 5 items, 40-120 chars each
- keyConcepts: 5 items, term 1-3 words + def 40-120 chars
- stats: 4 items, label 1-3 words + value 1-3 words
- bestFor: 3 items, 40-120 chars each
- worstFor: 3 items, 40-120 chars each
- relatedAgents: exactly 3 agent IDs from the AD list
- glossary: 5 items, term 1-2 words lowercase + definition 50-120 chars
- learningQuote: 80-180 chars
- realExample: 200-400 chars

## Available agent IDs for relatedAgents

orchestrator, synthesizer, analyst, planner, res_tech, res_ux, res_reddit, res_x, res_github, res_forums, res_docs, res_critic, backend, frontend, feature, designer, integrator, writer, qa_security, qa_quality, qa_perf, qa_manager, expert_pragmatist, expert_innovator, expert_analyst, expert_user, expert_devil, decision_presenter, db_architect, observability_engineer, gtm_strategist, statistician, eda_analyst, control_mapper, telemetry_surfer

## Agent ID to notebookLM folder mapping

- orchestrator -> notebookLM/0.1 Orkiestrator/01_orkiestrator.md
- synthesizer -> notebookLM/0.2 Syntetyk/02_syntetyk.md
- analyst -> notebookLM/0.3 Analityk/03_analityk.md
- planner -> notebookLM/0.4 planer/04_planer.md
- res_tech -> notebookLM/0.5 Resercher_tech/05_researcher_tech.md
- res_ux -> notebookLM/0.6 resercher_ux/06_researcher_ux.md
- res_reddit -> DONE (v32.14)
- res_x -> DONE (v32.14)
- res_github -> DONE (v32.14)
- res_forums -> DONE (v32.14)
- backend -> notebookLM/1.1 Koder/11_koder.md
- designer -> notebookLM/1.2 Designer/12_designer.md
- writer -> notebookLM/1.3 Redaktor/13_redaktor.md
- integrator -> notebookLM/1.4 Integrator/14_integrator.md
- qa_security -> notebookLM/1.5 QA_Security/15_qa_security.md
- qa_quality -> notebookLM/1.6 QA_Quality/16_qa_quality.md
- qa_manager -> notebookLM/1.7 Manager_QA/17_manager_qa.md
- All others -> NO md, must generate from AD prompt + role knowledge

## AD inventory

See `v32.15/build/ad_inventory.json` for each agent's cat/model/role/tools/prompt fragment.

## Output format

Each batch agent writes ONE file `v32.15/build/edu_batch_{name}.js` containing object entries (NOT wrapped in `const AGENT_EDU_PL = {...}`, just entries like):

```javascript
// Batch: {name}
  orchestrator: {
    tagline: '...',
    ...
  },
  synthesizer: {
    ...
  }
```

This will be concatenated later into the full AGENT_EDU_PL block.
