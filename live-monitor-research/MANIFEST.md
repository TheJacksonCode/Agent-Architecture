# MANIFEST.md -- Live Monitor Mode
## Single Source of Truth dla Agent Teams Configurator v22

**Autor:** Syntetyk [OPUS] | Deep Five Minds Protocol
**Data:** 2026-04-04
**Zrodla:** 7 raportow researcherskich (Tech, UX, GitHub, Reddit/Community, Forum, X/Trends, Critic)
**Cel:** Implementowalna specyfikacja Live Monitor Mode

---

## 1. Decyzje Architektoniczne

### 1.1 Rendering -- architektura hybrydowa (KONSENSUS: Tech + Forum + UX)

| Warstwa | Technologia | Zastosowanie | Uzasadnienie |
|---------|-------------|--------------|--------------|
| **Particle effects, data stream** | Canvas 2D + rAF | Starfield, particle burst, ambient effects, matrix rain | 60 FPS przy 5000+ obiektow, juz w v21 (`dataStreamCanvas`) |
| **Agent node animations** | WAAPI (`element.animate()`) | Pulse, scale, fade, status transitions | Compositor thread GPU, nie blokuje main thread, Chrome 36+/FF 48+/Safari 13.1+ |
| **Connections & flow** | SVG inline | Data packets, flow direction, glow rings, energy lines | Wektorowe, klikalne, CSS-animowalne, juz w v21 (`#svg`, `rConn()`) |
| **UI chrome (metryki, karty, panele)** | CSS transitions + keyframes | Glassmorphism panels, counters, progress bars, phase timeline | Zero JS overhead, GPU-accelerated (transform/opacity) |

**ODRZUCONE:**
- CSS Houdini (Paint/Animation Worklet) -- brak wsparcia Firefox/Safari, wymaga osobnego worklet file
- Mermaid.js -- ~2-3MB payload, lamie single-file philosophy
- D3.js -- redundancja z istniejacym systemem pozycjonowania v21
- WebGL/WebGPU -- overengineering dla naszego scope

### 1.2 Fullscreen -- dual approach (KONSENSUS: Tech + UX + Forum)

| Priorytet | Mechanizm | Implementacja |
|-----------|-----------|---------------|
| **PRIMARY** | CSS fixed overlay | `position: fixed; inset: 0; z-index: 9999` -- jak Mission Control v18 |
| **ENHANCEMENT** | View Transitions API | `document.startViewTransition(() => showMonitorOverlay())` z fallback na instant |
| **OPTIONAL BONUS** | Fullscreen API | Przycisk "True Fullscreen" -- `el.requestFullscreen()`, wymaga user gesture |

```javascript
// Pseudokod
function openLiveMonitor() {
  if (document.startViewTransition) {
    document.startViewTransition(() => showMonitorOverlay());
  } else {
    showMonitorOverlay(); // instant fallback
  }
}
```

**Transition sequence (Morphing Station Lock):**
1. Sidebary sliduja na boki -- `transform: translateX(-100%/+100%)`, 300ms ease-out
2. Canvas blur + dim -- `filter: blur(8px); opacity: 0.3`, 200ms (rownolegly)
3. Monitor overlay wjezdza -- `translateY(100%)` -> `translateY(0)`, 400ms `cubic-bezier(0.16, 1, 0.3, 1)`
4. Agent nodes w monitorze pojawiaja sie staggered -- 50ms delay each, FLIP technique
5. Phase timeline morphuje z bottom bar -- 300ms
6. HUD metryki fade-in w topbar -- 200ms
7. **Calosciowy czas:** ~600ms. **SKIPOWALNE** kliknieciem/klawiszem.

**Powrot:** Reverse animacji. `Escape` lub przycisk "X" (gorny prawy rog). Skrot `M` (jak v18).

### 1.3 State Management (KONSENSUS: Tech + Forum)

| Mechanizm | Rola |
|-----------|------|
| **`data-state` attribute** | Kazdy agent node: `data-state="idle\|queued\|working\|thinking\|done\|error\|waiting-for-human"`. CSS selektory animuja. Single source of truth. |
| **Proxy wrapper** | Centralny obiekt `monitorState` opakowany w `Proxy` -- setter triggeruje rAF batch DOM update |
| **rAF batching** | Wiele zmian stanu grupowanych w jedna klatke: `requestAnimationFrame(() => updateMonitorUI())` |
| **Event delegation** | Jeden listener na kontenerze monitora, `event.target.closest('.agent-node')` do identyfikacji |

```
Flow: monitorState.agents['orchestrator'].state = 'working'
  -> Proxy setter
    -> rAF batch
      -> element.dataset.state = 'working'
        -> CSS transition animuje
```

### 1.4 Communication Protocol (Tech)

| Scenariusz | Mechanizm |
|-----------|-----------|
| Wewnetrzna symulacja (ta sama karta) | `localStorage` + `dispatchEvent(new CustomEvent('agent-status-change'))` |
| Monitor w osobnym oknie | `new BroadcastChannel('atc-live')` |
| Import zewnetrznych danych | File System Access API: `showDirectoryPicker()` + smart polling `lastModified` |
| Fallback import | `<input type="file">` + FileReader (Firefox/Safari) |
| **Przyszlosc** | File System Observer API (gdy Baseline) |

### 1.5 Animation Engine (KONSENSUS: Forum + Tech)

**Centralny AnimationManager** -- jeden rAF loop zamiast wielu rozproszonych:

```javascript
class AnimationManager {
  constructor() {
    this.tasks = new Set();
    this.fps = 60;
    this.lastFrameTime = performance.now();
    this.animationId = null;
  }
  run(currentTime) {
    const deltaTime = currentTime - this.lastFrameTime;
    if (deltaTime > 1000 / this.fps) {
      this.tasks.forEach(task => task(currentTime, deltaTime));
      this.lastFrameTime = currentTime;
    }
    this.animationId = requestAnimationFrame(t => this.run(t));
  }
  registerTask(task) {
    this.tasks.add(task);
    if (this.tasks.size === 1) this.animationId = requestAnimationFrame(t => this.run(t));
  }
  unregisterTask(task) {
    this.tasks.delete(task);
    if (this.tasks.size === 0 && this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
```

