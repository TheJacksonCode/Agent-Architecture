// Batch: A4 EN translations (designer, integrator, writer, qa_security, qa_quality)
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
