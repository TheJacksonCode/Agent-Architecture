# 18_INTEGRATOR.md -- Live Monitor Integration Specification
## Agent Teams Configurator v22 -> v22+LM

**Autor:** Integrator [OPUS] | Deep Five Minds Protocol -- faza BUILD
**Data:** 2026-04-04
**Zrodla:** 13_GOLD_SOLUTION.md, MANIFEST.md, AGENT_TEAMS_CONFIGURATOR_v22.html (3204 LOC)

---

## 1. Integration Map

### 1.1 Istniejace funkcje do HOOKOWANIA (event dispatch)

Ponizsze funkcje w v22 generuja zdarzenia istotne dla Live Monitor. Kazda wymaga dodania `dispatchEvent(new CustomEvent(...))` na koncu lub we wlasciwym momencie. Zmiany sa MINIMALNE -- 1-2 linie per funkcja.

| Funkcja v22 | Linia | Hook (CustomEvent) | Dane w `detail` | Cel w Live Monitor |
|---|---|---|---|---|
| `simToggle()` | 2588 | `lm-sim-start` | `{phaseCount, agentCount}` | Trigger otwarcia monitora (opcjonalnie) |
| `simStop()` | 2606 | `lm-sim-stop` | `{}` | Zamkniecie monitora / reset |
| `simStep()` | 2625 | `lm-phase-change` | `{phaseIdx, phaseId, phaseLabel, agents:[defId], totalPhases}` | Aktualizacja timeline, agent grid, HUD |
| `addDTLMsg()` | 2538 | `lm-agent-msg` | `{agentId, targetId, msg, phaseId, timestamp}` | Wpis w comms log monitora |
| `showSpeech()` [wewn. simStep] | 2669 | `lm-agent-state` | `{nodeId, defId, state:'working'}` | Zmiana stanu agenta w gridzie |
| `showAOSpeech()` [wewn. simStep] | 2706 | `lm-agent-state` | `{nodeId, defId, state:'working', alwaysOn:true}` | Always-on agent aktualizacja |
| `completedPhases.add()` [w simStep] | 2722 | (via `lm-phase-change`) | Phase ID w completed set | Oznaczenie fazy jako done |
| `showToast()` | 2725 | `lm-toast` | `{msg}` | Wyswietlenie toast w monitorze |

### 1.2 Istniejace dane WSPOLDZIELONE (read-only z monitora)

Monitor NIE modyfikuje tych danych. Czyta je bezposrednio.

| Zmienna/Stala | Linia | Typ | Uzycie w monitorze |
|---|---|---|---|
| `nodes` | 2141 | `Array<{id,defId,x,y,model,cp}>` | Lista agentow na canvasie -- generuje grid |
| `conns` | 2141 | `Array<{id,fi,ti,tp}>` | Polaczenia -- opcjonalnie wizualizacja flow |
| `AD_MAP` | 1991 | `Map<string, AgentDef>` | Definicje agentow -- nazwy, fazy, ikony, role |
| `PHASES` | 1978 | `Array<{id,label,color,agents}>` | Definicje faz -- kolory, labele |
| `ALWAYS_ON_IDS` | 1988 | `Array<string>` | Orchestrator + Synthesizer |
| `AGENT_SPEECH` | 920 | `Object<string, string[]>` | Wiadomosci agentow -- Narrative Templates w przyszlosci |
| `AGENT_SVG` | 806 | `Object<string, string>` | Ikony SVG agentow |
| `AGENT_ICON_COLOR` | 875 | `Object<string, string>` | Kolory ikon |
| `AGENT_KNOWLEDGE` | 953 | `Object` | Encyklopedia agentow (dla drill-down) |
| `PM` | 2060 | `Object` | Metadane presetow |
| `simRunning` | 2145 | `boolean` | Stan symulacji |
| `simPhaseIdx` | 2145 | `number` | Aktualny indeks fazy |
| `completedPhases` | 2147 | `Set<string>` | Ukonczone fazy |
| `actPr` | 2141 | `string|null` | Aktywny preset ID |
| `agSvg()` | 902 | `Function` | Renderer ikony agenta |

### 1.3 NOWE funkcje Live Monitor (dodawane do v22)

Wszystkie z prefixem `lm` (live monitor). Zgrupowane w jeden blok komentarza `// === LIVE MONITOR MODE ===`.

| Funkcja | LOC est. | Odpowiedzialnosc |
|---|---|---|
| **Lifecycle** | | |
| `lmInit()` | ~30 | Lazy init: wstawia CSS (jesli nie), buduje DOM overlay, rejestruje event listenery. Wykonuje sie RAZ przy pierwszym uzyciu. Ustawia flage `lmLoaded=true`. |
| `lmOpen()` | ~40 | Otwiera monitor: `document.startViewTransition()` lub instant. Chowa sidebary, dimuje canvas, wsuwa overlay. Jesli symulacja nie dziala -- startuje ja. |
| `lmClose()` | ~25 | Zamyka monitor: reverse animacja, przywraca sidebary. NIE zatrzymuje symulacji (chyba ze user kliknie STOP). |
| `lmDestroy()` | ~10 | Cleanup: usuwa DOM, event listenery, flagi. Wywolywane przy pelnym uniemozliwieniu. |
| **Rendering** | | |
| `lmBuildGrid()` | ~80 | Buduje agent grid pogrupowany wg faz. Tworzy phase containers z kartami agentow. Wywolywane przy otwarciu i na `lm-phase-change`. |
| `lmUpdateAgent(nodeId, state)` | ~30 | Aktualizuje karte agenta: data-state, label, ikona, animacja CSS. 7 stanow. |
| `lmUpdateTimeline(phaseIdx, total)` | ~20 | Aktualizuje horizontal stepper -- active/completed/upcoming dots. |
| `lmUpdateHUD(data)` | ~15 | Aktualizuje topbar: faza, progress %, czas, aktywnych agentow. |
| `lmAddCommsMsg(data)` | ~20 | Dodaje wpis do comms log z filtrem aktywnej fazy. Narrative template jesli S2. |
| **HITL** | | |
| `lmShowDecision(type, data)` | ~60 | Wyswietla blocking decision panel. 3 typy: post-strategy, post-fm1 (Gold Solution), final. Keyboard A/R/D. |
| `lmOnDecision(action)` | ~20 | Handler decyzji: approve/modify/re-debate. Dispatcha `lm-decision` event, resume sim. |
| **Controls** | | |
| `lmStop()` | ~15 | Emergency STOP: shake+flash feedback, wola `simStop()`, zamyka HITL jesli otwarty. |
| `lmToggleComms()` | ~10 | Collapse/expand comms log. |
| **Debate Arena (SHOULD S1)** | | |
| `lmShowDebate(roundData)` | ~80 | Polkole 5 expert cards + Gold Solution + 3 slidy (opinie/debata/synteza). |
| `lmDebateNext()` | ~15 | Nastepny slide debaty. |
| **Utilities** | | |
| `lmElapsed()` | ~5 | Timer formatowanie mm:ss. |
| `lmNarrative(agentId, state)` | ~20 | Narrative Template: zamienia state na ludzki tekst. (SHOULD S2) |

### 1.4 NOWE stale/zmienne

