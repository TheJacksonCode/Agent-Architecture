# Researcher UX -- Raport UI/UX Design
## Live Monitor Mode: Wzorce i Inspiracje

**Rola:** Researcher UX | Deep Five Minds Protocol
**Data:** 2026-04-04
**Kontekst:** Agent Teams Configurator v22 -- nowy tryb "Live Monitor"
**Zakres:** Fullscreen immersive monitoring, agent status visualization, HITL decision panels, information hierarchy, micro-interactions, accessibility

---

## Spis tresci

1. [Fullscreen Immersive Transitions](#1-fullscreen-immersive-transitions)
2. [Agent Status Visualization](#2-agent-status-visualization)
3. [HITL Decision Panels](#3-hitl-decision-panels)
4. [Information Hierarchy](#4-information-hierarchy)
5. [Micro-interactions i Animacje](#5-micro-interactions-i-animacje)
6. [Accessibility w Dark Immersive UI](#6-accessibility-w-dark-immersive-ui)
7. [Design System Summary](#7-design-system-summary)
8. [Zrodla i inspiracje](#8-zrodla-i-inspiracje)

---

## 1. Fullscreen Immersive Transitions

### 1.1 Problem projektowy

Przejscie z trybu edycji (canvas z draggable nodes, sidebary, control bar) do trybu monitorowania (fullscreen dashboard z metryki, statusy agentow, comms log) musi byc:
- **Plynne** -- unikac "flash of empty content"
- **Odwracalne** -- user musi wiedziec jak wrocic
- **Kontekstowe** -- zachowac mentalna mape: "to sa te same agenty, tylko widze ich inaczej"

### 1.2 Wzorce z branzy

#### A) Gaming HUD: "Tactical View Toggle"
Inspiracja: gry takie jak XCOM, Stellaris, Starcraft -- przejscie miedzy widokiem strategicznym a taktycznym.

**Wzorzec:** Canvas agentow MORFUJE sie w dashboard. Nody agentow nie znikaja -- one animuja sie do swoich nowych pozycji w gridzie monitoringu.

**Implementacja:**
- Krok 1: Sidebary (lewy/prawy) sliduja na boki (`transform: translateX(-100%/+100%)`, `300ms ease-out`)
- Krok 2: Bottom bar morphuje w phase timeline bar (zmiana height + content fade)
- Krok 3: Agent nodes na canvasie animuja pozycje (FLIP technique: First, Last, Invert, Play) z current canvas positions do grid positions w monitorze
- Krok 4: Topbar upraszcza sie -- textarea znika, pojawia sie HUD z metryki
- Krok 5: Background dimming -- starfield intensyfikuje sie (wiecej gwiazd, wolniejsze orbity orbow)

**Czas trwania:** 400-600ms calosciowo, z staggered delays 50-80ms per element.

#### B) NASA Mission Control: "Station Lock"
Inspiracja: [NASA OpenMCT](https://nasa.github.io/openmct/) -- framework do wizualizacji danych misji.

**Wzorzec:** Fullscreen overlay nakladany NA canvas (nie zastepujacy go). Canvas widoczny jako rozmyte tlo pod polprzezroczystymi panelami.

**Implementacja:**
- Monitor overlay wjezdza od dolu (`transform: translateY(100%)` -> `translateY(0)`)
- Canvas w tle dostaje `filter: blur(8px); opacity: 0.3`
- Glassmorphism panele monitoringu ukladaja sie w bento grid NAD canvasem
- User widzi "duchy" swoich agentow pod dashboardem -- zachowuje kontekst przestrzenny

#### C) Trading Platform: "Focus Mode"
Inspiracja: Bloomberg Terminal, TradingView -- przejscie z overview do focused instrument view.

**Wzorzec:** Zoom-in transition. Caly canvas skaluje sie i przesuwa, az jeden "viewport" staje sie fullscreen.

**Implementacja:**
- Canvas `transform: scale(1.5) translate(...)` -- zoom na centralny klaster agentow
- Jednoczesnie overlay metryczny i statusowy pojawiaja sie na bokach
- Parallax depth: rozne warstwy animuja sie z rozna predkoscia

#### D) Streaming Dashboard: "Cinematic Entry"
Inspiracja: Twitch Studio, OBS overlay transitions.

**Wzorzec:** Dramatyczne wejscie z animacja tytulowa, nastepnie reveal dashboard.

**Implementacja:**
- Typewriter text: "LIVE MONITOR | Deep Five Minds Protocol" (juz w v18)
- Background pulse: mesh gradient intensyfikuje kolory na 200ms
- Staggered panel reveal: panels wjezdzaja jeden po drugim z `opacity: 0; transform: translateY(20px)` z delay 50ms each

### 1.3 Rekomendacja

**Podejscie hybrydowe: "Morphing Station Lock"**

Polaczenie wzorcow A + B:
1. Sidebary sliduja na boki (300ms)
2. Canvas blur + dim (200ms, rownolegle)
3. Monitor overlay `translateY(100%)` -> `translateY(0)` (400ms, cubic-bezier(0.16, 1, 0.3, 1))
4. Agent nodes w monitorze pojawiaja sie staggered (50ms delay each) z FLIP z ich pozycji na canvasie
5. Phase timeline morphuje z bottom bar (300ms)
6. HUD metryki fade-in w topbar (200ms)

**Powrot:** Reverse animacji. Klawisz `Escape` lub przycisk "X" w gornym prawym rogu z tooltipem "Wroc do edycji". Skrot klawiszowy `M` (jak w v18).

**Wazne:** Cala sekwencja musi byc skipowalna -- klik/klawisz podczas animacji natychmiast przeskakuje do stanu docelowego.

### 1.4 CSS View Transitions API

Nowoczesne przegladarki (Chrome 111+, Edge 111+) wspieraja [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions):

```css
::view-transition-old(monitor-panel) {
  animation: fade-out 300ms ease-out;
}
::view-transition-new(monitor-panel) {
  animation: slide-up 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

Pozwala to na automatyczne cross-fade miedzy stanami DOM bez manualnego zarzadzania animacjami. Warto rozwazyc jako progressive enhancement.

---

## 2. Agent Status Visualization

### 2.1 System statusow

Kazdy z 27 agentow moze byc w jednym z 7 stanow:

| Status | Kolor | Znaczenie |
|--------|-------|-----------|
| **idle** | `#52525B` (zinc-600) | Agent czeka na swoja faze |
| **queued** | `#818CF8` (indigo-400) | Agent w kolejce, zaraz zacznie |
| **working** | `#34D399` (emerald-400) | Agent aktywnie przetwarza |
| **thinking** | `#FBBF24` (amber-400) | Agent "mysli" -- analiza, deliberacja |
| **done** | `#22C55E` (green-500) | Agent zakonczyl swoje zadanie |
| **error** | `#F87171` (red-400) | Blad -- wymaga uwagi |
| **waiting-for-human** | `#F59E0B` (gold) + pulse | Agent czeka na decyzje usera |

### 2.2 Animacje statusow

#### idle -- Subtle Breathing
```css
@keyframes breathe-idle {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.65; transform: scale(1.02); }
}
/* Czas: 4s, ease-in-out, infinite */
```
- Delikatny "oddech" -- agent zyje ale nie pracuje
- Dim outer ring, brak glow
- Ikona: polprzezroczyste kolko statusu

#### queued -- Anticipation Pulse
```css
@keyframes pulse-queued {
  0%, 100% { box-shadow: 0 0 0 0 rgba(129,140,248,0.4); }
  50% { box-shadow: 0 0 0 8px rgba(129,140,248,0); }
}
/* Czas: 1.5s, ease-out, infinite */
```
- Powolny pulse indigo -- "zaraz zaczne"
- Ikona: zegar lub klepsydra (Unicode: &#x23F3;)

#### working -- Active Processing
```css
@keyframes spin-ring {
  to { transform: rotate(360deg); }
}
/* Ring obracajacy sie wokol noda: 1.2s, linear, infinite */
/* Dodatkowo: particle emission z krawedzi */
```
- Obracajacy sie ring wokol noda (swiatleczko obiegajace obwod jak loading)
- Glow: `box-shadow: 0 0 20px rgba(52,211,153,0.3)`
- Progress bar pod nodem (thin 2px bar)
- Ikona: obracajacy sie gear lub terminal cursor blinkujacy

#### thinking -- Deliberation Wave
```css
@keyframes think-wave {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
/* Gradient shimmer across node: 2s, linear, infinite */
```
- Shimmer/wave effect -- gradient przesuwajacy sie przez noda (jak skeleton loading)
- Trzy animowane kropki ("...") pod nodem
- Kolor amber -- wyroznia sie od zielonego "working"
- Ikona: mozg lub zarowka z pulsem

#### done -- Completion Burst
```css
@keyframes done-burst {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
/* Jednorazowa animacja: 400ms, cubic-bezier(0.34, 1.56, 0.64, 1) */
```
- Jednorazowy "burst" z checkmarkiem (zielony check pojawia sie z bounce)
- Ring pulsuje raz na zielono i zostaje jako solid green border
- Po 2s: agent lekko dimuje (opacity 0.7) -- nie jest juz glowna uwaga
- Ikona: checkmark w kolku

#### error -- Alert Shake
```css
@keyframes shake-error {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-3px); }
  40%, 80% { transform: translateX(3px); }
}
/* Shake: 400ms, jednorazowo; potem staly red glow */
```
- Jednorazowy shake + trwaly czerwony glow
- Pulsujacy czerwony ring (wolniejszy niz working -- 2s cykl)
- Badge z "!" w prawym gornym rogu noda
- Ikona: wykrzyknik w trojkacie

#### waiting-for-human -- Attention Beacon
```css
@keyframes beacon-human {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.5), 0 0 20px rgba(245,158,11,0.2); }
  50% { box-shadow: 0 0 0 12px rgba(245,158,11,0), 0 0 30px rgba(245,158,11,0.4); }
}
/* Duzy pulse: 1.5s, ease-in-out, infinite */
/* + floating hand/pointer icon nad nodem */
```
- Najbardziej intensywna animacja -- wymaga uwagi uzytkownika
- Podwojny ring pulse (inner + outer)
- Floating icon reki/pointera unosca sie nad nodem
- Badge "HITL" w kolorze gold
- Jesli w trybie monitoringu: dodatkowe migajace "DECISION REQUIRED" w panelu comms

### 2.3 Grupowanie aktywnych agentow

Gdy wiele agentow pracuje jednoczesnie (np. 4 agentow w fazie Build):

**Podejscie "Phase Cluster":**
- Agenty w tej samej fazie sa wizualnie zgrupowane (blizej siebie w gridzie monitora)
- Wspolny "phase container" z subtelnym border i label fazy
- Aktywne agenty w fazie maja polaczenia miedzy soba podswietlone (particle flow na liniach)
- Nieaktywne fazy sa dimmed (opacity 0.4)

**Podejscie "Activity Spotlight":**
- Agent ktory wlasnie "mowi" (ma speech bubble) jest powiekszony o 20%
- Jego polaczenia sa podswietlone
- Pozostale aktywne agenty maja lekki dim
- Po 2s bez aktywnosci: wraca do normalnego rozmiaru

**Podejscie "Wave Propagation":**
- Kiedy agent konczy i przekazuje prace nastepnemu, animacja "wave" biegnie po polaczeniu
- Particle (glowing orb) przesuwa sie od agenta A do agenta B wzdluz SVG path
- Agent B "budzi sie" (przejscie idle -> queued -> working) z cascade delay

### 2.4 Node Design w trybie Monitor

```
+------------------------------------------+
|  [SVG Icon]  Agent Name         [STATUS] |
|  Role subtitle                           |
|  +---------+  +-------------------------+|
|  | PROGRESS|  | Last message preview... ||
|  | ======  |  | "Analizuje strukture..."||
|  | 67%     |  +-------------------------+|
|  +---------+                             |
+------------------------------------------+
```

- Wieksze karty niz na canvasie (min 180x100px vs 48x48px node)
- Progress bar z procentem
- Last message preview (skrocony speech bubble)
- Status badge w prawym gornym rogu (kolor + ikona)
- Click -> expand do pelnego widoku agenta

---

## 3. HITL Decision Panels

### 3.1 Kontekst Five Minds Protocol

W Deep Five Minds Protocol sa 5 punktow Human-in-the-Loop:
1. Po fazie Strategy -- akceptacja planu
2. Po Five Minds Debate #1 -- wybor Gold Solution
3. Przed faza Build -- zatwierdzenie architektury
4. Po Five Minds Debate #2 -- akceptacja QA findings
5. Final approval -- deploy/reject

Kazdy HITL punkt wymaga od usera podjecia decyzji na podstawie debaty ekspertow.

### 3.2 Wzorce decision panels

#### A) Debate Arena Panel

**Layout:** Fullscreen overlay (80% viewport) z glassmorphism backdrop.

```
+------------------------------------------------------------+
|  DECISION REQUIRED                        [Skip] [Timer]   |
|  Five Minds Debate #1: Architektura systemu                |
|------------------------------------------------------------|
|                                                            |
|  +-- EXPERT CARDS (horizontal scroll) --+                  |
|  | [Pragmatist]  [Visionary]  [Critic]  [Mediator] [DA]   |
|  | "Monolith     "Mikroserwisy "Za drogi  "Kompromis "A co |
|  |  jest OK       daja scale"  na start"  na moduly" jesli |
|  |  na MVP"                                          ...?" |
|  +-----------------------------------------------------+  |
|                                                            |
|  +-- GOLD SOLUTION (wynik syntezy) ---+                    |
|  | Synthesizer proponuje: Modular Monolith                 |
|  | z przygotowaniem na przejscie do mikroserwisow          |
|  +------------------------------------+                    |
|                                                            |
|  [APPROVE Gold Solution]  [MODIFY]  [REQUEST RE-DEBATE]    |
|                                                            |
|  Confidence: [====|=====|====] 85%  "Jestem pewny"         |
|                                                            |
+------------------------------------------------------------+
```

**Expert Cards:**
- Kazdy ekspert ma karte z: awatar + SVG icon, imie i rola, kluczowy argument (1-2 zdania), confidence score (kolorowy badge)
- Karta Devil's Advocate ma czerwony accent -- wizualne odroznienie
- Klikniecie na karte -> expand z pelnym argumentem
- Karty sa horizontally scrollable (na mobile) lub grid 5-kolumnowy (desktop)

#### B) Side-by-Side Comparison

Gdy sa 2-3 konkurencyjne propozycje:

```
+-------------------------------------------------------+
|  COMPARE OPTIONS                                      |
|-------------------------------------------------------|
|  Option A          | Option B          | Option C     |
|  Monolith          | Microservices     | Mod. Monolith|
|-------------------------------------------------------|
|  Cost: $$$         | Cost: $$$$$       | Cost: $$$$   |
|  Time: 2 tyg       | Time: 6 tyg       | Time: 3 tyg  |
|  Scale: Low        | Scale: High       | Scale: Med+  |
|  Risk: Low         | Risk: High        | Risk: Med    |
|-------------------------------------------------------|
|  [STRENGTHS]       | [STRENGTHS]       | [STRENGTHS]  |
|  - Prostosc        | - Skalowalnosc    | - Balans     |
|  - Szybkosc dev    | - Niezaleznosc    | - Ew. migr.  |
|-------------------------------------------------------|
|  [SELECT]          | [SELECT]          | [SELECT *]   |
|                    |                   | Recommended  |
+-------------------------------------------------------+
```

**Design considerations:**
- Rekomendowana opcja ma subtle highlight (gold border, star badge)
- Metryki porownawcze sa kolorowane (zielony = lepiej, czerwony = gorzej)
- Hover na kolumnie -> podswietlenie calej kolumny
- Mobile: swipeable horizontal cards zamiast tabeli

#### C) Voting UI -- Quick Approval

Dla prostych decyzji (approve/reject):

```
+--------------------------------------------+
|  [Synthesizer icon] Gold Solution Ready     |
|                                            |
|  "Modular Monolith z API Gateway..."       |
|  [Pokaz pelny opis v]                      |
|                                            |
|  +------------------+ +------------------+ |
|  | APPROVE          | | ODRZUC           | |
|  | [Checkmark]      | | [X]              | |
|  | Akceptuje plan   | | Chce re-debate   | |
|  +------------------+ +------------------+ |
|                                            |
|  [?] Nie jestem pewny -- pokaz wiecej      |
+--------------------------------------------+
```

**Implementacja:**
- Duze, czytelne przyciski (min 120x80px touch target)
- Approve: zielony gradient, checkmark icon
- Reject: czerwony border, X icon
- "Nie jestem pewny": trzecia opcja prowadzaca do Debate Arena Panel
- Keyboard shortcuts: `A` = approve, `R` = reject, `D` = debate details

#### D) Confidence Slider

Wzorce z [Agentic Design Patterns](https://agentic-design.ai/patterns/ui-ux-patterns/confidence-visualization-patterns):

```
How confident are you in this decision?

[Very Unsure] ====|========== [Very Sure]
                  ^
              Currently: 72%

Mapping:
  0-30%  = "Nie jestem pewny, potrzebuje wiecej info"
  31-60% = "Mam watpliwosci, ale akceptuje warunkowo"
  61-85% = "Dobrze to wyglada, zatwierdzam"
  86-100% = "W pelni przekonany"
```

**Design:**
- Slider z kolorowym gradient fill (czerwony -> zolty -> zielony)
- Label zmienia sie dynamicznie w zaleznosci od pozycji
- Wartosc zapisywana w logu -- przydatna do analizy decision quality
- Opcjonalna (nie blokuje decision flow)

### 3.3 Rekomendacja: Decision Flow

1. Agent wchodzi w stan `waiting-for-human` -> beacon animation
2. Monitor panel wyswietla notification bar (gold, pulsating): "DECISION REQUIRED at [phase name]"
3. Klikniecie -> Debate Arena Panel (fullscreen overlay)
4. User przeglaada expert cards, moze kliknac "Compare Options" dla side-by-side
5. User klika Approve/Modify/Re-Debate
6. Opcjonalnie: confidence slider
7. Decision logged w Dialog Timeline z timestampem i confidence
8. Animacja "decision confirmed" -- burst + swoosh, overlay zamyka sie
9. Agenty wznowiaja prace

### 3.4 Czasowy aspekt decyzji

- Timer (opcjonalny): "Auto-approve in 60s" -- jesli user nie reaguje, system kontynuuje z rekomendacja
- Timer wizualny: circular progress wokol przycisku approve
- User moze wylaczyc auto-approve w ustawieniach
- Debata ekspertow jest widoczna PRZED osiagnieciem HITL point (user moze czytac w czasie rzeczywistym)

---

## 4. Information Hierarchy

### 4.1 Model "Glanceable > Scannable > Deep Dive"

Trzy poziomy glebokosci informacji:

#### Poziom 1: GLANCEABLE (zawsze widoczne, < 1 sekunda)
Informacje ktore user musi widziec NATYCHMIAST:

| Element | Pozycja | Format |
|---------|---------|--------|
| Aktualna faza | Topbar, srodek | Badge z nazwa + numer (np. "3/6 Five Minds #1") |
| Progress % | Topbar, obok fazy | Circular progress ring (mini, 24px) |
| Czas trwania | Topbar, prawy | Monospace timer "04:23" |
| Aktywni agenci | Topbar, lewy | Count badge: "5/27 active" |
| HITL alert | Topbar, wycentrowany | Pulsujacy gold badge "DECISION" (gdy potrzebny) |
| Status symulacji | Topbar, skrajnie lewy | Dot indicator: zielony=running, zolty=paused, czerwony=error |

**Topbar HUD (46px):**
```
[LIVE *] | Phase 3/6: Five Minds #1 | [===67%===] | 04:23 | 5/27 agents | [$12.40]
```

#### Poziom 2: SCANNABLE (widoczne w panelach, 3-5 sekund)

| Element | Pozycja | Format |
|---------|---------|--------|
| Agent grid ze statusami | Glowny obszar | Bento grid z kartami agentow |
| Phase timeline | Dol ekranu | Horizontal stepper z 6 fazami |
| Ostatnie 3 wiadomosci | Prawy panel (collapsible) | Speech bubbles z avatar + timestamp |
| Aktywne polaczenia | Overlay na gridzie | Podswietlone linie miedzy aktywnymi agentami |

#### Poziom 3: DEEP DIVE (on-demand, klikniecie/hover)

| Element | Trigger | Format |
|---------|---------|--------|
| Pelny comms log | Klik na prawy panel "Expand" | Fullscreen overlay z filtrami po agencie/fazie |
| Agent detail | Klik na agent card | Slide-out panel z: prompt, connections, history, metrics |
| Architecture diagram | Klik na "View Architecture" | Overlay z obecnym diagramem systemu (generowanym) |
| Cost breakdown | Klik na cost badge | Dropdown: cost per agent, per phase, cumulative chart |
| Decision history | Klik na "Decisions" w timeline | Lista wszystkich HITL decisions z outcomes |

### 4.2 Layout monitora

```
+------------------------------------------------------------------+
| [LIVE] | Phase 3/6: FM#1 | [===67%] | 04:23 | 5/27 | [$12.40]  | <- Topbar HUD
+------------------------------------------------------------------+
|                                                                  |
|  +--PHASE: STRATEGY (done)--+ +--PHASE: RESEARCH (done)--+     |
|  | [Orkiestr.  ] [Planista ] | | [Researcher] [Anal.Deep]|     |
|  | [done]        [done]     | | [done]       [done]      |     |
|  +---------------------------+ +--------------------------+     |
|                                                                  |
|  +--PHASE: FIVE MINDS #1 (active)--------+   +--COMMS LOG-----+|
|  | [Pragmatist ] [Visionary] [Critic    ] |   | 04:21 Pragm:   ||
|  | [working   ]  [thinking]  [queued    ] |   | "Proponuje..." ||
|  | [Mediator  ] [Devil's Adv] [Synthes. ] |   | 04:22 Vision:  ||
|  | [queued    ]  [queued    ] [idle      ] |   | "A moze..."    ||
|  +----------------------------------------+   | 04:23 Critic:  ||
|                                               | "Problem z..." ||
|  +--PHASE: BUILD (upcoming)--+ +--QA---+     +----------------+|
|  | [Backend  ] [Frontend   ] | |[QA Sec]|                      |
|  | [idle     ]  [idle      ] | |[idle  ]|                      |
|  +---------------------------+ +--------+                      |
|                                                                  |
+------------------------------------------------------------------+
| [STRAT *] --- [RESEARCH *] --- [FM#1 -->] --- [BUILD] --- ...   | <- Phase Timeline
+------------------------------------------------------------------+
```

### 4.3 Phase Timeline Design

Horizontal stepper w dolnej czesci ekranu (60px height):

- 6 fazow jako connected nodes
- **Completed:** Solid green dot + checkmark, green connector line
- **Active:** Large pulsing dot (indigo/emerald gradient), glowing connector
- **Upcoming:** Hollow grey dot, grey dashed connector
- Klik na faze -> filtruje grid agentow do tej fazy
- Hover -> tooltip z: nazwa, czas trwania, agent count, status

Inspiracja: [PatternFly Progress Stepper](https://www.patternfly.org/components/progress-stepper/design-guidelines/) + [Dribbble Progress Steps Collection](https://dribbble.com/bcirilo/collections/3946413-Progress-Steps-Path-Timelines)

### 4.4 Comms Log Design

Prawy panel (collapsible, 280px width):

- Reverse chronological (najnowsze na gorze)
- Kazdy wpis: `[timestamp] [agent avatar+name]: "message preview..."`
- Kolorowanie po typie: agent message = default, HITL = gold, error = red, phase change = indigo
- Filter pills na gorze: "All | Strategy | Research | FM#1 | ..."
- Click-to-focus: klikniecie na wiadomosc podswietla agenta w gridzie
- Scroll isolation: wheel scrollowanie nie propaguje do rodzica
- Matrix-style scrolling text (opcjonalny tryb "cinematic" z v18)

---

## 5. Micro-interactions i Animacje

### 5.1 Data Flow Animations

#### Particle Stream na polaczeniach
Gdy agent A wysyla dane do agenta B:
- **Glowing orbs** (3-5px) przesuwaja sie wzdluz SVG path polaczenia
- Kolor particles = kolor fazy (indigo dla strategy, emerald dla build, itp.)
- Predkosc: 200px/s -- wystarczajaco wolno zeby oko moglo sledzic
- Multiple particles z staggered delay (co 200ms nowy particle)
- Glow filter na SVG: `<feGaussianBlur stdDeviation="2">` + `<feColorMatrix>`

```css
@keyframes particle-flow {
  0% { offset-distance: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}
.particle {
  offset-path: path('M...'); /* SVG path polaczenia */
  animation: particle-flow 2s linear infinite;
}
```

#### Energy Line (Always-on Connection)
Inspiracja z v14: Orkiestrator i Syntetyk maja "energy line" -- stale podswietlone polaczenie:
- Animated dashed stroke: `stroke-dasharray: 8 4; stroke-dashoffset` animowany
- Subtelny glow: `filter: drop-shadow(0 0 4px rgba(129,140,248,0.4))`
- Grubszy stroke niz zwykle polaczenia (3px vs 1px)

### 5.2 Phase Transition Effects

Gdy symulacja przechodzi z jednej fazy do nastepnej:

1. **Announcement:** Nazwe nowej fazy wyswietlona centrycznie z fade-in + scale (300ms)
2. **Previous phase dim:** Agenty z poprzedniej fazy animuja: `opacity: 1` -> `0.4`, border kolor -> grey (500ms)
3. **Checkmark sweep:** Po kolei (stagger 100ms) poprzednie agenty dostaja green checkmark
4. **New phase spotlight:** Nowa faza "rozswietla sie" -- border glow, agenty transituja `opacity: 0.4` -> `1` (300ms stagger)
5. **Connection activation:** Polaczenia nowej fazy animuja sie (stroke-dasharray reveal od zrodla do celu)
6. **Phase dot update:** W timeline dolnym stepper, nowy dot staje sie aktywny (pulse begin)

**Czas calosciowy:** ~1200ms. **Skipowalne** kliknieciem.

### 5.3 Agent "Thinking" Animations

Trzy poziomy wizualnej zlozonosci:

#### Minimal (domyslny):
- Trzy animowane kropki pod nodem: `. . .` z staggered opacity
- Shimmer gradient na karcie agenta

#### Standard:
- Floating "thought fragments" -- male semi-transparent ikony (zarowka, pytajnik, gear) unoszace sie wokol noda
- Orbiting dot -- mala kropka krazy wokol agenta jak satelita

#### Cinematic (opt-in):
- "Neural network" visualization -- losowe linie rysuja sie wokol agenta i znikaja
- Particle burst co 2s -- impuls "insight"
- Background za agentem lekko jasniejacy (spotlight effect)

### 5.4 Success / Failure Celebrations

#### Phase Complete:
- Confetti burst z centru ukonczonych agentow (lekki, 20-30 particles, 800ms)
- Sound effect (opcjonalny): subtelny "ding"
- Phase label w timeline: bounce + green flash

#### Simulation Complete (Full Success):
- Wiekszy confetti z srodka ekranu (50-80 particles, 1500ms)
- Tekst "SIMULATION COMPLETE" z typewriter + glow
- Wszystkie agenty pulse raz na zielono jednoczesnie
- Statystyki summary slide-in od dolu: total time, total tokens, decisions made, phases completed
- Inspiracja: [Asana celebration unicorn](https://medium.com/design-bootcamp/10-micro-interaction-patterns-that-make-users-subconsciously-love-your-product-3c341c78acb4)

#### Error / Failure:
- Shake na calym agent gridzie (1 subtle shake, 200ms)
- Red flash na topbar (border-bottom pulse red)
- Error agent gets spotlight + enlarged card z error message
- "ALERT" notification w comms log z red badge

### 5.5 Speech Bubble Animations

Rozszerzenie obecnych speech bubbles (z v14):

- **Entrance:** `opacity: 0; transform: translateY(10px) scale(0.95)` -> `1, translateY(0) scale(1)` (250ms, cubic-bezier(0.34, 1.56, 0.64, 1))
- **Typing indicator:** Trzy pulsujace kropki PRZED pojawieniem sie tekstu (200-500ms delay)
- **Exit:** `opacity: 1` -> `0` z `transform: translateY(-5px)` (200ms) po 3s display
- **Chain:** Gdy wielu agentow mowi szybko -- bubbles staggered (300ms apart), previous dimuje (opacity 0.6)

### 5.6 Hover i Focus Micro-interactions

- **Agent card hover:** Lekki lift (`translateY(-2px)`) + border glow intensyfikuje
- **Agent card click:** Ripple effect z punktu klikniecia
- **Button hover:** Background gradient shift + subtle scale(1.02)
- **Phase dot hover:** Tooltip pojawia sie z bounce-in (200ms)
- **Comms entry hover:** Highlightuje odpowiedniego agenta w gridzie (golden outline flash)

---

## 6. Accessibility w Dark Immersive UI

### 6.1 WCAG 2.1 AA -- Kontrast

**Minimalne ratio:**
- Normal text (< 18px): **4.5:1** kontrastowe ratio
- Large text (>= 18px bold lub >= 24px regular): **3:1**
- UI components (borders, icons): **3:1**

**Weryfikacja obecnej palety na tle `#06060A` (bg0):**

| Token | Kolor | Ratio vs bg0 | WCAG AA |
|-------|-------|-------------|---------|
| `--t1` | #E4E4E7 | **16.5:1** | PASS |
| `--t2` | #71717A | **4.8:1** | PASS (normal text) |
| `--t3` | #52525B | **3.3:1** | PASS (large text only) |
| `--accent1` | #818CF8 | **5.2:1** | PASS |
| `--accent2` | #34D399 | **8.7:1** | PASS |
| `--accent3` | #FBBF24 | **9.4:1** | PASS |
| `--accent4` | #F87171 | **4.6:1** | PASS (borderline) |

**Uwaga:** `--t3` (#52525B) na `--bg0` (#06060A) ma ratio 3.3:1 -- OK dla large text i UI components, ale **NIE** dla small body text. Uzywac wylacznie jako secondary/disabled text w rozmiarze >= 18px bold lub >= 24px.

**Rekomendacja:** Dla statusu "idle" uzyc `#71717A` (t2) zamiast `#52525B` (t3) jesli tekst jest < 18px.

### 6.2 Redukcja ruchu -- `prefers-reduced-motion`

Obowiazkowe respektowanie ustawien systemowych ([WCAG 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)):

```css
@media (prefers-reduced-motion: reduce) {
  /* Wylacz animacje dekoracyjne */
  .bg-orb, .shooting-star { animation: none !important; opacity: 0.08; }
  .particle { animation: none !important; display: none; }
  
  /* Zachowaj funkcjonalne tranzycje, ale zredukuj czas */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.1s !important;
  }
  
  /* Status indicators: static instead of animated */
  [data-status="working"] { border: 2px solid var(--accent2); }
  [data-status="thinking"] { border: 2px dashed var(--accent3); }
  [data-status="waiting-for-human"] { border: 3px solid var(--gold); }
  
  /* Zachowaj informacyjne tranzycje */
  .phase-transition { transition: opacity 0.1s; }
}
```

**In-app control:** Dodac przycisk "Reduce Motion" w settings -- niezalezny od ustawien systemowych. Ikona: symbol "play/pause" dla animacji. Zapis w localStorage.

### 6.3 Focus Management

- **Keyboard navigation:** Pelna obsluga `Tab` / `Shift+Tab` przez wszystkie interaktywne elementy
- **Focus visible:** Wyrazny focus ring -- `outline: 2px solid var(--accent1); outline-offset: 2px`
- **Focus trap w overlayach:** Decision panel i fullscreen overlays musza trapowac focus (user nie moze tab-em wyjsc za overlay)
- **Skip links:** "Skip to main content" na poczatku DOM (ukryty, widoczny on focus)
- **ARIA live regions:** Comms log i status updates jako `aria-live="polite"`, HITL alerts jako `aria-live="assertive"`

```html
<div role="status" aria-live="polite" class="sr-only" id="agent-status-announcer">
  <!-- JS dynamicznie updatuje: "Agent Pragmatist zmienil status na working" -->
</div>
<div role="alert" aria-live="assertive" class="sr-only" id="hitl-announcer">
  <!-- "Decision required: Five Minds Debate #1 complete. Approve Gold Solution?" -->
</div>
```

### 6.4 Kontrast animowanych elementow

Problem: glassmorphism (`backdrop-filter: blur`) moze powodowac nieczytelnosc tekstu gdy tlo jest dynamiczne (floating orbs).

**Rozwiazanie:**
- Minimalny `background: rgba(15,15,24, 0.85)` na panelach z tekstem (obecne w v21 -- dobrze)
- Dodac fallback solid background gdy `backdrop-filter` nie jest wspierane: `background: #0F0F18`
- Tekst na glassmorphism panelach: ZAWSZE `--t1` (#E4E4E7), nigdy `--t2`
- Status badges: kolor tla + bialy tekst, nie sam kolor tekstu

### 6.5 Alternatywne wskazniki statusu

Nie polegac WYLACZNIE na kolorze (WCAG 1.4.1 -- Use of Color):

| Status | Kolor | Ikona | Ksztalt | Label text |
|--------|-------|-------|---------|------------|
| idle | grey | `○` puste kolko | circle, dashed border | "Idle" |
| queued | indigo | `◷` zegar | circle, dotted border | "Queued" |
| working | green | `⟳` rotating | circle, solid animated | "Working" |
| thinking | amber | `💡` zarowka | circle, shimmer | "Thinking" |
| done | green | `✓` checkmark | circle, solid | "Done" |
| error | red | `⚠` trojkat | triangle, solid | "Error" |
| HITL | gold | `✋` reka | diamond, pulsing | "Waiting" |

Kazdy status komunikowany przez MINIMUM 3 kanaly: kolor + ikona + animacja (lub ksztalt).

### 6.6 Tekst i typografia

- Minimalny rozmiar body text: **12px** (aktualnie 11px w niektorych miejscach -- rozwazyc zwiekszenie)
- Line-height: minimum **1.4** dla czytelnosci
- Font: Inter 400 dla body, Space Grotesk 600+ dla headings -- dobre wybory, czytelne
- JetBrains Mono dla danych/metryk -- monospace wspiera skanowalnosc liczbowa
- Unikac ALL CAPS na dluzszych tekstach (> 3 slowa) -- utrudnia czytanie

---

## 7. Design System Summary

### 7.1 Paleta kolorow

```
BACKGROUNDS:
  --bg0: #06060A     (main background -- deep space)
  --bg1: #0F0F18     (panel backgrounds)
  --bg-glass: rgba(15,15,24,0.85)  (glassmorphism panels)
  --bg3: #1E1E3A     (elevated surfaces)

ACCENT (functional):
  --accent1: #818CF8  (indigo -- primary action, strategy phase)
  --accent2: #34D399  (emerald -- success, build phase, working status)
  --accent3: #FBBF24  (amber -- warning, thinking status)
  --accent4: #F87171  (red -- error, danger, reject)
  --gold: #F59E0B     (gold -- HITL, Five Minds, special)

TEXT:
  --t1: #E4E4E7  (primary text -- 16.5:1 contrast)
  --t2: #71717A  (secondary text -- 4.8:1 contrast)
  --t3: #52525B  (disabled/dim -- 3.3:1, large text only)

STATUS COLORS:
  --status-idle: #71717A
  --status-queued: #818CF8
  --status-working: #34D399
  --status-thinking: #FBBF24
  --status-done: #22C55E
  --status-error: #F87171
  --status-hitl: #F59E0B

PHASE COLORS (nowe -- per phase):
  --phase-strategy: #818CF8   (indigo)
  --phase-research: #06B6D4   (cyan)
  --phase-fiveminds: #F59E0B  (gold)
  --phase-build: #34D399      (emerald)
  --phase-qa: #F87171         (red)
```

### 7.2 Typografia

```
HEADINGS: 'Space Grotesk', sans-serif
  - h1: 24px / 700 / letter-spacing: -0.02em
  - h2: 18px / 700 / letter-spacing: -0.01em
  - h3: 14px / 600

BODY: 'Inter', sans-serif
  - body: 13px / 400 / line-height: 1.5
  - small: 11px / 400 / line-height: 1.4
  - caption: 10px / 500 / uppercase / letter-spacing: 0.08em

MONO: 'JetBrains Mono', monospace
  - metrics: 12px / 500 (tabular-nums)
  - code: 11px / 400
  - timer: 16px / 600
```

### 7.3 Spacing

```
SPACING SCALE (based on 4px grid):
  xs:  4px   (padding inline tight)
  sm:  8px   (gap between items)
  md: 12px   (panel padding, card gap)
  lg: 16px   (section spacing)
  xl: 24px   (major section breaks)
  2xl: 32px  (hero spacing)
```

### 7.4 Border Radius

```
  sharp:  4px  (badges, tags)
  base:   8px  (buttons, inputs)
  card:  12px  (cards, panels)
  modal: 16px  (overlays, modals)
  pill:  999px (pill badges)
```

### 7.5 Animacje -- Timing Reference

```
DURATIONS:
  instant:   100ms  (hover feedback, color change)
  fast:      200ms  (button press, tooltip appear)
  normal:    300ms  (panel slide, fade transitions)
  moderate:  400ms  (overlay entry, card expansion)
  slow:      600ms  (fullscreen transition, phase change)
  dramatic: 1000ms  (celebration, major state change)

EASING:
  default:     ease-out (most UI elements)
  bounce:      cubic-bezier(0.34, 1.56, 0.64, 1) (success, celebration)
  smooth-out:  cubic-bezier(0.16, 1, 0.3, 1) (overlay entry, slide)
  spring:      cubic-bezier(0.175, 0.885, 0.32, 1.275) (playful elements)
  linear:      linear (continuous animations: rotation, particle flow)

STAGGER:
  tight:   30ms  (list items, rapid cascade)
  normal:  50ms  (card grid reveal)
  loose:   80ms  (phase agents appearance)
  relaxed: 150ms (dramatic sequential reveal)
```

### 7.6 Glassmorphism Tokens

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

/* Fallback for no backdrop-filter support */
@supports not (backdrop-filter: blur(20px)) {
  .glass-panel { background: #0F0F18; }
}
```

### 7.7 Z-Index Scale

```
  canvas:        1   (agent nodes, connections)
  floating-orbs: 0   (background decoration)
  topbar:      100   (navigation, HUD)
  sidebar:      50   (left/right panels)
  overlay:     200   (decision panels, details)
  modal:       300   (HITL decision, fullscreen)
  toast:       400   (notifications)
  tooltip:     500   (hover info)
```

---

## 8. Zrodla i inspiracje

### Fullscreen Transitions & Motion Design
- [Ripplix -- Ultimate UI Animation Guide 2026](https://www.ripplix.com/blog/ultimate-ui-animation-guide-for-2026-from-static-screens-to-immersive-experiences)
- [Loma Technology -- Motion UI Trends 2026](https://lomatechnology.com/blog/motion-ui-trends-2026/2911)
- [PrimoTech -- UI/UX Evolution 2026: Micro-Interactions & Motion](https://primotech.com/ui-ux-evolution-2026-why-micro-interactions-and-motion-matter-more-than-ever/)
- [Game UI Database](https://www.gameuidatabase.com/) -- baza referencji HUD/overlay z gier
- [Punchev -- Transforming Game Interfaces with Animated UI](https://punchev.com/blog/transforming-game-interfaces-with-animated-ui)

### Agent & Dashboard Design
- [Agentic Design Patterns -- UI/UX Patterns](https://agentic-design.ai/patterns/ui-ux-patterns)
- [Fuselab -- UI Design for AI Agents](https://fuselabcreative.com/ui-design-for-ai-agents/)
- [Smashing Magazine -- Designing for Agentic AI: Practical UX Patterns](https://www.smashingmagazine.com/2026/02/designing-agentic-ai-practical-ux-patterns/)
- [UXmatters -- Designing for Autonomy: UX Principles for Agentic AI](https://www.uxmatters.com/mt/archives/2025/12/designing-for-autonomy-ux-principles-for-agentic-ai.php)
- [Microsoft Design -- UX Design for Agents](https://microsoft.design/articles/ux-design-for-agents/)
- [Codewave -- Designing User Interfaces for Agentic AI](https://codewave.com/insights/designing-agentic-ai-ui/)

### NASA Mission Control
- [NASA OpenMCT -- Open Source Mission Control](https://nasa.github.io/openmct/)
- [NASA OpenMCT GitHub](https://github.com/nasa/openmct)
- [Dribbble -- NASA Dashboard Concept by Lay](https://dribbble.com/shots/25577101-NASA-Dashboard-Concept)

### Glassmorphism & Visual Design
- [Dark Glassmorphism: The Aesthetic That Will Define UI in 2026 (Medium)](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f)
- [Behance -- Glassmorphism Dashboard Projects](https://www.behance.net/search/projects/GLASSMORPHISM%20DASHBOARD)
- [Dribbble -- Monitoring Dashboard](https://dribbble.com/search/monitoring-dashboard)
- [Dribbble -- Glassmorphism Dashboard](https://dribbble.com/search/Glassmorphism-dashboard)
- [Apple -- Liquid Glass Design (WWDC 2025)](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [EverydayUX -- Glassmorphism in 2025: Apple's Liquid Glass](https://www.everydayux.net/glassmorphism-apple-liquid-glass-interface-design/)

### HITL & Decision UX
- [Agentic Design -- Confidence Visualization Patterns](https://agentic-design.ai/patterns/ui-ux-patterns/confidence-visualization-patterns)
- [AI UX Design Guide -- Confidence Visualization](https://www.aiuxdesign.guide/patterns/confidence-visualization)
- [The "Confidence UI" Pattern That Users Actually Trust (Medium)](https://medium.com/@Modexa/the-confidence-ui-pattern-that-users-actually-trust-ff27e1a8a956)
- [Ideafloats -- Human-in-the-Loop AI in 2025](https://blog.ideafloats.com/human-in-the-loop-ai-in-2025/)
- [Aufait UX -- Human in the Loop UX](https://www.aufaitux.com/blog/human-in-the-loop-ux/)
- [Microsoft Research -- Magentic-UI: Human-in-the-loop Agentic Systems](https://www.microsoft.com/en-us/research/wp-content/uploads/2025/07/magentic-ui-report.pdf)
- [LogRocket -- How to Design Feature Comparison Tables](https://blog.logrocket.com/ux-design/ui-design-comparison-features/)
- [Smashing Magazine -- Decision Trees for UI Components](https://www.smashingmagazine.com/2024/05/decision-trees-ui-components/)

### Status Indicators & Micro-interactions
- [Snippflow -- CSS Status Indicators with Pulsing Animation](https://snippflow.com/snippet/css-status-indicators-with-pulsing-animation/)
- [CSS3Shapes -- Pulsing Live Indicator](https://css3shapes.com/how-to-make-a-pulsing-live-indicator/)
- [Beta Soft Technology -- Motion UI Trends 2025: Micro-Interactions](https://www.betasofttechnology.com/motion-ui-trends-and-micro-interactions/)
- [BricxLabs -- 12 Micro Animation Examples 2025](https://bricxlabs.com/blogs/micro-interactions-2025-examples)
- [Techtio -- Microinteractions and Microanimations in UX Design 2025](https://techtio.io/blog/not-just-eye-candy-how-microanimations-boost-ux-in-2025/)
- [NN/g -- Microinteractions in User Experience](https://www.nngroup.com/articles/microinteractions/)

### Progress & Timeline
- [PatternFly -- Progress Stepper Design Guidelines](https://www.patternfly.org/components/progress-stepper/design-guidelines/)
- [Dribbble -- Progress + Steps + Path + Timelines Collection](https://dribbble.com/bcirilo/collections/3946413-Progress-Steps-Path-Timelines)
- [Eleken -- 32 Stepper UI Examples](https://www.eleken.co/blog-posts/stepper-ui-examples)
- [Medium -- Beyond the Progress Bar: The Art of Stepper UI Design](https://medium.com/@david.pham_1649/beyond-the-progress-bar-the-art-of-stepper-ui-design-cfa270a8e862)

### Particle & SVG Animation
- [CSS Script -- 10 Best Particles Animation JavaScript Libraries (2026)](https://www.cssscript.com/best-particles-animation/)
- [Speckyboy -- 10 Beautiful Examples of Particle Animation](https://speckyboy.com/particle-animation-code-snippets/)
- [Colorlib -- 18 Best SVG Animation Examples](https://colorlib.com/wp/svg-animations-examples/)
- [CSS-Tricks -- Playing With Particles Using the Web Animations API](https://css-tricks.com/playing-with-particles-using-the-web-animations-api/)

### Accessibility
- [W3C -- WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [W3C -- Understanding WCAG 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [W3C -- CSS prefers-reduced-motion technique](https://www.w3.org/WAI/WCAG21/Techniques/css/C39)
- [Accessibility Checker -- Dark Mode Accessibility Guide](https://www.accessibilitychecker.org/blog/dark-mode-accessibility/)
- [Medium -- Designing Accessible Dark Mode: WCAG-Compliant Redesign](https://medium.com/@design.ebuniged/designing-accessible-dark-mode-a-wcag-compliant-interface-redesign-0e0225833aa4)
- [Raw.Studio -- Designing Inclusive Dark Modes](https://raw.studio/blog/designing-inclusive-dark-modes-enhancing-accessibility-and-user-experience/)
- [Pope Tech -- Design Accessible Animation and Movement](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/)
- [Humbl Design -- 2026 Accessibility SaaS Guide to WCAG 2.2 and APCA](https://humbldesign.io/blog-posts/color-accessibility-guide-wcag)

### Celebration & Completion UX
- [BricxLabs -- 7 Success Message UX Examples](https://bricxlabs.com/blogs/success-message-ux-examples)
- [Behance -- Confetti Animation (Order Success Page)](https://www.behance.net/gallery/126477533/Confetti-animation-(Order-success-page))
- [Medium -- 10 Micro-Interaction Patterns That Make Users Love Your Product](https://medium.com/design-bootcamp/10-micro-interaction-patterns-that-make-users-subconsciously-love-your-product-3c341c78acb4)

---

*Raport przygotowany przez Researcher UX w ramach Deep Five Minds Protocol. Gotowy do review przez Devil's Advocate i synteze przez Synthesizer.*
