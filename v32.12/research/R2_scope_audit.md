# R2 Scope-Impact Audit: v32.12 Preset-Detail Sidebar Refactor

Audit date: 2026-04-10. Target: v32.11/AGENT_TEAMS_CONFIGURATOR_v32_11.html (7399 lines).
Scope: refactor `pokazInfoPr` (lines 6562-6584) - remove middle SKLAD, replace ZMIEN MODEL with compact row, add composition chips to header card.

## Audit 1: .ds-mdl-btn / .ds-mdl-big usage

CSS definitions:
- Line 1380: `.ds-mdl-big{display:flex;flex-direction:column;gap:6px;margin-top:4px}`
- Lines 1381-1390: `.ds-mdl-btn` base + per-model (m-opus / m-sonnet / m-haiku)
- Lines 2039-2081: v32.8 F5 override - `.ds-mdl-big{gap:8px}` + `.ds-mdl-btn{min-height:64px;padding:10px 12px;border-radius:10px;...}`

Render locations (3 isolated sidebars):

| Location | Lines | Function | onclick | Status |
|---|---|---|---|---|
| Agent detail | 5729-5733 | pokazWezel(nid) | zmienModel(nid, m) | DO NOT CHANGE |
| Multi-select | 5871-5875 | pokazZazn() | zmienModelZazn(m) | DO NOT CHANGE |
| Preset detail | 6579-6583 | pokazInfoPr(pid) | zmienWszModel(m) | OK TO CHANGE |

Separation clean. Safe to replace lines 6579-6583 without touching showND / pokazZazn. CSS stays (used by other two surfaces).

## Audit 2: CLAUDE CODE COMMAND usage

- i18n key `'CLAUDE CODE COMMAND'`: line 5285 (translation table only)
- HTML render: line 6577 only (pokazInfoPr)
- `kopiujCmd` function definition: line 6978
- `kopiujCmd` invocation: line 6577 only
- Copy helper i18n keys: lines 5286-5287 ('Kliknij aby skopiowac' + 'Kliknij aby skopiowac komende z argumentem')

Only in pokazInfoPr. kopiujCmd self-contained. Can polish the block freely without orphaning anything.

## Audit 3: SKLAD + mh variable

Model counting logic (lines 6563-6565):
```js
const mc={opus:0,sonnet:0,haiku:0};
if(nodes.length&&actPr===pid){nodes.forEach(n=>mc[n.model]++)}
else{pr.forEach(p=>{const d=AD_MAP.get(p.d);if(d)mc[d.model]++})}
let mh='<span style="color:var(--mc-opus)">...';
```

mh defined on line 6565, used on line 6578 ONLY. Safe to repurpose mh (or mc directly) for header chips.

SKLAD label: line 6578 only. i18n entry exists (line 5280) but only referenced there. Can remove the block entirely without orphaning anything except an i18n key (keep the key anyway, cheap).

## Audit 4: zmienWszModel() behavior

Definition line 5859:
```js
function zmienWszModel(m){
  nodes.forEach(nd=>{nd.model=m});
  rWez();
  aktStan();
  aktKoszt();
  if(actPr) pokazInfoPr(actPr);
  else if(sel.size===1) pokazWezel([...sel][0])
}
```

Changes model for ALL agents on canvas. Refreshes canvas + status + cost + sidebar. Edge case: 0 nodes = no-op. Logic solid, no changes needed. New compact buttons will call it identically.

## Audit 5: .ds-card structure CSS

Line 1130:
```css
.ds-card{padding:14px;border:1px solid var(--brd);border-radius:14px;background:var(--bg-card);margin-bottom:12px;position:relative;overflow:hidden;transition:border-color var(--dur-base,200ms) linear(0,0.5,0.9 35%,1.05,0.95,1),transform var(--dur-base,200ms) linear(0,0.5,0.9 35%,1.05,0.95,1)}
```

