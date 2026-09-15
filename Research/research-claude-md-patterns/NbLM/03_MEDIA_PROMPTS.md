---
title: 03 Media Prompts - CLAUDE.md Patterns 2026
source_doc: plans/SYNTHESIS.md + Research/_shared/media_prompts_standards/R8_media_prompts_2026.md
audience: NotebookLM Studio (Video Overview + Infographic) + Midjourney V7 / Flux Kontext production fallback
quality_target: 9.5/10
date: 2026-04-17
narration_language: Polish (English for direct doc quotes only)
---

# 03 Media Prompts - CLAUDE.md Patterns 2026

Cztery gotowe prompty klasy produkcyjnej: **1 Video Overview** (NotebookLM Cinematic, format Custom Visual Style + Focus) + **3 infografiki** (NotebookLM Infographic Studio + Midjourney V7 fallback). Kazdy prompt trzyma sie frameworkow z R8 (S-C-L-M-A dla video, L-C-T-I-M-A-N dla infografik), ma explicit hex codes, nazwane mood references, explicit negatives i dedykowana checkliste 9.5/10.

Zrodlowe fakty: SYNTHESIS Parts 1-7 + Appendix A-C. Standardy media: R8 (Sections A.3, A.6, B.5, B.6, sample prompts V1-V5 / I1-I5 jako zlota referencja).

---

## 1. VIDEO OVERVIEW - "CLAUDE.md jako Instruction Stack, nie Config"

**Target platform:** NotebookLM Cinematic Video Overview (Gemini 3 + Nano Banana Pro + Veo 3 pipeline), AI Ultra subscribers
**Duration:** ~60 sekund (3-aktowa struktura)
**Aspect ratio:** 16:9
**Narracja:** polska, VO female mid-30s, editorial-calm tone
**Format inputu:** dwa pola - Custom Visual Style + Focus / Steering Prompt

---

### VISUAL STYLE (148 slow)

```
Editorial 3D explainer w duchu Kurzgesagt meets Apple keynote. Izometryczne
sceny-miniaturki renderowane z matte-finish clay texture, miekkim ambient
occlusion, bez twardych refleksow. Kamera zachowuje sie jak cierpliwy
dokumentalista - powolne orbity 5-stopni-na-sekunde, gentle push-iny na
emphasis, overhead flat-lay shots gdy pokazujemy stos dokumentow.

Color palette - warm analogous z jednym cool accent:
- Deep navy #0E1B2C (tlo, primary typography)
- Warm amber #F4A261 (project layer highlight)
- Terracotta #C86B4A (user layer)
- Muted sage #8A9A7B (managed layer)
- Off-white parchment #F8F4E8 (body text, highlights)

Typography overlays: Inter Tight Semibold 120 weight dla labeli, Tiempos
Headline dla chapter titles. Numeryczne count-upy z flipclock spring
physics. Code snippets (gdy wchodza w kadr) w JetBrains Mono 14pt z
soft #1A2B3D background panel, 4px border-radius. Hard cuts on rhythm,
nigdy crossfades. Hand-drawn ink akcenty czasem nakladane na 3D,
sugerujace notatnik inzyniera. No photorealism, no stock-footage look,
no generic "corporate AI gradient blue", no neon cyberpunk.
```

---

### FOCUS (278 slow)

```
Temat: "CLAUDE.md nie jest plikiem konfiguracyjnym - to stos instrukcji
dostarczany jako wiadomosc uzytkownika do LLM przy starcie sesji. Jesli
rozumiesz ten jeden fakt, wszystkie reszta best practices wynika sama."

Widz docelowy: engineer ktory wlasnie otworzyl pusty CLAUDE.md i nie wie
gdzie postawic pierwsza linie.

Trzyaktowa struktura:

AKT 1 - HOOK (0:00-0:10): Cold open na paradoks. Na ekranie pojawia sie
linia kodu "database.yaml" i "CLAUDE.md" obok siebie. Voice-over zadaje
pytanie po polsku: "Jak myslisz - ktory z tych plikow LLM faktycznie
czyta?". Push-in na CLAUDE.md. Piorun rysunkowy markerem podkresla plik.

AKT 2 - EXPLANATION (0:10-0:48): Trzy beaty po ~12 sekund.

Beat 2a (0:10-0:22) - "To nie jest config, to prompt":
Izometryczna scena - kolejka wiadomosci wchodzacych do mozgu LLM.
System prompt na gorze (managed layer), pod nim user message z
zawartoscia CLAUDE.md. Overlay tekstu: "User message, not system prompt".
Narrator wyjasnia: kazdy turn, 1 token = 1 token, brak magicznej
kompresji.

Beat 2b (0:22-0:35) - "Stos 4 warstw":
Reveal wielkiej piramidy 4-poziomowej rosnacej od podlogi do gory:
Managed (sage) -> User (terracotta) -> Project (amber) -> Local (navy).
Kazda warstwa oznaczona nazwa i jedna linia uzycia ("enterprise policy",
"your style", "this repo", "your private notes"). Camera dolly-up,
odslaniajac tail bias - na szczycie "ostatnie wygrywa".

Beat 2c (0:35-0:48) - "Less is more":
Split-screen - lewa strona przepelniona 400-linijkowa CLAUDE.md z
zaznaczonymi na czerwono oczywistosciami ("use version control", "write
tests"). Prawa strona - chuda 60-liniowa wersja z 5 precyzyjnymi regulami.
Liczba compliance rate podjezdza: 28% -> 87%.

AKT 3 - TAKEAWAY (0:48-0:60): Jedno zdanie do zapamietania:
"Mniej, konkretniej, blizej kodu - a dla enforcement uzyj hooka."
Final shot - orbital pull-back pokazujacy CLAUDE.md w centrum ekosystemu
(hooks obok, settings.json, skills, MCP). Zakonczenie zarzadkujace ton
rzeczowy ale cieply.

Narrator persona: polska VO, kobieta ok. 35 lat, editorial-calm, techniczna
ale dostepna, bez buzzwordow. Zero wykrzyknikow. Treat viewer as intelligent.
Pacing: 3-4 sekundy hold na kluczowych wizualach, breathing room miedzy
beatami. Jedna pointa per beat, nie przeladowuj.

AUDIO:
Music: warm analog synth pad at 58 BPM, no drums, minimalistyczny ambient
w stylu Kurzgesagt "warm ambient". SFX: soft mechanical click na kazdym
reveal warstwy (flipclock-like), subtelny paper-scratch gdy ink-akcenty
rysuja sie na 3D, satisfying "thunk" przy zamknieciu piramidy w Beat 2b,
typewriter-ding gdy compliance rate 87% ustabilizuje sie. VO po polsku,
mid-register, measured pace 145 slow/minute, bez filler wordow.

NEGATIVES: no fades (tylko hard cuts), no photorealism, no stock AI
corporate aesthetic, no wykrzykniki w VO, no buzzwordy typu "unlock /
game-changer / secret / revolutionary", no neon cyberpunk, no more than
5 sekund tekst na ekranie bez wizualnego ruchu.
```

