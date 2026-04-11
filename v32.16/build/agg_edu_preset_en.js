// === V32.16: eduPreset EN (42 entries aggregated) ===
const EDU_PRESET_EN_OBJ = {
  solo: {
    tagline: 'Master and apprentice in a workshop - two agents, one task, zero overhead',
    missionShort: 'Solo + Validator is the most minimal multi-agent configuration: the Orchestrator delegates a task to a single worker and validates the result itself. It\'s built for simple bugfixes, refactors, and scripts where the solution is known and complexity is minimal.',
    whoIs: 'Reach for this preset when you have one concrete task with a known solution: a typo in code, a small bug, a tiny refactor, a CLI script, or a simple CRUD implementation. The 45% rule says that nearly half of all programming tasks fit exactly this format.',
    analogy: 'This preset is like a master and apprentice in a workshop - the master takes the order and delegates to the apprentice, then inspects the welds at the end and either signs off or points out what to fix.',
    howItWorks: [
      {label: 'Task analysis', desc: 'The Orchestrator scores complexity (S/M) and decides whether Solo is enough or escalation to a bigger preset is needed.'},
      {label: 'Narrow Context instruction', desc: 'The Orchestrator writes a precise instruction with ONLY the information needed and delegates to Backend Dev.'},
      {label: 'Implementation', desc: 'Backend Dev writes the code, adds unit tests, handles errors, and returns a ready artifact.'},
      {label: 'PASS/FAIL validation', desc: 'The Orchestrator checks correctness and alignment with requirements. PASS means delivery. FAIL means feedback and one additional iteration.'}
    ],
    inputs: [
      'Description of a concrete task (bug, refactor, script, small function)',
      'Existing code or a pointer to the file that needs to be modified',
      'Acceptance criteria (what "working" means)',
      'Optional: unit tests to guarantee'
    ],
    outputs: [
      'Ready code that fixes the bug or delivers the task',
      'Unit tests for the main path and edge cases',
      'Orchestrator PASS report with a short summary of the change',
      'List of modified files',
      'Optional: notes on remaining risks to watch'
    ],
    does: [
      'Fixes simple bugs with a known solution',
      'Refactors small fragments of code without API changes',
      'Writes automation scripts and CLI tools',
      'Implements simple CRUD in one layer of the stack',
      'Adds unit tests where they are missing',
      'Validates the result through an independent meta-agent instead of self-review',
      'Separates meta-reasoning (Opus) from code expertise (Sonnet)',
      'Minimizes cost through the absolute lack of coordination'
    ],
    doesNotDo: [
      'Does not run research (no Researcher - use Recon)',
      'Does not run a planning phase (no Planner - use Plan & Execute)',
      'Does not touch the frontend when the task is full-stack (use Trio)',
      'Does not audit security (no QA Security - use Security)',
      'Does not iterate in a fix-test loop (that\'s Quick Fix territory)',
      'Does not handle tasks that need multiple expert perspectives',
      'Does not scale beyond Small/Medium tasks'
    ],
    antiPatterns: [
      'Solo on hot path - using Solo for payment or authorization code without QA Security',
      'Solo Overreach - pushing a complex full-stack feature through 2 agents instead of escalating to Trio',
      'Infinite Retry - keeping Solo running in circles while the Orchestrator keeps returning FAIL, instead of escalating',
      'Research Skip - skipping research when the technology is unknown, making blind decisions',
      'Solo for MVP - trying to build a whole MVP with a single worker instead of using the Startup preset'
    ],
    keyConcepts: [
      {term: 'Direct Delegation', def: 'The simplest multi-agent pattern: hub with a single spoke, one two-way connection.'},
      {term: '45% Rule', def: 'Empirical observation that roughly half of programming tasks fit the 2-agent format.'},
      {term: 'Narrow Context', def: 'The rule of handing an agent ONLY the information it needs, without excess.'},
      {term: 'Model specialization', def: 'Opus for meta-reasoning, Sonnet for implementation - each model on its own turf.'},
      {term: 'Self-review vs validation', def: 'A separate validator is more reliable than your own assessment of what you just wrote.'}
    ],
    stats: [
      {label: 'Agents', value: '2'},
      {label: 'Phases', value: '2'},
      {label: 'Est. cost', value: '$0.55-1.40'},
      {label: 'Time', value: '<1 min'}
    ],
    bestFor: [
      'When you have one concrete task with a known solution and don\'t need research',
      'When you care about the lowest possible cost and fastest response time',
      'When you want to fix a typo, a small bug, or add a tiny script'
    ],
    worstFor: [
      'When the task requires understanding both the backend and the frontend (use Trio)',
      'When the task touches security-critical or payment code (use Security)',
      'When you need iterative validation in a fix-test loop (use Quick Fix)'
    ],
    relatedPresets: ['quick_fix', 'recon', 'trio'],
    glossary: [
      {term: 'orchestrator', definition: 'Strategic agent on Opus that delegates tasks and validates results, does not write code.'},
      {term: 'backend dev', definition: 'Implementation agent on Sonnet that writes code, tests, and handles errors.'},
      {term: 'POC', definition: 'Proof of Concept - a working example that demonstrates an approach is feasible.'},
      {term: 'narrow context', definition: 'Minimalist handoff of only the information needed for the task.'},
      {term: 'direct delegation', definition: 'A pattern where the Orchestrator delegates a task directly to one worker without intermediate layers.'}
    ],
    learningQuote: 'Simplicity is the highest form of sophistication - Solo does not choose simplicity because it must, but because for half of all tasks it is the best possible choice.',
    realExample: 'Imagine that you file a bug: the login form does not validate an empty email. You already know the fix - add an if-check on the frontend. This preset takes your description, the Orchestrator routes it to Backend Dev who adds validation and a regression test, and the Orchestrator confirms PASS in 30 seconds. Zero waiting, zero coordination, minimal cost.'
  },
  quick_fix: {
    tagline: 'Auto repair shop for code - fix and test over and over until it works',
    missionShort: 'Quick Fix is the smallest team with a feedback loop: Backend Dev fixes, an independent QA Quality tests, and the cycle repeats until PASS. It\'s designed for urgent bugfixes, hotfixes, and patches where a single attempt is not enough.',
    whoIs: 'Reach for this preset when you have a bug you must ship today and cannot afford regressions. Three agents in a Fix-Test Loop configuration reduce defects by 60-80% versus a one-shot run, thanks to the independent auditor after every attempt.',
    analogy: 'This preset is like an auto repair shop: the mechanic fixes the fault, the QA inspector takes it for a test drive, and if they find a problem the car goes back to the mechanic - and round and round until the inspector signs off PASS.',
    howItWorks: [
      {label: 'Intake', desc: 'The Orchestrator takes the bug report, analyzes severity and scope, and writes a precise instruction for the builder.'},
      {label: 'Fix in Narrow Context', desc: 'Backend Dev diagnoses the root cause, implements the fix, writes a regression test, and runs tests locally.'},
      {label: 'Independent test', desc: 'QA Quality runs the test suite, checks edge cases and regressions, and produces a PASS or FAIL report with concrete notes.'},
      {label: 'Loop until PASS', desc: 'If FAIL - return to step 2 with feedback. Limit 3-4 iterations, then escalate to a bigger preset.'}
    ],
    inputs: [
      'Bug report with steps to reproduce and expected behavior',
      'Existing code from the affected area plus related tests',
      'Bug severity (blocker, critical, major, minor)',
      'Acceptance criteria for PASS (what must work)'
    ],
    outputs: [
      'Fixed code with a comment explaining the root cause',
      'Regression test preventing the bug from coming back',
      'QA Quality PASS report after the loop completes',
      'List of iterations with notes on what was fixed in each round',
      'Escalation recommendation if QA keeps returning FAIL after 3-4 rounds'
    ],
    does: [
      'Fixes bugs that need continuous validation after every patch',
      'Handles hotfixes and production patches with independent verification',
      'Detects regressions through an independent auditor instead of self-review',
      'Iterates fix-test-fix until a real PASS',
      'Forces a regression test for every bug',
      'Applies Smart Model Routing - Opus for strategy, Sonnet for code, Haiku for tests',
      'Caps the iteration count and escalates when the loop does not converge',
      'Reduces defects by 60-80% versus a one-shot run'
    ],
    doesNotDo: [
      'Does not build new features (this is a FIX preset - use Feature Sprint)',
      'Does not run a research phase (use Recon if you don\'t know how to fix it)',
      'Does not touch the frontend when the fix needs UI changes (use Trio)',
      'Does not audit security in depth (use Security)',
      'Does not work without a reproducible bug report',
      'Does not handle changes across multiple modules in parallel',
      'Does not replace senior-developer code review'
    ],
    antiPatterns: [
      'Infinite Loop - the Critic keeps returning FAIL with no concrete notes and the loop spins forever',
      'Skipping Regression Test - the builder fixes the bug but does not add a test that catches its return',
      'Feature in Disguise - using Quick Fix to mask the construction of a new feature',
      'Shallow Fix - fixing the symptom instead of the root cause, guaranteeing the bug comes back',
      'Noise Escalation - escalating to a bigger preset after the first failed iteration instead of letting the loop work'
    ],
    keyConcepts: [
      {term: 'Fix-Test Loop', def: 'Iterative loop pattern where the builder fixes and an independent QA tests until PASS.'},
      {term: 'Continuous connection', def: 'Connection type where QA reports until completion, not just once.'},
      {term: 'Root cause analysis', def: 'Hunting for the actual cause of a bug rather than treating the symptoms.'},
      {term: 'Regression test', def: 'A test that prevents a fixed bug from coming back in future changes.'},
      {term: 'Smart Model Routing', def: 'Assigning a model (Opus, Sonnet, Haiku) to a role based on the stakes of the error.'}
    ],
    stats: [
      {label: 'Agents', value: '3'},
      {label: 'Phases', value: '3'},
      {label: 'Est. cost', value: '$0.60-1.50'},
      {label: 'Time', value: '1-3 min'}
    ],
    bestFor: [
      'When you have an urgent production hotfix and cannot afford regressions',
      'When the bug has many edge cases and one fix attempt is not enough',
      'When you need independent validation after every fix iteration'
    ],
    worstFor: [
      'When you are building a new feature instead of fixing a bug (use Feature Sprint)',
      'When the bug touches many modules and needs coordination across multiple builders (use Trio)',
      'When you need a research phase before the fix (use Recon)'
    ],
    relatedPresets: ['solo', 'bug_hunt', 'recon'],
    glossary: [
      {term: 'hotfix', definition: 'An urgent patch deployed directly to production outside the normal release cycle.'},
      {term: 'regression', definition: 'A situation where a new change breaks functionality that previously worked.'},
      {term: 'edge case', definition: 'An extreme usage scenario (empty input, max value, null) that often reveals bugs.'},
      {term: 'PASS/FAIL', definition: 'QA audit result - PASS means all tests passed, FAIL means another iteration is needed.'},
      {term: 'continuous', definition: 'Agent connection type where the auditor reports until the loop ends rather than just once.'}
    ],
    learningQuote: 'Feedback loops are the foundation of quality in multi-agent systems - without a loop the system runs on hope, with a loop it runs on guarantees.',
    realExample: 'Imagine that users report the Save button is broken. The Orchestrator analyzes, Backend Dev fixes a race condition on fetch, QA Quality discovers the spinner now stops on network errors and returns FAIL. Iteration 2: the builder adds error handling, QA finds a missing toast. Iteration 3: the builder fixes it, QA returns PASS. The cycle took 4 minutes.'
  },
  recon: {
    tagline: 'Scouting before the mission - first survey the terrain, then build',
    missionShort: 'Recon Squad is a three-person reconnaissance team: Researcher Tech investigates technology options, Backend Dev builds a POC from the findings, and the Orchestrator coordinates the sequential phases. It serves to explore unknown topics and validate feasibility before the main implementation.',
    whoIs: 'Reach for this preset when you face an unfamiliar technology or an unclear requirement and don\'t know how to tackle it. Instead of shooting blind, you send out a scout who checks the ground, and only then does the engineer build a foothold solution. The output is a POC, not production-ready code.',
    analogy: 'This preset is like a doctor diagnosing before treatment - first ordering tests (Research), then picking therapy from the results (Build POC), with a care coordinator (Orchestrator) making sure one step leads to the next instead of both running off in parallel directions.',
    howItWorks: [
      {label: 'Research questions', desc: 'The Orchestrator defines concrete, bounded, measurable research questions based on the user\'s problem.'},
      {label: 'Research Tech', desc: 'Researcher Tech searches docs, benchmarks, and case studies, compares at least 3 options, and produces a structured report with confidence scores.'},
      {label: 'Build POC', desc: 'Backend Dev takes the findings and builds a minimal POC demonstrating the chosen approach (1-3 files, one hypothesis).'},
      {label: 'GO/NO-GO', desc: 'The Orchestrator evaluates research completeness and POC feasibility, and issues a GO, NO-GO, or escalate-to-a-bigger-preset recommendation.'}
    ],
    inputs: [
      'A problem or research question (e.g. which multi-agent framework to pick)',
      'Context of the existing stack and technical constraints',
      'POC success criteria (what must be proven)',
      'Time budget for exploration (hours, not days)'
    ],
    outputs: [
      'Research report with TOP 3-5 options, pros/cons, and benchmarks',
      'Minimal POC in 1-3 files demonstrating the chosen approach',
      'List of identified risks (lock-in, maintenance, security)',
      'Confidence scores for the key findings',
      'GO/NO-GO recommendation with justification'
    ],
    does: [
      'Explores unknown technologies before investing in the main implementation',
      'Compares 3+ options with benchmarks and sources',
      'Builds a POC validating the chosen approach',
      'Eliminates technology-choice mistakes before the project starts',
      'Implements a mini Hub-and-Spoke pattern with one cross-spoke connection',
      'Applies Smart Model Routing - Opus for strategy, Haiku for research, Sonnet for build',
      'Forces the Research THEN Build sequence, never in parallel',
      'Saves 10 refactor hours for every hour of research'
    ],
    doesNotDo: [
      'Does not produce production-ready code (the output is a POC, not a release)',
      'Does not run multi-source research (only 1 researcher - use Research Swarm)',
      'Does not validate the POC through QA (no auditor - use Startup)',
      'Does not touch the frontend or design (no FE Dev or Designer)',
      'Does not make the final decision - it only recommends',
      'Does not replace a systems architect for large decisions',
      'Does not scale to many parallel hypotheses'
    ],
    antiPatterns: [
      'Analysis Paralysis - the Researcher researches endlessly and the POC is never built',
      'Blind Building - skipping the Researcher and jumping to implementation without validating options',
      'POC as Production - using a POC instead of a full implementation, generating technical debt',
      'Single Source Research - citing only one blog as complete research',
      'Cross-Spoke Abuse - forwarding huge reports directly Researcher-to-Builder, bypassing the Orchestrator, with no validation'
    ],
    keyConcepts: [
      {term: 'Mini Hub-and-Spoke', def: 'Minimal variant of the Hub-and-Spoke pattern with one hub and two spokes.'},
      {term: 'POC (Proof of Concept)', def: 'A minimal working example proving an approach is feasible.'},
      {term: 'Look Before You Leap', def: 'A rule that eliminates Analysis Paralysis and Blind Building by forcing sequencing.'},
      {term: 'Cross-spoke communication', def: 'A direct connection between two spokes that bypasses the hub to save tokens.'},
      {term: 'Confidence score', def: 'A numeric measure of certainty for a finding, usually on a 0.0-1.0 scale.'}
    ],
    stats: [
      {label: 'Agents', value: '3'},
      {label: 'Phases', value: '3'},
      {label: 'Est. cost', value: '$0.60-1.50'},
      {label: 'Time', value: '2-4 min'}
    ],
    bestFor: [
      'When you are evaluating a new technology or framework and don\'t know where to start',
      'When you want to check the feasibility of an approach before investing in a full implementation',
      'When you need a POC for a client meeting or a demo for management'
    ],
    worstFor: [
      'When the solution is already known and you don\'t need research (use Solo)',
      'When you need to ship production-ready code (the output is only a prototype)',
      'When the decision requires comparing many sources and adversarial critique (use Reflect or Research)'
    ],
    relatedPresets: ['solo', 'reflect', 'research'],
    glossary: [
      {term: 'spike', definition: 'A short, bounded technical exploration validating a specific hypothesis.'},
      {term: 'POC', definition: 'Proof of Concept - minimal code showing that an approach works in practice.'},
      {term: 'researcher tech', definition: 'A Haiku agent that searches docs and benchmarks and does not write code.'},
      {term: 'Hub-and-Spoke', definition: 'An architectural pattern with a central hub (Orchestrator) and spokes (workers).'},
      {term: 'GO/NO-GO', definition: 'A decision summary for a POC - whether to continue with full implementation or drop the idea.'}
    ],
    learningQuote: 'One hour of research saves ten hours of refactoring - the Recon preset formalizes this rule in the smallest possible configuration.',
    realExample: 'Imagine that you are considering a migration from Express to Fastify for better performance. The Orchestrator defines the questions, Researcher Tech compares benchmarks and finds that Fastify gives 2x throughput but has no plugin for your SSO, Backend Dev builds a POC with alternative middleware that works. Recommendation: GO with a caveat around SSO. The whole process takes 3 minutes instead of a week of speculation.'
  },
  trio: {
    tagline: 'The classic Backend-Frontend-QA triangle - the minimal team for full stack',
    missionShort: 'Classic Trio is three agents splitting work along the natural lines of full stack: Backend Dev writes API and logic, Frontend Dev builds UI and state, QA Quality tests the integration. It\'s the only Tier 1 preset without an Orchestrator - the agents talk peer-to-peer through API contracts.',
    whoIs: 'Reach for this preset when you are building a simple full-stack feature: a form with validation, a REST endpoint with UI, a mini dashboard, a CRUD with an interface. The task must be well defined (the cost of an Opus Orchestrator would be wasted), and the integration results must pass through an independent tester.',
    analogy: 'This preset is like three craftspeople in a restaurant - the chef cooks (Backend), the waiter serves (Frontend), the health inspector checks (QA) - three roles, zero duplication, full service.',
    howItWorks: [
      {label: 'Backend API', desc: 'Backend Dev designs REST endpoints, data models, server-side validation, and writes unit tests.'},
      {label: 'Contracts and Frontend', desc: 'The backend hands the frontend the API contracts (endpoints, payloads, errors). The frontend builds UI components, state, client-side validation, and accessibility.'},
      {label: 'BE-FE sync', desc: 'Backend and Frontend sync peer-to-peer in both directions, correcting contracts when a mismatch surfaces.'},
      {label: 'Integration QA', desc: 'QA Quality tests BE+FE integration, edge cases, and regressions, and produces a PASS/FAIL report with concrete notes for the right agent.'}
    ],
    inputs: [
      'Description of a full-stack feature (form, CRUD, dashboard, REST API + UI)',
      'Tech stack for the backend and the frontend',
      'Acceptance criteria for the UI and the API separately',
      'Optional mockup or data schema'
    ],
    outputs: [
      'Ready backend with REST endpoints and server-side validations',
      'Ready frontend with UI components, state, and client-side validations',
      'API contracts documented between BE and FE',
      'QA Quality report with BE+FE integration PASS/FAIL results',
      'Backend unit tests and BE+FE integration tests'
    ],
    does: [
      'Builds a full-stack feature end to end in a single pass',
      'Splits work along the natural BE/FE/QA lines without a coordinator',
      'Enforces API contracts between layers as the source of truth',
      'Tests BE+FE integration through an independent QA',
      'Saves the cost of an Opus Orchestrator for well-defined tasks',
      'Supports accessibility and edge cases on the UI side',
      'Handles peer-to-peer synchronization instead of central coordination',
      'Delivers a ready feature in 60-120 seconds'
    ],
    doesNotDo: [
      'Does not run research (no Researcher - use Feature Sprint)',
      'Does not run a planning or decomposition phase (no Planner - use Standard)',
      'Does not audit security (no QA Security - use Security)',
      'Does not coordinate complex dependencies (no Orchestrator)',
      'Does not design UX from scratch (no Designer - use Design System)',
      'Does not treat databases as a dedicated problem (use Full-Stack Premium)',
      'Does not handle multi-domain features with many services'
    ],
    antiPatterns: [
      'Trio for backend - using 3 agents when the task is pure backend and Frontend sits idle',
      'No contracts - Backend and Frontend build independently without agreeing on the interface, and integration falls apart',
      'QA at the end - QA only receives artifacts after 100% of the implementation instead of iteratively',
      'Complex without a coordinator - using Trio for a problem that needs central decisions',
      'Design in Trio - trying to redesign UI without a Designer in the team'
    ],
    keyConcepts: [
      {term: 'Triangle pattern', def: 'Peer-to-peer topology of three agents with no central coordinator.'},
      {term: 'API contracts', def: 'Agreed communication format between Backend and Frontend eliminating interface drift.'},
      {term: 'Peer-to-peer', def: 'Communication pattern without a hub where agents talk directly.'},
      {term: 'Natural BE/FE split', def: 'Dividing work along the lines that are the least contested in web development.'},
      {term: 'Integration testing', def: 'Testing BE and FE cooperating as a whole instead of separate layers.'}
    ],
    stats: [
      {label: 'Agents', value: '3'},
      {label: 'Phases', value: '3'},
      {label: 'Est. cost', value: '$0.60-1.50'},
      {label: 'Time', value: '1-2 min'}
    ],
    bestFor: [
      'When you are building a simple full-stack feature like CRUD or a form with an API',
      'When the task is well defined and you don\'t need an Orchestrator on Opus',
      'When you want the minimal team capable of delivering a full BE+FE+QA feature'
    ],
    worstFor: [
      'When the task requires research or comparing technology options (use Feature Sprint)',
      'When it touches security and needs an audit (use Security)',
      'When it is purely backend or purely frontend (use Solo or Quick Fix)'
    ],
    relatedPresets: ['feature_sprint', 'startup', 'solo'],
    glossary: [
      {term: 'frontend dev', definition: 'A Sonnet agent writing UI components, forms, state management, and accessibility.'},
      {term: 'API contracts', definition: 'A specification of endpoints, payloads, and errors agreed between Backend and Frontend.'},
      {term: 'QA Quality', definition: 'A Haiku audit agent testing integration, edge cases, and regressions.'},
      {term: 'peer-to-peer', definition: 'Direct communication pattern between agents without a central coordinator.'},
      {term: 'full-stack', definition: 'A feature spanning both backend (API, database) and frontend (UI, state).'}
    ],
    learningQuote: 'The absence of an Orchestrator in Classic Trio is not a limitation but an optimization - for well-defined features peer-to-peer is more efficient than central coordination.',
    realExample: 'Imagine that you need to add a signup form with validation and an API. Backend Dev designs POST /api/users with validation, Frontend Dev builds the component with client-side validation and state handling, QA Quality verifies the integration works for empty fields, duplicate emails, and special characters. A ready feature in 90 seconds, zero Opus overhead.'
  },
  reflect: {
    tagline: 'Scientist with a reviewer - deep understanding of a topic through critique',
    missionShort: 'Reflective Loop is three agents in a reflective loop: a Researcher collects data, an Analyst interprets, and a Research Critic scores the analysis and sends it back for revision when it\'s weak. The only Tier 1 preset that does NOT produce code - only analysis, a report, and recommendations.',
    whoIs: 'Reach for this preset when you face an important decision that demands a rigorous look at the topic: due diligence, architecture comparison, risk analysis, strategic option evaluation. You want confirmation bias eliminated through a built-in critic whose only job is to challenge the conclusions.',
    analogy: 'This preset is like peer review in academia - the scientist gathers data (Researcher), the reviewer interprets (Analyst), the devil\'s advocate looks for weaknesses (Critic) - and the cycle repeats until quality clears the bar.',
    howItWorks: [
      {label: 'Data gathering', desc: 'Researcher Tech searches docs, benchmarks, case studies, and blogs, and produces a raw report with facts, quotes, and source URLs.'},
      {label: 'Interpretation', desc: 'The Analyst receives the raw report and synthesizes conclusions, patterns, trade-offs, and recommendations.'},
      {label: 'Critique', desc: 'Research Critic scores the analysis in 5 categories (Completeness, Accuracy, Relevance, Freshness, Actionability) on a 1-10 scale.'},
      {label: 'Elastic loop', desc: 'If average score >= 6/10 - PASS and delivery. If < 6/10 - revision at the Researcher, max 3-4 iterations with a forced PASS.'}
    ],
    inputs: [
      'Research question or a decision that needs a rigorous justification',
      'Quality criteria for evaluation (completeness, accuracy, relevance)',
      'Optional business context (budget, deadline, stakeholders)',
      'Optional list of sources that must be reviewed'
    ],
    outputs: [
      'Raw data report with links to sources and quotes',
      'Analysis with conclusions, patterns, and trade-offs',
      'Critic scorecard in 5 categories (1-10) with justification',
      'Final recommendation with justification grounded in the data',
      'List of identified risks, gaps, and open questions'
    ],
    does: [
      'Runs deep research with a built-in quality gate',
      'Eliminates confirmation bias through adversarial collaboration',
      'Scores the analysis in 5 categories for nuanced feedback',
      'Sends weak analyses back for revision instead of letting them through',
      'Offers due diligence before an important strategic decision',
      'Delivers recommendations with justification and links to sources',
      'Implements the Elastic Reflective Trio pattern',
      'Improves report quality by 25-40% over a single agent'
    ],
    doesNotDo: [
      'Does NOT produce code - zero builders in the lineup, only analysis',
      'Does not implement the recommendations (that\'s a job for a preset with builders)',
      'Does not run multi-source research in parallel (use Research Swarm)',
      'Does not handle quick responses (the loop takes 2-5 min)',
      'Does not replace a domain expert for highly specialized topics',
      'Does not make decisions - only recommends with justification',
      'Does not handle simple questions with obvious answers'
    ],
    antiPatterns: [
      'Reflect for coding - using the reflective loop to write code (zero builders - zero code)',
      'Infinite loop - the Critic is too strict (score always <6) and the loop spins endlessly',
      'Soft Critic - the Critic has low load and waves everything through, so the analysis goes unverified',
      'Research without a question - the Researcher gathers data without a clearly defined question, producing noise',
      'Single Source - analysis based on one blog or one document instead of cross-references'
    ],
    keyConcepts: [
      {term: 'Adversarial collaboration', def: 'A technique where a dedicated critic attacks the conclusions of other agents to eliminate bias.'},
      {term: 'Elastic loop', def: 'A loop with a variable iteration count tied to result quality (score >= threshold).'},
      {term: 'Confirmation bias', def: 'The tendency to look for information confirming a thesis instead of refuting it.'},
      {term: '5-category scorecard', def: 'Scoring in Completeness, Accuracy, Relevance, Freshness, Actionability on a 1-10 scale.'},
      {term: 'Research Critic load 85', def: 'The highest load in Tier 1 - intentionally high so the Critic stays demanding and strict.'}
    ],
    stats: [
      {label: 'Agents', value: '3'},
      {label: 'Phases', value: '3'},
      {label: 'Est. cost', value: '$0.30-0.75'},
      {label: 'Time', value: '2-5 min'}
    ],
    bestFor: [
      'When you are doing due diligence before a major strategic or investment decision',
      'When you want to eliminate confirmation bias from reports and analyses',
      'When you are comparing architectures or frameworks and need justification'
    ],
    worstFor: [
      'When you need code generated (Reflect implements nothing - use Recon)',
      'When the question is simple and has an obvious answer (the loop overhead is not worth it)',
      'When you must deliver an answer in 30 seconds (the loop takes 2-5 min)'
    ],
    relatedPresets: ['recon', 'research', 'five_minds'],
    glossary: [
      {term: 'critic', definition: 'An audit agent whose only role is to challenge the conclusions of other agents.'},
      {term: 'adversarial collaboration', definition: 'A collaboration technique where the critic actively looks for weaknesses in a thesis.'},
      {term: 'due diligence', definition: 'Rigorous investigation of a topic before making a decision, especially an investment one.'},
      {term: 'score 1-10', definition: 'A report quality rating scale covering completeness, accuracy, and relevance.'},
      {term: 'elastic pattern', definition: 'A loop with no fixed iteration count, ending when quality clears a threshold.'}
    ],
    learningQuote: 'Adding a critic agent to a research team improves report quality by 25-40% at an additional cost 8 times smaller than the benefit - it is the most cost-effective investment in analysis quality.',
    realExample: 'Imagine that you are considering a migration from MongoDB to PostgreSQL. The Researcher gathers benchmarks and case studies, the Analyst interprets that PostgreSQL wins on ACID but loses on horizontal scaling, and Research Critic rates Completeness 4 (missing migration cost data). PASS only comes on the second iteration once the Researcher adds TCO. You walk away with a recommendation, a scorecard, and sources.'
  },
  bug_hunt: {
    tagline: 'Two detectives at a crime scene - Security and Quality in parallel',
    missionShort: 'Bug Hunter is a four-person team: the Orchestrator coordinates, Backend Dev fixes, and TWO independent QAs (Security and Quality) test the same artifact in parallel from different perspectives. The Fork QA pattern prevents groupthink and catches problems a single tester would miss.',
    whoIs: 'Reach for this preset when the bug is suspicious, you worry that fixing one spot will break another, or when you suspect a security link. Four agents in the sweet spot - big when it needs to be, small when it can be - with two independent audit lines running in parallel.',
    analogy: 'This preset is like two detectives investigating the same crime scene independently - one looks for signs of break-in (Security), the other for signs of crime (Quality) - their reports complement each other and groupthink has no chance to blind them both.',
    howItWorks: [
      {label: 'Bug triage', desc: 'The Orchestrator takes the report, scores severity and scope, writes an instruction for Backend Dev, and defines audit areas for both QAs.'},
      {label: 'Fix implementation', desc: 'Backend Dev diagnoses the root cause, implements the fix with a regression test, and hands the artifact to both QAs in parallel.'},
      {label: 'Parallel audit', desc: 'QA Security hunts for security holes (injection, authz, data exposure). QA Quality hunts for regressions, edge cases, and integration errors. Both report independently.'},
      {label: 'Report aggregation', desc: 'The Orchestrator collects both reports, synthesizes a single PASS/FAIL decision, and if FAIL returns to the builder with combined feedback.'}
    ],
    inputs: [
      'Bug report with steps to reproduce and severity',
      'Existing code of the affected area with related tests',
      'Security context (whether the bug touches authorization, user data, or payments)',
      'Acceptance criteria for both audit lines'
    ],
    outputs: [
      'Fixed code with a root cause analysis',
      'Regression test preventing recurrence',
      'QA Security report auditing for vulnerabilities',
      'QA Quality report with integration tests and edge cases',
      'Final Orchestrator PASS/FAIL decision with aggregated feedback'
    ],
    does: [
      'Fixes bugs with parallel validation from two perspectives',
      'Detects security vulnerabilities as a side effect of the fix',
      'Prevents groupthink through independent audits',
      'Forces a regression test and guards against the bug coming back',
      'Handles pre-release bug sweeps for critical features',
      'Catches hidden side-effect damage after the fix',
      'Implements the Fork QA pattern with 2 parallel auditors',
      'Operates in the 4-agent sweet spot - smallest configuration that already offers dual perspective'
    ],
    doesNotDo: [
      'Does not build new features (this is a bug-hunting preset)',
      'Does not run a research phase (no Researcher - use Recon if you don\'t know how)',
      'Does not touch the frontend when the bug is in FE (no FE Dev - use Trio)',
      'Does not replace a pentest (no full security audit - use Security)',
      'Does not iterate in a fix-test loop (one cycle - use Quick Fix for a loop)',
      'Does not handle bugs without a reproducible report',
      'Does not scale to many modules in parallel'
    ],
    antiPatterns: [
      'QA Merge - combining both QA reports into one before showing the Orchestrator, erasing the value of independence',
      'Trivial Bug - using Bug Hunter for a typo, which is overkill (use Solo)',
      'No Repro - trying to hunt without a reproducible case, leaving both QAs with nothing to work on',
      'Security Skip - skipping QA Security on payment or auth bugs, which defeats the whole point',
      'Bug Hunt for a feature - using the preset to build a new feature instead of fixing an existing bug'
    ],
    keyConcepts: [
      {term: 'Fork QA pattern', def: 'A pattern where one artifact is audited in parallel by multiple independent QAs.'},
      {term: 'Groupthink prevention', def: 'Avoiding forced consensus by requiring independent reports instead of a joint analysis.'},
      {term: 'Parallel auditors', def: 'Two or more auditors working in parallel with no communication between them.'},
      {term: 'Dual perspective', def: 'Two different angles on the same artifact (e.g. security vs quality).'},
      {term: 'Sweet spot 4', def: 'A 4-agent configuration that is the smallest one offering parallel audits without excess.'}
    ],
    stats: [
      {label: 'Agents', value: '4'},
      {label: 'Phases', value: '3'},
      {label: 'Est. cost', value: '$0.65-1.60'},
      {label: 'Time', value: '2-4 min'}
    ],
    bestFor: [
      'When the bug is suspicious and you worry about hidden damage in other areas',
      'When the bug touches authorization or user data and you need a security audit',
      'When you are doing a pre-release sweep and want two independent audits instead of one'
    ],
    worstFor: [
      'When the bug is trivial and one tester is enough (use Solo or Quick Fix)',
      'When you are building a new feature instead of fixing a bug (use Trio or Feature Sprint)',
      'When you need fix-test iterations in a loop (use Quick Fix for the continuous loop)'
    ],
    relatedPresets: ['quick_fix', 'security', 'solo'],
    glossary: [
      {term: 'QA Security', definition: 'An audit agent looking for security holes (injection, authz, data exposure).'},
      {term: 'QA Quality', definition: 'An audit agent testing integration, edge cases, and functional regressions.'},
      {term: 'Fork QA', definition: 'A flow-forking pattern routing to multiple parallel auditors who do not talk to each other.'},
      {term: 'groupthink', definition: 'A phenomenon where a group drives toward consensus at the cost of critical thinking.'},
      {term: 'regression', definition: 'A situation where a new change breaks functionality that previously worked.'}
    ],
    learningQuote: 'Two independent eyes see more than one - Fork QA eliminates groupthink at the architectural level rather than relying on the discipline of a single auditor.',
    realExample: 'Imagine that users report the checkout button sometimes charges twice. The Orchestrator triages, Backend Dev diagnoses a missing idempotency key and implements a fix with a regression test. QA Security finds that the error message now leaks the internal order ID. QA Quality finds that refunds still double-charge on slow connections. Both reports land in parallel, the Orchestrator aggregates, and the builder ships a second revision that clears both audit lines in 4 minutes.'
  },
  content: {
    tagline: 'Editorial pipeline for text - two sources, a writer, and a QA pass working like a magazine newsroom',
    missionShort: 'Content Pipeline is a four-agent team specialized in producing content, not code. Two researchers run in parallel to gather data from forums and official documentation, the Writer synthesizes findings into a coherent document, and QA Quality verifies facts, completeness, and formatting.',
    whoIs: 'Reach for this preset when you need API documentation, a technical article, a report, or a changelog that must be factually safe. Ideal when the content has to reconcile the practitioner perspective (forums, Stack Overflow) with the official specs (docs, RFC).',
    analogy: 'This preset is like a magazine newsroom - two journalists gather information from different fronts, the editor writes the article from both sources, and the proofreader checks facts and grammar before it goes to print.',
    howItWorks: [
      {label: 'Phase 1 - Brief and fan-out research', desc: 'The Orchestrator defines the content brief (topic, audience, format, questions) and fires two researchers in parallel: Researcher Forums (Stack Overflow, Reddit, Discord) and Researcher Tech (official docs, API reference, changelogs).'},
      {label: 'Phase 2 - Findings synthesis', desc: 'Both reports merge into one working brief containing the community perspective and the official perspective. This input replaces guesswork with data for the Writer.'},
      {label: 'Phase 3 - Document writing', desc: 'The Writer (Sonnet) builds the H1-H3 structure, narrative, examples, code snippets, and parameter tables in the style set by the brief. No Bash or Edit access - text only.'},
      {label: 'Phase 4 - Quality audit and iteration', desc: 'QA Quality checks substance (facts vs sources), completeness (brief coverage), readability, and Markdown format. PASS ships, FAIL loops back to the Writer (max 3 iterations).'}
    ],
    inputs: [
      'Document topic and audience (e.g. junior developers, CTO, business client)',
      'Target format (README, tutorial, blog post, comparison report, changelog)',
      'Scope (what to cover, what to skip) and style (technical, journalistic, educational)',
      'Optional required or forbidden sources for citation'
    ],
    outputs: [
      'Ready Markdown document with H1-H3 sections and examples',
      'Source list with URLs to forums and official docs',
      'QA Quality report listing what was checked and corrected',
      'Document metadata: word count, reading time, coverage score vs brief',
      'Drift report vs the brief when coverage is incomplete'
    ],
    does: [
      'Produces technical documentation grounded in two independent sources',
      'Merges the practitioner forum perspective with official docs',
      'Creates READMEs, articles, comparison reports, changelogs, tutorials',
      'Verifies facts before publication and logs sources for every claim',
      'Iterates fixes when QA Quality finds gaps or factual errors',
      'Respects the style, audience, and format set by the brief',
      'Catches discrepancies between what docs say and how the tech is actually used',
      'Scales documentation module by module (one preset = one document)'
    ],
    doesNotDo: [
      'Does not generate code - the Writer has no Bash or Edit to run scripts',
      'Does not implement the features it documents (use Solo or Feature Sprint for that)',
      'Does not do SEO research or optimization (that\'s what tech_writing_pipe is for)',
      'Does not create diagrams or graphics (preset has no Designer)',
      'Does not work well for short text - 5 changelog lines is pure overhead',
      'Does not replace interviewing a real end user (that\'s the Researcher UX role)',
      'Does not handle highly specialized domains (medicine, law) where a human expert is required'
    ],
    antiPatterns: [
      'Pipeline for code - trying to use the Writer to implement an endpoint instead of docs; the Writer has no Bash',
      'Skipping research - delegating straight to the Writer with no source phase; the final doc hallucinates APIs that don\'t exist',
      'Brief too broad - a request to "document the entire system" burns 500K tokens and ships incoherent output',
      'Single source - using only Researcher Tech with no community perspective; the doc reads like a marketing brochure',
      'Brief with no audience - the Writer writes for nobody specific and ships text too technical for juniors and too shallow for seniors'
    ],
    keyConcepts: [
      {term: 'Linear Pipeline', def: 'Architectural pattern where data flows through a series of stages in one direction, like an assembly line.'},
      {term: 'Parallel Fan-In', def: 'Hybrid pipeline variant - two researchers work in parallel and their outputs merge before the Writer.'},
      {term: 'Content brief', def: 'Structured instruction for the Writer containing topic, audience, format, and research questions.'},
      {term: 'Brief drift', def: 'The gap between what should have been covered and what the Writer actually covered - QA Quality measures the coverage score.'},
      {term: 'Dual sourcing', def: 'The rule that every key claim must be grounded in at least two independent sources (forum + docs).'}
    ],
    stats: [
      {label: 'Agents', value: '4'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.20-0.55'},
      {label: 'Time', value: '2-4 min'}
    ],
    bestFor: [
      'When you\'re writing API docs or a README that must be factually correct',
      'When you\'re doing a tech comparison report and need to cite both practitioners and official limits',
      'When you\'re writing a technical article or tutorial that needs real-world examples'
    ],
    worstFor: [
      'When you need code instead of text - that\'s a Solo or Feature Sprint job',
      'When the document is 1-2 sentences - the preset is overkill',
      'When you need graphics, diagrams, or interactive visualizations'
    ],
    relatedPresets: ['tech_writing_pipe', 'recon', 'reflect'],
    glossary: [
      {term: 'coverage score', definition: 'Percentage of research questions from the brief that the document actually addresses.'},
      {term: 'fan-in', definition: 'The point in a pipeline where outputs from multiple parallel agents meet in one place.'},
      {term: 'ground truth', definition: 'Real practitioner experience from forums, unfiltered by marketing.'},
      {term: 'dual sourcing', definition: 'The rule that every claim needs two independent confirmations before it lands in the document.'},
      {term: 'brief drift', definition: 'The deviation of what was written from what should have been written, measured by QA.'}
    ],
    learningQuote: 'Documentation without research is well-intentioned fiction - Content Pipeline treats writing with the same rigor as coding.',
    realExample: 'Imagine that you have a form-validator library with no docs, and 47 people on Stack Overflow are asking about the same 3 problems - this preset sends Researcher Forums to surface those 3 pain points, Researcher Tech to collect the official API for 23 functions, the Writer merges both sources into a README that addresses the real problems, and QA Quality catches that one parameter is missing. One fix iteration and you have a README that actually answers user questions.'
  },
  plan_exec: {
    tagline: 'Plan before action - Analyst decomposes, Planner schedules, Backend builds step by step',
    missionShort: 'Plan and Execute is a four-agent pattern for structural tasks where ad-hoc chaos costs more than planning. The Analyst decomposes the task into subtasks with dependencies, the Planner creates a phased schedule, Backend Dev executes the plan incrementally, and QA Quality verifies each step separately.',
    whoIs: 'Reach for this preset when you have a database migration, a large module refactor, an architecture change, or a framework update with breaking changes. Ideal wherever step dependencies mean chaos-first costs 2x more than plan-first.',
    analogy: 'This preset is like a construction crew with an architect - the architect measures and decomposes, the foreman lays out the schedule and books the crane, the workers execute step by step, and the inspector signs off on each phase before the next one starts.',
    howItWorks: [
      {label: 'Phase 1 - Decomposition analysis', desc: 'The Analyst (Sonnet) reads the codebase, identifies modules affected by the change, estimates complexity S/M/L/XL, maps file dependencies, and produces a decomposition report - a list of subtasks with estimates.'},
      {label: 'Phase 2 - Scheduling', desc: 'The Planner (Sonnet) arranges subtasks into a phased schedule: order, dependencies, checkpoints, PASS/FAIL criteria per phase. Does not code, does not analyze - plans execution.'},
      {label: 'Phase 3 - Incremental execution', desc: 'Backend Dev gets ONE step with context, not the whole plan. After completion the Orchestrator verifies the result and delegates the next step. A bug in step 2 costs one step, not the whole batch.'},
      {label: 'Phase 4 - Per-step validation', desc: 'QA Quality audits EACH step separately - tests pass, no regressions, the step meets the plan\'s criteria. Only then does progression move to the next step.'}
    ],
    inputs: [
      'Structural task (migration, refactor, reorganization, architecture change)',
      'Codebase access via Read and Grep for the analysis phase',
      'Constraints: deadline, token budget, priority',
      'Architectural context (frameworks, conventions, layers)'
    ],
    outputs: [
      'Decomposition report from the Analyst with subtask dependencies',
      'Execution schedule from the Planner (phases, order, checkpoints)',
      'Shipped code after all plan steps',
      'Per-step QA reports instead of one final report',
      'Changelog describing what changed in each step - full traceability'
    ],
    does: [
      'Decomposes a large task into smaller steps with explicit dependencies',
      'Creates a schedule that surfaces obstacles before you hit them',
      'Executes the plan incrementally - one step, one validation, then the next',
      'Isolates bugs to a single step instead of smearing them across the task',
      'Achieves ~83 percent cost reduction vs chaos-first for M and L tasks',
      'Adapts the plan when new discoveries during execution require re-planning',
      'Delivers full change history - what, when, why for every step',
      'Guarantees each step passes PASS criteria before the next one runs'
    ],
    doesNotDo: [
      'Not for simple bugfixes - planning a 1-step task is pure overhead',
      'Not for urgent hotfixes where speed matters more than precision',
      'No research phase - assumes you know the stack and patterns',
      'No Designer - does not design interfaces or visual systems',
      'No Frontend Dev - only Backend Dev as the single builder',
      'Does not build new features from scratch - it\'s for changes in existing code',
      'Does not replace a security audit (use security or review for that)'
    ],
    antiPatterns: [
      'Planning trivial tasks - sending "add email field" to Plan and Execute; the Analyst produces 1 subtask for 30K tokens',
      'Plan without checkpoints - a schedule that says "5 steps, verify at the end"; a bug in step 2 gets caught only after step 5',
      'Rigid plan - continuing the original plan after discovering new complexity in step 2; zero re-planning',
      'Whole plan in one delegation - the Orchestrator hands Backend Dev 5 steps at once; the builder loses context',
      'Plan without estimates - the Analyst doesn\'t classify complexity S/M/L/XL; the Planner doesn\'t know which steps are critical'
    ],
    keyConcepts: [
      {term: 'Plan-and-Execute Loop', def: 'Two-phase pattern: first plan, then execute step by step with per-step verification.'},
      {term: 'Incremental execution', def: 'Each step is its own Build plus Verify cycle, not one big sweep across the whole task.'},
      {term: 'Checkpoint', def: 'A point in the plan where QA Quality checks whether the step meets criteria before moving to the next.'},
      {term: 'Re-planning', def: 'Adapting the plan when new discoveries during execution reveal unforeseen dependencies.'},
      {term: '83 percent savings', def: 'Empirically measured cost reduction vs chaos-first for M and L tasks (Google Multi-Agent 2024).'}
    ],
    stats: [
      {label: 'Agents', value: '4'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.60-1.50'},
      {label: 'Time', value: '2-4 min'}
    ],
    bestFor: [
      'When you\'re migrating a database or ORM with many dependent steps',
      'When you\'re refactoring a large module where change order matters',
      'When you\'re updating a framework with breaking changes scattered across the codebase'
    ],
    worstFor: [
      'When you have a simple bug to fix - use quick_fix instead',
      'When you need an urgent production hotfix - planning wastes minutes',
      'When the task has 1 subtask with no dependencies - the Analyst and Planner are overhead'
    ],
    relatedPresets: ['quick_fix', 'migration_crew', 'standard'],
    glossary: [
      {term: 'decomposition', definition: 'Breaking one large task into smaller subtasks with clear boundaries.'},
      {term: 'phased schedule', definition: 'An ordered sequence of steps with dependencies and checkpoints.'},
      {term: 'checkpoint', definition: 'A verification point between plan steps, not just at the end.'},
      {term: 'complexity S/M/L/XL', definition: 'Four-step work estimation scale (small, medium, large, extra large).'},
      {term: 'chaos-first', definition: 'The no-plan approach - the builder gets the whole task at once and codes by gut feel.'}
    ],
    learningQuote: 'A few minutes on a plan saves hours of unplanned chaos - Plan and Execute treats thinking as a cheaper form of work than debugging.',
    realExample: 'Imagine that you\'re migrating from Sequelize to Prisma in a project with 87 files - the Analyst decomposes into 5 subtasks (schema, CRUD, relations, data, tests), the Planner sets up phases with checkpoints after each, Backend Dev migrates the schema - PASS, models - FAIL on an M:N relation - fix - PASS, then relations, then data, then tests. The bug in phase 2 cost 5 minutes. Without a plan it would be debugging 4 tangled changes at once. Result: 6 iterations, 180K tokens, 200 seconds.'
  },
  perf_boost: {
    tagline: 'Measure, fix, measure again - the Measure-Fix cycle for code that works but works too slowly',
    missionShort: 'Performance Boost is a four-agent preset for measurable optimization of code that isn\'t broken, just slow. The Analyst profiles and identifies bottlenecks, Backend Dev implements specific fixes, QA Performance measures the delta, and the Integrator checks for regressions in related endpoints.',
    whoIs: 'Reach for this preset when your endpoint responds too slowly, Core Web Vitals are below Google\'s threshold, the bundle size is too large, or the database has slow queries. Ideal when you have a CONCRETE performance goal (e.g. LCP under 1.5s, p95 under 500ms) and need systematic optimization instead of guesswork.',
    analogy: 'This preset is like tuning a sports engine - the diagnostician hooks up telemetry and flags a 15 percent turbo leak, the mechanic replaces the exhaust and remaps the injection, the dyno verifies +47HP, and the coordinator checks that the new map didn\'t wreck fuel consumption.',
    howItWorks: [
      {label: 'Phase 1 - Measure baseline', desc: 'The Analyst runs benchmarks, analyzes flame graphs, profiles, and identifies the top 3 bottlenecks with estimated impact. Produces a BEFORE report with concrete metrics and recommendations sorted highest-impact to lowest.'},
      {label: 'Phase 2 - Fix the biggest bottleneck', desc: 'Backend Dev implements a specific recommendation from the Analyst (cache, indexes, JOIN, lazy loading, bundle split, connection pooling). One bottleneck per iteration - not all at once.'},
      {label: 'Phase 3 - Verify in parallel', desc: 'QA Performance and the Integrator work SIMULTANEOUSLY. QA Perf measures the metric delta (BEFORE vs AFTER, p95, memory). The Integrator checks whether related endpoints suffered - /products faster but /orders not slower?'},
      {label: 'Phase 4 - Iteration decision', desc: 'The Orchestrator evaluates: goal hit - ship. Goal missed - Backend Dev fixes bottleneck number 2. After 2 iterations with no progress - escalate to Plan and Execute (architecture change).'}
    ],
    inputs: [
      'Concrete performance goal (LCP, p95, bundle size, RPS, memory footprint)',
      'Optimization scope (single endpoint, module, whole system)',
      'Baseline metrics if available - the Analyst will measure anyway, but it saves time',
      'Constraints (do not touch the database, preserve API compatibility, budget 2 iterations)'
    ],
    outputs: [
      'Optimized code after recommendation implementation',
      'BEFORE vs AFTER report with concrete numbers and metric deltas',
      'Integration report confirming no regressions in related places',
      'List of applied optimizations with each one\'s impact',
      'Prioritized list of remaining bottlenecks for future optimization'
    ],
    does: [
      'Measures the baseline BEFORE fixing anything - data, not intuition',
      'Identifies the top 3 bottlenecks in impact order',
      'Fixes one bottleneck per iteration for measurable effect',
      'Verifies improvement with hard BEFORE vs AFTER numbers',
      'Checks for regressions in related endpoints and modules',
      'Iterates until the goal is hit or the budget is exhausted',
      'Documents every optimization with a numeric impact',
      'Escalates to Plan and Execute when the problem is architectural'
    ],
    doesNotDo: [
      'Does not fix bugs - an endpoint returning 500 is a job for quick_fix',
      'Does not optimize frontend layout and CSS - preset has no Frontend Dev',
      'Does not guess without measuring - no optimization without the Analyst\'s report',
      'Does not optimize everything at once - only the top N bottlenecks',
      'Does not change architecture - that\'s Plan and Execute\'s job',
      'Does not build new features - only improves existing ones',
      'Does not run load testing for distributed scalability (that\'s perf_squad)'
    ],
    antiPatterns: [
      'Optimization without measurement - Backend Dev adds a cache because "the DB is slow"; the real problem was an N+1 query',
      'Optimizing everything at once - 5 bottlenecks fixed in one iteration; you don\'t know which change helped',
      'No regression check - /products got faster but /orders got slower due to a shared cache',
      'Goal unreachable architecturally - 5 iterations of micro-optimization when you need an architecture change',
      'Optimizing healthy code - sending the preset at an endpoint already meeting SLA; wasted cost'
    ],
    keyConcepts: [
      {term: 'Measure-Fix Cycle', def: 'Iterative pattern: measure, fix, verify, repeat until the goal is hit.'},
      {term: 'Deming Cycle', def: 'Plan-Do-Check-Act - the philosophical ancestor of Measure-Fix adapted for agent systems.'},
      {term: 'Bottleneck impact', def: 'One location\'s percentage share of total response time - the key to prioritization.'},
      {term: 'Regression check', def: 'Verifying that optimizing one place didn\'t break related endpoints.'},
      {term: 'Core Web Vitals', def: 'Google metrics (LCP, FID, CLS) that directly affect search ranking.'}
    ],
    stats: [
      {label: 'Agents', value: '4'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.65-1.55'},
      {label: 'Time', value: '2-3 min'}
    ],
    bestFor: [
      'When the API responds too slowly and you know the target SLA (p95 under X ms)',
      'When Core Web Vitals are below Google\'s threshold (LCP, FID, CLS)',
      'When the database has slow queries and you have flame graph access'
    ],
    worstFor: [
      'When the endpoint is broken - that\'s a bug, use quick_fix',
      'When you only have a vague "feels slow" impression with no concrete goal',
      'When the problem is in the frontend (layout, hydration) - preset has no Frontend Dev'
    ],
    relatedPresets: ['perf_squad', 'quick_fix', 'plan_exec'],
    glossary: [
      {term: 'LCP', definition: 'Largest Contentful Paint - time to render the largest above-the-fold element.'},
      {term: 'p95', definition: 'The metric value below which 95 percent of samples fall - the real worst case for users.'},
      {term: 'N+1 query', definition: 'Antipattern where a loop fires one query per iteration instead of one JOIN.'},
      {term: 'flame graph', definition: 'Execution profile visualization showing which functions eat how much CPU time.'},
      {term: 'regression', definition: 'New performance degradation caused by a change meant to improve it.'}
    ],
    learningQuote: 'Don\'t optimize without measuring, don\'t measure without a goal, don\'t ship without checking regressions - Performance Boost turns guessing into method.',
    realExample: 'Imagine that you have an e-commerce site with LCP 4.2s and CLS 0.35 - Google penalizes ranking, conversion drops. The Analyst profiles and shows that a 2.4MB uncompressed hero image eats 55 percent of LCP. Backend Dev converts to WebP with srcset, adds explicit width and height, inlines Critical CSS. After one iteration: LCP 2.1s, CLS 0.08, both PASS, zero regressions in related views. 120K tokens, 130 seconds, goal hit on the first try.'
  },
  startup: {
    tagline: 'Full MVP lifecycle in five people - the minimum team to ship a complete product',
    missionShort: 'Startup MVP is the smallest team capable of delivering a complete product from requirement to working code. The Orchestrator coordinates, the Analyst writes user stories, Researcher Tech picks the stack, Backend Dev builds, QA Quality validates - each one is essential, zero redundancy.',
    whoIs: 'Reach for this preset when you\'re building a web app MVP, a prototype for a pitch, a small SaaS with login and 1-2 features, a microservice, or a bot with API integration. Ideal when you have a tight budget, a tight deadline, and need to ship something that works end-to-end fast.',
    analogy: 'This preset is like a garage startup - the CEO coordinates, the product manager analyzes requirements, the tech lead picks the technology, the sole developer builds, the sole tester checks. Each one is critical, losing any one threatens the mission.',
    howItWorks: [
      {label: 'Phase 1 - Analysis and research in parallel', desc: 'The Analyst breaks requirements into user stories, acceptance criteria, and prioritizes by MoSCoW. At the same time Researcher Tech searches docs, compares libraries, and recommends the stack that ships a working product fastest.'},
      {label: 'Phase 2 - Build with the full brief', desc: 'Backend Dev gets TWO things at the same time: the spec of WHAT to build (from the Analyst) and the recommendation of HOW to build it (from Researcher Tech). Implements logic, API, endpoints, data models, validation, and tests.'},
      {label: 'Phase 3 - QA against the spec', desc: 'QA Quality tests the artifact AGAINST the Analyst\'s spec, not "does the code look pretty". Edge cases, error handling, compliance with acceptance criteria, automated tests. Produces a PASS/FAIL report with concrete notes.'},
      {label: 'Phase 4 - Iterate or ship', desc: 'PASS - the Orchestrator ships the result. FAIL - Backend Dev fixes per QA notes (max 2-3 iterations). CRITICAL FAIL - escalate to feature_sprint or saas if more agents are needed.'}
    ],
    inputs: [
      'User requirements for the MVP (what it does, for whom, which key features)',
      'Constraints (deadline, preferred stack, target platform)',
      'Success criteria for the first release (must-have vs nice-to-have)',
      'Optional access to existing codebase if the MVP isn\'t from scratch'
    ],
    outputs: [
      'Working MVP code with unit tests',
      'Spec with user stories and acceptance criteria (Analyst artifact)',
      'Tech report with stack recommendation and rationale',
      'QA report with a list of checked edge cases and notes',
      'Final artifact ready for pitch demo or first deploy'
    ],
    does: [
      'Delivers a full lifecycle from requirement to working product',
      'Runs analysis and research in parallel, saving 30-40 percent of time vs sequential',
      'Picks a stack and technologies instead of guessing',
      'Verifies code against formal acceptance criteria',
      'Reaches 92 percent of the effectiveness of a 14-agent system at 35 percent of the cost',
      'Ships a working demo for an investor pitch in a single pass',
      'Ships minimal but complete technical documentation',
      'Scales via escalation when the MVP becomes a full product'
    ],
    doesNotDo: [
      'No Frontend Dev or Designer - no advanced UI/UX',
      'No QA Security - an MVP without a security audit is not for fintech',
      'No multiple builders - a single Backend Dev as the bottleneck',
      'Does not do deep research - one Researcher Tech instead of a 6-source swarm',
      'Does not build for multiple microservices - no distributed integration',
      'Not for enterprise - lacks the planning and documentation needed at scale',
      'Does not replace a real product team for a long-term product'
    ],
    antiPatterns: [
      'Skipping the Analyst - Backend Dev gets a raw requirement and doesn\'t know WHAT to build',
      'Skipping the Researcher - Backend Dev guesses the stack and refactors a week later',
      'Sequential research and analysis - you lose the preset\'s parallel optimization',
      'QA at the end after 3 iterations - too late for fixes, cost rises',
      'Orchestrator writes code - role confusion, the Orchestrator ONLY coordinates'
    ],
    keyConcepts: [
      {term: 'Hub-and-Spoke', def: 'Pattern where the Orchestrator is the central hub and 4 specialists are spokes radiating out.'},
      {term: 'MoSCoW prioritization', def: 'Must have / Should have / Could have / Won\'t have - the classic requirement prioritization technique.'},
      {term: 'Parallel analysis', def: 'Analyst and Researcher Tech working at the same time instead of sequentially - 30-40 percent time savings.'},
      {term: 'Minimum viable product', def: 'The smallest version of a product that delivers value to a user and lets you validate the hypothesis.'},
      {term: 'Acceptance criteria', def: 'A formal list of conditions that must be met for QA to accept the feature.'}
    ],
    stats: [
      {label: 'Agents', value: '5'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.80-1.95'},
      {label: 'Time', value: '3-5 min'}
    ],
    bestFor: [
      'When you\'re building a web app MVP from scratch on a tight budget',
      'When you need a working prototype for an investor pitch in one day',
      'When you\'re building a microservice with API, logic, and tests, no frontend'
    ],
    worstFor: [
      'When you\'re building an enterprise system with multiple domains - too few agents',
      'When the MVP has an advanced frontend or a UI redesign - no Designer',
      'When the system is security-critical - no QA Security'
    ],
    relatedPresets: ['trio', 'feature_sprint', 'saas'],
    glossary: [
      {term: 'MVP', definition: 'Minimum Viable Product - the smallest product version that delivers value to a user.'},
      {term: 'user story', definition: 'Short requirement form: as X I want Y so that Z.'},
      {term: 'acceptance criteria', definition: 'Formal conditions that must be met for a feature to be accepted.'},
      {term: 'hub-and-spoke', definition: 'Architectural pattern with a central coordinator and 4 specialist spokes.'},
      {term: 'MoSCoW', definition: 'Prioritization method: Must, Should, Could, Won\'t.'}
    ],
    learningQuote: 'Startup MVP is proof that five well-chosen heads reach 92 percent of what 14 can - don\'t add people, add parallelism.',
    realExample: 'Imagine that you have one weekend for a task manager prototype for a VC pitch on Monday - this preset fires the Analyst who writes user stories for CRUD + filtering + sorting, at the same time Researcher Tech compares Express vs Fastify and recommends Express with better-sqlite3. Backend Dev gets both artifacts and builds a REST API with validations. QA Quality tests empty titles, negative IDs, duplicates. PASS after one iteration. 4 minutes, 22 cents, you have something to show on Monday.'
  },
  cascade: {
    tagline: 'Cascading cost escalation - cheap models solve 70-80 percent, expensive ones only the hard cases',
    missionShort: 'Cascade Cost is a five-layer system where cheap models (Haiku) on the front handle 70-80 percent of tasks, Sonnet in the middle processes 20 percent, and Opus at the very end handles only 5-10 percent requiring synthesis. The pattern is known from IBM Watson, AWS Bedrock, and Google Vertex AI.',
    whoIs: 'Reach for this preset when you have high volumes of repetitive tasks, batch processing, customer support triage, content moderation, or a data pipeline. Ideal when quality must be preserved but the token budget is tight and your quality floor doesn\'t need Opus on every query.',
    analogy: 'This preset is like a hospital ER triage system - the nurse handles 70 percent of cases, the general practitioner 20 percent, the specialist only 10 percent. You don\'t send a cardiac surgeon to every scratch.',
    howItWorks: [
      {label: 'Phase 1 - Front-line triage on Haiku', desc: 'Two Researcher Haiku work in parallel. H1 classifies complexity (S/M/L/XL) and filters noise. H2 enriches data from external sources. 70-80 percent of simple queries resolve here for pennies ($0.001-0.005 per query).'},
      {label: 'Phase 2 - Mid-tier build on Sonnet', desc: 'Backend Dev (Sonnet) steps in when the task requires creating, not just reading. Receives processed data from Haiku and builds: generates code, transforms formats, implements logic.'},
      {label: 'Phase 3 - Mid-tier validate on Sonnet', desc: 'QA Quality (Sonnet) is the quality gate before escalation to Opus. Verifies Backend Dev artifacts, runs tests, checks compliance. PASS - result ready. FAIL - back to Backend Dev (max 2 iterations).'},
      {label: 'Phase 4 - Final arbiter on Opus', desc: 'The Orchestrator (Opus) steps in ONLY when strategic synthesis, conflict resolution, or an architectural decision is needed. Burns 15-30K tokens instead of 50-80K in the classic model - 50-70 percent savings on Opus alone.'}
    ],
    inputs: [
      'Large volume of similar tasks (hundreds/thousands daily)',
      'Routing rule defining when to escalate from Haiku to Sonnet',
      'Acceptance criteria for the Haiku layer (what it must handle alone)',
      'Token budget and target cost reduction'
    ],
    outputs: [
      'Processed tasks with per-layer distribution',
      'Escalation rate metrics (what percent lands in each layer)',
      'Cost report with savings vs the classic all-Opus model',
      'Final results delivered in the contract format',
      'Escalation decision logs for routing audit'
    ],
    does: [
      'Cuts costs 70-80 percent vs the classic all-Opus model',
      'Handles hundreds/thousands of queries per day without a cost storm',
      'Uses the cheapest model that can handle the task',
      'Escalates to a more expensive model only when necessary',
      'Maintains quality via the QA gate before Opus',
      'Implements the same pattern used by IBM Watson and AWS Bedrock',
      'Runs Haiku in parallel for maximum throughput',
      'Measures escalation distribution to optimize the routing rule'
    ],
    doesNotDo: [
      'Not for tasks that require Opus from step one (architecture, strategy)',
      'Not worth it for small volumes - cascade overhead eats the savings',
      'Does not fit creative tasks that demand top quality from the start',
      'Does not work without a clear routing rule between layers',
      'Does not guarantee Opus-level quality for every query - only for escalated ones',
      'Does not replace security review (Haiku can miss a threat)',
      'Not flexible - add Opus to every query and you lose the point of the pattern'
    ],
    antiPatterns: [
      'Opus on the front line - 10x more expensive for no reason; the whole cascade idea is destroyed',
      'No triage - everything goes straight to Sonnet; you lose the Haiku front-line filter',
      'Skipping QA - errors in mass outputs leak into production',
      'One Haiku - bottleneck under batch load; 2x Haiku in parallel is the minimum',
      'Opus on every query - no escalation means no cascade, flat costs'
    ],
    keyConcepts: [
      {term: 'Cascade Escalation', def: 'Chained pattern where a task passes through increasingly expensive layers only when necessary.'},
      {term: 'Model routing', def: 'Decision logic choosing a cheap or expensive model based on task complexity.'},
      {term: 'Front-line triage', def: 'First layer classifying difficulty and filtering simple queries on the cheap model.'},
      {term: 'Quality gate', def: 'QA Quality checks artifacts before costly escalation to Opus.'},
      {term: '70-80 rule', def: 'Empirically measured distribution - 70-80 percent of tasks resolved by Haiku, 15-25 percent Sonnet, 5-10 Opus.'}
    ],
    stats: [
      {label: 'Agents', value: '5'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.65-1.65'},
      {label: 'Time', value: '2-4 min'}
    ],
    bestFor: [
      'When you have 1000+ support tickets per day to process',
      'When you\'re running batch document processing with filtering and classification',
      'When you have an ETL pipeline with quality validation at different layers'
    ],
    worstFor: [
      'When you have a small volume (dozens of tasks) - overhead not worth it',
      'When every task requires Opus from the start - you lose 70 percent of the pattern\'s cashflow',
      'When the project is mission-critical with no compromises - miss risk on Haiku'
    ],
    relatedPresets: ['data_pipe', 'kb_constructor', 'standard'],
    glossary: [
      {term: 'cascade', definition: 'Chained escalation through layers with rising cost and capability.'},
      {term: 'front-line', definition: 'First line of query handling by the cheapest model.'},
      {term: 'escalation', definition: 'Passing a task to a more expensive layer when the current one can\'t cope.'},
      {term: 'routing logic', definition: 'Rule deciding when to escalate a task between layers.'},
      {term: 'model tier', definition: 'Layer in the cascade defined by the model used (Haiku, Sonnet, Opus).'}
    ],
    learningQuote: 'Don\'t send a cardiac surgeon to a scratch - Cascade Cost teaches that the most expensive resource makes sense only for the hardest cases.',
    realExample: 'Imagine that you have a company with 1000 support tickets a day - the classic all-Opus model costs $150/day ($54750/year). Cascade Cost: Haiku H1 and H2 classify in parallel, 700 simple ones get auto-responses (Haiku cost $0.003), 200 medium ones go to Backend Dev (Sonnet $0.025), 100 hard ones land with QA and Opus ($0.036). Daily cost: ~$11.70. Savings: 92 percent, $138.30 per day, over $50000 per year. Final quality untouched because the 100 hard ones still get Opus.'
  },
  test_suite: {
    tagline: 'Three independent QA gates and a Manager with a GO/NO-GO decision - an examination board for code',
    missionShort: 'Testing Suite is a five-layer validation preset with no builders. Three independent QAs (Security, Quality, Performance) audit the artifact in parallel from their own perspectives, the QA Manager aggregates reports, synthesizes severity, and issues the final GO / CONDITIONAL GO / NO-GO decision.',
    whoIs: 'Reach for this preset before an important release, as a CI/CD quality gate, before a compliance audit (SOC2, HIPAA, PCI-DSS), or after a large merge before deploy. Ideal wherever you need three independent voices instead of one and a formal GO/NO-GO decision.',
    analogy: 'This preset is like a university examination board - three reviewers score independently (substance, methodology, originality), the board chair collects votes, the dean approves the result. All three must sign before the student defends.',
    howItWorks: [
      {label: 'Phase 1 - Artifact distribution', desc: 'The Orchestrator takes the code/artifact to test and distributes it in parallel to the three QAs. Each gets the SAME artifact with different instructions: Security - OWASP/auth/crypto, Quality - tests/edge cases/standards, Performance - benchmarks/memory/queries.'},
      {label: 'Phase 2 - Parallel testing', desc: 'Three QAs work AT THE SAME TIME in silence, zero overlap. QA Security scans against OWASP Top 10. QA Quality verifies logic correctness and test coverage. QA Performance analyzes algorithmic complexity and memory. Each produces a separate report.'},
      {label: 'Phase 3 - Report aggregation', desc: 'The QA Manager collects all three reports, merges issues, sorts by severity (CRITICAL/HIGH/MEDIUM/LOW), and applies the decision matrix. CRITICAL in Security - automatic NO-GO. HIGH more than 3 - NO-GO. Only MEDIUM/LOW - CONDITIONAL GO. None - GO.'},
      {label: 'Phase 4 - Decision and report', desc: 'The QA Manager issues the final verdict with concrete notes for fixes. GO - release approved. CONDITIONAL GO - release with known issues. NO-GO - block with precise notes on what to fix before re-test.'}
    ],
    inputs: [
      'Finished artifact for testing (code, module, deployment package)',
      'Target environment context (prod, staging, compliance requirements)',
      'Business and technical acceptance criteria',
      'Optional baseline for regression testing'
    ],
    outputs: [
      'QA Security report with OWASP vulnerability list and severity',
      'QA Quality report with test coverage and standards metrics',
      'QA Performance report with performance metrics and bottlenecks',
      'QA Manager synthesis with decision matrix and final verdict',
      'GO / CONDITIONAL GO / NO-GO decision with concrete fix notes'
    ],
    does: [
      'Audits the artifact from three independent perspectives at once',
      'Catches problems a single QA would miss (security vs quality vs perf)',
      'Cuts time 3x via parallelism instead of sequential running',
      'Applies a formal GO/NO-GO decision matrix',
      'Delivers a full severity report per layer',
      'Protects against CRITICAL security even when quality PASSes',
      'Works as a CI/CD gate before every release',
      'Prioritizes issues (CRITICAL/HIGH/MEDIUM/LOW)'
    ],
    doesNotDo: [
      'Does not build code - this is a pure validation preset, no builders',
      'Does not fix bugs - only detects and reports them',
      'Does not replace a professional pentest - it\'s an automated first line',
      'Does not work for simple tasks - cannon on a fly for a bugfix',
      'Does not test in production - validates artifacts pre-deploy',
      'Does not work mid-development - too early, too expensive',
      'Does not handle non-code artifacts (documents, designs)'
    ],
    antiPatterns: [
      'Sequential QA - security then quality then performance; 3x slower with no benefit',
      'No QA Manager - who makes the GO/NO-GO? Without synthesis the decision is subjective',
      'QA writes code - role confusion; QA ONLY tests and reports',
      'Ignoring LOW - technical debt accumulation; log LOW to the backlog',
      'FAIL = done - block with no fix path; FAIL must carry concrete notes'
    ],
    keyConcepts: [
      {term: 'Triple QA Gate', def: 'Architectural pattern of three independent auditors working in parallel on the same artifact.'},
      {term: 'GO/NO-GO decision', def: 'Formal gate that must be passed before an artifact reaches production.'},
      {term: 'Severity classification', def: 'The CRITICAL/HIGH/MEDIUM/LOW scale that determines which issues block a release and which don\'t.'},
      {term: 'Parallel aggregation', def: 'Parallel audit plus aggregation instead of a sequential chain.'},
      {term: 'Conditional GO', def: 'Intermediate decision - release allowed with a list of known issues to address later.'}
    ],
    stats: [
      {label: 'Agents', value: '5'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.50-1.25'},
      {label: 'Time', value: '3-5 min'}
    ],
    bestFor: [
      'When you have pre-release validation for an important launch',
      'When you\'re setting up a CI/CD quality gate before every deploy',
      'When you\'re preparing for a SOC2/HIPAA/PCI-DSS compliance audit'
    ],
    worstFor: [
      'When you want to build code - this preset only validates, no builders',
      'When you\'re fixing a bug - use bug_hunt or quick_fix instead',
      'When the task is small - cannon on a fly with pointless cost'
    ],
    relatedPresets: ['security', 'review', 'bug_hunt'],
    glossary: [
      {term: 'quality gate', definition: 'Formal validation gate in the pipeline that must be passed before the next stage.'},
      {term: 'severity', definition: 'Classification of issue weight (CRITICAL/HIGH/MEDIUM/LOW) defining its impact on the release decision.'},
      {term: 'fan-out', definition: 'Pattern where one agent sends the same task in parallel to multiple executors.'},
      {term: 'aggregate', definition: 'Merging many reports into one coherent verdict by the Manager.'},
      {term: 'CI/CD gate', definition: 'Automatic quality check built into the Continuous Integration/Deployment pipeline.'}
    ],
    learningQuote: 'Three eyes see more than one - Testing Suite introduces a formal GO/NO-GO process where there would otherwise be a single subjective opinion.',
    realExample: 'Imagine that you have a pre-release e-commerce API before production deploy - /orders, /payments, /users, /products. The Orchestrator distributes the code to three QAs in parallel. QA Security detects CRITICAL - plaintext card storage on /payments. QA Quality PASS with 2 MEDIUM. QA Performance HIGH - N+1 on /products. QA Manager: 1 CRITICAL in security = automatic NO-GO. Report: "Fix plaintext card storage, add AES-256, then re-test". Cost $0.18, time 4 minutes, worth avoiding a card data leak and lawsuits.'
  },
  a11y: {
    tagline: 'WCAG accessibility sprint - audit, redesign, implementation, validation and compliance docs',
    missionShort: 'Accessibility Sprint is a five-phase pipeline specialized in WCAG 2.1/2.2 AA compliance. UX Researcher audits barriers, Designer builds inclusive solutions, Frontend Dev implements semantic HTML and ARIA, QA Quality runs axe-core and Lighthouse, Writer produces the VPAT and developer guide.',
    whoIs: 'Reach for this preset when you need a WCAG audit before launch, remediation of an existing product, prep for ADA/EAA compliance, an accessibility redesign after an external audit, or mandatory government/public sector compliance. Ideal when the app already has a UI but a11y barriers block users.',
    analogy: 'This preset is like an accessibility building inspection - the inspector finds barriers, the architect designs ramps, the crew installs them, the inspector signs off, and a documentarian writes the compliance report for the authorities.',
    howItWorks: [
      {label: 'Phase 1 - A11y audit', desc: 'UX Researcher scans HTML/CSS/JS against WCAG 2.1/2.2. Checks semantic HTML, alt text, contrast ratios (AA 4.5:1, AAA 7:1), keyboard navigation, ARIA labels, screen reader compatibility, and prefers-reduced-motion. Produces a report with violations ranked by severity.'},
      {label: 'Phase 2 - Inclusive redesign', desc: 'Designer builds solutions for each violation: a new palette with compliant contrast, focus states, skip navigation, responsive typography in rem/em, icons with text labels, and forms with proper labels and error messages.'},
      {label: 'Phase 3 - Implementation', desc: 'Frontend Dev ships the redesign in code: semantic HTML instead of divs, ARIA role/label/describedby/live, CSS focus-visible and high-contrast media queries, JS keyboard event handlers, skip navigation links, and prefers-reduced-motion support.'},
      {label: 'Phase 4 - Tool-based validation', desc: 'QA Quality runs axe-core (automated WCAG audit), Lighthouse a11y score (target 95+), pa11y compliance checker, manual keyboard tests, and a contrast checker. Produces a PASS/FAIL report per WCAG criterion.'},
      {label: 'Phase 5 - Compliance documentation', desc: 'Writer produces the VPAT (Voluntary Product Accessibility Template), A11y Statement for the site, Developer Guide for future changes, Testing Checklist for QA, and a list of Known Issues with a remediation plan.'}
    ],
    inputs: [
      'Source code HTML/CSS/JS of the app or site',
      'Target WCAG level (AA standard, AAA for full compliance)',
      'Compliance requirements (ADA, EAA, Section 508)',
      'Optional external audit report if one already exists'
    ],
    outputs: [
      'WCAG audit report with violations ranked by severity (Critical/High/Medium)',
      'Redesign spec with new color tokens and components',
      'Updated code with semantic HTML and ARIA',
      'Validation report with Lighthouse score and axe-core verdict',
      'VPAT, A11y Statement, Developer Guide and Testing Checklist'
    ],
    does: [
      'Audits WCAG 2.1 AA and 2.2 compliance systematically',
      'Designs a fix for every violation found in the audit',
      'Implements semantic HTML and ARIA per W3C specs',
      'Runs axe-core, Lighthouse, and pa11y as automated tooling',
      'Tests keyboard navigation and screen reader flow',
      'Generates VPAT and A11y Statement for compliance reporting',
      'Ships a Developer Guide for future changes',
      'Typically hits a Lighthouse a11y score of 95+'
    ],
    doesNotDo: [
      'Does not touch the backend - focus is on the presentation layer',
      'Does not implement business logic - only the accessibility layer',
      'Does not run QA Security or Performance (use test_suite)',
      'Does not fit internal tools without a11y requirements',
      'Does not replace testing with real assistive-tech users',
      'Does not translate content into sign language (different scope)',
      'Does not handle apps without a UI layer (e.g. pure APIs)'
    ],
    antiPatterns: [
      'Skip the audit - Designer starts the redesign without knowing what\'s broken; redesigning blind',
      'No axe-core/pa11y - manual testing leaves gaps; automated tooling is the baseline',
      'Ignoring keyboard - 15 percent of users don\'t use a mouse; every component must be tab-tested',
      'A11y as an afterthought - adding accessibility after launch costs 10x more',
      'No docs - regression sneaks in on future changes because devs don\'t know the standard'
    ],
    keyConcepts: [
      {term: 'WCAG 2.1/2.2', def: 'Web Content Accessibility Guidelines - the official W3C accessibility standard.'},
      {term: 'Semantic HTML', def: 'Using H1-H6, nav, main, article, aside tags instead of generic divs.'},
      {term: 'ARIA labels', def: 'Accessible Rich Internet Applications attributes for screen readers.'},
      {term: 'VPAT', def: 'Voluntary Product Accessibility Template - the standard compliance report format.'},
      {term: 'Lighthouse score', def: 'Google tool that measures a11y score from 0 to 100 (preset target: 95+).'}
    ],
    stats: [
      {label: 'Agents', value: '5'},
      {label: 'Phases', value: '5'},
      {label: 'Est. cost', value: '$0.60-1.50'},
      {label: 'Time', value: '3-5 min'}
    ],
    bestFor: [
      'When you\'re preparing an app for WCAG 2.1 AA compliance',
      'When you got an external audit report and need to fix the barriers',
      'When you serve government/public sector clients with ADA/EAA requirements'
    ],
    worstFor: [
      'When the app has no UI (pure API or CLI)',
      'When you\'re building an internal tool for a team without a11y requirements',
      'When you need business logic or backend changes'
    ],
    relatedPresets: ['design_sys', 'ui_overhaul', 'feature_sprint'],
    glossary: [
      {term: 'WCAG', definition: 'Web Content Accessibility Guidelines - the international digital accessibility standard.'},
      {term: 'ARIA', definition: 'Accessible Rich Internet Applications - W3C spec that adds semantics for screen readers.'},
      {term: 'axe-core', definition: 'Open source engine for automated WCAG audits, used by Lighthouse and Deque.'},
      {term: 'VPAT', definition: 'Voluntary Product Accessibility Template - standard a11y compliance report.'},
      {term: 'contrast ratio', definition: 'Luminance ratio between text and background - WCAG AA requires 4.5:1 for body text.'}
    ],
    learningQuote: 'Accessibility is not a feature, it\'s a right - Accessibility Sprint treats digital barriers like physical ones that must be removed.',
    realExample: 'Imagine an e-commerce site before launch: UX Researcher scans 4 pages and finds 47 WCAG violations (8 Critical, 15 High, 24 Medium). Designer ships a new palette (contrast 8.2:1), focus rings, skip nav. Frontend Dev applies 47 fixes. QA Quality: axe-core 0 Critical, 0 High, 3 acceptable Medium. Lighthouse goes from 52 to 97. Writer generates the VPAT and Developer Guide. Cost $0.24, 5 minutes, well worth avoiding an ADA lawsuit (average fine $75,000).'
  },
  review: {
    tagline: 'Build plus separate review - Analyst plans, two builders build, two reviewers audit independently',
    missionShort: 'Code Review is a six-role preset that pairs new feature build with mandatory peer review. Analyst creates the implementation plan, Backend Dev and Frontend Dev build in parallel, then QA Security and QA Quality audit the finished artifact independently. AWS Pull Request pattern with strict separation of writer and reviewer.',
    whoIs: 'Reach for this preset when you have a critical feature that needs peer review, a PR touching security-sensitive code, a compliance-driven change, or any important feature where the author should not validate their own work. Ideal when you need separation of build and review, not just the same people doing both.',
    analogy: 'This preset is like a scientific publication - the author writes the paper, two independent reviewers judge methodology and clarity, and the editor decides accept/revise/reject. The author NEVER reviews themselves.',
    howItWorks: [
      {label: 'Phase 1 - Analysis and plan', desc: 'Analyst receives the feature request, breaks it into concrete build tasks, identifies files to change, defines backend vs frontend boundaries, and defines tests. Produces an implementation plan that acts as the contract for builders and the reference for QA.'},
      {label: 'Phase 2 - Parallel build', desc: 'Backend Dev and Frontend Dev work SIMULTANEOUSLY from the same plan. Backend builds API/DB/logic/middleware. Frontend builds components/state/API integration/styling. Each owns their slice of the plan and integration tests.'},
      {label: 'Phase 3 - Parallel audit', desc: 'QA Security and QA Quality audit the COMBINED artifact at the same time. QA Security scans the NEW code against OWASP Top 5 (Injection, XSS, Broken Access Control, Misconfig, Vulnerable Components). QA Quality verifies conformance with the Analyst\'s plan and quality metrics.'},
      {label: 'Phase 4 - PASS/REVISE/REJECT decision', desc: 'Orchestrator synthesizes both QA reports. PASS - code is merge-ready. REVISE - micro-loop, builders fix without changing the plan. REJECT - macro-loop, Analyst re-plans and the cycle restarts. Max 3 iterations, then escalation.'}
    ],
    inputs: [
      'Feature request describing the new functionality',
      'Spec of business and technical requirements',
      'Existing codebase to modify or extend',
      'Acceptance criteria and architectural context (stack, conventions)'
    ],
    outputs: [
      'Implementation plan from the Analyst with file mapping',
      'Backend artifact with new/modified server code and tests',
      'Frontend artifact with UI code and component tests',
      'QA Security report with OWASP Top 5 audit of the new code',
      'QA Quality report with plan matching and metrics + PASS/REVISE/REJECT verdict'
    ],
    does: [
      'Separates writer from reviewer (AWS Pattern)',
      'Creates a formal review phase like a Pull Request in a human team',
      'Builds backend and frontend in parallel from one plan',
      'Audits new code (not the whole codebase) like a git diff review',
      'Checks build-vs-plan drift detection',
      'Offers three feedback loop levels (revise/reject/escalation)',
      'Catches security issues in new code before merge',
      'Delivers full traceability from plan to artifact'
    ],
    doesNotDo: [
      'Does not run a research phase - assumes you know the requirements',
      'Does not fit small changes - too heavy for typo fixes',
      'Does not audit the whole codebase - only new code (diff)',
      'Does not include QA Performance - focus is security and quality',
      'Does not replace a professional code review by a senior',
      'Does not work without a concrete feature request - needs input',
      'Does not do exploration - use recon or reflect for that'
    ],
    antiPatterns: [
      'Author reviews self - violates the AWS Pattern, no separation',
      'No Analyst - Builders guess the contract, QA has no baseline to validate',
      'Sequential build - Backend waits for Frontend or vice versa; 30-40 percent slower',
      'Full codebase audit - instead of git diff, 10x the cost, 90 percent irrelevant issues',
      'Max iterations exceeded without escalation - Orchestrator must step in after 3 iterations'
    ],
    keyConcepts: [
      {term: 'AWS Pattern', def: 'Build and review as separate parallel phases with strict separation of writers and reviewers.'},
      {term: 'Pipeline + Fan-out', def: 'Hybrid architecture - linear first (Analyst), then parallel (Builders, then QA).'},
      {term: 'Micro-loop', def: 'REVISE - QA returns notes, Builders fix, same plan, QA re-verifies.'},
      {term: 'Macro-loop', def: 'REJECT - QA rejects the plan, Analyst re-plans, Builders start over, QA re-verifies.'},
      {term: 'Plan matching', def: 'QA Quality checks that the artifact does exactly what the implementation plan said.'}
    ],
    stats: [
      {label: 'Agents', value: '6'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.05-2.70'},
      {label: 'Time', value: '4-6 min'}
    ],
    bestFor: [
      'When you have a critical feature that needs mandatory review before merge',
      'When the change touches security-sensitive code (auth, payments, user data)',
      'When you need a compliance audit trail (who built, who reviewed)'
    ],
    worstFor: [
      'When you\'re making small changes like typos or copy changes',
      'When you need quick research - no research phase here',
      'When the project is low-risk and review overhead isn\'t justified'
    ],
    relatedPresets: ['security', 'test_suite', 'feature_sprint'],
    glossary: [
      {term: 'pull request', definition: 'Formal request to review and merge code changes - the human equivalent of this preset.'},
      {term: 'AWS Pattern', definition: 'Amazon Web Services practice that separates builders from reviewers.'},
      {term: 'drift', definition: 'Deviation between build and plan - when a builder does something different than the Analyst planned.'},
      {term: 'micro-loop', definition: 'Short fix loop without changing the plan - just notes from QA to builders.'},
      {term: 'macro-loop', definition: 'Large loop - back to the Analyst for re-planning and a fresh build.'}
    ],
    learningQuote: 'Who wrote it does not review it - Code Review applies Amazon\'s golden engineering rule as a structural multi-agent pattern.',
    realExample: 'Imagine a "email notifications" feature for a SaaS app - Analyst creates a plan with 7 Backend tasks (EmailService, rate limiter, endpoints) and 5 Frontend tasks (preferences page, toggle, hook). Backend Dev and Frontend Dev build in parallel in 55 and 60 seconds. QA Security finds a MEDIUM - missing validation that the user is modifying THEIR OWN preferences. QA Quality PASS at 82 percent coverage. Orchestrator: PASS with a note "add middleware verifying req.user.id before production". 235K tokens, $0.32, 280 seconds, merge-ready.'
  },
  security: {
    tagline: 'Three-tier security audit with GO/NO-GO - OWASP, quality, performance, and a Manager synthesizing verdicts',
    missionShort: 'Security Hardening is a six-role pre-deployment audit preset. Backend Dev hardens the code (validation, sanitization, rate limiting, security headers), then three independent QAs (Security under OWASP Top 10, Quality under code quality, Performance under runtime performance) audit in parallel. QA Manager synthesizes all three reports into a formal GO / CONDITIONAL GO / NO-GO decision.',
    whoIs: 'Reach for this preset when you\'re running a pre-release security audit, compliance verification (PCI DSS, HIPAA, SOC2), production deployment gate, or prep for an external audit. Ideal anywhere the cost of an incident (IBM 2025 average $4.88M) vastly outweighs the $0.75-1.95 cost of an automated audit.',
    analogy: 'This preset is like a bridge inspection before opening - a structural engineer checks load capacity, a seismic expert checks shock resistance, a safety inspector checks overall risk. The chief inspector issues the permit only when all three say YES. Without everyone\'s sign-off the bridge does not open.',
    howItWorks: [
      {label: 'Phase 1 - Hardening by Backend Dev', desc: 'Orchestrator receives the artifact, Backend Dev hardens the code (does not build new features): adds input validation, output sanitization, rate limiting, security headers (CSP, HSTS, X-Frame-Options), CORS, security logging. Returns a hardened artifact.'},
      {label: 'Phase 2 - Fan-out three-tier audit', desc: 'Orchestrator distributes the hardened artifact SIMULTANEOUSLY to three QAs. Q-01 Security scans against OWASP Top 10 (Injection, Broken Access Control, Crypto Failures, Auth, Misconfig, Logging). Q-02 Quality verifies DRY/SOLID/tests/docs. Q-04 Performance analyzes Big-O/N+1/memory/I/O.'},
      {label: 'Phase 3 - Aggregation by QA Manager', desc: 'QA Manager (the only agent that sees all three reports) synthesizes them via a decision matrix. CRITICAL in Security = automatic NO-GO. HIGH in any layer = CONDITIONAL GO. Only MEDIUM/LOW = GO with notes. Overriding rule: CRITICAL Security ALWAYS blocks release.'},
      {label: 'Phase 4 - Final decision', desc: 'Orchestrator delivers the outcome: GO - full release approved. CONDITIONAL GO - release with a list of known issues and sprint follow-ups. NO-GO - escalation to Backend Dev for specific fixes, then another audit cycle.'}
    ],
    inputs: [
      'Finished source code ready to audit (JS/TS/Python/Go/etc.)',
      'Configuration - .env, docker-compose, nginx.conf, Dockerfile',
      'Specs - description of what the code should do (for conformance checks)',
      'Deployment context and compliance requirements (SOC2, GDPR, HIPAA, PCI-DSS)'
    ],
    outputs: [
      'Hardened artifact after the Backend Dev pass (validation, rate limiting, headers)',
      'QA Security report with OWASP vulnerability list and severity classification',
      'QA Quality report with DRY, SOLID, coverage, cyclomatic complexity metrics',
      'QA Performance report with Big-O, N+1 queries, memory leaks, bottlenecks',
      'QA Manager synthesis and formal GO / CONDITIONAL GO / NO-GO decision'
    ],
    does: [
      'Audits code from three independent perspectives (security, quality, performance)',
      'Catches 70-85 percent of common pre-deployment vulnerabilities',
      'Maps issues to OWASP Top 10 categories with severity',
      'Applies a formal GO/NO-GO decision matrix',
      'Guarantees CRITICAL security always blocks release',
      'Delivers an audit trail for compliance (SOC2, HIPAA, PCI-DSS)',
      'Hardens code via Backend Dev before QA starts auditing',
      'Iterates fixes until the verdict is GO or CONDITIONAL'
    ],
    doesNotDo: [
      'Does not replace professional human pentesting',
      'Does not replace manual code review by a senior engineer',
      'Does not catch business logic flaws that need domain context',
      'Does not test in production or run live exploits',
      'Does not auto-fix discovered vulnerabilities (only Backend Dev hardens upfront)',
      'Does not work on feature requests without ready code',
      'Does not perform a full OWASP ASVS audit (that\'s human pentester scope)'
    ],
    antiPatterns: [
      'Sequential audit - security then quality then performance; 3x slower with no gain',
      'No QA Manager - three independent reports without synthesis; GO/NO-GO decision becomes subjective',
      'Skipping Backend Dev hardening - audit without prior protection; more issues to fix',
      'Ignoring CRITICAL - attempting release despite a security block; incident risk',
      'No compliance context - audit without SOC2/HIPAA/PCI requirements; report won\'t match auditor expectations'
    ],
    keyConcepts: [
      {term: 'Fan-out to Aggregate', def: 'Pattern where Orchestrator dispatches work to multiple specialists and a Manager aggregates reports into a synthesis.'},
      {term: 'OWASP Top 10', def: 'Web application security standard - the ten most common vulnerability categories.'},
      {term: 'GO/NO-GO gate', def: 'Formal decision gate that must be passed before an artifact reaches production.'},
      {term: 'Severity matrix', def: 'Decision table mapping combinations of severity across three layers to GO/CONDITIONAL/NO-GO.'},
      {term: 'Hardening pass', def: 'Initial code strengthening (validation, headers, rate limiting) before the audit begins.'}
    ],
    stats: [
      {label: 'Agents', value: '6'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.75-1.95'},
      {label: 'Time', value: '3-6 min'}
    ],
    bestFor: [
      'When running a pre-release security audit before production deploy',
      'When preparing for a compliance audit (PCI DSS, HIPAA, SOC2)',
      'When you need a formal GO/NO-GO gate instead of a subjective opinion'
    ],
    worstFor: [
      'When trying to replace professional pentest - this is the first line, not the only one',
      'When making cosmetic UI changes - too heavy a preset',
      'When the app has no sensitive data and a security audit isn\'t needed'
    ],
    relatedPresets: ['security_multi_vector', 'review', 'test_suite'],
    glossary: [
      {term: 'OWASP', definition: 'Open Web Application Security Project - organization that standardizes web security.'},
      {term: 'hardening', definition: 'Process of strengthening code by adding validation, sanitization, and security controls.'},
      {term: 'severity', definition: 'Classification of vulnerability weight: CRITICAL, HIGH, MEDIUM, LOW.'},
      {term: 'PCI DSS', definition: 'Payment Card Industry Data Security Standard - required for apps handling payment cards.'},
      {term: 'fan-out', definition: 'Pattern of dispatching one artifact in parallel to multiple auditors.'}
    ],
    learningQuote: 'Three independent voices and a decision matrix - Security Hardening turns subjective fear of a breach into a structured GO/NO-GO process.',
    realExample: 'Imagine an e-commerce API two weeks before Black Friday - 12 Node/Express files, docker-compose, nginx, .env.production. Backend Dev hardens: input validation, rate limiting, security headers, CORS. Fan-out: QA Security finds HIGH - missing card validation per PCI. QA Quality PASS with MEDIUM on missing JSDoc. QA Performance HIGH - N+1 in /orders. QA Manager: HIGH security plus HIGH performance = CONDITIONAL GO with notes "fix before Black Friday". Orchestrator dispatches fixes, re-audit PASS, GO. Cost $0.35, 5 minutes, incident cost avoided.'
  },
  design_sys: {
    tagline: 'Brand book and component library in one pass - tokens, components, Storybook ready to ship',
    missionShort: 'Design System builds a consistent visual language for the app: tokens, palette, typography, components, and docs. Output is a React/Vue library synced with Storybook, ready for reuse across all products. Zero backend, zero business logic.',
    whoIs: 'Product teams and startups who notice every new screen looks different and want to unify the look once and for all. Especially useful at brand launch, rebrand, or when three frontend teams build three different button styles.',
    analogy: 'This preset is like building a brand book for a fashion house - trend researchers (UX + Docs) scan the runway and the docs, the designer draws the collection, the developer sews the finished pieces, and the copywriter writes the styling rules.',
    howItWorks: [
      {label: 'Phase 1: UX + Docs research', desc: 'UX Researcher analyzes trends (Material 3, Radix, shadcn, Linear) while Docs Researcher scans framework docs for design tokens, theming APIs, and accessibility constraints.'},
      {label: 'Phase 2: Design tokens + components', desc: 'Designer creates the palette, typographic scales, spacing scale, and dark mode tokens. Defines component variants (button sizes, input states, card elevations) as a single source of truth.'},
      {label: 'Phase 3: Frontend implementation', desc: 'Frontend Developer ships tokens as CSS custom properties or a theme object, codes React/Vue components on top of Radix/Headless UI, and builds a Storybook with every variant.'},
      {label: 'Phase 4: Docs + guidelines', desc: 'Writer produces usage docs: when to use primary vs secondary button, how to compose cards, spacing and typography rules, and when it\'s OK to break them.'}
    ],
    inputs: [
      'Existing app (screenshots) or moodboard for a new brand',
      'Frontend tech stack (React, Vue, Svelte) and preferred base libraries',
      'Branding constraints (brand colors, licensed fonts, logo)',
      'Success criteria (WCAG AA/AAA, dark mode, RTL support, min browser versions)'
    ],
    outputs: [
      'Design tokens in CSS variables or JSON format (colors, spacing, typography, radii, shadows)',
      'React/Vue component library with full variants and states (hover, focus, disabled)',
      'Storybook with live examples of every component and variant',
      'Usage documentation with DO/DONT examples and composition rules',
      'Accessibility report: contrast, focus indicators, keyboard nav, ARIA compliance'
    ],
    does: [
      'Creates a consistent visual language from palette down to micro-interactions',
      'Defines tokens as a single source of truth for all products',
      'Builds a component library synced with Storybook',
      'Ships dark mode and accessibility on day one (not as an afterthought)',
      'Writes guidelines with DO/DONT examples for every component',
      'Integrates existing libraries (Radix, Headless UI) instead of reinventing the wheel',
      'Delivers screenshot tests and visual regression (Chromatic) to protect the design from drift',
      'Validates APCA/WCAG contrast and typographic legibility at the token stage'
    ],
    doesNotDo: [
      'Does not build backend or APIs (that\'s API Modernization territory)',
      'Does not build business logic or app state',
      'Does not design individual screens (use UI Overhaul or Feature Sprint for that)',
      'Does not ship content management or a CMS',
      'Does not create marketing sites or landing pages',
      'Does not replace ready systems like Material UI or Ant Design when they\'re enough',
      'Does not do product copywriting (only system documentation)'
    ],
    antiPatterns: [
      'Color Copy Paste - duplicating hex values across the app instead of referencing tokens',
      'One-Off Component - building a new button for every screen instead of a variant',
      'Storybook Graveyard - Storybook built for a one-time demo, then never updated',
      'Design Token Overload - 400 colors in the palette instead of the 12 anyone can remember',
      'Frankensystem - mixing Material UI, Chakra, and custom components without a shared philosophy'
    ],
    keyConcepts: [
      {term: 'Design tokens', def: 'Named, reusable values (color, spacing, radius) expressed as variables.'},
      {term: 'Storybook', def: 'Environment for isolated development and documentation of UI components with live examples.'},
      {term: 'Headless components', def: 'Libraries like Radix that deliver logic and accessibility without imposed styles.'},
      {term: 'Visual regression', def: 'Automated component screenshots compared between commits to catch unwanted changes.'},
      {term: 'Theming API', def: 'Mechanism to swap themes (light/dark, brand A/B) without rewriting components.'}
    ],
    stats: [
      {label: 'Agents', value: '6'},
      {label: 'Phases', value: '3'},
      {label: 'Est. cost', value: '$0.85-2.15'},
      {label: 'Time', value: '8-14 min'}
    ],
    bestFor: [
      'When a new brand or rebrand needs a consistent visual language from the first screen',
      'When multiple frontend teams ship divergent styles and you want to unify them',
      'When you need a reusable component library for multiple products'
    ],
    worstFor: [
      'When the project needs business logic or backend (those roles aren\'t on the team)',
      'When stock Material UI or shadcn is enough without customization',
      'When you have only one screen to polish (too much overhead for a single view)'
    ],
    relatedPresets: ['ui_overhaul', 'api_modern', 'a11y'],
    glossary: [
      {term: 'token', definition: 'Semantic design variable (color-primary, spacing-md) referenced by components.'},
      {term: 'variant', definition: 'Alternate form of a component (button primary vs secondary, size sm vs lg).'},
      {term: 'dark mode', definition: 'Alternate theme with dark backgrounds and light text, toggled by system preference.'},
      {term: 'APCA', definition: 'Accessible Perceptual Contrast Algorithm - newer contrast calculation for WCAG 3.'},
      {term: 'headless UI', definition: 'Component that provides logic and a11y but leaves styling to the user.'}
    ],
    learningQuote: 'A design system isn\'t a collection of components - it\'s a contract that makes every new screen look like one hand drew it.',
    realExample: 'Imagine a SaaS startup that added screens ad-hoc for two years. Three different "save" buttons, four shades of blue, six heading sizes. A new designer spends half their time asking "which button do I use?". This preset, in one pass, creates tokens, components, and Storybook - after adoption every new screen starts looking like it came from a single book.'
  },
  api_modern: {
    tagline: 'Modernizing the app\'s engine without touching the UI - versioning, contracts, and backward compatibility',
    missionShort: 'API Modernization evolves a legacy API without touching the frontend: introduces versioning, migrates from REST to GraphQL, adds pagination, authorization, and idempotency. Output is new contracts and integrators guaranteeing that old clients keep working while new ones get a better interface.',
    whoIs: 'Backend teams with a working API that\'s starting to block growth: no versioning, no pagination, mixed styles, chaotic field names. Especially useful when you need to ship GraphQL alongside REST without breaking partner integrations.',
    analogy: 'This preset is like replacing plumbing in a building while residents still live there - pipes and cables (the API) get modernized quietly, while residents (frontend, mobile, partners) still see the same walls and light switches.',
    howItWorks: [
      {label: 'Phase 1: Existing API analysis', desc: 'Analyst maps all endpoints, formats, authentication, pagination, and identifies hidden contracts (what partners actually consume vs what\'s in the docs).'},
      {label: 'Phase 2: Pattern research', desc: 'Tech Researcher checks modern standards: OpenAPI 3.1, JSON:API, GraphQL, cursor pagination, idempotency keys, rate limiting, plus migration patterns like versioned URLs or header-based versioning.'},
      {label: 'Phase 3: Build + integration', desc: 'Backend Developer writes new endpoints or GraphQL resolvers, Integrator builds the compatibility layer (adapter from v1 to v2) so old clients keep working without changes.'},
      {label: 'Phase 4: Contract QA', desc: 'QA Quality tests full compatibility: contracts (Pact), performance (response time), regression (do old clients still get identical responses?), header versioning.'}
    ],
    inputs: [
      'Existing API with documentation (OpenAPI spec, Postman collection, or code)',
      'List of known consumers (frontend, mobile, partners, webhooks)',
      'Migration goal (REST to GraphQL, v1 to v2, adding pagination)',
      'Compatibility constraints (how long to keep the old version, SLA)'
    ],
    outputs: [
      'New contract (OpenAPI 3.1 or GraphQL schema) with versioning',
      'Endpoint or resolver implementation matching the new contract',
      'Compatibility layer (adapter v1 to v2) for old clients',
      'Migration guide for API consumers with before and after examples',
      'Contract tests (Pact or Dredd) protecting against contract regression'
    ],
    does: [
      'Introduces API versioning (URL, header, or GraphQL schema evolution)',
      'Migrates between styles (REST to GraphQL, RPC to REST)',
      'Adds modern pagination (cursor-based instead of offset)',
      'Ships idempotency keys for write operations',
      'Builds a compatibility layer so old clients keep working',
      'Updates authorization (OAuth 2.1, JWT, API keys) without killing existing tokens',
      'Writes contract tests protecting against unwanted breaking changes'
    ],
    doesNotDo: [
      'Does not design user interfaces or visual styling (no Designer or FE)',
      'Does not add new business features (that\'s Feature Sprint territory)',
      'Does not do full database rebuilds (only adapters over the existing schema)',
      'Does not touch client frontend logic - only delivers a compatible API',
      'Does not create partner SDKs (that\'s a separate pipeline)',
      'Does not replace security pentests (that\'s Security Hardening territory)',
      'Does not migrate infrastructure (AWS, Kubernetes) - only the app layer'
    ],
    antiPatterns: [
      'Big Bang Migration - killing v1 the same day v2 ships and breaking every client',
      'Silent Breaking Change - changing response format without versioning or alerting consumers',
      'Double Maintenance Hell - keeping v1 and v2 alive in parallel for 3 years with no exit plan',
      'Pagination Bait - introducing a limit of 100 results without doc notice, clients lose data',
      'GraphQL Cargo Cult - shipping GraphQL only because it\'s trendy, without real need'
    ],
    keyConcepts: [
      {term: 'Contract versioning', def: 'Mechanism for multiple API versions to coexist (URL, header, field).'},
      {term: 'Backward compatibility', def: 'Guarantee that old clients keep working after a new version ships.'},
      {term: 'Cursor pagination', def: 'Pagination based on a stable key instead of offset, robust against inserts.'},
      {term: 'Idempotency key', def: 'Identifier that lets you safely retry a POST request without duplicating the effect.'},
      {term: 'Contract test', def: 'Test that compares the API producer\'s contract against consumer expectations.'}
    ],
    stats: [
      {label: 'Agents', value: '6'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.95-2.35'},
      {label: 'Time', value: '10-16 min'}
    ],
    bestFor: [
      'When a legacy API is choking growth and versioning is missing',
      'When you\'re migrating REST to GraphQL and partners still need the old endpoints',
      'When you need to add pagination, authorization, or idempotency without touching the frontend'
    ],
    worstFor: [
      'When the project needs visual or UX changes (no designer)',
      'When there\'s no existing API - this preset is for evolution, not greenfield',
      'When you need a new client-facing business feature (use Feature Sprint)'
    ],
    relatedPresets: ['design_sys', 'feature_sprint', 'legacy'],
    glossary: [
      {term: 'OpenAPI', definition: 'REST API description standard (YAML/JSON) enabling auto-generation of clients and docs.'},
      {term: 'GraphQL', definition: 'Query language with a typed schema that lets the client declare exactly which fields it needs.'},
      {term: 'deprecation', definition: 'Marking a field or endpoint as obsolete in advance before removal.'},
      {term: 'Pact', definition: 'Framework for consumer-driven contract testing that prevents breaking integrations.'},
      {term: 'versioning', definition: 'Strategy for keeping multiple API versions in parallel (URL, header, field).'}
    ],
    learningQuote: 'A good API changes without stopping its consumers - a bad preset breaks every integration on a Friday night.',
    realExample: 'Imagine a SaaS app with a five-year-old REST API: offset pagination, no versions, fields alternating snake_case and camelCase. The mobile app gets duplicates while paging, and a partner integration sometimes drops records. This preset analyzes, designs v2 with cursor pagination, ships a v1 adapter, writes contract tests, and delivers a migration guide - zero downtime, zero broken clients.'
  },
  ui_overhaul: {
    tagline: 'Refreshing the product\'s look without touching the backend - new styles, animations, and micro-interactions',
    missionShort: 'UI Overhaul redesigns an existing app interface: new typography, new palette, modern components, micro-interactions, and dark mode. Backend stays untouched, and users see a product that changed like an apartment after renovation. 7 agents with dual UX+Docs research for full coverage of trends and constraints.',
    whoIs: 'Teams with a working product that looks dated and loses conversions or customers because of it. Ideal when a SaaS works technically fine but the UI looks like 2016 and new users bounce off the landing page.',
    analogy: 'This preset is like a full apartment renovation where the load-bearing walls stay in place - the interior architect researches trends, checks what can move and what can\'t, designs the new style, and the crew replaces floors, paint, and lighting without knocking down walls.',
    howItWorks: [
      {label: 'Phase 1: Dual UX + Docs research', desc: 'UX Researcher scans design patterns (Linear, Vercel, Arc, Notion) and 2026 trends. Docs Researcher in parallel checks framework constraints, accessibility, and browser support requirements.'},
      {label: 'Phase 2: Existing UI analysis', desc: 'Analyst inventories all screens, components, and states, mapping which parts can safely change and which need backend coordination (e.g. changing pagination API).'},
      {label: 'Phase 3: Design + implementation', desc: 'Designer builds the new visual system (colors, typography, spacing, dark mode), and Frontend Developer in parallel ships it as a refactor of existing components, keeping the same props and component API.'},
      {label: 'Phase 4: Visual and a11y QA', desc: 'QA Quality runs visual regression tests, checks contrast, animations on low-end devices, dark mode, responsive breakpoints, and WCAG 2.2 AA compliance.'}
    ],
    inputs: [
      'Existing app (screenshots, URL, repo access)',
      'Moodboard or design references (Linear, Vercel, competitors)',
      'Constraints (branding, browser support, performance budget)',
      'Success criteria (conversion, NPS, modernity, dark mode)'
    ],
    outputs: [
      'New design system implemented in the existing repo',
      'Component refactor preserving backward compatibility of component API',
      'Dark mode with automatic system preference detection',
      'Micro-interactions and animations respecting prefers-reduced-motion',
      'Visual regression suite protecting against unwanted changes'
    ],
    does: [
      'Refreshes colors, typography, spacing, and visual hierarchy',
      'Ships dark mode and themes from day one',
      'Adds micro-interactions and animations where they make sense',
      'Refactors components without changing their API (drop-in replace)',
      'Validates contrast, focus indicators, and keyboard navigation',
      'Optimizes bundle size for new CSS and assets',
      'Writes visual regression tests protecting the new look',
      'Integrates UX research with technical framework constraints'
    ],
    doesNotDo: [
      'Does not change the backend, API, or data model',
      'Does not add new business features (only existing ones in a new form)',
      'Does not design from scratch if there\'s no existing product (use Feature Sprint)',
      'Does not build a full design system as a library (use Design System)',
      'Does not replace user research (interviews, usability tests)',
      'Does not migrate the framework (React to Svelte) - only the look in the current stack',
      'Does not do copywriting or strategic rebranding'
    ],
    antiPatterns: [
      'Lipstick on a Pig - changing colors without fixing the information architecture that was the actual problem',
      'Trend Chasing - shipping glassmorphism only because it\'s trendy, without matching the brand',
      'Animation Overload - animating every element until the page becomes painful for epileptic users',
      'Dark Mode Half-Baked - dark mode built for main screens only, rest stays white',
      'Component API Break - a refactor that forces product teams to rewrite every usage site'
    ],
    keyConcepts: [
      {term: 'Visual regression', def: 'Automated comparison of component screenshots between versions to detect changes.'},
      {term: 'prefers-reduced-motion', def: 'System preference that lets the user disable animations, every redesign must honor it.'},
      {term: 'Drop-in replace', def: 'Refactor that needs no changes at usage sites - new component has the same API as the old one.'},
      {term: 'Micro-interaction', def: 'Small animation signaling response to a user action (hover, click, state change).'},
      {term: 'APCA contrast', def: 'Modern color contrast algorithm (WCAG 3 draft) more accurate than old WCAG 2.1 ratios.'}
    ],
    stats: [
      {label: 'Agents', value: '7'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.95-2.35'},
      {label: 'Time', value: '10-18 min'}
    ],
    bestFor: [
      'When a product works technically fine but looks dated and is losing users',
      'When you want to add dark mode and modern micro-interactions to an existing app',
      'When you have an existing React/Vue stack and don\'t want to migrate it, just refresh the look'
    ],
    worstFor: [
      'When the project needs backend changes or new business features',
      'When you\'re starting from scratch with no existing UI (use Feature Sprint or Startup MVP)',
      'When you need a full reusable component library (use Design System)'
    ],
    relatedPresets: ['design_sys', 'feature_sprint', 'a11y'],
    glossary: [
      {term: 'redesign', definition: 'Rebuilding the look of an existing interface while preserving its functionality.'},
      {term: 'dark mode', definition: 'Alternate theme with dark backgrounds, toggled automatically or manually.'},
      {term: 'easing', definition: 'Animation timing curve defining how an element accelerates and decelerates.'},
      {term: 'focus-visible', definition: 'CSS selector showing the focus ring only when the user navigates by keyboard.'},
      {term: 'scroll-snap', definition: 'CSS mechanism that stops scroll at specific points for carousels and full-screen sections.'}
    ],
    learningQuote: 'Redesign isn\'t about changing colors - it\'s about the product feeling like someone touched it recently with love.',
    realExample: 'Imagine a five-year-old project management SaaS. Features are good, customers pay, but new users say "looks like Trac". This preset runs dual research (2026 trends + React constraints), designs a new system, ships dark mode, adds scroll animations on the task list - within a week NPS rises by 12 points and demo sales go up 20 percent without a single backend change.'
  },
  feature_sprint: {
    tagline: 'Full cycle from idea to shipping a new feature - analysis, research, backend, frontend, tests',
    missionShort: 'Feature Sprint delivers a new feature end-to-end: requirements analysis, tech and UX research, parallel backend and frontend implementation, and QA before release. Ideal when you have a clearly defined feature request and want to ship it without chaos.',
    whoIs: 'Product managers and tech leads who have a specific idea for a new feature (e.g. "comments on documents" or "CSV export") and want a ready, tested, flag-gated feature in a single run. Not for rebrands or refactoring.',
    analogy: 'This preset is like building a new room in an existing house - check if the foundations can take it, design the layout, install the systems (backend), finish the interior (frontend), and finally pass the inspection (QA).',
    howItWorks: [
      {label: 'Phase 1: Requirements analysis', desc: 'The Analyst decomposes the feature request into concrete user stories, defines edge cases, identifies dependencies on the existing system, and sizes the work.'},
      {label: 'Phase 2: Dual Tech + UX research', desc: 'Two researchers run in parallel: Tech investigates implementation options (libraries, patterns, tradeoffs) and UX checks how competitors and design patterns handle similar scenarios.'},
      {label: 'Phase 3: Parallel backend + frontend build', desc: 'Backend Developer builds the API and data models, Frontend Developer implements the UI in parallel. They coordinate through API contracts defined in Phase 2.'},
      {label: 'Phase 4: QA and feature flag', desc: 'QA Quality tests manually and automatically, checks for regressions, measures performance. The feature ships behind a flag, allowing gradual rollout.'}
    ],
    inputs: [
      'Feature request or user story (what it does, for whom, why)',
      'Constraints (deadline, tech stack, dependencies)',
      'Existing codebase access (so the new feature matches conventions)',
      'Success criteria (conversion, performance, adoption metrics)'
    ],
    outputs: [
      'Backend implementation (API, data models, DB migrations)',
      'Frontend implementation (components, state, API integration)',
      'Automated tests (unit, integration, critical-path e2e)',
      'Feature flag enabling gradual rollout and rollback',
      'User and developer docs (how to use and how to extend)'
    ],
    does: [
      'Decomposes vague feature requests into concrete user stories',
      'Researches current tech and UX patterns before writing code',
      'Builds backend and frontend in parallel (compresses time)',
      'Writes tests for critical user paths',
      'Ships a feature flag to enable gradual rollout',
      'Documents API and interactions for the dev team',
      'Validates consistency with existing code and design conventions',
      'Captures baseline metrics before release for later comparison'
    ],
    doesNotDo: [
      'Does not do full visual redesign (use UI Overhaul)',
      'Does not build a design system from scratch (use Design System)',
      'Does not fix bugs in existing code (use Bug Hunter or Quick Fix)',
      'Does not refactor an entire module (use Legacy Refactor)',
      'Does not run deep 6-source research (use Research Swarm)',
      'Does not run adversarial architecture debate (use Five Minds)',
      'Does not work without a clearly defined feature request'
    ],
    antiPatterns: [
      'Scope Creep - demanding a half-rebrand mid-feature',
      'Copy From Competitor - blindly copying a competitor UI without understanding context',
      'Skip the QA - shipping to prod without feature flag or tests',
      'Ghost Feature - launching without baseline metrics, you never learn if it helped',
      'Backend First Blocker - waiting a month for backend to finish before frontend starts'
    ],
    keyConcepts: [
      {term: 'Feature flag', def: 'Runtime toggle that enables or disables a feature without deployment, enabling gradual rollout.'},
      {term: 'User story', def: 'Requirement format: as a [role] I want [action] so that [business goal].'},
      {term: 'Canary release', def: 'Shipping a new feature to a small percentage of users before full rollout.'},
      {term: 'Contract-first', def: 'Approach where BE and FE agree on the API before implementation starts.'},
      {term: 'Baseline metrics', def: 'KPI measurements before release, used to compare the effect after launch.'}
    ],
    stats: [
      {label: 'Agents', value: '7'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.10-2.70'},
      {label: 'Time', value: '12-20 min'}
    ],
    bestFor: [
      'When you have a clearly defined feature request and want to ship it end-to-end',
      'When a new feature needs both backend and frontend',
      'When you want a feature flag for safe gradual rollout'
    ],
    worstFor: [
      'When it\'s just a visual refresh (use UI Overhaul)',
      'When it\'s an urgent bugfix without a new feature (use Quick Fix or Bug Hunter)',
      'When you don\'t yet have a clear idea what to build (use Research Swarm or Recon)'
    ],
    relatedPresets: ['standard', 'ui_overhaul', 'plan_exec'],
    glossary: [
      {term: 'user story', definition: 'Requirement written as a narrative about the user, their goal, and the context.'},
      {term: 'feature flag', definition: 'A switch in code that enables a feature only for selected users.'},
      {term: 'contract', definition: 'Formal API spec agreed between BE and FE before implementation.'},
      {term: 'rollout', definition: 'The process of gradually releasing a new feature to successive user groups.'},
      {term: 'regression', definition: 'Breaking a previously working feature by introducing a new change.'}
    ],
    learningQuote: 'A good feature sprint is one users never notice - something just shows up that wasn\'t there yesterday, and it works.',
    realExample: 'Imagine a task management SaaS: the PM says "let\'s add comments on cards". This preset decomposes it into mentions, notifications, edits, deletes, researches how Linear and Notion handle similar things, builds API and component in parallel, ships behind a feature flag to 10% of users, and measures engagement - a week later 28% of cards have at least one comment and the decision to roll out fully is obvious.'
  },
  standard: {
    tagline: 'Universal 8-agent team - the safe default for 70% of typical web and SaaS projects',
    missionShort: 'Standard Dev delivers the full cycle from planning through research and implementation to QA for typical web projects. 8 agents in a hierarchical pipeline: orchestrator, analyst, planner, researcher, backend, frontend, and two testers. The statistical sweet spot for most SaaS and web app tasks.',
    whoIs: 'Teams and freelancers who don\'t want to agonize over preset choice - Standard is the safe default that covers most real needs. Ideal for admin panels, dashboards, CRUD apps, and mid-sized SaaS features.',
    analogy: 'This preset is like an architecture firm putting up an office building - the director coordinates, the analyst gathers requirements, the planner draws the schedule, researchers check materials, the construction crew (BE+FE) executes, and the safety inspector signs off.',
    howItWorks: [
      {label: 'Phase 1: Strategy + analysis', desc: 'The Orchestrator decomposes the problem into phases, the Analyst analyzes requirements and identifies risks, and the Planner creates a task schedule with ordering and dependencies.'},
      {label: 'Phase 2: Technical research', desc: 'Tech Researcher checks current patterns, libraries, and tech choices for the planned work, delivering stack recommendations before any coding begins.'},
      {label: 'Phase 3: Parallel BE + FE build', desc: 'Backend Developer builds APIs, models, and migrations, while Frontend Developer implements the UI in parallel. Both coordinate through the API contract defined during planning.'},
      {label: 'Phase 4: Dual QA', desc: 'QA Quality tests functionality and integrations, QA Security checks basic attack vectors (input validation, auth, XSS). Both tracks run in parallel before release.'}
    ],
    inputs: [
      'Project description or feature set with overall scope',
      'Tech stack (or left open for research to recommend)',
      'Constraints (budget, deadline, compliance requirements)',
      'Success criteria (how many users, which metrics, performance)'
    ],
    outputs: [
      'Project plan with phases, tasks, and dependencies',
      'Research report with stack and library recommendations',
      'Backend implementation (API, models, tests)',
      'Frontend implementation (components, state, integration)',
      'QA reports (quality + security) with findings lists'
    ],
    does: [
      'Covers the full cycle from planning to tests in a single run',
      'Analyzes requirements and decomposes large tasks into smaller ones',
      'Creates a schedule and task ordering with dependencies',
      'Runs tech research before writing any code',
      'Implements backend and frontend in parallel to save time',
      'Checks quality and basic security before release',
      'Works as the safe default when you don\'t know which preset to pick',
      'Scales from a mid-sized feature to an entire app module'
    ],
    doesNotDo: [
      'Does not run deep 6-source research (use Research Swarm)',
      'Does not replace a dedicated security audit (use Security Hardening)',
      'Does not include a designer (use SaaS or UI Overhaul for design-heavy projects)',
      'Does not fully decompose a monolith (use Microservices)',
      'Does not run expert debate on architecture (use Five Minds)',
      'Is not the optimal choice for simple bugfixes (too much overhead)',
      'Does not fit purely research tasks without implementation (use Research)'
    ],
    antiPatterns: [
      'Overkill Default - using Standard for typos and one-liners (80% overhead)',
      'Skipping Plan - skipping the planning phase and jumping straight to code',
      'Research Overload - running a week of research for a simple feature',
      'QA Theater - testers green-lighting everything without real testing',
      'Scope Bloat - adding new requirements mid-run, the pipeline loses its footing'
    ],
    keyConcepts: [
      {term: 'Hierarchical pipeline', def: 'Pattern where the orchestrator delegates to layers (strategy, research, build, QA).'},
      {term: 'Dual QA', def: 'Two independent testers (quality and security) check the output in parallel.'},
      {term: 'Statistical sweet spot', def: '8 agents cover ~70% of typical tasks without excess or shortage.'},
      {term: 'Contract-first', def: 'The plan requires defining the API before backend and frontend start coding.'},
      {term: 'Default preset', def: 'The safe choice when you don\'t know which specialized preset fits.'}
    ],
    stats: [
      {label: 'Agents', value: '8'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.25-3.10'},
      {label: 'Time', value: '14-22 min'}
    ],
    bestFor: [
      'When you don\'t know which preset to pick - this is the default safe bet',
      'When you\'re building a typical web app or SaaS feature with BE and FE',
      'When the project needs planning, research, and dual QA but isn\'t enterprise-critical'
    ],
    worstFor: [
      'When the task is a simple bugfix (too much overhead, use Quick Fix)',
      'When you need specialized multi-source research (use Research Swarm)',
      'When the project needs a designer or legacy refactor (use SaaS or Legacy)'
    ],
    relatedPresets: ['saas', 'feature_sprint', 'plan_exec'],
    glossary: [
      {term: 'pipeline', definition: 'Sequential flow of tasks between specialized agents.'},
      {term: 'orchestrator', definition: 'The main agent that delegates tasks and coordinates team work.'},
      {term: 'CRUD', definition: 'Create Read Update Delete - the basic operations on resources.'},
      {term: 'QA gate', definition: 'A pre-release gate that code cannot pass without a positive verdict from testers.'},
      {term: 'default preset', definition: 'The system recommendation when the user has no specific requirements.'}
    ],
    learningQuote: 'Standard isn\'t mediocrity - it\'s the proof that 8 specialized roles cover 70% of real tasks better than a lone genius.',
    realExample: 'Imagine a PM who needs to build an admin panel for managing users in their SaaS: list, filters, export, role editing. They don\'t know if it needs research, how many devs, what testing. They pick Standard - in 20 minutes they get a plan, a justified stack choice, a shipped BE+FE, and a dual QA report. The panel lands on staging without surprises.'
  },
  data_pipe: {
    tagline: 'ETL and data warehouse team - ingest, clean, transform, store, integrate',
    missionShort: 'Data Pipeline builds a data processing pipeline: from ingestion through cleaning and transformation to warehouse storage and integration with analytics tools. 8 agents with Feature Dev instead of Frontend, because specialization is in ETL libraries (dbt, Airflow, Spark, Kafka) rather than UI.',
    whoIs: 'Data engineering teams that need to move data between systems, build warehouses for analytics or reporting. Ideal when you have multiple data sources (CRM, analytics, database) and want one source of truth for business stakeholders.',
    analogy: 'This preset is like an oil refinery - raw material (raw data) gets analyzed, distilled, transformed into various products (tables, marts), blended (joins), and put through quality control before it reaches the market (BI dashboards).',
    howItWorks: [
      {label: 'Phase 1: Planning + source research', desc: 'The Planner and Analyst map all data sources (databases, APIs, files, streams), their format, volume, and update frequency. Tech Researcher evaluates ETL tool choices (dbt vs Airflow vs Fivetran).'},
      {label: 'Phase 2: Backend ingest', desc: 'Backend Developer builds connectors to sources: API extractors (REST, webhooks), database readers, file watchers, Kafka consumers. Writes raw data to a staging area.'},
      {label: 'Phase 3: Feature Dev transform', desc: 'Feature Dev (specialized in data libraries) writes transformations: SQL in dbt, Python in pandas, cleansing, deduplication, enrichment. Builds marts and dimensional models.'},
      {label: 'Phase 4: Integration + QA', desc: 'The Integrator connects the pipeline to BI tools (Looker, Metabase, Tableau) and alerting. QA Quality validates the data (schema tests, freshness, null checks) and writes data quality gates.'}
    ],
    inputs: [
      'List of data sources (databases, APIs, files, streams) with access',
      'Target warehouse (BigQuery, Snowflake, Postgres, Redshift)',
      'Business requirements (which metrics, update frequency, history)',
      'Constraints (freshness SLA, GDPR, warehouse cost)'
    ],
    outputs: [
      'Connectors and extractors for each data source',
      'Transformation models (dbt projects, SQL, Python scripts)',
      'Dimensional model in the warehouse ready for analytics',
      'Data quality tests and alerting on breakages',
      'Lineage documentation (how data flows from sources to dashboards)'
    ],
    does: [
      'Maps data sources and picks the optimal ETL stack',
      'Builds extractors from APIs, databases, and streams',
      'Writes transformations that clean, enrich, and deduplicate data',
      'Creates dimensional models (facts, dimensions) in the warehouse',
      'Validates data quality (schema, freshness, null rate, duplicates)',
      'Integrates the pipeline with BI tools and alerting',
      'Documents lineage from source to dashboard for auditability',
      'Optimizes warehouse costs via partitioning and incremental loads'
    ],
    doesNotDo: [
      'Does not build a web app frontend (no such role on the team)',
      'Does not train ML models (that\'s a different pipeline)',
      'Does not analyze data statistically (use Data Analysis Pipeline)',
      'Does not replace a dedicated SaaS platform like Fivetran for typical sources',
      'Does not do one-off ad-hoc reports (too much overhead)',
      'Does not manage cloud infrastructure (application pipeline only)',
      'Does not build real-time streaming (that needs a Kafka/Flink stack)'
    ],
    antiPatterns: [
      'God Table - dumping everything into one 300-column table with no dimensional model',
      'No Idempotency - a pipeline that creates duplicates on retry instead of upserting',
      'Silent Drift - no schema tests, a new field in the source silently breaks a downstream report',
      'SELECT STAR - transformations pulling every column from raw tables without a filter',
      'Midnight ETL - all pipelines running at midnight with no orchestration, one crash takes everything down'
    ],
    keyConcepts: [
      {term: 'Dimensional model', def: 'Warehouse structure: facts (measurements) and dimensions (context) for fast analytical queries.'},
      {term: 'Idempotency', def: 'A pipeline property that guarantees multiple runs yield the same result.'},
      {term: 'Data lineage', def: 'A dependency graph showing how data flows from source to dashboard.'},
      {term: 'Schema test', def: 'A test that validates data structure (columns, types, null rate) before downstream transformation.'},
      {term: 'Incremental load', def: 'Loading strategy that only ingests new or changed records instead of a full refresh.'}
    ],
    stats: [
      {label: 'Agents', value: '8'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.30-3.20'},
      {label: 'Time', value: '14-22 min'}
    ],
    bestFor: [
      'When you\'re building a data warehouse or data mart for analytics',
      'When you have many data sources to consolidate into one source of truth',
      'When you need a reliable ETL pipeline with quality gates'
    ],
    worstFor: [
      'When the project needs a frontend or UI (no such role)',
      'When it\'s a one-off ad-hoc analysis (use Data Analysis Pipeline)',
      'When you\'re building real-time streaming with millisecond SLA (different stack)'
    ],
    relatedPresets: ['data_analysis_pipe', 'standard', 'kb_constructor'],
    glossary: [
      {term: 'ETL', definition: 'Extract Transform Load - the classic data processing pipeline pattern.'},
      {term: 'ELT', definition: 'Extract Load Transform - a variant where transformation happens inside the warehouse (modern pattern).'},
      {term: 'dbt', definition: 'Data Build Tool - a SQL-based transformation framework with tests and documentation.'},
      {term: 'warehouse', definition: 'A specialized analytical database (BigQuery, Snowflake, Redshift).'},
      {term: 'CDC', definition: 'Change Data Capture - a technique for propagating changes from an operational database to a warehouse.'}
    ],
    learningQuote: 'A good data pipeline is one the analyst never sees - they just open the dashboard and see the truth.',
    realExample: 'Imagine an e-commerce company with data scattered across Shopify, Stripe, Google Analytics, and Mailchimp. The CFO asks "how much did we make last quarter after refunds and acquisition costs?" - and nobody can answer quickly. This preset builds a pipeline that pulls data from every source hourly, cleans it, computes unified metrics, and loads it into BigQuery. On Friday evening the CFO looks at Looker and gets the answer in 3 seconds.'
  },
  research: {
    tagline: 'Six independent researchers, a critic, and a synthesizer - maximum research depth without implementation',
    missionShort: 'Research Swarm delivers comprehensive research reports built on six parallel sources: Tech docs, UX trends, Reddit, X/Twitter, GitHub, and forums. Research Critic validates methodology and catches contradictions, and the Synthesizer produces MANIFEST.md - a single document with recommendations and rationale. Zero implementation, pure knowledge.',
    whoIs: 'Decision makers and tech leads facing an irreversible choice (framework, architecture, vendor) who need multi-source ground truth. Ideal when the decision will matter for years and you can afford 20 minutes of research instead of three months of regret.',
    analogy: 'This preset is like a criminal investigation with six detectives - each examines a different angle (witnesses, video, finances, phones, forum, documents) independently, the prosecutor (Critic) validates the evidence, and the judge (Synthesizer) writes the verdict with full reasoning.',
    howItWorks: [
      {label: 'Phase 1: Fan-out to six researchers', desc: 'The Orchestrator broadcasts the research question to six parallel researchers (Tech, UX, Reddit, X, GitHub, Forums); each works in isolation with no communication to avoid groupthink.'},
      {label: 'Phase 2: Research in six streams', desc: 'Tech reads documentation, UX analyzes design patterns, Reddit surfaces unfiltered opinions, X surfaces trends, GitHub investigates code and Issues, Forums mines technical discussions. Each produces a structured report.'},
      {label: 'Phase 3: Critic validates methodology', desc: 'Research Critic scores each report on a five-dimension rubric (methodology, coverage, bias, confidence, gaps), flags contradictions between sources, and sends weak reports back for revision.'},
      {label: 'Phase 4: Synthesis into MANIFEST.md', desc: 'The Synthesizer merges six validated reports into a single MANIFEST.md: executive summary, scored findings, contradiction map, cross-functional insights, gap analysis, and concrete recommendations with rationale.'}
    ],
    inputs: [
      'A clearly defined research question (e.g. "which multi-agent AI framework for an enterprise chatbot")',
      'Context and constraints (stack, budget, deadline, compliance)',
      'Evaluation criteria (what you consider a successful recommendation)',
      'Decision timeline (when you need the answer)'
    ],
    outputs: [
      'MANIFEST.md - synthetic report with recommendations and rationale',
      'Six detailed per-source reports with citations and links',
      'Contradiction map showing where sources disagree',
      'Scored findings with confidence levels (CERTAIN, PROBABLE, SPECULATION)',
      'Gap analysis - what the Critic couldn\'t find'
    ],
    does: [
      'Delivers multi-source ground truth from six independent channels',
      'Detects contradictions between official docs and real-world experience',
      'Validates research methodology before handing off the report',
      'Synthesizes six sources into one decision-ready document',
      'Measures the confidence of each finding instead of faking certainty',
      'Flags gaps where knowledge is missing, doesn\'t pretend to know',
      'Works in isolation (Anti-groupthink principle) guaranteeing diverse perspectives',
      'Delivers 90% better results than a single agent per Anthropic benchmark'
    ],
    doesNotDo: [
      'Does not write or implement any code (zero builders on the team)',
      'Does not make decisions for you - only recommends with rationale',
      'Does not fit urgent answers (too much overhead)',
      'Does not replace domain experts in niche areas',
      'Does not run code experiments or benchmarks (analysis of existing data only)',
      'Does not predict the future (only reports state of the art)',
      'Does not involve real users for testing (public sources only)'
    ],
    antiPatterns: [
      'Single Source Truth - using Research Swarm to confirm an opinion you already hold',
      'Research Paralysis - ordering research instead of making decisions, after the third swarm still nothing',
      'Ignore the Critic - ignoring Critic flags because they don\'t fit our plan',
      'Confidence Blindness - citing a SPECULATION finding as certainty in a presentation',
      'Groupthink Bypass - manually nudging researchers so they agree'
    ],
    keyConcepts: [
      {term: 'Fan-out pattern', def: 'Pattern where the orchestrator broadcasts a task to many independent workers in parallel.'},
      {term: 'Agent isolation', def: 'The principle that researchers do not communicate with each other to avoid groupthink.'},
      {term: 'Confidence labeling', def: 'Tagging every finding as CERTAIN, PROBABLE, or SPECULATION.'},
      {term: 'Contradiction map', def: 'A document showing where sources disagree and why.'},
      {term: 'MANIFEST.md', def: 'The format of the final document that synthesizes all findings into decisions.'}
    ],
    stats: [
      {label: 'Agents', value: '9'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.80-2.05'},
      {label: 'Time', value: '10-18 min'}
    ],
    bestFor: [
      'When you face an irreversible tech or architecture choice',
      'When you need multi-source ground truth, not the vendor\'s official narrative',
      'When the output must be a strategic decision report with confidence levels'
    ],
    worstFor: [
      'When you need implementation (zero builders on the team)',
      'When you have one obvious solution (too much overhead for a settled decision)',
      'When the question is so niche that public sources don\'t cover it'
    ],
    relatedPresets: ['deep_research_swarm_pro', 'reflect', 'deep'],
    glossary: [
      {term: 'MANIFEST', definition: 'The final document synthesizing all findings into decisions with rationale.'},
      {term: 'groupthink', definition: 'A phenomenon where a group converges on a shared opinion, losing diverse perspectives.'},
      {term: 'confidence', definition: 'A measure of a finding\'s certainty: CERTAIN, PROBABLE, SPECULATION.'},
      {term: 'contradiction', definition: 'A situation where two sources give conflicting information on the same topic.'},
      {term: 'gap', definition: 'An area where the Researcher found insufficient data to make a decision.'}
    ],
    learningQuote: 'An hour of research saves a month of regret - six independent detectives see more than one genius with Google.',
    realExample: 'Imagine a CTO choosing an AI framework for an enterprise HR chatbot (confidential data, SOC2, 100k employees). They have three options: LangChain, Haystack, custom. A single Google search gives contradictory answers. Research Swarm fires up six researchers - Tech docs read official SLAs, Reddit surfaces real production pain points, GitHub inspects open Issues and release frequency, Forums collect enterprise case studies. The Critic catches a contradiction (docs say "production-ready", GitHub shows 200 open bugs). The Synthesizer delivers a MANIFEST: recommendation with CERTAIN justification, a backup alternative, risks, and migration path. The CTO makes the call in 20 minutes instead of three months of hesitation.'
  },
  legacy: {
    tagline: 'Modernize an old system without breaking what works - analysis, migration, dual QA for aging apps',
    missionShort: 'Legacy Refactor delivers a full modernization pipeline for an existing system: codebase analysis, GitHub research for migration patterns, three parallel builders (BE+FE+Integrator), and dual QA. Priority: backward compatibility and zero-downtime while the product keeps running in production.',
    whoIs: 'Teams with an aging codebase (jQuery, Rails 4, Angular 1, Python 2, a monolith) that throttles development but can\'t be shut off because it\'s the business. Ideal when every change in the legacy stack triggers fear and 42% of dev time goes into digging through old code instead of delivering value.',
    analogy: 'This preset is like replacing a jet engine mid-flight - you have to keep flying (production uptime) while three crews swap critical parts one by one and two inspectors make sure nothing leaks.',
    howItWorks: [
      {label: 'Phase 1: Analysis + GitHub research', desc: 'The Analyst maps the codebase (dependencies, hot paths, dark corners), GitHub Researcher finds similar migrations (jQuery to React, Rails 4 to 7, Python 2 to 3) and extracts patterns: strangler fig, adapter, branch-by-abstraction.'},
      {label: 'Phase 2: Migration planning', desc: 'The Planner splits modernization into iterations, sets the order (which module first, which last), identifies feature flags and a rollback plan for each step.'},
      {label: 'Phase 3: Three parallel builders', desc: 'Backend Developer rewrites services, Frontend Developer migrates components, the Integrator builds adapters and strangler facades so old and new run side by side. Backward compatibility is the priority.'},
      {label: 'Phase 4: Dual QA and validation', desc: 'QA Security checks that the migration didn\'t introduce new attack vectors, QA Quality validates functional equivalence with the original (same inputs, same outputs). The Manager coordinates.'}
    ],
    inputs: [
      'Existing legacy codebase with repo access',
      'Target stack (what you want to get to: React 19, Rails 7, Python 3)',
      'Constraints (max downtime, budget, timeline, compliance)',
      'List of critical business paths that must not break'
    ],
    outputs: [
      'Modernized code in the new stack running alongside the old',
      'Migration guide with steps, rollback plan, and feature flags',
      'Adapters and strangler facades enabling gradual migration',
      'Dual QA report (security and quality) showing zero regressions',
      'Pattern documentation for the team to continue the modernization'
    ],
    does: [
      'Modernizes a legacy stack without killing live production',
      'Introduces the strangler fig pattern for gradual replacement',
      'Builds adapters so old and new code coexist',
      'Searches GitHub for patterns from teams that ran similar migrations',
      'Validates functional equivalence (old vs new produce the same results)',
      'Guards against security regression (QA Security)',
      'Ships feature flags for safe rollout and rollback',
      'Cuts technical debt without a big bang rewrite'
    ],
    doesNotDo: [
      'Does not build new greenfield projects (use SaaS or Startup MVP)',
      'Does not fix single bugs in legacy (use Quick Fix or Bug Hunter)',
      'Does not migrate cloud infrastructure (application layer only)',
      'Does not do a big bang rewrite (that\'s an anti-pattern for this preset)',
      'Does not replace dedicated architecture debate (use Five Minds)',
      'Does not work when the client accepts long downtimes - simpler presets will do',
      'Does not fit projects without a test safety net (add tests first)'
    ],
    antiPatterns: [
      'Big Bang Rewrite - rewriting the whole system from scratch over a year with 40% of features lost',
      'Refactor Without Tests - modernizing legacy without characterization tests, regressions land on customers',
      'Silent Strangler - shipping strangler fig with no monitoring, the old code still serves 70% of traffic a year later',
      'Happy Path Migration - migrating only the main paths, edge cases break for enterprise clients',
      'Git Archeology Only - reading code without talking to the people who wrote it, repeating old assumptions'
    ],
    keyConcepts: [
      {term: 'Strangler fig', def: 'Pattern of gradually replacing legacy with new code, without a big bang rewrite.'},
      {term: 'Branch by abstraction', def: 'Technique of introducing an abstraction that lets old and new implementations coexist.'},
      {term: 'Characterization tests', def: 'Tests documenting current legacy behavior, protecting against regressions during refactor.'},
      {term: 'Feature flag', def: 'Runtime toggle enabling gradual rollout of a new implementation and quick rollback.'},
      {term: 'Backward compatibility', def: 'Guarantee that existing integrations and clients still work after modernization.'}
    ],
    stats: [
      {label: 'Agents', value: '9'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.30-3.20'},
      {label: 'Time', value: '16-26 min'}
    ],
    bestFor: [
      'When you have a legacy system throttling development that can\'t be shut off',
      'When you\'re migrating a framework (jQuery to React, Angular 1 to modern)',
      'When you need gradual modernization with backward compatibility and feature flags'
    ],
    worstFor: [
      'When it\'s a greenfield project with no existing code (use SaaS or Startup)',
      'When it\'s a single bug in legacy (use Quick Fix, not overkill)',
      'When you accept multi-week downtime - simpler presets will do'
    ],
    relatedPresets: ['migration_crew', 'plan_exec', 'api_modern'],
    glossary: [
      {term: 'legacy', definition: 'Inherited code that runs in production but is hard to extend or safely change.'},
      {term: 'technical debt', definition: 'The cost of future changes arising from past quality compromises.'},
      {term: 'strangler fig', definition: 'Pattern of gradually wrapping legacy in new code until the old disappears.'},
      {term: 'adapter', definition: 'A layer translating between old and new interfaces for backward compatibility.'},
      {term: 'monolith', definition: 'An app where all code lives in a single deployable artifact, the opposite of microservices.'}
    ],
    learningQuote: 'Legacy isn\'t bad code - it\'s code that survived. Modernization is about letting it keep surviving while it starts helping again.',
    realExample: 'Imagine an 8-year-old B2B SaaS: Rails 4 backend, jQuery and CoffeeScript frontend, PostgreSQL 9. New devs refuse to touch it, adding a simple feature takes a week. This preset analyzes hot paths, searches GitHub for how others migrated Rails 4 to 7, plans the strangler fig (new Rails 7 endpoints alongside the old ones), rewrites critical modules in React in parallel. After 40 minutes the first modernized module runs in production behind a feature flag, both QAs confirm zero regressions, and the team has a clear path to modernize the rest.'
  },
  saas: {
    tagline: 'A full 10-agent team builds a SaaS product from research to deployment',
    missionShort: 'Full-Stack SaaS is a hierarchical team of ten specialists that takes a product from idea to a working MVP. It delivers a complete stack: backend with business logic, frontend with user panel, design system, payment and auth integrations, and dual-layer QA. For product founders who want a working SaaS from a single run.',
    whoIs: 'This preset is for someone starting a new web product from scratch who needs EVERYTHING: backend, frontend, design, and quality control. Pick it when you have a vision of a complete product (not just one slice) and want the whole stack in a single run instead of stitching it together from smaller presets. Ideal for an investor MVP, a first customer release, or a full refresh of an old product.',
    analogy: 'Full-Stack SaaS is like a construction firm that builds a house from foundation to roof - you have an architect, a structural engineer, an electrician, a plumber, an interior decorator, a site manager, and two inspectors, each necessary to make the house habitable.',
    howItWorks: [
      {label: 'Phase 1 - Research and analysis', desc: 'The Orchestrator hands the vision to the Analyst, who decomposes the requirements. Tech Researcher investigates the stack (framework, database, auth provider), UX Researcher gathers visual trends and onboarding patterns. Output: requirements MANIFEST + stack recommendation.'},
      {label: 'Phase 2 - Parallel build squad', desc: 'Three builders work at the same time. Backend Dev stands up the API, auth, database, and payments. Frontend Dev builds the user panel and flows. Designer prepares the design system, colors, typography, and UI components. Each gets an isolated context.'},
      {label: 'Phase 3 - Integration', desc: 'The Integrator joins the three streams into a single whole. Wires frontend to API, checks design consistency with components, verifies payment flow end-to-end. This phase is critical to avoid the classic isolated-dev problem.'},
      {label: 'Phase 4 - Dual QA', desc: 'QA Security audits authentication, sessions, user data protection, and basic OWASP compliance. QA Quality checks user flows, error states, edge cases on forms. Both sign the GO/NO-GO for deployment.'}
    ],
    inputs: [
      'Product vision and target audience (e.g. SaaS tool for hairdressers, 50-500 customers)',
      'Functional requirements (login, payments, dashboard, notifications)',
      'Tech preferences or constraints (Node vs Python, Postgres vs Mongo)',
      'Success criteria (MVP in 2 weeks, 95 Lighthouse score, GDPR compliance)'
    ],
    outputs: [
      'Working backend with API, authentication, and database',
      'Frontend with user panel and onboarding',
      'Design system with ready components and documentation',
      'Integration report with working end-to-end flows',
      'Dual QA reports (security + quality) with GO/NO-GO verdicts'
    ],
    does: [
      'Builds a complete SaaS product stack from backend to UI',
      'Designs a coherent design system with a component library',
      'Integrates authentication, payments, and databases into one whole',
      'Covers tech and UX research before any code',
      'Runs a parallel build (3 squads at once) to compress time',
      'Enforces dual QA (security + quality) before deployment',
      'Operates hierarchically with clear phase separation',
      'Produces a ready product capable of onboarding first customers'
    ],
    doesNotDo: [
      'Does not assume existing code or refactor legacy (that\'s Legacy Refactor)',
      'Does not run A/B experiments or hypothesis tests (that\'s AB Test Lab)',
      'Does not handle heavy enterprise compliance (that\'s Full Hierarchy)',
      'Does not optimize performance of an existing product (that\'s Performance Boost)',
      'Does not generate marketing content or copy (that\'s Content Pipeline)',
      'Does not run a full security pentest (that\'s Security Hardening)',
      'Does not scale a product into microservices (that\'s Microservices)'
    ],
    antiPatterns: [
      'Isolated Silos - three build squads each in their own world, with no integrator tying it together',
      'Design Afterthought - adding a designer at the end instead of in parallel with backend',
      'Skipped Research - starting code without stack or UX research, leading to expensive refactors',
      'Missing QA Security - skipping QA Security in a SaaS product that holds user data',
      'Scope Creep - ordering more features mid-build instead of sticking to the original MANIFEST'
    ],
    keyConcepts: [
      {term: 'Hierarchical Squads', def: 'A team structure where three parallel squads work independently under a single orchestrator.'},
      {term: 'Design System', def: 'A library of ready components, colors, typography, and patterns that guarantee consistent product visuals.'},
      {term: 'Integrator role', def: 'A dedicated agent that merges the output of three squads and verifies end-to-end behavior.'},
      {term: 'Dual QA gate', def: 'Double final check - security and quality - with two independent GO/NO-GO verdicts.'},
      {term: 'Parallel build', def: 'Simultaneous backend, frontend, and designer work instead of sequence, cutting latency by ~40%.'}
    ],
    stats: [
      {label: 'Agents', value: '10'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.40-3.55'},
      {label: 'Time', value: '5-8 min'}
    ],
    bestFor: [
      'When you\'re starting a new SaaS product from scratch and need the full stack',
      'When you\'re building an investor pitch MVP and have to show a working product',
      'When you\'re doing a complete refresh of an old product with new design'
    ],
    worstFor: [
      'When you only want backend or only frontend (this preset forces all three)',
      'When you\'re building an internal tool for 5 people in the company (overkill)',
      'When you have an existing product and just want to add one feature (use Feature Sprint)'
    ],
    relatedPresets: ['startup', 'fullstack_premium', 'standard'],
    glossary: [
      {term: 'MVP', definition: 'Minimum Viable Product - the smallest working version of a product capable of onboarding first customers.'},
      {term: 'design system', definition: 'A set of rules, components, and visual tokens guaranteeing consistency across the entire interface.'},
      {term: 'auth provider', definition: 'An external authentication provider (Clerk, Auth0, Supabase Auth) replacing a custom solution.'},
      {term: 'integrator', definition: 'An agent that merges the output of parallel squads into a single coherent whole.'},
      {term: 'GO/NO-GO', definition: 'A binary decision from QA whether the product can ship or needs fixes.'}
    ],
    learningQuote: 'Building SaaS from scratch isn\'t coding - it\'s coordinating six specializations that have to play together like an orchestra.',
    realExample: 'Imagine you have an idea for a SaaS for physiotherapists: appointment booking, Stripe payments, SMS notifications, patient panel. You launch Full-Stack SaaS - the Orchestrator hands the vision to the Analyst, who decomposes the requirements. Tech Researcher recommends Next.js + Supabase + Stripe, UX Researcher shows patterns from medical products. Three builders start in parallel: Backend stands up the booking API, Frontend the patient panel, Designer prepares a calm medical palette. The Integrator ties it all together. QA Security checks GDPR and data encryption, QA Quality tests the booking flow. After 7 minutes you have a working MVP ready for first customers and the investor meeting.'
  },
  microservices: {
    tagline: 'Breaks the monolith into an ecosystem of independent services with 4 parallel builders',
    missionShort: 'Microservices is an 11-agent team specialized in monolith decomposition. It analyzes bounded contexts, plans extraction order, builds four services in parallel, and runs a triple QA gate. For enterprise teams whose monolith has grown too large to maintain and must be split into independent services without breaking production.',
    whoIs: 'This preset is for a team that has a working monolith and knows it must be broken up - deployments take hours, one bug blocks the whole system, teams block each other. Pick it when the decision to migrate to microservices is already made and you need a systematic approach: coupling analysis, extraction plan, parallel build, and hard QA gates at every step.',
    analogy: 'This preset is like an urban planner rebuilding a shopping mall into a district of separate stores - it does not demolish everything at once, it maps dependencies, then moves the bakery, pharmacy, and bank into separate buildings connected by roads, one at a time, so no customer notices an outage.',
    howItWorks: [
      {label: 'Phase 1 - Planning and analysis', desc: 'Analyst scans the monolith and maps bounded contexts per DDD, detecting coupling and shared state. Planner creates a Service Dependency DAG and sets the topological extraction order. Researcher studies API gateway, service mesh, and inter-service communication patterns.'},
      {label: 'Phase 2 - Parallel build of 4 services', desc: 'Four builders (one per service family) work in parallel. Each extracts its area: separate repo, separate database, separate deployment. Integrator maintains API contracts and backward compatibility.'},
      {label: 'Phase 3 - Integration and API gateway', desc: 'Integrator configures the API gateway (Kong, Envoy), handles service discovery, circuit breakers, and retry policies. Tests inter-service communication under load and checks what happens when one service goes down.'},
      {label: 'Phase 4 - Triple QA gate', desc: 'QA Security audits inter-service communication, mTLS, and secrets management. QA Quality tests end-to-end business flows across multiple services. QA Manager collects the verdicts and issues the final GO/NO-GO on deployment.'}
    ],
    inputs: [
      'Existing monolith with source code access',
      'List of pain points (long deployments, cross-team blockers, shared point of failure)',
      'Split criteria (bounded contexts, teams, lifecycles)',
      'Runtime constraints (Kubernetes vs ECS, whether downtime is allowed)'
    ],
    outputs: [
      'Bounded context map and Service Dependency DAG',
      'Step-by-step topological extraction plan',
      '4 independent services with their own repo, database, and deployment',
      'Configured API gateway with service discovery',
      'Triple QA report with GO/NO-GO verdict'
    ],
    does: [
      'Maps bounded contexts and the monolith\'s dependency graph',
      'Plans topological extraction order without breaking production',
      'Builds four independent services in parallel',
      'Configures API gateway, service discovery, and circuit breakers',
      'Implements resilience patterns (retry, timeout, bulkhead)',
      'Audits security of inter-service communication',
      'Tests end-to-end business flows across multiple services',
      'Guards against the distributed monolith anti-pattern'
    ],
    doesNotDo: [
      'Not for greenfield projects (use SaaS or Standard for that)',
      'Does not write code from scratch - works on an existing monolith',
      'Does not handle a single added service (overkill)',
      'Does not build frontend apps (this preset is backend-focused)',
      'Will not replace an experienced SRE during production cutover',
      'Does not generate the business case for a migration decision',
      'Will not solve organizational problems - only technical ones'
    ],
    antiPatterns: [
      'Distributed Monolith - splitting into services that are still tightly coupled (62% of first attempts per enterprise reports)',
      'Big Bang Extraction - extracting all services at once instead of topologically',
      'Shared Database - every service still talks to the same database instead of owning its own',
      'Missing Circuit Breaker - lack of resilience patterns causes cascading failures',
      'Ignored Bounded Context - splitting along technical layers instead of business domains'
    ],
    keyConcepts: [
      {term: 'Bounded Context', def: 'A business domain area with its own model and language, the DDD foundation for splitting into services.'},
      {term: 'Service Dependency DAG', def: 'A graph of dependencies between services, used to set extraction order.'},
      {term: 'API Gateway', def: 'A single entry point for all clients, responsible for routing, auth, and rate limiting.'},
      {term: 'Circuit Breaker', def: 'A pattern that guards against cascading failures - when a service goes down, the gateway cuts off traffic instead of flooding it with requests.'},
      {term: 'Strangler Fig', def: 'A migration pattern where features are moved out of the monolith gradually until the original can be deleted.'}
    ],
    stats: [
      {label: 'Agents', value: '11'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.70-4.25'},
      {label: 'Time', value: '8-15 min'}
    ],
    bestFor: [
      'When the monolith has grown too large and teams block each other',
      'When you need to scale different parts of the system independently',
      'When bounded contexts are already clear and you want to extract them'
    ],
    worstFor: [
      'When starting a new project (greenfield) - start with a monolith',
      'When your app has 5 users (overkill)',
      'When you have no distributed systems experience (learning via migration is painful)'
    ],
    relatedPresets: ['legacy', 'migration_crew', 'api_modern'],
    glossary: [
      {term: 'monolith', definition: 'An application bundled into one large deployable where all modules run in the same process.'},
      {term: 'DDD', definition: 'Domain-Driven Design - a methodology for modeling software around business domains.'},
      {term: 'service mesh', definition: 'An infrastructure layer that manages inter-service communication (Istio, Linkerd).'},
      {term: 'mTLS', definition: 'Mutual TLS - both sides of the connection authenticate with certificates, standard in microservices.'},
      {term: 'topological sort', definition: 'An algorithm that orders DAG nodes so dependencies come before the things that depend on them.'}
    ],
    learningQuote: 'Microservices are not a solution to technical problems - they are a solution to organizational problems that surface as technical blockers.',
    realExample: 'Imagine that you run an e-commerce platform with a 500k-line monolith and 40 developers. Deployments take 2 hours, one bug in the payments module blocks all sales. You launch Microservices - Analyst maps the bounded contexts: catalog, orders, payments, shipping, users. Planner sets the order: payments first (highest pain), then orders, shipping, catalog. Four builders extract four services in parallel. Integrator configures an API gateway with circuit breakers. QA tests what happens when payments go down - the rest of the store keeps working. After 12 minutes you have a plan, working services, and a GO/NO-GO report with a deployment order for the next 3 months.'
  },
  full: {
    tagline: 'Gold Standard 13 agents in a 5-layer hierarchy for mission-critical projects',
    missionShort: 'Full Hierarchy is a reference architecture for the whole system - 13 agents across five layers from strategy to triple QA. Every layer has its own clearly defined responsibility: core, planning, research, build, QA. For enterprise projects where the cost of an error vastly exceeds the cost of extra analysis, and where skipping one step can cost months of work.',
    whoIs: 'This preset is for teams working on mission-critical projects where "probably fine" is not enough. Pick it when you have a project that requires a formal audit, compliance, or when the cost of failure is in the hundreds of thousands of dollars. It is the archetype against which every other preset is measured - when you are unsure whether some other preset has everything you need, compare it to Full Hierarchy.',
    analogy: 'This preset is like a full top-tier film production - director, writer, producer, three researchers, cinematographer, production designer, actor, editor, and three reviewers, every one essential, because the film does not ship until the studio head says GO.',
    howItWorks: [
      {label: 'Layer 0 - Core (Strategy)', desc: 'Orchestrator accepts the task, analyzes its scope, sets decision gates, and oversees the entire pipeline. One Opus agent with access to every phase - the project\'s Mission Control.'},
      {label: 'Layer 1-2 - Planning and Research', desc: 'Analyst decomposes requirements and maps dependencies, Planner builds the schedule and resource allocation. Then three researchers in parallel: Tech studies the stack, UX studies visual trends, Docs studies official guidelines and compliance. Output: MANIFEST + build plan.'},
      {label: 'Layer 3 - Build Squad (4 in parallel)', desc: 'Backend Dev implements business logic and APIs. Frontend Dev builds the user interface. Designer creates a coherent visual system. Integrator connects the three streams and verifies end-to-end behavior. Everyone works in parallel under the orchestrator\'s coordination.'},
      {label: 'Layer 4 - Triple QA Gate', desc: 'QA Security audits security (OWASP, data protection, auth). QA Quality tests user flows, regressions, and edge cases. QA Manager collects verdicts and issues a formal GO/NO-GO with rationale. No feature ships without all three signatures.'}
    ],
    inputs: [
      'Mission-critical project specification with business requirements',
      'Technical and compliance constraints (SOX, PCI, HIPAA, GDPR)',
      'Success and acceptance criteria (performance, availability, security)',
      'Existing architecture documentation or brownfield constraints'
    ],
    outputs: [
      'MANIFEST of requirements and 5-layer execution plan',
      'Three research reports (Tech + UX + Docs) with stack selection',
      'Complete build: backend, frontend, design, integration',
      'Three QA reports (Security + Quality + Manager) with GO/NO-GO verdict',
      'Audit trail across all layers for formal compliance'
    ],
    does: [
      'Runs a full cycle from strategy to deployment with no gaps',
      'Provides an audit trail of every decision for formal compliance',
      'Covers three research perspectives (Tech + UX + Docs)',
      'Builds four streams in parallel (BE + FE + Design + Integration)',
      'Enforces a triple QA gate (Security + Quality + Manager)',
      'Serves as a reference architecture for comparisons with other presets',
      'Stops at every decision gate for verification',
      'Guarantees that no layer is skipped'
    ],
    doesNotDo: [
      'Not for simple tasks (massive overkill for a single bug)',
      'Not suitable for urgent delivery (the full cycle takes hours)',
      'Does not fit limited budgets (13 agents = high cost)',
      'Does not prototype - this is a production preset, not an experiment',
      'Will not replace human business decisions at the gates',
      'Does not run deep 6+ source research (use Deep for that)',
      'Does not include adversarial debate (use Five Minds for that)'
    ],
    antiPatterns: [
      'Hierarchy Overkill - using Full Hierarchy on a task that 3 agents could handle (a symphony orchestra playing Happy Birthday)',
      'Gate Skipping - skipping decision gates because it "looks fine"',
      'Research Shortcut - dropping one of the three research perspectives',
      'QA Collapse - merging Security, Quality, and Manager into one agent to save tokens',
      'Missing Audit Trail - failing to document decisions, leaving compliance with nothing to stand on'
    ],
    keyConcepts: [
      {term: '5-Layer Hierarchy', def: 'A five-level Core-Planning-Research-Build-QA structure where each layer has one clear responsibility.'},
      {term: 'Hub-and-Spoke + Pipeline + Parallel Fan', def: 'A combination of three patterns: a central hub (Orchestrator), a sequential pipeline (layers), and parallel fan-out (3 research, 4 build, 3 QA).'},
      {term: 'Triple QA Gate', def: 'Three independent quality checks - security, quality, manager - each with veto power.'},
      {term: 'Audit Trail', def: 'Documentation of every decision at every layer, required for formal compliance.'},
      {term: 'Reference Architecture', def: 'A benchmark architecture against which every other preset is measured - if a preset is weaker, it shows what is missing.'}
    ],
    stats: [
      {label: 'Agents', value: '13'},
      {label: 'Phases', value: '5'},
      {label: 'Est. cost', value: '$1.65-4.20'},
      {label: 'Time', value: '10-15 min'}
    ],
    bestFor: [
      'When the project is mission-critical and an error costs far more than the extra analysis',
      'When you need a formal audit trail for compliance (SOX, PCI, HIPAA)',
      'When you are doing enterprise architecture and need zero gaps in the process'
    ],
    worstFor: [
      'When you are working on a simple feature that does not need 13 agents',
      'When you have a tight deadline and need a result in 5 minutes',
      'When the budget is limited and every thousand tokens counts'
    ],
    relatedPresets: ['deep', 'fullstack_premium', 'standard'],
    glossary: [
      {term: 'mission-critical', definition: 'A system where failure has serious financial, legal, or safety consequences.'},
      {term: 'compliance', definition: 'Conformance with regulations (GDPR, HIPAA, PCI-DSS, SOX) requiring a formal audit trail.'},
      {term: 'Gold Standard', definition: 'A reference benchmark - the highest standard against which alternatives are compared.'},
      {term: 'gate decision', definition: 'A point in the process where formal acceptance is required before moving to the next phase.'},
      {term: 'fan-out', definition: 'A pattern where one input splits into multiple parallel work streams.'}
    ],
    learningQuote: 'Full Hierarchy does not exist so you always use it - it exists so you know what you are skipping when you pick a smaller preset.',
    realExample: 'Imagine that you are building an online banking platform for an enterprise client. Requirements: PCI-DSS compliance, audit trail on every decision, dual sign-off on every change, a full pentest before deployment. You launch Full Hierarchy - Orchestrator accepts the spec, Analyst decomposes into modules, Planner builds the schedule, three researchers study the stack (Tech), fintech UX patterns, and PCI-DSS documentation. Four squads build in parallel: transaction backend, panel frontend, calm-palette design, integrator wiring to external APIs. Triple QA audits security, tests flows, and issues a formal GO/NO-GO with rationale. After 12 minutes you have a working module with a complete audit trail ready to show an auditor.'
  },
  deep: {
    tagline: 'Full orchestra of 18 agents - maximum 6-stream research + triple QA',
    missionShort: 'Deep Research+Build is the maximum non-ultimate configuration: 18 agents in a full orchestra. Six researchers search different sources in parallel (Tech, UX, Reddit, GitHub, Forums, X/Twitter), Critic rates each report, Synthesizer merges everything into a coherent plan, four builders plus Integrator build the solution, and triple QA issues a formal GO FOR LAUNCH. For enterprise work where implementation demands genuinely thorough preparation.',
    whoIs: 'This preset is for teams facing technology decisions with consequences across the whole platform. Pick it when the cost of a bad decision (wrong framework, wrong database, wrong vendor) runs into hundreds of thousands of dollars and months of work. Ideal for technology due diligence before a large investment, for enterprise platform creation, for multi-vendor evaluations above $500k, and for regulated industries where compliance demands multi-source research.',
    analogy: 'This preset is like the launch of a NASA space mission - six science teams analyze propulsion, navigation, comms, life support, landing, and return in parallel, a reviewer validates every report, the chief scientist merges everything into a mission plan, engineering crews build the capsule, and a triple safety inspection issues GO FOR LAUNCH.',
    howItWorks: [
      {label: 'Phase 1 - Fan-out Research (6 streams)', desc: 'Six researchers start in parallel in isolation (no communication between them, which prevents groupthink). Researcher Tech studies official docs and benchmarks, UX studies Dribbble/Behance trends, Reddit captures unfiltered opinions, GitHub reads code and issues, Forums mines tutorials and lessons learned, X/Twitter tracks fast trends and breaking news.'},
      {label: 'Phase 2 - Critic Evaluation + Synthesis', desc: 'Research Critic reads all 6 reports and rates them for evidence quality, consistency with other sources, and confidence scores. Sends weak reports back for rework. Synthesizer merges the validated reports into one coherent build plan with stack recommendations and trade-offs.'},
      {label: 'Phase 3 - Build Squad (4 + Integrator)', desc: 'Four builders work in parallel: Backend Dev sets up APIs and business logic, Frontend Dev builds the UI, Feature Dev implements specific business features, Designer creates the visual system. Integrator wires everything together and verifies end-to-end flows.'},
      {label: 'Phase 4 - Triple QA Gate', desc: 'QA Security audits security, QA Quality tests flows and regressions, QA Manager collects verdicts and issues a formal GO/NO-GO with rationale. Three independent checks, each with veto power.'}
    ],
    inputs: [
      'A strategic technology question or a large enterprise scope',
      'Evaluation criteria and constraints (budget, timeline, compliance)',
      'List of candidate solutions to compare (if known)',
      'Access to sources and documentation (links, repos, specs)'
    ],
    outputs: [
      '6 independent research reports with confidence scores and sources',
      'Critic report with a score (0.0-1.0) for each of the 6 reports',
      'Synthesized build plan with stack recommendation and trade-offs',
      'Complete build: backend + frontend + features + design + integration',
      'Triple QA report with formal GO/NO-GO'
    ],
    does: [
      'Runs research across six independent sources in parallel',
      'Validates every report through an independent Critic',
      'Reaches 76.9% parallelization (the highest ratio in the non-ultimate system)',
      'Combines formal sources (docs) with unfiltered ones (Reddit, GitHub)',
      'Has Synthesizer build a coherent plan from often contradictory reports',
      'Builds four code streams in parallel under an integrator\'s coordination',
      'Issues triple GO/NO-GO for mission-critical deployments',
      'Delivers a full audit trail of every decision'
    ],
    doesNotDo: [
      'Not for standard feature development (overkill)',
      'Not for prototypes (no time for 18 agents)',
      'Does not run expert debates (use Five Minds for that)',
      'Does not include Human-in-the-Loop gates (use Deep Five Minds for that)',
      'Not for a limited budget - the most expensive non-ultimate preset',
      'Does not do a single quick research pass (use Recon for that)',
      'Does not train models or tune hyperparameters'
    ],
    antiPatterns: [
      'Research Waste - using Deep for a question that Solo could answer in a minute',
      'Isolation Break - letting researchers read each other\'s reports (destroys isolation = groupthink)',
      'Critic Bypass - skipping Critic and passing raw reports straight to Synthesizer',
      'Parallel Overload - forcing synchronization on parallel researchers instead of accepting async work',
      'Missing Synthesis - treating 6 reports as the final output instead of synthesizing them into one plan'
    ],
    keyConcepts: [
      {term: 'Full Orchestra', def: 'A pattern of 18 agents across 4 layers where every layer has parallelism: Research 6x, Build 4x, QA 3x.'},
      {term: 'Researcher Isolation', def: 'The rule that researchers do not read each other\'s reports - prevents groupthink and guarantees independent perspectives.'},
      {term: 'Critic Evaluation', def: 'Independent validation of every research report\'s quality, with the right to send it back for rework.'},
      {term: 'Confidence Scores', def: '0.0-1.0 ratings for every finding, letting Synthesizer weigh contradictory sources.'},
      {term: 'Parallelization Efficiency', def: 'The percentage of agents that can work in parallel - in Deep it is 76.9% (14 of 18).'}
    ],
    stats: [
      {label: 'Agents', value: '18'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$2.20-5.55'},
      {label: 'Time', value: '10-25 min'}
    ],
    bestFor: [
      'When you are making a technology decision with consequences across the whole platform',
      'When you are doing due diligence before an investment above $500k',
      'When a regulated industry requires multi-source research with an audit trail'
    ],
    worstFor: [
      'When you are doing standard feature development (the Standard preset is enough)',
      'When you are prototyping and have no time for 18 agents',
      'When the budget will not cover the most expensive non-ultimate preset'
    ],
    relatedPresets: ['research', 'full', 'deep_five_minds'],
    glossary: [
      {term: 'fan-out', definition: 'A pattern where one task splits into multiple parallel work streams.'},
      {term: 'groupthink', definition: 'A dynamic where a group reaches consensus through pressure rather than rigorous evaluation - destroys decision quality.'},
      {term: 'confidence score', definition: 'A number from 0.0 to 1.0 expressing the agent\'s certainty about a finding.'},
      {term: 'synthesizer', definition: 'An agent that merges many reports into one coherent plan and resolves contradictions between sources.'},
      {term: 'triple QA', definition: 'Three independent quality gates (security, quality, manager), each with veto power.'}
    ],
    learningQuote: 'Six independent perspectives beat one expert opinion - not because experts are wrong, but because no single expert sees the whole elephant.',
    realExample: 'Imagine that you are the CTO of a fintech startup planning a payment platform for 50 countries. The stakes: $2M of investment and 6 months of team work. You launch Deep Research+Build. Six researchers in parallel: Tech studies Stripe/PayPal/Adyen docs and PCI-DSS, UX studies checkout patterns, Reddit captures unfiltered developer opinions on integration pain, GitHub reads issues and workarounds, Forums mines legal advice for 50 countries, X/Twitter tracks breaking news about API changes. Critic rates the reports. Synthesizer picks: Adyen for 50 countries + custom checkout + Terraform for infra. Four squads build a POC. Triple QA issues GO. After 20 minutes you have a due diligence report that will defend the $2M in front of the board, plus a working payments prototype.'
  },
  five_minds: {
    tagline: 'Structured debate of 4 experts + Devil\'s Advocate for architectural decisions',
    missionShort: 'Five Minds Protocol is the only preset in the system with an adversarial debate mechanism. Four domain experts defend their positions with evidence, the fifth - Devil\'s Advocate - systematically attacks every claim, and Synthesizer issues a Gold Solution that transcends the original conflict. For strategic technology decisions where there is no obvious winner and where consensus would be worse than dialectic.',
    whoIs: 'This preset is for teams facing a contentious architectural decision where every camp has strong arguments and there is no obvious choice. Pick it when you are stuck in analysis paralysis, when your engineers have been arguing for weeks without resolution, or when you worry that team consensus will sand off the sharp edges and lead to a suboptimal decision.',
    analogy: 'This preset is like a courtroom trial with a Devil\'s Advocate - four expert witnesses give contradictory testimony with evidence, the fifth challenges every claim, and the judge issues a verdict better than the proposal of either side.',
    howItWorks: [
      {label: 'Phase 1 - Research ground truth', desc: 'Three researchers prepare evidence for the experts: market data, technical benchmarks, user opinions. Each gets the same data in isolation so everyone debates on the same factual footing.'},
      {label: 'Phase 2 - Opening statements (4 experts)', desc: 'Four experts formulate opening statements in parallel. Pragmatist asks "is this feasible?". Innovator asks "is this the best?". Data Analyst asks "what do the numbers say?". User Advocate asks "will the user understand this?". Each defends a position with evidence.'},
      {label: 'Phase 3 - Adversarial debate + Devil\'s Advocate', desc: 'Experts read each other\'s openings and prepare rebuttals. Devil\'s Advocate (the fifth, Shadow) systematically attacks EVERY position - does not represent any side, its job is only to challenge. It hunts for hidden assumptions, biased evidence, and blind spots. Several rounds of exchanges.'},
      {label: 'Phase 4 - Gold Solution + Build', desc: 'Synthesizer (Opus) mediates the debate and issues the Gold Solution - a creative synthesis that is neither a compromise nor a win for one camp, but a solution better than every original proposal. Build squad implements the decision.'}
    ],
    inputs: [
      'A contentious architectural decision (framework, database, pattern, strategy)',
      'Competing requirements or goals (speed vs reliability, cost vs quality)',
      'Available options or candidates for the debate (at least 3 to compare)',
      'Business context and stakes (what do we lose if we pick wrong)'
    ],
    outputs: [
      'Opening statements from 4 experts with evidence and argument',
      'Rebuttals and counterarguments from debate rounds',
      'Devil\'s Advocate report with critique of every position',
      'Gold Solution - creative synthesis issued by Synthesizer',
      'Implemented build based on the Gold Solution'
    ],
    does: [
      'Runs the only adversarial debate mechanism in the system',
      'Forces argument instead of guessing or intuition',
      'Guards against groupthink and premature consensus',
      'Produces a Gold Solution that transcends the original positions',
      'Tests positions under systematic criticism',
      'Surfaces hidden assumptions and biased evidence',
      'Delivers a formal audit trail of the decision for stakeholders',
      'Builds the implementation on top of the winning solution'
    ],
    doesNotDo: [
      'Not for simple implementation with an obvious choice (overkill)',
      'Will not accelerate urgent delivery - debate takes time',
      'Will not replace business decisions that need organizational context',
      'Does not generate consensus - it produces a Gold Solution from conflict',
      'Does not run deep 6+ source research (use Deep for that)',
      'Does not run a double debate before and after build (use Deep Five Minds for that)',
      'Not for a team that is not ready for intellectual confrontation'
    ],
    antiPatterns: [
      'Fake Debate - experts who agree too quickly, without genuine conflict (a sign of groupthink)',
      'Toothless Devil - a Devil\'s Advocate that says "looks good" instead of systematically challenging',
      'Compromise Trap - Synthesizer producing a compromise instead of a Gold Solution (a compromise is worse than the original)',
      'Missing Evidence - experts debating from opinion instead of from ground truth produced by research',
      'Consensus Rush - closing the debate after one round instead of iterating until positions are genuinely stress-tested'
    ],
    keyConcepts: [
      {term: 'Adversarial Debate', def: 'Structured conflict where experts defend positions with evidence and an independent opponent systematically challenges them.'},
      {term: 'Gold Solution', def: 'A synthesis that transcends the original conflict - a solution better than any side\'s proposal.'},
      {term: 'Devil\'s Advocate Role', def: 'An agent that represents NO side - its only job is to challenge every claim.'},
      {term: 'Dialectic vs Consensus', def: 'Dialectic produces better decisions than consensus because it does not sand off the sharp edges of the arguments.'},
      {term: 'Ground Truth Grounding', def: 'The rule that the debate must be grounded in hard data from research, not opinion or intuition.'}
    ],
    stats: [
      {label: 'Agents', value: '14'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.80-4.50'},
      {label: 'Time', value: '7-15 min'}
    ],
    bestFor: [
      'When you face a contentious architectural decision with no obvious winner',
      'When the team has been arguing for weeks without reaching a resolution',
      'When you worry that team consensus will sand off the sharp edges of good arguments'
    ],
    worstFor: [
      'When you have a simple implementation with an obvious choice (debate is a waste of time)',
      'When you need a result in 5 minutes (debate requires rounds)',
      'When the team is not ready for intellectual confrontation and prefers consensus'
    ],
    relatedPresets: ['five_minds_strategic', 'deep_five_minds', 'research'],
    glossary: [
      {term: 'adversarial', definition: 'Confrontational - mutually attacking positions in order to stress-test them.'},
      {term: 'dialectic', definition: 'A method for arriving at truth through conflicting arguments and synthesis, not compromise.'},
      {term: 'rebuttal', definition: 'A counterargument - a reply to an opponent\'s argument in a debate.'},
      {term: 'devil\'s advocate', definition: 'A person who deliberately challenges a position, even one they agree with, to stress-test it.'},
      {term: 'premature consensus', definition: 'A group agreement that comes too early and skips important arguments - a symptom of groupthink.'}
    ],
    learningQuote: 'The best decisions are not born from consensus, they come from controlled conflict where every position must defend itself under systematic attack.',
    realExample: 'Imagine that you are a platform architect and you must decide: monolith or microservices for a new product. Your team has been arguing for a month, both sides have good arguments. You launch Five Minds. Three researchers prepare data: Shopify benchmarks (monolith), Netflix (microservices), DORA metrics. Pragmatist defends the monolith: "faster MVP, easier to debug". Innovator defends microservices: "future-proof, independent scaling". Data Analyst shows DORA metrics: 60% of teams under 50 developers ship faster on a monolith. User Advocate: "the user does not know what is under the hood". Devil attacks everyone: "are your benchmarks from 2024 or 2018? does your team already have microservices experience?". Synthesizer issues the Gold Solution: "Modular monolith with clear bounded contexts, ready for extraction into microservices once the team grows above 30 developers". Build squad implements. Instead of a compromise you get a decision better than any original proposal.'
  },
  deep_five_minds: {
    tagline: 'ULTIMATE 27 agents - Deep Research + DOUBLE debate + 3 HITL gates for irreversible decisions',
    missionShort: 'Deep Five Minds is the only preset in Tier 5 ULTIMATE and the largest in the entire system. 27 agents across 6 phases: Deep Research (6 researchers + Critic), Five Minds #1 (debate BEFORE build), Build (5 agents + Designer + Integrator), Five Minds #2 (debate AFTER build), Triple QA. Between phases there are 3 Human-in-the-Loop gates with a 120-second timer. For irreversible decisions where the stakes exceed $500k and the effects will be felt for years.',
    whoIs: 'This preset is for leaders facing decisions with 5+ year consequences, where an architectural mistake is irreversible and stakes run in the hundreds of thousands of dollars or more. Pick it when you are doing mission-critical architecture for fintech, healthcare, or aerospace; when you are making an investment decision above $500k; or when regulation demands a formal double audit with human involvement. This is not a preset for everyday use - it is a strategic weapon.',
    analogy: 'This preset is like building a skyscraper with double inspection and three checkpoints - six teams study the ground and seismic data, the investor approves direction, five architects debate the design, the investor approves the plan, crews build, the SAME five experts debate the built object, the investor approves the test scope, and three inspectors sign off the final handover.',
    howItWorks: [
      {label: 'Phase 0-1 - Strategy + Deep Research (10 agents)', desc: 'Orchestrator kicks off the task. Analyst decomposes, Planner builds the DAG, Synthesizer (Opus, 95% load, the system\'s brain) prepares central memory in MANIFEST.md. Six researchers run in parallel (Tech, Reddit, UX, GitHub, Forums, X/Twitter), Research Critic scores every report 0-1.0. HITL GATE #1: the human approves the research direction.'},
      {label: 'Phase 2 - Five Minds #1 Research Evaluation (6 agents)', desc: 'First debate BEFORE build. Pragmatist, Innovator, Data Analyst, and User Advocate evaluate raw research. Devil\'s Advocate attacks every recommendation. Synthesizer mediates and issues Gold Solution #1 - WHAT to build and HOW. HITL GATE #2: the human approves the build plan with approve/modify/reject options.'},
      {label: 'Phase 3 - Build Squad (7 agents)', desc: 'Five builders work in parallel: Backend Dev, Frontend Dev, Feature Dev, Designer, Integrator. Each gets Gold Solution #1 as the spec. Synthesizer maintains coherence through shared memory. Parallel build cuts latency by ~40% versus sequential.'},
      {label: 'Phase 4-5 - Five Minds #2 + Triple QA (8 agents)', desc: 'Second debate AFTER build - the SAME experts evaluate the BUILT product, not the plans. Pragmatist: "does it actually work?". Innovator: "were all opportunities used?". Devil: "what happens when the user does X?". Synthesizer issues Gold Solution #2 - a list of fixes. The second debate round surfaces 23-37% more defects than a single one (Liang et al. 2024). HITL GATE #3: the human approves the fix scope. Triple QA: Security + Quality + Manager with a formal GO/NO-GO.'}
    ],
    inputs: [
      'A strategic decision with irreversible consequences (platform, stack, architecture)',
      'Financial and business stakes (at least $50k, ideally $500k+)',
      'Regulatory and compliance constraints (fintech, healthcare, aerospace)',
      'Stakeholder availability for 3 HITL gates (120 seconds per decision)'
    ],
    outputs: [
      '6 independent research reports + Critic scores',
      'Transcript of Five Minds #1 debate + Gold Solution #1 (build plan)',
      'Complete build: backend + frontend + features + design + integration',
      'Transcript of Five Minds #2 debate + Gold Solution #2 (list of fixes)',
      'Triple QA report with formal GO/NO-GO + full audit trail of all 3 HITL gates'
    ],
    does: [
      'Runs a DOUBLE expert debate - before build over plans, after build over reality',
      'Launches 6 parallel research streams with Critic validation',
      'Engages the human at 3 HITL decision gates with a 120s timer',
      'Produces two Gold Solutions - the build plan and the fix list',
      'Reaches 79.2% parallelization (19 of 27 agents can work in parallel)',
      'Delivers a full audit trail for compliance with the strictest regulators',
      'Surfaces 23-37% more defects than a single debate (iterated MAD)',
      'Serves as the only Tier 5 preset - a strategic weapon for irreversible decisions'
    ],
    doesNotDo: [
      'Not for anything below $50k of stakes (overkill)',
      'Does not fit standard feature development (use Full or Standard)',
      'Will not work without an available stakeholder - the 3 HITL gates require a human',
      'Not for prototyping (27 agents is too expensive)',
      'Cannot finish in under 15 minutes (double debate + HITL wait)',
      'Will not replace executive sign-off - it only supports it with data',
      'Not for teams that have no practice in intellectual confrontation'
    ],
    antiPatterns: [
      'Ultimate Abuse - using Deep Five Minds on a $5k decision (like convening the UN board to pick a pen color)',
      'HITL Skip - letting the auto-fallback timer make every decision instead of real human engagement',
      'Single Debate Shortcut - skipping Five Minds #2 because "we already debated before the build"',
      'Missing Post-Build Context - experts in the second debate have no access to results from the first - they lose 23-37% of the value',
      'Synthesizer Overload - trying to offload Synthesizer\'s role to smaller agents (breaks central coherence)'
    ],
    keyConcepts: [
      {term: 'Double Adversarial Debate', def: 'The only pattern in the system where debate happens TWICE - before and after build, with the same experts but different context.'},
      {term: 'Gold Solution #1 vs #2', def: '#1 is the build plan before start; #2 is the fix list after build - two different syntheses from two different perspectives (plan vs reality).'},
      {term: 'Human-in-the-Loop Gates', def: 'Three decision gates where the pipeline stops and waits for a human - 120s timer with auto-fallback, but experts recommend genuine engagement.'},
      {term: 'Iterated MAD Research', def: 'Liang et al. 2024 shows that a second debate round surfaces 23-37% more defects than a single one - because experts have implementation context.'},
      {term: 'Synthesizer Central Brain', def: 'One Opus agent (95% load) mediating BOTH debates and maintaining central memory in MANIFEST.md - without it the system drifts apart.'}
    ],
    stats: [
      {label: 'Agents', value: '27'},
      {label: 'Phases', value: '6'},
      {label: 'Est. cost', value: '$2.80-7.10'},
      {label: 'Time', value: '15-40 min'}
    ],
    bestFor: [
      'When you are making an investment decision above $500k with 5+ year effects',
      'When you are building mission-critical architecture for a regulated industry (finance, healthcare, aerospace)',
      'When an architectural mistake is physically irreversible (data migration, format change, public API)'
    ],
    worstFor: [
      'When stakes are below $50k (massive overkill, 40 minutes of waiting)',
      'When you have no stakeholder available for the 3 HITL gates (auto-fallback destroys the value)',
      'When you need a fast result - this preset takes 15-40 minutes of full pipeline'
    ],
    relatedPresets: ['deep', 'five_minds', 'five_minds_strategic'],
    glossary: [
      {term: 'ULTIMATE Tier 5', definition: 'The highest complexity level in the system, the only preset in this tier, reserved for irreversible decisions.'},
      {term: 'Human-in-the-Loop', definition: 'A pattern where the pipeline stops at key points and waits for a human decision, optionally with an auto-fallback timer.'},
      {term: 'iterated MAD', definition: 'Iterated Multi-Agent Debate - research shows that a second debate round surfaces 23-37% more defects than the first.'},
      {term: 'MANIFEST.md', definition: 'The pipeline\'s central memory - a file that Synthesizer maintains and every phase reads from.'},
      {term: 'auto-fallback', definition: 'A safety mechanism - if the human does not respond within 120 seconds, the pipeline applies a default decision so it does not block.'}
    ],
    learningQuote: 'When the stakes are too high to allow a mistake, and the decision is irreversible - you need not only the best experts but also their critique and human approval, twice.',
    realExample: 'Imagine that you are the CTO of a fintech planning a migration from MySQL to CockroachDB for a platform that processes $1B per year. The stakes: a migration error means potential loss of transaction data, regulatory fines (SOX, PCI-DSS), and reputational damage. You launch Deep Five Minds. Six researchers study: Tech benchmarks for CockroachDB vs alternatives, GitHub production issues, Reddit opinions from fintech engineers, Forums legal guidance on SOX compliance, UX for admin dashboards, X/Twitter breaking news about bugs. Critic rates. HITL GATE #1: you approve the direction. Five Minds #1 debate: Pragmatist "is rollback possible?", Innovator "is distributed SQL the future?", Data Analyst shows migration costs, User Advocate "what about downtime?". Devil attacks every assumption. Gold Solution #1: a strangler fig migration with dual-write and 3 months of parallel operation. HITL GATE #2: you approve the plan. Five builders build a POC. Five Minds #2 evaluates the built POC: "does replication work under load?", "what about split-brain?". Devil: "did you test an AZ failure scenario?". Gold Solution #2: a list of 12 fixes before production. HITL GATE #3: you approve the scope. Triple QA issues a formal GO/NO-GO. After 35 minutes you have: a due diligence report, transcripts of both debates, a working POC, a production migration plan, and a full audit trail for SOX auditors. This decision will stand for 5 years - now you know it will hold up.'
  },
  deep_research_swarm_pro: {
    tagline: 'Seven specialists in parallel - each in their own source, no one crosses into another\'s turf',
    missionShort: 'Deep Research Swarm Pro is a 10-agent team based on the Anthropic Lead Researcher pattern. Lead splits the research question into seven disjoint areas, seven researchers work in parallel each in their own source, a critic catches contradictions, and a synthesizer assembles one ordered report. For decisions that demand comparing many sources.',
    whoIs: 'This preset is for teams that need to compare 5-10 options before a strategic decision (database, framework, vendor). When one person is drowning in information and starts guessing, the fix is to split the work across specialists with EXPLICIT boundaries. Not for urgent decisions and not for teams that already have a clear answer.',
    analogy: 'This preset is like an intelligence center with seven area officers, where each owns their own beat and the commander assembles their reports into one conclusion.',
    howItWorks: [
      {label: 'Phase 1 - Decomposition', desc: 'Lead researcher breaks the question into 7 disjoint sub-questions and assigns each to a different specialist with explicit boundaries (no one crosses into another\'s turf).'},
      {label: 'Phase 2 - Parallel research', desc: 'Seven researchers work in parallel in their sources: documentation, GitHub, Reddit, X, forums, UX, tech. Each returns JSON with findings, citations, and confidence scores.'},
      {label: 'Phase 3 - Critique', desc: 'Critic compares reports looking for contradictions, gaps, and bias. Flags which claims have multiple independent confirmations and which rest on a single source.'},
      {label: 'Phase 4 - Synthesis', desc: 'Synthesizer assembles the 7 reports into one document with an executive summary, an option comparison, a list of contradictions, and a recommendation.'}
    ],
    inputs: [
      'A research question or decision to make (e.g. which vector DB to pick)',
      'A list of options to compare (if you know them) or an area to study',
      'Success criteria (price, performance, community support)',
      'Optionally earlier reports or documents to include'
    ],
    outputs: [
      'An ordered report with seven perspectives and links to sources',
      'A short executive summary on the first page',
      'A comparison table of options with pros and cons',
      'A list of contradictions between sources with critic commentary',
      'Confidence scores for every claim and a final recommendation'
    ],
    does: [
      'Decomposes a complex question into 7 disjoint parts with explicit boundaries',
      'Runs seven researchers in parallel, reducing time to the slowest one',
      'Collects data from many sources (docs, GitHub, Reddit, X, forums, UX, tech)',
      'Catches contradictions between sources via a dedicated critic',
      'Isolates researchers so they do not infect each other with errors (antigroupthink)',
      'Assembles results into one coherent report with a recommendation',
      'Tags the confidence of every claim and the source of evidence',
      'Scales research to enterprise level without loss of quality'
    ],
    doesNotDo: [
      'Does not write code (no builders on the team)',
      'Does not make decisions - only recommends (the decision belongs to the human)',
      'Does not update data live (it is a one-time snapshot)',
      'Will not replace a domain expert in narrow topics (regulation, medicine)',
      'Does not work well when you only have one source (overkill for that)',
      'Will not finish in 5 minutes (7 parallel researchers + critic take time)',
      'Does not debate (that is Five Minds, not Research Swarm)'
    ],
    antiPatterns: [
      'Single Source Bias - a researcher ignores their boundaries and reaches into another\'s source',
      'Consensus Theater - synthesizer hides contradictions instead of showing them',
      'Paper Avalanche - collecting 200 links without prioritization or confidence scoring',
      'Echo Chamber - seven researchers read the same blogs instead of different sources',
      'Unanswered Question - lead assigns 7 different sub-questions but none answers the main one'
    ],
    keyConcepts: [
      {term: 'Lead Researcher Pattern', def: 'An Anthropic pattern where the orchestrator decomposes the question and coordinates parallel subagents with explicit scope.'},
      {term: 'Explicit Boundaries', def: 'Every researcher gets a clearly defined source area and does not cross into another\'s turf - reduces duplication.'},
      {term: 'Parallel Subagents', def: 'Parallel invocation of many researchers cuts time to the slowest one instead of the sum of all.'},
      {term: 'Critic Loop', def: 'A dedicated agent that critiques reports before synthesis - catches contradictions and bias.'},
      {term: 'BM25 Re-ranking', def: 'A technique that ranks search results by token relevance - helps prioritize citations.'}
    ],
    stats: [
      {label: 'Agents', value: '10'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.40-3.50'},
      {label: 'Time', value: '20-35 min'}
    ],
    bestFor: [
      'When you are picking a technology or vendor for serious money and need to compare many sources',
      'When you are doing competitor analysis or a literature review',
      'When a strategic decision requires evidence from many independent perspectives'
    ],
    worstFor: [
      'When you need code (this preset does not build anything)',
      'When you only have one source of information (overkill)',
      'When the decision must land in 5 minutes (research takes time)'
    ],
    relatedPresets: ['research', 'deep', 'five_minds_strategic'],
    glossary: [
      {term: 'lead researcher', definition: 'An orchestrator that splits the question into sub-questions and coordinates parallel subagents.'},
      {term: 'explicit boundaries', definition: 'Clear source boundaries for every researcher so they do not duplicate work.'},
      {term: 'critic', definition: 'An agent that compares reports and catches contradictions before synthesis.'},
      {term: 'synthesizer', definition: 'An agent that assembles every report into one coherent document with a recommendation.'},
      {term: 'confidence score', definition: 'A 0-1 rating showing how strongly the evidence supports a claim.'}
    ],
    learningQuote: 'Seven specialists in their own areas see more than one expert trying to cover everything - as long as no one crosses into another\'s turf.',
    realExample: 'Imagine that you are picking a vector DB for production RAG and the options on the table are Pinecone, Weaviate, Qdrant, Milvus, Chroma, pgvector, and Elasticsearch. Lead splits the question into 7 areas (docs, GitHub issues, Reddit, X signals, forums, UX case studies, benchmarks). Seven researchers work in parallel in their sources, critic catches that Qdrant and Pinecone contradict each other on p99 latency, synthesizer assembles the report with a recommendation: Qdrant for self-hosted + Pinecone for managed.'
  },
  migration_crew: {
    tagline: 'Renovating a house that must stay occupied - three specialists with disjoint zones',
    missionShort: 'Migration Crew is a 10-agent team for safely migrating a legacy system. Three parallel explorers read disjoint code areas (auth, data, routing), the planner proposes strategies (big-bang vs strangler), a HITL gate decides, and the team builds under tester supervision. It minimizes risk and gives humans control over irreversible decisions.',
    whoIs: 'This preset is for teams that must migrate a platform running in production that can\'t be taken offline. Ideal for Java 8 to 21, Angular to React, Python 2 to 3, REST to GraphQL, or breaking up a monolith. Not for greenfield projects or full rewrites from scratch.',
    analogy: 'This preset is like restoring a heritage building with three conservator teams, where one handles the foundation, another the utilities, and a third the facade, and none crosses into another\'s zone.',
    howItWorks: [
      {label: 'Phase 1 - Inventory', desc: 'Analyst maps the legacy system: dependencies, hot paths, risk areas. Planner splits the code into 3 disjoint zones for explorers.'},
      {label: 'Phase 2 - Parallel exploration', desc: 'Three specialists read their zones in parallel (auth, data, routing). Each returns a report with file count, dependency depth, and strategy proposal.'},
      {label: 'Phase 3 - HITL decision gate', desc: 'Decision presenter aggregates 3 reports and presents the human with a choice: big-bang vs strangler fig vs dual-write. The human signs off on the plan.'},
      {label: 'Phase 4 - Migration and verification', desc: 'Three builders execute the migration in their zones with shadow traffic. QA verifies backward compatibility and confirms old clients still work.'}
    ],
    inputs: [
      'Access to the legacy code with git history',
      'Migration target (language/framework/protocol version)',
      'List of critical dependencies and external integrations',
      'Maintenance window (whether a downtime is possible)'
    ],
    outputs: [
      'Dependency map of the legacy system with hot paths',
      'Three parallel exploration reports (one per zone)',
      'Migration plan comparing options (big-bang vs strangler vs dual-write)',
      'New versions of the most critical parts with backward compatibility',
      'Regression tests and a compatibility verification report'
    ],
    does: [
      'Splits legacy code into three disjoint zones with explicit scope',
      'Explores code in parallel, cutting time by 60%',
      'Stops before irreversible decisions for human sign-off',
      'Proposes strangler fig strategy instead of big-bang rewrite',
      'Preserves backward compatibility via shadow traffic and dual-write',
      'Migrates piece by piece with the option to roll back each step',
      'Tests regressions for legacy clients',
      'Documents every migration decision with a rationale'
    ],
    doesNotDo: [
      'Doesn\'t apply to greenfield projects (nothing to migrate)',
      'Doesn\'t do a full rewrite from scratch (different scope)',
      'Doesn\'t work without access to the legacy code',
      'Doesn\'t decide big-bang vs strangler for you (that\'s the HITL gate)',
      'Doesn\'t migrate runtime data (code and schema only)',
      'Doesn\'t guarantee zero downtime without proper infrastructure',
      'Doesn\'t replace integration tests for the whole system'
    ],
    antiPatterns: [
      'Big Bang Overnight - trying to migrate the whole system in one deployment with no feature flag',
      'Silent Incompatibility - the new API version breaks old clients without warning',
      'Shared Scope - two explorers read the same file and give conflicting proposals',
      'Missing Rollback - the plan has no rollback mechanism if something goes wrong',
      'Skipped HITL - the team bypasses the decision gate and picks a strategy for the human'
    ],
    keyConcepts: [
      {term: 'Strangler Fig Pattern', def: 'Gradual migration where the new system wraps the old one and replaces it piece by piece, like a strangler fig enveloping a tree.'},
      {term: 'Dual-Write', def: 'Technique of writing data to both the old and new systems at once during the transition period.'},
      {term: 'Shadow Traffic', def: 'A copy of production traffic routed in parallel to the new system without affecting users.'},
      {term: 'Exploration Phase', def: 'Reading code without changing it to understand dependencies before proposing a strategy.'},
      {term: 'HITL Gate', def: 'A pipeline checkpoint where a human must sign off on a decision before the next step.'}
    ],
    stats: [
      {label: 'Agents', value: '10'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.10-2.80'},
      {label: 'Time', value: '25-45 min'}
    ],
    bestFor: [
      'When you\'re migrating a working system to a new language or framework version',
      'When you\'re splitting a monorepo into smaller services or breaking up a monolith',
      'When you\'re moving from REST to GraphQL or from one database to another'
    ],
    worstFor: [
      'When you\'re starting a project from scratch (nothing to migrate)',
      'When you\'re planning a full rewrite from zero (different scope)',
      'When you don\'t have access to the legacy code or its history'
    ],
    relatedPresets: ['legacy', 'api_modern', 'plan_exec'],
    glossary: [
      {term: 'strangler fig', definition: 'Gradual migration pattern where the new system wraps the old one and replaces it piece by piece.'},
      {term: 'big-bang migration', definition: 'One-shot migration of the entire system in a single deployment - high risk.'},
      {term: 'dual-write', definition: 'Writing to both the old and new systems at once during the transition period.'},
      {term: 'shadow traffic', definition: 'Parallel copying of production traffic to the new system without affecting users.'},
      {term: 'HITL gate', definition: 'A decision gate where a human signs off on the plan before further action.'}
    ],
    learningQuote: 'You don\'t always have to rewrite everything from scratch - sometimes the safest path is swapping the engine in a plane mid-flight, piece by piece.',
    realExample: 'Imagine that you have a 2014 Ruby on Rails monolith running in production and serving 50,000 customers. You want to move to Node.js + GraphQL but you can\'t take the service offline. Migration Crew runs an inventory (250 models, 80 controllers), 3 explorers map auth/data/routing in parallel, and the planner proposes strangler fig with a 6-month dual-write window. The human signs off on the strategy, the team migrates piece by piece starting with the simplest endpoints, and shadow traffic verifies compatibility.'
  },
  fullstack_premium: {
    tagline: 'A feature ready for real customers - with DBA, monitoring, and audit in one pipeline',
    missionShort: 'Full-Stack Premium is a 12-agent team built on the wshobson fullstack baseline plus three specialists that are usually missing: database architect, observability engineer, and UX researcher. Backend and frontend work on disjoint file globs, and a security audit plus monitoring setup closes every feature. For features that MUST work reliably.',
    whoIs: 'This preset is for teams building customer-facing features that can\'t afford production bugs. Ideal for SaaS dashboards, payment systems, user authentication, and anything that touches real money. Not for prototypes, MVPs, or small internal tools.',
    analogy: 'This preset is like an architecture studio with a dedicated urban planner and meteorologist, where no project moves without a water and sewer plan and without weather monitoring.',
    howItWorks: [
      {label: 'Phase 1 - Research and planning', desc: 'Orchestrator coordinates, planners draft the plan, two researchers work in parallel (UX from interviews and docs from documentation) to gather context. Db_architect designs the schema and indexes.'},
      {label: 'Phase 2 - Parallel build', desc: 'Four agents in parallel on disjoint file globs: designer builds UI, backend implements the API, frontend wires it to the UI, integrator ties it all together. Each has its own file scope and doesn\'t touch anyone else\'s.'},
      {label: 'Phase 3 - Observability setup', desc: 'Observability engineer configures the three pillars: metrics (SLI/SLO), structured logs, and traces. Defines the dashboard and alerts before shipping to production.'},
      {label: 'Phase 4 - Security audit and QA', desc: 'Qa_security runs an audit (OWASP, secrets, auth), qa_quality tests the feature end-to-end, manager signs off as ready-for-production with a risk summary.'}
    ],
    inputs: [
      'Feature description from the customer\'s perspective (user story or JTBD)',
      'Existing tech stack and system constraints',
      'SLOs (e.g. latency p99 < 200ms, uptime > 99.9%)',
      'Access to the production database and observability stack'
    ],
    outputs: [
      'Ready feature with a designed database and indexes',
      'Observability dashboard (metrics, logs, traces) with alerts',
      'Security audit report (OWASP Top 10, secrets, auth)',
      'User interface grounded in UX interviews',
      'Technical documentation and an incident runbook'
    ],
    does: [
      'Designs database schema with indexes and zero-downtime migrations',
      'Configures observability (three pillars: metrics, logs, traces)',
      'Runs UX research before mockups - avoids guessing needs',
      'Builds backend and frontend in parallel on disjoint file globs',
      'Audits security before every deployment',
      'Defines SLIs and SLOs instead of vanity metrics',
      'Writes an incident runbook for the on-call',
      'Integrates all parts into one coherent ready feature'
    ],
    doesNotDo: [
      'Not for hackathon prototypes (too heavy)',
      'Not for small internal tools (overkill)',
      'Doesn\'t work without an existing tech stack',
      'Doesn\'t replace a proper CI/CD process (only generates code)',
      'Doesn\'t deploy to production itself (needs a pipeline)',
      'Doesn\'t solve organizational problems (culture issues)',
      'Doesn\'t write fine-tuned ML models (different scope)'
    ],
    antiPatterns: [
      'Dashboard Theater - metrics with no alerts that no one watches',
      'Schema After Build - db_architect comes in after the code instead of before',
      'Vanity SLO - SLO set at 100% with no error budget',
      'UX Skipped - designer makes mockups without a customer interview',
      'Security At End - security audit as the last step instead of a continuous practice'
    ],
    keyConcepts: [
      {term: 'Three Pillars Observability', def: 'Metrics + logs + traces as the three pillars of observability for a production system.'},
      {term: 'SLI/SLO', def: 'Service Level Indicator is a measurable metric, Objective is a target expressed as a percentage over a time window.'},
      {term: 'Zero-Downtime Migration', def: 'Database schema migration without user downtime - requires disjoint steps add-backfill-swap-drop.'},
      {term: 'Disjoint File Globs', def: 'Backend and frontend have defined disjoint file scopes so they don\'t collide in commits.'},
      {term: 'Error Budget', def: 'The allowed percentage of errors before the SLO - a tradeoff between stability and deployment velocity.'}
    ],
    stats: [
      {label: 'Agents', value: '12'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.55-3.85'},
      {label: 'Time', value: '30-60 min'}
    ],
    bestFor: [
      'When you\'re building a feature visible to paying customers (login, payments, dashboards)',
      'When the product has SLOs and you need to monitor performance in production',
      'When an unexpected bug would cost more than the whole team'
    ],
    worstFor: [
      'When you\'re prototyping for a hackathon or an MVP demo',
      'When you\'re building a small internal tool for 5 people',
      'When you don\'t yet have any working stack'
    ],
    relatedPresets: ['saas', 'full', 'standard'],
    glossary: [
      {term: 'observability', definition: 'The ability to understand a system\'s internal state from metrics, logs, and traces.'},
      {term: 'SLI', definition: 'Service Level Indicator - a measurable metric like latency or error rate.'},
      {term: 'SLO', definition: 'Service Level Objective - a target for an SLI expressed as a percentage over a time window.'},
      {term: 'db_architect', definition: 'Dedicated agent for designing database schema, indexes, and zero-downtime migrations.'},
      {term: 'disjoint file globs', definition: 'Disjoint file scopes for backend and frontend to avoid collisions in the repo.'}
    ],
    learningQuote: 'A feature that runs on a developer\'s laptop and a feature that\'s ready for customers are two different things - DB design, observability, and security audit turn one into the other.',
    realExample: 'Imagine that you\'re building a new analytics dashboard for SaaS customers with live charts and CSV export. A standard team ships it in a week, but in production it turns out queries are choking the database, there are no alerts when the endpoint goes down, and the export leaks data across tenants. Full-Stack Premium adds a db_architect who designs indexes for hot queries, an observability engineer who configures a dashboard with an SLO of p99 latency < 300ms, a UX researcher who confirms what customers actually want to export, and a qa_security who catches the multi-tenant leak.'
  },
  security_multi_vector: {
    tagline: 'Five independent scanners in parallel - each on a different attack vector',
    missionShort: 'Multi-Vector Security is a 9-agent team that scans five disjoint attack vectors in parallel (code, dependencies, infrastructure, secrets, auth) after a STRIDE threat model. Qa_manager aggregates findings into a severity matrix, and a HITL gate gives the human a GO/NO-GO decision before release. Compatible with SOC2 and OWASP ASVS.',
    whoIs: 'This preset is for teams that need to run a security audit before a launch or after an incident. Ideal for customer-facing apps, SOC2 prep, and responding to an enterprise customer\'s risk assessment. Not for continuous background scanning (use automation) or small internal apps.',
    analogy: 'This preset is like a counter-terrorism team sweeping a building, where each agent owns a section (ground floor, basement, roof, utilities, perimeter) and at the end everyone reports to the commander who gives GO/NO-GO.',
    howItWorks: [
      {label: 'Phase 1 - STRIDE threat modeling', desc: 'Analyst builds a STRIDE threat model (Spoofing, Tampering, Repudiation, Info Disclosure, Denial, Elevation). Splits the attack surface into 5 disjoint vectors.'},
      {label: 'Phase 2 - 5 parallel scanners', desc: 'Five scanners run in parallel: qa_security on code (SAST), scanner on dependencies (SBOM, CVE), infra (IaC misconfig), secrets (TruffleHog patterns), auth (OWASP ASVS).'},
      {label: 'Phase 3 - Aggregation and severity', desc: 'Qa_manager collects results, dedupes findings, maps to CVSS severity, builds a release-blocking matrix with P0/P1/P2 priorities.'},
      {label: 'Phase 4 - Release HITL gate', desc: 'Decision presenter shows the human a list of P0/P1 findings, proposed fixes, and risks. The human signs GO/NO-GO before release.'}
    ],
    inputs: [
      'Access to the repo with code and git history',
      'Dependency manifest (package.json, requirements.txt, go.mod)',
      'Infrastructure definition (Terraform, Kubernetes, Docker)',
      'Business context (what the app does, who the users are)'
    ],
    outputs: [
      'STRIDE threat model with attack surface',
      'Full audit across five disjoint areas',
      'Findings list ordered from P0 to P3 with CVSS',
      'SBOM with known CVEs in dependencies',
      'GO/NO-GO decision with rationale and a remediation plan'
    ],
    does: [
      'Models threats with STRIDE before scanning',
      'Runs 5 independent scanners in parallel (SAST, SBOM, IaC, secrets, auth)',
      'Aggregates results and dedupes duplicates across scanners',
      'Maps findings to CVSS and builds a release-blocking matrix',
      'Checks OWASP ASVS compliance for auth and session',
      'Generates an SBOM with CVEs in dependencies',
      'Gives the human a GO/NO-GO decision with full context',
      'Produces a report aligned with SOC2 and ISO27001'
    ],
    doesNotDo: [
      'Doesn\'t replace continuous background scanning (use Snyk, Dependabot)',
      'Doesn\'t fix bugs on its own (that\'s the developer\'s job)',
      'Isn\'t a pentest (code and config audit only)',
      'Doesn\'t replace an external SOC2 auditor',
      'Doesn\'t test runtime anomalies (that\'s WAF and SIEM territory)',
      'Doesn\'t check business logic flaws (needs a domain expert)',
      'Doesn\'t work without business context for the app'
    ],
    antiPatterns: [
      'CVE Tsunami - 500-finding report with no prioritization or severity',
      'Missing Threat Model - scanning without STRIDE loses business context',
      'Shared Vector - two scanners check the same thing instead of disjoint areas',
      'Silent GO - release ships without a human HITL decision',
      'Severity Theater - every finding marked Critical to force a fix'
    ],
    keyConcepts: [
      {term: 'STRIDE', def: 'Microsoft threat model covering Spoofing, Tampering, Repudiation, Info Disclosure, Denial, Elevation.'},
      {term: 'SAST', def: 'Static Application Security Testing - analyzing source code without running the program.'},
      {term: 'DAST', def: 'Dynamic Application Security Testing - testing an application running in a test environment.'},
      {term: 'SBOM', def: 'Software Bill of Materials - a list of all dependencies with versions for CVE audits.'},
      {term: 'OWASP ASVS', def: 'Application Security Verification Standard - security checklists for auth, session, and data.'}
    ],
    stats: [
      {label: 'Agents', value: '9'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.20-3.00'},
      {label: 'Time', value: '25-50 min'}
    ],
    bestFor: [
      'When you\'re prepping to launch a customer-facing feature',
      'When you\'re responding to an enterprise customer risk assessment or SOC2 audit',
      'When you\'ve had an incident and need a full verification before relaunching'
    ],
    worstFor: [
      'When you need continuous background scanning (use automated tools)',
      'When you don\'t yet have a threat model or business context',
      'When you\'re building a small internal tool for 5 people (overkill)'
    ],
    relatedPresets: ['security', 'soc2_sweep', 'test_suite'],
    glossary: [
      {term: 'STRIDE', definition: 'Threat model splitting risks into Spoofing, Tampering, Repudiation, Info Disclosure, Denial, Elevation.'},
      {term: 'SAST', definition: 'Static Application Security Testing - scanning code without running it.'},
      {term: 'SBOM', definition: 'Software Bill of Materials - dependency list for CVE audits.'},
      {term: 'CVSS', definition: 'Common Vulnerability Scoring System - a 0-10 scale for vulnerability severity.'},
      {term: 'OWASP ASVS', definition: 'Application Security Verification Standard - application security standard.'}
    ],
    learningQuote: 'One scanner always misses something - only five parallel scanners on disjoint areas plus a human at the end give real coverage.',
    realExample: 'Imagine that your SaaS platform launches in a week and an enterprise customer wants a security report before signing a $500k contract. Multi-Vector Security runs STRIDE (spoofing in OAuth? tampering in webhooks?), five scanners in parallel catch 3 high-severity issues (SQL injection in search, an exposed AWS key in .env.example, missing CSP header), qa_manager aggregates into a release-blocking matrix, decision presenter shows the human who picks NO-GO with a 48-hour fix plan before launch.'
  },
  perf_squad: {
    tagline: 'Three hypotheses instead of one - Devil\'s Advocate challenges each, measurement gives proof',
    missionShort: 'Performance Squad is an 8-agent team for root-cause analysis of performance regressions. Three layer specialists (db, backend, frontend) propose independent hypotheses, Five Minds Devil attacks each one hunting for logical flaws, and qa_perf benchmarks the final fixes. Output: an RCA doc with before/after measurements and concrete fix locations ordered by biggest impact.',
    whoIs: 'This preset is for teams that noticed a performance regression after the latest deployment and don\'t know where it\'s coming from. Ideal for prod regression triage, p99 latency spikes, memory leaks, and cost optimization. Not for micro-optimization or problems outside the app (network, vendor).',
    analogy: 'This preset is like a medical response team with three specialists and a prosecutor, where a cardiologist, neurologist, and internist each propose a diagnosis, the prosecutor challenges each one, and the lab tests the final therapy with a stopwatch.',
    howItWorks: [
      {label: 'Phase 1 - Profiling and baseline', desc: 'Analyst collects profiles, traces, and metrics. Establishes baseline (what it was before the regression) and delta (what got worse). Splits the problem into 3 layers.'},
      {label: 'Phase 2 - Parallel hypothesizing', desc: 'Three layer specialists (db_architect, backend, frontend) propose independent hypotheses. Each suggests a root cause and fix. They work in parallel without sharing ideas.'},
      {label: 'Phase 3 - Devil adversarial', desc: 'Five Minds Devil attacks each hypothesis hunting for logical holes: is it really that, what if the benchmark ran in the wrong environment, what if the fix shifts the problem instead of solving it.'},
      {label: 'Phase 4 - Benchmark and RCA doc', desc: 'Qa_perf runs benchmarks on the best candidates (before and after fix), writes an RCA doc with measurements, regression timeline, and rollout plan for the fix.'}
    ],
    inputs: [
      'Baseline metrics (latency/memory/cost before the regression)',
      'Access to profiles and traces from production',
      'List of recent deployments and config changes',
      'Regression time window (from when to when)'
    ],
    outputs: [
      'RCA doc with three hypotheses and counter-hypotheses',
      'Concrete fix locations ordered by biggest impact',
      'Benchmark measurements before and after (latency, memory, throughput)',
      'Regression timeline correlated with code changes',
      'Rollout plan for the fix with rollback option'
    ],
    does: [
      'Profiles the system and establishes baseline vs current metrics',
      'Splits analysis into three layers (db, backend, frontend)',
      'Generates three independent hypotheses instead of one guess',
      'Uses Devil to challenge each hypothesis (anti-groupthink)',
      'Measures fix impact before committing (benchmark before and after)',
      'Documents the golden path and bottleneck on a flame graph',
      'Computes fix value in useful units (ms, $, MB)',
      'Delivers a rollout plan with rollback option'
    ],
    doesNotDo: [
      'Not for premature micro-optimization',
      'Not for problems outside the app (network, vendor, CDN)',
      'Doesn\'t work without profiles and baseline metrics',
      'Doesn\'t predict future regressions (only analyzes the current one)',
      'Doesn\'t replace continuous production monitoring',
      'Doesn\'t do capacity planning (different scope)',
      'Doesn\'t optimize UX (technical metrics only)'
    ],
    antiPatterns: [
      'Single Hypothesis - one specialist bets on a single theory with no alternatives',
      'Missing Baseline - no pre-regression measurement makes comparison impossible',
      'Fix Without Benchmark - deploying a fix without confirming it actually helped',
      'Skipped Devil - team skips the adversarial challenge and runs with the first hypothesis',
      'Environment Mismatch - benchmarks in an environment that doesn\'t match production'
    ],
    keyConcepts: [
      {term: 'Root Cause Analysis', def: 'A method for finding the underlying cause of a problem instead of treating symptoms.'},
      {term: 'Flame Graph', def: 'Visualization of a CPU profile showing which functions consume the most time.'},
      {term: 'Golden Path', def: 'The most important user flow that must stay fast no matter what else happens.'},
      {term: 'Baseline vs Optimized', def: 'Measurement of the state before and after optimization, enabling delta calculation.'},
      {term: 'Devil Advocacy', def: 'Formal challenge of every hypothesis to find weaknesses in the reasoning.'}
    ],
    stats: [
      {label: 'Agents', value: '8'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.95-2.40'},
      {label: 'Time', value: '20-40 min'}
    ],
    bestFor: [
      'When the app started running slower after the latest deployment and you don\'t know why',
      'When p99 latency suddenly spiked or a memory leak is eating resources',
      'When you want to cut server costs but don\'t know where the bottlenecks are'
    ],
    worstFor: [
      'When you have no measurements or profiles at all (turn on monitoring first)',
      'When the problem is in the network, at a vendor, or in a CDN (other layers)',
      'When you want to optimize preemptively without a measured problem'
    ],
    relatedPresets: ['perf_boost', 'bug_hunt', 'incident_war_room'],
    glossary: [
      {term: 'RCA', definition: 'Root Cause Analysis - a method for finding the underlying cause instead of treating symptoms.'},
      {term: 'flame graph', definition: 'Visualization of a CPU profile showing function costs as flame-shaped bars.'},
      {term: 'baseline', definition: 'A pre-change measurement enabling comparison.'},
      {term: 'p99 latency', definition: 'The 99th percentile response time - the upper tail of the distribution.'},
      {term: 'Devil Advocacy', definition: 'Formal challenge of every hypothesis to find weaknesses.'}
    ],
    learningQuote: 'Without measurement every optimization is guessing - Performance Squad forces three hypotheses, challenges them, and measures before and after.',
    realExample: 'Imagine that after a Friday deploy, API p99 latency jumps from 150ms to 900ms and customers start complaining. Three specialists propose hypotheses in parallel: db_architect bets on a missing index on a new query, backend bets on an N+1 in the ORM, frontend bets on a blocking fetch in middleware. Devil attacks each one: "what if it\'s deploy warm-up", "what if Redis died", "what if it\'s just one endpoint". Qa_perf benchmarks each hypothesis in staging and confirms it\'s an N+1 query - the fix deploy drops p99 to 180ms.'
  },
  prd_to_launch: {
    tagline: 'From customer conversation to ready launch package - PRD plus tickets plus mockups plus GTM',
    missionShort: 'PRD to Launch is an 11-agent team that turns informal input (an idea, recording, transcript) into a full launch package. Analyst extracts JTBD, writer drafts the PRD, and a parallel build generates RICE-scored tickets, screen mockups, marketing copy, and a GTM plan. PM sign-off closes the pipeline.',
    whoIs: 'This preset is for product managers who have an idea or a customer call transcript and need to turn it into a full package for the team. Ideal when you\'re syncing departments before a launch or planning a big new feature before the quarter. Not for implementing code or purely technical decisions.',
    analogy: 'This preset is like a film studio from script to premiere, where the screenwriter pulls out the theme, the director writes the PRD, and production teams work in parallel on costumes, sets, camera, and marketing.',
    howItWorks: [
      {label: 'Phase 1 - JTBD extraction', desc: 'Analyst listens to the transcript or reads the idea and extracts Jobs-to-be-Done: what the customer is trying to achieve, what frustrates them, what their current workarounds are. Formulates the problem statement.'},
      {label: 'Phase 2 - PRD writing', desc: 'Writer creates a structured PRD: problem, proposal, success metrics, scope, non-goals, risks, dependencies. Document ready for team review.'},
      {label: 'Phase 3 - Parallel build', desc: 'Planner generates tickets with RICE scoring and a schedule. Designer mocks key screens. Writer drafts marketing copy. Gtm_strategist builds a launch plan with ICP and pricing.'},
      {label: 'Phase 4 - PM sign-off', desc: 'Decision presenter aggregates all deliverables (PRD, tickets, mockups, copy, GTM) and presents them to the PM for approval. PM signs launch readiness.'}
    ],
    inputs: [
      'Customer call transcript or a raw idea',
      'Existing product context (personas, stack, roadmap)',
      'Launch budget and timeline',
      'List of stakeholders to involve'
    ],
    outputs: [
      'PRD structured as problem/proposal/metrics/risks',
      'Ticket list for the team with RICE and a schedule',
      'Screen mockups for the key user flows',
      'Marketing copy (landing, emails, social, release notes)',
      'GTM plan with ICP, pricing, channels, and success metrics'
    ],
    does: [
      'Extracts Jobs-to-be-Done from informal input',
      'Writes a PRD aligned with product best practices',
      'Generates tickets with RICE scoring (Reach, Impact, Confidence, Effort)',
      'Mocks key screens before implementation',
      'Writes marketing copy tailored to the persona',
      'Builds a GTM plan with ICP, pricing, and channels',
      'Syncs all deliverables into one package',
      'Forces PM sign-off before launch'
    ],
    doesNotDo: [
      'Doesn\'t write code (that\'s a different preset like saas or fullstack_premium)',
      'Doesn\'t make technology decisions (no tech researchers)',
      'Doesn\'t work without customer contact (no voice of customer)',
      'Isn\'t a substitute for a Product Manager - it supports one',
      'Doesn\'t do user research (that\'s design_sys or ui_overhaul)',
      'Doesn\'t run marketing campaigns (only designs them)',
      'Doesn\'t define company strategy (that\'s five_minds_strategic)'
    ],
    antiPatterns: [
      'Solution First - writing a PRD without JTBD and building a solution for a nonexistent problem',
      'Ticket Dump - planner generates 200 tickets with no RICE prioritization',
      'Copy Before Message - writer drafts copy without approved positioning',
      'GTM Without ICP - gtm_strategist plans channels without a defined ideal customer',
      'Skipped Sign-off - team starts building without PM sign-off and flies with no pilot'
    ],
    keyConcepts: [
      {term: 'JTBD', def: 'Jobs-to-be-Done - framework that frames the problem from the angle of "the customer is trying to achieve X".'},
      {term: 'RICE', def: 'Ticket prioritization via Reach x Impact x Confidence / Effort - helps pick the most valuable work.'},
      {term: 'PRD', def: 'Product Requirements Document - a document describing what and why we\'re building.'},
      {term: 'GTM', def: 'Go-to-Market - plan for bringing a product to market with ICP, pricing, and channels.'},
      {term: 'ICP', def: 'Ideal Customer Profile - precise description of the most valuable customer type to target.'}
    ],
    stats: [
      {label: 'Agents', value: '11'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.30-3.30'},
      {label: 'Time', value: '30-50 min'}
    ],
    bestFor: [
      'When you have a customer call recording but don\'t know where to start',
      'When you\'re planning a big new feature before quarterly planning',
      'When you need to sync product, engineering, and marketing before launch'
    ],
    worstFor: [
      'When you want to write code (wrong preset)',
      'When you\'re deciding a purely technical choice (framework, database)',
      'When you have zero customer contact (no voice of customer)'
    ],
    relatedPresets: ['startup', 'feature_sprint', 'content'],
    glossary: [
      {term: 'JTBD', definition: 'Jobs-to-be-Done - framework framing the problem from the customer\'s goal.'},
      {term: 'PRD', definition: 'Product Requirements Document - a document describing what and why we\'re building.'},
      {term: 'RICE', definition: 'Prioritization by Reach x Impact x Confidence / Effort.'},
      {term: 'GTM', definition: 'Go-to-Market - plan for bringing a product to market.'},
      {term: 'ICP', definition: 'Ideal Customer Profile - description of the most valuable customer to target.'}
    ],
    learningQuote: 'An idea with no PRD or mockups is just a wish - PRD to Launch turns a raw idea into a package ready for execution in a single pass.',
    realExample: 'Imagine that you have an hour-long transcript with an enterprise customer who complains they can\'t see what\'s happening in their subscription. Analyst extracts JTBD (the customer wants to forecast costs before the invoice), writer drafts a PRD for a Usage Forecast Dashboard, planner generates 12 RICE-scored tickets, designer mocks 3 screens, writer drafts an announcement email, and gtm_strategist plans a launch for the 50 biggest accounts with a webinar. PM signs the package and the team has everything for quarterly planning.'
  },
  ab_test_lab: {
    tagline: 'An honest A/B test instead of stretched statistics - power calc plus Devil plus stat sign-off',
    missionShort: 'A/B Test Lab is a 7-agent team for rigorously designing A/B tests. Statistician computes sample size and power, designer mocks the variants, Devil red-teams p-hacking risks (SRM, peeking, Simpson\'s paradox), and decision presenter forces stat sign-off before launch. Protects the company from false conclusions from bad tests.',
    whoIs: 'This preset is for teams planning an important A/B test (pricing, onboarding, checkout, landing) that can\'t afford to make decisions based on stretched statistics. Ideal when the decision depends on the test outcome. Not for minor cosmetic changes or projects with low traffic.',
    analogy: 'This preset is like a pharmaceutical lab designing a clinical trial, where a biostatistician computes power, a clinician designs the arms, a prosecutor hunts for biases, and the IRB approves the plan before start.',
    howItWorks: [
      {label: 'Phase 1 - Problem framing', desc: 'Analyst defines the business hypothesis, primary metric, and minimum detectable effect (MDE). Checks that the test is ethical and has a clear decision direction.'},
      {label: 'Phase 2 - Statistical design', desc: 'Statistician computes sample size from MDE, baseline conversion, power (0.8), and alpha (0.05). Proposes test duration and allocation strategy.'},
      {label: 'Phase 3 - Variants and p-hacking audit', desc: 'Designer mocks variants (A baseline, B, optionally C). Devil red-teams the plan: SRM risk, peeking problem, Simpson\'s paradox, novelty effect, carryover. Flags all potential biases.'},
      {label: 'Phase 4 - Stat sign-off', desc: 'Decision presenter aggregates design, sample size, and Devil findings. Presents the plan to stakeholders who sign stat sign-off before the test launches.'}
    ],
    inputs: [
      'Business hypothesis and proposed change',
      'Baseline metrics (conversion rate, revenue, churn)',
      'Expected minimum detectable effect (MDE)',
      'Access to traffic logs and the experimentation platform'
    ],
    outputs: [
      'Test plan with computed sample size and duration',
      'Two or more variants ready to ship',
      'List of p-hacking traps to avoid (SRM, peeking, Simpson)',
      'Success criteria and a decision tree defined up front',
      'Signed stat sign-off document before test launch'
    ],
    does: [
      'Computes sample size from power analysis',
      'Designs variants with clear differences',
      'Audits the plan for p-hacking (SRM, peeking, Simpson)',
      'Forces success criteria to be set before start',
      'Protects against novelty effect and carryover bias',
      'Checks that the baseline is sufficient (>1000 conversions)',
      'Builds a decision tree (what we do for each outcome)',
      'Documents everything for stat sign-off'
    ],
    doesNotDo: [
      'Doesn\'t run the test itself (that\'s the experimentation platform)',
      'Doesn\'t analyze results post-hoc (different workflow)',
      'Doesn\'t work without baseline metrics',
      'Not suitable for low traffic (<1000 conversions)',
      'Doesn\'t test ethically questionable changes without review',
      'Doesn\'t replace a data engineer (only designs the test)',
      'Isn\'t a substitute for product analytics'
    ],
    antiPatterns: [
      'Peeking - checking results daily and stopping the test when you see "significance"',
      'Underpowered Test - sample size too small, the result is random and conclusions are fictional',
      'SRM Ignored - sample ratio mismatch ignored because it\'s a "small difference"',
      'Simpson Trap - aggregating results hides a segment where the effect is reversed',
      'Post-hoc Hypothesis - changing the primary metric after seeing the results'
    ],
    keyConcepts: [
      {term: 'Power Analysis', def: 'Computing the probability of detecting a real effect of a given size at a given sample size.'},
      {term: 'MDE', def: 'Minimum Detectable Effect - the smallest effect the test can detect statistically.'},
      {term: 'SRM', def: 'Sample Ratio Mismatch - unintended imbalance between A/B groups that corrupts the results.'},
      {term: 'Sequential Testing', def: 'Method that allows peeking at results without inflating alpha error.'},
      {term: 'Novelty Effect', def: 'Short-term metric bump caused by the novelty of the variant rather than its real value.'}
    ],
    stats: [
      {label: 'Agents', value: '7'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.80-2.00'},
      {label: 'Time', value: '15-30 min'}
    ],
    bestFor: [
      'When you\'re planning a new pricing test or a checkout flow change',
      'When you\'re testing a landing page for a big marketing campaign',
      'When you need to defend test results to the board or analysts'
    ],
    worstFor: [
      'When you have too few users (the test would run for months)',
      'When it\'s a minor cosmetic change with no business consequences',
      'When you don\'t yet know what you want to measure'
    ],
    relatedPresets: ['data_analysis_pipe', 'perf_squad', 'startup'],
    glossary: [
      {term: 'power', definition: 'Probability of detecting an effect in a test when the effect really exists.'},
      {term: 'MDE', definition: 'Minimum Detectable Effect - the smallest effect detectable statistically.'},
      {term: 'SRM', definition: 'Sample Ratio Mismatch - unintended imbalance between groups.'},
      {term: 'p-hacking', definition: 'Manipulating the analysis to get a significant result (cherry picking, peeking).'},
      {term: 'alpha', definition: 'Type I error threshold - probability of a false positive result (usually 0.05).'}
    ],
    learningQuote: 'A bad test gives false conclusions, and decisions based on bad tests cost more than the entire infrastructure - A/B Test Lab protects against that with one signature.',
    realExample: 'Imagine that the CEO wants to raise prices by 20% and the product director proposes an A/B test. Analyst formulates the hypothesis (net revenue effect), statistician computes that with baseline 3% conversion and MDE +5% revenue you need 28,000 users per variant and the test must run 14 days. Devil flags three risks: SRM because the cache remembers the user, peeking because the CEO will check daily, Simpson because mobile vs desktop have different effects. Decision presenter presents the plan with safeguards (sequential testing, no peeking, segmentation) and the CEO signs stat sign-off.'
  },
  kb_constructor: {
    tagline: 'Four agents in parallel clean Slack, wiki, PDFs, and GitHub into one knowledge base',
    missionShort: 'KB Constructor is a 10-agent team for building a knowledge base from scattered sources. Four ingesters in parallel normalize Slack, wiki, PDFs, and GitHub into a shared chunk format, a deduplicator removes repeats, a writer drafts articles, a critic fact-checks, and an integrator publishes. For companies that have drowned their knowledge in silos.',
    whoIs: 'A preset for teams whose knowledge is spread across many sources and who want to merge it into one knowledge base. Ideal for onboarding new hires, migrating a wiki from Confluence to Notion, or a customer support base. Not for a single source, and not for a base that needs continuous real-time updates.',
    analogy: 'This preset is like a digital library that hires four archivists, each specialized in a different format (journals, manuscripts, microfilm, books), and then an editor writes the entries and a press publishes them.',
    howItWorks: [
      {label: 'Phase 1 - Parallel ingest', desc: 'Four ingesters work in parallel, each on its own source: Slack (channels + messages), wiki (pages + metadata), PDFs (text + structure extraction), GitHub (README + docs). Each returns chunks in a unified format.'},
      {label: 'Phase 2 - Dedup and structuring', desc: 'The deduplicator uses embeddings and fuzzy matching to remove duplicates (when two sources say the same thing). It groups related chunks into topics and proposes a category structure.'},
      {label: 'Phase 3 - Writing and fact-check', desc: 'The writer drafts articles from the best chunks, preserving links to originals. The critic verifies that every fact has a source and flags contradictions.'},
      {label: 'Phase 4 - Publish and reranking', desc: 'The integrator publishes to the target system (Notion, Confluence, custom). It configures a reranker for search and tests recall against a sample of queries.'}
    ],
    inputs: [
      'List of sources with access credentials (Slack token, wiki creds, PDFs, repo)',
      'Target system (Notion, Confluence, custom)',
      'Category structure (optional - the system can propose one)',
      'List of critical questions for recall testing'
    ],
    outputs: [
      'Knowledge base structure (categories and tags)',
      'Articles organized by topic with links to sources',
      'Deduplicated chunks ready for embedding',
      'Fact-check report with a list of contradictions',
      'Ready-to-import package for the target system'
    ],
    does: [
      'Normalizes data from four different sources into one shared format',
      'Dedupes chunks using embeddings and fuzzy matching',
      'Generates a category structure from topics',
      'Writes articles while preserving links to original sources',
      'Fact-checks every claim before publication',
      'Configures a reranker for search quality',
      'Tests recall against a defined query set',
      'Publishes to the target system'
    ],
    doesNotDo: [
      'Doesn\'t work with a single source (overkill)',
      'Doesn\'t update the base in real time (one-off operation)',
      'Isn\'t a substitute for a vector DB (only prepares the data)',
      'Doesn\'t create access policies (that\'s an admin\'s job)',
      'Doesn\'t replace a domain expert for critical data',
      'Doesn\'t build semantic search itself (only structure)',
      'Doesn\'t translate documents (that\'s another pipeline)'
    ],
    antiPatterns: [
      'Dump and Dupe - loading everything without dedup leaves the base 50% garbage',
      'Lost Sources - articles without links to sources block any verification',
      'Unfactchecked - publishing without fact-check leaks contradictions to users',
      'Rigid Structure - a predefined structure that doesn\'t fit the data forces ugly reshuffling',
      'Missing Reranker - search without a reranker returns unrelated results'
    ],
    keyConcepts: [
      {term: 'Chunking', def: 'Splitting documents into smaller fixed-size pieces for embedding and retrieval.'},
      {term: 'Dedup', def: 'Removing duplicate chunks via embedding similarity and fuzzy matching.'},
      {term: 'Embedding', def: 'Conversion of text into a vector of numbers that represents meaning for semantic search.'},
      {term: 'Reranker', def: 'A second search stage that rescores the top results with a stronger model for relevance.'},
      {term: 'RAG', def: 'Retrieval Augmented Generation - an LLM answers questions by reaching into a knowledge base.'}
    ],
    stats: [
      {label: 'Agents', value: '10'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.85-2.15'},
      {label: 'Time', value: '30-60 min'}
    ],
    bestFor: [
      'When you\'re migrating an internal wiki from Confluence to Notion or the other way around',
      'When you\'re building a knowledge base for new hires or customer support',
      'When the company has knowledge scattered across Slack, wiki, PDFs, and GitHub'
    ],
    worstFor: [
      'When you only have one source of information (too heavy a preset)',
      'When you need continuous real-time updates (this is a one-off operation)',
      'When you already have a solid semantic search system'
    ],
    relatedPresets: ['content', 'research', 'tech_writing_pipe'],
    glossary: [
      {term: 'chunking', definition: 'Splitting a document into fixed-size pieces for embedding.'},
      {term: 'dedup', definition: 'Removing duplicate chunks via similarity.'},
      {term: 'embedding', definition: 'A vector representing the meaning of text for semantic search.'},
      {term: 'reranker', definition: 'A second search stage that rescores results with a stronger model.'},
      {term: 'RAG', definition: 'Retrieval Augmented Generation - an LLM reaching into a knowledge base.'}
    ],
    learningQuote: 'Knowledge scattered across five sources is worse than no knowledge at all - a new hire loses weeks searching while the answers contradict each other.',
    realExample: 'Imagine that your company has 300 employees and its knowledge is spread across Slack (3 years of an engineering channel), a Confluence wiki (400 pages), a Drive folder of onboarding PDFs, and READMEs in 40 repositories. KB Constructor spins up 4 ingesters in parallel, the deduplicator finds that 60% of the Confluence entries are copies of Slack messages, the writer drafts 80 categorized articles, the critic catches 7 contradictions between sources, and the integrator publishes to Notion with a reranker that answers correctly on 85% of test queries.'
  },
  tech_writing_pipe: {
    tagline: 'Plan plus research plus writing plus diagrams plus SEO plus fact-check in one pipeline',
    missionShort: 'Tech Writing Pipeline is an 8-agent team for longer technical texts. An analyst builds the outline, two researchers in parallel gather facts (docs + GitHub), a writer writes, a designer draws diagrams, an SEO agent optimizes headers and meta, and a critic checks facts and tone. For technical blogs, whitepapers, and conference talks.',
    whoIs: 'A preset for technical marketing teams, DevRel, or contributors who write longer technical material. Ideal for technical blog posts, whitepapers, conference slides, and deep-dive case studies. Not for short posts, tweets, social media, or internal notes.',
    analogy: 'This preset is like a science and technology magazine newsroom where the research department gathers facts, the editor writes the copy, an illustrator creates the artwork, an SEO specialist optimizes it, and a fact-checker verifies everything before it goes to print.',
    howItWorks: [
      {label: 'Phase 1 - Outline and audience', desc: 'The analyst defines who the text is for (audience, knowledge level), formulates the main angle, and drafts an outline with sections. Sets success criteria (what the reader will learn).'},
      {label: 'Phase 2 - Parallel research', desc: 'Two researchers gather material in parallel: res_docs reads official documentation for technical facts, res_github looks for code examples and benchmarks. Each returns organized findings.'},
      {label: 'Phase 3 - Writing and enrichment', desc: 'The writer drafts the text strictly from the researchers\' findings (no hallucinating). The designer draws diagrams for complex concepts. The SEO optimizer picks keywords, H1-H3 headers, and meta descriptions.'},
      {label: 'Phase 4 - Fact-check and tone polish', desc: 'The critic checks every fact against sources, flags contradictions, and verifies tone (audience match). Generates a pre-publish checklist.'}
    ],
    inputs: [
      'Topic and goal of the text (blog, whitepaper, talk)',
      'Audience (beginners, advanced, decision-makers)',
      'Angle or main thesis (what you want to get across)',
      'Optional rough outline or bullet points'
    ],
    outputs: [
      'Long article or whitepaper with code examples',
      'Architecture and flow diagrams for complex concepts',
      'Titles and meta descriptions optimized for search',
      'Citation list with links to sources',
      'Pre-publish readiness checklist'
    ],
    does: [
      'Starts from an outline instead of writing immediately',
      'Uses two researchers for facts (docs + github)',
      'Isolates the writer from making things up - writes only from research',
      'Adds diagrams for complex concepts',
      'Optimizes for SEO without keyword stuffing',
      'Fact-checks every claim before publication',
      'Adjusts tone to the audience',
      'Generates a readiness checklist'
    ],
    doesNotDo: [
      'Doesn\'t write short social media posts (overkill)',
      'Doesn\'t create tweets or threads',
      'Doesn\'t execute code (the designer draws, doesn\'t run)',
      'Doesn\'t publish on its own (only prepares ready copy)',
      'Doesn\'t translate into other languages (that\'s another pipeline)',
      'Doesn\'t replace a human editor for brand style',
      'Doesn\'t guarantee Google rankings (only optimizes)'
    ],
    antiPatterns: [
      'Writer First - writing without research produces hallucinations',
      'SEO Stuffing - cramming keywords into the text destroys tone and readability',
      'No Fact-check - publishing without verification ships errors to readers',
      'Generic Audience - text for everyone is text for no one',
      'Diagram Theater - diagrams that explain nothing only add noise'
    ],
    keyConcepts: [
      {term: 'Outline-First', def: 'Starting with a section plan before writing - reduces chaos and hallucinations.'},
      {term: 'E-E-A-T', def: 'Experience, Expertise, Authoritativeness, Trust - Google\'s quality signals for content.'},
      {term: 'Structured Data', def: 'Schema.org markup for an article that lets Google understand the content better.'},
      {term: 'Audience Calibration', def: 'Matching vocabulary, assumptions, and depth to the reader\'s level.'},
      {term: 'Fact-check Loop', def: 'A dedicated step that verifies every claim against sources before publication.'}
    ],
    stats: [
      {label: 'Agents', value: '8'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.75-1.85'},
      {label: 'Time', value: '20-40 min'}
    ],
    bestFor: [
      'When you\'re writing a deep company blog post or a whitepaper for clients',
      'When you\'re preparing a conference talk or a deep-dive case study',
      'When you need a long technical piece that\'s verified for factual accuracy'
    ],
    worstFor: [
      'When you\'re writing a short Twitter or LinkedIn post',
      'When you\'re writing an internal note for the team',
      'When you have 10 minutes for content and don\'t want a full pipeline'
    ],
    relatedPresets: ['content', 'research', 'kb_constructor'],
    glossary: [
      {term: 'outline', definition: 'A section plan for the text before writing - reduces chaos.'},
      {term: 'E-E-A-T', definition: 'Experience Expertise Authoritativeness Trust - Google quality signals.'},
      {term: 'SEO', definition: 'Search Engine Optimization - optimizing content for search engines.'},
      {term: 'audience', definition: 'The target reader who determines vocabulary and depth.'},
      {term: 'fact-check', definition: 'Verification of every claim against sources before publication.'}
    ],
    learningQuote: 'Without an outline and research the writer hallucinates and the fact-checker has to catch it later - Tech Writing Pipeline enforces the order: plan, facts, writing, verification.',
    realExample: 'Imagine that your DevRel is writing a Kubernetes deep-dive for the company blog and the boss says "by tomorrow." Without the preset, that\'s a recipe for hallucinations. Tech Writing Pipeline: the analyst builds an outline for an audience of senior platform engineers, res_docs reads the official k8s docs v1.32, res_github looks for real-world examples in the kubernetes/examples repo, the writer produces 2500 words strictly from the research, the designer draws a reconciliation loop diagram, SEO optimizes for "kubernetes operator pattern," the critic catches one wrong fact about leader election, and the piece is ready to publish.'
  },
  five_minds_strategic: {
    tagline: 'Hard data first, then debate - five experts with numbers in hand instead of an opinion war',
    missionShort: 'Five Minds Strategic is a 13-agent team for high-stakes strategic decisions. Four researchers in parallel gather hard data (market, financials, technology, legal), an analyst frames the question, five experts plus Devil\'s Advocate debate for three rounds, a synthesizer writes the Gold Solution, and a PM sign-off closes it out. For pivots, acquisitions, and irreversible strategic choices.',
    whoIs: 'A preset for boards and senior leadership teams making strategic decisions with a 3+ year horizon. Ideal for company pivots, acquisition evaluations, and picking a platform for the next 5 years. Not for tactical decisions due today, urgent matters, or cases where the answer is already obvious.',
    analogy: 'This preset is like a war council with an intelligence dossier, where scouts gather information first, then the generals debate for three rounds against a prosecutor, and the final plan goes to the president.',
    howItWorks: [
      {label: 'Phase 1 - Parallel intelligence', desc: 'Four researchers gather data in parallel: market intel (market, competition, trends), financial (financials, ROI, costs), technical (feasibility, risks, stacks), legal (regulations, compliance). Each returns hard numbers.'},
      {label: 'Phase 2 - Option framing', desc: 'The analyst synthesizes the 4 reports into formalized decision options (2-5) with pros, cons, and uncertainties. Presents each option in the same structure.'},
      {label: 'Phase 3 - Three-round debate', desc: 'Five experts (innovator, analyst, pragmatist, user, visionary) plus Devil\'s Advocate debate for three rounds: opinion -> counterarguments -> synthesis. Devil\'s Advocate attacks the strongest proposal looking for weaknesses.'},
      {label: 'Phase 4 - Gold Solution and HITL', desc: 'The synthesizer writes a Gold Solution better than any individual option (a real synthesis, not a compromise). The PM signs off on the decision with a rationale and a list of dissenting opinions.'}
    ],
    inputs: [
      'Strategic question with a definition of stakes (investment, time horizon)',
      'List of options to consider (or an area to investigate)',
      'Company context (stage, culture, constraints)',
      'Decision deadline (minimum days for the debate)'
    ],
    outputs: [
      'Four reports with hard data (market, financials, tech, legal)',
      'Log of the three debate rounds with expert arguments',
      'Gold Solution with analysis of pros and cons',
      'List of dissenting opinions kept on record',
      'Signed PM decision with an implementation plan'
    ],
    does: [
      'Gathers hard data before the debate (no opinion war)',
      'Uses 4 specialized researchers for the key areas',
      'Formalizes the debate into three rounds with explicit structure',
      'Uses Devil\'s Advocate for adversarial challenge of the strongest proposal',
      'Has the synthesizer write a Gold Solution better than all options',
      'Records dissenting opinions for the historical record',
      'Enforces PM sign-off with written rationale',
      'Documents everything for a decision audit'
    ],
    doesNotDo: [
      'Not for tactical decisions due today (too heavy)',
      'Not for urgent matters (three debate rounds take time)',
      'Doesn\'t run without time for research',
      'Doesn\'t replace a domain expert in narrow areas',
      'Doesn\'t do implementation (decision only)',
      'Doesn\'t guarantee the decision will be correct (only the process)',
      'Doesn\'t work when the answer is obvious to everyone'
    ],
    antiPatterns: [
      'Opinion War - debate without data turns into whoever shouts loudest',
      'Skipped Devil - the team skips the adversarial challenge and runs with the first proposal',
      'Gold Compromise - the synthesizer produces a compromise instead of a true synthesis',
      'Silent Dissent - losing dissenting opinions robs the company of learning',
      'Rushed Rounds - cutting 3 rounds to 1 kills the adversarial value'
    ],
    keyConcepts: [
      {term: 'Adversarial Collaboration', def: 'Collaboration where different experts formally attack each other\'s positions to find weaknesses.'},
      {term: 'Pre-mortem', def: 'Technique of imagining the decision was a failure and trying to work out why.'},
      {term: 'Steel Man', def: 'Rebuilding the strongest version of your opponent\'s argument instead of attacking a weak one.'},
      {term: 'Gold Solution', def: 'Synthesis of all debate rounds that is better than any single proposal, not a compromise.'},
      {term: 'Dissenting Opinion', def: 'A formal record of a differing view kept for historical record and learning.'}
    ],
    stats: [
      {label: 'Agents', value: '13'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.65-4.10'},
      {label: 'Time', value: '45-90 min'}
    ],
    bestFor: [
      'When you\'re deciding on a company pivot or acquiring another company',
      'When you\'re picking a tech stack or vendor for the next 5 years',
      'When the stakes are irreversible and require hard data plus debate'
    ],
    worstFor: [
      'When you need a tactical decision today',
      'When you have an urgent matter with no time for a three-round debate',
      'When the answer is obvious to everyone and the debate is a waste of time'
    ],
    relatedPresets: ['five_minds', 'deep_five_minds', 'deep_research_swarm_pro'],
    glossary: [
      {term: 'pivot', definition: 'A change in company direction or product strategy.'},
      {term: 'Gold Solution', definition: 'A synthesis better than individual options, not a compromise.'},
      {term: 'pre-mortem', definition: 'Imagining the decision failed and analyzing why.'},
      {term: 'steel man', definition: 'Rebuilding the strongest version of your opponent\'s argument.'},
      {term: 'dissenting opinion', definition: 'A formal record of a differing view for the historical record.'}
    ],
    learningQuote: 'Debate without hard data is an opinion war - Five Minds Strategic forces research, debate, and sign-off in one pass.',
    realExample: 'Imagine that the board is considering acquiring a competitor for 50 million dollars. Four researchers gather in parallel: market intel (share, trends), financial (ROI, costs, debt), technical (stack compatibility, tech debt), legal (antitrust, employees). The analyst frames three options (buy the whole company, buy only the technology, don\'t buy). Five experts debate three rounds and Devil\'s Advocate attacks option 1, finding overpay risk and culture clash. The synthesizer writes a Gold Solution: buy only the technology and hire the key engineers. The PM signs off with a dissenting opinion on record that a board member wanted a full acquisition.'
  },
  soc2_sweep: {
    tagline: 'SOC 2 Type II readiness run by the full team - control mapping plus evidence plus gap',
    missionShort: 'SOC2 Sweep is a 9-agent team for SOC 2 Type II audit preparation. A policy reader reads company policies, a control mapper maps them to CC1-CC9, an evidence collector gathers proof, a gap analyzer flags missing controls, qa_security verifies technical controls, and a CISO signs off on readiness. Aligned with Trust Services Criteria.',
    whoIs: 'A preset for security and compliance teams preparing for a SOC 2 audit. Ideal for startups moving upmarket to enterprise, quarterly reviews, and vendor risk assessment responses. Not for companies without any policies, not for continuous compliance (use Vanta/Drata), and not for minor fixes.',
    analogy: 'This preset is like an audit of a bank where one auditor reads the policies, a second maps them to regulations, a third collects evidence, a fourth points out the gaps, and the CFO signs off on the report for the regulator.',
    howItWorks: [
      {label: 'Phase 1 - Policy reading', desc: 'The policy reader reads every SOP, security policy, vendor agreement, and incident runbook the company has. Builds a policy map with metadata (dates, owners).'},
      {label: 'Phase 2 - Control mapping', desc: 'The control mapper maps policies onto Trust Services Criteria CC1-CC9 (Control Environment, Communication, Risk Assessment, Monitoring, Control Activities, Logical Access, System Ops, Change Mgmt, Risk Mitigation).'},
      {label: 'Phase 3 - Evidence collection', desc: 'The evidence collector gathers evidence for each control: screenshots, configs, logs, audit trails, personnel records. qa_security verifies the technical controls (encryption, MFA, backup, access reviews).'},
      {label: 'Phase 4 - Gap analysis and CISO sign-off', desc: 'The gap analyzer flags missing coverage, proposes remediation, and estimates priorities. The CISO reviews the readiness report and signs off on audit readiness with a remediation plan.'}
    ],
    inputs: [
      'Set of company policies and SOPs',
      'Access to production systems for evidence collection',
      'List of current employees and their roles',
      'Audit scope (which products, which regions)'
    ],
    outputs: [
      'Compliance table with every requirement and its evidence',
      'Evidence folder (screenshots, configs, logs)',
      'List of gaps ordered by priority',
      'Remediation proposals for each gap',
      'Signed audit readiness report from the CISO'
    ],
    does: [
      'Reads every company policy and maps them to CC1-CC9',
      'Collects evidence automatically for technical controls',
      'Verifies encryption, MFA, backup, and access reviews',
      'Flags gaps in Trust Services Criteria coverage',
      'Proposes remediation with P0-P3 priorities',
      'Generates a folder for the external auditor',
      'Enforces CISO sign-off before the audit',
      'Documents everything for the historical record'
    ],
    doesNotDo: [
      'Doesn\'t replace the external auditor (preparation only)',
      'Doesn\'t work without existing policies (write them first)',
      'Isn\'t continuous compliance (use Vanta/Drata)',
      'Doesn\'t remediate gaps itself (only identifies them)',
      'Isn\'t a pentest or a security audit',
      'Doesn\'t cover ISO 27001 automatically (different standard)',
      'Doesn\'t replace HR for personnel records'
    ],
    antiPatterns: [
      'Policy Theater - the policies exist on paper but nobody follows them',
      'Evidence Vacuum - control evidence was collected a year ago and is already stale',
      'Ignored Gaps - the gap analyzer flags gaps that then nobody fixes',
      'Missing CISO - a sign-off without CISO involvement has no value',
      'Scope Creep - trying to cover everything instead of the selected products'
    ],
    keyConcepts: [
      {term: 'Trust Services Criteria', def: 'AICPA framework with 5 categories: Security, Availability, Processing Integrity, Confidentiality, Privacy.'},
      {term: 'CC1-CC9', def: 'The nine Common Criteria in SOC 2: Control Environment, Communication, Risk, Monitoring, Control, Access, Ops, Change, Risk Mitigation.'},
      {term: 'Control Evidence', def: 'Proof that a control actually works in practice: screenshots, configs, logs, audit trails.'},
      {term: 'Gap Remediation', def: 'Remediation plan for control coverage gaps with priorities and a timeline.'},
      {term: 'SOC 2 Type II', def: 'A SOC 2 audit covering a period of at least 6 months rather than a single point in time.'}
    ],
    stats: [
      {label: 'Agents', value: '9'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.10-2.75'},
      {label: 'Time', value: '30-60 min'}
    ],
    bestFor: [
      'When you\'re preparing for a SOC 2 Type II audit for enterprise customers',
      'When you\'re answering a vendor risk assessment from a large customer',
      'When you\'re running a quarterly compliance review or prepping for ISO 27001'
    ],
    worstFor: [
      'When you don\'t have any company policies (write them first)',
      'When you want continuous compliance (use Vanta or Drata)',
      'When you only need minor security fixes'
    ],
    relatedPresets: ['security_multi_vector', 'security', 'test_suite'],
    glossary: [
      {term: 'SOC 2', definition: 'AICPA security audit standard for cloud vendors.'},
      {term: 'Trust Services Criteria', definition: 'Framework with 5 categories: Security, Availability, Processing Integrity, Confidentiality, Privacy.'},
      {term: 'CC1-CC9', definition: 'The nine Common Criteria in SOC 2.'},
      {term: 'evidence', definition: 'Proof that a control actually works in practice.'},
      {term: 'Type II', definition: 'An audit covering a 6-12 month period, not a single point in time.'}
    ],
    learningQuote: 'SOC 2 isn\'t documentation on a shelf - it\'s proof that controls work every single day, and this preset automates collecting that proof.',
    realExample: 'Imagine that your SaaS startup has a contract with a big enterprise customer worth 2 million a year, but the customer requires SOC 2 Type II within 6 months. The policy reader reads 28 policies, the control mapper maps them to CC1-CC9, the evidence collector gathers AWS configurations, access review logs, and screenshots from Okta, the gap analyzer flags 7 gaps (no formal vendor risk assessment, no annual penetration test, no formalized incident response plan). The CISO signs off on the report with a remediation plan 3 months before the audit.'
  },
  data_analysis_pipe: {
    tagline: 'Nine agents in sequence - collect plus clean plus EDA plus model plus report',
    missionShort: 'Data Analysis Pipeline is a 9-agent team for turning raw data into a stakeholder-ready report. A data collector profiles the dataset, a cleaner normalizes it, an EDA analyst and SQL specialist look for patterns in parallel, a statistician checks for soundness, a model builder optionally trains a prediction, a writer drafts the report, and a designer produces the charts. Based on arXiv 2510.04023.',
    whoIs: 'A preset for data analysts and business intelligence teams who need to turn a raw spreadsheet into a board-ready report. Ideal for ad-hoc business questions, churn analysis, pricing, and A/B test post-mortems. Not for real-time streaming data, ML production deployment, or work without access to the raw data.',
    analogy: 'This preset is like a data science consulting team where an engineer ingests the data, an analyst cleans it, a scientist runs EDA, a modeler trains, and a narrator writes the board report with a statistician peer-reviewing the math.',
    howItWorks: [
      {label: 'Phase 1 - Profiling and cleaning', desc: 'The data collector profiles the sheet (schema, statistics, ~5k samples instead of the raw file). The data cleaner normalizes (missing values, outliers, date formats, encoding).'},
      {label: 'Phase 2 - Parallel EDA', desc: 'The EDA analyst looks for patterns (distributions, correlations, segments). The SQL specialist writes queries for specific business hypotheses. They work in parallel.'},
      {label: 'Phase 3 - Stats sanity and modeling', desc: 'The statistician checks whether conclusions are statistically significant and flags leakage, assumption violations, and multiple-comparison problems. Optionally the model builder trains a simple prediction model.'},
      {label: 'Phase 4 - Report and charts', desc: 'The writer produces a board-ready report with an executive summary, key insights, and recommendations. The designer builds the charts. The critic verifies the stats sanity.'}
    ],
    inputs: [
      'Access to the raw data (CSV, DB, warehouse)',
      'Business question (why did sales drop)',
      'Business context (products, segments, time period)',
      'Audience for the report (board, ops, marketing)'
    ],
    outputs: [
      'Board-ready report with the key findings',
      'Charts with narrative for each insight',
      'Confidence on every claim plus limitations',
      'Optional simple prediction model',
      'Recommendations with concrete actions'
    ],
    does: [
      'Profiles the dataset without reading it all (samples + stats)',
      'Cleans data (missing values, outliers, formats)',
      'Runs EDA and SQL in parallel for different hypotheses',
      'Checks statistical soundness (leakage, assumptions)',
      'Optionally builds a simple prediction model',
      'Generates charts with narrative',
      'Writes the report for a specific audience',
      'Runs every claim through the critic'
    ],
    doesNotDo: [
      'Not for real-time streaming data (different architecture)',
      'Doesn\'t deploy models to production (that\'s ML engineering)',
      'Doesn\'t work without access to raw data',
      'Doesn\'t replace a data engineer for ETL',
      'Doesn\'t do causal inference on observational data',
      'Doesn\'t build live dashboards (that\'s BI tooling)',
      'Doesn\'t deliver insights beyond what\'s in the sheet'
    ],
    antiPatterns: [
      'Full Data Dump - the writer gets raw data and invents statistics',
      'P-hacked Insight - EDA finds something random and ships it as a finding',
      'Missing Baseline - no comparison to a previous period hides the real change',
      'Leakage Blind - the model uses future features as predictors',
      'No Stats Check - the report is published with no statistical sanity check'
    ],
    keyConcepts: [
      {term: 'EDA', def: 'Exploratory Data Analysis - visualization and statistics first to understand the data.'},
      {term: 'Missingness', def: 'Pattern of missing values that can be MCAR, MAR, or MNAR.'},
      {term: 'Leakage', def: 'Model uses information it shouldn\'t have at prediction time (future features).'},
      {term: 'Model Card', def: 'Model documentation with purpose, data, metrics, limitations, and recommended use.'},
      {term: 'Multiple Comparisons', def: 'Problem where testing many hypotheses inflates type I errors and requires correction.'}
    ],
    stats: [
      {label: 'Agents', value: '9'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.10-2.75'},
      {label: 'Time', value: '25-50 min'}
    ],
    bestFor: [
      'When the board asks why sales dropped in March and you need a data-driven answer',
      'When you\'re analyzing customer churn or a pricing experiment',
      'When you\'re doing an A/B test post-mortem or a product analysis'
    ],
    worstFor: [
      'When you have live streaming data (different architecture)',
      'When you want to deploy a model to production (that\'s ML engineering)',
      'When you don\'t have access to the raw data'
    ],
    relatedPresets: ['ab_test_lab', 'research', 'data_pipe'],
    glossary: [
      {term: 'EDA', definition: 'Exploratory Data Analysis - initial exploration and visualization.'},
      {term: 'leakage', definition: 'Using future information as a prediction feature.'},
      {term: 'model card', definition: 'Model documentation with purpose, data, metrics, and limitations.'},
      {term: 'missingness', definition: 'Pattern of missing values: MCAR, MAR, or MNAR.'},
      {term: 'correlation', definition: 'Measure of co-occurrence between two variables, not necessarily causal.'}
    ],
    learningQuote: 'Without a stats sanity check it\'s easy to find patterns that aren\'t there - Data Analysis Pipeline enforces discipline from profiling to report.',
    realExample: 'Imagine that the CFO asks why Q3 revenue dropped 8% and has a CSV of 2 million transactions on the desk. The data collector profiles (14 columns, 12 dates, 4 numeric, 2 text), the cleaner catches 3% missing values in the region field, the EDA analyst sees the drop is concentrated in two regions, the SQL specialist isolates specific products, the statistician confirms it isn\'t seasonality and it isn\'t a one-off anomaly. The writer produces a report for the CFO with three recommendations and charts, and the critic verifies the stats sanity.'
  },
  incident_war_room: {
    tagline: 'Three specialists hunt the cause in parallel - Devil\'s Advocate challenges the hypothesis and a human decides on rollback',
    missionShort: 'Incident War Room is a 10-agent team for triaging production outages. Three investigators in parallel (telemetry, logs, diff) hunt the cause, two testers (perf, security) rule out their domains, Devil\'s Advocate attacks the leading hypothesis, a human decides on rollback, and a writer produces a 5 whys postmortem. Based on Microsoft Magentic-One.',
    whoIs: 'A preset for on-call and SRE teams during P0/P1 production outages. Ideal for live triage, customer-impact regressions, and postmortem generation. Not for planned maintenance, long-term code cleanup, or vague suspicions that "the system seems slow."',
    analogy: 'This preset is like an incident commander\'s war room where three scouts in parallel (radar, satellite, field agent) collect data, a prosecutor attacks the commander\'s theory, and the president decides on rollback.',
    howItWorks: [
      {label: 'Phase 1 - Parallel investigation', desc: 'Three investigators run in parallel: the telemetry surfer reads metrics and traces with reproducible queries, the log analyst hunts error patterns in logs, and the diff investigator analyzes recent deploys and PRs.'},
      {label: 'Phase 2 - Specialist rule-out', desc: 'qa_perf analyzes whether this is a performance regression, qa_security checks if it\'s a security incident. Each rules its domain in or out.'},
      {label: 'Phase 3 - Devil\'s Advocate adversarial', desc: 'Devil\'s Advocate attacks the incident commander\'s leading hypothesis: what if it\'s not the deploy, what if it\'s a downstream service, what if it\'s coincidence. Forces alternative hypotheses.'},
      {label: 'Phase 4 - Rollback HITL and postmortem', desc: 'The decision presenter shows the human the evidence and options (rollback vs hotfix vs monitor). The human signs the decision. The comms officer writes the status page update, the writer writes the postmortem with 5 whys.'}
    ],
    inputs: [
      'Access to production metrics, logs, and traces',
      'List of recent deploys and PRs',
      'Alerts or customer reports',
      'Runbook and on-call contact list'
    ],
    outputs: [
      'Investigation timeline (who did what, when)',
      'Leading theory with counterarguments from Devil\'s Advocate',
      'Rollback decision with rationale',
      'Status page update for customers',
      'Postmortem with 5 whys and action items'
    ],
    does: [
      'Runs 3 investigators in parallel to cut time-to-RCA',
      'Uses reproducible PromQL/LogQL queries',
      'Rules perf and security in or out as domain owners',
      'Forces alternative hypotheses through Devil\'s Advocate',
      'Gives the human the rollback call (high stakes)',
      'Writes the status page update for customers',
      'Generates a postmortem with 5 whys',
      'Creates action items to prevent recurrence'
    ],
    doesNotDo: [
      'Doesn\'t work without access to production observability',
      'Not for planned maintenance work',
      'Doesn\'t do long-term code cleanup',
      'Isn\'t a substitute for a proper incident commander',
      'Doesn\'t fix the outage itself (diagnosis only)',
      'Doesn\'t communicate with press or social media (status page only)',
      'Isn\'t proactive monitoring (reactive only)'
    ],
    antiPatterns: [
      'First Hypothesis Lock-in - the team runs with the first theory without alternatives',
      'Rollback Without Evidence - rollback decision with no proof that the last deploy is the culprit',
      'Silent Status Page - the outage drags on and customers have no idea',
      'Missing Postmortem - the outage ends with no learning for the team',
      'Shallow 5 Whys - stopping at a surface cause instead of the real root cause'
    ],
    keyConcepts: [
      {term: 'MTTR', def: 'Mean Time To Recovery - average time from detection to service restoration.'},
      {term: 'Rollback Window', def: 'Time window in which you can safely roll back the last deploy without losing data.'},
      {term: 'War Room Roles', def: 'Formal roles during an incident: commander, investigator, comms, scribe, executor.'},
      {term: '5 Whys', def: 'Root cause technique that asks "why" five times from symptom down to cause.'},
      {term: 'Magentic-One Pattern', def: 'Microsoft dual-ledger framework (task ledger + progress ledger) for incident response.'}
    ],
    stats: [
      {label: 'Agents', value: '10'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.30-3.30'},
      {label: 'Time', value: '15-40 min'}
    ],
    bestFor: [
      'When you have a serious P0/P1 production outage and every minute costs money',
      'When a regression hits customers and you have to decide on rollback',
      'When the outage is over and you need to write a postmortem for leadership'
    ],
    worstFor: [
      'When you don\'t have access to metrics or observability',
      'When it\'s planned maintenance, not an outage',
      'When you need a long-term refactor rather than a fast fix'
    ],
    relatedPresets: ['perf_squad', 'bug_hunt', 'security_multi_vector'],
    glossary: [
      {term: 'MTTR', definition: 'Mean Time To Recovery - average time from detection to repair.'},
      {term: 'rollback', definition: 'Reverting the last deploy to the previous stable version.'},
      {term: '5 whys', definition: 'Root cause analysis technique that asks why five times.'},
      {term: 'postmortem', definition: 'Post-incident report with timeline, root cause, and action items.'},
      {term: 'war room', definition: 'Temporary team of people and systems engaged in incident triage.'}
    ],
    learningQuote: 'Every minute of an outage is money, and a person under pressure bets on the wrong hypothesis - Incident War Room forces three parallel investigations and an adversarial challenge before rollback.',
    realExample: 'Imagine that at 2:30 PM p99 latency alerts start firing above 5 seconds and the support dashboard shows 40 tickets. The telemetry surfer spots a spike in the database connection pool, the log analyst catches 500s in the auth service logs, the diff investigator finds a 2:15 PM deploy that introduces a new middleware. qa_perf confirms it\'s not memory or CPU, qa_security rules out an attack. Devil\'s Advocate attacks the hypothesis: "what if it\'s not the middleware but downstream cache invalidation." The decision presenter shows the human the evidence and the human picks rollback. By 2:45 PM the service is stable, and the writer produces a postmortem with 5 whys and action items.'
  },
};