**Kluczowe zasady:**
- `cancelAnimationFrame()` w KAZDYM cleanup/destroy
- Delta-time do predkosci animacji, NIGDY frame count
- Particles z TTL (time-to-live)
- `visibilitychange` handler -- pause heavy animations when tab hidden
- Max 100 jednoczesnie animowanych elementow (performance budget: 60 FPS na mid-range laptop)

### 1.6 Zero External Dependencies (KONSENSUS ABSOLUTNY: 6/6 raportow)

- Wszystko inline: `<style>` + `<script>` w jednym HTML
- Zero CDN, zero build step, zero npm
- Progressive enhancement dla nowych API (View Transitions, File System Observer) z fallback
- Rozszerzac istniejacy stack v21 (SVG, Canvas, rAF, localStorage, CSS transitions)

---

## 2. Design System

### 2.1 Paleta kolorow

```css
/* BACKGROUNDS */
--bg0: #06060A;                    /* main background -- deep space */
--bg1: #0F0F18;                    /* panel backgrounds */
--bg-glass: rgba(15,15,24,0.85);   /* glassmorphism panels */
--bg3: #1E1E3A;                    /* elevated surfaces */

/* ACCENT (functional) */
--accent1: #818CF8;   /* indigo -- primary action, strategy phase */
--accent2: #34D399;   /* emerald -- success, build phase, working status */
--accent3: #FBBF24;   /* amber -- warning, thinking status */
--accent4: #F87171;   /* red -- error, danger, reject */
--gold: #F59E0B;      /* gold -- HITL, Five Minds, special */

/* TEXT */
--t1: #E4E4E7;   /* primary text -- 16.5:1 contrast vs bg0 */
--t2: #71717A;   /* secondary text -- 4.8:1 contrast */
--t3: #52525B;   /* disabled/dim -- 3.3:1, ONLY large text >=18px bold */

/* STATUS COLORS */
--status-idle: #71717A;
--status-queued: #818CF8;
--status-working: #34D399;
--status-thinking: #FBBF24;
--status-done: #22C55E;
--status-error: #F87171;
--status-hitl: #F59E0B;

/* PHASE COLORS */
--phase-strategy: #818CF8;    /* indigo */
--phase-research: #06B6D4;    /* cyan */
--phase-fiveminds: #F59E0B;   /* gold */
--phase-build: #34D399;       /* emerald */
--phase-qa: #F87171;          /* red */
```

### 2.2 Typografia

```css
/* HEADINGS: 'Space Grotesk', sans-serif */
h1: 24px / 700 / letter-spacing: -0.02em
h2: 18px / 700 / letter-spacing: -0.01em
h3: 14px / 600

/* BODY: 'Inter', sans-serif */
body:    13px / 400 / line-height: 1.5
small:   11px / 400 / line-height: 1.4
caption: 10px / 500 / uppercase / letter-spacing: 0.08em

/* MONO: 'JetBrains Mono', monospace */
metrics: 12px / 500 (font-variant-numeric: tabular-nums)
code:    11px / 400
timer:   16px / 600
```

### 2.3 Spacing (4px grid)

```
xs:  4px    (padding inline tight)
sm:  8px    (gap between items)
md: 12px    (panel padding, card gap)
lg: 16px    (section spacing)
xl: 24px    (major section breaks)
2xl: 32px   (hero spacing)
```

### 2.4 Border Radius

```
sharp:  4px   (badges, tags)
base:   8px   (buttons, inputs)
card:  12px   (cards, panels)
modal: 16px   (overlays, modals)
pill: 999px   (pill badges)
```

### 2.5 Animacje -- Timing Reference

```
DURATIONS:
  instant:   100ms   (hover feedback, color change)
  fast:      200ms   (button press, tooltip appear)
  normal:    300ms   (panel slide, fade transitions)
  moderate:  400ms   (overlay entry, card expansion)
  slow:      600ms   (fullscreen transition, phase change)
  dramatic: 1000ms   (celebration, major state change)

EASING:
  default:     ease-out
  bounce:      cubic-bezier(0.34, 1.56, 0.64, 1)    /* success, celebration */
  smooth-out:  cubic-bezier(0.16, 1, 0.3, 1)        /* overlay entry, slide */
  spring:      cubic-bezier(0.175, 0.885, 0.32, 1.275) /* playful elements */
  linear:      linear                                /* continuous: rotation, particle flow */

STAGGER:
  tight:    30ms   (list items, rapid cascade)
  normal:   50ms   (card grid reveal)
  loose:    80ms   (phase agents appearance)
  relaxed: 150ms   (dramatic sequential reveal)
```

### 2.6 Glassmorphism Tokens

```css
.glass-panel {
  background: rgba(15, 15, 24, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(129, 140, 248, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.glass-panel-elevated {
  background: rgba(15, 15, 24, 0.92);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(129, 140, 248, 0.2);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(129, 140, 248, 0.05);
}

@supports not (backdrop-filter: blur(20px)) {
  .glass-panel { background: #0F0F18; }
}
```

### 2.7 Z-Index Scale

```
floating-orbs:    0    (background decoration)
canvas:           1    (agent nodes, connections)
sidebar:         50    (left/right panels)
topbar:         100    (navigation, HUD)
overlay:        200    (decision panels, details)
modal:          300    (HITL decision, fullscreen monitor)
toast:          400    (notifications)
tooltip:        500    (hover info)
```

---

## 3. Feature Map

### MUST HAVE -- bez nich nie ma sensu

| # | Feature | Opis | Zrodlo |
|---|---------|------|--------|
| M1 | **Fullscreen overlay z HUD** | CSS fixed overlay pokrywajacy canvas, topbar z metryki, ESC/M do powrotu | Tech, UX, Forum |
| M2 | **Agent status visualization (7 stanow)** | Kazdy z 27 agentow z data-state, animacja CSS, kolor, ikona | UX, Tech |
| M3 | **Phase timeline** | Horizontal stepper na dole, 6 faz z connected dots, active/completed/upcoming | UX, Forum |
| M4 | **Agent grid pogrupowany wg fazy** | Bento grid z kartami agentow, phase containers, aktywna faza highlighted | UX |
| M5 | **HITL decision points (3-5 na sesje)** | Modal Approval Gate dla krytycznych + Inline Decision Panel (non-blocking z timeout) | Tech, UX, Reddit, Forum |
| M6 | **Comms log / Dialog Timeline** | Prawy panel (280px collapsible), reverse chronological, filtr per faza/agent | UX, GitHub |
| M7 | **Emergency STOP button** | Duzy, zawsze widoczny, natychmiastowe zatrzymanie symulacji | Reddit, GitHub |
| M8 | **Animated connections** | stroke-dasharray flowing animation na aktywnych polaczeniach, data packets (glowing orbs) | UX, Forum, GitHub |
| M9 | **Phase transition effects** | Dim completed phases, spotlight nowej fazy, staggered agent reveal | UX |
| M10 | **prefers-reduced-motion** | Obowiazkowe respektowanie, static fallback dla animacji, in-app toggle | UX, Forum |

