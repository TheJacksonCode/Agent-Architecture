# ⚖️ Pragmatyk -- Analiza Wykonalnosci
## Five Minds Debata #1: Live Monitor Mode

**Rola:** Pragmatyk [OPUS]
**Data:** 2026-04-04
**Perspektywa:** WYKONALNOSC -- czas, zlozonosc, ryzyko, koszty utrzymania
**Bazowe fakty:** v21 = 3046 LOC, 256 KB, single-file HTML, zero dependencies

---

### Stanowisko Glowne

MANIFEST.md to solidna specyfikacja, ale jest **overscoped dla jednego pliku v22**. Proponuje 30 feature'ow (10 MUST + 10 SHOULD + 10 COULD), co przy realistycznej estymacji oznacza ~2500-3500 dodatkowych LOC -- plik konczylby na **5500-6500 LOC / ~450-550 KB**. To jest na granicy utrzymywalnosci single-file HTML. Kluczowa teza: **MUST HAVE trzeba przyciac do 7-8 feature'ow, SHOULD HAVE schowac za flaga "v22.1", a COULD HAVE wyrzucic z horyzontu v22 calkowicie.** Kazda feature, ktora dodajemy, to nie tylko LOC -- to interakcje z istniejacymi 3000 liniami kodu, ktore ktos musi zrozumiec i debugowac w jednym pliku bez modulow, bez testow, bez IDE navigation.

---

### Ocena Feature Map

#### MUST HAVE

| Feature | MANIFEST priorytet | Moja ocena | LOC estimate | Ryzyko | Komentarz |
|---------|-------------------|------------|--------------|--------|-----------|
| M1 Fullscreen overlay z HUD | MUST | **MUST -- zgoda** | ~150 LOC (HTML/CSS/JS) | NISKIE | Mamy precedens w v18 Mission Control. CSS fixed overlay to proven pattern. Animacja wjazdu/wyjazdu 300-400ms to standard. Jedyne ryzyko: transition sequence z 7 krokami (MANIFEST 1.2) jest overengineered -- 3 kroki wystarczy. |
| M2 Agent status viz (7 stanow) | MUST | **MUST -- zgoda** | ~200 LOC (CSS keyframes + JS state machine) | NISKIE | 7 stanow x (kolor + ikona + animacja) = 7 bloków @keyframes + data-state selektory. Prosta, czytelna implementacja. ALE: keyframes dla "thinking" (shimmer gradient) i "HITL" (double ring pulse) sa GPU-ciezkie -- testowac na slabszym HW. |
| M3 Phase timeline | MUST | **MUST -- zgoda** | ~120 LOC | NISKIE | Horizontal stepper z 6 fazami. Mamy podobne w v18. Prosta CSS flexbox + ::before/::after na linie laczace. |
| M4 Agent grid pogrupowany wg fazy | MUST | **MUST -- zgoda** | ~180 LOC | SREDNIE | Bento grid z phase containers. Ryzyko: 27 agentow w 6 fazach = rozmieszczenie na roznych rozdzielczosciach. Na 1366x768 (najpopularniejsza laptop) moze wymagac scrollowania. Potrzebna decyzja: scroll vs zmniejszone karty. |
| M5 HITL decision points | MUST | **MUST -- ale UPROSCIC** | ~300 LOC (3 warianty UI) | **WYSOKIE** | MANIFEST definiuje 4 warianty UI (Debate Arena, Side-by-Side, Quick Approval, Confidence Slider) -- to jest ZA DUZO. Proponuje: **1 wariant uniwersalny** (Quick Approval z opcjonalnym expand do detali). Debate Arena moze byc SHOULD, nie MUST. 4 warianty = 4x wiecej kodu, 4x wiecej edge case'ow, 4x trudniejsze testowanie. |
| M6 Comms log / Dialog Timeline | MUST | **MUST -- zgoda** | ~150 LOC | NISKIE | Mamy Dialog Timeline w v14+. Refactor i adapt. Prawy panel 280px collapsible -- proven pattern. |
| M7 Emergency STOP | MUST | **MUST -- zgoda** | ~30 LOC | NISKIE | Jeden przycisk, jeden event handler. Najlatwiejszy feature na liscie. |
| M8 Animated connections | MUST | **PODDAJE W WATPLIWOSC** | ~200 LOC | SREDNIE | stroke-dasharray + data packets = ladne, ale czy MUST? v14 juz ma multi-particle connections. Pytanie: czy to NOWA feature, czy upgrade istniejacego? Jesli upgrade -- OK, ~80 LOC. Jesli pisane od zera -- 200 LOC i ryzyko kolizji z istniejacym rConn(). Proponuje: **SHOULD**, nie MUST. Monitor dziala bez animowanych connections. |
| M9 Phase transition effects | MUST | **PODDAJE W WATPLIWOSC** | ~100 LOC | NISKIE | Dim completed phases + spotlight nowej. Ladne, ale bez tego monitor DZIALA. Proponuje: **przeniesc do SHOULD** -- to visual polish, nie core functionality. |
| M10 prefers-reduced-motion | MUST | **MUST -- ABSOLUTNIE** | ~60 LOC | NISKIE | Jeden @media query z reduce na wszystkie animacje. Ale UWAGA: musi byc implementowane ROWNOCZESNIE z animacjami, nie "na koncu". Dopisanie reduced-motion po fakcie do 15+ keyframes to bolesne. |

