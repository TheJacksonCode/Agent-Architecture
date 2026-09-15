# PLAN BUDOWY - samouczek w aplikacji (v41)

Data: 2026-09-14. Zlecenie Macieja: "mozesz ruszac z rozpisaniem planu budowy".

**To jest DOKUMENT, nie kod.** Do `v40/AGENT_TEAMS_CONFIGURATOR_v40.html` nie zostal
dopisany ani jeden znak. Budowa zaczyna sie dopiero po osobnym slowie Macieja.

Poprzedniki: `MASTER_PLAN.md` (brief kampanii), `plans/SYNTHESIS.md` (dokument decyzyjny),
`research/CRITIC.md` (werdykt REVISE), `PROGRESS.md` (sekcja PO KOMPAKCJI - cztery kroki).

---

## 0. CO ZMIENILO SIE OD SYNTEZY

Plan powstal przez sprawdzenie kazdej kotwicy w zywym pliku v40, a nie przez przepisanie
tabeli z syntezy. Cztery ustalenia, ktorych kampania badawcza nie miala, bo patrzyla
na zrodla zewnetrzne, a nie na kod:

**1. `learnO` NIE JEST KOTWICA. To ukryta nakladka, nie przycisk.**
`v40:1607` mowi `.learn-overlay{position:absolute;...;display:none}`, a `v40:2828` to
`<div class="learn-overlay" id="learnO">`. Czyli element, na ktory MASTER_PLAN, SYNTHESIS
i sekcja PO KOMPAKCJI zgodnie kazaly wskazac w ostatnim kroku, jest **niewidoczny az do
momentu, w ktorym uzytkownik sam otworzy encyklopedie**. Test widocznosci odrzucilby ten
krok i samouczek po cichu skroclby sie do trzech krokow. Blad przeszedl przez cala
kampanie, bo nikt nie zajrzal do CSS. Rozwiniecie: decyzja **D9**.

**2. Encyklopedia nie ma wejscia frontowego.** Wszystkie dwanascie wywolan `otworzEncykl()`
w pliku to `otworzEncykl('agent', id)` albo `otworzEncykl('preset', id)` - zaden nie
otwiera encyklopedii jako takiej. Zeby sie do niej dostac, trzeba najpierw zaznaczyc
agenta albo preset. Slowo "Encyklopedia" w interfejsie pojawia sie **trzy razy** i zawsze
wewnatrz karty konkretnego bytu. Sztandarowa warstwa edukacyjna aplikacji jest za dwoma
klikami i nie ma stalego adresu.

**3. Kotwica kroku drugiego byla za waska.** `panAg` to zawartosc zakladki Agenci.
Pasek trzech zakladek (`Agenci / Presety / Zapisane`) lezy OBOK, w `.sl-tabs`, poza
`panAg`. Tekst kroku mowi o wszystkich trzech, wiec podswietlenie `panAg` pokazywaloby
liste agentow, a przemilczalo to, o czym zdanie mowi. Kotwica ma byc `sL` - cala kolumna.

**4. Przy szerokosci ponizej 700px lewy panel znika calkowicie.**
`v40:1735` mowi `@media(max-width:700px){.side-l{display:none}}`. To nie jest hipoteza
o tym, po co nam test widocznosci - to gotowy, dzialajacy przypadek. Na waskim ekranie
samouczek ma cztery kroki, a pokaze trzy. Rozwiniecie: decyzja **D8**.

Dodatkowo potwierdzone jako prawdziwe: `ladujPreset('deep_five_minds')` odpala sie
w inicjalizacji (`v40:35792`), wiec canvas **nigdy nie jest pusty** przy pierwszym wejsciu;
`costHud` jest zawsze renderowany, takze przy zerowym koszcie (`v40:33147`), wiec kotwica
kroku trzeciego nie zapada sie do zera; `currentLang` startuje z `'en'` (`v40:15658`)
i `navigator.language` nie wystepuje w pliku ani razu.

---

## 1. ZAKRES

**Budujemy:** kregoslup na cztery kroki, ktory przy pierwszym wejsciu pokazuje, GDZIE
w aplikacji co jest, wskazujac elementy zamiast klikac za uzytkownika, i zostaje dostepny
na stale pod wlasnym przyciskiem.

**Nie budujemy w tej wersji:** Aktu 2 (zapisane, kreator wlasnego agenta, zakladki prawego
panelu, dol canvasu, motyw, skroty), telemetrii z sekcji 8 syntezy, samouczkow wewnatrz
trybow Hooki i Wzorce - te maja wlasne lekcje i tour po nich bylby lekcja o lekcji.

**Nie budujemy nigdy:** prowadzenia za reke, czyli klikania w imieniu uzytkownika.
Uzasadnienie jest inzynierskie, nie badawcze: R4 nie znalazl zrodel po zadnej stronie,
ale auto-klikanie wymaga odtwarzania stanu aplikacji krok po kroku i sprzatania po
przerwaniu w polowie. Wskazywanie tego kosztu nie ma.

---

## 2. DZIEWIEC DECYZJI CZEKAJACYCH NA MACIEJA

Siedem pochodzi z `SYNTHESIS.md` sekcja 7 i **nadal nie sa rozstrzygniete**. Dwie ostatnie
wyszly dopiero przy pisaniu tego planu, z pliku, nie z literatury.

Zadna nie jest zamknieta. Przy kazdej stoi moja rekomendacja i uczciwa alternatywa,
plus to, co konkretnie zmienia sie w budowie, jesli Maciej wybierze inaczej.

