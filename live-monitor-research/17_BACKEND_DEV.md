# Backend Dev [OPUS] -- Architektura Danych i Logiki Biznesowej
## Live Monitor Mode v22

**Data:** 2026-04-04
**Rola:** Backend Dev (Deep Five Minds Protocol, faza BUILD)
**Zrodla:** 13_GOLD_SOLUTION.md, 01_RESEARCHER_TECH.md, MANIFEST.md, analiza kodu v21
**Kontekst:** Single-file HTML (~3200 LOC v21), inline JS, 27 agentow, 29 presetow, 6 faz, localStorage persistence

---

## Spis tresci

1. [Data Model](#1-data-model)
2. [Event System](#2-event-system)
3. [Simulation Integration](#3-simulation-integration)
4. [HITL Decision Logic](#4-hitl-decision-logic)
5. [Metrics Calculator](#5-metrics-calculator)
6. [Narrative Engine](#6-narrative-engine)
7. [localStorage Schema](#7-localstorage-schema)
8. [Error Handling](#8-error-handling)

---

## 1. Data Model

### 1.1 Live Monitor State -- glowny obiekt stanu

Centralny singleton. Jeden obiekt zarzadza calym stanem monitora. Proxy wrapper zapewnia reaktywnosc (automatyczny dispatch do UI przy kazdej zmianie).

```javascript
/**
 * @typedef {'idle'|'running'|'paused'|'hitl'|'completed'|'error'|'stopped'} MonitorStatus
 * @typedef {'full-control'|'act-confirm'|'full-auto'} AutonomyLevel
 */

const LM_DEFAULTS = {
  status: 'idle',           // MonitorStatus
  autonomy: 'act-confirm',  // AutonomyLevel (Gold Solution: 3 poziomy)
  autoApproveTimer: 0,      // 0 = OFF (Gold Solution: timer OFF domyslnie)
  reducedMotion: false,     // prefers-reduced-motion respekt
  commsFilterPhase: null,   // null = aktywna faza, string = konkretna faza
  commsCollapsed: false,    // prawy panel zwiniety?
  debateArenaOpen: false,   // Debate Arena overlay aktywny?
  monitorLoaded: false      // lazy init flag
};

/**
 * Glowny obiekt stanu Live Monitor.
 * Opakowywany w Proxy dla reaktywnosci (sekcja 1.7).
 */
const LM_STATE = {
  // -- Core --
  status: 'idle',             // MonitorStatus
  autonomy: 'act-confirm',    // AutonomyLevel
  startTime: 0,               // performance.now() timestamp startu
  monitorVisible: false,      // czy overlay jest widoczny

  // -- Phase --
  phase: {
    currentIndex: -1,         // indeks w relevantPhases[] (-1 = nie rozpoczeto)
    currentId: null,          // string id fazy np. 'strategy'
    phases: [],               // Phase[] -- relevantPhases obliczone na starcie
    completedIds: new Set(),  // Set<string> -- id ukonczonych faz
    timing: {}                // { [phaseId]: { start: number, end: number|null } }
  },

  // -- Agents --
  agents: {},                 // { [nodeId]: AgentRuntimeState }

  // -- HITL --
  hitl: {
    pending: null,            // HITLDecision | null
    history: [],              // HITLDecisionRecord[]
    decisionCount: 0          // ile decyzji podjeto w tej sesji
  },

  // -- Debate --
  debate: {
    active: false,            // czy debata trwa
    debateIndex: 0,           // 0 = FM#1, 1 = FM#2
    round: 0,                 // 0-2 (opinie, debata, synteza)
    opinions: {},             // { [expertId]: string }
    goldSolution: null,       // string | null
    consensusScore: 0         // 0-100
  },

  // -- Metrics (computed, read-only) --
  metrics: {
    elapsed: 0,               // ms od startu
    activeCount: 0,           // ile agentow working/thinking
    totalAgents: 0,           // ile agentow w ukladzie
    phaseLabel: '',           // "Phase 3/6: FM#1"
    progressPct: 0,           // 0-100
    estimatedTokens: 0,       // szacunek tokenow (edukacyjny)
    estimatedCost: 0          // szacunek kosztu USD (edukacyjny)
  },

  // -- Comms Log --
  comms: {
    messages: [],             // CommsMessage[]
    filterPhase: null,        // null = aktywna faza
    collapsed: false
  },

  // -- Session Events (fundament pod przyszly replay, ~10 LOC teraz) --
  sessionEvents: [],          // SessionEvent[]

  // -- Settings --
  settings: {
    autonomy: 'act-confirm',
    autoApproveTimer: 0,      // sekundy, 0 = OFF
    reducedMotion: false,
    narrativeEnabled: true,
    missionPulse: true
  }
};
```

### 1.2 Agent Runtime State -- per agent

Kazdy agent na ukladzie (node) dostaje swoj stan runtime w trakcie symulacji. Klucz = `node.id` (nie `defId`, bo ten sam agent moze byc na ukladzie wielokrotnie).

```javascript
/**
 * @typedef {'idle'|'queued'|'working'|'thinking'|'done'|'error'|'hitl'} AgentStatus
 */

/**
 * @typedef {Object} AgentRuntimeState
 * @property {string} nodeId       -- unikalny id noda na ukladzie
 * @property {string} defId        -- id definicji agenta z AD (np. 'res_tech')
 * @property {AgentStatus} status  -- aktualny stan (7 stanow z Gold Solution)
 * @property {number} progress     -- 0-100 (progress bar %)
 * @property {string|null} currentMessage -- aktualnie wyswietlana wiadomosc
 * @property {string} phaseId      -- do ktorej fazy nalezy
 * @property {boolean} alwaysOn    -- czy jest always-on (orchestrator, synthesizer)
 * @property {number} statusChangedAt -- performance.now() ostatniej zmiany statusu
 * @property {string} statusLabel  -- tekstowy label statusu ("Working", "Idle", etc.)
 * @property {number} messageCount -- ile wiadomosci wyslal w tej sesji
 */

// Fabryka -- tworzy stan runtime dla jednego agenta
function createAgentRuntime(node) {
  const def = AD_MAP.get(node.defId);
  const phaseObj = PHASES.find(p => p.agents.includes(node.defId));
  return {
    nodeId: node.id,
    defId: node.defId,
    status: 'idle',
    progress: 0,
    currentMessage: null,
    phaseId: phaseObj ? phaseObj.id : 'strategy',
    alwaysOn: ALWAYS_ON_IDS.includes(node.defId),
    statusChangedAt: 0,
    statusLabel: 'Idle',
    messageCount: 0
  };
}

// Status -> label mapping (Gold Solution: obowiazkowe labele tekstowe)
const STATUS_LABELS = {
  idle:     'Idle',
  queued:   'W kolejce',
  working:  'Pracuje',
  thinking: 'Analizuje',
  done:     'Gotowe',
  error:    'Blad',
  hitl:     'Czeka na Ciebie'
};

// Status -> CSS properties (Gold Solution: 7 stanow z 3 kanalami: kolor+ikona+animacja)
const STATUS_VISUAL = {
  idle:     { color: '#6B7280', icon: '○', animation: 'breathing',    cssClass: 'lm-idle' },
  queued:   { color: '#6366F1', icon: '◷', animation: 'pulse',       cssClass: 'lm-queued' },
  working:  { color: '#34D399', icon: '⟳', animation: 'spin-ring',   cssClass: 'lm-working' },
  thinking: { color: '#F59E0B', icon: '✦', animation: 'shimmer',     cssClass: 'lm-thinking' },
  done:     { color: '#3B82F6', icon: '✓', animation: 'burst-dim',   cssClass: 'lm-done' },      // BLUE nie zielony!
  error:    { color: '#EF4444', icon: '⚠', animation: 'shake-glow',  cssClass: 'lm-error' },
  hitl:     { color: '#F59E0B', icon: '✋', animation: 'beacon-pulse', cssClass: 'lm-hitl' }
};
```

### 1.3 Phase State

```javascript
/**
 * @typedef {Object} PhaseState
 * @property {number} currentIndex     -- indeks aktywnej fazy w phases[] (-1 = brak)
 * @property {string|null} currentId   -- id aktywnej fazy
 * @property {PhaseInfo[]} phases      -- tablica faz (obliczona na starcie na bazie nodow na ukladzie)
 * @property {Set<string>} completedIds -- id ukonczonych faz
 * @property {Object} timing           -- { [phaseId]: { start: number, end: number|null, duration: number|null } }
 */

/**
 * @typedef {Object} PhaseInfo
 * @property {string} id      -- np. 'strategy'
 * @property {string} label   -- np. 'STRATEGIA'
 * @property {string} color   -- np. '#818CF8'
 * @property {string[]} agentNodeIds -- node IDs agentow w tej fazie (obliczone na starcie)
 * @property {number} agentCount     -- ile agentow
 */

// Buduje fazy na podstawie aktualnych nodow na canvasie
function buildPhaseState(nodes) {
  const nodePhaseIds = [];
  nodes.forEach(nd => {
    const d = AD_MAP.get(nd.defId);
    if (d && d.phase && !nodePhaseIds.includes(d.phase)) {
      nodePhaseIds.push(d.phase);
    }
  });

  const phases = PHASES
    .filter(p => nodePhaseIds.includes(p.id))
    .map(p => {
      const agentNodeIds = nodes
        .filter(nd => {
          const d = AD_MAP.get(nd.defId);
          return d && d.phase === p.id;
        })
        .map(nd => nd.id);
      return {
        id: p.id,
        label: p.label,
        color: p.color,
        agentNodeIds: agentNodeIds,
        agentCount: agentNodeIds.length
      };
    });

  return {
    currentIndex: -1,
    currentId: null,
    phases: phases,
    completedIds: new Set(),
    timing: {}
  };
}
```

### 1.4 HITL Decision State

```javascript
/**
 * @typedef {'phase-gate'|'gold-solution'|'final-approval'} HITLType
 * @typedef {'approve'|'modify'|'re-debate'|'reject'|'auto-approved'|'skipped'} HITLOutcome
 */

/**
 * Pending decision -- jedna aktywna na raz.
 * @typedef {Object} HITLDecision
 * @property {string} id              -- unikalne id decyzji (np. 'hitl-1-fm1')
 * @property {HITLType} type          -- typ decyzji
 * @property {string} phaseId         -- przy ktorej fazie
 * @property {string} title           -- np. "Gold Solution: Architektura systemu"
 * @property {string} description     -- opis kontekstu decyzji
 * @property {string[]} options       -- dostepne akcje np. ['approve','modify','re-debate']
 * @property {string} recommended     -- recommended option id
 * @property {string|null} goldSolution -- trescgold solution (jesli debate type)
 * @property {Object|null} expertOpinions -- { [expertId]: string } (jesli debate type)
 * @property {number} requestedAt     -- performance.now() kiedy wyswietlono
 * @property {number} timeoutMs       -- 0 = brak limitu (Gold Solution: timer OFF domyslnie)
 * @property {string} keyboardHint    -- "A: Zatwierdz | R: Odrzuc | D: Debata"
 */

/**
 * Zapisany wynik decyzji.
 * @typedef {Object} HITLDecisionRecord
 * @property {string} id
 * @property {HITLType} type
 * @property {string} phaseId
 * @property {HITLOutcome} outcome
 * @property {number} requestedAt     -- kiedy wyswietlono
 * @property {number} decidedAt       -- kiedy user zdecydowal
 * @property {number} responseTimeMs  -- decidedAt - requestedAt
 * @property {string|null} userNote   -- opcjonalna notatka usera (modify)
 */

// 3 punkty HITL (Gold Solution):
const HITL_POINTS = [
  {
    id: 'hitl-post-strategy-research',
    afterPhases: ['strategy', 'research'],  // po OBU fazach
    type: 'phase-gate',
    title: 'Plan i badania gotowe',
    description: 'Orkiestrator przygotowal plan, badacze zebrali dane. Akceptujesz kierunek?',
    options: ['approve', 'modify'],
    recommended: 'approve',
    keyboardHint: 'A: Zatwierdz | M: Modyfikuj'
  },
  {
    id: 'hitl-gold-solution-fm1',
    afterPhases: ['debate1'],
    type: 'gold-solution',
    title: 'Gold Solution: Debata ekspertow #1',
    description: 'Five Minds Protocol wygenerowalo Gold Solution. Przejrzyj argumenty ekspertow.',
    options: ['approve', 'modify', 're-debate'],
    recommended: 'approve',
    keyboardHint: 'A: Zatwierdz | M: Modyfikuj | D: Ponowna debata'
  },
  {
    id: 'hitl-final-approval',
    afterPhases: ['qa'],
    type: 'final-approval',
    title: 'Koncowa akceptacja',
    description: 'Pipeline zakonczony. Wszystkie fazy ukonczone. Deploy czy odrzucasz?',
    options: ['approve', 'reject'],
    recommended: 'approve',
    keyboardHint: 'A: Zatwierdz (Deploy) | R: Odrzuc'
  }
];

// Non-blocking Intent Preview (S3) -- informacja, nie blokujacy modal
const INTENT_PREVIEWS = [
  {
    beforePhase: 'build',
    title: 'Faza Build: co agenci zamierzaja zrobic',
    template: 'Backend, Frontend i Designer rozpoczna implementacje na bazie Gold Solution.'
  },
  {
    beforePhase: 'debate2',
    title: 'Five Minds #2: ponowna ocena',
    template: 'Eksperci ocenia wyniki fazy Build i QA.'
  }
];
```

### 1.5 Debate State

```javascript
/**
 * @typedef {Object} DebateState
 * @property {boolean} active       -- czy debata aktualnie trwa
 * @property {number} debateIndex   -- 0 = FM#1, 1 = FM#2
 * @property {number} round         -- 0=opinie, 1=debata, 2=synteza (3 slidy z Gold Solution)
 * @property {Object} opinions      -- { [expertId]: { text: string, stance: 'for'|'against'|'nuanced' } }
 * @property {string|null} goldSolution -- finalna synteza Syntetyka
 * @property {number} consensusScore    -- 0-100
 * @property {string|null} devilsAdvocateChallenge -- kontr-argument Cienia
 */

// Pre-scripted debate content per preset (rozszerzalne)
// Klucz = preset id lub 'default'
const DEBATE_SCRIPTS = {
  default: {
    fm1: {
      topic: 'Architektura systemu',
      rounds: [
        {
          // Round 0: Opinie (slide 1)
          type: 'opinions',
          expert_pragmatist: { text: 'Monolith na start -- szybciej i taniej.', stance: 'nuanced' },
          expert_innovator:  { text: 'Mikroserwisy daja nam skalowalnosc od dnia 1!', stance: 'for' },
          expert_analyst:    { text: 'Dane pokazuja: 78% startupow zaczyna od monolitu.', stance: 'against' },
          expert_user:       { text: 'Uzytkownicy nie widza architektury. Liczy sie szybkosc.', stance: 'nuanced' },
          expert_devil:      { text: 'A co jesli zaden z was nie ma racji? Moze serverless?', stance: 'against' }
        },
        {
          // Round 1: Debata (slide 2)
          type: 'debate',
          exchanges: [
            { from: 'expert_pragmatist', to: 'expert_innovator', text: 'Mikroserwisy na start to overengineering.' },
            { from: 'expert_innovator', to: 'expert_pragmatist', text: 'A przepisywanie za rok to strata czasu.' },
            { from: 'expert_analyst', to: 'expert_innovator', text: 'Benchmark: modularny monolit = 60% szybszy deploy niz mikroserwisy.' },
            { from: 'expert_devil', to: 'expert_analyst', text: 'Te dane sa z 2024. Tooling sie zmienil.' },
            { from: 'expert_user', to: 'expert_devil', text: 'Narzedzia sie zmieniaja, potrzeby userow nie.' }
          ]
        },
        {
          // Round 2: Synteza (slide 3)
          type: 'synthesis',
          goldSolution: 'Modularny monolit z jasno zdefiniowanymi granicami modulow. Gotowy do ekstrakcji mikroserwisow w przyszlosci.',
          consensusScore: 72,
          synthesizer: 'Kompromis miedzy pragmatyzmem a skalowalnoscaia. Monolit TERAZ, granice modulow na PRZYSZLOSC.',
          devilChallenge: 'A co jesli modularnosc monolitu to iluzja i i tak skonczycie z big ball of mud?'
        }
      ]
    },
    fm2: {
      topic: 'Ocena jakosci implementacji',
      rounds: [
        {
          type: 'opinions',
          expert_pragmatist: { text: 'Pokrycie testami 78% -- wystarczajace na MVP.', stance: 'for' },
          expert_innovator:  { text: 'Brakuje testow integracyjnych. Dodajmy.', stance: 'nuanced' },
          expert_analyst:    { text: '2 HIGH severity issues -- nie mozemy shippowac.', stance: 'against' },
          expert_user:       { text: 'Performance OK, ale onboarding trwa 5 klikniec za duzo.', stance: 'against' },
          expert_devil:      { text: 'Czy 78% pokrycia naprawde cos mowi? Moze testujecie trywialne rzeczy.', stance: 'against' }
        },
        {
          type: 'debate',
          exchanges: [
            { from: 'expert_analyst', to: 'expert_pragmatist', text: '2 HIGH to nie "wystarczajace". To potencjalny data leak.' },
            { from: 'expert_pragmatist', to: 'expert_analyst', text: 'Fix zajmie 2 dni. Shippujemy z hotfixem.' },
            { from: 'expert_user', to: 'expert_innovator', text: '5 klikniec to problem UX, nie brak testow.' },
            { from: 'expert_devil', to: 'expert_pragmatist', text: 'Hotfix w piątek? Klasyczny przepis na katastrofe.' }
          ]
        },
        {
          type: 'synthesis',
          goldSolution: 'Fix 2 HIGH issues (1-2 dni), skroc onboarding o 2 kroki, ship po ponownym QA.',
          consensusScore: 85,
          synthesizer: 'Bezpieczenstwo jest non-negotiable. UX improvement jest szybki. Ship po fixach.',
          devilChallenge: 'Kto zweryfikuje ze fix nie wprowadzil nowych bugow?'
        }
      ]
    }
  }
};
```

### 1.6 Metrics State

```javascript
/**
 * Computed metrics -- przeliczane w kazdym renderFrame lub co 1s.
 * @typedef {Object} MetricsState
 * @property {number} elapsed         -- ms od startu symulacji
 * @property {number} activeCount     -- ile agentow ma status working|thinking
 * @property {number} totalAgents     -- ile agentow na ukladzie
 * @property {string} phaseLabel      -- "Faza 3/6: FM#1"
 * @property {number} progressPct     -- 0-100 (obliczany z faz i progressow agentow)
 * @property {number} phasesCompleted -- ile faz ukonczono
 * @property {number} phasesTotal     -- ile faz lacznie
 */

function computeMetrics(state) {
  const now = performance.now();
  const elapsed = state.startTime > 0 ? now - state.startTime : 0;
  const phases = state.phase.phases;
  const phasesTotal = phases.length;
  const phasesCompleted = state.phase.completedIds.size;
  const currentIdx = state.phase.currentIndex;

  // Progress: ukonczone fazy + czesciowy progress aktywnej fazy
  let progressPct = 0;
  if (phasesTotal > 0) {
    const completedWeight = phasesCompleted / phasesTotal;
    let currentPhaseProgress = 0;
    if (currentIdx >= 0 && currentIdx < phasesTotal) {
      const currentPhase = phases[currentIdx];
      const agentProgresses = currentPhase.agentNodeIds
        .map(nid => state.agents[nid]?.progress || 0);
      if (agentProgresses.length > 0) {
        currentPhaseProgress = agentProgresses.reduce((a, b) => a + b, 0)
          / agentProgresses.length / 100;
      }
    }
    progressPct = Math.round(
      (completedWeight + currentPhaseProgress / phasesTotal) * 100
    );
  }

  // Active count
  let activeCount = 0;
  for (const nid in state.agents) {
    const a = state.agents[nid];
    if (a.status === 'working' || a.status === 'thinking') activeCount++;
  }

  // Phase label
  let phaseLabel = '';
  if (currentIdx >= 0 && currentIdx < phasesTotal) {
    phaseLabel = 'Faza ' + (currentIdx + 1) + '/' + phasesTotal
      + ': ' + phases[currentIdx].label;
  } else if (state.status === 'completed') {
    phaseLabel = 'Ukonczono';
  } else {
    phaseLabel = 'Oczekiwanie';
  }

  return {
    elapsed,
    activeCount,
    totalAgents: Object.keys(state.agents).length,
    phaseLabel,
    progressPct: Math.min(progressPct, 100),
    phasesCompleted,
    phasesTotal
  };
}
```

### 1.7 Reactive Proxy Wrapper

Opakowanie LM_STATE w Proxy dla automatycznego dispatchu do UI. Researcher Tech rekomenduje: Proxy + rAF batching + data-state attributes.

```javascript
/**
 * Tworzy reaktywny wrapper na LM_STATE.
 * Zmiany w state triggeruja renderFrame w nastepnym rAF.
 * Uzywa dirty-flag batching -- wiele zmian w jednej klatce = jeden render.
 */
let _lmDirty = false;
let _lmRafId = null;

function createReactiveState(initialState) {
  const handler = {
    set(target, prop, value) {
      const old = target[prop];
      target[prop] = value;
      if (old !== value) {
        scheduleLMRender();
        // Dispatch event dla event bus
        lmBus.dispatch('state:change', { prop, value, old });
      }
      return true;
    },
    get(target, prop) {
      const val = target[prop];
      // Glebokie proxy TYLKO dla znanych nested obiektow
      // (nie rekursywnie -- to byloby zbyt kosztowne)
      if (prop === 'phase' || prop === 'hitl' || prop === 'debate'
          || prop === 'metrics' || prop === 'comms' || prop === 'settings') {
        if (val && typeof val === 'object' && !val.__proxied) {
          const nested = new Proxy(val, handler);
          nested.__proxied = true;
          target[prop] = nested;
          return nested;
        }
      }
      return val;
    }
  };
  return new Proxy(initialState, handler);
}

function scheduleLMRender() {
  if (_lmDirty) return; // juz zaplanowane
  _lmDirty = true;
  _lmRafId = requestAnimationFrame(() => {
    _lmDirty = false;
    renderLMFrame();
  });
}

/**
 * Glowna funkcja renderujaca -- wywolywana max raz na klatke.
 * Czyta LM_STATE i aktualizuje DOM (data-state attributes, metryki, comms).
 * Performance Contract: < 10ms execution time.
 */
function renderLMFrame() {
  if (!LM_STATE.monitorVisible) return;

  const metrics = computeMetrics(LM_STATE);
  // Aktualizuj HUD (topbar)
  updateHUD(metrics);
  // Aktualizuj agent cards (data-state)
  updateAgentCards(LM_STATE.agents);
  // Aktualizuj phase timeline
  updatePhaseTimeline(LM_STATE.phase);
  // Mission Pulse (S5, 15 LOC)
  if (LM_STATE.settings.missionPulse) updateMissionPulse(metrics.activeCount);
}
```

---

## 2. Event System

### 2.1 Event Bus

Lekki event bus (~30 LOC). Brak zewnetrznych zaleznosci. Wspiera wildcard listeners.

```javascript
/**
 * Lekki event bus dla Live Monitor.
 * API: dispatch(type, payload), on(type, handler), off(type, handler)
 * Wspiera namespace'y: 'phase:start', 'agent:*' (wildcard)
 */
const lmBus = (() => {
  const _listeners = {};  // { [eventType]: Set<Function> }

  return {
    /**
     * Rejestruje handler na event.
     * @param {string} type -- np. 'phase:start' lub 'agent:*' (wildcard)
     * @param {Function} handler -- (payload) => void
     * @returns {Function} unsubscribe function
     */
    on(type, handler) {
      if (!_listeners[type]) _listeners[type] = new Set();
      _listeners[type].add(handler);
      return () => this.off(type, handler);
    },

    /**
     * Wyrejestrowuje handler.
     */
    off(type, handler) {
      if (_listeners[type]) _listeners[type].delete(handler);
    },

    /**
     * Dispatchuje event do listenerow.
     * Wywoluje: dokladny match + wildcard match (np. 'agent:*' dla 'agent:active')
     * @param {string} type -- np. 'agent:active'
     * @param {Object} payload
     */
    dispatch(type, payload) {
      const event = { type, payload, timestamp: performance.now() };

      // Dokladny match
      if (_listeners[type]) {
        _listeners[type].forEach(fn => {
          try { fn(event); }
          catch (e) { console.error('[LM Bus]', type, e); }
        });
      }

      // Wildcard match: 'agent:*' matchuje 'agent:active', 'agent:done', etc.
      const ns = type.split(':')[0];
      const wildcard = ns + ':*';
      if (_listeners[wildcard]) {
        _listeners[wildcard].forEach(fn => {
          try { fn(event); }
          catch (e) { console.error('[LM Bus wildcard]', type, e); }
        });
      }

      // Session event log (Gold Solution Q3: event store ~10 LOC)
      if (LM_STATE.sessionEvents.length < 5000) { // hard cap na pamiec
        LM_STATE.sessionEvents.push({
          type,
          timestamp: event.timestamp,
          summary: summarizeEvent(type, payload) // kompaktowy string
        });
      }
    },

    /**
     * Czysci wszystkich listenerow (przy zamknieciu monitora).
     */
    clear() {
      for (const key in _listeners) _listeners[key].clear();
    }
  };
})();

/**
 * Kompaktowe podsumowanie eventu do session log.
 * Max 120 znakow -- nie zapisujemy pelnego payloadu.
 */
function summarizeEvent(type, payload) {
  switch (type) {
    case 'phase:start':   return 'Phase: ' + (payload.phaseId || '?');
    case 'phase:end':     return 'Phase done: ' + (payload.phaseId || '?');
    case 'agent:status':  return (payload.defId || '?') + ' -> ' + (payload.status || '?');
    case 'hitl:request':  return 'HITL: ' + (payload.title || '?');
    case 'hitl:decision': return 'Decision: ' + (payload.outcome || '?');
    case 'debate:round':  return 'Debate R' + (payload.round || 0);
    case 'sim:start':     return 'Simulation started';
    case 'sim:stop':      return 'Simulation stopped';
    default:              return type;
  }
}
```

### 2.2 Katalog Eventow

Kompletna lista eventow Live Monitor z payload structure.

```javascript
/**
 * EVENT CATALOG
 *
 * Kazdy event ma:
 *  - type: string (namespace:action)
 *  - payload: object (opisany ponizej)
 *  - timestamp: number (performance.now(), dodawany przez bus)
 */

// --- Simulation lifecycle ---

// sim:start     -- symulacja rozpoczeta
//   payload: { totalPhases: number, totalAgents: number, autonomy: AutonomyLevel }

// sim:stop      -- symulacja zatrzymana (user STOP lub error)
//   payload: { reason: 'user'|'error'|'complete', elapsed: number }

// sim:pause     -- symulacja zapauzowana (HITL lub manual)
//   payload: { reason: 'hitl'|'user' }

// sim:resume    -- symulacja wznowiona
//   payload: { afterHitl: boolean }

// sim:complete  -- symulacja pomyslnie zakonczona
//   payload: { elapsed: number, phasesCompleted: number, decisionsCount: number }


// --- Phase lifecycle ---

// phase:start   -- nowa faza sie rozpoczyna
//   payload: { phaseId: string, phaseIndex: number, phaseLabel: string, agentCount: number }

// phase:end     -- faza zakonczona
//   payload: { phaseId: string, duration: number }

// phase:intent  -- intent preview (non-blocking info, S3)
//   payload: { phaseId: string, title: string, description: string }


// --- Agent lifecycle ---

// agent:status  -- zmiana statusu agenta
//   payload: { nodeId: string, defId: string, status: AgentStatus, prevStatus: AgentStatus }

// agent:progress -- zmiana progresu agenta
//   payload: { nodeId: string, defId: string, progress: number }

// agent:message -- agent wyslal wiadomosc (speech bubble / comms log)
//   payload: { nodeId: string, defId: string, message: string, targetDefId: string|null, phaseId: string }


// --- HITL lifecycle ---

// hitl:request  -- system wymaga decyzji usera
//   payload: { decision: HITLDecision }

// hitl:decision -- user podjal decyzje
//   payload: { id: string, outcome: HITLOutcome, responseTimeMs: number }

// hitl:timeout  -- auto-approve po uplywie timera
//   payload: { id: string }


// --- Debate lifecycle ---

// debate:start  -- debata Five Minds rozpoczeta
//   payload: { debateIndex: number, topic: string }

// debate:round  -- zmiana rundy debaty
//   payload: { debateIndex: number, round: number, type: 'opinions'|'debate'|'synthesis' }

// debate:goldSolution -- Gold Solution ogloszone
//   payload: { text: string, consensusScore: number }

// debate:end    -- debata zakonczona
//   payload: { debateIndex: number, outcome: string }


// --- Comms log ---

// comms:message -- nowa wiadomosc w comms log
//   payload: { agentDefId: string, targetDefId: string|null, text: string, phaseId: string, isNarrative: boolean }

// comms:filter  -- zmiana filtra fazy
//   payload: { phaseId: string|null }


// --- Monitor UI ---

// monitor:open  -- monitor otwarty
//   payload: {}

// monitor:close -- monitor zamkniety
//   payload: {}

// state:change  -- generyczna zmiana stanu (z Proxy)
//   payload: { prop: string, value: any, old: any }
```

---

## 3. Simulation Integration

### 3.1 Strategia: Wrapper + Hook Pattern

Istniejace `simStep()` / `simStop()` z v21 zostaja NIENARUSZONE. Live Monitor dodaje wrappers ktore:
1. Przechwytuja zdarzenia z v21 simulation
2. Tlumacza je na LM eventy
3. Dodaja logike HITL/Debate/Narrative

**Kluczowa zasada: symulacja BEZ Live Monitor musi dzialac identycznie jak w v21.**

```javascript
// ================================================================
// SIMULATION INTEGRATION LAYER
// ================================================================

/**
 * Flaga: czy Live Monitor jest aktywny.
 * Jesli false -- v21 simStep/simStop dzialaja identycznie jak dotychczas.
 */
let lmActive = false;

/**
 * Oryginalne referencje do v21 functions (zachowane na wypadek).
 * Pattern: monkey-patching z oryginalna referencja.
 */
const _v21_simStep = null; // ustawiane w lmInit()
const _v21_simStop = null;

/**
 * Inicjalizacja Live Monitor -- lazy, wywolywana przy pierwszym uzyciu.
 * Gold Solution: lazy init -- kod obecny ale nie wykonany do pierwszego uzycia.
 */
function lmInit() {
  if (LM_STATE.monitorLoaded) return;
  LM_STATE.monitorLoaded = true;

  // Inject CSS (Live Monitor styles)
  injectLMStyles();

  // Build DOM (overlay, HUD, agent grid, comms log, timeline, HITL panel)
  buildLMDom();

  // Register event listeners
  registerLMListeners();

  // Hook into existing simulation
  hookSimulation();
}

/**
 * Hookuje istniejacy simStep/simStop aby dispatchowac LM eventy.
 *
 * WAZNE: NIE modyfikujemy oryginalnych funkcji.
 * Zamiast tego nadpisujemy globalne simStep/simStop nowymi wersjami
 * ktore wywoluja oryginaly + dodaja LM logike.
 *
 * Backwards compatibility: jesli lmActive === false, zachowanie = v21.
 */
function hookSimulation() {
  // Zachowaj oryginalne referencje
  const origSimStep = window.simStep;
  const origSimStop = window.simStop;

  // Nowy simStep z LM hooks
  window.simStep = function lmSimStep() {
    if (!lmActive) {
      // Tryb v21 -- zero zmian
      origSimStep();
      return;
    }

    // --- PRE-STEP HOOKS ---

    // Sprawdz czy nalezy sie HITL przed ta faza
    const nextPhaseIdx = simPhaseIdx + 1;
    const nodePhases = [];
    nodes.forEach(nd => {
      const d = AD_MAP.get(nd.defId);
      if (d && d.phase && !nodePhases.includes(d.phase))
        nodePhases.push(d.phase);
    });
    const relevantPhases = PHASES.filter(p => nodePhases.includes(p.id));

    if (nextPhaseIdx < relevantPhases.length) {
      const nextPhase = relevantPhases[nextPhaseIdx];

      // Intent Preview (S3, non-blocking)
      const intent = INTENT_PREVIEWS.find(ip => ip.beforePhase === nextPhase.id);
      if (intent) {
        lmBus.dispatch('phase:intent', {
          phaseId: nextPhase.id,
          title: intent.title,
          description: intent.template
        });
      }

      // HITL check: czy ukonczylismy fazy wymagane przez HITL point?
      if (LM_STATE.settings.autonomy !== 'full-auto') {
        const hitlPoint = shouldTriggerHITL(nextPhase.id);
        if (hitlPoint) {
          pauseForHITL(hitlPoint);
          return; // NIE wywoluj origSimStep -- czekamy na decyzje
        }
      }
    }

    // --- EXECUTE ORIGINAL ---
    origSimStep();

    // --- POST-STEP HOOKS ---

    if (simPhaseIdx >= 0 && simPhaseIdx < relevantPhases.length) {
      const currentPhase = relevantPhases[simPhaseIdx];

      // Dispatch phase:start
      lmBus.dispatch('phase:start', {
        phaseId: currentPhase.id,
        phaseIndex: simPhaseIdx,
        phaseLabel: currentPhase.label,
        agentCount: nodes.filter(nd => {
          const d = AD_MAP.get(nd.defId);
          return d && d.phase === currentPhase.id;
        }).length
      });

      // Update LM_STATE
      LM_STATE.phase.currentIndex = simPhaseIdx;
      LM_STATE.phase.currentId = currentPhase.id;
      LM_STATE.phase.timing[currentPhase.id] = {
        start: performance.now(),
        end: null,
        duration: null
      };

      // Zaktualizuj stany agentow
      updateAgentStatesForPhase(currentPhase);

      // Debata? Uruchom Debate Arena (S1)
      if (currentPhase.id === 'debate1' || currentPhase.id === 'debate2') {
        startDebateArena(currentPhase.id === 'debate1' ? 0 : 1);
      }

      // Zaplanuj phase:end (przy nastepnym simStep)
      if (simPhaseIdx > 0) {
        const prevPhase = relevantPhases[simPhaseIdx - 1];
        const timing = LM_STATE.phase.timing[prevPhase.id];
        if (timing && !timing.end) {
          timing.end = performance.now();
          timing.duration = timing.end - timing.start;
          LM_STATE.phase.completedIds.add(prevPhase.id);
          lmBus.dispatch('phase:end', {
            phaseId: prevPhase.id,
            duration: timing.duration
          });
        }
      }
    }
  };

  // Nowy simStop z LM hooks
  window.simStop = function lmSimStop() {
    const wasRunning = simRunning;
    origSimStop();

    if (lmActive && wasRunning) {
      LM_STATE.status = 'stopped';
      lmBus.dispatch('sim:stop', {
        reason: 'user',
        elapsed: performance.now() - LM_STATE.startTime
      });
      resetLMState();
    }
  };
}

/**
 * Aktualizuje stany agentow w LM_STATE na podstawie fazy.
 * Mapuje v21 CSS classes -> LM agent statuses.
 */
function updateAgentStatesForPhase(phase) {
  nodes.forEach(nd => {
    const d = AD_MAP.get(nd.defId);
    if (!d) return;
    const rt = LM_STATE.agents[nd.id];
    if (!rt) return;

    if (d.phase === phase.id) {
      setAgentStatus(nd.id, 'working');
    } else if (LM_STATE.phase.completedIds.has(d.phase)) {
      setAgentStatus(nd.id, 'done');
    } else if (ALWAYS_ON_IDS.includes(nd.defId)) {
      setAgentStatus(nd.id, 'working');
    } else {
      // Przyszla faza
      setAgentStatus(nd.id, 'idle');
    }
  });
}

/**
 * Zmienia status agenta z dispatching eventu i aktualizacja DOM.
 */
function setAgentStatus(nodeId, newStatus) {
  const rt = LM_STATE.agents[nodeId];
  if (!rt || rt.status === newStatus) return;

  const prevStatus = rt.status;
  rt.status = newStatus;
  rt.statusLabel = STATUS_LABELS[newStatus] || newStatus;
  rt.statusChangedAt = performance.now();

  // data-state attribute na DOM
  const el = document.querySelector('[data-lm-node="' + nodeId + '"]');
  if (el) el.dataset.state = newStatus;

  lmBus.dispatch('agent:status', {
    nodeId,
    defId: rt.defId,
    status: newStatus,
    prevStatus
  });
}
```

### 3.2 Uruchomienie symulacji z Live Monitor

```javascript
/**
 * Otwiera Live Monitor i uruchamia symulacje.
 * Wywolywane z przycisku "Live Monitor" lub klawisza M.
 */
function openLiveMonitor() {
  // Lazy init
  lmInit();

  // Build agent runtime states
  nodes.forEach(nd => {
    LM_STATE.agents[nd.id] = createAgentRuntime(nd);
  });

  // Build phase state
  const phaseState = buildPhaseState(nodes);
  LM_STATE.phase = phaseState;

  // Reset
  LM_STATE.status = 'running';
  LM_STATE.startTime = performance.now();
  LM_STATE.hitl.pending = null;
  LM_STATE.hitl.history = [];
  LM_STATE.hitl.decisionCount = 0;
  LM_STATE.debate.active = false;
  LM_STATE.comms.messages = [];
  LM_STATE.sessionEvents = [];

  // Pokaz overlay
  LM_STATE.monitorVisible = true;
  lmActive = true;

  // View Transitions API (S6, progressive enhancement)
  if (document.startViewTransition) {
    document.startViewTransition(() => showLMOverlay());
  } else {
    showLMOverlay();
  }

  lmBus.dispatch('sim:start', {
    totalPhases: phaseState.phases.length,
    totalAgents: Object.keys(LM_STATE.agents).length,
    autonomy: LM_STATE.settings.autonomy
  });
  lmBus.dispatch('monitor:open', {});

  // Start metric ticker (co 1s)
  startMetricsTicker();

  // Start v21 simulation (reuses existing togSim flow)
  if (!simRunning) {
    togSim(); // v21 function -- uruchamia simStep chain
  }
}

/**
 * Zamyka Live Monitor, wracajac do canvas.
 * Symulacja zostaje zatrzymana.
 */
function closeLiveMonitor() {
  lmActive = false;
  LM_STATE.monitorVisible = false;

  if (document.startViewTransition) {
    document.startViewTransition(() => hideLMOverlay());
  } else {
    hideLMOverlay();
  }

  // Zatrzymaj symulacje jesli trwa
  if (simRunning) simStop();

  stopMetricsTicker();
  lmBus.dispatch('monitor:close', {});

  // NIE czysc lmBus -- moze byc ponownie otwarty
}
```

---

## 4. HITL Decision Logic

### 4.1 Trigger Points

```javascript
/**
 * Sprawdza czy nalezy zatrzymac symulacje dla HITL decision point.
 * Wywolywane PRZED kazdym simStep.
 *
 * @param {string} nextPhaseId -- id fazy ktora za chwile sie rozpocznie
 * @returns {Object|null} HITL point definition lub null
 */
function shouldTriggerHITL(nextPhaseId) {
  if (LM_STATE.settings.autonomy === 'full-auto') return null;

  // Sprawdz kazdy HITL point
  for (const hp of HITL_POINTS) {
    // Czy wszystkie wymagane fazy sa ukonczone?
    const allCompleted = hp.afterPhases.every(
      pid => LM_STATE.phase.completedIds.has(pid)
    );
    if (!allCompleted) continue;

    // Czy juz nie obsluzylismy tego HITL?
    const alreadyHandled = LM_STATE.hitl.history.some(h => h.id === hp.id);
    if (alreadyHandled) continue;

    // Full Control: kazda faza jest HITL
    // Act with Confirmation: tylko zdefiniowane 3 punkty
    if (LM_STATE.settings.autonomy === 'full-control') {
      // W full-control triggerjemy HITL przed KAZDA faza
      return {
        ...hp,
        id: hp.id + '-' + nextPhaseId,
        title: 'Zatwierdzenie fazy: ' + nextPhaseId,
        description: 'Full Control: potwierdz kontynuacje.',
        type: 'phase-gate'
      };
    }

    // Act with Confirmation: normalne 3 punkty HITL
    return hp;
  }

  return null;
}
```

### 4.2 Pause Mechanism

```javascript
/**
 * Pauzuje symulacje i wyswietla HITL decision panel.
 * @param {Object} hitlPoint -- definicja z HITL_POINTS lub wygenerowana
 */
function pauseForHITL(hitlPoint) {
  // Pause simulation timers
  LM_STATE.status = 'hitl';
  if (simTimer) { clearTimeout(simTimer); simTimer = null; }

  // Ustaw stany agentow ktore czekaja na HITL
  // (orchestrator i synthesizer dostaja status 'hitl')
  nodes.forEach(nd => {
    if (ALWAYS_ON_IDS.includes(nd.defId)) {
      setAgentStatus(nd.id, 'hitl');
    }
  });

  // Buduj decision object
  const decision = {
    id: hitlPoint.id,
    type: hitlPoint.type,
    phaseId: LM_STATE.phase.currentId,
    title: hitlPoint.title,
    description: hitlPoint.description,
    options: hitlPoint.options,
    recommended: hitlPoint.recommended,
    goldSolution: null,
    expertOpinions: null,
    requestedAt: performance.now(),
    timeoutMs: LM_STATE.settings.autoApproveTimer * 1000, // 0 = brak
    keyboardHint: hitlPoint.keyboardHint
  };

  // Gold Solution type -- dolacz dane debaty
  if (hitlPoint.type === 'gold-solution' && LM_STATE.debate.goldSolution) {
    decision.goldSolution = LM_STATE.debate.goldSolution;
    decision.expertOpinions = LM_STATE.debate.opinions;
  }

  LM_STATE.hitl.pending = decision;

  lmBus.dispatch('hitl:request', { decision });

  // Pokaz decision panel w UI
  showHITLPanel(decision);

  // Start auto-approve timer (jesli wlaczony)
  if (decision.timeoutMs > 0) {
    startAutoApproveTimer(decision);
  }
}
```

### 4.3 Option Presentation

```javascript
/**
 * Wyswietla HITL decision panel w Live Monitor overlay.
 * Gold Solution: 1 uniwersalny wariant UI, Approve/Modify/Re-debate, Keyboard A/M/D.
 *
 * @param {HITLDecision} decision
 */
function showHITLPanel(decision) {
  const panel = document.getElementById('lm-hitl-panel');
  if (!panel) return;

  // Buduj HTML
  let optionsHTML = '';
  const optionConfig = {
    approve:    { label: 'Zatwierdz',       key: 'A', cssClass: 'lm-hitl-approve', icon: '✓' },
    modify:     { label: 'Modyfikuj',       key: 'M', cssClass: 'lm-hitl-modify',  icon: '✎' },
    're-debate': { label: 'Ponowna debata', key: 'D', cssClass: 'lm-hitl-debate',  icon: '↻' },
    reject:     { label: 'Odrzuc',          key: 'R', cssClass: 'lm-hitl-reject',  icon: '✗' }
  };

  decision.options.forEach(opt => {
    const cfg = optionConfig[opt] || { label: opt, key: '?', cssClass: '', icon: '' };
    const isRecommended = opt === decision.recommended;
    optionsHTML += '<button class="lm-hitl-btn ' + cfg.cssClass
      + (isRecommended ? ' lm-hitl-recommended' : '')
      + '" data-hitl-action="' + opt + '" '
      + 'aria-label="' + cfg.label + ' (' + cfg.key + ')">'
      + '<span class="lm-hitl-icon">' + cfg.icon + '</span>'
      + '<span class="lm-hitl-label">' + cfg.label + '</span>'
      + '<kbd>' + cfg.key + '</kbd>'
      + (isRecommended ? '<span class="lm-hitl-badge">Zalecane</span>' : '')
      + '</button>';
  });

  // Expert opinions (jesli gold-solution type)
  let expertsHTML = '';
  if (decision.expertOpinions) {
    expertsHTML = '<div class="lm-hitl-experts">';
    for (const [expId, opinion] of Object.entries(decision.expertOpinions)) {
      const def = AD_MAP.get(expId);
      expertsHTML += '<div class="lm-hitl-expert-card">'
        + '<div class="lm-hitl-expert-avatar">' + agSvg(expId, 24) + '</div>'
        + '<div class="lm-hitl-expert-name">' + (def ? def.name : expId) + '</div>'
        + '<div class="lm-hitl-expert-opinion">"' + (typeof opinion === 'string' ? opinion : opinion.text) + '"</div>'
        + '</div>';
    }
    expertsHTML += '</div>';
  }

  // Gold Solution (jesli jest)
  let goldHTML = '';
  if (decision.goldSolution) {
    goldHTML = '<div class="lm-hitl-gold">'
      + '<div class="lm-hitl-gold-label">Gold Solution</div>'
      + '<div class="lm-hitl-gold-text">' + decision.goldSolution + '</div>'
      + '</div>';
  }

  panel.innerHTML = '<div class="lm-hitl-content" role="dialog" aria-modal="true" '
    + 'aria-label="' + decision.title + '">'
    + '<div class="lm-hitl-title">' + decision.title + '</div>'
    + '<div class="lm-hitl-desc">' + decision.description + '</div>'
    + expertsHTML
    + goldHTML
    + '<div class="lm-hitl-actions">' + optionsHTML + '</div>'
    + '<div class="lm-hitl-keyboard-hint">' + decision.keyboardHint + '</div>'
    + (decision.timeoutMs > 0
      ? '<div class="lm-hitl-timer" id="lm-hitl-timer-bar"></div>'
      : '')
    + '</div>';

  panel.classList.add('show');
  panel.setAttribute('aria-live', 'assertive');

  // Focus trap
  const firstBtn = panel.querySelector('.lm-hitl-btn');
  if (firstBtn) firstBtn.focus();
}
```

### 4.4 Decision Recording

```javascript
/**
 * Rejestruje decyzje usera i wznawia symulacje.
 * @param {string} outcome -- 'approve'|'modify'|'re-debate'|'reject'|'auto-approved'
 * @param {string|null} userNote -- opcjonalna notatka (modify)
 */
function recordHITLDecision(outcome, userNote) {
  const pending = LM_STATE.hitl.pending;
  if (!pending) return;

  const now = performance.now();
  const record = {
    id: pending.id,
    type: pending.type,
    phaseId: pending.phaseId,
    outcome: outcome,
    requestedAt: pending.requestedAt,
    decidedAt: now,
    responseTimeMs: now - pending.requestedAt,
    userNote: userNote || null
  };

  LM_STATE.hitl.history.push(record);
  LM_STATE.hitl.decisionCount++;
  LM_STATE.hitl.pending = null;

  lmBus.dispatch('hitl:decision', {
    id: record.id,
    outcome: outcome,
    responseTimeMs: record.responseTimeMs
  });

  // Dodaj do comms log
  lmBus.dispatch('comms:message', {
    agentDefId: 'orchestrator',
    targetDefId: null,
    text: 'Decyzja: ' + outcome.toUpperCase()
      + (userNote ? ' -- "' + userNote + '"' : ''),
    phaseId: pending.phaseId,
    isNarrative: false
  });

  // Ukryj panel
  hideHITLPanel();

  // Resume symulacja na podstawie outcome
  resumeAfterHITL(outcome, pending);
}
```

### 4.5 Resume Logic

```javascript
/**
 * Wznawia symulacje po decyzji HITL.
 * @param {HITLOutcome} outcome
 * @param {HITLDecision} decision -- juz resolved decision
 */
function resumeAfterHITL(outcome, decision) {
  // Przywroc stany agentow
  nodes.forEach(nd => {
    if (ALWAYS_ON_IDS.includes(nd.defId)) {
      setAgentStatus(nd.id, 'working');
    }
  });

  switch (outcome) {
    case 'approve':
    case 'auto-approved':
      // Kontynuuj normalnie
      LM_STATE.status = 'running';
      lmBus.dispatch('sim:resume', { afterHitl: true });
      simStep(); // nastepna faza
      break;

    case 'modify':
      // Kontynuuj ale z flaga modify (narracja wskazuje zmiane)
      LM_STATE.status = 'running';
      lmBus.dispatch('comms:message', {
        agentDefId: 'orchestrator',
        targetDefId: 'synthesizer',
        text: 'Uwzgledniam modyfikacje. Dostosowuje plan...',
        phaseId: decision.phaseId,
        isNarrative: true
      });
      lmBus.dispatch('sim:resume', { afterHitl: true });
      // Krrotkie opoznienie dla narracji
      setTimeout(() => { if (simRunning || LM_STATE.status === 'running') simStep(); }, 1500);
      break;

    case 're-debate':
      // Powtorz faze debaty
      LM_STATE.status = 'running';
      lmBus.dispatch('comms:message', {
        agentDefId: 'orchestrator',
        targetDefId: null,
        text: 'Ponowna debata zarzadzona. Eksperci wracaja do stolu.',
        phaseId: decision.phaseId,
        isNarrative: true
      });
      // Cofnij simPhaseIdx o 1 zeby powtorzyc faze
      simPhaseIdx--;
      LM_STATE.phase.completedIds.delete(decision.phaseId);
      lmBus.dispatch('sim:resume', { afterHitl: true });
      setTimeout(() => { if (LM_STATE.status === 'running') simStep(); }, 1000);
      break;

    case 'reject':
      // Zatrzymaj symulacje
      LM_STATE.status = 'stopped';
      lmBus.dispatch('sim:stop', {
        reason: 'user',
        elapsed: performance.now() - LM_STATE.startTime
      });
      showToast('Pipeline odrzucony.');
      setTimeout(simStop, 1500);
      break;
  }
}

/**
 * Auto-approve timer.
 * Gold Solution: timer OFF domyslnie, user wlacza w settings.
 */
let _hitlTimerInterval = null;
let _hitlTimerStart = 0;

function startAutoApproveTimer(decision) {
  if (decision.timeoutMs <= 0) return;
  _hitlTimerStart = performance.now();

  _hitlTimerInterval = setInterval(() => {
    const elapsed = performance.now() - _hitlTimerStart;
    const pct = Math.min(elapsed / decision.timeoutMs * 100, 100);

    // Update timer bar
    const bar = document.getElementById('lm-hitl-timer-bar');
    if (bar) bar.style.width = pct + '%';

    if (elapsed >= decision.timeoutMs) {
      clearInterval(_hitlTimerInterval);
      _hitlTimerInterval = null;
      lmBus.dispatch('hitl:timeout', { id: decision.id });
      recordHITLDecision('auto-approved', null);
    }
  }, 100);
}

function stopAutoApproveTimer() {
  if (_hitlTimerInterval) {
    clearInterval(_hitlTimerInterval);
    _hitlTimerInterval = null;
  }
}
```

### 4.6 Keyboard Handling for HITL

```javascript
/**
 * Keyboard handler dla HITL decisions.
 * Rejestrowany globalnie, aktywny tylko gdy HITL panel jest widoczny.
 */
function handleHITLKeyboard(e) {
  if (!LM_STATE.hitl.pending) return;
  const pending = LM_STATE.hitl.pending;

  const keyMap = {
    'a': 'approve',
    'A': 'approve',
    'm': 'modify',
    'M': 'modify',
    'd': 're-debate',
    'D': 're-debate',
    'r': 'reject',
    'R': 'reject'
  };

  const action = keyMap[e.key];
  if (action && pending.options.includes(action)) {
    e.preventDefault();
    stopAutoApproveTimer();
    recordHITLDecision(action, null);
  }
}
```

---

## 5. Metrics Calculator

### 5.1 Token Estimation

Gold Solution: token cost = WON'T HAVE v22 (zmyslone liczby). ALE: zachowujemy infrastrukture do obliczen w sessionEvents na potrzeby przyszlego v23 opt-in.

Ponizej: logika gotowa do uzycia, ale NIE wyswietlana w UI w v22.

```javascript
/**
 * Szacunkowe zuzycie tokenow per agent per model.
 * ZASTRZEZENIE: to jest szacunek edukacyjny, NIE realne dane.
 * Bazowane na Analityk Danych szacunku: ~$3.24/sesje Opus.
 *
 * @readonly -- NIE wyswietlane w v22 UI
 */
const TOKEN_ESTIMATES = {
  // input tokens per faza per agent (szacunek)
  perPhaseInput: {
    strategy:  2000,   // krotkie instrukcje + kontekst
    research:  4000,   // dluzszy kontekst + zapytania
    debate1:   6000,   // pelne raporty + opinie ekspertow
    build:     8000,   // specyfikacje + kontekst kodu
    debate2:   5000,   // wyniki build + QA findings
    qa:        3000    // kod do review + checklists
  },
  // output tokens per faza per agent (szacunek)
  perPhaseOutput: {
    strategy:  1500,
    research:  3000,
    debate1:   2000,
    build:     5000,
    debate2:   1500,
    qa:        2000
  }
};

/**
 * Ceny per model (USD per 1M tokenow).
 * Aktualne na kwiecien 2026.
 */
const MODEL_PRICING = {
  opus:   { input: 15.00,  output: 75.00 },
  sonnet: { input: 3.00,   output: 15.00 },
  haiku:  { input: 0.80,   output: 4.00  }
};

/**
 * Oblicza szacunkowy koszt symulacji.
 * @param {Object} state -- LM_STATE
 * @returns {{ totalTokensInput: number, totalTokensOutput: number, totalCostUSD: number, perModel: Object }}
 */
function estimateSessionCost(state) {
  let totalInput = 0;
  let totalOutput = 0;
  const perModel = { opus: 0, sonnet: 0, haiku: 0 };

  for (const nid in state.agents) {
    const rt = state.agents[nid];
    const def = AD_MAP.get(rt.defId);
    if (!def) continue;

    // Tylko agenci ktorzy pracowali (done lub working)
    if (rt.status === 'idle') continue;

    const model = (def.model || 'sonnet').toLowerCase();
    const phaseId = rt.phaseId;
    const inputTokens = TOKEN_ESTIMATES.perPhaseInput[phaseId] || 3000;
    const outputTokens = TOKEN_ESTIMATES.perPhaseOutput[phaseId] || 2000;
    const pricing = MODEL_PRICING[model] || MODEL_PRICING.sonnet;

    totalInput += inputTokens;
    totalOutput += outputTokens;

    const cost = (inputTokens / 1000000) * pricing.input
               + (outputTokens / 1000000) * pricing.output;
    perModel[model] = (perModel[model] || 0) + cost;
  }

  return {
    totalTokensInput: totalInput,
    totalTokensOutput: totalOutput,
    totalCostUSD: Object.values(perModel).reduce((a, b) => a + b, 0),
    perModel
  };
}
```

### 5.2 Progress Calculation

```javascript
/**
 * Oblicza progress symulacji (0-100%).
 *
 * Algorytm:
 * - Kazda faza ma rowna wage (100% / totalPhases)
 * - Ukonczone fazy = pelna waga
 * - Aktywna faza = srednia progressow agentow w tej fazie
 * - Przyszle fazy = 0
 *
 * @param {Object} state -- LM_STATE
 * @returns {number} 0-100
 */
function calcProgress(state) {
  const phases = state.phase.phases;
  const total = phases.length;
  if (total === 0) return 0;

  const phaseWeight = 100 / total;
  let progress = 0;

  phases.forEach((phase, idx) => {
    if (state.phase.completedIds.has(phase.id)) {
      // Ukonczona
      progress += phaseWeight;
    } else if (idx === state.phase.currentIndex) {
      // Aktywna -- srednia progressow agentow
      const agentProgs = phase.agentNodeIds
        .map(nid => state.agents[nid]?.progress || 0);
      if (agentProgs.length > 0) {
        const avg = agentProgs.reduce((a, b) => a + b, 0) / agentProgs.length;
        progress += (avg / 100) * phaseWeight;
      }
    }
    // Przyszle = 0, nic nie dodajemy
  });

  return Math.round(Math.min(progress, 100));
}
```

### 5.3 Elapsed Time Tracking

```javascript
/**
 * Ticker aktualizujacy elapsed time co 1 sekundę.
 * Nie uzywamy rAF do tego -- 1s precision wystarczy dla HUD.
 * rAF jest zarezerwowany dla renderLMFrame (wizualne update'y).
 */
let _metricsTickerId = null;

function startMetricsTicker() {
  stopMetricsTicker();
  _metricsTickerId = setInterval(() => {
    if (LM_STATE.status !== 'running' && LM_STATE.status !== 'hitl') return;

    const elapsed = performance.now() - LM_STATE.startTime;
    // Format: MM:SS
    const totalSec = Math.floor(elapsed / 1000);
    const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const ss = String(totalSec % 60).padStart(2, '0');

    // Aktualizuj HUD element bezposrednio (performance: unikaj Proxy overhead)
    const elapsedEl = document.getElementById('lm-hud-elapsed');
    if (elapsedEl) elapsedEl.textContent = mm + ':' + ss;

    // Aktualizuj progress
    const progressPct = calcProgress(LM_STATE);
    const progressEl = document.getElementById('lm-hud-progress');
    if (progressEl) progressEl.style.width = progressPct + '%';
    const progressText = document.getElementById('lm-hud-progress-text');
    if (progressText) progressText.textContent = progressPct + '%';

    // Aktualizuj active count
    let activeCount = 0;
    for (const nid in LM_STATE.agents) {
      const s = LM_STATE.agents[nid].status;
      if (s === 'working' || s === 'thinking') activeCount++;
    }
    const activeEl = document.getElementById('lm-hud-active');
    if (activeEl) activeEl.textContent = activeCount + '/' + Object.keys(LM_STATE.agents).length;

  }, 1000);
}

function stopMetricsTicker() {
  if (_metricsTickerId) {
    clearInterval(_metricsTickerId);
    _metricsTickerId = null;
  }
}
```

---

## 6. Narrative Engine

### 6.1 Template System

Gold Solution S2: "Researcher zanurza sie w analiza..." zamiast "state=working". 3 szablony per agent per state. ~40 LOC + ~2KB data.

```javascript
/**
 * Szablony narracyjne per agent per status.
 * Template syntax: ${variable} zamieniane w runtime.
 *   ${agent}   -- nazwa agenta
 *   ${target}  -- nazwa target agenta (jesli jest)
 *   ${phase}   -- nazwa aktywnej fazy
 *   ${elapsed} -- czas od startu (MM:SS)
 *
 * Kazdy agent ma 3-5 szablonow per status aby uniknac powtorzen.
 * Fallback: AGENT_SPEECH z v21 (juz istniejace).
 */
const NARRATIVE_TEMPLATES = {
  // === STRATEGY ===
  orchestrator: {
    working: [
      '${agent} analizuje zakres projektu i deleguje zadania...',
      '${agent} buduje plan wykonania z punktami kontrolnymi...',
      '${agent} koordynuje start pipeline\'u...'
    ],
    thinking: [
      '${agent} rozważa optymalna kolejnosc faz...',
      '${agent} identyfikuje potencjalne waskie gardla...'
    ],
    hitl: [
      '${agent} czeka na Twoja decyzje...',
      '${agent} potrzebuje zatwierdzenia aby kontynuowac.'
    ]
  },
  synthesizer: {
    working: [
      '${agent} zbiera i laczy wyniki z roznych agentow...',
      '${agent} aktualizuje centralny dokument projektu...',
      '${agent} wykryl sprzecznosc miedzy raportami -- analizuje...'
    ],
    thinking: [
      '${agent} szuka cross-phase insightow...'
    ]
  },
  analyst: {
    working: [
      '${agent} dekomponuje problem na podproblemy...',
      '${agent} szacuje zlozonosc kazdego modulu...',
      '${agent} identyfikuje zaleznosci miedzy komponentami...'
    ]
  },
  planner: {
    working: [
      '${agent} planuje harmonogram i kamienie milowe...',
      '${agent} wyznacza sciezke krytyczna projektu...',
      '${agent} synchronizuje gate\'y miedzy fazami...'
    ]
  },

  // === RESEARCH ===
  res_tech: {
    working: [
      '${agent} porownuje frameworki i analizuje benchmarki...',
      '${agent} sprawdza znane issues w wybranych technologiach...',
      '${agent} bada kompatybilnosc rozwiazan...'
    ]
  },
  res_ux: {
    working: [
      '${agent} analizuje trendy UI/UX i zbiera inspiracje...',
      '${agent} weryfikuje zgodnosc z WCAG 2.1 AA...',
      '${agent} przeglaada case studies z podobnych produktow...'
    ]
  },
  res_reddit: {
    working: [
      '${agent} przeszukuje r/webdev i r/programming...',
      '${agent} analizuje realne doswiadczenia deweloperow...',
      '${agent} kataloguje najczestsze skargi uzytkownikow...'
    ]
  },
  res_x: {
    working: [
      '${agent} sledzi techniczne watki na X...',
      '${agent} zbiera opinie influencerow o narzędziach...',
      '${agent} analizuje kontrowersyjne poglady...'
    ]
  },
  res_github: {
    working: [
      '${agent} analizuje popularne repozytoria i ich architekture...',
      '${agent} porownuje stars, forks i aktywnosc community...',
      '${agent} bada README i struktury podobnych projektow...'
    ]
  },
  res_forums: {
    working: [
      '${agent} przeszukuje StackOverflow i Dev.to...',
      '${agent} zbiera lessons learned z forów deweloperskich...',
      '${agent} porownuje performance w dyskusjach HN...'
    ]
  },
  res_docs: {
    working: [
      '${agent} studiuje oficjalna dokumentacje...',
      '${agent} wyciaga best practices i security guidelines...',
      '${agent} kompiluje snippety konfiguracyjne...'
    ]
  },
  res_critic: {
    working: [
      '${agent} waliduje raporty badawcze pod katem spójności...',
      '${agent} wykryl potencjalny bias konfirmacyjny w danych!',
      '${agent} ocenia jakość źródeł: score ${Math.floor(Math.random()*3)+7}/10...'
    ]
  },

  // === BUILD ===
  backend: {
    working: [
      '${agent} projektuje API endpoints i walidacje...',
      '${agent} implementuje TDD: testy przed kodem...',
      '${agent} buduje error handling i retry logic...'
    ]
  },
  frontend: {
    working: [
      '${agent} buduje komponenty mobile-first...',
      '${agent} implementuje lazy loading i code splitting...',
      '${agent} dodaje aria-* atrybuty dla dostepnosci...'
    ]
  },
  feature: {
    working: [
      '${agent} integruje WebSocket dla real-time updates...',
      '${agent} laczy z zewnetrznym API...',
      '${agent} implementuje wizualizacje danych...'
    ]
  },
  designer: {
    working: [
      '${agent} definiuje design tokens i system kolorow...',
      '${agent} projektuje mikro-animacje i przejscia...',
      '${agent} finalizuje layout grid i dark/light mode...'
    ]
  },
  integrator: {
    working: [
      '${agent} weryfikuje kontrakty API miedzy modulami...',
      '${agent} rozwiazuje konflikty integracyjne...',
      '${agent} uruchamia E2E test flow...'
    ]
  },

  // === FIVE MINDS ===
  expert_pragmatist: {
    working: [
      '${agent}: "Ile to bedzie kosztowac i ile czasu zajmie?"',
      '${agent} analizuje budzet i timeline projektu...',
      '${agent}: "Mamy zasoby do tego?"'
    ]
  },
  expert_innovator: {
    working: [
      '${agent}: "Rynek idzie w tym kierunku -- mozemy byc pierwsi!"',
      '${agent} proponuje AI-first approach...',
      '${agent}: "A moze sprobujemy czegos zupelnie nowego?"'
    ]
  },
  expert_analyst: {
    working: [
      '${agent}: "Dane mowia co innego niz intuicja."',
      '${agent} prezentuje benchmark: -30% wydajniej...',
      '${agent}: "Pokaz mi metryki, nie opinie."'
    ]
  },
  expert_user: {
    working: [
      '${agent}: "Czy moja mama by to zrozumiala?"',
      '${agent} testuje flow z perspektywy poczatkujacego...',
      '${agent}: "3 klikniecia za duzo. Uprość."'
    ]
  },
  expert_devil: {
    working: [
      '${agent}: "A co jesli sie WSZYSCY mylicie?"',
      '${agent} szuka ukosztow w pozornym konsensusie...',
      '${agent}: "Nikt nie mowi o ryzyku. To mnie niepokoi."'
    ]
  },

  // === QA ===
  qa_security: {
    working: [
      '${agent} skanuje OWASP Top 10 i sprawdza hardcoded secrets...',
      '${agent} weryfikuje zaleznosci pod katem CVE...',
      '${agent} raportuje: 2 HIGH severity issues!'
    ]
  },
  qa_quality: {
    working: [
      '${agent} mierzy pokrycie testami: ${Math.floor(Math.random()*15)+75}%...',
      '${agent} sprawdza edge cases i N+1 query patterns...',
      '${agent} identyfikuje code smells...'
    ]
  },
  qa_perf: {
    working: [
      '${agent} mierzy response time i bundle size...',
      '${agent} sprawdza memory leaki i Core Web Vitals...',
      '${agent}: "Performance OK, ale jest pole do optymalizacji."'
    ]
  },
  qa_manager: {
    working: [
      '${agent} priorytetyzuje findings i ustala severity...',
      '${agent} ocenia gotowosc do deploy: score ${Math.floor(Math.random()*2)+8}/10...',
      '${agent}: "Decyzja: GO z warunkami."'
    ]
  }
};

// Fallback: AGENT_SPEECH z v21 (juz istniejace w codebase)
// Uzywane gdy NARRATIVE_TEMPLATES nie ma szablonu dla danego agenta/statusu.
```

### 6.2 Template Parser

```javascript
/**
 * Parsuje template z ${variable} substitution.
 * @param {string} template -- np. '${agent} analizuje ${phase}...'
 * @param {Object} vars -- { agent: 'Researcher', phase: 'RESEARCH', ... }
 * @returns {string}
 */
function parseTemplate(template, vars) {
  return template.replace(/\$\{(\w+)\}/g, (match, key) => {
    return vars[key] !== undefined ? String(vars[key]) : match;
  });
}

/**
 * Generuje narracyjny tekst dla agenta w danym statusie.
 * Unika powtorzen -- trackuje ostatnio uzyte szablony per agent.
 *
 * @param {string} defId -- id agenta z AD
 * @param {AgentStatus} status -- aktualny status
 * @param {Object} context -- { targetDefId, phaseLabel, elapsed }
 * @returns {string} -- narracyjny tekst
 */
const _narrativeHistory = {}; // { [defId]: lastIndex }

function generateNarrative(defId, status, context) {
  // Szukaj narracyjnego szablonu
  const templates = NARRATIVE_TEMPLATES[defId]?.[status];

  if (!templates || templates.length === 0) {
    // Fallback: AGENT_SPEECH z v21
    const speeches = AGENT_SPEECH[defId];
    if (speeches && speeches.length > 0) {
      const idx = Math.floor(Math.random() * speeches.length);
      return speeches[idx];
    }
    return STATUS_LABELS[status] || 'Pracuje...';
  }

  // Unikaj powtorzen
  const historyKey = defId + ':' + status;
  let lastIdx = _narrativeHistory[historyKey] || -1;
  let nextIdx;
  if (templates.length === 1) {
    nextIdx = 0;
  } else {
    // Losowy indeks rozny od ostatniego
    do {
      nextIdx = Math.floor(Math.random() * templates.length);
    } while (nextIdx === lastIdx && templates.length > 1);
  }
  _narrativeHistory[historyKey] = nextIdx;

  // Parse template
  const def = AD_MAP.get(defId);
  const targetDef = context.targetDefId ? AD_MAP.get(context.targetDefId) : null;
  const vars = {
    agent: def ? def.name : defId,
    target: targetDef ? targetDef.name : '',
    phase: context.phaseLabel || '',
    elapsed: context.elapsed || '00:00'
  };

  return parseTemplate(templates[nextIdx], vars);
}
```

### 6.3 Message Queue

```javascript
/**
 * Kolejka wiadomosci dla comms log.
 * Unika overlapping: max 1 wiadomosc dodawana co MIN_MSG_INTERVAL ms.
 * Buforuje jesli wiadomosci przychodza za szybko.
 */
const MSG_QUEUE = {
  queue: [],              // buforowane wiadomosci
  lastAddedAt: 0,         // timestamp ostatnio dodanej wiadomosci
  minInterval: 300,       // ms -- minimalna przerwa miedzy wiadomosciami
  timerId: null,          // drain timer

  /**
   * Dodaje wiadomosc do kolejki.
   * @param {CommsMessage} msg
   */
  enqueue(msg) {
    this.queue.push(msg);
    this.scheduleDrain();
  },

  /**
   * Planuje oproznienie kolejki.
   */
  scheduleDrain() {
    if (this.timerId) return;
    const now = performance.now();
    const timeSinceLast = now - this.lastAddedAt;
    const delay = Math.max(0, this.minInterval - timeSinceLast);

    this.timerId = setTimeout(() => {
      this.timerId = null;
      this.drain();
    }, delay);
  },

  /**
   * Oproznia jedna wiadomosc z kolejki i renderuje.
   */
  drain() {
    if (this.queue.length === 0) return;
    const msg = this.queue.shift();
    this.lastAddedAt = performance.now();

    // Renderuj do comms log DOM
    renderCommsMessage(msg);

    // Zapisz do LM_STATE
    LM_STATE.comms.messages.push(msg);

    // Jesli sa nastepne -- zaplanuj
    if (this.queue.length > 0) {
      this.scheduleDrain();
    }
  },

  /**
   * Czysci kolejke.
   */
  clear() {
    this.queue = [];
    if (this.timerId) { clearTimeout(this.timerId); this.timerId = null; }
  }
};

/**
 * @typedef {Object} CommsMessage
 * @property {number} id            -- auto-increment
 * @property {string} agentDefId    -- id agenta nadawcy
 * @property {string|null} targetDefId -- id agenta odbiorcy (lub null)
 * @property {string} text          -- tresc wiadomosci
 * @property {string} phaseId       -- id fazy
 * @property {number} timestamp     -- performance.now()
 * @property {boolean} isNarrative  -- czy to narracyjny tekst (vs raw speech)
 * @property {boolean} isSystem     -- czy to systemowa wiadomosc (HITL, phase change)
 */

let _commsIdCounter = 0;

function createCommsMessage(agentDefId, targetDefId, text, phaseId, isNarrative, isSystem) {
  return {
    id: ++_commsIdCounter,
    agentDefId,
    targetDefId: targetDefId || null,
    text,
    phaseId: phaseId || LM_STATE.phase.currentId || 'strategy',
    timestamp: performance.now(),
    isNarrative: !!isNarrative,
    isSystem: !!isSystem
  };
}

// Event listener: comms:message -> kolejkuj
lmBus.on('comms:message', (event) => {
  const p = event.payload;
  const msg = createCommsMessage(
    p.agentDefId, p.targetDefId, p.text, p.phaseId, p.isNarrative, p.isSystem
  );
  MSG_QUEUE.enqueue(msg);
});
```

---

## 7. localStorage Schema

### 7.1 Key Naming Convention

```javascript
/**
 * localStorage keys for Live Monitor v22.
 * Prefix: 'lm22_' -- oddzielone od v21 'acV21' i v22 canvas 'acV22'.
 * Unikalny prefix zapobiega kolizjom.
 */
const LM_STORAGE_KEYS = {
  SETTINGS:     'lm22_settings',     // { autonomy, autoApproveTimer, reducedMotion, narrativeEnabled, missionPulse }
  LAST_SESSION: 'lm22_lastSession',  // { timestamp, preset, phases, decisions, duration }
  STATS:        'lm22_stats'         // { totalSessions, totalDecisions, avgDuration, firstUsed }
};
```

### 7.2 What to Persist

```javascript
/**
 * Zapisywane do localStorage:
 *
 * 1. SETTINGS (~200 bytes) -- preferencje usera
 *    - autonomy level
 *    - auto-approve timer (0 = OFF)
 *    - reduced motion preference
 *    - narrative enabled
 *    - mission pulse enabled
 *
 * 2. LAST_SESSION (~500 bytes) -- podsumowanie ostatniej sesji
 *    - timestamp startu
 *    - aktywny preset (jesli byl)
 *    - ile faz ukonczono
 *    - ile decyzji podjeto
 *    - outcomes decyzji
 *    - czas trwania
 *
 * 3. STATS (~100 bytes) -- zagregowane statystyki
 *    - ile sesji lacznie
 *    - ile decyzji lacznie
 *    - sredni czas sesji
 *    - data pierwszego uzycia
 *
 * NIE zapisywane:
 *    - sessionEvents (zbyt duze, ~50-200KB per sesja)
 *    - pelne stany agentow (odtwarzalne)
 *    - DEBATE_SCRIPTS (statyczne dane w kodzie)
 *    - NARRATIVE_TEMPLATES (statyczne dane w kodzie)
 */

/**
 * Zapis ustawien.
 */
function saveLMSettings() {
  try {
    const data = {
      autonomy: LM_STATE.settings.autonomy,
      autoApproveTimer: LM_STATE.settings.autoApproveTimer,
      reducedMotion: LM_STATE.settings.reducedMotion,
      narrativeEnabled: LM_STATE.settings.narrativeEnabled,
      missionPulse: LM_STATE.settings.missionPulse
    };
    localStorage.setItem(LM_STORAGE_KEYS.SETTINGS, JSON.stringify(data));
  } catch (e) {
    // localStorage pelny lub niedostepny -- cicha degradacja
    console.warn('[LM] localStorage save failed:', e.message);
  }
}

/**
 * Odczyt ustawien.
 * @returns {Object} ustawienia lub defaults
 */
function loadLMSettings() {
  try {
    const raw = localStorage.getItem(LM_STORAGE_KEYS.SETTINGS);
    if (!raw) return { ...LM_DEFAULTS };
    const data = JSON.parse(raw);
    // Merge z defaults (forward compatibility -- nowe klucze dostaja default)
    return {
      autonomy: data.autonomy || 'act-confirm',
      autoApproveTimer: typeof data.autoApproveTimer === 'number' ? data.autoApproveTimer : 0,
      reducedMotion: !!data.reducedMotion,
      narrativeEnabled: data.narrativeEnabled !== false,
      missionPulse: data.missionPulse !== false
    };
  } catch (e) {
    return { ...LM_DEFAULTS };
  }
}

/**
 * Zapis podsumowania sesji (po zakonczeniu).
 */
function saveLMSession() {
  try {
    const session = {
      timestamp: Date.now(),
      preset: actPr || null,
      phasesCompleted: LM_STATE.phase.completedIds.size,
      phasesTotal: LM_STATE.phase.phases.length,
      decisions: LM_STATE.hitl.history.map(h => ({
        id: h.id,
        type: h.type,
        outcome: h.outcome,
        responseTimeMs: h.responseTimeMs
      })),
      durationMs: performance.now() - LM_STATE.startTime
    };
    localStorage.setItem(LM_STORAGE_KEYS.LAST_SESSION, JSON.stringify(session));

    // Update stats
    const stats = loadLMStats();
    stats.totalSessions++;
    stats.totalDecisions += session.decisions.length;
    stats.avgDuration = Math.round(
      ((stats.avgDuration * (stats.totalSessions - 1)) + session.durationMs)
      / stats.totalSessions
    );
    localStorage.setItem(LM_STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (e) {
    console.warn('[LM] Session save failed:', e.message);
  }
}

/**
 * Odczyt statystyk.
 */
function loadLMStats() {
  try {
    const raw = localStorage.getItem(LM_STORAGE_KEYS.STATS);
    if (!raw) return { totalSessions: 0, totalDecisions: 0, avgDuration: 0, firstUsed: Date.now() };
    return JSON.parse(raw);
  } catch (e) {
    return { totalSessions: 0, totalDecisions: 0, avgDuration: 0, firstUsed: Date.now() };
  }
}
```

### 7.3 Size Estimation

```
SETTINGS:     ~200 bytes (JSON z 5 kluczami)
LAST_SESSION: ~500 bytes (JSON z max 5 decyzjami i metadanymi)
STATS:        ~100 bytes (JSON z 4 liczbami)
---------------------------------------------
TOTAL:        ~800 bytes (< 1 KB)

Porownanie: v21 acV21 = ~5-50 KB (saved configs z nodes/conns)
Budoet localStorage: ~5 MB limit przegladarki
Zuzycie LM: 0.016% budoetu -- zerowe ryzyko
```

### 7.4 Migration

```javascript
/**
 * Migracja localStorage z przyszlych wersji.
 * Wzorzec: sprawdz obecnosc klucza '_version'.
 * Jesli brak -- v22 (pierwsza wersja z LM).
 * Jesli < aktualna -- migruj.
 */
const LM_STORAGE_VERSION = 1; // v22 = 1

function migrateLMStorage() {
  try {
    const raw = localStorage.getItem(LM_STORAGE_KEYS.SETTINGS);
    if (!raw) return; // pierwsze uzycie, nic do migracji

    const data = JSON.parse(raw);
    const version = data._version || 1;

    if (version < LM_STORAGE_VERSION) {
      // Przyszle migracje tutaj:
      // if (version < 2) { ... }
      // if (version < 3) { ... }
      data._version = LM_STORAGE_VERSION;
      localStorage.setItem(LM_STORAGE_KEYS.SETTINGS, JSON.stringify(data));
    }
  } catch (e) {
    // Uszkodzone dane -- reset
    localStorage.removeItem(LM_STORAGE_KEYS.SETTINGS);
  }
}
```

---

## 8. Error Handling

### 8.1 Incomplete Data

```javascript
/**
 * Walidacja stanu przed uruchomieniem Live Monitor.
 * Sprawdza czy na canvasie sa wystarczajace dane do symulacji.
 *
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateLMPrerequisites() {
  const errors = [];

  // Czy sa jakiekolwiek nody na canvasie?
  if (!nodes || nodes.length === 0) {
    errors.push('Brak agentow na ukladzie. Dodaj agentow lub zaladuj preset.');
  }

  // Czy sa nody z rozpoznanymi fazami?
  const hasPhase = nodes.some(nd => {
    const d = AD_MAP.get(nd.defId);
    return d && d.phase;
  });
  if (!hasPhase) {
    errors.push('Zaden agent nie ma przypisanej fazy. Uzyj presetu Deep Five Minds.');
  }

  // Czy sa przynajmniej 2 rozne fazy? (inaczej symulacja jest trywialna)
  const phaseIds = new Set();
  nodes.forEach(nd => {
    const d = AD_MAP.get(nd.defId);
    if (d && d.phase) phaseIds.add(d.phase);
  });
  if (phaseIds.size < 2) {
    errors.push('Potrzebne minimum 2 fazy do symulacji (aktualnie: ' + phaseIds.size + ').');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Bezpieczne uruchomienie Live Monitor z walidacja.
 */
function safeLaunchLiveMonitor() {
  const check = validateLMPrerequisites();
  if (!check.valid) {
    showToast('Nie mozna uruchomic Live Monitor: ' + check.errors[0]);
    return;
  }
  openLiveMonitor();
}
```

### 8.2 Missing Templates

```javascript
/**
 * Bezpieczny dostep do NARRATIVE_TEMPLATES i DEBATE_SCRIPTS.
 * Nigdy nie rzuca wyjatku -- zawsze zwraca sensowny fallback.
 */
function safeGetNarrative(defId, status, context) {
  try {
    return generateNarrative(defId, status, context);
  } catch (e) {
    console.warn('[LM Narrative]', defId, status, e.message);
    // Fallback chain:
    // 1. AGENT_SPEECH z v21
    const speeches = AGENT_SPEECH[defId];
    if (speeches && speeches.length > 0) {
      return speeches[Math.floor(Math.random() * speeches.length)];
    }
    // 2. Generic status label
    return STATUS_LABELS[status] || 'Pracuje...';
  }
}

function safeGetDebateScript(debateIndex) {
  try {
    const key = debateIndex === 0 ? 'fm1' : 'fm2';
    const preset = actPr || 'default';
    // Szukaj preset-specific, potem default
    return DEBATE_SCRIPTS[preset]?.[key]
        || DEBATE_SCRIPTS.default?.[key]
        || null;
  } catch (e) {
    console.warn('[LM Debate]', e.message);
    return null;
  }
}
```

### 8.3 HITL Timeout (Tab Inactive)

```javascript
/**
 * Obsluga nieaktywnej karty przegladarki.
 *
 * Problem: jesli user przelacza karte podczas HITL, timer moze
 * byc throttled przez przegladarke (setInterval/setTimeout
 * spowalniaja w tle do ~1/sec lub wolniej).
 *
 * Rozwiazanie: Page Visibility API -- pauzuj timer gdy karta nieaktywna,
 * wznow gdy wraca. Nie "karamy" usera za przejscie na inna karte.
 */
let _tabHiddenAt = 0;

function initVisibilityHandler() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Karta ukryta
      _tabHiddenAt = performance.now();

      // Pauzuj HITL timer (nie liczy sie czas gdy karta ukryta)
      if (_hitlTimerInterval && LM_STATE.hitl.pending) {
        clearInterval(_hitlTimerInterval);
        _hitlTimerInterval = null; // zachowaj stan, ale nie odliczaj
      }

      // Pauzuj particle effects i starfield (Gold Solution: visibilitychange pause)
      // AnimationManager.pause() -- bedzie zaimplementowane w Phase 0
    } else {
      // Karta wraca
      const hiddenDuration = performance.now() - _tabHiddenAt;

      // Wznow HITL timer jesli byl aktywny (z korygowanym czasem)
      if (LM_STATE.hitl.pending && LM_STATE.settings.autoApproveTimer > 0) {
        startAutoApproveTimer(LM_STATE.hitl.pending);
      }

      // Wznow animacje
      // AnimationManager.resume();

      // Jesli symulacja biegla -- zaloguj przerwe
      if (LM_STATE.status === 'running') {
        LM_STATE.sessionEvents.push({
          type: 'tab:return',
          timestamp: performance.now(),
          summary: 'Tab hidden for ' + Math.round(hiddenDuration / 1000) + 's'
        });
      }
    }
  });
}
```

### 8.4 Graceful Degradation Strategy

```javascript
/**
 * Strategia degradacji przy problemach:
 *
 * LEVEL 0 (NORMAL):
 *   Wszystko dziala -- narrative templates, animacje, mission pulse.
 *
 * LEVEL 1 (REDUCED):
 *   FPS < 45 lub prefers-reduced-motion
 *   -> Wylacz starfield particles
 *   -> Wylacz mission pulse
 *   -> Static connections (bez particle flow)
 *   -> Wylacz shimmer/breathing animacje
 *
 * LEVEL 2 (MINIMAL):
 *   FPS < 30 lub error w AnimationManager
 *   -> Wylacz glassmorphism (solid background fallback)
 *   -> Wylacz WSZYSTKIE CSS animations
 *   -> Tylko status colors + labele tekstowe
 *   -> Comms log = plain text, zero formatting
 *
 * LEVEL 3 (EMERGENCY):
 *   Blad krytyczny (uncaught exception w renderLMFrame)
 *   -> Zamknij Live Monitor
 *   -> Wznow canvas view
 *   -> Pokaz toast z bledem
 *   -> Loguj do sessionEvents
 */
const DEGRADATION_LEVELS = {
  NORMAL:    0,
  REDUCED:   1,
  MINIMAL:   2,
  EMERGENCY: 3
};

let _degradationLevel = DEGRADATION_LEVELS.NORMAL;

/**
 * Ustaw poziom degradacji.
 * @param {number} level -- DEGRADATION_LEVELS.*
 */
function setDegradation(level) {
  _degradationLevel = level;
  const overlay = document.getElementById('lm-overlay');
  if (!overlay) return;

  overlay.dataset.degradation = level;
  // CSS: [data-degradation="1"] .lm-particle { display: none }
  // CSS: [data-degradation="2"] * { animation: none !important }

  if (level >= DEGRADATION_LEVELS.EMERGENCY) {
    console.error('[LM] Emergency degradation -- closing monitor');
    closeLiveMonitor();
    showToast('Live Monitor zamkniety z powodu bledu. Canvas przywrocony.');
  }
}

/**
 * Globalny error boundary dla Live Monitor.
 * Lapie uncaught errors w renderLMFrame i degraduje zamiast crashowac.
 */
function safeLMRender() {
  try {
    renderLMFrame();
  } catch (e) {
    console.error('[LM Render Error]', e);
    _lmRenderErrors = (_lmRenderErrors || 0) + 1;
    if (_lmRenderErrors > 5) {
      setDegradation(DEGRADATION_LEVELS.EMERGENCY);
    } else if (_lmRenderErrors > 2) {
      setDegradation(DEGRADATION_LEVELS.MINIMAL);
    }
  }
}

let _lmRenderErrors = 0;
```

### 8.5 Defensive Patterns -- Checklist

```javascript
/**
 * Defensive patterns stosowane WSZEDZIE w Live Monitor:
 *
 * 1. NIGDY nie zakladaj ze element DOM istnieje:
 *    const el = document.getElementById('lm-X');
 *    if (!el) return;
 *
 * 2. NIGDY nie zakladaj ze agent ma definicje:
 *    const def = AD_MAP.get(defId);
 *    if (!def) return;
 *
 * 3. NIGDY nie zakładaj ze faza istnieje:
 *    const phase = LM_STATE.phase.phases[idx];
 *    if (!phase) return;
 *
 * 4. ZAWSZE waliduj input z localStorage:
 *    const data = JSON.parse(raw || '{}');
 *    if (typeof data.autonomy !== 'string') data.autonomy = 'act-confirm';
 *
 * 5. ZAWSZE ogranzci rozmiar tablic:
 *    if (LM_STATE.sessionEvents.length < 5000) { ... }
 *    if (LM_STATE.comms.messages.length < 1000) { ... }
 *
 * 6. ZAWSZE catch w event bus handlers:
 *    try { fn(event); } catch (e) { console.error(...); }
 *
 * 7. NIGDY nie blokuj main thread:
 *    - setTimeout/setInterval zamiast tight loops
 *    - rAF batching zamiast synchronicznego DOM manipulation
 *    - MSG_QUEUE.enqueue() zamiast natychmiastowego renderowania
 *
 * 8. ZAWSZE cleanup przy zamknieciu:
 *    - clearTimeout/clearInterval
 *    - lmBus.clear() (opcjonalnie, jesli monitor moze byc ponownie otwarty)
 *    - cancelAnimationFrame
 *    - DOM.remove() dla dynamicznych elementow
 */
```

---

## Dodatek A: Pelna Mapa Zaleznosci

```
lmInit() -- lazy, wywolywany raz
  ├── injectLMStyles()     -- CSS do <style>
  ├── buildLMDom()         -- DOM overlay, HUD, grid, comms, timeline, HITL panel
  ├── registerLMListeners() -- keyboard, click, resize, visibilitychange
  └── hookSimulation()     -- wrapper na simStep/simStop

openLiveMonitor()
  ├── lmInit() (jesli nie zaladowany)
  ├── createAgentRuntime() x N  -- per node
  ├── buildPhaseState()         -- z aktualnych nodow
  ├── showLMOverlay()           -- View Transitions API || instant
  ├── startMetricsTicker()      -- co 1s
  └── togSim()                  -- v21 start

simStep() [hooked]
  ├── shouldTriggerHITL()       -- sprawdz HITL
  │   └── pauseForHITL()        -- jesli tak
  │       ├── showHITLPanel()
  │       └── startAutoApproveTimer()
  ├── origSimStep()             -- v21 logika
  ├── lmBus.dispatch('phase:start')
  ├── updateAgentStatesForPhase()
  │   └── setAgentStatus() x N
  │       └── lmBus.dispatch('agent:status')
  └── startDebateArena()        -- jesli faza debate

recordHITLDecision()
  ├── hideHITLPanel()
  ├── stopAutoApproveTimer()
  ├── lmBus.dispatch('hitl:decision')
  └── resumeAfterHITL()
      └── simStep() || simStop()

Narrative flow:
  agent:status event
    -> generateNarrative()
      -> parseTemplate()
    -> lmBus.dispatch('comms:message')
      -> MSG_QUEUE.enqueue()
        -> MSG_QUEUE.drain()
          -> renderCommsMessage()

Render flow (rAF batched):
  scheduleLMRender()
    -> renderLMFrame()
      ├── computeMetrics()
      ├── updateHUD()
      ├── updateAgentCards()  -- data-state attributes
      ├── updatePhaseTimeline()
      └── updateMissionPulse()
```

---

## Dodatek B: Interfejsy Publiczne (API Surface)

```javascript
// === PUBLICZNE FUNKCJE (dostepne globalnie) ===

safeLaunchLiveMonitor()   // Uruchom LM z walidacja
closeLiveMonitor()        // Zamknij LM i wroc do canvas
recordHITLDecision(outcome, note)  // Zarejestruj decyzje HITL

// === SEMI-PUBLICZNE (uzywane przez UI handlers) ===

setAgentStatus(nodeId, status)     // Zmien status agenta
generateNarrative(defId, status, ctx) // Generuj tekst narracyjny
calcProgress(state)                // Oblicz progress %
computeMetrics(state)              // Oblicz wszystkie metryki

// === EVENT BUS ===

lmBus.on(type, handler)   // Subskrybuj na event
lmBus.off(type, handler)  // Odsubskrybuj
lmBus.dispatch(type, payload) // Emituj event

// === STORAGE ===

saveLMSettings()           // Zapisz ustawienia
loadLMSettings()           // Odczytaj ustawienia
saveLMSession()            // Zapisz podsumowanie sesji
loadLMStats()              // Odczytaj statystyki
```

---

## Dodatek C: Szacunek LOC

```
Data structures + types:        ~80 LOC
Event bus + catalog:            ~60 LOC
Simulation hooks:               ~120 LOC
HITL logic (full):              ~180 LOC
Metrics calculator:             ~60 LOC
Narrative engine + templates:   ~200 LOC (w tym ~2KB data)
localStorage:                   ~60 LOC
Error handling:                 ~80 LOC
-----------------------------------------
TOTAL BACKEND LOGIC:            ~840 LOC

Porownanie z Gold Solution budzet:
  Phase 1 (core): 610 LOC
  Phase 2 (comm+interact): 460 LOC
  = 1070 LOC lacznie

Backend logic 840 LOC = ~79% budzetu Phase 1+2.
Reszta (~230 LOC) to DOM building i CSS -- zadanie Frontend Dev.
Miesci sie w budzecie Gold Solution (1265 LOC max netto).
```

---

*Specyfikacja przygotowana przez Backend Dev [OPUS] w ramach Deep Five Minds Protocol.*
*Perspektywa: Architektura danych, logika biznesowa, event-driven design, defensive coding.*
*Data: 4 kwietnia 2026*
