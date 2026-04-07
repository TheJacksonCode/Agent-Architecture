# QA Security -- Audyt Bezpieczenstwa
## Live Monitor Mode Specyfikacja v22

**Rola:** QA Security [OPUS]
**Data:** 2026-04-04
**Zakres audytu:** 24_GOLD_SOLUTION_2.md (finalna spec), 17_BACKEND_DEV.md (backend), 15_FRONTEND_DEV.md (frontend)
**Kontekst:** Single-file HTML app, client-side only, zero server, zero API calls, zero user auth, zero external dependencies

---

### Summary

| Severity | Count |
|----------|-------|
| CRITICAL | 0 |
| HIGH | 3 |
| MEDIUM | 5 |
| LOW | 4 |

**Ogolna ocena: Profil ryzyka NISKI.** Aplikacja dziala wylacznie lokalnie w przegladarce, bez backendu, bez autentykacji, bez danych uzytkownikow. Wiekszosci wektorow ataku (CSRF, SSRF, SQL injection, auth bypass) nie ma w ogole. Glowne ryzyka dotycza self-XSS, resource exhaustion i manipulacji localStorage -- wszystkie sa ograniczone do kontekstu wlasnej przegladarki uzytkownika.

---

### Findings

---

#### [SEV-001] severity: HIGH
##### innerHTML z niesanityzowanymi danymi w showHITLPanel()

- **Lokalizacja**: 17_BACKEND_DEV.md, sekcja 4.3 "Option Presentation", linie 1192-1249
- **Opis**: Funkcja `showHITLPanel()` buduje HTML przez konkatenacje stringow i wstawia go przez `panel.innerHTML = '...'`. W sklad wchodzi:
  - `decision.title` -- z pre-scripted HITL_POINTS (bezpieczne)
  - `decision.description` -- z pre-scripted HITL_POINTS (bezpieczne)
  - `decision.goldSolution` -- z DEBATE_SCRIPTS (bezpieczne w domyslnej konfiguracji)
  - `opinion.text` -- z DEBATE_SCRIPTS expert opinions (bezpieczne w domyslnej konfiguracji)
  - `def.name` -- z AD_MAP agent definitions (bezpieczne)
  - `decision.keyboardHint` -- z HITL_POINTS (bezpieczne)

  **Problem:** Chociaz OBECNIE wszystkie zrodla danych sa pre-scripted (statyczne obiekty w kodzie), architektura NIE wymusza sanityzacji. Jesli w przyszlosci (v23/v24):
  - Uzytkownik bedzie mogl edytowac preset names
  - Pojawi sie import custom presets (JSON import juz istnieje w v21!)
  - Debate content bedzie generowany dynamicznie

  ...to `innerHTML` stanie sie wektorem XSS. Ponadto `userNote` z HITL modify (textarea input od usera) jest juz wstawiany do comms log message (linia 1296-1299): `'Decyzja: ' + outcome.toUpperCase() + (userNote ? ' -- "' + userNote + '"' : '')` -- jesli comms log renderuje przez innerHTML, to XSS z user input.

- **Remediacja**:
  1. Zamienic `panel.innerHTML = '...'` na budowanie DOM przez `createElement`/`textContent`
  2. LUB dodac helper `escapeHTML()`:
     ```javascript
     function escapeHTML(str) {
       const div = document.createElement('div');
       div.textContent = str;
       return div.innerHTML;
     }
     ```
     i uzywac go na KAZDYM dynamicznym stringu przed wstawieniem do innerHTML
  3. `userNote` z HITL textarea MUSI byc sanityzowany przed wstawieniem gdziekolwiek -- to jedyny AKTUALNY user input

---

#### [SEV-002] severity: HIGH
##### Narrative Templates z ${} i wyrazeniami JS w szablonach