```javascript
// Feature flags -- gora pliku (po lm INIT)
const LM_ENABLED = true;           // master kill switch
const LM_HITL_POINTS = 3;          // 3 domyslnie (Gold Solution: 3)
const LM_AUTO_APPROVE = false;     // timer OFF domyslnie
const LM_NARRATIVE = true;         // Narrative Templates ON
const LM_DEBATE_ARENA = true;      // Debate Arena ON (SHOULD S1)
const LM_MISSION_PULSE = true;     // heartbeat background ON

// State
let lmLoaded = false;              // lazy init flag
let lmOpen_ = false;               // czy monitor jest otwarty (uwaga: lmOpen juz zajeta jako fn)
let lmStartTime = null;            // performance.now() przy starcie
let lmElapsedTimer = null;         // setInterval ID dla timera
let lmActivePhase = null;          // aktualny phase ID
let lmDecisionPending = false;     // czy czekamy na HITL decision
let lmDebateSlide = 0;             // aktualny slide debaty (0-2)

// Session events (Q3: przygotowanie pod replay v24)
const SESSION_EVENTS = [];         // {ts, type, data}
```

---

## 2. Entry/Exit Points

### 2.1 Trigger wejscia

**Dwie sciezki:**

#### A) Przycisk w topbar (GLOWNY)
- **Gdzie:** linia 654-660 (`<div class="tb-actions">`), PRZED przyciskiem `simBtn`
- **HTML do dodania:**
```html
<button class="btn btn-lm" id="lmBtn" onclick="lmOpen()">&#9713; Live Monitor</button>
```
- **CSS:** `.btn-lm` -- gradient indigo/gold, pulsujacy border gdy simRunning

#### B) Skrot klawiszowy `M`
- **Gdzie:** linia 3166-3180 (keydown handler)
- **Dodac** w bloku `else if`:
```javascript
else if(k==='m' && !e.ctrlKey){e.preventDefault(); lmOpen_ ? lmClose() : lmOpen()}
```
- **UWAGA:** v22 NIE ma skrotu `M` (v18 mial ale nie przeniesiony). Bezpieczne dodanie.

#### C) Auto-open (OPCJONALNE)
- Jesli user kliknie `simToggle()` i monitor jest dostepny ale nie otwarty, wyswietl toast:
  "Symulacja dziala. Nacisnij M aby otworzyc Live Monitor."
- NIE auto-otwieraj -- user musi zdecydowac.

### 2.2 Entry Animation Sequence

```
Krok | Co sie dzieje                                      | Czas    | CSS
-----|------------------------------------------------------|---------|--------------------------------------------
  1  | document.startViewTransition() wrapper (lub instant) | 0ms     | if (document.startViewTransition) {...}
  2  | Sidebary (.side-l, .side-r) sliduja na boki         | 0-300ms | transform: translateX(-110%/+110%); 300ms ease-out
  3  | Canvas (.cv-area) blur + dim                          | 0-200ms | filter: blur(8px); opacity: 0.3 (rownolegle z 2)
  4  | Phase bar, sim-status, dialog-timeline -- hide        | 0-100ms | opacity: 0 (nie koliduja z monitorem)
  5  | Monitor overlay wjezdza od dolu                       | 100-500ms | translateY(100%) -> translateY(0); 400ms cubic-bezier(0.16,1,0.3,1)
  6  | HUD topbar fade-in                                    | 300-500ms | opacity: 0->1; 200ms
  7  | Agent cards staggered reveal                          | 400-700ms | 50ms delay each; translateY(10px)->0 + opacity
  8  | Phase timeline morphuje                                | 400-700ms | translateY(20px)->0; 300ms
  9  | Comms log slide-in z prawej                           | 500-700ms | translateX(100%)->0; 200ms
```

**Calosciowy czas:** ~700ms. **SKIPOWALNE** kliknieciem lub Escape -- natychmiastowe `transition: none` + finalna pozycja.

### 2.3 Exit Points

| Trigger | Zachowanie | Animacja |
|---|---|---|
| `Escape` | Zamyka monitor, NIE zatrzymuje symulacji | Reverse entry (monitor w dol, sidebary wracaja) ~400ms |
| `M` | Toggle -- jak Escape | Reverse entry |
| Przycisk X (gorny prawy w HUD) | Jak Escape | Reverse entry |
| STOP button | Zatrzymuje symulacje I zamyka monitor | Red flash 200ms, potem reverse entry |
| Koniec symulacji (simStep -> complete) | Toast + confetti 1.5s, potem auto-close po 3s | Fade out |

### 2.4 State Preservation

**Przy zamknieciu monitora:**
- Canvas NIENARUSZONY -- nodes, conns, sel, scale, panX, panY -- BEZ ZMIAN
- Symulacja kontynuuje w tle (simTimer, speech timers, progress timers dzialaja)
- DTL (Dialog Timeline) kontynuuje zbierac wiadomosci
- Ponowne otwarcie monitora odtwarza AKTUALNY stan (nie od poczatku)

**Przy STOP:**
- Jak `simStop()` -- czysci wszystko
- Monitor zamyka sie
- Canvas wraca do stanu sprzed symulacji (czyste nody bez klas sim-*)

---

## 3. Existing Code Modifications

### 3.1 Funkcje do ZMODYFIKOWANIA

Minimalne zmiany -- dodajemy TYLKO `dispatchEvent` call na koncu logiki. Istniejaca funkcjonalnosc NIE JEST ZMIENIANA.

#### 3.1.1 `simToggle()` -- linia 2588

```javascript
// PRZED (linia 2604):
  simStep();

// PO:
  simStep();
  document.dispatchEvent(new CustomEvent('lm-sim-start', {detail:{
    phaseCount: PHASES.filter(p=>nodes.some(nd=>AD_MAP.get(nd.defId)?.phase===p.id)).length,
    agentCount: nodes.length
  }}));
```

#### 3.1.2 `simStop()` -- linia 2606

```javascript
// DODAC na koncu funkcji (po linia 2623):
  document.dispatchEvent(new CustomEvent('lm-sim-stop'));
```

#### 3.1.3 `simStep()` -- linia 2625

```javascript
// DODAC po linia 2658 (po G('simText').textContent=...):
  document.dispatchEvent(new CustomEvent('lm-phase-change', {detail:{
    phaseIdx: simPhaseIdx,
    phaseId: phase.id,
    phaseLabel: phase.label,
    agentDefIds: phaseAgents.map(nd=>nd.defId),
    totalPhases: relevantPhases.length,
    isComplete: false
  }}));

// DODAC w bloku completion (po linia 2636, po showToast):
  document.dispatchEvent(new CustomEvent('lm-phase-change', {detail:{
    phaseIdx: simPhaseIdx,
    totalPhases: relevantPhases.length,
    isComplete: true
  }}));
```

#### 3.1.4 `addDTLMsg()` -- linia 2538

```javascript
// DODAC na koncu funkcji (po linia 2552):
  document.dispatchEvent(new CustomEvent('lm-agent-msg', {detail:{
    agentId, targetId, msg, phaseId: phaseId||'strategy',
    timestamp: ts, counter: dtlCounter
  }}));
```

#### 3.1.5 Wewnatrz `simStep()` -- `showSpeech()` closure (linia 2669)

```javascript
// DODAC po linia 2674 (po speech.classList.add('show')):
      document.dispatchEvent(new CustomEvent('lm-agent-state', {detail:{
        nodeId: nd.id, defId: d.id, state: 'working'
      }}));
```

#### 3.1.6 Wewnatrz `simStep()` -- blok completion per phase (linia 2722)

```javascript
// DODAC po completedPhases.add(phase.id):
  // Oznacz agentow fazy jako done
  phaseAgents.forEach(nd=>{
    document.dispatchEvent(new CustomEvent('lm-agent-state', {detail:{
      nodeId: nd.id, defId: nd.defId, state: 'done'
    }}));
  });
```

#### 3.1.7 Keyboard handler -- linia 3166

