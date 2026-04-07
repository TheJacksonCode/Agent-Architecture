# A-05 Research Critic: Shell OTD DAT Hub Layout Analysis & Adaptation Specification

**Source:** `Shell OTD DAT Hub v1.0.0.html` (5,782 lines, single-file enterprise dashboard)
**Target:** AI Agent Architecture Masterclass with Interactive System Designer
**Date:** 2026-03-30

---

## PART 1: SOURCE ANALYSIS

### 1.1 Layout Architecture

The Shell DAT Hub uses a **3-column CSS Grid** system with a sticky topbar:

```
TOPBAR (sticky, z-index:10, 100% width)
+----------------------------------------------+
| [Logo] Shell DAT — Benelux   [Env pill] [Theme] |
+----------------------------------------------+

MAIN GRID (max-width: 2200px, margin: 0 auto)
+----------+-------------------+------------------+
| SIDEBAR  |    CONTENT        |  EMBED/PREVIEW   |
| 260px    | minmax(420px,1fr) | minmax(55vw,1fr) |
| sticky   | scrollable        | sticky            |
| top:64px | flex-column       | top:64px         |
+----------+-------------------+------------------+
```

**Key CSS declaration:**
```css
.app {
  display: grid;
  grid-template-columns: 260px minmax(420px,1fr) minmax(55vw,1fr);
  gap: 16px;
  padding: 16px;
  max-width: 2200px;
  margin: 0 auto;
}
```

**Design properties shared across all columns:**
- `background: var(--card)` -- white in light, `#0b1528` in dark
- `border: 1px solid var(--bd)` -- `#E5E7EB` light / `#334155` dark
- `border-radius: 14px`
- `box-shadow: 0 6px 24px rgba(2,8,23,.06)` (elevated in dark)

**Sidebar** is `position: sticky; top: 64px; align-self: start` -- it stays in view while the content column scrolls. The embed panel mirrors this sticky behavior.

**Content column** uses `display: flex; flex-direction: column; gap: 12px` -- cards stack vertically. Only the visible panel is shown (`display: block`); all others are `display: none`.

**Embed/preview panel** has a fixed height of `78vh`, with an internal toolbar row and a dark viewport area for iframes.

### 1.2 Navigation Patterns

The sidebar contains **two navigation groups**, visually separated by `.section` labels:

**Group 1: Menu (panel switchers)**
Seven `navbtn` elements with `data-panel` attributes. Clicking one:
1. Removes `.active` from all panel navbtns
2. Adds `.active` to the clicked button
3. Iterates all `#panel-*` containers, showing the matching one, hiding the rest
4. Triggers lazy initialization for certain panels (`renderContacts()`, `initSopDatabase()`)

**Group 2: Branches (decision tree shortcuts)**
Fourteen `navbtn` elements with `data-branch` attributes. These directly call render functions that inject HTML into `#workspace` inside the decision panel.

**Key pattern: the `act()` router.** A single delegated click handler on `document` catches all `[data-act]` clicks and routes via `data-go` values to specific render functions. This creates a **declarative routing system** without any framework -- just data attributes and a giant if-chain.

```
User clicks [data-branch="Site issues"]
  -> renderSiteIssues()
    -> W.innerHTML = card(...)  // renders sub-buttons
      -> User clicks [data-act="go" data-go="stock"]
        -> act(el)
          -> renderStockIssues()
            -> W.innerHTML = card(...)  // renders country buttons
```

The navigation depth can be 3-4 levels, always replacing `W.innerHTML` and providing a "Back" button with `data-act="go" data-go="parentRoute"`.

### 1.3 Interactive Elements

**Buttons (`.btn`):**
- Default: card-bg + border + 10px border-radius
- `.primary`: red background, white text
- `.yellow`: Shell yellow background
- `[disabled]`: desaturated, `pointer-events: none`, cursor not-allowed
- Hover: `translateY(-1px)` + elevated box-shadow (spring effect)

**Nav buttons (`.navbtn`):**
- Flex row with `justify-content: space-between`
- Active: `border-color: var(--r)` (Shell red)
- Secondary label via `<span class="small">`

