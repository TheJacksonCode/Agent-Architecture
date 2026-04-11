# R4 - Agent Profile / Detail Sidebar Design Research (v32.13)

**Researcher:** R4 Agent Profile Design
**Date:** 2026-04-10
**Scope:** Information architecture, section order, visual recipes and copy guidance for the v32.13 agent detail sidebar. The goal is to match the v32.12 preset sidebar polish (rich header, Verdict Panel, SZCZEGOLOWY OPIS card, 32px command pill, compact model row, rich Encyclopedia CTA) while adapting for agents, which are individual workers rather than pipelines.
**Status:** Pure IA/UX analysis, no code. Reuses recipes from `v32.11/research/R1_ui_patterns.md` (Verdict Panel) and `v32.12/research/R4_encyclopedia_cta.md` (Rich CTA) and does not re-derive them. Where a claim depends on an external source that could not be opened, the sentence says "from memory of public documentation" and is not treated as verified.

---

## 0. TL;DR and the one-line answer

The winning shape for an agent detail sidebar in v32.13 is a **two-zone layout with a sticky Hero card (identity + phase chip + model chip + load meter), a progressively disclosed body (Verdict Panel at the top, then a single long "KLUCZOWE KOMPETENCJE" card, then chip blocks for tools, connections and facts), and a single rich CTA to the Encyclopedia at the bottom.** Prompt editing should move out of the sidebar into a modal invoked by a compact pill, for the same reason the v32.12 preset sidebar moved the Claude Code command into a 32px pill: a multiline textarea destroys the scroll budget and turns the sidebar from a **profile** into a **form**.

Recommended final section order (DD01 input, see section 8 for the ranked list and rationale):

1. Hero card (sticky): orb + name + role + phase chip + model chip + load meter micro-bar
2. Verdict Panel (dual-column green/red): KIEDY UZYC / KIEDY NIE UZYC
3. KLUCZOWE KOMPETENCJE card (long description, 3-5 sentences max, collapsible at 4 lines)
4. KIM JEST + ANALOGIA merged card (1 sentence who + 1 italic analogy quote)
5. CO ROBI / CZEGO NIE ROBI twin chip lists (compact, co-located, tinted)
6. ANTI-PATTERNS warning strip (amber, only if present)
7. NARZEDZIA row of tool chips
8. POLACZENIA in/out mini-graph (only if >=1 connection)
9. OBCIAZENIE (load history micro-bar, optional)
10. CIEKAWOSTKI inline chips (optional, often empty)
11. MODEL + cost + ctx compact row (sticky footer)
12. EDYTUJ PROMPT pill (opens modal)
13. ENCYKLOPEDIA AGENTA rich CTA (shimmer, eyebrow + title + subtitle + arrow)

The variant I recommend for HITL Gate #1 is **Variant B - Progressive Disclosure** (section 9). Variant A scrolls too much on 720p laptops, Variant C hides the prompt behind a tab click and forces context switches.

---

## 1. Information architecture reference study

I studied 14 widely-used "profile / detail / infobox" panels across web, desktop and game apps. The goal was not to copy any one of them but to map the **common skeleton** so that the v32.13 sidebar feels familiar on first glance. Each entry below lists (a) what sections they show in order, (b) what I think is worth stealing, (c) what is wrong for our case.

### 1.1 NotebookLM Sources side panel

Google NotebookLM opens a right-side drawer when you click a source in the left list. From memory of the public UI: at the top sits the source title and a file-type icon, then a short auto-generated summary paragraph, then a "Key topics" chip row, then "Suggested questions" CTAs. The prompt-style "use this source" action is at the bottom, not the top.

**Stealable:** (1) Summary paragraph directly below the title - this is the "at-a-glance" payload. (2) Chip rows for topics after the summary - lighter weight than lists. (3) Actions at the bottom, not top - the user reads first, then acts.
**Don't copy:** The "Suggested questions" block - it is noise in our context because an agent has no "ask me about" affordance.

### 1.2 Linear issue detail (inline right sidebar)

Linear's issue view has a main body on the left and a narrow right rail with: Status pill, Assignee avatar, Priority chip, Labels chip row, Project link, Milestone, Due date, Estimate, Cycle, Parent issue, Created/Updated timestamps.

**Stealable:** (1) The **stacked key-value rail** is the densest known pattern for metadata - every row is a single line with label on the left and colored value chip on the right. (2) Labels are chips, not text. (3) The **Priority** chip is the strongest color in the rail so the eye lands on it first.
**Don't copy:** No summary, no analogy, no verdict. Linear assumes the user already knows what the issue is. Agent profiles can't assume that.

### 1.3 Notion page properties panel

Notion's "Properties" panel (top of a page or as a side panel when you open a database row) shows: emoji/icon, page title, then a vertical stack of typed properties: text fields, select chips, multi-select chip rows, relations, dates, formulas.

**Stealable:** (1) **Multi-select chip rows** for tools and tags are the cleanest pattern for "0..N" values - better than comma-separated text because hover and click are possible per chip. (2) Notion uses a light tint per select value - analogous to our phase/model tints.
**Don't copy:** Notion hides most properties under a collapsed header by default. Our users need tools/connections visible, not hidden.

### 1.4 Wikipedia infobox (right-floated table)

The canonical Wikipedia infobox for a "person" article: portrait at top, caption, then a tightly packed two-column key-value table with bold labels on the left and values on the right, section headers in between ("Personal", "Career", "Awards"), and a signature/quote block at the bottom.

**Stealable:** (1) **Portrait + caption as hero** is 120 years of editorial practice - it is the most scannable identity block possible. (2) **Section headers inside the infobox** organize a long list into 3-4 logical groups, improving scan. (3) Two-column key-value is the densest way to list facts.
**Don't copy:** Wikipedia infoboxes have no verdict (no "when to cite this person"). They also have no color - they rely on the reader's patience. Our sidebar needs to be faster.

### 1.5 Steam game/profile card

Steam's game detail page has a big video/screenshot banner at the top, title, developer and publisher chips, star rating and review summary, a short "About this game" paragraph, then a long feature list, system requirements, reviews, and purchase CTA. The profile card variant (the one that appears on hover over a user) is much smaller: avatar, display name, level, status, current game.

**Stealable:** (1) The review summary chip ("Mostly Positive") is a **verdict primitive** - a single word with a colored background that captures the community decision. Our Verdict Panel is the pipeline-age version of this. (2) Steam puts the **About** paragraph before the features list - narrative first, then structured data.
**Don't copy:** Steam is a buying surface; it uses persuasion language. Agents are tools, not purchases, so tone stays neutral.

### 1.6 GitHub profile sidebar (left rail on user pages)

GitHub's profile left rail: avatar circle, display name, handle, followable state, bio paragraph, company, location, email, website, Twitter, "Achievements", "Organizations" avatar grid.

**Stealable:** (1) The **avatar + display name + handle** block is the cleanest identity hero known to web UI. (2) Bio is 1-2 sentences, always. (3) The achievements row is a silent chip strip - no labels, just icons with tooltips.
**Don't copy:** GitHub assumes you're looking at a human, so it shows social metadata. Agents don't have followers.

### 1.7 D&D Beyond character sheet

The D&D Beyond character sheet has an ambitious information architecture: at the top a banner with portrait + name + class + level, then a row of core stats (STR, DEX, CON, INT, WIS, CHA), then tabs for Actions/Spells/Inventory/Features/Description. Each tab is a dense scrollable list.

**Stealable:** (1) **Core stats row** below the hero - a fixed set of 4-6 numbers in a horizontal strip. For agents this maps to: model, ctx, avg tokens, cost, phase, estimated load. (2) Tabbed body is exactly Variant C below - it works for games because each tab is a different **modality** (spellcasting vs combat), not a different slice of the same thing.
**Don't copy:** A sidebar is not a full page - tabs cost a click per switch and the ceiling on tab count is ~3. More and the pattern collapses.

### 1.8 LinkedIn profile card (hover card)

LinkedIn's hover card: banner, avatar, name, headline (1 sentence), current title, location, connection count, "Connect" button.

