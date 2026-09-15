# R6 - Dostepnosc nakladek prowadzacych (delta wobec R2 z v39)

Researcher: Researcher dostepnosci
Zakres: wylacznie wzorzec "spotlight overlay / guided tour" - nakladka prowadzaca krok po
kroku przez interfejs, podswietlajaca po kolei rozne elementy strony. Ten dokument NIE
powtarza `v39/research/R2_interaktywne_wyjasnienia.md`, sekcja "PYTANIE 4" - tamten material
jest cytowany, nie przepisywany.

---

## TL;DR (5-8 punktow z sila dowodu)

1. **Nie istnieje oficjalna wzorcowa specyfikacja W3C ARIA APG dla "guided tour"/"product tour".**
   Sprawdzilem katalog wzorcow WAI-ARIA Authoring Practices - jest Dialog (Modal), Alert Dialog,
   Carousel, Disclosure, Tooltip - nie ma "Tour" ani "Onboarding Walkthrough". Kazda biblioteka
   tourow (Shepherd, Intro.js, Driver.js) buduje wlasna, niestandaryzowana kompozycje z tych
   klockow. Sila dowodu: wysoka co do faktu braku wzorca (przeszukanie oficjalnego katalogu APG),
   ale oznacza to, ze wszystkie "najlepsze praktyki" ponizej sa wnioskowaniem przez analogie,
   nie cytatem z jednego zrodla normatywnego. [W3C APG, lista wzorcow]
2. **Focus trap jest wlasciwy TYLKO dla modalnego wariantu tour (nakladka blokuje reszte strony).**
   Gdy krok ma pozwolic uzytkownikowi kliknac podswietlony element (tryb "prowadz za reke"
   z R4 kampanii v41), trzeba uzyc wzorca non-modal - `aria-modal` nie ustawione, focus NIE jest
   zamkniety w petli, tlo pozostaje w pelni dostepne. To jest formalny konflikt: modal daje
   izolacje i latwiejsza semantyke, non-modal daje mozliwosc interakcji z celem. Silne, ale
   posrednie zrodlo: W3C APG Dialog (Modal) Pattern opisuje explicite tylko wariant modalny;
   material o non-modal tour pochodzi z drugorzednych przewodnikow, nie z APG wprost. [1][2]
3. **Globalny handler Escape jest udokumentowanym, powtarzalnym bledem w prawdziwych bibliotekach
   UI, nie hipoteza.** Microsoft FluentUI issue #17940 opisuje dokladnie ten przypadek: modal
   otwarty wewnatrz panelu (FlexPanel), Escape zamyka OBA komponenty zamiast tylko modala - bug
   otwarty w 2021, oznaczony jako wymagajacy investigacji, bez gotowej poprawki w tresci watku.
   To bezposrednio potwierdza ryzyko, ktore MASTER_PLAN nazywa "juz raz w tym projekcie
   spowodowal blad". Sila dowodu: pojedynczy udokumentowany przypadek w duzym, powaznym projekcie
   open source, nie badanie naukowe - ale to dokladnie klasa bledu, nie jednorazowy fluke. [3]
4. **WCAG 2.4.11 Focus Not Obscured (Minimum, AA, nowe w 2.2) dotyczy wprost podswietlanego
   elementu, nie tylko panelu z tekstem.** Zrodlo normatywne (Understanding doc W3C) mowi
   doslownie: komponent, ktory ma fokus klawiatury, nie moze byc CALKOWICIE ukryty przez tresc
   stworzona przez autora. Dla spotlight tour oznacza to: jesli krok ustawia fokus na podswietlany
   element, dymek/tooltip opisujacy ten krok nie moze go calkowicie zaslaniac. Sila dowodu: wysoka,
   to bezposredni cytat z oficjalnego dokumentu Understanding WCAG 2.2. [4]
5. **Zaden zbadany material (wlacznie z oficjalnym, niezaleznym od sprzedawcow tourow przewodnikiem
   Google Chrome DevRel) nie rozwiazuje `prefers-reduced-motion` ani `aria-live` dla tego
   konkretnego wzorca.** Przewodnik Google Chrome "persistent-app-tours.md" jawnie pomija oba
   tematy - sam dokument to przyznaje niebezposrednio przez brak wzmianki, potwierdzony przy
   wyciaganiu tresci. To jest realna luka w dostepnej wiedzy, nie moje przeoczenie. [5]
6. **Wzorzec APG Carousel dostarcza najblizszego, oficjalnego precedensu na ogloszenie "krok X z
   Y".** APG zaleca "3 of 10" jako sensowna alternatywe gdy slajdy nie maja unikalnych nazw, oraz
   `aria-live="off"` przy automatycznej rotacji / `aria-live="polite"` przy rotacji sterowanej
   recznie, plus `aria-roledescription` na kontenerze i na kazdym slajdzie. Sila dowodu: wysoka,
   to oficjalny wzorzec W3C, choc zaprojektowany dla karuzeli obrazkow, nie dla tour - przeniesienie
   wymaga adaptacji, nie jest to gotowa recepta. [6]
7. **Wszystkie trzy zbadane biblioteki tourow (Shepherd, Intro.js, Driver.js) maja udokumentowane,
   realne bledy dostepnosci na GitHub, nie tylko teoretyczne ryzyko.** Zadna nie jest "kupiona
   za darmo dostepna z pudelka" - kazda wymagala/wymaga recznej naprawy. Szczegoly w sekcji
   "PULAPKI ZNANYCH BIBLIOTEK". Sila dowodu: wysoka co do faktu istnienia bledow (cytaty z
   issue trackerow), ale nie ma niezaleznego, formalnego audytu WCAG zadnej z tych bibliotek -
   wszystko pochodzi z pojedynczych zgloszen uzytkownikow, nie z systematycznego testu.
