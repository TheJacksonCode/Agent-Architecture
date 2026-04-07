# Rzecznik Uzytkownika -- Perspektywa UX
## Five Minds Debata #1: Live Monitor Mode

**Rola:** Rzecznik Uzytkownika (User Advocate)  
**Perspektywa:** UZYTKOWNIK KONCOWY  
**Data:** 2026-04-04  
**Zrodla:** MANIFEST.md, 02_RESEARCHER_UX.md, 07_RESEARCH_CRITIC.md, + wlasna analiza user journey  

---

### Stanowisko Glowne

**Uzytkownik nie chce "ogladac animacji" -- chce ROZUMIEC co sie dzieje i DECYDOWAC w odpowiednim momencie.** Live Monitor musi byc narzedziem poznawczym, nie pokazem fajerworkow. Kazdy pixel na ekranie powinien odpowiadac na pytanie: "Czy to pomaga mi zrozumiec lub zdecydowac?" Jesli nie -- wyrzucamy. Uzytkownik jest power userem, ale power user to ktos, kto ceni czas jeszcze bardziej niz casual user. Prostota i czytelnosc sa WAZNIEJSZE niz wizualne efekty wow.

---

### User Journey Map

#### Sesja typowa: "Chce zobaczyc jak Deep Five Minds pracuje"

```
KROK 1: Otwarcie aplikacji (0s)
  User otwiera AGENT_TEAMS_CONFIGURATOR_v22.html w Chrome.
  Widzi canvas z presetami. Klika "Deep Five Minds Protocol" z listy.
  -> OCZEKIWANIE: Szybkie zaladowanie, zero lagowania.
  -> RYZYKO: Plik >500KB moze wolno renderowac starfield + 24 nody.

KROK 2: Zapoznanie sie z presetem (30-60s)
  User przeglaada 24 agentow na canvasie. Czyta opisy w sidebar.
  Sprawdza polaczenia miedzy agentami, fazy.
  -> OCZEKIWANIE: Czytelny overview calego workflow.
  -> PYTANIE USERA: "Ile faz bedzie? Ile agentow aktywnych w kazdej?"

KROK 3: Uruchomienie Live Monitor (klik M lub przycisk)
  Transition: canvas -> monitor fullscreen.
  -> OCZEKIWANIE: Plynne przejscie (<600ms), ale PRZEDE WSZYSTKIM
     zachowanie kontekstu mentalnego ("to sa te same agenty").
  -> RYZYKO: Jesli transition jest zbyt dramatyczny/dlogi,
     user traci orientacje. Skipowanie MUSI dzialac.

KROK 4: Obserwacja Fazy Strategy (1-2 min)
  Orkiestrator i Planista pracuja.
  User widzi: status working/thinking, speech bubbles, comms log.
  -> OCZEKIWANIE: "Widze kto pracuje, co robi, ile trwa."
  -> KLUCZOWE: Comms log musi byc czytelny, nie zasmiecony.

KROK 5: HITL #1 -- Akceptacja planu (decyzja ~15-30s)
  System pauzuje. Gold badge "DECISION REQUIRED".
  User przeglaada plan, klika APPROVE lub MODIFY.
  -> OCZEKIWANIE: Jasne co akceptuje, szybkie podjecie decyzji.
  -> RYZYKO: Zbyt duzo informacji w decision panel -> paralizja.

KROK 6: Fazy Research + Five Minds Debate #1 (3-5 min)
  Dluzsza faza. 5 ekspertow debatuje.
  User sledzi argumenty, widzi niezgody.
  -> OCZEKIWANIE: "Widze KTO mowi CO, i gdzie sa spory."
  -> RYZYKO: 5 ekspertow naraz = information overload.

KROK 7: HITL #2 -- Gold Solution (decyzja ~30-60s)
  NAJWAZNIEJSZY moment decyzyjny.
  User czyta Gold Solution, opcjonalnie porownuje opcje.
  -> OCZEKIWANIE: Debate Arena Panel czytelny, argumenty widoczne.
  -> RYZYKO: Confidence slider = dodatkowy friction. Robic opcjonalnym.

KROK 8: Fazy Build + QA + Five Minds #2 (5-10 min)
  Dluga faza budowania. User MOZE odejsc od ekranu.
  -> OCZEKIWANIE: Wraca i natychmiast widzi "gdzie jestem".
  -> RYZYKO: Tab w tle -> throttling -> zaburzony timer.
  -> POTRZEBA: "Catch up" mode -- szybkie podsumowanie co przegapil.

KROK 9: Final Approval (decyzja ~15s)
  Ostatni HITL point. Approve/Reject.
  -> OCZEKIWANIE: Szybkie, bo user juz zna kontekst.

KROK 10: Simulation Complete (celebration + summary)
  User widzi podsumowanie: czas, fazy, decyzje, koszt szacunkowy.
  -> OCZEKIWANIE: Poczucie zamkniecia. "Zrobilem to."
  -> DELIGHT MOMENT: Confetti, summary stats, opcja exportu.

KROK 11: Powrot do canvas lub zamkniecie
  User klika Escape/M/X -> wraca do canvasu.
  -> OCZEKIWANIE: Canvas nienaruszony, moze edytowac dalej.
```

