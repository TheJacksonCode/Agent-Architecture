# MANIFEST.md -- Agent Architecture Designer
## Single Source of Truth | v32.16 SHIPPED

**Author:** Synthesizer [OPUS] | Role: System Memory
**Date:** 2026-04-07 | Last state update: 2026-04-11
**Product version:** v32.16 "Universal Bilingual" (SHIPPED) | plugin version 0.32.16
**Sources:** 7 research reports (Tech, UX, GitHub, Reddit, Forum, X, Critic) + Five Minds validations + ALPHA/OMEGA Final Verdict + v32.8 / v32.13 / v32.14 / v32.15 / v32.16 research + plans archives
**Purpose:** Implementable GitHub publication specification + product roadmap

---

## 0. Project Identity

**Name:** Agent Architecture Designer (Agent Teams Configurator)
**Repository:** github.com/TheJacksonCode/Agent-Architecture
**Live at:** https://thejacksoncode.github.io/Agent-Architecture/
**Format:** Single-file HTML, zero dependencies, zero build step
**Current size:** ~27500 lines, 5.7 MB (v32.16 - includes full PL+EN encyclopedia + inline base64 infographics for PL)
**Stack:** Vanilla JS (ES2022) + SVG inline + CSS transitions + Canvas 2D + container queries + View Transitions API + localStorage
**Owner:** TheJacksonCode (GitHub)
**UI Languages:** Bilingual Polish/English (since v30, fully bilingual across encyclopedia + chrome since v32.16) | Documentation: English
**Primary purpose:** Educational and developmental - helping developers understand what each agent does, how teams collaborate, and what the cost/context budget of a multi-agent system looks like before any token is spent.

**What it is:**
A visual configurator + encyclopedia for multi-agent Claude Code systems. The designer drags 35 agents onto a canvas, connects them, selects models (Opus/Sonnet/Haiku), and generates a ready-to-use system prompt. Includes **35 agents**, **42 presets**, full bilingual encyclopedia with 10-section bento layouts for every agent and every preset, Live Simulation with animated speech bubbles, Five Minds Protocol debate, HITL Decision Gates, Cost Command Center with p50-p90 ranges and what-if scenarios, Context Budget tracking, and Custom Agent Creator Pro (7-feature builder with 159-icon library).

**What it is NOT:**
- Not a tool that runs real agents (this is for education, planning, and prompt generation)
- Not a framework (no backend, no API, no server)
- Not a mobile app (desktop-first, intentionally)
- Not a replacement for learning Claude Code itself - it is a companion for understanding the multi-agent layer on top

---

## 1. Architectural Decisions

### 1.1 Single-File Philosophy -- FINAL DECISION

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Format | Single HTML file | Zero toolchain, zero npm, installation = download |
| LOC Limit | Hard limit: **5000 lines** | LLM context window, maintainability, GitHub render |
| External dependencies | ZERO CDN, ZERO npm | No "dependency hell", works offline |
| Build step | NONE | Copy-paste deployment, GitHub Pages without configuration |
| Modularization | Lazy init + feature flags | Large file, fast startup (monitor code inactive until M) |

**Consensus:** 6/6 research reports. OMEGA Final Manifesto: "Single-file preserved - this is the project's philosophy."

**Fallback plan (if we exceed 5000 lines):**
No build step. Instead: `<!-- SECTION: AGENT_KNOWLEDGE -->` comments as markers + bash script generating a single HTML from fragments. Distribution = always a single file.

### 1.2 Rendering -- Hybrid Architecture

| Layer | Technology | Usage |
|-------|------------|-------|
| Particle effects, starfield | Canvas 2D + rAF | 60 FPS with 5000+ objects, existing `dataStreamCanvas` |
| Agent node animations | WAAPI `element.animate()` | Compositor thread GPU, does not block main thread |
| Connections, data packets | SVG inline | Vector-based, clickable, CSS-animatable, existing `#svg` |
| UI chrome, panels | CSS transitions + keyframes | Zero JS overhead, GPU-accelerated transform/opacity |

**Rejected (and why):**
- Mermaid.js - 2-3MB payload, breaks single-file philosophy
- D3.js - redundant with existing positioning system
- React / Vue - overengineering, destroys "drag and drop HTML file" UX
- WebGL/WebGPU - out of scope, unjustified overhead

### 1.3 State Management

```
Model: localStorage(acV31) -> JS Object AD[] -> Canvas SVG DOM
Flow:  preset.load() -> AD = [...] -> render() -> minimap update
Sim:   simStep() -> dispatch CustomEvent -> addDTLMsg() -> DOM update
```