8. **Reactour (biblioteka wymieniona w R2 v39 jako mozliwy kandydat w innych projektach) nie ma
   zadnego udokumentowanego, konkretnego zgloszenia dostepnosci mozliwego do znalezienia w tym
   przeszukaniu.** To NIE znaczy, ze biblioteka jest dostepna - znaczy, ze nie znalazlem materialu.
   Zapisane wprost w sekcji "CZEGO NIE USTALILEM".

---

## CO JUZ MAMY W R2 (krotko, z odsylaczem - nie powtarzac)

`v39/research/R2_interaktywne_wyjasnienia.md`, sekcja "PYTANIE 4", juz ustala:
- SC 2.3.3 Animation from Interactions jest poziomem AAA, nie AA (nie jest wymogiem dla targetu
  tego projektu) - mechanizm `prefers-reduced-motion` jako dobra praktyka.
- SC 2.2.2 Pause, Stop, Hide (Level A) - kazda tresc poruszajaca sie/aktualizujaca automatycznie
  dluzej niz 5 sekund potrzebuje mechanizmu pauzy.
- SC 2.1.1 Keyboard (Level A) - pelna funkcjonalnosc z klawiatury, wzorzec strzalek z ARIA APG
  dla akordeonow.
- SC 2.4.11 Focus Not Obscured - Minimum (AA) - wspomniane w kontekscie panelu `hkShowEvent`
  (inny element aplikacji, nie tour).
- SC 2.5.7 Dragging Movements (AA) i SC 2.5.8 Target Size Minimum (AA) - alternatywa dla
  przeciagania, minimum 24x24 px celu klikalnego.
- SC 1.4.1 Use of Color (A), SC 1.4.11 Non-text Contrast (AA), SC 1.4.3 Contrast Minimum (AA).
- ARIA disclosure/accordion pattern z naglowkami strukturalnymi.
- Zasada Bret Victora: statyczna czytelnosc jako fallback dostepnosci.

Ten dokument (R6) idzie dalej WYLACZNIE w obszarze: zarzadzanie fokusem przy wejsciu/wyjsciu z
kroku tour, konflikt focus trap kontra klikalny cel, konflikt globalnego Escape, dokladna
struktura ogloszen czytnika ekranu dla sekwencji krokow, oraz konkretne bledy znanych bibliotek
tourow.

---

## DELTA: ustalenia nowe

### 1. Zarzadzanie fokusem - cztery momenty, nie jeden

Materialy o modalach (W3C APG Dialog Modal Pattern) i materialy specyficzne dla tourow (Google
Chrome DevRel "persistent-app-tours.md", ExceedAbility "Product Tours & Walkthroughs") zgodnie
wyroznaja te same cztery momenty przejscia fokusu, ale zadne pojedyncze zrodlo nie opisuje
wszystkich czterech naraz dla wzorca tour - trzeba je zlozyc:

- **Wejscie w tour (start).** Fokus przechodzi do pierwszego interaktywnego elementu w kroku
  (najczesciej przycisk "Dalej" albo naglowek kroku z `tabindex="-1"`), NIE zostaje na elemencie,
  ktory uruchomil tour. Google Chrome DevRel podaje wprost wzorzec: `showPopover()` natychmiast
  po ktorym nastepuje `.focus()` na przycisku wewnatrz kroku - "Programmatically route focus
  into the... popover so keyboard/assistive technology users immediately perceive the new
  context" [5]. W3C APG Dialog Modal Pattern podaje ten sam wzorzec ogolnie dla dowolnego dialogu,
  z czterema wariantami w zaleznosci od typu tresci (prosty dialog - pierwszy fokusowalny element;
  dlugi dialog - naglowek z `tabindex="-1"`; dialog wysokiego ryzyka - najmniej destrukcyjna
  opcja) [1].
- **Przejscie do nastepnego kroku.** Ani APG, ani material specyficzny dla tourow nie precyzuje
  tego wprost dla sekwencji WIELU dialogow z rzedu (APG opisuje pojedynczy dialog, nie serie).
  Wniosek przez analogie do wzorca Carousel [6]: przy przejsciu do kolejnego slajdu/kroku fokus
  powinien zostac na tym samym elemencie strukturalnym (np. znowu na przycisku "Dalej" nowego
  kroku, albo na naglowku nowego kroku), zeby uzytkownik klawiatury nie musial za kazdym razem
  szukac punktu startowego na nowo. To jest wniosek researchera przez analogie, NIE cytat z
  zadnego zrodla - oznaczam jako sile dowodu niska/srednia.
- **Zakonczenie tour (naturalne, "Zakoncz"/ostatni krok).** ExceedAbility: "focus is dropped,
  often reset to the top of the document, rather than returned to the element that launched the
  tour" opisane jako typowy BLAD, ktorego trzeba unikac; poprawny wzorzec to zapamietanie
  elementu wyzwalajacego (`this.origin = triggerEl`) i przywrocenie na nim fokusu po zamknieciu
  [2]. To pokrywa sie z ogolna zasada W3C APG dla modali: "focus returns to the invoking element
  unless [ono] no longer exists" [1].