**Podsumowanie MUST:** Realistyczny MUST to M1-M7 + M10 = **8 feature'ow, ~1190 LOC**. M8 i M9 przesuwam do SHOULD.

#### SHOULD HAVE

| Feature | MANIFEST priorytet | Moja ocena | LOC estimate | Ryzyko | Komentarz |
|---------|-------------------|------------|--------------|--------|-----------|
| S1 Five Minds Debate Arena | SHOULD | **SHOULD -- zgoda, ale UPROSCIC** | ~250 LOC | SREDNIE | Fullscreen overlay z 5 kartami ekspertow + Gold Solution. MANIFEST proponuje 3-round pattern z dynamicznymi polaczeniami agree/disagree -- to w symulacji to teatr, nie real-time debate. Proponuje: **statyczny layout z pre-scripted argumentami** (jak juz mamy w v14 speech bubbles). Animowane rundy to +150 LOC ekstra za pure cosmetics. |
| S2 Confidence signals | SHOULD | **COULD -- depriorytetyzowac** | ~60 LOC | NISKIE | Slider 0-100% per decision. Ladne, ale bez wplywu na symulacje (bo symulacja jest pre-scripted). Dodaje zlozonosc UI bez dodawania wartosci funkcjonalnej. |
| S3 Intent Preview | SHOULD | **SHOULD -- zgoda** | ~80 LOC | NISKIE | Przed faza: "oto co agenci zamierzaja zrobic". Proste: overlay z tekstem + approve/modify. Duza wartosc edukacyjna, niska zlozonosc. |
| S4 Kontekstowy HUD (dim inactive) | SHOULD | **PRZENIESC DO MUST** | ~30 LOC | NISKIE | `opacity: 0.4` na completed phases. Trywialny koszt, duzy impact na czytelnosc. To powinno byc M9 zamiast osobnego "phase transition effects". |
| S5 Speech bubble animations | SHOULD | **SHOULD -- ale MINIMALNE** | ~100 LOC | NISKIE | Mamy w v14. Typing indicator (3 kropki CSS) + fade-in. Auto-dismiss po 3s. Nie overenginerowac "chain dimming". |
| S6 Token cost estimation | SHOULD | **COULD -- wczesne** | ~100 LOC | SREDNIE | W SYMULACJI nie ma prawdziwych tokenow. Szacunki beda ZMYSLONE (np. "~$12.40 estimated"). To moze byc MISLEADING dla userow, ktorzy potraktuja to jako realne koszty. Jesli robimy -- DUZY disclaimer "szacunkowe, orientacyjne". |
| S7 Side-by-side comparison | SHOULD | **WON'T -- v23** | ~200 LOC | WYSOKIE | Tabela porownawcza 2-3 opcji z metrykami. W pre-scripted symulacji nie ma realnych opcji do porownania -- musimy je WYMYSLIC. 200 LOC za fikcyjna feature. Nie wart czasu w v22. |
| S8 Keyboard navigation | SHOULD | **MUST -- PRZENIESC DO MUST** | ~80 LOC | NISKIE | Tab/Shift+Tab, focus trap, ARIA live regions. To nie jest "nice to have" -- to accessibility requirement. Powinno byc M11. Problem: MANIFEST umieszcza to jako SHOULD, co sugeruje "robimy jesli starczy czasu". NIE. To jest obowiazkowe z punktu widzenia jakosci. |
| S9 Centralized AnimationManager | SHOULD | **MUST -- PRZENIESC DO MUST** | ~80 LOC | SREDNIE | Critic i Forum identyfikuja rozrzucone rAF jako istniejacy problem v21. Dodawanie WIECEJ animacji BEZ centralizacji to proszenie sie o memory leaks i FPS drops. To jest INFRASTRUCTURE, nie feature. Musi byc PRZED dodaniem animacji monitora. |
| S10 Reliability chain indicator | SHOULD | **WON'T -- v23** | ~80 LOC | NISKIE | "85% per step = 20% na 10 krokow". Ciekawa edukacyjnie, ale niszowa. Nie ma userow, ktorzy przyjda do naszego configuratora po wizualizacje compound failure. |

