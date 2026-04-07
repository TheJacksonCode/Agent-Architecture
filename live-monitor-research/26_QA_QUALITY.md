# QA Quality -- Audyt Jakosci
## Live Monitor Mode Specyfikacja v22

**Autor:** QA Quality [OPUS] | Deep Five Minds Protocol -- faza QA
**Data:** 2026-04-04
**Zrodla:** 24_GOLD_SOLUTION_2.md (primary), 13_GOLD_SOLUTION.md, 14_DESIGNER.md, 18_INTEGRATOR.md
**Cel:** Walidacja jakosci specyfikacji -- czy developer moze zakodowac BEZ PYTAN

---

### Summary

| Severity | Count |
|----------|-------|
| **CRITICAL** | 3 |
| **HIGH** | 8 |
| **MEDIUM** | 12 |
| **LOW** | 7 |
| **TOTAL** | 30 |

---

### Findings

---

#### [QUA-001] consistency | CRITICAL
- **Lokalizacja**: GS#2 sekcja "Unified HTML Structure" vs 14_DESIGNER.md sekcja 2.2 vs GS#2 "Unified Data Model"
- **Opis**: HITL agent state name jest NIESPOJNY miedzy dokumentami. GS#2 explicite decyduje `data-state="hitl"` (sekcja B, wiersz "Agent state name"), a Unified Data Model uzywa `status: 'hitl'` i `STATUS_VIS` ma klucz `hitl`. ALE Designer (14_DESIGNER.md linia 222, 470-498) nadal uzywa `data-state="waiting-for-human"` we WSZYSTKICH selektorach CSS (`.lm-agent[data-state="waiting-for-human"]`, `.lm-agent[data-state="waiting-for-human"]::before`). Developer czytajacy TYLKO GS#2 uzyje `hitl`, ale jesli siega po Designer CSS -- znajdzie `waiting-for-human`. To jest 1:1 selektor mismatch ktory spowoduje ze styl HITL nie zadziala.
- **Sugestia**: GS#2 powinien explicite zawierac pelny blok CSS dla `.lm-agent[data-state="hitl"]` albo dodac note: "UWAGA: CSS z 14_DESIGNER.md nalezy zaktualizowac -- zamien `waiting-for-human` na `hitl` we WSZYSTKICH selektorach." Obecnie GS#2 mowi "Developer: czytaj TEN dokument" ale nie zawiera gotowego CSS dla stanow -- odwoluje sie do Designera implicytnie.

---

#### [QUA-002] completeness | CRITICAL
- **Lokalizacja**: GS#2 sekcja "Unified HTML Structure" + calosciowo
- **Opis**: GS#2 NIE zawiera kompletnego CSS Live Monitor. Dostarcza: 14 CSS custom properties, 6 phase color selektorow, 17 animacji (nazwy + parametry), reduced-motion blanket, kilka data-state selektorow w STATUS_VIS. Ale BRAKUJE: kompletnych selektorow dla komponentow (topbar layout, comms log panel, agent grid, timeline pills, HITL panel, Debate Arena). Developer MUSI siegac po 14_DESIGNER.md po CSS -- wbrew instrukcji "czytaj TEN dokument, nie BUILD specs." To jest fundamentalna luka -- developer BEZ pytan nie moze zakodowac layoutu komponentow z samego GS#2.
- **Sugestia**: Albo (a) wciagnac kluczowe CSS selektory z Designera do GS#2, albo (b) explicite napisac: "CSS komponentow: uzyj 14_DESIGNER.md sekcje 3.1-3.7 z nastepujacymi korektami: [lista]". Obecna instrukcja "nie szukaj w BUILD specs -- tam sa sprzecznosci" jest SPRZECZNA z tym ze GS#2 nie ma kompletnego CSS.

---