- **Lokalizacja**: 17_BACKEND_DEV.md, sekcja 6.1 "Template System", linie 1654-1857; sekcja 6.2 "Template Parser", linie 1866-1928
- **Opis**: Dwa oddzielne problemy:

  **A) Szablony z inline JS expressions:**
  Niektore szablony w NARRATIVE_TEMPLATES zawieraja NIE template literals `${variable}`, ale realne wyrazenia JavaScript:
  ```javascript
  res_critic: {
    working: [
      '${agent} ocenia jakosc zrodel: score ${Math.floor(Math.random()*3)+7}/10...'
    ]
  }
  qa_quality: {
    working: [
      '${agent} mierzy pokrycie testami: ${Math.floor(Math.random()*15)+75}%...'
    ]
  }
  qa_manager: {
    working: [
      '${agent} ocenia gotowosc do deploy: score ${Math.floor(Math.random()*2)+8}/10...'
    ]
  }
  ```
  Parser `parseTemplate()` uzywa TYLKO regex `${(\w+)}` -- to matchuje `${agent}` ale NIE `${Math.floor(...)}`. Oznacza to, ze te szablony po prostu NIE BEDA dzialac -- `${Math.floor(Math.random()*3)+7}` zostanie NIEZMIENIONY jako literalny string w UI. To blad funkcjonalny, nie security vulnerability.

  **ALE**: Jesli developer "naprawi" to zamieniajac regex na `eval()` lub `new Function()` -- powstanie krytyczna podatnosc na code injection. Parser MUSI pozostac prosty (regex replace, zero eval).

  **B) Template parser a sanityzacja:**
  `parseTemplate()` zamienia `${variable}` na wartosc ze slownika `vars`. Wartosci pochodza z `AD_MAP.get(defId).name` itp. Jesli agent name zawieralby HTML (np. `<script>alert(1)</script>`), to po zamianie trafi do comms log. Obecnie nazwy agentow sa hardcoded i bezpieczne, ale brak sanityzacji w parserze jest architekturalna slaboscia.

- **Remediacja**:
  1. Usunac szablony z `${Math.floor(...)}` -- zamienic na statyczne wartosci lub oddzielny mechanizm losowania
  2. W `parseTemplate()` dodac `escapeHTML()` na output LUB na kazdej wartosci zmiennej
  3. Dodac komentarz `// SECURITY: NIGDY nie uzywaj eval/Function do parsowania szablonow` nad parseTemplate
  4. Upewnic sie, ze wynik `parseTemplate()` trafia do DOM przez `textContent`, NIE `innerHTML`

---

#### [SEV-003] severity: HIGH
##### Comms log renderowanie -- brak specyfikacji innerHTML vs textContent

- **Lokalizacja**: 15_FRONTEND_DEV.md, sekcja 3g "Comms Log", linie 1901-1923; 17_BACKEND_DEV.md, sekcja 6.3 "Message Queue" funkcja `renderCommsMessage()`
- **Opis**: Frontend spec definiuje strukture HTML comms row (`lm-comm-row` z `lm-comm-msg` itd.), a Backend spec definiuje `MSG_QUEUE` ktory wywoluje `renderCommsMessage(msg)`. Jednak ZADNA spec nie definiuje implementacji `renderCommsMessage()`. Brak jawnej instrukcji czy wiadomosci maja byc wstawiane przez `textContent` (bezpieczne) czy `innerHTML` (podatne na XSS).

  Dane wchodzace do comms log:
  - `msg.text` -- z narrative templates (pre-scripted, ale patrz SEV-002)
  - `msg.text` -- z `userNote` HITL (USER INPUT -- patrz SEV-001)
  - `msg.text` -- z `addDTLMsg()` v21 (mirror, pre-scripted)
  - `msg.agentDefId` -> nazwa agenta z AD_MAP (bezpieczne)

  Jedyny AKTUALNY wektor: `userNote` z HITL modify textarea wchodzi do comms log (17_BACKEND_DEV.md linia 1296). Jesli `renderCommsMessage` uzyje innerHTML na `msg.text` -- XSS z user-controlled input.

