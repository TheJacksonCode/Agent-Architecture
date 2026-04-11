# v32.9 Task 1 - DESIGN_SPEC: Preset sidebar parity

**Task:** Bring `.pr-item` preset rows to visual parity with `.pa-item` agent rows, plus headline innovation: glanceable phase composition fingerprint.

**Baseline:** v32.8 line 5257 rPresety + line 741 .pr-item CSS.

**Research reused:**
- v32.8/research/R5_premium_tools.md l.140-165 "Direct application to v32.8" (canonical sidebar numbers)
- v32.9/research/R1_preset_gallery_delta.md (delta over R5: preset picker patterns, phase bar innovation, featured treatment)

## Design decisions (DD)

### DD1 - List, not grid
260px sidebar minus padding = 228px usable. Grid math breaks below 3 cols. **List at 48px rows, 2-line layout**. Cited: R1 l.112-125.

### DD2 - Stacked phase bar as headline innovation
Each preset gets an **inline 4px horizontal stacked bar** at the bottom of the row showing phase composition (proportional flex segments colored by `--ph-strategy`, `--ph-research`, `--ph-debate`, `--ph-build`, `--ph-qa`, `--ph-hitl`). Turns each preset into a visually unique "fingerprint". Cited: R1 l.68-92.

Phase counts derived at runtime from `PM[pid].n.reduce` counting each `defId`'s phase from `AD_MAP`. Computed once per render.

### DD3 - Inherit v32.5 phase CSS vars, no new tokens
Reuse `--ph-strategy`, `--ph-strategy-rgb`, ... already shipped in v32.5. No new color system. Confirms R5 "tokens unified" principle.

### DD4 - NEW badge preserved from v32.7
Keep current `.pa-tier-badge` styling (7px green haiku outlined), but rename to `.pr-tier-new` in CSS and emit class in rPresety (not the buggy `.pa-tier-badge` reuse identified in code delta map Gap 6).

### DD5 - Featured = tinted row background (not badge)
Currently `.pr-item.featured` applies only to `deep_five_minds` with a gold gradient. Generalize: any preset with tier='featured' or in a curated list gets `rgba(var(--accent-rgb),.06)` tinted bg + `1px solid rgba(var(--accent-rgb),.18)` border. Cited: R1 l.49-52 Notion/Vercel pattern C.

### DD6 - Phase housing ph-* classes for presets
Compute "dominant phase" = phase with most agents in preset. Emit `ph-{dominant}` class on `.pr-item` so the left 2px border + hover glow matches agent items. Identical to agent pattern.

Fallback: if no dominant phase (tie), use `ph-build` as neutral default.

### DD7 - Agent count chip refinement
`.pr-cnt` drops to 10px/600, adds a 6px dot prefix (`currentColor` at 70% opacity), gets white 6% bg + 8% border. Cited: R1 l.94-110.

### DD8 - Category header with inline count suffix
`.pr-cat` gets a `<span class="pr-cat-count">· N</span>` child showing items in category. Uppercase 11px header stays; suffix is 9px/500 at `var(--t4)`. Cited: R1 l.127-146.

### DD9 - Row height 48px (was 40px)
Line 1 is 18px (icon 14 + line-height), line 2 is 16px (desc + phase bar 4px on its own strip), plus 7px padding top/bottom = 48px. Matches Linear Views "2-line premium picker" pattern cited in R5 + R1.

### DD10 - Full border set (top/right/bottom transparent)
Gap 2 from code delta: `.pr-item` currently lacks border-top/right/bottom. Add transparent 1px borders so hover/selected states can animate borders smoothly like `.pa-item`. No visual change at rest.

### DD11 - Reuse escHtml sweep from v32.8 I-A hotfix
All new innerHTML sinks in new rPresety (phase bar segments, count, featured tint) must either use textContent or wrap user data with escHtml. Phase bar segments are synthetic (no user data), count is numeric, badge text is static - only name/desc need escHtml which v32.8 already does.

### DD12 - APCA ink tokens on preset rows
Row title uses `var(--t1)`, description uses `var(--t2)`, count chip uses `var(--t2)`. All already APCA Lc >= 75 per v32.8 R8 audit.

## CSS recipe (drop-in)

