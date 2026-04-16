# v32.12 DESIGN + LAYOUT SPEC

Synteza R1 (UI patterns) + R2 (scope audit) + R3 (segmented control deep dive). Consolidated single file for context efficiency.

## Design decisions

- **DD01** Header composition: Pattern A3 (R1) - 6px micro stacked bar + 3 count chips (o 4 Opus | o 6 Sonnet | o 2 Haiku) inside `.ds-avatar-info` under `.ds-role`. Adds ~32px to header, kills 38px standalone SKLAD, net -6px.
- **DD02** Claude Code command: Pattern B2 (R1) - 32px pill without label / without helper, SVG clipboard icon, `title` tooltip, `.cmd-flash` "Skopiowano" hint on success. Saves ~34px.
- **DD03** Model switcher: Pattern C-Pat2 (R1) - Material 3 choice-chip row, 3 independent tinted chips `.ds-mdl-chip` in a `.ds-mdl-row` grid. Per-model colors reinforced. APCA option 2 fallback: label at `var(--t2)` at rest, colored only on hover+active. Rejected R3 sliding-pill because per-model identity is core language of the app since v32.5 and sliding neutral container would flatten it. Saves ~104px (3x44 stacked -> 1x36 row).
- **DD04** Drop "ZMIEN MODEL" label entirely - 3 model chips next to command pill are self-evident.
- **DD05** Keep all existing `.ds-mdl-btn` / `.ds-mdl-big` CSS intact - used by `pokazWezel` (line 5729-5733) and `pokazZazn` (line 5871-5875). Per R2 audit scope is clean.
- **DD06** Remove middle SKLAD ds-block (line 6578) entirely. Keep `mc` counting logic (lines 6563-6565), reuse for header chips.
- **DD07** Native `<button>` elements everywhere. `role="radiogroup"` + `aria-checked` on model row. `type="button"` on cmd pill.
- **DD08** Title attribute preserves full model metadata (ctx + pricing) on chip hover - user asked to remove from visible label only, not delete from UI.
- **DD09** prefers-reduced-motion: all transitions capped at .2s color only (no transforms anyway).
- **DD10** Sidebar width stays 360px from v32.11.

## New CSS classes (inserted after .ds-mdl-btn rules around line 1390)