- **Remediacja**:
  1. Dodac EXPLICYTNA instrukcje w Gold Solution #2: "renderCommsMessage() MUSI uzywac textContent na msg.text, NIGDY innerHTML"
  2. Definicja `renderCommsMessage()` powinna byc w specyfikacji (jest missing piece)
  3. Alternatywnie: sanityzacja `userNote` w `recordHITLDecision()` PRZED wstawieniem do comms message

---

#### [SEV-004] severity: MEDIUM
##### localStorage -- brak walidacji typow po JSON.parse

- **Lokalizacja**: 17_BACKEND_DEV.md, sekcja 7.2 "What to Persist", linie 2057-2174
- **Opis**: Funkcja `loadLMSettings()` (linia 2111-2127) parsuje JSON z localStorage i robi CZESCIOWA walidacje:
  ```javascript
  autonomy: data.autonomy || 'act-confirm',
  autoApproveTimer: typeof data.autoApproveTimer === 'number' ? data.autoApproveTimer : 0,
  reducedMotion: !!data.reducedMotion,
  ```
  **Problemy:**
  - `data.autonomy` -- nie sprawdza czy wartosc jest jednym z dozwolonych enum (`'full-control'|'act-confirm'|'full-auto'`). Malicious value np. `'<script>alert(1)</script>'` przejdzie i jesli kiedykolwiek bedzie renderowane...
  - `data.autoApproveTimer` -- sprawdza `typeof === 'number'` ale NIE sprawdza zakresu. `Infinity`, `NaN`, ujemne wartosci, `Number.MAX_SAFE_INTEGER` -- wszystkie przejda. `Infinity` jako timer timeout spowoduje ze `setInterval` nigdy nie zakonczy, a `NaN` moze spowodowac bledy w porownaniach.
  - `loadLMStats()` (linia 2166-2174) -- ZERO walidacji. `JSON.parse()` zwraca dowolny obiekt i jest uzywany bezposrednio.

  **Wektor ataku:** Self-XSS / DoS. Ktos z dostepem do DevTools (lub skrypt bookmarklet) moze wpisac malicious JSON do localStorage. W kontekscie client-side only app, to jest atak na SIEBIE SAMEGO -- nie na innych uzytkownikow. Severity MEDIUM bo nie ma remote attack vector, ale corrupted data moze crashowac aplikacje.

- **Remediacja**:
  1. Walidowac `autonomy` przeciwko whitelistowi: `['full-control','act-confirm','full-auto'].includes(data.autonomy) ? data.autonomy : 'act-confirm'`
  2. Walidowac zakres `autoApproveTimer`: `Number.isFinite(data.autoApproveTimer) && data.autoApproveTimer >= 0 && data.autoApproveTimer <= 300 ? data.autoApproveTimer : 0`
  3. Dodac schema validation do `loadLMStats()` -- sprawdzac typy kazdego pola
  4. OGOLNA ZASADA: kazdy `JSON.parse()` z localStorage powinien przechodzic przez validator

---

#### [SEV-005] severity: MEDIUM
##### Session events array -- brak hard limitu w Gold Solution #2

- **Lokalizacja**: 24_GOLD_SOLUTION_2.md, linia 601-606 (lmLogEvent); 17_BACKEND_DEV.md, linia 623 (sessionEvents.push)
- **Opis**: Dwie rozbiezne specyfikacje limitu:
  - Gold Solution #2: `LM.events` max 2000 (lmLogEvent z shift)
  - Backend Dev: `LM_STATE.sessionEvents` max 5000 (`if (length < 5000)`)
  - Gold Solution #2 Data Model: `events: []` z komentarzem "append-only, max 2000"

  **Problem:** Backend Dev Event Bus `dispatch()` takze loguje do sessionEvents (linia 622-629) BEZ limitu shift -- uzywa `if (length < 5000)` co oznacza ze po 5000 eventach PRZESTAJE logowac (silent data loss). Gold Solution uzywa ring buffer (`shift()` + `push()`).

  Przy 27 agentach, 6 fazach, ~200+ comms messages, plus state changes -- sesja moze latwo generowac 1000+ eventow. 5000 eventow * ~100 bytes = ~500KB w pamieci -- nie krytyczne, ale niepotrzebne.

  Wazniejsze: Gold Solution #2 jest "jedynym zrodlem prawdy" i mowi 2000 z ring buffer. Backend Dev mowi 5000 bez ring buffer. Ta rozbieznosc moze prowadzic do blednej implementacji.

