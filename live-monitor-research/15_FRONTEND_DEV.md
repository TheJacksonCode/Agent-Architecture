# Frontend Dev [OPUS] -- Specyfikacja Komponentow HTML/CSS
## Live Monitor Mode v22

**Rola:** Frontend Dev (Deep Five Minds Protocol -- BUILD phase)
**Data:** 2026-04-04
**Zrodla:** Gold Solution (13_GOLD_SOLUTION.md), Tech Research (01), Forum Research (05), codebase v21

---

## Spis tresci

1. [HTML Structure -- Kompletne drzewo DOM](#1-html-structure)
2. [CSS Architecture -- Klasy, stany, transitions](#2-css-architecture)
3. [Component Specifications A-H](#3-component-specifications)
4. [Keyboard Navigation](#4-keyboard-navigation)
5. [State Management Interface](#5-state-management-interface)
6. [Integration Points z v21/v22](#6-integration-points)
7. [Performance Guardrails](#7-performance-guardrails)

---

## 1. HTML Structure

### 1.1 Kompletne drzewo DOM Live Monitor

Caly Live Monitor to JEDEN overlay wstawiany LAZY przy pierwszym uzyciu. Ponizej pelne drzewo -- kazdy element z tagiem, klasa, id, ARIA, data-*.

```html
<!-- Wstawiany do <body> PRZED </body>, ZA istniejacymi modalami (.mo) -->
<div class="lm-overlay" id="lmOverlay"
     role="dialog"
     aria-modal="true"
     aria-label="Live Monitor -- Panel monitorowania symulacji"
     data-state="closed"
     hidden>

  <!-- ============================================================
       A) TOPBAR HUD -- 46px fixed top
       ============================================================ -->
  <header class="lm-topbar" role="banner">
    <div class="lm-tb-live" aria-label="Status transmisji na zywo">
      <span class="lm-live-dot" aria-hidden="true"></span>
      <span class="lm-live-label">LIVE</span>
    </div>

    <div class="lm-tb-sep" aria-hidden="true"></div>

    <div class="lm-tb-phase" id="lmPhaseLabel" aria-live="polite">
      Phase <span class="lm-tb-phase-num" id="lmPhaseNum">0</span>/6:
      <span class="lm-tb-phase-name" id="lmPhaseName">--</span>
    </div>

    <div class="lm-tb-sep" aria-hidden="true"></div>

    <div class="lm-tb-progress" role="progressbar"
         aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
         aria-label="Postep symulacji"
         id="lmProgressBar">
      <div class="lm-tb-progress-fill" id="lmProgressFill"></div>
      <span class="lm-tb-progress-pct" id="lmProgressPct">0%</span>
    </div>

    <div class="lm-tb-sep" aria-hidden="true"></div>

    <!-- Metryki HUD -- max 5 -->
    <div class="lm-tb-metrics" role="group" aria-label="Metryki symulacji">
      <div class="lm-metric" id="lmMetricTime" data-metric="time">
        <span class="lm-metric-icon" aria-hidden="true">&#9200;</span>
        <span class="lm-metric-val" id="lmTime">00:00</span>
      </div>
      <div class="lm-metric" id="lmMetricAgents" data-metric="agents">
        <span class="lm-metric-icon" aria-hidden="true">&#9679;</span>
        <span class="lm-metric-val" id="lmActiveAgents">0</span>/<span class="lm-metric-total" id="lmTotalAgents">0</span>
      </div>
    </div>

    <div class="lm-tb-spacer"></div>

    <!-- Przyciski topbar -->
    <button class="lm-btn lm-btn-pause" id="lmPauseBtn"
            aria-label="Pauza symulacji" title="Spacja -- pauza">
      &#9646;&#9646;
    </button>
    <button class="lm-btn lm-btn-comms-toggle" id="lmCommsToggle"
            aria-label="Przełącz panel komunikacji" aria-expanded="true"
            title="Przełącz log komunikacji">
      &#128172;
    </button>
    <button class="lm-btn lm-btn-stop" id="lmStopBtn"
            aria-label="Natychmiastowe zatrzymanie symulacji"
            title="Emergency STOP">
      &#9724; STOP
    </button>
    <button class="lm-btn lm-btn-close" id="lmCloseBtn"
            aria-label="Zamknij Live Monitor" title="Escape -- zamknij">
      &#10005;
    </button>
  </header>

  <!-- ============================================================
       B) MAIN CONTENT AREA -- flex row
       ============================================================ -->
  <div class="lm-main">

    <!-- ============================================================
         B.1) AGENT GRID -- zajmuje cala szerokosc minus comms log
         ============================================================ -->
    <div class="lm-grid-area" id="lmGridArea" role="main"
         aria-label="Siatka agentow pogrupowana wg faz">

      <!-- Faza generowana dynamicznie przez JS (x6 max) -->
      <!-- Szablon jednej fazy: -->
      <!--
      <section class="lm-phase-group" id="lmPhase-strategy"
               data-phase="strategy" data-phase-state="upcoming"
               role="region" aria-label="Faza: STRATEGIA">
        <div class="lm-phase-header">
          <span class="lm-phase-indicator" aria-hidden="true"></span>
          <h2 class="lm-phase-title">STRATEGIA</h2>
          <span class="lm-phase-time" id="lmPhaseTime-strategy">--</span>
          <span class="lm-phase-status" id="lmPhaseStatus-strategy"></span>
        </div>
        <div class="lm-phase-agents">
          <!-- Agent cards wstawiane tu -->
        </div>
      </section>
      -->

      <!-- ======= AGENT CARD (szablon jednej karty) ======= -->
      <!--
      <div class="lm-agent" id="lmAgent-orchestrator"
           data-agent="orchestrator"
           data-state="idle"
           data-phase="strategy"
           role="listitem"
           tabindex="0"
           aria-label="Agent: Orkiestrator -- stan: Idle">
        <div class="lm-agent-orb" aria-hidden="true">
          <svg><!-- agSvg() inline --></svg>
        </div>
        <div class="lm-agent-info">
          <span class="lm-agent-name">Orkiestrator</span>
          <span class="lm-agent-state-label" id="lmStateLabel-orchestrator">Idle</span>
        </div>
        <div class="lm-agent-progress" aria-hidden="true">
          <div class="lm-agent-progress-bar"></div>
        </div>
        <div class="lm-agent-speech" aria-live="polite" hidden></div>
      </div>
      -->
    </div>

    <!-- ============================================================
         B.2) COMMS LOG -- prawy panel, 280px, collapsible
         ============================================================ -->
    <aside class="lm-comms" id="lmComms"
           role="log" aria-label="Log komunikacji agentow"
           aria-live="polite" data-collapsed="false">
      <div class="lm-comms-header">
        <h3 class="lm-comms-title">Komunikacja</h3>
        <div class="lm-comms-filter" role="group" aria-label="Filtr fazy">
          <select class="lm-comms-select" id="lmCommsFilter"
                  aria-label="Filtruj komunikacje wg fazy">
            <option value="current">Aktywna faza</option>
            <option value="all">Wszystkie</option>
            <option value="strategy">Strategia</option>
            <option value="research">Research</option>
            <option value="debate1">Five Minds #1</option>
            <option value="build">Build</option>
            <option value="debate2">Five Minds #2</option>
            <option value="qa">QA</option>
          </select>
        </div>
      </div>
      <div class="lm-comms-scroll" id="lmCommsScroll" tabindex="0">
        <!-- Wiersze komunikacji generowane dynamicznie -->
        <!--
        <div class="lm-comm-row" data-phase="strategy" data-agent="orchestrator">
          <span class="lm-comm-ts">00:12</span>
          <span class="lm-comm-icon" aria-hidden="true"><svg>...</svg></span>
          <span class="lm-comm-from">Orkiestrator</span>
          <span class="lm-comm-arrow" aria-hidden="true">&#8594;</span>
          <span class="lm-comm-to">Planista</span>
          <span class="lm-comm-msg">"Definiuje architekture systemu..."</span>
        </div>
        -->
      </div>
    </aside>
  </div>

  <!-- ============================================================
       C) PHASE TIMELINE -- dolny stepper, 60px
       ============================================================ -->
  <nav class="lm-timeline" id="lmTimeline"
       role="navigation" aria-label="Fazy symulacji">
    <!-- Generowany dynamicznie: 6 step indicators -->
    <!--
    <div class="lm-tl-step" data-phase="strategy" data-tl-state="completed">
      <div class="lm-tl-connector" aria-hidden="true"></div>
      <div class="lm-tl-dot" aria-hidden="true">
        <svg class="lm-tl-check"><!-- checkmark --></svg>
      </div>
      <span class="lm-tl-label">STRAT</span>
    </div>
    <div class="lm-tl-step" data-phase="research" data-tl-state="active">
      <div class="lm-tl-connector lm-tl-connector-active" aria-hidden="true"></div>
      <div class="lm-tl-dot lm-tl-dot-active" aria-hidden="true"></div>
      <span class="lm-tl-label">RESEARCH</span>
    </div>
    -->
  </nav>

  <!-- ============================================================
       D) HITL DECISION PANEL -- blocking overlay wewnatrz monitora
       ============================================================ -->
  <div class="lm-hitl" id="lmHitl"
       role="alertdialog"
       aria-modal="true"
       aria-label="Punkt decyzyjny -- wymagana akcja"
       aria-describedby="lmHitlDesc"
       data-hitl-point=""
       hidden>
    <div class="lm-hitl-backdrop" aria-hidden="true"></div>
    <div class="lm-hitl-card">
      <div class="lm-hitl-header">
        <span class="lm-hitl-icon" aria-hidden="true">&#9995;</span>
        <h2 class="lm-hitl-title" id="lmHitlTitle">Punkt Decyzyjny</h2>
        <span class="lm-hitl-badge" id="lmHitlBadge">1/3</span>
      </div>
      <div class="lm-hitl-body" id="lmHitlDesc">
        <!-- Dynamiczna tresc zalezy od HITL point:
             - Po Strategy+Research: opis planu i badan
             - Po FM#1 Gold Solution: podsumowanie debaty + Gold Solution
             - Final Approval: raport koncowy
        -->
        <div class="lm-hitl-context" id="lmHitlContext">
          <!-- Kontekst decyzji renderowany tu -->
        </div>
      </div>
      <div class="lm-hitl-actions" role="group" aria-label="Opcje decyzji">
        <button class="lm-btn lm-hitl-btn lm-hitl-approve" id="lmHitlApprove"
                data-action="approve" accesskey="a"
                aria-label="Zatwierdz (A)">
          &#10003; Zatwierdz <kbd>A</kbd>
        </button>
        <button class="lm-btn lm-hitl-btn lm-hitl-modify" id="lmHitlModify"
                data-action="modify" accesskey="d"
                aria-label="Modyfikuj (D)">
          &#9998; Modyfikuj <kbd>D</kbd>
        </button>
        <button class="lm-btn lm-hitl-btn lm-hitl-reject" id="lmHitlReject"
                data-action="reject" accesskey="r"
                aria-label="Odrzuc / Re-debate (R)">
          &#8635; Re-debate <kbd>R</kbd>
        </button>
      </div>
      <div class="lm-hitl-timer" id="lmHitlTimer" hidden>
        <!-- Timer auto-approve -- WYLACZONY domyslnie, opt-in w settings -->
        <div class="lm-hitl-timer-bar" id="lmHitlTimerBar"></div>
        <span class="lm-hitl-timer-text" id="lmHitlTimerText">Auto-approve: 60s</span>
      </div>
    </div>
  </div>

  <!-- ============================================================
       E) DEBATE ARENA -- SHOULD HAVE, overlay wewnatrz monitora
       ============================================================ -->
  <div class="lm-debate" id="lmDebate"
       role="region"
       aria-label="Arena debaty Five Minds"
       data-debate-round="0"
       hidden>
    <div class="lm-debate-backdrop" aria-hidden="true"></div>
    <div class="lm-debate-panel">
      <div class="lm-debate-header">
        <h2 class="lm-debate-title">Five Minds Debate</h2>
        <span class="lm-debate-round" id="lmDebateRound">Runda 1/3</span>
        <button class="lm-btn lm-debate-close" id="lmDebateClose"
                aria-label="Zamknij arene debaty">&#10005;</button>
      </div>

      <!-- Polkole ekspertow + Gold Solution focal -->
      <div class="lm-debate-arena" id="lmDebateArena">
        <!-- 5 expert cards w polkolu - generowane dynamicznie -->
        <!--
        <div class="lm-debate-expert" data-expert="pragmatist"
             data-debate-state="speaking"
             style="--expert-angle: -60deg">
          <div class="lm-debate-expert-orb" aria-hidden="true">
            <svg><!-- expert icon --></svg>
          </div>
          <span class="lm-debate-expert-name">Pragmatyk</span>
          <div class="lm-debate-expert-speech">
            <p class="lm-debate-expert-text">"Proponuje podejscie modularne..."</p>
          </div>
        </div>
        -->

        <!-- Gold Solution card -- centrum polkola -->
        <div class="lm-debate-gold" id="lmDebateGold" hidden>
          <div class="lm-debate-gold-icon" aria-hidden="true">&#11088;</div>
          <h3 class="lm-debate-gold-title">Gold Solution</h3>
          <div class="lm-debate-gold-body" id="lmDebateGoldBody">
            <!-- Tresc syntezy -->
          </div>
        </div>
      </div>

      <!-- Nawigacja rundami -->
      <div class="lm-debate-nav" role="navigation" aria-label="Nawigacja debaty">
        <button class="lm-btn lm-debate-prev" id="lmDebatePrev"
                aria-label="Poprzednia runda" disabled>&#8592; Poprzednia</button>
        <div class="lm-debate-dots" aria-hidden="true">
          <span class="lm-debate-dot" data-round="1"></span>
          <span class="lm-debate-dot" data-round="2"></span>
          <span class="lm-debate-dot" data-round="3"></span>
        </div>
        <button class="lm-btn lm-debate-next" id="lmDebateNext"
                aria-label="Nastepna runda">Nastepna &#8594;</button>
      </div>
    </div>
  </div>

  <!-- ============================================================
       F) INTENT PREVIEW -- non-blocking info bar (SHOULD)
       ============================================================ -->
  <div class="lm-intent" id="lmIntent"
       role="status" aria-live="polite" hidden>
    <span class="lm-intent-icon" aria-hidden="true">&#128161;</span>
    <span class="lm-intent-text" id="lmIntentText">
      Nastepna faza: BUILD -- Backend, Frontend, Feature, Designer, Integrator beda pracowac rownolegle.
    </span>
    <button class="lm-btn lm-intent-dismiss" id="lmIntentDismiss"
            aria-label="Zamknij podglad">&#10005;</button>
  </div>

  <!-- ============================================================
       G) MISSION PULSE -- subtelna warstwa tla (SHOULD, 15 LOC)
       ============================================================ -->
  <div class="lm-pulse" id="lmPulse" aria-hidden="true"></div>

</div><!-- /lm-overlay -->
```

### 1.2 Hierarchia z-index

```
z-index stack (od najnizszego):
  1    -- body::before (mesh gradient)
  0    -- .bg-orb, .shooting-star
  1    -- .app
 55    -- .phase-bar, .sim-status (istniejace)
 80    -- .learn-overlay (istniejace)
100    -- .topbar, .statbar (istniejace)
200    -- .tt tooltips (istniejace)

--- LIVE MONITOR LAYER ---
300    -- .lm-overlay (caly monitor)
301    -- .lm-pulse (tlo)
310    -- .lm-topbar
320    -- .lm-grid-area
325    -- .lm-comms
330    -- .lm-timeline
340    -- .lm-intent (intent preview)
350    -- .lm-debate (debate arena overlay)
360    -- .lm-hitl (HITL decision -- najwyzszy w monitorze)

--- WYZEJ NIZ MONITOR ---
1000   -- .mo (istniejace modale -- zachowane bez zmian)
```

### 1.3 Lazy Initialization Flow

```
Sekwencja budowania DOM (LAZY -- dopiero przy pierwszym uzyciu):

1. User klika Live Monitor (btn lub M)
2. if (!window._lmLoaded) {
     a) Wstaw blok <style id="lm-styles"> z calym CSS Live Monitor
     b) Wstaw div.lm-overlay do document.body (innerHTML z szablonu)
     c) Zarejestruj event listenery (event delegation na #lmOverlay)
     d) window._lmLoaded = true
   }
3. Pokaz overlay: lmOverlay.hidden = false; lmOverlay.dataset.state = 'entering'
4. Po animacji: lmOverlay.dataset.state = 'active'
```

---

## 2. CSS Architecture

### 2.1 Prefix Convention

WSZYSTKIE nowe klasy CSS uzywaja prefixu `lm-` (live monitor). Zero konfliktow z istniejacymi klasami v21.

### 2.2 CSS Custom Properties (dodane do :root)

```css
/* Live Monitor custom properties -- dodac do istniejacego :root */
:root {
  /* Stan agentow -- kolory z Gold Solution */
  --lm-idle: #71717A;         /* szary */
  --lm-queued: #818CF8;       /* indigo */
  --lm-working: #34D399;      /* emerald */
  --lm-thinking: #FBBF24;     /* amber */
  --lm-done: #3B82F6;         /* NIEBIESKI -- zmiana z #22C55E! */
  --lm-error: #F87171;        /* red */
  --lm-hitl: #F59E0B;         /* gold */

  /* Fazy -- reuse istniejacych kolorow z PHASES */
  --lm-phase-strategy: #818CF8;
  --lm-phase-research: #34D399;
  --lm-phase-debate: #FBBF24;
  --lm-phase-build: #60A5FA;
  --lm-phase-qa: #F87171;

  /* Layout */
  --lm-topbar-h: 46px;
  --lm-timeline-h: 60px;
  --lm-comms-w: 280px;
  --lm-agent-card-w: 160px;
  --lm-agent-card-h: 90px;
  --lm-agent-mini-w: 80px;
  --lm-agent-mini-h: 40px;

  /* Timing */
  --lm-transition-fast: 150ms;
  --lm-transition-normal: 300ms;
  --lm-transition-slow: 500ms;

  /* Glassmorphism tokens */
  --lm-glass-bg: rgba(15, 15, 30, 0.88);
  --lm-glass-blur: blur(20px);
  --lm-glass-border: 1px solid rgba(129, 140, 248, 0.15);
}
```

### 2.3 Overlay Container

```css
/* ============================================================
   LIVE MONITOR OVERLAY
   ============================================================ */
.lm-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  flex-direction: column;
  background: var(--bg0);
  color: var(--t1);
  font-family: var(--bd);
  overflow: hidden;
  /* Nie uzywamy backdrop-filter na CALYM OVERLAYJU -- za duzo GPU */
}

/* Entry animation */
.lm-overlay[data-state="entering"] {
  animation: lmEnter var(--lm-transition-slow) cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.lm-overlay[data-state="active"] {
  opacity: 1;
  transform: none;
}
.lm-overlay[data-state="exiting"] {
  animation: lmExit var(--lm-transition-normal) cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.lm-overlay[hidden] {
  display: none;
}

@keyframes lmEnter {
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes lmExit {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.97); }
}
```

### 2.4 Topbar HUD

```css
.lm-topbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  height: var(--lm-topbar-h);
  background: var(--lm-glass-bg);
  backdrop-filter: var(--lm-glass-blur);
  -webkit-backdrop-filter: var(--lm-glass-blur);
  border-bottom: var(--lm-glass-border);
  position: relative;
  z-index: 310;
  flex-shrink: 0;
}

/* LIVE indicator */
.lm-live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #EF4444;
  animation: lmLivePulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}
.lm-live-label {
  font-family: var(--hd);
  font-size: 11px;
  font-weight: 700;
  color: #EF4444;
  letter-spacing: 0.08em;
}
@keyframes lmLivePulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  50%      { opacity: 0.6; box-shadow: 0 0 0 4px rgba(239, 68, 68, 0); }
}

.lm-tb-sep {
  width: 1px;
  height: 22px;
  background: var(--brd);
  flex-shrink: 0;
}

.lm-tb-phase {
  font-family: var(--hd);
  font-size: 12px;
  font-weight: 600;
  color: var(--t1);
  white-space: nowrap;
}
.lm-tb-phase-name {
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Progress bar */
.lm-tb-progress {
  width: 120px;
  height: 6px;
  background: rgba(129, 140, 248, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}
.lm-tb-progress-fill {
  height: 100%;
  width: 0%;
  background: var(--grad);
  border-radius: 3px;
  transition: width var(--lm-transition-normal) ease;
}
.lm-tb-progress-pct {
  position: absolute;
  right: -32px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--mn);
  font-size: 9px;
  color: var(--t2);
}

/* Metryki */
.lm-tb-metrics {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}
.lm-metric {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--mn);
  font-size: 11px;
  color: var(--t2);
}
.lm-metric-val {
  color: var(--t1);
  font-weight: 500;
  font-variant-numeric: tabular-nums; /* stala szerokosc cyfr */
}

.lm-tb-spacer { flex: 1; }

/* Przyciski topbar */
.lm-btn {
  padding: 5px 12px;
  border-radius: 8px;
  font-family: var(--hd);
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--lm-transition-fast);
  border: 1px solid var(--brd);
  background: rgba(22, 22, 42, 0.8);
  color: var(--t2);
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}
.lm-btn:hover {
  background: rgba(30, 30, 58, 0.9);
  color: var(--t1);
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.3), 0 0 20px rgba(129, 140, 248, 0.08);
}
.lm-btn:focus-visible {
  outline: 2px solid var(--accent1);
  outline-offset: 2px;
}

/* STOP button -- zawsze widoczny, wyrozniony */
.lm-btn-stop {
  background: rgba(248, 113, 113, 0.15);
  border-color: rgba(248, 113, 113, 0.4);
  color: var(--accent4);
  font-weight: 700;
  padding: 5px 16px;
}
.lm-btn-stop:hover {
  background: rgba(248, 113, 113, 0.3);
  box-shadow: 0 0 20px rgba(248, 113, 113, 0.2);
}
/* Emergency feedback */
.lm-btn-stop.lm-stop-active {
  animation: lmShake 0.3s ease-in-out;
}
@keyframes lmShake {
  0%, 100% { transform: translateX(0); }
  25%      { transform: translateX(-4px); }
  75%      { transform: translateX(4px); }
}
```

### 2.5 Agent Grid

```css
/* ============================================================
   AGENT GRID -- main content area
   ============================================================ */
.lm-main {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.lm-grid-area {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Phase group container */
.lm-phase-group {
  border: 1px solid var(--brd);
  border-radius: 12px;
  background: rgba(15, 15, 30, 0.5);
  overflow: hidden;
  transition: opacity var(--lm-transition-normal), filter var(--lm-transition-normal);
}

/* Phase states */
.lm-phase-group[data-phase-state="upcoming"] {
  opacity: 0.3;
  filter: grayscale(0.5);
}
.lm-phase-group[data-phase-state="active"] {
  opacity: 1;
  border-color: rgba(129, 140, 248, 0.3);
  box-shadow: 0 0 30px rgba(129, 140, 248, 0.05);
}
.lm-phase-group[data-phase-state="completed"] {
  opacity: 0.4; /* S4: Kontekstowy HUD dim */
  filter: grayscale(0.3);
}
.lm-phase-group[data-phase-state="completed"] .lm-phase-header::after {
  content: '\\2713'; /* checkmark */
  color: var(--lm-done);
  font-size: 14px;
  margin-left: auto;
}

/* Phase header */
.lm-phase-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(6, 6, 10, 0.4);
  border-bottom: 1px solid var(--brd);
  font-family: var(--hd);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.lm-phase-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
/* Kolor wskaznika ustawiany inline przez JS:
   style="background: var(--lm-phase-strategy)" */

.lm-phase-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--t1);
  letter-spacing: 0.06em;
}

.lm-phase-time {
  font-family: var(--mn);
  font-size: 9px;
  color: var(--t2);
}

/* Agent cards grid inside phase */
.lm-phase-agents {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--lm-agent-card-w), 1fr));
  gap: 8px;
  padding: 10px 14px;
}

/* Collapsed mode for completed phases */
.lm-phase-group[data-phase-state="completed"] .lm-phase-agents {
  grid-template-columns: repeat(auto-fill, minmax(var(--lm-agent-mini-w), 1fr));
  gap: 4px;
  padding: 6px 14px;
}
.lm-phase-group[data-phase-state="completed"] .lm-agent {
  min-height: var(--lm-agent-mini-h);
  padding: 4px 8px;
}
.lm-phase-group[data-phase-state="completed"] .lm-agent-progress,
.lm-phase-group[data-phase-state="completed"] .lm-agent-speech {
  display: none;
}
```

### 2.6 Agent Card (7 stanow)

```css
/* ============================================================
   AGENT CARD -- 7 state variants
   ============================================================ */
.lm-agent {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  min-height: var(--lm-agent-card-h);
  border: 1px solid var(--brd);
  border-radius: 10px;
  background: rgba(6, 6, 10, 0.6);
  cursor: pointer;
  transition:
    border-color var(--lm-transition-fast),
    opacity var(--lm-transition-normal),
    transform var(--lm-transition-fast),
    box-shadow var(--lm-transition-fast);
  position: relative;
  overflow: hidden;
}
.lm-agent:hover {
  border-color: rgba(129, 140, 248, 0.3);
  box-shadow: 0 0 20px rgba(129, 140, 248, 0.05);
}
.lm-agent:focus-visible {
  outline: 2px solid var(--accent1);
  outline-offset: 2px;
}

/* Orb z ikona SVG */
.lm-agent-orb {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--brd);
  background: rgba(6, 6, 10, 0.6);
  flex-shrink: 0;
  position: relative;
  transition: border-color var(--lm-transition-fast), box-shadow var(--lm-transition-fast);
}
.lm-agent-orb svg {
  width: 16px;
  height: 16px;
}

/* Info text */
.lm-agent-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0; /* flex overflow fix */
}
.lm-agent-name {
  font-family: var(--hd);
  font-size: 10px;
  font-weight: 600;
  color: var(--t1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lm-agent-state-label {
  font-family: var(--mn);
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  /* Kolor ustawiany przez data-state -- patrz nizej */
}

/* Progress bar */
.lm-agent-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(129, 140, 248, 0.08);
}
.lm-agent-progress-bar {
  height: 100%;
  width: 0%;
  border-radius: 0 0 10px 10px;
  transition: width 200ms linear;
  /* Kolor ustawiany inline przez JS na kolor aktywnej fazy */
}

/* Speech bubble */
.lm-agent-speech {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 15, 30, 0.95);
  border: 1px solid var(--brd);
  border-radius: 8px;
  padding: 4px 8px;
  font-family: var(--mn);
  font-size: 8px;
  color: var(--t1);
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  z-index: 5;
  opacity: 0;
  transition: opacity var(--lm-transition-fast);
}
.lm-agent-speech:not([hidden]) {
  opacity: 1;
}
/* strzalka dol */
.lm-agent-speech::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(15, 15, 30, 0.95);
}

/* ============================================================
   7 STATE VARIANTS -- data-state driven
   ============================================================ */

/* === IDLE === */
.lm-agent[data-state="idle"] {
  opacity: 0.5;
}
.lm-agent[data-state="idle"] .lm-agent-orb {
  border-color: var(--lm-idle);
}
.lm-agent[data-state="idle"] .lm-agent-state-label {
  color: var(--lm-idle);
}

/* === QUEUED === */
.lm-agent[data-state="queued"] {
  opacity: 0.7;
}
.lm-agent[data-state="queued"] .lm-agent-orb {
  border-color: rgba(129, 140, 248, 0.4);
  animation: lmPulse 2s ease-in-out infinite;
}
.lm-agent[data-state="queued"] .lm-agent-state-label {
  color: var(--lm-queued);
}
@keyframes lmPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(129, 140, 248, 0.2); }
  50%      { box-shadow: 0 0 0 4px rgba(129, 140, 248, 0); }
}

/* === WORKING === */
.lm-agent[data-state="working"] {
  opacity: 1;
  border-color: rgba(52, 211, 153, 0.25);
}
.lm-agent[data-state="working"] .lm-agent-orb {
  border-color: rgba(52, 211, 153, 0.5);
  box-shadow: 0 0 12px rgba(52, 211, 153, 0.15);
}
.lm-agent[data-state="working"] .lm-agent-orb::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 12px;
  border: 2px solid transparent;
  border-top-color: var(--lm-working);
  animation: lmSpin 0.8s linear infinite;
  pointer-events: none;
}
.lm-agent[data-state="working"] .lm-agent-state-label {
  color: var(--lm-working);
}
@keyframes lmSpin {
  to { transform: rotate(360deg); }
}

/* === THINKING === */
.lm-agent[data-state="thinking"] {
  opacity: 1;
  border-color: rgba(251, 191, 36, 0.2);
}
.lm-agent[data-state="thinking"] .lm-agent-orb {
  border-color: rgba(251, 191, 36, 0.4);
  animation: lmShimmer 1.5s ease-in-out infinite;
}
.lm-agent[data-state="thinking"] .lm-agent-state-label {
  color: var(--lm-thinking);
}
@keyframes lmShimmer {
  0%, 100% { box-shadow: 0 0 8px rgba(251, 191, 36, 0.1); }
  50%      { box-shadow: 0 0 16px rgba(251, 191, 36, 0.3); }
}

/* === DONE === BLUE (zmiana z zielonego -- fix daltonizm) */
.lm-agent[data-state="done"] {
  opacity: 0.7;
}
.lm-agent[data-state="done"] .lm-agent-orb {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.1);
}
.lm-agent[data-state="done"] .lm-agent-state-label {
  color: var(--lm-done);
}
/* Burst animation on transition to done */
.lm-agent[data-state="done"].lm-just-done .lm-agent-orb {
  animation: lmBurst 0.4s ease-out;
}
@keyframes lmBurst {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15); box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
  100% { transform: scale(1); }
}

/* === ERROR === */
.lm-agent[data-state="error"] {
  opacity: 1;
  border-color: rgba(248, 113, 113, 0.4);
}
.lm-agent[data-state="error"] .lm-agent-orb {
  border-color: rgba(248, 113, 113, 0.6);
  box-shadow: 0 0 12px rgba(248, 113, 113, 0.2);
  animation: lmShake 0.3s ease-in-out;
}
.lm-agent[data-state="error"] .lm-agent-state-label {
  color: var(--lm-error);
}

/* === HITL (waiting for human) === */
.lm-agent[data-state="hitl"] {
  opacity: 1;
  border-color: rgba(245, 158, 11, 0.4);
}
.lm-agent[data-state="hitl"] .lm-agent-orb {
  border-color: rgba(245, 158, 11, 0.6);
  animation: lmBeacon 1.2s ease-in-out infinite;
}
.lm-agent[data-state="hitl"] .lm-agent-state-label {
  color: var(--lm-hitl);
}
@keyframes lmBeacon {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.3); }
  50%      { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
}
```

### 2.7 Phase Timeline

```css
/* ============================================================
   PHASE TIMELINE -- bottom stepper
   ============================================================ */
.lm-timeline {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--lm-timeline-h);
  padding: 0 40px;
  background: var(--lm-glass-bg);
  backdrop-filter: var(--lm-glass-blur);  /* 2/3 backdrop-filter budget */
  -webkit-backdrop-filter: var(--lm-glass-blur);
  border-top: var(--lm-glass-border);
  flex-shrink: 0;
  z-index: 330;
  gap: 0; /* steps contain their own connectors */
}

.lm-tl-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
  flex: 1;
  max-width: 140px;
}

/* Connector line between steps */
.lm-tl-connector {
  position: absolute;
  top: 10px;
  left: calc(-50% + 10px);
  right: calc(50% + 10px);
  height: 2px;
  background: rgba(129, 140, 248, 0.15);
  transition: background var(--lm-transition-normal);
}
.lm-tl-step:first-child .lm-tl-connector {
  display: none;
}

/* Dot indicator */
.lm-tl-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(129, 140, 248, 0.2);
  background: var(--bg0);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  transition:
    border-color var(--lm-transition-normal),
    background var(--lm-transition-normal),
    box-shadow var(--lm-transition-normal);
}

.lm-tl-label {
  font-family: var(--hd);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--t3);
  transition: color var(--lm-transition-normal);
}

/* SVG checkmark inside dot (hidden by default) */
.lm-tl-check {
  display: none;
  width: 10px;
  height: 10px;
}

/* Timeline states via data-tl-state */
.lm-tl-step[data-tl-state="completed"] .lm-tl-dot {
  background: var(--lm-done);
  border-color: var(--lm-done);
}
.lm-tl-step[data-tl-state="completed"] .lm-tl-check {
  display: block;
  color: white;
}
.lm-tl-step[data-tl-state="completed"] .lm-tl-label {
  color: var(--lm-done);
}
.lm-tl-step[data-tl-state="completed"] .lm-tl-connector {
  background: var(--lm-done);
}

.lm-tl-step[data-tl-state="active"] .lm-tl-dot {
  border-color: var(--accent1);
  box-shadow: 0 0 12px rgba(129, 140, 248, 0.3);
  animation: lmPulse 2s ease-in-out infinite;
}
.lm-tl-step[data-tl-state="active"] .lm-tl-label {
  color: var(--t1);
  font-weight: 700;
}
.lm-tl-step[data-tl-state="active"] .lm-tl-connector {
  background: linear-gradient(90deg, var(--lm-done), var(--accent1));
}

.lm-tl-step[data-tl-state="upcoming"] .lm-tl-dot {
  opacity: 0.4;
}
.lm-tl-step[data-tl-state="upcoming"] .lm-tl-label {
  color: var(--t3);
  opacity: 0.5;
}
```

### 2.8 Comms Log

```css
/* ============================================================
   COMMS LOG -- right panel
   ============================================================ */
.lm-comms {
  width: var(--lm-comms-w);
  display: flex;
  flex-direction: column;
  border-left: var(--lm-glass-border);
  background: rgba(6, 6, 10, 0.7);
  flex-shrink: 0;
  transition: width var(--lm-transition-normal), opacity var(--lm-transition-normal);
  z-index: 325;
}
.lm-comms[data-collapsed="true"] {
  width: 0;
  overflow: hidden;
  opacity: 0;
  border-left: none;
}

.lm-comms-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid var(--brd);
  flex-shrink: 0;
}
.lm-comms-title {
  font-family: var(--hd);
  font-size: 11px;
  font-weight: 700;
  color: var(--t1);
}

.lm-comms-select {
  background: rgba(6, 6, 10, 0.6);
  border: 1px solid var(--brd);
  border-radius: 6px;
  color: var(--t2);
  font-family: var(--mn);
  font-size: 9px;
  padding: 2px 6px;
  cursor: pointer;
}
.lm-comms-select:focus-visible {
  outline: 2px solid var(--accent1);
  outline-offset: 1px;
}

.lm-comms-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.lm-comms-scroll::-webkit-scrollbar { width: 4px; }
.lm-comms-scroll::-webkit-scrollbar-thumb {
  background: rgba(129, 140, 248, 0.15);
  border-radius: 2px;
}

/* Message row */
.lm-comm-row {
  display: flex;
  gap: 4px;
  align-items: flex-start;
  padding: 3px 4px;
  border-bottom: 1px solid rgba(129, 140, 248, 0.03);
  font-family: var(--mn);
  font-size: 9px;
  line-height: 1.5;
  animation: lmCommIn var(--lm-transition-fast) ease;
}
@keyframes lmCommIn {
  from { opacity: 0; transform: translateX(8px); }
  to   { opacity: 1; transform: translateX(0); }
}

.lm-comm-ts {
  color: var(--t3);
  flex-shrink: 0;
  min-width: 30px;
  font-variant-numeric: tabular-nums;
}
.lm-comm-icon {
  flex-shrink: 0;
  width: 12px;
  text-align: center;
}
.lm-comm-from {
  font-weight: 600;
  flex-shrink: 0;
  min-width: 60px;
  /* Kolor ustawiany przez data-phase na row -- patrz nizej */
}
.lm-comm-arrow {
  color: var(--t3);
  flex-shrink: 0;
}
.lm-comm-to {
  color: var(--t2);
  flex-shrink: 0;
}
.lm-comm-msg {
  color: var(--t1);
  flex: 1;
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Phase-colored from labels */
.lm-comm-row[data-phase="strategy"] .lm-comm-from { color: var(--lm-phase-strategy); }
.lm-comm-row[data-phase="research"] .lm-comm-from { color: var(--lm-phase-research); }
.lm-comm-row[data-phase="debate1"] .lm-comm-from,
.lm-comm-row[data-phase="debate2"] .lm-comm-from { color: var(--lm-phase-debate); }
.lm-comm-row[data-phase="build"] .lm-comm-from    { color: var(--lm-phase-build); }
.lm-comm-row[data-phase="qa"] .lm-comm-from       { color: var(--lm-phase-qa); }
```

### 2.9 HITL Decision Panel

```css
/* ============================================================
   HITL DECISION PANEL
   ============================================================ */
.lm-hitl {
  position: absolute;
  inset: 0;
  z-index: 360;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lm-hitl[hidden] { display: none; }

.lm-hitl-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(6, 6, 10, 0.6);
  /* NIE uzywamy backdrop-filter tu -- budzetowe 3 panele juz wyczerpane */
}

.lm-hitl-card {
  position: relative;
  width: 90%;
  max-width: 520px;
  background: rgba(15, 15, 30, 0.95);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 16px;
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(245, 158, 11, 0.08);
  overflow: hidden;
  animation: lmHitlIn var(--lm-transition-slow) cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes lmHitlIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.lm-hitl-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(245, 158, 11, 0.15);
  background: rgba(245, 158, 11, 0.05);
}
.lm-hitl-icon {
  font-size: 18px;
  animation: lmBeacon 1.2s ease-in-out infinite;
}
.lm-hitl-title {
  font-family: var(--hd);
  font-size: 16px;
  font-weight: 700;
  color: var(--accent3);
  flex: 1;
}
.lm-hitl-badge {
  font-family: var(--mn);
  font-size: 10px;
  color: var(--t2);
  padding: 2px 8px;
  border: 1px solid var(--brd);
  border-radius: 4px;
}

.lm-hitl-body {
  padding: 16px 18px;
  max-height: 40vh;
  overflow-y: auto;
}
.lm-hitl-context {
  font-size: 12px;
  line-height: 1.7;
  color: var(--t1);
}
.lm-hitl-context h4 {
  font-family: var(--hd);
  font-size: 12px;
  font-weight: 700;
  margin: 10px 0 4px;
  color: var(--accent1);
}
.lm-hitl-context ul {
  margin: 4px 0 8px 16px;
  font-size: 11px;
  color: var(--t2);
}
.lm-hitl-context ul li {
  margin-bottom: 2px;
}

.lm-hitl-actions {
  display: flex;
  gap: 8px;
  padding: 12px 18px;
  border-top: 1px solid var(--brd);
  justify-content: center;
}

/* HITL button variants */
.lm-hitl-btn {
  padding: 8px 20px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 10px;
}
.lm-hitl-btn kbd {
  font-family: var(--mn);
  font-size: 9px;
  padding: 1px 4px;
  border: 1px solid var(--brd);
  border-radius: 3px;
  margin-left: 4px;
  opacity: 0.6;
}

.lm-hitl-approve {
  background: rgba(52, 211, 153, 0.15);
  border-color: rgba(52, 211, 153, 0.4);
  color: var(--accent2);
}
.lm-hitl-approve:hover {
  background: rgba(52, 211, 153, 0.25);
  box-shadow: 0 0 20px rgba(52, 211, 153, 0.15);
}

.lm-hitl-modify {
  background: rgba(129, 140, 248, 0.12);
  border-color: rgba(129, 140, 248, 0.3);
  color: var(--accent1);
}
.lm-hitl-modify:hover {
  background: rgba(129, 140, 248, 0.2);
  box-shadow: 0 0 20px rgba(129, 140, 248, 0.1);
}

.lm-hitl-reject {
  background: rgba(248, 113, 113, 0.12);
  border-color: rgba(248, 113, 113, 0.3);
  color: var(--accent4);
}
.lm-hitl-reject:hover {
  background: rgba(248, 113, 113, 0.2);
  box-shadow: 0 0 20px rgba(248, 113, 113, 0.1);
}

/* Timer bar (opt-in, hidden domyslnie) */
.lm-hitl-timer {
  padding: 6px 18px;
  border-top: 1px solid var(--brd);
}
.lm-hitl-timer[hidden] { display: none; }
.lm-hitl-timer-bar {
  height: 3px;
  background: rgba(245, 158, 11, 0.15);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
.lm-hitl-timer-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: var(--accent3);
  transform-origin: left;
  /* width kontrolowany inline przez JS: scaleX(remaining/total) */
}
.lm-hitl-timer-text {
  font-family: var(--mn);
  font-size: 9px;
  color: var(--t3);
  display: block;
  text-align: center;
  margin-top: 3px;
}
```

### 2.10 Debate Arena (SHOULD)

```css
/* ============================================================
   DEBATE ARENA -- SHOULD HAVE (~200 LOC total with JS)
   ============================================================ */
.lm-debate {
  position: absolute;
  inset: 0;
  z-index: 350;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lm-debate[hidden] { display: none; }

.lm-debate-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(6, 6, 10, 0.7);
}

.lm-debate-panel {
  position: relative;
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  background: rgba(15, 15, 30, 0.95);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 16px;
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(251, 191, 36, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.lm-debate-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-bottom: 1px solid rgba(251, 191, 36, 0.15);
  background: rgba(251, 191, 36, 0.04);
}
.lm-debate-title {
  font-family: var(--hd);
  font-size: 15px;
  font-weight: 700;
  color: var(--accent3);
  flex: 1;
}
.lm-debate-round {
  font-family: var(--mn);
  font-size: 10px;
  color: var(--t2);
}

/* Polkole ekspertow */
.lm-debate-arena {
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  position: relative;
  min-height: 280px;
}

/* Expert card w polkolu -- pozycja przez CSS custom property --expert-angle */
.lm-debate-expert {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 110px;
  padding: 10px 8px;
  border: 1px solid var(--brd);
  border-radius: 12px;
  background: rgba(6, 6, 10, 0.6);
  transition: border-color var(--lm-transition-fast), box-shadow var(--lm-transition-fast);
}

/* Expert states */
.lm-debate-expert[data-debate-state="speaking"] {
  border-color: rgba(251, 191, 36, 0.4);
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.1);
}
.lm-debate-expert[data-debate-state="done"] {
  opacity: 0.6;
}

.lm-debate-expert-orb {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--accent3);
  background: rgba(245, 158, 11, 0.08);
}
.lm-debate-expert-orb svg {
  width: 18px;
  height: 18px;
  color: var(--accent3);
}

.lm-debate-expert-name {
  font-family: var(--hd);
  font-size: 9px;
  font-weight: 700;
  color: var(--t1);
  text-align: center;
}

.lm-debate-expert-speech {
  font-family: var(--bd);
  font-size: 10px;
  color: var(--t2);
  line-height: 1.5;
  text-align: center;
  padding: 4px 0;
  max-height: 60px;
  overflow-y: auto;
}

/* Gold Solution focal card -- centrum */
.lm-debate-gold {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 400px;
  padding: 12px 16px;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 12px;
  text-align: center;
}
.lm-debate-gold[hidden] { display: none; }
.lm-debate-gold-icon {
  font-size: 20px;
  margin-bottom: 4px;
}
.lm-debate-gold-title {
  font-family: var(--hd);
  font-size: 13px;
  font-weight: 700;
  color: var(--accent3);
  margin-bottom: 6px;
}
.lm-debate-gold-body {
  font-size: 11px;
  color: var(--t1);
  line-height: 1.6;
  max-height: 100px;
  overflow-y: auto;
}

/* Debate navigation */
.lm-debate-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 10px 18px;
  border-top: 1px solid var(--brd);
}
.lm-debate-dots {
  display: flex;
  gap: 6px;
}
.lm-debate-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brd);
  transition: background var(--lm-transition-fast);
}
.lm-debate-dot.active {
  background: var(--accent3);
  box-shadow: 0 0 6px rgba(251, 191, 36, 0.4);
}
```

### 2.11 Intent Preview (SHOULD)

```css
/* ============================================================
   INTENT PREVIEW -- non-blocking info bar
   ============================================================ */
.lm-intent {
  position: absolute;
  bottom: calc(var(--lm-timeline-h) + 8px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 340;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(15, 15, 30, 0.9);
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  font-family: var(--bd);
  font-size: 11px;
  color: var(--t1);
  max-width: 80%;
  animation: lmIntentIn var(--lm-transition-normal) ease;
}
.lm-intent[hidden] { display: none; }
@keyframes lmIntentIn {
  from { opacity: 0; transform: translateX(-50%) translateY(8px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
.lm-intent-icon {
  font-size: 14px;
  flex-shrink: 0;
}
.lm-intent-text {
  flex: 1;
}
.lm-intent-dismiss {
  padding: 2px 6px;
  font-size: 12px;
}
```

### 2.12 Mission Pulse (SHOULD, 15 LOC)

```css
/* ============================================================
   MISSION PULSE -- breathing background (15 LOC CSS)
   ============================================================ */
.lm-pulse {
  position: absolute;
  inset: 0;
  z-index: 301;
  pointer-events: none;
  background: radial-gradient(ellipse 80% 80% at 50% 50%,
    rgba(129, 140, 248, 0.03) 0%,
    transparent 70%);
  animation: lmMissionPulse 4s ease-in-out infinite;
}
@keyframes lmMissionPulse {
  0%, 100% { opacity: 0.3; }
  50%      { opacity: 0.7; }
}
```

### 2.13 Reduced Motion + Responsive

```css
/* ============================================================
   PREFERS-REDUCED-MOTION -- OBOWIAZKOWE od dnia 1
   ============================================================ */
@media (prefers-reduced-motion: reduce) {
  .lm-overlay[data-state="entering"],
  .lm-overlay[data-state="exiting"] {
    animation: none;
  }
  .lm-live-dot,
  .lm-agent-orb,
  .lm-agent[data-state="queued"] .lm-agent-orb,
  .lm-agent[data-state="working"] .lm-agent-orb::after,
  .lm-agent[data-state="thinking"] .lm-agent-orb,
  .lm-agent[data-state="hitl"] .lm-agent-orb,
  .lm-tl-step[data-tl-state="active"] .lm-tl-dot,
  .lm-hitl-icon,
  .lm-pulse {
    animation: none !important;
  }
  .lm-comm-row {
    animation: none;
  }
  .lm-hitl-card {
    animation: none;
  }
  .lm-agent[data-state="working"] .lm-agent-orb::after {
    display: none; /* usun spinner */
  }
  /* Zachowaj kolor + label (dwa pozostale kanaly) */
}

/* ============================================================
   RESPONSIVE -- desktop-first, compact na 13" (1366px)
   ============================================================ */
@media (max-width: 1400px) {
  :root {
    --lm-comms-w: 220px;
    --lm-agent-card-w: 140px;
    --lm-agent-card-h: 78px;
  }
  .lm-tb-metrics { gap: 8px; }
  .lm-metric { font-size: 10px; }
}

@media (max-width: 1100px) {
  :root {
    --lm-comms-w: 180px;
    --lm-agent-card-w: 120px;
  }
  .lm-tb-progress { width: 80px; }
}
```

### 2.14 Backdrop-Filter Budget

Gold Solution limituje do MAX 3 jednoczesnych `backdrop-filter` paneli. Allokacja:

| # | Element | backdrop-filter |
|---|---------|----------------|
| 1 | `.lm-topbar` | `blur(20px)` |
| 2 | `.lm-timeline` | `blur(20px)` |
| 3 | Zarezerwowane na `.lm-hitl-card` LUB `.lm-debate-panel` (nigdy oba naraz) | `blur(20px)` -- wstawic warunkowo tylko gdy widoczny |

Wszystkie inne elementy (.lm-comms, .lm-phase-group, .lm-agent) uzywaja SOLID background BEZ backdrop-filter. Fallback:

```css
@supports not (backdrop-filter: blur(1px)) {
  .lm-topbar,
  .lm-timeline {
    background: rgba(15, 15, 30, 0.96); /* solid fallback */
  }
}
```

---

## 3. Component Specifications

### 3a. Live Monitor Overlay Container

| Wlasciwosc | Wartosc |
|-------------|---------|
| Position | `fixed`, `inset: 0` |
| z-index | `300` |
| Background | `var(--bg0)` (solid, NIE backdrop-filter) |
| Entry animation | `lmEnter 500ms cubic-bezier(0.4,0,0.2,1)` -- opacity 0->1, scale 0.97->1 |
| Exit animation | `lmExit 300ms` -- odwrotnosc |
| View Transitions | `if (document.startViewTransition) { document.startViewTransition(() => toggle()) }` |
| State data-attr | `data-state="closed|entering|active|exiting"` |
| ARIA | `role="dialog"`, `aria-modal="true"`, `aria-label` |
| Hidden | Atrybut `hidden` gdy zamkniety (nie `display:none` w CSS) |

### 3b. Agent Grid (fullscreen)

| Wlasciwosc | Wartosc |
|-------------|---------|
| Layout | Flex column (phase groups stacked vertically) |
| Phase group inner | CSS Grid: `repeat(auto-fill, minmax(160px, 1fr))` |
| Agent card size | 160x90px (active), 80x40px (completed) |
| 7 stanow agentow | Sterowane WYLACZNIE przez `data-state` na `.lm-agent` |
| Phase grouping | `data-phase-state` na `.lm-phase-group`: `upcoming`, `active`, `completed` |
| Progresywny reveal | `upcoming`: opacity 0.3 + grayscale. `completed`: opacity 0.4 + grayscale 0.3. `active`: pelna widocznosc + box-shadow glow |
| Overflow | `overflow-y: auto` na `.lm-grid-area` |

**7 state variants -- summary:**

| State | Kolor | Animacja orb | Label | Opacity karty |
|-------|-------|-------------|-------|---------------|
| `idle` | `--lm-idle` (#71717A szary) | brak | "Idle" | 0.5 |
| `queued` | `--lm-queued` (#818CF8 indigo) | `lmPulse` 2s | "Queued" | 0.7 |
| `working` | `--lm-working` (#34D399 emerald) | `lmSpin` 0.8s spinner ring | "Working" | 1.0 |
| `thinking` | `--lm-thinking` (#FBBF24 amber) | `lmShimmer` 1.5s | "Thinking" | 1.0 |
| `done` | `--lm-done` (#3B82F6 BLUE) | `lmBurst` 0.4s jednorazowo | "Done" | 0.7 |
| `error` | `--lm-error` (#F87171 red) | `lmShake` 0.3s | "Error" | 1.0 |
| `hitl` | `--lm-hitl` (#F59E0B gold) | `lmBeacon` 1.2s | "Waiting" | 1.0 |

**Trzy kanaly rozrozniania** (wymog a11y -- daltonizm 8% mezczyzn):
1. Kolor (border + glow)
2. Animacja (spinner/pulse/shimmer/beacon/shake/burst/brak)
3. Text label (obowiazkowy, `font-size: 8px`, uppercase)

### 3c. Phase Timeline

| Wlasciwosc | Wartosc |
|-------------|---------|
| Layout | Flexbox, row, centered, `gap: 0` (connectors sa wewnatrz steps) |
| Height | 60px |
| Steps | 6 max (strategy, research, debate1, build, debate2, qa) |
| Dot size | 20x20px circle |
| Connector | 2px height line, `position: absolute` miedzy dots |
| States | `data-tl-state` = `upcoming`, `active`, `completed` |
| Active | glow ring + pulse animation + bold label |
| Completed | blue fill + SVG checkmark + blue connector |
| Upcoming | opacity 0.4 |

**SVG Checkmark wewnatrz dot (dla stanu completed):**
```html
<svg class="lm-tl-check" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2">
  <polyline points="2,5 4.5,7.5 8,3"/>
</svg>
```

### 3d. Metrics HUD

Metryki sa czescia topbar (nie oddzielny komponent). Max 5 metryk na topbar.

| Metryka | Element id | Format | Aktualizacja |
|---------|-----------|--------|-------------|
| Czas | `#lmTime` | `MM:SS` | Co 1s przez AnimationManager |
| Aktywni agenci | `#lmActiveAgents`/`#lmTotalAgents` | `N/M` | Przy zmianie stanu agenta |
| Faza | `#lmPhaseNum`/`#lmPhaseName` | `N/6: NAME` | Przy zmianie fazy |
| Progress | `#lmProgressFill` + `#lmProgressPct` | `N%` + width bar | Przy zmianie fazy |

**Counter animation approach:**
- Zmiana tekstu: bezposredni `textContent` update (zero animacji na cyfrach -- jest czytelniejszy)
- Progress bar: CSS `transition: width 300ms ease` na fill
- `font-variant-numeric: tabular-nums` na WSZYSTKICH cyfrach metrycznych -- zapobiega "skakaniu" tekstu

### 3e. HITL Panel

| Wlasciwosc | Wartosc |
|-------------|---------|
| Typ | Modal overlay WEWNATRZ monitora (nie `.mo` -- nie istniejacy system modali) |
| Position | `absolute, inset: 0` wewnatrz `.lm-overlay` |
| z-index | 360 (najwyzszy w monitorze) |
| Backdrop | `rgba(6,6,10,0.6)` BEZ blur (budzetowe ograniczenie) |
| Card width | `max-width: 520px`, `width: 90%` |
| Entry animation | `lmHitlIn 500ms cubic-bezier(0.34, 1.56, 0.64, 1)` (spring) |
| Buttons | 3: Approve (green), Modify (indigo), Re-debate (red) |
| Keyboard | `A` = approve, `D` = modify, `R` = re-debate |
| Timer | HIDDEN domyslnie (`hidden` attr). Opt-in w settings. Default 60s. |
| Backdrop-filter | NIE na backdrop (budzetowe). TAK na card JESLI timeline nie jest jednoczesnie widoczna. W praktyce: nie dodawac backdrop-filter na card. |
| Focus trap | TAK -- Tab cycle miedzy 3 przyciskami |
| Badge | `1/3`, `2/3`, `3/3` -- wskazuje ktory to HITL point |

**3 HITL decision points (z Gold Solution):**

| # | data-hitl-point | Po czym | Tytul | Opcje |
|---|----------------|---------|-------|-------|
| 1 | `"post-strategy-research"` | Strategy + Research | "Plan i badania gotowe" | Approve / Modify / Re-debate |
| 2 | `"post-fm1-gold"` | Five Minds #1 Gold Solution | "Gold Solution gotowa" | Approve / Modify / Re-debate |
| 3 | `"final-approval"` | QA complete | "Pipeline zakonczony" | Deploy / Reject / Re-debate |

### 3f. Debate Arena (SHOULD)

| Wlasciwosc | Wartosc |
|-------------|---------|
| Layout | 5 expert cards w wrap flex (vizualny polkol na duzych ekranach), Gold Solution focal card na dole |
| Card size | 110px szerokosc |
| Rundy | 3: Opinie -> Debata -> Synteza (Gold Solution) |
| Nawigacja | Prev/Next buttons + dot indicators |
| Expert states | `data-debate-state`: `waiting`, `speaking`, `done` |
| Keyboard | Left/Right arrows miedzy rundami |
| Expert orb | 40px circle z border accent3, SVG icon |
| Nie animowane typing indicators | BRAK -- statyczny tekst (decyzja Gold Solution) |

**3 rundy debaty -- zawartosc:**

| Runda | Tresc | Gold Solution |
|-------|-------|---------------|
| 1 -- Opinie | Kazdy ekspert wyswietla swoja pozycje | hidden |
| 2 -- Debata | Eksperci reaguja na siebie | hidden |
| 3 -- Synteza | Eksperci zwijaja sie do `done` | visible -- Gold Solution focal card |

### 3g. Comms Log

| Wlasciwosc | Wartosc |
|-------------|---------|
| Position | Prawy panel, `width: 280px`, collapsible |
| Toggle | Przycisk w topbar, `data-collapsed` attribute |
| Scroll | `overflow-y: auto`, CSS-driven smooth scroll |
| Auto-scroll | JS: `scrollTop = scrollHeight` po kazdym nowym wierszu, CHYBA ZE user recznie scrollowal wyzej |
| Filtr | `<select>` -- domyslny "Aktywna faza", zmienia `display` na rows z nieodpowiednim `data-phase` |
| Izolacja scroll | `e.stopPropagation()` na wheel event wewnatrz scroll container |
| Max rows | Soft limit 200 widocznych, starsze `display: none` (nie usuwaj DOM -- potrzebne do ewentualnego replay) |
| Row animation | `lmCommIn 150ms ease` -- fade + slide from right |

**Auto-scroll behavior (pseudokod):**
```javascript
// Sprawdz czy user jest "na dole" (tolerance 40px)
const scroll = lmCommsScroll;
const isAtBottom = scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 40;
// Po dodaniu nowego wiersza:
if (isAtBottom) {
  scroll.scrollTop = scroll.scrollHeight;
}
```

### 3h. Control Bar (Emergency STOP)

Emergency STOP NIE jest oddzielnym control barem na dole (to by kolidowalo z timeline). STOP jest w topbar (sekcja 2.4). Specyfikacja przycisku:

| Wlasciwosc | Wartosc |
|-------------|---------|
| Position | W `.lm-topbar`, zawsze widoczny |
| Wielkosc | Wiekszy niz inne przyciski: `padding: 5px 16px` |
| Kolor | Red theme: `background: rgba(248,113,113,0.15)`, `border: rgba(248,113,113,0.4)` |
| Feedback | Po kliknieciu: `lmShake` 0.3s na przycisku, red flash na `body` (CSS class `lm-stop-flash`) |
| Keyboard | `S` (gdy monitor aktywny) |
| Zachowanie | Wywoluje `simStop()` + zamyka HITL/Debate jesli otwarte + resetuje stan monitora |

```css
/* Red flash feedback na STOP */
.lm-overlay.lm-stop-flash {
  animation: lmStopFlash 0.3s ease;
}
@keyframes lmStopFlash {
  0%, 100% { box-shadow: inset 0 0 0 0 transparent; }
  50%      { box-shadow: inset 0 0 80px rgba(248, 113, 113, 0.15); }
}
```

---

## 4. Keyboard Navigation

### 4.1 Tab Order (tabindex)

```
Naturalny tab flow w Live Monitor:
1. lmPauseBtn (topbar)
2. lmCommsToggle (topbar)
3. lmStopBtn (topbar)
4. lmCloseBtn (topbar)
5. lmCommsFilter (comms select)
6. lmCommsScroll (tabindex=0, scrollable)
7. Karty agentow (tabindex=0 na kazdej .lm-agent)
8. Timeline steps (info only, nie focusable)

Gdy HITL otwarty -- focus trap:
1. lmHitlApprove
2. lmHitlModify
3. lmHitlReject
(Tab z Reject wraca do Approve)

Gdy Debate otwarty -- focus trap:
1. lmDebateClose
2. lmDebatePrev
3. lmDebateNext
(Tab z Next wraca do Close)
```

### 4.2 Focus Trap Implementation

```javascript
// Pseudokod -- focus trap pattern
function trapFocus(containerEl) {
  const focusable = containerEl.querySelectorAll(
    'button:not([disabled]), [tabindex="0"], select, input'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  containerEl.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  first.focus(); // auto-focus pierwszy element
}
```

### 4.3 Shortcuts

| Klawisz | Kontekst | Akcja |
|---------|----------|-------|
| `M` | Canvas (istniejacy) | Toggle Live Monitor |
| `Escape` | Monitor aktywny | Zamknij monitor (powrot do canvas) |
| `Escape` | HITL otwarty | NIE zamyka HITL (decyzja wymagana) -- zamyka monitor |
| `Space` | Monitor aktywny | Pauza/resume symulacji |
| `S` | Monitor aktywny | Emergency STOP |
| `A` | HITL otwarty | Approve |
| `D` | HITL otwarty | Modify |
| `R` | HITL otwarty | Re-debate / Reject |
| `ArrowLeft` | Debate Arena | Poprzednia runda |
| `ArrowRight` | Debate Arena | Nastepna runda |

**Implementacja shortcuts -- event delegation na overlayju:**
```javascript
lmOverlay.addEventListener('keydown', e => {
  if (lmOverlay.dataset.state !== 'active') return;

  const k = e.key.toLowerCase();

  // HITL shortcuts (najwyzszy priorytet)
  if (!lmHitl.hidden) {
    if (k === 'a') { lmHitlApprove.click(); e.preventDefault(); return; }
    if (k === 'd') { lmHitlModify.click(); e.preventDefault(); return; }
    if (k === 'r') { lmHitlReject.click(); e.preventDefault(); return; }
    return; // Block inne shortcuts gdy HITL otwarty
  }

  // Debate shortcuts
  if (!lmDebate.hidden) {
    if (k === 'arrowleft')  { lmDebatePrev.click(); e.preventDefault(); return; }
    if (k === 'arrowright') { lmDebateNext.click(); e.preventDefault(); return; }
  }

  // Monitor-level shortcuts
  if (k === 'escape') { closeLiveMonitor(); e.preventDefault(); return; }
  if (k === ' ')      { togglePause(); e.preventDefault(); return; }
  if (k === 's')      { emergencyStop(); e.preventDefault(); return; }
});
```

---

## 5. State Management Interface

### 5.1 data-* Attributes -- Pelna mapa

| Element | Atrybut | Wartosci | Zmieniane przez |
|---------|---------|----------|-----------------|
| `#lmOverlay` | `data-state` | `closed`, `entering`, `active`, `exiting` | `openLM()`, `closeLM()` |
| `.lm-agent` | `data-state` | `idle`, `queued`, `working`, `thinking`, `done`, `error`, `hitl` | `lmSetAgentState(agentId, state)` |
| `.lm-agent` | `data-agent` | Agent ID string (np. `orchestrator`) | Build-time |
| `.lm-agent` | `data-phase` | Phase ID string (np. `strategy`) | Build-time |
| `.lm-phase-group` | `data-phase` | Phase ID string | Build-time |
| `.lm-phase-group` | `data-phase-state` | `upcoming`, `active`, `completed` | `lmSetPhaseState(phaseId, state)` |
| `.lm-tl-step` | `data-phase` | Phase ID string | Build-time |
| `.lm-tl-step` | `data-tl-state` | `upcoming`, `active`, `completed` | `lmSetPhaseState()` (sync z phase group) |
| `.lm-comm-row` | `data-phase` | Phase ID string | Build-time |
| `.lm-comm-row` | `data-agent` | Agent ID string | Build-time |
| `#lmHitl` | `data-hitl-point` | `post-strategy-research`, `post-fm1-gold`, `final-approval` | `lmShowHitl(point)` |
| `#lmDebate` | `data-debate-round` | `0`, `1`, `2`, `3` | `lmSetDebateRound(n)` |
| `.lm-debate-expert` | `data-expert` | Expert ID | Build-time |
| `.lm-debate-expert` | `data-debate-state` | `waiting`, `speaking`, `done` | `lmSetDebateRound()` |
| `.lm-debate-dot` | `data-round` | `1`, `2`, `3` | Build-time |
| `#lmComms` | `data-collapsed` | `true`, `false` | `lmToggleComms()` |
| `#lmProgressBar` | `aria-valuenow` | `0`-`100` | `lmUpdateProgress(pct)` |
| `.lm-metric` | `data-metric` | `time`, `agents` | Build-time |

### 5.2 CSS Custom Properties uzywane dynamicznie

```css
/* Ustawiane przez JS na :root lub na konkretnym elemencie */

/* Mission Pulse intensywnosc -- synchronizowana z aktywnoscia agentow */
--lm-pulse-intensity: 0.3; /* 0.3 = idle, 0.7 = peak activity */

/* Aktualny kolor fazy -- uzywany w progress bars, borders */
--lm-current-phase-color: #818CF8; /* zmieniane przy zmianie fazy */
```

### 5.3 classList API -- Pattern uzycia

```javascript
// Zmiana stanu agenta -- JEDYNY punkt zmiany
function lmSetAgentState(agentId, newState) {
  const el = document.getElementById('lmAgent-' + agentId);
  if (!el) return;

  const oldState = el.dataset.state;
  if (oldState === newState) return; // skip noop

  el.dataset.state = newState; // CSS robi reszte

  // Label tekstowy (obowiazkowy -- a11y)
  const LABELS = {
    idle: 'Idle', queued: 'Queued', working: 'Working',
    thinking: 'Thinking', done: 'Done', error: 'Error', hitl: 'Waiting'
  };
  const label = el.querySelector('.lm-agent-state-label');
  if (label) label.textContent = LABELS[newState] || newState;

  // ARIA
  const name = el.querySelector('.lm-agent-name')?.textContent || agentId;
  el.setAttribute('aria-label', 'Agent: ' + name + ' -- stan: ' + (LABELS[newState] || newState));

  // Jednorazowa animacja burst na done
  if (newState === 'done' && oldState !== 'done') {
    el.classList.add('lm-just-done');
    setTimeout(() => el.classList.remove('lm-just-done'), 400);
  }

  // Narrative template dispatch (SHOULD S2)
  if (typeof lmNarrative === 'function') {
    lmNarrative(agentId, oldState, newState);
  }
}

// Zmiana stanu fazy -- synchronizuje grid + timeline
function lmSetPhaseState(phaseId, newState) {
  // Phase group
  const group = document.getElementById('lmPhase-' + phaseId);
  if (group) group.dataset.phaseState = newState;

  // Timeline step
  const step = document.querySelector('.lm-tl-step[data-phase="' + phaseId + '"]');
  if (step) step.dataset.tlState = newState;
}
```

---

## 6. Integration Points z v21/v22

### 6.1 Istniejace funkcje V21 ktore Live Monitor WYWOLUJE

| Funkcja v21 | Wywolanie z LM | Cel |
|-------------|----------------|-----|
| `simStop()` | Emergency STOP, Close monitor | Zatrzymaj symulacje |
| `addDTLMsg(agentId, targetId, msg, phaseId)` | Kazda wiadomosc w comms log | LM przechwytuje te funkcje by rownoczesnie aktualizowac swoj comms log |
| `agSvg(agentId, size)` | Budowanie kart agentow | SVG ikona agenta |
| `AD_MAP.get(agentId)` | Lookup danych agenta | Nazwa, faza, kolor, opis |
| `PHASES` | Budowanie timeline + phase groups | Definicja faz |
| `AGENT_SPEECH` | Narrative Templates fallback | Domyslne wiadomosci agentow |
| `nodes` | Budowanie gridu | Lista agentow na canvasie |
| `conns` | Info o polaczeniach | Do wyswietlania strzalek w comms log |

### 6.2 Nowe funkcje ktore LM EKSPORTUJE (globalne)

| Funkcja | Sygnatura | Cel |
|---------|-----------|-----|
| `openLiveMonitor()` | `() => void` | Lazy init + pokaz overlay |
| `closeLiveMonitor()` | `() => void` | Ukryj overlay (symulacja trwa w tle) |
| `lmSetAgentState()` | `(agentId: string, state: string) => void` | Zmiana stanu agenta |
| `lmSetPhaseState()` | `(phaseId: string, state: string) => void` | Zmiana stanu fazy |
| `lmAddComm()` | `(agentId, targetId, msg, phaseId) => void` | Dodaj wiersz do comms log |
| `lmShowHitl()` | `(point: string) => void` | Pokaz HITL panel |
| `lmHideHitl()` | `() => void` | Ukryj HITL panel |
| `lmShowDebate()` | `() => void` | Pokaz Debate Arena (SHOULD) |
| `lmUpdateProgress()` | `(pct: number) => void` | Aktualizuj progress bar |
| `lmUpdateTime()` | `(seconds: number) => void` | Aktualizuj timer |

### 6.3 Monkey-patching simStep() (podpinanie LM do symulacji)

LM NIE modyfikuje istniejacego `simStep()` -- zamiast tego:

```javascript
// W openLiveMonitor():
// 1. Przechwyc addDTLMsg by ROWNOCZESNIE aktualizowac comms log monitora
const _origAddDTL = addDTLMsg;
addDTLMsg = function(agentId, targetId, msg, phaseId) {
  _origAddDTL(agentId, targetId, msg, phaseId); // oryginalna funkcja
  if (lmOverlay.dataset.state === 'active') {
    lmAddComm(agentId, targetId, msg, phaseId); // mirror do LM
  }
};

// 2. Observer na zmianach klas sim-active/sim-done na node'ach
// Uzyj MutationObserver na #cvT (container node'ow)
const lmObserver = new MutationObserver(mutations => {
  for (const m of mutations) {
    if (m.type !== 'attributes' || m.attributeName !== 'class') continue;
    const el = m.target;
    if (!el.classList.contains('nd')) continue;
    const nodeId = el.id;
    const nd = nodes.find(n => n.id === nodeId);
    if (!nd) continue;
    const agentId = nd.defId;

    // Mapuj klasy sim v21 na stany LM
    if (el.classList.contains('sim-active'))      lmSetAgentState(agentId, 'working');
    else if (el.classList.contains('sim-done'))    lmSetAgentState(agentId, 'done');
    else if (el.classList.contains('phase-dim'))   lmSetAgentState(agentId, 'idle');
    else if (el.classList.contains('always-on'))   lmSetAgentState(agentId, 'working');
    else                                           lmSetAgentState(agentId, 'idle');
  }
});
lmObserver.observe(document.getElementById('cvT'), {
  attributes: true,
  subtree: true,
  attributeFilter: ['class']
});

// 3. Observer na phase-pill active class zmianach
// (lub podpiecie do simStep przez wrapper)
```

### 6.4 Eventy ktore LM nasluchuje

| Event | Target | Handler |
|-------|--------|---------|
| `keydown` | `lmOverlay` | Shortcuts (ESC, Space, S, A, D, R, arrows) |
| `click` | `lmOverlay` (delegation) | Wszystkie przyciski, agent cards drill-down |
| `change` | `#lmCommsFilter` | Filtr comms log |
| `wheel` | `#lmCommsScroll` | Izolacja scroll (stopPropagation) |
| `visibilitychange` | `document` | Pause/resume animacji (rAF auto-pauzuje, ale timer-based logika tez) |
| Custom: `lm-phase-change` | `lmOverlay` | Update phase timeline, grid, metryki |
| Custom: `lm-sim-complete` | `lmOverlay` | Summary + confetti |

### 6.5 Istniejacy CSS ktory wymaga JEDNEJ zmiany (done color)

```css
/* ZMIANA W ISTNIEJACYM CSS v21/v22 (Phase 0): */
/* Linia ~264 v21: */
/* PRZED: .nd.sim-done .nd-check { color: #22C55E (lub domyslnie accent2) } */
/* PO: */
.nd.sim-done .nd-check { color: #3B82F6; } /* BLUE zamiast GREEN -- fix daltonizm */
```

---

## 7. Performance Guardrails

### 7.1 DOM Node Budget

| Komponent | Max nodes | Notatka |
|-----------|-----------|---------|
| Overlay + topbar + timeline | ~40 | Statyczne |
| Phase groups (6 x header) | ~30 | Statyczne |
| Agent cards (27 agentow max) | ~27 x 5 = ~135 | Kazda karta = orb + info + progress + speech + wrapper |
| Comms log rows | ~200 visible | Overflow rows `display: none` |
| HITL panel | ~20 | Wstawiany hidden, toggleowany |
| Debate arena (SHOULD) | ~40 | Wstawiana hidden |
| RAZEM | ~465 | Dobrze ponizej limitu 1500 |

### 7.2 Animation Budget

| Typ animacji | Ile jednoczesnych | Mechanizm |
|-------------|-------------------|-----------|
| Agent orb spin (working) | Max 8 (faza max 8 agentow) | CSS keyframe |
| Agent orb pulse/shimmer | Max 5 | CSS keyframe |
| Live dot pulse | 1 | CSS keyframe |
| Mission Pulse | 1 | CSS keyframe |
| Timeline dot pulse | 1 | CSS keyframe |
| Comms row entrance | ~1 na raz (sequential) | CSS keyframe |
| Progress bar fills | Max 8 | CSS transition (width) |
| RAZEM | ~25 concurrent | Dobrze ponizej limitu 80 |

### 7.3 Kiedy degradowac

```javascript
// Performance degradation (w AnimationManager callback):
// Jesli FPS < 45 przez 5 sekund:
// 1. lmPulse.style.display = 'none'       // wylacz Mission Pulse
// 2. Wylacz .lm-agent speech bubbles       // mniej reflow
// Jesli FPS < 30 przez 5 sekund:
// 3. Wszystkie agent orb animations: none  // zostaw kolor + label
// 4. Timeline pulse: none
```

### 7.4 Cleanup przy zamykaniu

```javascript
function closeLiveMonitor() {
  lmOverlay.dataset.state = 'exiting';
  // Po animacji exit (300ms):
  setTimeout(() => {
    lmOverlay.hidden = true;
    lmOverlay.dataset.state = 'closed';
    // Disconnect MutationObserver
    lmObserver.disconnect();
    // Restore oryginalne addDTLMsg
    addDTLMsg = _origAddDTL;
    // Reset all agent states
    document.querySelectorAll('.lm-agent').forEach(el => {
      el.dataset.state = 'idle';
    });
    // Clear comms log
    lmCommsScroll.innerHTML = '';
    // Hide HITL/Debate
    lmHitl.hidden = true;
    lmDebate.hidden = true;
  }, 300);
}
```

---

## Podsumowanie LOC Estimate per komponent (CSS + HTML template)

| Komponent | CSS LOC | HTML template LOC | Total |
|-----------|---------|-------------------|-------|
| Overlay container + animations | ~30 | ~5 | ~35 |
| Topbar HUD | ~80 | ~30 | ~110 |
| Agent Grid + Phase Groups | ~70 | ~15 (template) | ~85 |
| Agent Card 7 states | ~140 | ~12 (template) | ~152 |
| Phase Timeline | ~60 | ~10 (template) | ~70 |
| Comms Log | ~55 | ~15 | ~70 |
| HITL Panel | ~80 | ~30 | ~110 |
| Debate Arena (SHOULD) | ~70 | ~30 | ~100 |
| Intent Preview (SHOULD) | ~20 | ~5 | ~25 |
| Mission Pulse (SHOULD) | ~8 | ~1 | ~9 |
| Reduced Motion + Responsive | ~30 | 0 | ~30 |
| Stop flash + utilities | ~10 | 0 | ~10 |
| **RAZEM CSS + HTML** | **~653** | **~153** | **~806** |

Reszta budzetu (~460 LOC) to JavaScript -- logika, event handlers, AnimationManager, state management. Patrz oddzielna specyfikacja Backend Dev.

---

*Raport przygotowany przez Frontend Dev [OPUS] w ramach Deep Five Minds Protocol (BUILD phase).*
*Kazdy element ma: tag, klasa, id, ARIA, data-attr, stan CSS, animacje.*
*Developer powinien moc implementowac z tej specyfikacji bez dodatkowych pytan.*
*Data: 4 kwietnia 2026*