```css
/* ============================================================
   v32.12 HEADER COMPOSITION (.ds-comp*)
   ============================================================ */
.ds-comp{margin-top:8px;display:flex;flex-direction:column;gap:6px}
.ds-comp-bar{height:6px;border-radius:3px;background:var(--bg-input);overflow:hidden;border:1px solid var(--brd);display:flex}
.ds-comp-bar>span{display:block;height:100%;transition:flex-basis .32s ease}
.ds-comp-bar>.s-op{background:var(--mc-opus);flex-basis:var(--op,0%)}
.ds-comp-bar>.s-so{background:var(--mc-sonnet);flex-basis:var(--so,0%)}
.ds-comp-bar>.s-ha{background:var(--mc-haiku);flex-basis:var(--ha,0%)}
.ds-comp-chips{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px}
.ds-comp-chip{display:flex;align-items:center;justify-content:center;gap:5px;height:22px;padding:0 8px;border-radius:11px;border:1px solid var(--brd);background:var(--bg-input);font-family:var(--mn);font-size:10px;font-weight:700;letter-spacing:.02em;color:var(--t1);white-space:nowrap}
.ds-comp-chip::before{content:"";width:7px;height:7px;border-radius:50%;flex-shrink:0}
.ds-comp-chip.c-op{border-color:rgba(var(--mc-opus-rgb),.35);background:rgba(var(--mc-opus-rgb),.08);color:var(--mc-opus)}
.ds-comp-chip.c-op::before{background:var(--mc-opus)}
.ds-comp-chip.c-so{border-color:rgba(var(--mc-sonnet-rgb),.35);background:rgba(var(--mc-sonnet-rgb),.08);color:var(--mc-sonnet)}
.ds-comp-chip.c-so::before{background:var(--mc-sonnet)}
.ds-comp-chip.c-ha{border-color:rgba(var(--mc-haiku-rgb),.35);background:rgba(var(--mc-haiku-rgb),.08);color:var(--mc-haiku)}
.ds-comp-chip.c-ha::before{background:var(--mc-haiku)}
.ds-comp-chip.is-zero{opacity:.35}
@media (prefers-reduced-motion:reduce){.ds-comp-bar>span{transition:none}}

/* ============================================================
   v32.12 CLAUDE CODE COMMAND PILL (.ds-cmd)
   ============================================================ */
.ds-cmd{display:flex;align-items:center;gap:8px;height:32px;padding:0 10px 0 12px;margin:6px 0 10px;background:var(--bg-input);border:1px solid var(--brd);border-radius:8px;cursor:pointer;transition:background .2s,border-color .2s;position:relative;width:100%}
.ds-cmd:hover{background:rgba(139,92,246,.08);border-color:rgba(139,92,246,.45)}
.ds-cmd:focus-visible{outline:2px solid var(--accent2);outline-offset:2px}
.ds-cmd code{flex:1;font-family:var(--mn);font-size:12px;color:var(--accent2);letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left}
.ds-cmd .cmd-icon{width:16px;height:16px;flex-shrink:0;color:var(--t3);transition:color .2s}
.ds-cmd:hover .cmd-icon{color:var(--t1)}
.ds-cmd.is-copied .cmd-icon{color:var(--mc-haiku)}
.ds-cmd .cmd-flash{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-family:var(--hd);font-size:10px;font-weight:700;color:var(--mc-haiku);opacity:0;pointer-events:none;transition:opacity .2s}
.ds-cmd.is-copied .cmd-flash{opacity:1}
.ds-cmd.is-copied code{opacity:0}
@media (prefers-reduced-motion:reduce){.ds-cmd,.ds-cmd .cmd-icon,.ds-cmd code,.ds-cmd .cmd-flash{transition:none}}

/* ============================================================
   v32.12 COMPACT MODEL SWITCHER (.ds-mdl-row / .ds-mdl-chip)
   APCA fallback option 2: rest label at --t2, colored only hover+active
   ============================================================ */
.ds-mdl-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:4px 0 10px}
.ds-mdl-chip{position:relative;height:36px;padding:0 8px;border-radius:10px;border:1.5px solid var(--brd);background:var(--bg-input);font-family:var(--hd);font-size:12px;font-weight:700;color:var(--t2);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:background .2s,border-color .2s,color .2s;min-inline-size:24px;min-block-size:24px}
.ds-mdl-chip::before{content:"";width:8px;height:8px;border-radius:50%;flex-shrink:0;background:var(--t3);transition:background .2s}
.ds-mdl-chip.m-opus::before{background:rgba(var(--mc-opus-rgb),.55)}
.ds-mdl-chip.m-sonnet::before{background:rgba(var(--mc-sonnet-rgb),.55)}
.ds-mdl-chip.m-haiku::before{background:rgba(var(--mc-haiku-rgb),.55)}
.ds-mdl-chip:focus-visible{outline:2px solid currentColor;outline-offset:2px}
.ds-mdl-chip.m-opus:hover{color:var(--mc-opus);background:rgba(var(--mc-opus-rgb),.08);border-color:rgba(var(--mc-opus-rgb),.42)}
.ds-mdl-chip.m-opus:hover::before{background:var(--mc-opus)}
.ds-mdl-chip.m-sonnet:hover{color:var(--mc-sonnet);background:rgba(var(--mc-sonnet-rgb),.08);border-color:rgba(var(--mc-sonnet-rgb),.42)}
.ds-mdl-chip.m-sonnet:hover::before{background:var(--mc-sonnet)}
.ds-mdl-chip.m-haiku:hover{color:var(--mc-haiku);background:rgba(var(--mc-haiku-rgb),.08);border-color:rgba(var(--mc-haiku-rgb),.42)}
.ds-mdl-chip.m-haiku:hover::before{background:var(--mc-haiku)}
.ds-mdl-chip.active.m-opus{color:var(--mc-opus);background:rgba(var(--mc-opus-rgb),.14);border-color:var(--mc-opus);box-shadow:inset 0 0 0 1px rgba(var(--mc-opus-rgb),.45),0 0 12px rgba(var(--mc-opus-rgb),.22)}
.ds-mdl-chip.active.m-opus::before{background:var(--mc-opus)}
.ds-mdl-chip.active.m-sonnet{color:var(--mc-sonnet);background:rgba(var(--mc-sonnet-rgb),.14);border-color:var(--mc-sonnet);box-shadow:inset 0 0 0 1px rgba(var(--mc-sonnet-rgb),.45),0 0 12px rgba(var(--mc-sonnet-rgb),.22)}
.ds-mdl-chip.active.m-sonnet::before{background:var(--mc-sonnet)}
.ds-mdl-chip.active.m-haiku{color:var(--mc-haiku);background:rgba(var(--mc-haiku-rgb),.14);border-color:var(--mc-haiku);box-shadow:inset 0 0 0 1px rgba(var(--mc-haiku-rgb),.45),0 0 12px rgba(var(--mc-haiku-rgb),.22)}
.ds-mdl-chip.active.m-haiku::before{background:var(--mc-haiku)}
@media (prefers-reduced-motion:reduce){.ds-mdl-chip{transition:none}}
```

