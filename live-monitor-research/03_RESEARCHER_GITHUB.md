# Researcher GitHub -- Analiza Repozytoriow
## Live Monitor Mode: Istniejace Rozwiazania Open-Source

**Data badania:** 4 kwietnia 2026
**Metodologia:** Przeszukanie GitHub i powiazanych zrodel w 5 kategoriach, analiza 25 repozytoriow

---

## 1. Multi-Agent Orchestration Dashboards

### Repo 1: [builderz-labs/mission-control](https://github.com/builderz-labs/mission-control)
- **3.8k Stars | 647 Forks | Aktywny: marzec 2026**
- **Opis**: Self-hosted dashboard do orkiestracji agentow AI. Zarzadzanie flotami agentow, dyspozycja zadan, sledzenie kosztow, koordynacja multi-agentowych workflow. Zero zewnetrznych zaleznosci -- zasilany SQLite.
- **Stack**: Next.js 16 (App Router), React 19, Tailwind CSS 3.4, TypeScript 5.7, SQLite (better-sqlite3, WAL mode), Zustand 5, Recharts 3, WebSocket + SSE
- **Kluczowe cechy**:
  - Kanban board z 6 kolumnami workflow
  - Heartbeat monitoring agentow i lifecycle management
  - Real-time activity feeds przez WebSocket/SSE
  - Token usage dashboards z per-model breakdowns
  - Role-based access control (viewer/operator/admin)
  - Trust scoring i secret detection
  - Adaptery dla CrewAI, LangGraph, AutoGen, Claude SDK
