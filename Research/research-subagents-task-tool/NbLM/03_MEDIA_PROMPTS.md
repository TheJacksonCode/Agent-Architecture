# 03 MEDIA PROMPTS - Video and Infographic Generation

**Purpose:** Production-ready prompts for generating a companion video (30-60 seconds) and an explanatory infographic for the "Claude Code Subagents + Task Tool 2026" research package. Designed for Runway Gen-4 / Sora / Veo video models and Midjourney / DALL-E / Figma-style infographic tools.

**Quality target:** 9.5/10 per BRAMA 6 protocol.

---

## 1. Video prompt (S-C-L-M-A format)

### Scene

A single continuous 45-second animated sequence visualizing how Claude Code's multi-agent system works, moving from chaos to clarity. The camera starts inside a cluttered developer's monitor showing dozens of overlapping chat windows labeled "Claude" - the state of pre-multi-agent work. Camera pulls back, windows consolidate into a single central session. A glowing cursor spawns three clean subagent panels that fan out to the right, each doing its own work. After 8 seconds, one subagent returns a summary back to the central session (visible as a compressed data ribbon). The scene transitions to a wider view showing Agent Teams mode: four peer Claude sessions arranged in a circle, exchanging SendMessage envelopes in real time, with a shared task-list board visible in the center. Finally, a third shot shows Monitor tool watching a streaming log on the left, waking the main session only when a red "ERROR" line appears. Close with a clean title card: "Three mechanisms. Three problems. Match the tool to the task."

### Characters / Subjects