- **Przerwanie tour (Escape / przycisk Pomin / klik poza nakladka jesli dozwolony).** Zadne z
  zebranych zrodel nie odroznia explicite "zakonczenia" od "przerwania" pod katem gdzie ma trafic
  fokus - oba materialy (ExceedAbility i APG) traktuja to jednakowo: powrot do elementu
  wyzwalajacego. Praktyczna konsekwencja dla naszej aplikacji: jesli tour przerwany w kroku 3
  z 6 dotyczyl elementu `panPr` (panel presetow), fokus powinien wrocic na przycisk, ktory
  otworzyl tour (prawdopodobnie przycisk pomocy w headerze), NIE na `panPr` - bo `panPr` nigdy nie
  mial fokusu z inicjatywy uzytkownika. Brak zrodla wprost na ten szczegolny przypadek -
  oznaczone w "CZEGO NIE USTALILEM".

### 2. Focus trap kontra klikalny cel - rzeczywisty konflikt, dwa udokumentowane rozwiazania

To jest najwazniejsze pytanie zadane w zleceniu i najslabiej pokryte przez zrodla normatywne.
Znalezione podejscia:

- **Rozwiazanie A - w pelni modalny tour, cel NIE jest klikalny.** Nakladka ma `role="dialog"`
  `aria-modal="true"`, focus trap zamyka petle Tab wewnatrz dymka opisujacego krok, tlo (wlacznie
  z podswietlonym elementem) jest wizualnie widoczne, ale semantycznie martwe (`aria-modal="true"`
  informuje technologie asystujace, ze tresc poza dialogiem jest inert, bez koniecznosci recznego
  `aria-hidden` na kazdym elemencie tla - to jest wprost z MDN/W3C dot. `aria-modal`) [7]. To
  pasuje do trybu "tylko wskazywanie palcem" z pytania R4 kampanii.
- **Rozwiazanie B - non-modal tour, cel JEST klikalny.** Dokumentacja Popover API + wzorzec
  Google Chrome DevRel: `popover="manual"` + `role="dialog"` ale BEZ `aria-modal`, focus NIE jest
  zamkniety, tlo (i podswietlony element) pozostaje w pelni klikalny i fokusowalny z klawiatury
  (Tab wychodzi z kroku tour na reszte strony) [5][8]. Drugorzedne zrodlo (makethingsaccessible.com)
  potwierdza ogolna zasade dla dialogow non-modal: "you should not lock focus on the dialog; allow
  focus to move to all interactive page elements", z zastrzezeniem, ze potrzebny jest globalny
  skrot klawiszowy pozwalajacy przeskoczyc miedzy otwartym dialogiem a strona [8]. Zadne z
  dostepnych zrodel NIE testowalo tego wzorca w realnym audycie z uzytkownikami czytnikow ekranu -
  to jest rekomendacja architektoniczna, nie zweryfikowany wynik.
- **Nie znaleziono zrodla, ktore rozwiazuje ten konflikt jednym wzorcem uniwersalnym.** Jeden
  z materialow o coach markach (dokumentacja Oracle Smart View) formuluje to jako otwarty problem
  projektowy wprost, nie jako rozwiazany: uzytkownicy proszili, zeby klikniecie w podswietlony
  element podczas tutorialu wywolywalo jego prawdziwa funkcje "to show the user how it really
  works", co stoi w sprzecznosci z domyslnym zaleceniem trzymania focus trap dla coachmarkow [9].
  **Wniosek dla v41**: decyzja modal/non-modal MUSI byc podjeta per-tryb tour (R4 kampanii:
  "prowadzenie za reke" kontra "wskazywanie palcem"), nie jako jeden globalny wybor - to zgadza
  sie z podzialem zadanym juz w MASTER_PLAN pytania R4.

### 3. Konflikt z globalnym Escape - potwierdzony, konkretny wzorzec naprawy

MASTER_PLAN nazywa to "realnym problemem, ktory juz raz spowodowal blad w tym projekcie".
Znalazlem bezposredni precedens tej samej klasy bledu w cudzym kodzie produkcyjnym:

- **Microsoft FluentUI issue #17940**, "[Accessibility] Escape key does not only dismiss Modal
  dialogs": modal otwarty WEWNATRZ panelu (FlexPanel), Escape zamyka oba komponenty zamiast tylko
  modala - dokladnie wzorzec "zagniezdzonego dismissable", ktory nasza aplikacja ma (globalny
  handler Escape + nowy, zagniezdzony tour). Watek cytuje specyfikacje ARIA: "ESC will always
  close the dialog", ale zaznacza, ze specyfikacja NIE adresuje przypadku zagniezdzonych
  komponentow odrzucanych przez Escape. Status: oznaczone jako wymagajace investigacji, bez
  gotowej poprawki w tresci watku (2021) [3]. To NIE jest rozwiazany problem w branzy - to
  udokumentowany, wciaz otwarty typ bledu.
- **Konkretny wzorzec naprawy z materialu ogolnego o modalach** (UXPin, drugorzedne zrodlo):
  kolejnosc obslugi zdarzenia ma znaczenie - handler Escape na poziomie tour musi wywolac
  `e.stopPropagation()` PRZED tym, jak zdarzenie dotrze do globalnego handlera aplikacji, a
  globalny handler aplikacji musi sprawdzac, czy zdarzenie zostalo juz obsluzone (np. przez
  `event.defaultPrevented`) zanim wykona wlasna logike [3][10]. To jest rozwiazanie techniczne
  ogolne dla JS, nie specyficzne dla ARIA - sila dowodu srednia (dobra praktyka inzynierska,
  nie wymog normatywny WCAG).