### SHOULD HAVE -- znaczaco poprawiaja

| # | Feature | Opis | Zrodlo |
|---|---------|------|--------|
| S1 | **Five Minds Debate Arena** | Fullscreen overlay, 5 expert cards, Gold Solution, APPROVE/MODIFY/RE-DEBATE | UX, Reddit, X |
| S2 | **Confidence signals** | Per-agent confidence bar, per-decision confidence slider (0-100%) | Reddit (Smashing Magazine patterns) |
| S3 | **Intent Preview** | Przed kazda faza: "Plan agentow" preview z opcja approve/modify | Reddit |
| S4 | **Kontekstowy HUD** | Dim inactive phases (opacity 0.4), only active phase full brightness | Reddit, UX |
| S5 | **Speech bubble animations** | Typing indicator, staggered entrance, auto-dismiss po 3s, chain dimming | UX |
| S6 | **Token cost estimation** | Szacunkowy koszt per faza/agent ($) w HUD, edukacyjny (nie real-time) | X, Reddit |
| S7 | **Side-by-side comparison** | Dla HITL z 2-3 opcjami: tabela porownan z metryki, recommended badge | UX |
| S8 | **Keyboard navigation** | Tab/Shift+Tab, focus trap w overlayach, skip links, ARIA live regions | UX |
| S9 | **Centralized AnimationManager** | Jeden rAF loop, task registration/unregistration, auto-cleanup | Forum |
| S10 | **Reliability chain indicator** | Compound failure viz: 85% per step = X% na N krokow | X |

### COULD HAVE -- nice to have

| # | Feature | Opis | Zrodlo |
|---|---------|------|--------|
| C1 | **Session replay / time travel** | Nagranie calej symulacji, step-by-step odtwarzanie, fork z dowolnego kroku | GitHub, Reddit |
| C2 | **3-level drill-down** | Level 1: workflow overview, Level 2: phase agents, Level 3: agent detail | Reddit |
| C3 | **View Transitions API** | Progressive enhancement dla plynnych morph transitions | Tech, UX |
| C4 | **Auto-approve timer** | Circular progress wokol APPROVE (60s default), configurable | UX |
| C5 | **Cost breakdown dropdown** | Klik na cost badge -> per agent, per phase, cumulative chart | UX |
| C6 | **Simulation complete celebration** | Confetti (50-80 particles), typewriter "SIMULATION COMPLETE", summary stats | UX |
| C7 | **BroadcastChannel multi-tab** | Synchronizacja stanu miedzy karta Configurator a Live Monitor w osobnym oknie | Tech |
| C8 | **Export execution log** | JSON + Markdown export calej sesji monitoringu | GitHub |
| C9 | **Quality Score per agent** | Metryka jakosci outputu agenta (signal-to-noise) | X (swyx insight) |
| C10 | **Devil's Advocate highlight** | Czerwone alerty gdy DA "atakuje", warning icons, dramatic feedback | X |

### WON'T HAVE (v1) -- odlozone

| # | Feature | Uzasadnienie |
|---|---------|--------------|
| W1 | **Branching UI (decision tree)** | Zbyt zlozony: stan rosnie eksponencjalnie, massive UI work | Tech |
| W2 | **MCP integration (real agents)** | Przyszla wersja, wymaga backendu | X |
| W3 | **Autonomous long-run mode (godziny/dni)** | Karpathy pattern, ale poza scope v22 | X |
| W4 | **OffscreenCanvas / Web Workers** | Overengineering -- canvas v21 nie jest az tak ciezki | Forum |
| W5 | **Mobile-optimized layout** | LUKA w research -- brak danych o performance na mobile | Critic |
| W6 | **Internationalization (i18n)** | Polski interface wystarczy na ten moment | Critic |
| W7 | **Full FSM library (XState)** | 7 stanow za proste na pelny FSM -- data-state wystarczy | Forum/Critic |
| W8 | **Neo-brutalist alert styling** | Ciekawe, ale nie pasuje do istniejacego cosmic/glassmorphism | X |

---

## 4. UI Layout

### 4.1 Mapa regionow ekranu

```
+------------------------------------------------------------------+
| [LIVE *] | Phase 3/6: FM#1 | [===67%] | 04:23 | 5/27 | [STOP]  |  <- TOPBAR HUD (46px)
+------------------------------------------------------------------+
|                                                                  |
|  +--PHASE: STRATEGY (done)--+ +--PHASE: RESEARCH (done)--+      |
|  | [Orkiestr.  ] [Planista ] | | [Researcher] [Anal.Deep] |     |
|  | [done]        [done]     | | [done]       [done]       |     |
|  +---------------------------+ +---------------------------+     |
|                                                                  |
|  +--PHASE: FIVE MINDS #1 (active)--------+  +--COMMS LOG------+ |
|  | [Pragmatist ] [Visionary] [Critic    ] |  | 04:21 Pragm:    | |
|  | [working   ]  [thinking]  [queued    ] |  | "Proponuje..."  | |
|  | [Mediator  ] [Devil's Adv] [Synthes. ] |  | 04:22 Vision:   | |
|  | [queued    ]  [queued    ] [idle      ] |  | "A moze..."     | |
|  +----------------------------------------+  | 04:23 Critic:   | |
|                                              | "Problem z..."  | |
|  +--PHASE: BUILD (upcoming)--+ +--QA---+    +------------------+ |
|  | [Backend  ] [Frontend   ] | |[QA Sec]|                        |
|  | [idle     ]  [idle      ] | |[idle  ]|                        |
|  +---------------------------+ +--------+                        |
|                                                                  |
+------------------------------------------------------------------+
| [STRAT *] --- [RESEARCH *] --- [FM#1 -->] --- [BUILD] --- ...    |  <- PHASE TIMELINE (60px)
+------------------------------------------------------------------+
```