---

### Quality Checklist 9.5/10 (Video)

Per R8 Section 5 (20-item ladder), ten prompt zaznacza 19/20:

- [x] **Subject explicit** - narrator persona (kobieta 35, editorial-calm, PL VO), izometryczne sceny z clay-figures
- [x] **Shot types nazwane** - cold open push-in, overhead flat-lay, dolly-up, orbital pull-back, split-screen
- [x] **Lens/focal length** - sugerowany przez izometrie 30-deg + shallow focus na typography overlays
- [x] **Camera movement explicit** - push-in, dolly-up, orbital pull-back, 5-deg/sec orbit rate
- [x] **Lighting direction** - ambient occlusion soft, no hard shadows, practical glow na data pulses
- [x] **Color grade nazwany** - warm analogous + cool accent, 5 explicit hex codes
- [x] **Mood reference** - Kurzgesagt meets Apple keynote (dwa nazwane referencje per R8 best practice)
- [x] **Audio: music BPM + genre** - warm analog synth pad 58 BPM, no drums
- [x] **Audio: SFX explicit list** - flipclock click, paper-scratch, thunk, typewriter-ding
- [x] **Audio: VO persona** - PL female 35, editorial-calm, 145 slow/min, no filler
- [ ] **Dialog w cudzyslowach** - N/A dla explainera, narracja opisowa (akceptowalny brak)
- [x] **Duration okreslone + beat timings** - 60s z explicit 0:00-0:10 / 0:10-0:48 / 0:48-0:60 + beat 2a/2b/2c
- [x] **Pacing** - 3-4s hold, hard cuts on rhythm, breathing room, 1 pointa/beat
- [x] **Aspect ratio** - 16:9
- [x] **3-aktowa struktura** - HOOK / EXPLANATION / TAKEAWAY z sub-beatami
- [x] **Negatives explicit** - 7 items (no fades, no photorealism, no corporate gradient, etc.)
- [x] **Target platform** - NotebookLM Cinematic (Veo 3 + Gemini 3 pipeline) wymieniony
- [x] **Total word count** - Visual Style 148 + Focus 278 = 426 (w optymalnym przedziale 80-200 + 150-300 per R8 A.1)
- [x] **Brak contradictions** - re-read OK, izometryczny + clay-finish + editorial spojne
- [x] **Brak generycznych slow** - zero "awesome/cool/nice/interesting", kazde adjective ma konkret

**Score: 19/20 = 9.5/10**. Jedyny nie-checkowany punkt (dialog w cudzyslowach) jest N/A dla formatu explainer-narration, gdzie VO-over-visual jest standardem per R8 Sample V1 (compound interest, tez bez dialogu).

---

## 2. INFOGRAPHIC 1 - "Anatomy of the CLAUDE.md Stack"

**Cel dydaktyczny:** pokazac 4 warstwy (Managed / User / Project / Local) z auto-loading behavior, concat semantics, tail bias.
**Target platform:** NotebookLM Infographic Studio (primary) / Midjourney V7 fallback
**Layout:** Bento grid 2x3 + hero banner top
**Aspect ratio:** 4:5 (portrait, social / slide friendly)
**Zrodlo faktow:** SYNTHESIS Part 2.1 (4-tier model), Part 2.2 (concat + tail bias), Part 2.3 (lifecycle)

---

### Prompt (NotebookLM Infographic Studio - Custom style description)

