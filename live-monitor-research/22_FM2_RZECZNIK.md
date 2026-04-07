# Rzecznik Uzytkownika -- Five Minds Debata #2 (post-BUILD)
## Walidacja Specyfikacji BUILD pod katem UX

**Rola:** Rzecznik Uzytkownika (User Advocate)
**Perspektywa:** UZYTKOWNIK KONCOWY
**Data:** 2026-04-04
**Specyfikacje oceniane:** 14_DESIGNER.md, 15_FRONTEND_DEV.md, 16_FEATURE_DEV.md, 18_INTEGRATOR.md
**Porownanie z:** 11_RZECZNIK_UZYTKOWNIKA.md (moja pozycja z Debaty #1)

---

## 1. STANOWISKO GLOWNE

Specyfikacje BUILD sa **solidna robota inzynierska**. Zespol wyraznie sluchal debaty #1 -- wiekszosc moich linii w piasku znalazla odzwierciedlenie w kodzie. Ale UX nie jest checklist. Kilka fundamentalnych rzeczy wypadlo miedzy szczelinami: brak Demo Mode, niejasne zachowanie Escape podczas HITL (SPRZECZNOSC miedzy specami), i speech bubbles bez specyfikacji czasu wyswietlania. To nie sa drobnostki -- to sa momenty w ktorych user traci zaufanie do narzedzia.

Moje motto z debaty #1 pozostaje aktualne: **"Czytelnosc jak dashboard, prostosc jak appka -- a dopiero POTEM pieknosc jak portfolio."** Specyfikacje BUILD zbilansowaly estetyki i funkcjonalnosc lepiej niz sie spodziewalem. Ale jest kilka luk.

---

## 2. LINIE W PIASKU -- AUDIT

### Linia 1: OBOWIAZKOWE LABELE TEKSTOWE NA STATUSACH

| Ocena | **SPELNIIONA** |
|-------|----------------|

**Dowody:**
- 14_DESIGNER.md sekcja 2.2: Kazdy z 7 stanow ma kolumne "Label" z polskim tekstem: "Idle", "W kolejce", "Pracuje", "Mysli", "Gotowe", "Blad", "Czeka na Ciebie"
- 14_DESIGNER.md sekcja 8.6: Tabela "4 kanaly rozrozniania" -- kanal 4 = "Label tekst"
- 15_FRONTEND_DEV.md HTML: `<span class="lm-agent-state-label">` -- dedykowany element na label
- 15_FRONTEND_DEV.md CSS: `.lm-agent-state-label` -- `font-size: 8px, uppercase, letter-spacing: 0.04em`
- 15_FRONTEND_DEV.md sekcja 3b: "Trzy kanaly rozrozniania (wymog a11y)" -- punkt 3 = "Text label (obowiazkowy)"

**Uwaga:** Label na 8px jest MALY. Na 13" laptopie to moze byc na granicy czytelnosci. Rekomendacja: 9px minimum w compact mode. Ale JEST -- wiec linia spelniona.

---

### Linia 2: TIMER AUTO-APPROVE DOMYSLNIE WYLACZONY

| Ocena | **SPELNIIONA** |
|-------|----------------|

**Dowody:**
- 15_FRONTEND_DEV.md HTML: `<div class="lm-hitl-timer" id="lmHitlTimer" hidden>` -- atrybut `hidden` domyslnie
- 15_FRONTEND_DEV.md HTML: Komentarz "Timer auto-approve -- WYLACZONY domyslnie, opt-in w settings"
- 16_FEATURE_DEV.md F4: `let autoApprove = false;` -- domyslnie OFF w kodzie
- 16_FEATURE_DEV.md F4: `setAutoApprove(enabled, timerSeconds = 60)` -- metoda publiczna do wlaczenia
- 18_INTEGRATOR.md: `const LM_AUTO_APPROVE = false;` -- feature flag OFF

Timer jest opt-in, domyslnie ukryty. Dokladnie to o co prosilem.

---

### Linia 3: ESCAPE ZAWSZE DZIALA

| Ocena | **WARUNKOWO SPELNIIONA -- SPRZECZNOSC W SPECYFIKACJACH** |
|-------|----------------------------------------------------------|

**Dowody ZA:**
- 18_INTEGRATOR.md linia 261-263: Escape handler -- Live Monitor jako PIERWSZY check: `if(lmOpen_){lmClose();return}`
- 18_INTEGRATOR.md sekcja 2.3: Tabela Exit Points -- Escape = "Zamyka monitor, NIE zatrzymuje symulacji"
- 14_DESIGNER.md sekcja 8.3: Escape = "Close monitor / Close HITL / Close Debate -- Nested priority"

**SPRZECZNOSC:**
- 15_FRONTEND_DEV.md sekcja 4.3 (Shortcuts): `Escape | HITL otwarty | NIE zamyka HITL (decyzja wymagana) -- zamyka monitor`
- 16_FEATURE_DEV.md F4 (HITL Engine): `_bindDecisionKeys` -- `if (e.key === 'Escape') { resolve({ optionId: 'skip' }); }` -- Escape = SKIP (zamyka HITL z decyzja 'skip')
- Edge case w F4: "User zamyka monitor (ESC) podczas HITL -- Traktuj jak 'skip'"

**Problem:** Trzy rozne zachowania Escape podczas HITL:
1. Designer (14): Escape zamyka HITL (nested priority: HITL -> Debate -> Monitor)
2. Frontend Dev (15): Escape NIE zamyka HITL, zamyka caly monitor
3. Feature Dev (16): Escape = 'skip' (zamyka HITL z decyzja domyslna)

**WYROK:** To jest krytyczna niespojnosc. User naciska Escape -- co sie dzieje? Moja pozycja: Escape powinien zamykac **najblizszy kontekst** (tzn. najpierw HITL -> potem Debate -> potem Monitor), z traktowaniem zamkniecia HITL jako 'skip/approve'. Zgodne z opcja (1) z Designera i (3) z Feature Dev, ale NIE z (2) z Frontend Dev.

**Wymagane uzgodnienie miedzy zespolami PRZED implementacja.**

---

### Linia 4: MAX 3 HITL POINTS DOMYSLNIE

| Ocena | **SPELNIIONA** |
|-------|----------------|

**Dowody:**
- 18_INTEGRATOR.md: `const LM_HITL_POINTS = 3;`
- 18_INTEGRATOR.md sekcja 5.2: `LM_HITL_MAP` -- 3 wpisy (post-research, post-fm1, final)
- 16_FEATURE_DEV.md F4: `DEFAULT_CHECKPOINTS` -- array z dokladnie 3 checkpointami
- 16_FEATURE_DEV.md F4: `setCheckpointCount(count)` -- mozliwosc zmiany 1-5
- 15_FRONTEND_DEV.md: Badge `1/3`, `2/3`, `3/3` -- user widzi ile HITL punktow go czeka

Dokladnie 3 punkty, z mozliwoscia konfiguracji. Perfekcyjnie.

---

### Linia 5: DONE != ZIELONY (daltonizm)

| Ocena | **SPELNIIONA** |
|-------|----------------|

**Dowody:**
- 14_DESIGNER.md sekcja 2.2: `done | blue-500 | #3B82F6` -- NIEBIESKI, nie zielony
- 14_DESIGNER.md: **Pogrubionym:** "UWAGA: done uzywa BLUE (#3B82F6) zamiast green -- fix daltonizmu z Gold Solution"
- 15_FRONTEND_DEV.md CSS: `--lm-done: #3B82F6; /* NIEBIESKI -- zmiana z #22C55E! */`
- 15_FRONTEND_DEV.md CSS: `.lm-agent[data-state="done"]` -- caly blok uzywa `rgba(59, 130, 246, *)` (blue)
- 14_DESIGNER.md sekcja 8.6: "Krytyczny fix: done (#3B82F6 blue) vs working (#34D399 green) -- rozroznialne dla protanopii/deuteranopii"
- 18_INTEGRATOR.md sekcja 8 (Implementation Order): Krok 0.3 -- jawna instrukcja zmiany done color z zielonego na niebieski

Zmiana jest konsekwentna WSZEDZIE -- color system, CSS, collapsed checkmarks (#3B82F6), timeline dots. Zero pominiec.

---

### Linia 6: COMPACT MODE MUSI ISTNIEC

| Ocena | **CZESCIOWO SPELNIIONA** |
|-------|--------------------------|

**Dowody ZA:**
- 14_DESIGNER.md sekcja 7: Cztery breakpointy (xl >= 1920, lg 1440-1919, md 1280-1439, sm 1024-1279) z DOKLADNYMI CSS media queries
- 14_DESIGNER.md sm breakpoint: Comms log starts collapsed, icons only w timeline, mniejsze karty 132px
- 15_FRONTEND_DEV.md sekcja 2.13: Responsive CSS z media queries (max-width: 1400px i 1100px)
- 16_FEATURE_DEV.md F8: CompactMode singleton z mediaQuery listener, toggle manual, pelny CSS

**PROBLEM:**
- 16_FEATURE_DEV.md klasyfikuje Compact Mode jako **SHOULD, Phase 3+** -- nie MUST
- Gold Solution (cytowane w Feature Dev): "Compact mode = v22.1"
- Oznacza to ze Compact Mode moze BYC POMINIETE w pierwszej implementacji

**WYROK:** Specyfikacja jest NAPISANA -- co jest dobre. Ale jesli jest SHOULD a nie MUST, to na 13" laptopie user bedzie mial agent karty 160px nachodzace na siebie, comms log zabierajacy 280px z 1366px szerokosc (zostaje 1086px na grid z 24 agentami), i timeline text obcinany.

Responsive breakpoints z Designera (sekcja 7) SA wystarczajace jako Plan B jesli Compact Mode nie wejdzie -- ale te breakpointy tez musza byc implementowane z priorytetem MUST.

**Wymagane potwierdzenie:** Czy breakpointy CSS z 14_DESIGNER.md sekcja 7 sa czescia core layoutu (MUST) czy tez sa SHOULD?

---

## 3. USER JOURNEY WALKTHROUGH

Przeprowadzam moj 11-krokowy user journey z debaty #1 przez specyfikacje BUILD.

### KROK 1: Otwarcie aplikacji (0s)
**Oczekiwanie:** Szybkie zaladowanie, zero lagowania.

| Zaadresowane? | TAK |
|---------------|-----|
- 18_INTEGRATOR.md: Lazy initialization -- DOM monitora tworzony dopiero przy pierwszym uzyciu (`if (!lmLoaded)`)
- 18_INTEGRATOR.md P4/P5: Target czasu otwarcia < 200ms cold, < 50ms warm
- 18_INTEGRATOR.md P9: Target rozmiar pliku < 400KB

**Brak:** Zero specyfikacji czasu PIERWSZEGO LADOWANIA strony (First Contentful Paint). Tylko czas otwarcia monitora. Dla usera to nie to samo -- jesli strona z 24 nodami na canvasie laduje sie 3s, to monitor jest nieistotny.

### KROK 2: Zapoznanie sie z presetem (30-60s)
**Oczekiwanie:** Czytelny overview calego workflow.

| Zaadresowane? | TAK (posrednio) |
|---------------|-----------------|
- Nie dotyczy bezposrednio BUILD specs (to canvas, nie monitor). Ale 18_INTEGRATOR.md jawnie mowi "NIE RUSZAC rNd(), rConn()" -- canvas jest nienaruszony.

### KROK 3: Uruchomienie Live Monitor (klik M lub przycisk)
**Oczekiwanie:** Plynne przejscie (<600ms), zachowanie kontekstu mentalnego.

| Zaadresowane? | TAK |
|---------------|-----|
- 18_INTEGRATOR.md sekcja 2.2: Entry Animation Sequence 9 krokow, calosciowy czas ~700ms
- 18_INTEGRATOR.md: "SKIPOWALNE kliknieciem lub Escape -- natychmiastowe transition: none + finalna pozycja"
- 14_DESIGNER.md: Morphing z canvas do grid -- karty agentow pogrupowane wg faz (te same agenci co na canvasie)
- 18_INTEGRATOR.md sekcja 2.1: Dwie sciezki wejscia (przycisk + M)

**Uwaga:** 700ms to wiecej niz moje postulowane 400ms max z debaty #1. ALE jest skipowalne -- wiec OK. Problem: GDZIE jest opisane skakowanie animacji? Integrator mowi "SKIPOWALNE kliknieciem lub Escape" -- ale brak pseudo-kodu jak to realizowac. Frontend Dev i Designer nie maja pseudo-kodu skip. To jest "w powietrzu".

### KROK 4: Obserwacja Fazy Strategy (1-2 min)
**Oczekiwanie:** "Widze kto pracuje, co robi, ile trwa."

| Zaadresowane? | TAK |
|---------------|-----|
- 14_DESIGNER.md sekcja 1.5: Agent Card 160x96px z progress bar + message preview + status
- 14_DESIGNER.md sekcja 3.1: 7 stanow wizualnych -- kazdy z unikalna animacja + kolor + label
- 15_FRONTEND_DEV.md CSS: Pelne 7-state variants na agent card
- 14_DESIGNER.md sekcja 3.3: HUD z faza, progress, timer, aktywni agenci

**Dobrze zaadresowane.** Agent cards z progress bar + last message + label statusu = dokladnie to o co prosilem w Q7 (hybrid approach).

### KROK 5: HITL #1 -- Akceptacja planu (15-30s)
**Oczekiwanie:** Jasne co akceptuje, szybkie podjecie decyzji.

| Zaadresowane? | TAK |
|---------------|-----|
- 16_FEATURE_DEV.md F4: 3 checkpointy z contextBuilder -- buduje kontekstowe dane do decyzji
- 15_FRONTEND_DEV.md: `role="alertdialog"`, `aria-modal="true"` -- blocking modal
- 14_DESIGNER.md sekcja 3.4: Gold Solution card wyrozniona (gold border + glow)
- 15_FRONTEND_DEV.md: Badge "1/3" -- user wie ile decyzji go czeka
- Keyboard shortcuts A/D/R -- szybka decyzja

**Brak z debaty #1:** "Co sie zmienilo" diff -- porownanie Gold Solution z oryginalnym planem usera. Nikt tego nie zaadresowal. Expert cards sa, Gold Solution jest, ale DIFF nie ma. User musi sam porownywac w glowie. To nie jest dealbreaker, ale jest stracona szansa na redukcje czasu decyzji.

### KROK 6: Fazy Research + Five Minds Debate #1 (3-5 min)
**Oczekiwanie:** "Widze KTO mowi CO, i gdzie sa spory."

| Zaadresowane? | TAK |
|---------------|-----|
- 14_DESIGNER.md sekcja 3.7: Debate Arena z 3 slajdami (Opinie -> Debata -> Synteza)
- 16_FEATURE_DEV.md F5: DebateArena renderer z polkolem 5 ekspertow
- Round-based pacing -- dokladnie moja propozycja z debaty #1

**BRAK z debaty #1:** "Kolejkowanie speech bubbles -- max 2 widoczne naraz." Specyfikacje nie adresuja problemu 5 speech bubbles pojawiajacych sie jednoczesnie. W Debate Arena jest statyczny layout (BEZ typing indicators -- dobra decyzja), ale w GRIDZIE podczas fazy FM, 5 agentow moze miec speech bubbles naraz. Nie ma mechanizmu kolejkowania.

### KROK 7: HITL #2 -- Gold Solution (30-60s)
**Oczekiwanie:** Debate Arena czytelny, argumenty widoczne.

| Zaadresowane? | TAK |
|---------------|-----|
- 14_DESIGNER.md sekcja 3.7: Pelna specyfikacja Debate Arena -- 3 slajdy z nawigacja
- Expert cards z stance badges (Za/Przeciw/Warunkowo) -- czytelne
- Gold Solution jako focal card -- WIEKSZA, wyrozniona, gold border
- Keyboard Left/Right miedzy rundami

**Dobrze zaadresowane.** Confidence slider (ktory krytykowalem w debacie #1) NIE ISTNIEJE w specyfikacji -- prawidlowo usuniety.

### KROK 8: Fazy Build + QA + Five Minds #2 (5-10 min)
**Oczekiwanie:** Wraca i natychmiast widzi "gdzie jestem".

| Zaadresowane? | TAK |
|---------------|-----|
- 14_DESIGNER.md: Completed phases dimmed (opacity 0.4 + grayscale 0.3), active phase pelna widocznosc
- Phase timeline bar na dole z completed checkmarks + active glow
- HUD z "Phase 3/6: Five Minds #1" -- natychmiastowa orientacja

**BRAK z debaty #1:** "Catch up mode -- szybkie podsumowanie co user przegapil." Jesli user odejdzie od ekranu na 5 min i wroci, widzi biezacy stan ale NIE WIE co sie wydarzylo pod jego nieobecnosc. Comms log scrollowal dalej -- ale user musi go reczne przewijac. Brak mechanizmu "oto co przegapiles" summary.

### KROK 9: Final Approval (15s)
**Oczekiwanie:** Szybkie, bo user juz zna kontekst.

| Zaadresowane? | TAK |
|---------------|-----|
- 16_FEATURE_DEV.md F4: checkpoint 'final-approval' z opcjami Deploy/Reject/Review
- Prostsze opcje niz GM#1 -- nie ma Re-debate na final

### KROK 10: Simulation Complete
**Oczekiwanie:** Poczucie zamkniecia. Statystyki, opcja exportu.

| Zaadresowane? | CZESCIOWO |
|---------------|-----------|
- 18_INTEGRATOR.md: `lmOnComplete()` -> `lmShowSummary()` (confetti + stats) z `setTimeout(lmClose, 3000)`
- Ale `lmShowSummary()` nie ma SPECYFIKACJI w zadnym z dokumentow! Feature Dev nie opisuje co zawiera summary. Designer nie ma layoutu summary panelu. Jest tylko referencja w Integrator.

**BRAK:** Specyfikacja summary panelu (co dokladnie user widzi po zakonczeniu: czas, fazy, decyzje, szacunek kosztow?). Jest jedynie `// (S7)` jako SHOULD.

### KROK 11: Powrot do canvas
**Oczekiwanie:** Canvas nienaruszony.

| Zaadresowane? | TAK |
|---------------|-----|
- 18_INTEGRATOR.md sekcja 2.4: "Canvas NIENARUSZONY -- nodes, conns, sel, scale, panX, panY -- BEZ ZMIAN"
- 18_INTEGRATOR.md sekcja 3.3: "Czego NIE WOLNO RUSZAC" -- lista funkcji canvasowych ktore nie sa modyfikowane
- 18_INTEGRATOR.md: Symulacja kontynuuje w tle po zamknieciu monitora

---

### User Journey Scorecard

| Krok | Status | Uwagi |
|------|--------|-------|
| 1. Otwarcie | PASS | Lazy init, performance targets |
| 2. Zapoznanie | PASS | Canvas nienaruszony |
| 3. Uruchomienie LM | PASS | Skipowalna animacja, M/button |
| 4. Obserwacja Strategy | PASS | Karty z progress + message + label |
| 5. HITL #1 | PASS* | Brak diff "co sie zmienilo" |
| 6. FM Debate | PASS* | Brak kolejkowania speech bubbles |
| 7. HITL #2 Gold | PASS | Debate Arena 3 slajdy, Gold focal |
| 8. Build+QA (wraca) | PASS* | Brak "catch up" summary |
| 9. Final Approval | PASS | Prosty deploy/reject |
| 10. Complete | PARTIAL | Summary panel nie wyspecyfikowany |
| 11. Powrot | PASS | Canvas nienaruszony |

**Wynik: 8/11 pelny PASS, 3 PASS z uwagami, 0 FAIL.**

---

## 4. COGNITIVE LOAD ANALYSIS

### Co wyswietla sie jednoczesnie na ekranie?

**Stan normalny (faza aktywna, bez overlayow):**

| Element | Ilosc informacji | Glanceable? |
|---------|------------------|------------|
| Topbar HUD | 6 metryk (LIVE, faza, progress, timer, agenci, STOP) | TAK -- 5s |
| Active phase | 2-6 agent cards z progress + message + status | TAK -- ale 6 kart = duzo |
| Completed phases | Collapsed mini-view per faza | TAK -- zwiniety = niski load |
| Upcoming phases | Dimmed (opacity 0.3) | TAK -- wizualnie "nie teraz" |
| Comms log | Scrollable lista wiadomosci | TAK -- filtr aktywnej fazy |
| Phase timeline | 6 dots z connectorami | TAK -- natychmiastowa orientacja |
| Speech bubbles | 0-N jednoczesnie | **RYZYKO** -- brak limitu |

**Ocena:** Gold Solution i specyfikacje dobrze rozwiazaly problem progresywnego reveal (completed = dimmed, upcoming = ghost, active = full). Topbar HUD jest zwarty (6 elementow w jednej linii).

**PROBLEM 1:** Speech bubbles -- specyfikacje nie definiuja ILE moze byc jednoczesnie widocznych. W mojej debacie #1 prosilem o max 2 widoczne z kolejkowaniem. Specyfikacje nie adresuja tego. Podczas fazy FM z 5 ekspertami, 5 speech bubbles naraz = chaos.

**PROBLEM 2:** Comms log ma filtr domyslny = aktywna faza (moja linia #6 -- SPELNIIONA!). Ale przy 5 agentach mowiacych jednoczesnie, nawet filtrowany log dostaje 5 wiadomosci w kilka sekund. Brak mechanizmu "debounce" wyswietlania.

**PROBLEM 3:** Agent card na 160x96px miesci: ikone, nazwe, role, progress bar, message preview, status label, status dot. To 7 elementow na karcie wielkosci wizytowki. Na "sm" breakpoint (132x80px) -- czy message preview w 1 linii jest jeszcze czytelny?

### Cognitive Load Score

| Scenariusz | Ilosc jednoczesnych informacji | Score (1-5) | Akceptowalne? |
|------------|-------------------------------|-------------|---------------|
| Idle (miedzy fazami) | HUD + dimmed grid + timeline | 2/5 | TAK |
| Aktywna faza (2-3 agenci) | HUD + 3 karty + log + timeline | 3/5 | TAK |
| Five Minds (5 ekspertow) | HUD + 5 kart + 5 bubbles + log | 4.5/5 | RYZYKO |
| HITL Decision | Modal + HUD (dimmed) | 2/5 | TAK |
| Debate Arena | 5 expert cards + Gold Solution + nav | 3/5 | TAK |

---

## 5. ACCESSIBILITY AUDIT

### 5.1 ARIA Attributes -- kompletnosc

| Komponent | ARIA | Kompletny? | Uwagi |
|-----------|------|-----------|-------|
| Monitor overlay | `role="dialog" aria-modal="true" aria-label` | TAK | |
| Topbar | `role="banner"` | TAK | |
| Phase badge | `aria-live="polite"` | TAK | Zmiany faz oglaszane screen readerowi |
| Progress bar | `role="progressbar" aria-valuenow/min/max` | TAK | |
| Agent grid | `role="main" aria-label` | TAK | |
| Phase group | `role="region" aria-label` | TAK | |
| Agent card | `role="listitem" tabindex="0" aria-label` | TAK* | *aria-label dynamiczny (agent+stan+progress) |
| Speech bubble | `aria-live="polite"` | TAK | |
| Comms log | `role="log" aria-live="polite"` | TAK | |
| Comms filter | `aria-label` na select | TAK | |
| HITL panel | `role="alertdialog" aria-modal="true" aria-describedby` | TAK | |
| HITL buttons | `accesskey`, `aria-label`, `kbd` | TAK | |
| Debate Arena | `role="region" aria-label` | TAK | |
| Phase timeline | `role="navigation" aria-label` | TAK | |
| Intent Preview | `role="status" aria-live="polite"` | TAK | |
| SR-only announcer (status) | `role="status" aria-live="polite" .sr-only` | TAK | Designer 8.2 |
| SR-only announcer (HITL) | `role="alert" aria-live="assertive" .sr-only` | TAK | Designer 8.2 |

**Ocena:** ARIA jest WYJATKOWO kompletne. Frontend Dev i Designer uzgodnili role, live regions, labele. Wiecej niz oczekiwalem.

### 5.2 Keyboard Navigation

| Scenariusz | Zaadresowane? | Uwagi |
|------------|---------------|-------|
| Tab order w monitorze | TAK | 15_FRONTEND: 8-krokowy tab flow |
| Focus trap w HITL | TAK | 3 przyciski, Tab cycle |
| Focus trap w Debate | TAK | Close/Prev/Next cycle |
| Escape z kazdego kontekstu | SPRZECZNOSC | Patrz Linia #3 audit |
| A/D/R w HITL | TAK | Tylko gdy decision pending |
| Left/Right w Debate | TAK | Nawigacja rundami |
| Space pauza | TAK | W monitorze |
| Focus-visible ring | TAK | 2px solid indigo, offset 2px |
| Focus:not(:focus-visible) | TAK | Ukryty ring dla myszy |

**BRAK:**
1. **Skip links** -- w mojej checklist A11y z debaty #1 wymienialem "Skip links na poczatku DOM". Nie znalazlem skip links w zadnej specyfikacji. To WCAG 2.4.1 (Level A). Powinien byc przynajmniej "Przejdz do siatki agentow" link na poczatku monitora.
2. **44x44px touch target** -- WCAG 2.5.8 (Level AAA, ale rekomendowane). Agent cards sa duze (160x96), ale przyciski w topbar (`padding: 5px 12px`) moga byc za male. STOP button ma `padding: 5px 16px` -- to ok. Pause button 32x32px -- PONIZEJ 44px.

### 5.3 prefers-reduced-motion

| Zaadresowane? | TAK |
|---------------|-----|
- 15_FRONTEND_DEV.md: Dedykowany blok `@media (prefers-reduced-motion: reduce)` -- zeruje WSZYSTKIE animacje na `lm-` elementach
- 16_FEATURE_DEV.md F1: AnimationManager automatycznie wylacza decorative tasks
- 16_FEATURE_DEV.md F3: Mission Pulse jako 'decorative' -- wylaczane
- 14_DESIGNER.md: Kazda animacja ma reduced-motion fallback w tabelce

### 5.4 Kontrast kolorow

| Para | Ratio | WCAG AA (4.5:1)? |
|------|-------|-------------------|
| --lm-t1 (#E4E4E7) na --lm-bg0 (#06060A) | 16.5:1 | TAK |
| --lm-t2 (#A1A1AA) na --lm-bg0 (#06060A) | 7.5:1 | TAK |
| --lm-t3 (#71717A) na --lm-bg0 (#06060A) | 4.8:1 | TAK (>= 12px) |
| --lm-t4 (#52525B) na --lm-bg0 (#06060A) | 3.3:1 | NIE (tylko >= 18px bold) |
| Status labels (8px, uppercase) | Zalezy od koloru | RYZYKO -- 8px tekst na 4.8:1 to na granicy |

**Ocena:** Kontrast jest dobrze zaplanowany. Designer jawnie podaje ratio i minimalny rozmiar fontu per token. Jedyne ryzyko: label status "W kolejce" w kolorze #818CF8 (indigo) na tle karty `rgba(6,6,10,0.6)` -- to moze nie przejsc 4.5:1 przy 8px. Do zweryfikowania kalkulatorem.

---

## 6. SCENARIUSZE EDGE CASE

### Edge Case 1: User klika Escape podczas HITL

**SPRZECZNOSC w specyfikacjach** (opisana szerzej w Linii #3).

Trzy rozne specyfikacje daja trzy rozne odpowiedzi:
- Designer: Escape zamyka HITL (nested priority)
- Frontend Dev: Escape NIE zamyka HITL, zamyka caly monitor
- Feature Dev: Escape = skip (zamyka HITL z default decision)

**Moja rekomendacja:** Escape = zamknij HITL jako 'skip' (Feature Dev wersja), bo:
1. User zawsze oczekuje ze Escape zamyka najblizszy kontekst
2. Zamkniecie calego monitora BEZ podjecia decyzji (Frontend Dev) = user traci kontekst i moze nie wiedziec ze decyzja jest nadal wymagana
3. "Skip" jest bezpiecznym defaultem (= approve z logowaniem)

**KRYTYCZNE: To musi byc uzgodnione przed kodem.**

### Edge Case 2: 5 ekspertow mowi naraz w debacie

**W Debate Arena:** ZAADRESOWANE. Round-based pacing (3 statyczne slajdy) eliminuje problem. User widzi rundy sekwencyjnie.

**W Agent Grid (POZA Debate Arena):** NIEZAADRESOWANE. Podczas fazy Five Minds, 5 agentow jednoczesnie przechodzi w stan 'working'. Kazdy dostaje speech bubble (z v14/v22 mechanizmu). 5 speech bubbles jednoczesnie na kartach 160x96 -- nachodzace na siebie, nieczytelne.

**W Comms Log:** CZESCIOWO ZAADRESOWANE. Filtr aktywnej fazy pokazuje tylko FM wiadomosci, ale 5 wiadomosci w kilka sekund = szybki scroll. Brak debounce.

**Rekomendacja:**
1. Max 2 speech bubbles jednoczesnie w gridzie -- reszta kolejkowana z "2 more..." indicator
2. Comms log: grupowanie wiadomosci z tej samej rundy debaty w 1 wpis zbiorczy ("Round 1: 5 opinii -- kliknij aby rozwinac")

### Edge Case 3: User ma 13" laptop (1366x768)

**Specyfikacja:**
- 14_DESIGNER.md sm breakpoint (<= 1279px): mniejsze karty (132px), comms collapsed, timeline icons-only
- 16_FEATURE_DEV.md F8: CompactMode z mediaQuery 1279px -- SHOULD priority

**Ale 1366px to NIE 1279px.** User na 1366x768 trafil w breakpoint "md" (1280-1439px) z Designera, ktory redukuje do 140px kart i 240px comms log. Zostaje 1366 - 240 = 1126px na grid. Przy 140px kartach + 10px gap: 1126 / 150 = ~7 kart w rzedzie. Dla fazy Build z 5 agentami -- zmiesci sie.

**ALE:** Wysokosc 768px - 48px (topbar) - 56px (timeline) = 664px na grid. Faza aktywna z kartami 92px + header 56px = ~148px per faza. 4 fazy (2 done collapsed ~44px each + 1 active ~200px + 1 upcoming ~100px) = ~388px. ZMIESCI SIE.

**Compact mode (F8) nie jest krytyczny dla 1366px** -- breakpointy CSS z Designera wystarczaja. Compact mode jest potrzebny dla 1024-1279px (np. stare 12" laptopy). To zmniejsza priorytet mojego zalu.

**Ocena: AKCEPTOWALNE** z breakpointami CSS z sekcji 7 Designera -- pod warunkiem ze te breakpointy sa MUST a nie SHOULD.

### Edge Case 4: Tab w tle -> throttling -> user wraca

**Zaadresowane:**
- 16_FEATURE_DEV.md F1 (AnimationManager): `document.addEventListener('visibilitychange')` -- pauzuje loop gdy tab ukryty, resetuje `lastTime` przy powrocie
- 18_INTEGRATOR.md: "Symulacja kontynuuje w tle (simTimer, speech timers, progress timers dzialaja)"

**Problem:** simTimer jest oparty na `setTimeout` -- a Chrome throttluje `setTimeout` w hidden tabs do minimum 1s (od Chrome 88). Oznacza to ze fazy trwajace normalnie 3-5s beda trwaly 3-5x dluzej w tle. User wraca i widzi ze symulacja jest "w tyle" wzgledem oczekiwania.

**Niezaadresowane:** Brak "catch up" mechanizmu po throttling.

### Edge Case 5: Bardzo szybka symulacja (speed 4x)

**Zaadresowane:**
- 14_DESIGNER.md sekcja 3.6: Speed control cycles (0.5x -> 1x -> 2x -> 4x)
- 16_FEATURE_DEV.md F2 (Narrative): "Nie generuj dla stanow trwajacych < 500ms -- debounce"

**Ale:** Przy 4x, speech bubbles znikaja szybciej. Jesli bubble ma 5s display time (moja linia #7), przy 4x = 1.25s -- czy czas display tez sie skaluje? NIEOKRESLONE.

---

## 7. DEMO MODE

| Zaadresowane? | **NIE** |
|---------------|---------|

W mojej debacie #1 (sekcja Scenariusz 3) postulowanem:
- Presentation Mode: wieksze fonty (+30%), ukryty comms log, uproszczony HUD
- High-contrast fallback (solid tla zamiast glassmorphism -- dla kompresji video)
- Cinematic entry z typewriter intro

**ZERO z tego jest w specyfikacjach BUILD.** Zadna z 4 specyfikacji nie zawiera slowa "demo", "presentation", "cinematic" czy "nagrywanie". To jest POWAZONE PRZEOCZENIE.

User ktory chce POKAZAC Live Monitor innym (na spotkaniu, w nagraniu, na konferencji) dostanie:
- 9px fonty (nieczytelne na nagraniu 1080p)
- Glassmorphism z backdrop-filter (artefakty kompresji H.264)
- Comms log z 11px tekstem po prawej (nieczytelny na streamie)
- Brak mechanizmu ukrycia "chrome" (HUD, timeline) aby skupic uwage na agentach

**Nie jest to dealbreaker** -- Demo Mode nie byl wsrod moich 10 linii w piasku. Ale byl na pozycji #8 w mojej "Hierarchii Potrzeb Usera" (Demo-readiness). Jest to feature ktory POWINIEN byc w v22 jako SHOULD, bo caly sens tego narzedzia to POKAZYWANIE jak agenci wspolpracuja.

---

## 8. DODATKOWE OBSERWACJE

### 8.1 Speech Bubble Duration -- NIEOKRESLONA

Moja linia #7 z debaty #1: "Speech bubbles min 5 sekund, dlugie wiadomosci = proporcjonalnie dluzej."

**Nie znalazlem w zadnej specyfikacji czasu wyswietlania speech bubbles.** Designer specyfikuje CSS animacje wejscia (250ms), ale nie czas wyswietlania i animacje wyjscia. Frontend Dev definiuje element `.lm-agent-speech` z atrybutem `hidden` -- ale kto i kiedy ustawia hidden? To jest w istniejacym kodzie v22 (simStep), ale specyfikacje BUILD nie definiuja czy czas sie zmienia.

**Wymagane doprecyzowanie.**

### 8.2 Comms Log Filtr -- SPELNIIONY

Moja linia #6: Filtr domyslny = aktywna faza. 

- 15_FRONTEND_DEV.md: `<option value="current">Aktywna faza</option>` jako PIERWSZY option (= default)
- 18_INTEGRATOR.md sekcja 5.2: lmOnPhaseChange aktualizuje filtr na nowa faze
- 14_DESIGNER.md sekcja 1.8: Comms log z filter pills i domyslnym "FM#1"

### 8.3 Mystery Meat Navigation -- BRAK PROBLEMOW

Moja linia #8: Zero "mystery meat" navigation.

Specyfikacje sa czytelne pod tym wzgledem:
- Wszystkie przyciski maja widoczny tekst + ikone + tooltip
- Agent cards maja `cursor: pointer` + hover effect
- HITL buttons maja `kbd` hints z skrotem klawiaturowym
- Comms log filter ma wyrazne pill-style selektory

### 8.4 Transition Skipowalne -- CZESCIOWO

Moja linia #5: Kazda animacja dluzsza niz 200ms musi byc skipowalna.

Integrator mowi "SKIPOWALNE kliknieciem lub Escape" przy entry animation. Ale:
- HITL entry (500ms spring) -- skipowalna? Brak info.
- Debate Arena entry -- skipowalna? Brak info.
- Phase announcement -- skipowalna? Brak info.

Tylko entry/exit monitora jest jawnie skipowalne.

---

## 9. VERDICT

### Scoring

| Kategoria | Waga | Score | Wazony |
|-----------|------|-------|--------|
| Linie w piasku (6 linii) | 40% | 4.5/6 (Escape sprzecznosc, Compact SHOULD) | 30% |
| User Journey (11 krokow) | 25% | 8/11 full pass | 18.2% |
| Cognitive Load | 10% | 4/5 (FM debate = ryzyko) | 8% |
| Accessibility | 15% | 9/10 (brak skip links, pause button < 44px) | 13.5% |
| Edge Cases | 5% | 3/5 (Escape HITL, tab throttle, bubble timing) | 3% |
| Demo Mode | 5% | 0/5 (calkowity brak) | 0% |
| **RAZEM** | | | **72.7%** |

### CONDITIONAL GO

Specyfikacje BUILD sa **gotowe do implementacji pod warunkiem rozwiazania 4 kwestii:**

#### BLOKUJACE (musza byc rozwiazane PRZED kodem):

1. **Escape w HITL -- uzgodnic JEDNO zachowanie** miedzy Designer, Frontend Dev i Feature Dev. Rekomendacja: Escape = zamknij HITL jako 'skip' (najblizszy kontekst).

2. **Breakpointy responsive (sekcja 7 Designera) musza byc MUST**, nie SHOULD. User na 1366x768 NIE MOZE miec zlamanego layoutu.

#### POWINNY BYC ROZWIAZANE (ale nie blokuja kodu):

3. **Speech bubble display time** -- dodac do specyfikacji: min 5s, proporcjonalnie do dlugosci tekstu (~1s/10 slow), max 2 jednoczesnie w gridzie.

4. **Skip links** w DOM monitora (WCAG 2.4.1 Level A).

#### NICE TO HAVE (v22.1):

5. Demo/Presentation Mode -- wieksze fonty, ukryty comms log, solid tla.
6. "Catch up" summary po powrocie z tle (tab ukryty).
7. "Co sie zmienilo" diff w HITL decision context.
8. Summary panel po completion (specyfikacja zawartosc).

---

### Koncowe slowo

Jako Rzecznik Uzytkownika, musze powiedziec jasno: **ta specyfikacja jest lepsza niz sie spodziewalem po debacie #1.** Zespol wyraznie traktowal moje 10 linii w piasku powaznie -- 4.5 z 6 kluczowych spelnionych BEZ kompromisow to dobry wynik. Done = niebieski (#3B82F6) jest WSZEDZIE. Timer auto-approve jest OFF. Labele tekstowe sa obowiazkowe. ARIA jest wyjatkowo kompletne.

Ale UX to nie tylko spelnione checklisty. To sposonosc systemu. Sprzecznosc w zachowaniu Escape to dokladnie ten typ problemu, ktory zabija zaufanie usera: naciska klawisz i nie wie co sie stanie. To musi byc naprawione.

**CONDITIONAL GO -- pod warunkiem rozwiazania 2 blokujacych kwestii.**