**localStorage keys:** `acV31` (canvas state), `acV31_theme` (dark/light), `acV31_lang` (pl/en)

**AD_MAP:** O(1) lookup object (replaced 36x AD.find() in v21) - maintain on every agent addition.

### 1.4 Zero External Dependencies -- INVIOLABLE PRINCIPLE

- Fonts: Space Grotesk / Inter / JetBrains Mono - inline @import from Google Fonts (single request, not bundled)
- Icons: inline SVG (AGENT_SVG, 27 icons) + optional base64 PNG (AGENT_IMG, v26)
- Animations: WAAPI + CSS keyframes (Baseline 2023)
- Storage: localStorage (Baseline Widely Available)

### 1.5 Modularization When Exceeding the Limit

If the file reaches 5000 lines, steps in order:

1. **CSS Audit** - target: -100 lines (duplicated rules, prefix overrides)
2. **AGENT_KNOWLEDGE Compression** - multiline strings -> template strings (eliminate blank lines)
3. **Lazy init of large modules** - HITL overlay, Live Monitor, Five Minds Arena initialized only on first invocation
4. **Feature flags** - const FEATURES = { liveMonitor: true, hitl: true } at the top of the file
5. **Last resort** - comment markers + build.sh script generating dist.html

---

## 2. Technology Stack

### 2.1 Current (v31)

```
HTML5 / CSS3 / ES2022 (const/let, template literals, optional chaining)
SVG 1.1 inline (agent connections, icons, data packets)
Canvas 2D API (starfield, particle effects, data stream background)
Web Animations API / WAAPI (agent status animations)
localStorage API (state persistence)
CSS Custom Properties (dark/light theme with data-theme attribute)
CSS Grid + Flexbox (layout)
ARIA 2.2 (role=dialog/tab, aria-live, aria-label -- 23 attributes)
```

### 2.2 Planned Addition (v0.2.0 - v0.3.0)

```
Claude Code plugin SDK (plugin.json at root)
Hooks API (command/http hooks in settings.json)
Skills format (.claude/skills/*.md)
BroadcastChannel API (multi-tab sync in Live Monitor)
File System Access API (import EXECUTION_REPORT.json)
View Transitions API (progressive enhancement, with fallback)
```

### 2.3 Intentionally Omitted

```
TypeScript -- unnecessary build step, vanilla JS is sufficient in single-file
React/Vue/Svelte -- zero-dependency philosophy
WebGL/WebGPU -- scope beyond particle animations
WebAssembly -- no performance justification
Service Worker -- offline works anyway (static HTML)
```

---

## 3. Consensus Items (confirmed by 3+ sources)

### C1: Five Minds Protocol = Unique Innovation

**Status:** CONFIRMED (OMEGA 9/10, ALPHA, Reddit, X, Forum, GitHub)