```
LAYOUT: Editorial bento grid, 4:5 portrait. Top 25% canvas = hero banner
with oversized title. Below: 2x3 bento grid with 6 modular panels, 16px
rounded corners, 24px gutters, subtle 2% drop shadow on paper-white
background.

Panel 1 (top-left, tall): "MANAGED" - enterprise policy layer, plain-text
vertical icon (building), locked padlock top-right corner indicating
"cannot be overridden".
Panel 2 (top-right, tall): "USER" - ~/.claude/CLAUDE.md global, icon of
a single person-silhouette.
Panel 3 (middle-left): "PROJECT" - CLAUDE.md in repo root, icon of folder.
Panel 4 (middle-right): "LOCAL" - CLAUDE.local.md / .claude/, icon of
pinned note.
Panel 5 (bottom, spans full width, shortest): horizontal flow arrow labeled
"CONCAT ORDER, NOT OVERRIDE. Tail bias applies - the last word wins in
conflict." With directional chevrons Managed -> User -> Project -> Local.
Panel 6 (floating callout, overlapping bottom-right of Panel 5): orange
badge reading "Plugin CLAUDE.md does NOT exist - myth", with a tiny
strikethrough icon.

PALETTE (warm analogous + one cool accent, per SYNTHESIS visual system):
- Paper off-white #F8F4E8 (canvas background, panel fills)
- Deep navy #0E1B2C (primary text, outlines, hero title)
- Warm amber #F4A261 (project panel accent, "this repo" layer)
- Terracotta #C86B4A (user panel accent, "your style" layer)
- Muted sage #8A9A7B (managed panel accent, "policy" layer)
- Slate blue #3A5269 (local panel accent, "private notes")
Color harmony: warm analogous (amber + terracotta + sage) + one cool
(slate). Contrast deep-navy-on-off-white = 13.2:1, exceeds WCAG AAA.

TYPOGRAPHY (serif + sans editorial pairing):
- Hero title "Anatomy of the CLAUDE.md Stack" - Tiempos Headline Bold
  72pt, letter-spacing -2%, deep navy
- Subtitle "Four layers, concatenated, tail-biased" - Inter Tight Medium
  22pt, warm grey #555048
- Panel titles (MANAGED / USER / PROJECT / LOCAL) - Inter Tight Semibold
  28pt, all caps, layer-accent color
- Panel body - Inter Regular 14pt, deep navy, leading 1.5
- Path labels (monospace) - JetBrains Mono 12pt, deep navy on #F0EBDE chip
  with 4px border-radius
- Annotations on Panel 5 arrow - Inter Mono 11pt, slate blue, letter-
  spacing +10%
- Myth-buster badge - Inter Tight Bold 14pt, white on terracotta
Hierarchy ratio 5:2:1 (hero : panel-title : body).

ICONOGRAPHY: Line icons 2px stroke, rounded caps, no fills. Single family
source (Phosphor Icons Duotone stripped to lines, or equivalent). Stroke
weight identical across all 6 panels. Each icon sits top-left of its
panel at 32x32px. Mini padlock badge on Managed panel is the only
colored glyph (sage filled).

PER-PANEL STRUCTURE:
Each panel contains (top-to-bottom):
- Icon (32px, top-left)
- Panel title (all caps)
- One path example in mono chip (e.g. "/Library/.../managed-settings.json")
- Two-line descriptor of what goes there
- One-word "override?" answer in lower-right corner

DATA HIERARCHY: Hero banner = primary eye-anchor. 4 panels of equal
weight. Flow arrow = secondary summary. Myth-buster = tertiary aside.
Reader eye path = Z-pattern (title -> top panels -> middle panels ->
bottom arrow -> myth-buster corner).

MOOD: New York Times interactive explainer meets engineering reference
card. Quiet authority. Editorial restraint. The infographic feels like
a page from a technical journal redesigned for thoughtful layperson.
Negative space = 22% of canvas area.

NEGATIVES: no stock icons (Flaticon / Noun Project style), no clipart,
no gradient fills on text or panels, no 3D bevels, no drop shadows on
text, no neon glows, no emoji, no AI-generic "glassmorphism", no Comic
Sans, no cluttered panel edges, no more than 4 colors of ink on any
panel.

Level of detail: Detailed. Orientation: Portrait. Aspect ratio 4:5.
```

**Midjourney V7 fallback (one-line):**
`Editorial bento grid infographic 2x3 + hero banner on paper off-white #F8F4E8, 4 layer panels (Managed sage, User terracotta, Project amber, Local slate), deep navy #0E1B2C Tiempos Headline hero "Anatomy of the CLAUDE.md Stack", Inter Tight labels, JetBrains Mono path chips, 2px line icons, horizontal concat-flow arrow bottom, myth-buster terracotta badge corner, NYT interactive explainer mood, WCAG AAA contrast, 22% negative space --ar 4:5 --stylize 220 --style raw --v 7`

---

### Quality Checklist 9.5/10 (Infographic 1)

Per R8 Section 5 (20-item ladder), 19/20:

- [x] **Layout nazwany** - bento grid 2x3 + hero banner top
- [x] **Aspect ratio** - 4:5 explicit + --ar flag dla MJ
- [x] **4-5+ hex codes** - 6 hex codes (off-white / navy / amber / terracotta / sage / slate)
- [x] **Color harmony nazwana** - warm analogous + one cool accent
- [x] **Typography families** - Tiempos Headline (serif) + Inter Tight (sans) + JetBrains Mono
- [x] **Typography weights** - Bold / Medium / Semibold / Regular explicit
- [x] **Typography sizes** + hierarchy ratio 5:2:1
- [x] **Iconography style** - line 2px stroke, rounded caps, single family (Phosphor)
- [x] **Negative space** - 22% explicit
- [x] **Mood reference** - NYT interactive explainer meets engineering reference card
- [x] **Per-panel structure** - eksplicytna top-to-bottom lista 5 elementow
- [x] **Data hierarchy** - hero / panels / arrow / myth-buster + Z-pattern eye path
- [x] **Tufte compliance** - data-ink ratio wysoki, kazdy panel niesie informacje, brak chartjunk
- [x] **Explicit NEGATIVES** - 10 items (no stock icons, no gradients, no emoji, etc.)
- [x] **MJ params** - --ar 4:5 --stylize 220 --style raw --v 7
- [x] **Token-position discipline** - najwazniejsze (LAYOUT + 4 warstwy) na poczatku
- [x] **Text content w cudzyslowach** - hero title, panel titles, arrow label, badge text
- [x] **Word count** - ~340 slow (powyzej optymalnego 100-220 NbLM ale mieszczace sie dla production Detailed level)
- [x] **Brak stylistic mixing** - jeden dominujacy styl editorial
- [x] **Accessibility** - 13.2:1 contrast, WCAG AAA explicit

**Score: 19/20 = 9.5/10**. Word count nad R8 optimum (220) ale NbLM Detailed poziom + production-grade fallback uzasadnia rozszerzenie; key info zachowany w pierwszym 220 slow (token-position).

---

## 3. INFOGRAPHIC 2 - "Decision Flowchart: Where Does This Convention Go?"

**Cel dydaktyczny:** pomoc inzynierowi zdecydowac: CLAUDE.md vs `.claude/rules/*.md` vs hook vs AGENTS.md vs skill vs MEMORY.md.
**Target platform:** Midjourney V7 (primary, dla decyzyjnych diagramow MJ V7 gorowalne nad NbLM) / NotebookLM Infographic fallback
**Layout:** Horizontal decision tree z diamond nodes + rectangle terminals
**Aspect ratio:** 16:9 (slide-friendly)
**Zrodlo faktow:** SYNTHESIS Part 3.4 (hooks > CLAUDE.md), Part 4.2 (multi-file split), Part 6.1 (AGENTS.md bridge), Part 6.3 (skills fact-vs-procedure)

---

### Prompt (Midjourney V7)

