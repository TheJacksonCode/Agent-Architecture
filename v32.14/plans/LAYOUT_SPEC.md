# LAYOUT_SPEC.md - v32.14 Bento Layout Mockups

Author: Main thread (Phase C)
Date: 2026-04-10
Scope: ASCII + HTML mockups for the new 10-section bento, class names,
per-breakpoint reflow, DOM tree for rysujBentoAgentaV14.

---

## 1. Target DOM tree for new renderer

```
<div class="learn-overlay show">
  <div class="bento-bg">...</div>
  <div class="bento-orb orb1"></div>
  <div class="bento-orb orb2"></div>
  <div class="bento-orb orb3"></div>

  <button class="bento-close">X</button>
  <div class="learn-nav">prev / counter / next</div>

  <div class="bento-scroll">                    <-- container query host
    <div class="enc-progress"></div>             <-- reading progress bar

    <div class="bento-banner">                   <-- existing banner reused
      <div class="bento-banner-icon">...</div>
      <div class="bento-banner-text">
        <h2>[Agent name]</h2>
        <p>[category label]</p>
      </div>
      <div class="bento-banner-badge">[phase]</div>
    </div>

    <div class="bento-grid">                     <-- grid track (max 1680)
      <!-- Row 1 -->
      <div class="bento-card bento-4x1 enc-tile enc-hero" style="--i:0; grid-row: span 2;">
        <!-- HERO content, spans 2 rows -->
      </div>

      <!-- Row 3 -->
      <div class="bento-card bento-4x1 enc-tile enc-why" style="--i:1;">
        <!-- DLACZEGO content -->
      </div>

      <!-- Row 4 -->
      <div class="bento-card bento-2x1 enc-tile enc-how" style="--i:2;">
        <!-- JAK PRACUJE -->
      </div>
      <div class="bento-card bento-2x1 enc-tile enc-meta" style="--i:3;">
        <!-- META -->
      </div>

      <!-- Row 5 -->
      <div class="bento-card bento-1x1 enc-tile enc-do accent-green" style="--i:4;">
        <!-- CO UMIEM -->
      </div>
      <div class="bento-card bento-1x1 enc-tile enc-dont accent-red" style="--i:5;">
        <!-- CZEGO NIE -->
      </div>
      <div class="bento-card bento-2x1 enc-tile enc-example" style="--i:6;">
        <!-- PRZYKLAD -->
      </div>

      <!-- Row 6 -->
      <div class="bento-card bento-2x1 enc-tile enc-anti accent-amber" style="--i:7;">
        <!-- KIEDY ZAWODZE -->
      </div>
      <div class="bento-card bento-2x1 enc-tile enc-facts accent-violet" style="--i:8;">
        <!-- CIEKAWOSTKI -->
      </div>

      <!-- Row 7 -->
      <details class="bento-card bento-4x1 enc-tile enc-deep" style="--i:9;">
        <summary>Zanurkuj glebiej (techniczne szczegoly)</summary>
        <div class="enc-deep-body">
          <button class="enc-infographic-thumb"
                  onclick="otworzZoom(AGENT_MEDIA['${aid}'].infographic, ...)">
            <img src="${AGENT_MEDIA[aid].infographic}" alt="Infografika">
            <span class="enc-zoom-hint">Kliknij aby powiekszyc</span>
          </button>
          <button class="enc-dl-btn"
                  onclick="window.open(AGENT_MEDIA['${aid}'].presentationPath)">
            Otworz prezentacje PDF
          </button>
          <div class="enc-prompt-block">...</div>
          <div class="enc-hierarchy-block">...kartaHierarchii(cat)...</div>
          <table class="bento-table">...model comparison...</table>
        </div>
      </details>
    </div>

    <button class="enc-next" onclick="encyklNastepny()">
      <div class="enc-next-icon">${svgAgenta(nextAid, 28)}</div>
      <div>
        <div class="enc-next-kicker">NASTEPNY AGENT</div>
        <div class="enc-next-name">${getAgentName(nextAid)}</div>
      </div>
      <div class="enc-next-arrow">></div>
    </button>
  </div>
</div>

<!-- ZOOM MODAL (sibling to learn-overlay, hidden by default) -->
<div id="moZoom" class="mo-zoom" hidden ...>
  ... R4 shell ...
</div>
```

