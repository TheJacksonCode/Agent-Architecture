# Feature Dev [OPUS] -- Specyfikacja Specjalnych Features Live Monitor
## Deep Five Minds Protocol | Faza BUILD

**Rola:** Feature Dev [OPUS]
**Data:** 2026-04-04
**Zrodla:** 13_GOLD_SOLUTION.md, MANIFEST.md, 09_INNOWATOR.md
**Cel:** Implementowalna specyfikacja 8 specjalnych features z pseudo-kodem, estymacja LOC, zaleznosci, edge cases

---

## Podsumowanie Budzetowe

| Feature | Priorytet | LOC | Faza |
|---------|-----------|-----|------|
| F1. AnimationManager | MUST (Phase 0) | ~80 | Infrastructure |
| F2. Narrative Templates | MUST | ~45 | Phase 2 |
| F3. Mission Pulse | MUST | ~20 | Phase 3 |
| F4. HITL Decision Engine | MUST | ~150 | Phase 2 |
| F5. Debate Arena Renderer | MUST | ~200 | Phase 3 |
| F6. State Machine | MUST | ~90 | Phase 1 |
| F7. Connection Animator | SHOULD | ~60 | Phase 3 |
| F8. Compact Mode | SHOULD | ~50 | Phase 3+ |
| **RAZEM** | | **~695** | |

Budzet Gold Solution na MUST: ~1020 LOC (core) + ~80 LOC (AnimationManager). Te 695 LOC to podzbiór tych estymacji -- features tu opisane nakładają się z M2, M5, S1, S2, S5, I1 z Gold Solution.

---

## F1. AnimationManager (MUST -- Phase 0)

### Opis

Centralny singleton zarządzający WSZYSTKIMI animacjami opartymi na `requestAnimationFrame` w aplikacji. Zastępuje rozproszone `rAF` loopy w v21 (starfield, particles, connections, simulation step) jednym koordynowanym loop. Rozwiązuje istniejący problem: v21 ma minimum 3-4 niezależne `requestAnimationFrame` wywołania, które konkurują o frame budget.

### Pseudo-kod API

```javascript
// ============================================
// AnimationManager -- Singleton
// ============================================

const AnimMgr = (() => {
  // --- Prywatny state ---
  const tasks = new Map();       // id -> {callback, priority, enabled}
  let rafId = null;              // aktualny requestAnimationFrame ID
  let lastTime = 0;              // timestamp ostatniej klatki
  let targetFPS = 60;            // target FPS (60 lub 30)
  let frameInterval = 1000 / 60; // ms miedzy klatkami
  let paused = false;            // globalny pause
  let reducedMotion = false;     // prefers-reduced-motion aktywne
  let frameCount = 0;            // counter do FPS pomiaru
  let fpsAccum = 0;              // akumulator czasu do FPS
  let currentFPS = 60;           // zmierzony FPS (rolling average)

  // --- Detekcja reduced-motion ---
  const mqReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion = mqReducedMotion.matches;
  mqReducedMotion.addEventListener('change', (e) => {
    reducedMotion = e.matches;
    if (reducedMotion) {
      // Wyłącz wszystkie dekoracyjne animacje
      tasks.forEach((task, id) => {
        if (task.priority === 'decorative') task.enabled = false;
      });
    } else {
      tasks.forEach((task) => { task.enabled = true; });
    }
  });

  // --- Visibility handler: pause gdy tab ukryty ---
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      _stopLoop();
    } else if (!paused && tasks.size > 0) {
      lastTime = performance.now(); // reset delta zeby uniknac jump
      _startLoop();
    }
  });

  // --- Główny loop ---
  function _tick(currentTime) {
    rafId = requestAnimationFrame(_tick);

    const delta = currentTime - lastTime;

    // FPS throttling: skip frame jesli za wczesnie
    if (delta < frameInterval) return;

    // Normalizacja delta (cap na 100ms = 10 FPS minimum, zapobiega "spiral of death")
    const dt = Math.min(delta, 100);
    lastTime = currentTime - (delta % frameInterval);

    // FPS measurement (rolling 1-second window)
    frameCount++;
    fpsAccum += delta;
    if (fpsAccum >= 1000) {
      currentFPS = Math.round((frameCount * 1000) / fpsAccum);
      frameCount = 0;
      fpsAccum = 0;
    }

    // Sortowane po priorytecie: 'critical' > 'normal' > 'decorative'
    const sortedTasks = [...tasks.values()]
      .filter(t => t.enabled)
      .sort((a, b) => _priorityRank(a.priority) - _priorityRank(b.priority));

    // Wykonaj taski z performance budget check
    const frameBudget = 14; // ms -- zostawia 2.67ms na browser compositing (16.67 - 14 = 2.67)
    let elapsed = 0;

    for (const task of sortedTasks) {
      if (elapsed > frameBudget && task.priority === 'decorative') {
        // Pomin dekoracyjne jesli frame budget przekroczony
        continue;
      }
      const taskStart = performance.now();
      try {
        task.callback(currentTime, dt);
      } catch (err) {
        console.warn(`[AnimMgr] Task "${task.id}" error:`, err);
        // Nie wyrzucaj blednego taska -- moze sie naprawic
      }
      elapsed += performance.now() - taskStart;
    }
  }

  function _priorityRank(p) {
    return p === 'critical' ? 0 : p === 'normal' ? 1 : 2;
  }

  function _startLoop() {
    if (rafId === null) {
      lastTime = performance.now();
      rafId = requestAnimationFrame(_tick);
    }
  }

  function _stopLoop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // --- Publiczne API ---
  return {
    /**
     * Rejestruje animację.
     * @param {string} id - Unikalny identyfikator (np. 'starfield', 'particles', 'mission-pulse')
     * @param {function(currentTime: number, deltaMs: number)} callback
     * @param {'critical'|'normal'|'decorative'} priority
     *   - critical: simulation step, state updates (NIGDY skipowany)
     *   - normal: particles, connections (skipowany gdy tab hidden)
     *   - decorative: starfield, pulse, glow (skipowany gdy reduced-motion LUB frame budget exceeded)
     */
    register(id, callback, priority = 'normal') {
      if (tasks.has(id)) {
        console.warn(`[AnimMgr] Task "${id}" already registered, replacing.`);
      }
      tasks.set(id, {
        id,
        callback,
        priority,
        enabled: !(reducedMotion && priority === 'decorative')
      });
      _startLoop(); // Auto-start jesli pierwszy task
    },

    /**
     * Wyrejestrowuje animację.
     */
    unregister(id) {
      tasks.delete(id);
      if (tasks.size === 0) _stopLoop(); // Auto-stop jesli pusty
    },

    /**
     * Globalny pause -- zatrzymuje WSZYSTKIE animacje.
     * Używane przez: HITL decision (focus na panelu), ESC z monitora.
     */
    pause() {
      paused = true;
      _stopLoop();
    },

    /**
     * Wznawia po pause.
     */
    resume() {
      paused = false;
      if (tasks.size > 0) {
        lastTime = performance.now();
        _startLoop();
      }
    },

    /**
     * Zmienia target FPS. Degradation strategy:
     * - 60 FPS: domyślny
     * - 30 FPS: fallback gdy currentFPS < 45 przez 3 sekundy
     */
    setTargetFPS(fps) {
      targetFPS = fps;
      frameInterval = 1000 / fps;
    },

    /**
     * Diagnostyka.
     */
    getStats() {
      return {
        fps: currentFPS,
        activeCount: [...tasks.values()].filter(t => t.enabled).length,
        totalCount: tasks.size,
        frameTime: frameInterval,
        paused,
        reducedMotion
      };
    },

    /** Czy reduced-motion aktywne */
    get isReducedMotion() { return reducedMotion; },

    /** Ręczny toggle reduced-motion (in-app setting) */
    setReducedMotion(val) {
      reducedMotion = val;
      tasks.forEach((task) => {
        if (task.priority === 'decorative') task.enabled = !val;
      });
    }
  };
})();
```

### Migracja istniejących rAF z v21

v21 ma rozproszone `requestAnimationFrame` w:
1. `drawStarfield()` -- starfield canvas animation (decorative)
2. `animateDataPackets()` -- particle data packets na SVG connections (normal)
3. `simStep()` -- simulation tick logic (critical)
4. `animateMissionControl()` -- Mission Control background effects (decorative)

Każdy z tych loopów należy zamienić na rejestrację w AnimMgr:

```javascript
// PRZED (v21):
function drawStarfield() {
  // ...render logic...
  requestAnimationFrame(drawStarfield);
}
drawStarfield();

// PO (v22):
function drawStarfield(currentTime, dt) {
  // ...render logic, użyj dt do normalizacji prędkości...
}
AnimMgr.register('starfield', drawStarfield, 'decorative');
// Cleanup: AnimMgr.unregister('starfield')
```

### Estymacja LOC

| Element | LOC |
|---------|-----|
| AnimMgr IIFE + prywatny state | 15 |
| _tick() z FPS throttle + delta-time + budget | 25 |
| register/unregister | 10 |
| pause/resume/setTargetFPS | 8 |
| getStats + reduced-motion detection | 10 |
| visibilitychange handler | 5 |
| Migracja 4 istniejących rAF | 7 (netto -20 bo usuwamy 4 lokalne loopy) |
| **RAZEM** | **~80 LOC nowego, -20 LOC refaktoru = ~60 LOC netto** |

### Zależności

- **Zależy od:** niczego (Phase 0 -- PIERWSZY implementowany)
- **Blokuje:** WSZYSTKIE features z animacjami (F3 Mission Pulse, F5 Debate Arena, F7 Connection Animator, plus core M2 status viz, M4 agent grid reveal)

### Edge Cases

| Edge Case | Rozwiązanie |
|-----------|-------------|
| Tab hidden -> unhidden po 30 minutach | `lastTime` reset w `visibilitychange` -- zapobiega `dt = 1800000ms` |
| Task rzuca wyjątek | `try/catch` per task, log warning, NIE wyrzucaj taska (może być przejściowy błąd) |
| FPS spada poniżej 30 | Auto-degradation: po 3s < 45 FPS -> `setTargetFPS(30)`, po 3s < 25 FPS -> wyłącz decorative |
| Wszystkie taski wyrejestrowane | `_stopLoop()` automatycznie -- zero CPU usage |
| Register duplikatu ID | Nadpisanie z ostrzeżeniem w konsoli |
| `performance.now()` niedostępne | Impossible w target browsers (Chrome 36+, FF 48+, Safari 13.1+) |
| Reduced-motion zmienione runtime | `MediaQueryList.change` event -> natychmiastowa aktualizacja `enabled` na decorative tasks |
| Frame budget exceeded | Dekoracyjne taski pomijane; critical i normal ZAWSZE się wykonują |

