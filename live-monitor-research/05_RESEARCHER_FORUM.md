# Researcher Forum -- Tutoriale i Lessons Learned
## Live Monitor Mode: Wiedza Praktyczna

**Rola**: Researcher Forum  
**Data**: 2026-04-04  
**Zakres**: Przeszukanie StackOverflow, Dev.to, Medium, Hacker News, Smashing Magazine, CSS-Tricks, MDN i innych zrodel w poszukiwaniu tutoriali, artykulow i lessons learned na potrzeby trybu Live Monitor w Agent Teams Configurator.

---

## Spis tresci

1. [Real-time Dashboards w Vanilla JS](#1-real-time-dashboards-w-vanilla-js)
2. [Fullscreen Web App Patterns](#2-fullscreen-web-app-patterns)
3. [State Machine Visualization](#3-state-machine-visualization)
4. [Data Flow Animation Techniques](#4-data-flow-animation-techniques)
5. [Glassmorphism i Modern Dark UI](#5-glassmorphism-i-modern-dark-ui)
6. [Performance w Heavy-Animation Single-Page Apps](#6-performance-w-heavy-animation-single-page-apps)
7. [Bonus: Agent Status Monitoring i HITL Patterns](#7-bonus-agent-status-monitoring-i-hitl-patterns)
8. [Performance Checklist](#performance-checklist)
9. [Czeste Bledy (Anti-Patterns)](#czeste-bledy-anti-patterns)
10. [Rekomendacje dla Live Monitor](#rekomendacje-dla-live-monitor)

---

## 1. Real-time Dashboards w Vanilla JS

### Artykul 1: [How I Built a Real-Time Dashboard from Scratch Using Vanilla JavaScript (No Frameworks!)](https://medium.com/@michaelpreston515/how-i-built-a-real-time-dashboard-from-scratch-using-vanilla-javascript-no-frameworks-f93f3dce98a9)
- **Zrodlo**: Medium (Michael Preston)
- **Kluczowe takeaways**:
  - Canvas API moze w pelni zastapic Chart.js/D3 do renderowania wykresow w dashboardzie
  - WebSockety powinny byc dodane wczesnie w procesie developmentu -- daja "zywy" efekt dashboardowi
  - DOM updates w real-time sa mozliwe bez frameworka, ale wymagaja discipliny w zarzadzaniu stanem
- **Code pattern**: Bezposrednie rysowanie na Canvas context (`getContext('2d')`) z cyklicznym czyszczeniem i przerysowywaniem

### Artykul 2: [How I Built a Real-Time Data Visualization Dashboard With Just JavaScript](https://medium.com/codrift/how-i-built-a-real-time-data-visualization-dashboard-with-just-javascript-511a58b5b763)
- **Zrodlo**: Medium / Codrift (Abdul Ahad, Oct 2025)
- **Kluczowe takeaways**:
  - Trzy wykresy + feed danych + live indicator -- calkowicie w przegladarce z plain JavaScript
  - Reusable components mozliwe bez frameworka poprzez pattern tworzenia funkcji-fabryk DOM elementow
  - Aktualizacje DOM powinny byc batched -- nie aktualizuj kazdego elementu osobno

### Artykul 3: [Useful Patterns for Building HTML Tools](https://simonwillison.net/2025/Dec/10/html-tools/)
- **Zrodlo**: Simon Willison's Blog (Dec 2025)
- **Kluczowe takeaways**:
  - **Single-file HTML to gold standard** -- inline JS/CSS = zero hassle z hostingiem i dystrybucja
  - Unikaj React i czegokolwiek z build stepem -- JSX wymaga kompilacji
  - Laduj zaleznosci z CDN (cdnjs, jsdelivr) -- im mniej, tym lepiej
  - Generuj assety programistycznie (Canvas API) zamiast osadzac pliki
  - `localStorage` na sekrety i wiekszy stan; URL hash na shareable state
  - Copy-paste jako glowny mechanizm I/O -- szczegolnie na mobile
  - Utrzymuj plik w granicach kilkuset linii (w naszym przypadku juz za pozno, ale zasada modularnosci wciaz wazna)
- **Code pattern**: CSS variables do themingu eliminuja potrzebe preprocesorow

### Artykul 4: [How to Build a Dashboard Using JavaScript: A Comprehensive Guide](https://www.javascriptdoctor.blog/2026/03/how-to-build-dashboard-using-javascript.html)
- **Zrodlo**: JavaScript Doctor (Mar 2026)
- **Kluczowe takeaways**:
  - Struktura dashboardu: header z KPI, grid cards, sidebar navigation
  - CSS Grid + Flexbox to optymalne narzedzia layout bez frameworka
  - requestAnimationFrame do animowanych przejsc miedzy stanami

### Artykul 5: [Supercharge Your Web Animations: Optimize requestAnimationFrame Like a Pro](https://dev.to/josephciullo/supercharge-your-web-animations-optimize-requestanimationframe-like-a-pro-22i5)
- **Zrodlo**: Dev.to (Joseph Ciullo)
- **Kluczowe takeaways**:
  - **Centralized Animation Manager** -- jeden wspoldzielony loop zamiast wielu rozproszonych `requestAnimationFrame`
  - FPS throttling przez delta-time: `if (deltaTime > 1000 / targetFPS)`
  - Lifecycle management: unregisterTask() natychmiast po zakonczeniu animacji
  - Linear interpolation (lerp) jako bazowy pattern animacji
- **Code pattern** (AnimationManager):
```javascript
class AnimationManager {
  constructor() {
    this.tasks = new Set();
    this.fps = 60;
    this.lastFrameTime = performance.now();
    this.animationId = null;
  }
  run(currentTime) {
    const deltaTime = currentTime - this.lastFrameTime;
    if (deltaTime > 1000 / this.fps) {
      this.tasks.forEach(task => task(currentTime));
      this.lastFrameTime = currentTime;
    }
    this.animationId = requestAnimationFrame(t => this.run(t));
  }
  registerTask(task) {
    this.tasks.add(task);
    if (this.tasks.size === 1) {
      this.animationId = requestAnimationFrame(t => this.run(t));
    }
  }
  unregisterTask(task) {
    this.tasks.delete(task);
    if (this.tasks.size === 0 && this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
```

### Artykul 6: [Improve Animation Performance With requestAnimationFrame](https://www.debugbear.com/blog/requestanimationframe)
- **Zrodlo**: DebugBear
- **Kluczowe takeaways**:
  - rAF uruchamia callback **po task queues, ale PRZED layout i paint** -- optymalny moment na DOM updates
  - **rAF -> setTimeout pattern**: gwarantuje paint miedzy interakcja a ciezka logika (poprawia INP)
  - Zawsze uzywaj delta time zamiast frame count do obliczania predkosci animacji
  - rAF automatycznie pauzuje w background tabs -- darmowa optymalizacja
  - Bezposrednia manipulacja DOM (style mutations) zamiast czestych state updates
- **Code pattern** (time-based animation):
```javascript
let position = 0, lastTime = null;
function animate(time) {
  if (!lastTime) lastTime = time;
  const delta = time - lastTime;
  lastTime = time;
  position += delta * 0.2; // pixels per ms
  box.style.transform = `translateX(${position}px)`;
  if (position < 300) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

---

## 2. Fullscreen Web App Patterns

### Artykul 1: [How to Leverage the Fullscreen API... and Style It](https://css-tricks.com/how-to-leverage-the-fullscreen-api-and-style-it/)
- **Zrodlo**: CSS-Tricks
- **Kluczowe takeaways**:
  - `element.requestFullscreen()` / `document.exitFullscreen()` / `document.fullscreenElement` -- trzy kluczowe API
  - Pseudo-selektor `:fullscreen` pozwala stylowac element w trybie fullscreen
  - **OGRANICZENIE**: `:fullscreen` matchuje TYLKO root element w fullscreen -- nie dzieci!
  - `::backdrop` pseudo-element pozwala stylowac tlo za fullscreen elementem
  - Specyfikacja wymusza 100% width/height z `!important` na fullscreen elemencie
  - iPad bug: focus na input powoduje wyjscie z fullscreen
- **Code pattern** (toggle):
```javascript
function toggleFullscreen(element) {
  if (!document.fullscreenElement) {
    element.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
```

### Artykul 2: [Fullscreen API - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
- **Zrodlo**: MDN
- **Kluczowe takeaways**:
  - Event `fullscreenchange` do reagowania na zmiany stanu
  - Event `fullscreenerror` do obslugi bledow (np. user gesture requirement)
  - Firefox uzywa `cancelFullScreen()` zamiast `exitFullscreen()` (historyczne)
  - `document.fullscreenEnabled` -- sprawdzenie czy API jest dostepne

### Artykul 3: [Making Fullscreen Experiences](https://web.dev/articles/fullscreen)
- **Zrodlo**: web.dev (Chrome DevRel)
- **Kluczowe takeaways**:
  - **Nigdy nie probuj trickow z automatycznym fullscreen** -- nie przechwytuj pierwszego toucha do requestFullscreen()
  - iOS Safari nie ma Fullscreen API -- trzeba uzyc CSS-only fallback: `position: fixed; inset: 0; z-index: 9999`
  - Uzytkownik zawsze moze wyjsc ESC -- nie probuj tego blokowac
  - Na mobile rozwazyc meta viewport + CSS `100dvh` zamiast prawdziwego fullscreen

### Gotchas zebrane:
| Problem | Rozwiazanie |
|---------|-------------|
| iOS brak Fullscreen API | `position: fixed; inset: 0; z-index: 9999` |
| iPad: input focus = exit fullscreen | Unikaj inputow w fullscreen lub graceful re-enter |
| `:fullscreen` nie matchuje dzieci | Styluj root element, uzyj CSS variables do propagacji |
| User gesture required | Binduj requestFullscreen do click/keydown event |
| Prefixed API (starsze przegladarki) | Feature detection + fallback |

---

## 3. State Machine Visualization

### Artykul 1: [XState Visualizer](https://stately.ai/viz)
- **Zrodlo**: Stately.ai
- **Kluczowe takeaways**:
  - XState Visualizer zamienia kod state machine na interaktywny graf
  - Kompatybilny z protokolem SCXML -- mozna skopiowac machine do visualizera
  - Klikanie na eventy symuluje przejscia -- przydatne do debugowania workflow
  - Pattern: definicja stanow (idle, working, done) + tranzycje + akcje
- **Relevance dla Live Monitor**: Model faz presetu (Planning -> Implementation -> Testing -> Review -> Deployment) jako state machine z wizualnym grafem

### Artykul 2: [State Machine Advent: Visualize Your State Machines](https://dev.to/codingdive/state-machine-advent-visualize-your-state-machines-with-diagrams-as-you-code-4-24-1m7b)
- **Zrodlo**: Dev.to
- **Kluczowe takeaways**:
  - "Diagrams as you code" -- visualizer aktualizuje sie w real-time podczas pisania
  - Grafy stanow sa czytelniejsze niz kod -- ulatwiaja komunikacje z nieteechnicznymi stakeholderami
  - Kazdy stan powinien miec jasna nazwe i widoczne mozliwe przejscia

### Artykul 3: [Progress Step UI Design Patterns](https://designmodo.com/progress-step-ui/)
- **Zrodlo**: Designmodo
- **Kluczowe takeaways**:
  - **Horizontal stepper** -- najczestsza wizualizacja workflow fazowego
  - Stany kroków: completed (checkmark, kolor), active (highlight, animacja), upcoming (szary, disabled)
  - Pseudo-elementy `::before`/`::after` do laczenia kroków wizualnie
  - Klasa animacji na ukonczeniu kroku (np. `background` transition)
  - Mobile: vertical stepper lepszy niz horizontal
- **Code pattern** (CSS progress steps):
```css
.step { position: relative; display: inline-block; }
.step.completed::after {
  content: ''; position: absolute;
  top: 50%; left: 100%; width: 100%; height: 2px;
  background: var(--color-success);
  animation: fillLine 0.5s ease forwards;
}
.step.active { color: var(--color-primary); transform: scale(1.1); }
.step.upcoming { opacity: 0.4; }
```

### Artykul 4: [CSS Progress Wizard](https://christabor.github.io/css-progress-wizard/)
- **Zrodlo**: GitHub (Chris Tabor)
- **Kluczowe takeaways**:
  - Czysty CSS/SASS progress tracker bez JavaScript
  - Warianty: spaced, dashed, dashed-even, animated
  - 100% CSS-driven -- brak zaleznosci od JS
  - Przydatny jako baza do Phase Flow Indicator w Live Monitor

---

## 4. Data Flow Animation Techniques

### Artykul 1: [Animate Anything Along an SVG Path](https://tympanus.net/codrops/2022/01/19/animate-anything-along-an-svg-path/)
- **Zrodlo**: Codrops
- **Kluczowe takeaways**:
  - `getPointAtLength()` zwraca wspolrzedne x,y w danej odleglosci na sciezce SVG
  - `getTotalLength()` daje calkowita dlugosc sciezki -- potrzebne do normalizacji
  - Mozna uzyc path data do Canvas/WebGL particle systems bez renderowania samej sciezki
  - Cache'uj `getTotalLength()` -- nie wywoluj w kazdej klatce
  - Usuwaj elementy DOM po zakonczeniu animacji -- zapobieganie memory leaks
- **Code pattern** (animacja po sciezce):
```javascript
const path = document.querySelector('#connection-path');
const totalLength = path.getTotalLength(); // cache!
let progress = 0;

function animateOrb(timestamp) {
  progress = (progress + 0.005) % 1;
  const point = path.getPointAtLength(progress * totalLength);
  orb.setAttribute('cx', point.x);
  orb.setAttribute('cy', point.y);
  requestAnimationFrame(animateOrb);
}
```

### Artykul 2: [How SVG Line Animation Works](https://css-tricks.com/svg-line-animation-works/)
- **Zrodlo**: CSS-Tricks
- **Kluczowe takeaways**:
  - `stroke-dasharray` + `stroke-dashoffset` = podstawowa technika animacji linii SVG
  - Ustawienie dasharray na dlugosc sciezki, a dashoffset animujesz od dlugosci do 0 -- linia "rysuje sie"
  - Kierunek animacji kontrolowany przez poczatkowa wartosc dashoffset (0 lub totalLength)
  - **Flowing dashes** -- animacja dashoffset w petli daje efekt "plynacych danych" po polaczeniu
- **Code pattern** (flowing connection):
```css
.connection-line {
  stroke-dasharray: 8 4;
  animation: flowDash 1s linear infinite;
}
@keyframes flowDash {
  to { stroke-dashoffset: -12; } /* 8+4 = 12, cykliczny */
}
```

### Artykul 3: [SVG animateMotion - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateMotion)
- **Zrodlo**: MDN Web Docs
- **Kluczowe takeaways**:
  - `<animateMotion>` -- deklaratywna animacja pozycji wzdluz sciezki
  - SMIL NIE jest deprecated (wbrew plotkom) -- Chrome cofnal decyzje o deprecation
  - Pelne wsparcie: Chrome 5+, Firefox 4+, Safari 6.1+, Edge 79+
  - Brak wsparcia IE -- ale to juz nieistotne w 2026
  - Mozna laczyc z `rotate="auto"` dla auto-orientacji elementu wzdluz sciezki
- **Code pattern** (SMIL data packet):
```xml
<circle r="4" fill="#00ff88">
  <animateMotion dur="2s" repeatCount="indefinite"
    path="M10,80 C40,10 65,10 95,80" rotate="auto"/>
</circle>
```

### Artykul 4: [The Complete SVG Animation Encyclopedia (2025)](https://www.svgai.org/blog/research/svg-animation-encyclopedia-complete-guide)
- **Zrodlo**: SVG AI
- **Kluczowe takeaways**:
  - **Performance benchmarks** (kluczowe!):

| Technika | Desktop FPS | Mobile FPS | CPU | RAM |
|----------|-------------|------------|-----|-----|
| CSS transform | 60 | 55 | 5% | 25MB |
| CSS fill (kolor) | 58 | 32 | 15% | 30MB |
| GSAP drawSVG | 60 | - | 12% | 32MB |
| GSAP morphSVG | - | 28 | 85% | 80MB |

  - **transform + opacity = compositor thread** -- jedyne wlasciwosci dajace gwarancje 60 FPS
  - Animacja `fill`, `stroke`, `d` = CPU repaints, dramatyczny spadek FPS na mobile
  - Na mobile: detect device type i redukcja zlozonosci animacji
  - `will-change` dodawaj strategicznie i usuwaj po animacji

### Artykul 5: [Canvas Particle System Tutorial](https://cruip.com/how-to-create-a-beautiful-particle-animation-with-html-canvas/)
- **Zrodlo**: Cruip
- **Kluczowe takeaways**:
  - Particle = {x, y, vx, vy, radius, alpha, ttl}
  - Radial gradients daja efekt "glowing orbs"
  - Simplex Noise do organicznego ruchu cząstek
  - Animation loop: clear canvas -> update each particle -> draw each particle -> requestAnimationFrame
  - Czastki z time-to-live (TTL) zapobiegaja niekontrolowanemu wzrostowi pamieci
- **Code pattern** (glowing particle):
```javascript
function drawParticle(ctx, p) {
  const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
  grad.addColorStop(0, `rgba(0,255,136,${p.alpha})`);
  grad.addColorStop(1, `rgba(0,255,136,0)`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fill();
}
```

---

## 5. Glassmorphism i Modern Dark UI

### Artykul 1: [Dark Glassmorphism: The Aesthetic That Will Define UI in 2026](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f)
- **Zrodlo**: Medium (MustBeWebCode)
- **Kluczowe takeaways**:
  - **Ewolucja 2025-2026**: polaczenie glassmorphism z dark mode = "digital luxury"
  - Blur radius: **10-20px** -- optimum miedzy efektem frosted glass a czytelnoscia tekstu
  - Opacity: **10-40%** -- zalezna od jasnosci tla
  - Border: `1px solid rgba(255,255,255,0.1)` -- imitacja swiatla na krawedzi szkla
  - Background: dynamiczne color orby (purple, neon blue, hot pink) za UI
  - Shadow: `0 8px 32px 0 rgba(0,0,0,0.36)` -- separacja warstw
  - **Fallback obowiazkowy**: `background: rgba(17,17,17,0.9)` jesli backdrop-filter nie dziala
- **Code pattern** (glass panel):
```css
.glass-panel {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.36);
}
/* Fallback */
@supports not (backdrop-filter: blur(1px)) {
  .glass-panel { background: rgba(17,17,17,0.92); }
}
```

### Artykul 2: [12 Glassmorphism UI Features, Best Practices, and Examples](https://uxpilot.ai/blogs/glassmorphism-ui)
- **Zrodlo**: UX Pilot AI
- **Kluczowe takeaways**:
  - Ogranicz ilosc glass elementow na stronie -- kazdy to dodatkowe obciazenie GPU
  - Tekst: bialy lub `text-gray-100` na ciemnym glassmorphism
  - Kontrast 4.5:1 minimum dla dostepnosci (WCAG AA)
  - Gradient mesh jako tlo lepszy niz flat color -- daje "zywe" szklo

### Artykul 3: [CSS GPU Animation: Doing It Right](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- **Zrodlo**: Smashing Magazine
- **Kluczowe takeaways**:
  - **Animuj TYLKO transform i opacity** -- jedyne wlasciwosci na compositor thread
  - `will-change` to potezne ale niebezpieczne narzedzie -- nie dawaj na wszystko
  - **Implicit compositing**: element z animacja zmusza WSZYSTKIE elementy wyzej w z-index do wlasnych warstw
  - **Rozwiazanie**: animowane elementy powinny miec najwyzszy z-index
  - **Trick na pamiec**: maly element + `transform: scale(10)` zamiast duzego elementu
    - 100x100px = 40KB pamieci, 10x10px + scale(10) = 400 bajtow!
  - **Mobile**: kazda warstwa to memory * device pixel ratio^2 (4-9x wiecej na HiDPI)
  - **Flickering** = symptom kosztownej promocji warstw -- repaints przy tworzeniu/usuwaniu layerow
- **Code pattern** (memory-efficient glow):
```css
.glow-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: #00ff88;
  transform: scale(8);
  will-change: transform;
  box-shadow: 0 0 20px #00ff88;
}
```

### Artykul 4: [box-shadow vs filter: drop-shadow](https://css-tricks.com/breaking-css-box-shadow-vs-drop-shadow/)
- **Zrodlo**: CSS-Tricks
- **Kluczowe takeaways**:
  - `filter: drop-shadow()` -- hardware-accelerated (GPU), lepszy performance niz box-shadow
  - `box-shadow` -- prostokątny, na bounding box; `drop-shadow` -- podaza za alpha mask
  - drop-shadow blur = 2x box-shadow blur przy tych samych parametrach
  - drop-shadow **nie wspiera spread** -- brak odpowiednika `box-shadow: 0 0 10px 5px`
  - drop-shadow **nie wspiera inset**
  - **Safari bug**: drop-shadow na elementach z text inputami = input lag
  - **Dla glow effects**: `box-shadow` lepszy (spread parameter daje "miększy" glow), ale `drop-shadow` lepszy performance
- **Rekomendacja dla Live Monitor**: Uzyj `box-shadow` dla statycznych glow (agent nodes), `filter: drop-shadow()` dla animowanych elementow

### Artykul 5: [Typography for Data Dashboards](https://datafloq.com/typography-basics-for-data-dashboards/)
- **Zrodlo**: Datafloq / Datawrapper
- **Kluczowe takeaways**:
  - Sans-serif (Inter, Roboto, SF Pro) na labels/opisy -- czytelnosc na ekranach
  - **Tabular figures** -- cyfry o jednakowej szerokosci, niezbedne w tabelach/metrykach
  - Monospace daje "retro" feel -- uzywaj swiadomie (np. logi, terminal output)
  - Max 2-3 fonty w dashboardzie: data font + label font + opcjonalnie accent
  - **Rekomendacja**: Space Grotesk (labels) + JetBrains Mono (dane/logi) -- juz uzywane w V13+
  - Kontrast: ciemny szary na tekst, unikaj czystego bialego na ciemnym tle (zbyt ostry)

---

## 6. Performance w Heavy-Animation Single-Page Apps

### Artykul 1: [OffscreenCanvas -- Speed Up Your Canvas Operations with a Web Worker](https://web.dev/articles/offscreen-canvas)
- **Zrodlo**: web.dev (Google)
- **Kluczowe takeaways**:
  - `transferControlToOffscreen()` przenosi canvas do Web Workera -- rendering nie blokuje main thread
  - **Zero wplywu na UI responsiveness** -- worker thread jest niezalezny
  - `requestAnimationFrame()` dostepny w worker context
  - **Gotcha**: OffscreenCanvas nie ma DOM properties (np. `style.width`) -- trzeba stubowac
  - **Gotcha**: komunikacja miedzy watkami ma swoj koszt -- dla prostych canvasow moze pogorszyc performance
  - **Browser support**: Chrome 69+, Edge 79+, Firefox 105+, Safari 16.4+
- **Code pattern**:
```javascript
// Main thread
const offscreen = canvas.transferControlToOffscreen();
const worker = new Worker('renderer.js');
worker.postMessage({canvas: offscreen}, [offscreen]);

// renderer.js (worker)
self.onmessage = function(e) {
  const canvas = e.data.canvas;
  const ctx = canvas.getContext('2d');
  function draw() {
    // heavy rendering here
    requestAnimationFrame(draw);
  }
  draw();
};
```
- **Relevance dla Live Monitor**: Particle system (starfield, data packets) moze byc przeniesiony do workera. Ale: dla naszego przypadku koszt komunikacji moze przewyzszyc korzysci -- canvas V18 nie jest az tak ciezki.

### Artykul 2: [Intersection Observer for Scroll Animation Optimization](https://peerlist.io/adelpro/articles/javascript-intersection-observer-api-master-animations--opti)
- **Zrodlo**: Peerlist / Dev.to
- **Kluczowe takeaways**:
  - Scroll event fires constantly -> layout thrashing -> blocked main thread
  - Intersection Observer: asynchroniczny, browser oblicza intersections w tle
  - **Pattern**: `animation-play-state: paused` na CSS, JS dodaje klase gdy element widoczny
  - Lazy load animacji -- tylko widoczne elementy sie animuja
  - **Nie bezposrednio przydatne dla fullscreen monitora** (wszystko widoczne), ale uzyteczne jesli Live Monitor bedzie mial scrollowalny timeline/log
- **Code pattern**:
```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('animate', entry.isIntersecting);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.agent-card').forEach(el => observer.observe(el));
```

### Artykul 3: [Page Visibility API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- **Zrodlo**: MDN
- **Kluczowe takeaways**:
  - `document.visibilityState` -- 'visible' lub 'hidden'
  - Event `visibilitychange` -- reaguj na zmiane stanu karty
  - **requestAnimationFrame automatycznie pauzuje** w ukrytych kartach
  - `setTimeout`/`setInterval` sa throttled w background tabs (Chrome 88+: min 1 minute!)
  - **Wyjatki od throttlingu**: WebSocket, WebRTC, audio playback
  - **KRYTYCZNE dla Live Monitor**: Jesli uzytkownik przelacza karty podczas symulacji, animacje sie pauzuja automatycznie (rAF). Ale timer-based logika (setInterval do aktualizacji metryk) bedzie throttled -- uzywaj rAF do wszystkiego!
- **Code pattern**:
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pauseHeavyAnimations();
  } else {
    resumeAnimations();
  }
});
```

### Artykul 4: [Animation Performance 101: Optimizing JavaScript](https://www.viget.com/articles/animation-performance-101-optimizing-javascript)
- **Zrodlo**: Viget
- **Kluczowe takeaways**:
  - **Animuj najnizsze elementy w DOM** -- animacja parenta wymusza recalc na wszystkich dzieciach
  - **Layout thrashing**: write-before-read wymusza synchroniczny layout
  - **Pattern READ-THEN-WRITE**: najpierw odczytaj (offsetWidth itp.), potem zapisz (style mutations)
  - Cache DOM measurements poza animation loop
  - Web Animation API -- animacje na compositor thread z dynamiczna kontrola
- **Code pattern** (avoiding layout thrashing):
```javascript
// BAD: layout thrashing
function animate() {
  box.style.width = newWidth + 'px';     // WRITE
  console.log(box.offsetWidth);           // READ -> forces sync layout!
}

// GOOD: read first, then write
function animate() {
  const w = box.offsetWidth;              // READ (cached)
  box.style.transform = `scaleX(${w / targetW})`; // WRITE (compositor)
}
```

### Artykul 5: [Memory Leak Prevention in Long-Running Animations](https://davidwalsh.name/reducing-memory-leaks-working-animations)
- **Zrodlo**: David Walsh Blog / Medium
- **Kluczowe takeaways**:
  - **Endless rAF nie powoduje stack overflow** (async scheduling), ale POWODUJE memory leaks
  - Czeste przyczyny: brak cancelAnimationFrame przy cleanup, powtarzane rejestracje bez deregistracji
  - Real-world case: Fitbit SDK 6.0 crash -- ciagla petla rAF tworzy male garbage objects ktore nie moga byc zebrane
  - **Heap snapshot comparisons** -- porownaj snapshoty co kilka minut szukajac rosnacych obiektow
  - **Retainer paths** w Chrome DevTools -- znajdz root cause leakow
- **Code pattern** (proper cleanup):
```javascript
let animId = null;
function startAnimation() {
  function loop(time) {
    // animation logic
    animId = requestAnimationFrame(loop);
  }
  animId = requestAnimationFrame(loop);
}
function stopAnimation() {
  if (animId !== null) {
    cancelAnimationFrame(animId);
    animId = null;
  }
  // Clean up references
  particles.length = 0;
  connections.length = 0;
}
```

### Artykul 6: [CSS will-change: Transform, GPU, and Pitfalls](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- **Zrodlo**: Smashing Magazine (powtorzony, ale kluczowe dodatkowe insights)
- **Kluczowe takeaways**:
  - **Implicit compositing** -- najwazniejszy anti-pattern!
    - Element A ma `will-change: transform` i z-index: 1
    - Element B jest nad A w stacking order bez will-change
    - Browser MUSI promowac B do wlasnej warstwy (bo B musi byc renderowane nad A)
    - Efekt domina: dziesiątki niepotrzebnych warstw, memory explosion
  - **Fix**: dawaj najwyzszy z-index animowanym elementom
  - Kazda warstwa = width * height * 4 bajty * devicePixelRatio^2
  - Na Retina (2x): 1000x1000px element = 16MB pamieci na GPU!

### Artykul 7: [Browser Tab Throttling: The Hidden Performance Killer](https://www.getintechs.com/blog/inactive-tab-throttling)
- **Zrodlo**: WebTech Timeline
- **Kluczowe takeaways**:
  - Chrome 88+: chained setTimeout/setInterval w background tab = **minimum 1 minuta** miedzy wywolaniami
  - rAF kompletnie zatrzymany w hidden tabs
  - **Wyjatki**: WebSocket, WebRTC, audio -- nie throttled
  - **Pattern**: uzyj `visibilitychange` event do pauzowania/resumowania logiki

### Artykul 8: [Event Delegation for Large DOM Performance](https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/)
- **Zrodlo**: Go Make Things / Dev.to
- **Kluczowe takeaways**:
  - Kazdy event listener konsumuje pamiec -- w duzym DOM (100+ agent nodes) to sie kumuluje
  - Event delegation: jeden listener na parent, `event.target.closest()` do identyfikacji
  - Dynamicznie dodawane elementy automatycznie obslugiwane
  - **Gotcha**: w przypadku tysiecy child elements, selector matching moze byc wolny
  - **Pattern**: `event.target.matches()` lub `event.target.closest()` z konkretnymi selektorami
- **Code pattern**:
```javascript
// Instead of 100 listeners on 100 nodes:
document.querySelector('#canvas-container').addEventListener('click', e => {
  const node = e.target.closest('.agent-node');
  if (node) handleNodeClick(node.dataset.agentId);
  
  const conn = e.target.closest('.connection-line');
  if (conn) handleConnectionClick(conn.dataset.connId);
});
```

---

## 7. Bonus: Agent Status Monitoring i HITL Patterns

### Artykul 1: [Agent Status & Monitoring - AI Design Patterns](https://www.aiuxdesign.guide/patterns/agent-status-monitoring)
- **Zrodlo**: AI UX Design Guide
- **Kluczowe takeaways**:
  - **4 poziomy statusu** (kluczowe dla Live Monitor!):
    1. **Ambient** -- subtelny badge/wskaznik tla (np. pulsujacy ring)
    2. **Progress** -- panel z detalami dostepny on demand
    3. **Attention** -- przerywajace powiadomienie gdy potrzebny input (HITL!)
    4. **Summary** -- raport po zakonczeniu zadania
  - **Dopasowanie display do czasu trwania**:
    - <10s: spinner
    - Kilka minut: progress panel
    - Wiele godzin: dedykowany dashboard
  - **NIGDY nie uzywaj full-screen loading state** -- uzytkownik musi moc kontynuowac prace
  - Status check frequency = wskaznik niewystarczajacego ambient feedback
  - Auto-dismissal ukonczonych taskow zapobiega clutterowi

### Artykul 2: [From Data To Decisions: UX Strategies For Real-Time Dashboards](https://www.smashingmagazine.com/2025/09/ux-strategies-real-time-dashboards/)
- **Zrodlo**: Smashing Magazine (Sep 2025)
- **Kluczowe takeaways**:
  - **~5 kluczowych metryk** -- wiecej przytlacza; progresywne ujawnianie (collapse/expand) na reszta
  - **Sparklines + delta indicators** (np. "+3.2%") -- natychmiastowe zrozumienie trendu
  - **Micro-animations 200-400ms** -- counter change blindness bez dystrakcji
  - **Skeleton UI** zamiast spinnerow -- pokazuje oczekiwany ksztalt contentu
  - **Data freshness indicator**: Live/Stale/Paused + last updated timestamp
  - **ARIA live regions** -- narrator odczytuje zmiany screen readerom w tle
  - **prefers-reduced-motion** -- obowiazkowe dla uzytkownikow z vestibular sensitivities
  - **Tooltip "Why this alert?"** -- buduje zaufanie do systemu
- **Relevance**: Live Monitor HUD moze pokazywac: elapsed time, active agents, phase, progress %, tokens/cost -- dokladnie ~5 metryk

### Artykul 3: [Human-in-the-Loop UX Design](https://www.aufaitux.com/blog/human-in-the-loop-ux/)
- **Zrodlo**: AufaitUX
- **Kluczowe takeaways**:
  - HITL = intencjonalne wstrzymanie workflow na krytycznych punktach decyzyjnych
  - **Review fatigue**: jesli wszystko wymaga review, nic nie dostaje prawdziwego review
  - Confirmations tylko tam gdzie decyzja niesie realny koszt
  - Unikaj generycznych "Are you sure?" -- jasno opisz co uzytkownik ma zdecydowac
  - **Kontekst decyzji**: system powinien dostarczyc informacje potrzebne do decyzji
- **Relevance**: Five Minds HITL checkpoints w Live Monitor musza:
  - Jasno komunikowac "co sie wydarzylo w debacie"
  - Dac opcje: Approve / Reject / Request Re-debate
  - Nie blokowac calego UI -- HITL panel jako overlay, reszta widoczna

### Artykul 4: [Review Fatigue Is Breaking Human-in-the-Loop AI](https://ravipalwe.medium.com/review-fatigue-is-breaking-human-in-the-loop-ai-heres-the-design-pattern-that-fixes-it-044d0ab1dd12)
- **Zrodlo**: Medium (Ravi Palwe, Mar 2026)
- **Kluczowe takeaways**:
  - Kazdy dodatkowy approval step bez realnej wagi kognitywnej uczy czlowieka ze approvals to formalnosc
  - **Tiered review**: niskie ryzyko = auto-approve z mozliwoscia audytu; wysokie ryzyko = wymuszony review
  - AI powinno dostarczyc "confidence score" i "reasoning summary" przy HITL decyzji
  - Wizualnie rozroznij "routine approval" od "critical decision" -- inny kolor/ikona/wielkosc

### Artykul 5: [Multi-Agent Debate Visualization Patterns](https://debategraph.org/Stream.aspx?nid=89671)
- **Zrodlo**: DebateGraph + badania naukowe
- **Kluczowe takeaways**:
  - Grafy argumentow: drag-and-drop, AI identyfikuje polaczenia logiczne i slabosci
  - Multi-Agent Debate (MAD): structured argumentation z zdefiniowanymi rolami i mechanizmem judge
  - Agent chat room pattern: kazdy agent ma distinct persona, wymiana wiadomosci o wspolnym problemie
  - Adversarial collaboration: napietosc jako motor lepszych rozwiazan
  - **Vizualizacja**: timeline rozmowy + graf argumentow (pro/contra) + final synthesis
- **Relevance**: Five Minds debate w Live Monitor moze byc wizualizowana jako:
  - Circular layout 4 ekspertow + Devil's Advocate na gorze
  - Speech bubbles z argumentami (juz w V14)
  - Linie polaczen miedzy argumentami: agree (zielone) / disagree (czerwone)
  - Gold Solution w centrum po debacie

---

## Performance Checklist

Konkretna lista optymalizacji do zastosowania w Live Monitor:

### Rendering Pipeline
- [ ] **Animuj TYLKO transform i opacity** -- jedyne wlasciwosci na compositor thread
- [ ] **Centralized animation loop** -- jeden `requestAnimationFrame` loop zamiast wielu rozproszonych
- [ ] **Delta time** -- bazuj predkosc animacji na czasie, nie na frame count
- [ ] **FPS throttling** -- `if (deltaTime > 1000/targetFPS)` w animation loop
- [ ] **READ-then-WRITE** -- najpierw odczytaj DOM measurements, potem zapisuj

### GPU & Layers
- [ ] **will-change sparingly** -- dodawaj przed animacja, usuwaj po zakonczeniu
- [ ] **Najwyzszy z-index na animowanych elementach** -- zapobiega implicit compositing
- [ ] **Male elementy + scale()** -- 10x10px + scale(10) zamiast 100x100px (100x mniej pamieci)
- [ ] **Limituj ilosc glass panels** -- kazdy backdrop-filter = dodatkowa warstwa GPU
- [ ] **Fallback dla backdrop-filter** -- `@supports not (backdrop-filter: blur(1px))`

### Memory & Cleanup
- [ ] **cancelAnimationFrame()** w kazdym cleanup/destroy
- [ ] **Particles z TTL** -- time-to-live zapobiega niekontrolowanemu wzrostowi
- [ ] **Clear array references** -- `particles.length = 0` zamiast `particles = []` (GC friendly)
- [ ] **Event delegation** -- jeden listener na kontenerze zamiast N listenerow na dzieciach
- [ ] **Remove DOM elements** po zakonczeniu animacji (speech bubbles, completed orbs)

### Browser & Tabs
- [ ] **visibilitychange handler** -- pauzuj ciezkie animacje gdy karta ukryta
- [ ] **rAF zamiast setInterval** do WSZYSTKIEGO co wizualne -- auto-pause w hidden tabs
- [ ] **prefers-reduced-motion** -- redukcja/wylaczenie animacji dla wrażliwych uzytkownikow

### SVG Specific
- [ ] **Cache getTotalLength()** -- nie wywoluj w kazdej klatce
- [ ] **stroke-dasharray + dashoffset** do flowing connections zamiast ruchomych elementów DOM
- [ ] **SMIL animateMotion** dla prostych orbit/sciezek -- zero JavaScript, browser-native
- [ ] **SVG simplification** -- mniej nodow/pathjow = mniej pracy przegladarki

### UX & Accessibility
- [ ] **Max ~5 metryk** w HUD -- progressive disclosure na reszta
- [ ] **Micro-animations 200-400ms** -- wystarczajaco dlugie by zauwazic, krotkie by nie irytowaac
- [ ] **ARIA live regions** na dynamicznych aktualizacjach
- [ ] **Kontrastowe kolory** -- nie polegaj tylko na kolorze (+ ikony/kształty)
- [ ] **Skeleton UI** zamiast spinnerow gdzie to mozliwe

---

## Czeste Bledy (Anti-Patterns)

### 1. Rozrzucone requestAnimationFrame
**Blad**: Kazda animacja (starfield, particles, orbs, connections) ma wlasne `requestAnimationFrame`.
**Skutek**: Wielokrotne wywolania browser API, brak kontroli nad FPS, trudne cleanup.
**Fix**: Centralny AnimationManager z registerTask/unregisterTask.

### 2. Animowanie left/top/width/height zamiast transform
**Blad**: `element.style.left = x + 'px'` w petli animacji.
**Skutek**: Kazda klatka wymusza layout recalculation -- 5x wolniejsze niz transform.
**Fix**: `element.style.transform = 'translate(x, y)'` -- compositor thread, GPU accelerated.

### 3. Layout Thrashing
**Blad**: Pisanie do DOM przed czytaniem w tej samej klatce.
**Skutek**: Wymuszony synchroniczny layout -- blokuje main thread.
**Fix**: Batch reads, then batch writes. Cache DOM measurements poza petla.

### 4. will-change na wszystkim
**Blad**: `* { will-change: transform; }` lub will-change na dziesiatkach elementow.
**Skutek**: Kazdy element dostaje wlasna warstwa GPU -> memory explosion (szczegolnie mobile).
**Fix**: will-change TYLKO na elementach, ktore beda animowane, i USUN po zakonczeniu.

### 5. Implicit Compositing Cascade
**Blad**: Animowany element nisko w z-index; wiele elementow nad nim.
**Skutek**: Browser promuje WSZYSTKIE elementy nad animowanym do osobnych warstw.
**Fix**: Animowane elementy na najwyzszym z-index. Ideally bezposrednie dzieci body.

### 6. Brak cleanup przy destroy/unmount
**Blad**: Otwierasz Live Monitor, zamykasz, otwierasz... za kazdym razem nowy rAF loop bez cancelowania starego.
**Skutek**: Memory leak, rosnace zuzycie CPU, eventual crash.
**Fix**: `cancelAnimationFrame()` + czyszczenie referencji w kazdym destroy.

### 7. setInterval do animacji
**Blad**: `setInterval(updateMetrics, 100)` zamiast rAF.
**Skutek**: Nie synchronizuje sie z repaint cycle, kontynuuje w background tabs (throttled do 1min w Chrome).
**Fix**: rAF do wszystkiego wizualnego. setInterval tylko do non-visual periodic tasks.

### 8. Duze elementy jako composite layers
**Blad**: Fullscreen overlay z will-change: transform.
**Skutek**: 1920x1080 * 4 bajty * 4 (Retina) = 33MB pamieci GPU na JEDEN element.
**Fix**: Rozbij na mniejsze czesci lub uzyj trick z malym elementem + scale().

### 9. Ignorowanie prefers-reduced-motion
**Blad**: Intensywne animacje bez mozliwosci wylaczenia.
**Skutek**: Problemy z dostepnoscia; niektorzy uzytkownicy doswiadczaja mdlosci/zawrotow glowy.
**Fix**: `@media (prefers-reduced-motion: reduce) { .animated { animation: none !important; } }`

### 10. Brak delta-time w animacjach
**Blad**: `position += 5` w kazdej klatce (zalezne od frame rate).
**Skutek**: Na 60Hz animacja jest 2x szybsza niz na 30Hz.
**Fix**: `position += speed * deltaTime` -- stala predkosc niezaleznie od FPS.

---

## Rekomendacje dla Live Monitor

Na podstawie zebranego researchu, konkretne rekomendacje techniczne:

### Architektura animacji
1. **Centralny AnimationManager** -- jeden rAF loop dla calego Live Monitora
2. **Task-based registration** -- kazdy komponent (starfield, particles, agents, connections) rejestruje swoja update function
3. **Automatic cleanup** -- przy zamykaniu monitora: unregister all tasks + cancelAnimationFrame

### Rendering strategy
1. **SVG dla polaczen** -- stroke-dasharray flowing animation (pure CSS, zero JS overhead)
2. **CSS transforms dla pozycji agentow** -- compositor thread, GPU accelerated
3. **Canvas** rozwazyc TYLKO jesli particle count > 200 (ponizej: DOM/SVG wystarczy)
4. **SMIL animateMotion** dla data packets na sciezkach -- deklaratywne, browser-native

### Fullscreen approach
1. **CSS pseudo-fullscreen** jako primary: `position: fixed; inset: 0; z-index: 9999`
2. **Fullscreen API** jako enhancement: `requestFullscreen()` na button click
3. **ESC handler**: `document.addEventListener('fullscreenchange', ...)` + custom ESC binding

### HITL Decision Points
1. **Tiered importance** -- rozroznij rutynowe approvals (subtle) od krytycznych decyzji (prominent)
2. **Context-rich** -- pokaz summary debaty Five Minds + confidence score
3. **Non-blocking** -- HITL overlay, reszta monitora widoczna w tle
4. **Auto-timeout** z default decision po X sekundach (configurable)

### Phase visualization
1. **Horizontal stepper** -- wyprobowany pattern, CSS-only possible
2. **Active phase: glow + scale** -- passive: gray + reduced opacity
3. **Connection lines** miedzy fazami z flowing dash animation
4. **Completion checkmark** z confetti/pulse micro-animation

### Performance safety nets
1. **FPS counter** (dev mode) -- jesli < 30 FPS, auto-reduce particle count
2. **visibilitychange** -- pause heavy animations when tab hidden
3. **prefers-reduced-motion** -- disable particles, reduce transitions
4. **Max particle/connection limits** -- hard caps zapobiegajace memory explosion

---

## Zrodla

### Real-time Dashboards & Vanilla JS
- [How I Built a Real-Time Dashboard from Scratch Using Vanilla JavaScript](https://medium.com/@michaelpreston515/how-i-built-a-real-time-dashboard-from-scratch-using-vanilla-javascript-no-frameworks-f93f3dce98a9)
- [How I Built a Real-Time Data Visualization Dashboard With Just JavaScript](https://medium.com/codrift/how-i-built-a-real-time-data-visualization-dashboard-with-just-javascript-511a58b5b763)
- [Useful Patterns for Building HTML Tools](https://simonwillison.net/2025/Dec/10/html-tools/) -- Simon Willison
- [How to Build a Dashboard Using JavaScript](https://www.javascriptdoctor.blog/2026/03/how-to-build-dashboard-using-javascript.html)
- [Supercharge Your Web Animations: Optimize requestAnimationFrame Like a Pro](https://dev.to/josephciullo/supercharge-your-web-animations-optimize-requestanimationframe-like-a-pro-22i5) -- Dev.to
- [Improve Animation Performance With requestAnimationFrame](https://www.debugbear.com/blog/requestanimationframe) -- DebugBear
- [Mastering requestAnimationFrame](https://dev.to/codewithrajat/mastering-requestanimationframe-create-smooth-high-performance-animations-in-javascript-2hpi) -- Dev.to

### Fullscreen API
- [How to Leverage the Fullscreen API and Style It](https://css-tricks.com/how-to-leverage-the-fullscreen-api-and-style-it/) -- CSS-Tricks
- [Fullscreen API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
- [Making Fullscreen Experiences](https://web.dev/articles/fullscreen) -- web.dev
- [How to Use the JavaScript Fullscreen API](https://www.freecodecamp.org/news/how-to-use-the-javascript-fullscreen-api/) -- freeCodeCamp

### State Machine & Progress
- [XState Visualizer](https://stately.ai/viz) -- Stately.ai
- [State Machine Advent: Visualize Your State Machines](https://dev.to/codingdive/state-machine-advent-visualize-your-state-machines-with-diagrams-as-you-code-4-24-1m7b) -- Dev.to
- [Progress Step UI Design Patterns](https://designmodo.com/progress-step-ui/) -- Designmodo
- [CSS Progress Wizard](https://christabor.github.io/css-progress-wizard/)

### Data Flow & SVG Animation
- [Animate Anything Along an SVG Path](https://tympanus.net/codrops/2022/01/19/animate-anything-along-an-svg-path/) -- Codrops
- [How SVG Line Animation Works](https://css-tricks.com/svg-line-animation-works/) -- CSS-Tricks
- [animateMotion - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateMotion)
- [SVG Animation Encyclopedia (2025)](https://www.svgai.org/blog/research/svg-animation-encyclopedia-complete-guide) -- SVG AI
- [SVG Animation with SMIL - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_animation_with_SMIL)
- [SMIL is Dead! Long Live SMIL!](https://css-tricks.com/smil-is-dead-long-live-smil-a-guide-to-alternatives-to-smil-features/) -- CSS-Tricks
- [Smashing Animations Part 3: SMIL's Not Dead](https://www.smashingmagazine.com/2025/05/smashing-animations-part-3-smil-not-dead/) -- Smashing Magazine
- [Canvas Particle Animation Tutorial](https://cruip.com/how-to-create-a-beautiful-particle-animation-with-html-canvas/) -- Cruip
- [Animated Line Drawing in SVG](https://jakearchibald.com/2013/animated-line-drawing-svg/) -- Jake Archibald

### Glassmorphism & Dark UI
- [Dark Glassmorphism: The Aesthetic That Will Define UI in 2026](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f) -- Medium
- [12 Glassmorphism UI Features and Best Practices](https://uxpilot.ai/blogs/glassmorphism-ui) -- UX Pilot
- [CSS GPU Animation: Doing It Right](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/) -- Smashing Magazine
- [box-shadow vs drop-shadow](https://css-tricks.com/breaking-css-box-shadow-vs-drop-shadow/) -- CSS-Tricks
- [Glassmorphism Dark Backgrounds](https://csstopsites.com/glassmorphism-dark-backgrounds) -- CSS Top Sites

### Performance & Optimization
- [OffscreenCanvas: Speed Up with Web Workers](https://web.dev/articles/offscreen-canvas) -- web.dev
- [Animation Performance 101: Optimizing JavaScript](https://www.viget.com/articles/animation-performance-101-optimizing-javascript) -- Viget
- [Animation Performance 101: Browser Under the Hood](https://www.viget.com/articles/animation-performance-101-browser-under-the-hood) -- Viget
- [Page Visibility API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- [Browser Tab Throttling: The Hidden Performance Killer](https://www.getintechs.com/blog/inactive-tab-throttling)
- [Reducing Memory Leaks When Working with Animations](https://davidwalsh.name/reducing-memory-leaks-working-animations) -- David Walsh
- [JavaScript Memory Leaks in 2025](https://medium.com/@deval93/javascript-memory-leaks-in-2025-how-to-detect-prevent-and-fix-them-ade013bd8b46) -- Medium
- [Endless Animations, rAF, and Call Stack Limits (2026)](https://copyprogramming.com/howto/endless-animations-requestanimationframe-and-call-stack-limits)
- [Event Delegation for Vanilla JS](https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/) -- Go Make Things

### Typography
- [Fonts for Data Visualization](https://www.datawrapper.de/blog/fonts-for-data-visualization) -- Datawrapper
- [Typography Basics for Data Dashboards](https://datafloq.com/typography-basics-for-data-dashboards/) -- Datafloq

### Agent Monitoring & HITL
- [Agent Status & Monitoring](https://www.aiuxdesign.guide/patterns/agent-status-monitoring) -- AI UX Design Guide
- [UX Strategies for Real-Time Dashboards](https://www.smashingmagazine.com/2025/09/ux-strategies-real-time-dashboards/) -- Smashing Magazine
- [Human-in-the-Loop UX](https://www.aufaitux.com/blog/human-in-the-loop-ux/) -- AufaitUX
- [Review Fatigue in HITL AI](https://ravipalwe.medium.com/review-fatigue-is-breaking-human-in-the-loop-ai-heres-the-design-pattern-that-fixes-it-044d0ab1dd12) -- Medium
- [Multi-Agent Debate Visualization](https://debategraph.org/Stream.aspx?nid=89671) -- DebateGraph
- [Designing Human-Agent Interaction](https://www.designative.info/2026/01/15/designing-human-agent-interaction-principles-for-trustworthy-collaboration/)