### D1. Start automatyczny czy na zaproszenie?
- **Moja rekomendacja:** automatyczny, z trzema warunkami: jeden widoczny przycisk wyjscia
  (nie dwa osobne), start po pelnym zaladowaniu, zero blokowania reszty interfejsu.
- **Alternatywa:** delikatny pasek "pierwszy raz tutaj? pokaz mi" - bezpieczniejszy wobec
  krytyki NN/g, kosztem gwarancji, ze ktokolwiek to zobaczy.
- **Sila dowodu:** zadna. R2 nie rozstrzygnal. To osad.
- **Co zmienia w budowie:** jedna galaz w `tutAutoStart()`. Roznica pol godziny.

### D2. Samouczek klika sam czy czeka?
- **Moja rekomendacja:** wskazuje i czeka. Patrz sekcja 1, powod inzynierski.
- **Alternatywa:** klika za uzytkownika przy krokach pokazowych.
- **Sila dowodu:** zero zrodel po obu stronach (R4, potwierdzone przez krytyka - wczesniejsza
  parafraza "NN/g rekomenduje wskazywanie" nie istnieje w zrodle NN/g w zadnej formie).
- **Co zmienia w budowie:** przy wyborze alternatywy dochodzi cala warstwa odtwarzania
  i cofania stanu. To nie jest wariant, to drugi projekt.

### D3. Ile krokow w Akcie 1?
- **Moja rekomendacja:** cztery (sekcja 4 tego planu).
- **Alternatywy:** trzy (ostrozniej) albo piec, jesli Maciej uzna, ze symulacja musi byc
  osobnym krokiem, a nie mikro-akcja.
- **Sila dowodu:** zadna liczba nie ma pokrycia. Liczba "szesc" wypadla, bo opierala sie
  na danych Chameleon, ktorych **nie ma w zadnym dokumencie Chameleon**.
- **Co zmienia w budowie:** jeden wiersz w tablicy danych. Zero kodu.

### D4. `costHud` i `simBtn` w Akcie 1 czy w Akcie 2?
- **Moja rekomendacja:** `costHud` w Akcie 1, `simBtn` jako mikro-akcja w kroku pierwszym.
  **To jest swiadome odejscie od syntezy**, ktora zeslala oba do Aktu 2. Powod: `CLAUDE.md`
  mowi wprost, ze celem aplikacji jest zrozumiec, ile zespol kosztuje, zanim wydasz token.
  Uzytkownik, ktory wychodzi z samouczka nie wiedzac, ze aplikacja to liczy, przegapil
  funkcje sztandarowa.
- **Alternatywa:** trzymac sie syntezy i zejsc do trzech krokow.
- **Sila dowodu:** zero zrodel po ktorejkolwiek stronie. Czysta decyzja redakcyjna.
- **Co zmienia w budowie:** jeden wiersz w tablicy.

### D5. Gotowa biblioteka czy wlasny silnik?
- **Moja rekomendacja:** wlasny, minimalny. Aplikacja jest zero-zaleznosci z zasady,
  a Shepherd, Intro.js i Driver.js maja kazdy co najmniej jedno zgloszone zaniedbanie
  dostepnosci i zaden nie ma udokumentowanego audytu WCAG. Import biblioteki i tak
  konczy sie przepisywaniem warstwy ARIA.
- **Alternatywa:** brak sensownej. To jedyna z dziewieciu, przy ktorej trudno mi napisac
  uczciwa druga strone.
- **Szacunek objetosci:** okolo 200 wierszy silnika plus okolo 120 wierszy CSS.

### D6. Pytac ponownie kogos, kto raz odrzucil?
- **Moja rekomendacja:** nie pytac po raz drugi na podstawie liczby wizyt. Zapamietac
  odmowe w `localStorage` i zostawic przycisk.
- **Alternatywa:** podpowiedziec na podstawie zachowania (brak interakcji z kotwicami
  przez jakis czas) - ale to nowy mechanizm obserwacji, ktorego dzis nie ma.
- **Sila dowodu:** R2 nie znalazl zadnego zrodla.
- **Co zmienia w budowie:** rekomendacja to jeden klucz w `localStorage`. Alternatywa
  to licznik zdarzen i heurystyka, czyli osobna funkcja.

### D7. "Pomin" i "X" - jeden przycisk czy dwa?
- **Moja rekomendacja:** jeden. Zgodne z synteza.
- **Alternatywa:** dwa, jesli Maciej uzna, ze "wyjdz z tego kroku" i "wyjdz z calego
  samouczka" to rozne intencje.
- **Sila dowodu:** brak zrodla ilosciowego.

### D8. NOWA. Co robic na ekranie ponizej 700px, gdzie lewy panel nie istnieje?
Kotwica kroku drugiego znika razem z `.side-l`. Test widocznosci zadziala poprawnie
i **po cichu wytnie krok**, czyli samouczek pokaze trzy kroki zamiast czterech, a pasek
postepu bedzie sie zgadzal, bo liczy kroki po filtrze.
- **Moja rekomendacja:** zaakceptowac ciche pominiecie. Na takim ekranie tego panelu
  naprawde nie ma, wiec opowiadanie o nim byloby klamstwem, a nie pomoca.