### 4.2 Hierarchia widocznosci

#### ALWAYS VISIBLE (Poziom 1: Glanceable, < 1s)

| Element | Pozycja | Format |
|---------|---------|--------|
| Status symulacji | Topbar, skrajnie lewy | Dot indicator: zielony=running, zolty=paused, czerwony=error |
| LIVE label | Topbar, lewy | Pulsujacy czerwony dot + "LIVE" |
| Aktualna faza | Topbar, srodek | Badge: "Phase 3/6: Five Minds #1" |
| Progress % | Topbar, obok fazy | Circular progress ring (24px) |
| Czas trwania | Topbar, prawy | Monospace timer "04:23" |
| Aktywni agenci | Topbar, prawy | "5/27 active" |
| STOP button | Topbar, skrajnie prawy | Czerwony, duzy, zawsze dostepny |
| HITL alert | Topbar, wycentrowany (gdy potrzebny) | Pulsujacy gold badge "DECISION REQUIRED" |

**Topbar HUD format:**
```
[LIVE *] | Phase 3/6: Five Minds #1 | [===67%===] | 04:23 | 5/27 agents | [$12.40] | [STOP]
```

#### ON-DEMAND (Poziom 2: Scannable, 3-5s)

| Element | Pozycja | Trigger |
|---------|---------|---------|
| Agent grid ze statusami | Glowny obszar | Zawsze widoczny w gridzie, ale hover/click = wiecej info |
| Phase timeline (stepper) | Dol ekranu, 60px | Zawsze widoczny, klik na faze = filtrowanie gridu |
| Comms log (3 ostatnie) | Prawy panel (280px, collapsible) | Domyslnie otwarty, collapse na click |
| Aktywne polaczenia | Overlay na gridzie | Automatycznie -- particle flow na aktywnych connections |

#### DEEP DIVE (Poziom 3: overlay/panel)

| Element | Trigger | Format |
|---------|---------|--------|
| Pelny comms log | Klik "Expand" na comms panelu | Fullscreen overlay z filtrami agent/faza |
| Agent detail | Klik na agent card | Slide-out: prompt, connections, history, metrics |
| Architecture diagram | Klik "View Architecture" | Overlay z SVG diagramem systemu |
| Cost breakdown | Klik na cost badge w HUD | Dropdown: per agent, per phase, cumulative |
| Decision history | Klik "Decisions" w timeline | Lista HITL decisions z outcomes |
| Debate Arena | HITL decision point | Fullscreen overlay (80% viewport), glassmorphism |

---

## 5. Agent Status System

7 stanow z pelna specyfikacja CSS:

### 5.1 idle -- Subtle Breathing

| Wlasciwosc | Wartosc |
|-------------|---------|
| **Kolor** | `#71717A` (zinc-600) |
| **Animacja** | `breathe-idle 4s ease-in-out infinite` |
| **Ikona** | `○` puste kolko, dashed border |
| **Label** | "Idle" |
| **Kiedy** | Agent czeka na swoja faze |

```css
@keyframes breathe-idle {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.65; transform: scale(1.02); }
}
```

### 5.2 queued -- Anticipation Pulse

| Wlasciwosc | Wartosc |
|-------------|---------|
| **Kolor** | `#818CF8` (indigo-400) |
| **Animacja** | `pulse-queued 1.5s ease-out infinite` |
| **Ikona** | `◷` zegar, dotted border |
| **Label** | "Queued" |
| **Kiedy** | Agent w kolejce, zaraz zacznie |

```css
@keyframes pulse-queued {
  0%, 100% { box-shadow: 0 0 0 0 rgba(129,140,248,0.4); }
  50% { box-shadow: 0 0 0 8px rgba(129,140,248,0); }
}
```

### 5.3 working -- Active Processing

| Wlasciwosc | Wartosc |
|-------------|---------|
| **Kolor** | `#34D399` (emerald-400) |
| **Animacja** | `spin-ring 1.2s linear infinite` -- obracajacy sie ring wokol noda |
| **Glow** | `box-shadow: 0 0 20px rgba(52,211,153,0.3)` |
| **Ikona** | `⟳` rotating gear, solid animated border |
| **Label** | "Working" |
| **Kiedy** | Agent aktywnie przetwarza |
| **Dodatkowo** | Progress bar pod nodem (thin 2px bar) |

```css
@keyframes spin-ring {
  to { transform: rotate(360deg); }
}
```

### 5.4 thinking -- Deliberation Wave

| Wlasciwosc | Wartosc |
|-------------|---------|
| **Kolor** | `#FBBF24` (amber-400) |
| **Animacja** | `think-wave 2s linear infinite` -- shimmer gradient |
| **Ikona** | `💡` zarowka z pulsem, shimmer border |
| **Label** | "Thinking" |
| **Kiedy** | Agent analizuje, deliberuje |
| **Dodatkowo** | Trzy animowane kropki ("...") pod nodem |

```css
@keyframes think-wave {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
```

### 5.5 done -- Completion Burst

| Wlasciwosc | Wartosc |
|-------------|---------|
| **Kolor** | `#22C55E` (green-500) |
| **Animacja** | `done-burst 400ms cubic-bezier(0.34, 1.56, 0.64, 1)` -- jednorazowa |
| **Ikona** | `✓` checkmark w kolku, solid green border |
| **Label** | "Done" |
| **Kiedy** | Agent zakonczyl zadanie |
| **Dodatkowo** | Po 2s: dim do opacity 0.7 -- agent nie jest juz glowna uwaga |

```css
@keyframes done-burst {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
```

### 5.6 error -- Alert Shake

| Wlasciwosc | Wartosc |
|-------------|---------|
| **Kolor** | `#F87171` (red-400) |
| **Animacja** | `shake-error 400ms` jednorazowo, potem staly red glow `2s` pulsujacy ring |
| **Ikona** | `⚠` trojkat z wykrzyknikiem |
| **Label** | "Error" |
| **Kiedy** | Blad agenta -- wymaga uwagi |
| **Dodatkowo** | Badge z "!" w prawym gornym rogu noda |

```css
@keyframes shake-error {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-3px); }
  40%, 80% { transform: translateX(3px); }
}
```

### 5.7 waiting-for-human -- Attention Beacon

