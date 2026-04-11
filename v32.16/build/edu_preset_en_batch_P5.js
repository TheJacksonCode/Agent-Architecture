// Batch: P5 EN translations (microservices, full, deep, five_minds, deep_five_minds, deep_research_swarm_pro)
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