```css
/* Preset row - 48px 2-line with phase bar */
.pr-item{
  display:flex; align-items:flex-start; gap:10px;
  padding:7px 12px; min-height:48px;
  cursor:pointer;
  border:1px solid transparent;
  border-left-width:2px;
  border-radius:8px;
  margin:1px 6px;
  transition:background var(--dur-2,160ms) ease,
             border-color var(--dur-2,160ms) ease,
             transform var(--dur-1,80ms) ease;
  position:relative;
}
.pr-item:hover{
  background:rgba(255,255,255,.05);
  border-color:var(--brd);
}
.pr-item:active{ transform:translateY(1px); }
.pr-item.on{
  background:rgba(var(--accent-rgb),.12);
  border-left-color:var(--accent);
}

/* Phase housing - mirror .pa-item.ph-* from v32.5 */
.pr-item.ph-strategy{border-left-color:rgba(var(--ph-strategy-rgb),.55);}
.pr-item.ph-research{border-left-color:rgba(var(--ph-research-rgb),.55);}
.pr-item.ph-debate{border-left-color:rgba(var(--ph-debate-rgb),.55);}
.pr-item.ph-build{border-left-color:rgba(var(--ph-build-rgb),.55);}
.pr-item.ph-qa{border-left-color:rgba(var(--ph-qa-rgb),.55);}
.pr-item.ph-hitl{border-left-color:rgba(var(--ph-hitl-rgb),.55);}
.pr-item.ph-strategy:hover{box-shadow:inset 3px 0 0 rgba(var(--ph-strategy-rgb),.75);}
/* ... same for each phase ... */

/* Featured tier - tinted row (DD5) */
.pr-item.tier-featured{
  background:linear-gradient(180deg,
    rgba(var(--accent-rgb),.06),
    rgba(var(--accent-rgb),.02));
  border-color:rgba(var(--accent-rgb),.18);
}

/* Main text column */
.pr-txt{flex:1; min-width:0; display:flex; flex-direction:column; gap:3px;}
.pr-name{
  font:600 13px/1.25 'Inter Variable', sans-serif;
  color:var(--t1);
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  display:flex; align-items:center; gap:6px;
}
.pr-desc{
  font:400 11px/1.35 'Inter Variable', sans-serif;
  color:var(--t2);
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}

/* Meta row (line 2 bottom) - count + phase bar */
.pr-meta{
  display:flex; align-items:center; gap:8px;
  margin-top:4px;
}

/* Count chip (DD7) */
.pr-cnt{
  display:inline-flex; align-items:center; gap:4px;
  font:600 10px/1 'Inter Variable', sans-serif;
  letter-spacing:.02em;
  padding:3px 6px; border-radius:4px;
  background:rgba(255,255,255,.06);
  color:var(--t2);
  border:1px solid rgba(255,255,255,.08);
  flex-shrink:0;
}
.pr-cnt::before{
  content:''; width:5px; height:5px; border-radius:50%;
  background:currentColor; opacity:.7;
}

/* Stacked phase bar (DD2 - headline innovation) */
.pr-phases{
  display:flex; align-items:stretch;
  height:4px; flex:1; min-width:0;
  border-radius:2px; overflow:hidden;
  background:rgba(255,255,255,.04);
}
.pr-phases > i{
  display:block; min-width:2px;
  transition:opacity var(--dur-2,160ms) ease;
}
.pr-phases > i.ph-strategy{background:var(--ph-strategy);}
.pr-phases > i.ph-research{background:var(--ph-research);}
.pr-phases > i.ph-debate{background:var(--ph-debate);}
.pr-phases > i.ph-build{background:var(--ph-build);}
.pr-phases > i.ph-qa{background:var(--ph-qa);}
.pr-phases > i.ph-hitl{background:var(--ph-hitl);}
.pr-item:hover .pr-phases > i{opacity:.85;}

/* NEW tier badge (DD4) - rename from .pa-tier-badge */
.pr-tier-new{
  display:inline-block;
  font:600 9px/1 'Inter Variable', sans-serif;
  letter-spacing:.05em;
  text-transform:uppercase;
  padding:2px 5px;
  border-radius:3px;
  color:var(--mc-haiku);
  background:rgba(var(--mc-haiku-rgb),.14);
  border:1px solid rgba(var(--mc-haiku-rgb),.35);
  flex-shrink:0;
}

/* Category header with count suffix (DD8) */
.pr-cat-count{
  font:500 9px/1 'Inter Variable', sans-serif;
  letter-spacing:.02em;
  color:var(--t4, var(--t3));
  padding-left:4px;
  text-transform:none;
}
```

