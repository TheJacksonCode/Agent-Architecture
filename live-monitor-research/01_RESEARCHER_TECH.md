# Researcher Tech -- Raport Techniczny
## Live Monitor Mode: Analiza Technologii

**Data:** 2026-04-04
**Rola:** Researcher Tech (Deep Five Minds Protocol)
**Kontekst:** Agent Teams Configurator -- single-file HTML app (~3000 LOC), inline JS/CSS, 27 agentow, 29 presetow, SVG connections, Canvas data stream, requestAnimationFrame render loop, glassmorphism UI, localStorage persistence.

---

## Spis tresci

1. [Real-time Visualization w przegladarce](#1-real-time-visualization-w-przegladarce)
2. [Fullscreen Mode Patterns](#2-fullscreen-mode-patterns)
3. [File-based Communication Protocol](#3-file-based-communication-protocol)
4. [Real-time State Visualization](#4-real-time-state-visualization)
5. [Diagramy architektoniczne w przegladarce](#5-diagramy-architektoniczne-w-przegladarce)
6. [HITL (Human-in-the-Loop) Interface Patterns](#6-hitl-human-in-the-loop-interface-patterns)
7. [Podsumowanie Rekomendacji](#podsumowanie-rekomendacji)

---

## 1. Real-time Visualization w przegladarce

Pytanie: jakimi technikami renderowac live dashboard w single-page HTML app bez build systemu?

### Opcja A: requestAnimationFrame + Canvas 2D API

**Opis:** Petla `requestAnimationFrame` (rAF) rysuje klatka-po-klatce na elemencie `<canvas>`. Aplikacja juz uzywa tego wzorca -- `dataStreamCanvas` z efektem Matrix-style data stream (linie 2490-2510 w v21).

**Pros:**
- Juz obecne w codebase -- zero nowych zaleznosci
- Doskonala wydajnosc przy tysiacach elementow (czasteczki, linie, gradienty) -- Canvas utrzymuje ~60 FPS nawet przy 5000+ obiektow [SVG Genie benchmark](https://www.svggenie.com/blog/svg-vs-canvas-vs-webgl-performance-2025)
- Pelna kontrola nad kazda klatka -- mozna rysowac metryki, wykresy, timeline, particle effects w jednym ujednoliconym renderze
- Brak reflow/repaint DOM -- rendering odbywa sie calkowicie poza drzewem DOM

**Cons:**
- Brak natywnych zdarzen DOM na narysowanych elementach (trzeba recznie robic hit-testing)
- Tekst renderowany na Canvas jest rozmyty przy skalowaniu (nie wektor)
- Trudniejszy debugging -- nie widac elementow w DevTools Elements
- Wieksze zuzycie pamieci na duzych surface areas (bitmap buffer)

**Rekomendacja: TAK -- jako warstwe particle/efektow i data stream.**

Zrodla:
- [Mastering requestAnimationFrame (Medium)](https://medium.com/@tharunbalaji110/mastering-requestanimationframe-the-secret-weapon-i-discovered-while-building-our-startups-c845cbc43a45)
- [SVG vs Canvas vs WebGL benchmark 2025](https://www.svggenie.com/blog/svg-vs-canvas-vs-webgl-performance-2025)
- [Canvas vs SVG performance (Boris Smus)](https://smus.com/canvas-vs-svg-performance/)

---

### Opcja B: Web Animations API (WAAPI)

**Opis:** Natywne API przegladarki (`element.animate()`) ktore uruchamia animacje na wantku kompozytora GPU zamiast glownego watku JS. Dziedziczy wydajnosc silnika CSS animations, ale daje kontrole z poziomu JavaScript.

**Pros:**
- Animacje biegna na compositor thread -- nie blokuja main thread nawet przy ciezkich obliczeniach [MDN Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Web_Animations_API_Concepts)
- Automatyczna interpolacja `transform`, `opacity`, `clip-path` z GPU-acceleration
- Pelne wsparcie przegladarek: Chrome/Edge 36+, Firefox 48+, Safari 13.1+ [Can I Use WAAPI](https://caniuse.com/web-animation)
- Idealne do animowania node'ow agentow (pulse, glow, scale), speech bubbles (fade in/out), progress barow, phase transitions
- Mozna laczyc z rAF -- WAAPI do animacji elementow DOM, rAF do Canvas particle effects

**Cons:**
- Nie rysuje pikseli jak Canvas -- to API do animowania istniejacych elementow DOM/SVG
- Przy tysiacach jednoczesnych animacji (>1000 elementow) moze byc wolniejsze niz batch Canvas draw [anime.js WAAPI docs](https://animejs.com/documentation/web-animation-api/when-to-use-waapi/)
- Nie zastepuje Canvas do custom rendering (wykresy, particle systems)

**Rekomendacja: TAK -- jako glowny mechanizm animacji elementow UI (agenci, karty, metryki).**

Zrodla:
- [Web Animation Performance Tier List (Motion.dev)](https://motion.dev/magazine/web-animation-performance-tier-list)
- [Animations on the Web -- CSS, rAF, WAAPI, View Transitions (Benedikt Sperl, 2026)](https://www.benedikt-sperl.de/blog/2026-01-13-animations-on-the-web)
- [MDN: CSS and JavaScript animation performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/CSS_JavaScript_animation_performance)

---

### Opcja C: CSS Houdini (Paint Worklet / Animation Worklet)

**Opis:** Niskopoziomowe API eksponujace silnik renderingu CSS. Paint Worklet pozwala pisac custom `paint()` funkcje w JS uruchamiane w renderingu. Animation Worklet daje dostep do compositor thread.

**Pros:**
- Paint Worklet tworzy custom tla/efekty (np. mesh gradient, noise, grid) z wydajnoscia silnika CSS
- Efekty renderowane off-main-thread -- nie blokuja JS
- Deklaratywne -- CSS custom properties steruja parametrami

**Cons:**
- **Fatalne wsparcie przegladarek:** Animation Worklet tylko Chrome (experimental). Paint Worklet: Chrome/Edge tak, Firefox/Safari potrzebuja polyfill [MDN Houdini APIs](https://developer.mozilla.org/en-US/docs/Web/API/Houdini_APIs)
- Layout API wciaz experimental -- nie gotowe produkcyjnie
- Wymaga osobnego worklet JS file lub blob URL -- komplikuje single-file architecture
- Krzywa uczenia sie -- malo przykladow, slaba dokumentacja

**Rekomendacja: NIE -- zbyt niestabilne, slabe wsparcie przegladarek, niepotrzebna zlozonosc.**

Zrodla:
- [CSS Houdini -- Vincent De Oliveira](https://iamvdo.me/en/blog/css-houdini)
- [Chrome Animation Worklet blog](https://developer.chrome.com/blog/animation-worklet)
- [CSS Paint Polyfill (GoogleChromeLabs)](https://github.com/GoogleChromeLabs/css-paint-polyfill)

---

### Opcja D: SVG Animations (SMIL + CSS transitions na SVG)

**Opis:** Animacje inline SVG -- SMIL `<animate>`, `<animateTransform>` lub CSS transitions/keyframes na SVG elementach. Aplikacja juz uzywa SVG do connections (`#svg` element, linia 639 v21) i ikon agentow (AGENT_SVG system).

**Pros:**
- Juz w codebase -- SVG connections, SVG icons z drop-shadow filter
- Wektorowe -- ostry rendering na kazdej rozdzielczosci
- SVG elementy to pelne DOM nodes -- klikalne, hover, DevTools, accessibility
- Idealne do animowania polaczen miedzy agentami (data packets, flow indicators)
- CSS transitions na SVG dzialaja we wszystkich przeglądarkach

**Cons:**
- Przy >500 animowanych SVG elementow wydajnosc spada drastycznie (kazdy element to DOM node z reflow) [JointJS SVG vs Canvas](https://www.jointjs.com/blog/svg-versus-canvas)
- SMIL jest deprecated w starszych dyskusjach (ale w praktyce nadal dzial a we wszystkich przeglądarkach)
- Brak pikselowych efektow (blur particles, glow trails) -- te lepiej na Canvas

**Rekomendacja: TAK -- do connections, flow indicators, agent node glow rings (jak juz robi v21).**

Zrodla:
- [SVG vs Canvas: Which Technology (JointJS)](https://www.jointjs.com/blog/svg-versus-canvas)
- [SVG vs Canvas Animation: Modern Frontends 2026 (AugustInfotech)](https://www.augustinfotech.com/blogs/svg-vs-canvas-animation-what-modern-frontends-should-use-in-2026/)

---

### REKOMENDACJA DLA REAL-TIME VISUALIZATION

**Architektura hybrydowa (juz czesciowo w v21):**

| Warstwa | Technologia | Uzycie |
|---------|-------------|--------|
| Particle effects, data stream | Canvas 2D + rAF | Matrix rain, particle burst, ambient effects |
| Agent node animations | WAAPI (`element.animate()`) | Pulse, scale, fade, status transitions |
| Connections & flow | SVG inline | Data packets, flow direction, glow |
| UI chrome (metryki, karty) | CSS transitions + keyframes | Glassmorphism panels, counters, progress bars |

---

## 2. Fullscreen Mode Patterns

Pytanie: jak zrobic immersive fullscreen dashboard z plynnym przejsciem z normalnego widoku?

### Opcja A: Fullscreen API (`document.documentElement.requestFullscreen()`)

**Opis:** Natywne API przegladarki ukrywajace pasek adresu, tabs, taskbar OS. Aplikacja przechodzi w prawdziwy fullscreen jak gra lub video player.

**Pros:**
- Prawdziwy fullscreen -- zero rozpraszaczy, caly ekran dla dashboardu
- Prosta implementacja: `el.requestFullscreen()` / `document.exitFullscreen()`
- CSS pseudo-klasa `:fullscreen` pozwala na osobne style w trybie fullscreen [MDN Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
- Eventy `fullscreenchange` i `fullscreenerror` do obslugi stanu

**Cons:**
- **Wymaga user gesture** -- nie mozna uruchomic programowo bez klikniecia
- Przeglądarka wyswietla ostrzezenie "Press Escape to exit fullscreen" -- nie mozna tego usunac
- iOS Safari NIE wspiera Fullscreen API [web.dev Fullscreen](https://web.dev/articles/fullscreen)
- Transition do/z fullscreen jest gwaltowna (browser domyslnie nie animuje)
- Escape key jest zarezerwowany przez browser do wyjscia -- moze kolidowac z naszym Escape handling

**Rekomendacja: OPCJONALNY DODATEK -- mozna oferowac jako dodatkowy przycisk, ale nie jako glowny mechanizm.**

Zrodla:
- [MDN Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
- [web.dev -- Making Fullscreen Experiences](https://web.dev/articles/fullscreen)
- [JavaScript Fullscreen API (CodeLucky)](https://codelucky.com/javascript-fullscreen-api/)

---

### Opcja B: CSS-only Fullscreen Overlay (position: fixed + z-index)

**Opis:** Div z `position: fixed; inset: 0; z-index: 9999` pokrywajacy cala strone. Nie korzysta z Fullscreen API -- to "fake fullscreen" wewnatrz okna przegladarki.

**Pros:**
- **Juz uzyty w v21** -- hero overlay, bento learn panel, modals uzywaja dokladnie tego wzorca
- Zero ograniczen przegladarki -- nie wymaga user gesture, nie pokazuje ostrzezen
- Pelna kontrola nad transition animation (CSS `transform: scale`, `opacity`, clip-path)
- Dziala na iOS Safari, Firefox, wszystkich przeglądarkach
- Escape key mozna obsluzyc customowo (juz obslugiwany w v21, linia 3006)
- Latwiejsze zarzadzanie z-index stack context

**Cons:**
- Pasek adresu przegladarki i taskbar OS nadal widoczne
- Nie jest "prawdziwym" fullscreen -- user moze przypadkowo kliknac poza okno
- Na mniejszych ekranach stracony pixel space na chrome przegladarki

**Rekomendacja: TAK -- glowny mechanizm Live Monitor, identyczny pattern jak Mission Control w v18.**

---

### Opcja C: View Transitions API + CSS Overlay

**Opis:** Polaczenie View Transitions API (nowe, Baseline Newly Available od pazdziernik 2025) z CSS overlay. View Transitions tworzy plynna animacje miedzy dwoma stanami DOM -- morph z normalnego widoku do fullscreen dashboardu.

**Pros:**
- **GPU-accelerated** morph transitions -- przegladarka automatycznie animuje elementy z view-transition-name [MDN View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- Benchmark: "apps z View Transitions czuja sie 2-3x snappier na low-end devices" [Chrome blog View Transitions 2025](https://developer.chrome.com/blog/view-transitions-in-2025)
- Same-document transitions: Chrome 111+, Edge 111+, Firefox 133+, Safari 18+ [DebugBear View Transitions](https://www.debugbear.com/blog/view-transitions-spa-without-framework)
- Mozna animowac transition: normal canvas -> fullscreen monitor z plynnym morphem elementow agentow
- Zero zaleznosci -- natywne API przegladarki
- Deklaratywne: `document.startViewTransition(() => { toggleMonitor() })`

**Cons:**
- Wymaga Chrome 111+ / Safari 18+ -- starsze przegladarki nie obsluga (ale graceful degradation do instant switch)
- API wciaz mlode -- mniej przykladow, edge case'y
- Potrzeba nadania `view-transition-name` na elementach ktore maja byc animowane -- wymaga planowania CSS

**Rekomendacja: TAK -- jako enhancement layer. Wrap przelaczanie Live Monitor w `startViewTransition()` z fallback na instant toggle.**

Zrodla:
- [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [Mastering View Transitions 2026 (DEV Community)](https://dev.to/krish_kakadiya_5f0eaf6342/mastering-smooth-page-transitions-with-the-view-transitions-api-in-2026-31of)
- [Chrome: View Transitions in 2025 update](https://developer.chrome.com/blog/view-transitions-in-2025)

---

### REKOMENDACJA DLA FULLSCREEN

**Dual approach:**

1. **Glowny mechanizm:** CSS fixed overlay (jak Mission Control w v18) -- pewne, cross-browser, juz znany pattern
2. **Enhancement:** View Transitions API do plynnego morph normal -> fullscreen (z fallback)
3. **Opcjonalny bonus:** Przycisk "True Fullscreen" z Fullscreen API dla uzytkownikow chcacych ukryc browser chrome

```
// Pseudokod
function openLiveMonitor() {
  if (document.startViewTransition) {
    document.startViewTransition(() => showMonitorOverlay());
  } else {
    showMonitorOverlay(); // instant fallback
  }
}
```

---

## 3. File-based Communication Protocol

Pytanie: jak przeglądarkowa apka moze czytac pliki lokalne do monitorowania stanu agentow?

### Opcja A: File System Access API + polling

**Opis:** Uzytkownik jednorazowo przyznaje dostep do folderu przez `showDirectoryPicker()`. Apka okresowo (`setInterval`) czyta pliki JSON ze statusem agentow.

**Pros:**
- Bezposredni dostep do systemu plikow -- czytanie i pisanie do wybranego katalogu [Chrome File System Access](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access)
- `FileSystemDirectoryHandle.getFileHandle()` + `file.text()` -- proste API
- Permission persist miedzy sesjami (po user grant)
- Mozna czytac rozne formaty: JSON (stan), TXT (logi), MD (raporty)

**Cons:**
- **Tylko Chromium** (Chrome, Edge) -- zero wsparcia Firefox/Safari [Can I Use File System Access](https://caniuse.com/native-filesystem-api)
- Wymaga user gesture na poczatku (picker dialog)
- Polling to marnowanie CPU -- czytanie pliku co 500ms nawet gdy sie nie zmienil
- Brak notyfikacji o zmianach -- trzeba porownywac `lastModified` timestamp

**Rekomendacja: TAK -- jako primary mechanism z inteligentnym polling (czytanie lastModified zanim czyta content).**

Zrodla:
- [Chrome: File System Access API](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access)
- [MDN File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)
- [WICG File System Access spec](https://wicg.github.io/file-system-access/)

---

### Opcja B: File System Observer API (event-driven)

**Opis:** Nowe API (Intent to Ship od Chrome ~135+) ktore automatycznie notyfikuje o zmianach w obserwowanych plikach/katalogach -- odpowiednik `fs.watch()` z Node.js, ale w przegladarce.

**Pros:**
- Event-driven zamiast polling -- zero marnowania CPU [Chrome File System Observer blog](https://developer.chrome.com/blog/file-system-observer)
- Callback z typem zmiany: `appeared`, `disappeared`, `modified`, `moved`
- Dziala na handle'ach z File System Access API
- Znacznie efektywniejsze niz polling przy wielu plikach
- MDN juz dokumentuje: `new FileSystemObserver(callback)` / `observer.observe(handle)` [MDN FileSystemObserver](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemObserver)

**Cons:**
- **Bardzo nowe** -- origin trial zakonczony (Chrome 129-134), Intent to Ship w toku [chromestatus](https://chromestatus.com/feature/4622243656630272)
- Tylko Chrome/Edge (Chromium) -- zero Firefox/Safari
- Tylko desktop (praca nad Android w toku)
- Moze byc niestabilne -- API moze sie zmienic przed finalizacja

**Rekomendacja: FUTURE ENHANCEMENT -- monitorowac status, uzyc gdy bedzie Baseline. Na razie File System Access + smart polling.**

Zrodla:
- [Chrome: File System Observer origin trial](https://developer.chrome.com/blog/file-system-observer)
- [MDN FileSystemObserver](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemObserver)
- [WHATWG FS proposal](https://github.com/whatwg/fs/blob/main/proposals/FileSystemObserver.md)

---

### Opcja C: `<input type="file">` + FileReader API (klasyczne)

**Opis:** Uzytkownik recznie wybiera plik(i) przez standardowy file input. JavaScript czyta zawarto sc przez `FileReader.readAsText()`.

**Pros:**
- **Uniwersalne wsparcie** -- dziala w kazdej przegladarce (Chrome, Firefox, Safari, mobile)
- Zero specjalnych permissions -- standardowy HTML file input
- Prosta implementacja -- `input.addEventListener('change', handler)`
- Mozna uzyc `webkitdirectory` attribute do wyboru calego folderu

**Cons:**
- **Jednorazowe** -- uzytkownik musi za kazdym razem recznie wybierac plik (brak persistent access)
- Brak real-time monitoring -- nie mozna "obserwowac" pliku, trzeba kliknac ponownie
- Nie nadaje sie do live monitoring -- wymaga interakcji user przy kazdym uaktualnieniu
- `webkitdirectory` nie jest standardem (choć dziala w wiekszosci przegladarek)

**Rekomendacja: FALLBACK -- jako opcja "Import Status File" dla przegladarek bez File System Access API.**

---

### Opcja D: BroadcastChannel API (miedzy-kartami)

**Opis:** Nie czyta plikow, ale umozliwia komunikacje miedzy kartami przegladarki na tej samej domenie. Jesli agenci raportuja przez inna karte/okno, BroadcastChannel synchronizuje.

**Pros:**
- Zero serwera -- komunikacja peer-to-peer miedzy kartami [MDN BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)
- Event-driven -- `channel.onmessage` bez pollingu
- Prosta implementacja: `new BroadcastChannel('live-monitor')` w obu kartach
- Chrome, Firefox, Edge -- szerokie wsparcie (ale nie Safari < 15.4)

**Cons:**
- Tylko same-origin -- obie karty musza byc z tego samego zrodla
- Nie czyta plikow -- wymaga drugiej apki/karty ktora nadaje dane
- Nie rozwiazuje problemu "jak agent pisze status" -- to tylko transport miedzy kartami
- Dane gubione gdy wszystkie karty zamkniete (brak persistence)

**Rekomendacja: KOMPLEMENTARNY -- uzyc do synchronizacji stanu miedzy karta Configurator a Live Monitor otwartym w osobnym oknie.**

Zrodla:
- [MDN Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)
- [MDN Blog: Exploring BroadcastChannel](https://developer.mozilla.org/en-US/blog/exploring-the-broadcast-channel-api-for-cross-tab-communication/)
- [Chrome BroadcastChannel](https://developer.chrome.com/blog/broadcastchannel)

---

### Opcja E: Symulowany protokol plikowy (localStorage / IndexedDB jako "file system")

**Opis:** Zamiast prawdziwych plikow, agent-runner zapisuje stan do `localStorage` (klucz JSON), a Live Monitor czyta z tego samego klucza. Lub IndexedDB dla wiekszych danych.

**Pros:**
- **Zero file system permissions** -- dziala wszedzie
- Natychmiastowy dostep -- `localStorage.getItem()` jest synchroniczny
- Juz uzyty pattern w v21 (`acV21` key dla saved configs)
- `storage` event na `window` -- automatyczna notyfikacja miedzy kartami (ale nie w tej samej karcie)
- IndexedDB dla duzych danych (logi, historia) -- asynchroniczny, nie blokuje UI

**Cons:**
- localStorage limit ~5-10MB -- moze byc za malo dla dlugich logow
- `storage` event dziala tylko miedzy roznymi kartami, nie wewnatrz jednej
- Nie jest prawdziwym plikiem -- nie mozna otworzyc w edytorze tekstu
- Dane przywiazane do domeny -- nie przenosi sie miedzy urzadzeniami

**Rekomendacja: TAK -- jako glowny mechanizm wewnetrznej komunikacji (agent simulation -> Live Monitor w tej samej karcie). File System Access jako opcjonalny import/export.**

---

### REKOMENDACJA DLA FILE COMMUNICATION

**Warstwowy protokol:**

| Scenariusz | Mechanizm | Uwagi |
|-----------|-----------|-------|
| Wewnetrzna symulacja (ta sama karta) | localStorage + custom events | `dispatchEvent(new CustomEvent('agent-status-change'))` |
| Monitor w osobnym oknie | BroadcastChannel | `new BroadcastChannel('atc-live')` |
| Import zewnetrznych danych | File System Access API | `showDirectoryPicker()` + polling lastModified |
| Fallback import | `<input type="file">` | Dla Firefox/Safari |
| Przyszlosc | File System Observer API | Gdy bedzie Baseline |

---

## 4. Real-time State Visualization

Pytanie: jak efektywnie wyswietlac i aktualizowac zmieniajacy sie stan 27 agentow?

### Opcja A: data-attribute State Machine + CSS

**Opis:** Kazdy agent node ma atrybut `data-state="idle|working|done|error|waiting"`. CSS selektory `[data-state="working"]` steruja wyglad em. JavaScript zmienia tylko atrybut -- CSS robi reszte.

**Pros:**
- **Deklaratywne** -- stan to jeden atrybut, CSS robi wizualizacje [David Khourshid: CSS State Machines](https://medium.com/@DavidKPiano/css-animations-with-finite-state-machines-7d596bb2914a)
- Wymusza pojedynczy stan (w przeciwienstwie do klas CSS ktore mozna laczyc nieokreslenie)
- CSS transitions automatycznie animuja przejscia miedzy stanami
- Latwy debugging -- widac `data-state` w DevTools Elements
- Pattern "States & Data Attributes" rekomendowany przez Frontend Masters [Frontend Masters CSS Animations](https://frontendmasters.com/courses/css-animations/states-data-attributes/)
- v21 czesciowo uzywa klas (`sim-active`, `phase-dim`, `sim-done`, `always-on`) -- migracja do data-state bylaby naturalna

**Cons:**
- CSS transitions sa ograniczone -- nie moga animowac `display`, `content` (tekst)
- Potrzeba dobrego planowania stanow z gory (finite state machine design)
- Przy zlozone j logice (substany, parallel states) sam atrybut moze byc niewystarczajacy

**Rekomendacja: TAK -- glowny mechanizm zarzadzania stanem wizualnym agentow.**

```css
/* Przyklad */
.agent[data-state="idle"]    { opacity: 0.5; }
.agent[data-state="working"] { opacity: 1; animation: pulse 1.5s infinite; border-color: var(--accent2); }
.agent[data-state="done"]    { opacity: 0.8; border-color: var(--accent2); }
.agent[data-state="error"]   { opacity: 1; border-color: var(--accent4); animation: shake 0.3s; }
.agent[data-state="waiting"] { opacity: 0.7; animation: breathe 2s infinite; }
```

Zrodla:
- [David Khourshid: CSS Animations with Finite State Machines](https://medium.com/@DavidKPiano/css-animations-with-finite-state-machines-7d596bb2914a)
- [David Khourshid: CSS State Machines (GitHub gist)](https://gist.github.com/davidkpiano/e715b59bef817d2146164add26a134b0)
- [Frontend Masters: States & Data Attributes](https://frontendmasters.com/courses/css-animations/states-data-attributes/)

---

### Opcja B: Reactive Proxy + DOM Diffing (Vanilla JS)

**Opis:** JavaScript `Proxy` opakowuje obiekt stanu agentow. Przy kazdej zmianie property, setter automatycznie aktualizuje tylko zmienione elementy DOM (diff-based).

**Pros:**
- Automatyczne -- zmiana `state.agents[0].status = 'working'` natychmiast aktualizuje DOM
- Precyzyjne updaty -- tylko zmieniony element jest modyfikowany (nie caly re-render) [GoMakeThings: DOM diffing and reactivity](https://gomakethings.com/mostly-vanilla-js-dom-diffing-and-data-reactivity/)
- Batching z `requestAnimationFrame` -- wiele zmian w jednej klatce [GoMakeThings: batch rendering](https://gomakethings.com/how-to-batch-ui-rendering-in-a-reactive-state-based-ui-component-with-vanilla-js/)
- Zero zaleznosci -- `Proxy` jest natywny ES6
- Mozna laczyc z data-attribute pattern: Proxy setter zmienia `data-state`, CSS animuje

**Cons:**
- Wymaga starannego projektowania diffing logic -- full DOM diff jest zlozony
- `Proxy` nie jest gleboko reaktywny (nested objects wymagaja rekursywnego owijania)
- v21 uzywa imperatywnego podejscia (`classList.add/remove`) -- refactor bylby znaczacy
- Debugging Proxy moze byc trudne (stack traces sa mniej czytelne)

**Rekomendacja: CZESCIOWO -- uzyc Proxy do centralnego stanu monitora (metryki, fazy), ale nie do pelnego DOM diffing (za duzy refactor).**

```javascript
// Przyklad uproszczony
const monitorState = new Proxy({ phase: 0, agents: {} }, {
  set(target, prop, value) {
    target[prop] = value;
    requestAnimationFrame(() => updateMonitorUI(prop, value));
    return true;
  }
});
```

---

### Opcja C: Full Re-render z innerHTML

**Opis:** Przy kazdej zmianie stanu, caly panel monitora jest re-renderowany przez ustawienie `innerHTML` na nowy HTML string.

**Pros:**
- Najprostsze do implementacji -- jeden `render()` function ktory generuje caly HTML
- v21 juz uzywa tego wzorca w wielu miejscach: `rNd()` re-renderuje wszystkie node'y, `rConn()` re-renderuje SVG, `rSv()` re-renderuje saved list
- Latwe do debugowania -- widac caly wygenerowany HTML
- Brak zlozonej logiki diffing

**Cons:**
- **Utrata stanu DOM** -- focus, scroll position, selection, animacje sa resetowane przy re-render
- **Wydajnosc** -- re-parsowanie i re-renderowanie calego DOM jest kosztowne przy czestych updateach (co 100-500ms)
- Event listenery musza byc re-attachowane (lub uzywac event delegation)
- Mruganie/flickering przy czestych updateach
- Nie nadaje sie do live dashboard z wieloma malymi zmianami na sekunde

**Rekomendacja: NIE dla live monitora -- za kosztowne i mruga. OK dla jednorazowych renderow (jak teraz w v21 dla statycznych paneli).**

---

### Opcja D: Signals Pattern (Lightweight Reactivity)

**Opis:** Inspirowane Preact Signals / SolidJS -- lekkie reaktywne prymitywy. Mozna zaimplementowac w ~30 liniach vanilla JS. `signal()` tworzy reactive value, `effect()` subskrybuje na zmiany.

**Pros:**
- Ultra-lekkie -- ~30 LOC do implementacji [Tiny Signals (CSS Script)](https://www.cssscript.com/state-management-tiny-signals/)
- Fine-grained reactivity -- tylko dotkniete efekty sie uruchamiaja
- Composable -- mozna laczyc signals (computed values)
- Nowoczesny pattern uzyty w Preact, SolidJS, Angular Signals

**Cons:**
- Trzeba zaimplementowac od zera (lub dodac ~2KB micro-library)
- Nie jest standardem -- custom pattern, nowa koncepcja dla maintainerow
- Moze byc overengineering dla naszego scope (27 agentow to nie tysiac komponentow)
- Debugging wymaga zrozumienia reaktywnego grafu

**Rekomendacja: OPCJONALNY -- interesujace dla przyszlych wersji, ale data-attribute + Proxy jest prostsze i wystarczajace.**

---

### REKOMENDACJA DLA STATE VISUALIZATION

**Kombinacja:**

1. **data-state attribute** na kazdym agent node -- CSS-driven animations, single source of truth
2. **Proxy wrapper** na centralnym obiekcie monitora -- automatyczny dispatch do DOM updates
3. **requestAnimationFrame batching** -- grupowanie wielu zmian stanu w jedna klatke
4. **Event delegation** na kontenerze monitora -- zero re-attachowania listenerow

```
Stan: monitorState.agents['orchestrator'].state = 'working'
  -> Proxy setter triggeruje
    -> rAF batch
      -> element.dataset.state = 'working'
        -> CSS transition animuje
```

---

## 5. Diagramy architektoniczne w przegladarce

Pytanie: jak generowac wizualne diagramy (flowcharts, sequence diagrams, architecture views) inline w single HTML file?

### Opcja A: Hand-crafted SVG Generation (Vanilla JS)

**Opis:** JavaScript generuje SVG programowo -- `createElementNS('http://www.w3.org/2000/svg', 'rect')`, budujac diagramy z prostych ksztaltow: prostokaty (agenci), linie (polaczenia), tekst (etykiety).

**Pros:**
- **Zero zaleznosci** -- v21 juz generuje SVG connections tym sposobem (linia 2238 `rConn()`)
- Pelna kontrola nad wyglad em -- mozna dopasowac do glassmorphism design systemu
- Brak dodatkowego payloadu -- nie trzeba ladowac zewnetrznych bibliotek
- Interaktywne -- SVG elementy sa klikalne, hoverable, animowalne
- Mozna uzyc gradientow, filtrow, animacji CSS na generowanych elementach

**Cons:**
- Trzeba recznie implementowac layout algorytm (pozycjonowanie node'ow, routing polaczen)
- Brak automatycznego layout -- trzeba kodowac heurystyki rozmieszczenia
- Brak gotowych typow diagramow (sequence, flowchart) -- kazdy trzeba budowac od zera
- Wieksze ryzyko bugow w layout logic

**Rekomendacja: TAK -- jako glowny mechanizm dla diagramow architektonicznych (rozszerzenie istniejacego SVG systemu v21).**

---

### Opcja B: Mermaid.js (CDN)

**Opis:** Biblioteka generujaca diagramy SVG z tekstowej definicji Markdown-like. Ladowana z CDN, renderuje `<pre class="mermaid">` elementy do SVG.

**Pros:**
- Bogata paleta diagramow: flowchart, sequence, state, class, Gantt, mindmap, timeline [Mermaid.js](https://mermaid.js.org/)
- Prosta skladnia tekstowa -- latwo generowac dynamicznie z JS
- Renderuje do inline SVG -- mozna dalej stylowac CSS
- CDN: `<script type="module">import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs'</script>` [Mermaid Usage docs](https://mermaid.js.org/config/usage.html)
- Aktywnie rozwijane -- v11+ z nowym "neo" stylem [Mermaid releases](https://github.com/mermaid-js/mermaid/releases)

**Cons:**
- **Duzy payload** -- Mermaid bundle to ~2-3MB (uzywa D3 + dagre-d3 wewnetrznie) [Mermaid GitHub](https://github.com/mermaid-js/mermaid)
- Wymaga CDN lub inline bundle -- laczy nas z zewnetrznym serwisem
- Ograniczona customizacja wizualna -- trudno dopasowac do glassmorphism theme (Mermaid ma wlasne CSS themes)
- Rendering jest synchroniczny i moze bloku jac UI przy duzych diagramach
- Problemy z wieloma diagramami na jednej stronie (duplicate SVG IDs)
- Single-file philosophy traci sens gdy ladujemy 3MB z CDN

**Rekomendacja: NIE jako glowny mechanizm -- zbyt ciezki, zbyt malo konfigurowalny wizualnie. MOZE byc uzyteczny jako opcjonalny eksport.**

Zrodla:
- [Mermaid.js Tutorial 2026 (Starmorph)](https://blog.starmorph.com/blog/mermaid-js-tutorial)
- [Mermaid.js Guide 2026 (W3Resource)](https://www.w3resource.com/javascript/mermaid-js-guide-to-create-diagrams-as-code.php)

---

### Opcja C: D3.js Force Layout (CDN micro-bundle)

**Opis:** D3.js force simulation do automatycznego rozmieszczania node'ow z fizyka (przyciaganiae, odpychanie). Mozna zaladowac tylko potrzebne moduly z CDN.

**Pros:**
- Automatyczny layout oparty na fizyce -- node'y same sie rozmieszczaja [D3.js](https://d3js.org/)
- Modularna architektura -- mozna zaladowac TYLKO `d3-force` + `d3-selection` (~50KB zamiast pelnego D3 ~250KB)
- CDN: `<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>` lub moduly ES [D3 Getting Started](https://d3js.org/getting-started)
- Swietne do graph/network visualizations -- dokladnie nasz use case
- Interaktywne -- drag, zoom, pan out of the box
- Generuje SVG elementy -- kompatybilne z istniejacym systemem

**Cons:**
- Nawet micro-bundle to ~50-80KB dodatkowego kodu
- Wymaga CDN -- external dependency
- Krzywa uczenia sie D3 jest stroma (deklaratywny data-binding)
- Force layout moze byc niestabilny (node'y "skacza" zanim sie ustabilizuja)
- Overengineering jesli potrzebujemy tylko prostych layout heurystyk

**Rekomendacja: NIE na teraz -- v21 juz ma wlasny system pozycjonowania node'ow. D3 force byloby redundancja. Rozwazyc w przyszlosci dla automatycznego layout.**

---

### Opcja D: CSS Grid/Flexbox jako Diagramy

**Opis:** Uzycie CSS Grid do tworzenia diagram-like layoutow. Elementy HTML jako node'y, CSS Grid Lines jako "connections", pseudo-elementy `::before/::after` jako strzalki.

**Pros:**
- **Zero JS** do layoutu -- czysto deklaratywne
- Responsive -- Grid automatycznie dostosowuje sie do rozmiaru
- Dostepne (accessibility) -- elementy HTML z semantyka
- Ultra-lekkie -- brak zadnych zewnetrznych bibliotek
- Doskonale do "dashboard grid" z kartami metryk, phase bars, agent grids

**Cons:**
- Nie nadaje sie do graph/network diagramow (polaczenia miedzy dowolnymi node'ami)
- Connections (linie, strzalki) trudne do zrobienia w czystym CSS -- mozna tylko proste
- Ograniczone do regularnych grid/flow layoutow
- Nie zastepuje SVG canvas do swobodnego pozycjonowania

**Rekomendacja: TAK -- do struktury dashboardu Live Monitor (grid metryk, phase timeline, agent cards). SVG do polaczen/flow.**

---

### Opcja E: Inline Canvas 2D Diagrams

**Opis:** Rysowanie diagramow na Canvas 2D -- prostokaty, linie, tekst, strzalki. Podobnie do tego co robi Mission Control w v18.

**Pros:**
- Wydajnosc przy wielu elementach -- szybszy niz SVG powyzej ~500 elementow
- Pelna kontrola pikselowa -- custom rendering czegos czego nie zrobi CSS/SVG
- Mozna laczyc z istniejacym Canvas data stream

**Cons:**
- Brak interakcji DOM -- trzeba recznie implementowac hit-testing
- Tekst nieostring przy skalowaniu (bitmap)
- Trudne do stylowania -- nie dziedziczy CSS
- Brak accessibility (screen readers nie widza Canvas content)

**Rekomendacja: NIE dla diagramow -- SVG jest lepsze. Canvas zostaje dla efektow particle/data stream.**

---

### REKOMENDACJA DLA DIAGRAMOW

| Typ diagramu | Technologia | Uzasadnienie |
|--------------|-------------|--------------|
| Architecture / flow view | Hand-crafted SVG (rozszerzenie v21 rConn) | Zero dep, pelna kontrola, juz w codebase |
| Dashboard layout | CSS Grid + Flexbox | Responsive, semantyczne, lekkie |
| Sequence / timeline | SVG + CSS (hybrid) | SVG do linii/strzalek, CSS do boxow/tekstu |
| Particle effects / ambient | Canvas 2D | Wydajnosc, juz w v21 |
| Export do dokumentacji | Opcjonalny Mermaid.js (lazy-load) | Tylko na zadanie, nie na stale |

---

## 6. HITL (Human-in-the-Loop) Interface Patterns

Pytanie: jak budowac interactive decision points gdzie uzytkownik moze wstrzymac/zatwierdzic/odrzucic/zmodyfikowac decyzje agentow?

### Opcja A: Modal Approval Gate

**Opis:** Symulacja sie zatrzymuje i wyswietla modal z decyzja do podjecia. Uzytkownik wybiera: Approve / Reject / Modify. Modal blokuje dalsze dzialanie do decyzji.

**Pros:**
- **Jasny i jednoznaczny** -- uzytkownik wie ze musi podjac decyzje [IBM HITL](https://www.ibm.com/think/topics/human-in-the-loop)
- Pattern znany z v12v2/v12v3 (Five Minds Protocol ma 3-5 punktow HITL)
- Wymusza review -- nie mozna "przegapic" decision point
- Prosta implementacja -- v21 juz ma system modali (`.mo.show`)

**Cons:**
- **Blokujacy** -- przerrywa flow, moze byc irytujace przy czestych decision points
- Uzytkownik moze "rubber-stamp" (klikac approve bez czytania) -- fatalny pattern UX [Zapier HITL blog](https://zapier.com/blog/human-in-the-loop/)
- Wymaga kontekstu -- "poor interface produces rubber-stamp approvals" [MyEngineeringPath HITL 2026](https://myengineeringpath.dev/genai-engineer/human-in-the-loop/)
- Nie nadaje sie do czestych, drobnych decyzji

**Rekomendacja: TAK -- ale TYLKO dla krytycznych decyzji (zmiana fazy, final approval). Max 3-5 na sesje.**

Zrodla:
- [Zapier: Human-in-the-loop in AI workflows](https://zapier.com/blog/human-in-the-loop/)
- [IBM: What Is HITL](https://www.ibm.com/think/topics/human-in-the-loop)
- [MyEngineeringPath: HITL Patterns 2026](https://myengineeringpath.dev/genai-engineer/human-in-the-loop/)

---

### Opcja B: Inline Decision Panel (Non-blocking)

**Opis:** Decision point pojawia sie jako panel w dashboardzie (nie modal). Symulacja zwalnia ale NIE zatrzymuje sie -- uzytkownik ma X sekund na decyzje, po czym system kontynuuje z domyslna opcja.

**Pros:**
- **Non-blocking** -- nie przerywa flow, uzytkownik decyduje w kontekscie live dashboard
- Mniejsze ryzyko irytacji -- symulacja trwa, decyzja jest opcjonalna
- Mozna pokazac kontekst obok decyzji (stan agentow, metryki, logi)
- Pattern "confidence-based routing" -- system sugeruje opcje, uzytkownik moze overridowac [Mastra HITL docs](https://mastra.ai/docs/workflows/human-in-the-loop)
- Timeout z domyslna opcja -- system nie blokuje sie na wieki

**Cons:**
- Uzytkownik moze przegapic decision point (jezeli nie patrzy)
- Trudniejsze do implementacji -- trzeba zarzadzac timing, timeout, fallback
- Wyglad informacji moze "ginac" wsrod innych elementow dashboardu
- Wymaga wyraznego visual indicator (pulsujacy element, dzwiek, highlight)

**Rekomendacja: TAK -- jako glowny HITL mechanism dla Live Monitor. Decision panel w dedykowanym area dashboardu z pulsujacym attention indicator.**

Zrodla:
- [Mastra: Human-in-the-loop workflows](https://mastra.ai/docs/workflows/human-in-the-loop)
- [Microsoft: Agent Framework HITL](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop)
- [Orkes: HITL in Agentic Workflows](https://orkes.io/blog/human-in-the-loop/)

---

### Opcja C: Branching UI (Decision Tree)

**Opis:** Decyzja uzytkownika rozgalezia symulacje. Uzytkownik widzi 2-3 opcje jako "galaz ie" na timeline/diagramie i wybiera sciezke. Mozna "cofnac" do wczesniejszego punktu decyzyjnego.

**Pros:**
- Najbogatszy model decyzyjny -- uzytkownik widzi konsekwencje wyboru
- Mozliwosc "what-if" analysis -- wyprobuj rozne sciezki
- Wizualnie atrakcyjne -- drzewo decyzyjne jako diagram
- Zgodne z "adversarial collaboration" pattern z Five Minds Protocol

**Cons:**
- **Bardzo zlozony** do implementacji -- trzeba zarzadzac stan wielocczescieiezkami, historia, rollback
- Stan rosnie eksponencjalnie z kazda decyzja
- Moze przytloczyc uzytkownika przy wielu branch points
- Wymaga znaczacego dodatkowego UI (timeline z branchami, rollback controls)

**Rekomendacja: FUTURE ENHANCEMENT -- za zlozony na pierwsza wersje Live Monitor. Rozwazyc w v24+.**

---

### Opcja D: Asynchronous Feedback Queue

**Opis:** System nie czeka na decyzje. Kontynuuje z domyslna sciezka, ale zbiera feedback uzytkownika asynchronicznie. Feedback wplywa na przyszle decyzje (machine learning loop).

**Pros:**
- Zero blokowania -- system zawsze postepuje do przodu
- Zbiera feedback do ulepszania domyslnych scieżek
- Skalowalne -- uzytkownik moze przeglądac i oceniac decyzje po fakcie
- Pattern rekomendowany dla high-volume workflows [Parseur HITL Guide 2026](https://parseur.com/blog/human-in-the-loop-ai)

**Cons:**
- Nie daje uzytkownikowi realnej kontroli w real-time -- feedback jest po fakcie
- Wymaga systemu przechowywania feedbacku i jego przetwarzania
- W kontekscie symulacji edukacyjnej (nasz use case) -- uzytkownik CHCE kontrolowac, nie recenzowac
- Overengineering dla konfiguracyjnej apki

**Rekomendacja: NIE -- nie pasuje do naszego use case (edukacyjna symulacja, nie produkcyjny pipeline).**

---

### REKOMENDACJA DLA HITL

**Two-tier approach:**

| Typ decyzji | Pattern | Kiedy |
|------------|---------|-------|
| Krytyczna (zmiana fazy, final review) | Modal Approval Gate | Max 3-5 na sesje, z pelnym kontekstem |
| Regularna (approve/modify agent output) | Inline Decision Panel | Non-blocking, timeout z default, w dashboard area |

**Kluczowe zasady UX dla HITL:**
1. **Kontekst** -- zawsze pokazuj co agent proponuje I dlaczego (nie sam przycisk Approve)
2. **Domyslna opcja** -- jesli user nie reaguje w X sekund, system kontynuuje z rozsadnym defaultem
3. **Visual attention** -- pulsujacy indicator, zmiana koloru, opcjonalny sound cue
4. **Structured options** -- Approve / Reject / Modify (nie free-text, to zwalnia) [Zapier HITL](https://zapier.com/blog/human-in-the-loop/)
5. **History** -- kazda decyzja zapisana w Dialog Timeline (juz istniejacy komponent w v21)

---

## Podsumowanie Rekomendacji

| # | Zagadnienie | Rekomendacja | Dlaczego |
|---|------------|--------------|----------|
| 1 | Real-time Visualization | **Hybryda: Canvas (particles) + WAAPI (DOM animations) + SVG (connections) + CSS (UI)** | Uzywa istniejacych mechanizmow v21, WAAPI daje GPU-accelerated animations bez zaleznosci, kazda warstwa robi to w czym jest najlepsza |
| 2 | Fullscreen Mode | **CSS fixed overlay + View Transitions API (enhancement) + opcjonalny Fullscreen API** | CSS overlay to sprawdzony pattern z v18/v21, View Transitions daje plynny morph (Baseline 2025), Fullscreen API jako bonus |
| 3 | File Communication | **localStorage/custom events (wewnatrz) + BroadcastChannel (miedzy kartami) + File System Access (import/export)** | Warstwowe podejscie pokrywa wszystkie scenariusze, localStorage juz w v21, File System Observer jako przyszly upgrade |
| 4 | State Visualization | **data-state attribute + Proxy wrapper + rAF batching** | Deklaratywne, CSS-driven, single source of truth, automatyczne updaty z Proxy, wydajne z batching |
| 5 | Diagramy | **Hand-crafted SVG (rozszerzenie v21) + CSS Grid (dashboard layout)** | Zero zewnetrznych zaleznosci, pelna kontrola wizualna, kompatybilne z glassmorphism theme, juz w codebase |
| 6 | HITL Interface | **Modal (krytyczne, 3-5/sesje) + Inline Decision Panel (regularne, non-blocking z timeout)** | Balans miedzy kontrola a non-blocking flow, kontekst przy decyzji, structured options |

---

## Kluczowe Zasady Architektoniczne

1. **Zero zewnetrznych zaleznosci** -- wszystko inline, jak dotychczasowe wersje v1-v21
2. **Progressive enhancement** -- nowe API (View Transitions, File System Observer) z fallback
3. **Istniejacy stack** -- rozszerzac to co juz jest (SVG, Canvas, rAF, localStorage, CSS transitions) zamiast zastepowac
4. **Performance budget** -- utrzymac 60 FPS na mid-range laptop (target: max 100 animated elements jednoczesnie)
5. **Single file** -- calosc w jednym HTML z inline `<style>` i `<script>`, zgodnie z konwencja projektu

---

## Zalacznik: Browser Compatibility Matrix

| Technologia | Chrome | Firefox | Safari | Edge | Uwagi |
|------------|--------|---------|--------|------|-------|
| Canvas 2D + rAF | 100% | 100% | 100% | 100% | Universal |
| Web Animations API | 36+ | 48+ | 13.1+ | 36+ | [caniuse](https://caniuse.com/web-animation) |
| CSS transitions/animations | 100% | 100% | 100% | 100% | Universal |
| View Transitions API | 111+ | 133+ | 18+ | 111+ | Baseline Oct 2025 |
| Fullscreen API | 71+ | 64+ | brak iOS | 79+ | iOS Safari nie wspiera |
| File System Access | 86+ | brak | brak | 86+ | Tylko Chromium |
| File System Observer | ~135+ | brak | brak | ~135+ | Intent to Ship |
| BroadcastChannel | 54+ | 38+ | 15.4+ | 16+ | Szerokie wsparcie |
| localStorage | 100% | 100% | 100% | 100% | Universal |
| CSS data-state selectors | 100% | 100% | 100% | 100% | Universal |
| Proxy (ES6) | 49+ | 18+ | 10+ | 12+ | Universal modern |
| SVG inline animations | 100% | 100% | 100% | 100% | Universal |

---

*Raport przygotowany przez Researcher Tech w ramach Deep Five Minds Protocol.*
*Nastepny krok: Devil's Advocate powinien zakwestionowac zalozenia o single-file architecture przy rosnacym LOC (~3000+ lini) i payload przegladarki.*