- **Co zaczerpnac**: **WebSocket + SSE push updates z smart polling** -- idealny wzorzec dla naszego Live Monitor. Takze: Kanban-style phase management, heartbeat monitoring agentow, token/cost dashboards. Architektura zero-dependency (SQLite) jako inspiracja dla single-file HTML.
- **Demo**: [mc.builderz.dev](https://mc.builderz.dev)

---

### Repo 2: [simple10/agents-observe](https://github.com/simple10/agents-observe)
- **276 Stars | 11 Forks | Aktywny: kwiecien 2026 (v0.7.4)**
- **Opis**: Real-time observability dashboard dla Claude Code agents. Filtrowanie, wyszukiwanie i wizualizacja multi-agentowych sesji.
- **Stack**: TypeScript 90%, React 19, shadcn UI, Hono (backend), SQLite, Docker, WebSocket
- **Kluczowe cechy**:
  - Real-time event streaming (hook events -> HTTP POST -> SQLite -> WebSocket broadcast)
  - Agent hierarchy visualization (parent-child relationships)
  - Event filtering & search po agent name, tool type, payload
  - Multi-session tracking z human-readable identifiers
  - Plugin integration z Claude Code marketplace
- **Co zaczerpnac**: **Architektura event stream** (hook -> storage -> broadcast -> UI). Hierarchia agentow parent-child to dokladnie to co mamy w Deep Five Minds (Orkiestrator -> eksperci -> agenci). Takze: event-driven state derivation (klient wylicza stan z event stream zamiast utrzymywac osobny state).

---

### Repo 3: [manish-raana/openclaw-mission-control](https://github.com/manish-raana/openclaw-mission-control)
- **261 Stars | 56 Forks | Aktywny: luty 2026**
- **Opis**: Real-time dashboard do zarzadzania autonomicznymi agentami i task workflows. Natychmiastowa synchronizacja bez polling/message queues -- zasilany Convex.
- **Stack**: TypeScript 91.5%, React + Vite, Convex (real-time database), Tailwind CSS, Tabler Icons
- **Kluczowe cechy**:
  - Instant propagation zmian na wszystkie polaczone klienty
  - Live monitoring z status i activity tracking
  - Kanban dashboard (Inbox -> Assigned -> In Progress -> Review -> Done)
  - Activity feed z comment tracking i filtered event logs
  - Convex Auth integration
- **Co zaczerpnac**: **Real-time sync bez polling** -- Convex jako inspiracja architekturalna (w naszym przypadku mozemy uzyc eventow in-memory w single-file HTML). Prostota Kanban stages odpowiada naszym fazom workflow (Planning -> Coding -> QA -> Deploy).

---

### Repo 4: [MeisnerDan/mission-control](https://github.com/MeisnerDan/mission-control)
- **321 Stars | 35 Forks | Aktywny: marzec 2026**
- **Opis**: Command center dla solo-entrepreneurs delegujacych prace agentom AI. Zarzadzanie zadaniami, koordynacja agentow, autonomiczne wykonywanie z safety controls.
- **Stack**: TypeScript, Next.js 15, Tailwind CSS v3, shadcn/ui + Radix UI, @dnd-kit, JSON file storage, Vitest, PM2
- **Kluczowe cechy**:
  - Eisenhower Matrix do priorytetyzacji
  - 6 wbudowanych agentow + unlimited custom agents
  - Autonomous daemon z loop detection
  - Emergency Stop kill switch
  - AES-256-GCM encrypted vault
  - Cost i token usage tracking per agent session
  - 193 automated tests
- **Co zaczerpnac**: **Emergency Stop / kill switch** -- kluczowy dla HITL (Human-in-the-Loop) w naszym Live Monitor. Takze: cost/token tracking per agent, Eisenhower Matrix jako inspiracja do priorytetyzacji decyzji w Five Minds debate, loop detection (anty-wzorzec nieskonczonej petli agentow).

---

### Repo 5: [OpenBMB/ChatDev](https://github.com/OpenBMB/ChatDev)
- **32.6k Stars | 4k Forks | Aktywny: 2026 (ChatDev 2.0)**
- **Opis**: ChatDev 2.0 (DevAll) -- zero-code multi-agent orchestration platform. Agenci przyjmuja role (CEO, CTO, Developer, QA) i wspolpracuja nad tworzeniem oprogramowania.
- **Stack**: Python, Vue 3 (Web Console), multi-agent framework
- **Kluczowe cechy**:
  - Visual canvas do projektowania multi-agent systems (drag-and-drop)
  - Visualizer: real-time logs, replayed logs, ChatChain visualization
  - Role-based agent collaboration (CEO -> CTO -> Developer -> QA)
  - Zero-code orchestration
- **Co zaczerpnac**: **ChatChain visualization** -- wizualizacja lancucha konwersacji miedzy agentami. Role-based hierarchy (CEO/CTO/Dev/QA) jest bardzo bliska naszemu modelowi (Orkiestrator -> Planner -> Developer -> QA). Replay logs to must-have dla naszego trybu symulacji.

---

## 2. Real-Time Workflow Visualization

### Repo 6: [xyflow/xyflow (React Flow)](https://github.com/xyflow/xyflow)
- **36k Stars | 2.4k Forks | Aktywny: marzec 2026**
- **Opis**: Najpopularniejsza biblioteka open-source do budowania node-based UIs z React lub Svelte. Gotowa out-of-the-box, nieskoczenie customizowalna.
- **Stack**: TypeScript 85.5%, Svelte 11.6%, React Flow 12 (@xyflow/react), Svelte Flow (@xyflow/svelte)
- **Kluczowe cechy**:
  - Drag-and-drop node editing
  - MiniMap, Controls, Background (built-in components)
  - Custom nodes i edges z dowolnym React content
  - Touch-friendly, pan/zoom, selection, keyboard shortcuts
  - Professional Pro tier z advanced layouting (ELK.js, Dagre)
- **Co zaczerpnac**: **Pattern animowanych polaczen** -- React Flow pozwala na custom animated edges ktore wizualizuja przeplyw danych miedzy node'ami. MiniMap component (juz mamy to w naszej aplikacji). Takze: podejscie do custom node rendering z live status indicators, i concept "execution state overlay" na istniejacy graf.
- **Demo**: [reactflow.dev](https://reactflow.dev/)

---

### Repo 7: [google/workflow-graph](https://github.com/google/workflow-graph)
- **158 Stars | 28 Forks | Aktywny: 2025**
- **Opis**: Web Component od Google do wizualizacji workflow graphs (DAG). Zbudowany w Angular, dystrybuowany jako Web Component.
- **Stack**: TypeScript 80.2%, HTML 11.2%, SCSS 6.5%, Angular, npm package @google/workflow-graph
- **Kluczowe cechy**:
  - DAG scaffold, toolbar, renderer
  - Web Component (reusable w React, vanilla JS)
  - Node groups i custom styling
  - Status indicators na nodach
- **Co zaczerpnac**: **DAG renderer z status indicators** -- Google's approach do wizualizacji stanow wezlow (idle, running, completed, error) jest dokladnie tym co potrzebujemy. Web Component architecture jako referencja dla frameworkowo-niezaleznego designu. Podejscie do grupowania nodow wedlug faz.

---

### Repo 8: [n8n-io/n8n](https://github.com/n8n-io/n8n)
- **182k Stars | 56.5k Forks | Aktywny: marzec 2026 (v2.14.2)**
- **Opis**: Fair-code workflow automation platform z natywnym AI. Laczenie wizualnego buildingu z custom kodem, 400+ integracji.
- **Stack**: TypeScript, Vue.js, Node.js, PostgreSQL
- **Kluczowe cechy**:
  - Visual canvas z node-based workflow editor
  - 400+ integrations
  - Execution history z replay
  - Kazdy krok agentow traceable na canvasie
  - AI capabilities natywne
- **Co zaczerpnac**: **Execution history z replay capability** -- mozliwosc odtworzenia dowolnego execution step-by-step. Canvas-based workflow editor jako benchmark UX. Uwaga: n8n ma problem z real-time visualization sciezki wykonania (node-by-node highlight nie dziala plynnie przy zlozonych workflow) -- to jest cos co my mozemy zrobic lepiej.

---

### Repo 9: [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI)
- **108k Stars | 12.4k Forks | Aktywny: marzec 2026**
- **Opis**: Najpotezniejszy i najbardziej modularny node-based GUI dla modeli dyfuzyjnych. Graph/nodes interface z selective re-execution.
- **Stack**: Python (backend), JavaScript (frontend LiteGraph), WebSocket
- **Kluczowe cechy**:
  - **Green border na aktualnie wykonujacym sie nodzie** -- live execution feedback
  - Progress bar along top of app z queue size i current progress
  - Execution time badges na nodach po zakonczeniu
  - Selective re-execution (tylko zmienione czesci workflow)
  - Nested subgraph support
- **Co zaczerpnac**: **Live execution visualization patterns**: zielona ramka na aktywnym nodzie, czas wykonania jako badge, progress bar na gorze. ComfyUI jest benchmark'iem dla "node execution visualization" -- kazdy node pokazuje swoj stan w czasie rzeczywistym. Selective re-execution jako inspiracja dla naszego "re-run phase".
- **Demo**: [comfyui.com](https://www.comfyui.com/)

---

### Repo 10: [retejs/rete](https://github.com/retejs/rete)
- **12k Stars | 743 Forks | Aktywny: czerwiec 2025 (v2.0.6)**
- **Opis**: JavaScript framework do visual programming. Tworzenie interfejsow wizualnych i workflow z built-in dataflow i control flow processing.
- **Stack**: TypeScript 97.1%, multi-framework (React, Vue, Angular, Svelte)
- **Kluczowe cechy**:
  - rete-engine: processing schemes z dataflow i control flow
  - Multi-framework rendering (React, Vue, Angular, Svelte)
  - Rete Kit CLI do rapid project setup
  - Visual node editor z graph-based workflow
- **Co zaczerpnac**: **Dataflow + control flow engine** -- Rete's podwojne podejscie (dataflow = dane plyna miedzy nodami, control flow = sekwencja wykonania) jest idealnym modelem dla naszego systemu: dane (prompty/odpowiedzi) plyna miedzy agentami, a control flow (fazy workflow) determinuje kolejnosc. Separacja engine od renderera to dobry wzorzec architekturalny.

---

## 3. Node-Based Editors z Live Mode

### Repo 11: [Node-RED](https://github.com/node-red/node-red)
- **23k Stars | 3.8k Forks | Aktywny: marzec 2026 (v4.1.8)**
- **Opis**: Low-code programming dla event-driven applications. Visual flow-based development na Node.js. Edytor przeglądarkowy z wdrożonym execution engine.
- **Stack**: JavaScript 99.8%, Node.js, Express, Apache 2.0
- **Kluczowe cechy**:
  - Browser-based flow editor z drag-and-drop
  - Node palette (instalowane z npm)
  - Debug sidebar z message inspection
  - Flow-based execution z real-time output
  - Subflows (reusable groups of nodes)
  - flowviewer plugin do wizualizacji na dashboard
- **Co zaczerpnac**: **Debug sidebar z message inspection** -- podglad wiadomosci przechodzacych przez kazdy node w real-time to idealny wzorzec dla naszego "Dialog Timeline". Subflows jako inspiracja dla grupowania agentow w fazy. Palette concept (lista dostepnych node'ow) odpowiada naszej palecie agentow.

---

### Repo 12: [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise)
- **51.5k Stars | 24.1k Forks | Aktywny: marzec 2026 (v3.1.1)**
- **Opis**: Build AI Agents Visually -- low-code platform do tworzenia i wdrazania inteligentnych agentow przez visual interface.
- **Stack**: TypeScript 58.5%, JavaScript 29%, monorepo z PNPM + Turbo, React frontend, Node.js backend
- **Kluczowe cechy**:
  - Visual agent builder z drag-and-drop
  - Multi-agent system support
  - RAG integration
  - LangChain compatibility
  - AgentFlow SDK (v3.1.0)
  - Self-hosting + Docker + cloud deployment
- **Co zaczerpnac**: **Visual agent builder UX patterns** -- Flowise jest wzorcowy w budowaniu AI agent pipelines wizualnie. Szczegolnie: jak wizualizuja polaczenia miedzy agentami, jak pokazuja przeplywy danych, i jak integruja execution z designem. AgentFlow SDK jako koncept wyodrebnionego SDK od UI.

---

### Repo 13: [langgenius/dify](https://github.com/langgenius/dify)
- **136k Stars | 21.1k Forks | Aktywny: 2025-2026**
- **Opis**: Production-ready platform do agentic workflow development. Laczy AI workflow, RAG pipeline, agent capabilities, model management i observability.
- **Stack**: Python (API backend), TypeScript/React (frontend), Docker, PostgreSQL
- **Kluczowe cechy**:
  - Visual Workflow Builder -- intuitive canvas
  - 100+ LLM integrations
  - Prompt IDE z porownywaniem modeli
  - Agent capabilities (Function Calling + ReAct)
  - LLMOps -- monitoring, logging, continuous improvement
  - Backend-as-a-Service z API-first architecture
- **Co zaczerpnac**: **Prompt IDE concept** -- mozliwosc testowania i porownywania promptow agentow directly w interfejsie. LLMOps monitoring (metryki agentow w produkcji) jako inspiracja dla naszych metryki HUD. Workflow Builder canvas jako benchmark dla visual design.
- **Demo**: [dify.ai](https://dify.ai/)

---

### Repo 14: [proactive-agent/langgraphics](https://github.com/proactive-agent/langgraphics)
- **79 Stars | 7 Forks | Aktywny: luty 2025**
- **Opis**: Live visualization tool dla LangGraph agents. Szczegolnie przydatny przy duzych sieciach: grafy z wieloma nodami, branching conditions i cyklami.
- **Stack**: Python (backend), React (frontend web UI)
- **Kluczowe cechy**:
  - One-line setup (wrap compiled graph)
  - Fully local execution -- dane nie opuszczaja maszyny
  - Live execution graph visualization
  - Cost & latency tracking
  - No API key required
  - Self-hosted option
- **Co zaczerpnac**: **One-line integration pattern** -- minimalistyczne podejscie do dodania wizualizacji (jedna linia kodu). Fully local architecture. Live tracking z cost/latency metryki na nodach to dokladnie co potrzebujemy w naszym "Metrics HUD". Podejscie do wizualizacji cykli i branchingu w grafie.

---

### Repo 15: [Eng-Elias/CrewAI-Visualizer](https://github.com/Eng-Elias/CrewAI-Visualizer)
- **389 Stars | 99 Forks | Aktywny: styczen 2025**
- **Opis**: User-friendly web interface dla CrewAI. Upraszcza tworzenie i zarzadzanie AI crews bez kodowania.
- **Stack**: TypeScript 91.1%, Next.js, React, Tailwind CSS, GraphQL, PostgreSQL, Prisma ORM
- **Kluczowe cechy**:
  - Form-driven agent customization (role, goal, tools)
  - Sequential i hierarchical task execution
  - Output persistence (save and reference results)
  - Multi-tool support (ArXiv, PubMed, extensible)
  - Agent memory, delegation, verbose logging
- **Co zaczerpnac**: **Role/Goal/Tool customization UI** -- formularzowe podejscie do konfiguracji agentow (rola, cel, narzedzia) jest dobrym UX pattern'em. Sequential vs hierarchical execution modes to dokladnie nasze "Process Types". Agent memory jako feature do rozwazenia.

---

## 4. AI Agent Frameworks z UI

### Repo 16: [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)
- **28.4k Stars | 4.8k Forks | Aktywny: kwiecien 2026 (v1.1.6)**
- **Opis**: Low-level orchestration framework do budowania stateful agents. Durable execution, human-in-the-loop, comprehensive memory.
- **Stack**: Python 99.4%, MIT license
- **Kluczowe cechy**:
  - **Durable execution** -- agenci przetrwaja awarie i wznawiane sa automatycznie
  - **Human-in-the-Loop** -- inspekcja i modyfikacja stanu podczas wykonania
  - Comprehensive memory (short-term + long-term persistence)
  - LangSmith Studio -- visual prototyping
  - Deep integration z LangSmith (observability i evals)
- **Co zaczerpnac**: **Human-in-the-Loop architecture** -- LangGraph ma najlepszy model HITL w branzy: mozliwosc zatrzymania grafu, inspekcji stanu, modyfikacji, i wznowienia. To jest KLUCZOWE dla naszego Live Monitor. Takze: durable execution (stan przechowywany miedzy krokami) i concept "checkpoints" (punkty zapisu stanu).
- **Demo**: [LangSmith Studio](https://docs.langchain.com/oss/python/langgraph/studio)

---

### Repo 17: [microsoft/autogen](https://github.com/microsoft/autogen)
- **56.7k Stars | 8.5k Forks | Aktywny: 2025-2026**
- **Opis**: Framework do tworzenia multi-agent AI applications ktore dzialaja autonomicznie lub wspolpracuja z ludzmi.
- **Stack**: Python, .NET (C#), gRPC (distributed runtime), OpenAI API
- **Kluczowe cechy**:
  - AutoGen Studio -- no-code GUI do budowania multi-agent apps
  - Visual canvas z drag-and-drop (w rozwoju)
  - Message flow visualization -- widac jak agenci sie komunikuja
  - Run control -- zatrzymanie agentow mid-execution
  - Interactive feedback przez UI
  - AgentTool -- agent-to-agent communication
  - Magentic-One: state-of-the-art multi-agent system
- **Co zaczerpnac**: **Message flow visualization** -- wizualizacja przeplywu wiadomosci miedzy agentami to core feature naszego Live Monitor. Run control (pause/stop mid-execution) jest kluczowy dla HITL. AutoGen Studio jako referencja dla no-code agent configuration. Distributed runtime (gRPC) jako skalowanie w przyszlosci.

---

### Repo 18: [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)
- **48k Stars | 6.5k Forks | Aktywny: 2026**
- **Opis**: Framework do orkiestracji role-playing, autonomicznych agentow AI. Collaborative intelligence -- agenci pracuja razem nad zlożonymi zadaniami.
- **Stack**: Python >=3.10, UV package manager, Pydantic
- **Kluczowe cechy**:
  - Crews -- autonomiczne zespoly agentow z role-based collaboration
  - Flows -- event-driven, production-ready workflows
  - Sequential i hierarchical process execution
  - YAML-based agent/task configuration
  - Human input integration during execution
  - CrewAI AMP Suite (enterprise: tracing, observability, control plane)
- **Co zaczerpnac**: **Role-based collaboration model** -- CrewAI's podejscie do "crews" (zespolow agentow z rolami) jest najblizsza naszemu modelowi. Flows (event-driven workflows) jako wzorzec dla fazowego wykonania. YAML-based configuration jako format eksportu/importu presetow. Human input integration mid-execution.

---

### Repo 19: [VRSEN/agency-swarm](https://github.com/VRSEN/agency-swarm)
- **~3.9k Stars | ~1k Forks | Aktywny: 2025-2026**
- **Opis**: Reliable Multi-Agent Orchestration Framework. Simplifikacja tworzenia AI agencies przez myslenie o automatyzacji w kategoriach struktur organizacyjnych.
- **Stack**: Python, MIT license
- **Kluczowe cechy**:
  - Customizable agent roles (CEO, VA, Developer)
  - Orchestrated agent communication via send_message tool
  - Agency graph visualization (nodes/edges + metadata)
  - get_agency_graph API (graph structure)
  - Real-world organizational structures as model
- **Co zaczerpnac**: **Organizational structure as agent model** -- agency-swarm traktuje agentow jak pracownikow w firmie (CEO, VA, Developer). To jest identyczne z naszym podejsciem (Orkiestrator = CEO, Planner = PM, Developer, QA). Agency graph API (get_agency_graph) jako wzorzec do eksportu struktury zespolu.

---

### Repo 20: [kyegomez/swarms](https://github.com/kyegomez/swarms)
- **6.2k Stars | 799 Forks | Aktywny: 2025-2026**
- **Opis**: Enterprise-Grade Production-Ready Multi-Agent Orchestration Framework. Wdrazanie autonomicznych agentow AI na skale z high availability.
- **Stack**: Python, pip/poetry/uv, OpenAI/Anthropic/Groq APIs
- **Kluczowe cechy**:
  - Hierarchical swarms, parallel processing, sequential workflows
  - Graph-based networks, dynamic composition
  - SwarmRouter -- routing agentow
  - Mixture of Agents, GroupChat, ForestSwarm architectures
  - MCP (Model Context Protocol) integration
  - Agent Orchestration Protocol (AOP) dla distributed deployment
- **Co zaczerpnac**: **Multiple swarm architectures** -- swarms oferuje rozne topologie (Sequential, Concurrent, Graph-based, Mixture, Hierarchical, GroupChat). To jest inspiracja dla naszych presetow -- kazdy preset to inna topologia swarm. SwarmRouter jako koncept dynamicznego routingu miedzy agentami w zaleznosci od kontekstu.

---

## 5. Mission Control / Monitoring Dashboards

### Repo 21: [grafana/grafana](https://github.com/grafana/grafana)
- **73k Stars | 13.7k Forks | Aktywny: marzec 2026 (v12.4.2)**
- **Opis**: Otwarta i komposycyjna platforma observability i data visualization. Wizualizacja metryk, logow i traces z wielu zrodel.
- **Stack**: TypeScript 50.3%, Go 43%, AGPL-3.0 license, 2640 contributors
- **Kluczowe cechy**:
  - Dynamic dashboards z flexible tabs
  - Show-and-hide rules based on variables or data
  - Alerting (Slack, PagerDuty, etc.)
  - Mixed data sources w jednym grafie
  - Panel plugins ecosystem
  - Prometheus, Loki, Elasticsearch, InfluxDB integration
- **Co zaczerpnac**: **Panel-based dashboard layout** -- Grafana jest wzorcem dla dashboardow monitoringowych. Dynamic dashboards z configurable panels to idealny model dla naszego "Metrics HUD". Alerting system jako inspiracja dla powiadomien o bledach agentow. Concept "data source" -- kazdy agent to "data source" generujacy metryki.
- **Demo**: [grafana.com/oss](https://grafana.com/oss/)

---

### Repo 22: [AgentOps-AI/agentops](https://github.com/AgentOps-AI/agentops)
- **5.4k Stars | 559 Forks | Aktywny: 2025-2026**
- **Opis**: Python SDK do monitorowania agentow AI, sledzenia kosztow LLM, benchmarkingu. Integracja z CrewAI, OpenAI Agents SDK, Langchain, Autogen, AG2, CamelAI.
- **Stack**: Python, integrations z 7+ frameworks
- **Kluczowe cechy**:
  - **Session Waterfall** -- wizualizacja czasu z LLM calls, tool calls, errors
  - Session replay z point-in-time precision
  - Cost control i spending monitoring
  - Failure detection dla multi-agent interactions
  - Tool usage statistics
  - 2-line integration z dowolnym agentem
- **Co zaczerpnac**: **Session Waterfall visualization** -- to jest KLUCZOWY pattern: oś czasu po lewej z wszystkimi LLM calls, tool calls, events, a szczegoly po prawej. Idealnie pasuje do naszego "Dialog Timeline". Session replay jako must-have feature. 2-line integration jako wzorzec prostoty.

---

### Repo 23: [langfuse/langfuse](https://github.com/langfuse/langfuse)
- **24.3k Stars | 2.5k Forks | Aktywny: kwiecien 2026**
- **Opis**: Open source LLM engineering platform. Observability, metryki, evals, prompt management, playground, datasets.
- **Stack**: TypeScript/React (frontend), Python/JS SDKs, PostgreSQL, OpenTelemetry
- **Kluczowe cechy**:
  - Tracing z multi-turn conversation support
  - **Graph view dla agent traces** -- wizualizacja agent graph z stepping through spans
  - Prompt versioning z playground
  - LLM-as-judge evaluation
  - 50+ framework integrations
  - Self-hosted (battle-tested)
- **Co zaczerpnac**: **Graph view for traces** -- Langfuse pozwala wizualizowac conceptual agent graph jednoczesnie przegladajac execution spans. To laczy nasz canvas (graf agentow) z dialog timeline (execution trace). Prompt versioning jako inspiracja dla naszego systemu promptow agentow. Evaluation framework (LLM-as-judge) jako potencjalny feature.

---

### Repo 24: [evilmartians/agent-prism](https://github.com/evilmartians/agent-prism)
- **319 Stars | 16 Forks | Aktywny: grudzien 2024 (Alpha)**
- **Opis**: React component library do wizualizacji traces z AI agents. Transformuje OpenTelemetry data w interaktywne wizualizacje.
- **Stack**: TypeScript, React 19+, Tailwind CSS 3, Radix UI, Lucide React, pnpm monorepo
- **Kluczowe cechy**:
  - Hierarchical span tree visualization z search
  - Pre-built TraceViewer component
  - Composable components (TraceList, TreeView, DetailsView)
  - OpenTelemetry (OTLP) i Langfuse format support
  - Customizable theming via CSS variables
  - Responsive design (desktop + mobile)
- **Co zaczerpnac**: **Composable trace visualization components** -- AgentPrism udowadnia ze trace visualization mozna zbudowac z malych, reusable React components. Hierarchical span tree to dokladnie co potrzebujemy do wizualizacji Deep Five Minds (debate spans > agent spans > LLM call spans). Theming via CSS variables jako wzorzec dla naszych themes.
- **Demo**: [agent-prism.evilmartians.io](https://agent-prism.evilmartians.io/)

---

### Repo 25: [Smilkoski/agent-swarm-dashboard](https://github.com/Smilkoski/agent-swarm-dashboard)
- **1 Star | 0 Forks | Aktywny: grudzien 2025**
- **Opis**: Real-time web interface do orkiestracji multi-agent AI missions. Trzy typy workflow (research, feasibility, event planning) z live monitoring.
- **Stack**: Python 72%, Django, CrewAI, LangChain, Groq API, Tailwind CSS, jQuery, Mermaid.js, Docker, Redis
- **Kluczowe cechy**:
  - **3 Mission Types** z rozna liczba agentow (6-7 per workflow)
  - Live timeline z agent messages, token counters, cost tracking
  - **Mermaid-based flowcharts** do wizualizacji agent collaboration
  - Server-Sent Events (SSE) z auto-reconnect
  - Mission history z clickable past runs
  - Dark-mode responsive UI
  - Single-mission enforcement (brak jednoczesnych misji)
- **Co zaczerpnac**: **Mission-type presets z live timeline** -- ten repo jest najbardziej zblizone do naszego konceptu! Rozne "mission types" to nasze presety, live timeline to nasz Dialog Timeline, Mermaid flowcharts to nasz canvas. SSE z auto-reconnect jako wzorzec real-time communication. Single-mission enforcement odpowiada naszemu single-simulation mode.

---

## Podsumowanie: Top 10 Patterns do Zaadoptowania

Na podstawie analizy 25 repozytoriow, oto 10 najwazniejszych wzorcow i feature'ow do zaadoptowania w naszym Live Monitor Mode:

### 1. Session Waterfall / Dialog Timeline (AgentOps, Langfuse)
**Zrodlo**: AgentOps Session Waterfall, Langfuse trace graph view
**Pattern**: Os czasu po lewej stronie z wszystkimi eventami (LLM calls, tool calls, agent messages, bledy), szczegoly po prawej po kliknieciu. Hierarchiczna struktura: faza > agent > operacja.
**Priorytet**: KRYTYCZNY -- to jest serce Live Monitor

### 2. Human-in-the-Loop Checkpoints (LangGraph, MeisnerDan/mission-control)
**Zrodlo**: LangGraph HITL architecture, MeisnerDan's Emergency Stop
**Pattern**: Mozliwosc zatrzymania execution w pre-definiowanych punktach decyzyjnych, inspekcji stanu agentow, modyfikacji, i wznowienia. Emergency Stop jako opcja natychmiastowa. Approval workflows dla krytycznych decyzji.
**Priorytet**: KRYTYCZNY -- core roznica miedzy "demo" a uzytecznym narzedziem

### 3. Live Node Execution Visualization (ComfyUI, React Flow)
**Zrodlo**: ComfyUI green border + progress bar, React Flow animated edges
**Pattern**: Aktywny node ma wyrozniajaca sie wizualnie ramke (glow/pulse). Progress bar na gorze canvasu. Animated edges pokazujace kierunek przeplywu danych. Execution time badge na zakonczonych nodach.
**Priorytet**: WYSOKI -- wizualne potwierdzenie "co sie dzieje teraz"

### 4. Event-Driven State Architecture (agents-observe, Convex)
**Zrodlo**: agents-observe event stream, openclaw-mission-control Convex sync
**Pattern**: Zamiast utrzymywac osobny state, klient wylicza stan z event stream'u. Events: AgentStarted, AgentCompleted, MessageSent, PhaseChanged, ErrorOccurred. Persistence w localStorage. WebSocket broadcast do wielu okien.
**Priorytet**: WYSOKI -- architektura umozliwiajaca replay i undo

### 5. Mission Types / Preset Workflows (agent-swarm-dashboard, CrewAI)
**Zrodlo**: Smilkoski/agent-swarm-dashboard, CrewAI Flows
**Pattern**: Pre-definiowane typy misji z rozna konfiguracja agentow. Kazdy typ ma swoj workflow, liczbe agentow, expected timeline. Uzytkownik wybiera typ i obserwuje wykonanie. Mission history z clickable past runs.
**Priorytet**: WYSOKI -- juz mamy 29 presetow, trzeba je zintegrowac z Live Monitor

### 6. Metrics HUD (Grafana, builderz-labs/mission-control)
**Zrodlo**: Grafana dynamic dashboards, builderz-labs token dashboards
**Pattern**: Real-time metryki: elapsed time, active agents, current phase, progress %, token usage, estimated cost. Alerting system dla anomalii (agent timeout, excessive tokens). Panel-based layout z konfigurowalnym rozmieszczeniem.
**Priorytet**: WYSOKI -- juz czesciowo zaimplementowane w v18 (Mission Control)

### 7. Agent Communication Graph + Trace Overlay (Langfuse, AgentPrism)
**Zrodlo**: Langfuse graph view + trace stepping, AgentPrism hierarchical spans
**Pattern**: Canvas z grafem agentow (relacje) z nalozona warstwa trace'ow (co sie wydarzylo kiedy). Mozliwosc "stepping through" -- krok po kroku przeglad kazdej wiadomosci i decyzji. Composable components (tree view + detail view + graph view).
**Priorytet**: SREDNI-WYSOKI -- laczy istniejacy canvas z nowym Live Monitor

### 8. Organizational Structure as Agent Model (agency-swarm, ChatDev)
**Zrodlo**: VRSEN/agency-swarm organizational metaphor, ChatDev role-based
**Pattern**: Agenci modelowani jak pracownicy w firmie (CEO, PM, Developer, QA, Tester). Hierarchia komunikacji (CEO mowi do PM, PM do Dev, nie odwrotnie). ChatChain -- wizualizacja lancucha rozmow. Role-based permissions (kto moze podejmowac decyzje).
**Priorytet**: SREDNI -- juz mamy ten model, mozemy go wzmocnic wizualnie

### 9. Swarm Topologies / Multiple Architectures (kyegomez/swarms)
**Zrodlo**: swarms SwarmRouter, multiple architecture types
**Pattern**: Rozne topologie komunikacji agentow: Sequential (liniowa), Concurrent (rownolegle), Hierarchical (drzewo), Graph (arbitralne polaczenia), Mixture of Agents, GroupChat (debata). Dynamiczny routing miedzy topologiami. Wizualne przelaczanie miedzy trybami.
**Priorytet**: SREDNI -- rozszerzenie obecnego systemu o nowe topologie

### 10. Replay & Debug Mode (n8n, ChatDev, AgentOps)
**Zrodlo**: n8n execution history, ChatDev replayed logs, AgentOps session replay
**Pattern**: Pelne nagranie execution z mozliwoscia replay. Step-by-step debugging (krok wstecz/naprzod). Porownanie dwoch execution'ow side-by-side. Export execution log (JSON/Markdown). "Time travel" -- podglad stanu w dowolnym momencie.
**Priorytet**: SREDNI -- premium feature dla zaawansowanych uzytkownikow

---

## Macierz Porownawcza: Najwazniejsze Repozytoria

| Repo | Stars | Live Exec | HITL | Agent Viz | Trace | Cost Track | Open-Source |
|------|-------|-----------|------|-----------|-------|------------|-------------|
| builderz-labs/mission-control | 3.8k | Tak (SSE) | Nie | Tak | Nie | Tak | MIT |
| agents-observe | 276 | Tak (WS) | Nie | Tak | Tak | Nie | --- |
| xyflow (React Flow) | 36k | Nie* | Nie | Tak | Nie | Nie | MIT |
| ComfyUI | 108k | Tak | Nie | Tak | Nie | Nie | GPL |
| n8n | 182k | Czesciowo | Nie | Tak | Tak | Nie | Fair-code |
| LangGraph | 28.4k | Tak | **Tak** | Tak | Tak | Nie | MIT |
| AutoGen | 56.7k | Tak | Tak | Tak | Tak | Nie | MIT |
| CrewAI | 48k | Tak | Tak | Nie* | Tak | Tak (enterprise) | MIT |
| AgentOps | 5.4k | Tak | Nie | Nie | **Tak** | **Tak** | MIT |
| Langfuse | 24.3k | Tak | Nie | **Tak** | **Tak** | Tak | MIT |
| Grafana | 73k | Tak | Nie | Nie | Tak | Nie | AGPL |
| ChatDev | 32.6k | Tak | Nie | Tak | Tak | Nie | Apache 2.0 |
| agent-swarm-dashboard | 1 | Tak (SSE) | Nie | Tak | Tak | Tak | MIT |

\* = wymaga custom implementation

---

## Kluczowe Wnioski dla Naszego Projektu

### Co juz mamy (i co robimy dobrze):
1. **Canvas z nodami i polaczeniami** -- odpowiada React Flow / Rete.js pattern
2. **Simulation mode z speech bubbles** (v14) -- odpowiada ChatDev visualizer
3. **Mission Control mode** (v18) -- odpowiada builderz-labs/mission-control
4. **Dialog Timeline** (v14) -- odpowiada AgentOps Session Waterfall
5. **Metryki HUD** (v18) -- odpowiada Grafana panels
6. **Presets** (29) -- odpowiada mission types z agent-swarm-dashboard
7. **Five Minds debate** -- unikalny feature, nie znaleziony w zadnym repo!

### Czego nam brakuje (i co mozemy dodac):
1. **Prawdziwe HITL decision points** -- LangGraph-style checkpoints z zatrzymaniem, inspekcja, modyfikacja, wznowienie
2. **Session replay / time travel** -- AgentOps-style pelne nagranie z mozliwoscia replay
3. **Hierarchiczny trace view** -- AgentPrism-style span tree (faza > agent > operacja)
4. **Animated edge execution** -- ComfyUI-style green border na aktywnym nodzie + animated data flow na connections
5. **Cost/token real-time tracking** -- AgentOps-style szacowanie kosztow per agent/per faza
6. **Execution comparison** -- porownanie dwoch run'ow tego samego presetu side-by-side
7. **Export execution log** -- JSON + Markdown export calej sesji

### Nasz unikalny advantage:
- **Single-file HTML** -- zaden z analizowanych repozytoriow nie oferuje tego. Wszystkie wymagaja servera, bazy danych, instalacji. Nasza aplikacja dziala offline, z pliku.
- **Five Minds Protocol z wizualizacja debaty** -- zadne repo nie implementuje structured adversarial debate z Devil's Advocate i Gold Solution synthesis w visual dashboard.
- **29 presetow z encyclopedic knowledge** -- zaden analizowany system nie ma tak bogatej bazy wiedzy o swoich presetach i agentach.

---

## Zalecane Nastepne Kroki

1. **Zaimplementowac HITL checkpoints** w stylu LangGraph (zatrzymanie na pre-definiowanych punktach decyzyjnych w Five Minds flow)
2. **Dodac animated edge execution** w stylu ComfyUI (glow na aktywnym nodzie, animated particles na aktywnych polaczeniach)
3. **Rozbudowac Dialog Timeline** do Session Waterfall (hierarchiczny widok z filtrowanie po fazie/agencie/typie)
4. **Dodac replay mode** -- nagranie calej symulacji z mozliwoscia odtworzenia krok po kroku
5. **Zintegrowac cost estimation** -- szacunkowy koszt tokenow per agent/per faza based on model pricing

---

*Raport przygotowany przez Researcher GitHub w ramach Deep Five Minds Protocol*
*Data: 4 kwietnia 2026*
