# Analityk Danych -- Analiza Oparta na Danych
## Five Minds Debata #1: Live Monitor Mode

**Rola:** Analityk Danych [OPUS]  
**Data:** 2026-04-04  
**Perspektywa:** DANE I DOWODY  
**Metodologia:** Kwantyfikacja decyzji z MANIFEST.md, porownanie z branzowymi standardami, identyfikacja twierdzen bez pokrycia w danych, propozycja KPI i metod pomiarowych.

---

### Stanowisko Glowne

**Kazda decyzja architektoniczna w MANIFEST.md powinna byc potwierdzona liczbami, a nie opiniami.** Analiza 7 raportow i MANIFEST.md ujawnia, ze ~60% decyzji ma solidne podstawy techniczne (architektura hybrydowa, CSS overlay, zero dependencies), ale ~40% opiera sie na przekonaniach bez benchmarkow (limity agentow, HITL optima, performance budgets). Przed implementacja v22 WYMAGAM zestawu testow bazowych (baseline profiling) na v21/v22 -- bez nich targetow performance nie mozna zdefiniowac naukowo, a jedynie zgadywac.

---

### Performance Targets

| Metryka | Target | Branzowy standard | Zrodlo | Pewnosc danych |
|---------|--------|-------------------|--------|----------------|
| **FPS (desktop)** | >= 60 FPS | 60 FPS (standard monitorow 60Hz) | W3C RAIL model, Google Web Vitals | WYSOKA -- standard przemyslowy |
| **FPS (mobile)** | >= 30 FPS (akceptowalne), >= 45 FPS (dobre) | 30-60 FPS (iOS 120Hz ProMotion) | Apple HIG, Forum raport (SVG: CSS transform 55 FPS mobile) | SREDNIA -- brak testow na naszej apce |
| **Time-to-Interactive (TTI)** | < 2s desktop, < 4s mobile | < 3.8s (Lighthouse "Good") | Google Lighthouse, Web Vitals | WYSOKA -- standard |
| **Largest Contentful Paint (LCP)** | < 1.5s | < 2.5s (Lighthouse "Good") | Google Core Web Vitals | WYSOKA -- standard |
| **Rozmiar pliku HTML** | < 400KB (target), < 500KB (hard limit) | n/a (single-file to niche) | Zmierzone: v22 = 267KB | WYSOKA -- zmierzone |
| **LOC** | < 4500 LOC (target), < 5500 LOC (hard limit) | Simon Willison: "kilkaset linii" (juz przekroczone) | Zmierzone: v22 = 3204 LOC | WYSOKA -- zmierzone |
| **Memory (RAM) -- idle** | < 80MB | Typowy SPA: 50-150MB | BRAK DANYCH z naszej apki | NISKA -- wymaga profiling |
| **Memory (RAM) -- symulacja active** | < 150MB | Dashboard z animacjami: 100-250MB | BRAK DANYCH | NISKA -- wymaga profiling |
| **State update -> Visual update latencja** | < 16.67ms (1 frame at 60 FPS) | < 16.67ms (RAIL: Response < 100ms, Animation < 16ms) | W3C RAIL model | WYSOKA -- standard |
| **Max rownoczesne animowane elementy** | <= 100 (MANIFEST spec) | Canvas: 5000+ obiektow (benchmark). SVG DOM: < 500 (JointJS) | Tech raport, JointJS benchmark | SREDNIA -- rozne warstwy |
| **Max agentow widocznych bez spadku FPS** | 27 (wszyscy) -- TO WYMAGA TESTU | BRAK DANYCH | n/a | NISKA -- wymaga profiling |
| **localStorage zuzycie** | < 2MB na sesje | Limit: 5-10MB per origin | MDN, Critic raport | SREDNIA -- brak pomiarow |
| **Fullscreen transition czas** | < 600ms (MANIFEST spec) | Material Design: 200-500ms | Material Design Motion Guidelines | WYSOKA -- specyfikacja |
| **HITL decision time (user)** | Auto-approve 60s (konfigurowalny) | AGDebugger (CHI 2025): badanie 14 uczestnikow, brak publicznych metryk | Reddit raport | NISKA -- mala proba |
| **Minimalna rozdzielczosc** | >= 1280x720 (desktop-first) | 1366x768 najpopularniejsza desktop (StatCounter 2025: ~22%) | StatCounter GlobalStats | SREDNIA -- brak danych naszych userow |