## ASCII layout (360px sidebar, 336px card inner)

```
+------------------------------------------------------+  <- .ds-card (360 - 24 pad)
| [orb 56] Deep Five Minds Ultimate        [NEW]       |
|  cos     24 agentow | Deep debata                    |
|          [==Opus 33%==|==Sonnet 50%===|Hi 17%]       |  <- .ds-comp-bar 6px
|          [o 4 Opus]  [o 6 Sonnet] [o 2 Haiku]        |  <- .ds-comp-chips 22px
+------------------------------------------------------+
+------------------------------------------------------+
| KIEDY UZYWAC                                         |
| [plain polish 2-3 sentence haiku-tinted card]        |
+------------------------------------------------------+
+------------------------------------------------------+
| [green fit]      |  [red nofit]                      |  <- v32.11 verdict panel
+------------------------------------------------------+
+------------------------------------------------------+
| > SZCZEGOLOWY OPIS (collapsible)                     |
+------------------------------------------------------+

[/deep-five-minds                     (clipboard)]     <- .ds-cmd 32px, no label

[  o Opus  ]  [  o Sonnet  ]  [  o Haiku  ]            <- .ds-mdl-row 36px, no label

[Encyklopedia presetu]
```

## JS template literal patches (in pokazInfoPr)

### Patch 1 - header card (line 6569) - inject .ds-comp under .ds-role

Old: `<div class="ds-avatar-info"><h4>...name...</h4><div class="ds-role">'+m.c+' '+t('agentow')+' | '+m.pt+'</div></div>`

New: same plus:
```js
const tot=mc.opus+mc.sonnet+mc.haiku;
const pct=k=>tot?(mc[k]*100/tot).toFixed(1)+'%':'0%';
const compHtml='<div class="ds-comp" aria-label="'+t('Sklad modeli')+'">'+
  '<div class="ds-comp-bar" role="img" aria-label="'+mc.opus+' Opus, '+mc.sonnet+' Sonnet, '+mc.haiku+' Haiku" style="--op:'+pct('opus')+';--so:'+pct('sonnet')+';--ha:'+pct('haiku')+'">'+
    '<span class="s-op"></span><span class="s-so"></span><span class="s-ha"></span>'+
  '</div>'+
  '<div class="ds-comp-chips">'+
    '<span class="ds-comp-chip c-op'+(mc.opus?'':' is-zero')+'">'+mc.opus+' Opus</span>'+
    '<span class="ds-comp-chip c-so'+(mc.sonnet?'':' is-zero')+'">'+mc.sonnet+' Sonnet</span>'+
    '<span class="ds-comp-chip c-ha'+(mc.haiku?'':' is-zero')+'">'+mc.haiku+' Haiku</span>'+
  '</div>'+
'</div>';
```
And append `compHtml` inside `<div class="ds-avatar-info">` after `</div>` closing `.ds-role`.