| Wlasciwosc | Wartosc |
|-------------|---------|
| **Kolor** | `#F59E0B` (gold) |
| **Animacja** | `beacon-human 1.5s ease-in-out infinite` -- najbardziej intensywna, podwojny ring pulse |
| **Ikona** | `✋` reka/pointer, diamond shape, pulsing |
| **Label** | "Waiting" |
| **Kiedy** | Agent czeka na decyzje usera (HITL point) |
| **Dodatkowo** | Floating icon reki nad nodem, badge "HITL" gold, migajace "DECISION REQUIRED" w comms log |

```css
@keyframes beacon-human {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.5), 0 0 20px rgba(245,158,11,0.2); }
  50% { box-shadow: 0 0 0 12px rgba(245,158,11,0), 0 0 30px rgba(245,158,11,0.4); }
}
```

### 5.8 Accessibility: 3 kanaly per status

Kazdy status komunikowany przez MINIMUM 3 kanaly (WCAG 1.4.1):

| Status | Kolor | Ikona | Animacja/Ksztalt |
|--------|-------|-------|------------------|
| idle | grey | `○` puste kolko | dashed border, breathing |
| queued | indigo | `◷` zegar | dotted border, pulse |
| working | green | `⟳` rotating | solid animated, spin ring |
| thinking | amber | `💡` zarowka | shimmer gradient |
| done | green | `✓` checkmark | solid border, burst then dim |
| error | red | `⚠` trojkat | shake then red glow |
| HITL | gold | `✋` reka | diamond, beacon pulse |

---

## 6. HITL Decision System

### 6.1 Typy decyzji

| Typ | Pattern | Trigger | Max na sesje |
|-----|---------|---------|--------------|
| **Krytyczna** | Modal Approval Gate (blocking) | Zmiana fazy, final approval, Gold Solution | 3-5 |
| **Regularna** | Inline Decision Panel (non-blocking z timeout) | Approve agent output, modify plan | Unlimited, ale auto-approve default |

### 6.2 5 punktow HITL w Deep Five Minds Protocol

1. **Po fazie Strategy** -- akceptacja planu
2. **Po Five Minds Debate #1** -- wybor Gold Solution
3. **Przed faza Build** -- zatwierdzenie architektury
4. **Po Five Minds Debate #2** -- akceptacja QA findings
5. **Final approval** -- deploy/reject

**UWAGA CRITIC:** 5 punktow to gorna granica rekomendacji (Reddit: max 3-5). Rozwazyc czy punkty 1 i 3 mozna polaczyc. Review fatigue jest realne.

### 6.3 UI Patterns per typ

#### A) Debate Arena Panel (dla Gold Solution decisions)

```
+------------------------------------------------------------+
|  DECISION REQUIRED                        [Skip] [Timer]   |
|  Five Minds Debate #1: Architektura systemu                |
|------------------------------------------------------------|
|  +-- EXPERT CARDS (horizontal scroll) --+                  |
|  | [Pragmatist]  [Visionary]  [Critic]  [Mediator] [DA]   |
|  | "Monolith     "Mikroserwisy "Za drogi  "Kompromis "A co |
|  |  jest OK       daja scale"  na start"  na moduly" ..." |
|  +-----------------------------------------------------+  |
|  +-- GOLD SOLUTION (wynik syntezy) ---+                    |
|  | Synthesizer proponuje: Modular Monolith                 |
|  +------------------------------------+                    |
|  [APPROVE Gold Solution]  [MODIFY]  [REQUEST RE-DEBATE]    |
|  Confidence: [====|=====|====] 85%  "Jestem pewny"         |
+------------------------------------------------------------+
```

- Expert cards: awatar + SVG icon, rola, kluczowy argument, confidence badge
- Devil's Advocate: czerwony accent
- Keyboard shortcuts: `A` approve, `R` reject, `D` debate details

#### B) Side-by-Side Comparison (2-3 opcje)

```
+-------------------------------------------------------+
|  Option A          | Option B          | Option C *    |
|  Monolith          | Microservices     | Mod. Monolith |
|-------------------------------------------------------|
|  Cost: $$$         | Cost: $$$$$       | Cost: $$$$    |
|  Time: 2 tyg       | Time: 6 tyg       | Time: 3 tyg   |
|  Risk: Low         | Risk: High        | Risk: Med     |
|  [SELECT]          | [SELECT]          | [SELECT *]    |
+-------------------------------------------------------+
```

- Rekomendowana opcja: gold border + star badge
- Metryki kolorowane: zielony = lepiej, czerwony = gorzej

#### C) Quick Approval (proste approve/reject)

```
+--------------------------------------------+
|  [Synthesizer] Gold Solution Ready         |
|  "Modular Monolith z API Gateway..."       |
|  +------------------+ +------------------+ |
|  | APPROVE          | | ODRZUC           | |
|  | [Checkmark]      | | [X]              | |
|  +------------------+ +------------------+ |
|  [?] Nie jestem pewny -- pokaz wiecej      |
+--------------------------------------------+
```

- Touch targets: min 120x80px
- Keyboard: `A` approve, `R` reject

#### D) Confidence Slider (opcjonalny)

```
How confident are you?
[Very Unsure] ====|========== [Very Sure]
                  ^ 72%
  0-30%:  "Potrzebuje wiecej info"
  31-60%: "Watpliwosci, ale akceptuje warunkowo"
  61-85%: "Dobrze wyglada"
  86-100%: "W pelni przekonany"
```

### 6.4 Decision Flow

```
1. Agent -> stan `waiting-for-human` -> beacon animation
2. Topbar: notification bar (gold, pulsating): "DECISION REQUIRED at [phase]"
3. Klik -> Debate Arena Panel (fullscreen overlay 80% viewport)
4. User przeglaada expert cards, "Compare Options" dostepne
5. User klika: APPROVE / MODIFY / RE-DEBATE
6. Opcjonalnie: confidence slider
7. Decision logged w Dialog Timeline (timestamp + confidence)
8. Animacja "decision confirmed": burst + swoosh, overlay close
9. Agenty wznowiaja prace
```

### 6.5 Timeout / Default Behavior

- **Auto-approve timer:** 60s (configurable) -- circular progress wokol APPROVE
- User moze wylaczyc auto-approve w ustawieniach
- Timer wizualny: circular progress na przycisku
- Debata ekspertow widoczna PRZED osiagnieciem HITL point (user moze czytac w real-time)
- Jesli user nie reaguje: system kontynuuje z Gold Solution (recommended option)

