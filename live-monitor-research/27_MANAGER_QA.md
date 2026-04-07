# Manager QA -- Finalne GO/NO-GO
## Live Monitor Mode v22

**Rola:** Manager QA [OPUS] -- finalna brama jakosci
**Data:** 2026-04-04
**Zrodla audytu:**
- `25_QA_SECURITY.md` -- 12 findings (0 CRITICAL, 3 HIGH, 5 MEDIUM, 4 LOW)
- `26_QA_QUALITY.md` -- 30 findings (3 CRITICAL, 8 HIGH, 12 MEDIUM, 7 LOW)
- `24_GOLD_SOLUTION_2.md` -- finalna specyfikacja implementacyjna

---

### Executive Summary

Gold Solution #2 jest solidnym dokumentem specyfikacyjnym, ktory rozstrzyga 24/26 warunkow z Five Minds Debate #2, unifikuje Data Model, HTML, CSS i Event List, i dostarcza realistyczny LOC budzet (1500 netto, max 4500). Oba raporty QA zakonczyly sie verdiktem **PASS WITH CONDITIONS**.

Laczna analiza 42 unikalnych findings (po deduplicacji cross-references) ujawnia **3 CRITICAL**, **9 HIGH**, **14 MEDIUM** i **9 LOW** issues. Zadne nie sa showstopperami uniemozliwiajacymi implementacje -- wszystkie CRITICAL i HIGH sa naprawialne jako doc fixes lub minimalne code guards (lacznie ~30 LOC dodatkowego kodu).

**Profil ryzyka: NISKI.** Aplikacja dziala wylacznie client-side, zero backendu, zero autentykacji, zero danych wrazliwych. Glowne ryzyka to: (1) niespojnosc specyfikacji miedzy GS#2 a BUILD specs, (2) brak kompletnego CSS w GS#2, (3) kilka niezdefiniowanych edge cases.

**DECYZJA: GO WITH CONDITIONS** -- 11 warunkow, z czego 3 PRZED implementacja (doc fixes), 5 PODCZAS implementacji (code guards), 3 PO pierwszej wersji (polish).

---

### Zbiorczy Raport Findings

#### Legenda zrodel
- **SEC** = QA Security (`25_QA_SECURITY.md`)
- **QUA** = QA Quality (`26_QA_QUALITY.md`)
- **CROSS** = finding referowany w obu raportach

---

#### CRITICAL (3)

| # | ID | Zrodlo | Kategoria | Opis | Impact |
|---|-----|--------|-----------|------|--------|
| 1 | QUA-001 | QUA | consistency | Agent state `hitl` vs `waiting-for-human` mismatch -- GS#2 decyduje `hitl`, Designer CSS nadal uzywa `waiting-for-human` we WSZYSTKICH selektorach. Developer dostanie broken HITL styles. | Styl HITL agentow NIE ZADZIALA bez korekty CSS selektorow |
| 2 | QUA-002 | QUA | completeness | GS#2 NIE jest samowystarczalny pod wzgledem CSS -- mowi "nie czytaj BUILD specs" ale nie zawiera CSS komponentow (topbar layout, comms panel, agent grid, timeline, HITL panel, Debate Arena). Developer MUSI siegac po Designera. | Developer nie moze zakodowac layoutu z samego GS#2 |
| 3 | QUA-003 | QUA | edge-case | HITL deadlock -- brak timeout/mechanizmu wyjscia. User moze zostawic tab z pending HITL na zawsze. Symulacja stoi w limbo. Brak `visibilitychange` handlera, brak auto-approve po nieaktywnosci. | Symulacja moze utknac na zawsze bez akcji usera |

---

#### HIGH (9)