Line 1181:
```css
.ds-avatar{display:flex;align-items:center;gap:12px;margin-bottom:10px}
.ds-avatar-orb{width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:22px;border:1.5px solid var(--brd);background:var(--bg-input);position:relative}
.ds-avatar-info h4{font-family:var(--hd);font-size:15px;font-weight:800;margin-bottom:2px;letter-spacing:-0.005em}
.ds-avatar-info .ds-role{font-family:var(--mn);font-size:11px;color:var(--t2);letter-spacing:.04em}
```

Safe injection for header chips: add new flex container AFTER `.ds-role` INSIDE `.ds-avatar-info`. Do NOT modify `.ds-card` padding or `.ds-avatar` flex.

CRITICAL: same `.ds-card` + `.ds-avatar` structure is used in pokazWezel (agent sidebar, line 5725). I MUST only inject chips in pokazInfoPr, NOT pokazWezel.

## Audit 6: Orphans after cleanup

| Item | Currently | After refactor | Verdict |
|---|---|---|---|
| .ds-mdl-btn CSS | 9 buttons / 3 sidebars | 6 buttons / 2 sidebars | KEEP |
| .ds-mdl-big CSS | 3 locations | 2 locations | KEEP |
| zmienWszModel() | preset sidebar | preset sidebar (compact) | KEEP |
| mh variable | line 6578 | header chips (reused) | REUSE |
| mc object | lines 6565+6578 | header chips | REUSE |
| kopiujCmd() | line 6577 | still in use | KEEP |

No orphans. All code stays alive.

## Audit 7: i18n + a11y

i18n: keep all existing keys. 'SKLAD' becomes inline in header chip context so the key becomes optional - keep it anyway (cheap).

a11y: current buttons are native <button>, inherit keyboard + focus via `.ds-mdl-btn:focus-visible{outline:2px solid currentColor}` (line 1400) + WCAG target size enforced (line 432). New compact chips MUST also be native <button> elements. Add `role="radiogroup"` + `aria-checked` per new compact row research if needed.

## Safe refactor checklist

### OK TO CHANGE
- Line 6578: remove SKLAD ds-block entirely
- Lines 6579-6583: replace 3 stacked .ds-mdl-btn with new compact row (NEW class .mdl-compact or similar)
- Lines 1380-1390 / 2039-2081: LEAVE AS IS (used by other sidebars)
- Add NEW CSS: .hd-mix (header chips) + .mdl-compact (new chip row)
- Reuse mc / mh logic (lines 6563-6565) for header chip render
- Line 6577 (CLAUDE CODE COMMAND): can polish, keep kopiujCmd onclick

### MUST PRESERVE
- Lines 5729-5733: pokazWezel agent sidebar model buttons
- Lines 5871-5875: pokazZazn multi-select sidebar model buttons
- Lines 1380-1390, 2039-2081: .ds-mdl-btn / .ds-mdl-big CSS
- Line 5859: zmienWszModel() function body
- Lines 6563-6564: mc counting logic
- Lines 1130-1185: .ds-card / .ds-avatar / .ds-avatar-info / .ds-role CSS
- Line 5725 (pokazWezel): same .ds-card structure - do NOT inject header chips here

### CONDITIONAL
- Header chips ONLY in pokazInfoPr. Never touch pokazWezel avatar card.

## Risk summary

| Risk | Prob | Mitigation |
|---|---|---|
| Break agent sidebar | 0% | different onclick (zmienModel vs zmienWszModel) |
| Break multi-select | 0% | different onclick (zmienModelZazn) |
| Orphan CSS | 0% | .ds-mdl-btn stays in 2 surfaces |
| Orphan JS | 0% | zmienWszModel still called by compact row |
| Break layout | 0% | new chips nest in .ds-avatar-info via flex |
| Break i18n | low | keys optional-but-kept |
| Break a11y | 0% | native <button> elements preserved |

Audit complete. Clear safe boundary for refactor.
