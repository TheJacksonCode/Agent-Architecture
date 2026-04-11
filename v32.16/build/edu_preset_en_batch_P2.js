// Batch: P2 EN translations (content, plan_exec, perf_boost, startup, cascade, test_suite)
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
