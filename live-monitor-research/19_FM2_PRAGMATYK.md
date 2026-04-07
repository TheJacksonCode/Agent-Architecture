# Pragmatyk -- Five Minds Debata #2 (post-BUILD)
## Ocena Wykonalnosci Specyfikacji BUILD

**Rola:** Pragmatyk [OPUS]
**Data:** 2026-04-04
**Perspektywa:** WYKONALNOSC -- spojnosc, konflikty, over-engineering, luki, realizm timeline
**Zrodla:** 14_DESIGNER.md, 15_FRONTEND_DEV.md, 16_FEATURE_DEV.md, 17_BACKEND_DEV.md, 18_INTEGRATOR.md, 13_GOLD_SOLUTION.md, 08_PRAGMATYK.md (moja pozycja z debaty #1)

---

### Stanowisko Glowne

Specyfikacje BUILD sa **solidne architektonicznie**, ale maja **porazajacy problem z LOC arytmetyka** -- kazdy agent podaje wlasne liczby, ktore NIE sumuja sie do limitu z Gold Solution, lecz znacznie go przekraczaja. Designer deklaruje 806 LOC (CSS+HTML), Backend Dev 840 LOC (logika JS), Feature Dev 695 LOC (specjalne features) -- to daje sumarycznie **2341 LOC nowego kodu**, nie 1265 LOC jak zatwierdzil Gold Solution. Nawet po odjęciu nakladek (Narrative Templates, AnimationManager, HITL liczone podwojnie) realistyczny szacunek to **1600-1800 LOC netto**, co z v22 base (3204) i audytem (-200) daje **4604-4804 LOC** -- na granicy hard limitu 5000. Specyfikacje sa dobrze skoordynowane w kwestii API, event systemu i layoutu, ale BRAK jednego developera, ktory zsumuje LOC REALISTYCZNIE, oznacza ze nikt nie pilnuje portfela.

---

### 1. Audit Spojnosci LOC

#### 1.1 Co kazdy agent deklaruje

| Agent | Deklarowany LOC | Co obejmuje |
|-------|----------------|-------------|
| **Gold Solution** | ~1265 netto (Phase 0-3) | Calosciowy budzet: -80 infra + 610 core + 460 comm + 275 polish |
| **Designer** | ~806 (CSS+HTML) | 653 CSS + 153 HTML template |
| **Frontend Dev** | ~465 DOM nodes + "~200 CSS" | Liczone jako DOM budget, CSS wliczony w Designer 806 |
| **Feature Dev** | ~695 | AnimMgr 80 + Narrative 45 + Pulse 20 + HITL 150 + Debate 200 + StateMachine 90 + ConnAnim 60 + Compact 50 |
| **Backend Dev** | ~840 | Data 80 + EventBus 60 + SimHooks 120 + HITL 180 + Metrics 60 + Narrative 200 + localStorage 60 + ErrorHandling 80 |
| **Integrator** | Nie podaje wlasnego LOC | Pisze "miesci sie w budzecie Gold Solution" |

#### 1.2 Problem: podwojne liczenie

| Feature | Liczona przez | LOC x2 |
|---------|--------------|--------|
| **AnimationManager** | Feature Dev (80) + Backend Dev (wliczony w SimHooks) | ~80 LOC overlap |
| **Narrative Templates** | Feature Dev (45) + Backend Dev (200!) | ~45-200 LOC overlap -- Backend Dev liczy SZABLONY TEKSTOWE (~2KB data) jako 200 LOC, Feature Dev liczy sam engine jako 45 LOC |
| **HITL Decision** | Feature Dev (150) + Backend Dev (180) | Feature Dev = renderer, Backend = logika. Osobne, ale Frontend Dev tez liczy HITL panel w swoim DOM |
| **State Machine** | Feature Dev (90) + Backend Dev (w Data 80) | Czesciowy overlap -- oba opisuja agent state management |
| **Mission Pulse** | Feature Dev (20) + Frontend Dev (15 LOC CSS) | Overlap 15 LOC |

#### 1.3 Realistyczna dekompozycja

Oddzielam warstwy i eliminuje podwojne liczenie:

| Warstwa | LOC | Zrodlo |
|---------|-----|--------|
| **CSS (stany, layout, animacje, responsive, reduced-motion)** | ~650 | Designer (806 minus ~150 HTML template + troche kompresji) |
| **HTML template (DOM struktura overlay)** | ~150 | Designer / Frontend Dev |
| **JS -- infrastruktura (AnimMgr, EventBus, Proxy state)** | ~170 | Feature Dev (80) + Backend Dev (60 bus + 30 proxy) |
| **JS -- core rendering (buildGrid, updateAgent, updateHUD, updateTimeline)** | ~180 | Integrator's function list |
| **JS -- HITL + Debate Arena** | ~250 | Feature Dev (150 renderer) + Backend Dev (100 logika/data) |
| **JS -- Narrative Engine + szablony** | ~120 | Feature Dev engine (45) + Backend Dev templates (75 data lines) |
| **JS -- lifecycle (init/open/close/stop)** | ~90 | Integrator |
| **JS -- sim hooks + keyboard guards** | ~50 | Integrator |
| **JS -- metrics, timer, localStorage, error handling** | ~120 | Backend Dev |
| **JS -- session events, feature flags, constants** | ~30 | Backend Dev + Integrator |
| **SUMA NETTO** | **~1810** | |

#### 1.4 Werdykt LOC

```
Gold Solution budzet:  +1265 LOC netto
Moja estymacja:        +1810 LOC netto (43% PONAD budzet)
v22 base:              3204 LOC
Audit:                 -200 LOC
------------------------------------------
Gold Solution prognoza: ~4269 LOC (350 KB)   -- w budzecie
Moja prognoza:          ~4814 LOC (~390 KB)  -- blisko hard limitu 5000 LOC
```

**CZY SIE MIESCIMY?** TAK, ale BEZ ZAPASU. Gold Solution obiecywal bufor ~730 LOC na komplikacje. Moja analiza mowi: bufor to ~186 LOC. To jest CIENKI margines. Kazda niespodziewana komplikacja (browser quirk, edge case w HITL, CSS fix na 1366x768) zjada ten margines.

**REKOMENDACJA:** Phase 3 (Polish + Edukacja) musi byc WARUNKOWA. Debate Arena (200 LOC) to PIERWSZA feature do ciecia jesli Phase 1+2 przekroczy szacunek o >15%. Implementuj Phase 0+1+2 NAJPIERW, zmierz LOC, POTEM decyduj o Phase 3.

---

### 2. Konflikty Miedzy Specyfikacjami

#### 2.1 Designer vs Frontend Dev -- SPOJNE (z drobnymi rozbieznosciami)

| Aspekt | Designer | Frontend Dev | Konflikt? |
|--------|---------|-------------|-----------|
| Topbar height | 48px | 46px (var --lm-topbar-h) | **MIKRO-KONFLIKT** -- roznica 2px. Nie krytyczna ale jeden musi ustapic. |
| Agent card | 160x96px | var --lm-agent-card-w: 160px, --lm-agent-card-h: 90px | **MIKRO-KONFLIKT** -- 96 vs 90px height. |
| Comms log width | 280px | 280px | OK |
| Timeline height | 56px | 60px (var --lm-timeline-h) | **MIKRO-KONFLIKT** -- 4px roznica |
| Research phase color | #06B6D4 (cyan) | #34D399 (emerald = build) | **KONFLIKT** -- Designer daje research cyan, Frontend daje research emerald. Backend daje research jeszcze inaczej. To jest REALNY problem -- rozne kolory research w roznych specach. |
| Glass variables | --lm-bg-glass | --lm-glass-bg | **NAMING CONFLICT** -- ten sam koncept, rozne nazwy zmiennych CSS. |
| HITL z-index | 350 (Designer) | 360 (Frontend Dev) | **MIKRO-KONFLIKT** |

**Severity: NISKA.** Rozbieznosci sa kosmetyczne (2-4px, nazewnictwo). Ale research phase color to REALNY problem -- trzeba zdecydowac: cyan (#06B6D4) czy emerald (#34D399). Rekomenduje cyan (Designer) bo RESEARCH ma byc wizualnie ODROZNIALNE od BUILD (ktory uzywa emerald).

#### 2.2 Backend Dev vs Feature Dev -- SPOJNE (z overlap)

Obie spece opisuja te same subsystemy (HITL, Narrative, State Machine) z ROZNYCH perspektyw:
- Feature Dev: "jak to wyglada i jak user z tym interaguje" (renderer, UI pseudo-kod)
- Backend Dev: "jak to dziala wewnatrz" (data model, event flow, logika)

To jest DOBRE -- komplementarne, nie sprzeczne. ALE:

| Aspekt | Feature Dev | Backend Dev | Problem? |
|--------|-----------|------------|---------|
| Agent state name | `hitl` | `hitl` (w kodzie) ale `waiting-for-human` w CSS | **NAMING MISMATCH** -- Backend Dev uzywa `hitl` jako AgentStatus, Designer/Frontend uzywa `waiting-for-human` jako data-state. Trzeba zdecydowac: JEDNO nazewnictwo. |
| NarrativeEngine LOC | 45 LOC (engine only) | 200 LOC (engine + templates data) | Nie sprzeczne, ale Backend Dev liczy ~150 linii szablonow tekstowych jako "LOC" -- to influje budzet. |
| HITL timer | Feature Dev: nie implementuje | Backend Dev: peiny timer logic | OK -- Backend prowadzi, Feature Dev zostawia miejsce |

#### 2.3 Integrator vs Reszta -- DOBRZE SKOORDYNOWANY

Integrator jest najlepszym dokumentem w calym zestawie BUILD. Precyzyjne numery linii v22, minimalne hooki (1-2 linii per funkcja), czytelna kolejnosc implementacji. Nie widzę konfliktu z innymi specyfikacjami.

**Jedyny problem:** Integrator pisze "miesci sie w budzecie Gold Solution (1265 LOC max netto)" bez wlasnej weryfikacji. PRZYJMUJE na wiarę szacunki innych agentow zamiast je zsumowac niezaleznie.

---

### 3. Over-Engineering Alert

#### 3.1 AnimationManager: 3-level priority -- CZY POTRZEBNE?

Feature Dev definiuje trzy poziomy: `critical`, `normal`, `decorative`. Z frame budget check, auto-degradation, FPS measurement, i rolling average.

**Moja ocena: UZASADNIONE, ale implementacja za rozbudowana.**

- 3 poziomy: TAK -- rozroznienie "simulation tick MUSI isc" vs "starfield MOZE byc skipniety" jest kluczowe dla performance graceful degradation.
- Frame budget check (14ms): TAK -- zapobiega jank.
- Auto-degradation (FPS < 45 -> 30 FPS): UPROSCIC. Feature Dev pisze `degradeCounter > 3` i `degradeCounter > 6` -- to juz jest 10 LOC na cos co moze byc 4 LOC (jeden if: FPS < 40 przez 2s -> wylacz decorative). Nie potrzebujemy 2-stopniowej degradacji.
- Rolling FPS average: UPROSCIC. `frameCount/fpsAccum` z 1-sekundowym oknem to OK, ale `currentFPS` i tak nie jest wyswietlany nigdzie -- uzywany tylko w auto-degradation.

**LOC do zaoszczedzenia:** ~10 LOC jesli uproscimy degradation z 2-stopniowej na 1-stopniowa.

#### 3.2 Event Bus z wildcard -- CZY TO OVERKILL?

Backend Dev implementuje `lmBus` z `agent:*` wildcard matching. Wildcard wymaga parsowania kazdego event type string przy kazdym dispatch.

**Moja ocena: OVERKILL.**

- W calej specyfikacji Backend Dev definiuje ~12 event typow. Na 12 typach wildcard matching to premature optimization.
- `agent:*` listener -- kto go subskrybuje? NIKT w obecnych specyfikacjach. To jest "a moze ktos kiedys bedzie chcial" code.
- Koszt wildcarda: ~10 LOC parsowania + performance overhead na kazdym dispatch.

**REKOMENDACJA:** Wyrzucic wildcard z v22. Prosty bus z exact match. Jesli w v23 ktos potrzebuje wildcarda -- dodaj wtedy. To nie jest refactor-heavy zmiana.

**LOC do zaoszczedzenia:** ~10 LOC

#### 3.3 Reactive Proxy Wrapper -- CZY POTRZEBNE?

Backend Dev opakowuje `LM_STATE` w `Proxy` z automatycznym `scheduleLMRender()` na kazdym `set`. Plus "glebokie proxy" na znanych nested obiektach.

**Moja ocena: NA GRANICY.**

- Proxy jest elegancki, ale w single-file HTML bez frameworka to dodaje nieintuicyjna magie. Developer przyszlej wersji (v23) moze nie wiedziec ze `LM_STATE.phase.currentIndex = 3` triggeruje render.
- Alternatywa: explicit `lmRender()` call po zmianach stanu. Wiecej kodu w callsites, ale ZERO magii.
- "Glebokie proxy TYLKO dla znanych nested obiektow" -- to jest OK jako kompromis (nie rekursywne), ale nadal dodaje zlozonosc.

**REKOMENDACJA:** Zachowaj Proxy ALE dodaj komentarz `// UWAGA: kazdy set na LM_STATE triggeruje render w nastepnym rAF` nad deklaracja. Alternately: rozważ explicit `lmSetState(path, value)` helper zamiast Proxy -- 5 LOC wiecej w callsites, 20 LOC mniej w infrastrukturze.

#### 3.4 Narrative Templates -- 200 LOC szablonow Backend Dev vs 45 LOC Feature Dev

Backend Dev liczy ~200 LOC "w tym ~2KB data". Feature Dev liczy 45 LOC engine.

**Problem:** ~150 linii to SZABLONY TEKSTOWE per agent per state. To jest DATA, nie LOGIKA. Przy 27 agentach x 3 stany x 3 szablony = 243 szablony. Kompresja jest mozliwa:

- Wiele szablonow to `"${agent} [czasownik] [rzeczownik]..."` -- mozna generowac kombinatorycznie zamiast listy.
- Agenci tego samego typu (all QA, all FM experts) mogą wspoldzielic szablony.
- Feature Dev's fallback `_default` template pokrywa 80% potrzeb.

**REKOMENDACJA:** Zredukuj szablony do ~80 unikalnych (z fallback `_default` per state). To daje ~50 LOC danych zamiast ~150 LOC. Oszczednosc: ~100 LOC.

#### 3.5 Token Cost Estimation -- Backend Dev IMPLEMENTUJE cos co Gold Solution WYRZUCIL

Backend Dev (sekcja 5) implementuje `estimateSessionCost()` z `MODEL_PRICING`, `estimateTokensForAgent()`, i per-model breakdown. To jest ~60 LOC.

**Problem:** Gold Solution EXPLICITE pisze: "Token cost estimation -- NIE W V22. SHOULD w v23." A Backend Dev implementuje pelny kalkulator.

**REKOMENDACJA:** WYRZUCIC `estimateSessionCost()` i caly `MODEL_PRICING` obiekt z v22. To jest 60 LOC na feature ktora Gold Solution zakazala. Jesli Backend Dev chcial "przygotowac grunt" -- moze zostawic 5-liniowy komentarz `// v23: token cost estimation here`, ale nie implementowac.

**LOC do zaoszczedzenia:** ~60 LOC

---

### 4. Brakujace Elementy

#### 4.1 BRAK: Auto-approve timer implementation

Gold Solution mowi: "Timer auto-approve WYLACZONY domyslnie -- user wlacza w settings." Frontend Dev dodaje `#lmHitlTimer` z HTML. Backend Dev definiuje `autoApproveTimer: 0` w state. ALE: NIKT nie implementuje LOGIKI timera (countdown, scaleX animation, auto-dispatch approve po 60s).

**Impact:** NISKI -- timer jest opt-in i OFF domyslnie. Ale settings UI sugeruje ze go mozna wlaczyc -- a wlaczenie nic nie zrobi.

**Fix:** Albo dodaj 15 LOC logiki timera, albo USUN timer z settings i z HTML (zaoszczedz ~10 LOC).

#### 4.2 BRAK: Settings UI

Backend Dev definiuje `LM_STATE.settings` z 5 opcjami (autonomy, autoApproveTimer, reducedMotion, narrativeEnabled, missionPulse). Integrator definiuje feature flags na gorze pliku. ALE: NIKT nie projektuje UI do zmiany tych settings w runtime.

**Impact:** SREDNI -- user nie moze zmienic autonomy level ani wlaczyc auto-approve timer. Moze edytowac feature flags w kodzie zrodlowym -- ale to nie jest UX.

**REKOMENDACJA:** W v22: settings zostaja jako feature flags (const na gorze pliku). NIE buduj settings UI -- to +50-80 LOC ktore nie miesci sie w budzecie. Settings UI = v22.1.

#### 4.3 BRAK: Co gdy user klika "Modyfikuj" w HITL?

Integrator pisze: `'modify' -> placeholder toast "Modyfikacja..." + resume`. Backend Dev definiuje `userNote` w `HITLDecisionRecord`. ALE: nie ma UI do WPISANIA modyfikacji. User klika "Modyfikuj", widzi toast, i... symulacja idzie dalej bez zmian.

**Impact:** WYSOKI koncepcyjnie, NISKI praktycznie (bo symulacja jest pre-scripted). Ale to jest MISLEADING UX -- przycisk "Modyfikuj" sugeruje ze cos sie zmieni.

**REKOMENDACJA:** Zmien label z "Modyfikuj" na "Zatwierdz z uwagami" i dodaj textarea 2-liniowy w decision panel (~10 LOC). Nota zapisywana w `HITLDecisionRecord.userNote`. Nie wplywa na symulacje ale daje userowi poczucie sprawczosci i edukacyjna wartosc.

#### 4.4 BRAK: Jak monitor reaguje na ZMIANE PRESETU w trakcie symulacji?

Integrator zabrania modyfikacji canvasu podczas monitora (guard `if(lmOpen_) return` na wszystkim). Ale co jesli user ZAMKNIE monitor (Escape), zmieni preset (`ldPr()`), i OTWORZY monitor ponownie?

**Impact:** SREDNI -- `lmBuildGrid()` czyta `nodes` przy kazdym otwarciu, wiec powinno zbudowac nowy grid. ALE `SESSION_EVENTS`, `LM_STATE.agents`, `LM_STATE.phase` beda STALE z poprzedniej sesji.

**REKOMENDACJA:** `lmOpen()` powinien sprawdzic czy `actPr` (aktywny preset) zmienil sie od ostatniego otwarcia. Jesli tak -- `lmDestroy()` + `lmInit()` (pelen reset). ~5 LOC.

#### 4.5 BRAK: Comms log scroll behavior

Frontend Dev definiuje `lm-comms-scroll` z `tabindex="0"`. Designer pisze "Scroll: overflow-y: auto, scroll-snap: none". ALE: nikt nie specyfikuje AUTO-SCROLL (nowa wiadomosc -> scroll to bottom). Istniejacy DTL w v14+ ma problem ze scroll isolation (`overscroll-behavior: contain` dodany w v17). Monitor comms log powinien auto-scroll DO DOLU chyba ze user recznie przewinal w gore.

**Impact:** NISKI ale wazny UX detail.

**REKOMENDACJA:** `lmAddCommsMsg()` powinien sprawdzic `scrollTop + clientHeight >= scrollHeight - 50` (user blisko dolu). Jesli tak -- `scrollTo({top: scrollHeight, behavior: 'smooth'})`. ~5 LOC.

---

### 5. Timeline Realism -- 4-fazowy Plan Integratora

#### Moja ocena kazdej fazy:

| Faza | Deklarowany czas | Moja estymacja | Dlaczego? |
|------|-----------------|----------------|-----------|
| **Phase 0: Infrastructure** | 1 sesja | **1-1.5 sesji** | AnimMgr + migracja 4 rAF loopow + audit (-200 LOC) to WIECEJ pracy niz wyglada. Audit wymaga czytania i rozumienia 3200 LOC kodu. Migracja rAF wymaga testowania ze starfield/particles nadal dzialaja po refactorze. |
| **Phase 1: Core Monitor** | 1-2 sesje | **2 sesje** | ~475 LOC JS (grid, agents, HUD, timeline, STOP, lifecycle) + ~350 LOC CSS (karty, stany, animacje, responsive). To jest POLOWA calego projektu. 1 sesja to wishful thinking. |
| **Phase 2: Communication + Interaction** | 1 sesja | **1.5 sesji** | Comms log to proste. HITL decision to srednie (3 warianty tresci, keyboard handling, focus trap). Keyboard guards to 25 LOC ale z TESTOWANIEM wszystkich 12 istniejacych skrotow = 30 minut samego QA. |
| **Phase 3: Polish + Edukacja** | 1 sesja (jesli czas) | **1 sesja (jesli LOC pozwala)** | Debate Arena 200 LOC to DUZO na "polish". To jest w istocie CORE FEATURE (USP) zaszyta w fazie "jesli starczy czasu". |

#### Problem z priorytetyzacja Debate Arena

Gold Solution umieszcza Debate Arena jako S1 (SHOULD). Integrator umieszcza ja w Phase 3 (jesli budzet). ALE: Analityk w debacie #1 identyfikowal Five Minds viz jako "jedyny unikany feature vs konkurencja". Jesli Debate Arena NIE wejdzie do v22, tracimy USP.

**REKOMENDACJA:** Przesun UPROSZCZONA Debate Arena do Phase 2 (zamiast Phase 3). Zredukuj do ~120 LOC (zamiast 200): 5 statycznych expert cards w gridzie (nie polkole -- polkole to extra CSS), Gold Solution card, 3 slidy jako tabs (nie animowane transitions). To jest czytelne i tanie.

---

### 6. Moje Red Flags z Debaty #1 -- Status

| Red Flag | Status | Komentarz |
|----------|--------|-----------|
| **RF1: Scope Creep (30 features)** | **ZAADRESOWANY** | Gold Solution przycial do 8 MUST + 7 SHOULD. Specyfikacje BUILD trzymaja sie listy. PASS. |
| **RF2: HITL Overengineering (4 warianty)** | **ZAADRESOWANY** | 1 uniwersalny wariant z opcjonalnym expand. PASS. |
| **RF3: Brak Performance Baseline** | **ZAADRESOWANY** | Phase 0 krok 0.1. Integrator wymaga 30 min DevTools. PASS -- pod warunkiem ze ktos to ZROBI a nie skipnie. |
| **RF4: Brak Testow** | **CZESCIOWO ZAADRESOWANY** | Integrator ma 22 functional tests + 10 performance tests + 10 regression tests + 10 a11y tests. To jest checklista, nie automatyczne testy. AKCEPTOWALNE dla single-file HTML. |
| **RF5: AnimationManager jako prerequisite** | **ZAADRESOWANY** | Phase 0 krok 0.3-0.4. AnimMgr PRZED features. PASS. |
| **RF6 (linia w piasku): Hard limit 5500 LOC** | **ZAOSTRZONY** | Gold Solution zaostrzyl do 5000 LOC. Moja analiza: realistycznie ~4814 LOC. Na granicy ale miesci sie. CONDITIONAL PASS. |
| **RF7 (linia w piasku): prefers-reduced-motion od dnia 1** | **ZAADRESOWANY** | Phase 0, plus `@media (prefers-reduced-motion: reduce)` blok w Frontend Dev CSS. PASS. |

---

### VERDICT: CONDITIONAL-GO

Specyfikacje BUILD sa **architektonicznie solidne** i **dobrze skoordynowane**. API miedzy warstwami jest czytelne (CustomEvent dispatch, lm- prefix, shared CSS variables). Kolejnosc implementacji jest rozsadna (infra -> core -> comm -> polish). Red flags z debaty #1 sa zaadresowane.

ALE: daje **CONDITIONAL-GO**, nie pelne GO, z nastepujacymi warunkami:

#### Warunki GO:

1. **LOC reconciliation PRZED implementacja** -- jeden czlowiek musi przejsc przez WSZYSTKIE spece i usunac podwojne liczenie. Ustalony JEDEN budzet per warstwa: CSS (650), HTML template (150), JS infra (170), JS rendering (180), JS HITL+Debate (250), JS narrative (120), JS lifecycle+hooks (140), JS backend (120). TOTAL: ~1780 LOC netto. Bufor do hard limitu 5000: ~220 LOC.

2. **WYRZUCIC token cost estimation z Backend Dev** -- Gold Solution zakazala, Backend Dev zaimplementowal. 60 LOC na zakazana feature. Wyrzucic.

3. **WYRZUCIC wildcard z event bus** -- 10 LOC premature optimization. Exact match wystarczy.

4. **ZREDUKOWAC Narrative Templates do ~80 unikalnych** -- z fallback `_default`. Oszczednosc ~100 LOC danych.

5. **ZDECYDOWAC research phase color** -- cyan (#06B6D4, Designer) vs emerald (#34D399, Frontend Dev). Rekomenduje cyan -- research musi byc wizualnie odroznialne od build.

6. **ZDECYDOWAC naming: `hitl` vs `waiting-for-human`** -- jeden string w calym systemie. Rekomenduje `hitl` (krotsze, juz w Backend Dev i Feature Dev).

7. **Phase 3 jest WARUNKOWA** -- implementuj Phase 0+1+2, zmierz LOC. Jesli >4500 LOC po Phase 2 -- Phase 3 = v22.1. Debate Arena w uproszczonej formie (~120 LOC) moze wejsc do Phase 2 ZAMIAST Phase 3.

8. **Dodaj 5 LOC brakujacych: auto-scroll comms log, preset change detection w lmOpen().**

#### Jesli warunki spelione:

Realny budzet po poprawkach: ~1600 LOC netto. Plik koncowy: ~4604 LOC. W bezpiecznej strefie z buforem ~396 LOC. Mozna budowac.

#### Jesli warunki NIE spelione:

Ryzyko przekroczenia 5000 LOC hard limitu. Ryzyko feature ktora Gold Solution zakazala (token cost). Ryzyko naming conflicts miedzy specyfikacjami. NIE budowac bez reconciliation.

---

### Podsumowanie Oszczednosci LOC

| Zmiana | LOC zaoszczedzone |
|--------|------------------|
| Wyrzucenie token cost estimation | -60 |
| Wyrzucenie wildcard event bus | -10 |
| Redukcja narrative templates | -100 |
| Uproszczenie auto-degradation | -10 |
| Debate Arena 120 LOC zamiast 200 | -80 |
| **SUMA** | **-260 LOC** |

Po oszczednosciach: ~1550 LOC netto. Plik koncowy: ~4554 LOC. Bufor do hard limitu: ~446 LOC. TO jest komfortowy margines.

---

*Raport przygotowany przez Pragmatyka [OPUS] w ramach Five Minds Protocol -- Debata #2 (post-BUILD).*
*Perspektywa: Wykonalnosc, spojnosc LOC, konflikty, over-engineering.*
*Data: 4 kwietnia 2026*