### Auto-Degradation Protocol

```javascript
// Wbudowany w _tick() -- dodatkowe 10 LOC
let degradeCounter = 0;
// W _tick, po FPS measurement:
if (currentFPS < 45) {
  degradeCounter++;
  if (degradeCounter > 3 /* 3 sekundy */ && targetFPS === 60) {
    AnimMgr.setTargetFPS(30);
    console.info('[AnimMgr] Degraded to 30 FPS');
  }
  if (degradeCounter > 6 && targetFPS === 30) {
    // Wyłącz dekoracyjne
    tasks.forEach((t) => { if (t.priority === 'decorative') t.enabled = false; });
    console.info('[AnimMgr] Disabled decorative animations');
  }
} else {
  degradeCounter = 0;
}
```

---

## F2. Narrative Templates (MUST)

### Opis

System szablonów tekstowych zamieniających suche statusy (`"Researcher: state=working"`) na narracyjne podsumowania (`"Researcher zanurza się w dokumentację API..."`). Wykorzystywany w Comms Log (M6) i w Mission Control timeline. Każdy agent ma min. 3 szablony per stan, z kontekstową wariacją per faza. Randomizacja z unikaniem powtórzeń (nie powtórz tego samego szablonu pod rząd).

Inspiracja: Hades (narracja Zagreusa), misje Apollo z narracją Houston.

### Pseudo-kod API

```javascript
// ============================================
// NarrativeEngine -- Template System
// ============================================

const NarrativeEngine = (() => {

  // Szablony: agent_type -> state -> [templates]
  // Zmienne w szablonach: ${agent}, ${target}, ${aspect}, ${phase}
  const TEMPLATES = {

    // --- ORKIESTRATOR ---
    orchestrator: {
      working: [
        "${agent} koordynuje przepływ zadań między agentami...",
        "${agent} analizuje zależności i optymalizuje kolejność pracy...",
        "${agent} synchronizuje komunikację zespołu...",
        "${agent} dystrybuuje zadania do specjalistów...",
        "${agent} monitoruje postęp i koryguje plan..."
      ],
      thinking: [
        "${agent} planuje następne kroki strategii...",
        "${agent} rozważa priorytetyzację zadań...",
        "${agent} kalkuluje optymalną ścieżkę realizacji..."
      ],
      done: [
        "${agent} zakończył koordynację fazy ${phase}.",
        "${agent} zamknął sesję orkiestracji. Wszystkie zadania przekazane.",
        "${agent} potwierdza: faza ${phase} zakończona sukcesem."
      ]
    },

    // --- RESEARCHER ---
    researcher: {
      working: [
        "${agent} zanurza się w dokumentację ${target}...",
        "${agent} przeszukuje bazę wiedzy pod kątem ${aspect}...",
        "${agent} analizuje wzorce w źródłach technicznych...",
        "${agent} gromadzi dane z wielu repozytoriów...",
        "${agent} identyfikuje kluczowe zależności w ${target}..."
      ],
      thinking: [
        "${agent} weryfikuje spójność znalezionych informacji...",
        "${agent} porównuje sprzeczne źródła...",
        "${agent} formułuje wnioski z analizy..."
      ],
      done: [
        "${agent} dostarczył raport badawczy. ${aspect} zbadany.",
        "${agent} zakończył deep research. Wyniki przekazane."
      ]
    },

    // --- ANALITYK ---
    analyst: {
      working: [
        "${agent} bada wymagania pod kątem niespójności...",
        "${agent} dekonstruuje specyfikację na atomowe wymagania...",
        "${agent} mapuje zależności między komponentami..."
      ],
      thinking: [
        "${agent} dostrzega potencjalną niespójność w wymaganiach...",
        "${agent} analizuje brakujące przypadki brzegowe..."
      ],
      done: [
        "${agent} zakończył analizę. Raport gotowy."
      ]
    },

    // --- PLANISTA ---
    planner: {
      working: [
        "${agent} projektuje architekturę rozwiązania...",
        "${agent} definiuje kamienie milowe i zależności...",
        "${agent} rozkłada zadania na podzadania..."
      ],
      thinking: [
        "${agent} waży alternatywne podejścia architektoniczne...",
        "${agent} szacuje złożoność implementacji..."
      ],
      done: [
        "${agent} przedstawił plan implementacji.",
        "${agent} zakończył planowanie. Architektura zatwierdzona."
      ]
    },

    // --- BACKEND DEVELOPER ---
    backend: {
      working: [
        "${agent} implementuje logikę serwera...",
        "${agent} projektuje endpointy API...",
        "${agent} buduje warstwę danych..."
      ],
      thinking: [
        "${agent} rozważa wzorce projektowe dla ${aspect}...",
        "${agent} analizuje trade-offy wydajnościowe..."
      ],
      done: [
        "${agent} zakończył implementację backendu."
      ]
    },

    // --- FRONTEND DEVELOPER ---
    frontend: {
      working: [
        "${agent} buduje komponenty interfejsu...",
        "${agent} implementuje interakcje użytkownika...",
        "${agent} stylizuje widok z uwzględnieniem UX..."
      ],
      thinking: [
        "${agent} analizuje flow użytkownika...",
        "${agent} rozważa responsywność layoutu..."
      ],
      done: [
        "${agent} zakończył implementację frontendu."
      ]
    },

    // --- QA SECURITY ---
    qa_security: {
      working: [
        "${agent} skanuje kod pod kątem luk bezpieczeństwa...",
        "${agent} testuje odporność na injection attacks...",
        "${agent} weryfikuje politykę autoryzacji..."
      ],
      thinking: [
        "${agent} analizuje potencjalne wektory ataku...",
        "${agent} rozważa edge cases bezpieczeństwa..."
      ],
      done: [
        "${agent} zakończył audyt bezpieczeństwa. Raport dostarczony."
      ]
    },

    // --- QA QUALITY ---
    qa_quality: {
      working: [
        "${agent} weryfikuje spójność outputów...",
        "${agent} testuje scenariusze brzegowe...",
        "${agent} sprawdza zgodność z wymaganiami..."
      ],
      thinking: [
        "${agent} identyfikuje luki w pokryciu testami..."
      ],
      done: [
        "${agent} zakończył kontrolę jakości."
      ]
    },

    // --- FIVE MINDS: PRAGMATYK ---
    fm_pragmatist: {
      working: [
        "${agent} analizuje wykonalność i koszty propozycji...",
        "${agent} szacuje timeline i zasoby...",
        "${agent} weryfikuje techniczną realność argumentów..."
      ],
      thinking: [
        "${agent} kalkuluje risk-reward ratio..."
      ],
      done: [
        "${agent} przedstawił pragmatyczną ocenę."
      ]
    },

    // --- FIVE MINDS: WIZJONER ---
    fm_visionary: {
      working: [
        "${agent} eksploruje innowacyjne podejścia...",
        "${agent} szuka przełomowych rozwiązań...",
        "${agent} kwestionuje założenia i proponuje alternatywy..."
      ],
      thinking: [
        "${agent} wyobraża sobie idealne rozwiązanie..."
      ],
      done: [
        "${agent} przedstawił wizjonerską propozycję."
      ]
    },

    // --- FIVE MINDS: KRYTYK ---
    fm_critic: {
      working: [
        "${agent} identyfikuje słabości w argumentacji...",
        "${agent} testuje odporność propozycji na stress cases...",
        "${agent} szuka ukrytych założeń..."
      ],
      thinking: [
        "${agent} formułuje krytyczną analizę..."
      ],
      done: [
        "${agent} dostarczył ocenę krytyczną."
      ]
    },

    // --- FIVE MINDS: DEVIL'S ADVOCATE ---
    fm_devils_advocate: {
      working: [
        "${agent} przygotowuje kontratak na konsensus...",
        "${agent} szuka słabego ogniwa w Gold Solution...",
        "${agent} testuje granice proponowanego rozwiązania...",
        "${agent} wywraca argumenty drugiej strony na nice..."
      ],
      thinking: [
        "${agent} buduje argumentację przeciw...",
        "${agent} przygotowuje prowokacyjne pytanie..."
      ],
      done: [
        "${agent} zakończył rundę adversarial challenge."
      ]
    },

    // --- FIVE MINDS: SYNTETYK ---
    fm_synthesizer: {
      working: [
        "${agent} łączy fragmenty debaty w spójną całość...",
        "${agent} waży argumenty ekspertów i szuka konsensusu...",
        "${agent} formułuje Gold Solution..."
      ],
      thinking: [
        "${agent} mediuje między sprzecznymi pozycjami...",
        "${agent} szuka złotego środka..."
      ],
      done: [
        "${agent} przedstawił Gold Solution.",
        "${agent} sfinalizował syntezę debaty."
      ]
    },

    // Fallback dla nieznanych typów agentów
    _default: {
      working: ["${agent} pracuje nad zadaniem..."],
      thinking: ["${agent} analizuje dane..."],
      done: ["${agent} zakończył zadanie."],
      queued: ["${agent} czeka w kolejce..."],
      idle: ["${agent} jest w trybie gotowości."],
      error: ["${agent} napotkał problem!"],
      'waiting-for-human': ["${agent} czeka na Twoją decyzję."]
    }
  };

  // Kontekstowe modyfikatory per faza -- prefix dodawany do szablonu
  const PHASE_CONTEXT = {
    strategy:   "[Strategia]",
    research:   "[Badania]",
    fiveminds1: "[Debata #1]",
    build:      "[Budowa]",
    fiveminds2: "[Debata #2]",
    qa:         "[Kontrola Jakości]"
  };

  // Cel kontekstowy per faza (uzywany jako ${target} i ${aspect})
  const PHASE_TARGETS = {
    strategy:   { target: "strategię projektu", aspect: "wykonalności" },
    research:   { target: "dokumentację techniczną", aspect: "wzorców implementacji" },
    fiveminds1: { target: "propozycje architektury", aspect: "trade-offów" },
    build:      { target: "implementację", aspect: "jakości kodu" },
    fiveminds2: { target: "wyniki budowy", aspect: "zgodności z planem" },
    qa:         { target: "produkt końcowy", aspect: "niezawodności" }
  };

  // Anti-repetition: ostatnio użyty index per agent+state
  const lastUsed = new Map(); // key: "agentId:state" -> lastIndex

  /**
   * Generuje narracyjny tekst dla agenta.
   * @param {string} agentId - np. 'researcher', 'fm_pragmatist'
   * @param {string} agentName - wyświetlana nazwa, np. 'Researcher', 'Pragmatyk'
   * @param {string} state - 'working'|'thinking'|'done'|'queued'|'idle'|'error'|'waiting-for-human'
   * @param {string} phase - 'strategy'|'research'|'fiveminds1'|'build'|'fiveminds2'|'qa'
   * @returns {string} Narracyjny tekst
   */
  function generate(agentId, agentName, state, phase) {
    // 1. Znajdź szablony: agent-specific -> fallback _default
    const agentTemplates = TEMPLATES[agentId] || TEMPLATES._default;
    const stateTemplates = agentTemplates[state] || TEMPLATES._default[state] || ["${agent}: ${state}"];

    // 2. Wybierz template z anti-repetition
    const key = `${agentId}:${state}`;
    const lastIdx = lastUsed.get(key) ?? -1;
    let idx;
    if (stateTemplates.length === 1) {
      idx = 0;
    } else {
      do {
        idx = Math.floor(Math.random() * stateTemplates.length);
      } while (idx === lastIdx && stateTemplates.length > 1);
    }
    lastUsed.set(key, idx);

    // 3. Interpolacja zmiennych
    const ctx = PHASE_TARGETS[phase] || { target: "projekt", aspect: "ogólnym" };
    const template = stateTemplates[idx];
    const text = template
      .replace(/\$\{agent\}/g, agentName)
      .replace(/\$\{target\}/g, ctx.target)
      .replace(/\$\{aspect\}/g, ctx.aspect)
      .replace(/\$\{phase\}/g, PHASE_CONTEXT[phase] || phase);

    return text;
  }

  /**
   * Resetuje historię anti-repetition (np. na początku nowej sesji).
   */
  function reset() {
    lastUsed.clear();
  }

  return { generate, reset, PHASE_CONTEXT };
})();
```