#### COULD HAVE

| Feature | MANIFEST priorytet | Moja ocena | LOC estimate | Ryzyko | Komentarz |
|---------|-------------------|------------|--------------|--------|-----------|
| C1 Session replay / time travel | COULD | **WON'T v22 -- 100%** | ~400-600 LOC | **BARDZO WYSOKIE** | To jest NAJTRUDNIEJSZA feature na calej liscie. Wymaga: event recording, state snapshots co N sekund, replay engine z timeline slider, fork logic. W single-file HTML bez frameworka to 500+ LOC samego replay engine. Kazdy bug w replay = koszmar debugowania. ABSOLUTNIE nie w v22. |
| C2 3-level drill-down | COULD | **COULD -- jesli czas** | ~120 LOC | SREDNIE | Klik na faze -> agenci, klik na agenta -> detail. To jest naturalny UX, nie wymaga osobnego feature flag. Moze wyniknac organicznie z M4 + M6. |
| C3 View Transitions API | COULD | **COULD -- progressive enhancement** | ~30 LOC | NISKIE | `if (document.startViewTransition)` wrapper. 30 LOC. Zero risk bo fallback = instant. Warto. |
| C4 Auto-approve timer | COULD | **SHOULD -- PRZENIESC W GORE** | ~60 LOC | NISKIE | Circular progress 60s wokol APPROVE. Bez tego HITL blokuje symulacje na stale gdy user odejdzie od ekranu. Kluczowe dla UX plynnosci. |
| C5 Cost breakdown dropdown | COULD | **WON'T** | ~150 LOC | SREDNIE | Zalezy od S6 (token cost), ktory sam jest watpliwy. Dropdown z per-agent cost to overengineering fikcyjnych danych. |
| C6 Simulation complete celebration | COULD | **COULD -- minimal** | ~60 LOC | NISKIE | Mamy confetti w v7. Reuse. Typewriter "COMPLETE" + summary stats. Niska zlozonosc, mily polish. |
| C7 BroadcastChannel multi-tab | COULD | **WON'T v22** | ~100 LOC | WYSOKIE | Multi-tab sync otwiera race conditions, duplikaty zdarzen, stale listeners. Nie warto ryzyka. Monitor w tej samej karcie co configurator. |
| C8 Export execution log | COULD | **COULD -- jesli czas** | ~80 LOC | NISKIE | JSON export. Mamy genPrompt/export w v21. Adapt. |
| C9 Quality Score per agent | COULD | **WON'T** | ~100 LOC | SREDNIE | "Signal-to-noise ratio per agent" -- jak to ZMIERZYC w symulacji? Zmyslona metryka to gorzej niz brak metryki. |
| C10 Devil's Advocate highlight | COULD | **COULD -- trivial** | ~30 LOC | NISKIE | Czerwony accent na DA node. Juz mamy w v12+. Adapt. |

---

### Odpowiedzi na Otwarte Pytania

#### Q1: Token cost w symulacji -- potrzebne czy bloat?

**Moja pozycja: BLOAT w v22. Nice-to-have w v23.**