```javascript
// DODAC w bloku else if (PRZED istniejacym escape handlerem):
else if(k==='m' && !e.ctrlKey && !e.altKey){e.preventDefault(); if(typeof lmOpen==='function'){lmOpen_?lmClose():lmOpen()}}

// ZMODYFIKOWAC Escape handler (linia 3176) -- dodac monitor jako PIERWSZY check:
else if(k==='escape'){
  if(lmOpen_){lmClose();return}  // <-- NOWY: Live Monitor first
  if(G('ctxMenu').classList.contains('show')){hideCtx();return}
  if(simRunning){simStop();return}
  // ... reszta bez zmian
```

### 3.2 HTML do dodania

#### 3.2.1 Przycisk w topbar -- wstawic PRZED `simBtn` (linia 655)

```html
<button class="btn btn-lm" id="lmBtn" onclick="lmOpen()">&#9713; Live Monitor</button>
```

#### 3.2.2 Keyboard shortcuts modal -- dodac wiersz (w bloku moK, linia 785-798)

```html
<div class="kb-r"><span class="kb-k">M</span><span class="kb-a">Live Monitor</span></div>
```

### 3.3 Czego NIE WOLNO RUSZAC

| Element | Dlaczego | Ryzyko przy modyfikacji |
|---|---|---|
| `rNd()` (linia 2263) | Renderer wezlow canvasowych. Monitor ma WLASNY grid, nie modyfikuje renderera canvasu. | Rozbicie node rendering na canvasie |
| `rConn()` (linia 2310) | Renderer polaczen SVG. Monitor nie rysuje polaczen (karty, nie orby). | Rozbicie SVG connections |
| `upSel()` (linia 2274) | Logika zaznaczenia. Monitor nie zmienia zaznaczenia canvasowego. | UX confusion |
| `ldPr()` (linia 2753) | Ladowanie presetow. Monitor nie laduje presetow. | Utrata danych |
| `genPrompt()` (linia 2833) | Final Prompt. Niezalezna funkcja. | Brak |
| `showCtx()` / Context Menu (linia 2897) | Right-click menu. Nie dziala w monitorze. | Brak |
| `initStarfield()` (linia 3185) | Starfield canvasowy. Kontynuuje pod monitorem (dimmed). | Performance |
| `initDataStream()` (linia 2560) | Data stream. Kontynuuje pod monitorem. | Performance |
| `AD`, `PR`, `PC`, `PM`, `PHASES` | Stale dane. Tylko READ. | Dane corruption |
| `localStorage` logic (saveCfg/ldSv) | Storage klucz `acV22`. Monitor nie zapisuje. | Data loss |
| Bento Magazine / Learn overlay | Niezalezny system encyklopedii. | Brak |

---

## 4. CSS Integration

### 4.1 Prefix Convention

**WSZYSTKIE** klasy Live Monitor maja prefix `lm-`. Gwarantuje zero kolizji z istniejacymi klasami v22 (ktore uzywaja: `nd-`, `pa-`, `pr-`, `sv-`, `sl-`, `cv-`, `sr-`, `ds-`, `kb-`, `mo-`, `fp-`, `ctx-`, `bento-`, `hero-`, `phase-`, `sim-`, `dtl-`, `suggest-`).

```
lm-overlay          -- glowny overlay (position: fixed; inset: 0)
lm-hud              -- topbar HUD
lm-hud-live         -- LIVE indicator
lm-hud-phase        -- faza badge
lm-hud-progress     -- progress ring/bar
lm-hud-timer        -- timer mm:ss
lm-hud-agents       -- count aktywnych
lm-hud-stop         -- STOP button
lm-grid             -- agent grid container
lm-phase-group      -- kontener per faza
lm-phase-header     -- naglowek fazy
lm-card             -- karta agenta
lm-card[data-state] -- stany agenta (CSS selektory)
lm-comms            -- comms log panel
lm-comms-msg        -- wpis w comms log
lm-timeline         -- horizontal stepper
lm-timeline-dot     -- dot per faza
lm-decision         -- HITL decision overlay
lm-decision-cards   -- expert cards w polkolu (S1)
lm-decision-gold    -- Gold Solution card
lm-debate           -- Debate Arena overlay (S1)
lm-pulse            -- Mission Pulse background (S5)
```

### 4.2 Z-Index Management

Istniejacy v22 z-index stack (z komentarzy i CSS):

```
0       -- bg-orb, shooting-star, starfield
1       -- canvas (cv-container, svg)
40      -- marquee-rect
50      -- sidebar (side-l, side-r) [implicit]
55      -- phase-bar, cv-ctrl, cv-info, sim-status, dialog-timeline
60      -- hero-overlay, suggest-bar, learn-overlay
100     -- topbar
200     -- modals (.mo) [implicit via fixed+overlay]
999     -- toast
```

**Live Monitor z-index:**

```
280     -- lm-overlay (PONIZEJ istniejacych modali 200 aby nie blokowac exportu itp.)
         -- WLASCIWIE: modals maja class .mo z z-index implicit.
         -- Sprawdzmy: .mo nie ma explicit z-index w v22 CSS.
         -- Uzyjemy:
300     -- lm-overlay  (nad wszystkim oprocz toast)
310     -- lm-hud (topbar monitora -- nad gridem)
320     -- lm-decision (HITL decision -- nad HUD)
330     -- lm-debate (Debate Arena -- nad decision)
999     -- toast (bez zmian -- wspoldzielony)
```

**UWAGA:** Modals v22 (`.mo`) uzywaja `position:fixed` + czysto vizualny overlay. Nie maja explicit z-index. Trzeba dodac:
```css
.mo { z-index: 250; }  /* Istniejace modale ponizej monitora */
```
To jest BEZPIECZNA zmiana -- modals i tak sa nad sidebarami (fixed > relative). Dodanie `z-index:250` formalizuje implicit zachowanie bez zmiany UX.

### 4.3 Shared CSS Variables

Monitor REUZUJE istniejace zmienne z `:root` (linia 18-27):

