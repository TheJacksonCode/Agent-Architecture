# v32.11 LAYOUT SPEC

## Sidebar verdict panel position (in pokazInfoPr)

```
┌─────────────────────────────────────────┐  side-r 360px
│ Header (ds-card, icon + name)           │
│ ─────────────────────────────────────── │
│ KIEDY UZYWAC                            │  PRESET_MID_PL haiku-tinted
│ ┌───────────────────────────────────┐   │
│ │ Plain Polish 2-4 sentence summary │   │
│ └───────────────────────────────────┘   │
│ ─────────────────────────────────────── │
│ ┌───────────────┬───────────────────┐   │  <-- NEW: verdict panel
│ │ ✓ NADAJE SIE  │ ✗ NIE DLA         │   │
│ │ ✓ Bullet 1    │ ✗ Bullet 1        │   │
│ │ ✓ Bullet 2    │ ✗ Bullet 2        │   │
│ │ ✓ Bullet 3    │ ✗ Bullet 3        │   │
│ │ ✓ Bullet 4    │ ✗ Bullet 4        │   │
│ │ ✓ Bullet 5    │                   │   │
│ └───────────────┴───────────────────┘   │
│ ─────────────────────────────────────── │
│ ▶ SZCZEGOLOWY OPIS [collapsible]        │
│ ─────────────────────────────────────── │
│ CLAUDE CODE COMMAND  /preset-id  📋     │
│ ─────────────────────────────────────── │
│ SKLAD: 4O · 6S · 2H                     │
│ ─────────────────────────────────────── │
│ ZMIEN MODEL                             │
│ [Opus] [Sonnet] [Haiku]                 │
│ ─────────────────────────────────────── │
│ [📚 Encyklopedia presetu]               │
└─────────────────────────────────────────┘
```

Inner width = 360 - 24px padding = 336px. Per column = (336 - 0px gap) / 2 = 168px usable.

## Class names (vd- prefix matching v32 convention)

```
.vd            outer grid container (2 cols, hard split, glass card, rounded)
.vd::before    mid separator line
.vd-col        column body (padding, flex column)
.vd-col.fit    green wash + green left bar
.vd-col.nofit  red wash + red right bar
.vd-head       header chip (uppercase, rounded pill)
.vd-list       <ul> reset
.vd-list li    individual bullet with ::before icon
```

## HTML structure

```html
<div class="ds vd" role="group" aria-label="Kiedy uzywac / kiedy nie uzywac">
  <div class="vd-col fit">
    <span class="vd-head">Nadaje sie do</span>
    <ul class="vd-list">
      <li>Bullet 1</li>
      <li>Bullet 2</li>
      <li>Bullet 3</li>
      <li>Bullet 4</li>
      <li>Bullet 5</li>
    </ul>
  </div>
  <div class="vd-col nofit">
    <span class="vd-head">Nie dla</span>
    <ul class="vd-list">
      <li>Bullet 1</li>
      <li>Bullet 2</li>
      <li>Bullet 3</li>
      <li>Bullet 4</li>
    </ul>
  </div>
</div>
```

## JS template literal (in pokazInfoPr)

```js
((PRESET_GREEN_PL[pid]||PRESET_RED_PL[pid])?'<div class="ds vd" role="group" aria-label="'+t('Nadaje sie do')+' / '+t('Nie dla')+'">'+
  '<div class="vd-col fit"><span class="vd-head">'+t('Nadaje sie do')+'</span><ul class="vd-list">'+
    (PRESET_GREEN_PL[pid]||[]).map(x=>'<li>'+escHtml(x)+'</li>').join('')+
  '</ul></div>'+
  '<div class="vd-col nofit"><span class="vd-head">'+t('Nie dla')+'</span><ul class="vd-list">'+
    (PRESET_RED_PL[pid]||[]).map(x=>'<li>'+escHtml(x)+'</li>').join('')+
  '</ul></div>'+
'</div>':'')+
```

Renders empty if neither array exists for the preset (defensive).

## CSS placement

Insert new `.vd*` rules in the `<style>` block right after the v32.10 `.ds-longdesc` rules (line ~1145). Both are sidebar-specific so they cluster nicely.

## Migration from v32.10

Diff against v32.10 lines 6468-6474:

REMOVE (7 lines):
```js
'<div class="ds"><div class="ds-l">'+t('ZALETY')+'</div><ul class="pi-ul">'+getPresetPros(pid).map(x=>'<li class="pi-pro">'+x+'</li>').join('')+'</ul></div>'+
'<div class="ds"><div class="ds-l">'+t('WADY')+'</div><ul class="pi-ul">'+getPresetCons(pid).map(x=>'<li class="pi-con">'+x+'</li>').join('')+'</ul></div>'+
(function(){const pk=getPresetKnowledge(pid);if(!pk)return '';let h='';
if(pk.who)h+='<div class="ds"><div class="ds-l">'+t('CZYM JEST')+'</div>...';
if(pk.whenToUse&&pk.whenToUse.length)h+='<div class="ds"><div class="ds-l" style="color:var(--accent2)">'+t('CO ROBI / KIEDY UZYWAC')+'</div>...';
if(pk.whenNotToUse&&pk.whenNotToUse.length)h+='<div class="ds"><div class="ds-l" style="color:var(--accent4)">'+t('CZEGO NIE ROBI / KIEDY NIE UZYWAC')+'</div>...';
return h})()+
```

ADD (1 verdict block) above SZCZEGOLOWY OPIS line.

## Translation entries (I18N_EN)

Add to I18N_EN dict (line ~5170):
- `'Nadaje sie do': 'Good fit for'`
- `'Nie dla': 'Not for'`

Also remove orphan entries no longer used in pokazInfoPr (but check if used elsewhere first):
- `'CZYM JEST'` - check if used in bento or encyclopedia
- `'CO ROBI / KIEDY UZYWAC'` - check
- `'CZEGO NIE ROBI / KIEDY NIE UZYWAC'` - check
- `'ZALETY'`, `'WADY'` - definitely used in bento, leave them