### Użycie w Comms Log

```javascript
// W addDTLMsg() lub w nowej funkcji addNarrativeMsg():
function addNarrativeMsg(agentId, agentName, state, phase) {
  const text = NarrativeEngine.generate(agentId, agentName, state, phase);
  // Dodaj do comms log z timestamp i agent icon
  addCommsLogEntry({
    time: formatTime(simElapsed),
    agent: agentName,
    agentId: agentId,
    text: text,
    phase: phase,
    type: 'narrative' // rozróznia od 'system' i 'speech'
  });
}
```

### Estymacja LOC

| Element | LOC |
|---------|-----|
| TEMPLATES obiekt (~15 typów agentów * ~3-5 szablonów * ~3 stany) | 15 (dane -- kompaktowy format) |
| PHASE_CONTEXT + PHASE_TARGETS | 5 |
| generate() z interpolacją i anti-repetition | 15 |
| reset() + moduł IIFE wrapper | 5 |
| Integracja z comms log (addNarrativeMsg) | 5 |
| **RAZEM** | **~45 LOC** |

Uwaga: Gold Solution estymuje ~40 LOC. Różnica (5 LOC) z powodu PHASE_TARGETS kontekstowych -- warte dodatkowej linii kodu.

### Zależności

- **Zależy od:** M6 (Comms Log) -- bo szablony renderowane SA w comms log
- **Blokuje:** niczego (enhancement, nie blocker)

### Edge Cases

| Edge Case | Rozwiązanie |
|-----------|-------------|
| Nieznany agent type | Fallback na `_default` templates |
| Nieznany state | Fallback na `_default[state]` lub surowy `"${agent}: ${state}"` |
| Tylko 1 szablon per state | Anti-repetition skip, zawsze zwraca ten sam (lepsze niż crash) |
| Bardzo szybkie zmiany stanów (working->done w 200ms) | Nie generuj dla stanów trwających < 500ms -- debounce w callerze |
| Template z brakującą zmienną | `.replace()` zwraca oryginalny string z `${xxx}` -- OK, widoczne w dev, nieszkodliwe |
| Długi tekst szablonu (>120 znaków) | Szablony celowo krótkie (max 60 znaków). Comms log ma `text-overflow: ellipsis` + tooltip |
| Reset między sesjami | `NarrativeEngine.reset()` wywoływany w `simStop()` |

---

## F3. Mission Pulse (MUST)

### Opis

Globalny "puls" -- subtelna animacja jasności tła (vignette opacity) synchronizowana z poziomem aktywności agentów. Daje podprogowe odczucie "organizm żyje" bez obciążania kognitywnie użytkownika. Implementacja: funkcja sinusoidalna modulująca opacity overlay z vignette gradient.

Inspiracja: Monitor kardiologiczny, NASA telemetry heartbeat.

### Parametry

| Parametr | Wartość | Opis |
|----------|---------|------|
| BPM idle | 72 | 1 puls / 833ms, gdy 0 aktywnych agentów |
| BPM active | 72 + (activeAgents * 4) | Rośnie proporcjonalnie |
| BPM max | 120 | 1 puls / 500ms, cap przy pełnym obciążeniu |
| Opacity range | 0.02 -- 0.08 | BARDZO subtelne, podprogowe |
| BPM paused | 40 | 1 puls / 1500ms, gdy HITL decision |
| BPM error | irregular | Bazowe BPM + random jitter +-20% |

### Pseudo-kod

```javascript
// ============================================
// Mission Pulse -- Heartbeat Background
// ============================================

// DOM: <div id="monitor-pulse" /> -- position:fixed, inset:0, pointer-events:none
// CSS: radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(6,6,10,0.3) 100%)

function initMissionPulse() {
  const pulseEl = document.createElement('div');
  pulseEl.id = 'monitor-pulse';
  pulseEl.style.cssText = `
    position:fixed; inset:0; pointer-events:none; z-index:1;
    background: radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(6,6,10,0.3) 100%);
    opacity: 0.02; transition: none;
  `;
  document.getElementById('live-monitor').appendChild(pulseEl);

  // Stan pulsu
  let bpm = 72;
  let phaseAccum = 0; // akumulator fazy sinusoidy (0..2*PI)

  // Callback rejestrowany w AnimMgr
  function pulseTick(currentTime, dt) {
    // 1. Oblicz BPM na podstawie aktywnych agentów
    const activeCount = getActiveAgentCount(); // z monitorState
    const monitorState = getMonitorStateMachine(); // z F6

    if (monitorState === 'paused' || monitorState === 'hitl-decision') {
      bpm = 40; // wolny, dramatyczny puls
    } else if (hasErrorAgent()) {
      bpm = 90 + (Math.random() * 20 - 10); // nieregularny
    } else {
      bpm = Math.min(120, 72 + activeCount * 4);
    }

    // 2. Oblicz fazę sinusoidy
    const frequency = bpm / 60; // Hz (pulsów/s)
    phaseAccum += (2 * Math.PI * frequency * dt) / 1000;
    if (phaseAccum > 2 * Math.PI) phaseAccum -= 2 * Math.PI;

    // 3. Oblicz opacity (sinus 0..1 mapowany na 0.02..0.08)
    const sinVal = (Math.sin(phaseAccum) + 1) / 2; // 0..1
    const opacity = 0.02 + sinVal * 0.06;

    // 4. Zastosuj
    pulseEl.style.opacity = opacity;
  }

  AnimMgr.register('mission-pulse', pulseTick, 'decorative');

  // Cleanup
  return function destroyPulse() {
    AnimMgr.unregister('mission-pulse');
    pulseEl.remove();
  };
}
```

### Estymacja LOC

| Element | LOC |
|---------|-----|
| DOM element creation + CSS | 5 |
| pulseTick() -- BPM calc + sinusoid + apply | 12 |
| Register/cleanup | 3 |
| **RAZEM** | **~20 LOC** |

Gold Solution estymuje ~15 LOC. Dodatkowe 5 LOC z powodu: (1) BPM wariant dla HITL/error, (2) cleanup function. Warto tych 5 LOC.

### Zależności

- **Zależy od:** F1 (AnimationManager) -- rejestracja jako task
- **Zależy od:** F6 (State Machine) -- stan monitora wpływa na BPM
- **Blokuje:** niczego

### Edge Cases

| Edge Case | Rozwiązanie |
|-----------|-------------|
| `prefers-reduced-motion: reduce` | AnimMgr automatycznie wyłącza (priority: 'decorative'). Pulse element opacity = 0. |
| Monitor zamknięty | `destroyPulse()` w cleanup monitora |
| FPS degradation | Jako 'decorative', pomijane gdy frame budget przekroczony |
| Wielu agentów zmienia stan jednocześnie (BPM jump) | BPM zmienia się co frame -- sinusoid naturälnie wygładza. Brak skoków bo `phaseAccum` jest ciągłe. |
| activeCount = 0 (między fazami) | BPM = 72 (idle). Puls nie znika, tylko zwalnia. |

---

## F4. HITL Decision Engine (MUST)

### Opis

System zarządzania punktami decyzyjnymi Human-in-the-Loop. 3 domyślne checkpoints (konfigurowalnie 1-5). Każdy checkpoint pauzuje symulację, wyświetla kontekstowy panel decyzyjny, czeka na odpowiedź użytkownika, loguje decyzję, wznawia symulację.

Gold Solution definiuje 3 punkty:
1. Po Strategy + Research -- "Oto plan i badania. Akceptujesz?"
2. Po Five Minds Debate #1 -- "Gold Solution. Approve/Modify/Re-debate?"
3. Final Approval -- "Gotowe. Deploy/Reject?"

### Pseudo-kod API