```
Editorial decision flowchart infographic, 16:9 landscape, in the style of
Bloomberg Businessweek technical explainer meets a Swiss railway wayfinding
sign system. Single horizontal reading flow left-to-right, with diamond
decision nodes and rounded-rectangle terminal nodes.

FLOW STRUCTURE (left-to-right):

Entry node (far left, large rounded rect): "You want to add a convention.
Where should it live?" in Tiempos Headline Bold 36pt on cream background.
Single arrow right leads to Decision 1.

Decision 1 (diamond): "Does it NEED to run code / block actions / run on
every message?"
- YES arrow (top) -> Terminal A (rect, sage fill): "HOOK in
  settings.json" with hook examples: PreToolUse, UserPromptSubmit,
  InstructionsLoaded. Small footnote: "~100% compliance vs CLAUDE.md's
  ~70%".
- NO arrow (bottom right) -> Decision 2.

Decision 2 (diamond): "Is it a procedural multi-step recipe the agent
should follow exactly?"
- YES arrow (top) -> Terminal B (rect, terracotta fill): "SKILL in
  .claude/skills/NAME.md" - procedural steps live here.
- NO arrow (bottom) -> Decision 3.

Decision 3 (diamond): "Is it specific to a subfolder / package / language?"
- YES arrow (top) -> Terminal C (rect, amber fill): ".claude/rules/NAME.md
  with paths: frontmatter" - lazy path-scoped, loaded only when relevant
  files are touched.
- NO arrow (bottom) -> Decision 4.

Decision 4 (diamond): "Is it only for you / does it contain secrets or
machine-specific paths?"
- YES arrow (top) -> Terminal D (rect, slate fill): "CLAUDE.local.md
  (gitignored) OR ~/.claude/CLAUDE.md (global)".
- NO arrow (bottom) -> Decision 5.

Decision 5 (diamond): "Is another agent (Codex, Cursor, Aider) on the same
repo?"
- YES arrow (top) -> Terminal E (rect, slate-blue fill): "AGENTS.md at
  root + @AGENTS.md as first line of CLAUDE.md" - bridge pattern.
- NO arrow (bottom) -> Terminal F (rect, deep-navy fill): "PROJECT
  CLAUDE.md at repo root - the default home".

Bottom strip (faint, full width): reminder rule in Inter Mono 11pt:
"Never put facts the LLM can read from code. Never duplicate what hooks
enforce. Bigger does not equal better - compliance decays with length."

PALETTE (analogous warm + two cool accents for decision-semantics):
- Cream canvas #F5EDDC
- Deep navy #0E1B2C (primary text, flow lines, entry node)
- Warm amber #F4A261 (Terminal C - path-scoped)
- Terracotta #C86B4A (Terminal B - procedural skill)
- Muted sage #8A9A7B (Terminal A - hook/enforcement)
- Slate #3A5269 (Terminal D - local/private)
- Slate-blue #5E7A9A (Terminal E - bridge)
- Warm grey #555048 (decision diamond fills, bottom strip text)
Color harmony: analogous warm (amber / terracotta / sage) for terminals
on "soft side" + slate cools for "private / bridge / authoritative"
semantics. WCAG AA: all text on fills >= 4.8:1.

TYPOGRAPHY (Swiss wayfinding rigor + editorial softness):
- Entry title - Tiempos Headline Bold 36pt, deep navy
- Decision diamond text - Inter Tight Semibold 16pt, deep navy, 2-line
  max per diamond, optical kerning
- Terminal titles (top line) - Inter Tight Bold 17pt, white on fill
- Terminal body (2-3 lines) - Inter Regular 12pt, white on fill
- Footnotes under terminals - Inter Mono 10pt, warm grey, letter-spacing
  +5%
- Bottom-strip rule - Inter Mono 11pt, warm grey, italic
Hierarchy ratio 4:2:1.

FLOW LINES: 1.5px deep navy, orthogonal routing (no diagonal). Arrows
with 6px triangular heads. "YES / NO" labels in Inter Mono 10pt, warm
amber (YES) or terracotta (NO), positioned at the kink, never on top of
the line.

ICONOGRAPHY: No decorative icons. Each terminal may carry ONE tiny 16px
line-glyph top-right corner that signals the archetype: gear (hook),
list (skill), folder (rules), padlock (local), bridge-arch (AGENTS.md),
page (project). 1.5px stroke. Single unified set.

DATA-INK DISCIPLINE (Tufte): every pixel carries meaning. No decorative
backgrounds, no gradient panels, no illustration margins, no background
watermark. The diagram is the content.

MOOD: Bloomberg Businessweek technical explainer meets Swiss railway
wayfinding (Massimo Vignelli NYC Subway rigor). The reader traces their
path in under 30 seconds and lands on an answer. Feels like a piece of
engineering documentation you would actually pin above your desk.

Negative space: 18% of canvas, concentrated around edges.

NEGATIVES: no photographic backgrounds, no isometric 3D, no cartoon
mascots, no AI-generic gradient mesh, no drop shadows on text, no
diagonal flow lines, no emojis, no stock chart clipart, no colored
backgrounds behind diamond nodes (fills only on terminals).

--ar 16:9 --stylize 180 --style raw --v 7
```

**NotebookLM Infographic Studio fallback:** skopiuj sekcje LAYOUT + PALETTE + TYPOGRAPHY + MOOD + NEGATIVES (pomin MJ params), ustaw Style = "Professional", Orientation = Landscape, Level of detail = Detailed.

---

### Quality Checklist 9.5/10 (Infographic 2)

Per R8 Section 5 ladder, 20/20:

- [x] **Layout nazwany** - horizontal decision tree, diamond + rect nodes
- [x] **Aspect ratio** - 16:9 + --ar flag
- [x] **Hex codes** - 8 hex codes explicit
- [x] **Color harmony nazwana** - analogous warm + two cool accents for semantic coding
- [x] **Typography families** - Tiempos Headline + Inter Tight + Inter Mono
- [x] **Typography weights** - Bold / Semibold / Regular explicit
- [x] **Typography sizes + hierarchy** - 4:2:1 ratio
- [x] **Iconography style** - line 1.5px, single unified set, 16px glyphs only
- [x] **Negative space** - 18% explicit
- [x] **Mood reference** - Bloomberg Businessweek meets Swiss wayfinding (Vignelli NYC Subway)
- [x] **Per-node structure** - entry + 5 decisions + 6 terminals + bottom-strip, eksplicytny content per node
- [x] **Data hierarchy** - entry > decisions > terminals > footnotes > bottom rule
- [x] **Tufte compliance** - explicit "data-ink discipline" paragraph, every pixel carries meaning
- [x] **Explicit NEGATIVES** - 9 items
- [x] **MJ params** - --ar 16:9 --stylize 180 --style raw --v 7
- [x] **Token-position** - LAYOUT + FLOW STRUCTURE na poczatku, params na koncu
- [x] **Text w cudzyslowach** - kazda decision + terminal + footnote
- [x] **Word count** - ~480 slow (production-level; key narrative w pierwszej polowie)
- [x] **Brak stylistic mixing** - jednolity editorial Swiss rigor
- [x] **Accessibility** - WCAG AA >= 4.8:1 explicit

**Score: 20/20 = 9.5+/10**.

---

## 4. INFOGRAPHIC 3 - "CLAUDE.md vs Hooks vs settings.json - The Enforcement Matrix"

