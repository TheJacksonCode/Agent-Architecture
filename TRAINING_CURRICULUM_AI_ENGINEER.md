# TRAINING CURRICULUM: AI Engineer -- Production LLM Systems & Agent Architectures

**Target Role:** AI Engineer at Michal Ostrowski's team
**Date:** 2026-03-30
**Prepared for:** Jackson
**Purpose:** Map every job requirement to concrete skills, interview prep, and a path from 6.5/10 to 9/10

---

## TABLE OF CONTENTS

1. [Market Context: Salary, Companies, What "Dojrzalosc Inzynierska" Means](#1-market-context)
2. [Area 1: Multi-Agent Workflows](#area-1-multi-agent-workflows)
3. [Area 2: Graph-Based Execution](#area-2-graph-based-execution)
4. [Area 3: Multi-Provider Model Integration](#area-3-multi-provider-model-integration)
5. [Area 4: Security for LLM Systems](#area-4-security-for-llm-systems)
6. [Area 5: Performance Optimization](#area-5-performance-optimization)
7. [Area 6: Production Deployment](#area-6-production-deployment)
8. [Area 7: RAG Systems](#area-7-rag-systems)
9. [Area 8: Cost Optimization](#area-8-cost-optimization)
10. [Area 9: Evaluation and Monitoring](#area-9-evaluation-and-monitoring)
11. [Area 10: Client Deployment](#area-10-client-deployment)
12. [Your Personal Gap Analysis & Priority Map](#personal-gap-analysis)
13. [30/60/90 Day Study Plan](#study-plan)

---

## 1. MARKET CONTEXT

### Salary Range (Poland, 2026)

| Level | B2B Net/Month (PLN) | EUR Equivalent | Notes |
|-------|---------------------|----------------|-------|
| Mid-level AI/ML Engineer | 12,600 -- 19,300 | 2,900 -- 4,500 | Standard ML/DL skills |
| Senior AI Engineer | 24,000 -- 28,500 | 5,500 -- 6,600 | Production LLM experience |
| AI Engineer (LLM/Agent specialist) | 25,000 -- 35,000+ | 5,800 -- 8,100+ | Rare production agent expertise |
| AI Architect / Tech Lead | 30,000 -- 42,000+ | 7,000 -- 9,700+ | Full system design authority |

**Key insight:** Poland is at the top of CEE for generative AI developer pay (~$55,200/year average). The specialist premium for production agent systems is real -- companies pay 30-50% above standard AI/ML rates for engineers who have actually deployed multi-agent systems, not just designed them.

### Companies Hiring Similar Roles in Poland (2026)

- **ITMAGINATION** -- AI consulting, LLM integration projects
- **Allegro** -- Poland's largest e-commerce, heavy ML/LLM investment
- **Google Krakow** -- Largest Google engineering center outside US, ML/AI focus
- **Netguru** -- AI product development, agent-based automation
- **STX Next / Ten Square Games** -- AI-augmented product teams
- **Samsung R&D Poland** -- On-device AI and LLM research
- **Deloitte / McKinsey Poland** -- Enterprise AI transformation
- **Various startups** -- Warsaw/Krakow AI startup ecosystem growing rapidly
- **Remote/B2B** -- Many roles are remote-first for Western European and US companies paying premium rates

### What "Dojrzalosc Inzynierska" (Engineering Maturity) REALLY Means

This is the single most important phrase in the job posting. Here is what the interviewer wants to hear -- and what they are tired of hearing:

**What they WANT to hear:**
- "I have deployed X to production and it handled Y requests with Z reliability"
- "We started with 8 agents and reduced to 3 because we measured the coordination overhead"
- "Our first version had 2-second latency; here is exactly how we got it to 400ms"
- "The system has been running for N months with these metrics"
- "I chose this approach over that one because of these specific tradeoffs"
- "We hit this failure mode in production, and here is how we designed around it"
- Concrete numbers: latency p50/p95/p99, cost per query, error rates, uptime

**What they are TIRED of hearing:**
- "I designed an architecture with 13 agents..." (without running it)
- "I am familiar with LangChain/LangGraph..." (without production deployments)
- "I built a RAG system..." (a notebook demo with 10 documents)
- "I am passionate about AI agents..." (passion without production evidence)
- Theoretical frameworks without metrics
- Name-dropping tools without explaining tradeoffs
- Beautiful diagrams without running code

**The gap they are trying to fill:** They have seen many candidates who can talk about architectures but cannot answer "What happens when your agent is stuck in a loop at 3 AM and costs are spiking?" The word "dojrzalosc" specifically signals they want battle scars, not blueprints.

---

## AREA 1: MULTI-AGENT WORKFLOWS

### What They Are REALLY Asking

"Can you design a system where multiple LLM-powered components collaborate on complex tasks, handle failures gracefully, and not bankrupt us on API costs?"

This is NOT about building the most complex agent graph. It IS about knowing when you need multiple agents vs. a single agent with tools, and being able to justify that decision with evidence.

### Key Concepts to Master

**Frameworks (ranked by production relevance):**
1. **LangGraph** -- The dominant production framework in 2026. Graph-based state machine for agent orchestration. 57% of organizations now have AI agents in production (LangChain State of AI Agents 2025). LangGraph 2.0 (Feb 2026) codifies three years of production patterns.
2. **CrewAI** -- Higher-level abstraction for role-based multi-agent systems. Good for rapid prototyping, less control than LangGraph.
3. **AutoGen (Microsoft)** -- Conversation-based multi-agent framework. Strong for research, maturing for production.
4. **Claude Agent SDK (Anthropic)** -- Native agentic capabilities with tool use. Growing ecosystem.

**Core Patterns:**
- **Supervisor pattern** -- One orchestrator delegates to specialized agents. Simplest, most controllable. START HERE.
- **Hierarchical teams** -- Supervisors managing sub-supervisors. For genuinely complex domains.
- **Collaborative (shared scratchpad)** -- All agents read/write to shared state. Risk of chaos at scale.
- **Handoff chain** -- Sequential pipeline where each agent passes to the next. Predictable but inflexible.
- **Hub-and-spoke** -- Central coordinator with specialist nodes. Good for research + execution separation.

**Critical Engineering Concepts:**
- **State management** -- How agents share context. LangGraph uses typed state objects with reducers.
- **Human-in-the-loop** -- Pausing execution for human approval. LangGraph `interrupt()` and `Command(resume=...)`.
- **Error recovery** -- Per-node retries, timeouts, fallback paths. Not optional in production.
- **Agent minimalism** -- The rule: if an agent has 1-2 tasks in one phase, it should be a FUNCTION, not an AGENT. Production systems (Devin, SWE-agent, OpenHands) solve large problems with 2-5 agents, not 13-15.

### Interview Questions They Will Likely Ask

1. **"When would you use a multi-agent system vs. a single agent with tools?"**
   - Best answer: Single agent covers 80% of use cases. Multi-agent only when you need: (a) fundamentally different model configurations per task, (b) independent scaling of components, (c) tasks that benefit from adversarial/deliberative interaction, (d) isolation for security reasons. Always start with the simplest architecture that works.

2. **"Walk me through how you would design a multi-agent system for [customer support / document processing / code review]."**
   - They want: Requirements analysis first. Agent count justification. State schema design. Error handling. Cost estimate. NOT a 15-agent diagram.

3. **"How do you handle state management between agents?"**
   - Know: LangGraph state with typed dicts, reducers for message accumulation, checkpointing for persistence, serialization considerations.

4. **"What happens when one agent in your pipeline fails?"**
   - Know: Circuit breaker pattern, dead letter queues, graceful degradation, retry with exponential backoff, human escalation triggers.

5. **"How do you prevent infinite loops in agent systems?"**
   - Know: Max iteration limits, token budget caps, state-based loop detection, supervisor oversight, timeout mechanisms.

6. **"Describe a time you had to simplify an over-engineered agent system."**
   - This is specifically probing for engineering maturity. They WANT to hear you reduced complexity.

7. **"How do you test multi-agent systems?"**
   - Know: Unit tests per agent, integration tests for workflows, scenario-based testing, mock LLM responses, deterministic replay.

8. **"What is the coordination overhead of multi-agent systems?"**
   - Know: Each agent call adds latency + cost. 5 agents in sequence = 5x the latency minimum. Communication tokens consume budget. Quantify this.

### What 10/10 Knowledge Looks Like

- Can implement a production LangGraph workflow from scratch with state management, error handling, human-in-the-loop, and persistence
- Has actually measured coordination overhead (latency, cost) and made data-driven decisions to reduce agent count
- Can explain WHY they chose a specific topology (supervisor vs. hierarchical vs. mesh) with tradeoff analysis
- Has battle stories: "We deployed this with 6 agents, discovered the shared state was a bottleneck at 100 concurrent users, refactored to event-driven with checkpointing, reduced p95 latency from 12s to 3s"
- Understands that the LLM is roughly 20% of a production agent system -- the rest is state management, error handling, observability, and tooling

### Common Mistakes Candidates Make

- **Over-engineering**: Proposing 10+ agents for a problem that needs 3. This is the #1 red flag.
- **Ignoring cost**: Not being able to estimate the per-query cost of their agent system
- **No failure modes**: Describing only the happy path
- **Framework worship**: "I would use LangGraph because it is popular" instead of explaining the architectural reasoning
- **No metrics**: Cannot quote latency, throughput, or error rates from any system they have built

---

## AREA 2: GRAPH-BASED EXECUTION

### What They Are REALLY Asking

"Do you understand why we model agent workflows as graphs instead of linear pipelines, and can you implement the right execution topology for the problem?"

### Key Concepts to Master

**Why Graphs Over Pipelines:**
- Pipelines are linear: A -> B -> C. Simple but cannot handle branching, loops, or conditional paths.
- Graphs enable: conditional branching (route to different agents based on classification), cycles (retry/refine loops), parallel execution (fan-out to multiple agents simultaneously), dynamic routing (runtime decisions about next steps).
- DAGs (Directed Acyclic Graphs) are the sweet spot for most production use cases -- directed flow without infinite loops.
- Cyclic graphs are needed for iterative refinement (write code -> test -> fix -> test again) but require explicit termination conditions.

**LangGraph Specifics:**
- **StateGraph**: Core abstraction. Nodes are functions/agents, edges define transitions.
- **Conditional edges**: `add_conditional_edges()` for runtime routing based on state.
- **START and END nodes**: Explicit entry and exit points.
- **Reducers**: How state updates are merged (e.g., `operator.add` for message lists, custom reducers for complex state).
- **Checkpointing**: Save/restore execution state for persistence, human-in-the-loop, and crash recovery. Backends: MemorySaver (dev), SqliteSaver, PostgresSaver (production).
- **Subgraphs**: Nested graphs for modular design. Each subgraph can be tested independently.
- **Send API**: Dynamic fan-out for parallel execution of variable number of tasks.

**Orchestration Patterns:**
- **Router pattern**: Classify input, route to specialized handler. Cheapest, fastest.
- **Orchestrator-worker**: Central orchestrator breaks task into subtasks, distributes to workers, aggregates results.
- **Evaluator-optimizer loop**: Generate -> Evaluate -> Improve cycle with explicit exit criteria.
- **Parallelization**: Fan-out to multiple nodes, fan-in to aggregate. Reduces wall-clock time.

### Interview Questions They Will Likely Ask

1. **"Why use a graph-based approach instead of a simple sequential pipeline?"**
   - Answer: Branching, parallel execution, conditional routing, iterative loops, human-in-the-loop interrupts, crash recovery via checkpointing. Linear pipelines cannot express these.

2. **"Explain the difference between DAGs and cyclic graphs in agent workflows. When would you use each?"**
   - DAGs: Deterministic, easier to reason about, no risk of infinite loops. Use for document processing, classification pipelines, one-shot analysis.
   - Cyclic: Needed for iterative refinement, self-correction, and agent reflection. Use for code generation (write -> test -> fix), iterative research, quality improvement loops. Always with explicit termination conditions.

3. **"How would you implement parallel execution of 10 tasks in LangGraph?"**
   - Know: `Send()` API for dynamic fan-out, `add_node` for each worker, fan-in aggregation node with reducer.

4. **"How do you handle checkpointing and crash recovery?"**
   - Know: LangGraph checkpointers, PostgresSaver for production, thread-based execution with checkpoint IDs, replaying from last checkpoint after failure.

5. **"Design a graph for a document processing pipeline that classifies, extracts entities, validates, and routes to different post-processing based on document type."**
   - They want to see you draw a graph with conditional edges, parallel paths where appropriate, error handling nodes, and human review for low-confidence classifications.

### What 10/10 Knowledge Looks Like

- Can whiteboard a StateGraph with conditional edges, parallel branches, cycles with termination conditions, and human-in-the-loop interrupts
- Understands checkpointing deeply: serialization formats, storage backends, replay semantics, versioning when graph structure changes
- Has implemented subgraphs for modularity and tested them independently
- Can explain the execution model: how LangGraph schedules nodes, how state flows through the graph, how reducers work
- Knows when NOT to use a graph -- simple tool-calling agents do not need graph orchestration

### Common Mistakes Candidates Make

- **Graph for everything**: Using LangGraph for a simple tool-calling agent that does not need it
- **No termination conditions**: Creating cycles without max iterations or convergence checks
- **Ignoring state size**: State grows with every node execution; not managing this leads to context window overflow
- **Not understanding reducers**: Default state overwrite vs. append behavior causes subtle bugs
- **Skipping checkpointing**: "We will add persistence later" -- in production, you need it from day one

---

## AREA 3: MULTI-PROVIDER MODEL INTEGRATION

### What They Are REALLY Asking

"Can you build a system that is not locked into one LLM provider, can gracefully fall back when providers have outages, and intelligently routes requests to the right model for the task?"

### Key Concepts to Master

**Abstraction Layer Tools:**
1. **LiteLLM** -- Open-source, unified OpenAI-compatible interface to 100+ providers. 33,000+ GitHub stars. Supports routing, retries, fallbacks, spend tracking. BUT: known performance issues at scale (memory leaks, latency overhead). Good for starting, may need replacement at high scale.
2. **Bifrost (Maxim AI)** -- 50x faster than LiteLLM, 11 microsecond overhead at 5K RPS. Production-focused.
3. **Portkey** -- Enterprise-grade with observability and governance features.
4. **OpenRouter** -- Managed multi-model access with unified billing.
5. **Custom abstraction** -- For maximum control. Implement the OpenAI-compatible interface yourself with provider adapters.

**Routing Strategies:**
- **Complexity-based routing**: Classify query complexity, route simple queries to cheap/fast models (GPT-4o-mini, Claude Haiku), complex queries to frontier models (GPT-5, Claude Opus). 70% budget, 20% mid-tier, 10% premium = 60-80% cost reduction.
- **Task-based routing**: Different models for different capabilities (coding vs. creative writing vs. analysis).
- **Latency-based routing**: Route to the provider with lowest current latency.
- **Cost-based routing**: Always cheapest available model that meets quality threshold.
- **Geographic routing**: Route to provider with data center closest to user / compliant with data sovereignty.

**Fallback Strategies:**
- **Prioritized list**: Primary -> Secondary -> Tertiary provider with automatic failover.
- **Cooldown periods**: After N failures, remove provider from rotation for M seconds.
- **Capability-aware fallback**: If primary model supports function calling but fallback does not, gracefully degrade features.
- **Circuit breaker pattern**: Open circuit after threshold failures, half-open for periodic health checks.

**Key Decision Triggers:**
- Error codes: 429 (rate limit), 5xx (server error), provider-specific faults
- Timeout: Switch after tight threshold matching your SLO (e.g., 5s for interactive, 30s for batch)
- Capability gaps: Model does not support required features (vision, tool use, JSON mode)

**Production Considerations:**
- 37% of enterprises use 5+ models in production (Gartner 2025)
- Provider API differences: response formats, streaming behavior, token counting, rate limits
- Model versioning: Handle model deprecation gracefully
- Spend tracking: Per-key, per-model, per-team token usage and cost

### Interview Questions They Will Likely Ask

1. **"How would you design a model abstraction layer that supports multiple providers?"**
   - Interface design: Unified request/response format (OpenAI-compatible is the de facto standard). Provider adapters. Retry/fallback logic. Observability hooks. Spend tracking.

2. **"What happens when OpenAI goes down at 3 AM?"**
   - Automatic fallback to Anthropic/Google. Alert to on-call. Degraded but functional service. No manual intervention needed. Log the incident for post-mortem.

3. **"How do you route requests to different models?"**
   - Classifier (can be a small model or rule-based) determines complexity/task type. Routing table maps to model. A/B testing for quality comparison. Cost tracking per route.

4. **"How do you handle different context window sizes across providers?"**
   - Truncation strategies, chunking, context compression, model-specific limits in routing config.

5. **"How do you test across multiple providers?"**
   - Provider-specific integration tests, mock providers for unit tests, canary deployments when switching models, evaluation suites that run across all supported models.

6. **"How do you prevent vendor lock-in?"**
   - Abstraction layer, provider-agnostic prompt templates, no provider-specific features in core logic (or feature flags for them), regular multi-provider eval runs.

### What 10/10 Knowledge Looks Like

- Has built and operated a multi-provider system with automatic failover in production
- Can quote failover times, fallback success rates, and cost differences across providers
- Understands the subtle differences: streaming chunk formats, tool call schemas, token counting discrepancies between providers
- Has implemented intelligent routing that reduced costs by a quantifiable percentage
- Can discuss model evaluation across providers: same prompts, different models, quality comparison

### Common Mistakes Candidates Make

- **"Just use LiteLLM"**: Without understanding its limitations at scale or alternatives
- **No fallback testing**: Never actually tested what happens during a provider outage
- **Ignoring model differences**: Assuming all models behave identically behind an abstraction layer
- **No cost tracking**: Cannot tell you how much each provider costs per 1K requests
- **Over-abstracting**: Building a complex abstraction layer when you only use one provider

---

## AREA 4: SECURITY FOR LLM SYSTEMS

### What They Are REALLY Asking

"Do you know how LLM systems get hacked, and can you build defenses that work in production without destroying the user experience?"

### Key Concepts to Master

**OWASP Top 10 for LLMs 2025 (MUST KNOW ALL 10):**

| # | Risk | One-line Description |
|---|------|---------------------|
| LLM01 | **Prompt Injection** | Attacker manipulates LLM inputs to override instructions. #1 risk. |
| LLM02 | **Sensitive Information Disclosure** | LLM exposes private data in responses. |
| LLM03 | **Supply Chain Vulnerabilities** | Compromised third-party models, datasets, or plugins. |
| LLM04 | **Data and Model Poisoning** | Malicious data injected during training/fine-tuning. |
| LLM05 | **Improper Output Handling** | Unsanitized outputs trigger XSS, SSRF, code execution. |
| LLM06 | **Excessive Agency** | LLM has too many permissions, performs unintended actions. |
| LLM07 | **System Prompt Leakage** | Attackers extract hidden system prompts. |
| LLM08 | **Vector and Embedding Weaknesses** | Data leakage or poisoning in RAG vector stores. |
| LLM09 | **Misinformation** | LLM generates false or harmful information. |
| LLM10 | **Unbounded Consumption** | Unregulated usage leads to denial-of-wallet attacks. |

**Defense Patterns:**

1. **Prompt Injection Defense (CRITICAL):**
   - Input sanitization and validation
   - Separate system/user message channels (never concatenate)
   - Output filtering and pattern detection
   - Canary tokens in system prompts to detect leakage
   - Instruction hierarchy (system > user > tool results)
   - Multimodal risks: hidden instructions in images

2. **Policy Engine Pattern:**
   - Sits between LLM proposed actions and actual execution
   - Every action passes through: permission check, budget check, approval requirements
   - Allowlist of permitted tool calls per agent/user role
   - Rate limiting per user, per session, per action type

3. **Data Leakage Prevention:**
   - PII detection and redaction in inputs and outputs
   - Separate data access layers with role-based access control
   - Audit logging of all LLM interactions
   - Data classification and handling policies

4. **Secure Agent Design:**
   - Principle of least privilege: each agent gets minimum necessary permissions
   - Sandboxed tool execution (especially code execution)
   - Human-in-the-loop for high-impact actions
   - Inter-agent validation (agents verify each other's outputs)
   - Rate limiting on agent actions
   - Audit trail for all agent decisions

### Interview Questions They Will Likely Ask

1. **"What is prompt injection and how do you defend against it?"**
   - Know: Direct vs. indirect injection. Direct: user crafts input to override system prompt. Indirect: malicious content in retrieved documents/tools manipulates the LLM. Defense: input validation, output filtering, instruction hierarchy, sandboxed execution, content moderation middleware.

2. **"How do you prevent your LLM system from leaking sensitive data?"**
   - Know: PII detection (regex + NER models), output filtering, data access controls, prompt design (never include raw sensitive data in context), redaction pipelines, audit logging.

3. **"What is excessive agency and how do you mitigate it?"**
   - Know: LLM with too many tools/permissions. Mitigation: least privilege, allowlists, confirmation for destructive actions, token/cost budgets, kill switches.

4. **"How would you implement a security review for an LLM system?"**
   - Know: Red teaming, prompt injection testing (promptfoo, DeepTeam), OWASP LLM guidelines, automated scanning, penetration testing, regular security audits.

5. **"Describe your approach to securing a multi-agent system."**
   - Know: Per-agent permission boundaries, inter-agent authentication, shared state access controls, audit logging per agent, circuit breakers, human escalation for anomalies.

6. **"What is a denial-of-wallet attack?"**
   - Know: Attacker triggers expensive LLM operations to drain API budget. Defense: per-user rate limits, token budgets, anomaly detection on spending, circuit breakers on cost.

7. **"How do you handle the EU AI Act requirements?"**
   - Know: Transparency obligations, content labeling, risk classification, human oversight requirements. Full application August 2026.

### What 10/10 Knowledge Looks Like

- Can recite OWASP LLM Top 10 and explain each with production examples
- Has implemented prompt injection defenses and tested them with red teaming
- Can design a policy engine from scratch: permission model, budget enforcement, audit logging
- Understands multimodal attack vectors (hidden instructions in images, encoded text in PDFs)
- Has production metrics on security: blocked injection attempts, false positive rates, response to incidents
- Knows the EU AI Act timeline and its implications for LLM deployments

### Common Mistakes Candidates Make

- **"We just filter bad words"**: Security theater, not real defense
- **Ignoring indirect injection**: Only thinking about user input, not retrieved documents or tool outputs
- **No audit logging**: Cannot reconstruct what the system did and why
- **Over-trusting the LLM**: "The model is smart enough to not follow malicious instructions" -- it is not
- **Security as afterthought**: "We will add security later" -- security must be designed in from the start

---

## AREA 5: PERFORMANCE OPTIMIZATION

### What They Are REALLY Asking

"Can you make LLM systems fast enough for interactive use, handle real traffic volumes, and optimize the inference pipeline end-to-end?"

### Key Concepts to Master

**Latency Optimization:**
- **Streaming**: Send tokens as they are generated. Perceived latency drops from seconds to milliseconds for first token. SSE (Server-Sent Events) for HTTP, WebSockets for bidirectional.
- **Speculative decoding**: Use small draft model to predict tokens, verify with large model in parallel. 2-3x speedup for appropriate workloads.
- **Prompt caching**: Store frequently used system prompts server-side. OpenAI: 50% savings on cached reads. Anthropic: 90% savings (10% of base input price for cache hits).
- **KV cache optimization**: PagedAttention (vLLM) manages KV cache like virtual memory pages, reducing fragmentation, enabling more concurrent requests.
- **Disaggregated prefill/decode**: Separate compute-intensive prefill phase from memory-bandwidth-intensive decode phase onto different hardware/scheduling.

**Throughput Optimization:**
- **Batching**: Group multiple requests for efficient GPU utilization. Dynamic batching in vLLM/TensorRT-LLM.
- **Continuous batching**: Add new requests to running batch without waiting for longest sequence to complete.
- **Quantization**: Reduce model precision (FP16 -> INT8 -> INT4). Trade quality for speed/memory. GPTQ, AWQ, GGUF formats.
- **Model parallelism**: Tensor parallel (split layers across GPUs) and pipeline parallel (split model stages across GPUs).

**Caching Strategies:**
- **Exact match cache**: Hash prompt + params, return cached response. Good for deterministic queries.
- **Semantic cache**: Embed query, find similar cached queries above threshold, return cached response. Redis + vector similarity. ~73% cost reduction in high-repetition workloads.
- **Hierarchical caching**: L1 (in-memory, exact match) -> L2 (Redis, semantic) -> L3 (disk, historical).

**Inference Engines:**
- **vLLM**: Open-source, PagedAttention, continuous batching, disaggregated prefill/decode. Production standard for self-hosted models.
- **TensorRT-LLM (NVIDIA)**: Maximum performance on NVIDIA GPUs, complex setup.
- **Ollama / llama.cpp**: Local inference, good for development and edge deployment.

### Interview Questions They Will Likely Ask

1. **"How do you reduce latency in an LLM-powered application?"**
   - Streaming, prompt caching, semantic caching, model selection (smaller model for simple tasks), parallel tool calls, pre-computation of common queries, connection pooling.

2. **"Explain the difference between latency and throughput optimization."**
   - Latency: Time for single request. Optimize with streaming, caching, smaller models, speculative decoding.
   - Throughput: Requests per second. Optimize with batching, horizontal scaling, efficient GPU utilization, queue management.

3. **"How would you handle 1000 concurrent users on an LLM system?"**
   - Rate limiting, request queuing, auto-scaling, semantic caching, model routing (simple queries to fast models), streaming responses, load balancing across inference instances.

4. **"What is PagedAttention and why does it matter?"**
   - Know: KV cache memory management using virtual memory paging. Reduces memory fragmentation. Allows more concurrent requests from same VRAM. Core innovation of vLLM.

5. **"How do you benchmark LLM system performance?"**
   - Metrics: TTFT (time to first token), TPS (tokens per second), p50/p95/p99 latency, throughput (requests/sec), GPU utilization, memory usage. Tools: LiteLLM benchmarks, custom load tests.

6. **"What tradeoffs do you make between quality and performance?"**
   - Quantization reduces quality slightly. Smaller models are faster but less capable. Caching returns stale responses. Truncated context loses information. Each tradeoff should be measured with eval suite.

### What 10/10 Knowledge Looks Like

- Can quote specific latency numbers: "GPT-4o TTFT is ~200ms, streaming output at ~80 tokens/sec. With semantic caching, 40% of requests return in <50ms."
- Has operated vLLM in production, tuned PagedAttention, configured batching parameters
- Can design a caching hierarchy with hit rate targets and invalidation strategies
- Understands GPU memory math: model size in bytes, KV cache per token, max concurrent sequences
- Has measured the actual impact of optimizations: "Semantic caching reduced our p95 from 3.2s to 1.1s with 73% hit rate"
- Stripe achieved 73% inference cost reduction via vLLM migration -- knows such case studies

### Common Mistakes Candidates Make

- **"Just use a bigger GPU"**: Throwing hardware at problems instead of optimizing
- **No streaming**: Building request/response systems when streaming is essential for UX
- **Ignoring cache invalidation**: "We cache everything" without expiry/invalidation strategy
- **Not measuring**: Cannot quote specific latency numbers for their system
- **Premature optimization**: Optimizing before identifying the actual bottleneck

---

## AREA 6: PRODUCTION DEPLOYMENT

### What They Are REALLY Asking

"Can you take an LLM system from a notebook to a production service that runs 24/7 with monitoring, rollback, and on-call support?"

### Key Concepts to Master

**Containerization:**
- Docker: Multi-stage builds for LLM apps, GPU passthrough (`--gpus all`), model caching in volumes, health checks.
- Docker Compose: For local development with multiple services (API, vector DB, cache, monitoring).
- Best practices: Small images, non-root users, secrets management (not in images), reproducible builds.

**Orchestration:**
- Kubernetes: Deployments, Services, ConfigMaps, Secrets, HPA (Horizontal Pod Autoscaler).
- GPU scheduling: NVIDIA device plugin, node selectors, resource requests/limits for GPU.
- KServe / Seldon: ML-specific serving on K8s with canary deployments, A/B testing, auto-scaling.
- Helm charts: Templated K8s manifests for repeatable deployments.

**CI/CD for LLM Systems:**
- Model versioning: Track model + prompt + config as a deployable unit.
- Evaluation gates: Automated eval suite must pass before promotion to production.
- Canary deployments: Route 5% of traffic to new version, monitor metrics, promote or rollback.
- Blue/green deployments: Run old and new version simultaneously, instant switchover.
- Rollback strategy: Always be able to revert to previous model + prompt version in <5 minutes.

**Monitoring Stack:**
- **Application metrics**: Latency (p50/p95/p99), throughput, error rate, token usage, cost per request.
- **LLM-specific metrics**: Hallucination rate, relevance scores, user satisfaction, safety violations.
- **Infrastructure metrics**: GPU utilization, memory usage, queue depth, cache hit rate.
- **Tools**: Prometheus + Grafana (infra), Langfuse / Arize / LangSmith (LLM observability), PagerDuty/OpsGenie (alerting).

**Logging and Tracing:**
- Structured logging: Every LLM call logged with prompt hash, model, latency, tokens, cost.
- Distributed tracing: Trace a request through the entire agent pipeline. OpenTelemetry.
- Log retention: Compliance requirements, debugging historical issues.

### Interview Questions They Will Likely Ask

1. **"Walk me through deploying an LLM system from development to production."**
   - Containerize -> Write evaluation suite -> CI/CD pipeline -> Staging deployment -> Eval gate -> Canary to production -> Monitor -> Full rollout or rollback.

2. **"How do you handle rollbacks for LLM systems?"**
   - Version the entire deployment unit (model version + prompt version + config). Blue/green allows instant switchover. Feature flags for gradual changes. Automated rollback triggers on quality metrics.

3. **"What metrics do you monitor for an LLM system in production?"**
   - Latency (TTFT, total), error rates, token usage, cost, quality scores (LLM-as-judge), user feedback, safety violations, cache hit rates, GPU utilization.

4. **"How do you handle auto-scaling for an LLM service?"**
   - HPA based on request queue depth (not CPU -- LLM workloads are GPU-bound). Custom metrics with KEDA. Pre-scaling for predictable traffic patterns. Scale-to-zero for cost optimization.

5. **"What is your approach to A/B testing LLM changes?"**
   - Route percentage of traffic to variant. Compare quality metrics (not just latency/errors). Statistical significance requirements. User-level consistency (same user sees same variant). Track long-term metrics, not just immediate response quality.

6. **"How do you handle secrets management for API keys across multiple LLM providers?"**
   - K8s Secrets, HashiCorp Vault, AWS Secrets Manager. Never in code, never in images. Rotation policies. Least privilege per service.

### What 10/10 Knowledge Looks Like

- Has built a full CI/CD pipeline for an LLM system with eval gates and canary deployments
- Can explain their monitoring stack in detail: what metrics, what thresholds trigger alerts, what the on-call runbook looks like
- Has performed production rollbacks and can describe the process and what they learned
- Understands the GPU scheduling constraints in K8s: device plugins, topology, fractional GPUs
- Can design a deployment pipeline that goes from code commit to production in under 30 minutes with proper safety gates
- Knows that ZenML's research shows what works across 1,200+ production LLM deployments

### Common Mistakes Candidates Make

- **"We deploy manually"**: No CI/CD, no eval gates, no automated rollback
- **No monitoring**: "We check the logs when users complain"
- **Ignoring LLM-specific metrics**: Only monitoring standard web app metrics, missing quality drift
- **No rollback plan**: Cannot revert to previous version quickly
- **Treating LLM apps like regular web apps**: Ignoring GPU constraints, model loading times, cold start issues

---

## AREA 7: RAG SYSTEMS

### What They Are REALLY Asking

"Can you build a retrieval system that actually gives good answers from our documents, at scale, with measurable quality?"

### Key Concepts to Master

**The RAG Pipeline:**
1. **Ingestion**: Document loading -> Parsing -> Chunking -> Embedding -> Indexing
2. **Retrieval**: Query embedding -> Similarity search -> Re-ranking -> Context assembly
3. **Generation**: Retrieved context + query -> LLM -> Response

**Chunking Strategies (KEY FINDING FOR 2026):**

The 2026 RAG Performance Paradox: Simpler chunking strategies are outperforming complex AI-driven methods.

- **Recursive character splitting at 512 tokens** achieves the highest answer accuracy and retrieval F1 -- consistently outperforming semantic chunking.
- **Practical defaults**: 256-512 tokens for factoid queries; 512-1024 for analytical/multi-hop queries. Start at 512 with 10-20% overlap.
- **Late chunking (Jina AI)**: Process full document through transformer before splitting. Each chunk carries full-document context. Promising but computationally expensive.
- **80% of RAG failures trace to ingestion/chunking, not the LLM.** This is the single most important insight.

**Embedding Models:**
- OpenAI `text-embedding-3-large` (3072 dimensions, best quality)
- Cohere Embed v3 (multilingual, good for Polish content)
- Open-source: BGE, E5, Jina Embeddings v3
- Dimension reduction: Matryoshka embeddings allow using fewer dimensions with minimal quality loss

**Vector Databases:**
- **Pinecone**: Managed, simple, expensive at scale
- **Weaviate**: Open-source, rich query language, hybrid search
- **Qdrant**: Open-source, Rust-based, fast, good filtering
- **pgvector**: PostgreSQL extension, good when you already use Postgres, lower performance ceiling
- **Chroma**: Lightweight, good for prototyping

**Advanced RAG Patterns:**
- **Hybrid search**: Combine vector similarity with keyword search (BM25). Better for exact terms, names, codes.
- **Re-ranking**: After initial retrieval, use a cross-encoder model to re-rank results by relevance. Cohere Rerank, cross-encoder models.
- **Query transformation**: Rewrite user query for better retrieval. HyDE (Hypothetical Document Embeddings), multi-query decomposition.
- **Agentic RAG**: Agent decides WHICH retrieval strategy to use, can iterate, can ask clarifying questions.
- **Contextual retrieval (Anthropic)**: Prepend document-level context to each chunk before embedding.

**Evaluation (RAGAS framework):**
- **Faithfulness**: Is the answer supported by the retrieved context?
- **Answer relevance**: Does the answer address the question?
- **Context precision**: Are the retrieved chunks relevant to the question?
- **Context recall**: Were all necessary chunks retrieved?
- 60% of RAG deployments in 2026 include systematic evaluation from day one (up from 30% in early 2025).

### Interview Questions They Will Likely Ask

1. **"Walk me through designing a RAG system for a client's internal documents."**
   - Requirements gathering (document types, query patterns, latency requirements, scale). Chunking strategy (start with 512 recursive, measure). Embedding model selection (consider multilingual for Polish). Vector DB selection (managed vs. self-hosted). Retrieval pipeline (hybrid search + re-ranking). Evaluation setup (RAGAS metrics). Iterative improvement based on metrics.

2. **"Why do RAG systems fail?"**
   - 80% of failures are in ingestion/chunking. Poor chunk boundaries. Wrong chunk size. Missing metadata. Bad embedding model for the domain. No re-ranking. No evaluation pipeline. Stale documents.

3. **"How do you evaluate RAG quality?"**
   - RAGAS: faithfulness, relevance, context precision/recall. Human evaluation for edge cases. LLM-as-judge for scale. A/B testing with user metrics. Regression testing when changing any component.

4. **"Semantic chunking vs. fixed-size chunking -- which do you prefer?"**
   - TRAP QUESTION. The data shows fixed-size (recursive character splitting at 512 tokens) consistently outperforms semantic chunking on standard benchmarks. Start simple, measure, only add complexity if data justifies it.

5. **"How do you handle documents in Polish?"**
   - Multilingual embedding models (Cohere Embed v3, multilingual E5). Test retrieval quality in Polish specifically. Consider Polish-specific tokenization. Language-aware chunking for compound sentences.

6. **"How do you keep RAG content up to date?"**
   - Incremental ingestion pipeline. Document change detection. Re-embedding only changed chunks. TTL on embeddings. Metadata-based filtering for temporal relevance.

7. **"How do you handle multi-modal documents (PDFs with tables, images, charts)?"**
   - Document parsing: Unstructured, LlamaParse, Docling. Table extraction. Image description with vision models. Structured metadata preservation.

### What 10/10 Knowledge Looks Like

- Can build a full RAG pipeline from scratch with chunking, embedding, retrieval, re-ranking, and generation
- Has measured RAGAS metrics on a real system and iteratively improved them
- Knows the 2026 benchmarks: simple chunking beats complex methods in most cases
- Can discuss hybrid search implementation details: BM25 + vector with score fusion
- Has experience with production RAG at scale: millions of documents, concurrent users, freshness requirements
- Understands the cost math: embedding cost per document, storage cost, retrieval latency at scale

### Common Mistakes Candidates Make

- **"I used semantic chunking because it sounds smarter"**: Without benchmarking against simple approaches
- **No evaluation**: "It looks good" instead of RAGAS metrics
- **Ignoring re-ranking**: Using raw vector similarity results without re-ranking loses significant quality
- **One-size-fits-all chunking**: Same chunk size for PDFs, code, emails, legal documents
- **Not testing retrieval separately from generation**: Cannot tell if poor answers are from bad retrieval or bad generation

---

## AREA 8: COST OPTIMIZATION

### What They Are REALLY Asking

"Can you build an LLM system that does not burn through $50K/month in API costs, and can you predict and control costs?"

### Key Concepts to Master

**The Cost Hierarchy (highest to lowest impact):**

1. **Model routing** (60-80% savings): Route 70% of queries to budget models, 20% mid-tier, 10% premium. A task on a frontier reasoning model costs 190x more than on a fast small model. This is the SINGLE HIGHEST-LEVERAGE cost lever.

2. **Prompt caching** (70-90% savings on cached portion): OpenAI GPT-5 family: 90% savings on cached reads. Anthropic: 10% of base input price for cache hits. This is essentially free money for systems with repeated system prompts.

3. **Semantic caching** (~73% reduction in high-repetition workloads): Store query embeddings + responses. Return cached for semantically similar queries. Implement with Redis + vector similarity.

4. **Prompt optimization** (20-50% savings): Shorter prompts = fewer input tokens. Remove redundant instructions. Use structured output schemas. Compress context with summarization.

5. **Token budget management**: Set per-request, per-user, per-session budgets. Truncate or reject when approaching limits. Monitor and alert on budget consumption.

6. **Batch processing**: Non-real-time tasks processed in batches at lower per-token rates. OpenAI Batch API: 50% cost reduction for async workloads.

**Cost Tracking and Prediction:**
- Per-request cost logging (model + input tokens + output tokens + price)
- Per-user and per-team cost allocation
- Budget alerts and circuit breakers
- Monthly cost projections based on growth trends
- Cost per query as a primary business metric

**FinOps for AI:**
- Token economics: Understand the cost structure (input tokens vs. output tokens vs. cached tokens)
- Agent systems amplify costs: Each agent call = separate LLM call. 5-agent workflow = 5x+ the cost of single call.
- Teams that implement continuous optimization find 10-20% additional savings quarterly

### Interview Questions They Will Likely Ask

1. **"How would you reduce LLM costs by 80%?"**
   - Model routing (60-80% alone), prompt caching (70-90% on cached), semantic caching (73% for repetitive queries), prompt optimization, batch processing for async work. Combined techniques achieving 80%+ is well-documented.

2. **"How do you estimate the cost of a multi-agent system?"**
   - Count agent calls per workflow execution. Estimate tokens per call (input + output). Multiply by model price. Add retrieval costs, embedding costs, infrastructure costs. Multiply by expected daily volume. Add 30% buffer.

3. **"How do you prevent cost spikes?"**
   - Per-user rate limits, per-request token budgets, circuit breakers on spend thresholds, anomaly detection on cost metrics, kill switches for runaway processes.

4. **"What is the tradeoff between cost and quality?"**
   - Cheaper models produce lower quality for complex tasks but are often equivalent for simple tasks. The key is measuring quality per model on YOUR tasks, not benchmarks. Implement routing with quality gates: if cheap model's answer confidence is below threshold, escalate to premium model.

5. **"Denial-of-wallet attack -- what is it and how do you prevent it?"**
   - Attacker crafts inputs that trigger maximum token generation or expensive tool calls. Defense: per-user budgets, max output token limits, input validation, rate limiting, anomaly detection.

### What 10/10 Knowledge Looks Like

- Can estimate cost per query for any multi-agent pipeline to within 20% accuracy
- Has implemented model routing that reduced costs by a measurable percentage
- Runs cost dashboards with per-user, per-feature, per-model breakdowns
- Can calculate ROI of an LLM feature: cost of implementation + ongoing API costs vs. business value
- Understands the full cost picture: API costs + infrastructure + embedding/storage + engineer time

### Common Mistakes Candidates Make

- **No cost awareness**: Cannot estimate cost per query for their own system
- **"Cost does not matter yet"**: It always matters. Design for cost efficiency from the start.
- **Ignoring the amplification effect**: Multi-agent systems multiply costs. Not accounting for this.
- **No budgets or limits**: Running without guardrails on spend
- **Optimizing the wrong thing**: Reducing prompt tokens by 10% when model routing could save 80%

---

## AREA 9: EVALUATION AND MONITORING

### What They Are REALLY Asking

"How do you know your LLM system is working well, and how do you detect when it starts failing?"

### Key Concepts to Master

**Evaluation Methods:**
1. **LLM-as-Judge**: Use a strong model (GPT-4, Claude Opus) to evaluate another model's output on criteria (relevance, faithfulness, helpfulness, safety). Scalable, correlates with human judgment (~80%). Biases: position bias, verbosity bias, self-enhancement bias.
2. **Human evaluation**: Gold standard but expensive and slow. Use for calibrating LLM-as-judge, edge cases, and periodic audits.
3. **Automated metrics**: BLEU, ROUGE (outdated for LLMs), BERTScore (better), custom task-specific metrics.
4. **RAGAS**: RAG-specific evaluation framework (faithfulness, relevance, context precision/recall).
5. **Behavioral testing**: Test specific behaviors and capabilities with curated test sets. CheckList methodology.

**Monitoring in Production:**
- **Quality metrics**: Faithfulness, relevance, safety scores on sampled production traffic.
- **Operational metrics**: Latency, throughput, error rate, token usage, cost.
- **Drift detection**: LLMs are non-deterministic. Quality can degrade silently as models update, prompts change, or user behavior shifts.
  - **Output drift**: Statistical change in response characteristics over time.
  - **Input drift**: Change in query distribution (new topics, new user behavior).
  - **Model drift**: Provider updates their model, changing behavior without your code changing.
- **Alerting**: Automated alerts on quality metric degradation, cost spikes, latency increases, error rate spikes.

**Leading Platforms (2026):**
- **Confident AI / DeepEval**: 50+ evaluation metrics, drift monitoring
- **Langfuse**: Open-source, tracing, evaluation, analytics
- **Arize AI / Phoenix**: Drift detection, embeddings analysis, tracing
- **LangSmith**: LangChain native, evaluation, monitoring, datasets
- **Helicone**: Production-grade observability, cost tracking

**Evaluation Pipeline Design:**
- **Offline evaluation**: Before deployment. Test sets, benchmark suites, regression tests. Must pass to deploy.
- **Online evaluation**: In production. Sample traffic, run LLM-as-judge, track scores over time.
- **Feedback loop**: Production insights feed back to improve prompts, fine-tuning data, and evaluation criteria.

### Interview Questions They Will Likely Ask

1. **"How do you evaluate the quality of an LLM system?"**
   - Multi-layered: Offline eval suite (behavioral tests, benchmark), Online eval (LLM-as-judge on sampled production traffic), Human eval (periodic calibration), User feedback (implicit + explicit).

2. **"What is LLM-as-judge and what are its limitations?"**
   - Strong model evaluates weaker model. Scalable, 80% correlation with humans. Limitations: position bias, verbosity bias, self-enhancement, struggles with domain-specific quality, expensive for high-volume evaluation.

3. **"How do you detect quality degradation in production?"**
   - Continuous evaluation of sampled traffic. Statistical process control on quality scores. Drift detection on output characteristics. Automated alerts on metric degradation. A/B comparison between versions.

4. **"What happens when the LLM provider updates their model?"**
   - Run eval suite against new version. Compare quality metrics. If degradation detected, alert and potentially roll back to pinned version (if available). This is why evaluation suites are essential.

5. **"How do you build an evaluation dataset?"**
   - Start with seed examples from domain experts. Augment with production examples (diverse, edge cases). Include adversarial examples. Version control the dataset. Expand over time based on failure modes discovered in production.

6. **"How do you measure hallucination rate?"**
   - Faithfulness metric: Does the response contain claims not supported by the provided context? LLM-as-judge with citation verification. Cross-reference with source documents. Track over time.

### What 10/10 Knowledge Looks Like

- Has built an evaluation pipeline with offline tests, online monitoring, and human calibration
- Can show dashboards with quality metrics trending over time
- Has caught and resolved quality degradation in production using monitoring
- Understands the biases of LLM-as-judge and how to mitigate them
- Can design an eval suite for a new domain from scratch, including adversarial examples
- Uses evaluation metrics as deployment gates: code does not ship if eval scores drop

### Common Mistakes Candidates Make

- **No evaluation at all**: "It looks good to me" -- subjective assessment is not evaluation
- **Only offline evaluation**: Never checking quality in production
- **Ignoring drift**: "The model has not changed so quality is stable" -- user behavior changes too
- **Over-trusting LLM-as-judge**: Not calibrating with human evaluation
- **No versioning of eval datasets**: Cannot reproduce evaluation results

---

## AREA 10: CLIENT DEPLOYMENT

### What They Are REALLY Asking

"Can you deploy an LLM system in a client's environment, respecting their security, compliance, and infrastructure constraints?"

### Key Concepts to Master

**Deployment Models:**
1. **Cloud (SaaS)**: You host, client accesses via API. Fastest to deploy. Client concerns: data leaves their environment.
2. **Private cloud (dedicated)**: You deploy in client's cloud account (AWS, Azure, GCP). Data stays in their cloud. They control network, access.
3. **On-premise**: Deploy in client's physical data center. Full data sovereignty. Most complex. Requires air-gap capable designs.
4. **Hybrid**: Orchestration on client's infra, model calls to external APIs. Balance of control and capability.

**Data Sovereignty and Compliance (CRITICAL FOR EU/POLAND):**
- **GDPR**: Personal data cannot leave the EU without adequacy decisions, SCCs, or BCRs. On-premise or EU-hosted cloud addresses this.
- **EU AI Act**: Partially implemented August 2025, full application August 2026. Most LLM deployments classified as "limited risk" requiring transparency obligations and content labeling.
- **Data residency**: Some industries (banking, healthcare, government) require data to NEVER leave the country.
- **On-premise LLMs**: Self-hosted models (Llama, Mistral, Qwen) give complete data sovereignty. Zero data leaves the network. Meets GDPR, HIPAA automatically.

**On-Premise Deployment Specifics:**
- **Model selection**: Open-source models that can run on client's hardware (Llama 3.x, Mistral, Qwen 2.5).
- **Inference serving**: vLLM, Ollama, llama.cpp for different hardware profiles.
- **Hardware requirements**: GPU inventory (NVIDIA A100/H100 for large models, RTX 4090 for smaller). Memory, storage, networking.
- **Offline operation**: System must work without internet. All models, embeddings, vector DBs local.
- **Updates**: Versioned releases delivered as containers. Tested in staging before deployment to client.
- **Support**: Remote monitoring (with client's permission), on-site visits, SLA definitions.

**Client-Facing Concerns:**
- **Compliance documentation**: Data flow diagrams, DPIA (Data Protection Impact Assessment), security audit readiness.
- **SLAs**: Uptime, latency, throughput guarantees. Penalty clauses.
- **Change management**: How updates are deployed, tested, and rolled back in client's environment.
- **Training**: Client team needs to understand basic operations, monitoring, escalation.

### Interview Questions They Will Likely Ask

1. **"A client requires that no data leaves their premises. How do you design the system?"**
   - On-premise deployment with self-hosted open-source models. Local vector DB. Local embedding model. Air-gapped inference. Container-based deployment for reproducibility. Regular security audits.

2. **"How do you handle GDPR compliance in an LLM system?"**
   - Data minimization in prompts. PII detection and redaction. Data residency in EU. Consent management. Right to erasure (delete from vector stores). DPIA. Audit logging.

3. **"How do you deploy updates to a client's on-premise system?"**
   - Versioned container releases. Client-side staging environment. Automated eval suite runs on their data. Approval workflow. Blue/green deployment for zero-downtime updates. Rollback procedure documented and tested.

4. **"Cloud vs. on-premise -- how do you advise the client?"**
   - Depends on: data sensitivity, compliance requirements, budget, infrastructure, latency requirements, model requirements. Cloud: faster, cheaper for most, access to frontier models. On-premise: full control, data sovereignty, requires GPU investment and operational expertise.

5. **"How do you handle the quality difference between open-source and commercial models for on-premise deployments?"**
   - Fine-tuning on client's domain data. RAG with client's knowledge base. Task-specific model selection. Hybrid: on-premise for sensitive tasks, cloud for non-sensitive tasks (with client approval).

### What 10/10 Knowledge Looks Like

- Has deployed LLM systems in client environments (cloud, on-premise, or hybrid)
- Can size hardware requirements for specific models and expected load
- Understands GDPR and EU AI Act implications for LLM deployments in detail
- Has built deployment packages: containers, configs, documentation, runbooks, SLA definitions
- Can advise clients on the tradeoffs between deployment models with cost/capability analysis
- Knows the open-source model landscape: which models run on what hardware, quality vs. cost vs. latency

### Common Mistakes Candidates Make

- **"Just use the API"**: Not understanding that many clients cannot send data to external APIs
- **Ignoring compliance**: Not mentioning GDPR, data residency, EU AI Act
- **No hardware sizing**: Cannot estimate what hardware is needed for a given model
- **Assuming internet access**: On-premise systems must work offline
- **No update strategy**: Deploying once and never considering how to update the system

---

## PERSONAL GAP ANALYSIS (Based on Alpha/Omega Assessment) {#personal-gap-analysis}

Your current profile from the team analysis:

| Dimension | Current Score | Target for This Role | Gap | Priority |
|-----------|---------------|---------------------|-----|----------|
| Conceptual Architecture Design | 8.5/10 | 8/10 | EXCEEDS | Maintain |
| Original Innovation | 9.0/10 | 7/10 | EXCEEDS | Maintain |
| **Implementation / Working Code** | **2.0/10** | **8/10** | **CRITICAL** | **#1** |
| **Testing & Validation** | **1.5/10** | **8/10** | **CRITICAL** | **#2** |
| **Cost & Operational Awareness** | **3.0/10** | **8/10** | **CRITICAL** | **#3** |
| Ecosystem Knowledge | 4.0/10 | 7/10 | HIGH | #4 |
| Documentation & Visualization | 9.5/10 | 6/10 | EXCEEDS | Maintain |
| Reusability & Abstraction | 3.0/10 | 7/10 | HIGH | #5 |

### What This Means for Interview Preparation

Your strengths (architecture, innovation, documentation) are REAL assets -- the Wolny Elektron pattern, Five Minds protocol, and Observatory are genuinely impressive. But the job posting says "Nie szukamy eksperymentowania - szukamy dojrzalosci inzynieryjnej i realnych wdrozen." This means your biggest risk is being perceived as "all theory, no production."

**Your #1 goal before the interview: Have at least one running, tested, measured multi-agent system you can demo.**

Even a small system (3 agents, real task, with tests, metrics, and cost tracking) will be more impressive than a 15-agent architecture document.

---

## 30/60/90 DAY STUDY PLAN {#study-plan}

### Days 1-30: BUILD SOMETHING REAL (Close the Implementation Gap)

**Week 1-2: LangGraph Fundamentals + First Working System**
- Complete the LangGraph official tutorial (https://langchain-ai.github.io/langgraph/tutorials/)
- Build a working 3-agent system: Orchestrator + Research Agent + Writer Agent
- Use proper state management, conditional edges, error handling
- Deploy locally with Docker
- Write tests: unit tests for each node, integration test for full workflow
- Measure: latency, token usage, cost per execution

**Week 3-4: RAG Pipeline + Evaluation**
- Build a production-grade RAG pipeline
- Implement: chunking (512 recursive), embedding, retrieval with re-ranking, generation
- Set up RAGAS evaluation: measure faithfulness, relevance, context precision/recall
- Test with real Polish-language documents
- Compare chunking strategies with actual metrics
- Add semantic caching and measure hit rate + cost savings

**Deliverable by Day 30:** A working multi-agent system with RAG, tests, evaluation metrics, and cost tracking. Deployed in Docker. Can be demoed.

### Days 31-60: PRODUCTION ENGINEERING (Close the Operations Gap)

**Week 5-6: Multi-Provider + Security**
- Implement LiteLLM or Portkey as abstraction layer
- Configure fallback: OpenAI -> Anthropic -> local model
- Implement model routing: simple queries to GPT-4o-mini, complex to Claude Opus
- Measure cost reduction from routing
- Implement OWASP defenses: input validation, output filtering, prompt injection tests
- Run promptfoo red team tests against your system

**Week 7-8: Monitoring + Deployment**
- Set up Langfuse or Arize for LLM observability
- Implement quality monitoring with LLM-as-judge on sampled traffic
- Add cost tracking dashboard
- Deploy to Kubernetes (even minikube) with proper health checks
- Implement canary deployment strategy
- Document runbook: what to do when things go wrong

**Deliverable by Day 60:** Production-ready system with multi-provider fallback, security hardening, monitoring, and K8s deployment. Documented with metrics.

### Days 61-90: INTERVIEW PREPARATION (Close the Knowledge Gap)

**Week 9-10: Deep Dive into Weak Areas**
- Study OWASP LLM Top 10 until you can explain each from memory with examples
- Practice cost estimation exercises: "How much would this system cost at 10K queries/day?"
- Study vLLM internals: PagedAttention, continuous batching, speculative decoding
- Study EU AI Act requirements and GDPR implications for LLM systems

**Week 11-12: Interview Practice**
- Practice system design: "Design a multi-agent customer support system"
- Practice whiteboarding: Draw StateGraphs with proper state, edges, conditions
- Prepare 5 "war stories" from your building experience (even from the 60-day sprint)
- Prepare to discuss your Wolny Elektron pattern -- but now with implementation evidence
- Practice explaining tradeoffs: "I chose X over Y because of Z, and here are the numbers"
- Mock interviews with focus on "dojrzalosc inzynierska" answers

**Deliverable by Day 90:** Interview-ready with working code, metrics, war stories, and deep knowledge across all 10 areas.

---

## QUICK REFERENCE: KEY NUMBERS TO KNOW

| Metric | Number | Source |
|--------|--------|--------|
| Organizations with AI agents in production | 57% | LangChain State of AI Agents 2025 |
| Enterprises using 5+ models in production | 37% | Gartner 2025 |
| RAG failures traced to ingestion/chunking | 80% | Industry benchmarks 2026 |
| Cost reduction from model routing | 60-80% | Multiple sources |
| Cost reduction from prompt caching (Anthropic) | 90% | Anthropic pricing |
| Cost reduction from semantic caching | ~73% | Redis research |
| Frontier vs. small model cost difference | 190x | Token economics research |
| LLM-as-judge correlation with humans | ~80% | Evaluation research |
| RAG deployments with evaluation from day one (2026) | 60% | Industry surveys |
| Stripe cost reduction via vLLM migration | 73% | Stripe engineering |
| Optimal chunk size for most RAG use cases | 512 tokens | 2026 benchmarks |

---

## SOURCES

### Salary and Market
- [AI Salaries Poland 2025 - ITMAGINATION](https://www.itmagination.com/reports/ai-salaries-poland)
- [AI/ML Engineer Salary in Poland - Itentio](https://itentio.com/blog/ai-ml-engineer-salary-in-poland/)
- [AI Engineer Salary Poland - Jobicy](https://jobicy.com/salaries/pl/ai-engineer)
- [Why AI & ML Engineers in High Demand in Poland - VeritaHR](https://veritahr.com/why-are-ai-ml-engineers-in-high-demand-in-poland/)
- [Hiring AI Specialists in Poland - Talent Place](https://talentplace.com/blog/for-employers/hiring-ai-specialists-in-poland-these-are-the-5-best-recruitment-agencies-in-2026/)

### Multi-Agent Workflows and LangGraph
- [LangGraph Official - LangChain](https://www.langchain.com/langgraph)
- [LangGraph Workflows and Agents Documentation](https://docs.langchain.com/oss/python/langgraph/workflows-agents)
- [LangGraph Multi-Agent Orchestration Guide - Latenode](https://latenode.com/blog/ai-frameworks-technical-infrastructure/langgraph-multi-agent-orchestration/langgraph-multi-agent-orchestration-complete-framework-guide-architecture-analysis-2025)
- [LangGraph Agents in Production - AlphaBold](https://www.alphabold.com/langgraph-agents-in-production/)
- [Best Multi-Agent Frameworks 2026 - GuruSup](https://gurusup.com/blog/best-multi-agent-frameworks-2026)
- [LangGraph 2.0 Guide 2026 - DEV Community](https://dev.to/richard_dillon_b9c238186e/langgraph-20-the-definitive-guide-to-building-production-grade-ai-agents-in-2026-4j2b)

### Security
- [OWASP LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
- [OWASP Top 10 for LLMs 2025 - Confident AI](https://www.trydeepteam.com/docs/frameworks-owasp-top-10-for-llms)
- [OWASP Top 10 LLM Risks 2025 - Invicti](https://www.invicti.com/blog/web-security/owasp-top-10-risks-llm-security-2025)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [OWASP LLM Top 10 - Promptfoo](https://www.promptfoo.dev/docs/red-team/owasp-llm-top-10/)

### Performance and Deployment
- [Enterprise Local LLM Deployment Guide 2026 - SitePoint](https://www.sitepoint.com/the-2026-definitive-guide-to-running-local-llms-in-production/)
- [vLLM Production Deployment Guide 2026 - SitePoint](https://www.sitepoint.com/vllm-production-deployment-guide-2026/)
- [LLMOps Architecture 2026 - CalmOps](https://calmops.com/architecture/llmops-architecture-managing-llm-production-2026/)
- [What 1,200 Production Deployments Reveal - ZenML](https://www.zenml.io/blog/what-1200-production-deployments-reveal-about-llmops-in-2025)
- [LLM Observability Best Practices 2025 - Maxim AI](https://www.getmaxim.ai/articles/llm-observability-best-practices-for-2025/)

### Multi-Provider Integration
- [LiteLLM Router Documentation](https://docs.litellm.ai/docs/routing)
- [Top 5 LLM Router Solutions 2026 - Maxim AI](https://www.getmaxim.ai/articles/top-5-llm-router-solutions-in-2026/)
- [Intelligent LLM Routing - Swfte AI](https://www.swfte.com/blog/intelligent-llm-routing-multi-model-ai)
- [LLM Orchestration with Bifrost - DEV Community](https://dev.to/debmckinney/llm-orchestration-with-bifrost-routing-fallbacks-and-load-balancing-in-one-layer-40p3)

### RAG Systems
- [Building Production RAG 2026 Guide - PremAI](https://blog.premai.io/building-production-rag-architecture-chunking-evaluation-monitoring-2026-guide/)
- [RAG Chunking Strategies 2026 Benchmark - PremAI](https://blog.premai.io/rag-chunking-strategies-the-2026-benchmark-guide/)
- [Best Chunking Strategies for RAG 2026 - Firecrawl](https://www.firecrawl.dev/blog/best-chunking-strategies-rag)
- [RAG in Production 2026 - Abhishek Gautam](https://www.abhs.in/blog/rag-in-production-chunking-retrieval-cost-developers-2026)
- [The 2026 RAG Performance Paradox - RAG About It](https://ragaboutit.com/the-2026-rag-performance-paradox-why-simpler-chunking-strategies-are-outperforming-complex-ai-driven-methods/)

### Cost Optimization
- [LLM Token Optimization 2026 - Redis](https://redis.io/blog/llm-token-optimization-speed-up-apps/)
- [LLM Cost Optimization 8 Strategies - PremAI](https://blog.premai.io/llm-cost-optimization-8-strategies-that-cut-api-spend-by-80-2026-guide/)
- [AI Agent Cost Optimization Token Economics - Zylos](https://zylos.ai/research/2026-02-19-ai-agent-cost-optimization-token-economics)
- [LLM Cost Optimization Multi-Model Routing - Atlosz](https://atlosz.hu/en/blog/llm-koltsegoptimalizalas-routing-strategia/)

### Evaluation and Monitoring
- [Top 7 LLM Observability Tools 2026 - Confident AI](https://www.confident-ai.com/knowledge-base/top-7-llm-observability-tools)
- [Best LLM Drift Monitoring Platforms 2026 - Galileo](https://galileo.ai/blog/best-llm-output-drift-monitoring-platforms)
- [LLM Observability in Production - Atal Upadhyay](https://atalupadhyay.wordpress.com/2026/03/28/llm-observability-in-production-tracing-evals-cost-tracking-and-drift-detection/)

### Client Deployment and Compliance
- [Local LLMs in Organisations - Makandra](https://makandra.de/en/articles/local-llm-548)
- [LLM GDPR Compliance - GDPR Local](https://gdprlocal.com/large-language-models-llm-gdpr/)
- [On-Premise LLMs as Competitive Advantage - INNOQ](https://www.innoq.com/en/articles/2025/09/on-premise-llms-strategischer-hebel/)
- [Private LLM GDPR-Compliant AI in Europe - AI Tuning](https://aituning.io/)

### Interview Preparation
- [25 Advanced Agentic AI Interview Questions 2026 - AEM Institute](https://aemonline.net/blog/25-advanced-agentic-ai-interview-questions-for-2026-with-answer-updated-february-2026/)
- [Top 30 Agentic AI Interview Questions 2026 - DataCamp](https://www.datacamp.com/blog/agentic-ai-interview-questions)
- [The Agentic System Design Interview - PromptLayer](https://blog.promptlayer.com/the-agentic-system-design-interview-how-to-evaluate-ai-engineers/)
- [Complete Agentic AI System Design Interview Guide 2026 - Medium](https://atul4u.medium.com/the-complete-agentic-ai-system-design-interview-guide-2026-f95d0cfeb7cf)
- [10 Essential Agentic AI Interview Questions - KDnuggets](https://www.kdnuggets.com/10-essential-agentic-ai-interview-questions-for-ai-engineers)
