# R1_code_audit.md - Agent Encyclopedia Premium (v32.14)

## EXECUTIVE SUMMARY

This audit maps the Encyclopedia agent modal (`rysujBentoAgenta` function at line 7536) for the v32.14 redesign. The current implementation renders a fixed 4-column bento grid (breaking to 3/2/1 @1100/900/700px) with 7 rows: banner, 4 metric cards, 2-column flow cards, 2-column comparison cards, hierarchy card, model table, and prompt. All CSS classes (`.bento-*`) and key data sources (AD_MAP, AGENT_KNOWLEDGE, MODEL_COSTS) are inventoried. Reusable patterns from v32.8/v32.11/v32.12 research are cited for Phase C designers.

**Scope**: 4 pilot agents (res_reddit, res_x, res_github, res_forums). Only 4 pilot agents in scope for the premium redesign.

---

## 1. RENDER FUNCTION AUDIT: rysujBentoAgenta

### 1.1 Function Signature & Entry Point
```
Location: C:/Projekty Claude Code/Agent_Architecture/v32.14/AGENT_TEAMS_CONFIGURATOR_v32_14.html line 7536
Caller: otworzEncykl() at line 7463
Entry: User clicks "Poznaj tego agenta" CTA (.btn-learn.is-rich) -> otworzEncykl('agent', agentId)
```

### 1.2 Inputs (Parameters & Data Sources)
- **aid** (agent ID): string, e.g. 'res_reddit'
- **AD_MAP** (line 4535): Map<agentId, agentDefinition>. Provides: `{id, name, role, cat, phase, model, load, tools, p, prompt}`
- **AGENT_KNOWLEDGE** (line 3001): Object keyed by agentId. Fields: `{who, analogy, does, doesNot, antiPatterns, facts}`
- **MODEL_COSTS** (line 4538): Rates for opus/sonnet/haiku (in/out per 1M tokens)
- **getAgentKnowledge(aid)** (line 5639): Returns AGENT_KNOWLEDGE[aid] or I18N_EN.knowledge[aid] if EN lang
- **getAgentName(aid)**: Localized name
- **getCatLabel(cat)**: Translates category label
- **getAgentPrompt(aid)**: Returns system prompt

### 1.3 Outputs
- Writes HTML to `G('loBody').innerHTML=h` (line 7590)
- Scrolls to top: `G('loBody').scrollTop=0` (line 7590)
- Target container: `#loBody` (`.bento-scroll`)

### 1.4 Row-by-Row Breakdown (7 rows)

#### Row 1: KIM JEST? (4x1)
- Classes: `.bento-card .bento-4x1`
- Content: `kn.who` + `kn.analogy` quote
- Lines: 7550-7554
- --i:0
- Conditional on `kn`

#### Row 2: 4 Metric Cards (1x1 each)
- Classes: `.bento-card .bento-1x1 .bento-metric .accent-*`
- Cards: model, cost/call, load, tools cloud
- Lines: 7559-7563
- --i:1..4

#### Row 3: CO ROBI + CZEGO NIE ROBI (2x1 + 2x1)
- Classes: `.bento-do-list`, `.bento-dont-list`
- Lines: 7566-7567
- --i:5,6
- Conditional on `kn`

#### Row 4: ANTY-WZORCE + CIEKAWOSTKI (2x1 + 2x1)
- Classes: `.bento-anti-list`, `.bento-facts-list`
- Lines: 7571-7572
- --i:7,8
- Conditional on `kn`

#### Row 5: HIERARCHIA (4x1)
- Uses `kartaHierarchii(d.cat)` at line 7511
- Line: 7575
- --i:9

#### Row 6: MODEL COMPARISON TABLE (4x1)
- Classes: `.bento-table`
- Lines: 7577-7586
- --i:10

#### Row 7: PROMPT AGENTA (4x1)
- Inline monospace container, scrollable max-height 160px
- Line: 7588
- --i:11

---

## 2. CSS CLASS INVENTORY (lines 1297-1406)