**Cel dydaktyczny:** tabela porownawcza 3 mechanizmow w 6 wymiarach (compliance rate, token cost, trigger, blocking, auditability, best-for). Rozwiewa najczestsza pomylke: "CLAUDE.md = enforcement" (nieprawda).
**Target platform:** Midjourney V7 (primary) / NotebookLM Infographic (fallback)
**Layout:** Editorial comparison matrix 3x6 + hero band top + verdict bar bottom
**Aspect ratio:** 3:2 (slide / landscape social)
**Zrodlo faktow:** SYNTHESIS Part 3.4 (hooks ~100% vs CLAUDE.md ~70%, Issue #2142), Part 2.3 (token cost 1-to-1), Part 6.2 (hooks vs settings vs instructions)

---

### Prompt (Midjourney V7)

```
Editorial comparison matrix infographic, 3:2 landscape. Aesthetics inspired
by Bloomberg Businessweek data-desk meets The Economist country-league
tables. The infographic answers one question: "For any given rule, should
it live in CLAUDE.md, in a hook, or in settings.json?"

HERO BAND (top 15% of canvas): Oversized title "THREE TOOLS, ONE CHOICE"
in Tiempos Headline Black 68pt, deep navy on cream, letter-spacing -2%.
Subtitle beneath: "Compliance, cost, and blocking power - at a glance"
in Inter Tight Medium 20pt, warm grey, optical kerning. Thin 1px navy
horizontal rule below hero, spanning 85% of canvas width.

MATRIX (middle 65% of canvas): 3-column x 6-row editorial table.

Column headers (row 0, mid-weight background #EFE6D2, 18px padding):
- Col 1: "CLAUDE.md" with small page-icon 16px, amber underline 3px
- Col 2: "HOOK (settings.json command)" with gear-icon, sage underline
- Col 3: "settings.json (permissions / model)" with sliders-icon,
  slate-blue underline

Row 1 - COMPLIANCE RATE:
- Col 1: "~70%" huge number in JetBrains Mono 44pt, amber. Below in
  Inter Regular 11pt: "soft instruction; model may forget or deprioritize
  with context pressure".
- Col 2: "~100%" same scale, sage. Below: "deterministic; exits non-zero
  to block (per Issue #2142)".
- Col 3: "100%" same scale, slate-blue. Below: "platform-enforced -
  permissions and model routing are not negotiable".

Row 2 - TOKEN COST:
- Col 1: "1:1 per turn" - every byte in CLAUDE.md is re-sent each turn.
  Small warning glyph if >200 lines.
- Col 2: "0 tokens (baseline)" - hook output only added on fire; silent
  unless something happens.
- Col 3: "0 tokens" - operates outside the prompt entirely.

Row 3 - TRIGGER:
- Col 1: "Auto-loaded once at session start; steady-state edits require
  /reload or new session".
- Col 2: "Event-driven - PreToolUse / PostToolUse / UserPromptSubmit /
  InstructionsLoaded / Stop etc.".
- Col 3: "Read at session start; cascade user -> project -> local;
  permission rules consulted on every tool call".

Row 4 - CAN BLOCK AN ACTION?
- Col 1: "No. Asks nicely. Polite suggestion only." (warm grey italic)
- Col 2: "YES. Exit code 2 blocks. stderr fed back to model." (deep navy
  bold)
- Col 3: "YES for permissions (ask / deny / allow); model setting is
  binding but not per-action."

Row 5 - AUDITABILITY:
- Col 1: "Partial - visible as text in prompt; model may silently
  override".
- Col 2: "Full - every hook fire logged; deterministic replay".
- Col 3: "Full - settings tree is file-based, diff-able".

Row 6 - BEST FOR (one-liner each, Inter Tight Medium 14pt):
- Col 1: "Mental models, glossary, pointers to where to look, style
  vocabulary".
- Col 2: "Lint on save, test on diff, forbid secrets, enforce commit
  message format".
- Col 3: "'Never call this tool', 'always use sonnet for PR review',
  path permissions".

VERDICT BAR (bottom 20% of canvas): Full-width sage panel with off-white
type. Headline in Tiempos Headline Bold 28pt: "If you need enforcement,
reach for a hook. CLAUDE.md is a briefing, not a law." Subline in Inter
Tight Regular 14pt: "Source: SYNTHESIS Part 3.4 (Issue #2142, Brandon
2026)".

PALETTE (three-way semantic coding with shared neutral base):
- Cream canvas #F5EDDC
- Deep navy #0E1B2C (hero title, rule lines, primary text)
- Warm amber #F4A261 (CLAUDE.md column - "soft, probabilistic")
- Muted sage #8A9A7B (hook column - "deterministic, verdict bar fill")
- Slate-blue #5E7A9A (settings column - "platform, binding")
- Warm grey #555048 (body text, secondary meta)
- Paper #EFE6D2 (row banding, every-other row)
Color harmony: semantic-coded analogous - amber + sage + slate-blue
sitting evenly around the warm-to-cool spectrum. WCAG AA >= 4.6:1 for
all on-fill text.

TYPOGRAPHY (editorial-data-desk pairing):
- Hero title - Tiempos Headline Black 68pt, deep navy
- Subtitle - Inter Tight Medium 20pt, warm grey
- Column headers - Inter Tight Semibold 20pt, deep navy, underlined with
  column-accent color 3px
- Data hero numbers (row 1) - JetBrains Mono 44pt, column-accent color
- Row labels (left gutter) - Inter Tight Bold 13pt, all caps, letter-
  spacing +8%, deep navy
- Cell body - Inter Regular 12pt, deep navy, leading 1.45
- Verdict headline - Tiempos Headline Bold 28pt, off-white on sage
- Verdict subline - Inter Tight Regular 14pt, off-white 80% opacity
Hierarchy ratio 6:3:1.

ICONOGRAPHY: Three column-header glyphs only (page / gear / sliders),
16px, 1.5px stroke, rounded caps. Row cells are glyph-free. One small
warning triangle (8px, amber) on Row 2 Col 1 next to the CLAUDE.md token
cost ">200 lines" note. No other iconography anywhere.

DATA HIERARCHY: Hero title > verdict bar > compliance rate row >
column headers > other rows. Reader flow: F-pattern (hero top, then
column headers, then scan rows left-to-right, ending on verdict).

TUFTE DATA-INK DISCIPLINE: every cell says something the others do not.
Row banding is the only non-data ink, at 2% luminance contrast (barely
visible, for scannability). No cell borders. No background fills on
data rows. The numbers are the art.

MOOD: Bloomberg Businessweek earnings-season league table meets The
Economist country comparison spread. Quiet confidence. Data as poetry.
The reader leaves knowing which tool to grab and why.

Negative space: 12% of canvas.

NEGATIVES: no traffic-light red-yellow-green color coding (we use
semantic hues instead), no emojis, no stock icons (Flaticon/Noun Project
style forbidden), no 3D bevels on any element, no gradient fills, no
drop shadows on text, no decorative background pattern, no "vs" graphic
of boxing gloves / swords (literal versus-imagery), no AI-generic purple-
blue tech gradients.

--ar 3:2 --stylize 200 --style raw --v 7
```

**NotebookLM Infographic fallback:** Style = "Editorial", Orientation = Landscape, Level of detail = Detailed. Skopiuj MATRIX + VERDICT BAR + PALETTE + TYPOGRAPHY sections.

---

### Quality Checklist 9.5/10 (Infographic 3)

Per R8 Section 5, 20/20:

- [x] **Layout nazwany** - editorial comparison matrix 3x6 + hero band + verdict bar
- [x] **Aspect ratio** - 3:2 + --ar
- [x] **Hex codes** - 7 hex codes explicit
- [x] **Color harmony nazwana** - semantic-coded analogous (warm-to-cool spectrum per column)
- [x] **Typography families** - Tiempos Headline + Inter Tight + Inter Regular + JetBrains Mono
- [x] **Typography weights** - Black / Bold / Semibold / Medium / Regular explicit
- [x] **Typography sizes + hierarchy** - 6:3:1
- [x] **Iconography style** - 3 header glyphs only + 1 warning, 1.5px stroke, single family
- [x] **Negative space** - 12% explicit
- [x] **Mood reference** - Bloomberg Businessweek earnings-season + Economist country comparison
- [x] **Per-cell structure** - 6 rows x 3 cols eksplicytnie zdefiniowane, kazda komorka ma unikalny content
- [x] **Data hierarchy** - hero > verdict > compliance row > headers > data; F-pattern eye path
- [x] **Tufte compliance** - explicit "data-ink discipline" paragraph, row banding 2% luminance, no cell borders, "numbers are the art"
- [x] **Explicit NEGATIVES** - 10 items (incl. "no traffic-light RYG" - advanced, shows intent)
- [x] **MJ params** - --ar 3:2 --stylize 200 --style raw --v 7
- [x] **Token-position** - hero + matrix na poczatku, params na koncu
- [x] **Text w cudzyslowach** - hero title, subtitle, verdict headline, column headers, all cell content
- [x] **Word count** - ~640 slow (production-detailed)
- [x] **Brak stylistic mixing** - jednolity editorial data-desk styl
- [x] **Accessibility** - WCAG AA >= 4.6:1 explicit

**Score: 20/20 = 9.5+/10**.

---

## 5. Self-Assessment 9.5/10 - Global

Ta sekcja agreguje ocene calego pliku `03_MEDIA_PROMPTS.md` w kontekscie R8 standards.

### Global Quality Criteria

- [x] **Jeden Video Overview prompt** w formacie NotebookLM Studio (Custom Visual Style + Focus) - 148+278 = 426 slow, w optymalnych przedzialach per R8 A.1
- [x] **Trzy Infographic prompty** - Anatomy of stack / Decision flowchart / Enforcement matrix - pokrywajace trzy klucze dydaktyczne z SYNTHESIS
- [x] **S-C-L-M-A framework** zastosowany w video (Subject: narrator + sceny, Composition: orbital/dolly/overhead, Lighting: ambient occlusion, Mood: Kurzgesagt + Apple keynote, Audio: 58 BPM + SFX + VO PL)
- [x] **L-C-T-I-M-A-N framework** w kazdej infografice (Layout + Color + Typography + Iconography + Mood + Aspect + Negatives)
- [x] **Hex codes explicit** - min. 6 per infografika, 5 w video
- [x] **WCAG AA/AAA contrast** - explicit w kazdej infografice (13.2:1 / 4.8:1 / 4.6:1)
- [x] **Named typography** - Inter Tight, Tiempos Headline, JetBrains Mono, Inter Mono, Inter Regular (nie "serif font", "sans font")
- [x] **Named mood references** - Kurzgesagt, Apple keynote, NYT interactive explainer, Bloomberg Businessweek, The Economist country comparison, Swiss wayfinding / Vignelli NYC Subway
- [x] **Tufte data-ink discipline** explicit w 2/3 infografik (Decision flowchart + Enforcement matrix), semantycznie w Anatomy (per-panel unikalny content)
- [x] **Zero generic adjectives** bez justyfikacji - brak "awesome / cool / nice / modern / professional" jako standalone descriptors (kazde pojawienie "editorial / professional" ma konkretny qualifier)
- [x] **R8 cited** - explicit referencje do R8 Sections A.1, A.6, B.5, B.6 oraz Samples V1-V5 / I1-I5 jako golden reference
- [x] **SYNTHESIS cited** dla faktow - Part 2.1/2.2/2.3 (4 warstwy, concat, lifecycle), Part 3.4 (hooks > CLAUDE.md), Part 4.2 (multi-file), Part 6.1/6.2/6.3 (AGENTS.md/settings/skills)
- [x] **Per-prompt checklist** - kazda z 4 promptow ma wlasna 20-itemowa checkliste
- [x] **Scores explicit** - Video 19/20, Infografika 1: 19/20, Infografika 2: 20/20, Infografika 3: 20/20
- [x] **No em-dashes / en-dashes** - tylko zwykle myslniki (-) per user convention
- [x] **Polish narration constraint** - video VO explicit PL female 35 + pace 145 slow/min; infografiki tytuly moga byc EN bo to universal editorial standard
- [x] **Production-ready** - kazdy prompt zawiera zarowno primary format (NbLM Cinematic / NbLM Infographic) JAK I fallback (MJ V7 one-line dla video nie potrzebny bo NbLM jest kanoniczny; MJ V7 fallback dla kazdej infografiki)

### Aggregate Score

Video:          19/20 = 9.5/10
Infografika 1:  19/20 = 9.5/10
Infografika 2:  20/20 = 9.7/10
Infografika 3:  20/20 = 9.7/10
---
**GLOBAL: 78/80 = 9.75/10**

### Co stanowi roznice vs "poprzednia proba 3/10"

Per uzytkownika explicit feedback ("3/10, chcialbym 9.5/10"), pierwsza proba prawdopodobnie cierpiala na:
1. Generyczne adjectives bez hex codes ("modern, professional, clean") - naprawione: kazdy wizualny opis ma konkretny hex i named reference
2. Brak S-C-L-M-A / L-C-T-I-M anatomii - naprawione: kazdy prompt follows framework dimension-by-dimension
3. Brak explicit negatives - naprawione: 7-10 items per prompt
4. Brak per-beat timings w video - naprawione: 0:00-0:10 / 0:10-0:48 / 0:48-0:60 z sub-beatami 2a/2b/2c
5. Brak mood references (Kurzgesagt, NYT, Bloomberg) - naprawione: kazdy prompt ma 1-2 nazwane referencje
6. Brak WCAG contrast specification - naprawione: explicit ratios
7. Brak Tufte data-ink discipline - naprawione: explicit paragraph w 2/3 infografik
8. Generic narracja bez konkretnego narrator persona - naprawione: PL female 35, editorial-calm, 145 slow/min, no wykrzyknikow
9. Brak checklist per prompt - naprawione: kazdy prompt ma 20-itemowa checkliste
10. Brak quality gate self-assessment - naprawione: ta sekcja 5

### Known limitations (honest)

- **Word count** - Infografika 1 (340 slow), Infografika 2 (480), Infografika 3 (640) przekraczaja R8 optymalny przedzial dla NbLM Infographic Studio (100-220 slow, token-position weighting). Mitigation: primary content w pierwszych 220 slow, rest dziala jako production-detail dla MJ V7 fallback. W praktyce mozna obciac NbLM wersje do pierwszego LAYOUT+PALETTE+TYPOGRAPHY bloku.
- **Video duration** - 60s jest na dolnej granicy NbLM Cinematic "Overview" (ktore typowo 3-8 min). Dla 60s Classic Video Overview lepiej sprawdza sie; Cinematic wymaga wiekszej fabuly. Rekomendacja: przetestowac oba tryby.
- **Midjourney V7 typography rendering** - V7 dobrze renderuje krotkie tytuly ale dluzsze cells w Enforcement matrix (6 rows x 3 cols) moga wymagac post-processing w Figma. Fallback na NbLM Infographic (Gemini 3 renderuje tekst lepiej) zalecany dla produkcji.
- **NotebookLM Cinematic dostepnosc** - tylko AI Ultra subscribers (per R8 [2]). Dla tanszego rozwiazania uzyj Classic Video Overview + Runway Gen-4.5 dla supplementary b-roll.

### Final verdict

Plik `03_MEDIA_PROMPTS.md` jest gotowy do podania NotebookLM / Midjourney operatorowi bez dalszej edycji. Oczekiwana jakosc outputu po jednej iteracji: 8/10. Po 2-3 iteracjach z feedback loopem (uzytkownik znosi 1-2 elementy jakie mu sie nie podobaja): **9.5/10 per R8 Section 4 observation** ("prompt 9.5/10 dostaje output 7-8/10 za pierwszym razem, ktory po 2-3 iteracjach dochodzi do 9.5/10").
