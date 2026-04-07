# Agent Architecture Designer

> Visual multi-agent system designer for Claude Code

<!-- Hero GIF - will be replaced with an actual recording -->
<p align="center">
  <em>[hero.gif placeholder - 15s recording: load preset - Live Simulation - agents talking - HITL gate]</em>
</p>

<p align="center">
  <a href="https://github.com/TheJacksonCode/Agent-Architecture/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
  <a href="https://thejacksoncode.github.io/Agent-Architecture/"><img src="https://img.shields.io/badge/Claude_Code-plugin-7C3AED.svg" alt="Claude Code"></a>
  <img src="https://img.shields.io/badge/agents-28-818CF8.svg" alt="28 Agents">
  <img src="https://img.shields.io/badge/presets-29-34D399.svg" alt="29 Presets">
  <img src="https://img.shields.io/badge/dependencies-zero-F59E0B.svg" alt="Zero Dependencies">
</p>

---

## What it does

Design, configure, and generate prompts for multi-agent Claude Code teams - visually.

Agent Architecture Designer is a single HTML file that lets you drag 28 specialized AI agents onto a canvas, connect them into workflows, assign models (Opus / Sonnet / Haiku), run a live simulation of their communication, and then export a ready-to-use system prompt for Claude Code. It includes a structured debate protocol (Five Minds), human-in-the-loop decision gates, and an encyclopedia with research-backed prompts for every agent.

## Key Features

- **Visual Canvas** - Drag and drop 28 agents, draw connections, marquee-select groups, auto-place with smart suggestions
- **Five Minds Protocol** - Structured debate with 4 domain experts + Devil's Advocate producing a Gold Solution (no public equivalent exists)
- **HITL Decision Gates** - 3 human checkpoints between phases with 120-second countdown timer and auto-decide fallback
- **Live Simulation** - Agents "talk" to each other with animated speech bubbles and data packets flowing along connections
- **29 Presets** - From a 2-agent Solo setup to the 27-agent Deep Five Minds Ultimate
- **Agent Encyclopedia** - Research-backed prompts, analogies, anti-patterns, and facts for all 28 agents and 29 presets
- **Mission Control** - Full-screen cinematic simulation dashboard with real-time metrics, phase timeline, and communications log
- **Dark / Light Theme** - Complete CSS variable system with per-agent chromatic icon colors for both themes
- **Bilingual UI (PL/EN)** - Full Polish and English interface with one-click language toggle. ~150 translated strings, agent prompts, encyclopedia entries
- **Zero Dependencies** - No npm, no build step, no CDN. One HTML file. Works offline.

## Quick Start

1. Open **[Agent Architecture Designer](https://thejacksoncode.github.io/Agent-Architecture/)** in your browser
2. Select a preset from the sidebar (try **Deep Five Minds Ultimate** for the full experience)
3. Press **Symulacja** to watch agents interact in real time
4. Press **Generuj Prompt** to export your system prompt for Claude Code

No installation. No npm. No build step. Just open the HTML file.

> **Note:** The application supports both Polish and English. Click the language toggle (flag icon) in the top bar to switch. Default language is English.

## Five Minds Protocol

Five Minds is a structured adversarial debate protocol for architectural decisions. As of April 2026, no equivalent exists in any public multi-agent framework.

**How it works:**

1. **Round 1 - Opinions** - Four domain experts independently state their positions (max 300 words each):
   - **Pragmatist** - Evaluates feasibility, cost, timeline, and resource constraints
   - **Innovator** - Pushes for the best possible solution, cross-domain inspiration
   - **Data Analyst** - Demands evidence, benchmarks, and metrics for every claim
   - **User Advocate** - Represents the end user: UX, accessibility, simplicity

2. **Round 2 - Debate** - Experts challenge each other's positions. The **Shadow (Devil's Advocate)** enters with no domain loyalty, attacking every consensus and surfacing risks nobody raised.

3. **Round 3 - Gold Solution** - The Synthesizer (on Opus) mediates both sides and produces a single solution that integrates the strongest arguments from all five perspectives.