**Stealable:** (1) **Headline = 1 sentence** is our "KIM JEST" section almost verbatim. (2) The card is narrow (~320-360px wide) - a useful proof that 380px is enough room for a full profile.
**Don't copy:** LinkedIn is optimized for persuasion; we're optimized for recognition.

### 1.9 Figma component properties panel

Figma's right-side properties panel when you select a component: "Design" tab with Auto layout, constraints, position, size, typography, effects, fills, strokes, and the "Properties" section for instances (text overrides, boolean toggles, variants). Sections are collapsible accordions with section icons.

**Stealable:** (1) **Collapsible accordions with section icons** - this is the purest form of progressive disclosure and Figma has refined it over a decade. (2) Figma remembers accordion state per session - a quality-of-life detail we should also do via localStorage. (3) Section icons double as collapse toggles.
**Don't copy:** Figma's panel is a power-user surface, not a learning surface. Agents need to teach first and configure second.

### 1.10 Raycast command detail pane

Raycast (macOS launcher) shows a small right pane when you hover over a command in the list: icon, name, subtitle, category tag, keyboard shortcut chip, and a 2-3 sentence description.

**Stealable:** (1) **Icon + name + subtitle + category + shortcut** is a five-element hero that takes ~80px vertical. That is exactly the space budget we want for the v32.13 hero. (2) The subtitle is always 1 line - a hard copy constraint enforces clarity. (3) Keyboard shortcut chip on the right side of the hero.
**Don't copy:** Raycast has no verdict, no analogy, no long description - it trusts the name. Agents cannot trust the name alone because most users do not know what `res_critic` or `synthesizer` does.

### 1.11 Cursor / Copilot agent chooser

Cursor and GitHub Copilot Chat both have agent pickers. Cursor's "Composer agents" dropdown shows agent name, a sentence description, a model badge, and keyboard shortcut. GitHub Copilot's agent list in the sidebar shows agent name, provider, capabilities as icon strip, and a "Start chat" button.

**Stealable:** (1) **Capabilities as icon strip** maps directly to our tools row. (2) Copilot's "provider + model badge" pattern is what our Hero Model Chip should feel like. (3) Both chooser UIs lead with **category/phase**, not name, because users filter by "what phase am I in" before "which agent name I want".
**Don't copy:** Both are narrow list items, not full profiles - they lack any verdict/analogy.

### 1.12 Claude Agents marketplace cards

The `claude.ai/agents` marketplace (from memory of public posts) shows each agent as a card: icon, name, author, 1-2 sentence description, capability tags, "Add" button, and on click expands to a full page with sections "What it does", "When to use", "Example prompts", "Limitations", "Credits".

**Stealable:** (1) **"What it does / When to use / Limitations"** is a three-section canonical structure that matches our Verdict Panel almost exactly. This is the closest direct reference we have in 2026 for "agent detail as consumer product". (2) "Example prompts" is something we could add later but is out of scope for v32.13.
**Don't copy:** Marketplace cards are selling; they lead with persuasion. Our sidebar leads with recognition.

### 1.13 OpenAI GPT Store profile

The GPT Store "About this GPT" panel: icon, name, creator, description paragraph, "Conversation starters" (4 buttons), "Capabilities" chip list (Web Browsing, DALLE, Code Interpreter), rating count, report link.

**Stealable:** (1) **Capabilities chip list** is the same pattern as our NARZEDZIA row. (2) The ratings count is a social proof signal we **don't** have but could compute internally (how many presets use this agent).
**Don't copy:** The "Conversation starters" buttons push the user into chat. Our surface is configuration, not chat.

### 1.14 Anthropic Skills docs / wshobson agents / VoltAgent / Smolagents

These are more developer-facing. The pattern across all four: a Markdown-style long document with Title, TL;DR, Role, Input, Output, Rules, Example. Our v28+ agent prompts are structured the same way (ROLA / INPUT / OUTPUT / OBOWIAZKI / ZASADY / CZEGO NIE ROBISZ / FORMAT RAPORTU).

**Stealable:** (1) The **ROLA / INPUT / OUTPUT** triad is a useful way to group bullet lists inside the sidebar if we ever render the full prompt. But for v32.13 we don't render the prompt inline - we just offer the "Edit prompt" pill. (2) The TL;DR first paragraph IS our KLUCZOWE KOMPETENCJE card.
**Don't copy:** Raw Markdown documents are too long for a sidebar.

### 1.15 Common skeleton across all 14 references

Mapping each reference to the sections they share, the cross-reference matrix (Y = present, N = absent, ~ = sort-of) looks like this:

```
Section                NotebookLM  Linear  Notion  Wiki  Steam  GitHub  D&D  LinkedIn  Figma  Raycast  Cursor  Claude  GPT  Anthropic
Hero (icon+name+role)     Y          ~       Y        Y     Y      Y      Y      Y       Y       Y        Y       Y      Y      Y
Role/subtitle             Y          N       N        Y     Y      Y      Y      Y       N       Y        Y       Y      Y      Y
Summary paragraph         Y          N       N        ~     Y      Y      N      N       N       Y        Y       Y      Y      Y
Verdict (when/not)        N          N       N        N     ~      N      N      N       N       N        N       Y      ~      Y
Analogy                   N          N       N        N     N      N      N      N       N       N        N       N      N      ~
Capability chips          Y          ~       Y        N     N      Y      Y      N       ~       ~        Y       Y      Y      Y
Metadata key-value        ~          Y       Y        Y     Y      Y      Y      ~       Y       N        ~       Y      N      ~
Long description          Y          N       N        Y     Y      ~      Y      N       N       N        N       Y      Y      Y
Anti-patterns/limits      N          N       N        N     N      N      N      N       N       N        N       Y      N      Y
Tools/actions bar         Y          Y       Y        N     Y      N      Y      Y       Y       ~        Y       Y      Y      N
Connections/relations     N          Y       Y        N     N      Y      N      Y       N       N        N       N      N      N
CTA to full view          Y          N       N        N     Y      N      N      Y       N       N        N       Y      N      N
```

**Reading the matrix:** Hero is universal. Long description is present in 10/14. Capability chips in 9/14. Verdict in only 3/14 - we're importing this pattern because it solves a real problem (users don't know when to use which agent), not because it is standard. Analogy is in 1/14 - we invented it in v15 Encyclopedia and it differentiates us; we should keep it but be careful it doesn't feel twee.

**The common skeleton is:** HERO -> SUMMARY -> CHIPS -> METADATA -> LONG DESCRIPTION -> ACTIONS -> CTA. This is what muscle memory expects, and the v32.13 sidebar should map to it even while we add our own Verdict Panel and Analogy.

---

## 2. Section proposals for the v32.13 agent sidebar

### 2.1 Your starting hypothesis, critiqued

Your hypothesis list (15 sections):
1. Hero
2. KIM JEST
3. ANALOGIA
4. VERDICT PANEL (green/red)
5. KLUCZOWE KOMPETENCJE (long description)
6. CO ROBI (bullets)
7. CZEGO NIE ROBI (bullets)
8. ANTI-PATTERNS
9. CIEKAWOSTKI
10. NARZEDZIA
11. MODEL + cost + ctx
12. OBCIAZENIE
13. POLACZENIA
14. PROMPT
15. ENCYKLOPEDIA CTA

**Problems with this list:**

**(a) Redundancy 1: KIM JEST + KLUCZOWE KOMPETENCJE overlap.** "Who is it" and "what are the key competences" answer almost the same question at slightly different lengths. NNg's "Don't say the same thing twice" rule applies. I recommend merging "KIM JEST" into the ANALOGIA card (1 sentence + 1 italic analogy is tight) and keeping KLUCZOWE KOMPETENCJE as the one long descriptive block.