- **Rekomendacja praktyczna dla v41**: skoro aplikacja MA juz globalny handler Escape (potwierdzone
  w MASTER_PLAN jako zrodlo wczesniejszego buga), tour musi rejestrowac wlasny listener Escape
  z `capture: true` LUB wywolywac `stopPropagation()`, a globalny handler aplikacji musi zostac
  sprawdzony pod katem tego, czy dziala na `bubble` czy `capture` fazie zdarzenia - to konkretny
  punkt do testu manualnego przed wdrozeniem, nie da sie tego zweryfikowac samym researchem.

### 4. Czytnik ekranu - rola dialogu kontra aria-live, oraz co ogłasza "krok 3 z 6"

- **`role="dialog"` + `aria-labelledby` to fundament wedlug kazdego zrodla o tourach** (Google
  Chrome DevRel [5], ExceedAbility [2]) - kontener kroku tour potrzebuje jawnej roli i etykiety,
  nie samego `<div>`.
- **`aria-describedby` NIE wystarcza samo w sobie** - zaden material nie proponuje go jako
  jedynego mechanizmu. `aria-describedby` opisuje TRESC kroku (co ten dymek mowi), ale nie
  rozwiazuje ogloszenia POZYCJI w sekwencji ("krok 3 z 6") ani zmiany fokusu przy przejsciu -
  to sa dwa osobne problemy wymagajace osobnych mechanizmow.
- **Ogloszenie pozycji "krok X z Y" najlepiej wzorowac na APG Carousel**, ktory jest jedynym
  oficjalnym wzorcem W3C obslugujacym dokladnie ten sam ksztalt problemu (sekwencja ponumerowanych
  "slajdow"): `aria-roledescription="carousel"` na kontenerze calego tour, `aria-roledescription`
  (np. "krok") na kazdym pojedynczym kroku, oraz tekst pozycyjny w stylu "3 of 10" jako czesc
  dostepnej nazwy, gdy poszczegolne kroki nie maja unikalnych, opisowych tytulow [6]. APG
  zaznacza explicite, ze etykiety nie powinny duplikowac slowa juz obecnego w
  `aria-roledescription` (nie pisac "Krok: Krok 3", tylko "3 z 6: Panel presetow") [6].
- **`aria-live` - `polite`, nie `assertive`, i NIE na calym kroku naraz.** APG Carousel:
  `aria-live="off"` dla automatycznej rotacji, `aria-live="polite"` dla rotacji sterowanej przez
  uzytkownika (nasz przypadek - uzytkownik klika "Dalej") [6]. Rowniez ExceedAbility opisuje
  wzorzec dedykowanego, ukrytego elementu `liveRegion`, do ktorego wpisywany jest tekst kroku
  przy kazdej zmianie: `this.liveRegion.textContent = 'Step ${index+1}...${step.title}...'`, co
  wg tego zrodla spelnia WCAG 4.1.3 Status Messages (Level AA) [2]. Uwaga: WCAG 4.1.3 dotyczy
  wlasnie tresci OGLASZANYCH bez przenoszenia fokusu - jesli tour PRZENOSI fokus na nowy krok (co
  jest zalecane w sekcji 1 powyzej), to samo przeniesienie fokusu JUZ powoduje odczytanie nowej
  tresci przez czytnik ekranu (bo fokus wszedl na nowy element z jego nazwa/opisem) - `aria-live`
  jest wtedy mechanizmem UZUPELNIAJACYM (np. do ogloszenia samego numeru kroku osobno), nie
  jedynym nosnikiem. Zaden material nie precyzuje tej interakcji wprost - to wniosek researchera
  z polaczenia dwoch osobnych zrodel, sila dowodu srednia.
- **Podswietlony element sam w sobie potrzebuje opisu, nie tylko dymek.** Dla SVG/canvas (relevant
  dla trybu Hooki i canvasu tej aplikacji) R2 juz ustalil potrzebe `<title>`/`<desc>` [R2, zrodlo
  27]. Delta: gdy podswietlany jest zwykly element DOM (przycisk, panel), wystarczy, ze ten
  element MA JUZ wlasna dostepna nazwe (co powinno byc prawda niezaleznie od tour) - tour nie
  musi go re-etykietowac, tylko upewnic sie, ze fokus na niego trafia i ze dymek kroku jest
  POWIAZANY z nim przez `aria-describedby` wskazujace z powrotem na ID podswietlanego elementu,
  jesli krok chce, zeby czytnik ekranu opisal "co to za element" przy nawigacji do niego.

### 5. Przyciemnienie tla i widocznosc slaba - luka potwierdzona

Zaden z materialow specyficznie o tourach (Google Chrome DevRel, ExceedAbility) NIE porusza
tematu kontrastu przyciemnienia tla ani uzytkownikow slabowidzacych explicite. To jest luka w
literaturze branzowej, nie tylko w moim researchu - warto to zapisac wprost jako fakt, nie
domyslac sie odpowiedzi. Jedyne co da sie wywnioskowac z ogolnych zasad WCAG juz ustalonych w
R2 (SC 1.4.1 Use of Color, SC 1.4.11 Non-text Contrast) [R2]: sam fakt przyciemnienia tla NIE
moze byc jedynym sposobem wskazania "to jest wazny element" - potrzebna jest ramka/obwodka z
kontrastem min. 3:1 wokol podswietlonego elementu WZGLEDEM przyciemnionego tla, bo to jest
"informacja graficzna niosaca znaczenie" w rozumieniu SC 1.4.11. To rozszerzenie logiki z R2 na
nowy przypadek, nie nowe zrodlo.

