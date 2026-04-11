// Batch: P3 EN translations (a11y, review, security, design_sys, api_modern, ui_overhaul)
  a11y: {
    tagline: 'WCAG accessibility sprint - audit, redesign, implementation, validation and compliance docs',
    missionShort: 'Accessibility Sprint is a five-phase pipeline specialized in WCAG 2.1/2.2 AA compliance. UX Researcher audits barriers, Designer builds inclusive solutions, Frontend Dev implements semantic HTML and ARIA, QA Quality runs axe-core and Lighthouse, Writer produces the VPAT and developer guide.',
    whoIs: 'Reach for this preset when you need a WCAG audit before launch, remediation of an existing product, prep for ADA/EAA compliance, an accessibility redesign after an external audit, or mandatory government/public sector compliance. Ideal when the app already has a UI but a11y barriers block users.',
    analogy: 'This preset is like an accessibility building inspection - the inspector finds barriers, the architect designs ramps, the crew installs them, the inspector signs off, and a documentarian writes the compliance report for the authorities.',
    howItWorks: [
      {label: 'Phase 1 - A11y audit', desc: 'UX Researcher scans HTML/CSS/JS against WCAG 2.1/2.2. Checks semantic HTML, alt text, contrast ratios (AA 4.5:1, AAA 7:1), keyboard navigation, ARIA labels, screen reader compatibility, and prefers-reduced-motion. Produces a report with violations ranked by severity.'},
      {label: 'Phase 2 - Inclusive redesign', desc: 'Designer builds solutions for each violation: a new palette with compliant contrast, focus states, skip navigation, responsive typography in rem/em, icons with text labels, and forms with proper labels and error messages.'},
      {label: 'Phase 3 - Implementation', desc: 'Frontend Dev ships the redesign in code: semantic HTML instead of divs, ARIA role/label/describedby/live, CSS focus-visible and high-contrast media queries, JS keyboard event handlers, skip navigation links, and prefers-reduced-motion support.'},
      {label: 'Phase 4 - Tool-based validation', desc: 'QA Quality runs axe-core (automated WCAG audit), Lighthouse a11y score (target 95+), pa11y compliance checker, manual keyboard tests, and a contrast checker. Produces a PASS/FAIL report per WCAG criterion.'},
      {label: 'Phase 5 - Compliance documentation', desc: 'Writer produces the VPAT (Voluntary Product Accessibility Template), A11y Statement for the site, Developer Guide for future changes, Testing Checklist for QA, and a list of Known Issues with a remediation plan.'}
    ],
    inputs: [
      'Source code HTML/CSS/JS of the app or site',
      'Target WCAG level (AA standard, AAA for full compliance)',
      'Compliance requirements (ADA, EAA, Section 508)',
      'Optional external audit report if one already exists'
    ],
    outputs: [
      'WCAG audit report with violations ranked by severity (Critical/High/Medium)',
      'Redesign spec with new color tokens and components',
      'Updated code with semantic HTML and ARIA',
      'Validation report with Lighthouse score and axe-core verdict',
      'VPAT, A11y Statement, Developer Guide and Testing Checklist'
    ],
    does: [
      'Audits WCAG 2.1 AA and 2.2 compliance systematically',
      'Designs a fix for every violation found in the audit',
      'Implements semantic HTML and ARIA per W3C specs',
      'Runs axe-core, Lighthouse, and pa11y as automated tooling',
      'Tests keyboard navigation and screen reader flow',
      'Generates VPAT and A11y Statement for compliance reporting',
      'Ships a Developer Guide for future changes',
      'Typically hits a Lighthouse a11y score of 95+'
    ],
    doesNotDo: [
      'Does not touch the backend - focus is on the presentation layer',
      'Does not implement business logic - only the accessibility layer',
      'Does not run QA Security or Performance (use test_suite)',
      'Does not fit internal tools without a11y requirements',
      'Does not replace testing with real assistive-tech users',
      'Does not translate content into sign language (different scope)',
      'Does not handle apps without a UI layer (e.g. pure APIs)'
    ],
    antiPatterns: [
      'Skip the audit - Designer starts the redesign without knowing what\'s broken; redesigning blind',
      'No axe-core/pa11y - manual testing leaves gaps; automated tooling is the baseline',
      'Ignoring keyboard - 15 percent of users don\'t use a mouse; every component must be tab-tested',
      'A11y as an afterthought - adding accessibility after launch costs 10x more',
      'No docs - regression sneaks in on future changes because devs don\'t know the standard'
    ],
    keyConcepts: [
      {term: 'WCAG 2.1/2.2', def: 'Web Content Accessibility Guidelines - the official W3C accessibility standard.'},
      {term: 'Semantic HTML', def: 'Using H1-H6, nav, main, article, aside tags instead of generic divs.'},
      {term: 'ARIA labels', def: 'Accessible Rich Internet Applications attributes for screen readers.'},
      {term: 'VPAT', def: 'Voluntary Product Accessibility Template - the standard compliance report format.'},
      {term: 'Lighthouse score', def: 'Google tool that measures a11y score from 0 to 100 (preset target: 95+).'}
    ],
    stats: [
      {label: 'Agents', value: '5'},
      {label: 'Phases', value: '5'},
      {label: 'Est. cost', value: '$0.60-1.50'},
      {label: 'Time', value: '3-5 min'}
    ],
    bestFor: [
      'When you\'re preparing an app for WCAG 2.1 AA compliance',
      'When you got an external audit report and need to fix the barriers',
      'When you serve government/public sector clients with ADA/EAA requirements'
    ],
    worstFor: [
      'When the app has no UI (pure API or CLI)',
      'When you\'re building an internal tool for a team without a11y requirements',
      'When you need business logic or backend changes'
    ],
    relatedPresets: ['design_sys', 'ui_overhaul', 'feature_sprint'],
    glossary: [
      {term: 'WCAG', definition: 'Web Content Accessibility Guidelines - the international digital accessibility standard.'},
      {term: 'ARIA', definition: 'Accessible Rich Internet Applications - W3C spec that adds semantics for screen readers.'},
      {term: 'axe-core', definition: 'Open source engine for automated WCAG audits, used by Lighthouse and Deque.'},
      {term: 'VPAT', definition: 'Voluntary Product Accessibility Template - standard a11y compliance report.'},
      {term: 'contrast ratio', definition: 'Luminance ratio between text and background - WCAG AA requires 4.5:1 for body text.'}
    ],
    learningQuote: 'Accessibility is not a feature, it\'s a right - Accessibility Sprint treats digital barriers like physical ones that must be removed.',
    realExample: 'Imagine an e-commerce site before launch: UX Researcher scans 4 pages and finds 47 WCAG violations (8 Critical, 15 High, 24 Medium). Designer ships a new palette (contrast 8.2:1), focus rings, skip nav. Frontend Dev applies 47 fixes. QA Quality: axe-core 0 Critical, 0 High, 3 acceptable Medium. Lighthouse goes from 52 to 97. Writer generates the VPAT and Developer Guide. Cost $0.24, 5 minutes, well worth avoiding an ADA lawsuit (average fine $75,000).'
  },
  review: {
    tagline: 'Build plus separate review - Analyst plans, two builders build, two reviewers audit independently',
    missionShort: 'Code Review is a six-role preset that pairs new feature build with mandatory peer review. Analyst creates the implementation plan, Backend Dev and Frontend Dev build in parallel, then QA Security and QA Quality audit the finished artifact independently. AWS Pull Request pattern with strict separation of writer and reviewer.',
    whoIs: 'Reach for this preset when you have a critical feature that needs peer review, a PR touching security-sensitive code, a compliance-driven change, or any important feature where the author should not validate their own work. Ideal when you need separation of build and review, not just the same people doing both.',
    analogy: 'This preset is like a scientific publication - the author writes the paper, two independent reviewers judge methodology and clarity, and the editor decides accept/revise/reject. The author NEVER reviews themselves.',
    howItWorks: [
      {label: 'Phase 1 - Analysis and plan', desc: 'Analyst receives the feature request, breaks it into concrete build tasks, identifies files to change, defines backend vs frontend boundaries, and defines tests. Produces an implementation plan that acts as the contract for builders and the reference for QA.'},
      {label: 'Phase 2 - Parallel build', desc: 'Backend Dev and Frontend Dev work SIMULTANEOUSLY from the same plan. Backend builds API/DB/logic/middleware. Frontend builds components/state/API integration/styling. Each owns their slice of the plan and integration tests.'},
      {label: 'Phase 3 - Parallel audit', desc: 'QA Security and QA Quality audit the COMBINED artifact at the same time. QA Security scans the NEW code against OWASP Top 5 (Injection, XSS, Broken Access Control, Misconfig, Vulnerable Components). QA Quality verifies conformance with the Analyst\'s plan and quality metrics.'},
      {label: 'Phase 4 - PASS/REVISE/REJECT decision', desc: 'Orchestrator synthesizes both QA reports. PASS - code is merge-ready. REVISE - micro-loop, builders fix without changing the plan. REJECT - macro-loop, Analyst re-plans and the cycle restarts. Max 3 iterations, then escalation.'}
    ],
    inputs: [
      'Feature request describing the new functionality',
      'Spec of business and technical requirements',
      'Existing codebase to modify or extend',
      'Acceptance criteria and architectural context (stack, conventions)'
    ],
    outputs: [
      'Implementation plan from the Analyst with file mapping',
      'Backend artifact with new/modified server code and tests',
      'Frontend artifact with UI code and component tests',
      'QA Security report with OWASP Top 5 audit of the new code',
      'QA Quality report with plan matching and metrics + PASS/REVISE/REJECT verdict'
    ],
    does: [
      'Separates writer from reviewer (AWS Pattern)',
      'Creates a formal review phase like a Pull Request in a human team',
      'Builds backend and frontend in parallel from one plan',
      'Audits new code (not the whole codebase) like a git diff review',
      'Checks build-vs-plan drift detection',
      'Offers three feedback loop levels (revise/reject/escalation)',
      'Catches security issues in new code before merge',
      'Delivers full traceability from plan to artifact'
    ],
    doesNotDo: [
      'Does not run a research phase - assumes you know the requirements',
      'Does not fit small changes - too heavy for typo fixes',
      'Does not audit the whole codebase - only new code (diff)',
      'Does not include QA Performance - focus is security and quality',
      'Does not replace a professional code review by a senior',
      'Does not work without a concrete feature request - needs input',
      'Does not do exploration - use recon or reflect for that'
    ],
    antiPatterns: [
      'Author reviews self - violates the AWS Pattern, no separation',
      'No Analyst - Builders guess the contract, QA has no baseline to validate',
      'Sequential build - Backend waits for Frontend or vice versa; 30-40 percent slower',
      'Full codebase audit - instead of git diff, 10x the cost, 90 percent irrelevant issues',
      'Max iterations exceeded without escalation - Orchestrator must step in after 3 iterations'
    ],
    keyConcepts: [
      {term: 'AWS Pattern', def: 'Build and review as separate parallel phases with strict separation of writers and reviewers.'},
      {term: 'Pipeline + Fan-out', def: 'Hybrid architecture - linear first (Analyst), then parallel (Builders, then QA).'},
      {term: 'Micro-loop', def: 'REVISE - QA returns notes, Builders fix, same plan, QA re-verifies.'},
      {term: 'Macro-loop', def: 'REJECT - QA rejects the plan, Analyst re-plans, Builders start over, QA re-verifies.'},
      {term: 'Plan matching', def: 'QA Quality checks that the artifact does exactly what the implementation plan said.'}
    ],
    stats: [
      {label: 'Agents', value: '6'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.05-2.70'},
      {label: 'Time', value: '4-6 min'}
    ],
    bestFor: [
      'When you have a critical feature that needs mandatory review before merge',
      'When the change touches security-sensitive code (auth, payments, user data)',
      'When you need a compliance audit trail (who built, who reviewed)'
    ],
    worstFor: [
      'When you\'re making small changes like typos or copy changes',
      'When you need quick research - no research phase here',
      'When the project is low-risk and review overhead isn\'t justified'
    ],
    relatedPresets: ['security', 'test_suite', 'feature_sprint'],
    glossary: [
      {term: 'pull request', definition: 'Formal request to review and merge code changes - the human equivalent of this preset.'},
      {term: 'AWS Pattern', definition: 'Amazon Web Services practice that separates builders from reviewers.'},
      {term: 'drift', definition: 'Deviation between build and plan - when a builder does something different than the Analyst planned.'},
      {term: 'micro-loop', definition: 'Short fix loop without changing the plan - just notes from QA to builders.'},
      {term: 'macro-loop', definition: 'Large loop - back to the Analyst for re-planning and a fresh build.'}
    ],
    learningQuote: 'Who wrote it does not review it - Code Review applies Amazon\'s golden engineering rule as a structural multi-agent pattern.',
    realExample: 'Imagine a "email notifications" feature for a SaaS app - Analyst creates a plan with 7 Backend tasks (EmailService, rate limiter, endpoints) and 5 Frontend tasks (preferences page, toggle, hook). Backend Dev and Frontend Dev build in parallel in 55 and 60 seconds. QA Security finds a MEDIUM - missing validation that the user is modifying THEIR OWN preferences. QA Quality PASS at 82 percent coverage. Orchestrator: PASS with a note "add middleware verifying req.user.id before production". 235K tokens, $0.32, 280 seconds, merge-ready.'
  },
  security: {
    tagline: 'Three-tier security audit with GO/NO-GO - OWASP, quality, performance, and a Manager synthesizing verdicts',
    missionShort: 'Security Hardening is a six-role pre-deployment audit preset. Backend Dev hardens the code (validation, sanitization, rate limiting, security headers), then three independent QAs (Security under OWASP Top 10, Quality under code quality, Performance under runtime performance) audit in parallel. QA Manager synthesizes all three reports into a formal GO / CONDITIONAL GO / NO-GO decision.',
    whoIs: 'Reach for this preset when you\'re running a pre-release security audit, compliance verification (PCI DSS, HIPAA, SOC2), production deployment gate, or prep for an external audit. Ideal anywhere the cost of an incident (IBM 2025 average $4.88M) vastly outweighs the $0.75-1.95 cost of an automated audit.',
    analogy: 'This preset is like a bridge inspection before opening - a structural engineer checks load capacity, a seismic expert checks shock resistance, a safety inspector checks overall risk. The chief inspector issues the permit only when all three say YES. Without everyone\'s sign-off the bridge does not open.',
    howItWorks: [
      {label: 'Phase 1 - Hardening by Backend Dev', desc: 'Orchestrator receives the artifact, Backend Dev hardens the code (does not build new features): adds input validation, output sanitization, rate limiting, security headers (CSP, HSTS, X-Frame-Options), CORS, security logging. Returns a hardened artifact.'},
      {label: 'Phase 2 - Fan-out three-tier audit', desc: 'Orchestrator distributes the hardened artifact SIMULTANEOUSLY to three QAs. Q-01 Security scans against OWASP Top 10 (Injection, Broken Access Control, Crypto Failures, Auth, Misconfig, Logging). Q-02 Quality verifies DRY/SOLID/tests/docs. Q-04 Performance analyzes Big-O/N+1/memory/I/O.'},
      {label: 'Phase 3 - Aggregation by QA Manager', desc: 'QA Manager (the only agent that sees all three reports) synthesizes them via a decision matrix. CRITICAL in Security = automatic NO-GO. HIGH in any layer = CONDITIONAL GO. Only MEDIUM/LOW = GO with notes. Overriding rule: CRITICAL Security ALWAYS blocks release.'},
      {label: 'Phase 4 - Final decision', desc: 'Orchestrator delivers the outcome: GO - full release approved. CONDITIONAL GO - release with a list of known issues and sprint follow-ups. NO-GO - escalation to Backend Dev for specific fixes, then another audit cycle.'}
    ],
    inputs: [
      'Finished source code ready to audit (JS/TS/Python/Go/etc.)',
      'Configuration - .env, docker-compose, nginx.conf, Dockerfile',
      'Specs - description of what the code should do (for conformance checks)',
      'Deployment context and compliance requirements (SOC2, GDPR, HIPAA, PCI-DSS)'
    ],
    outputs: [
      'Hardened artifact after the Backend Dev pass (validation, rate limiting, headers)',
      'QA Security report with OWASP vulnerability list and severity classification',
      'QA Quality report with DRY, SOLID, coverage, cyclomatic complexity metrics',
      'QA Performance report with Big-O, N+1 queries, memory leaks, bottlenecks',
      'QA Manager synthesis and formal GO / CONDITIONAL GO / NO-GO decision'
    ],
    does: [
      'Audits code from three independent perspectives (security, quality, performance)',
      'Catches 70-85 percent of common pre-deployment vulnerabilities',
      'Maps issues to OWASP Top 10 categories with severity',
      'Applies a formal GO/NO-GO decision matrix',
      'Guarantees CRITICAL security always blocks release',
      'Delivers an audit trail for compliance (SOC2, HIPAA, PCI-DSS)',
      'Hardens code via Backend Dev before QA starts auditing',
      'Iterates fixes until the verdict is GO or CONDITIONAL'
    ],
    doesNotDo: [
      'Does not replace professional human pentesting',
      'Does not replace manual code review by a senior engineer',
      'Does not catch business logic flaws that need domain context',
      'Does not test in production or run live exploits',
      'Does not auto-fix discovered vulnerabilities (only Backend Dev hardens upfront)',
      'Does not work on feature requests without ready code',
      'Does not perform a full OWASP ASVS audit (that\'s human pentester scope)'
    ],
    antiPatterns: [
      'Sequential audit - security then quality then performance; 3x slower with no gain',
      'No QA Manager - three independent reports without synthesis; GO/NO-GO decision becomes subjective',
      'Skipping Backend Dev hardening - audit without prior protection; more issues to fix',
      'Ignoring CRITICAL - attempting release despite a security block; incident risk',
      'No compliance context - audit without SOC2/HIPAA/PCI requirements; report won\'t match auditor expectations'
    ],
    keyConcepts: [
      {term: 'Fan-out to Aggregate', def: 'Pattern where Orchestrator dispatches work to multiple specialists and a Manager aggregates reports into a synthesis.'},
      {term: 'OWASP Top 10', def: 'Web application security standard - the ten most common vulnerability categories.'},
      {term: 'GO/NO-GO gate', def: 'Formal decision gate that must be passed before an artifact reaches production.'},
      {term: 'Severity matrix', def: 'Decision table mapping combinations of severity across three layers to GO/CONDITIONAL/NO-GO.'},
      {term: 'Hardening pass', def: 'Initial code strengthening (validation, headers, rate limiting) before the audit begins.'}
    ],
    stats: [
      {label: 'Agents', value: '6'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.75-1.95'},
      {label: 'Time', value: '3-6 min'}
    ],
    bestFor: [
      'When running a pre-release security audit before production deploy',
      'When preparing for a compliance audit (PCI DSS, HIPAA, SOC2)',
      'When you need a formal GO/NO-GO gate instead of a subjective opinion'
    ],
    worstFor: [
      'When trying to replace professional pentest - this is the first line, not the only one',
      'When making cosmetic UI changes - too heavy a preset',
      'When the app has no sensitive data and a security audit isn\'t needed'
    ],
    relatedPresets: ['security_multi_vector', 'review', 'test_suite'],
    glossary: [
      {term: 'OWASP', definition: 'Open Web Application Security Project - organization that standardizes web security.'},
      {term: 'hardening', definition: 'Process of strengthening code by adding validation, sanitization, and security controls.'},
      {term: 'severity', definition: 'Classification of vulnerability weight: CRITICAL, HIGH, MEDIUM, LOW.'},
      {term: 'PCI DSS', definition: 'Payment Card Industry Data Security Standard - required for apps handling payment cards.'},
      {term: 'fan-out', definition: 'Pattern of dispatching one artifact in parallel to multiple auditors.'}
    ],
    learningQuote: 'Three independent voices and a decision matrix - Security Hardening turns subjective fear of a breach into a structured GO/NO-GO process.',
    realExample: 'Imagine an e-commerce API two weeks before Black Friday - 12 Node/Express files, docker-compose, nginx, .env.production. Backend Dev hardens: input validation, rate limiting, security headers, CORS. Fan-out: QA Security finds HIGH - missing card validation per PCI. QA Quality PASS with MEDIUM on missing JSDoc. QA Performance HIGH - N+1 in /orders. QA Manager: HIGH security plus HIGH performance = CONDITIONAL GO with notes "fix before Black Friday". Orchestrator dispatches fixes, re-audit PASS, GO. Cost $0.35, 5 minutes, incident cost avoided.'
  },
  design_sys: {
    tagline: 'Brand book and component library in one pass - tokens, components, Storybook ready to ship',
    missionShort: 'Design System builds a consistent visual language for the app: tokens, palette, typography, components, and docs. Output is a React/Vue library synced with Storybook, ready for reuse across all products. Zero backend, zero business logic.',
    whoIs: 'Product teams and startups who notice every new screen looks different and want to unify the look once and for all. Especially useful at brand launch, rebrand, or when three frontend teams build three different button styles.',
    analogy: 'This preset is like building a brand book for a fashion house - trend researchers (UX + Docs) scan the runway and the docs, the designer draws the collection, the developer sews the finished pieces, and the copywriter writes the styling rules.',
    howItWorks: [
      {label: 'Phase 1: UX + Docs research', desc: 'UX Researcher analyzes trends (Material 3, Radix, shadcn, Linear) while Docs Researcher scans framework docs for design tokens, theming APIs, and accessibility constraints.'},
      {label: 'Phase 2: Design tokens + components', desc: 'Designer creates the palette, typographic scales, spacing scale, and dark mode tokens. Defines component variants (button sizes, input states, card elevations) as a single source of truth.'},
      {label: 'Phase 3: Frontend implementation', desc: 'Frontend Developer ships tokens as CSS custom properties or a theme object, codes React/Vue components on top of Radix/Headless UI, and builds a Storybook with every variant.'},
      {label: 'Phase 4: Docs + guidelines', desc: 'Writer produces usage docs: when to use primary vs secondary button, how to compose cards, spacing and typography rules, and when it\'s OK to break them.'}
    ],
    inputs: [
      'Existing app (screenshots) or moodboard for a new brand',
      'Frontend tech stack (React, Vue, Svelte) and preferred base libraries',
      'Branding constraints (brand colors, licensed fonts, logo)',
      'Success criteria (WCAG AA/AAA, dark mode, RTL support, min browser versions)'
    ],
    outputs: [
      'Design tokens in CSS variables or JSON format (colors, spacing, typography, radii, shadows)',
      'React/Vue component library with full variants and states (hover, focus, disabled)',
      'Storybook with live examples of every component and variant',
      'Usage documentation with DO/DONT examples and composition rules',
      'Accessibility report: contrast, focus indicators, keyboard nav, ARIA compliance'
    ],
    does: [
      'Creates a consistent visual language from palette down to micro-interactions',
      'Defines tokens as a single source of truth for all products',
      'Builds a component library synced with Storybook',
      'Ships dark mode and accessibility on day one (not as an afterthought)',
      'Writes guidelines with DO/DONT examples for every component',
      'Integrates existing libraries (Radix, Headless UI) instead of reinventing the wheel',
      'Delivers screenshot tests and visual regression (Chromatic) to protect the design from drift',
      'Validates APCA/WCAG contrast and typographic legibility at the token stage'
    ],
    doesNotDo: [
      'Does not build backend or APIs (that\'s API Modernization territory)',
      'Does not build business logic or app state',
      'Does not design individual screens (use UI Overhaul or Feature Sprint for that)',
      'Does not ship content management or a CMS',
      'Does not create marketing sites or landing pages',
      'Does not replace ready systems like Material UI or Ant Design when they\'re enough',
      'Does not do product copywriting (only system documentation)'
    ],
    antiPatterns: [
      'Color Copy Paste - duplicating hex values across the app instead of referencing tokens',
      'One-Off Component - building a new button for every screen instead of a variant',
      'Storybook Graveyard - Storybook built for a one-time demo, then never updated',
      'Design Token Overload - 400 colors in the palette instead of the 12 anyone can remember',
      'Frankensystem - mixing Material UI, Chakra, and custom components without a shared philosophy'
    ],
    keyConcepts: [
      {term: 'Design tokens', def: 'Named, reusable values (color, spacing, radius) expressed as variables.'},
      {term: 'Storybook', def: 'Environment for isolated development and documentation of UI components with live examples.'},
      {term: 'Headless components', def: 'Libraries like Radix that deliver logic and accessibility without imposed styles.'},
      {term: 'Visual regression', def: 'Automated component screenshots compared between commits to catch unwanted changes.'},
      {term: 'Theming API', def: 'Mechanism to swap themes (light/dark, brand A/B) without rewriting components.'}
    ],
    stats: [
      {label: 'Agents', value: '6'},
      {label: 'Phases', value: '3'},
      {label: 'Est. cost', value: '$0.85-2.15'},
      {label: 'Time', value: '8-14 min'}
    ],
    bestFor: [
      'When a new brand or rebrand needs a consistent visual language from the first screen',
      'When multiple frontend teams ship divergent styles and you want to unify them',
      'When you need a reusable component library for multiple products'
    ],
    worstFor: [
      'When the project needs business logic or backend (those roles aren\'t on the team)',
      'When stock Material UI or shadcn is enough without customization',
      'When you have only one screen to polish (too much overhead for a single view)'
    ],
    relatedPresets: ['ui_overhaul', 'api_modern', 'a11y'],
    glossary: [
      {term: 'token', definition: 'Semantic design variable (color-primary, spacing-md) referenced by components.'},
      {term: 'variant', definition: 'Alternate form of a component (button primary vs secondary, size sm vs lg).'},
      {term: 'dark mode', definition: 'Alternate theme with dark backgrounds and light text, toggled by system preference.'},
      {term: 'APCA', definition: 'Accessible Perceptual Contrast Algorithm - newer contrast calculation for WCAG 3.'},
      {term: 'headless UI', definition: 'Component that provides logic and a11y but leaves styling to the user.'}
    ],
    learningQuote: 'A design system isn\'t a collection of components - it\'s a contract that makes every new screen look like one hand drew it.',
    realExample: 'Imagine a SaaS startup that added screens ad-hoc for two years. Three different "save" buttons, four shades of blue, six heading sizes. A new designer spends half their time asking "which button do I use?". This preset, in one pass, creates tokens, components, and Storybook - after adoption every new screen starts looking like it came from a single book.'
  },
  api_modern: {
    tagline: 'Modernizing the app\'s engine without touching the UI - versioning, contracts, and backward compatibility',
    missionShort: 'API Modernization evolves a legacy API without touching the frontend: introduces versioning, migrates from REST to GraphQL, adds pagination, authorization, and idempotency. Output is new contracts and integrators guaranteeing that old clients keep working while new ones get a better interface.',
    whoIs: 'Backend teams with a working API that\'s starting to block growth: no versioning, no pagination, mixed styles, chaotic field names. Especially useful when you need to ship GraphQL alongside REST without breaking partner integrations.',
    analogy: 'This preset is like replacing plumbing in a building while residents still live there - pipes and cables (the API) get modernized quietly, while residents (frontend, mobile, partners) still see the same walls and light switches.',
    howItWorks: [
      {label: 'Phase 1: Existing API analysis', desc: 'Analyst maps all endpoints, formats, authentication, pagination, and identifies hidden contracts (what partners actually consume vs what\'s in the docs).'},
      {label: 'Phase 2: Pattern research', desc: 'Tech Researcher checks modern standards: OpenAPI 3.1, JSON:API, GraphQL, cursor pagination, idempotency keys, rate limiting, plus migration patterns like versioned URLs or header-based versioning.'},
      {label: 'Phase 3: Build + integration', desc: 'Backend Developer writes new endpoints or GraphQL resolvers, Integrator builds the compatibility layer (adapter from v1 to v2) so old clients keep working without changes.'},
      {label: 'Phase 4: Contract QA', desc: 'QA Quality tests full compatibility: contracts (Pact), performance (response time), regression (do old clients still get identical responses?), header versioning.'}
    ],
    inputs: [
      'Existing API with documentation (OpenAPI spec, Postman collection, or code)',
      'List of known consumers (frontend, mobile, partners, webhooks)',
      'Migration goal (REST to GraphQL, v1 to v2, adding pagination)',
      'Compatibility constraints (how long to keep the old version, SLA)'
    ],
    outputs: [
      'New contract (OpenAPI 3.1 or GraphQL schema) with versioning',
      'Endpoint or resolver implementation matching the new contract',
      'Compatibility layer (adapter v1 to v2) for old clients',
      'Migration guide for API consumers with before and after examples',
      'Contract tests (Pact or Dredd) protecting against contract regression'
    ],
    does: [
      'Introduces API versioning (URL, header, or GraphQL schema evolution)',
      'Migrates between styles (REST to GraphQL, RPC to REST)',
      'Adds modern pagination (cursor-based instead of offset)',
      'Ships idempotency keys for write operations',
      'Builds a compatibility layer so old clients keep working',
      'Updates authorization (OAuth 2.1, JWT, API keys) without killing existing tokens',
      'Writes contract tests protecting against unwanted breaking changes'
    ],
    doesNotDo: [
      'Does not design user interfaces or visual styling (no Designer or FE)',
      'Does not add new business features (that\'s Feature Sprint territory)',
      'Does not do full database rebuilds (only adapters over the existing schema)',
      'Does not touch client frontend logic - only delivers a compatible API',
      'Does not create partner SDKs (that\'s a separate pipeline)',
      'Does not replace security pentests (that\'s Security Hardening territory)',
      'Does not migrate infrastructure (AWS, Kubernetes) - only the app layer'
    ],
    antiPatterns: [
      'Big Bang Migration - killing v1 the same day v2 ships and breaking every client',
      'Silent Breaking Change - changing response format without versioning or alerting consumers',
      'Double Maintenance Hell - keeping v1 and v2 alive in parallel for 3 years with no exit plan',
      'Pagination Bait - introducing a limit of 100 results without doc notice, clients lose data',
      'GraphQL Cargo Cult - shipping GraphQL only because it\'s trendy, without real need'
    ],
    keyConcepts: [
      {term: 'Contract versioning', def: 'Mechanism for multiple API versions to coexist (URL, header, field).'},
      {term: 'Backward compatibility', def: 'Guarantee that old clients keep working after a new version ships.'},
      {term: 'Cursor pagination', def: 'Pagination based on a stable key instead of offset, robust against inserts.'},
      {term: 'Idempotency key', def: 'Identifier that lets you safely retry a POST request without duplicating the effect.'},
      {term: 'Contract test', def: 'Test that compares the API producer\'s contract against consumer expectations.'}
    ],
    stats: [
      {label: 'Agents', value: '6'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.95-2.35'},
      {label: 'Time', value: '10-16 min'}
    ],
    bestFor: [
      'When a legacy API is choking growth and versioning is missing',
      'When you\'re migrating REST to GraphQL and partners still need the old endpoints',
      'When you need to add pagination, authorization, or idempotency without touching the frontend'
    ],
    worstFor: [
      'When the project needs visual or UX changes (no designer)',
      'When there\'s no existing API - this preset is for evolution, not greenfield',
      'When you need a new client-facing business feature (use Feature Sprint)'
    ],
    relatedPresets: ['design_sys', 'feature_sprint', 'legacy'],
    glossary: [
      {term: 'OpenAPI', definition: 'REST API description standard (YAML/JSON) enabling auto-generation of clients and docs.'},
      {term: 'GraphQL', definition: 'Query language with a typed schema that lets the client declare exactly which fields it needs.'},
      {term: 'deprecation', definition: 'Marking a field or endpoint as obsolete in advance before removal.'},
      {term: 'Pact', definition: 'Framework for consumer-driven contract testing that prevents breaking integrations.'},
      {term: 'versioning', definition: 'Strategy for keeping multiple API versions in parallel (URL, header, field).'}
    ],
    learningQuote: 'A good API changes without stopping its consumers - a bad preset breaks every integration on a Friday night.',
    realExample: 'Imagine a SaaS app with a five-year-old REST API: offset pagination, no versions, fields alternating snake_case and camelCase. The mobile app gets duplicates while paging, and a partner integration sometimes drops records. This preset analyzes, designs v2 with cursor pagination, ships a v1 adapter, writes contract tests, and delivers a migration guide - zero downtime, zero broken clients.'
  },
  ui_overhaul: {
    tagline: 'Refreshing the product\'s look without touching the backend - new styles, animations, and micro-interactions',
    missionShort: 'UI Overhaul redesigns an existing app interface: new typography, new palette, modern components, micro-interactions, and dark mode. Backend stays untouched, and users see a product that changed like an apartment after renovation. 7 agents with dual UX+Docs research for full coverage of trends and constraints.',
    whoIs: 'Teams with a working product that looks dated and loses conversions or customers because of it. Ideal when a SaaS works technically fine but the UI looks like 2016 and new users bounce off the landing page.',
    analogy: 'This preset is like a full apartment renovation where the load-bearing walls stay in place - the interior architect researches trends, checks what can move and what can\'t, designs the new style, and the crew replaces floors, paint, and lighting without knocking down walls.',
    howItWorks: [
      {label: 'Phase 1: Dual UX + Docs research', desc: 'UX Researcher scans design patterns (Linear, Vercel, Arc, Notion) and 2026 trends. Docs Researcher in parallel checks framework constraints, accessibility, and browser support requirements.'},
      {label: 'Phase 2: Existing UI analysis', desc: 'Analyst inventories all screens, components, and states, mapping which parts can safely change and which need backend coordination (e.g. changing pagination API).'},
      {label: 'Phase 3: Design + implementation', desc: 'Designer builds the new visual system (colors, typography, spacing, dark mode), and Frontend Developer in parallel ships it as a refactor of existing components, keeping the same props and component API.'},
      {label: 'Phase 4: Visual and a11y QA', desc: 'QA Quality runs visual regression tests, checks contrast, animations on low-end devices, dark mode, responsive breakpoints, and WCAG 2.2 AA compliance.'}
    ],
    inputs: [
      'Existing app (screenshots, URL, repo access)',
      'Moodboard or design references (Linear, Vercel, competitors)',
      'Constraints (branding, browser support, performance budget)',
      'Success criteria (conversion, NPS, modernity, dark mode)'
    ],
    outputs: [
      'New design system implemented in the existing repo',
      'Component refactor preserving backward compatibility of component API',
      'Dark mode with automatic system preference detection',
      'Micro-interactions and animations respecting prefers-reduced-motion',
      'Visual regression suite protecting against unwanted changes'
    ],
    does: [
      'Refreshes colors, typography, spacing, and visual hierarchy',
      'Ships dark mode and themes from day one',
      'Adds micro-interactions and animations where they make sense',
      'Refactors components without changing their API (drop-in replace)',
      'Validates contrast, focus indicators, and keyboard navigation',
      'Optimizes bundle size for new CSS and assets',
      'Writes visual regression tests protecting the new look',
      'Integrates UX research with technical framework constraints'
    ],
    doesNotDo: [
      'Does not change the backend, API, or data model',
      'Does not add new business features (only existing ones in a new form)',
      'Does not design from scratch if there\'s no existing product (use Feature Sprint)',
      'Does not build a full design system as a library (use Design System)',
      'Does not replace user research (interviews, usability tests)',
      'Does not migrate the framework (React to Svelte) - only the look in the current stack',
      'Does not do copywriting or strategic rebranding'
    ],
    antiPatterns: [
      'Lipstick on a Pig - changing colors without fixing the information architecture that was the actual problem',
      'Trend Chasing - shipping glassmorphism only because it\'s trendy, without matching the brand',
      'Animation Overload - animating every element until the page becomes painful for epileptic users',
      'Dark Mode Half-Baked - dark mode built for main screens only, rest stays white',
      'Component API Break - a refactor that forces product teams to rewrite every usage site'
    ],
    keyConcepts: [
      {term: 'Visual regression', def: 'Automated comparison of component screenshots between versions to detect changes.'},
      {term: 'prefers-reduced-motion', def: 'System preference that lets the user disable animations, every redesign must honor it.'},
      {term: 'Drop-in replace', def: 'Refactor that needs no changes at usage sites - new component has the same API as the old one.'},
      {term: 'Micro-interaction', def: 'Small animation signaling response to a user action (hover, click, state change).'},
      {term: 'APCA contrast', def: 'Modern color contrast algorithm (WCAG 3 draft) more accurate than old WCAG 2.1 ratios.'}
    ],
    stats: [
      {label: 'Agents', value: '7'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.95-2.35'},
      {label: 'Time', value: '10-18 min'}
    ],
    bestFor: [
      'When a product works technically fine but looks dated and is losing users',
      'When you want to add dark mode and modern micro-interactions to an existing app',
      'When you have an existing React/Vue stack and don\'t want to migrate it, just refresh the look'
    ],
    worstFor: [
      'When the project needs backend changes or new business features',
      'When you\'re starting from scratch with no existing UI (use Feature Sprint or Startup MVP)',
      'When you need a full reusable component library (use Design System)'
    ],
    relatedPresets: ['design_sys', 'feature_sprint', 'a11y'],
    glossary: [
      {term: 'redesign', definition: 'Rebuilding the look of an existing interface while preserving its functionality.'},
      {term: 'dark mode', definition: 'Alternate theme with dark backgrounds, toggled automatically or manually.'},
      {term: 'easing', definition: 'Animation timing curve defining how an element accelerates and decelerates.'},
      {term: 'focus-visible', definition: 'CSS selector showing the focus ring only when the user navigates by keyboard.'},
      {term: 'scroll-snap', definition: 'CSS mechanism that stops scroll at specific points for carousels and full-screen sections.'}
    ],
    learningQuote: 'Redesign isn\'t about changing colors - it\'s about the product feeling like someone touched it recently with love.',
    realExample: 'Imagine a five-year-old project management SaaS. Features are good, customers pay, but new users say "looks like Trac". This preset runs dual research (2026 trends + React constraints), designs a new system, ships dark mode, adds scroll animations on the task list - within a week NPS rises by 12 points and demo sales go up 20 percent without a single backend change.'
  },
