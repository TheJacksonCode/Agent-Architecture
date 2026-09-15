# v41 - log postepu

## 2026-09-14, wieczor: FAZA RESEARCH ODPALONA

Maciej powiedzial "startuj" i poszedl spac. Osiem agentow na sonnet pracuje rownolegle.
Brief kazdego jest w `MASTER_PLAN.md`. Raporty lada w `v41/research/`.

| plik | pytanie |
|---|---|
| `R1_czy_tour_dziala.md` | czy samouczek na pierwszym uruchomieniu w ogole dziala |
| `R2_automat_czy_zaproszenie.md` | automatyczny start kontra zaproszenie |
| `R3_dlugosc.md` | po ilu krokach ludzie wysiadaja |
| `R4_prowadzenie_czy_wskazywanie.md` | tour sterujacy aplikacja kontra tylko podswietlajacy |
| `R5_czy_tour_to_wlasciwa_forma.md` | alternatywy: checklist, puste stany, podpowiedzi |
| `R6_dostepnosc_nakladek.md` | WCAG dla nakladek prowadzacych, DELTA wobec v39/research/R2 |
| `R7_narzedzie_edukacyjne.md` | onboarding narzedzia, ktore samo jest materialem do nauki |
| `R8_adwokat_diabla.md` | wylacznie argumenty PRZECIW |

## CO ROBIC PO ZAKONCZENIU FAZY RESEARCH

1. Sprawdzic, czy wszystkie osiem plikow powstalo i nie sa puste.
2. **Faza CRITIC** - jeden agent opus. Ma policzyc zrodla GRANICA PO GRANICY (nie hurtem),
   wylapac twierdzenia bez URL, sprawdzic czy material od sprzedawcow narzedzi nie
   przeciekl do sekcji dowodowych, i skonfrontowac R8 z pozostalymi.
   Wynik: `v41/research/CRITIC.md`.
3. **Faza SYNTEZA** - jeden agent opus. Wynik: `v41/plans/SYNTHESIS.md` z rozstrzygnieciem
   osmiu pytan, kazde z sila dowodu, plus JAWNA LISTA rzeczy NIEROZSTRZYGNIETYCH.
   Ta ostatnia lista jest najwazniejsza - tam decyzje podejmuje Maciej, nie zrodla.
4. Dopiero potem plan budowy samouczka.

## USTALENIA SPRZED KAMPANII (nie gubic)

- **Kroki samouczka maja byc DANYMI, nie kodem.** Jedna tablica, wiersz na krok:
  kotwica, akt, tytul PL/EN, tekst PL/EN, opcjonalna akcja. Silnik nie wie nic o tresci.
  Dodanie sekcji do aplikacji = dopisanie wiersza.
- **Kotwica to WYLACZNIE identyfikator elementu.** Nigdy selektor CSS typu "trzeci
  przycisk w rzedzie", nigdy wspolrzedne.
- **Pomiar stabilnosci wykonany:** dwanascie kotwic kregoslupa sprawdzono w v32-v40.
  Dziewiec wersji, zero zmian nazw, zero znikniec. Jedyna roznica to `hookiBtn`,
  ktorego nie ma w v32 i v33, bo tryb Hooki powstal w v34.
- **Test kotwic musi sprawdzac WIDOCZNOSC, nie samo istnienie.** Dzisiejsze ukrycie
  trybu Live (`display:none`) to dowod: element zostaje w DOM, wiec sprawdzenie
  "czy istnieje" przeszloby na zielono, a uzytkownik dostalby podswietlenie
  na niewidocznym guziku.
- **Krok bez kotwicy: po cichu pominiety dla uzytkownika, glosny dla testu.**
- **Przycisk skrotow klawiszowych NIE MA identyfikatora** (tylko `onclick="pokazSkroty()"`
  i `aria-label`). To jedyna zmiana w istniejacym HTML, jakiej samouczek wymaga.
- **Podzial na dwa akty** (propozycja, do potwierdzenia po syntezie):
  Akt 1, szesc krokow: jezyk, agenci, presety, canvas z podzialem faz, koszt, encyklopedia.
  Akt 2 na zadanie: zapisane, wlasny agent, zakladki prawego panelu, dol canvasu,
  motyw, skroty.
- **Symulacja (`simBtn`)** to kandydat do Aktu 1, mocniejszy niz przelacznik motywu.
- Pasek postepu samouczka moze byc **tym samym kregoslupem**, co w lekcji hookow -
  jezyk wizualny juz istnieje, jest przetestowany i ma obsluzone `prefers-reduced-motion`.

## STAN

- [x] STRATEGIA
- [x] RESEARCH - osiem raportow, 236 192 bajty (230,7 KB), okolo 29 tysiecy slow
- [x] CRITIC - werdykt REVISE, 7074 slowa (agent opus padl na limicie PO zapisaniu pliku)
- [x] SYNTEZA - plans/SYNTHESIS.md, 4755 slow (sonnet, opus byl na limicie)

---

## USTALENIA MIEDZYRAPORTOWE - OBOWIAZKOWE DLA FAZY CRITIC

Spisane w trakcie fazy RESEARCH, na biezaco, zeby nie przepadly.
**Krytyk ma to zweryfikowac, a nie przyjac na wiare.**

### 1. Jedno badanie, cztery cytowania, to nadal JEDNO badanie

To samo badanie NN/g (n=70, cztery aplikacje iOS; skutecznosc zadania 91 wobec 94 procent,
p=0.443; postrzegana trudnosc SEQ 4.92 wobec 5.49, p=0.047) jest cytowane niezaleznie
w **R1, R3, R4 i R8**. Cztery raporty, jedno zrodlo.

**To jest dokladnie ten mechanizm, ktory wyprodukowal obalone "potwierdzone przez
9 zrodel" przy Wzorcach.** Krytyk MUSI liczyc granica po granicy: zliczenie tego jako
czterech potwierdzen byloby powtorzeniem tamtego bledu w nowej kampanii.

Osobno warto zauwazyc, ze to badanie dotyczy **aplikacji mobilnych iOS**, a my budujemy
gesty interfejs na duzym ekranie. Przenoszalnosc jest zalozeniem, nie faktem.

### 2. Trzy cytaty-widma, wylapane niezaleznie przez roznych agentow

- **"NN/g 2024 UX Benchmark Study"** z liczbami 68/82 procent - trafily na to niezaleznie
  **R1 i R2**. Bezposrednie sprawdzenie na nngroup.com: taki raport NIE ISTNIEJE.
- **"78 procent porzuca tour do trzeciego kroku, Baymard Institute"** - trafily na to
  **R2, R3 i R4**. Sprawdzone bezposrednio na baymard.com: nie ma tego tam.
  Lancuch cytowan biegnie przez blogi marketingowe (digia.tech, saasfactor.co).
- **"Pendo: 847 aplikacji B2B SaaS, 81 procent porzucen powyzej 10 krokow"** - R3
  wytropil ORYGINAL: wpis Pendo z 2016 mowi ostrozniej o okolo dwukrotnie nizszym
  ukonczeniu przy powyzej 10 krokach wobec 1-3 krokow, w zbiorze o zakresie 1-74 krokow.
  Ktos po drodze zamienil "okolo dwa razy nizej" na okragle "81 procent" i **dopisal
  zmyslona wielkosc proby**.

**Wniosek, ktory sam w sobie uzasadnia cala kampanie:** research tego tematu zrobiony
BEZ reguly weryfikacji zrodla wyprodukowalby raport oparty na trzech nieistniejacych
badaniach. Regula zadzialala.

### 3. Dowody przeciw paskowi postepu - to obala MOJA wlasna wczesniejsza propozycje

R3 znalazl dwa niezalezne, recenzowane zrodla (Villar, Callegaro, Yang 2013 - meta-analiza
32 eksperymentow; Liu, Wronski 2018 - ponad 25 000 ankiet), ze pasek postepu **czesto nie
pomaga, a czasem szkodzi** ukonczeniu.

Proponowalem wczesniej, zeby pasek postepu samouczka byl tym samym kregoslupem, co
w lekcji hookow. **Ta propozycja ma teraz dowody przeciwko sobie** i nie wolno jej
przemycic do syntezy tylko dlatego, ze byla moja i ladnie sie skladala.

Zastrzezenie w druga strone: oba zrodla dotycza **ankiet**, nie samouczkow w interfejsie.
Transfer jest analogia, nie pomiarem. Krytyk ma to nazwac wprost.

### 4. Stan dowodow po czterech raportach - wstepnie niewygodny dla planu

Nie ma ani jednego zweryfikowanego, niezaleznego testu A/B z liczbami, ktory pokazywalby
korzysc z samouczka. Jedyne twarde badanie mowi, ze tutorial nie poprawia skutecznosci
i **pogarsza postrzegana trudnosc**. Wszystkie efektowne liczby pochodza od sprzedawcow
narzedzi.

**Nie jest to jeszcze wniosek.** R5 (czy tour to wlasciwa forma), R7 (narzedzia edukacyjne)
i R8 (adwokat diabla) sa wlasnie od tego, zeby to obciazenie sprawdzic z obu stron.
Ale synteza NIE MOZE tego przemilczec, zeby obronic decyzje podjeta przed researchem.

### 5. ROZBIEZNOSC MIEDZY RAPORTAMI - do rozstrzygniecia przez krytyka

R7 i R8 cytuja **to samo zrodlo** (Chameleon, sprzedawca narzedzi do tourow), ale
**podaja rozne liczby**:

- **R7:** 73 procent ukonczenia przy 1-2 krokach, 38 procent, 25 procent przy 6-8 krokach,
  8 procent przy 9 i wiecej krokach.
- **R8:** 72-74 procent przy 3-4 krokach, 16 procent przy 7 krokach.

To sa inne podzialy tych samych rzekomo danych. Albo sa to dwa rozne raporty Chameleon,
albo ktorys agent przepisal zle. **Krytyk ma to rozstrzygnac, zanim ktorakolwiek z tych
liczb dotknie decyzji projektowej.** Przypominam, ze oba zestawy i tak siedza w koszyku
materialu marketingowego.

Praktyczna waga: moja propozycja Aktu 1 ma **szesc krokow**. Wedlug liczb R7 to okolo
25-38 procent ukonczenia, wedlug R8 okolo 16 procent. Kierunek jest ten sam i niedobry
dla szesciu krokow, ale rozpietosc jest za duza, zeby na niej cokolwiek opierac.

### 6. Trzy MOJE propozycje maja teraz dowody przeciwko sobie

Zapisuje to osobno, bo latwiej jest przemycic wlasny pomysl do syntezy niz cudzy.

1. **Pasek postepu jako kregoslup z lekcji hookow** - dwa recenzowane zrodla przeciw
   (szczegoly w punkcie 3 wyzej).
2. **Tour prowadzacy za reke** przy wlasnym agencie i encyklopedii - R8 relacjonuje, ze
   NN/g rekomenduje **wskazywanie zamiast automatycznego klikania**. Moja rekomendacja
   szla w druga strone.
3. **Szesc krokow w Akcie 1** - patrz punkt 5. Nawet dane sprzedawcy, czyli dowod przeciw
   wlasnemu interesowi, pokazuja zapasc ukonczenia w okolicach tej dlugosci.

**Zadna z tych trzech nie moze wejsc do syntezy dlatego, ze ladnie sie skladala.**

### 7. Argumenty ZA tourem, ktore NIE sa materialem marketingowym

Zeby bilans byl uczciwy, bo punkt 4 wyszedl jednostronnie. R7 przyniosl cztery rzeczy,
ktorych nie da sie odlozyc do koszyka sprzedawcow:

- **Wyjatek NN/g dla nowego paradygmatu interakcji.** Niezalezne zrodlo, ktore krytykuje
  toury, samo robi wyjatek dla interfejsow o nowym sposobie dzialania. Canvas, symulacja,
  Hooki i Wzorce prawdopodobnie sie w tym wyjatku miescza. To jest argument z tego samego
  zrodla, ktore nas obciaza.