| # | ID | Zrodlo | Kategoria | Opis | Impact |
|---|-----|--------|-----------|------|--------|
| 4 | SEV-001 | SEC | security | `showHITLPanel()` buduje HTML przez innerHTML z niesanityzowanymi danymi. `userNote` z textarea (jedyny aktualny user input) trafia do comms log -- wektor self-XSS. | XSS z user-controlled input w HITL textarea |
| 5 | SEV-002 | SEC | security | Narrative Templates zawieraja `${Math.floor(...)}` -- parser regex NIE obsluguje JS expressions. Szablony nie beda dzialac. Ryzyko: developer moze "naprawic" uzywajac eval(). | Broken templates + ryzyko eval() code injection |
| 6 | SEV-003 | SEC | security | `renderCommsMessage()` -- brakujaca funkcja. Brak specyfikacji czy msg.text trafia przez innerHTML vs textContent. `userNote` z HITL moze trafic do comms log przez innerHTML. | Brak definicji krytycznej funkcji renderujacej |
| 7 | QUA-004 | QUA | consistency | Agent card height: 3 rozne wartosci (90, 92, 96px). GS#2 ustala 92px ale nie koryguje Designera (96px w ASCII, 92px w CSS). | Wizualne niespojnosci kart agentow |
| 8 | QUA-005 | QUA | completeness | `lmRender()` / `lmRenderPartial(section)` -- wymienione w Data Model ale NIGDZIE niezdefiniowane. Brak sygnatury, pseudo-kodu, listy `section` parametrow. | Developer nie wie jak implementowac render |
| 9 | QUA-006 | QUA | edge-case | Pusty canvas (0 agentow) + otwarcie monitora -- brak guard clause. `lmBuildGrid()` buduje pusty grid, timeline pusta, HUD "0/0". | Monitor otwiera sie w stanie bezsensownym |
| 10 | QUA-008 | QUA | performance | `lmBuildGrid()` rebuilds CALY DOM przy kazdej zmianie fazy zamiast inkrementalnego update. Utrata focus state, FOUC na 300ms card-reveal. | Performance issue + UX flicker co faze |
| 11 | QUA-010 | QUA | consistency | Speed control (0.5x/1x/2x/4x) -- button istnieje w HTML ale brak `LM.speed` w state, brak `lmSetSpeed()`, brak wplywu na `simTimer`. Ghost feature. | UI element bez logiki implementacji |
| 12 | QUA-011 | QUA | edge-case | Re-debate edge cases niezdefiniowane: reset statusow agentow, `completedPhases` cleanup, comms log po re-debate, brak limitu re-debat (infinite loop). | Potencjalny infinite loop + corrupted state |

---

#### MEDIUM (14)