**Forms:**
- Radio buttons generated via helper: `radio(name, [[value, label], ...])`
- Search inputs with `.search` class (full-width, rounded)
- Select dropdowns for category filtering
- Copy-to-clipboard via `copyById()` using `document.execCommand('copy')`

**Embed panel toolbar:**
- Row of `.btn` elements with `data-open` URLs
- Special "Open in new tab" primary button
- iframe viewport with dark background and centered hint text
- Loading: `iframe.src = url`, hint hidden via `display: none`

**Decision tree steps:**
```html
<div class="step">
  <div class="title">
    <span class="pilln pok">1</span> Step title
  </div>
  <div class="desc">Step description with inline buttons and radio inputs</div>
</div>
```

Step pills use status colors: `.pok` (green), `.pwa` (amber), `.pba` (red).

### 1.4 Data Presentation

**Tables (`.table`):** Used for SOP database. `border-collapse: separate; border-spacing: 0 6px` creates visual row gaps. Each `<td>` has individual border-radius, giving a card-row feel. Columns: ID | Title+Category | Action button.

**Cards (`.card`):** Universal container. 14px padding, elevated shadow with inner white-line effect (`inset 0 1px 0 rgba(255,255,255,.04)`).

**Grids:** `.g2` = 2-column, `.g3` = 3-column, both using `repeat(N, minmax(0,1fr))`.

**Callouts (`.callout`):** Left border accent (Shell red), light background tint, used for warnings and tips.

**Steps:** Left border accent (gray default), numbered pills with color-coded status. Content is descriptive text with embedded action buttons.

**Hero card:** Top of content column, flex row with `justify-content: space-between`, title + subtitle.

### 1.5 Responsive Breakpoints

Two breakpoints, progressively degrading:

```css
@media (max-width: 1200px) {
  .app { grid-template-columns: 260px minmax(420px,1fr); }
  .embed { display: none; }
}
/* Embed panel disappears entirely. 2-column layout. */

@media (max-width: 840px) {
  .app { grid-template-columns: 1fr; }
  .sidebar { position: relative; top: 0; }
}
/* Full single-column stack. Sidebar loses sticky behavior. */
```

**Strategy:** The embed panel is treated as optional -- it is completely hidden on tablets. The sidebar remains on tablets but collapses into the flow on mobile. Content is always visible.

### 1.6 Dark/Light Theme System

**Mechanism:** `data-theme="dark"` attribute on `<html>`. Toggled via button click that reads current state and flips.

**CSS variable overrides:**
```css
:root {
  --ink: #0F172A;  --muted: #64748B;  --card: #fff;
  --soft: #F6F7F9; --bd: #E5E7EB;
}
:root[data-theme=dark] {
  --ink: #F8FAFC;  --muted: #CBD5E1;  --card: #0b1528;
  --soft: #060b14; --bd: #334155;
}
```

**Body background changes dynamically via JS** (not just CSS variables) because the background uses multi-stop gradients:
- Light: `linear-gradient(180deg, var(--soft), #e6ebf2 50%, #dde3ec)`
- Dark: `radial-gradient(900px 420px at -10% -20%, #1b263b, transparent), radial-gradient(800px 400px at 120% -10%, #1d3557, transparent), linear-gradient(180deg, #0f1528, #0b1220 50%, #0a0f1a)`

**Additional background modes** (vintage, futuristic) swap the body gradient independently.

**Dark mode overrides** force readable text on interactive elements via `!important` declarations, keeping the topbar black-text regardless of mode.

**Persistence:** `localStorage` stores both `theme` and `bgMode`, applied on page load.

---

## PART 2: ADAPTATION SPECIFICATION FOR AI AGENT ARCHITECTURE MASTERCLASS

### 2.1 Adapted 3-Column Layout