### 6. `prefers-reduced-motion` dla ruchomego spotlightu - potwierdzona luka

Przeszukanie nie znalazlo ZADNEGO zrodla opisujacego wprost animacje PRZESUWANIA spotlightu
miedzy kolejnymi podswietlanymi elementami (w odroznieniu od animacji WEJSCIA/WYJSCIA dialogu,
ktora jest dobrze opisana ogolnie). Ogolna zasada z materialow o `prefers-reduced-motion` (Josh
Comeau, CSS-Tricks, MDN) [11][12][13]: przy `prefers-reduced-motion: reduce` nalezy albo usunac
animacje, albo je wylaczyc, albo calkowicie ukryc poruszajacy sie element - zastosowana do
spotlightu oznacza: reczny "skok" bez animacji przesuniecia miedzy pozycjami zamiast plynnego
"sledzenia" kursora/elementu przez podswietlenie. To jest przeniesienie ogolnej zasady, NIE
osobne zrodlo potwierdzajace akurat ten przypadek uzycia.

### 7. Wylacznie klawiatura - operacje tour

Zaden pojedynczy material nie daje kompletnej listy skrotow dla tour, ale skladajac wzorce z
APG Dialog [1], APG Carousel [6] i ogolnych zasad klawiaturowych z R2 [R2, SC 2.1.1]:
- **Tab / Shift+Tab** - w wariancie modalnym: petla wewnatrz dymka kroku. W wariancie non-modal:
  swobodne poruszanie sie po calej stronie, wlacznie z podswietlonym elementem.
  - Zaden material nie precyzuje jednego standardowego klawisza do "Dalej" - obserwowana praktyka
    w bibliotekach to zwykly Tab+Enter na widocznym przycisku "Dalej", NIE dedykowany skrot typu
    strzalka w prawo. Brak zrodla normatywnego na temat strzalek dla przechodzenia miedzy krokami
    tour (w odroznieniu od karuzeli, gdzie strzalki SA czescia wzorca APG [6]) - oznaczone jako
    luka.
- **Escape** - zamyka caly tour (nie tylko krok), z zastrzezeniem konfliktu z sekcji 3 powyzej.
- **Pominiecie ("Skip")** - zaden zbadany material nie okresla wymogu WCAG wprost nazywajacego
  "przycisk pomin", ale logicznie wynika z SC 2.1.2 No Keyboard Trap (Level A, jeden z fundamentow
  R2 i tej sekcji): musi istniec zawsze dostepny z klawiatury sposob wyjscia, przycisk "Pomin"
  jest jedna z realizacji tego wymogu, obok samego Escape.

### 8. Powiekszenie 200%/400%, reflow, male ekrany

Nie znalazlem materialu specyficznego dla tourow na ten temat - to jest kolejna potwierdzona
luka. Da sie zastosowac ogolne SC WCAG (nizej w checkliscie: 1.4.4, 1.4.10), ale zaden z
materialow o tourach nie testowal ich w kontekscie nakladki spotlight. Jedyny logiczny wniosek
mozliwy bez dedykowanego zrodla: przy 400% powiekszenia i szerokosci okna 320px (definicja
reflow wg SC 1.4.10), dymek opisujacy krok NIE MOZE zakladac stalej pozycji wzgledem podswietlanego
elementu (np. "zawsze po prawej") - musi miec logike repozycjonowania albo spasc do jednego,
stalego miejsca (np. dol ekranu) przy waskim viewport. To jest rekomendacja inzynierska
wyprowadzona z definicji SC, nie z dedykowanego testu tourow.

---

## LISTA KONTROLNA WCAG 2.2 DLA TEGO WZORCA (numer kryterium / nazwa / co konkretnie zrobic)

Kryteria juz opisane w R2 sa oznaczone [z R2] i nie sa tu ponownie wyjasniane - podana jest
tylko dodatkowa aplikacja do samego wzorca tour.

