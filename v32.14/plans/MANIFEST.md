# MANIFEST.md - v32.14 Design Decisions

Author: Main thread (Phase C)
Date: 2026-04-10
Source: research/R1..R5 + CRITIC.md
Status: **DRAFT - pending HITL Gate #1 approval**

This manifest locks the design decisions for v32.14 Agent Encyclopedia
Premium (4 pilot agents). Each DD is numbered, has a rationale, and cites
its research source. Phase D builders must not diverge from these without
raising a new DD.

---

## DD01 - Scope: 4 pilot agents, feature-gated

The v32.14 rebuild applies ONLY to `res_reddit`, `res_x`, `res_github`,
`res_forums`. The other 31 agents keep the current v32.13 renderer.

**Mechanism**: `rysujBentoAgenta(aid)` early-branches:
```js
if (AGENT_EDU_PL[aid]) return rysujBentoAgentaV14(aid);
// ... legacy v32.13 code unchanged
```

**Source**: user directive + R1 + CRITIC CFL-07
**Rationale**: keeps risk surface minimal; zero regression for the 31 agents

---

## DD02 - Content: parallel AGENT_EDU_PL constant

Introduce a new top-level JS constant `AGENT_EDU_PL` keyed by agent id.
Each entry has 18 fields extracted from notebookLM md files by R2:

```
tagline          string  - 1 line hook
missionShort     string  - 2-3 sentences "dlaczego"
whoIs            string  - 1-2 sentences "kim jestem"
analogy          string  - metaphor quote
howItWorks       array   - 4 steps (input -> process -> output -> handoff)
inputs           array   - 3-5 entry inputs
outputs          array   - 3-5 exit outputs
does             array   - 6-10 action bullets
doesNotDo        array   - 4-8 anti-action bullets
antiPatterns     array   - 3-5 failure modes
keyConcepts      array   - 3-5 terms with 1-line definitions
stats            array   - 2-4 {label, value} pairs for META tile
bestFor          array   - 3 use cases
worstFor         array   - 3 anti use cases
relatedAgents    array   - 2-3 agent ids for "nastepny agent"
glossary         array   - [{term, definition}] for tooltips
learningQuote    string  - memorable closing line
realExample      string  - 1 concrete story
```

All strings diacritic-cleaned at Phase D injection time (CFL-06).

**Source**: R2 + CRITIC CFL-07
**Rationale**: schema mismatch with AGENT_KNOWLEDGE makes parallel constant
cleaner than merging; feature-gating depends on presence of this constant

---

## DD03 - Content: new AGENT_MEDIA constant

Introduce `AGENT_MEDIA` keyed by agent id:

```js
AGENT_MEDIA = {
  res_reddit: {
    infographic: 'data:image/jpeg;base64,...',  // inline base64
    presentationPath: 'notebookLM/0.7 Researcher_Reddit/prezentacja/AI_Decomposition_Blueprint.pdf',
    mindmapPath: 'notebookLM/0.7 Researcher_Reddit/mapa mysli/NotebookLM Mind Map.png'
  },
  // ...
}
```

- Infographic: embedded inline as base64 (offline-first)
- Presentation PDF: relative path, opened via `window.open`
- Mindmap PNG: optional, nice-to-have for v32.15

**Size budget**: <=700KB per raw jpg before base64. Total HTML growth
~3.5MB (from 836KB baseline to ~4.3MB).

**Source**: R1 + user directive + CRITIC CFL-08
**Rationale**: single-file offline-first hard constraint forces inline
embedding; PDF path is fine because user can double-click

---

## DD04 - Grid: container queries on `.bento-scroll`

Replace the current `@media (max-width: 1100/900/700)` viewport queries
with `@container bento (min-width: 520/860/1200/1800/2200)` container
queries on `.bento-scroll`.

Breakpoints:

| Container width | Cols | Gap  | Rationale           |
|-----------------|------|------|---------------------|
| base (mobile)   | 1    | 10px | Phone single column |
| >= 520px        | 2    | 10px | Tablet portrait     |
| >= 860px        | 3    | 12px | Laptop HD           |
| >= 1200px       | 4    | 14px | FHD 1920 desktop    |
| >= 1800px       | 5    | 15px | QHD 2560            |
| >= 2200px       | 6    | 16px | Ultrawide 3440      |

