// Batch: P4 EN translations (feature_sprint, standard, data_pipe, research, legacy, saas)
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