| Kryterium | Poziom | Co konkretnie zrobic dla spotlight tour |
|---|---|---|
| 2.1.1 Keyboard [z R2] | A | Kazdy krok obslugiwalny w calosci klawiatura: focus na dymku, Tab do przyciskow Dalej/Wstecz/Pomin. |
| 2.1.2 No Keyboard Trap | A | Jesli tour uzywa focus trap (wariant modalny), MUSI istniec zawsze dostepny klawiaturowy sposob wyjscia (Escape lub widoczny przycisk Zamknij) [1][2]. Nowe wobec R2. |
| 2.2.2 Pause, Stop, Hide [z R2] | A | Dotyczy animacji przesuwania spotlightu i auto-advance jesli istnieje - musi byc pauzowalne. |
| 2.3.3 Animation from Interactions [z R2] | AAA (poza targetem) | Nie wymagane na AA, ale `prefers-reduced-motion` dla przesuwania spotlightu to dobra praktyka bez formalnego wymogu. |
| 2.4.3 Focus Order | A | Kolejnosc fokusu miedzy krokami musi byc logiczna i przewidywalna - fokus wchodzi w krok, potem (po Dalej) w kolejny krok, nie skacze losowo po stronie. Nowe wobec R2. |
| 2.4.7 Focus Visible | AA | Widoczny wskaznik fokusu na kazdym przycisku sterujacym tour ORAZ na podswietlanym elemencie, jesli ten otrzymuje fokus. Nowe wobec R2 w tym kontekscie. |
| 2.4.11 Focus Not Obscured (Minimum) | AA (nowe w 2.2) | Podswietlany element, jesli otrzymuje fokus, nie moze byc CALKOWICIE zaslonięty przez dymek opisu kroku [4]. Nowe wobec R2 (R2 uzywal go dla `hkShowEvent`, nie dla tour). |
| 2.5.7 Dragging Movements [z R2] | AA | Dotyczy, jesli spotlight ma tryb "przeciagnij po torze czasu" - kazde przeciaganie potrzebuje alternatywy klikiem. |
| 2.5.8 Target Size Minimum [z R2] | AA | Przyciski Dalej/Wstecz/Pomin/Zamknij min. 24x24 px klikalnego obszaru. |
| 3.2.6 Consistent Help | A (nowe w 2.2) | Jesli przycisk uruchamiajacy tour ("samouczek") jest traktowany jako mechanizm pomocy, musi wystepowac w tym samym wzglednym miejscu na kazdym ekranie aplikacji, gdzie taki przycisk istnieje [14][15]. Nowe, nieobecne w R2. Zastosowanie warunkowe - zalezy, czy przycisk startu tour ma byc klasyfikowany jako "help mechanism" w rozumieniu SC. |
| 4.1.2 Name, Role, Value | A | Kontener kroku ma `role="dialog"` + `aria-labelledby`/`aria-label`; przyciski maja jasne dostepne nazwy [5]. Nowe wobec R2 w tym kontekscie. |
| 4.1.3 Status Messages | AA | Zmiana kroku ogloszona przez `aria-live="polite"` region (wzorowany na APG Carousel) niezaleznie od przeniesienia fokusu [2][6]. Nowe, nieobecne w R2. |
| 1.3.2 Meaningful Sequence | A | Kolejnosc DOM dymka opisu i przyciskow musi odpowiadac kolejnosci logicznej/wizualnej - istotne, jesli dymek jest teleportowany w DOM blisko podswietlanego elementu. Nowe wobec R2. |
| 1.4.1 Use of Color [z R2] | A | Podswietlenie nie moze byc jedynym sygnalem "to jest wazne teraz" - patrz sekcja DELTA 5. |
| 1.4.4 Resize Text | AA | Tresc dymka kroku musi pozostac czytelna przy powiekszeniu 200% bez utraty funkcjonalnosci. Nowe wobec R2, nie zweryfikowane dedykowanym zrodlem dla tourow (patrz DELTA 8). |
| 1.4.10 Reflow | AA | Przy szerokosci 320px CSS (odpowiadajacej 400% powiekszenia na typowym ekranie) dymek nie moze wymagac przewijania w dwoch wymiarach; repozycjonowanie wzgledem podswietlanego elementu musi dzialac na waskim viewport. Nowe wobec R2, nie zweryfikowane dedykowanym zrodlem dla tourow (patrz DELTA 8). |
| 1.4.11 Non-text Contrast [z R2] | AA | Obwodka/ramka podswietlenia potrzebuje kontrastu min. 3:1 wobec przyciemnionego tla. |

---

## PULAPKI ZNANYCH BIBLIOTEK

Wszystkie ponizsze zrodla to material bezposrednio od projektu open source (nie od firmy
sprzedajacej platny produkt SaaS onboardingowy) - traktuje je jako material z NISKIM konfliktem
interesow (autorzy zglaszajacy bledy nie maja interesu w zatajaniu ich), ale sam projekt moze
miec pusredni interes wizerunkowy w minimalizowaniu problemu w komunikacji publicznej.

- **Shepherd.js** (shipshapecode/shepherd). Issue #198 "Accessibility support": w momencie
  zgloszenia "there are no ARIA attributes on any Shepherd elements", brak `nav` wokol przyciskow
  nawigacji, odniesienie do wczesniejszego zgloszenia #26 zamknietego "bez wyjasnienia" [16].
  Oficjalna strona projektu deklaruje obecnie "full keyboard navigation support, focus trapping,
  and a11y compliance via aria attributes" [17] - **nie zweryfikowalem tej deklaracji niezaleznym
  audytem**, to twierdzenie producenta o wlasnym produkcie, wiec z definicji ma konflikt
  interesow, mimo ze sam Shepherd jest darmowy/open source (interes wizerunkowy, nie sprzedazowy
  bezposrednio).
- **Intro.js** (usablica/intro.js). Issue #426: zglaszane braki `aria-live` i `role`, oraz
  konkretny, techniczny detal - fokusowanie przycisku w kroku PRZERYWALO automatyczne odczytanie
  opisu kroku przez VoiceOver, podczas gdy fokusowanie samego tekstu dymka dzialalo poprawnie
  [18]. To jest bardzo konkretny, odtwarzalny blad interakcji fokus/VoiceOver, nie ogolnik.
- **Driver.js** (kamranahmedse/driver.js). Issue #434, wynik testu automatycznego cypress-axe:
  (a) duplikat landmarku "banner" bo naglowek popovera uzywa tagu `header`, konfliktujacego z
  glownym naglowkiem strony; (b) brak unikalnej roli/etykiety elementu; (c) brak `aria-label` na
  `#driver-popover-content`; (d) blednie uzyty `aria-expanded` na elemencie, ktory nie jest
  rozwijalnym menu (`#driver-dummy-element`), usuniety przez zglaszajacego bez utraty
  funkcjonalnosci [19]. Issue #24 osobno: podswietlony element NIE ma focus trap, Tab wychodzi
  poza jego granice mimo wizualnego podswietlenia - dokladnie ten problem, ktory ta kampania
  bada w pytaniu R6 [20]. Driver.js uzywa tez `<a href="javascript:void(0)">` zamiast `<button>`
  dla przyciskow popovera, co lamie aktywacje klawiszem Spacja [19].