Argumenty:
- To jest SYMULACJA. Nie ma prawdziwych tokenow. Kazda liczba, ktora wyswietlimy, jest ZMYSLONA.
- Wyswietlanie "$12.40" obok symulowanych agentow tworzy falszywee poczucie precyzji. User moze potraktowac to jako realna wycene.
- Zrodlem tego "must have" jest raport X (06), ktory sam ma ocene Critica 7.2/10 z ostrzezeniem o hallucinated data. Nie opieralbym decyzji na tym raporcie.
- Jesli KIEDYS robimy -- duzy disclaimer "SZACUNKOWE, oparte na typowych dlugosciach promptow, nie uwzglednia cachingu, batch pricing, itp."
- **LOC koszt:** ~100 LOC za szacunkowy model + UI. Nie warto w v22.

#### Q2: Ile HITL punktow -- 3 czy 5 czy konfigurowalnie?

**Moja pozycja: 3 HITL w default, 5 jako opcja w Autonomy Dial level 1-2.**

Argumenty:
- Review fatigue jest REALNA. 5 przerwan w 5-minutowej symulacji to przerwa co minute -- destrukcyjne dla flow.
- 3 krytyczne punkty: (1) Po Strategy -- akceptacja planu, (2) Gold Solution po Five Minds -- kluczowa decyzja, (3) Final approval -- deploy/reject.
- Punkty "Przed faza Build" i "Po Five Minds #2" mozna zredukowac do Intent Preview (S3) -- non-blocking info zamiast blocking modal.
- Autonomy Dial level 1 ("Observe & Suggest") moze wlaczyc wszystkie 5 dla userow, ktorzy CHCA pelna kontrole.
- **Kluczowy argument:** W edukacyjnym narzedziu lepiej miec 3 momenty pauzy niz 5, bo user uczy sie DECYZJI, nie KLIKALANIA approve.

#### Q3: Session replay -- priorytet czy nice-to-have?

**Moja pozycja: ABSOLUTNIE NIE W V22. Nice-to-have v24+ (nawet nie v23).**

Argumenty:
- Estymacja LOC: 400-600 linii (event recorder, state snapshots, replay timeline, fork engine).
- W single-file HTML bez frameworka to bedzie NAJGORZEJ utrzymywalny fragment kodu. Kazdy bug w replay wymaga rozumienia calego state flow.
- Event recording wymaga instrumentacji KAZDEJ zmiany stanu -- to znaczy modyfikacja istniejacych 3000 LOC, nie tylko dodawanie nowych.
- Fork z dowolnego kroku to BRANCHING STATE -- eksponencjalny wzrost zlozonosci.
- Reddit i GitHub to rekomenduja, ale zaden z nich nie adresuje JAK to zrobic w single-file HTML. LangGraph ma to w Pythonie z persistence layer. My mamy localStorage.
- **Pragmatyczna alternatywa:** Export execution log (C8, 80 LOC) daje 80% wartosci za 15% kosztu. User moze przejrzec log post-mortem.

#### Q4: Mobile support -- ignorowac czy minimum?

**Moja pozycja: Desktop-first, minimum responsive, testowac PO implementacji.**

Argumenty:
- Nasz user to programista/projektant AI. Korzysta z desktopa/laptopa.
- Single-file HTML otworzy sie na mobile. Pytanie to nie "czy sie otworzy" ale "czy bedzie uzywalny".
- 27 agentow + glassmorphism + particles na iPhone SE (A15, 4GB RAM) -- nie wiadomo. Ale NIE BEDZIEMY projektowac pod to w v22.
- **Minimum responsive:** phase timeline horizontal scroll zamiast wrap, agent grid 2 kolumny zamiast 4, comms log jako bottom sheet zamiast right panel. To jest ~50 LOC dodatkowych @media queries.
- Testowac po implementacji, naprawiac problemy ad hoc. Nie projektowac pod mobile from scratch.

#### Q5: Autonomy Dial default level -- ile kontroli userowi?

**Moja pozycja: Opcja 3 ("Act with Confirmation") jako default.**