```
TOPBAR (sticky)
+------------------------------------------------------------------+
| [AI Logo] Agent Architecture Masterclass  [Progress: 4/12] [Theme] |
+------------------------------------------------------------------+

MAIN GRID
+------------------+---------------------+-------------------------+
| LEFT SIDEBAR     |   CONTENT COLUMN    |  SYSTEM DESIGNER PANEL  |
| 280px            | minmax(440px,1fr)   | minmax(50vw,1fr)        |
| sticky, top:56px | scrollable          | sticky, top:56px        |
|                  |                     | height: 82vh            |
| - Section nav    | - Educational       | - Agent palette         |
| - Progress       |   content           | - Canvas (SVG/Canvas)   |
|   tracker        | - Interactive       | - Connection wires      |
| - Agent roster   |   exercises         | - Properties panel      |
| - Model costs    | - Code snippets     | - Export toolbar         |
+------------------+---------------------+-------------------------+
```

```css
.masterclass {
  display: grid;
  grid-template-columns: 280px minmax(440px,1fr) minmax(50vw,1fr);
  gap: 16px;
  padding: 16px;
  max-width: 2400px;
  margin: 0 auto;
}
```

### 2.2 Left Sidebar: Section Nav + Progress + Agent Roster

**Section navigation** (adapted from Shell's `data-panel` pattern):
```
[Section] COURSE MODULES
  [1. Why Multi-Agent?]        [Completed]
  [2. Architecture Patterns]   [Current]
  [3. Orchestration]           [Locked]
  [4. Cost Optimization]       [Locked]
  ...

[Section] YOUR AGENTS
  [Planner]    Opus    [$0.015/1K]
  [Researcher] Sonnet  [$0.003/1K]
  [Coder]      Haiku   [$0.001/1K]
  [Critic]     Sonnet  [$0.003/1K]

[Section] LIVE STATS
  Total agents: 4
  Est. cost/run: $0.089
  Pattern: Hub & Spoke
```

**Implementation details:**

- Section nav uses Shell's `navbtn` pattern with `data-panel` for switching content. Add `.completed`, `.current`, `.locked` states with distinct pill colors (green/amber/gray) -- directly borrowing the `.pilln` `.pok`/`.pwa` system.
- Agent roster is dynamically populated from the designer canvas. Each entry is a navbtn-styled row showing agent name, assigned model, and per-token cost.
- Progress tracker at top uses a segmented bar (CSS gradient or flex segments) showing completed/total sections.
- Lock system: use the Shell `[disabled]` button pattern for locked sections. `pointer-events: none; filter: saturate(0.4) brightness(0.95)`.

### 2.3 Content Column: Educational Material + Exercises

Adapts Shell's multi-panel switching and decision tree step pattern.

**Panel types (switching via sidebar navbtns):**

1. **Lesson panels** -- Markdown-like content rendered in `.card` containers. Use Shell's `.step` pattern for structured walkthroughs:
   ```
   Step 1 [green pill]: Define the task decomposition
   Step 2 [amber pill]: Assign specialist agents
   Step 3 [red pill]:   Define communication protocol
   ```

2. **Exercise panels** -- Interactive decision trees. Adapt Shell's `data-act` + `data-go` routing:
   ```
   "Your user wants to analyze 500 PDFs and generate summaries.
    Which architecture pattern fits best?"

   [Single Agent]  [Pipeline]  [Hub & Spoke]  [Autonomous Swarm]

   -> Clicking "Pipeline" reveals:
      "Correct! A pipeline works well for sequential ETL-like tasks."
      [Now: drag agents onto the canvas to build it ->]
   ```

3. **Code panels** -- Pseudo-code examples in monospace blocks. Adapt Shell's callout pattern for important notes. Include "Copy" buttons using the `copyById()` pattern.

4. **Quiz panel** -- Directly adapted from Shell's HSSE quiz system. Random questions from a question bank about agent architectures, model selection, cost tradeoffs.

**Key content interaction patterns:**
- Radio-based choices (Shell's `radio()` helper) for multiple-choice exercises
- Callout boxes for important architectural rules (like Shell's golden rules)
- Inline "Open in designer" buttons that pre-populate the canvas with a given architecture
- Breadcrumb navigation: "Module 2 > Exercise 3 > Step 2" using Shell's back-button pattern

### 2.4 Right Panel: Interactive System Designer

This is the core innovation, replacing Shell's embed/iframe panel with a **live canvas-based agent architecture designer**.

#### 2.4.1 Panel Structure

```
+-----------------------------------------------+
| TOOLBAR                                        |
| [Clear] [Undo] [Redo] | [Export SVG] [Export   |
| [Snap Grid] [Auto-layout]| Code] [Cost Report] |
+-----------------------------------------------+
| AGENT PALETTE (collapsible)                    |
| [Planner] [Researcher] [Coder] [Critic]       |
| [Summarizer] [Router] [Validator] [Custom...] |
+-----------------------------------------------+
|                                                |
|           CANVAS AREA                          |
|    (SVG or HTML5 Canvas, dark bg)              |
|                                                |
|    +--------+        +--------+                |
|    |Planner |------->|Research|                |
|    | Opus   |        | Sonnet |                |
|    +--------+        +--------+                |
|         |                 |                    |
|         v                 v                    |
|    +--------+        +--------+                |
|    | Coder  |<-------| Critic |                |
|    | Haiku  |        | Sonnet |                |
|    +--------+        +--------+                |
|                                                |
+-----------------------------------------------+
| PROPERTIES PANEL (shown when node selected)    |
| Agent: Researcher                              |
| Model: [Opus v] [Sonnet v] [Haiku v]          |
| Role:  [text input]                            |
| System prompt: [textarea]                      |
| Max tokens: [1024 v]                           |
| Temperature: [0.7 slider]                      |
+-----------------------------------------------+
| COST ESTIMATE BAR                              |
| 4 agents | ~$0.089/run | Pattern: Hub & Spoke |
+-----------------------------------------------+
```

#### 2.4.2 Agent Palette

Pre-defined agent types with icons, draggable onto the canvas:

| Agent Type  | Default Model | Icon  | Color     | Role Description                    |
|-------------|---------------|-------|-----------|-------------------------------------|
| Planner     | Opus          | brain | `#F5A623` | Decomposes tasks, creates plans     |
| Researcher  | Sonnet        | search| `#5B8DEF` | Gathers information, reads files    |
| Coder       | Haiku         | code  | `#2DD4A0` | Writes and edits code               |
| Critic      | Sonnet        | eye   | `#E85D75` | Reviews output, catches errors      |
| Summarizer  | Haiku         | doc   | `#9B59B6` | Condenses information               |
| Router      | Haiku         | split | `#FF8C42` | Routes tasks to appropriate agents  |
| Validator   | Haiku         | check | `#17A589` | Verifies outputs against criteria   |
| Custom      | Sonnet        | star  | `#CBD5E1` | User-defined agent                  |

**Drag-and-drop implementation:**
```javascript
// HTML5 Drag API
palette.querySelectorAll('.agent-chip').forEach(chip => {
  chip.draggable = true;
  chip.addEventListener('dragstart', e => {
    e.dataTransfer.setData('agent-type', chip.dataset.type);
  });
});

canvas.addEventListener('drop', e => {
  e.preventDefault();
  const type = e.dataTransfer.getData('agent-type');
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  addAgentNode(type, x, y);
});
```

#### 2.4.3 Canvas System

**Technology: SVG-based**, rendered inside a container div that mirrors Shell's `.viewport` pattern (dark background, full remaining height).

**Agent nodes** are SVG `<g>` groups:
```svg
<g class="agent-node" data-id="agent-1" transform="translate(120,80)">
  <rect width="140" height="72" rx="12" fill="#111E33" stroke="#F5A623" stroke-width="2"/>
  <text x="70" y="24" text-anchor="middle" fill="#E8E0D6" font-weight="700">Planner</text>
  <text x="70" y="44" text-anchor="middle" fill="#9B8E82" font-size="11">Opus 4</text>
  <text x="70" y="60" text-anchor="middle" fill="#F5A623" font-size="10">$0.015/1K tok</text>
  <!-- Connection ports (circles at edges) -->
  <circle cx="70" cy="0" r="6" fill="#334155" class="port port-in"/>
  <circle cx="70" cy="72" r="6" fill="#334155" class="port port-out"/>
  <circle cx="0" cy="36" r="6" fill="#334155" class="port port-in"/>
  <circle cx="140" cy="36" r="6" fill="#334155" class="port port-out"/>
</g>
```

**Connections** are SVG `<path>` elements using cubic Bezier curves:
```svg
<path d="M 190,116 C 240,116 260,200 310,200"
      stroke="#F5A623" stroke-width="2" fill="none"
      marker-end="url(#arrowhead)"/>
```

**Interaction model:**
1. Click agent in palette or drag onto canvas to create node
2. Click and drag node to reposition (update `transform`)
3. Drag from output port to input port to create connection
4. Click connection to select (shows delete option)
5. Click node to select -> shows properties panel below canvas
6. Double-click node to edit name inline
7. Right-click node for context menu (duplicate, delete, change model)

**Data flow animation:**
```javascript
function animateDataFlow() {
  connections.forEach(conn => {
    const dot = document.createElementNS(SVG_NS, 'circle');
    dot.setAttribute('r', '4');
    dot.setAttribute('fill', '#2DD4A0');

    const path = conn.pathElement;
    const length = path.getTotalLength();

    let progress = 0;
    function step() {
      progress += 2;
      if (progress > length) { dot.remove(); return; }
      const pt = path.getPointAtLength(progress);
      dot.setAttribute('cx', pt.x);
      dot.setAttribute('cy', pt.y);
      requestAnimationFrame(step);
    }
    svgCanvas.appendChild(dot);
    requestAnimationFrame(step);
  });
}
```

Small glowing dots travel along the Bezier paths from output ports to input ports, visualizing data flow through the pipeline. Animation triggers on "Play" button or when user completes an architecture.

#### 2.4.4 Properties Panel

Shown below the canvas when a node is selected (collapsible). Adapts Shell's form patterns:

- **Model selector:** Three styled buttons (not a dropdown) -- mimics Shell's grid button layout:
  ```
  [Opus 4]  [Sonnet 4]  [Haiku 4]
  $15/MTi   $3/MTi      $1/MTi
  ```
  Active model gets `.primary` styling (adapted from Shell's red primary).

- **Role input:** Text input (`.search` class adapted)
- **System prompt:** Textarea with character count
- **Temperature slider:** Range input 0.0-1.0 with numeric display
- **Max tokens:** Dropdown selector

Changes propagate immediately to the canvas node display and cost calculations.

#### 2.4.5 Connection Types

Users can label connections to indicate data flow type:

| Connection Type | Color     | Dash Pattern | Label         |
|-----------------|-----------|--------------|---------------|
| Task            | `#F5A623` | solid        | "task"        |
| Result          | `#2DD4A0` | solid        | "result"      |
| Feedback        | `#E85D75` | dashed       | "feedback"    |
| Broadcast       | `#5B8DEF` | dotted       | "broadcast"   |

### 2.5 Export System

Four export modes, accessible from toolbar buttons (adapting Shell's embed toolbar pattern):

#### 2.5.1 Architecture Diagram SVG Export

Serializes the current SVG canvas to a downloadable `.svg` file:

```javascript
function exportSVG() {
  const svgClone = svgCanvas.cloneNode(true);
  // Add white background rect for standalone viewing
  const bg = document.createElementNS(SVG_NS, 'rect');
  bg.setAttribute('width', '100%');
  bg.setAttribute('height', '100%');
  bg.setAttribute('fill', '#0C1425');
  svgClone.insertBefore(bg, svgClone.firstChild);

  // Add title and legend
  appendLegend(svgClone);

  const blob = new Blob([new XMLSerializer().serializeToString(svgClone)],
                        {type: 'image/svg+xml'});
  downloadBlob(blob, 'agent-architecture.svg');
}
```

The exported SVG includes:
- All agent nodes with labels and model names
- All connections with arrow markers and labels
- A legend showing agent types and connection types
- Title block with date and cost estimate
- Clean dark background suitable for presentations

#### 2.5.2 Pseudo-code Export

Generates runnable-looking pseudo-code from the graph structure:

```python
# Agent Architecture: Hub & Spoke
# Generated: 2026-03-30
# Estimated cost per run: $0.089

from agent_sdk import Agent, Pipeline, Router

# --- Agent Definitions ---
planner = Agent(
    name="Planner",
    model="claude-opus-4",
    system_prompt="You decompose complex tasks into subtasks...",
    temperature=0.3,
    max_tokens=2048
)

researcher = Agent(
    name="Researcher",
    model="claude-sonnet-4",
    system_prompt="You gather and analyze information...",
    temperature=0.5,
    max_tokens=4096
)

coder = Agent(
    name="Coder",
    model="claude-haiku-3",
    system_prompt="You write clean, tested code...",
    temperature=0.2,
    max_tokens=8192
)

critic = Agent(
    name="Critic",
    model="claude-sonnet-4",
    system_prompt="You review outputs for errors...",
    temperature=0.4,
    max_tokens=2048
)

# --- Connections ---
pipeline = Pipeline([
    planner >> researcher,   # task
    researcher >> coder,     # result
    coder >> critic,         # result
    critic >> planner,       # feedback (loop)
])

# --- Run ---
result = pipeline.run("Analyze customer data and build dashboard")
```

**Generation algorithm:**
1. Topological sort of the agent graph
2. Detect cycles -> mark as feedback loops
3. Identify pattern (linear = Pipeline, star = Hub & Spoke, etc.)
4. Template each agent with its properties
5. Template connections using `>>` operator notation
6. Wrap in imports and run block

#### 2.5.3 Cost Estimate Report

Generates a detailed cost breakdown card (rendered in-panel or downloadable):

```
+--------------------------------------------------+
| COST ESTIMATE REPORT                              |
| Architecture: Hub & Spoke | 4 agents              |
+--------------------------------------------------+
| Agent       | Model  | In/1K  | Out/1K | Est/run |
|-------------|--------|--------|--------|---------|
| Planner     | Opus   | $0.015 | $0.075 | $0.031  |
| Researcher  | Sonnet | $0.003 | $0.015 | $0.014  |
| Coder       | Haiku  | $0.001 | $0.005 | $0.008  |
| Critic      | Sonnet | $0.003 | $0.015 | $0.012  |
+--------------------------------------------------+
| TOTAL PER RUN                            $0.065  |
| ESTIMATED DAILY (100 runs)               $6.50   |
| ESTIMATED MONTHLY (3000 runs)            $195.00 |
+--------------------------------------------------+
| Optimization tips:                                |
| - Critic could use Haiku (-40% on that node)     |
| - Planner prompt is short; Sonnet may suffice    |
+--------------------------------------------------+
```

Uses Shell's `.table` styling with `.pilln` cost indicators.

#### 2.5.4 Architecture Pattern Detection

The system analyzes the graph topology and classifies it:

| Pattern Detected    | Condition                                               |
|--------------------|---------------------------------------------------------|
| Single Agent       | 1 node, no connections                                   |
| Linear Pipeline    | All nodes in a single chain, no branches                 |
| Hub & Spoke        | One node connects to 3+ others, others connect only to hub |
| Parallel Fan-out   | One node outputs to N nodes, all converge to one node    |
| Feedback Loop      | Cycle detected in graph                                  |
| Autonomous Swarm   | 3+ nodes with 3+ bidirectional connections               |
| Custom/Hybrid      | None of the above                                        |

Detection result is shown in the cost bar at the bottom and used in exports.

### 2.6 Theme System

Adapt Shell's `data-theme` approach with the existing masterclass palette:

```css
:root {
  /* Dark mode (default for masterclass) */
  --bg-void: #050A14;
  --bg-surface: #0C1425;
  --bg-card: #0F1929;
  --accent-primary: #F5A623;
  --accent-secondary: #2DD4A0;
  --accent-danger: #E85D75;
  --text-primary: #E8E0D6;
  --border-subtle: #1A2540;
}

:root[data-theme=light] {
  --bg-void: #F8F9FA;
  --bg-surface: #FFFFFF;
  --bg-card: #FFFFFF;
  --accent-primary: #D4880E;
  --accent-secondary: #1A9E78;
  --accent-danger: #C4384F;
  --text-primary: #1A1A2E;
  --border-subtle: #E5E7EB;
}
```

Canvas background should remain dark in both themes for contrast. Use Shell's strategy of JS-driven body gradient changes for the overall page feel, but keep the designer viewport always dark.

### 2.7 Responsive Behavior

Directly adapted from Shell's breakpoint strategy:

```css
@media (max-width: 1400px) {
  .masterclass {
    grid-template-columns: 280px minmax(440px,1fr);
  }
  .designer-panel {
    display: none;
  }
  /* Show inline mini-designer in content column instead */
  .designer-inline {
    display: block;
  }
}

@media (max-width: 900px) {
  .masterclass {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: relative;
    top: 0;
  }
  /* Sidebar becomes horizontal scroll nav */
  .sidebar .nav {
    flex-direction: row;
    overflow-x: auto;
    gap: 8px;
  }
}
```

**Critical difference from Shell:** The designer panel cannot simply disappear on tablet -- it is the core interactive feature. At the 1400px breakpoint, convert it to a **full-width inline card** below the content, rather than hiding it entirely. Use a tab system: [Content] [Designer] to toggle between reading and building.

### 2.8 Data Architecture (JavaScript)

Adapt Shell's single-IIFE, no-framework architecture:

```javascript
(()=>{
  "use strict";

  // === State ===
  const state = {
    agents: [],        // {id, type, model, x, y, name, role, systemPrompt, temp, maxTokens}
    connections: [],   // {id, fromId, fromPort, toId, toPort, type, label}
    selectedId: null,
    currentModule: 'intro',
    completedModules: new Set(),
    theme: localStorage.getItem('theme') || 'dark'
  };

  // === Model Pricing ===
  const MODELS = {
    'opus':   { label: 'Opus 4',   inputPer1K: 0.015, outputPer1K: 0.075, color: '#F5A623' },
    'sonnet': { label: 'Sonnet 4', inputPer1K: 0.003, outputPer1K: 0.015, color: '#5B8DEF' },
    'haiku':  { label: 'Haiku 4',  inputPer1K: 0.001, outputPer1K: 0.005, color: '#2DD4A0' }
  };

  // === Agent Templates ===
  const AGENT_TYPES = {
    planner:    { label: 'Planner',    defaultModel: 'opus',   icon: '...', color: '#F5A623' },
    researcher: { label: 'Researcher', defaultModel: 'sonnet', icon: '...', color: '#5B8DEF' },
    coder:      { label: 'Coder',      defaultModel: 'haiku',  icon: '...', color: '#2DD4A0' },
    critic:     { label: 'Critic',     defaultModel: 'sonnet', icon: '...', color: '#E85D75' },
    summarizer: { label: 'Summarizer', defaultModel: 'haiku',  icon: '...', color: '#9B59B6' },
    router:     { label: 'Router',     defaultModel: 'haiku',  icon: '...', color: '#FF8C42' },
    validator:  { label: 'Validator',  defaultModel: 'haiku',  icon: '...', color: '#17A589' },
    custom:     { label: 'Custom',     defaultModel: 'sonnet', icon: '...', color: '#CBD5E1' }
  };

  // === Delegated Event Handler (Shell pattern) ===
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-panel],[data-agent],[data-export],[data-model],[data-action]');
    if (!t) return;

    if (t.dataset.panel)  switchPanel(t.dataset.panel);
    if (t.dataset.agent)  addAgentToCanvas(t.dataset.agent);
    if (t.dataset.export) handleExport(t.dataset.export);
    if (t.dataset.model)  setModelForSelected(t.dataset.model);
    if (t.dataset.action) handleAction(t.dataset.action);
  });

  // === Rendering functions (Shell innerHTML pattern) ===
  function renderModule(moduleId) { /* ... */ }
  function renderAgentRoster()    { /* ... */ }
  function renderProperties()     { /* ... */ }
  function renderCostBar()        { /* ... */ }
  function renderCanvas()         { /* ... */ }

  // === Export functions ===
  function exportSVG()            { /* ... */ }
  function exportPseudoCode()     { /* ... */ }
  function exportCostReport()     { /* ... */ }

  // === Canvas interaction ===
  function addAgentNode(type, x, y)       { /* ... */ }
  function createConnection(from, to)      { /* ... */ }
  function detectPattern()                 { /* ... */ }
  function animateDataFlow()               { /* ... */ }
  function autoLayout()                    { /* ... */ }

  // === Init ===
  applyTheme(state.theme);
  renderModule('intro');
})();
```

### 2.9 Pre-built Architecture Templates

Borrowing Shell's branch-button pattern, offer one-click template loading:

```
[Load Template]
+---------+---------+---------+---------+
| Simple  | Pipeline| Hub &   | Feedback|
| Chat    | (ETL)   | Spoke   | Loop    |
+---------+---------+---------+---------+
| Fan-out | Swarm   | Critic  | Custom  |
| Merge   |         | Chain   | (blank) |
+---------+---------+---------+---------+
```

Each template pre-populates the canvas with correctly positioned and connected agents, serving as both a learning tool and a starting point for customization.

### 2.10 Content-Designer Integration Points

The key innovation is that the content column and designer panel communicate:

1. **"Try it" buttons in lessons** call `loadTemplate('hub-spoke')` to populate the canvas
2. **Exercise validation** checks the canvas state: "Does your architecture have a feedback loop? Add one to continue."
3. **Quiz answers** can reference the current design: "Based on your 4-agent pipeline, what is the estimated cost?"
4. **Progress unlocking** requires building specific architectures in the designer
5. **Agent roster in sidebar** updates in real-time as the canvas changes
6. **Cost bar** recalculates on every change, providing immediate feedback

---

## PART 3: IMPLEMENTATION PRIORITIES

### Phase 1 -- Core Shell Layout (adapt CSS grid + panels)
- 3-column grid with responsive breakpoints
- Sidebar with section nav and panel switching
- Content panels with educational material
- Theme system with localStorage persistence

### Phase 2 -- Static Designer
- Agent palette with drag targets
- SVG canvas with node rendering
- Node selection and properties panel
- Model assignment UI

### Phase 3 -- Connections & Interaction
- Port-to-port connection drawing
- Connection type selection
- Auto-layout algorithm (Dagre or custom topological)
- Snap-to-grid

### Phase 4 -- Exports & Animation
- SVG export with legend
- Pseudo-code generation
- Cost calculation engine
- Data flow animation

### Phase 5 -- Content Integration
- Exercise validation against canvas state
- Template loading from lesson buttons
- Progress tracking with localStorage
- Quiz system (adapted from Shell HSSE)

---

## APPENDIX: Pattern Comparison Table

| Shell DAT Hub Feature         | Masterclass Adaptation                          |
|-------------------------------|------------------------------------------------|
| Sidebar panel navbtns         | Module navigation with progress indicators      |
| Branch buttons (data-branch)  | Architecture template selectors                 |
| Decision tree steps           | Lesson step-by-step guides                      |
| Radio form inputs             | Multiple-choice exercises                       |
| SOP database table            | Agent type catalog / model comparison table      |
| Search + filter               | Agent palette search + model filter              |
| Embed iframe panel            | SVG canvas designer                             |
| Embed toolbar                 | Designer toolbar (export, layout, animate)       |
| "Open in new tab" button      | "Export SVG" / "Export Code" buttons             |
| HSSE quiz                     | Architecture knowledge quiz                     |
| Contacts directory            | Agent roster / model directory                   |
| Background themes             | Canvas theme / presentation mode                 |
| Callout boxes                 | Architecture best-practice callouts              |
| Step pills (ok/warn/bad)      | Agent status indicators (active/idle/error)      |
| `act()` router                | `handleAction()` router for all interactions     |
| `W.innerHTML = card(...)`     | Panel content injection pattern                  |
| `localStorage` persistence    | Save/load architectures + progress               |
| `copyById()` clipboard        | Copy exported pseudo-code to clipboard           |

---

*End of A-05 Research Critic analysis. This document provides the full design specification for adapting the Shell OTD DAT Hub 3-column enterprise layout into an interactive AI Agent Architecture Masterclass with a live system designer.*