#### [QUA-003] edge-case | CRITICAL
- **Lokalizacja**: GS#2 sekcja "Data Flow Diagram" 5.1 + 18_INTEGRATOR.md sekcja 5.2
- **Opis**: Brak specyfikacji HITL timeout/deadlock. Jesli user otwiera HITL decision panel, symulacja jest PAUSED (clearTimeout(simTimer)). Ale co jesli user NIGDY nie podejmie decyzji? Spec mowi "Timer auto-approve WYLACZONY domyslnie" (GS#1 Q2), ale nie definiuje ZADNEGO mechanizmu wyjscia z deadlock. User moze: (a) zamknac przegladarke, (b) zostawic tab otwarty na godziny, (c) przejsc do innego taba. W kazdym przypadku symulacja zostaje w limbo na zawsze. Nie ma setInterval ktory by czytalby state i informowal usera. Nie ma localStorage persistence stanu HITL.
- **Sugestia**: Dodac: (1) Escape z HITL = 'approve' (JUZ jest w GS#2 sekcja C -- DOBRZE), (2) `visibilitychange` handler: jesli tab staje sie niewidoczny z `lmDecisionPending=true`, auto-approve po 30s niewidocznosci LUB przynajmniej log do SESSION_EVENTS. (3) Przy ponownym otwarciu monitora po zamknieciu przegladarki: stan jest utracony (simTimer wyczyszczony) -- to OK, ale brakuje explicit note ze state NIE przetrwa reload.

---

#### [QUA-004] consistency | HIGH
- **Lokalizacja**: GS#2 "Unified HTML Structure" vs 14_DESIGNER.md sekcja 1.5 vs GS#2 "FINAL Feature List"
- **Opis**: Agent card wymiary sa NIESPOJNE:
  - GS#2 sekcja B: `--lm-card-w: 160px` i `--lm-agent-card-h: 92px` (kompromis)
  - GS#2 HTML: karty w grid `minmax(160px, 1fr)` -- brak explicit height
  - Designer sekcja 1.5: `160x96px` (ASCII), potem sekcja 3.1: `min-height: 92px`
  - GS#1: `160x90px`
  - Developer ma 3 rozne wartosci (90, 92, 96) dla wysokosci. GS#2 ustawia 92px jako kompromis, ale nie zmienia wartosci Designera (96px w ASCII, 92 w CSS).
- **Sugestia**: Ujednolicic do 92px (GS#2 decyzja) i dodac note ze ASCII z Designera to przyblizenie.

---

#### [QUA-005] completeness | HIGH
- **Lokalizacja**: GS#2 sekcja "Unified Data Model" -- `lmRender()` / `lmRenderPartial(section)`
- **Opis**: GS#2 mowi "po kazdej zmianie LM wolaj lmRender() lub lmRenderPartial(section)" ale NIGDZIE nie definiuje tych funkcji. Nie ma pseudo-kodu, nie ma sygnatury, nie ma listy `section` parametrow. Integrator definiuje `lmBuildGrid()`, `lmUpdateAgent()`, `lmUpdateTimeline()`, `lmUpdateHUD()`, `lmAddCommsMsg()` -- ale GS#2 nie laczy tych z `lmRender()`. Developer nie wie czy `lmRender()` = wola wszystkie 5 funkcji, czy jest nowa wrapper function.
- **Sugestia**: Albo (a) wyrzucic `lmRender()`/`lmRenderPartial()` i powiedziec explicite: "po zmianie `LM.agents[x].status` wolaj `lmUpdateAgent(x, status)`", albo (b) zdefiniowac `lmRender()` jako: `function lmRender() { lmBuildGrid(); lmUpdateTimeline(); lmUpdateHUD(); }`. Obecnie to jest luka ktora developer bedzie musial sam wypelnic.

---

#### [QUA-006] edge-case | HIGH
- **Lokalizacja**: GS#2 brak -- 18_INTEGRATOR.md sekcja 7.1 F1
- **Opis**: Co sie dzieje gdy user otwiera Live Monitor z PUSTYM canvasem (0 agentow)? Integrator (F1) mowi: `Toast "Dodaj agentow!" -- monitor NIE otwiera sie`. Ale GS#2 NIE zawiera tej logiki. `lmOpen()` w GS#2 Data Flow (5.1) od razu robi `lmBuildGrid()` ktore czyta `nodes` -- jesli `nodes.length === 0`, grid bedzie pusty, timeline pusta, HUD pokaze "0/0". Brak guard clause.
- **Sugestia**: Dodac do GS#2 w `lmOpen()`: `if (!nodes.length) { showToast('Dodaj agentow na canvas!'); return; }`. To 1 linia, ale bez niej user widzi pusty monitor.

---

#### [QUA-007] edge-case | HIGH
- **Lokalizacja**: GS#2 brak
- **Opis**: User zmienia preset W TRAKCIE dzialania Live Monitor. GS#2 (krok 2.12) mowi "Preset change detection w lmOpen()" (+5 LOC) -- ale to sprawdza preset tylko przy OTWIERANIU monitora. Jesli user zamknie monitor, zmieni preset (ldPr()), otworzy monitor ponownie -- to zadziala (lastPreset !== actPr). Ale jesli user zmieni preset PRZEZ keyboard shortcut lub inny mechanizm PODCZAS gdy monitor jest otwarty -- grid pokaze starych agentow, a canvas ma nowych. Nie ma event listenera na zmiane presetu.
- **Sugestia**: Dodac listener na `ldPr()` (lub guard w `lmBuildGrid()`) ktory sprawdza `actPr !== LM.lastPreset`. Jesli zmiana: `lmClose(); lmDestroy(); showToast('Preset zmieniony. Otworz monitor ponownie.');`. Alternatywnie: zablokuj zmiane presetu gdy monitor otwarty (prostsze).

---

#### [QUA-008] performance | HIGH
- **Lokalizacja**: GS#2 sekcja "Unified Data Model" + Data Flow 5.1
- **Opis**: `lmBuildGrid()` jest wolane przy KAZDEJ zmianie fazy (`lm-phase-change`). Z 27 agentami to przebudowa calego DOM gridu co ~30-60s (co faze). Problem NIE jest w czestotliwosci, ale w tym ze `lmBuildGrid()` rebuilds CALY grid (innerHTML = '') zamiast updatowac istniejace karty. W Data Flow: `lmOnPhaseChange -> lmBuildGrid()`. To powoduje: (a) utrate scroll pozycji comms log (nie, to oddzielny panel), (b) utrate focus state (jesli user Tab-owal do agenta -- focus znika po rebuild), (c) flash of content (FOUC) na 300ms card-reveal animation za kazdym razem.
- **Sugestia**: Zdefiniowac `lmBuildGrid()` jako INKREMENTALNY update: przesuwa karty miedzy phase containers, zmienia klasy (done/active/upcoming), ale NIE rebuilds DOM od zera. Rebuild od zera TYLKO przy lmInit() lub preset change. Dodac note: "lmBuildGrid -- update, nie rebuild. Rebuild = lmRebuildGrid() tylko przy init."

---

#### [QUA-009] completeness | HIGH
- **Lokalizacja**: GS#2 -- brak specyfikacji AnimationManager
- **Opis**: GS#2 wymienia AnimationManager jako Phase 0 prerequisite (I3, +70 LOC), podaje parametry (3 priorities, 1-step degradation, visibilitychange, frameBudget=10ms). Ale NIE ma pseudo-kodu ani API. Developer nie wie: (a) Jak wyglada `AnimMgr.register(name, callback, priority)`? (b) Czy to jest class/IIFE/module? (c) Jak wyglada degradation logic? (d) Co robi `pause()`/`resume()`? GS#2 mowi "BEZ getStats (debug only)" ale nie definiuje co AnimMgr MA. Integrator (18) tez nie definiuje -- mowi "patrz Gold Solution".
- **Sugestia**: Dodac do GS#2 minimalny pseudo-kod AnimationManager:
  ```
  AnimMgr = { tasks: Map, register(id, fn, priority), unregister(id), pause(), resume(),
              _loop(ts) { for task of tasks: if budget exceeded && task.priority==='decorative' skip },
              degradation: { if avgFPS < 40 for 3s: remove all decorative } }
  ```
  Bez tego developer musi sam zaprojektowac API -- ryzyko niezgodnosci z reszta spec.

---

#### [QUA-010] consistency | HIGH
- **Lokalizacja**: GS#2 sekcja "Unified Event List" vs 14_DESIGNER.md sekcja 3.6 vs GS#1
- **Opis**: Speed control (Pause/Resume + 0.5x/1x/2x/4x) jest specyfikowany w Designer (sekcja 3.6: `.lm-ctrl-pause`, `.lm-ctrl-speed` z cyklami 0.5x->1x->2x->4x) i w GS#2 HTML (`<button class="lm-btn lm-btn-pause">`). Ale GS#2 NIE specyfikuje logiki speed control nigdzie w Data Model ani Data Flow. Nie ma `LM.speed` w state, nie ma `lmSetSpeed()` funkcji, nie ma wplywu speed na `simTimer` timeout. Speed jest button w HTML ale ghost feature -- brak implementacji.
- **Sugestia**: Albo (a) dodac `LM.speed` + `lmSetSpeed(multiplier)` ktora zmienia `simTimer` delay (obecnie ~2000-3000ms per phase), albo (b) explicite wyrzucic speed control z v22 scope (WON'T) i usunac z HTML. Obecny stan: UI jest, logika nie.

---

#### [QUA-011] edge-case | HIGH
- **Lokalizacja**: GS#2 Data Flow 5.3 -- "lmOnDecision('redebate') -> simPhaseIdx-- (cofnij o 1) + simStep()"
- **Opis**: Re-debate mechanizm jest niezdefiniowany w edge cases. Jesli user klika "Re-debate" na HITL #2 (po FM#1), `simPhaseIdx--` cofa do FM#1, `simStep()` restartuje faze. Ale: (a) Co z agentami ktore juz ukonczyli FM#1? Czy ich status resetuje sie z `done` na `queued`? (b) `completedPhases` nadal zawiera FM#1 -- czy trzeba usunac? (c) Comms log ma wiadomosci z "pierwszej" FM#1 -- czy zostaja? (d) SESSION_EVENTS loguje re-debate ale nie ma mechanizmu "odwijania" historii. (e) Co jesli user klika Re-debate 5 razy -- infinite loop?
- **Sugestia**: Zdefiniowac explicite:
  1. Re-debate: `completedPhases.delete(phaseId)`, reset agent statuses w tej fazie na `queued`
  2. Comms log: dodaj separator "=== Re-debate FM#1 ==="
  3. Max re-debates: 3 per HITL point (po 3: przyciemni przycisk, toast "Maksymalna liczba re-debat")
  4. SESSION_EVENTS: loguj `{type: 'redebate', count: N}`

---

#### [QUA-012] consistency | HIGH
- **Lokalizacja**: GS#2 sekcja "Unified HTML Structure" vs 18_INTEGRATOR.md Appendix A
- **Opis**: Dwa rozne HTML templates dla monitora. GS#2 (linia 371-488) ma wersje z pelnym ARIA (`role="dialog"`, `aria-modal`, `aria-label`, skip links, sr-only announcer). Integrator (linia 948-1049) ma uproszczona wersje bez: skip links, sr-only announcer, focus trap attributes, `<select>` zamiast pills w comms filter. Developer moze wziac ZLY template.
- **Sugestia**: GS#2 explicite mowi "TEN dokument jest jedynym zrodlem" -- OK. Ale dodac bold note przy HTML: "UZYJ TEGO HTML, NIE wersji z 18_INTEGRATOR.md. Roznice: skip links, ARIA, filter jako select vs pills."

---

#### [QUA-013] performance | MEDIUM
- **Lokalizacja**: GS#2 sekcja "Unified Animation List" -- 17 animacji
- **Opis**: 17 animacji jednoczesnie moze powodowac excessive repaints. Konkretnie: `lm-breathe` (4s infinite) na KAZDYM idle agencie -- z 27 agentami, jesli 20 jest idle, to 20 jednoczesnych infinite animations na opaciity+transform. Kazda animacja na `transform` + `opacity` uruchamia compositor, ale `lm-breathe` zmienia `opacity` I `transform: scale()` -- to OK dla GPU, ALE jesli agent card ma `border-color` transition (hover) lub `box-shadow` animacje -- composite layers moga sie kumulowac.
- **Sugestia**: Rozwazyc: (a) idle agents NIE maja animacji (static opacity: 0.5), animacja `lm-breathe` TYLKO na agentach w aktywnej fazie, (b) limit jednoczesnych animated agents do max 12 (aktywna faza + always-on), (c) `will-change: opacity, transform` TYLKO na kartach w aktywnej fazie. AnimMgr degradation powinien liczyc animowane elementy.

---

#### [QUA-014] edge-case | MEDIUM
- **Lokalizacja**: GS#2 brak
- **Opis**: Scenariusz: 1 agent na canvasie. User dodal JEDNEGO agenta (np. Orchestrator) i otwiera Live Monitor. Monitor buduje grid z 1 faza, 1 agentem. Timeline ma 1 dot zamiast 6. HITL points sa skonfigurowane na fazy 'debate1', 'build', '__complete' -- ale z 1 agentem w fazie 'strategy', zadna z tych faz nie istnieje. Symulacja konczy sie natychmiast (1 faza, 1 agent). Brak HITL, brak debate, brak timeline sensu.
- **Sugestia**: Dodac minimalny guard: jesli `relevantPhases.length < 3`, pokaz toast "Monitor wymaga minimum 3 faz (dodaj agentow z roznych faz)" LUB dostosuj HITL_MAP dynamicznie do istniejacych faz. Obecny stan: monitor zadziala technicznie ale UX bedzie bezsensowny.

---

#### [QUA-015] a11y | MEDIUM
- **Lokalizacja**: GS#2 sekcja "Unified HTML Structure" -- HITL panel
- **Opis**: HITL decision panel ma `role="alertdialog"` i `aria-modal="true"` ale BRAKUJE `aria-describedby`. WCAG wymaga ze `alertdialog` powinien miec `aria-describedby` wskazujacy na opis problemu/pytania. Bez tego screen reader oglosza "Punkt decyzyjny" (aria-label) ale NIE czyta pytania ("Orkiestrator przedstawil plan..."). User musi Tab-owac do body zeby uslyszec tresc.
- **Sugestia**: Dodac `aria-describedby="lmHitlBody"` na `<div class="lm-hitl">`. Body ma `id="lmHitlBody"` -- wystarczy jeden atrybut.

---

#### [QUA-016] a11y | MEDIUM
- **Lokalizacja**: GS#2 sekcja "Unified HTML Structure" -- comms log
- **Opis**: Comms log ma `aria-live="polite"` na calym panelu `<aside>`. To oznacza ze KAZDA nowa wiadomosc zostanie ogloszona przez screen reader -- w fazie z 6 agentami, wiadomosci moga pojawiawiac sie co 2-3s. To spowoduje "screen reader storm" -- user nie bedzie mogl slyszec nic innego. GS#1 poprawnie identyfikuje potrzebe ARIA live, ale implementacja jest zbyt agresywna.
- **Sugestia**: Przeniesc `aria-live="polite"` z calego panelu na dedykowany `<div class="sr-only" id="lmCommsAnnounce">` ktory aktualizuje sie TYLKO przy: (a) zmianie fazy, (b) HITL event, (c) error. Zwykle wiadomosci agentow NIE sa ogloszone -- user moze je przeczytac gdy chce.

---

#### [QUA-017] a11y | MEDIUM
- **Lokalizacja**: GS#2 sekcja "Unified HTML Structure" -- Debate Arena
- **Opis**: Debate Arena `<div class="lm-debate" role="region">` -- uzywa `role="region"` zamiast `role="dialog"`. Debate Arena jest modal overlay z backdrop (z-index 340, backdrop blur) -- powinien byc dialogiem z focus trap. Bez `role="dialog"` i `aria-modal="true"`, assistive technology nie wie ze to jest modal -- Tab moze uciec do elementow pod spodem.
- **Sugestia**: Zmienic na `role="dialog" aria-modal="true" aria-label="Arena debaty Five Minds"`. Dodac focus trap (jak w HITL).

---

#### [QUA-018] performance | MEDIUM
- **Lokalizacja**: GS#2 -- comms log DOM purge
- **Opis**: GS#2 mowi "DOM purge >200 rows" (+5 LOC). Ale nie definiuje KIEDY purge nastepuje i JAK. Jesli purge = usuwanie najstarszych rows z DOM, to OK. Ale jesli `LM.commsMessages` array NIE jest purge-owany (tylko DOM), to array rosnie bez limitu. Z 27 agentami i ~3 msg/agent/phase i 6 faz = ~486 wiadomosci. W custom config z 50+ agentami moze byc 1000+. Array sam w sobie nie jest problem (kilka KB) ale jesli SESSION_EVENTS tez loguje kazdy msg -- oba array rosna.
- **Sugestia**: Zdefiniowac: (a) DOM purge: usun rows > 200 z DOM, zachowaj w `LM.commsMessages`. (b) `LM.commsMessages` cap: 500 (ring buffer jak SESSION_EVENTS ma 2000). (c) SESSION_EVENTS ma juz ring buffer (shift na 2000) -- OK ale 2000 eventow x average 100 bytes = 200KB w pamieci -- to jest fine dla desktopa.

---

#### [QUA-019] completeness | MEDIUM
- **Lokalizacja**: GS#2 -- Narrative Templates
- **Opis**: GS#2 specyfikuje: "engine 35 LOC + ~50 LOC data (80 unikalnych szablonow z fallback _default). Anti-repetition." Ale NIE ma ani JEDNEGO przykladu szablonu, ani struktury obiektu, ani mechanizmu anti-repetition. Developer musi sam wymyslic: format szablonow (string template? function? array z random?), strukture danych (nested object? Map?), anti-repetition (shuffle? last-used tracking?). To jest 85 LOC BEZ specyfikacji.
- **Sugestia**: Dodac minimalny przyklad:
  ```
  NARRATIVE = {
    researcher: {
      working: ["Researcher zanurza sie w analiza...", "Przeszukuje dokumentacje...", "Zbiera dane z wielu zrodel..."],
      _default: { working: ["Pracuje nad zadaniem..."], done: ["Zakonczyl prace."] }
    }
  }
  function lmNarrative(defId, state) {
    const pool = NARRATIVE[defId]?.[state] || NARRATIVE._default[state];
    // Anti-repetition: track last index, pick different
  }
  ```

---

#### [QUA-020] consistency | MEDIUM
- **Lokalizacja**: GS#2 sekcja B vs 14_DESIGNER.md sekcja 3.7
- **Opis**: Debate Arena z-index konflikty:
  - GS#2 sekcja B: `HITL z-index: 350`, `Debate Arena = 340 (ponizej HITL)`
  - GS#2 HTML: `<div class="lm-debate" ... hidden>` -- brak inline z-index
  - GS#2 CSS Variables: nie specyfikuje z-index dla debate
  - Designer: Debate Arena z-index `360` (sekcja 3.7)
  - Integrator: Debate Arena z-index `330` (sekcja 4.2)
  - Trzy rozne wartosci: 330 (Integrator), 340 (GS#2 text), 360 (Designer)
- **Sugestia**: GS#2 powinien miec JEDNORAZOWA z-index mape w sekcji CSS. Proponuje: overlay 300, HUD 310, comms 305, debate 340, HITL 350, toast 999. Dodac jako tabele.

---

#### [QUA-021] edge-case | MEDIUM
- **Lokalizacja**: GS#2 brak
- **Opis**: Brak polaczen miedzy agentami na canvasie. Monitor czyta `conns` (read-only) ale GS#2 nigdzie nie uzywa polaczen w monitorze (karty, nie orby -- brak wizualizacji flow). To jest OK. ALE: Integrator (sekcja 1.2) wymienia `conns` jako "opcjonalnie wizualizacja flow". Jesli developer zinterpretuje to jako requirement -- doda linie miedzy kartami, co jest scope creep. Z drugiej strony: brak polaczen oznacza ze user nie widzi KTORY agent komunizuje z KTORYM -- comms log ma `targetId` ale nie jest uzywany wizualnie.
- **Sugestia**: Explicite dodac do GS#2: "Polaczenia (`conns`) NIE sa wizualizowane w monitorze v22. Karty agentow NIE maja linii miedzy soba. Comms log uzywa targetId do label 'do: [agent]' w wiadomosci." 1 zdanie zamyka pytanie.

---

#### [QUA-022] consistency | MEDIUM
- **Lokalizacja**: GS#2 sekcja "Unified HTML Structure" -- comms filter
- **Opis**: GS#2 HTML ma `<select class="lm-comms-filter">` z `<option>` (dropdown). Designer (sekcja 3.5, linia 1015-1041) specyfikuje pills (`.lm-comms-filter` jako pills z `.active` class). To sa dwa rozne UI patterns. GS#2 mowi "czytaj TEN dokument" ale developer moze byc zdezorientowany: select czy pills?
- **Sugestia**: Zdecydowac explicite: `<select>` jest prostsze (mniej LOC, natywny a11y) vs pills (ladniejsze, wiecej CSS). Rekomendacja: `<select>` w Phase 1-2, pills jako Phase 3 polish jesli budzet LOC pozwoli.

---

#### [QUA-023] performance | MEDIUM
- **Lokalizacja**: GS#2 sekcja "Unified Animation List" + "Reduced motion blanket"
- **Opis**: Reduced-motion blanket uzywa:
  ```css
  .lm-overlay *, .lm-overlay *::before, .lm-overlay *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  ```
  Selektor `*` na calym overlay z `!important` na 3 properties to potencjalny specificity war. Jakikolwiek inline style z `animation-duration` zostanie nadpisany -- to moze zlamac dynamiczne animacje dodawane przez JS (np. staggered reveal z JS-set animation-delay). Rowniez: `transition-duration: 0.01ms !important` lamie WSZYSTKIE transitions -- wlaczajac hover effects na przyciskach (ktore sa uzyteczne, nie dekoratywne).
- **Sugestia**: Uzyc bardziej precyzyjnego selektora: targetowac KONKRETNE klasy animacji (`.lm-breathe, .lm-pulse-q, .lm-spin-ring, ...`) zamiast `*`. Zachowac transitions na przyciskach (`button transition: ...`). Designer (sekcja 4.2) ma lepsze podejscie -- targetuje konkretne klasy.

---

#### [QUA-024] edge-case | MEDIUM
- **Lokalizacja**: GS#2 Data Flow 5.1 -- "if (!simRunning) -> simToggle() [auto-start sim]"
- **Opis**: Jesli user otwiera monitor gdy symulacja NIE dziala, `lmOpen()` auto-startuje symulacje. Ale co jesli: (a) Canvas ma agentow ale brak presetu (user manualnie dodal agentow) -- `simToggle()` moze nie wiedziec ktore fazy sa aktywne. (b) Symulacja byla STOPPED (user kliknal STOP wczesniej) -- auto-restart moze byc niechciany. User moze chciec OBEJRZEC monitor jako static dashboard bez uruchamiania symulacji.
- **Sugestia**: Zamiast auto-start: pokaz toast "Symulacja nie dziala. [Uruchom] [Ogladaj statycznie]". LUB: auto-start TYLKO jesli monitor otwierany PIERWSZY RAZ. Przy ponownym otwarciu: jesli sim was stopped, pokaz grid w stanie 'idle' bez auto-restartu.

---

#### [QUA-025] code-smell | MEDIUM
- **Lokalizacja**: GS#2 Unified Data Model -- LM object
- **Opis**: `LM` obiekt ma 20+ properties na top-level. Brak enkapsulacji -- kazda funkcja moze zmieniac dowolny property. W polaczeniu z "explicit render" (brak automatycznej reaktywnosci), developer musi pamietac aby po KAZDEJ zmianie wolac odpowiedni render. To jest podatne na bledy: zmienisz `LM.phaseIndex` ale zapomnisz `lmUpdateTimeline()` -- timeline jest stale.
- **Sugestia**: To nie jest blocker, ale warto dodac note: "KONWENCJA: nigdy nie zmieniaj LM properties bezposrednio. Zawsze uzywaj helper function (lmSetPhase, lmSetAgentState, lmSetHitl) ktora zmienia state I wola render." Ewentualnie: 3-4 setter functions ktore robia set+render atomicznie.

---

#### [QUA-026] code-smell | MEDIUM
- **Lokalizacja**: 18_INTEGRATOR.md sekcja 6.3 -- keyboard handler
- **Opis**: `e.preventDefault(); return;` na KAZDYM klawiszu gdy monitor otwarty (linia 683: "Block ALL other keys when monitor open"). To blokuje: (a) Ctrl+C/V (kopiowanie), (b) Ctrl+Z (undo), (c) F5 (refresh), (d) Ctrl+W (zamknij tab), (e) Alt+Tab (przelacz okno). Browser shortcuts powinny byc przepuszczone. GS#2 nie specyfikuje tego explicite ale podaje keyboard handling z Integratora.
- **Sugestia**: Zmienic guard na: `if(lmOpen_ && !e.ctrlKey && !e.altKey && !e.metaKey) { /* block only unmodified keys */ }`. Przepuscic: Ctrl+*, Alt+*, Meta+*, F-keys.

---

#### [QUA-027] a11y | MEDIUM
- **Lokalizacja**: GS#2 -- brak focus management po phase change
- **Opis**: Gdy faza sie zmienia i `lmBuildGrid()` przebudowuje grid, focus jest tracony. Jesli user navigowal keyboard Tab do agenta w aktywnej fazie, po rebuild focus wraca do `<body>`. Nie ma `document.activeElement` restore ani focus management strategy po DOM rebuild.
- **Sugestia**: Po `lmBuildGrid()`: (a) jesli previous focus was inside grid, move focus to first card in NEW active phase, (b) jesli previous focus was in comms/HUD, don't touch it. Zapisz `document.activeElement` przed rebuild, restore po.

---

#### [QUA-028] completeness | LOW
- **Lokalizacja**: GS#2 sekcja "Testing Requirements" -- brak tests for always-on agents
- **Opis**: Orchestrator i Synthesizer sa `alwaysOn: true` -- pracuja w KAZDEJ fazie. GS#2 nie specyfikuje jak sa wizualizowane w monitorze. Czy pojawiaja sie w KAZDYM phase container? Czy sa w osobnej "Always On" sekcji? Czy ich status zmienia sie z fazo na faze? Integrator ma `ALWAYS_ON_IDS` ale monitor build logic nie adresuje tego.
- **Sugestia**: Dodac decyzje: alwaysOn agents pojawiaja sie w sekcji "Orchestration" u gory gridu (staly, nie per-faza) z wlasnym mini-container. Status: zawsze 'working' gdy sim dziala, 'idle' gdy sim stopped.

---

#### [QUA-029] a11y | LOW
- **Lokalizacja**: GS#2 HTML -- Emergency STOP button
- **Opis**: STOP button ma `aria-label="STOP"` ale brak `aria-keyshortcuts` attribute. WCAG Best Practice: jesli button ma keyboard shortcut, oglos go. Rowniez: brak `aria-live` na HUD metrykach (timer, progress, agent count) -- te zmieniaja sie live ale screen reader nie wie.
- **Sugestia**: Dodac `aria-keyshortcuts="Escape"` na STOP (jesli Escape ma zamykac monitor, nie triggerowac STOP -- to moze byc mylace. Lepiej: dodac tooltip "Shift+Escape" jesli taki shortcut istnieje). Dodac `aria-live="off"` na timer/progress (nie oglosaj co sekunde) z opcja "oglos co minute" jako polite.

---

#### [QUA-030] completeness | LOW
- **Lokalizacja**: GS#2 -- Decision Celebration Burst
- **Opis**: GS#2 wymienia "Decision Celebration Burst (~25 LOC)" jako Phase 2 micro-improvement ale NIE definiuje co to jest. Brak: ilu particles, jaki kolor, jaka animacja, jak dlugo trwa, gdzie na ekranie. Developer musi sam zaprojektowac.
- **Sugestia**: Dodac 1-zdaniowy opis: "Po approve: 12 malych particles (4px, kolor fazy) rozpryskujacych sie z srodka HITL panelu, radius 60px, czas 600ms, ease-out, fade to 0 opacity. CSS @keyframes, nie canvas."

---

#### [QUA-031] completeness | LOW
- **Lokalizacja**: GS#2 -- Summary panel
- **Opis**: GS#2 wymienia "Summary panel minimalny (czas, fazy, decyzje) ~25 LOC" ale nie definiuje layoutu, co dokladnie wyswietla, jak dlugo jest widoczny, czy jest dismissable. "Minimalny" to nie specyfikacja.
- **Sugestia**: Dodac: "Summary panel: centered card 400x300px, glassmorphism, wyswietla: total time (mm:ss), completed phases (N/6), HITL decisions taken (N/3 z wynikami), agents total. Auto-dismiss po 5s LUB klik anywhere. Confetti 1.5s overlay pod spodem."

---

#### [QUA-032] consistency | LOW
- **Lokalizacja**: GS#2 "Unified LOC Budget" vs "FINAL Feature List"
- **Opis**: LOC sumy nie zgadzaja sie miedzy sekcjami:
  - FINAL Feature List: Phase 0 = -94, Phase 1 = 560, Phase 2 = 425
  - Unified LOC Budget: Phase 0 = -94, Phase 1 = +560, Phase 2 = +425, + missing +46, + micro +25 = +962 (bez Phase 3)
  - Ale w Phase 2 detailed table: kroки 2.1-2.15 sumuja sie do: 100+85+95+25+25+20+30+15+15+30+3+5+15+25+8 = 531 LOC (nie 425+46+25=496)
  - Roznica: 531 vs 496 = 35 LOC
- **Sugestia**: Przeliczyc Phase 2 kroки i ujednolicic. To nie jest blocker ale moze spowodowac zaskoczenie przy LOC audit po Phase 2.

---

#### [QUA-033] performance | LOW
- **Lokalizacja**: GS#2 -- setInterval dla timer
- **Opis**: `lmElapsedTimer = setInterval(lmUpdateClock, 1000)` -- timer aktualizuje sie co 1s. Jesli tab jest niewidoczny, setInterval w nowoczesnych przegladarkach jest throttled do 1/min. Po powrocie na tab: timer pokaze stary czas, potem "skoczy" do aktualnego. To nie jest bug per se (performance.now() liczy poprawnie) ale UX moze byc zaskakujacy.
- **Sugestia**: Uzyc `requestAnimationFrame` zamiast `setInterval` dla timer display (juz mamy AnimMgr). LUB: dodac `visibilitychange` handler ktory aktualizuje timer natychmiast po powrocie na tab. To jest 2 linie kodu.

---

#### [QUA-034] code-smell | LOW
- **Lokalizacja**: GS#2 Data Flow 5.2 -- LM_HITL_MAP
- **Opis**: `LM_HITL_MAP` hardcoduje fazy ('debate1', 'build', '__complete') ale PHASES array w v22 moze miec inne id (np. 'five_minds_1' zamiast 'debate1'). GS#2 uzywa `debate1` w HITL_MAP ale Designer (sekcja 2.3) uzywa `five_minds_1`. Jesli PHASES w v22 uzywa `five_minds_1` -- HITL nigdy nie zostanie triggered bo key mismatch.
- **Sugestia**: Zweryfikowac PHASES id w v22 codebase i ujednolicic. Dodac guard: `console.warn('HITL: unknown phase ' + phaseId)` jesli `LM_HITL_MAP[phaseId]` jest undefined.

---

#### [QUA-035] a11y | LOW
- **Lokalizacja**: GS#2 HTML -- brak lang attribute
- **Opis**: Monitor overlay nie ma `lang="pl"` attribute. Caly interfejs jest po polsku ("Komunikacja", "Zatwierdz", "Czeka na Ciebie") ale screen reader moze czytac tekst z angielska wymowa jesli strona glowna ma `lang="en"` lub brak lang.
- **Sugestia**: Dodac `lang="pl"` na `<div class="lm-overlay">`.

---

#### [QUA-036] edge-case | LOW
- **Lokalizacja**: GS#2 Data Flow 5.1
- **Opis**: Scenariusz: 50+ agentow (custom config). Agent grid z 50 kartami (160px each) na ekranie 1920px szerokim (minus 280px comms) = 1640px / 160px = ~10 kart w wierszu. 50 kart = 5 wierszy x 92px = 460px. Z 6 faz containers z headers -- laczy sie ~600px+. Moze wymagac scroll w grid area. GS#2 specyfikuje `overflow-y: auto` na grid (Designer 1.2) -- OK. Ale staggered reveal animation na 50 kartach = 50 * 50ms = 2500ms delay na ostatniej karcie -- to za dlugo.
- **Sugestia**: Cap stagger delay: `delay = Math.min(index * 50, 500)` -- max 500ms niezaleznie od ilosci kart. LUB: stagger TYLKO na aktywnej fazie, reszta instant.

---

#### [QUA-037] code-smell | LOW
- **Lokalizacja**: GS#2 -- lmLogEvent ring buffer
- **Opis**: `if (LM.events.length >= 2000) LM.events.shift()` -- `Array.shift()` jest O(n) operacja (przesuwa wszystkie elementy). Z 2000 elementami to jest mierne ale nie tragiczne. Z 10000 byloby problemem.
- **Sugestia**: Dla v22 z cap 2000 to jest OK. Jesli kiedykolwiek cap wzrosnie: uzyc circular buffer (index modulo size) zamiast shift. Nie blocker.

---

### Pokrycie Wymagan (checklist)

| # | Wymaganie z Gold Solution #1 | Status w GS#2 | Uwagi |
|---|------------------------------|---------------|-------|
| M1 | Fullscreen overlay z HUD topbar | POKRYTE | HTML + CSS + lifecycle zdefiniowane |
| M2 | Agent status visualization (7 stanow) | POKRYTE | STATUS_VIS + STATUS_LABELS + CSS data-state. UWAGA: CSS z Designera uzywa `waiting-for-human` nie `hitl` [QUA-001] |
| M3 | Phase timeline (horizontal stepper) | POKRYTE | 6 dots, active/completed/upcoming. Ale brak szczegolowego pseudo-kodu lmUpdateTimeline() |
| M4 | Agent grid pogrupowany wg fazy | POKRYTE | lmBuildGrid(), progressive reveal. UWAGA: rebuild vs update [QUA-008] |
| M5 | HITL decision panel (1 wariant) | POKRYTE | 3 points, A/R/D, Escape=approve, focus trap. UWAGA: deadlock [QUA-003] |
| M6 | Comms log / Dialog Timeline | POKRYTE | 280px, collapsible, filtr, auto-scroll +5 LOC, DOM purge >200. UWAGA: aria-live storm [QUA-016] |
| M7 | Emergency STOP | POKRYTE | Shake+flash, simStop(), lmClose() |
| M8 | Keyboard navigation + ARIA | CZESCIOWO | Tab flow, skip links, focus trap. BRAKUJE: focus restore po rebuild [QUA-027], aria-describedby [QUA-015] |
| I1 | AnimationManager | CZESCIOWO | Wymagania zdefiniowane, brak pseudo-kodu API [QUA-009] |
| I2 | Refactor istniejacych rAF | POKRYTE | -15 netto, 4 migracje |
| I3 | prefers-reduced-motion | POKRYTE | @media + toggle. Reduced-motion blanket w GS#2 |
| I4 | Audit v22 | POKRYTE | Cel -150 do -200 LOC |
| I5 | Performance baseline | POKRYTE | 30 min DevTools, OBOWIAZKOWE |
| S1 | Debate Arena | POKRYTE | Grid 3+2, 3 slidy, round splash. UWAGA: z-index conflict [QUA-020] |
| S2 | Narrative Templates | CZESCIOWO | Engine + data specyfikowane, brak przykladow [QUA-019] |
| S3 | Intent Preview | POKRYTE | Non-blocking info bar, HTML zdefiniowany |
| S4 | HUD dim completed | POKRYTE | opacity 0.4 + grayscale |
| S5 | Mission Pulse | POKRYTE | Sinusoida, AnimMgr decorative, reduced-motion off |
| S6 | View Transitions API | POKRYTE | Progressive enhancement wrapper |
| S7 | Confetti + Summary | CZESCIOWO | Wymienione ale brak spec layoutu [QUA-031] |
| -- | Done color fix | POKRYTE | #22C55E -> #3B82F6 |
| -- | 3 HITL points | POKRYTE | debate1, build, __complete. UWAGA: phase ID mismatch [QUA-034] |
| -- | Lazy init | POKRYTE | lmInit() przy pierwszym uzyciu |
| -- | Feature flags | POKRYTE | 6 const na gorze pliku |
| -- | Hard limit 5000 LOC | POKRYTE | Target 4300, hard limit 4500 (ostrzejszy niz GS#1) |
| -- | Session events | POKRYTE | Append-only array, max 2000, ring buffer |
| -- | Desktop-first | POKRYTE | Mobile = WON'T, smoke test MS1/MS2 |
| -- | Single-file | POKRYTE | BEZ build stepu |

---

### Edge Case Coverage

| Scenariusz | Pokryty? | Uwagi |
|------------|----------|-------|
| User zamyka przegladarke w trakcie HITL | NIE | State utracony, brak persistence. Akceptowalne (symulacja jest pre-scripted) ale brakuje explicit note [QUA-003] |
| User zmienia preset w trakcie Live Monitor | CZESCIOWO | Detection przy otwarciu (2.12), brak protection podczas otwartego monitora [QUA-007] |
| Canvas jest pusty (0 agentow) | NIE | Integrator ma guard ale GS#2 nie [QUA-006] |
| Tylko 1 agent na canvasie | NIE | Monitor zadziala technicznie ale UX bezsensowny [QUA-014] |
| 50+ agentow (custom config) | CZESCIOWO | Grid scroll OK, stagger animation zbyt dlugi [QUA-036] |
| Wszystkie agenty tego samego modelu | NIE DOTYCZY | Monitor nie wyswietla modelu agenta -- brak impact |
| Brak polaczen miedzy agentami | CZESCIOWO | Monitor nie wizualizuje polaczen -- brak problemu, ale brakuje explicit decyzji [QUA-021] |
| Re-debate wiele razy | NIE | Brak limitu, potencjalny infinite loop [QUA-011] |
| Tab niewidoczny podczas symulacji | CZESCIOWO | visibilitychange dla AnimMgr (pause particles), ale setInterval timer drift [QUA-033] |
| Monitor otwarty + eksport/import | NIE TESTOWANE | R4 w testing list ale brak guardu -- eksport modal z-index 250 < monitor 300 -- modal bedzie ZA monitorem |
| Sim already completed + otworz monitor | NIE | Co jesli sim dobiegla konca gdy monitor byl zamkniety? `simRunning=false` -> auto-start? To restartuje cala symulacje! |
| Network disconnect/slow | NIE DOTYCZY | Brak zaleznosci sieciowych (fonts sa cached) |
| User szybko otwiera/zamyka monitor | NIE | Rapid toggle M-Escape-M-Escape moze powodowac race condition w animation state |

---

### Verdict: PASS WITH CONDITIONS

**Uzasadnienie:**

Gold Solution #2 jest DOBRYM dokumentem -- adresuje 24/26 warunkow z Five Minds Debate #2, rozstrzyga konflikty miedzy BUILD specs, ustala jednolity Data Model i Feature List. Arytmetyka LOC jest spoja (z drobnymi odchyleniami). Performance Contract jest mocny. Testing checklist jest kompletny.

ALE: 3 CRITICAL findings musza byc zaadresowane PRZED rozpoczeciem implementacji:

1. **[QUA-001] CRITICAL**: Agent state `hitl` vs `waiting-for-human` mismatch miedzy GS#2 a Designer CSS -- developer dostanie broken styles bez korekty.

2. **[QUA-002] CRITICAL**: GS#2 NIE jest samowystarczalny pod wzgledem CSS -- mowi "nie czytaj BUILD specs" ale nie zawiera CSS komponentow. Developer MUSI czytac Designera po CSS, co jest SPRZECZNE z instrukcja.

3. **[QUA-003] CRITICAL**: HITL deadlock -- brak timeout i brak persistence stanu. User moze zostawic tab z pending HITL na zawsze.

**Warunki PASS:**

| # | Warunek | Priorytet | LOC impact |
|---|---------|-----------|------------|
| 1 | Dodac note o korekcie CSS selektorow `waiting-for-human` -> `hitl` | CRITICAL | 0 (1 zdanie w GS#2) |
| 2 | Dodac explicite: "CSS komponentow: 14_DESIGNER.md sekcje 3.1-3.7 z korektami [lista]" | CRITICAL | 0 (1 akapit w GS#2) |
| 3 | Dodac `visibilitychange` handler dla HITL auto-approve po 60s niewidocznosci | CRITICAL | +5 LOC |
| 4 | Dodac guard `if (!nodes.length)` w lmOpen() | HIGH | +1 LOC |
| 5 | Zdefiniowac lmBuildGrid jako update (nie rebuild) | HIGH | 0 (clarification) |
| 6 | Zdefiniowac AnimationManager API (pseudo-kod) | HIGH | 0 (documentation) |
| 7 | Zdecydowac: speed control IN czy OUT of v22 | HIGH | 0 (decision) |
| 8 | Zdefiniowac re-debate limits i state reset | HIGH | +5 LOC |

**Lacznie:** 8 warunkow, ~11 LOC dodatkowych, reszta to clarifications/notes w dokumencie.

Po spelnieniu tych warunkow: specyfikacja jest GOTOWA do implementacji.

---

*Raport przygotowany przez QA Quality [OPUS] w ramach Deep Five Minds Protocol -- faza QA.*
*30 findings: 3 CRITICAL, 8 HIGH, 12 MEDIUM, 7 LOW.*
*Verdict: PASS WITH CONDITIONS (8 warunkow).*
*Data: 4 kwietnia 2026*