### 6.6 Autonomy Dial (z Smashing Magazine patterns)

4 poziomy (configurable w settings):
1. **Observe & Suggest** -- system pauzuje co krok, czeka na approve
2. **Plan & Propose** -- system pokazuje plan przed kazda faza, czeka
3. **Act with Confirmation** -- system dziala, pauzuje TYLKO na krytycznych HITL points (DEFAULT)
4. **Act Autonomously** -- system nie pauzuje, user obserwuje dashboard

---

## 7. Five Minds Debate Visualization

### 7.1 Layout debaty

**Metafora:** Arena / sala sadowa -- eksperci po bokach, Devil's Advocate na przeciw, Synthesizer jako sedzia w centrum.

```
              [Devil's Advocate]
              /        |        \
   [Pragmatist]   [Visionary]   [Critic]
              \        |        /
              [Mediator/Synth.]
                    |
             [GOLD SOLUTION]
```

### 7.2 Rundy debaty (3-round pattern)

| Runda | Nazwa | Opis | Visual |
|-------|-------|------|--------|
| Round 1 | Independent | Kazdy ekspert generuje odpowiedz niezaleznie (anti-anchoring bias) | 5 oddzielnych speech bubbles, brak polaczen miedzy nimi |
| Round 2 | Debate | Eksperci komentuja argumenty innych, DA kontratakuje | Polaczenia miedzy ekspertami: agree (zielone) / disagree (czerwone) |
| Round 3 | Synthesis | Synthesizer laczy najlepsze argumenty w Gold Solution | Polaczenia zmieniaja kolor na zloty, "consensus glow" na wezlach |

### 7.3 Speech / Argument display

- Kazdy ekspert: karta z awatarem, rolą, kluczowym argumentem (1-2 zdania)
- Klikniecie na karte -> expand z pelnym argumentem
- Devil's Advocate: czerwony accent border -- wizualne odroznienie
- Momenty niezgody: czerwone polaczenia miedzy kartami (tam jest WARTOSC debaty)
- Speech bubbles: typing indicator (200-500ms) -> tekst fade-in (250ms, bounce easing)

### 7.4 Voting / Consensus UI

5 mechanizmow zakonczenia debaty (z Reddit/community research):
1. **Natural Convergence** -- agenci sami dochodza do zgody
2. **Trigger Keywords** -- sygnaly typu "AGREED" lub `<CONSENSUS_REACHED/>`
3. **Judge Agent (Synthesizer)** -- wyznaczony agent ocenia argumenty (NASZ DEFAULT)
4. **Majority Vote** -- glosowanie wiekszosciowe
5. **Heuristic Merge** -- laczenie watkow z roznych pozycji