---

### Scenariusze UX

#### Scenariusz 1: Deep Five Minds (24 agentow, 6 faz)

**Co dziala:**
- Phase-based grouping w gridzie (MANIFEST 4.1) -- naturalny podzial informacji
- Phase timeline na dole -- user zawsze wie "gdzie jestem w procesie"
- Dim completed phases (opacity 0.4) -- redukuje clutter

**Co NIE dziala (z perspektywy usera):**
- 24 agentow w jednym gridzie to ZA DUZO. Nawet na 15" ekranie, przy kartach 180x100px, user musi scrollowac.
- Comms log z 24 agentami bedzie ZALEWANY wiadomosciami -- scroll ucieka.
- Brak hierarchii waznosci miedzy agentami -- Orkiestrator jest WAZNIEJSZY niz QA Performance, ale wizualnie sa rowni.

**Propozycja:**
- **Progresywny reveal:** Pokazuj TYLKO agentow aktywnej fazy + always-visible Orkiestrator/Syntetyk. Ukonczone fazy zwijane do 1 linijki ("Strategy: 2/2 done, 1m23s"). Przyszle fazy ukryte.
- **Comms log: filtr domyslny = aktywna faza.** User moze przlaczac na "All", ale default NIE pokazuje wiadomosci z ukonczonych faz.
- **Orkiestrator i Syntetyk: stale widoczne** w topbar lub dedykowanym "always-on" panelu, jak w v14.

---

#### Scenariusz 2: HITL w 30 sekund

**Co dziala:**
- Debate Arena Panel (MANIFEST 6.3A) -- dobry layout z expert cards
- Quick Approval (MANIFEST 6.3C) -- proste approve/reject dla oczywistych decyzji
- Keyboard shortcuts (A/R/D) -- szybkie dla power usera

**Co NIE dziala:**
- 30 sekund to MALO na przeczytanie 5 expert cards + Gold Solution + confidence slider.
- Auto-approve timer (60s) tykajacy w tle STRESUUJE usera zamiast pomagac.
- Brak kontekstu: skad wiem, czy Gold Solution jest dobra? Potrzebuje POROWNANIA z moim oryginalnym zamyslem.

**Propozycja:**
- **Timer: WYLACZONY domyslnie.** User sam wlacza auto-approve w settings. Timer tykajacy od startu to UX antypattern -- uzytkownik czuje presje na decyzje, co POGARSZA jakosc decyzji.
- **Expert cards: skrocone do 1 zdania KLUCZOWEGO argumentu.** Klik -> expand do pelnego. Domyslnie nie zalewaj informacjami.
- **Gold Solution jako FOCAL POINT:** Wieksza, wyrozniona karta. Eksperci sa kontekstem, Gold Solution jest ODPOWIEDZIA. User czyta najpierw odpowiedz, potem sprawdza argumenty jesli chce.
- **"Co sie zmienilo" diff:** Krotkie podsumowanie "w porownaniu do Twojego planu, Gold Solution zmienia X, Y, Z". Pozwala podjac decyzje w 10s zamiast 60s.

---

#### Scenariusz 3: Demo/nagrywanie ekranu

**Co dziala:**
- Dramatyczne transition (Morphing Station Lock) -- wow effect na nagraniu
- Phase timeline -- widz rozumie progresje
- Speech bubbles z typing indicator -- "agenci rozmawiaja" -- super na demo