```javascript
// ============================================
// HITLEngine -- Decision Point Manager
// ============================================

const HITLEngine = (() => {

  // --- Konfiguracja ---
  const DEFAULT_CHECKPOINTS = [
    {
      id: 'post-research',
      afterPhases: ['strategy', 'research'],
      title: 'Plan i Badania -- Akceptacja',
      description: 'Orkiestrator przedstawił strategię. Researcher dostarczył analizę. Czy kontynuować do debaty Five Minds?',
      options: [
        { id: 'approve', label: 'Akceptuj i kontynuuj', icon: '✓', shortcut: 'A', type: 'primary' },
        { id: 'modify',  label: 'Modyfikuj plan',       icon: '✎', shortcut: 'M', type: 'secondary' },
        { id: 'reject',  label: 'Odrzuć i zacznij od nowa', icon: '✕', shortcut: 'R', type: 'danger' }
      ],
      contextBuilder: _buildResearchContext
    },
    {
      id: 'post-debate-1',
      afterPhases: ['fiveminds1'],
      title: 'Gold Solution -- Decyzja',
      description: 'Eksperci Five Minds zakończyli debatę. Syntetyk przedstawia Gold Solution.',
      options: [
        { id: 'approve',   label: 'Zatwierdź Gold Solution', icon: '✓', shortcut: 'A', type: 'primary' },
        { id: 'modify',    label: 'Zmodyfikuj rozwiązanie',  icon: '✎', shortcut: 'M', type: 'secondary' },
        { id: 're-debate',  label: 'Ponów debatę',            icon: '↻', shortcut: 'D', type: 'warning' }
      ],
      contextBuilder: _buildDebateContext
    },
    {
      id: 'final-approval',
      afterPhases: ['qa'],
      title: 'Finalna Akceptacja',
      description: 'Budowa i kontrola jakości zakończone. Gotowe do wdrożenia.',
      options: [
        { id: 'deploy',  label: 'Wdróż',              icon: '🚀', shortcut: 'A', type: 'primary' },
        { id: 'reject',  label: 'Odrzuć',             icon: '✕', shortcut: 'R', type: 'danger' },
        { id: 'review',  label: 'Przejrzyj ponownie', icon: '👁', shortcut: 'V', type: 'secondary' }
      ],
      contextBuilder: _buildFinalContext
    }
  ];

  // --- Stan ---
  let checkpoints = [...DEFAULT_CHECKPOINTS]; // kopiowalne, konfigurowalne
  let decisionLog = [];          // historia decyzji
  let currentDecision = null;    // aktualnie aktywny decision point (lub null)
  let autoApprove = false;       // domyślnie OFF (Gold Solution)
  let autoApproveTimer = 60;     // sekundy (używane tylko gdy autoApprove=true)
  let autoApproveTimeoutId = null;
  let resolveDecision = null;    // Promise resolve do odblokowania symulacji

  // --- Context Builders ---
  // Budują obiekt z danymi kontekstowymi do wyświetlenia w panelu

  function _buildResearchContext() {
    return {
      summary: getPhaseResults('strategy').concat(getPhaseResults('research')),
      agents: getAgentsByPhase(['strategy', 'research']),
      highlight: 'Kluczowe odkrycia Researchera pojawiają się poniżej.',
      expertHints: null // brak debaty na tym etapie
    };
  }

  function _buildDebateContext() {
    return {
      summary: getDebateRounds('fiveminds1'),
      agents: getAgentsByPhase(['fiveminds1']),
      highlight: 'Gold Solution jest wynikiem syntezy 5 ekspertów.',
      expertHints: getExpertStances('fiveminds1'), // pozycje ekspertów
      goldSolution: getGoldSolution('fiveminds1')
    };
  }

  function _buildFinalContext() {
    return {
      summary: getPhaseResults('build').concat(getPhaseResults('qa')),
      agents: getAgentsByPhase(['build', 'qa']),
      highlight: 'Raport QA i wyniki testów poniżej.',
      expertHints: null
    };
  }

  // --- Główny flow ---

  /**
   * Sprawdza czy po zakończeniu danej fazy należy uruchomić HITL.
   * Wywoływane przez simulation step po zmianie fazy.
   * @param {string} completedPhase - faza która właśnie się zakończyła
   * @returns {Promise<{checkpointId, decision, timestamp}>} - resolves gdy user zdecyduje
   */
  async function checkAndTrigger(completedPhase) {
    // Znajdź checkpoint który triggeruje po tej fazie
    const cp = checkpoints.find(c =>
      c.afterPhases.includes(completedPhase) &&
      !decisionLog.some(d => d.checkpointId === c.id) // nie triggeruj dwa razy
    );

    if (!cp) return null; // brak checkpointu -- kontynuuj

    // Uruchom decision flow
    return await _triggerDecision(cp);
  }

  /**
   * Wewnętrzny flow decyzyjny.
   */
  async function _triggerDecision(checkpoint) {
    currentDecision = checkpoint;

    // 1. Pre-alert (10s przed -- subtelne ostrzeżenie w HUD)
    //    W praktyce: HITL triggeruje się natychmiast po fazie,
    //    ale przyszła wersja może dodać "incoming decision" alert
    //    Tutaj: natychmiast.

    // 2. Zmień stan maszyny stanów
    StateMachine.transition('hitl-decision');

    // 3. Pauza symulacji
    AnimMgr.pause(); // pauzuj animacje (opcjonalnie: zostaw pulse w slow mode)
    // Ale: Mission Pulse przechodzi na 40 BPM -- to wymaga wyjątku
    // Rozwiązanie: AnimMgr.pause() zatrzymuje wszystko OPRÓCZ 'critical'
    // Mission Pulse rejestruje się jako 'normal', ale HITL tymczasowo go wznawia

    // 4. Buduj kontekst
    const context = checkpoint.contextBuilder();

    // 5. Renderuj panel decyzyjny
    _renderDecisionPanel(checkpoint, context);

    // 6. Focus trap na panelu
    trapFocus(document.getElementById('hitl-panel'));

    // 7. Czekaj na decyzję (Promise)
    const decision = await new Promise((resolve) => {
      resolveDecision = resolve;

      // Auto-approve timer (jeśli włączony)
      if (autoApprove) {
        autoApproveTimeoutId = setTimeout(() => {
          resolve({ optionId: 'approve', auto: true });
        }, autoApproveTimer * 1000);
      }

      // Keyboard shortcuts
      _bindDecisionKeys(checkpoint.options, resolve);
    });

    // 8. Cleanup
    if (autoApproveTimeoutId) clearTimeout(autoApproveTimeoutId);
    _unbindDecisionKeys();
    releaseFocusTrap();

    // 9. Log decyzji
    const logEntry = {
      checkpointId: checkpoint.id,
      decision: decision.optionId,
      auto: decision.auto || false,
      timestamp: Date.now(),
      simTime: getSimElapsed(),
      phase: getCurrentPhase()
    };
    decisionLog.push(logEntry);

    // 10. Feedback animation
    _animateDecisionFeedback(decision.optionId);

    // 11. Zamknij panel
    _closeDecisionPanel();

    // 12. Wznów
    currentDecision = null;
    StateMachine.transition('active');
    AnimMgr.resume();

    // 13. Narrracja w comms log
    const optionLabel = checkpoint.options.find(o => o.id === decision.optionId)?.label || decision.optionId;
    addCommsLogEntry({
      time: formatTime(getSimElapsed()),
      agent: 'System',
      text: `Decyzja HITL: ${optionLabel}${decision.auto ? ' (auto-approve)' : ''}`,
      type: 'system',
      phase: getCurrentPhase()
    });

    return logEntry;
  }

  // --- Renderowanie panelu ---

  function _renderDecisionPanel(checkpoint, context) {
    const panel = document.createElement('div');
    panel.id = 'hitl-panel';
    panel.className = 'glass-panel-elevated hitl-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', checkpoint.title);

    panel.innerHTML = `
      <div class="hitl-header">
        <span class="hitl-badge">DECISION REQUIRED</span>
        <h2>${checkpoint.title}</h2>
        <p>${checkpoint.description}</p>
      </div>
      <div class="hitl-context">
        ${context.highlight ? `<div class="hitl-highlight">${context.highlight}</div>` : ''}
        ${context.goldSolution ? `<div class="hitl-gold-solution">${_renderGoldSolution(context.goldSolution)}</div>` : ''}
        ${context.expertHints ? `<div class="hitl-experts">${_renderExpertHints(context.expertHints)}</div>` : ''}
      </div>
      <div class="hitl-actions">
        ${checkpoint.options.map(opt => `
          <button class="hitl-btn hitl-btn--${opt.type}"
                  data-option="${opt.id}"
                  title="${opt.label} (${opt.shortcut})">
            <span class="hitl-btn-icon">${opt.icon}</span>
            <span class="hitl-btn-label">${opt.label}</span>
            <kbd class="hitl-shortcut">${opt.shortcut}</kbd>
          </button>
        `).join('')}
      </div>
      <div class="hitl-skip">
        <button class="hitl-skip-btn" data-option="skip">Pomiń (Escape)</button>
      </div>
    `;

    // Event delegation na przyciskach
    panel.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-option]');
      if (btn && resolveDecision) {
        resolveDecision({ optionId: btn.dataset.option });
      }
    });

    document.getElementById('live-monitor').appendChild(panel);

    // Animacja wejścia
    requestAnimationFrame(() => {
      panel.classList.add('hitl-panel--visible');
    });
  }

  function _closeDecisionPanel() {
    const panel = document.getElementById('hitl-panel');
    if (panel) {
      panel.classList.remove('hitl-panel--visible');
      panel.addEventListener('transitionend', () => panel.remove(), { once: true });
    }
  }

  function _bindDecisionKeys(options, resolve) {
    window._hitlKeyHandler = (e) => {
      if (e.key === 'Escape') {
        resolve({ optionId: 'skip' });
        return;
      }
      const opt = options.find(o => o.shortcut.toLowerCase() === e.key.toLowerCase());
      if (opt) {
        resolve({ optionId: opt.id });
      }
    };
    window.addEventListener('keydown', window._hitlKeyHandler);
  }

  function _unbindDecisionKeys() {
    if (window._hitlKeyHandler) {
      window.removeEventListener('keydown', window._hitlKeyHandler);
      window._hitlKeyHandler = null;
    }
  }

  function _animateDecisionFeedback(optionId) {
    // Krótki burst animacja na potwierdzenie
    // approve/deploy: zielony burst
    // reject: czerwony flash
    // modify/re-debate: amber pulse
    const colors = { approve: '#34D399', deploy: '#34D399', reject: '#F87171', modify: '#FBBF24', 're-debate': '#FBBF24', skip: '#71717A', review: '#818CF8' };
    const color = colors[optionId] || '#818CF8';
    // Flash overlay 200ms
    const flash = document.createElement('div');
    flash.style.cssText = `position:fixed;inset:0;background:${color};opacity:0.15;pointer-events:none;z-index:400;transition:opacity 200ms`;
    document.getElementById('live-monitor').appendChild(flash);
    requestAnimationFrame(() => { flash.style.opacity = '0'; });
    setTimeout(() => flash.remove(), 300);
  }

  // --- Publiczne API ---
  return {
    checkAndTrigger,
    getDecisionLog: () => [...decisionLog],
    getCurrentDecision: () => currentDecision,
    isActive: () => currentDecision !== null,

    /** Konfiguracja */
    setAutoApprove(enabled, timerSeconds = 60) {
      autoApprove = enabled;
      autoApproveTimer = timerSeconds;
    },

    /** Reset (nowa sesja) */
    reset() {
      decisionLog = [];
      currentDecision = null;
      if (autoApproveTimeoutId) clearTimeout(autoApproveTimeoutId);
    },

    /** Dodaj custom checkpoint */
    addCheckpoint(checkpoint) {
      checkpoints.push(checkpoint);
    },

    /** Ustaw liczbę checkpointów (1-5) */
    setCheckpointCount(count) {
      // 1 = only final, 2 = post-debate + final, 3 = all three (default)
      // 4-5 = add Intent Preview checkpoints (non-blocking, future)
      checkpoints = DEFAULT_CHECKPOINTS.slice(0, Math.min(count, DEFAULT_CHECKPOINTS.length));
    }
  };
})();
```

### Integracja z Simulation Step