Argumenty:
- Opcja 1 (pauzuj co krok) to DEMO mode -- irytujace w normalnym uzyciu.
- Opcja 2 (plan & propose) to Opcja 3 z extra kliknieciem -- niepotrzebna warstwa.
- Opcja 3 (act + 3-5 HITL) to balans miedzy kontrola a flow. User widzi CO sie dzieje, decyduje KIEDY to wazne.
- Opcja 4 (full auto) to wlasciwie "odpal symulacje i patrz". Ciekawe, ale bez HITL tracimy edukacyjny aspekt.
- **Implementacja:** Proponuje 3 poziomy zamiast 4 (wyrzucic Opcje 2 -- to jest "Opcja 3 z extra krokiem" = niepotrzebna granulacja). Mniej kodu, mniej edge case'ow.

#### Q6: Rozmiar pliku po rozbudowie -- limit?

**Moja pozycja: HARD LIMIT 5500 LOC / 500 KB. Powyzej = refactor lub ciac feature'y.**

Argumenty:
- v21 = 3046 LOC, 256 KB. To juz jest duzo dla single-file HTML.
- Moja realistyczna estymacja MUST (przefiltrowany) + kluczowe SHOULD = ~1500-2000 LOC dodatkowych.
- 5000-5500 LOC to GORNA GRANICA utrzymywalnosci. Powyzej: nie da sie szybko znalezc fragmentu kodu, debugowanie wymaga 10+ minut na zrozumienie kontekstu, kazda zmiana riskuje side effects.
- Simon Willison mowil "kilkaset linii" -- juz dawno to przekroczylimsmy, ale to nie znaczy ze mozemy ignorowac trend. Kazdy LOC dodany od teraz kosztuje wiecej niz poprzedni (complexity = O(n^2) od interakcji miedzy fragmentami).
- **Mitygacja:** Przed v22 zrobic audit v21 -- ile LOC mozna USUNAC lub skompresowac? Nieuzywane feature'y? Nadmiarowe komentarze? Duplikacje w CSS? Estymuje 200-400 LOC oszczednosci.

#### Q7: Node design w fullscreen -- karty czy orby?

**Moja pozycja: KARTY w monitorze, orby na canvasie. Dwa rozne renderery.**

Argumenty:
- Monitor to DASHBOARD -- dashboard uzywa kart (Grafana, Datadog, New Relic). Orby sa fajne na canvasie, ale na dashboardzie potrzebujesz informacji: nazwa, status, last message, progress.
- Orby 48x48px nie zmiesca nazwy agenta + statusu + progress bara. Karty 160x90px -- tak.
- **ALE:** Nie robimy nowego renderera od zera. Reuse istniejacy renderBentoAgent z v9+ i adapt na mniejsze karty w gridzie monitora. ~80 LOC adaptacji zamiast ~200 LOC nowego renderera.
- Drill-down (klik na karte -> agent detail) to istniejacy showND() z v21. Adapt, nie rewrite.

#### Q8: Dane z Researcher X -- ufac statystykom?

**Moja pozycja: NIE UFAC liczbom. UFAC wzorcom.**

Argumenty:
- "$2.5B ARR", "72% enterprise", "340% wzrost" -- nieweryfikowalne, prawdopodobnie czesciowo hallucinated. NIE OPIERAC decyzji na tych liczbach.
- ALE: wzorce z X sa cenne -- "Autonomy Dial", "Compound failure problem", "HOTL vs HITL" to realne dyskusje w branzy. Wzorce = warto. Liczby = ignorowac.
- "Token cost to industry standard" -- to opinia influencerow, nie fakt. Grafana dashboard =/= edukacyjny symulator agentow AI. Porownywanie jablek z gruszkami.
- **Zasada:** Jesli Critic dal 7.2/10 z ostrzezeniem o hallucinated data, traktujemy X jako INSPIRACJE, nie jako WYMAGANIA.

---

### Red Flags

#### RED FLAG 1: SCOPE CREEP -- 30 feature'ow to nie v22, to v22-v25

MANIFEST definiuje 10 MUST + 10 SHOULD + 10 COULD = 30 feature'ow. Przy realistycznej estymacji to ~3000-4000 LOC NOWEGO kodu. Dodanie tego do v21 (3046 LOC) daje 6000-7000 LOC w jednym pliku. To jest NIEUTRZYMYWALNE. Nikt nie bedzie w stanie debugowac 7000-liniowego pliku HTML bez IDE, bez modulow, bez testow.

