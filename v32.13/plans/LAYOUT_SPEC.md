# v32.13 LAYOUT_SPEC - Agent sidebar markup

**Target:** pokazWezel (lines 5791-5834) + pokazDef (5836-5850) rewrite.
**Reference:** pokazInfoPr (lines 6635-6687) as template.

---

## 1. ASCII mockup (Variant B Progressive Disclosure)

```
+--------------------------------------------------+ <- .ds scroll container
| .ds-hero-sticky.ph-research                      | 88px STICKY
| +------+ synthesizer            [Research] [S]  |
| | orb  | Synteza insightow z wielu zrodel       |
| +------+ [load mini-bar ========----]            |
+--------------------------------------------------+
| .vd  KIEDY UZYWAC / KIEDY NIE UZYWAC             | 220px
| +-------fit-----+ +-------nofit---+              |
| | + Bullet 1    | | - Bullet 1    |              |
| | + Bullet 2    | | - Bullet 2    |              |
| | + Bullet 3    | | - Bullet 3    |              |
| | + Bullet 4    | | - Bullet 4    |              |
| +---------------+ +---------------+              |
+--------------------------------------------------+
| .ds-l  KLUCZOWE KOMPETENCJE                      | 140px
| +-- details ---------------------------------+   |
| | Synthesizer laczy wnioski kilku researche- |   |
| | row w spojny brief. Pracuje po fazie...    |   |
| | [Wiecej]                                   |   |
| +--------------------------------------------+   |
+--------------------------------------------------+
| .ds-l  KIM JEST                                  | 72px
| Lider ktory zbiera wynik kilku badaczy.          |
| ANALOGIA                                         |
| "Redaktor magazynu feature story."               |
+--------------------------------------------------+
| .ds-twinchips                                    | 120px
| +--- CO ROBI -----+ +-- CZEGO NIE ROBI --+       |
| | + chip          | | - chip             |       |
| | + chip          | | - chip             |       |
| | + chip          | | - chip             |       |
| |                 | | [amber anti-chip]  |       |
| |                 | | [amber anti-chip]  |       |
| +-----------------+ +--------------------+       |
+--------------------------------------------------+
| .ds-l  NARZEDZIA                                 | 56px
| [Read] [Grep] [Glob] [Write]                     |
+--------------------------------------------------+
| .ds-l  POLACZENIA (hidden if empty)              | 80px
| WEJSCIA: [orchestrator]                          |
| WYJSCIA: [decision_presenter]                    |
+--------------------------------------------------+
| .ds-mdl-row                                      | 56px
| [Opus] [ Sonnet ] [Haiku]                        |
+--------------------------------------------------+
| .ds-l  PROMPT                                    | 48px
| ( > Edytuj prompt )  [dup] [copy] [reset]        |
+--------------------------------------------------+
| .btn-learn.is-rich                               | 76px
| [icon] ENCYKLOPEDIA                              |
|        Poznaj tego agenta                        |
|        Pelny profil, 6 sekcji wiedzy          >  |
+--------------------------------------------------+
                                          total ~956px
```

---

## 2. HTML skeleton (Polish labels, i18n via aktStatHTML)

