# DESIGN SPEC: Neural Constellation
## Core Design Reference dla Agent Teams Configurator

> **Wersja**: v11.0 | **Plik referencyjny**: `AGENT_TEAMS_CONFIGURATOR_v11.html`
> **Cel**: Ten dokument jest kompletnym opisem designu "Neural Constellation" — jedynym zrodlem prawdy dla wszystkich przyszlych iteracji. Kazdy nowy agent/LLM tworzacy kolejna wersje MUSI uzyc tego pliku jako specyfikacji wizualnej.

---

## 1. FILOZOFIA DESIGNU

**Nazwa**: Neural Constellation (Gwiazdozbior Neuronowy)
**Motyw**: Ciemny kosmiczny — agenci AI to gwiazdy w konstelacjach, polaczone swietlistymi sciezkami. Orkiestrator jest najjasniejsza gwiazda w centrum.
**Nastroj**: Glebokosc, precyzja, spokoj kosmosu, subtelna energia
**Kluczowe slowa**: luminous glass, cosmic depth, breathing nodes, particle flow, mesh gradient, starfield

---

## 2. PALETA KOLOROW (CSS Custom Properties)

### 2.1 Tla (od najciemniejszego)
```css
--bg0: #06060A;   /* Glowne tlo body — prawie czarny z odcieniem niebieskiego */
--bg1: #0F0F18;   /* Panele (sidebar, topbar, statusbar) */
--bg2: #16162A;   /* Elementy interaktywne (przyciski, hover) */
--bg3: #1E1E3A;   /* Wzniesione elementy (tooltips, context menu) */
--bg4: #282850;   /* Najjasniejsze tlo (rzadko uzywane) */
```

### 2.2 Akcenty
```css
--accent1: #818CF8;  /* INDIGO — glowny akcent, polaczenia, glow, gwiazdki */
--accent2: #34D399;  /* EMERALD — sukces, Sonnet model, pozytywne */
--accent3: #FBBF24;  /* AMBER — ostrzezenie, Opus model, uwaga */
--accent4: #F87171;  /* RED — blad, destrukcja, QA, close */
```

### 2.3 Tekst
```css
--t1: #E4E4E7;  /* Tekst glowny — prawie bialy z szarym odcieniem */
--t2: #71717A;  /* Tekst pomocniczy — sredni szary */
--t3: #52525B;  /* Tekst wyciszony */
--t4: #3F3F46;  /* Tekst minimalny (placeholders) */
```

### 2.4 Specjalne
```css
--brd: rgba(129,140,248,0.15);              /* Obramowanie — indigo 15% */
--glass: rgba(15,15,30,0.8);                /* Glassmorphism — ciemny polprzezroczysty */
--glow: rgba(129,140,248,0.05);             /* Poswiatka — subtelna indigo */
--grad: linear-gradient(135deg, var(--accent1), var(--accent2));  /* Gradient indigo→emerald */
```

### 2.5 Aliasy modeli (kolory node'ow)
```css
/* Opus = amber/zloty */
rgba(251,191,36, 0.06)  /* tlo orba */
rgba(251,191,36, 0.15)  /* border node body */
rgba(251,191,36, 0.3)   /* border orba */
rgba(251,191,36, 0.4)   /* hover border */
rgba(251,191,36, 0.12)  /* hover glow */

/* Sonnet = emerald/zielony */
rgba(52,211,153, 0.06)  /* tlo */
rgba(52,211,153, 0.12)  /* border */
rgba(52,211,153, 0.25)  /* border orba */
rgba(52,211,153, 0.35)  /* hover border */
rgba(52,211,153, 0.12)  /* hover glow */

/* Haiku = indigo/fioletowy */
rgba(129,140,248, 0.06)  /* tlo */
rgba(129,140,248, 0.15)  /* border */
rgba(129,140,248, 0.3)   /* border orba */
rgba(129,140,248, 0.4)   /* hover border */
rgba(129,140,248, 0.12)  /* hover glow */

/* Research Critic / QA = red */
rgba(248,113,113, 0.04)  /* tlo */
rgba(248,113,113, 0.12)  /* border */
rgba(248,113,113, 0.25)  /* border orba */
rgba(248,113,113, 0.4)   /* hover border */
rgba(248,113,113, 0.12)  /* hover glow */

/* Syntetyk = violet */
rgba(167,139,250, 0.04)  /* tlo */
rgba(167,139,250, 0.12)  /* border */
rgba(167,139,250, 0.25)  /* border orba */
rgba(167,139,250, 0.4)   /* hover border */
rgba(167,139,250, 0.12)  /* hover glow */

/* Build agents = emerald (reuse Sonnet colors, klasa c-mu) */
```