**Mitygacja:** MUST przyciac do 8, SHOULD do 5-6, COULD = "jesli zostanie czas" (hint: nie zostanie).

#### RED FLAG 2: HITL OVERENGINEERING -- 4 warianty UI to feature creep

MANIFEST proponuje 4 oddzielne warianty UI dla decyzji (Debate Arena, Side-by-Side, Quick Approval, Confidence Slider). Kazdy wariant to ~80-150 LOC. Suma: 300-500 LOC za subsystem decyzyjny. W symulacji, gdzie decyzje sa pre-scripted, to overengineering.

**Mitygacja:** 1 uniwersalny panel decyzyjny z opcjonalnym expand. Max 150 LOC.

#### RED FLAG 3: BRAK PERFORMANCE BASELINE

Nikt nie zmierzyl AKTUALNEGO performance v21. Ile FPS ma starfield + particles + SVG connections na mid-range laptop? Ile RAM zjada? Dodajemy Live Monitor z WIECEJ animacjami na slepej podwalinie.

**Mitygacja:** Przed implementacja v22 -- 30 minut z Chrome DevTools Performance tab na v21. Zmierzyc FPS, heap size, layout recalc count. To daje nam baseline do porownania.

#### RED FLAG 4: BRAK TESTOW

Zaden raport nie adresuje jak TESTOWAC Live Monitor. W single-file HTML nie ma unit testow, nie ma visual regression, nie ma accessibility audit. Dodajemy skomplikowany real-time dashboard bez safety net.

**Mitygacja:** Przynajmniej manualna checklista (Zalacznik B z MANIFEST jest dobra -- uzyc jej jako test plan).

#### RED FLAG 5: CENTRALIZED ANIMATIONMANAGER JAKO PREREQUISITE

MANIFEST umieszcza AnimationManager jako S9 (SHOULD). Ale Forum i Critic identyfikuja rozrzucone rAF jako ISTNIEJACY problem v21. Dodawanie WIECEJ animacji bez centralizacji to jak dolewanie wody do dziurawego wiadra.

**Mitygacja:** AnimationManager MUSI byc implementowany PRZED jakimikolwiek nowymi animacjami. To jest infrastructure, nie feature.

---

### Propozycja Phased Approach

#### Phase 0: INFRASTRUCTURE (przed jakimikolwiek feature'ami)
**Czas:** 1 sesja
**LOC:** ~120 LOC netto (czesc to refactor istniejacego kodu)

1. Centralized AnimationManager (S9 -> MUST-0) -- ~80 LOC
2. Refactor istniejacych rAF loopow w v21 na AnimationManager -- -50 LOC + 30 LOC = -20 LOC netto
3. Performance baseline v21 -- Chrome DevTools, dokumentacja wynikow
4. prefers-reduced-motion @media query (M10) -- ~60 LOC
5. Audit v21: identyfikacja martwego kodu, duplikacji CSS -- cel: -200 LOC oszczednosci

**Deliverable:** v22-pre z czystszym kodem i performance baseline.

#### Phase 1: CORE MONITOR (minimally viable Live Monitor)
**Czas:** 1-2 sesje
**LOC:** ~600 LOC

1. Fullscreen overlay z HUD topbar (M1) -- ~150 LOC
2. Agent grid pogrupowany wg fazy (M4) -- ~180 LOC
3. Agent status visualization 7 stanow (M2) -- ~200 LOC
4. Phase timeline stepper (M3) -- ~80 LOC
5. Emergency STOP (M7) -- ~30 LOC

**Deliverable:** Dziala: otwierasz monitor, widzisz agentow w fazach, kazdy ma status, timeline na dole, STOP dziala. To jest MVP.

#### Phase 2: COMMUNICATION + INTERACTION
**Czas:** 1 sesja
**LOC:** ~450 LOC

1. Comms log / Dialog Timeline (M6) -- ~150 LOC
2. HITL decision panel (M5, uproszczony 1 wariant) -- ~150 LOC
3. Auto-approve timer (C4 -> SHOULD) -- ~60 LOC
4. Keyboard navigation + ARIA (S8 -> MUST) -- ~80 LOC
5. Kontekstowy HUD dim inactive (S4 -> MUST) -- ~30 LOC