### Patch 2 - CLAUDE CODE COMMAND replacement (line 6577)

Remove whole `<div class="ds"><div class="ds-l">CLAUDE CODE COMMAND...` block.
Replace with:
```js
'<button class="ds-cmd" type="button" onclick="kopiujCmd(this,\''+pid+'\')" title="'+t('Skopiuj komende')+'">'+
  '<code>/'+pid.replace(/_/g,'-')+'</code>'+
  '<svg class="cmd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'+
  '<span class="cmd-flash">'+t('Skopiowano')+'</span>'+
'</button>'
```

### Patch 3 - SKLAD removal (line 6578)

DELETE: `'<div class="ds"><div class="ds-l">'+t('SKLAD')+'</div><div style="font-family:var(--mn);font-size:10px;margin:3px 0">'+mh+'</div></div>'+`

### Patch 4 - ZMIEN MODEL replacement (lines 6579-6583)

Remove whole block. Replace with:
```js
'<div class="ds-mdl-row" role="radiogroup" aria-label="'+t('Zmien model dla wszystkich agentow presetu')+'">'+
  (function(){
    const n=nodes.length;
    const dom=n?(mc.opus===n?'opus':(mc.sonnet===n?'sonnet':(mc.haiku===n?'haiku':''))):'';
    return ['opus','sonnet','haiku'].map(mm=>{
      const cls='ds-mdl-chip m-'+mm+(dom===mm?' active':'');
      const lbl=mm.charAt(0).toUpperCase()+mm.slice(1);
      const meta=mm==='opus'?'Opus 4.6 - 1M ctx, $5/$25':(mm==='sonnet'?'Sonnet 4.6 - 1M ctx, $3/$15':'Haiku 4.5 - 200K ctx, $1/$5');
      return '<button class="'+cls+'" type="button" role="radio" aria-checked="'+(dom===mm?'true':'false')+'" onclick="zmienWszModel(\''+mm+'\')" title="'+meta+'">'+lbl+'</button>';
    }).join('');
  })()+
'</div>'
```

## kopiujCmd patch (line ~6978)

Add `.is-copied` class toggle:
```js
function kopiujCmd(el,pid){
  const cmd='/'+pid.replace(/_/g,'-');
  navigator.clipboard.writeText(cmd).then(()=>{
    el.classList.add('is-copied');
    announce(t('Skopiowano')+': '+cmd);
    setTimeout(()=>el.classList.remove('is-copied'),1400);
  }).catch(()=>{});
}
```
(verify current kopiujCmd shape before editing)

## i18n new keys

Add to I18N_EN dict around line 5285:
- `'Sklad modeli': 'Model composition'`
- `'Skopiuj komende': 'Copy command'`
- `'Skopiowano': 'Copied'`
- `'Zmien model dla wszystkich agentow presetu': 'Change model for all preset agents'`

## Version bumps (standard across versions)

- Title line 20: `v32.11 | Verdict Panel - Combined Pros/Cons` -> `v32.12 | Header Composition + Compact Controls`
- `eksportujKfg` v='32.11' -> '32.12'
- `buildCostJSON` version:'32.11' -> '32.12'
- `zapiszCustom`/`usunCustomAgent`/`ladujCustomAgentow` localStorage key `acV32_11_custom` -> `acV32_12_custom` (replace_all)
- `ladujCustomAgentow` migration chain: prepend `safeParseLS('acV32_11_custom',null)||` before the existing chain

## QA checklist

- [ ] node --check parse 0 errors
- [ ] grep: .ds-comp, .ds-cmd, .ds-mdl-row, .ds-mdl-chip classes present
- [ ] grep: SKLAD middle block removed (still in i18n table, OK)
- [ ] grep: .ds-mdl-big still present (used by pokazWezel/pokazZazn)
- [ ] grep: title v32.12, export v='32.12', acV32_12_custom 3x
- [ ] visual: start app, open preset, verify header chips + cmd pill + model row
