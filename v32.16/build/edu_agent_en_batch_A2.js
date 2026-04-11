// Batch: A2 EN translations (res_ux, res_reddit, res_x, res_github, res_forums)
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