| Zmienna | Uzycie w monitorze |
|---|---|
| `--bg0` (#06060A) | tlo overlay |
| `--bg3` (#1E1E3A) | tlo kart |
| `--accent1` (#818CF8) | strategy phase, indigo |
| `--accent2` (#34D399) | working status, build phase |
| `--accent3` (#FBBF24) | thinking, FM phases |
| `--accent4` (#F87171) | error, QA phase, STOP |
| `--gold` (#F59E0B) | HITL, Five Minds special |
| `--t1`, `--t2`, `--t3` | tekst primary/secondary/dim |
| `--brd` | borders |
| `--hd`, `--bd`, `--mn` | fonty |

**NOWE zmienne (dodane w bloku `lm-`):**

```css
.lm-overlay {
  --lm-status-idle: #71717A;
  --lm-status-queued: #818CF8;
  --lm-status-working: #34D399;
  --lm-status-thinking: #FBBF24;
  --lm-status-done: #3B82F6;      /* BLUE -- zmiana z zielonego! Gold Solution */
  --lm-status-error: #F87171;
  --lm-status-hitl: #F59E0B;
  
  --lm-phase-strategy: #818CF8;
  --lm-phase-research: #06B6D4;    /* cyan -- rozroznienie od strategy */
  --lm-phase-fiveminds: #F59E0B;
  --lm-phase-build: #34D399;
  --lm-phase-qa: #F87171;
}
```

### 4.4 Glassmorphism Budget

Gold Solution limit: max 3 jednoczesne `backdrop-filter` panele.

| Panel | backdrop-filter | Kiedy widoczny |
|---|---|---|
| lm-hud (topbar) | `blur(20px)` | Zawsze gdy monitor otwarty |
| lm-comms (comms log) | `blur(16px)` | Zawsze (collapsible) |
| lm-decision (HITL) | `blur(24px)` | Tylko przy HITL decision point |

**Laczny max:** 2 stale + 1 warunkowy = 3. W BUDZECIE.

Istniejace `backdrop-filter` panele v22 (topbar, side-l, side-r, ctx-menu, various inputs) -- sa UKRYTE/dimmed gdy monitor jest otwarty. Nie koliduja.

### 4.5 prefers-reduced-motion

Kazdy NOWY `@keyframes` w bloku `lm-` musi miec odpowiednik w:

```css
@media (prefers-reduced-motion: reduce) {
  .lm-overlay *,
  .lm-overlay *::before,
  .lm-overlay *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .lm-pulse { display: none; }
}
```

Istniejacy `@media(prefers-reduced-motion:reduce)` na linia 633-636 juz pokrywa globalne animacje. Dodajemy specyficzny blok dla `lm-` elementow z dodatkowym targetowaniem Mission Pulse.

---

## 5. Data Flow Diagram

### 5.1 Glowny flow: od klikniecia do zakonczenia

```
USER CLICK "Live Monitor" (lub M)
  |
  v
lmOpen()
  |-- if (!lmLoaded) -> lmInit()  [lazy: wstaw CSS, buduj DOM, listenery]
  |-- lmLoaded = true, lmOpen_ = true
  |-- View Transition (lub instant)
  |     |-- chowaj .side-l, .side-r (translateX)
  |     |-- dimuj .cv-area (blur+opacity)
  |     |-- pokaz #lm-overlay (translateY)
  |-- lmBuildGrid()  [czyta nodes, AD_MAP, PHASES]
  |-- lmUpdateTimeline(simPhaseIdx, totalPhases)
  |-- lmUpdateHUD({phase, progress, agents})
  |-- lmStartTime = performance.now()
  |-- lmElapsedTimer = setInterval(lmUpdateClock, 1000)
  |-- if (!simRunning) -> simToggle()  [auto-start sim]
  v
SIMULATION RUNNING
  |
  |-- simStep() fires ->
  |     |-- dispatchEvent('lm-phase-change')
  |     |     |
  |     |     v
  |     |   lmOnPhaseChange(detail)
  |     |     |-- lmBuildGrid() [rebuild z nowymi stanami]
  |     |     |-- lmUpdateTimeline(phaseIdx)
  |     |     |-- lmUpdateHUD(...)
  |     |     |-- lmActivePhase = phaseId
  |     |     |-- SESSION_EVENTS.push({ts, type:'phase', data})
  |     |     |
  |     |     |-- if (isHITLPoint(phaseIdx)) ->
  |     |           |-- PAUSE simTimer (clearTimeout)
  |     |           |-- lmShowDecision(type, data)
  |     |           |-- lmDecisionPending = true
  |     |
  |     |-- showSpeech() -> dispatchEvent('lm-agent-state')
  |     |     |
  |     |     v
  |     |   lmOnAgentState(detail)
  |     |     |-- lmUpdateAgent(nodeId, 'working')
  |     |     |-- SESSION_EVENTS.push(...)
  |     |
  |     |-- addDTLMsg() -> dispatchEvent('lm-agent-msg')
  |           |
  |           v
  |         lmOnAgentMsg(detail)
  |           |-- lmAddCommsMsg(detail) [z Narrative Template jesli S2]
  |           |-- SESSION_EVENTS.push(...)
  |
  |-- (HITL POINT) -> lmShowDecision()
  |     |
  |     v
  |   USER DECISION
  |     |-- Approve (A) -> lmOnDecision('approve') -> resume simTimer
  |     |-- Modify (M)  -> lmOnDecision('modify')  -> modyfikacja + resume
  |     |-- Re-debate (D) -> lmOnDecision('redebate') -> re-run FM phase
  |     |-- lmDecisionPending = false
  |     |-- SESSION_EVENTS.push({ts, type:'decision', data:{action}})
  |
  |-- (REPEAT per phase)
  |
  v
SIMULATION COMPLETE (simStep -> phaseIdx >= total)
  |-- dispatchEvent('lm-phase-change', {isComplete:true})
  |-- lmOnComplete()
  |     |-- clearInterval(lmElapsedTimer)
  |     |-- lmShowSummary() [confetti + stats] (S7)
  |     |-- setTimeout(lmClose, 3000)
  v
MONITOR CLOSED
  |-- lmOpen_ = false
  |-- Reverse animation
  |-- Sidebary wracaja, canvas unblur
```

### 5.2 HITL Decision Points (3 domyslne)

Mapowanie faz na punkty HITL. Monitor interceptuje `lm-phase-change` i sprawdza czy kolejna faza wymaga decyzji.

```javascript
const LM_HITL_MAP = {
  // Po Strategy+Research (polaczone) -- "Oto plan i badania. Akceptujesz?"
  'debate1': { // trigger PRZED debate1
    title: 'Plan i wyniki badan',
    question: 'Orkiestrator przedstawil plan, Researcher zebral dane. Akceptujesz kierunek?',
    options: ['approve', 'modify'],
    phase_completed: ['strategy', 'research']
  },
  // Po Five Minds Debate #1 -- "Gold Solution. Approve/Modify/Re-debate?"
  'build': { // trigger PRZED build
    title: 'Gold Solution -- Five Minds Debate #1',
    question: 'Synthesizer przedstawil Gold Solution. Akceptujesz architekture?',
    options: ['approve', 'modify', 'redebate'],
    phase_completed: ['debate1'],
    isDebateArena: true  // S1: pokaz Debate Arena
  },
  // Final Approval -- "Gotowe. Deploy/Reject?"
  '__complete': { // trigger po ostatniej fazie
    title: 'Final Approval',
    question: 'Pipeline zakonczony. Akceptujesz wynik?',
    options: ['approve', 'reject'],
    phase_completed: ['qa']
  }
};
```

Logika w listenerze `lm-phase-change`:
```javascript
document.addEventListener('lm-phase-change', (e) => {
  const d = e.detail;
  if (d.isComplete) {
    // Final approval
    const hitl = LM_HITL_MAP['__complete'];
    if (hitl && LM_HITL_POINTS >= 3) lmShowDecision(hitl);
    return;
  }
  // Check if entering a HITL-gated phase
  const hitl = LM_HITL_MAP[d.phaseId];
  if (hitl && LM_HITL_POINTS >= 1) {
    // Pause simulation
    if (simTimer) { clearTimeout(simTimer); simTimer = null; }
    lmShowDecision(hitl);
  } else {
    // Normal phase transition
    lmBuildGrid();
    lmUpdateTimeline(d.phaseIdx, d.totalPhases);
    lmUpdateHUD(d);
  }
});
```

### 5.3 Sekwencja HITL Decision

```
1. lm-phase-change fires (nowa faza wymaga HITL)
2. clearTimeout(simTimer) -- PAUZUJE simStep chain
3. Agenci w aktualnej fazie: data-state = 'waiting-for-human'
4. HUD: gold badge pulsuje "DECYZJA WYMAGANA"
5. lmShowDecision() buduje overlay:
   - Tlo: rgba(0,0,0,0.5)
   - Panel: glassmorphism, centered
   - Tytul + pytanie
   - Przyciski: [Akceptuj A] [Modyfikuj M] [Debatuj ponownie D]
   - Keyboard focus trap
6. User klika lub naciska A/M/D
7. lmOnDecision():
   - 'approve' -> simTimer = setTimeout(simStep, 500) -- resume
   - 'modify'  -> placeholder toast "Modyfikacja..." + resume
   - 'redebate' -> simPhaseIdx-- (cofnij o 1) + simStep() -- re-run debate
8. Decision overlay znika (200ms fade)
9. Agenci wracaja do stanow normalnych
```

---

## 6. Conflict Resolution

### 6.1 Mission Control (v18) vs Live Monitor

**DECYZJA: REPLACE. Live Monitor zastepuje Mission Control.**

Uzasadnienie:
- v18 Mission Control jest OSOBNYM kodem w v18 (`AGENT_TEAMS_CONFIGURATOR_v18.html`), NIE przeniesionym do v22
- v22 NIE ZAWIERA kodu Mission Control -- nie ma `#missionControl`, nie ma `mcOpen()`
- Grep v22 potwierdza: zero referencji do "mission", "Mission", "mc" jako prefix funkcji
- Live Monitor implementuje TEN SAM koncept (fullscreen sim dashboard) ale LEPIEJ (Gold Solution features: HITL, 7 stanow, Debate Arena)

**Wniosek:** Brak konfliktu. Nie ma czego replacowac -- v22 nie ma Mission Control.

### 6.2 Dialog Timeline -- duplikacja?

**DECYZJA: DUAL USE -- canvas DTL + monitor comms log KOEGZYSTUJA.**

| Aspekt | Canvas DTL (istniejacy) | Monitor Comms Log (nowy) |
|---|---|---|
| Widocznosc | Gdy monitor zamkniety | Gdy monitor otwarty |
| Pozycja | Lewy panel na canvasie | Prawy panel w monitorze |
| Dane | `addDTLMsg()` -- ten sam zapis | `lm-agent-msg` event listener -- ten sam zapis |
| Filtrowanie | Brak (wszystkie wiadomosci) | Filtr aktywnej fazy (domyslnie) |
| Styl | Istniejacy v22 styl | `lm-` prefixed styl |

**Synchronizacja:**
- `addDTLMsg()` dodaje wpis do canvas DTL ORAZ dispatchuje `lm-agent-msg`
- Monitor comms log slucha `lm-agent-msg` i buduje WLASNA liste (nie klonuje DTL DOM)
- Zero duplikacji danych -- oba sluchaja tego samego zrodla (simStep speech)

**Dlaczego nie reuse DTL DOM:**
- DTL jest wewnatrz `#cvA` (canvas area) -- monitor go zakrywa
- DTL nie ma filtrowania per faza
- Rozne potrzeby layoutu (DTL: waska lista; comms log: szersza z ikona + fase badge)

### 6.3 Keyboard Shortcuts -- konflikty

Audit istniejacych skrotow v22 (linia 3166-3180):

| Klawisz | v22 dzialanie | Konflikt z LM? | Rozwiazanie |
|---|---|---|---|
| `Delete/Backspace` | Usun zaznaczonych | NIE -- monitor nie ma zaznaczenia canvasowego | Guard: `if(lmOpen_) return` |
| `C` | Tryb laczenia | NIE -- nie dziala w monitorze | Guard: `if(lmOpen_) return` |
| `L` | Auto-layout | NIE | Guard: `if(lmOpen_) return` |
| `D` | Dialog timeline toggle | **TAK** -- w monitorze D = "Re-debate" w HITL | Guard: `if(lmOpen_ && lmDecisionPending) { lmOnDecision('redebate'); return }` |
| `E` | Export | NIE | Guard: `if(lmOpen_) return` |
| `?`/`/` | Keyboard shortcuts | NIE -- nadal pokazuje modal | Bez zmian |
| `Space` | Symulacja toggle | **TAK** -- w monitorze space nie powinien stopowac sim | Guard: `if(lmOpen_) { e.preventDefault(); return }` |
| `ArrowLeft/Right` | Learn prev/next | NIE -- learn overlay i monitor sie wykluczaja | Bez zmian (learnOpen check juz istnieje) |
| `Escape` | Zamknij / odznacz | **TAK** -- monitor powinien byc PIERWSZY | Juz rozwiazane w 3.1.7 |
| `+/-/0` | Zoom | NIE -- nie dziala w monitorze | Guard: `if(lmOpen_) return` |
| `Ctrl+A` | Zaznacz wszystkich | NIE | Guard: `if(lmOpen_) return` |

**NOWE skroty w Live Monitor (aktywne TYLKO gdy `lmOpen_`):**

| Klawisz | Dzialanie w LM |
|---|---|
| `M` | Zamknij monitor |
| `Escape` | Zamknij monitor |
| `A` | Approve (gdy HITL decision pending) |
| `R` | Reject (gdy HITL decision pending) |
| `D` | Re-debate (gdy HITL decision pending) |
| `S` | Toggle comms log |
| `,` / `.` | Debate Arena prev/next slide (gdy S1 otwarty) |

**Implementacja -- guard na poczatku keydown handlera (linia 3166):**

```javascript
document.addEventListener('keydown', function(e){
  if(e.target.tagName==='TEXTAREA'||e.target.tagName==='INPUT') return;
  const k = e.key.toLowerCase();
  
  // === LIVE MONITOR SHORTCUTS ===
  if(lmOpen_){
    if(k==='escape'||k==='m'){lmClose();e.preventDefault();return}
    if(lmDecisionPending){
      if(k==='a'){lmOnDecision('approve');e.preventDefault();return}
      if(k==='r'){lmOnDecision('reject');e.preventDefault();return}
      if(k==='d'){lmOnDecision('redebate');e.preventDefault();return}
    }
    if(k==='s'){lmToggleComms();e.preventDefault();return}
    if(k===','||k==='arrowleft'){if(lmDebateSlide>0){lmDebateSlide--;lmDebateNext()}e.preventDefault();return}
    if(k==='.'||k==='arrowright'){lmDebateSlide++;lmDebateNext();e.preventDefault();return}
    e.preventDefault(); return; // Block ALL other keys when monitor open
  }
  
  // === EXISTING V22 SHORTCUTS (unchanged) ===
  if(k==='delete'||k==='backspace'){delSel();e.preventDefault()}
  // ... reszta bez zmian
});
```

---

## 7. Testing Checklist

### 7.1 Functional Tests

| # | Test | Oczekiwany wynik | Priorytet |
|---|---|---|---|
| F1 | Klik "Live Monitor" bez agentow na canvasie | Toast "Dodaj agentow!" -- monitor NIE otwiera sie | MUST |
| F2 | Klik "Live Monitor" z Deep Five Minds presetem | Monitor otwiera sie, 24 agentow w gridzie, 6 faz w timeline | MUST |
| F3 | M toggle ON/OFF | Monitor otwiera/zamyka sie, canvas nienaruszony | MUST |
| F4 | Escape w monitorze | Monitor zamyka sie | MUST |
| F5 | Symulacja auto-start przy otwarciu | Jesli sim nie dziala, startuje automatycznie | MUST |
| F6 | Symulacja kontynuuje po zamknieciu | Zamknij M, poczekaj, otworz M -- stan zaawansowany | MUST |
| F7 | HITL decision point #1 (po strategy+research) | Sim pauzuje, decision panel pojawia sie, A/R/D dzialaja | MUST |
| F8 | HITL decision point #2 (po FM#1 -- Gold Solution) | Debate Arena z expert cards (jesli S1), approve/modify/redebate | MUST |
| F9 | HITL decision point #3 (final approval) | Deploy/reject decision panel | MUST |
| F10 | Emergency STOP | Natychmiastowe zatrzymanie, shake+flash, monitor zamyka sie | MUST |
| F11 | Comms log filtr aktywnej fazy | Domyslnie pokazuje wiadomosci z biezacej fazy | MUST |
| F12 | Agent card stany (7 stanow) | Kazdy stan ma: poprawny kolor, ikone, label, animacje | MUST |
| F13 | Phase timeline progress | Completed = checkmark, active = glow, upcoming = dim | MUST |
| F14 | HUD metryki aktualizacja | Faza, progress %, timer, aktywni agenci -- live update | MUST |
| F15 | Keyboard nav w monitorze | Tab/Shift+Tab miedzy elementami, focus trap | MUST |
| F16 | Keyboard A/R/D w HITL | Dzialaja TYLKO gdy decision pending | MUST |
| F17 | Space NIE stopuje sim w monitorze | Space jest zablokowany | MUST |
| F18 | Re-debate (D w HITL) | FM faza restartuje, nowa runda debaty | SHOULD |
| F19 | Debate Arena 3 slidy (S1) | Opinie -> debata -> synteza, navigation </> | SHOULD |
| F20 | Narrative Templates (S2) | "Researcher zanurza sie..." zamiast raw state | SHOULD |
| F21 | Mission Pulse (S5) | Subtelna zmiana jasnosci tla | SHOULD |
| F22 | Completion celebration (S7) | Confetti + summary stats | SHOULD |

### 7.2 Performance Tests

| # | Test | Target | Hard Limit | Jak mierzyc |
|---|---|---|---|---|
| P1 | FPS z monitorem otwartym (desktop) | >= 55 | >= 45 | DevTools Performance tab |
| P2 | FPS z monitorem + HITL overlay | >= 50 | >= 40 | DevTools Performance tab |
| P3 | Memory przy otwarciu monitora | < +30 MB | < +50 MB | `performance.memory` delta |
| P4 | Czas otwarcia monitora (cold) | < 200ms | < 400ms | `performance.measure()` |
| P5 | Czas otwarcia monitora (warm) | < 50ms | < 100ms | `performance.measure()` |
| P6 | DOM count w monitorze (27 agentow) | < 400 | < 600 | `querySelectorAll('*').length` na `#lm-overlay` |
| P7 | State -> Visual latencja | < 16.67ms | < 33ms | `performance.measure()` w event listener |
| P8 | Jednoczesne backdrop-filter | <= 3 | <= 4 | Manual audit |
| P9 | Rozmiar pliku po dodaniu LM | < 400 KB | < 450 KB | `ls -la` |
| P10 | LOC po dodaniu LM | < 4500 | < 5000 | `wc -l` |

### 7.3 Regression Tests

| # | Test | Oczekiwany wynik |
|---|---|---|
| R1 | Presety laduja sie poprawnie BEZ monitora | Bez zmian |
| R2 | Symulacja na canvasie (BEZ monitora) dziala | Speech, DTL, progress bars, phase dim -- jak v22 |
| R3 | Context menu prawy-klik | Bez zmian |
| R4 | Encyklopedia agenta/presetu | Bez zmian |
| R5 | Export/Import JSON | Bez zmian |
| R6 | Save/Load localStorage | Bez zmian |
| R7 | Final Prompt (rich view) | Bez zmian |
| R8 | Canvas zoom/pan/marquee | Bez zmian |
| R9 | Starfield rendering | Kontynuuje pod monitorem (dimmed) |
| R10 | prefers-reduced-motion | Istniejace + nowe animacje respektowane |

### 7.4 Accessibility Tests

| # | Test | WCAG | Oczekiwany wynik |
|---|---|---|---|
| A1 | Tab navigation w monitorze | 2.1.1 | Wszystkie interaktywne elementy osiagalne tabem |
| A2 | Focus trap w HITL decision | 2.1.2 | Focus nie ucieka z decision panel |
| A3 | Escape zamyka | 2.1.2 | Monitor i overlaye zamykaja sie Escape |
| A4 | ARIA live na comms log | 4.1.3 | `aria-live="polite"` na kontenerze comms |
| A5 | ARIA live na HITL | 4.1.3 | `aria-live="assertive"` na decision panel |
| A6 | Status labels (nie samo kolor) | 1.4.1 | Kazdy status ma: kolor + ikona + tekst label |
| A7 | Done = blue (#3B82F6) nie green | 1.4.1 | Rozroznialne od working (#34D399) |
| A8 | Kontrast tekstu | 1.4.3 | Tekst primary >= 4.5:1 na tle paneli |
| A9 | prefers-reduced-motion | 2.3.3 | Zero animacji (instant transitions) |
| A10 | Screen reader (NVDA) | Multiple | Monitor oglosza: fazy, stany agentow, HITL |

---

## 8. Implementation Order

### Zasada: po kazdym kroku aplikacja DZIALA. Zero broken intermediate states.

```
PHASE 0: INFRASTRUCTURE (przed jakimkolwiek kodem LM)
=======================================================

Krok 0.1: Performance baseline v22
  - 30 min Chrome DevTools na v22 z Deep Five Minds preset
  - Zmierz: FPS idle, FPS sim, memory idle, memory sim, DOM count
  - ZAPISZ WYNIKI w komentarzu na gorze pliku

Krok 0.2: Audit v22 -- dead code, duplikacje
  - Cel: -200 LOC
  - Kandydaci: nadmiarowe komentarze, duplikacje w CSS, unused styles
  - TEST: regresja R1-R10 -- wszystko dziala jak przed audytem

Krok 0.3: Done color fix
  - Linia CSS z --status-done: #22C55E -> #3B82F6
  - Linia ~190 (.sim-done check kolor) -- jesli jest -- tez #3B82F6
  - TEST: Symulacja, done agenci maja NIEBIESKI check

Krok 0.4: .mo z-index formalizacja
  - Dodaj: .mo { z-index: 250; } w bloku CSS
  - TEST: Export/Import modals nadal dzialaja poprawnie


PHASE 1: CORE MONITOR -- MVP (1-2 sesje)
==========================================

Krok 1.1: Feature flags + state variables (~10 LOC)
  - Dodaj blok zmiennych/stalych (sekcja 1.4) PO istniejacych zmiennych (po linia 2147)
  - TEST: Aplikacja laduje sie bez bledow (flags sa const, nie zmieniaja nic)

Krok 1.2: Event hooks w istniejacych funkcjach (~20 LOC)
  - Dodaj dispatchEvent w: simToggle, simStop, simStep, addDTLMsg, showSpeech
  - Jak opisano w sekcji 3.1.1 - 3.1.6
  - TEST: Symulacja na canvasie dziala IDENTYCZNIE (events dispatched ale nikt nie slucha)
  - WALIDACJA: Otworz DevTools -> addEventListener('lm-phase-change', console.log) -> potwierdz zdarzenia

Krok 1.3: CSS Live Monitor -- prefixed block (~200 LOC CSS)
  - Dodaj CALY blok CSS z prefixem lm- PRZED </style> (linia 637)
  - Zawiera: overlay, HUD, grid, cards, timeline, comms, decision, stany agentow
  - Zawiera: @media (prefers-reduced-motion) blok dla lm-
  - TEST: CSS nie wplywa na istniejacy UI (wszystko lm- prefixed, overlay display:none)

Krok 1.4: HTML overlay stub (~30 LOC HTML)
  - Dodaj #lm-overlay div PRZED </body> (linia 3203), z display:none
  - Zawiera: lm-hud, lm-grid, lm-timeline, lm-comms, lm-decision (puste kontenery)
  - Dodaj przycisk "Live Monitor" w topbar (po linia 655)
  - TEST: Przycisk widoczny, klik nic nie robi (lmOpen jeszcze nie istnieje)

Krok 1.5: lmInit() + lmOpen() + lmClose() -- lifecycle (~70 LOC JS)
  - Lazy init: builduje DOM wewnatrz #lm-overlay
  - Open: animacja entry, chowaj sidebary
  - Close: reverse animacja
  - Dodaj 'M' shortcut i Escape handler (sekcja 3.1.7)
  - TEST: Klik "Live Monitor" -> overlay wjezdza (pusty). Escape -> wraca. Canvas nienaruszony.

Krok 1.6: lmBuildGrid() -- agent grid pogrupowany wg faz (~80 LOC JS)
  - Czyta nodes + AD_MAP + PHASES
  - Buduje phase containers z kartami agentow
  - Aktywna faza full, completed zwiniety, upcoming dimmed
  - TEST: Otworz monitor z Deep Five Minds -> 6 grup faz, 24 karty agentow

Krok 1.7: lmUpdateAgent() -- 7 stanow (~30 LOC JS + CSS z 1.3)
  - data-state attribute na .lm-card
  - CSS selektory: kolor, ikona, animacja, label
  - Done = blue (#3B82F6)
  - TEST: Wlacz symulacje -> agenci zmieniaja stany (idle->working->done)

Krok 1.8: lmUpdateTimeline() + lmUpdateHUD() (~35 LOC JS)
  - Timeline: horizontal stepper z 6 dots
  - HUD: LIVE indicator, faza, progress %, timer, aktywni agenci, STOP
  - TEST: Symulacja w monitorze -> HUD aktualizuje sie live

Krok 1.9: Emergency STOP (~15 LOC)
  - Przycisk w HUD -> simStop() + lmClose()
  - Shake + red flash CSS
  - TEST: Klik STOP -> natychmiastowe zatrzymanie + zamkniecie

** MILESTONE: MVP Monitor -- otwierasz, widzisz agentow, statusy, fazy, timeline, STOP **


PHASE 2: KOMUNIKACJA + INTERAKCJA (1 sesja)
=============================================

Krok 2.1: lmAddCommsMsg() + comms log panel (~40 LOC JS)
  - Prawy panel 280px collapsible
  - Slucha 'lm-agent-msg' events
  - Filtr domyslny = aktywna faza
  - Reverse chronological
  - TEST: Symulacja -> wiadomosci pojawiaja sie w panelu

Krok 2.2: lmShowDecision() + lmOnDecision() -- HITL panel (~70 LOC JS)
  - 3 decision points (sekcja 5.2)
  - Blocking overlay z przyciskami Approve/Modify/Re-debate
  - Keyboard A/R/D
  - Focus trap
  - TEST: Symulacja dociera do HITL -> panel, klik Approve -> resume

Krok 2.3: Keyboard integration -- full guard (~25 LOC JS)
  - Guard na poczatku keydown (sekcja 6.3)
  - Block canvas shortcuts w monitorze
  - TEST: M otwiera/zamyka, A/R/D w HITL, Space nie stopuje, Tab nawiguje

Krok 2.4: Kontekstowy HUD dim (S4) (~10 LOC CSS)
  - Completed phases: opacity 0.4
  - Aktywna faza: full brightness
  - TEST: Fazy postepuja -> completed szare, active jasna

Krok 2.5: SESSION_EVENTS logging (~10 LOC JS)
  - Push do SESSION_EVENTS w listenerach (przygotowanie pod replay v24)
  - TEST: Po symulacji: `console.log(SESSION_EVENTS)` -> array zdarzen

** MILESTONE: Pelna interakcja -- comms log, HITL decisions, keyboard nav **


PHASE 3: POLISH + EDUKACJA (1 sesja, jesli budzet LOC)
========================================================

Krok 3.1: Narrative Templates (S2) (~40 LOC JS)
  - NARRATIVE_TEMPLATES obiekt: 3 szablony per agent per state
  - lmNarrative() zamienia state na tekst ludzkiego jezyka
  - TEST: Comms log: "Researcher zanurza sie w analiza..." zamiast "working"

Krok 3.2: Uproszczona Debate Arena (S1) (~150 LOC JS + CSS)
  - 5 expert cards w polkolu (statyczny layout)
  - Gold Solution focal card
  - 3 slidy: opinie -> debata -> synteza
  - Round-based pacing (user klika "Dalej")
  - Keyboard ,/. lub arrows
  - TEST: HITL po FM#1 -> Debate Arena z 5 ekspertami, nawigacja slidow

Krok 3.3: Mission Pulse (S5) (~15 LOC CSS/JS)
  - Sinusoidalna zmiana jasnosci tla monitora
  - Synchronizowana z simRunning
  - @media (prefers-reduced-motion: reduce) { display: none }
  - TEST: Subtelne pulsowanie tla podczas symulacji

Krok 3.4: View Transitions API (S6) (~20 LOC JS)
  - Wrapper document.startViewTransition() w lmOpen/lmClose
  - Fallback: instant (juz zaimplementowane)
  - TEST: Chrome 111+ -> plynne morphing. Starsze -> instant.

Krok 3.5: Simulation complete celebration (S7) (~40 LOC JS + CSS)
  - Reuse confetti z v7 pattern (inline, ~50 particles)
  - Summary stats: czas, decyzje, agentow, faz
  - Max 1.5s confetti
  - TEST: Symulacja zakonczy sie -> confetti + stats overlay

** MILESTONE: Pelny Live Monitor Mode z HITL, Debate Arena, narrative text **


POST-IMPLEMENTATION
====================

Krok 4.1: Performance verification
  - Powtorz baseline z kroku 0.1
  - Porownaj z Performance Contract (Gold Solution sekcja Performance Contract)
  - Jesli FPS < 45: degradation strategy (wylacz starfield, static connections, solid bg)

Krok 4.2: LOC / size audit
  - wc -l -> target < 4500 LOC
  - ls -la -> target < 400 KB
  - Jesli przekroczony: optymalizacja CSS (merge duplikatow), skrocenie komentarzy

Krok 4.3: Cross-browser smoke test
  - Chrome 120+, Firefox 120+, Safari 17+
  - prefers-reduced-motion ON/OFF
  - Keyboard-only navigation
```

---

## Appendix A: DOM Structure of #lm-overlay

```html
<div id="lm-overlay" class="lm-overlay" style="display:none" role="dialog" aria-modal="true" aria-label="Live Monitor">
  
  <!-- HUD TOPBAR -->
  <header class="lm-hud">
    <div class="lm-hud-live"><span class="lm-live-dot"></span> LIVE</div>
    <div class="lm-hud-sep"></div>
    <div class="lm-hud-phase" id="lmPhase">Phase 1/6: STRATEGIA</div>
    <div class="lm-hud-progress"><div class="lm-hud-progress-bar" id="lmProgress"></div></div>
    <div class="lm-hud-timer" id="lmTimer">00:00</div>
    <div class="lm-hud-agents" id="lmAgents">0/27</div>
    <button class="lm-hud-stop" id="lmStop" onclick="lmStop()" aria-label="Emergency Stop">STOP</button>
    <button class="lm-hud-close" onclick="lmClose()" aria-label="Zamknij monitor">&times;</button>
  </header>
  
  <!-- MAIN AREA -->
  <div class="lm-main">
    
    <!-- AGENT GRID (scrollable) -->
    <div class="lm-grid" id="lmGrid">
      <!-- Budowane dynamicznie przez lmBuildGrid() -->
      <!-- Struktura per faza: -->
      <!--
      <div class="lm-phase-group" data-phase="strategy">
        <div class="lm-phase-header">
          <span class="lm-phase-dot" style="background:#818CF8"></span>
          STRATEGIA <span class="lm-phase-count">4</span>
          <span class="lm-phase-time">1m23s</span>
        </div>
        <div class="lm-phase-cards">
          <div class="lm-card" data-state="done" data-agent="orchestrator">
            <div class="lm-card-icon">[SVG]</div>
            <div class="lm-card-name">Orkiestrator</div>
            <div class="lm-card-status">Done</div>
            <div class="lm-card-progress"><div class="lm-card-bar"></div></div>
          </div>
          ...
        </div>
      </div>
      -->
    </div>
    
    <!-- COMMS LOG (right panel) -->
    <aside class="lm-comms" id="lmComms" aria-label="Log komunikacji">
      <div class="lm-comms-header">
        <span>Komunikacja</span>
        <button class="lm-comms-filter" id="lmCommsFilter">Aktywna faza</button>
        <button class="lm-comms-collapse" onclick="lmToggleComms()" aria-label="Zwin/rozwin">&laquo;</button>
      </div>
      <div class="lm-comms-list" id="lmCommsList" aria-live="polite">
        <!-- Budowane dynamicznie -->
      </div>
    </aside>
    
  </div>
  
  <!-- PHASE TIMELINE (bottom) -->
  <nav class="lm-timeline" id="lmTimeline" aria-label="Postep faz">
    <!-- Budowane dynamicznie przez lmUpdateTimeline() -->
    <!-- Struktura: -->
    <!--
    <div class="lm-tl-step completed"><div class="lm-tl-dot"></div><div class="lm-tl-label">STRATEGIA</div></div>
    <div class="lm-tl-line completed"></div>
    <div class="lm-tl-step active"><div class="lm-tl-dot"></div><div class="lm-tl-label">FM#1</div></div>
    <div class="lm-tl-line"></div>
    <div class="lm-tl-step"><div class="lm-tl-dot"></div><div class="lm-tl-label">BUILD</div></div>
    -->
  </nav>
  
  <!-- HITL DECISION OVERLAY -->
  <div class="lm-decision" id="lmDecision" role="alertdialog" aria-modal="true" aria-live="assertive" style="display:none">
    <div class="lm-decision-panel">
      <div class="lm-decision-badge">DECYZJA WYMAGANA</div>
      <h2 class="lm-decision-title" id="lmDecTitle"></h2>
      <p class="lm-decision-question" id="lmDecQuestion"></p>
      <div class="lm-decision-actions" id="lmDecActions">
        <!-- Budowane dynamicznie -->
      </div>
    </div>
  </div>
  
  <!-- DEBATE ARENA OVERLAY (S1) -->
  <div class="lm-debate" id="lmDebate" role="dialog" aria-modal="true" style="display:none">
    <div class="lm-debate-arena">
      <div class="lm-debate-experts" id="lmDebateExperts">
        <!-- 5 expert cards w polkolu -->
      </div>
      <div class="lm-debate-gold" id="lmDebateGold">
        <!-- Gold Solution card -->
      </div>
      <div class="lm-debate-nav">
        <button onclick="lmDebateSlide--;lmDebateNext()">&larr; Poprzedni</button>
        <span id="lmDebateSlideLabel">1 / 3</span>
        <button onclick="lmDebateSlide++;lmDebateNext()">Nastepny &rarr;</button>
      </div>
    </div>
  </div>
  
  <!-- MISSION PULSE (S5) -->
  <div class="lm-pulse" id="lmPulse"></div>
  
</div>
```

---

## Appendix B: Estimated LOC Impact

```
ISTNIEJACY v22:          3204 LOC
Audit (krok 0.2):        -200 LOC (szacunek)
Color fix (0.3):            +1 LOC
z-index (0.4):              +1 LOC
Event hooks (1.2):         +20 LOC
Keyboard guard (2.3):      +25 LOC
Topbar button (1.4):        +1 LOC
KB modal wiersz:            +1 LOC
----------------------------
Modyfikacje v22:           -151 LOC netto

NOWY KOD Live Monitor:
CSS lm- block:            ~200 LOC
HTML #lm-overlay:          ~30 LOC
JS lifecycle:              ~70 LOC
JS grid/cards:             ~80 LOC
JS agent states:           ~30 LOC
JS timeline/HUD:           ~35 LOC
JS STOP:                   ~15 LOC
JS comms log:              ~40 LOC
JS HITL decision:          ~70 LOC
JS SESSION_EVENTS:         ~10 LOC
Feature flags/vars:        ~10 LOC
Narrative (S2):            ~40 LOC
Debate Arena (S1):        ~150 LOC
Mission Pulse (S5):        ~15 LOC
View Transitions (S6):     ~20 LOC
Celebration (S7):          ~40 LOC
----------------------------
Nowy kod:                 ~855 LOC

SUMA:  3204 - 200 + (-151+151) + 855 = ~3859 LOC
(w praktyce: ~4060 LOC -- margines bledu +200)

TARGET: < 4500 LOC -- W BUDZECIE z buforem ~440 LOC
```

---

## Appendix C: Event Listener Registration (lmInit)

```javascript
function lmInit() {
  if (lmLoaded) return;
  
  // 1. Inject CSS (jesli nie inline -- ale preferujemy inline w <style>)
  // SKIP -- CSS juz w <style> bloku
  
  // 2. Register event listeners
  document.addEventListener('lm-sim-start', (e) => {
    if (!lmOpen_) return; // Monitor zamkniety -- ignoruj
    lmStartTime = performance.now();
    lmBuildGrid();
  });
  
  document.addEventListener('lm-sim-stop', () => {
    if (!lmOpen_) return;
    lmClose();
  });
  
  document.addEventListener('lm-phase-change', (e) => {
    if (!lmOpen_) return;
    const d = e.detail;
    SESSION_EVENTS.push({ts: performance.now() - lmStartTime, type: 'phase', data: d});
    
    if (d.isComplete) {
      clearInterval(lmElapsedTimer);
      // Check final HITL
      if (LM_HITL_MAP['__complete'] && LM_HITL_POINTS >= 3) {
        if (simTimer) { clearTimeout(simTimer); simTimer = null; }
        lmShowDecision(LM_HITL_MAP['__complete']);
      } else {
        lmOnComplete();
      }
      return;
    }
    
    // Check HITL gate
    const hitl = LM_HITL_MAP[d.phaseId];
    if (hitl && !lmDecisionPending) {
      if (simTimer) { clearTimeout(simTimer); simTimer = null; }
      lmShowDecision(hitl);
      return;
    }
    
    lmActivePhase = d.phaseId;
    lmBuildGrid();
    lmUpdateTimeline(d.phaseIdx, d.totalPhases);
    lmUpdateHUD({
      phaseLabel: d.phaseLabel,
      phaseIdx: d.phaseIdx,
      totalPhases: d.totalPhases,
      activeAgents: d.agentDefIds?.length || 0,
      totalAgents: nodes.length
    });
  });
  
  document.addEventListener('lm-agent-state', (e) => {
    if (!lmOpen_) return;
    const d = e.detail;
    SESSION_EVENTS.push({ts: performance.now() - (lmStartTime||0), type: 'state', data: d});
    lmUpdateAgent(d.nodeId, d.state);
  });
  
  document.addEventListener('lm-agent-msg', (e) => {
    if (!lmOpen_) return;
    const d = e.detail;
    SESSION_EVENTS.push({ts: performance.now() - (lmStartTime||0), type: 'msg', data: d});
    lmAddCommsMsg(d);
  });
  
  lmLoaded = true;
}
```

---

*Raport przygotowany przez Integrator [OPUS] w ramach Deep Five Minds Protocol -- faza BUILD.*
*Precyzja: nazwy funkcji, numery linii, dokldane sekwencje wywolan z v22 (3204 LOC).*
*Data: 4 kwietnia 2026*
