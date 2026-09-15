# v41 - Samouczek w aplikacji. MASTER_PLAN kampanii badawczej

Data startu: 2026-09-14, wieczor. Zlecenie Macieja: "startuj".
Preset: wzorzec `/deep-research-v2` (fan-out research -> extract -> critique -> synteza).

## PO CO TO ROBIMY

Zamiast filmu instruktazowego na YouTube powstanie **samouczek w aplikacji**:
kregoslup pokazujacy, gdzie co jest, odpalany przy pierwszym uruchomieniu
i dostepny pozniej pod przyciskiem. Decyzja koncepcyjna juz zapadla.
Ten research ma rozstrzygnac **JAK**, a nie **CZY**.

## CO JUZ MAMY - NIE ZAMAWIAC PONOWNIE

Zasada reuse projektu. Sprawdzone przed zlozeniem zamowienia:

- **`v39/research/R2_interaktywne_wyjasnienia.md`** (26 KB) - progresywne odslanianie
  przy duzej liczbie elementow, katalog chwytow dydaktycznych, **WCAG 2.2 AA dla
  animowanych i interaktywnych wyjasnien**. To jest gotowa warstwa dostepnosci.
- **`v39/research/R5_co_pomoglo_zrozumiec.md`** (26 KB) - Diataxis, podzial materialu,
  metafory dzialajace i mylace, co ludzie krytykuja w diagramach.

Onboardingu jako FORMY nie pokrywa zadne z nich. Zamawiamy delte.
**Kazdy researcher ma obowiazek przeczytac oba pliki i NIE powtarzac ich zakresu.**

## GLOWNE RYZYKO TEJ KAMPANII: ZATRUTE ZRODLA

Firmy publikujace "badania o onboardingu" (Appcues, Userpilot, Pendo, WalkMe,
Whatfix, Chameleon, Intro.js, Shepherd) **sprzedaja oprogramowanie do robienia
samouczkow**. Ich dane zawsze koncza sie wnioskiem, ze potrzebujesz wiecej samouczkow.
To jest dominujacy typ wyniku dla tego zapytania.

Projekt ma juz DWIE blizny po fabrykowanym konsensusie: obalone "progi 5/7"
oraz "potwierdzone przez 9 zrodel" przy Wzorcach, ktore po przeliczeniu granica
po granicy okazalo sie nieprawda. **Trzeciego nie produkujemy.**

Stad twarde reguly ponizej.

## REGULY OBOWIAZUJACE KAZDEGO AGENTA

1. **Kazde twierdzenie niesie zrodlo z URL.** Bez URL nie ma twierdzenia.
2. **Kazde zrodlo dostaje etykiete konfliktu interesow:** czy autor sprzedaje
   narzedzie do onboardingu / tourow. Jesli tak, twierdzenie idzie do osobnego
   koszyka "material marketingowy", nie do dowodow.
3. **Kazda rekomendacja niesie sile dowodu:** ile niezaleznych zrodel, jakiej
   jakosci (badanie recenzowane / NN-g / opublikowany test A/B / blog producenta /
   opinia pojedynczej osoby).
4. **Nie zaokraglac w gore.** "Kilka zrodel" to nie jest "potwierdzone".
   Liczyc pojedynczo i podawac liczbe.
5. **Zapisywac tez to, czego NIE udalo sie ustalic.** Luka nazwana wprost jest
   warta wiecej niz wniosek naciagniety.
6. **Bez dlugich myslnikow.** Tylko zwykly dywiz. Zasada calego projektu.
7. Raport po polsku. Cytaty z zrodel moga zostac w oryginale.

## OSIEM PYTAN BADAWCZYCH

R1. **Czy samouczek na pierwszym uruchomieniu w ogole dziala?** Dowody w obie
strony na wplyw tourow na aktywacje i utrzymanie uzytkownika. Jakiej jakosci sa
te dowody. Ile z nich pochodzi od firm sprzedajacych tour software.

R2. **Automat czy zaproszenie.** Samouczek startujacy sam przy pierwszym wejsciu
kontra zaproszenie, ktore uzytkownik akceptuje. Wskazniki odrzucenia, ukonczenia,
efekt na dalsze korzystanie. To jest pomysl Macieja, wiec ma dostac uczciwy test,
a nie potwierdzenie.