**(b) Redundancy 2: CO ROBI + CZEGO NIE ROBI semantically overlaps Verdict Panel.** The Verdict Panel already answers "when to use / when not to use", which is action-oriented. CO ROBI and CZEGO NIE ROBI answer "what it does / doesn't do", which is capability-oriented. These are different enough to keep both, but they should be **a secondary, visually lighter block** - not the hero of the sidebar. In v32.12 we deleted the 5 stacked cards in the preset sidebar because Verdict Panel subsumed most of them; here we should not repeat that deletion too aggressively because agents have **capabilities** that presets don't (presets are compositions, agents are primitives).

**(c) Redundancy 3: ANTI-PATTERNS vs CZEGO NIE ROBI vs KIEDY NIE UZYC.** Three sections now all answer "what to avoid":
- Verdict red column = "don't pick this agent when ..."
- CZEGO NIE ROBI = "this agent won't do X even if you ask"
- ANTI-PATTERNS = "common user mistakes that feel right but aren't"

These ARE different, but a typical user can only hold 1-2 "don't" buckets in their head. I recommend: keep Verdict red (hero "don't use when"), keep CZEGO NIE ROBI as small chip list, and **merge ANTI-PATTERNS into CZEGO NIE ROBI as amber-tinted chips** (one chip color per severity). That collapses 3 into 2 without deleting content.

**(d) Missing: PHASE chip in Hero.** Your Hero says "avatar + name + role + phase chip + model chip". I agree phase should be a chip in the Hero, not a separate section. It is a metadata primitive and deserves hero real estate, not scroll-depth.

**(e) Missing: LOAD METER (OBCIAZENIE) positioning.** You list OBCIAZENIE as a separate section deep in the list. In practice **load is a metadata primitive** (like "estimate" in Linear) and belongs as a micro-bar inside the Hero or directly below it, not as a scroll target. It answers "is this agent heavy or light" which is a scanning question, not a reading question.

**(f) Missing: CONNECTIONS as a secondary not primary.** POLACZENIA (connections) is only meaningful when the agent is placed on canvas with neighbors. When a user clicks an agent in the palette (not on canvas) there are no connections - the section must gracefully vanish, not show "0 connections". Plan for empty state.

**(g) Prompt as inline textarea is wrong.** A multiline textarea takes 200-400px of vertical space depending on prompt length. The v28+ prompts are 400-800 words each - that's ~600px of textarea. This destroys the scroll budget and makes every other section harder to reach. **Move prompt editing to a modal** behind a compact pill (same pattern v32.12 used for the Claude Code command pill). The pill shows "EDYTUJ PROMPT" + small icon, the modal opens with the full textarea + copy + reset buttons.

**(h) CIEKAWOSTKI (fun facts) is optional.** Out of 28 agents in v32.11+, only ~15 have populated fun facts in AGENT_KNOWLEDGE. Don't render this section when empty - suppress the whole card.

**(i) Order: the Verdict Panel should NOT be section 4.** In the v32.11 R1 research we established that Verdict Panel is the **"should I even keep reading" gate** and belongs at the top of the body. For agents the same logic applies: after the Hero, the very next block should be the Verdict Panel, and only then long prose.

### 2.2 Revised section list (13 sections, ranked)

The critique above trims from 15 to 13 and reorders:

| # | Section | Must-have | Rationale |
|---|---|---|---|
| 1 | Hero (orb + name + role + phase chip + model chip + micro load bar) | MUST | Identity in 80-100px. Same 5-element pattern as Raycast. |
| 2 | Verdict Panel (dual green/red) | MUST | The "should I read more" gate. Reuses v32.11 recipe. |
| 3 | KLUCZOWE KOMPETENCJE (long description, 3-5 sentences, collapsible at 4 lines) | MUST | The "what makes this agent special" TL;DR. |
| 4 | KIM JEST + ANALOGIA merged card (1 sentence + italic quote) | SHOULD | Memorable + differentiator. Collapses to 1 card not 2. |
| 5 | CO ROBI / CZEGO NIE ROBI twin chip lists (side by side, compact) | SHOULD | Capability scan. Subsumes ANTI-PATTERNS via amber chip tint. |
| 6 | NARZEDZIA chip row | SHOULD | Capability. Same pattern as GPT Store. |
| 7 | POLACZENIA mini-graph (in/out, only if >=1) | MAY | Contextual, hides when empty. |
| 8 | OBCIAZENIE load history sparkline (optional, only if sim data exists) | MAY | Live data, nice-to-have. |
| 9 | CIEKAWOSTKI chip strip (only if populated) | MAY | Fun facts are optional content. |
| 10 | MODEL + cost + ctx compact row (3-chip horizontal, like v32.12 preset) | MUST | Reuse v32.12 compact model row pattern. |
| 11 | EDYTUJ PROMPT pill (32px) | MUST | Opens modal. Reuses v32.12 CLAUDE CODE COMMAND pill pattern. |
| 12 | ZAPISZ / USUN / DUPLIKUJ action strip (tiny icon buttons) | SHOULD | Same row as pill, right-aligned. |
| 13 | ENCYKLOPEDIA AGENTA rich CTA (shimmer) | MUST | Reuse v32.12 is-rich pattern. Eyebrow + title + subtitle + arrow. |

Sections 7, 8, 9 are conditional - they should render as `null` (no card) when their underlying data is empty, not show "0 connections" or "No facts available". This is the **"graceful empty state = no card"** pattern Linear uses.

### 2.3 What is NOT in the list and why

- **KIM JEST as standalone section** - merged into ANALOGIA card. Two sentences, one block.
- **ANTI-PATTERNS as standalone section** - merged into CZEGO NIE ROBI as amber-tinted chips.
- **CATEGORY separate from phase** - in v32.13 the Hero phase chip already encodes category. Don't duplicate.
- **Timestamps** (when was this agent last edited, last used in sim) - out of scope for v32.13, belongs to a telemetry epic.
- **Social (used by N presets)** - interesting but requires a reverse index build, out of scope for v32.13.

---

## 3. Density and scroll budget

### 3.1 How much content before fatigue

Nielsen Norman Group's "Scrolling and Attention" (Pernice 2014, re-tested 2018) established that on desktop, users read the first screen of content carefully and **57% of the viewing time** is spent above the fold. Below the fold the attention decay is roughly linear - by ~3 screen heights most users have left. For a ~700px tall sidebar (typical on 1366x768 laptop with topbar) that means:

- **First screen (0-700px):** high attention. Put Hero + Verdict Panel + top of long description here.
- **Second screen (700-1400px):** medium attention. Tools, connections, facts.
- **Third screen (1400-2100px):** low attention. Prompt editor if inline, CTA at the very bottom.

Our sidebar is 380-440px wide (unchanged from v32.12). With typical section heights (Hero 88px, Verdict 200px, long desc 140px, twin chip lists 100px, tools row 60px, connections 80px, facts 80px, model row 56px, prompt pill 48px, CTA 72px) the total static content runs roughly **920-1100px** before the prompt modal. That fits inside ~1.5 screens, which is safe. If we kept the prompt as an inline textarea of 600px the total would balloon to ~1500-1700px, or 2+ screens, pushing the CTA into the low-attention zone.

**Budget math per section (rough max height at 380px width):**
- Hero: 88px
- Verdict Panel: 220px (5 rows per column + header)
- KLUCZOWE KOMPETENCJE (collapsed at 4 lines): 140px
- KIM JEST + ANALOGIA: 72px
- Twin CO/NIE ROBI chip lists: 110px
- Tools row: 56px (2 rows of chips at 24px + gaps)
- Connections mini-graph: 80px
- Facts chip strip: 48px
- Model compact row: 56px
- Prompt pill + actions: 48px
- Encyclopedia CTA (is-rich): 76px
- Section gaps (10x 10px): 100px
- **Total:** ~1094px worst case

On a 1080p laptop (~900px sidebar visible area after topbar) that's 1.2 screens, which is the sweet spot.

### 3.2 Sticky hero vs scrolling hero

**Recommendation: make the Hero sticky.** Rationale:
1. The Hero carries identity (orb + name + phase + model). If the user scrolls to the bottom to see the prompt or CTA, they should still see **which agent** they're looking at. Losing identity during scroll is one of the most common usability failures in detail sidebars - the user forgets what they clicked.
2. Linear and GitHub both use sticky headers in side panels for exactly this reason.
3. Sticky costs ~88px of permanent viewport. With 900px available we still have 812px for scrolling content - plenty.
4. The Verdict Panel does NOT need to be sticky - it scrolls away once you start reading the long description, and that's fine.