- **Reactour.** Przeszukanie nie znalazlo zadnego konkretnego zgloszenia dostepnosci mozliwego
  do zacytowania (patrz CZEGO NIE USTALILEM) - **brak dowodu nie jest dowodem braku problemu**.

**Wzorzec wspolny widoczny we wszystkich trzech udokumentowanych przypadkach**: bledy dostepnosci
w bibliotekach tourow sa zglaszane PRZEZ UZYTKOWNIKOW post-factum, nie wykryte przez wewnetrzny
audyt producenta przed wydaniem. Zaden z trzech watkow nie cytuje formalnego audytu WCAG
zamowionego przez producenta biblioteki. To wzmacnia ryzyko nazwane w MASTER_PLAN kampanii -
przyjecie gotowej biblioteki "z pudelka" bez wlasnej weryfikacji jest ryzykowne dokladnie w tych
punktach, ktore R6 mial zbadac (fokus na podswietlonym elemencie, Escape, ogloszenia czytnika
ekranu).

---

## CZEGO NIE USTALILEM

1. **Nie ma oficjalnego wzorca W3C ARIA APG dla "guided tour"** - wszystkie rekomendacje w tym
   dokumencie dotyczace struktury tour sa zlozeniem wzorcow Dialog + Carousel + Disclosure przez
   analogie, NIE cytatem z jednego autorytatywnego zrodla dedykowanego temu wzorcowi. To jest
   luka w samej branzy dostepnosci, nie w moim researchu.
2. **Nie znalazlem zadnego formalnego, niezaleznego audytu WCAG** (np. przez firme audytorska typu
   Deque, TPGi, Level Access) zadnej z bibliotek tourow (Shepherd, Intro.js, Driver.js, Reactour).
   Wszystkie znalezione dane pochodza z pojedynczych zgloszen na GitHub, nie z systematycznego
   testu z uzytkownikami czytnikow ekranu.
3. **Reactour** - zero konkretnych zgloszen dostepnosci znalezionych w tym przeszukaniu. Nie
   wiem, czy to znaczy, ze biblioteka jest lepsza, czy ze jej uzytkownicy nie zglaszaja bledow
   publicznie, czy ze przeszukanie nie trafilo na wlasciwe slowa kluczowe.
4. **Kolejnosc fokusu MIEDZY kolejnymi krokami tour** (nie wejscie/wyjscie z calego tour, tylko
   przejscie krok->krok) nie jest opisana w zadnym znalezionym zrodle wprost dla wzorca tour -
   rekomendacja w sekcji DELTA 1 to wniosek przez analogie do karuzeli, nie potwierdzony wzorzec.
5. **Powiazanie `aria-live` i przeniesienia fokusu przy zmianie kroku** (czy oba dzialaja razem
   bez duplikowania ogloszenia, czy trzeba wybrac jedno) nie jest rozstrzygniete zadnym
   znalezionym zrodlem - to potencjalny problem praktyczny (podwojne, nakladajace sie ogloszenia
   czytnika ekranu), ktory wymaga testu z prawdziwym czytnikiem ekranu (NVDA/VoiceOver), nie da
   sie go rozstrzygnac samym researchem tekstowym.
6. **Zachowanie przy powiekszeniu 200%/400% i reflow** dla spotlight overlay nie ma dedykowanego
   zrodla - wnioski w DELTA 8 sa wyprowadzone z ogolnej definicji SC 1.4.4/1.4.10, nie z testu
   konkretnie tego wzorca.
7. **Kontrast przyciemnienia tla i widocznosc dla slabowidzacych** - zero dedykowanego materialu
   znalezionego, mimo proby bezposredniego wyszukania. Nie wiem, czy istnieje badanie na ten
   temat pod inna terminologia, ktorej nie uzylem w zapytaniach.
8. **Czy globalny handler Escape naszej wlasnej aplikacji dziala na fazie `capture` czy `bubble`**
   nie jest czyms, co da sie ustalic researchem zewnetrznym - to wymaga przeczytania wlasnego
   kodu aplikacji, co jest poza zakresem tego zlecenia (czysto researchowego).
9. **Skrot klawiszowy do przechodzenia miedzy krokami tour (strzalki vs. wylacznie Tab+Enter)**
   nie ma jednego ustalonego standardu w zbadanych zrodlach - obserwacja praktyki bibliotek, nie
   norma.

---

## ZRODLA (URL + etykieta konfliktu interesow)

[1] W3C WAI-ARIA Authoring Practices Guide, "Dialog (Modal) Pattern",
https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ - zrodlo normatywne, brak konfliktu
interesow.

[2] ExceedAbility, "Product Tours & Walkthroughs: Accessibility Guide",
https://exceedability.com/product-tours.html - firma konsultingowa ds. dostepnosci; POSREDNI
konflikt interesow (sprzedaje audyty/uslugi dostepnosci, nie oprogramowanie do tourow), material
traktowany jako wiarygodny co do faktow technicznych, ale z nastawieniem promujacym potrzebe
audytu.

[3] GitHub, microsoft/fluentui, issue #17940, "[Accessibility] Escape key does not only dismiss
Modal dialogs", https://github.com/microsoft/fluentui/issues/17940 - zrodlo pierwotne (zgloszenie
buga w projekcie open source), brak konfliktu interesow.