- **Remediacja**:
  1. Trzymac sie Gold Solution #2: max 2000, ring buffer (shift + push)
  2. Odrzucic Backend Dev wariant 5000 bez rotation -- to jest ARCHIWALNE i nadpisane przez GS#2
  3. Implementowac dokladnie:
     ```javascript
     function lmLogEvent(type, data) {
       if (LM.events.length >= 2000) LM.events.shift();
       LM.events.push({ ts: performance.now() - LM.startTime, type, data });
     }
     ```

---

#### [SEV-006] severity: MEDIUM
##### Comms log DOM purge -- spec mowi "display: none" zamiast usuwania

- **Lokalizacja**: 15_FRONTEND_DEV.md, sekcja 3g "Comms Log", linia 1911: "Max rows: Soft limit 200 widocznych, starsze display: none (nie usuwaj DOM -- potrzebne do ewentualnego replay)"
  24_GOLD_SOLUTION_2.md, linia 137: "Comms log DOM purge (>200 rows) DODAC +5 LOC"
- **Opis**: Frontend Dev mowi: `display: none` na starych rows (zachowaj DOM). Gold Solution #2 mowi: "DOM purge >200 rows". To sa SPRZECZNE instrukcje.

  **Problem bezpieczenstwa:** Jesli `display: none` bez usuwania DOM:
  - Przy dlugiej sesji (30+ min, 27 agentow) comms log moze zbierac 500-1000+ DOM nodow
  - Kazdy `display: none` node nadal jest w DOM tree i zuzuwa pamiec
  - MutationObserver i querySelectorAll nadal widza te nody
  - Memory leak: DOM nodes nie sa GC-collected dopoki nie zostana usunniete z drzewa

  Gold Solution #2 slusznie mowi "purge" -- to jest USUWANIE z DOM, nie ukrywanie.

- **Remediacja**:
  1. Implementowac jako USUWANIE z DOM (removeChild/remove) po przekroczeniu 200 widocznych rows
  2. Dane zachowywac WYLACZNIE w `LM.commsMessages[]` array (nie w DOM)
  3. Jesli replay potrzebny -- budowac z array, nie z ukrytych DOM nodow
  4. Implementacja:
     ```javascript
     function purgeCommsLog() {
       const rows = lmCommsScroll.querySelectorAll('.lm-comm-row');
       if (rows.length > 200) {
         const toRemove = rows.length - 200;
         for (let i = 0; i < toRemove; i++) rows[i].remove();
       }
     }
     ```

---

#### [SEV-007] severity: MEDIUM
##### Monkey-patching window.simStep / window.simStop -- brak restore guarantee

- **Lokalizacja**: 17_BACKEND_DEV.md, sekcja 3.1 "Strategia: Wrapper + Hook Pattern", linie 826-940
  15_FRONTEND_DEV.md, sekcja 6.3 "Monkey-patching simStep()", linie 2170-2210
