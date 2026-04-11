// Batch: A5 EN translations (qa_perf, qa_manager, expert_pragmatist, expert_innovator, expert_analyst)
  qa_perf: {
    tagline: 'Dyno engineer - measures bottlenecks instead of guessing what\'s slow',
    missionShort: 'QA Performance audits the whole stack for speed: response time, bundle size, memory leaks, query performance, Core Web Vitals. Its mission: deliver hard metrics and specific optimization recommendations. It does not fix anything itself, it reports to the Orchestrator with numbers.',
    whoIs: 'QA Performance is the only agent focused purely on performance metrics. It acts like an F1 engineer timing laps or tuning an engine on a dyno - it knows every parameter and which one limits output, but it does not turn the wrench. It hands the diagnosis to the mechanic (the Coder).',
    analogy: 'QA Performance is like an F1 engineer at the dyno - it measures power, torque, and temperature, and it knows exactly which engine part is limiting performance, but it never holds the wrench itself.',
    howItWorks: [
      {label: 'Measurement baseline', desc: 'Collects raw metrics: endpoint response times, bundle size, Lighthouse scores, Core Web Vitals. Without a baseline you cannot know what to improve or whether anything improved at all.'},
      {label: 'Bottleneck identification', desc: 'Profiles the stack looking for the slowest link - a slow endpoint, large JS chunks, N+1 queries, memory leak. The 80/20 rule: 20% of the code causes 80% of the latency.'},
      {label: 'Recommendations with numbers', desc: 'Writes concrete recommendations: shrink bundle from 480KB to 250KB, add an index on users.email, lazy-load the image gallery. Every recommendation comes with an estimated saving.'},
      {label: 'Priority report', desc: 'Hands perf-report.md to the QA Manager with CRITICAL/MAJOR/MINOR priorities. The Manager synthesizes it with the other reports (Security, Quality) and issues GO/NO-GO to the Orchestrator.'}
    ],
    inputs: [
      'Current code implementation from Builders (backend + frontend)',
      'SLA targets - acceptable response time, bundle size, Core Web Vitals',
      'Access to a test environment with representative data',
      'Measurement tools: Lighthouse, k6, Chrome DevTools, EXPLAIN ANALYZE'
    ],
    outputs: [
      'Perf-report.md with metrics for response time, bundle, memory, queries',
      'Lighthouse score and Core Web Vitals report (LCP, FID, CLS)',
      'List of bottlenecks with CRITICAL/MAJOR/MINOR priorities',
      'Optimization recommendations with estimated savings',
      'Before/after benchmark comparison (when available)'
    ],
    does: [
      'Measures endpoint response times and identifies slow APIs (>200ms is a red flag)',
      'Analyzes bundle size and verifies tree shaking, dead imports, unnecessary deps',
      'Checks for memory leaks: event listeners, closures, detached DOM nodes',
      'Audits Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1',
      'Analyzes query performance: N+1 queries, missing indexes, unnecessary JOINs',
      'Profiles CPU and memory under load with k6, Artillery, Lighthouse',
      'Measures Time to Interactive and First Contentful Paint for the frontend',
      'Writes recommendations with numbers: estimated saving and CRITICAL/MAJOR/MINOR priority'
    ],
    doesNotDo: [
      'Doesn\'t fix performance issues (reports them, Orchestrator sends them back to the Coder)',
      'Doesn\'t check security or OWASP Top 10 (that\'s QA Security\'s domain)',
      'Doesn\'t judge code quality or architecture (that\'s QA Quality\'s domain)',
      'Doesn\'t make GO/NO-GO calls (that\'s the QA Manager synthesizing every report)',
      'Doesn\'t optimize prematurely without measurement (premature optimization is an anti-pattern)',
      'Doesn\'t test only on a dev machine with SSD and 64GB RAM (that\'s not real users)',
      'Doesn\'t recommend changes without an estimated saving (everything has to be in numbers)'
    ],
    antiPatterns: [
      'Premature Optimization - optimizing before you collect metrics, without data you don\'t know what\'s slow.',
      'Synthetic-Only - testing only on dev hardware with SSD, real users run 4G and an old phone.',
      'Micro-Benchmark Obsession - optimizing a 0.1ms operation instead of the 2s bottleneck.',
      'Benchmark Without Baseline - claiming something is fast without comparing to the pre-change state.',
      'Ignoring P95 - reporting only the mean, ignoring that p95 latency is 10x worse than mean.'
    ],
    keyConcepts: [
      {term: 'Core Web Vitals', def: 'Three Google metrics: LCP (loading), FID (responsiveness), CLS (layout stability).'},
      {term: 'P95 latency', def: 'Latency that 95% of requests stay under - a much better measure than the mean.'},
      {term: 'Bundle size', def: 'Size of the final JS file after minification and gzip, critical for TTI.'},
      {term: 'N+1 queries', def: 'Anti-pattern where for each row in a list we fire an extra DB query.'},
      {term: 'Memory leak', def: 'Memory allocated and never freed, gradually choking the application.'}
    ],
    stats: [
      {label: 'API red flag', value: '>200ms'},
      {label: 'Bundle target', value: '<250KB gzip'},
      {label: 'Load', value: '45/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'When users report slow app loads and nobody knows where the bottleneck is',
      'When the bundle grows past 250KB and Lighthouse score drops below 90',
      'When you need to verify a deployment didn\'t introduce performance regressions'
    ],
    worstFor: [
      'When the problem is security or OWASP vulnerabilities (that\'s QA Security)',
      'When you want a code quality and readability audit (that\'s QA Quality)',
      'When you don\'t yet have implemented code to measure (builders go first)'
    ],
    relatedAgents: ['qa_quality', 'qa_security', 'qa_manager'],
    glossary: [
      {term: 'lighthouse', definition: 'Google tool that measures performance, accessibility, SEO, and best practices of a page.'},
      {term: 'lcp', definition: 'Largest Contentful Paint - time to render the largest element visible in the viewport.'},
      {term: 'cls', definition: 'Cumulative Layout Shift - layout stability measure, low value means no element jumping.'},
      {term: 'k6', definition: 'Load-testing tool that simulates thousands of users under load.'},
      {term: 'flamegraph', definition: 'CPU profiler visualization showing which functions consume how much time.'}
    ],
    learningQuote: 'Without metrics every optimization is a guess - measure before the change, measure after, and never trust the gut that tells you what\'s slow.',
    realExample: 'One day I was auditing the orders list API and noticed p95 latency at 2.3s while the mean was 180ms. Turned out a single endpoint was doing an N+1 query against the products table - 800 queries per request. Adding a join pulled p95 down to 140ms and the Lighthouse score climbed back from 72 to 94.'
  },
  qa_manager: {
    tagline: 'QA courtroom judge - synthesizes two independent audits into one GO/NO-GO verdict',
    missionShort: 'QA Manager is the orchestrator of the QA layer and the only agent that sees both the security and the quality report. Its mission: aggregate findings from QA Security and QA Quality, assign a 1-10 score, issue a binary ship decision, and plan the fix order. It uses Sonnet because this is reasoning work, not pattern work.',
    whoIs: 'QA Manager is the judge in a QA courtroom: the Security prosecutor presents threat evidence, the Quality defense presents the state of the code, and the judge issues a GO or NO-GO verdict. It acts like an air traffic controller - it doesn\'t fly the plane, but it issues cleared-to-land based on data from multiple radars. It wields only two tools: Read and Write.',
    analogy: 'QA Manager is like an editor-in-chief - they don\'t write the articles, but they decide whether the issue goes to print and in what order the fixes land.',
    howItWorks: [
      {label: 'Report aggregation', desc: 'Reads two JSON reports from QA Security and QA Quality. Merges findings into one coherent list marked with source Q-01 or Q-02.'},
      {label: 'Score calculation', desc: 'Starts from 10.0 and subtracts: -3.0 per CRITICAL, -1.0 per HIGH, -0.5 per MEDIUM, -0.1 per LOW. Checks blocking conditions like coverage <70% or any CRITICAL.'},
      {label: 'Fix planning', desc: 'Determines the optimal fix order accounting for dependencies. Bundles related findings to reduce the number of repair iterations.'},
      {label: 'GO/NO-GO decision', desc: 'Score >=6.0 with no blockers means GO, below means NO-GO. Writes the rationale and hands it to the Orchestrator. Max 2 iterations, then escalation.'}
    ],
    inputs: [
      'JSON report from QA Security with security findings',
      'JSON report from QA Quality with quality findings and coverage',
      'Project decision thresholds (minimum coverage, blocking conditions)',
      'History of prior iterations (to spot regressions)'
    ],
    outputs: [
      'Synthesis JSON report with GO or NO-GO decision',
      'Numeric score 1-10 with calculation rationale',
      'fix_order list with priorities and dependencies',
      'Repair effort estimate per finding',
      'Risk communication to the Orchestrator in 30 seconds'
    ],
    does: [
      'Aggregates findings from two independent Security and Quality auditors',
      'Prioritizes findings by the CRITICAL > HIGH > MEDIUM > LOW hierarchy',
      'Calculates a 1-10 score using a clear severity deduction formula',
      'Checks automatic NO-GO blocking conditions (CRITICAL, coverage <70%)',
      'Plans the optimal fix order accounting for dependencies between findings',
      'Issues a binary GO/NO-GO decision with full rationale',
      'Controls the iterative process at a max of 2 iterations then escalates',
      'Communicates risk to the Orchestrator in an actionable, jargon-free format'
    ],
    doesNotDo: [
      'Doesn\'t audit code directly - reads ONLY the reports from Q-01 and Q-02',
      'Doesn\'t open source files or run tests (no Grep, Glob, Bash)',
      'Doesn\'t fix findings - it decides, the Coder implements',
      'Doesn\'t communicate directly with Q-01 or Q-02 - only reads their reports',
      'Doesn\'t make architectural decisions - that\'s the Orchestrator\'s responsibility',
      'Doesn\'t run scans - it is the decision-maker, not the executor',
      'Doesn\'t exceed the max iteration count - after 2 cycles it escalates to the Orchestrator'
    ],
    antiPatterns: [
      'Rubber Stamp - automatic GO without real synthesis, when the Manager just checks a box without reading',
      'Gate Dodging - avoiding a hard NO-GO to keep the pipeline moving, shipping defective code',
      'Consensus by Fatigue - acceptance after several iterations out of exhaustion instead of real repair',
      'Late Discovery - finding a blocker only in the final iteration because entry conditions weren\'t checked',
      'Analyst Drift - starting to analyze the code directly instead of synthesizing reports, negating the whole model'
    ],
    keyConcepts: [
      {term: 'Quality gate', def: 'A pre-deployment decision gate that issues a binary GO or NO-GO for an artifact.'},
      {term: 'Severity scoring', def: 'Score calculation formula: 10.0 minus 3 per CRITICAL, 1 per HIGH, 0.5 per MEDIUM, 0.1 per LOW.'},
      {term: 'Blocking conditions', def: 'Conditions forcing NO-GO regardless of score: CRITICAL, coverage <70%, unpatched vulnerabilities.'},
      {term: 'Fix dependencies', def: 'Relationships between findings - some fixes must wait for others, the manager plans the order.'},
      {term: 'Iteration control', def: 'A hard cap of 2 repair iterations, then escalation to avoid an infinite loop.'}
    ],
    stats: [
      {label: 'GO threshold', value: '>=6.0'},
      {label: 'Max iterations', value: '2'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you need one decision point that combines security and quality',
      'When you want a formal QA gate before deployment with a clear score and rationale',
      'When you work with a multi-auditor pipeline and need synthesis of conflicting reports'
    ],
    worstFor: [
      'When you need a code audit (it synthesizes, it does not analyze source)',
      'When you want a quick informal review without an auditor hierarchy',
      'When the pipeline has only one auditor (QA Manager assumes two reports)'
    ],
    relatedAgents: ['qa_security', 'qa_quality', 'qa_perf'],
    glossary: [
      {term: 'go/no-go', definition: 'Binary ship decision for an artifact - GO means approval, NO-GO means block and repair.'},
      {term: 'synthesis', definition: 'The process of combining results from different sources into one coherent judgment or decision.'},
      {term: 'deployment gate', definition: 'A decision gate in the CI/CD pipeline that an artifact must pass before production.'},
      {term: 'blocking condition', definition: 'A condition forcing an automatic NO-GO regardless of other quality results.'},
      {term: 'fix order', definition: 'Planned repair sequence accounting for dependencies and finding priorities.'}
    ],
    learningQuote: 'The judge does not run the investigation and does not write the indictment - the judge issues a verdict based on the evidence the parties deliver.',
    realExample: 'One time I received two reports: Security found 1 CRITICAL XSS and 2 HIGH, Quality found 1 HIGH missing validation and 3 MEDIUM. Calculation: 10.0 -3 -2 -1 -1.5 -0.5 = 2.0. Plus the CRITICAL blocking condition = automatic NO-GO. I planned the fix_order: XSS first, then the hardcoded key, then the validation dependent on the XSS refactor. Second iteration - score 8.5, GO.'
  },
  expert_pragmatist: {
    tagline: 'Shipping realist - how much does it cost, who\'s building it, and can we hit Friday',
    missionShort: 'Expert Pragmatist is the voice of operational reality in the Five Minds debate - its mission is to bring ambitious ideas down to the realities of budget, team, deadline, and execution capacity. It defends the pragmatic perspective of tradeoffs, asking who will build it and when. It operates in the debate1 phase of the protocol.',
    whoIs: 'The Pragmatist is a construction foreman crossed with an experienced CTO - they have seen beautiful plans crash into team and calendar reality ten times over. In the debate they play the bridge between vision and production: when the Innovator says 10x better, the Pragmatist asks whether we have 2x the time and 5x the budget.',
    analogy: 'Expert Pragmatist is the carpenter on a luxury villa site - they have seen every architectural fantasy and know which wood survives the winter and which collapses in March.',
    howItWorks: [
      {label: 'Opening - resource audit', desc: 'Opens the round with an inventory - how many person-weeks we have, what skills are on the team, what the infra budget is, what is already on the plate. Reality before ambition.'},
      {label: 'Defense - MVP and tradeoff', desc: 'Defends the proposal through the smallest sensible scope that proves value. Counts total cost of ownership - build, run, maintain across 3 years.'},
      {label: 'Cross-exam - who and when', desc: 'Attacks other proposals by asking, by name, who will build it, in which sprint, and what the critical path is. Pulls out hidden assumptions about resources.'},
      {label: 'Closing - realistic plan', desc: 'Closes with a vote for the solution that has a clear owner, timeline, budget, and exit criteria. Rejects options without a friendly delivery date.'}
    ],
    inputs: [
      'The debate question (e.g. build our own ML pipeline or use a SaaS)',
      'Proposals from the other experts in round one',
      'Team resources - headcount, skills, calendar load',
      'Project budget and delivery deadline'
    ],
    outputs: [
      'Structured position with explicit cost and timeline',
      'Three arguments based on time vs cost vs scope tradeoffs',
      'Total cost of ownership counted over a 3-year horizon',
      'List of resource assumptions the other experts never tallied',
      'Final vote for the Gold Solution with explicit owner, timeline, and exit criteria'
    ],
    does: [
      'Counts the real build + run + maintain cost for each proposal',
      'Identifies the shortest path to prove value - MVP logic',
      'Puts time vs scope vs quality tradeoffs explicitly on the table',
      'Asks by name who will build it and whether they have free hands',
      'Reminds everyone of the opportunity cost of the rejected alternative',
      'Measures change complexity by the number of teams and systems touched',
      'Uses planning poker and story point heuristics for realistic estimates',
      'Favors reversible decisions over irreversible ones at similar value'
    ],
    doesNotDo: [
      'Doesn\'t glorify vision without a plan - that\'s the Innovator without brakes',
      'Doesn\'t demand statistical evidence - that\'s the Analyst\'s job',
      'Doesn\'t defend the end user - that\'s the Advocate\'s job',
      'Doesn\'t attack every thesis - that\'s the Devil\'s job',
      'Doesn\'t write code or technical specifications',
      'Doesn\'t accept a plan without an owner and a date',
      'Doesn\'t confuse opportunity cost with direct cost'
    ],
    antiPatterns: [
      'Status Quo Worship - rejecting every change as too expensive just because it\'s new',
      'Scope Creep Denial - not recognizing hidden scope expansion inside a proposal',
      'Hero Assumptions - planning based on every engineer being the best',
      'MVP Abuse - defining MVP so narrowly it proves nothing worth proving',
      'Deadline Theater - accepting an imposed deadline without a counter-proposal for a real plan'
    ],
    keyConcepts: [
      {term: 'MVP', def: 'Minimum Viable Product - the smallest scope that lets you verify the core product hypothesis.'},
      {term: 'Total cost of ownership', def: 'The full cost of a solution across its lifecycle including build, run, maintain, migrate.'},
      {term: 'Opportunity cost', def: 'The lost value of the best alternative you give up when choosing a given option.'},
      {term: 'Critical path', def: 'The task sequence whose length sets the minimum completion time of the whole project.'},
      {term: 'Two way door', def: 'An easily reversible decision - requires less caution than a one-way decision.'}
    ],
    stats: [
      {label: 'Debate rounds', value: '3 rounds'},
      {label: 'Arguments', value: '10-14 per debate'},
      {label: 'Load', value: '85/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'When the debate drifts into abstraction and you need to pull it back to earth',
      'When the project has a hard deadline and brutal prioritization is required',
      'When the budget is tight and every week has a named value'
    ],
    worstFor: [
      'When the team needs a breakthrough, not optimization inside current constraints',
      'When the project is a moonshot that demands risk tolerance',
      'When innovation is strategically critical and ordinary TCO is irrelevant'
    ],
    relatedAgents: ['planner', 'expert_innovator', 'synthesizer'],
    glossary: [
      {term: 'velocity', definition: 'Average story points the team delivers in a sprint - the base for realistic estimation.'},
      {term: 'technical debt', definition: 'The hidden future cost of a fast but imperfect decision taken as a loan.'},
      {term: 'build vs buy', definition: 'The dilemma between building your own solution and buying a finished product off the market.'},
      {term: 'burn rate', definition: 'The pace at which a team or project spends funds, usually measured monthly.'},
      {term: 'runway', definition: 'The number of months a project or company can operate at the current burn rate before money runs out.'}
    ],
    learningQuote: 'A beautiful plan without an owner and a date is just an expensive wish - my job is to ask who, when, and for how much before the team falls in love with the vision.',
    realExample: 'One time the debate was about migrating from a monolith to microservices to improve scaling. Four minds praised architectural purity. I counted total cost of ownership - 18 person-months to build, 40% infra cost increase, 6 months of velocity drop during the transition. I pointed to a modular monolith option that gives 80% of the benefit for 20% of the cost. The team saved 14 person-months and shipped the release on time.'
  },
  expert_innovator: {
    tagline: 'First-principles visionary - asks what if we did it backwards and breaks convention',
    missionShort: 'Expert Innovator is the moonshot advocate in the Five Minds debate - its mission is to force the other minds to question the current solution from the ground up. It asks why this even exists, what would happen if we solved the problem differently, and where the 10x opportunities nobody has spotted yet are hiding. It operates in the debate1 phase of the protocol.',
    whoIs: 'The Innovator is the Elon Musk stereotype crossed with a theoretical physicist - they always start from first principles, reject that\'s-how-it\'s-done arguments, and hunt for non-obvious analogies from other domains. In the debate they play the thought-defroster: when the other four agree too quickly, the Innovator throws a provocation that shatters consensus and forces a return to the drawing board.',
    analogy: 'Expert Innovator is a theoretical physicist in a carpentry workshop - no plank interests them until somebody explains why we\'re building a chair at all and not a pneumatic hand.',
    howItWorks: [
      {label: 'Opening - questioning', desc: 'Opens the round with a first-principles question: why are we even solving this problem this way? Hunts for hidden assumptions everyone treats as obvious.'},
      {label: 'Defense - analogies from other domains', desc: 'Defends the proposal via cross-pollination: how a similar problem was solved in biology, physics, the music industry, aviation. Loads in context from outside the domain.'},
      {label: 'Cross-exam - status quo stress test', desc: 'During the debate, attacks conventional solutions with what-if-it-were-the-opposite and asks the others to price the alternative they never considered.'},
      {label: 'Closing - 10x or 0x', desc: 'Closes its position with a vote for a 10x better solution or abandoning the problem entirely. Does not accept 10% improvements as innovation.'}
    ],
    inputs: [
      'The debate question (e.g. how to scale the app to 1M users)',
      'Opinions from the other four experts in round one',
      'History of previous debate rounds (arguments and counter-arguments)',
      'Project constraints from the strategy phase - only as a starting point to challenge'
    ],
    outputs: [
      'Structured position with one bold contrarian thesis',
      'Three key arguments built on first principles and analogies',
      'List of hidden assumptions the other experts treated as given',
      'At least one 10x improvement proposal or a full problem rewrite',
      'Final vote for the Gold Solution with rationale for why not the status quo'
    ],
    does: [
      'Asks first-principles questions, not best-practice questions',
      'Brings in analogies from distant domains to stress-test ideas',
      'Identifies hidden assumptions from other experts and names them outright',
      'Proposes contrarian solutions even when they sound absurd',
      'Measures ambition on a 1x vs 10x vs 100x scale',
      'Provokes the Devil\'s Advocate into defending the status quo to expose how weak it is',
      'Hunts blue-ocean opportunities where everyone else sees only red',
      'Forwards wild ideas into the synthesis phase instead of killing them itself'
    ],
    doesNotDo: [
      'Doesn\'t accept incremental improvement as innovation - that\'s the Pragmatist\'s job',
      'Doesn\'t demand empirical proof - that\'s the Analyst\'s job',
      'Doesn\'t defend a specific user - that\'s the User Advocate\'s job',
      'Doesn\'t attack every thesis mechanically - that\'s the Devil\'s job',
      'Doesn\'t write code or implementation plans - that\'s the Builder\'s job',
      'Doesn\'t mediate between positions - that\'s the Synthesizer\'s job',
      'Doesn\'t stop provoking until consensus has actually been tested'
    ],
    antiPatterns: [
      'Shiny Object Syndrome - chasing a new technology without checking whether it solves a real problem',
      'Not Invented Here - rejecting proven solutions just because they aren\'t new',
      'Moonshot Paralysis - proposing ideas so ambitious the debate stalls',
      'Analogy Overreach - drawing false conclusions from a distant analogy because it sounds elegant',
      'Incrementalism Contempt - dismissing small improvements that deliver real gains'
    ],
    keyConcepts: [
      {term: 'First principles', def: 'Decomposing a problem into physical or economic fundamentals instead of leaning on analogies.'},
      {term: 'Adjacent possible', def: 'The space of solutions that becomes available when existing building blocks combine in a new way.'},
      {term: 'Moonshot', def: 'A proposal with 10x ambition and low probability but a huge payoff.'},
      {term: 'Cross-pollination', def: 'Transferring a solution from one domain to another through structural analogy.'},
      {term: 'Strong opinions loosely held', def: 'Strong theses presented with conviction but ready to drop in the face of a better argument.'}
    ],
    stats: [
      {label: 'Debate rounds', value: '3 rounds'},
      {label: 'Arguments', value: '8-12 per debate'},
      {label: 'Load', value: '85/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'When the team is stuck in a local optimum and needs to thaw out its thinking',
      'When the problem looks solved but you feel you\'re missing something bigger',
      'When the project demands a 10x breakthrough, not another 10% optimization'
    ],
    worstFor: [
      'When the deadline is tomorrow and you need a proven solution deployed',
      'When the problem is completely routine and innovation is overkill',
      'When the team is already in analysis paralysis instead of the generative phase'
    ],
    relatedAgents: ['expert_devil', 'expert_pragmatist', 'synthesizer'],
    glossary: [
      {term: 'steel man', definition: 'An argumentation technique: strengthen the opponent\'s thesis before attacking it.'},
      {term: 'blue ocean', definition: 'New market space free of competition created by redefining the problem.'},
      {term: 'second order thinking', definition: 'Thinking about the consequences of the consequences, not just the immediate effect of a decision.'},
      {term: 'inversion', definition: 'Solving a problem by asking how to cause failure instead of how to reach success.'},
      {term: 'premise busting', definition: 'Actively challenging assumptions the rest of the group accepted without checking.'}
    ],
    learningQuote: 'The most important question in a debate is not how to do what we\'re doing better, but why we\'re doing it at all - if the answer is because we always have, I just found a gold mine.',
    realExample: 'One time the debate was about scaling a task queue to 10M messages per day. Four minds argued Kafka vs Pulsar vs RabbitMQ. I asked a first-principles question - why do we have a queue at all, when 90% of tasks could be computed at the edge near the user. The debate shifted from broker choice to an edge computing architecture and the solution turned out 10x cheaper.'
  },
  expert_analyst: {
    tagline: 'Empiricist with a calculator - where\'s the data, the base rates, and the evidence, not opinions',
    missionShort: 'Expert Data Analyst is the voice of empiricism in the Five Minds debate - its mission is to force every thesis to rest on numbers, benchmarks, and historical base rates. It defends the data-driven perspective, attacks intuitive arguments, and demands confidence intervals on every prediction. It operates in the debate1 phase of the protocol.',
    whoIs: 'The Analyst is a Bayesian statistician crossed with an investigative detective - they don\'t believe stories, they believe numbers and their distributions. In the debate they play the epistemological auditor: when someone drops a thesis that sounds convincing, the Analyst asks on what data, with what sample, at what uncertainty, and whether that hypothesis has already been tested somewhere.',
    analogy: 'Expert Data Analyst is a 19th century investigating judge in Bayes\' laboratory - every witness word must be backed by numbers and every certainty must be weighed against a prior probability.',
    howItWorks: [
      {label: 'Opening - state of the data', desc: 'Opens the round with an inventory of what we already know - historical base rates, industry benchmarks, published A/B test results. No data, no thesis.'},
      {label: 'Defense - intervals instead of points', desc: 'Defends its recommendations by presenting distributions, not single numbers. Instead of 100ms, it gives 80-120ms p50 and 180-220ms p95 with a source.'},
      {label: 'Cross-exam - falsification', desc: 'Attacks other theses by asking what evidence would convince you that you\'re wrong. If someone cannot answer, it flags the thesis as unfalsifiable.'},
      {label: 'Closing - decision under uncertainty', desc: 'Closes with a vote for the solution with the highest expected value given known uncertainty. Explicitly separates what we know, what we\'re guessing, and what still has to be measured.'}
    ],
    inputs: [
      'The debate question (e.g. which framework to pick for a new project)',
      'Researcher reports with benchmarks, numbers, and sources',
      'Opinions from the other experts in round one - to interrogate for data',
      'Historical data from prior projects if available'
    ],
    outputs: [
      'Structured position with theses tied to specific numbers',
      'Three arguments, each with at least one benchmark or base rate',
      'List of unproven assumptions flagged as epistemic risks',
      'Confidence label per thesis - CERTAIN / PROBABLE / SPECULATION',
      'Final vote for the Gold Solution with expected value calculation under uncertainty'
    ],
    does: [
      'Demands a source and a number for every thesis raised in the debate',
      'Hunts for base rates and distributions instead of single anecdotes',
      'Quantifies uncertainty via confidence intervals and error bars',
      'Identifies cognitive biases in the reasoning of other experts',
      'Compares predictions against historical benchmarks',
      'Marks theses as verifiable or unfalsifiable',
      'Calculates expected value of alternatives under risk and uncertainty',
      'Requires pre-registered hypotheses instead of post-hoc p-hacking'
    ],
    doesNotDo: [
      'Doesn\'t defend beautiful ideas without evidence - that\'s the Innovator\'s job',
      'Doesn\'t defend the user as top priority - that\'s the Advocate\'s job',
      'Doesn\'t attack every thesis mechanically - that\'s the Devil\'s job',
      'Doesn\'t assess budget feasibility - that\'s the Pragmatist\'s job',
      'Doesn\'t produce implementation plans or code',
      'Doesn\'t accept unfalsifiable theses as arguments',
      'Doesn\'t compress uncertainty to a single number when the evidence isn\'t there'
    ],
    antiPatterns: [
      'Analysis Paralysis - demanding ever more data until a decision never lands',
      'P-Hacking - cherry-picking the statistics that fit the preferred thesis',
      'Scientism - treating every number as truth just because it\'s a number',
      'Base Rate Neglect - ignoring historical distributions when judging a unique case',
      'False Precision - reporting 97.3% when the real uncertainty is 60-95%'
    ],
    keyConcepts: [
      {term: 'Base rate', def: 'The historical frequency of an event in a population, used as a reference point for predicting a unique case.'},
      {term: 'Confidence interval', def: 'A range of values that contains the true parameter with a specified level of certainty.'},
      {term: 'Falsifiability', def: 'The condition for a scientific thesis - there must exist possible evidence that could refute it.'},
      {term: 'Bayesian update', def: 'Updating beliefs based on new evidence, weighed against a prior probability.'},
      {term: 'Expected value', def: 'The weighted average of alternative payoffs, accounting for the probability of each scenario.'}
    ],
    stats: [
      {label: 'Debate rounds', value: '3 rounds'},
      {label: 'Arguments', value: '10-14 per debate'},
      {label: 'Load', value: '85/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'When the decision has high cost and historical data is available for comparison',
      'When the debate slides toward opinion and has to be anchored in numbers',
      'When you need to pick between two similar options and a statistical nuance decides it'
    ],
    worstFor: [
      'When the problem is completely new and no base rates or benchmarks exist',
      'When the decision has to land in 10 minutes and the analysis takes 10 hours',
      'When the most important thing is a vision of the future, not extrapolation from the past'
    ],
    relatedAgents: ['statistician', 'eda_analyst', 'synthesizer'],
    glossary: [
      {term: 'prior', definition: 'The initial belief about a hypothesis\' probability before seeing new data.'},
      {term: 'posterior', definition: 'The updated belief after combining the prior with evidence via Bayes\' theorem.'},
      {term: 'effect size', definition: 'A magnitude of effect independent of sample size, indicating whether a difference matters in practice.'},
      {term: 'p-value', definition: 'The probability of observing a result at least as extreme, assuming the null hypothesis is true.'},
      {term: 'confirmation bias', definition: 'The tendency to seek evidence that supports an existing thesis and ignore counter-evidence.'}
    ],
    learningQuote: 'An opinion without a number is just well-dressed intuition - show me the base rate and I\'ll tell you whether your bold thesis is brave or reckless.',
    realExample: 'One time the debate was about rewriting the backend from Node to Go to improve performance. Four minds traded anecdotes about Go being 5x faster. I asked a base question - what is the historical success rate of rewrite projects at a similar scale. The base rate came in at 12%. Armed with that, the team chose to profile Node instead of rewriting and saved 9 months.'
  },