## rPresety JS sketch

```js
function rPresety(){
  const cont=G('pres'); if(!cont) return;
  let html='';
  PCAT.forEach(cat=>{
    const items=cat.ids.filter(pid=>PM[pid]);
    if(!items.length)return;
    html+='<div class="pr-cat">'+escHtml(getPCatLabel(cat.key))+
      '<span class="pr-cat-count">&middot; '+items.length+'</span></div>';
    items.forEach(pid=>{
      const m=PM[pid]; if(!m)return;
      // compute phase composition
      const phCount={strategy:0,research:0,debate:0,build:0,qa:0,hitl:0};
      m.n.forEach(n=>{const d=AD_MAP.get(n.defId); if(d&&phCount.hasOwnProperty(d.phase))phCount[d.phase]++});
      const total=Object.values(phCount).reduce((a,b)=>a+b,0)||1;
      // dominant phase for housing
      let dom='build',domC=0;
      Object.entries(phCount).forEach(([k,v])=>{if(v>domC){dom=k;domC=v}});
      // build phase bar segments
      const segs=['strategy','research','debate','build','qa','hitl']
        .filter(p=>phCount[p]>0)
        .map(p=>'<i class="ph-'+p+'" style="flex:'+phCount[p]+'"></i>')
        .join('');
      const featured=m.tier==='featured'||pid==='deep_five_minds';
      const klass='pr-item ph-'+dom+(featured?' tier-featured':'')+(pid===aktPr?' on':'');
      const iconColor=KOLOR_IKONY_PRESETU(pid);
      const icon=PRESET_SVG[pid]?svgPresetu(pid,18):(m.i||'');
      html+='<div class="'+klass+'" id="pi_'+pid+
        '" tabindex="0" role="option" onclick="ladujPreset(\''+pid+
        '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();ladujPreset(\''+pid+'\')}">'+
        '<div class="pr-orb" style="color:'+iconColor+'">'+icon+'</div>'+
        '<div class="pr-txt">'+
          '<div class="pr-name">'+escHtml(getPresetName(pid))+
            (m.tier==='new'?'<span class="pr-tier-new">NEW</span>':'')+'</div>'+
          '<div class="pr-desc">'+escHtml(getPresetDesc(pid))+'</div>'+
          '<div class="pr-meta">'+
            '<span class="pr-cnt">'+(m.c||m.n.length)+'</span>'+
            '<div class="pr-phases" aria-hidden="true">'+segs+'</div>'+
          '</div>'+
        '</div>'+
      '</div>';
    });
  });
  cont.innerHTML=html;
}
```

## Migration

- Replace buggy `.pa-tier-badge` reference in rPresety with new `.pr-tier-new`
- Add new CSS block before `/* v32.8 END */` marker (if exists) or end of main style block
- Replace entire rPresety function at line ~5257
- No data migration needed (PM structure unchanged)
- No localStorage change
- Version bump: title v32.9, eksportujKfg v='32.9', buildCostJSON version='32.9'
- localStorage: add `acV32_9_custom` with backward chain

## Acceptance criteria

1. All 42 presets render with 48px rows, 2-line layout
2. Each preset shows a stacked phase bar with correct proportions (eyeball test: deep_research_swarm_pro = mostly research cyan, fullstack_premium = mixed with build green dominance, prd_to_launch = strategy violet + build)
3. Phase housing left-border-color matches dominant phase per preset
4. NEW badge shows only on tier='new' presets (13 from v32.7)
5. Featured tint applied to deep_five_minds and any tier='featured' (future-proof)
6. Hover = bg lift + border color
7. Selected (.on) = accent tinted bg + full accent left border
8. Category headers show `· N` count suffix
9. escHtml applied to name/desc
10. JS parse clean (0 errors)
11. No regression in agent palette (.pa-item) rendering
12. Keyboard: tab, Enter, Space load preset