**Source**: R5 (primary) + CRITIC CFL-01
**Rationale**: modal is `calc(100% - 260px)`, container queries reflect
real grid width; mobile-first cascade is cleaner

---

## DD05 - Grid: modal max-width cap via `width: min(100%, 1680px)`

Cap the grid track width at 1680px for base and 3/4-col breakpoints. Widen
to 2100 at 5-col (QHD) and 2400 at 6-col (ultrawide). Centered via
`margin-inline: auto`.

**Source**: R3 pattern P12 + R5 + CRITIC CFL-02
**Rationale**: single most impactful fix for "tiles too wide on big
screens" user complaint; keeps FHD unchanged, only affects >1680px screens

---

## DD06 - Grid: keep existing `.bento-1x1/2x1/2x2/4x1` class names

Do not rename to semantic `is-small/is-half/is-wide/is-feature`. Keep the
old names so `rysujBentoAgentaV14` can emit the same strings.

**Source**: R5 recommendation + CRITIC CFL-01
**Rationale**: zero JS string changes, minimal diff, rename can be
follow-up in v32.15

---

## DD07 - Section IA: 10-section Polish-first order

Ordered bento rows for the new renderer:

| # | Section        | Class         | Fields                          |
|---|----------------|---------------|---------------------------------|
| 1 | HERO           | bento-4x1 x2r | tagline, name, analogy, mission |
| 2 | DLACZEGO JA    | bento-4x1     | missionShort, 3 benefit bullets |
| 3 | JAK PRACUJE    | bento-2x1     | howItWorks 4 steps              |
| 4 | META           | bento-2x1     | model, phase, tools, ctx, cost  |
| 5 | CO UMIEM       | bento-1x1     | does                            |
| 6 | CZEGO NIE      | bento-1x1     | doesNotDo                       |
| 7 | PRZYKLAD       | bento-2x1     | realExample (or picked)          |
| 8 | KIEDY ZAWODZE  | bento-2x1     | antiPatterns                    |
| 9 | CIEKAWOSTKI    | bento-2x1     | learningQuote + facts           |
| 10| ZANURKUJ       | bento-4x1     | infographic thumb + PDF + prompt (in `<details>`) |

Header kickers: "1 START TU" on HERO, rest numbered "2 / 3 / ... / 10".

**Source**: R3 section 3 + CRITIC CFL-03
**Rationale**: Duolingo/Brilliant/MDN beginner doctrine; matches R2 field
inventory; progressive disclosure for DEEP DIVE

---

## DD08 - Zoom lightbox: R4 drop-in, integration in HERO or DEEP DIVE

Add `#moZoom` modal to DOM (R4 section 2a HTML shell) + R4 CSS + R4 JS.

Integration point: the infographic thumbnail inside the DEEP DIVE card is
a `<button>` that calls `otworzZoom(AGENT_MEDIA[aid].infographic,
'Infografika: ' + getAgentName(aid))`.

ALTERNATIVE to consider in HITL Gate #1: small infographic thumb also
shown in HERO tile (top-right corner) for instant visual hook. Default:
only in DEEP DIVE.

**Source**: R4 (drop-in) + CRITIC CFL-04
**Rationale**: vanilla, 70 CSS + 230 JS lines, full a11y, no conflicts with
existing learn-overlay keyboard handlers

---

## DD09 - Deep Dive: collapsed `<details>` with infographic thumb, PDF, prompt

Section 10 (DEEP DIVE) is a `<details>` element:

```html
<details class="enc-deep-dive">
  <summary>Zanurkuj glebiej (techniczne szczegoly)</summary>
  <div class="enc-deep-body">
    <button class="enc-infographic-thumb" onclick="otworzZoom(...)">
      <img src="... base64 ...">
      <span class="enc-zoom-hint">Kliknij aby powiekszyc</span>
    </button>
    <button class="enc-dl-btn" onclick="window.open(...)">Otworz prezentacje PDF</button>
    <div class="enc-prompt-block">
      <h4>System prompt</h4>
      <pre>...</pre>
    </div>
    <div class="enc-hierarchy-block">
      <h4>Hierarchia</h4>
      ...kartaHierarchii(cat)...
    </div>
    <table class="enc-model-table">...MODEL_COSTS comparison...</table>
  </div>
</details>
```

Default state: collapsed. Motion: R3 4.5 fade-in when opened.