**Implementation sketch (no code):** Hero gets `position: sticky; top: 0; z-index: 2` inside a scrolling container. Add a subtle bottom border or backdrop-blur fade when scrolled (IntersectionObserver flips a class).

### 3.3 Collapsible sections

Refactoring UI chapter "Create depth with layers" recommends keeping the primary scan path linear but allowing **secondary content to collapse**. Mapping to our 13 sections:

- **Always open (no collapse):** Hero, Verdict Panel, KLUCZOWE KOMPETENCJE (first 4 lines), Model row, Encyclopedia CTA.
- **Collapsed by default after 4 lines:** KLUCZOWE KOMPETENCJE. Expand via "Wiecej" inline link.
- **Collapsed by default:** None. Collapsing too much defeats the purpose of a sidebar.
- **Conditionally rendered (absent when empty):** Connections, Facts, Load history, Anti-patterns chips.

Do NOT put accordion toggles on every section. Figma does this because power users need it, but our sidebar is for learning. A user should be able to scroll top-to-bottom once and have everything they need.

### 3.4 Prompt: modal vs inline textarea

**Recommendation: modal.** Three reasons:
1. **Vertical space:** typical v28 prompts are 400-800 words. At 12px monospace that's 450-700px of textarea - more than every other section combined.
2. **Editing ergonomics:** a wider modal (600-800px) with monospace font, line numbers, undo/redo, copy, reset, and version diff is a better editor than a narrow 380px inline textarea.
3. **Separation of read and write:** the sidebar is primarily a **read/learn** surface. Editing is a **do** action. Mixing them violates the "one job per surface" principle from Refactoring UI.

The pill pattern in v32.12 (CLAUDE CODE COMMAND compacted to 32px) proves this works: users click the pill, see a modal, edit, close. It is the same muscle memory.

**Pill contents:** icon (pen or code) + "EDYTUJ PROMPT" + optional badge with character count ("~3.2k zn"). Click opens modal.

---

## 4. Visual recipes (drop-in CSS patterns)

All recipes reuse v32.12 tokens: `--bg-card`, `--bg-input`, `--glass`, `--t1`, `--t2`, phase colors `--ph-*`, model colors `--mc-*`, radius 12px, padding 14px, gap 10px.

### 4.1 Hero card - three visual variants

**Variant HA - "Identity Badge" (recommended).** 88px tall. Left: 48px orb with phase-tinted glow ring, centered vertically. Middle column (flex: 1): name at 16px/700, role at 12px/400 t2, phase chip + model chip + load mini-bar on line 3. Right: 28x28 icon button for "pin to canvas" or "copy agent config". Background: `--bg-card` with inset 1px phase-tinted border-top (2px wide).

Example:
```
+----------------------------------------------------------+
| [orb 48]  Krytyk Badan                          [pin]    |
|           Walidacja jakosci danych i zrodel              |
|           [strategy] [opus]  |||..  8.4k ctx             |
+----------------------------------------------------------+
```

**Variant HB - "Banner-portrait".** 120px tall. Full-width phase-tinted gradient banner (like Steam hero), orb overlaps the banner bottom-left (60x60), name and role below. More dramatic but eats 32px more vertical than HA. Use only if the user explicitly wants "more premium feel".

**Variant HC - "Two-row micro".** 64px tall. Row 1: orb 36 + name. Row 2: role + phase chip + model chip + load. Saves 24px but sacrifices presence. Use only if Variant A doesn't fit a constraint.

**Pick:** HA. It matches v32.12 preset sidebar height and keeps the visual language consistent.

### 4.2 Verdict Panel for agents - variants

**Variant VA - "Dual column, per-column wash" (recommended, direct reuse from v32.11 R1).** Two columns split 50/50 by a hard-stop linear-gradient. Left column background: `rgba(52,211,153,0.10)` (haiku green). Right column: `rgba(248,113,113,0.10)` (qa red). Each column has a small header chip ("KIEDY UZYC" / "KIEDY NIE UZYC") and 4-5 bullets with `::before` icons (check for left, cross for right). Height target: 195-220px.

**Difference from presets:** For agents the bullets should be **2-4 words each, not full sentences**, because agents have more specific trigger words ("gleboki research", "wiele zrodel", "pilny deadline") than presets. Shorter bullets = more bullets fit = denser scan.

**Variant VB - "Single column swipeable".** One column at a time (green THEN red), with a small tab toggle at the top ("POZYTYWNE" / "NEGATYWNE"). Saves vertical space but costs one click and hides half the information. NOT recommended for desktop sidebar - works only on mobile.

**Variant VC - "Compact chip bar"** (fallback). A single row with 3-5 green chips followed by 3-5 red chips. Very compact (~56px tall) but loses the dual-column pre-attentive scan. NOT recommended as primary but useful as a **degraded mode** when long descriptions push the sidebar over budget.

**Pick:** VA. Identical to preset sidebar for muscle memory.

### 4.3 Long description card (KLUCZOWE KOMPETENCJE)

**Variant LA - "Card with collapsible body".** `.ds-card` with --glass background, 12px radius, 14px padding. Section header "KLUCZOWE KOMPETENCJE" at 11px/700 uppercase, 8px gap, then body text 13px/1.5, 3-5 sentences. If body > 4 lines, fade-out gradient on bottom 24px + "Wiecej" inline link. On click, remove fade and expand to full height.

**Variant LB - "Pull-quote style".** Body text rendered as a 14px italic serif (e.g. Georgia) with a 3px left border-accent in the agent's phase color. More editorial but deviates from v32.12's sans-serif-everything style. Skip.

**Variant LC - "Bulleted key competences".** Convert prose to 3-5 bullets. Easier to scan but loses narrative voice. Good as a complement but NOT a replacement - a single prose card is more memorable than bullets.

**Pick:** LA + inline bullets inside the prose where natural. This matches v32.12 SZCZEGOLOWY OPIS.

### 4.4 KIM JEST + ANALOGIA merged card

**Variant KA - "Two-line stack" (recommended).** Line 1 (13px, t1): "Jest ekspertem od X - [role statement]." Line 2 (12px italic, t2, 2px left border-accent): `"This is the conductor of your pipeline."` Total height: ~72px.

**Variant KB - "Quote-first".** Reverse: analogy quote at top, "kim jest" sentence below. More dramatic. Skip because "who is it" is the more informational question and should come first.

**Pick:** KA.

### 4.5 Twin chip lists for CO ROBI / CZEGO NIE ROBI

**Variant TA - "Side-by-side 50/50".** Two columns of chip lists, left green tint ("CO ROBI"), right qa-red tint ("CZEGO NIE ROBI"). Each chip ~24px tall with a small check/cross icon. ANTI-PATTERNS chips are amber-tinted and mixed into the right column (or shown as a small amber "uwaga" ribbon above).

**Variant TB - "Stacked single-column"**. CO ROBI first as a full-width chip row, then CZEGO NIE ROBI. Saves horizontal complexity but loses the comparative visual. Use if Verdict Panel is already dual-column to avoid double-split fatigue.

**Variant TC - "Capabilities grid (4x3)"**. A 4x3 grid of small icon+label chips where positive caps are green and negative are red, mixed. Confusing - don't use.

**Pick:** TB in v32.13 because Verdict Panel already uses the dual-column split. Two dual-columns stacked = visual redundancy. Going stacked here avoids that.

### 4.6 Tools row (NARZEDZIA)

**Variant UA - "Single wrapping row"**. Tools as 22-24px chips, each with an icon + short label ("web", "code", "bash", "read", "edit", "search"). Wraps to 2 rows if needed. Label text at 10-11px.

**Variant UB - "Icon-only strip"**. No labels, just icons + tooltip on hover. Saves vertical but hides info from screen readers unless aria-labels are perfect.

**Pick:** UA with aria-labels. Labels help learning.