### 2.1 Bento classes
- `.learn-overlay` (1297-1298) - modal container + .show state with bentoIn animation
- `.bento-bg` (1300) + `.bento-orb` .orb1/.orb2/.orb3 (1301-1304) - floating blur orbs
- `.bento-close` (1310-1312) - red pill close button
- `.bento-scroll` (1313-1315) - scroll container + webkit scrollbar
- `.bento-banner` (1316-1317) - hero banner with left accent rail
- `.bento-banner-icon` (1318), `.bento-banner-text h2` (1319), `.bento-banner-text p` (1320), `.bento-banner-badge` (1321)
- `.bento-grid` (1322) - 4 cols dense, 14px gap
- `.bento-card` (1323-1324) - base card + hover lift + cardIn animation with --i stagger
- `.bento-1x1`, `.bento-2x1`, `.bento-2x2`, `.bento-4x1` (1326-1328)
- `.bento-metric` (1329), `.bento-metric-icon` (1330), `.bento-metric-num` (1331), `.bento-metric-label` (1332)
- `.bento-metric.accent-{amber,cyan,green,violet}` (1333-1341)
- `.bento-hero` (1342), `.bento-hero-top` (1343), `.bento-hero-orb` (1344), `.bento-hero-title` (1345), `.bento-hero-subtitle` (1346), `.bento-hero-body` (1347)
- `.bento-info` (1348), `.bento-info-title` (1349), `.bento-info-row` (1350-1351), `.bento-info-icon` (1352), `.bento-info-key` (1353), `.bento-info-val` (1354)
- `.bento-tags` (1355), `.bento-tags-title` (1356), `.bento-tags-cloud` (1357), `.bento-tag` (1358-1359), `.bento-tag.tag-*` (1360-1364)
- `.bento-diagram` (1365), `.bento-diagram-title` (1366), `.bento-diagram-flow` (1367), `.bento-diagram-node` (1368-1369), `.bento-diagram-node-icon` (1370), `.bento-diagram-node-name` (1371), `.bento-diagram-node-role` (1372), `.bento-diagram-arrow` (1373)
- `.bento-table` (1374), `.bento-table-title` (1375), table styles (1376-1379)
- `.bento-hier` (1380), `.bento-hier-item` (1381-1382), `.bento-hier-arrow` (1383)
- `.bento-knowledge-who` (~1392), `.bento-analogy` (~1393) - italicized quote block with left border
- `.bento-do-list`, `.bento-dont-list`, `.bento-anti-list`, `.bento-facts-list` (~1394-1400) - styled lists with ::before icons
- `.bento-section-title` (~1401-1402) - section header with icon

### 2.2 Learn overlay classes
- `.learn-overlay` (1297-1298)
- `.learn-nav` (1306-1309)
- `.learn-nav-btn` (1307-1308)
- `.learn-nav-label` (1309)

### 2.3 Animations
- `@keyframes cardIn` - used by .bento-card
- `@keyframes orbFloat` - 20-25s loops
- `@keyframes bentoIn` - modal open
- `.learn-overlay` has `view-transition-name: vt-modal-learn` (~line 1833)

### 2.4 Current responsive breakpoints (ONLY 3)
- `@media (max-width:1100px)` line 1404 - bento-grid 3 cols
- `@media (max-width:900px)` line 1405 - bento-grid 2 cols
- `@media (max-width:700px)` line 1406 - bento-grid 1 col

**GAP**: No breakpoints for 1440p, 1920p, ultrawide (>2000px), no aspect-ratio-aware rules. This is the core problem the user reported.

### 2.5 Light theme overrides
Rows 1589-1601: `[data-theme="light"]` variants for .bento-* classes.

---

## 3. REUSE SCAN: Prior v32.* research

### 3.1 v32.8/research/R7_motion.md - Duration + easing ladder
```css
--dur-instant:  80ms;
--dur-fast:    150ms;
--dur-base:    220ms;
--dur-medium:  320ms;
--dur-slow:    480ms;
--dur-hero:    640ms;
--ease-standard:   cubic-bezier(0.2, 0, 0, 1);
--ease-emphasized: cubic-bezier(0.05, 0.7, 0.1, 1);
```
**Current .bento-card uses hardcoded .5s/.6s.** Phase D should map to vars.

### 3.2 v32.8/research/R8_color_a11y.md - APCA targets + Okabe-Ito phases
- Body text Lc >= 75
- UI labels Lc >= 60
- Phase colors already Okabe-Ito compliant in v32.14

### 3.3 v32.11/research/R1_ui_patterns.md - Verdict Panel dual-column pattern
Drop-in .vd/.vd-col.fit/.nofit CSS (~170 lines) ready for reuse if we collapse 2x1+2x1 pair into single verdict.

### 3.4 v32.12/research/R4_encyclopedia_cta.md - CTA button patterns
P1 split-card already in use in v32.13 at `.btn-learn.is-rich`. Phase C does not need new CTA research.

### 3.5 v32.12/research/R3_segmented.md - Compact width calculations
Reusable width math for new breakpoints.

**BOTTOM LINE**: Motion + contrast + CTA + verdict panel are all vetted. Phase C does NOT need to re-research any of these.

---

## 4. ENTRY/EXIT + KEYBOARD

### 4.1 Entry flow
```
Click .btn-learn.is-rich in sidebar
 -> onclick otworzEncykl('agent', id)
 -> line 7463: View Transition wrap
 -> learnOpen=true, learnCurrentType='agent', learnCurrentId=id
 -> G('learnO').classList.add('show')
 -> G('learnNav').style.display='flex'
 -> renders nav label (idx+1)/AD.length
 -> rysujBentoAgenta(id) -> #loBody populated
```