**Source**: R3 pattern P9 + CRITIC CFL-03
**Rationale**: progressive disclosure, beginners not overwhelmed, pros
still have one-click access

---

## DD10 - Micro-interactions: hover lift + staggered reveal + focus ring

Adopt R3's interaction bundle:

1. Card hover: `translateY(-6px) + box-shadow + border glow`, transition
   `220ms cubic-bezier(0.16, 1, 0.3, 1)`
2. IntersectionObserver staggered reveal: `opacity + translateY(16px)` ->
   visible on scroll, delay `calc(var(--i) * 50ms)` (max 550ms for 11 cards)
3. Focus-visible outline: `2px solid var(--ph-strategy)`, offset 3px
4. Icon scale + rotate on card hover
5. All gated on `prefers-reduced-motion: reduce`

**Source**: R3 section 4 + motion tokens from v32.8/R7
**Rationale**: physical, polished feel without cartoony overdoing;
accessible; uses existing v32.8 motion duration ladder

---

## DD11 - Sticky reading progress bar

Add a 3px colored bar at the top of `.learn-overlay` that fills as the
user scrolls the modal content. Uses CSS scroll-driven animations with a
JS fallback.

**Source**: R3 section 4.7 + 5.5
**Rationale**: reduces "infinite scroll" anxiety; minor polish; easy to
remove if user dislikes

**GATE 1 Q2**: user can veto this in HITL.

---

## DD12 - Glossary tooltips on AI jargon

Each occurrence of `subagent`, `orchestrator`, `kontekst`, `token`, `Opus`,
`Sonnet`, `Haiku`, `HITL`, `prompt`, `encja`, `RAG` etc wraps in a
`<span class="enc-term">` with `dodajTooltip()` binding.

Scope: top ~15 terms per CRITIC Q3. Full term list defined in Phase D.

**Source**: R3 section 5.3 + existing `dodajTooltip` helper
**Rationale**: beginners get instant definitions on hover + focus;
reuses existing project infrastructure

**GATE 1 Q3**: user can trim scope in HITL.

---

## DD13 - Reflow animation: View Transitions only (no FLIP)

When container query breakpoint crosses on resize, rely on native
`document.startViewTransition` crossfade. Skip vanilla FLIP for v32.14.

**Source**: R5 section 5 + CRITIC CFL-05
**Rationale**: low-budget feature (reflow rare mid-session); View Transitions
already wired in v32.8; FLIP is v32.15 follow-up if QA complains

---

## DD14 - Legacy `rysujBentoAgenta` untouched for non-pilot agents

The original `rysujBentoAgenta` at line 7536 is renamed to
`rysujBentoAgentaLegacy`. A new wrapper:

```js
function rysujBentoAgenta(aid){
  if (AGENT_EDU_PL && AGENT_EDU_PL[aid]) return rysujBentoAgentaV14(aid);
  return rysujBentoAgentaLegacy(aid);
}
```

This preserves zero regression for the other 31 agents and cleanly gates
the new renderer.

**Source**: CRITIC CFL-07
**Rationale**: graceful fallback; no risk to existing flows

---

## DD15 - Diacritic cleanup pass at Phase D injection

R2 content contains Polish diacritics and HTML entities. When writing the
AGENT_EDU_PL constant to the HTML file, run each string through:

1. ASCII-fold Polish diacritics (a-z, A-Z map to hyphen-less forms)
2. `&gt;` -> `-`, `&lt;` -> `-`, `&amp;` -> `and`
3. Em-dash (U+2014) and en-dash (U+2013) -> hyphen

**Source**: CRITIC CFL-06
**Rationale**: hard constraint "zero diacritics, zero em-dashes"; R2
extraction was imperfect but content itself is correct

---

## DD16 - PDF presentation: button in DEEP DIVE section only

Button label: "Otworz prezentacje PDF". Click opens the PDF in a new
window via `window.open(relativePath)`. No embedding, no preview.
Fallback hint if file:// path resolution fails: text pointing to the
notebookLM folder structure.

**Source**: user directive ("moze byc") + CRITIC CFL-10
**Rationale**: zero size cost, easy opt-in; progressive disclosure keeps
it out of the way for beginners

---

## DD17 - Video: OUT OF SCOPE