### 4.7 Connections mini-graph (POLACZENIA)

**Variant CA - "Two horizontal strips" (recommended).** Top strip: "WEJSCIA" (inputs) with avatar chips of upstream agents. Bottom strip: "WYJSCIA" (outputs) with avatar chips of downstream agents. Each chip has agent orb + name, clickable to jump to that agent's detail.

**Variant CB - "Mini flow diagram".** A tiny 80px SVG showing inputs -> this agent -> outputs as circles with arrows. More visual but harder to hit-test at small sizes.

**Pick:** CA. Easier to click, less custom code.

### 4.8 Compact model row (MODEL + cost + ctx)

Direct reuse of v32.12 preset sidebar `.ds-mdl-row` pattern: 3 horizontal chips (Opus / Sonnet / Haiku), each with a model-tinted left border, small model name, price-per-1k subtitle, and ctx window under it. Active chip has full background tint. Click switches the agent's model in AD.

No new variants needed - the v32.12 pattern is already optimal.

### 4.9 Prompt pill + action strip

**Variant PA - "Single pill, full width"**. 32px tall pill "EDYTUJ PROMPT" centered, hover morphs background. Clicks open modal.

**Variant PB - "Pill + action icons" (recommended)**. Same pill but with a small 3-icon strip on the right inside the same row: [duplicate] [copy prompt] [reset to default]. Each icon 24x24, tooltip on hover.

**Pick:** PB. Users often want to copy before editing, and duplicate is a common operation that belongs near the prompt.

### 4.10 Rich Encyclopedia CTA

Direct reuse of v32.12 `.btn-learn.is-rich` pattern with adjusted copy:
- Eyebrow (11px uppercase): "ENCYKLOPEDIA"
- Title (14px/700): "Poznaj tego agenta"
- Subtitle (11px t2): "Pelny profil, 6 sekcji wiedzy" (where 6 = dynamic count from AGENT_KNOWLEDGE[id] sections)
- Trailing arrow (14px, animates on hover)
- Shimmer sweep every 3.2s at 0.6 opacity

Rationale: the v32.12 R4 research established copy candidate C3 (quantified volume) as the winner. Same logic applies here. The "6 sekcji" is an info-scent signal.

---

## 5. Copy guidance

### 5.1 Tone per section

**Hero role line.** Short, functional, specific. Polish: "Walidacja jakosci danych i zrodel", not "Pomocnik do rzeczy". NNg's specificity bias article (Loranger 2017, from memory of the public blog) shows concrete verbs outperform generic by ~2x in "I understand what this does" polling. Target 3-6 words in Polish.

**Verdict Panel bullets.** 2-4 words each, imperative or nominal. Good: "gleboki research", "wiele zrodel", "pilny deadline". Bad: "Gdy potrzebujesz zrobic gleboki research wielu zrodel jednoczesnie". Short bullets = more fit in 172px column width = better scan.

**KLUCZOWE KOMPETENCJE (long description).** 3-5 sentences, ~60-120 words. Polish academic register is too heavy - prefer product-docs register (like Linear or Stripe docs). First sentence must answer "what does this agent do differently from other agents". Last sentence should answer "when in your workflow does this matter".

**KIM JEST sentence.** One sentence, 10-18 words. Start with "Jest..." or "To...". Example: "Jest sceptycznym recenzentem ktory wylapuje dziury w raportach innych researcherow zanim trafia one do syntezy."

**ANALOGIA quote.** One sentence, italic, in quotes, 8-14 words. **Literal first, metaphorical second.** NNg's work on metaphors in UI copy (Lynch 2018, from memory) shows metaphors that are too clever slow down parsing. "Dyrygent twojego pipelineu" is fine. "Mitologiczny perkusista rytmu wszechswiata" is not.

**CO ROBI / CZEGO NIE ROBI chip labels.** 1-3 words each. Verb-first for CO ROBI ("waliduje zrodla"), noun-first for CZEGO NIE ROBI ("bez executive summary"). Mixing these registers signals the polarity change to the eye.

**ANTI-PATTERNS (amber chips).** 3-6 words, warning tone. "Nie zlecaj mu projektowania API". The negative imperative verb anchors the chip.

**CIEKAWOSTKI.** 1 sentence, neutral tone, often with a number. "W 78% testow dogadywal sie z Synthesizerem w 1 rundzie." Numbers make facts memorable.

**Encyclopedia CTA.** Benefit-loaded verb + quantified promise. "Poznaj tego agenta" (verb) + "Pelny profil, 6 sekcji wiedzy" (quantified). See v32.12 R4 for the full candidate analysis.

### 5.2 Bilingual mirror

Every Polish string needs an English entry in I18N_EN. Keep the English slightly tighter: Polish averages 10-15% more characters than English for the same meaning. The Hero role line should fit in 40 chars Polish / 34 chars English. If a string breaks that budget, truncate with ellipsis at render time (CSS `text-overflow: ellipsis`), not at source time.

### 5.3 Avoid em-dashes and en-dashes

Global rule per MEMORY.md. Use plain ASCII hyphens or parentheses. Replace "and" lists in place of long dashes. This matters in analogies and long descriptions where the temptation to use em-dashes is highest.

---

## 6. Accessibility (WCAG 2.2)

### 6.1 SC 2.5.8 target size (AA minimum 24x24 CSS px)

- **Chips in twin lists** - ensure min 24x24. At 22px tall they fail; pad to 24px. Alternatively, use the "adjacent exception": if chips are in a row with 24px spacing between them, the effective target can include the gap, meeting the SC.
- **Phase chip in Hero** - 24x24 minimum.
- **Model compact chips** - already sized at 56px tall in v32.12 spec, safe.
- **Prompt pill** - 32px tall, 44x120 minimum, safe.
- **Encyclopedia CTA** - 72px tall, safe.
- **Action icon strip (dup/copy/reset)** - each icon 24x24 minimum.

### 6.2 Heading hierarchy

The sidebar is a subordinate region inside the main canvas page. The Hero agent name should be `<h2>` (canvas page has `<h1>` as the main title). Section headers ("VERDICT", "KLUCZOWE KOMPETENCJE", etc.) should be `<h3>`. Sub-section headers inside a card should be `<h4>`. Avoid skipping levels.

### 6.3 ARIA labels and roles

- **Sidebar container:** `<aside role="complementary" aria-label="Szczegoly agenta">` (or aria-labelledby pointing at the Hero h2).
- **Verdict Panel:** `role="region" aria-label="Werdykt - kiedy uzyc i kiedy nie uzyc"`. Each column: `role="list"`, bullets are `role="listitem"`.
- **Tool chips:** `role="list"`, each chip `role="listitem"`, each chip has `aria-label="Narzedzie: web search"` so SR users hear the chip name not just its icon.
- **Model chips in compact row:** `role="radiogroup" aria-label="Model agenta"`, each chip `role="radio" aria-checked="true|false"`.
- **Encyclopedia CTA:** `role="button" aria-label="Otworz encyklopedie agenta, 6 sekcji wiedzy"` (the subtitle becomes part of the aria label).
- **Collapsible long description:** `aria-expanded="false"` initially, button says "Pokaz wiecej" / "Pokaz mniej".

### 6.4 Focus order

