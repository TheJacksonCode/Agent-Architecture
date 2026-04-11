// Batch: A6 EN translations (expert_user, expert_devil, decision_presenter, db_architect, observability_engineer)
  expert_user: {
    tagline: 'Human advocate inside the machine - defends empathy when everyone else talks systems',
    missionShort: 'The User Advocate is the voice of empathy in the Five Minds debate. Its mission is to make sure every architectural decision gets translated into real end-user experience. It represents users who are not at the table: elderly, blind, mobile-only, slow-internet. Runs in debate1 phase of the protocol.',
    whoIs: 'The User Advocate is a therapist crossed with an ethnographer. It understands both the frustration of Maria from Kielce and the fear of Pawel who has never used a banking app. In debate it plays the conscience: when engineers and analysts argue about TPS and p99, it reminds the room that on the other end is a human who just wants to scan a receipt.',
    analogy: 'The User Advocate is like a couples therapist at an engineering conference - the only person in the room still asking what the people on the receiving end of these systems actually feel.',
    howItWorks: [
      {label: 'Opening - user journey', desc: 'Opens the round with a concrete journey. Picks Maria, 58, on a 3G phone, and walks her through the proposed flow. Surfaces every friction point.'},
      {label: 'Defense - persona and emotion', desc: 'Defends its recommendation by telling the story of a specific persona - her goals, frustrations, emotional context. Always ties numbers to faces.'},
      {label: 'Cross-exam - accessibility test', desc: 'Attacks other proposals by asking how it sounds on a screen reader, how it behaves on 3G, what a low-vision user, a child, or a senior does. Pulls hidden exclusions into the light.'},
      {label: 'Closing - measurable empathy', desc: 'Closes by voting for the option that can be measured with user metrics: SUS score, task success rate, WCAG AA, time to first click.'}
    ],
    inputs: [
      'The debate question (e.g. how to simplify the signup flow)',
      'UX researcher reports with personas and journey maps',
      'Positions from the other experts to translate into human impact',
      'Existing user data: NPS, tickets, session recordings'
    ],
    outputs: [
      'A structured position grounded in at least two personas',
      'Three arguments, each with a journey example and emotional context',
      'A list of hidden user groups excluded by other proposals',
      'WCAG 2.2 acceptance criteria and measurable user metrics',
      'A final vote for the Gold Solution with expected impact on SUS and task success'
    ],
    does: [
      'Builds and defends personas that represent real product users',
      'Walks through every flow through the eyes of a specific person with her constraints',
      'Detects hidden exclusions: ageism, ableism, bandwidth privilege',
      'Ties every technical decision to a concrete emotional impact',
      'Requires WCAG 2.2 AA as the floor, not a bonus',
      'Measures success with user metrics, not just technical ones',
      'Hunts for invisible groups the rest of the team does not represent',
      'Translates abstract system decisions into the language of an everyday user'
    ],
    doesNotDo: [
      'Does not defend a technical vision - that is the Innovator\'s job',
      'Does not demand statistical proof - that is the Analyst\'s job',
      'Does not judge cost and deadlines - that is the Pragmatist\'s job',
      'Does not attack every thesis - that is the Devil\'s job',
      'Does not write code or technical specs',
      'Does not ignore user-vs-business conflict - names it out loud',
      'Does not accept that asking one user is enough - does not guess the rest'
    ],
    antiPatterns: [
      'User Worship - ignoring real business constraints in the name of a mythical user',
      'Persona Fiction - inventing personas without field research to back a thesis',
      'Accessibility Theater - declaring WCAG compliance without testing with assistive tools',
      'HiPPO Projection - assuming the rest of the team is a representative user sample',
      'Empathy Fatigue - gradual loss of user contact through excessive persona rituals'
    ],
    keyConcepts: [
      {term: 'Persona', def: 'Archetypal representation of a user group with concrete goals, constraints, and usage context.'},
      {term: 'Jobs to be done', def: 'Framework describing what a user is trying to achieve in life, not how they use a tool.'},
      {term: 'Accessibility first', def: 'Design that starts from extreme accessibility cases and improves the experience for everyone.'},
      {term: 'Emotional journey', def: 'Map of a user\'s emotions along a flow, from frustration to satisfaction or the reverse.'},
      {term: 'Cognitive load', def: 'Amount of working memory required to complete a task - minimizing it is the core of good UX.'}
    ],
    stats: [
      {label: 'Debate rounds', value: '3 rounds'},
      {label: 'Arguments', value: '8-12 per debate'},
      {label: 'Load', value: '80/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'When the team has optimized technical metrics but users are starting to churn',
      'When the project touches sensitive groups - seniors, children, people with disabilities',
      'When a new feature complicates the flow for internal team convenience'
    ],
    worstFor: [
      'When the problem is purely backend with no direct user interaction',
      'When the debate is about dev tooling - the user is not the customer',
      'When the debate has to close fast and persona analysis takes two days'
    ],
    relatedAgents: ['res_ux', 'designer', 'synthesizer'],
    glossary: [
      {term: 'SUS score', definition: 'System Usability Scale - standard 10-question survey rating usability from 0 to 100.'},
      {term: 'WCAG', definition: 'Web Content Accessibility Guidelines - international standard for web content accessibility.'},
      {term: 'task success', definition: 'Percentage of users who complete a task without help within the expected time.'},
      {term: 'friction', definition: 'Any element in a flow that slows down or frustrates a user trying to reach their goal.'},
      {term: 'dark pattern', definition: 'A UI element designed to manipulate users into actions that are not in their interest.'}
    ],
    learningQuote: 'Every technical metric has the face of a real person on the other side - my job is to remember that person while everyone else stares at the charts.',
    realExample: 'Imagine that the debate was about trimming signup from 8 fields to 3 via automatic lookup from a national ID. Four minds praised the efficiency. I introduced the persona of Maria, 67, who is terrified of typing her national ID online. I proposed an optional manual flow. Task success for seniors rose 34 percent and first-day churn dropped 18 percent.'
  },
  expert_devil: {
    tagline: 'Devil\'s advocate with no loyalty - attacks every consensus and hunts hidden failure',
    missionShort: 'The Shadow Expert is the structural opponent in the Five Minds debate. Its mission is to challenge every thesis, find gaps in reasoning, and stress-test consensus before it gets approved. It has no domain loyalty and will attack even the Innovator if the debate needs strengthening through destruction. Runs in debate1 phase of the protocol.',
    whoIs: 'The Shadow is an investigative prosecutor crossed with a cyber red team. It is the only expert that defends no position. Its role is intentionally adversarial: when the other four minds start agreeing, it walks in asking what could go wrong and drags hidden failure vectors into the open. This is the role of a hired paranoid, in service of the team.',
    analogy: 'The Shadow Expert is like an investigative prosecutor at its own trial - attacking every witness on purpose, including its own client, because that is the only way to surface the truths nobody else wants to hear.',
    howItWorks: [
      {label: 'Opening - pre-mortem', desc: 'Opens the round by imagining the project has already failed. Builds a retrospective from the future describing every way it could have gone wrong.'},
      {label: 'Defense - no own thesis', desc: 'Does not defend its own proposal - its position is permanent opposition. It defends the right to attack and demands logical defense from the others.'},
      {label: 'Cross-exam - steel manning', desc: 'Attacks the strongest version of the other side\'s argument, not a strawman. Reverses the reasoning and asks what evidence would change the author\'s mind.'},
      {label: 'Closing - conditional GO', desc: 'Closes with a conditional vote - never a full YES, always YES on the condition that failure vectors X, Y, Z are resolved.'}
    ],
    inputs: [
      'The debate question (e.g. should we ship the feature on Friday evening)',
      'Proposals from the other four experts in round one',
      'Emerging consensus from round two - the primary attack target',
      'History of incidents and post-mortems from previous projects'
    ],
    outputs: [
      'A list of failure vectors ordered by likelihood and blast radius',
      'A steel-manned version of each expert\'s thesis before the attack',
      'A pre-mortem describing concrete failure scenarios',
      'Acceptance conditions (GO if X, Y, Z) - never an unconditional YES',
      'A final vote that explicitly challenges the Gold Solution even if overruled'
    ],
    does: [
      'Attacks the strongest version of arguments, not easy strawmen',
      'Runs a pre-mortem from the perspective of a project that has already failed',
      'Identifies hidden assumptions nobody thought to question',
      'Hunts rare but catastrophic failure vectors',
      'Demands that each expert name the conditions under which they would change their mind',
      'Surfaces conflicts of interest and motivations behind theses',
      'Recalls historical failures with a similar signature',
      'Forces conditional acceptance instead of unconditional agreement'
    ],
    doesNotDo: [
      'Does not defend any concrete solution - no domain loyalty',
      'Does not look for compromise - that is the Synthesizer\'s job',
      'Does not glorify innovation - that is the Innovator\'s job',
      'Does not demand empirical proof - that is the Analyst\'s job',
      'Does not defend the user - that is the Advocate\'s job',
      'Does not back off an attack just because the team is getting impatient',
      'Does not accept that one pre-mortem is enough - keeps asking what else'
    ],
    antiPatterns: [
      'Contrarianism For Its Own Sake - attacking to attack without constructive content',
      'Strawman Fallacy - attacking a weaker version of the argument instead of the strongest',
      'Nihilism Spiral - concluding that every decision has flaws, therefore none is good',
      'Chicken Little - overreacting to low-probability risks',
      'Post-Mortem Tourism - citing every failure in the world without understanding context'
    ],
    keyConcepts: [
      {term: 'Pre-mortem', def: 'Technique of imagining project failure and working backward to the present moment to prevent known traps.'},
      {term: 'Steel man', def: 'Representing an opponent\'s argument in its strongest possible form before attacking it.'},
      {term: 'Red team', def: 'A team hired to attack its own organization to find gaps before an adversary does.'},
      {term: 'Fat tail risk', def: 'Rare events with catastrophic consequences that traditional statistics fail to detect.'},
      {term: 'Black swan', def: 'A low-probability, high-impact event that can only be explained post-hoc.'}
    ],
    stats: [
      {label: 'Debate rounds', value: '3 rounds'},
      {label: 'Arguments', value: '12-16 per debate'},
      {label: 'Load', value: '90/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'When the team reached consensus too fast and you suspect groupthink',
      'When the cost of failure is high - production, security, finance',
      'When a plan needs stress-testing before a costly investment'
    ],
    worstFor: [
      'When the team is demoralized and needs support rather than attack',
      'When the decision is low-impact and reversible in 5 minutes',
      'When the time budget does not allow a full pre-mortem'
    ],
    relatedAgents: ['expert_innovator', 'qa_security', 'synthesizer'],
    glossary: [
      {term: 'devil advocate', definition: 'A structural role of deliberately defending the opposing position to strengthen the debate.'},
      {term: 'groupthink', definition: 'The phenomenon where a cohesive team prioritizes harmony over critical evaluation of alternatives.'},
      {term: 'normal accidents', definition: 'Charles Perrow\'s theory of catastrophes arising from unavoidable interactions in complex systems.'},
      {term: 'swiss cheese', definition: 'Safety failure model in which holes in successive defense layers line up in a single path.'},
      {term: 'epistemic humility', definition: 'Acknowledging the limits of your own knowledge and being ready to change your mind in light of evidence.'}
    ],
    learningQuote: 'My loyalty is not to any thesis, only to the truth - and the truth usually hides closest to where the team least wants to look.',
    realExample: 'Imagine that the team was happily planning a release for Friday at 5pm because the feature was simple. I ran a pre-mortem and found that the last three major incidents at the company happened on Fridays with a junior on-call. I forced a conditional GO: ship yes, but Wednesday morning. The rollout went clean, and the Devil was credited in the post-mortem as the reason nothing bad happened.'
  },
  decision_presenter: {
    tagline: 'Neutral Human-in-the-Loop gatekeeper - presents options with no recommendation',
    missionShort: 'The Decision Presenter collects proposals from the previous phase, identifies 2-3 options with their tradeoffs, and presents them to the user impartially. Its mission: give the human control over the pipeline\'s key branch points. It pauses agent work, waits for the decision, and logs the verdict.',
    whoIs: 'The Decision Presenter is the courtroom bailiff agent. It stands between pipeline phases, pauses the other agents\' work, and presents options to the human. It behaves like a neutral debate moderator: never recommends, never favors, just lays out the option cards with pros and cons.',
    analogy: 'The Decision Presenter is like a courtroom bailiff - not the judge and not the prosecutor, just presenting cases next to the bench and waiting for the judge (the human) to deliver the verdict.',
    howItWorks: [
      {label: 'Gather proposals', desc: 'Reads the previous phase output (research, Five Minds debate, build) and extracts 2-3 directions being considered. Each direction has to be meaningfully different, so the choice is real.'},
      {label: 'Format options', desc: 'Lays out A/B/C cards with a standardized structure: title, description, pros, cons, cost, timeline, risks. All cards share an identical form, so none looks visually better.'},
      {label: 'Present with timer', desc: 'Shows the HITL overlay with cards and a 120s timer. The user sees the countdown and can pick an option with a click or wait for the auto-decision.'},
      {label: 'Log and continue', desc: 'Writes the decision to the Dialog Timeline: reaction time, choice, auto vs manual. Resumes the pipeline with the chosen option and stays out of downstream work.'}
    ],
    inputs: [
      'Results from the previous phase (researcher reports, expert debate, prototype)',
      'Predefined decision variants per gate (e.g. stack A/B/C)',
      'Timeout in seconds (default 120s) and the option marked as recommended for auto',
      'Project context (goals, budget, timeline) to display in the header'
    ],
    outputs: [
      'HITL overlay with 2-3 option cards A/B/C and a timer',
      'Human verdict logged to the Dialog Timeline',
      'Metadata: reaction time, auto vs manual, user',
      'Resumed pipeline with the chosen option as input to the next phase',
      'Audit trail that can later be reviewed as decision history'
    ],
    does: [
      'Presents 2-3 decision options as cards with pros/cons and a uniform structure',
      'Manages a 120s timer with visual countdown and progress bar',
      'Auto-decides after timeout by picking the option marked as recommended',
      'Logs every decision (reaction time, choice, auto vs manual) to the Dialog Timeline',
      'Pauses the pipeline between phases, giving the human time to think',
      'Collects previous phase results as context for the user',
      'Acts as an audit trail - every decision has a paper record with rationale',
      'Shows risks and costs of each option on the same visual scale'
    ],
    doesNotDo: [
      'Does not recommend or favor any option (neutrality is the core of the role)',
      'Does not generate options dynamically (options are predefined per decision gate)',
      'Does not block the pipeline permanently (the 120s timeout guarantees continuation)',
      'Does not interfere with agent work (operates between phases, not during)',
      'Does not interpret previous phase results (quotes them exactly as they are)',
      'Does not change options once displayed (user sees a stable set)',
      'Does not talk to other agents except the Orchestrator that calls it'
    ],
    antiPatterns: [
      'Hidden Bias - presenting options where one has a bigger font or better colors, nudging the choice.',
      'Decision Fatigue - too many HITL gates in the pipeline; 3 gates in Deep Five Minds is the sweet spot.',
      'Rubber Stamp - the user always picks the recommended one without reading because options are barely differentiated.',
      'False Choice - options that are practically identical, creating the illusion of choice without a real branch.',
      'No Auto Fallback - no default option when the user is offline, so the pipeline hangs forever.'
    ],
    keyConcepts: [
      {term: 'HITL gate', def: 'A Human-in-the-Loop gate between pipeline phases where a human makes a key decision.'},
      {term: 'Auto-decision', def: 'Safety mechanism that picks the default option after timeout when the user does not respond.'},
      {term: 'Neutral presentation', def: 'The rule that all options share an identical visual format, so none dominates.'},
      {term: 'Audit trail', def: 'Paper record of a decision with timestamp, choice, and rationale for later review.'},
      {term: 'Decision fatigue', def: 'Drop in decision quality when a human has to choose too often - a well-known UX problem.'}
    ],
    stats: [
      {label: 'Timeout', value: '120s'},
      {label: 'Options', value: '2-3'},
      {label: 'Load', value: '30/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'When the pipeline has a key branch point (stack, direction, architecture) that needs domain knowledge',
      'When you want a decision audit trail for compliance or project retrospective',
      'When the project is important enough that auto-deciding without a human would be too risky'
    ],
    worstFor: [
      'When the task is simple and HITL gates only add friction without value',
      'When the user is offline and you cannot wait for a human decision',
      'When the decision is mechanical and can be automated with a deterministic rule'
    ],
    relatedAgents: ['orchestrator', 'expert_devil', 'qa_manager'],
    glossary: [
      {term: 'hitl', definition: 'Human-in-the-Loop - paradigm where a human intervenes at key decision points in the pipeline.'},
      {term: 'timeout', definition: 'Maximum wait time for a user decision, after which the auto-decision kicks in.'},
      {term: 'overlay', definition: 'UI layer rendered over the main interface that pauses background interaction.'},
      {term: 'audit trail', definition: 'Recorded trace of every decision with timestamp and metadata for later inspection.'},
      {term: 'neutrality', definition: 'Principle of impartiality where the presenter never nudges a choice, only shows options.'}
    ],
    learningQuote: 'A neutral presenter is harder than it looks - the smallest nudge in color or option order warps the human\'s decision, which is why every card has to share the same format.',
    realExample: 'Imagine that I was presenting three stack options after the research phase: Next.js, SvelteKit, Astro. Every card had the same font, the same pros/cons layout, the same header. The user picked SvelteKit after 40 seconds, and I logged the decision to the Dialog Timeline as manual with a reaction time of 40.2s.'
  },
  db_architect: {
    tagline: 'Urban planner for data - lays out index highways before query traffic shows up',
    missionShort: 'The Database Architect designs the schema, keys, indexes, constraints, and zero-downtime migration plan. Its mission is to pick the data model (relational, document, columnar) for real query patterns and volume, before the application hits the database in production.',
    whoIs: 'The Database Architect is a transit engineer who draws the road network, intersections, and traffic lights before the first car rolls into the city. It thinks years ahead, because schema migration on a live database is like rebuilding a junction at rush hour.',
    analogy: 'The Database Architect is like an urban planner laying out highways, exits, and signals so that rush hour does not grind the whole city to a halt.',
    howItWorks: [
      {label: 'Domain analysis', desc: 'Identifies entities, relations, cardinalities, and query patterns. Separates transactional OLTP data from analytical OLAP and picks the data model that fits the workload.'},
      {label: 'Schema and keys', desc: 'Designs tables, column types, primary keys, foreign keys, and constraints. Picks normalization, or denormalizes deliberately for read performance.'},
      {label: 'Indexes and partitions', desc: 'Builds indexes for specific queries (covering, partial, functional), defines partitioning and archival strategies. Runs the query plan before deploying.'},
      {label: 'Migration plan', desc: 'Writes zero-downtime migrations with rollback, ordered steps, and maintenance windows. Documents lock risks and backward compatibility.'}
    ],
    inputs: [
      'Domain model and description of application use cases',
      'Estimated data volume, QPS, record size',
      'SLA requirements (read latency, write latency, retention)',
      'Existing schema or database to migrate, if any'
    ],
    outputs: [
      'ERD diagram and full DDL definition (CREATE TABLE, constraints)',
      'List of indexes with rationale per query',
      'Data partitioning and archival strategy',
      'Zero-downtime migration scripts with rollback',
      'Risk report and application contact points'
    ],
    does: [
      'Designs relational and NoSQL schemas against real query patterns',
      'Picks covering and partial indexes that cut query time by orders of magnitude',
      'Builds time-based and hash-based partitioning strategies for large tables',
      'Writes zero-downtime migrations using shadow tables and backfill',
      'Analyzes query plans and catches full scans and missing indexes before deploy',
      'Defines keys, constraints, and triggers that enforce data integrity',
      'Recommends connection pooling, read replicas, and layered caching',
      'Calculates storage budget and forecasts growth for 12-24 months'
    ],
    doesNotDo: [
      'Does not write application code or the ORM layer (that is backend)',
      'Does not design UI for displaying data (that is the designer)',
      'Does not run production migrations without QA manager approval',
      'Does not decide on sensitive data retention without the control mapper',
      'Does not configure server infrastructure or backups (that is ops)',
      'Does not run EDA or statistical modeling (that is eda_analyst)',
      'Does not optimize single queries without the context of the whole workload pattern'
    ],
    antiPatterns: [
      'Index Everything - slapping an index on every column instead of designing for queries',
      'Big Bang Migration - one migration locking tables for hours instead of incremental steps',
      'Premature Denormalization - denormalizing before you know which queries are really hot',
      'Missing Foreign Keys - dropping FKs for write speed at the cost of data integrity',
      'Cargo Cult NoSQL - picking a document database because others do, without analyzing access patterns'
    ],
    keyConcepts: [
      {term: 'Query plan', def: 'Execution plan for a query revealing whether the engine uses an index, full scan, or hash join.'},
      {term: 'Covering index', def: 'An index that contains all columns a query needs, eliminating the table lookup.'},
      {term: 'MVCC', def: 'Multi-version concurrency control - row versioning that allows reads without blocking writes.'},
      {term: 'Zero-downtime migration', def: 'Migration in backward-compatible steps that allows rollback with no application downtime.'},
      {term: 'Lock contention', def: 'Contention for row or table locks that causes write timeouts and slowdowns.'}
    ],
    stats: [
      {label: 'Phase', value: 'BUILD'},
      {label: 'Category', value: 'Data'},
      {label: 'Load', value: '70/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you are starting a new project and have to pick a data model and schema for several years of growth',
      'When you are planning a schema migration on a live database with zero downtime',
      'When the application is slowing down and you need to tell if the problem is in the schema, indexes, or queries'
    ],
    worstFor: [
      'When you just need a quick tweak to a single query in an existing schema',
      'When the problem is in the application layer or cache, and the database is fine',
      'When the decision is only about infrastructure or backups, not the data model'
    ],
    relatedAgents: ['backend', 'eda_analyst', 'qa_perf'],
    glossary: [
      {term: 'covering index', definition: 'An index containing every column in the query, eliminating the extra table read.'},
      {term: 'query plan', definition: 'Output of EXPLAIN showing how the database engine will run a query and use indexes.'},
      {term: 'lock contention', definition: 'Contention between transactions for the same row or table locks, leading to waits and timeouts.'},
      {term: 'WAL', definition: 'Write-ahead log - journal of changes written before table modification for durability and replication.'},
      {term: 'MVCC', definition: 'Multi-version concurrency control - row versioning mechanism enabling concurrent reads and writes.'}
    ],
    learningQuote: 'A good schema is not written on the first request - it is written after you understand which queries will be running a year from now.',
    realExample: 'Imagine that I was designing a schema for an event logging platform with 200 million records per month. Instead of one events table I added monthly partitioning and a covering index on (tenant_id, created_at). Analytical queries dropped from 45 seconds to 200 milliseconds, and archiving old partitions now takes a second instead of hours.'
  },
  observability_engineer: {
    tagline: 'Air traffic controller of the system - three radars: metrics, logs, traces',
    missionShort: 'The Observability Engineer instruments the system across three pillars: metrics, logs, and traces. Its mission is to give the team dashboards and alerts that catch an incident before the customer calls, and pinpoint the root cause in minutes instead of hours.',
    whoIs: 'The Observability Engineer is an air traffic controller with three different radars open at once. Each shows something different - altitude, position, forecast - and the job is to make sure that before anything stops flying, you already know what happened.',
    analogy: 'The Observability Engineer is like an air traffic controller watching three screens at once - each showing a different layer of truth about the system\'s flight.',
    howItWorks: [
      {label: 'Audit the three pillars', desc: 'Reviews what already exists in metrics, logs, and traces. Identifies coverage gaps and blind spots, especially at the boundaries between services.'},
      {label: 'Define SLI and SLO', desc: 'Picks key indicators (latency p99, error rate, traffic, saturation) and sets error budgets. Ties technical goals to business SLA contracts.'},
      {label: 'Instrumentation', desc: 'Adds OpenTelemetry at the key points: request span, DB calls, external APIs. Cares about traceid propagation and low label cardinality.'},
      {label: 'Dashboards and alerts', desc: 'Builds dashboards using golden signals layout and alerts based on error budget burn rate, not raw thresholds. Tunes alarms so they do not generate noise.'}
    ],
    inputs: [
      'System architecture and list of critical user paths',
      'SLA requirements (availability, p99 latency)',
      'Existing observability stack if any',
      'Budget and telemetry retention policy'
    ],
    outputs: [
      'SLI/SLO specification with error budgets',
      'OpenTelemetry instrumentation plan per service',
      'Grafana/Datadog dashboards in golden signals layout',
      'Alert rules based on burn rate (fast/slow)',
      'Runbook for responding to every alert with a link to the dashboard'
    ],
    does: [
      'Defines SLI and SLO against real business goals, not abstract thresholds',
      'Instruments applications with OpenTelemetry without vendor lock-in',
      'Designs dashboards in golden signals layout (latency, traffic, errors, saturation)',
      'Configures alerts on error budget burn rate to cut alarm fatigue',
      'Enforces low label cardinality to prevent metric cost explosions',
      'Propagates traceid across service boundaries to link logs with trace spans',
      'Identifies coverage blind spots, especially at async boundaries',
      'Writes runbooks connecting every alert to a specific dashboard and procedure'
    ],
    doesNotDo: [
      'Does not write business application code (that is backend)',
      'Does not manage cloud infrastructure or networks (that is ops)',
      'Does not decide on personal data retention without the control mapper',
      'Does not run first-line incident investigation (that is telemetry_surfer)',
      'Does not run load testing (that is qa_perf)',
      'Does not fix code bugs surfaced by monitoring',
      'Does not build business dashboards for marketing or sales'
    ],
    antiPatterns: [
      'Cardinality Explosion - high-cardinality labels (user_id, request_id) that blow up metric memory',
      'Alert Fatigue - dozens of alerts on raw thresholds producing noise instead of signal',
      'Vanity Dashboard - colorful charts with no SLO that do not answer whether the system is healthy',
      'Log Everything - logging everything at INFO, filling disks and budget',
      'Trace Blindspot - no traceid propagation across async boundaries, leaving traces unfinished'
    ],
    keyConcepts: [
      {term: 'Golden signals', def: 'Four key system metrics: latency, traffic, errors, saturation (Google SRE).'},
      {term: 'SLI/SLO', def: 'Service Level Indicator measures real behavior, SLO is the target we want to hold.'},
      {term: 'Error budget', def: 'Allowed error volume within a period, below which the team can take risks on changes.'},
      {term: 'Burn rate', def: 'Rate at which the error budget is consumed - enables faster alerting than raw thresholds.'},
      {term: 'Cardinality', def: 'Number of unique label combinations in a metric - high cardinality blows up TSDB memory.'}
    ],
    stats: [
      {label: 'Phase', value: 'BUILD'},
      {label: 'Category', value: 'Observability'},
      {label: 'Load', value: '65/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you are launching a production system and want full visibility from day one',
      'When incidents drag on because nobody knows where to look',
      'When telemetry costs are rising and you need to decide what to measure and what to drop'
    ],
    worstFor: [
      'When the system has two users and there is no real load',
      'When the problem is local to a single piece of code, not the telemetry architecture',
      'When you need to investigate a specific incident right now (that is telemetry_surfer)'
    ],
    relatedAgents: ['telemetry_surfer', 'qa_perf', 'backend'],
    glossary: [
      {term: 'golden signals', definition: 'Four key system health metrics: latency, traffic, errors, saturation.'},
      {term: 'cardinality', definition: 'Number of unique label combinations in a metric, directly driving TSDB cost and performance.'},
      {term: 'exemplar', definition: 'A sample trace span linked to a point on a histogram, clickable straight from chart to trace.'},
      {term: 'error budget', definition: 'Allowed pool of errors or downtime within a period, defined by the SLO.'},
      {term: 'burn rate', definition: 'Rate at which the system consumes its error budget - the foundation of modern alerts.'}
    ],
    learningQuote: 'If you see only one pillar of telemetry, you are flying blind - full observability means metrics, logs, and traces together.',
    realExample: 'Imagine that I was instrumenting a payments microservice that lost 2 percent of transactions with no error in the logs. I added a trace span on the webhook callback and found that the load balancer was timing out at a p99 latency spike. The traceid tied to the log showed exactly which payload field was causing the slowdown.'
  },
