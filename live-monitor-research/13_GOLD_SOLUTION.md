# GOLD SOLUTION -- Finalna Rekomendacja Live Monitor Mode
## Synteza Five Minds Debaty #1

**Autor:** Syntetyk [OPUS] -- mediator Five Minds Protocol
**Data:** 2026-04-04
**Zrodla:** MANIFEST.md + 5 glosow debaty (Pragmatyk, Innowator, Analityk Danych, Rzecznik Uzytkownika, Cien/Devil's Advocate)

---

### Consensus Score

**72% -- WIEKSZOSCIOWY KOMPROMIS**

- **Pelny konsensus (5/5):** AnimationManager jako prerequisite, zero external dependencies, session replay = WON'T v22, performance baseline przed implementacja, prefers-reduced-motion od dnia 1
- **Silna wiekszosc (4/5):** 3 HITL punkty default, karty w monitorze + orby w overview, desktop-first, keyboard nav = MUST
- **Kompromis (3/5):** Scope 8 MUST features, 7 stanow z uproszczeniami, Debate Arena w uproszczonej formie
- **Rozlam (2/5):** HITL wartosc (Cien vs reszta), visual complexity (Innowator vs Cien), Lite vs Full approach

---

### Rozstrzygniecia Konfliktow

#### Konflikt 1: Scope

- **Decyzja**: 8 MUST + 5 SHOULD + reszta = WON'T v22. Budzet LOC: ~1500 LOC nowego kodu. Plik koncowy: max 4700 LOC.
- **Kogo slucham**: Pragmatyk (glownie) + Analityk Danych (metryki rozmiaru)
- **Dlaczego**: Pragmatyk przedstawia jedyna w debacie kalkulacje LOC per feature z realistycznymi szacunkami. Analityk potwierdza danymi: v22 = 3204 LOC, dodanie 1500 = 4700, co jest PONIZEJ hard limitu 5500 LOC. Innowator chce 10+ features -- ale nie szacuje LOC. Cien proponuje 800 LOC "Lite" -- ale to jest zbyt radykalne obciecie, ktore wyrzuca differentiatory (Five Minds viz, HITL). Realistyczny srodek to Pragmatykowe 8 MUST z chirurgicznie dobranymi SHOULD.

#### Konflikt 2: HITL

- **Decyzja**: 3 punkty HITL domyslnie. 1 wariant UI (uniwersalny panel decyzyjny z opcjonalnym expand do Debate Arena). Timer auto-approve WYLACZONY domyslnie -- user wlacza w settings.
- **Kogo slucham**: Rzecznik Uzytkownika (3 punkty, timer OFF) + Pragmatyk (1 wariant UI)
- **Dlaczego**: Rzecznik ma najsilniejszy argument oparty na user journey: 5 przerw w 10-minutowej symulacji = przerwa co 2 minuty = destrukcyjne dla flow. Pragmatyk slusznie wskazuje, ze 4 warianty UI to 4x wiecej kodu za zero dodatkowej wartosci. Cien mowi "zero HITL" -- to zbyt radykalne, bo HITL to serce wartosci edukacyjnej: user uczy sie DECYDOWAC, nie tylko patrzec. ALE Cien ma racje, ze HITL w symulacji jest czesciowo "teatrem" -- dlatego 3, nie 5, i dlatego timer OFF (nie udajemy pilnosci tam, gdzie jej nie ma).

  **3 punkty HITL:**
  1. Po Strategy + Research (polaczone) -- "Oto plan i badania. Akceptujesz?"
  2. Po Five Minds Debate #1 -- "Gold Solution. Approve/Modify/Re-debate?"
  3. Final Approval -- "Gotowe. Deploy/Reject?"

  Punkty 3 (przed Build) i 4 (po FM#2) z MANIFEST staja sie NON-BLOCKING Intent Preview (S3) -- informacja w comms log, nie blocking modal.

#### Konflikt 3: Stany agentow

- **Decyzja**: 7 stanow ZACHOWANE, ale z dwoma poprawkami: (1) done zmienia kolor z zielonego (#22C55E) na niebieski (#3B82F6), (2) obowiazkowe labele tekstowe pod kazdym statusem.
- **Kogo slucham**: Rzecznik Uzytkownika (daltonizm fix, labele) + MANIFEST (7 stanow). Cien przegrywa.
- **Dlaczego**: Cien proponuje 3 stany (off/on/alert). To jest zbyt agresywna redukcja -- roznica miedzy `working` (agent przetwarza) a `waiting-for-human` (czeka na usera) jest KRYTYCZNA, bo wymaga INNEJ reakcji od uzytkownika. Rowniez `error` musi byc oddzielny od `on` -- error wymaga uwagi. Ale Cien ma racje, ze `idle` vs `queued` i `working` vs `thinking` sa subtelne -- dlatego: wizualnie odrozniamy je, ale nie wymagamy od usera dekodowania -- labele tekstowe robia za niego prace kognitywna. Rzecznik identyfikuje KRYTYCZNY bug a11y: working (#34D399) vs done (#22C55E) = dwa zielone, nierozroznialne dla 8% mezczyzn. Done -> niebieski (#3B82F6) to fix za 0 LOC.

#### Konflikt 4: Visual complexity

- **Decyzja**: Zachowujemy Narrative Templates (SHOULD) i Mission Pulse (15 LOC, SHOULD). Wyrzucamy: Ghost Trail, Emotional Resonance System, Synapse Fire, Time Crystal, Constellation Memory, Whisper Mode. Debate Theatre = uproszczone (patrz Konflikt 5).
- **Kogo slucham**: Pragmatyk (LOC budzet) + Rzecznik (czytelnosc > efekty) + selektywnie Innowator (Narrative + Pulse)
- **Dlaczego**: Innowator ma 10 features, z ktorych wiekszosc to "wow" kosztem LOC. Ale DWA pomysly sa genialne przy minimalnym koszcie: (1) Narrative Templates -- ~189 szablonow tekstu (2KB danych), ktore zamieniaja "Researcher: state=working" na "Researcher zanurza sie w analiza..." -- ogromna wartosc za ~40 LOC. (2) Mission Pulse -- 15 LOC sinusoidalnej zmiany jasnosci tla, ktora daje "organizm zyje" feel. Reszta innowacji Innowatora (Ghost Trail 80 LOC, Emotional Resonance 25 LOC CSS, Synapse Fire 50 LOC) to dlugi ogon diminishing returns. Wyrzucam bez zalu -- mozna dodac w v23. Cien ma racje, ze "teatr zamiast narzedzia" to ryzyko -- Narrative + Pulse sa na granicy teatru, ale ich koszt jest tak niski (55 LOC lacznie), ze ROI jest pozytywne.

#### Konflikt 5: Five Minds Debate viz

- **Decyzja**: Uproszczona Debate Arena -- NIE cinematic theatre, NIE prosta tabela. Srodek: statyczny layout 5 expert cards w polkolu + Gold Solution focal card, BEZ typing indicator stagger, BEZ tension meter, BEZ animowanych agree/disagree linii. Round-based pacing (user klika "Dalej" miedzy rundami).
- **Kogo slucham**: Rzecznik (round-based pacing, Gold Solution focal) + Pragmatyk (statyczny layout, 200 LOC max) + czesciowo Innowator (polkole ekspertow)
- **Dlaczego**: Cien proponuje "prosta tabela 5x3" -- to jest ZA MALO. Five Minds to USP aplikacji, jedyna unikalna feature vs konkurencja (Analityk potwierdza: "Five Minds debate viz -- TAK, unikalne"). Prosta tabela zabija differentiator. ALE Innowator proponuje full cinema (tension meter, argument weight, round transitions, rhythm animation) -- to ~400+ LOC za animacje, ktore user prawdopodobnie obejrzy RAZ i potem kliknie skip. Kompromis: layout jest STRUKTURALNY (polkole, expert cards, Gold Solution wyrozniona), ale NIE ANIMOWANY (zero typing indicator per expert, zero agree/disagree linii). Rundy sa SEKWENCYJNE (slide 1: opinie, slide 2: debata, slide 3: synteza) -- to daje czytelnosc bez animacji. User czyta TRESC, nie ogladam show.

  **LOC estimate:** ~200 LOC (layout + 3 slidow + logika approve/modify/re-debate).

#### Konflikt 6: Performance/Testing

- **Decyzja**: Phase 0 OBOWIAZKOWE: (1) AnimationManager FIRST (~80 LOC), (2) Performance baseline v21 (30 min DevTools), (3) prefers-reduced-motion od dnia 1 (~60 LOC). Glassmorphism: max 3 jednoczesne `backdrop-filter` panele (topbar + comms log + decision overlay). Starfield/particles: ZACHOWANE ale z `visibilitychange` pause i reduced-motion off.
- **Kogo slucham**: Pragmatyk (AnimationManager first) + Analityk (baseline profiling) + Cien (backdrop-filter warning)
- **Dlaczego**: To jest jedyny konflikt gdzie WSZYSCY PICIU sie zgadzaja na AnimationManager -- to jest rzadki konsensus. Cien slusznie ostrzega o `backdrop-filter` memory bomb (~8-33MB GPU per panel) -- dlatego LIMITUJEMY do 3 jednoczesnych. Analityk slucznie WYMAGA baseline profiling PRZED dodaniem animacji -- nie mozemy targetowac 60 FPS jesli nie wiemy czy v22 juz ma 45 czy 60. Pragmatyk prawidlowo identyfikuje, ze reduced-motion musi byc implementowane ROWNOCZESNIE z kazdym keyframe -- retrofitting 20 animacji to koszmar.

  **Performance Contract (patrz sekcja ponizej).**

#### Konflikt 7: Mobile/Accessibility

- **Decyzja**: Desktop-first. Mobile = WON'T HAVE v22 (zero optymalizacji). Accessibility = MUST HAVE: (1) prefers-reduced-motion, (2) keyboard navigation + focus trap, (3) labele tekstowe na statusach, (4) done color fix, (5) ARIA live regions na comms log i HITL. Compact mode: SHOULD HAVE (v22 jesli czas, v22.1 jesli nie).
- **Kogo slucham**: Pragmatyk (mobile = WON'T v1) + Rzecznik (a11y = MUST) + Analityk (brak danych mobilnych)
- **Dlaczego**: Analityk ujawnia KRYTYCZNA luke: zero danych o performance na mobile. Bez danych nie mozna projektowac. Pragmatyk ma racje: nasz user to developer/projektant na desktopie. ALE Rzecznik ma absolutna racje, ze accessibility to nie nice-to-have: daltonizm = 8% mezczyzn, keyboard-only users istnieja, reduced-motion to wymog prawny (WCAG 2.3.3, EN 301 549). Compact mode jest wazny dla 13" laptopow (1366x768 = 22% desktopow wg StatCounter), ale moze byc follow-up. ARIA i keyboard nav -- to MUST, bo to nie jest polish, to jest quality.

#### Konflikt 8: Single-file sustainability

- **Decyzja**: Hard limit 5000 LOC / 450 KB na plik v22. Przed implementacja: audit v21 z celem -200 LOC (dead code, duplikacje CSS, nadmiarowe komentarze). Lazy initialization monitora (kod obecny ale nie wykonany do pierwszego uzycia). Feature flags na gorze pliku. BEZ build stepu, BEZ osobnych plikow -- single-file zachowane.
- **Kogo slucham**: Pragmatyk (hard limit, audit) + Innowator (lazy init, feature flags) + kompromis z Cien
- **Dlaczego**: Cien prawidlowo identyfikuje problem: 5000+ LOC w jednym pliku to granica utrzymywalnosci. Ale jego rozwiazanie (build step: `cat header.html style.css app.js > dist/app.html`) lamie filozofie projektu i dodaje toolchain dependency. Innowator proponuje lepsze rozwiazanie: lazy initialization monitora + feature flags -- plik jest duzy, ale czas startu szybki bo monitor code czeka nieinicjalizowany. Pragmatyk dodaje krytyczny element: audit v21 PRZED dodawaniem nowego kodu. -200 LOC z auditu + ~1500 LOC monitora = ~4500 LOC netto. To jest w granicach. Hard limit obnizam z Pragmatykowych 5500 do 5000 -- bo Analityk wskazuje, ze LLM context window moze nie zmiescic calego pliku przy 5500+.

---

### FINAL Feature List (Zatwierdzona)

#### MUST HAVE (bez tego nie shippujemy)

| # | Feature | LOC | Uzasadnienie |
|---|---------|-----|--------------|
| M1 | Fullscreen overlay z HUD topbar | ~150 | Core monitora. Precedens w v18. CSS fixed + ESC/M toggle. |
| M2 | Agent status visualization (7 stanow) | ~200 | done = niebieski, obowiazkowe labele tekstowe. 3 kanaly (kolor+ikona+animacja). |
| M3 | Phase timeline (horizontal stepper) | ~80 | 6 faz z connected dots. Active/completed/upcoming. |
| M4 | Agent grid pogrupowany wg fazy | ~180 | Bento grid z phase containers. Progresywny reveal: aktywna faza pelna, ukonczone zwiniety, przyszle dimmed. |
| M5 | HITL decision panel (1 uniwersalny wariant) | ~150 | 3 blocking decision points. Approve/Modify/Re-debate. Keyboard A/R/D. Timer OFF domyslnie. |
| M6 | Comms log / Dialog Timeline | ~150 | Prawy panel 280px collapsible. Filtr domyslny = aktywna faza. Reverse chronological. |
| M7 | Emergency STOP | ~30 | Jeden przycisk, zawsze widoczny, natychmiastowe zatrzymanie. Shake + red flash feedback. |
| M8 | Keyboard navigation + ARIA | ~80 | Tab/Shift+Tab, focus trap w overlayach, aria-live na comms log i HITL, skip links. |

**MUST LOC: ~1020**

#### Infrastructure (Phase 0 -- PRZED features)

| # | Feature | LOC | Uzasadnienie |
|---|---------|-----|--------------|
| I1 | AnimationManager (centralny rAF loop) | ~80 | Prerequisite dla WSZYSTKICH animacji. Rozwiazuje istniejacy problem v21. |
| I2 | Refactor istniejacych rAF w v21 | -20 netto | Migracja na AnimationManager. |
| I3 | prefers-reduced-motion | ~60 | @media query + in-app toggle. Od dnia 1. Wymog WCAG. |
| I4 | Audit v21: dead code, duplikacje | -200 | Cel: odzyskac LOC na nowe features. |
| I5 | Performance baseline (Chrome DevTools) | 0 LOC | 30 minut pomiaru. FPS, heap, layout recalc. Dokumentacja wynikow. |

**Infrastructure LOC netto: -80 (oszczedzamy)**

#### SHOULD HAVE (v22 jesli zmiesci sie w budzecie LOC)

| # | Feature | LOC | Uzasadnienie |
|---|---------|-----|--------------|
| S1 | Uproszczona Debate Arena (polkole + 3 slidow) | ~200 | USP aplikacji. Statyczny layout, round-based pacing, Gold Solution focal. |
| S2 | Narrative Templates (comms log) | ~40 | "Researcher zanurza sie w analiza..." zamiast "state=working". 3 szablony per agent per state. |
| S3 | Intent Preview (non-blocking) | ~80 | Przed faza: "oto co agenci zamierzaja zrobic". Informacja, nie blocking modal. |
| S4 | Kontekstowy HUD dim (completed phases) | ~30 | opacity: 0.4 na completed. Trywialny koszt, duzy impact na czytelnosc. |
| S5 | Mission Pulse (heartbeat tla) | ~15 | Sinusoidalna zmiana jasnosci synchronizowana z aktywnoscia. Subtelna, tania, efektywna. |
| S6 | View Transitions API | ~30 | Progressive enhancement. `if (document.startViewTransition)` wrapper. Zero risk, fallback instant. |
| S7 | Simulation complete (confetti + summary) | ~60 | Reuse confetti z v7. Summary stats. Poczucie zamkniecia. Max 1.5s confetti. |

**SHOULD LOC: ~455**

#### WON'T HAVE (swiadoma decyzja)

| Feature | Dlaczego NIE | Kiedy moze wrocic |
|---------|-------------|-------------------|
| Session replay / time travel | 500+ LOC, eksponencjalna zlozonosc, wymaga instrumentacji calego state. Konsensus 5/5. | v24+ (nie v23) |
| Side-by-side comparison | 200 LOC za fikcyjna porownanie w pre-scripted symulacji. | v23 jesli bedzie user feedback |
| BroadcastChannel multi-tab | Race conditions, phantom user case, zero realnego zapotrzebowania. | Nigdy w obecnej architekturze |
| Token cost estimation w HUD | Zmyslone liczby w symulacji = misleading. Raport X (7.2/10 Critic) jako jedyne zrodlo. | v23 jako opt-in z DUZYM disclaimerem |
| Quality Score per agent | Nieokreslona metryka, zmyslone dane. | Nigdy |
| Reliability chain indicator | Akademicki koncept, niszowa grupa odbiorcow. | v23 jako edukacyjny tooltip |
| Ghost Trail (decision ghosts) | 80 LOC za feature ktory dodaje clutter na ekran z 27 agentami. | v23 |
| Emotional Resonance System | Wymaga subtelnego tuningu, ryzyko "taniego" efektu. | v23 po user feedback |
| Synapse Fire (particle types) | 50 LOC na roznicowanie czasteczek, ktore user nie bedzie dekodowac w real-time. | v23 |
| Time Crystal (radial timeline) | Wow kosztem cognitive load. Linearny timeline czytelniejszy. | Nigdy |
| Constellation Memory (fingerprint) | Fajne do virality, ale nie core. | v24 |
| Whisper Mode (ambient) | 40 LOC CSS + 10 JS, niska priorytet vs core features. | v23 |
| Architect's Eye (X-ray) | 60 LOC CSS, interesujace edukacyjnie. | v23 -- dobry kandydat |
| Confidence slider | Pusta interakcja -- user przesuwa suwak ktory nic nie zmienia. | Nigdy |
| Auto-approve timer (domyslnie) | Timer stresuuje usera. ALE: zachowujemy jako OPT-IN w settings. | v22 opt-in, 60s default, user musi sam wlaczyc |
| Cost breakdown dropdown | Zalezy od token cost, ktory sam jest watpliwy. | v23+ |
| Animated connections (data packets) | v14 juz ma multi-particle. Upgrade zamiast nowej feature. | v22.1 |
| Adaptive Autonomy (ML na historii) | Premature optimization bez user data. | v24+ |
| Living Presets (ewoluujace) | 150 LOC, wymaga 5+ sesji danych. Wartosciowe, ale nie teraz. | v24 |
| Compact mode | Wazne dla 13", ale wymaga testow na malych ekranach. | v22.1 (follow-up) |
| Mobile layout | Zero danych o mobile performance. Desktop-first. | Po testach mobile w v22 |

---

### Architektura Live Monitor Mode

#### Jak to dziala

1. User klika przycisk "Live Monitor" lub naciska `M`
2. Jesli `!monitorLoaded`: lazy init -- wstawia CSS, buduje DOM, rejestruje event listenery
3. `document.startViewTransition()` (lub instant fallback) -- sidebary chowaja sie, canvas dimuje, overlay wjezdza
4. Monitor overlay (`position: fixed; inset: 0; z-index: 300`) pokrywa caly ekran
5. Topbar HUD wyswietla: LIVE indicator, faze, progress %, czas, aktywnych agentow, STOP
6. Agent grid wyswietla agentow pogrupowanych wg faz -- aktywna faza pelne karty, ukonczone zwiniety, przyszle dimmed
7. Comms log po prawej (280px, collapsible) -- filtr = aktywna faza domyslnie
8. Phase timeline na dole -- horizontal stepper z 6 fazami
9. Symulacja dziala: agenci zmieniaja stany (`data-state`), Narrative Templates generuja tekst w comms log
10. Przy HITL decision point: blocking modal z 1 wariantem UI (expert cards + Gold Solution + Approve/Modify/Re-debate)
11. Przy Five Minds fazie: Debate Arena overlay (SHOULD) z 3 slidami (opinie -> debata -> synteza)
12. Emergency STOP w kazdym momencie -- natychmiastowe zatrzymanie
13. ESC lub M -- powrot do canvas (reverse animacja, canvas nienaruszony)
14. Po zakonczeniu: summary + confetti (1.5s max)

#### ASCII Layout

```
+------------------------------------------------------------------+
| [*LIVE] | Phase 3/6: FM#1 | [===67%===] | 04:23 | 5/27 | [STOP] |  <- TOPBAR HUD (46px)
+------------------------------------------------------------------+
|                                                    |              |
|  +--STRATEGY (done, zwiniety)--+                   | COMMS LOG    |
|  | Orkiestr. [ok] | Planista [ok] | 1m23s          | (280px)      |
|  +------------------------------------+            |              |
|                                                    | [FM#1 only v]|
|  +--RESEARCH (done, zwiniety)--+                   | 04:21 Pragm: |
|  | Researcher [ok] | Analyst [ok] | 2m05s          | "Proponuje   |
|  +------------------------------------+            |  moduly..."  |
|                                                    |              |
|  +--FIVE MINDS #1 (ACTIVE)----------------------------+  04:22 DA:|
|  | [Pragmatist ] [Visionary ] [Critic   ]          |  "Ale koszt  |
|  |  Working       Thinking    Queued               |   bedzie..." |
|  | [Mediator  ] [Devil's Adv] [Synthesiz]          |              |
|  |  Queued       Queued       Idle                  | 04:23 Vis:  |
|  +------------------------------------------------+  "A moze     |
|                                                    |   mikro..."  |
|  +--BUILD (upcoming, dimmed)--+  +--QA (dimmed)--+ |              |
|  | Backend | Frontend | ...   |  | QA Sec | ...  | |              |
|  +----------------------------+  +----------------+ |              |
+------------------------------------------------------------------+
| [STRAT *]---[RESEARCH *]---[FM#1 -->]---[BUILD]---[FM#2]---[QA]  |  <- TIMELINE (60px)
+------------------------------------------------------------------+
```

#### Stan agentow -- wizualizacja

```
IDLE     : szary   | ○ puste kolko  | breathing      | "Idle"
QUEUED   : indigo  | ◷ zegar        | pulse          | "Queued"
WORKING  : emerald | ⟳ gear         | spin ring      | "Working"
THINKING : amber   | * zarowka      | shimmer        | "Thinking"
DONE     : BLUE    | ✓ checkmark    | burst+dim      | "Done"        <- ZMIANA z zielonego!
ERROR    : red     | ⚠ trojkat      | shake+glow     | "Error"
HITL     : gold    | ✋ reka         | beacon pulse   | "Waiting"
```

---

### Implementation Roadmap

#### Phase 0: INFRASTRUCTURE (1 sesja, PRZED features)
**LOC netto: -80 (oszczednosc)**
**Zaleznosci: BRAK**

1. Performance baseline v21/v22 -- 30 min Chrome DevTools (FPS, heap, layout recalc). DOKUMENTUJ WYNIKI.
2. Audit v21: identyfikacja dead code, duplikacji CSS, nadmiarowych komentarzy. Cel: -200 LOC.
3. AnimationManager class (~80 LOC) -- centralny rAF loop z registerTask/unregisterTask/auto-cleanup.
4. Refactor istniejacych rAF w v21 na AnimationManager -- eliminacja rozproszonych loopow.
5. `prefers-reduced-motion` @media query + in-app toggle (~60 LOC). Kazdy NOWY keyframe dodawany z reduced-motion odpowiednikiem.
6. Done color change: #22C55E -> #3B82F6 (blue). Jedna linia CSS.

**Deliverable:** v22-pre z czystszym kodem, performance baseline, i infrastruktura gotowa na monitor.

#### Phase 1: CORE MONITOR (1-2 sesje)
**LOC: ~610**
**Zaleznosci: Phase 0**

1. Fullscreen overlay z HUD topbar (M1) -- ~150 LOC
2. Agent grid pogrupowany wg fazy z progresywnym reveal (M4) -- ~180 LOC
3. Agent status visualization 7 stanow z labelami (M2) -- ~200 LOC
4. Phase timeline stepper (M3) -- ~80 LOC
5. Emergency STOP z shake+flash feedback (M7) -- ~30 LOC (wliczony w M1)

**Deliverable:** MVP monitora: otwierasz, widzisz agentow, statusy, fazy, timeline, STOP dziala.

#### Phase 2: KOMUNIKACJA + INTERAKCJA (1 sesja)
**LOC: ~460**
**Zaleznosci: Phase 1**

1. Comms log / Dialog Timeline z filtrem aktywnej fazy (M6) -- ~150 LOC
2. HITL decision panel uniwersalny, 3 punkty (M5) -- ~150 LOC
3. Keyboard navigation + ARIA + focus trap (M8) -- ~80 LOC
4. Kontekstowy HUD dim completed phases (S4) -- ~30 LOC
5. Narrative Templates na comms log (S2) -- ~40 LOC
6. View Transitions API wrapper (S6) -- ~30 LOC (jesli czas)

**Deliverable:** Pelna interakcja: comms log, HITL decisions, keyboard nav, narracyjny tekst.

#### Phase 3: POLISH + EDUKACJA (1 sesja, jesli budzet LOC pozwala)
**LOC: ~275**
**Zaleznosci: Phase 2**

1. Uproszczona Debate Arena (S1) -- ~200 LOC
2. Intent Preview non-blocking (S3) -- ~80 LOC (moze byc czescia S1)
3. Mission Pulse heartbeat (S5) -- ~15 LOC
4. Simulation complete celebration (S7) -- ~60 LOC

**Deliverable:** Five Minds debate viz, intent previews, mission pulse, celebration.

#### Calkowity budzet LOC

```
Phase 0: -80 LOC (netto oszczednosc)
Phase 1: +610 LOC
Phase 2: +460 LOC
Phase 3: +275 LOC
---------------------------
RAZEM:   +1265 LOC
v22 base: 3204 LOC
Audit:    -200 LOC
---------------------------
KONCOWY:  ~4269 LOC (~350 KB)
```

To jest ZNACZNIE ponizej hard limitu 5000 LOC i 450 KB. Jest bufor ~730 LOC na nieprzewidziane komplikacje.

---

### Performance Contract

Metryki ktore MUSZA byc spelnione. Jesli nie -- optymalizujemy lub ciemy features.

| Metryka | Target | Hard Limit | Jak mierzyc |
|---------|--------|------------|-------------|
| FPS desktop (i7/M1) | >= 55 FPS | >= 45 FPS | Chrome DevTools Performance tab |
| FPS CPU 4x throttle | >= 30 FPS | >= 20 FPS | Chrome DevTools z CPU throttling |
| Time-to-Interactive | < 2s | < 3s | Chrome Lighthouse |
| Largest Contentful Paint | < 1.5s | < 2.5s | Chrome Lighthouse |
| Rozmiar pliku | < 400 KB | < 450 KB | `ls -la` |
| LOC | < 4500 | < 5000 | `wc -l` |
| Memory idle | < 80 MB | < 120 MB | `performance.memory.usedJSHeapSize` |
| Memory symulacja active | < 150 MB | < 200 MB | jw. |
| State -> Visual latencja | < 16.67ms | < 33ms | `performance.measure()` w AnimationManager |
| DOM node count w monitorze | < 1500 | < 2000 | `document.querySelectorAll('*').length` |
| rAF callback time | < 10ms | < 14ms | `performance.measure()` |
| Jednoczesne backdrop-filter | <= 3 | <= 4 | Audit CSS |
| Max animowanych elementow | <= 80 | <= 100 | AnimationManager.tasks.size |

**Degradation strategy:** Jesli FPS < 45 na mid-range:
1. Wylacz starfield particles
2. Zredukuj animated connections do static
3. Wylacz Mission Pulse
4. Wylacz glassmorphism (solid background fallback)

---

### Otwarte Pytania -> Zamkniete Odpowiedzi

#### Q1: Token cost w symulacji -- potrzebne czy bloat?
**ODPOWIEDZ: NIE W V22.** SHOULD w v23 jako opt-in z duzym disclaimerem "szacunek edukacyjny". Uzasadnienie: symulacja nie generuje prawdziwych tokenow, kazda wyswietlona kwota jest zmyslona, raport X (7.2/10) jako jedyne silne zrodlo tej feature. Analityk wyliczyl szacunek ~$3.24/sesje Opus -- wartosc edukacyjna istnieje, ale nie jest KRYTYCZNA dla v22.

#### Q2: Ile HITL punktow?
**ODPOWIEDZ: 3 domyslnie. 5 jako opcja w settings.** Timer auto-approve WYLACZONY domyslnie. 3 punkty: (1) po Strategy+Research, (2) po FM#1 Gold Solution, (3) Final Approval. Punkty 3 i 4 z MANIFEST -> Intent Preview (non-blocking info).

#### Q3: Session replay -- v22 czy pozniej?
**ODPOWIEDZ: WON'T v22. WON'T v23. MOZE v24.** Konsensus 5/5. ALE: w v22 zaprojektowac event store array (`SESSION_EVENTS = []`) do ktorego logujemy kluczowe zdarzenia -- to daje podstawe pod przyszly replay za ~10 LOC teraz.

#### Q4: Mobile support?
**ODPOWIEDZ: WON'T HAVE v22. Desktop-first.** PO implementacji: smoke test na mobile (iPhone SE, Pixel). Jesli crash/FPS < 20 -- dodac aggressive degradation (zero particles/starfield/glassmorphism na mobile via media query). Ale NIE projektujemy pod mobile.

#### Q5: Autonomy Dial default?
**ODPOWIEDZ: "Act with Confirmation" (3 HITL) jako default.** 3 poziomy zamiast 4 z MANIFEST (wyrzucamy "Plan & Propose" -- to "Act with Confirmation" z extra kliknieciem). Poziom 1: Full Control (5 HITL + Intent Preview). Poziom 2: Act with Confirmation (3 HITL, default). Poziom 3: Full Auto (0 HITL, dashboard only).

#### Q6: Rozmiar pliku -- limit?
**ODPOWIEDZ: Hard limit 5000 LOC / 450 KB.** Audit v21 przed implementacja (cel: -200 LOC). Lazy init monitora. Feature flags. BEZ build stepu. Prognoza: ~4300 LOC / ~350 KB po implementacji -- w bezpiecznej strefie z buforem.

#### Q7: Node design -- karty czy orby?
**ODPOWIEDZ: Karty w monitorze, orby na canvasie.** Monitor = dashboard, dashboard uzywa kart (160x90px: nazwa, status label, progress bar). Ukonczone fazy = mini karty (80x40px). Przyszle fazy = dimmed orby (32px). Drill-down: klik na karte -> overlay z detalami (reuse showND() z v21). BEZ nowego renderera -- adapt renderBentoAgent.

#### Q8: Dane z Researcher X -- ufac?
**ODPOWIEDZ: NIE UFAC LICZBOM. UFAC WZORCOM.** Wyrzucamy wszystkie features oparte WYLACZNIE na raporcie X: token cost (v22), reliability chain (v22), quality score (nigdy). Zachowujemy WZORCE: Autonomy Dial (potwierdzone przez LangGraph), compound failure concept (matematycznie poprawne, uzyteczne edukacyjnie). Traktujemy X jako inspiracje, nie jako requirements.

---

### Co Przegralo i Dlaczego

| Idea | Autor | Dlaczego przegrala | Szacunek |
|------|-------|--------------------|----------|
| **800 LOC "Lite" monitor** | Cien | Zbyt agresywna redukcja -- wyrzuca USP (Five Minds viz, HITL) ktore sa differentiatorami vs konkurencja. ALE: jego ostrzezenia o complexity sa CENNE i wbudowane w hard limity. | Cien jest najlepszym krytykiem w debacie. Jego "Lite" to zbyt daleko, ale jego diagnoza problemow jest trafna. |
| **Zero HITL (dashboard only)** | Cien | HITL jest czesciowo "teatrem bezpieczenstwa" w symulacji -- zgoda. ALE wartosc edukacyjna HITL jest REALNA: user uczy sie KIEDY interweniowac, JAKIE pytania zadawac, JAK oceniac output AI. Usunieciem HITL tracimy core lesson. | Kompromis: 3 zamiast 5, timer OFF, non-blocking Intent Preview zamiast blocking modali na mniej krytycznych punktach. |
| **Debate Theatre (full cinema)** | Innowator | Tension meter, argument weight, round transitions, rhythm animation -- to ~400+ LOC animacji ktore user obejrzy raz i kliknie skip. ROI ujemne. ALE polkole ekspertow i round-based pacing ZACHOWANE. | Innowator ma najlepsza wizje, ale najgorsze szacunki LOC. Bierzemy essence, wyrzucamy chrome. |
| **Ghost Trail (decision ghosts)** | Innowator | 80 LOC na polprzezroczyste klony DOM -- na ekranie z 27 agentami to dodatkowy clutter. Wartosc koncepcyjna (widzisz swoje decyzje) mozna osiagnac prosciej: lista "Decision History" w comms log. | Innowator mysli wizualnie, ale ekran ma OGRANICZONA przestrzen. |
| **4 warianty UI dla HITL** | MANIFEST | 4 oddzielne layouty (Debate Arena, Side-by-Side, Quick Approval, Confidence Slider) = 400+ LOC za system ktorego 75% user nigdy nie zobaczy. 1 uniwersalny wariant z opcjonalnym expand obsluguje 95% scenariuszy. | MANIFEST sam ostrze, ze review fatigue jest ryzykiem -- a potem projektuje 4 layouty. Contradictory. |
| **Token cost w HUD** | MANIFEST, X | Zmyslone liczby w pre-scripted symulacji tworzace falszywe poczucie precyzji. Cien ma racje: "$12.40" obok symulowanych agentow to misleading. Analityk wyliczyl realistyczny szacunek (~$3.24 Opus) -- ale nawet realistyczny szacunek bez disclaimer jest niebezpieczny. | Wartosc edukacyjna ISTNIEJE, ale wymaga wlasciwego framingu. V23 z opt-in i disclaimerem. |
| **BroadcastChannel / FSAPI** | MANIFEST, Innowator | Cien najlepiej to ujal: "Kim jest uzytkownik, ktory otwiera edukacyjny konfigurator, uruchamia symulacje, otwiera DRUGI TAB z monitororem, i importuje zewnetrzne dane? Ten uzytkownik NIE ISTNIEJE." | Planowanie dla phantom user persona. |
| **Adaptive Autonomy (ML)** | Innowator | System uczacy sie preferencji usera to swietna wizja na v24+. Ale w v22 nie mamy ZADNYCH danych o userach. Budowanie systemu ML na bazie 0 danych to premature optimization. | Zapisujemy pomysl -- moze wrocic gdy bedziemy mieli localStorage z historiaja sesji. |
| **Prosta tabela 5x3 zamiast Debate Arena** | Cien | Zbyt agresywna redukcja USP. Five Minds debate viz to JEDYNY unikalny feature vs cala konkurencja (Analityk potwierdza). Tabela zabija differentiator. ALE: uproszczony layout (statyczny, bez animacji) to kompromis miedzy tabela a cinema. | Cien ma racje ze "tresc > forma", ale layout WSPIERA tresce -- polkole z Gold Solution focal jest czytelniejsze niz tabela. |
| **Spike-first development** | Cien | "Zbuduj brzydki prototyp, pokaz 3 osobom, zbierz feedback" -- to byloby IDEALNE gdybysmy mieli userow. Nie mamy. Five Minds Protocol to najlepszy dostepny substytut user research. | Cien prawidlowo identyfikuje brak user research jako blind spot. Ale jego alternatywa wymaga userow, ktorych tez nie mamy. Oba podejscia sa ograniczone. |

---

### Nota Koncowa Syntetyka

Ta Gold Solution jest KOMPROMISEM, nie utopia. Pragmatyk nie dostal 100% (SHOULD features sa na liscie). Innowator nie dostal 100% (wiekszosc "wow" features wyrzucona). Cien nie dostal 100% (HITL zachowane, 7 stanow zachowanych). Rzecznik dostal prawie 100% (labele, daltonizm fix, keyboard nav, timer OFF, 3 HITL).

Najwiecej slucham Pragmatyka i Rzecznika -- bo jeden mowi "co da sie zrobic" a drugi "co user NAPRAWDE potrzebuje". Innowator daje iskre (Narrative Templates, Mission Pulse), Analityk daje twarde dane (LOC, rozmiary, benchmarki), Cien trzyma nas uczciwie (ostrzezenia o scope, performance, sustainability).

Kluczowa zasada: **KAZDA feature musi odpowiadac na pytanie "Czy to pomaga userowi ZROZUMIEC lub ZDECYDOWAC?" Jesli nie -- wyrzucamy.**

---

*Raport przygotowany przez Syntetyk [OPUS] w ramach Five Minds Protocol.*
*Perspektywa: Mediacja, synteza, decyzyjnosc.*
*72% konsensusu -- wiekszosciowy kompromis z uszanowaniem mniejszosci.*
*Data: 4 kwietnia 2026*
