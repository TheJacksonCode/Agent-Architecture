# CRITIC - walidacja fazy research v41

Rola: krytyk. Zadaniem nie jest streszczenie osmiu raportow, tylko sprawdzenie, czy to,
co w nich napisano, wytrzymuje liczenie granica po granicy. Wszystkie zarzuty ponizej maja
nazwe pliku i cytat. Cztery twierdzenia zweryfikowalem bezposrednio u zrodla w trakcie tej
walidacji (dwie strony Chameleon, artykul NN/g, proba dotarcia do Carroll i Carrithers) -
zaznaczam to przy kazdym takim miejscu.

---

## WERDYKT OGOLNY: REVISE

Nie PASS, ale tez nie odrzucenie. Cztery powody, w kolejnosci waznosci.

**1. Korpus jest duzo bardziej skoncentrowany, niz wyglada.** Osiem raportow sprawia wrazenie
osmiu niezaleznych sond. W warstwie dowodowej to jest w praktyce jedna instytucja (Nielsen
Norman Group), jeden eksperyment ilosciowy (n=70, iOS, 2020) i jeden autor akademicki
(John M. Carroll), ktory wystepuje po OBU stronach sporu naraz. Jesli NN/g sie myli, myli sie
cala kampania. Zaden z osmiu raportow tego nie policzyl.

**2. Ten jeden eksperyment ilosciowy jest kruchszy, niz ktokolwiek napisal.** Sprawdzilem
artykul bezposrednio (https://www.nngroup.com/articles/mobile-tutorials/, Alita Kendrick,
8 marca 2020). Testowano TRZY miary. Dwie wyszly nieistotnie (p=0.443 i p>0.1). Jedna wyszla
p=0.047, czyli o wlos pod progiem. Artykul nie wspomina o zadnej korekcie na porownania
wielokrotne, a dodatkowo odrzucono 13 prob (5 procent). Twierdzenie, ktore w tej kampanii
cytowane jest piec razy jako twardy dowod ("tutorial pogarsza postrzegana trudnosc"), to
pojedynczy wynik brzegowy z jednej z trzech miar, bez korekty, na n=70, na czterech prostych
aplikacjach iOS. Zaden z osmiu raportow tego nie zauwazyl. Kilka raportow zrobilo natomiast
cos gorszego: zbudowalo na tym wniosek kierunkowy ("tutorial SZKODZI"), podczas gdy wynik
glowny byl NULLEM, a null na n=70 to slaby dowod nieistnienia efektu, nie dowod szkody.

**3. Liczby Chameleon, ktore nosza trzy raporty, nie istnieja w zadnym dokumencie Chameleon,
do ktorego udalo sie dotrzec.** Szczegoly w sekcji B. To nie jest blad przepisania jednego
agenta - to jest wyprana liczba wtorna, ktora R3 poprawnie zdemaskowal, a R4 i R8 podaly dalej
jako dane pierwotne. R8 zbudowal na niej jeden z pieciu punktow swojego TL;DR.

**4. Kampania unikela fabrykowanego konsensusu, ale wpadla w jego lustrzane odbicie:
fabrykowane samoobalenie.** To jest najwazniejsza rzecz, jaka mam do powiedzenia. Punkt 6
z `PROGRESS.md` wymienia trzy wlasne propozycje orkiestratora jako "majace teraz dowody
przeciwko sobie". Sprawdzilem wszystkie trzy granica po granicy. **Zadna z nich nie ma
dowodow przeciwko sobie.** Jedna opiera sie na zrodle, ktore po dokladnym przeczytaniu
prawdopodobnie ja POPIERA. Druga na cudzej parafrazie rekomendacji dotyczacej zupelnie
innej osi problemu. Trzecia na liczbie z punktu 3 powyzej. Odrzucenie wlasnego pomyslu na
podstawie zle policzonych zrodel jest dokladnie tym samym bledem co przyjecie go na tej
podstawie - tylko wyglada na pokore, wiec trudniej je zlapac.

**Co dziala i nie wymaga poprawki:** regula "kazde twierdzenie niesie URL" zadzialala
spektakularnie. Raporty wylapaly nie trzy, a co najmniej dziewiec liczb-widm. Kwarantanna
materialu marketingowego trzyma sie w R2 i R6 wzorowo. Sekcje "czego nie ustalilem" sa
w calym korpusie uczciwe i konkretne. To jest dobry research z zle policzonymi etykietami,
nie zly research.

---

## A. TABELA: twierdzenie / ile NAPRAWDE niezaleznych zrodel / jakosc

Zasada liczenia: to samo badanie w czterech raportach to jedno zrodlo. Dwie publikacje tego
samego zespolu o tym samym eksperymencie to jedno zrodlo. Streszczenie cudzej pracy przez
NN/g i oryginal tej pracy to jedno zrodlo.