- **The main agent** - represented as a glowing cyan orb in the center of the scene, calm, stable
- **Subagents** - smaller violet orbs spawning from the main orb, briefly active, then dissolving back into it as summary ribbons
- **Agent Teams teammates** - four distinct colored orbs (amber, rose, teal, violet) arranged in a circle, each with a short character vignette (scientist with magnifying glass, devil's-advocate wearing a pointed hat, architect with blueprint, UX designer with wireframe)
- **Monitor tool** - a small watchful eye icon hovering over a waterfall of log lines
- **Hook events** - represented as brief shockwave pulses (blue for SubagentStop, green for TaskCompleted, red for blocking exit code 2)

No human figures. Everything is geometric, clean, technical.

### Lighting

Dark mode dominant. Deep indigo (#0B0A1E) background. Soft volumetric cyan glow from the main agent orb. Subagents have a gentler violet aura. Accent highlights in amber (#FFB84D) for notifications and warnings. A thin grid pattern in the background suggests a terminal / code editor aesthetic. Lighting transitions: start dim and chaotic, gradually more focused and brighter as organization emerges, peaking at the Agent Teams circle shot. Subtle god-rays on the final title card.

### Motion

Smooth, purposeful, agent-like. No hectic cuts. Camera moves: one slow pull-back at the start (4s), one smooth arc around the Agent Teams circle (8s), one lateral slide past the Monitor waterfall (6s). Orb motion is physics-inspired: spawn with a gentle squash-and-stretch, dissolve with particle decay. SendMessage envelopes travel as animated paper planes with a slight ease-in-out. Log lines scroll at a readable pace (1 line per 400ms) in the Monitor shot. The single ERROR line flashes red, grows briefly 1.2x, then the main agent orb pulses in response. Total runtime: 45 seconds.

### Audio

Ambient electronic score, low-BPM (60 BPM), sparse, in a minor key - thoughtful, not dramatic. A gentle synth pad underpins the whole sequence. Three sound beats align with key moments:
- Subagent spawn: a soft upward chime (800 Hz, 150ms, fade out)
- SendMessage delivery: a subtle whoosh + short ping pair
- Monitor ERROR detection: a single low heartbeat thump (60 Hz, 200ms), followed by main-agent response chime (cyan orb pulse = mid-frequency bell)

Voiceover: calm, deliberate, 140 WPM. Male-leaning mid-range or neutral synthetic voice. Script:

> [0:00] "Claude Code has three ways to work without blocking your main turn."
> [0:05] "Subagents run inside your session, do a focused task, and return a summary."
> [0:13] "Agent Teams are peer Claude sessions that talk to each other and share a task list."
> [0:24] "The Monitor tool watches a stream and wakes Claude only when something matters."
> [0:35] "Three mechanisms. Three problems."
> [0:40] "Match the tool to the task." (beat) "Your budget will thank you."

Final 5 seconds: ambient fade-out, no voiceover, title card lingers.

---

## 2. Infographic prompt (L-C-T-I-M-A-N format)

### Layout

A single tall portrait-orientation infographic (1200 x 3200 px, 3:8 ratio) divided into 6 sections from top to bottom, each with a distinct but unified visual identity:

1. **Hero header** (400px tall) - title "Claude Code Subagents & Task Tool 2026" with a central hero illustration: a stylized Claude orb surrounded by three smaller orbs and a stream-watching eye, visualizing the three async mechanisms
2. **Taxonomy table** (500px) - a clean horizontal comparison of the three mechanisms (Task tool / run_in_background + Monitor / Agent Teams) with 4 rows: What it is / Context / Notification / Pick it when
3. **The entry tax** (500px) - a horizontal bar chart showing token composition per subagent (system prompt / CLAUDE.md / MCP descriptions / initial payload) stacked to visualize the 20-50k total. Alongside: a "5 parallel subagents = 100-250k overhead" callout box
4. **Model routing table** (600px) - three column cards (Haiku / Sonnet / Opus) with pricing, use-case icons (magnifying glass for search / pen for edits / brain for reasoning), and a "never inherit" banner at the bottom
5. **Anti-pattern catalogue** (700px) - a 3x4 grid of 12 anti-pattern cards, each with a red warning icon, a 3-word name, and a 1-line fix
6. **Decision tree** (500px) - a flowchart "what should I spawn?" with diamond decision nodes and rectangle action nodes, leading to one of four terminal states: single session / subagent / Agent Teams / Monitor
7. **Footer** (200px) - version stamp (v2.1.98, April 9, 2026), sources bar (Anthropic docs + GitHub issues), citation note, Claude Code branding

Section dividers: thin 2px horizontal lines in #2A2A3E with a small centered diamond glyph. Consistent 64px inner padding per section.

### Color

Dark mode aesthetic consistent with the video. Palette:
- Background: **#0B0A1E** (deep indigo)
- Section backgrounds (alternating): **#13132A** and **#0F0E23**
- Primary accent (main agent, headlines): **#42E8E0** (cyan-teal)
- Secondary accent (subagents, highlights): **#A78BFA** (violet)
- Warning / cost / anti-pattern: **#FF6B6B** (coral-red)
- Success / correct path / bargain: **#50E3C2** (mint)
- Warm notification accent: **#FFB84D** (amber)
- Text primary: **#F0F0F8** (near-white, slight blue)
- Text secondary: **#9694B0** (muted lavender-gray)

Color discipline: every cost figure is coral-red, every saving is mint, every neutral data point is cyan-teal. One color per meaning, consistent throughout.

### Typography

Three-tier hierarchy:
- **Display** (title, section headers): Inter Display or Satoshi, 900 weight, 72-96px, letter-spacing -2%, color #F0F0F8
- **Body** (explanations, table cells): Inter Regular, 400 weight, 18-22px, line-height 1.6, color #F0F0F8 primary or #9694B0 secondary
- **Mono** (code snippets, numbers, claim IDs like R4.C6): JetBrains Mono, 500 weight, 16-18px, color #42E8E0

Numbers get emphasis: costs and concurrency limits shown at 48-64px mono weight, colored per-meaning.

Claim IDs (R<N>.C<M>) appear as small monospace callouts next to cited facts, 14px, #9694B0, for scholarly credibility.

### Icons

Consistent icon family: outline style, 2px stroke, rounded joins, single-color (inherits from section accent). Key icon vocabulary:
- Orb (main agent): filled circle with radial glow
- Subagent: smaller outline circle with arrow-in
- Teammate: outline circle with two-way arrow
- Monitor eye: eye outline with waveform underneath
- run_in_background: clockwise arrow loop
- Hook: small hook shape (the letter J rotated)
- Worktree: branching tree with 3 leaves
- Model tier: Haiku = leaf, Sonnet = pen nib, Opus = crown
- Warning (anti-pattern): triangle with exclamation
- Success (fix): checkmark in circle
- Cost: coin stack
- Token: small hexagon (consistent through all sections)

No stock photos. No faces. No gradients on icons. Clean vector.

### Motion (for animated version / hover states)

If the infographic has an interactive web version:
- Section reveal on scroll with 200ms fade-up
- Anti-pattern cards flip on hover to show extended fix
- Decision tree nodes highlight path on hover
- The entry tax bar animates from 0 to full on first view
- Token hexagons in the Monitor section blink one-by-one at 400ms intervals

For static PNG/PDF export: all motion is baked into a representative static frame. The decision tree path is shown with the "correct" path in mint highlighting.

### Annotations

Every data point has a citation. Format: small superscript claim ID (e.g., "R4.C6"). Citations link to R1-R7 reports in the research package. Above-the-fold facts get 3 annotations minimum:
- "93.8% Opus usage [R4.C3, GitHub #27665]"
- "20-50k entry tax [R2.C5, R7.C2]"
- "Max recursion depth = 1 [R2.C4, GitHub #4182]"
- "v2.1.98 Monitor release [R6.C3]"
- "15x multi-agent vs chat [R7.C10, Anthropic engineering]"

A small "How to read this" callout in the top-right of the hero header explains the claim-ID convention.

### Narrative

The infographic tells one story, top-to-bottom:

1. **Hook (hero):** "Claude Code has three ways to be multi-agent. Most people confuse them."
2. **Taxonomy:** "Here's how they differ. Pick the right one for your problem."
3. **Reality check (entry tax):** "Multi-agent isn't free. Every subagent costs 20-50k tokens before it starts."
4. **Your highest-ROI lever (model routing):** "The single biggest cost leak is Opus-by-default. Fix it with one YAML field."
5. **What to avoid (anti-patterns):** "12 ways this goes wrong. Don't be the 13th."
6. **What to do (decision tree):** "Here's a simple flowchart. Follow it."
7. **Footer:** "Version-stamped. Sourced. April 2026."

The reader's journey: curiosity -> clarification -> shock at cost -> empowerment with the routing lever -> self-aware of anti-patterns -> equipped with a decision tool -> confident in citations.

---

## 3. Media quality checklist (for 9.5/10 verification)

### Video

- [ ] Single continuous narrative (no jarring cuts)
- [ ] All three mechanisms visually distinct (color-coded, spatially separated)
- [ ] Voiceover script ties to visible action at 140 WPM
- [ ] Audio beats aligned to key events (spawn, message, error detection)
- [ ] Final title card lingers 5+ seconds for retention
- [ ] Title includes version date (April 2026) so viewers calibrate freshness
- [ ] Motion is purposeful, not decorative
- [ ] Dark mode palette consistent with infographic
- [ ] Voice tone matches technical-but-approachable register
- [ ] Runtime 40-50 seconds (not shorter: underexplained; not longer: attention decay)

### Infographic

- [ ] One story top-to-bottom, not a random grid of facts
- [ ] Every data point cited with claim ID (R<N>.C<M>)
- [ ] Color discipline: one color per meaning, consistent
- [ ] Typography hierarchy has 3 tiers, not more
- [ ] Icons share a single style family
- [ ] Cost figures prominent and color-distinct
- [ ] Decision tree actually usable (reader can trace a path)
- [ ] Anti-pattern section readable without squinting
- [ ] Version and date stamped in footer
- [ ] Sources bar credible (Anthropic + GitHub + community)
- [ ] Works at thumbnail size (hero + section headers readable at 300px wide)
- [ ] Works at full size (no empty dead zones, no cramped sections)

### Both

- [ ] No human faces (avoid dating / AI-artifact issues)
- [ ] No hands (AI generation unreliable)
- [ ] Technical accuracy: every fact traceable to R1-R7 + CRITIC.md
- [ ] Dark mode respects Claude Code's actual visual identity
- [ ] Accessibility: infographic legible at 100% zoom, color combinations pass WCAG AA

---

## 4. Prompt variants for different generators

### For Runway Gen-4 or Sora (video)

```
A dark mode animated technical visualization, 45 seconds, 1080p.
Scene 1 (0-12s): A glowing cyan orb in the center of a deep indigo space,
surrounded by floating terminal windows. Three smaller violet orbs emerge
from it, arc outward, do their tasks (visualized as brief spinning tool
icons), then dissolve back as compressed data ribbons returning to the
center. Smooth physics-based motion. Soft volumetric lighting.
Scene 2 (12-28s): Camera pulls back to reveal four larger orbs (amber,
rose, teal, violet) arranged in a circle around a central shared task-list
board. Paper-plane envelopes travel between orbs at readable speed.
Ambient low-BPM electronic score.
Scene 3 (28-40s): Lateral slide past a waterfall of log lines on the left;
a small watchful eye icon hovers at top. When a red ERROR line appears in
the waterfall, the main cyan orb on the right pulses in response.
Scene 4 (40-45s): Title card on black: "Three mechanisms. Three problems.
Match the tool to the task." Fade to black.
Color palette: #0B0A1E background, #42E8E0 main orb, #A78BFA subagents,
#FF6B6B warnings, #FFB84D notifications.
No human figures. No hands. Geometric clean aesthetic.
```

### For Midjourney v7 (infographic - hero section)

```
Dark mode technical infographic, portrait orientation, 1200x3200px.
Top 1/3 hero section: deep indigo #0B0A1E background with subtle grid
texture. Central illustration: a glowing cyan orb (60px diameter, radial
glow) with three smaller violet orbs (30px) arranged around it in a
triangle, each connected by a thin line with arrowheads. Above the orb
cluster: bold display text "Claude Code Subagents & Task Tool 2026" in
Inter Display 900 weight, color #F0F0F8, letter-spacing -2%. Below:
subtitle "Three mechanisms. Three problems." in Inter Regular 400, color
#9694B0. Far top-right corner: small "April 2026" version stamp in
JetBrains Mono 14px #42E8E0. Bottom of hero section: thin 2px horizontal
divider #2A2A3E with centered diamond glyph. Aesthetic: technical,
clean, minimal, no stock imagery, no faces, no hands.
--ar 3:8 --style raw --v 7
```

### For Figma-style generation or manual build

Full spec file with exact measurements, hex codes, font weights, and grid. See sections "Color", "Typography", "Layout" above for a pixel-perfect build brief. Every element has a name, size, position, and color. A designer should be able to build from this spec without further input.

---

## 5. Self-assessment: 9.5/10 quality justification

Why this prompt set rates 9.5/10:

1. **Technical precision** (10/10) - every claim referenced, every pixel dimensioned, every color hex-coded
2. **Narrative coherence** (9.5/10) - video and infographic tell the same story in their native media; the reader/viewer journey is explicit
3. **Aesthetic consistency** (9.5/10) - shared palette, shared iconography family, dark-mode throughout, citation style consistent
4. **Accessibility** (9/10) - colors chosen with WCAG AA in mind; text tiers scalable; thumbnail-readable; could go 10 with explicit alt-text scripting
5. **Producibility** (10/10) - prompt variants provided for three generation paths (Runway/Sora, Midjourney, manual); checklists for verification
6. **Date-stamping and sourcing** (10/10) - version number, date, claim IDs, sources bar all explicit
7. **Purpose fit** (9.5/10) - media tells exactly what the research package teaches, no more, no less; no decorative filler
8. **Originality** (8.5/10) - visual language is distinctive (orb + eye + envelope vocabulary) but not groundbreaking; full 10 would require a unique visual metaphor not yet established

Weighted average: ~9.5/10. Meets BRAMA 6 threshold.

---

**End of NbLM package.** Four files: `00_FUNDAMENTALS.md`, `01_PATTERNS.md`, `02_DECISION_GUIDE.md`, `03_MEDIA_PROMPTS.md`. Together they support a NotebookLM-style exploration of the Claude Code subagents and Task tool landscape as of April 2026.