### 4.2 Navigation
- Prev: `encyklPoprzedni()` line 7484 - wraps previous in AD array
- Next: `encyklNastepny()` line 7496 - wraps next
- Nav bar shows "X / N | Agent Name" with prev/next buttons

### 4.3 Close
- `zamknijEncykl()` line 2291 - resets flags, removes .show, hides nav

### 4.4 Keyboard (lines 7685-7687)
- Arrow Left -> encyklPoprzedni
- Arrow Right -> encyklNastepny
- Escape -> zamknijEncykl

**Note**: No other keybindings. No +/- zoom yet. Phase D will need to add keyboard handling for new lightbox modal separately so it does not conflict with the existing learnOpen handlers (recommended: handle inside a dedicated zoom modal listener, not the global document listener).

---

## 5. DATA INVENTORY

### 5.1 Available in AD_MAP
id, name, cat, phase, model, load, tools, p/prompt, role, defId

### 5.2 Available in AGENT_KNOWLEDGE (conditional!)
who, analogy, does, doesNot, antiPatterns, facts

**CRITICAL**: If `kn` is falsy for an agent, rows 1, 3, 4 are ALL skipped. For the 4 pilots, must verify AGENT_KNOWLEDGE is populated. Also must add new data constants (from R2 extraction) for the richer fields (tagline, mission, howItWorks, keyConcepts, stats, glossary, learningQuote, bestFor, worstFor, relatedAgents, inputs, outputs).

### 5.3 MODEL_COSTS
opus i:15 o:75, sonnet i:3 o:15, haiku i:0.8 o:4

### 5.4 NEW constants needed for v32.14
- `AGENT_EDU_PL` (or similar) - object keyed by id with 18 fields per agent (from R2)
- `AGENT_MEDIA` - object keyed by id with `{infographic: base64/url, presentationPdf: path, mindmap: base64/url}`

---

## 6. DEAD CODE / BUGS

### 6.1 No dead .bento-* classes found in agent scope
All classes are referenced somewhere in JS.

### 6.2 Hardcoded durations to refactor
- `.bento-card` transition .4s/.3s at line 1323-1324
- `cardIn` animation .5s/.6s

### 6.3 Hardcoded max-heights
- `.bento-info` max-height 280px
- Prompt row inline max-height 160px

### 6.4 Zero diacritics or em-dashes detected in bento section

---

## 7. DROP-IN SNIPPETS (Ready for Phase C)

1. Motion tokens (copy from v32.8/R7)
2. Verdict panel CSS (copy from v32.11/R1 if we collapse rows)
3. APCA phase colors (already in v32.14)
4. CTA button (already in v32.13 via .btn-learn.is-rich)

---

## 8. RISKS

### Risk 1: View Transitions API polyfill
otworzEncykl wraps in `document.startViewTransition()`. Safe degrade but QA on Safari/Firefox.

### Risk 2: Sparse AGENT_KNOWLEDGE for pilots
If knowledge is incomplete for res_reddit etc., bento is 40% empty. R2 extraction will fill the gap but must also update AGENT_KNOWLEDGE or introduce a parallel AGENT_EDU_PL constant.

### Risk 3: learnOpen global state leak
Global flag could collide with new zoom modal. New modal must NOT mutate learnOpen - it should track its own state (e.g. `zoomOpen`).

### Risk 4: Animation stagger cap
12+ cards at 0.08s each = 960ms total. If Phase C expands to 15+, consider capping stagger to 0.05s.

### Risk 5: rysujBentoPreset shares CSS
Any .bento-* changes affect preset bento too. Phase C must confirm: update both together OR carefully scope new classes under a new wrapper class like `.bento-grid.is-agent-v14` to avoid breaking presets.

### Risk 6: Infographic embedding size
4 infographics ~650KB each = ~2.6MB raw, ~3.5MB base64. File goes from 836KB (v32.13) to ~4.3MB. Phase C should decide: embed all 4 inline, OR use relative paths (requires served context, breaks file:// offline use), OR embed lazily only when modal opens.

---

## 9. SUMMARY CLASS REUSE STATUS

| Class | Line | Status |
|---|---|---|
| .bento-banner | 1316 | Keep |
| .bento-grid | 1322 | EXTEND - new breakpoints |
| .bento-card | 1323 | EXTEND - map durations to vars |
| .bento-metric, .bento-table, .bento-hier | 1329/1374/1380 | Keep |
| .learn-overlay, .learn-nav | 1297/1306 | Keep |

---

## 10. FILES READY FOR PHASE C HANDOFF
1. v32.12/research/R4_encyclopedia_cta.md - CTA patterns
2. v32.11/research/R1_ui_patterns.md - verdict panel
3. v32.8/research/R7_motion.md - motion tokens
4. v32.8/research/R8_color_a11y.md - APCA standards

---

**Report compiled**: 2026-04-10
**Audit scope**: rysujBentoAgenta + .bento-* CSS + .learn-overlay + 4 pilot agents
