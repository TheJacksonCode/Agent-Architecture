# GOLD SOLUTION #2 -- Finalna Specyfikacja Implementacyjna
## Live Monitor Mode v22

**Autor:** Syntetyk [OPUS] -- mediator Five Minds Protocol, Debata #2 (post-BUILD)
**Data:** 2026-04-04
**Zrodla:** 13_GOLD_SOLUTION.md, 14-18 BUILD specs, 19-23 FM2 debata (5 glosow)
**Cel:** JEDEN dokument, z ktorego developer zakoduje Live Monitor BEZ PYTANI

---

### Consensus Score

**78% -- SILNY KOMPROMIS (wzrost z 72% w GS#1)**

- **Pelny konsensus (5/5):** AnimationManager jako Phase 0 prerequisite, zero Proxy wrappera, zero wildcard event bus, wyrzucenie token cost estimation, research phase = cyan (#06B6D4), prefers-reduced-motion od dnia 1
- **Silna wiekszosc (4/5):** 3 HITL punkty, Escape = zamknij najblizszy kontekst jako 'skip', topbar 48px, timeline 56px, agent state name = `hitl` (nie `waiting-for-human`), uproszczony event system (direct calls + CustomEvent bridge)
- **Kompromis (3/5):** LOC budzet 1500 netto (Pragmatyk + Analityk + Cien vs Gold Solution 1265), 2 z 3 micro-improvements Innowatora, comms log DOM purge
- **Rozlam (2/5):** Debate Arena priorytet (MUST vs SHOULD), Proxy wrapper (Cien chce wyrzucic, Backend Dev chce zachowac)

---

### Verdicts Summary

| Ekspert | Verdict | Glowne warunki |
|---------|---------|----------------|
| **Pragmatyk** | CONDITIONAL-GO | LOC reconciliation, wyrzuc token cost, wyrzuc wildcard, zredukuj narrative templates, Phase 3 warunkowa |
| **Innowator** | CONDITIONAL-GO | 3 micro-improvements (~80 LOC): Round Splash, Decision Burst, Expert Spotlight |
| **Analityk** | CONDITIONAL-GO | Baseline profiling PRZED implementacja, fix frame budget 10ms, fix Haiku pricing, bridge event documentation |
| **Rzecznik** | CONDITIONAL-GO | Escape behavior resolution, skip links, demo mode WON'T, speech bubble duration, summary panel spec |
| **Cien** | CONDITIONAL-GO | Wyrzuc Proxy, wyrzuc Event Bus, jedna spec per komponent, LOC audit, prototype-first mindset |

**FINAL VERDICT: GO -- z wbudowanymi warunkami ponizej.**

Wszystkich 5 ekspertow dalo CONDITIONAL-GO. Zaden nie dal NO-GO. Warunki sa ADRESOWANE w tym dokumencie -- kazdy jest ROZSTRZYGNIETY z konkretna decyzja.

---

### Rozstrzygniecia Konfliktow (A-G)

---

#### A) LOC Budget Crisis

**Problem:** Feature Dev (695) + Backend Dev (840) + Frontend Dev (806) = 2341 LOC vs Gold Solution 1265 LOC.

**Decyzja: Budzet nowego kodu = 1500 LOC netto. Plik koncowy: max 4500 LOC.**

**Uzasadnienie:**
- Pragmatyk estymuje 1810 po eliminacji duplikatow -- zbyt pesymistyczny (liczy pseudo-kod jak LOC)
- Analityk estymuje 855 (Integrator metoda) + 15% = ~980 -- zbyt optymistyczny (pomija SHOULD)
- Cien estymuje 1400-1600 -- realistyczny srodek
- MOJA kalkulacja: 1500 LOC netto to kompromis z buforem ~300 LOC do hard limitu

**Kogo slucham:** Pragmatyk (za ostrzezenia) + Analityk (za metode Integratora) + Cien (za realizm)

**Arytmetyka:**
```
v22 base:             3204 LOC
Audit Phase 0:        -200 LOC (cel, minimum -150)
Nowy kod:            +1500 LOC
--------------------------------------
PROGNOZA:             4504 LOC (~360 KB)
Hard limit:           5000 LOC / 450 KB
Bufor:                ~496 LOC
```

**RULE:** Jesli po Phase 2 plik > 4300 LOC -- Phase 3 (Debate Arena, celebration) przechodzi do v22.1.

---

#### B) Naming/Value Conflicts

| Conflict | Decyzja | Wartosc | Uzasadnienie |
|----------|---------|---------|--------------|
| Topbar height | **48px** | `--lm-topbar-h: 48px` | Designer 48px. Frontend 46px to blad transkrypcji. 48px = 3 * 16px = czysta siatka. |
| Timeline height | **56px** | `--lm-timeline-h: 56px` | Designer 56px. Frontend 60px zbedne. 56px = 3.5rem = kompaktowe. |
| Agent card height | **92px** | `--lm-agent-card-h: 92px` | Kompromis: Designer 96, Frontend 90. 92px miesci 4 rzedy tekstu z padding 10px. |
| Research phase color | **Cyan #06B6D4** | `--lm-phase-research: #06B6D4` | Designer. Research MUSI byc wizualnie odroznialne od Build (emerald #34D399). Pragmatyk i Cien zgodni. |
| Agent state name | **`hitl`** | `data-state="hitl"` | Krotsze, uzywane przez Backend Dev i Feature Dev. Frontend CSS zmienia selektor z `waiting-for-human` na `hitl`. Label tekstowy = "Czeka na Ciebie" (niezalezny od nazwy stanu). |
| CSS glass variable | **`--lm-glass-bg`** | `rgba(15, 15, 24, 0.88)` | Frontend Dev konwencja. Designer `--lm-bg-glass` to odwrocona kolejnosc -- nieintuicyjna. |
| HITL z-index | **350** | `z-index: 350` | Designer. Frontend 360 niepotrzebnie wysoko. Debate Arena = 340 (ponizej HITL). |

**Kogo slucham:** Designer (wartosci geometryczne -- to jego domena) + Frontend Dev (nazewnictwo CSS -- to jego domena)

---

#### C) Escape Key During HITL

**Problem:** Trzy sprzeczne zachowania:
1. Designer: zamyka HITL (nested priority), resumes z default
2. Frontend Dev: zamyka monitor, stays paused
3. Feature Dev: skip decision, resumes

**Decyzja: Escape = zamknij NAJBLIZSZY KONTEKST z akcja 'skip'.**

**Konkretne zachowanie:**
```
Stan                    | Escape robi                           | Co sie dzieje
------------------------|---------------------------------------|---------------------------
Debate Arena otwarta    | Zamyka Debate Arena                   | Wraca do grid, debata trwa
HITL panel otwarty      | Zamyka HITL jako 'approve' (default)  | Symulacja resumes
Monitor (bez overlayow) | Zamyka monitor                        | Symulacja kontynuuje w tle
```

**Uzasadnienie:** Rzecznik ma najsilniejszy argument: user ZAWSZE oczekuje ze Escape zamyka najblizszy kontekst (analogia: modal > dialog > app). Zamykanie calego monitora podczas HITL (Frontend Dev) jest destrukcyjne -- user traci kontekst i nie wie ze decyzja jest wymagana. 'Approve' jako default jest bezpieczne bo symulacja jest pre-scripted -- user nie traci nic realnego.

**Kogo slucham:** Rzecznik (UX pattern) + Feature Dev (skip mechanizm) + Designer (nested priority)

**LOC:** 0 ekstra -- to jest logika w keydown handler, nie nowy feature.

---

#### D) Over-Engineering Items

| Item | Decyzja | LOC oszczedzone | Uzasadnienie |
|------|---------|----------------|--------------|
| **Event Bus z wildcard** | WYRZUCIC | -10 LOC | Pragmatyk: 12 eventow, zero wildcard listeners w specach. Cien: "1:1 message passing z indirection". Zamiast: prosty dispatcher z exact match (15 LOC) LUB direct function calls. |
| **Proxy reactive wrapper** | WYRZUCIC | -25 LOC | Cien: Set/Map niewidoczne dla Proxy, debugging hell, unnecessary overhead. Pragmatyk: "elegancki ale nieintuicyjny". Zamiast: explicit `lmRender()` call po zmianach. Developer WIDZI kiedy render nastepuje. |
| **22+ CSS custom properties** | ZREDUKOWAC do 14 | -8 LOC CSS | Zachowujemy: 7 statusow (--lm-idle..--lm-hitl), 4 layout (topbar-h, timeline-h, comms-w, card-w), 3 glass (glass-bg, glass-blur, glass-border). Wyrzucamy: phase colors (hardcode w selektorach), timing vars (hardcode), card-h, mini-w, mini-h. |
| **3-level AnimationManager** | ZACHOWAC ale UPROSZIC degradation | -6 LOC | 3 poziomy (critical/normal/decorative) SA uzasadnione. ALE: 2-stopniowa degradation (60->30 FPS, potem disable decorative) upraszamy do 1-stopniowej: FPS < 40 przez 3s -> disable decorative + 30 FPS. |
| **Token cost estimation** | WYRZUCIC CALKOWICIE | -60 LOC | Gold Solution EXPLICITE zakazala w v22. Backend Dev zaimplementowal mimo zakazu. Wyrzucamy kod + MODEL_PRICING obiekt. v23 jako opt-in z disclaimerem. |
| **Narrative Templates 200 LOC** | ZREDUKOWAC do ~80 unikalnych | -70 LOC danych | Pragmatyk: agenci tego samego typu dzielcia szablony. Fallback `_default` per state pokrywa 80%. 12 typow agentow x 3 stany x 2-3 szablony = ~80 unikalnych. Reszta = `_default`. |
| **23 event types** | ZREDUKOWAC do 8 CustomEvents | -15 LOC | Direct function calls wewnatrz monitora. CustomEvents TYLKO na bridge miedzy istniejacym v22 a monitorem (8 hookow z Integratora). Zero wewnetrznego event bus. |
| **Debate Arena polkole CSS** | UPROSCIC do grid 3+2 | -30 LOC CSS | Pragmatyk: polkole to extra CSS za wizualne wow. Grid 3+2 (3 gora, 2 dol) z Gold Solution focal card na dole = czytelny i tani. |

**Lacznie oszczedzone: ~224 LOC**

**Kogo slucham:** Cien (za identyfikacje over-engineeringu -- 4/5 trafnych) + Pragmatyk (za konkretne LOC oszczednosci) + Analityk (za weryfikacje arytmetyki)

---

#### E) Missing Pieces

| Missing piece | Decyzja | LOC | Kto zglosil |
|---------------|---------|-----|-------------|
| **Comms log auto-scroll** | DODAC | +5 LOC | Pragmatyk |
| **Comms log DOM purge (>200 rows)** | DODAC | +5 LOC | Analityk, Pragmatyk |
| **Preset change detection w lmOpen()** | DODAC | +5 LOC | Pragmatyk |
| **Skip links (WCAG 2.4.1)** | DODAC | +3 LOC | Rzecznik |
| **Speech bubble duration (5s default)** | DODAC | +3 LOC | Rzecznik |
| **Summary panel po completion** | DODAC (minimalny) | +25 LOC | Rzecznik |
| **Demo mode** | WON'T v22 | 0 | Rzecznik (nie dealbreaker, v22.1) |
| **Mobile smoke test** | DODAC do checklist (0 LOC) | 0 | Analityk |
| **Settings UI** | WON'T v22 (feature flags) | 0 | Pragmatyk |
| **"Catch up" summary po powrocie** | WON'T v22 | 0 | Rzecznik (nice-to-have, v22.1) |
| **"Co sie zmienilo" diff w HITL** | WON'T v22 | 0 | Rzecznik (nice-to-have) |

**Lacznie dodane: +46 LOC**

---

#### F) Micro-Improvements (Innowator)

| Improvement | Decyzja | LOC | Uzasadnienie |
|-------------|---------|-----|--------------|
| **Round Transition Splash** | DODAC (w Phase 3) | ~27 LOC | Innowator: "Debate Arena przechodzi z PowerPoint na cinematic event." Koszt minimalny, impact na wow factor duzy (6/10 -> 8/10). Warunkowe na Phase 3 wejscie. |
| **Decision Celebration Burst** | DODAC (w Phase 2) | ~25 LOC | Innowator: "HITL decisions staja sie moments of joy." Particle burst po approve = subtelny ale satysfakcjonujacy. Implementacja w lmOnDecision(). |
| **Active Expert Spotlight** | WON'T v22 | 0 | Wymaga auto-advance timer w Debate Arena + dodatkowa logika. 28 LOC ale TYLKO jesli Debate Arena jest w pelni zaimplementowana. Zbyt zalezne od Phase 3. v22.1 jesli Debate Arena wejdzie. |

**Lacznie: +52 LOC (27 warunkowe Phase 3)**

**Kogo slucham:** Innowator (2 z 3 -- dobry stosunek wow/LOC) + Pragmatyk (ostrzezenie przed scope creep -- dlatego 2, nie 3)

---

#### G) Performance

| Metryka | Decyzja | Wartosc | Uzasadnienie |
|---------|---------|---------|--------------|
| **Frame budget** | **10ms target, 12ms warning, 14ms hard** | AnimMgr frameBudget = 10 | Analityk: Gold Solution target 10ms, AnimMgr uzywal 14ms. Kompromis: target 10ms, skip decorative na 12ms, hard stop na 14ms. |
| **Max backdrop-filter** | **3 jednoczesne** | topbar + comms log + HITL overlay | Gold Solution limit. Designer specyfikowal 5 -- ODRZUCONE. Debate Arena i timeline bez backdrop-filter (solid bg zamiast glass). |
| **Baseline profiling** | **OBOWIAZKOWE Phase 0** | 30 min Chrome DevTools | Analityk: "bez baseline wszystkie targety sa hipotezami." Mierzyc: FPS, heap, layout recalc, DOM count. DOKUMENTOWAC wyniki. |
| **Auto-degradation** | **1-stopniowa** | FPS < 40 przez 3s -> disable decorative + 30 FPS target | Pragmatyk: 2-stopniowa niepotrzebna. Jeden prog wystarczy. |
| **renderLMFrame budget** | **< 8ms** | performance.measure() | Nowy target. Zostawia 2ms na AnimMgr overhead + 6.67ms na compositing. |

**Kogo slucham:** Analityk (za twarde targety) + Pragmatyk (za uproszczenie degradation) + Gold Solution #1 (za 10ms baseline)

---

### FINAL Feature List (Zatwierdzona, z LOC)

#### Phase 0: INFRASTRUCTURE (PRZED features)

| # | Feature | LOC | Notatki |
|---|---------|-----|---------|
| I1 | Performance baseline v22 (Chrome DevTools 30 min) | 0 | DOKUMENTUJ: FPS, heap, DOM, layout recalc |
| I2 | Audit v22: dead code, duplikacje CSS, komentarze | -200 (cel -150 min) | Szukaj: nieuzywane selektory, duplikaty gradient, debug console.log |
| I3 | AnimationManager singleton | +70 | register/unregister/pause/resume, 3 priorities, 1-step degradation, visibilitychange. BEZ getStats (debug only -- dodaj jesli potrzebne). |
| I4 | Migracja 4 istniejacych rAF na AnimMgr | -15 netto | starfield, particles, simStep, missionControl |
| I5 | prefers-reduced-motion | +50 | @media query + in-app toggle. JEDNOCZESNIE z kazdym nowym keyframe. |
| I6 | Done color fix: #22C55E -> #3B82F6 | +1 | Jedna linia CSS |

**Phase 0 LOC netto: -94**

#### Phase 1: CORE MONITOR (MUST)

| # | Feature | LOC | Notatki |
|---|---------|-----|---------|
| M1 | Fullscreen overlay + HUD topbar | ~130 | Fixed overlay, HUD z LIVE/phase/progress/timer/agents/STOP. View Transition wrapper (6 LOC). |
| M2 | Agent grid pogrupowany wg faz | ~150 | Phase containers (active/done/upcoming). Agent cards 160x92px. Progressive reveal. |
| M3 | Agent status visualization (7 stanow) | ~120 | CSS stany (idle/queued/working/thinking/done/error/hitl). 3 kanaly: kolor+animacja+label. SVG ikony z v21. |
| M4 | Phase timeline stepper | ~60 | Horizontal 6 dots z connectors. Active glow, completed checkmark, upcoming dashed. |
| M5 | Emergency STOP | ~20 | Przycisk w HUD, shake+flash feedback, wola simStop(). |
| M6 | lmInit/lmOpen/lmClose lifecycle | ~80 | Lazy init, entry/exit animation (skipowalna), sidebar hide/show, canvas dim. Preset change detection. |

**Phase 1 LOC: ~560**

#### Phase 2: KOMUNIKACJA + INTERAKCJA (MUST)

| # | Feature | LOC | Notatki |
|---|---------|-----|---------|
| M7 | Comms log (prawy panel 280px) | ~100 | Collapsible, filtr aktywnej fazy, auto-scroll, DOM purge >200 rows. Narrative Templates inline. |
| M8 | HITL decision panel (1 wariant) | ~120 | 3 blocking points. Approve(A)/Modify(D)/Re-debate(R). Context builder. Decision Celebration Burst (25 LOC). Focus trap. |
| M9 | Keyboard navigation + ARIA | ~60 | Tab flow, focus trap, skip links, aria-live na comms/HITL, sr-only announcers. |
| M10 | Narrative Templates engine | ~35 | Engine 35 LOC + ~50 LOC data (80 unikalnych szablonow z fallback _default). Anti-repetition. |
| M11 | Narrative Templates data | ~50 | 12 typow agentow, 3 stany (working/thinking/done), 2-3 szablony + _default fallback |
| M12 | HUD dim completed phases | ~15 | opacity: 0.4 + grayscale na completed. |
| M13 | Mission Pulse heartbeat | ~15 | Sinusoida opacity 0.02-0.08, BPM 72 idle, sync z aktywnosciaa. AnimMgr 'decorative'. |
| M14 | Intent Preview (non-blocking) | ~30 | Info bar przed faza: "Nastepna: BUILD -- Backend, Frontend pracuja rownolegle." Dismiss X. |

**Phase 2 LOC: ~425**

#### Phase 3: POLISH + EDUKACJA (WARUNKOWA -- jesli LOC < 4300 po Phase 2)

| # | Feature | LOC | Notatki |
|---|---------|-----|---------|
| S1 | Debate Arena (uproszczona) | ~130 | Grid 3+2 expert cards + Gold Solution focal. 3 slidy (opinie/debata/synteza). Round Splash 27 LOC. Nav prev/next. |
| S2 | Simulation complete summary + confetti | ~40 | Stats panel (czas, fazy, decyzje). Confetti reuse z v7 (max 1.5s). Auto-close 5s. |
| S3 | View Transitions API wrapper | ~15 | Progressive enhancement: `if (document.startViewTransition)`. Fallback instant. |

**Phase 3 LOC: ~185**

#### WON'T HAVE v22

| Feature | Dlaczego NIE | Kiedy |
|---------|-------------|-------|
| Session replay / time travel | 500+ LOC, eksponencjalna zlozonosc. Konsensus 5/5. | v24+ |
| Token cost estimation | Gold Solution zakazala. Misleading w symulacji. | v23 opt-in |
| Proxy reactive wrapper | Cien + Pragmatyk: over-engineering, Set/Map invisible, debug hell | Nigdy |
| Event Bus z wildcard | Premature optimization, 1:1 message passing | Nigdy |
| Demo mode (presentation) | Nie dealbreaker. v22.1 SHOULD. | v22.1 |
| Active Expert Spotlight | Zalezne od Debate Arena Phase 3 | v22.1 |
| Compact mode (< 1280px) | CSS breakpoints wystarczaja. Dedykowany mode v22.1 | v22.1 |
| Settings UI | Feature flags na gorze pliku. UI v22.1 | v22.1 |
| Ghost Trail | Clutter na 27 agentach | v23 |
| Constellation Memory | Fajne, nie core | v24 |
| Mobile layout | Zero danych mobile. Desktop-first | Po testach |
| Confidence slider | Pusta interakcja | Nigdy |
| BroadcastChannel | Phantom user case | Nigdy |

---

### Unified LOC Budget

```
Phase 0:  -94 LOC (infra, audit, refactor)
Phase 1: +560 LOC (core monitor)
Phase 2: +425 LOC (comms, HITL, narrative, polish)
Phase 3: +185 LOC (debate arena, celebration, VT API)
Missing: +46 LOC  (auto-scroll, purge, skip links, speech duration, summary)
Micro:   +25 LOC  (Decision Celebration Burst -- Phase 2)
---------------------------------------------------
RAZEM:   +1147 LOC (z Phase 3)
RAZEM:   +962 LOC  (bez Phase 3)

v22 base:           3204 LOC
Audit:              -175 LOC (realistyczny srodek -150 do -200)
Phase 0 netto:       -94 LOC
Phase 1-2:          +1056 LOC
Phase 3 (warunkowo): +185 LOC
---------------------------------------------------
BEZ Phase 3:        3991 LOC (~320 KB)  -- BEZPIECZNIE ponizej 4500
Z Phase 3:          4176 LOC (~335 KB)  -- BEZPIECZNIE ponizej 4500
Z marginesem +15%:  ~4500 LOC (~360 KB) -- NA GRANICY limitu, w budzecie
```

---

### Unified Data Model (jedna wersja)

**BRAK Proxy. BRAK Event Bus. Zwykly obiekt + explicit render.**

```javascript
// === LIVE MONITOR STATE ===
// UWAGA: po kazdej zmianie LM wolaj lmRender() lub lmRenderPartial(section).
// NIE MA automatycznej reaktywnosci -- KAZDY set wymaga explicit renderujacej.

const LM = {
  loaded: false,          // lazy init flag
  open: false,            // monitor widoczny
  status: 'idle',         // 'idle'|'running'|'paused'|'hitl'|'completed'|'stopped'
  startTime: 0,           // performance.now() przy starcie
  lastPreset: null,       // ID presetu przy ostatnim otwarciu (preset change detection)

  // Phase state
  phaseIndex: -1,         // indeks aktywnej fazy (-1 = nie rozpoczeto)
  phaseId: null,          // string id aktywnej fazy
  phases: [],             // [{id, label, color, agentNodeIds, agentCount}]
  completedPhases: [],    // [string] -- IDs ukonczonych faz (Array, nie Set!)
  phaseTiming: {},        // {[phaseId]: {start: number, end: number|null}}

  // Agent runtime states
  agents: {},             // {[nodeId]: {nodeId, defId, status, progress, currentMessage, phaseId, alwaysOn, statusLabel}}

  // HITL
  hitlPending: null,      // {id, type, title, description, options, recommended} | null
  hitlHistory: [],        // [{id, type, outcome, responseTimeMs, userNote}]
  hitlCount: 0,           // ile decyzji podjeto

  // Debate
  debateOpen: false,      // Debate Arena widoczna
  debateIndex: 0,         // 0=FM#1, 1=FM#2
  debateRound: 0,         // 0=opinie, 1=debata, 2=synteza

  // Comms
  commsMessages: [],      // [{ts, agentId, agentName, targetId, msg, phaseId}]
  commsFilter: null,      // null = aktywna faza, string = konkretna faza
  commsCollapsed: false,

  // Settings (feature flags -- const na gorze pliku)
  // LM_ENABLED, LM_HITL_POINTS, LM_AUTO_APPROVE, LM_NARRATIVE, LM_DEBATE_ARENA, LM_MISSION_PULSE

  // Session events (fundament pod replay v24 -- ~5 LOC)
  events: []              // [{ts, type, data}] -- append-only, max 2000
};
```

**Agent Runtime State (per agent):**
```javascript
function createAgentRuntime(node) {
  const def = AD_MAP.get(node.defId);
  const phase = PHASES.find(p => p.agents.includes(node.defId));
  return {
    nodeId: node.id,
    defId: node.defId,
    status: 'idle',       // 'idle'|'queued'|'working'|'thinking'|'done'|'error'|'hitl'
    progress: 0,          // 0-100
    currentMessage: null,  // string | null
    phaseId: phase ? phase.id : 'strategy',
    alwaysOn: ['orchestrator','synthesizer'].includes(node.defId),
    statusLabel: 'Idle'   // zawsze ustawiac razem ze status
  };
}
```

**Status -> Label mapping:**
```javascript
const STATUS_LABELS = {
  idle: 'Idle', queued: 'W kolejce', working: 'Pracuje',
  thinking: 'Analizuje', done: 'Gotowe', error: 'Blad', hitl: 'Czeka na Ciebie'
};
```

**Status -> Visual mapping:**
```javascript
const STATUS_VIS = {
  idle:     { color: '#71717A', icon: '\u25CB', anim: 'lm-breathe',    css: 'lm-idle' },
  queued:   { color: '#818CF8', icon: '\u25F7', anim: 'lm-pulse-q',   css: 'lm-queued' },
  working:  { color: '#34D399', icon: '\u27F3', anim: 'lm-spin-ring', css: 'lm-working' },
  thinking: { color: '#FBBF24', icon: '\u2726', anim: 'lm-shimmer',   css: 'lm-thinking' },
  done:     { color: '#3B82F6', icon: '\u2713', anim: 'lm-done-burst',css: 'lm-done' },
  error:    { color: '#F87171', icon: '\u26A0', anim: 'lm-shake',     css: 'lm-error' },
  hitl:     { color: '#F59E0B', icon: '\u270B', anim: 'lm-beacon',    css: 'lm-hitl' }
};
```

---

### Unified HTML Structure (jedna wersja)

```html
<!-- Wstawiany do <body> LAZY przy pierwszym uzyciu -->
<div class="lm-overlay" id="lmOverlay" role="dialog" aria-modal="true"
     aria-label="Live Monitor" data-state="closed" hidden>

  <!-- A) TOPBAR HUD -- 48px -->
  <header class="lm-topbar" role="banner">
    <!-- Skip link (WCAG 2.4.1) -->
    <a class="lm-skip" href="#lmGridArea">Przejdz do siatki agentow</a>

    <div class="lm-tb-live" aria-label="Transmisja na zywo">
      <span class="lm-live-dot" aria-hidden="true"></span>
      <span class="lm-live-label">LIVE</span>
    </div>
    <div class="lm-tb-sep" aria-hidden="true"></div>
    <div class="lm-tb-phase" id="lmPhaseLabel" aria-live="polite">
      Faza <span id="lmPhaseNum">0</span>/6: <span id="lmPhaseName">--</span>
    </div>
    <div class="lm-tb-sep" aria-hidden="true"></div>
    <div class="lm-tb-progress" role="progressbar" aria-valuenow="0"
         aria-valuemin="0" aria-valuemax="100" aria-label="Postep symulacji">
      <div class="lm-tb-progress-fill" id="lmProgressFill"></div>
    </div>
    <span class="lm-tb-pct" id="lmProgressPct">0%</span>
    <div class="lm-tb-sep" aria-hidden="true"></div>
    <span class="lm-tb-time" id="lmTime">00:00</span>
    <div class="lm-tb-sep" aria-hidden="true"></div>
    <span class="lm-tb-agents" id="lmAgentCount">0/0</span>
    <div class="lm-tb-spacer"></div>
    <button class="lm-btn lm-btn-pause" id="lmPauseBtn" aria-label="Pauza" title="Spacja">&#9646;&#9646;</button>
    <button class="lm-btn lm-btn-stop" id="lmStopBtn" aria-label="STOP" title="Emergency STOP">&#9724; STOP</button>
    <button class="lm-btn lm-btn-close" id="lmCloseBtn" aria-label="Zamknij" title="Escape">&#10005;</button>
  </header>

  <!-- B) MAIN: grid + comms -->
  <div class="lm-main">
    <!-- B.1) AGENT GRID -->
    <div class="lm-grid" id="lmGridArea" role="main" aria-label="Siatka agentow">
      <!-- Phase groups + agent cards generowane dynamicznie przez lmBuildGrid() -->
    </div>

    <!-- B.2) COMMS LOG -->
    <aside class="lm-comms" id="lmComms" role="log" aria-label="Komunikacja" aria-live="polite">
      <div class="lm-comms-header">
        <h3>Komunikacja</h3>
        <select class="lm-comms-filter" id="lmCommsFilter" aria-label="Filtr fazy">
          <option value="current">Aktywna faza</option>
          <option value="all">Wszystkie</option>
        </select>
        <button class="lm-btn lm-comms-toggle" id="lmCommsToggle" aria-label="Zwin panel">&#10005;</button>
      </div>
      <div class="lm-comms-scroll" id="lmCommsScroll" tabindex="0">
        <!-- Rows generowane dynamicznie -->
      </div>
    </aside>
  </div>

  <!-- C) PHASE TIMELINE -- 56px -->
  <nav class="lm-timeline" id="lmTimeline" role="navigation" aria-label="Fazy symulacji">
    <!-- 6 step indicators generowanych dynamicznie -->
  </nav>

  <!-- D) HITL DECISION PANEL -->
  <div class="lm-hitl" id="lmHitl" role="alertdialog" aria-modal="true"
       aria-label="Punkt decyzyjny" hidden>
    <div class="lm-hitl-backdrop" aria-hidden="true"></div>
    <div class="lm-hitl-card">
      <div class="lm-hitl-header">
        <span class="lm-hitl-icon" aria-hidden="true">&#9995;</span>
        <h2 class="lm-hitl-title" id="lmHitlTitle">Punkt Decyzyjny</h2>
        <span class="lm-hitl-badge" id="lmHitlBadge">1/3</span>
      </div>
      <div class="lm-hitl-body" id="lmHitlBody"></div>
      <div class="lm-hitl-actions" role="group" aria-label="Opcje decyzji">
        <button class="lm-btn lm-hitl-approve" id="lmHitlApprove" data-action="approve">&#10003; Zatwierdz <kbd>A</kbd></button>
        <button class="lm-btn lm-hitl-modify" id="lmHitlModify" data-action="modify">&#9998; Zatwierdz z uwagami <kbd>D</kbd></button>
        <button class="lm-btn lm-hitl-reject" id="lmHitlReject" data-action="redebate">&#8635; Re-debate <kbd>R</kbd></button>
      </div>
      <textarea class="lm-hitl-note" id="lmHitlNote" rows="2" placeholder="Opcjonalna uwaga..." hidden></textarea>
    </div>
  </div>

  <!-- E) DEBATE ARENA (SHOULD -- Phase 3) -->
  <div class="lm-debate" id="lmDebate" role="region" aria-label="Arena debaty" hidden>
    <div class="lm-debate-backdrop" aria-hidden="true"></div>
    <div class="lm-debate-panel">
      <div class="lm-debate-header">
        <h2>Five Minds Debate</h2>
        <span id="lmDebateRound">Runda 1/3</span>
        <button class="lm-btn" id="lmDebateClose" aria-label="Zamknij">&#10005;</button>
      </div>
      <div class="lm-debate-arena" id="lmDebateArena">
        <!-- 5 expert cards (grid 3+2) + Gold Solution focal -->
      </div>
      <div class="lm-debate-nav">
        <button class="lm-btn" id="lmDebatePrev" disabled>&#8592; Poprzednia</button>
        <span class="lm-debate-dots" aria-hidden="true"></span>
        <button class="lm-btn" id="lmDebateNext">Nastepna &#8594;</button>
      </div>
      <!-- Round Transition Splash -->
      <div class="lm-debate-splash" id="lmDebateSplash" aria-hidden="true"></div>
    </div>
  </div>

  <!-- F) INTENT PREVIEW (non-blocking) -->
  <div class="lm-intent" id="lmIntent" role="status" aria-live="polite" hidden>
    <span aria-hidden="true">&#128161;</span>
    <span id="lmIntentText"></span>
    <button class="lm-btn" id="lmIntentDismiss" aria-label="Zamknij">&#10005;</button>
  </div>

  <!-- G) MISSION PULSE (decorative bg) -->
  <div class="lm-pulse" id="lmPulse" aria-hidden="true"></div>

  <!-- H) SR-ONLY ANNOUNCER -->
  <div class="sr-only" role="status" aria-live="polite" id="lmAnnounce"></div>

</div>
```

---

### Unified CSS Variables (jedna lista -- 14 zmiennych)

```css
/* === LIVE MONITOR CSS CUSTOM PROPERTIES === */
/* Dodac do .lm-overlay (NIE do :root -- scope isolation) */

.lm-overlay {
  /* Status colors (7) */
  --lm-idle: #71717A;
  --lm-queued: #818CF8;
  --lm-working: #34D399;
  --lm-thinking: #FBBF24;
  --lm-done: #3B82F6;          /* BLUE -- daltonizm-safe */
  --lm-error: #F87171;
  --lm-hitl: #F59E0B;

  /* Layout (4) */
  --lm-topbar-h: 48px;
  --lm-timeline-h: 56px;
  --lm-comms-w: 280px;
  --lm-card-w: 160px;

  /* Glassmorphism (3) */
  --lm-glass-bg: rgba(15, 15, 24, 0.88);
  --lm-glass-blur: blur(20px);
  --lm-glass-border: 1px solid rgba(129, 140, 248, 0.15);
}
```

**Phase colors -- HARDCODED w selektorach (nie w custom properties):**
```css
[data-phase="strategy"]   { --phase-clr: #818CF8; }  /* indigo */
[data-phase="research"]   { --phase-clr: #06B6D4; }  /* CYAN (nie emerald!) */
[data-phase="debate1"]    { --phase-clr: #F59E0B; }  /* gold */
[data-phase="build"]      { --phase-clr: #34D399; }  /* emerald */
[data-phase="debate2"]    { --phase-clr: #F59E0B; }  /* gold */
[data-phase="qa"]         { --phase-clr: #F87171; }  /* red */
```

**Reuse z istniejacego v22 :root:**
`--bg0`, `--bg3`, `--accent1..4`, `--gold`, `--t1`, `--t2`, `--t3`, `--brd`, `--hd`, `--bd`, `--mn`, `--grad`

---

### Unified Animation List (jedna lista)

Wszystkie animacje monitora. Kazda z reduced-motion fallback.

| Nazwa | Typ | Czas trwania | Easing | Priority (AnimMgr) | Cel |
|-------|-----|-------------|--------|---------------------|-----|
| `lm-enter` | keyframe | 500ms | cubic-bezier(0.4,0,0.2,1) | -- (CSS only) | Overlay wejscie (scale 0.97->1 + opacity) |
| `lm-exit` | keyframe | 300ms | cubic-bezier(0.4,0,0.2,1) | -- | Overlay wyjscie |
| `lm-live-pulse` | keyframe | 1.5s infinite | ease-in-out | decorative | LIVE dot pulsowanie |
| `lm-breathe` | keyframe | 4s infinite | ease-in-out | decorative | Idle agent opacity 0.5-0.7 |
| `lm-pulse-q` | keyframe | 1.5s infinite | ease-out | decorative | Queued agent border pulse |
| `lm-spin-ring` | keyframe | 1.2s infinite | linear | normal | Working agent spinning ring |
| `lm-shimmer` | keyframe | 2s infinite | linear | decorative | Thinking agent gradient wave |
| `lm-done-burst` | keyframe | 400ms | cubic-bezier(0.34,1.56,0.64,1) | normal | Done agent scale bounce (0.92->1.06->1) |
| `lm-shake` | keyframe | 400ms | ease-out | normal | Error agent shake (translateX +-4px) |
| `lm-error-glow` | keyframe | 2s infinite | ease-in-out | decorative | Error status dot glow |
| `lm-beacon` | keyframe | 1.5s infinite | ease-in-out | normal | HITL agent beacon pulse + golden ring |
| `lm-phase-glow` | keyframe | 2s infinite | ease-in-out | decorative | Active timeline pill glow |
| `lm-connector-flow` | keyframe | 1.5s infinite | linear | decorative | Active connector gradient scroll |
| `lm-speech-enter` | keyframe | 250ms | cubic-bezier(0.34,1.56,0.64,1) | normal | Speech bubble popup |
| `lm-counter-tick` | keyframe | 300ms | ease-out | decorative | Timer subtle flash |
| `lm-splash-text` | keyframe | 600ms | cubic-bezier(0.34,1.56,0.64,1) | normal | Round Splash text scale (Phase 3) |
| `mission-pulse` | rAF task | continuous | sine | decorative | Background opacity 0.02-0.08 |

**Reduced motion blanket:**
```css
@media (prefers-reduced-motion: reduce) {
  .lm-overlay *, .lm-overlay *::before, .lm-overlay *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .lm-pulse { display: none; }
}
```

**Lacznie: 17 animacji (7 decorative, 7 normal, 3 CSS-only entry/exit)**

---

### Unified Event List (uproszczona)

**BRAK wewnetrznego event bus.** Architektura: CustomEvent bridge z v22 -> direct function calls w monitorze.

#### CustomEvents (dodane do istniejacych funkcji v22 -- Integrator hooking)

| Event | Dispatch w | Detail | Listener w LM |
|-------|-----------|--------|---------------|
| `lm-sim-start` | `simToggle()` | `{phaseCount, agentCount}` | `lmOnSimStart()` |
| `lm-sim-stop` | `simStop()` | `{}` | `lmOnSimStop()` |
| `lm-phase-change` | `simStep()` | `{phaseIdx, phaseId, phaseLabel, agentDefIds, totalPhases, isComplete}` | `lmOnPhaseChange()` |
| `lm-agent-msg` | `addDTLMsg()` | `{agentId, targetId, msg, phaseId, timestamp}` | `lmOnAgentMsg()` |
| `lm-agent-state` | `showSpeech()` + phase completion | `{nodeId, defId, state}` | `lmOnAgentState()` |

**Wewnatrz monitora: DIRECT FUNCTION CALLS:**
```javascript
// Zamiast: lmBus.dispatch('hitl:request', data) + lmBus.on('hitl:request', handler)
// Uzywamy: lmShowDecision(data)  -- BEZPOSREDNIE wolanie

// Zamiast: lmBus.dispatch('phase:start', data) + lmBus.on('phase:start', handler)
// Uzywamy: lmBuildGrid(); lmUpdateTimeline(); lmUpdateHUD();  -- w lmOnPhaseChange()
```

**Session Events (append-only log, fundament pod replay v24):**
```javascript
function lmLogEvent(type, data) {
  if (LM.events.length >= 2000) LM.events.shift();  // ring buffer
  LM.events.push({ ts: performance.now() - LM.startTime, type, data });
}
// Wywolywane w: lmOnPhaseChange, lmOnDecision, lmOnAgentState, lmOnSimStart/Stop
```

---

### Implementation Roadmap (4 phases z LOC per phase)

#### Phase 0: INFRASTRUCTURE (1 sesja, ~3-4h)
**LOC netto: -94**

| Krok | Co | LOC | Uwagi |
|------|----|-----|-------|
| 0.1 | Performance baseline v22 | 0 | 30 min DevTools. ZAPISZ: FPS idle, FPS sim 27 agents, heap, DOM count. |
| 0.2 | Audit v22: dead code | -175 | Szukaj: nieuzywane CSS, duplikaty, console.log, nadmiarowe komentarze. Cel: -150 do -200 LOC. |
| 0.3 | AnimationManager singleton | +70 | IIFE, register/unregister/pause/resume, 3 priorities, 1-step degradation, visibilitychange. |
| 0.4 | Migracja istniejacych rAF | -15 | drawStarfield, animateDataPackets, simStep tick, missionControl -> AnimMgr.register(). |
| 0.5 | prefers-reduced-motion | +50 | @media query + `AnimMgr.setReducedMotion()`. Kazdy nowy keyframe z fallback. |
| 0.6 | Done color fix | +1 | `--lm-done: #3B82F6` + zmiana w istniejacym CSS. |
| 0.7 | Weryfikacja | 0 | Odpal v22 z preset Deep Five Minds. Sprawdz: starfield dziala, particles dziala, sim dziala, FPS >= baseline. |

**Deliverable:** v22-pre z czystszym kodem, AnimMgr, reduced-motion, performance baseline.

#### Phase 1: CORE MONITOR (1.5-2 sesje, ~6-8h)
**LOC: +560**

| Krok | Co | LOC | Zaleznosci |
|------|----|-----|------------|
| 1.1 | CSS Live Monitor (blok `<style id="lm-styles">`) | ~200 | Phase 0 done |
| 1.2 | HTML template (overlay + topbar + grid area + timeline) | ~30 | 1.1 |
| 1.3 | `lmInit()` -- lazy: wstaw CSS, buduj DOM, event listeners | ~30 | 1.2 |
| 1.4 | `lmOpen()` / `lmClose()` -- lifecycle, entry/exit anim | ~50 | 1.3 |
| 1.5 | `lmBuildGrid()` -- fazy, karty agentow, progressive reveal | ~80 | 1.4, LM state |
| 1.6 | `lmUpdateAgent()` -- data-state, label, animacja | ~40 | 1.5 |
| 1.7 | `lmUpdateHUD()` -- faza, progress, timer, agents | ~40 | 1.4 |
| 1.8 | `lmUpdateTimeline()` -- 6 dots, active/completed/upcoming | ~40 | 1.4 |
| 1.9 | `lmStop()` -- STOP button, shake+flash, wola simStop() | ~20 | 1.4 |
| 1.10 | Keyboard: M toggle, Escape nested, Space pause | ~20 | 1.4 |
| 1.11 | CustomEvent hooks w simToggle/simStop/simStep/addDTLMsg | ~10 | Integrator spec |

**Deliverable:** MVP monitora: otwierasz (M), widzisz agentow, statusy, fazy, timeline, STOP dziala, Escape zamyka.

#### Phase 2: KOMUNIKACJA + INTERAKCJA (1-1.5 sesje, ~5-6h)
**LOC: +496 (425 + 46 missing + 25 micro)**

| Krok | Co | LOC | Zaleznosci |
|------|----|-----|------------|
| 2.1 | Comms log panel + filtr + auto-scroll + DOM purge | ~100 | Phase 1 done |
| 2.2 | Narrative Templates engine + 80 szablonow | ~85 | 2.1 |
| 2.3 | HITL decision panel (3 punkty) + focus trap | ~95 | Phase 1 |
| 2.4 | HITL context builder (3 typy: phase-gate, gold-solution, final) | ~25 | 2.3 |
| 2.5 | Decision Celebration Burst (particle micro-animation) | ~25 | 2.3 |
| 2.6 | HITL keyboard: A/D/R + Escape='approve' + textarea na Modify | ~20 | 2.3 |
| 2.7 | ARIA: skip links, sr-only announcers, focus management | ~30 | Phase 1 |
| 2.8 | HUD dim completed phases (opacity + grayscale) | ~15 | Phase 1 |
| 2.9 | Mission Pulse (sinusoida, AnimMgr 'decorative') | ~15 | AnimMgr |
| 2.10 | Intent Preview (non-blocking info bar) | ~30 | Phase 1 |
| 2.11 | Speech bubble duration (5s default, proporcjonalnie) | ~3 | Phase 1 |
| 2.12 | Preset change detection w lmOpen() | ~5 | 1.4 |
| 2.13 | View Transitions API wrapper (progressive enhancement) | ~15 | 1.4 |
| 2.14 | Summary panel minimalny (czas, fazy, decyzje) | ~25 | Phase 1 |
| 2.15 | Session events logging (append-only, max 2000) | ~8 | Phase 1 |

**Deliverable:** Pelna interakcja: comms log z narracjaja, HITL decisions z celebracja, keyboard nav, a11y, mission pulse.

**CHECKPOINT po Phase 2:** Zmierz LOC. Jesli plik > 4300 LOC -> Phase 3 = v22.1. Jesli <= 4300 -> kontynuuj Phase 3.

#### Phase 3: DEBATE ARENA + CELEBRATION (1 sesja, ~3-4h, WARUNKOWA)
**LOC: +185**

| Krok | Co | LOC | Zaleznosci |
|------|----|-----|------------|
| 3.1 | Debate Arena HTML/CSS (grid 3+2, Gold Solution focal) | ~50 | Phase 2 |
| 3.2 | Debate Arena renderer (3 slidy, expert cards, nav) | ~50 | 3.1 |
| 3.3 | Pre-scripted debate content (default FM1 + FM2) | ~30 | 3.2 |
| 3.4 | Round Transition Splash (cinematic 0.8s miedzy rundami) | ~27 | 3.2 |
| 3.5 | Confetti reuse z v7 + summary display | ~28 | Phase 2 summary |

**Deliverable:** Five Minds debate viz, round splash, simulation celebration.

---

### Performance Contract (finalne targets)

| Metryka | Target | Hard Limit | Jak mierzyc | Degradation |
|---------|--------|------------|-------------|-------------|
| FPS desktop (i7/M1+) | >= 55 FPS | >= 45 FPS | DevTools Performance tab | Disable decorative animations |
| FPS CPU 4x throttle | >= 30 FPS | >= 20 FPS | DevTools CPU throttle | Disable decorative + 30 FPS cap |
| rAF callback time | < 10ms | < 14ms | AnimMgr internal + performance.measure() | Skip decorative at 12ms |
| renderLMFrame() | < 8ms | < 12ms | performance.measure() | Reduce DOM updates |
| Time-to-Interactive | < 2s | < 3s | Lighthouse | Lazy init |
| File size | < 380 KB | < 450 KB | `ls -la` | Cut Phase 3 |
| LOC | < 4300 | < 4500 | `wc -l` | Cut Phase 3 |
| Memory idle | < 80 MB | < 120 MB | `performance.memory.usedJSHeapSize` | -- |
| Memory active sim | < 150 MB | < 200 MB | jw. | Purge comms DOM |
| DOM nodes (monitor) | < 500 | < 800 | `querySelectorAll('.lm-overlay *').length` | Virtualize (v22.1) |
| Concurrent backdrop-filter | <= 3 | <= 3 | CSS audit | Solid bg fallback |
| Max animated elements | <= 30 | <= 80 | AnimMgr.tasks.size | Auto-degradation |

**Degradation Strategy (wbudowana w AnimMgr):**
1. FPS < 40 przez 3s -> disable ALL decorative tasks + set 30 FPS target
2. Jesli FPS nadal < 25 -> log warning, alert user "Performance niska, rozważ mniejszy preset"

---

### Testing Requirements (finalna lista)

#### MUST (wykonac PRZED merge)

**Functional (F):**
| # | Test | Oczekiwany wynik |
|---|------|-----------------|
| F1 | Otworz monitor (M), zamknij (Escape) | Overlay wjezdza/wyjezdza, canvas nienaruszony |
| F2 | Wlacz symulacje z preset Deep Five Minds | 6 faz, 24+ agentow w gridzie, timeline 6 dots |
| F3 | Obserwuj zmiane fazy | Aktywna faza pelna, poprzednia collapsed+dimmed, timeline updated |
| F4 | Agent przechodzi idle -> working -> done | Karta zmienia status dot, label, animacje |
| F5 | HITL #1 (po Strategy+Research) | Blocking panel, A/D/R klawisze, Escape = approve |
| F6 | HITL #2 (po FM#1, jesli Debate Arena) | Debate Arena (Phase 3) LUB prosty panel |
| F7 | HITL #3 (Final Approval) | Deploy/Reject |
| F8 | STOP button | Natychmiastowe zatrzymanie, shake+flash, monitor zamyka sie |
| F9 | Comms log filtruje aktywna faze | Zmiana fazy -> log filtruje nowa faze |
| F10 | Comms log auto-scroll | Nowa wiadomosc -> scroll do dolu (jesli user blisko dolu) |
| F11 | Zamkniecie monitora (Escape) -> ponowne otwarcie | Stan aktualny (nie od poczatku) |
| F12 | Zmiana presetu -> otwarcie monitora | Pelen reset (lmDestroy + lmInit) |

**Performance (P):**
| # | Test | Target |
|---|------|--------|
| P1 | FPS z 27 agentami, active sim | >= 55 FPS desktop |
| P2 | FPS z HITL overlay otwartym | >= 50 FPS |
| P3 | Memory delta (otwarcie -> 5 min sim -> zamkniecie) | < +30 MB |
| P4 | Otwarcie monitora cold (pierwszy raz) | < 200ms |
| P5 | Otwarcie monitora warm (ponowne) | < 50ms |
| P6 | DOM nodes w monitorze | < 500 |
| P7 | Rozmiar pliku | < 380 KB |

**Accessibility (A):**
| # | Test | Oczekiwany wynik |
|---|------|-----------------|
| A1 | Tab flow w monitorze | Logiczna kolejnosc: skip link -> HUD -> grid -> comms -> timeline |
| A2 | Focus trap w HITL | Tab cycle miedzy 3 przyciskami |
| A3 | Escape z kazdego kontekstu | Zamyka najblizszy: Debate -> HITL -> Monitor |
| A4 | Screen reader: zmiana fazy | aria-live ogłasza nowa faze |
| A5 | Screen reader: HITL | role="alertdialog", aria-describedby, buttons z aria-label |
| A6 | prefers-reduced-motion | Wszystkie animacje wylaczone, Mission Pulse ukryty |
| A7 | Done vs Working kolory | Blue (#3B82F6) vs Green (#34D399) -- rozroznialne dla protanopii |
| A8 | Kontrast tekstu | >= 4.5:1 na tle paneli (weryfikuj kalkulatorem) |

**Regression (R):**
| # | Test | Oczekiwany wynik |
|---|------|-----------------|
| R1 | Canvas bez monitora | rNd(), rConn(), upSel() dzialaja jak w v21 |
| R2 | Symulacja bez monitora | simToggle/simStep/simStop dzialaja |
| R3 | Encyklopedia (Learn mode) | Otwieranie/zamykanie bez konfliktu z monitorem |
| R4 | Eksport (genPrompt, JSON, SVG) | Dzialaja z otwartym monitorem |
| R5 | localStorage | acV22 save/load nie koliduje z monitorem |
| R6 | Starfield + particles | Dzialaja przez AnimMgr po refaktorze |

**Mobile Smoke (MS):**
| # | Test | Oczekiwany wynik |
|---|------|-----------------|
| MS1 | Otworz plik na iPhone SE | Brak crash, brak JS error |
| MS2 | Otworz plik na Android (Pixel) | Brak crash, FPS > 15 |

---

### Warunki CONDITIONAL-GO -- jak spelnione

| # | Warunek (z FM2) | Kto zglosil | Status w GS#2 |
|---|-----------------|-------------|----------------|
| 1 | LOC reconciliation | Pragmatyk | **SPELNIONY** -- Unified LOC Budget: 1147 netto z Phase 3, 962 bez. Plik: 4176 max. Hard limit 4500. |
| 2 | Wyrzucic token cost estimation | Pragmatyk | **SPELNIONY** -- sekcja "WON'T HAVE v22". Zero LOC. |
| 3 | Wyrzucic wildcard event bus | Pragmatyk, Cien | **SPELNIONY** -- "Unified Event List": direct calls + 5 CustomEvents. Zero event bus. |
| 4 | Zredukowac Narrative Templates | Pragmatyk | **SPELNIONY** -- 80 unikalnych + _default fallback. ~85 LOC (engine 35 + data 50). |
| 5 | Research = cyan | Pragmatyk | **SPELNIONY** -- `--lm-phase-research: #06B6D4` |
| 6 | Naming: hitl | Pragmatyk | **SPELNIONY** -- `data-state="hitl"`, label "Czeka na Ciebie" |
| 7 | Phase 3 warunkowa | Pragmatyk | **SPELNIONY** -- checkpoint po Phase 2: >4300 LOC -> Phase 3 = v22.1 |
| 8 | Auto-scroll + preset detection | Pragmatyk | **SPELNIONY** -- M7 (auto-scroll +5 LOC), 2.12 (preset detection +5 LOC) |
| 9 | Round Transition Splash | Innowator | **SPELNIONY** -- Phase 3, krok 3.4, ~27 LOC |
| 10 | Decision Celebration Burst | Innowator | **SPELNIONY** -- Phase 2, krok 2.5, ~25 LOC |
| 11 | Active Expert Spotlight | Innowator | **WON'T v22** -- zalezne od Phase 3 Debate Arena. v22.1. |
| 12 | Baseline profiling PRZED implementacja | Analityk | **SPELNIONY** -- Phase 0, krok 0.1. OBOWIAZKOWE. |
| 13 | Frame budget = 10ms | Analityk | **SPELNIONY** -- AnimMgr frameBudget = 10ms, skip decorative at 12ms. |
| 14 | Fix Haiku pricing | Analityk | **N/A** -- token cost WYRZUCONE z v22. Fix bedzie w v23. |
| 15 | Bridge CustomEvent -> lmBus | Analityk | **SPELNIONY** -- brak lmBus. Direct function calls. CustomEvents only for v22 hooking. |
| 16 | Comms log DOM purge | Analityk | **SPELNIONY** -- M7: purge >200 rows. |
| 17 | Mobile smoke test | Analityk | **SPELNIONY** -- Testing MS1, MS2. |
| 18 | Escape behavior resolution | Rzecznik | **SPELNIONY** -- sekcja C: nested priority, HITL Escape = 'approve'. |
| 19 | Skip links | Rzecznik | **SPELNIONY** -- HTML: `<a class="lm-skip" href="#lmGridArea">`. |
| 20 | Speech bubble duration | Rzecznik | **SPELNIONY** -- 5s default w krok 2.11. |
| 21 | Summary panel spec | Rzecznik | **SPELNIONY** -- krok 2.14: minimalny summary (czas, fazy, decyzje). |
| 22 | LOC audit jedne zrodlo prawdy | Cien | **SPELNIONY** -- Unified LOC Budget w tym dokumencie. |
| 23 | Jedna spec per komponent | Cien | **SPELNIONY** -- TEN DOKUMENT jest jedna spec. BUILD specs archiwalne. |
| 24 | Wyrzucic Proxy | Cien | **SPELNIONY** -- Unified Data Model: zwykly obiekt + explicit lmRender(). |
| 25 | Wyrzucic Event Bus | Cien | **SPELNIONY** -- Unified Event List: direct calls + CustomEvents. |
| 26 | AnimationManager first | Cien (zgoda) | **SPELNIONY** -- Phase 0, krok 0.3. |

**Wynik: 24/26 warunków SPELNIONYCH, 1 WON'T (Expert Spotlight -- za malo LOC wartosci), 1 N/A (Haiku -- token cost wyrzucone).**

---

### Appendix: Co Przegralo i Dlaczego

| Idea | Autor | Dlaczego przegrala | Szacunek |
|------|-------|--------------------|----------|
| **Proxy reactive wrapper** | Backend Dev | Cien + Pragmatyk: Set/Map invisible, debugging hell, Proxy get/set overhead na 27 agentach, unnecessary abstraction w single-file HTML. Explicit `lmRender()` jest prostsze, czytelniejsze, debugowalne. | Backend Dev dostarczyl eleganckie rozwiazanie -- ale dla ZLEGO problemu. Reaktywnosc jest cenna w frameworkach z wieloma komponentami. Tu mamy JEDEN plik i WIEMY kiedy state sie zmienia. |
| **Event Bus z wildcard + 23 event types** | Backend Dev | Cien: "1:1 message passing z indirection." Pragmatyk: "12 typow, zero wildcard listeners." 23 event types w single-file HTML to Enterprise Java level overengineering. Direct function calls sa czytelniejsze i debugowalne. | EVENT CATALOG z Backend Dev jest wartosciowy jako DOKUMENTACJA -- wiemy jakie zdarzenia wystepuja. Ale implementacja powinna byc direct calls, nie event bus. |
| **Token cost estimation** | Backend Dev | Gold Solution #1 EXPLICITE zakazala. Backend Dev zaimplementowal mimo tego. "Investment in future" -- ale 60 LOC na zakazana feature to naruszenie scope. | Kod jest dobry i poprawny matematycznie (Analityk potwierdza). Zachowujemy jako komentarz `// v23: token cost here` (2 LOC, nie 60). |
| **Active Expert Spotlight** | Innowator | 28 LOC ale TYLKO jesli Debate Arena jest w pelni zaimplementowana (Phase 3). Zbyt zalezne od warunkowej fazy. Decision Celebration Burst i Round Splash sa niezalezne -- dlatego weszly. | Dobry kandydat na v22.1 jesli Phase 3 wejdzie. |
| **Demo mode** | Rzecznik | Nie byl w 10 liniach w piasku Rzecznika. Nie jest dealbreaker. 50-80 LOC na feature ktora wymaga osobnego breakpointu, wiekszych fontow, ukrytego comms log. v22.1 SHOULD. | Wartosciowe dla prezentacji/streamow -- ale nie core. |
| **Settings UI** | Pragmatyk | 50-80 LOC na UI do 5 opcji, ktore sa feature flagami. Feature flags na gorze pliku sa wystarczajace dla v22. | v22.1 -- prosty gear icon z 5 toggle switches. |
| **Compact mode (dedykowany)** | Rzecznik | CSS breakpoints z Designera (sm/md/lg/xl) pokrywaja 1024-1920px. Dedykowany compact mode to extra 50 LOC nad breakpointami. | Breakpointy MUSZA byc w Phase 1 CSS (MUST). Compact jako osobny tryb = v22.1. |
| **Polkole CSS layout w Debate Arena** | Innowator, Designer | Pragmatyk: polkole to extra CSS za wizualne wow. Grid 3+2 jest czytelniejszy i tanszy o ~30 LOC. | Polkole wyglada lepiej, ale grid 3+2 z Gold Solution focal card jest FUNKCJONALNIE identyczny i latwiejszy do implementacji. |
| **Overspecification (10 907 linii BUILD docs)** | Cien | Cien ma absolutna racje: 10 907 linii spec na 1500 LOC kodu to 7:1 ratio. ALE: BUILD specs sa archiwalne REFERENCJE, nie instrukcje. TEN DOKUMENT (Gold Solution #2) jest instrukcja. | BUILD specs nie sa "zmarnowane" -- ich wartosc to: (1) identyfikacja edge cases, (2) pixel-perfect wartosci, (3) pseudo-kod do adaptacji. Ale developer CZYTA Gold Solution #2, NIE 5 BUILD specs. |
| **Ghost Trail** | Innowator | 80 LOC na polprzezroczyste klony DOM -- na ekranie z 27 agentami = clutter. Decision history w comms log jest pragmatycznym zamiennikiem. | v23 material. |
| **Constellation Memory** | Innowator | Fajne do virality, ale nie core. | v24 -- potrzebne SESSION_EVENTS (ktore zbieramy). |
| **Spike-first development** | Cien | "Zbuduj brzydki prototyp, pokaz 3 osobom." IDEALNE gdybysmy mieli userow. Nie mamy. Gold Solution + Five Minds to najlepszy dostepny substytut user research. | Cien prawidlowo identyfikuje brak user research jako blind spot. Ale piec ekspertow debatujacych > zero ekspertow debatujacych. |

---

### Nota Koncowa Syntetyka

Gold Solution #2 jest OSTRZEJSZA niz Gold Solution #1. Wyrzucamy: Proxy wrapper (25 LOC), Event Bus (30 LOC), wildcard matching (10 LOC), token cost (60 LOC), nadmiarowe narrative templates (70 LOC), polkole CSS (30 LOC). Dodajemy: Decision Celebration Burst (25 LOC), Round Splash (27 LOC warunkowe), skip links (3 LOC), auto-scroll (5 LOC), DOM purge (5 LOC), summary panel (25 LOC), speech duration (3 LOC).

**Bilans: -225 LOC wyrzuconych, +93 LOC dodanych = -132 LOC netto vs BUILD specs.**

To oznacza ze nasz budzet jest ZDROWSZY -- wiecej buforu, mniej over-engineeringu, prostszy kod.

**Kluczowe zasady implementacji:**
1. **AnimationManager FIRST** -- nic innego nie ma sensu bez niego
2. **Explicit render** -- zero magii Proxy, zero event bus. `lmRender()` po zmianie stanu. Developer WIDZI co sie dzieje.
3. **CustomEvents ONLY for bridge** -- v22 -> monitor. Wewnatrz monitora: direct function calls.
4. **Phase 3 jest WARUNKOWA** -- zmierz LOC po Phase 2. Jesli > 4300 -> v22.1.
5. **KAZDA feature odpowiada na: "Czy to pomaga userowi ZROZUMIEC lub ZDECYDOWAC?"** Jesli nie -- wyrzucamy.

**Ten dokument jest JEDYNYM zrodlem prawdy dla implementacji Live Monitor Mode v22.**
BUILD specs (14-18) sa archiwalnym REFERENCYJNYM materialem. Konflikty miedzy nimi sa ROZSTRZYGNIETE tutaj.

Developer: czytaj TEN dokument. Jesli czegoś brakuje -- pytaj. Nie szukaj w BUILD specs -- tam sa sprzecznosci.

---

*Raport przygotowany przez Syntetyk [OPUS] -- mediator Five Minds Protocol.*
*Debata #2 post-BUILD: 5x CONDITIONAL-GO -> FINAL GO z wbudowanymi warunkami.*
*78% konsensusu. Data: 4 kwietnia 2026.*
