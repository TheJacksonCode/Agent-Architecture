// === V32.16: eduAgent EN (35 entries aggregated) ===
const EDU_AGENT_EN_OBJ = {
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
  res_ux: {
    tagline: 'Curator of the digital gallery - a mood board from 5 sources instead of a Dribbble copy',
    missionShort: 'The UX Researcher scans Dribbble, Behance, Awwwards, Mobbin, and official design systems for visual trends, interaction patterns, and accessibility standards. Mission: deliver a synthesized mood board with a minimum of 5 references plus a WCAG audit instead of plagiarizing a single design.',
    whoIs: 'The UX Researcher is part art gallery curator, part fashion trend scout. They walk through digital exhibits, pick the best work, and build a mood board - but they never paint the picture themselves. Their unique niche is answering how it should look and feel, while Tech answers how to build it.',
    analogy: 'The UX Researcher is an interior designer in the inspiration phase - visiting trade shows, photographing hotel lobbies, collecting fabric swatches, and coming back with a mood board the painter will build from.',
    howItWorks: [
      {label: 'Visual brief', desc: 'Receives a brief with target audience, tone of voice, and constraints. Filters trends against project context so they don\'t sweep up everything that\'s trendy.'},
      {label: 'Platform search', desc: 'WebSearch across Dribbble, Behance, Awwwards, Mobbin plus official design systems (Material, HIG, WCAG). Separates concepts from production work.'},
      {label: 'Mood board synthesis', desc: 'Groups findings into categories (color, typography, layout, animation, a11y) and extracts patterns - when 7 of 10 sites use a bento grid, that\'s a pattern, not a fad.'},
      {label: 'WCAG audit', desc: 'Checks every palette for minimum 4.5:1 contrast, every animation for prefers-reduced-motion, every touch target for 44x44 px minimum. Flags problems instead of ignoring them.'}
    ],
    inputs: [
      'Project brief with target audience and tone of voice',
      'Product category (dashboard, e-commerce, educational)',
      'Required modes (dark/light, mobile/desktop breakpoints)',
      'Cultural context and target market'
    ],
    outputs: [
      'Mood board with minimum 5 references, links, and categories',
      'Primary/secondary/accent color palette with hex values and contrast ratios',
      'Typography recommendation (heading/body/mono) with a size scale',
      'Spacing system based on a 4 px or 8 px grid',
      'WCAG audit with accessibility flags and animation spec'
    ],
    does: [
      'Searches Dribbble, Behance, Awwwards, and Mobbin for patterns',
      'Builds a mood board with minimum 5 references (synthesis, not copy)',
      'Analyzes official design systems (Material, HIG, Fluent, Tailwind UI)',
      'Checks WCAG contrast 4.5:1 for body text and 3:1 for large text',
      'Separates Dribbble concepts from production examples on Mobbin',
      'Flags trends on the way out (neumorphism died in 2024)',
      'Accounts for cultural context of color and typography',
      'Delivers dark mode and light mode recommendations in parallel'
    ],
    doesNotDo: [
      'Does not write CSS or tokens - that\'s the Designer\'s job in Build',
      'Does not read official framework docs (that\'s res_tech\'s domain)',
      'Does not design wireframes or layouts (that\'s the Designer\'s job)',
      'Does not run Lighthouse or a11y tests (that\'s QA Quality\'s job)',
      'Does not copy a single Dribbble shot - always synthesizes from 5+',
      'Does not ignore mobile - the mood board needs 2+ breakpoints',
      'Does not have Write/Edit/Bash access - only WebSearch and WebFetch'
    ],
    antiPatterns: [
      'Trend Chaser - scooping up every hot trend without filtering for project context, report becomes internally contradictory',
      'No Accessibility - beautiful palettes with 2:1 contrast, no prefers-reduced-motion, violating the European Accessibility Act',
      'Style Over Substance - recommending heavy 3D animations that tank performance on mid-range Android devices',
      'Missing Responsive - mood board is desktop 1440 px only, zero references for 375 px mobile',
      'Single Source Worship - entire mood board built around one Dribbble shot, that\'s plagiarism with extra steps'
    ],
    keyConcepts: [
      {term: 'Mood board', def: 'An inspiration board with at least 5 references from different sources, enabling synthesis instead of copying a single design.'},
      {term: 'WCAG 2.2 AA', def: 'Accessibility standard enforcing 4.5:1 contrast, touch targets of 24x24 px minimum, prefers-reduced-motion, and visible focus.'},
      {term: 'European Accessibility Act', def: 'EU regulation in force from June 28, 2025 requiring digital products to comply with WCAG - accessibility is a legal obligation.'},
      {term: 'Concept vs production', def: 'Dribbble hosts concept shots that were never built, Mobbin hosts real production screens - both need to be labeled in the report.'},
      {term: 'Mobile-first', def: 'Design principle that starts from the smallest screen and scales up - 60%+ of traffic is mobile, desktop is the add-on.'}
    ],
    stats: [
      {label: 'Min. references', value: '5 sources'},
      {label: 'WCAG contrast', value: '4.5:1 text'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'When you need a mood board of 2026 trends, not a copy of one shot',
      'When you want a WCAG 2.2 audit with concrete contrast numbers',
      'When the project targets dark mode and light mode in parallel with per-mode palettes'
    ],
    worstFor: [
      'When you need CSS implementation and tokens (that\'s the Designer in Build)',
      'When you\'re after technology or framework benchmarks (that\'s res_tech\'s domain)',
      'When you have to run a real Lighthouse or axe test (that\'s QA Quality)'
    ],
    relatedAgents: ['res_tech', 'designer', 'res_critic'],
    glossary: [
      {term: 'dribbble', definition: 'A platform for designer shots - great for trends, but many are concepts that were never shipped.'},
      {term: 'behance', definition: 'Adobe\'s portfolio site requiring full case studies - shows the design process, not just the final shot.'},
      {term: 'awwwards', definition: 'Site that awards the best websites - state-of-the-art web design judged by a jury.'},
      {term: 'mobbin', definition: 'Library of real production app screens - ground truth instead of Dribbble concepts.'},
      {term: 'wcag', definition: 'Web Content Accessibility Guidelines - W3C standard with contrast, keyboard navigation, and ARIA requirements.'}
    ],
    learningQuote: 'Five references is synthesis, one is plagiarism with extra steps - the UX Researcher doesn\'t copy pretty pictures, they distill patterns.',
    realExample: 'One day I built a mood board for an educational site about AI agents. I found that 7 of 10 Awwwards-winning sites in Q1 2026 used a bento grid with a dark theme and Space Grotesk - that was the pattern. I labeled the proposed palette at 4.6:1 contrast and the team got a ready-to-go direction instead of distracting options.'
  },
  res_reddit: {
    tagline: 'Ethnographer of digital tribes - translating user passion and frustration into product insights',
    missionShort: 'The Reddit Researcher mines anonymous discussion platforms for unfiltered developer opinions. Mission: deliver ground truth - real practitioner experience, not marketing promises. Operates in the community-opinion specialization.',
    whoIs: 'The Reddit Researcher is an AI agent that behaves like an anthropologist studying developer tribes. They sit in digital taverns (subreddits like r/webdev, r/programming), listen to unfiltered discussion, and extract real practitioner pain.',
    analogy: 'The Reddit Researcher is a mystery shopper in a tech store - they don\'t read the salesperson\'s brochure, they sit down with coffee next to other customers and listen to what they dislike about the products they bought.',
    howItWorks: [
      {label: 'Subreddit selection', desc: 'Identifies relevant subreddits (r/webdev, r/programming, r/reactjs, r/SaaS, r/devops) and formulates precise queries with the site:reddit.com operator.'},
      {label: 'Thread reading', desc: 'Prioritizes threads with high comment counts and gilded posts. Reads full discussions, not just titles, because the value lives in the comments.'},
      {label: 'Patterns and sentiment', desc: 'Extracts sentiments (POSITIVE, NEGATIVE, MIXED, SHIFTING) and hunts for patterns - when the same problem shows up in 5+ threads, that\'s a pattern, not an anecdote.'},
      {label: 'JSON report', desc: 'Formats a report with TOP 10 insights, links, upvote_range, and confidence scores. Adds Patterns, Controversies, and Gaps sections.'}
    ],
    inputs: [
      'Research question (e.g., Which multi-agent framework does the Reddit community prefer)',
      'Technical keywords to search for',
      'Sometimes a prior research report for iteration',
      'Optional context from other agents (usually none - isolation rule)'
    ],
    outputs: [
      'Structured JSON report with TOP 10 insights',
      'Each insight with sentiment, frequency, and representative quotes',
      'Source links (reddit.com/r/... URLs) and upvote range',
      'Patterns Detected, Controversies, and Gaps sections',
      'Confidence scores 0.0-1.0 for each finding'
    ],
    does: [
      'Finds unfiltered, honest developer opinion thanks to anonymity',
      'Identifies hidden problems ignored by the documentation',
      'Detects trends through patterns (10 people independently reporting the same problem)',
      'Gathers stack recommendations from people with real experience',
      'Extracts trade-offs from flamewars (React vs Vue etc.)',
      'Validates community consensus via voting (upvotes = crowdsourced peer review)',
      'Analyzes community sentiment over time (SHIFTING sentiments)'
    ],
    doesNotDo: [
      'Does not read official documentation (that\'s the Tech Researcher\'s domain)',
      'Does not search for visual or design inspiration (that\'s the UX Researcher\'s domain)',
      'Does not analyze source code or Issues (that\'s the GitHub Researcher\'s domain)',
      'Does not make decisions - only recommends',
      'Does not talk to other researchers (isolation rule)',
      'Does not treat a single comment as truth (hunts for patterns)',
      'Does not ignore controversy - actively hunts for it'
    ],
    antiPatterns: [
      'Single Comment Truth - one comment with 3 upvotes taken as the community opinion',
      'Outdated Thread - citing posts from 2 years ago as current opinion',
      'Echo Chamber - searching ONLY one subreddit (e.g., only pro-React r/reactjs)',
      'Rage Sampling - collecting ONLY negative opinions, ignoring praise',
      'Karma Blindness - treating a comment with 2 upvotes equal to a comment with 500'
    ],
    keyConcepts: [
      {term: 'Subreddit semantics', def: 'Every subreddit has its own bias and skill level - you have to know where to look.'},
      {term: 'Ground truth', def: 'Frontline truth from practitioners in the field, not from marketing brochures.'},
      {term: 'Online disinhibition', def: 'Anonymity encourages honesty - people on Reddit say what they actually think.'},
      {term: 'Survivorship bias', def: 'You mostly see problems (people asking for help) and successes, you miss the quiet failures.'},
      {term: 'Flamewar', def: 'A heated discussion that exposes the strongest arguments pro and con for competing technologies.'}
    ],
    stats: [
      {label: 'Reddit users', value: '430M/month'},
      {label: 'r/programming', value: '6M subs'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'When you want to know what developers actually complain about, not what they say officially',
      'When you\'re looking for hidden framework problems ignored by the docs',
      'When you want a read on community sentiment toward a technology'
    ],
    worstFor: [
      'When you\'re after technical facts (that\'s the Tech Researcher\'s domain)',
      'When you\'re after visual trends and design inspiration (that\'s UX)',
      'When you only have an hour and need quick answers'
    ],
    relatedAgents: ['res_x', 'res_forums', 'res_github'],
    glossary: [
      {term: 'karma', definition: 'User reputation on Reddit - sum of up/downvotes across all their posts.'},
      {term: 'subreddit', definition: 'A topical subforum on Reddit, e.g., r/webdev for web developers.'},
      {term: 'upvote/downvote', definition: 'Voting system - the community filters content through votes.'},
      {term: 'gilded', definition: 'A post or comment gifted gold by another user - a signal of high value.'},
      {term: 'flamewar', definition: 'A heated argument between advocates of different technologies - a source of pro/con arguments.'}
    ],
    learningQuote: 'Complaints on Reddit are opportunities for better solutions - the Reddit Researcher isn\'t looking for what\'s good, they\'re looking for where the problems live.',
    realExample: 'One day I analyzed 200 threads on r/nextjs about server actions bugs and found that 40 people independently reported the same problem with revalidateTag in middleware. That was a pattern, not an anecdote - and a warning to the team ahead of migration.'
  },
  res_x: {
    tagline: 'Trend hunter on the move - catches tech signals before they go mainstream',
    missionShort: 'The X Researcher monitors X/Twitter for the fastest signals about new technologies, product launches, and trends. Mission: deliver an early warning system for ecosystem shifts. Moves fast, but requires validation from other sources.',
    whoIs: 'The X Researcher is a tech war correspondent - standing on the front line of the X ecosystem, catching news before it hits blogs or documentation. Their power is speed, but speed has a cost - X has the highest noise-to-signal ratio of any research medium.',
    analogy: 'The X Researcher is a long-range radar on a ship - detects signals earliest, but sometimes sees false echoes. The captain has to listen to the radar, but verify every signal before changing course.',
    howItWorks: [
      {label: 'Query breakdown', desc: 'Receives a research question from the Orchestrator and breaks it into X-specific sub-queries (trends, launches, technical threads).'},
      {label: 'Post scan', desc: 'Runs WebSearch with site:x.com and site:twitter.com operators. Pulls full threads with WebFetch, not just search engine snippets.'},
      {label: 'Author evaluation', desc: 'Checks author Tier (1=tech creator, 5=commentator) and credentials. Calculates a hype_score 0-10 for each finding.'},
      {label: 'Validation and report', desc: 'Marks validation_status (VALIDATED/PARTIALLY/REQUIRES_VALIDATION) and formats a JSON report with TOP 10 posts, engagement_metrics, and confidence scores.'}
    ],
    inputs: [
      'Research question (e.g., What are the AI agents trends in Q2 2026)',
      'Technical keywords to track',
      'Time window (last 48h, week, month)',
      'Optionally a prior report for context'
    ],
    outputs: [
      'TOP 10 posts with links to the tweet',
      'Engagement metrics (likes, retweets, replies, bookmarks)',
      'Author credentials and Tier (1-5)',
      'Hype score 0-10 and validation_status per finding',
      'Hype Assessment and Gaps sections'
    ],
    does: [
      'Catches new launches and announcements before they hit the documentation',
      'Identifies trends via post patterns (50 people in a week writing about X = trend)',
      'Detects the hype cycle and separates noise from signal',
      'Gathers expert opinions (Tier 1-2 influencers)',
      'Analyzes comparative debates (X vs Y) and surfaces trade-offs',
      'Measures engagement as a signal of interest (but NOT of truth)',
      'Validates technical threads from experienced engineers'
    ],
    doesNotDo: [
      'Does not chase hype without validation - flags it as REQUIRES_VALIDATION',
      'Does not treat likes as proof of technical quality',
      'Does not read official documentation (that\'s Tech)',
      'Does not look for visual inspiration (that\'s UX)',
      'Does not analyze repositories (that\'s GitHub)',
      'Does not make decisions - reports what X says, not whether it\'s true',
      'Does not talk to other researchers (isolation rule)'
    ],
    antiPatterns: [
      'Hype Follower - adopting the X narrative without verification (report reads like an enthusiastic tweet)',
      'Influencer Worship - treating popular accounts as authoritative regardless of competence',
      'Engagement = Truth - sorting by likes instead of substance',
      'Thread Cherry-Picking - selecting only confirming tweets, ignoring criticism',
      'Recency Obsession - only tweets from the last 24h, ignoring valuable ones from a week ago'
    ],
    keyConcepts: [
      {term: 'Hype cycle', def: 'Trend lifecycle phase: day 1 explosion, day 7 backlash, day 30 silence. You need to know where you are on the curve.'},
      {term: 'Noise-to-signal ratio', def: 'The ratio of noise to valuable content - X has the highest of any research source.'},
      {term: 'Influencer Tier', def: 'Credibility hierarchy: tech creator - principal engineer - DevRel - content creator - commentator.'},
      {term: 'Validation status', def: 'Whether a finding is confirmed by another source or requires validation (VALIDATED/PARTIALLY/REQUIRES_VALIDATION).'},
      {term: 'Context collapse', def: 'No context in 280 characters - you have to read the whole thread and replies to avoid losing the meaning.'}
    ],
    stats: [
      {label: 'X users', value: '500M/month'},
      {label: 'Post half-life', value: '4.2 h'},
      {label: 'Load', value: '45/100'},
      {label: 'Cost/run', value: '0.03 USD'}
    ],
    bestFor: [
      'When you want to hear about new launches before blogs and documentation',
      'When you want to detect trends before they go mainstream',
      'When you want early warning on bugs and controversies'
    ],
    worstFor: [
      'When you\'re after deep, detailed analysis (280 characters is too little)',
      'When you want facts instead of opinion (X is full of hype and marketing)',
      'When you don\'t want to fight bots and manipulation'
    ],
    relatedAgents: ['res_reddit', 'res_forums', 'res_github'],
    glossary: [
      {term: 'hype_score', definition: 'A 0-10 scale rating the level of hype around a topic on X.'},
      {term: 'thread', definition: 'A multi-part X post - posts linked into a thread, the key format for technical analysis.'},
      {term: 'hot_take', definition: 'A fast, controversial opinion - usually oversimplified and requiring validation.'},
      {term: 'engagement_metrics', definition: 'Likes, retweets, replies, bookmarks - signals of interest, not of truth.'},
      {term: 'validation_status', definition: 'VALIDATED/PARTIALLY/REQUIRES_VALIDATION - whether the finding was confirmed by another source.'}
    ],
    learningQuote: 'X is the fastest medium, but that speed has a cost - speed without validation is risk, speed with validation is a competitive edge.',
    realExample: 'One day I caught a thread from an Anthropic principal engineer about new model routing 6 hours before the official blog post. I marked it VALIDATED after a cross-check with res_tech and the team was able to plan migration ahead of the competition.'
  },
  res_github: {
    tagline: 'Archaeologist of working code - digs up patterns from the best open-source repos',
    missionShort: 'The GitHub Researcher searches open-source repositories for working code, architecture, and patterns. Mission: deliver evidence as code, not opinion. Avoids the 90% of abandoned projects and recommends a TOP 5 with health scores.',
    whoIs: 'The GitHub Researcher is an archaeologist excavating the ruins of working applications. They don\'t read docs about how you should build - they dig up repositories and see how building actually happens. They look at the foundations, the tooling, the bugs, and the repair history. Docs say what should work, GitHub says what actually works in production.',
    analogy: 'The GitHub Researcher is the building inspector checking a house before you buy - not looking at fresh paint and the nice facade, but reaching under the README, into Issues, commits, and architecture. Only then do they say: this foundation is solid, or run before it collapses.',
    howItWorks: [
      {label: 'Repo search', desc: 'Breaks the question into sub-queries with GitHub operators (stars>100, pushed>date, language:typescript) and surfaces a TOP 10-15 of repositories.'},
      {label: 'Health filter', desc: 'Rejects abandoned projects - filters by metrics: stars >100, commits <6 months, MIT/Apache license. Leaves a TOP 5 for deep analysis.'},
      {label: 'Code analysis', desc: 'Reads README, package.json, the /src structure, .github/workflows. Reviews Issues (problems) and Pull Requests (how maintainers respond).'},
      {label: 'Cross-repo patterns', desc: 'Scores 8 health metrics and bus factor, and extracts patterns across the 5 repos - what repeats in 4 of 5. JSON report with recommendations.'}
    ],
    inputs: [
      'Research question (e.g., What architecture dominates SaaS repos)',
      'Technical keywords and architecture types',
      'Sometimes existing project code for comparison',
      'Team context (size, seniority) - optional'
    ],
    outputs: [
      'TOP 5 repositories with URL and metrics (stars, forks, last commit)',
      'Health_score 0-10, architecture, and tech stack per repo',
      'Notable Issues and code patterns recurring inside the repository',
      'Cross-repo patterns - patterns shared across all 5 repos (the key output)',
      'Recommendations, Risks, and Gaps'
    ],
    does: [
      'Finds working code across tens of millions of GitHub repositories',
      'Extracts architecture from real implementations (not textbook theory)',
      'Scores repository health using 8 metrics (health score)',
      'Identifies hidden problems by reading Issues',
      'Surfaces cross-repo patterns - what the best repos are doing',
      'Validates technology adoption by counting usage in top repos',
      'Scores risk - bus factor, community health, maintainer activity',
      'Delivers evidence as code, not opinion'
    ],
    doesNotDo: [
      'Does not copy code into the project (that\'s the Builder\'s job)',
      'Does not run code (npm test, docker compose up) - no Bash access',
      'Does not judge interface aesthetics (that\'s UX)',
      'Does not make decisions - recommends, the Orchestrator decides',
      'Does not search other researchers\' sources (each has their own turf)',
      'Does not treat a single repo as truth - compares minimum 5',
      'Does not ignore dates - a repo with no commits for 2 years is abandoned'
    ],
    antiPatterns: [
      'Star Worship - picking a repo purely by star count (15K stars, but abandoned since 2023)',
      'Blind Copy - recommending "copy the architecture from repo X" without analyzing context',
      'Abandoned Repo Adoption - recommending a repo with no commits in 2 years',
      'README Deception - judging a repo only by the README without checking code and Issues',
      'Single Repo Fixation - entire analysis on one repository, no comparison to alternatives'
    ],
    keyConcepts: [
      {term: 'bus_factor', def: 'Number of contributors who\'d have to leave for the project to die - 1 = critical risk.'},
      {term: 'cross_repo_pattern', def: 'A pattern recurring across multiple repositories (4/5 use Prisma = pattern).'},
      {term: 'health_score', def: 'A 0-10 repo health score based on 8 metrics: Stars, Last Commit, Issues, PRs, Contributors, License, Tests, README.'},
      {term: 'dependency_health', def: 'Whether the packages in package.json are actively maintained and whether they have known CVEs.'},
      {term: 'code_smell', def: 'Subtle architectural problems - poor separation of concerns, oversized components, no tests.'}
    ],
    stats: [
      {label: 'Repositories', value: '420M+'},
      {label: 'Abandoned', value: '90%'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you want to see how the best projects actually build',
      'When you\'re looking for reference architectures and code patterns',
      'When you want to verify whether a technology has adoption in top repos'
    ],
    worstFor: [
      'When you need quick answers (GitHub research takes 45-120s)',
      'When you want theory or benchmarks (that\'s Tech\'s domain)',
      'When the project is too new and has no public repos yet'
    ],
    relatedAgents: ['res_reddit', 'res_forums', 'res_tech'],
    glossary: [
      {term: 'fork', definition: 'A copy of a repository - if someone forks a repo, they\'re using it or want to modify it.'},
      {term: 'pull_request', definition: 'A proposed change - shows the code review culture and how maintainers communicate.'},
      {term: 'issue', definition: 'A problem reported by a user - Issues are a user interview with the repo\'s users.'},
      {term: 'health_score', definition: 'A 0-10 repo health score from 8 metrics: Stars, Last Commit, Issues, PRs, Contributors, License, Tests, README.'},
      {term: 'github_actions', definition: 'CI/CD automation - Workflows show whether the project has tests and how mature the process is.'}
    ],
    learningQuote: 'GitHub gives you real code, not theory - because code either works or it doesn\'t. A TOP 5 from GitHub is the anchor of the whole multi-agent analysis.',
    realExample: 'One day I compared the top 5 Next.js SaaS boilerplates and discovered that 4 of 5 use Prisma + tRPC + NextAuth - that was the cross-repo pattern that became the anchor recommendation for the startup\'s team.'
  },
  res_forums: {
    tagline: 'Tracker of traps and fixes - cataloging where everyone tripped and how they climbed out',
    missionShort: 'The Forums Researcher scans forums, blogs, and Q&A platforms for solved problems and hidden traps. Mission: deliver concrete, verified solutions with code. Every accepted StackOverflow answer is a problem solved in production.',
    whoIs: 'The Forums Researcher is the librarian of a technical library who knows every shelf not alphabetically, but by which books have dog-eared corners - because practitioners keep coming back to them. They search StackOverflow, Dev.to, Medium, and Hacker News. Every accepted answer is a verdict - a verified solution.',
    analogy: 'Documentation tells you the happy path. Forums tell you where everyone tripped - because behind every accepted StackOverflow answer there\'s a scar from a real production problem.',
    howItWorks: [
      {label: 'Sub-queries', desc: 'Breaks the question into platform-specific sub-queries and uses site:stackoverflow.com, site:dev.to, site:medium.com, site:news.ycombinator.com operators.'},
      {label: 'Quality filter', desc: 'Rejects questions without answers, posts older than 18 months, and answers with fewer than 5 votes. Pulls the content of the TOP 10-15 results.'},
      {label: 'Gotcha extraction', desc: 'Scores Answer Quality 1-10 and extracts gotchas - hidden traps like "it works BUT..." or "the docs say X, but in practice...".'},
      {label: 'Cross-validate and report', desc: 'Checks whether the same problem appears on 2+ platforms (SO+Dev.to = confidence 0.85). Formats a JSON report with TOP 10 takeaways.'}
    ],
    inputs: [
      'Research question (e.g., Problems migrating Prisma v5 to v6)',
      'Technical keywords',
      'Time window: last 12-18 months (older = risky)',
      'Sometimes a prior report for iteration'
    ],
    outputs: [
      'TOP 10 takeaways - practical solutions with links',
      'Answer_score, post_date, technology_version per finding',
      'Accepted flag - whether the asker confirmed it worked',
      'Gotchas - hidden traps (the most valuable part of the report)',
      'Cross-validated flag and confidence score 0.0-1.0'
    ],
    does: [
      'Finds verified solutions (accepted StackOverflow answers)',
      'Identifies recurring problems across platforms',
      'Extracts gotchas - hidden traps not mentioned in the docs',
      'Gathers step-by-step tutorials with concrete benchmarks',
      'Analyzes whether solutions are practically applicable',
      'Validates via cross-platform confirmation (SO + Dev.to + HN)',
      'Scores authors - whether senior engineer or beginner',
      'Skips stale content and deprecated APIs'
    ],
    doesNotDo: [
      'Does not read official documentation (that\'s Tech\'s domain)',
      'Does not look for visual inspiration (that\'s UX\'s domain)',
      'Does not analyze code in repositories (that\'s GitHub\'s domain)',
      'Does not make decisions - reports problems and solutions',
      'Does not talk to other researchers (isolation rule)',
      'Does not cite unanswered questions as evidence of problems',
      'Does not treat vote count as an absolute truth indicator'
    ],
    antiPatterns: [
      'Unanswered Echo - citing unanswered questions as proof a problem exists',
      'Upvote Worship - treating vote count as an absolute correctness indicator (500 votes from 2019 = stale)',
      'Medium Paywall Trap - citing paywalled articles without checking availability',
      'Outdated Tutorial - citing a tutorial for an old version of a technology as if it were current',
      'Single Source Syndrome - entire recommendation built on one forum post, no cross-validation'
    ],
    keyConcepts: [
      {term: 'accepted_answer', def: 'A StackOverflow answer marked by the asker as solving the problem - confirmation that it worked.'},
      {term: 'gotcha', def: 'A hidden trap that doesn\'t come from the official docs - the core value of forum research.'},
      {term: 'cross_platform_validation', def: 'Confirmation of a finding in more than one source (SO+Dev.to+HN = highest confidence).'},
      {term: 'practical_applicability', def: 'Whether a finding can be dropped into the project as-is without additional modification.'},
      {term: 'tutorial_freshness', def: 'Whether a tutorial is current - whether it applies to the current version of the technology (critical for fast-moving frameworks).'}
    ],
    stats: [
      {label: 'SO answers', value: '58M'},
      {label: 'Accepted', value: '8M+'},
      {label: 'Load', value: '50/100'},
      {label: 'Cost/run', value: '0.024 USD'}
    ],
    bestFor: [
      'When the docs describe the happy path but you want to know where people actually trip',
      'When you\'re looking for concrete, verified solutions with code',
      'When you want to hear about gotchas that aren\'t in the docs'
    ],
    worstFor: [
      'When you need fast answers (many searches and WebFetch calls)',
      'When you want official specifications and benchmarks (that\'s Tech\'s domain)',
      'When you\'re researching brand-new technology (still no SO questions)'
    ],
    relatedAgents: ['res_reddit', 'res_github', 'res_tech'],
    glossary: [
      {term: 'accepted', definition: 'An answer accepted by the asker - means it solved their problem.'},
      {term: 'upvote', definition: 'A supporting vote - but votes can be old and stale for new versions of a technology.'},
      {term: 'gotcha', definition: 'A hidden trap, e.g., revalidateTag() doesn\'t work in middleware.ts even though the docs don\'t say so.'},
      {term: 'cross_validation', definition: 'Confirmation of a finding in 2+ sources - raises the confidence score.'},
      {term: 'tutorial_freshness', definition: 'Whether the tutorial applies to the current version of the technology - critical for frameworks.'}
    ],
    learningQuote: 'Documentation tells you the happy path. Forums tell you where everyone tripped - every accepted StackOverflow answer is someone else\'s problem solved.',
    realExample: 'One day I found 8 threads on SO with the same gotcha: revalidateTag doesn\'t work in middleware.ts in Next.js 14. Every accepted answer pointed to a workaround in a route handler - it saved the team from a 3-day debugging session.'
  },
  res_docs: {
    tagline: 'A lawyer reading framework statutes - official sources only, zero gossip',
    missionShort: 'Researcher Docs gathers technical facts exclusively from official framework, library, and tool documentation. Its mission: deliver source of truth with paragraphs and links, not opinions. It operates on authorized vendor materials only.',
    whoIs: 'Researcher Docs is the archivist and librarian of internal technology knowledge. It behaves like a lawyer studying statutes and precedents - it does not care about gossip or forum opinions, only what the technology authors themselves wrote in getting started guides, API references, and release notes.',
    analogy: 'This agent is like a lawyer researching statutes - it does not quote TV commentators, only code paragraphs with section numbers and effective dates.',
    howItWorks: [
      {label: 'Source selection', desc: 'Locates official vendor documentation for the exact framework version in use. Rejects third-party tutorials and blog posts because they are not source of truth.'},
      {label: 'Fragment extraction', desc: 'Pulls getting started guides, best practices, performance tips, security guidelines, and ready-to-use config snippets. Every fragment is tagged with a link to its paragraph.'},
      {label: 'Version verification', desc: 'Checks that documentation matches the framework version in the project. Docs for Next.js 13 in a Next.js 15 project is false information.'},
      {label: 'Structured reference', desc: 'Builds an index with multiple sources, precise quotes, and URL links. Format: fragment + source + version + fetch date.'}
    ],
    inputs: [
      'Technical question about a framework or library specification',
      'Framework version used in the project (critical for accuracy)',
      'List of topics to cover (setup, config, security, perf)',
      'Optional context from Researcher Tech with candidate list'
    ],
    outputs: [
      'Index of documentation fragments with links to paragraphs',
      'Config snippets with working code examples',
      'Best practices and performance tips from official sections',
      'Security guidelines from official security advisories',
      'List of framework versions and documentation publication dates'
    ],
    does: [
      'Gathers information exclusively from official framework and library documentation',
      'Extracts best practices, performance tips, and security guidelines from vendor sections',
      'Documents config snippets with working examples and version numbers',
      'Builds a structured reference guide with multiple sources and precise links',
      'Verifies documentation currency against the framework version in the project',
      'Cites API reference paragraphs for every technical claim',
      'Identifies release notes and migration guides for major versions',
      'Maps the ecosystem of plugins and extensions officially recommended by the vendor'
    ],
    doesNotDo: [
      'Does not quote user opinions or forum posts (that is Researcher Forum territory)',
      'Does not compare technologies or run pros/cons analysis (that is Researcher Tech territory)',
      'Does not implement code or integrate libraries (that is Builder territory)',
      'Does not subjectively rate framework quality, only reports facts from docs',
      'Does not collect gossip from Reddit or X/Twitter (other research domains)',
      'Does not mix versions - never cites docs for an outdated version',
      'Does not interpret documentation creatively, only quotes verbatim with context'
    ],
    antiPatterns: [
      'Version Mismatch - quoting docs for Next.js 13 when the project uses Next.js 15, totally false info.',
      'Docs Tunnel Vision - official documentation often omits edge cases and real-world gotchas, it is not omniscient.',
      'Stale Snapshot - fetching docs once and quoting them half a year later without verifying release note changes.',
      'Tutorial Trap - sliding into blog posts under the pretext of official docs just because they link to the official site.',
      'Marketing Page Confusion - quoting the vendor marketing section instead of the technical API reference.'
    ],
    keyConcepts: [
      {term: 'Source of truth', def: 'The authorized vendor source of a technology, from which there is no further appeal.'},
      {term: 'API reference', def: 'Full specification of functions, classes, parameters, and types with usage examples.'},
      {term: 'Release notes', def: 'List of changes between versions - critical for assessing breaking changes.'},
      {term: 'Version pinning', def: 'Citing documentation together with the framework version number used in the project.'},
      {term: 'Migration guide', def: 'Official walkthrough for moving from version X to version Y with a change list.'}
    ],
    stats: [
      {label: 'Sources', value: 'Official'},
      {label: 'Extraction type', value: 'Quotes + links'},
      {label: 'Load', value: '40/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'When you need hard technical facts backed by paragraphs from vendor docs',
      'When the project must follow official best practices (security, performance, a11y)',
      'When picking framework configuration and you want ready snippets from the API reference'
    ],
    worstFor: [
      'When you want real practitioner experience from production (that is Researcher Reddit and Forum)',
      'When comparing competing frameworks and need a recommendation (that is Researcher Tech)',
      'When you care about edge cases and gotchas omitted from official materials'
    ],
    relatedAgents: ['res_tech', 'res_forums', 'res_critic'],
    glossary: [
      {term: 'docs', definition: 'Official technical documentation maintained by the framework or library vendor.'},
      {term: 'changelog', definition: 'Chronological log of changes between versions - the source of truth for breaking changes.'},
      {term: 'api', definition: 'Application Programming Interface - the contract of function calls and data types.'},
      {term: 'snippet', definition: 'Ready-to-paste fragment of code from official documentation, usually with comments.'},
      {term: 'semver', definition: 'Semantic Versioning - the MAJOR.MINOR.PATCH convention determining version compatibility.'}
    ],
    learningQuote: 'Vendor documentation is the constitution of a technology - not everyone loves it, but every other source falls back to it when a dispute arises.',
    realExample: 'Imagine that one day I was gathering config for Postgres 16 and found a paragraph in the official release notes about a change in the default logical replication slot. Pasting it into the report saved the team two days of debugging, because their migration was using the old default from version 15.'
  },
  res_critic: {
    tagline: 'A peer reviewer before publication - catches every contradiction and bias in research reports',
    missionShort: 'Research Critic validates the outputs of all researchers, hunting for contradictions, confirmation bias, gaps, and outdated sources. Its mission: protect the project from weak research that would propagate into architectural decisions. Highest load in the RESEARCH layer (85/100).',
    whoIs: 'Research Critic is an auditor agent that behaves like a peer reviewer before publication in Nature. It reads reports simultaneously from the perspective of a methodologist, a statistician, and a domain expert. It does not run its own research - it audits others and flags every claim without evidence.',
    analogy: 'This agent is like a peer reviewer before publication - it does not run the experiment, but it will catch every chart without error bars and every claim without a citation.',
    howItWorks: [
      {label: 'Report intake', desc: 'Receives outputs from 6 researchers (Tech, UX, Reddit, X, GitHub, Forum, Docs) and loads them all at once. It must see the whole ecosystem, because contradictions only show up in comparison.'},
      {label: 'Cross-validation', desc: 'Hunts for contradictions between reports (e.g. Tech recommends React, Reddit complains about React). Every contradiction is flagged for resolution.'},
      {label: 'Rubric scoring', desc: 'Scores each report against the rubric: Completeness 25%, Accuracy 25%, Relevance 20%, Freshness 20%, Actionability 10%. A sum below 6/10 triggers REVISE.'},
      {label: 'Critic report', desc: 'Produces CRITIC.md with a list of contradictions, data gaps, identified biases, and a PASS or REVISE recommendation per researcher.'}
    ],
    inputs: [
      'A set of 3-7 reports from researchers (Tech, UX, Reddit, X, GitHub, Forum, Docs)',
      'The original research question set by the Orchestrator',
      'Scoring rubric with weights (Completeness, Accuracy, Relevance, Freshness, Actionability)',
      'Optional previous report versions from iteration history'
    ],
    outputs: [
      'CRITIC.md with a PASS or REVISE verdict per researcher',
      'List of contradictions between reports with citations',
      'List of gaps - what nobody investigated and what is missing',
      'Per-report score on a 0-10 scale with reasoning per dimension',
      'Recommendations for follow-up iterations or delta research'
    ],
    does: [
      'Cross-validates 3-7 researcher reports looking for contradictions and conflicts',
      'Rates source credibility - currency, independence, author track record',
      'Identifies confirmation bias - did the researcher seek evidence for a thesis or actual facts',
      'Applies rubric scoring with Completeness/Accuracy/Relevance/Freshness/Actionability weights',
      'Detects gaps - questions left unanswered and areas not investigated',
      'Flags stale data - benchmarks older than 2 years, EOL framework versions',
      'Distinguishes CRITICAL from NICE-TO-HAVE in reports, does not block over cosmetics',
      'Recommends delta research on specific gaps instead of repeating the whole thing'
    ],
    doesNotDo: [
      'Does not run its own research - it audits others, never duplicates work',
      'Does not make technology decisions - it flags issues, the call belongs to the Orchestrator',
      'Does not write code or implement anything - pure analytical auditor role',
      'Does not accept reports without deep analysis - rubber stamping is an anti-pattern',
      'Does not meddle with researcher tools - it judges the output, not the collection method',
      'Does not judge report writing style, only content and source credibility',
      'Does not communicate with researchers - isolation rule, works offline with text'
    ],
    antiPatterns: [
      'Rubber Stamp - accepting reports without deep analysis, letting weak research slip into the Build phase.',
      'Overcritical Block - blocking progress over minor issues without distinguishing CRITICAL from NICE-TO-HAVE.',
      'Single-Source Trust - accepting a claim because one researcher supports it while ignoring three others who contradict it.',
      'Groupthink Validation - marking reports as consistent when they simply copied the same error from a bad source.',
      'Vintage Bias - treating an older source as more authoritative, ignoring that it is from pre-LLM times.'
    ],
    keyConcepts: [
      {term: 'Cross-validation', def: 'Comparing conclusions from multiple independent reports to detect contradictions.'},
      {term: 'Confirmation bias', def: 'Seeking evidence that confirms a predetermined thesis instead of objective assessment.'},
      {term: 'Rubric scoring', def: 'Scoring each report along fixed dimensions with weighted point values.'},
      {term: 'Source credibility', def: 'Evaluating a source by currency, independence, and author track record.'},
      {term: 'Gap analysis', def: 'Identifying questions left unanswered by all researchers.'}
    ],
    stats: [
      {label: 'Reports per session', value: '3-7'},
      {label: 'REVISE threshold', value: '<6/10'},
      {label: 'Load', value: '85/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you have a full set of reports from multiple researchers and want to verify their consistency',
      'When stakes are high and weak research would cost weeks of work in the Build phase',
      'When you need an objective PASS or REVISE verdict before moving into a Five Minds debate'
    ],
    worstFor: [
      'When you have only one report (nothing to cross-validate, no comparison basis)',
      'When the task is simple and formal critique would stretch the pipeline without value',
      'When you need fresh data collection (that is researcher territory, not critic)'
    ],
    relatedAgents: ['synthesizer', 'res_tech', 'expert_devil'],
    glossary: [
      {term: 'rubric', definition: 'Standardized set of scoring criteria with weights, used by peer reviewers.'},
      {term: 'peer review', definition: 'Process of evaluating work by independent experts in the same field.'},
      {term: 'bias', definition: 'Systematic distortion of conclusions caused by author or source prejudice.'},
      {term: 'gap', definition: 'Knowledge gap - an area not investigated by any researcher in a given session.'},
      {term: 'revise', definition: 'Verdict that sends a report back to the author with a list of required fixes before acceptance.'}
    ],
    learningQuote: 'Weak research is worse than no research - no research forces caution, while weak research gives a false sense of certainty.',
    realExample: 'Imagine that one day I audited 6 reports on ORM selection and found that Tech was citing 2022 benchmarks while Reddit and GitHub reported that since 2024 those same libraries are slow in connection pooling mode. I flagged it as CRITICAL and the team avoided deploying a tool that no longer meets SLA.'
  },
  backend: {
    tagline: 'A session musician of code - turns specs into working software without improvising',
    missionShort: 'Backend Dev is the first agent of the BUILD layer and materializes plans into running code. Its mission is to implement APIs, data schemas, validation, and business logic according to spec. It does not design, does not research - it executes with surgical precision.',
    whoIs: 'Backend Dev behaves like a master carpenter or a surgical resident - it receives a precise blueprint from the Planner and executes it without questioning the strategy. This is the agent where plans stop being documents and become software you can actually run.',
    analogy: 'This agent is like a surgical resident who executes the operation plan with precision - it does not change the strategy, it just carries it out flawlessly step by step.',
    howItWorks: [
      {label: 'Reading the spec', desc: 'Loads the spec from the Planner and MANIFEST.md. Identifies functional requirements, data schemas, API contracts, and constraints.'},
      {label: 'Writing code', desc: 'Creates new files (Write) and modifies existing ones (Edit) implementing endpoints, validation, and business logic in the master-carpenter style.'},
      {label: 'Run and test', desc: 'Runs the code via Bash (node, python, npm run build), verifies zero errors, and checks basic functionality plus edge cases.'},
      {label: 'QA loop', desc: 'Has a maximum of two iterations to fix issues after a QA report. After the second iteration, errors escalate to the Orchestrator.'}
    ],
    inputs: [
      'Technical spec from the Planner or Orchestrator',
      'Design tokens and components from the Designer',
      'MANIFEST.md with requirements and contracts',
      'Error report from QA in the feedback loop'
    ],
    outputs: [
      'Working backend source files (JS, Python, Go)',
      'API endpoints with input and output validation',
      'Data schemas and database migrations',
      'Inline JSDoc comments for public functions',
      'Logs from execution and basic tests'
    ],
    does: [
      'Implements REST endpoints and business logic according to spec',
      'Builds input validation schemas using Zod, Pydantic, or Joi',
      'Runs code via Bash verifying zero runtime errors',
      'Writes error handling with specific HTTP codes and structured responses',
      'Adds inline comments for complex logic and public API',
      'Modifies existing files precisely with the Edit tool instead of overwriting',
      'Reads project context (Read) to reuse existing patterns',
      'Iterates on QA fixes at most twice before escalating the problem'
    ],
    doesNotDo: [
      'Does not research technologies (that is Researcher Tech territory)',
      'Does not make architectural decisions (that is Planner territory)',
      'Does not design UI or CSS (that is Designer territory)',
      'Does not write README or external documentation (that is Writer territory)',
      'Does not merge the work of other builders (that is Integrator territory)',
      'Does not run security audits or pentests (that is QA Security territory)',
      'Does not improvise or question the spec - it implements'
    ],
    antiPatterns: [
      'Premature Optimization - optimizing a non-existent bottleneck instead of a simple spec-compliant implementation.',
      'Stringly Typed API - passing everything as strings instead of types, enums, and structured objects.',
      'Naked Response - returning raw results without a wrapper, status, version, or error handling.',
      'Scope Creep - writing code beyond the spec, adding nice features nobody ordered.',
      'Silent Failure - catching exceptions without logging and without propagating the error to the API layer.'
    ],
    keyConcepts: [
      {term: 'Spec as score', def: 'Backend Dev plays exactly what is written - it does not improvise like a composer, it executes like a session musician.'},
      {term: 'QA loop', def: 'At most two fix iterations after an audit, then escalation to the Orchestrator with an error report.'},
      {term: 'Inline docs', def: 'Comments only for non-trivial logic and public API, never for obvious instructions.'},
      {term: 'Idempotency', def: 'PUT and DELETE endpoints must yield the same result regardless of how many times they are called.'},
      {term: 'Separation of concerns', def: 'Routing, validation, business logic, and data layer are separated and tested independently.'}
    ],
    stats: [
      {label: 'Input tokens', value: '20-40k'},
      {label: 'Output tokens', value: '10-30k'},
      {label: 'Load', value: '75/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you have a finished spec and need working backend code',
      'When you want an API implementation matching the contract without improvisation',
      'When you need validation, error handling, and inline docs baked into the code'
    ],
    worstFor: [
      'When you do not yet know which technology to pick (use Researcher Tech)',
      'When you need architectural decisions (ask the Planner or Analyst)',
      'When you want beautiful CSS and animations (that is Designer, not Backend Dev)'
    ],
    relatedAgents: ['db_architect', 'integrator', 'qa_quality'],
    glossary: [
      {term: 'endpoint', definition: 'An API address handling a specific operation, e.g. POST /api/users for creating a user.'},
      {term: 'validation', definition: 'Checking the shape and type of input data before handing it off to business logic.'},
      {term: 'migration', definition: 'A script that changes the database schema in a repeatable and reversible way.'},
      {term: 'lint', definition: 'Automatic check of code style and static errors, e.g. ESLint for JavaScript.'},
      {term: 'Sonnet', definition: 'Mid-tier Claude model, the tradeoff between code quality and call cost.'}
    ],
    learningQuote: 'Backend Dev does not question the plan - it executes it with precision. Its value lies not in creativity but in flawless execution.',
    realExample: 'Imagine that one day I received a spec for a POST /api/users endpoint with Zod validation and handling of five error codes. I implemented it in 30 minutes, ran it with node app.js, verified the edge case with an empty email, and handed it to QA. First iteration - three small fixes. Second iteration - zero bugs. The code shipped to the Integrator.'
  },
  frontend: {
    tagline: 'A furniture carpenter for UI - components beautiful, accessible, and fast from line one',
    missionShort: 'Frontend Dev implements the client layer mobile-first. It builds reusable React/Vue components with handling for all states (loading, error, empty, success). Its mission: deliver an interface where accessibility and performance are built in, not bolted on at the end.',
    whoIs: 'Frontend Dev is the craftsman of the layer users actually see. It behaves like a furniture carpenter making custom pieces - every component must be beautiful, comfortable, durable, and fit the room (layout). It does not design - it receives tokens from the Designer and implements them.',
    analogy: 'This agent is like a furniture carpenter - it receives the design from an interior architect (Designer) and builds a piece that is beautiful, ergonomic, and fits the room.',
    howItWorks: [
      {label: 'Design system analysis', desc: 'Reads Designer tokens: palette, typography, grid, spacing, radii, and shadows. Without a design system it does not start work, because the result would be inconsistent UI.'},
      {label: 'Component skeleton', desc: 'Builds reusable components from the smallest (Button, Input) to the complex (Form, Table). Every component has props, states, and aria attributes from the start.'},
      {label: 'States and edge cases', desc: 'Implements four states per component: loading (spinner/skeleton), error (message + retry), empty (empty state + CTA), success (data). Without this the UI is not ready.'},
      {label: 'Performance and a11y', desc: 'Adds lazy loading, code splitting, image optimization. Verifies keyboard navigation, focus traps, aria-live, and WCAG AA contrasts.'}
    ],
    inputs: [
      'Design system with CSS tokens (palette, typography, grid)',
      'Component spec with wireframes and mockups',
      'API contracts from Backend Dev (endpoints, payloads, errors)',
      'Accessibility requirements (WCAG 2.2 AA minimum) and target devices'
    ],
    outputs: [
      'React/Vue/Svelte components with props and states',
      'CSS/SCSS/Tailwind files implementing design tokens',
      'Component tests (React Testing Library, Vitest)',
      'Component usage docs (Storybook or MDX)',
      'Lighthouse report with Core Web Vitals metrics'
    ],
    does: [
      'Implements responsive mobile-first layout (60%+ of traffic is mobile in 2026)',
      'Builds reusable components handling loading/error/empty/success states',
      'Ensures accessibility: aria-labels, keyboard navigation, focus management, skip links',
      'Optimizes performance: lazy loading, code splitting, image optimization, tree shaking',
      'Implements the Designer design system with CSS tokens and typography',
      'Integrates frontend API calls to backend endpoints with error handling',
      'Writes unit tests for components (React Testing Library, Vitest)',
      'Enforces Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1 as the baseline goal'
    ],
    doesNotDo: [
      'Does not design the interface look (that is Designer territory)',
      'Does not implement the server API or business logic (that is Backend Dev territory)',
      'Does not write security tests or OWASP audits (that is QA Security territory)',
      'Does not pick the framework stack (that is Orchestrator territory with research)',
      'Does not implement real-time WebSocket or D3 visualizations (that is Feature Dev territory)',
      'Does not manage the database or schema (that is Backend or DB Architect territory)',
      'Does not rate the performance of the whole system (that is QA Performance territory)'
    ],
    antiPatterns: [
      'Desktop-First - designing for desktop and adapting to mobile, instead of mobile-first as the 2026 standard.',
      'Prop Drilling Hell - passing props through 5+ component levels instead of using context or state management.',
      'Accessibility Afterthought - adding a11y at the end instead of building it in from the start (retrofit is 10x more expensive).',
      'CSS Nuclear War - using !important everywhere instead of CSS cascade and specificity.',
      'Loading State Missing - rendering undefined instead of a skeleton while data is in flight to the API.'
    ],
    keyConcepts: [
      {term: 'Mobile-first', def: 'Starting design on a small screen and expanding to desktop with min-width media queries.'},
      {term: 'Design tokens', def: 'CSS variables defining palette, typography, grid, and spacing - the single source of truth for style.'},
      {term: 'Core Web Vitals', def: 'Three Google metrics rating UX: LCP (loading), FID (responsiveness), CLS (stability).'},
      {term: 'WCAG 2.2 AA', def: 'W3C accessibility standard defining contrasts, keyboard nav, and media alternatives.'},
      {term: 'Code splitting', def: 'Splitting the JS bundle into smaller chunks loaded on demand, cutting time to interactive.'}
    ],
    stats: [
      {label: 'LCP target', value: '<2.5s'},
      {label: 'Bundle target', value: '<250KB gzip'},
      {label: 'Load', value: '70/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you want to build the visible layer of a web app with React/Vue/Svelte components',
      'When you have a finished design system from the Designer and need a faithful implementation',
      'When the project demands high accessibility and performance with Core Web Vitals metrics'
    ],
    worstFor: [
      'When you need real-time WebSocket, AI streaming, or D3 visualizations (that is Feature Dev)',
      'When you need to design a design system from scratch without a designer (that is Designer)',
      'When the task is only backend API with no UI (that is Backend Dev)'
    ],
    relatedAgents: ['designer', 'backend', 'feature'],
    glossary: [
      {term: 'component', definition: 'An independent, reusable UI unit with its own state, props, and styles.'},
      {term: 'props', definition: 'Parameters passed to a component from its parent in React or Vue.'},
      {term: 'hydration', definition: 'Process of activating JavaScript interactivity on static HTML rendered by SSR.'},
      {term: 'ssr', definition: 'Server-Side Rendering - generating HTML on the server before sending it to the browser.'},
      {term: 'a11y', definition: 'Short for accessibility - techniques ensuring UI is usable by people with disabilities.'}
    ],
    learningQuote: 'An interface without a loading state is a lie - the user sees a blank screen and assumes the app broke, when in fact the data is just in flight from the server.',
    realExample: 'Imagine that one day I was building a user table in React and added four states: skeleton during loading, error with retry button, empty state with Add User CTA, success with the table. The same function works on mobile at 320px and on a 4K desktop, because I started from a mobile-first grid.'
  },
  feature: {
    tagline: 'A special effects specialist - WebSocket, AI streaming, D3, OAuth',
    missionShort: 'Feature Dev implements advanced functionality that requires niche expertise: real-time, AI/ML integrations, data visualization, third-party APIs. Its mission: do the things a regular Backend or Frontend Dev cannot. It steps in when you need to go beyond standard CRUD.',
    whoIs: 'Feature Dev is a specialist agent, like a special effects engineer in film. It behaves like a pyrotechnician wiring an explosion scene - it does things a regular camera operator cannot. WebSocket, AI streaming, and D3 are the explosions, and they demand different expertise than standard CRUD.',
    analogy: 'This agent is like a special effects specialist in film - it does not shoot the dialog, but without it there would be no explosion scene that defines the whole movie.',
    howItWorks: [
      {label: 'Niche analysis', desc: 'Identifies the niche requirement - is it WebSocket, LLM streaming, data visualization, or OAuth flow. Based on type it picks a specialized library and protocol.'},
      {label: 'Dry-run prototype', desc: 'Builds a minimal working prototype (e.g. WebSocket echo, D3 hello world, mock OAuth) to verify the library fits the stack with no showstoppers.'},
      {label: 'Project integration', desc: 'Wires the prototype to real endpoints, data, and UI. Implements reconnection handling, retries, streaming chunks, and edge cases specific to the niche.'},
      {label: 'Handoff and docs', desc: 'Passes the code to the Integrator with a note on how the library works and what not to do. Records the decision (e.g. why WebSocket over SSE) in a decision record.'}
    ],
    inputs: [
      'Spec of the niche requirement (real-time, AI, visualization, integration)',
      'Context from Backend and Frontend Dev about existing endpoints and UI',
      'Research from Researcher Tech about candidate libraries',
      'Performance, token budget, or API rate limit constraints'
    ],
    outputs: [
      'Real-time implementation (WebSocket, SSE) with reconnection logic',
      'AI/ML integration with streaming, function calling, and rate limiting',
      'Data visualizations (D3.js, Chart.js, SVG, Canvas) with interactions',
      'Third-party API integrations (Stripe, OAuth, webhooks)',
      'Decision record explaining the choice of library and protocol'
    ],
    does: [
      'Implements real-time features: WebSocket, Server-Sent Events, long polling with reconnection',
      'Integrates AI/ML: streaming API calls, embeddings, function calling, prompt chaining',
      'Builds data visualizations with D3.js, Chart.js, SVG, Canvas, and interactions',
      'Integrates third-party APIs: Stripe, Firebase, AWS SDK, OAuth flows, webhook handlers',
      'Implements specialized libraries: PDF generation, image processing, email templates',
      'Picks libraries with care for bundle size and open source licenses',
      'Writes adapters for niche protocols so the rest of the code does not need to know about them',
      'Documents decision records for library choices (e.g. why Chart.js over Recharts)'
    ],
    doesNotDo: [
      'Does not build basic CRUD and standard REST APIs (that is Backend Dev territory)',
      'Does not design UI or design system (that is Designer territory)',
      'Does not run library research from scratch (that is Researcher Tech territory)',
      'Does not replace the Integrator - it merges its own work with the system but does not run integration',
      'Does not implement security tests (that is QA Security territory)',
      'Does not write user documentation (that is Writer territory)',
      'Does not take over CRUD tasks just because it is already in the repo (scope invasion)'
    ],
    antiPatterns: [
      'Overengineering - WebSocket where polling every 30s would do, because not every page needs real-time.',
      'Library Bloat - adding a 200KB dependency for 3 lines of code instead of writing it natively.',
      'Scope Invasion - taking CRUD tasks from Backend Dev under the pretext of already being in the repo.',
      'Vendor Lock-in Amnesia - integrating with a closed SDK without an adapter, making it impossible to switch providers.',
      'Stream Without Backpressure - AI streaming with no chunk limit, flooding tokens and blocking the UI.'
    ],
    keyConcepts: [
      {term: 'Real-time', def: 'Communication with latency under 100ms, usually via WebSocket, SSE, or WebRTC.'},
      {term: 'LLM streaming', def: 'Receiving model output chunk by chunk live, instead of waiting for the full response.'},
      {term: 'Function calling', def: 'LLM API mechanism where the model can invoke defined functions on the application side.'},
      {term: 'OAuth flow', def: 'Permission delegation protocol between a client app and a third-party service (e.g. Google).'},
      {term: 'Webhook', def: 'HTTP endpoint that an external service calls when an event happens (e.g. a Stripe payment).'}
    ],
    stats: [
      {label: 'Specialization', value: 'Niche'},
      {label: 'Typical libraries', value: 'D3, socket.io, OpenAI SDK'},
      {label: 'Load', value: '65/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you need real-time (chat, live dashboard, multi-user collaboration on one document)',
      'When integrating an LLM with streaming, function calling, or embeddings for semantic search',
      'When building D3/Chart.js data visualizations Frontend Dev will not touch'
    ],
    worstFor: [
      'When the task is standard CRUD over REST (that is Backend Dev, Feature is overkill)',
      'When you need a UI design from scratch (that is Designer)',
      'When you only need documentation or a README (that is Writer)'
    ],
    relatedAgents: ['backend', 'frontend', 'integrator'],
    glossary: [
      {term: 'websocket', definition: 'Full-duplex communication protocol between browser and server over a single TCP connection.'},
      {term: 'sse', definition: 'Server-Sent Events - one-way stream of data from server to client over HTTP.'},
      {term: 'embedding', definition: 'Numeric vector representing text in semantic space, used in search.'},
      {term: 'oauth', definition: 'Open standard for permission delegation, enabling login via Google, GitHub, Microsoft.'},
      {term: 'bundle size', definition: 'Size of the final JS file loaded into the browser, critical for time to interactive.'}
    ],
    learningQuote: 'Every niche library is a technical debt to pay off - pick it only when the native solution no longer cuts it.',
    realExample: 'Imagine that one day I added streaming responses from the Claude API into a chat, and instead of waiting 8 seconds for the full reply, the user saw the first words after 400ms. The UX improvement was dramatic, but it required backpressure and chunk buffering on the frontend side.'
  },
  designer: {
    tagline: 'App interior architect - turns mood boards into working CSS and design tokens',
    missionShort: 'Designer is the visual implementation agent in the BUILD layer. It takes UX Researcher reports and converts them into working CSS, design tokens, color palettes, typography, and animations. It is the bridge between visual inspiration and production code.',
    whoIs: 'Designer is an AI agent that behaves like an interior architect or a film colorist. The client brings a mood board and Designer picks the exact shade, the exact fabric, the exact animation curve. It does not hunt for inspiration - it implements based on the research the UX Researcher already did.',
    analogy: 'This agent is like a print shop typesetter who does not write the content but makes the text look professional on the page through the right fonts, spacing, and rhythm.',
    howItWorks: [
      {label: 'Reading the UX report', desc: 'Loads the UX Researcher report with trends, palette, and accessibility requirements. Identifies the aesthetic direction and the constraints.'},
      {label: 'Three-tier tokens', desc: 'Builds three token tiers - primitive (slate-900), semantic (color-text), and component (button-bg). Changing the middle tier propagates across the entire project.'},
      {label: 'Typography and spacing system', desc: 'Defines font scale, line-height, 4px base grid, layout container, and responsive breakpoints. Implements a system, not individual pages.'},
      {label: 'Animations and a11y', desc: 'Adds micro-interactions that respect prefers-reduced-motion, focus-visible 2px outlines, and minimum 44x44px targets per WCAG.'}
    ],
    inputs: [
      'UX Researcher report with trends and mood board',
      'WCAG 2.1 AA accessibility requirements',
      'MANIFEST.md with brand and platform constraints',
      'Integrator feedback on visual conflicts'
    ],
    outputs: [
      'Complete design system in a tokens.css file',
      'Primitive, semantic, and component color palette',
      'Typography system with font scale and line heights',
      'Utility classes for grid, flex, container, and spacing',
      'Animations with prefers-reduced-motion and focus-visible'
    ],
    does: [
      'Creates design tokens in three tiers (primitive, semantic, component)',
      'Defines a color palette with success, error, warning tokens and neutrals',
      'Designs a typography scale with responsive sizes',
      'Implements a spacing scale on a 4px grid (space-1 through space-16)',
      'Writes micro-animations with transition and keyframes for cards and buttons',
      'Ensures minimum 4.5:1 contrast and focus-visible on every interactive element',
      'Adds a prefers-reduced-motion media query that disables animations for sensitive users',
      'Creates container, grid-auto, and breakpoint utilities for responsiveness'
    ],
    doesNotDo: [
      'Does not hunt for inspiration or trends (that is the UX Researcher\'s job)',
      'Does not write JavaScript logic (that is Backend Dev and Frontend Dev)',
      'Does not produce text content (that is the Writer\'s job)',
      'Does not merge CSS with HTML into the final artifact (that is the Integrator\'s job)',
      'Does not audit visual a11y on the finished product (that is QA Quality\'s job)',
      'Does not draw mockups in Figma - it generates CSS code',
      'Does not define content copywriting inside tokens'
    ],
    antiPatterns: [
      'Inconsistent Spacing - mixing 12px, 13px, 14px, 15px instead of sticking to a 4px or 8px grid.',
      'Invisible Errors - an error message with no icon, no color, and no contrast, lost in the layout.',
      'Hero Section Addiction - treating every page like a landing page with a huge header eating 80 percent of the screen.',
      'Low Contrast Ignored - gray text on a light-gray background at 2:1 contrast instead of the required 4.5:1.',
      'Magic Number Hell - 37px, 129px, 0.618rem values in CSS instead of semantic tokens.'
    ],
    keyConcepts: [
      {term: 'Design tokens', def: 'CSS variables that hold design values in one place - the project\'s dictionary of colors, sizes, and distances.'},
      {term: 'Three tiers', def: 'Primitive (blue-500), semantic (color-primary), and component (button-bg) - a change in the middle tier propagates across the whole system.'},
      {term: '4px grid', def: 'Every spacing value is a multiple of 4px, which gives visual regularity and a predictable rhythm.'},
      {term: 'WCAG AA', def: 'Minimum 4.5:1 contrast for text and 44x44px targets for interactive elements.'},
      {term: 'Motion safety', def: 'Respecting prefers-reduced-motion and shortening animations to 0.01ms for sensitive users.'}
    ],
    stats: [
      {label: 'Input tokens', value: '15-30k'},
      {label: 'Output tokens', value: '8-20k'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you need a consistent design system in the form of CSS tokens',
      'When you want animations and micro-interactions that respect a11y',
      'When you want to swap the entire color palette by editing a single tokens.css file'
    ],
    worstFor: [
      'When you do not yet have UX research and trends (ask UX Researcher first)',
      'When you need Figma mockups instead of CSS code',
      'When you want copywriting and microcopy (that is the Writer)'
    ],
    relatedAgents: ['res_ux', 'frontend', 'integrator'],
    glossary: [
      {term: 'token', definition: 'A CSS variable in :root that holds a design value, e.g. --color-primary: #2563eb.'},
      {term: 'primitive', definition: 'The first tier of tokens - raw values like blue-500 sitting in isolation from meaning.'},
      {term: 'semantic', definition: 'The second tier of tokens that gives meaning to primitives - e.g. color-primary points to blue-500.'},
      {term: 'focus visible', definition: 'A CSS pseudo-class that shows a focus ring only for keyboard users, not mouse users.'},
      {term: 'reduced motion', definition: 'A system preference that disables animations for users with epilepsy and vestibular disorders.'}
    ],
    learningQuote: 'A design system is not a collection of pretty screens - it is a dictionary that lets you change an entire product with one line of CSS.',
    realExample: 'Imagine that one day I got a UX Researcher report with a Slate plus Amber accent direction and a glassmorphism trend. I built three token tiers, an Inter typography scale, a 4px spacing grid, and card animations that respect prefers-reduced-motion. Later, changing the primary color from blue to green took a single line of code.'
  },
  integrator: {
    tagline: 'Film editor of the system - merges parallel workers\' output into a single coherent artifact',
    missionShort: 'Integrator is the last agent in the BUILD layer and the gate between BUILD and QA. It combines code from Backend Dev, CSS from Designer, and content from Writer into one working product. It resolves conflicts, validates compliance with MANIFEST.md, and runs E2E tests on the whole thing.',
    whoIs: 'Integrator is the conductor of the dress rehearsal and the head chef on plating night. It is the ONLY BUILD agent that sees every other worker\'s output at the same time - which is why it finds the places where elements clash and composes them into a harmonious whole.',
    analogy: 'This agent is like a film editor who takes hours of raw camera footage, sound, and music and assembles a movie - because each of those pieces alone is not yet cinema.',
    howItWorks: [
      {label: 'Collects outputs', desc: 'Pulls HTML/JS from Backend Dev, CSS from Designer, and content from Writer. As the only builder it sees all three streams of work together.'},
      {label: 'Resolves conflicts', desc: 'Identifies contradictions - class names do not match, a title overflows its container, text bleeds into white space. Picks the minimal fix that respects every worker\'s intent.'},
      {label: 'Runs E2E tests', desc: 'Launches the integrated artifact (via Bash), checks links, verifies CSS, tests interactive elements, and checks responsiveness.'},
      {label: 'Validates MANIFEST', desc: 'Checks that every requirement in MANIFEST.md is reflected in the artifact. Produces the final handoff package for the QA layer with a report of conflicts and tests.'}
    ],
    inputs: [
      'HTML, JS, and backend code from Backend Dev',
      'CSS tokens and components from Designer',
      'Content, README, and inline comments from Writer',
      'MANIFEST.md with requirements to validate against'
    ],
    outputs: [
      'Integrated artifact ready for the QA layer',
      'Report of conflicts resolved between workers',
      'E2E test log (links, CSS, interactions, responsiveness)',
      'Confirmation of MANIFEST.md compliance',
      'Escalation list if conflicts are fundamental'
    ],
    does: [
      'Merges three builders\' outputs into one coherent artifact',
      'Resolves class-name, size, and intent conflicts with minimal changes',
      'Runs E2E tests in a test environment via Bash',
      'Verifies every MANIFEST.md requirement as a checklist item',
      'Adds text-overflow ellipsis and tooltips when text does not fit the layout',
      'Preserves every worker\'s intent instead of forcing one perspective',
      'Escalates fundamental conflicts to the Orchestrator with a clear report',
      'Produces documentation of the changes it made during integration'
    ],
    doesNotDo: [
      'Does not write new code from scratch (that is Backend Dev\'s job)',
      'Does not design UI or pick colors (that is the Designer\'s job)',
      'Does not produce text content or copywriting (that is the Writer\'s job)',
      'Does not run research (that is the Researchers\' job)',
      'Does not decide WHAT to build, only HOW to connect it (that is the Orchestrator\'s job)',
      'Does not test security or code quality (that is QA Security and QA Quality)',
      'Does not rewrite whole modules - it glues, it does not rebuild'
    ],
    antiPatterns: [
      'False Consensus - pretending a conflict does not exist and picking a random version instead of an explicit resolution.',
      'Lowest Common Denominator - stripping distinctive features to avoid conflict instead of finding a compromise that keeps the value.',
      'Hidden Merge Conflict - leaving merge markers in the code and passing it to QA, where it surfaces in the wrong places.',
      'Rewriting Instead of Gluing - rewriting a whole Backend Dev module instead of a minimal CSS class-name fix.',
      'MANIFEST Amnesia - skipping MANIFEST.md validation and letting an artifact through with a missing requirement.'
    ],
    keyConcepts: [
      {term: 'Minimal change', def: 'Resolving a conflict with the smallest possible modification while preserving every worker\'s intent.'},
      {term: 'E2E testing', def: 'Whole-artifact tests - links, CSS, interactions - not security or code quality.'},
      {term: 'MANIFEST validation', def: 'Point-by-point check that every requirement in the MANIFEST.md contract is realized in the artifact.'},
      {term: 'Gate to QA', def: 'Integrator is the last checkpoint before the product reaches the QA layer - untestable code stops here.'},
      {term: 'Cross-cutting view', def: 'The only BUILD agent that sees every other worker\'s output, which is why it can settle conflicts.'}
    ],
    stats: [
      {label: 'Input tokens', value: '20-40k'},
      {label: 'Output tokens', value: '5-15k'},
      {label: 'Load', value: '70/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you have parallel work from several workers and need a coherent whole',
      'When conflicts between code, design, and content need a minimal resolution',
      'When you need MANIFEST.md validation before handoff to QA'
    ],
    worstFor: [
      'When you have one worker and nothing to integrate',
      'When you need new code (that is Backend Dev)',
      'When you want a code quality review (that is QA Quality)'
    ],
    relatedAgents: ['backend', 'designer', 'writer'],
    glossary: [
      {term: 'e2e', definition: 'End-to-end test - checks the full user path from entry to exit through the artifact.'},
      {term: 'manifest', definition: 'A contract document between the client and the system that describes the requirements to meet.'},
      {term: 'merge conflict', definition: 'A situation where two sources change the same spot and the tool cannot pick a version.'},
      {term: 'artifact', definition: 'The finished BUILD product that moves on to QA - one file or a set of files to review.'},
      {term: 'escalation', definition: 'Handing a problem up to the Orchestrator when the Integrator cannot resolve the conflict alone.'}
    ],
    learningQuote: 'A great editor makes the individual parts start singing together - Integrator plays no instrument, but it creates the harmony.',
    realExample: 'Imagine that one day I received HTML with a btn-primary class from Backend Dev, CSS with a button-main style from Designer, and an 87-character title from Writer, while the container had a max-width of 200px. Instead of rewriting anything, I added a CSS alias btn-primary, inserted text-overflow ellipsis, and added a tooltip with the full text. Three intents preserved, one artifact ready for QA.'
  },
  writer: {
    tagline: 'Museum curator of text - turns raw notes into print-ready documents',
    missionShort: 'Writer is the content quality agent in the BUILD layer. It takes raw text from Backend Dev, Designer, or Integrator and turns it into a final, readable document. It works in an isolated document sandbox with no Bash access and no ability to run programs.',
    whoIs: 'Writer behaves like an editor at a literary publishing house, a sound engineer mixing an album, or a museum curator writing exhibit labels. It takes 50 pages of raw prose and turns them into clear text you can show a client.',
    analogy: 'This agent is like a museum curator who can distill a 50-page academic paper into a 50-word label that explains the exhibit to anyone.',
    howItWorks: [
      {label: 'Reading the raw text', desc: 'Loads raw notes from Backend Dev, comments from Designer, and reports from Integrator. Identifies grammar errors, inconsistent terminology, and bloated passages.'},
      {label: 'Editing and structure', desc: 'Fixes grammar, unifies terminology, adds headings, lists, and tables. Removes repetition and ensures a logical flow of information.'},
      {label: 'Inline comments', desc: 'Adds comments to code only for nontrivial logic - never for obvious instructions like x = 5. Comments on TODO, FIXME, and public APIs.'},
      {label: 'README and CHANGELOG', desc: 'Creates the project documentation files with a consistent tone, uniform formatting, and clear run instructions.'}
    ],
    inputs: [
      'Raw documentation text from Backend Dev or Integrator',
      'Inline comments and docstrings to polish',
      'List of terms to unify across the project',
      'MANIFEST.md with the style and terminology standard'
    ],
    outputs: [
      'README.md with project description and run instructions',
      'CHANGELOG.md with version-by-version history',
      'Polished inline comments in the code',
      'Decision records documenting architectural choices',
      'Glossary of terms and unified terminology'
    ],
    does: [
      'Fixes grammar, spelling, and punctuation in documentation',
      'Unifies terminology across the whole project (one word instead of three)',
      'Creates README sections for what, why, how, install, and usage',
      'Writes CHANGELOG in Keep a Changelog format with semver versions',
      'Adds inline comments ONLY for nontrivial logic',
      'Simplifies technical jargon while preserving the precision of key terms',
      'Structures long text into headings, lists, and tables',
      'Produces API documentation with parameter descriptions, types, and usage examples'
    ],
    doesNotDo: [
      'Does not write logic code or algorithms (that is Backend Dev\'s job)',
      'Does not design CSS or layout (that is the Designer\'s job)',
      'Does not run research or use WebSearch (that is the Researchers\' job)',
      'Does not integrate components or merge files (that is the Integrator\'s job)',
      'Does not run any programs - it has no Bash tool',
      'Does not make architectural decisions (that is the Planner\'s job)',
      'Does not simplify down to triviality - it keeps the technical precision'
    ],
    antiPatterns: [
      'Jargon Overload - writing synchronous asynchronous iteration with lazy evaluation instead of data processed in chunks.',
      'Passive Voice Addiction - it was implemented instead of we implemented it, which hides responsibility and inflates the text.',
      'Missing Examples - API documentation with no example call and response, forcing readers to guess.',
      'Wall of Text - one 500-word paragraph with no headings, lists, or tables, which nobody reads.',
      'Obvious Comment - a sets x to 5 comment above the line x = 5, adding noise without value.'
    ],
    keyConcepts: [
      {term: 'Document sandbox', def: 'The Writer\'s isolated environment with access only to text files, no Bash, and no execution.'},
      {term: 'Inline only nontrivial', def: 'Code comments only for unclear logic, never for instructions that read themselves.'},
      {term: 'Style consistency', def: 'The whole project speaks with one voice - one term, one tone, one format.'},
      {term: 'Keep a Changelog', def: 'A CHANGELOG.md format standard with Added, Changed, Deprecated, Removed, Fixed, and Security sections.'},
      {term: 'Semantic versioning', def: 'A major.minor.patch scheme that signals the scale of changes and backward compatibility.'}
    ],
    stats: [
      {label: 'Input tokens', value: '10-25k'},
      {label: 'Output tokens', value: '5-15k'},
      {label: 'Load', value: '35/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you want a professional README and CHANGELOG for an open-source project',
      'When you have raw API documentation that needs structure and examples',
      'When you need unified terminology across the whole project'
    ],
    worstFor: [
      'When you need to run a script - Writer has no Bash',
      'When the content needs research and sources (that is the Researchers)',
      'When you are writing marketing copy with storytelling (that is the GTM Strategist)'
    ],
    relatedAgents: ['backend', 'integrator', 'res_docs'],
    glossary: [
      {term: 'changelog', definition: 'A project history file that describes what changed between versions and why.'},
      {term: 'semver', definition: 'Semantic versioning - a major.minor.patch format that communicates the scale of API changes.'},
      {term: 'jsdoc', definition: 'Special-format JavaScript comments that describe function parameters, types, and return values.'},
      {term: 'inline', definition: 'A comment on the same line as the code or directly above it, not in an external file.'},
      {term: 'style guide', definition: 'A document that describes the project\'s writing conventions - terminology, tone, and formatting.'}
    ],
    learningQuote: 'Good documentation does not add information - it removes noise. Writer measures success by what it managed to cut, not what it wrote.',
    realExample: 'Imagine that one day I received raw text from Backend Dev saying this function takes a list of users and returns the active ones. I turned it into a filterActiveUsers section with a parameter table, a return-value description, and a sample call. I added an entry to the CHANGELOG and updated the README. Suddenly the whole project documentation spoke with one voice.'
  },
  qa_security: {
    tagline: 'Last line of defense - an ethical hacker scanning the artifact before it reaches production',
    missionShort: 'QA Security is a security auditor operating in the QA/AUDIT Level 4 layer. Its mission: find every OWASP vulnerability, every hardcoded secret, and every prompt-injection gap before the code reaches users. It does not fix - it reports with severity and remediation.',
    whoIs: 'QA Security is the airport security officer of the agent architecture. It behaves like a white-hat pentester: thinks like an attacker, systematically tries to break the system using OWASP methodology, but reports gaps instead of exploiting them. It works strictly in read-only mode.',
    analogy: 'This agent is like a building inspector with an OWASP checklist - it does not put up walls, it just checks whether the wiring is a fire hazard.',
    howItWorks: [
      {label: 'File inventory', desc: 'Uses Glob to map every file in the artifact: source code, configuration, dependency files, .env. Builds a list of the attack surface.'},
      {label: 'OWASP scan', desc: 'Systematically walks through OWASP Top 10 using Grep patterns: innerHTML, eval, SQL concatenation, missing auth middleware, hardcoded secrets.'},
      {label: 'AI-specific analysis', desc: 'Hunts for prompt injection, agent output poisoning, tool abuse, and token exfiltration - threats unique to multi-agent systems.'},
      {label: 'JSON report', desc: 'Compiles findings into a structured report with severity (CRITICAL/HIGH/MEDIUM/LOW), exact file:line location, and remediation for every finding.'}
    ],
    inputs: [
      'Artifact to audit handed over by the Integrator',
      'Source code, configurations, dependency files, .env',
      'Project security specification (if one exists)',
      'OWASP Top 10 pattern list and AI-specific threats'
    ],
    outputs: [
      'JSON report with findings ordered by severity',
      'Each finding carries an id, category, file:line location, description, and remediation',
      'Scan summary with CRITICAL/HIGH/MEDIUM/LOW counts',
      'BLOCK DEPLOYMENT or GO recommendation for the QA Manager',
      'Exploitation path for every critical finding'
    ],
    does: [
      'Scans code for OWASP Top 10: XSS, SQLi, CSRF, IDOR, insecure deserialization',
      'Detects hardcoded secrets (API keys, passwords, tokens, connection strings)',
      'Analyzes prompt injection and agent output poisoning in multi-agent systems',
      'Checks package versions in package.json against known CVEs',
      'Identifies unprotected endpoints that lack authentication middleware',
      'Categorizes findings by severity and writes clear remediations',
      'Documents the exploitation path - how an attacker could leverage the gap',
      'Audits .env, docker-compose.yml, nginx.conf, and CI/CD workflow configuration files'
    ],
    doesNotDo: [
      'Does not fix code - an auditor cannot modify what it audits',
      'Does not judge code quality, readability, or spec compliance (that is QA Quality)',
      'Does not make GO/NO-GO decisions - that is the QA Manager\'s job',
      'Does not communicate with QA Quality - independence prevents groupthink',
      'Does not run code (no Bash) - prevents accidental damage',
      'Does not use WebSearch - it audits the artifact, it does not research the internet',
      'Does not treat every console.log as CRITICAL - it prioritizes risk in context'
    ],
    antiPatterns: [
      'Compliance Theater - ticking off OWASP Top 10 boxes without understanding context, a checklist without meaning',
      'Vuln Noise Flooding - filing 100 findings where 95 are false positives, the noise kills the signal',
      'False Severity Inflation - labeling everything CRITICAL to look competent',
      'Missing Threat Model - scanning patterns without understanding the actual attack surface',
      'Fix-While-Auditing - patching gaps during the audit, which destroys auditor independence'
    ],
    keyConcepts: [
      {term: 'OWASP Top 10', def: 'The canonical list of the 10 most common web vulnerabilities, updated every few years by the OWASP Foundation.'},
      {term: 'Prompt injection', def: 'An LLM-specific attack that manipulates the prompt to force the agent to ignore its instructions.'},
      {term: 'Severity rating', def: 'Classifying a vulnerability on a 4-level CRITICAL/HIGH/MEDIUM/LOW scale that determines repair urgency.'},
      {term: 'Read-only audit', def: 'The principle that the auditor has read-only access and cannot modify the system under test.'},
      {term: 'Attack surface', def: 'The sum of every entry point available to an attacker - every endpoint, form, and import.'}
    ],
    stats: [
      {label: 'OWASP categories', value: '10+5 AI'},
      {label: 'Cost per task', value: '$0.02-0.08'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'When you need a security gate before deployment - the last line of defense',
      'When you work with code that handles user data, payments, or authentication',
      'When you build a multi-agent system exposed to prompt injection and output poisoning'
    ],
    worstFor: [
      'When you need the vulnerabilities fixed (it only reports, fixing is Backend Dev\'s job)',
      'When you want a code quality or test coverage review (that is QA Quality)',
      'When you need a live pentest with exploits (it scans statically)'
    ],
    relatedAgents: ['qa_quality', 'qa_perf', 'qa_manager'],
    glossary: [
      {term: 'owasp', definition: 'Open Web Application Security Project - the organization that maintains web security standards and the Top 10 list.'},
      {term: 'xss', definition: 'Cross-Site Scripting - injecting a malicious script into a page through unsanitized input.'},
      {term: 'cve', definition: 'Common Vulnerabilities and Exposures - a database of known vulnerabilities with unique identifiers.'},
      {term: 'remediation', definition: 'A vulnerability fix recommendation - a concrete instruction for how to eliminate it.'},
      {term: 'idor', definition: 'Insecure Direct Object Reference - accessing objects without checking the user\'s permissions.'}
    ],
    learningQuote: 'One missed innerHTML can cost millions - QA Security does not hunt for bugs, it hunts for exploitation paths.',
    realExample: 'Imagine that one day I was scanning a payments app and found a Stripe sk_live key hardcoded in src/config/api.js line 8. In the same file, the /api/admin/users endpoint was exposed with no authentication middleware. I filed two HIGH findings and a BLOCK recommendation. The QA Manager blocked deployment, Backend Dev moved the key to env and added requireAuth. Second audit - zero findings, GO.'
  },
  qa_quality: {
    tagline: 'Quality inspector with a checklist - instead of asking how to break it, asks whether it works at all',
    missionShort: 'QA Quality is the code quality and spec compliance auditor. Its mission: verify that the artifact does what it should, that tests cover the scenarios, and that the code is readable and performant. It runs in parallel with QA Security but from a completely different angle - correctness instead of security.',
    whoIs: 'QA Quality is a peer reviewer and a Toyota factory quality inspector in one. It does not write the paper or build the car - it checks whether the methodology is sound and whether the doors close properly. It has a checklist with thresholds: >80% coverage, functions <50 lines, nesting <3 levels.',
    analogy: 'This agent is like a university examiner - it does not rewrite the student\'s paper, it reads it and writes a review with notes, and the student does the fixing.',
    howItWorks: [
      {label: 'Spec verification', desc: 'Compares the artifact with the original specification point by point. Every requirement must have a matching implementation fragment verified with Grep plus Read.'},
      {label: 'Running the tests', desc: 'Uses Bash to run npm test, pytest, or jest coverage. Collects statements, branches, functions, and lines coverage metrics and compares them against the 80% threshold.'},
      {label: 'Smell scanning', desc: 'Hunts for code smells: functions >50 lines, nesting >3 levels, duplication, N+1 queries, missing lazy loading, unhandled null/undefined/negative edge cases.'},
      {label: 'JSON report', desc: 'Compiles findings in a CORRECTNESS > TESTS > PERFORMANCE > CODE QUALITY hierarchy. Each finding has category, severity, location, and recommendation.'}
    ],
    inputs: [
      'Artifact to audit - source code, tests, configuration',
      'Original requirements specification from the strategic phase',
      'Existing unit and integration tests',
      'Project quality thresholds (coverage, long functions, complexity)'
    ],
    outputs: [
      'JSON report with findings ordered by priority',
      'Test coverage statistics broken down into statements/branches/functions',
      'List of missing edge cases and unhandled error paths',
      'Code smell metrics: function length, nesting depth, duplication',
      'DEPLOY or BLOCK recommendation for the QA Manager'
    ],
    does: [
      'Verifies spec compliance by matching requirements against implementation',
      'Runs tests and measures statements/branches/functions coverage via Bash',
      'Identifies missing tests for error paths and edge cases',
      'Detects code smells: long functions, deep nesting, duplication',
      'Tests edge cases: null, undefined, negative, empty, special characters',
      'Finds performance issues: N+1 queries, missing cache, missing lazy loading',
      'Checks linter results and project style compliance',
      'Prioritizes findings by the CORRECTNESS > TESTS > PERFORMANCE > STYLE hierarchy'
    ],
    doesNotDo: [
      'Does not fix code - it reports gaps, Backend Dev fills them in',
      'Does not write missing tests - it identifies GAPS, implementation is Backend Dev\'s job',
      'Does not check XSS/SQLi/secrets security - that is QA Security',
      'Does not make GO/NO-GO decisions - the report goes to the QA Manager',
      'Does not communicate with QA Security - independence prevents groupthink',
      'Does not modify files - READ-ONLY tools plus Bash only for running tests',
      'Does not judge UX design quality - it focuses on code correctness and quality'
    ],
    antiPatterns: [
      'Metrics Gaming - optimizing for coverage numbers instead of actually testing behavior',
      'Coverage Cheating - writing tests without assertions just to push the coverage percentage up',
      'Nit-Picking Storm - flooding the report with style notes instead of focusing on correctness',
      'Missing User Impact - reporting smells without assessing whether the bug actually affects users',
      'Checklist Myopia - checking only the items on the list and ignoring atypical problems'
    ],
    keyConcepts: [
      {term: 'Test coverage', def: 'The percentage of code executed by tests - statements, branches, functions, and lines with a minimum 80% threshold.'},
      {term: 'Edge case', def: 'A boundary condition: null, undefined, 0, negative value, empty string, special character, very large number.'},
      {term: 'Code smell', def: 'A problematic pattern in code that signals a deeper design problem - long functions, duplication, God Class.'},
      {term: 'N+1 query', def: 'A performance anti-pattern: a loop fires N extra queries instead of fetching the data with a single JOIN.'},
      {term: 'Correctness first', def: 'A priority hierarchy of correctness > tests > performance > style, where each level depends on the previous one.'}
    ],
    stats: [
      {label: 'Coverage threshold', value: '>80%'},
      {label: 'Max function', value: '<50 lines'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Haiku'}
    ],
    bestFor: [
      'When you want to verify whether the code actually meets the spec requirements',
      'When you need a test coverage report that flags the missing scenarios',
      'When you are hunting code smells and performance anti-patterns before deployment'
    ],
    worstFor: [
      'When you need an XSS or CVE security audit (that is QA Security)',
      'When you want someone to write the missing tests (it identifies them, it does not create them)',
      'When you need a UX or visual design review (it reviews code)'
    ],
    relatedAgents: ['qa_security', 'qa_perf', 'qa_manager'],
    glossary: [
      {term: 'coverage', definition: 'Test coverage - the percentage of code executed while running unit and integration tests.'},
      {term: 'edge case', definition: 'A boundary input condition like null, undefined, zero, negative values, or extremely large values.'},
      {term: 'code smell', definition: 'A surface symptom of a deeper code problem - not a bug but a sign of weak design.'},
      {term: 'n+1 query', definition: 'A performance problem where one main query triggers N extra queries inside a loop.'},
      {term: 'linter', definition: 'A static code analysis tool like ESLint or Pylint that checks style and pattern compliance.'}
    ],
    learningQuote: 'Beautifully formatted code that does not meet the specification is worthless - correctness always comes before style.',
    realExample: 'Imagine that one day I was auditing a payments module and ran npm test coverage. Statements 72%, branches 58% - below threshold. Grep showed that calculateDiscount did not validate null, undefined, or negative prices, and processOrder hit 87 lines against a 50-line limit. I filed 4 HIGH findings plus 3 MEDIUM. QA Manager ordered a fix, Backend Dev added the validations and split the function, second audit - coverage 89%, GO.'
  },
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
  gtm_strategist: {
    tagline: 'Launch choreographer - from ICP to first sale',
    missionShort: 'The GTM strategist designs the product\'s path to market: ideal customer profile, positioning, pricing, and acquisition channels. The mission is to connect user research to execution mechanics so the launch isn\'t a feature drop into a vacuum.',
    whoIs: 'The GTM strategist is a beach landing commander - surveys the terrain, picks the beachhead, plans logistics, and coordinates the strike moment. What separates them from a regular marketer is that they see the entire loop from ICP to retention, not just the ads.',
    analogy: 'This agent is like an Apple keynote choreographer - everything from the stage talk to the unboxing has to play the same note.',
    howItWorks: [
      {label: 'ICP and beachhead', desc: 'Defines the ideal customer profile (ICP) from research, then picks a narrow beachhead market - the first group that has to love the product unconditionally.'},
      {label: 'Positioning and pricing', desc: 'Crafts a value proposition that separates the product from competitors and sets pricing (anchor, tiers). Tests the narrative in customer language, not product language.'},
      {label: 'Acquisition channels', desc: 'Selects channels (content, outbound, partnerships, community, paid) matched to sales cycle length and unit economics. Maps the AARRR funnel.'},
      {label: 'Launch plan', desc: 'Builds the release calendar with milestones: pre-launch, launch day, post-launch follow-up. Picks success metrics and iterates.'}
    ],
    inputs: [
      'Product description and value proposition',
      'User research results and competitive analysis',
      'Launch budget and timeline',
      'Historical data if this is another product in the portfolio'
    ],
    outputs: [
      'ICP and beachhead market document with rationale',
      'Positioning strategy and pricing grid',
      'Acquisition channel map with priorities and ROI',
      'Launch plan with milestones and success metrics',
      'Launch communication (narrative, copy, PR angle)'
    ],
    does: [
      'Defines ICP from research, not wishful thinking about the market',
      'Picks a beachhead market where the product can dominate before going broad',
      'Crafts positioning that separates the product from competitors in one sentence',
      'Sets a pricing strategy with psychological anchoring (anchor price)',
      'Maps the AARRR funnel and identifies bottlenecks in every conversion path',
      'Matches acquisition channels to CAC, LTV, and sales cycle length',
      'Prepares a launch plan with concrete success metrics at 30/60/90 days',
      'Writes marketing narrative in customer language from research, not company speak'
    ],
    doesNotDo: [
      'Does not run user research (that\'s res_ux)',
      'Does not write code or implement the product (that\'s the build phase)',
      'Does not decide technical architecture or stack',
      'Does not design UI or visual identity (that\'s the designer)',
      'Does not handle post-sale customer support as an operational role',
      'Does not replace SDRs or account executives in actual selling',
      'Does not perform controller-level financial analysis'
    ],
    antiPatterns: [
      'Boiling Ocean - targeting everyone at once instead of picking a beachhead market',
      'Feature Launch - announcing features without mapping them to customer pain and jobs-to-be-done',
      'Inside Out Positioning - using product and company language instead of the words customers use',
      'Unit Economics Blindness - scaling a channel before confirming CAC < LTV',
      'Big Bang Launch - one massive event with no pre-launch or post-launch phase'
    ],
    keyConcepts: [
      {term: 'ICP', def: 'Ideal Customer Profile - narrow buyer characteristics for whom the product is a must-have.'},
      {term: 'Beachhead market', def: 'The first narrow segment where a startup can dominate before expanding (Moore).'},
      {term: 'AARRR', def: 'Pirate funnel Acquisition, Activation, Retention, Referral, Revenue - product success metrics.'},
      {term: 'Anchor pricing', def: 'Anchoring effect - a high reference price that makes the middle tier feel like a bargain.'},
      {term: 'TAM SAM SOM', def: 'Total, Serviceable Available, and Serviceable Obtainable Market - three levels of market sizing.'}
    ],
    stats: [
      {label: 'Phase', value: 'BUILD'},
      {label: 'Category', value: 'Product'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you\'re prepping a new product launch and don\'t know where to start',
      'When the product works but nobody buys because positioning is fuzzy',
      'When you have to pick between several market segments and lack beachhead discipline'
    ],
    worstFor: [
      'When you only need an ad campaign executor, not a strategist',
      'When the product doesn\'t have product-market fit yet and you need user research first',
      'When you\'re looking for technical or architectural analysis, not business'
    ],
    relatedAgents: ['res_ux', 'writer', 'analyst'],
    glossary: [
      {term: 'ICP', definition: 'Ideal Customer Profile - a precise buyer description for whom the product is the must-have fix.'},
      {term: 'beachhead', definition: 'A narrow market segment a startup picks as its first landing target to build dominance.'},
      {term: 'AARRR', definition: 'The five funnel metrics: Acquisition, Activation, Retention, Referral, Revenue.'},
      {term: 'anchor price', definition: 'A high reference price set so the middle offer looks like a bargain.'},
      {term: 'TAM/SAM/SOM', definition: 'Total, Serviceable Available, and Serviceable Obtainable Market - three levels of market sizing.'}
    ],
    learningQuote: 'A launch isn\'t a one-day event - it\'s three phases: pre-launch, release day, and what happens after, when you start listening to the data.',
    realExample: 'Imagine that I was designing GTM for a devops team tool. Instead of spraying the message at every engineer, I picked a beachhead: SRE teams of 10-30 people in fintech. The first 40 customers closed in 6 weeks because the landing page spoke their language about burn rate, not platitudes about efficiency.'
  },
  statistician: {
    tagline: 'Forensic scientist of numbers - won\'t testify without a power analysis',
    missionShort: 'The statistician designs experiments and analyses so results actually mean something. The mission is to pick the test, sample size, power, and correction for multiple comparisons. Protects the team from conclusions drawn from gambler\'s data that will eventually fail in production.',
    whoIs: 'The statistician is a forensic scientist - before saying anything in court, checks three times whether the data supports that conclusion. Without power analysis and preregistration they won\'t testify, because their reputation depends on every inference surviving replication.',
    analogy: 'This agent is like a forensic expert who refuses to testify without proper evidence - would rather investigate the case than guess it.',
    howItWorks: [
      {label: 'Hypothesis and plan', desc: 'Formulates the null and alternative hypotheses precisely. Writes the analysis plan before seeing the data (preregistration) to avoid p-value hacking.'},
      {label: 'Power and sample size', desc: 'Calculates the required sample size for a given effect size, significance level (alpha), and power (usually 0.8). Refuses experiments with undersized samples.'},
      {label: 'Test selection', desc: 'Picks the test appropriate to the data type and assumptions (t-test, Mann-Whitney, chi-square, regression). Checks the assumptions (normality, variances, independence).'},
      {label: 'Inference and report', desc: 'Reports effect size and confidence interval, not just p-value. Corrects for multiple comparisons (Bonferroni, BH). Keeps correlation and causation strictly separate.'}
    ],
    inputs: [
      'Research or business question to verify',
      'Description of data collection and available measurements',
      'Expected effect size or pilot data',
      'Time and budget constraints for the experiment'
    ],
    outputs: [
      'Analysis plan document (preregistration) with hypotheses',
      'Power calculation and required sample size',
      'Result report with effect size and confidence interval',
      'Multiple comparisons correction if applied',
      'Conclusion recommendation with clear confidence labeling'
    ],
    does: [
      'Formulates null and alternative hypotheses in testable form',
      'Calculates required statistical power and sample size before the experiment starts',
      'Picks a hypothesis test matched to distribution, variance, and data type',
      'Reports effect size and confidence interval, not just p-value',
      'Corrects for multiple comparisons to avoid false positives',
      'Registers the analysis plan before seeing the data (preregistration)',
      'Separates statistical significance from practical significance of the effect',
      'Warns against causal conclusions drawn from observational data'
    ],
    doesNotDo: [
      'Does not run exploratory data analysis (that\'s eda_analyst)',
      'Does not build ML models or training pipelines',
      'Does not write production code or ETL',
      'Does not collect data from users directly (that\'s res_ux)',
      'Does not accept p-value hacking in the name of a business deadline',
      'Does not formulate hypotheses after seeing results (HARKing)',
      'Does not replace the product manager in deciding whether a feature ships'
    ],
    antiPatterns: [
      'P-hacking - testing many hypotheses and reporting only the ones with p < 0.05',
      'HARKing - Hypothesising After Results are Known, writing hypotheses to fit the findings',
      'Underpowered Study - experiment on too small a sample, only detects huge effects',
      'P Value Worship - reporting only p-value without effect size or confidence interval',
      'Correlation as Causation - causal conclusions from purely observational data'
    ],
    keyConcepts: [
      {term: 'Null hypothesis', def: 'The zero hypothesis assuming no effect, which the test tries to reject.'},
      {term: 'Type I/II error', def: 'Type I (false positive) and Type II (false negative) errors are unavoidable but can be balanced.'},
      {term: 'Power', def: 'Probability of detecting a real effect; standard target is 0.8, which drives sample size.'},
      {term: 'Effect size', def: 'Measure of effect magnitude (Cohen d, r, OR) independent of sample size, more important than p-value.'},
      {term: 'Preregistration', def: 'Registering the analysis plan before collecting data, protects against p-hacking.'}
    ],
    stats: [
      {label: 'Phase', value: 'STRATEGY'},
      {label: 'Category', value: 'Data'},
      {label: 'Load', value: '45/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you\'re designing an A/B test and need to know how many weeks to run it',
      'When the team wants to draw conclusions from data and you need a correctness check',
      'When you need to check whether an apparent result is just noise or multiple comparisons'
    ],
    worstFor: [
      'When you need exploratory analysis and pattern hunting (that\'s eda_analyst)',
      'When the decision is qualitative and doesn\'t rest on a measurable metric',
      'When you have 30 minutes left in the meeting and need a simple answer'
    ],
    relatedAgents: ['eda_analyst', 'analyst', 'expert_analyst'],
    glossary: [
      {term: 'null hypothesis', definition: 'The default assumption that there is no effect, which the test attempts to reject.'},
      {term: 'power', definition: 'Test power - probability of detecting an effect when one truly exists, standard target 0.8.'},
      {term: 'effect size', definition: 'A measure of effect magnitude independent of sample size, e.g. Cohen d or odds ratio.'},
      {term: 'p-hacking', definition: 'Manipulating data or tests until p < 0.05 appears, a violation of statistical rigor.'},
      {term: 'preregistration', definition: 'Public registration of hypotheses and analysis plan before seeing data, defends against HARKing.'}
    ],
    learningQuote: 'The p-value isn\'t an oracle - effect size and sample size say more about reality than the magic 0.05.',
    realExample: 'Imagine that the team wanted to ship a new onboarding because the initial test showed a 3 percent conversion lift at p = 0.04. I ran the power analysis: the sample was too small, and the effect likely sat in a 95 percent CI from -0.5 to 6.5. I blocked the rollout, asked for a longer experiment, and the true effect turned out to be 1.2 percent - not business-significant at all.'
  },
  eda_analyst: {
    tagline: 'Data detective with a magnifier - describes reality before anyone models it',
    missionShort: 'The EDA analyst runs exploratory data analysis: profiling, anomaly detection, correlations, and visualizations. The mission is to describe the data so the team knows what they\'re working with before building a model or deciding anything, and so hidden traps surface early.',
    whoIs: 'The EDA analyst is a detective with a magnifier - won\'t form a theory before seeing the crime scene. Walks the columns, flips through distributions, stares at outliers, and listens to what the data is trying to say. Their work is questions, not ready-made answers.',
    analogy: 'This agent is like an astronomer before building a telescope - first looks at the sky with the naked eye and maps where the stars are and where the voids are.',
    howItWorks: [
      {label: 'Data profiling', desc: 'Describes every column: type, missing values, uniques, distribution, statistics. Builds a data dictionary as the team\'s shared baseline.'},
      {label: 'Distribution plots', desc: 'Builds histograms, boxplots, and density plots for numeric variables, and bar charts for categorical. Watches for skew, kurtosis, and modality.'},
      {label: 'Correlations and relationships', desc: 'Computes correlation matrices, pair plots, and cross-tabulations. Hunts for potential leak features and collinearities that would break a model.'},
      {label: 'Anomalies and report', desc: 'Identifies outliers, systematic missingness, duplicates, and Simpson-style paradoxes. Writes a report with key observations and recommendations.'}
    ],
    inputs: [
      'Raw dataset (CSV, Parquet, SQL table)',
      'Description of data provenance and business context',
      'Research question or working hypothesis to explore',
      'Column dictionary if available, otherwise just metadata'
    ],
    outputs: [
      'Data dictionary with types, missing values, and distributions',
      'Set of distribution and correlation visualizations',
      'List of anomalies, outliers, and data quality issues',
      'Report with key observations and recommendations',
      'Reproducible Jupyter notebook or script for the team'
    ],
    does: [
      'Profiles data column by column with types, missing values, and uniques',
      'Builds histograms, boxplots, and density plots that capture distribution shape',
      'Computes Pearson and Spearman correlation matrices, detecting collinearities',
      'Identifies outliers via IQR, z-score, and visual inspection',
      'Detects Simpson\'s paradox and hidden conditioning variables',
      'Flags systematic missingness (MCAR vs MAR vs MNAR) with consequences',
      'Draws pair plots and cross-tabulations for categorical variables',
      'Creates a reproducible notebook that can be handed to modelers and the statistician'
    ],
    doesNotDo: [
      'Does not build ML models or train neural networks',
      'Does not run hypothesis tests with statistical rigor (that\'s statistician)',
      'Does not make business decisions based on data',
      'Does not do ETL or clean data beyond flagging problems',
      'Does not design database schemas (that\'s db_architect)',
      'Does not impute missing values with advanced methods without consultation',
      'Does not draw causal conclusions from observational data'
    ],
    antiPatterns: [
      'Jump to Model - skipping EDA and going straight to training a model',
      'Mean Addiction - describing variables with only the mean, ignoring distribution and deviation',
      'Correlation Equals Causation - causal conclusions from correlations in observational data',
      'Outlier Removal Without Reason - cutting outliers because they clutter the charts',
      'Aggregated Blindness - looking only at global aggregates, ignoring segments and Simpson\'s paradox'
    ],
    keyConcepts: [
      {term: 'Simpson paradox', def: 'A trend visible in aggregates disappears or reverses when broken down into subgroups.'},
      {term: 'Outlier', def: 'An out-of-range value - could be an error, an anomaly, or the most important signal in the dataset.'},
      {term: 'Skewness', def: 'Distribution asymmetry - tells you whether the mean pulls left or right of the median.'},
      {term: 'Correlation vs causation', def: 'Correlation doesn\'t imply causation; you need to check hidden variables and temporal order.'},
      {term: 'Missingness', def: 'Pattern of missing data: MCAR random, MAR conditional, MNAR systematic and informative.'}
    ],
    stats: [
      {label: 'Phase', value: 'BUILD'},
      {label: 'Category', value: 'Data'},
      {label: 'Load', value: '60/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you get a new dataset and want to understand what you\'re working with',
      'When a model isn\'t performing and you suspect data quality issues',
      'When you\'re planning an experiment and want to know if the data has hidden traps'
    ],
    worstFor: [
      'When you need hypothesis testing with statistical rigor (that\'s statistician)',
      'When you just want to train a model without understanding the data (not advised, but...)',
      'When the data is already well-described and the team knows every column by heart'
    ],
    relatedAgents: ['statistician', 'analyst', 'db_architect'],
    glossary: [
      {term: 'Simpson paradox', definition: 'An effect where the direction of a relationship reverses when data is split into subgroups.'},
      {term: 'outlier', definition: 'A value significantly different from the rest, requiring a call on whether it\'s an error or a signal.'},
      {term: 'z-score', definition: 'A normalized distance from the mean measured in standard deviations.'},
      {term: 'histogram', definition: 'A bar chart showing the frequency distribution of values across bins.'},
      {term: 'pair plot', definition: 'A grid of scatter plots of variable pairs with histograms on the diagonal.'}
    ],
    learningQuote: 'Before you build the model, understand the data - the mean can\'t be trusted if you can\'t see the distribution and the deviation.',
    realExample: 'Imagine that I was profiling an e-commerce transactions dataset for a new recommender. I found that 12 percent of records had negative prices (returns incorrectly encoded), and the correlation between price and conversion reversed when split by region (Simpson\'s paradox). The ML team saved a month of training models on broken data.'
  },
  control_mapper: {
    tagline: 'Translator between legalese and code - how GDPR becomes a concrete commit',
    missionShort: 'The Control Mapper translates regulatory requirements (GDPR, SOC2, ISO27001, HIPAA) into concrete technical and process controls. The mission is to build control matrices, identify gaps, and point at evidence of compliance before the auditor knocks on the door.',
    whoIs: 'The Control Mapper is a sworn translator between legal and engineering worlds. Reads regulations like statutes, but speaks code, config, and Jira tickets. Understands that every GDPR clause must eventually land as a checkbox in IAM roles or a retention policy in the database.',
    analogy: 'This agent is like a courtroom translator in a bilingual trial - statute on one side, commit on the other, and they have to make sure both parties are talking about the same thing.',
    howItWorks: [
      {label: 'Requirements analysis', desc: 'Reads regulatory frameworks (GDPR articles, SOC2 trust services, ISO27001 Annex A, HIPAA Security Rule) and extracts concrete requirements for data and processes.'},
      {label: 'Control mapping', desc: 'For every requirement identifies a technical control (encryption, RBAC, audit logs) or process control (quarterly review, DPIA). Avoids duplication by reusing CIS/NIST baseline controls.'},
      {label: 'Compliance matrix', desc: 'Builds a requirements vs controls vs evidence matrix. Shows where evidence is missing, where compensations exist, and where the gap is.'},
      {label: 'Gap analysis', desc: 'Flags gaps with priority (blocker, major, minor) and recommends concrete steps. Prepares the audit-ready document for external inspectors.'}
    ],
    inputs: [
      'List of regulatory frameworks in scope (e.g. GDPR + SOC2)',
      'System description, architecture, and data flow',
      'Existing policies and compliance documents if any',
      'Access to evidence (logs, configurations, policies)'
    ],
    outputs: [
      'Control matrix: requirements vs controls vs evidence',
      'Gap list with priorities and recommendations',
      'Technical control specifications for implementation',
      'Process and policy compliance documentation',
      'Audit-ready checklist and readiness report'
    ],
    does: [
      'Maps GDPR, SOC2, ISO27001, and HIPAA requirements to technical and process controls',
      'Builds requirements vs controls vs evidence matrices across multiple frameworks at once',
      'Identifies gaps and prioritizes them by business and legal risk',
      'Picks compensating controls when a full control is impossible',
      'Reuses CIS/NIST baseline controls instead of reinventing everything',
      'Documents DPIAs for GDPR and personal data processing activities',
      'Maps STRIDE threats to controls that prevent specific risks',
      'Prepares audit documentation for external inspectors (ISO, SOC2 Type 2)'
    ],
    doesNotDo: [
      'Does not implement technical controls (that\'s backend and qa_security)',
      'Does not write code or infrastructure configuration',
      'Does not run external audits as an independent auditor',
      'Does not decide business risk for the company (that\'s the CISO and counsel)',
      'Does not translate legalese into plain language (that\'s legal)',
      'Does not ignore gaps to compromise with a business deadline',
      'Does not pen-test the system (that\'s qa_security)'
    ],
    antiPatterns: [
      'Checkbox Compliance - ticking requirements without actual implementation evidence',
      'Framework Silos - separate documentation per framework instead of reusing baseline controls',
      'Evidence Theater - collecting screenshots with no link to an actual control',
      'Control Sprawl - hundreds of controls with no priorities, nobody knows which ones are critical',
      'Last Minute Audit - gathering evidence the day before the audit instead of continuous monitoring'
    ],
    keyConcepts: [
      {term: 'CIA triad', def: 'Core security goals: Confidentiality, Integrity, Availability.'},
      {term: 'SOC2 trust services', def: 'Five categories: Security, Availability, Processing integrity, Confidentiality, Privacy.'},
      {term: 'GDPR DPIA', def: 'Data Protection Impact Assessment - required for high-risk personal data processing.'},
      {term: 'STRIDE', def: 'Threat model: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.'},
      {term: 'Compensating control', def: 'A substitute control when the original isn\'t feasible - must provide equivalent risk reduction.'}
    ],
    stats: [
      {label: 'Phase', value: 'BUILD'},
      {label: 'Category', value: 'Compliance'},
      {label: 'Load', value: '55/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When the company is preparing for a SOC2 or ISO27001 audit and has no control matrix',
      'When you\'re shipping a product to EU customers and must meet GDPR with evidence',
      'When you have multiple frameworks at once (SOC2 + HIPAA + GDPR) and want control reuse'
    ],
    worstFor: [
      'When you need a penetration test (that\'s qa_security)',
      'When the problem is technical in the code, not regulatory compliance',
      'When you\'re looking for legal counsel to interpret clauses (that\'s a lawyer, not an agent)'
    ],
    relatedAgents: ['qa_security', 'backend', 'writer'],
    glossary: [
      {term: 'CIA triad', definition: 'Confidentiality, Integrity, Availability - the three pillars of information security.'},
      {term: 'SOC2 TSC', definition: 'SOC2 Trust Services Criteria - five control categories for an AICPA audit.'},
      {term: 'DPIA', definition: 'Data Protection Impact Assessment required by GDPR for high-risk processing.'},
      {term: 'STRIDE', definition: 'Microsoft threat model used for application and infrastructure threat modeling.'},
      {term: 'compensating control', definition: 'A substitute control deployed when the original isn\'t feasible, must offset equivalent risk.'}
    ],
    learningQuote: 'Compliance doesn\'t exist without evidence - a checkbox in a document with no link to system configuration is fiction.',
    realExample: 'Imagine that I was mapping SOC2 and GDPR for an HR-tech startup. Instead of writing two separate matrices I built a single baseline on CIS Controls and mapped 78 percent of the controls to both frameworks at once. The SOC2 Type 2 auditor accepted the same evidence used for the DPIA, and the team saved three months of duplicate work.'
  },
  telemetry_surfer: {
    tagline: 'Firefighter with a thermal camera - tracks the incident through PromQL queries',
    missionShort: 'The Telemetry Surfer searches existing telemetry (metrics, logs, traces) for patterns, anomalies, and incident trails. The mission is to answer what happened and what\'s happening now using reproducible PromQL, LogQL, and trace search queries.',
    whoIs: 'The Telemetry Surfer is a firefighter with a thermal camera walking into a dark building. Can\'t see the fire directly, but sees temperature, smoke, and airflow, and assembles a picture of what\'s burning from those signals. Their language is queries, not guesses.',
    analogy: 'This agent is like a mountain rescuer with a sonar probe - doesn\'t dig blindly in the snow, reads the signals and locates the source of the problem from the data.',
    howItWorks: [
      {label: 'Question formulation', desc: 'Re-encodes a fuzzy incident report ("something is broken") into a concrete telemetry question: which metric, which period, which service.'},
      {label: 'PromQL and LogQL queries', desc: 'Writes reproducible queries using rate(), histogram_quantile(), sum by, and LogQL stream selectors. Avoids scenarios where the query returns something different an hour later.'},
      {label: 'Three-pillar correlation', desc: 'Links metric anomalies to a specific trace span (exemplar), then to logs via traceid. Builds the event timeline.'},
      {label: 'Report and runbook', desc: 'Writes a report with a concrete hypothesis, evidence, reproduction queries, and a proposed action. Updates the runbook so next time is faster.'}
    ],
    inputs: [
      'Incident description or operational question - what happened',
      'Access to Prometheus/Loki/Tempo or equivalents',
      'Time window and list of suspect services',
      'Existing dashboards and runbooks if any'
    ],
    outputs: [
      'Incident chronology with timestamps',
      'Reproducible PromQL/LogQL queries in the report',
      'Correlation of metrics with trace span and logs via traceid',
      'Root cause hypothesis with confidence level',
      'Runbook update for the next similar event'
    ],
    does: [
      'Formulates telemetry questions from fuzzy incident reports',
      'Writes reproducible PromQL queries with rate(), histogram_quantile, sum by',
      'Searches logs with LogQL stream selectors and regex expressions',
      'Links metrics to trace spans via exemplars and to logs via traceid',
      'Detects temporal correlation between a deploy and a rise in error rate',
      'Compares before/after behavior for the same metric',
      'Identifies cardinality explosions and expensive queries that destabilize the TSDB',
      'Writes an investigation report with evidence and a proposed runbook update'
    ],
    doesNotDo: [
      'Does not instrument the system or add new metrics (that\'s observability_engineer)',
      'Does not fix the code that caused the incident (that\'s the build phase)',
      'Does not build dashboards or SLOs from scratch (that\'s observability_engineer)',
      'Does not decide production rollbacks without a decision presenter',
      'Does not triage incidents as first-line support',
      'Does not write the post-mortem instead of the QA manager',
      'Does not draw conclusions about team culture from telemetry data'
    ],
    antiPatterns: [
      'Eye Balling Graphs - guessing from a chart without a concrete reproducible query',
      'Single Pillar Investigation - looking only at metrics or only at logs instead of correlating the three pillars',
      'Cardinality Query - grouping by a high-cardinality field and taking down Prometheus itself',
      'Post Hoc Correlation - linking events only because they happened near each other in time',
      'Irate Over Long Range - using irate() over a long window, producing garbage results'
    ],
    keyConcepts: [
      {term: 'histogram_quantile', def: 'PromQL function that computes quantiles (p50/p95/p99) from bucket histograms.'},
      {term: 'rate vs irate', def: 'rate() averages over a window, irate() uses the last two samples - use each depending on context.'},
      {term: 'LogQL stream selector', def: 'Loki log stream filter by labels, e.g. {app="api", level="error"}.'},
      {term: 'Trace span', def: 'A tracing unit representing an operation with start/stop times and a parent-child relationship.'},
      {term: 'Exemplar', def: 'A sample trace span attached to a metric point, clickable from the chart into the trace.'}
    ],
    stats: [
      {label: 'Phase', value: 'RESEARCH'},
      {label: 'Category', value: 'Ops'},
      {label: 'Load', value: '50/100'},
      {label: 'Model', value: 'Sonnet'}
    ],
    bestFor: [
      'When you have a production incident and need to figure out what\'s happening in minutes',
      'When something slowed down and nobody knows which service, but telemetry exists',
      'When you want to reconstruct an event timeline with evidence for a post-mortem'
    ],
    worstFor: [
      'When the system doesn\'t have enough telemetry (observability_engineer first)',
      'When the problem is in UI design or the product, not in operations',
      'When you need a long-term SLO and dashboard plan from scratch'
    ],
    relatedAgents: ['observability_engineer', 'qa_perf', 'res_tech'],
    glossary: [
      {term: 'histogram_quantile', definition: 'PromQL function that computes a quantile (e.g. p99) from a metric histogram.'},
      {term: 'rate vs irate', definition: 'rate() averages over a window, irate() captures instantaneous change from the last two samples.'},
      {term: 'LogQL', definition: 'Loki query language combining stream selectors with regex expressions and pipe operators.'},
      {term: 'traceid', definition: 'Trace identifier propagated across all spans and linked logs.'},
      {term: 'exemplar', definition: 'A trace span attached to a metric point, letting you jump from chart to trace.'}
    ],
    learningQuote: 'If you can\'t reproduce the result with a query an hour later, that isn\'t an investigation - that\'s chart divination.',
    realExample: 'Imagine that I was investigating an incident where API p99 latency jumped from 200 ms to 4 seconds with no visible error. I wrote rate(http_request_duration_seconds_bucket) with histogram_quantile 0.99 and saw the jump started exactly at 14:32. The exemplar led to a trace span in the DB layer, and the log pulled by traceid showed the query planner picking a full scan after an index migration. 12 minutes, not hours.'
  },
};