| # | ID | Zrodlo | Kategoria | Opis |
|---|-----|--------|-----------|------|
| 13 | SEV-004 | SEC | security | localStorage -- brak walidacji enum `autonomy`, brak zakresu `autoApproveTimer` (Infinity/NaN przejda), zero walidacji `loadLMStats()` |
| 14 | SEV-005 | SEC/QUA CROSS | consistency | Session events limit: GS#2 mowi 2000 ring buffer, Backend Dev mowi 5000 bez rotation. Rozbieznosc |
| 15 | SEV-006 | SEC/QUA CROSS | performance | Comms log: GS#2 mowi "DOM purge", Frontend Dev mowi "display: none". Sprzeczne instrukcje. Memory leak z display:none |
| 16 | SEV-007 | SEC | security | Monkey-patching simStep/addDTLMsg -- double-wrap risk, brak restore przy crashu, MutationObserver bez disconnect |
| 17 | SEV-008 | SEC | architecture | Event Bus z Backend Dev -- wyrzucony w GS#2 ale code patterns go referencuja. Developer moze zaimplementowac odrzucony pattern |
| 18 | QUA-007 | QUA | edge-case | Zmiana presetu PODCZAS otwartego monitora -- brak event listenera, grid pokaze starych agentow |
| 19 | QUA-009 | QUA | completeness | AnimationManager -- brak pseudo-kodu API, brak sygnatury register/unregister, brak degradation logic |
| 20 | QUA-012 | QUA | consistency | Dwa rozne HTML templates (GS#2 z ARIA vs Integrator uproszczony). Developer moze wziac zly template |
| 21 | QUA-013 | QUA | performance | 17 animacji jednoczesnie -- `lm-breathe` na 20 idle agentach = 20 infinite CSS animations |
| 22 | QUA-015 | QUA | a11y | HITL panel: `role="alertdialog"` bez `aria-describedby`. Screen reader nie czyta pytania |
| 23 | QUA-016 | QUA | a11y | Comms log `aria-live="polite"` na calym panelu -- screen reader storm co 2-3s |
| 24 | QUA-017 | QUA | a11y | Debate Arena: `role="region"` zamiast `role="dialog"` + brak focus trap |
| 25 | QUA-020 | QUA | consistency | Debate Arena z-index: 3 rozne wartosci (330/340/360) w 3 dokumentach |
| 26 | QUA-023 | QUA | performance | Reduced-motion blanket uzywa `*` selector z `!important` -- lamie hover transitions na przyciskach |

---

#### LOW (9)

| # | ID | Zrodlo | Kategoria | Opis |
|---|-----|--------|-----------|------|
| 27 | SEV-009 | SEC | edge-case | Space shortcut konflikt z select/textarea focus |
| 28 | SEV-010 | SEC | architecture | AnimationManager -- brak specyfikacji czyszczenia tasks przy zamknieciu |
| 29 | SEV-011 | SEC | security | JSON import z v21 -- malicious agent names moglyby byc XSS w nowych rendererach monitora |
| 30 | SEV-012 | SEC | architecture | Proxy wrapper -- odrzucony ale Backend Dev spec go zawiera. Ryzyko implementacyjne |
| 31 | QUA-014 | QUA | edge-case | 1 agent na canvasie -- monitor technicznie dziala ale UX bezsensowny |
| 32 | QUA-019 | QUA | completeness | Narrative Templates -- brak ani jednego przykladu szablonu, brak struktury obiektu |
| 33 | QUA-028 | QUA | completeness | Always-on agents (Orchestrator/Synthesizer) -- brak specyfikacji wizualizacji w monitorze |
| 34 | QUA-032 | QUA | consistency | LOC sumy nie zgadzaja sie: Phase 2 kroки sumuja do 531 vs 496 w budgecie (delta 35 LOC) |
| 35 | QUA-034 | QUA | code-smell | `LM_HITL_MAP` hardcoduje 'debate1' ale PHASES moze uzywac 'five_minds_1'. Key mismatch = HITL never triggered |

**Dodatkowe LOW z QUA (nie wchodzace w tabele ponizej -- informacyjne):**
- QUA-018: comms messages array bez cap
- QUA-021: brak explicite decyzji o polaczeniach w monitorze
- QUA-022: comms filter -- select vs pills niezdefiniowane
- QUA-024: auto-start sim przy otwarciu -- moze byc niechciany
- QUA-025: LM obiekt 20+ properties bez enkapsulacji
- QUA-026: keyboard handler blokuje Ctrl+C/V/Z/W
- QUA-027: brak focus management po phase change
- QUA-029: STOP button bez aria-keyshortcuts
- QUA-030: Decision Celebration Burst bez specyfikacji wizualnej
- QUA-031: Summary panel bez layoutu
- QUA-033: setInterval timer drift przy niewidocznym tabie
- QUA-035: brak lang="pl" na overlay
- QUA-036: 50+ agentow -- stagger animation 2500ms
- QUA-037: Array.shift() O(n) na 2000 elementach

---

### Fix Order

#### PRZED implementacja (doc fixes -- 0 LOC kodu, poprawki w specyfikacji)

Te zmiany musza byc naniesione na `24_GOLD_SOLUTION_2.md` PRZED rozpoczeciem kodowania. Sa to wylacznie uzupelnienia/korekty tekstowe.

| # | Finding | Fix | Priorytet |
|---|---------|-----|-----------|
| 1 | **QUA-001** CSS selector mismatch `hitl` vs `waiting-for-human` | Dodac note w GS#2: "CSS z 14_DESIGNER.md: zamien `waiting-for-human` na `hitl` we WSZYSTKICH selektorach. Dotyczy: `.lm-agent[data-state="waiting-for-human"]` i `::before`." | CRITICAL |
| 2 | **QUA-002** Brak CSS komponentow w GS#2 | Dodac akapit: "CSS komponentow: 14_DESIGNER.md sekcje 3.1-3.7 z korektami: (a) `waiting-for-human` -> `hitl`, (b) z-index debate 340 nie 360, (c) card height 92px nie 96px. Reszta Designer CSS bez zmian." | CRITICAL |
| 3 | **QUA-005** `lmRender()` / `lmRenderPartial()` niezdefiniowane | Dodac definicje: `lmRender() = lmBuildGrid() + lmUpdateTimeline() + lmUpdateHUD()`. `lmRenderPartial('grid'|'timeline'|'hud'|'comms')` wola odpowiednia funkcje. | HIGH |
| 4 | **QUA-009** AnimationManager brak API pseudo-kodu | Dodac minimalny pseudo-kod: `AnimMgr = { tasks: Map, register(id, fn, priority), unregister(id), pause(), resume(), _loop(ts) }` | HIGH |
| 5 | **QUA-010** Speed control -- ghost feature | Dodac explicite: "Speed control = WON'T v22. Usunac przycisk z HTML. v22.1 SHOULD." LUB dodac `LM.speed` + `lmSetSpeed()` (~15 LOC). Rekomendacja: WYRZUCIC z v22 -- minimalny koszt. | HIGH |
| 6 | **QUA-012** Dwa HTML templates | Dodac bold note przy HTML: "UZYJ TEGO HTML (GS#2), NIE wersji z 18_INTEGRATOR.md." | MEDIUM |
| 7 | **QUA-020** z-index conflicts | Dodac jednorazowa z-index mape: overlay 300, comms 305, HUD 310, debate 340, HITL 350, toast 999. | MEDIUM |

---

#### PODCZAS implementacji (code guards -- ~30 LOC lacznie)

| # | Finding | Code Guard | LOC | Kiedy |
|---|---------|-----------|-----|-------|
| 1 | **QUA-003** HITL deadlock | `visibilitychange` handler: jesli tab niewidoczny z `hitlPending`, auto-approve po 60s | +5 | Phase 2 (HITL) |
| 2 | **SEV-001 + SEV-003** innerHTML XSS | Dodac `escapeHTML()` helper (3 LOC). Sanityzowac `userNote`. Zdefiniowac `renderCommsMessage()` z textContent | +8 | Phase 2 (comms) |
| 3 | **SEV-002** Broken ${Math.floor} templates | Zamienic na statyczne stringi lub oddzielny mechanizm losowania | +0 | Phase 2 (narrative) |
| 4 | **QUA-006** Pusty canvas guard | `if (!nodes.length) { showToast('Dodaj agentow!'); return; }` w `lmOpen()` | +1 | Phase 1 (lifecycle) |
| 5 | **QUA-011** Re-debate limits | Max 3 re-debates per HITL. Reset `completedPhases` i statusow agentow. Separator w comms log | +5 | Phase 2 (HITL) |
| 6 | **SEV-004** localStorage validation | Enum whitelist na `autonomy`, zakres na `autoApproveTimer`, schema na `loadLMStats()` | +6 | Phase 1 (init) |
| 7 | **SEV-007** Monkey-patch guard | Sprawdzac `if (addDTLMsg !== _origAddDTL)` przed nadpisaniem. `try/finally` na restore | +5 | Phase 1 (hooks) |
| 8 | **QUA-026** Keyboard handler modifier keys | `if (e.ctrlKey || e.altKey || e.metaKey) return;` w keydown handler | +1 | Phase 1 (keyboard) |

**Lacznie: ~31 LOC -- w ramach istniejacego budzetu (bufor 496 LOC)**

---

#### PO pierwszej wersji (polish -- v22.0 -> v22.1)

| # | Finding | Polish | Priorytet |
|---|---------|--------|-----------|
| 1 | **QUA-008** lmBuildGrid rebuild vs update | Refaktor na inkrementalny update (przesuwanie kart miedzy containers, nie rebuild DOM) | HIGH |
| 2 | **QUA-013** 17 concurrent animations | Ograniczyc `lm-breathe` TYLKO do aktywnej fazy. Idle agents = static opacity 0.5 | MEDIUM |
| 3 | **QUA-015** aria-describedby na HITL | Dodac `aria-describedby="lmHitlBody"` | MEDIUM |
| 4 | **QUA-016** aria-live storm | Przeniesc `aria-live` z panelu na dedykowany `<div class="sr-only">` -- oglosza TYLKO zmiane fazy i HITL | MEDIUM |
| 5 | **QUA-017** Debate Arena role="dialog" | Zmienic `role="region"` na `role="dialog" aria-modal="true"` + focus trap | MEDIUM |
| 6 | **QUA-023** Reduced-motion blanket `*` selector | Targetowac konkretne klasy animacji zamiast `*`. Zachowac hover transitions | MEDIUM |
| 7 | **QUA-007** Preset change protection | Zablokuj zmiane presetu gdy monitor otwarty LUB auto-close + toast | LOW |
| 8 | **SEV-010** AnimMgr cleanup w lmClose | `AnimMgr.unregisterAll('monitor')` w `lmClose()` | LOW |
| 9 | **QUA-019** Narrative Templates przyklady | Dodac 3-5 przykladowych szablonow do spec | LOW |
| 10 | **QUA-034** Phase ID mismatch guard | `console.warn('HITL: unknown phase')` jesli HITL_MAP[phaseId] undefined | LOW |

---

### Ocena Specyfikacji (1-10)

| Kategoria | Ocena | Uzasadnienie |
|-----------|-------|--------------|
| **Completeness** | **7/10** | Silna w: Data Model, HTML Structure, Event List, Feature List, LOC Budget, Performance Contract, Testing Requirements. Slaba w: brak kompletnego CSS (CRITICAL), brak API pseudo-kodu AnimationManager, brak przykladow Narrative Templates, brak definicji `lmRender()`/`renderCommsMessage()`. Developer bedzie musial siegac po 14_DESIGNER.md mimo instrukcji "nie czytaj BUILD specs". |
| **Consistency** | **6/10** | GS#2 rozstrzyga WIEKSZOSCI konfliktow z BUILD specs (sekcja B -- 7 naming decisions, sekcja D -- 8 over-engineering items). ALE: nadal istnieja niespojnosci: hitl vs waiting-for-human w CSS, 3 rozne z-index wartosci debate, 3 rozne card heights, speed control ghost feature, LOC sumy nie bija (delta 35 LOC w Phase 2). Instrukcja "czytaj TEN dokument" jest podwazona przez brak CSS -- wymusza czytanie Designera. |
| **Security** | **8/10** | Profil ryzyka jest NISKI z natury (client-side only, zero backendu, zero user auth, zero PII). Jedyny realny user input to HITL textarea (`userNote`). 3 HIGH findings sa latwe do naprawy (~15 LOC). Brak remote attack vectors, brak data exposure, brak privilege escalation. Glowne ryzyka: self-XSS i resource management -- ograniczone do kontekstu wlasnej przegladarki. R6 (zero third-party) i R7 (zero danych wrazliwych) POTWIERDZONE. |
| **Implementability** | **7/10** | Developer Z GS#2 moze zakodowac ~80% systemu bez pytan: lifecycle, state management, events, HITL, testing. Pozostale ~20% wymaga: (a) CSS z Designera, (b) samodzielnego zaprojektowania AnimationManager API, (c) samodzielnego zaprojektowania Narrative Templates, (d) wypelnienia luk w edge cases. Implementation Roadmap z 4 fazami, LOC per krok, i zaleznosci -- BARDZO dobra. Performance Contract z konkretnymi targetami -- BARDZO dobry. |
| **Quality** | **7.5/10** | Dokument jest profesjonalny: jasna struktura, explicite rozstrzygniecia konfliktow z uzasadnieniami i "kogo slucham", Unified Data Model, Unified HTML, Unified CSS, Unified Events, WON'T HAVE z uzasadnieniami, Appendix "Co Przegralo". Consensus Score 78% jest wiarygodny. Jedyna powazan wada: sprzecznosc "czytaj TEN dokument" z brakiem kompletnego CSS. |

**Srednia wazona: 7.1/10**

---

### Risk Assessment

#### NAJWIEKSZE RYZYKO: Fragmentacja zrodel prawdy

GS#2 deklaruje sie jako "jedyne zrodlo prawdy" ale nie jest samowystarczalne. Developer MUSI siegac po 14_DESIGNER.md (CSS), a moze tez po 18_INTEGRATOR.md (hooking details) i 17_BACKEND_DEV.md (pseudo-kod HITL). Kazde siegniecie po BUILD spec niesie ryzyko:

1. **Implementacji odrzuconego patternu** (Proxy, Event Bus, token cost -- wszystkie obecne w BUILD specs)
2. **Uzycia starych wartosci** (waiting-for-human, z-index 360, card height 96px)
3. **Over-engineeringu** (23 event types zamiast 5, wildcard matching)

**Mitygacja:** Errata do GS#2 (7 doc fixes z sekcji "PRZED implementacja") + komentarz w kodzie: `// ARCH: jedyne zrodlo prawdy = 24_GOLD_SOLUTION_2.md. BUILD specs (14-18) sa ARCHIWALNE.`

#### CO MOZE POJSC NIE TAK

| Scenariusz | Prawdopodobienstwo | Impact | Mitygacja |
|------------|-------------------|--------|-----------|
| Developer implementuje Event Bus / Proxy z BUILD specs | SREDNIE | 40-50 LOC zmarnowanych, architekturalna niespojnosc | Bold warnings w GS#2, komentarze w kodzie |
| CSS mismatch (hitl vs waiting-for-human) nie wykryty do testow | WYSOKIE bez doc fix | HITL styl nie dziala | Doc fix CRITICAL #1 |
| AnimationManager zaprojektowany niezgodnie z reszta spec | SREDNIE | Migracja 4 rAF moze nie dzialac | Dodac pseudo-kod API do GS#2 |
| LOC budzet przekroczony w Phase 2 | NISKIE (bufor 496 LOC) | Phase 3 zostaje odcieta | Checkpoint po Phase 2 juz specyfikowany |
| Performance < 55 FPS z 27 agentami + 17 animacji | NISKIE-SREDNIE | Degradation strategy istnieje | AnimMgr degradation + cap breathe na aktywna faze |
| HITL deadlock (user opuszcza tab) | SREDNIE | Symulacja stoi w limbo | visibilitychange handler (5 LOC) |
| Re-debate infinite loop | NISKIE | User klika R wielokrotnie, symulacja nie konczy sie | Max 3 re-debates per HITL (5 LOC) |

---

### DECYZJA: GO WITH CONDITIONS

**Uzasadnienie:**

1. **Oba raporty QA daly PASS WITH CONDITIONS** -- zaden nie dal FAIL/NO-GO
2. **3 CRITICAL findings sa doc fixes** (0 LOC kodu) -- latwe do naniesienia przed implementacja
3. **9 HIGH findings wymagaja ~31 LOC code guards** -- w ramach istniejacego budzetu (bufor 496 LOC)
4. **Profil bezpieczenstwa jest NISKI** -- client-side only, zero backendu, zero danych wrazliwych
5. **Gold Solution #2 ma 78% konsensus** i 24/26 spelnionych warunkow z Five Minds Debate
6. **Architektura jest zdeterminowana**: zwykly obiekt + explicit render + direct calls + 5 CustomEvents -- prosta, debugowalna, maintainable
7. **Implementation Roadmap jest realistyczny**: 4 fazy, LOC per krok, checkpoint, warunkowa Phase 3

**WARUNKI GO:**

| # | Warunek | Typ | Kiedy | Kto |
|---|---------|-----|-------|-----|
| 1 | Naniesienie 7 doc fixes na GS#2 (patrz sekcja "PRZED implementacja") | doc | PRZED Phase 0 | Syntetyk/Author |
| 2 | Implementacja `escapeHTML()` + sanityzacja `userNote` | code | Phase 2 | Developer |
| 3 | Definicja `renderCommsMessage()` z textContent (nie innerHTML) na msg.text | code | Phase 2 | Developer |
| 4 | Guard `if (!nodes.length)` w `lmOpen()` | code | Phase 1 | Developer |
| 5 | `visibilitychange` handler dla HITL deadlock | code | Phase 2 | Developer |
| 6 | Re-debate limit (max 3) + state reset | code | Phase 2 | Developer |
| 7 | localStorage validation (enum + range) | code | Phase 1 | Developer |
| 8 | Monkey-patch double-wrap guard | code | Phase 1 | Developer |
| 9 | Keyboard handler: przepuszczac Ctrl+/Alt+/Meta+ | code | Phase 1 | Developer |
| 10 | Speed control: explicite WYRZUCIC z v22 lub dodac logike | doc | PRZED Phase 1 | Syntetyk/Author |
| 11 | Phase ID verification: `debate1` vs `five_minds_1` w PHASES | verification | PRZED Phase 2 | Developer |

**Jesli warunki 1-11 zostana spelnione: specyfikacja jest GOTOWA do implementacji.**

---

### Pre-Implementation Checklist

#### Dokumentacja (PRZED kodowaniem)

- [ ] **CRITICAL** Naniesiono errate na GS#2: CSS selector `waiting-for-human` -> `hitl`
- [ ] **CRITICAL** Naniesiono errate na GS#2: explicite wskazanie na Designer CSS sekcje 3.1-3.7 z lista korekt
- [ ] **CRITICAL** Zdecydowano o HITL deadlock handler (visibilitychange + auto-approve po 60s)
- [ ] **HIGH** Dodano definicje `lmRender()` = `lmBuildGrid() + lmUpdateTimeline() + lmUpdateHUD()`
- [ ] **HIGH** Dodano pseudo-kod AnimationManager API
- [ ] **HIGH** Zdecydowano: speed control IN/OUT z v22 (rekomendacja: OUT)
- [ ] **HIGH** Dodano z-index mape (overlay 300, comms 305, HUD 310, debate 340, HITL 350, toast 999)
- [ ] Zweryfikowano Phase IDs w v22 codebase: `debate1` vs `five_minds_1`
- [ ] Dodano note o HTML template: "UZYJ GS#2, NIE Integratora"

#### Infrastruktura (Phase 0)

- [ ] Performance baseline v22 -- 30 min DevTools (FPS, heap, DOM, layout recalc)
- [ ] Audit v22: dead code, duplikaty CSS (-150 do -200 LOC)
- [ ] AnimationManager singleton zaimplementowany z pseudo-kodem z GS#2 (po erratie)
- [ ] Migracja 4 rAF na AnimMgr
- [ ] prefers-reduced-motion (@media + toggle)
- [ ] Done color fix: #22C55E -> #3B82F6
- [ ] Weryfikacja: v22 z preset Deep Five Minds dziala jak przed Phase 0

#### Security Guards (Phase 1-2)

- [ ] `escapeHTML()` helper (3 LOC)
- [ ] `userNote` z HITL textarea sanityzowany przez escapeHTML przed wstawieniem do DOM
- [ ] `renderCommsMessage()` uzywa textContent na msg.text, NIGDY innerHTML
- [ ] Narrative Templates: usunac `${Math.floor(...)}` -- zamienic na statyczne wartosci
- [ ] localStorage: enum whitelist na `autonomy`, zakres na `autoApproveTimer`
- [ ] Komentarz w kodzie: `// SECURITY: NIGDY nie uzywaj eval/Function do parsowania szablonow`
- [ ] Komentarz w kodzie: `// ARCH: jedyne zrodlo prawdy = 24_GOLD_SOLUTION_2.md`

#### Edge Case Guards (Phase 1-2)

- [ ] `if (!nodes.length)` guard w `lmOpen()` -- toast "Dodaj agentow!"
- [ ] HITL deadlock: visibilitychange handler (auto-approve po 60s niewidocznosci)
- [ ] Re-debate: max 3 per HITL, reset completedPhases i statusow, separator w comms log
- [ ] Monkey-patch: guard `if (addDTLMsg !== _origAddDTL)` przed nadpisaniem
- [ ] Keyboard: `if (e.ctrlKey || e.altKey || e.metaKey) return;`
- [ ] Space shortcut: sprawdzac `document.activeElement.tagName` (TEXTAREA/SELECT/INPUT)

#### Memory Leak Prevention (Phase 1-2)

- [ ] AnimMgr.unregister() per task w `lmClose()`
- [ ] MutationObserver disconnect w `lmClose()`
- [ ] clearTimeout/clearInterval WSZYSTKICH timerow w `lmClose()`
- [ ] DOM purge comms log = `remove()` (NIE `display: none`)
- [ ] `LM.commsMessages` cap: 500 (ring buffer)
- [ ] Reset `_narrativeHistory` przy nowej sesji

#### Quality Gates (PRZED merge)

- [ ] 12 testow funkcjonalnych (F1-F12)
- [ ] 7 testow performance (P1-P7)
- [ ] 8 testow a11y (A1-A8)
- [ ] 6 testow regresji (R1-R6)
- [ ] 2 smoke testy mobile (MS1-MS2)
- [ ] LOC checkpoint po Phase 2 (<= 4300 LOC)
- [ ] File size < 380 KB (hard limit 450 KB)
- [ ] FPS >= 55 desktop, >= 30 CPU 4x throttle

---

### Podsumowanie Numeryczne

| Metryka | Wartosc |
|---------|---------|
| Laczna liczba findings | 42 (po deduplicacji) |
| CRITICAL | 3 (wszystkie doc fixes) |
| HIGH | 9 (7 doc fixes + code guards, 2 performance/architecture) |
| MEDIUM | 14 (a11y, consistency, performance, edge-cases) |
| LOW | 9 + 7 informacyjnych |
| LOC dodatkowy na code guards | ~31 LOC |
| LOC bufor po code guards | ~465 LOC (z 496) |
| Doc fixes wymagane PRZED implementacja | 7 |
| Ocena Completeness | 7/10 |
| Ocena Consistency | 6/10 |
| Ocena Security | 8/10 |
| Ocena Implementability | 7/10 |
| Ocena Quality | 7.5/10 |
| **Srednia wazona** | **7.1/10** |
| **DECYZJA** | **GO WITH CONDITIONS (11 warunkow)** |

---

*Raport przygotowany przez Manager QA [OPUS] -- finalna brama jakosci Deep Five Minds Protocol.*
*Zrodla: 25_QA_SECURITY.md (12 findings), 26_QA_QUALITY.md (30 findings), 24_GOLD_SOLUTION_2.md (finalna spec).*
*Verdict: GO WITH CONDITIONS -- 3 doc fixes PRZED, 8 code guards PODCZAS, polish PO.*
*Data: 4 kwietnia 2026*