```html
<div class="ds-card">
  <!-- 1. HERO sticky -->
  <div class="ds-hero-sticky ph-${a.ph}">
    <div class="ds-hero-row">
      <div class="ds-avatar-orb ph-${a.ph}" style="background:${col}">${svgAgenta(a)}</div>
      <div class="ds-hero-meta">
        <div class="ds-hero-title">${escHtml(getAgentName(a.id))}</div>
        <div class="ds-hero-role">${escHtml(getAgentDesc(a.id))}</div>
        <div class="ds-hero-chips">
          <span class="ds-chip-micro">${phaseLabel(a.ph)}</span>
          <span class="ds-chip-micro m-${a.m}">${modelLabel(a.m)}</span>
        </div>
      </div>
    </div>
    <div class="ds-load-mini"><i style="width:${loadPct}%"></i></div>
  </div>

  <!-- 2. VERDICT -->
  <div class="vd">
    <div class="vd-col fit">
      <div class="vd-head">KIEDY UZYWAC</div>
      <ul class="vd-list">
        ${getAgentGreenPl(a.id).map(b => `<li>+ ${escHtml(b)}</li>`).join('')}
      </ul>
    </div>
    <div class="vd-col nofit">
      <div class="vd-head">KIEDY NIE UZYWAC</div>
      <ul class="vd-list">
        ${getAgentRedPl(a.id).map(b => `<li>- ${escHtml(b)}</li>`).join('')}
      </ul>
    </div>
  </div>

  <!-- 3. KLUCZOWE KOMPETENCJE (collapsible) -->
  <div class="ds-l">
    <div class="ds-l-hd">KLUCZOWE KOMPETENCJE</div>
    <details class="ds-longdesc">
      <summary>Wiecej</summary>
      <div class="ds-longdesc-body">${getAgentLongPl(a.id)}</div>
    </details>
  </div>

  <!-- 4. KIM JEST + ANALOGIA -->
  <div class="ds-l">
    <div class="ds-l-hd">KIM JEST</div>
    <p class="ds-p">${escHtml(k.who || '')}</p>
    <div class="ds-l-hd" style="margin-top:6px">ANALOGIA</div>
    <p class="ds-p" style="font-style:italic">"${escHtml(k.analogy || '')}"</p>
  </div>

  <!-- 5. CO ROBI / CZEGO NIE ROBI twin + inline anti -->
  <div class="ds-twinchips">
    <div class="tw-col">
      <div class="tw-head">CO ROBI</div>
      ${(k.does || []).map(x => `<span class="ds-chip">+ ${escHtml(x)}</span>`).join('')}
    </div>
    <div class="tw-col">
      <div class="tw-head">CZEGO NIE ROBI</div>
      ${(k.doesNot || []).map(x => `<span class="ds-chip">- ${escHtml(x)}</span>`).join('')}
      ${(k.antiPatterns || []).map(x => `<span class="ds-anti-chip">! ${escHtml(x)}</span>`).join('')}
    </div>
  </div>

  <!-- 6. NARZEDZIA -->
  <div class="ds-l">
    <div class="ds-l-hd">NARZEDZIA</div>
    <div class="ds-chipset">${(a.tools || []).map(t => `<span class="ds-chip">${escHtml(t)}</span>`).join('')}</div>
  </div>

  <!-- 7. POLACZENIA (conditional) -->
  ${(inConns.length || outConns.length) ? `
  <div class="ds-l">
    <div class="ds-l-hd">POLACZENIA</div>
    ${inConns.length  ? `<div class="ds-conn">WEJSCIA: ${inConns.map(pillIn).join('')}</div>`  : ''}
    ${outConns.length ? `<div class="ds-conn">WYJSCIA: ${outConns.map(pillOut).join('')}</div>` : ''}
  </div>` : ''}

  <!-- 8. MODEL compact 3-chip -->
  <div class="ds-l">
    <div class="ds-mdl-row">
      <button class="ds-mdl-chip m-opus${a.m==='opus'?' active':''}"   onclick="zmienModel('${a.id}','opus')">Opus</button>
      <button class="ds-mdl-chip m-sonnet${a.m==='sonnet'?' active':''}" onclick="zmienModel('${a.id}','sonnet')">Sonnet</button>
      <button class="ds-mdl-chip m-haiku${a.m==='haiku'?' active':''}"  onclick="zmienModel('${a.id}','haiku')">Haiku</button>
    </div>
  </div>

  <!-- 9. PROMPT pill + icons -->
  <div class="ds-l ds-prompt-row">
    <button class="ds-cmd is-prompt" onclick="otworzMoPrompt('${a.id}')">
      <span class="chev">&gt;</span> Edytuj prompt
    </button>
    <div class="ds-prompt-icons">
      <button class="ds-icon-btn" title="Duplikuj" onclick="promptDup('${a.id}')">D</button>
      <button class="ds-icon-btn" title="Kopiuj"  onclick="promptCopy('${a.id}')">C</button>
      <button class="ds-icon-btn" title="Reset"   onclick="promptReset('${a.id}')">R</button>
    </div>
  </div>

  <!-- 10. ENCYKLOPEDIA rich CTA -->
  <button class="btn-learn is-rich" onclick="pokazEncyklopedie('${a.id}')">
    <span class="bl-icon">${svgAgenta(a)}</span>
    <span class="bl-text">
      <span class="bl-eyebrow">ENCYKLOPEDIA</span>
      <span class="bl-title">Poznaj tego agenta</span>
      <span class="bl-sub">Pelny profil, ${countAgentFacts(a.id)} sekcji wiedzy</span>
    </span>
    <span class="bl-arrow">&rarr;</span>
  </button>
</div>
```

---

## 3. pokazDef (palette variant, lines 5836-5850)

pokazDef renders a shorter variant when clicked from palette (before being added to canvas). Apply same sections EXCEPT: no POLACZENIA (no connections yet), no load mini-bar (no usage), no PROMPT edit (prompt is static in palette).

**Sections used:** 1 Hero (no load bar), 2 Verdict, 3 Kluczowe kompetencje, 4 Kim jest + Analogia, 5 Co/Nie robi, 6 Narzedzia, 8 Model (display only, no onclick), 10 Encyklopedia CTA.

**Sections skipped:** 1b load bar, 7 Polaczenia, 9 Prompt.

Estimated height: ~780px.

---

## 4. Helper calls assumed

- `phaseLabel(ph)` - returns "Strategia"/"Badania"/etc. (exists, check ~5421-5431)
- `modelLabel(m)` - returns "Opus"/"Sonnet"/"Haiku"
- `getAgentGreenPl(id)`, `getAgentRedPl(id)`, `getAgentLongPl(id)` - NEW in D1
- `countAgentFacts(id)` - NEW in D2 (near pokazWezel)
- `otworzMoPrompt(id)`, `promptDup/Copy/Reset/Save` - NEW in D2
- `pokazEncyklopedie(id)` - already exists for agents via renderBentoAgent
- `pillIn`, `pillOut` - inline pill renderers for connections list

---

## 5. Render order constraint

Hero MUST be first child of `.ds-card` so `position:sticky; top:0` anchors to scroll container top. All subsequent sections wrap in `.ds-l` so they scroll under the sticky hero.

---

## 6. Empty-state handling

- `POLACZENIA` hidden entirely if no in/out connections.
- `ANALOGIA` skipped if `k.analogy` empty.
- `CZEGO NIE ROBI` anti-patterns empty -> no amber chips rendered.
- `Kluczowe kompetencje` empty -> section hidden (fallback: use `getAgentDesc(id)` as 1-line).

---

## 7. Accessibility

- Hero `.ds-hero-title` is `<h3>` for screen reader structure.
- Longdesc `<details>` gives native keyboard expand.
- Prompt pill `<button>` with aria-label "Otworz edytor promptu".
- Model chips already `<button>`.
- Modal has `role="dialog" aria-modal="true" aria-labelledby`.
- Sticky hero has `z-index:2` so it does not obscure focus outlines of scrolled content (checked via SC 2.4.11 focus-not-obscured - CRITIC confirmed v32.8 already uses scroll-padding-block).
