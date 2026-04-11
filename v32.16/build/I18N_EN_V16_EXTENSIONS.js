// === V32.16: 10 new EN namespaces for Universal Bilingual ===
  eduAgent: {
    "orchestrator": {
      "tagline": "Conductor of a multi-agent system - decomposes, delegates, decides GO/NO-GO",
      "missionShort": "The Orchestrator is the central decision agent running the entire multi-agent system. Its mission: analyze the task, break it into subtasks, delegate to specialists, and control quality gates between phases. It does not do the domain work itself - it coordinates the specialists who do.",
      "whoIs": "The Orchestrator plays the role of construction foreman, orchestra conductor, and air traffic controller rolled into one. It sees the whole site from above but does not lay bricks or pull cables. Its power lies in strategic reasoning and the discipline of delegation.",
      "analogy": "This agent is like an orchestra conductor who plays no instrument, but without whom all the musicians together produce noise instead of music.",
      "howItWorks": [
        {
          "label": "Task decomposition",
          "desc": "Breaks the user's request into independent S/M/L/XL subtasks so each one can be executed by a single agent with a clear input and output."
        },
        {
          "label": "Delegation to specialists",
          "desc": "Picks the best agent for each subtask and hands it ONLY the narrow context needed to do the work (Narrow Context Principle)."
        },
        {
          "label": "GO/NO-GO gate control",
          "desc": "Between phases it checks whether results meet quality criteria. If not, it sends the work back for revision. It does not let errors propagate between phases."
        },
        {
          "label": "Synthesis and arbitration",
          "desc": "Collects results from specialists, resolves conflicts between recommendations, and merges the parts into a coherent product for the user."
        }
      ],
      "inputs": [
        "User request (goal, constraints, project scope)",
        "Reports and outputs from specialist agents in each phase",
        "Current state of MANIFEST.md with architectural decisions",
        "Conflict flags escalated by the Synthesizer"
      ],
      "outputs": [
        "Decomposition plan with agents assigned to subtasks",
        "GO/NO-GO decisions at every gate between phases",
        "Conflict resolutions between agent recommendations",
        "Final synthesized product for the user",
        "Process summary with rationale for key decisions"
      ],
      "does": [
        "Decomposes complex tasks into small, independent subtasks for individual agents",
        "Delegates work to specialists using the narrow context rule",
        "Controls GO/NO-GO quality gates between pipeline phases",
        "Resolves conflicts between contradictory agent recommendations",
        "Synthesizes results from all phases into a coherent whole",
        "Manages the Hub-and-Spoke pattern or hierarchy for 4-18 agents",
        "Monitors progress by reading MANIFEST.md and TaskStatus",
        "Escalates hard decisions to the user when a third revision cycle does not help"
      ],
      "doesNotDo": [
        "Does not generate code - that is what the Backend and Frontend Coders are for",
        "Does not run research - that is what the Researchers are for",
        "Does not write documentation or reports - that is the Writer's job",
        "Does not design interfaces or color palettes - that is the Designer's job",
        "Does not fix bugs directly - sends them back to the Coder with a note on what to change",
        "Does not delegate conflict resolution - that is its exclusive responsibility",
        "Does not load the full project context - sees only MANIFEST and current decisions"
      ],
      "antiPatterns": [
        "Micro-Manager - the Orchestrator writes code itself instead of delegating to the Coder, creating a bottleneck and exploding Opus costs",
        "God Agent - trying to grasp the entire project context leads to the Lost in the Middle effect and hallucinations",
        "Blind Delegation - delegation without context (build the backend) with no spec, tech stack, or acceptance criteria",
        "Token Waste - 15 agents for a job that could be done by 3, over-engineering with ceremony and debates",
        "Missing Gates - automatic acceptance of results without GO/NO-GO gates, leading to a Hallucination Cascade"
      ],
      "keyConcepts": [
        {
          "term": "Hub-and-Spoke",
          "def": "Architectural pattern where the orchestrator sits at the center and specialists around it, with all communication passing through the hub."
        },
        {
          "term": "Gate Control",
          "def": "GO/NO-GO gates between phases that prevent error propagation and require precise criteria to be met."
        },
        {
          "term": "Narrow Context",
          "def": "The principle that every agent receives only the information essential for its work, not the whole project context."
        },
        {
          "term": "Smart Routing",
          "def": "Dynamic model assignment - Opus for strategic decisions, Sonnet for build, Haiku for research and QA."
        },
        {
          "term": "Single Responsibility",
          "def": "The Orchestrator has one job - managing the system, not doing the domain work."
        }
      ],
      "stats": [
        {
          "label": "Coordinates",
          "value": "4-18 agents"
        },
        {
          "label": "System calls",
          "value": "~10%"
        },
        {
          "label": "Load",
          "value": "50/100"
        },
        {
          "label": "Model",
          "value": "Opus"
        }
      ],
      "bestFor": [
        "When the task needs coordination of 4+ agents and exceeds one sequential chain",
        "When the project has multiple phases with quality gates (research, build, QA, delivery)",
        "When contradictions appear between specialist recommendations and need arbitration"
      ],
      "worstFor": [
        "When the task is simple and one agent is enough (quick fix, small edit)",
        "When you have 2-3 agents in a simple chain and no central arbiter is needed",
        "When you want cheap orchestration - Opus is the most expensive model and not worth it for micro-tasks"
      ],
      "relatedAgents": [
        "synthesizer",
        "analyst",
        "planner"
      ],
      "glossary": [
        {
          "term": "decomposition",
          "definition": "Breaking a complex task into smaller, independent subtasks that single agents can execute."
        },
        {
          "term": "gate",
          "definition": "A checkpoint between phases where the orchestrator makes a GO/NO-GO decision based on quality criteria."
        },
        {
          "term": "hub-and-spoke",
          "definition": "A star topology where a central orchestrator talks to every specialist without peer-to-peer communication."
        },
        {
          "term": "manifest",
          "definition": "The central document (MANIFEST.md) that serves as the shared communication board and Single Source of Truth."
        },
        {
          "term": "delegation",
          "definition": "Handing a subtask to a specialist agent together with narrow context and acceptance criteria."
        }
      ],
      "learningQuote": "A captain who starts scrubbing the deck is a captain who loses the ship - the orchestrator never does its subordinates' work.",
      "realExample": "Imagine that one day I decomposed the task of building an interactive educational site into 14 subtasks across 4 phases. I ran 3 researchers in parallel, then synthesized their results, delegated the build to the Coder, Designer, and Writer, and halted the cycle at Gate 2 because the Designer had not delivered typography. The whole run cost $6 instead of the $25 I would have spent running everything on Opus."
    },
    "synthesizer": {
      "tagline": "Cross-phase memory of the system - MANIFEST guardian and contradiction hunter",
      "missionShort": "The Synthesizer is a strategic agent whose only job is to keep MANIFEST.md as the Single Source of Truth. It collects results from every phase, documents architectural decisions, flags contradictions between agents, and extracts cross-functional insights that no single specialist can see.",
      "whoIs": "The Synthesizer plays the role of a corporate historian, librarian, and meeting secretary in one. It is the long-term memory of the whole system - it remembers what was decided in the research phase, what was built in the build phase, and what QA found. It does not decide, it documents and flags.",
      "analogy": "This agent is like the librarian of a massive project who reads every report with the same attention as the first and connects dots no one else can see.",
      "howItWorks": [
        {
          "label": "Read all outputs",
          "desc": "When a phase ends it uses Read and Grep to collect every agent's output plus the current state of MANIFEST.md."
        },
        {
          "label": "Extract the essence",
          "desc": "Synthesizes 2000-word reports into 50-150-word entries capturing the key decisions, alternatives, and sources."
        },
        {
          "label": "Hunt contradictions",
          "desc": "Actively compares every report against every other, looking for conflicts in recommendations, metrics, and facts. Flags without resolving."
        },
        {
          "label": "Update the MANIFEST",
          "desc": "Records new ADRs with timestamps, documents contradictions at the top of the file, and sends a Synthesis Report to the Orchestrator."
        }
      ],
      "inputs": [
        "Reports from 6-14 agents in the current phase (research, build, QA)",
        "Current state of MANIFEST.md from previous phases",
        "Research Critic's scoring of report quality",
        "Signal from the Orchestrator that the phase is done and it is time to synthesize"
      ],
      "outputs": [
        "Updated MANIFEST.md with new ADRs and decisions",
        "Synthesis Report in JSON format with an executive summary",
        "List of active [CONFLICT-NNN] items escalated to the Orchestrator",
        "Cross-functional insights linking domains (QA + Frontend, Design + Backend)",
        "Concise phase summary with a GO recommendation or a request for more research"
      ],
      "does": [
        "Maintains MANIFEST.md as the Single Source of Truth for the whole system",
        "Creates ADRs (Architecture Decision Records) with WHAT/WHO/WHY/ALTERNATIVES context",
        "Flags contradictions between agent reports with criticality priority",
        "Extracts cross-functional insights by combining findings from different domains",
        "Applies the append-only rule - never deletes, only marks entries as REVISED",
        "Acts as an advisor to Builders during the build phase (Builder Advisory)",
        "Produces two versions of the MANIFEST in Deep Research Belt - executive summary and full"
      ],
      "doesNotDo": [
        "Does not make decisions - that is the Orchestrator's sole responsibility",
        "Does not resolve conflicts - only flags and escalates them",
        "Does not write code or create designs - only documents others' decisions",
        "Does not launch subagents - it has no Agent tool",
        "Does not verify facts via WebSearch - that is the Researchers' role",
        "Does not copy entire reports into the MANIFEST - it synthesizes into 50-150-word essence",
        "Does not wait until the end of a phase to flag critical conflicts"
      ],
      "antiPatterns": [
        "Decision Maker - the Synthesizer resolves a conflict itself by writing decision: React instead of escalating, causing a split-brain with the Orchestrator",
        "Info Hoarder - copying whole reports into the MANIFEST until the document grows to 10,000 words and nobody reads it",
        "Passive Observer - collecting data without actively hunting contradictions; 60% of immature implementations have this bug",
        "Stale Manifest - updating once a week instead of after every phase, so builders work from outdated decisions",
        "Silent Conflict - flagging without priority, so critical contradictions drown in low-weight noise"
      ],
      "keyConcepts": [
        {
          "term": "Single Source of Truth",
          "def": "MANIFEST.md as the sole authoritative record of the project state, updated only by the Synthesizer."
        },
        {
          "term": "Append-only",
          "def": "The rule that old decisions are never deleted, only marked REVISED, preserving the change history."
        },
        {
          "term": "Bidirectional awareness",
          "def": "The Synthesizer's unique privilege - it can directly ask agents for clarification, bypassing the Orchestrator."
        },
        {
          "term": "Cross-functional insight",
          "def": "A conclusion that joins facts from different domains and is invisible to any single specialist (for example CORS issue + missing credentials in fetch)."
        },
        {
          "term": "ADR",
          "def": "Architecture Decision Record - a structured decision entry with context, source, alternatives, and status."
        }
      ],
      "stats": [
        {
          "label": "Input per session",
          "value": "15-100k tok"
        },
        {
          "label": "MANIFEST sections",
          "value": "50-150 words"
        },
        {
          "label": "Load",
          "value": "65/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When the system has 6+ agents and an information gap appears between phases",
        "When you need a historical record of architectural decisions with rationale",
        "When active detection of contradictions between specialist recommendations matters"
      ],
      "worstFor": [
        "When you have 2-3 agents and the Orchestrator can keep everything consistent alone",
        "When the project is one-off and decision history has no value",
        "When you need an active decision maker - the Synthesizer never picks a side"
      ],
      "relatedAgents": [
        "orchestrator",
        "res_critic",
        "analyst"
      ],
      "glossary": [
        {
          "term": "manifest",
          "definition": "The central MANIFEST.md document collecting every decision, stack choice, risk, and conflict for the project."
        },
        {
          "term": "adr",
          "definition": "Architecture Decision Record - an entry documenting an architectural decision with full context."
        },
        {
          "term": "synthesis report",
          "definition": "JSON snapshot produced at the end of a phase as a formal recommendation to the Orchestrator."
        },
        {
          "term": "conflict flag",
          "definition": "A marker of a contradiction between agent reports that requires an Orchestrator decision."
        },
        {
          "term": "split-brain",
          "definition": "Inconsistency between Orchestrator decisions and MANIFEST state, dangerous for builders."
        }
      ],
      "learningQuote": "The Synthesizer documents, the Orchestrator decides - zero exceptions, because neutral system memory is worth more than one more decision maker.",
      "realExample": "Imagine that one day I synthesized reports from 6 researchers on the 2026 SaaS stack. I found consensus on Next.js 15 (4 out of 6 votes), but Researcher Reddit and Researcher X flagged Remix hype. Instead of resolving, I wrote [CONFLICT-007] into the MANIFEST with full context and escalated to the Orchestrator. I also caught a cross-functional insight - Next.js 15 ships native CSS variables, so dark mode needs no extra library."
    },
    "analyst": {
      "tagline": "Problem surgeon - splits complex tasks into independent S/M/L/XL subtasks",
      "missionShort": "The Analyst specializes in decomposing complex problems into atomic, actionable subtasks. Its mission: turn an abstract user request into a structured task list with dependencies, complexity estimates, and categories. The entire downstream pipeline builds on its work.",
      "whoIs": "The Analyst plays the role of a systems engineer, a surgeon planning an operation, and a Michelin-starred head chef. It sees the whole problem laid out on the operating table - it knows what needs to happen, in what order, and what can run in parallel. It does not do the work, it builds the map for those who will.",
      "analogy": "This agent is like a surgeon who, before the first cut, breaks the whole operation into stages, identifies critical points, and decides what can run in parallel.",
      "howItWorks": [
        {
          "label": "Problem analysis",
          "desc": "Reads the request from the Orchestrator and identifies scope, constraints, and the type of work needed to reach the goal."
        },
        {
          "label": "Atomic decomposition",
          "desc": "Breaks the task into subtasks small enough that each one can be done by a SINGLE agent with a clear input and output."
        },
        {
          "label": "Dependency map",
          "desc": "Builds a dependency graph showing which subtasks are independent (parallel) and which require outputs from others."
        },
        {
          "label": "Estimation and categorization",
          "desc": "Assigns each subtask an S/M/L/XL complexity and a category (RESEARCH/DESIGN/BUILD/QA/CONTENT) for the Planner."
        }
      ],
      "inputs": [
        "User request passed through the Orchestrator with narrow context",
        "Project goal, constraints, and scope",
        "Current state of MANIFEST.md if any decisions already exist",
        "Optional references and input material from the user"
      ],
      "outputs": [
        "Structured decomposition document in Markdown",
        "List of subtasks with unique IDs (T-001, T-002, ...) and descriptions",
        "Dependency graph showing independencies and parallel paths",
        "S/M/L/XL complexity estimate for each subtask",
        "Task categorization (RESEARCH/DESIGN/BUILD/INTEGRATE/QA/CONTENT)"
      ],
      "does": [
        "Decomposes complex problems into atomic, actionable subtasks",
        "Identifies independencies and dependencies, producing a directed graph",
        "Estimates complexity on an S/M/L/XL scale (not in time units)",
        "Categorizes tasks by work type for the Orchestrator",
        "Produces a structured decomposition plan as a contract for the rest of the system",
        "Separates domain work (research) from implementation (build)",
        "Runs once at the start of the project - decomposition is a one-shot operation"
      ],
      "doesNotDo": [
        "Does not write code or implement the subtasks it decomposed",
        "Does not run research - only states that topic X needs to be investigated",
        "Does not build a schedule - that is the Planner's role (when and in what order)",
        "Does not make architectural decisions (framework, database, palette)",
        "Does not estimate time - only complexity S/M/L/XL, which is model-independent",
        "Does not run code - it has no Bash tool, only static analysis",
        "Does not launch subagents - it has no Agent tool, that is the Orchestrator's role"
      ],
      "antiPatterns": [
        "Scope Creep - the Analyst starts doing domain work (code, research) instead of decomposition, so the decomposition turns shallow",
        "Time Estimation - estimating in hours instead of complexity; time depends on the model but complexity is constant",
        "Giant Task - a subtask that needs two agents at once must be broken down further into atoms",
        "Dependency Blindness - missing a dependency between subtasks, so builders work on conflicting assumptions",
        "Category Confusion - mixing RESEARCH with BUILD in a single subtask, so the agent wastes time on work outside its role"
      ],
      "keyConcepts": [
        {
          "term": "Plan-and-Execute",
          "def": "The Analyst-Planner-Builder-QA pattern that delivers 83% cost savings compared to ad-hoc approaches."
        },
        {
          "term": "Complexity S/M/L/XL",
          "def": "A time-independent complexity scale - Small one step, Medium several steps, Large many components, XL critical."
        },
        {
          "term": "Dependency Graph",
          "def": "A directed graph showing which subtasks need outputs from others, key to spotting parallelism."
        },
        {
          "term": "Narrow Context",
          "def": "The Analyst gets only goal/constraints/scope, not the full project context, so it can focus on decomposition."
        },
        {
          "term": "Atomic Task",
          "def": "A subtask small enough that a single agent can execute it with clearly defined input and output."
        }
      ],
      "stats": [
        {
          "label": "Session time",
          "value": "15-25 sec"
        },
        {
          "label": "Savings",
          "value": "83% vs ad-hoc"
        },
        {
          "label": "Load",
          "value": "55/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When the task is complex and needs 5+ subtasks spread across different specialists",
        "When you want to maximize parallelism and identify independencies",
        "When the pipeline needs a contract between planning and execution"
      ],
      "worstFor": [
        "When the task is trivial and one agent can handle it end-to-end",
        "When you need a schedule with dates - that is the Planner's role, not the Analyst's",
        "When the project has no clear goal - the Analyst needs precise input"
      ],
      "relatedAgents": [
        "planner",
        "orchestrator",
        "synthesizer"
      ],
      "glossary": [
        {
          "term": "decomposition",
          "definition": "Breaking a complex problem into small independent subtasks that single agents can handle."
        },
        {
          "term": "dependency graph",
          "definition": "A visual map showing which subtasks depend on which others, used to spot parallel paths."
        },
        {
          "term": "complexity",
          "definition": "Task difficulty on an S/M/L/XL scale, independent of model and execution time."
        },
        {
          "term": "category",
          "definition": "The type of work a subtask needs - RESEARCH, DESIGN, BUILD, INTEGRATE, QA, or CONTENT."
        },
        {
          "term": "atomic task",
          "definition": "A subtask small enough that one agent can handle it alone from input to output."
        }
      ],
      "learningQuote": "If the Analyst gets it wrong, there will be nothing to build on the other side, because a bad decomposition propagates through the system like a crack in a foundation.",
      "realExample": "Imagine that one day I was handed the request build an analytics dashboard for e-commerce. I broke it into 13 subtasks across 6 categories, marked 8 of them as parallel (65% parallelism potential), rated 3 as XL (API integrations, permissions system, query optimization), and handed the graph to the Planner. My whole process took 22 seconds but saved the project two rounds of rework."
    },
    "planner": {
      "tagline": "Schedule director - turns decomposition into a phased plan with gates and a critical path",
      "missionShort": "The Planner builds an execution schedule from the Analyst's decomposition. Its mission: decide which tasks are sequential and which are parallel, identify the critical path, define G0-G4 quality gates, and maximize parallelism to shrink total project time.",
      "whoIs": "The Planner plays the role of a construction foreman, a military logistics chief, and a film director. It has the Analyst's script in hand but must decide which scenes to shoot in parallel, which need effects carried over from an earlier stage, and where to place quality checkpoints. It is the tactician between strategy and execution.",
      "analogy": "This agent is like a construction foreman who knows that the electrician and plumber can work in parallel on different floors, but the roof cannot go on before the walls are up.",
      "howItWorks": [
        {
          "label": "Dependency analysis",
          "desc": "Reads the Analyst's dependency graph and identifies which subtasks can run in parallel and which must wait."
        },
        {
          "label": "Pick execution mode",
          "desc": "For each phase it picks SEQUENTIAL, PARALLEL, PARALLEL_THEN_SEQUENTIAL, or SEQUENTIAL_WITH_COLLABORATION."
        },
        {
          "label": "Critical path",
          "desc": "Identifies the longest chain of dependent tasks that determines the minimum project duration and flags those tasks as high priority."
        },
        {
          "label": "Define gates G0-G4",
          "desc": "Writes precise GO/NO-GO criteria for the gates between phases (Input, Decomposition, Research, Build, QA) that the Orchestrator will enforce."
        }
      ],
      "inputs": [
        "Structured decomposition with a subtask list from the Analyst",
        "Dependency graph showing independencies and parallel paths",
        "S/M/L/XL complexity estimates for each subtask",
        "Token and time budget constraints from the Orchestrator"
      ],
      "outputs": [
        "Execution schedule split into phases with SEQ/PARALLEL modes",
        "Critical path identification with priority tasks marked",
        "G0-G4 quality gate definitions with precise GO/NO-GO criteria",
        "Parallelism potential estimate (% of tasks that can run concurrently)",
        "Iteration limit recommendations for feedback loops (max 2-3)"
      ],
      "does": [
        "Builds an execution schedule with sequential and parallel phases",
        "Identifies the critical path that determines minimum project duration",
        "Defines G0-G4 quality gates with precise GO/NO-GO criteria",
        "Maximizes parallelism to cut total time (40-60% savings)",
        "Picks an execution mode for each phase from the four standard patterns",
        "Sets iteration limits for feedback loops (max 2 for QA, max 3 for critical)",
        "Detects resource conflicts (two tasks writing to the same file)"
      ],
      "doesNotDo": [
        "Does not decompose tasks - the Analyst already did that in the previous step",
        "Does not execute tasks - only plans their order and execution mode",
        "Does not enforce quality gates - it defines them, the Orchestrator enforces them",
        "Does not write code or run research - it is purely a tactician",
        "Does not pick models for agents - that is the Orchestrator's call based on complexity",
        "Does not modify the Analyst's decomposition - if it is flawed, it escalates to the Orchestrator",
        "Does not allow infinite iteration - it always defines a max_iterations limit"
      ],
      "antiPatterns": [
        "False Parallelism - marking tasks as parallel without checking resource conflicts, causing race conditions and file overwrites",
        "Missing Critical Path - no critical path identification leads to wrong priorities and delays across the whole project",
        "Loose Gates - quality gates with a criterion like something exists let flawed results through to the next phase",
        "Infinite Iteration - no max_iterations limit on SEQUENTIAL_WITH_COLLABORATION, so the system loops endlessly on fixes",
        "Sequential Bias - defaulting tasks to sequential without analyzing independence wastes parallelism potential"
      ],
      "keyConcepts": [
        {
          "term": "Critical path",
          "def": "The longest chain of dependent tasks that sets the minimum project duration; tasks on it get priority."
        },
        {
          "term": "Execution mode",
          "def": "One of four patterns - SEQUENTIAL, PARALLEL, PARALLEL_THEN_SEQUENTIAL, SEQUENTIAL_WITH_COLLABORATION."
        },
        {
          "term": "Gate G0-G4",
          "def": "Standard quality gates - Input, Decomposition, Research, Build, Quality - with precise GO/NO-GO criteria."
        },
        {
          "term": "Parallelization",
          "def": "Running independent tasks at the same time, cutting time by 40-60% compared to pure sequence."
        },
        {
          "term": "Max iterations",
          "def": "A feedback loop limit that prevents infinite revision cycles, usually 2-3 iterations."
        }
      ],
      "stats": [
        {
          "label": "Parallelism",
          "value": "+40-60%"
        },
        {
          "label": "Gates G0-G4",
          "value": "5 standard"
        },
        {
          "label": "Load",
          "value": "40/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When the project has many phases and needs precise sequence coordination",
        "When you want to maximize parallelism to shorten delivery time",
        "When quality gates with precise GO/NO-GO criteria are critical"
      ],
      "worstFor": [
        "When the project has fewer than 4 subtasks - the schedule is obvious",
        "When all tasks are sequential - there is nothing to plan",
        "When you need a builder, not a planner - the Planner does not write code"
      ],
      "relatedAgents": [
        "analyst",
        "orchestrator",
        "qa_manager"
      ],
      "glossary": [
        {
          "term": "schedule",
          "definition": "A document defining the order of subtask execution, split into phases with sequential and parallel modes."
        },
        {
          "term": "critical path",
          "definition": "The longest chain of dependent tasks that determines the minimum duration of the whole project."
        },
        {
          "term": "gate",
          "definition": "A checkpoint between phases with precise GO/NO-GO criteria, enforced by the Orchestrator."
        },
        {
          "term": "execution mode",
          "definition": "Agent collaboration pattern in a phase - sequential, parallel, mixed, or with feedback loops."
        },
        {
          "term": "max iterations",
          "definition": "Feedback cycle limit in SEQUENTIAL_WITH_COLLABORATION mode that prevents infinite loops."
        }
      ],
      "learningQuote": "A parallel UX Research task can slip by 20% without touching the project, but Tech Research on the critical path delays everyone.",
      "realExample": "Imagine that one day I got a 13-subtask decomposition from the Analyst. I identified 3 researchers as parallel (saving 14 minutes on phase 1), set build to PARALLEL_THEN_SEQUENTIAL because the Integrator must wait for the Coder and Designer, and defined gate G2 with the criterion every researcher delivered a report with at least 3 sources. The critical path ran through Research Tech to Coder to Integrator - that is where I pointed the Orchestrator's attention."
    },
    "res_tech": {
      "tagline": "Archivist of official truth - reads docs and RFCs, cites URLs instead of memory",
      "missionShort": "Researcher Tech searches official documentation, RFCs, specifications, and benchmarks for hard technical facts. Its mission: deliver ground truth from vendors and peer-reviewed research, never opinions. Every claim must come with a source URL - no source, no fact.",
      "whoIs": "Researcher Tech is the librarian of a legal library and a detective in the archives at the same time. It sits in the reading room of official docs, compares versions, checks publication dates and RFCs, and never quotes from memory. Its domain is the arbiter of truth - what the vendor says, what independent benchmarks show, what changelogs reveal.",
      "analogy": "This agent is like a lawyer in court who, instead of saying I heard that, pulls a document from the folder, points at the paragraph, cites the clause, and adds the source URL.",
      "howItWorks": [
        {
          "label": "Research question",
          "desc": "Receives a narrow question from the Orchestrator (Narrow Context Principle) and breaks it into sub-queries with time context and technology version."
        },
        {
          "label": "Source hierarchy",
          "desc": "Searches by the pyramid: official docs > engineering blog > independent benchmark > tutorial. Rejects sources older than 12 months for fast-moving frameworks."
        },
        {
          "label": "Compare 3 options",
          "desc": "For every topic it compares at least 3 alternatives with pros/cons, setup snippets, known issues, and maintenance activity. Never recommends the first thing it finds."
        },
        {
          "label": "JSON report",
          "desc": "Formats a structured report with findings, confidence scores 0.0-1.0, risks, gaps, and a URL on every claim. Explicitly calls out data gaps for the Research Critic."
        }
      ],
      "inputs": [
        "Research question (for example: which multi-agent framework for SaaS)",
        "Technology keywords and framework versions",
        "Source time window (freshness window)",
        "Optionally a previous report for iteration or revision"
      ],
      "outputs": [
        "At least 3 options compared with pros/cons and snippets",
        "Source URL on every technical claim",
        "Confidence score 0.0-1.0 based on the source hierarchy",
        "Risks section (lock-in, maintenance, security, scalability)",
        "Gaps section - what the sources did not answer"
      ],
      "does": [
        "Reads official documentation and RFCs as the arbiter of truth",
        "Critically analyzes benchmarks (hardware, version, methodology, reproducibility)",
        "Compares at least 3 alternatives for every technology recommendation",
        "Verifies adoption metrics (npm downloads, GitHub stars, PyPI)",
        "Checks changelogs and CVEs to spot breaking changes",
        "Rates vendor lock-in and how model-agnostic a solution is",
        "Provides a working setup snippet for each recommended option",
        "Tags every claim with a source URL - the cardinal rule"
      ],
      "doesNotDo": [
        "Does not read Reddit or community opinion (that is res_reddit's domain)",
        "Does not chase visual trends and mood boards (that is res_ux's domain)",
        "Does not analyze repositories and Issues (that is res_github's domain)",
        "Does not cite SO forums as primary sources (that is res_forums's domain)",
        "Does not write code or implementations (that is the Builder's role)",
        "Does not make decisions - it recommends with a confidence score",
        "Does not talk to other researchers (isolation rule)"
      ],
      "antiPatterns": [
        "Shallow Search - one WebSearch query and three links as a report with no deeper WebFetch",
        "Hallucinated Source - a URL generated from model memory that leads to a 404",
        "Source Bias - every source from the same vendor (nextjs docs + vercel blog + vercel case)",
        "Recency Obsession - recommending the newest tech just because it is new",
        "Copy-Paste Research - verbatim quotes from the docs with no analysis or context"
      ],
      "keyConcepts": [
        {
          "term": "Narrow Context Principle",
          "def": "The Researcher gets ONLY the research question, without project context - this cuts hallucinations and confirmation bias."
        },
        {
          "term": "Source hierarchy",
          "def": "Docs > Eng Blog > Benchmark > Tech Blog > Tutorial > Forum > Tweet - an official source beats a blog every time."
        },
        {
          "term": "Confidence score",
          "def": "0.9+ for official docs, 0.7-0.89 for reputable blogs, 0.5-0.69 for forums; below 0.5 the Critic rejects the finding."
        },
        {
          "term": "Freshness check",
          "def": "A source older than 12 months for a framework needs verification against the current version - technology ages fast."
        },
        {
          "term": "Multi-source triangulation",
          "def": "High confidence requires confirmation from 3 different source types: docs + benchmark + community feedback."
        }
      ],
      "stats": [
        {
          "label": "Min. options",
          "value": "3 compared"
        },
        {
          "label": "Hierarchy",
          "value": "7 levels"
        },
        {
          "label": "Load",
          "value": "55/100"
        },
        {
          "label": "Model",
          "value": "Haiku"
        }
      ],
      "bestFor": [
        "When you need hard technical facts with source URLs instead of opinions",
        "When you are choosing between 3+ frameworks and need a pros/cons comparison",
        "When you must verify a benchmark, API version, or breaking changes"
      ],
      "worstFor": [
        "When you want practitioners' opinions on what actually works (that is res_reddit's domain)",
        "When you want visual inspiration and UX trends (that is res_ux's domain)",
        "When the question is about a very new technology with no established documentation"
      ],
      "relatedAgents": [
        "res_docs",
        "res_github",
        "res_critic"
      ],
      "glossary": [
        {
          "term": "rfc",
          "definition": "Request for Comments - a technical document that defines standards and maintainer design decisions."
        },
        {
          "term": "freshness",
          "definition": "Source currency - publication date relative to the current technology version."
        },
        {
          "term": "confidence_score",
          "definition": "Finding confidence 0.0-1.0 based on source hierarchy and number of confirmations."
        },
        {
          "term": "vendor_lock_in",
          "definition": "Degree of dependence on a single vendor - from open source (none) to closed protocols (high)."
        },
        {
          "term": "narrow_context",
          "definition": "The rule that context is limited to the research question, preventing hallucinations and confirmation bias."
        }
      ],
      "learningQuote": "Without a source URL there is no fact, only speculation. Researcher Tech does not quote from memory, it shows the document and the paragraph.",
      "realExample": "Imagine that one day I compared LangGraph, CrewAI, and the Claude Agent SDK for a multi-agent SaaS. LangGraph won on battle-tested (confidence 0.92), but I found an issue about a memory leak below 0.2.1. I flagged it under risks and the team picked the stable version with the workaround, instead of learning about the bug in production."
    },
    "res_ux": {
      "tagline": "Curator of the digital gallery - a mood board from 5 sources instead of a Dribbble copy",
      "missionShort": "The UX Researcher scans Dribbble, Behance, Awwwards, Mobbin, and official design systems for visual trends, interaction patterns, and accessibility standards. Mission: deliver a synthesized mood board with a minimum of 5 references plus a WCAG audit instead of plagiarizing a single design.",
      "whoIs": "The UX Researcher is part art gallery curator, part fashion trend scout. They walk through digital exhibits, pick the best work, and build a mood board - but they never paint the picture themselves. Their unique niche is answering how it should look and feel, while Tech answers how to build it.",
      "analogy": "The UX Researcher is an interior designer in the inspiration phase - visiting trade shows, photographing hotel lobbies, collecting fabric swatches, and coming back with a mood board the painter will build from.",
      "howItWorks": [
        {
          "label": "Visual brief",
          "desc": "Receives a brief with target audience, tone of voice, and constraints. Filters trends against project context so they don't sweep up everything that's trendy."
        },
        {
          "label": "Platform search",
          "desc": "WebSearch across Dribbble, Behance, Awwwards, Mobbin plus official design systems (Material, HIG, WCAG). Separates concepts from production work."
        },
        {
          "label": "Mood board synthesis",
          "desc": "Groups findings into categories (color, typography, layout, animation, a11y) and extracts patterns - when 7 of 10 sites use a bento grid, that's a pattern, not a fad."
        },
        {
          "label": "WCAG audit",
          "desc": "Checks every palette for minimum 4.5:1 contrast, every animation for prefers-reduced-motion, every touch target for 44x44 px minimum. Flags problems instead of ignoring them."
        }
      ],
      "inputs": [
        "Project brief with target audience and tone of voice",
        "Product category (dashboard, e-commerce, educational)",
        "Required modes (dark/light, mobile/desktop breakpoints)",
        "Cultural context and target market"
      ],
      "outputs": [
        "Mood board with minimum 5 references, links, and categories",
        "Primary/secondary/accent color palette with hex values and contrast ratios",
        "Typography recommendation (heading/body/mono) with a size scale",
        "Spacing system based on a 4 px or 8 px grid",
        "WCAG audit with accessibility flags and animation spec"
      ],
      "does": [
        "Searches Dribbble, Behance, Awwwards, and Mobbin for patterns",
        "Builds a mood board with minimum 5 references (synthesis, not copy)",
        "Analyzes official design systems (Material, HIG, Fluent, Tailwind UI)",
        "Checks WCAG contrast 4.5:1 for body text and 3:1 for large text",
        "Separates Dribbble concepts from production examples on Mobbin",
        "Flags trends on the way out (neumorphism died in 2024)",
        "Accounts for cultural context of color and typography",
        "Delivers dark mode and light mode recommendations in parallel"
      ],
      "doesNotDo": [
        "Does not write CSS or tokens - that's the Designer's job in Build",
        "Does not read official framework docs (that's res_tech's domain)",
        "Does not design wireframes or layouts (that's the Designer's job)",
        "Does not run Lighthouse or a11y tests (that's QA Quality's job)",
        "Does not copy a single Dribbble shot - always synthesizes from 5+",
        "Does not ignore mobile - the mood board needs 2+ breakpoints",
        "Does not have Write/Edit/Bash access - only WebSearch and WebFetch"
      ],
      "antiPatterns": [
        "Trend Chaser - scooping up every hot trend without filtering for project context, report becomes internally contradictory",
        "No Accessibility - beautiful palettes with 2:1 contrast, no prefers-reduced-motion, violating the European Accessibility Act",
        "Style Over Substance - recommending heavy 3D animations that tank performance on mid-range Android devices",
        "Missing Responsive - mood board is desktop 1440 px only, zero references for 375 px mobile",
        "Single Source Worship - entire mood board built around one Dribbble shot, that's plagiarism with extra steps"
      ],
      "keyConcepts": [
        {
          "term": "Mood board",
          "def": "An inspiration board with at least 5 references from different sources, enabling synthesis instead of copying a single design."
        },
        {
          "term": "WCAG 2.2 AA",
          "def": "Accessibility standard enforcing 4.5:1 contrast, touch targets of 24x24 px minimum, prefers-reduced-motion, and visible focus."
        },
        {
          "term": "European Accessibility Act",
          "def": "EU regulation in force from June 28, 2025 requiring digital products to comply with WCAG - accessibility is a legal obligation."
        },
        {
          "term": "Concept vs production",
          "def": "Dribbble hosts concept shots that were never built, Mobbin hosts real production screens - both need to be labeled in the report."
        },
        {
          "term": "Mobile-first",
          "def": "Design principle that starts from the smallest screen and scales up - 60%+ of traffic is mobile, desktop is the add-on."
        }
      ],
      "stats": [
        {
          "label": "Min. references",
          "value": "5 sources"
        },
        {
          "label": "WCAG contrast",
          "value": "4.5:1 text"
        },
        {
          "label": "Load",
          "value": "50/100"
        },
        {
          "label": "Model",
          "value": "Haiku"
        }
      ],
      "bestFor": [
        "When you need a mood board of 2026 trends, not a copy of one shot",
        "When you want a WCAG 2.2 audit with concrete contrast numbers",
        "When the project targets dark mode and light mode in parallel with per-mode palettes"
      ],
      "worstFor": [
        "When you need CSS implementation and tokens (that's the Designer in Build)",
        "When you're after technology or framework benchmarks (that's res_tech's domain)",
        "When you have to run a real Lighthouse or axe test (that's QA Quality)"
      ],
      "relatedAgents": [
        "res_tech",
        "designer",
        "res_critic"
      ],
      "glossary": [
        {
          "term": "dribbble",
          "definition": "A platform for designer shots - great for trends, but many are concepts that were never shipped."
        },
        {
          "term": "behance",
          "definition": "Adobe's portfolio site requiring full case studies - shows the design process, not just the final shot."
        },
        {
          "term": "awwwards",
          "definition": "Site that awards the best websites - state-of-the-art web design judged by a jury."
        },
        {
          "term": "mobbin",
          "definition": "Library of real production app screens - ground truth instead of Dribbble concepts."
        },
        {
          "term": "wcag",
          "definition": "Web Content Accessibility Guidelines - W3C standard with contrast, keyboard navigation, and ARIA requirements."
        }
      ],
      "learningQuote": "Five references is synthesis, one is plagiarism with extra steps - the UX Researcher doesn't copy pretty pictures, they distill patterns.",
      "realExample": "One day I built a mood board for an educational site about AI agents. I found that 7 of 10 Awwwards-winning sites in Q1 2026 used a bento grid with a dark theme and Space Grotesk - that was the pattern. I labeled the proposed palette at 4.6:1 contrast and the team got a ready-to-go direction instead of distracting options."
    },
    "res_reddit": {
      "tagline": "Ethnographer of digital tribes - translating user passion and frustration into product insights",
      "missionShort": "The Reddit Researcher mines anonymous discussion platforms for unfiltered developer opinions. Mission: deliver ground truth - real practitioner experience, not marketing promises. Operates in the community-opinion specialization.",
      "whoIs": "The Reddit Researcher is an AI agent that behaves like an anthropologist studying developer tribes. They sit in digital taverns (subreddits like r/webdev, r/programming), listen to unfiltered discussion, and extract real practitioner pain.",
      "analogy": "The Reddit Researcher is a mystery shopper in a tech store - they don't read the salesperson's brochure, they sit down with coffee next to other customers and listen to what they dislike about the products they bought.",
      "howItWorks": [
        {
          "label": "Subreddit selection",
          "desc": "Identifies relevant subreddits (r/webdev, r/programming, r/reactjs, r/SaaS, r/devops) and formulates precise queries with the site:reddit.com operator."
        },
        {
          "label": "Thread reading",
          "desc": "Prioritizes threads with high comment counts and gilded posts. Reads full discussions, not just titles, because the value lives in the comments."
        },
        {
          "label": "Patterns and sentiment",
          "desc": "Extracts sentiments (POSITIVE, NEGATIVE, MIXED, SHIFTING) and hunts for patterns - when the same problem shows up in 5+ threads, that's a pattern, not an anecdote."
        },
        {
          "label": "JSON report",
          "desc": "Formats a report with TOP 10 insights, links, upvote_range, and confidence scores. Adds Patterns, Controversies, and Gaps sections."
        }
      ],
      "inputs": [
        "Research question (e.g., Which multi-agent framework does the Reddit community prefer)",
        "Technical keywords to search for",
        "Sometimes a prior research report for iteration",
        "Optional context from other agents (usually none - isolation rule)"
      ],
      "outputs": [
        "Structured JSON report with TOP 10 insights",
        "Each insight with sentiment, frequency, and representative quotes",
        "Source links (reddit.com/r/... URLs) and upvote range",
        "Patterns Detected, Controversies, and Gaps sections",
        "Confidence scores 0.0-1.0 for each finding"
      ],
      "does": [
        "Finds unfiltered, honest developer opinion thanks to anonymity",
        "Identifies hidden problems ignored by the documentation",
        "Detects trends through patterns (10 people independently reporting the same problem)",
        "Gathers stack recommendations from people with real experience",
        "Extracts trade-offs from flamewars (React vs Vue etc.)",
        "Validates community consensus via voting (upvotes = crowdsourced peer review)",
        "Analyzes community sentiment over time (SHIFTING sentiments)"
      ],
      "doesNotDo": [
        "Does not read official documentation (that's the Tech Researcher's domain)",
        "Does not search for visual or design inspiration (that's the UX Researcher's domain)",
        "Does not analyze source code or Issues (that's the GitHub Researcher's domain)",
        "Does not make decisions - only recommends",
        "Does not talk to other researchers (isolation rule)",
        "Does not treat a single comment as truth (hunts for patterns)",
        "Does not ignore controversy - actively hunts for it"
      ],
      "antiPatterns": [
        "Single Comment Truth - one comment with 3 upvotes taken as the community opinion",
        "Outdated Thread - citing posts from 2 years ago as current opinion",
        "Echo Chamber - searching ONLY one subreddit (e.g., only pro-React r/reactjs)",
        "Rage Sampling - collecting ONLY negative opinions, ignoring praise",
        "Karma Blindness - treating a comment with 2 upvotes equal to a comment with 500"
      ],
      "keyConcepts": [
        {
          "term": "Subreddit semantics",
          "def": "Every subreddit has its own bias and skill level - you have to know where to look."
        },
        {
          "term": "Ground truth",
          "def": "Frontline truth from practitioners in the field, not from marketing brochures."
        },
        {
          "term": "Online disinhibition",
          "def": "Anonymity encourages honesty - people on Reddit say what they actually think."
        },
        {
          "term": "Survivorship bias",
          "def": "You mostly see problems (people asking for help) and successes, you miss the quiet failures."
        },
        {
          "term": "Flamewar",
          "def": "A heated discussion that exposes the strongest arguments pro and con for competing technologies."
        }
      ],
      "stats": [
        {
          "label": "Reddit users",
          "value": "430M/month"
        },
        {
          "label": "r/programming",
          "value": "6M subs"
        },
        {
          "label": "Load",
          "value": "50/100"
        },
        {
          "label": "Model",
          "value": "Haiku"
        }
      ],
      "bestFor": [
        "When you want to know what developers actually complain about, not what they say officially",
        "When you're looking for hidden framework problems ignored by the docs",
        "When you want a read on community sentiment toward a technology"
      ],
      "worstFor": [
        "When you're after technical facts (that's the Tech Researcher's domain)",
        "When you're after visual trends and design inspiration (that's UX)",
        "When you only have an hour and need quick answers"
      ],
      "relatedAgents": [
        "res_x",
        "res_forums",
        "res_github"
      ],
      "glossary": [
        {
          "term": "karma",
          "definition": "User reputation on Reddit - sum of up/downvotes across all their posts."
        },
        {
          "term": "subreddit",
          "definition": "A topical subforum on Reddit, e.g., r/webdev for web developers."
        },
        {
          "term": "upvote/downvote",
          "definition": "Voting system - the community filters content through votes."
        },
        {
          "term": "gilded",
          "definition": "A post or comment gifted gold by another user - a signal of high value."
        },
        {
          "term": "flamewar",
          "definition": "A heated argument between advocates of different technologies - a source of pro/con arguments."
        }
      ],
      "learningQuote": "Complaints on Reddit are opportunities for better solutions - the Reddit Researcher isn't looking for what's good, they're looking for where the problems live.",
      "realExample": "One day I analyzed 200 threads on r/nextjs about server actions bugs and found that 40 people independently reported the same problem with revalidateTag in middleware. That was a pattern, not an anecdote - and a warning to the team ahead of migration."
    },
    "res_x": {
      "tagline": "Trend hunter on the move - catches tech signals before they go mainstream",
      "missionShort": "The X Researcher monitors X/Twitter for the fastest signals about new technologies, product launches, and trends. Mission: deliver an early warning system for ecosystem shifts. Moves fast, but requires validation from other sources.",
      "whoIs": "The X Researcher is a tech war correspondent - standing on the front line of the X ecosystem, catching news before it hits blogs or documentation. Their power is speed, but speed has a cost - X has the highest noise-to-signal ratio of any research medium.",
      "analogy": "The X Researcher is a long-range radar on a ship - detects signals earliest, but sometimes sees false echoes. The captain has to listen to the radar, but verify every signal before changing course.",
      "howItWorks": [
        {
          "label": "Query breakdown",
          "desc": "Receives a research question from the Orchestrator and breaks it into X-specific sub-queries (trends, launches, technical threads)."
        },
        {
          "label": "Post scan",
          "desc": "Runs WebSearch with site:x.com and site:twitter.com operators. Pulls full threads with WebFetch, not just search engine snippets."
        },
        {
          "label": "Author evaluation",
          "desc": "Checks author Tier (1=tech creator, 5=commentator) and credentials. Calculates a hype_score 0-10 for each finding."
        },
        {
          "label": "Validation and report",
          "desc": "Marks validation_status (VALIDATED/PARTIALLY/REQUIRES_VALIDATION) and formats a JSON report with TOP 10 posts, engagement_metrics, and confidence scores."
        }
      ],
      "inputs": [
        "Research question (e.g., What are the AI agents trends in Q2 2026)",
        "Technical keywords to track",
        "Time window (last 48h, week, month)",
        "Optionally a prior report for context"
      ],
      "outputs": [
        "TOP 10 posts with links to the tweet",
        "Engagement metrics (likes, retweets, replies, bookmarks)",
        "Author credentials and Tier (1-5)",
        "Hype score 0-10 and validation_status per finding",
        "Hype Assessment and Gaps sections"
      ],
      "does": [
        "Catches new launches and announcements before they hit the documentation",
        "Identifies trends via post patterns (50 people in a week writing about X = trend)",
        "Detects the hype cycle and separates noise from signal",
        "Gathers expert opinions (Tier 1-2 influencers)",
        "Analyzes comparative debates (X vs Y) and surfaces trade-offs",
        "Measures engagement as a signal of interest (but NOT of truth)",
        "Validates technical threads from experienced engineers"
      ],
      "doesNotDo": [
        "Does not chase hype without validation - flags it as REQUIRES_VALIDATION",
        "Does not treat likes as proof of technical quality",
        "Does not read official documentation (that's Tech)",
        "Does not look for visual inspiration (that's UX)",
        "Does not analyze repositories (that's GitHub)",
        "Does not make decisions - reports what X says, not whether it's true",
        "Does not talk to other researchers (isolation rule)"
      ],
      "antiPatterns": [
        "Hype Follower - adopting the X narrative without verification (report reads like an enthusiastic tweet)",
        "Influencer Worship - treating popular accounts as authoritative regardless of competence",
        "Engagement = Truth - sorting by likes instead of substance",
        "Thread Cherry-Picking - selecting only confirming tweets, ignoring criticism",
        "Recency Obsession - only tweets from the last 24h, ignoring valuable ones from a week ago"
      ],
      "keyConcepts": [
        {
          "term": "Hype cycle",
          "def": "Trend lifecycle phase: day 1 explosion, day 7 backlash, day 30 silence. You need to know where you are on the curve."
        },
        {
          "term": "Noise-to-signal ratio",
          "def": "The ratio of noise to valuable content - X has the highest of any research source."
        },
        {
          "term": "Influencer Tier",
          "def": "Credibility hierarchy: tech creator - principal engineer - DevRel - content creator - commentator."
        },
        {
          "term": "Validation status",
          "def": "Whether a finding is confirmed by another source or requires validation (VALIDATED/PARTIALLY/REQUIRES_VALIDATION)."
        },
        {
          "term": "Context collapse",
          "def": "No context in 280 characters - you have to read the whole thread and replies to avoid losing the meaning."
        }
      ],
      "stats": [
        {
          "label": "X users",
          "value": "500M/month"
        },
        {
          "label": "Post half-life",
          "value": "4.2 h"
        },
        {
          "label": "Load",
          "value": "45/100"
        },
        {
          "label": "Cost/run",
          "value": "0.03 USD"
        }
      ],
      "bestFor": [
        "When you want to hear about new launches before blogs and documentation",
        "When you want to detect trends before they go mainstream",
        "When you want early warning on bugs and controversies"
      ],
      "worstFor": [
        "When you're after deep, detailed analysis (280 characters is too little)",
        "When you want facts instead of opinion (X is full of hype and marketing)",
        "When you don't want to fight bots and manipulation"
      ],
      "relatedAgents": [
        "res_reddit",
        "res_forums",
        "res_github"
      ],
      "glossary": [
        {
          "term": "hype_score",
          "definition": "A 0-10 scale rating the level of hype around a topic on X."
        },
        {
          "term": "thread",
          "definition": "A multi-part X post - posts linked into a thread, the key format for technical analysis."
        },
        {
          "term": "hot_take",
          "definition": "A fast, controversial opinion - usually oversimplified and requiring validation."
        },
        {
          "term": "engagement_metrics",
          "definition": "Likes, retweets, replies, bookmarks - signals of interest, not of truth."
        },
        {
          "term": "validation_status",
          "definition": "VALIDATED/PARTIALLY/REQUIRES_VALIDATION - whether the finding was confirmed by another source."
        }
      ],
      "learningQuote": "X is the fastest medium, but that speed has a cost - speed without validation is risk, speed with validation is a competitive edge.",
      "realExample": "One day I caught a thread from an Anthropic principal engineer about new model routing 6 hours before the official blog post. I marked it VALIDATED after a cross-check with res_tech and the team was able to plan migration ahead of the competition."
    },
    "res_github": {
      "tagline": "Archaeologist of working code - digs up patterns from the best open-source repos",
      "missionShort": "The GitHub Researcher searches open-source repositories for working code, architecture, and patterns. Mission: deliver evidence as code, not opinion. Avoids the 90% of abandoned projects and recommends a TOP 5 with health scores.",
      "whoIs": "The GitHub Researcher is an archaeologist excavating the ruins of working applications. They don't read docs about how you should build - they dig up repositories and see how building actually happens. They look at the foundations, the tooling, the bugs, and the repair history. Docs say what should work, GitHub says what actually works in production.",
      "analogy": "The GitHub Researcher is the building inspector checking a house before you buy - not looking at fresh paint and the nice facade, but reaching under the README, into Issues, commits, and architecture. Only then do they say: this foundation is solid, or run before it collapses.",
      "howItWorks": [
        {
          "label": "Repo search",
          "desc": "Breaks the question into sub-queries with GitHub operators (stars>100, pushed>date, language:typescript) and surfaces a TOP 10-15 of repositories."
        },
        {
          "label": "Health filter",
          "desc": "Rejects abandoned projects - filters by metrics: stars >100, commits <6 months, MIT/Apache license. Leaves a TOP 5 for deep analysis."
        },
        {
          "label": "Code analysis",
          "desc": "Reads README, package.json, the /src structure, .github/workflows. Reviews Issues (problems) and Pull Requests (how maintainers respond)."
        },
        {
          "label": "Cross-repo patterns",
          "desc": "Scores 8 health metrics and bus factor, and extracts patterns across the 5 repos - what repeats in 4 of 5. JSON report with recommendations."
        }
      ],
      "inputs": [
        "Research question (e.g., What architecture dominates SaaS repos)",
        "Technical keywords and architecture types",
        "Sometimes existing project code for comparison",
        "Team context (size, seniority) - optional"
      ],
      "outputs": [
        "TOP 5 repositories with URL and metrics (stars, forks, last commit)",
        "Health_score 0-10, architecture, and tech stack per repo",
        "Notable Issues and code patterns recurring inside the repository",
        "Cross-repo patterns - patterns shared across all 5 repos (the key output)",
        "Recommendations, Risks, and Gaps"
      ],
      "does": [
        "Finds working code across tens of millions of GitHub repositories",
        "Extracts architecture from real implementations (not textbook theory)",
        "Scores repository health using 8 metrics (health score)",
        "Identifies hidden problems by reading Issues",
        "Surfaces cross-repo patterns - what the best repos are doing",
        "Validates technology adoption by counting usage in top repos",
        "Scores risk - bus factor, community health, maintainer activity",
        "Delivers evidence as code, not opinion"
      ],
      "doesNotDo": [
        "Does not copy code into the project (that's the Builder's job)",
        "Does not run code (npm test, docker compose up) - no Bash access",
        "Does not judge interface aesthetics (that's UX)",
        "Does not make decisions - recommends, the Orchestrator decides",
        "Does not search other researchers' sources (each has their own turf)",
        "Does not treat a single repo as truth - compares minimum 5",
        "Does not ignore dates - a repo with no commits for 2 years is abandoned"
      ],
      "antiPatterns": [
        "Star Worship - picking a repo purely by star count (15K stars, but abandoned since 2023)",
        "Blind Copy - recommending \"copy the architecture from repo X\" without analyzing context",
        "Abandoned Repo Adoption - recommending a repo with no commits in 2 years",
        "README Deception - judging a repo only by the README without checking code and Issues",
        "Single Repo Fixation - entire analysis on one repository, no comparison to alternatives"
      ],
      "keyConcepts": [
        {
          "term": "bus_factor",
          "def": "Number of contributors who'd have to leave for the project to die - 1 = critical risk."
        },
        {
          "term": "cross_repo_pattern",
          "def": "A pattern recurring across multiple repositories (4/5 use Prisma = pattern)."
        },
        {
          "term": "health_score",
          "def": "A 0-10 repo health score based on 8 metrics: Stars, Last Commit, Issues, PRs, Contributors, License, Tests, README."
        },
        {
          "term": "dependency_health",
          "def": "Whether the packages in package.json are actively maintained and whether they have known CVEs."
        },
        {
          "term": "code_smell",
          "def": "Subtle architectural problems - poor separation of concerns, oversized components, no tests."
        }
      ],
      "stats": [
        {
          "label": "Repositories",
          "value": "420M+"
        },
        {
          "label": "Abandoned",
          "value": "90%"
        },
        {
          "label": "Load",
          "value": "55/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you want to see how the best projects actually build",
        "When you're looking for reference architectures and code patterns",
        "When you want to verify whether a technology has adoption in top repos"
      ],
      "worstFor": [
        "When you need quick answers (GitHub research takes 45-120s)",
        "When you want theory or benchmarks (that's Tech's domain)",
        "When the project is too new and has no public repos yet"
      ],
      "relatedAgents": [
        "res_reddit",
        "res_forums",
        "res_tech"
      ],
      "glossary": [
        {
          "term": "fork",
          "definition": "A copy of a repository - if someone forks a repo, they're using it or want to modify it."
        },
        {
          "term": "pull_request",
          "definition": "A proposed change - shows the code review culture and how maintainers communicate."
        },
        {
          "term": "issue",
          "definition": "A problem reported by a user - Issues are a user interview with the repo's users."
        },
        {
          "term": "health_score",
          "definition": "A 0-10 repo health score from 8 metrics: Stars, Last Commit, Issues, PRs, Contributors, License, Tests, README."
        },
        {
          "term": "github_actions",
          "definition": "CI/CD automation - Workflows show whether the project has tests and how mature the process is."
        }
      ],
      "learningQuote": "GitHub gives you real code, not theory - because code either works or it doesn't. A TOP 5 from GitHub is the anchor of the whole multi-agent analysis.",
      "realExample": "One day I compared the top 5 Next.js SaaS boilerplates and discovered that 4 of 5 use Prisma + tRPC + NextAuth - that was the cross-repo pattern that became the anchor recommendation for the startup's team."
    },
    "res_forums": {
      "tagline": "Tracker of traps and fixes - cataloging where everyone tripped and how they climbed out",
      "missionShort": "The Forums Researcher scans forums, blogs, and Q&A platforms for solved problems and hidden traps. Mission: deliver concrete, verified solutions with code. Every accepted StackOverflow answer is a problem solved in production.",
      "whoIs": "The Forums Researcher is the librarian of a technical library who knows every shelf not alphabetically, but by which books have dog-eared corners - because practitioners keep coming back to them. They search StackOverflow, Dev.to, Medium, and Hacker News. Every accepted answer is a verdict - a verified solution.",
      "analogy": "Documentation tells you the happy path. Forums tell you where everyone tripped - because behind every accepted StackOverflow answer there's a scar from a real production problem.",
      "howItWorks": [
        {
          "label": "Sub-queries",
          "desc": "Breaks the question into platform-specific sub-queries and uses site:stackoverflow.com, site:dev.to, site:medium.com, site:news.ycombinator.com operators."
        },
        {
          "label": "Quality filter",
          "desc": "Rejects questions without answers, posts older than 18 months, and answers with fewer than 5 votes. Pulls the content of the TOP 10-15 results."
        },
        {
          "label": "Gotcha extraction",
          "desc": "Scores Answer Quality 1-10 and extracts gotchas - hidden traps like \"it works BUT...\" or \"the docs say X, but in practice...\"."
        },
        {
          "label": "Cross-validate and report",
          "desc": "Checks whether the same problem appears on 2+ platforms (SO+Dev.to = confidence 0.85). Formats a JSON report with TOP 10 takeaways."
        }
      ],
      "inputs": [
        "Research question (e.g., Problems migrating Prisma v5 to v6)",
        "Technical keywords",
        "Time window: last 12-18 months (older = risky)",
        "Sometimes a prior report for iteration"
      ],
      "outputs": [
        "TOP 10 takeaways - practical solutions with links",
        "Answer_score, post_date, technology_version per finding",
        "Accepted flag - whether the asker confirmed it worked",
        "Gotchas - hidden traps (the most valuable part of the report)",
        "Cross-validated flag and confidence score 0.0-1.0"
      ],
      "does": [
        "Finds verified solutions (accepted StackOverflow answers)",
        "Identifies recurring problems across platforms",
        "Extracts gotchas - hidden traps not mentioned in the docs",
        "Gathers step-by-step tutorials with concrete benchmarks",
        "Analyzes whether solutions are practically applicable",
        "Validates via cross-platform confirmation (SO + Dev.to + HN)",
        "Scores authors - whether senior engineer or beginner",
        "Skips stale content and deprecated APIs"
      ],
      "doesNotDo": [
        "Does not read official documentation (that's Tech's domain)",
        "Does not look for visual inspiration (that's UX's domain)",
        "Does not analyze code in repositories (that's GitHub's domain)",
        "Does not make decisions - reports problems and solutions",
        "Does not talk to other researchers (isolation rule)",
        "Does not cite unanswered questions as evidence of problems",
        "Does not treat vote count as an absolute truth indicator"
      ],
      "antiPatterns": [
        "Unanswered Echo - citing unanswered questions as proof a problem exists",
        "Upvote Worship - treating vote count as an absolute correctness indicator (500 votes from 2019 = stale)",
        "Medium Paywall Trap - citing paywalled articles without checking availability",
        "Outdated Tutorial - citing a tutorial for an old version of a technology as if it were current",
        "Single Source Syndrome - entire recommendation built on one forum post, no cross-validation"
      ],
      "keyConcepts": [
        {
          "term": "accepted_answer",
          "def": "A StackOverflow answer marked by the asker as solving the problem - confirmation that it worked."
        },
        {
          "term": "gotcha",
          "def": "A hidden trap that doesn't come from the official docs - the core value of forum research."
        },
        {
          "term": "cross_platform_validation",
          "def": "Confirmation of a finding in more than one source (SO+Dev.to+HN = highest confidence)."
        },
        {
          "term": "practical_applicability",
          "def": "Whether a finding can be dropped into the project as-is without additional modification."
        },
        {
          "term": "tutorial_freshness",
          "def": "Whether a tutorial is current - whether it applies to the current version of the technology (critical for fast-moving frameworks)."
        }
      ],
      "stats": [
        {
          "label": "SO answers",
          "value": "58M"
        },
        {
          "label": "Accepted",
          "value": "8M+"
        },
        {
          "label": "Load",
          "value": "50/100"
        },
        {
          "label": "Cost/run",
          "value": "0.024 USD"
        }
      ],
      "bestFor": [
        "When the docs describe the happy path but you want to know where people actually trip",
        "When you're looking for concrete, verified solutions with code",
        "When you want to hear about gotchas that aren't in the docs"
      ],
      "worstFor": [
        "When you need fast answers (many searches and WebFetch calls)",
        "When you want official specifications and benchmarks (that's Tech's domain)",
        "When you're researching brand-new technology (still no SO questions)"
      ],
      "relatedAgents": [
        "res_reddit",
        "res_github",
        "res_tech"
      ],
      "glossary": [
        {
          "term": "accepted",
          "definition": "An answer accepted by the asker - means it solved their problem."
        },
        {
          "term": "upvote",
          "definition": "A supporting vote - but votes can be old and stale for new versions of a technology."
        },
        {
          "term": "gotcha",
          "definition": "A hidden trap, e.g., revalidateTag() doesn't work in middleware.ts even though the docs don't say so."
        },
        {
          "term": "cross_validation",
          "definition": "Confirmation of a finding in 2+ sources - raises the confidence score."
        },
        {
          "term": "tutorial_freshness",
          "definition": "Whether the tutorial applies to the current version of the technology - critical for frameworks."
        }
      ],
      "learningQuote": "Documentation tells you the happy path. Forums tell you where everyone tripped - every accepted StackOverflow answer is someone else's problem solved.",
      "realExample": "One day I found 8 threads on SO with the same gotcha: revalidateTag doesn't work in middleware.ts in Next.js 14. Every accepted answer pointed to a workaround in a route handler - it saved the team from a 3-day debugging session."
    },
    "res_docs": {
      "tagline": "A lawyer reading framework statutes - official sources only, zero gossip",
      "missionShort": "Researcher Docs gathers technical facts exclusively from official framework, library, and tool documentation. Its mission: deliver source of truth with paragraphs and links, not opinions. It operates on authorized vendor materials only.",
      "whoIs": "Researcher Docs is the archivist and librarian of internal technology knowledge. It behaves like a lawyer studying statutes and precedents - it does not care about gossip or forum opinions, only what the technology authors themselves wrote in getting started guides, API references, and release notes.",
      "analogy": "This agent is like a lawyer researching statutes - it does not quote TV commentators, only code paragraphs with section numbers and effective dates.",
      "howItWorks": [
        {
          "label": "Source selection",
          "desc": "Locates official vendor documentation for the exact framework version in use. Rejects third-party tutorials and blog posts because they are not source of truth."
        },
        {
          "label": "Fragment extraction",
          "desc": "Pulls getting started guides, best practices, performance tips, security guidelines, and ready-to-use config snippets. Every fragment is tagged with a link to its paragraph."
        },
        {
          "label": "Version verification",
          "desc": "Checks that documentation matches the framework version in the project. Docs for Next.js 13 in a Next.js 15 project is false information."
        },
        {
          "label": "Structured reference",
          "desc": "Builds an index with multiple sources, precise quotes, and URL links. Format: fragment + source + version + fetch date."
        }
      ],
      "inputs": [
        "Technical question about a framework or library specification",
        "Framework version used in the project (critical for accuracy)",
        "List of topics to cover (setup, config, security, perf)",
        "Optional context from Researcher Tech with candidate list"
      ],
      "outputs": [
        "Index of documentation fragments with links to paragraphs",
        "Config snippets with working code examples",
        "Best practices and performance tips from official sections",
        "Security guidelines from official security advisories",
        "List of framework versions and documentation publication dates"
      ],
      "does": [
        "Gathers information exclusively from official framework and library documentation",
        "Extracts best practices, performance tips, and security guidelines from vendor sections",
        "Documents config snippets with working examples and version numbers",
        "Builds a structured reference guide with multiple sources and precise links",
        "Verifies documentation currency against the framework version in the project",
        "Cites API reference paragraphs for every technical claim",
        "Identifies release notes and migration guides for major versions",
        "Maps the ecosystem of plugins and extensions officially recommended by the vendor"
      ],
      "doesNotDo": [
        "Does not quote user opinions or forum posts (that is Researcher Forum territory)",
        "Does not compare technologies or run pros/cons analysis (that is Researcher Tech territory)",
        "Does not implement code or integrate libraries (that is Builder territory)",
        "Does not subjectively rate framework quality, only reports facts from docs",
        "Does not collect gossip from Reddit or X/Twitter (other research domains)",
        "Does not mix versions - never cites docs for an outdated version",
        "Does not interpret documentation creatively, only quotes verbatim with context"
      ],
      "antiPatterns": [
        "Version Mismatch - quoting docs for Next.js 13 when the project uses Next.js 15, totally false info.",
        "Docs Tunnel Vision - official documentation often omits edge cases and real-world gotchas, it is not omniscient.",
        "Stale Snapshot - fetching docs once and quoting them half a year later without verifying release note changes.",
        "Tutorial Trap - sliding into blog posts under the pretext of official docs just because they link to the official site.",
        "Marketing Page Confusion - quoting the vendor marketing section instead of the technical API reference."
      ],
      "keyConcepts": [
        {
          "term": "Source of truth",
          "def": "The authorized vendor source of a technology, from which there is no further appeal."
        },
        {
          "term": "API reference",
          "def": "Full specification of functions, classes, parameters, and types with usage examples."
        },
        {
          "term": "Release notes",
          "def": "List of changes between versions - critical for assessing breaking changes."
        },
        {
          "term": "Version pinning",
          "def": "Citing documentation together with the framework version number used in the project."
        },
        {
          "term": "Migration guide",
          "def": "Official walkthrough for moving from version X to version Y with a change list."
        }
      ],
      "stats": [
        {
          "label": "Sources",
          "value": "Official"
        },
        {
          "label": "Extraction type",
          "value": "Quotes + links"
        },
        {
          "label": "Load",
          "value": "40/100"
        },
        {
          "label": "Model",
          "value": "Haiku"
        }
      ],
      "bestFor": [
        "When you need hard technical facts backed by paragraphs from vendor docs",
        "When the project must follow official best practices (security, performance, a11y)",
        "When picking framework configuration and you want ready snippets from the API reference"
      ],
      "worstFor": [
        "When you want real practitioner experience from production (that is Researcher Reddit and Forum)",
        "When comparing competing frameworks and need a recommendation (that is Researcher Tech)",
        "When you care about edge cases and gotchas omitted from official materials"
      ],
      "relatedAgents": [
        "res_tech",
        "res_forums",
        "res_critic"
      ],
      "glossary": [
        {
          "term": "docs",
          "definition": "Official technical documentation maintained by the framework or library vendor."
        },
        {
          "term": "changelog",
          "definition": "Chronological log of changes between versions - the source of truth for breaking changes."
        },
        {
          "term": "api",
          "definition": "Application Programming Interface - the contract of function calls and data types."
        },
        {
          "term": "snippet",
          "definition": "Ready-to-paste fragment of code from official documentation, usually with comments."
        },
        {
          "term": "semver",
          "definition": "Semantic Versioning - the MAJOR.MINOR.PATCH convention determining version compatibility."
        }
      ],
      "learningQuote": "Vendor documentation is the constitution of a technology - not everyone loves it, but every other source falls back to it when a dispute arises.",
      "realExample": "Imagine that one day I was gathering config for Postgres 16 and found a paragraph in the official release notes about a change in the default logical replication slot. Pasting it into the report saved the team two days of debugging, because their migration was using the old default from version 15."
    },
    "res_critic": {
      "tagline": "A peer reviewer before publication - catches every contradiction and bias in research reports",
      "missionShort": "Research Critic validates the outputs of all researchers, hunting for contradictions, confirmation bias, gaps, and outdated sources. Its mission: protect the project from weak research that would propagate into architectural decisions. Highest load in the RESEARCH layer (85/100).",
      "whoIs": "Research Critic is an auditor agent that behaves like a peer reviewer before publication in Nature. It reads reports simultaneously from the perspective of a methodologist, a statistician, and a domain expert. It does not run its own research - it audits others and flags every claim without evidence.",
      "analogy": "This agent is like a peer reviewer before publication - it does not run the experiment, but it will catch every chart without error bars and every claim without a citation.",
      "howItWorks": [
        {
          "label": "Report intake",
          "desc": "Receives outputs from 6 researchers (Tech, UX, Reddit, X, GitHub, Forum, Docs) and loads them all at once. It must see the whole ecosystem, because contradictions only show up in comparison."
        },
        {
          "label": "Cross-validation",
          "desc": "Hunts for contradictions between reports (e.g. Tech recommends React, Reddit complains about React). Every contradiction is flagged for resolution."
        },
        {
          "label": "Rubric scoring",
          "desc": "Scores each report against the rubric: Completeness 25%, Accuracy 25%, Relevance 20%, Freshness 20%, Actionability 10%. A sum below 6/10 triggers REVISE."
        },
        {
          "label": "Critic report",
          "desc": "Produces CRITIC.md with a list of contradictions, data gaps, identified biases, and a PASS or REVISE recommendation per researcher."
        }
      ],
      "inputs": [
        "A set of 3-7 reports from researchers (Tech, UX, Reddit, X, GitHub, Forum, Docs)",
        "The original research question set by the Orchestrator",
        "Scoring rubric with weights (Completeness, Accuracy, Relevance, Freshness, Actionability)",
        "Optional previous report versions from iteration history"
      ],
      "outputs": [
        "CRITIC.md with a PASS or REVISE verdict per researcher",
        "List of contradictions between reports with citations",
        "List of gaps - what nobody investigated and what is missing",
        "Per-report score on a 0-10 scale with reasoning per dimension",
        "Recommendations for follow-up iterations or delta research"
      ],
      "does": [
        "Cross-validates 3-7 researcher reports looking for contradictions and conflicts",
        "Rates source credibility - currency, independence, author track record",
        "Identifies confirmation bias - did the researcher seek evidence for a thesis or actual facts",
        "Applies rubric scoring with Completeness/Accuracy/Relevance/Freshness/Actionability weights",
        "Detects gaps - questions left unanswered and areas not investigated",
        "Flags stale data - benchmarks older than 2 years, EOL framework versions",
        "Distinguishes CRITICAL from NICE-TO-HAVE in reports, does not block over cosmetics",
        "Recommends delta research on specific gaps instead of repeating the whole thing"
      ],
      "doesNotDo": [
        "Does not run its own research - it audits others, never duplicates work",
        "Does not make technology decisions - it flags issues, the call belongs to the Orchestrator",
        "Does not write code or implement anything - pure analytical auditor role",
        "Does not accept reports without deep analysis - rubber stamping is an anti-pattern",
        "Does not meddle with researcher tools - it judges the output, not the collection method",
        "Does not judge report writing style, only content and source credibility",
        "Does not communicate with researchers - isolation rule, works offline with text"
      ],
      "antiPatterns": [
        "Rubber Stamp - accepting reports without deep analysis, letting weak research slip into the Build phase.",
        "Overcritical Block - blocking progress over minor issues without distinguishing CRITICAL from NICE-TO-HAVE.",
        "Single-Source Trust - accepting a claim because one researcher supports it while ignoring three others who contradict it.",
        "Groupthink Validation - marking reports as consistent when they simply copied the same error from a bad source.",
        "Vintage Bias - treating an older source as more authoritative, ignoring that it is from pre-LLM times."
      ],
      "keyConcepts": [
        {
          "term": "Cross-validation",
          "def": "Comparing conclusions from multiple independent reports to detect contradictions."
        },
        {
          "term": "Confirmation bias",
          "def": "Seeking evidence that confirms a predetermined thesis instead of objective assessment."
        },
        {
          "term": "Rubric scoring",
          "def": "Scoring each report along fixed dimensions with weighted point values."
        },
        {
          "term": "Source credibility",
          "def": "Evaluating a source by currency, independence, and author track record."
        },
        {
          "term": "Gap analysis",
          "def": "Identifying questions left unanswered by all researchers."
        }
      ],
      "stats": [
        {
          "label": "Reports per session",
          "value": "3-7"
        },
        {
          "label": "REVISE threshold",
          "value": "<6/10"
        },
        {
          "label": "Load",
          "value": "85/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you have a full set of reports from multiple researchers and want to verify their consistency",
        "When stakes are high and weak research would cost weeks of work in the Build phase",
        "When you need an objective PASS or REVISE verdict before moving into a Five Minds debate"
      ],
      "worstFor": [
        "When you have only one report (nothing to cross-validate, no comparison basis)",
        "When the task is simple and formal critique would stretch the pipeline without value",
        "When you need fresh data collection (that is researcher territory, not critic)"
      ],
      "relatedAgents": [
        "synthesizer",
        "res_tech",
        "expert_devil"
      ],
      "glossary": [
        {
          "term": "rubric",
          "definition": "Standardized set of scoring criteria with weights, used by peer reviewers."
        },
        {
          "term": "peer review",
          "definition": "Process of evaluating work by independent experts in the same field."
        },
        {
          "term": "bias",
          "definition": "Systematic distortion of conclusions caused by author or source prejudice."
        },
        {
          "term": "gap",
          "definition": "Knowledge gap - an area not investigated by any researcher in a given session."
        },
        {
          "term": "revise",
          "definition": "Verdict that sends a report back to the author with a list of required fixes before acceptance."
        }
      ],
      "learningQuote": "Weak research is worse than no research - no research forces caution, while weak research gives a false sense of certainty.",
      "realExample": "Imagine that one day I audited 6 reports on ORM selection and found that Tech was citing 2022 benchmarks while Reddit and GitHub reported that since 2024 those same libraries are slow in connection pooling mode. I flagged it as CRITICAL and the team avoided deploying a tool that no longer meets SLA."
    },
    "backend": {
      "tagline": "A session musician of code - turns specs into working software without improvising",
      "missionShort": "Backend Dev is the first agent of the BUILD layer and materializes plans into running code. Its mission is to implement APIs, data schemas, validation, and business logic according to spec. It does not design, does not research - it executes with surgical precision.",
      "whoIs": "Backend Dev behaves like a master carpenter or a surgical resident - it receives a precise blueprint from the Planner and executes it without questioning the strategy. This is the agent where plans stop being documents and become software you can actually run.",
      "analogy": "This agent is like a surgical resident who executes the operation plan with precision - it does not change the strategy, it just carries it out flawlessly step by step.",
      "howItWorks": [
        {
          "label": "Reading the spec",
          "desc": "Loads the spec from the Planner and MANIFEST.md. Identifies functional requirements, data schemas, API contracts, and constraints."
        },
        {
          "label": "Writing code",
          "desc": "Creates new files (Write) and modifies existing ones (Edit) implementing endpoints, validation, and business logic in the master-carpenter style."
        },
        {
          "label": "Run and test",
          "desc": "Runs the code via Bash (node, python, npm run build), verifies zero errors, and checks basic functionality plus edge cases."
        },
        {
          "label": "QA loop",
          "desc": "Has a maximum of two iterations to fix issues after a QA report. After the second iteration, errors escalate to the Orchestrator."
        }
      ],
      "inputs": [
        "Technical spec from the Planner or Orchestrator",
        "Design tokens and components from the Designer",
        "MANIFEST.md with requirements and contracts",
        "Error report from QA in the feedback loop"
      ],
      "outputs": [
        "Working backend source files (JS, Python, Go)",
        "API endpoints with input and output validation",
        "Data schemas and database migrations",
        "Inline JSDoc comments for public functions",
        "Logs from execution and basic tests"
      ],
      "does": [
        "Implements REST endpoints and business logic according to spec",
        "Builds input validation schemas using Zod, Pydantic, or Joi",
        "Runs code via Bash verifying zero runtime errors",
        "Writes error handling with specific HTTP codes and structured responses",
        "Adds inline comments for complex logic and public API",
        "Modifies existing files precisely with the Edit tool instead of overwriting",
        "Reads project context (Read) to reuse existing patterns",
        "Iterates on QA fixes at most twice before escalating the problem"
      ],
      "doesNotDo": [
        "Does not research technologies (that is Researcher Tech territory)",
        "Does not make architectural decisions (that is Planner territory)",
        "Does not design UI or CSS (that is Designer territory)",
        "Does not write README or external documentation (that is Writer territory)",
        "Does not merge the work of other builders (that is Integrator territory)",
        "Does not run security audits or pentests (that is QA Security territory)",
        "Does not improvise or question the spec - it implements"
      ],
      "antiPatterns": [
        "Premature Optimization - optimizing a non-existent bottleneck instead of a simple spec-compliant implementation.",
        "Stringly Typed API - passing everything as strings instead of types, enums, and structured objects.",
        "Naked Response - returning raw results without a wrapper, status, version, or error handling.",
        "Scope Creep - writing code beyond the spec, adding nice features nobody ordered.",
        "Silent Failure - catching exceptions without logging and without propagating the error to the API layer."
      ],
      "keyConcepts": [
        {
          "term": "Spec as score",
          "def": "Backend Dev plays exactly what is written - it does not improvise like a composer, it executes like a session musician."
        },
        {
          "term": "QA loop",
          "def": "At most two fix iterations after an audit, then escalation to the Orchestrator with an error report."
        },
        {
          "term": "Inline docs",
          "def": "Comments only for non-trivial logic and public API, never for obvious instructions."
        },
        {
          "term": "Idempotency",
          "def": "PUT and DELETE endpoints must yield the same result regardless of how many times they are called."
        },
        {
          "term": "Separation of concerns",
          "def": "Routing, validation, business logic, and data layer are separated and tested independently."
        }
      ],
      "stats": [
        {
          "label": "Input tokens",
          "value": "20-40k"
        },
        {
          "label": "Output tokens",
          "value": "10-30k"
        },
        {
          "label": "Load",
          "value": "75/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you have a finished spec and need working backend code",
        "When you want an API implementation matching the contract without improvisation",
        "When you need validation, error handling, and inline docs baked into the code"
      ],
      "worstFor": [
        "When you do not yet know which technology to pick (use Researcher Tech)",
        "When you need architectural decisions (ask the Planner or Analyst)",
        "When you want beautiful CSS and animations (that is Designer, not Backend Dev)"
      ],
      "relatedAgents": [
        "db_architect",
        "integrator",
        "qa_quality"
      ],
      "glossary": [
        {
          "term": "endpoint",
          "definition": "An API address handling a specific operation, e.g. POST /api/users for creating a user."
        },
        {
          "term": "validation",
          "definition": "Checking the shape and type of input data before handing it off to business logic."
        },
        {
          "term": "migration",
          "definition": "A script that changes the database schema in a repeatable and reversible way."
        },
        {
          "term": "lint",
          "definition": "Automatic check of code style and static errors, e.g. ESLint for JavaScript."
        },
        {
          "term": "Sonnet",
          "definition": "Mid-tier Claude model, the tradeoff between code quality and call cost."
        }
      ],
      "learningQuote": "Backend Dev does not question the plan - it executes it with precision. Its value lies not in creativity but in flawless execution.",
      "realExample": "Imagine that one day I received a spec for a POST /api/users endpoint with Zod validation and handling of five error codes. I implemented it in 30 minutes, ran it with node app.js, verified the edge case with an empty email, and handed it to QA. First iteration - three small fixes. Second iteration - zero bugs. The code shipped to the Integrator."
    },
    "frontend": {
      "tagline": "A furniture carpenter for UI - components beautiful, accessible, and fast from line one",
      "missionShort": "Frontend Dev implements the client layer mobile-first. It builds reusable React/Vue components with handling for all states (loading, error, empty, success). Its mission: deliver an interface where accessibility and performance are built in, not bolted on at the end.",
      "whoIs": "Frontend Dev is the craftsman of the layer users actually see. It behaves like a furniture carpenter making custom pieces - every component must be beautiful, comfortable, durable, and fit the room (layout). It does not design - it receives tokens from the Designer and implements them.",
      "analogy": "This agent is like a furniture carpenter - it receives the design from an interior architect (Designer) and builds a piece that is beautiful, ergonomic, and fits the room.",
      "howItWorks": [
        {
          "label": "Design system analysis",
          "desc": "Reads Designer tokens: palette, typography, grid, spacing, radii, and shadows. Without a design system it does not start work, because the result would be inconsistent UI."
        },
        {
          "label": "Component skeleton",
          "desc": "Builds reusable components from the smallest (Button, Input) to the complex (Form, Table). Every component has props, states, and aria attributes from the start."
        },
        {
          "label": "States and edge cases",
          "desc": "Implements four states per component: loading (spinner/skeleton), error (message + retry), empty (empty state + CTA), success (data). Without this the UI is not ready."
        },
        {
          "label": "Performance and a11y",
          "desc": "Adds lazy loading, code splitting, image optimization. Verifies keyboard navigation, focus traps, aria-live, and WCAG AA contrasts."
        }
      ],
      "inputs": [
        "Design system with CSS tokens (palette, typography, grid)",
        "Component spec with wireframes and mockups",
        "API contracts from Backend Dev (endpoints, payloads, errors)",
        "Accessibility requirements (WCAG 2.2 AA minimum) and target devices"
      ],
      "outputs": [
        "React/Vue/Svelte components with props and states",
        "CSS/SCSS/Tailwind files implementing design tokens",
        "Component tests (React Testing Library, Vitest)",
        "Component usage docs (Storybook or MDX)",
        "Lighthouse report with Core Web Vitals metrics"
      ],
      "does": [
        "Implements responsive mobile-first layout (60%+ of traffic is mobile in 2026)",
        "Builds reusable components handling loading/error/empty/success states",
        "Ensures accessibility: aria-labels, keyboard navigation, focus management, skip links",
        "Optimizes performance: lazy loading, code splitting, image optimization, tree shaking",
        "Implements the Designer design system with CSS tokens and typography",
        "Integrates frontend API calls to backend endpoints with error handling",
        "Writes unit tests for components (React Testing Library, Vitest)",
        "Enforces Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1 as the baseline goal"
      ],
      "doesNotDo": [
        "Does not design the interface look (that is Designer territory)",
        "Does not implement the server API or business logic (that is Backend Dev territory)",
        "Does not write security tests or OWASP audits (that is QA Security territory)",
        "Does not pick the framework stack (that is Orchestrator territory with research)",
        "Does not implement real-time WebSocket or D3 visualizations (that is Feature Dev territory)",
        "Does not manage the database or schema (that is Backend or DB Architect territory)",
        "Does not rate the performance of the whole system (that is QA Performance territory)"
      ],
      "antiPatterns": [
        "Desktop-First - designing for desktop and adapting to mobile, instead of mobile-first as the 2026 standard.",
        "Prop Drilling Hell - passing props through 5+ component levels instead of using context or state management.",
        "Accessibility Afterthought - adding a11y at the end instead of building it in from the start (retrofit is 10x more expensive).",
        "CSS Nuclear War - using !important everywhere instead of CSS cascade and specificity.",
        "Loading State Missing - rendering undefined instead of a skeleton while data is in flight to the API."
      ],
      "keyConcepts": [
        {
          "term": "Mobile-first",
          "def": "Starting design on a small screen and expanding to desktop with min-width media queries."
        },
        {
          "term": "Design tokens",
          "def": "CSS variables defining palette, typography, grid, and spacing - the single source of truth for style."
        },
        {
          "term": "Core Web Vitals",
          "def": "Three Google metrics rating UX: LCP (loading), FID (responsiveness), CLS (stability)."
        },
        {
          "term": "WCAG 2.2 AA",
          "def": "W3C accessibility standard defining contrasts, keyboard nav, and media alternatives."
        },
        {
          "term": "Code splitting",
          "def": "Splitting the JS bundle into smaller chunks loaded on demand, cutting time to interactive."
        }
      ],
      "stats": [
        {
          "label": "LCP target",
          "value": "<2.5s"
        },
        {
          "label": "Bundle target",
          "value": "<250KB gzip"
        },
        {
          "label": "Load",
          "value": "70/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you want to build the visible layer of a web app with React/Vue/Svelte components",
        "When you have a finished design system from the Designer and need a faithful implementation",
        "When the project demands high accessibility and performance with Core Web Vitals metrics"
      ],
      "worstFor": [
        "When you need real-time WebSocket, AI streaming, or D3 visualizations (that is Feature Dev)",
        "When you need to design a design system from scratch without a designer (that is Designer)",
        "When the task is only backend API with no UI (that is Backend Dev)"
      ],
      "relatedAgents": [
        "designer",
        "backend",
        "feature"
      ],
      "glossary": [
        {
          "term": "component",
          "definition": "An independent, reusable UI unit with its own state, props, and styles."
        },
        {
          "term": "props",
          "definition": "Parameters passed to a component from its parent in React or Vue."
        },
        {
          "term": "hydration",
          "definition": "Process of activating JavaScript interactivity on static HTML rendered by SSR."
        },
        {
          "term": "ssr",
          "definition": "Server-Side Rendering - generating HTML on the server before sending it to the browser."
        },
        {
          "term": "a11y",
          "definition": "Short for accessibility - techniques ensuring UI is usable by people with disabilities."
        }
      ],
      "learningQuote": "An interface without a loading state is a lie - the user sees a blank screen and assumes the app broke, when in fact the data is just in flight from the server.",
      "realExample": "Imagine that one day I was building a user table in React and added four states: skeleton during loading, error with retry button, empty state with Add User CTA, success with the table. The same function works on mobile at 320px and on a 4K desktop, because I started from a mobile-first grid."
    },
    "feature": {
      "tagline": "A special effects specialist - WebSocket, AI streaming, D3, OAuth",
      "missionShort": "Feature Dev implements advanced functionality that requires niche expertise: real-time, AI/ML integrations, data visualization, third-party APIs. Its mission: do the things a regular Backend or Frontend Dev cannot. It steps in when you need to go beyond standard CRUD.",
      "whoIs": "Feature Dev is a specialist agent, like a special effects engineer in film. It behaves like a pyrotechnician wiring an explosion scene - it does things a regular camera operator cannot. WebSocket, AI streaming, and D3 are the explosions, and they demand different expertise than standard CRUD.",
      "analogy": "This agent is like a special effects specialist in film - it does not shoot the dialog, but without it there would be no explosion scene that defines the whole movie.",
      "howItWorks": [
        {
          "label": "Niche analysis",
          "desc": "Identifies the niche requirement - is it WebSocket, LLM streaming, data visualization, or OAuth flow. Based on type it picks a specialized library and protocol."
        },
        {
          "label": "Dry-run prototype",
          "desc": "Builds a minimal working prototype (e.g. WebSocket echo, D3 hello world, mock OAuth) to verify the library fits the stack with no showstoppers."
        },
        {
          "label": "Project integration",
          "desc": "Wires the prototype to real endpoints, data, and UI. Implements reconnection handling, retries, streaming chunks, and edge cases specific to the niche."
        },
        {
          "label": "Handoff and docs",
          "desc": "Passes the code to the Integrator with a note on how the library works and what not to do. Records the decision (e.g. why WebSocket over SSE) in a decision record."
        }
      ],
      "inputs": [
        "Spec of the niche requirement (real-time, AI, visualization, integration)",
        "Context from Backend and Frontend Dev about existing endpoints and UI",
        "Research from Researcher Tech about candidate libraries",
        "Performance, token budget, or API rate limit constraints"
      ],
      "outputs": [
        "Real-time implementation (WebSocket, SSE) with reconnection logic",
        "AI/ML integration with streaming, function calling, and rate limiting",
        "Data visualizations (D3.js, Chart.js, SVG, Canvas) with interactions",
        "Third-party API integrations (Stripe, OAuth, webhooks)",
        "Decision record explaining the choice of library and protocol"
      ],
      "does": [
        "Implements real-time features: WebSocket, Server-Sent Events, long polling with reconnection",
        "Integrates AI/ML: streaming API calls, embeddings, function calling, prompt chaining",
        "Builds data visualizations with D3.js, Chart.js, SVG, Canvas, and interactions",
        "Integrates third-party APIs: Stripe, Firebase, AWS SDK, OAuth flows, webhook handlers",
        "Implements specialized libraries: PDF generation, image processing, email templates",
        "Picks libraries with care for bundle size and open source licenses",
        "Writes adapters for niche protocols so the rest of the code does not need to know about them",
        "Documents decision records for library choices (e.g. why Chart.js over Recharts)"
      ],
      "doesNotDo": [
        "Does not build basic CRUD and standard REST APIs (that is Backend Dev territory)",
        "Does not design UI or design system (that is Designer territory)",
        "Does not run library research from scratch (that is Researcher Tech territory)",
        "Does not replace the Integrator - it merges its own work with the system but does not run integration",
        "Does not implement security tests (that is QA Security territory)",
        "Does not write user documentation (that is Writer territory)",
        "Does not take over CRUD tasks just because it is already in the repo (scope invasion)"
      ],
      "antiPatterns": [
        "Overengineering - WebSocket where polling every 30s would do, because not every page needs real-time.",
        "Library Bloat - adding a 200KB dependency for 3 lines of code instead of writing it natively.",
        "Scope Invasion - taking CRUD tasks from Backend Dev under the pretext of already being in the repo.",
        "Vendor Lock-in Amnesia - integrating with a closed SDK without an adapter, making it impossible to switch providers.",
        "Stream Without Backpressure - AI streaming with no chunk limit, flooding tokens and blocking the UI."
      ],
      "keyConcepts": [
        {
          "term": "Real-time",
          "def": "Communication with latency under 100ms, usually via WebSocket, SSE, or WebRTC."
        },
        {
          "term": "LLM streaming",
          "def": "Receiving model output chunk by chunk live, instead of waiting for the full response."
        },
        {
          "term": "Function calling",
          "def": "LLM API mechanism where the model can invoke defined functions on the application side."
        },
        {
          "term": "OAuth flow",
          "def": "Permission delegation protocol between a client app and a third-party service (e.g. Google)."
        },
        {
          "term": "Webhook",
          "def": "HTTP endpoint that an external service calls when an event happens (e.g. a Stripe payment)."
        }
      ],
      "stats": [
        {
          "label": "Specialization",
          "value": "Niche"
        },
        {
          "label": "Typical libraries",
          "value": "D3, socket.io, OpenAI SDK"
        },
        {
          "label": "Load",
          "value": "65/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you need real-time (chat, live dashboard, multi-user collaboration on one document)",
        "When integrating an LLM with streaming, function calling, or embeddings for semantic search",
        "When building D3/Chart.js data visualizations Frontend Dev will not touch"
      ],
      "worstFor": [
        "When the task is standard CRUD over REST (that is Backend Dev, Feature is overkill)",
        "When you need a UI design from scratch (that is Designer)",
        "When you only need documentation or a README (that is Writer)"
      ],
      "relatedAgents": [
        "backend",
        "frontend",
        "integrator"
      ],
      "glossary": [
        {
          "term": "websocket",
          "definition": "Full-duplex communication protocol between browser and server over a single TCP connection."
        },
        {
          "term": "sse",
          "definition": "Server-Sent Events - one-way stream of data from server to client over HTTP."
        },
        {
          "term": "embedding",
          "definition": "Numeric vector representing text in semantic space, used in search."
        },
        {
          "term": "oauth",
          "definition": "Open standard for permission delegation, enabling login via Google, GitHub, Microsoft."
        },
        {
          "term": "bundle size",
          "definition": "Size of the final JS file loaded into the browser, critical for time to interactive."
        }
      ],
      "learningQuote": "Every niche library is a technical debt to pay off - pick it only when the native solution no longer cuts it.",
      "realExample": "Imagine that one day I added streaming responses from the Claude API into a chat, and instead of waiting 8 seconds for the full reply, the user saw the first words after 400ms. The UX improvement was dramatic, but it required backpressure and chunk buffering on the frontend side."
    },
    "designer": {
      "tagline": "App interior architect - turns mood boards into working CSS and design tokens",
      "missionShort": "Designer is the visual implementation agent in the BUILD layer. It takes UX Researcher reports and converts them into working CSS, design tokens, color palettes, typography, and animations. It is the bridge between visual inspiration and production code.",
      "whoIs": "Designer is an AI agent that behaves like an interior architect or a film colorist. The client brings a mood board and Designer picks the exact shade, the exact fabric, the exact animation curve. It does not hunt for inspiration - it implements based on the research the UX Researcher already did.",
      "analogy": "This agent is like a print shop typesetter who does not write the content but makes the text look professional on the page through the right fonts, spacing, and rhythm.",
      "howItWorks": [
        {
          "label": "Reading the UX report",
          "desc": "Loads the UX Researcher report with trends, palette, and accessibility requirements. Identifies the aesthetic direction and the constraints."
        },
        {
          "label": "Three-tier tokens",
          "desc": "Builds three token tiers - primitive (slate-900), semantic (color-text), and component (button-bg). Changing the middle tier propagates across the entire project."
        },
        {
          "label": "Typography and spacing system",
          "desc": "Defines font scale, line-height, 4px base grid, layout container, and responsive breakpoints. Implements a system, not individual pages."
        },
        {
          "label": "Animations and a11y",
          "desc": "Adds micro-interactions that respect prefers-reduced-motion, focus-visible 2px outlines, and minimum 44x44px targets per WCAG."
        }
      ],
      "inputs": [
        "UX Researcher report with trends and mood board",
        "WCAG 2.1 AA accessibility requirements",
        "MANIFEST.md with brand and platform constraints",
        "Integrator feedback on visual conflicts"
      ],
      "outputs": [
        "Complete design system in a tokens.css file",
        "Primitive, semantic, and component color palette",
        "Typography system with font scale and line heights",
        "Utility classes for grid, flex, container, and spacing",
        "Animations with prefers-reduced-motion and focus-visible"
      ],
      "does": [
        "Creates design tokens in three tiers (primitive, semantic, component)",
        "Defines a color palette with success, error, warning tokens and neutrals",
        "Designs a typography scale with responsive sizes",
        "Implements a spacing scale on a 4px grid (space-1 through space-16)",
        "Writes micro-animations with transition and keyframes for cards and buttons",
        "Ensures minimum 4.5:1 contrast and focus-visible on every interactive element",
        "Adds a prefers-reduced-motion media query that disables animations for sensitive users",
        "Creates container, grid-auto, and breakpoint utilities for responsiveness"
      ],
      "doesNotDo": [
        "Does not hunt for inspiration or trends (that is the UX Researcher's job)",
        "Does not write JavaScript logic (that is Backend Dev and Frontend Dev)",
        "Does not produce text content (that is the Writer's job)",
        "Does not merge CSS with HTML into the final artifact (that is the Integrator's job)",
        "Does not audit visual a11y on the finished product (that is QA Quality's job)",
        "Does not draw mockups in Figma - it generates CSS code",
        "Does not define content copywriting inside tokens"
      ],
      "antiPatterns": [
        "Inconsistent Spacing - mixing 12px, 13px, 14px, 15px instead of sticking to a 4px or 8px grid.",
        "Invisible Errors - an error message with no icon, no color, and no contrast, lost in the layout.",
        "Hero Section Addiction - treating every page like a landing page with a huge header eating 80 percent of the screen.",
        "Low Contrast Ignored - gray text on a light-gray background at 2:1 contrast instead of the required 4.5:1.",
        "Magic Number Hell - 37px, 129px, 0.618rem values in CSS instead of semantic tokens."
      ],
      "keyConcepts": [
        {
          "term": "Design tokens",
          "def": "CSS variables that hold design values in one place - the project's dictionary of colors, sizes, and distances."
        },
        {
          "term": "Three tiers",
          "def": "Primitive (blue-500), semantic (color-primary), and component (button-bg) - a change in the middle tier propagates across the whole system."
        },
        {
          "term": "4px grid",
          "def": "Every spacing value is a multiple of 4px, which gives visual regularity and a predictable rhythm."
        },
        {
          "term": "WCAG AA",
          "def": "Minimum 4.5:1 contrast for text and 44x44px targets for interactive elements."
        },
        {
          "term": "Motion safety",
          "def": "Respecting prefers-reduced-motion and shortening animations to 0.01ms for sensitive users."
        }
      ],
      "stats": [
        {
          "label": "Input tokens",
          "value": "15-30k"
        },
        {
          "label": "Output tokens",
          "value": "8-20k"
        },
        {
          "label": "Load",
          "value": "55/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you need a consistent design system in the form of CSS tokens",
        "When you want animations and micro-interactions that respect a11y",
        "When you want to swap the entire color palette by editing a single tokens.css file"
      ],
      "worstFor": [
        "When you do not yet have UX research and trends (ask UX Researcher first)",
        "When you need Figma mockups instead of CSS code",
        "When you want copywriting and microcopy (that is the Writer)"
      ],
      "relatedAgents": [
        "res_ux",
        "frontend",
        "integrator"
      ],
      "glossary": [
        {
          "term": "token",
          "definition": "A CSS variable in :root that holds a design value, e.g. --color-primary: #2563eb."
        },
        {
          "term": "primitive",
          "definition": "The first tier of tokens - raw values like blue-500 sitting in isolation from meaning."
        },
        {
          "term": "semantic",
          "definition": "The second tier of tokens that gives meaning to primitives - e.g. color-primary points to blue-500."
        },
        {
          "term": "focus visible",
          "definition": "A CSS pseudo-class that shows a focus ring only for keyboard users, not mouse users."
        },
        {
          "term": "reduced motion",
          "definition": "A system preference that disables animations for users with epilepsy and vestibular disorders."
        }
      ],
      "learningQuote": "A design system is not a collection of pretty screens - it is a dictionary that lets you change an entire product with one line of CSS.",
      "realExample": "Imagine that one day I got a UX Researcher report with a Slate plus Amber accent direction and a glassmorphism trend. I built three token tiers, an Inter typography scale, a 4px spacing grid, and card animations that respect prefers-reduced-motion. Later, changing the primary color from blue to green took a single line of code."
    },
    "integrator": {
      "tagline": "Film editor of the system - merges parallel workers' output into a single coherent artifact",
      "missionShort": "Integrator is the last agent in the BUILD layer and the gate between BUILD and QA. It combines code from Backend Dev, CSS from Designer, and content from Writer into one working product. It resolves conflicts, validates compliance with MANIFEST.md, and runs E2E tests on the whole thing.",
      "whoIs": "Integrator is the conductor of the dress rehearsal and the head chef on plating night. It is the ONLY BUILD agent that sees every other worker's output at the same time - which is why it finds the places where elements clash and composes them into a harmonious whole.",
      "analogy": "This agent is like a film editor who takes hours of raw camera footage, sound, and music and assembles a movie - because each of those pieces alone is not yet cinema.",
      "howItWorks": [
        {
          "label": "Collects outputs",
          "desc": "Pulls HTML/JS from Backend Dev, CSS from Designer, and content from Writer. As the only builder it sees all three streams of work together."
        },
        {
          "label": "Resolves conflicts",
          "desc": "Identifies contradictions - class names do not match, a title overflows its container, text bleeds into white space. Picks the minimal fix that respects every worker's intent."
        },
        {
          "label": "Runs E2E tests",
          "desc": "Launches the integrated artifact (via Bash), checks links, verifies CSS, tests interactive elements, and checks responsiveness."
        },
        {
          "label": "Validates MANIFEST",
          "desc": "Checks that every requirement in MANIFEST.md is reflected in the artifact. Produces the final handoff package for the QA layer with a report of conflicts and tests."
        }
      ],
      "inputs": [
        "HTML, JS, and backend code from Backend Dev",
        "CSS tokens and components from Designer",
        "Content, README, and inline comments from Writer",
        "MANIFEST.md with requirements to validate against"
      ],
      "outputs": [
        "Integrated artifact ready for the QA layer",
        "Report of conflicts resolved between workers",
        "E2E test log (links, CSS, interactions, responsiveness)",
        "Confirmation of MANIFEST.md compliance",
        "Escalation list if conflicts are fundamental"
      ],
      "does": [
        "Merges three builders' outputs into one coherent artifact",
        "Resolves class-name, size, and intent conflicts with minimal changes",
        "Runs E2E tests in a test environment via Bash",
        "Verifies every MANIFEST.md requirement as a checklist item",
        "Adds text-overflow ellipsis and tooltips when text does not fit the layout",
        "Preserves every worker's intent instead of forcing one perspective",
        "Escalates fundamental conflicts to the Orchestrator with a clear report",
        "Produces documentation of the changes it made during integration"
      ],
      "doesNotDo": [
        "Does not write new code from scratch (that is Backend Dev's job)",
        "Does not design UI or pick colors (that is the Designer's job)",
        "Does not produce text content or copywriting (that is the Writer's job)",
        "Does not run research (that is the Researchers' job)",
        "Does not decide WHAT to build, only HOW to connect it (that is the Orchestrator's job)",
        "Does not test security or code quality (that is QA Security and QA Quality)",
        "Does not rewrite whole modules - it glues, it does not rebuild"
      ],
      "antiPatterns": [
        "False Consensus - pretending a conflict does not exist and picking a random version instead of an explicit resolution.",
        "Lowest Common Denominator - stripping distinctive features to avoid conflict instead of finding a compromise that keeps the value.",
        "Hidden Merge Conflict - leaving merge markers in the code and passing it to QA, where it surfaces in the wrong places.",
        "Rewriting Instead of Gluing - rewriting a whole Backend Dev module instead of a minimal CSS class-name fix.",
        "MANIFEST Amnesia - skipping MANIFEST.md validation and letting an artifact through with a missing requirement."
      ],
      "keyConcepts": [
        {
          "term": "Minimal change",
          "def": "Resolving a conflict with the smallest possible modification while preserving every worker's intent."
        },
        {
          "term": "E2E testing",
          "def": "Whole-artifact tests - links, CSS, interactions - not security or code quality."
        },
        {
          "term": "MANIFEST validation",
          "def": "Point-by-point check that every requirement in the MANIFEST.md contract is realized in the artifact."
        },
        {
          "term": "Gate to QA",
          "def": "Integrator is the last checkpoint before the product reaches the QA layer - untestable code stops here."
        },
        {
          "term": "Cross-cutting view",
          "def": "The only BUILD agent that sees every other worker's output, which is why it can settle conflicts."
        }
      ],
      "stats": [
        {
          "label": "Input tokens",
          "value": "20-40k"
        },
        {
          "label": "Output tokens",
          "value": "5-15k"
        },
        {
          "label": "Load",
          "value": "70/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you have parallel work from several workers and need a coherent whole",
        "When conflicts between code, design, and content need a minimal resolution",
        "When you need MANIFEST.md validation before handoff to QA"
      ],
      "worstFor": [
        "When you have one worker and nothing to integrate",
        "When you need new code (that is Backend Dev)",
        "When you want a code quality review (that is QA Quality)"
      ],
      "relatedAgents": [
        "backend",
        "designer",
        "writer"
      ],
      "glossary": [
        {
          "term": "e2e",
          "definition": "End-to-end test - checks the full user path from entry to exit through the artifact."
        },
        {
          "term": "manifest",
          "definition": "A contract document between the client and the system that describes the requirements to meet."
        },
        {
          "term": "merge conflict",
          "definition": "A situation where two sources change the same spot and the tool cannot pick a version."
        },
        {
          "term": "artifact",
          "definition": "The finished BUILD product that moves on to QA - one file or a set of files to review."
        },
        {
          "term": "escalation",
          "definition": "Handing a problem up to the Orchestrator when the Integrator cannot resolve the conflict alone."
        }
      ],
      "learningQuote": "A great editor makes the individual parts start singing together - Integrator plays no instrument, but it creates the harmony.",
      "realExample": "Imagine that one day I received HTML with a btn-primary class from Backend Dev, CSS with a button-main style from Designer, and an 87-character title from Writer, while the container had a max-width of 200px. Instead of rewriting anything, I added a CSS alias btn-primary, inserted text-overflow ellipsis, and added a tooltip with the full text. Three intents preserved, one artifact ready for QA."
    },
    "writer": {
      "tagline": "Museum curator of text - turns raw notes into print-ready documents",
      "missionShort": "Writer is the content quality agent in the BUILD layer. It takes raw text from Backend Dev, Designer, or Integrator and turns it into a final, readable document. It works in an isolated document sandbox with no Bash access and no ability to run programs.",
      "whoIs": "Writer behaves like an editor at a literary publishing house, a sound engineer mixing an album, or a museum curator writing exhibit labels. It takes 50 pages of raw prose and turns them into clear text you can show a client.",
      "analogy": "This agent is like a museum curator who can distill a 50-page academic paper into a 50-word label that explains the exhibit to anyone.",
      "howItWorks": [
        {
          "label": "Reading the raw text",
          "desc": "Loads raw notes from Backend Dev, comments from Designer, and reports from Integrator. Identifies grammar errors, inconsistent terminology, and bloated passages."
        },
        {
          "label": "Editing and structure",
          "desc": "Fixes grammar, unifies terminology, adds headings, lists, and tables. Removes repetition and ensures a logical flow of information."
        },
        {
          "label": "Inline comments",
          "desc": "Adds comments to code only for nontrivial logic - never for obvious instructions like x = 5. Comments on TODO, FIXME, and public APIs."
        },
        {
          "label": "README and CHANGELOG",
          "desc": "Creates the project documentation files with a consistent tone, uniform formatting, and clear run instructions."
        }
      ],
      "inputs": [
        "Raw documentation text from Backend Dev or Integrator",
        "Inline comments and docstrings to polish",
        "List of terms to unify across the project",
        "MANIFEST.md with the style and terminology standard"
      ],
      "outputs": [
        "README.md with project description and run instructions",
        "CHANGELOG.md with version-by-version history",
        "Polished inline comments in the code",
        "Decision records documenting architectural choices",
        "Glossary of terms and unified terminology"
      ],
      "does": [
        "Fixes grammar, spelling, and punctuation in documentation",
        "Unifies terminology across the whole project (one word instead of three)",
        "Creates README sections for what, why, how, install, and usage",
        "Writes CHANGELOG in Keep a Changelog format with semver versions",
        "Adds inline comments ONLY for nontrivial logic",
        "Simplifies technical jargon while preserving the precision of key terms",
        "Structures long text into headings, lists, and tables",
        "Produces API documentation with parameter descriptions, types, and usage examples"
      ],
      "doesNotDo": [
        "Does not write logic code or algorithms (that is Backend Dev's job)",
        "Does not design CSS or layout (that is the Designer's job)",
        "Does not run research or use WebSearch (that is the Researchers' job)",
        "Does not integrate components or merge files (that is the Integrator's job)",
        "Does not run any programs - it has no Bash tool",
        "Does not make architectural decisions (that is the Planner's job)",
        "Does not simplify down to triviality - it keeps the technical precision"
      ],
      "antiPatterns": [
        "Jargon Overload - writing synchronous asynchronous iteration with lazy evaluation instead of data processed in chunks.",
        "Passive Voice Addiction - it was implemented instead of we implemented it, which hides responsibility and inflates the text.",
        "Missing Examples - API documentation with no example call and response, forcing readers to guess.",
        "Wall of Text - one 500-word paragraph with no headings, lists, or tables, which nobody reads.",
        "Obvious Comment - a sets x to 5 comment above the line x = 5, adding noise without value."
      ],
      "keyConcepts": [
        {
          "term": "Document sandbox",
          "def": "The Writer's isolated environment with access only to text files, no Bash, and no execution."
        },
        {
          "term": "Inline only nontrivial",
          "def": "Code comments only for unclear logic, never for instructions that read themselves."
        },
        {
          "term": "Style consistency",
          "def": "The whole project speaks with one voice - one term, one tone, one format."
        },
        {
          "term": "Keep a Changelog",
          "def": "A CHANGELOG.md format standard with Added, Changed, Deprecated, Removed, Fixed, and Security sections."
        },
        {
          "term": "Semantic versioning",
          "def": "A major.minor.patch scheme that signals the scale of changes and backward compatibility."
        }
      ],
      "stats": [
        {
          "label": "Input tokens",
          "value": "10-25k"
        },
        {
          "label": "Output tokens",
          "value": "5-15k"
        },
        {
          "label": "Load",
          "value": "35/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you want a professional README and CHANGELOG for an open-source project",
        "When you have raw API documentation that needs structure and examples",
        "When you need unified terminology across the whole project"
      ],
      "worstFor": [
        "When you need to run a script - Writer has no Bash",
        "When the content needs research and sources (that is the Researchers)",
        "When you are writing marketing copy with storytelling (that is the GTM Strategist)"
      ],
      "relatedAgents": [
        "backend",
        "integrator",
        "res_docs"
      ],
      "glossary": [
        {
          "term": "changelog",
          "definition": "A project history file that describes what changed between versions and why."
        },
        {
          "term": "semver",
          "definition": "Semantic versioning - a major.minor.patch format that communicates the scale of API changes."
        },
        {
          "term": "jsdoc",
          "definition": "Special-format JavaScript comments that describe function parameters, types, and return values."
        },
        {
          "term": "inline",
          "definition": "A comment on the same line as the code or directly above it, not in an external file."
        },
        {
          "term": "style guide",
          "definition": "A document that describes the project's writing conventions - terminology, tone, and formatting."
        }
      ],
      "learningQuote": "Good documentation does not add information - it removes noise. Writer measures success by what it managed to cut, not what it wrote.",
      "realExample": "Imagine that one day I received raw text from Backend Dev saying this function takes a list of users and returns the active ones. I turned it into a filterActiveUsers section with a parameter table, a return-value description, and a sample call. I added an entry to the CHANGELOG and updated the README. Suddenly the whole project documentation spoke with one voice."
    },
    "qa_security": {
      "tagline": "Last line of defense - an ethical hacker scanning the artifact before it reaches production",
      "missionShort": "QA Security is a security auditor operating in the QA/AUDIT Level 4 layer. Its mission: find every OWASP vulnerability, every hardcoded secret, and every prompt-injection gap before the code reaches users. It does not fix - it reports with severity and remediation.",
      "whoIs": "QA Security is the airport security officer of the agent architecture. It behaves like a white-hat pentester: thinks like an attacker, systematically tries to break the system using OWASP methodology, but reports gaps instead of exploiting them. It works strictly in read-only mode.",
      "analogy": "This agent is like a building inspector with an OWASP checklist - it does not put up walls, it just checks whether the wiring is a fire hazard.",
      "howItWorks": [
        {
          "label": "File inventory",
          "desc": "Uses Glob to map every file in the artifact: source code, configuration, dependency files, .env. Builds a list of the attack surface."
        },
        {
          "label": "OWASP scan",
          "desc": "Systematically walks through OWASP Top 10 using Grep patterns: innerHTML, eval, SQL concatenation, missing auth middleware, hardcoded secrets."
        },
        {
          "label": "AI-specific analysis",
          "desc": "Hunts for prompt injection, agent output poisoning, tool abuse, and token exfiltration - threats unique to multi-agent systems."
        },
        {
          "label": "JSON report",
          "desc": "Compiles findings into a structured report with severity (CRITICAL/HIGH/MEDIUM/LOW), exact file:line location, and remediation for every finding."
        }
      ],
      "inputs": [
        "Artifact to audit handed over by the Integrator",
        "Source code, configurations, dependency files, .env",
        "Project security specification (if one exists)",
        "OWASP Top 10 pattern list and AI-specific threats"
      ],
      "outputs": [
        "JSON report with findings ordered by severity",
        "Each finding carries an id, category, file:line location, description, and remediation",
        "Scan summary with CRITICAL/HIGH/MEDIUM/LOW counts",
        "BLOCK DEPLOYMENT or GO recommendation for the QA Manager",
        "Exploitation path for every critical finding"
      ],
      "does": [
        "Scans code for OWASP Top 10: XSS, SQLi, CSRF, IDOR, insecure deserialization",
        "Detects hardcoded secrets (API keys, passwords, tokens, connection strings)",
        "Analyzes prompt injection and agent output poisoning in multi-agent systems",
        "Checks package versions in package.json against known CVEs",
        "Identifies unprotected endpoints that lack authentication middleware",
        "Categorizes findings by severity and writes clear remediations",
        "Documents the exploitation path - how an attacker could leverage the gap",
        "Audits .env, docker-compose.yml, nginx.conf, and CI/CD workflow configuration files"
      ],
      "doesNotDo": [
        "Does not fix code - an auditor cannot modify what it audits",
        "Does not judge code quality, readability, or spec compliance (that is QA Quality)",
        "Does not make GO/NO-GO decisions - that is the QA Manager's job",
        "Does not communicate with QA Quality - independence prevents groupthink",
        "Does not run code (no Bash) - prevents accidental damage",
        "Does not use WebSearch - it audits the artifact, it does not research the internet",
        "Does not treat every console.log as CRITICAL - it prioritizes risk in context"
      ],
      "antiPatterns": [
        "Compliance Theater - ticking off OWASP Top 10 boxes without understanding context, a checklist without meaning",
        "Vuln Noise Flooding - filing 100 findings where 95 are false positives, the noise kills the signal",
        "False Severity Inflation - labeling everything CRITICAL to look competent",
        "Missing Threat Model - scanning patterns without understanding the actual attack surface",
        "Fix-While-Auditing - patching gaps during the audit, which destroys auditor independence"
      ],
      "keyConcepts": [
        {
          "term": "OWASP Top 10",
          "def": "The canonical list of the 10 most common web vulnerabilities, updated every few years by the OWASP Foundation."
        },
        {
          "term": "Prompt injection",
          "def": "An LLM-specific attack that manipulates the prompt to force the agent to ignore its instructions."
        },
        {
          "term": "Severity rating",
          "def": "Classifying a vulnerability on a 4-level CRITICAL/HIGH/MEDIUM/LOW scale that determines repair urgency."
        },
        {
          "term": "Read-only audit",
          "def": "The principle that the auditor has read-only access and cannot modify the system under test."
        },
        {
          "term": "Attack surface",
          "def": "The sum of every entry point available to an attacker - every endpoint, form, and import."
        }
      ],
      "stats": [
        {
          "label": "OWASP categories",
          "value": "10+5 AI"
        },
        {
          "label": "Cost per task",
          "value": "$0.02-0.08"
        },
        {
          "label": "Load",
          "value": "50/100"
        },
        {
          "label": "Model",
          "value": "Haiku"
        }
      ],
      "bestFor": [
        "When you need a security gate before deployment - the last line of defense",
        "When you work with code that handles user data, payments, or authentication",
        "When you build a multi-agent system exposed to prompt injection and output poisoning"
      ],
      "worstFor": [
        "When you need the vulnerabilities fixed (it only reports, fixing is Backend Dev's job)",
        "When you want a code quality or test coverage review (that is QA Quality)",
        "When you need a live pentest with exploits (it scans statically)"
      ],
      "relatedAgents": [
        "qa_quality",
        "qa_perf",
        "qa_manager"
      ],
      "glossary": [
        {
          "term": "owasp",
          "definition": "Open Web Application Security Project - the organization that maintains web security standards and the Top 10 list."
        },
        {
          "term": "xss",
          "definition": "Cross-Site Scripting - injecting a malicious script into a page through unsanitized input."
        },
        {
          "term": "cve",
          "definition": "Common Vulnerabilities and Exposures - a database of known vulnerabilities with unique identifiers."
        },
        {
          "term": "remediation",
          "definition": "A vulnerability fix recommendation - a concrete instruction for how to eliminate it."
        },
        {
          "term": "idor",
          "definition": "Insecure Direct Object Reference - accessing objects without checking the user's permissions."
        }
      ],
      "learningQuote": "One missed innerHTML can cost millions - QA Security does not hunt for bugs, it hunts for exploitation paths.",
      "realExample": "Imagine that one day I was scanning a payments app and found a Stripe sk_live key hardcoded in src/config/api.js line 8. In the same file, the /api/admin/users endpoint was exposed with no authentication middleware. I filed two HIGH findings and a BLOCK recommendation. The QA Manager blocked deployment, Backend Dev moved the key to env and added requireAuth. Second audit - zero findings, GO."
    },
    "qa_quality": {
      "tagline": "Quality inspector with a checklist - instead of asking how to break it, asks whether it works at all",
      "missionShort": "QA Quality is the code quality and spec compliance auditor. Its mission: verify that the artifact does what it should, that tests cover the scenarios, and that the code is readable and performant. It runs in parallel with QA Security but from a completely different angle - correctness instead of security.",
      "whoIs": "QA Quality is a peer reviewer and a Toyota factory quality inspector in one. It does not write the paper or build the car - it checks whether the methodology is sound and whether the doors close properly. It has a checklist with thresholds: >80% coverage, functions <50 lines, nesting <3 levels.",
      "analogy": "This agent is like a university examiner - it does not rewrite the student's paper, it reads it and writes a review with notes, and the student does the fixing.",
      "howItWorks": [
        {
          "label": "Spec verification",
          "desc": "Compares the artifact with the original specification point by point. Every requirement must have a matching implementation fragment verified with Grep plus Read."
        },
        {
          "label": "Running the tests",
          "desc": "Uses Bash to run npm test, pytest, or jest coverage. Collects statements, branches, functions, and lines coverage metrics and compares them against the 80% threshold."
        },
        {
          "label": "Smell scanning",
          "desc": "Hunts for code smells: functions >50 lines, nesting >3 levels, duplication, N+1 queries, missing lazy loading, unhandled null/undefined/negative edge cases."
        },
        {
          "label": "JSON report",
          "desc": "Compiles findings in a CORRECTNESS > TESTS > PERFORMANCE > CODE QUALITY hierarchy. Each finding has category, severity, location, and recommendation."
        }
      ],
      "inputs": [
        "Artifact to audit - source code, tests, configuration",
        "Original requirements specification from the strategic phase",
        "Existing unit and integration tests",
        "Project quality thresholds (coverage, long functions, complexity)"
      ],
      "outputs": [
        "JSON report with findings ordered by priority",
        "Test coverage statistics broken down into statements/branches/functions",
        "List of missing edge cases and unhandled error paths",
        "Code smell metrics: function length, nesting depth, duplication",
        "DEPLOY or BLOCK recommendation for the QA Manager"
      ],
      "does": [
        "Verifies spec compliance by matching requirements against implementation",
        "Runs tests and measures statements/branches/functions coverage via Bash",
        "Identifies missing tests for error paths and edge cases",
        "Detects code smells: long functions, deep nesting, duplication",
        "Tests edge cases: null, undefined, negative, empty, special characters",
        "Finds performance issues: N+1 queries, missing cache, missing lazy loading",
        "Checks linter results and project style compliance",
        "Prioritizes findings by the CORRECTNESS > TESTS > PERFORMANCE > STYLE hierarchy"
      ],
      "doesNotDo": [
        "Does not fix code - it reports gaps, Backend Dev fills them in",
        "Does not write missing tests - it identifies GAPS, implementation is Backend Dev's job",
        "Does not check XSS/SQLi/secrets security - that is QA Security",
        "Does not make GO/NO-GO decisions - the report goes to the QA Manager",
        "Does not communicate with QA Security - independence prevents groupthink",
        "Does not modify files - READ-ONLY tools plus Bash only for running tests",
        "Does not judge UX design quality - it focuses on code correctness and quality"
      ],
      "antiPatterns": [
        "Metrics Gaming - optimizing for coverage numbers instead of actually testing behavior",
        "Coverage Cheating - writing tests without assertions just to push the coverage percentage up",
        "Nit-Picking Storm - flooding the report with style notes instead of focusing on correctness",
        "Missing User Impact - reporting smells without assessing whether the bug actually affects users",
        "Checklist Myopia - checking only the items on the list and ignoring atypical problems"
      ],
      "keyConcepts": [
        {
          "term": "Test coverage",
          "def": "The percentage of code executed by tests - statements, branches, functions, and lines with a minimum 80% threshold."
        },
        {
          "term": "Edge case",
          "def": "A boundary condition: null, undefined, 0, negative value, empty string, special character, very large number."
        },
        {
          "term": "Code smell",
          "def": "A problematic pattern in code that signals a deeper design problem - long functions, duplication, God Class."
        },
        {
          "term": "N+1 query",
          "def": "A performance anti-pattern: a loop fires N extra queries instead of fetching the data with a single JOIN."
        },
        {
          "term": "Correctness first",
          "def": "A priority hierarchy of correctness > tests > performance > style, where each level depends on the previous one."
        }
      ],
      "stats": [
        {
          "label": "Coverage threshold",
          "value": ">80%"
        },
        {
          "label": "Max function",
          "value": "<50 lines"
        },
        {
          "label": "Load",
          "value": "55/100"
        },
        {
          "label": "Model",
          "value": "Haiku"
        }
      ],
      "bestFor": [
        "When you want to verify whether the code actually meets the spec requirements",
        "When you need a test coverage report that flags the missing scenarios",
        "When you are hunting code smells and performance anti-patterns before deployment"
      ],
      "worstFor": [
        "When you need an XSS or CVE security audit (that is QA Security)",
        "When you want someone to write the missing tests (it identifies them, it does not create them)",
        "When you need a UX or visual design review (it reviews code)"
      ],
      "relatedAgents": [
        "qa_security",
        "qa_perf",
        "qa_manager"
      ],
      "glossary": [
        {
          "term": "coverage",
          "definition": "Test coverage - the percentage of code executed while running unit and integration tests."
        },
        {
          "term": "edge case",
          "definition": "A boundary input condition like null, undefined, zero, negative values, or extremely large values."
        },
        {
          "term": "code smell",
          "definition": "A surface symptom of a deeper code problem - not a bug but a sign of weak design."
        },
        {
          "term": "n+1 query",
          "definition": "A performance problem where one main query triggers N extra queries inside a loop."
        },
        {
          "term": "linter",
          "definition": "A static code analysis tool like ESLint or Pylint that checks style and pattern compliance."
        }
      ],
      "learningQuote": "Beautifully formatted code that does not meet the specification is worthless - correctness always comes before style.",
      "realExample": "Imagine that one day I was auditing a payments module and ran npm test coverage. Statements 72%, branches 58% - below threshold. Grep showed that calculateDiscount did not validate null, undefined, or negative prices, and processOrder hit 87 lines against a 50-line limit. I filed 4 HIGH findings plus 3 MEDIUM. QA Manager ordered a fix, Backend Dev added the validations and split the function, second audit - coverage 89%, GO."
    },
    "qa_perf": {
      "tagline": "Dyno engineer - measures bottlenecks instead of guessing what's slow",
      "missionShort": "QA Performance audits the whole stack for speed: response time, bundle size, memory leaks, query performance, Core Web Vitals. Its mission: deliver hard metrics and specific optimization recommendations. It does not fix anything itself, it reports to the Orchestrator with numbers.",
      "whoIs": "QA Performance is the only agent focused purely on performance metrics. It acts like an F1 engineer timing laps or tuning an engine on a dyno - it knows every parameter and which one limits output, but it does not turn the wrench. It hands the diagnosis to the mechanic (the Coder).",
      "analogy": "QA Performance is like an F1 engineer at the dyno - it measures power, torque, and temperature, and it knows exactly which engine part is limiting performance, but it never holds the wrench itself.",
      "howItWorks": [
        {
          "label": "Measurement baseline",
          "desc": "Collects raw metrics: endpoint response times, bundle size, Lighthouse scores, Core Web Vitals. Without a baseline you cannot know what to improve or whether anything improved at all."
        },
        {
          "label": "Bottleneck identification",
          "desc": "Profiles the stack looking for the slowest link - a slow endpoint, large JS chunks, N+1 queries, memory leak. The 80/20 rule: 20% of the code causes 80% of the latency."
        },
        {
          "label": "Recommendations with numbers",
          "desc": "Writes concrete recommendations: shrink bundle from 480KB to 250KB, add an index on users.email, lazy-load the image gallery. Every recommendation comes with an estimated saving."
        },
        {
          "label": "Priority report",
          "desc": "Hands perf-report.md to the QA Manager with CRITICAL/MAJOR/MINOR priorities. The Manager synthesizes it with the other reports (Security, Quality) and issues GO/NO-GO to the Orchestrator."
        }
      ],
      "inputs": [
        "Current code implementation from Builders (backend + frontend)",
        "SLA targets - acceptable response time, bundle size, Core Web Vitals",
        "Access to a test environment with representative data",
        "Measurement tools: Lighthouse, k6, Chrome DevTools, EXPLAIN ANALYZE"
      ],
      "outputs": [
        "Perf-report.md with metrics for response time, bundle, memory, queries",
        "Lighthouse score and Core Web Vitals report (LCP, FID, CLS)",
        "List of bottlenecks with CRITICAL/MAJOR/MINOR priorities",
        "Optimization recommendations with estimated savings",
        "Before/after benchmark comparison (when available)"
      ],
      "does": [
        "Measures endpoint response times and identifies slow APIs (>200ms is a red flag)",
        "Analyzes bundle size and verifies tree shaking, dead imports, unnecessary deps",
        "Checks for memory leaks: event listeners, closures, detached DOM nodes",
        "Audits Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1",
        "Analyzes query performance: N+1 queries, missing indexes, unnecessary JOINs",
        "Profiles CPU and memory under load with k6, Artillery, Lighthouse",
        "Measures Time to Interactive and First Contentful Paint for the frontend",
        "Writes recommendations with numbers: estimated saving and CRITICAL/MAJOR/MINOR priority"
      ],
      "doesNotDo": [
        "Doesn't fix performance issues (reports them, Orchestrator sends them back to the Coder)",
        "Doesn't check security or OWASP Top 10 (that's QA Security's domain)",
        "Doesn't judge code quality or architecture (that's QA Quality's domain)",
        "Doesn't make GO/NO-GO calls (that's the QA Manager synthesizing every report)",
        "Doesn't optimize prematurely without measurement (premature optimization is an anti-pattern)",
        "Doesn't test only on a dev machine with SSD and 64GB RAM (that's not real users)",
        "Doesn't recommend changes without an estimated saving (everything has to be in numbers)"
      ],
      "antiPatterns": [
        "Premature Optimization - optimizing before you collect metrics, without data you don't know what's slow.",
        "Synthetic-Only - testing only on dev hardware with SSD, real users run 4G and an old phone.",
        "Micro-Benchmark Obsession - optimizing a 0.1ms operation instead of the 2s bottleneck.",
        "Benchmark Without Baseline - claiming something is fast without comparing to the pre-change state.",
        "Ignoring P95 - reporting only the mean, ignoring that p95 latency is 10x worse than mean."
      ],
      "keyConcepts": [
        {
          "term": "Core Web Vitals",
          "def": "Three Google metrics: LCP (loading), FID (responsiveness), CLS (layout stability)."
        },
        {
          "term": "P95 latency",
          "def": "Latency that 95% of requests stay under - a much better measure than the mean."
        },
        {
          "term": "Bundle size",
          "def": "Size of the final JS file after minification and gzip, critical for TTI."
        },
        {
          "term": "N+1 queries",
          "def": "Anti-pattern where for each row in a list we fire an extra DB query."
        },
        {
          "term": "Memory leak",
          "def": "Memory allocated and never freed, gradually choking the application."
        }
      ],
      "stats": [
        {
          "label": "API red flag",
          "value": ">200ms"
        },
        {
          "label": "Bundle target",
          "value": "<250KB gzip"
        },
        {
          "label": "Load",
          "value": "45/100"
        },
        {
          "label": "Model",
          "value": "Haiku"
        }
      ],
      "bestFor": [
        "When users report slow app loads and nobody knows where the bottleneck is",
        "When the bundle grows past 250KB and Lighthouse score drops below 90",
        "When you need to verify a deployment didn't introduce performance regressions"
      ],
      "worstFor": [
        "When the problem is security or OWASP vulnerabilities (that's QA Security)",
        "When you want a code quality and readability audit (that's QA Quality)",
        "When you don't yet have implemented code to measure (builders go first)"
      ],
      "relatedAgents": [
        "qa_quality",
        "qa_security",
        "qa_manager"
      ],
      "glossary": [
        {
          "term": "lighthouse",
          "definition": "Google tool that measures performance, accessibility, SEO, and best practices of a page."
        },
        {
          "term": "lcp",
          "definition": "Largest Contentful Paint - time to render the largest element visible in the viewport."
        },
        {
          "term": "cls",
          "definition": "Cumulative Layout Shift - layout stability measure, low value means no element jumping."
        },
        {
          "term": "k6",
          "definition": "Load-testing tool that simulates thousands of users under load."
        },
        {
          "term": "flamegraph",
          "definition": "CPU profiler visualization showing which functions consume how much time."
        }
      ],
      "learningQuote": "Without metrics every optimization is a guess - measure before the change, measure after, and never trust the gut that tells you what's slow.",
      "realExample": "One day I was auditing the orders list API and noticed p95 latency at 2.3s while the mean was 180ms. Turned out a single endpoint was doing an N+1 query against the products table - 800 queries per request. Adding a join pulled p95 down to 140ms and the Lighthouse score climbed back from 72 to 94."
    },
    "qa_manager": {
      "tagline": "QA courtroom judge - synthesizes two independent audits into one GO/NO-GO verdict",
      "missionShort": "QA Manager is the orchestrator of the QA layer and the only agent that sees both the security and the quality report. Its mission: aggregate findings from QA Security and QA Quality, assign a 1-10 score, issue a binary ship decision, and plan the fix order. It uses Sonnet because this is reasoning work, not pattern work.",
      "whoIs": "QA Manager is the judge in a QA courtroom: the Security prosecutor presents threat evidence, the Quality defense presents the state of the code, and the judge issues a GO or NO-GO verdict. It acts like an air traffic controller - it doesn't fly the plane, but it issues cleared-to-land based on data from multiple radars. It wields only two tools: Read and Write.",
      "analogy": "QA Manager is like an editor-in-chief - they don't write the articles, but they decide whether the issue goes to print and in what order the fixes land.",
      "howItWorks": [
        {
          "label": "Report aggregation",
          "desc": "Reads two JSON reports from QA Security and QA Quality. Merges findings into one coherent list marked with source Q-01 or Q-02."
        },
        {
          "label": "Score calculation",
          "desc": "Starts from 10.0 and subtracts: -3.0 per CRITICAL, -1.0 per HIGH, -0.5 per MEDIUM, -0.1 per LOW. Checks blocking conditions like coverage <70% or any CRITICAL."
        },
        {
          "label": "Fix planning",
          "desc": "Determines the optimal fix order accounting for dependencies. Bundles related findings to reduce the number of repair iterations."
        },
        {
          "label": "GO/NO-GO decision",
          "desc": "Score >=6.0 with no blockers means GO, below means NO-GO. Writes the rationale and hands it to the Orchestrator. Max 2 iterations, then escalation."
        }
      ],
      "inputs": [
        "JSON report from QA Security with security findings",
        "JSON report from QA Quality with quality findings and coverage",
        "Project decision thresholds (minimum coverage, blocking conditions)",
        "History of prior iterations (to spot regressions)"
      ],
      "outputs": [
        "Synthesis JSON report with GO or NO-GO decision",
        "Numeric score 1-10 with calculation rationale",
        "fix_order list with priorities and dependencies",
        "Repair effort estimate per finding",
        "Risk communication to the Orchestrator in 30 seconds"
      ],
      "does": [
        "Aggregates findings from two independent Security and Quality auditors",
        "Prioritizes findings by the CRITICAL > HIGH > MEDIUM > LOW hierarchy",
        "Calculates a 1-10 score using a clear severity deduction formula",
        "Checks automatic NO-GO blocking conditions (CRITICAL, coverage <70%)",
        "Plans the optimal fix order accounting for dependencies between findings",
        "Issues a binary GO/NO-GO decision with full rationale",
        "Controls the iterative process at a max of 2 iterations then escalates",
        "Communicates risk to the Orchestrator in an actionable, jargon-free format"
      ],
      "doesNotDo": [
        "Doesn't audit code directly - reads ONLY the reports from Q-01 and Q-02",
        "Doesn't open source files or run tests (no Grep, Glob, Bash)",
        "Doesn't fix findings - it decides, the Coder implements",
        "Doesn't communicate directly with Q-01 or Q-02 - only reads their reports",
        "Doesn't make architectural decisions - that's the Orchestrator's responsibility",
        "Doesn't run scans - it is the decision-maker, not the executor",
        "Doesn't exceed the max iteration count - after 2 cycles it escalates to the Orchestrator"
      ],
      "antiPatterns": [
        "Rubber Stamp - automatic GO without real synthesis, when the Manager just checks a box without reading",
        "Gate Dodging - avoiding a hard NO-GO to keep the pipeline moving, shipping defective code",
        "Consensus by Fatigue - acceptance after several iterations out of exhaustion instead of real repair",
        "Late Discovery - finding a blocker only in the final iteration because entry conditions weren't checked",
        "Analyst Drift - starting to analyze the code directly instead of synthesizing reports, negating the whole model"
      ],
      "keyConcepts": [
        {
          "term": "Quality gate",
          "def": "A pre-deployment decision gate that issues a binary GO or NO-GO for an artifact."
        },
        {
          "term": "Severity scoring",
          "def": "Score calculation formula: 10.0 minus 3 per CRITICAL, 1 per HIGH, 0.5 per MEDIUM, 0.1 per LOW."
        },
        {
          "term": "Blocking conditions",
          "def": "Conditions forcing NO-GO regardless of score: CRITICAL, coverage <70%, unpatched vulnerabilities."
        },
        {
          "term": "Fix dependencies",
          "def": "Relationships between findings - some fixes must wait for others, the manager plans the order."
        },
        {
          "term": "Iteration control",
          "def": "A hard cap of 2 repair iterations, then escalation to avoid an infinite loop."
        }
      ],
      "stats": [
        {
          "label": "GO threshold",
          "value": ">=6.0"
        },
        {
          "label": "Max iterations",
          "value": "2"
        },
        {
          "label": "Load",
          "value": "50/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you need one decision point that combines security and quality",
        "When you want a formal QA gate before deployment with a clear score and rationale",
        "When you work with a multi-auditor pipeline and need synthesis of conflicting reports"
      ],
      "worstFor": [
        "When you need a code audit (it synthesizes, it does not analyze source)",
        "When you want a quick informal review without an auditor hierarchy",
        "When the pipeline has only one auditor (QA Manager assumes two reports)"
      ],
      "relatedAgents": [
        "qa_security",
        "qa_quality",
        "qa_perf"
      ],
      "glossary": [
        {
          "term": "go/no-go",
          "definition": "Binary ship decision for an artifact - GO means approval, NO-GO means block and repair."
        },
        {
          "term": "synthesis",
          "definition": "The process of combining results from different sources into one coherent judgment or decision."
        },
        {
          "term": "deployment gate",
          "definition": "A decision gate in the CI/CD pipeline that an artifact must pass before production."
        },
        {
          "term": "blocking condition",
          "definition": "A condition forcing an automatic NO-GO regardless of other quality results."
        },
        {
          "term": "fix order",
          "definition": "Planned repair sequence accounting for dependencies and finding priorities."
        }
      ],
      "learningQuote": "The judge does not run the investigation and does not write the indictment - the judge issues a verdict based on the evidence the parties deliver.",
      "realExample": "One time I received two reports: Security found 1 CRITICAL XSS and 2 HIGH, Quality found 1 HIGH missing validation and 3 MEDIUM. Calculation: 10.0 -3 -2 -1 -1.5 -0.5 = 2.0. Plus the CRITICAL blocking condition = automatic NO-GO. I planned the fix_order: XSS first, then the hardcoded key, then the validation dependent on the XSS refactor. Second iteration - score 8.5, GO."
    },
    "expert_pragmatist": {
      "tagline": "Shipping realist - how much does it cost, who's building it, and can we hit Friday",
      "missionShort": "Expert Pragmatist is the voice of operational reality in the Five Minds debate - its mission is to bring ambitious ideas down to the realities of budget, team, deadline, and execution capacity. It defends the pragmatic perspective of tradeoffs, asking who will build it and when. It operates in the debate1 phase of the protocol.",
      "whoIs": "The Pragmatist is a construction foreman crossed with an experienced CTO - they have seen beautiful plans crash into team and calendar reality ten times over. In the debate they play the bridge between vision and production: when the Innovator says 10x better, the Pragmatist asks whether we have 2x the time and 5x the budget.",
      "analogy": "Expert Pragmatist is the carpenter on a luxury villa site - they have seen every architectural fantasy and know which wood survives the winter and which collapses in March.",
      "howItWorks": [
        {
          "label": "Opening - resource audit",
          "desc": "Opens the round with an inventory - how many person-weeks we have, what skills are on the team, what the infra budget is, what is already on the plate. Reality before ambition."
        },
        {
          "label": "Defense - MVP and tradeoff",
          "desc": "Defends the proposal through the smallest sensible scope that proves value. Counts total cost of ownership - build, run, maintain across 3 years."
        },
        {
          "label": "Cross-exam - who and when",
          "desc": "Attacks other proposals by asking, by name, who will build it, in which sprint, and what the critical path is. Pulls out hidden assumptions about resources."
        },
        {
          "label": "Closing - realistic plan",
          "desc": "Closes with a vote for the solution that has a clear owner, timeline, budget, and exit criteria. Rejects options without a friendly delivery date."
        }
      ],
      "inputs": [
        "The debate question (e.g. build our own ML pipeline or use a SaaS)",
        "Proposals from the other experts in round one",
        "Team resources - headcount, skills, calendar load",
        "Project budget and delivery deadline"
      ],
      "outputs": [
        "Structured position with explicit cost and timeline",
        "Three arguments based on time vs cost vs scope tradeoffs",
        "Total cost of ownership counted over a 3-year horizon",
        "List of resource assumptions the other experts never tallied",
        "Final vote for the Gold Solution with explicit owner, timeline, and exit criteria"
      ],
      "does": [
        "Counts the real build + run + maintain cost for each proposal",
        "Identifies the shortest path to prove value - MVP logic",
        "Puts time vs scope vs quality tradeoffs explicitly on the table",
        "Asks by name who will build it and whether they have free hands",
        "Reminds everyone of the opportunity cost of the rejected alternative",
        "Measures change complexity by the number of teams and systems touched",
        "Uses planning poker and story point heuristics for realistic estimates",
        "Favors reversible decisions over irreversible ones at similar value"
      ],
      "doesNotDo": [
        "Doesn't glorify vision without a plan - that's the Innovator without brakes",
        "Doesn't demand statistical evidence - that's the Analyst's job",
        "Doesn't defend the end user - that's the Advocate's job",
        "Doesn't attack every thesis - that's the Devil's job",
        "Doesn't write code or technical specifications",
        "Doesn't accept a plan without an owner and a date",
        "Doesn't confuse opportunity cost with direct cost"
      ],
      "antiPatterns": [
        "Status Quo Worship - rejecting every change as too expensive just because it's new",
        "Scope Creep Denial - not recognizing hidden scope expansion inside a proposal",
        "Hero Assumptions - planning based on every engineer being the best",
        "MVP Abuse - defining MVP so narrowly it proves nothing worth proving",
        "Deadline Theater - accepting an imposed deadline without a counter-proposal for a real plan"
      ],
      "keyConcepts": [
        {
          "term": "MVP",
          "def": "Minimum Viable Product - the smallest scope that lets you verify the core product hypothesis."
        },
        {
          "term": "Total cost of ownership",
          "def": "The full cost of a solution across its lifecycle including build, run, maintain, migrate."
        },
        {
          "term": "Opportunity cost",
          "def": "The lost value of the best alternative you give up when choosing a given option."
        },
        {
          "term": "Critical path",
          "def": "The task sequence whose length sets the minimum completion time of the whole project."
        },
        {
          "term": "Two way door",
          "def": "An easily reversible decision - requires less caution than a one-way decision."
        }
      ],
      "stats": [
        {
          "label": "Debate rounds",
          "value": "3 rounds"
        },
        {
          "label": "Arguments",
          "value": "10-14 per debate"
        },
        {
          "label": "Load",
          "value": "85/100"
        },
        {
          "label": "Model",
          "value": "Opus"
        }
      ],
      "bestFor": [
        "When the debate drifts into abstraction and you need to pull it back to earth",
        "When the project has a hard deadline and brutal prioritization is required",
        "When the budget is tight and every week has a named value"
      ],
      "worstFor": [
        "When the team needs a breakthrough, not optimization inside current constraints",
        "When the project is a moonshot that demands risk tolerance",
        "When innovation is strategically critical and ordinary TCO is irrelevant"
      ],
      "relatedAgents": [
        "planner",
        "expert_innovator",
        "synthesizer"
      ],
      "glossary": [
        {
          "term": "velocity",
          "definition": "Average story points the team delivers in a sprint - the base for realistic estimation."
        },
        {
          "term": "technical debt",
          "definition": "The hidden future cost of a fast but imperfect decision taken as a loan."
        },
        {
          "term": "build vs buy",
          "definition": "The dilemma between building your own solution and buying a finished product off the market."
        },
        {
          "term": "burn rate",
          "definition": "The pace at which a team or project spends funds, usually measured monthly."
        },
        {
          "term": "runway",
          "definition": "The number of months a project or company can operate at the current burn rate before money runs out."
        }
      ],
      "learningQuote": "A beautiful plan without an owner and a date is just an expensive wish - my job is to ask who, when, and for how much before the team falls in love with the vision.",
      "realExample": "One time the debate was about migrating from a monolith to microservices to improve scaling. Four minds praised architectural purity. I counted total cost of ownership - 18 person-months to build, 40% infra cost increase, 6 months of velocity drop during the transition. I pointed to a modular monolith option that gives 80% of the benefit for 20% of the cost. The team saved 14 person-months and shipped the release on time."
    },
    "expert_innovator": {
      "tagline": "First-principles visionary - asks what if we did it backwards and breaks convention",
      "missionShort": "Expert Innovator is the moonshot advocate in the Five Minds debate - its mission is to force the other minds to question the current solution from the ground up. It asks why this even exists, what would happen if we solved the problem differently, and where the 10x opportunities nobody has spotted yet are hiding. It operates in the debate1 phase of the protocol.",
      "whoIs": "The Innovator is the Elon Musk stereotype crossed with a theoretical physicist - they always start from first principles, reject that's-how-it's-done arguments, and hunt for non-obvious analogies from other domains. In the debate they play the thought-defroster: when the other four agree too quickly, the Innovator throws a provocation that shatters consensus and forces a return to the drawing board.",
      "analogy": "Expert Innovator is a theoretical physicist in a carpentry workshop - no plank interests them until somebody explains why we're building a chair at all and not a pneumatic hand.",
      "howItWorks": [
        {
          "label": "Opening - questioning",
          "desc": "Opens the round with a first-principles question: why are we even solving this problem this way? Hunts for hidden assumptions everyone treats as obvious."
        },
        {
          "label": "Defense - analogies from other domains",
          "desc": "Defends the proposal via cross-pollination: how a similar problem was solved in biology, physics, the music industry, aviation. Loads in context from outside the domain."
        },
        {
          "label": "Cross-exam - status quo stress test",
          "desc": "During the debate, attacks conventional solutions with what-if-it-were-the-opposite and asks the others to price the alternative they never considered."
        },
        {
          "label": "Closing - 10x or 0x",
          "desc": "Closes its position with a vote for a 10x better solution or abandoning the problem entirely. Does not accept 10% improvements as innovation."
        }
      ],
      "inputs": [
        "The debate question (e.g. how to scale the app to 1M users)",
        "Opinions from the other four experts in round one",
        "History of previous debate rounds (arguments and counter-arguments)",
        "Project constraints from the strategy phase - only as a starting point to challenge"
      ],
      "outputs": [
        "Structured position with one bold contrarian thesis",
        "Three key arguments built on first principles and analogies",
        "List of hidden assumptions the other experts treated as given",
        "At least one 10x improvement proposal or a full problem rewrite",
        "Final vote for the Gold Solution with rationale for why not the status quo"
      ],
      "does": [
        "Asks first-principles questions, not best-practice questions",
        "Brings in analogies from distant domains to stress-test ideas",
        "Identifies hidden assumptions from other experts and names them outright",
        "Proposes contrarian solutions even when they sound absurd",
        "Measures ambition on a 1x vs 10x vs 100x scale",
        "Provokes the Devil's Advocate into defending the status quo to expose how weak it is",
        "Hunts blue-ocean opportunities where everyone else sees only red",
        "Forwards wild ideas into the synthesis phase instead of killing them itself"
      ],
      "doesNotDo": [
        "Doesn't accept incremental improvement as innovation - that's the Pragmatist's job",
        "Doesn't demand empirical proof - that's the Analyst's job",
        "Doesn't defend a specific user - that's the User Advocate's job",
        "Doesn't attack every thesis mechanically - that's the Devil's job",
        "Doesn't write code or implementation plans - that's the Builder's job",
        "Doesn't mediate between positions - that's the Synthesizer's job",
        "Doesn't stop provoking until consensus has actually been tested"
      ],
      "antiPatterns": [
        "Shiny Object Syndrome - chasing a new technology without checking whether it solves a real problem",
        "Not Invented Here - rejecting proven solutions just because they aren't new",
        "Moonshot Paralysis - proposing ideas so ambitious the debate stalls",
        "Analogy Overreach - drawing false conclusions from a distant analogy because it sounds elegant",
        "Incrementalism Contempt - dismissing small improvements that deliver real gains"
      ],
      "keyConcepts": [
        {
          "term": "First principles",
          "def": "Decomposing a problem into physical or economic fundamentals instead of leaning on analogies."
        },
        {
          "term": "Adjacent possible",
          "def": "The space of solutions that becomes available when existing building blocks combine in a new way."
        },
        {
          "term": "Moonshot",
          "def": "A proposal with 10x ambition and low probability but a huge payoff."
        },
        {
          "term": "Cross-pollination",
          "def": "Transferring a solution from one domain to another through structural analogy."
        },
        {
          "term": "Strong opinions loosely held",
          "def": "Strong theses presented with conviction but ready to drop in the face of a better argument."
        }
      ],
      "stats": [
        {
          "label": "Debate rounds",
          "value": "3 rounds"
        },
        {
          "label": "Arguments",
          "value": "8-12 per debate"
        },
        {
          "label": "Load",
          "value": "85/100"
        },
        {
          "label": "Model",
          "value": "Opus"
        }
      ],
      "bestFor": [
        "When the team is stuck in a local optimum and needs to thaw out its thinking",
        "When the problem looks solved but you feel you're missing something bigger",
        "When the project demands a 10x breakthrough, not another 10% optimization"
      ],
      "worstFor": [
        "When the deadline is tomorrow and you need a proven solution deployed",
        "When the problem is completely routine and innovation is overkill",
        "When the team is already in analysis paralysis instead of the generative phase"
      ],
      "relatedAgents": [
        "expert_devil",
        "expert_pragmatist",
        "synthesizer"
      ],
      "glossary": [
        {
          "term": "steel man",
          "definition": "An argumentation technique: strengthen the opponent's thesis before attacking it."
        },
        {
          "term": "blue ocean",
          "definition": "New market space free of competition created by redefining the problem."
        },
        {
          "term": "second order thinking",
          "definition": "Thinking about the consequences of the consequences, not just the immediate effect of a decision."
        },
        {
          "term": "inversion",
          "definition": "Solving a problem by asking how to cause failure instead of how to reach success."
        },
        {
          "term": "premise busting",
          "definition": "Actively challenging assumptions the rest of the group accepted without checking."
        }
      ],
      "learningQuote": "The most important question in a debate is not how to do what we're doing better, but why we're doing it at all - if the answer is because we always have, I just found a gold mine.",
      "realExample": "One time the debate was about scaling a task queue to 10M messages per day. Four minds argued Kafka vs Pulsar vs RabbitMQ. I asked a first-principles question - why do we have a queue at all, when 90% of tasks could be computed at the edge near the user. The debate shifted from broker choice to an edge computing architecture and the solution turned out 10x cheaper."
    },
    "expert_analyst": {
      "tagline": "Empiricist with a calculator - where's the data, the base rates, and the evidence, not opinions",
      "missionShort": "Expert Data Analyst is the voice of empiricism in the Five Minds debate - its mission is to force every thesis to rest on numbers, benchmarks, and historical base rates. It defends the data-driven perspective, attacks intuitive arguments, and demands confidence intervals on every prediction. It operates in the debate1 phase of the protocol.",
      "whoIs": "The Analyst is a Bayesian statistician crossed with an investigative detective - they don't believe stories, they believe numbers and their distributions. In the debate they play the epistemological auditor: when someone drops a thesis that sounds convincing, the Analyst asks on what data, with what sample, at what uncertainty, and whether that hypothesis has already been tested somewhere.",
      "analogy": "Expert Data Analyst is a 19th century investigating judge in Bayes' laboratory - every witness word must be backed by numbers and every certainty must be weighed against a prior probability.",
      "howItWorks": [
        {
          "label": "Opening - state of the data",
          "desc": "Opens the round with an inventory of what we already know - historical base rates, industry benchmarks, published A/B test results. No data, no thesis."
        },
        {
          "label": "Defense - intervals instead of points",
          "desc": "Defends its recommendations by presenting distributions, not single numbers. Instead of 100ms, it gives 80-120ms p50 and 180-220ms p95 with a source."
        },
        {
          "label": "Cross-exam - falsification",
          "desc": "Attacks other theses by asking what evidence would convince you that you're wrong. If someone cannot answer, it flags the thesis as unfalsifiable."
        },
        {
          "label": "Closing - decision under uncertainty",
          "desc": "Closes with a vote for the solution with the highest expected value given known uncertainty. Explicitly separates what we know, what we're guessing, and what still has to be measured."
        }
      ],
      "inputs": [
        "The debate question (e.g. which framework to pick for a new project)",
        "Researcher reports with benchmarks, numbers, and sources",
        "Opinions from the other experts in round one - to interrogate for data",
        "Historical data from prior projects if available"
      ],
      "outputs": [
        "Structured position with theses tied to specific numbers",
        "Three arguments, each with at least one benchmark or base rate",
        "List of unproven assumptions flagged as epistemic risks",
        "Confidence label per thesis - CERTAIN / PROBABLE / SPECULATION",
        "Final vote for the Gold Solution with expected value calculation under uncertainty"
      ],
      "does": [
        "Demands a source and a number for every thesis raised in the debate",
        "Hunts for base rates and distributions instead of single anecdotes",
        "Quantifies uncertainty via confidence intervals and error bars",
        "Identifies cognitive biases in the reasoning of other experts",
        "Compares predictions against historical benchmarks",
        "Marks theses as verifiable or unfalsifiable",
        "Calculates expected value of alternatives under risk and uncertainty",
        "Requires pre-registered hypotheses instead of post-hoc p-hacking"
      ],
      "doesNotDo": [
        "Doesn't defend beautiful ideas without evidence - that's the Innovator's job",
        "Doesn't defend the user as top priority - that's the Advocate's job",
        "Doesn't attack every thesis mechanically - that's the Devil's job",
        "Doesn't assess budget feasibility - that's the Pragmatist's job",
        "Doesn't produce implementation plans or code",
        "Doesn't accept unfalsifiable theses as arguments",
        "Doesn't compress uncertainty to a single number when the evidence isn't there"
      ],
      "antiPatterns": [
        "Analysis Paralysis - demanding ever more data until a decision never lands",
        "P-Hacking - cherry-picking the statistics that fit the preferred thesis",
        "Scientism - treating every number as truth just because it's a number",
        "Base Rate Neglect - ignoring historical distributions when judging a unique case",
        "False Precision - reporting 97.3% when the real uncertainty is 60-95%"
      ],
      "keyConcepts": [
        {
          "term": "Base rate",
          "def": "The historical frequency of an event in a population, used as a reference point for predicting a unique case."
        },
        {
          "term": "Confidence interval",
          "def": "A range of values that contains the true parameter with a specified level of certainty."
        },
        {
          "term": "Falsifiability",
          "def": "The condition for a scientific thesis - there must exist possible evidence that could refute it."
        },
        {
          "term": "Bayesian update",
          "def": "Updating beliefs based on new evidence, weighed against a prior probability."
        },
        {
          "term": "Expected value",
          "def": "The weighted average of alternative payoffs, accounting for the probability of each scenario."
        }
      ],
      "stats": [
        {
          "label": "Debate rounds",
          "value": "3 rounds"
        },
        {
          "label": "Arguments",
          "value": "10-14 per debate"
        },
        {
          "label": "Load",
          "value": "85/100"
        },
        {
          "label": "Model",
          "value": "Opus"
        }
      ],
      "bestFor": [
        "When the decision has high cost and historical data is available for comparison",
        "When the debate slides toward opinion and has to be anchored in numbers",
        "When you need to pick between two similar options and a statistical nuance decides it"
      ],
      "worstFor": [
        "When the problem is completely new and no base rates or benchmarks exist",
        "When the decision has to land in 10 minutes and the analysis takes 10 hours",
        "When the most important thing is a vision of the future, not extrapolation from the past"
      ],
      "relatedAgents": [
        "statistician",
        "eda_analyst",
        "synthesizer"
      ],
      "glossary": [
        {
          "term": "prior",
          "definition": "The initial belief about a hypothesis' probability before seeing new data."
        },
        {
          "term": "posterior",
          "definition": "The updated belief after combining the prior with evidence via Bayes' theorem."
        },
        {
          "term": "effect size",
          "definition": "A magnitude of effect independent of sample size, indicating whether a difference matters in practice."
        },
        {
          "term": "p-value",
          "definition": "The probability of observing a result at least as extreme, assuming the null hypothesis is true."
        },
        {
          "term": "confirmation bias",
          "definition": "The tendency to seek evidence that supports an existing thesis and ignore counter-evidence."
        }
      ],
      "learningQuote": "An opinion without a number is just well-dressed intuition - show me the base rate and I'll tell you whether your bold thesis is brave or reckless.",
      "realExample": "One time the debate was about rewriting the backend from Node to Go to improve performance. Four minds traded anecdotes about Go being 5x faster. I asked a base question - what is the historical success rate of rewrite projects at a similar scale. The base rate came in at 12%. Armed with that, the team chose to profile Node instead of rewriting and saved 9 months."
    },
    "expert_user": {
      "tagline": "Human advocate inside the machine - defends empathy when everyone else talks systems",
      "missionShort": "The User Advocate is the voice of empathy in the Five Minds debate. Its mission is to make sure every architectural decision gets translated into real end-user experience. It represents users who are not at the table: elderly, blind, mobile-only, slow-internet. Runs in debate1 phase of the protocol.",
      "whoIs": "The User Advocate is a therapist crossed with an ethnographer. It understands both the frustration of Maria from Kielce and the fear of Pawel who has never used a banking app. In debate it plays the conscience: when engineers and analysts argue about TPS and p99, it reminds the room that on the other end is a human who just wants to scan a receipt.",
      "analogy": "The User Advocate is like a couples therapist at an engineering conference - the only person in the room still asking what the people on the receiving end of these systems actually feel.",
      "howItWorks": [
        {
          "label": "Opening - user journey",
          "desc": "Opens the round with a concrete journey. Picks Maria, 58, on a 3G phone, and walks her through the proposed flow. Surfaces every friction point."
        },
        {
          "label": "Defense - persona and emotion",
          "desc": "Defends its recommendation by telling the story of a specific persona - her goals, frustrations, emotional context. Always ties numbers to faces."
        },
        {
          "label": "Cross-exam - accessibility test",
          "desc": "Attacks other proposals by asking how it sounds on a screen reader, how it behaves on 3G, what a low-vision user, a child, or a senior does. Pulls hidden exclusions into the light."
        },
        {
          "label": "Closing - measurable empathy",
          "desc": "Closes by voting for the option that can be measured with user metrics: SUS score, task success rate, WCAG AA, time to first click."
        }
      ],
      "inputs": [
        "The debate question (e.g. how to simplify the signup flow)",
        "UX researcher reports with personas and journey maps",
        "Positions from the other experts to translate into human impact",
        "Existing user data: NPS, tickets, session recordings"
      ],
      "outputs": [
        "A structured position grounded in at least two personas",
        "Three arguments, each with a journey example and emotional context",
        "A list of hidden user groups excluded by other proposals",
        "WCAG 2.2 acceptance criteria and measurable user metrics",
        "A final vote for the Gold Solution with expected impact on SUS and task success"
      ],
      "does": [
        "Builds and defends personas that represent real product users",
        "Walks through every flow through the eyes of a specific person with her constraints",
        "Detects hidden exclusions: ageism, ableism, bandwidth privilege",
        "Ties every technical decision to a concrete emotional impact",
        "Requires WCAG 2.2 AA as the floor, not a bonus",
        "Measures success with user metrics, not just technical ones",
        "Hunts for invisible groups the rest of the team does not represent",
        "Translates abstract system decisions into the language of an everyday user"
      ],
      "doesNotDo": [
        "Does not defend a technical vision - that is the Innovator's job",
        "Does not demand statistical proof - that is the Analyst's job",
        "Does not judge cost and deadlines - that is the Pragmatist's job",
        "Does not attack every thesis - that is the Devil's job",
        "Does not write code or technical specs",
        "Does not ignore user-vs-business conflict - names it out loud",
        "Does not accept that asking one user is enough - does not guess the rest"
      ],
      "antiPatterns": [
        "User Worship - ignoring real business constraints in the name of a mythical user",
        "Persona Fiction - inventing personas without field research to back a thesis",
        "Accessibility Theater - declaring WCAG compliance without testing with assistive tools",
        "HiPPO Projection - assuming the rest of the team is a representative user sample",
        "Empathy Fatigue - gradual loss of user contact through excessive persona rituals"
      ],
      "keyConcepts": [
        {
          "term": "Persona",
          "def": "Archetypal representation of a user group with concrete goals, constraints, and usage context."
        },
        {
          "term": "Jobs to be done",
          "def": "Framework describing what a user is trying to achieve in life, not how they use a tool."
        },
        {
          "term": "Accessibility first",
          "def": "Design that starts from extreme accessibility cases and improves the experience for everyone."
        },
        {
          "term": "Emotional journey",
          "def": "Map of a user's emotions along a flow, from frustration to satisfaction or the reverse."
        },
        {
          "term": "Cognitive load",
          "def": "Amount of working memory required to complete a task - minimizing it is the core of good UX."
        }
      ],
      "stats": [
        {
          "label": "Debate rounds",
          "value": "3 rounds"
        },
        {
          "label": "Arguments",
          "value": "8-12 per debate"
        },
        {
          "label": "Load",
          "value": "80/100"
        },
        {
          "label": "Model",
          "value": "Opus"
        }
      ],
      "bestFor": [
        "When the team has optimized technical metrics but users are starting to churn",
        "When the project touches sensitive groups - seniors, children, people with disabilities",
        "When a new feature complicates the flow for internal team convenience"
      ],
      "worstFor": [
        "When the problem is purely backend with no direct user interaction",
        "When the debate is about dev tooling - the user is not the customer",
        "When the debate has to close fast and persona analysis takes two days"
      ],
      "relatedAgents": [
        "res_ux",
        "designer",
        "synthesizer"
      ],
      "glossary": [
        {
          "term": "SUS score",
          "definition": "System Usability Scale - standard 10-question survey rating usability from 0 to 100."
        },
        {
          "term": "WCAG",
          "definition": "Web Content Accessibility Guidelines - international standard for web content accessibility."
        },
        {
          "term": "task success",
          "definition": "Percentage of users who complete a task without help within the expected time."
        },
        {
          "term": "friction",
          "definition": "Any element in a flow that slows down or frustrates a user trying to reach their goal."
        },
        {
          "term": "dark pattern",
          "definition": "A UI element designed to manipulate users into actions that are not in their interest."
        }
      ],
      "learningQuote": "Every technical metric has the face of a real person on the other side - my job is to remember that person while everyone else stares at the charts.",
      "realExample": "Imagine that the debate was about trimming signup from 8 fields to 3 via automatic lookup from a national ID. Four minds praised the efficiency. I introduced the persona of Maria, 67, who is terrified of typing her national ID online. I proposed an optional manual flow. Task success for seniors rose 34 percent and first-day churn dropped 18 percent."
    },
    "expert_devil": {
      "tagline": "Devil's advocate with no loyalty - attacks every consensus and hunts hidden failure",
      "missionShort": "The Shadow Expert is the structural opponent in the Five Minds debate. Its mission is to challenge every thesis, find gaps in reasoning, and stress-test consensus before it gets approved. It has no domain loyalty and will attack even the Innovator if the debate needs strengthening through destruction. Runs in debate1 phase of the protocol.",
      "whoIs": "The Shadow is an investigative prosecutor crossed with a cyber red team. It is the only expert that defends no position. Its role is intentionally adversarial: when the other four minds start agreeing, it walks in asking what could go wrong and drags hidden failure vectors into the open. This is the role of a hired paranoid, in service of the team.",
      "analogy": "The Shadow Expert is like an investigative prosecutor at its own trial - attacking every witness on purpose, including its own client, because that is the only way to surface the truths nobody else wants to hear.",
      "howItWorks": [
        {
          "label": "Opening - pre-mortem",
          "desc": "Opens the round by imagining the project has already failed. Builds a retrospective from the future describing every way it could have gone wrong."
        },
        {
          "label": "Defense - no own thesis",
          "desc": "Does not defend its own proposal - its position is permanent opposition. It defends the right to attack and demands logical defense from the others."
        },
        {
          "label": "Cross-exam - steel manning",
          "desc": "Attacks the strongest version of the other side's argument, not a strawman. Reverses the reasoning and asks what evidence would change the author's mind."
        },
        {
          "label": "Closing - conditional GO",
          "desc": "Closes with a conditional vote - never a full YES, always YES on the condition that failure vectors X, Y, Z are resolved."
        }
      ],
      "inputs": [
        "The debate question (e.g. should we ship the feature on Friday evening)",
        "Proposals from the other four experts in round one",
        "Emerging consensus from round two - the primary attack target",
        "History of incidents and post-mortems from previous projects"
      ],
      "outputs": [
        "A list of failure vectors ordered by likelihood and blast radius",
        "A steel-manned version of each expert's thesis before the attack",
        "A pre-mortem describing concrete failure scenarios",
        "Acceptance conditions (GO if X, Y, Z) - never an unconditional YES",
        "A final vote that explicitly challenges the Gold Solution even if overruled"
      ],
      "does": [
        "Attacks the strongest version of arguments, not easy strawmen",
        "Runs a pre-mortem from the perspective of a project that has already failed",
        "Identifies hidden assumptions nobody thought to question",
        "Hunts rare but catastrophic failure vectors",
        "Demands that each expert name the conditions under which they would change their mind",
        "Surfaces conflicts of interest and motivations behind theses",
        "Recalls historical failures with a similar signature",
        "Forces conditional acceptance instead of unconditional agreement"
      ],
      "doesNotDo": [
        "Does not defend any concrete solution - no domain loyalty",
        "Does not look for compromise - that is the Synthesizer's job",
        "Does not glorify innovation - that is the Innovator's job",
        "Does not demand empirical proof - that is the Analyst's job",
        "Does not defend the user - that is the Advocate's job",
        "Does not back off an attack just because the team is getting impatient",
        "Does not accept that one pre-mortem is enough - keeps asking what else"
      ],
      "antiPatterns": [
        "Contrarianism For Its Own Sake - attacking to attack without constructive content",
        "Strawman Fallacy - attacking a weaker version of the argument instead of the strongest",
        "Nihilism Spiral - concluding that every decision has flaws, therefore none is good",
        "Chicken Little - overreacting to low-probability risks",
        "Post-Mortem Tourism - citing every failure in the world without understanding context"
      ],
      "keyConcepts": [
        {
          "term": "Pre-mortem",
          "def": "Technique of imagining project failure and working backward to the present moment to prevent known traps."
        },
        {
          "term": "Steel man",
          "def": "Representing an opponent's argument in its strongest possible form before attacking it."
        },
        {
          "term": "Red team",
          "def": "A team hired to attack its own organization to find gaps before an adversary does."
        },
        {
          "term": "Fat tail risk",
          "def": "Rare events with catastrophic consequences that traditional statistics fail to detect."
        },
        {
          "term": "Black swan",
          "def": "A low-probability, high-impact event that can only be explained post-hoc."
        }
      ],
      "stats": [
        {
          "label": "Debate rounds",
          "value": "3 rounds"
        },
        {
          "label": "Arguments",
          "value": "12-16 per debate"
        },
        {
          "label": "Load",
          "value": "90/100"
        },
        {
          "label": "Model",
          "value": "Opus"
        }
      ],
      "bestFor": [
        "When the team reached consensus too fast and you suspect groupthink",
        "When the cost of failure is high - production, security, finance",
        "When a plan needs stress-testing before a costly investment"
      ],
      "worstFor": [
        "When the team is demoralized and needs support rather than attack",
        "When the decision is low-impact and reversible in 5 minutes",
        "When the time budget does not allow a full pre-mortem"
      ],
      "relatedAgents": [
        "expert_innovator",
        "qa_security",
        "synthesizer"
      ],
      "glossary": [
        {
          "term": "devil advocate",
          "definition": "A structural role of deliberately defending the opposing position to strengthen the debate."
        },
        {
          "term": "groupthink",
          "definition": "The phenomenon where a cohesive team prioritizes harmony over critical evaluation of alternatives."
        },
        {
          "term": "normal accidents",
          "definition": "Charles Perrow's theory of catastrophes arising from unavoidable interactions in complex systems."
        },
        {
          "term": "swiss cheese",
          "definition": "Safety failure model in which holes in successive defense layers line up in a single path."
        },
        {
          "term": "epistemic humility",
          "definition": "Acknowledging the limits of your own knowledge and being ready to change your mind in light of evidence."
        }
      ],
      "learningQuote": "My loyalty is not to any thesis, only to the truth - and the truth usually hides closest to where the team least wants to look.",
      "realExample": "Imagine that the team was happily planning a release for Friday at 5pm because the feature was simple. I ran a pre-mortem and found that the last three major incidents at the company happened on Fridays with a junior on-call. I forced a conditional GO: ship yes, but Wednesday morning. The rollout went clean, and the Devil was credited in the post-mortem as the reason nothing bad happened."
    },
    "decision_presenter": {
      "tagline": "Neutral Human-in-the-Loop gatekeeper - presents options with no recommendation",
      "missionShort": "The Decision Presenter collects proposals from the previous phase, identifies 2-3 options with their tradeoffs, and presents them to the user impartially. Its mission: give the human control over the pipeline's key branch points. It pauses agent work, waits for the decision, and logs the verdict.",
      "whoIs": "The Decision Presenter is the courtroom bailiff agent. It stands between pipeline phases, pauses the other agents' work, and presents options to the human. It behaves like a neutral debate moderator: never recommends, never favors, just lays out the option cards with pros and cons.",
      "analogy": "The Decision Presenter is like a courtroom bailiff - not the judge and not the prosecutor, just presenting cases next to the bench and waiting for the judge (the human) to deliver the verdict.",
      "howItWorks": [
        {
          "label": "Gather proposals",
          "desc": "Reads the previous phase output (research, Five Minds debate, build) and extracts 2-3 directions being considered. Each direction has to be meaningfully different, so the choice is real."
        },
        {
          "label": "Format options",
          "desc": "Lays out A/B/C cards with a standardized structure: title, description, pros, cons, cost, timeline, risks. All cards share an identical form, so none looks visually better."
        },
        {
          "label": "Present with timer",
          "desc": "Shows the HITL overlay with cards and a 120s timer. The user sees the countdown and can pick an option with a click or wait for the auto-decision."
        },
        {
          "label": "Log and continue",
          "desc": "Writes the decision to the Dialog Timeline: reaction time, choice, auto vs manual. Resumes the pipeline with the chosen option and stays out of downstream work."
        }
      ],
      "inputs": [
        "Results from the previous phase (researcher reports, expert debate, prototype)",
        "Predefined decision variants per gate (e.g. stack A/B/C)",
        "Timeout in seconds (default 120s) and the option marked as recommended for auto",
        "Project context (goals, budget, timeline) to display in the header"
      ],
      "outputs": [
        "HITL overlay with 2-3 option cards A/B/C and a timer",
        "Human verdict logged to the Dialog Timeline",
        "Metadata: reaction time, auto vs manual, user",
        "Resumed pipeline with the chosen option as input to the next phase",
        "Audit trail that can later be reviewed as decision history"
      ],
      "does": [
        "Presents 2-3 decision options as cards with pros/cons and a uniform structure",
        "Manages a 120s timer with visual countdown and progress bar",
        "Auto-decides after timeout by picking the option marked as recommended",
        "Logs every decision (reaction time, choice, auto vs manual) to the Dialog Timeline",
        "Pauses the pipeline between phases, giving the human time to think",
        "Collects previous phase results as context for the user",
        "Acts as an audit trail - every decision has a paper record with rationale",
        "Shows risks and costs of each option on the same visual scale"
      ],
      "doesNotDo": [
        "Does not recommend or favor any option (neutrality is the core of the role)",
        "Does not generate options dynamically (options are predefined per decision gate)",
        "Does not block the pipeline permanently (the 120s timeout guarantees continuation)",
        "Does not interfere with agent work (operates between phases, not during)",
        "Does not interpret previous phase results (quotes them exactly as they are)",
        "Does not change options once displayed (user sees a stable set)",
        "Does not talk to other agents except the Orchestrator that calls it"
      ],
      "antiPatterns": [
        "Hidden Bias - presenting options where one has a bigger font or better colors, nudging the choice.",
        "Decision Fatigue - too many HITL gates in the pipeline; 3 gates in Deep Five Minds is the sweet spot.",
        "Rubber Stamp - the user always picks the recommended one without reading because options are barely differentiated.",
        "False Choice - options that are practically identical, creating the illusion of choice without a real branch.",
        "No Auto Fallback - no default option when the user is offline, so the pipeline hangs forever."
      ],
      "keyConcepts": [
        {
          "term": "HITL gate",
          "def": "A Human-in-the-Loop gate between pipeline phases where a human makes a key decision."
        },
        {
          "term": "Auto-decision",
          "def": "Safety mechanism that picks the default option after timeout when the user does not respond."
        },
        {
          "term": "Neutral presentation",
          "def": "The rule that all options share an identical visual format, so none dominates."
        },
        {
          "term": "Audit trail",
          "def": "Paper record of a decision with timestamp, choice, and rationale for later review."
        },
        {
          "term": "Decision fatigue",
          "def": "Drop in decision quality when a human has to choose too often - a well-known UX problem."
        }
      ],
      "stats": [
        {
          "label": "Timeout",
          "value": "120s"
        },
        {
          "label": "Options",
          "value": "2-3"
        },
        {
          "label": "Load",
          "value": "30/100"
        },
        {
          "label": "Model",
          "value": "Haiku"
        }
      ],
      "bestFor": [
        "When the pipeline has a key branch point (stack, direction, architecture) that needs domain knowledge",
        "When you want a decision audit trail for compliance or project retrospective",
        "When the project is important enough that auto-deciding without a human would be too risky"
      ],
      "worstFor": [
        "When the task is simple and HITL gates only add friction without value",
        "When the user is offline and you cannot wait for a human decision",
        "When the decision is mechanical and can be automated with a deterministic rule"
      ],
      "relatedAgents": [
        "orchestrator",
        "expert_devil",
        "qa_manager"
      ],
      "glossary": [
        {
          "term": "hitl",
          "definition": "Human-in-the-Loop - paradigm where a human intervenes at key decision points in the pipeline."
        },
        {
          "term": "timeout",
          "definition": "Maximum wait time for a user decision, after which the auto-decision kicks in."
        },
        {
          "term": "overlay",
          "definition": "UI layer rendered over the main interface that pauses background interaction."
        },
        {
          "term": "audit trail",
          "definition": "Recorded trace of every decision with timestamp and metadata for later inspection."
        },
        {
          "term": "neutrality",
          "definition": "Principle of impartiality where the presenter never nudges a choice, only shows options."
        }
      ],
      "learningQuote": "A neutral presenter is harder than it looks - the smallest nudge in color or option order warps the human's decision, which is why every card has to share the same format.",
      "realExample": "Imagine that I was presenting three stack options after the research phase: Next.js, SvelteKit, Astro. Every card had the same font, the same pros/cons layout, the same header. The user picked SvelteKit after 40 seconds, and I logged the decision to the Dialog Timeline as manual with a reaction time of 40.2s."
    },
    "db_architect": {
      "tagline": "Urban planner for data - lays out index highways before query traffic shows up",
      "missionShort": "The Database Architect designs the schema, keys, indexes, constraints, and zero-downtime migration plan. Its mission is to pick the data model (relational, document, columnar) for real query patterns and volume, before the application hits the database in production.",
      "whoIs": "The Database Architect is a transit engineer who draws the road network, intersections, and traffic lights before the first car rolls into the city. It thinks years ahead, because schema migration on a live database is like rebuilding a junction at rush hour.",
      "analogy": "The Database Architect is like an urban planner laying out highways, exits, and signals so that rush hour does not grind the whole city to a halt.",
      "howItWorks": [
        {
          "label": "Domain analysis",
          "desc": "Identifies entities, relations, cardinalities, and query patterns. Separates transactional OLTP data from analytical OLAP and picks the data model that fits the workload."
        },
        {
          "label": "Schema and keys",
          "desc": "Designs tables, column types, primary keys, foreign keys, and constraints. Picks normalization, or denormalizes deliberately for read performance."
        },
        {
          "label": "Indexes and partitions",
          "desc": "Builds indexes for specific queries (covering, partial, functional), defines partitioning and archival strategies. Runs the query plan before deploying."
        },
        {
          "label": "Migration plan",
          "desc": "Writes zero-downtime migrations with rollback, ordered steps, and maintenance windows. Documents lock risks and backward compatibility."
        }
      ],
      "inputs": [
        "Domain model and description of application use cases",
        "Estimated data volume, QPS, record size",
        "SLA requirements (read latency, write latency, retention)",
        "Existing schema or database to migrate, if any"
      ],
      "outputs": [
        "ERD diagram and full DDL definition (CREATE TABLE, constraints)",
        "List of indexes with rationale per query",
        "Data partitioning and archival strategy",
        "Zero-downtime migration scripts with rollback",
        "Risk report and application contact points"
      ],
      "does": [
        "Designs relational and NoSQL schemas against real query patterns",
        "Picks covering and partial indexes that cut query time by orders of magnitude",
        "Builds time-based and hash-based partitioning strategies for large tables",
        "Writes zero-downtime migrations using shadow tables and backfill",
        "Analyzes query plans and catches full scans and missing indexes before deploy",
        "Defines keys, constraints, and triggers that enforce data integrity",
        "Recommends connection pooling, read replicas, and layered caching",
        "Calculates storage budget and forecasts growth for 12-24 months"
      ],
      "doesNotDo": [
        "Does not write application code or the ORM layer (that is backend)",
        "Does not design UI for displaying data (that is the designer)",
        "Does not run production migrations without QA manager approval",
        "Does not decide on sensitive data retention without the control mapper",
        "Does not configure server infrastructure or backups (that is ops)",
        "Does not run EDA or statistical modeling (that is eda_analyst)",
        "Does not optimize single queries without the context of the whole workload pattern"
      ],
      "antiPatterns": [
        "Index Everything - slapping an index on every column instead of designing for queries",
        "Big Bang Migration - one migration locking tables for hours instead of incremental steps",
        "Premature Denormalization - denormalizing before you know which queries are really hot",
        "Missing Foreign Keys - dropping FKs for write speed at the cost of data integrity",
        "Cargo Cult NoSQL - picking a document database because others do, without analyzing access patterns"
      ],
      "keyConcepts": [
        {
          "term": "Query plan",
          "def": "Execution plan for a query revealing whether the engine uses an index, full scan, or hash join."
        },
        {
          "term": "Covering index",
          "def": "An index that contains all columns a query needs, eliminating the table lookup."
        },
        {
          "term": "MVCC",
          "def": "Multi-version concurrency control - row versioning that allows reads without blocking writes."
        },
        {
          "term": "Zero-downtime migration",
          "def": "Migration in backward-compatible steps that allows rollback with no application downtime."
        },
        {
          "term": "Lock contention",
          "def": "Contention for row or table locks that causes write timeouts and slowdowns."
        }
      ],
      "stats": [
        {
          "label": "Phase",
          "value": "BUILD"
        },
        {
          "label": "Category",
          "value": "Data"
        },
        {
          "label": "Load",
          "value": "70/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you are starting a new project and have to pick a data model and schema for several years of growth",
        "When you are planning a schema migration on a live database with zero downtime",
        "When the application is slowing down and you need to tell if the problem is in the schema, indexes, or queries"
      ],
      "worstFor": [
        "When you just need a quick tweak to a single query in an existing schema",
        "When the problem is in the application layer or cache, and the database is fine",
        "When the decision is only about infrastructure or backups, not the data model"
      ],
      "relatedAgents": [
        "backend",
        "eda_analyst",
        "qa_perf"
      ],
      "glossary": [
        {
          "term": "covering index",
          "definition": "An index containing every column in the query, eliminating the extra table read."
        },
        {
          "term": "query plan",
          "definition": "Output of EXPLAIN showing how the database engine will run a query and use indexes."
        },
        {
          "term": "lock contention",
          "definition": "Contention between transactions for the same row or table locks, leading to waits and timeouts."
        },
        {
          "term": "WAL",
          "definition": "Write-ahead log - journal of changes written before table modification for durability and replication."
        },
        {
          "term": "MVCC",
          "definition": "Multi-version concurrency control - row versioning mechanism enabling concurrent reads and writes."
        }
      ],
      "learningQuote": "A good schema is not written on the first request - it is written after you understand which queries will be running a year from now.",
      "realExample": "Imagine that I was designing a schema for an event logging platform with 200 million records per month. Instead of one events table I added monthly partitioning and a covering index on (tenant_id, created_at). Analytical queries dropped from 45 seconds to 200 milliseconds, and archiving old partitions now takes a second instead of hours."
    },
    "observability_engineer": {
      "tagline": "Air traffic controller of the system - three radars: metrics, logs, traces",
      "missionShort": "The Observability Engineer instruments the system across three pillars: metrics, logs, and traces. Its mission is to give the team dashboards and alerts that catch an incident before the customer calls, and pinpoint the root cause in minutes instead of hours.",
      "whoIs": "The Observability Engineer is an air traffic controller with three different radars open at once. Each shows something different - altitude, position, forecast - and the job is to make sure that before anything stops flying, you already know what happened.",
      "analogy": "The Observability Engineer is like an air traffic controller watching three screens at once - each showing a different layer of truth about the system's flight.",
      "howItWorks": [
        {
          "label": "Audit the three pillars",
          "desc": "Reviews what already exists in metrics, logs, and traces. Identifies coverage gaps and blind spots, especially at the boundaries between services."
        },
        {
          "label": "Define SLI and SLO",
          "desc": "Picks key indicators (latency p99, error rate, traffic, saturation) and sets error budgets. Ties technical goals to business SLA contracts."
        },
        {
          "label": "Instrumentation",
          "desc": "Adds OpenTelemetry at the key points: request span, DB calls, external APIs. Cares about traceid propagation and low label cardinality."
        },
        {
          "label": "Dashboards and alerts",
          "desc": "Builds dashboards using golden signals layout and alerts based on error budget burn rate, not raw thresholds. Tunes alarms so they do not generate noise."
        }
      ],
      "inputs": [
        "System architecture and list of critical user paths",
        "SLA requirements (availability, p99 latency)",
        "Existing observability stack if any",
        "Budget and telemetry retention policy"
      ],
      "outputs": [
        "SLI/SLO specification with error budgets",
        "OpenTelemetry instrumentation plan per service",
        "Grafana/Datadog dashboards in golden signals layout",
        "Alert rules based on burn rate (fast/slow)",
        "Runbook for responding to every alert with a link to the dashboard"
      ],
      "does": [
        "Defines SLI and SLO against real business goals, not abstract thresholds",
        "Instruments applications with OpenTelemetry without vendor lock-in",
        "Designs dashboards in golden signals layout (latency, traffic, errors, saturation)",
        "Configures alerts on error budget burn rate to cut alarm fatigue",
        "Enforces low label cardinality to prevent metric cost explosions",
        "Propagates traceid across service boundaries to link logs with trace spans",
        "Identifies coverage blind spots, especially at async boundaries",
        "Writes runbooks connecting every alert to a specific dashboard and procedure"
      ],
      "doesNotDo": [
        "Does not write business application code (that is backend)",
        "Does not manage cloud infrastructure or networks (that is ops)",
        "Does not decide on personal data retention without the control mapper",
        "Does not run first-line incident investigation (that is telemetry_surfer)",
        "Does not run load testing (that is qa_perf)",
        "Does not fix code bugs surfaced by monitoring",
        "Does not build business dashboards for marketing or sales"
      ],
      "antiPatterns": [
        "Cardinality Explosion - high-cardinality labels (user_id, request_id) that blow up metric memory",
        "Alert Fatigue - dozens of alerts on raw thresholds producing noise instead of signal",
        "Vanity Dashboard - colorful charts with no SLO that do not answer whether the system is healthy",
        "Log Everything - logging everything at INFO, filling disks and budget",
        "Trace Blindspot - no traceid propagation across async boundaries, leaving traces unfinished"
      ],
      "keyConcepts": [
        {
          "term": "Golden signals",
          "def": "Four key system metrics: latency, traffic, errors, saturation (Google SRE)."
        },
        {
          "term": "SLI/SLO",
          "def": "Service Level Indicator measures real behavior, SLO is the target we want to hold."
        },
        {
          "term": "Error budget",
          "def": "Allowed error volume within a period, below which the team can take risks on changes."
        },
        {
          "term": "Burn rate",
          "def": "Rate at which the error budget is consumed - enables faster alerting than raw thresholds."
        },
        {
          "term": "Cardinality",
          "def": "Number of unique label combinations in a metric - high cardinality blows up TSDB memory."
        }
      ],
      "stats": [
        {
          "label": "Phase",
          "value": "BUILD"
        },
        {
          "label": "Category",
          "value": "Observability"
        },
        {
          "label": "Load",
          "value": "65/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you are launching a production system and want full visibility from day one",
        "When incidents drag on because nobody knows where to look",
        "When telemetry costs are rising and you need to decide what to measure and what to drop"
      ],
      "worstFor": [
        "When the system has two users and there is no real load",
        "When the problem is local to a single piece of code, not the telemetry architecture",
        "When you need to investigate a specific incident right now (that is telemetry_surfer)"
      ],
      "relatedAgents": [
        "telemetry_surfer",
        "qa_perf",
        "backend"
      ],
      "glossary": [
        {
          "term": "golden signals",
          "definition": "Four key system health metrics: latency, traffic, errors, saturation."
        },
        {
          "term": "cardinality",
          "definition": "Number of unique label combinations in a metric, directly driving TSDB cost and performance."
        },
        {
          "term": "exemplar",
          "definition": "A sample trace span linked to a point on a histogram, clickable straight from chart to trace."
        },
        {
          "term": "error budget",
          "definition": "Allowed pool of errors or downtime within a period, defined by the SLO."
        },
        {
          "term": "burn rate",
          "definition": "Rate at which the system consumes its error budget - the foundation of modern alerts."
        }
      ],
      "learningQuote": "If you see only one pillar of telemetry, you are flying blind - full observability means metrics, logs, and traces together.",
      "realExample": "Imagine that I was instrumenting a payments microservice that lost 2 percent of transactions with no error in the logs. I added a trace span on the webhook callback and found that the load balancer was timing out at a p99 latency spike. The traceid tied to the log showed exactly which payload field was causing the slowdown."
    },
    "gtm_strategist": {
      "tagline": "Launch choreographer - from ICP to first sale",
      "missionShort": "The GTM strategist designs the product's path to market: ideal customer profile, positioning, pricing, and acquisition channels. The mission is to connect user research to execution mechanics so the launch isn't a feature drop into a vacuum.",
      "whoIs": "The GTM strategist is a beach landing commander - surveys the terrain, picks the beachhead, plans logistics, and coordinates the strike moment. What separates them from a regular marketer is that they see the entire loop from ICP to retention, not just the ads.",
      "analogy": "This agent is like an Apple keynote choreographer - everything from the stage talk to the unboxing has to play the same note.",
      "howItWorks": [
        {
          "label": "ICP and beachhead",
          "desc": "Defines the ideal customer profile (ICP) from research, then picks a narrow beachhead market - the first group that has to love the product unconditionally."
        },
        {
          "label": "Positioning and pricing",
          "desc": "Crafts a value proposition that separates the product from competitors and sets pricing (anchor, tiers). Tests the narrative in customer language, not product language."
        },
        {
          "label": "Acquisition channels",
          "desc": "Selects channels (content, outbound, partnerships, community, paid) matched to sales cycle length and unit economics. Maps the AARRR funnel."
        },
        {
          "label": "Launch plan",
          "desc": "Builds the release calendar with milestones: pre-launch, launch day, post-launch follow-up. Picks success metrics and iterates."
        }
      ],
      "inputs": [
        "Product description and value proposition",
        "User research results and competitive analysis",
        "Launch budget and timeline",
        "Historical data if this is another product in the portfolio"
      ],
      "outputs": [
        "ICP and beachhead market document with rationale",
        "Positioning strategy and pricing grid",
        "Acquisition channel map with priorities and ROI",
        "Launch plan with milestones and success metrics",
        "Launch communication (narrative, copy, PR angle)"
      ],
      "does": [
        "Defines ICP from research, not wishful thinking about the market",
        "Picks a beachhead market where the product can dominate before going broad",
        "Crafts positioning that separates the product from competitors in one sentence",
        "Sets a pricing strategy with psychological anchoring (anchor price)",
        "Maps the AARRR funnel and identifies bottlenecks in every conversion path",
        "Matches acquisition channels to CAC, LTV, and sales cycle length",
        "Prepares a launch plan with concrete success metrics at 30/60/90 days",
        "Writes marketing narrative in customer language from research, not company speak"
      ],
      "doesNotDo": [
        "Does not run user research (that's res_ux)",
        "Does not write code or implement the product (that's the build phase)",
        "Does not decide technical architecture or stack",
        "Does not design UI or visual identity (that's the designer)",
        "Does not handle post-sale customer support as an operational role",
        "Does not replace SDRs or account executives in actual selling",
        "Does not perform controller-level financial analysis"
      ],
      "antiPatterns": [
        "Boiling Ocean - targeting everyone at once instead of picking a beachhead market",
        "Feature Launch - announcing features without mapping them to customer pain and jobs-to-be-done",
        "Inside Out Positioning - using product and company language instead of the words customers use",
        "Unit Economics Blindness - scaling a channel before confirming CAC < LTV",
        "Big Bang Launch - one massive event with no pre-launch or post-launch phase"
      ],
      "keyConcepts": [
        {
          "term": "ICP",
          "def": "Ideal Customer Profile - narrow buyer characteristics for whom the product is a must-have."
        },
        {
          "term": "Beachhead market",
          "def": "The first narrow segment where a startup can dominate before expanding (Moore)."
        },
        {
          "term": "AARRR",
          "def": "Pirate funnel Acquisition, Activation, Retention, Referral, Revenue - product success metrics."
        },
        {
          "term": "Anchor pricing",
          "def": "Anchoring effect - a high reference price that makes the middle tier feel like a bargain."
        },
        {
          "term": "TAM SAM SOM",
          "def": "Total, Serviceable Available, and Serviceable Obtainable Market - three levels of market sizing."
        }
      ],
      "stats": [
        {
          "label": "Phase",
          "value": "BUILD"
        },
        {
          "label": "Category",
          "value": "Product"
        },
        {
          "label": "Load",
          "value": "50/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you're prepping a new product launch and don't know where to start",
        "When the product works but nobody buys because positioning is fuzzy",
        "When you have to pick between several market segments and lack beachhead discipline"
      ],
      "worstFor": [
        "When you only need an ad campaign executor, not a strategist",
        "When the product doesn't have product-market fit yet and you need user research first",
        "When you're looking for technical or architectural analysis, not business"
      ],
      "relatedAgents": [
        "res_ux",
        "writer",
        "analyst"
      ],
      "glossary": [
        {
          "term": "ICP",
          "definition": "Ideal Customer Profile - a precise buyer description for whom the product is the must-have fix."
        },
        {
          "term": "beachhead",
          "definition": "A narrow market segment a startup picks as its first landing target to build dominance."
        },
        {
          "term": "AARRR",
          "definition": "The five funnel metrics: Acquisition, Activation, Retention, Referral, Revenue."
        },
        {
          "term": "anchor price",
          "definition": "A high reference price set so the middle offer looks like a bargain."
        },
        {
          "term": "TAM/SAM/SOM",
          "definition": "Total, Serviceable Available, and Serviceable Obtainable Market - three levels of market sizing."
        }
      ],
      "learningQuote": "A launch isn't a one-day event - it's three phases: pre-launch, release day, and what happens after, when you start listening to the data.",
      "realExample": "Imagine that I was designing GTM for a devops team tool. Instead of spraying the message at every engineer, I picked a beachhead: SRE teams of 10-30 people in fintech. The first 40 customers closed in 6 weeks because the landing page spoke their language about burn rate, not platitudes about efficiency."
    },
    "statistician": {
      "tagline": "Forensic scientist of numbers - won't testify without a power analysis",
      "missionShort": "The statistician designs experiments and analyses so results actually mean something. The mission is to pick the test, sample size, power, and correction for multiple comparisons. Protects the team from conclusions drawn from gambler's data that will eventually fail in production.",
      "whoIs": "The statistician is a forensic scientist - before saying anything in court, checks three times whether the data supports that conclusion. Without power analysis and preregistration they won't testify, because their reputation depends on every inference surviving replication.",
      "analogy": "This agent is like a forensic expert who refuses to testify without proper evidence - would rather investigate the case than guess it.",
      "howItWorks": [
        {
          "label": "Hypothesis and plan",
          "desc": "Formulates the null and alternative hypotheses precisely. Writes the analysis plan before seeing the data (preregistration) to avoid p-value hacking."
        },
        {
          "label": "Power and sample size",
          "desc": "Calculates the required sample size for a given effect size, significance level (alpha), and power (usually 0.8). Refuses experiments with undersized samples."
        },
        {
          "label": "Test selection",
          "desc": "Picks the test appropriate to the data type and assumptions (t-test, Mann-Whitney, chi-square, regression). Checks the assumptions (normality, variances, independence)."
        },
        {
          "label": "Inference and report",
          "desc": "Reports effect size and confidence interval, not just p-value. Corrects for multiple comparisons (Bonferroni, BH). Keeps correlation and causation strictly separate."
        }
      ],
      "inputs": [
        "Research or business question to verify",
        "Description of data collection and available measurements",
        "Expected effect size or pilot data",
        "Time and budget constraints for the experiment"
      ],
      "outputs": [
        "Analysis plan document (preregistration) with hypotheses",
        "Power calculation and required sample size",
        "Result report with effect size and confidence interval",
        "Multiple comparisons correction if applied",
        "Conclusion recommendation with clear confidence labeling"
      ],
      "does": [
        "Formulates null and alternative hypotheses in testable form",
        "Calculates required statistical power and sample size before the experiment starts",
        "Picks a hypothesis test matched to distribution, variance, and data type",
        "Reports effect size and confidence interval, not just p-value",
        "Corrects for multiple comparisons to avoid false positives",
        "Registers the analysis plan before seeing the data (preregistration)",
        "Separates statistical significance from practical significance of the effect",
        "Warns against causal conclusions drawn from observational data"
      ],
      "doesNotDo": [
        "Does not run exploratory data analysis (that's eda_analyst)",
        "Does not build ML models or training pipelines",
        "Does not write production code or ETL",
        "Does not collect data from users directly (that's res_ux)",
        "Does not accept p-value hacking in the name of a business deadline",
        "Does not formulate hypotheses after seeing results (HARKing)",
        "Does not replace the product manager in deciding whether a feature ships"
      ],
      "antiPatterns": [
        "P-hacking - testing many hypotheses and reporting only the ones with p < 0.05",
        "HARKing - Hypothesising After Results are Known, writing hypotheses to fit the findings",
        "Underpowered Study - experiment on too small a sample, only detects huge effects",
        "P Value Worship - reporting only p-value without effect size or confidence interval",
        "Correlation as Causation - causal conclusions from purely observational data"
      ],
      "keyConcepts": [
        {
          "term": "Null hypothesis",
          "def": "The zero hypothesis assuming no effect, which the test tries to reject."
        },
        {
          "term": "Type I/II error",
          "def": "Type I (false positive) and Type II (false negative) errors are unavoidable but can be balanced."
        },
        {
          "term": "Power",
          "def": "Probability of detecting a real effect; standard target is 0.8, which drives sample size."
        },
        {
          "term": "Effect size",
          "def": "Measure of effect magnitude (Cohen d, r, OR) independent of sample size, more important than p-value."
        },
        {
          "term": "Preregistration",
          "def": "Registering the analysis plan before collecting data, protects against p-hacking."
        }
      ],
      "stats": [
        {
          "label": "Phase",
          "value": "STRATEGY"
        },
        {
          "label": "Category",
          "value": "Data"
        },
        {
          "label": "Load",
          "value": "45/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you're designing an A/B test and need to know how many weeks to run it",
        "When the team wants to draw conclusions from data and you need a correctness check",
        "When you need to check whether an apparent result is just noise or multiple comparisons"
      ],
      "worstFor": [
        "When you need exploratory analysis and pattern hunting (that's eda_analyst)",
        "When the decision is qualitative and doesn't rest on a measurable metric",
        "When you have 30 minutes left in the meeting and need a simple answer"
      ],
      "relatedAgents": [
        "eda_analyst",
        "analyst",
        "expert_analyst"
      ],
      "glossary": [
        {
          "term": "null hypothesis",
          "definition": "The default assumption that there is no effect, which the test attempts to reject."
        },
        {
          "term": "power",
          "definition": "Test power - probability of detecting an effect when one truly exists, standard target 0.8."
        },
        {
          "term": "effect size",
          "definition": "A measure of effect magnitude independent of sample size, e.g. Cohen d or odds ratio."
        },
        {
          "term": "p-hacking",
          "definition": "Manipulating data or tests until p < 0.05 appears, a violation of statistical rigor."
        },
        {
          "term": "preregistration",
          "definition": "Public registration of hypotheses and analysis plan before seeing data, defends against HARKing."
        }
      ],
      "learningQuote": "The p-value isn't an oracle - effect size and sample size say more about reality than the magic 0.05.",
      "realExample": "Imagine that the team wanted to ship a new onboarding because the initial test showed a 3 percent conversion lift at p = 0.04. I ran the power analysis: the sample was too small, and the effect likely sat in a 95 percent CI from -0.5 to 6.5. I blocked the rollout, asked for a longer experiment, and the true effect turned out to be 1.2 percent - not business-significant at all."
    },
    "eda_analyst": {
      "tagline": "Data detective with a magnifier - describes reality before anyone models it",
      "missionShort": "The EDA analyst runs exploratory data analysis: profiling, anomaly detection, correlations, and visualizations. The mission is to describe the data so the team knows what they're working with before building a model or deciding anything, and so hidden traps surface early.",
      "whoIs": "The EDA analyst is a detective with a magnifier - won't form a theory before seeing the crime scene. Walks the columns, flips through distributions, stares at outliers, and listens to what the data is trying to say. Their work is questions, not ready-made answers.",
      "analogy": "This agent is like an astronomer before building a telescope - first looks at the sky with the naked eye and maps where the stars are and where the voids are.",
      "howItWorks": [
        {
          "label": "Data profiling",
          "desc": "Describes every column: type, missing values, uniques, distribution, statistics. Builds a data dictionary as the team's shared baseline."
        },
        {
          "label": "Distribution plots",
          "desc": "Builds histograms, boxplots, and density plots for numeric variables, and bar charts for categorical. Watches for skew, kurtosis, and modality."
        },
        {
          "label": "Correlations and relationships",
          "desc": "Computes correlation matrices, pair plots, and cross-tabulations. Hunts for potential leak features and collinearities that would break a model."
        },
        {
          "label": "Anomalies and report",
          "desc": "Identifies outliers, systematic missingness, duplicates, and Simpson-style paradoxes. Writes a report with key observations and recommendations."
        }
      ],
      "inputs": [
        "Raw dataset (CSV, Parquet, SQL table)",
        "Description of data provenance and business context",
        "Research question or working hypothesis to explore",
        "Column dictionary if available, otherwise just metadata"
      ],
      "outputs": [
        "Data dictionary with types, missing values, and distributions",
        "Set of distribution and correlation visualizations",
        "List of anomalies, outliers, and data quality issues",
        "Report with key observations and recommendations",
        "Reproducible Jupyter notebook or script for the team"
      ],
      "does": [
        "Profiles data column by column with types, missing values, and uniques",
        "Builds histograms, boxplots, and density plots that capture distribution shape",
        "Computes Pearson and Spearman correlation matrices, detecting collinearities",
        "Identifies outliers via IQR, z-score, and visual inspection",
        "Detects Simpson's paradox and hidden conditioning variables",
        "Flags systematic missingness (MCAR vs MAR vs MNAR) with consequences",
        "Draws pair plots and cross-tabulations for categorical variables",
        "Creates a reproducible notebook that can be handed to modelers and the statistician"
      ],
      "doesNotDo": [
        "Does not build ML models or train neural networks",
        "Does not run hypothesis tests with statistical rigor (that's statistician)",
        "Does not make business decisions based on data",
        "Does not do ETL or clean data beyond flagging problems",
        "Does not design database schemas (that's db_architect)",
        "Does not impute missing values with advanced methods without consultation",
        "Does not draw causal conclusions from observational data"
      ],
      "antiPatterns": [
        "Jump to Model - skipping EDA and going straight to training a model",
        "Mean Addiction - describing variables with only the mean, ignoring distribution and deviation",
        "Correlation Equals Causation - causal conclusions from correlations in observational data",
        "Outlier Removal Without Reason - cutting outliers because they clutter the charts",
        "Aggregated Blindness - looking only at global aggregates, ignoring segments and Simpson's paradox"
      ],
      "keyConcepts": [
        {
          "term": "Simpson paradox",
          "def": "A trend visible in aggregates disappears or reverses when broken down into subgroups."
        },
        {
          "term": "Outlier",
          "def": "An out-of-range value - could be an error, an anomaly, or the most important signal in the dataset."
        },
        {
          "term": "Skewness",
          "def": "Distribution asymmetry - tells you whether the mean pulls left or right of the median."
        },
        {
          "term": "Correlation vs causation",
          "def": "Correlation doesn't imply causation; you need to check hidden variables and temporal order."
        },
        {
          "term": "Missingness",
          "def": "Pattern of missing data: MCAR random, MAR conditional, MNAR systematic and informative."
        }
      ],
      "stats": [
        {
          "label": "Phase",
          "value": "BUILD"
        },
        {
          "label": "Category",
          "value": "Data"
        },
        {
          "label": "Load",
          "value": "60/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you get a new dataset and want to understand what you're working with",
        "When a model isn't performing and you suspect data quality issues",
        "When you're planning an experiment and want to know if the data has hidden traps"
      ],
      "worstFor": [
        "When you need hypothesis testing with statistical rigor (that's statistician)",
        "When you just want to train a model without understanding the data (not advised, but...)",
        "When the data is already well-described and the team knows every column by heart"
      ],
      "relatedAgents": [
        "statistician",
        "analyst",
        "db_architect"
      ],
      "glossary": [
        {
          "term": "Simpson paradox",
          "definition": "An effect where the direction of a relationship reverses when data is split into subgroups."
        },
        {
          "term": "outlier",
          "definition": "A value significantly different from the rest, requiring a call on whether it's an error or a signal."
        },
        {
          "term": "z-score",
          "definition": "A normalized distance from the mean measured in standard deviations."
        },
        {
          "term": "histogram",
          "definition": "A bar chart showing the frequency distribution of values across bins."
        },
        {
          "term": "pair plot",
          "definition": "A grid of scatter plots of variable pairs with histograms on the diagonal."
        }
      ],
      "learningQuote": "Before you build the model, understand the data - the mean can't be trusted if you can't see the distribution and the deviation.",
      "realExample": "Imagine that I was profiling an e-commerce transactions dataset for a new recommender. I found that 12 percent of records had negative prices (returns incorrectly encoded), and the correlation between price and conversion reversed when split by region (Simpson's paradox). The ML team saved a month of training models on broken data."
    },
    "control_mapper": {
      "tagline": "Translator between legalese and code - how GDPR becomes a concrete commit",
      "missionShort": "The Control Mapper translates regulatory requirements (GDPR, SOC2, ISO27001, HIPAA) into concrete technical and process controls. The mission is to build control matrices, identify gaps, and point at evidence of compliance before the auditor knocks on the door.",
      "whoIs": "The Control Mapper is a sworn translator between legal and engineering worlds. Reads regulations like statutes, but speaks code, config, and Jira tickets. Understands that every GDPR clause must eventually land as a checkbox in IAM roles or a retention policy in the database.",
      "analogy": "This agent is like a courtroom translator in a bilingual trial - statute on one side, commit on the other, and they have to make sure both parties are talking about the same thing.",
      "howItWorks": [
        {
          "label": "Requirements analysis",
          "desc": "Reads regulatory frameworks (GDPR articles, SOC2 trust services, ISO27001 Annex A, HIPAA Security Rule) and extracts concrete requirements for data and processes."
        },
        {
          "label": "Control mapping",
          "desc": "For every requirement identifies a technical control (encryption, RBAC, audit logs) or process control (quarterly review, DPIA). Avoids duplication by reusing CIS/NIST baseline controls."
        },
        {
          "label": "Compliance matrix",
          "desc": "Builds a requirements vs controls vs evidence matrix. Shows where evidence is missing, where compensations exist, and where the gap is."
        },
        {
          "label": "Gap analysis",
          "desc": "Flags gaps with priority (blocker, major, minor) and recommends concrete steps. Prepares the audit-ready document for external inspectors."
        }
      ],
      "inputs": [
        "List of regulatory frameworks in scope (e.g. GDPR + SOC2)",
        "System description, architecture, and data flow",
        "Existing policies and compliance documents if any",
        "Access to evidence (logs, configurations, policies)"
      ],
      "outputs": [
        "Control matrix: requirements vs controls vs evidence",
        "Gap list with priorities and recommendations",
        "Technical control specifications for implementation",
        "Process and policy compliance documentation",
        "Audit-ready checklist and readiness report"
      ],
      "does": [
        "Maps GDPR, SOC2, ISO27001, and HIPAA requirements to technical and process controls",
        "Builds requirements vs controls vs evidence matrices across multiple frameworks at once",
        "Identifies gaps and prioritizes them by business and legal risk",
        "Picks compensating controls when a full control is impossible",
        "Reuses CIS/NIST baseline controls instead of reinventing everything",
        "Documents DPIAs for GDPR and personal data processing activities",
        "Maps STRIDE threats to controls that prevent specific risks",
        "Prepares audit documentation for external inspectors (ISO, SOC2 Type 2)"
      ],
      "doesNotDo": [
        "Does not implement technical controls (that's backend and qa_security)",
        "Does not write code or infrastructure configuration",
        "Does not run external audits as an independent auditor",
        "Does not decide business risk for the company (that's the CISO and counsel)",
        "Does not translate legalese into plain language (that's legal)",
        "Does not ignore gaps to compromise with a business deadline",
        "Does not pen-test the system (that's qa_security)"
      ],
      "antiPatterns": [
        "Checkbox Compliance - ticking requirements without actual implementation evidence",
        "Framework Silos - separate documentation per framework instead of reusing baseline controls",
        "Evidence Theater - collecting screenshots with no link to an actual control",
        "Control Sprawl - hundreds of controls with no priorities, nobody knows which ones are critical",
        "Last Minute Audit - gathering evidence the day before the audit instead of continuous monitoring"
      ],
      "keyConcepts": [
        {
          "term": "CIA triad",
          "def": "Core security goals: Confidentiality, Integrity, Availability."
        },
        {
          "term": "SOC2 trust services",
          "def": "Five categories: Security, Availability, Processing integrity, Confidentiality, Privacy."
        },
        {
          "term": "GDPR DPIA",
          "def": "Data Protection Impact Assessment - required for high-risk personal data processing."
        },
        {
          "term": "STRIDE",
          "def": "Threat model: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege."
        },
        {
          "term": "Compensating control",
          "def": "A substitute control when the original isn't feasible - must provide equivalent risk reduction."
        }
      ],
      "stats": [
        {
          "label": "Phase",
          "value": "BUILD"
        },
        {
          "label": "Category",
          "value": "Compliance"
        },
        {
          "label": "Load",
          "value": "55/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When the company is preparing for a SOC2 or ISO27001 audit and has no control matrix",
        "When you're shipping a product to EU customers and must meet GDPR with evidence",
        "When you have multiple frameworks at once (SOC2 + HIPAA + GDPR) and want control reuse"
      ],
      "worstFor": [
        "When you need a penetration test (that's qa_security)",
        "When the problem is technical in the code, not regulatory compliance",
        "When you're looking for legal counsel to interpret clauses (that's a lawyer, not an agent)"
      ],
      "relatedAgents": [
        "qa_security",
        "backend",
        "writer"
      ],
      "glossary": [
        {
          "term": "CIA triad",
          "definition": "Confidentiality, Integrity, Availability - the three pillars of information security."
        },
        {
          "term": "SOC2 TSC",
          "definition": "SOC2 Trust Services Criteria - five control categories for an AICPA audit."
        },
        {
          "term": "DPIA",
          "definition": "Data Protection Impact Assessment required by GDPR for high-risk processing."
        },
        {
          "term": "STRIDE",
          "definition": "Microsoft threat model used for application and infrastructure threat modeling."
        },
        {
          "term": "compensating control",
          "definition": "A substitute control deployed when the original isn't feasible, must offset equivalent risk."
        }
      ],
      "learningQuote": "Compliance doesn't exist without evidence - a checkbox in a document with no link to system configuration is fiction.",
      "realExample": "Imagine that I was mapping SOC2 and GDPR for an HR-tech startup. Instead of writing two separate matrices I built a single baseline on CIS Controls and mapped 78 percent of the controls to both frameworks at once. The SOC2 Type 2 auditor accepted the same evidence used for the DPIA, and the team saved three months of duplicate work."
    },
    "telemetry_surfer": {
      "tagline": "Firefighter with a thermal camera - tracks the incident through PromQL queries",
      "missionShort": "The Telemetry Surfer searches existing telemetry (metrics, logs, traces) for patterns, anomalies, and incident trails. The mission is to answer what happened and what's happening now using reproducible PromQL, LogQL, and trace search queries.",
      "whoIs": "The Telemetry Surfer is a firefighter with a thermal camera walking into a dark building. Can't see the fire directly, but sees temperature, smoke, and airflow, and assembles a picture of what's burning from those signals. Their language is queries, not guesses.",
      "analogy": "This agent is like a mountain rescuer with a sonar probe - doesn't dig blindly in the snow, reads the signals and locates the source of the problem from the data.",
      "howItWorks": [
        {
          "label": "Question formulation",
          "desc": "Re-encodes a fuzzy incident report (\"something is broken\") into a concrete telemetry question: which metric, which period, which service."
        },
        {
          "label": "PromQL and LogQL queries",
          "desc": "Writes reproducible queries using rate(), histogram_quantile(), sum by, and LogQL stream selectors. Avoids scenarios where the query returns something different an hour later."
        },
        {
          "label": "Three-pillar correlation",
          "desc": "Links metric anomalies to a specific trace span (exemplar), then to logs via traceid. Builds the event timeline."
        },
        {
          "label": "Report and runbook",
          "desc": "Writes a report with a concrete hypothesis, evidence, reproduction queries, and a proposed action. Updates the runbook so next time is faster."
        }
      ],
      "inputs": [
        "Incident description or operational question - what happened",
        "Access to Prometheus/Loki/Tempo or equivalents",
        "Time window and list of suspect services",
        "Existing dashboards and runbooks if any"
      ],
      "outputs": [
        "Incident chronology with timestamps",
        "Reproducible PromQL/LogQL queries in the report",
        "Correlation of metrics with trace span and logs via traceid",
        "Root cause hypothesis with confidence level",
        "Runbook update for the next similar event"
      ],
      "does": [
        "Formulates telemetry questions from fuzzy incident reports",
        "Writes reproducible PromQL queries with rate(), histogram_quantile, sum by",
        "Searches logs with LogQL stream selectors and regex expressions",
        "Links metrics to trace spans via exemplars and to logs via traceid",
        "Detects temporal correlation between a deploy and a rise in error rate",
        "Compares before/after behavior for the same metric",
        "Identifies cardinality explosions and expensive queries that destabilize the TSDB",
        "Writes an investigation report with evidence and a proposed runbook update"
      ],
      "doesNotDo": [
        "Does not instrument the system or add new metrics (that's observability_engineer)",
        "Does not fix the code that caused the incident (that's the build phase)",
        "Does not build dashboards or SLOs from scratch (that's observability_engineer)",
        "Does not decide production rollbacks without a decision presenter",
        "Does not triage incidents as first-line support",
        "Does not write the post-mortem instead of the QA manager",
        "Does not draw conclusions about team culture from telemetry data"
      ],
      "antiPatterns": [
        "Eye Balling Graphs - guessing from a chart without a concrete reproducible query",
        "Single Pillar Investigation - looking only at metrics or only at logs instead of correlating the three pillars",
        "Cardinality Query - grouping by a high-cardinality field and taking down Prometheus itself",
        "Post Hoc Correlation - linking events only because they happened near each other in time",
        "Irate Over Long Range - using irate() over a long window, producing garbage results"
      ],
      "keyConcepts": [
        {
          "term": "histogram_quantile",
          "def": "PromQL function that computes quantiles (p50/p95/p99) from bucket histograms."
        },
        {
          "term": "rate vs irate",
          "def": "rate() averages over a window, irate() uses the last two samples - use each depending on context."
        },
        {
          "term": "LogQL stream selector",
          "def": "Loki log stream filter by labels, e.g. {app=\"api\", level=\"error\"}."
        },
        {
          "term": "Trace span",
          "def": "A tracing unit representing an operation with start/stop times and a parent-child relationship."
        },
        {
          "term": "Exemplar",
          "def": "A sample trace span attached to a metric point, clickable from the chart into the trace."
        }
      ],
      "stats": [
        {
          "label": "Phase",
          "value": "RESEARCH"
        },
        {
          "label": "Category",
          "value": "Ops"
        },
        {
          "label": "Load",
          "value": "50/100"
        },
        {
          "label": "Model",
          "value": "Sonnet"
        }
      ],
      "bestFor": [
        "When you have a production incident and need to figure out what's happening in minutes",
        "When something slowed down and nobody knows which service, but telemetry exists",
        "When you want to reconstruct an event timeline with evidence for a post-mortem"
      ],
      "worstFor": [
        "When the system doesn't have enough telemetry (observability_engineer first)",
        "When the problem is in UI design or the product, not in operations",
        "When you need a long-term SLO and dashboard plan from scratch"
      ],
      "relatedAgents": [
        "observability_engineer",
        "qa_perf",
        "res_tech"
      ],
      "glossary": [
        {
          "term": "histogram_quantile",
          "definition": "PromQL function that computes a quantile (e.g. p99) from a metric histogram."
        },
        {
          "term": "rate vs irate",
          "definition": "rate() averages over a window, irate() captures instantaneous change from the last two samples."
        },
        {
          "term": "LogQL",
          "definition": "Loki query language combining stream selectors with regex expressions and pipe operators."
        },
        {
          "term": "traceid",
          "definition": "Trace identifier propagated across all spans and linked logs."
        },
        {
          "term": "exemplar",
          "definition": "A trace span attached to a metric point, letting you jump from chart to trace."
        }
      ],
      "learningQuote": "If you can't reproduce the result with a query an hour later, that isn't an investigation - that's chart divination.",
      "realExample": "Imagine that I was investigating an incident where API p99 latency jumped from 200 ms to 4 seconds with no visible error. I wrote rate(http_request_duration_seconds_bucket) with histogram_quantile 0.99 and saw the jump started exactly at 14:32. The exemplar led to a trace span in the DB layer, and the log pulled by traceid showed the query planner picking a full scan after an index migration. 12 minutes, not hours."
    }
  },
  eduPreset: {
    "solo": {
      "tagline": "Master and apprentice in a workshop - two agents, one task, zero overhead",
      "missionShort": "Solo + Validator is the most minimal multi-agent configuration: the Orchestrator delegates a task to a single worker and validates the result itself. It's built for simple bugfixes, refactors, and scripts where the solution is known and complexity is minimal.",
      "whoIs": "Reach for this preset when you have one concrete task with a known solution: a typo in code, a small bug, a tiny refactor, a CLI script, or a simple CRUD implementation. The 45% rule says that nearly half of all programming tasks fit exactly this format.",
      "analogy": "This preset is like a master and apprentice in a workshop - the master takes the order and delegates to the apprentice, then inspects the welds at the end and either signs off or points out what to fix.",
      "howItWorks": [
        {
          "label": "Task analysis",
          "desc": "The Orchestrator scores complexity (S/M) and decides whether Solo is enough or escalation to a bigger preset is needed."
        },
        {
          "label": "Narrow Context instruction",
          "desc": "The Orchestrator writes a precise instruction with ONLY the information needed and delegates to Backend Dev."
        },
        {
          "label": "Implementation",
          "desc": "Backend Dev writes the code, adds unit tests, handles errors, and returns a ready artifact."
        },
        {
          "label": "PASS/FAIL validation",
          "desc": "The Orchestrator checks correctness and alignment with requirements. PASS means delivery. FAIL means feedback and one additional iteration."
        }
      ],
      "inputs": [
        "Description of a concrete task (bug, refactor, script, small function)",
        "Existing code or a pointer to the file that needs to be modified",
        "Acceptance criteria (what \"working\" means)",
        "Optional: unit tests to guarantee"
      ],
      "outputs": [
        "Ready code that fixes the bug or delivers the task",
        "Unit tests for the main path and edge cases",
        "Orchestrator PASS report with a short summary of the change",
        "List of modified files",
        "Optional: notes on remaining risks to watch"
      ],
      "does": [
        "Fixes simple bugs with a known solution",
        "Refactors small fragments of code without API changes",
        "Writes automation scripts and CLI tools",
        "Implements simple CRUD in one layer of the stack",
        "Adds unit tests where they are missing",
        "Validates the result through an independent meta-agent instead of self-review",
        "Separates meta-reasoning (Opus) from code expertise (Sonnet)",
        "Minimizes cost through the absolute lack of coordination"
      ],
      "doesNotDo": [
        "Does not run research (no Researcher - use Recon)",
        "Does not run a planning phase (no Planner - use Plan & Execute)",
        "Does not touch the frontend when the task is full-stack (use Trio)",
        "Does not audit security (no QA Security - use Security)",
        "Does not iterate in a fix-test loop (that's Quick Fix territory)",
        "Does not handle tasks that need multiple expert perspectives",
        "Does not scale beyond Small/Medium tasks"
      ],
      "antiPatterns": [
        "Solo on hot path - using Solo for payment or authorization code without QA Security",
        "Solo Overreach - pushing a complex full-stack feature through 2 agents instead of escalating to Trio",
        "Infinite Retry - keeping Solo running in circles while the Orchestrator keeps returning FAIL, instead of escalating",
        "Research Skip - skipping research when the technology is unknown, making blind decisions",
        "Solo for MVP - trying to build a whole MVP with a single worker instead of using the Startup preset"
      ],
      "keyConcepts": [
        {
          "term": "Direct Delegation",
          "def": "The simplest multi-agent pattern: hub with a single spoke, one two-way connection."
        },
        {
          "term": "45% Rule",
          "def": "Empirical observation that roughly half of programming tasks fit the 2-agent format."
        },
        {
          "term": "Narrow Context",
          "def": "The rule of handing an agent ONLY the information it needs, without excess."
        },
        {
          "term": "Model specialization",
          "def": "Opus for meta-reasoning, Sonnet for implementation - each model on its own turf."
        },
        {
          "term": "Self-review vs validation",
          "def": "A separate validator is more reliable than your own assessment of what you just wrote."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "2"
        },
        {
          "label": "Phases",
          "value": "2"
        },
        {
          "label": "Est. cost",
          "value": "$0.55-1.40"
        },
        {
          "label": "Time",
          "value": "<1 min"
        }
      ],
      "bestFor": [
        "When you have one concrete task with a known solution and don't need research",
        "When you care about the lowest possible cost and fastest response time",
        "When you want to fix a typo, a small bug, or add a tiny script"
      ],
      "worstFor": [
        "When the task requires understanding both the backend and the frontend (use Trio)",
        "When the task touches security-critical or payment code (use Security)",
        "When you need iterative validation in a fix-test loop (use Quick Fix)"
      ],
      "relatedPresets": [
        "quick_fix",
        "recon",
        "trio"
      ],
      "glossary": [
        {
          "term": "orchestrator",
          "definition": "Strategic agent on Opus that delegates tasks and validates results, does not write code."
        },
        {
          "term": "backend dev",
          "definition": "Implementation agent on Sonnet that writes code, tests, and handles errors."
        },
        {
          "term": "POC",
          "definition": "Proof of Concept - a working example that demonstrates an approach is feasible."
        },
        {
          "term": "narrow context",
          "definition": "Minimalist handoff of only the information needed for the task."
        },
        {
          "term": "direct delegation",
          "definition": "A pattern where the Orchestrator delegates a task directly to one worker without intermediate layers."
        }
      ],
      "learningQuote": "Simplicity is the highest form of sophistication - Solo does not choose simplicity because it must, but because for half of all tasks it is the best possible choice.",
      "realExample": "Imagine that you file a bug: the login form does not validate an empty email. You already know the fix - add an if-check on the frontend. This preset takes your description, the Orchestrator routes it to Backend Dev who adds validation and a regression test, and the Orchestrator confirms PASS in 30 seconds. Zero waiting, zero coordination, minimal cost."
    },
    "quick_fix": {
      "tagline": "Auto repair shop for code - fix and test over and over until it works",
      "missionShort": "Quick Fix is the smallest team with a feedback loop: Backend Dev fixes, an independent QA Quality tests, and the cycle repeats until PASS. It's designed for urgent bugfixes, hotfixes, and patches where a single attempt is not enough.",
      "whoIs": "Reach for this preset when you have a bug you must ship today and cannot afford regressions. Three agents in a Fix-Test Loop configuration reduce defects by 60-80% versus a one-shot run, thanks to the independent auditor after every attempt.",
      "analogy": "This preset is like an auto repair shop: the mechanic fixes the fault, the QA inspector takes it for a test drive, and if they find a problem the car goes back to the mechanic - and round and round until the inspector signs off PASS.",
      "howItWorks": [
        {
          "label": "Intake",
          "desc": "The Orchestrator takes the bug report, analyzes severity and scope, and writes a precise instruction for the builder."
        },
        {
          "label": "Fix in Narrow Context",
          "desc": "Backend Dev diagnoses the root cause, implements the fix, writes a regression test, and runs tests locally."
        },
        {
          "label": "Independent test",
          "desc": "QA Quality runs the test suite, checks edge cases and regressions, and produces a PASS or FAIL report with concrete notes."
        },
        {
          "label": "Loop until PASS",
          "desc": "If FAIL - return to step 2 with feedback. Limit 3-4 iterations, then escalate to a bigger preset."
        }
      ],
      "inputs": [
        "Bug report with steps to reproduce and expected behavior",
        "Existing code from the affected area plus related tests",
        "Bug severity (blocker, critical, major, minor)",
        "Acceptance criteria for PASS (what must work)"
      ],
      "outputs": [
        "Fixed code with a comment explaining the root cause",
        "Regression test preventing the bug from coming back",
        "QA Quality PASS report after the loop completes",
        "List of iterations with notes on what was fixed in each round",
        "Escalation recommendation if QA keeps returning FAIL after 3-4 rounds"
      ],
      "does": [
        "Fixes bugs that need continuous validation after every patch",
        "Handles hotfixes and production patches with independent verification",
        "Detects regressions through an independent auditor instead of self-review",
        "Iterates fix-test-fix until a real PASS",
        "Forces a regression test for every bug",
        "Applies Smart Model Routing - Opus for strategy, Sonnet for code, Haiku for tests",
        "Caps the iteration count and escalates when the loop does not converge",
        "Reduces defects by 60-80% versus a one-shot run"
      ],
      "doesNotDo": [
        "Does not build new features (this is a FIX preset - use Feature Sprint)",
        "Does not run a research phase (use Recon if you don't know how to fix it)",
        "Does not touch the frontend when the fix needs UI changes (use Trio)",
        "Does not audit security in depth (use Security)",
        "Does not work without a reproducible bug report",
        "Does not handle changes across multiple modules in parallel",
        "Does not replace senior-developer code review"
      ],
      "antiPatterns": [
        "Infinite Loop - the Critic keeps returning FAIL with no concrete notes and the loop spins forever",
        "Skipping Regression Test - the builder fixes the bug but does not add a test that catches its return",
        "Feature in Disguise - using Quick Fix to mask the construction of a new feature",
        "Shallow Fix - fixing the symptom instead of the root cause, guaranteeing the bug comes back",
        "Noise Escalation - escalating to a bigger preset after the first failed iteration instead of letting the loop work"
      ],
      "keyConcepts": [
        {
          "term": "Fix-Test Loop",
          "def": "Iterative loop pattern where the builder fixes and an independent QA tests until PASS."
        },
        {
          "term": "Continuous connection",
          "def": "Connection type where QA reports until completion, not just once."
        },
        {
          "term": "Root cause analysis",
          "def": "Hunting for the actual cause of a bug rather than treating the symptoms."
        },
        {
          "term": "Regression test",
          "def": "A test that prevents a fixed bug from coming back in future changes."
        },
        {
          "term": "Smart Model Routing",
          "def": "Assigning a model (Opus, Sonnet, Haiku) to a role based on the stakes of the error."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "3"
        },
        {
          "label": "Phases",
          "value": "3"
        },
        {
          "label": "Est. cost",
          "value": "$0.60-1.50"
        },
        {
          "label": "Time",
          "value": "1-3 min"
        }
      ],
      "bestFor": [
        "When you have an urgent production hotfix and cannot afford regressions",
        "When the bug has many edge cases and one fix attempt is not enough",
        "When you need independent validation after every fix iteration"
      ],
      "worstFor": [
        "When you are building a new feature instead of fixing a bug (use Feature Sprint)",
        "When the bug touches many modules and needs coordination across multiple builders (use Trio)",
        "When you need a research phase before the fix (use Recon)"
      ],
      "relatedPresets": [
        "solo",
        "bug_hunt",
        "recon"
      ],
      "glossary": [
        {
          "term": "hotfix",
          "definition": "An urgent patch deployed directly to production outside the normal release cycle."
        },
        {
          "term": "regression",
          "definition": "A situation where a new change breaks functionality that previously worked."
        },
        {
          "term": "edge case",
          "definition": "An extreme usage scenario (empty input, max value, null) that often reveals bugs."
        },
        {
          "term": "PASS/FAIL",
          "definition": "QA audit result - PASS means all tests passed, FAIL means another iteration is needed."
        },
        {
          "term": "continuous",
          "definition": "Agent connection type where the auditor reports until the loop ends rather than just once."
        }
      ],
      "learningQuote": "Feedback loops are the foundation of quality in multi-agent systems - without a loop the system runs on hope, with a loop it runs on guarantees.",
      "realExample": "Imagine that users report the Save button is broken. The Orchestrator analyzes, Backend Dev fixes a race condition on fetch, QA Quality discovers the spinner now stops on network errors and returns FAIL. Iteration 2: the builder adds error handling, QA finds a missing toast. Iteration 3: the builder fixes it, QA returns PASS. The cycle took 4 minutes."
    },
    "recon": {
      "tagline": "Scouting before the mission - first survey the terrain, then build",
      "missionShort": "Recon Squad is a three-person reconnaissance team: Researcher Tech investigates technology options, Backend Dev builds a POC from the findings, and the Orchestrator coordinates the sequential phases. It serves to explore unknown topics and validate feasibility before the main implementation.",
      "whoIs": "Reach for this preset when you face an unfamiliar technology or an unclear requirement and don't know how to tackle it. Instead of shooting blind, you send out a scout who checks the ground, and only then does the engineer build a foothold solution. The output is a POC, not production-ready code.",
      "analogy": "This preset is like a doctor diagnosing before treatment - first ordering tests (Research), then picking therapy from the results (Build POC), with a care coordinator (Orchestrator) making sure one step leads to the next instead of both running off in parallel directions.",
      "howItWorks": [
        {
          "label": "Research questions",
          "desc": "The Orchestrator defines concrete, bounded, measurable research questions based on the user's problem."
        },
        {
          "label": "Research Tech",
          "desc": "Researcher Tech searches docs, benchmarks, and case studies, compares at least 3 options, and produces a structured report with confidence scores."
        },
        {
          "label": "Build POC",
          "desc": "Backend Dev takes the findings and builds a minimal POC demonstrating the chosen approach (1-3 files, one hypothesis)."
        },
        {
          "label": "GO/NO-GO",
          "desc": "The Orchestrator evaluates research completeness and POC feasibility, and issues a GO, NO-GO, or escalate-to-a-bigger-preset recommendation."
        }
      ],
      "inputs": [
        "A problem or research question (e.g. which multi-agent framework to pick)",
        "Context of the existing stack and technical constraints",
        "POC success criteria (what must be proven)",
        "Time budget for exploration (hours, not days)"
      ],
      "outputs": [
        "Research report with TOP 3-5 options, pros/cons, and benchmarks",
        "Minimal POC in 1-3 files demonstrating the chosen approach",
        "List of identified risks (lock-in, maintenance, security)",
        "Confidence scores for the key findings",
        "GO/NO-GO recommendation with justification"
      ],
      "does": [
        "Explores unknown technologies before investing in the main implementation",
        "Compares 3+ options with benchmarks and sources",
        "Builds a POC validating the chosen approach",
        "Eliminates technology-choice mistakes before the project starts",
        "Implements a mini Hub-and-Spoke pattern with one cross-spoke connection",
        "Applies Smart Model Routing - Opus for strategy, Haiku for research, Sonnet for build",
        "Forces the Research THEN Build sequence, never in parallel",
        "Saves 10 refactor hours for every hour of research"
      ],
      "doesNotDo": [
        "Does not produce production-ready code (the output is a POC, not a release)",
        "Does not run multi-source research (only 1 researcher - use Research Swarm)",
        "Does not validate the POC through QA (no auditor - use Startup)",
        "Does not touch the frontend or design (no FE Dev or Designer)",
        "Does not make the final decision - it only recommends",
        "Does not replace a systems architect for large decisions",
        "Does not scale to many parallel hypotheses"
      ],
      "antiPatterns": [
        "Analysis Paralysis - the Researcher researches endlessly and the POC is never built",
        "Blind Building - skipping the Researcher and jumping to implementation without validating options",
        "POC as Production - using a POC instead of a full implementation, generating technical debt",
        "Single Source Research - citing only one blog as complete research",
        "Cross-Spoke Abuse - forwarding huge reports directly Researcher-to-Builder, bypassing the Orchestrator, with no validation"
      ],
      "keyConcepts": [
        {
          "term": "Mini Hub-and-Spoke",
          "def": "Minimal variant of the Hub-and-Spoke pattern with one hub and two spokes."
        },
        {
          "term": "POC (Proof of Concept)",
          "def": "A minimal working example proving an approach is feasible."
        },
        {
          "term": "Look Before You Leap",
          "def": "A rule that eliminates Analysis Paralysis and Blind Building by forcing sequencing."
        },
        {
          "term": "Cross-spoke communication",
          "def": "A direct connection between two spokes that bypasses the hub to save tokens."
        },
        {
          "term": "Confidence score",
          "def": "A numeric measure of certainty for a finding, usually on a 0.0-1.0 scale."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "3"
        },
        {
          "label": "Phases",
          "value": "3"
        },
        {
          "label": "Est. cost",
          "value": "$0.60-1.50"
        },
        {
          "label": "Time",
          "value": "2-4 min"
        }
      ],
      "bestFor": [
        "When you are evaluating a new technology or framework and don't know where to start",
        "When you want to check the feasibility of an approach before investing in a full implementation",
        "When you need a POC for a client meeting or a demo for management"
      ],
      "worstFor": [
        "When the solution is already known and you don't need research (use Solo)",
        "When you need to ship production-ready code (the output is only a prototype)",
        "When the decision requires comparing many sources and adversarial critique (use Reflect or Research)"
      ],
      "relatedPresets": [
        "solo",
        "reflect",
        "research"
      ],
      "glossary": [
        {
          "term": "spike",
          "definition": "A short, bounded technical exploration validating a specific hypothesis."
        },
        {
          "term": "POC",
          "definition": "Proof of Concept - minimal code showing that an approach works in practice."
        },
        {
          "term": "researcher tech",
          "definition": "A Haiku agent that searches docs and benchmarks and does not write code."
        },
        {
          "term": "Hub-and-Spoke",
          "definition": "An architectural pattern with a central hub (Orchestrator) and spokes (workers)."
        },
        {
          "term": "GO/NO-GO",
          "definition": "A decision summary for a POC - whether to continue with full implementation or drop the idea."
        }
      ],
      "learningQuote": "One hour of research saves ten hours of refactoring - the Recon preset formalizes this rule in the smallest possible configuration.",
      "realExample": "Imagine that you are considering a migration from Express to Fastify for better performance. The Orchestrator defines the questions, Researcher Tech compares benchmarks and finds that Fastify gives 2x throughput but has no plugin for your SSO, Backend Dev builds a POC with alternative middleware that works. Recommendation: GO with a caveat around SSO. The whole process takes 3 minutes instead of a week of speculation."
    },
    "trio": {
      "tagline": "The classic Backend-Frontend-QA triangle - the minimal team for full stack",
      "missionShort": "Classic Trio is three agents splitting work along the natural lines of full stack: Backend Dev writes API and logic, Frontend Dev builds UI and state, QA Quality tests the integration. It's the only Tier 1 preset without an Orchestrator - the agents talk peer-to-peer through API contracts.",
      "whoIs": "Reach for this preset when you are building a simple full-stack feature: a form with validation, a REST endpoint with UI, a mini dashboard, a CRUD with an interface. The task must be well defined (the cost of an Opus Orchestrator would be wasted), and the integration results must pass through an independent tester.",
      "analogy": "This preset is like three craftspeople in a restaurant - the chef cooks (Backend), the waiter serves (Frontend), the health inspector checks (QA) - three roles, zero duplication, full service.",
      "howItWorks": [
        {
          "label": "Backend API",
          "desc": "Backend Dev designs REST endpoints, data models, server-side validation, and writes unit tests."
        },
        {
          "label": "Contracts and Frontend",
          "desc": "The backend hands the frontend the API contracts (endpoints, payloads, errors). The frontend builds UI components, state, client-side validation, and accessibility."
        },
        {
          "label": "BE-FE sync",
          "desc": "Backend and Frontend sync peer-to-peer in both directions, correcting contracts when a mismatch surfaces."
        },
        {
          "label": "Integration QA",
          "desc": "QA Quality tests BE+FE integration, edge cases, and regressions, and produces a PASS/FAIL report with concrete notes for the right agent."
        }
      ],
      "inputs": [
        "Description of a full-stack feature (form, CRUD, dashboard, REST API + UI)",
        "Tech stack for the backend and the frontend",
        "Acceptance criteria for the UI and the API separately",
        "Optional mockup or data schema"
      ],
      "outputs": [
        "Ready backend with REST endpoints and server-side validations",
        "Ready frontend with UI components, state, and client-side validations",
        "API contracts documented between BE and FE",
        "QA Quality report with BE+FE integration PASS/FAIL results",
        "Backend unit tests and BE+FE integration tests"
      ],
      "does": [
        "Builds a full-stack feature end to end in a single pass",
        "Splits work along the natural BE/FE/QA lines without a coordinator",
        "Enforces API contracts between layers as the source of truth",
        "Tests BE+FE integration through an independent QA",
        "Saves the cost of an Opus Orchestrator for well-defined tasks",
        "Supports accessibility and edge cases on the UI side",
        "Handles peer-to-peer synchronization instead of central coordination",
        "Delivers a ready feature in 60-120 seconds"
      ],
      "doesNotDo": [
        "Does not run research (no Researcher - use Feature Sprint)",
        "Does not run a planning or decomposition phase (no Planner - use Standard)",
        "Does not audit security (no QA Security - use Security)",
        "Does not coordinate complex dependencies (no Orchestrator)",
        "Does not design UX from scratch (no Designer - use Design System)",
        "Does not treat databases as a dedicated problem (use Full-Stack Premium)",
        "Does not handle multi-domain features with many services"
      ],
      "antiPatterns": [
        "Trio for backend - using 3 agents when the task is pure backend and Frontend sits idle",
        "No contracts - Backend and Frontend build independently without agreeing on the interface, and integration falls apart",
        "QA at the end - QA only receives artifacts after 100% of the implementation instead of iteratively",
        "Complex without a coordinator - using Trio for a problem that needs central decisions",
        "Design in Trio - trying to redesign UI without a Designer in the team"
      ],
      "keyConcepts": [
        {
          "term": "Triangle pattern",
          "def": "Peer-to-peer topology of three agents with no central coordinator."
        },
        {
          "term": "API contracts",
          "def": "Agreed communication format between Backend and Frontend eliminating interface drift."
        },
        {
          "term": "Peer-to-peer",
          "def": "Communication pattern without a hub where agents talk directly."
        },
        {
          "term": "Natural BE/FE split",
          "def": "Dividing work along the lines that are the least contested in web development."
        },
        {
          "term": "Integration testing",
          "def": "Testing BE and FE cooperating as a whole instead of separate layers."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "3"
        },
        {
          "label": "Phases",
          "value": "3"
        },
        {
          "label": "Est. cost",
          "value": "$0.60-1.50"
        },
        {
          "label": "Time",
          "value": "1-2 min"
        }
      ],
      "bestFor": [
        "When you are building a simple full-stack feature like CRUD or a form with an API",
        "When the task is well defined and you don't need an Orchestrator on Opus",
        "When you want the minimal team capable of delivering a full BE+FE+QA feature"
      ],
      "worstFor": [
        "When the task requires research or comparing technology options (use Feature Sprint)",
        "When it touches security and needs an audit (use Security)",
        "When it is purely backend or purely frontend (use Solo or Quick Fix)"
      ],
      "relatedPresets": [
        "feature_sprint",
        "startup",
        "solo"
      ],
      "glossary": [
        {
          "term": "frontend dev",
          "definition": "A Sonnet agent writing UI components, forms, state management, and accessibility."
        },
        {
          "term": "API contracts",
          "definition": "A specification of endpoints, payloads, and errors agreed between Backend and Frontend."
        },
        {
          "term": "QA Quality",
          "definition": "A Haiku audit agent testing integration, edge cases, and regressions."
        },
        {
          "term": "peer-to-peer",
          "definition": "Direct communication pattern between agents without a central coordinator."
        },
        {
          "term": "full-stack",
          "definition": "A feature spanning both backend (API, database) and frontend (UI, state)."
        }
      ],
      "learningQuote": "The absence of an Orchestrator in Classic Trio is not a limitation but an optimization - for well-defined features peer-to-peer is more efficient than central coordination.",
      "realExample": "Imagine that you need to add a signup form with validation and an API. Backend Dev designs POST /api/users with validation, Frontend Dev builds the component with client-side validation and state handling, QA Quality verifies the integration works for empty fields, duplicate emails, and special characters. A ready feature in 90 seconds, zero Opus overhead."
    },
    "reflect": {
      "tagline": "Scientist with a reviewer - deep understanding of a topic through critique",
      "missionShort": "Reflective Loop is three agents in a reflective loop: a Researcher collects data, an Analyst interprets, and a Research Critic scores the analysis and sends it back for revision when it's weak. The only Tier 1 preset that does NOT produce code - only analysis, a report, and recommendations.",
      "whoIs": "Reach for this preset when you face an important decision that demands a rigorous look at the topic: due diligence, architecture comparison, risk analysis, strategic option evaluation. You want confirmation bias eliminated through a built-in critic whose only job is to challenge the conclusions.",
      "analogy": "This preset is like peer review in academia - the scientist gathers data (Researcher), the reviewer interprets (Analyst), the devil's advocate looks for weaknesses (Critic) - and the cycle repeats until quality clears the bar.",
      "howItWorks": [
        {
          "label": "Data gathering",
          "desc": "Researcher Tech searches docs, benchmarks, case studies, and blogs, and produces a raw report with facts, quotes, and source URLs."
        },
        {
          "label": "Interpretation",
          "desc": "The Analyst receives the raw report and synthesizes conclusions, patterns, trade-offs, and recommendations."
        },
        {
          "label": "Critique",
          "desc": "Research Critic scores the analysis in 5 categories (Completeness, Accuracy, Relevance, Freshness, Actionability) on a 1-10 scale."
        },
        {
          "label": "Elastic loop",
          "desc": "If average score >= 6/10 - PASS and delivery. If < 6/10 - revision at the Researcher, max 3-4 iterations with a forced PASS."
        }
      ],
      "inputs": [
        "Research question or a decision that needs a rigorous justification",
        "Quality criteria for evaluation (completeness, accuracy, relevance)",
        "Optional business context (budget, deadline, stakeholders)",
        "Optional list of sources that must be reviewed"
      ],
      "outputs": [
        "Raw data report with links to sources and quotes",
        "Analysis with conclusions, patterns, and trade-offs",
        "Critic scorecard in 5 categories (1-10) with justification",
        "Final recommendation with justification grounded in the data",
        "List of identified risks, gaps, and open questions"
      ],
      "does": [
        "Runs deep research with a built-in quality gate",
        "Eliminates confirmation bias through adversarial collaboration",
        "Scores the analysis in 5 categories for nuanced feedback",
        "Sends weak analyses back for revision instead of letting them through",
        "Offers due diligence before an important strategic decision",
        "Delivers recommendations with justification and links to sources",
        "Implements the Elastic Reflective Trio pattern",
        "Improves report quality by 25-40% over a single agent"
      ],
      "doesNotDo": [
        "Does NOT produce code - zero builders in the lineup, only analysis",
        "Does not implement the recommendations (that's a job for a preset with builders)",
        "Does not run multi-source research in parallel (use Research Swarm)",
        "Does not handle quick responses (the loop takes 2-5 min)",
        "Does not replace a domain expert for highly specialized topics",
        "Does not make decisions - only recommends with justification",
        "Does not handle simple questions with obvious answers"
      ],
      "antiPatterns": [
        "Reflect for coding - using the reflective loop to write code (zero builders - zero code)",
        "Infinite loop - the Critic is too strict (score always <6) and the loop spins endlessly",
        "Soft Critic - the Critic has low load and waves everything through, so the analysis goes unverified",
        "Research without a question - the Researcher gathers data without a clearly defined question, producing noise",
        "Single Source - analysis based on one blog or one document instead of cross-references"
      ],
      "keyConcepts": [
        {
          "term": "Adversarial collaboration",
          "def": "A technique where a dedicated critic attacks the conclusions of other agents to eliminate bias."
        },
        {
          "term": "Elastic loop",
          "def": "A loop with a variable iteration count tied to result quality (score >= threshold)."
        },
        {
          "term": "Confirmation bias",
          "def": "The tendency to look for information confirming a thesis instead of refuting it."
        },
        {
          "term": "5-category scorecard",
          "def": "Scoring in Completeness, Accuracy, Relevance, Freshness, Actionability on a 1-10 scale."
        },
        {
          "term": "Research Critic load 85",
          "def": "The highest load in Tier 1 - intentionally high so the Critic stays demanding and strict."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "3"
        },
        {
          "label": "Phases",
          "value": "3"
        },
        {
          "label": "Est. cost",
          "value": "$0.30-0.75"
        },
        {
          "label": "Time",
          "value": "2-5 min"
        }
      ],
      "bestFor": [
        "When you are doing due diligence before a major strategic or investment decision",
        "When you want to eliminate confirmation bias from reports and analyses",
        "When you are comparing architectures or frameworks and need justification"
      ],
      "worstFor": [
        "When you need code generated (Reflect implements nothing - use Recon)",
        "When the question is simple and has an obvious answer (the loop overhead is not worth it)",
        "When you must deliver an answer in 30 seconds (the loop takes 2-5 min)"
      ],
      "relatedPresets": [
        "recon",
        "research",
        "five_minds"
      ],
      "glossary": [
        {
          "term": "critic",
          "definition": "An audit agent whose only role is to challenge the conclusions of other agents."
        },
        {
          "term": "adversarial collaboration",
          "definition": "A collaboration technique where the critic actively looks for weaknesses in a thesis."
        },
        {
          "term": "due diligence",
          "definition": "Rigorous investigation of a topic before making a decision, especially an investment one."
        },
        {
          "term": "score 1-10",
          "definition": "A report quality rating scale covering completeness, accuracy, and relevance."
        },
        {
          "term": "elastic pattern",
          "definition": "A loop with no fixed iteration count, ending when quality clears a threshold."
        }
      ],
      "learningQuote": "Adding a critic agent to a research team improves report quality by 25-40% at an additional cost 8 times smaller than the benefit - it is the most cost-effective investment in analysis quality.",
      "realExample": "Imagine that you are considering a migration from MongoDB to PostgreSQL. The Researcher gathers benchmarks and case studies, the Analyst interprets that PostgreSQL wins on ACID but loses on horizontal scaling, and Research Critic rates Completeness 4 (missing migration cost data). PASS only comes on the second iteration once the Researcher adds TCO. You walk away with a recommendation, a scorecard, and sources."
    },
    "bug_hunt": {
      "tagline": "Two detectives at a crime scene - Security and Quality in parallel",
      "missionShort": "Bug Hunter is a four-person team: the Orchestrator coordinates, Backend Dev fixes, and TWO independent QAs (Security and Quality) test the same artifact in parallel from different perspectives. The Fork QA pattern prevents groupthink and catches problems a single tester would miss.",
      "whoIs": "Reach for this preset when the bug is suspicious, you worry that fixing one spot will break another, or when you suspect a security link. Four agents in the sweet spot - big when it needs to be, small when it can be - with two independent audit lines running in parallel.",
      "analogy": "This preset is like two detectives investigating the same crime scene independently - one looks for signs of break-in (Security), the other for signs of crime (Quality) - their reports complement each other and groupthink has no chance to blind them both.",
      "howItWorks": [
        {
          "label": "Bug triage",
          "desc": "The Orchestrator takes the report, scores severity and scope, writes an instruction for Backend Dev, and defines audit areas for both QAs."
        },
        {
          "label": "Fix implementation",
          "desc": "Backend Dev diagnoses the root cause, implements the fix with a regression test, and hands the artifact to both QAs in parallel."
        },
        {
          "label": "Parallel audit",
          "desc": "QA Security hunts for security holes (injection, authz, data exposure). QA Quality hunts for regressions, edge cases, and integration errors. Both report independently."
        },
        {
          "label": "Report aggregation",
          "desc": "The Orchestrator collects both reports, synthesizes a single PASS/FAIL decision, and if FAIL returns to the builder with combined feedback."
        }
      ],
      "inputs": [
        "Bug report with steps to reproduce and severity",
        "Existing code of the affected area with related tests",
        "Security context (whether the bug touches authorization, user data, or payments)",
        "Acceptance criteria for both audit lines"
      ],
      "outputs": [
        "Fixed code with a root cause analysis",
        "Regression test preventing recurrence",
        "QA Security report auditing for vulnerabilities",
        "QA Quality report with integration tests and edge cases",
        "Final Orchestrator PASS/FAIL decision with aggregated feedback"
      ],
      "does": [
        "Fixes bugs with parallel validation from two perspectives",
        "Detects security vulnerabilities as a side effect of the fix",
        "Prevents groupthink through independent audits",
        "Forces a regression test and guards against the bug coming back",
        "Handles pre-release bug sweeps for critical features",
        "Catches hidden side-effect damage after the fix",
        "Implements the Fork QA pattern with 2 parallel auditors",
        "Operates in the 4-agent sweet spot - smallest configuration that already offers dual perspective"
      ],
      "doesNotDo": [
        "Does not build new features (this is a bug-hunting preset)",
        "Does not run a research phase (no Researcher - use Recon if you don't know how)",
        "Does not touch the frontend when the bug is in FE (no FE Dev - use Trio)",
        "Does not replace a pentest (no full security audit - use Security)",
        "Does not iterate in a fix-test loop (one cycle - use Quick Fix for a loop)",
        "Does not handle bugs without a reproducible report",
        "Does not scale to many modules in parallel"
      ],
      "antiPatterns": [
        "QA Merge - combining both QA reports into one before showing the Orchestrator, erasing the value of independence",
        "Trivial Bug - using Bug Hunter for a typo, which is overkill (use Solo)",
        "No Repro - trying to hunt without a reproducible case, leaving both QAs with nothing to work on",
        "Security Skip - skipping QA Security on payment or auth bugs, which defeats the whole point",
        "Bug Hunt for a feature - using the preset to build a new feature instead of fixing an existing bug"
      ],
      "keyConcepts": [
        {
          "term": "Fork QA pattern",
          "def": "A pattern where one artifact is audited in parallel by multiple independent QAs."
        },
        {
          "term": "Groupthink prevention",
          "def": "Avoiding forced consensus by requiring independent reports instead of a joint analysis."
        },
        {
          "term": "Parallel auditors",
          "def": "Two or more auditors working in parallel with no communication between them."
        },
        {
          "term": "Dual perspective",
          "def": "Two different angles on the same artifact (e.g. security vs quality)."
        },
        {
          "term": "Sweet spot 4",
          "def": "A 4-agent configuration that is the smallest one offering parallel audits without excess."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "4"
        },
        {
          "label": "Phases",
          "value": "3"
        },
        {
          "label": "Est. cost",
          "value": "$0.65-1.60"
        },
        {
          "label": "Time",
          "value": "2-4 min"
        }
      ],
      "bestFor": [
        "When the bug is suspicious and you worry about hidden damage in other areas",
        "When the bug touches authorization or user data and you need a security audit",
        "When you are doing a pre-release sweep and want two independent audits instead of one"
      ],
      "worstFor": [
        "When the bug is trivial and one tester is enough (use Solo or Quick Fix)",
        "When you are building a new feature instead of fixing a bug (use Trio or Feature Sprint)",
        "When you need fix-test iterations in a loop (use Quick Fix for the continuous loop)"
      ],
      "relatedPresets": [
        "quick_fix",
        "security",
        "solo"
      ],
      "glossary": [
        {
          "term": "QA Security",
          "definition": "An audit agent looking for security holes (injection, authz, data exposure)."
        },
        {
          "term": "QA Quality",
          "definition": "An audit agent testing integration, edge cases, and functional regressions."
        },
        {
          "term": "Fork QA",
          "definition": "A flow-forking pattern routing to multiple parallel auditors who do not talk to each other."
        },
        {
          "term": "groupthink",
          "definition": "A phenomenon where a group drives toward consensus at the cost of critical thinking."
        },
        {
          "term": "regression",
          "definition": "A situation where a new change breaks functionality that previously worked."
        }
      ],
      "learningQuote": "Two independent eyes see more than one - Fork QA eliminates groupthink at the architectural level rather than relying on the discipline of a single auditor.",
      "realExample": "Imagine that users report the checkout button sometimes charges twice. The Orchestrator triages, Backend Dev diagnoses a missing idempotency key and implements a fix with a regression test. QA Security finds that the error message now leaks the internal order ID. QA Quality finds that refunds still double-charge on slow connections. Both reports land in parallel, the Orchestrator aggregates, and the builder ships a second revision that clears both audit lines in 4 minutes."
    },
    "content": {
      "tagline": "Editorial pipeline for text - two sources, a writer, and a QA pass working like a magazine newsroom",
      "missionShort": "Content Pipeline is a four-agent team specialized in producing content, not code. Two researchers run in parallel to gather data from forums and official documentation, the Writer synthesizes findings into a coherent document, and QA Quality verifies facts, completeness, and formatting.",
      "whoIs": "Reach for this preset when you need API documentation, a technical article, a report, or a changelog that must be factually safe. Ideal when the content has to reconcile the practitioner perspective (forums, Stack Overflow) with the official specs (docs, RFC).",
      "analogy": "This preset is like a magazine newsroom - two journalists gather information from different fronts, the editor writes the article from both sources, and the proofreader checks facts and grammar before it goes to print.",
      "howItWorks": [
        {
          "label": "Phase 1 - Brief and fan-out research",
          "desc": "The Orchestrator defines the content brief (topic, audience, format, questions) and fires two researchers in parallel: Researcher Forums (Stack Overflow, Reddit, Discord) and Researcher Tech (official docs, API reference, changelogs)."
        },
        {
          "label": "Phase 2 - Findings synthesis",
          "desc": "Both reports merge into one working brief containing the community perspective and the official perspective. This input replaces guesswork with data for the Writer."
        },
        {
          "label": "Phase 3 - Document writing",
          "desc": "The Writer (Sonnet) builds the H1-H3 structure, narrative, examples, code snippets, and parameter tables in the style set by the brief. No Bash or Edit access - text only."
        },
        {
          "label": "Phase 4 - Quality audit and iteration",
          "desc": "QA Quality checks substance (facts vs sources), completeness (brief coverage), readability, and Markdown format. PASS ships, FAIL loops back to the Writer (max 3 iterations)."
        }
      ],
      "inputs": [
        "Document topic and audience (e.g. junior developers, CTO, business client)",
        "Target format (README, tutorial, blog post, comparison report, changelog)",
        "Scope (what to cover, what to skip) and style (technical, journalistic, educational)",
        "Optional required or forbidden sources for citation"
      ],
      "outputs": [
        "Ready Markdown document with H1-H3 sections and examples",
        "Source list with URLs to forums and official docs",
        "QA Quality report listing what was checked and corrected",
        "Document metadata: word count, reading time, coverage score vs brief",
        "Drift report vs the brief when coverage is incomplete"
      ],
      "does": [
        "Produces technical documentation grounded in two independent sources",
        "Merges the practitioner forum perspective with official docs",
        "Creates READMEs, articles, comparison reports, changelogs, tutorials",
        "Verifies facts before publication and logs sources for every claim",
        "Iterates fixes when QA Quality finds gaps or factual errors",
        "Respects the style, audience, and format set by the brief",
        "Catches discrepancies between what docs say and how the tech is actually used",
        "Scales documentation module by module (one preset = one document)"
      ],
      "doesNotDo": [
        "Does not generate code - the Writer has no Bash or Edit to run scripts",
        "Does not implement the features it documents (use Solo or Feature Sprint for that)",
        "Does not do SEO research or optimization (that's what tech_writing_pipe is for)",
        "Does not create diagrams or graphics (preset has no Designer)",
        "Does not work well for short text - 5 changelog lines is pure overhead",
        "Does not replace interviewing a real end user (that's the Researcher UX role)",
        "Does not handle highly specialized domains (medicine, law) where a human expert is required"
      ],
      "antiPatterns": [
        "Pipeline for code - trying to use the Writer to implement an endpoint instead of docs; the Writer has no Bash",
        "Skipping research - delegating straight to the Writer with no source phase; the final doc hallucinates APIs that don't exist",
        "Brief too broad - a request to \"document the entire system\" burns 500K tokens and ships incoherent output",
        "Single source - using only Researcher Tech with no community perspective; the doc reads like a marketing brochure",
        "Brief with no audience - the Writer writes for nobody specific and ships text too technical for juniors and too shallow for seniors"
      ],
      "keyConcepts": [
        {
          "term": "Linear Pipeline",
          "def": "Architectural pattern where data flows through a series of stages in one direction, like an assembly line."
        },
        {
          "term": "Parallel Fan-In",
          "def": "Hybrid pipeline variant - two researchers work in parallel and their outputs merge before the Writer."
        },
        {
          "term": "Content brief",
          "def": "Structured instruction for the Writer containing topic, audience, format, and research questions."
        },
        {
          "term": "Brief drift",
          "def": "The gap between what should have been covered and what the Writer actually covered - QA Quality measures the coverage score."
        },
        {
          "term": "Dual sourcing",
          "def": "The rule that every key claim must be grounded in at least two independent sources (forum + docs)."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "4"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.20-0.55"
        },
        {
          "label": "Time",
          "value": "2-4 min"
        }
      ],
      "bestFor": [
        "When you're writing API docs or a README that must be factually correct",
        "When you're doing a tech comparison report and need to cite both practitioners and official limits",
        "When you're writing a technical article or tutorial that needs real-world examples"
      ],
      "worstFor": [
        "When you need code instead of text - that's a Solo or Feature Sprint job",
        "When the document is 1-2 sentences - the preset is overkill",
        "When you need graphics, diagrams, or interactive visualizations"
      ],
      "relatedPresets": [
        "tech_writing_pipe",
        "recon",
        "reflect"
      ],
      "glossary": [
        {
          "term": "coverage score",
          "definition": "Percentage of research questions from the brief that the document actually addresses."
        },
        {
          "term": "fan-in",
          "definition": "The point in a pipeline where outputs from multiple parallel agents meet in one place."
        },
        {
          "term": "ground truth",
          "definition": "Real practitioner experience from forums, unfiltered by marketing."
        },
        {
          "term": "dual sourcing",
          "definition": "The rule that every claim needs two independent confirmations before it lands in the document."
        },
        {
          "term": "brief drift",
          "definition": "The deviation of what was written from what should have been written, measured by QA."
        }
      ],
      "learningQuote": "Documentation without research is well-intentioned fiction - Content Pipeline treats writing with the same rigor as coding.",
      "realExample": "Imagine that you have a form-validator library with no docs, and 47 people on Stack Overflow are asking about the same 3 problems - this preset sends Researcher Forums to surface those 3 pain points, Researcher Tech to collect the official API for 23 functions, the Writer merges both sources into a README that addresses the real problems, and QA Quality catches that one parameter is missing. One fix iteration and you have a README that actually answers user questions."
    },
    "plan_exec": {
      "tagline": "Plan before action - Analyst decomposes, Planner schedules, Backend builds step by step",
      "missionShort": "Plan and Execute is a four-agent pattern for structural tasks where ad-hoc chaos costs more than planning. The Analyst decomposes the task into subtasks with dependencies, the Planner creates a phased schedule, Backend Dev executes the plan incrementally, and QA Quality verifies each step separately.",
      "whoIs": "Reach for this preset when you have a database migration, a large module refactor, an architecture change, or a framework update with breaking changes. Ideal wherever step dependencies mean chaos-first costs 2x more than plan-first.",
      "analogy": "This preset is like a construction crew with an architect - the architect measures and decomposes, the foreman lays out the schedule and books the crane, the workers execute step by step, and the inspector signs off on each phase before the next one starts.",
      "howItWorks": [
        {
          "label": "Phase 1 - Decomposition analysis",
          "desc": "The Analyst (Sonnet) reads the codebase, identifies modules affected by the change, estimates complexity S/M/L/XL, maps file dependencies, and produces a decomposition report - a list of subtasks with estimates."
        },
        {
          "label": "Phase 2 - Scheduling",
          "desc": "The Planner (Sonnet) arranges subtasks into a phased schedule: order, dependencies, checkpoints, PASS/FAIL criteria per phase. Does not code, does not analyze - plans execution."
        },
        {
          "label": "Phase 3 - Incremental execution",
          "desc": "Backend Dev gets ONE step with context, not the whole plan. After completion the Orchestrator verifies the result and delegates the next step. A bug in step 2 costs one step, not the whole batch."
        },
        {
          "label": "Phase 4 - Per-step validation",
          "desc": "QA Quality audits EACH step separately - tests pass, no regressions, the step meets the plan's criteria. Only then does progression move to the next step."
        }
      ],
      "inputs": [
        "Structural task (migration, refactor, reorganization, architecture change)",
        "Codebase access via Read and Grep for the analysis phase",
        "Constraints: deadline, token budget, priority",
        "Architectural context (frameworks, conventions, layers)"
      ],
      "outputs": [
        "Decomposition report from the Analyst with subtask dependencies",
        "Execution schedule from the Planner (phases, order, checkpoints)",
        "Shipped code after all plan steps",
        "Per-step QA reports instead of one final report",
        "Changelog describing what changed in each step - full traceability"
      ],
      "does": [
        "Decomposes a large task into smaller steps with explicit dependencies",
        "Creates a schedule that surfaces obstacles before you hit them",
        "Executes the plan incrementally - one step, one validation, then the next",
        "Isolates bugs to a single step instead of smearing them across the task",
        "Achieves ~83 percent cost reduction vs chaos-first for M and L tasks",
        "Adapts the plan when new discoveries during execution require re-planning",
        "Delivers full change history - what, when, why for every step",
        "Guarantees each step passes PASS criteria before the next one runs"
      ],
      "doesNotDo": [
        "Not for simple bugfixes - planning a 1-step task is pure overhead",
        "Not for urgent hotfixes where speed matters more than precision",
        "No research phase - assumes you know the stack and patterns",
        "No Designer - does not design interfaces or visual systems",
        "No Frontend Dev - only Backend Dev as the single builder",
        "Does not build new features from scratch - it's for changes in existing code",
        "Does not replace a security audit (use security or review for that)"
      ],
      "antiPatterns": [
        "Planning trivial tasks - sending \"add email field\" to Plan and Execute; the Analyst produces 1 subtask for 30K tokens",
        "Plan without checkpoints - a schedule that says \"5 steps, verify at the end\"; a bug in step 2 gets caught only after step 5",
        "Rigid plan - continuing the original plan after discovering new complexity in step 2; zero re-planning",
        "Whole plan in one delegation - the Orchestrator hands Backend Dev 5 steps at once; the builder loses context",
        "Plan without estimates - the Analyst doesn't classify complexity S/M/L/XL; the Planner doesn't know which steps are critical"
      ],
      "keyConcepts": [
        {
          "term": "Plan-and-Execute Loop",
          "def": "Two-phase pattern: first plan, then execute step by step with per-step verification."
        },
        {
          "term": "Incremental execution",
          "def": "Each step is its own Build plus Verify cycle, not one big sweep across the whole task."
        },
        {
          "term": "Checkpoint",
          "def": "A point in the plan where QA Quality checks whether the step meets criteria before moving to the next."
        },
        {
          "term": "Re-planning",
          "def": "Adapting the plan when new discoveries during execution reveal unforeseen dependencies."
        },
        {
          "term": "83 percent savings",
          "def": "Empirically measured cost reduction vs chaos-first for M and L tasks (Google Multi-Agent 2024)."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "4"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.60-1.50"
        },
        {
          "label": "Time",
          "value": "2-4 min"
        }
      ],
      "bestFor": [
        "When you're migrating a database or ORM with many dependent steps",
        "When you're refactoring a large module where change order matters",
        "When you're updating a framework with breaking changes scattered across the codebase"
      ],
      "worstFor": [
        "When you have a simple bug to fix - use quick_fix instead",
        "When you need an urgent production hotfix - planning wastes minutes",
        "When the task has 1 subtask with no dependencies - the Analyst and Planner are overhead"
      ],
      "relatedPresets": [
        "quick_fix",
        "migration_crew",
        "standard"
      ],
      "glossary": [
        {
          "term": "decomposition",
          "definition": "Breaking one large task into smaller subtasks with clear boundaries."
        },
        {
          "term": "phased schedule",
          "definition": "An ordered sequence of steps with dependencies and checkpoints."
        },
        {
          "term": "checkpoint",
          "definition": "A verification point between plan steps, not just at the end."
        },
        {
          "term": "complexity S/M/L/XL",
          "definition": "Four-step work estimation scale (small, medium, large, extra large)."
        },
        {
          "term": "chaos-first",
          "definition": "The no-plan approach - the builder gets the whole task at once and codes by gut feel."
        }
      ],
      "learningQuote": "A few minutes on a plan saves hours of unplanned chaos - Plan and Execute treats thinking as a cheaper form of work than debugging.",
      "realExample": "Imagine that you're migrating from Sequelize to Prisma in a project with 87 files - the Analyst decomposes into 5 subtasks (schema, CRUD, relations, data, tests), the Planner sets up phases with checkpoints after each, Backend Dev migrates the schema - PASS, models - FAIL on an M:N relation - fix - PASS, then relations, then data, then tests. The bug in phase 2 cost 5 minutes. Without a plan it would be debugging 4 tangled changes at once. Result: 6 iterations, 180K tokens, 200 seconds."
    },
    "perf_boost": {
      "tagline": "Measure, fix, measure again - the Measure-Fix cycle for code that works but works too slowly",
      "missionShort": "Performance Boost is a four-agent preset for measurable optimization of code that isn't broken, just slow. The Analyst profiles and identifies bottlenecks, Backend Dev implements specific fixes, QA Performance measures the delta, and the Integrator checks for regressions in related endpoints.",
      "whoIs": "Reach for this preset when your endpoint responds too slowly, Core Web Vitals are below Google's threshold, the bundle size is too large, or the database has slow queries. Ideal when you have a CONCRETE performance goal (e.g. LCP under 1.5s, p95 under 500ms) and need systematic optimization instead of guesswork.",
      "analogy": "This preset is like tuning a sports engine - the diagnostician hooks up telemetry and flags a 15 percent turbo leak, the mechanic replaces the exhaust and remaps the injection, the dyno verifies +47HP, and the coordinator checks that the new map didn't wreck fuel consumption.",
      "howItWorks": [
        {
          "label": "Phase 1 - Measure baseline",
          "desc": "The Analyst runs benchmarks, analyzes flame graphs, profiles, and identifies the top 3 bottlenecks with estimated impact. Produces a BEFORE report with concrete metrics and recommendations sorted highest-impact to lowest."
        },
        {
          "label": "Phase 2 - Fix the biggest bottleneck",
          "desc": "Backend Dev implements a specific recommendation from the Analyst (cache, indexes, JOIN, lazy loading, bundle split, connection pooling). One bottleneck per iteration - not all at once."
        },
        {
          "label": "Phase 3 - Verify in parallel",
          "desc": "QA Performance and the Integrator work SIMULTANEOUSLY. QA Perf measures the metric delta (BEFORE vs AFTER, p95, memory). The Integrator checks whether related endpoints suffered - /products faster but /orders not slower?"
        },
        {
          "label": "Phase 4 - Iteration decision",
          "desc": "The Orchestrator evaluates: goal hit - ship. Goal missed - Backend Dev fixes bottleneck number 2. After 2 iterations with no progress - escalate to Plan and Execute (architecture change)."
        }
      ],
      "inputs": [
        "Concrete performance goal (LCP, p95, bundle size, RPS, memory footprint)",
        "Optimization scope (single endpoint, module, whole system)",
        "Baseline metrics if available - the Analyst will measure anyway, but it saves time",
        "Constraints (do not touch the database, preserve API compatibility, budget 2 iterations)"
      ],
      "outputs": [
        "Optimized code after recommendation implementation",
        "BEFORE vs AFTER report with concrete numbers and metric deltas",
        "Integration report confirming no regressions in related places",
        "List of applied optimizations with each one's impact",
        "Prioritized list of remaining bottlenecks for future optimization"
      ],
      "does": [
        "Measures the baseline BEFORE fixing anything - data, not intuition",
        "Identifies the top 3 bottlenecks in impact order",
        "Fixes one bottleneck per iteration for measurable effect",
        "Verifies improvement with hard BEFORE vs AFTER numbers",
        "Checks for regressions in related endpoints and modules",
        "Iterates until the goal is hit or the budget is exhausted",
        "Documents every optimization with a numeric impact",
        "Escalates to Plan and Execute when the problem is architectural"
      ],
      "doesNotDo": [
        "Does not fix bugs - an endpoint returning 500 is a job for quick_fix",
        "Does not optimize frontend layout and CSS - preset has no Frontend Dev",
        "Does not guess without measuring - no optimization without the Analyst's report",
        "Does not optimize everything at once - only the top N bottlenecks",
        "Does not change architecture - that's Plan and Execute's job",
        "Does not build new features - only improves existing ones",
        "Does not run load testing for distributed scalability (that's perf_squad)"
      ],
      "antiPatterns": [
        "Optimization without measurement - Backend Dev adds a cache because \"the DB is slow\"; the real problem was an N+1 query",
        "Optimizing everything at once - 5 bottlenecks fixed in one iteration; you don't know which change helped",
        "No regression check - /products got faster but /orders got slower due to a shared cache",
        "Goal unreachable architecturally - 5 iterations of micro-optimization when you need an architecture change",
        "Optimizing healthy code - sending the preset at an endpoint already meeting SLA; wasted cost"
      ],
      "keyConcepts": [
        {
          "term": "Measure-Fix Cycle",
          "def": "Iterative pattern: measure, fix, verify, repeat until the goal is hit."
        },
        {
          "term": "Deming Cycle",
          "def": "Plan-Do-Check-Act - the philosophical ancestor of Measure-Fix adapted for agent systems."
        },
        {
          "term": "Bottleneck impact",
          "def": "One location's percentage share of total response time - the key to prioritization."
        },
        {
          "term": "Regression check",
          "def": "Verifying that optimizing one place didn't break related endpoints."
        },
        {
          "term": "Core Web Vitals",
          "def": "Google metrics (LCP, FID, CLS) that directly affect search ranking."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "4"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.65-1.55"
        },
        {
          "label": "Time",
          "value": "2-3 min"
        }
      ],
      "bestFor": [
        "When the API responds too slowly and you know the target SLA (p95 under X ms)",
        "When Core Web Vitals are below Google's threshold (LCP, FID, CLS)",
        "When the database has slow queries and you have flame graph access"
      ],
      "worstFor": [
        "When the endpoint is broken - that's a bug, use quick_fix",
        "When you only have a vague \"feels slow\" impression with no concrete goal",
        "When the problem is in the frontend (layout, hydration) - preset has no Frontend Dev"
      ],
      "relatedPresets": [
        "perf_squad",
        "quick_fix",
        "plan_exec"
      ],
      "glossary": [
        {
          "term": "LCP",
          "definition": "Largest Contentful Paint - time to render the largest above-the-fold element."
        },
        {
          "term": "p95",
          "definition": "The metric value below which 95 percent of samples fall - the real worst case for users."
        },
        {
          "term": "N+1 query",
          "definition": "Antipattern where a loop fires one query per iteration instead of one JOIN."
        },
        {
          "term": "flame graph",
          "definition": "Execution profile visualization showing which functions eat how much CPU time."
        },
        {
          "term": "regression",
          "definition": "New performance degradation caused by a change meant to improve it."
        }
      ],
      "learningQuote": "Don't optimize without measuring, don't measure without a goal, don't ship without checking regressions - Performance Boost turns guessing into method.",
      "realExample": "Imagine that you have an e-commerce site with LCP 4.2s and CLS 0.35 - Google penalizes ranking, conversion drops. The Analyst profiles and shows that a 2.4MB uncompressed hero image eats 55 percent of LCP. Backend Dev converts to WebP with srcset, adds explicit width and height, inlines Critical CSS. After one iteration: LCP 2.1s, CLS 0.08, both PASS, zero regressions in related views. 120K tokens, 130 seconds, goal hit on the first try."
    },
    "startup": {
      "tagline": "Full MVP lifecycle in five people - the minimum team to ship a complete product",
      "missionShort": "Startup MVP is the smallest team capable of delivering a complete product from requirement to working code. The Orchestrator coordinates, the Analyst writes user stories, Researcher Tech picks the stack, Backend Dev builds, QA Quality validates - each one is essential, zero redundancy.",
      "whoIs": "Reach for this preset when you're building a web app MVP, a prototype for a pitch, a small SaaS with login and 1-2 features, a microservice, or a bot with API integration. Ideal when you have a tight budget, a tight deadline, and need to ship something that works end-to-end fast.",
      "analogy": "This preset is like a garage startup - the CEO coordinates, the product manager analyzes requirements, the tech lead picks the technology, the sole developer builds, the sole tester checks. Each one is critical, losing any one threatens the mission.",
      "howItWorks": [
        {
          "label": "Phase 1 - Analysis and research in parallel",
          "desc": "The Analyst breaks requirements into user stories, acceptance criteria, and prioritizes by MoSCoW. At the same time Researcher Tech searches docs, compares libraries, and recommends the stack that ships a working product fastest."
        },
        {
          "label": "Phase 2 - Build with the full brief",
          "desc": "Backend Dev gets TWO things at the same time: the spec of WHAT to build (from the Analyst) and the recommendation of HOW to build it (from Researcher Tech). Implements logic, API, endpoints, data models, validation, and tests."
        },
        {
          "label": "Phase 3 - QA against the spec",
          "desc": "QA Quality tests the artifact AGAINST the Analyst's spec, not \"does the code look pretty\". Edge cases, error handling, compliance with acceptance criteria, automated tests. Produces a PASS/FAIL report with concrete notes."
        },
        {
          "label": "Phase 4 - Iterate or ship",
          "desc": "PASS - the Orchestrator ships the result. FAIL - Backend Dev fixes per QA notes (max 2-3 iterations). CRITICAL FAIL - escalate to feature_sprint or saas if more agents are needed."
        }
      ],
      "inputs": [
        "User requirements for the MVP (what it does, for whom, which key features)",
        "Constraints (deadline, preferred stack, target platform)",
        "Success criteria for the first release (must-have vs nice-to-have)",
        "Optional access to existing codebase if the MVP isn't from scratch"
      ],
      "outputs": [
        "Working MVP code with unit tests",
        "Spec with user stories and acceptance criteria (Analyst artifact)",
        "Tech report with stack recommendation and rationale",
        "QA report with a list of checked edge cases and notes",
        "Final artifact ready for pitch demo or first deploy"
      ],
      "does": [
        "Delivers a full lifecycle from requirement to working product",
        "Runs analysis and research in parallel, saving 30-40 percent of time vs sequential",
        "Picks a stack and technologies instead of guessing",
        "Verifies code against formal acceptance criteria",
        "Reaches 92 percent of the effectiveness of a 14-agent system at 35 percent of the cost",
        "Ships a working demo for an investor pitch in a single pass",
        "Ships minimal but complete technical documentation",
        "Scales via escalation when the MVP becomes a full product"
      ],
      "doesNotDo": [
        "No Frontend Dev or Designer - no advanced UI/UX",
        "No QA Security - an MVP without a security audit is not for fintech",
        "No multiple builders - a single Backend Dev as the bottleneck",
        "Does not do deep research - one Researcher Tech instead of a 6-source swarm",
        "Does not build for multiple microservices - no distributed integration",
        "Not for enterprise - lacks the planning and documentation needed at scale",
        "Does not replace a real product team for a long-term product"
      ],
      "antiPatterns": [
        "Skipping the Analyst - Backend Dev gets a raw requirement and doesn't know WHAT to build",
        "Skipping the Researcher - Backend Dev guesses the stack and refactors a week later",
        "Sequential research and analysis - you lose the preset's parallel optimization",
        "QA at the end after 3 iterations - too late for fixes, cost rises",
        "Orchestrator writes code - role confusion, the Orchestrator ONLY coordinates"
      ],
      "keyConcepts": [
        {
          "term": "Hub-and-Spoke",
          "def": "Pattern where the Orchestrator is the central hub and 4 specialists are spokes radiating out."
        },
        {
          "term": "MoSCoW prioritization",
          "def": "Must have / Should have / Could have / Won't have - the classic requirement prioritization technique."
        },
        {
          "term": "Parallel analysis",
          "def": "Analyst and Researcher Tech working at the same time instead of sequentially - 30-40 percent time savings."
        },
        {
          "term": "Minimum viable product",
          "def": "The smallest version of a product that delivers value to a user and lets you validate the hypothesis."
        },
        {
          "term": "Acceptance criteria",
          "def": "A formal list of conditions that must be met for QA to accept the feature."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "5"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.80-1.95"
        },
        {
          "label": "Time",
          "value": "3-5 min"
        }
      ],
      "bestFor": [
        "When you're building a web app MVP from scratch on a tight budget",
        "When you need a working prototype for an investor pitch in one day",
        "When you're building a microservice with API, logic, and tests, no frontend"
      ],
      "worstFor": [
        "When you're building an enterprise system with multiple domains - too few agents",
        "When the MVP has an advanced frontend or a UI redesign - no Designer",
        "When the system is security-critical - no QA Security"
      ],
      "relatedPresets": [
        "trio",
        "feature_sprint",
        "saas"
      ],
      "glossary": [
        {
          "term": "MVP",
          "definition": "Minimum Viable Product - the smallest product version that delivers value to a user."
        },
        {
          "term": "user story",
          "definition": "Short requirement form: as X I want Y so that Z."
        },
        {
          "term": "acceptance criteria",
          "definition": "Formal conditions that must be met for a feature to be accepted."
        },
        {
          "term": "hub-and-spoke",
          "definition": "Architectural pattern with a central coordinator and 4 specialist spokes."
        },
        {
          "term": "MoSCoW",
          "definition": "Prioritization method: Must, Should, Could, Won't."
        }
      ],
      "learningQuote": "Startup MVP is proof that five well-chosen heads reach 92 percent of what 14 can - don't add people, add parallelism.",
      "realExample": "Imagine that you have one weekend for a task manager prototype for a VC pitch on Monday - this preset fires the Analyst who writes user stories for CRUD + filtering + sorting, at the same time Researcher Tech compares Express vs Fastify and recommends Express with better-sqlite3. Backend Dev gets both artifacts and builds a REST API with validations. QA Quality tests empty titles, negative IDs, duplicates. PASS after one iteration. 4 minutes, 22 cents, you have something to show on Monday."
    },
    "cascade": {
      "tagline": "Cascading cost escalation - cheap models solve 70-80 percent, expensive ones only the hard cases",
      "missionShort": "Cascade Cost is a five-layer system where cheap models (Haiku) on the front handle 70-80 percent of tasks, Sonnet in the middle processes 20 percent, and Opus at the very end handles only 5-10 percent requiring synthesis. The pattern is known from IBM Watson, AWS Bedrock, and Google Vertex AI.",
      "whoIs": "Reach for this preset when you have high volumes of repetitive tasks, batch processing, customer support triage, content moderation, or a data pipeline. Ideal when quality must be preserved but the token budget is tight and your quality floor doesn't need Opus on every query.",
      "analogy": "This preset is like a hospital ER triage system - the nurse handles 70 percent of cases, the general practitioner 20 percent, the specialist only 10 percent. You don't send a cardiac surgeon to every scratch.",
      "howItWorks": [
        {
          "label": "Phase 1 - Front-line triage on Haiku",
          "desc": "Two Researcher Haiku work in parallel. H1 classifies complexity (S/M/L/XL) and filters noise. H2 enriches data from external sources. 70-80 percent of simple queries resolve here for pennies ($0.001-0.005 per query)."
        },
        {
          "label": "Phase 2 - Mid-tier build on Sonnet",
          "desc": "Backend Dev (Sonnet) steps in when the task requires creating, not just reading. Receives processed data from Haiku and builds: generates code, transforms formats, implements logic."
        },
        {
          "label": "Phase 3 - Mid-tier validate on Sonnet",
          "desc": "QA Quality (Sonnet) is the quality gate before escalation to Opus. Verifies Backend Dev artifacts, runs tests, checks compliance. PASS - result ready. FAIL - back to Backend Dev (max 2 iterations)."
        },
        {
          "label": "Phase 4 - Final arbiter on Opus",
          "desc": "The Orchestrator (Opus) steps in ONLY when strategic synthesis, conflict resolution, or an architectural decision is needed. Burns 15-30K tokens instead of 50-80K in the classic model - 50-70 percent savings on Opus alone."
        }
      ],
      "inputs": [
        "Large volume of similar tasks (hundreds/thousands daily)",
        "Routing rule defining when to escalate from Haiku to Sonnet",
        "Acceptance criteria for the Haiku layer (what it must handle alone)",
        "Token budget and target cost reduction"
      ],
      "outputs": [
        "Processed tasks with per-layer distribution",
        "Escalation rate metrics (what percent lands in each layer)",
        "Cost report with savings vs the classic all-Opus model",
        "Final results delivered in the contract format",
        "Escalation decision logs for routing audit"
      ],
      "does": [
        "Cuts costs 70-80 percent vs the classic all-Opus model",
        "Handles hundreds/thousands of queries per day without a cost storm",
        "Uses the cheapest model that can handle the task",
        "Escalates to a more expensive model only when necessary",
        "Maintains quality via the QA gate before Opus",
        "Implements the same pattern used by IBM Watson and AWS Bedrock",
        "Runs Haiku in parallel for maximum throughput",
        "Measures escalation distribution to optimize the routing rule"
      ],
      "doesNotDo": [
        "Not for tasks that require Opus from step one (architecture, strategy)",
        "Not worth it for small volumes - cascade overhead eats the savings",
        "Does not fit creative tasks that demand top quality from the start",
        "Does not work without a clear routing rule between layers",
        "Does not guarantee Opus-level quality for every query - only for escalated ones",
        "Does not replace security review (Haiku can miss a threat)",
        "Not flexible - add Opus to every query and you lose the point of the pattern"
      ],
      "antiPatterns": [
        "Opus on the front line - 10x more expensive for no reason; the whole cascade idea is destroyed",
        "No triage - everything goes straight to Sonnet; you lose the Haiku front-line filter",
        "Skipping QA - errors in mass outputs leak into production",
        "One Haiku - bottleneck under batch load; 2x Haiku in parallel is the minimum",
        "Opus on every query - no escalation means no cascade, flat costs"
      ],
      "keyConcepts": [
        {
          "term": "Cascade Escalation",
          "def": "Chained pattern where a task passes through increasingly expensive layers only when necessary."
        },
        {
          "term": "Model routing",
          "def": "Decision logic choosing a cheap or expensive model based on task complexity."
        },
        {
          "term": "Front-line triage",
          "def": "First layer classifying difficulty and filtering simple queries on the cheap model."
        },
        {
          "term": "Quality gate",
          "def": "QA Quality checks artifacts before costly escalation to Opus."
        },
        {
          "term": "70-80 rule",
          "def": "Empirically measured distribution - 70-80 percent of tasks resolved by Haiku, 15-25 percent Sonnet, 5-10 Opus."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "5"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.65-1.65"
        },
        {
          "label": "Time",
          "value": "2-4 min"
        }
      ],
      "bestFor": [
        "When you have 1000+ support tickets per day to process",
        "When you're running batch document processing with filtering and classification",
        "When you have an ETL pipeline with quality validation at different layers"
      ],
      "worstFor": [
        "When you have a small volume (dozens of tasks) - overhead not worth it",
        "When every task requires Opus from the start - you lose 70 percent of the pattern's cashflow",
        "When the project is mission-critical with no compromises - miss risk on Haiku"
      ],
      "relatedPresets": [
        "data_pipe",
        "kb_constructor",
        "standard"
      ],
      "glossary": [
        {
          "term": "cascade",
          "definition": "Chained escalation through layers with rising cost and capability."
        },
        {
          "term": "front-line",
          "definition": "First line of query handling by the cheapest model."
        },
        {
          "term": "escalation",
          "definition": "Passing a task to a more expensive layer when the current one can't cope."
        },
        {
          "term": "routing logic",
          "definition": "Rule deciding when to escalate a task between layers."
        },
        {
          "term": "model tier",
          "definition": "Layer in the cascade defined by the model used (Haiku, Sonnet, Opus)."
        }
      ],
      "learningQuote": "Don't send a cardiac surgeon to a scratch - Cascade Cost teaches that the most expensive resource makes sense only for the hardest cases.",
      "realExample": "Imagine that you have a company with 1000 support tickets a day - the classic all-Opus model costs $150/day ($54750/year). Cascade Cost: Haiku H1 and H2 classify in parallel, 700 simple ones get auto-responses (Haiku cost $0.003), 200 medium ones go to Backend Dev (Sonnet $0.025), 100 hard ones land with QA and Opus ($0.036). Daily cost: ~$11.70. Savings: 92 percent, $138.30 per day, over $50000 per year. Final quality untouched because the 100 hard ones still get Opus."
    },
    "test_suite": {
      "tagline": "Three independent QA gates and a Manager with a GO/NO-GO decision - an examination board for code",
      "missionShort": "Testing Suite is a five-layer validation preset with no builders. Three independent QAs (Security, Quality, Performance) audit the artifact in parallel from their own perspectives, the QA Manager aggregates reports, synthesizes severity, and issues the final GO / CONDITIONAL GO / NO-GO decision.",
      "whoIs": "Reach for this preset before an important release, as a CI/CD quality gate, before a compliance audit (SOC2, HIPAA, PCI-DSS), or after a large merge before deploy. Ideal wherever you need three independent voices instead of one and a formal GO/NO-GO decision.",
      "analogy": "This preset is like a university examination board - three reviewers score independently (substance, methodology, originality), the board chair collects votes, the dean approves the result. All three must sign before the student defends.",
      "howItWorks": [
        {
          "label": "Phase 1 - Artifact distribution",
          "desc": "The Orchestrator takes the code/artifact to test and distributes it in parallel to the three QAs. Each gets the SAME artifact with different instructions: Security - OWASP/auth/crypto, Quality - tests/edge cases/standards, Performance - benchmarks/memory/queries."
        },
        {
          "label": "Phase 2 - Parallel testing",
          "desc": "Three QAs work AT THE SAME TIME in silence, zero overlap. QA Security scans against OWASP Top 10. QA Quality verifies logic correctness and test coverage. QA Performance analyzes algorithmic complexity and memory. Each produces a separate report."
        },
        {
          "label": "Phase 3 - Report aggregation",
          "desc": "The QA Manager collects all three reports, merges issues, sorts by severity (CRITICAL/HIGH/MEDIUM/LOW), and applies the decision matrix. CRITICAL in Security - automatic NO-GO. HIGH more than 3 - NO-GO. Only MEDIUM/LOW - CONDITIONAL GO. None - GO."
        },
        {
          "label": "Phase 4 - Decision and report",
          "desc": "The QA Manager issues the final verdict with concrete notes for fixes. GO - release approved. CONDITIONAL GO - release with known issues. NO-GO - block with precise notes on what to fix before re-test."
        }
      ],
      "inputs": [
        "Finished artifact for testing (code, module, deployment package)",
        "Target environment context (prod, staging, compliance requirements)",
        "Business and technical acceptance criteria",
        "Optional baseline for regression testing"
      ],
      "outputs": [
        "QA Security report with OWASP vulnerability list and severity",
        "QA Quality report with test coverage and standards metrics",
        "QA Performance report with performance metrics and bottlenecks",
        "QA Manager synthesis with decision matrix and final verdict",
        "GO / CONDITIONAL GO / NO-GO decision with concrete fix notes"
      ],
      "does": [
        "Audits the artifact from three independent perspectives at once",
        "Catches problems a single QA would miss (security vs quality vs perf)",
        "Cuts time 3x via parallelism instead of sequential running",
        "Applies a formal GO/NO-GO decision matrix",
        "Delivers a full severity report per layer",
        "Protects against CRITICAL security even when quality PASSes",
        "Works as a CI/CD gate before every release",
        "Prioritizes issues (CRITICAL/HIGH/MEDIUM/LOW)"
      ],
      "doesNotDo": [
        "Does not build code - this is a pure validation preset, no builders",
        "Does not fix bugs - only detects and reports them",
        "Does not replace a professional pentest - it's an automated first line",
        "Does not work for simple tasks - cannon on a fly for a bugfix",
        "Does not test in production - validates artifacts pre-deploy",
        "Does not work mid-development - too early, too expensive",
        "Does not handle non-code artifacts (documents, designs)"
      ],
      "antiPatterns": [
        "Sequential QA - security then quality then performance; 3x slower with no benefit",
        "No QA Manager - who makes the GO/NO-GO? Without synthesis the decision is subjective",
        "QA writes code - role confusion; QA ONLY tests and reports",
        "Ignoring LOW - technical debt accumulation; log LOW to the backlog",
        "FAIL = done - block with no fix path; FAIL must carry concrete notes"
      ],
      "keyConcepts": [
        {
          "term": "Triple QA Gate",
          "def": "Architectural pattern of three independent auditors working in parallel on the same artifact."
        },
        {
          "term": "GO/NO-GO decision",
          "def": "Formal gate that must be passed before an artifact reaches production."
        },
        {
          "term": "Severity classification",
          "def": "The CRITICAL/HIGH/MEDIUM/LOW scale that determines which issues block a release and which don't."
        },
        {
          "term": "Parallel aggregation",
          "def": "Parallel audit plus aggregation instead of a sequential chain."
        },
        {
          "term": "Conditional GO",
          "def": "Intermediate decision - release allowed with a list of known issues to address later."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "5"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.50-1.25"
        },
        {
          "label": "Time",
          "value": "3-5 min"
        }
      ],
      "bestFor": [
        "When you have pre-release validation for an important launch",
        "When you're setting up a CI/CD quality gate before every deploy",
        "When you're preparing for a SOC2/HIPAA/PCI-DSS compliance audit"
      ],
      "worstFor": [
        "When you want to build code - this preset only validates, no builders",
        "When you're fixing a bug - use bug_hunt or quick_fix instead",
        "When the task is small - cannon on a fly with pointless cost"
      ],
      "relatedPresets": [
        "security",
        "review",
        "bug_hunt"
      ],
      "glossary": [
        {
          "term": "quality gate",
          "definition": "Formal validation gate in the pipeline that must be passed before the next stage."
        },
        {
          "term": "severity",
          "definition": "Classification of issue weight (CRITICAL/HIGH/MEDIUM/LOW) defining its impact on the release decision."
        },
        {
          "term": "fan-out",
          "definition": "Pattern where one agent sends the same task in parallel to multiple executors."
        },
        {
          "term": "aggregate",
          "definition": "Merging many reports into one coherent verdict by the Manager."
        },
        {
          "term": "CI/CD gate",
          "definition": "Automatic quality check built into the Continuous Integration/Deployment pipeline."
        }
      ],
      "learningQuote": "Three eyes see more than one - Testing Suite introduces a formal GO/NO-GO process where there would otherwise be a single subjective opinion.",
      "realExample": "Imagine that you have a pre-release e-commerce API before production deploy - /orders, /payments, /users, /products. The Orchestrator distributes the code to three QAs in parallel. QA Security detects CRITICAL - plaintext card storage on /payments. QA Quality PASS with 2 MEDIUM. QA Performance HIGH - N+1 on /products. QA Manager: 1 CRITICAL in security = automatic NO-GO. Report: \"Fix plaintext card storage, add AES-256, then re-test\". Cost $0.18, time 4 minutes, worth avoiding a card data leak and lawsuits."
    },
    "a11y": {
      "tagline": "WCAG accessibility sprint - audit, redesign, implementation, validation and compliance docs",
      "missionShort": "Accessibility Sprint is a five-phase pipeline specialized in WCAG 2.1/2.2 AA compliance. UX Researcher audits barriers, Designer builds inclusive solutions, Frontend Dev implements semantic HTML and ARIA, QA Quality runs axe-core and Lighthouse, Writer produces the VPAT and developer guide.",
      "whoIs": "Reach for this preset when you need a WCAG audit before launch, remediation of an existing product, prep for ADA/EAA compliance, an accessibility redesign after an external audit, or mandatory government/public sector compliance. Ideal when the app already has a UI but a11y barriers block users.",
      "analogy": "This preset is like an accessibility building inspection - the inspector finds barriers, the architect designs ramps, the crew installs them, the inspector signs off, and a documentarian writes the compliance report for the authorities.",
      "howItWorks": [
        {
          "label": "Phase 1 - A11y audit",
          "desc": "UX Researcher scans HTML/CSS/JS against WCAG 2.1/2.2. Checks semantic HTML, alt text, contrast ratios (AA 4.5:1, AAA 7:1), keyboard navigation, ARIA labels, screen reader compatibility, and prefers-reduced-motion. Produces a report with violations ranked by severity."
        },
        {
          "label": "Phase 2 - Inclusive redesign",
          "desc": "Designer builds solutions for each violation: a new palette with compliant contrast, focus states, skip navigation, responsive typography in rem/em, icons with text labels, and forms with proper labels and error messages."
        },
        {
          "label": "Phase 3 - Implementation",
          "desc": "Frontend Dev ships the redesign in code: semantic HTML instead of divs, ARIA role/label/describedby/live, CSS focus-visible and high-contrast media queries, JS keyboard event handlers, skip navigation links, and prefers-reduced-motion support."
        },
        {
          "label": "Phase 4 - Tool-based validation",
          "desc": "QA Quality runs axe-core (automated WCAG audit), Lighthouse a11y score (target 95+), pa11y compliance checker, manual keyboard tests, and a contrast checker. Produces a PASS/FAIL report per WCAG criterion."
        },
        {
          "label": "Phase 5 - Compliance documentation",
          "desc": "Writer produces the VPAT (Voluntary Product Accessibility Template), A11y Statement for the site, Developer Guide for future changes, Testing Checklist for QA, and a list of Known Issues with a remediation plan."
        }
      ],
      "inputs": [
        "Source code HTML/CSS/JS of the app or site",
        "Target WCAG level (AA standard, AAA for full compliance)",
        "Compliance requirements (ADA, EAA, Section 508)",
        "Optional external audit report if one already exists"
      ],
      "outputs": [
        "WCAG audit report with violations ranked by severity (Critical/High/Medium)",
        "Redesign spec with new color tokens and components",
        "Updated code with semantic HTML and ARIA",
        "Validation report with Lighthouse score and axe-core verdict",
        "VPAT, A11y Statement, Developer Guide and Testing Checklist"
      ],
      "does": [
        "Audits WCAG 2.1 AA and 2.2 compliance systematically",
        "Designs a fix for every violation found in the audit",
        "Implements semantic HTML and ARIA per W3C specs",
        "Runs axe-core, Lighthouse, and pa11y as automated tooling",
        "Tests keyboard navigation and screen reader flow",
        "Generates VPAT and A11y Statement for compliance reporting",
        "Ships a Developer Guide for future changes",
        "Typically hits a Lighthouse a11y score of 95+"
      ],
      "doesNotDo": [
        "Does not touch the backend - focus is on the presentation layer",
        "Does not implement business logic - only the accessibility layer",
        "Does not run QA Security or Performance (use test_suite)",
        "Does not fit internal tools without a11y requirements",
        "Does not replace testing with real assistive-tech users",
        "Does not translate content into sign language (different scope)",
        "Does not handle apps without a UI layer (e.g. pure APIs)"
      ],
      "antiPatterns": [
        "Skip the audit - Designer starts the redesign without knowing what's broken; redesigning blind",
        "No axe-core/pa11y - manual testing leaves gaps; automated tooling is the baseline",
        "Ignoring keyboard - 15 percent of users don't use a mouse; every component must be tab-tested",
        "A11y as an afterthought - adding accessibility after launch costs 10x more",
        "No docs - regression sneaks in on future changes because devs don't know the standard"
      ],
      "keyConcepts": [
        {
          "term": "WCAG 2.1/2.2",
          "def": "Web Content Accessibility Guidelines - the official W3C accessibility standard."
        },
        {
          "term": "Semantic HTML",
          "def": "Using H1-H6, nav, main, article, aside tags instead of generic divs."
        },
        {
          "term": "ARIA labels",
          "def": "Accessible Rich Internet Applications attributes for screen readers."
        },
        {
          "term": "VPAT",
          "def": "Voluntary Product Accessibility Template - the standard compliance report format."
        },
        {
          "term": "Lighthouse score",
          "def": "Google tool that measures a11y score from 0 to 100 (preset target: 95+)."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "5"
        },
        {
          "label": "Phases",
          "value": "5"
        },
        {
          "label": "Est. cost",
          "value": "$0.60-1.50"
        },
        {
          "label": "Time",
          "value": "3-5 min"
        }
      ],
      "bestFor": [
        "When you're preparing an app for WCAG 2.1 AA compliance",
        "When you got an external audit report and need to fix the barriers",
        "When you serve government/public sector clients with ADA/EAA requirements"
      ],
      "worstFor": [
        "When the app has no UI (pure API or CLI)",
        "When you're building an internal tool for a team without a11y requirements",
        "When you need business logic or backend changes"
      ],
      "relatedPresets": [
        "design_sys",
        "ui_overhaul",
        "feature_sprint"
      ],
      "glossary": [
        {
          "term": "WCAG",
          "definition": "Web Content Accessibility Guidelines - the international digital accessibility standard."
        },
        {
          "term": "ARIA",
          "definition": "Accessible Rich Internet Applications - W3C spec that adds semantics for screen readers."
        },
        {
          "term": "axe-core",
          "definition": "Open source engine for automated WCAG audits, used by Lighthouse and Deque."
        },
        {
          "term": "VPAT",
          "definition": "Voluntary Product Accessibility Template - standard a11y compliance report."
        },
        {
          "term": "contrast ratio",
          "definition": "Luminance ratio between text and background - WCAG AA requires 4.5:1 for body text."
        }
      ],
      "learningQuote": "Accessibility is not a feature, it's a right - Accessibility Sprint treats digital barriers like physical ones that must be removed.",
      "realExample": "Imagine an e-commerce site before launch: UX Researcher scans 4 pages and finds 47 WCAG violations (8 Critical, 15 High, 24 Medium). Designer ships a new palette (contrast 8.2:1), focus rings, skip nav. Frontend Dev applies 47 fixes. QA Quality: axe-core 0 Critical, 0 High, 3 acceptable Medium. Lighthouse goes from 52 to 97. Writer generates the VPAT and Developer Guide. Cost $0.24, 5 minutes, well worth avoiding an ADA lawsuit (average fine $75,000)."
    },
    "review": {
      "tagline": "Build plus separate review - Analyst plans, two builders build, two reviewers audit independently",
      "missionShort": "Code Review is a six-role preset that pairs new feature build with mandatory peer review. Analyst creates the implementation plan, Backend Dev and Frontend Dev build in parallel, then QA Security and QA Quality audit the finished artifact independently. AWS Pull Request pattern with strict separation of writer and reviewer.",
      "whoIs": "Reach for this preset when you have a critical feature that needs peer review, a PR touching security-sensitive code, a compliance-driven change, or any important feature where the author should not validate their own work. Ideal when you need separation of build and review, not just the same people doing both.",
      "analogy": "This preset is like a scientific publication - the author writes the paper, two independent reviewers judge methodology and clarity, and the editor decides accept/revise/reject. The author NEVER reviews themselves.",
      "howItWorks": [
        {
          "label": "Phase 1 - Analysis and plan",
          "desc": "Analyst receives the feature request, breaks it into concrete build tasks, identifies files to change, defines backend vs frontend boundaries, and defines tests. Produces an implementation plan that acts as the contract for builders and the reference for QA."
        },
        {
          "label": "Phase 2 - Parallel build",
          "desc": "Backend Dev and Frontend Dev work SIMULTANEOUSLY from the same plan. Backend builds API/DB/logic/middleware. Frontend builds components/state/API integration/styling. Each owns their slice of the plan and integration tests."
        },
        {
          "label": "Phase 3 - Parallel audit",
          "desc": "QA Security and QA Quality audit the COMBINED artifact at the same time. QA Security scans the NEW code against OWASP Top 5 (Injection, XSS, Broken Access Control, Misconfig, Vulnerable Components). QA Quality verifies conformance with the Analyst's plan and quality metrics."
        },
        {
          "label": "Phase 4 - PASS/REVISE/REJECT decision",
          "desc": "Orchestrator synthesizes both QA reports. PASS - code is merge-ready. REVISE - micro-loop, builders fix without changing the plan. REJECT - macro-loop, Analyst re-plans and the cycle restarts. Max 3 iterations, then escalation."
        }
      ],
      "inputs": [
        "Feature request describing the new functionality",
        "Spec of business and technical requirements",
        "Existing codebase to modify or extend",
        "Acceptance criteria and architectural context (stack, conventions)"
      ],
      "outputs": [
        "Implementation plan from the Analyst with file mapping",
        "Backend artifact with new/modified server code and tests",
        "Frontend artifact with UI code and component tests",
        "QA Security report with OWASP Top 5 audit of the new code",
        "QA Quality report with plan matching and metrics + PASS/REVISE/REJECT verdict"
      ],
      "does": [
        "Separates writer from reviewer (AWS Pattern)",
        "Creates a formal review phase like a Pull Request in a human team",
        "Builds backend and frontend in parallel from one plan",
        "Audits new code (not the whole codebase) like a git diff review",
        "Checks build-vs-plan drift detection",
        "Offers three feedback loop levels (revise/reject/escalation)",
        "Catches security issues in new code before merge",
        "Delivers full traceability from plan to artifact"
      ],
      "doesNotDo": [
        "Does not run a research phase - assumes you know the requirements",
        "Does not fit small changes - too heavy for typo fixes",
        "Does not audit the whole codebase - only new code (diff)",
        "Does not include QA Performance - focus is security and quality",
        "Does not replace a professional code review by a senior",
        "Does not work without a concrete feature request - needs input",
        "Does not do exploration - use recon or reflect for that"
      ],
      "antiPatterns": [
        "Author reviews self - violates the AWS Pattern, no separation",
        "No Analyst - Builders guess the contract, QA has no baseline to validate",
        "Sequential build - Backend waits for Frontend or vice versa; 30-40 percent slower",
        "Full codebase audit - instead of git diff, 10x the cost, 90 percent irrelevant issues",
        "Max iterations exceeded without escalation - Orchestrator must step in after 3 iterations"
      ],
      "keyConcepts": [
        {
          "term": "AWS Pattern",
          "def": "Build and review as separate parallel phases with strict separation of writers and reviewers."
        },
        {
          "term": "Pipeline + Fan-out",
          "def": "Hybrid architecture - linear first (Analyst), then parallel (Builders, then QA)."
        },
        {
          "term": "Micro-loop",
          "def": "REVISE - QA returns notes, Builders fix, same plan, QA re-verifies."
        },
        {
          "term": "Macro-loop",
          "def": "REJECT - QA rejects the plan, Analyst re-plans, Builders start over, QA re-verifies."
        },
        {
          "term": "Plan matching",
          "def": "QA Quality checks that the artifact does exactly what the implementation plan said."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "6"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.05-2.70"
        },
        {
          "label": "Time",
          "value": "4-6 min"
        }
      ],
      "bestFor": [
        "When you have a critical feature that needs mandatory review before merge",
        "When the change touches security-sensitive code (auth, payments, user data)",
        "When you need a compliance audit trail (who built, who reviewed)"
      ],
      "worstFor": [
        "When you're making small changes like typos or copy changes",
        "When you need quick research - no research phase here",
        "When the project is low-risk and review overhead isn't justified"
      ],
      "relatedPresets": [
        "security",
        "test_suite",
        "feature_sprint"
      ],
      "glossary": [
        {
          "term": "pull request",
          "definition": "Formal request to review and merge code changes - the human equivalent of this preset."
        },
        {
          "term": "AWS Pattern",
          "definition": "Amazon Web Services practice that separates builders from reviewers."
        },
        {
          "term": "drift",
          "definition": "Deviation between build and plan - when a builder does something different than the Analyst planned."
        },
        {
          "term": "micro-loop",
          "definition": "Short fix loop without changing the plan - just notes from QA to builders."
        },
        {
          "term": "macro-loop",
          "definition": "Large loop - back to the Analyst for re-planning and a fresh build."
        }
      ],
      "learningQuote": "Who wrote it does not review it - Code Review applies Amazon's golden engineering rule as a structural multi-agent pattern.",
      "realExample": "Imagine a \"email notifications\" feature for a SaaS app - Analyst creates a plan with 7 Backend tasks (EmailService, rate limiter, endpoints) and 5 Frontend tasks (preferences page, toggle, hook). Backend Dev and Frontend Dev build in parallel in 55 and 60 seconds. QA Security finds a MEDIUM - missing validation that the user is modifying THEIR OWN preferences. QA Quality PASS at 82 percent coverage. Orchestrator: PASS with a note \"add middleware verifying req.user.id before production\". 235K tokens, $0.32, 280 seconds, merge-ready."
    },
    "security": {
      "tagline": "Three-tier security audit with GO/NO-GO - OWASP, quality, performance, and a Manager synthesizing verdicts",
      "missionShort": "Security Hardening is a six-role pre-deployment audit preset. Backend Dev hardens the code (validation, sanitization, rate limiting, security headers), then three independent QAs (Security under OWASP Top 10, Quality under code quality, Performance under runtime performance) audit in parallel. QA Manager synthesizes all three reports into a formal GO / CONDITIONAL GO / NO-GO decision.",
      "whoIs": "Reach for this preset when you're running a pre-release security audit, compliance verification (PCI DSS, HIPAA, SOC2), production deployment gate, or prep for an external audit. Ideal anywhere the cost of an incident (IBM 2025 average $4.88M) vastly outweighs the $0.75-1.95 cost of an automated audit.",
      "analogy": "This preset is like a bridge inspection before opening - a structural engineer checks load capacity, a seismic expert checks shock resistance, a safety inspector checks overall risk. The chief inspector issues the permit only when all three say YES. Without everyone's sign-off the bridge does not open.",
      "howItWorks": [
        {
          "label": "Phase 1 - Hardening by Backend Dev",
          "desc": "Orchestrator receives the artifact, Backend Dev hardens the code (does not build new features): adds input validation, output sanitization, rate limiting, security headers (CSP, HSTS, X-Frame-Options), CORS, security logging. Returns a hardened artifact."
        },
        {
          "label": "Phase 2 - Fan-out three-tier audit",
          "desc": "Orchestrator distributes the hardened artifact SIMULTANEOUSLY to three QAs. Q-01 Security scans against OWASP Top 10 (Injection, Broken Access Control, Crypto Failures, Auth, Misconfig, Logging). Q-02 Quality verifies DRY/SOLID/tests/docs. Q-04 Performance analyzes Big-O/N+1/memory/I/O."
        },
        {
          "label": "Phase 3 - Aggregation by QA Manager",
          "desc": "QA Manager (the only agent that sees all three reports) synthesizes them via a decision matrix. CRITICAL in Security = automatic NO-GO. HIGH in any layer = CONDITIONAL GO. Only MEDIUM/LOW = GO with notes. Overriding rule: CRITICAL Security ALWAYS blocks release."
        },
        {
          "label": "Phase 4 - Final decision",
          "desc": "Orchestrator delivers the outcome: GO - full release approved. CONDITIONAL GO - release with a list of known issues and sprint follow-ups. NO-GO - escalation to Backend Dev for specific fixes, then another audit cycle."
        }
      ],
      "inputs": [
        "Finished source code ready to audit (JS/TS/Python/Go/etc.)",
        "Configuration - .env, docker-compose, nginx.conf, Dockerfile",
        "Specs - description of what the code should do (for conformance checks)",
        "Deployment context and compliance requirements (SOC2, GDPR, HIPAA, PCI-DSS)"
      ],
      "outputs": [
        "Hardened artifact after the Backend Dev pass (validation, rate limiting, headers)",
        "QA Security report with OWASP vulnerability list and severity classification",
        "QA Quality report with DRY, SOLID, coverage, cyclomatic complexity metrics",
        "QA Performance report with Big-O, N+1 queries, memory leaks, bottlenecks",
        "QA Manager synthesis and formal GO / CONDITIONAL GO / NO-GO decision"
      ],
      "does": [
        "Audits code from three independent perspectives (security, quality, performance)",
        "Catches 70-85 percent of common pre-deployment vulnerabilities",
        "Maps issues to OWASP Top 10 categories with severity",
        "Applies a formal GO/NO-GO decision matrix",
        "Guarantees CRITICAL security always blocks release",
        "Delivers an audit trail for compliance (SOC2, HIPAA, PCI-DSS)",
        "Hardens code via Backend Dev before QA starts auditing",
        "Iterates fixes until the verdict is GO or CONDITIONAL"
      ],
      "doesNotDo": [
        "Does not replace professional human pentesting",
        "Does not replace manual code review by a senior engineer",
        "Does not catch business logic flaws that need domain context",
        "Does not test in production or run live exploits",
        "Does not auto-fix discovered vulnerabilities (only Backend Dev hardens upfront)",
        "Does not work on feature requests without ready code",
        "Does not perform a full OWASP ASVS audit (that's human pentester scope)"
      ],
      "antiPatterns": [
        "Sequential audit - security then quality then performance; 3x slower with no gain",
        "No QA Manager - three independent reports without synthesis; GO/NO-GO decision becomes subjective",
        "Skipping Backend Dev hardening - audit without prior protection; more issues to fix",
        "Ignoring CRITICAL - attempting release despite a security block; incident risk",
        "No compliance context - audit without SOC2/HIPAA/PCI requirements; report won't match auditor expectations"
      ],
      "keyConcepts": [
        {
          "term": "Fan-out to Aggregate",
          "def": "Pattern where Orchestrator dispatches work to multiple specialists and a Manager aggregates reports into a synthesis."
        },
        {
          "term": "OWASP Top 10",
          "def": "Web application security standard - the ten most common vulnerability categories."
        },
        {
          "term": "GO/NO-GO gate",
          "def": "Formal decision gate that must be passed before an artifact reaches production."
        },
        {
          "term": "Severity matrix",
          "def": "Decision table mapping combinations of severity across three layers to GO/CONDITIONAL/NO-GO."
        },
        {
          "term": "Hardening pass",
          "def": "Initial code strengthening (validation, headers, rate limiting) before the audit begins."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "6"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.75-1.95"
        },
        {
          "label": "Time",
          "value": "3-6 min"
        }
      ],
      "bestFor": [
        "When running a pre-release security audit before production deploy",
        "When preparing for a compliance audit (PCI DSS, HIPAA, SOC2)",
        "When you need a formal GO/NO-GO gate instead of a subjective opinion"
      ],
      "worstFor": [
        "When trying to replace professional pentest - this is the first line, not the only one",
        "When making cosmetic UI changes - too heavy a preset",
        "When the app has no sensitive data and a security audit isn't needed"
      ],
      "relatedPresets": [
        "security_multi_vector",
        "review",
        "test_suite"
      ],
      "glossary": [
        {
          "term": "OWASP",
          "definition": "Open Web Application Security Project - organization that standardizes web security."
        },
        {
          "term": "hardening",
          "definition": "Process of strengthening code by adding validation, sanitization, and security controls."
        },
        {
          "term": "severity",
          "definition": "Classification of vulnerability weight: CRITICAL, HIGH, MEDIUM, LOW."
        },
        {
          "term": "PCI DSS",
          "definition": "Payment Card Industry Data Security Standard - required for apps handling payment cards."
        },
        {
          "term": "fan-out",
          "definition": "Pattern of dispatching one artifact in parallel to multiple auditors."
        }
      ],
      "learningQuote": "Three independent voices and a decision matrix - Security Hardening turns subjective fear of a breach into a structured GO/NO-GO process.",
      "realExample": "Imagine an e-commerce API two weeks before Black Friday - 12 Node/Express files, docker-compose, nginx, .env.production. Backend Dev hardens: input validation, rate limiting, security headers, CORS. Fan-out: QA Security finds HIGH - missing card validation per PCI. QA Quality PASS with MEDIUM on missing JSDoc. QA Performance HIGH - N+1 in /orders. QA Manager: HIGH security plus HIGH performance = CONDITIONAL GO with notes \"fix before Black Friday\". Orchestrator dispatches fixes, re-audit PASS, GO. Cost $0.35, 5 minutes, incident cost avoided."
    },
    "design_sys": {
      "tagline": "Brand book and component library in one pass - tokens, components, Storybook ready to ship",
      "missionShort": "Design System builds a consistent visual language for the app: tokens, palette, typography, components, and docs. Output is a React/Vue library synced with Storybook, ready for reuse across all products. Zero backend, zero business logic.",
      "whoIs": "Product teams and startups who notice every new screen looks different and want to unify the look once and for all. Especially useful at brand launch, rebrand, or when three frontend teams build three different button styles.",
      "analogy": "This preset is like building a brand book for a fashion house - trend researchers (UX + Docs) scan the runway and the docs, the designer draws the collection, the developer sews the finished pieces, and the copywriter writes the styling rules.",
      "howItWorks": [
        {
          "label": "Phase 1: UX + Docs research",
          "desc": "UX Researcher analyzes trends (Material 3, Radix, shadcn, Linear) while Docs Researcher scans framework docs for design tokens, theming APIs, and accessibility constraints."
        },
        {
          "label": "Phase 2: Design tokens + components",
          "desc": "Designer creates the palette, typographic scales, spacing scale, and dark mode tokens. Defines component variants (button sizes, input states, card elevations) as a single source of truth."
        },
        {
          "label": "Phase 3: Frontend implementation",
          "desc": "Frontend Developer ships tokens as CSS custom properties or a theme object, codes React/Vue components on top of Radix/Headless UI, and builds a Storybook with every variant."
        },
        {
          "label": "Phase 4: Docs + guidelines",
          "desc": "Writer produces usage docs: when to use primary vs secondary button, how to compose cards, spacing and typography rules, and when it's OK to break them."
        }
      ],
      "inputs": [
        "Existing app (screenshots) or moodboard for a new brand",
        "Frontend tech stack (React, Vue, Svelte) and preferred base libraries",
        "Branding constraints (brand colors, licensed fonts, logo)",
        "Success criteria (WCAG AA/AAA, dark mode, RTL support, min browser versions)"
      ],
      "outputs": [
        "Design tokens in CSS variables or JSON format (colors, spacing, typography, radii, shadows)",
        "React/Vue component library with full variants and states (hover, focus, disabled)",
        "Storybook with live examples of every component and variant",
        "Usage documentation with DO/DONT examples and composition rules",
        "Accessibility report: contrast, focus indicators, keyboard nav, ARIA compliance"
      ],
      "does": [
        "Creates a consistent visual language from palette down to micro-interactions",
        "Defines tokens as a single source of truth for all products",
        "Builds a component library synced with Storybook",
        "Ships dark mode and accessibility on day one (not as an afterthought)",
        "Writes guidelines with DO/DONT examples for every component",
        "Integrates existing libraries (Radix, Headless UI) instead of reinventing the wheel",
        "Delivers screenshot tests and visual regression (Chromatic) to protect the design from drift",
        "Validates APCA/WCAG contrast and typographic legibility at the token stage"
      ],
      "doesNotDo": [
        "Does not build backend or APIs (that's API Modernization territory)",
        "Does not build business logic or app state",
        "Does not design individual screens (use UI Overhaul or Feature Sprint for that)",
        "Does not ship content management or a CMS",
        "Does not create marketing sites or landing pages",
        "Does not replace ready systems like Material UI or Ant Design when they're enough",
        "Does not do product copywriting (only system documentation)"
      ],
      "antiPatterns": [
        "Color Copy Paste - duplicating hex values across the app instead of referencing tokens",
        "One-Off Component - building a new button for every screen instead of a variant",
        "Storybook Graveyard - Storybook built for a one-time demo, then never updated",
        "Design Token Overload - 400 colors in the palette instead of the 12 anyone can remember",
        "Frankensystem - mixing Material UI, Chakra, and custom components without a shared philosophy"
      ],
      "keyConcepts": [
        {
          "term": "Design tokens",
          "def": "Named, reusable values (color, spacing, radius) expressed as variables."
        },
        {
          "term": "Storybook",
          "def": "Environment for isolated development and documentation of UI components with live examples."
        },
        {
          "term": "Headless components",
          "def": "Libraries like Radix that deliver logic and accessibility without imposed styles."
        },
        {
          "term": "Visual regression",
          "def": "Automated component screenshots compared between commits to catch unwanted changes."
        },
        {
          "term": "Theming API",
          "def": "Mechanism to swap themes (light/dark, brand A/B) without rewriting components."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "6"
        },
        {
          "label": "Phases",
          "value": "3"
        },
        {
          "label": "Est. cost",
          "value": "$0.85-2.15"
        },
        {
          "label": "Time",
          "value": "8-14 min"
        }
      ],
      "bestFor": [
        "When a new brand or rebrand needs a consistent visual language from the first screen",
        "When multiple frontend teams ship divergent styles and you want to unify them",
        "When you need a reusable component library for multiple products"
      ],
      "worstFor": [
        "When the project needs business logic or backend (those roles aren't on the team)",
        "When stock Material UI or shadcn is enough without customization",
        "When you have only one screen to polish (too much overhead for a single view)"
      ],
      "relatedPresets": [
        "ui_overhaul",
        "api_modern",
        "a11y"
      ],
      "glossary": [
        {
          "term": "token",
          "definition": "Semantic design variable (color-primary, spacing-md) referenced by components."
        },
        {
          "term": "variant",
          "definition": "Alternate form of a component (button primary vs secondary, size sm vs lg)."
        },
        {
          "term": "dark mode",
          "definition": "Alternate theme with dark backgrounds and light text, toggled by system preference."
        },
        {
          "term": "APCA",
          "definition": "Accessible Perceptual Contrast Algorithm - newer contrast calculation for WCAG 3."
        },
        {
          "term": "headless UI",
          "definition": "Component that provides logic and a11y but leaves styling to the user."
        }
      ],
      "learningQuote": "A design system isn't a collection of components - it's a contract that makes every new screen look like one hand drew it.",
      "realExample": "Imagine a SaaS startup that added screens ad-hoc for two years. Three different \"save\" buttons, four shades of blue, six heading sizes. A new designer spends half their time asking \"which button do I use?\". This preset, in one pass, creates tokens, components, and Storybook - after adoption every new screen starts looking like it came from a single book."
    },
    "api_modern": {
      "tagline": "Modernizing the app's engine without touching the UI - versioning, contracts, and backward compatibility",
      "missionShort": "API Modernization evolves a legacy API without touching the frontend: introduces versioning, migrates from REST to GraphQL, adds pagination, authorization, and idempotency. Output is new contracts and integrators guaranteeing that old clients keep working while new ones get a better interface.",
      "whoIs": "Backend teams with a working API that's starting to block growth: no versioning, no pagination, mixed styles, chaotic field names. Especially useful when you need to ship GraphQL alongside REST without breaking partner integrations.",
      "analogy": "This preset is like replacing plumbing in a building while residents still live there - pipes and cables (the API) get modernized quietly, while residents (frontend, mobile, partners) still see the same walls and light switches.",
      "howItWorks": [
        {
          "label": "Phase 1: Existing API analysis",
          "desc": "Analyst maps all endpoints, formats, authentication, pagination, and identifies hidden contracts (what partners actually consume vs what's in the docs)."
        },
        {
          "label": "Phase 2: Pattern research",
          "desc": "Tech Researcher checks modern standards: OpenAPI 3.1, JSON:API, GraphQL, cursor pagination, idempotency keys, rate limiting, plus migration patterns like versioned URLs or header-based versioning."
        },
        {
          "label": "Phase 3: Build + integration",
          "desc": "Backend Developer writes new endpoints or GraphQL resolvers, Integrator builds the compatibility layer (adapter from v1 to v2) so old clients keep working without changes."
        },
        {
          "label": "Phase 4: Contract QA",
          "desc": "QA Quality tests full compatibility: contracts (Pact), performance (response time), regression (do old clients still get identical responses?), header versioning."
        }
      ],
      "inputs": [
        "Existing API with documentation (OpenAPI spec, Postman collection, or code)",
        "List of known consumers (frontend, mobile, partners, webhooks)",
        "Migration goal (REST to GraphQL, v1 to v2, adding pagination)",
        "Compatibility constraints (how long to keep the old version, SLA)"
      ],
      "outputs": [
        "New contract (OpenAPI 3.1 or GraphQL schema) with versioning",
        "Endpoint or resolver implementation matching the new contract",
        "Compatibility layer (adapter v1 to v2) for old clients",
        "Migration guide for API consumers with before and after examples",
        "Contract tests (Pact or Dredd) protecting against contract regression"
      ],
      "does": [
        "Introduces API versioning (URL, header, or GraphQL schema evolution)",
        "Migrates between styles (REST to GraphQL, RPC to REST)",
        "Adds modern pagination (cursor-based instead of offset)",
        "Ships idempotency keys for write operations",
        "Builds a compatibility layer so old clients keep working",
        "Updates authorization (OAuth 2.1, JWT, API keys) without killing existing tokens",
        "Writes contract tests protecting against unwanted breaking changes"
      ],
      "doesNotDo": [
        "Does not design user interfaces or visual styling (no Designer or FE)",
        "Does not add new business features (that's Feature Sprint territory)",
        "Does not do full database rebuilds (only adapters over the existing schema)",
        "Does not touch client frontend logic - only delivers a compatible API",
        "Does not create partner SDKs (that's a separate pipeline)",
        "Does not replace security pentests (that's Security Hardening territory)",
        "Does not migrate infrastructure (AWS, Kubernetes) - only the app layer"
      ],
      "antiPatterns": [
        "Big Bang Migration - killing v1 the same day v2 ships and breaking every client",
        "Silent Breaking Change - changing response format without versioning or alerting consumers",
        "Double Maintenance Hell - keeping v1 and v2 alive in parallel for 3 years with no exit plan",
        "Pagination Bait - introducing a limit of 100 results without doc notice, clients lose data",
        "GraphQL Cargo Cult - shipping GraphQL only because it's trendy, without real need"
      ],
      "keyConcepts": [
        {
          "term": "Contract versioning",
          "def": "Mechanism for multiple API versions to coexist (URL, header, field)."
        },
        {
          "term": "Backward compatibility",
          "def": "Guarantee that old clients keep working after a new version ships."
        },
        {
          "term": "Cursor pagination",
          "def": "Pagination based on a stable key instead of offset, robust against inserts."
        },
        {
          "term": "Idempotency key",
          "def": "Identifier that lets you safely retry a POST request without duplicating the effect."
        },
        {
          "term": "Contract test",
          "def": "Test that compares the API producer's contract against consumer expectations."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "6"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.95-2.35"
        },
        {
          "label": "Time",
          "value": "10-16 min"
        }
      ],
      "bestFor": [
        "When a legacy API is choking growth and versioning is missing",
        "When you're migrating REST to GraphQL and partners still need the old endpoints",
        "When you need to add pagination, authorization, or idempotency without touching the frontend"
      ],
      "worstFor": [
        "When the project needs visual or UX changes (no designer)",
        "When there's no existing API - this preset is for evolution, not greenfield",
        "When you need a new client-facing business feature (use Feature Sprint)"
      ],
      "relatedPresets": [
        "design_sys",
        "feature_sprint",
        "legacy"
      ],
      "glossary": [
        {
          "term": "OpenAPI",
          "definition": "REST API description standard (YAML/JSON) enabling auto-generation of clients and docs."
        },
        {
          "term": "GraphQL",
          "definition": "Query language with a typed schema that lets the client declare exactly which fields it needs."
        },
        {
          "term": "deprecation",
          "definition": "Marking a field or endpoint as obsolete in advance before removal."
        },
        {
          "term": "Pact",
          "definition": "Framework for consumer-driven contract testing that prevents breaking integrations."
        },
        {
          "term": "versioning",
          "definition": "Strategy for keeping multiple API versions in parallel (URL, header, field)."
        }
      ],
      "learningQuote": "A good API changes without stopping its consumers - a bad preset breaks every integration on a Friday night.",
      "realExample": "Imagine a SaaS app with a five-year-old REST API: offset pagination, no versions, fields alternating snake_case and camelCase. The mobile app gets duplicates while paging, and a partner integration sometimes drops records. This preset analyzes, designs v2 with cursor pagination, ships a v1 adapter, writes contract tests, and delivers a migration guide - zero downtime, zero broken clients."
    },
    "ui_overhaul": {
      "tagline": "Refreshing the product's look without touching the backend - new styles, animations, and micro-interactions",
      "missionShort": "UI Overhaul redesigns an existing app interface: new typography, new palette, modern components, micro-interactions, and dark mode. Backend stays untouched, and users see a product that changed like an apartment after renovation. 7 agents with dual UX+Docs research for full coverage of trends and constraints.",
      "whoIs": "Teams with a working product that looks dated and loses conversions or customers because of it. Ideal when a SaaS works technically fine but the UI looks like 2016 and new users bounce off the landing page.",
      "analogy": "This preset is like a full apartment renovation where the load-bearing walls stay in place - the interior architect researches trends, checks what can move and what can't, designs the new style, and the crew replaces floors, paint, and lighting without knocking down walls.",
      "howItWorks": [
        {
          "label": "Phase 1: Dual UX + Docs research",
          "desc": "UX Researcher scans design patterns (Linear, Vercel, Arc, Notion) and 2026 trends. Docs Researcher in parallel checks framework constraints, accessibility, and browser support requirements."
        },
        {
          "label": "Phase 2: Existing UI analysis",
          "desc": "Analyst inventories all screens, components, and states, mapping which parts can safely change and which need backend coordination (e.g. changing pagination API)."
        },
        {
          "label": "Phase 3: Design + implementation",
          "desc": "Designer builds the new visual system (colors, typography, spacing, dark mode), and Frontend Developer in parallel ships it as a refactor of existing components, keeping the same props and component API."
        },
        {
          "label": "Phase 4: Visual and a11y QA",
          "desc": "QA Quality runs visual regression tests, checks contrast, animations on low-end devices, dark mode, responsive breakpoints, and WCAG 2.2 AA compliance."
        }
      ],
      "inputs": [
        "Existing app (screenshots, URL, repo access)",
        "Moodboard or design references (Linear, Vercel, competitors)",
        "Constraints (branding, browser support, performance budget)",
        "Success criteria (conversion, NPS, modernity, dark mode)"
      ],
      "outputs": [
        "New design system implemented in the existing repo",
        "Component refactor preserving backward compatibility of component API",
        "Dark mode with automatic system preference detection",
        "Micro-interactions and animations respecting prefers-reduced-motion",
        "Visual regression suite protecting against unwanted changes"
      ],
      "does": [
        "Refreshes colors, typography, spacing, and visual hierarchy",
        "Ships dark mode and themes from day one",
        "Adds micro-interactions and animations where they make sense",
        "Refactors components without changing their API (drop-in replace)",
        "Validates contrast, focus indicators, and keyboard navigation",
        "Optimizes bundle size for new CSS and assets",
        "Writes visual regression tests protecting the new look",
        "Integrates UX research with technical framework constraints"
      ],
      "doesNotDo": [
        "Does not change the backend, API, or data model",
        "Does not add new business features (only existing ones in a new form)",
        "Does not design from scratch if there's no existing product (use Feature Sprint)",
        "Does not build a full design system as a library (use Design System)",
        "Does not replace user research (interviews, usability tests)",
        "Does not migrate the framework (React to Svelte) - only the look in the current stack",
        "Does not do copywriting or strategic rebranding"
      ],
      "antiPatterns": [
        "Lipstick on a Pig - changing colors without fixing the information architecture that was the actual problem",
        "Trend Chasing - shipping glassmorphism only because it's trendy, without matching the brand",
        "Animation Overload - animating every element until the page becomes painful for epileptic users",
        "Dark Mode Half-Baked - dark mode built for main screens only, rest stays white",
        "Component API Break - a refactor that forces product teams to rewrite every usage site"
      ],
      "keyConcepts": [
        {
          "term": "Visual regression",
          "def": "Automated comparison of component screenshots between versions to detect changes."
        },
        {
          "term": "prefers-reduced-motion",
          "def": "System preference that lets the user disable animations, every redesign must honor it."
        },
        {
          "term": "Drop-in replace",
          "def": "Refactor that needs no changes at usage sites - new component has the same API as the old one."
        },
        {
          "term": "Micro-interaction",
          "def": "Small animation signaling response to a user action (hover, click, state change)."
        },
        {
          "term": "APCA contrast",
          "def": "Modern color contrast algorithm (WCAG 3 draft) more accurate than old WCAG 2.1 ratios."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "7"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.95-2.35"
        },
        {
          "label": "Time",
          "value": "10-18 min"
        }
      ],
      "bestFor": [
        "When a product works technically fine but looks dated and is losing users",
        "When you want to add dark mode and modern micro-interactions to an existing app",
        "When you have an existing React/Vue stack and don't want to migrate it, just refresh the look"
      ],
      "worstFor": [
        "When the project needs backend changes or new business features",
        "When you're starting from scratch with no existing UI (use Feature Sprint or Startup MVP)",
        "When you need a full reusable component library (use Design System)"
      ],
      "relatedPresets": [
        "design_sys",
        "feature_sprint",
        "a11y"
      ],
      "glossary": [
        {
          "term": "redesign",
          "definition": "Rebuilding the look of an existing interface while preserving its functionality."
        },
        {
          "term": "dark mode",
          "definition": "Alternate theme with dark backgrounds, toggled automatically or manually."
        },
        {
          "term": "easing",
          "definition": "Animation timing curve defining how an element accelerates and decelerates."
        },
        {
          "term": "focus-visible",
          "definition": "CSS selector showing the focus ring only when the user navigates by keyboard."
        },
        {
          "term": "scroll-snap",
          "definition": "CSS mechanism that stops scroll at specific points for carousels and full-screen sections."
        }
      ],
      "learningQuote": "Redesign isn't about changing colors - it's about the product feeling like someone touched it recently with love.",
      "realExample": "Imagine a five-year-old project management SaaS. Features are good, customers pay, but new users say \"looks like Trac\". This preset runs dual research (2026 trends + React constraints), designs a new system, ships dark mode, adds scroll animations on the task list - within a week NPS rises by 12 points and demo sales go up 20 percent without a single backend change."
    },
    "feature_sprint": {
      "tagline": "Full cycle from idea to shipping a new feature - analysis, research, backend, frontend, tests",
      "missionShort": "Feature Sprint delivers a new feature end-to-end: requirements analysis, tech and UX research, parallel backend and frontend implementation, and QA before release. Ideal when you have a clearly defined feature request and want to ship it without chaos.",
      "whoIs": "Product managers and tech leads who have a specific idea for a new feature (e.g. \"comments on documents\" or \"CSV export\") and want a ready, tested, flag-gated feature in a single run. Not for rebrands or refactoring.",
      "analogy": "This preset is like building a new room in an existing house - check if the foundations can take it, design the layout, install the systems (backend), finish the interior (frontend), and finally pass the inspection (QA).",
      "howItWorks": [
        {
          "label": "Phase 1: Requirements analysis",
          "desc": "The Analyst decomposes the feature request into concrete user stories, defines edge cases, identifies dependencies on the existing system, and sizes the work."
        },
        {
          "label": "Phase 2: Dual Tech + UX research",
          "desc": "Two researchers run in parallel: Tech investigates implementation options (libraries, patterns, tradeoffs) and UX checks how competitors and design patterns handle similar scenarios."
        },
        {
          "label": "Phase 3: Parallel backend + frontend build",
          "desc": "Backend Developer builds the API and data models, Frontend Developer implements the UI in parallel. They coordinate through API contracts defined in Phase 2."
        },
        {
          "label": "Phase 4: QA and feature flag",
          "desc": "QA Quality tests manually and automatically, checks for regressions, measures performance. The feature ships behind a flag, allowing gradual rollout."
        }
      ],
      "inputs": [
        "Feature request or user story (what it does, for whom, why)",
        "Constraints (deadline, tech stack, dependencies)",
        "Existing codebase access (so the new feature matches conventions)",
        "Success criteria (conversion, performance, adoption metrics)"
      ],
      "outputs": [
        "Backend implementation (API, data models, DB migrations)",
        "Frontend implementation (components, state, API integration)",
        "Automated tests (unit, integration, critical-path e2e)",
        "Feature flag enabling gradual rollout and rollback",
        "User and developer docs (how to use and how to extend)"
      ],
      "does": [
        "Decomposes vague feature requests into concrete user stories",
        "Researches current tech and UX patterns before writing code",
        "Builds backend and frontend in parallel (compresses time)",
        "Writes tests for critical user paths",
        "Ships a feature flag to enable gradual rollout",
        "Documents API and interactions for the dev team",
        "Validates consistency with existing code and design conventions",
        "Captures baseline metrics before release for later comparison"
      ],
      "doesNotDo": [
        "Does not do full visual redesign (use UI Overhaul)",
        "Does not build a design system from scratch (use Design System)",
        "Does not fix bugs in existing code (use Bug Hunter or Quick Fix)",
        "Does not refactor an entire module (use Legacy Refactor)",
        "Does not run deep 6-source research (use Research Swarm)",
        "Does not run adversarial architecture debate (use Five Minds)",
        "Does not work without a clearly defined feature request"
      ],
      "antiPatterns": [
        "Scope Creep - demanding a half-rebrand mid-feature",
        "Copy From Competitor - blindly copying a competitor UI without understanding context",
        "Skip the QA - shipping to prod without feature flag or tests",
        "Ghost Feature - launching without baseline metrics, you never learn if it helped",
        "Backend First Blocker - waiting a month for backend to finish before frontend starts"
      ],
      "keyConcepts": [
        {
          "term": "Feature flag",
          "def": "Runtime toggle that enables or disables a feature without deployment, enabling gradual rollout."
        },
        {
          "term": "User story",
          "def": "Requirement format: as a [role] I want [action] so that [business goal]."
        },
        {
          "term": "Canary release",
          "def": "Shipping a new feature to a small percentage of users before full rollout."
        },
        {
          "term": "Contract-first",
          "def": "Approach where BE and FE agree on the API before implementation starts."
        },
        {
          "term": "Baseline metrics",
          "def": "KPI measurements before release, used to compare the effect after launch."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "7"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.10-2.70"
        },
        {
          "label": "Time",
          "value": "12-20 min"
        }
      ],
      "bestFor": [
        "When you have a clearly defined feature request and want to ship it end-to-end",
        "When a new feature needs both backend and frontend",
        "When you want a feature flag for safe gradual rollout"
      ],
      "worstFor": [
        "When it's just a visual refresh (use UI Overhaul)",
        "When it's an urgent bugfix without a new feature (use Quick Fix or Bug Hunter)",
        "When you don't yet have a clear idea what to build (use Research Swarm or Recon)"
      ],
      "relatedPresets": [
        "standard",
        "ui_overhaul",
        "plan_exec"
      ],
      "glossary": [
        {
          "term": "user story",
          "definition": "Requirement written as a narrative about the user, their goal, and the context."
        },
        {
          "term": "feature flag",
          "definition": "A switch in code that enables a feature only for selected users."
        },
        {
          "term": "contract",
          "definition": "Formal API spec agreed between BE and FE before implementation."
        },
        {
          "term": "rollout",
          "definition": "The process of gradually releasing a new feature to successive user groups."
        },
        {
          "term": "regression",
          "definition": "Breaking a previously working feature by introducing a new change."
        }
      ],
      "learningQuote": "A good feature sprint is one users never notice - something just shows up that wasn't there yesterday, and it works.",
      "realExample": "Imagine a task management SaaS: the PM says \"let's add comments on cards\". This preset decomposes it into mentions, notifications, edits, deletes, researches how Linear and Notion handle similar things, builds API and component in parallel, ships behind a feature flag to 10% of users, and measures engagement - a week later 28% of cards have at least one comment and the decision to roll out fully is obvious."
    },
    "standard": {
      "tagline": "Universal 8-agent team - the safe default for 70% of typical web and SaaS projects",
      "missionShort": "Standard Dev delivers the full cycle from planning through research and implementation to QA for typical web projects. 8 agents in a hierarchical pipeline: orchestrator, analyst, planner, researcher, backend, frontend, and two testers. The statistical sweet spot for most SaaS and web app tasks.",
      "whoIs": "Teams and freelancers who don't want to agonize over preset choice - Standard is the safe default that covers most real needs. Ideal for admin panels, dashboards, CRUD apps, and mid-sized SaaS features.",
      "analogy": "This preset is like an architecture firm putting up an office building - the director coordinates, the analyst gathers requirements, the planner draws the schedule, researchers check materials, the construction crew (BE+FE) executes, and the safety inspector signs off.",
      "howItWorks": [
        {
          "label": "Phase 1: Strategy + analysis",
          "desc": "The Orchestrator decomposes the problem into phases, the Analyst analyzes requirements and identifies risks, and the Planner creates a task schedule with ordering and dependencies."
        },
        {
          "label": "Phase 2: Technical research",
          "desc": "Tech Researcher checks current patterns, libraries, and tech choices for the planned work, delivering stack recommendations before any coding begins."
        },
        {
          "label": "Phase 3: Parallel BE + FE build",
          "desc": "Backend Developer builds APIs, models, and migrations, while Frontend Developer implements the UI in parallel. Both coordinate through the API contract defined during planning."
        },
        {
          "label": "Phase 4: Dual QA",
          "desc": "QA Quality tests functionality and integrations, QA Security checks basic attack vectors (input validation, auth, XSS). Both tracks run in parallel before release."
        }
      ],
      "inputs": [
        "Project description or feature set with overall scope",
        "Tech stack (or left open for research to recommend)",
        "Constraints (budget, deadline, compliance requirements)",
        "Success criteria (how many users, which metrics, performance)"
      ],
      "outputs": [
        "Project plan with phases, tasks, and dependencies",
        "Research report with stack and library recommendations",
        "Backend implementation (API, models, tests)",
        "Frontend implementation (components, state, integration)",
        "QA reports (quality + security) with findings lists"
      ],
      "does": [
        "Covers the full cycle from planning to tests in a single run",
        "Analyzes requirements and decomposes large tasks into smaller ones",
        "Creates a schedule and task ordering with dependencies",
        "Runs tech research before writing any code",
        "Implements backend and frontend in parallel to save time",
        "Checks quality and basic security before release",
        "Works as the safe default when you don't know which preset to pick",
        "Scales from a mid-sized feature to an entire app module"
      ],
      "doesNotDo": [
        "Does not run deep 6-source research (use Research Swarm)",
        "Does not replace a dedicated security audit (use Security Hardening)",
        "Does not include a designer (use SaaS or UI Overhaul for design-heavy projects)",
        "Does not fully decompose a monolith (use Microservices)",
        "Does not run expert debate on architecture (use Five Minds)",
        "Is not the optimal choice for simple bugfixes (too much overhead)",
        "Does not fit purely research tasks without implementation (use Research)"
      ],
      "antiPatterns": [
        "Overkill Default - using Standard for typos and one-liners (80% overhead)",
        "Skipping Plan - skipping the planning phase and jumping straight to code",
        "Research Overload - running a week of research for a simple feature",
        "QA Theater - testers green-lighting everything without real testing",
        "Scope Bloat - adding new requirements mid-run, the pipeline loses its footing"
      ],
      "keyConcepts": [
        {
          "term": "Hierarchical pipeline",
          "def": "Pattern where the orchestrator delegates to layers (strategy, research, build, QA)."
        },
        {
          "term": "Dual QA",
          "def": "Two independent testers (quality and security) check the output in parallel."
        },
        {
          "term": "Statistical sweet spot",
          "def": "8 agents cover ~70% of typical tasks without excess or shortage."
        },
        {
          "term": "Contract-first",
          "def": "The plan requires defining the API before backend and frontend start coding."
        },
        {
          "term": "Default preset",
          "def": "The safe choice when you don't know which specialized preset fits."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "8"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.25-3.10"
        },
        {
          "label": "Time",
          "value": "14-22 min"
        }
      ],
      "bestFor": [
        "When you don't know which preset to pick - this is the default safe bet",
        "When you're building a typical web app or SaaS feature with BE and FE",
        "When the project needs planning, research, and dual QA but isn't enterprise-critical"
      ],
      "worstFor": [
        "When the task is a simple bugfix (too much overhead, use Quick Fix)",
        "When you need specialized multi-source research (use Research Swarm)",
        "When the project needs a designer or legacy refactor (use SaaS or Legacy)"
      ],
      "relatedPresets": [
        "saas",
        "feature_sprint",
        "plan_exec"
      ],
      "glossary": [
        {
          "term": "pipeline",
          "definition": "Sequential flow of tasks between specialized agents."
        },
        {
          "term": "orchestrator",
          "definition": "The main agent that delegates tasks and coordinates team work."
        },
        {
          "term": "CRUD",
          "definition": "Create Read Update Delete - the basic operations on resources."
        },
        {
          "term": "QA gate",
          "definition": "A pre-release gate that code cannot pass without a positive verdict from testers."
        },
        {
          "term": "default preset",
          "definition": "The system recommendation when the user has no specific requirements."
        }
      ],
      "learningQuote": "Standard isn't mediocrity - it's the proof that 8 specialized roles cover 70% of real tasks better than a lone genius.",
      "realExample": "Imagine a PM who needs to build an admin panel for managing users in their SaaS: list, filters, export, role editing. They don't know if it needs research, how many devs, what testing. They pick Standard - in 20 minutes they get a plan, a justified stack choice, a shipped BE+FE, and a dual QA report. The panel lands on staging without surprises."
    },
    "data_pipe": {
      "tagline": "ETL and data warehouse team - ingest, clean, transform, store, integrate",
      "missionShort": "Data Pipeline builds a data processing pipeline: from ingestion through cleaning and transformation to warehouse storage and integration with analytics tools. 8 agents with Feature Dev instead of Frontend, because specialization is in ETL libraries (dbt, Airflow, Spark, Kafka) rather than UI.",
      "whoIs": "Data engineering teams that need to move data between systems, build warehouses for analytics or reporting. Ideal when you have multiple data sources (CRM, analytics, database) and want one source of truth for business stakeholders.",
      "analogy": "This preset is like an oil refinery - raw material (raw data) gets analyzed, distilled, transformed into various products (tables, marts), blended (joins), and put through quality control before it reaches the market (BI dashboards).",
      "howItWorks": [
        {
          "label": "Phase 1: Planning + source research",
          "desc": "The Planner and Analyst map all data sources (databases, APIs, files, streams), their format, volume, and update frequency. Tech Researcher evaluates ETL tool choices (dbt vs Airflow vs Fivetran)."
        },
        {
          "label": "Phase 2: Backend ingest",
          "desc": "Backend Developer builds connectors to sources: API extractors (REST, webhooks), database readers, file watchers, Kafka consumers. Writes raw data to a staging area."
        },
        {
          "label": "Phase 3: Feature Dev transform",
          "desc": "Feature Dev (specialized in data libraries) writes transformations: SQL in dbt, Python in pandas, cleansing, deduplication, enrichment. Builds marts and dimensional models."
        },
        {
          "label": "Phase 4: Integration + QA",
          "desc": "The Integrator connects the pipeline to BI tools (Looker, Metabase, Tableau) and alerting. QA Quality validates the data (schema tests, freshness, null checks) and writes data quality gates."
        }
      ],
      "inputs": [
        "List of data sources (databases, APIs, files, streams) with access",
        "Target warehouse (BigQuery, Snowflake, Postgres, Redshift)",
        "Business requirements (which metrics, update frequency, history)",
        "Constraints (freshness SLA, GDPR, warehouse cost)"
      ],
      "outputs": [
        "Connectors and extractors for each data source",
        "Transformation models (dbt projects, SQL, Python scripts)",
        "Dimensional model in the warehouse ready for analytics",
        "Data quality tests and alerting on breakages",
        "Lineage documentation (how data flows from sources to dashboards)"
      ],
      "does": [
        "Maps data sources and picks the optimal ETL stack",
        "Builds extractors from APIs, databases, and streams",
        "Writes transformations that clean, enrich, and deduplicate data",
        "Creates dimensional models (facts, dimensions) in the warehouse",
        "Validates data quality (schema, freshness, null rate, duplicates)",
        "Integrates the pipeline with BI tools and alerting",
        "Documents lineage from source to dashboard for auditability",
        "Optimizes warehouse costs via partitioning and incremental loads"
      ],
      "doesNotDo": [
        "Does not build a web app frontend (no such role on the team)",
        "Does not train ML models (that's a different pipeline)",
        "Does not analyze data statistically (use Data Analysis Pipeline)",
        "Does not replace a dedicated SaaS platform like Fivetran for typical sources",
        "Does not do one-off ad-hoc reports (too much overhead)",
        "Does not manage cloud infrastructure (application pipeline only)",
        "Does not build real-time streaming (that needs a Kafka/Flink stack)"
      ],
      "antiPatterns": [
        "God Table - dumping everything into one 300-column table with no dimensional model",
        "No Idempotency - a pipeline that creates duplicates on retry instead of upserting",
        "Silent Drift - no schema tests, a new field in the source silently breaks a downstream report",
        "SELECT STAR - transformations pulling every column from raw tables without a filter",
        "Midnight ETL - all pipelines running at midnight with no orchestration, one crash takes everything down"
      ],
      "keyConcepts": [
        {
          "term": "Dimensional model",
          "def": "Warehouse structure: facts (measurements) and dimensions (context) for fast analytical queries."
        },
        {
          "term": "Idempotency",
          "def": "A pipeline property that guarantees multiple runs yield the same result."
        },
        {
          "term": "Data lineage",
          "def": "A dependency graph showing how data flows from source to dashboard."
        },
        {
          "term": "Schema test",
          "def": "A test that validates data structure (columns, types, null rate) before downstream transformation."
        },
        {
          "term": "Incremental load",
          "def": "Loading strategy that only ingests new or changed records instead of a full refresh."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "8"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.30-3.20"
        },
        {
          "label": "Time",
          "value": "14-22 min"
        }
      ],
      "bestFor": [
        "When you're building a data warehouse or data mart for analytics",
        "When you have many data sources to consolidate into one source of truth",
        "When you need a reliable ETL pipeline with quality gates"
      ],
      "worstFor": [
        "When the project needs a frontend or UI (no such role)",
        "When it's a one-off ad-hoc analysis (use Data Analysis Pipeline)",
        "When you're building real-time streaming with millisecond SLA (different stack)"
      ],
      "relatedPresets": [
        "data_analysis_pipe",
        "standard",
        "kb_constructor"
      ],
      "glossary": [
        {
          "term": "ETL",
          "definition": "Extract Transform Load - the classic data processing pipeline pattern."
        },
        {
          "term": "ELT",
          "definition": "Extract Load Transform - a variant where transformation happens inside the warehouse (modern pattern)."
        },
        {
          "term": "dbt",
          "definition": "Data Build Tool - a SQL-based transformation framework with tests and documentation."
        },
        {
          "term": "warehouse",
          "definition": "A specialized analytical database (BigQuery, Snowflake, Redshift)."
        },
        {
          "term": "CDC",
          "definition": "Change Data Capture - a technique for propagating changes from an operational database to a warehouse."
        }
      ],
      "learningQuote": "A good data pipeline is one the analyst never sees - they just open the dashboard and see the truth.",
      "realExample": "Imagine an e-commerce company with data scattered across Shopify, Stripe, Google Analytics, and Mailchimp. The CFO asks \"how much did we make last quarter after refunds and acquisition costs?\" - and nobody can answer quickly. This preset builds a pipeline that pulls data from every source hourly, cleans it, computes unified metrics, and loads it into BigQuery. On Friday evening the CFO looks at Looker and gets the answer in 3 seconds."
    },
    "research": {
      "tagline": "Six independent researchers, a critic, and a synthesizer - maximum research depth without implementation",
      "missionShort": "Research Swarm delivers comprehensive research reports built on six parallel sources: Tech docs, UX trends, Reddit, X/Twitter, GitHub, and forums. Research Critic validates methodology and catches contradictions, and the Synthesizer produces MANIFEST.md - a single document with recommendations and rationale. Zero implementation, pure knowledge.",
      "whoIs": "Decision makers and tech leads facing an irreversible choice (framework, architecture, vendor) who need multi-source ground truth. Ideal when the decision will matter for years and you can afford 20 minutes of research instead of three months of regret.",
      "analogy": "This preset is like a criminal investigation with six detectives - each examines a different angle (witnesses, video, finances, phones, forum, documents) independently, the prosecutor (Critic) validates the evidence, and the judge (Synthesizer) writes the verdict with full reasoning.",
      "howItWorks": [
        {
          "label": "Phase 1: Fan-out to six researchers",
          "desc": "The Orchestrator broadcasts the research question to six parallel researchers (Tech, UX, Reddit, X, GitHub, Forums); each works in isolation with no communication to avoid groupthink."
        },
        {
          "label": "Phase 2: Research in six streams",
          "desc": "Tech reads documentation, UX analyzes design patterns, Reddit surfaces unfiltered opinions, X surfaces trends, GitHub investigates code and Issues, Forums mines technical discussions. Each produces a structured report."
        },
        {
          "label": "Phase 3: Critic validates methodology",
          "desc": "Research Critic scores each report on a five-dimension rubric (methodology, coverage, bias, confidence, gaps), flags contradictions between sources, and sends weak reports back for revision."
        },
        {
          "label": "Phase 4: Synthesis into MANIFEST.md",
          "desc": "The Synthesizer merges six validated reports into a single MANIFEST.md: executive summary, scored findings, contradiction map, cross-functional insights, gap analysis, and concrete recommendations with rationale."
        }
      ],
      "inputs": [
        "A clearly defined research question (e.g. \"which multi-agent AI framework for an enterprise chatbot\")",
        "Context and constraints (stack, budget, deadline, compliance)",
        "Evaluation criteria (what you consider a successful recommendation)",
        "Decision timeline (when you need the answer)"
      ],
      "outputs": [
        "MANIFEST.md - synthetic report with recommendations and rationale",
        "Six detailed per-source reports with citations and links",
        "Contradiction map showing where sources disagree",
        "Scored findings with confidence levels (CERTAIN, PROBABLE, SPECULATION)",
        "Gap analysis - what the Critic couldn't find"
      ],
      "does": [
        "Delivers multi-source ground truth from six independent channels",
        "Detects contradictions between official docs and real-world experience",
        "Validates research methodology before handing off the report",
        "Synthesizes six sources into one decision-ready document",
        "Measures the confidence of each finding instead of faking certainty",
        "Flags gaps where knowledge is missing, doesn't pretend to know",
        "Works in isolation (Anti-groupthink principle) guaranteeing diverse perspectives",
        "Delivers 90% better results than a single agent per Anthropic benchmark"
      ],
      "doesNotDo": [
        "Does not write or implement any code (zero builders on the team)",
        "Does not make decisions for you - only recommends with rationale",
        "Does not fit urgent answers (too much overhead)",
        "Does not replace domain experts in niche areas",
        "Does not run code experiments or benchmarks (analysis of existing data only)",
        "Does not predict the future (only reports state of the art)",
        "Does not involve real users for testing (public sources only)"
      ],
      "antiPatterns": [
        "Single Source Truth - using Research Swarm to confirm an opinion you already hold",
        "Research Paralysis - ordering research instead of making decisions, after the third swarm still nothing",
        "Ignore the Critic - ignoring Critic flags because they don't fit our plan",
        "Confidence Blindness - citing a SPECULATION finding as certainty in a presentation",
        "Groupthink Bypass - manually nudging researchers so they agree"
      ],
      "keyConcepts": [
        {
          "term": "Fan-out pattern",
          "def": "Pattern where the orchestrator broadcasts a task to many independent workers in parallel."
        },
        {
          "term": "Agent isolation",
          "def": "The principle that researchers do not communicate with each other to avoid groupthink."
        },
        {
          "term": "Confidence labeling",
          "def": "Tagging every finding as CERTAIN, PROBABLE, or SPECULATION."
        },
        {
          "term": "Contradiction map",
          "def": "A document showing where sources disagree and why."
        },
        {
          "term": "MANIFEST.md",
          "def": "The format of the final document that synthesizes all findings into decisions."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "9"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.80-2.05"
        },
        {
          "label": "Time",
          "value": "10-18 min"
        }
      ],
      "bestFor": [
        "When you face an irreversible tech or architecture choice",
        "When you need multi-source ground truth, not the vendor's official narrative",
        "When the output must be a strategic decision report with confidence levels"
      ],
      "worstFor": [
        "When you need implementation (zero builders on the team)",
        "When you have one obvious solution (too much overhead for a settled decision)",
        "When the question is so niche that public sources don't cover it"
      ],
      "relatedPresets": [
        "deep_research_swarm_pro",
        "reflect",
        "deep"
      ],
      "glossary": [
        {
          "term": "MANIFEST",
          "definition": "The final document synthesizing all findings into decisions with rationale."
        },
        {
          "term": "groupthink",
          "definition": "A phenomenon where a group converges on a shared opinion, losing diverse perspectives."
        },
        {
          "term": "confidence",
          "definition": "A measure of a finding's certainty: CERTAIN, PROBABLE, SPECULATION."
        },
        {
          "term": "contradiction",
          "definition": "A situation where two sources give conflicting information on the same topic."
        },
        {
          "term": "gap",
          "definition": "An area where the Researcher found insufficient data to make a decision."
        }
      ],
      "learningQuote": "An hour of research saves a month of regret - six independent detectives see more than one genius with Google.",
      "realExample": "Imagine a CTO choosing an AI framework for an enterprise HR chatbot (confidential data, SOC2, 100k employees). They have three options: LangChain, Haystack, custom. A single Google search gives contradictory answers. Research Swarm fires up six researchers - Tech docs read official SLAs, Reddit surfaces real production pain points, GitHub inspects open Issues and release frequency, Forums collect enterprise case studies. The Critic catches a contradiction (docs say \"production-ready\", GitHub shows 200 open bugs). The Synthesizer delivers a MANIFEST: recommendation with CERTAIN justification, a backup alternative, risks, and migration path. The CTO makes the call in 20 minutes instead of three months of hesitation."
    },
    "legacy": {
      "tagline": "Modernize an old system without breaking what works - analysis, migration, dual QA for aging apps",
      "missionShort": "Legacy Refactor delivers a full modernization pipeline for an existing system: codebase analysis, GitHub research for migration patterns, three parallel builders (BE+FE+Integrator), and dual QA. Priority: backward compatibility and zero-downtime while the product keeps running in production.",
      "whoIs": "Teams with an aging codebase (jQuery, Rails 4, Angular 1, Python 2, a monolith) that throttles development but can't be shut off because it's the business. Ideal when every change in the legacy stack triggers fear and 42% of dev time goes into digging through old code instead of delivering value.",
      "analogy": "This preset is like replacing a jet engine mid-flight - you have to keep flying (production uptime) while three crews swap critical parts one by one and two inspectors make sure nothing leaks.",
      "howItWorks": [
        {
          "label": "Phase 1: Analysis + GitHub research",
          "desc": "The Analyst maps the codebase (dependencies, hot paths, dark corners), GitHub Researcher finds similar migrations (jQuery to React, Rails 4 to 7, Python 2 to 3) and extracts patterns: strangler fig, adapter, branch-by-abstraction."
        },
        {
          "label": "Phase 2: Migration planning",
          "desc": "The Planner splits modernization into iterations, sets the order (which module first, which last), identifies feature flags and a rollback plan for each step."
        },
        {
          "label": "Phase 3: Three parallel builders",
          "desc": "Backend Developer rewrites services, Frontend Developer migrates components, the Integrator builds adapters and strangler facades so old and new run side by side. Backward compatibility is the priority."
        },
        {
          "label": "Phase 4: Dual QA and validation",
          "desc": "QA Security checks that the migration didn't introduce new attack vectors, QA Quality validates functional equivalence with the original (same inputs, same outputs). The Manager coordinates."
        }
      ],
      "inputs": [
        "Existing legacy codebase with repo access",
        "Target stack (what you want to get to: React 19, Rails 7, Python 3)",
        "Constraints (max downtime, budget, timeline, compliance)",
        "List of critical business paths that must not break"
      ],
      "outputs": [
        "Modernized code in the new stack running alongside the old",
        "Migration guide with steps, rollback plan, and feature flags",
        "Adapters and strangler facades enabling gradual migration",
        "Dual QA report (security and quality) showing zero regressions",
        "Pattern documentation for the team to continue the modernization"
      ],
      "does": [
        "Modernizes a legacy stack without killing live production",
        "Introduces the strangler fig pattern for gradual replacement",
        "Builds adapters so old and new code coexist",
        "Searches GitHub for patterns from teams that ran similar migrations",
        "Validates functional equivalence (old vs new produce the same results)",
        "Guards against security regression (QA Security)",
        "Ships feature flags for safe rollout and rollback",
        "Cuts technical debt without a big bang rewrite"
      ],
      "doesNotDo": [
        "Does not build new greenfield projects (use SaaS or Startup MVP)",
        "Does not fix single bugs in legacy (use Quick Fix or Bug Hunter)",
        "Does not migrate cloud infrastructure (application layer only)",
        "Does not do a big bang rewrite (that's an anti-pattern for this preset)",
        "Does not replace dedicated architecture debate (use Five Minds)",
        "Does not work when the client accepts long downtimes - simpler presets will do",
        "Does not fit projects without a test safety net (add tests first)"
      ],
      "antiPatterns": [
        "Big Bang Rewrite - rewriting the whole system from scratch over a year with 40% of features lost",
        "Refactor Without Tests - modernizing legacy without characterization tests, regressions land on customers",
        "Silent Strangler - shipping strangler fig with no monitoring, the old code still serves 70% of traffic a year later",
        "Happy Path Migration - migrating only the main paths, edge cases break for enterprise clients",
        "Git Archeology Only - reading code without talking to the people who wrote it, repeating old assumptions"
      ],
      "keyConcepts": [
        {
          "term": "Strangler fig",
          "def": "Pattern of gradually replacing legacy with new code, without a big bang rewrite."
        },
        {
          "term": "Branch by abstraction",
          "def": "Technique of introducing an abstraction that lets old and new implementations coexist."
        },
        {
          "term": "Characterization tests",
          "def": "Tests documenting current legacy behavior, protecting against regressions during refactor."
        },
        {
          "term": "Feature flag",
          "def": "Runtime toggle enabling gradual rollout of a new implementation and quick rollback."
        },
        {
          "term": "Backward compatibility",
          "def": "Guarantee that existing integrations and clients still work after modernization."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "9"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.30-3.20"
        },
        {
          "label": "Time",
          "value": "16-26 min"
        }
      ],
      "bestFor": [
        "When you have a legacy system throttling development that can't be shut off",
        "When you're migrating a framework (jQuery to React, Angular 1 to modern)",
        "When you need gradual modernization with backward compatibility and feature flags"
      ],
      "worstFor": [
        "When it's a greenfield project with no existing code (use SaaS or Startup)",
        "When it's a single bug in legacy (use Quick Fix, not overkill)",
        "When you accept multi-week downtime - simpler presets will do"
      ],
      "relatedPresets": [
        "migration_crew",
        "plan_exec",
        "api_modern"
      ],
      "glossary": [
        {
          "term": "legacy",
          "definition": "Inherited code that runs in production but is hard to extend or safely change."
        },
        {
          "term": "technical debt",
          "definition": "The cost of future changes arising from past quality compromises."
        },
        {
          "term": "strangler fig",
          "definition": "Pattern of gradually wrapping legacy in new code until the old disappears."
        },
        {
          "term": "adapter",
          "definition": "A layer translating between old and new interfaces for backward compatibility."
        },
        {
          "term": "monolith",
          "definition": "An app where all code lives in a single deployable artifact, the opposite of microservices."
        }
      ],
      "learningQuote": "Legacy isn't bad code - it's code that survived. Modernization is about letting it keep surviving while it starts helping again.",
      "realExample": "Imagine an 8-year-old B2B SaaS: Rails 4 backend, jQuery and CoffeeScript frontend, PostgreSQL 9. New devs refuse to touch it, adding a simple feature takes a week. This preset analyzes hot paths, searches GitHub for how others migrated Rails 4 to 7, plans the strangler fig (new Rails 7 endpoints alongside the old ones), rewrites critical modules in React in parallel. After 40 minutes the first modernized module runs in production behind a feature flag, both QAs confirm zero regressions, and the team has a clear path to modernize the rest."
    },
    "saas": {
      "tagline": "A full 10-agent team builds a SaaS product from research to deployment",
      "missionShort": "Full-Stack SaaS is a hierarchical team of ten specialists that takes a product from idea to a working MVP. It delivers a complete stack: backend with business logic, frontend with user panel, design system, payment and auth integrations, and dual-layer QA. For product founders who want a working SaaS from a single run.",
      "whoIs": "This preset is for someone starting a new web product from scratch who needs EVERYTHING: backend, frontend, design, and quality control. Pick it when you have a vision of a complete product (not just one slice) and want the whole stack in a single run instead of stitching it together from smaller presets. Ideal for an investor MVP, a first customer release, or a full refresh of an old product.",
      "analogy": "Full-Stack SaaS is like a construction firm that builds a house from foundation to roof - you have an architect, a structural engineer, an electrician, a plumber, an interior decorator, a site manager, and two inspectors, each necessary to make the house habitable.",
      "howItWorks": [
        {
          "label": "Phase 1 - Research and analysis",
          "desc": "The Orchestrator hands the vision to the Analyst, who decomposes the requirements. Tech Researcher investigates the stack (framework, database, auth provider), UX Researcher gathers visual trends and onboarding patterns. Output: requirements MANIFEST + stack recommendation."
        },
        {
          "label": "Phase 2 - Parallel build squad",
          "desc": "Three builders work at the same time. Backend Dev stands up the API, auth, database, and payments. Frontend Dev builds the user panel and flows. Designer prepares the design system, colors, typography, and UI components. Each gets an isolated context."
        },
        {
          "label": "Phase 3 - Integration",
          "desc": "The Integrator joins the three streams into a single whole. Wires frontend to API, checks design consistency with components, verifies payment flow end-to-end. This phase is critical to avoid the classic isolated-dev problem."
        },
        {
          "label": "Phase 4 - Dual QA",
          "desc": "QA Security audits authentication, sessions, user data protection, and basic OWASP compliance. QA Quality checks user flows, error states, edge cases on forms. Both sign the GO/NO-GO for deployment."
        }
      ],
      "inputs": [
        "Product vision and target audience (e.g. SaaS tool for hairdressers, 50-500 customers)",
        "Functional requirements (login, payments, dashboard, notifications)",
        "Tech preferences or constraints (Node vs Python, Postgres vs Mongo)",
        "Success criteria (MVP in 2 weeks, 95 Lighthouse score, GDPR compliance)"
      ],
      "outputs": [
        "Working backend with API, authentication, and database",
        "Frontend with user panel and onboarding",
        "Design system with ready components and documentation",
        "Integration report with working end-to-end flows",
        "Dual QA reports (security + quality) with GO/NO-GO verdicts"
      ],
      "does": [
        "Builds a complete SaaS product stack from backend to UI",
        "Designs a coherent design system with a component library",
        "Integrates authentication, payments, and databases into one whole",
        "Covers tech and UX research before any code",
        "Runs a parallel build (3 squads at once) to compress time",
        "Enforces dual QA (security + quality) before deployment",
        "Operates hierarchically with clear phase separation",
        "Produces a ready product capable of onboarding first customers"
      ],
      "doesNotDo": [
        "Does not assume existing code or refactor legacy (that's Legacy Refactor)",
        "Does not run A/B experiments or hypothesis tests (that's AB Test Lab)",
        "Does not handle heavy enterprise compliance (that's Full Hierarchy)",
        "Does not optimize performance of an existing product (that's Performance Boost)",
        "Does not generate marketing content or copy (that's Content Pipeline)",
        "Does not run a full security pentest (that's Security Hardening)",
        "Does not scale a product into microservices (that's Microservices)"
      ],
      "antiPatterns": [
        "Isolated Silos - three build squads each in their own world, with no integrator tying it together",
        "Design Afterthought - adding a designer at the end instead of in parallel with backend",
        "Skipped Research - starting code without stack or UX research, leading to expensive refactors",
        "Missing QA Security - skipping QA Security in a SaaS product that holds user data",
        "Scope Creep - ordering more features mid-build instead of sticking to the original MANIFEST"
      ],
      "keyConcepts": [
        {
          "term": "Hierarchical Squads",
          "def": "A team structure where three parallel squads work independently under a single orchestrator."
        },
        {
          "term": "Design System",
          "def": "A library of ready components, colors, typography, and patterns that guarantee consistent product visuals."
        },
        {
          "term": "Integrator role",
          "def": "A dedicated agent that merges the output of three squads and verifies end-to-end behavior."
        },
        {
          "term": "Dual QA gate",
          "def": "Double final check - security and quality - with two independent GO/NO-GO verdicts."
        },
        {
          "term": "Parallel build",
          "def": "Simultaneous backend, frontend, and designer work instead of sequence, cutting latency by ~40%."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "10"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.40-3.55"
        },
        {
          "label": "Time",
          "value": "5-8 min"
        }
      ],
      "bestFor": [
        "When you're starting a new SaaS product from scratch and need the full stack",
        "When you're building an investor pitch MVP and have to show a working product",
        "When you're doing a complete refresh of an old product with new design"
      ],
      "worstFor": [
        "When you only want backend or only frontend (this preset forces all three)",
        "When you're building an internal tool for 5 people in the company (overkill)",
        "When you have an existing product and just want to add one feature (use Feature Sprint)"
      ],
      "relatedPresets": [
        "startup",
        "fullstack_premium",
        "standard"
      ],
      "glossary": [
        {
          "term": "MVP",
          "definition": "Minimum Viable Product - the smallest working version of a product capable of onboarding first customers."
        },
        {
          "term": "design system",
          "definition": "A set of rules, components, and visual tokens guaranteeing consistency across the entire interface."
        },
        {
          "term": "auth provider",
          "definition": "An external authentication provider (Clerk, Auth0, Supabase Auth) replacing a custom solution."
        },
        {
          "term": "integrator",
          "definition": "An agent that merges the output of parallel squads into a single coherent whole."
        },
        {
          "term": "GO/NO-GO",
          "definition": "A binary decision from QA whether the product can ship or needs fixes."
        }
      ],
      "learningQuote": "Building SaaS from scratch isn't coding - it's coordinating six specializations that have to play together like an orchestra.",
      "realExample": "Imagine you have an idea for a SaaS for physiotherapists: appointment booking, Stripe payments, SMS notifications, patient panel. You launch Full-Stack SaaS - the Orchestrator hands the vision to the Analyst, who decomposes the requirements. Tech Researcher recommends Next.js + Supabase + Stripe, UX Researcher shows patterns from medical products. Three builders start in parallel: Backend stands up the booking API, Frontend the patient panel, Designer prepares a calm medical palette. The Integrator ties it all together. QA Security checks GDPR and data encryption, QA Quality tests the booking flow. After 7 minutes you have a working MVP ready for first customers and the investor meeting."
    },
    "microservices": {
      "tagline": "Breaks the monolith into an ecosystem of independent services with 4 parallel builders",
      "missionShort": "Microservices is an 11-agent team specialized in monolith decomposition. It analyzes bounded contexts, plans extraction order, builds four services in parallel, and runs a triple QA gate. For enterprise teams whose monolith has grown too large to maintain and must be split into independent services without breaking production.",
      "whoIs": "This preset is for a team that has a working monolith and knows it must be broken up - deployments take hours, one bug blocks the whole system, teams block each other. Pick it when the decision to migrate to microservices is already made and you need a systematic approach: coupling analysis, extraction plan, parallel build, and hard QA gates at every step.",
      "analogy": "This preset is like an urban planner rebuilding a shopping mall into a district of separate stores - it does not demolish everything at once, it maps dependencies, then moves the bakery, pharmacy, and bank into separate buildings connected by roads, one at a time, so no customer notices an outage.",
      "howItWorks": [
        {
          "label": "Phase 1 - Planning and analysis",
          "desc": "Analyst scans the monolith and maps bounded contexts per DDD, detecting coupling and shared state. Planner creates a Service Dependency DAG and sets the topological extraction order. Researcher studies API gateway, service mesh, and inter-service communication patterns."
        },
        {
          "label": "Phase 2 - Parallel build of 4 services",
          "desc": "Four builders (one per service family) work in parallel. Each extracts its area: separate repo, separate database, separate deployment. Integrator maintains API contracts and backward compatibility."
        },
        {
          "label": "Phase 3 - Integration and API gateway",
          "desc": "Integrator configures the API gateway (Kong, Envoy), handles service discovery, circuit breakers, and retry policies. Tests inter-service communication under load and checks what happens when one service goes down."
        },
        {
          "label": "Phase 4 - Triple QA gate",
          "desc": "QA Security audits inter-service communication, mTLS, and secrets management. QA Quality tests end-to-end business flows across multiple services. QA Manager collects the verdicts and issues the final GO/NO-GO on deployment."
        }
      ],
      "inputs": [
        "Existing monolith with source code access",
        "List of pain points (long deployments, cross-team blockers, shared point of failure)",
        "Split criteria (bounded contexts, teams, lifecycles)",
        "Runtime constraints (Kubernetes vs ECS, whether downtime is allowed)"
      ],
      "outputs": [
        "Bounded context map and Service Dependency DAG",
        "Step-by-step topological extraction plan",
        "4 independent services with their own repo, database, and deployment",
        "Configured API gateway with service discovery",
        "Triple QA report with GO/NO-GO verdict"
      ],
      "does": [
        "Maps bounded contexts and the monolith's dependency graph",
        "Plans topological extraction order without breaking production",
        "Builds four independent services in parallel",
        "Configures API gateway, service discovery, and circuit breakers",
        "Implements resilience patterns (retry, timeout, bulkhead)",
        "Audits security of inter-service communication",
        "Tests end-to-end business flows across multiple services",
        "Guards against the distributed monolith anti-pattern"
      ],
      "doesNotDo": [
        "Not for greenfield projects (use SaaS or Standard for that)",
        "Does not write code from scratch - works on an existing monolith",
        "Does not handle a single added service (overkill)",
        "Does not build frontend apps (this preset is backend-focused)",
        "Will not replace an experienced SRE during production cutover",
        "Does not generate the business case for a migration decision",
        "Will not solve organizational problems - only technical ones"
      ],
      "antiPatterns": [
        "Distributed Monolith - splitting into services that are still tightly coupled (62% of first attempts per enterprise reports)",
        "Big Bang Extraction - extracting all services at once instead of topologically",
        "Shared Database - every service still talks to the same database instead of owning its own",
        "Missing Circuit Breaker - lack of resilience patterns causes cascading failures",
        "Ignored Bounded Context - splitting along technical layers instead of business domains"
      ],
      "keyConcepts": [
        {
          "term": "Bounded Context",
          "def": "A business domain area with its own model and language, the DDD foundation for splitting into services."
        },
        {
          "term": "Service Dependency DAG",
          "def": "A graph of dependencies between services, used to set extraction order."
        },
        {
          "term": "API Gateway",
          "def": "A single entry point for all clients, responsible for routing, auth, and rate limiting."
        },
        {
          "term": "Circuit Breaker",
          "def": "A pattern that guards against cascading failures - when a service goes down, the gateway cuts off traffic instead of flooding it with requests."
        },
        {
          "term": "Strangler Fig",
          "def": "A migration pattern where features are moved out of the monolith gradually until the original can be deleted."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "11"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.70-4.25"
        },
        {
          "label": "Time",
          "value": "8-15 min"
        }
      ],
      "bestFor": [
        "When the monolith has grown too large and teams block each other",
        "When you need to scale different parts of the system independently",
        "When bounded contexts are already clear and you want to extract them"
      ],
      "worstFor": [
        "When starting a new project (greenfield) - start with a monolith",
        "When your app has 5 users (overkill)",
        "When you have no distributed systems experience (learning via migration is painful)"
      ],
      "relatedPresets": [
        "legacy",
        "migration_crew",
        "api_modern"
      ],
      "glossary": [
        {
          "term": "monolith",
          "definition": "An application bundled into one large deployable where all modules run in the same process."
        },
        {
          "term": "DDD",
          "definition": "Domain-Driven Design - a methodology for modeling software around business domains."
        },
        {
          "term": "service mesh",
          "definition": "An infrastructure layer that manages inter-service communication (Istio, Linkerd)."
        },
        {
          "term": "mTLS",
          "definition": "Mutual TLS - both sides of the connection authenticate with certificates, standard in microservices."
        },
        {
          "term": "topological sort",
          "definition": "An algorithm that orders DAG nodes so dependencies come before the things that depend on them."
        }
      ],
      "learningQuote": "Microservices are not a solution to technical problems - they are a solution to organizational problems that surface as technical blockers.",
      "realExample": "Imagine that you run an e-commerce platform with a 500k-line monolith and 40 developers. Deployments take 2 hours, one bug in the payments module blocks all sales. You launch Microservices - Analyst maps the bounded contexts: catalog, orders, payments, shipping, users. Planner sets the order: payments first (highest pain), then orders, shipping, catalog. Four builders extract four services in parallel. Integrator configures an API gateway with circuit breakers. QA tests what happens when payments go down - the rest of the store keeps working. After 12 minutes you have a plan, working services, and a GO/NO-GO report with a deployment order for the next 3 months."
    },
    "full": {
      "tagline": "Gold Standard 13 agents in a 5-layer hierarchy for mission-critical projects",
      "missionShort": "Full Hierarchy is a reference architecture for the whole system - 13 agents across five layers from strategy to triple QA. Every layer has its own clearly defined responsibility: core, planning, research, build, QA. For enterprise projects where the cost of an error vastly exceeds the cost of extra analysis, and where skipping one step can cost months of work.",
      "whoIs": "This preset is for teams working on mission-critical projects where \"probably fine\" is not enough. Pick it when you have a project that requires a formal audit, compliance, or when the cost of failure is in the hundreds of thousands of dollars. It is the archetype against which every other preset is measured - when you are unsure whether some other preset has everything you need, compare it to Full Hierarchy.",
      "analogy": "This preset is like a full top-tier film production - director, writer, producer, three researchers, cinematographer, production designer, actor, editor, and three reviewers, every one essential, because the film does not ship until the studio head says GO.",
      "howItWorks": [
        {
          "label": "Layer 0 - Core (Strategy)",
          "desc": "Orchestrator accepts the task, analyzes its scope, sets decision gates, and oversees the entire pipeline. One Opus agent with access to every phase - the project's Mission Control."
        },
        {
          "label": "Layer 1-2 - Planning and Research",
          "desc": "Analyst decomposes requirements and maps dependencies, Planner builds the schedule and resource allocation. Then three researchers in parallel: Tech studies the stack, UX studies visual trends, Docs studies official guidelines and compliance. Output: MANIFEST + build plan."
        },
        {
          "label": "Layer 3 - Build Squad (4 in parallel)",
          "desc": "Backend Dev implements business logic and APIs. Frontend Dev builds the user interface. Designer creates a coherent visual system. Integrator connects the three streams and verifies end-to-end behavior. Everyone works in parallel under the orchestrator's coordination."
        },
        {
          "label": "Layer 4 - Triple QA Gate",
          "desc": "QA Security audits security (OWASP, data protection, auth). QA Quality tests user flows, regressions, and edge cases. QA Manager collects verdicts and issues a formal GO/NO-GO with rationale. No feature ships without all three signatures."
        }
      ],
      "inputs": [
        "Mission-critical project specification with business requirements",
        "Technical and compliance constraints (SOX, PCI, HIPAA, GDPR)",
        "Success and acceptance criteria (performance, availability, security)",
        "Existing architecture documentation or brownfield constraints"
      ],
      "outputs": [
        "MANIFEST of requirements and 5-layer execution plan",
        "Three research reports (Tech + UX + Docs) with stack selection",
        "Complete build: backend, frontend, design, integration",
        "Three QA reports (Security + Quality + Manager) with GO/NO-GO verdict",
        "Audit trail across all layers for formal compliance"
      ],
      "does": [
        "Runs a full cycle from strategy to deployment with no gaps",
        "Provides an audit trail of every decision for formal compliance",
        "Covers three research perspectives (Tech + UX + Docs)",
        "Builds four streams in parallel (BE + FE + Design + Integration)",
        "Enforces a triple QA gate (Security + Quality + Manager)",
        "Serves as a reference architecture for comparisons with other presets",
        "Stops at every decision gate for verification",
        "Guarantees that no layer is skipped"
      ],
      "doesNotDo": [
        "Not for simple tasks (massive overkill for a single bug)",
        "Not suitable for urgent delivery (the full cycle takes hours)",
        "Does not fit limited budgets (13 agents = high cost)",
        "Does not prototype - this is a production preset, not an experiment",
        "Will not replace human business decisions at the gates",
        "Does not run deep 6+ source research (use Deep for that)",
        "Does not include adversarial debate (use Five Minds for that)"
      ],
      "antiPatterns": [
        "Hierarchy Overkill - using Full Hierarchy on a task that 3 agents could handle (a symphony orchestra playing Happy Birthday)",
        "Gate Skipping - skipping decision gates because it \"looks fine\"",
        "Research Shortcut - dropping one of the three research perspectives",
        "QA Collapse - merging Security, Quality, and Manager into one agent to save tokens",
        "Missing Audit Trail - failing to document decisions, leaving compliance with nothing to stand on"
      ],
      "keyConcepts": [
        {
          "term": "5-Layer Hierarchy",
          "def": "A five-level Core-Planning-Research-Build-QA structure where each layer has one clear responsibility."
        },
        {
          "term": "Hub-and-Spoke + Pipeline + Parallel Fan",
          "def": "A combination of three patterns: a central hub (Orchestrator), a sequential pipeline (layers), and parallel fan-out (3 research, 4 build, 3 QA)."
        },
        {
          "term": "Triple QA Gate",
          "def": "Three independent quality checks - security, quality, manager - each with veto power."
        },
        {
          "term": "Audit Trail",
          "def": "Documentation of every decision at every layer, required for formal compliance."
        },
        {
          "term": "Reference Architecture",
          "def": "A benchmark architecture against which every other preset is measured - if a preset is weaker, it shows what is missing."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "13"
        },
        {
          "label": "Phases",
          "value": "5"
        },
        {
          "label": "Est. cost",
          "value": "$1.65-4.20"
        },
        {
          "label": "Time",
          "value": "10-15 min"
        }
      ],
      "bestFor": [
        "When the project is mission-critical and an error costs far more than the extra analysis",
        "When you need a formal audit trail for compliance (SOX, PCI, HIPAA)",
        "When you are doing enterprise architecture and need zero gaps in the process"
      ],
      "worstFor": [
        "When you are working on a simple feature that does not need 13 agents",
        "When you have a tight deadline and need a result in 5 minutes",
        "When the budget is limited and every thousand tokens counts"
      ],
      "relatedPresets": [
        "deep",
        "fullstack_premium",
        "standard"
      ],
      "glossary": [
        {
          "term": "mission-critical",
          "definition": "A system where failure has serious financial, legal, or safety consequences."
        },
        {
          "term": "compliance",
          "definition": "Conformance with regulations (GDPR, HIPAA, PCI-DSS, SOX) requiring a formal audit trail."
        },
        {
          "term": "Gold Standard",
          "definition": "A reference benchmark - the highest standard against which alternatives are compared."
        },
        {
          "term": "gate decision",
          "definition": "A point in the process where formal acceptance is required before moving to the next phase."
        },
        {
          "term": "fan-out",
          "definition": "A pattern where one input splits into multiple parallel work streams."
        }
      ],
      "learningQuote": "Full Hierarchy does not exist so you always use it - it exists so you know what you are skipping when you pick a smaller preset.",
      "realExample": "Imagine that you are building an online banking platform for an enterprise client. Requirements: PCI-DSS compliance, audit trail on every decision, dual sign-off on every change, a full pentest before deployment. You launch Full Hierarchy - Orchestrator accepts the spec, Analyst decomposes into modules, Planner builds the schedule, three researchers study the stack (Tech), fintech UX patterns, and PCI-DSS documentation. Four squads build in parallel: transaction backend, panel frontend, calm-palette design, integrator wiring to external APIs. Triple QA audits security, tests flows, and issues a formal GO/NO-GO with rationale. After 12 minutes you have a working module with a complete audit trail ready to show an auditor."
    },
    "deep": {
      "tagline": "Full orchestra of 18 agents - maximum 6-stream research + triple QA",
      "missionShort": "Deep Research+Build is the maximum non-ultimate configuration: 18 agents in a full orchestra. Six researchers search different sources in parallel (Tech, UX, Reddit, GitHub, Forums, X/Twitter), Critic rates each report, Synthesizer merges everything into a coherent plan, four builders plus Integrator build the solution, and triple QA issues a formal GO FOR LAUNCH. For enterprise work where implementation demands genuinely thorough preparation.",
      "whoIs": "This preset is for teams facing technology decisions with consequences across the whole platform. Pick it when the cost of a bad decision (wrong framework, wrong database, wrong vendor) runs into hundreds of thousands of dollars and months of work. Ideal for technology due diligence before a large investment, for enterprise platform creation, for multi-vendor evaluations above $500k, and for regulated industries where compliance demands multi-source research.",
      "analogy": "This preset is like the launch of a NASA space mission - six science teams analyze propulsion, navigation, comms, life support, landing, and return in parallel, a reviewer validates every report, the chief scientist merges everything into a mission plan, engineering crews build the capsule, and a triple safety inspection issues GO FOR LAUNCH.",
      "howItWorks": [
        {
          "label": "Phase 1 - Fan-out Research (6 streams)",
          "desc": "Six researchers start in parallel in isolation (no communication between them, which prevents groupthink). Researcher Tech studies official docs and benchmarks, UX studies Dribbble/Behance trends, Reddit captures unfiltered opinions, GitHub reads code and issues, Forums mines tutorials and lessons learned, X/Twitter tracks fast trends and breaking news."
        },
        {
          "label": "Phase 2 - Critic Evaluation + Synthesis",
          "desc": "Research Critic reads all 6 reports and rates them for evidence quality, consistency with other sources, and confidence scores. Sends weak reports back for rework. Synthesizer merges the validated reports into one coherent build plan with stack recommendations and trade-offs."
        },
        {
          "label": "Phase 3 - Build Squad (4 + Integrator)",
          "desc": "Four builders work in parallel: Backend Dev sets up APIs and business logic, Frontend Dev builds the UI, Feature Dev implements specific business features, Designer creates the visual system. Integrator wires everything together and verifies end-to-end flows."
        },
        {
          "label": "Phase 4 - Triple QA Gate",
          "desc": "QA Security audits security, QA Quality tests flows and regressions, QA Manager collects verdicts and issues a formal GO/NO-GO with rationale. Three independent checks, each with veto power."
        }
      ],
      "inputs": [
        "A strategic technology question or a large enterprise scope",
        "Evaluation criteria and constraints (budget, timeline, compliance)",
        "List of candidate solutions to compare (if known)",
        "Access to sources and documentation (links, repos, specs)"
      ],
      "outputs": [
        "6 independent research reports with confidence scores and sources",
        "Critic report with a score (0.0-1.0) for each of the 6 reports",
        "Synthesized build plan with stack recommendation and trade-offs",
        "Complete build: backend + frontend + features + design + integration",
        "Triple QA report with formal GO/NO-GO"
      ],
      "does": [
        "Runs research across six independent sources in parallel",
        "Validates every report through an independent Critic",
        "Reaches 76.9% parallelization (the highest ratio in the non-ultimate system)",
        "Combines formal sources (docs) with unfiltered ones (Reddit, GitHub)",
        "Has Synthesizer build a coherent plan from often contradictory reports",
        "Builds four code streams in parallel under an integrator's coordination",
        "Issues triple GO/NO-GO for mission-critical deployments",
        "Delivers a full audit trail of every decision"
      ],
      "doesNotDo": [
        "Not for standard feature development (overkill)",
        "Not for prototypes (no time for 18 agents)",
        "Does not run expert debates (use Five Minds for that)",
        "Does not include Human-in-the-Loop gates (use Deep Five Minds for that)",
        "Not for a limited budget - the most expensive non-ultimate preset",
        "Does not do a single quick research pass (use Recon for that)",
        "Does not train models or tune hyperparameters"
      ],
      "antiPatterns": [
        "Research Waste - using Deep for a question that Solo could answer in a minute",
        "Isolation Break - letting researchers read each other's reports (destroys isolation = groupthink)",
        "Critic Bypass - skipping Critic and passing raw reports straight to Synthesizer",
        "Parallel Overload - forcing synchronization on parallel researchers instead of accepting async work",
        "Missing Synthesis - treating 6 reports as the final output instead of synthesizing them into one plan"
      ],
      "keyConcepts": [
        {
          "term": "Full Orchestra",
          "def": "A pattern of 18 agents across 4 layers where every layer has parallelism: Research 6x, Build 4x, QA 3x."
        },
        {
          "term": "Researcher Isolation",
          "def": "The rule that researchers do not read each other's reports - prevents groupthink and guarantees independent perspectives."
        },
        {
          "term": "Critic Evaluation",
          "def": "Independent validation of every research report's quality, with the right to send it back for rework."
        },
        {
          "term": "Confidence Scores",
          "def": "0.0-1.0 ratings for every finding, letting Synthesizer weigh contradictory sources."
        },
        {
          "term": "Parallelization Efficiency",
          "def": "The percentage of agents that can work in parallel - in Deep it is 76.9% (14 of 18)."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "18"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$2.20-5.55"
        },
        {
          "label": "Time",
          "value": "10-25 min"
        }
      ],
      "bestFor": [
        "When you are making a technology decision with consequences across the whole platform",
        "When you are doing due diligence before an investment above $500k",
        "When a regulated industry requires multi-source research with an audit trail"
      ],
      "worstFor": [
        "When you are doing standard feature development (the Standard preset is enough)",
        "When you are prototyping and have no time for 18 agents",
        "When the budget will not cover the most expensive non-ultimate preset"
      ],
      "relatedPresets": [
        "research",
        "full",
        "deep_five_minds"
      ],
      "glossary": [
        {
          "term": "fan-out",
          "definition": "A pattern where one task splits into multiple parallel work streams."
        },
        {
          "term": "groupthink",
          "definition": "A dynamic where a group reaches consensus through pressure rather than rigorous evaluation - destroys decision quality."
        },
        {
          "term": "confidence score",
          "definition": "A number from 0.0 to 1.0 expressing the agent's certainty about a finding."
        },
        {
          "term": "synthesizer",
          "definition": "An agent that merges many reports into one coherent plan and resolves contradictions between sources."
        },
        {
          "term": "triple QA",
          "definition": "Three independent quality gates (security, quality, manager), each with veto power."
        }
      ],
      "learningQuote": "Six independent perspectives beat one expert opinion - not because experts are wrong, but because no single expert sees the whole elephant.",
      "realExample": "Imagine that you are the CTO of a fintech startup planning a payment platform for 50 countries. The stakes: $2M of investment and 6 months of team work. You launch Deep Research+Build. Six researchers in parallel: Tech studies Stripe/PayPal/Adyen docs and PCI-DSS, UX studies checkout patterns, Reddit captures unfiltered developer opinions on integration pain, GitHub reads issues and workarounds, Forums mines legal advice for 50 countries, X/Twitter tracks breaking news about API changes. Critic rates the reports. Synthesizer picks: Adyen for 50 countries + custom checkout + Terraform for infra. Four squads build a POC. Triple QA issues GO. After 20 minutes you have a due diligence report that will defend the $2M in front of the board, plus a working payments prototype."
    },
    "five_minds": {
      "tagline": "Structured debate of 4 experts + Devil's Advocate for architectural decisions",
      "missionShort": "Five Minds Protocol is the only preset in the system with an adversarial debate mechanism. Four domain experts defend their positions with evidence, the fifth - Devil's Advocate - systematically attacks every claim, and Synthesizer issues a Gold Solution that transcends the original conflict. For strategic technology decisions where there is no obvious winner and where consensus would be worse than dialectic.",
      "whoIs": "This preset is for teams facing a contentious architectural decision where every camp has strong arguments and there is no obvious choice. Pick it when you are stuck in analysis paralysis, when your engineers have been arguing for weeks without resolution, or when you worry that team consensus will sand off the sharp edges and lead to a suboptimal decision.",
      "analogy": "This preset is like a courtroom trial with a Devil's Advocate - four expert witnesses give contradictory testimony with evidence, the fifth challenges every claim, and the judge issues a verdict better than the proposal of either side.",
      "howItWorks": [
        {
          "label": "Phase 1 - Research ground truth",
          "desc": "Three researchers prepare evidence for the experts: market data, technical benchmarks, user opinions. Each gets the same data in isolation so everyone debates on the same factual footing."
        },
        {
          "label": "Phase 2 - Opening statements (4 experts)",
          "desc": "Four experts formulate opening statements in parallel. Pragmatist asks \"is this feasible?\". Innovator asks \"is this the best?\". Data Analyst asks \"what do the numbers say?\". User Advocate asks \"will the user understand this?\". Each defends a position with evidence."
        },
        {
          "label": "Phase 3 - Adversarial debate + Devil's Advocate",
          "desc": "Experts read each other's openings and prepare rebuttals. Devil's Advocate (the fifth, Shadow) systematically attacks EVERY position - does not represent any side, its job is only to challenge. It hunts for hidden assumptions, biased evidence, and blind spots. Several rounds of exchanges."
        },
        {
          "label": "Phase 4 - Gold Solution + Build",
          "desc": "Synthesizer (Opus) mediates the debate and issues the Gold Solution - a creative synthesis that is neither a compromise nor a win for one camp, but a solution better than every original proposal. Build squad implements the decision."
        }
      ],
      "inputs": [
        "A contentious architectural decision (framework, database, pattern, strategy)",
        "Competing requirements or goals (speed vs reliability, cost vs quality)",
        "Available options or candidates for the debate (at least 3 to compare)",
        "Business context and stakes (what do we lose if we pick wrong)"
      ],
      "outputs": [
        "Opening statements from 4 experts with evidence and argument",
        "Rebuttals and counterarguments from debate rounds",
        "Devil's Advocate report with critique of every position",
        "Gold Solution - creative synthesis issued by Synthesizer",
        "Implemented build based on the Gold Solution"
      ],
      "does": [
        "Runs the only adversarial debate mechanism in the system",
        "Forces argument instead of guessing or intuition",
        "Guards against groupthink and premature consensus",
        "Produces a Gold Solution that transcends the original positions",
        "Tests positions under systematic criticism",
        "Surfaces hidden assumptions and biased evidence",
        "Delivers a formal audit trail of the decision for stakeholders",
        "Builds the implementation on top of the winning solution"
      ],
      "doesNotDo": [
        "Not for simple implementation with an obvious choice (overkill)",
        "Will not accelerate urgent delivery - debate takes time",
        "Will not replace business decisions that need organizational context",
        "Does not generate consensus - it produces a Gold Solution from conflict",
        "Does not run deep 6+ source research (use Deep for that)",
        "Does not run a double debate before and after build (use Deep Five Minds for that)",
        "Not for a team that is not ready for intellectual confrontation"
      ],
      "antiPatterns": [
        "Fake Debate - experts who agree too quickly, without genuine conflict (a sign of groupthink)",
        "Toothless Devil - a Devil's Advocate that says \"looks good\" instead of systematically challenging",
        "Compromise Trap - Synthesizer producing a compromise instead of a Gold Solution (a compromise is worse than the original)",
        "Missing Evidence - experts debating from opinion instead of from ground truth produced by research",
        "Consensus Rush - closing the debate after one round instead of iterating until positions are genuinely stress-tested"
      ],
      "keyConcepts": [
        {
          "term": "Adversarial Debate",
          "def": "Structured conflict where experts defend positions with evidence and an independent opponent systematically challenges them."
        },
        {
          "term": "Gold Solution",
          "def": "A synthesis that transcends the original conflict - a solution better than any side's proposal."
        },
        {
          "term": "Devil's Advocate Role",
          "def": "An agent that represents NO side - its only job is to challenge every claim."
        },
        {
          "term": "Dialectic vs Consensus",
          "def": "Dialectic produces better decisions than consensus because it does not sand off the sharp edges of the arguments."
        },
        {
          "term": "Ground Truth Grounding",
          "def": "The rule that the debate must be grounded in hard data from research, not opinion or intuition."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "14"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.80-4.50"
        },
        {
          "label": "Time",
          "value": "7-15 min"
        }
      ],
      "bestFor": [
        "When you face a contentious architectural decision with no obvious winner",
        "When the team has been arguing for weeks without reaching a resolution",
        "When you worry that team consensus will sand off the sharp edges of good arguments"
      ],
      "worstFor": [
        "When you have a simple implementation with an obvious choice (debate is a waste of time)",
        "When you need a result in 5 minutes (debate requires rounds)",
        "When the team is not ready for intellectual confrontation and prefers consensus"
      ],
      "relatedPresets": [
        "five_minds_strategic",
        "deep_five_minds",
        "research"
      ],
      "glossary": [
        {
          "term": "adversarial",
          "definition": "Confrontational - mutually attacking positions in order to stress-test them."
        },
        {
          "term": "dialectic",
          "definition": "A method for arriving at truth through conflicting arguments and synthesis, not compromise."
        },
        {
          "term": "rebuttal",
          "definition": "A counterargument - a reply to an opponent's argument in a debate."
        },
        {
          "term": "devil's advocate",
          "definition": "A person who deliberately challenges a position, even one they agree with, to stress-test it."
        },
        {
          "term": "premature consensus",
          "definition": "A group agreement that comes too early and skips important arguments - a symptom of groupthink."
        }
      ],
      "learningQuote": "The best decisions are not born from consensus, they come from controlled conflict where every position must defend itself under systematic attack.",
      "realExample": "Imagine that you are a platform architect and you must decide: monolith or microservices for a new product. Your team has been arguing for a month, both sides have good arguments. You launch Five Minds. Three researchers prepare data: Shopify benchmarks (monolith), Netflix (microservices), DORA metrics. Pragmatist defends the monolith: \"faster MVP, easier to debug\". Innovator defends microservices: \"future-proof, independent scaling\". Data Analyst shows DORA metrics: 60% of teams under 50 developers ship faster on a monolith. User Advocate: \"the user does not know what is under the hood\". Devil attacks everyone: \"are your benchmarks from 2024 or 2018? does your team already have microservices experience?\". Synthesizer issues the Gold Solution: \"Modular monolith with clear bounded contexts, ready for extraction into microservices once the team grows above 30 developers\". Build squad implements. Instead of a compromise you get a decision better than any original proposal."
    },
    "deep_five_minds": {
      "tagline": "ULTIMATE 27 agents - Deep Research + DOUBLE debate + 3 HITL gates for irreversible decisions",
      "missionShort": "Deep Five Minds is the only preset in Tier 5 ULTIMATE and the largest in the entire system. 27 agents across 6 phases: Deep Research (6 researchers + Critic), Five Minds #1 (debate BEFORE build), Build (5 agents + Designer + Integrator), Five Minds #2 (debate AFTER build), Triple QA. Between phases there are 3 Human-in-the-Loop gates with a 120-second timer. For irreversible decisions where the stakes exceed $500k and the effects will be felt for years.",
      "whoIs": "This preset is for leaders facing decisions with 5+ year consequences, where an architectural mistake is irreversible and stakes run in the hundreds of thousands of dollars or more. Pick it when you are doing mission-critical architecture for fintech, healthcare, or aerospace; when you are making an investment decision above $500k; or when regulation demands a formal double audit with human involvement. This is not a preset for everyday use - it is a strategic weapon.",
      "analogy": "This preset is like building a skyscraper with double inspection and three checkpoints - six teams study the ground and seismic data, the investor approves direction, five architects debate the design, the investor approves the plan, crews build, the SAME five experts debate the built object, the investor approves the test scope, and three inspectors sign off the final handover.",
      "howItWorks": [
        {
          "label": "Phase 0-1 - Strategy + Deep Research (10 agents)",
          "desc": "Orchestrator kicks off the task. Analyst decomposes, Planner builds the DAG, Synthesizer (Opus, 95% load, the system's brain) prepares central memory in MANIFEST.md. Six researchers run in parallel (Tech, Reddit, UX, GitHub, Forums, X/Twitter), Research Critic scores every report 0-1.0. HITL GATE #1: the human approves the research direction."
        },
        {
          "label": "Phase 2 - Five Minds #1 Research Evaluation (6 agents)",
          "desc": "First debate BEFORE build. Pragmatist, Innovator, Data Analyst, and User Advocate evaluate raw research. Devil's Advocate attacks every recommendation. Synthesizer mediates and issues Gold Solution #1 - WHAT to build and HOW. HITL GATE #2: the human approves the build plan with approve/modify/reject options."
        },
        {
          "label": "Phase 3 - Build Squad (7 agents)",
          "desc": "Five builders work in parallel: Backend Dev, Frontend Dev, Feature Dev, Designer, Integrator. Each gets Gold Solution #1 as the spec. Synthesizer maintains coherence through shared memory. Parallel build cuts latency by ~40% versus sequential."
        },
        {
          "label": "Phase 4-5 - Five Minds #2 + Triple QA (8 agents)",
          "desc": "Second debate AFTER build - the SAME experts evaluate the BUILT product, not the plans. Pragmatist: \"does it actually work?\". Innovator: \"were all opportunities used?\". Devil: \"what happens when the user does X?\". Synthesizer issues Gold Solution #2 - a list of fixes. The second debate round surfaces 23-37% more defects than a single one (Liang et al. 2024). HITL GATE #3: the human approves the fix scope. Triple QA: Security + Quality + Manager with a formal GO/NO-GO."
        }
      ],
      "inputs": [
        "A strategic decision with irreversible consequences (platform, stack, architecture)",
        "Financial and business stakes (at least $50k, ideally $500k+)",
        "Regulatory and compliance constraints (fintech, healthcare, aerospace)",
        "Stakeholder availability for 3 HITL gates (120 seconds per decision)"
      ],
      "outputs": [
        "6 independent research reports + Critic scores",
        "Transcript of Five Minds #1 debate + Gold Solution #1 (build plan)",
        "Complete build: backend + frontend + features + design + integration",
        "Transcript of Five Minds #2 debate + Gold Solution #2 (list of fixes)",
        "Triple QA report with formal GO/NO-GO + full audit trail of all 3 HITL gates"
      ],
      "does": [
        "Runs a DOUBLE expert debate - before build over plans, after build over reality",
        "Launches 6 parallel research streams with Critic validation",
        "Engages the human at 3 HITL decision gates with a 120s timer",
        "Produces two Gold Solutions - the build plan and the fix list",
        "Reaches 79.2% parallelization (19 of 27 agents can work in parallel)",
        "Delivers a full audit trail for compliance with the strictest regulators",
        "Surfaces 23-37% more defects than a single debate (iterated MAD)",
        "Serves as the only Tier 5 preset - a strategic weapon for irreversible decisions"
      ],
      "doesNotDo": [
        "Not for anything below $50k of stakes (overkill)",
        "Does not fit standard feature development (use Full or Standard)",
        "Will not work without an available stakeholder - the 3 HITL gates require a human",
        "Not for prototyping (27 agents is too expensive)",
        "Cannot finish in under 15 minutes (double debate + HITL wait)",
        "Will not replace executive sign-off - it only supports it with data",
        "Not for teams that have no practice in intellectual confrontation"
      ],
      "antiPatterns": [
        "Ultimate Abuse - using Deep Five Minds on a $5k decision (like convening the UN board to pick a pen color)",
        "HITL Skip - letting the auto-fallback timer make every decision instead of real human engagement",
        "Single Debate Shortcut - skipping Five Minds #2 because \"we already debated before the build\"",
        "Missing Post-Build Context - experts in the second debate have no access to results from the first - they lose 23-37% of the value",
        "Synthesizer Overload - trying to offload Synthesizer's role to smaller agents (breaks central coherence)"
      ],
      "keyConcepts": [
        {
          "term": "Double Adversarial Debate",
          "def": "The only pattern in the system where debate happens TWICE - before and after build, with the same experts but different context."
        },
        {
          "term": "Gold Solution #1 vs #2",
          "def": "#1 is the build plan before start; #2 is the fix list after build - two different syntheses from two different perspectives (plan vs reality)."
        },
        {
          "term": "Human-in-the-Loop Gates",
          "def": "Three decision gates where the pipeline stops and waits for a human - 120s timer with auto-fallback, but experts recommend genuine engagement."
        },
        {
          "term": "Iterated MAD Research",
          "def": "Liang et al. 2024 shows that a second debate round surfaces 23-37% more defects than a single one - because experts have implementation context."
        },
        {
          "term": "Synthesizer Central Brain",
          "def": "One Opus agent (95% load) mediating BOTH debates and maintaining central memory in MANIFEST.md - without it the system drifts apart."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "27"
        },
        {
          "label": "Phases",
          "value": "6"
        },
        {
          "label": "Est. cost",
          "value": "$2.80-7.10"
        },
        {
          "label": "Time",
          "value": "15-40 min"
        }
      ],
      "bestFor": [
        "When you are making an investment decision above $500k with 5+ year effects",
        "When you are building mission-critical architecture for a regulated industry (finance, healthcare, aerospace)",
        "When an architectural mistake is physically irreversible (data migration, format change, public API)"
      ],
      "worstFor": [
        "When stakes are below $50k (massive overkill, 40 minutes of waiting)",
        "When you have no stakeholder available for the 3 HITL gates (auto-fallback destroys the value)",
        "When you need a fast result - this preset takes 15-40 minutes of full pipeline"
      ],
      "relatedPresets": [
        "deep",
        "five_minds",
        "five_minds_strategic"
      ],
      "glossary": [
        {
          "term": "ULTIMATE Tier 5",
          "definition": "The highest complexity level in the system, the only preset in this tier, reserved for irreversible decisions."
        },
        {
          "term": "Human-in-the-Loop",
          "definition": "A pattern where the pipeline stops at key points and waits for a human decision, optionally with an auto-fallback timer."
        },
        {
          "term": "iterated MAD",
          "definition": "Iterated Multi-Agent Debate - research shows that a second debate round surfaces 23-37% more defects than the first."
        },
        {
          "term": "MANIFEST.md",
          "definition": "The pipeline's central memory - a file that Synthesizer maintains and every phase reads from."
        },
        {
          "term": "auto-fallback",
          "definition": "A safety mechanism - if the human does not respond within 120 seconds, the pipeline applies a default decision so it does not block."
        }
      ],
      "learningQuote": "When the stakes are too high to allow a mistake, and the decision is irreversible - you need not only the best experts but also their critique and human approval, twice.",
      "realExample": "Imagine that you are the CTO of a fintech planning a migration from MySQL to CockroachDB for a platform that processes $1B per year. The stakes: a migration error means potential loss of transaction data, regulatory fines (SOX, PCI-DSS), and reputational damage. You launch Deep Five Minds. Six researchers study: Tech benchmarks for CockroachDB vs alternatives, GitHub production issues, Reddit opinions from fintech engineers, Forums legal guidance on SOX compliance, UX for admin dashboards, X/Twitter breaking news about bugs. Critic rates. HITL GATE #1: you approve the direction. Five Minds #1 debate: Pragmatist \"is rollback possible?\", Innovator \"is distributed SQL the future?\", Data Analyst shows migration costs, User Advocate \"what about downtime?\". Devil attacks every assumption. Gold Solution #1: a strangler fig migration with dual-write and 3 months of parallel operation. HITL GATE #2: you approve the plan. Five builders build a POC. Five Minds #2 evaluates the built POC: \"does replication work under load?\", \"what about split-brain?\". Devil: \"did you test an AZ failure scenario?\". Gold Solution #2: a list of 12 fixes before production. HITL GATE #3: you approve the scope. Triple QA issues a formal GO/NO-GO. After 35 minutes you have: a due diligence report, transcripts of both debates, a working POC, a production migration plan, and a full audit trail for SOX auditors. This decision will stand for 5 years - now you know it will hold up."
    },
    "deep_research_swarm_pro": {
      "tagline": "Seven specialists in parallel - each in their own source, no one crosses into another's turf",
      "missionShort": "Deep Research Swarm Pro is a 10-agent team based on the Anthropic Lead Researcher pattern. Lead splits the research question into seven disjoint areas, seven researchers work in parallel each in their own source, a critic catches contradictions, and a synthesizer assembles one ordered report. For decisions that demand comparing many sources.",
      "whoIs": "This preset is for teams that need to compare 5-10 options before a strategic decision (database, framework, vendor). When one person is drowning in information and starts guessing, the fix is to split the work across specialists with EXPLICIT boundaries. Not for urgent decisions and not for teams that already have a clear answer.",
      "analogy": "This preset is like an intelligence center with seven area officers, where each owns their own beat and the commander assembles their reports into one conclusion.",
      "howItWorks": [
        {
          "label": "Phase 1 - Decomposition",
          "desc": "Lead researcher breaks the question into 7 disjoint sub-questions and assigns each to a different specialist with explicit boundaries (no one crosses into another's turf)."
        },
        {
          "label": "Phase 2 - Parallel research",
          "desc": "Seven researchers work in parallel in their sources: documentation, GitHub, Reddit, X, forums, UX, tech. Each returns JSON with findings, citations, and confidence scores."
        },
        {
          "label": "Phase 3 - Critique",
          "desc": "Critic compares reports looking for contradictions, gaps, and bias. Flags which claims have multiple independent confirmations and which rest on a single source."
        },
        {
          "label": "Phase 4 - Synthesis",
          "desc": "Synthesizer assembles the 7 reports into one document with an executive summary, an option comparison, a list of contradictions, and a recommendation."
        }
      ],
      "inputs": [
        "A research question or decision to make (e.g. which vector DB to pick)",
        "A list of options to compare (if you know them) or an area to study",
        "Success criteria (price, performance, community support)",
        "Optionally earlier reports or documents to include"
      ],
      "outputs": [
        "An ordered report with seven perspectives and links to sources",
        "A short executive summary on the first page",
        "A comparison table of options with pros and cons",
        "A list of contradictions between sources with critic commentary",
        "Confidence scores for every claim and a final recommendation"
      ],
      "does": [
        "Decomposes a complex question into 7 disjoint parts with explicit boundaries",
        "Runs seven researchers in parallel, reducing time to the slowest one",
        "Collects data from many sources (docs, GitHub, Reddit, X, forums, UX, tech)",
        "Catches contradictions between sources via a dedicated critic",
        "Isolates researchers so they do not infect each other with errors (antigroupthink)",
        "Assembles results into one coherent report with a recommendation",
        "Tags the confidence of every claim and the source of evidence",
        "Scales research to enterprise level without loss of quality"
      ],
      "doesNotDo": [
        "Does not write code (no builders on the team)",
        "Does not make decisions - only recommends (the decision belongs to the human)",
        "Does not update data live (it is a one-time snapshot)",
        "Will not replace a domain expert in narrow topics (regulation, medicine)",
        "Does not work well when you only have one source (overkill for that)",
        "Will not finish in 5 minutes (7 parallel researchers + critic take time)",
        "Does not debate (that is Five Minds, not Research Swarm)"
      ],
      "antiPatterns": [
        "Single Source Bias - a researcher ignores their boundaries and reaches into another's source",
        "Consensus Theater - synthesizer hides contradictions instead of showing them",
        "Paper Avalanche - collecting 200 links without prioritization or confidence scoring",
        "Echo Chamber - seven researchers read the same blogs instead of different sources",
        "Unanswered Question - lead assigns 7 different sub-questions but none answers the main one"
      ],
      "keyConcepts": [
        {
          "term": "Lead Researcher Pattern",
          "def": "An Anthropic pattern where the orchestrator decomposes the question and coordinates parallel subagents with explicit scope."
        },
        {
          "term": "Explicit Boundaries",
          "def": "Every researcher gets a clearly defined source area and does not cross into another's turf - reduces duplication."
        },
        {
          "term": "Parallel Subagents",
          "def": "Parallel invocation of many researchers cuts time to the slowest one instead of the sum of all."
        },
        {
          "term": "Critic Loop",
          "def": "A dedicated agent that critiques reports before synthesis - catches contradictions and bias."
        },
        {
          "term": "BM25 Re-ranking",
          "def": "A technique that ranks search results by token relevance - helps prioritize citations."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "10"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.40-3.50"
        },
        {
          "label": "Time",
          "value": "20-35 min"
        }
      ],
      "bestFor": [
        "When you are picking a technology or vendor for serious money and need to compare many sources",
        "When you are doing competitor analysis or a literature review",
        "When a strategic decision requires evidence from many independent perspectives"
      ],
      "worstFor": [
        "When you need code (this preset does not build anything)",
        "When you only have one source of information (overkill)",
        "When the decision must land in 5 minutes (research takes time)"
      ],
      "relatedPresets": [
        "research",
        "deep",
        "five_minds_strategic"
      ],
      "glossary": [
        {
          "term": "lead researcher",
          "definition": "An orchestrator that splits the question into sub-questions and coordinates parallel subagents."
        },
        {
          "term": "explicit boundaries",
          "definition": "Clear source boundaries for every researcher so they do not duplicate work."
        },
        {
          "term": "critic",
          "definition": "An agent that compares reports and catches contradictions before synthesis."
        },
        {
          "term": "synthesizer",
          "definition": "An agent that assembles every report into one coherent document with a recommendation."
        },
        {
          "term": "confidence score",
          "definition": "A 0-1 rating showing how strongly the evidence supports a claim."
        }
      ],
      "learningQuote": "Seven specialists in their own areas see more than one expert trying to cover everything - as long as no one crosses into another's turf.",
      "realExample": "Imagine that you are picking a vector DB for production RAG and the options on the table are Pinecone, Weaviate, Qdrant, Milvus, Chroma, pgvector, and Elasticsearch. Lead splits the question into 7 areas (docs, GitHub issues, Reddit, X signals, forums, UX case studies, benchmarks). Seven researchers work in parallel in their sources, critic catches that Qdrant and Pinecone contradict each other on p99 latency, synthesizer assembles the report with a recommendation: Qdrant for self-hosted + Pinecone for managed."
    },
    "migration_crew": {
      "tagline": "Renovating a house that must stay occupied - three specialists with disjoint zones",
      "missionShort": "Migration Crew is a 10-agent team for safely migrating a legacy system. Three parallel explorers read disjoint code areas (auth, data, routing), the planner proposes strategies (big-bang vs strangler), a HITL gate decides, and the team builds under tester supervision. It minimizes risk and gives humans control over irreversible decisions.",
      "whoIs": "This preset is for teams that must migrate a platform running in production that can't be taken offline. Ideal for Java 8 to 21, Angular to React, Python 2 to 3, REST to GraphQL, or breaking up a monolith. Not for greenfield projects or full rewrites from scratch.",
      "analogy": "This preset is like restoring a heritage building with three conservator teams, where one handles the foundation, another the utilities, and a third the facade, and none crosses into another's zone.",
      "howItWorks": [
        {
          "label": "Phase 1 - Inventory",
          "desc": "Analyst maps the legacy system: dependencies, hot paths, risk areas. Planner splits the code into 3 disjoint zones for explorers."
        },
        {
          "label": "Phase 2 - Parallel exploration",
          "desc": "Three specialists read their zones in parallel (auth, data, routing). Each returns a report with file count, dependency depth, and strategy proposal."
        },
        {
          "label": "Phase 3 - HITL decision gate",
          "desc": "Decision presenter aggregates 3 reports and presents the human with a choice: big-bang vs strangler fig vs dual-write. The human signs off on the plan."
        },
        {
          "label": "Phase 4 - Migration and verification",
          "desc": "Three builders execute the migration in their zones with shadow traffic. QA verifies backward compatibility and confirms old clients still work."
        }
      ],
      "inputs": [
        "Access to the legacy code with git history",
        "Migration target (language/framework/protocol version)",
        "List of critical dependencies and external integrations",
        "Maintenance window (whether a downtime is possible)"
      ],
      "outputs": [
        "Dependency map of the legacy system with hot paths",
        "Three parallel exploration reports (one per zone)",
        "Migration plan comparing options (big-bang vs strangler vs dual-write)",
        "New versions of the most critical parts with backward compatibility",
        "Regression tests and a compatibility verification report"
      ],
      "does": [
        "Splits legacy code into three disjoint zones with explicit scope",
        "Explores code in parallel, cutting time by 60%",
        "Stops before irreversible decisions for human sign-off",
        "Proposes strangler fig strategy instead of big-bang rewrite",
        "Preserves backward compatibility via shadow traffic and dual-write",
        "Migrates piece by piece with the option to roll back each step",
        "Tests regressions for legacy clients",
        "Documents every migration decision with a rationale"
      ],
      "doesNotDo": [
        "Doesn't apply to greenfield projects (nothing to migrate)",
        "Doesn't do a full rewrite from scratch (different scope)",
        "Doesn't work without access to the legacy code",
        "Doesn't decide big-bang vs strangler for you (that's the HITL gate)",
        "Doesn't migrate runtime data (code and schema only)",
        "Doesn't guarantee zero downtime without proper infrastructure",
        "Doesn't replace integration tests for the whole system"
      ],
      "antiPatterns": [
        "Big Bang Overnight - trying to migrate the whole system in one deployment with no feature flag",
        "Silent Incompatibility - the new API version breaks old clients without warning",
        "Shared Scope - two explorers read the same file and give conflicting proposals",
        "Missing Rollback - the plan has no rollback mechanism if something goes wrong",
        "Skipped HITL - the team bypasses the decision gate and picks a strategy for the human"
      ],
      "keyConcepts": [
        {
          "term": "Strangler Fig Pattern",
          "def": "Gradual migration where the new system wraps the old one and replaces it piece by piece, like a strangler fig enveloping a tree."
        },
        {
          "term": "Dual-Write",
          "def": "Technique of writing data to both the old and new systems at once during the transition period."
        },
        {
          "term": "Shadow Traffic",
          "def": "A copy of production traffic routed in parallel to the new system without affecting users."
        },
        {
          "term": "Exploration Phase",
          "def": "Reading code without changing it to understand dependencies before proposing a strategy."
        },
        {
          "term": "HITL Gate",
          "def": "A pipeline checkpoint where a human must sign off on a decision before the next step."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "10"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.10-2.80"
        },
        {
          "label": "Time",
          "value": "25-45 min"
        }
      ],
      "bestFor": [
        "When you're migrating a working system to a new language or framework version",
        "When you're splitting a monorepo into smaller services or breaking up a monolith",
        "When you're moving from REST to GraphQL or from one database to another"
      ],
      "worstFor": [
        "When you're starting a project from scratch (nothing to migrate)",
        "When you're planning a full rewrite from zero (different scope)",
        "When you don't have access to the legacy code or its history"
      ],
      "relatedPresets": [
        "legacy",
        "api_modern",
        "plan_exec"
      ],
      "glossary": [
        {
          "term": "strangler fig",
          "definition": "Gradual migration pattern where the new system wraps the old one and replaces it piece by piece."
        },
        {
          "term": "big-bang migration",
          "definition": "One-shot migration of the entire system in a single deployment - high risk."
        },
        {
          "term": "dual-write",
          "definition": "Writing to both the old and new systems at once during the transition period."
        },
        {
          "term": "shadow traffic",
          "definition": "Parallel copying of production traffic to the new system without affecting users."
        },
        {
          "term": "HITL gate",
          "definition": "A decision gate where a human signs off on the plan before further action."
        }
      ],
      "learningQuote": "You don't always have to rewrite everything from scratch - sometimes the safest path is swapping the engine in a plane mid-flight, piece by piece.",
      "realExample": "Imagine that you have a 2014 Ruby on Rails monolith running in production and serving 50,000 customers. You want to move to Node.js + GraphQL but you can't take the service offline. Migration Crew runs an inventory (250 models, 80 controllers), 3 explorers map auth/data/routing in parallel, and the planner proposes strangler fig with a 6-month dual-write window. The human signs off on the strategy, the team migrates piece by piece starting with the simplest endpoints, and shadow traffic verifies compatibility."
    },
    "fullstack_premium": {
      "tagline": "A feature ready for real customers - with DBA, monitoring, and audit in one pipeline",
      "missionShort": "Full-Stack Premium is a 12-agent team built on the wshobson fullstack baseline plus three specialists that are usually missing: database architect, observability engineer, and UX researcher. Backend and frontend work on disjoint file globs, and a security audit plus monitoring setup closes every feature. For features that MUST work reliably.",
      "whoIs": "This preset is for teams building customer-facing features that can't afford production bugs. Ideal for SaaS dashboards, payment systems, user authentication, and anything that touches real money. Not for prototypes, MVPs, or small internal tools.",
      "analogy": "This preset is like an architecture studio with a dedicated urban planner and meteorologist, where no project moves without a water and sewer plan and without weather monitoring.",
      "howItWorks": [
        {
          "label": "Phase 1 - Research and planning",
          "desc": "Orchestrator coordinates, planners draft the plan, two researchers work in parallel (UX from interviews and docs from documentation) to gather context. Db_architect designs the schema and indexes."
        },
        {
          "label": "Phase 2 - Parallel build",
          "desc": "Four agents in parallel on disjoint file globs: designer builds UI, backend implements the API, frontend wires it to the UI, integrator ties it all together. Each has its own file scope and doesn't touch anyone else's."
        },
        {
          "label": "Phase 3 - Observability setup",
          "desc": "Observability engineer configures the three pillars: metrics (SLI/SLO), structured logs, and traces. Defines the dashboard and alerts before shipping to production."
        },
        {
          "label": "Phase 4 - Security audit and QA",
          "desc": "Qa_security runs an audit (OWASP, secrets, auth), qa_quality tests the feature end-to-end, manager signs off as ready-for-production with a risk summary."
        }
      ],
      "inputs": [
        "Feature description from the customer's perspective (user story or JTBD)",
        "Existing tech stack and system constraints",
        "SLOs (e.g. latency p99 < 200ms, uptime > 99.9%)",
        "Access to the production database and observability stack"
      ],
      "outputs": [
        "Ready feature with a designed database and indexes",
        "Observability dashboard (metrics, logs, traces) with alerts",
        "Security audit report (OWASP Top 10, secrets, auth)",
        "User interface grounded in UX interviews",
        "Technical documentation and an incident runbook"
      ],
      "does": [
        "Designs database schema with indexes and zero-downtime migrations",
        "Configures observability (three pillars: metrics, logs, traces)",
        "Runs UX research before mockups - avoids guessing needs",
        "Builds backend and frontend in parallel on disjoint file globs",
        "Audits security before every deployment",
        "Defines SLIs and SLOs instead of vanity metrics",
        "Writes an incident runbook for the on-call",
        "Integrates all parts into one coherent ready feature"
      ],
      "doesNotDo": [
        "Not for hackathon prototypes (too heavy)",
        "Not for small internal tools (overkill)",
        "Doesn't work without an existing tech stack",
        "Doesn't replace a proper CI/CD process (only generates code)",
        "Doesn't deploy to production itself (needs a pipeline)",
        "Doesn't solve organizational problems (culture issues)",
        "Doesn't write fine-tuned ML models (different scope)"
      ],
      "antiPatterns": [
        "Dashboard Theater - metrics with no alerts that no one watches",
        "Schema After Build - db_architect comes in after the code instead of before",
        "Vanity SLO - SLO set at 100% with no error budget",
        "UX Skipped - designer makes mockups without a customer interview",
        "Security At End - security audit as the last step instead of a continuous practice"
      ],
      "keyConcepts": [
        {
          "term": "Three Pillars Observability",
          "def": "Metrics + logs + traces as the three pillars of observability for a production system."
        },
        {
          "term": "SLI/SLO",
          "def": "Service Level Indicator is a measurable metric, Objective is a target expressed as a percentage over a time window."
        },
        {
          "term": "Zero-Downtime Migration",
          "def": "Database schema migration without user downtime - requires disjoint steps add-backfill-swap-drop."
        },
        {
          "term": "Disjoint File Globs",
          "def": "Backend and frontend have defined disjoint file scopes so they don't collide in commits."
        },
        {
          "term": "Error Budget",
          "def": "The allowed percentage of errors before the SLO - a tradeoff between stability and deployment velocity."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "12"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.55-3.85"
        },
        {
          "label": "Time",
          "value": "30-60 min"
        }
      ],
      "bestFor": [
        "When you're building a feature visible to paying customers (login, payments, dashboards)",
        "When the product has SLOs and you need to monitor performance in production",
        "When an unexpected bug would cost more than the whole team"
      ],
      "worstFor": [
        "When you're prototyping for a hackathon or an MVP demo",
        "When you're building a small internal tool for 5 people",
        "When you don't yet have any working stack"
      ],
      "relatedPresets": [
        "saas",
        "full",
        "standard"
      ],
      "glossary": [
        {
          "term": "observability",
          "definition": "The ability to understand a system's internal state from metrics, logs, and traces."
        },
        {
          "term": "SLI",
          "definition": "Service Level Indicator - a measurable metric like latency or error rate."
        },
        {
          "term": "SLO",
          "definition": "Service Level Objective - a target for an SLI expressed as a percentage over a time window."
        },
        {
          "term": "db_architect",
          "definition": "Dedicated agent for designing database schema, indexes, and zero-downtime migrations."
        },
        {
          "term": "disjoint file globs",
          "definition": "Disjoint file scopes for backend and frontend to avoid collisions in the repo."
        }
      ],
      "learningQuote": "A feature that runs on a developer's laptop and a feature that's ready for customers are two different things - DB design, observability, and security audit turn one into the other.",
      "realExample": "Imagine that you're building a new analytics dashboard for SaaS customers with live charts and CSV export. A standard team ships it in a week, but in production it turns out queries are choking the database, there are no alerts when the endpoint goes down, and the export leaks data across tenants. Full-Stack Premium adds a db_architect who designs indexes for hot queries, an observability engineer who configures a dashboard with an SLO of p99 latency < 300ms, a UX researcher who confirms what customers actually want to export, and a qa_security who catches the multi-tenant leak."
    },
    "security_multi_vector": {
      "tagline": "Five independent scanners in parallel - each on a different attack vector",
      "missionShort": "Multi-Vector Security is a 9-agent team that scans five disjoint attack vectors in parallel (code, dependencies, infrastructure, secrets, auth) after a STRIDE threat model. Qa_manager aggregates findings into a severity matrix, and a HITL gate gives the human a GO/NO-GO decision before release. Compatible with SOC2 and OWASP ASVS.",
      "whoIs": "This preset is for teams that need to run a security audit before a launch or after an incident. Ideal for customer-facing apps, SOC2 prep, and responding to an enterprise customer's risk assessment. Not for continuous background scanning (use automation) or small internal apps.",
      "analogy": "This preset is like a counter-terrorism team sweeping a building, where each agent owns a section (ground floor, basement, roof, utilities, perimeter) and at the end everyone reports to the commander who gives GO/NO-GO.",
      "howItWorks": [
        {
          "label": "Phase 1 - STRIDE threat modeling",
          "desc": "Analyst builds a STRIDE threat model (Spoofing, Tampering, Repudiation, Info Disclosure, Denial, Elevation). Splits the attack surface into 5 disjoint vectors."
        },
        {
          "label": "Phase 2 - 5 parallel scanners",
          "desc": "Five scanners run in parallel: qa_security on code (SAST), scanner on dependencies (SBOM, CVE), infra (IaC misconfig), secrets (TruffleHog patterns), auth (OWASP ASVS)."
        },
        {
          "label": "Phase 3 - Aggregation and severity",
          "desc": "Qa_manager collects results, dedupes findings, maps to CVSS severity, builds a release-blocking matrix with P0/P1/P2 priorities."
        },
        {
          "label": "Phase 4 - Release HITL gate",
          "desc": "Decision presenter shows the human a list of P0/P1 findings, proposed fixes, and risks. The human signs GO/NO-GO before release."
        }
      ],
      "inputs": [
        "Access to the repo with code and git history",
        "Dependency manifest (package.json, requirements.txt, go.mod)",
        "Infrastructure definition (Terraform, Kubernetes, Docker)",
        "Business context (what the app does, who the users are)"
      ],
      "outputs": [
        "STRIDE threat model with attack surface",
        "Full audit across five disjoint areas",
        "Findings list ordered from P0 to P3 with CVSS",
        "SBOM with known CVEs in dependencies",
        "GO/NO-GO decision with rationale and a remediation plan"
      ],
      "does": [
        "Models threats with STRIDE before scanning",
        "Runs 5 independent scanners in parallel (SAST, SBOM, IaC, secrets, auth)",
        "Aggregates results and dedupes duplicates across scanners",
        "Maps findings to CVSS and builds a release-blocking matrix",
        "Checks OWASP ASVS compliance for auth and session",
        "Generates an SBOM with CVEs in dependencies",
        "Gives the human a GO/NO-GO decision with full context",
        "Produces a report aligned with SOC2 and ISO27001"
      ],
      "doesNotDo": [
        "Doesn't replace continuous background scanning (use Snyk, Dependabot)",
        "Doesn't fix bugs on its own (that's the developer's job)",
        "Isn't a pentest (code and config audit only)",
        "Doesn't replace an external SOC2 auditor",
        "Doesn't test runtime anomalies (that's WAF and SIEM territory)",
        "Doesn't check business logic flaws (needs a domain expert)",
        "Doesn't work without business context for the app"
      ],
      "antiPatterns": [
        "CVE Tsunami - 500-finding report with no prioritization or severity",
        "Missing Threat Model - scanning without STRIDE loses business context",
        "Shared Vector - two scanners check the same thing instead of disjoint areas",
        "Silent GO - release ships without a human HITL decision",
        "Severity Theater - every finding marked Critical to force a fix"
      ],
      "keyConcepts": [
        {
          "term": "STRIDE",
          "def": "Microsoft threat model covering Spoofing, Tampering, Repudiation, Info Disclosure, Denial, Elevation."
        },
        {
          "term": "SAST",
          "def": "Static Application Security Testing - analyzing source code without running the program."
        },
        {
          "term": "DAST",
          "def": "Dynamic Application Security Testing - testing an application running in a test environment."
        },
        {
          "term": "SBOM",
          "def": "Software Bill of Materials - a list of all dependencies with versions for CVE audits."
        },
        {
          "term": "OWASP ASVS",
          "def": "Application Security Verification Standard - security checklists for auth, session, and data."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "9"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.20-3.00"
        },
        {
          "label": "Time",
          "value": "25-50 min"
        }
      ],
      "bestFor": [
        "When you're prepping to launch a customer-facing feature",
        "When you're responding to an enterprise customer risk assessment or SOC2 audit",
        "When you've had an incident and need a full verification before relaunching"
      ],
      "worstFor": [
        "When you need continuous background scanning (use automated tools)",
        "When you don't yet have a threat model or business context",
        "When you're building a small internal tool for 5 people (overkill)"
      ],
      "relatedPresets": [
        "security",
        "soc2_sweep",
        "test_suite"
      ],
      "glossary": [
        {
          "term": "STRIDE",
          "definition": "Threat model splitting risks into Spoofing, Tampering, Repudiation, Info Disclosure, Denial, Elevation."
        },
        {
          "term": "SAST",
          "definition": "Static Application Security Testing - scanning code without running it."
        },
        {
          "term": "SBOM",
          "definition": "Software Bill of Materials - dependency list for CVE audits."
        },
        {
          "term": "CVSS",
          "definition": "Common Vulnerability Scoring System - a 0-10 scale for vulnerability severity."
        },
        {
          "term": "OWASP ASVS",
          "definition": "Application Security Verification Standard - application security standard."
        }
      ],
      "learningQuote": "One scanner always misses something - only five parallel scanners on disjoint areas plus a human at the end give real coverage.",
      "realExample": "Imagine that your SaaS platform launches in a week and an enterprise customer wants a security report before signing a $500k contract. Multi-Vector Security runs STRIDE (spoofing in OAuth? tampering in webhooks?), five scanners in parallel catch 3 high-severity issues (SQL injection in search, an exposed AWS key in .env.example, missing CSP header), qa_manager aggregates into a release-blocking matrix, decision presenter shows the human who picks NO-GO with a 48-hour fix plan before launch."
    },
    "perf_squad": {
      "tagline": "Three hypotheses instead of one - Devil's Advocate challenges each, measurement gives proof",
      "missionShort": "Performance Squad is an 8-agent team for root-cause analysis of performance regressions. Three layer specialists (db, backend, frontend) propose independent hypotheses, Five Minds Devil attacks each one hunting for logical flaws, and qa_perf benchmarks the final fixes. Output: an RCA doc with before/after measurements and concrete fix locations ordered by biggest impact.",
      "whoIs": "This preset is for teams that noticed a performance regression after the latest deployment and don't know where it's coming from. Ideal for prod regression triage, p99 latency spikes, memory leaks, and cost optimization. Not for micro-optimization or problems outside the app (network, vendor).",
      "analogy": "This preset is like a medical response team with three specialists and a prosecutor, where a cardiologist, neurologist, and internist each propose a diagnosis, the prosecutor challenges each one, and the lab tests the final therapy with a stopwatch.",
      "howItWorks": [
        {
          "label": "Phase 1 - Profiling and baseline",
          "desc": "Analyst collects profiles, traces, and metrics. Establishes baseline (what it was before the regression) and delta (what got worse). Splits the problem into 3 layers."
        },
        {
          "label": "Phase 2 - Parallel hypothesizing",
          "desc": "Three layer specialists (db_architect, backend, frontend) propose independent hypotheses. Each suggests a root cause and fix. They work in parallel without sharing ideas."
        },
        {
          "label": "Phase 3 - Devil adversarial",
          "desc": "Five Minds Devil attacks each hypothesis hunting for logical holes: is it really that, what if the benchmark ran in the wrong environment, what if the fix shifts the problem instead of solving it."
        },
        {
          "label": "Phase 4 - Benchmark and RCA doc",
          "desc": "Qa_perf runs benchmarks on the best candidates (before and after fix), writes an RCA doc with measurements, regression timeline, and rollout plan for the fix."
        }
      ],
      "inputs": [
        "Baseline metrics (latency/memory/cost before the regression)",
        "Access to profiles and traces from production",
        "List of recent deployments and config changes",
        "Regression time window (from when to when)"
      ],
      "outputs": [
        "RCA doc with three hypotheses and counter-hypotheses",
        "Concrete fix locations ordered by biggest impact",
        "Benchmark measurements before and after (latency, memory, throughput)",
        "Regression timeline correlated with code changes",
        "Rollout plan for the fix with rollback option"
      ],
      "does": [
        "Profiles the system and establishes baseline vs current metrics",
        "Splits analysis into three layers (db, backend, frontend)",
        "Generates three independent hypotheses instead of one guess",
        "Uses Devil to challenge each hypothesis (anti-groupthink)",
        "Measures fix impact before committing (benchmark before and after)",
        "Documents the golden path and bottleneck on a flame graph",
        "Computes fix value in useful units (ms, $, MB)",
        "Delivers a rollout plan with rollback option"
      ],
      "doesNotDo": [
        "Not for premature micro-optimization",
        "Not for problems outside the app (network, vendor, CDN)",
        "Doesn't work without profiles and baseline metrics",
        "Doesn't predict future regressions (only analyzes the current one)",
        "Doesn't replace continuous production monitoring",
        "Doesn't do capacity planning (different scope)",
        "Doesn't optimize UX (technical metrics only)"
      ],
      "antiPatterns": [
        "Single Hypothesis - one specialist bets on a single theory with no alternatives",
        "Missing Baseline - no pre-regression measurement makes comparison impossible",
        "Fix Without Benchmark - deploying a fix without confirming it actually helped",
        "Skipped Devil - team skips the adversarial challenge and runs with the first hypothesis",
        "Environment Mismatch - benchmarks in an environment that doesn't match production"
      ],
      "keyConcepts": [
        {
          "term": "Root Cause Analysis",
          "def": "A method for finding the underlying cause of a problem instead of treating symptoms."
        },
        {
          "term": "Flame Graph",
          "def": "Visualization of a CPU profile showing which functions consume the most time."
        },
        {
          "term": "Golden Path",
          "def": "The most important user flow that must stay fast no matter what else happens."
        },
        {
          "term": "Baseline vs Optimized",
          "def": "Measurement of the state before and after optimization, enabling delta calculation."
        },
        {
          "term": "Devil Advocacy",
          "def": "Formal challenge of every hypothesis to find weaknesses in the reasoning."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "8"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.95-2.40"
        },
        {
          "label": "Time",
          "value": "20-40 min"
        }
      ],
      "bestFor": [
        "When the app started running slower after the latest deployment and you don't know why",
        "When p99 latency suddenly spiked or a memory leak is eating resources",
        "When you want to cut server costs but don't know where the bottlenecks are"
      ],
      "worstFor": [
        "When you have no measurements or profiles at all (turn on monitoring first)",
        "When the problem is in the network, at a vendor, or in a CDN (other layers)",
        "When you want to optimize preemptively without a measured problem"
      ],
      "relatedPresets": [
        "perf_boost",
        "bug_hunt",
        "incident_war_room"
      ],
      "glossary": [
        {
          "term": "RCA",
          "definition": "Root Cause Analysis - a method for finding the underlying cause instead of treating symptoms."
        },
        {
          "term": "flame graph",
          "definition": "Visualization of a CPU profile showing function costs as flame-shaped bars."
        },
        {
          "term": "baseline",
          "definition": "A pre-change measurement enabling comparison."
        },
        {
          "term": "p99 latency",
          "definition": "The 99th percentile response time - the upper tail of the distribution."
        },
        {
          "term": "Devil Advocacy",
          "definition": "Formal challenge of every hypothesis to find weaknesses."
        }
      ],
      "learningQuote": "Without measurement every optimization is guessing - Performance Squad forces three hypotheses, challenges them, and measures before and after.",
      "realExample": "Imagine that after a Friday deploy, API p99 latency jumps from 150ms to 900ms and customers start complaining. Three specialists propose hypotheses in parallel: db_architect bets on a missing index on a new query, backend bets on an N+1 in the ORM, frontend bets on a blocking fetch in middleware. Devil attacks each one: \"what if it's deploy warm-up\", \"what if Redis died\", \"what if it's just one endpoint\". Qa_perf benchmarks each hypothesis in staging and confirms it's an N+1 query - the fix deploy drops p99 to 180ms."
    },
    "prd_to_launch": {
      "tagline": "From customer conversation to ready launch package - PRD plus tickets plus mockups plus GTM",
      "missionShort": "PRD to Launch is an 11-agent team that turns informal input (an idea, recording, transcript) into a full launch package. Analyst extracts JTBD, writer drafts the PRD, and a parallel build generates RICE-scored tickets, screen mockups, marketing copy, and a GTM plan. PM sign-off closes the pipeline.",
      "whoIs": "This preset is for product managers who have an idea or a customer call transcript and need to turn it into a full package for the team. Ideal when you're syncing departments before a launch or planning a big new feature before the quarter. Not for implementing code or purely technical decisions.",
      "analogy": "This preset is like a film studio from script to premiere, where the screenwriter pulls out the theme, the director writes the PRD, and production teams work in parallel on costumes, sets, camera, and marketing.",
      "howItWorks": [
        {
          "label": "Phase 1 - JTBD extraction",
          "desc": "Analyst listens to the transcript or reads the idea and extracts Jobs-to-be-Done: what the customer is trying to achieve, what frustrates them, what their current workarounds are. Formulates the problem statement."
        },
        {
          "label": "Phase 2 - PRD writing",
          "desc": "Writer creates a structured PRD: problem, proposal, success metrics, scope, non-goals, risks, dependencies. Document ready for team review."
        },
        {
          "label": "Phase 3 - Parallel build",
          "desc": "Planner generates tickets with RICE scoring and a schedule. Designer mocks key screens. Writer drafts marketing copy. Gtm_strategist builds a launch plan with ICP and pricing."
        },
        {
          "label": "Phase 4 - PM sign-off",
          "desc": "Decision presenter aggregates all deliverables (PRD, tickets, mockups, copy, GTM) and presents them to the PM for approval. PM signs launch readiness."
        }
      ],
      "inputs": [
        "Customer call transcript or a raw idea",
        "Existing product context (personas, stack, roadmap)",
        "Launch budget and timeline",
        "List of stakeholders to involve"
      ],
      "outputs": [
        "PRD structured as problem/proposal/metrics/risks",
        "Ticket list for the team with RICE and a schedule",
        "Screen mockups for the key user flows",
        "Marketing copy (landing, emails, social, release notes)",
        "GTM plan with ICP, pricing, channels, and success metrics"
      ],
      "does": [
        "Extracts Jobs-to-be-Done from informal input",
        "Writes a PRD aligned with product best practices",
        "Generates tickets with RICE scoring (Reach, Impact, Confidence, Effort)",
        "Mocks key screens before implementation",
        "Writes marketing copy tailored to the persona",
        "Builds a GTM plan with ICP, pricing, and channels",
        "Syncs all deliverables into one package",
        "Forces PM sign-off before launch"
      ],
      "doesNotDo": [
        "Doesn't write code (that's a different preset like saas or fullstack_premium)",
        "Doesn't make technology decisions (no tech researchers)",
        "Doesn't work without customer contact (no voice of customer)",
        "Isn't a substitute for a Product Manager - it supports one",
        "Doesn't do user research (that's design_sys or ui_overhaul)",
        "Doesn't run marketing campaigns (only designs them)",
        "Doesn't define company strategy (that's five_minds_strategic)"
      ],
      "antiPatterns": [
        "Solution First - writing a PRD without JTBD and building a solution for a nonexistent problem",
        "Ticket Dump - planner generates 200 tickets with no RICE prioritization",
        "Copy Before Message - writer drafts copy without approved positioning",
        "GTM Without ICP - gtm_strategist plans channels without a defined ideal customer",
        "Skipped Sign-off - team starts building without PM sign-off and flies with no pilot"
      ],
      "keyConcepts": [
        {
          "term": "JTBD",
          "def": "Jobs-to-be-Done - framework that frames the problem from the angle of \"the customer is trying to achieve X\"."
        },
        {
          "term": "RICE",
          "def": "Ticket prioritization via Reach x Impact x Confidence / Effort - helps pick the most valuable work."
        },
        {
          "term": "PRD",
          "def": "Product Requirements Document - a document describing what and why we're building."
        },
        {
          "term": "GTM",
          "def": "Go-to-Market - plan for bringing a product to market with ICP, pricing, and channels."
        },
        {
          "term": "ICP",
          "def": "Ideal Customer Profile - precise description of the most valuable customer type to target."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "11"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.30-3.30"
        },
        {
          "label": "Time",
          "value": "30-50 min"
        }
      ],
      "bestFor": [
        "When you have a customer call recording but don't know where to start",
        "When you're planning a big new feature before quarterly planning",
        "When you need to sync product, engineering, and marketing before launch"
      ],
      "worstFor": [
        "When you want to write code (wrong preset)",
        "When you're deciding a purely technical choice (framework, database)",
        "When you have zero customer contact (no voice of customer)"
      ],
      "relatedPresets": [
        "startup",
        "feature_sprint",
        "content"
      ],
      "glossary": [
        {
          "term": "JTBD",
          "definition": "Jobs-to-be-Done - framework framing the problem from the customer's goal."
        },
        {
          "term": "PRD",
          "definition": "Product Requirements Document - a document describing what and why we're building."
        },
        {
          "term": "RICE",
          "definition": "Prioritization by Reach x Impact x Confidence / Effort."
        },
        {
          "term": "GTM",
          "definition": "Go-to-Market - plan for bringing a product to market."
        },
        {
          "term": "ICP",
          "definition": "Ideal Customer Profile - description of the most valuable customer to target."
        }
      ],
      "learningQuote": "An idea with no PRD or mockups is just a wish - PRD to Launch turns a raw idea into a package ready for execution in a single pass.",
      "realExample": "Imagine that you have an hour-long transcript with an enterprise customer who complains they can't see what's happening in their subscription. Analyst extracts JTBD (the customer wants to forecast costs before the invoice), writer drafts a PRD for a Usage Forecast Dashboard, planner generates 12 RICE-scored tickets, designer mocks 3 screens, writer drafts an announcement email, and gtm_strategist plans a launch for the 50 biggest accounts with a webinar. PM signs the package and the team has everything for quarterly planning."
    },
    "ab_test_lab": {
      "tagline": "An honest A/B test instead of stretched statistics - power calc plus Devil plus stat sign-off",
      "missionShort": "A/B Test Lab is a 7-agent team for rigorously designing A/B tests. Statistician computes sample size and power, designer mocks the variants, Devil red-teams p-hacking risks (SRM, peeking, Simpson's paradox), and decision presenter forces stat sign-off before launch. Protects the company from false conclusions from bad tests.",
      "whoIs": "This preset is for teams planning an important A/B test (pricing, onboarding, checkout, landing) that can't afford to make decisions based on stretched statistics. Ideal when the decision depends on the test outcome. Not for minor cosmetic changes or projects with low traffic.",
      "analogy": "This preset is like a pharmaceutical lab designing a clinical trial, where a biostatistician computes power, a clinician designs the arms, a prosecutor hunts for biases, and the IRB approves the plan before start.",
      "howItWorks": [
        {
          "label": "Phase 1 - Problem framing",
          "desc": "Analyst defines the business hypothesis, primary metric, and minimum detectable effect (MDE). Checks that the test is ethical and has a clear decision direction."
        },
        {
          "label": "Phase 2 - Statistical design",
          "desc": "Statistician computes sample size from MDE, baseline conversion, power (0.8), and alpha (0.05). Proposes test duration and allocation strategy."
        },
        {
          "label": "Phase 3 - Variants and p-hacking audit",
          "desc": "Designer mocks variants (A baseline, B, optionally C). Devil red-teams the plan: SRM risk, peeking problem, Simpson's paradox, novelty effect, carryover. Flags all potential biases."
        },
        {
          "label": "Phase 4 - Stat sign-off",
          "desc": "Decision presenter aggregates design, sample size, and Devil findings. Presents the plan to stakeholders who sign stat sign-off before the test launches."
        }
      ],
      "inputs": [
        "Business hypothesis and proposed change",
        "Baseline metrics (conversion rate, revenue, churn)",
        "Expected minimum detectable effect (MDE)",
        "Access to traffic logs and the experimentation platform"
      ],
      "outputs": [
        "Test plan with computed sample size and duration",
        "Two or more variants ready to ship",
        "List of p-hacking traps to avoid (SRM, peeking, Simpson)",
        "Success criteria and a decision tree defined up front",
        "Signed stat sign-off document before test launch"
      ],
      "does": [
        "Computes sample size from power analysis",
        "Designs variants with clear differences",
        "Audits the plan for p-hacking (SRM, peeking, Simpson)",
        "Forces success criteria to be set before start",
        "Protects against novelty effect and carryover bias",
        "Checks that the baseline is sufficient (>1000 conversions)",
        "Builds a decision tree (what we do for each outcome)",
        "Documents everything for stat sign-off"
      ],
      "doesNotDo": [
        "Doesn't run the test itself (that's the experimentation platform)",
        "Doesn't analyze results post-hoc (different workflow)",
        "Doesn't work without baseline metrics",
        "Not suitable for low traffic (<1000 conversions)",
        "Doesn't test ethically questionable changes without review",
        "Doesn't replace a data engineer (only designs the test)",
        "Isn't a substitute for product analytics"
      ],
      "antiPatterns": [
        "Peeking - checking results daily and stopping the test when you see \"significance\"",
        "Underpowered Test - sample size too small, the result is random and conclusions are fictional",
        "SRM Ignored - sample ratio mismatch ignored because it's a \"small difference\"",
        "Simpson Trap - aggregating results hides a segment where the effect is reversed",
        "Post-hoc Hypothesis - changing the primary metric after seeing the results"
      ],
      "keyConcepts": [
        {
          "term": "Power Analysis",
          "def": "Computing the probability of detecting a real effect of a given size at a given sample size."
        },
        {
          "term": "MDE",
          "def": "Minimum Detectable Effect - the smallest effect the test can detect statistically."
        },
        {
          "term": "SRM",
          "def": "Sample Ratio Mismatch - unintended imbalance between A/B groups that corrupts the results."
        },
        {
          "term": "Sequential Testing",
          "def": "Method that allows peeking at results without inflating alpha error."
        },
        {
          "term": "Novelty Effect",
          "def": "Short-term metric bump caused by the novelty of the variant rather than its real value."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "7"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.80-2.00"
        },
        {
          "label": "Time",
          "value": "15-30 min"
        }
      ],
      "bestFor": [
        "When you're planning a new pricing test or a checkout flow change",
        "When you're testing a landing page for a big marketing campaign",
        "When you need to defend test results to the board or analysts"
      ],
      "worstFor": [
        "When you have too few users (the test would run for months)",
        "When it's a minor cosmetic change with no business consequences",
        "When you don't yet know what you want to measure"
      ],
      "relatedPresets": [
        "data_analysis_pipe",
        "perf_squad",
        "startup"
      ],
      "glossary": [
        {
          "term": "power",
          "definition": "Probability of detecting an effect in a test when the effect really exists."
        },
        {
          "term": "MDE",
          "definition": "Minimum Detectable Effect - the smallest effect detectable statistically."
        },
        {
          "term": "SRM",
          "definition": "Sample Ratio Mismatch - unintended imbalance between groups."
        },
        {
          "term": "p-hacking",
          "definition": "Manipulating the analysis to get a significant result (cherry picking, peeking)."
        },
        {
          "term": "alpha",
          "definition": "Type I error threshold - probability of a false positive result (usually 0.05)."
        }
      ],
      "learningQuote": "A bad test gives false conclusions, and decisions based on bad tests cost more than the entire infrastructure - A/B Test Lab protects against that with one signature.",
      "realExample": "Imagine that the CEO wants to raise prices by 20% and the product director proposes an A/B test. Analyst formulates the hypothesis (net revenue effect), statistician computes that with baseline 3% conversion and MDE +5% revenue you need 28,000 users per variant and the test must run 14 days. Devil flags three risks: SRM because the cache remembers the user, peeking because the CEO will check daily, Simpson because mobile vs desktop have different effects. Decision presenter presents the plan with safeguards (sequential testing, no peeking, segmentation) and the CEO signs stat sign-off."
    },
    "kb_constructor": {
      "tagline": "Four agents in parallel clean Slack, wiki, PDFs, and GitHub into one knowledge base",
      "missionShort": "KB Constructor is a 10-agent team for building a knowledge base from scattered sources. Four ingesters in parallel normalize Slack, wiki, PDFs, and GitHub into a shared chunk format, a deduplicator removes repeats, a writer drafts articles, a critic fact-checks, and an integrator publishes. For companies that have drowned their knowledge in silos.",
      "whoIs": "A preset for teams whose knowledge is spread across many sources and who want to merge it into one knowledge base. Ideal for onboarding new hires, migrating a wiki from Confluence to Notion, or a customer support base. Not for a single source, and not for a base that needs continuous real-time updates.",
      "analogy": "This preset is like a digital library that hires four archivists, each specialized in a different format (journals, manuscripts, microfilm, books), and then an editor writes the entries and a press publishes them.",
      "howItWorks": [
        {
          "label": "Phase 1 - Parallel ingest",
          "desc": "Four ingesters work in parallel, each on its own source: Slack (channels + messages), wiki (pages + metadata), PDFs (text + structure extraction), GitHub (README + docs). Each returns chunks in a unified format."
        },
        {
          "label": "Phase 2 - Dedup and structuring",
          "desc": "The deduplicator uses embeddings and fuzzy matching to remove duplicates (when two sources say the same thing). It groups related chunks into topics and proposes a category structure."
        },
        {
          "label": "Phase 3 - Writing and fact-check",
          "desc": "The writer drafts articles from the best chunks, preserving links to originals. The critic verifies that every fact has a source and flags contradictions."
        },
        {
          "label": "Phase 4 - Publish and reranking",
          "desc": "The integrator publishes to the target system (Notion, Confluence, custom). It configures a reranker for search and tests recall against a sample of queries."
        }
      ],
      "inputs": [
        "List of sources with access credentials (Slack token, wiki creds, PDFs, repo)",
        "Target system (Notion, Confluence, custom)",
        "Category structure (optional - the system can propose one)",
        "List of critical questions for recall testing"
      ],
      "outputs": [
        "Knowledge base structure (categories and tags)",
        "Articles organized by topic with links to sources",
        "Deduplicated chunks ready for embedding",
        "Fact-check report with a list of contradictions",
        "Ready-to-import package for the target system"
      ],
      "does": [
        "Normalizes data from four different sources into one shared format",
        "Dedupes chunks using embeddings and fuzzy matching",
        "Generates a category structure from topics",
        "Writes articles while preserving links to original sources",
        "Fact-checks every claim before publication",
        "Configures a reranker for search quality",
        "Tests recall against a defined query set",
        "Publishes to the target system"
      ],
      "doesNotDo": [
        "Doesn't work with a single source (overkill)",
        "Doesn't update the base in real time (one-off operation)",
        "Isn't a substitute for a vector DB (only prepares the data)",
        "Doesn't create access policies (that's an admin's job)",
        "Doesn't replace a domain expert for critical data",
        "Doesn't build semantic search itself (only structure)",
        "Doesn't translate documents (that's another pipeline)"
      ],
      "antiPatterns": [
        "Dump and Dupe - loading everything without dedup leaves the base 50% garbage",
        "Lost Sources - articles without links to sources block any verification",
        "Unfactchecked - publishing without fact-check leaks contradictions to users",
        "Rigid Structure - a predefined structure that doesn't fit the data forces ugly reshuffling",
        "Missing Reranker - search without a reranker returns unrelated results"
      ],
      "keyConcepts": [
        {
          "term": "Chunking",
          "def": "Splitting documents into smaller fixed-size pieces for embedding and retrieval."
        },
        {
          "term": "Dedup",
          "def": "Removing duplicate chunks via embedding similarity and fuzzy matching."
        },
        {
          "term": "Embedding",
          "def": "Conversion of text into a vector of numbers that represents meaning for semantic search."
        },
        {
          "term": "Reranker",
          "def": "A second search stage that rescores the top results with a stronger model for relevance."
        },
        {
          "term": "RAG",
          "def": "Retrieval Augmented Generation - an LLM answers questions by reaching into a knowledge base."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "10"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.85-2.15"
        },
        {
          "label": "Time",
          "value": "30-60 min"
        }
      ],
      "bestFor": [
        "When you're migrating an internal wiki from Confluence to Notion or the other way around",
        "When you're building a knowledge base for new hires or customer support",
        "When the company has knowledge scattered across Slack, wiki, PDFs, and GitHub"
      ],
      "worstFor": [
        "When you only have one source of information (too heavy a preset)",
        "When you need continuous real-time updates (this is a one-off operation)",
        "When you already have a solid semantic search system"
      ],
      "relatedPresets": [
        "content",
        "research",
        "tech_writing_pipe"
      ],
      "glossary": [
        {
          "term": "chunking",
          "definition": "Splitting a document into fixed-size pieces for embedding."
        },
        {
          "term": "dedup",
          "definition": "Removing duplicate chunks via similarity."
        },
        {
          "term": "embedding",
          "definition": "A vector representing the meaning of text for semantic search."
        },
        {
          "term": "reranker",
          "definition": "A second search stage that rescores results with a stronger model."
        },
        {
          "term": "RAG",
          "definition": "Retrieval Augmented Generation - an LLM reaching into a knowledge base."
        }
      ],
      "learningQuote": "Knowledge scattered across five sources is worse than no knowledge at all - a new hire loses weeks searching while the answers contradict each other.",
      "realExample": "Imagine that your company has 300 employees and its knowledge is spread across Slack (3 years of an engineering channel), a Confluence wiki (400 pages), a Drive folder of onboarding PDFs, and READMEs in 40 repositories. KB Constructor spins up 4 ingesters in parallel, the deduplicator finds that 60% of the Confluence entries are copies of Slack messages, the writer drafts 80 categorized articles, the critic catches 7 contradictions between sources, and the integrator publishes to Notion with a reranker that answers correctly on 85% of test queries."
    },
    "tech_writing_pipe": {
      "tagline": "Plan plus research plus writing plus diagrams plus SEO plus fact-check in one pipeline",
      "missionShort": "Tech Writing Pipeline is an 8-agent team for longer technical texts. An analyst builds the outline, two researchers in parallel gather facts (docs + GitHub), a writer writes, a designer draws diagrams, an SEO agent optimizes headers and meta, and a critic checks facts and tone. For technical blogs, whitepapers, and conference talks.",
      "whoIs": "A preset for technical marketing teams, DevRel, or contributors who write longer technical material. Ideal for technical blog posts, whitepapers, conference slides, and deep-dive case studies. Not for short posts, tweets, social media, or internal notes.",
      "analogy": "This preset is like a science and technology magazine newsroom where the research department gathers facts, the editor writes the copy, an illustrator creates the artwork, an SEO specialist optimizes it, and a fact-checker verifies everything before it goes to print.",
      "howItWorks": [
        {
          "label": "Phase 1 - Outline and audience",
          "desc": "The analyst defines who the text is for (audience, knowledge level), formulates the main angle, and drafts an outline with sections. Sets success criteria (what the reader will learn)."
        },
        {
          "label": "Phase 2 - Parallel research",
          "desc": "Two researchers gather material in parallel: res_docs reads official documentation for technical facts, res_github looks for code examples and benchmarks. Each returns organized findings."
        },
        {
          "label": "Phase 3 - Writing and enrichment",
          "desc": "The writer drafts the text strictly from the researchers' findings (no hallucinating). The designer draws diagrams for complex concepts. The SEO optimizer picks keywords, H1-H3 headers, and meta descriptions."
        },
        {
          "label": "Phase 4 - Fact-check and tone polish",
          "desc": "The critic checks every fact against sources, flags contradictions, and verifies tone (audience match). Generates a pre-publish checklist."
        }
      ],
      "inputs": [
        "Topic and goal of the text (blog, whitepaper, talk)",
        "Audience (beginners, advanced, decision-makers)",
        "Angle or main thesis (what you want to get across)",
        "Optional rough outline or bullet points"
      ],
      "outputs": [
        "Long article or whitepaper with code examples",
        "Architecture and flow diagrams for complex concepts",
        "Titles and meta descriptions optimized for search",
        "Citation list with links to sources",
        "Pre-publish readiness checklist"
      ],
      "does": [
        "Starts from an outline instead of writing immediately",
        "Uses two researchers for facts (docs + github)",
        "Isolates the writer from making things up - writes only from research",
        "Adds diagrams for complex concepts",
        "Optimizes for SEO without keyword stuffing",
        "Fact-checks every claim before publication",
        "Adjusts tone to the audience",
        "Generates a readiness checklist"
      ],
      "doesNotDo": [
        "Doesn't write short social media posts (overkill)",
        "Doesn't create tweets or threads",
        "Doesn't execute code (the designer draws, doesn't run)",
        "Doesn't publish on its own (only prepares ready copy)",
        "Doesn't translate into other languages (that's another pipeline)",
        "Doesn't replace a human editor for brand style",
        "Doesn't guarantee Google rankings (only optimizes)"
      ],
      "antiPatterns": [
        "Writer First - writing without research produces hallucinations",
        "SEO Stuffing - cramming keywords into the text destroys tone and readability",
        "No Fact-check - publishing without verification ships errors to readers",
        "Generic Audience - text for everyone is text for no one",
        "Diagram Theater - diagrams that explain nothing only add noise"
      ],
      "keyConcepts": [
        {
          "term": "Outline-First",
          "def": "Starting with a section plan before writing - reduces chaos and hallucinations."
        },
        {
          "term": "E-E-A-T",
          "def": "Experience, Expertise, Authoritativeness, Trust - Google's quality signals for content."
        },
        {
          "term": "Structured Data",
          "def": "Schema.org markup for an article that lets Google understand the content better."
        },
        {
          "term": "Audience Calibration",
          "def": "Matching vocabulary, assumptions, and depth to the reader's level."
        },
        {
          "term": "Fact-check Loop",
          "def": "A dedicated step that verifies every claim against sources before publication."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "8"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$0.75-1.85"
        },
        {
          "label": "Time",
          "value": "20-40 min"
        }
      ],
      "bestFor": [
        "When you're writing a deep company blog post or a whitepaper for clients",
        "When you're preparing a conference talk or a deep-dive case study",
        "When you need a long technical piece that's verified for factual accuracy"
      ],
      "worstFor": [
        "When you're writing a short Twitter or LinkedIn post",
        "When you're writing an internal note for the team",
        "When you have 10 minutes for content and don't want a full pipeline"
      ],
      "relatedPresets": [
        "content",
        "research",
        "kb_constructor"
      ],
      "glossary": [
        {
          "term": "outline",
          "definition": "A section plan for the text before writing - reduces chaos."
        },
        {
          "term": "E-E-A-T",
          "definition": "Experience Expertise Authoritativeness Trust - Google quality signals."
        },
        {
          "term": "SEO",
          "definition": "Search Engine Optimization - optimizing content for search engines."
        },
        {
          "term": "audience",
          "definition": "The target reader who determines vocabulary and depth."
        },
        {
          "term": "fact-check",
          "definition": "Verification of every claim against sources before publication."
        }
      ],
      "learningQuote": "Without an outline and research the writer hallucinates and the fact-checker has to catch it later - Tech Writing Pipeline enforces the order: plan, facts, writing, verification.",
      "realExample": "Imagine that your DevRel is writing a Kubernetes deep-dive for the company blog and the boss says \"by tomorrow.\" Without the preset, that's a recipe for hallucinations. Tech Writing Pipeline: the analyst builds an outline for an audience of senior platform engineers, res_docs reads the official k8s docs v1.32, res_github looks for real-world examples in the kubernetes/examples repo, the writer produces 2500 words strictly from the research, the designer draws a reconciliation loop diagram, SEO optimizes for \"kubernetes operator pattern,\" the critic catches one wrong fact about leader election, and the piece is ready to publish."
    },
    "five_minds_strategic": {
      "tagline": "Hard data first, then debate - five experts with numbers in hand instead of an opinion war",
      "missionShort": "Five Minds Strategic is a 13-agent team for high-stakes strategic decisions. Four researchers in parallel gather hard data (market, financials, technology, legal), an analyst frames the question, five experts plus Devil's Advocate debate for three rounds, a synthesizer writes the Gold Solution, and a PM sign-off closes it out. For pivots, acquisitions, and irreversible strategic choices.",
      "whoIs": "A preset for boards and senior leadership teams making strategic decisions with a 3+ year horizon. Ideal for company pivots, acquisition evaluations, and picking a platform for the next 5 years. Not for tactical decisions due today, urgent matters, or cases where the answer is already obvious.",
      "analogy": "This preset is like a war council with an intelligence dossier, where scouts gather information first, then the generals debate for three rounds against a prosecutor, and the final plan goes to the president.",
      "howItWorks": [
        {
          "label": "Phase 1 - Parallel intelligence",
          "desc": "Four researchers gather data in parallel: market intel (market, competition, trends), financial (financials, ROI, costs), technical (feasibility, risks, stacks), legal (regulations, compliance). Each returns hard numbers."
        },
        {
          "label": "Phase 2 - Option framing",
          "desc": "The analyst synthesizes the 4 reports into formalized decision options (2-5) with pros, cons, and uncertainties. Presents each option in the same structure."
        },
        {
          "label": "Phase 3 - Three-round debate",
          "desc": "Five experts (innovator, analyst, pragmatist, user, visionary) plus Devil's Advocate debate for three rounds: opinion -> counterarguments -> synthesis. Devil's Advocate attacks the strongest proposal looking for weaknesses."
        },
        {
          "label": "Phase 4 - Gold Solution and HITL",
          "desc": "The synthesizer writes a Gold Solution better than any individual option (a real synthesis, not a compromise). The PM signs off on the decision with a rationale and a list of dissenting opinions."
        }
      ],
      "inputs": [
        "Strategic question with a definition of stakes (investment, time horizon)",
        "List of options to consider (or an area to investigate)",
        "Company context (stage, culture, constraints)",
        "Decision deadline (minimum days for the debate)"
      ],
      "outputs": [
        "Four reports with hard data (market, financials, tech, legal)",
        "Log of the three debate rounds with expert arguments",
        "Gold Solution with analysis of pros and cons",
        "List of dissenting opinions kept on record",
        "Signed PM decision with an implementation plan"
      ],
      "does": [
        "Gathers hard data before the debate (no opinion war)",
        "Uses 4 specialized researchers for the key areas",
        "Formalizes the debate into three rounds with explicit structure",
        "Uses Devil's Advocate for adversarial challenge of the strongest proposal",
        "Has the synthesizer write a Gold Solution better than all options",
        "Records dissenting opinions for the historical record",
        "Enforces PM sign-off with written rationale",
        "Documents everything for a decision audit"
      ],
      "doesNotDo": [
        "Not for tactical decisions due today (too heavy)",
        "Not for urgent matters (three debate rounds take time)",
        "Doesn't run without time for research",
        "Doesn't replace a domain expert in narrow areas",
        "Doesn't do implementation (decision only)",
        "Doesn't guarantee the decision will be correct (only the process)",
        "Doesn't work when the answer is obvious to everyone"
      ],
      "antiPatterns": [
        "Opinion War - debate without data turns into whoever shouts loudest",
        "Skipped Devil - the team skips the adversarial challenge and runs with the first proposal",
        "Gold Compromise - the synthesizer produces a compromise instead of a true synthesis",
        "Silent Dissent - losing dissenting opinions robs the company of learning",
        "Rushed Rounds - cutting 3 rounds to 1 kills the adversarial value"
      ],
      "keyConcepts": [
        {
          "term": "Adversarial Collaboration",
          "def": "Collaboration where different experts formally attack each other's positions to find weaknesses."
        },
        {
          "term": "Pre-mortem",
          "def": "Technique of imagining the decision was a failure and trying to work out why."
        },
        {
          "term": "Steel Man",
          "def": "Rebuilding the strongest version of your opponent's argument instead of attacking a weak one."
        },
        {
          "term": "Gold Solution",
          "def": "Synthesis of all debate rounds that is better than any single proposal, not a compromise."
        },
        {
          "term": "Dissenting Opinion",
          "def": "A formal record of a differing view kept for historical record and learning."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "13"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.65-4.10"
        },
        {
          "label": "Time",
          "value": "45-90 min"
        }
      ],
      "bestFor": [
        "When you're deciding on a company pivot or acquiring another company",
        "When you're picking a tech stack or vendor for the next 5 years",
        "When the stakes are irreversible and require hard data plus debate"
      ],
      "worstFor": [
        "When you need a tactical decision today",
        "When you have an urgent matter with no time for a three-round debate",
        "When the answer is obvious to everyone and the debate is a waste of time"
      ],
      "relatedPresets": [
        "five_minds",
        "deep_five_minds",
        "deep_research_swarm_pro"
      ],
      "glossary": [
        {
          "term": "pivot",
          "definition": "A change in company direction or product strategy."
        },
        {
          "term": "Gold Solution",
          "definition": "A synthesis better than individual options, not a compromise."
        },
        {
          "term": "pre-mortem",
          "definition": "Imagining the decision failed and analyzing why."
        },
        {
          "term": "steel man",
          "definition": "Rebuilding the strongest version of your opponent's argument."
        },
        {
          "term": "dissenting opinion",
          "definition": "A formal record of a differing view for the historical record."
        }
      ],
      "learningQuote": "Debate without hard data is an opinion war - Five Minds Strategic forces research, debate, and sign-off in one pass.",
      "realExample": "Imagine that the board is considering acquiring a competitor for 50 million dollars. Four researchers gather in parallel: market intel (share, trends), financial (ROI, costs, debt), technical (stack compatibility, tech debt), legal (antitrust, employees). The analyst frames three options (buy the whole company, buy only the technology, don't buy). Five experts debate three rounds and Devil's Advocate attacks option 1, finding overpay risk and culture clash. The synthesizer writes a Gold Solution: buy only the technology and hire the key engineers. The PM signs off with a dissenting opinion on record that a board member wanted a full acquisition."
    },
    "soc2_sweep": {
      "tagline": "SOC 2 Type II readiness run by the full team - control mapping plus evidence plus gap",
      "missionShort": "SOC2 Sweep is a 9-agent team for SOC 2 Type II audit preparation. A policy reader reads company policies, a control mapper maps them to CC1-CC9, an evidence collector gathers proof, a gap analyzer flags missing controls, qa_security verifies technical controls, and a CISO signs off on readiness. Aligned with Trust Services Criteria.",
      "whoIs": "A preset for security and compliance teams preparing for a SOC 2 audit. Ideal for startups moving upmarket to enterprise, quarterly reviews, and vendor risk assessment responses. Not for companies without any policies, not for continuous compliance (use Vanta/Drata), and not for minor fixes.",
      "analogy": "This preset is like an audit of a bank where one auditor reads the policies, a second maps them to regulations, a third collects evidence, a fourth points out the gaps, and the CFO signs off on the report for the regulator.",
      "howItWorks": [
        {
          "label": "Phase 1 - Policy reading",
          "desc": "The policy reader reads every SOP, security policy, vendor agreement, and incident runbook the company has. Builds a policy map with metadata (dates, owners)."
        },
        {
          "label": "Phase 2 - Control mapping",
          "desc": "The control mapper maps policies onto Trust Services Criteria CC1-CC9 (Control Environment, Communication, Risk Assessment, Monitoring, Control Activities, Logical Access, System Ops, Change Mgmt, Risk Mitigation)."
        },
        {
          "label": "Phase 3 - Evidence collection",
          "desc": "The evidence collector gathers evidence for each control: screenshots, configs, logs, audit trails, personnel records. qa_security verifies the technical controls (encryption, MFA, backup, access reviews)."
        },
        {
          "label": "Phase 4 - Gap analysis and CISO sign-off",
          "desc": "The gap analyzer flags missing coverage, proposes remediation, and estimates priorities. The CISO reviews the readiness report and signs off on audit readiness with a remediation plan."
        }
      ],
      "inputs": [
        "Set of company policies and SOPs",
        "Access to production systems for evidence collection",
        "List of current employees and their roles",
        "Audit scope (which products, which regions)"
      ],
      "outputs": [
        "Compliance table with every requirement and its evidence",
        "Evidence folder (screenshots, configs, logs)",
        "List of gaps ordered by priority",
        "Remediation proposals for each gap",
        "Signed audit readiness report from the CISO"
      ],
      "does": [
        "Reads every company policy and maps them to CC1-CC9",
        "Collects evidence automatically for technical controls",
        "Verifies encryption, MFA, backup, and access reviews",
        "Flags gaps in Trust Services Criteria coverage",
        "Proposes remediation with P0-P3 priorities",
        "Generates a folder for the external auditor",
        "Enforces CISO sign-off before the audit",
        "Documents everything for the historical record"
      ],
      "doesNotDo": [
        "Doesn't replace the external auditor (preparation only)",
        "Doesn't work without existing policies (write them first)",
        "Isn't continuous compliance (use Vanta/Drata)",
        "Doesn't remediate gaps itself (only identifies them)",
        "Isn't a pentest or a security audit",
        "Doesn't cover ISO 27001 automatically (different standard)",
        "Doesn't replace HR for personnel records"
      ],
      "antiPatterns": [
        "Policy Theater - the policies exist on paper but nobody follows them",
        "Evidence Vacuum - control evidence was collected a year ago and is already stale",
        "Ignored Gaps - the gap analyzer flags gaps that then nobody fixes",
        "Missing CISO - a sign-off without CISO involvement has no value",
        "Scope Creep - trying to cover everything instead of the selected products"
      ],
      "keyConcepts": [
        {
          "term": "Trust Services Criteria",
          "def": "AICPA framework with 5 categories: Security, Availability, Processing Integrity, Confidentiality, Privacy."
        },
        {
          "term": "CC1-CC9",
          "def": "The nine Common Criteria in SOC 2: Control Environment, Communication, Risk, Monitoring, Control, Access, Ops, Change, Risk Mitigation."
        },
        {
          "term": "Control Evidence",
          "def": "Proof that a control actually works in practice: screenshots, configs, logs, audit trails."
        },
        {
          "term": "Gap Remediation",
          "def": "Remediation plan for control coverage gaps with priorities and a timeline."
        },
        {
          "term": "SOC 2 Type II",
          "def": "A SOC 2 audit covering a period of at least 6 months rather than a single point in time."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "9"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.10-2.75"
        },
        {
          "label": "Time",
          "value": "30-60 min"
        }
      ],
      "bestFor": [
        "When you're preparing for a SOC 2 Type II audit for enterprise customers",
        "When you're answering a vendor risk assessment from a large customer",
        "When you're running a quarterly compliance review or prepping for ISO 27001"
      ],
      "worstFor": [
        "When you don't have any company policies (write them first)",
        "When you want continuous compliance (use Vanta or Drata)",
        "When you only need minor security fixes"
      ],
      "relatedPresets": [
        "security_multi_vector",
        "security",
        "test_suite"
      ],
      "glossary": [
        {
          "term": "SOC 2",
          "definition": "AICPA security audit standard for cloud vendors."
        },
        {
          "term": "Trust Services Criteria",
          "definition": "Framework with 5 categories: Security, Availability, Processing Integrity, Confidentiality, Privacy."
        },
        {
          "term": "CC1-CC9",
          "definition": "The nine Common Criteria in SOC 2."
        },
        {
          "term": "evidence",
          "definition": "Proof that a control actually works in practice."
        },
        {
          "term": "Type II",
          "definition": "An audit covering a 6-12 month period, not a single point in time."
        }
      ],
      "learningQuote": "SOC 2 isn't documentation on a shelf - it's proof that controls work every single day, and this preset automates collecting that proof.",
      "realExample": "Imagine that your SaaS startup has a contract with a big enterprise customer worth 2 million a year, but the customer requires SOC 2 Type II within 6 months. The policy reader reads 28 policies, the control mapper maps them to CC1-CC9, the evidence collector gathers AWS configurations, access review logs, and screenshots from Okta, the gap analyzer flags 7 gaps (no formal vendor risk assessment, no annual penetration test, no formalized incident response plan). The CISO signs off on the report with a remediation plan 3 months before the audit."
    },
    "data_analysis_pipe": {
      "tagline": "Nine agents in sequence - collect plus clean plus EDA plus model plus report",
      "missionShort": "Data Analysis Pipeline is a 9-agent team for turning raw data into a stakeholder-ready report. A data collector profiles the dataset, a cleaner normalizes it, an EDA analyst and SQL specialist look for patterns in parallel, a statistician checks for soundness, a model builder optionally trains a prediction, a writer drafts the report, and a designer produces the charts. Based on arXiv 2510.04023.",
      "whoIs": "A preset for data analysts and business intelligence teams who need to turn a raw spreadsheet into a board-ready report. Ideal for ad-hoc business questions, churn analysis, pricing, and A/B test post-mortems. Not for real-time streaming data, ML production deployment, or work without access to the raw data.",
      "analogy": "This preset is like a data science consulting team where an engineer ingests the data, an analyst cleans it, a scientist runs EDA, a modeler trains, and a narrator writes the board report with a statistician peer-reviewing the math.",
      "howItWorks": [
        {
          "label": "Phase 1 - Profiling and cleaning",
          "desc": "The data collector profiles the sheet (schema, statistics, ~5k samples instead of the raw file). The data cleaner normalizes (missing values, outliers, date formats, encoding)."
        },
        {
          "label": "Phase 2 - Parallel EDA",
          "desc": "The EDA analyst looks for patterns (distributions, correlations, segments). The SQL specialist writes queries for specific business hypotheses. They work in parallel."
        },
        {
          "label": "Phase 3 - Stats sanity and modeling",
          "desc": "The statistician checks whether conclusions are statistically significant and flags leakage, assumption violations, and multiple-comparison problems. Optionally the model builder trains a simple prediction model."
        },
        {
          "label": "Phase 4 - Report and charts",
          "desc": "The writer produces a board-ready report with an executive summary, key insights, and recommendations. The designer builds the charts. The critic verifies the stats sanity."
        }
      ],
      "inputs": [
        "Access to the raw data (CSV, DB, warehouse)",
        "Business question (why did sales drop)",
        "Business context (products, segments, time period)",
        "Audience for the report (board, ops, marketing)"
      ],
      "outputs": [
        "Board-ready report with the key findings",
        "Charts with narrative for each insight",
        "Confidence on every claim plus limitations",
        "Optional simple prediction model",
        "Recommendations with concrete actions"
      ],
      "does": [
        "Profiles the dataset without reading it all (samples + stats)",
        "Cleans data (missing values, outliers, formats)",
        "Runs EDA and SQL in parallel for different hypotheses",
        "Checks statistical soundness (leakage, assumptions)",
        "Optionally builds a simple prediction model",
        "Generates charts with narrative",
        "Writes the report for a specific audience",
        "Runs every claim through the critic"
      ],
      "doesNotDo": [
        "Not for real-time streaming data (different architecture)",
        "Doesn't deploy models to production (that's ML engineering)",
        "Doesn't work without access to raw data",
        "Doesn't replace a data engineer for ETL",
        "Doesn't do causal inference on observational data",
        "Doesn't build live dashboards (that's BI tooling)",
        "Doesn't deliver insights beyond what's in the sheet"
      ],
      "antiPatterns": [
        "Full Data Dump - the writer gets raw data and invents statistics",
        "P-hacked Insight - EDA finds something random and ships it as a finding",
        "Missing Baseline - no comparison to a previous period hides the real change",
        "Leakage Blind - the model uses future features as predictors",
        "No Stats Check - the report is published with no statistical sanity check"
      ],
      "keyConcepts": [
        {
          "term": "EDA",
          "def": "Exploratory Data Analysis - visualization and statistics first to understand the data."
        },
        {
          "term": "Missingness",
          "def": "Pattern of missing values that can be MCAR, MAR, or MNAR."
        },
        {
          "term": "Leakage",
          "def": "Model uses information it shouldn't have at prediction time (future features)."
        },
        {
          "term": "Model Card",
          "def": "Model documentation with purpose, data, metrics, limitations, and recommended use."
        },
        {
          "term": "Multiple Comparisons",
          "def": "Problem where testing many hypotheses inflates type I errors and requires correction."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "9"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.10-2.75"
        },
        {
          "label": "Time",
          "value": "25-50 min"
        }
      ],
      "bestFor": [
        "When the board asks why sales dropped in March and you need a data-driven answer",
        "When you're analyzing customer churn or a pricing experiment",
        "When you're doing an A/B test post-mortem or a product analysis"
      ],
      "worstFor": [
        "When you have live streaming data (different architecture)",
        "When you want to deploy a model to production (that's ML engineering)",
        "When you don't have access to the raw data"
      ],
      "relatedPresets": [
        "ab_test_lab",
        "research",
        "data_pipe"
      ],
      "glossary": [
        {
          "term": "EDA",
          "definition": "Exploratory Data Analysis - initial exploration and visualization."
        },
        {
          "term": "leakage",
          "definition": "Using future information as a prediction feature."
        },
        {
          "term": "model card",
          "definition": "Model documentation with purpose, data, metrics, and limitations."
        },
        {
          "term": "missingness",
          "definition": "Pattern of missing values: MCAR, MAR, or MNAR."
        },
        {
          "term": "correlation",
          "definition": "Measure of co-occurrence between two variables, not necessarily causal."
        }
      ],
      "learningQuote": "Without a stats sanity check it's easy to find patterns that aren't there - Data Analysis Pipeline enforces discipline from profiling to report.",
      "realExample": "Imagine that the CFO asks why Q3 revenue dropped 8% and has a CSV of 2 million transactions on the desk. The data collector profiles (14 columns, 12 dates, 4 numeric, 2 text), the cleaner catches 3% missing values in the region field, the EDA analyst sees the drop is concentrated in two regions, the SQL specialist isolates specific products, the statistician confirms it isn't seasonality and it isn't a one-off anomaly. The writer produces a report for the CFO with three recommendations and charts, and the critic verifies the stats sanity."
    },
    "incident_war_room": {
      "tagline": "Three specialists hunt the cause in parallel - Devil's Advocate challenges the hypothesis and a human decides on rollback",
      "missionShort": "Incident War Room is a 10-agent team for triaging production outages. Three investigators in parallel (telemetry, logs, diff) hunt the cause, two testers (perf, security) rule out their domains, Devil's Advocate attacks the leading hypothesis, a human decides on rollback, and a writer produces a 5 whys postmortem. Based on Microsoft Magentic-One.",
      "whoIs": "A preset for on-call and SRE teams during P0/P1 production outages. Ideal for live triage, customer-impact regressions, and postmortem generation. Not for planned maintenance, long-term code cleanup, or vague suspicions that \"the system seems slow.\"",
      "analogy": "This preset is like an incident commander's war room where three scouts in parallel (radar, satellite, field agent) collect data, a prosecutor attacks the commander's theory, and the president decides on rollback.",
      "howItWorks": [
        {
          "label": "Phase 1 - Parallel investigation",
          "desc": "Three investigators run in parallel: the telemetry surfer reads metrics and traces with reproducible queries, the log analyst hunts error patterns in logs, and the diff investigator analyzes recent deploys and PRs."
        },
        {
          "label": "Phase 2 - Specialist rule-out",
          "desc": "qa_perf analyzes whether this is a performance regression, qa_security checks if it's a security incident. Each rules its domain in or out."
        },
        {
          "label": "Phase 3 - Devil's Advocate adversarial",
          "desc": "Devil's Advocate attacks the incident commander's leading hypothesis: what if it's not the deploy, what if it's a downstream service, what if it's coincidence. Forces alternative hypotheses."
        },
        {
          "label": "Phase 4 - Rollback HITL and postmortem",
          "desc": "The decision presenter shows the human the evidence and options (rollback vs hotfix vs monitor). The human signs the decision. The comms officer writes the status page update, the writer writes the postmortem with 5 whys."
        }
      ],
      "inputs": [
        "Access to production metrics, logs, and traces",
        "List of recent deploys and PRs",
        "Alerts or customer reports",
        "Runbook and on-call contact list"
      ],
      "outputs": [
        "Investigation timeline (who did what, when)",
        "Leading theory with counterarguments from Devil's Advocate",
        "Rollback decision with rationale",
        "Status page update for customers",
        "Postmortem with 5 whys and action items"
      ],
      "does": [
        "Runs 3 investigators in parallel to cut time-to-RCA",
        "Uses reproducible PromQL/LogQL queries",
        "Rules perf and security in or out as domain owners",
        "Forces alternative hypotheses through Devil's Advocate",
        "Gives the human the rollback call (high stakes)",
        "Writes the status page update for customers",
        "Generates a postmortem with 5 whys",
        "Creates action items to prevent recurrence"
      ],
      "doesNotDo": [
        "Doesn't work without access to production observability",
        "Not for planned maintenance work",
        "Doesn't do long-term code cleanup",
        "Isn't a substitute for a proper incident commander",
        "Doesn't fix the outage itself (diagnosis only)",
        "Doesn't communicate with press or social media (status page only)",
        "Isn't proactive monitoring (reactive only)"
      ],
      "antiPatterns": [
        "First Hypothesis Lock-in - the team runs with the first theory without alternatives",
        "Rollback Without Evidence - rollback decision with no proof that the last deploy is the culprit",
        "Silent Status Page - the outage drags on and customers have no idea",
        "Missing Postmortem - the outage ends with no learning for the team",
        "Shallow 5 Whys - stopping at a surface cause instead of the real root cause"
      ],
      "keyConcepts": [
        {
          "term": "MTTR",
          "def": "Mean Time To Recovery - average time from detection to service restoration."
        },
        {
          "term": "Rollback Window",
          "def": "Time window in which you can safely roll back the last deploy without losing data."
        },
        {
          "term": "War Room Roles",
          "def": "Formal roles during an incident: commander, investigator, comms, scribe, executor."
        },
        {
          "term": "5 Whys",
          "def": "Root cause technique that asks \"why\" five times from symptom down to cause."
        },
        {
          "term": "Magentic-One Pattern",
          "def": "Microsoft dual-ledger framework (task ledger + progress ledger) for incident response."
        }
      ],
      "stats": [
        {
          "label": "Agents",
          "value": "10"
        },
        {
          "label": "Phases",
          "value": "4"
        },
        {
          "label": "Est. cost",
          "value": "$1.30-3.30"
        },
        {
          "label": "Time",
          "value": "15-40 min"
        }
      ],
      "bestFor": [
        "When you have a serious P0/P1 production outage and every minute costs money",
        "When a regression hits customers and you have to decide on rollback",
        "When the outage is over and you need to write a postmortem for leadership"
      ],
      "worstFor": [
        "When you don't have access to metrics or observability",
        "When it's planned maintenance, not an outage",
        "When you need a long-term refactor rather than a fast fix"
      ],
      "relatedPresets": [
        "perf_squad",
        "bug_hunt",
        "security_multi_vector"
      ],
      "glossary": [
        {
          "term": "MTTR",
          "definition": "Mean Time To Recovery - average time from detection to repair."
        },
        {
          "term": "rollback",
          "definition": "Reverting the last deploy to the previous stable version."
        },
        {
          "term": "5 whys",
          "definition": "Root cause analysis technique that asks why five times."
        },
        {
          "term": "postmortem",
          "definition": "Post-incident report with timeline, root cause, and action items."
        },
        {
          "term": "war room",
          "definition": "Temporary team of people and systems engaged in incident triage."
        }
      ],
      "learningQuote": "Every minute of an outage is money, and a person under pressure bets on the wrong hypothesis - Incident War Room forces three parallel investigations and an adversarial challenge before rollback.",
      "realExample": "Imagine that at 2:30 PM p99 latency alerts start firing above 5 seconds and the support dashboard shows 40 tickets. The telemetry surfer spots a spike in the database connection pool, the log analyst catches 500s in the auth service logs, the diff investigator finds a 2:15 PM deploy that introduces a new middleware. qa_perf confirms it's not memory or CPU, qa_security rules out an attack. Devil's Advocate attacks the hypothesis: \"what if it's not the middleware but downstream cache invalidation.\" The decision presenter shows the human the evidence and the human picks rollback. By 2:45 PM the service is stable, and the writer produces a postmortem with 5 whys and action items."
    }
  },
  agentLong: {
    "orchestrator": "<p>The Orchestrator is the team's central conductor operating at hierarchy level 0, the only agent with a full view of the system and the authority to delegate work. It decomposes the user's large problem into smaller subtasks by agent specialization, delegates each subtask to the right specialist, and controls quality gates G0-G4, making GO or NO-GO calls between phases.</p><p>It synthesizes the final result from the outputs of every agent involved and resolves conflicts when two agents return contradictory recommendations. It does not write code, run research, or design UI - that is what the specialists are for. Sweet spot is a team of 6-10 agents; below that go linear, above that call two orchestrators hierarchically.</p>",
    "synthesizer": "<p>The Synthesizer is the project's memory and chronicler, the only agent that views the work along the time dimension. It maintains MANIFEST.md in append-only mode as a living decision archive, collects outputs from each finished phase, updates ADRs with rationale, and flags conflicts between artifacts from different phases.</p><p>It is the only agent with the privilege of direct agent-to-agent communication, acting as an information broker. It does not make design decisions, write code, or talk to the end user, and it never deletes history from the archive. It runs on Opus or Sonnet with Read, Grep, Glob, and Write tools.</p>",
    "analyst": "<p>The Analyst is a problem decomposer and dependency graph architect. It takes a vague \"just build it\" and converts it into a precise DAG of atomic subtasks in the 8-20 item sweet spot, with S/M/L/XL complexity ratings and categorization by agent specialization.</p><p>The core rule is WHAT vs WHEN: the Analyst says what has to be done and what depends on what, then the Planner takes that JSON and creates a schedule with timing. No time estimates in minutes, because the Analyst does not know how fast a given agent will finish. Prefers Claude Sonnet - Haiku is too weak for graphs, Opus is too expensive.</p>",
    "planner": "<p>The Planner is the schedule tactician that takes the Analyst's task list with dependencies and answers how to execute it cheapest and fastest. It builds the execution schedule, identifies the critical path, defines the 5 quality gates G0-G4, and picks one of 4 execution modes for each task group.</p><p>The four modes: SEQUENTIAL (safest), PARALLEL (fastest for 6 researchers), PARALLEL_THEN_SEQUENTIAL (research-build hybrid), and SEQUENTIAL_WITH_COLLABORATION (rare, expensive). The Plan-and-Execute pattern saves up to 83 percent of tokens compared to a single monolithic agent.</p>",
    "res_tech": "<p>Researcher Tech is the technical scout, first of six researchers in the RESEARCH phase. Its territory is hard technical sources in strict hierarchy: official docs, engineering blogs, published benchmarks, tutorials, forums, tweets. It compares technologies with a minimum of 3 options and 3 dimensions, analyzes benchmarks, and flags technical risks.</p><p>The 3-3-3 rule is mandatory: at least 3 alternatives, 3 sources per alternative, 3 comparison dimensions. Every claim gets a confidence label: CERTAIN/PROBABLE/SPECULATION. The critical anti-groupthink rule: researchers do not talk to each other and do not see each other's reports. Runs on Haiku.</p>",
    "res_ux": "<p>Researcher UX is the design trend scout, second of 6 researchers, looking at the visual world. Its job is to build a mood board with at least 5 references from different sources and deliver a WCAG 2.1 AA accessibility audit, but not to write a single line of CSS. Pulls from Dribbble, Behance, Awwwards, Mobbin, Material Design, Apple HIG, and WCAG.</p><p>Separating UX research from design implementation lets each agent operate in a narrow context. The accessibility audit matters as much as trend scouting - 4.5:1 contrast, focus visible, keyboard navigation, 44x44px touch targets. It does not pick the final palette; it hands the Designer justified options with pros and cons.</p>",
    "res_reddit": "<p>Researcher Reddit is the dev-community anthropologist, third of 6 researchers. Works like an investigative journalist - listens to practitioner conversations in the key subreddits (r/webdev, r/programming, r/reactjs, r/SaaS, r/devops), where people under pseudonyms are far more candid than in official case studies.</p><p>The core technique is ground truth: \"we've been running X in production for 3 years\" is worth more than the best marketing post. The second pillar is sentiment analysis and ragepost detection - one ragepost is nothing, 20 in a week is a red flag. Requires triangulation: at least 3 independent comments per claim.</p>",
    "res_x": "<p>Researcher X is the trend war correspondent, fourth of 6 researchers, focused on platform X. Monitors tech community trends, tracks first-24h reactions to product launches, analyzes longer expert threads, and maps influencers on a Tier 1 to Tier 5 scale. A 0-10 hype score measures community mood.</p><p>The lowest load of all researchers (45/100) because tweets are short. X is a good early warning system (a trend starts here before it reaches Reddit) but poor for ground truth. Reports what is trending, not whether the trend is real - validation is Tech and Reddit's job.</p>",
    "res_github": "<p>Researcher GitHub is the repository archaeologist, fifth of 6 researchers, wearing the reverse engineer's hat. With 420 million repositories, GitHub is the largest knowledge base for how people actually solve problems in code. Runs discovery with a stars > 100 filter, architecture analysis, and health assessment across 8 metrics.</p><p>Highest load among researchers (70/100) because repositories are large. Key steps are pattern extraction and issue analysis. The biggest traps are Star Worship (50k stars does not mean quality), Abandoned Repo Adoption, and README Deception. Does not write its own code or clone repos locally - reads via GitHub API/WebFetch.</p>",
    "res_forums": "<p>Researcher Forums is the Q&amp;A library guide, sixth of 6 researchers, specializing in Stack Overflow, Dev.to, Medium, Hacker News, and Hashnode. Finds solutions to known problems, rates answer quality by upvotes/accepted status/comments/dates, and extracts lessons learned from discussions.</p><p>The big trap is Upvote Blindness - an answer with 500 upvotes may be from 2015 and broken in the 2026 version, so always check the date and comments. Often the most useful information is not in the answer itself but in the comments underneath. Does not write code and does not validate whether a solution works in your specific context.</p>",
    "res_docs": "<p>Researcher Docs is the specialist for official framework and tool documentation, a lawyer reading statutes rather than opinions. Collects getting-started, best practices, performance tips, security guidelines, and config snippets from authorized vendor sources. Lowest load in research (40/100).</p><p>Core rule: official docs are the source of truth for technical facts but not for quality opinions. ALWAYS checks version alignment - citing Next.js 13 docs when the project uses Next.js 15 is the Version Mismatch anti-pattern. Does not interpret user opinions, compare technologies, or rate framework quality.</p>",
    "res_critic": "<p>Research Critic is the validator and quality gatekeeper of the research phase, the only agent evaluating the work of ALL 6 researchers simultaneously. Analyzes reports hunting for contradictions, confirmation bias, data gaps, and outdated sources. Scoring rubric: Completeness 25%, Accuracy 25%, Relevance 20%, Freshness 20%, Actionability 10%.</p><p>Highest load in research (85/100) because it has to read and compare the outputs of 6 agents at once. The only RESEARCH-layer agent running on Sonnet instead of Haiku. Operates like a Nature peer reviewer: every unsupported claim flagged, every contradiction surfaced, every bias named.</p>",
    "backend": "<p>Backend Coder is the server-layer implementation agent. It takes a finished API spec from MANIFEST.md and converts it into working endpoint code, data schemas, request validation, and business logic. Works in TDD - unit tests BEFORE implementation, never the other way around.</p><p>Specializes in REST/GraphQL, the database layer (queries, transactions, migrations), error handling, and using env vars instead of hardcoded secrets. Has the highest load in BUILD (75-80/100). Does not design architecture, question the stack, or write frontend - it gets a technical drawing and builds to spec.</p>",
    "frontend": "<p>Frontend Coder implements the mobile-first client layer - what the user sees and interacts with. Takes the finished design system from the Designer (CSS tokens, palette, typography) and the wireframe from the Analyst, and ships reusable UI components with full loading, error, empty, and success state handling.</p><p>Master of responsive layout, accessibility (aria-labels, keyboard navigation, focus management), and performance (lazy loading, code splitting, image optimization). Handles state management, SPA routing, and backend API integration. Does not design the look (that's Designer), create endpoints (that's Backend), or write copy (that's Writer).</p>",
    "feature": "<p>Feature Dev is the specialist for advanced functionality that needs niche expertise: real-time (WebSocket, SSE, long polling with reconnection logic), AI/ML integrations (streaming, embeddings, function calling), data visualizations (D3.js, Chart.js, SVG, Canvas), and third-party APIs (Stripe, Firebase, AWS SDK, OAuth, webhooks).</p><p>Implements what Backend and Frontend Dev cannot - requires deep knowledge of specialized libraries and protocols. Like the special effects specialist on a film set: not every project needs one, but when it does, the regular camera operator cannot deliver. Does not build basic CRUD, design UI, or run research.</p>",
    "designer": "<p>Designer is the bridge between visual inspiration and working CSS. Receives the mood board and accessibility audit from Researcher UX and converts them into design tokens (primitive/semantic/component), color palettes, typography systems, layout grids, micro-animations, and SVG icons.</p><p>Implementation, not research - like a film colorist applying actual color curves to the footage the camera operator captured. Builds HTML layout with grid/flexbox, implements dark/light mode, watches contrast ratio and visual consistency. Does not research trends, write JavaScript logic, create text content, or integrate components into the final product.</p>",
    "integrator": "<p>The Integrator is the last agent in the BUILD layer and the gate between BUILD and QA. Merges outputs from Coder, Designer, and Writer into one coherent artifact, verifies API contracts (whether frontend and backend speak the same language), resolves integration conflicts, and runs E2E tests on the full flow.</p><p>Has the widest tool arsenal in BUILD and the highest input token budget - reads ALL outputs. The only builder that sees the whole team's work. Like a film editor at the editing bench: the camera operator, sound designer, and composer did their jobs perfectly, but the film only exists once the editor synchronizes them. Does not write new code, design, or audit.</p>",
    "writer": "<p>Writer is the content-quality agent - turns raw text from the Coder or Integrator into a professional document. Edits technical documentation (grammar, terminology, structure), creates README.md with instructions, writes CHANGELOG, API docs, and decision records. Adds comments ONLY for nontrivial code - over-documentation is noise.</p><p>Operates inside an isolated document sandbox - only sees text files, no Bash access. Lowest load in BUILD (35/100) because polishing text is lighter than generating code. Like a sound engineer mixing an album: balances, removes noise, adds clarity.</p>",
    "qa_security": "<p>QA Security is the last line of defense before production deployment. It works like a white-hat pentester - thinks like an attacker but reports vulnerabilities instead of exploiting them. Its methodology is OWASP Top 10 extended with threats specific to agent systems: Indirect Prompt Injection, Agent Output Poisoning, Tool Abuse, Token Exfiltration, System Prompt Leakage.</p><p>The only tools are Read, Grep, and Glob - fully read-only. The absence of Bash, Write, and Edit is intentional, because an auditor who can modify the code being audited loses objectivity. It works in complete isolation from QA Quality to avoid groupthink.</p>",
    "qa_quality": "<p>QA Quality is QA Security's partner in the audit layer, but from a completely different angle. Where Security asks how to break it, Quality asks whether it actually works correctly. The key architectural difference: Quality HAS access to Bash, so it can really run npm test, pytest, eslint, or jest --coverage and see real data instead of just scanning patterns.</p><p>The Quality checklist has four hierarchical priorities: CORRECTNESS (spec compliance), TEST COVERAGE (>80% statements, >75% branches), PERFORMANCE (N+1, no cache, no lazy loading), and CODE QUALITY (functions under 50 lines, nesting under 3). Beautifully formatted code that does not meet the spec is worthless.</p>",
    "qa_perf": "<p>QA Perf is the only agent in the system specializing EXCLUSIVELY in performance metrics. It measures response time, bundle size, memory leaks, query performance, and Core Web Vitals (LCP under 2.5s, FID under 100ms, CLS under 0.1). It works like an engineer tuning an engine on a dyno - measures every parameter and points to the specific bottleneck.</p><p>It does not write code and does not fix - only reports. The lightest in QA (load 45/100) because measurement is more pattern-based than analytical. Model: Haiku. Used by the dedicated Performance Boost preset as the central measurement tool.</p>",
    "qa_manager": "<p>QA Manager is the judge. It does not run investigations, does not question witnesses, does not audit code. It reads reports from QA Security and QA Quality and issues the verdict: GO or NO-GO. It is the ONLY agent in the entire system that sees both the security report and the quality report at the same time.</p><p>The decision framework is a 1-10 scale with a 6.0 threshold. An artifact starts with a score of 10.0 and loses points: CRITICAL -3.0, HIGH -1.0, MEDIUM -0.5, LOW -0.1. Automatic NO-GO conditions: any CRITICAL, coverage under 70%, unpatched security vulnerability. The only QA agent on Sonnet, because it requires reasoning.</p>",
    "expert_pragmatist": "<p>The Pragmatist is the Five Minds expert on feasibility, cost, timeline, and resources. It works like a company CFO - sees every idea through the lens of budget, deadline, and available people. When others call for microservices, it asks who will pay for it and how long it will take. It assesses implementation time, estimates in hours and dollars, and looks for 80/20 compromises.</p><p>In natural tension with the Innovator - ambition versus realism. It does not kill innovation, it makes sure innovation is FEASIBLE. It is not a pessimist, it is a realist: a pessimist says impossible, a realist says here is what is needed. Model: Sonnet.</p>",
    "expert_innovator": "<p>The Innovator is the Five Minds expert on competitive edge and new approaches. It works like a startup CTO - sees the technologies of the future and wants to be first to market. It does not accept good enough, it looks for the best possible solution. It proposes SPECIFIC technology names and benchmarks, not generalities.</p><p>In natural tension with the Pragmatist - ambition versus realism. It argues with market data, user research, and case studies, not opinions. It is not naive, it knows innovation costs, but ROI can be 100x. Its mandate: prevent stagnation and technical debt hidden under the label safe choice.</p>",
    "expert_analyst": "<p>The Data Analyst is the Five Minds expert on evidence, benchmarks, metrics, and KPIs. The only expert without its own agenda - its agenda is FACTS. It works like a Data Scientist on the board: when someone says this is industry standard, it asks which benchmark, which sample, which year. It does not accept storytelling without data.</p><p>Its superpower is forcing others to prove their claims. It compares against industry standards (Gartner, Forrester, Anthropic benchmarks). Often in conflict with the Innovator (data vs. vision) and the Pragmatist (data vs. experience). It does not propose solutions - it validates those proposed by others.</p>",
    "expert_user": "<p>The User Advocate is the Five Minds expert representing the end user's perspective - the only expert who does NOT think like an engineer. It works like a Product Manager with empathy: knows users personally, tested prototypes with grandma, and knows people do not read instructions. When engineers debate architecture, it asks how many clicks the user needs.</p><p>It speaks the language of the end user, not technical jargon. It watches WCAG 2.1 AA, keyboard navigation, screen readers. It assesses onboarding: whether a new user will understand the app in 30 seconds. It challenges technical solutions that sacrifice UX, because technology serves people, not the other way around.</p>",
    "expert_devil": "<p>The Shadow (Devil's Advocate) is the only agent in the entire system without domain loyalty. It can attack the position of ANY expert - Pragmatist, Innovator, Analyst, and User Advocate equally. Its mandate: prevent groupthink. If everyone agrees, that is an ALARM - consensus without conflict is suspicious.</p><p>It attacks the strongest position, the one most people agree with. It tests assumptions, looks for blind spots, forces a pre-mortem (imagine the project FAILED - why). It does not propose alternatives - its role is destruction of consensus, not construction. Inspiration: Advocatus Diaboli in the Vatican, a process that has existed since 1587 because IT WORKS.</p>",
    "decision_presenter": "<p>Decision Presenter is the Human-in-the-Loop gatekeeper. It works like an air traffic controller: planes (agents) fly autonomously, but at critical moments a human in the tower makes the final decision. It presents 2-3 decision options as readable cards with pro/con descriptions and pauses the pipeline between phases, giving time to reflect.</p><p>It manages a 120s timer with a visual countdown and progress bar; after the time runs out, it auto-decides by picking the recommended option. It does not make the decision itself - its role is PRESENTATION of options. Model: Haiku, because this is the UI layer, not the compute layer.</p>",
    "db_architect": "<p>DB Architect is the specialist for data layer design. It designs the database schema (DDL: CREATE TABLE/INDEX/CONSTRAINT or ORM models), picks indexes for real query patterns (never speculatively), writes zero-downtime migrations in the expand-backfill-contract scheme, and defines partitioning and sharding strategies.</p><p>It estimates storage and I/O cost, sets retention and soft-delete policies, recommends read replicas and cache layers. Runs on Sonnet, load 70/100. It does not pick the database technology (that is Research Tech), does not write application logic, does not run migrations in production - it delivers the plan and reversible scripts.</p>",
    "observability_engineer": "<p>Observability Engineer instruments the system into three pillars: metrics, logs, and traces. It identifies golden signals (latency, traffic, errors, saturation), designs metric names while controlling cardinality, picks log levels per module and structured JSON format, and defines trace context propagation across service boundaries.</p><p>It writes SLOs in the format metric operator value in window for X percent of requests and designs symptom-based alerts with runbooks. Picks the OpenTelemetry, Prometheus, Grafana stack. It does not write feature code, does not decide on business SLAs, does not design the database - it instruments the existing system.</p>",
    "gtm_strategist": "<p>GTM Strategist designs the go-to-market: defines the ICP (Ideal Customer Profile) and buyer personas, writes the positioning statement in the format for whom, for what, better in what, picks the pricing model (freemium/tiered/usage-based/seat-based), and maps acquisition channels (organic/paid/community/partnerships/outbound).</p><p>Proposes a launch sequence (private beta, public beta, GA) and success metrics (activation, retention, revenue) with 30/60/90 day targets. The ICP must be sharp - if it sounds like everyone, it is for nobody. Pricing anchored in value to the customer, not in cost. Does not design the product, does not write code or copy.</p>",
    "statistician": "<p>The Statistician is the guardian of methodological correctness. Designs experiments without p-hacking: formalizes H0/H1 hypotheses, picks a test matching the data type (parametric/nonparametric, independent/paired), checks assumptions (normality, homoscedasticity, independence), and calculates sample size for the required power.</p><p>Plans corrections for multiple testing (Bonferroni/BH) and defines the primary metric BEFORE looking at the data, to avoid cherry picking. Always reports effect size and CI alongside the p-value - p<0.05 alone says nothing on a small sample. Distinguishes statistical significance from practical significance.</p>",
    "eda_analyst": "<p>EDA Analyst is the specialist for Exploratory Data Analysis. Uncovers structure, quality, and surprises in the data BEFORE anyone builds a model on it. Profiles each column (type, NULL, uniques, statistics), detects anomalies with IQR/z-score methods, checks distributions (skewness, kurtosis), and proposes transformations (log, Box-Cox).</p><p>Computes Pearson/Spearman correlations and flags pairs with absolute value above 0.8 as multicollinearity risk. Generates at least 5 visualizations: histograms, boxplots, scatter matrix, correlation heatmap, missing map. Does not clean data without approval - reports and proposes.</p>",
    "control_mapper": "<p>Control Mapper maps regulatory requirements (GDPR, SOC2 Type II, ISO27001, HIPAA) to concrete technical and process controls. Breaks each regulation into atomic requirements (e.g., GDPR art. 32 encryption at-rest and in-transit), builds control matrices, and identifies gaps with critical/high/medium/low priority.</p><p>Prefers technical controls over procedural ones (automate when you can), defines reproducible and timestamped evidence. Does not interpret law, does not give legal advice, does not implement controls (that is the Backend/DevOps role), does not perform the audit - it delivers the material for the audit.</p>",
    "telemetry_surfer": "<p>Telemetry Surfer searches existing production telemetry (logs, metrics, traces) for patterns, anomalies, and incidents. Answers questions like what happened at 12:34 and do we have a memory leak - based on data from Prometheus, Loki, Tempo, CloudWatch.</p><p>Starts from golden signals in the specified window, correlates metrics with error logs and traces, identifies top contributors, checks recent deploys before the window. Key: delivers literal reproducible queries (PromQL/LogQL/TraceQL), distinguishes correlation from causation. Read-only queries, does not fix problems.</p>"
  },
  agentMid: {
    "orchestrator": "Use when you have 3+ parallel specialists and clear phases with quality gates G0-G4 to coordinate.",
    "synthesizer": "Use on projects longer than one session where MANIFEST.md and ADRs are critical for post-compaction recovery.",
    "analyst": "Use when you have a complex task with 8+ subtasks and unclear dependencies that need decomposition into a DAG.",
    "planner": "Use when the pipeline has 5+ tasks with possible parallelism and you need quality gates G0-G4 with acceptance criteria.",
    "res_tech": "Use when picking a framework or stack that demands benchmarks, 3+ option comparisons, and hard technical data.",
    "res_ux": "Use on a new project without an established design system when you need a mood board and a WCAG audit.",
    "res_reddit": "Use when you need ground truth from practitioners running the solution in production, not vendor marketing.",
    "res_x": "Use for early detection of tech-community trends and real-time measurement of product launch reactions.",
    "res_github": "Use when you want a reference implementation of a pattern or need to assess the health of an open-source library before adoption.",
    "res_forums": "Use for concrete \"how do I X in Y\" problems where someone has already solved it on Stack Overflow.",
    "res_docs": "Use when you need authorized facts from a framework's official documentation with precise URLs.",
    "res_critic": "Use when you have 4+ parallel researcher reports to cross-validate for contradictions and bias.",
    "backend": "Use when you have a finished API spec and need endpoints, schemas, validation, and business logic with TDD tests.",
    "frontend": "Use when you have a design system and a wireframe and need responsive UI components with accessibility and performance from day one.",
    "feature": "Use for real-time, AI/ML, data visualization, or third-party APIs - wherever standard Backend and Frontend fall short.",
    "designer": "Use when you have a mood board from Researcher UX and need design tokens, palettes, typography, animations, and dark/light mode.",
    "integrator": "Use at the end of BUILD to merge outputs from Coder, Designer, and Writer, verify API contracts, and run E2E tests.",
    "writer": "Use to polish README, CHANGELOG, API docs, and decision records when the code is ready but documentation is still notes.",
    "qa_security": "Use for every artifact before production deployment, especially code touching authentication and agent systems.",
    "qa_quality": "Use when you have a spec and require test coverage above 80 percent - quality audit before release, verification of compliance with requirements.",
    "qa_perf": "Use when you care about Core Web Vitals, response time, bundle size, or memory leaks - Performance Boost preset is its natural habitat.",
    "qa_manager": "Use when you need a formal GO/NO-GO decision before release - synthesizes Security and Quality reports into a single 1-10 verdict.",
    "expert_pragmatist": "Use in Five Minds debates when the debate risks drifting away from the realism of budget, timeline, or team competence.",
    "expert_innovator": "Use in Five Minds debates when the team risks picking safe old solutions instead of exploring new competitive advantages.",
    "expert_analyst": "Use in Five Minds debates when the decision requires hard data and benchmarks instead of opinions, intuition, or storytelling.",
    "expert_user": "Use in Five Minds debates when the team risks designing for engineers instead of the end user.",
    "expert_devil": "Use in Five Minds debates when everyone agrees too quickly - without the Shadow the system is blind to its own errors and groupthink.",
    "decision_presenter": "Use when the pipeline has critical decision points and you want a human to have the final word - 3 gates in Deep Five Minds.",
    "db_architect": "Use when you are designing a new database schema, planning zero-downtime migrations, or need an indexing and partitioning strategy.",
    "observability_engineer": "Use when you are instrumenting a system with metrics, logs, and traces, defining SLOs, or designing dashboards and symptom-based alerts.",
    "gtm_strategist": "Use when you have an MVP and need ICP, positioning, a pricing model, and a launch plan with channels and 30/60/90 day KPIs.",
    "statistician": "Use when designing experiments, A/B tests, and analyses requiring hypothesis tests - before you touch the data, not after.",
    "eda_analyst": "Use as the first step on a new dataset - profiles data, detects anomalies and surprises before you start modeling.",
    "control_mapper": "Use when preparing for a GDPR, SOC2, ISO27001, or HIPAA audit and you need a control matrix and gap analysis.",
    "telemetry_surfer": "Use for incident post-mortems and production debugging, when you have telemetry and the question why/when/how wide."
  },
  agentGreen: {
    "orchestrator": [
      "3+ specialists in parallel",
      "Clear pipeline phases",
      "Quality gates G0-G4",
      "Multi-source synthesis",
      "Delegation coordination"
    ],
    "synthesizer": [
      "Long multi-session projects",
      "MANIFEST as SSoT",
      "ADR archive",
      "Post-compaction recovery",
      "Inter-agent broker"
    ],
    "analyst": [
      "Decomposing 8+ subtasks",
      "DAG dependency graph",
      "Structured handoff",
      "Complexity S/M/L/XL",
      "Specialization categories"
    ],
    "planner": [
      "Schedule with parallelism",
      "Critical path",
      "Quality gates G0-G4",
      "4 execution modes",
      "Plan-and-Execute pattern"
    ],
    "res_tech": [
      "Framework selection",
      "Performance benchmarks",
      "Comparing 3+ options",
      "Rule 3-3-3",
      "Source hierarchy"
    ],
    "res_ux": [
      "Mood board with 5+ refs",
      "WCAG 2.1 AA audit",
      "Design trends",
      "Design system analysis",
      "No established style yet"
    ],
    "res_reddit": [
      "Ground truth from practitioners",
      "Community sentiment",
      "Validation vs marketing",
      "Ragepost detection",
      "Comment triangulation"
    ],
    "res_x": [
      "Early trend warning",
      "First 24h reactions",
      "Hype score 0-10",
      "Influencer mapping",
      "Thread analysis"
    ],
    "res_github": [
      "Reference implementation",
      "8-metric health assessment",
      "Pattern extraction",
      "Architecture analysis",
      "Issue analysis"
    ],
    "res_forums": [
      "Concrete how-to answers",
      "Stack Overflow lookup",
      "Lessons learned",
      "Pattern recognition",
      "Long-form tutorials"
    ],
    "res_docs": [
      "Official facts",
      "Config snippets",
      "Best practices",
      "Security guidelines",
      "Version-matched docs"
    ],
    "res_critic": [
      "Cross-validating reports",
      "Contradiction detection",
      "Confirmation bias check",
      "Scoring rubric",
      "Gap detection"
    ],
    "backend": [
      "API endpoints + schemas",
      "Request validation",
      "Business logic",
      "TDD tests",
      "Error handling",
      "Data migrations"
    ],
    "frontend": [
      "Responsive UI components",
      "State management",
      "Accessibility aria/keyboard",
      "Lazy loading + code split",
      "Dark/light mode",
      "SPA routing"
    ],
    "feature": [
      "WebSocket real-time",
      "AI/ML integrations",
      "D3/Canvas visualizations",
      "Stripe + OAuth flows",
      "Streaming APIs",
      "Webhook handlers"
    ],
    "designer": [
      "CSS design tokens",
      "Palettes and typography",
      "Micro-animations",
      "Dark/light mode",
      "SVG icons",
      "Grid/flexbox layout"
    ],
    "integrator": [
      "Merging BUILD outputs",
      "API contract verification",
      "E2E test flow",
      "Conflict resolution",
      "Compliance validation"
    ],
    "writer": [
      "README.md + instructions",
      "CHANGELOG",
      "API docs",
      "Decision records",
      "Grammar polish",
      "Terminology consistency"
    ],
    "qa_security": [
      "Pre-release audit",
      "OWASP Top 10",
      "Prompt injection scan",
      "Hardcoded secrets hunt",
      "Dependency CVE scan",
      "SOC2 compliance"
    ],
    "qa_quality": [
      "Spec compliance check",
      "Test coverage audit",
      "Edge case review",
      "N+1 query detection",
      "Code smell audit",
      "Pre-release QA gate"
    ],
    "qa_perf": [
      "Core Web Vitals audit",
      "Bundle size analysis",
      "Response time measurement",
      "Memory leak detection",
      "Query performance review"
    ],
    "qa_manager": [
      "Formal GO/NO-GO gate",
      "Multi-dim audit synthesis",
      "Release risk assessment",
      "Iterative fix loop control",
      "Stakeholder reporting"
    ],
    "expert_pragmatist": [
      "Budget reality check",
      "Timeline estimation",
      "ROI analysis",
      "Resource feasibility",
      "Cost/quality tradeoffs"
    ],
    "expert_innovator": [
      "Competitive edge hunt",
      "New tech evaluation",
      "Cross-domain inspiration",
      "Market trend analysis",
      "Differentiation strategy"
    ],
    "expert_analyst": [
      "Benchmark validation",
      "KPI definition",
      "Evidence demand",
      "Data-driven decisions",
      "Claim fact-checking"
    ],
    "expert_user": [
      "UX perspective advocacy",
      "Accessibility a11y check",
      "Onboarding assessment",
      "Click-count reduction",
      "End-user empathy"
    ],
    "expert_devil": [
      "Groupthink prevention",
      "Pre-mortem analysis",
      "Assumption testing",
      "Worst-case identification",
      "Blind spot discovery"
    ],
    "decision_presenter": [
      "HITL decision gates",
      "Pipeline pause for human",
      "Option card presentation",
      "Timer-based auto-decide",
      "Decision logging"
    ],
    "db_architect": [
      "DDL schema + indexes",
      "Zero-downtime migrations",
      "Partitioning strategy",
      "Query pattern tuning",
      "Retention policies"
    ],
    "observability_engineer": [
      "Metrics + logs + traces",
      "SLI/SLO definitions",
      "Symptom-based alerts",
      "Grafana dashboards",
      "W3C trace propagation"
    ],
    "gtm_strategist": [
      "ICP and buyer personas",
      "Positioning statement",
      "Pricing model",
      "Acquisition channels",
      "Beta/GA launch plan"
    ],
    "statistician": [
      "Hypothesis design",
      "Sample size calculation",
      "Test selection",
      "Multiple testing correction",
      "Effect size reporting",
      "A/B test planning"
    ],
    "eda_analyst": [
      "Dataset profiling",
      "Anomaly detection",
      "Correlation analysis",
      "Distribution checks",
      "Missing data mapping",
      "Pre-modeling reconnaissance"
    ],
    "control_mapper": [
      "GDPR/SOC2 control matrix",
      "Gap analysis",
      "Compliance evidence",
      "Gap prioritization",
      "Technical controls"
    ],
    "telemetry_surfer": [
      "Incident post-mortems",
      "Metrics-to-logs correlation",
      "Golden signals analysis",
      "Reproducible PromQL",
      "Root cause hypotheses"
    ]
  },
  agentRed: {
    "orchestrator": [
      "Simple 1-agent task",
      "2-step A to B pipeline",
      "Exploratory sessions",
      "User acting as PM"
    ],
    "synthesizer": [
      "One-off scripts",
      "Tiny bugfixes",
      "Team of 1-2 agents",
      "Simple feature toggle"
    ],
    "analyst": [
      "1-3 step tasks",
      "Solo hacking",
      "Action list already set",
      "Exploratory sessions"
    ],
    "planner": [
      "1-3 step pipeline",
      "Obvious sequence",
      "Experiment without order",
      "Reverse engineering"
    ],
    "res_tech": [
      "Known stack",
      "Throwaway prototype",
      "Decision already made",
      "Non-technical questions"
    ],
    "res_ux": [
      "Established design system",
      "Backend-only tasks",
      "Incremental changes",
      "CSS implementation"
    ],
    "res_reddit": [
      "Niche technologies",
      "Hard documentation",
      "Throwaway prototype",
      "Controversy without consensus"
    ],
    "res_x": [
      "Hard technical decisions",
      "Niche with no presence",
      "Deep analysis",
      "Ground truth validation"
    ],
    "res_github": [
      "No open-source repos",
      "Needing benchmarks",
      "License blocks the pattern",
      "Hunting trends"
    ],
    "res_forums": [
      "Bleeding-edge technologies",
      "Architecture-level work",
      "Trends and hype",
      "Practitioner feedback"
    ],
    "res_docs": [
      "User opinions",
      "Technology comparisons",
      "Quality assessment",
      "Code implementation"
    ],
    "res_critic": [
      "Own research",
      "Technology decisions",
      "Writing code",
      "Rubber-stamping reports"
    ],
    "backend": [
      "Architecture design",
      "Framework research",
      "Writing frontend",
      "Technology decisions",
      "Security audits"
    ],
    "frontend": [
      "Design system design",
      "API implementation",
      "Security testing",
      "Stack selection",
      "Writing copy"
    ],
    "feature": [
      "Basic CRUD",
      "UI design",
      "Running research",
      "System integration",
      "Generalist tasks"
    ],
    "designer": [
      "UX trend research",
      "JavaScript logic",
      "Writing tests",
      "Text content",
      "Component integration"
    ],
    "integrator": [
      "Writing new code",
      "Designing",
      "Quality audits",
      "Force merge without testing",
      "Late integration"
    ],
    "writer": [
      "Logic code",
      "Research",
      "Visual design",
      "Running scripts",
      "Over-documentation"
    ],
    "qa_security": [
      "Internal POCs",
      "Offline isolated code",
      "Duplicating external scanners",
      "Experimental prototypes",
      "Fixing code"
    ],
    "qa_quality": [
      "Prototypes without spec",
      "MVP speed > quality",
      "Experimental code",
      "Projects with CI/CD auto-tests",
      "Fixing bugs"
    ],
    "qa_perf": [
      "Early prototypes",
      "Code without baseline metrics",
      "Micro-optimization",
      "Security audit",
      "Code quality review"
    ],
    "qa_manager": [
      "MVP without release gate",
      "Hotfix without time",
      "Single-dimension QA",
      "Human code review",
      "Architecture decisions"
    ],
    "expert_pragmatist": [
      "Code implementation",
      "Sole innovation blocker",
      "Pessimistic blockades",
      "Purely technical debate",
      "Fast solo decisions"
    ],
    "expert_innovator": [
      "Ignoring costs",
      "Shiny object syndrome",
      "Over-engineering MVP",
      "Hype-driven decisions",
      "Code implementation"
    ],
    "expert_analyst": [
      "Proposing solutions",
      "Analysis paralysis",
      "Vanity metrics worship",
      "Data cherry-picking",
      "Decisions without data"
    ],
    "expert_user": [
      "Architecture decisions",
      "Code implementation",
      "Ignoring tech constraints",
      "Feature bloat advocacy",
      "Design by committee"
    ],
    "expert_devil": [
      "Proposing alternatives",
      "Soft critique",
      "Nihilistic blocking",
      "Attack without substance",
      "Consensus building"
    ],
    "decision_presenter": [
      "Making decisions",
      "Technical analysis",
      "Dynamic options",
      "Interfering with agent work",
      "Too many HITL gates"
    ],
    "db_architect": [
      "Picking database tech",
      "Application logic",
      "Production migrations",
      "Speculative indexes"
    ],
    "observability_engineer": [
      "Feature code",
      "Business SLAs",
      "Database design",
      "Logging PII without redaction"
    ],
    "gtm_strategist": [
      "Product design",
      "Writing code",
      "UX research",
      "Ad copy writing"
    ],
    "statistician": [
      "Data exploration",
      "ML pipelines",
      "Business interpretation",
      "Metric cherry-picking",
      "P-hacking"
    ],
    "eda_analyst": [
      "Building ML models",
      "Hypothesis testing",
      "Cleaning without approval",
      "Outlier removal",
      "Feature engineering decisions"
    ],
    "control_mapper": [
      "Legal advice",
      "Implementing controls",
      "Running the audit",
      "Interpreting law"
    ],
    "telemetry_surfer": [
      "Fixing problems",
      "Designing metrics",
      "Production changes",
      "Over-interpreting correlations"
    ]
  },
  presetLong: {
    "solo": "<strong>The idea:</strong> Sometimes a task is so simple that adding more people to the team only slows things down. It's like calling a renovation crew to change one light bulb - pointless. One person and a moment is enough. This preset gives you exactly that: one agent, one task, zero overhead.<br><br><strong>How it works:</strong> The main agent gets the task and immediately gets to work. A second agent acts as validator, quickly checking that the result is correct and nothing got broken. Zero extra planning, zero waiting on others.<br><br><strong>What you get:</strong> A fixed bug or finished small code change, a quick verification that it works, a short summary of what was done.<br><br><strong>Ideal for:</strong> a small bug like a typo or a missing empty-field check, a simple fix in one file, small one-off scripts, a button that reacts wrong, quick code cleanups.<br><br><strong>Don't use when:</strong> the task touches several places at once, you need to gather information before changing anything, or the stakes are high and you need a second check from someone more experienced.",
    "quick_fix": "<strong>The idea:</strong> When something is on fire in production, you don't have time to talk. You need to act in a loop: try, check, fix, check - until it stops burning. It's like a mechanic tightening a bolt, checking whether it stopped dripping, tightening again if needed, until it holds. Zero wasted steps.<br><br><strong>How it works:</strong> One agent tries to fix the bug, another immediately checks whether the fix worked, a third verifies nothing else broke. If something still isn't right, the loop starts over. All in one continuous session.<br><br><strong>What you get:</strong> A fixed problem ready to ship, a short summary of what was wrong and what got changed, confirmation that the basics still work.<br><br><strong>Ideal for:</strong> urgent hotfixes when something blew up in production, a simple bug whose fix needs a few attempts, emergency patches that have to ship today, situations when customers are writing in full panic.<br><br><strong>Don't use when:</strong> the problem is complex and you don't know the root cause, the fix requires changes in many places, or you have time to properly investigate instead of slapping on quick patches.",
    "recon": "<strong>The idea:</strong> Before diving into an unknown topic, it's worth sending out a scout. Imagine walking into a dark room - better to glance inside first before doing anything there. This preset sends one agent on reconnaissance and only then starts building anything.<br><br><strong>How it works:</strong> First the main agent splits the work. A second agent gathers information: reads docs, checks how others did it before, writes down what it finds. Only then does a third agent write simple test code based on that information to verify the idea works.<br><br><strong>What you get:</strong> A short report with topic notes, a prototype showing whether the idea is feasible, a list of things to polish in the next step, warnings about traps ahead.<br><br><strong>Ideal for:</strong> checking whether a technology fits your project, a quick prototype for a client meeting, evaluating a new library before committing to it, first contact with an unfamiliar topic, a feasibility study before a bigger decision.<br><br><strong>Don't use when:</strong> you already know what you want to build and have a plan, you're building something meant for customers (this is only a prototype), or you need thorough analysis from multiple sources.",
    "trio": "<strong>The idea:</strong> The classic triangle: backend, frontend, and someone checking quality. This is the smallest team that can deliver a working feature end to end. Like three friends building a small app together - one handles the server, another the screen, the third tests before showing the client.<br><br><strong>How it works:</strong> The first agent writes the backend - server-side logic and database. The second builds the frontend - what the user sees on screen. The third checks that everything fits: forms react, data flows correctly, no obvious bugs.<br><br><strong>What you get:</strong> A working feature with the full stack: server, screen, and basic tests that everything ties together, ready to integrate with the rest of the app.<br><br><strong>Ideal for:</strong> a simple form that saves data, a small CRUD app (add/remove/edit), a small API with a simple panel, a prototype with working logic, the first feature in a new project.<br><br><strong>Don't use when:</strong> you need detailed design before coding, the task requires gathering information from many sources, or the stakes are high and you need thorough security tests.",
    "reflect": "<strong>The idea:</strong> Sometimes the point isn't to build something but to really understand a topic. It's like preparing for an important meeting: one person gathers materials, another arranges them into a coherent picture, and a third challenges the conclusions and checks nothing was stretched. You get a serious analysis, not a surface glance.<br><br><strong>How it works:</strong> The first agent gathers every piece of information it can find. The second analyzes that data, looks for patterns, and writes preliminary conclusions. The third sharply critiques those conclusions: looks for gaps, weak arguments, places where something got skipped. All the work without writing a single line of code.<br><br><strong>What you get:</strong> A thought-out report with conclusions, a list of weak points and things to double-check, justification for every conclusion, a note on where information was missing.<br><br><strong>Ideal for:</strong> deep analysis before a decision, due diligence before buying a company or service, review of a proposed solution, evaluation of a business idea, risk analysis, verification that something that sounds good actually is.<br><br><strong>Don't use when:</strong> you need working code (this preset builds nothing), the topic is trivial and doesn't need deep critique, or the decision has to land in 5 minutes.",
    "bug_hunt": "<strong>The idea:</strong> Some bugs are tricky: you fix one spot and suddenly another breaks. It's like fixing up an old house - every nail can pull another hole in the wall. So it's better to have someone fixing plus two more people in parallel checking that nothing else went sideways in the process.<br><br><strong>How it works:</strong> The main agent assigns tasks. One agent takes on the bug fix. Two testers work in parallel: one checks whether the fix itself works, the other tests other parts of the app to see if they still hold. If anyone finds a new issue, the loop repeats.<br><br><strong>What you get:</strong> A fixed bug, a report on exactly what was wrong, confirmation that nothing else broke along the way, a short note on how to avoid a similar problem in the future.<br><br><strong>Ideal for:</strong> a bug that was already \"fixed\" once and came back, an error in an old system where you're scared to touch anything, a problem in an area touching many features, a bug after the last deploy.<br><br><strong>Don't use when:</strong> the reporter only writes \"something doesn't work\" with no details, you can't reproduce the bug, or the bug is trivial and doesn't need 4 agents.",
    "content": "<strong>The idea:</strong> A good text isn't a single guess. Before writing, someone has to gather facts, someone has to organize them, then write, and finally someone has to check for typos and make sure everything adds up. Picture a newspaper newsroom: reporters gather material, the editor writes, copy catches errors. This preset does exactly that.<br><br><strong>How it works:</strong> Two agents gather information from different sources in parallel. An editor takes what they found and writes a coherent text from it. At the end a quality agent checks for typos, confirms the facts match the sources, and checks the text makes sense to the reader.<br><br><strong>What you get:</strong> A text ready to publish, a list of sources the facts came from, a short note on whether the text matches the brand tone, suggestions for any edits.<br><br><strong>Ideal for:</strong> a company blog post, a product description for a store, a landing page for a new service, user documentation, a monthly client report, a newsletter post.<br><br><strong>Don't use when:</strong> you need code (this preset writes no code), the text is only a 2-sentence social media post (too heavy), or you have a highly specialized topic that needs a real expert.",
    "plan_exec": "<strong>The idea:</strong> When the change is bigger, the worst thing you can do is throw yourself at the code without a plan. The result: half the work tossed out, forgotten pieces, errors from the rush. Better to look at the map first: what exactly needs doing, in what order, what can go wrong. Only then start acting. Like building a house - first the blueprint, then the foundation, then the walls.<br><br><strong>How it works:</strong> The first agent makes a detailed plan broken into stages and action order. The second lays out a concrete schedule. The third executes the plan step by step. The fourth checks at the end whether every step was actually done correctly.<br><br><strong>What you get:</strong> A plan with concrete steps, a schedule with order and dependencies, executed code matching the plan, a report on what was done and what still needs finishing.<br><br><strong>Ideal for:</strong> migrating an old system to a new one, bigger code cleanup, moving features from one place to another, a change touching many files at once, a project with a clear end but many steps along the way.<br><br><strong>Don't use when:</strong> the task is small and planning is overkill, you have 5 minutes and no time to plan, or you already have a plan and only need execution.",
    "perf_boost": "<strong>The idea:</strong> When the site crawls or the API responds in 5 seconds, customers leave. But \"optimize this\" without a plan wastes time - you have to measure what exactly is slow first, then fix that specific spot, and at the end verify that it really is faster. Like swapping car parts: diagnostics first, wrench second.<br><br><strong>How it works:</strong> The first agent investigates what exactly is slow (database, backend code, queries, memory). The second writes a fix in the server-side code. The third is a performance measurement specialist who measures before and after the fix so the real effect is visible.<br><br><strong>What you get:</strong> A report on what exactly was slow, fixed code, before/after measurements with concrete numbers (e.g., \"API now responds in 200ms instead of 2s\"), a list of further improvements still possible.<br><br><strong>Ideal for:</strong> an API that responds too slowly, a home page that loads forever, database queries eating resources, an admin panel that hangs, a list that takes ages to render.<br><br><strong>Don't use when:</strong> \"it feels slow\" but nobody measured it (measure first), the issue is visual not performance, or you're optimizing something nobody uses.",
    "startup": "<strong>The idea:</strong> A startup doesn't need perfect code, just a working version to show customers or investors that the idea has legs. Zero ceremony, maximum speed. Picture a 5-person crew in a garage: everyone handles their piece and a week later you have the first version to test. This preset is exactly that.<br><br><strong>How it works:</strong> The main agent splits the work. An analyst figures out what the customer actually wants. A research agent checks how other apps did it. A builder writes the code: backend and a simple screen. At the end a quality agent tests the basics and briefly summarizes what works and what doesn't yet.<br><br><strong>What you get:</strong> A working prototype with the most important features, a simple user screen, short docs on how to run it, a list of things to finish in the next version.<br><br><strong>Ideal for:</strong> a first customer version of an app (MVP), a prototype for an investor pitch, a hackathon, a small SaaS to test whether the idea catches on, a demo for a sales meeting.<br><br><strong>Don't use when:</strong> you're building something that must be reliable from day one (e.g., payments, medical data), you have plenty of time and want solid code right away, or the task is more than a small prototype.",
    "cascade": "<strong>The idea:</strong> The most expensive AI model is great but expensive. If the task is simple, using the most expensive model is like taking a limo to the grocery store. Better to use a cascade: start with the cheap model, if it handles the task you're done. If not, move to the mid-tier. Only if mid-tier can't handle it does the most expensive model step in. 70-80% savings at comparable results.<br><br><strong>How it works:</strong> First the cheap model (Haiku) takes the task. If the result is good enough, done. If not, the task moves to the mid-tier (Sonnet). If mid-tier also can't handle it, only then does the top model (Opus) step in. Each model knows when to give up and pass the task on.<br><br><strong>What you get:</strong> The task done, a report on which model did what percentage of the work, a cost much lower than if the top model did everything, quality comparable to the top model alone.<br><br><strong>Ideal for:</strong> large volumes of repetitive tasks (email classification, content tagging), batch document processing, handling lots of simple questions cheaply, situations where most tasks are easy but a few are hard.<br><br><strong>Don't use when:</strong> every task is complex and ends up on the top model anyway, you need guaranteed quality on every single case, or the volume is small and savings don't matter.",
    "test_suite": "<strong>The idea:</strong> Before shipping a new version you want to be sure nothing blows up. But one person won't catch everything - everyone has their blind spots. Better to have a tester team: one specializing in security, another in general quality, a third in performance, and a test lead deciding whether it can ship. Like an exam board instead of a single examiner.<br><br><strong>How it works:</strong> The main agent splits the work. Three testing specialists check the code from different angles in parallel: one for quality and correctness, another for security, a third for performance. The test lead (manager) collects all reports and at the end says: ship it (GO) or fix it (NO-GO) with justification.<br><br><strong>What you get:</strong> Reports from 3 testing areas, a list of bugs sorted by severity (from critical to minor), a clear GO/NO-GO decision with justification, suggestions on what to fix before you try shipping again.<br><br><strong>Ideal for:</strong> the last check before pushing a version to production, an automatic gate on code merge, a periodic app quality review, before an important client demo.<br><br><strong>Don't use when:</strong> you need code written (this preset only tests), the task is so small it's not worth it, or you already know the code has bugs and want to fix them (use bug_hunt).",
    "a11y": "<strong>The idea:</strong> An app that works for some doesn't automatically work for everyone. Blind users rely on screen readers. Users with vision issues need good contrast. Users with motor issues navigate with the keyboard instead of the mouse. This isn't a whim - it's a requirement from many corporate customers and the law in many countries. This preset checks that everyone can use your app.<br><br><strong>How it works:</strong> A user experience specialist investigates what problems different groups might have. A designer prepares graphic fixes (colors, contrast, button sizes). A frontend agent applies the changes in screen code. A tester checks whether everything works with a screen reader and keyboard. At the end someone documents the changes.<br><br><strong>What you get:</strong> A fixed interface with good contrast and keyboard support, an accessibility audit report (what was wrong and what was fixed), WCAG compliance, docs for the team on how to keep accessibility going.<br><br><strong>Ideal for:</strong> before shipping an app to external customers, meeting requirements from corporate or public-sector customers, legal accessibility compliance, a redesign that should also cover users with disabilities, an accessibility audit on an existing product.<br><br><strong>Don't use when:</strong> the app is internal and no disabled users touch it, the project has no graphical interface at all, or you only need a quick fix for one small problem.",
    "security": "<strong>The idea:</strong> A single security agent will always miss something. Attackers use different angles: one hunts code bugs, another exploits old libraries with known holes, a third attacks authentication. So better to have several specialists looking for different things in parallel, with a team lead collecting results and deciding whether the change can ship safely. Like airport security - x-ray, metal detector, and a dog trained on explosives, each catching something different.<br><br><strong>How it works:</strong> An agent builds or fixes code. Three security specialists check in parallel: one the code for security bugs, another the libraries for known vulnerabilities, a third the auth and permissions flow. The team lead collects reports, builds a risk list sorted by severity, and makes the GO/NO-GO call.<br><br><strong>What you get:</strong> A report from 3 security layers, a list of issues rated by severity (critical, high, medium, low), concrete remediation advice, a shipping decision with justification, an audit trail for compliance.<br><br><strong>Ideal for:</strong> before shipping a feature touching personal data or payments, an audit before a big deploy, prep for a corporate customer's security audit, after finding a vulnerability that needs a thorough review, a regular quarterly check.<br><br><strong>Don't use when:</strong> the app touches no sensitive data, the change is cosmetic (text, colors), you only need one library checked (overkill), or you have automated tools like Snyk doing this non-stop.",
    "review": "<strong>The idea:</strong> Imagine a writer proofreading their own book - they'll always miss something because they have a twin view of their own text. Same with code. The problem is that when the same person writes and checks, they struggle to spot their own errors. This preset separates the roles - first someone builds, then two OTHER people review.<br><br><strong>How it works:</strong> First one agent analyzes the task, a second writes the code, and at the end two others review the finished result: one for security (any holes?), the other for quality (is the code clean?). A lead collects the notes and issues a verdict.<br><br><strong>What you get:</strong> Finished code plus a report with notes from two reviewers - what works well, what needs fixing, whether it can ship to production.<br><br><strong>Ideal for:</strong> important changes in code that reaches customers, changes in payments or auth, code written by junior developers, code touching sensitive parts of the system.<br><br><strong>Don't use when:</strong> small fixes like a typo, cosmetic changes with no logic impact, or projects nobody will actually use.",
    "design_sys": "<strong>The idea:</strong> Imagine building a house where every room has a different wall color, different door handles, different light switches. Chaos. A design system is a rulebook saying \"across the company we use THESE three colors, THESE two fonts, THESE buttons.\" The problem is that without such rules every page looks different and users get lost.<br><br><strong>How it works:</strong> Two agents search for patterns in parallel - one studies design trends, the other reads docs of known libraries. Then a designer arranges it into a coherent system, a frontend engineer codes it, and a writer creates instructions on how to use it.<br><br><strong>What you get:</strong> Ready color, font, and spacing sets, a small component library (buttons, fields, cards) plus documentation on how to use it.<br><br><strong>Ideal for:</strong> companies cleaning up their visual identity, launching a new brand, consolidating several products under one style, building a reusable component library.<br><br><strong>Don't use when:</strong> you're building backend features (not what this is about), you have one small page (overkill), or you're using a ready-made system like Material or Bootstrap.",
    "api_modern": "<strong>The idea:</strong> Imagine an old house where you want to replace the pipes and wiring without touching the wallpaper and furniture. The user sees nothing, but the utilities work much better. Same with API modernization - the app's \"engine\" used by other programs. The problem is that an old API is hard to evolve, sometimes has holes or runs slow.<br><br><strong>How it works:</strong> First an analyst surveys what's there, then a researcher looks for modern patterns, next a backend engineer rewrites the code and an integrator makes sure old connections still work, and finally a tester checks everything.<br><br><strong>What you get:</strong> A cleaned-up API with new versions, documentation for developers, a safety net ensuring old apps still work unchanged.<br><br><strong>Ideal for:</strong> quietly modernizing an old system, switching from one technology to another (e.g., REST to GraphQL), adding versioning to API contracts, paying down technical debt under the hood.<br><br><strong>Don't use when:</strong> you want to change the app's look (not what this is), you're adding a brand new feature visible to users, or your system has no API yet.",
    "ui_overhaul": "<strong>The idea:</strong> Picture a full apartment renovation - same number of rooms, same doors, but new walls, new furniture, new lighting. People walk in and say \"wow, it looks young again.\" Same with an app that works well but looks old - you lose customers, because looks are the first impression.<br><br><strong>How it works:</strong> Two teams gather ideas in parallel - one studies interface trends, the other checks technical constraints. Then an analyst settles what's possible, a designer draws the new look, a frontend engineer codes it, and a tester checks everything works and is accessible.<br><br><strong>What you get:</strong> A new look for the app with all logic and data preserved, a new color palette, new fonts, better spacing, subtle animations.<br><br><strong>Ideal for:</strong> products that work well but look old, switching to a dark theme, adding modern effects, modernizing a landing page, a redesign after customer feedback.<br><br><strong>Don't use when:</strong> you're adding new functionality (different preset), the main problem is on the backend, or you have no UI yet to rework.",
    "feature_sprint": "<strong>The idea:</strong> Picture adding an extra room to a house - you need to check whether the load-bearing wall can take it, plan, hire masons, an electrician, a painter, and finally walk through the final inspection. Same with a new feature in an app. The problem is that without such a process either something gets forgotten or someone misreads the requirements and you end up redoing it.<br><br><strong>How it works:</strong> First an analyst breaks the idea into smaller pieces, then two teams research in parallel (one the technical side, the other the user side), next backend and frontend engineers build, and a tester checks everything works.<br><br><strong>What you get:</strong> A finished feature with backend and frontend code, tested, ready to deploy. Plus docs on how to use it.<br><br><strong>Ideal for:</strong> adding a new feature like comments, favorites, data export, a notification system, payment integration, a new screen in a mobile app.<br><br><strong>Don't use when:</strong> you're only fixing the look (use UI Overhaul), it's just a bug fix (use Bug Hunter), or you don't yet have a clear idea of what you want to build.",
    "standard": "<strong>The idea:</strong> Imagine walking into a hardware store and asking \"what should I buy if I don't know yet what I'll be doing?\". The clerk hands you a universal kit that covers 70% of situations. Same with Standard Dev - the preset you pick when you don't know which to pick. The problem is that specialized presets are great when you know what you want, but often it's not worth the time deciding.<br><br><strong>How it works:</strong> Eight agents in four layers: a lead manages, a planner splits the work, a researcher gathers info, backend and frontend engineers build, a tester checks. The classic architectural-office setup.<br><br><strong>What you get:</strong> Full backend and frontend code, a plan of what was done, a test report, technical docs. Nothing extra, nothing missing.<br><br><strong>Ideal for:</strong> typical web projects, SaaS apps, admin panels, platforms with login and data, shaping a new feature when you don't know where to start.<br><br><strong>Don't use when:</strong> very simple fixes (too many people for a small task), research-only work with no code (use Research Swarm), irreversible strategic decisions (use Five Minds).",
    "data_pipe": "<strong>The idea:</strong> Picture an oil refinery - raw material goes in, passes through pipes and filters, and comes out as fuel ready to sell. Same with company data: somewhere there are raw numbers (in a database, a file, a CRM), and you need finished reports. The problem is that doing this by hand doesn't work, because there's too much data and it changes daily.<br><br><strong>How it works:</strong> A planner lays out the steps, a researcher checks the data format, a backend engineer writes the ingest code, a feature specialist writes the processing logic, and an integrator ties everything into one automated flow.<br><br><strong>What you get:</strong> An automated data flow from one place to another, cleaning and transformation rules, documentation of sources and destinations, ready to plug into reports.<br><br><strong>Ideal for:</strong> building a data warehouse, automated reports for the board, data migration between systems, daily dashboard refreshes, collecting data from many sources into one place.<br><br><strong>Don't use when:</strong> you're building a regular web app with a UI (different preset), you have one simple database query, or you have no data sources to plug in yet.",
    "research": "<strong>The idea:</strong> Imagine having to choose between 5 cars where each has different pros and cons, opinions conflict, and every salesman tells you something different. Six people read tests, forums, expert sites, comparisons, and owner reviews in parallel, and at the end someone turns it into one report. The problem is one person can never handle that many sources at once - they lose the thread.<br><br><strong>How it works:</strong> Six agents read different sources in parallel (documentation, GitHub, forums, Reddit, expert articles), each writes a short summary. A critic checks whether anyone is lying or contradicting themselves, and the final writer produces a coherent report.<br><br><strong>What you get:</strong> A structured report from six perspectives, every claim tied to its source, confidence tags (certain / probable / speculation), a list of contradictions, and an executive summary on page one.<br><br><strong>Ideal for:</strong> picking a technology for the next 3 years, market research before a product launch, competitive analysis, due diligence before an investment, literature review on a topic.<br><br><strong>Don't use when:</strong> you need code (this preset programs nothing), the decision has to happen in 5 minutes, you already have one trusted source of answers.",
    "ab_test_lab": "<strong>The idea:</strong> Imagine running a taste test between two drinks but you only sample 10 people - half get drink X, half get Y. The result is noise. Many companies run A/B tests like this and then ship changes based on bogus statistics. The problem is a bad test gives you false conclusions and you can lose money rolling out the wrong change.<br><br><strong>How it works:</strong> A statistician calculates the sample size needed for a trustworthy result, a designer draws two variants, a Devil's Advocate hunts for flaws in the plan (cherry-picking, p-hacking, instrumentation bugs), and someone signs off on the plan before the test starts.<br><br><strong>What you get:</strong> A test plan with sample-size calculation, two ready-to-ship variants, the list of metrics to instrument, a list of traps to avoid, and a signed approval document.<br><br><strong>Ideal for:</strong> pricing tests, signup flow variants, checkout changes, landing page tests, payment layout variants.<br><br><strong>Don't use when:</strong> you have too few users (the test would run for months), you don't yet know what to measure, the change is a minor cosmetic tweak.",
    "tech_writing_pipe": "<strong>The idea:</strong> Imagine writing a longer expert article and just start typing - three hours in you realize the facts are wrong, the structure is chaotic, and there are no diagrams. A professional writer first builds an outline, then gathers facts, then drafts, then adds visuals, and finally has someone else review. Without that separation, content often contains hallucinations or a messy flow of thought.<br><br><strong>How it works:</strong> First an analyst builds the outline and defines the audience, then two researchers gather facts in parallel (one from docs, one from GitHub), a writer drafts text based only on those facts, a designer adds diagrams, someone picks SEO keywords, and at the end a critic verifies everything lines up.<br><br><strong>What you get:</strong> A long article or whitepaper with facts, code examples, diagrams, titles and meta descriptions for search engines, fact-checked. Ready to publish.<br><br><strong>Ideal for:</strong> deep company blog posts, customer whitepapers, trade magazine articles, conference talks, customer case studies, developer guides.<br><br><strong>Don't use when:</strong> short Twitter posts, social media updates, quick emails, internal messages, content you have 10 minutes for.",
    "perf_squad": "<strong>The idea:</strong> Imagine your car suddenly drives slower and you don't know if it's the engine, the oil, the brake pads, or something else. Three mechanics propose different hypotheses, a fourth challenges each one with \"what if it's NOT that?\", and a fifth finally runs a stopwatch and has proof. The problem is during a performance regression it's easy to bet on the wrong cause and waste days fixing something that works fine.<br><br><strong>How it works:</strong> Three specialists inspect different layers in parallel (database, backend, frontend) and each proposes their own hypothesis for what slowed the system. The Devil's Advocate attacks each one trying to falsify it, and at the end a performance tester benchmarks the top candidates.<br><br><strong>What you get:</strong> A root-cause document (3 hypotheses + counter-hypotheses), concrete fix locations ordered by expected impact, before/after measurements, and a remediation plan.<br><br><strong>Ideal for:</strong> the app slowed down after the last deploy, growing response-time tail latencies, tracking down resource leaks, server cost optimization, sudden memory spikes.<br><br><strong>Don't use when:</strong> you have no measurements (\"feels slow\"), you want to optimize speculatively without a real problem, the issue is in a layer outside the app (network, provider).",
    "legacy": "<strong>The idea:</strong> Imagine swapping the engine of a plane that has to keep flying - you can't shut it down, you can't land. That's what cleaning up an old production system that serves real customers looks like. The problem is the old system is fragile, hard to evolve, and a full rewrite from scratch usually fails.<br><br><strong>How it works:</strong> First an analyst inventories what's actually in there, then a researcher looks up how others handled similar modernizations, then three teams build new pieces in parallel (backend, frontend, bridging layer) swapping in piece by piece, and two QA teams verify nothing regressed.<br><br><strong>What you get:</strong> A dependency map of the old system, a phased modernization plan, new versions of the most critical pieces, a compatibility layer so old clients still work, and regression tests proving nothing broke.<br><br><strong>Ideal for:</strong> a 10-year-old Rails app moving to a new stack, swapping jQuery for React, evolving a database schema with zero downtime, reducing technical debt, modernizing an inherited project.<br><br><strong>Don't use when:</strong> you're starting a project from scratch (nothing to modernize), you have one bug to fix (overkill), the customer accepts a few days of downtime (then a full rewrite is better).",
    "saas": "<strong>The idea:</strong> Imagine building a house from the foundation - you need an architect, bricklayers, an electrician, a plumber, a painter, and a final inspection. Same with a new SaaS product. The problem is if you start with just a website and then bolt on auth, payments, and a customer panel, everything ends up inconsistent and painful to maintain.<br><br><strong>How it works:</strong> Researchers gather requirements and scan the market, then three parallel teams build: one backend (database, API, auth), one frontend (user screens), one designer (consistent look). An integrator wires it all together, and two QA teams verify security and quality.<br><br><strong>What you get:</strong> A shippable SaaS product with user accounts, an admin panel, a coherent design, tested, ready to deploy for first customers. Plus technical documentation.<br><br><strong>Ideal for:</strong> launching a new B2B SaaS, a platform with user accounts and subscriptions, a new customer dashboard, a multi-tenant system, an MVP for investors.<br><br><strong>Don't use when:</strong> you only need the backend (no frontend), only the frontend (no backend), you're building an internal tool for 5 people (form over function).",
    "microservices": "<strong>The idea:</strong> When an application grows for years, it turns into one giant block where everything depends on everything. Changing one thing breaks three others. The fix: split that giant block into smaller, independent pieces - each responsible for one job and evolvable on its own. Like replacing one giant department store with a mall of independent boutiques.<br><br><strong>How it works:</strong> First a planner analyzes the old system and splits it into logical pieces. Then four developers build their pieces in parallel (each owns one). Finally three testers check that all pieces talk to each other correctly.<br><br><strong>What you get:</strong> A decomposition plan for the old system, working code for four new independent services, a communication contract between them, and a quality report.<br><br><strong>Ideal for:</strong> a large app that has become too hard to maintain, splitting an old system across teams, companies scaling from 10 to 100 developers, preparing to scale to more users.<br><br><strong>Don't use when:</strong> small applications (form over function), a brand new project (build something simpler first), a team with no distributed systems experience.",
    "deep_research_swarm_pro": "<strong>The idea:</strong> When you have to compare 7 solutions and make a high-stakes decision, one human (or one agent) drowns in the flood of information. The brain stops tracking. The fix: split the work across seven specialists - each reads only their slice. One reads only docs, another only forum opinions, another only Reddit. Nobody crosses into anyone else's lane. At the end one person compiles the report.<br><br><strong>How it works:</strong> A lead researcher splits the question into seven parts. Seven researchers work in parallel, each in their own source. A critic checks for contradictions between them. A writer compiles everything into one report with conclusions.<br><br><strong>What you get:</strong> A structured report from seven perspectives, every fact with a source link, confidence tags on each claim, a list of source-level contradictions, and a short executive summary at the top.<br><br><strong>Ideal for:</strong> picking technology for a new project (e.g., which database), market analysis before a product launch, competitive comparison, academic literature review, framework migration decisions.<br><br><strong>Don't use when:</strong> you have only one source, you need code (no agent here writes code), the decision has to happen in 5 minutes.",
    "migration_crew": "<strong>The idea:</strong> Rewriting an old system onto a new one is like renovating a house that has to stay lived in. One mistake and the residents (users) lose power. The problem is one developer trying to read all the old code gets lost and starts guessing. The fix: split the old code into three parts and assign each to its own specialist. Nobody crosses lanes.<br><br><strong>How it works:</strong> An analyst inventories the old codebase. Three specialists read their areas in parallel (e.g., one only auth, one only database, one only interfaces). A human approves the migration plan - all-at-once or phased. Only then does the team execute the migration, and a tester verifies the result.<br><br><strong>What you get:</strong> A dependency map of the old system, migration strategy options with pros and cons, a rollout plan with checkpoints, and a list of changes that could break existing behavior.<br><br><strong>Ideal for:</strong> Java 8 to Java 21, Angular to React, Python 2 to 3, REST to GraphQL, breaking a monorepo into smaller repos.<br><br><strong>Don't use when:</strong> a brand new project (nothing to migrate), a full rewrite from scratch (different scope), you don't have access to the old code.",
    "fullstack_premium": "<strong>The idea:</strong> A standard team builds a feature that works \"on the developer's laptop\", but in production the database buckles, nobody knows what's happening, and there's a security hole. The fix: add the three specialists usually missing - a database architect, someone for runtime observability, and someone for user research. The result is a feature ready for real customers.<br><br><strong>How it works:</strong> A 12-agent team: an orchestrator coordinates, planners draft the plan, two researchers (user and docs) work in parallel, a DB architect designs the schema, then four build in parallel (UI designer, backend, frontend, integrator), and finally a security audit and observability setup.<br><br><strong>What you get:</strong> A shippable feature with a designed database, a monitoring dashboard, a security audit report, a UI grounded in user research, and documentation.<br><br><strong>Ideal for:</strong> a SaaS dashboard with customer charts, user authentication, payment systems, critical customer-facing features, anything that MUST work reliably.<br><br><strong>Don't use when:</strong> a hackathon prototype (too heavy), small internal tools, when you have no running system yet.",
    "security_multi_vector": "<strong>The idea:</strong> One security scanner always misses something - each has its specialty. It's like hunting a water leak: a plumber checks the pipes but won't notice the water is coming from the roof. The fix: five independent scanners hunt flaws in parallel, each in a different area. Then one expert compiles the results, weighs severity, and decides whether the product can ship.<br><br><strong>How it works:</strong> Five scanners in parallel: one reads code, one audits dependencies, one checks infrastructure, one hunts secrets in code, one audits authentication. A QA manager collects everything, builds a threat model, and rates each finding's severity. A human makes the ship decision.<br><br><strong>What you get:</strong> A full audit across five areas, a threat model (what can go wrong), a prioritized findings list from most to least critical, a list of known library vulnerabilities with fix guidance, and a release decision.<br><br><strong>Ideal for:</strong> audit before a major release, SOC2 audit prep, responding to a customer's security questionnaire, cleanup after a security incident, quarterly review.<br><br><strong>Don't use when:</strong> continuous background scanning (use automated tooling), without an upfront threat model, for a small internal app.",
    "prd_to_launch": "<strong>The idea:</strong> You have a product idea or a recorded customer call, but you don't know how to turn it into a ready launch. You're missing the requirements doc, the task list, mockups, copy, and a go-to-market plan. The fix: one pipeline that takes informal input and produces a full launch package. Like a machine that turns an idea into a shippable product.<br><br><strong>How it works:</strong> An analyst extracts the real customer problem from the call. A writer drafts the requirements doc. In parallel: a planner writes the task list with timeline, a designer mocks up screens, a marketing writer drafts launch copy, a strategist builds the GTM plan. At the end a PM signs off on everything.<br><br><strong>What you get:</strong> A product requirements document, a developer task list, interface mockups, marketing copy, a go-to-market plan, success metrics, and a pre-launch checklist.<br><br><strong>Ideal for:</strong> turning a recorded customer call into a shippable package, moving an idea-pitch into a concrete launch, planning a large new feature before a quarter, aligning departments before a launch.<br><br><strong>Don't use when:</strong> writing code (different preset), purely technical decisions, when you have no access to customers.",
    "kb_constructor": "<strong>The idea:</strong> In every company knowledge is scattered: some in Slack, some in Confluence, some in PDFs, some on GitHub. A new hire loses weeks just searching. The problem is manually stitching those sources together takes weeks. The fix: four agents read one source each in parallel and normalize the data into one format. The system deduplicates and writes finished articles.<br><br><strong>How it works:</strong> Four agents read their sources in parallel (Slack, wiki, PDFs, GitHub). Each converts what they find into a uniform format with a title, body, and source link. A deduplicator removes duplicates (when two sources say the same thing). A writer produces articles from the best chunks. A critic verifies every claim exists in a source.<br><br><strong>What you get:</strong> A knowledge base structure (categories and tags), ready articles organized by topic, deduplicated data, a fact-verification report, and a ready-to-import bundle for your chosen system.<br><br><strong>Ideal for:</strong> migrating an internal wiki from Confluence to Notion, a new-hire knowledge base, a customer support knowledge base, unifying scattered documentation into one place.<br><br><strong>Don't use when:</strong> you have only one source (overkill), you want continuous updates (this is a one-shot operation), you already have a good document search system.",
    "soc2_sweep": "<strong>The idea:</strong> SOC2 is the security standard most large customers require. Preparing for an audit manually takes weeks and requires coordinating several departments (security, operations, legal, engineering). The fix: a team of agents that reads the company's policies, maps them to SOC2 requirements, collects evidence, and finds gaps. At the end the CISO signs off on readiness.<br><br><strong>How it works:</strong> An agent reads the company policies. A mapper assigns policies to the 9 SOC2 requirement groups. An auditor checks technical controls (encryption, MFA, logging, access reviews). A collector gathers screenshots, configurations, and logs as evidence. A gap analyst flags what's missing. The CISO approves.<br><br><strong>What you get:</strong> A compliance matrix with each requirement and its evidence, an evidence folder (screenshots, configurations, logs), a prioritized gap list, CISO approval, and an auditor-ready package.<br><br><strong>Ideal for:</strong> SOC2 Type II audit prep, responding to an enterprise customer risk assessment, compliance gap analysis, quarterly security review, ISO27001 prep.<br><br><strong>Don't use when:</strong> you have no policies yet (write them first), continuous compliance (use tools like Vanta/Drata), minor security tweaks.",
    "data_analysis_pipe": "<strong>The idea:</strong> \"Give me insights from this spreadsheet\" sounds simple, but it takes many steps - one agent easily hallucinates statistics if it's not careful. The problem is without discipline it's easy to draw the wrong conclusions. The fix: nine agents in sequence - one profiles the data (without reading the whole thing), one cleans it, two hunt patterns in parallel, a statistician checks it isn't coincidence, another builds a predictive model, a writer produces the report.<br><br><strong>How it works:</strong> A data collector profiles the spreadsheet (column names, statistics, samples - without reading everything). A cleaner handles missing values and errors. Two pattern hunters work in parallel. A statistician validates the findings hold up. Optionally a modeler builds a predictive model. A writer drafts the report. A designer produces the charts.<br><br><strong>What you get:</strong> A board-ready report with key findings, confidence ratings on each claim, statistically validated results, charts, optionally a predictive model, and a list of recommendations.<br><br><strong>Ideal for:</strong> board-ready reports from raw data, business questions like \"why did sales drop in March?\", churn analysis, pricing analysis, product analysis, A/B test readouts.<br><br><strong>Don't use when:</strong> live streaming data (different architecture), deploying a model to production, you have no access to raw data.",
    "incident_war_room": "<strong>The idea:</strong> When production goes down, every minute costs money. An incident commander under pressure often bets on the wrong hypothesis and burns time chasing the wrong lead. The fix: three specialists check three directions in parallel (metrics, logs, recent changes), a fourth (Devil's Advocate) challenges every hypothesis, and a human decides whether to roll back the last change.<br><br><strong>How it works:</strong> Three in parallel: one checks metrics and performance, one analyzes logs and errors, one looks at recent changes and deploys. Two testers (performance and security) rule out their areas. A Devil's Advocate attacks the leading theory. A human makes the rollback call. A writer drafts the customer communication and the post-incident report.<br><br><strong>What you get:</strong> An investigation timeline (who did what when), a leading theory with counter-arguments, a rollback decision with rationale, a status-page message for customers, and a post-mortem with 5 whys and an action-item list.<br><br><strong>Ideal for:</strong> a serious production incident (P0/P1), a customer-facing regression, a bad deploy to roll back, writing the post-mortem, on-call escalation.<br><br><strong>Don't use when:</strong> without access to production metrics, planned maintenance work, long-term code cleanup, generic \"system feels slow\".",
    "full": "<strong>The idea:</strong> This is the reference full team - 13 agents organized across five layers (like a company): lead, planners, researchers, builders, testers. No role is redundant, no role is duplicated. The problem is when you're building something important, a single missing link (a researcher or a tester) can cost more than the entire project. This preset is the insurance against those gaps.<br><br><strong>How it works:</strong> A lead coordinates. Two planners break the project into phases. Three researchers gather information in parallel. Four build (backend, frontend, integration, design). Three testers check quality, security, and performance. A QA manager makes the final call.<br><br><strong>What you get:</strong> A complete project from idea to release: the plan, research reports, working code, documentation, security report, quality report, and a release decision.<br><br><strong>Ideal for:</strong> business-critical projects, enterprise system architecture, formal audits and compliance, projects where the cost of a mistake is much higher than the cost of thorough analysis, large external teams.<br><br><strong>Don't use when:</strong> simple features (overkill), hackathon prototypes, urgent same-day deploys, when you have a tight budget.",
    "deep": "<strong>The idea:</strong> Sometimes before you write code, you have to really deeply understand the topic - algorithm choice, a framework for the next 5 years, integration with regulated systems. The problem is standard teams have too little research and builders end up guessing. The fix: expand research to six parallel researchers, add a critic and a synthesizer, and only then build. Like a NASA mission - 6 teams study different aspects before the rocket is built.<br><br><strong>How it works:</strong> Six researchers gather information from different sources in parallel. A critic checks for contradictions. A synthesizer turns it into one coherent plan. Four build in parallel. Three testers (security, quality, performance) audit the result. 18 agents total.<br><br><strong>What you get:</strong> A full report from 6 sources, a synthesized plan, working code across all layers, and triple quality validation from the tests.<br><br><strong>Ideal for:</strong> building an enterprise platform, evaluating 3-5 vendors for large spend, regulated industries (banking, healthcare), migrating an entire platform to new technology.<br><br><strong>Don't use when:</strong> standard feature development (too heavy), prototypes, tight deadlines, constrained budgets.",
    "five_minds": "<strong>The idea:</strong> Some decisions have no obvious answer - every option has pros and cons, experts disagree. A single voice easily drowns out common sense. The fix: formalize the argument. Four experts defend their positions, a fifth (the Devil's Advocate) attacks the strongest proposal and hunts for weak points. From the dialectic emerges a solution better than any original proposal - not a compromise, but a synthesis.<br><br><strong>How it works:</strong> Four experts receive the problem and each presents their solution. Round two: debate, where each attacks the others' weaknesses. The Devil's Advocate challenges the strongest proposal looking for gaps. Round three: joint construction of the final solution (the Gold Solution) that addresses the raised concerns.<br><br><strong>What you get:</strong> A full debate log with each expert's arguments, a list of the Devil's Advocate's attacks, the final solution with rationale for why it beats the alternatives, and a list of \"what ifs\" that were considered.<br><br><strong>Ideal for:</strong> strategic technology decisions, architecture with competing requirements (speed vs security), high stakes with no obvious winner, resolving disputes between teams.<br><br><strong>Don't use when:</strong> simple implementations, decisions with an obvious answer, urgent deliveries (debate takes time), when the team isn't ready for confrontation.",
    "deep_five_minds": "<strong>The idea:</strong> The largest preset in the entire system. 27 agents, 6 phases, 3 human approval gates, two rounds of expert debate (one before building, one after). The problem is irreversible decisions (migrating an entire million-dollar platform, banking architecture, medical systems) can't have a shadow of error. This preset is the full safety net - research, debate, human, build, debate again, human again, testing, final approval.<br><br><strong>How it works:</strong> Six researchers gather information in parallel, a critic verifies. A human approves direction (Gate #1). Five experts debate before building. A human approves the plan (Gate #2). Five build. Five experts debate the result again. Three testers audit. A human approves release (Gate #3).<br><br><strong>What you get:</strong> A full research report, two expert debate logs, three human-in-the-loop decisions, working code, triple quality validation, and documentation of irreversible choices with rationale.<br><br><strong>Ideal for:</strong> investment decisions above 500 thousand dollars, mission-critical architecture, regulated industries (finance, healthcare, aviation), decisions affecting the organization for 5+ years, irreversible platform choices.<br><br><strong>Don't use when:</strong> anything below 50 thousand dollars in stake, standard feature development, prototypes, urgent deliveries, when leadership won't commit to the decision.",
    "five_minds_strategic": "<strong>The idea:</strong> A standard Five Minds debate without data generates an \"opinion war\" - experts argue over what they \"feel\" rather than what the numbers show. The problem is strategic decisions need hard facts (market data, finance, technical feasibility, legal requirements) BEFORE anyone starts discussing. The fix: first four researchers gather concrete data in parallel, and only then five experts debate with hard numbers in hand.<br><br><strong>How it works:</strong> Four researchers gather market, financial, technical, and legal data in parallel. An analyst presents the question with concrete options and their pros and cons. Five experts + the Devil's Advocate debate three rounds (proposals, counter-arguments, final synthesis). A lead writes the Gold Solution, and a human signs off at the end.<br><br><strong>What you get:</strong> A hard-data report across four areas, a log of three debate rounds, a final solution (Gold Solution) with pros/cons analysis, leadership approval, and a list of dissenting votes to remember.<br><br><strong>Ideal for:</strong> a company pivot decision, evaluating an acquisition, strategic technology choice for 3+ years, major architectural decisions, build-vs-buy calls, irreversible business choices.<br><br><strong>Don't use when:</strong> tactical same-day decisions (too heavy), urgent matters (three debate rounds takes time), when there's no time for research, when the answer is obvious to everyone."
  },
  presetMid: {
    "solo": "One agent takes one simple task and delivers it end to end. Zero coordination, zero waiting on others. Good choice for a small bug, a typo, a small fix in one file.",
    "quick_fix": "Fast fix in a loop: tweak, check, tweak, check - until it works. For urgent bugs that have to ship today. Not for changes across many places at once.",
    "recon": "One agent gathers information, a second writes simple code based on it. Like sending out a scout before deciding. Use it when you want to check whether something is even feasible before going in seriously.",
    "trio": "Three agents split the work: one backend, one frontend, one checking quality. Like a small team delivering a simple feature end to end. Good for typical forms, a simple API with a screen.",
    "reflect": "Three agents work in sequence: one gathers information, the second analyzes, and the third critically checks whether the conclusions hold. Use when you need a topic thoroughly investigated without writing code.",
    "bug_hunt": "One agent fixes the bug while two others test in parallel that nothing else broke. Use when the bug is suspicious and you're worried fixing one place will break another.",
    "content": "Two agents gather information, a third writes the text, a fourth checks for errors and facts. A text ready to publish. Good for blog posts, product descriptions, documentation, client reports.",
    "plan_exec": "First one agent makes a detailed step-by-step plan, then another executes it and someone at the end checks that everything lines up. Use when the change is big and you want to see the plan before anything moves.",
    "perf_boost": "One agent investigates what's slowing the app, another fixes it, a third measures whether it's actually faster. Use when a page or API runs too slow and you know it's a specific performance problem.",
    "startup": "A small team of 5 agents builds a working prototype from idea to a version for early users. Good for an MVP, a simple SaaS app, a prototype for an investor pitch.",
    "cascade": "First the cheapest model works, then the mid-tier, and the most expensive only if truly needed. 70-80% savings compared to using the top model everywhere. Use it for large volumes of simple tasks.",
    "test_suite": "Four testing specialists check the app from different angles and the team lead says at the end whether it can ship. Use before an important release or as an automated pre-deploy gate.",
    "a11y": "The team checks whether the app works for users with disabilities: whether screen readers handle the content, whether colors have good contrast, whether you can navigate by keyboard. Use before shipping to customers and whenever accessibility is required.",
    "security": "Three security specialists check the code from different angles, and the team lead says whether it can safely ship. Use before deploying an important change touching user data or payments.",
    "review": "The team first writes the code and only then two separate people review it - one for security, one for quality. Use when the change is important and you don't want the same person who wrote it also checking their own work.",
    "design_sys": "A team creating consistent rules for the app's look - colors, fonts, buttons, icons. Use when your app looks like a patchwork of styles and you want to clean it up, or when you're launching a new brand.",
    "api_modern": "A team for cleaning up an app's old engine so users don't notice. Nothing changes on screen - only what's underneath gets fixed. Use when you have an old system that's hard to evolve.",
    "ui_overhaul": "A team refreshing the app's look: new colors, fonts, spacing, animations, while keeping the same logic. Use when the product works well but looks outdated and you're losing customers because of it.",
    "feature_sprint": "A full team to build a new feature from idea to finished code: analysis, research, backend, frontend, tests. Use when you have a concrete new feature in mind and want to deliver it without chaos.",
    "standard": "A universal team of 8 - a good choice when you don't know which preset to pick. Covers 70% of typical web and SaaS projects. Use it as a safe starting point if your project has no special specifics.",
    "data_pipe": "A team for moving and transforming data - reads from one place, cleans, transforms, and writes somewhere else. Use when you're building reporting, data warehouses, or passing data between systems.",
    "research": "Six agents gather information in parallel from different sources, a critic validates the conclusions, and someone writes the final report. Zero code, pure knowledge gathering. Use when you have to make a decision that requires comparing many options.",
    "legacy": "A team for cleaning up an old system that's hard to evolve without breaking it. First it analyzes what's there, then gradually refactors piece by piece. Use when you have an application from years ago that everyone is afraid to touch.",
    "saas": "A full 10-person team to build a SaaS product from scratch: auth, payments, user panel, design. Use when launching a new customer-facing web product and you want it shipped as one piece.",
    "microservices": "A large app split into smaller independent pieces (microservices). Four developers build in parallel, three testers verify. Use when one giant system has become too hard to maintain.",
    "full": "A full 13-agent team from research to release. Five layers of organization: lead, planners, researchers, builders, testers. Use for large projects where a mistake costs more than thorough analysis.",
    "deep": "Eighteen agents with a heavy emphasis on thorough research before building. Six people hunt information in parallel, a critic validates, four build, three test. Use when the implementation needs truly deep preparation.",
    "five_minds": "Four experts debate a problem, a fifth (the Devil's Advocate) attacks every proposal. From the argument emerges a solution better than all the originals. Use when the decision is contested and there's no obvious winner.",
    "deep_five_minds": "The biggest preset: 27 agents, deep research, two rounds of expert debate, and three human approval gates. Use for irreversible decisions whose consequences will ripple for years.",
    "deep_research_swarm_pro": "Seven specialists hunt information on one topic in parallel, each in a different source. At the end a critic checks contradictions and an editor writes the report. Use when you have to compare many options before a major decision.",
    "migration_crew": "Safely rewriting an old system onto a new one. Three specialists read different parts of the code in parallel, a human approves the plan, then the team executes the migration. Use when you have an old system that has to be modernized.",
    "fullstack_premium": "A large 12-agent team building a production-ready feature. Includes a database architect, observability, and a security audit. Use for critical features that MUST work reliably (auth, payments).",
    "security_multi_vector": "Five independent scanners hunt security flaws in parallel, then an expert compiles the findings and a human makes the ship call. Use before a major release or when a customer asks for a security audit.",
    "perf_squad": "A team hunting down the reason an application became slow. Three people propose different hypotheses, a fourth challenges them, and the last one measures the actual effect. Use when \"something slowed down after the last deploy\" and you don't know what.",
    "prd_to_launch": "From an idea or a customer call recording comes a full product launch package: requirements doc, tasks, mockups, marketing copy, and a GTM plan. Use when you have an idea but don't know where to start.",
    "ab_test_lab": "A team designing a fair A/B test so the result is trustworthy and not cooked. Calculates the sample size, hunts holes in the plan. Use before an important pricing, signup, or payments test.",
    "kb_constructor": "Builds a company knowledge base from scattered sources (Slack, wiki, PDFs, GitHub). Four agents read one source each in parallel, then the system deduplicates and writes articles. Use when you want to gather scattered documentation in one place.",
    "tech_writing_pipe": "A team writes a long technical piece - first an outline, then fact gathering, drafting, diagrams, and at the end someone checks nothing is made up. Use when creating an article, whitepaper, or conference talk.",
    "five_minds_strategic": "Four researchers first gather hard data (market, finance, technology, legal), and only then five experts debate. At the end a human signs off. Use for strategic choices like a company pivot or an acquisition.",
    "soc2_sweep": "Preparation for a SOC2 security audit (the standard most enterprise customers require). The team maps company policies to requirements, collects evidence, and finds gaps. Use before a scheduled audit.",
    "data_analysis_pipe": "From raw data comes a board-ready report. Nine agents in sequence clean the data, hunt patterns, validate statistics, build charts, and write conclusions. Use when you have data but don't know what to do with it.",
    "incident_war_room": "Fast response when production breaks. Three specialists check metrics, logs, and recent changes in parallel, a Devil's Advocate challenges the hypotheses, and a human decides on rollback. Use for a serious incident."
  },
  presetGreen: {
    "solo": [
      "Fastest and cheapest preset",
      "Zero coordination, zero waiting",
      "Ideal for a small bug or typo",
      "Small fix in one file",
      "Quick scripts and code cleanups"
    ],
    "quick_fix": [
      "Fixes in a loop until it works",
      "Independent tester after every try",
      "Ideal for urgent hotfixes",
      "Emergency patches in production",
      "Fewer regressions than a one-shot"
    ],
    "recon": [
      "Scout first, act second",
      "Saves hours on dead ends",
      "Checks idea feasibility",
      "Good for a new technology",
      "A prototype for a client meeting"
    ],
    "trio": [
      "Backend, frontend, and tests together",
      "Natural full-stack split",
      "Small app works end to end",
      "Good for simple forms and panels",
      "No unnecessary planning"
    ],
    "reflect": [
      "Deep understanding of the topic",
      "Critic challenges the conclusions",
      "Ideal for due diligence",
      "Risk analysis without code",
      "Honest report with justifications"
    ],
    "bug_hunt": [
      "Two testers in parallel",
      "Catches problems that come back",
      "Checks nothing else broke",
      "Good for a post-deploy bug",
      "Zero hidden damage"
    ],
    "content": [
      "Two data sources for certainty",
      "Text ready to publish",
      "Fact-checked against sources",
      "Good for a blog, product page, report",
      "Text with real sources"
    ],
    "plan_exec": [
      "Plan first, act second",
      "Saves half the work from being tossed",
      "Ideal for migrations and bigger changes",
      "Step by step with a final check",
      "No chaos across multi-file changes"
    ],
    "perf_boost": [
      "Measures before touching anything",
      "Concrete before/after numbers",
      "Performance measurement specialist",
      "Ideal for slow APIs and pages",
      "Shows what really slows you down"
    ],
    "startup": [
      "Full cycle in 5 people",
      "Maximum speed, zero ceremony",
      "Ideal for MVPs and pitches",
      "A hackathon prototype",
      "92% of a big team's effect at low cost"
    ],
    "cascade": [
      "70-80% cost savings",
      "Cheap model for simple tasks",
      "Expensive only when truly needed",
      "Ideal for large volumes of repeat work",
      "Quality without overpaying"
    ],
    "test_suite": [
      "Three testers from different angles",
      "Security, quality, and performance",
      "GO or NO-GO decision at the end",
      "Ideal before shipping a version",
      "An exam board instead of one pair of eyes"
    ],
    "a11y": [
      "App works for everyone",
      "Screen readers and keyboard navigation",
      "Good contrast and button sizes",
      "Accessibility law compliance",
      "Ideal for corporate customers"
    ],
    "security": [
      "Three layers of security checks",
      "Independent reports instead of one",
      "Catches 70-85% of holes",
      "GO or NO-GO decision with justification",
      "Audit trail for customers"
    ],
    "review": [
      "A different viewer than the writer",
      "Two reviewers rate the finished code",
      "Security and quality separately",
      "Ideal for important production changes",
      "Releases the author from self-checking"
    ],
    "design_sys": [
      "Consistent look across the app",
      "Ready colors, fonts, and components",
      "No more style chaos",
      "Ideal for a new brand",
      "Reusable library"
    ],
    "api_modern": [
      "Modernizes the engine without changing the client",
      "Old apps keep working",
      "Contract versioning",
      "Ideal for an old hard-to-evolve system",
      "Reduces technical debt"
    ],
    "ui_overhaul": [
      "New look without touching logic",
      "Two sources of trend research",
      "Backend stays untouched",
      "Ideal for a working but old-looking product",
      "Modernizes color, fonts, and animations"
    ],
    "feature_sprint": [
      "Full new-feature cycle",
      "Backend and frontend together",
      "Technical and UX research",
      "Ideal for a concrete feature request",
      "A feature ready to ship"
    ],
    "standard": [
      "Safe default pick",
      "Covers 70% of typical projects",
      "Full cycle from planning to tests",
      "Ideal when you don't know which to pick",
      "Statistical sweet spot"
    ],
    "data_pipe": [
      "Automated data flow",
      "Ideal for warehouses and reports",
      "Cleans and transforms data",
      "Pulls data from many sources",
      "Processing specialist, not frontend"
    ],
    "research": [
      "Six independent sources",
      "Critic catches contradictions",
      "Every claim tied to a source",
      "Ideal for technology selection",
      "90% better results than a single agent"
    ],
    "legacy": [
      "Engine swap without downtime",
      "Three teams build in parallel",
      "Old clients still work",
      "Ideal for applications from years ago",
      "Gradual modernization instead of one big leap"
    ],
    "saas": [
      "Full product with design",
      "Auth, panel, payments together",
      "Three teams build in parallel",
      "Ideal for a new SaaS from scratch",
      "73% higher customer adoption"
    ],
    "microservices": [
      "Four teams build in parallel",
      "Splits one giant block into independent pieces",
      "Three testers verify",
      "Ideal for an app that has grown too large",
      "Preparation for scaling"
    ],
    "full": [
      "Full team with no gaps",
      "Five-layer hierarchy",
      "Three layers of testing",
      "Ideal for a mission-critical project",
      "Reference pattern for the whole system"
    ],
    "deep": [
      "Sixteen agents in full orchestration",
      "Maximum research before building",
      "Four teams build in parallel",
      "Ideal for a large platform",
      "Triple quality validation"
    ],
    "five_minds": [
      "Four experts debate",
      "Devil's Advocate attacks the strongest",
      "Solution better than any single proposal",
      "Ideal for contested decisions",
      "Synthesis instead of compromise"
    ],
    "deep_five_minds": [
      "The biggest preset in the system",
      "Two rounds of expert debate",
      "Three human approval moments",
      "Ideal for irreversible decisions",
      "Full safety net for regulated industries"
    ],
    "deep_research_swarm_pro": [
      "Seven sources in parallel",
      "Each specialist in their own area",
      "Critic catches contradictions",
      "Ideal for a strategic decision",
      "Report with links to sources"
    ],
    "migration_crew": [
      "Three code areas in parallel",
      "Human approves the migration plan",
      "Old clients still work",
      "Ideal for a technology change",
      "Dependency map of the old system"
    ],
    "fullstack_premium": [
      "Production-ready feature",
      "Database architect on the team",
      "Built-in observability and audit",
      "Ideal for auth and payments",
      "Everything a standard team is missing"
    ],
    "security_multi_vector": [
      "Five scanners in parallel",
      "Each in a different risk area",
      "Human makes the ship call",
      "Ideal before a major deploy",
      "SOC2-compliant audit trail"
    ],
    "perf_squad": [
      "Three hypotheses instead of one",
      "Devil's Advocate challenges each",
      "Before/after measurement on the best",
      "Ideal when the app has slowed down",
      "Concrete fix locations"
    ],
    "prd_to_launch": [
      "From idea to ready launch",
      "Requirements doc and mockups",
      "GTM plan and marketing copy",
      "Ideal for a new product",
      "Everything ready for release"
    ],
    "ab_test_lab": [
      "Calculates the sample size needed",
      "Devil's Advocate hunts holes in the plan",
      "Protects against cooked results",
      "Ideal for a pricing or signup test",
      "Signed plan before launch"
    ],
    "kb_constructor": [
      "Four sources in parallel",
      "Slack, wiki, PDFs, and GitHub together",
      "Automatic deduplication",
      "Ideal for a new knowledge base",
      "Verified facts with sources"
    ],
    "tech_writing_pipe": [
      "Long content from outline to publication",
      "Facts from two sources",
      "Diagrams and SEO titles",
      "Ideal for a whitepaper or article",
      "Fact-checked"
    ],
    "five_minds_strategic": [
      "Hard data first, then debate",
      "Four research areas in parallel",
      "Five experts with numbers in hand",
      "Ideal for a pivot or acquisition",
      "Human approves the Gold Solution"
    ],
    "soc2_sweep": [
      "Maps policies to SOC2 requirements",
      "Collects evidence automatically",
      "Shows where the gaps are",
      "Ideal before an audit",
      "Auditor-ready package"
    ],
    "data_analysis_pipe": [
      "Raw data to board-ready report",
      "Statistician validates the results",
      "Charts and conclusions together",
      "Ideal for a business question",
      "Concrete recommendations at the end"
    ],
    "incident_war_room": [
      "Three specialists in parallel",
      "Metrics, logs, and recent changes",
      "Devil's Advocate challenges theories",
      "Ideal for a serious incident",
      "Final report and customer communication"
    ]
  },
  presetRed: {
    "solo": [
      "No security check",
      "Not for complex tasks",
      "No information gathering",
      "Only one pair of eyes on the result"
    ],
    "quick_fix": [
      "Not for new features",
      "Only one builder",
      "No research phase",
      "Not for multi-place changes"
    ],
    "recon": [
      "Output is only a prototype",
      "Not for production",
      "Single information source",
      "Not for a known solution"
    ],
    "trio": [
      "No research phase",
      "No one planning",
      "No security specialist",
      "Not for complicated tasks"
    ],
    "reflect": [
      "Zero code",
      "Builds nothing",
      "Not for simple questions",
      "Takes time to reflect"
    ],
    "bug_hunt": [
      "No research phase",
      "Not for new features",
      "Needs a reporter with specifics",
      "Overkill for trivial bugs"
    ],
    "content": [
      "Generates no code",
      "No feature implementation",
      "Too heavy for a short post",
      "Not for highly specialized topics"
    ],
    "plan_exec": [
      "Only one builder",
      "Too much for a simple bug",
      "Not for urgent hotfixes",
      "Takes time to plan"
    ],
    "perf_boost": [
      "No frontend in the team",
      "Needs a concrete problem",
      "Not for vague \"feels slow\"",
      "Not for visual issues"
    ],
    "startup": [
      "Only one researcher",
      "Too much for an ordinary bug",
      "Not for big projects",
      "Not for high-reliability systems"
    ],
    "cascade": [
      "Needs a routing rule",
      "Not for tasks that are always hard",
      "No quality guarantee",
      "Small savings at low volume"
    ],
    "test_suite": [
      "No builders",
      "Only tests, writes nothing",
      "Too heavy for a small task",
      "Not for fixing bugs"
    ],
    "a11y": [
      "No backend changes",
      "Not for business logic",
      "Only for apps with an interface",
      "Not for internal tools"
    ],
    "security": [
      "Won't replace a pentester audit",
      "Possible false alarms",
      "Too heavy for cosmetic changes",
      "Not for apps with no sensitive data"
    ],
    "review": [
      "No research phase",
      "Not for small fixes",
      "Too heavy for typos",
      "Not for no-risk projects"
    ],
    "design_sys": [
      "No backend",
      "Not for new features",
      "Too heavy for a single page",
      "Pointless with a ready Material/Bootstrap"
    ],
    "api_modern": [
      "No frontend in the team",
      "Not for visual changes",
      "Not for user-visible new features",
      "Needs an existing system"
    ],
    "ui_overhaul": [
      "No backend changes",
      "Not for new functionality",
      "Needs an existing screen",
      "Not for designing from scratch"
    ],
    "feature_sprint": [
      "No designer in the team",
      "Not for pure cosmetic fixes",
      "Not for bug fixes",
      "Needs a clear idea"
    ],
    "standard": [
      "Too much for simple fixes",
      "Not for specialized work",
      "Not for pure research",
      "Medium time and cost"
    ],
    "data_pipe": [
      "No frontend",
      "Not for a regular web app",
      "Too heavy for a single query",
      "Needs data sources"
    ],
    "research": [
      "Zero code",
      "Builds nothing",
      "Not for quick answers",
      "Too heavy for a single source"
    ],
    "legacy": [
      "Very high cost",
      "Not for new projects",
      "Too heavy for a single bug",
      "Not when the customer accepts downtime"
    ],
    "saas": [
      "Very large team",
      "Not for backend only",
      "Not for frontend only",
      "Too heavy for internal tools"
    ],
    "microservices": [
      "Very high cost",
      "Not for small apps",
      "Not for a new project",
      "Requires distributed systems experience"
    ],
    "full": [
      "Very high cost",
      "Too heavy for a simple feature",
      "Not for urgent deploys",
      "Not for tight budgets"
    ],
    "deep": [
      "Very high cost",
      "Too heavy for a normal feature",
      "Not for prototypes",
      "Not for tight deadlines"
    ],
    "five_minds": [
      "Requires time for debate",
      "Not for simple implementations",
      "Not for obvious decisions",
      "Requires a team ready for confrontation"
    ],
    "deep_five_minds": [
      "The most expensive preset in the system",
      "Only for very important decisions",
      "Requires leadership commitment",
      "Not for daily tasks"
    ],
    "deep_research_swarm_pro": [
      "Zero code",
      "Not for a single source",
      "Not for urgent decisions",
      "No builders"
    ],
    "migration_crew": [
      "Not for new projects",
      "Not for a full rewrite from scratch",
      "Requires access to the old code",
      "Not for small changes"
    ],
    "fullstack_premium": [
      "Very large team",
      "Not for prototypes",
      "Not for internal tools",
      "Requires an existing stack"
    ],
    "security_multi_vector": [
      "High cost",
      "Not for continuous background scanning",
      "Requires a threat model",
      "Too heavy for a small app"
    ],
    "perf_squad": [
      "Requires profiles and measurements",
      "Not for speculative optimization",
      "Not when the issue is outside the app",
      "Not for micro-tweaks"
    ],
    "prd_to_launch": [
      "Doesn't write code",
      "Requires customer contact",
      "Not for technical decisions",
      "Too heavy for a tiny idea"
    ],
    "ab_test_lab": [
      "Requires baseline metrics",
      "Not for low traffic",
      "Not for minor changes",
      "Requires time for the test"
    ],
    "kb_constructor": [
      "Requires several sources",
      "Not for a single document",
      "One-shot operation, not continuous",
      "Requires a source list"
    ],
    "tech_writing_pipe": [
      "Not for short posts",
      "Not for internal notes",
      "Not for tweets or social media",
      "Too heavy for 10-minute content"
    ],
    "five_minds_strategic": [
      "Not for tactical decisions",
      "Requires time for three rounds",
      "Not for urgent matters",
      "Not when the answer is obvious"
    ],
    "soc2_sweep": [
      "Requires existing policies",
      "Not for continuous compliance",
      "Too heavy for minor fixes",
      "Doesn't replace an auditor"
    ],
    "data_analysis_pipe": [
      "Requires access to raw data",
      "Not for live data",
      "Not for deploying a model",
      "Requires clean data"
    ],
    "incident_war_room": [
      "Requires production access",
      "Not for planned work",
      "Not for long refactors",
      "Requires system observability"
    ]
  },