Five Minds Protocol (4 experts + Devil's Advocate + Gold Solution) has no direct equivalent in any public multi-agent framework (as of April 2026). OMEGA: "You didn't copy this. This is YOUR thinking." ALPHA: "Original Innovation: 9.0/10."

**Roadmap implication:** Five Minds must be prominent in README, hero GIF, Show HN post. This is differentiator #1.

### C2: Build Deeper in the Anthropic Ecosystem

**Status:** CONFIRMED (Tech, Forum, X, Docs)

Claude Code holds 75% share among professional users. Plugin SDK + Hooks + Skills = natural extension for Claude Code users. Don't branch out to other models - go deeper into Anthropic.

**Implication:** plugin.json, skills/agent-designer, hooks integration before marketplace submission.

### C3: Visual MAS Tools = Underserved Niche

**Status:** CONFIRMED (GitHub, Reddit, UX, Forum)

React Flow (34k+ stars) is a framework, not an application. No tool exists that does what Agent Architecture Designer does: visual designer + prompt generator + education + Five Minds. The niche is open.

**Implication:** Hero GIF > screenshot > text in README (GitHub research). Show uniqueness visually.

### C4: Token Cost Visibility = Community Priority

**Status:** CONFIRMED (Reddit #1 request, X, Forum, Researcher B)

Token cost = #1 request among developers using multi-agent systems (Reddit research). Current estimates in v31 are educational. The community wants: per-agent, per-phase, cumulative. Sonnet preferred (59% among developers) due to price/quality ratio.

**Implication:** Token cost HUD in v0.2.0, no later. Model + pricing visibility already in v31 (good).

### C5: GitHub Pages as Deployment

**Status:** CONFIRMED (GitHub, Tech, Forum)

Zero cost. Zero configuration (single HTML file). Works immediately after push. index.html at root = current version (v31).

**Implication:** Repository structure: root = latest version, /versions/ = archive.

### C6: HITL as Differentiator - Develop Further

**Status:** CONFIRMED (Forum, Reddit, X, UX)

Human-in-the-Loop 120s standard (Forum). HITL = the heart of educational value ("user learns to decide, not just watch"). 3 decision gates in v25+ are optimal (too many = flow destruction, too few = no value).

**Implication:** HITL animation, countdown, Debate Arena - develop in v0.3.0+.

---

## 4. Known Risks (from Critic and ALPHA/OMEGA validation)

### R1: File Size - HIGH

**Description:** v31 = ~4600 lines. Each new version adds ~100-300 lines. At the current pace: 5000 lines = 3-4 versions away.
**Impact:** LLM cannot fit the entire file in context, harder code review, long rendering time on GitHub.
**Mitigation:** Hard limit 5000 LOC. Before each new feature: audit -50 LOC. Fallback plan: lazy init + feature flags.
**Owner:** Coder (v21 cleanup was exemplary - replicate methodology)

### R2: Security - XSS in JSON Import - MEDIUM

**Description:** The JSON configuration import function (if it exists or will be added) may be vulnerable to XSS via `innerHTML` with untrusted data.
**Impact:** Execution of malicious code for users importing a malicious JSON file.
**Mitigation:** Use `textContent` instead of `innerHTML` for all dynamic insertions. For JSON import: `JSON.parse()` with try/catch + whitelist of allowed keys. DOMPurify is not an option (zero deps).
**Priority:** Implement BEFORE public exposure (pre-v0.1.0)

### R3: localStorage Migration - LOW-MEDIUM

**Description:** Each version uses a different key (`acV14`, `acV15`... `acV28`). User data is lost on upgrade.
**Impact:** User frustration, inability to migrate configurations.
**Mitigation v0.2.0:** JSON export/import function (user saves manually). Mitigation v0.3.0: `localStorage.getItem('acV27')` -> automatic migration on first launch.
**Plan:** EXPORT CONFIG button in v0.2.0 (150 lines).

### R4: Plugin Structure Unverified - HIGH (pre-submission)

**Description:** plugin.json format must be verified against the Claude Code SDK before marketplace submission. Current skills in `.claude/skills/` are correct in format, but plugin.json at root does not exist yet.
**Impact:** Submission rejection or lack of functionality.
**Mitigation:** Verify plugin.json format with docs.anthropic.com/claude-code/plugins BEFORE submission.

### R5: No Tests - HIGH (long-term)

**Description:** Zero unit tests, zero integration tests (per ALPHA/OMEGA critique). Critical technical credibility gap.
**Impact:** Difficult regression debugging with new versions, no confidence when making changes.
**Mitigation:** Do not add a full test suite immediately (this is not a production application). Instead: snapshot testing (compare HTML output before/after changes) + manual QA checklist per version.

---

## 5. Open Questions (unresolved)

### Q1: Mermaid Export - inline or separate tool?

**Question:** Export canvas configuration to Mermaid diagram - generate in a window, copy to clipboard, or separate page?
**Option A:** Inline (modal window with Mermaid code + copy button) - ~250 lines
**Option B:** Separate file mermaid-export.js - breaks single-file philosophy
**Recommendation:** Option A. Modal window with textarea + copy. Mermaid.js is NOT required (we only generate text).

### Q2: Agent Creator - where to store custom agents?

**Question:** User creates a custom agent. Where does it live?
**Option A:** localStorage (simple, but no export)
**Option B:** JSON download (file `my-agents.json`) - portable
**Option C:** Both (save local + export)
**Recommendation:** Option C. Schema: `{ id, name, role, phase, model, prompt, color, icon }` - 8 fields.

### Q3: Monetization - open source or freemium?

**Question:** Business model after gaining traction on GitHub.
**Option A:** Full open source MIT - maximum adoption, zero revenue
**Option B:** Core open source + premium presets/templates - Gumroad/Stripe
**Option C:** GitHub Sponsors (like Sindre Sorhus)
**Status:** Unresolved. Decision after reaching 100+ GitHub stars.

### Q4: README Language - Polish or English?

**Question:** README.md language for the public repo.
**Recommendation:** English README.md + Polish note in the footer ("Interface: Polish | Documentation: English"). English-speaking market = 10x larger.

### Q5: Hero GIF - what to show?

**Question:** Main animated GIF in README (GitHub research: Hero GIF > screenshot > text).
**Recommendation:** 15-second GIF showing: (1) load Deep Five Minds preset -> (2) start Live Simulation -> (3) agents "talk" to each other -> (4) HITL decision gate. This shows all differentiators in a single shot.

---

## 6. Agent Architecture (v32.16 state - updated 2026-04-11)

> **State note:** the tables in sections 1-5 above reflect the original v31 publication plan. The actual shipped v32.16 has grown to **35 agents** and **42 presets** and the 5000-line hard cap from section 1.1 is formally retired (file is now ~27500 lines, dominated by encyclopedia content + inline base64 infographics). The sections below are authoritative for v32.16.

### 6.1 Agents (35)

| Category | Agents | Phase |
|----------|--------|-------|
| Orchestration | Orchestrator, Synthesizer, Analyst, Planner | strategy |
| Research | Res.Tech, Res.UX, Res.Reddit, Res.X, Res.GitHub, Res.Forums, Res.Docs, Res.Critic | research |
| Build | Backend, Frontend, Feature Dev, Designer, Integrator, Writer | build |
| QA | QA Security, QA Quality, QA Perf, Manager QA | qa |
| Five Minds | Expert Pragmatist, Expert Innovator, Expert Analyst, Expert Advocate, Expert Shadow | debate |
| HITL | Decision Presenter | hitl |
| Data / Ops / Product (v32.6) | DB Architect, Observability Engineer, GTM Strategist, Statistician, EDA Analyst, Control Mapper, Telemetry Surfer | build / data / compliance |

### 6.2 Presets (42)

Tiering by agent count: Minimal 2-3 (5), Core 4-6 (8), Advanced 6-11 (11 + 3 new-tier research-backed), Enterprise 10-27 (15 including 12 new-tier blueprint presets).
Flagship: **Deep Five Minds Ultimate** (27 agents, 5 HITL checkpoints, two Five Minds debates).
"New tier" blueprint presets (13, introduced v32.6) have a green NEW badge, a ~250-word Polish detailed description citing source paper/reference, and explicit per-node model overrides. Sources include Anthropic Lead Researcher, wshobson, Magentic-One, arxiv 2510.04023, and internal Five Minds applied to perf/strategic problems.

### 6.3 Encyclopedia (v32.13 -> v32.16)

Every one of the 35 agents and 42 presets has a 10-section bento encyclopedia entry accessible from the sidebar. Schema (18 fields): tagline, missionShort, whoIs, howItWorks (phase array), inputs, outputs, does, doesNotDo, antiPatterns, keyConcepts, stats, bestFor, worstFor, relatedAgents, relatedPresets, glossary, learningQuote, realExample. Agents additionally have 4 Polish `AGENT_*_PL` constants (Long, Mid, Green, Red) - 140 entries total. Presets have the equivalent 4 `PRESET_*_PL` constants - 168 entries total. v32.16 mirrored ALL of this to English through 10 new I18N_EN namespaces (~1694 translated fields, produced by 18 parallel Sonnet translation subagents with STYLE_GUIDE_EN.md as contract). Access is via lang-aware dispatcher getters (getAgentEdu, getPresetEdu, getAgentLongPl, getPresetLongPl, etc.) that fall back from EN to PL when a namespace is missing.

### 6.4 Cost + Context visibility (v32.4 + v32.6)

Cost Command Center (v32.4): multi-cell glance HUD in topbar (COST p50-p90 + TOK in/out micro-bar + MIX model chips), severity color coding, 4-tab modal (Overview donut + phase bar, Breakdown sortable table, What-if 3-slider + 4-scenario chart, Export MD/CSV/JSON). Context Budget (v32.6): MODEL_CTX constants (opus/sonnet 1M, haiku 200K), CTX_BASELINE_TOTAL 22.4k per subagent, CTX_SEVERITY bands, Context tab in cost modal with heaviest-agent list. walidujPremiumCtx() warns when any agent in a premium preset exceeds 50% of window.

### 6.3 Models

| Model | Usage | Price (input) |
|-------|-------|---------------|
| Claude Opus 4.6 | Orchestrator, Synthesizer (strategy and synthesis) | $15/MTok |
| Claude Sonnet 4.6 | Most working agents | $3/MTok |
| Claude Haiku 4.5 | Simple tasks, QA, HITL gating | $0.25/MTok |

---

## 7. Plugin Architecture (planned)

### 7.1 plugin.json (repository root)

```json
{
  "name": "agent-architecture-designer",
  "description": "Visual multi-agent system designer for Claude Code. Design, configure, and generate prompts for agent teams.",
  "version": "0.1.0",
  "type": "skill",
  "entrypoint": ".claude/skills/agent-designer/SKILL.md",
  "keywords": ["multi-agent", "orchestration", "five-minds", "hitl", "visual-designer"]
}
```

### 7.2 Skills (existing)

- `.claude/skills/five-minds/SKILL.md` - Five Minds Protocol debate
- `.claude/skills/hitl-pipeline/SKILL.md` - HITL pipeline with decision gates

### 7.3 Hooks (planned)

```json
// .claude/settings.json additions
{
  "hooks": {
    "command": [
      { "matcher": "agent", "command": "node .claude/hooks/agent-validator.js" }
    ]
  }
}
```

---

## 8. Design System Tokens (current in v31)

### 8.1 Colors - Dark Theme (default)

```css
--bg0: #06060A;           /* main background */
--bg1: #0F0F18;           /* panel backgrounds */
--accent1: #818CF8;       /* indigo -- primary, strategy */
--accent2: #34D399;       /* emerald -- success, build */
--accent3: #FBBF24;       /* amber -- warning, thinking */
--accent4: #F87171;       /* red -- error, QA */
--gold: #F59E0B;          /* Five Minds, HITL */
--t1: #E4E4E7;            /* primary text, 16.5:1 contrast */
--t2: #71717A;            /* secondary text */
```

### 8.2 Colors - Light Theme ([data-theme=light])

Full overrides in CSS Custom Properties. Introduced in v23.

### 8.3 Phases and Colors

| Phase | Color | Hex |
|-------|-------|-----|
| strategy | indigo | #818CF8 |
| research | cyan | #06B6D4 |
| fiveminds | gold | #F59E0B |
| build | emerald | #34D399 |
| qa | red | #F87171 |
| hitl | purple | #E879F9 |

---

## 9. Key Version Changelog

| Version | Key Innovation |
|---------|----------------|
| v1-v4 | Canvas, presets, multi-select, tooltips |
| v5-v9 | Visual modes: Card Carousel, Infographic, Mind Map, Bento |
| v11-v13 | Neural Constellation, glassmorphism, animated starfield |
| v14 | Live Simulation - speech bubbles, data packets |
| v15-v16 | Agent Encyclopedia with AGENT_KNOWLEDGE and PRESET_KNOWLEDGE |
| v17 | Smart Canvas - marquee select, auto-place, suggestions |
| v18 | Mission Control - fullscreen simulation dashboard |
| v19-v20 | SVG Icon Suite + Chromatic Icons (per-agent colors) |
| v21 | Smart Controls + Code Quality (ARIA, semantic HTML, O(1) lookups) |
| v22 | Context Menu + Rich Prompt view |
| v23 | Dark/Light theme toggle |
| v24 | Live Monitor - AnimationManager, 7 agent states, Debate Arena |
| v25 | HITL Decision Gates - 3 gates, 120s timer, auto-decide |
| v26 | Cosmic Icons - 57 PNG Imagen 4 |
| v27 | Unified Sidebars |
| v28 | Research-Backed Prompts - 28 agents rewritten |
| v30 | International Edition - full PL/EN bilingual UI |
| **v31** | **Audit Edition - Security, WCAG 2.2, bilingual fixes (current)** |

---

## 10. Definition of Done -- v0.1.0 GitHub Publication

All items below must be checked before pushing to the public repo:

- [ ] README.md in English with hero GIF
- [ ] Security audit (XSS check - R2)
- [x] index.html as the main file (copy of v31)
- [ ] plugin.json at root (format verification)
- [ ] LICENSE (MIT)
- [ ] .gitignore (exclude node_modules, .DS_Store, Thumbs.db)
- [ ] GitHub Pages enabled (Settings -> Pages -> Deploy from main)
- [ ] First version of Show HN post prepared (draft)
- [ ] Descriptive repository tags: multi-agent, claude-code, five-minds, hitl, visual-designer

---

*MANIFEST v2.0 | Synthesizer [OPUS] | 2026-04-07*
*Previous version: live-monitor-research/MANIFEST.md (v1, specific to Live Monitor Mode v22)*