---

### Twarde Dane z Codebase (ZMIERZONE)

| Metryka | Wartosc | Metoda pomiaru |
|---------|---------|----------------|
| Rozmiar v1 (oryginalna) | 75 KB | `ls -la` |
| Rozmiar v13 | 136 KB | `ls -la` |
| Rozmiar v14 (Live Simulation) | 150 KB | `ls -la` |
| Rozmiar v18 (Mission Control) | 264 KB | `ls -la` |
| Rozmiar v21 | 255 KB | `ls -la` |
| **Rozmiar v22** | **267 KB** | `ls -la` |
| LOC v13 | 1394 | `wc -l` |
| LOC v14 | 1676 | `wc -l` |
| LOC v18 | 3320 | `wc -l` |
| LOC v21 | 3046 | `wc -l` |
| **LOC v22** | **3204** | `wc -l` |
| Wzrost rozmiaru v1 -> v22 | **+264%** (75KB -> 267KB) | obliczenie |
| Wzrost LOC v13 -> v22 | **+130%** (1394 -> 3204) | obliczenie |
| Sredni wzrost na wersje (v13-v22) | **~14.5 KB/wersje** | (267-136)/9 |
| Liczba agentow | 27 | CLAUDE.md |
| Liczba presetow | 29 | CLAUDE.md |

**Prognoza rozmiaru po Live Monitor:**
- MANIFEST szacuje dodanie 1000-2000 LOC
- v22 + Live Monitor (optymistycznie): 3204 + 1000 = **~4200 LOC / ~310 KB**
- v22 + Live Monitor (pesymistycznie): 3204 + 2000 = **~5200 LOC / ~360 KB**
- v22 + Live Monitor (worst case z AnimationManager + HITL + Debate Arena): **~6000 LOC / ~420 KB**
- **Wniosek:** Nawet worst case miesci sie w < 500KB hard limit. ALE: 6000 LOC w jednym pliku to granica utrzymywalnosci.

---

### Ocena Decyzji z MANIFEST.md

#### Decyzje z DANYMI potwierdzajacymi:

| # | Decyzja | Dowod | Ocena |
|---|---------|-------|-------|
| 1 | Architektura hybrydowa (Canvas/WAAPI/SVG/CSS) | Tech raport: Canvas 60 FPS @ 5000+ obiektow (SVG Genie benchmark 2025), WAAPI compositor thread (MDN), SVG DOM klikalne/CSS-animowalne, CSS transitions GPU-accelerated | **POTWIERDZONA** -- solidne zrodla, benchmarki zewnetrzne |
| 2 | CSS fixed overlay jako primary fullscreen | Tech/UX/Forum: 3/3 raporty zgodne. iOS Safari brak Fullscreen API (MDN). v18 Mission Control juz uzywa tego wzorca. | **POTWIERDZONA** -- empiryczny dowod z wlasnego codebase (v18) |
| 3 | Zero external dependencies | 6/6 raportow zgodnych. Simon Willison (579 pts Hacker News): single-file = najlepsza dystrybucja | **POTWIERDZONA** -- konsensus absolutny + spolecznosc |
| 4 | data-state attribute CSS machine | Tech/UX/Forum zgodne. Pattern uzyty w v14-v21 (empiryczny dowod). 7 stanow za proste na FSM library (Critic). | **POTWIERDZONA** -- dziala od v14 |
| 5 | View Transitions API jako enhancement | Baseline Oct 2025: Chrome 111+, Firefox 133+, Safari 18+. Fallback do instant. | **POTWIERDZONA** -- progressive enhancement z danymi browser support |
| 6 | `prefers-reduced-motion` obowiazkowe | WCAG 2.3.3 (Animation from Interactions). Prawna wymog w EU (EN 301 549). | **POTWIERDZONA** -- standard prawny |

#### Decyzje BEZ wystarczajacych danych:

| # | Decyzja | Co twierdza raporty | Czego brakuje | Ocena |
|---|---------|---------------------|---------------|-------|
| 7 | Max 100 animowanych elementow | MANIFEST: "performance budget: 60 FPS na mid-range laptop" | Brak definicji "mid-range laptop". Brak benchmarku 100 elementow na NASZEJ apce. Forum wspomina SVG 500+ = spadek, Canvas 5000+ = OK, ale to rozne warstwy. | **NIEWYSTARCZAJACE DANE** -- potrzebny test |
| 8 | 3-5 HITL punktow optimum | Reddit: "max 3-5" (zrodlo: Smashing Magazine article, 1 autor). UX: 5 punktow. AGDebugger: 14 uczestnikow (CHI 2025). | Brak meta-analizy UX research o HITL fatigue. AGDebugger to 14 osob -- za mala proba na wnioski. Smashing Magazine to opinia 1 autora, nie badanie. | **OPINIA prezentowana jako fakt** -- brak twardych danych |
| 9 | Token cost jako SHOULD HAVE | X: "MUST HAVE -- industry standard". Tech milczy. | Twierdzenie "industry standard" bez zrodla. "$2.5B ARR" i "72% enterprise" nieweryfikowalne (Critic: ryzyko hallucinated data). | **NIEWERYFIKOWALNE** -- X raport oceniony 7.2/10 |
| 10 | Session replay odlozone do v23 | GitHub/Reddit rekomenduja. Reszta milczy. | Brak danych o wartosci dla usera. Brak analizy kosztu implementacji (LOC/czas). | **BRAK DANYCH do decyzji** |
| 11 | 60s auto-approve timer | UX proponuje. Brak uzasadnienia dlaczego 60s a nie 30s lub 120s. | Brak jakiegokolwiek badania UX o optymalnym timeout dla decision review. | **ARBITRALNE** -- brak danych |
| 12 | Mobile odlozone (WON'T HAVE) | Critic: "ZERO DANYCH" o mobile. MANIFEST: "brak danych o performance na mobile". | KRYTYCZNA LUKA. Single-file HTML naturalnie otwiera sie na mobile. Brak JAKICHKOLWIEK testow. | **NIEBEZPIECZNA DECYZJA** -- podejmowana w ciemno |

---

### Odpowiedzi na Otwarte Pytania (Q1-Q8 z MANIFEST.md)

#### Q1: Token cost w symulacji -- jak wyswietlac?

**DANE:** Symulacja NIE generuje prawdziwych tokenow. Szacunek wymaga:
- Dlugosc promptu agenta (mamy w AD -- agent definitions)
- Model pricing (Opus: ~$15/1M input, ~$75/1M output; Sonnet: ~$3/$15; Haiku: ~$0.25/$1.25 -- ceny kwiecien 2026)
- Srednia dlugosc odpowiedzi (BRAK DANYCH -- mozemy zaalozyc ~500-2000 tokenow na agenta)

**Szacunek kosztu Deep Five Minds Protocol (29 presetow, 24 agentow):**
- ~24 agentow * srednia ~1500 tokenow (prompt+odpowiedz) = ~36k tokenow
- Przy Opus: ~36k * $15/1M (input) + ~36k * $75/1M (output) = ~$0.54 + ~$2.70 = **~$3.24 na sesje** (zgrubny szacunek)
- Przy Sonnet: ~$0.11 + ~$0.54 = **~$0.65 na sesje**

**WERDYKT:** Szacunek jest mozliwy i ma wartosc EDUKACYJNA. Ale musi byc oznaczony jako "szacunek" z disclaimerem. SHOULD HAVE, nie MUST HAVE. Twierdzenie X "industry standard" nie ma pokrycia w danych.

#### Q2: Ile HITL punktow?

**DANE:**
- AGDebugger study (CHI 2025, Microsoft): 14 uczestnikow -- **za mala proba na statystyczna istotnosc** (typowy minimum to n=30 dla ilosciowych wnioskow)
- Smashing Magazine "Agentic Design Patterns" (luty 2026): 6 wzorcow UX, ale to OPINIA autora, nie badanie
- "Review fatigue" (Ravi Palwe, Medium): individual take z platform niskiego profilu (Critic ocena)
- LangGraph: oferuje DOWOLNA liczbe checkpointow -- nie rekomenduje konkretnej

**WERDYKT:** BRAK TWARDYCH DANYCH na optymaln ilosc HITL punktow. Rekomendacja "3-5" to KONSENSUS EKSPERTOW, nie wynik badan. Proponuje:
- **Default: 3 punkty** (Gold Solution #1, Gold Solution #2, Final Approval) -- minimalizacja fatigue
- **Opcja rozszerzona: 5 punktow** -- w ustawieniach
- **Sposob pomiaru:** Zbierac dane po wdrozeniu -- ile razy user zmienia decyzje AI vs akceptuje auto-approve? Jesli > 80% auto-approve, to HITL jest za duzo.

#### Q3: Session replay -- v22 czy pozniej?

**DANE:**
- Implementacja replay wymaga: event store, state snapshots, replay engine, UI timeline
- Szacunek LOC: ~500-1000 LOC dodatkowego kodu
- Szacunek rozmiaru: ~30-60KB dodatkowych
- v22 juz dodaje ~1000-2000 LOC na Live Monitor
- Laczny worst case z replay: ~7000 LOC

**WERDYKT:** BRAK DANYCH o wartosci dla uzytkownika. Dodanie replay do v22 oznacza ryzyko przekroczenia 6000 LOC. Rekomendacja: **ODLOZYC do v23**. Ale zaprojektowac architekture event-driven w v22 (event store array) tak, zeby replay bylo LATWE do dodania pozniej.

#### Q4: Mobile support

**DANE:**
- StatCounter (marzec 2026): mobile ~59% ruchu web, desktop ~39%
- ALE: nasi uzytkownicy to prawdopodobnie developerzy/projektanci -- desktop-dominant audience
- Glassmorphism `backdrop-filter`: GPU-intensive na mobile (Safari 9+, Chrome 76+)
- 27 agentow * SVG icons + Canvas starfield + particles -- BRAK TESTU na jakimkolwiek urzadzeniu mobilnym
- iPhone SE (2022): A15 Bionic, 4GB RAM, 4.7" ekran -- fizycznie nie miesci bento grid 27 agentow

**WERDYKT:** **BRAK DANYCH, potrzebne testy.** Rekomendacja:
1. Po implementacji v22: otworzyc plik na iPhone/Android i zmierzyc FPS (DevTools remote debugging)
2. Minimalny test: Chrome DevTools -> Performance -> CPU 4x slowdown (symulacja mid-range mobile)
3. Jesli FPS < 20 na mobile: dodac `prefers-reduced-motion` fallback ktory wylacza particles/starfield

#### Q5: Autonomy Dial -- default level?

**DANE:** Brak badan porownujacych 4 poziomy autonomii. Ale:
- LangGraph Studio: domyslnie "interrupt_before" na wezlach krytycznych -- odpowiednik naszego "Act with Confirmation"
- Grafana alerting: "notify, don't block" -- odpowiednik HOTL
- ComfyUI: brak HITL, czyste "Act Autonomously"

**WERDYKT:** Brak danych do obiektywnej decyzji. REKOMENDACJA: **"Act with Confirmation" (Opcja 3)** jako bezpieczny default. UZASADNIENIE: jedyny szacunek ze to nie irytuje (Reddit: < 5 przerwan na sesje, "review fatigue" zaczyna sie od 5+) i daje poczucie kontroli. Ale to HIPOTEZA -- wymaga walidacji po wdrozeniu.

#### Q6: Rozmiar pliku -- granica?

**TWARDE DANE:**

| Wersja | KB | LOC | Delta KB | Delta LOC |
|--------|-----|------|----------|-----------|
| v1 | 75 | ~800 (est.) | -- | -- |
| v13 | 136 | 1394 | +61 | +594 |
| v14 | 150 | 1676 | +14 | +282 |
| v18 | 264 | 3320 | +114 | +1644 |
| v21 | 255 | 3046 | -9 | -274 |
| v22 | 267 | 3204 | +12 | +158 |

**Obserwacje:**
- v18 (Mission Control) byl skokiem +114KB/+1644 LOC -- najwiekszy przyrost
- v19-v21 ustabilizowaly sie (~255KB)
- v22 dodal tylko 12KB vs v21

**Prognoza v22 + Live Monitor:** 267 + 50-150KB = **~320-420KB**

**Punkt odniesienia:** Simon Willison "kilkaset linii" -- juz 4x przekroczone od v14. ALE: aplikacja dziala. "Utrzymywalnosc" to miara subiektywna. Prawdziwe pytanie: czy Claude Code / LLM moze wygenerowac caly plik na raz? Przy 5000+ LOC to moze byc problem z context window.

**WERDYKT:** Rozmiar pliku NIE JEST blokujacy dopoki < 500KB. Ryzyko jest w **utrzymywalnosci kodu przez LLM**, nie w performance przegladarki.

#### Q7: Agent node design -- karty czy orby?

**DANE:**
- ComfyUI: node cards ~200x80px z progress bar -- benchmark
- Grafana: panele z metryki, nie orby
- n8n: node cards ~180x60px
- Nasz canvas v21: orby 48x48px

**WERDYKT:** Brak A/B testu. REKOMENDACJA: hybrid (orby w overview, karty w drill-down) jest pragmatyczny kompromis. Ale to DESIGN decision, nie DATA decision -- brak metryk do porownania.

#### Q8: Wiarygodnosc danych z raportu X (06)

**TWARDE DANE o wiarygodnosci:**
- Critic ocena: **7.2/10** (najnizsza z 6 raportow)
- Twierdzenia bez zrodla: "$2.5B ARR", "72% enterprise", "340% wzrost", "~5000x szybszy Agno"
- Numery statusow tweetow: nieweryfikowalne
- Influencer bias: Karpathy, Ng, swyx -- promotorzy AI agents
- Jedyny kontrargument (Stack Overflow Blog) potraktowany jako "do odparcia"

**WERDYKT:** Raport X traktowac jako **zrodlo inspiracji i trendow**, NIE jako zrodlo faktow. Konkretnie:
- Token cost tracking: traktowac jako SHOULD HAVE (nie MUST HAVE), bo "industry standard" nie ma dowodu
- EU AI Act: IRRELEWANTNE -- nasza apka to edukacyjny konfigurator, nie high-risk AI
- "Compound failure problem" (85%^10 = 20%): to MATEMATYCZNIE POPRAWNE, wartosc dodana
- Hot Takes: wartosciowe jako kontrperspektywa, nie jako dane

---

### KPI Dashboard

Metryki do wyswietlania w samym Live Monitor + metoda pomiaru:

#### Tier 1: ZAWSZE WIDOCZNE (Topbar HUD)

| KPI | Jak mierzyc | Target | Format |
|-----|------------|--------|--------|
| **FPS (internal)** | `performance.now()` delta miedzy ramkami w AnimationManager | >= 55 FPS | Ukryty; zolty warning < 45 FPS, czerwony < 30 FPS |
| **Faza / Postep** | `currentPhase / totalPhases * 100` | n/a (informacyjny) | "Phase 3/6: FM#1 | 67%" |
| **Czas trwania** | `Date.now() - simStartTime` | n/a | "04:23" (monospace) |
| **Aktywni agenci** | `count(agents where state != 'idle' && state != 'done')` | n/a | "5/27 active" |
| **HITL pending** | `count(agents where state == 'waiting-for-human')` | 0 (zielony), > 0 (gold pulse) | Badge "DECISION REQUIRED" |

#### Tier 2: ON-DEMAND (klik/hover)

| KPI | Jak mierzyc | Format |
|-----|------------|--------|
| **Szacunkowy koszt ($)** | `sum(agent.promptTokens * modelPrice)` -- kalkulacja na podstawie dlugosci promptow i modelu | "$3.24 (Opus est.)" z disclaimerem |
| **Czas per faza** | `phaseEndTime - phaseStartTime` | Gantt bar w Phase Timeline |
| **Decyzje HITL (count)** | Inkrementowany counter po kazdym approve/reject | "3/5 decisions made" |
| **Compound reliability** | `(confidence/100) ^ activeAgentCount` | "Reliability chain: 85%^5 = 44%" |

#### Tier 3: DIAGNOSTYCZNY (DevTools / debug mode)

| KPI | Jak mierzyc | Kiedy alertowac |
|-----|------------|-----------------|
| **Heap memory** | `performance.memory.usedJSHeapSize` (Chrome only) | > 100MB: warning, > 200MB: error |
| **DOM node count** | `document.querySelectorAll('*').length` | > 2000: warning |
| **rAF callback time** | `performance.measure()` w AnimationManager | > 10ms: warning (budzet 16.67ms) |
| **localStorage usage** | `JSON.stringify(localStorage).length` | > 3MB: warning, > 5MB: rotate logs |

**Sposob implementacji FPS counter (pseudokod):**
```javascript
// W AnimationManager.run():
this.frameCount++;
if (currentTime - this.fpsLastCheck > 1000) {
  this.currentFPS = this.frameCount;
  this.frameCount = 0;
  this.fpsLastCheck = currentTime;
  if (this.currentFPS < 30) console.warn('FPS CRITICAL:', this.currentFPS);
}
```

---

### Porownanie z Konkurencja

| Feature | My (v22 plan) | ComfyUI (108k stars) | LangGraph Studio | Grafana (73k stars) | AgentOps (5.4k stars) | Nasza przewaga? |
|---------|--------------|----------------------|------------------|---------------------|----------------------|-----------------|
| **Single-file HTML** | TAK | NIE (Python+JS) | NIE (Python) | NIE (Go+TS) | NIE (Python SDK) | **TAK -- unikalne** |
| **Zero dependencies** | TAK | NIE (LiteGraph) | NIE (LangChain) | NIE (500+ deps) | NIE (OpenAI SDK) | **TAK -- unikalne** |
| **Live node execution viz** | PLAN | TAK (green border) | TAK (Studio UI) | NIE (metryki only) | TAK (waterfall) | NIE -- jeszcze nie mamy |
| **HITL checkpoints** | 3-5 (PLAN) | NIE | TAK (best-in-class) | NIE | NIE | NIE -- LangGraph lepszy |
| **Five Minds debate viz** | TAK | NIE | NIE | NIE | NIE | **TAK -- unikalne** |
| **Token cost tracking** | Szacunek (PLAN) | NIE | TAK (real) | NIE | TAK (real) | NIE -- oni maja REALNE dane |
| **Session replay** | ODLOZONE | TAK (re-execution) | TAK (time travel) | TAK (dashboardy) | TAK (waterfall replay) | NIE -- oni maja |
| **Offline / local-first** | TAK (localStorage) | TAK (local ComfyUI) | NIE (cloud) | NIE (server) | NIE (SaaS) | **CZESCIOWO** |
| **Accessibility (WCAG)** | PLAN (3 kanaly) | MINIMALNA | MINIMALNA | DOBRA | MINIMALNA | **POTENCJALNIE** |
| **Mobile support** | BRAK DANYCH | NIE (desktop) | NIE (desktop) | TAK (responsive) | TAK (web UI) | NIE -- Grafana lepsza |
| **Agent count** | 27 fixed | Unlimited nodes | Unlimited | n/a | Unlimited | NIE -- mniej elastyczni |
| **Open source** | TAK (single file) | TAK (GPL) | CZESCI. (Python OSS) | TAK (AGPL) | TAK (MIT) | NEUTRALNE |

**Kluczowe wnioski z porownania:**

1. **Nasza UNIKALNA WARTOSC:** Single-file + zero-dep + Five Minds debate + offline. Zaden konkurent nie ma tego polaczenia.
2. **Nasze SLABOSCI vs konkurencja:** Brak session replay (maja wszyscy), brak real token tracking (bo symulacja), brak mobile.
3. **UWAGA:** Porownanie jest czesciowo "jablka do pomaranczy" -- ComfyUI/LangGraph to PRODUCTION tools, my jestesmy EDUKACYJNYM konfiguratorem/symulatorem. To jest INNA kategoria produktowa.

---

### Weryfikacja Kluczowych Twierdzen z Raportow

| # | Twierdzenie | Raport | Dowod | Werdykt |
|---|------------|--------|-------|---------|
| 1 | "Canvas utrzymuje ~60 FPS przy 5000+ obiektow" | Tech (01) | SVG Genie benchmark 2025 -- zewnetrzny benchmark | **WIARYGODNE** ale na izolowanym Canvas, nie na naszej apce |
| 2 | "SVG >500 animowanych elementow = spadek" | Tech (01) | JointJS blog -- producent narzedzi SVG | **WIARYGODNE** -- zbiezne zrodla |
| 3 | "5-sekundowa regula Grafany" | Reddit (04) | Grafana Labs Best Practices -- oficjalna dokumentacja | **POTWIERDZONE** -- primary source |
| 4 | "Review fatigue to najgrozniejszy blad UX" | Reddit (04) | Ravi Palwe, Medium -- 1 autor, niski profil | **OPINIA** -- brak triangulacji |
| 5 | "72% projektow enterprise uzywa multi-agent" | X (06) | BRAK ZRODLA | **NIEWERYFIKOWALNE** |
| 6 | "$2.5B ARR Anthropic" | X (06) | "Pragmatic Engineer newsletter" -- niespecyficzne | **NIEWERYFIKOWALNE** bez dokladnego linka |
| 7 | "Agno ~5000x szybszy niz LangGraph" | X (06) | Materialy marketingowe Agno | **MARKETING, nie benchmark** |
| 8 | "apps z View Transitions czuja sie 2-3x snappier" | Tech (01) | Chrome blog View Transitions 2025 -- Google developer blog | **CZESCIOWO WIARYGODNE** -- Google blog, ale "czuja sie" to subiektywne |
| 9 | "setInterval throttled do 1 minuty w Chrome 88+" | Forum (05) | Chromium documentation | **POTWIERDZONE** -- znany Chrome behavior |
| 10 | "WCAG kontrast --accent4 (#F87171) na #06060A to 4.6:1" | Critic (07) | Critic sam wskazal ze to blizej 4.5:1 | **BORDERLINE** -- na granicy WCAG AA (4.5:1). Wymaga sprawdzenia kalkulatorem kontrastu. |
| 11 | "Five Minds Protocol z wizualizacja debaty -- nie znaleziony w zadnym repo" | GitHub (03) | Przeglad 25 repozytoriow | **WIARYGODNE** w granicach przegladu -- ale 25 repo to nie caly GitHub |
| 12 | "Single-file HTML to format NATURALNIE wspierajacy mobile" | Critic (07) | Logiczny argument | **PRAWDA** technicznie, ale **BRAK TESTU** czy nasz konkretny plik dziala |
| 13 | "Max 100 jednoczesnie animowanych elementow" | MANIFEST | Brak zrodla -- ustalony ad hoc | **ARBITRALNY** -- wymaga benchmarku |

---

### Wymagane Testy Przed Wdrozeniem

#### KRYTYCZNE (blokujace release)

| # | Test | Metryka sukcesu | Narzedzie | Priorytet |
|---|------|----------------|-----------|-----------|
| T1 | **Baseline FPS profiling v22** | Zmierzyc FPS idle i podczas symulacji na v22 BEZ Live Monitor | Chrome DevTools Performance tab | P0 |
| T2 | **Memory baseline v22** | `performance.memory.usedJSHeapSize` przy starcie i po 5 minutach symulacji | Chrome DevTools Memory tab, Heap Snapshot | P0 |
| T3 | **FPS z Live Monitor overlay** | >= 55 FPS desktop (i7 / M1), >= 30 FPS CPU 4x throttle | Chrome DevTools Performance tab z CPU throttling | P0 |
| T4 | **DOM node count w Live Monitor** | < 2000 nodow | `document.querySelectorAll('*').length` | P0 |
| T5 | **rAF callback duration** | < 10ms per frame (budzet: 16.67ms - 6ms browser overhead) | `performance.measure()` w AnimationManager | P0 |

#### WAZNE (powinny byc przed release)

| # | Test | Metryka sukcesu | Narzedzie |
|---|------|----------------|-----------|
| T6 | **Mobile smoke test** | Plik otwiera sie, navigacja dziala, FPS >= 20 | iPhone/Android + Chrome Remote Debug |
| T7 | **localStorage stress test** | 10 pelnych sesji symulacji, sprawdzic zuzycie | `JSON.stringify(localStorage).length` po kazdej sesji |
| T8 | **Memory leak test (long session)** | Heap size nie rosnie >20% po 15 minutach ciagłej symulacji | Chrome DevTools -> Memory -> Allocation Timeline |
| T9 | **WCAG kontrast weryfikacja** | Wszystkie 7 statusow: kontrast >= 4.5:1 (AA) na tle #06060A | WebAIM Contrast Checker |
| T10 | **Color blindness test** | 7 statusow rozroznialnych przy protanopia i deuteranopia | Sim Daltonism (macOS), Chrome DevTools Vision Deficiency |
| T11 | **Keyboard navigation** | Tab/Enter/Escape na wszystkich interaktywnych elementach Live Monitor | Reczne testowanie |
| T12 | **File size po implementacji** | < 500KB | `ls -la` |

#### NICE TO HAVE (po release, iteracyjnie)

| # | Test | Metryka sukcesu | Narzedzie |
|---|------|----------------|-----------|
| T13 | **Lighthouse audit** | Performance >= 80, Accessibility >= 90, Best Practices >= 90 | Chrome Lighthouse |
| T14 | **Screen reader test** | Comms log czytelny, HITL decisions ogłaszane, focus management poprawny | NVDA (Windows), VoiceOver (macOS) |
| T15 | **Multi-tab conflict test** | 2 instancje pliku otwarte -- brak corrupted localStorage | 2 karty przegladarki, obie z symulacja |
| T16 | **Browser matrix** | Dziala na Chrome/Firefox/Safari/Edge latest | Reczne testowanie lub BrowserStack |
| T17 | **Realna rozdzielczosc 1280x720** | Layout nie jest uciety, wszystkie elementy widoczne | Resize okna do 1280x720 |

---

### Brakujace Dane -- Plan Zbierania

| # | Brakujacy punkt danych | Jak zebrac | Kiedy | Wplyw na decyzje |
|---|----------------------|-----------|-------|-----------------|
| BD1 | Baseline FPS v22 | Chrome DevTools Performance profiling | PRZED implementacja Live Monitor | Okresla ile "budgetu FPS" mamy na dodanie animacji |
| BD2 | Baseline RAM v22 | Chrome DevTools Memory Heap Snapshot | PRZED implementacja | Okresla ile RAM mozemy dodac |
| BD3 | Browser demographics userow | Analytics (jesli dodamy) lub ankieta | Po release v22 | Wplynie na decyzje o progressive enhancement |
| BD4 | Optymalna liczba HITL | Zbierac: % auto-approve vs manual, czas na decyzje, satisfaction survey | Po wdrozeniu v22, 50+ sesji | Kalibracja Autonomy Dial default |
| BD5 | Mobile FPS | Remote debugging na iPhone SE / Pixel 6 | Po implementacji Live Monitor | Decyzja o mobile-first vs desktop-only |
| BD6 | Realny koszt tokenow preset | Uruchomic Deep Five Minds z prawdziwymi agentami, zmierzyc koszt | Jesli/gdy bedzie MCP integration | Kalibracja szacunkow kosztow |

---

### Kluczowe Metryki Decyzyjne -- Podsumowanie

| Decyzja | Metryka decyzyjna | Wartosc progowa | Status danych |
|---------|-------------------|-----------------|---------------|
| Czy dodawac wiecej animacji? | FPS po dodaniu | < 45 FPS = STOP | BRAK -- potrzebny T1 |
| Czy 100 animated elements to dobry limit? | FPS przy N animowanych | FPS < 55 przy N | BRAK -- potrzebny benchmark |
| Czy plik jest za duzy? | Rozmiar HTML | > 500KB = refactor | MAMY: 267KB, headroom ~230KB |
| Czy LOC jest za duzo? | LOC | > 5500 = refactor | MAMY: 3204, headroom ~2300 |
| Czy HITL 5 to za duzo? | % auto-approve | > 80% = za duzo HITL | BRAK -- potrzebny BD4 |
| Czy mobile jest potrzebny? | % userow mobile | > 15% = potrzebny | BRAK -- potrzebny BD3 |
| Czy glassmorphism zabija RAM? | Heap delta on/off | > 30MB = problem | BRAK -- potrzebny T8 |
| Czy auto-approve 60s to dobry timeout? | % userow ktore decyduja < 60s | > 90% = timeout OK | BRAK -- potrzebny BD4 |

---

### Koncowa Rekomendacja Analityka Danych

1. **PRZED implementacja Live Monitor:** Wykonac testy T1 i T2 (baseline FPS i RAM na v22). Bez tych danych wszystkie performance targets sa ZGADYWANIEM.

2. **Architektura hybrydowa (Canvas/WAAPI/SVG/CSS):** POTWIERDZAM na podstawie danych. Solidne benchmarki zewnetrzne, empiryczny dowod z v14-v21.

3. **Zero dependencies, CSS overlay, data-state:** POTWIERDZAM. Konsensus + dane.

4. **Token cost:** SHOULD HAVE, nie MUST. Twierdzenie "industry standard" bez dowodu. Szacunek edukacyjny jest wartosciowy.

5. **HITL:** Default 3 punkty (nie 5). "3-5" to opinia, nie dane. Zbierac metryki po wdrozeniu, potem kalirowac.

6. **Mobile:** NIE PODEJMOWAC DECYZJI BEZ DANYCH. Wymagam testu T6 po implementacji. Do tego czasu: desktop-first ale nie desktop-only.

7. **Session replay:** ODLOZYC. Ale zaprojektowac event store w v22 (low-cost architectural investment).

8. **Rozmiar pliku:** 267KB z headroomem do 500KB. NIE JEST BLOKUJACY.

---

*Raport przygotowany przez Analityka Danych [OPUS] w ramach Five Minds Protocol.*
*Perspektywa: Dane i Dowody. Zero opinii bez danych. "BRAK DANYCH" jest akceptowalna odpowiedzia.*
*Data: 2026-04-04*