```javascript
// W głównym simulation loop (simStep):
async function simPhaseComplete(phase) {
  // ... logika zakończenia fazy ...

  // Sprawdź HITL
  const decision = await HITLEngine.checkAndTrigger(phase);

  if (decision) {
    // Obsłuż specjalne decyzje
    if (decision.decision === 'reject') {
      simStop(); // zatrzymaj symulację
      return;
    }
    if (decision.decision === 're-debate') {
      rerunPhase('fiveminds1'); // ponów debatę
      return;
    }
    // 'approve', 'deploy', 'skip', 'modify' -> kontynuuj
  }

  // Kontynuuj do następnej fazy
  advanceToNextPhase();
}
```

### CSS panelu decyzyjnego (~30 LOC CSS)

```css
.hitl-panel {
  position: fixed;
  bottom: 80px; /* nad timeline */
  left: 50%; transform: translateX(-50%) translateY(20px);
  width: min(600px, 90vw);
  padding: 24px;
  border-radius: 16px;
  opacity: 0;
  transition: opacity 300ms ease-out, transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 350;
}
.hitl-panel--visible {
  opacity: 1; transform: translateX(-50%) translateY(0);
}
.hitl-badge {
  font: 500 10px/1 'JetBrains Mono', monospace;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #F59E0B; /* gold */
  animation: beacon-human 1.5s ease-in-out infinite;
}
.hitl-actions { display: flex; gap: 12px; margin-top: 16px; }
.hitl-btn {
  flex: 1; padding: 12px 16px; border-radius: 8px;
  border: 1px solid rgba(129,140,248,0.15);
  background: rgba(15,15,24,0.6); color: var(--t1);
  cursor: pointer; transition: all 200ms;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
}
.hitl-btn--primary { border-color: rgba(52,211,153,0.4); }
.hitl-btn--primary:hover { background: rgba(52,211,153,0.15); }
.hitl-btn--danger { border-color: rgba(248,113,113,0.4); }
.hitl-btn--danger:hover { background: rgba(248,113,113,0.15); }
.hitl-btn--warning { border-color: rgba(251,191,36,0.4); }
.hitl-shortcut {
  font: 500 10px 'JetBrains Mono', monospace;
  color: var(--t2); border: 1px solid var(--t3);
  padding: 1px 4px; border-radius: 3px;
}
```

### Estymacja LOC

| Element | LOC |
|---------|-----|
| DEFAULT_CHECKPOINTS definicja | 20 |
| Context builders (3 funcje) | 15 |
| checkAndTrigger() + _triggerDecision() | 35 |
| _renderDecisionPanel() HTML | 25 |
| _closeDecisionPanel + keyboard + feedback | 20 |
| Publiczne API (setAutoApprove, reset, etc.) | 10 |
| CSS panelu | 25 |
| **RAZEM** | **~150 LOC** |

Zgodne z Gold Solution: M5 = ~150 LOC.

### Zależności

- **Zależy od:** F6 (State Machine) -- transition do 'hitl-decision'
- **Zależy od:** F1 (AnimationManager) -- pause/resume
- **Zależy od:** M6 (Comms Log) -- logowanie decyzji
- **Blokuje:** F5 (Debate Arena) -- Debate Arena jest WARIANTEM renderowania kontekstu w HITL post-debate-1

### Edge Cases

| Edge Case | Rozwiązanie |
|-----------|-------------|
| User zamyka monitor (ESC) podczas HITL | Traktuj jak 'skip' -- resolve Promise, log, wznów (lub zatrzymaj) |
| Dwa HITL triggerują jednocześnie | Niemożliwe z definicji (fazy są sekwencyjne), ale guard: `if (currentDecision) return` |
| Auto-approve timer + user klika w tym samym czasie | `clearTimeout` przy każdym resolve -- kto pierwszy, ten lepszy |
| User kliknie Escape i chce wrócić | Skip = kontynuuj z default (approve). Decision logged jako 'skip'. Brak undo. |
| Checkpoint już wywołany (re-run fazy po 're-debate') | Guard: `!decisionLog.some(d => d.checkpointId === cp.id)`. Dla re-debate: wyczyść log entry tego checkpointu. |
| Panel focus trap + keyboard shortcuts | Focus trap w obrębie panelu. Shortcut keys (A/M/R/D) nie kolidują z focus trap (to nie Tab navigation). |
| `getPhaseResults()` zwraca puste dane | Renderuj panel z "Brak danych kontekstowych" -- panel nadal działa. |
| Przejście z HITL na error (np. pamięć) | StateMachine obsługuje transition hitl-decision -> error. Panel się zamyka z decision='error'. |

---

## F5. Debate Arena Renderer (MUST -- SHOULD w Gold Solution)

### Opis

Wizualizacja debaty Five Minds w formie półkola 5 ekspertów z Gold Solution focal card. Statyczny layout, round-based pacing (3 slidy: Independent -> Cross-debate -> Synthesis). User klika "Dalej" między rundami. BEZ typing indicators, BEZ tension meter, BEZ animowanych agree/disagree linii.

Gold Solution: S1, ~200 LOC, statyczny layout z round-based pacing.

### Layout -- Półkole

```
                    [Devil's Advocate]          -- pozycja 0° (góra)
                   /                 \
        [Pragmatyk]                   [Wizjoner] -- pozycje -60° i +60°
                   \                 /
           [Krytyk]     [Syntetyk]              -- pozycje -30° i +30° (dół)
                          |
                   [GOLD SOLUTION]              -- centralny focal card
```

CSS semicircle via `transform: rotate(Xdeg) translateY(-Rpx)`:

```css
.debate-arena {
  position: relative;
  width: 100%; height: 60vh;
  display: flex; align-items: center; justify-content: center;
}
.debate-expert {
  position: absolute;
  width: 140px; height: 160px;
  /* Pozycje obliczane w JS -- 5 pozycji na półkolu */
}
.debate-gold-solution {
  position: absolute;
  bottom: 10%; left: 50%; transform: translateX(-50%);
  width: min(400px, 80vw);
  border: 2px solid #F59E0B; /* gold accent */
  border-radius: 16px;
}
```

### Pseudo-kod

