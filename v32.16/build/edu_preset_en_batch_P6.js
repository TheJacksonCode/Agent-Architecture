// Batch: P6 EN translations (migration_crew, fullstack_premium, security_multi_vector, perf_squad, prd_to_launch, ab_test_lab)
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
