# Agent Architecture Designer

> Visual multi-agent system designer for Claude Code - built to help developers **understand how each agent thinks, what it does, and how teams collaborate**.

<p align="center">
  <img src="docs/Animation.gif" alt="Agent Architecture Designer - Live Simulation demo" width="800">
</p>

<p align="center">
  <a href="https://github.com/TheJacksonCode/Agent-Architecture/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
  <a href="https://thejacksoncode.github.io/Agent-Architecture/"><img src="https://img.shields.io/badge/live_demo-GitHub_Pages-7C3AED.svg" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/version-v32.16-F59E0B.svg" alt="v32.16">
  <img src="https://img.shields.io/badge/agents-35-818CF8.svg" alt="35 Agents">
  <img src="https://img.shields.io/badge/presets-42-34D399.svg" alt="42 Presets">
  <img src="https://img.shields.io/badge/languages-PL_EN-06B6D4.svg" alt="PL/EN">
  <img src="https://img.shields.io/badge/dependencies-zero-F87171.svg" alt="Zero Dependencies">
</p>

---

## Why this exists

Agent Architecture Designer is **primarily an educational and developmental tool**. It is not a production orchestrator - it is a place where you can slow down and study multi-agent systems the way you would study a complex machine: one moving part at a time.

The goal is that after using it, you should be able to:

- **Understand what every single agent actually does** - its role, inputs, outputs, anti-patterns, and failure modes
- **Understand how agents talk to each other** - who hands off to whom, which phases they live in, where the friction is
- **Understand why a given preset looks the way it does** - why it has 7 agents and not 12, why a Five Minds debate sits in the middle, why the HITL gate lives where it lives
- **Understand the cost and context budget of a multi-agent system** before you ever spend a token

You can use it as a visual designer, but the real value is the **Encyclopedia** behind every agent and every preset. Each entry is structured like a short lesson: who it is, how it works in phases, what it does, what it does NOT do, anti-patterns, real-world examples, when it fails, and fun facts.

## What you can do with it

1. **Learn**. Click any of the 35 agents or 42 presets and read a full encyclopedia entry. This is the main use case.
2. **Design**. Drag agents onto a canvas, connect them, assign models (Opus / Sonnet / Haiku), and generate a ready-to-use system prompt for Claude Code.
3. **Simulate**. Run a live simulation where agents exchange animated messages and pass through HITL decision gates, so you can see the flow before you commit to it.
4. **Budget**. Open the Cost Command Center to see per-agent / per-phase cost estimates, context window pressure, and what-if scenarios (all Opus, all Sonnet, all Haiku).
5. **Export**. Copy a system prompt, a Mermaid diagram of the team, a Markdown report, CSV, or JSON.

No installation. No npm. No build step. It is a **single HTML file** that works offline.

## Languages - Polish and English

The interface is fully bilingual with a one-click language toggle. **Polish is more comprehensive than English** - because the author is Polish and because a larger Polish knowledge base was available during research. Specifically:

- All 35 agent + 42 preset encyclopedia entries exist in both languages (v32.16 closed the last gap)
- The Polish version ships with **inline infographics** for selected agents and presets, rendered directly in the encyclopedia bento - the English version does not have the infographics yet
- Polish is the default authoring language; English translations are technical/direct US English with no em/en-dashes

If you are an English-speaking user and feel something is missing, please open an issue or use the feedback link at the bottom of the README - we want to know which parts you would like to see expanded.

## Live demo

