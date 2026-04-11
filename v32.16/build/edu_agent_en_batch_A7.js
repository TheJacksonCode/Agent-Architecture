// Batch: A7 EN translations (gtm_strategist, statistician, eda_analyst, control_mapper, telemetry_surfer)
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