- **Advance organizer (Ausubel)** jako fundament pod "najpierw mapa, potem szczegoly".
  Zastrzezenie: to transfer z pedagogiki formalnej, nie badanie na interfejsach.
- **Pamiec przestrzenna buduje sie na stabilnych punktach orientacyjnych.** Nasze dwanascie
  kotwic, ktore nie drgnely przez dziewiec wersji, sa dokladnie takimi punktami.
- **Encyklopedie rozwiazuja orientacje trwala struktura nawigacyjna, nie jednorazowa
  wycieczka.** To argument, zeby kregoslup zostawil **trwaly slad**, a nie zniknal
  po jednym przejsciu.

R7 rozstrzyga tez spor mapa kontra zadanie: narzedzia z jednym oczywistym pierwszym
zadaniem (Blender, Unity) ucza przez zadanie, a te bez niego (Unreal Engine, Figma)
zaczynaja od mapy. **My nie mamy jednego oczywistego pierwszego zadania**, wiec jestesmy
bliżej Unreal Engine.

### 8. Dwie rzeczy z R6, ktore trzeba wziac do projektu niezaleznie od formy

- **WCAG 2.4.11 Focus Not Obscured (Minimum, AA)** dotyczy wprost podswietlanego elementu:
  dymek z opisem kroku **nie moze go calkowicie zaslaniac**. To twarde kryterium, nie rada.
- **Konflikt globalnego Escape jest udokumentowanym, wciaz otwartym bledem** w Microsoft
  FluentUI (issue 17940, od 2021, bez poprawki). Czyli problem, na ktorym wylozylem sie
  w tym projekcie przy module Wzorce, jest znanym, nierozwiazanym wzorcem bledu, a nie
  moja wpadka jednorazowa. Trzeba go zaprojektowac swiadomie od poczatku.

---

## KRYTYK OBALIL CZESC TEGO, CO WYZEJ. WERDYKT: REVISE

Wazne: **sekcje 1-8 powyzej byly moimi HIPOTEZAMI z trakcie fazy research.**
Krytyk je sprawdzil i czesc obalil. Jesli czytasz ten plik po kompakcji, ponizsze
ma pierwszenstwo, a `research/CRITIC.md` jest rozstrzygajacy.

**Trzy ustalenia krytyka, ktorych nikt z osmiu researcherow ani ja nie zauwazylismy:**

1. **Korpus jest duzo wezszy, niz wyglada.** Osiem raportow sprawia wrazenie osmiu
   niezaleznych sond. W warstwie dowodowej to praktycznie **jedna instytucja** (Nielsen
   Norman Group), **jeden eksperyment ilosciowy** (n=70, iOS, 2020) i **jeden autor
   akademicki** (John M. Carroll), ktory wystepuje po OBU stronach sporu naraz.
   Jesli NN/g sie myli, myli sie cala kampania.

2. **Ten jeden eksperyment jest kruchszy, niz ktokolwiek napisal.** Testowano trzy miary:
   dwie wyszly nieistotnie, jedna p=0.047, czyli o wlos pod progiem, bez korekty na
   porownania wielokrotne, przy 13 odrzuconych probach. **Kilka raportow zamienilo wynik
   NULL na wniosek kierunkowy "tutorial SZKODZI"** - a null na n=70 to slaby dowod
   nieistnienia efektu, nie dowod szkody. Ja w swoim punkcie 4 powyzej powtorzylem
   ten sam blad, piszac "pogarsza postrzegana trudnosc" bez zastrzezenia.

3. **Liczby Chameleon niesione przez trzy raporty nie istnieja w zadnym dokumencie
   Chameleon.** Moj punkt 5 pytal, ktory raport zle przepisal. Odpowiedz krytyka jest
   gorsza: zrodla nie ma po zadnej stronie.

**Wniosek dla mnie na przyszlosc:** spisywanie ustalen miedzyraportowych w trakcie fazy
research jest przydatne, ale to sa HIPOTEZY. Oznaczac je jako hipotezy od razu, a nie
dopiero wtedy, gdy krytyk je obali.

---

## KAMPANIA ZAMKNIETA. CO CZYTAC I W JAKIEJ KOLEJNOSCI

1. **`plans/SYNTHESIS.md`** - dokument decyzyjny. Sekcja 7 to **siedem decyzji dla Macieja**,
   kazda oznaczona jako OSAD PROJEKTOWY, z rekomendacja i uczciwa alternatywa.
2. **`research/CRITIC.md`** - jesli cos w syntezie budzi watpliwosc, tu jest liczenie
   granica po granicy i sekcja H "co mozna bezpiecznie powiedziec, a czego nie".
3. Osiem raportow R1-R8 tylko wtedy, gdy potrzebny jest material zrodlowy.

## NAJWAZNIEJSZY WYNIK KAMPANII

Nie "oto jak robic samouczki", tylko **zmapowane pole, na ktorym prawie nic nie jest
udowodnione**, plus lista popularnych liczb, ktore sa zmyslone.

Cztery cytaty-widma wylapane niezaleznie przez roznych agentow: "NN/g 2024 UX Benchmark
Study", "78 procent porzuca do trzeciego kroku - Baymard", "Pendo 847 aplikacji 81 procent",
"NN/g plus 35 procent szybciej". **Zaden nie istnieje.** Research bez reguly weryfikacji
zrodla opartby sie na trzech nieistniejacych badaniach.

Krytyk dolozyl trzy ustalenia, ktorych nie mial zaden researcher: korpus to praktycznie
jedna instytucja, jeden eksperyment i jeden autor; ten eksperyment jest brzegowy i bez
korekty na porownania wielokrotne; a liczby Chamelon niesione przez trzy raporty nie
istnieja po zadnej stronie.

## CO SYNTEZA REKOMENDUJE (skrot, szczegoly w SYNTHESIS.md sekcje 3 i 4)

- **Forma:** wskazywanie (spotlight plus dymek), NIE klikanie za uzytkownika. Powod
  inzynierski, nie badawczy - badania milcza po obu stronach.
- **Start:** automatyczny, ale z trzema warunkami: jeden widoczny przycisk wyjscia,
  start po pelnym zaladowaniu, zero blokowania interakcji poza dymkiem.
- **Dlugosc Aktu 1: cztery do pieciu krokow, NIE szesc.** Szesc bylo uzasadniane liczba,
  ktorej nie ma w zadnym zrodle.
- **Kolejnosc:** mapa przed zadaniem (nie mamy jednego oczywistego pierwszego zadania).
- **Silnik:** wlasny, minimalny. Trzy duze biblioteki tourow maja udokumentowane problemy
  dostepnosci, a aplikacja i tak jest zero-zaleznosci.
- **Trwalosc:** kregoslup zostaje dostepny pod przyciskiem, nie znika po jednym przejsciu.
- **Kroki z Aktu 1 przesuniete do Aktu 2:** `costHud` i `simBtn` (decyzja redakcyjna,
  zero zrodel po ktorejkolwiek stronie - punkt 4 w sekcji 7 do zatwierdzenia).

## WERDYKT DLA TRZECH MOICH PROPOZYCJI

- **Pasek postepu:** nierozstrzygniete, ale prawdopodobnie na korzysc. Metaanaliza Villar
  pokazuje efekt WARUNKOWY - pasek pomaga, gdy postep jest szybszy niz oczekiwania.
  Przy czterech-pieciu krotkich krokach jestesmy wlasnie w tym warunku.
- **Prowadzenie za reke:** zero zrodel po obu stronach. Decyduje koszt inzynierski, nie nauka.
- **Szesc krokow:** liczba do wykreslenia, nie miala pokrycia.

## NASTEPNY KROK

Maciej przeglada sekcje 7 SYNTHESIS.md i rozstrzyga siedem decyzji. Dopiero potem plan budowy.
**Nie zaczynac budowy przed jego slowem.**

---

# ARCHIWUM: handoff z pierwszej kompakcji (nieaktualny, zachowany dla sladu)

## ZLECENIE OD MACIEJA (2026-09-14, tuz przed PIERWSZA kompakcja)

"teraz zrobimy compact a zaraz po nim mozesz ruszac z rozpisaniem planu budowy"

Czyli: **ROZPISAC PLAN BUDOWY** samouczka. To ma byc DOKUMENT, nie kod.
**Nie zaczynac budowy w pliku aplikacji bez osobnego slowa.**

Siedem decyzji z `plans/SYNTHESIS.md` sekcja 7 **nadal nie jest rozstrzygnietych przez
Macieja**. Plan ma je uwzglednic jako otwarte, z moja rekomendacja przy kazdej,
a nie udawac, ze zapadly.

## CZTERY KROKI - MOJA REKOMENDACJA (to bylo tylko w rozmowie, nigdzie indziej)

Synteza proponowala szesc wierszy. Zrecenzowalem je i proponuje cztery.

### Co WYCIALEM z szostki syntezy i dlaczego
1. **Ekran powitalny** - krok, ktory nic nie pokazuje. Na canvasie i tak stoi juz gotowy
   zespol, wiec pierwszy krok ma wskazac JEGO. Zdanie "co to za narzedzie" wchodzi
   do dymka kroku pierwszego.
2. **Jezyk** - zamiast uczyc, gdzie naprawic zly jezyk, NAPRAWIC GO AUTOMATYCZNIE.
   Ustalenie: aplikacja startuje z `localStorage.getItem('acV32_lang') || 'en'`, czyli
   **domyslnie po ANGIELSKU**, i **nie ma zadnego wykrywania jezyka przegladarki**
   (`navigator.language` wystepuje w pliku zero razy). Polski uzytkownik przy pierwszym
   wejsciu dostaje angielski interfejs. To osobna, mala poprawka warta wiecej niz krok touru.
3. **Presety jako osobny krok** - "lewy panel jest biblioteka i ma trzy zakladki"
   to jedna mysl, nie trzy.

### Co PRZYWROCILEM wbrew syntezie
**Koszt (`costHud`).** Synteza zeslala go do Aktu 2, zeby zmiescic sie w limicie czterech
krokow. To blad: `CLAUDE.md` mowi wprost, ze celem aplikacji jest zrozumiec, ILE ZESPOL
KOSZTUJE, ZANIM WYDASZ TOKEN. Uzytkownik, ktory wychodzi nie wiedzac, ze aplikacja to
liczy, przegapil sztandarowa funkcje.

### Cztery kroki, z roboczymi tekstami dymkow (PL; EN do dopisania, parytet obowiazkowy)

**1. Canvas** - kotwica `svg`, dodatkowo `phaseBar`
> Na srodku stoi gotowy zespol, ktory wczytal sie sam. Kazdy kafelek to jeden agent,
> linie pokazuja, kto komu przekazuje prace, a pasek u gory dzieli ja na fazy.

Uzasadnienie kolejnosci: zaczynamy od tego, na co uzytkownik i tak patrzy. To tez jedyny
krok, ktory cos WYJASNIA, a nie tylko lokalizuje. Fakt sprawdzony: `ladujPreset('deep_five_minds')`
odpala sie w `start()`, wiec canvas NIGDY nie jest pusty przy pierwszym wejsciu.

**2. Lewy panel** - kotwica `panAg`, dodatkowo `panPr`, `panSv`
> Stad bierzesz elementy. Agenci to pojedynczy specjalisci, Presety to gotowe zespoly
> jak ten na canvasie, Zapisane to Twoje wlasne uklady.

**3. Koszt** - kotwica `costHud`
> Tu widzisz, ile ten zespol kosztuje, zanim go uruchomisz. Kliknij, zeby zobaczyc
> rozbicie na agentow.

Fakt sprawdzony: `costHud` to przycisk wolajacy `pokazCostBreakdown()`.

**4. Encyklopedia i powrot** - kotwica `learnO` plus NOWY przycisk samouczka
> Kazdy agent i kazdy zespol ma tu swoja strone z opisem i wycena. A ten samouczek
> odpalisz ponownie w kazdej chwili, tym przyciskiem.