[**Open Agent Architecture Designer**](https://thejacksoncode.github.io/Agent-Architecture/) on GitHub Pages.

Start with the preset **Deep Five Minds Ultimate** for the full experience, click any agent to open its encyclopedia, then press **Simulation** to watch the team run.

## Key features

- **Visual canvas** - drag and drop 35 agents, draw connections, marquee-select groups, auto-place with smart suggestions, right-click context menu
- **Agent encyclopedia (Universal)** - every one of the 35 agents and 42 presets has a 10-section bento entry: who I am, analogy, how I work (phase-by-phase), what I do, what I do NOT do, real-world scenario, when I fail, facts, deep dive, team composition
- **Preset encyclopedia (Universal)** - every one of the 42 presets has a dual-column green-light / red-light verdict panel, phase flow, and agent roster with model hints
- **Five Minds Protocol** - structured adversarial debate with 4 domain experts + Devil's Advocate producing a Gold Solution. As of April 2026 there is no public equivalent
- **HITL decision gates** - 3 human checkpoints between phases, 120-second countdown, auto-decide fallback, Decision Presenter agent
- **Live simulation** - agents exchange animated speech bubbles and data packets along their connections; Dialog Timeline logs everything
- **Mission Control** - fullscreen cinematic simulation dashboard with real-time metrics, phase timeline, and communications log
- **Cost Command Center** - per-agent / per-phase cost estimates, p50-p90 range, context window usage, model mix, what-if sliders, export to Markdown / CSV / JSON
- **Custom Agent Creator Pro** - 7-feature builder (clone, live preview with quality score, icon picker with 159 icons, color swatches, MD export/import, wizard mode, mock testing playground)
- **Dark / Light theme** - complete CSS variable system, APCA-compliant ink tokens, CVD-safe Okabe-Ito phase palette
- **Bilingual PL/EN** - every UI string, every encyclopedia entry, every cost modal label
- **Accessibility** - WCAG 2.2 ARIA, prefers-reduced-motion, keyboard navigation, focus-visible, skip link, SR announcer
- **Zero dependencies** - no npm, no CDN, no build step. One HTML file

## What lives on the canvas

### 35 agents

| Category | Agents | Phase | Typical model |
|----------|--------|-------|---------------|
| **Orchestration** | Orchestrator, Synthesizer | Strategy | Opus / Sonnet |
| **Planning** | Analyst, Planner | Strategy | Sonnet |
| **Research** | Tech, UX, Reddit, X/Twitter, GitHub, Forums, Docs (7 researchers) + Research Critic | Research | Haiku / Sonnet |
| **Build** | Backend, Frontend, Feature, Designer, Integrator, Writer | Build | Sonnet |
| **QA** | QA Security, QA Quality, QA Performance, QA Manager | QA | Haiku / Sonnet |
| **Five Minds** | Pragmatist, Innovator, Data Analyst, User Advocate, Shadow (Devil's Advocate) | Debate | Sonnet |
| **HITL** | Decision Presenter | HITL | Haiku |
| **Data / Ops / Product** | DB Architect, Observability Engineer, GTM Strategist, Statistician, EDA Analyst, Control Mapper, Telemetry Surfer | Build / Data / Compliance | Sonnet |

Every agent ships with a v28 research-backed prompt following ROLE / INPUT / OUTPUT / RESPONSIBILITIES / RULES / WHAT YOU DO NOT DO / REPORT FORMAT. Prompts are self-contained so an isolated subagent can execute without additional context.

### 42 presets, grouped by size

- **Minimal (2-3 agents)** - Solo + Validator, Quick Fix, Recon Squad, Classic Trio, Reflective Loop
- **Core (4-6 agents)** - Bug Hunter, Content Pipeline, Plan & Execute, Performance Boost, Startup MVP, Cascade Cost, Testing Suite, Accessibility Sprint
- **Advanced (6-11 agents)** - Security Hardening, Code Review, Design System, API Modernization, UI/UX Overhaul, Feature Sprint, Standard Dev, Data Pipeline, Research Swarm, Legacy Refactor, Microservices, plus research-backed "new tier" presets like Perf Squad, AB Test Lab, Tech Writing Pipe
- **Enterprise / flagship (10-27 agents)** - Full-Stack SaaS, Full Hierarchy, Five Minds Protocol, Deep Research+Build, Fullstack Premium, Deep Research Swarm Pro, SOC2 Sweep, Data Analysis Pipe, Incident War Room, Five Minds Strategic, and the flagship **Deep Five Minds Ultimate** (27 agents, 2 Five Minds debates, 3 HITL gates)

A subset of the presets carry a small green "NEW" badge - those are blueprint-based presets derived from papers and industry references (Anthropic Lead Researcher, Magentic-One, wshobson, arxiv 2510.04023 and others). Each has a ~250-word Polish detailed description explaining origin, idea, deliverables, ideal use cases, and anti-patterns.

## Screenshots

### Agent encyclopedia (10-section bento)
<img src="docs/screenshots/encyclopedia-bento.png" alt="Agent Encyclopedia - 10-section bento layout with numbered kickers" width="100%">

### Inline infographics (Polish encyclopedia)
<img src="docs/screenshots/polish-infographic.png" alt="Polish encyclopedia with inline base64 infographic" width="100%">

### Preset verdict panel (green / red)
<img src="docs/screenshots/preset-verdict.png" alt="Preset sidebar dual-column verdict panel" width="100%">

### Cost Command Center
<img src="docs/screenshots/cost-command-center.png" alt="Cost Command Center modal with donut, breakdown, what-if and export tabs" width="100%">

### Custom Agent Creator Pro
<img src="docs/screenshots/custom-agent-creator.png" alt="Custom Agent Creator Pro - wizard mode with icon picker and live preview" width="100%">

### Canvas (dark and light themes)
<img src="docs/screenshots/dark.png" alt="Dark theme - canvas with agents" width="49%"> <img src="docs/screenshots/light.png" alt="Light theme - canvas with agents" width="49%">

### Live simulation
<img src="docs/screenshots/simulation.png" alt="Live Simulation with speech bubbles" width="100%">

> **Note:** the `dark.png`, `light.png`, `simulation.png`, and legacy `encyclopedia.png` screenshots still show an earlier (v31) state of the app. They will be refreshed to v32.16 in a later pass; the first-priority screenshots above (encyclopedia bento, verdict panel, Cost Command Center, Custom Agent Creator, Polish infographic) are already on v32.16.

## Claude Code integration

Agent Architecture Designer ships with Claude Code skills in `.claude/skills/`:

- **five-minds/SKILL.md** - run a Five Minds Protocol debate on a design question
- **hitl-pipeline/SKILL.md** - run a pipeline with HITL decision gates between phases

Clone the repo and invoke as slash commands inside Claude Code (`/five-minds`, `/hitl-pipeline`):

```bash
git clone https://github.com/TheJacksonCode/Agent-Architecture.git
```

The `plugin.json` at the repo root makes this discoverable as a Claude Code plugin.

## Technical details

- **Format** - single HTML file, ~27500 lines, ~5.7 MB (includes all encyclopedia content in PL + EN, inline SVG icons, inline base64 infographics for Polish version)
- **Dependencies** - zero. No npm, no CDN, no build step
- **Stack** - Vanilla JS (ES2022) + inline SVG + CSS transitions + Canvas 2D + Web Animations API + container queries + View Transitions API
- **State** - localStorage persistence (canvas, theme, icon mode, language preference, custom agents). Versioned keys with automatic migration chain back to v32
- **Rendering** - hybrid architecture: Canvas 2D for particles and starfield, SVG for connections and icons, WAAPI for agent animations, CSS for UI chrome
- **Accessibility** - WCAG 2.2 ARIA, focus-visible, prefers-reduced-motion, keyboard navigation, SR announcer, skip link, APCA-compliant contrast
- **Icon system** - 159-icon library (stroke-based geometric SVG) + Imagen 4 generated PNG fallback mode
- **Fonts** - Space Grotesk / Inter / JetBrains Mono (single @import from Google Fonts)
- **Models** - Opus 4.6 ($15/MTok) for orchestration and mediation, Sonnet 4.6 ($3/MTok) for most agents, Haiku 4.5 ($0.25/MTok) for light research and HITL gating
- **Security** - `escHtml()` sweep across all `innerHTML` sinks, `escCsv()` with formula injection guard, `sanitizeMermaidLabel()`, `escMd()` for table cell escaping, `safeParseLS`/`safeSaveLS` with QuotaExceededError handling
- **Bilingual engine** - flat `I18N_EN.ui` lookup + 28 namespaces including 10 new v32.16 namespaces (eduAgent, eduPreset, agentLong/Mid/Green/Red, presetLong/Mid/Green/Red) for ~1694 translated fields

## Versioning

Each new version is saved as a **separate file** (`v32.1/`, `v32.2/`, ..., `v32.16/`). Previous versions remain untouched for reference and reuse of research. The root `index.html` always mirrors the latest shipped version.

See [CLAUDE.md](CLAUDE.md) for the full versioning policy and a changelog covering all versions from v1 through v32.16.

### Recent version highlights

| Version | Key innovation |
|---------|---------------|
| v28 | Research-backed prompts for all agents (ROLE/INPUT/OUTPUT/...) |
| v30-v31 | International Edition (PL/EN bilingual) + Audit Edition (XSS + WCAG 2.2) |
| v32-v32.4 | Token Cost HUD, Custom Agent Creator Pro, Icon Library Pro (159 icons), Icon Refit, **Cost Command Center** (dual-layer cost modal) |
| v32.5-v32.6 | Color Consistency (unified phase + model palette), **Premium Presets + Context Budget** (13 new blueprint presets, context window tracking) |
| v32.7-v32.8 | New Presets Integrated + Sonnet Violet, **Premium Visual Overhaul** (Material Expressive with Edge, APCA tokens, starfield preserved) |
| v32.11 | **Verdict Panel** - dual-column green/red card replacing 5 stacked sections in preset sidebar |
| v32.12 | Header Composition + Compact Controls (~144 px saved in the sidebar) |
| v32.13 | **Agent Detail Sidebar Premium Polish** - 10-section layout + facts counter + moPrompt modal |
| v32.14 | **Agent Encyclopedia Premium** - 10-section bento via container queries, zoom lightbox, inline base64 infographics (4 pilot agents) |
| v32.15 | **Encyclopedia Universal** - encyclopedia extended to all 35 agents + 42 presets |
| **v32.16** | **Universal Bilingual** - full EN parity for all encyclopedia content; 10 new I18N_EN namespaces; ~1694 translated fields via 18 parallel Sonnet translation agents |

## Feedback

This project is still growing and **we actively want your feedback** - especially on the educational side:

- Did the encyclopedia help you understand a specific agent you were confused about? Which one?
- Is there an agent role or pattern missing from the 35 / 42 catalog?
- Do you want infographics in the English version too?
- Did the Cost Command Center change how you think about multi-agent token budgets?

Please open a [GitHub issue](https://github.com/TheJacksonCode/Agent-Architecture/issues) or start a [discussion](https://github.com/TheJacksonCode/Agent-Architecture/discussions). Short comments and screenshots are very welcome.

## License

[MIT](LICENSE) - Copyright (c) 2026 TheJacksonCode

## Author

Built by **[TheJacksonCode](https://github.com/TheJacksonCode)**.

---

<sub>Interface languages: Polish (more comprehensive, with inline infographics) and English (full parity since v32.16) | Documentation language: English | Primary purpose: education and development - understanding how multi-agent systems think</sub>