[4] W3C WAI, "Understanding Success Criterion 2.4.11: Focus Not Obscured (Minimum)",
https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html - zrodlo normatywne,
brak konfliktu interesow.

[5] GoogleChrome/modern-web-guidance, "persistent-app-tours.md",
https://github.com/GoogleChrome/modern-web-guidance/blob/main/skills/modern-web-guidance/guides/ui-components/persistent-app-tours.md
- material Google Chrome DevRel, dystrybuowany darmowo jako wytyczne przegladarki, nie sprzedaje
oprogramowania do tourow; NISKI konflikt interesow (mozliwa motywacja promowania Popover API,
funkcji Chrome), ale nie sprzedaje produktu onboardingowego wprost.

[6] W3C WAI-ARIA Authoring Practices Guide, "Carousel Pattern",
https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ - zrodlo normatywne, brak konfliktu interesow.

[7] MDN Web Docs, "ARIA: aria-modal attribute",
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-modal
- zrodlo dokumentacyjne niezalezne, brak konfliktu interesow.

[8] Make Things Accessible, "Modal vs non-modal dialogs",
https://www.makethingsaccessible.com/guides/modal-vs-non-modal-dialogs/ - blog niezalezny,
brak wykrytego konfliktu interesow zwiazanego z produktem.

[9] Oracle, dokumentacja Smart View / EPM, "Controlling Focus on Coach Marks and Teaching
Bubbles",
https://docs.oracle.com/en/cloud/saas/enterprise-performance-management-common/acgui/control_focus_teaching_bubbles_smartview365.html
- dokumentacja produktu Oracle (Oracle sprzedaje wlasny produkt z coachmarkami, nie osobne
narzedzie do tourow) - POSREDNI konflikt interesow, uzyte tylko jako ilustracja realnego
przypadku uzytkownika, nie jako dowod na najlepsza praktyke.

[10] UXPin, "How to Build Accessible Modals with Focus Traps (2026 Guide)",
https://www.uxpin.com/studio/blog/how-to-build-accessible-modals-with-focus-traps/ - UXPin
sprzedaje narzedzie do projektowania UI (nie bezposrednio tour software), POSREDNI konflikt
interesow (blog marketingowy platformy projektowej).

[11] Josh W. Comeau, "Accessible Animations in React with prefers-reduced-motion",
https://www.joshwcomeau.com/react/prefers-reduced-motion/ - blog osobisty, brak konfliktu
interesow zwiazanego z produktem.

[12] CSS-Tricks, "prefers-reduced-motion",
https://css-tricks.com/almanac/rules/m/media/prefers-reduced-motion/ - portal niezalezny,
brak konfliktu interesow.

[13] MDN Web Docs, "prefers-reduced-motion CSS media feature",
https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion - zrodlo
dokumentacyjne niezalezne, brak konfliktu interesow.

[14] DigitalA11Y, "Understanding WCAG SC 3.2.6 Consistent Help (Level A)",
https://www.digitala11y.com/understanding-wcag-sc-3-2-6-consistent-help-level-a/ - portal
niezalezny specjalizujacy sie w dostepnosci, mozliwy POSREDNI interes w promowaniu tematu
audytow, ale nie sprzedaje tour software.

[15] Vispero, "How to test 3.2.6 Consistent Help",
https://vispero.com/resources/how-to-test-3-2-6-consistent-help/ - Vispero produkuje JAWS
(czytnik ekranu) i narzedzia dostepnosci, POSREDNI konflikt interesow (branza dostepnosci
ogolnie), ale nie tour software konkretnie.

[16] GitHub, shipshapecode/shepherd, issue #198, "Accessibility support",
https://github.com/shipshapecode/shepherd/issues/198 - zrodlo pierwotne (zgloszenie w projekcie
open source, ktory jest jednoczesnie produktem, ktory ta kampania ocenia) - WYSOKI konflikt
interesow po stronie odpowiedzi zaufyciela projektu, ZEROWY po stronie osoby zglaszajacej blad.

[17] Shepherd.js, strona oficjalna, https://www.shepherdjs.dev/ - producent narzedzia do tourow,
WYSOKI konflikt interesow - deklaracja "full a11y compliance" NIE zweryfikowana niezaleznie w
tym researchu, traktowana jako material marketingowy, nie dowod.

[18] GitHub, usablica/intro.js, issue #426, "Accessibility improvements",
https://github.com/usablica/intro.js/issues/426 - zrodlo pierwotne (zgloszenie w projekcie open
source bedacym produktem ocenianym), ZEROWY konflikt interesow po stronie zglaszajacego.

[19] GitHub, kamranahmedse/driver.js, issue #434, "Accessibility testing issues",
https://github.com/kamranahmedse/driver.js/issues/434 - zrodlo pierwotne, ZEROWY konflikt
interesow po stronie zglaszajacego (wynik automatycznego testu cypress-axe).

[20] GitHub, kamranahmedse/driver.js, issue #24, "Accessibility improvements",
https://github.com/kamranahmedse/driver.js/issues/24 - zrodlo pierwotne, ZEROWY konflikt
interesow po stronie zglaszajacego.

Dodatkowo przeszukano bez uzytecznego wyniku (odnotowane w CZEGO NIE USTALILEM):
zapytania o Reactour + accessibility nie zwrocily zadnego bezposredniego, cytowalnego zrodla
o bledach dostepnosci tej konkretnej biblioteki.
