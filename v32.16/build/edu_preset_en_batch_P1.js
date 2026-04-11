// Batch: P1 EN translations (solo, quick_fix, recon, trio, reflect, bug_hunt)
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