| Twierdzenie | Ile NIEZALEZNYCH zrodel | Jakosc | Konflikt interesow |
|---|---|---|---|
| Tutorial nie poprawia skutecznosci zadania | **1** (NN/g Kendrick 2020) | Eksperyment n=70, ale wynik NULL, 4 proste aplikacje iOS, 13 prob odrzuconych | NN/g: lagodny, patrz nizej |
| Tutorial pogarsza postrzegana trudnosc | **1** (to samo badanie) | p=0.047, jedna z trzech miar, zero korekty na porownania wielokrotne | jw. |
| Push gorszy niz pull | **1 instytucja**, 3 publikacje, 2 autorow, zero nowych danych | Stanowisko redakcyjne oparte na niecytowanym korpusie testow | jw. |
| Paradoks aktywnego uzytkownika | **1** (Carroll i Rosson 1987) + streszczenie NN/g TEGO SAMEGO | Klasyczna teoria HCI, model obserwacyjny, nie pomiar | brak |
| Training wheels dziala | **1 program badawczy** (Carroll, IBM, 1984), dwie publikacje tego samego eksperymentu | Recenzowane, ale INNA kategoria interwencji, N nieustalone | brak |
| Dlugosc obniza ukonczenie | **2 dostawcow** (Pendo 2016, Chameleon), wzajemnie niespojni, **0 niezaleznych** | Obserwacja przekrojowa, zero metodologii, zero definicji "ukonczenia" | pelny, obustronny |
| Auto-start gorszy od zaproszenia | **1 dostawca** (Chameleon), liczby arytmetycznie niespojne | Czysty efekt selekcji: tour otwierany przez uzytkownika otwieraja ci, ktorzy go chca | pelny |
| Pasek postepu czesto nie pomaga | **2 recenzowane** (Villar i in. 2013 - metaanaliza 32 eksperymentow; Liu i Wronski 2018 - 25k ankiet) | **Najmocniejszy material ilosciowy calej kampanii**, ale domena ankiet | Liu i Wronski: czesciowy (wspolautorka z SurveyMonkey) |
| Efekt goal-gradient | **1** (Kivetz i in. 2006) | Recenzowane, solidne, domena programow lojalnosciowych | brak |
| Zeigarnik uzasadnia checklisty | **0** | R5 cytuje Wikipedie na sam efekt, polaczenie z checklistami nazywa interpretacja marketingowa | - |
| Advance organizer (Ausubel) | **0 empirycznych** | Dwa portale wtorne, jeden datowany 12.09.2026, dwa dni przed kampania | brak, ale i zerowa wartosc dowodowa |
| Pamiec przestrzenna buduja landmarki | **1** (wtorny artykul NN/g) | Opis mechanizmu, zero liczb, zero krzywej zapominania | lagodny |
| Encyklopedie rozwiazuja orientacje trwala nawigacja | **0 dowodowych** (strony pomocy Wikipedii) | Opis praktyki, nie pomiar skutecznosci | brak |
| Uczenie przez dzialanie bije obserwacje | **0 recenzowanych** | Komunikat prasowy UBC (nie publikacja) + blog firmy szkoleniowej | TechClass: czesciowy |
| WCAG 2.4.11 dotyczy podswietlanego elementu | **1 normatywne** (W3C) | Wiazace kryterium, nie "dowod" - inna kategoria | brak |
| Biblioteki tourow maja realne bledy dostepnosci | **4 zgloszenia / 3 biblioteki** | Artefakty pierwotne, sprawdzalne | zerowy po stronie zglaszajacych |
| Konflikt globalnego Escape to znany wzorzec bledu | **1** (FluentUI #17940) | Jeden przypadek w jednym repozytorium | brak |
| Brak wzorca W3C APG dla "guided tour" | **1** (przeszukanie katalogu) | Fakt negatywny, mocny i sprawdzalny | brak |
| Banner blindness dotyczy coach markow | **0** | R8 sam nazywa to wlasnym rozszerzeniem przez analogie | - |
| GitLab wycofal wideo-onboarding po pomiarze | **1** (publiczny issue) | Metryki jakosciowe, nie liczbowe, ale realny artefakt | brak |

### Trzy strukturalne problemy widoczne dopiero po zliczeniu

**Problem pierwszy: NN/g to jedno zrodlo, nie chor.** Szesc z osmiu raportow opiera warstwe
"niezalezna" na NN/g. Zliczajac: jeden eksperyment z liczbami, reszta to stanowisko redakcyjne
tej samej firmy, w duzej czesci tych samych dwoch autorow (Kendrick napisala badanie n=70
i wideo "Skip it When Possible"; Laubheimer napisal artykul o push/pull). R8 jest jedynym
raportem, ktory to nazywa wprost:

> "Slaba jako 'konsensus branzy' - nie znalazlem drugiego niezaleznego od NN/g zrodla
> akademickiego lub badawczego, ktore mierzy to samo zjawisko z wlasna metodologia.
> To jest jeden silny glos, nie chor." (`R8_adwokat_diabla.md`)

R5 robi dokladnie odwrotnie i to jest zarzut:

> "SREDNIA-MOCNA - trzy zbiezne publikacje NN/g [1][2][9], w tym jedno badanie z liczbami"
> (`R5_czy_tour_to_wlasciwa_forma.md`, tabela form, wiersz "Podpowiedzi kontekstowe")

Trzy publikacje jednej firmy to nie sa trzy zrodla. To jest ten sam mechanizm, ktory
wyprodukowal "potwierdzone przez 9 zrodel" przy Wzorcach, tylko o jeden poziom wyzej:
zamiast liczyc cytowania, R5 liczy artykuly tego samego wydawcy.

**Problem drugi: niespojne etykietowanie konfliktu interesow NN/g.** R1 i R3 pisza, ze NN/g
ma "lagodny, posredni COI zwiazany z autorytetem marki". R5, R7 i R8 pisza plaskie
"NIEZALEZNE" i "brak konfliktu interesow". To jest to samo zrodlo z dwiema roznymi etykietami
w jednej kampanii, ktorej regula nr 2 wymaga etykiety przy kazdym zrodle. Warto nazwac rzecz
po imieniu: NN/g sprzedaje konsulting i szkolenia UX, a teza "twoj interfejs powinien byc
tak dobry, zeby nie potrzebowal samouczka" jest teza, ktora sprzedaje przeprojektowanie
interfejsu. To jest konflikt duzo slabszy niz u Chameleon, ale nie jest zerowy i nie wolno
go raz zapisywac, a piec razy pomijac.

**Problem trzeci, najciekawszy: John M. Carroll stoi po obu stronach sporu.** Nikt tego nie
zauwazyl. "Paradoks aktywnego uzytkownika", czyli najmocniejszy TEORETYCZNY argument PRZECIW
samouczkom w R1 i R8, to Carroll i Rosson 1987. "Training wheels", czyli najmocniejszy
dowod ZA forma rekomendowana przez R5, to Carroll i Carrithers 1984. "Minimalizm instrukcyjny"
i "Nurnberg Funnel" z R5 to rowniez Carroll. Pozycja [8] R5 ("Learning a word processing
system with training wheels and guided exploration") to rowniez ten sam program badawczy.
Czyli: R5 buduje swoja rekomendacje na autorze, ktorego inna praca jest glownym argumentem
przeciw calemu przedsiewzieciu, i zaden z tych raportow nie wie o istnieniu drugiego watku.
To nie unniewaznia zadnej z prac. Ale oznacza, ze "niezalezne akademickie wsparcie" tej
kampanii to w praktyce **jedna osoba i jedno laboratorium IBM z pierwszej polowy lat 80.**

---

## B. ROZBIEZNOSC LICZB - rozstrzygniecie

Zlecenie: ustalic, czy R7 i R8 cytuja rozne raporty Chameleon, czy ktos zle przepisal.
Sprawdzilem bezposrednio. **Odpowiedz brzmi: jedno i drugie, plus trzecia rzecz, ktorej
nikt nie podejrzewal.**

### Co jest naprawde

Pobralem dwie strony Chameleon w trakcie tej walidacji.

**(a) `chameleon.io/blog/product-tour-benchmarks-highlights`** (to zrodlo cytuja R5, R7 i R8).
Zawiera: srednie ukonczenie 61 procent, "15 milionow interakcji", self-serve "123 procent
wyzsze niz srednia", toury z checklisty "21 procent bardziej prawdopodobne", wskazniki postepu
"+12 procent ukonczenia, -20 procent odrzucen". **Strona NIE zawiera w tekscie zadnego
rozbicia na liczbe krokow.** Odwoluje sie do WYKRESU "completion rate by number of steps",
czyli liczby siedza w obrazku, nie w tresci.

**(b) `chameleon.io/benchmark-report`** ("Benchmark Report 2025", 550 milionow interakcji,
to zrodlo cytuje R3). Przy moim pobraniu strona podala: **3 kroki okolo 52 procent, 4 kroki
okolo 51 procent, 5 krokow okolo 48 procent, 6 i wiecej - ostry spadek ponizej 25 procent**,
z komentarzem "tours beyond five steps lose attention from more than half of users".
Zero definicji "ukonczenia", zero liczby przeanalizowanych tourow, zero przedzialow ufnosci.

**(c) PDF z 2019** (`chameleon-product-tour-benchmarks-report-2019.pdf`, cytowany przez R7
i R8) - istnieje, 1.4 MB, ale nie daje sie wyciagnac z niego tekstu automatycznie. Nie
zweryfikowalem go. R7 i R8 najpewniej tez nie, skoro obaj podaja rozne liczby z tego samego
pliku.

### Rozstrzygniecie

1. **R7 i R8 NIE cytuja tego samego raportu, mimo ze podaja te same dwa URL-e.** To sa co
   najmniej trzy rozne publikacje Chameleon: PDF z 2019, analiza "15 milionow interakcji"
   i raport z 2025 na 550 milionach. R7 podaje podzial na koszyki (1-2, 3-5, 6-8, 9 plus),
   R8 podaje wartosci per konkretna liczba krokow (3, 4, 7). To nie moze byc ta sama tabela.

2. **Liczby R8 (72-74 procent przy 3-4 krokach, 16 procent przy 7) nie sa w zadnym dokumencie
   Chameleon, do ktorego dotarlem - ani w jego wlasnym raporcie 2025, gdzie zamiast nich stoi
   52/51/48.** I - co najwazniejsze - **R3 ustalil to samo, niezaleznie ode mnie, w trakcie
   fazy research**:

   > "Sprawdzenie tresci raportu: ujawniona jest tylko laczna liczba interakcji ('550+ milionow
   > interakcji uzytkownikow' (...)), BEZ: liczby przeanalizowanych tourow per kategoria dlugosci
   > (...). Wtorne zrodla (userTourKit, Userpilot) POWTARZAJA liczby 72%/74%/16% jako fakt,
   > cytujac Chameleon, bez dodania wlasnej weryfikacji." (`R3_dlugosc.md`)

   R3 wykonal robote poprawnie i zapisal ja w sekcji TROPIENIE. R4 i R8 podaly te sama liczbe
   dalej jako dane pierwotne Chameleon. **To jest czwarty cytat-widmo tej kampanii, tylko
   lepiej ubrany niz pozostale: ma prawdziwa firme, prawdziwy URL i falszywa zawartosc.**

3. **Liczby R7 (73/38/25/8) sa niezweryfikowane.** Pochodza albo z wykresu-obrazka na stronie
   (a), albo z PDF z 2019. Ani ja, ani R7 nie potwierdzilismy ich w tekscie zrodlowym.

4. **Bonus, ktorego nie zamowiono: liczba 123 procent z R5 nie domyka sie arytmetycznie
   z wlasna liczba Chameleon na tej samej stronie.** Jesli srednie ukonczenie to 61 procent,
   a self-serve jest "o 123 procent wyzsze", wychodzi 136 procent, co jest niemozliwe.
   Jednoczesnie para R7 (23 procent automat, 69 procent na zadanie) daje stosunek 3.0, czyli
   "o 200 procent wyzsze", a nie 123. **Zadna z tych trzech liczb nie da sie pogodzic z
   pozostalymi dwiema.** Zrodlo jest wewnetrznie niespojne, nie tylko stronnicze.

### Rozbieznosc Intercom kontra Chameleon z R5 - osobne rozstrzygniecie

R5 stawia w TL;DR mocna teze:

> "Dane liczbowe o skutecznosci tourow od firm sprzedajacych oprogramowanie do tourow sa ze
> soba WZAJEMNIE SPRZECZNE, co samo w sobie jest dowodem przeciw ich wiarygodnosci"
> (`R5_czy_tour_to_wlasciwa_forma.md`)

**Ta teza jest za mocna i sam R5 to wie**, bo cztery strony dalej pisze:

> "Nie ustalilem dokladnej definicji 'ukonczenia' tour u Intercom ani Chameleon - bez tego
> sprzecznosc 34%/23% kontra 61% nie daje sie rozstrzygnac ani wyjasnic (moze to byc roznica
> w mianowniku (...))" (`R5`, CZEGO NIE USTALILEM, punkt 4)

Dwie liczby o nieznanych mianownikach nie sa "wzajemnie sprzeczne". Sa **nieporownywalne**.
To jest slabszy zarzut niz sprzecznosc, ale za to prawdziwy. TL;DR R5 nalezy poprawic.

### Praktyczna konsekwencja dla decyzji o dlugosci

Orkiestrator wyliczyl w `PROGRESS.md`, ze Akt 1 na szesc krokow to "wedlug liczb R7 okolo
25-38 procent ukonczenia, wedlug R8 okolo 16 procent". **Obie te prognozy sa zbudowane na
liczbach, ktorych nie ma w zrodle.** Jedyna liczba, ktora faktycznie stoi dzis w dokumencie
Chameleon dla tego zakresu, to okolo 48 procent przy pieciu krokach. Czyli nawet w kategoriach
materialu marketingowego panika wokol szesciu krokow jest przeszacowana mniej wiecej trzykrotnie.

I nawet gdyby liczby byly prawdziwe, wnioskowanie i tak nie przechodzi. To sa dane
**przekrojowe, nie przyczynowe**. Dluzsze toury maja nizsze ukonczenie, ale dluzsze toury
buduja firmy o bardziej zagmatwanych produktach i slabszym onboardingu. Zmienna "dlugosc"
jest tu splatana z "zlozonoscia produktu" i "jakoscia wykonania". Z tego, ze dlugie toury
w cudzych produktach sie sypia, nie wynika, ze skrocenie NASZEGO do trzech krokow da 72
procent. Zaden z osmiu raportow tego nie powiedzial.

---

## C. PRZECIEKI MATERIALU MARKETINGOWEGO

Sprawdzilem TL;DR i sekcje dowodowe kazdego raportu pod katem materialu od Appcues, Userpilot,
Pendo, WalkMe, Whatfix, Chameleon, Intercom, Usetiful, Userflow, Jimo, Guideflow, StepsKit.

**Szczelne: R2 i R6.** W R2 sekcja USTALENIA opiera sie wylacznie na NN/g, VS Code, CircleCI
i GitLab. W R6 material producenta (deklaracja Shepherd.js o "full a11y compliance") jest
uzyty wylacznie jako przyklad twierdzenia niezweryfikowanego. Wzor do nasladowania.

**Przeciek 1 - R7, najciezszy.** Liczby Chameleon stoja w TL;DR jako punkty 5 i 6, czyli
w miejscu, ktore czyta sie zamiast raportu:

> "5. Dlugosc ma mierzalny, silny efekt na ukonczenie tourow: 1-2 kroki ~73% ukonczenia,
> 3-5 krokow ~38%, 6-8 krokow ~25%, 9+ krokow ~8%" (`R7_narzedzie_edukacyjne.md`)

Etykieta konfliktu jest dopisana w nawiasie, ale zdanie glowne brzmi "ma mierzalny, silny
efekt" - to jest sformulowanie z sekcji dowodowej, nie z koszyka marketingowego. Gorzej:
w sekcji USTALENIA R7 dokonuje jawnego awansu tego materialu na dowod przez sparowanie
go z NN/g:

> "wiec KIERUNEK traktuje sie jako wsparty przez 2 niezalezne zrodla o roznym charakterze
> (jedno komercyjne z duza proba, jedno badawcze bez konkretnych liczb)" (`R7`)

**To jest dokladnie mechanizm z Wzorcow.** Jedno zrodlo z liczbami bez metodologii plus jedno
zrodlo z autorytetem bez liczb nie daje "2 niezaleznych zrodel". Daje zero liczb i jedna opinie.

**Przeciek 2 - R4.** Ten sam material w TL;DR, punkt 4:

> "Dane o dlugosci toru (spadek ukonczenia z 72% przy 3 krokach do 16% przy 7+ krokach)
> pochodza z Chameleon (...). To dane realne (firma mierzy wlasny produkt), nie zmyslona
> liczba jak punkt 3" (`R4_prowadzenie_czy_wskazywanie.md`)

Zdanie "to dane realne, nie zmyslona liczba" jest falszywe w swietle sekcji B: to jest liczba
wtorna, ktorej nie ma w dokumencie firmy. R4 wprost ja awansowal ponad kategorie, do ktorej
nalezy.

**Przeciek 3 - R3.** Cala podsekcja "Dane Pendo o dlugosci walkthroughow" siedzi w USTALENIA,
nie w MATERIAL MARKETINGOWY, i wchodzi do TL;DR jako punkt 3. R3 jest tego swiadomy i
argumentuje, ze to "najbardziej surowe i najuczciwiej opisane dane dostawcy". Zgoda co do
oceny jakosci, sprzeciw co do umiejscowienia: regula nr 2 `MASTER_PLAN` nie ma klauzuli
"chyba ze dostawca byl uczciwy". Przeciek lagodny, ale formalny.

**Przeciek 4 - R1.** Userpilot w sekcji USTALENIA, punkt 6, uzyty jako kotwica liczbowa:

> "nawet u sprzedawcy narzedzia sluzacego do robienia checklist, mediana ukonczenia to 1 na
> 10 uzytkownikow" (`R1_czy_tour_dziala.md`)

Ta sama liczba (19.2 procent srednia, 10.1 procent mediana, 188 firm) wedruje przez R1, R4
i R5. Trzy raporty, jedno zrodlo, jeden dostawca, proba zlozona wylacznie z jego wlasnych
klientow. W R5 trafia do TL;DR jako punkt 5.

**Przeciek 5 - R5, tabela form.** Tabela "PORZADEK FORM" jest glownym produktem R5 i jej
kolumna "sila dowodu" cytuje Userpilot [10] dla checklist, Vidico [14] dla wideo i blogi
growth [15] dla sample data. Etykiety SLABA sa na miejscu, ale to oznacza, ze trzy z dziewieciu
wierszy tabeli decyzyjnej sa ocenione wylacznie materialem sprzedawcow. Dla wiersza "wideo"
konsekwencja jest konkretna: R5 ocenia te forme na podstawie bloga producenta wideo, podczas
gdy **R8 ma na ten sam temat realny, negatywny wynik pomiaru** (wycofany eksperyment GitLab).
R5 ocenil forme, nie znajac najlepszego dostepnego dowodu na jej temat.

**Przeciek 6 - R7, opisy cudzych produktow.** Fakty o dwuetapowym onboardingu Figmy i o
Duolingo pochodza z bloga Appcues. R7 to oznacza, ale to nadal jest sprzedawca kategorii
opisujacy, jak wygladaja produkty, ktore maja uzasadniac zakup jego kategorii.

---

## D. CYTATY-WIDMA - czy ktoras przeciekla do dowodow

Sprawdzilem wszystkie cztery zgloszone widma plus przeszukalem korpus pod katem kolejnych.

**Zgloszone cztery: zadne nie przeciekly do sekcji dowodowych. To jest czysty PASS.**

1. **"NN/g 2024 UX Benchmark Study" (68 / 82 procent)** - R1 i R2, obie w MATERIAL
   MARKETINGOWY, obie z jawna diagnoza. R1 formuluje to wzorcowo: "to jest zmyslone zrodlo,
   nie slabe zrodlo". Nie wystepuje w R3-R8.
2. **"78 procent porzuca do trzeciego kroku, Baymard"** - R2, R3, R4. R4 umiescil to w TL;DR,
   ale jako OSTRZEZENIE ("prawdopodobnie sfabrykowana (...). Nie uzywac w syntezie jako fakt"),
   co jest wlasciwym miejscem. R3 zrobil dodatkowo najlepsza robote sledcza w calej kampanii,
   pokazujac lancuch digia.tech -> saasfactor.co -> pustka.
3. **"Pendo 847 aplikacji, 81 procent"** - tylko R3, w sekcji TROPIENIE, z dotarciem do
   oryginalu z 2016. Nie uzyte jako dowod nigdzie.
4. **"NN/g plus 35 procent szybciej, plus 40 procent sukcesu"** - tylko R5, ktory swiadomie
   nie umiescil tego nawet w koszyku marketingowym, zeby nie przedluzac lancucha. To jest
   najbardziej zdyscyplinowany ruch w calym korpusie.

**Widma, ktorych nie bylo na liscie orkiestratora - jest ich co najmniej piec wiecej:**

5. **"Skippable tours maja 25 procent wyzsze ukonczenie"** - wystepuje w R1 (bez zrodla),
   R4 (bez zrodla) i R7 (przypisane UserIQ przez agregator). Trzy raporty, trzy rozne
   atrybucje, zero zrodla. Zadne nie uzyte jako dowod.
6. **"34 procent wyzszy churn po pominieciu tour"** - R2 (odrzucone) i R7 (przypisane
   "Product-Led Institute / 2024 study", niezweryfikowane). Dwa raporty, dwie atrybucje,
   zero zrodla.
7. **"40-60 procent uzywa raz i nie wraca", "88 procent nie wraca po zlym doswiadczeniu",
   "90 procent churnu bez zaangazowania w 3 dni"** - R8, wszystkie trzy poprawnie odrzucone
   z rekomendacja "PELNE ODRZUCENIE".
8. **"Amplitude 2024 Product Analytics Report: 76,3 procent"** (R2), **"18,4 procent
   interakcji z tooltipem trwa 5+ sekund"** (R4), **"547 firm SaaS" Userpilot** (R3),
   **"21 procent wiecej ukonczen przy checklist"** (R8) - wszystkie bez zrodla, wszystkie
   poprawnie oznaczone.
9. **Cytat przypisywany Julie Zhuo** (R2) - R2 slusznie zauwaza, ze brzmi jak wygenerowany
   tekst motywacyjny. Odrzucony.

**Twierdzenia bez dzialajacego URL, ktore weszly do sekcji dowodowych - cztery przypadki:**

- **R4, zrodlo [12].** Pozycja na liscie zrodel, ktora sama przyznaje, ze zrodlem nie jest:
  "pojawila sie w zagregowanym wyniku wyszukiwania bez jednoznacznego zrodla pierwotnego".
  Mimo to TL;DR R4 punkt 6 cytuje "[11][12]" dla tezy o "jednym udokumentowanym efekcie
  ubocznym". Efekt uboczny nie jest udokumentowany - jest pusty.
- **R2, sekcja USTALENIA 3.** Cytat "a tour that appears on first login (...) is usually just
  a dressed-up interruption" przypisany "blogowi produktowemu", bez nazwy i bez URL.
- **R4, zrodlo [2].** "Djavad Mowafaghian Centre for Brain Health (UBC)" to komunikat prasowy,
  nie publikacja. R4 uczciwie pisze "popularne streszczenie badania, nie link do publikacji
  pierwotnej", ale traktuje to jako jedno z "trzech niezaleznych zrodel" swojej glownej tezy.
- **R7, `edukatesg.com/2026/09/12/...`** - blog datowany na dwa dni przed startem kampanii,
  uzyty jako zrodlo dla teorii pedagogicznej z lat 60. To jest dokladnie profil tresci SEO
  generowanej maszynowo, czyli medium, w ktorym zyja widma z punktow 1-4.

**Jedna rozbieznosc miedzy raportami dotyczaca istnienia zrodla:** R1 pisze, ze artykul
Apptimize o Vevo jest martwy ("przekierowuje dzis (301) na airship.com"). R5 podaje ten sam
material pod zywo wygladajacym URL `apptimize.com/blog/2015/10/vevos-app-defies...`. Zaden
z nich nie przeczytal tresci. Traktowac jako niezweryfikowane po obu stronach.

---

## E. R8 KONTRA RESZTA

R8 jest najlepiej napisanym raportem kampanii pod wzgledem dyscypliny i jednoczesnie ma
najpowazniejszy pojedynczy blad merytoryczny. Po kolei.

### Gdzie R8 ma racje i gdzie jest lepszy od reszty

**1. R8 jako jedyny odmowil potwierdzenia wlasnego briefu.** Brief zadal dowodow, ze firmy
usuwaja toury i im sie poprawia. R8 napisal:

> "Nie znalazlem przypadku duzej, znanej firmy, ktora usunela tour i miala z tego
> udokumentowana poprawe - argument 'firmy usuwaja tours i im sie poprawia' z briefu NIE
> zostal potwierdzony" (`R8_adwokat_diabla.md`, sekcja GDZIE ZESPOL MA RACJE)

Adwokat diabla, ktory odmawia sfabrykowania oskarzenia, jest wiarygodniejszy od takiego,
ktory znajduje wszystko, czego szukal. To podnosi wage pozostalych zarzutow R8.

**2. R8 policzyl NN/g poprawnie, jako jedyny** ("jeden silny glos, nie chor"). Zobacz sekcja A.

**3. R8 ma jedyny w kampanii realny artefakt "wycofano onboarding po pomiarze"** - GitLab
issue 351917 o eksperymencie wideo, ktory dal "niewielki wplyw na aktywacje", "niskie
zaangazowanie" i "brak wplywu na konwersje platna". R5 ocenial forme wideo, nie wiedzac o tym.

**4. R8 zrobil rozroznienie, ktorego nie ma nikt inny:** brak biznesowej motywacji do budowy
samouczka w darmowym narzedziu to nie to samo, co dowod, ze uzytkownicy takiego narzedzia
odrzucaja samouczek. To jest czysto poprawne rozumowanie i synteza nie powinna go zatrzec.

### Gdzie R8 jest retoryka, nie dowodem

**1. Zarzut 4 opiera sie na zle zastosowanej doktrynie i na liczbie-widmie.** R8 pisze:

> "dane pochodza od sprzedawcy narzedzia do tourow (...), ALE dzialaja PRZECIW tezie
> sprzedawcy, wiec sa wiarygodne jako 'przyznanie niekorzystne dla mowiacego' (statement
> against interest). To jest mocny typ dowodu mimo pochodzenia." (`R8`)

**To jest nieprawda, i R3 ma na to gotowa kontre**:

> "od firmy ktora ma interes w tym, zeby wynik brzmial jak twardy prog '5 krokow to bezpieczna
> granica' (co jest tez ich produktowa rekomendacja)" (`R3_dlugosc.md`)

R3 ma racje. Twierdzenie "krotkie toury dzialaja, dlugie nie" jest DOKLADNIE rekomendacja
produktowa Chameleon: obniza bariere wejscia do zakupu ("dziala od razu"), uzasadnia ich
funkcje wyzwalaczy kontekstowych i nie zniecheca nikogo do kupienia narzedzia. Zaden sprzedawca
nie traci na zdaniu "uzywaj mojego produktu oszczedniej". Doktryna "statement against interest"
tu nie obowiazuje. Do tego dochodzi sekcja B: sama liczba nie istnieje w dokumencie firmy.
**Czwarty z pieciu punktow TL;DR R8 upada w calosci.**

Dla porzadku: doktryna zostala natomiast zastosowana POPRAWNIE w R1, przy przyznaniu Chameleon,
ze wysokie ukonczenie tour to "vanity metric". TO jest zdanie, ktore szkodzi sprzedawcy, bo
podwaza metryke, ktora sprzedaje.

**2. Zarzut 5 (banner blindness) R8 sam uniewaznia** - "to jest MOIM rozszerzeniem, nie
cytowanym wprost w zadnym znalezionym zrodle". Benway i Lane 1998 dotyczy banerow reklamowych
na stronach WWW z 1998 roku. Przenoszenie tego na nakladke, ktora wlasnie otworzyla aplikacja
uzytkownika, jest dluga analogia. Zarzut do skreslenia z listy dowodow, do zostawienia jako
hipoteza.

**3. R8 czyta NN/g wybiorczo.** Cala warstwa oskarzycielska R8 stoi na artykule Laubheimera
"Onboarding Tutorials vs. Contextual Help". Ten sam artykul zawiera jawny wyjatek dla nowego
paradygmatu interakcji, ktory R1 i R7 cytuja doslownie. **R8 nie wspomina o tym wyjatku ani
raz.** Adwokat diabla ma prawo nie szukac rownowagi, ale nie ma prawa przemilczec klauzuli
w dokumencie, ktory sam uczynil swoim glownym swiadkiem.

**4. Drobiazg, ktory mowi o starannosci:** R8 datuje badanie NN/g na "2015-2019 (NN/g nie
podaje dokladnej daty w wyciagu)". Sprawdzilem: 8 marca 2020, autorka Alita Kendrick. Data
stoi na stronie i podaja ja poprawnie R1, R3 i R5. R8 nie dotarl do artykulu, tylko do wyciagu.

### Co reszta zignorowala, a R8 znalazl

- **Wycofany eksperyment GitLab** (jak wyzej) - luka w R5.
- **Brak jakiejkolwiek systematycznej krytyki metodologii dostawcow.** R8 szukal wprost i nie
  znalazl. To jest wazna, nazwana luka: nikt w branzy nie rozlozyl liczb Chameleon na czesci.
  Ta kampania wlasnie to zrobila, przypadkiem, w sekcji B.

### Co R8 zignorowal, a reszta znalazla

- **Wyjatek NN/g dla nowego paradygmatu** (R1, R7).
- **Cala warstwa R6.** R8 twierdzi, ze najwiekszym ryzykiem sa dlugosc i forma wymuszona.
  W swietle sekcji A najwiekszym mierzalnym ryzykiem jest co innego: **implementacja**. Cztery
  udokumentowane bledy dostepnosci w trzech bibliotekach, brak wzorca W3C, nierozstrzygniety
  konflikt fokus-kontra-klikalny-cel. To jedyny obszar kampanii, w ktorym cokolwiek jest
  pewne, a adwokat diabla go nie tknal.

---

## F. OCENA NAJMOCNIEJSZEGO DOWODU: Carroll i Carrithers 1984

R5 nazywa to "najmocniejszym pojedynczym dowodem" i przyznaje mu jedyna ocene MOCNA w calej
tabeli dziewieciu form. Mialem byc surowy, wiec bede.

### Co sie broni

Praca jest prawdziwa, recenzowana (Human Factors 26(4), 1984), kontrolowana, a konflikt
interesow jest rzeczywiscie zerowy - w 1984 nie bylo czego sprzedawac. Wynik (grupa z pelnym
interfejsem tracila okolo jednej czwartej czasu sesji na wychodzenie ze stanow bledu, ktorych
wersja treningowa nie pozwalala popelnic) jest konkretny i duzy. Zasada ogolna - ograniczenie
poczatkowej powierzchni narzedzia zmniejsza blakanie sie - przezyla czterdziesci lat i jest
w tej kampanii jedynym twierdzeniem opartym na eksperymencie, ktory nie pochodzi ani od
sprzedawcy, ani z jednego artykulu NN/g.

### Cztery powody, dla ktorych ocena MOCNA jest nieuprawniona

**1. To nie jest dowod o samouczkach. To dowod o innej kategorii interwencji.** Training wheels
porownuje OKROJONY PRODUKT z pelnym produktem. Obie grupy dostaly ten sam podrecznik. Praca
nie mowi nic o nakladkach, podswietleniach, sekwencjach krokow ani o tym, kto klika. R5 zdaje
sobie z tego sprawe i pisze to wprost:

> "To jest jednak inny rodzaj interwencji niz jakikolwiek 'samouczek nalozony na istniejacy
> interfejs' - zmienia sam produkt, nie dodaje warstwy nad nim."
> (`R5_czy_tour_to_wlasciwa_forma.md`)

I mimo to stawia ten wiersz na SZCZYCIE tabeli porownujacej dziewiec form onboardingu, jako
jedyny z ocena MOCNA. **Nie mozna jednoczesnie napisac "to jest inna kategoria" i uzyc tego
do wygrania rankingu w tej kategorii.** Ocena MOCNA jest prawdziwa dla pytania "czy ograniczyc
produkt na start" i nieprawdziwa dla pytania "jaka forma wprowadzenia wybrac", ktore R5 mial
rozstrzygnac.

**2. R5 nie sprawdzil wielkosci proby zrodla, ktoremu dal najwyzsza ocene.** W calym raporcie
nie ma ani N, ani wielkosci efektu, ani przedzialow dla Carrolla. Sa za to skrupulatnie podane
dla NN/g (n=70, 35 na grupe, trzy p-wartosci) - i to zrodlo dostalo ocene SREDNIA. Probowalem
uzupelnic te luke w trakcie walidacji i **nie udalo sie: praca siedzi za platnym murem SAGE,
a wtorne omowienia nie podaja liczby uczestnikow.** Czyli wyzsza ocene dostala praca, ktorej
metodologii nikt w tej kampanii nie widzial, a nizsza ta, ktorej metodologia jest jawna.
To jest odwrocenie wlasnej skali jakosci R5.

**3. Replikacje sa w wiekszosci tym samym autorem.** R5 podpiera Carrolla czterema pozycjami
[5][6][7][8]. Ale [5] (Human Factors) i [6] (Communications of the ACM) to ten sam eksperyment
opublikowany w dwoch miejscach przez tych samych autorow w tym samym roku, a [8] i [11]
(Nurnberg Funnel, minimalizm instrukcyjny) to rowniez Carroll. Pozycja [7] jest linkiem do
strony cytowan w ResearchGate, ktorej R5 nigdzie nie relacjonuje jako przeczytanej. Zliczajac
uczciwie: **jeden program badawczy, jeden glowny autor, jedno laboratorium, jedna dekada** -
a nie cztery niezalezne potwierdzenia. Dokladnie ten sam blad, ktory ta kampania miala
wylapywac.

**4. Transfer na nasz przypadek nie przechodzi w trzech miejscach naraz.**
   - **Populacja.** Uczestnicy Carrolla to byli ludzie, ktorzy pierwszy raz w zyciu siedli
     do komputera, w 1983 roku, przy edytorze tekstu IBM. Nasz uzytkownik znalazl narzedzie
     o architekturze systemow wieloagentowych. To nie jest ten sam czlowiek.
   - **Tryb porazki.** Training wheels blokowal "stany bledu": sytuacje, w ktorych uzytkownik
     utknal w trybie i nie wiedzial, jak wyjsc. W jednoplikowej aplikacji HTML z widocznymi
     zakladkami, przyciskiem wstecz przegladarki i odswiezeniem strony ten tryb porazki
     praktycznie nie istnieje. Nasz uzytkownik nie utknie - on sie znudzi. To inny problem
     i praca z 1984 nic o nim nie mowi.
   - **Zmienna zalezna.** Carroll mierzyl czas do wykonania zdefiniowanego zadania i czas
     stracony na naprawianie bledow. R7 ustalil solidnie, ze nasza aplikacja **nie ma jednego
     oczywistego pierwszego zadania**. Zmienna, ktora Carroll mierzyl, u nas nie istnieje.

### Werdykt sekcji F

Praca jest dobra i uczciwa. Ocena R5 jest zawyzona o dwa stopnie i przyznana w niewlasciwej
kategorii. **Prawidlowy opis brzmi: najmocniejsze zrodlo tej kampanii jest odpowiedzia na
INNE pytanie niz to, ktore zadalismy.** To, co z niego realnie zostaje dla v41, jest waskie
ale konkretne i warte zachowania: przy pierwszym wejsciu ograniczyc powierzchnie, na przyklad
zaladowac gotowy przykladowy zespol na canvas zamiast pustego plotna. To jest zmiana produktu,
nie samouczek - i nie rozstrzyga sporu o samouczek w zadna strone.

Na marginesie, skoro juz porzadkujemy hierarchie: **najmocniejszym materialem ILOSCIOWYM
tej kampanii nie jest ani Carroll, ani NN/g, tylko Villar i in. 2013** - metaanaliza 32
eksperymentow, recenzowana, bez konfliktu interesow. Tyle ze dotyczy paskow postepu w
ankietach internetowych. Kampania ma wiec najlepszy dowod na temat, ktorego nie planowala
badac, i najgorszy na temat, ktory zamowila.

---

## G. WERYFIKACJA OSMIU HIPOTEZ ORKIESTRATORA

**1. "Jedno badanie, cztery cytowania, to nadal jedno badanie" - POTWIERDZONA, NIEDOSZACOWANA.**
Badanie NN/g wystepuje nie w czterech, a w **pieciu** raportach dowodowo (R1, R3, R4, R5, R8)
i jest wzmiankowane w szostym (R7). Ale prawdziwy problem jest wiekszy niz zauwazyl
orkiestrator: to nie jedno badanie w pieciu raportach, tylko **jedna instytucja w szesciu
raportach**, w tym trzy publikacje NN/g liczone przez R5 jako trzy zrodla. Zastrzezenie
o przenoszalnosci z iOS na duzy ekran jest sluszne i dodam do niego drugie, powazniejsze:
wynik glowny tego badania byl NULLEM, a jedyny wynik istotny to p=0.047 na jednej z trzech
miar bez korekty na porownania wielokrotne. Twierdzenie nadaje sie na przeslanke, nie na
fundament.

**2. "Trzy cytaty-widma" - POTWIERDZONA, LISTA NIEPELNA.** Wszystkie trzy zdiagnozowane
poprawnie, zadne nie przeciekle do dowodow. Ale widm jest co najmniej dziewiec (sekcja D),
a dziesiate - liczby Chameleon 72/74/16 - jest najgrozniejsze, bo ma prawdziwa firme i
prawdziwy URL. Wniosek orkiestratora, ze regula weryfikacji zrodla uratowala kampanie, jest
sluszny i wzmocniony: bez niej powstalby raport oparty na dziewieciu nieistniejacych badaniach.

**3. "Dowody przeciw paskowi postepu" - POTWIERDZONA CO DO ISTNIENIA ZRODEL, BLEDNIE
ODCZYTANA CO DO WNIOSKU.** Oba zrodla istnieja i sa mocne. Trzy poprawki:
   - Orkiestrator opuscil zastrzezenie, ktore R3 zapisal: **Liu i Wronski maja czesciowy
     konflikt interesow** (wspolautorka afiliowana z SurveyMonkey). To nadal recenzowana
     praca, ale etykieta wypadla po drodze.
   - **Villar i in. NIE stwierdzaja, ze pasek postepu szkodzi. Stwierdzaja, ze efekt zalezy
     od tego, czy postep jest szybszy, czy wolniejszy od oczekiwan.** R3 zapisal to
     poprawnie: "gdy postep 'spoznia sie' wzgledem oczekiwan, pasek pogarsza doswiadczenie".
     Orkiestrator sciagnal z tego blankietowy zakaz.
   - **Konsekwencja odwraca wniosek.** Szesciokrokowy samouczek, w ktorym kazdy krok trwa
     kilka sekund, jest przypadkiem SZYBKIEGO postepu, czyli warunkiem, w ktorym w metaanalizie
     pasek POMAGA. Czyli zrodlo, ktorym orkiestrator obalil wlasna propozycje, prawdopodobnie
     te propozycje popiera.

**4. "Stan dowodow niewygodny dla planu" - POTWIERDZONA CO DO FAKTU, ZA MOCNA CO DO WNIOSKU.**
Faktycznie nie ma ani jednego zweryfikowanego, niezaleznego testu A/B pokazujacego korzysc.
To zostaje. Ale zdanie "jedyne twarde badanie mowi, ze tutorial nie poprawia skutecznosci
i pogarsza postrzegana trudnosc" zawiera dwa naciagniecia: (a) "jedyne twarde badanie" pomija
Villara (wiekszy, mocniejszy, inne pytanie) i eksperyment GitLaba; (b) **brak dowodu korzysci
to nie to samo co dowod szkody**. Na n=70 null przy p=0.443 jest slabym dowodem nieistnienia
efektu. Uczciwa wersja brzmi: nie wiemy, czy samouczek pomaga, jedna slaba przeslanka sugeruje,
ze moze lekko szkodzic odczuciu.

**5. "Rozbieznosc Chameleon" - ROZSTRZYGNIETA, patrz sekcja B.** To sa rozne publikacje
(co najmniej trzy) ORAZ ktos zle przepisal ORAZ - najwazniejsze - kluczowa liczba nie istnieje
w zadnym dokumencie firmy. Praktyczny wniosek orkiestratora ("szesc krokow to 16-38 procent")
jest zbudowany na niczym i nalezy go wykreslic. Jedyna liczba realnie stojaca dzis w raporcie
Chameleon dla tego zakresu to okolo 48 procent przy pieciu krokach, i ona tez niczego nie
dowodzi, bo jest przekrojowa i splatana ze zlozonoscia produktu.

**6. "Trzy moje propozycje maja teraz dowody przeciwko sobie" - OBALONA W CALOSCI. Wszystkie
trzy.** To jest najwazniejsze ustalenie tej walidacji.
   - **Pasek postepu jako kregoslup:** dowody sa warunkowe i w naszym warunku prawdopodobnie
     dzialaja NA KORZYSC propozycji (punkt 3 wyzej). Status: NIEROZSTRZYGNIETE, nie obalone.
   - **Tour prowadzacy za reke:** orkiestrator pisze, ze "R8 relacjonuje, ze NN/g rekomenduje
     wskazywanie zamiast automatycznego klikania". **NN/g tego nie rekomenduje, bo NN/g o tym
     nie pisze.** Rekomendacja NN/g dotyczy osi push kontra pull, czyli KTO URUCHAMIA pomoc,
     a nie KTO KLIKA w trakcie. R8 napisal, ze forma wskazywania jest "bardzo blisko" tego,
     co NN/g rekomenduje - to parafraza, nie cytat. Raport, ktory to pytanie mial zbadac,
     mowi wprost: "Brak jakiegokolwiek bezposredniego porownania trzech wariantow
     (auto-klika / tylko wskazuje / czeka na klik uzytkownika) na tej samej probie
     uzytkownikow" (`R4`, CZEGO NIE USTALILEM, punkt 1). Status: **ZERO ZRODEL po obu
     stronach.** Decyzja nalezy do Macieja, nie do literatury.
   - **Szesc krokow w Akcie 1:** opiera sie w calosci na liczbie z sekcji B, ktorej nie ma.
     Status: bez dowodow w obie strony.

   Zdanie orkiestratora "zadna z tych trzech nie moze wejsc do syntezy dlatego, ze ladnie sie
   skladala" jest sluszne. Ale symetrycznie prawdziwe jest drugie: **zadna z tych trzech nie
   moze WYPASC z syntezy dlatego, ze ladnie sie skladalo ich obalenie.** Pokora oparta na
   zle policzonych zrodlach jest tym samym bledem co pycha oparta na zle policzonych zrodlach.

**7. "Cztery argumenty za tourem, ktore nie sa marketingiem" - JEDEN Z CZTERECH SIE BRONI.**
   - **Wyjatek NN/g dla nowego paradygmatu: OSLABIONY.** Wyjatek istnieje doslownie w zrodle
     ("genuinely novel interaction paradigms (like AR onboarding)"). Ale dotyczy nowej
     MODALNOSCI INTERAKCJI, gdzie uzytkownik nie ma zadnego modelu mentalnego - AR, VR. Nasz
     canvas, symulacja, Hooki i Wzorce to nietypowe FUNKCJE obslugiwane calkowicie standardowo:
     mysz, klikniecie, zakladka, panel. R7 napisal uczciwie "to jest interpretacja, nie cytat";
     orkiestrator awansowal to na "prawdopodobnie sie w tym wyjatku miescza". Nie miescza sie.
     To jest ten sam ruch, co pare akapitow wyzej w sekcji C: interpretacja awansowana na fakt.
   - **Advance organizer (Ausubel): NIE JEST DOWODEM.** Zero zrodel empirycznych, dwa portale
     wtorne, jeden datowany dwa dni przed kampania. To uzyteczna RAMA POJECIOWA dla decyzji
     "najpierw mapa, potem szczegoly" i tak nalezy ja opisac w syntezie. Nie wolno jej liczyc
     jako argumentu.
   - **Pamiec przestrzenna na stabilnych landmarkach: DZIALA PRZECIW, NIE ZA.** Zrodlo mowi,
     ze pamiec przestrzenna buduje sie przez **powtarzalna interakcje** ze stabilnym ukladem.
     Mechanizmem jest UZYWANIE, nie jednorazowe obejrzenie. To jest argument za tym, zeby
     uzytkownik klikal sam, i przeciw temu, zeby ogladal przewodnik. Orkiestrator odczytal
     to na odwrot.
   - **Encyklopedie uzywaja trwalej struktury zamiast wycieczki: BRONI SIE, ale nie jako
     dowod.** Zrodlem sa strony pomocy Wikipedii, czyli opis praktyki, nie pomiar. Kierunek
     wniosku orkiestratora jest jednak poprawny i, co wazniejsze, **jest to argument za MAPA
     i przeciw JEDNORAZOWEJ WYCIECZCE**, a nie argument za tourem. Warto to nazwac wprost,
     bo pod naglowkiem "argumenty za tourem" stoi teraz argument, ktory tour oslabia.

   Rozstrzygniecie R7 mapa kontra zadanie (blizej Unreal niz Blender, bo nie mamy jednego
   oczywistego pierwszego zadania) **POTWIERDZAM jako najlepsze rozumowanie w calej kampanii** -
   z zastrzezeniem, ze jest to rozumowanie o wlasnosciach NASZEJ aplikacji, a nie ustalenie
   ze zrodel, i R7 uczciwie tak je oznacza.

**8. "Dwie rzeczy z R6" - OBIE POTWIERDZONE, DRUGA Z KOREKTA, PLUS BRAKUJE TRZECIEJ.**
   - **WCAG 2.4.11: POTWIERDZONA w pelni.** Zrodlo normatywne W3C, sformulowanie orkiestratora
     jest precyzyjne (dymek nie moze go CALKOWICIE zaslaniac - na poziomie AA czesciowe
     zaslonienie jest dopuszczalne, pelny zakaz to 2.4.12 na poziomie AAA). To jest
     najtwardsze zdanie calej kampanii.
   - **Konflikt Escape: POTWIERDZONA CZESCIOWO, wniosek pocieszajacy jest nieuprawniony.**
     Jedno zgloszenie w jednym repozytorium dowodzi, ze klasa bledu jest realna i potrafi
     przetrwac lata w powaznym projekcie. Nie dowodzi, ze to "znany, nierozwiazany wzorzec
     bledu" w skali branzy - to jest n=1. Co wiecej, R6 podaje konkretne rozwiazanie
     (`stopPropagation` przed dotarciem do globalnego handlera, sprawdzanie `defaultPrevented`,
     rejestracja na fazie `capture`). Problem nie jest nierozwiazywalny. Jest nierozwiazany
     w cudzym repozytorium. U nas bedzie rozwiazany albo nie, i to bedzie nasza decyzja,
     nie branzowy fatalizm.
   - **BRAKUJE TRZECIEJ, i to wazniejszej od obu.** Orkiestrator nie zapisal ustalenia,
     ktore R6 nazywa swoim najwazniejszym: **konflikt miedzy pulapka fokusu a klikalnym
     celem nie ma rozwiazania uniwersalnego i decyzja modal kontra non-modal musi zapasc
     osobno dla kazdego trybu samouczka.** To wiaze sie wprost z pytaniem R4 i przesadza
     o architekturze silnika. Jesli krok ma pozwolic uzytkownikowi kliknac podswietlony
     element, nie wolno ustawic `aria-modal` ani zamknac fokusu w petli - a wtedy trzeba
     osobno rozwiazac, jak uzytkownik klawiatury wraca do dymka. To jest konkret do
     zaprojektowania, nie ciekawostka.

---

## H. CO MOZNA BEZPIECZNIE POWIEDZIEC, A CZEGO NIE

To jest sekcja, dla ktorej powstal ten dokument. Trzy koszyki.

### Koszyk 1: mozna powiedziec i mozna na tym oprzec decyzje

**Sa to niemal wylacznie rzeczy normatywne albo fakty o naszej wlasnej aplikacji, nie wyniki
badan o samouczkach. To samo w sobie jest najwazniejszym wynikiem kampanii.**

1. **WCAG 2.4.11 Focus Not Obscured (Minimum, AA).** Jesli krok ustawia fokus na podswietlanym
   elemencie, dymek nie moze go calkowicie zaslonic. Zrodlo normatywne, nie podlega dyskusji.
2. **Nie istnieje wzorzec W3C APG dla "guided tour".** Kazda biblioteka sklada wlasna
   kompozycje z Dialog, Carousel i Disclosure. Konsekwencja: nie ma czego "zrobic zgodnie
   ze standardem" - trzeba zlozyc wlasny wzorzec i samemu go przetestowac.
3. **Wszystkie trzy popularne biblioteki maja udokumentowane bledy dostepnosci** (Shepherd
   #198, Intro.js #426, Driver.js #434 i #24). Cztery pierwotne artefakty, trzy biblioteki.
   Nie brac zadnej "z pudelka" bez wlasnej weryfikacji fokusu, Escape i ogloszen czytnika.
4. **Decyzja modal kontra non-modal musi zapasc osobno per tryb kroku** i jest sprzezona
   z decyzja o tym, kto klika. Nie ma rozwiazania uniwersalnego.
5. **Konflikt globalnego Escape trzeba zaprojektowac swiadomie od poczatku** - fazy zdarzen,
   `stopPropagation`, `defaultPrevented`. Znany, rozwiazywalny, latwy do przegapienia.
6. **Nasze dwanascie kotwic nie drgnelo przez dziewiec wersji.** To fakt o naszym kodzie,
   zmierzony przez nas, i zaden zewnetrzny raport go nie podwazy.
7. **Nie mamy jednego oczywistego pierwszego zadania.** To rowniez fakt o naszej aplikacji.
   Z niego, a nie ze zrodel, wynika, ze jestesmy blizej Unreal Engine niz Blendera, czyli
   blizej mapy niz zadania. To jest najlepsze rozumowanie kampanii i wolno na nim budowac,
   pod warunkiem nazwania go rozumowaniem.
8. **Nie ma zadnego zweryfikowanego, niezaleznego testu A/B pokazujacego, ze samouczek
   pomaga.** Fakt negatywny, ustalony solidnie przez piec raportow niezaleznie. Warto go
   napisac w syntezie doslownie w tej formie.

### Koszyk 2: mozna powiedziec jako przeslanke, nie jako dowod

9. **NN/g uwaza, ze pomoc wyzwalana przez uzytkownika bije pomoc narzucona.** Poprawna
   etykieta: **stanowisko jednej instytucji, powtarzane w trzech publikacjach dwoch autorow,
   oparte na niecytowanym korpusie testow.** Nie "konsensus branzy", nie "trzy zrodla".
10. **W jednym badaniu (n=70, iOS, 2020) tutorial nie poprawil skutecznosci i pogorszyl
    odczucie latwosci.** Poprawna etykieta: **jeden wynik brzegowy (p=0.047) na jednej z trzech
    miar, bez korekty na porownania wielokrotne, przy wyniku glownym nieistotnym, na czterech
    prostych aplikacjach mobilnych.** Jesli to zdanie ma sie pojawic w syntezie, musi sie
    pojawic razem z tym zastrzezeniem, inaczej produkujemy trzecia blizne.
11. **Paradoks aktywnego uzytkownika.** Solidna, stara, wielokrotnie cytowana teoria. Mowi
    o TENDENCJI, nie o niemoznosci. Jedno zrodlo pierwotne plus jego wlasne streszczenie.
12. **Pasek postepu dziala warunkowo.** Dwie recenzowane prace z domeny ankiet: pomaga, gdy
    postep jest szybszy od oczekiwan, szkodzi, gdy wolniejszy. Przenoszenie na samouczek to
    analogia. **Nie wolno tego cytowac jako zakazu paska.**
13. **Ograniczenie powierzchni narzedzia na start zmniejsza blakanie sie** (Carroll 1984).
    Solidna praca, ale o innej kategorii interwencji, na innej populacji, z N nieznanym nikomu
    w tej kampanii. Uzasadnia najwyzej zaladowanie gotowego przykladu zamiast pustego canvasu.
14. **Advance organizer i pamiec przestrzenna** to ramy pojeciowe, nie dowody. Wolno ich
    uzywac do opisania, DLACZEGO robimy cos w dany sposob. Nie wolno ich liczyc do sily dowodu.

### Koszyk 3: czego powiedziec NIE WOLNO

15. **Zadnej liczby procentowej o ukonczeniu samouczka w zaleznosci od liczby krokow.**
    Ani 72, ani 74, ani 16, ani 73/38/25/8, ani 61, ani 52. Sekcja B pokazuje, ze te liczby
    sa wewnetrznie sprzeczne, arytmetycznie niedomkniete, pozbawione definicji "ukonczenia",
    a czesc z nich nie istnieje w dokumencie, ktoremu sa przypisywane.
16. **"Szesc krokow to okolo 16-38 procent ukonczenia".** Usunac z `PROGRESS.md`. Nie ma
    za tym zadnego zrodla.
17. **"Automat ma 23 procent, a zaproszenie 69 procent".** Jedno zrodlo, dostawca, liczby
    nie domykaja sie z jego wlasnym "123 procent" na sasiedniej stronie, a mechanizm jest
    czystym efektem selekcji: tour otwierany na zadanie otwieraja ludzie, ktorzy go chca.
    **To jest najbardziej istotna decyzyjnie liczba w calym korpusie i jednoczesnie
    najbardziej bezwartosciowa.** Pytanie R2 pozostaje nierozstrzygniete przez zrodla.
18. **"NN/g rekomenduje wskazywanie zamiast automatycznego klikania".** NN/g tego nie mowi.
    Nikt tego nie mowi. R4 przeszukal ten obszar i znalazl zero zrodel po obu stronach.
19. **"Nasza aplikacja miesci sie w wyjatku NN/g dla nowego paradygmatu".** Wyjatek dotyczy
    nowej modalnosci interakcji (AR, VR). My mamy nietypowe funkcje obslugiwane standardowa
    mysza. Jesli chcemy uzyc tego argumentu, trzeba napisac "twierdzimy, ze", a nie
    "NN/g dopuszcza".
20. **"Dowody sa przeciwko paskowi postepu".** Sa przeciwko paskowi pokazujacemu wolny postep.
21. **"Cztery, piec albo szesc niezaleznych zrodel potwierdza X".** W tej kampanii nie ma
    zadnego twierdzenia o samouczkach popartego przez wiecej niz **dwa** faktycznie niezalezne
    zrodla. Najlepiej udokumentowane twierdzenie to "pasek postepu dziala warunkowo" (dwa
    recenzowane) i dotyczy ankiet. Jesli w `SYNTHESIS.md` pojawi sie gdziekolwiek liczba
    wieksza niz dwa, to znaczy, ze ktos znowu policzy cytowania zamiast zrodel.

### Jedno zdanie na koniec, dla fazy SYNTEZA

Kampania nie rozstrzygnela, czy budowac samouczek - i zadne dostepne zrodlo tego nie
rozstrzygnie, bo takich badan po prostu nie ma. Rozstrzygnela natomiast cos wezszego
i uzyteczniejszego: **jesli go zbudujemy, to ograniczenia sa inzynierskie i dostepnosciowe,
a nie dowodowe.** Decyzja o formie, dlugosci i sposobie startu nalezy do Macieja i powinna
byc opisana w syntezie jako decyzja projektowa z uzasadnieniem, a nie jako wniosek z
literatury. Proponuje, zeby synteza powiedziala to wprost w pierwszym akapicie, zamiast
odkladac na koniec do listy nierozstrzygnietych - bo to jest glowny wynik, a nie przypis.

---

## ZALACZNIK: co zweryfikowalem bezposrednio w trakcie tej walidacji

1. `https://www.chameleon.io/blog/product-tour-benchmarks-highlights` - potwierdzone: 61
   procent, 15 mln interakcji, 123 procent self-serve, 21 procent checklist, 12 procent
   wskazniki postepu. **Brak rozbicia na liczbe krokow w tresci** (tylko odwolanie do wykresu).
2. `https://www.chameleon.io/benchmark-report` - potwierdzone: 550 mln interakcji, rok 2025,
   **okolo 52 / 51 / 48 procent dla 3 / 4 / 5 krokow, ostry spadek ponizej 25 procent przy
   6 i wiecej**. Zero definicji ukonczenia, zero liczby tourow, zero przedzialow ufnosci.
   **Nie zawiera liczb 72 / 74 / 16.**
3. `https://www.chameleon.io/assets/chameleon-product-tour-benchmarks-report-2019.pdf` -
   plik istnieje (1.4 MB), tekst nie daje sie wyciagnac automatycznie. Niezweryfikowany.
4. `https://www.nngroup.com/articles/mobile-tutorials/` - potwierdzone: 8 marca 2020, Alita
   Kendrick, n=70 (35 na grupe), **trzy testowane miary** (sukces p=0.443, SEQ p=0.047,
   czas p>0.1), **13 prob odrzuconych (5 procent)**, **zadnej wzmianki o korekcie na
   porownania wielokrotne**.
5. Carroll i Carrithers 1984, Human Factors 26(4) - **nie udalo sie ustalic wielkosci proby**
   (platny mur SAGE, omowienia wtorne nie podaja N). Odnotowuje jako luke, ktora R5 mial
   i ktorej nie zamknal, mimo ze przyznal temu zrodlu najwyzsza ocene w raporcie.