### 2.6 Mapowanie kolorow na klasy CSS node'ow
```
.c-am  → Opus (amber)       — Orkiestrator
.c-vi  → Violet             — Syntetyk
.c-cy  → Indigo/Cyan        — Analityk, Planer, Haiku agents
.c-bl  → Blue               — Researcherow (Haiku)
.c-mu  → Emerald (muted)    — Build agents (Sonnet)
.c-ro  → Red                — QA agents, Research Critic
```

---

## 3. TYPOGRAFIA

### 3.1 Font Stack (Google Fonts CDN)
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### 3.2 Uzycie
```css
--hd: 'Space Grotesk', sans-serif;  /* Naglowki, tytuły, nazwy — waga 700-800 */
--bd: 'Inter', sans-serif;           /* Body, opisy, paragraf — waga 300-700 */
--mn: 'JetBrains Mono', monospace;   /* Dane, metryki, badge, etykiety — waga 400-600 */
```

### 3.3 Rozmiary i style
```
Top bar brand:     --hd, 13px, 700, gradient text
Node label:        --hd, 9px, 600
Node model badge:  --mn, 7px
Sidebar tab:       --hd, 10px, 600
Agent palette name: --hd, 10px, 600
Agent palette desc: --bd, 8px, kolor t2
Category header:   --mn, 8px, letter-spacing 0.12em, uppercase
Preset name:       --hd, 10px, 600
Preset count:      --mn, 9px
Button:            --hd, 10px, 600
Status bar:        --mn, 8px
Right panel header: --hd, 12px, 700, gradient text
Card title:        --hd, 12px, 700
Card body:         --bd, 10px
Tooltip:           --bd, 10px

Bento hero title:  --hd, 22px, 800
Bento metric num:  --hd, 48px, 800, letter-spacing -0.02em
Bento metric label: --mn, 9px, letter-spacing 0.1em, uppercase
Bento quote:       --hd, 15px, 700, italic
Bento banner h2:   --hd, 22px, 800, gradient text
Bento step title:  --hd, 12px, 700
Bento table th:    --mn, 8px, letter-spacing 0.08em, uppercase
```

### 3.4 Gradient text pattern
```css
background: linear-gradient(135deg, var(--accent1), var(--accent2));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## 4. TLO — WARSTWA PO WARSTWIE

### 4.1 Warstwa 0: Body base
```css
body {
  background: var(--bg0);  /* #06060A */
}
```

### 4.2 Warstwa 1: Mesh gradient (pseudo-element body::before)
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 60% 60% at 20% 50%, rgba(129,140,248,0.15) 0%, transparent 70%),
    radial-gradient(ellipse 50% 50% at 80% 20%, rgba(52,211,153,0.10) 0%, transparent 70%),
    radial-gradient(ellipse 45% 45% at 50% 80%, rgba(248,113,113,0.08) 0%, transparent 70%),
    var(--bg0);
}
```
**Opis**: 3 eliptyczne gradienty — indigo (lewy-srodek, 15%), emerald (prawy-gora, 10%), rose (dol-srodek, 8%) — tworzace subtelna mglawiice kosmiczna.