In the Deep Five Minds Ultimate preset, this debate happens **twice** - once after Research and once after Build - with HITL decision gates in between.

## 28 Agents

| Category | Agents | Phase | Model |
|----------|--------|-------|-------|
| **Orchestration** | Orchestrator, Synthesizer | Strategy | Opus / Sonnet |
| **Planning** | Analyst, Planner | Strategy | Sonnet |
| **Research** | Tech, UX, Reddit, X/Twitter, GitHub, Forums, Docs (7 researchers) | Research | Haiku |
| **Validation** | Research Critic | Debate | Sonnet |
| **Build** | Backend Dev, Frontend Dev, Feature Dev, Designer, Integrator, Writer | Build | Sonnet |
| **QA** | QA Security, QA Quality, QA Performance, QA Manager | QA | Haiku / Sonnet |
| **Five Minds** | Pragmatist, Innovator, Data Analyst, User Advocate, Shadow | Debate | Sonnet |
| **HITL** | Decision Presenter | HITL | Haiku |

Each agent has a research-backed prompt following a structured format: ROLE / INPUT / OUTPUT / RESPONSIBILITIES / RULES / WHAT YOU DO NOT DO / REPORT FORMAT. Prompts are self-contained for isolated sub-agent execution.

## 29 Presets

### Tier 1 - Minimal (2-3 agents)

| Preset | Agents | Pattern | Est. Tokens |
|--------|--------|---------|-------------|
| Solo + Validator | 2 | Direct Delegation | ~40-80K |
| Quick Fix | 3 | Fix-Test Loop | ~80-120K |
| Recon Squad | 3 | Hub-and-Spoke | ~80-120K |
| Classic Trio | 3 | Triangle | ~120-180K |
| Reflective Loop | 3 | Reflective Trio | ~100-200K |

### Tier 2 - Core (4-6 agents)

| Preset | Agents | Pattern | Est. Tokens |
|--------|--------|---------|-------------|
| Bug Hunter | 4 | Fork QA | ~120-180K |
| Content Pipeline | 4 | Linear Pipeline | ~100-180K |
| Plan & Execute | 4 | Plan-and-Execute | ~120-200K |
| Performance Boost | 4 | Measure-Fix Cycle | ~100-160K |
| Startup MVP | 5 | Hub-and-Spoke | ~150-250K |
| Cascade Cost | 5 | Cascade Escalation | ~80-200K |
| Testing Suite | 5 | Triple QA Gate | ~120-200K |
| Accessibility Sprint | 5 | A11y Pipeline | ~130-200K |

### Tier 3 - Advanced (6-11 agents)

| Preset | Agents | Pattern | Est. Tokens |
|--------|--------|---------|-------------|
| Security Hardening | 6 | Fan-out - Aggregate | ~150-280K |
| Code Review | 6 | Pipeline + Fan-out | ~180-280K |
| Design System | 6 | Design Pipeline | ~150-250K |
| API Modernization | 6 | API Upgrade Pipeline | ~150-260K |
| UI/UX Overhaul | 7 | UI Redesign Pipeline | ~180-300K |
| Feature Sprint | 7 | Sprint Pipeline | ~180-300K |
| Standard Dev | 8 | Hierarchical Pipeline | ~250-400K |
| Data Pipeline | 8 | Data Engineering | ~200-350K |
| Research Swarm | 9 | Fan-out - Critique | ~200-400K |
| Legacy Refactor | 9 | Legacy Modernization | ~250-420K |
| Microservices | 11 | Monolith Decomposition | ~350-600K |

### Tier 4 - Enterprise (10-27 agents)

| Preset | Agents | Pattern | Est. Tokens |
|--------|--------|---------|-------------|
| Full-Stack SaaS | 10 | Hierarchical Squads | ~300-500K |
| Full Hierarchy | 13 | Full 5-Layer Hierarchy | ~400-700K |
| Five Minds Protocol | 14 | Fan-out - Debate - Build | ~400-800K |
| Deep Research+Build | 18 | Full Orchestra | ~600-1200K |
| **Deep Five Minds Ultimate** | **27** | **Deep Research - HITL - Five Minds - HITL - Build - HITL - QA** | **~800-1500K** |