**Co NIE dziala:**
- Topbar HUD z metrykmi ($12.40, 5/27 agents, 04:23) -- na nagraniu wideo bedzie za male
- Comms log po prawej -- na nagraniu 1080p tekst 11px bedzie NIECZYTELNY
- Glassmorphism na compressionie video (H.264/H.265) -> artefakty na blur

**Propozycja:**
- **"Presentation Mode" / "Demo Mode":** Wieksze fonty (+30%), ukryty comms log (komunikacja tylko przez speech bubbles), uproszczony HUD (tylko faza + progress). Wlaczany klawiszem P lub przyciskiem.
- **High-contrast fallback:** Opcja solidnych tla zamiast glassmorphism -- lepiej wyglada na nagraniu video z kompresja.
- **"Cinematic entry" z v18:** Typewriter intro "DEEP FIVE MINDS PROTOCOL" -- swietne na poczatek nagrania. Zachowac.

---

#### Scenariusz 4: 15-calowy laptop

**Co dziala:**
- 15" @ 1920x1080 -- referencyjny viewport.
- Bento grid z phase containers powinien sie zmiescic.
- Phase timeline (60px) + Topbar HUD (46px) = 106px stracone na chrome. Zostaje ~970px na content.

**Co NIE dziala:**
- Comms log (280px) + agent grid = agent grid ma ~1640px. Przy 5 agentach w fazie Build, karty 180px kazda + gaps = ~1000px. Zmiesci sie, ale ciasno.
- Na 13" laptop (1366x768) -- TO SIE NIE ZMIESCI. Karty musza byc mniejsze lub grid musi scrollowac.
- "Expand agent detail" slide-out panel -- na 15" zabiera pol ekranu, na 13" prawie caly.

**Propozycja:**
- **Responsive breakpoints:** 
  - >= 1920px: pelny layout jak w MANIFEST 4.1
  - 1366-1919px: comms log collapsible (domyslnie zamkniety), mniejsze karty (140x80px), compact HUD
  - < 1366px: agent grid zamiast kart, comms log jako overlay, HUD redukowany do ikony + tooltipow
- **"Compact mode" toggle:** User sam decyduje czy woli wiecej agentow na ekranie (mniejsze karty) czy lepsze detale (wieksze karty, mniej widocznych).
- **Agent detail: overlay zamiast slide-out.** Nie zabiera miejsca z gridu.

---

#### Scenariusz 5: Daltonizm

**Co dziala:**
- 3 kanaly per status (kolor + ikona + animacja) -- poprawne podejscie (MANIFEST 5.8)
- Ikony sa unikalne per status (puste kolko, zegar, gear, zarowka, checkmark, trojkat, reka)