Per user directive, no video embedding. Too heavy to scale to 35 agents.
v32.15 follow-up may add video links for power users.

**Source**: user directive
**Rationale**: scale + bandwidth + file size

---

## DD18 - "Nastepny agent" affordance at bottom

Below section 10 (DEEP DIVE), add an `.enc-next` card with kicker
"NASTEPNY AGENT" and the next pilot's name + icon. Clicking advances the
encyclopedia to that agent (uses existing `encyklNastepny()`).

Only shown within the 4 pilot set; wraps around at the end.

**Source**: R3 section 5.4
**Rationale**: Duolingo/Brilliant learn-path pattern; keeps learners
moving forward

---

## DD19 - Keyboard + a11y additions

- Existing ArrowLeft/ArrowRight/Escape handlers stay untouched
- Zoom modal has its own focus trap + Escape (R4)
- New bento has tab-accessible tiles with `focus-visible` ring
- `.enc-deep-dive` is a native `<details>`, natively keyboard-accessible
- `announce()` fires on encyclopedia open with agent name + 1-sentence pitch
- All interactive elements meet 44x44 target size (WCAG 2.2 SC 2.5.8 AAA)

**Source**: R3 section 5.10 + R4 section 4 + v32.8 a11y baseline
**Rationale**: WCAG 2.2 compliance continuity from v32.8

---

## DD20 - Version bumps + localStorage migration

- Title bar: v32.14 Agent Encyclopedia Premium (4 Pilots)
- `eksportujKfg` version: '32.14'
- `buildCostJSON` version: '32.14'
- localStorage key: `acV32_14_custom` with backward migration chain
  through `acV32_13_custom` .. `acV32_custom`
- Mirror `v32.14/AGENT_TEAMS_CONFIGURATOR_v32_14.html` to
  `C:/Projekty Claude Code/Agent_Architecture/index.html` after QA

**Source**: standard workflow
**Rationale**: versioning rule, offline mirror for GitHub Pages

---

## 4. Scope OUT list (explicit NOs)

- Video embedding (DD17)
- Other 31 agents (DD01)
- Preset encyclopedia content (shared CSS upgrades only, DD04/DD05)
- `pokazWezel` sidebar (already done in v32.13)
- FLIP reflow animation (DD13)
- Mindmap PNG preview (deferred to v32.15)
- Server-side or CDN asset loading (offline-first, DD03)

---

## 5. Scope IN summary

20 design decisions, grouped:

- **Data** (DD02, DD03): 2 new constants
- **Rendering** (DD01, DD14): new V14 renderer + feature gate
- **Grid** (DD04, DD05, DD06): container queries + modal cap + existing classes
- **IA** (DD07, DD09, DD18): 10-section order + DEEP DIVE + Nastepny
- **Zoom** (DD08): R4 lightbox
- **Polish** (DD10, DD11, DD12, DD13): hover/reveal/focus/tooltips/progress/reflow
- **Cleanup** (DD15): diacritic pass
- **PDF** (DD16): button in DEEP DIVE
- **A11y** (DD19): WCAG 2.2 continuity
- **Version** (DD20): bumps + migration

---

## 6. Dependencies and order of Phase D implementation

1. Write AGENT_EDU_PL constant (diacritic-clean during write) [DD02, DD15]
2. Write AGENT_MEDIA constant with base64 infographics [DD03]
3. Add CSS: new container queries, modal cap, new .enc-* classes [DD04, DD05, DD10, DD11]
4. Add HTML: `#moZoom` modal shell [DD08]
5. Add CSS: zoom modal [DD08]
6. Add JS: zoom modal functions [DD08]
7. Write rysujBentoAgentaV14 function [DD07, DD09]
8. Rename legacy + add feature-gate wrapper [DD01, DD14]
9. Add glossary tooltip bindings in new renderer [DD12]
10. Add reading progress bar [DD11]
11. Add Nastepny card [DD18]
12. Bump version strings + localStorage key [DD20]
13. Mirror to index.html [DD20]
14. Phase E QA: JS parse, diacritic audit, eyeball pilots, eyeball preset
    fallback, keyboard nav, zoom modal test, reflow test

---

## 7. Phase C gate

All decisions above are DRAFT. HITL Gate #1 (`HITL_GATE_1.md`) lists the
user-facing questions + options. User approves before Phase D build.

End of MANIFEST.