- **Opis**: Backend Dev spec nadpisuje `window.simStep` i `window.simStop` nowymi wersjami. Frontend Dev spec nadpisuje `addDTLMsg` i dodaje MutationObserver.

  **Problemy:**
  1. **Race condition:** Jesli user szybko otwiera/zamyka monitor wielokrotnie, `origSimStep` moze byc nadpisany juz-wrapped wersja (double-wrapping). Backend Dev zachowuje `origSimStep` w closure przy pierwszym `hookSimulation()` -- ALE to jest wewnatrz `lmInit()` ktore ma guard `if (LM_STATE.monitorLoaded) return`. Frontend Dev spec robi monkey-patch w `openLiveMonitor()` -- BEZ guardu! Kazde otwarcie monitora nadpisze `addDTLMsg` PONOWNIE, co oznacza ze `_origAddDTL` wskazuje na juz-wrapped version.

  2. **Brak restore przy crashu:** Jesli `openLiveMonitor()` rzuci wyjatek PO nadpisaniu `simStep` ale PRZED ustawieniem stanu -- `simStep` zostaje zmodyfikowany bez mozliwosci powrotu. Frontend spec `closeLiveMonitor()` (linia 2279-2298) przywraca `addDTLMsg = _origAddDTL`, ale co jesli close nigdy nie zostalo wywolane (crash)?

  3. **MutationObserver disconnect:** Frontend spec tworzy observer w `openLiveMonitor()` i disconnectuje w `closeLiveMonitor()`. Jesli `closeLiveMonitor()` nie zostanie wywolane -- observer zostaje aktywny na zawsze, obserwujac mutacje i odpalajac handlery na nieistniejacych elementach.

- **Remediacja**:
  1. Hook simulation TYLKO w `lmInit()` (raz, z guardem `monitorLoaded`), NIE w `openLiveMonitor()`
  2. Przywracanie oryginalnych funkcji w `finally` block lub globalnym error handler
  3. Sprawdzac `if (addDTLMsg !== _origAddDTL)` przed nadpisaniem -- zapobiec double-wrap
  4. MutationObserver: track w zmiennej i sprawdzac `if (lmObserver)` przed ponownym tworzeniem

---

#### [SEV-008] severity: MEDIUM
##### Event Bus z Backend Dev -- wyrzucony w GS#2 ale code patterns go referencuja

