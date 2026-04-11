// Batch: A3 EN translations (res_docs, res_critic, backend, frontend, feature)
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