```javascript
// ============================================
// DebateArena -- Five Minds Visualization
// ============================================

const DebateArena = (() => {

  // Pozycje ekspertów na półkolu (kąty w stopniach, od lewej do prawej)
  const EXPERT_POSITIONS = [
    { id: 'fm_pragmatist',       angle: -60, label: 'Pragmatyk',         color: '#34D399' },
    { id: 'fm_critic',           angle: -30, label: 'Krytyk',            color: '#F87171' },
    { id: 'fm_devils_advocate',  angle:   0, label: "Devil's Advocate",  color: '#EF4444' },
    { id: 'fm_visionary',        angle:  30, label: 'Wizjoner',          color: '#818CF8' },
    { id: 'fm_synthesizer',      angle:  60, label: 'Syntetyk',          color: '#F59E0B' }
  ];

  const ROUNDS = ['independent', 'cross-debate', 'synthesis'];
  const ROUND_TITLES = {
    independent:   'Runda 1: Niezależne Opinie',
    'cross-debate': 'Runda 2: Debata i Kontrargumenty',
    synthesis:      'Runda 3: Synteza i Gold Solution'
  };
  const ROUND_DESCRIPTIONS = {
    independent:   'Każdy ekspert przedstawia swoją niezależną opinię. Brak anchoring bias.',
    'cross-debate': 'Eksperci komentują argumenty innych. Devil\'s Advocate kontratakuje.',
    synthesis:      'Syntetyk łączy najlepsze argumenty w Gold Solution.'
  };

  let currentRound = 0;
  let arenaEl = null;
  let debateData = null; // dane debaty z symulacji

  /**
   * Otwiera Debate Arena overlay.
   * @param {object} data - {experts: [{id, stance, argument, confidence}], goldSolution: string}
   */
  function open(data) {
    debateData = data;
    currentRound = 0;

    // Twórz overlay
    arenaEl = document.createElement('div');
    arenaEl.id = 'debate-arena';
    arenaEl.className = 'glass-panel-elevated debate-arena-overlay';
    arenaEl.setAttribute('role', 'dialog');
    arenaEl.setAttribute('aria-label', 'Debata Five Minds');

    _renderRound();
    document.getElementById('live-monitor').appendChild(arenaEl);

    // Animacja wejścia
    requestAnimationFrame(() => arenaEl.classList.add('debate-arena--visible'));

    // Keyboard
    _bindKeys();
  }

  function _renderRound() {
    const round = ROUNDS[currentRound];
    const radius = Math.min(window.innerWidth * 0.3, 220); // responsive radius

    arenaEl.innerHTML = `
      <div class="debate-header">
        <h2>${ROUND_TITLES[round]}</h2>
        <p class="debate-description">${ROUND_DESCRIPTIONS[round]}</p>
        <div class="debate-round-nav">
          ${ROUNDS.map((r, i) => `
            <span class="debate-round-dot ${i === currentRound ? 'active' : ''} ${i < currentRound ? 'completed' : ''}"></span>
          `).join('')}
        </div>
      </div>

      <div class="debate-semicircle" style="--radius: ${radius}px">
        ${EXPERT_POSITIONS.map((exp, i) => {
          const expertData = debateData.experts.find(e => e.id === exp.id) || {};
          const argument = _getArgumentForRound(expertData, round);
          return `
            <div class="debate-expert"
                 style="--angle: ${exp.angle}deg; --color: ${exp.color}"
                 data-expert="${exp.id}">
              <div class="debate-expert-avatar" style="border-color: ${exp.color}">
                ${agSvg(exp.id, 32)}
              </div>
              <div class="debate-expert-name">${exp.label}</div>
              ${argument ? `
                <div class="debate-expert-bubble ${exp.id === 'fm_devils_advocate' ? 'debate-bubble--da' : ''}">
                  <p>${argument}</p>
                  ${expertData.confidence != null ? `
                    <div class="debate-confidence">
                      <div class="debate-confidence-bar" style="width:${expertData.confidence}%; background:${exp.color}"></div>
                    </div>
                  ` : ''}
                </div>
              ` : `
                <div class="debate-expert-bubble debate-bubble--waiting">
                  <p>Oczekuje na swoją turę...</p>
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>

      ${round === 'synthesis' && debateData.goldSolution ? `
        <div class="debate-gold-solution">
          <div class="debate-gold-badge">GOLD SOLUTION</div>
          <div class="debate-gold-text">${debateData.goldSolution}</div>
          ${_renderConsensusMeter()}
        </div>
      ` : ''}

      <div class="debate-controls">
        ${currentRound > 0 ? `<button class="debate-btn debate-btn--prev" onclick="DebateArena.prevRound()">← Wstecz</button>` : '<div></div>'}
        ${currentRound < ROUNDS.length - 1 ?
          `<button class="debate-btn debate-btn--next" onclick="DebateArena.nextRound()">Dalej →</button>` :
          `<button class="debate-btn debate-btn--close" onclick="DebateArena.close()">Zamknij arenę</button>`
        }
      </div>
    `;
  }

  function _getArgumentForRound(expertData, round) {
    if (!expertData.arguments) return null;
    switch (round) {
      case 'independent':   return expertData.arguments.independent || expertData.stance;
      case 'cross-debate':  return expertData.arguments.crossDebate || null;
      case 'synthesis':     return expertData.arguments.synthesis || expertData.arguments.crossDebate;
    }
    return null;
  }

  function _renderConsensusMeter() {
    if (!debateData.consensusPercent) return '';
    const pct = debateData.consensusPercent;
    const color = pct >= 80 ? '#34D399' : pct >= 50 ? '#FBBF24' : '#F87171';
    return `
      <div class="debate-consensus">
        <span class="debate-consensus-label">Konsensus:</span>
        <div class="debate-consensus-track">
          <div class="debate-consensus-fill" style="width:${pct}%; background:${color}"></div>
        </div>
        <span class="debate-consensus-pct">${pct}%</span>
      </div>
    `;
  }

  function nextRound() {
    if (currentRound < ROUNDS.length - 1) {
      currentRound++;
      _renderRound();
    }
  }

  function prevRound() {
    if (currentRound > 0) {
      currentRound--;
      _renderRound();
    }
  }

  function close() {
    if (arenaEl) {
      arenaEl.classList.remove('debate-arena--visible');
      arenaEl.addEventListener('transitionend', () => {
        arenaEl.remove();
        arenaEl = null;
      }, { once: true });
      _unbindKeys();
    }
  }

  function _bindKeys() {
    window._debateKeyHandler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextRound();
      if (e.key === 'ArrowLeft') prevRound();
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', window._debateKeyHandler);
  }

  function _unbindKeys() {
    if (window._debateKeyHandler) {
      window.removeEventListener('keydown', window._debateKeyHandler);
      window._debateKeyHandler = null;
    }
  }

  return { open, close, nextRound, prevRound };
})();
```

### CSS Debate Arena (~40 LOC)

```css
.debate-arena-overlay {
  position: fixed; inset: 5vh 5vw;
  z-index: 360; overflow-y: auto;
  display: flex; flex-direction: column; align-items: center;
  padding: 24px;
  opacity: 0; transform: scale(0.95);
  transition: opacity 400ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.debate-arena--visible { opacity: 1; transform: scale(1); }

.debate-semicircle {
  position: relative; width: 100%; height: 40vh;
  display: flex; align-items: center; justify-content: center;
}
.debate-expert {
  position: absolute;
  transform: rotate(var(--angle)) translateY(calc(-1 * var(--radius))) rotate(calc(-1 * var(--angle)));
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  max-width: 140px; text-align: center;
}
.debate-expert-avatar {
  width: 48px; height: 48px; border-radius: 50%;
  border: 2px solid var(--color); display: flex; align-items: center; justify-content: center;
  background: rgba(15,15,24,0.8);
}
.debate-expert-name { font: 600 12px 'Space Grotesk', sans-serif; color: var(--t1); }
.debate-expert-bubble {
  padding: 8px 12px; border-radius: 8px;
  background: rgba(15,15,24,0.7); border: 1px solid rgba(129,140,248,0.15);
  font: 400 11px 'Inter', sans-serif; color: var(--t1); max-width: 140px;
}
.debate-bubble--da { border-color: rgba(239,68,68,0.4); }
.debate-bubble--waiting { opacity: 0.4; font-style: italic; }

.debate-gold-solution {
  margin-top: 24px; padding: 16px 24px; border-radius: 12px;
  border: 2px solid #F59E0B; background: rgba(245,158,11,0.05);
  text-align: center; max-width: 500px;
}
.debate-gold-badge {
  font: 700 10px 'JetBrains Mono', monospace;
  text-transform: uppercase; letter-spacing: 0.1em; color: #F59E0B;
}
.debate-consensus { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.debate-consensus-track { flex: 1; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; }
.debate-consensus-fill { height: 100%; border-radius: 2px; transition: width 300ms; }

.debate-controls { display: flex; justify-content: space-between; width: 100%; margin-top: 16px; }
.debate-btn { padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(129,140,248,0.2); background: rgba(15,15,24,0.6); color: var(--t1); cursor: pointer; }
.debate-btn:hover { background: rgba(129,140,248,0.1); }
.debate-round-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--t3); display: inline-block; margin: 0 4px; }
.debate-round-dot.active { background: #F59E0B; transform: scale(1.3); }
.debate-round-dot.completed { background: #3B82F6; }
```

### Integracja z HITL

Debate Arena otwiera się w ramach HITL 'post-debate-1' jako rozszerzenie panelu kontekstowego:

```javascript
// W _buildDebateContext() z F4:
function _buildDebateContext() {
  return {
    // ... istniejące pola ...
    openDebateArena: () => DebateArena.open(getDebateData('fiveminds1'))
  };
}

// W renderDecisionPanel -- dodaj przycisk "Zobacz debatę":
// <button onclick="ctx.openDebateArena()">Zobacz pełną debatę</button>
```

### Estymacja LOC

| Element | LOC |
|---------|-----|
| EXPERT_POSITIONS + ROUNDS + constants | 15 |
| open() + _renderRound() | 50 |
| _getArgumentForRound + _renderConsensusMeter | 15 |
| nextRound/prevRound/close | 10 |
| Keyboard binding | 10 |
| CSS (semicircle + expert cards + gold solution) | 55 |
| Integracja z HITL | 5 |
| Dane debaty generowane przez symulację | 40 |
| **RAZEM** | **~200 LOC** |

Zgodne z Gold Solution: S1 = ~200 LOC.

### Zależności

- **Zależy od:** F4 (HITL Decision Engine) -- Arena otwiera się w ramach HITL post-debate-1
- **Zależy od:** Dane symulacji -- predefiniowane argumenty ekspertów per runda
- **Blokuje:** niczego (overlay, niezależny od reszty UI)

### Edge Cases

| Edge Case | Rozwiązanie |
|-----------|-------------|
| Brak danych dla eksperta w danej rundzie | Bubble "Oczekuje na swoją turę..." (dimmed) |
| Viewport < 768px szerokości | Radius dynamicznie zmniejszany: `Math.min(window.innerWidth * 0.3, 220)` |
| User kliknie Escape w Debate Arena, ale HITL jest pod spodem | Arena close -> focus wraca do HITL panel (focus trap chain) |
| Przeglądarka nie wspiera CSS custom properties | Impossible w target browsers. |
| Expert bubbles nachodzą na siebie (mały viewport) | `max-width: 140px` + responsive radius. Worst case: scroll. |
| Re-debate (user wybrał w HITL) | Arena zamyka się, HITL loguje 're-debate', symulacja re-runs fiveminds1, Arena otwiera się ponownie z nowymi danymi. `currentRound = 0` reset. |
| Consensus 0% | Czerwony pasek na 0%. Brak crashy. |

---

## F6. State Machine (MUST)

### Opis

Centralna maszyna stanów Live Monitor zarządzająca trybami pracy. 7 stanów z walidowanymi przejściami. Event-driven -- komponenty reagują na zmiany stanu bez bezpośredniego couplingu.

### Diagram stanów

```
                         openMonitor()
                              |
                              v
  +--------+  enter   +-----------+  loaded   +--------+
  | closed | -------> | entering  | --------> | active |
  +--------+          +-----------+            +--------+
      ^                                       /  |   |  \
      |                                      /   |   |   \
      |  exit completed               pause /    |   |    \ hitl trigger
      |                                    /     |   |     \
      |                         +---------+      |   |     +----------------+
      +------------------------ | exiting | <----+   |     | hitl-decision  |
      |                         +---------+  exit|   |     +----------------+
      |                                          |   |            |
      |                         +---------+      |   |            | decision made
      +------------------------ | paused  | <----+   |            |
                                +---------+   pause  |            v
                                    |                |         +--------+
                                    |  resume        |         | active | (powrót)
                                    +--------------->|         +--------+
                                                     |
                                              debate |
                                              trigger|
                                                     v
                                               +---------+
                                               | debate  |
                                               +---------+
                                                     |
                                              close  |
                                                     v
                                               +--------+
                                               | active | (powrót) lub hitl-decision
                                               +--------+
```

### Tabela przejść

| Z stanu | Do stanu | Trigger | Warunek |
|---------|----------|---------|---------|
| `closed` | `entering` | `openMonitor()` | monitor DOM nie istnieje lub hidden |
| `entering` | `active` | transition complete | animacja wejścia zakończona |
| `active` | `paused` | user pause (Space) | symulacja biegnie |
| `active` | `hitl-decision` | HITL checkpoint | `HITLEngine.checkAndTrigger` |
| `active` | `debate` | debate phase start | faza = fiveminds1 lub fiveminds2 |
| `active` | `exiting` | user ESC/M | — |
| `paused` | `active` | user resume (Space) | — |
| `paused` | `exiting` | user ESC/M | — |
| `hitl-decision` | `active` | decision made | `resolveDecision()` |
| `hitl-decision` | `exiting` | user force-close | decision auto-skipped |
| `debate` | `active` | debate close | `DebateArena.close()` |
| `debate` | `hitl-decision` | debate -> HITL | post-debate checkpoint |
| `exiting` | `closed` | exit animation complete | — |

### Pseudo-kod

```javascript
// ============================================
// StateMachine -- Live Monitor State Manager
// ============================================

const StateMachine = (() => {

  // Stan
  let currentState = 'closed';
  const listeners = new Map(); // event -> Set<callback>

  // Definicja walidnych przejść
  const TRANSITIONS = {
    closed:          ['entering'],
    entering:        ['active'],
    active:          ['paused', 'hitl-decision', 'debate', 'exiting'],
    paused:          ['active', 'exiting'],
    'hitl-decision': ['active', 'exiting'],
    debate:          ['active', 'hitl-decision'],
    exiting:         ['closed']
  };

  // Akcje wejścia per stan (side effects)
  const ENTER_ACTIONS = {
    entering: () => {
      _initMonitorDOM();
      _playEntryAnimation();
    },
    active: () => {
      AnimMgr.resume();
      _updateHUD();
    },
    paused: () => {
      AnimMgr.pause();
      _showPauseOverlay();
    },
    'hitl-decision': () => {
      // AnimMgr: pause decorative, keep pulse at slow BPM
      // Handled by HITLEngine._triggerDecision
    },
    debate: () => {
      // Debate Arena opened by DebateArena.open()
    },
    exiting: () => {
      _playExitAnimation();
    },
    closed: () => {
      _destroyMonitorDOM();
      AnimMgr.pause();
    }
  };

  // Akcje wyjścia per stan (cleanup)
  const EXIT_ACTIONS = {
    paused: () => {
      _hidePauseOverlay();
    },
    'hitl-decision': () => {
      // Panel cleanup handled by HITLEngine
    },
    debate: () => {
      // Arena cleanup handled by DebateArena.close()
    }
  };

  /**
   * Próba przejścia do nowego stanu.
   * @param {string} newState
   * @returns {boolean} true jeśli przejście się powiodło
   */
  function transition(newState) {
    const allowed = TRANSITIONS[currentState];
    if (!allowed || !allowed.includes(newState)) {
      console.warn(`[StateMachine] Invalid transition: ${currentState} -> ${newState}`);
      return false;
    }

    const prevState = currentState;

    // 1. Exit actions starego stanu
    if (EXIT_ACTIONS[prevState]) EXIT_ACTIONS[prevState]();

    // 2. Zmiana stanu
    currentState = newState;

    // 3. Enter actions nowego stanu
    if (ENTER_ACTIONS[newState]) ENTER_ACTIONS[newState]();

    // 4. Emituj event
    _emit('transition', { from: prevState, to: newState });
    _emit(`enter:${newState}`, { from: prevState });
    _emit(`exit:${prevState}`, { to: newState });

    // 5. Update data-attribute na monitorze (CSS hooks)
    const monitorEl = document.getElementById('live-monitor');
    if (monitorEl) monitorEl.dataset.monitorState = newState;

    return true;
  }

  /**
   * Rejestruje listener na event.
   * Events: 'transition', 'enter:<state>', 'exit:<state>'
   */
  function on(event, callback) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(callback);
    return () => listeners.get(event)?.delete(callback); // unsubscribe function
  }

  function _emit(event, data) {
    const cbs = listeners.get(event);
    if (cbs) cbs.forEach(cb => {
      try { cb(data); } catch (e) { console.warn(`[StateMachine] Listener error on ${event}:`, e); }
    });
  }

  // --- Publiczne API ---
  return {
    transition,
    on,
    get current() { return currentState; },
    is(state) { return currentState === state; },
    canTransitionTo(state) {
      return (TRANSITIONS[currentState] || []).includes(state);
    },
    reset() {
      currentState = 'closed';
      listeners.clear();
    }
  };
})();
```

### Użycie przez inne komponenty

```javascript
// Otwarcie monitora:
StateMachine.transition('entering');
// Po animacji:
StateMachine.transition('active');

// User naciska Space:
if (StateMachine.is('active')) StateMachine.transition('paused');
else if (StateMachine.is('paused')) StateMachine.transition('active');

// HITL:
StateMachine.transition('hitl-decision');
// Po decyzji:
StateMachine.transition('active');

// Zamknięcie:
StateMachine.transition('exiting');
// Po animacji:
StateMachine.transition('closed');

// Nasłuchiwanie zmian:
StateMachine.on('enter:paused', () => {
  // Update HUD: pokaż "PAUSED" badge
});

StateMachine.on('transition', ({ from, to }) => {
  console.log(`Monitor: ${from} -> ${to}`);
});

// CSS hooks via data-attribute:
// #live-monitor[data-monitor-state="paused"] .hud-status { ... }
// #live-monitor[data-monitor-state="hitl-decision"] .hitl-glow { ... }
```

### Estymacja LOC

| Element | LOC |
|---------|-----|
| TRANSITIONS definicja | 8 |
| ENTER_ACTIONS + EXIT_ACTIONS | 20 |
| transition() z walidacją | 15 |
| Event system (on, _emit) | 12 |
| Publiczne API (is, canTransitionTo, reset) | 5 |
| CSS data-attribute hooks | 15 |
| Integracja z keyboard (M, ESC, Space) | 15 |
| **RAZEM** | **~90 LOC** |

### Zależności

- **Zależy od:** F1 (AnimationManager) -- pause/resume w akcjach stanów
- **Blokuje:** F4 (HITL Engine) -- używa `StateMachine.transition('hitl-decision')`
- **Blokuje:** F5 (Debate Arena) -- stan 'debate'
- **Blokuje:** F3 (Mission Pulse) -- BPM zależy od stanu

### Edge Cases

| Edge Case | Rozwiązanie |
|-----------|-------------|
| Wielokrotne `transition()` w jednej klatce | Każde transition jest synchroniczne i atomowe. Drugie transition widzi NOWY stan. |
| Niewalidne przejście (np. closed -> active) | `console.warn` + return false. Bez efektów ubocznych. |
| Listener rzuca wyjątek | `try/catch` per listener. Jeden zepsuty listener nie blokuje reszty. |
| Force close podczas entering (animacja trwa) | `exiting` nie jest dozwolone z `entering`. Rozwiązanie: cancelAnimationFrame w _playEntryAnimation i natychmiast `entering -> active -> exiting`. |
| Reset podczas aktywnej sesji | `reset()` ustawia `closed`, czyści listenerów. Caller odpowiada za cleanup DOM. |
| Browser tab hidden w stanie 'active' | `visibilitychange` w AnimMgr pauzuje animacje. StateMachine zostaje w 'active' (state != animation state). |

---

## F7. Connection Animator (SHOULD)

### Opis

Ulepszony system animacji połączeń w trybie Live Monitor. Większe particles w fullscreen, kolor particles dostosowany do koloru fazy, aktywne connections z glow i szybszymi particles, "data burst" animation przy zakończeniu transmisji.

Rozszerzenie istniejącego particle system z v14/v21 (`animateDataPackets`), nie nowy system.

### Pseudo-kod

```javascript
// ============================================
// ConnectionAnimator -- Enhanced for Live Monitor
// ============================================

const ConnectionAnimator = (() => {

  // Konfiguracja per tryb
  const CONFIG = {
    canvas: {
      // Istniejące wartości z v21
      particleSize: 3,
      particleSpeed: 1.5,
      glowRadius: 0,
      burstOnArrival: false
    },
    monitor: {
      // Ulepszone dla fullscreen
      particleSize: 5,         // większe -- widoczne na dużym ekranie
      particleSpeed: 2.5,      // szybsze -- dynamika
      glowRadius: 8,           // glow wokół aktywnych connections
      burstOnArrival: true,    // "data burst" po dotarciu
      burstParticles: 4,       // ile mikro-cząsteczek w burst
      burstTTL: 300            // ms życia burst particles
    }
  };

  // Kolory per faza (z design system)
  const PHASE_COLORS = {
    strategy:   '#818CF8', // indigo
    research:   '#06B6D4', // cyan
    fiveminds1: '#F59E0B', // gold
    build:      '#34D399', // emerald
    fiveminds2: '#F59E0B', // gold
    qa:         '#F87171'  // red
  };

  let mode = 'canvas'; // 'canvas' | 'monitor'
  let particles = [];  // aktywne particles
  const MAX_PARTICLES = 80; // performance budget

  /**
   * Tworzy particle na danym connection.
   * @param {object} conn - {from, to, svgPath, active}
   * @param {string} phase - aktualna faza
   */
  function spawnParticle(conn, phase) {
    if (particles.length >= MAX_PARTICLES) return; // budget exceeded

    const cfg = CONFIG[mode];
    const color = PHASE_COLORS[phase] || '#818CF8';

    particles.push({
      connId: conn.id,
      progress: 0,          // 0..1 (start..end)
      speed: cfg.particleSpeed + Math.random() * 0.5, // lekka randomizacja
      size: cfg.particleSize,
      color: color,
      opacity: 1,
      glow: cfg.glowRadius,
      alive: true
    });
  }

  /**
   * Tick -- wywoływany przez AnimMgr.
   * Aktualizuje pozycje particles, renderuje na SVG/Canvas.
   */
  function tick(currentTime, dt) {
    const cfg = CONFIG[mode];
    const dtSec = dt / 1000;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      // Przesuwaj particle wzdłuż connection
      p.progress += p.speed * dtSec * 0.5; // 0.5 = normalizacja do ~2s podróży

      if (p.progress >= 1) {
        // Dotarło do celu
        if (cfg.burstOnArrival) {
          _spawnBurst(p);
        }
        p.alive = false;
      }

      // Usuwaj martwe
      if (!p.alive) {
        particles.splice(i, 1);
      }
    }

    // Renderuj
    _render();
  }

  /**
   * Data burst -- mikro-cząsteczki rozlatujące się od celu.
   */
  function _spawnBurst(parent) {
    const cfg = CONFIG[mode];
    for (let i = 0; i < cfg.burstParticles; i++) {
      const angle = (Math.PI * 2 / cfg.burstParticles) * i;
      particles.push({
        connId: parent.connId,
        progress: 1, // na pozycji celu
        speed: 0,    // nie porusza się po ścieżce
        size: parent.size * 0.5,
        color: parent.color,
        opacity: 1,
        glow: 0,
        alive: true,
        // Burst-specific
        isBurst: true,
        burstVx: Math.cos(angle) * 40,
        burstVy: Math.sin(angle) * 40,
        burstX: 0, burstY: 0,
        ttl: cfg.burstTTL,
        age: 0
      });
    }
  }

  function _render() {
    // Renderowanie zależy od mode:
    // 'canvas' -> istniejący Canvas 2D
    // 'monitor' -> SVG circles na #monitor-connections SVG
    // Tutaj: abstrakcja -- wywołaj odpowiedni renderer

    if (mode === 'monitor') {
      _renderSVG();
    } else {
      _renderCanvas();
    }
  }

  function _renderSVG() {
    // Pobierz SVG container monitora
    const svg = document.getElementById('monitor-connections');
    if (!svg) return;

    // Wyczyść stare particles (reuse DOM pool)
    // ... (implementacja DOM pooling dla performance)

    for (const p of particles) {
      if (p.isBurst) {
        // Burst: pozycja = endpoint + offset
        // Aktualizuj burstX/Y, zmniejsz opacity
        p.age += 16; // approx 1 frame
        p.opacity = Math.max(0, 1 - p.age / p.ttl);
        if (p.age > p.ttl) p.alive = false;
      }

      // Oblicz pozycję na ścieżce SVG
      const conn = getConnectionById(p.connId);
      if (!conn) { p.alive = false; continue; }
      const point = conn.svgPath.getPointAtLength(p.progress * conn.svgPath.getTotalLength());

      const x = p.isBurst ? point.x + p.burstX * (p.age / p.ttl) : point.x;
      const y = p.isBurst ? point.y + p.burstY * (p.age / p.ttl) : point.y;

      // Renderuj jako SVG circle (DOM pool)
      _renderParticleCircle(x, y, p.size, p.color, p.opacity, p.glow);
    }
  }

  // Glow filter na aktywnych connections
  function _updateConnectionGlow(activeConnections, phase) {
    const color = PHASE_COLORS[phase] || '#818CF8';
    activeConnections.forEach(conn => {
      conn.element.style.filter = `drop-shadow(0 0 ${CONFIG[mode].glowRadius}px ${color})`;
      conn.element.style.stroke = color;
      conn.element.style.strokeWidth = mode === 'monitor' ? '2.5' : '1.5';
    });
  }

  function setMode(m) { mode = m; }
  function clear() { particles = []; }

  return {
    spawnParticle,
    tick,
    setMode,
    clear,
    _updateConnectionGlow // publiczne dla phase change handler
  };
})();

// Rejestracja w AnimMgr:
// AnimMgr.register('connection-particles', ConnectionAnimator.tick, 'normal');
```

### Estymacja LOC

| Element | LOC |
|---------|-----|
| CONFIG obiekt (canvas + monitor) | 10 |
| PHASE_COLORS | 3 |
| spawnParticle() | 8 |
| tick() z delta-time | 12 |
| _spawnBurst() | 8 |
| _renderSVG() z DOM pooling | 12 |
| _updateConnectionGlow() | 5 |
| setMode/clear/register | 2 |
| **RAZEM** | **~60 LOC** |

### Zależności

- **Zależy od:** F1 (AnimationManager) -- rejestracja jako 'normal' task
- **Zależy od:** Istniejący SVG connection system z v21 (`rConn()`, `#svg`)
- **Blokuje:** niczego

### Edge Cases

| Edge Case | Rozwiązanie |
|-----------|-------------|
| > 80 particles jednocześnie | Nowe particles nie spawnują się (budget cap). Istniejące kontynuują. |
| Connection usunięty podczas particle flight | `getConnectionById` zwraca null -> `p.alive = false` |
| SVG path nie ma `getPointAtLength` | Fallback: linia prosta od source do target |
| Przejście z monitor do canvas mode | `clear()` + `setMode('canvas')` -- particles resetowane |
| `prefers-reduced-motion` | Particle speed = 0, brak burst. Static dots na midpoint connections. |
| Phase change mid-flight | Istniejące particles zachowują stary kolor. Nowe particles mają nowy kolor. Naturalny gradient. |

---

## F8. Compact Mode (SHOULD)

### Opis

Alternatywny layout Live Monitor dla ekranów < 1280px szerokości. Redukuje layout z multi-column bento grid na single-column stacked view. Comms log staje się collapsible bottom sheet zamiast stałego prawego panelu. Phase timeline kompresuje się.

Cel: laptopy 13" (1366x768 = 22% desktopów wg StatCounter). Gold Solution klasyfikuje jako SHOULD (v22 jeśli czas, v22.1 jeśli nie).

### Pseudo-kod

```javascript
// ============================================
// CompactMode -- Responsive Monitor Layout
// ============================================

const CompactMode = (() => {

  let isCompact = false;
  let mediaQuery = null;

  function init() {
    mediaQuery = window.matchMedia('(max-width: 1279px)');
    isCompact = mediaQuery.matches;

    mediaQuery.addEventListener('change', (e) => {
      isCompact = e.matches;
      _applyMode();
    });

    _applyMode();
  }

  function _applyMode() {
    const monitor = document.getElementById('live-monitor');
    if (!monitor) return;

    if (isCompact) {
      monitor.classList.add('monitor--compact');
    } else {
      monitor.classList.remove('monitor--compact');
    }
  }

  /** Ręczny toggle (przycisk w HUD) */
  function toggle() {
    isCompact = !isCompact;
    _applyMode();
  }

  function destroy() {
    // Cleanup nie potrzebny -- mediaQuery GC'd z listenerem
  }

  return { init, toggle, get isCompact() { return isCompact; } };
})();
```

### CSS Compact Mode (~40 LOC)

```css
/* ============================================
   Compact Mode -- ekrany < 1280px
   ============================================ */

.monitor--compact .monitor-grid {
  /* Zamiast multi-column bento -> single column stack */
  grid-template-columns: 1fr;
  gap: 8px;
}

.monitor--compact .monitor-comms-log {
  /* Prawy panel -> bottom sheet */
  position: fixed;
  bottom: 60px; /* nad timeline */
  left: 0; right: 0;
  width: 100%;
  max-height: 30vh;
  overflow-y: auto;
  border-radius: 12px 12px 0 0;
  transform: translateY(calc(100% - 40px)); /* domyślnie: tylko header widoczny */
  transition: transform 300ms ease-out;
}

.monitor--compact .monitor-comms-log.expanded {
  transform: translateY(0);
}

.monitor--compact .monitor-comms-log-header {
  /* Swipe handle / click to expand */
  cursor: pointer;
  padding: 8px 16px;
  text-align: center;
}

.monitor--compact .hud-topbar {
  /* Kompresja topbar */
  font-size: 11px;
  padding: 4px 8px;
  height: 36px; /* z 46px */
}

.monitor--compact .hud-topbar .hud-section--timer,
.monitor--compact .hud-topbar .hud-section--agents {
  /* Ukryj mniej ważne sekcje */
  display: none;
}

.monitor--compact .phase-timeline {
  /* Mniejszy timeline */
  height: 40px; /* z 60px */
  font-size: 10px;
}

.monitor--compact .phase-container {
  /* Fazy jako collapsible rows zamiast gridu */
  flex-direction: column;
}

.monitor--compact .phase-container--completed {
  /* Ukończone fazy: tylko header z summary */
  max-height: 32px;
  overflow: hidden;
}

.monitor--compact .agent-card {
  /* Mniejsze karty agentów */
  width: 100px; /* z 160px */
  height: 60px; /* z 90px */
  font-size: 10px;
}

.monitor--compact .debate-arena-overlay {
  /* Debate Arena: full viewport */
  inset: 0;
}

.monitor--compact .debate-semicircle {
  /* Zamiast półkola: vertical stack */
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: auto;
}

.monitor--compact .debate-expert {
  /* Reset semicircle positioning */
  position: static;
  transform: none;
  flex-direction: row;
  max-width: 100%;
}
```

### Estymacja LOC

| Element | LOC |
|---------|-----|
| CompactMode JS (init, toggle, mediaQuery) | 10 |
| CSS compact overrides | 40 |
| **RAZEM** | **~50 LOC** |

### Zależności

- **Zależy od:** Core monitor layout (M1, M4, M6) -- override CSS
- **Blokuje:** niczego (pure CSS enhancement)

### Edge Cases

| Edge Case | Rozwiązanie |
|-----------|-------------|
| User resizuje okno z 1280 do 1200 podczas sesji | MediaQuery listener automatycznie przełącza mode. CSS transition wygładza zmianę. |
| Debate Arena w compact mode | Semicircle staje się vertical stack. Touch-friendly. |
| HITL panel w compact mode | Panel full-width (zamiast centered 600px). Przyciski większe. |
| Comms log bottom sheet + HITL panel | Comms log automatycznie collapse gdy HITL visible (z-index management). |
| Phase timeline z 6 fazami na 320px | Fazy skrócone do ikon (bez tekstu). Tooltip z pełną nazwą. |
| User wymusza compact na dużym ekranie (toggle) | Ręczny toggle nadpisuje mediaQuery. `isCompact` state odzwierciedla. |

---

## Podsumowanie Zależności (Dependency Graph)

```
F1. AnimationManager (Phase 0)
  ├── F3. Mission Pulse       (depends on F1)
  ├── F7. Connection Animator (depends on F1)
  └── F6. State Machine       (depends on F1)
        ├── F4. HITL Engine   (depends on F6, F1)
        │     └── F5. Debate Arena (depends on F4)
        └── F3. Mission Pulse (depends on F6 for BPM)

F2. Narrative Templates       (depends on M6 Comms Log)
F8. Compact Mode              (depends on core layout)
```

### Rekomendowana kolejność implementacji

| Kolejność | Feature | Uzasadnienie |
|-----------|---------|--------------|
| 1 | F1. AnimationManager | Phase 0 prerequisite. Blokuje WSZYSTKO. |
| 2 | F6. State Machine | Phase 1. Blokuje HITL i Debate Arena. |
| 3 | F4. HITL Decision Engine | Phase 2. Core interakcja z userem. |
| 4 | F2. Narrative Templates | Phase 2. Niezależne, szybkie do dodania. |
| 5 | F5. Debate Arena Renderer | Phase 3. Zależy od F4. USP feature. |
| 6 | F3. Mission Pulse | Phase 3. 20 LOC, zero ryzyka. |
| 7 | F7. Connection Animator | Phase 3. Enhancement istniejącego systemu. |
| 8 | F8. Compact Mode | Phase 3+. Pure CSS, dodawane na końcu. |

---

## Performance Contract Compliance

Sprawdzenie zgodności z Performance Contract z Gold Solution:

| Metryka | Target | Wpływ tych features | Status |
|---------|--------|---------------------|--------|
| FPS desktop | >= 55 FPS | F1 POPRAWIA (jeden loop zamiast wielu). F3 + F7 dodają obciążenie (~2ms/frame). | OK |
| rAF callback time | < 10ms | F1 frame budget enforcement (14ms cap, skip decorative). | OK |
| Max animowanych elementów | <= 80 | F7: MAX_PARTICLES = 80. F3: 1 element. F5: 5 expert cards (statyczne). | OK |
| DOM node count | < 1500 | F5 Debate Arena: ~30 nodes (overlay). F4 HITL: ~20 nodes. F8: 0 nowych. | OK |
| Jednoczesne backdrop-filter | <= 3 | F4 HITL panel: 1 (glass-panel-elevated). F5 Debate Arena: 1. Max jednocześnie: 1 (nigdy oba naraz). | OK |
| LOC | < 5000 | ~695 LOC z tych features. v21 = 3046 LOC. Po audycie -200 LOC + core monitor ~1020 LOC = ~4561 LOC. | OK (w budżecie) |
| Memory | < 150 MB active | Narrative Templates: ~2 KB danych. Particles: ~80 * 48 bytes = ~3.8 KB. Minimal impact. | OK |

### Degradation Strategy

Jeśli FPS < 45 na mid-range:
1. F1 automatycznie wyłącza `decorative` tasks (F3 Mission Pulse znika)
2. F7 Connection Animator: reduce MAX_PARTICLES do 20
3. F5 Debate Arena: brak animacji wejścia (instant)
4. F8 Compact Mode: automatycznie aktywowany na słabych maszynach (heurystyka: jeśli FPS < 40 przez 5s)

---

*Raport przygotowany przez Feature Dev [OPUS] w ramach Deep Five Minds Protocol, faza BUILD.*
*Specyfikacja gotowa do implementacji. Każda feature ma pseudo-kod wystarczający do bezpośredniego kodowania.*
*Łączny LOC: ~695. Łączny czas: 3-4 sesje implementacji.*
*Data: 4 kwietnia 2026*