- **Lokalizacja**: 17_BACKEND_DEV.md, sekcja 2.1 "Event Bus", linie 567-639; 24_GOLD_SOLUTION_2.md, sekcja D "Over-Engineering Items"
- **Opis**: Gold Solution #2 EXPLICITE wyrzuca Event Bus z wildcard (`lmBus`) i zastepuje go direct function calls + CustomEvents bridge. JEDNAK Backend Dev spec (ktora jest archiwalna, nie instrukcja) zawiera pelna implementacje `lmBus` ORAZ korzysta z niej w wielu miejscach: `lmBus.dispatch()` pojawia sie w hookSimulation, pauseForHITL, recordHITLDecision, MSG_QUEUE listener, itp.

  **Ryzyko:** Developer ktory czyta Backend Dev spec (zamiast GS#2) moze zaimplementowac Event Bus, ktory Gold Solution #2 wyrzucila z powodu:
  - Wildcard matching = potencjalne niezamierzone handler invocations
  - `_listeners` object rosnacy bez limitu
  - `lmBus.clear()` wola `.clear()` na Set ale NIE czytelnie sygnalizuje ze handlery sa unreachable
  - Session events push w `dispatch()` bez limitu (5000 cap, ale brak rotation)

  Nie jest to podatnosc OBECNA, ale architekturalne ryzyko implementacyjne.

- **Remediacja**:
  1. Gold Solution #2 jest jedynym zrodlem prawdy -- Backend Dev `lmBus` jest ODRZUCONY
  2. W implementacji NIE tworzyc `lmBus` -- uzywac direct function calls
  3. CustomEvents TYLKO na bridge v22 <-> monitor (5 eventow: lm-sim-start, lm-sim-stop, lm-phase-change, lm-agent-msg, lm-agent-state)
  4. Dodac komentarz w kodzie: `// ARCH: Zero internal event bus. Direct calls. See GS#2 sekcja D.`

---

#### [SEV-009] severity: LOW
##### Keyboard shortcuts -- konflikt Space z textarea focus

- **Lokalizacja**: 15_FRONTEND_DEV.md, sekcja 4.3 "Shortcuts", linia 2043; 24_GOLD_SOLUTION_2.md, sekcja HITL keyboard
- **Opis**: Space jest przypisany do "Pauza/resume symulacji" (linia 2043: `if (k === ' ') { togglePause(); e.preventDefault(); return; }`).

  Frontend spec HITL panel zawiera `<textarea class="lm-hitl-note">` (linia 449) do wpisywania notatki przy "Modify". Jesli user pisze w textarea i nacisnie Space -- Space jest przechwycony PRZED dotarciem do textarea (bo handler jest na `lmOverlay` wyzej w DOM).

  Spec probuje to obejsc: keyboard handler sprawdza `if (!lmHitl.hidden)` i blokuje inne shortcuts gdy HITL otwarty (linia 2032). ALE: Space NIE jest w bloku HITL -- jest w bloku "Monitor-level shortcuts" PONIZEJ, ktory odpali sie nawet gdy HITL jest otwarty (bo `return` w bloku HITL odpala sie TYLKO dla klawiszy A/D/R).

  Wlasciwie -- patrze jeszcze raz na frontend spec linia 2031-2033:
  ```javascript
  if (k === 'r') { lmHitlReject.click(); e.preventDefault(); return; }
  return; // Block inne shortcuts gdy HITL otwarty
  ```
  Jest `return;` na koncu bloku HITL -- wiec Space JEST zablokowany gdy HITL otwarty. **Ale**: jesli user zamknie HITL panel i textarea jest nadal focusowana (lub inna sytuacja edge-case)... W praktyce to jest zabezpieczone.

  **Realny problem:** Select dropdown `#lmCommsFilter`. Jesli user fokusuje `<select>` i naciska Space -- przeglądarka domyslnie otwiera select. ALE handler `e.preventDefault()` na Space spowoduje ze select NIE otworzy sie. Trzeba sprawdzac `document.activeElement`.

- **Remediacja**:
  1. W handler Space: `if (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'SELECT' || document.activeElement.tagName === 'INPUT') return;`
  2. Ogolna zasada: keyboard shortcuts NIE powinny `preventDefault()` gdy focus jest w form control

---

#### [SEV-010] severity: LOW
##### AnimationManager -- brak specyfikacji czyszczenia tasks przy zamknieciu

- **Lokalizacja**: 24_GOLD_SOLUTION_2.md, sekcja I3 "AnimationManager singleton", linia 188-189
- **Opis**: Gold Solution specyfikuje AnimationManager z `register/unregister/pause/resume` i 3 priorities. Spec mowi ze migruje 4 istniejace rAF (starfield, particles, simStep, missionControl) na AnimMgr.

  **Problem:** Brak explicytnej specyfikacji co sie dzieje z zarejestrowanymi tasks gdy:
  - Monitor jest zamykany (lmClose) -- czy tasks sa unregistered?
  - Preset zmienia sie (preset change detection) -- czy stare tasks sa czyszczone?
  - Tab staje sie niewidoczny -- pause jest specyfikowany, ale co z queued registrations?

  **Ryzyko:** Memory leak. Jesli tasks nie sa unregistered przy zamknieciu monitora, rAF callbacks beda dzialac w tle (choc visibilitychange powinien pauzowac). Przy wielokrotnym otwieraniu/zamykaniu -- tasks moga sie kumulowac.

- **Remediacja**:
  1. Dodac `AnimMgr.unregisterAll(tag)` -- czysci wszystkie tasks z danym tagiem (np. 'monitor')
  2. W `lmClose()` wywolac `AnimMgr.unregisterAll('monitor')` -- czysci TYLKO monitor tasks, nie starfield/particles
  3. Albo: `AnimMgr.unregister()` per task w lmClose()

---

#### [SEV-011] severity: LOW
##### JSON import z v21 -- potencjalny wektor przy ladowaniu custom konfiguracji

- **Lokalizacja**: Istniejacy v21 codebase (referencja: 15_FRONTEND_DEV.md sekcja 6.1 mowi o v21 functions: `nodes`, `conns`, `AD_MAP`)
- **Opis**: V21 ma funkcje importu JSON konfiguracji (load/save presets, localStorage `acV21`). Te JSON mogą zawierac dowolne dane -- agent names, descriptions, node IDs.

  **Problem:** Live Monitor uzywa danych z `AD_MAP`, `nodes`, `conns` -- ktore moga pochodzic z zaimportowanego JSON. Jesli zaimportowany JSON zawiera malicious agent name (np. `"<img src=x onerror=alert(1)>"`) i Live Monitor renderuje nazwy agentow przez innerHTML -- XSS.

  To nie jest nowa podatnosc wprowadzona przez Live Monitor, ale Live Monitor POWIEKSZA surface area bo dodaje wiecej miejsc renderowania agent names (agent cards, comms log, HITL panel, debate arena).

  **Lagodzace czynniki:**
  - V21 import prawdopodobnie tez uzywa innerHTML w obecnym rendererze
  - Zaimportowane dane przechowywane w tej samej sesji/przegladarce (self-XSS)
  - Brak remote sharing konfiguracji

- **Remediacja**:
  1. Sanityzowac agent names i inne user-controlled strings PRZY IMPORCIE (w v21 import logic)
  2. Lub: sanityzowac PRZY RENDEROWANIU (kazdorazowo) -- defense in depth
  3. Live Monitor powinien uzywac `textContent` wszedzie gdzie wyswietla nazwy

---

#### [SEV-012] severity: LOW
##### Proxy reactive wrapper -- wyrzucony ale Backend Dev spec go zawiera

- **Lokalizacja**: 17_BACKEND_DEV.md, sekcja 1.7 "Reactive Proxy Wrapper", linie 488-556
- **Opis**: Backend Dev specyfikuje `createReactiveState()` z Proxy wrapper. Gold Solution #2 EXPLICITE wyrzuca Proxy ("BRAK Proxy. BRAK Event Bus. Zwykly obiekt + explicit render.").

  **Problemy bezpieczenstwa Proxy (gdyby zostal zaimplementowany):**
  - Proxy `set` handler dispatchuje do `lmBus` (ktory tez jest wyrzucony) przy KAZDEJ zmianie -- potencjalny performance issue
  - Deep Proxy: `get` handler tworzy nowe Proxy na zagniezdzone obiekty. To moze tworzyc cykliczne referencje lub memory leaks (szczegolnie z Set/Map ktore sa "niewidoczne" dla Proxy -- sygnal Cienia w FM2)
  - `__proxied` flag: mutuje oryginalny obiekt w getter (side effect w getter -- antypattern)

  **Ryzyko:** Czysto architekturalne. Proxy jest ODRZUCONY. Ale jesli developer zignoruje GS#2 i zaimplementuje Backend Dev spec -- dostanie te problemy.

- **Remediacja**:
  1. NIE implementowac Proxy. Gold Solution #2 jest jedynym zrodlem prawdy.
  2. Uzyc explicit `lmRender()` / `lmRenderPartial()` po kazdej zmianie stanu
  3. Dodac komentarz: `// ARCH: BRAK Proxy. Explicit render. See GS#2 sekcja D.`

---

### Rekomendacje Ogolne

#### R1: Ustanowic regule renderowania DOM

Dodac do specyfikacji EXPLICYTNA sekcje:

```
SECURITY RULE: DOM Rendering
- Dane PRE-SCRIPTED (NARRATIVE_TEMPLATES, DEBATE_SCRIPTS, HITL_POINTS, AD stale):
  Mozna uzywac innerHTML WYLACZNIE jesli dane sa w 100% kontrolowane i statyczne.
- Dane USER-CONTROLLED (userNote z textarea, import JSON, localStorage):
  OBOWIAZKOWE textContent LUB escapeHTML() przed innerHTML.
- Dane COMPUTED (agent names, phase labels z AD_MAP):
  Bezpieczne TERAZ, ale uzywac textContent jako defense-in-depth.
```

#### R2: Dodac escapeHTML helper

```javascript
function escapeHTML(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}
```

~3 LOC. Uzywac WSZEDZIE gdzie dynamiczny string trafia do innerHTML. Zero performance impact.

#### R3: Walidowac WSZYSTKIE dane z localStorage

```javascript
function validateEnum(value, allowed, defaultVal) {
  return allowed.includes(value) ? value : defaultVal;
}
function validateRange(value, min, max, defaultVal) {
  return Number.isFinite(value) && value >= min && value <= max ? value : defaultVal;
}
```

#### R4: Zdefiniowac renderCommsMessage()

Brakujaca funkcja. Musi byc zdefiniowana w specyfikacji z jawna instrukcja uzywania textContent na msg.text.

#### R5: Memory leak prevention checklist

Dodac do Implementation Roadmap:
- [ ] AnimMgr unregister tasks przy lmClose()
- [ ] MutationObserver disconnect przy lmClose()
- [ ] clearTimeout/clearInterval WSZYSTKICH timerow
- [ ] MSG_QUEUE.clear() przy lmClose()
- [ ] DOM purge comms log (remove, nie display:none)
- [ ] Zresetowac `_narrativeHistory` przy nowej sesji

#### R6: Zero third-party dependencies -- POTWIERDZONE

Specyfikacja NIE wymaga zadnych zewnetrznych CDN, bibliotek, fontow (poza Google Fonts juz obecnych w v21). Wszystko jest inline. To jest POPRAWNE i bezpieczne. **Zachowac te zasade.**

#### R7: Brak danych wrazliwych -- POTWIERDZONE

Aplikacja:
- NIE przechowuje credentiali, tokenow, hasel
- NIE wykonuje zadnych network requests
- NIE laczy sie z API
- localStorage zawiera TYLKO preferencje UI i statystyki sesji (~800 bytes)
- Zero PII (Personally Identifiable Information)
- Jedyny "user input" to textarea w HITL modify -- opcjonalna notatka

**Brak ryzyka data exposure.**

---

### Verdict: PASS WITH CONDITIONS

**Warunki:**
1. **[MUST]** `userNote` z HITL textarea musi byc sanityzowany przed wstawieniem do DOM (SEV-001, SEV-003)
2. **[MUST]** Zdefiniowac `renderCommsMessage()` z uzyciem textContent na msg.text (SEV-003)
3. **[MUST]** Usunac szablony z `${Math.floor(...)}` -- zamienic na proste statyczne stringi (SEV-002)
4. **[SHOULD]** Dodac `escapeHTML()` helper i uzywac go w showHITLPanel (SEV-001)
5. **[SHOULD]** Walidowac localStorage values z enum whitelist i zakresami (SEV-004)
6. **[SHOULD]** DOM purge = remove (nie display:none) w comms log (SEV-006)
7. **[MAY]** Guard przed double-wrapping w monkey-patch (SEV-007)

**Uzasadnienie:** Profil ryzyka aplikacji jest NISKI -- dziala lokalnie, zero backendu, zero user auth, zero danych wrazliwych. Znalezione podatnosci sa glownie self-XSS (atak na siebie samego) i resource management. Zadna z nich nie umozliwia remote code execution, data theft czy privilege escalation. Trzy warunki MUST sa latwe do spelnienia (~15 LOC lacznie) i eliminuja jedyny realny user input vector (HITL textarea).

---

*Raport przygotowany przez QA Security [OPUS] -- audyt specyfikacji Live Monitor Mode v22.*
*Audytowane dokumenty: 24_GOLD_SOLUTION_2.md, 17_BACKEND_DEV.md, 15_FRONTEND_DEV.md*