Ostatni krok wskazuje WLASNE WEJSCIE. To jest ta czesc, ktora ma najmocniejsze
uzasadnienie w researchu (R7: encyklopedie rozwiazuja orientacje trwala nawigacja,
nie jednorazowa wycieczka), wiec niech bedzie ostatnia rzecza, jaka uzytkownik zobaczy.

### Gdzie podziala sie symulacja
Symulacja to POKAZ, nie miejsce. Jako krok mapy jest slaba, bo trzeba by ja odpalic
i czekac. Rekomendacja: **mikro-akcja w kroku pierwszym** ("kliknij Symulacja i zobacz,
jak zespol pracuje"), ale niech uzytkownik SAM kliknie - zgodnie z regula "wskazuj,
nie klikaj za niego". Alternatywa: Akt 2.

## CZTERY RZECZY DO DOROBIENIA, ZANIM TE KROKI ZADZIALAJA

1. **Przycisk odpalajacy samouczek ponownie** - NIE ISTNIEJE, a krok czwarty na niego
   wskazuje. Bez niego krok 4 nie ma kotwicy.
2. **Identyfikator dla przycisku skrotow klawiszowych** - ma tylko `onclick="pokazSkroty()"`
   i `aria-label`. Nadal jedyna zmiana w istniejacym HTML, jakiej wymaga Akt 2.
3. **Wykrywanie `navigator.language`** przy pierwszym wejsciu - osobna poprawka,
   wartosciowa niezaleznie od samouczka.
4. **Usuniecie podwojnego `id` z `costHud`** - patrz nizej.

## BLAD ZNALEZIONY PRZY OKAZJI (do backlogu)

`costHud` ma **DWA atrybuty `id` naraz**:
`<button class="tb-cost sev-safe" id="costHud" onclick="pokazCostBreakdown()" id="costHudTip" ...>`
Przegladarka honoruje pierwszy, `costHudTip` jest martwy i **nigdzie w kodzie nieuzywany**.
To JEDYNY taki element w calym pliku (sprawdzone). Niegrozne, ale niepoprawne - a skoro
krok trzeci samouczka wiesza sie wlasnie na tej kotwicy, niech bedzie czysta.

## STAN WSZYSTKICH WERSJI

- **v40 AKTYWNA** - Wzorce (DD52-DD55), polskie znaki, Live ukryty. Wszystkie decyzje zamkniete.
- **v39 ZAPAS** - 6 959 003 bajty, nie dotykac.
- **v38 i starsze** - tylko historia, zeszly z roli zapasu 2026-09-13.
- **v41** - na razie WYLACZNIE dokumenty. Zaden kod aplikacji jeszcze nie powstal.

---

# >>> PLAN BUDOWY NAPISANY. TO JEST NAJSWIEZSZY WPIS <<<

**`plans/PLAN_BUDOWY.md`** (33 KB, 622 wiersze) - napisany 2026-09-14 na zlecenie
"mozesz ruszac z rozpisaniem planu budowy". Zastepuje sekcje PO KOMPAKCJI powyzej
wszedzie tam, gdzie sie z nia rozchodzi. Cztery kroki z tamtej sekcji przetrwaly,
ale **dwie kotwice trzeba bylo poprawic**.

## CZTERY USTALENIA Z KODU, KTORYCH KAMPANIA BADAWCZA NIE MIALA

Plan powstal przez sprawdzenie kazdej kotwicy w zywym pliku v40, nie przez przepisanie
tabeli z syntezy. To zmienilo dwa z czterech krokow.

1. **`learnO` NIE JEST KOTWICA.** `v40:1607`: `.learn-overlay{...display:none}`.
   To ukryta nakladka encyklopedii, nie przycisk. Blad przeszedl przez MASTER_PLAN,
   SYNTHESIS i sekcje PO KOMPAKCJI - wszystkie trzy kazaly wskazac ten element
   w ostatnim kroku. Test widocznosci wycialby krok czwarty po cichu.
2. **Encyklopedia nie ma wejscia frontowego.** Wszystkie 12 wywolan `otworzEncykl()`
   to `('agent',id)` albo `('preset',id)`. Zeby tam wejsc, trzeba najpierw cos zaznaczyc.
   **To jest sygnal o aplikacji, nie o samouczku**: jesli kregoslup nie umie czegos
   pokazac palcem, uzytkownik zwykle tez tego nie znajduje.
3. **Kotwica kroku 2 byla za waska.** Ma byc `sL` (cala kolumna), nie `panAg`. Pasek
   trzech zakladek lezy w `.sl-tabs`, POZA `panAg`, a tekst kroku mowi o wszystkich trzech.
4. **Ponizej 700px lewy panel znika calkowicie** (`v40:1735`: `.side-l{display:none}`).
   Gotowy, dzialajacy przypadek dla testu widocznosci - nie hipoteza.

## DZIEWIEC DECYZJI, NIE SIEDEM

Siedem z `SYNTHESIS.md` sekcja 7 plus dwie nowe z kodu:
- **D8** - co robic ponizej 700px, gdzie kotwica kroku 2 nie istnieje.
- **D9 BLOKUJACA** - jak wskazac encyklopedie, skoro nie ma przycisku. Trzy warianty
  w planie, rekomendacja: nadac `id` istniejacemu "Poznaj ten preset" (`v40:34081`).
  **Bez D9 krok czwarty nie ma na czym wisiec.**

Pozostale osiem mozna rozstrzygnac w trakcie - kazda kosztuje najwyzej jeden wiersz
w tablicy danych albo jedna galaz w funkcji.

## PIEC ZMIAN W ISTNIEJACYM PLIKU (faza 1, ma wlasna wartosc)

Z1 przycisk `tutBtn` (nie istnieje), Z2 `id` dla przycisku skrotow, Z3 wykrywanie
`navigator.language`, Z4 usuniecie podwojnego `id` z `costHud`, Z5 `id` dla wejscia
do encyklopedii (zalezne od D9).

**Gdyby Maciej po fazie 1 uznal, ze samouczka jednak nie - fazy 1 sie nie cofa.**
Z3 naprawia pierwsze wrazenie polskiego uzytkownika (dzis dostaje angielski interfejs),
Z4 usuwa realny blad w znaczniku.

## STAN

Plan napisany, decyzje rozstrzygniete, **faza 1 WDROZONA**. Szczegoly nizej.

---

# >>> FAZA 1 WDROZONA. TO JEST NAJSWIEZSZY WPIS <<<

Data: 2026-09-14. Maciej rozstrzygnal trzy decyzje i dal zielone swiatlo na faze 1.

## DECYZJE ROZSTRZYGNIETE PRZEZ MACIEJA

- **D9 = wariant B.** Encyklopedia wskazywana przez nadanie `id` istniejacemu przyciskowi
  "Poznaj ten preset", a nie przez nowy przycisk w naglowku. Wariant A (stale wejscie
  do encyklopedii w naglowku) **zostaje jako otwarta sprawa produktowa**, nie zostal
  odrzucony - odlozony.
- **D1 = start automatyczny**, z trzema warunkami z syntezy: jeden widoczny przycisk
  wyjscia, start po pelnym zaladowaniu, zero blokowania interakcji poza dymkiem.
- **Faza 1: zielone swiatlo.**

Pozostalych szesc decyzji (D2, D3, D4, D5, D6, D7, D8) **nadal nierozstrzygnietych** -
ale zadna z nich nie blokuje fazy 1. Ida moje rekomendacje z `plans/PLAN_BUDOWY.md`
sekcja 2, dopoki Maciej nie powie inaczej.

## POWSTAL NOWY PLIK

`v41/AGENT_TEAMS_CONFIGURATOR_v41.html` - kopia v40 plus szesc podmian.
**7 031 798 bajtow** (przyrost +2057 wobec v40).

- **v40 zamrozony** na 7 029 741 bajtow, zeszly do roli poprzedniej wersji.
- **v39 nadal ZAPASEM** na 6 959 003 bajtach. Nie zmienialem tego statusu - to decyzja
  Macieja, nie moja, a on jej nie podjal.

## CO DOKLADNIE ZMIENILO SIE W PLIKU

| | Zmiana | Gdzie |
|---|---|---|
| **Z1** | Przycisk `tutBtn` z kompasem, **UKRYTY** (`display:none`) | `.tb-util`, przed `?` |
| **Z2** | `id="skrotyBtn"` na przycisku skrotow | ten sam wiersz |
| **Z3** | Wykrywanie `navigator.language` | inicjalizacja `currentLang` |
| **Z4** | Skasowane drugie `id="costHudTip"` | znacznik `costHud` |
| **Z5** | `id="encyklPrBtn"` na przycisku encyklopedii presetu | szablon w `pokazInfoPr` |
| + | Dwa klucze w `I18N_EN.ui` i dwa wiersze w `aktStatHTML()` | parytet PL/EN dla Z1 |

**`tutBtn` jest ukryty celowo**, bo `tutStart()` powstanie dopiero w fazie 3 - widoczny
przycisk wolajacy nieistniejaca funkcje to blad w konsoli przy kazdym kliknieciu.
Ten sam sposob, co przy `liveBtn` i `dtlBtn`. **Zeby odkryc: skasowac `style="display:none"`.**

Uzasadnienie wizualne: **DD56** (kompas, nie biret) i **DD57** (wykrywanie jezyka).

## TESTY: 50 ZIELONYCH, ZERO CZERWONYCH

- `verify_faza1_v41.js` - 32 testy. Skladnia trzech blokow `<script>`, kotwice, skan
  **calego pliku** pod katem znacznikow z dwoma `id` (3625 znacznikow, zero winnych),
  dziewiec przypadkow wykrywania jezyka na **zywym wyrazeniu wycietym z pliku**,
  parytet PL/EN, zero dlugich myslnikow, rozmiary v39 i v40.
- `smoke_faza1_v41.js` - 18 testow. Uruchamia caly plik w atrapie DOM w obu jezykach,
  sprawdza `aktStatHTML()` po dopisaniu `tutBtn`, oraz **regresje trybu Wzorce**.
  Atrapa **wyciagana ze zrodla** `verify_wzorce_v40.js`, nie kopiowana.
- Kontrole dodatnie: skaner podwojnych `id` dostaje sztuczna probke `<button id="a" id="b">`
  i musi ja zlapac; wykrywanie jezyka dostaje `nl-NL` i musi zwrocic angielski
  (gdyby regexp byl `/pl/` zamiast `/^pl/`, niderlandzki przeszedlby jako polski).

## DROBIAZG ZNALEZIONY PRZY OKAZJI, NIE NAPRAWIONY

`aria-label="Skróty klawiszowe"` na przycisku `?` **nie jest tlumaczony** - nie ma go
w `aktStatHTML()`, wiec anglojezyczny uzytkownik slyszy polska etykiete. To samo dotyczy
`aria-label="Otworz szczegóły kosztów"` na `costHud` (dodatkowo brak ogonka w "Otworz").
Pre-istniejaca luka parytetu, nie moja. **Nie ruszalem** - to nie bylo w zakresie fazy 1.
Do backlogu.

## SKRYPTY TEJ FAZY

Katalog `9c11e053-c1cd-4eb4-9b0a-bd70b5772d71`: `wdroz_faza1_v41.js` (wdrozenie,
kazda kotwica musi trafic dokladnie raz albo skrypt pada nic nie zapisujac),
`verify_faza1_v41.js`, `smoke_faza1_v41.js`.

## CO DALEJ

Faza 2 - patrz sekcja nizej.

---

# >>> FAZA 2 WDROZONA. TO JEST NAJSWIEZSZY WPIS <<<

Data: 2026-09-14. Zlecenie: "koszt na pewno w akcie pierwszym, chociaz zeby pokazac
gdzie jest (nie trzeba pokazywac co jest w srodku). Symulacje mozemy pominac w akcie 1.
dzialaj z faza 2".

## DECYZJA D4 ROZSTRZYGNIETA

- **Koszt ZOSTAJE w Akcie 1**, ale tylko jako MIEJSCE. Z opisu wypadlo zdanie
  "Kliknij, zeby zobaczyc rozbicie na agentow" - to juz nie jest mapa, tylko zadanie.
- **Symulacja WYPADA z Aktu 1.** Kandydat do Aktu 2.

**Co z tego wynika za darmo:** zaden krok Aktu 1 nie prosi uzytkownika o klikniecie
czegokolwiek pod spodem. Wszystkie cztery sa czysto opisowe, wiec silnik moze miec
**jedna modalnosc zamiast rozstrzygania jej per krok**. Odpada cala warstwa z
`PLAN_BUDOWY` sekcja 6.6: powrot fokusu do dymka po interakcji z podswietlonym
elementem. To najwieksze uproszczenie, jakie dala ktorakolwiek decyzja tej fazy.

Nadal otwarte: D2, D3 (liczba krokow - de facto rozstrzygnieta na cztery przez ksztalt
tablicy, ale nie slowem Macieja), D5, D6, D7, D8.

## KOMPAS WYCOFANY, JEST LATARKA

Przy wstawianiu danych wyszlo, ze **wzorzec Routing uzywa kompasu jako swojej ikony**
(`routing:{icon`, trzy wystapienia w pliku). DD56 odrzucilo wczesniej ksiazke wlasnie
za kolizje z encyklopedia - ta sama zasada wyklucza kompas. Policzylem ksiazke,
a nie policzylem kompasu.

Jest **latarka** (`&#128294;`), zatwierdzona przez Macieja. Pasuje lepiej niz kompas:
silnik dosownie swieci punktowo na jeden element, przyciemniajac reszte ekranu.
DD56 poprawione, razem z nauka na przyszlosc.

**Pulapka narzedziowa do zapamietania:** `grep` na tym systemie **nie liczy poprawnie
emoji wielobajtowych** - na kompas zwrocil zero przy trzech wystapieniach. Liczyc
Node'em przez `split().length-1`, nie grepem.

## CO POWSTALO

- **`v41/plans/samouczek_kod.js`** (7877 B) - JEDYNE miejsce edycji modulu. Tablica
  `TUT_KROKI` (cztery wiersze Aktu 1) plus `tutT(pl,en)`. Komentarze niosa uzasadnienie
  kazdego kroku i trzy udokumentowane ryzyka.
- **Wdrozone do v41**, plik ma teraz **7 039 715 bajtow**.

### Cztery kroki
| # | id | kotwica | tytul PL |
|---|---|---|---|
| 1 | `canvas` | `svg` + `phaseBar` | Tu stoi Twoj zespol |
| 2 | `biblioteka` | `sL` | Stad bierzesz elementy |
| 3 | `koszt` | `costHud` | Ile to kosztuje |
| 4 | `encyklopedia` | `encyklPrBtn` + `tutBtn` | Gdzie doczytac wiecej |

Teksty PL maja pelne polskie znaki, EN sa bez apostrofow. Akt 2 zostal w komentarzu
jako lista kandydatow **bez tekstow** - swiadomie, zeby nie produkowac tresci,
ktorej nikt nie zamowil.

### Trzy udokumentowane ryzyka wpisane w moduł
1. `sL` znika ponizej 700px - na waskim ekranie samouczek ma trzy kroki. Decyzja D8.
2. ~~`encyklPrBtn` istnieje tylko, gdy w prawym panelu stoi PRESET~~ **POPRAWIONE
   TEGO SAMEGO DNIA, patrz sekcja nizej.** Kotwica nazywa sie teraz `encyklBtn`
   i jest wypisywana z TRZECH miejsc renderowania.
3. `tutBtn` siedzi w polu `dod`, nie `kotw` - gdyby byl kotwica, caly krok czwarty
   zgaslby juz teraz, bo przycisk jest ukryty do fazy 3.

## SKRYPT WDROZENIOWY

`wdroz_samouczek_v41.js` - pierwsze uruchomienie WSTAWIA blok przed zamknieciem ostatniego
`<script>`, kazde kolejne PODMIENIA zawartosc miedzy znacznikami. Sprawdzone: drugie
uruchomienie dalo roznice **+0 bajtow**. Normalizuje LF na CRLF, zeby modul nie wjechal
z innym konczeniem linii niz reszta pliku. Kontrola przed zapisem: blok musi wyladowac
wewnatrz ostatniego bloku `<script>`, inaczej skrypt pada nic nie zapisujac.

## TESTY: 104 ZIELONE, ZERO CZERWONYCH

`verify_kotwice_v41.js` (54) + `verify_faza1_v41.js` (32) + `smoke_faza1_v41.js` (18).

`TUT_KROKI` czytane z **zywego pliku przez atrape DOM**, nie parsowane regexpem - test
ma widziec to, co zobaczy przegladarka, a nie to, co wyglada na tablice.

Kontrole dodatnie w tescie kotwic: `liveBtn` (jest w DOM, ale ukryty) musi zostac zlapany
jako ukryty; nieistniejace id musi zostac zlapane jako brak elementu. Bez nich test
sprawdzalby istnienie zamiast widocznosci i bylby bezwartosciowy.

## DWIE MOJE WPADKI W TEJ FAZIE, OBIE Z LISTY PULAPEK

Zapisuje, bo obie sa w `PLAN_BUDOWY` sekcja 11 i obie i tak popelnilem.

1. **P4 - kotwiczenie na komentarzu.** Test liczyl `ladujPreset('deep_five_minds')`
   i zlapal **moj wlasny komentarz** w module, pokazujac trzy zamiast dwoch. Naprawione
   liczeniem wywolan ZE SREDNIKIEM.
2. **P2 - patchowanie `.js` przez powloke.** Poprawke do tamtego testu puscilem przez
   `node -e` i **ukosniki zginely po cichu** - regexp `\('deep...'\)\s*;` stal sie
   `('deep...')s*;` i zwrocil zero. Naprawione narzedziem do edycji plikow.

Wniosek: spisana pulapka nie chroni przed pulapka. Chroni dopiero test, ktory ja lapie.

## POPRAWKA PO PYTANIU MACIEJA: JEDNA KOTWICA ENCYKLOPEDII, NIE JEDNA TRZECIA

Maciej zapytal: **"ale przeciez agenci tez maja encyklopedie, wiec czemu w tym
przypadku ona znika?"**. Mial racje, a moj opis byl bledny.

**Encyklopedia nie znikala. Znikala moja kotwica.** Przyciskow encyklopedii sa TRZY:
- `pokazWezel` (linia ~32896) - agent kliknety na canvasie, "Poznaj tego agenta"
- `pokazDef` (linia ~32957) - agent z palety, to samo
- `pokazInfoPr` (linia ~34102) - preset, "Poznaj ten preset"

Ja dalem `id` **tylko temu trzeciemu** i wyciagnalem z jednego miejsca wniosek
o zachowaniu trzech.

**Poprawka:** wszystkie trzy dostaly wspolne `id="encyklBtn"`. Jest to bezpieczne,
bo wszystkie trzy pisza do `G('srS').innerHTML`, czyli do JEDNEGO kontenera
nadpisywanego w calosci - w DOM istnieje wiec zawsze najwyzej jeden z nich.
Sprawdzone: skaner podwojnych `id` nadal czysty, 3625 znacznikow.

**Co zostalo z ryzyka:** krok czwarty gasnie juz tylko w dwoch stanach - gdy nic nie
jest zaznaczone (domyslna podpowiedz) i przy zaznaczeniu wielu agentow (`pokazZazn`,
ktory przycisku encyklopedii nie ma). Przy pierwszym wejsciu zaden z nich nie zachodzi.
Argument za wariantem A decyzji D9 **oslabl, ale nie zniknal**.

**Nowy test, zeby to sie nie powtorzylo:** `verify_kotwice_v41.js` sekcja B2 **renderuje
prawy panel naprawde** dla trzech przypadkow (preset, agent z palety, agent z canvasu)
i sprawdza, ze w wyrenderowanym `srS` kotwica jest dokladnie raz. Kontrola dodatnia:
pusty panel musi NIE miec kotwicy. Liczenie wystapien w statycznym HTML nie mowi
o kotwicy dynamicznej nic - dlatego test ma teraz osobna sciezke dla takich kotwic.

**Nauka:** zanim napisze "X znika", policzyc MIEJSCA RENDEROWANIA X, a nie wystapienia
jednego wariantu. To trzecia pulapka tej fazy i jedyna, ktorej nie bylo na liscie.

## TESTY PO POPRAWCE: 111 ZIELONYCH

`verify_kotwice_v41.js` (59) + `verify_faza1_v41.js` (34) + `smoke_faza1_v41.js` (18).
v41 ma teraz **7 040 363 bajty**.

## CO DALEJ

Faza 3 - patrz sekcja nizej.

---

# >>> FAZA 3 WDROZONA. SAMOUCZEK DZIALA. TO JEST NAJSWIEZSZY WPIS <<<

Data: 2026-09-14. Zlecenie: "po prostu faza 3".

**v41 ma 7 054 415 bajtow. Latarka w prawym gornym rogu jest juz zywa.**

## CO POWSTALO

Silnik dopisany do `v41/plans/samouczek_kod.js` (modul urosl z 8,5 KB do 22 KB).
Funkcje: `tutStart`, `tutKrok`, `tutDalej`, `tutWstecz`, `tutKoniec`, `tutSync`,
`tutKey`, `tutWidoczny`, `tutZbierzKroki`, `tutProstokatUnii`, `tutUstawDymek`,
`tutKoliduje`, `tutZaslaniaCalkowicie`, `tutZbuduj`, `tutEsc`. Plus `TUT_CSS`
wstrzykiwany w czasie dzialania, tak jak w module Wzorce.

Dwie zmiany poza modulem: `tutBtn` przestal byc ukryty, a `aktStatHTML()` dostal
jeden wiersz przerysowujacy otwarty dymek przy zmianie jezyka.

## TRZY DECYZJE INZYNIERSKIE, KTORE WARTO ZNAC

**1. Podswietlenie to JEDEN element, nie cztery przyciete prostokaty.**
`box-shadow:0 0 0 9999px` przyciemnia wszystko poza pierscieniem, nie zakrywajac
kotwicy. Trzy rzeczy zalatwione jedna regula: `pointer-events:none` sprawia, ze
**klikniecia przechodza do aplikacji** (wprost warunek trzeci decyzji D1), `border`
daje kontrast obwodki z WCAG 1.4.11, a przyciemnienie nie wymaga zadnej maski.
Opis: **DD58**.

**2. Klawiatura BEZ dotykania istniejacego kodu.** W pliku jest juz lancuch Escape
z kolejnoscia `hitlActive`, `liveRunning`, `simRunning`, `learnOpen`, `.mo.show`,
`connMode`. Samouczek do tego lancucha **nie wchodzi** - rejestruje sie na fazie
PRZECHWYTYWANIA, ktora biegnie przed bulgotaniem, wiec dostaje zdarzenie pierwszy
i wola `stopPropagation`. Ten sam wzorzec jest juz w pliku przy lightboxie (`mzKey`
z `true`). Zero zmian w cudzym kodzie klawiatury.

**3. Swiadome odejscie od `PLAN_BUDOWY` sekcja 6.5: NIE MA aria-live.**
Przy zmianie kroku fokus przenosi sie na dymek, ktory jest `role="dialog"`
z `aria-labelledby` i `aria-describedby` - czytnik oglasza nazwe i opis sam.
Dolozenie regionu `aria-live` dalo by **podwojne czytanie tej samej tresci**.
WCAG 4.1.3 spelnione przez przeniesienie fokusu.

Nie ma tez pulapki fokusu (`aria-modal="false"`). Warunek D1 brzmial "zero blokowania
interakcji poza dymkiem", a pulapka fokusu jest dokladnie takim blokowaniem. Przy okazji
znika ryzyko naruszenia WCAG 2.1.2, ktore jest najczestszym bledem bibliotek tourow.

## JEDYNE MIEJSCE, W KTORYM SILNIK KLIKA ZA UZYTKOWNIKA

`tutStart()` zamyka otwarty tryb pelnoekranowy (encyklopedia, Wzorce, Hooki), bo
zaslaniaja dokladnie to, co samouczek ma pokazac. **To nie jest sprzeczne z decyzja
D2** - D2 mowi o wykonywaniu ZADAN uzytkownika, a nie o zdjeciu zaslony z ekranu,
ktory ma byc opisany.

## TESTY: 174 ZIELONE, ZERO CZERWONYCH

| zestaw | testow |
|---|---|
| `verify_silnik_v41.js` **nowy** | 62 |
| `verify_kotwice_v41.js` | 59 |
| `verify_faza1_v41.js` | 35 |
| `smoke_faza1_v41.js` | 18 |

Silnik jest **uruchamiany w atrapie DOM**, nie sprawdzany regexpem: test przechodzi
caly samouczek, czyta `innerHTML` dymka w obu jezykach, wysyla zdarzenia klawiatury
i sprawdza, ze po zamknieciu klawisze **przestaja byc przechwytywane**.

Kontrole dodatnie: siedem na `tutWidoczny` (zerowy prostokat, cztery kierunki poza
ekranem, `null`, obiekt bez `getBoundingClientRect`) i dwie na geometrie dymka
(dymek na kotwicy MUSI kolidowac, dymek obejmujacy kotwice MUSI byc uznany za
zaslaniajacy calkowicie).

Osobny test pilnuje separacji warstw: **silnik nie zawiera ani jednego `id` kroku
z tablicy danych**. Gdyby ktos wpisal nazwe kroku do silnika, test zaswieci.

## LUKA W ATRAPIE DOM, NIE W SILNIKU

Atrapa powstala przed silnikiem i **nie ma `removeEventListener`** ani na `document`,
ani na `window`. Silnik sprzata po sobie sluchaczy przy zamknieciu, wiec test padl.
Uzupelnilem MAKIETE, a nie oslabilem kod produkcyjny - prawdziwy `document` zawsze
ma `removeEventListener`. Latki sa w `verify_silnik_v41.js`, z kontrola, ze trafily.

## TRZY POPRAWKI PO PIERWSZYM OBEJRZENIU PRZEZ MACIEJA

v41 ma teraz **7 056 275 bajtow**, **185 testow zielonych**.

### 1. Krok o canvasie podswietlal nie to, co trzeba - NAJWAZNIEJSZA

Maciej: "canvas jest zle wyswietlany, pokazuje obszar, prawa zakladke i prawy sidebar,
a 30% canvasu po lewej jest przyciemnione".

**Przyczyna:** kotwica wskazywala `#svg`, ktore ma w CSS **na sztywno 6000 x 6000 px**
i siedzi w `.cv-transform` - kontenerze przesuwanym i skalowanym przy panoramowaniu.
Jego prostokat zaczynal sie tam, gdzie akurat stalo panoramowanie, i konczyl daleko
za prawa krawedzia okna.

**Poprawka:** kotwica to teraz `cvA` (`.cv-area`, `overflow:hidden`) - widoczny obszar
canvasu. **Nauka ogolna: kotwica ma wskazywac element, ktory WYZNACZA WIDOK, a nie
element, ktory niesie tresc.** Zapisane w DD58 i w komentarzu przy kroku.

**Plus siatka bezpieczenstwa:** prostokat kotwicy jest teraz przycinany do okna, zanim
narysuje sie pierscien. Kotwica poprawiona, ale ta klasa bledu nie wroci przy kolejnej
dopisanej kotwicy. Testy: sekcja D2, cztery kontrole dodatnie.

### 2. Pierscien widocznie jechal miedzy krokami

Maciej: "widac taki ruch, chcialbym zeby to bylo bardzo sprawne i bez zadnych lagow".

Mial racje i przyczyna byla moja: `.tut-ring` mial `transition` na `top/left/width/height`
przez 260 ms, a dymek przeskakiwal natychmiast. **Z niedopasowania tych dwoch robilo sie
wrazenie zacinania**, mimo ze nic sie nie zacinalo.

Przejscie usuniete. Zostalo 120 ms pojasnienia przy OTWARCIU samouczka, ktore odpala sie
samo, bo element wychodzi z `display:none` - miedzy krokami sie nie powtarza. Zero kodu
i zero restartowania animacji z JS.

### 3. Latarka przeniesiona: miedzy Hooki a koszt

Maciej: "przez to, ze dodalismy latarke, koszt sie nam nie miesci ladnie".

**Pomiar potwierdza:** `.tb-cost` ma `flex:1 1 auto` przy `width:260px`, wiec kazdy
przycisk dolozony do prawej grupy zwezal WLASNIE pasek kosztu. Latarka stala w `.tb-util`,
obok znaku zapytania.

Moje pierwotne uzasadnienie tamtego miejsca ("sasiedztwo ze znakiem zapytania mowi
to jest pomoc") **bylo estetyczne i przegralo z pomiarem**. WCAG 3.2.6 Consistent Help
nadal stoi, bo wymaga tego samego WZGLEDNEGO miejsca na kazdym ekranie, a nie sasiedztwa
z czymkolwiek - aplikacja jest jednym ekranem. DD56 poprawione.

Testy pilnuja kolejnosci w naglowku: `hookiBtn` przed `tutBtn` przed `costHud`,
i `tutBtn` poza `.tb-util`.

## PIEC KROKOW ZAMIAST CZTERECH - DECYZJA D3 ROZSTRZYGNIETA

Maciej: "w Kroku 2 dodalbym jeszcze w opisie ze mozna tutaj tez stworzyc swojego
wlasnego agenta (...) i dodalbym tez kolejny krok ktory bedzie pokazywal gdzie jest
dokladnie przycisk z encyklopedia".

v41 ma teraz **7 058 315 bajtow**, **194 testy zielone**.

### To ujawnilo blad, ktorego sam bym nie zauwazyl

Krok czwarty **juz** wskazywal encyklopedie, wiec prosba wygladala na powtorzenie.
Nie byla. Kotwica kroku brzmiala `kotw:'encyklBtn', dod:['tutBtn']`, a te dwa elementy
leza w zupelnie roznych miejscach: **encyklBtn renderuje sie w PRAWYM PANELU, a tutBtn
stoi w NAGLOWKU**. Pierscien rysowal SUME ich prostokatow, czyli wielkie pudlo od
naglowka w dol przez caly prawy panel - i nie wskazywalo niczego.

**To ta sama klasa bledu, co kotwica canvasu**, tylko z drugiej strony: tam kotwica
byla za duza sama z siebie, tu zrobilem ja za duza recznie. Dwa bledy pod rzad
z tego samego niedopatrzenia.

### Regula wpisana do modulu

**Pole `dod` sluzy do rzeczy lezacych OBOK SIEBIE**, jak canvas i pasek faz nad nim.
Elementy w odleglych czesciach ekranu nie moga dzielic jednego kroku. **Jesli dwie
rzeczy sa daleko od siebie, to sa dwa kroki, a nie jeden.**

### Piec krokow

| # | id | kotwica | tytul PL |
|---|---|---|---|
| 1 | `canvas` | `cvA` + `phaseBar` | Tu stoi Twoj zespol |
| 2 | `biblioteka` | `sL` | Stad bierzesz elementy |
| 3 | `koszt` | `costHud` | Ile to kosztuje |
| 4 | `encyklopedia` | `encyklBtn` | Gdzie poznac agentow i zespoly |
| 5 | `powrot` | `tutBtn` | Wrocisz tu, kiedy zechcesz |

Krok drugi wspomina teraz o przycisku **Custom Agent** (`otworzKreator()`), ktory
i tak lezy w `sL`, wiec pierscien juz go obejmowal - brakowalo tylko zdania.

Piatka miesci sie w rekomendacji syntezy (cztery do pieciu), wiec **D3 jest zamkniete
bez lamania czegokolwiek**.

### Nowe testy regresyjne
- krok `encyklopedia` ma `dod` PUSTE i wskazuje tylko przycisk encyklopedii
- `powrot` to osobny krok na `tutBtn`
- **zaden krok nie laczy naglowka z prawym panelem** - ta regula pilnuje calej klasy
- krok `biblioteka` wspomina o Custom Agent

## KROK O KOSZCIE MOWI JUZ, CO OTWIERA (2026-09-14)

Maciej: "chcialbym zeby w informacji o kosztach byla jeszcze wzmianka o tym ze jak sie
klknie ten przycisk to sie odpala centrum kosztow".

Dopisane. v41 ma **7 059 066 bajtow**, **198 testow zielonych**.

**Nazwy sa PRZEPISANE Z APLIKACJI, nie wymyslone:** w PL modal nazywa sie
**Centrum kosztow**, w EN **Cost Command Center** (klucz slownika ustawiany na
`cbmTitleText` w `aktStatHTML`). Samouczek, ktory nazywa rzeczy inaczej niz aplikacja,
klamie - a to najgorszy rodzaj bledu w czyms, co ma uczyc, gdzie co jest.

**Trzy nowe testy pilnuja tego zwiazku:** nazwa PL zgadza sie z naglowkiem modalu
`moCost`, nazwa EN zgadza sie z wpisem w `I18N_EN.ui`, a krok **nadal nie namawia
do klikniecia** (brak trybu rozkazujacego). Ten ostatni pilnuje granicy decyzji D4:
zdanie mowi, CO SIE STANIE po kliknieciu, ale nie kaze klikac.

### Pulapka, ktora zlapala mnie po raz trzeci w tej sesji
Ten wpis trafil najpierw do pliku **okrojony**: napisalem go przez `node -e` w podwojnych
cudzyslowach powloki, a **backticki markdownowe wykonaly sie jako podstawienia polecen**
i zjadly cztery nazwy (`cbmTitleText`, `aktStatHTML`, `moCost`, `I18N_EN.ui`), zostawiajac
puste miejsca. Powloka nawet wypisala "command not found" - zauwazylem to tylko dlatego,
ze czytalem wyjscie.

To trzecia odmiana tej samej pulapki w jednej sesji: raz zginely ukosniki w wyrazeniu
regularnym, raz test zaczepil sie o komentarz, teraz backticki. **Wniosek operacyjny:
tresci z backtickami i ukosnikami pisac narzedziem do plikow, nigdy przez powloke.**

---

# >>> FAZA 4 WDROZONA. SAMOUCZEK KOMPLETNY. NAJSWIEZSZY WPIS <<<

Data: 2026-09-14. v41 ma **7 062 342 bajty**, **216 testow zielonych**.

## ZNALEZISKO, KTORE PRZESADZILO O KSZTALCIE TEJ FAZY

Trzeci warunek decyzji D1 brzmial "start po PELNYM zaladowaniu interfejsu, nie w trakcie
animacji wejscia". Okazal sie **zupelnie konkretny**, a nie ostrozniościowy:

`ladujPreset` przy pierwszym wejsciu wola **`pokazHero()`**, ktore zakrywa canvas pelna
zaslona (`.hero-overlay`, `inset:0`, tlo `rgba(6,6,10,0.92)`, `blur(12px)`) i **samo znika
dopiero po 3 SEKUNDACH** albo po kliknieciu. Samouczek odpalony wczesniej podswietlalby
elementy ZA zaslona - uzytkownik dostalby dymek opisujacy cos, czego nie widac.

Automat czeka wiec, az zaslona zniknie: proba co 250 ms, maksymalnie 40 razy (10 sekund).
**Gdyby zaslona nie znikla, automat sie PODDAJE**, a nie odpala na slepo pod nia.

## DWIE FUNKCJE, NIE JEDNA

`tutAutoDozwolony()` rozstrzyga, czy automat MA PRAWO wystartowac. `tutAutoStart()`
to sama orkiestracja czasu. Podzial jest celowy: dzieki niemu **cala decyzja daje sie
sprawdzic testem bez czekania na zegary**.

`tutAutoDozwolony()` mowi NIE, gdy: samouczek juz otwarty, w `acV32_tut` cokolwiek stoi
(`done` albo `skip`), albo uzytkownik ma otwarty tryb pelnoekranowy.

**Roznica miedzy recznym a automatycznym startem, wpisana wprost w kod:** recznie odpalony
samouczek ZAMYKA otwarte tryby pelnoekranowe, automat ich NIE rusza i po prostu odpuszcza.
To roznica miedzy "poprosilem o oprowadzenie" a "wtargnal na ekran".

## DECYZJA D6 ZAMKNIETA PO MOJEJ REKOMENDACJI

Kto raz zobaczyl samouczek - przeszedl go albo zamknal - **nie dostaje go ponownie**,
niezaleznie od liczby wizyt. Droga powrotna to latarka w naglowku, nic wiecej.

## TESTY AUTOMATU: 18 NOWYCH

Zeby to przetestowac, atrapa DOM musiala urosnac o dwie rzeczy, ktorych nie miala:

1. **Prawdziwy `localStorage`** - dotad `setItem(){}` tylko UDAWAL zapis, wiec nie dalo sie
   sprawdzic ani tego, ze `tutKoniec` odnotowuje wynik, ani galezi "uzytkownik juz to widzial".
2. **Kolejka zegarow zamiast `setTimeout: () => 0`**, ktory nigdy nie wolal funkcji zwrotnej.
   Test oprozniania kolejke recznie, wiec **caly przebieg czekania na ekran powitalny
   przechodzi bez ani jednej sekundy realnego oczekiwania**.

Pierwsza wersja tej latki wywalila sie od razu: wpialem magazyn jako pole na `ctx.__O`,
a atrapy w literale kontekstu wykonuja sie w zakresie Node, gdzie `__O` nie istnieje.
Poprawione na zmienne zakresu harnessu.

Przebieg sprawdzany testem: automat planuje probe, przy widocznej zaslonie NIE startuje
ale planuje kolejna, po zniknieciu zaslony startuje i stoi na kroku pierwszym.
Osobno: zaslona, ktora nie znika, konczy sie poddaniem po 41 probach (nie petla).
Osobno: zamkniecie krzyzykiem zapisuje `skip`, przejscie do konca zapisuje `done`,
i po jednym i po drugim automat juz nie startuje.

## JAK TO ZOBACZYC

W zwyklym oknie automat **sie nie odpali**, jesli samouczek zostal juz raz przejrzany -
klucz `acV32_tut` siedzi w `localStorage`. Do sprawdzenia: **okno prywatne**.

## STAN SAMOUCZKA: KOMPLETNY

Wszystkie cztery fazy z `PLAN_BUDOWY` sekcja 9 wdrozone. Decyzje zamkniete: D1, D3, D4,
D6, D7, D9. Pozostaja otwarte tylko **D2** (czy tour ma kiedykolwiek klikac za uzytkownika -
dzis nie klika), **D5** (wlasny silnik - de facto rozstrzygniete przez zbudowanie go),
**D8** (zachowanie ponizej 700px - dzis ciche pominiecie kroku) oraz **caly Akt 2**.

---

# >>> PO KOMPAKCJI - ZACZNIJ TUTAJ <<<

## STAN NA 2026-09-15 WIECZOR (najswiezszy - czytaj TO, reszta ponizej to historia)

**v41 OPUBLIKOWANY NA GITHUB.** `index.html` = kopia v41. Push `d056d9b`, zgoda Macieja
wprost ("czy mozna zrobić tak ze ty pushniesz wszystko do githuba"). 499 testow zielonych,
0 bledow (262+21+86+77+35+18). `git status` czysty poza `DESIGN_DECISIONS.md` (swiadomie
lokalny, zobacz nizej).

**Co doszlo PO poprzednim "PO KOMPAKCJI" (bylo 422 testy/DD77, jest 499/DD83):**
- **DD78-79:** pasek faz nad canvasem - licznik agentow dostal wlasna plakietke (byl golym
  tekstem, zlewal sie z nazwami konczacymi sie cyfra typu "FIVE MINDS #1"); prog pokazywania
  paska obnizony z "3+ faz" na "1+ faza" - wczesniej **11 z 62 presetow** nigdy go nie
  pokazywalo (zmierzone).
- **DD81:** 33 litery cyrylicy usuniete z tekstow (25 slow, 32 wystapienia, dziedziczone
  z v38). Mapowanie slowo-po-slowie, nie regula na klase znakow - inaczej "wpisywaс" stalo
  by sie "wpisywań" zamiast "wpisywać".
- **DD80, DD82, DD83:** rog naglowka - usunieta plakietka wersji i separator, logo +4,5%,
  kontener marki wyrownany DOKLADNIE do krawedzi lewego sidebara (rachunek w CSS, nie oko).
  **DD82 sam siebie poprawil w DD83:** pierwsza wersja zmierzyla kontener w DOM (0px roznicy -
  prawda, ale niepelna) i przegapila, ze SAM TEKST zostawial 44px pustki przed krawedzia.
  Maciej przyslal prawdziwy zrzut ekranu; zmierzony piksel-po-pikselu przez Puppeteer
  (nowe narzedzie w projekcie) - margines skrocony do 18px, font 11px->13px.
- **index.html = v41** (byl kopia v32 - to byl JEDYNY warunek blokujacy).

**Publikacja - co naprawde zrobione, nie tylko przygotowane:**
1. `.gitignore`: dodane `v33/`-`v40/` (56,7 MB historii dev, zostaje lokalnie) i `screen/`.
2. `README.md` przepisany calkowicie pod v41 (60/62, nowy tagline "if Claude Code is the
   engine..." z dopiskiem Maciej-poprawka, tabela wersji v32-v41, sekcje Hooki/Wzorce).
3. **`INSTALL.md` (nowy)** - pelna instrukcja podpiecia agentow/presetow do Claude Code.
4. **`generate_catalog.js` (nowy, trzeci skrypt)** - buduje `~/.claude/PRESET_CATALOG.md`
   z tych samych danych HTML co dwa pozostale skrypty. Zamknieta luka: auto-routing dzialal
   wczesniej tylko z prywatnego, recznie robionego katalogu Macieja. Stary katalog
   zbackupowany do `PRESET_CATALOG.md.bak_pre_v41`. Wszystkie 62 nazwy komend zweryfikowane
   1:1 z prawdziwymi plikami w `~/.claude/commands/`.
5. `plugin.json`, `docs/SKILLS_ARCHITECTURE.md`, `docs/ROUTING_SYSTEM.md` przepisane na v41
   (byly v32.16/35/42). Z `plugin.json` usuniete martwe odniesienia do skilli spod sciezek,
   ktore nie istnialy pod tą nazwa i tak czy inaczej sa gitignored.
6. **Modul Wzorcow przeniesiony**: `v39/plans/wzorce_kod.js` skopiowany do
   `v41/plans/wzorce_kod.js` - inaczej repo publikowaloby v41 bez zrodla jednego z dwoch
   duzych modulow (samouczek juz mial swoje zrodlo w v41/). **v39 zostaje zamrozone jak
   bylo - nowe edycje modulu Wzorce ida teraz do kopii w v41/.**
7. **GitHub push protection zlapal Stripe test key** w przykladzie "czego NIE robic" w
   `Research/research-claude-md-patterns/research/R4_writing_practices.md` (prawdziwy
   format klucza Stripe, mimo ze to ich wlasny publiczny przyklad). Zredagowany, commit
   zamendowany, push powtorzony - czysto. **Lekcja: przy nastepnej publikacji grep po
   wzorcach kluczy (sk_test_, sk-ant-, AKIA, ghp_, xox...) PRZED commitem, nie polegac na
   tym ze GitHub zlapie.**

**Czego SWIADOMIE NIE zrobiono (potwierdzone przez Macieja, nie do zrobienia bez nowego
zlecenia):**
- **`DESIGN_DECISIONS.md` zostaje lokalny i niepolinkowany.** 2067 linii, po polsku, imie
  Macieja 36 razy w kontekscie typu "Maciej wybral ten wariant". Nie jest w gicie.
- **Wlasne nazwisko Macieja w `research-skills-architecture`** (4 wystapienia) - zostaje,
  to atrybucja.
- **Kolizja nazw agentow** `writer`/`technical_writer` - oba pokazuja sie jako "Technical
  Writer" po angielsku. Zauwazone przy audycie, zostawione na teraz.
- **Zrzuty ekranu w README** - dalej z ery v32 (nie pokazuja Hookow/Wzorcow/samouczka).
  README ma to wprost napisane. Maciej sam podmieni bezposrednio w GitHub UI.

**Co zostaje do decyzji Macieja - nic nie zaczynac bez slowa:**
1. **Wieksze tematy D:** szesc brakujacych zdarzen hookow (mamy 27 z 33 - oficjalnej listy),
   luki Wzorcow z `WZORCE_SYSTEM.md` sekcja 10 i `BADANIA_SKALOWANIE.md`, szesciu agentow
   z repo agency-agents, Akt 2 samouczka, tryb Live (**ten PO publikacji - juz jest po**).
2. **Marketplace** - trzeci krok z pierwotnej kolejnosci Macieja ("backlog, GitHub,
   marketplace"), wciaz wymaga osobnej, wyraznej zgody. Publikacja GitHub NIE jest zgoda
   na marketplace.
3. **Czy encyklopedia i canvas sa juz plynne** - Maciej potwierdzil: "działa płynnie wiec
   mozemy przejsc dalej". Zamkniete, nie wracac bez nowego zgloszenia.

**ZASADA, KTORA MUSI PRZEZYC KOMPAKCJE: publikacja wymaga WYRAZNEJ ZGODY za kazdym razem.**
GitHub 2026-09-15 mial wyrazna zgode ("czy mozna zrobić tak ze ty pushniesz"), wiec zostal
zrobiony. To NIE jest zgoda na kolejne publikacje - marketplace i kazdy przyszly push
potrzebuja wlasnego pytania i wlasnego "tak".

---

## ZLECENIE MACIEJA (2026-09-14, tuz przed kompakcja) - HISTORIA, juz wykonane

"teraz przygotuj sie na compact i bedziemy dzialac z backlogiem a nastepnie wrzucac
na githuba i marketplace"

Czyli kolejnosc: **1. backlog, 2. GitHub, 3. marketplace.**

## ZASADA, KTORA MUSI PRZEZYC KOMPAKCJE

**Publikacja wymaga WYRAZNEJ ZGODY za kazdym razem i dopiero na sam koniec.**
Zdanie powyzej jest PLANEM, nie zgoda. Gdy przyjdzie moment wrzucania na GitHub,
zapytac wprost i poczekac na "tak". To samo dotyczy marketplace.

To nie jest nadgorliwosc: Maciej sam sformulowal te zasade i sam ja powtorzyl
("plan publikacji to nie zgoda na publikacje").

## BACKLOG - STAN FAKTYCZNY (HISTORIA: pozycje A, B i C ZAMKNIETE 2026-09-14/15)

Pelna lista siedzi w pamieci `project_v33_backlog_ideas.md` (541 wierszy, 25 sekcji).
Ponizej to, co realnie czeka na decyzje TERAZ, w kolejnosci od najtanszego.

### A. Drobiazgi z v40, zgloszone przez Macieja, wciaz NIEZROBIONE
1. **Chmurka w trybie Wzorce otwiera sie WYLACZNIE do gory.** `.wz-tip-tr` ma na sztywno
   `bottom:calc(100% + 8px)`; wariant poziomy istnieje, pionowego nie ma wcale. Skutek:
   etykieta SILNIK (najwyzsza) praktycznie nie pokazuje chmurki. **To jedna poprawka
   zalatwiajaca DWA z trzech zgloszonych bledow.** Poprawka: dorobic `.wz-tip-dol`
   z `top:calc(100% + 8px)` i przeniesc mostek `::after` z `top:100%` na `bottom:100%`
   (inaczej chmurka znika przy przejezdzie mysza). `wzTip()` juz przyjmuje klase dodatkowa.
2. **Plakietka "rzadki" przy Blackboardzie "nic nie pokazuje"** - to ten sam blad chmurki,
   nie osobna usterka. **Jej tresc i tak stoi na stale na karcie** jako blok "Uczciwie:"
   (`WZ_UWAGA`), wiec usuniecie plakietki NIE gubi zadnej informacji. Maciej proponowal
   usuniecie; decyzja nadal jego.
3. **Przycisk Hooki nie tlumaczy sie na angielski.** Slowo "Hooks" jako etykieta interfejsu
   nie wystepuje w pliku ANI RAZU. Napis jest wpisany na twardo po polsku w kilku miejscach
   (etykieta, `title`, oraz `title` i `aria-label` przycisku zamykajacego). To nie jest
   zapomniany klucz slownika - tej sciezki tlumaczenia nigdy nie bylo. Przy poprawce
   sprawdzic tak samo przycisk trybu Wzorce.

### B. Znalezione przy okazji v41, NIE naprawione
4. **Etykiety dostepnosci bez tlumaczenia.** `aria-label="Skróty klawiszowe"` na przycisku
   `?` i `aria-label="Otworz szczegóły kosztów"` na `costHud` sa wpisane po polsku i NIE ma
   ich w `aktStatHTML()`, wiec anglojezyczny uzytkownik czytnika ekranu slyszy polskie
   etykiety. W drugim brakuje tez ogonka w slowie "Otworz". Warto sprawdzic, ile jeszcze
   takich `aria-label` w naglowku omija `aktStatHTML()`.

### C. Porzadki przed GitHubem
5. **Piec pustych plikow w katalogu glownym**: `konczy`, `mysli`, `narzedzie`, `odpowiada`,
   `siega` (0 bajtow, widoczne w `git status`). Smieci po moim poleceniu powloki - nazwy
   pochodza z etykiet kregoslupa w module Hooki, gdzie `>` z rysunku ASCII zadzialal jako
   przekierowanie. **Maciej byl pytany DWA RAZY i nie odpowiedzial.** Zapytac trzeci raz
   albo uznac milczenie za zgode na usuniecie - ale zapytac.

### D. Wieksze tematy (nie zaczynac bez slowa)
- Szesc brakujacych zdarzen hookow (oficjalnie 33, mamy 27)
- 33 litery cyrylicy z v38
- Trzy luki w tresci Wzorcow z `BADANIA_SKALOWANIE.md`
- Szesciu agentow z repo agency-agents
- Dziesiec luk Wzorcow z `v39/plans/WZORCE_SYSTEM.md` sekcja 10
- Akt 2 samouczka
- Tryb Live (odkryc `liveBtn`) - **temat Macieja, PO publikacji**

## GITHUB - CO SPRAWDZILEM, ZANIM CZEGOKOLWIEK DOTKNALEM

Nic nie wypchnalem i nic nie dodalem do indeksu. To jest rozpoznanie, nie dzialanie.

**Dobra wiadomosc:** najwieksze katalogi sa juz ignorowane. `analizy-html/` (1,1 GB),
`notebookLM/` (569 MB) i `GIF i screens/` (30 MB) nie poszlyby na GitHub. Sprawdzone
przez `git check-ignore`, nie przez zgadywanie.

**Co REALNIE dorzucaloby sie do repo:** okolo **67 MB** nowych plikow - dziewiec wersji
`v33` do `v41` (po 6-8 MB kazda) plus `Research/` (5 MB) plus `DESIGN_DECISIONS.md`.
Miesci sie w limitach GitHuba bez problemu.

**Trzy rzeczy do rozstrzygniecia PRZED wypchnieciem:**
1. **Czy publikowac wszystkie dziewiec wersji, czy tylko v41 i v32?** Dzis w repo jest
   v32 jako kanoniczna. Dziewiec wersji to historia rozwoju - moze byc atutem
   (pokazuje proces) albo szumem. Decyzja Macieja.
2. **Research wymaga ANONIMIZACJI.** Jego wlasna notatka w backlogu mowi wprost: usunac
   Lebioda, CV i projekty prywatne przed publikacja. **Tego jeszcze nikt nie zrobil.**
   To jest twardy blokujacy warunek, nie kosmetyka.
3. **`index.html` to dzis kopia v32.** Przy publikacji trzeba zdecydowac, czy demo na
   GitHub Pages ma pokazywac v41. Backlog mowi: nie mirrorowac niesprawdzonego.

**Uwaga osobna:** `.git` wazy **748 MB**, czyli duze pliki kiedys juz weszly do historii.
To nie blokuje publikacji (HEAD jest czysty), ale klonowanie repo jest przez to ciezkie.
Naprawa oznacza przepisanie historii - osobny temat, nie na teraz.

## STAN WERSJI NA WEJSCIE PO KOMPAKCJI

- **v41 AKTYWNA** - **7 090 972 bajty**, **422 testy zielone**. Samouczek + runda kosmetyczna
  + backlog + dwie rundy wydajnosciowe.
- **v40 ZAMROZONA** - 7 029 741 bajtow. Sprawdzone: nietkniete przez cala sesje.
- **v39 ZAPAS** - 6 959 003 bajty. Nie dotykac. Sprawdzone: nietkniete.
  **UWAGA:** w `v39/plans/` zyje ZRODLO modulu Wzorcow, ktore bylo edytowane - to nie jest
  plik HTML v39 i nie narusza zamrozenia.
- **v32 OPUBLIKOWANA** - to ona jest dzis na GitHubie i w `index.html`.

## GDZIE CO LEZY

- **Modul samouczka:** `v41/plans/samouczek_kod.js` - JEDYNE miejsce edycji danych i silnika.
  Wdrozenie: `wdroz_samouczek_v41.js` (podmienia miedzy znacznikami SAMOUCZEK POCZATEK/KONIEC).
  Edycja w HTML przepada przy nastepnym wdrozeniu.
- **Modul Wzorcow:** `v39/plans/wzorce_kod.js` - JEDYNE miejsce edycji. Wdrozenie:
  `wdroz_wzorce_v41.js` w katalogu roboczym sesji (suchy bieg domyslnie, zapis z `--zapisz`).
  Edycja bezposrednio w HTML przepada przy nastepnym wdrozeniu.
  **Uwaga:** `wzSyncLang()` NIE jest w module - zyje w HTML, poza znacznikami.
- **PIEC zestawow testow** (katalog `9c11e053-...`): `verify_kosmetyka_v41.js` (**206**),
  `verify_silnik_v41.js` (86), `verify_kotwice_v41.js` (77), `verify_faza1_v41.js` (35),
  `smoke_faza1_v41.js` (18). Razem **422**.
- **Kopia Research sprzed anonimizacji:** `kopia_research_v33/` w katalogu roboczym sesji.
- **Decyzje wizualne:** `DESIGN_DECISIONS.md`, ostatnie to **DD77** (canvas). Numery DD59-DD77
  powstaly w tej sesji.

## PULAPKA, KTORA WROCILA CZTERY RAZY (dopisane 2026-09-15)

**Test zaczepiony o TEKST lapie wlasny komentarz.** W sesji 2026-09-14/15 zdarzylo sie to
CZTERY razy: przy `ladujPreset`, przy kluczu `Zamknij encyklopedia`, przy `wz-rzadki`
i przy `backdrop-filter`. Za kazdym razem test swiecil na czerwono przez proze, ktora sam
napisalem obok poprawki.

**Regula 16 w praktyce:** zaczepiac o KOD (wywolanie `t(...)`, deklaracje wlasciwosci),
a jesli trzeba przeszukac plik - najpierw wyciac komentarze:
`html.replace(/\/\*[\s\S]*?\*\//g,'')`.

## PULAPKI Z POPRZEDNIEJ SESJI - wszystkie trzy to ta sama rodzina

1. **Ukosniki gina w `node -e` przez powloke** - regexp `\('x'\)\s*;` stal sie `('x')s*;`.
2. **Backticki markdownowe wykonuja sie jako polecenia** w podwojnych cudzyslowach powloki -
   zjadly cztery nazwy z wpisu w dzienniku, powloka wypisala "command not found".
3. **Test zaczepiony o komentarz, nie o kod** - liczyl wywolanie `ladujPreset` i zlapal
   wlasny komentarz w module.

**Wniosek operacyjny: tresci z backtickami, ukosnikami i polskimi znakami pisac narzedziem
do plikow, nigdy przez powloke.** Do liczenia emoji uzywac Node przez `split().length-1`,
bo `grep` na tym systemie nie liczy poprawnie znakow wielobajtowych.

---

# RUNDA KOSMETYCZNA 2026-09-14 (po samouczku, przed backlogiem)

Punkt wyjscia: plik **7 062 342 bajty** po zamknietym samouczku, 216 testow zielonych.
Stan koncowy rundy na dole tej sekcji.

## Zamowienie Macieja

1. Layout wymagal dwoch klikniec, zeby faktycznie wysrodkowac preset - ma wystarczyc jedno.
2. Przelacznik motywu: ikona ma zapowiadac motyw PO kliknieciu (ciemny -> slonce,
   jasny -> ksiezyc), a w motywie jasnym przycisk byl calkowicie niewidoczny - zmienic
   takze wypelnienie kontenera.

## Co bylo naprawde zepsute

**Layout.** `ukladWezlow()` czyta biezace `scale` we wzorze `(cw/sc-tw)/2`. Stary
`autoUklad()` zerowal `scale` dopiero PO ukladzie, wiec pierwszy klik liczyl srodek dla
powiekszenia sprzed kliknicia (po wczytaniu presetu okolo 0,708). Zmierzone: 247 px za
daleko w prawo. Naprawa to sama kolejnosc. Przy okazji stala `+30` w tym samym wzorze
okazala sie wzieta na oko i przesuwala uklad o 18 px - zastapiona wyliczeniem `(GX-NW)/2`.

**Motyw.** Nie kwestia gustu, tylko blad. `<meta name="color-scheme" content="dark light">`
(linia 8) wymusza ciemny wariant schematu systemowego dla calego dokumentu, niezaleznie od
`data-theme`. `.theme-toggle` nie mial wlasnego `color`, wiec bral systemowy `buttontext`,
czyli BIALY - takze w motywie jasnym. Bialy glif na `#F4F5F8` to 1,09:1. Sasiedni `langBtn`
mial `color` w stylu wpisanym w znacznik i dlatego nie byl dotkniety.

**Uwaga na przyszlosc:** kazdy nowy `<button>` bez wlasnego `color` odziedziczy ten sam
problem. Przy dodawaniu przyciskow do naglowka ustawiac `color` jawnie.

## Wdrozenie

Wszystko bezposrednio w HTML narzedziem do edycji (nie przez powloke - patrz pulapki wyzej).
Cztery miejsca: reguly CSS po `.theme-toggle:focus-visible`, glif w znaczniku przycisku,
`przelMotyw()`, odczyt zapisanego motywu przy starcie, plus `autoUklad()` i `ukladWezlow()`.
**Zadne z nich nie lezy w module samouczka**, wiec ponowne wdrozenie `samouczek_kod.js`
tego nie skasuje.

## Plakietki werdyktu na srodku

Prosba dotyczyla "Nadaje sie do" / "Nie dla" u presetu, ale klasa `.vd-head` obsluguje
**szesc** naglowkow w **trzech** miejscach tego samego prawego panelu (`pokazInfoPr`,
`pokazWezel`, `pokazDef`). Wysrodkowanie tylko u presetu daloby dwa rozne wyrownania w jednym
komponencie, wiec regula jest wspolna: `align-self:center` na `.vd-head`. Listy pod spodem
zostaja do lewej. Szczegoly w DD61.

## Zamkniecie encyklopedii to sam symbol

Z pigulki "X Zamknij" zostal sam znak X w okragłym przycisku o boku 40px. Napis byl widoczna
nazwa przycisku, wiec po jego usunieciu cala role przejmuje `aria-label` (byl tam juz
wczesniej - stad bezpieczenstwo tej zmiany), a `title` dokłada podpowiedz z "(Esc)".
**Sprawdzone, nie zalozone:** Escape naprawde zamyka encyklopedie.

Po drodze wyszedl blad: klucz slownika brzmial `'Zamknij encyklopedia'` (zla odmiana),
a `aktStatHTML()` chodzi przy starcie - wiec te forme widzial KAZDY polski uzytkownik.
W znaczniku stalo przy tym trzecie brzmienie, pasujace do niczego. Wszystkie sprowadzone
do `'Zamknij encyklopedię'`. Szczegoly w DD62.

## Para "Co umiem" / "Czego nie" obok siebie

Siatka encyklopedii ma **szesc** progow szerokosci i `grid-auto-flow:dense`. Obie listy byly
jedynymi kaflami o szerokosci jednej kolumny w calej siatce, wiec jako jedyne nadawaly sie do
upychania w dziury po wiekszych. Przy 5 kolumnach drugi wiersz to 2 + 2 (sekcja 3 i META),
zostawala jedna wolna kolumna - wpadalo w nia "Co umiem", a "Czego nie" szlo do nastepnego
wiersza. Przy 3 kolumnach to samo. Przy 2, 4 i 6 wychodzilo dobrze **przypadkiem**.

Para jest teraz jednym elementem siatki o szerokosci dwoch kolumn (`.enc-duo`) z wlasna
siatka w srodku - sasiedztwo wynika ze struktury, nie ze szczescia w upychaniu.

**Propozycja przeniesienia META do osobnego wiersza sprawdzona i odrzucona:** pogorszylaby
uklad przy 4 kolumnach, gdzie drugi wiersz wypelnia sie dzis idealnie. Szczegoly w DD63.

## Jedna szerokosc kafli w encyklopedii

Kafle mialy trzy rozne szerokosci naraz (pelna dla sekcji 1, 2 i 10, dwukolumnowa dla reszty).
Teraz wszystkie ida na pelna szerokosc siatki. Baner z nazwa agenta/presetu zostaje szerszy,
bo lezy POZA siatka - swiadomy wyjatek, decyzja Macieja.

**Uwaga dla przyszlych zmian:** nadpisanie musi stac PO ostatnim progu w zapytaniach
o kontener. Reguly progowe maja te sama wage (0,2,0), wiec decyduje pozycja w pliku -
przeniesienie wyzej wylaczy je po cichu. Test pilnuje kolejnosci, nie samej obecnosci.

Skutek uboczny: `grid-auto-flow:dense` nie ma juz czego upychac, wiec klasa bledu z DD63
znika na poziomie ukladu. Para z DD63 nadal stoi obok siebie, jako pelnowymiarowy wiersz
podzielony na polowy. Szczegoly w DD64.

## Listy w Centrum kosztow do samego dolu

Zakladki "Szczegóły" i "Eksport" mialy sufit wpisany na sztywno (480 px i 240 px) niezalezny
od wysokosci okna - stad podwojne przewijanie przy wolnym miejscu pod spodem.

**Pulapka, ktora trzeba bylo zabezpieczyc:** zamiana `.cbm-body` w pojemnik gietki czyni
elementami **wszystkie piec** zakladek, a domyslne `flex-shrink:1` ucialoby tresc trzech
pozostalych. Stad `.cbm-pane.on{flex:0 0 auto}` i rozciaganie tylko dla tych dwoch.
Jedna zmiana dotknela pieciu ekranow - ta sama lekcja co przy DD61. Szczegoly w DD65.

## Tekst na cala szerokosc + META na cztery kolumny

Trzy klasy tekstowe mialy `max-width:65ch`. **Dopoki kafle byly dwukolumnowe, sufit prawie nie
dzialal** - kolumna i tak byla wezsza. Po DD64 zaczal ciac tekst w polowie szerokiej karty.
Zdjety ze wszystkich trzech miejsc encyklopedii; sufity w Hookach i Wzorcach celowo nietkniete
(test tego pilnuje, zeby wiadomo bylo, ze poprawka nie poszla za szeroko).

META na cztery kolumny z szersza ostatnia. Sprawdzone renderowaniem: czwartym polem presetu
jest "Wzorzec", wiec szersza kolumna trafia tam sama z siebie - przestawianie pol, ktore
Maciej dopuszczal awaryjnie, nie bylo potrzebne.

Sklad modeli pelnymi nazwami, brany z `MODEL_META`. Przy okazji **usterka uspiona**: licznik
mial trzy modele na sztywno i agent na Fable wypadalby ze skladu bez sladu. Dzis Fable nie
jest uzywany, wiec nie bylo widac - naprawione. Szczegoly w DD66, DD67, DD68.

## META w rownych prostokatach (zamkniete)

Duplikaty w presecie **usuniete za zgoda Macieja 2026-09-14** ("ok godze sie na to").
Preset ma teraz szesc pol i trzy kolumny (2x3), "Wzorzec" przeniesiony na koniec, zeby
trafial w szersza kolumne takze przy krotszej liscie.

Agent: dwie statystyki ida do jednego kontenera, czyli osiem kontenerow i rowne 2x4.
**Wazny pomiar, ktory zmienil sposob wykonania:** Maciej prosil o zlaczenie "Input tokens"
i "Output tokens", ale pare tokenow ma tylko **29 z 60** agentow - pozostalych 31 ma inne
pary ("Faza + Kategoria", "Rundy debaty + Argumentow" i dwadziescia innych po razie).
Rozpoznawanie pary po nazwie zalatwiloby mniej niz polowe przypadkow i rozsypaloby sie po
przetlumaczeniu etykiet. Dlatego laczone sa DOWOLNE dwie statystyki - regula niezalezna
od tresci, potwierdzona testem na wszystkich 60 agentach i w obu jezykach. Szczegoly w DD69.

## Decyzje

`DESIGN_DECISIONS.md`: **DD59** (Layout za jednym kliknieciem), **DD60** (przelacznik motywu),
**DD61** (plakietki werdyktu na srodku), **DD62** (sam symbol zamkniecia encyklopedii),
**DD63** (para list jako jeden element siatki), **DD64** (jedna szerokosc kafli),
**DD65** (listy Centrum kosztow do dolu okna), **DD66** (tekst do krawedzi kafla),
**DD67** (META na cztery kolumny), **DD68** (sklad modeli pelnymi nazwami),
**DD69** (META w rownych prostokatach: agent 2x4, preset 2x3),
**DD70** (Layout daje ten sam kadr co wczytanie presetu),
**DD71** (chmurka Wzorcow w obie strony), **DD72** (Hooki i Wzorce po angielsku),
**DD73** (etykiety dostepnosci w naglowku), **DD74** (Research zanonimizowany),
**DD75** (plakietka "rzadki" usunieta), **DD76** (plynnosc encyklopedii), **DD77** (canvas zsynchronizowany z klatkami).

## BACKLOG ZAMKNIETY 2026-09-14

Wszystkie pozycje A, B i C z listy handoffu zrobione:

| | pozycja | stan |
|---|---|---|
| A1+A2 | chmurka Wzorcow tylko do gory | ZROBIONE w dwoch podejsciach - drugie po zgloszeniu TOPOLOGII (DD71) |
| A2 | plakietka "rzadki" | USUNIETA (DD75). Najpierw ja zostawilem wbrew prosbie - patrz nizej |
| A3 | Hooki bez angielskiego | ZROBIONE - przyczyna inna niz w notatce: `hkSyncLang()` bylo wolane tylko przy otwartej nakladce (DD72) |
| B4 | aria-label bez tlumaczenia | ZROBIONE, plus ogonek w "Otworz" (DD73) |
| C5 | piec pustych plikow | USUNIETE - `git status` z 30 na 25 pozycji |
| - | anonimizacja Research | ZROBIONE (DD74) |

**Modul Wzorcow edytowany w zrodle** `v39/plans/wzorce_kod.js` i wdrozony skryptem
`wdroz_wzorce_v41.js` (nowy, przestawiony z wersji v40). Edycja bezposrednio w HTML
przepadlaby przy nastepnym wdrozeniu.

## Dwie lekcje z tej rundy, obie o mnie

1. **Chmurka: mierzylem sie z wlasciwa liczba, ale nie z ta, ktora przycina.** Pierwsza
   wersja liczyla zapas wzgledem OKNA, a chmurka obija sie o `.wz-body` (overflow:auto pod
   naglowkiem nakladki). SILNIK przerzucal sie mimo bledu, bo lezy bardzo wysoko - TOPOLOGIE
   nie. Blad przetrwal pierwszy przebieg testow, bo testy tez mierzyly sie z oknem.
   **Kontrola dodatnia dodana dopiero za drugim razem** pokazuje, ze poprawka cos zmienia.
2. **Plakietka "rzadki": odlozylem prosbe Macieja i podstawilem wlasne rozumowanie**
   ("przyczyna naprawiona, wiec nie ma czego usuwac"). Prosba nie dotyczyla dzialania
   chmurki, tylko samej plakietki. Musial powtorzyc polecenie. Gdy Maciej prosi o usuniecie
   elementu, naprawienie tego elementu NIE jest wykonaniem prosby.

## Zostaje do decyzji Macieja

1. **Wieksze tematy D** - szesc brakujacych zdarzen hookow, 33 litery cyrylicy, luki Wzorcow
   z `WZORCE_SYSTEM.md` i `BADANIA_SKALOWANIE.md`, szesciu agentow z agency-agents, Akt 2
   samouczka, tryb Live (ten PO publikacji).
2. **Wlasne nazwisko Macieja** w `research-skills-architecture` (4 wystapienia, w tym jako
   `"author"` w przykladach JSON). Zostawione swiadomie - to atrybucja, nie dana osoby trzeciej.
3. **`index.html`** to nadal kopia v32 - czy demo ma pokazywac v41.

**Publikacja nadal wymaga wyraznej zgody.** Warunek anonimizacji przestal blokowac,
warunek "ile wersji" zamkniety (tylko v41). Zostaje decyzja o `index.html`.

Stan koncowy rundy: plik **7 090 972 bajty**, **422 testy zielone, 0 bledow**
(216 z samouczka + 206 w `verify_kosmetyka_v41.js`).

## Uwaga na przyszlosc: rachunek kadru ma jedno miejsce

`dopasujWidok()` jest wolana i przez `ladujPreset`, i przez `autoUklad`. Wczesniej ten rachunek
byl wpisany w cialo `ladujPreset` i dlatego przycisk Layout nie mial do niego dostepu.
**Nie kopiowac go z powrotem** - test wymaga, zeby wzor `cw/nw,ch/nh` wystepowal w pliku
dokladnie raz. Dwie kopie predzej czy pozniej zaczna zyc wlasnym zyciem, tak jak juz raz
zaczely.

**Pulapka, ktora wrocila po raz trzeci:** test zaczepiony o tekst zlapal wlasny komentarz
wyjasniajacy poprawke. Regula 16 (zaczep o KOD, nie o proze) dotyczy takze testow, ktore
pisze sie "na szybko" do jednej zmiany.

## Rozstrzygniecie publikacyjne

Maciej: **publikujemy tylko v41**, a historia zmian miedzy wersjami trafi do README jako
sekcja na dole - **README pisany na koncu, nie teraz**. To zamyka warunek 1 z trzech
blokujacych (do repo idzie ~7 MB zamiast 67 MB). **Warunek 2 nadal blokuje: Research
wymaga anonimizacji i nikt tego nie zrobil.** Zapowiedz publikacji to nadal PLAN, nie zgoda.
