// Batch: P7 EN translations (kb_constructor, tech_writing_pipe, five_minds_strategic, soc2_sweep, data_analysis_pipe, incident_war_room)
  kb_constructor: {
    tagline: 'Four agents in parallel clean Slack, wiki, PDFs, and GitHub into one knowledge base',
    missionShort: 'KB Constructor is a 10-agent team for building a knowledge base from scattered sources. Four ingesters in parallel normalize Slack, wiki, PDFs, and GitHub into a shared chunk format, a deduplicator removes repeats, a writer drafts articles, a critic fact-checks, and an integrator publishes. For companies that have drowned their knowledge in silos.',
    whoIs: 'A preset for teams whose knowledge is spread across many sources and who want to merge it into one knowledge base. Ideal for onboarding new hires, migrating a wiki from Confluence to Notion, or a customer support base. Not for a single source, and not for a base that needs continuous real-time updates.',
    analogy: 'This preset is like a digital library that hires four archivists, each specialized in a different format (journals, manuscripts, microfilm, books), and then an editor writes the entries and a press publishes them.',
    howItWorks: [
      {label: 'Phase 1 - Parallel ingest', desc: 'Four ingesters work in parallel, each on its own source: Slack (channels + messages), wiki (pages + metadata), PDFs (text + structure extraction), GitHub (README + docs). Each returns chunks in a unified format.'},
      {label: 'Phase 2 - Dedup and structuring', desc: 'The deduplicator uses embeddings and fuzzy matching to remove duplicates (when two sources say the same thing). It groups related chunks into topics and proposes a category structure.'},
      {label: 'Phase 3 - Writing and fact-check', desc: 'The writer drafts articles from the best chunks, preserving links to originals. The critic verifies that every fact has a source and flags contradictions.'},
      {label: 'Phase 4 - Publish and reranking', desc: 'The integrator publishes to the target system (Notion, Confluence, custom). It configures a reranker for search and tests recall against a sample of queries.'}
    ],
    inputs: [
      'List of sources with access credentials (Slack token, wiki creds, PDFs, repo)',
      'Target system (Notion, Confluence, custom)',
      'Category structure (optional - the system can propose one)',
      'List of critical questions for recall testing'
    ],
    outputs: [
      'Knowledge base structure (categories and tags)',
      'Articles organized by topic with links to sources',
      'Deduplicated chunks ready for embedding',
      'Fact-check report with a list of contradictions',
      'Ready-to-import package for the target system'
    ],
    does: [
      'Normalizes data from four different sources into one shared format',
      'Dedupes chunks using embeddings and fuzzy matching',
      'Generates a category structure from topics',
      'Writes articles while preserving links to original sources',
      'Fact-checks every claim before publication',
      'Configures a reranker for search quality',
      'Tests recall against a defined query set',
      'Publishes to the target system'
    ],
    doesNotDo: [
      'Doesn\'t work with a single source (overkill)',
      'Doesn\'t update the base in real time (one-off operation)',
      'Isn\'t a substitute for a vector DB (only prepares the data)',
      'Doesn\'t create access policies (that\'s an admin\'s job)',
      'Doesn\'t replace a domain expert for critical data',
      'Doesn\'t build semantic search itself (only structure)',
      'Doesn\'t translate documents (that\'s another pipeline)'
    ],
    antiPatterns: [
      'Dump and Dupe - loading everything without dedup leaves the base 50% garbage',
      'Lost Sources - articles without links to sources block any verification',
      'Unfactchecked - publishing without fact-check leaks contradictions to users',
      'Rigid Structure - a predefined structure that doesn\'t fit the data forces ugly reshuffling',
      'Missing Reranker - search without a reranker returns unrelated results'
    ],
    keyConcepts: [
      {term: 'Chunking', def: 'Splitting documents into smaller fixed-size pieces for embedding and retrieval.'},
      {term: 'Dedup', def: 'Removing duplicate chunks via embedding similarity and fuzzy matching.'},
      {term: 'Embedding', def: 'Conversion of text into a vector of numbers that represents meaning for semantic search.'},
      {term: 'Reranker', def: 'A second search stage that rescores the top results with a stronger model for relevance.'},
      {term: 'RAG', def: 'Retrieval Augmented Generation - an LLM answers questions by reaching into a knowledge base.'}
    ],
    stats: [
      {label: 'Agents', value: '10'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.85-2.15'},
      {label: 'Time', value: '30-60 min'}
    ],
    bestFor: [
      'When you\'re migrating an internal wiki from Confluence to Notion or the other way around',
      'When you\'re building a knowledge base for new hires or customer support',
      'When the company has knowledge scattered across Slack, wiki, PDFs, and GitHub'
    ],
    worstFor: [
      'When you only have one source of information (too heavy a preset)',
      'When you need continuous real-time updates (this is a one-off operation)',
      'When you already have a solid semantic search system'
    ],
    relatedPresets: ['content', 'research', 'tech_writing_pipe'],
    glossary: [
      {term: 'chunking', definition: 'Splitting a document into fixed-size pieces for embedding.'},
      {term: 'dedup', definition: 'Removing duplicate chunks via similarity.'},
      {term: 'embedding', definition: 'A vector representing the meaning of text for semantic search.'},
      {term: 'reranker', definition: 'A second search stage that rescores results with a stronger model.'},
      {term: 'RAG', definition: 'Retrieval Augmented Generation - an LLM reaching into a knowledge base.'}
    ],
    learningQuote: 'Knowledge scattered across five sources is worse than no knowledge at all - a new hire loses weeks searching while the answers contradict each other.',
    realExample: 'Imagine that your company has 300 employees and its knowledge is spread across Slack (3 years of an engineering channel), a Confluence wiki (400 pages), a Drive folder of onboarding PDFs, and READMEs in 40 repositories. KB Constructor spins up 4 ingesters in parallel, the deduplicator finds that 60% of the Confluence entries are copies of Slack messages, the writer drafts 80 categorized articles, the critic catches 7 contradictions between sources, and the integrator publishes to Notion with a reranker that answers correctly on 85% of test queries.'
  },
  tech_writing_pipe: {
    tagline: 'Plan plus research plus writing plus diagrams plus SEO plus fact-check in one pipeline',
    missionShort: 'Tech Writing Pipeline is an 8-agent team for longer technical texts. An analyst builds the outline, two researchers in parallel gather facts (docs + GitHub), a writer writes, a designer draws diagrams, an SEO agent optimizes headers and meta, and a critic checks facts and tone. For technical blogs, whitepapers, and conference talks.',
    whoIs: 'A preset for technical marketing teams, DevRel, or contributors who write longer technical material. Ideal for technical blog posts, whitepapers, conference slides, and deep-dive case studies. Not for short posts, tweets, social media, or internal notes.',
    analogy: 'This preset is like a science and technology magazine newsroom where the research department gathers facts, the editor writes the copy, an illustrator creates the artwork, an SEO specialist optimizes it, and a fact-checker verifies everything before it goes to print.',
    howItWorks: [
      {label: 'Phase 1 - Outline and audience', desc: 'The analyst defines who the text is for (audience, knowledge level), formulates the main angle, and drafts an outline with sections. Sets success criteria (what the reader will learn).'},
      {label: 'Phase 2 - Parallel research', desc: 'Two researchers gather material in parallel: res_docs reads official documentation for technical facts, res_github looks for code examples and benchmarks. Each returns organized findings.'},
      {label: 'Phase 3 - Writing and enrichment', desc: 'The writer drafts the text strictly from the researchers\' findings (no hallucinating). The designer draws diagrams for complex concepts. The SEO optimizer picks keywords, H1-H3 headers, and meta descriptions.'},
      {label: 'Phase 4 - Fact-check and tone polish', desc: 'The critic checks every fact against sources, flags contradictions, and verifies tone (audience match). Generates a pre-publish checklist.'}
    ],
    inputs: [
      'Topic and goal of the text (blog, whitepaper, talk)',
      'Audience (beginners, advanced, decision-makers)',
      'Angle or main thesis (what you want to get across)',
      'Optional rough outline or bullet points'
    ],
    outputs: [
      'Long article or whitepaper with code examples',
      'Architecture and flow diagrams for complex concepts',
      'Titles and meta descriptions optimized for search',
      'Citation list with links to sources',
      'Pre-publish readiness checklist'
    ],
    does: [
      'Starts from an outline instead of writing immediately',
      'Uses two researchers for facts (docs + github)',
      'Isolates the writer from making things up - writes only from research',
      'Adds diagrams for complex concepts',
      'Optimizes for SEO without keyword stuffing',
      'Fact-checks every claim before publication',
      'Adjusts tone to the audience',
      'Generates a readiness checklist'
    ],
    doesNotDo: [
      'Doesn\'t write short social media posts (overkill)',
      'Doesn\'t create tweets or threads',
      'Doesn\'t execute code (the designer draws, doesn\'t run)',
      'Doesn\'t publish on its own (only prepares ready copy)',
      'Doesn\'t translate into other languages (that\'s another pipeline)',
      'Doesn\'t replace a human editor for brand style',
      'Doesn\'t guarantee Google rankings (only optimizes)'
    ],
    antiPatterns: [
      'Writer First - writing without research produces hallucinations',
      'SEO Stuffing - cramming keywords into the text destroys tone and readability',
      'No Fact-check - publishing without verification ships errors to readers',
      'Generic Audience - text for everyone is text for no one',
      'Diagram Theater - diagrams that explain nothing only add noise'
    ],
    keyConcepts: [
      {term: 'Outline-First', def: 'Starting with a section plan before writing - reduces chaos and hallucinations.'},
      {term: 'E-E-A-T', def: 'Experience, Expertise, Authoritativeness, Trust - Google\'s quality signals for content.'},
      {term: 'Structured Data', def: 'Schema.org markup for an article that lets Google understand the content better.'},
      {term: 'Audience Calibration', def: 'Matching vocabulary, assumptions, and depth to the reader\'s level.'},
      {term: 'Fact-check Loop', def: 'A dedicated step that verifies every claim against sources before publication.'}
    ],
    stats: [
      {label: 'Agents', value: '8'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$0.75-1.85'},
      {label: 'Time', value: '20-40 min'}
    ],
    bestFor: [
      'When you\'re writing a deep company blog post or a whitepaper for clients',
      'When you\'re preparing a conference talk or a deep-dive case study',
      'When you need a long technical piece that\'s verified for factual accuracy'
    ],
    worstFor: [
      'When you\'re writing a short Twitter or LinkedIn post',
      'When you\'re writing an internal note for the team',
      'When you have 10 minutes for content and don\'t want a full pipeline'
    ],
    relatedPresets: ['content', 'research', 'kb_constructor'],
    glossary: [
      {term: 'outline', definition: 'A section plan for the text before writing - reduces chaos.'},
      {term: 'E-E-A-T', definition: 'Experience Expertise Authoritativeness Trust - Google quality signals.'},
      {term: 'SEO', definition: 'Search Engine Optimization - optimizing content for search engines.'},
      {term: 'audience', definition: 'The target reader who determines vocabulary and depth.'},
      {term: 'fact-check', definition: 'Verification of every claim against sources before publication.'}
    ],
    learningQuote: 'Without an outline and research the writer hallucinates and the fact-checker has to catch it later - Tech Writing Pipeline enforces the order: plan, facts, writing, verification.',
    realExample: 'Imagine that your DevRel is writing a Kubernetes deep-dive for the company blog and the boss says "by tomorrow." Without the preset, that\'s a recipe for hallucinations. Tech Writing Pipeline: the analyst builds an outline for an audience of senior platform engineers, res_docs reads the official k8s docs v1.32, res_github looks for real-world examples in the kubernetes/examples repo, the writer produces 2500 words strictly from the research, the designer draws a reconciliation loop diagram, SEO optimizes for "kubernetes operator pattern," the critic catches one wrong fact about leader election, and the piece is ready to publish.'
  },
  five_minds_strategic: {
    tagline: 'Hard data first, then debate - five experts with numbers in hand instead of an opinion war',
    missionShort: 'Five Minds Strategic is a 13-agent team for high-stakes strategic decisions. Four researchers in parallel gather hard data (market, financials, technology, legal), an analyst frames the question, five experts plus Devil\'s Advocate debate for three rounds, a synthesizer writes the Gold Solution, and a PM sign-off closes it out. For pivots, acquisitions, and irreversible strategic choices.',
    whoIs: 'A preset for boards and senior leadership teams making strategic decisions with a 3+ year horizon. Ideal for company pivots, acquisition evaluations, and picking a platform for the next 5 years. Not for tactical decisions due today, urgent matters, or cases where the answer is already obvious.',
    analogy: 'This preset is like a war council with an intelligence dossier, where scouts gather information first, then the generals debate for three rounds against a prosecutor, and the final plan goes to the president.',
    howItWorks: [
      {label: 'Phase 1 - Parallel intelligence', desc: 'Four researchers gather data in parallel: market intel (market, competition, trends), financial (financials, ROI, costs), technical (feasibility, risks, stacks), legal (regulations, compliance). Each returns hard numbers.'},
      {label: 'Phase 2 - Option framing', desc: 'The analyst synthesizes the 4 reports into formalized decision options (2-5) with pros, cons, and uncertainties. Presents each option in the same structure.'},
      {label: 'Phase 3 - Three-round debate', desc: 'Five experts (innovator, analyst, pragmatist, user, visionary) plus Devil\'s Advocate debate for three rounds: opinion -> counterarguments -> synthesis. Devil\'s Advocate attacks the strongest proposal looking for weaknesses.'},
      {label: 'Phase 4 - Gold Solution and HITL', desc: 'The synthesizer writes a Gold Solution better than any individual option (a real synthesis, not a compromise). The PM signs off on the decision with a rationale and a list of dissenting opinions.'}
    ],
    inputs: [
      'Strategic question with a definition of stakes (investment, time horizon)',
      'List of options to consider (or an area to investigate)',
      'Company context (stage, culture, constraints)',
      'Decision deadline (minimum days for the debate)'
    ],
    outputs: [
      'Four reports with hard data (market, financials, tech, legal)',
      'Log of the three debate rounds with expert arguments',
      'Gold Solution with analysis of pros and cons',
      'List of dissenting opinions kept on record',
      'Signed PM decision with an implementation plan'
    ],
    does: [
      'Gathers hard data before the debate (no opinion war)',
      'Uses 4 specialized researchers for the key areas',
      'Formalizes the debate into three rounds with explicit structure',
      'Uses Devil\'s Advocate for adversarial challenge of the strongest proposal',
      'Has the synthesizer write a Gold Solution better than all options',
      'Records dissenting opinions for the historical record',
      'Enforces PM sign-off with written rationale',
      'Documents everything for a decision audit'
    ],
    doesNotDo: [
      'Not for tactical decisions due today (too heavy)',
      'Not for urgent matters (three debate rounds take time)',
      'Doesn\'t run without time for research',
      'Doesn\'t replace a domain expert in narrow areas',
      'Doesn\'t do implementation (decision only)',
      'Doesn\'t guarantee the decision will be correct (only the process)',
      'Doesn\'t work when the answer is obvious to everyone'
    ],
    antiPatterns: [
      'Opinion War - debate without data turns into whoever shouts loudest',
      'Skipped Devil - the team skips the adversarial challenge and runs with the first proposal',
      'Gold Compromise - the synthesizer produces a compromise instead of a true synthesis',
      'Silent Dissent - losing dissenting opinions robs the company of learning',
      'Rushed Rounds - cutting 3 rounds to 1 kills the adversarial value'
    ],
    keyConcepts: [
      {term: 'Adversarial Collaboration', def: 'Collaboration where different experts formally attack each other\'s positions to find weaknesses.'},
      {term: 'Pre-mortem', def: 'Technique of imagining the decision was a failure and trying to work out why.'},
      {term: 'Steel Man', def: 'Rebuilding the strongest version of your opponent\'s argument instead of attacking a weak one.'},
      {term: 'Gold Solution', def: 'Synthesis of all debate rounds that is better than any single proposal, not a compromise.'},
      {term: 'Dissenting Opinion', def: 'A formal record of a differing view kept for historical record and learning.'}
    ],
    stats: [
      {label: 'Agents', value: '13'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.65-4.10'},
      {label: 'Time', value: '45-90 min'}
    ],
    bestFor: [
      'When you\'re deciding on a company pivot or acquiring another company',
      'When you\'re picking a tech stack or vendor for the next 5 years',
      'When the stakes are irreversible and require hard data plus debate'
    ],
    worstFor: [
      'When you need a tactical decision today',
      'When you have an urgent matter with no time for a three-round debate',
      'When the answer is obvious to everyone and the debate is a waste of time'
    ],
    relatedPresets: ['five_minds', 'deep_five_minds', 'deep_research_swarm_pro'],
    glossary: [
      {term: 'pivot', definition: 'A change in company direction or product strategy.'},
      {term: 'Gold Solution', definition: 'A synthesis better than individual options, not a compromise.'},
      {term: 'pre-mortem', definition: 'Imagining the decision failed and analyzing why.'},
      {term: 'steel man', definition: 'Rebuilding the strongest version of your opponent\'s argument.'},
      {term: 'dissenting opinion', definition: 'A formal record of a differing view for the historical record.'}
    ],
    learningQuote: 'Debate without hard data is an opinion war - Five Minds Strategic forces research, debate, and sign-off in one pass.',
    realExample: 'Imagine that the board is considering acquiring a competitor for 50 million dollars. Four researchers gather in parallel: market intel (share, trends), financial (ROI, costs, debt), technical (stack compatibility, tech debt), legal (antitrust, employees). The analyst frames three options (buy the whole company, buy only the technology, don\'t buy). Five experts debate three rounds and Devil\'s Advocate attacks option 1, finding overpay risk and culture clash. The synthesizer writes a Gold Solution: buy only the technology and hire the key engineers. The PM signs off with a dissenting opinion on record that a board member wanted a full acquisition.'
  },
  soc2_sweep: {
    tagline: 'SOC 2 Type II readiness run by the full team - control mapping plus evidence plus gap',
    missionShort: 'SOC2 Sweep is a 9-agent team for SOC 2 Type II audit preparation. A policy reader reads company policies, a control mapper maps them to CC1-CC9, an evidence collector gathers proof, a gap analyzer flags missing controls, qa_security verifies technical controls, and a CISO signs off on readiness. Aligned with Trust Services Criteria.',
    whoIs: 'A preset for security and compliance teams preparing for a SOC 2 audit. Ideal for startups moving upmarket to enterprise, quarterly reviews, and vendor risk assessment responses. Not for companies without any policies, not for continuous compliance (use Vanta/Drata), and not for minor fixes.',
    analogy: 'This preset is like an audit of a bank where one auditor reads the policies, a second maps them to regulations, a third collects evidence, a fourth points out the gaps, and the CFO signs off on the report for the regulator.',
    howItWorks: [
      {label: 'Phase 1 - Policy reading', desc: 'The policy reader reads every SOP, security policy, vendor agreement, and incident runbook the company has. Builds a policy map with metadata (dates, owners).'},
      {label: 'Phase 2 - Control mapping', desc: 'The control mapper maps policies onto Trust Services Criteria CC1-CC9 (Control Environment, Communication, Risk Assessment, Monitoring, Control Activities, Logical Access, System Ops, Change Mgmt, Risk Mitigation).'},
      {label: 'Phase 3 - Evidence collection', desc: 'The evidence collector gathers evidence for each control: screenshots, configs, logs, audit trails, personnel records. qa_security verifies the technical controls (encryption, MFA, backup, access reviews).'},
      {label: 'Phase 4 - Gap analysis and CISO sign-off', desc: 'The gap analyzer flags missing coverage, proposes remediation, and estimates priorities. The CISO reviews the readiness report and signs off on audit readiness with a remediation plan.'}
    ],
    inputs: [
      'Set of company policies and SOPs',
      'Access to production systems for evidence collection',
      'List of current employees and their roles',
      'Audit scope (which products, which regions)'
    ],
    outputs: [
      'Compliance table with every requirement and its evidence',
      'Evidence folder (screenshots, configs, logs)',
      'List of gaps ordered by priority',
      'Remediation proposals for each gap',
      'Signed audit readiness report from the CISO'
    ],
    does: [
      'Reads every company policy and maps them to CC1-CC9',
      'Collects evidence automatically for technical controls',
      'Verifies encryption, MFA, backup, and access reviews',
      'Flags gaps in Trust Services Criteria coverage',
      'Proposes remediation with P0-P3 priorities',
      'Generates a folder for the external auditor',
      'Enforces CISO sign-off before the audit',
      'Documents everything for the historical record'
    ],
    doesNotDo: [
      'Doesn\'t replace the external auditor (preparation only)',
      'Doesn\'t work without existing policies (write them first)',
      'Isn\'t continuous compliance (use Vanta/Drata)',
      'Doesn\'t remediate gaps itself (only identifies them)',
      'Isn\'t a pentest or a security audit',
      'Doesn\'t cover ISO 27001 automatically (different standard)',
      'Doesn\'t replace HR for personnel records'
    ],
    antiPatterns: [
      'Policy Theater - the policies exist on paper but nobody follows them',
      'Evidence Vacuum - control evidence was collected a year ago and is already stale',
      'Ignored Gaps - the gap analyzer flags gaps that then nobody fixes',
      'Missing CISO - a sign-off without CISO involvement has no value',
      'Scope Creep - trying to cover everything instead of the selected products'
    ],
    keyConcepts: [
      {term: 'Trust Services Criteria', def: 'AICPA framework with 5 categories: Security, Availability, Processing Integrity, Confidentiality, Privacy.'},
      {term: 'CC1-CC9', def: 'The nine Common Criteria in SOC 2: Control Environment, Communication, Risk, Monitoring, Control, Access, Ops, Change, Risk Mitigation.'},
      {term: 'Control Evidence', def: 'Proof that a control actually works in practice: screenshots, configs, logs, audit trails.'},
      {term: 'Gap Remediation', def: 'Remediation plan for control coverage gaps with priorities and a timeline.'},
      {term: 'SOC 2 Type II', def: 'A SOC 2 audit covering a period of at least 6 months rather than a single point in time.'}
    ],
    stats: [
      {label: 'Agents', value: '9'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.10-2.75'},
      {label: 'Time', value: '30-60 min'}
    ],
    bestFor: [
      'When you\'re preparing for a SOC 2 Type II audit for enterprise customers',
      'When you\'re answering a vendor risk assessment from a large customer',
      'When you\'re running a quarterly compliance review or prepping for ISO 27001'
    ],
    worstFor: [
      'When you don\'t have any company policies (write them first)',
      'When you want continuous compliance (use Vanta or Drata)',
      'When you only need minor security fixes'
    ],
    relatedPresets: ['security_multi_vector', 'security', 'test_suite'],
    glossary: [
      {term: 'SOC 2', definition: 'AICPA security audit standard for cloud vendors.'},
      {term: 'Trust Services Criteria', definition: 'Framework with 5 categories: Security, Availability, Processing Integrity, Confidentiality, Privacy.'},
      {term: 'CC1-CC9', definition: 'The nine Common Criteria in SOC 2.'},
      {term: 'evidence', definition: 'Proof that a control actually works in practice.'},
      {term: 'Type II', definition: 'An audit covering a 6-12 month period, not a single point in time.'}
    ],
    learningQuote: 'SOC 2 isn\'t documentation on a shelf - it\'s proof that controls work every single day, and this preset automates collecting that proof.',
    realExample: 'Imagine that your SaaS startup has a contract with a big enterprise customer worth 2 million a year, but the customer requires SOC 2 Type II within 6 months. The policy reader reads 28 policies, the control mapper maps them to CC1-CC9, the evidence collector gathers AWS configurations, access review logs, and screenshots from Okta, the gap analyzer flags 7 gaps (no formal vendor risk assessment, no annual penetration test, no formalized incident response plan). The CISO signs off on the report with a remediation plan 3 months before the audit.'
  },
  data_analysis_pipe: {
    tagline: 'Nine agents in sequence - collect plus clean plus EDA plus model plus report',
    missionShort: 'Data Analysis Pipeline is a 9-agent team for turning raw data into a stakeholder-ready report. A data collector profiles the dataset, a cleaner normalizes it, an EDA analyst and SQL specialist look for patterns in parallel, a statistician checks for soundness, a model builder optionally trains a prediction, a writer drafts the report, and a designer produces the charts. Based on arXiv 2510.04023.',
    whoIs: 'A preset for data analysts and business intelligence teams who need to turn a raw spreadsheet into a board-ready report. Ideal for ad-hoc business questions, churn analysis, pricing, and A/B test post-mortems. Not for real-time streaming data, ML production deployment, or work without access to the raw data.',
    analogy: 'This preset is like a data science consulting team where an engineer ingests the data, an analyst cleans it, a scientist runs EDA, a modeler trains, and a narrator writes the board report with a statistician peer-reviewing the math.',
    howItWorks: [
      {label: 'Phase 1 - Profiling and cleaning', desc: 'The data collector profiles the sheet (schema, statistics, ~5k samples instead of the raw file). The data cleaner normalizes (missing values, outliers, date formats, encoding).'},
      {label: 'Phase 2 - Parallel EDA', desc: 'The EDA analyst looks for patterns (distributions, correlations, segments). The SQL specialist writes queries for specific business hypotheses. They work in parallel.'},
      {label: 'Phase 3 - Stats sanity and modeling', desc: 'The statistician checks whether conclusions are statistically significant and flags leakage, assumption violations, and multiple-comparison problems. Optionally the model builder trains a simple prediction model.'},
      {label: 'Phase 4 - Report and charts', desc: 'The writer produces a board-ready report with an executive summary, key insights, and recommendations. The designer builds the charts. The critic verifies the stats sanity.'}
    ],
    inputs: [
      'Access to the raw data (CSV, DB, warehouse)',
      'Business question (why did sales drop)',
      'Business context (products, segments, time period)',
      'Audience for the report (board, ops, marketing)'
    ],
    outputs: [
      'Board-ready report with the key findings',
      'Charts with narrative for each insight',
      'Confidence on every claim plus limitations',
      'Optional simple prediction model',
      'Recommendations with concrete actions'
    ],
    does: [
      'Profiles the dataset without reading it all (samples + stats)',
      'Cleans data (missing values, outliers, formats)',
      'Runs EDA and SQL in parallel for different hypotheses',
      'Checks statistical soundness (leakage, assumptions)',
      'Optionally builds a simple prediction model',
      'Generates charts with narrative',
      'Writes the report for a specific audience',
      'Runs every claim through the critic'
    ],
    doesNotDo: [
      'Not for real-time streaming data (different architecture)',
      'Doesn\'t deploy models to production (that\'s ML engineering)',
      'Doesn\'t work without access to raw data',
      'Doesn\'t replace a data engineer for ETL',
      'Doesn\'t do causal inference on observational data',
      'Doesn\'t build live dashboards (that\'s BI tooling)',
      'Doesn\'t deliver insights beyond what\'s in the sheet'
    ],
    antiPatterns: [
      'Full Data Dump - the writer gets raw data and invents statistics',
      'P-hacked Insight - EDA finds something random and ships it as a finding',
      'Missing Baseline - no comparison to a previous period hides the real change',
      'Leakage Blind - the model uses future features as predictors',
      'No Stats Check - the report is published with no statistical sanity check'
    ],
    keyConcepts: [
      {term: 'EDA', def: 'Exploratory Data Analysis - visualization and statistics first to understand the data.'},
      {term: 'Missingness', def: 'Pattern of missing values that can be MCAR, MAR, or MNAR.'},
      {term: 'Leakage', def: 'Model uses information it shouldn\'t have at prediction time (future features).'},
      {term: 'Model Card', def: 'Model documentation with purpose, data, metrics, limitations, and recommended use.'},
      {term: 'Multiple Comparisons', def: 'Problem where testing many hypotheses inflates type I errors and requires correction.'}
    ],
    stats: [
      {label: 'Agents', value: '9'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.10-2.75'},
      {label: 'Time', value: '25-50 min'}
    ],
    bestFor: [
      'When the board asks why sales dropped in March and you need a data-driven answer',
      'When you\'re analyzing customer churn or a pricing experiment',
      'When you\'re doing an A/B test post-mortem or a product analysis'
    ],
    worstFor: [
      'When you have live streaming data (different architecture)',
      'When you want to deploy a model to production (that\'s ML engineering)',
      'When you don\'t have access to the raw data'
    ],
    relatedPresets: ['ab_test_lab', 'research', 'data_pipe'],
    glossary: [
      {term: 'EDA', definition: 'Exploratory Data Analysis - initial exploration and visualization.'},
      {term: 'leakage', definition: 'Using future information as a prediction feature.'},
      {term: 'model card', definition: 'Model documentation with purpose, data, metrics, and limitations.'},
      {term: 'missingness', definition: 'Pattern of missing values: MCAR, MAR, or MNAR.'},
      {term: 'correlation', definition: 'Measure of co-occurrence between two variables, not necessarily causal.'}
    ],
    learningQuote: 'Without a stats sanity check it\'s easy to find patterns that aren\'t there - Data Analysis Pipeline enforces discipline from profiling to report.',
    realExample: 'Imagine that the CFO asks why Q3 revenue dropped 8% and has a CSV of 2 million transactions on the desk. The data collector profiles (14 columns, 12 dates, 4 numeric, 2 text), the cleaner catches 3% missing values in the region field, the EDA analyst sees the drop is concentrated in two regions, the SQL specialist isolates specific products, the statistician confirms it isn\'t seasonality and it isn\'t a one-off anomaly. The writer produces a report for the CFO with three recommendations and charts, and the critic verifies the stats sanity.'
  },
  incident_war_room: {
    tagline: 'Three specialists hunt the cause in parallel - Devil\'s Advocate challenges the hypothesis and a human decides on rollback',
    missionShort: 'Incident War Room is a 10-agent team for triaging production outages. Three investigators in parallel (telemetry, logs, diff) hunt the cause, two testers (perf, security) rule out their domains, Devil\'s Advocate attacks the leading hypothesis, a human decides on rollback, and a writer produces a 5 whys postmortem. Based on Microsoft Magentic-One.',
    whoIs: 'A preset for on-call and SRE teams during P0/P1 production outages. Ideal for live triage, customer-impact regressions, and postmortem generation. Not for planned maintenance, long-term code cleanup, or vague suspicions that "the system seems slow."',
    analogy: 'This preset is like an incident commander\'s war room where three scouts in parallel (radar, satellite, field agent) collect data, a prosecutor attacks the commander\'s theory, and the president decides on rollback.',
    howItWorks: [
      {label: 'Phase 1 - Parallel investigation', desc: 'Three investigators run in parallel: the telemetry surfer reads metrics and traces with reproducible queries, the log analyst hunts error patterns in logs, and the diff investigator analyzes recent deploys and PRs.'},
      {label: 'Phase 2 - Specialist rule-out', desc: 'qa_perf analyzes whether this is a performance regression, qa_security checks if it\'s a security incident. Each rules its domain in or out.'},
      {label: 'Phase 3 - Devil\'s Advocate adversarial', desc: 'Devil\'s Advocate attacks the incident commander\'s leading hypothesis: what if it\'s not the deploy, what if it\'s a downstream service, what if it\'s coincidence. Forces alternative hypotheses.'},
      {label: 'Phase 4 - Rollback HITL and postmortem', desc: 'The decision presenter shows the human the evidence and options (rollback vs hotfix vs monitor). The human signs the decision. The comms officer writes the status page update, the writer writes the postmortem with 5 whys.'}
    ],
    inputs: [
      'Access to production metrics, logs, and traces',
      'List of recent deploys and PRs',
      'Alerts or customer reports',
      'Runbook and on-call contact list'
    ],
    outputs: [
      'Investigation timeline (who did what, when)',
      'Leading theory with counterarguments from Devil\'s Advocate',
      'Rollback decision with rationale',
      'Status page update for customers',
      'Postmortem with 5 whys and action items'
    ],
    does: [
      'Runs 3 investigators in parallel to cut time-to-RCA',
      'Uses reproducible PromQL/LogQL queries',
      'Rules perf and security in or out as domain owners',
      'Forces alternative hypotheses through Devil\'s Advocate',
      'Gives the human the rollback call (high stakes)',
      'Writes the status page update for customers',
      'Generates a postmortem with 5 whys',
      'Creates action items to prevent recurrence'
    ],
    doesNotDo: [
      'Doesn\'t work without access to production observability',
      'Not for planned maintenance work',
      'Doesn\'t do long-term code cleanup',
      'Isn\'t a substitute for a proper incident commander',
      'Doesn\'t fix the outage itself (diagnosis only)',
      'Doesn\'t communicate with press or social media (status page only)',
      'Isn\'t proactive monitoring (reactive only)'
    ],
    antiPatterns: [
      'First Hypothesis Lock-in - the team runs with the first theory without alternatives',
      'Rollback Without Evidence - rollback decision with no proof that the last deploy is the culprit',
      'Silent Status Page - the outage drags on and customers have no idea',
      'Missing Postmortem - the outage ends with no learning for the team',
      'Shallow 5 Whys - stopping at a surface cause instead of the real root cause'
    ],
    keyConcepts: [
      {term: 'MTTR', def: 'Mean Time To Recovery - average time from detection to service restoration.'},
      {term: 'Rollback Window', def: 'Time window in which you can safely roll back the last deploy without losing data.'},
      {term: 'War Room Roles', def: 'Formal roles during an incident: commander, investigator, comms, scribe, executor.'},
      {term: '5 Whys', def: 'Root cause technique that asks "why" five times from symptom down to cause.'},
      {term: 'Magentic-One Pattern', def: 'Microsoft dual-ledger framework (task ledger + progress ledger) for incident response.'}
    ],
    stats: [
      {label: 'Agents', value: '10'},
      {label: 'Phases', value: '4'},
      {label: 'Est. cost', value: '$1.30-3.30'},
      {label: 'Time', value: '15-40 min'}
    ],
    bestFor: [
      'When you have a serious P0/P1 production outage and every minute costs money',
      'When a regression hits customers and you have to decide on rollback',
      'When the outage is over and you need to write a postmortem for leadership'
    ],
    worstFor: [
      'When you don\'t have access to metrics or observability',
      'When it\'s planned maintenance, not an outage',
      'When you need a long-term refactor rather than a fast fix'
    ],
    relatedPresets: ['perf_squad', 'bug_hunt', 'security_multi_vector'],
    glossary: [
      {term: 'MTTR', definition: 'Mean Time To Recovery - average time from detection to repair.'},
      {term: 'rollback', definition: 'Reverting the last deploy to the previous stable version.'},
      {term: '5 whys', definition: 'Root cause analysis technique that asks why five times.'},
      {term: 'postmortem', definition: 'Post-incident report with timeline, root cause, and action items.'},
      {term: 'war room', definition: 'Temporary team of people and systems engaged in incident triage.'}
    ],
    learningQuote: 'Every minute of an outage is money, and a person under pressure bets on the wrong hypothesis - Incident War Room forces three parallel investigations and an adversarial challenge before rollback.',
    realExample: 'Imagine that at 2:30 PM p99 latency alerts start firing above 5 seconds and the support dashboard shows 40 tickets. The telemetry surfer spots a spike in the database connection pool, the log analyst catches 500s in the auth service logs, the diff investigator finds a 2:15 PM deploy that introduces a new middleware. qa_perf confirms it\'s not memory or CPU, qa_security rules out an attack. Devil\'s Advocate attacks the hypothesis: "what if it\'s not the middleware but downstream cache invalidation." The decision presenter shows the human the evidence and the human picks rollback. By 2:45 PM the service is stable, and the writer produces a postmortem with 5 whys and action items.'
  }