- **Alternatywa:** wersja zapasowa tekstu bez kotwicy ("na szerszym ekranie po lewej
  stronie jest biblioteka..."), pokazywana na srodku ekranu.
- **Co zmienia w budowie:** alternatywa wymaga dodatkowego pola `bezKotwicy` w danych
  i drugiego trybu wyswietlania dymka. Okolo 30 wierszy wiecej.

### D9. NAJWAZNIEJSZA. Jak samouczek ma wskazac encyklopedie, skoro ona nie ma przycisku?
Patrz sekcja 0, punkty 1 i 2. Trzy drogi:

| | Co robimy | Koszt | Ryzyko |
|---|---|---|---|
| **A** | Nowy przycisk "Encyklopedia" w naglowku, stale obecny, `id="encyklBtn"` | Nowa funkcja aplikacji, nie tylko przygotowanie pod samouczek | Poszerzenie zakresu bez zlecenia |
| **B** | Nadac `id` istniejacemu przyciskowi "Poznaj ten preset" w prawym panelu (`v40:34081`) | Jeden atrybut, jedno miejsce renderowania | Przycisk istnieje tylko wtedy, gdy preset jest wybrany - przy pierwszym wejsciu JEST, bo `ladujPreset` wola `pokazInfoPr` |
| **C** | Wyciac encyklopedie z kroku czwartego, zostawic samo "wrocisz tu w kazdej chwili" | Zero | Samouczek przemilcza najwiekszy zasob aplikacji |

- **Moja rekomendacja: B na teraz, A do rozwazenia osobno.**
  B jest buildowalne dzis, kosztuje jeden atrybut i trafia w element, ktory przy pierwszym
  wejsciu jest widoczny i nazywa sie w interfejsie wprost "ENCYKLOPEDIA / Poznaj ten preset".
  A jest prawdopodobnie sluszne jako funkcja, ale to osobna decyzja produktowa, nie
  przygotowanie pod samouczek, i nie wejdzie do tego planu bez wyraznego slowa.
- **Uwaga uczciwa:** to, ze samouczek nie umie wskazac encyklopedii, jest **sygnalem
  o aplikacji, nie o samouczku**. Jesli kregoslup nie potrafi pokazac czegos palcem,
  to zwykle znaczy, ze uzytkownik tez nie potrafi tego znalezc.

---

## 3. ARCHITEKTURA: DANE OSOBNO OD SILNIKA

Ustalenie sprzed kampanii, utrzymane bez zmian. Wpisuje je tu jako wiazace, bo to jedyna
rzecz w calym przedsiewzieciu, ktora zdecyduje o tym, czy samouczek przezyje v42.

**Jedna tablica, jeden wiersz na krok. Silnik nie wie nic o tresci.**

```js
/* Kroki samouczka. Dodanie sekcji do aplikacji = dopisanie JEDNEGO wiersza tutaj.
   Silnik ponizej nie zna zadnej nazwy z tej tablicy. */
var TUT_KROKI=[
  {id:'canvas', akt:1, kotw:'svg',     dod:['phaseBar'], tPL:'...', tEN:'...',
   oPL:'...', oEN:'...', akcja:{kotw:'simBtn', pPL:'...', pEN:'...'}},
  ...
];
```

Pola: `id` (stabilny klucz, uzywany w `localStorage` i w testach), `akt`, `kotw`
(**identyfikator elementu, nic innego**), `dod` (dodatkowe identyfikatory obejmowane
tym samym podswietleniem), `tPL`/`tEN` (tytul), `oPL`/`oEN` (opis), `akcja`
(opcjonalna mikro-zacheta, ktora wskazuje inny element i **czeka na klik uzytkownika**).

**Zelazna regula kotwicy:** wylacznie `id` elementu. Nigdy selektor CSS, nigdy
"trzeci przycisk w rzedzie", nigdy wspolrzedne. Uzasadnienie ma pomiar: dwanascie kotwic
kregoslupa sprawdzono w wersjach v32 do v40 - dziewiec wersji, zero zmian nazw, zero
znikniec. Jedyna roznica to `hookiBtn`, ktorego nie ma w v32 i v33, bo tryb Hooki
powstal dopiero w v34. Nazwy `id` sa w tym pliku stabilniejsze niz cokolwiek innego.

**Jezyk.** Funkcja `tutT(pl,en)` w dokladnie tym samym ksztalcie, co juz istniejace
`wzT` (`v40:37818`) i `hkT` (`v40:35952`). Nie dopisujemy nic do slownika `I18N_EN.ui` -
teksty krokow to zdania, nie etykiety, a slownik jest dla etykiet. Ta sama decyzja,
co przy Wzorcach i Hookach.

---

## 4. CZTERY KROKI AKTU 1

Teksty ponizej sa **robocze i bez polskich znakow**, bo ten plik jest dokumentem
(konwencja DD49). Patrz pulapka P1 w sekcji 11 - przepisanie ich do HTML w tej postaci
byloby powtorzeniem bledu, ktory naprawialismy przez cala poprzednia sesje.

Angielskie odpowiedniki sa do napisania przy budowie, parytet obowiazkowy.

### Krok 1 - Canvas
- **Kotwica:** `svg`. Dodatkowo `phaseBar`.
- **PL:** "Na srodku stoi gotowy zespol, ktory wczytal sie sam. Kazdy kafelek to jeden
  agent, linie pokazuja, kto komu przekazuje prace, a pasek u gory dzieli ja na fazy."
- **Mikro-akcja (D4):** wskazac `simBtn`, zdanie w rodzaju "kliknij Symulacja i zobacz,
  jak ten zespol pracuje". **Uzytkownik klika sam.**
- **Dlaczego pierwszy:** zaczynamy od tego, na co uzytkownik i tak juz patrzy. To tez
  jedyny krok, ktory cos WYJASNIA, a nie tylko lokalizuje.
- **Fakt sprawdzony:** `ladujPreset('deep_five_minds')` odpala sie w inicjalizacji
  (`v40:35792`), wiec canvas nigdy nie jest pusty przy pierwszym wejsciu.

### Krok 2 - Lewy panel
- **Kotwica:** `sL`. **Poprawka wobec zapisu sprzed kompakcji** (bylo `panAg`) - patrz
  sekcja 0 punkt 3.
- **PL:** "Stad bierzesz elementy. Agenci to pojedynczy specjalisci, Presety to gotowe
  zespoly jak ten na canvasie, Zapisane to Twoje wlasne uklady."
- **Znika ponizej 700px** - patrz D8.

### Krok 3 - Koszt
- **Kotwica:** `costHud`.
- **PL:** "Tu widzisz, ile ten zespol kosztuje, zanim go uruchomisz. Kliknij, zeby
  zobaczyc rozbicie na agentow."
- **Fakt sprawdzony:** `costHud` to przycisk wolajacy `pokazCostBreakdown()`, renderowany
  zawsze, takze przy zerowym koszcie (`v40:33147`).
- **Uwaga:** ten krok wisi na kotwicy, ktora ma dzis dwa atrybuty `id`. Naprawa: Z4.

### Krok 4 - Encyklopedia i powrot
- **Kotwica:** zalezna od **D9**. Przy rekomendacji B: nowy `id` na przycisku
  "Poznaj ten preset".
- **PL:** "Kazdy agent i kazdy zespol ma tu swoja strone z opisem i wycena. A ten
  samouczek odpalisz ponownie w kazdej chwili, tym przyciskiem."
- **Dlaczego ostatni:** wskazuje wlasne wejscie. To czesc z najmocniejszym poparciem
  w researchu (R7: encyklopedie rozwiazuja orientacje trwala nawigacja, nie jednorazowa
  wycieczka), wiec niech bedzie ostatnia rzecza, jaka uzytkownik zobaczy.
- **Zastrzezenie:** drugie zdanie wskazuje INNY element niz pierwsze. Albo dzielimy to
  na krok 4 i karte koncowa, albo podswietlamy oba (`kotw` + `dod`). Rekomendacja:
  karta koncowa, bo to juz nie jest krok mapy, tylko pozegnanie.

### Co wypadlo z szostki syntezy i dlaczego
1. **Ekran powitalny** - krok, ktory nic nie pokazuje. Zdanie "co to za narzedzie"
   wchodzi do dymka kroku pierwszego.
2. **Jezyk** - zamiast uczyc, gdzie naprawic zly jezyk, **naprawic go automatycznie**
   (Z3). Polski uzytkownik przy pierwszym wejsciu dostaje dzis angielski interfejs.
3. **Presety jako osobny krok** - "lewy panel jest biblioteka i ma trzy zakladki"
   to jedna mysl, nie trzy.

### Akt 2 - parking, nie do budowy teraz
`panSv`, kreator wlasnego agenta, zakladki prawego panelu, dol canvasu, `themeToggle`,
skroty klawiszowe, `hookiBtn`, `wzorceBtn`. Kazde z nich to jeden wiersz w tablicy
w dniu, w ktorym Maciej powie "teraz Akt 2".

---

## 5. PIEC ZMIAN W ISTNIEJACYM PLIKU

Bez nich kroki nie zadzialaja. Wszystkie sa male i wszystkie sa **poza silnikiem
samouczka**, wiec maja wlasna wartosc niezaleznie od tego, czy samouczek powstanie.

### Z1. Przycisk odpalajacy samouczek - NIE ISTNIEJE
Krok czwarty na niego wskazuje, wiec bez niego nie ma kotwicy. Miejsce: `.tb-util`
w naglowku, tuz przed przyciskiem `?`. Powod umiejscowienia: to jest mechanizm pomocy,
a WCAG 3.2.6 Consistent Help chce pomocy w tym samym wzglednym miejscu. Sasiedztwo
ze znakiem zapytania mowi to samo bez slow.
```html
<button class="btn" id="tutBtn" onclick="tutStart(1)" aria-label="...">...</button>
```
Prefiks `tut` jest wolny: `\btut[A-Z]` wystepuje w calym pliku **zero razy**.

### Z2. Identyfikator dla przycisku skrotow klawiszowych
Dzis: `<button class="btn" onclick="pokazSkroty()" aria-label="Skróty klawiszowe">?</button>`
(`v40:2767`). Ma `onclick` i `aria-label`, nie ma `id`. Potrzebny dopiero w Akcie 2,
ale to jeden atrybut i lepiej go dopisac razem z Z1, skoro i tak dotykamy tego miejsca.

### Z3. Wykrywanie `navigator.language`
Dzis `v40:15658`: `let currentLang = localStorage.getItem('acV32_lang') || 'en';`
`navigator.language` wystepuje w pliku **zero razy**. Polski uzytkownik przy pierwszym
wejsciu dostaje angielski interfejs i sam musi znalezc przelacznik.

Poprawka: brak zapisanego wyboru plus przegladarka mowiaca `pl` daje polski. Zapisany
wybor uzytkownika ma **zawsze** pierwszenstwo przed przegladarka - inaczej odbieramy
komus swiadoma decyzje.

**To jest poprawka warta wiecej niz krok samouczka**, bo dziala takze dla kogos,
kto samouczek pominie.

### Z4. Podwojne `id` na `costHud`
`v40:2766`:
```html
<button class="tb-cost sev-safe" id="costHud" onclick="pokazCostBreakdown()" id="costHudTip" aria-label="...">
```
Dwa atrybuty `id` w jednym znaczniku. Przegladarka honoruje pierwszy, `costHudTip`
jest martwy i nigdzie w kodzie nieuzywany (sprawdzone: `costHud` wystepuje w pliku
dwa razy, w tym znaczniku i w `aktKoszt`). To jedyny taki element w calym pliku.
Niegrozne, ale krok trzeci wisi wlasnie na tej kotwicy - niech bedzie czysta.

### Z5. Identyfikator dla wejscia do encyklopedii
Zalezne od **D9**. Przy rekomendacji B: jeden atrybut `id` w szablonie przycisku
"Poznaj ten preset" (`v40:34081`, wewnatrz `pokazInfoPr`, ladujacego do `G('srS')`).
Jedno miejsce renderowania, jeden panel na raz, wiec ryzyka duplikatu `id` nie ma.

---

## 6. SILNIK

Okolo 200 wierszy JS i 120 wierszy CSS. ES5 (`var`, `function`), zgodnie z reszta pliku.

### Stan i funkcje
```
tutOpen, tutIdx, tutLista        - stan (tutLista = TUT_KROKI po filtrze widocznosci)
tutStart(akt)                    - wejscie; filtruje, ustawia stan, renderuje
tutKrok(i)                       - pokazuje krok i
tutDalej() / tutWstecz() / tutKoniec(powod)
tutWidoczny(el)                  - test widocznosci, sekcja 6.2
tutUstawDymek(rect)              - pozycjonowanie z regula WCAG 2.4.11
tutSync()                        - przeliczenie przy resize i scroll
tutT(pl,en)                      - jezyk, ksztalt jak wzT/hkT
tutAutoStart()                   - decyzja o starcie przy pierwszym wejsciu (D1)
```
`localStorage`: klucz `acV32_tut`, w rodzinie istniejacych `acV32_lang`, `acV32_theme`,
`acV32_custom`. Wartosc: `'done'`, `'skip'` albo `id` ostatniego kroku.

### 6.1. Podswietlenie: jeden element, nie cztery
Zamiast czterech przycietych prostokatow albo canvasu - **jeden `div` o rozmiarze kotwicy
z ogromnym `box-shadow`**:
```css
.tut-ring{position:fixed;pointer-events:none;z-index:10500;border-radius:12px;
  box-shadow:0 0 0 9999px rgba(6,6,10,.72);border:2px solid var(--accent1)}
```
Trzy rzeczy zalatwione naraz. `box-shadow` przyciemnia wszystko poza pierscieniem, nie
zakrywajac samej kotwicy. `pointer-events:none` sprawia, ze **klikniecia przechodza
do aplikacji** - a to jest wprost warunek trzeci z syntezy: zero blokowania interakcji
poza dymkiem. `border` daje kontrast obwodki wymagany przez WCAG 1.4.11.

`z-index` 10500 nad wszystkim, co w pliku juz jest. Najwyzszy obecny to `.mo-zoom`
z 10000 (`v40:1877`), potem `.skip-link` 9999 i modale 1000. Dymek: 10510.

### 6.2. Test widocznosci, nie istnienia
**To jest najwazniejsze trzydziesci wierszy calego przedsiewziecia.** Powod jest
udokumentowany i swiezy: ukrycie trybu Live przez `display:none` zostawia przycisk w DOM.
Sprawdzenie "czy element istnieje" przeszloby na zielono, a uzytkownik dostalby
podswietlenie na niewidocznym guziku.

```js
function tutWidoczny(el){
  if(!el)return false;
  var r=el.getBoundingClientRect();
  if(r.width<1||r.height<1)return false;                      /* zlapie ukrytego RODZICA */
  if(r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth)return false;
  var cs=getComputedStyle(el);
  if(cs.display==='none'||cs.visibility==='hidden')return false;
  if(parseFloat(cs.opacity)===0)return false;
  return true;
}
```
Robotnikiem jest **pierwszy warunek**, nie `getComputedStyle`. Element wewnatrz rodzica
z `display:none` ma wlasne `display` rowne `block` - i tylko prostokat zerowej wielkosci
to zdradza. Dokladnie taki jest przypadek `panAg` wewnatrz `.side-l{display:none}`
ponizej 700px.

**Krok bez widocznej kotwicy: po cichu pominiety dla uzytkownika, glosny dla testu.**

### 6.3. Pozycjonowanie dymka, czyli WCAG 2.4.11 w praktyce
Kryterium 2.4.11 Focus Not Obscured (Minimum, AA) mowi wprost, ze podswietlany element
nie moze byc calkowicie zaslaniany. Regula implementacji: policzyc pozycje kandydujace
(pod kotwica, nad kotwica, z prawej, z lewej, na srodku ekranu jako ostatnia deska
ratunku) i **odrzucic kazda, ktorej prostokat przecina prostokat kotwicy**. Pierwsza,
ktora sie miesci w oknie i nie przecina, wygrywa.

To nie jest ta sama sprawa, co chmurki w Wzorcach z backlogu (te otwieraja sie zawsze
w gore, bo `.wz-tip-tr` ma na sztywno `bottom:calc(100% + 8px)`), ale to ten sam rodzaj
bledu. Tu robimy to od razu dobrze.

### 6.4. Klawiatura bez dotykania istniejacego kodu
W pliku sa dwa globalne uklady klawiszy: skroty jednoliterowe (`v40:34846`, faza bulgotania)
i lancuch Escape wewnatrz nich, z kolejnoscia `hitlActive`, `liveRunning`, `simRunning`,
`learnOpen`, `.mo.show`, `connMode`.

**Samouczek NIE wchodzi do tego lancucha.** Rejestruje sie na `document` w fazie
przechwytywania:
```js
document.addEventListener('keydown', tutKey, true);
```
Faza przechwytywania biegnie przed bulgotaniem, wiec `tutKey` dostaje zdarzenie pierwszy
i przy obsluzonym klawiszu wola `stopPropagation()`. Istniejacy kod nie jest ruszany
ani jednym znakiem. Ten sam wzorzec jest juz w pliku uzyty przy lightboxie
(`v40:35116`, `mzKey` z `true`), wiec to nie jest nowosc w tej bazie kodu.

Obsluga: Escape konczy, strzalki lewo i prawo przewijaja kroki, Tab krazy miedzy
przyciskami dymka.

**Slowo o pulapce, ktora juz raz mnie w tym projekcie zlapala:** konflikt globalnego
Escape jest znanym, wciaz otwartym bledem w Microsoft FluentUI (issue 17940, od 2021).
Krytyk slusznie zganil nazywanie tego "znanym wzorcem branzowym" - to jeden przypadek,
nie prawidlowosc. Ale rozwiazanie jest znane i tanie, wiec robimy je od poczatku,
a nie po zgloszeniu.

### 6.5. Ogloszenia dla czytnikow ekranu
W pliku jest gotowy `announce(msg)` (`v40:33848`) piszacy do `#srAnnounce`. **Nie nadaje
sie do zmian kroku**, bo `#srAnnounce` ma `aria-live="assertive"` (`v40:2741`), a to
przerywa czytanie w polowie zdania przy kazdym kliknieciu Dalej.

Samouczek dostaje wlasny region `aria-live="polite"` wewnatrz dymka. WCAG 4.1.3
Status Messages, poziom AA.

### 6.6. Modalnosc rozstrzygana per krok, nie raz dla calego silnika
Ustalenie z R6, ktore latwo przeoczyc. Krok z mikro-akcja (krok 1 wskazujacy `simBtn`)
**nie moze** ustawic `aria-modal` ani zamknac fokusu w petli, bo caly jego sens polega
na tym, zeby uzytkownik kliknal element pod spodem. Krok czysto opisowy moze.

Dla kroku z akcja trzeba osobno zaprojektowac powrot uzytkownika klawiatury do dymka
po interakcji z elementem. To jest jedyne miejsce w calym silniku, gdzie dostepnosc
kosztuje realna prace projektowa, a nie tylko dopisanie atrybutu.

### 6.7. Pasek postepu
Zostaje, ale jako szybki. Metaanaliza Villar i in. 2013 (32 eksperymenty) oraz Liu
i Wronski 2018 (ponad 25 000 ankiet) nie mowia "pasek postepu szkodzi" - mowia, ze
szkodzi, gdy postep jest **wolniejszy** niz oczekiwania, i pomaga, gdy szybszy. Cztery
kroki po kilka sekund to warunek szybkiego postepu.

Zastrzezenie, ktore musi tu stac: oba zrodla dotycza **ankiet**, nie samouczkow
w interfejsie. Transfer jest analogia, nie pomiarem.

Jezyk wizualny: ten sam, co kregoslup w lekcji Hookow, razem z obsluzonym
`prefers-reduced-motion` (w pliku jest juz 58 wystapien tej reguly, wiec konwencja
istnieje i jest przestrzegana).

---

## 7. DOSTEPNOSC JAKO LISTA ZADAN

Przepisane z `SYNTHESIS.md` sekcja 5 na rzeczy do zrobienia. To jedyna czesc calej
kampanii, ktora nie jest osadem - to wiazace zrodlo W3C.

| Kryterium | Poziom | Zadanie budowlane |
|---|---|---|
| 2.1.1 Keyboard | A | Tab miedzy Dalej / Wstecz / Zakoncz, strzalki przewijaja |
| 2.1.2 No Keyboard Trap | A | Escape dziala zawsze, takze w wariancie modalnym |
| 2.2.2 Pause, Stop, Hide | A | Animacja przesuwania pierscienia pauzowalna; auto-advance nie wchodzi |
| 2.4.3 Focus Order | A | Fokus na dymek po zmianie kroku, przewidywalnie |
| 2.4.7 Focus Visible | AA | Widoczny wskaznik na przyciskach dymka |
| **2.4.11 Focus Not Obscured** | **AA** | **Sekcja 6.3. Najtwardsze kryterium tej kampanii** |
| 2.5.8 Target Size | AA | Przyciski dymka min. 24x24 px |
| 3.2.6 Consistent Help | A | `tutBtn` w `.tb-util`, stale to samo miejsce (Z1) |
| 4.1.2 Name, Role, Value | A | Dymek jako `role="dialog"` z `aria-labelledby` |
| 4.1.3 Status Messages | AA | Wlasny region `polite` (sekcja 6.5) |
| 1.3.2 Meaningful Sequence | A | Kolejnosc w DOM zgodna z wizualna |
| 1.4.1 Use of Color | A | Podswietlenie nie jest jedynym sygnalem - jest tez tekst w dymku |
| 1.4.4 / 1.4.10 | AA | Dymek czytelny przy 200% i przy 320px szerokosci |
| 1.4.11 Non-text Contrast | AA | Obwodka pierscienia min. 3:1 wobec przyciemnionego tla, w OBU motywach |
| `prefers-reduced-motion` | praktyka | Pierscien przeskakuje zamiast plynac |

---

## 8. TESTY

Wzorzec sprawdzony w tym projekcie: harness Node z `vm` i przyzwalajaca atrapa DOM
przez `Proxy`. Nowy plik **wyciaga zrodlo harnessu z istniejacego**, a nie kopiuje go -
powod zapisany przy `verify_zagniezdzenie.js`: dwie kopie atrapy predzej czy pozniej
sie rozjada.

### T1. Widocznosc kotwic - najwazniejszy test
Dla kazdego wiersza `TUT_KROKI` sprawdzic, ze `kotw` **istnieje w HTML jako `id`**
i **nie jest pod regula chowajaca** przy zalozonej szerokosci okna.

**Kontrola dodatnia obowiazkowa:** podmienic w kopii kotwice na `liveBtn` (przycisk
istniejacy w DOM, ale z `style="display:none"`) i potwierdzic, ze test **zaswieci na
czerwono**. Jesli przejdzie, test sprawdza istnienie, nie widocznosc, i jest bezwartosciowy.

Kontrole wstrzykiwac **przed** uruchomieniem kontroli glownej, nie po. Powod: w poprzedniej
sesji wstrzyknalem ja po i test przez chwile sam siebie certyfikowal.

### T2. Parytet PL/EN
Kazdy wiersz ma cztery niepuste pola tekstowe: `tPL`, `tEN`, `oPL`, `oEN`. Jesli wiersz
ma `akcja`, to rowniez `pPL` i `pEN`. Brak ktoregokolwiek to blad, nie ostrzezenie.

### T3. Polskie znaki
Ten sam skaner, ktory znalazl 260 podmian w `WZ_PL`. Niezmiennik z DD54: po zdjeciu
ogonkow tekst ma byc bajt w bajt identyczny z oryginalem po zdjeciu ogonkow, liczba
**znakow** ma zostac identyczna, a liczba **bajtow** ma urosnac.

Tablice ogonkow **nie przepisywac recznie** - budowac z kodow znakow i sprawdzac
`if(OGONKI.length!==18) throw`. Recznie przepisana tablica zgubila w poprzedniej sesji
`Ł` i `ł`, przez co `ó` zmapowalo sie na `n`.

### T4. Dlugie myslniki
Zero wystapien U+2014 (em dash) i U+2013 (en dash) w calym pliku. Dzis v40 ma zero
i ma tak zostac. Znaki nazwane tu przez kod, a nie wpisane, zeby ten dokument nie
oblewal wlasnej reguly.

### T5. Skladnia
Parsowanie **wszystkich trzech blokow `<script>`**, nie samego najwiekszego. Dane siedza
w innym bloku niz logika.

### T6. Rozmiar zapasu
`v39/AGENT_TEAMS_CONFIGURATOR_v39.html` ma miec **dokladnie 6 959 003 bajty** po kazdej
operacji. Ten test nie dotyczy samouczka - dotyczy tego, ze nic go przypadkiem nie ruszylo.

---

## 9. KOLEJNOSC BUDOWY

Piec faz, kazda z bramka. **Bramka znaczy: pokazuje Maciejowi, czekam na slowo.**

| Faza | Co powstaje | Bramka |
|---|---|---|
| **0** | Dziewiec decyzji z sekcji 2 rozstrzygnietych | **Bez tego nie ruszamy.** D9 blokuje krok czwarty |
| **1** | Piec zmian z sekcji 5 (Z1-Z5), osobno, bez silnika | Aplikacja dziala jak dzisiaj plus poprawny jezyk i czysty `costHud` |
| **2** | `TUT_KROKI` plus testy T1-T6 na pustym silniku | Testy na czerwono, bo silnika nie ma. Tak ma byc |
| **3** | Silnik, sekcja 6. Kroki na sucho, bez auto-startu | Maciej klika `tutBtn` i przechodzi cztery kroki |
| **4** | Auto-start (D1) i zapamietywanie (D6) | Wersja koncowa, pelna kontrola w obu jezykach i motywach |

Faza 1 ma **wlasna wartosc niezaleznie od samouczka**: wykrywanie jezyka naprawia
pierwsze wrazenie polskiego uzytkownika, a Z4 usuwa realny blad w znaczniku.
Gdyby Maciej po fazie 1 uznal, ze samouczek jednak nie, fazy 1 sie nie cofa.

### Gdzie to powstaje
**Nowy plik v41**, kopia v40, zgodnie z zasada projektu: nowa wersja to osobny plik,
nigdy nadpisanie. v40 dolacza wtedy do v39 jako zapas, a v39 zostaje nietkniety.

Kod modulu pisany **poza plikiem HTML**, w `v41/plans/samouczek_kod.js`, i wdrazany
skryptem podmieniajacym zawartosc miedzy znacznikami. Ten sam uklad, co przy Wzorcach
(`v39/plans/wzorce_kod.js` plus `wdroz_wzorce_v40.js`) - sprawdzil sie i pozwala czytac
oraz recenzowac modul bez otwierania siedmiu megabajtow.

---

## 10. UCZCIWY STAN DOWODOW

Nie chowam tego w przypisie, bo to najwazniejszy wynik kampanii.

**Nie istnieje ani jeden zweryfikowany, niezalezny test z liczbami, ktory pokazywalby
korzysc z samouczka w aplikacji tego typu.** Osiem raportow sprawia wrazenie osmiu
niezaleznych sond, a w warstwie dowodowej to praktycznie **jedna instytucja** (Nielsen
Norman Group), **jeden eksperyment ilosciowy** (n=70, cztery aplikacje iOS, 2020)
i **jeden autor akademicki** (John M. Carroll, wystepujacy po obu stronach sporu).

Ten jeden eksperyment jest brzegowy: trzy miary, dwie nieistotne, jedna p=0.047 bez
korekty na porownania wielokrotne, przy 13 odrzuconych probach. Null na n=70 to slaby
dowod nieistnienia efektu, **nie dowod szkody** - a kilka raportow zamienilo ten null
na wniosek kierunkowy "tutorial szkodzi". Ja powtorzylem ten sam blad w podsumowaniu
dla Macieja i musialem sie poprawic.

Cztery popularne liczby z tej branzy okazaly sie zmyslone i zostaly wylapane niezaleznie
przez roznych agentow: "NN/g 2024 UX Benchmark Study", "78 procent porzuca do trzeciego
kroku - Baymard", "Pendo 847 aplikacji 81 procent", "NN/g plus 35 procent szybciej".
**Zaden z tych dokumentow nie istnieje.**

**Co z tego wynika dla tego planu:** decyzja o budowie zapadla przed researchem i ten
plan jej nie broni ani nie podwaza. Odnotowuje, ze stoi na osadzie, nie na literaturze.
Argument, ktory nadal stoi, jest jeden i pochodzi ze zrodla nam nieprzychylnego:
**NN/g, krytykujac toury, robi wyjatek dla interfejsow o nowym sposobie dzialania.**
Canvas, symulacja, Hooki i Wzorce prawdopodobnie sie w tym wyjatku miescza.

---

## 11. PULAPKI

**P1. Teksty w tym pliku sa BEZ polskich znakow i takie nie moga trafic do aplikacji.**
Konwencja DD49 mowi: pliki `.md` bez ogonkow, teksty widoczne dla czytelnika z ogonkami.
Przepisanie dymkow z tego dokumentu wprost do HTML da polszczyzne bez ogonkow -
czyli dokladnie to, co naprawialismy przez cala poprzednia sesje. Test T3 to zlapie,
ale lepiej napisac je od razu poprawnie.

**P2. Nie patchowac `.js` przez heredoc w powloce.** Ukosniki gina po cichu. Uzywac Write.

**P3. `\b` w wyrazeniach regularnych JS nie widzi polskich liter.** `\bze` nigdy nie
trafi w slowo z ogonkiem. Granice wyznaczac recznie klasa znakow.

**P4. Kotwiczyc testy na kodzie, nie na komentarzach.** W poprzedniej sesji moj wlasny
test dwa razy z rzedu sklamal: raz dopasowal sie przez granice linii, raz zglosil cztery
naruszenia, ktore byly komentarzami tlumaczacymi, czemu zrobiono inaczej.

**P5. Sprawdzac wszystkie trzy bloki `<script>`.** Dane w innym bloku niz logika.

**P6. Test, ktory liczy elementy, nie widzi zmiany struktury.** 132 testy Wzorcow
przeszly na zielono po przebudowie zagniezdzenia, bo liczyly `class="wz-zloz-cz"` rowne
dwa - co jest prawda i dla rodzenstwa, i dla zagniezdzenia. Kazdy test nowej struktury
potrzebuje wlasnej kontroli dodatniej.

**P7. Przeczytac teksty w calosci po napisaniu.** Pierwsze przejscie ogonkow w v40
przepuscilo siedem slow, bo lista byla przepisywana recznie. Znalazlo je dopiero
ponowne przeczytanie calosci. Drugie czytanie jest czescia roboty, nie premia.

**P8. Agenty na opusie padaja na limicie wydatkow.** Jesli budowa pojdzie przez agentow,
sprawdzac pliki na dysku, zanim uzna sie prace za stracona - w tej kampanii krytyk
zapisal pelny raport i padl dopiero na podsumowaniu.

---

## 12. CZEGO TEN PLAN NIE OBEJMUJE

- **Aktu 2.** Zaplanowany jako parking (sekcja 4), nie jako budowa.
- **Telemetrii z `SYNTHESIS.md` sekcja 8.** Sensowna, ale to osobna decyzja - zbieranie
  czegokolwiek o uzytkownikach wymaga wlasnej rozmowy, nie przypisu w planie samouczka.
- **Nowego przycisku encyklopedii w naglowku** (D9 wariant A). Rekomenduje rozwazenie,
  ale jako osobna funkcje, poza tym zleceniem.
- **Backlogu.** Chmurki otwierajace sie zawsze w gore, przycisk Hooki bez tlumaczenia,
  plakietka "rzadki", piec pustych plikow w katalogu glownym, szesc brakujacych zdarzen
  hookow, 33 litery cyrylicy z v38, szesciu agentow z repo agency-agents. **Zadnego z tych
  nie ruszam bez zielonego swiatla.**
- **Publikacji na GitHubie.** Plan publikacji to nie zgoda na publikacje.

---

## 13. NASTEPNY KROK

Maciej rozstrzyga dziewiec decyzji z sekcji 2. **D9 jest blokujaca** - bez niej krok
czwarty nie ma na czym wisiec. Pozostale osiem mozna rozstrzygnac w trakcie, kazda
kosztuje najwyzej jeden wiersz w tablicy albo jedna galaz w funkcji.

Po decyzjach: faza 1, czyli piec zmian z sekcji 5, ktore maja wlasna wartosc niezaleznie
od tego, czy samouczek powstanie.

**Budowy w pliku aplikacji nie zaczynam bez osobnego slowa.**
