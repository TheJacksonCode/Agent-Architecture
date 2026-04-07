# 14_DESIGNER.md -- Kompletna Specyfikacja Wizualna Live Monitor Mode
## Agent Teams Configurator v22

**Rola:** Designer [OPUS] | Deep Five Minds Protocol -- faza BUILD
**Data:** 2026-04-04
**Zrodla:** 13_GOLD_SOLUTION.md, 02_RESEARCHER_UX.md, MANIFEST.md, v21 codebase
**Cel:** Pixel-perfect design spec -- developer koduje BEZ zgadywania

---

## Spis tresci

1. [Layout Master](#1-layout-master)
2. [Color System](#2-color-system)
3. [Component Design](#3-component-design)
4. [Animation Specifications](#4-animation-specifications)
5. [Typography Scale](#5-typography-scale)
6. [Transition Design](#6-transition-design)
7. [Responsive Breakpoints](#7-responsive-breakpoints)
8. [Accessibility Spec](#8-accessibility-spec)
9. [Z-Index Map](#9-z-index-map)
10. [Spacing & Grid](#10-spacing--grid)

---

## 1. Layout Master

### 1.1 Fullscreen Layout (1920x1080 -- referencyjne)

```
+========================================================================+
|  TOPBAR HUD  (height: 48px, fixed top)                                |
|  [*LIVE] | Phase 3/6: FM#1 | [====67%====] | 04:23 | 5/27 | [STOP]  |
+========================================================================+
|                                                          |            |
|                                                          | COMMS LOG  |
|                  AGENT GRID                              | width:280px|
|                  (main area)                             | collapsible|
|                                                          |            |
|  +---STRATEGY (done, collapsed)-----+                    | [FM#1   v] |
|  | Ork[ok] | Plan[ok]      | 1m23s  |                   |            |
|  +-----------------------------------+                   | 04:21 Prag |
|                                                          | "Proponuje"|
|  +---RESEARCH (done, collapsed)-----+                    |            |
|  | Res[ok] | Anal[ok]      | 2m05s  |                   | 04:22 DA:  |
|  +-----------------------------------+                   | "Ale koszt"|
|                                                          |            |
|  +---FIVE MINDS #1 (ACTIVE, full)---+                   | 04:23 Vis: |
|  | [Pragmatyst] [Wizjoner] [Krytyk] |                   | "A moze    |
|  |  Working      Thinking   Queued  |                   |  mikro..." |
|  | [Mediator ] [Devil'sAdv] [Synth] |                   |            |
|  |  Queued      Queued      Idle    |                   |            |
|  +-----------------------------------+                   |            |
|                                                          |            |
|  +---BUILD (upcoming, dimmed)---+ +---QA (dimmed)---+   |            |
|  | Backend | Frontend | ...     | | QA Sec | ...    |   |            |
|  +------------------------------+ +-----------------+   |            |
|                                                          |            |
+========================================================================+
| PHASE TIMELINE BAR  (height: 56px, fixed bottom)                      |
| [STRAT *]----[RESEARCH *]----[FM#1 -->]----[BUILD]----[FM#2]----[QA]  |
+========================================================================+
```

### 1.2 Dokladne wymiary regionow (1920x1080)

| Region | Pozycja | Szerokosc | Wysokosc | CSS |
|--------|---------|-----------|----------|-----|
| **Monitor overlay** | fixed, inset: 0 | 100vw | 100vh | `position:fixed;inset:0;z-index:300;background:var(--bg0)` |
| **Topbar HUD** | top: 0, left: 0 | 100% | 48px | `position:fixed;top:0;left:0;right:0;height:48px;z-index:310` |
| **Agent Grid (main)** | top: 48px, left: 0 | calc(100% - 280px) | calc(100vh - 48px - 56px) | `position:fixed;top:48px;left:0;right:280px;bottom:56px;overflow-y:auto` |
| **Comms Log** | top: 48px, right: 0 | 280px | calc(100vh - 48px - 56px) | `position:fixed;top:48px;right:0;width:280px;bottom:56px` |
| **Phase Timeline** | bottom: 0, left: 0 | 100% | 56px | `position:fixed;bottom:0;left:0;right:0;height:56px;z-index:310` |
| **HITL Overlay** | centered | 80vw, max 960px | auto, max 80vh | `position:fixed;z-index:350;inset:0;display:flex;align-items:center;justify-content:center` |
| **Debate Arena** | centered | 90vw, max 1100px | auto, max 85vh | `position:fixed;z-index:350` |

### 1.3 Co jest widoczne ZAWSZE vs ON-DEMAND

#### ZAWSZE WIDOCZNE (Poziom 1 -- Glanceable)
| Element | Region | Opis |
|---------|--------|------|
| LIVE indicator | Topbar, skrajnie lewy | Pulsujacy czerwony dot + "LIVE" |
| Phase badge | Topbar, srodek-lewy | "Phase 3/6: Five Minds #1" |
| Progress bar | Topbar, srodek | Thin progress bar 200px |
| Timer | Topbar, srodek-prawy | "04:23" monospace |
| Active agents count | Topbar, prawy | "5/27" |
| STOP button | Topbar, skrajnie prawy | Czerwony, zawsze widoczny |
| Agent grid | Main area | Karty agentow pogrupowane wg faz |
| Phase timeline | Bottom bar | 6 fazowych dots z connectorami |

#### ON-DEMAND (Poziom 2+)
| Element | Trigger | Typ |
|---------|---------|-----|
| Comms Log expand | Klik na collapse toggle | Panel slide |
| Agent detail | Klik na agent card | Sidebar overlay |
| HITL Decision panel | Automatyczny na HITL point | Blocking modal |
| Debate Arena | HITL w fazie Five Minds | Fullscreen overlay |
| Pause/Resume controls | Hover na topbar | Fade-in |

### 1.4 ASCII -- Topbar HUD detail (48px)

```
+--+-----+---+------------------------+---+-----------+---+-------+---+------+---+--------+
|8 |[*]  | | | Phase 3/6: Five Minds  | | |[====67%] | | | 04:23 | | | 5/27 | | | [STOP] |
|px|LIVE | | | #1                     | | | 200px    | | |       | | |      | | |  72px  |
+--+-----+---+------------------------+---+-----------+---+-------+---+------+---+--------+
   48px   1px                          1px             1px         1px        1px
   gap=8       gap=12                       gap=12          gap=12      gap=12     gap=8

Padding: 0 16px
Height: 48px
Separator: 1px solid rgba(129,140,248,0.1), height: 24px, align: center
```

### 1.5 ASCII -- Agent Card in Grid (160x96)

```
+---------160px---------+
| [SVG] Agent Name  [S] |  <- 14px name, S = status dot 8px
| Role subtitle         |  <- 11px, t2 color
|                       |
| [============60%] 60% |  <- 2px progress bar + label
| "Analizuje strukt..." |  <- 11px, message preview, t2
+--------96px-----------+

Padding: 10px 12px
Border-radius: 12px
Gap between elements: 6px
Status dot: 8px circle, top-right corner, offset: -2px -2px
```

### 1.6 ASCII -- Collapsed Phase Container (done)

```
+---full width of grid area, height: 44px---+
| [*] STRATEGY    Ork[v] Plan[v]    1m 23s  |
|     phase color  mini agents      elapsed  |
+--------------------------------------------+

Padding: 8px 16px
Mini agent pills: 28px height, 8px border-radius, gap: 6px
Checkmark inside pill: 12px, green (#3B82F6 -- BLUE per Gold Solution)
```

### 1.7 ASCII -- Active Phase Container (expanded)

```
+---full width of grid area---+
| [*] FIVE MINDS #1   ACTIVE  |  <- Header: 36px height
|   6 agents | ~3m estimated   |  <- Subheader: 20px height
+------------------------------+
|                              |
| [Card 1] [Card 2] [Card 3]  |  <- Agent cards 160x96
| [Card 4] [Card 5] [Card 6]  |  <- Grid: auto-fill, minmax(160px, 1fr)
|                              |
+------------------------------+

Header padding: 8px 16px
Card grid padding: 12px 16px
Card gap: 12px
Phase border-left: 3px solid var(--phase-color)
```

### 1.8 ASCII -- Comms Log Panel (280px)

```
+---------280px----------+
| KOMUNIKACJA     [^][X] |  <- Header 40px, collapse/close
| [FM#1 v] [All] [Agent] |  <- Filter pills 28px
+-------------------------+
|                         |
| 04:23 [svg] Wizjoner    |  <- Entry: avatar 20px + name
| "A moze mikroserwisy    |  <- Message: 11px, t1
|  daja wieksza..."       |
| ........................ |  <- Separator: 1px, brd
|                         |
| 04:22 [svg] Devil's Adv |
| "Ale koszt bedzie       |
|  znacznie wyzszy..."    |
|                         |
+-------------------------+

Entry padding: 8px 12px
Avatar: 20px circle with agent icon color
Timestamp: 10px, JetBrains Mono, t2
Message: 11px, Inter, t1
Max message lines: 3, overflow: ellipsis
Scroll: overflow-y: auto, scroll-snap: none
```

---

## 2. Color System

### 2.1 Tla (Backgrounds)

| Token | Hex | RGBA | Uzycie |
|-------|-----|------|--------|
| `--lm-bg0` | `#06060A` | `rgba(6,6,10,1)` | Monitor background -- deep space |
| `--lm-bg1` | `#0F0F18` | `rgba(15,15,24,1)` | Panel backgrounds (comms log, phase containers) |
| `--lm-bg-glass` | -- | `rgba(15,15,24,0.85)` | Glassmorphism panels (topbar, comms log) |
| `--lm-bg-glass-elevated` | -- | `rgba(15,15,24,0.92)` | Elevated glassmorphism (HITL overlay, debate arena) |
| `--lm-bg-card` | -- | `rgba(22,22,42,0.6)` | Agent card background |
| `--lm-bg-card-hover` | -- | `rgba(30,30,58,0.8)` | Agent card hover |
| `--lm-bg-card-active` | -- | `rgba(22,22,42,0.9)` | Active phase card background |
| `--lm-bg-overlay` | -- | `rgba(6,6,10,0.7)` | Overlay backdrop (behind HITL/Debate modals) |
| `--lm-bg-phase-done` | -- | `rgba(15,15,24,0.5)` | Collapsed done phase container |
| `--lm-bg-phase-upcoming` | -- | `rgba(15,15,24,0.3)` | Dimmed upcoming phase container |

### 2.2 Stany agentow (7 stanow)

**UWAGA:** `done` uzywa BLUE (#3B82F6) zamiast green -- fix daltonizmu z Gold Solution.

| Stan | Primary Color | Hex | RGBA glow (0.3 opacity) | RGBA glow (0 opacity, pulse end) | Ikona | Label |
|------|--------------|-----|-------------------------|----------------------------------|-------|-------|
| **idle** | zinc-500 | `#71717A` | `rgba(113,113,122,0.15)` | `rgba(113,113,122,0)` | `○` puste kolko | "Idle" |
| **queued** | indigo-400 | `#818CF8` | `rgba(129,140,248,0.4)` | `rgba(129,140,248,0)` | `◷` zegar | "W kolejce" |
| **working** | emerald-400 | `#34D399` | `rgba(52,211,153,0.3)` | `rgba(52,211,153,0)` | `⟳` gear/spinner | "Pracuje" |
| **thinking** | amber-400 | `#FBBF24` | `rgba(251,191,36,0.3)` | `rgba(251,191,36,0)` | `💡` zarowka | "Mysli" |
| **done** | blue-500 | `#3B82F6` | `rgba(59,130,246,0.3)` | `rgba(59,130,246,0)` | `✓` checkmark | "Gotowe" |
| **error** | red-400 | `#F87171` | `rgba(248,113,113,0.4)` | `rgba(248,113,113,0)` | `⚠` trojkat | "Blad" |
| **waiting-for-human** | gold | `#F59E0B` | `rgba(245,158,11,0.5)` | `rgba(245,158,11,0)` | `✋` reka | "Czeka na Ciebie" |

**Status dot CSS (na agent card, 8px):**
```css
.lm-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  top: -2px;
  right: -2px;
}
.lm-status-dot[data-state="idle"]              { background: #71717A; }
.lm-status-dot[data-state="queued"]            { background: #818CF8; }
.lm-status-dot[data-state="working"]           { background: #34D399; }
.lm-status-dot[data-state="thinking"]          { background: #FBBF24; }
.lm-status-dot[data-state="done"]              { background: #3B82F6; }
.lm-status-dot[data-state="error"]             { background: #F87171; }
.lm-status-dot[data-state="waiting-for-human"] { background: #F59E0B; }
```

### 2.3 Fazy (6 faz)

| Faza | Hex | RGBA (border, 1.0) | RGBA (background, 0.08) | RGBA (glow, 0.15) | Uzycie |
|------|-----|---------------------|--------------------------|--------------------|----|
| **strategy** | `#818CF8` | `rgba(129,140,248,1)` | `rgba(129,140,248,0.08)` | `rgba(129,140,248,0.15)` | Indigo -- planowanie |
| **research** | `#06B6D4` | `rgba(6,182,212,1)` | `rgba(6,182,212,0.08)` | `rgba(6,182,212,0.15)` | Cyan -- badania |
| **five_minds_1** | `#F59E0B` | `rgba(245,158,11,1)` | `rgba(245,158,11,0.08)` | `rgba(245,158,11,0.15)` | Gold -- debata 1 |
| **build** | `#34D399` | `rgba(52,211,153,1)` | `rgba(52,211,153,0.08)` | `rgba(52,211,153,0.15)` | Emerald -- budowanie |
| **five_minds_2** | `#F59E0B` | `rgba(245,158,11,1)` | `rgba(245,158,11,0.08)` | `rgba(245,158,11,0.15)` | Gold -- debata 2 |
| **qa** | `#F87171` | `rgba(248,113,113,1)` | `rgba(248,113,113,0.08)` | `rgba(248,113,113,0.15)` | Red -- testowanie |

### 2.4 Akcenty (Functional Colors)

| Token | Hex | Uzycie |
|-------|-----|--------|
| `--lm-primary` | `#818CF8` | Primary actions, links, focus rings |
| `--lm-secondary` | `#34D399` | Success states, confirmations, build |
| `--lm-warning` | `#FBBF24` | Warnings, thinking state, caution |
| `--lm-success` | `#3B82F6` | Completion (BLUE -- daltonizm-safe) |
| `--lm-danger` | `#F87171` | Errors, destructive actions, STOP |
| `--lm-gold` | `#F59E0B` | HITL, Five Minds, special highlights |
| `--lm-stop-bg` | `#991B1B` | Emergency STOP button background (red-800) |
| `--lm-stop-hover` | `#B91C1C` | Emergency STOP hover (red-700) |

### 2.5 Tekst (Text Colors)

| Token | Hex | Kontrast vs #06060A | Uzycie | Min. rozmiar |
|-------|-----|---------------------|--------|-------------|
| `--lm-t1` | `#E4E4E7` | 16.5:1 | Primary text, headings, labels | Dowolny |
| `--lm-t2` | `#A1A1AA` | 7.5:1 | Secondary text, timestamps, subtitles | Dowolny |
| `--lm-t3` | `#71717A` | 4.8:1 | Muted text, placeholders, inactive labels | >=12px regular |
| `--lm-t4` | `#52525B` | 3.3:1 | Disabled text, decorative labels | >=18px bold / >=24px regular ONLY |
| `--lm-t-inverse` | `#06060A` | -- | Text on light backgrounds (buttons) | Dowolny |
| `--lm-t-on-color` | `#FFFFFF` | -- | Text on colored badges/pills | Dowolny |

### 2.6 Borders & Separators

| Token | Value | Uzycie |
|-------|-------|--------|
| `--lm-brd` | `rgba(129,140,248,0.15)` | Default border (panels, cards, separators) |
| `--lm-brd-hover` | `rgba(129,140,248,0.3)` | Hover border highlight |
| `--lm-brd-focus` | `rgba(129,140,248,0.5)` | Focus ring (accessibility) |
| `--lm-brd-phase` | varies per phase | Phase container left border (3px solid) |
| `--lm-brd-hitl` | `rgba(245,158,11,0.4)` | HITL panel border |

### 2.7 Gradient Tokens

```css
--lm-grad-primary: linear-gradient(135deg, #818CF8, #34D399);
--lm-grad-gold: linear-gradient(135deg, #F59E0B, #FBBF24);
--lm-grad-danger: linear-gradient(135deg, #F87171, #991B1B);
--lm-grad-topbar-line: linear-gradient(90deg, #818CF8, #34D399, #FBBF24);
--lm-grad-progress: linear-gradient(90deg, #818CF8, #34D399);
--lm-grad-shimmer: linear-gradient(90deg, transparent, rgba(251,191,36,0.15), transparent);
```

---

## 3. Component Design

### 3.1 Agent Node (Monitor Card Variant)

#### Wymiary i geometria

| Wlasciwosc | Wartosc |
|-------------|---------|
| Szerokosc | `minmax(156px, 1fr)` -- responsive w grid |
| Minimalna szerokosc | 156px |
| Maksymalna szerokosc | 200px |
| Wysokosc | auto, min-height: 92px |
| Border-radius | 12px |
| Padding | 10px 12px |
| Border | 1px solid var(--lm-brd) |
| Background | `rgba(22,22,42,0.6)` |
| Hover background | `rgba(30,30,58,0.8)` |
| Hover transform | `translateY(-2px)` |
| Hover transition | `all 200ms ease-out` |
| Hover box-shadow | `0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(129,140,248,0.2)` |

#### Wewnetrzny layout

```
+---card (padding: 10px 12px)-----+
|                                 |
| [icon 24x24]  Agent Name   [D] |  <- Row 1: flex, align-items: center, gap: 8px
|               Role subtitle     |  <- Row 2: margin-top: 2px
|                                 |
| [======= 60% ====        ]     |  <- Row 3: margin-top: 8px, progress bar
|                                 |
| "Analizuje struktury..."       |  <- Row 4: margin-top: 4px, message preview
|                                 |
+---(status label bottom-left)----+
```

**Elementy wewnetrzne:**
| Element | Rozmiar | Font | Kolor |
|---------|---------|------|-------|
| SVG icon | 24x24px | -- | Per-agent color (AGENT_ICON_COLOR z v20) |
| Agent name | -- | Space Grotesk, 13px, weight 600 | --lm-t1 |
| Role subtitle | -- | Inter, 10px, weight 400 | --lm-t3 |
| Status dot [D] | 8px circle | -- | Per-state color |
| Progress bar container | 100% x 3px | -- | rgba(129,140,248,0.1) |
| Progress bar fill | N% x 3px | -- | Per-state color |
| Message preview | -- | Inter, 10px, weight 400, 2 lines max | --lm-t2 |
| Status label | -- | Inter, 9px, weight 500, uppercase, letter-spacing: 0.06em | Per-state color |

#### 7 stanow wizualnych

**IDLE**
```css
.lm-agent[data-state="idle"] {
  border-color: rgba(113,113,122,0.15);
  opacity: 0.6;
  animation: lm-breathe 4s ease-in-out infinite;
}
.lm-agent[data-state="idle"] .lm-status-dot {
  background: #71717A;
  border: 1.5px dashed rgba(113,113,122,0.5);
}
```

**QUEUED**
```css
.lm-agent[data-state="queued"] {
  border-color: rgba(129,140,248,0.25);
  opacity: 0.85;
  animation: lm-pulse-queued 1.5s ease-out infinite;
}
.lm-agent[data-state="queued"] .lm-status-dot {
  background: #818CF8;
  border: 1.5px dotted rgba(129,140,248,0.6);
}
```

**WORKING**
```css
.lm-agent[data-state="working"] {
  border-color: rgba(52,211,153,0.35);
  opacity: 1;
  box-shadow: 0 0 20px rgba(52,211,153,0.15), 0 0 0 1px rgba(52,211,153,0.2);
}
.lm-agent[data-state="working"]::after {
  /* Spinning ring overlay */
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 14px; /* card radius + 2px */
  border: 2px solid transparent;
  border-top-color: #34D399;
  animation: lm-spin-ring 1.2s linear infinite;
}
.lm-agent[data-state="working"] .lm-progress {
  display: block; /* show progress bar */
}
.lm-agent[data-state="working"] .lm-status-dot {
  background: #34D399;
}
```

**THINKING**
```css
.lm-agent[data-state="thinking"] {
  border-color: rgba(251,191,36,0.3);
  opacity: 1;
  background: 
    linear-gradient(90deg, transparent, rgba(251,191,36,0.06), transparent) 
    no-repeat;
  background-size: 200% 100%;
  animation: lm-think-shimmer 2s linear infinite;
}
.lm-agent[data-state="thinking"] .lm-status-dot {
  background: #FBBF24;
}
.lm-agent[data-state="thinking"] .lm-thinking-dots {
  display: flex; /* show "..." animated dots */
}
```

**DONE**
```css
.lm-agent[data-state="done"] {
  border-color: rgba(59,130,246,0.25);
  opacity: 0.55; /* dimmed -- no longer primary focus */
  animation: lm-done-burst 400ms cubic-bezier(0.34,1.56,0.64,1) forwards;
}
.lm-agent[data-state="done"] .lm-status-dot {
  background: #3B82F6;
}
/* After 2s, transition to dim state */
.lm-agent[data-state="done"].lm-settled {
  opacity: 0.45;
  transition: opacity 800ms ease-out;
}
```

**ERROR**
```css
.lm-agent[data-state="error"] {
  border-color: rgba(248,113,113,0.4);
  opacity: 1;
  animation: lm-shake 400ms ease-out;
  box-shadow: 0 0 24px rgba(248,113,113,0.2), 0 0 0 1px rgba(248,113,113,0.3);
}
.lm-agent[data-state="error"]::before {
  /* Error badge "!" */
  content: '!';
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #F87171;
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.lm-agent[data-state="error"] .lm-status-dot {
  background: #F87171;
  animation: lm-error-glow 2s ease-in-out infinite;
}
```

**WAITING-FOR-HUMAN**
```css
.lm-agent[data-state="waiting-for-human"] {
  border-color: rgba(245,158,11,0.4);
  opacity: 1;
  animation: lm-beacon 1.5s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(245,158,11,0.2);
}
.lm-agent[data-state="waiting-for-human"]::before {
  /* HITL badge */
  content: 'HITL';
  position: absolute;
  top: -8px;
  right: -4px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #F59E0B;
  color: #06060A;
  font-size: 8px;
  font-weight: 700;
  font-family: var(--mn);
  letter-spacing: 0.05em;
  z-index: 2;
}
.lm-agent[data-state="waiting-for-human"] .lm-status-dot {
  background: #F59E0B;
  box-shadow: 0 0 0 4px rgba(245,158,11,0.3);
  animation: lm-beacon-dot 1.5s ease-in-out infinite;
}
```

#### Speech Bubble (on agent card)

```css
.lm-speech {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  max-width: 220px;
  padding: 8px 12px;
  border-radius: 10px 10px 10px 2px;
  background: rgba(15,15,24,0.92);
  border: 1px solid var(--lm-brd);
  font-size: 11px;
  font-family: var(--bd);
  color: var(--lm-t1);
  line-height: 1.4;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  z-index: 5;
  /* Entry animation */
  animation: lm-speech-enter 250ms cubic-bezier(0.34,1.56,0.64,1) forwards;
}
.lm-speech::after {
  /* Triangle pointer */
  content: '';
  position: absolute;
  bottom: -6px;
  left: 16px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(15,15,24,0.92);
}
```

---

### 3.2 Phase Timeline Bar

#### Pozycja i geometria

| Wlasciwosc | Wartosc |
|-------------|---------|
| Pozycja | fixed, bottom: 0, left: 0, right: 0 |
| Wysokosc | 56px |
| Background | `rgba(15,15,24,0.85)` |
| Backdrop-filter | `blur(20px)` |
| Border-top | `1px solid rgba(129,140,248,0.15)` |
| Padding | 0 32px |
| Z-index | 310 |
| Display | flex, align-items: center, justify-content: center |
| Gap | 0 (connectors fill space) |

#### Phase Pill Design

```
        connector (flex:1)       connector
  [STRAT *] ------------- [RESEARCH *] ------------- [FM#1 -->] ...
   44x28px                  44x28px                   44x28px
```

**Pill dimensions:**
| Wlasciwosc | Wartosc |
|-------------|---------|
| Width | auto, min-width: 44px |
| Height | 28px |
| Padding | 0 12px |
| Border-radius | 999px (pill) |
| Font | Inter, 10px, weight 600, uppercase |
| Letter-spacing | 0.04em |

**Pill states:**

| Stan | Background | Border | Text Color | Icon |
|------|-----------|--------|------------|------|
| **completed** | `rgba(59,130,246,0.15)` | `1px solid rgba(59,130,246,0.3)` | `#3B82F6` | `✓` checkmark (before text) |
| **active** | `rgba(var(--phase-color), 0.2)` | `2px solid var(--phase-color)` | `var(--phase-color)` | `-->` arrow or spinning dot |
| **upcoming** | `rgba(113,113,122,0.08)` | `1px dashed rgba(113,113,122,0.2)` | `#52525B` | None |

**Active pill animation:**
```css
.lm-phase-pill.active {
  animation: lm-phase-glow 2s ease-in-out infinite;
  box-shadow: 0 0 12px rgba(var(--phase-color-rgb), 0.25);
}
```

**Connector line:**
```css
.lm-phase-connector {
  flex: 1;
  height: 2px;
  margin: 0 4px;
  border-radius: 1px;
}
.lm-phase-connector.completed {
  background: #3B82F6;
}
.lm-phase-connector.active {
  background: linear-gradient(90deg, var(--phase-color), rgba(var(--phase-color-rgb), 0.3));
  animation: lm-connector-flow 1.5s linear infinite;
  background-size: 200% 100%;
}
.lm-phase-connector.upcoming {
  background: rgba(113,113,122,0.15);
  /* dashed via repeating-linear-gradient */
  background: repeating-linear-gradient(
    90deg,
    rgba(113,113,122,0.2) 0px,
    rgba(113,113,122,0.2) 6px,
    transparent 6px,
    transparent 10px
  );
}
```

---

### 3.3 Metrics HUD (Topbar)

#### Layout wewnetrzny

```css
.lm-topbar {
  display: flex;
  align-items: center;
  gap: 0; /* items separated by .lm-hud-sep */
  padding: 0 16px;
  height: 48px;
  background: rgba(15,15,24,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(129,140,248,0.15);
  z-index: 310;
}
```

**Elementy od lewej do prawej:**

| # | Element | Width | Font | Kolor | Opis |
|---|---------|-------|------|-------|------|
| 1 | LIVE indicator | auto (~52px) | Inter 10px/600, uppercase | #F87171 (dot) + #E4E4E7 (text) | Pulsujacy czerwony dot 6px + "LIVE" |
| -- | Separator | 1px x 24px | -- | rgba(129,140,248,0.1) | margin: 0 12px |
| 2 | Phase badge | auto | Space Grotesk 12px/600 | var(--phase-color) + #E4E4E7 | "Phase 3/6: Five Minds #1" |
| -- | Separator | 1px x 24px | -- | rgba(129,140,248,0.1) | margin: 0 12px |
| 3 | Progress bar | 160px | -- | var(--lm-grad-progress) | Thin 3px bar w rounded container |
| 3b | Progress % | auto | JetBrains Mono 11px/500, tabular-nums | #E4E4E7 | "67%" obok bara |
| -- | Separator | 1px x 24px | -- | rgba(129,140,248,0.1) | margin: 0 12px |
| 4 | Timer | ~48px | JetBrains Mono 14px/600, tabular-nums | #E4E4E7 | "04:23" |
| -- | Separator | 1px x 24px | -- | rgba(129,140,248,0.1) | margin: 0 12px |
| 5 | Agents count | auto | JetBrains Mono 11px/500 | #E4E4E7 (active) + #71717A (total) | "5/27" |
| -- | Spacer | flex: 1 | -- | -- | Pushes STOP to right |
| 6 | Pause/Resume | 32x32px | -- | #818CF8 | Icon button, appears on hover |
| 7 | STOP button | auto, min 64px | Space Grotesk 11px/700, uppercase | #FFFFFF on #991B1B | "STOP" z ikonem square |

#### LIVE indicator detail
```css
.lm-live {
  display: flex;
  align-items: center;
  gap: 6px;
}
.lm-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #F87171;
  animation: lm-live-pulse 1.5s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(248,113,113,0.5);
}
.lm-live-text {
  font-family: var(--bd);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--lm-t1);
}
```

#### Progress bar detail
```css
.lm-progress-bar {
  width: 160px;
  height: 3px;
  border-radius: 2px;
  background: rgba(129,140,248,0.1);
  overflow: hidden;
}
.lm-progress-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--lm-grad-progress);
  transition: width 600ms cubic-bezier(0.16,1,0.3,1);
}
```

#### Timer update animation
```css
.lm-timer {
  font-family: var(--mn);
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--lm-t1);
  min-width: 48px;
  text-align: center;
}
/* Subtle flash on update */
.lm-timer.lm-tick {
  animation: lm-counter-tick 300ms ease-out;
}
```

#### STOP button detail
```css
.lm-stop {
  padding: 6px 16px;
  border-radius: 8px;
  background: #991B1B;
  border: 1px solid rgba(248,113,113,0.4);
  color: #FFFFFF;
  font-family: var(--hd);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 150ms ease-out;
}
.lm-stop:hover {
  background: #B91C1C;
  box-shadow: 0 0 20px rgba(248,113,113,0.3), 0 0 0 1px rgba(248,113,113,0.5);
  transform: scale(1.02);
}
.lm-stop:active {
  transform: scale(0.98);
}
/* Square stop icon: 10x10px solid square */
.lm-stop-icon {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: #FFFFFF;
}
/* Shake + flash on click */
.lm-stop.lm-stopping {
  animation: lm-shake 400ms ease-out;
  box-shadow: 0 0 40px rgba(248,113,113,0.5);
}
```

---

### 3.4 HITL Decision Panel

#### Pozycja i rozmiar

| Wlasciwosc | Wartosc |
|-------------|---------|
| Pozycja | Fixed overlay, centered |
| Container | `position:fixed;inset:0;z-index:350;display:flex;align-items:center;justify-content:center` |
| Backdrop | `background:rgba(6,6,10,0.7);backdrop-filter:blur(4px)` |
| Panel width | `min(80vw, 960px)` |
| Panel max-height | `80vh` |
| Panel border-radius | 16px |
| Panel background | `rgba(15,15,24,0.92)` |
| Panel backdrop-filter | `blur(24px)` |
| Panel border | `1px solid rgba(245,158,11,0.3)` |
| Panel box-shadow | `0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.1)` |
| Panel padding | 0 (sections have own padding) |

#### Layout wewnetrzny

```
+---Panel (max 960px x 80vh)---+
|                              |
| HEADER (padding: 20px 24px)  |  <- 56px
| DECISION REQUIRED    [X]    |
| Five Minds Debate #1         |
|                              |
+------------------------------+
| SEPARATOR (1px gold/15%)     |
+------------------------------+
|                              |
| BODY (padding: 20px 24px,    |
|       overflow-y: auto)      |
|                              |
| [Expert 1] [Expert 2] [...] |  <- Expert cards in row
| [Expert 4] [Expert 5]       |
|                              |
| GOLD SOLUTION CARD           |  <- Highlighted card
| "Modular Monolith z..."     |
|                              |
+------------------------------+
| SEPARATOR                    |
+------------------------------+
| FOOTER (padding: 16px 24px)  |  <- 64px
|                              |
| [APPROVE (A)] [MODIFY (D)]  |
| [RE-DEBATE (R)]             |
|                              |
+------------------------------+
```

#### Expert Card Design (5 kart)

**Layout: flex wrap, 5 kart w jednym wierszu (desktop), gap: 12px**

```
+---Expert Card (min 160px, flex: 1)---+
|                                      |
| [SVG 32x32]                         |  <- Centered
| Expert Name                          |  <- Space Grotesk 13px/600
| Role                                |  <- Inter 10px/400, t2
|                                      |
| "Kluczowy argument                  |  <- Inter 11px/400, t1
|  w 1-2 zdaniach..."                 |  <- max-height: 48px, overflow hidden
|                                      |
| [Stance badge]                      |  <- "Za" green / "Przeciw" red / "Warunkowo" amber
+--------------------------------------+
```

| Wlasciwosc | Wartosc |
|-------------|---------|
| Width | minmax(160px, 1fr) |
| Min-height | 140px |
| Padding | 12px |
| Border-radius | 12px |
| Background | `rgba(22,22,42,0.6)` |
| Border | `1px solid rgba(129,140,248,0.15)` |
| Text-align | center |

**Devil's Advocate card -- rozniczy sie:**
```css
.lm-expert-card.devil {
  border-color: rgba(248,113,113,0.3);
  background: rgba(248,113,113,0.05);
}
```

**Stance badges:**
```css
.lm-stance {
  display: inline-flex;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.lm-stance.for     { background: rgba(52,211,153,0.15); color: #34D399; }
.lm-stance.against { background: rgba(248,113,113,0.15); color: #F87171; }
.lm-stance.partial { background: rgba(251,191,36,0.15); color: #FBBF24; }
```

#### Gold Solution Card (centralna, wyrozniona)

```css
.lm-gold-solution {
  margin-top: 16px;
  padding: 16px 20px;
  border-radius: 12px;
  background: rgba(245,158,11,0.06);
  border: 1.5px solid rgba(245,158,11,0.3);
  box-shadow: 0 0 24px rgba(245,158,11,0.08);
}
.lm-gold-solution .lm-gold-title {
  font-family: var(--hd);
  font-size: 14px;
  font-weight: 700;
  color: #F59E0B;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.lm-gold-solution .lm-gold-body {
  font-family: var(--bd);
  font-size: 12px;
  color: var(--lm-t1);
  line-height: 1.5;
}
```

#### Action Buttons (Footer)

```css
.lm-hitl-actions {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
}

.lm-hitl-btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: 10px;
  font-family: var(--hd);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease-out;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Approve -- primary green/blue action */
.lm-hitl-btn.approve {
  background: rgba(59,130,246,0.15);
  border: 1.5px solid rgba(59,130,246,0.4);
  color: #3B82F6;
}
.lm-hitl-btn.approve:hover {
  background: rgba(59,130,246,0.25);
  box-shadow: 0 0 20px rgba(59,130,246,0.2);
}

/* Modify -- amber/warning action */
.lm-hitl-btn.modify {
  background: rgba(251,191,36,0.1);
  border: 1.5px solid rgba(251,191,36,0.3);
  color: #FBBF24;
}
.lm-hitl-btn.modify:hover {
  background: rgba(251,191,36,0.2);
  box-shadow: 0 0 20px rgba(251,191,36,0.15);
}

/* Re-debate -- red/danger action */
.lm-hitl-btn.redebate {
  background: rgba(248,113,113,0.08);
  border: 1.5px solid rgba(248,113,113,0.25);
  color: #F87171;
}
.lm-hitl-btn.redebate:hover {
  background: rgba(248,113,113,0.15);
  box-shadow: 0 0 20px rgba(248,113,113,0.15);
}
```

**Keyboard shortcut hints (inside buttons):**
```css
.lm-kbd-hint {
  font-family: var(--mn);
  font-size: 9px;
  padding: 1px 5px;
  border-radius: 3px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--lm-t3);
}
```

---

### 3.5 Communications Log (Comms Log)

#### Panel glowny

```css
.lm-comms {
  position: fixed;
  top: 48px;
  right: 0;
  width: 280px;
  bottom: 56px;
  background: rgba(15,15,24,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid rgba(129,140,248,0.15);
  display: flex;
  flex-direction: column;
  z-index: 305;
  transition: transform 300ms cubic-bezier(0.16,1,0.3,1);
}
.lm-comms.collapsed {
  transform: translateX(280px);
}
```

#### Header (40px)

```css
.lm-comms-header {
  height: 40px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(129,140,248,0.1);
  flex-shrink: 0;
}
.lm-comms-title {
  font-family: var(--hd);
  font-size: 11px;
  font-weight: 600;
  color: var(--lm-t1);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
```

#### Filter pills (28px row)

```css
.lm-comms-filters {
  display: flex;
  gap: 4px;
  padding: 6px 12px;
  border-bottom: 1px solid rgba(129,140,248,0.08);
  flex-shrink: 0;
  overflow-x: auto;
}
.lm-comms-filter {
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 500;
  font-family: var(--bd);
  border: 1px solid rgba(129,140,248,0.15);
  background: transparent;
  color: var(--lm-t3);
  cursor: pointer;
  white-space: nowrap;
  transition: all 150ms ease-out;
}
.lm-comms-filter.active {
  border-color: var(--phase-color);
  color: var(--phase-color);
  background: rgba(var(--phase-color-rgb), 0.1);
}
```

#### Message row

```css
.lm-comms-msg {
  padding: 8px 12px;
  border-bottom: 1px solid rgba(129,140,248,0.05);
  cursor: pointer;
  transition: background 150ms ease-out;
}
.lm-comms-msg:hover {
  background: rgba(129,140,248,0.04);
}
/* Click-to-focus: highlights agent in grid */
.lm-comms-msg.focused {
  background: rgba(129,140,248,0.08);
  border-left: 2px solid var(--lm-primary);
}
```

**Message row inner layout:**
```
[20px avatar] [content area]
              [timestamp] Agent Name
              "Message text that can
               span up to 3 lines..."
```

| Element | Font | Kolor |
|---------|------|-------|
| Avatar | 20px circle, SVG agent icon | Per-agent color |
| Timestamp | JetBrains Mono 9px/400 | --lm-t3 |
| Agent name | Inter 11px/600 | --lm-t1 |
| Message | Inter 10px/400, line-height 1.4, max 3 lines | --lm-t2 |

**Message type coloring (left border accent):**
| Typ | Border-left color |
|-----|-------------------|
| Agent message (default) | none |
| Phase change | Per-phase color, 2px |
| HITL alert | #F59E0B, 2px |
| Error | #F87171, 2px |
| Narrative (system) | rgba(129,140,248,0.3), 2px |

**Scroll behavior:**
```css
.lm-comms-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain; /* scroll isolation */
  scroll-behavior: smooth;
}
```

---

### 3.6 Control Bar (integrated in Topbar)

Kontrolki sa czescia Topbar HUD, po prawej stronie.

#### Buttons: Pause/Resume + Speed + STOP

**Pause/Resume (icon button):**
```css
.lm-ctrl-pause {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(22,22,42,0.8);
  border: 1px solid rgba(129,140,248,0.2);
  color: var(--lm-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 150ms ease-out;
}
.lm-ctrl-pause:hover {
  background: rgba(30,30,58,0.9);
  border-color: rgba(129,140,248,0.4);
  box-shadow: 0 0 12px rgba(129,140,248,0.1);
}
/* Pause icon: two vertical bars 3x12px, gap 3px */
/* Resume icon: play triangle 12x12px */
```

**Speed control (dropdown or cycle button):**
```css
.lm-ctrl-speed {
  padding: 4px 10px;
  border-radius: 8px;
  background: rgba(22,22,42,0.8);
  border: 1px solid rgba(129,140,248,0.2);
  font-family: var(--mn);
  font-size: 10px;
  font-weight: 500;
  color: var(--lm-t2);
  cursor: pointer;
  transition: all 150ms ease-out;
}
/* Cycles: 0.5x -> 1x -> 2x -> 4x */
.lm-ctrl-speed:hover {
  color: var(--lm-t1);
  border-color: rgba(129,140,248,0.3);
}
```

**STOP: patrz sekcja 3.3 (jest czescia topbar, skrajnie prawy)**

---

### 3.7 Five Minds Debate Arena

#### Pozycja i rozmiar

| Wlasciwosc | Wartosc |
|-------------|---------|
| Container | `position:fixed;inset:0;z-index:360;display:flex;align-items:center;justify-content:center` |
| Backdrop | `background:rgba(6,6,10,0.75);backdrop-filter:blur(6px)` |
| Panel width | `min(90vw, 1100px)` |
| Panel max-height | `85vh` |
| Panel border-radius | 16px |
| Panel background | `rgba(15,15,24,0.92)` |
| Panel border | `1px solid rgba(245,158,11,0.25)` |
| Panel box-shadow | `0 32px 100px rgba(0,0,0,0.6), 0 0 60px rgba(245,158,11,0.08)` |

#### Layout: 3 slajdy (round-based)

**Slide 1: Opinie (Independent)**
```
+---Arena Header (60px)---+
| FIVE MINDS DEBATE #1     |
| Architektura systemu      |
| Round 1/3: Opinie     [X] |
+---------------------------+
|                           |
|   [Expert 1]  [Expert 2]  [Expert 3]  |  <- Polkole gorne: 3 karty
|                                        |
|          [Expert 4]  [Expert 5]        |  <- Polkole dolne: 2 karty
|                                        |
|   Kazda karta z niezalezna opinia     |
|                                        |
+---Nav Footer (48px)------+
| [<- Prev]  Slide 1/3  [Next ->]  [A][R][D] |
+---------------------------+
```

**Slide 2: Debata (Debate)**
```
+---Header---+
| Round 2/3: Debata   |
+--------------------+
|                    |
|  [E1] --agree--> [E2]    |  <- Karty z polaczeniami
|   |                |      |     agree: green dashed line
|   +--disagree--> [E3]    |     disagree: red dashed line
|                    |      |
|  [E4] --agree--> [E5]    |
|                    |      |
+--------------------+
| [<- Prev]  2/3  [Next ->] |
+--------------------+
```

**Slide 3: Synteza (Synthesis + Gold Solution)**
```
+---Header---+
| Round 3/3: Synteza       |
+--------------------------+
|                          |
| [E1 v] [E2 v] [E3 !]   |  <- Mini expert badges z stance
| [E4 v] [E5 x]           |
|                          |
| +--GOLD SOLUTION--------+|
| | Synthesizer:           ||
| | "Modular Monolith..." ||
| |                        ||
| | Bazuje na:             ||
| | [Prag v][Wiz v][Med v]||
| | [Kry ! warunkowo]     ||
| | [DA x odrzucony]      ||
| +------------------------+|
|                          |
+--------------------------+
| [APPROVE (A)] [MODIFY (D)] [RE-DEBATE (R)] |
+--------------------------+
```

#### Expert Card w Debate Arena (wieksza wersja)

```css
.lm-debate-expert {
  width: 192px;
  min-height: 180px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(22,22,42,0.7);
  border: 1px solid rgba(129,140,248,0.15);
  text-align: center;
  transition: all 200ms ease-out;
}
.lm-debate-expert:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  border-color: rgba(129,140,248,0.3);
}
```

**Expert card inner:**
| Element | Font | Rozmiar | Kolor |
|---------|------|---------|-------|
| Avatar SVG | -- | 40x40px | Per-expert color |
| Name | Space Grotesk | 14px/600 | --lm-t1 |
| Role | Inter | 10px/400 | --lm-t3 |
| Argument | Inter | 11px/400, line-height 1.5 | --lm-t2 |
| Stance badge | Inter | 9px/600, uppercase | Per-stance color |

**Polkole rozmieszczenie (5 ekspertow):**
```css
.lm-debate-experts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 24px;
}
/* Row 1: 3 experts, Row 2: 2 experts centered */
.lm-debate-experts .lm-debate-expert:nth-child(n+4) {
  /* Bottom row offset for semicircle effect */
  margin-top: -8px;
}
```

**Consensus indicator (on slide 3):**
```css
.lm-consensus {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}
.lm-consensus-bar {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: rgba(113,113,122,0.2);
}
.lm-consensus-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--lm-grad-gold);
  transition: width 400ms cubic-bezier(0.16,1,0.3,1);
}
.lm-consensus-label {
  font-family: var(--mn);
  font-size: 11px;
  font-weight: 500;
  color: #F59E0B;
}
```

**Navigation footer:**
```css
.lm-debate-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-top: 1px solid rgba(129,140,248,0.1);
}
.lm-debate-nav-btn {
  padding: 6px 14px;
  border-radius: 8px;
  background: rgba(22,22,42,0.8);
  border: 1px solid rgba(129,140,248,0.2);
  color: var(--lm-t2);
  font-family: var(--hd);
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease-out;
}
.lm-debate-nav-btn:hover {
  color: var(--lm-t1);
  border-color: rgba(129,140,248,0.35);
}
.lm-debate-counter {
  font-family: var(--mn);
  font-size: 10px;
  color: var(--lm-t3);
}
```

---

## 4. Animation Specifications

### 4.1 Keyframe Catalog

Wszystkie animacje z dokladnymi parametrami. Kazda ma `prefers-reduced-motion` fallback.

---

#### `lm-breathe` -- Idle agent breathing

```css
@keyframes lm-breathe {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%      { opacity: 0.65; transform: scale(1.02); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 4000ms |
| Easing | ease-in-out |
| Delay | 0ms |
| Iteration | infinite |
| Fill-mode | none |
| Reduced-motion | `animation: none; opacity: 0.5;` |

---

#### `lm-pulse-queued` -- Queued agent anticipation

```css
@keyframes lm-pulse-queued {
  0%, 100% { box-shadow: 0 0 0 0 rgba(129,140,248,0.4); }
  50%      { box-shadow: 0 0 0 8px rgba(129,140,248,0); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 1500ms |
| Easing | ease-out |
| Delay | 0ms |
| Iteration | infinite |
| Reduced-motion | `animation: none; box-shadow: 0 0 0 3px rgba(129,140,248,0.3);` (static ring) |

---

#### `lm-spin-ring` -- Working agent processing ring

```css
@keyframes lm-spin-ring {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 1200ms |
| Easing | linear |
| Delay | 0ms |
| Iteration | infinite |
| Target | `::after` pseudo-element (border-top ring) |
| Reduced-motion | `animation: none; border: 2px solid #34D399;` (static solid ring) |

---

#### `lm-think-shimmer` -- Thinking agent wave

```css
@keyframes lm-think-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 2000ms |
| Easing | linear |
| Delay | 0ms |
| Iteration | infinite |
| Background | `linear-gradient(90deg, transparent, rgba(251,191,36,0.08), transparent)` |
| Background-size | `200% 100%` |
| Reduced-motion | `animation: none; border: 2px dashed #FBBF24;` (static dashed border) |

---

#### `lm-done-burst` -- Completion celebration

```css
@keyframes lm-done-burst {
  0%   { transform: scale(0.92); opacity: 0.5; }
  50%  { transform: scale(1.06); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 400ms |
| Easing | cubic-bezier(0.34, 1.56, 0.64, 1) |
| Delay | 0ms |
| Iteration | 1 (forwards) |
| Reduced-motion | `animation: none; opacity: 1;` (instant state change) |
| Follow-up | After 2000ms, add class `.lm-settled` -> opacity transitions to 0.45 over 800ms |

---

#### `lm-shake` -- Error/STOP shake

```css
@keyframes lm-shake {
  0%, 100% { transform: translateX(0); }
  15%      { transform: translateX(-4px); }
  30%      { transform: translateX(4px); }
  45%      { transform: translateX(-3px); }
  60%      { transform: translateX(3px); }
  75%      { transform: translateX(-2px); }
  90%      { transform: translateX(2px); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 400ms |
| Easing | ease-out |
| Delay | 0ms |
| Iteration | 1 |
| Reduced-motion | `animation: none;` (instant red border instead) |

---

#### `lm-error-glow` -- Error persistent glow pulse

```css
@keyframes lm-error-glow {
  0%, 100% { box-shadow: 0 0 8px rgba(248,113,113,0.2); }
  50%      { box-shadow: 0 0 16px rgba(248,113,113,0.4); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 2000ms |
| Easing | ease-in-out |
| Delay | 0ms (starts after lm-shake completes) |
| Iteration | infinite |
| Reduced-motion | `animation: none; box-shadow: 0 0 12px rgba(248,113,113,0.3);` (static glow) |

---

#### `lm-beacon` -- HITL waiting-for-human beacon

```css
@keyframes lm-beacon {
  0%, 100% { 
    box-shadow: 
      0 0 0 0 rgba(245,158,11,0.5), 
      0 0 20px rgba(245,158,11,0.15); 
  }
  50% { 
    box-shadow: 
      0 0 0 12px rgba(245,158,11,0), 
      0 0 30px rgba(245,158,11,0.3); 
  }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 1500ms |
| Easing | ease-in-out |
| Delay | 0ms |
| Iteration | infinite |
| Reduced-motion | `animation: none; box-shadow: 0 0 0 4px rgba(245,158,11,0.4); border: 2px solid #F59E0B;` |

---

#### `lm-beacon-dot` -- HITL status dot pulse

```css
@keyframes lm-beacon-dot {
  0%, 100% { box-shadow: 0 0 0 2px rgba(245,158,11,0.4); }
  50%      { box-shadow: 0 0 0 6px rgba(245,158,11,0); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 1500ms |
| Easing | ease-in-out |
| Iteration | infinite |
| Reduced-motion | `animation: none; box-shadow: 0 0 0 3px rgba(245,158,11,0.3);` |

---

#### `lm-live-pulse` -- LIVE indicator pulse

```css
@keyframes lm-live-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 4px rgba(248,113,113,0.5); }
  50%      { opacity: 0.4; box-shadow: 0 0 8px rgba(248,113,113,0.8); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 1500ms |
| Easing | ease-in-out |
| Iteration | infinite |
| Reduced-motion | `animation: none; opacity: 1;` (static red dot) |

---

#### `lm-phase-glow` -- Active phase pill glow

```css
@keyframes lm-phase-glow {
  0%, 100% { box-shadow: 0 0 8px rgba(var(--phase-rgb),0.2); }
  50%      { box-shadow: 0 0 16px rgba(var(--phase-rgb),0.35); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 2000ms |
| Easing | ease-in-out |
| Iteration | infinite |
| Reduced-motion | `animation: none; box-shadow: 0 0 12px rgba(var(--phase-rgb),0.25);` |

---

#### `lm-connector-flow` -- Active phase connector animation

```css
@keyframes lm-connector-flow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 1500ms |
| Easing | linear |
| Iteration | infinite |
| Background-size | `200% 100%` |
| Reduced-motion | `animation: none;` (static gradient) |

---

#### `lm-counter-tick` -- Timer/metric update flash

```css
@keyframes lm-counter-tick {
  0%   { color: var(--lm-t1); }
  30%  { color: var(--lm-primary); }
  100% { color: var(--lm-t1); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 300ms |
| Easing | ease-out |
| Iteration | 1 |
| Reduced-motion | No change (subtle color flash is acceptable) |

---

#### `lm-speech-enter` -- Speech bubble entry

```css
@keyframes lm-speech-enter {
  0%   { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.95); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 250ms |
| Easing | cubic-bezier(0.34, 1.56, 0.64, 1) |
| Iteration | 1 (forwards) |
| Reduced-motion | `animation: none; opacity: 1; transform: translateX(-50%);` |

---

#### `lm-speech-exit` -- Speech bubble exit

```css
@keyframes lm-speech-exit {
  0%   { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-5px); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 200ms |
| Easing | ease-out |
| Iteration | 1 (forwards) |
| Trigger | After 3000ms display time |
| Reduced-motion | `animation: none; opacity: 0;` (instant disappear) |

---

#### `lm-thinking-dots` -- Three dot loading animation

```css
@keyframes lm-dot-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40%           { transform: translateY(-4px); opacity: 1; }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 1000ms |
| Easing | ease-in-out |
| Iteration | infinite |
| Dot 1 delay | 0ms |
| Dot 2 delay | 150ms |
| Dot 3 delay | 300ms |
| Dot size | 4px circle, color: #FBBF24 |
| Reduced-motion | `animation: none; opacity: 0.6;` (static dots) |

---

#### `lm-overlay-enter` -- Monitor overlay entry

```css
@keyframes lm-overlay-enter {
  0%   { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 400ms |
| Easing | cubic-bezier(0.16, 1, 0.3, 1) |
| Iteration | 1 (forwards) |
| Reduced-motion | `animation: none; opacity: 1;` (instant appear) |

---

#### `lm-card-reveal` -- Agent card staggered reveal

```css
@keyframes lm-card-reveal {
  0%   { opacity: 0; transform: translateY(12px) scale(0.96); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 300ms |
| Easing | cubic-bezier(0.16, 1, 0.3, 1) |
| Iteration | 1 (forwards) |
| Stagger delay | 50ms per card (applied via JS: `animation-delay: ${index * 50}ms`) |
| Reduced-motion | `animation: none; opacity: 1;` |

---

#### `lm-mission-pulse` -- Mission Pulse heartbeat (SHOULD S5)

```css
@keyframes lm-mission-pulse {
  0%, 100% { filter: brightness(1); }
  50%      { filter: brightness(1.03); }
}
```
| Parametr | Wartosc |
|----------|---------|
| Duration | 4000ms |
| Easing | ease-in-out |
| Iteration | infinite |
| Target | Monitor background or container |
| Reduced-motion | `animation: none;` |

---

### 4.2 Master `prefers-reduced-motion` Override

```css
@media (prefers-reduced-motion: reduce) {
  /* Kill all decorative animations */
  .lm-agent,
  .lm-status-dot,
  .lm-phase-pill,
  .lm-live-dot,
  .lm-speech,
  .lm-progress-fill,
  .lm-comms-msg {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 100ms !important;
  }
  
  /* Remove pseudo-element animations */
  .lm-agent::after,
  .lm-agent::before {
    animation: none !important;
  }
  
  /* Static status indicators */
  .lm-agent[data-state="idle"]              { opacity: 0.5; border-style: dashed; }
  .lm-agent[data-state="queued"]            { opacity: 0.85; border: 1.5px dotted #818CF8; }
  .lm-agent[data-state="working"]           { border: 2px solid #34D399; }
  .lm-agent[data-state="thinking"]          { border: 2px dashed #FBBF24; }
  .lm-agent[data-state="done"]              { border: 2px solid #3B82F6; opacity: 0.55; }
  .lm-agent[data-state="error"]             { border: 2px solid #F87171; }
  .lm-agent[data-state="waiting-for-human"] { border: 3px solid #F59E0B; }
  
  /* Mission pulse: off */
  .lm-monitor { filter: none !important; }
}
```

---

## 5. Typography Scale

### 5.1 Complete Type Scale

All fonts loaded via Google Fonts (already in v21):
- `Space Grotesk` (400, 500, 600, 700, 800) -- headings
- `Inter` (300, 400, 500, 600, 700) -- body
- `JetBrains Mono` (400, 500, 600) -- metrics/code

---

#### Headings (Space Grotesk)

| Token | Size | Weight | Line-height | Letter-spacing | Uzycie |
|-------|------|--------|-------------|----------------|--------|
| `--lm-h1` | 20px | 700 | 1.2 | -0.02em | Monitor title, phase change announcement |
| `--lm-h2` | 16px | 700 | 1.3 | -0.01em | Panel titles (HITL, Debate Arena), section headers |
| `--lm-h3` | 13px | 600 | 1.3 | 0 | Agent names, phase container headers |
| `--lm-h4` | 11px | 600 | 1.3 | 0.02em | Subheadings, comms log title |

#### Body (Inter)

| Token | Size | Weight | Line-height | Letter-spacing | Uzycie |
|-------|------|--------|-------------|----------------|--------|
| `--lm-body` | 12px | 400 | 1.5 | 0 | Gold solution text, HITL descriptions, agent arguments |
| `--lm-body-sm` | 11px | 400 | 1.4 | 0 | Comms log messages, agent role subtitle |
| `--lm-body-xs` | 10px | 400 | 1.4 | 0 | Message preview on cards, filter labels |
| `--lm-label` | 10px | 500 | 1 | 0.06em | Uppercase labels (status text), section labels |
| `--lm-caption` | 9px | 500 | 1 | 0.06em | Uppercase captions, keyboard hints, stance badges |
| `--lm-micro` | 8px | 600 | 1 | 0.08em | HITL badge text, very small labels |

#### Monospace (JetBrains Mono)

| Token | Size | Weight | Line-height | Letter-spacing | Uzycie | Extra |
|-------|------|--------|-------------|----------------|--------|-------|
| `--lm-mono-lg` | 14px | 600 | 1.2 | 0 | Timer display (04:23) | `font-variant-numeric: tabular-nums` |
| `--lm-mono-md` | 11px | 500 | 1.2 | 0 | Progress %, agent counts, speed label | `font-variant-numeric: tabular-nums` |
| `--lm-mono-sm` | 10px | 400 | 1.2 | 0 | Timestamps, version labels | `font-variant-numeric: tabular-nums` |
| `--lm-mono-xs` | 9px | 400 | 1.2 | 0 | Comms log timestamps | `font-variant-numeric: tabular-nums` |

### 5.2 CSS Variables for Typography

```css
.lm-monitor {
  /* Headings */
  --lm-font-h: 'Space Grotesk', sans-serif;
  /* Body */
  --lm-font-b: 'Inter', sans-serif;
  /* Mono */
  --lm-font-m: 'JetBrains Mono', monospace;
}
```

### 5.3 Usage Examples

```css
/* Phase announcement */
.lm-phase-announce {
  font-family: var(--lm-font-h);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--lm-t1);
}

/* Timer */
.lm-timer {
  font-family: var(--lm-font-m);
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--lm-t1);
}

/* Agent name on card */
.lm-agent-name {
  font-family: var(--lm-font-h);
  font-size: 13px;
  font-weight: 600;
  color: var(--lm-t1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Status label under agent */
.lm-status-label {
  font-family: var(--lm-font-b);
  font-size: 9px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
```

---

## 6. Transition Design

### 6.1 Normal Mode -> Live Monitor (entry)

**Calkowity czas: ~600ms.  SKIPOWALNA kliknieciem/klawiszem.**

| Krok | Czas | Co sie dzieje | CSS | Easing |
|------|------|---------------|-----|--------|
| 0 | 0ms | Trigger: user klika "Live Monitor" lub naciska `M` | -- | -- |
| 1 | 0-300ms | Lewy sidebar sliduje w lewo | `transform: translateX(-100%)` | ease-out |
| 1 | 0-300ms | Prawy sidebar sliduje w prawo (rownolegly z krokiem 1) | `transform: translateX(100%)` | ease-out |
| 2 | 0-200ms | Canvas blur + dim (rownolegly z krokiem 1) | `filter: blur(8px); opacity: 0.3` | ease-out |
| 3 | 100-500ms | Monitor overlay wjezdza (delay 100ms) | `transform: translateY(100%) -> translateY(0)` | cubic-bezier(0.16, 1, 0.3, 1) |
| 4 | 200-400ms | Topbar HUD fade-in (delay 200ms) | `opacity: 0 -> 1; transform: translateY(-10px) -> 0` | ease-out |
| 5 | 300-600ms | Agent cards staggered reveal (delay 300ms, 50ms between cards) | `opacity: 0; transform: translateY(12px) scale(0.96) -> visible` | cubic-bezier(0.16, 1, 0.3, 1) |
| 6 | 300-600ms | Phase timeline bar slide-up (delay 300ms) | `transform: translateY(56px) -> translateY(0)` | cubic-bezier(0.16, 1, 0.3, 1) |
| 7 | 400-600ms | Comms log slide-in from right (delay 400ms) | `transform: translateX(280px) -> translateX(0)` | cubic-bezier(0.16, 1, 0.3, 1) |

**View Transitions API wrapper (progressive enhancement):**
```javascript
function openLiveMonitor() {
  if (document.startViewTransition) {
    document.startViewTransition(() => showMonitorOverlay());
  } else {
    showMonitorOverlay(); // instant
  }
}
```

**Skip mechanism:**
```javascript
// Any click or keypress during animation -> jump to final state
monitorOverlay.addEventListener('click', skipAnimation, { once: true });
document.addEventListener('keydown', skipAnimation, { once: true });
function skipAnimation() {
  // Remove all animation classes, set final state immediately
  monitorOverlay.style.transition = 'none';
  monitorOverlay.style.transform = 'none';
  monitorOverlay.style.opacity = '1';
  // ... same for all other elements
  requestAnimationFrame(() => {
    monitorOverlay.style.transition = '';
  });
}
```

### 6.2 Live Monitor -> Normal Mode (exit)

**Calkowity czas: ~400ms (exit jest szybszy niz entry). Trigger: ESC, M, lub przycisk X.**

| Krok | Czas | Co sie dzieje | CSS | Easing |
|------|------|---------------|-----|--------|
| 0 | 0ms | Trigger: ESC / M / X button | -- | -- |
| 1 | 0-200ms | Comms log slide-out prawo | `transform: translateX(0) -> translateX(280px)` | ease-in |
| 1 | 0-200ms | Agent cards fade-out (rownolegly) | `opacity: 1 -> 0` | ease-in |
| 2 | 100-300ms | Phase timeline slide-down | `transform: translateY(0) -> translateY(56px)` | ease-in |
| 2 | 100-300ms | Topbar HUD fade-out | `opacity: 1 -> 0` | ease-in |
| 3 | 200-400ms | Monitor overlay slide-down | `transform: translateY(0) -> translateY(100%)` | ease-in |
| 3 | 200-400ms | Canvas unblur | `filter: blur(8px) -> blur(0); opacity: 0.3 -> 1` | ease-out |
| 4 | 300-400ms | Sidebars slide back in | `translateX(-100%) -> translateX(0)` / `translateX(100%) -> translateX(0)` | ease-out |

### 6.3 Phase Transition (within monitor)

**Kiedy symulacja przechodzi z jednej fazy do nastepnej:**

| Krok | Czas | Co sie dzieje | Detail |
|------|------|---------------|--------|
| 1 | 0-300ms | Phase announcement overlay | Text: nazwa nowej fazy, centered, `lm-h1`, `opacity: 0 -> 1 -> 0` over 300ms with 500ms hold at peak. Background: subtle radial pulse of phase color at center. |
| 2 | 300-800ms | Previous phase dims | All agents in prev phase: `opacity: 1 -> 0.45`, border-color transitions to `rgba(113,113,122,0.15)`, stagger 80ms per agent |
| 3 | 300-800ms | Previous phase container collapses | Height animates from full to 44px (collapsed), `transition: height 500ms cubic-bezier(0.16,1,0.3,1)` |
| 4 | 500-800ms | Checkmark sweep | Done agents in prev phase get blue checkmark, stagger 100ms |
| 5 | 600-900ms | New phase spotlight | Phase container border glows with phase color, agents inside `opacity: 0.4 -> 1`, stagger 80ms |
| 6 | 600-900ms | Agent cards reveal (new phase) | `lm-card-reveal` animation, stagger 50ms |
| 7 | 800-1000ms | Timeline update | Active pill pulses, connector fills, previous pill gets checkmark |
| 8 | 800-1000ms | HUD update | Phase badge text changes, progress bar animates |

**Total: ~1000ms. SKIPOWALNA kliknieciem.**

### 6.4 HITL Panel Entry/Exit

**Entry (blocking -- simulation pauses):**
| Krok | Czas | Co | CSS |
|------|------|----|-----|
| 1 | 0-200ms | Backdrop darkens | `rgba(6,6,10,0) -> rgba(6,6,10,0.7)`, `backdrop-filter: blur(0) -> blur(4px)` |
| 2 | 100-400ms | Panel slides up + fades in | `opacity: 0; transform: translateY(30px) scale(0.96) -> opacity: 1; transform: none` |
| 3 | 200-400ms | Expert cards stagger reveal (inside panel) | `lm-card-reveal` with 80ms stagger |
| 4 | 300-500ms | Gold Solution card highlight | Faint gold glow pulse once |
| 5 | 400-500ms | Action buttons appear | `opacity: 0 -> 1`, stagger 50ms |

Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for all.

**Exit (after decision):**
| Krok | Czas | Co | CSS |
|------|------|----|-----|
| 1 | 0ms | Decision confirmed flash | Brief green/gold flash on selected button |
| 2 | 0-200ms | Panel fades out + slides down | `opacity: 1 -> 0; transform: translateY(15px) scale(0.98)` |
| 3 | 100-300ms | Backdrop clears | `rgba(6,6,10,0.7) -> rgba(6,6,10,0)` |

---

## 7. Responsive Breakpoints

### 7.1 Breakpoint Values

| Breakpoint | Width | Target |
|-----------|-------|--------|
| **xl** | >= 1920px | Full desktop (reference design) |
| **lg** | 1440-1919px | Standard desktop / large laptop |
| **md** | 1280-1439px | Standard laptop |
| **sm** | 1024-1279px | Small laptop / large tablet |

**Gold Solution: Desktop-first. Mobile = WON'T HAVE v22. Compact mode = v22.1.**

### 7.2 Layout Adjustments per Breakpoint

#### xl (>= 1920px) -- Reference

Wszystko jak w sekcji 1. Pelna szerokosc, pelne rozmiary.

#### lg (1440-1919px)

| Element | Zmiana |
|---------|--------|
| Agent card min-width | 156px -> 148px |
| Comms Log width | 280px -> 260px |
| Phase timeline padding | 32px -> 24px |
| Grid gap | 12px -> 10px |
| Expert card width (Debate) | 192px -> 176px |
| HITL panel max-width | 960px -> 880px |
| Monitor overlay: no changes | same as xl |

```css
@media (max-width: 1919px) {
  .lm-comms { width: 260px; }
  .lm-grid { right: 260px; gap: 10px; }
  .lm-agent { min-width: 148px; }
  .lm-debate-expert { width: 176px; }
  .lm-hitl-panel { max-width: 880px; }
  .lm-timeline { padding: 0 24px; }
}
```

#### md (1280-1439px)

| Element | Zmiana |
|---------|--------|
| Agent card min-width | 140px |
| Agent card font sizes | Name: 12px, Role: 9px, Message: 9px |
| Comms Log width | 240px |
| Topbar font sizes | Phase badge: 11px, Timer: 13px |
| Progress bar width | 120px |
| Expert cards per row | 3 (wrap) instead of 5 |
| Debate Arena max-width | 900px |

```css
@media (max-width: 1439px) {
  .lm-comms { width: 240px; }
  .lm-grid { right: 240px; }
  .lm-agent { min-width: 140px; }
  .lm-agent-name { font-size: 12px; }
  .lm-agent-role { font-size: 9px; }
  .lm-progress-bar { width: 120px; }
  .lm-phase-label { font-size: 11px; }
  .lm-timer { font-size: 13px; }
  .lm-debate-panel { max-width: 900px; }
}
```

#### sm (1024-1279px)

| Element | Zmiana |
|---------|--------|
| Agent card min-width | 132px |
| Agent card height | min-height: 80px (reduce message preview to 1 line) |
| Comms Log | Starts collapsed, 220px when open |
| Comms Log trigger | Floating button right edge |
| Topbar | Phase + Timer + STOP only. Others hidden behind "..." |
| Expert cards per row | 2 (wrap heavily) |
| Debate Arena | 95vw, vertical scroll |
| Phase timeline | Pill text hidden, icons only |
| Grid gap | 8px |

```css
@media (max-width: 1279px) {
  .lm-comms { 
    width: 220px; 
    transform: translateX(220px); /* starts collapsed */
  }
  .lm-comms.open { transform: translateX(0); }
  .lm-grid { right: 0; } /* full width when comms collapsed */
  .lm-grid.comms-open { right: 220px; }
  .lm-agent { min-width: 132px; min-height: 80px; }
  .lm-agent .lm-msg-preview { 
    -webkit-line-clamp: 1; /* 1 line only */ 
  }
  .lm-hud-extra { display: none; } /* hide secondary HUD items */
  .lm-phase-pill span { display: none; } /* icons only */
  .lm-phase-pill { min-width: 32px; width: 32px; }
  .lm-debate-panel { width: 95vw; }
  .lm-debate-experts { gap: 10px; }
  .lm-debate-expert { width: calc(50% - 8px); }
}
```

---

## 8. Accessibility Spec

### 8.1 Focus Management

```css
/* Focus ring -- visible on keyboard navigation */
.lm-agent:focus-visible,
.lm-hitl-btn:focus-visible,
.lm-phase-pill:focus-visible,
.lm-comms-msg:focus-visible,
.lm-ctrl-pause:focus-visible,
.lm-stop:focus-visible,
.lm-debate-expert:focus-visible,
.lm-debate-nav-btn:focus-visible,
.lm-comms-filter:focus-visible {
  outline: 2px solid var(--lm-primary);
  outline-offset: 2px;
}

/* Remove default outline for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 8.2 ARIA Roles & Live Regions

```html
<!-- Monitor overlay -->
<div class="lm-monitor" role="dialog" aria-label="Live Monitor" aria-modal="true">

  <!-- Topbar HUD -->
  <header class="lm-topbar" role="banner">
    <span class="lm-live" aria-label="Symulacja aktywna">...</span>
    <span class="lm-phase-badge" role="status" aria-live="polite">Phase 3/6: Five Minds #1</span>
    <span class="lm-timer" role="timer" aria-label="Czas trwania symulacji">04:23</span>
  </header>

  <!-- Agent grid -->
  <main class="lm-grid" role="main" aria-label="Agenci pogrupowani wg faz">
    <section class="lm-phase-group" aria-label="Faza: Five Minds #1 - aktywna">
      <div class="lm-agent" role="article" tabindex="0" 
           aria-label="Pragmatyst - Pracuje - 60%" data-state="working">
        ...
      </div>
    </section>
  </main>

  <!-- Comms log -->
  <aside class="lm-comms" role="log" aria-label="Log komunikacji" aria-live="polite">
    ...
  </aside>

  <!-- Phase timeline -->
  <nav class="lm-timeline" role="navigation" aria-label="Os czasu faz">
    <button class="lm-phase-pill" aria-current="step" aria-label="Faza 3: Five Minds #1, aktywna">
      ...
    </button>
  </nav>

  <!-- Status announcer (screen reader only) -->
  <div role="status" aria-live="polite" class="sr-only" id="lm-status-announcer"></div>
  
  <!-- HITL announcer (urgent) -->
  <div role="alert" aria-live="assertive" class="sr-only" id="lm-hitl-announcer"></div>
</div>

<!-- HITL Decision Panel -->
<div class="lm-hitl-overlay" role="alertdialog" aria-modal="true"
     aria-label="Wymagana decyzja: Five Minds Debate #1">
  ...
</div>
```

### 8.3 Keyboard Navigation

| Klawisz | Akcja | Kontekst |
|---------|-------|----------|
| `M` | Toggle Live Monitor on/off | Global |
| `Escape` | Close monitor / Close HITL / Close Debate | Nested priority |
| `Tab` | Navigate forward through interactive elements | Focus order: Topbar -> Grid agents -> Timeline -> Comms |
| `Shift+Tab` | Navigate backward | Reverse order |
| `Enter` / `Space` | Activate focused element (click equivalent) | Any focused element |
| `A` | Approve (HITL panel) | When HITL panel is open |
| `D` | Modify (HITL panel) | When HITL panel is open |
| `R` | Re-debate (HITL panel) | When HITL panel is open |
| `Left Arrow` | Previous slide (Debate Arena) | When Debate Arena is open |
| `Right Arrow` | Next slide (Debate Arena) | When Debate Arena is open |
| `P` | Pause/Resume simulation | When monitor is open |
| `1-4` | Speed control (0.5x, 1x, 2x, 4x) | When monitor is open |

### 8.4 Focus Trap

```javascript
// HITL and Debate overlays must trap focus
function trapFocus(overlay) {
  const focusable = overlay.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  
  first.focus();
}
```

### 8.5 Screen Reader Only Utility

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### 8.6 Color Blindness Safety

Kazdy stan agenta komunikowany przez **minimum 3 kanaly** (WCAG 1.4.1):

| Stan | Kanal 1: Kolor | Kanal 2: Ikona | Kanal 3: Animacja/Ksztalt | Kanal 4: Label tekst |
|------|---------------|----------------|---------------------------|---------------------|
| idle | grey #71717A | `○` puste kolko | dashed border, breathing | "Idle" |
| queued | indigo #818CF8 | `◷` zegar | dotted border, pulse | "W kolejce" |
| working | green #34D399 | `⟳` gear/spinner | solid border, spinning ring | "Pracuje" |
| thinking | amber #FBBF24 | `💡` zarowka | dashed border, shimmer | "Mysli" |
| done | **BLUE** #3B82F6 | `✓` checkmark | solid border, burst then dim | "Gotowe" |
| error | red #F87171 | `⚠` trojkat | solid border, shake + ! badge | "Blad" |
| HITL | gold #F59E0B | `✋` reka | solid border, beacon pulse + HITL badge | "Czeka na Ciebie" |

**Krytyczny fix:** `done` (#3B82F6 blue) vs `working` (#34D399 green) -- rozroznialne dla protanopii/deuteranopii. Poprzednio oba byly zielone.

---

## 9. Z-Index Map

| Warstwa | Z-index | Elementy |
|---------|---------|----------|
| Monitor background | 300 | `.lm-monitor` overlay |
| Comms log | 305 | `.lm-comms` panel |
| Topbar HUD | 310 | `.lm-topbar` |
| Phase timeline | 310 | `.lm-timeline` |
| Phase announcement | 320 | `.lm-phase-announce` (tymczasowy, 1s) |
| Agent speech bubbles | 315 | `.lm-speech` |
| HITL backdrop | 345 | `.lm-hitl-backdrop` |
| HITL panel | 350 | `.lm-hitl-panel` |
| Debate Arena backdrop | 355 | `.lm-debate-backdrop` |
| Debate Arena panel | 360 | `.lm-debate-panel` |
| Tooltip | 400 | `.lm-tooltip` |

**Relacja z v21 z-index:** Monitor zaczyna sie od z-index 300 (slot `modal` z v21). Wszystkie elementy monitora sa powyzej 300, co gwarantuje ze pokrywaja canvas (z-index 1), sidebary (50), i topbar (100).

---

## 10. Spacing & Grid

### 10.1 Spacing Scale (4px grid, kontynuacja v21)

| Token | Wartosc | Uzycie w monitorze |
|-------|---------|-------------------|
| `--lm-sp-1` | 4px | Tight gaps (between status dot elements, badge padding) |
| `--lm-sp-2` | 8px | Standard gap (between filter pills, icon-to-text gap) |
| `--lm-sp-3` | 12px | Panel padding, card gap, section internal padding |
| `--lm-sp-4` | 16px | Section spacing, topbar padding, major element gaps |
| `--lm-sp-5` | 20px | HITL panel section padding, debate arena padding |
| `--lm-sp-6` | 24px | Major section breaks, debate expert grid gap |
| `--lm-sp-8` | 32px | Phase timeline side padding (xl), hero spacing |

### 10.2 Agent Card Grid

```css
.lm-grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
  gap: 12px;
  padding: 12px 16px;
}
```

**Phase container grid (within phase group):**
- Active phase: `grid-template-columns: repeat(auto-fill, minmax(156px, 1fr))`
- Collapsed phase (done): single row flex, `display: flex; gap: 6px; overflow-x: auto;`
- Upcoming phase (dimmed): same grid as active, but `opacity: 0.35`

### 10.3 Key Measurements Summary

| Element | Measurement | Wartosc |
|---------|-------------|---------|
| Topbar height | fixed | 48px |
| Timeline bar height | fixed | 56px |
| Comms log width | fixed (collapsible) | 280px (xl), 260px (lg), 240px (md), 220px (sm) |
| Agent card min-width | responsive | 156px (xl), 148px (lg), 140px (md), 132px (sm) |
| Agent card min-height | responsive | 92px (xl/lg), 80px (sm) |
| Phase container padding | fixed | 12px 16px (grid area), 8px 16px (header) |
| Phase header height | fixed | 36px (active), 44px (collapsed) |
| HITL panel max-width | responsive | 960px (xl/lg), 880px (md), 95vw (sm) |
| Debate Arena max-width | responsive | 1100px (xl/lg), 900px (md), 95vw (sm) |
| Expert card width | responsive | 192px (xl), 176px (lg), calc(50%-8px) (sm) |
| Status dot | fixed | 8px diameter |
| SVG agent icon on card | fixed | 24x24px |
| SVG agent icon in debate | fixed | 40x40px |
| Comms avatar | fixed | 20px diameter |
| Focus ring | fixed | 2px solid, offset 2px |
| Border radius - cards | fixed | 12px |
| Border radius - pills | fixed | 999px |
| Border radius - buttons | fixed | 8px |
| Border radius - modals | fixed | 16px |

### 10.4 Glassmorphism Budget

**Gold Solution: max 3 jednoczesne `backdrop-filter` panele.**

| Panele z backdrop-filter | Stan | Backdrop-filter |
|--------------------------|------|-----------------|
| Topbar HUD | ZAWSZE aktywny | `blur(20px)` |
| Comms Log | ZAWSZE aktywny (gdy widoczny) | `blur(20px)` |
| HITL/Debate panel | Aktywny TYLKO gdy otwarty | `blur(24px)` |

**Regula:** Gdy HITL/Debate jest otwarty, to sa 3 panele z backdrop-filter. Gdy nie -- sa 2. Nigdy wiecej niz 3.

**Fallback:**
```css
@supports not (backdrop-filter: blur(20px)) {
  .lm-topbar,
  .lm-comms,
  .lm-hitl-panel,
  .lm-debate-panel {
    background: #0F0F18; /* solid fallback */
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
```

---

## Zalacznik A: CSS Custom Properties -- Complete Monitor Palette

```css
.lm-monitor {
  /* === BACKGROUNDS === */
  --lm-bg0: #06060A;
  --lm-bg1: #0F0F18;
  --lm-bg-glass: rgba(15,15,24,0.85);
  --lm-bg-glass-elev: rgba(15,15,24,0.92);
  --lm-bg-card: rgba(22,22,42,0.6);
  --lm-bg-card-hover: rgba(30,30,58,0.8);
  --lm-bg-overlay: rgba(6,6,10,0.7);

  /* === ACCENT === */
  --lm-primary: #818CF8;
  --lm-secondary: #34D399;
  --lm-warning: #FBBF24;
  --lm-success: #3B82F6;
  --lm-danger: #F87171;
  --lm-gold: #F59E0B;

  /* === TEXT === */
  --lm-t1: #E4E4E7;
  --lm-t2: #A1A1AA;
  --lm-t3: #71717A;
  --lm-t4: #52525B;

  /* === STATUS === */
  --lm-st-idle: #71717A;
  --lm-st-queued: #818CF8;
  --lm-st-working: #34D399;
  --lm-st-thinking: #FBBF24;
  --lm-st-done: #3B82F6;
  --lm-st-error: #F87171;
  --lm-st-hitl: #F59E0B;

  /* === PHASES === */
  --lm-ph-strategy: #818CF8;
  --lm-ph-research: #06B6D4;
  --lm-ph-fm: #F59E0B;
  --lm-ph-build: #34D399;
  --lm-ph-qa: #F87171;

  /* === BORDERS === */
  --lm-brd: rgba(129,140,248,0.15);
  --lm-brd-hover: rgba(129,140,248,0.3);
  --lm-brd-focus: rgba(129,140,248,0.5);

  /* === GRADIENTS === */
  --lm-grad-primary: linear-gradient(135deg, #818CF8, #34D399);
  --lm-grad-gold: linear-gradient(135deg, #F59E0B, #FBBF24);
  --lm-grad-danger: linear-gradient(135deg, #F87171, #991B1B);
  --lm-grad-topbar-line: linear-gradient(90deg, #818CF8, #34D399, #FBBF24);

  /* === FONTS === */
  --lm-font-h: 'Space Grotesk', sans-serif;
  --lm-font-b: 'Inter', sans-serif;
  --lm-font-m: 'JetBrains Mono', monospace;

  /* === SPACING === */
  --lm-sp-1: 4px;
  --lm-sp-2: 8px;
  --lm-sp-3: 12px;
  --lm-sp-4: 16px;
  --lm-sp-5: 20px;
  --lm-sp-6: 24px;
  --lm-sp-8: 32px;

  /* === TIMING === */
  --lm-dur-instant: 100ms;
  --lm-dur-fast: 200ms;
  --lm-dur-normal: 300ms;
  --lm-dur-moderate: 400ms;
  --lm-dur-slow: 600ms;
  --lm-dur-dramatic: 1000ms;

  /* === EASING === */
  --lm-ease-default: ease-out;
  --lm-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --lm-ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --lm-ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

---

## Zalacznik B: Developer Checklist

Przed kodowaniem -- zweryfikuj ze masz:

- [ ] Wszystkie 7 stanow agentow z 3 kanalami (kolor + ikona + animacja/ksztalt + label)
- [ ] `done` uzywa #3B82F6 (blue), NIE #22C55E (green)
- [ ] Max 3 jednoczesne `backdrop-filter` panele
- [ ] `prefers-reduced-motion` dla KAZDEJ animacji
- [ ] `@supports not (backdrop-filter)` fallback
- [ ] ARIA: `role="dialog"` na monitorze, `aria-live` na comms log i HITL
- [ ] Focus trap w HITL i Debate Arena overlayach
- [ ] Keyboard: M (toggle), ESC (close), A/D/R (HITL), P (pause), arrows (debate slides)
- [ ] Skip animation: klik/klawisz podczas transition -> instant jump to final state
- [ ] Timer uzywa `tabular-nums` (JetBrains Mono)
- [ ] Status labels sa ZAWSZE widoczne (nie tylko kolor)
- [ ] Comms log: `overscroll-behavior: contain` (scroll isolation)
- [ ] Phase timeline: click na faze filtruje grid
- [ ] STOP button: ZAWSZE widoczny, nie moze byc przesloniety
- [ ] Responsive: comms log collapsed < 1280px, pill text hidden < 1280px
- [ ] All colors pass WCAG AA contrast vs #06060A
- [ ] Stagger delays applied via JS (`animation-delay`), not hardcoded CSS nth-child
- [ ] `will-change` ONLY on elements about to animate, removed after
- [ ] Glassmorphism panels: `backdrop-filter` + solid fallback
- [ ] Entry animation: ~600ms total, exit: ~400ms
- [ ] Z-index: monitor 300+, HITL 350, Debate 360

---

## Zalacznik C: Visual Reference -- State Machine

```
                    +-------+
              +---->| IDLE  |<----+
              |     +---+---+     |
              |         |         |
              |    (phase start)  |
              |         |         |
              |     +---v---+     |
              |     |QUEUED |     |
              |     +---+---+     |
              |         |         |
              |    (agent turn)   |
              |         |         |
              |     +---v---+     |
              +-----|WORKING|-----+
              |     +---+---+     |
              |         |         |
       (error)|    (deliberate)   |(complete)
              |         |         |
              |     +---v----+    |
              |     |THINKING|    |
              |     +---+----+    |
              |         |         |
              |    (resolved)     |
              |         |         |
         +----v---+     |    +---v--+
         | ERROR  |     +--->| DONE |
         +--------+          +------+
              
         +-------------+
         |WAITING-FOR-  |  <-- triggered at HITL points
         |    HUMAN     |      (any working/thinking agent)
         +------+-------+
                |
           (user decides)
                |
           +----v---+
           |WORKING | (resumes)
           +--------+
```

---

*Specyfikacja przygotowana przez Designer [OPUS] w fazie BUILD, Deep Five Minds Protocol.*
*Kazda wartosc jest DEFINITIVE -- developer koduje bez zgadywania.*
*Wszystkie px, hex, ms, easing functions sa finalne.*
*Data: 2026-04-04*