---

## 2. ASCII bento layout at each breakpoint

### 2.1 FHD desktop 1920 (container ~1660, 4 cols)

```
+------+------+------+------+  <- reading progress bar
|                           |
|         1 HERO            |  <- bento-4x1 span 2 rows
|   (icon + name + quote)   |
|                           |
+---------------------------+
|       2 DLACZEGO JA       |  <- bento-4x1
+---------------------------+
|   3 JAK PRACUJE   |   4 META     |  <- bento-2x1 + bento-2x1
+---------------------------+
| 5 DO  | 6 DONT |  7 PRZYKLAD  |  <- 1x1 + 1x1 + 2x1
+---------------------------+
|  8 KIEDY ZAWODZE  | 9 CIEKAWOSTKI |  <- 2x1 + 2x1
+---------------------------+
|        10 ZANURKUJ          |  <- bento-4x1 (collapsed)
+---------------------------+
|      NASTEPNY AGENT        |  <- full width
+---------------------------+
```

### 2.2 QHD 2560 (container ~2300, 5 cols, cap 2100)

```
+--+--+--+--+--+
|              |
|   1 HERO (span 4? see rule)  |
|              |
+--------------+
| 2 DLACZEGO (span 5 / full)  |
+--------------+
| 3 HOW  | 4 META | ... ? |
+--------------+
```

**Reality check**: on 5 cols, `.bento-4x1` maps to `grid-column: 1 / -1`
which fills the full 5-col width. `.bento-2x1` takes 2/5 = 40%. `.bento-1x1`
takes 20%. Row 5 with 2 "1x1" and a "2x1" is 1+1+2=4 cols, leaving 1 col
gap. `grid-auto-flow: dense` fills it naturally.

### 2.3 Ultrawide 3440 (container ~3180, 6 cols, cap 2400)

Same pattern, spans interpret cleanly at 6 cols. Row 5 uses 1+1+2=4 of 6
cols, dense flow picks up next tile. Works.

### 2.4 Laptop 1366 (container ~1106, 3 cols)

```
+---+---+---+
|           |
|  1 HERO   |  <- bento-4x1 span 2 rows
|           |
+-----------+
| 2 DLACZEGO |
+-----------+
|   3 HOW    |  <- bento-2x1 = span 2 of 3 = 2/3 width
+---+-------+
| 4 META    |  <- next row, bento-2x1 = 2/3 width
+---+---+---+
| 5 | 6 | 7 |  <- 1+1+2=4, wraps -> 5,6 in row, 7 next row
+---+---+---+
| 7 PRZYKLAD (span 2) |
+---+---+---+
| 8 ANTI (span 2) |
+---+---+---+
| 9 FACTS (span 2) |
+-----------+
| 10 DEEP   |
+-----------+
```

Dense flow is crucial here. Accept some empty cells.

### 2.5 Tablet 834 (container ~770, 2 cols)

```
+------+------+
|             |
|   1 HERO    |  <- full (span 2)
|             |
+-------------+
| 2 DLACZEGO  |
+-------------+
| 3 HOW | 4 META |  <- 2 cols
+-------------+
| 5 DO  | 6 DONT |
+-------------+
| 7 PRZYKLAD (full) |
+-------------+
| 8 ANTI (full) |
+-------------+
| 9 FACTS (full) |
+-------------+
| 10 DEEP (full) |
+-------------+
```

### 2.6 Phone 390 (1 col)

Everything stacks. Hero has min-height: 260px. All sections full width.
No 2-col rows. Dense flow irrelevant. Reading progress bar stays.

---

## 3. Class emission reference

What `rysujBentoAgentaV14` must emit per tile:

| Section       | Classes                                           | --i |
|---------------|---------------------------------------------------|-----|
| HERO          | bento-card bento-4x1 enc-tile enc-hero + row-span | 0   |
| DLACZEGO      | bento-card bento-4x1 enc-tile enc-why             | 1   |
| HOW           | bento-card bento-2x1 enc-tile enc-how             | 2   |
| META          | bento-card bento-2x1 enc-tile enc-meta            | 3   |
| DO            | bento-card bento-1x1 enc-tile enc-do accent-green | 4   |
| DONT          | bento-card bento-1x1 enc-tile enc-dont accent-red | 5   |
| PRZYKLAD      | bento-card bento-2x1 enc-tile enc-example         | 6   |
| ANTI          | bento-card bento-2x1 enc-tile enc-anti accent-amber | 7 |
| CIEKAWOSTKI   | bento-card bento-2x1 enc-tile enc-facts accent-violet | 8 |
| DEEP (details)| bento-card bento-4x1 enc-tile enc-deep            | 9   |

