// Batch: A1 EN translations (orchestrator, synthesizer, analyst, planner, res_tech)
  orchestrator: {
    tagline: 'Conductor of a multi-agent system - decomposes, delegates, decides GO/NO-GO',
    missionShort: 'The Orchestrator is the central decision agent running the entire multi-agent system. Its mission: analyze the task, break it into subtasks, delegate to specialists, and control quality gates between phases. It does not do the domain work itself - it coordinates the specialists who do.',
    whoIs: 'The Orchestrator plays the role of construction foreman, orchestra conductor, and air traffic controller rolled into one. It sees the whole site from above but does not lay bricks or pull cables. Its power lies in strategic reasoning and the discipline of delegation.',
    analogy: 'This agent is like an orchestra conductor who plays no instrument, but without whom all the musicians together produce noise instead of music.',
    howItWorks: [
      {label: 'Task decomposition', desc: 'Breaks the user\'s request into independent S/M/L/XL subtasks so each one can be executed by a single agent with a clear input and output.'},
      {label: 'Delegation to specialists', desc: 'Picks the best agent for each subtask and hands it ONLY the narrow context needed to do the work (Narrow Context Principle).'},
      {label: 'GO/NO-GO gate control', desc: 'Between phases it checks whether results meet quality criteria. If not, it sends the work back for revision. It does not let errors propagate between phases.'},
      {label: 'Synthesis and arbitration', desc: 'Collects results from specialists, resolves conflicts between recommendations, and merges the parts into a coherent product for the user.'}
    ],
    inputs: [
      'User request (goal, constraints, project scope)',
      'Reports and outputs from specialist agents in each phase',
      'Current state of MANIFEST.md with architectural decisions',
      'Conflict flags escalated by the Synthesizer'
    ],
    outputs: [
      'Decomposition plan with agents assigned to subtasks',
      'GO/NO-GO decisions at every gate between phases',
      'Conflict resolutions between agent recommendations',
      'Final synthesized product for the user',
      'Process summary with rationale for key decisions'
    ],
    does: [
      'Decomposes complex tasks into small, independent subtasks for individual agents',
      'Delegates work to specialists using the narrow context rule',
      'Controls GO/NO-GO quality gates between pipeline phases',
      'Resolves conflicts between contradictory agent recommendations',
      'Synthesizes results from all phases into a coherent whole',
      'Manages the Hub-and-Spoke pattern or hierarchy for 4-18 agents',
      'Monitors progress by reading MANIFEST.md and TaskStatus',
      'Escalates hard decisions to the user when a third revision cycle does not help'
    ],
    doesNotDo: [
      'Does not generate code - that is what the Backend and Frontend Coders are for',
      'Does not run research - that is what the Researchers are for',
      'Does not write documentation or reports - that is the Writer\'s job',
      'Does not design interfaces or color palettes - that is the Designer\'s job',
      'Does not fix bugs directly - sends them back to the Coder with a note on what to change',
      'Does not delegate conflict resolution - that is its exclusive responsibility',
      'Does not load the full project context - sees only MANIFEST and current decisions'
    ],
    antiPatterns: [
      'Micro-Manager - the Orchestrator writes code itself instead of delegating to the Coder, creating a bottleneck and exploding Opus costs',
      'God Agent - trying to grasp the entire project context leads to the Lost in the Middle effect and hallucinations',
      'Blind Delegation - delegation without context (build the backend) with no spec, tech stack, or acceptance criteria',
      'Token Waste - 15 agents for a job that could be done by 3, over-engineering with ceremony and debates',
      'Missing Gates - automatic acceptance of results without GO/NO-GO gates, leading to a Hallucination Cascade'
    ],
    keyConcepts: [
      {term: 'Hub-and-Spoke', def: 'Architectural pattern where the orchestrator sits at the center and specialists around it, with all communication passing through the hub.'},
      {term: 'Gate Control', def: 'GO/NO-GO gates between phases that prevent error propagation and require precise criteria to be met.'},
      {term: 'Narrow Context', def: 'The principle that every agent receives only the information essential for its work, not the whole project context.'},
      {term: 'Smart Routing', def: 'Dynamic model assignment - Opus for strategic decisions, Sonnet for build, Haiku for research and QA.'},
      {term: 'Single Responsibility', def: 'The Orchestrator has one job - managing the system, not doing the domain work.'}
    ],
    stats: [
      {label: 'Coordinates', value: '4-18 agents'},
      {label: 'System calls', value: '~10%'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Opus'}
    ],
    bestFor: [
      'When the task needs coordination of 4+ agents and exceeds one sequential chain',
      'When the project has multiple phases with quality gates (research, build, QA, delivery)',
      'When contradictions appear between specialist recommendations and need arbitration'
    ],
    worstFor: [
      'When the task is simple and one agent is enough (quick fix, small edit)',
      'When you have 2-3 agents in a simple chain and no central arbiter is needed',
      'When you want cheap orchestration - Opus is the most expensive model and not worth it for micro-tasks'
    ],
    relatedAgents: ['synthesizer', 'analyst', 'planner'],
    glossary: [
      {term: 'decomposition', definition: 'Breaking a complex task into smaller, independent subtasks that single agents can execute.'},
      {term: 'gate', definition: 'A checkpoint between phases where the orchestrator makes a GO/NO-GO decision based on quality criteria.'},
      {term: 'hub-and-spoke', definition: 'A star topology where a central orchestrator talks to every specialist without peer-to-peer communication.'},
      {term: 'manifest', definition: 'The central document (MANIFEST.md) that serves as the shared communication board and Single Source of Truth.'},
      {term: 'delegation', definition: 'Handing a subtask to a specialist agent together with narrow context and acceptance criteria.'}
    ],
    learningQuote: 'A captain who starts scrubbing the deck is a captain who loses the ship - the orchestrator never does its subordinates\' work.',
    realExample: 'Imagine that one day I decomposed the task of building an interactive educational site into 14 subtasks across 4 phases. I ran 3 researchers in parallel, then synthesized their results, delegated the build to the Coder, Designer, and Writer, and halted the cycle at Gate 2 because the Designer had not delivered typography. The whole run cost $6 instead of the $25 I would have spent running everything on Opus.'
  },
  synthesizer: {
    tagline: 'Cross-phase memory of the system - MANIFEST guardian and contradiction hunter',
    missionShort: 'The Synthesizer is a strategic agent whose only job is to keep MANIFEST.md as the Single Source of Truth. It collects results from every phase, documents architectural decisions, flags contradictions between agents, and extracts cross-functional insights that no single specialist can see.',
    whoIs: 'The Synthesizer plays the role of a corporate historian, librarian, and meeting secretary in one. It is the long-term memory of the whole system - it remembers what was decided in the research phase, what was built in the build phase, and what QA found. It does not decide, it documents and flags.',
    analogy: 'This agent is like the librarian of a massive project who reads every report with the same attention as the first and connects dots no one else can see.',
    howItWorks: [
      {label: 'Read all outputs', desc: 'When a phase ends it uses Read and Grep to collect every agent\'s output plus the current state of MANIFEST.md.'},
      {label: 'Extract the essence', desc: 'Synthesizes 2000-word reports into 50-150-word entries capturing the key decisions, alternatives, and sources.'},
      {label: 'Hunt contradictions', desc: 'Actively compares every report against every other, looking for conflicts in recommendations, metrics, and facts. Flags without resolving.'},
      {label: 'Update the MANIFEST', desc: 'Records new ADRs with timestamps, documents contradictions at the top of the file, and sends a Synthesis Report to the Orchestrator.'}
    ],
    inputs: [
      'Reports from 6-14 agents in the current phase (research, build, QA)',
      'Current state of MANIFEST.md from previous phases',
      'Research Critic\'s scoring of report quality',
      'Signal from the Orchestrator that the phase is done and it is time to synthesize'
    ],
    outputs: [
      'Updated MANIFEST.md with new ADRs and decisions',
      'Synthesis Report in JSON format with an executive summary',
      'List of active [CONFLICT-NNN] items escalated to the Orchestrator',
      'Cross-functional insights linking domains (QA + Frontend, Design + Backend)',
      'Concise phase summary with a GO recommendation or a request for more research'
    ],
    does: [
      'Maintains MANIFEST.md as the Single Source of Truth for the whole system',
      'Creates ADRs (Architecture Decision Records) with WHAT/WHO/WHY/ALTERNATIVES context',
      'Flags contradictions between agent reports with criticality priority',
      'Extracts cross-functional insights by combining findings from different domains',
      'Applies the append-only rule - never deletes, only marks entries as REVISED',
      'Acts as an advisor to Builders during the build phase (Builder Advisory)',
      'Produces two versions of the MANIFEST in Deep Research Belt - executive summary and full'
    ],
    doesNotDo: [
      'Does not make decisions - that is the Orchestrator\'s sole responsibility',
      'Does not resolve conflicts - only flags and escalates them',
      'Does not write code or create designs - only documents others\' decisions',
      'Does not launch subagents - it has no Agent tool',
      'Does not verify facts via WebSearch - that is the Researchers\' role',
      'Does not copy entire reports into the MANIFEST - it synthesizes into 50-150-word essence',
      'Does not wait until the end of a phase to flag critical conflicts'
    ],
    antiPatterns: [
      'Decision Maker - the Synthesizer resolves a conflict itself by writing decision: React instead of escalating, causing a split-brain with the Orchestrator',
      'Info Hoarder - copying whole reports into the MANIFEST until the document grows to 10,000 words and nobody reads it',
      'Passive Observer - collecting data without actively hunting contradictions; 60% of immature implementations have this bug',
      'Stale Manifest - updating once a week instead of after every phase, so builders work from outdated decisions',
      'Silent Conflict - flagging without priority, so critical contradictions drown in low-weight noise'
    ],
    keyConcepts: [
      {term: 'Single Source of Truth', def: 'MANIFEST.md as the sole authoritative record of the project state, updated only by the Synthesizer.'},
      {term: 'Append-only', def: 'The rule that old decisions are never deleted, only marked REVISED, preserving the change history.'},
      {term: 'Bidirectional awareness', def: 'The Synthesizer\'s unique privilege - it can directly ask agents for clarification, bypassing the Orchestrator.'},
      {term: 'Cross-functional insight', def: 'A conclusion that joins facts from different domains and is invisible to any single specialist (for example CORS issue + missing credentials in fetch).'},
      {term: 'ADR', def: 'Architecture Decision Record - a structured decision entry with context, source, alternatives, and status.'}
    ],
    stats: [
      {label: 'Input per session', value: '15-100k tok'},
      {label: 'MANIFEST sections', value: '50-150 words'},
      {label: 'Load', value: '65/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When the system has 6+ agents and an information gap appears between phases',
      'When you need a historical record of architectural decisions with rationale',
      'When active detection of contradictions between specialist recommendations matters'
    ],
    worstFor: [
      'When you have 2-3 agents and the Orchestrator can keep everything consistent alone',
      'When the project is one-off and decision history has no value',
      'When you need an active decision maker - the Synthesizer never picks a side'
    ],
    relatedAgents: ['orchestrator', 'res_critic', 'analyst'],
    glossary: [
      {term: 'manifest', definition: 'The central MANIFEST.md document collecting every decision, stack choice, risk, and conflict for the project.'},
      {term: 'adr', definition: 'Architecture Decision Record - an entry documenting an architectural decision with full context.'},
      {term: 'synthesis report', definition: 'JSON snapshot produced at the end of a phase as a formal recommendation to the Orchestrator.'},
      {term: 'conflict flag', definition: 'A marker of a contradiction between agent reports that requires an Orchestrator decision.'},
      {term: 'split-brain', definition: 'Inconsistency between Orchestrator decisions and MANIFEST state, dangerous for builders.'}
    ],
    learningQuote: 'The Synthesizer documents, the Orchestrator decides - zero exceptions, because neutral system memory is worth more than one more decision maker.',
    realExample: 'Imagine that one day I synthesized reports from 6 researchers on the 2026 SaaS stack. I found consensus on Next.js 15 (4 out of 6 votes), but Researcher Reddit and Researcher X flagged Remix hype. Instead of resolving, I wrote [CONFLICT-007] into the MANIFEST with full context and escalated to the Orchestrator. I also caught a cross-functional insight - Next.js 15 ships native CSS variables, so dark mode needs no extra library.'
  },
  analyst: {
    tagline: 'Problem surgeon - splits complex tasks into independent S/M/L/XL subtasks',
    missionShort: 'The Analyst specializes in decomposing complex problems into atomic, actionable subtasks. Its mission: turn an abstract user request into a structured task list with dependencies, complexity estimates, and categories. The entire downstream pipeline builds on its work.',
    whoIs: 'The Analyst plays the role of a systems engineer, a surgeon planning an operation, and a Michelin-starred head chef. It sees the whole problem laid out on the operating table - it knows what needs to happen, in what order, and what can run in parallel. It does not do the work, it builds the map for those who will.',
    analogy: 'This agent is like a surgeon who, before the first cut, breaks the whole operation into stages, identifies critical points, and decides what can run in parallel.',
    howItWorks: [
      {label: 'Problem analysis', desc: 'Reads the request from the Orchestrator and identifies scope, constraints, and the type of work needed to reach the goal.'},
      {label: 'Atomic decomposition', desc: 'Breaks the task into subtasks small enough that each one can be done by a SINGLE agent with a clear input and output.'},
      {label: 'Dependency map', desc: 'Builds a dependency graph showing which subtasks are independent (parallel) and which require outputs from others.'},
      {label: 'Estimation and categorization', desc: 'Assigns each subtask an S/M/L/XL complexity and a category (RESEARCH/DESIGN/BUILD/QA/CONTENT) for the Planner.'}
    ],
    inputs: [
      'User request passed through the Orchestrator with narrow context',
      'Project goal, constraints, and scope',
      'Current state of MANIFEST.md if any decisions already exist',
      'Optional references and input material from the user'
    ],
    outputs: [
      'Structured decomposition document in Markdown',
      'List of subtasks with unique IDs (T-001, T-002, ...) and descriptions',
      'Dependency graph showing independencies and parallel paths',
      'S/M/L/XL complexity estimate for each subtask',
      'Task categorization (RESEARCH/DESIGN/BUILD/INTEGRATE/QA/CONTENT)'
    ],
    does: [
      'Decomposes complex problems into atomic, actionable subtasks',
      'Identifies independencies and dependencies, producing a directed graph',
      'Estimates complexity on an S/M/L/XL scale (not in time units)',
      'Categorizes tasks by work type for the Orchestrator',
      'Produces a structured decomposition plan as a contract for the rest of the system',
      'Separates domain work (research) from implementation (build)',
      'Runs once at the start of the project - decomposition is a one-shot operation'
    ],
    doesNotDo: [
      'Does not write code or implement the subtasks it decomposed',
      'Does not run research - only states that topic X needs to be investigated',
      'Does not build a schedule - that is the Planner\'s role (when and in what order)',
      'Does not make architectural decisions (framework, database, palette)',
      'Does not estimate time - only complexity S/M/L/XL, which is model-independent',
      'Does not run code - it has no Bash tool, only static analysis',
      'Does not launch subagents - it has no Agent tool, that is the Orchestrator\'s role'
    ],
    antiPatterns: [
      'Scope Creep - the Analyst starts doing domain work (code, research) instead of decomposition, so the decomposition turns shallow',
      'Time Estimation - estimating in hours instead of complexity; time depends on the model but complexity is constant',
      'Giant Task - a subtask that needs two agents at once must be broken down further into atoms',
      'Dependency Blindness - missing a dependency between subtasks, so builders work on conflicting assumptions',
      'Category Confusion - mixing RESEARCH with BUILD in a single subtask, so the agent wastes time on work outside its role'
    ],
    keyConcepts: [
      {term: 'Plan-and-Execute', def: 'The Analyst-Planner-Builder-QA pattern that delivers 83% cost savings compared to ad-hoc approaches.'},
      {term: 'Complexity S/M/L/XL', def: 'A time-independent complexity scale - Small one step, Medium several steps, Large many components, XL critical.'},
      {term: 'Dependency Graph', def: 'A directed graph showing which subtasks need outputs from others, key to spotting parallelism.'},
      {term: 'Narrow Context', def: 'The Analyst gets only goal/constraints/scope, not the full project context, so it can focus on decomposition.'},
      {term: 'Atomic Task', def: 'A subtask small enough that a single agent can execute it with clearly defined input and output.'}
    ],
    stats: [
      {label: 'Session time', value: '15-25 sec'},
      {label: 'Savings', value: '83% vs ad-hoc'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When the task is complex and needs 5+ subtasks spread across different specialists',
      'When you want to maximize parallelism and identify independencies',
      'When the pipeline needs a contract between planning and execution'
    ],
    worstFor: [
      'When the task is trivial and one agent can handle it end-to-end',
      'When you need a schedule with dates - that is the Planner\'s role, not the Analyst\'s',
      'When the project has no clear goal - the Analyst needs precise input'
    ],
    relatedAgents: ['planner', 'orchestrator', 'synthesizer'],
    glossary: [
      {term: 'decomposition', definition: 'Breaking a complex problem into small independent subtasks that single agents can handle.'},
      {term: 'dependency graph', definition: 'A visual map showing which subtasks depend on which others, used to spot parallel paths.'},
      {term: 'complexity', definition: 'Task difficulty on an S/M/L/XL scale, independent of model and execution time.'},
      {term: 'category', definition: 'The type of work a subtask needs - RESEARCH, DESIGN, BUILD, INTEGRATE, QA, or CONTENT.'},
      {term: 'atomic task', definition: 'A subtask small enough that one agent can handle it alone from input to output.'}
    ],
    learningQuote: 'If the Analyst gets it wrong, there will be nothing to build on the other side, because a bad decomposition propagates through the system like a crack in a foundation.',
    realExample: 'Imagine that one day I was handed the request build an analytics dashboard for e-commerce. I broke it into 13 subtasks across 6 categories, marked 8 of them as parallel (65% parallelism potential), rated 3 as XL (API integrations, permissions system, query optimization), and handed the graph to the Planner. My whole process took 22 seconds but saved the project two rounds of rework.'
  },
  planner: {
    tagline: 'Schedule director - turns decomposition into a phased plan with gates and a critical path',
    missionShort: 'The Planner builds an execution schedule from the Analyst\'s decomposition. Its mission: decide which tasks are sequential and which are parallel, identify the critical path, define G0-G4 quality gates, and maximize parallelism to shrink total project time.',
    whoIs: 'The Planner plays the role of a construction foreman, a military logistics chief, and a film director. It has the Analyst\'s script in hand but must decide which scenes to shoot in parallel, which need effects carried over from an earlier stage, and where to place quality checkpoints. It is the tactician between strategy and execution.',
    analogy: 'This agent is like a construction foreman who knows that the electrician and plumber can work in parallel on different floors, but the roof cannot go on before the walls are up.',
    howItWorks: [
      {label: 'Dependency analysis', desc: 'Reads the Analyst\'s dependency graph and identifies which subtasks can run in parallel and which must wait.'},
      {label: 'Pick execution mode', desc: 'For each phase it picks SEQUENTIAL, PARALLEL, PARALLEL_THEN_SEQUENTIAL, or SEQUENTIAL_WITH_COLLABORATION.'},
      {label: 'Critical path', desc: 'Identifies the longest chain of dependent tasks that determines the minimum project duration and flags those tasks as high priority.'},
      {label: 'Define gates G0-G4', desc: 'Writes precise GO/NO-GO criteria for the gates between phases (Input, Decomposition, Research, Build, QA) that the Orchestrator will enforce.'}
    ],
    inputs: [
      'Structured decomposition with a subtask list from the Analyst',
      'Dependency graph showing independencies and parallel paths',
      'S/M/L/XL complexity estimates for each subtask',
      'Token and time budget constraints from the Orchestrator'
    ],
    outputs: [
      'Execution schedule split into phases with SEQ/PARALLEL modes',
      'Critical path identification with priority tasks marked',
      'G0-G4 quality gate definitions with precise GO/NO-GO criteria',
      'Parallelism potential estimate (% of tasks that can run concurrently)',
      'Iteration limit recommendations for feedback loops (max 2-3)'
    ],
    does: [
      'Builds an execution schedule with sequential and parallel phases',
      'Identifies the critical path that determines minimum project duration',
      'Defines G0-G4 quality gates with precise GO/NO-GO criteria',
      'Maximizes parallelism to cut total time (40-60% savings)',
      'Picks an execution mode for each phase from the four standard patterns',
      'Sets iteration limits for feedback loops (max 2 for QA, max 3 for critical)',
      'Detects resource conflicts (two tasks writing to the same file)'
    ],
    doesNotDo: [
      'Does not decompose tasks - the Analyst already did that in the previous step',
      'Does not execute tasks - only plans their order and execution mode',
      'Does not enforce quality gates - it defines them, the Orchestrator enforces them',
      'Does not write code or run research - it is purely a tactician',
      'Does not pick models for agents - that is the Orchestrator\'s call based on complexity',
      'Does not modify the Analyst\'s decomposition - if it is flawed, it escalates to the Orchestrator',
      'Does not allow infinite iteration - it always defines a max_iterations limit'
    ],
    antiPatterns: [
      'False Parallelism - marking tasks as parallel without checking resource conflicts, causing race conditions and file overwrites',
      'Missing Critical Path - no critical path identification leads to wrong priorities and delays across the whole project',
      'Loose Gates - quality gates with a criterion like something exists let flawed results through to the next phase',
      'Infinite Iteration - no max_iterations limit on SEQUENTIAL_WITH_COLLABORATION, so the system loops endlessly on fixes',
      'Sequential Bias - defaulting tasks to sequential without analyzing independence wastes parallelism potential'
    ],
    keyConcepts: [
      {term: 'Critical path', def: 'The longest chain of dependent tasks that sets the minimum project duration; tasks on it get priority.'},
      {term: 'Execution mode', def: 'One of four patterns - SEQUENTIAL, PARALLEL, PARALLEL_THEN_SEQUENTIAL, SEQUENTIAL_WITH_COLLABORATION.'},
      {term: 'Gate G0-G4', def: 'Standard quality gates - Input, Decomposition, Research, Build, Quality - with precise GO/NO-GO criteria.'},
      {term: 'Parallelization', def: 'Running independent tasks at the same time, cutting time by 40-60% compared to pure sequence.'},
      {term: 'Max iterations', def: 'A feedback loop limit that prevents infinite revision cycles, usually 2-3 iterations.'}
    ],
    stats: [
      {label: 'Parallelism', value: '+40-60%'},
      {label: 'Gates G0-G4', value: '5 standard'},
      {label: 'Load', value: '40/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When the project has many phases and needs precise sequence coordination',
      'When you want to maximize parallelism to shorten delivery time',
      'When quality gates with precise GO/NO-GO criteria are critical'
    ],
    worstFor: [
      'When the project has fewer than 4 subtasks - the schedule is obvious',
      'When all tasks are sequential - there is nothing to plan',
      'When you need a builder, not a planner - the Planner does not write code'
    ],
    relatedAgents: ['analyst', 'orchestrator', 'qa_manager'],
    glossary: [
      {term: 'schedule', definition: 'A document defining the order of subtask execution, split into phases with sequential and parallel modes.'},
      {term: 'critical path', definition: 'The longest chain of dependent tasks that determines the minimum duration of the whole project.'},
      {term: 'gate', definition: 'A checkpoint between phases with precise GO/NO-GO criteria, enforced by the Orchestrator.'},
      {term: 'execution mode', definition: 'Agent collaboration pattern in a phase - sequential, parallel, mixed, or with feedback loops.'},
      {term: 'max iterations', definition: 'Feedback cycle limit in SEQUENTIAL_WITH_COLLABORATION mode that prevents infinite loops.'}
    ],
    learningQuote: 'A parallel UX Research task can slip by 20% without touching the project, but Tech Research on the critical path delays everyone.',
    realExample: 'Imagine that one day I got a 13-subtask decomposition from the Analyst. I identified 3 researchers as parallel (saving 14 minutes on phase 1), set build to PARALLEL_THEN_SEQUENTIAL because the Integrator must wait for the Coder and Designer, and defined gate G2 with the criterion every researcher delivered a report with at least 3 sources. The critical path ran through Research Tech to Coder to Integrator - that is where I pointed the Orchestrator\'s attention.'
  },
  res_tech: {
    tagline: 'Archivist of official truth - reads docs and RFCs, cites URLs instead of memory',
    missionShort: 'Researcher Tech searches official documentation, RFCs, specifications, and benchmarks for hard technical facts. Its mission: deliver ground truth from vendors and peer-reviewed research, never opinions. Every claim must come with a source URL - no source, no fact.',
    whoIs: 'Researcher Tech is the librarian of a legal library and a detective in the archives at the same time. It sits in the reading room of official docs, compares versions, checks publication dates and RFCs, and never quotes from memory. Its domain is the arbiter of truth - what the vendor says, what independent benchmarks show, what changelogs reveal.',
    analogy: 'This agent is like a lawyer in court who, instead of saying I heard that, pulls a document from the folder, points at the paragraph, cites the clause, and adds the source URL.',
    howItWorks: [
      {label: 'Research question', desc: 'Receives a narrow question from the Orchestrator (Narrow Context Principle) and breaks it into sub-queries with time context and technology version.'},
      {label: 'Source hierarchy', desc: 'Searches by the pyramid: official docs > engineering blog > independent benchmark > tutorial. Rejects sources older than 12 months for fast-moving frameworks.'},
      {label: 'Compare 3 options', desc: 'For every topic it compares at least 3 alternatives with pros/cons, setup snippets, known issues, and maintenance activity. Never recommends the first thing it finds.'},
      {label: 'JSON report', desc: 'Formats a structured report with findings, confidence scores 0.0-1.0, risks, gaps, and a URL on every claim. Explicitly calls out data gaps for the Research Critic.'}
    ],
    inputs: [
      'Research question (for example: which multi-agent framework for SaaS)',
      'Technology keywords and framework versions',
      'Source time window (freshness window)',
      'Optionally a previous report for iteration or revision'
    ],
    outputs: [
      'At least 3 options compared with pros/cons and snippets',
      'Source URL on every technical claim',
      'Confidence score 0.0-1.0 based on the source hierarchy',
      'Risks section (lock-in, maintenance, security, scalability)',
      'Gaps section - what the sources did not answer'
    ],
    does: [
      'Reads official documentation and RFCs as the arbiter of truth',
      'Critically analyzes benchmarks (hardware, version, methodology, reproducibility)',
      'Compares at least 3 alternatives for every technology recommendation',
      'Verifies adoption metrics (npm downloads, GitHub stars, PyPI)',
      'Checks changelogs and CVEs to spot breaking changes',
      'Rates vendor lock-in and how model-agnostic a solution is',
      'Provides a working setup snippet for each recommended option',
      'Tags every claim with a source URL - the cardinal rule'
    ],
    doesNotDo: [
      'Does not read Reddit or community opinion (that is res_reddit\'s domain)',
      'Does not chase visual trends and mood boards (that is res_ux\'s domain)',
      'Does not analyze repositories and Issues (that is res_github\'s domain)',
      'Does not cite SO forums as primary sources (that is res_forums\'s domain)',
      'Does not write code or implementations (that is the Builder\'s role)',
      'Does not make decisions - it recommends with a confidence score',
      'Does not talk to other researchers (isolation rule)'
    ],
    antiPatterns: [
      'Shallow Search - one WebSearch query and three links as a report with no deeper WebFetch',
      'Hallucinated Source - a URL generated from model memory that leads to a 404',
      'Source Bias - every source from the same vendor (nextjs docs + vercel blog + vercel case)',
      'Recency Obsession - recommending the newest tech just because it is new',
      'Copy-Paste Research - verbatim quotes from the docs with no analysis or context'
    ],
    keyConcepts: [
      {term: 'Narrow Context Principle', def: 'The Researcher gets ONLY the research question, without project context - this cuts hallucinations and confirmation bias.'},
      {term: 'Source hierarchy', def: 'Docs > Eng Blog > Benchmark > Tech Blog > Tutorial > Forum > Tweet - an official source beats a blog every time.'},
      {term: 'Confidence score', def: '0.9+ for official docs, 0.7-0.89 for reputable blogs, 0.5-0.69 for forums; below 0.5 the Critic rejects the finding.'},
      {term: 'Freshness check', def: 'A source older than 12 months for a framework needs verification against the current version - technology ages fast.'},
      {term: 'Multi-source triangulation', def: 'High confidence requires confirmation from 3 different source types: docs + benchmark + community feedback.'}
    ],
    stats: [
      {label: 'Min. options', value: '3 compared'},
      {label: 'Hierarchy', value: '7 levels'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'When you need hard technical facts with source URLs instead of opinions',
      'When you are choosing between 3+ frameworks and need a pros/cons comparison',
      'When you must verify a benchmark, API version, or breaking changes'
    ],
    worstFor: [
      'When you want practitioners\' opinions on what actually works (that is res_reddit\'s domain)',
      'When you want visual inspiration and UX trends (that is res_ux\'s domain)',
      'When the question is about a very new technology with no established documentation'
    ],
    relatedAgents: ['res_docs', 'res_github', 'res_critic'],
    glossary: [
      {term: 'rfc', definition: 'Request for Comments - a technical document that defines standards and maintainer design decisions.'},
      {term: 'freshness', definition: 'Source currency - publication date relative to the current technology version.'},
      {term: 'confidence_score', definition: 'Finding confidence 0.0-1.0 based on source hierarchy and number of confirmations.'},
      {term: 'vendor_lock_in', definition: 'Degree of dependence on a single vendor - from open source (none) to closed protocols (high).'},
      {term: 'narrow_context', definition: 'The rule that context is limited to the research question, preventing hallucinations and confirmation bias.'}
    ],
    learningQuote: 'Without a source URL there is no fact, only speculation. Researcher Tech does not quote from memory, it shows the document and the paragraph.',
    realExample: 'Imagine that one day I compared LangGraph, CrewAI, and the Claude Agent SDK for a multi-agent SaaS. LangGraph won on battle-tested (confidence 0.92), but I found an issue about a memory leak below 0.2.1. I flagged it under risks and the team picked the stable version with the workaround, instead of learning about the bug in production.'
  },