R3. **Dlugosc.** Po ilu krokach ludzie wysiadaja. Czy jest znany prog. Czy dzieli
sie to na akty / rozdzialy i co o tym wiadomo. Jak mierzyc, ze samouczek jest za dlugi.

R4. **Forma: prowadzenie za reke kontra wskazywanie palcem.** Tour, ktory sam
otwiera panele i klika, kontra tour, ktory tylko podswietla. Kiedy ktory,
jakie sa pulapki tego pierwszego (sprzatanie po sobie, kolizja z akcjami
uzytkownika, stan aplikacji po wyjsciu).

R5. **Czy tour to w ogole wlasciwa forma.** Alternatywy: lista zadan (checklist),
puste stany (empty states), podpowiedzi kontekstowe, "pokaz mi" per sekcja,
samouczek wbudowany w pierwsze zadanie. Ktora forma do ktorej sytuacji.
**To pytanie moze wywrocic caly plan i ma prawo to zrobic.**

R6. **Dostepnosc nakladek z podswietleniem.** DELTA na tym, co juz jest w R2:
zarzadzanie fokusem w nakladce prowadzacej przez strone, pulapka fokusu, Escape,
czytniki ekranu przy podswietleniu elementu, `prefers-reduced-motion` dla spotlight,
kryteria WCAG 2.2 dotyczace wlasnie tego wzorca. Konkretne numery kryteriow.

R7. **Przypadek szczegolny: onboarding narzedzia, ktore SAMO jest materialem
do nauki.** Ta aplikacja to encyklopedia i konfigurator jednoczesnie. Wiekszosc
poradnikow mowi o zwyklym SaaS. Czego uczy doswiadczenie narzedzi edukacyjnych,
dokumentacji interaktywnej, IDE, narzedzi do nauki programowania.

R8. **ADWOKAT DIABLA - wylacznie dowody PRZECIW.** Zadaniem tego agenta NIE jest
rownowaga. Ma znalezc najmocniejsze argumenty, ze samouczki sa strata czasu,
ze sa odklikiwane, ze nikt do nich nie wraca, ze psuja pierwsze wrazenie, ze
firmy je sprzedajace zawyzaja skutecznosc. Ma tez sprawdzic, czy istnieja
publikacje wprost obalajace popularne liczby krazace w tej branzy.

## KONTEKST APLIKACJI - to opisuje samouczek

Jeden plik HTML, zero zaleznosci, dwujezyczny PL/EN. 60 agentow, 62 presety.
Tryby: agenci, presety, zapisane, canvas z symulacja, Hooki, Wzorce, encyklopedia.

Kregoslup samouczka ma pokazac: jezyk, agenci (`panAg`), presety (`panPr`),
zapisane (`panSv`), canvas (`svg`, `phaseBar`), koszt (`costHud`), symulacja
(`simBtn`), encyklopedia (`learnO`), motyw (`themeToggle`), skroty klawiszowe.

**Pomiar wykonany przed kampania:** dwanascie kotwic kregoslupa sprawdzono
w wersjach v32 do v40. Dziewiec wersji, zero zmian nazw, zero znikniec. Jedyna
roznica to `hookiBtn`, ktorego nie ma w v32 i v33, bo tryb Hooki powstal w v34.
Czyli szkielet aplikacji jest stabilny, a kroki samouczka moga na nim wisiec.

## CZEGO OCZEKUJEMY NA WYJSCIU

Nie osmiu surowych raportow. **Synteza z rozstrzygnieciami dla osmiu pytan**,
kazde z ocena sily dowodu, plus jawna lista rzeczy, ktorych research NIE rozstrzygnal.
Ta ostatnia lista jest najwazniejsza, bo tam decyzje podejmuje Maciej, nie zrodla.

## FAZY

1. STRATEGIA - ten plik. GOTOWE.
2. RESEARCH - 8 agentow rownolegle, raporty do `v41/research/R{1..8}_*.md`.
3. CRITIC - walidacja, liczenie zrodel granica po granicy, `v41/research/CRITIC.md`.
4. SYNTEZA - `v41/plans/SYNTHESIS.md` z rekomendacja konfiguracji samouczka.

## STAN

- [x] Faza STRATEGIA
- [ ] Faza RESEARCH
- [ ] Faza CRITIC
- [ ] Faza SYNTEZA