The HERO tile needs an inline `style="grid-row: span 2;"` to double its
height at 4-col and 5-col breakpoints.

---

## 4. Section rendering pseudocode

### 4.1 HERO

```js
const hero = `
  <div class="bento-card bento-4x1 enc-tile enc-hero" style="--i:0; grid-row: span 2;">
    <div class="enc-hero-top">
      <div class="enc-hero-icon">${svgAgenta(aid, 56)}</div>
      <div>
        <div class="enc-hero-tagline">${esc(edu.tagline)}</div>
        <div class="enc-hero-name">${esc(getAgentName(aid))}</div>
      </div>
    </div>
    <p class="enc-hero-mission">${esc(edu.missionShort)}</p>
    <blockquote class="enc-hero-quote">"${esc(edu.analogy)}"</blockquote>
  </div>
`;
```

### 4.2 DLACZEGO

```js
const why = `
  <div class="bento-card bento-4x1 enc-tile enc-why" style="--i:1;">
    ${kicker('2', 'DLACZEGO JA')}
    <h3 class="enc-section-title">${esc(edu.whoIs)}</h3>
    <ul class="enc-benefit-list">
      ${edu.bestFor.slice(0,3).map((b,i)=>`
        <li class="enc-benefit-item">
          <div class="enc-benefit-icon">${i+1}</div>
          <div class="enc-benefit-text">${esc(b)}</div>
        </li>
      `).join('')}
    </ul>
  </div>
`;
```

### 4.3 HOW