**Deliverable:** Pelna interakcja: widzisz komunikacje agentow, podejmujesz decyzje, mozesz nawigowac klawiatura.

#### Phase 3: POLISH + EDUCATIONAL
**Czas:** 1 sesja (jesli zostanie czas)
**LOC:** ~300-400 LOC

1. Five Minds Debate Arena (S1, uproszczony) -- ~200 LOC
2. Intent Preview (S3) -- ~80 LOC
3. Speech bubble animations (S5, minimal) -- ~80 LOC
4. View Transitions API (C3) -- ~30 LOC
5. Simulation complete celebration (C6) -- ~60 LOC

**Deliverable:** Polish: debate arena, intent previews, ladne animacje. Feature'y edukacyjne.

#### Phase 4: OPTIONAL (v22.1 lub v23)
Animated connections (M8 przesuniety), token cost estimation (S6), export log (C8), 3-level drill-down (C2).

#### NIGDY w horyzoncie v22-v23:
Session replay (C1), Side-by-side comparison (S7), BroadcastChannel multi-tab (C7), Quality Score (C9), Reliability chain (S10).

**Calkowity LOC budzet v22:** Phase 0-2 = ~1170 LOC. Z Phase 3 = ~1520 LOC. Plik koncowy: ~4200-4600 LOC. AKCEPTOWALNE.

---

### Linie w Piasku

Pozycje, ktorych NIE ODPUSZCZE w debacie:

#### 1. AnimationManager PRZED nowymi animacjami
Nie. Negocjowalne. Dodawanie 15 nowych @keyframes i rAF tasks bez centralizacji to dlug techniczny z odsetkami. Forum i Critic to potwierdzaja. Kto chce animated connections BEZ AnimationManagera, niech najpierw wytlumaczy jak zamierza debugowac memory leak z 8 niezaleznych rAF loopow.

#### 2. Max 1 wariant UI dla HITL decisions
4 warianty decyzyjne (Debate Arena, Side-by-Side, Quick Approval, Confidence Slider) to feature creep. Robimy JEDEN uniwersalny panel. Debate Arena moze byc osobnym SHOULD z uproszczonym layoutem. Side-by-side comparison to v23.

#### 3. Session replay = WON'T HAVE v22
500+ LOC, eksponencjalna zlozonosc, wymaga instrumentacji calego state flow, zero testow. To jest osobny projekt, nie feature v22. Kto chce replay, niech najpierw napisze test suite dla istniejacego state management.

#### 4. HARD LIMIT 5500 LOC na plik v22
Powyzej 5500 LOC utrzymywalnosc spada nieliniowo. Kazdy LOC powyzej tego limitu kosztuje wiecej niz dwa LOC ponizej. To jest fizyka, nie opinia.

#### 5. prefers-reduced-motion od PIERWSZEGO dnia
Nie "dodamy na koncu". Nie "jak starczy czasu". Od poczatku. Kazdy @keyframes musi miec swoj odpowiednik w `@media (prefers-reduced-motion: reduce)`. To jest 10 sekund pracy przy dodawaniu kazdej animacji, a 2 godziny bolu przy retrofittingu 20 animacji na koncu.

#### 6. Performance baseline PRZED implementacja
30 minut w Chrome DevTools. FPS, heap size, layout recalc count na v21. Bez tego nie wiemy czy dodajemy animacje do systemu ktory juz ma 45 FPS czy 60 FPS. Roznica decyduje o budzecie animacji.

#### 7. Keyboard navigation to MUST, nie SHOULD
MANIFEST umieszcza S8 (keyboard nav + ARIA) jako SHOULD. To jest BLED. Focus trap w modalach, Tab navigation, aria-live regions -- to nie jest polish, to jest accessibility. Przesuwam do MUST bez dyskusji.

---

*Raport przygotowany przez Pragmatyka [OPUS] w ramach Five Minds Protocol.*
*Perspektywa: Wykonalnosc, koszty, ryzyka.*
*Brutalna szczerosc, zero wishful thinking.*
*Data: 4 kwietnia 2026*