Tab order must match visual order top-to-bottom:
1. Close sidebar button (if present)
2. Hero pin/copy icon button
3. Verdict Panel header chips (non-focusable if they're decorative; focusable if they toggle anything)
4. Long description "Wiecej" button
5. Each tool chip (left to right, top to bottom)
6. Connection chips
7. Model radio chips
8. Prompt pill
9. Action icon strip (duplicate, copy, reset)
10. Encyclopedia CTA

Focus-visible outline: 2px solid phase color with 2px offset. Never remove outlines.

### 6.5 Color-independent semantics

Verdict Panel MUST rely on shape (check vs cross) and position (left vs right) in addition to color (green vs red). Refactoring UI rule: "never rely on color alone". CVD users should parse the panel without color.

Tool chips should use icon+label, never icon alone.

### 6.6 Contrast (APCA)

Per v32.8 standards: body text ink >= Lc 75. All phase-tinted card backgrounds and chips must clear this. The phase-ink token pattern introduced in v32.8 (--mc-sonnet-ink, --ph-qa-ink) should be used for any text set on phase backgrounds.

---

## 7. Motion budget

### 7.1 Always-on micro-interactions (within budget)

- **Hero orb breathe** - subtle 2.6s ease-in-out scale 1.00 -> 1.02. Already in v32.8 for nodes, reuse.
- **Encyclopedia CTA shimmer** - diagonal 0.6 alpha sweep every 3.2s. Reuse v32.12 is-rich keyframes.
- **Prompt pill hover morph** - 140ms ease-out background tint transition.
- **Verdict Panel on first paint** - 200ms fade-in (opacity 0 -> 1) so it feels deliberate rather than flashed.
- **Collapsible description expand** - 200ms height transition (use max-height trick since height:auto isn't transitionable).

### 7.2 Demand-driven micro-interactions

- **Tool chip hover tooltip** - 80ms fade.
- **Model chip switch** - 140ms background tint transition on selection change.
- **Connection chip hover** - 100ms lift (translateY -1px) + shadow.
- **Copy prompt action** - 800ms "Skopiowano" toast + green tick flash on icon.

### 7.3 What to NOT animate

- **Scroll-triggered reveals.** The sidebar opens as a whole unit, not piecewise. Scroll reveals feel performative and slow down power users.
- **Parallax.** Not appropriate for a profile panel.
- **3D transforms on cards.** They're expensive and don't match v32.12 flat-glass language.
- **Bouncing.** Bouncing springs feel juvenile in a professional tool. Use ease-out not spring.

### 7.4 prefers-reduced-motion

Wrap every animation block in `@media (prefers-reduced-motion: no-preference) { ... }` or use `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms; transition-duration: 0.01ms; } }`. The v32.8 global reduce-motion rule already exists - confirm it covers the new selectors introduced by this work.

Users with `prefers-reduced-motion: reduce` should still see the **final state** of every animation instantly, not a broken mid-state. Test by setting the media query in devtools.

---

## 8. Final recommended section order (DD01 input)

This is the list to feed into `v32.13/plans/MANIFEST.md` as Design Decision 01.

**Ranked section order for the v32.13 agent detail sidebar:**

```
1.  HERO                       [sticky]   [must]   88px
    orb + name + role + phase chip + model chip + load mini-bar

2.  VERDICT PANEL              [scroll]   [must]   220px
    dual-column green KIEDY UZYC / red KIEDY NIE UZYC
    (reuse v32.11 R1 Pattern #1)

3.  KLUCZOWE KOMPETENCJE       [scroll]   [must]   140px collapsed
    long description, 3-5 sentences, "Wiecej" inline toggle after 4 lines

4.  KIM JEST + ANALOGIA        [scroll]   [should] 72px
    1 sentence who + 1 italic quote analogy

5.  CO ROBI / CZEGO NIE ROBI   [scroll]   [should] 100px
    twin stacked chip lists, amber chips inlined for anti-patterns

6.  NARZEDZIA                  [scroll]   [should] 56px
    single wrapping chip row with icons + labels + aria-labels

7.  POLACZENIA                 [scroll]   [may]    80px
    WEJSCIA / WYJSCIA strips, empty-state = no card

8.  OBCIAZENIE                 [scroll]   [may]    48px
    load history sparkline, empty-state = no card

9.  CIEKAWOSTKI                [scroll]   [may]    48px
    inline chip strip, empty-state = no card

10. MODEL + COST + CTX         [scroll]   [must]   56px
    compact 3-chip radiogroup row (reuse v32.12 .ds-mdl-row)

11. PROMPT PILL + ACTIONS      [scroll]   [must]   48px
    32px pill + [duplicate] [copy] [reset] icon strip
    pill opens full-screen modal editor

12. ENCYKLOPEDIA CTA           [scroll]   [must]   76px
    is-rich shimmer with eyebrow + title + subtitle + arrow
```

**Rationale for this specific order:**

- **Hero first** is not a decision, it's universal. Sticky so identity is never lost.
- **Verdict Panel second** is the v32.11 "should I keep reading" gate. The user's first question is "is this the right agent for me". Answer it before they spend any more time.
- **KLUCZOWE KOMPETENCJE third** is the summary payload for users who said "yes" to the Verdict Panel. It's the "what's special" explanation in prose, which is more memorable than bullets. Collapsed after 4 lines so short-form readers aren't punished.
- **KIM JEST + ANALOGIA fourth** adds memorability. It comes after the long description because the analogy works best as a "mental snapshot" AFTER the reader has the full picture, not before.
- **Twin CO/NIE ROBI fifth** is for the "now I understand the big picture, show me the specifics" reader. Chips give fast scan.
- **Tools sixth** because tools are a capability primitive that belongs near the capabilities list.
- **Connections seventh** only in canvas context. If the user opened the sidebar from the palette (no connections yet), this section is hidden.
- **Load + Facts eighth and ninth** are optional seasoning. Often empty - hide when empty.
- **Model compact row tenth** is a **configuration** action. Configuration actions come after learning actions. Users should read the profile, then pick the model.
- **Prompt pill eleventh** is another configuration action. It opens a modal so it doesn't eat scroll.
- **Encyclopedia CTA LAST** because by the time the user reaches the bottom, either they're convinced and want the deep dive, or they're not and won't click. Bottom placement is the natural "I want more" signal. See v32.12 R4 Pattern analysis.

---

## 9. Three layout variants for HITL Gate #1

The user needs to pick one of these three at the v32.13 Gate #1. Each has a short pitch, a mockup, pros, cons, and my recommendation at the end.

### 9.1 Variant A - "Information-dense"

**Pitch:** Everything inline, everything visible, deep scroll is the price of completeness. For power users who want to see the whole agent at a glance and don't mind scrolling.

**ASCII mockup:**

```
+--- 380px agent sidebar -----------------------------+
| [orb] Krytyk Badan                     [pin]        |  Hero 88
|       Walidacja jakosci danych                      |
|       [strategy] [opus]  |||..                      |
+------------------------------------------------------+
| VERDICT                                              |  220
| +-----------------+----------------------------+    |
| | / KIEDY UZYC    | X KIEDY NIE UZYC           |    |
| | / gleboki res   | X proste pytania           |    |
| | / wiele zrodel  | X tanie modele             |    |
| | / wymaga walid  | X one-shot zadania         |    |
| | / sceptycyzm    |                            |    |
| +-----------------+----------------------------+    |
+------------------------------------------------------+
| KLUCZOWE KOMPETENCJE                                 |  180
| Krytyk Badan to sceptyczny recenzent ktory...        |
| [full 5 sentences, no collapse]                      |
+------------------------------------------------------+
| KIM JEST                                             |  88
| Jest niezaleznym walidatorem raportow researcherow.  |
| "To twoj peer reviewer przed syntezem."              |
+------------------------------------------------------+
| CO ROBI                        CZEGO NIE ROBI        |  120
| * waliduje zrodla              * bez executive sum   |
| * sprawdza sprzeczności        * bez własnych tez    |
| * flag hallucinations          * bez kodu            |
+------------------------------------------------------+
| ANTI-PATTERNS                                        |  72
| [amber] nie zlecaj projektowania                     |
| [amber] nie uzywaj do szybkich odpowiedzi            |
+------------------------------------------------------+
| NARZEDZIA                                            |  56
| [web] [read] [search] [compare]                      |
+------------------------------------------------------+
| POLACZENIA                                           |  100
| WEJSCIA: [orch] [res_tech] [res_ux]                  |
| WYJSCIA: [synth]                                     |
+------------------------------------------------------+
| OBCIAZENIE                                           |  56
| |||.. 8.4k ctx  ~3s  $0.012/run                      |
+------------------------------------------------------+
| CIEKAWOSTKI                                          |  64
| * W 78% debat znajduje min 1 luke                    |
| * Jedyny agent bez opinii wlasnych                   |
+------------------------------------------------------+
| MODEL                                                |  56
| [opus active] [sonnet] [haiku]                       |
+------------------------------------------------------+
| EDYTUJ PROMPT                    [dup] [copy] [rst]  |  48
+------------------------------------------------------+
| ENCYKLOPEDIA                                         |  76
| Poznaj tego agenta ->                                |
| Pelny profil, 6 sekcji wiedzy                        |
+------------------------------------------------------+
   total scroll height: ~1270px (1.6 screens on 1080p)
```

**Pros:**
- Everything visible, no clicks to see content.
- Familiar linear scroll.
- Works great for power users who already know what they're looking for.

**Cons:**
- **Deep scroll.** 1270px is 1.6 screens on a 1080p laptop, ~1.9 screens on 720p. The Encyclopedia CTA is below the fold by default.
- **Dense to first-time users.** 10+ sections at once is overwhelming.
- **Prompt modal still required** (because inline prompt would push to 1900px, which is unusable). So "everything inline" is a lie - prompt is still modal.

### 9.2 Variant B - "Progressive disclosure" (recommended)

**Pitch:** Hero sticky at top, Verdict Panel and long description always visible as the scan surface, secondary sections (tools, connections, facts) visible but compact, optional sections hidden when empty, one "Rozwiñ" expand link for the long description. Prompt as modal. Lower scroll, still all information available.

**ASCII mockup:**

```
+--- 380px agent sidebar -----------------------------+
| [orb] Krytyk Badan                     [pin]        |  88 STICKY
|       Walidacja jakosci danych                      |
|       [strategy] [opus]  |||..                      |
+------------------------------------------------------+
| VERDICT                                              |  220
| +-----------------+----------------------------+    |
| | / KIEDY UZYC    | X KIEDY NIE UZYC           |    |
| | / gleboki res   | X proste pytania           |    |
| | / wiele zrodel  | X tanie modele             |    |
| | / wymaga walid  | X one-shot zadania         |    |
| | / sceptycyzm    |                            |    |
| +-----------------+----------------------------+    |
+------------------------------------------------------+
| KLUCZOWE KOMPETENCJE                                 |  140
| Krytyk Badan to sceptyczny recenzent ktory...        |
| wylapuje luki w raportach innych researcherow.       |
| Pracuje przed syntezerem i dziala jako peer reviewer |
| zgloszen do Gold Solution...                         |
| [fade] Wiecej v                                      |
+------------------------------------------------------+
| KIM JEST                                             |  72
| Jest niezaleznym walidatorem raportow.               |
| "To twoj peer reviewer przed syntezem."              |
+------------------------------------------------------+
| CO ROBI / CZEGO NIE ROBI                             |  100
| [check] waliduje      [cross] bez exec summary       |
| [check] znajduje luki [cross] bez wlasnych tez       |
| [amber] nie do szybkich odpowiedzi                   |
+------------------------------------------------------+
| NARZEDZIA                                            |  56
| [web] [read] [search] [compare]                      |
+------------------------------------------------------+
| POLACZENIA      [hidden when empty]                  |  80 (conditional)
| WEJSCIA: [orch] [res_tech] [res_ux]                  |
| WYJSCIA: [synth]                                     |
+------------------------------------------------------+
| MODEL                                                |  56
| [opus] [sonnet] [haiku]                              |
+------------------------------------------------------+
| EDYTUJ PROMPT (3.2k)       [dup] [copy] [rst]        |  48
+------------------------------------------------------+
| ENCYKLOPEDIA                                         |  76
| Poznaj tego agenta ->                                |
| Pelny profil, 6 sekcji wiedzy                        |
+------------------------------------------------------+
   total scroll height: ~936px (1.0-1.2 screens on 1080p)
   sticky hero: 88px always visible during scroll
```

**Pros:**
- **Scroll budget healthy.** ~936px = 1 screen on 1080p. Encyclopedia CTA is at or just below the fold.
- **Sticky hero preserves identity** during scroll.
- **Graceful empty states.** No "POLACZENIA: 0 connections" clutter.
- **Long description collapsed** for short-form readers, expandable for deep readers.
- **Prompt modal** keeps the sidebar clean.
- Matches v32.12 preset sidebar muscle memory.

**Cons:**
- "Wiecej" inline toggle is one more affordance to explain.
- Users have to scroll once to reach the CTA (but this is normal).

### 9.3 Variant C - "Two-zone tabbed"

**Pitch:** Top zone is static (Hero + Verdict + Model + Prompt pill + CTA). Bottom zone is a tabstrip with 3 tabs: "WIEDZA" (long desc + kim jest + analogia + ciekawostki), "NARZEDZIA" (tools + connections + anti-patterns), "PROMPT" (inline read-only prompt viewer + edit button). Each tab body scrolls independently.

**ASCII mockup:**

```
+--- 380px agent sidebar -----------------------------+
| [orb] Krytyk Badan                     [pin]        |  88 STATIC
|       Walidacja jakosci danych                      |
|       [strategy] [opus]  |||..                      |
+------------------------------------------------------+
| VERDICT                                              |  220 STATIC
| +-----------------+----------------------------+    |
| | / KIEDY UZYC    | X KIEDY NIE UZYC           |    |
| +-----------------+----------------------------+    |
+------------------------------------------------------+
| MODEL                                                |  56 STATIC
| [opus] [sonnet] [haiku]                              |
+------------------------------------------------------+
| EDYTUJ PROMPT               [dup] [copy] [rst]       |  48 STATIC
+------------------------------------------------------+
| ENCYKLOPEDIA                                         |  76 STATIC
| Poznaj tego agenta ->                                |
+======================================================+
| [WIEDZA] [NARZEDZIA] [PROMPT]                        |  44 TABSTRIP
+------------------------------------------------------+
| ... tab body scrolls independently ...               |  ~300 BOTTOM ZONE
|                                                      |
| KLUCZOWE KOMPETENCJE                                 |
| Krytyk Badan to sceptyczny recenzent...              |
|                                                      |
| KIM JEST                                             |
| Jest niezaleznym walidatorem...                      |
|                                                      |
+------------------------------------------------------+
   total top zone: ~488px
   bottom zone scroll: 300-400px
   total: 788-888px
```

**Pros:**
- **Shortest total height.** 788-888px fits on 1080p easily.
- **Hero + Verdict + Model + CTA always visible** - the 4 most actionable things are never scrolled away.
- **Tabbed lower body** separates reading (wiedza) from acting (narzedzia) from inspecting (prompt).

**Cons:**
- **Tab cost.** Each tab switch is a click + context break. Power users can handle it; first-time users lose the linear scan path.
- **Tab count ceiling.** Three tabs is the ceiling for sidebars - more and they either get too narrow to hit or start wrapping.
- **Muscle memory break.** The v32.12 preset sidebar is a single scroll. Making the agent sidebar a two-zone tabstrip means the two sidebars work differently, which violates the "same design language" user directive.
- **Hidden info.** By default users only see one of three tab bodies. If facts live in "WIEDZA" but connections live in "NARZEDZIA", the user has to click to find each.
- **Prompt tab is redundant** because the prompt is behind a modal anyway. Why have a tab for it?

### 9.4 Recommendation

**Variant B (Progressive Disclosure).** Reasons:

1. It matches v32.12 preset sidebar structure closely, honoring the user's hard constraint of "same visual language".
2. It fits inside one screen on 1080p and 1.2 screens on 720p - the best scroll budget of the three.
3. It doesn't require tabs, which Variant C adds and which break muscle memory.
4. It collapses long description sensibly (4 lines visible + "Wiecej") so short-form and long-form readers are both served.
5. It gracefully hides empty sections, which is the most professional pattern in modern profile sidebars (Linear, NotebookLM).
6. It puts the Encyclopedia CTA at the natural bottom of a single-scroll profile, matching v32.12 R4's placement principle.

Variant A is the fallback if the user feels Variant B hides too much. It costs ~334px more scroll and feels more "brochure" than "profile".

Variant C is the fallback if the user feels Variant B still scrolls too much on 720p laptops. It trades scroll budget for click cost. I do not recommend it because the click cost is per-view (every time you open an agent you click a tab) while the scroll cost is amortized.

---

## 10. Risks, unknowns, and open questions for Gate #1

1. **Prompt modal width.** A 600-800px modal over a 1366px canvas leaves only ~283-483px of canvas visible behind the backdrop. Is that acceptable or should the modal be full-screen? Decision needed before Phase D2.

2. **Sticky hero on mobile.** If the sidebar ever becomes a bottom sheet (not planned for v32.13), sticky hero semantics change. Ignore for now.

3. **Empty-state policy for NARZEDZIA.** Some agents have zero tools declared (e.g. `decision_presenter`). Should the NARZEDZIA card show "Brak zadeklarowanych narzedzi" (explicit empty) or vanish entirely? My recommendation: vanish entirely, same as connections and facts. Consistency > explicitness.

4. **Connections data source.** The sidebar needs to know neighbors. If the user opens the sidebar from the palette (not the canvas), the connections are by definition empty. Confirm the render function has access to `poly` (connections array) and node context.

5. **Load meter data source.** "Obciazenie" (load) - is this a static estimate from AGENT_TOKENS or a live value from the sim? If static, it's a simple per-agent string. If live, it needs a sim-state subscription. My recommendation: static estimate with a note "szacowane" to be honest.

6. **Facts counter in Encyclopedia CTA.** "6 sekcji wiedzy" should be dynamic: count of populated fields in AGENT_KNOWLEDGE[id]. Implementation trivial but needs to be a getter, not a hardcoded string.

7. **Polish copy review.** My copy samples above are production-ready but not reviewed by a native speaker editor. Recommend the user or a Polish editor pass over final copy before ship.

8. **Analogy tone guardrail.** Who reviews the analogies to make sure they're literal-first, not too clever? Recommend: keep a style guide in DESIGN_SPEC.md with 3 good examples and 3 bad examples for future contributors.

---

## 11. Confidence labels per claim

- [CERTAIN] Verdict Panel recipe reuse from v32.11 R1.
- [CERTAIN] Rich CTA recipe reuse from v32.12 R4.
- [CERTAIN] Prompt modal > inline textarea for vertical budget reasons.
- [CERTAIN] Sticky Hero is the correct choice for identity preservation.
- [CERTAIN] Variant B is the right recommendation given the v32.12 muscle memory constraint.
- [PROBABLE] Section order 1-13 as ranked. Order of sections 7/8/9 (connections/load/facts) could shuffle based on user data availability.
- [PROBABLE] Pill + action icon strip row (Variant PB) beats pill-only. Based on common UX patterns, not A/B tested in our context.
- [PROBABLE] Two-column CO/NIE ROBI is worse than stacked because Verdict Panel is already dual-column. Based on visual redundancy heuristic, not user test.
- [SPECULATION] Exact pixel heights in the mockups. These are drafting numbers to validate the scroll budget - final heights will shift a few px in implementation.
- [SPECULATION] Analogy metaphor-vs-literal guidance. Based on NNg principle memory, not a live study.
- [SPECULATION] 78% number in the CIEKAWOSTKI example. Placeholder only - do not ship without real data.

---

## 12. Sources cited (where verifiable)

**Primary reuse (in-repo):**
- `v32.11/research/R1_ui_patterns.md` - Dual Verdict Panel recipe, dual-column scan rationale, APCA/CVD guardrails. Directly reused for section 4.2.
- `v32.12/research/R4_encyclopedia_cta.md` - Rich CTA copy analysis, "Pelna encyklopedia + N sekcji" quantified promise pattern, button baseline audit. Directly reused for section 4.10 and 5.1 CTA.
- `v32.12/research/R1_compact_controls.md` - 32px pill pattern for compact command surface. Directly reused for section 4.9 prompt pill.
- `v32.8/research/R2_material3.md` - APCA ink tokens, Material 3 list item with supporting text. Implicit reuse for contrast floor.

**External references (by memory of public docs; reader should verify before quoting):**
- Nielsen Norman Group - "Scrolling and Attention" (Pernice 2014, re-tested 2018). Referenced in section 3.1 for first-screen attention distribution.
- Nielsen Norman Group - Loranger on specificity in UI copy (memory of blog, ~2017). Referenced in section 5.1.
- Nielsen Norman Group - Lynch on metaphor clarity in UI (memory of blog, ~2018). Referenced in section 5.1.
- Refactoring UI (Steve Schoger, Adam Wathan) - "Create depth with layers", "Scannable list rules", "Never rely on color alone". Referenced in sections 3.3, 4.2, 6.5.
- WCAG 2.2 SC 2.5.8 Target Size (Minimum). https://www.w3.org/TR/WCAG22/#target-size-minimum. Referenced in section 6.1.
- WCAG 2.2 SC 2.4.11 Focus Not Obscured. Referenced implicitly via sticky hero design.
- Apple Human Interface Guidelines - Sidebar and Popover patterns (memory of public docs). Referenced in section 1 implicitly.
- Material 3 - List item with supporting text, Side sheet component. Referenced in section 1.10 and 4.1.
- Information Foraging Theory (Pirolli, Card - Xerox PARC, 1995). Referenced in section 1 implicitly and directly in v32.12 R4.
- Anthropic Agent Skills documentation (structure of ROLE/INPUT/OUTPUT prompts). Referenced in section 1.14 - this matches our v28+ prompt structure exactly.
- Linear issue detail UI (memory of current product). Referenced in section 1.2.
- GitHub user profile sidebar (memory of current product). Referenced in section 1.6.
- NotebookLM source panel (memory of current product). Referenced in section 1.1.
- Figma properties panel (memory of current product). Referenced in section 1.9.
- Raycast command pane (memory of current product). Referenced in section 1.10.
- D&D Beyond character sheet (memory of current product). Referenced in section 1.7.
- Steam game detail page and profile hover card (memory of current product). Referenced in section 1.5.
- Claude Agents marketplace detail (memory of public launch blog). Referenced in section 1.12.
- GPT Store agent profile page (memory of public product). Referenced in section 1.13.

**External references NOT verified in this session:** None of the external product references above were opened via WebFetch in this research session. They are described from prior exposure to the products' public UIs and from the research corpus already in-repo. For any claim tagged [CERTAIN] above the source is the in-repo research file; for [PROBABLE] and [SPECULATION] the source is memory of public docs. Implementer should verify any specific measurement (e.g. exact Linear sidebar widths) against the live product before shipping.

---

## 13. Handoff: what the next phase needs from this report

For **MANIFEST.md (DD01..DDN):**
- DD01 = section order per section 8
- DD02 = layout variant choice (recommendation: Variant B)
- DD03 = prompt-as-modal decision (recommendation: yes)
- DD04 = sticky hero decision (recommendation: yes)
- DD05 = graceful empty state policy (recommendation: hide card)
- DD06 = long description collapse threshold (recommendation: 4 lines)
- DD07 = anti-patterns merged into CZEGO NIE ROBI as amber chips (recommendation: yes)
- DD08 = Verdict Panel bullet length cap (recommendation: 2-4 words)

For **DESIGN_SPEC.md:**
- Tokens already defined in v32.8 and v32.12. No new tokens needed.
- Reuse `.ds-card`, `.ds-cmd`, `.ds-mdl-row`, `.ds-mdl-chip`, `.btn-learn.is-rich`, `.pr-verdict-*` (rename for agent scope to `.ag-verdict-*` or share if tokens allow).
- New utilities needed: `.ds-hero-sticky`, `.ds-tools-row`, `.ds-conn-strip`, `.ds-long-collapse` with fade mask.

For **LAYOUT_SPEC.md:**
- Use the Variant B ASCII mockup in section 9.2 as the canonical layout.
- Provide HTML structural sketch (no CSS) with class names matching DESIGN_SPEC.
- Provide aria attribute map per section 6.3.

For **HITL_GATE_1.md:**
- Present all three variants from section 9 with pros/cons and the recommendation (Variant B).
- Include the open questions from section 10 as explicit "need your answer" items.

---

**End of R4.**