```js
const how = `
  <div class="bento-card bento-2x1 enc-tile enc-how" style="--i:2;">
    ${kicker('3', 'JAK PRACUJE')}
    <div class="enc-flow">
      ${edu.howItWorks.slice(0,4).map((s,i)=>`
        <div class="enc-flow-step">
          <div class="enc-flow-num">${i+1}</div>
          <div>
            <div class="enc-flow-label">${esc(s.label || s)}</div>
            ${s.desc ? `<div class="enc-flow-desc">${esc(s.desc)}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
`;
```

### 4.4 META

```js
const meta = `
  <div class="bento-card bento-2x1 enc-tile enc-meta" style="--i:3;">
    ${kicker('4', 'META')}
    <div class="enc-meta-grid">
      <div class="enc-meta-row">
        <span class="enc-meta-label">Model</span>
        <span class="enc-meta-pill">${getModelLabel(d.model)}</span>
      </div>
      <div class="enc-meta-row">
        <span class="enc-meta-label">Faza</span>
        <span class="enc-meta-value">${getPhaseLabel(d.phase)}</span>
      </div>
      <div class="enc-meta-row">
        <span class="enc-meta-label">Koszt/wywolanie</span>
        <span class="enc-meta-value">${fmtCost(calcAgentCost(aid))}</span>
      </div>
      <div class="enc-meta-row">
        <span class="enc-meta-label">Kontekst</span>
        <span class="enc-meta-value">${ctxPct}%</span>
      </div>
      <div class="enc-meta-row">
        <span class="enc-meta-label">Narzedzia</span>
        <span class="enc-meta-value">${d.tools.length}</span>
      </div>
      ${edu.stats.slice(0,3).map(s=>`
        <div class="enc-meta-row">
          <span class="enc-meta-label">${esc(s.label)}</span>
          <span class="enc-meta-value">${esc(s.value)}</span>
        </div>
      `).join('')}
    </div>
  </div>
`;
```

### 4.5 DO / DONT

Reuse existing `.bento-do-list` / `.bento-dont-list` markup and content
from v32.13 but swap data source to `edu.does` / `edu.doesNotDo`.

```js
const doList = `
  <div class="bento-card bento-1x1 enc-tile enc-do accent-green" style="--i:4;">
    ${kicker('5', 'CO UMIEM')}
    <ul class="bento-do-list">
      ${edu.does.slice(0,8).map(x=>`<li>${esc(x)}</li>`).join('')}
    </ul>
  </div>
`;
const dontList = `
  <div class="bento-card bento-1x1 enc-tile enc-dont accent-red" style="--i:5;">
    ${kicker('6', 'CZEGO NIE')}
    <ul class="bento-dont-list">
      ${edu.doesNotDo.slice(0,8).map(x=>`<li>${esc(x)}</li>`).join('')}
    </ul>
  </div>
`;
```

### 4.6 PRZYKLAD

```js
const example = `
  <div class="bento-card bento-2x1 enc-tile enc-example" style="--i:6;">
    ${kicker('7', 'PRZYKLAD Z ZYCIA')}
    <p class="enc-example-body">${esc(edu.realExample)}</p>
  </div>
`;
```

### 4.7 ANTI / FACTS

```js
const anti = `
  <div class="bento-card bento-2x1 enc-tile enc-anti accent-amber" style="--i:7;">
    ${kicker('8', 'KIEDY ZAWODZE')}
    <ul class="bento-anti-list">
      ${edu.antiPatterns.slice(0,5).map(x=>`<li>${esc(x)}</li>`).join('')}
    </ul>
  </div>
`;
const facts = `
  <div class="bento-card bento-2x1 enc-tile enc-facts accent-violet" style="--i:8;">
    ${kicker('9', 'CIEKAWOSTKI')}
    <ul class="bento-facts-list">
      ${(kn.facts || []).slice(0,5).map(x=>`<li>${esc(x)}</li>`).join('')}
    </ul>
    <blockquote class="enc-hero-quote" style="margin-top:12px;">
      "${esc(edu.learningQuote)}"
    </blockquote>
  </div>
`;
```

### 4.8 DEEP DIVE

```js
const media = AGENT_MEDIA[aid] || {};
const deep = `
  <details class="bento-card bento-4x1 enc-tile enc-deep" style="--i:9;">
    <summary>${kickerInline('10', 'ZANURKUJ')} Techniczne szczegoly</summary>
    <div class="enc-deep-body">
      ${media.infographic ? `
        <button class="enc-infographic-thumb"
                onclick="otworzZoom(AGENT_MEDIA['${aid}'].infographic, 'Infografika: ${esc(getAgentName(aid))}')">
          <img src="${media.infographic}" alt="Infografika: ${esc(getAgentName(aid))}">
          <span class="enc-zoom-hint">Kliknij aby powiekszyc</span>
        </button>
      ` : ''}
      ${media.presentationPath ? `
        <button class="enc-dl-btn" onclick="window.open('${media.presentationPath}')">
          Otworz prezentacje PDF (nowe okno)
        </button>
      ` : ''}
      <div class="enc-prompt-block">
        <h4>System prompt</h4>
        <pre class="enc-prompt">${esc(getAgentPrompt(aid))}</pre>
      </div>
      <div class="enc-hierarchy-block">
        <h4>Miejsce w architekturze</h4>
        ${kartaHierarchii(d.cat)}
      </div>
      <table class="bento-table">
        ... model comparison table (same as v32.13) ...
      </table>
    </div>
  </details>
`;
```

### 4.9 NASTEPNY AGENT

```js
const pilots = ['res_reddit','res_x','res_github','res_forums'];
const idx = pilots.indexOf(aid);
const nextAid = pilots[(idx + 1) % pilots.length];
const next = `
  <button class="enc-next" onclick="encyklNastepny()">
    <div class="enc-next-icon">${svgAgenta(nextAid, 32)}</div>
    <div>
      <div class="enc-next-kicker">NASTEPNY AGENT</div>
      <div class="enc-next-name">${esc(getAgentName(nextAid))}</div>
    </div>
    <div class="enc-next-arrow">&rarr;</div>
  </button>
`;
```

---

## 5. Helper functions to add in Phase D

```js
function kicker(num, label){
  return `
    <div class="enc-section-kicker">
      <span class="enc-section-kicker-num">${num}</span>
      ${label}
    </div>
  `;
}
function kickerInline(num, label){
  return `
    <span class="enc-section-kicker" style="margin-right:12px;">
      <span class="enc-section-kicker-num">${num}</span>
      ${label}
    </span>
  `;
}
function cleanDia(s){
  // Phase D diacritic cleanup (DD15)
  if (typeof s !== 'string') return s;
  const map = {
    'a':'a','c':'c','e':'e','l':'l','n':'n','o':'o','s':'s','z':'z','z':'z',
    'A':'A','C':'C','E':'E','L':'L','N':'N','O':'O','S':'S','Z':'Z','Z':'Z'
  };
  return s
    .replace(/[acelnoszzACELNOSZZ]/g, c => map[c] || c)
    .replace(/&gt;/g, '-').replace(/&lt;/g, '-').replace(/&amp;/g, ' and ')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"');
}
function esc(s){ return String(s).replace(/[<>&"']/g, c => ({
  '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'
}[c])); }
```

Note: `cleanDia` runs at AGENT_EDU_PL injection time in Phase D, not at
runtime. The JS constant lands already-clean. `esc` is the existing XSS
escape helper from v32.8.

---

## 6. rysujBentoAgentaV14 skeleton

```js
function rysujBentoAgentaV14(aid){
  const d   = AD_MAP.get(aid);
  const edu = AGENT_EDU_PL[aid];
  const kn  = AGENT_KNOWLEDGE[aid] || {};
  if (!d || !edu){
    return rysujBentoAgentaLegacy(aid);
  }
  const media = AGENT_MEDIA[aid] || {};

  // Header stays the same as legacy
  let h = `
    <div class="enc-progress"></div>
    <div class="bento-banner">
      <div class="bento-banner-icon">${svgAgenta(aid, 44)}</div>
      <div class="bento-banner-text">
        <h2>${esc(getAgentName(aid))}</h2>
        <p>${esc(getCatLabel(d.cat))}</p>
      </div>
      <div class="bento-banner-badge">${getPhaseLabel(d.phase)}</div>
    </div>
    <div class="bento-grid">
      ${hero}
      ${why}
      ${how}
      ${meta}
      ${doList}
      ${dontList}
      ${example}
      ${anti}
      ${facts}
      ${deep}
    </div>
    ${next}
  `;
  G('loBody').innerHTML = h;
  G('loBody').scrollTop = 0;
  // Wire progress bar fallback + reveal observer + glossary tooltips
  wireBentoReveal();
  wireEncProgress();
  wireEncGlossary();
  return h;
}
```

---

## 7. Diff footprint estimate

- **HTML shell**: +16 lines (`#moZoom` modal shell)
- **CSS**: +595 lines (see DESIGN_SPEC section 9), -11 lines (old grid queries)
- **JS**:
  - AGENT_EDU_PL constant: +400 lines (4 agents, 18 fields each, multi-line strings)
  - AGENT_MEDIA constant: +4 lines per agent x 4 = +20 lines + the ~3.5MB base64
    string payload (on 4 very long lines)
  - rysujBentoAgentaV14 function: +220 lines
  - Zoom modal functions: +230 lines (R4)
  - Helper functions (kicker, cleanDia, wireBentoReveal, wireEncProgress,
    wireEncGlossary): +70 lines
  - Version bumps + localStorage migration: +3 lines

Total file growth: ~+1540 source lines + ~3.5MB inline base64.
From 7820 lines (836KB) -> ~9360 lines (~4.3MB).

---

## 8. Legacy rendering path preservation

`rysujBentoAgentaLegacy` = current `rysujBentoAgenta` with no changes
except the name. The wrapper:

```js
function rysujBentoAgenta(aid){
  if (typeof AGENT_EDU_PL !== 'undefined' && AGENT_EDU_PL[aid]){
    return rysujBentoAgentaV14(aid);
  }
  return rysujBentoAgentaLegacy(aid);
}
```

Zero risk for the 31 non-pilot agents. They keep hitting the legacy path.

---

## 9. Open items delegated to Phase D

- Finalize the 15-term glossary list for `wireEncGlossary`
- Pick the "realExample" string per agent (R2 provides candidates)
- Optimize 4 infographics if any exceeds 700KB raw (use built-in OS image
  tools or an `imagemin` CLI pre-pass)
- Base64 encoding: Phase D uses a helper script to read each jpg and emit
  the data URI directly into the AGENT_MEDIA literal

End of LAYOUT_SPEC.