### 4.3 Warstwa 2: Floating Orbs (3 divy .bg-orb)
```html
<div class="bg-orb orb1"></div>
<div class="bg-orb orb2"></div>
<div class="bg-orb orb3"></div>
```
```css
.bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.12;
  animation: orbDrift infinite ease-in-out;
}
.bg-orb.orb1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #818CF8, transparent 70%);
  top: 10%; left: 5%;
  animation-duration: 22s;
}
.bg-orb.orb2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #34D399, transparent 70%);
  top: 5%; right: 15%;
  animation-duration: 28s;
  animation-delay: -7s;
}
.bg-orb.orb3 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, #F87171, transparent 70%);
  bottom: 10%; left: 40%;
  animation-duration: 25s;
  animation-delay: -12s;
}

@keyframes orbDrift {
  0%   { transform: translate(0, 0) scale(1) }
  25%  { transform: translate(30px, -40px) scale(1.06) }
  50%  { transform: translate(-20px, 30px) scale(0.95) }
  75%  { transform: translate(25px, 15px) scale(1.03) }
  100% { transform: translate(0, 0) scale(1) }
}
```
**Opis**: 3 duze, rozmazane kola (indigo 500px, emerald 400px, rose 350px) ktore wolno dryfuja po ekranie z roznym tempem. Tworza efekt zywego, oddychajacego tla.