**Visual consensus moment:**
- Polaczenia zmieniaja kolor z per-expert na zloty (#F59E0B)
- "Consensus glow" na wszystkich wezlach (jednorazowy gold pulse)
- Synthesizer node powiekszony o 20%

### 7.5 Gold Solution presentation

```
+--------------------------------------------------+
|  GOLD SOLUTION                         [★ 85%]  |
|  ============================================    |
|  Synthesizer proponuje:                          |
|  "Modular Monolith z API Gateway, przygotowany   |
|   na przejscie do mikroserwisow w Phase 2..."    |
|                                                  |
|  Bazuje na argumentach:                          |
|  [Pragmatist ✓] [Visionary ✓] [Mediator ✓]     |
|  [Critic ⚠ warunkowo] [DA ✗ odrzucony]          |
|                                                  |
|  [APPROVE]  [MODIFY]  [RE-DEBATE]                |
+--------------------------------------------------+
```

- Consensus score (% ekspertow ktorzsy sie zgadzaja)
- Badges per ekspert: ✓ poparl, ⚠ warunkowo, ✗ odrzucony
- Gold border, elevated glassmorphism panel

---

## 8. Known Risks

### 8.1 Sprzecznosci z raportow (rozwiazane)

| # | Sprzecznosc | Zrodla | Rozwiazanie |
|---|------------|--------|-------------|
| 1 | Fullscreen: natywne API vs CSS overlay | Tech vs UX vs Forum | **ROZWIAZANE:** CSS overlay primary, Fullscreen API optional. Konsensus 3/3. |
| 2 | HITL: blocking modal vs HOTL dashboard | Tech/UX vs X | **ROZWIAZANE:** Gradacyjny Autonomy Dial. Default = "Act with Confirmation" (3-5 HITL). Opcja HOTL w settings. |
| 3 | Token cost: must have vs zbedne | X vs Tech (milczy) | **ROZWIAZANE:** Szacunkowy koszt (edukacyjny) w SHOULD HAVE, nie MUST. W symulacji brak prawdziwych tokenow -- wyswietlamy szacunek. |
| 4 | External dependencies: zero vs CDN | Tech vs Forum (Willison) | **ROZWIAZANE:** Zero CDN. Konsensus absolutny -- single-file purity. |
| 5 | View Transitions: gotowe vs za wczesne | Tech vs Forum (milczy) | **ROZWIAZANE:** Progressive enhancement z fallback. Baseline Oct 2025, ale brak danych o browser demographics userow. |

### 8.2 Ryzyka z Critic

| # | Ryzyko | Waga | Mitygacja |
|---|--------|------|-----------|
| R1 | **Mobile / touch support: ZERO DANYCH** | KRYTYCZNE | Luka w research. Zalecenie: testowac v22 na mobile po implementacji, responsive grid fallback |
| R2 | **File size po dodaniu Live Monitor** | WAZNE | v21 ~300-500KB. Monitor moze dodac 50-100KB. Monitor limit: < 1MB calosciowo |
| R3 | **localStorage limit (5-10MB)** | WAZNE | Dluga sesja monitoringu moze zapchac. Mitygacja: rotacja logow, limit historii do N sesji |
| R4 | **Color blindness (daltonizm)** | WAZNE | 7 statusow rozroznianych glownie kolorem. Mitygacja: 3 kanaly per status (kolor + ikona + animacja). Ale brak testow z protanopia/deuteranopia. |
| R5 | **Memory leaks przy dlugich sesjach** | WAZNE | rAF loops bez cleanup, rosnice tablice particles. Mitygacja: AnimationManager z unregisterTask, particles TTL, heap snapshots |
| R6 | **Review fatigue** | SREDNIE | 5 HITL punktow to gorna granica. Mitygacja: Autonomy Dial, auto-approve timer, tiered importance |
| R7 | **Error recovery** | SREDNIE | Co gdy 3+ agenty w error? Brak retry/skip/rollback. Mitygacja: emergency STOP, per-agent retry button |
| R8 | **Multi-tab race conditions** | SREDNIE | 2 instancje -> localStorage conflicts. Mitygacja: prefix key z session ID |
| R9 | **Implicit compositing cascade** | SREDNIE | will-change na nisko-z-indexed element -> memory explosion. Mitygacja: animowane elementy na najwyzszym z-index |
| R10 | **Hallucinated data w raporcie X** | NISKIE | Statystyki ($2.5B ARR, 72% enterprise) nieweryfikowalne. Mitygacja: nie opierac decyzji na tych liczbach |

### 8.3 Confirmation bias w raportach

- Raporty Reddit (04) i X (06) maja wyrazny advocacy ton ("jestesmy najlepsi", "jedyne takie narzedzie")
- Reddit (04) de facto NIE zawiera glosow z Reddita -- to "Community Blogs"
- X (06) cytuje influencerow (Karpathy, Ng) z OGROMNYM bias w kierunku AI agents
- **Zalecenie:** Traktowac insighty z tych raportow jako wartosciowe, ale statystyki z rezerwa

---

## 9. Inspiracje (Top 10)

| # | Pattern | Zrodlo | Co zaczerpnac |
|---|---------|--------|---------------|
| 1 | **Session Waterfall** | AgentOps, Langfuse | Os czasu z eventami (LLM calls, tool calls, errors), szczegoly po kliknieciu. Wzor dla Dialog Timeline. |
| 2 | **Green border na aktywnym nodzie** | ComfyUI (108k stars) | Live execution: zielona ramka, progress bar na gorze, czas wykonania badge po zakonczeniu. |
| 3 | **Emergency Stop kill switch** | MeisnerDan/mission-control | Duzy, zawsze widoczny przycisk zatrzymania. Loop detection. AES-256-GCM vault (inspiracja security). |
| 4 | **Event-driven state z replay** | agents-observe, Convex | Stan wyliczany z event stream zamiast utrzymywany osobno. Umozliwia replay i undo. |
| 5 | **ChatChain visualization** | ChatDev (32.6k stars) | Wizualizacja lancucha konwersacji miedzy agentami. Role-based hierarchy (CEO/CTO/Dev/QA). |
| 6 | **NASA Open MCT** | nasa.github.io/openmct | Timelines, streaming data, caution & warning system. "Telemetry display" aesthetic. |
| 7 | **Grafana 5-second rule** | Grafana Labs Best Practices | Dashboard komunikuje stan w 5 sekund. Golden Signals. Hierarchiczne dashboardy z drill-down. |
| 8 | **LangGraph HITL checkpoints** | LangGraph (28.4k stars) | Najlepszy model HITL: zatrzymanie grafu, inspekcja stanu, modyfikacja, wznowienie. "Time travel debugging." |
| 9 | **Courtroom debate metaphor** | ICLR 2025, OpenReview | Advocates, judges, juries. Structured argumentation. Poczatkowa niejednomyslnosc POPRAWIA wynik. |
| 10 | **6 wzorcow UX dla Agentic AI** | Smashing Magazine (02/2026) | Intent Preview, Autonomy Dial, Explainable Rationale, Confidence Signal, Action Audit & Undo, Escalation Pathway. |

---

## 10. Otwarte Pytania dla Five Minds

Tematy gdzie NIE MA konsensusu -- eksperci musza zdecydowac:

### Q1: Token cost w symulacji -- jak wyswietlac?
- X mowi MUST HAVE, ale symulacja NIE MA prawdziwych tokenow
- Opcje: (a) szacunek na podstawie modelu i dlugosci promptu, (b) "educational estimate" z disclaimer, (c) calkowicie pomijac w v22
- **Do debaty:** Czy szacunkowy koszt ($) dodaje wartosci edukacyjnej, czy jest misleading?

### Q2: Ile HITL punktow w default mode?
- UX projektuje 5 punktow HITL
- Reddit/community: max 3-5 (review fatigue!)
- X idzie dalej: HOTL (dashboard-first, minimum interwencji)
- **Do debaty:** Ktore z 5 punktow sa NAPRAWDE krytyczne? Czy punkty 1 i 3 mozna polaczyc?

### Q3: Session replay / time travel -- v22 czy pozniej?
- GitHub i Reddit rekomenduja jako killer feature (LangGraph Studio inspiration)
- Tech, UX, Forum, X milcza
- Implementacja jest ZLOZIONA (nagrywanie event stream, state snapshots, replay engine)
- **Do debaty:** Czy to blokujace dla v22, czy nice-to-have na v23?

### Q4: Mobile support -- blokujacy czy nie?
- ZERO danych o performance na mobile (KRYTYCZNA LUKA)
- Single-file HTML naturalnie otwierat sie na mobile
- Ale: glassmorphism + 27 agentow + particles + starfield + SVG -- czy bedzie dzialac na iPhone SE?
- **Do debaty:** Czy testowac na mobile PRZED release, czy potraktowac jako "desktop-first" z responsive fallback?

### Q5: Autonomy Dial -- default level?
- Opcja 1: "Observe & Suggest" (pauzuj co krok) -- bezpieczne, ale irytujace
- Opcja 2: "Plan & Propose" (planuj, potem pauzuj) -- balans
- Opcja 3: "Act with Confirmation" (3-5 HITL) -- najbardziej pragmatyczne
- Opcja 4: "Act Autonomously" (zero przerwan) -- pure dashboard HOTL
- **Do debaty:** Jaki default? Argument za Opcja 3 jest najsilniejszy (balans control/flow).

### Q6: Rozmiar pliku -- granica?
- v21 ~3000+ LOC
- Live Monitor moze dodac 1000-2000 LOC
- Czy 5000+ LOC w jednym pliku HTML jest jeszcze UTRZYMYWALNY?
- Simon Willison: "Utrzymuj plik w granicach kilkuset linii" -- juz dawno przekroczone
- **Do debaty:** Czy rozmiar pliku jest realnym ryzykiem, czy to akademicka obawy?

### Q7: Agent node design w monitorze -- karty czy orby?
- Canvas v21: male orby 48x48px
- Monitor UX propozycja: wiekszie karty 180x100px z progress bar, last message, status badge
- **Do debaty:** Czy karty nie zabija "mission control" estetyki? Moze hybrid: orby w overview, karty w drill-down?

### Q8: Wiarygodnosc danych z raportu X (06)
- Critic: ocena 7.2/10, "ryzyko hallucinated data"
- Statystyki ($2.5B ARR, 72% enterprise, 340% wzrost) nieweryfikowalne
- Influencer-driven conclusions (Karpathy, Ng, swyx)
- **Do debaty:** Jak duzo wagi dac trendom z X? Czy token cost tracking jest naprawde "industry standard" czy influencer bubble?

---

## Zalacznik A: Browser Compatibility Matrix

| Technologia | Chrome | Firefox | Safari | Edge | Uwagi |
|------------|--------|---------|--------|------|-------|
| Canvas 2D + rAF | 100% | 100% | 100% | 100% | Universal |
| WAAPI | 36+ | 48+ | 13.1+ | 36+ | Szerokie wsparcie |
| CSS transitions/animations | 100% | 100% | 100% | 100% | Universal |
| View Transitions API | 111+ | 133+ | 18+ | 111+ | Baseline Oct 2025 |
| Fullscreen API | 71+ | 64+ | **brak iOS** | 79+ | iOS Safari NIE wspiera |
| File System Access | 86+ | **brak** | **brak** | 86+ | Tylko Chromium |
| BroadcastChannel | 54+ | 38+ | 15.4+ | 16+ | Szerokie wsparcie |
| localStorage | 100% | 100% | 100% | 100% | Universal |
| `data-state` selectors | 100% | 100% | 100% | 100% | Universal |
| Proxy (ES6) | 49+ | 18+ | 10+ | 12+ | Universal modern |
| SVG inline animations | 100% | 100% | 100% | 100% | Universal |
| `backdrop-filter` | 76+ | 103+ | 9+ | 17+ | Szerokie, fallback obowiazkowy |

## Zalacznik B: Performance Checklist

### Rendering Pipeline
- [ ] Animuj TYLKO `transform` i `opacity` (compositor thread)
- [ ] Centralized AnimationManager -- jeden rAF loop
- [ ] Delta-time bazowana predkosc animacji
- [ ] FPS throttling: `if (deltaTime > 1000/targetFPS)`
- [ ] READ-then-WRITE -- batch DOM measurements, potem writes

### GPU & Layers
- [ ] `will-change` sparingly -- dodawaj PRZED animacja, usun PO
- [ ] Najwyzszy z-index na animowanych elementach (zapobiega implicit compositing)
- [ ] Male elementy + `scale()` zamiast duzych (100x mniej pamieci)
- [ ] Limituj ilosc glass panels (kazdy `backdrop-filter` = dodatkowa warstwa GPU)
- [ ] Fallback: `@supports not (backdrop-filter: blur(1px))`

### Memory & Cleanup
- [ ] `cancelAnimationFrame()` w KAZDYM cleanup/destroy
- [ ] Particles z TTL (time-to-live)
- [ ] `particles.length = 0` zamiast `particles = []` (GC friendly)
- [ ] Event delegation -- jeden listener na kontenerze
- [ ] Remove DOM elements po zakonczeniu animacji (speech bubbles, particles)

### Browser & Tabs
- [ ] `visibilitychange` handler -- pauzuj ciezkie animacje w hidden tabs
- [ ] rAF zamiast setInterval do WSZYSTKIEGO wizualnego
- [ ] `prefers-reduced-motion` -- reduce/disable animations
- [ ] `setInterval` throttled do 1 minuty w Chrome 88+ w background tabs!

### SVG
- [ ] Cache `getTotalLength()` -- nie wywoluj w kazdej klatce
- [ ] `stroke-dasharray` + `dashoffset` do flowing connections (CSS, zero JS)
- [ ] SMIL `animateMotion` dla data packets -- deklaratywne, browser-native
- [ ] SVG overflow: visible, dimensions 6000x6000 (jak v20 fix)

### UX & Accessibility
- [ ] Max ~5 metryk w HUD -- progressive disclosure na reszta
- [ ] Micro-animations 200-400ms (nie za krotkie, nie za dlugie)
- [ ] `aria-live="polite"` na comms log, `aria-live="assertive"` na HITL alerts
- [ ] Focus ring: `outline: 2px solid var(--accent1); outline-offset: 2px`
- [ ] Focus trap w overlayach/modalach
- [ ] Min 3 kanaly per status: kolor + ikona + animacja/ksztalt

## Zalacznik C: Anti-Patterns (UNIKAC)

| # | Anti-pattern | Skutek | Fix |
|---|-------------|--------|-----|
| 1 | Rozrzucone rAF (wiele loopow) | Brak kontroli FPS, trudny cleanup | Centralny AnimationManager |
| 2 | Animowanie `left`/`top`/`width`/`height` | Layout recalc co klatka, 5x wolniejsze | `transform: translate()` |
| 3 | Layout thrashing (write-before-read) | Synchroniczny layout, blokuje main thread | Batch reads, then writes |
| 4 | `will-change` na wszystkim | Memory explosion (kazdy element = warstwa GPU) | Tylko na animowanych, usun po |
| 5 | Implicit compositing cascade | Setki warstw, memory overflow | Najwyzszy z-index na animowanych |
| 6 | Brak cleanup przy destroy | Memory leak, rosnace CPU | `cancelAnimationFrame()` + clear refs |
| 7 | `setInterval` do animacji | Brak sync z repaint, throttled w bg tabs | rAF do wszystkiego wizualnego |
| 8 | Fullscreen overlay z `will-change: transform` | 1920x1080 * 4B * 4(Retina) = 33MB GPU | Rozbij na mniejsze czesci / trick z scale() |
| 9 | Ignorowanie `prefers-reduced-motion` | Problemy z dostepnoscia, mdlosci | `@media (prefers-reduced-motion: reduce)` |
| 10 | Frame-count animation | Rozna predkosc na 30Hz vs 60Hz | `position += speed * deltaTime` |

---

*MANIFEST.md przygotowany przez Syntetyka [OPUS] na podstawie 7 raportow researcherskich.*
*Gotowy do debaty Five Minds Protocol.*
*Data: 2026-04-04*