## Claude Code Integration

Agent Architecture Designer works as a Claude Code skill set. The repository includes pre-built skills you can use directly:

```bash
# Clone the repo
git clone https://github.com/TheJacksonCode/Agent-Architecture.git

# The .claude/skills/ directory contains ready-to-use skills:
# - five-minds/SKILL.md   - Run a Five Minds Protocol debate
# - hitl-pipeline/SKILL.md - Run a pipeline with HITL decision gates
```

Skills are invoked as slash commands inside Claude Code (e.g., `/five-minds`, `/hitl-pipeline`).

## Screenshots

<!-- Screenshots will be added before first release -->

| Canvas with Deep Five Minds preset | Live Simulation running | Agent Encyclopedia |
|-------------------------------------|------------------------|-------------------|
| *[screenshot placeholder]* | *[screenshot placeholder]* | *[screenshot placeholder]* |

| Mission Control dashboard | HITL Decision Gate | Dark / Light theme |
|--------------------------|-------------------|-------------------|
| *[screenshot placeholder]* | *[screenshot placeholder]* | *[screenshot placeholder]* |

## Technical Details

- **Format:** Single HTML file (~4500 lines, including full i18n for PL/EN)
- **Dependencies:** Zero. No npm, no CDN, no build step.
- **Stack:** Vanilla JS (ES2022) + inline SVG + CSS transitions + Canvas 2D + Web Animations API
- **State:** localStorage persistence (canvas, theme, icon mode, language preference)
- **Rendering:** Hybrid architecture - Canvas 2D for particles/starfield, SVG for connections/icons, WAAPI for agent animations, CSS for UI chrome
- **Accessibility:** WCAG 2.2 ARIA support (23 aria attributes, role=dialog/tab, aria-live regions, keyboard navigation, prefers-reduced-motion)
- **Icons:** Dual mode - custom inline SVG (27 agent icons + 29 preset icons) or base64 PNG (Imagen 4 generated)
- **Fonts:** Space Grotesk / Inter / JetBrains Mono via Google Fonts
- **Models:** Claude Opus 4.6 ($15/MTok) for orchestration, Sonnet 4.6 ($3/MTok) for most agents, Haiku 4.5 ($0.25/MTok) for simple tasks

## Development

Each new version of the application is saved as a **separate file** with an incremented version number (`AGENT_TEAMS_CONFIGURATOR_v29.html`, `v30.html`, etc.). Previous versions remain untouched.

See [CLAUDE.md](CLAUDE.md) for the full versioning policy and changelog of all 28 versions.

### Version highlights

| Version | Key innovation |
|---------|---------------|
| v1-v4 | Canvas, presets, multi-select, tooltips |
| v5-v9 | Visual modes: Card Carousel, Infographic, Mind Map, Bento |
| v11-v13 | Neural Constellation, glassmorphism, animated starfield |
| v14 | Live Simulation - speech bubbles, data packets |
| v15-v16 | Agent Encyclopedia with knowledge base |
| v17 | Smart Canvas - marquee select, auto-place, suggestions |
| v18 | Mission Control - fullscreen simulation dashboard |
| v19-v20 | SVG Icon Suite + chromatic per-agent colors |
| v21 | Code quality - ARIA, semantic HTML, O(1) lookups, zero `var` |
| v22-v23 | Rich Prompt view, Dark/Light theme toggle |
| v24 | Live Monitor - AnimationManager, Debate Arena |
| v25 | HITL Decision Gates - 3 gates, 120s timer |
| v26-v27 | Cosmic PNG icons (Imagen 4), unified sidebars |
| v28 | Research-backed prompts for all 28 agents |
| **v30** | **International Edition - full PL/EN bilingual UI, ~150 translated strings** |

## License

[MIT](LICENSE) - Copyright (c) 2026 TheJacksonCode

## Author

Built by **[TheJacksonCode](https://github.com/TheJacksonCode)**.

---

<sub>Interface language: Polish | Documentation language: English</sub>