### 4.4 Warstwa 3: Starfield (Canvas — GWIAZDKI!)
```html
<canvas id="starfield"></canvas>
```
```css
#starfield {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
```
```javascript
function initStarfield() {
  var canvas = document.getElementById('starfield');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var area = document.getElementById('cvA'); // canvas area container
  var stars = [];

  function resize() {
    canvas.width = area.offsetWidth;
    canvas.height = area.offsetHeight;
    initStars();
  }

  function initStars() {
    stars = [];
    var count = Math.floor((canvas.width * canvas.height) / 4000);
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,       // promien 0.3-1.5px
        a: Math.random() * 0.5 + 0.1,        // alpha bazowa 0.1-0.6
        speed: Math.random() * 0.003 + 0.001, // predkosc migotania
        phase: Math.random() * Math.PI * 2    // losowa faza
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(function(s) {
      var alpha = s.a + Math.sin(t * s.speed + s.phase) * 0.15;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(129,140,248,' + Math.max(0.05, alpha) + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
}
```
**Opis**: Canvas 2D rysujacy setki malych gwiazdek w kolorze indigo (rgba 129,140,248). Kazda gwiazda ma:
- Losowy promien (0.3-1.5px)
- Losowa jasnosc bazowa (0.1-0.6 alpha)
- Sinusoidalne migotanie z losowa predkoscia i faza
- Ilosc gwiazdek = area_pixeli / 4000 (np. 1920x1080 = ~518 gwiazdek)
- Reaguje na resize okna
- Kolor: WYLACZNIE indigo (#818CF8) z roznymi przezroczystosciami

### 4.5 Warstwa 4: Dot Grid (na canvasie roboczym)
```css
.cv-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: radial-gradient(circle, rgba(129,140,248,0.06) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.4;
}
```
**Opis**: Siatka kropek (dots) co 40px, indigo 6% opacity, overall opacity 40%. Subtelna pomoc do wyrownywania node'ow.

### 4.6 Kolejnosc warstw (z-index)
```
0: body::before (mesh gradient)
0: .bg-orb (floating orbs, position:fixed)
0: #starfield (canvas, position:absolute w cv-area)
0: .cv-grid (dot grid)
1: #svg (polaczenia SVG)
10: .nd (node'y)
15: .nd.sel (zaznaczony node)
20: .nd:active (przeciagany node)
50: .cv-ctrl, .zm-ctrl (kontrolki canvasu)
80: .learn-overlay (bento nauka)
100: .topbar, .statbar
200: tooltips, bento-close
1000: .mo (modale)
```

---

## 5. GLASSMORPHISM — WZORZEC

### 5.1 Standardowa karta/panel
```css
background: rgba(15, 15, 30, 0.8);        /* --glass */
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(129, 140, 248, 0.15); /* --brd */
border-radius: 14px;
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.03),  /* gorny highlight */
  0 0 30px rgba(129, 140, 248, 0.05);        /* zewnetrzna poswiatka */
```

### 5.2 Hover glow
```css
.element:hover {
  border-color: rgba(129, 140, 248, 0.35);
  box-shadow:
    0 0 0 1px rgba(129, 140, 248, 0.3),     /* pierscien */
    0 0 20px rgba(129, 140, 248, 0.15),      /* poswiatka */
    inset 0 1px 0 rgba(255, 255, 255, 0.05); /* gorny highlight */
}
```

### 5.3 Selected state
```css
.element.sel {
  border-color: var(--accent1);  /* #818CF8 pelny */
  box-shadow:
    0 0 0 1px var(--accent1),
    0 0 30px rgba(129, 140, 248, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

### 5.4 Wzmocniony glass (modal, bento banner)
```css
background: rgba(15, 15, 30, 0.6);
backdrop-filter: blur(30px);
border: 1px solid rgba(129, 140, 248, 0.15);
box-shadow:
  0 8px 32px rgba(0, 0, 0, 0.3),
  inset 0 1px 0 rgba(255, 255, 255, 0.04);
```

---

## 6. ANIMACJE

### 6.1 Node Breathing (kluczowa!)
```css
@keyframes nodeBreathe {
  0%, 100% { transform: scale(1) }
  50%      { transform: scale(1.015) }
}
.nd-body {
  animation: nodeBreathe 3s ease-in-out infinite;
}
/* WYLACZENIE dla zaznaczonych node'ow: */
.nd.sel .nd-body { animation: none; }
```

### 6.2 Orb Drift (floating background orbs)
```css
@keyframes orbDrift {
  0%   { transform: translate(0, 0) scale(1) }
  25%  { transform: translate(30px, -40px) scale(1.06) }
  50%  { transform: translate(-20px, 30px) scale(0.95) }
  75%  { transform: translate(25px, 15px) scale(1.03) }
  100% { transform: translate(0, 0) scale(1) }
}
/* Czasy: orb1=22s, orb2=28s (-7s delay), orb3=25s (-12s delay) */
```

### 6.3 Orb Float (learning overlay orbs)
```css
@keyframes orbFloat {
  0%   { transform: translate(0, 0) scale(1) }
  25%  { transform: translate(40px, -30px) scale(1.08) }
  50%  { transform: translate(-25px, 35px) scale(0.94) }
  75%  { transform: translate(20px, 20px) scale(1.04) }
  100% { transform: translate(-15px, -10px) scale(1.01) }
}
/* 22s infinite alternate, mix-blend-mode: screen */
```

### 6.4 Bento Card Entrance
```css
@keyframes bentoIn {
  from { opacity: 0; transform: scale(0.97) }
  to   { opacity: 1; transform: scale(1) }
}
/* 0.5s, cubic-bezier(0.4, 0, 0.2, 1) */

@keyframes cardIn {
  from { opacity: 0; transform: translateY(24px) scale(0.94) }
  to   { opacity: 1; transform: translateY(0) scale(1) }
}
/* 0.6s, staggered: delay = var(--i) * 0.08s */
```

### 6.5 Tooltip Fade
```css
@keyframes ttIn {
  from { opacity: 0; transform: translateX(-50%) translateY(4px) }
  to   { opacity: 1; transform: translateX(-50%) translateY(0) }
}
/* 0.15s ease */
```

### 6.6 Particle Animation na polaczeniach
```html
<circle r="3" fill="rgba(129,140,248,0.6)">
  <animateMotion dur="2.5s" repeatCount="indefinite" path="[bezier path]"/>
</circle>
```
**Opis**: Mala kulka (r=3) podazajaca po sciezce bezier z predkoscia 2.5s, nieskonczona petla. Kolor zalezy od typu polaczenia:
- `one` (jednokierunkowe): indigo rgba(129,140,248,0.6)
- `two` (dwukierunkowe): emerald rgba(52,211,153,0.6)
- `continuous` (ciagla petla): violet rgba(167,139,250,0.6)

### 6.7 Spring-like hover na kartach
```css
transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
/* Na hover: translateY(-4px) scale(1.01) */
```

### 6.8 Starfield migotanie
```javascript
// Sinusoidalne: alpha = base + sin(time * speed + phase) * 0.15
// speed: 0.001-0.004 (bardzo wolne)
// Wynik: gwiazdy migocza niezaleznie od siebie
```

---

## 7. LAYOUT — STRUKTURA HTML

### 7.1 Hierarchia
```
body
├── .bg-orb.orb1 (fixed)
├── .bg-orb.orb2 (fixed)
├── .bg-orb.orb3 (fixed)
└── .app (flex column, 100vh)
    ├── .topbar (46px, flex-shrink:0)
    │   ├── .tb-brand (ikona + nazwa + wersja)
    │   ├── .tb-sep (1px separator)
    │   ├── .tb-problem > textarea
    │   └── .tb-actions > buttons
    │
    ├── .workspace (flex:1, flex row)
    │   ├── .side-l (250px, flex-shrink:0)
    │   │   ├── .sl-tabs (3 tabs: Agenci, Presety, Zapisane)
    │   │   └── .sl-panels (absolute positioned, switching)
    │   │       ├── #panAg (.pa-search + #paL palette)
    │   │       ├── #panPr (#prL preset list)
    │   │       └── #panSv (save button + #svL list)
    │   │
    │   ├── .cv-area (flex:1) — CANVAS
    │   │   ├── canvas#starfield (warstwa 0 — gwiazdki!)
    │   │   ├── .cv-grid (warstwa 0 — dot grid)
    │   │   ├── .cv-container > .cv-transform (8000x6000)
    │   │   │   └── svg#svg (polaczenia + node hit areas)
    │   │   ├── .cv-info (top-left: "X agentow | Y polaczen")
    │   │   ├── .cv-ctrl (bottom-center: Polacz, Layout, Usun, Wyczysc)
    │   │   └── .zm-ctrl (bottom-right: +, %, -, reset)
    │   │
    │   ├── .side-r (300px, flex-shrink:0) — szczegoly
    │   │   ├── .sr-hdr > h3 "Szczegoly" (gradient text)
    │   │   └── .sr-scr (scrollable content)
    │   │
    │   └── .learn-overlay (absolute, z-index:80)
    │       ├── .bento-bg > .bento-orb x3
    │       ├── .bento-close (fixed, top-right)
    │       └── .bento-scroll
    │           ├── .bento-banner
    │           └── .bento-grid (4 kolumny, dense)
    │               └── .bento-card x N (rozne typy)
    │
    └── .statbar (26px, flex-shrink:0)
        └── .st x N (metryki: agenci, polaczenia, modele, koszt)
```

### 7.2 Rozmiary stalych
```
Top bar:    46px wysokosc
Status bar: 26px wysokosc
Left sidebar: 250px szerokosc (200px < 900px)
Right sidebar: 300px szerokosc (250px < 1100px, ukryty < 700px)
Canvas transform: 6000x6000px (lub 8000x6000)
Node min-width: 76px
Node orb: 38x38px
Grid: 40x40px dots
```

### 7.3 Responsive breakpoints
```css
@media (max-width: 1100px) { .side-r: 250px; bento-grid: 3 kolumny }
@media (max-width: 900px)  { .side-l: 200px; .side-r: 220px; bento-grid: 2 kolumny }
@media (max-width: 700px)  { .side-l, .side-r: ukryte; bento-grid: 1 kolumna }
```

---

## 8. NODE'Y — RENDERING

### 8.1 Struktura HTML node'a
```html
<div class="nd c-am" style="left:Xpx;top:Ypx" id="nID">
  <div class="nd-anc top"></div>
  <div class="nd-body">
    <div class="nd-orb">EMOJI</div>
    <div class="nd-lbl">Nazwa Agenta</div>
    <div class="nd-mdl b-op">OPUS</div>
    <div class="nd-load"><div class="nd-load-bar" style="width:50%;background:COLOR"></div></div>
  </div>
  <div class="nd-anc bot"></div>
</div>
```

### 8.2 Klasy kolorow node'ow (c-XX)
```
c-am — Opus/amber (Orkiestrator)
c-vi — Violet (Syntetyk)
c-cy — Cyan/Indigo (Analityk, Planer)
c-bl — Blue (Researcherzy)
c-mu — Emerald/muted (Build agents)
c-ro — Red (QA, Research Critic)
```

### 8.3 Anchory polaczen
```css
.nd-anc { 10px kolo, border-radius:50%, opacity:0, cursor:crosshair }
.nd:hover .nd-anc { opacity:1 }
.nd-anc.top { top:-5px, left:50%, translateX(-50%) }
.nd-anc.bot { bottom:-5px, left:50%, translateX(-50%) }
.nd-anc:hover { background:accent1, scale(1.4) }
```

---

## 9. POLACZENIA — SVG RENDERING

### 9.1 Typy polaczen
```
'one'        — jednokierunkowe, indigo, przerywana linia (6 4)
'two'        — dwukierunkowe, emerald, pelna linia + return path
'continuous' — ciagla petla, violet, przerywana linia
```

### 9.2 Rendering (kubiczne krzywe Beziera)
```javascript
// Punkty startowe i koncowe
var x1 = from.x + 36, y1 = from.y + 40;  // dol from-node
var x2 = to.x + 36,   y2 = to.y + 8;     // gora to-node
var dy = y2 - y1;

// Sciezka Beziera
var path = 'M' + x1 + ',' + y1 +
           ' C' + x1 + ',' + (y1 + dy*0.35) +
           ' '  + x2 + ',' + (y2 - dy*0.35) +
           ' '  + x2 + ',' + y2;
```

### 9.3 Kolory i markery
```javascript
// Kolory linii
var cs = {
  one:        'rgba(129,140,248,0.3)',   // indigo
  two:        'rgba(52,211,153,0.3)',     // emerald
  continuous: 'rgba(167,139,250,0.3)'    // violet
};

// Kolory markerow (strzalek)
var ds = {
  one:        'rgba(129,140,248,0.6)',
  two:        'rgba(52,211,153,0.6)',
  continuous: 'rgba(167,139,250,0.6)'
};

// SVG markers (strzalki na koncu)
<marker markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
  <path d="M0,0 L8,3 L0,6" fill="KOLOR"/>
</marker>
```

### 9.4 Animowane czasteczki
```html
<circle r="3" fill="KOLOR">
  <animateMotion dur="2.5s" repeatCount="indefinite" path="BEZIER_PATH"/>
</circle>
```

### 9.5 Hit area (klikalne polaczenia)
```html
<path class="hit" d="PATH" fill="none" stroke="transparent" stroke-width="14"
      onclick="cycC('ID')"/>
<!-- Klik cykluje typ: one → two → continuous → one -->
```

---

## 10. BENTO LEARNING OVERLAY

### 10.1 Tlo
- 3 orby (.bento-orb) z blur(100px), mix-blend-mode:screen, opacity 0.10
- Noise texture overlay (SVG fractalNoise, opacity 0.03)

### 10.2 Typy kart bento
```
.bento-hero      (2x2) — duza karta z ikona, tytulem, opisem
.bento-metric    (1x1) — ikona + duza liczba + label
.bento-quote     (2x1) — cytat z gradient left border
.bento-info      (1x2) — lista key-value z ikonami
.bento-tags      (1x1) — chmura tagow/technologii
.bento-diagram   (2x1) — flow diagram z ikonami i strzalkami
.bento-steps     (2x2) — numerowane kroki z linia laczaca
.bento-table     (2x2) — tabela porownawcza
.bento-callout   (*)   — tip/warn/danger z ikona
.bento-hier      (4x1) — hierarchia 5 kategorii
```

### 10.3 Staggered animation
```css
.bento-card:nth-child(N) { --i: N-1 }
animation-delay: calc(var(--i, 0) * 0.08s);
```

### 10.4 Grid
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: dense;
  gap: 14px;
}
```

---

## 11. SCROLLBAR

```css
::-webkit-scrollbar { width: 5px }
::-webkit-scrollbar-track { background: transparent }
::-webkit-scrollbar-thumb { background: rgba(129,140,248,0.15); border-radius: 3px }
::-webkit-scrollbar-thumb:hover { background: rgba(129,140,248,0.25) }
::selection { background: rgba(129,140,248,0.25) }
```

---

## 12. TOOLTIP SYSTEM

```css
.tt {
  position: relative;
  border-bottom: 1px dotted var(--accent1);
  cursor: help;
  color: var(--accent1);
}
.tt:hover::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg3);
  color: var(--t1);
  font-family: var(--bd);
  font-size: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--brd);
  box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 15px rgba(129,140,248,0.08);
  max-width: 280px;
  z-index: 200;
  animation: ttIn 0.15s ease;
}
```

---

## 13. PRZYCISKI — WARIANTY

```css
/* Domyslny */
.btn { bg:bg2, border:brd, color:t2, radius:8px, hd 10px 600 }
.btn:hover { bg:bg3, color:t1, glow ring }

/* Primary (indigo-emerald gradient) */
.btn-p { bg: gradient(accent1 12%, accent2 8%), border: accent1 30%, color: accent1 }

/* Destructive (red) */
.btn-d { border: accent4 20%, color: accent4 }

/* Accent (amber) */
.btn-a { border: accent3 20%, color: accent3 }
```

---

## 14. MODAL SYSTEM

```css
.mo {
  position: fixed; inset: 0;
  background: rgba(6,6,10,0.88);
  backdrop-filter: blur(8px);
  z-index: 1000;
}
.mo-box {
  max-width: 800px; max-height: 85vh;
  background: var(--bg1);
  border: 1px solid var(--brd);
  border-radius: 16px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(129,140,248,0.08);
}
```

---

## 15. STATUS BAR

```css
.statbar {
  height: 26px;
  background: var(--bg1);
  border-top: 1px solid var(--brd);
}
/* Gradient line na gorze: */
.statbar::before {
  background: var(--grad); /* indigo→emerald */
  opacity: 0.15;
}
/* Pill metryka: */
.st { --mn 8px, color:t2, border-right:1px solid brd }
.st-v { color:t1, font-weight:500 }
/* Model dots: */
.st-d { 5x5px circle }
.st-op { bg: accent3 (amber) }
.st-so { bg: accent2 (emerald) }
.st-ha { bg: accent1 (indigo) }
```

---

## 16. DANE APLIKACJI — STRESZCZENIE

### 16.1 Agenci (AD array) — 22 agentow
```
STRATEGIA (2):   orchestrator [opus], synthesizer [sonnet]
PLANOWANIE (2):  analyst [sonnet], planner [sonnet]
RESEARCH (8):    res_tech [haiku], res_ux [haiku], res_reddit [haiku],
                 res_x [haiku], res_github [haiku], res_forums [haiku],
                 res_docs [haiku], res_critic [sonnet]
BUILD (6):       backend [sonnet], frontend [sonnet], feature [sonnet],
                 designer [sonnet], integrator [sonnet], writer [sonnet]
QA/AUDYT (4):    qa_security [haiku], qa_quality [haiku],
                 qa_perf [haiku], qa_manager [sonnet]
```

### 16.2 Presety (PM object) — 27 presetow
```
MICRO (2-3):     solo(2), quick_fix(3), recon(3), trio(3), reflect(3)
MALE (4-5):      bug_hunt(4), content(4), plan_exec(4), perf_boost(4),
                 startup(5), cascade(5), test_suite(5), a11y(5)
SREDNIE (6-8):   security(6), review(6), design_sys(6), api_modern(6),
                 ui_overhaul(7), feature_sprint(7), standard(8), data_pipe(8)
DUZE (9-12):     research(9), legacy(9), saas(10), microservices(11)
ENTERPRISE (13+): full(13), deep(18)
```

### 16.3 Dodatkowe struktury danych
- **PR** — pozycje node'ow na canvasie per preset {d, x, y}
- **PC** — polaczenia per preset [from_idx, to_idx, type]
- **PM** — metadane (nazwa, ikona, liczba agentow, opis, use case, pros, cons, tokeny, koszt, pattern)
- **PDESC** — krotkie opisy presetow
- **PLEARN** — pelna tresc edukacyjna (architektura, przeplyw, insight, anti-pattern)
- **ALEARN** — szczegolowy opis kazdego agenta (narzedzia, interakcje, best practices)
- **GLOSSARY** — definicje terminow technicznych (tooltip data-tip)
- **MH** — naglowki modeli (model header z cenami)

---

## 17. INTERAKCJE — PODSUMOWANIE

| Akcja | Opis |
|-------|------|
| Drag z palette | Przeciagnij agenta z lewego sidebara na canvas |
| Click node | Zaznacz, pokaz szczegoly w right panel |
| Shift+click | Multi-select |
| Click preset | Zaladuj konfiguracje (node'y + polaczenia) |
| Anchor drag | Kliknij anchor (kolo u gory/dolu node'a) zeby polaczyc |
| Click polaczenie | Cykluj typ: one → two → continuous |
| Scroll wheel | Zoom (0.15x - 3x) |
| Alt+drag | Pan canvas |
| Delete/Backspace | Usun zaznaczone |
| Tryb nauki | Pokaz bento overlay z edukacja o presecie |
| Zapisz | localStorage |
| Export | JSON download |
| Import | JSON upload |
| Final Prompt | Generuj pelny prompt z konfiguracji |

---

## 18. CHECKLIST DLA PRZYSZLYCH ITERACJI

Przed wypuszczeniem nowej wersji sprawdz:

- [ ] Czy tlo ma 4 warstwy: mesh gradient + orby + starfield + dot grid?
- [ ] Czy node'y maja animacje breathing (scale 1→1.015)?
- [ ] Czy polaczenia maja animated particles (circle + animateMotion)?
- [ ] Czy glassmorphism uzywa rgba(15,15,30,0.8) + blur(20px)?
- [ ] Czy gradient text uzywa accent1→accent2 (indigo→emerald)?
- [ ] Czy hover glow uzywa ring + poswiatki indigo?
- [ ] Czy bento overlay ma 3 orby + noise texture?
- [ ] Czy karty bento maja staggered entrance (--i * 0.08s)?
- [ ] Czy fonty to Space Grotesk + Inter + JetBrains Mono?
- [ ] Czy scrollbar jest 5px, indigo thumb?
- [ ] Czy status bar ma gradient line na gorze?
- [ ] Czy modele maja poprawne kolory (Opus=amber, Sonnet=emerald, Haiku=indigo)?
- [ ] Czy wszystkie 22 agentow sa obecne?
- [ ] Czy wszystkie 27 presetow sa obecne z poprawnymi polaczeniami?
- [ ] Czy interfejs jest po polsku?

---

## 19. BORDER-RADIUS REFERENCE

```
Node body:     14px
Node orb:      10px
Buttons:       8px
Search input:  8px
Sidebar item:  0 (border-left 2px)
Cards (right): 12px
Bento cards:   16px
Bento banner:  20px
Tags:          20px (pill)
Modal:         16px
Tooltips:      8px
Model badge:   3px
Status dots:   50% (circle)
Scrollbar:     3px
```

---

*Koniec specyfikacji. Uzywaj tego pliku jako jedynego zrodla prawdy dla designu Neural Constellation.*