**Co NIE dziala:**
- **working (#34D399 emerald) vs done (#22C55E green)** -- DWA ODCIENIE ZIELONEGO. Dla protanopii/deuteranopii (8% mezczyzn!) to jest NIEROZROZNIALNE. To nie jest edge case -- to 1 na 12 mezczyzn.
- **error (#F87171 red) vs working (#34D399 green)** -- klasyczny problem red-green. Z daltonizmem protanopii te kolory wyaladaja prawie identycznie.
- Phase colors: strategy (indigo) vs research (cyan) -- moga byc trudne do rozroznienia przy tritanopii.
- Comms log: kolorowane po typie (default/gold/red/indigo) -- daltonista nie rozrozni red od default na ciemnym tle.

**Propozycja -- LINIA W PIASKU:**
- **working = emerald + SPINNING RING + label "Working"**
- **done = blue (#3B82F6) zamiast green + STATIC CHECKMARK + label "Done"**  
  Zmiana done z zielonego na niebieski eliminuje green-vs-green problem.
- **error = red + TROJKAT + SHAKE + label "Error"** -- animacja shake jest kluczowym wyroznikiem
- **Obowiazkowe labele tekstowe pod kazdym statusem** (idle/queued/working/thinking/done/error/HITL). NIE TYLKO ikony i kolory.
- **Testowanie:** Uzywac symulatorow daltonizmu (Chrome DevTools > Rendering > Emulate vision deficiencies) PRZED kazdym release.
- **Pattern fills jako opcja:** W settings: "High contrast status indicators" -- dodaje wzory (kreski, kropki, fale) do status indicators oprocz kolorow.

---

#### Scenariusz 6: Five Minds debata -- 5 ekspertow naraz

**Co dziala:**
- Debate Arena Panel z expert cards -- strukturyzuje informacje
- Devil's Advocate z czerwonym accent -- wizualnie wyroznia kontestacje
- Rundy debaty (Round 1: Independent, Round 2: Debate, Round 3: Synthesis) -- porządkuja chronologie

**Co NIE dziala:**
- 5 speech bubbles pojawiajacych sie w szybkim tempie = user czyta PIERWSZA, a juz pojawia sie PIATA.
- "Typing indicator" na 5 agentach naraz -> 5 migajacych elementow na ekranie = chaos wizualny.
- Polaczenia agree/disagree miedzy 5 ekspertami = potencjalnie 10 linii nakladajacych sie na siebie.
- Comms log: 5 wiadomosci w kilka sekund = szybki scroll.

**Propozycja:**
- **Kolejkowanie speech bubbles:** Maksymalnie 2 widoczne naraz. Nastepne czekaja w kolejce z wskaznikiem "2 more...". Klik -> pokaz wszystkie.
- **"Focus mode" w debacie:** Klik na eksperta -> jego argumenty podswietlone, reszta dimmed. Pozwala sledzic jeden watek na raz.
- **Agree/disagree summary zamiast linii:** Zamiast 10 linii polaczen, mala tabela consensus: "Pragmatist <-> Visionary: AGREE | Critic <-> DA: DISAGREE". Czytelniejsze niz spaghetti polaczen.
- **Round-based pacing:** Kazda runda jako osobny "slide". User widzi Round 1 (5 niezaleznych opinii), klika "Dalej" -> Round 2 (debata). NIE MIESZAJ rund -- to kluczowe dla zrozumienia procesu.
- **"Kto z kim sie zgadza" heatmap:** Prosta matryca 5x5 z kolorami agree/neutral/disagree. Jeden rzut oka = czytelna mapa sojuszy.

---

### Pain Points & Delights

| Element | Pain | Delight | Propozycja |
|---------|------|---------|------------|
| **Transition canvas->monitor** | Zbyt dlugie (>600ms) irytuje przy wielokrotnym przelaczaniu | Morphing nodes (FLIP technique) -- wow, to sa TE SAME agenty! | Transition max 400ms, skipowalne, pamiec pozycji |
| **24 agentow na ekranie** | Information overload, scrollowanie, chaos | Widziec caly system jednym rzutem oka | Progresywny reveal: aktywna faza pelen widok, reszta zwinięta |
| **HITL decision** | Presja czasu (timer), za duzo info w panelu | Poczucie sprawczosci: "JA decyduje" | Timer OFF domyslnie, Gold Solution focal, diff z planem |
| **Comms log** | Zalewany wiadomosciami, scroll ucieka | Czytac "rozmowy" agentow jak chat | Filtr = aktywna faza, pinning waznych msg |
| **Five Minds debata** | 5 ekspertow naraz = gdzie patrzec? | Widziec "myslenie AI" z roznych perspektyw | Kolejkowanie bubbles, round-based pacing |
| **Phase transitions** | Przegapienie momentu przelaczenia fazy | Dramatyczny spotlight + confetti = satysfakcja | Announcement banner 2s + stagger reveal |
| **Speech bubbles** | Za szybko znikaja (3s), nie zdaze przeczytac | Typing indicator -> tekst = agenci "zyja" | Minimalne 5s display, dlugie msg = dluzej, manual dismiss |
| **Emergency STOP** | Nie wiem czy klikniecie zadziala (brak feedback) | Natychmiastowe zatrzymanie = poczucie kontroli | Shake + red flash na CALYM UI + potwierdzenie "STOPPED" |
| **Powrot z monitora** | Strata kontekstu: canvas sie przeladowal? | Canvas DOKLADNIE jak byl -- nic nie stracone | Zachowac stan canvasu w pamieci, zero re-render |
| **Koszt tokenow** | Mylace w symulacji ("to naprawde kosztowalo $15?") | Edukacyjne: "taki workflow kosztowalby ~$15 w produkcji" | Disclaimer "szacunek edukacyjny" + tooltip z wyjasnieniem |
| **Celebration na koniec** | Zbyt dlugie confetti blokuje zamkniecie | Poczucie osiagniecia, statystyki summary | Confetti 1.5s max, summary panel z przyciskiem "Zamknij" |
| **Daltonizm** | working vs done nierozroznialne (oba zielone!) | -- | Zmiana done na niebieski, obowiazkowe labele tekstowe |
| **13" laptop** | Karty 180px sie nie mieszcza | -- | Compact mode, responsive breakpoints, overflow scroll |

---

### Odpowiedzi na Otwarte Pytania (perspektywa usera)

#### Q1: Token cost w symulacji -- jak wyswietlac?

**Odpowiedz usera:** "Chce wiedziec ILE BY TO KOSZTOWALO w produkcji. Nie obchodzi mnie dokladna kwota -- interesuje mnie rzad wielkosci. $2 czy $200? To roznica. Ale MUSI byc jasne ze to szacunek, nie fakt. Jesli zobacze '$15.40' bez kontekstu, pomysle ze wydajem prawdziwe pieniadze."

**Rekomendacja:** SHOULD HAVE (nie MUST). Wyswietlac jako "~$15 (szacunek)" z ikona info i tooltipem "Szacunek edukacyjny oparty na cenach Claude Opus 4/Sonnet 4. Faktyczny koszt zalezy od modelu, dlugosci promptow i regionu." Mozliwosc ukrycia w settings.

---

#### Q2: Ile HITL punktow w default mode?

**Odpowiedz usera:** "Jesli mam 5 przerw w 10-minutowej symulacji, to co 2 minuty mnie 'wyrywa' z obserwowania. Irytujace. Chce NAJWYZEJ 3 punkty decyzyjne -- ale te 3 musza byc NAPRAWDE WAZNE. Nie przerywajcie mi na bzdury."

**Rekomendacja:** Default = 3 HITL (polaczenie punktow 1+3 z MANIFEST 6.2):
1. Po Strategy + Research (polaczone) -- "Oto plan i wyniki badania. Akceptujesz?"
2. Po Five Minds Debate #1 -- "Oto Gold Solution. Approve/Modify/Re-debate?"  
3. Final Approval -- "Gotowe. Deploy/Reject?"

Punkty 4 (QA findings) i 5 (debata #2) sa opcjonalne -- user moze je wlaczyc w Autonomy Dial. Default: auto-approve z notyfikacja w comms log.

---

#### Q3: Session replay / time travel -- v22 czy pozniej?

**Odpowiedz usera:** "Session replay bylby SWIETNY do prezentacji i nauki. Ale jesli przez to v22 sie opozni o 2 tygodnie -- nie warto. Bardziej mi zalezy na solidnym Live Monitor niz na replay."

**Rekomendacja:** WON'T HAVE w v22. COULD HAVE: eksport logu sesji jako JSON/Markdown (proste, male kosztem). Replay engine = v23.

---

#### Q4: Mobile support -- blokujacy czy nie?

**Odpowiedz usera:** "Uzywam tego na desktopie. Jedyny scenariusz mobile: pokazac komus na telefonie podczas rozmowy. Ale to NICE TO HAVE, nie blokujace."

**Rekomendacja:** Desktop-first. Ale: MINIMALNE responsive (nic nie powinno "wylewac" sie poza viewport na mobile, scrollowanie musi dzialac). Nie optymalizowac performance na mobile w v22.

---

#### Q5: Autonomy Dial -- default level?

**Odpowiedz usera:** "Chce ogladac i decydowac w kluczowych momentach. Nie chce mikrozarzadzac kazdym krokiem (opcja 1), ale tez nie chce byc calkowicie pominieta (opcja 4). Opcja 3 brzmi dobrze -- ale z 3 HITL, nie 5."

**Rekomendacja:** Default = "Act with Confirmation" (opcja 3) z 3 HITL points. Mozliwosc przelaczenia na inne poziomy w settings PRZED uruchomieniem symulacji.

---

#### Q6: Rozmiar pliku -- granica?

**Odpowiedz usera:** "Nie obchodzi mnie ile linii ma plik. Obchodzi mnie czy sie laduje szybko i czy dziala plynnie. Jesli 5000 LOC laduje w 1s i dziala 60fps -- jest ok. Jesli 2000 LOC laguje -- jest zle."

**Rekomendacja:** Metryka sukcesu = performance, nie LOC. Ale: profilowac czas ladowania i memory footprint. Jesli > 2s First Contentful Paint lub > 200MB heap -- reagowac.

---

#### Q7: Agent node design -- karty czy orby?

**Odpowiedz usera:** "Orby 48x48 sa za male zeby cokolwiek przeczytac. Karty 180x100 z progress bar i last message -- o to mi chodzi. Chce WIDZIEC co agent robi, nie tylko ze istnieje. Ale 24 karty 180x100 to duzo miejsca..."

**Rekomendacja:** Hybrid approach:
- **Aktywna faza:** Pelne karty 180x100px (progress bar, last message, status badge)
- **Ukonczone fazy:** Mini karty 80x40px (tylko ikona + checkmark + nazwa)
- **Przyszle fazy:** Orby 32x32 (dimmed, placeholder)
- Klik na dowolny mini element -> expand do pelnej karty w overlay

---

#### Q8: Wiarygodnosc danych z raportu X (06)

**Odpowiedz usera:** "Nie interesuja mnie statystyki z Twittera. Interesuja mnie WZORCE ktore moge zastosowac. Jesli 'token cost tracking' jest przydatne edukacyjnie -- tak, dodajcie. Ale nie dlatego ze Karpathy tak powiedzial, tylko dlatego ze JA chce wiedziec ile by to kosztowalo."

**Rekomendacja:** Insighty z X (06) traktowac jako inspiracje, nie facts. Token cost = SHOULD HAVE bo jest edukacyjne, niezaleznie od "industry standard". Hot Takes o compound failure problem (85% per step) = wartosciowy insight do wyswietlenia w UI.

---

### Hierarchia Potrzeb Usera

1. **Czytelnosc** -- widze kto pracuje, w jakiej fazie, jaki jest status (< 5 sekund na zrozumienie stanu)
2. **Kontrola** -- moge zatrzymac (STOP), zdecydowac (HITL), wrocic do edycji (ESC) W KAZDYM MOMENCIE
3. **Kontekst** -- wiem gdzie jestem w procesie (phase timeline), co bylo wczesniej, co bedzie dalej
4. **Niski cognitive load** -- nie jestem bombardowany informacjami; widze TYLKO to co teraz istotne
5. **Responsywnosc UI** -- animacje 60fps, brak lagowania, natychmiastowa reakcja na klik
6. **Uczciwosc informacji** -- jesli cos jest szacunkiem, jest jasno oznaczone jako szacunek (token cost)
7. **Dostepnosc** -- dziala dla daltonistow, dziala z klawiatury, respektuje prefers-reduced-motion
8. **Demo-readiness** -- moge nagrywac ekran i wynik wyglada profesjonalnie
9. **Delight moments** -- confetti, dramatyczne transitions, speech bubbles daja poczucie "zycia" systemu
10. **Eksport/share** -- moge wyeksportowac log sesji i podzielic sie wynikami

---

### A11y Audit Plan

#### Przed implementacja (design review):
- [ ] Paleta kolorow przetestowana w symulatorze daltonizmu (protanopia, deuteranopia, tritanopia) -- Chrome DevTools > Rendering > Emulate vision deficiencies
- [ ] Kazdy status agenta rozroznialny BEZ KOLORU (same ikony + animacje + labele wystarczaja)
- [ ] Kontrast ratio zweryfikowany dla KAZDEJ pary tekst/tlo (WebAIM Contrast Checker)
- [ ] Focus order zaplanowany (Tab sequence przez wszystkie interakcje)

#### Podczas implementacji:
- [ ] `prefers-reduced-motion` respektowane -- statyczne fallbacki dla WSZYSTKICH animacji
- [ ] Focus trap w overlayach (Debate Arena, Decision Panel, Agent Detail)
- [ ] `aria-live="polite"` na comms log, `aria-live="assertive"` na HITL alerts
- [ ] Skip links na poczatku DOM
- [ ] Wszystkie ikony SVG maja `<title>` lub `aria-label`
- [ ] Interaktywne elementy maja min. 44x44px touch/click target (WCAG 2.5.8)
- [ ] Animacje dekoracyjne (starfield, particles, orbs) WYLACZONE przy reduced-motion

#### Po implementacji (testowanie):
- [ ] Keyboard-only navigation: przejsc cala sesje Live Monitor BEZ MYSZY
- [ ] Screen reader test (NVDA na Windows, VoiceOver na macOS): czy comms log jest czytelny? Czy HITL decision jest announced?
- [ ] Daltonizm symulacja: przejsc cala sesje w trybie protanopia -- czy kazdy status jest rozpoznawalny?
- [ ] Zoom 200%: czy layout sie nie "psuje"? (WCAG 1.4.10 Reflow)
- [ ] 15-calowy laptop test: czy wszystko sie miesci na 1366x768?
- [ ] Performance audit z wlaczonym screen readerem (NVDA + Chrome -- znane problemy z aria-live + heavy animations)

#### Narzedzia:
- Chrome DevTools Lighthouse Accessibility
- axe DevTools browser extension
- WebAIM Contrast Checker
- NVDA (Windows) / VoiceOver (macOS)
- Chrome DevTools > Rendering > Vision deficiency emulation

---

### Linie w Piasku

To sa UX dealbreakers -- funkcjonalnosci lub zasady, ktorych NIE ODPUSZCZE w tej debacie, niezaleznie od argumentow technicznych czy estetycznych:

#### 1. OBOWIAZKOWE LABELE TEKSTOWE NA STATUSACH
Kolor + ikona to NIE WYSTARCZY. Kazdy status agenta MUSI miec czytelny tekst ("Working", "Done", "Error"). 8% mezczyzn ma daltonizm. To nie edge case.

#### 2. TIMER AUTO-APPROVE DOMYSLNIE WYLACZONY
Tykajacy timer STRESUEJE usera i POGARSZA jakosc decyzji. User sam wlacza jesli chce. Default = system czeka na usera bezterminowo.

#### 3. ESCAPE ZAWSZE DZIALA
W KAZDYM stanie: overlay, decision panel, fullscreen monitor, debata -- Escape MUSI zamknac biezacy kontekst i wrocic o poziom wyzej. ZERO wyjatkow. ZERO stanow z ktorych nie mozna wyjsc klawiszem Escape.

#### 4. MAX 3 HITL POINTS DOMYSLNIE
5 przerw w 10-minutowej symulacji = irytacja. 3 to maximum. Reszta = opcjonalna w settings.

#### 5. TRANSITION SKIPOWALNE
KAZDA animacja dluzsza niz 200ms musi byc skipowalna kliknieciem lub klawiszem. User ktory juz zna animacje wejscia NIE CHCE czekac 600ms za kazdym razem.

#### 6. COMMS LOG: FILTR DOMYSLNY = AKTYWNA FAZA
Nie zalewaj usera wiadomosciami z 24 agentow. Domyslnie: tylko aktywna faza. User przelacza na "All" swiadomie.

#### 7. SPEECH BUBBLES: MIN 5 SEKUND
3 sekundy to za malo na przeczytanie zdania. Minimum 5s, dlugie wiadomosci = proporcjonalnie dluzej (~1s na 10 slow). Manual dismiss (klik X) jako opcja.

#### 8. ZERO "MYSTERY MEAT" NAVIGATION
Kazdy klikalny element musi miec widoczny affordance (podkreslenie, kursor pointer, hover effect). Zadnych "kliknij na nic-nie-wskazujacy tekst zeby odkryc ukryte funkcje".

#### 9. DONE STATUS != ZIELONY (zmiana koloru)
done (#22C55E) i working (#34D399) sa zbyt podobne. done MUSI byc innym kolorem -- proponuje niebieski (#3B82F6) lub szary (#9CA3AF, "completed, dimmed"). To nie jest propozycja -- to wymog dostepnosci.

#### 10. COMPACT MODE MUSI ISTNIEC
Nie kazdy ma 27-calowy monitor. 13" laptop z 1366x768 to realistyczny scenariusz. Compact mode z mniejszymi kartami i zwiniętymi panelami to nie nice-to-have -- to MUST HAVE.

---

### Podsumowanie dla Debaty Five Minds

Jako Rzecznik Uzytkownika, moje stanowisko mozna streścić w jednym zdaniu:

**Live Monitor powinien byc CZYTELNY jak dobry dashboard i PROSTY jak dobra apka -- a dopiero POTEM ladny jak portfolio piece.**

Badania UX (02_RESEARCHER_UX) sa doskonale (9.4/10 od Critic), ale ZBYT DUZO uwagi poswiecaja animacjom i microinterakcjom, a za malo: hierarchii informacji na malych ekranach, daltonizmowi, i cognitive load przy 24 jednoczesnych agentach. MANIFEST poprawnie to adresuje w Feature Map, ale 10 MUST HAVE features to ambitne -- proponuje priorytetyzacje WEWNATRZ Must Have (M1-M5 sa wazniejsze niz M6-M10).

Jesli mam wybierac miedzy "piekna animacja phase transition" a "czytelny tekst na 13-calowym laptopie" -- wybieram tekst. Zawsze.
