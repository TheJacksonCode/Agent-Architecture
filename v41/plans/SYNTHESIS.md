# SYNTEZA v41 - samouczek w aplikacji

Autor: syntetyk kampanii v41. Zrodla: R1-R8 (`v41/research/`), walidacja krytyka
(`v41/research/CRITIC.md`, werdykt REVISE), `MASTER_PLAN.md`, `PROGRESS.md`.

Zasada tego dokumentu: kazde zdanie jest albo WNIOSKIEM Z BADAN (ma zrodlo, ma policzona
sile dowodu wedlug liczenia krytyka, nie wedlug liczby raportow), albo OSADEM PROJEKTOWYM
(oznaczonym jako taki wprost, bo zrodel brak). Nie ma trzeciej kategorii.

---

## 1. UCZCIWY STAN DOWODOW

Zanim cokolwiek innego: ta kampania wyglada na osiem niezaleznych sond. Nie jest.

**W warstwie dowodowej to jest praktycznie jedna instytucja, jeden eksperyment i jeden
autor akademicki.**

- **Jedna instytucja**: Nielsen Norman Group stoi za szescioma z osmiu raportow jako
  glowne zrodlo niezalezne. To nie jest "trzy zrodla NN/g" (jak policzyl R5) - to jest
  jedna firma, w duzej czesci dwoje autorow (Alita Kendrick, Page Laubheimer), ktora
  sprzedaje konsulting i szkolenia UX. Konflikt interesow jest lagodny, ale realny: teza
  "twoj interfejs powinien byc tak dobry, ze nie potrzebuje samouczka" jest teza, ktora
  sprzedaje przeprojektowanie interfejsu. Ta etykieta pojawia sie w tej kampanii
  niespojnie - czasem nazwana, czesciej pominieta.
- **Jeden eksperyment ilosciowy**: NN/g, Alita Kendrick, marzec 2020, n=70 (35 na grupe),
  cztery proste aplikacje iOS. To jedyne badanie w calej kampanii, ktore ma liczby, grupe
  kontrolna i p-wartosci. Cytowane niezaleznie w piatciu raportach (R1, R3, R4, R5, R8),
  co brzmi jak potwierdzenie - to jest jedno potwierdzenie, powtorzone piec razy.
- **Jeden autor akademicki po obu stronach sporu**: John M. Carroll. Jego praca z Rosson
  (1987, "paradoks aktywnego uzytkownika") jest najmocniejszym argumentem PRZECIW
  samouczkom w tej kampanii. Jego praca z Carrithers (1984, "training wheels") jest
  najmocniejszym argumentem ZA forma uczenia przez dzialanie. Zaden z raportow, ktory
  cytuje jedna z tych prac, nie zauwazyl istnienia drugiej. To jest jeden czlowiek i jedno
  laboratorium (IBM, poczatek lat 80.), nie dwa niezalezne obozy naukowe.

**Ten jeden eksperyment jest kruchszy, niz go opisano.** Testowano trzy miary. Dwie wyszly
nieistotne statystycznie: skutecznosc zadania (91% z tutorialem wobec 94% bez, p=0.443) i
czas wykonania (p>0.1). Jedna miara - subiektywnie postrzegana trudnosc (skala SEQ) - wyszla
istotna na poziomie p=0.047, czyli o wlos pod umownym progiem 0.05, **bez zadnej korekty na
porownania wielokrotne** (trzy testowane miary = powinna byc korekta, np. Bonferroniego, ktora
przesunelaby prog do okolo 0.017 i wynik przestalby byc istotny). Dodatkowo odrzucono 13 prob
z 83 zebranych (5% calej proby). Kilka raportow w tej kampanii zamienilo to na wniosek
kierunkowy "tutorial szkodzi". **To jest blad.** Null na n=70 przy p=0.443 jest slabym dowodem
NIEISTNIENIA korzysci, nie dowodem szkody. Uczciwe zdanie brzmi: nie wiemy, czy samouczek
pomaga; jedna slaba przeslanka sugeruje, ze moze lekko szkodzic subiektywnemu odczuciu
latwosci, na populacji i formie tutoriala (deck-of-cards przed uzyciem czterech prostych
aplikacji iOS w 2020), ktora niewiele przypomina nasza aplikacje.

**Liczby Chameleon niesione przez trzy raporty (72-74% przy 3-4 krokach, 16% przy 7 krokach)
nie istnieja w zadnym dokumencie Chameleon, do ktorego udalo sie dotrzec przy bezposredniej
weryfikacji.** Rzeczywisty raport firmy z 2025 roku (`chameleon.io/benchmark-report`, 550 mln
interakcji) podaje inne liczby: okolo 52% przy 3 krokach, 51% przy 4, 48% przy 5, ostry
spadek ponizej 25% przy 6 i wiecej. R3 wytropil to samo niezaleznie w trakcie fazy research.
**Te liczby nie wchodza do tego dokumentu w zadnej formie**, ani jako dowod, ani jako
"kierunkowa wskazowka" - zostaly juz raz przekazane dalej jako fakt pierwotny przez dwa
raporty (R4, R8), co jest dokladnie mechanizmem, ktory wyprodukowal wczesniej w tym
projekcie obalone "potwierdzone przez 9 zrodel" przy module Wzorce.

**Co z tego wynika dla calego dokumentu**: zaden pojedynczy wniosek nizej nie opiera sie na
wiecej niz dwoch faktycznie niezaleznych zrodlach. Najlepiej udokumentowane twierdzenie calej
kampanii ("pasek postepu dziala warunkowo") ma dwa niezalezne, recenzowane zrodla - i dotyczy
ankiet internetowych, nie samouczkow w aplikacji. Jesli w tym dokumencie pojawi sie liczba
zrodel wieksza niz dwa przy jakimkolwiek twierdzeniu o samouczkach, to jest to blad do
zgloszenia.

---

## 2. ODPOWIEDZI NA OSIEM PYTAN

### R1. Czy samouczek na pierwszym uruchomieniu w ogole dziala?

**Rozstrzygniecie**: nie ma zadnego zweryfikowanego, niezaleznego testu pokazujacego, ze
dziala. Jest jedno slabe, brzegowe wskazanie, ze moze lekko szkodzic subiektywnemu odczuciu
trudnosci, przy zerowym wplywie na realna skutecznosc.

**Sila dowodu**: 1 niezalezne zrodlo ilosciowe (NN/g/Kendrick 2020, n=70, jakosc srednia-niska
z powodow opisanych w sekcji 1), wspierane teoretycznie 1 zrodlem akademickim (Carroll i
Rosson 1987, "paradoks aktywnego uzytkownika" - model obserwacyjny, nie pomiar). Zero
zweryfikowanych testow A/B z branzy poza sprzedawcami narzedzi.

**Co z tego wynika dla budowy**: brak dowodu korzysci nie jest dowodem szkody. Decyzja o
budowie samouczka nie moze sie powolywac na "badania pokazuja, ze to dziala" - taka literatura
nie istnieje. Decyzja musi zostac nazwana tym, czym jest: osadem projektowym (patrz sekcja 7),
z wlasnym pomiarem po wdrozeniu (sekcja 8).

### R2. Automat czy zaproszenie?

**Rozstrzygniecie**: nie istnieje zaden test porownawczy z liczbami. Jedyne zrodlo jakosciowe
(NN/g) krytykuje nie sam fakt automatycznego startu, tylko brak kontroli uzytkownika i zly
moment (przyklady: Chase odpalajacy przewodnik w trakcie zglaszania oszustwa; Gates Carbon
Drive porzucajacy uzytkownika bez wsparcia po starcie). Automat z natychmiast widocznym,
pojedynczym wyjsciem nie jest tym, co NN/g krytykuje wprost.

**Sila dowodu**: 1 zrodlo jakosciowe, bez liczb (NN/g, "Onboarding Tutorials vs. Contextual
Help"). Zero zrodel ilosciowych po ktorejkolwiek stronie. Liczba "automat 23% kontra
zaproszenie 69%" z Chameleon nie domyka sie arytmetycznie z inna liczba tej samej firmy na tej
samej stronie (61% srednie ukonczenie, "123% wyzsze" dla self-serve - te trzy liczby wzajemnie
sie wykluczaja) i jest czystym efektem selekcji (tour otwierany na zadanie otwieraja ludzie,
ktorzy go chca). **Nie wolno jej uzyc w zadnej formie.**

**Co z tego wynika dla budowy**: pytanie R2 pozostaje nierozstrzygniete przez zrodla. Warunek
brzegowy, ktory faktycznie wynika z materialu: jesli ma byc automat, musi miec natychmiast
widoczne, pojedyncze wyjscie i musi startowac po pelnym zaladowaniu interfejsu, nie w trakcie.
Poza tym warunkiem - decyzja jest osadem projektowym.

### R3. Dlugosc - po ilu krokach ludzie wysiadaja?

**Rozstrzygniecie**: nie istnieje zaden wiarygodny prog liczby krokow. Kazda konkretna liczba
znaleziona w tej kampanii albo pochodzi od sprzedawcy tourow bez ujawnionej metodologii, albo
jest cytatem-widmem bez zrodla pierwotnego, albo (przypadek Chameleon 72/74/16) nie istnieje
w zadnym dokumencie, ktoremu jest przypisywana.

**Sila dowodu**: 0 zrodel niezaleznych z konkretnym progiem dla tourow w aplikacji. Jest za to
mocny materiel POBOCZNY: metaanaliza Villar, Callegaro, Yang (2013, 32 eksperymentow) i analiza
Liu i Wronski (2018, ponad 25 000 ankiet, czesciowy konflikt interesow - wspolautorka z
SurveyMonkey) pokazuja, ze paski postepu w ankietach dzialaja WARUNKOWO: pomagaja, gdy postep
jest szybszy niz oczekiwania, szkodza, gdy wolniejszy. To jest transfer domeny (ankiety, nie
toury), ale to najmocniejszy material ilosciowy calej kampanii.

**Co z tego wynika dla budowy**: nie wolno powolywac sie na zaden konkretny prog krokow jako
"badawczo ustalony". Wolno powolac sie na zasade goal-gradient (Kivetz i in. 2006, recenzowane,
ale domena programow lojalnosciowych - transfer, nie dowod wprost): kilka krotkich odcinkow z
widocznym postepem dziala lepiej psychologicznie niz jeden dlugi. Konkretna liczba krokow w
Akcie 1 to decyzja inzynierska, nie badawcza - patrz sekcja 6.

### R4. Forma: prowadzenie za reke kontra wskazywanie palcem?

**Rozstrzygniecie**: **zero zrodel po obu stronach.** R4 przeszukal ten obszar wprost i
napisal: "brak jakiegokolwiek bezposredniego porownania trzech wariantow (auto-klika / tylko
wskazuje / czeka na klik uzytkownika) na tej samej probie uzytkownikow". To nie jest slaba
odpowiedz - to jest brak odpowiedzi, nazwany uczciwie.

**Sila dowodu**: 0 zrodel bezposrednich. Posrednie wsparcie dla "tour czeka na klik
uzytkownika" pochodzi z literatury o uczeniu przez dzialanie kontra obserwacje (ogolna zasada
pedagogiczna, nie test na tourach) oraz z rekomendacji formalnej VS Code Walkthroughs (kazdy
krok ma miec czasownikowa akcje do wykonania, nie tekst do przeczytania - to jest wzorzec
produktowy, nie badanie).

**Co z tego wynika dla budowy**: to jest jedna z trzech propozycji orkiestratora, ktora
zostala uznana za "obalona dowodami" na podstawie zle policzonego zrodla (R8 sparafrazowal
NN/g, ktore o tym nie pisze). Werdykt w sekcji 6: NIEROZSTRZYGNIETE, nie obalone. Decyzja
nalezy do Macieja.

### R5. Czy tour to w ogole wlasciwa forma?

**Rozstrzygniecie**: tak zwany "klasyczny tour push, automatyczny, krok po kroku po calej
aplikacji" ma najslabsze wsparcie niezalezne ze wszystkich dziewieciu porownywanych form.
Kazde niezalezne zrodlo (NN/g w kilku publikacjach, Carroll przy minimalizmie instrukcyjnym)
rekomenduje albo formy pasywne aktywowane kontekstem (podpowiedzi just-in-time, puste stany),
albo formy oparte na dzialaniu z ograniczona zlozonoscia startowa. Formy push sa rekomendowane
niemal wylacznie przez firmy sprzedajace narzedzia do ich budowy.

**Sila dowodu**: SREDNIA jako twierdzenie negatywne (kilka zbieznych, niezaleznych zrodel
mowiacych "kiedy push NIE dziala"), ale **z jednym zastrzezeniem, ktorego R5 nie wyciagnal do
konca**: forma z najwyzsza ocena w tabeli R5 ("training wheels", Carroll i Carrithers 1984)
zostala oceniona zawyzona o dwa stopnie. To jest dowod dla INNEJ kategorii interwencji
(okrojenie samego produktu, nie nakladka nad nim), na innej populacji (pierwszy w zyciu kontakt
z komputerem, 1983), z nieznana wielkoscia proby (publikacja za platnym murem, nie ustalona w
tej kampanii mimo proby). Ten dowod uzasadnia wazka, konkretna rzecz - ograniczenie powierzchni
na start (np. gotowy przykladowy zespol na canvasie zamiast pustego plotna) - a nie wygrywa
rankingu form wprowadzenia.

**Co z tego wynika dla budowy**: forma "pull" (podpowiedzi na zadanie, dostepne trwale, nie
jednorazowa wycieczka) ma najlepsze poparcie niezalezne. Forma "push, automatyczny, przez cala
aplikacje" ma najslabsze. Kregoslup zaplanowany dla v41 jest formalnie formq push - to jest
napiecie z tym wynikiem badawczym, ktore trzeba rozwiazac projektowo (mozliwosc natychmiastowego
i trwalego wylaczenia, patrz sekcja 3), a nie przemilczec.

### R6. Dostepnosc nakladek z podswietleniem.

**Rozstrzygniecie**: to jedyny obszar calej kampanii, w ktorym cokolwiek jest pewne w sensie
normatywnym, nie statystycznym. Nie istnieje wzorzec W3C APG dla "guided tour" - kazda
biblioteka sklada wlasna kompozycje z Dialog, Carousel i Disclosure. Wszystkie trzy sprawdzone
biblioteki (Shepherd, Intro.js, Driver.js) maja udokumentowane, zgloszone przez uzytkownikow
bledy dostepnosci (fokus nieuwieziony mimo wizualnego podswietlenia, konflikt fokusu z
VoiceOver, brakujace ARIA). Zaden z trzech watkow nie cytuje formalnego audytu WCAG
zamowionego przez producenta przed wydaniem.

**Sila dowodu**: MOCNA i normatywna dla kryteriow WCAG (zrodlo W3C, wiazace, nie "opinia").
MOCNA jako fakt negatywny dla "brak wzorca APG" (przeszukanie katalogu, sprawdzalne). SREDNIA
(4 zgloszenia w 3 bibliotekach) dla "biblioteki z pudelka maja realne problemy" - wystarczajaca,
zeby nie brac zadnej bez wlasnej weryfikacji fokusu, Escape i ogloszen czytnika.

**Co z tego wynika dla budowy**: pelna lista kryteriow i wymagan w sekcji 5. Najwazniejszy
pojedynczy wniosek: **decyzja modal kontra non-modal musi zapasc osobno dla kazdego typu
kroku**, nie raz dla calego silnika - to jest konkret architektoniczny, nie ciekawostka.

### R7. Przypadek szczegolny: narzedzie, ktore samo jest materialem do nauki.

**Rozstrzygniecie**: nasza aplikacja nie ma jednego oczywistego pierwszego zadania (w
odroznieniu od Blendera czy Unity, gdzie "zrob model" jest oczywiste). Ma dwanascie kotwic i
kilka rownoleznych trybow uzycia bez jednego dominujacego. To stawia nas blizej Unreal Engine
i Figmy (mapa najpierw, zadanie potem) niz blizej Blendera (zadanie od razu, mapa wylania sie
przy okazji).

**Sila dowodu**: to jest rozumowanie o WLASNOSCIACH NASZEJ APLIKACJI (fakt sprawdzalny przez
nas), nie ustalenie ze zrodel zewnetrznych o samouczkach ogolnie. R7 sam to uczciwie nazywa.
Krytyk potwierdza to jako najlepsze pojedyncze rozumowanie calej kampanii. Wsparcie z zewnatrz
(Unreal, Figma, Ausubel/advance organizer) jest ilustracyjne, nie dowodowe - zero testow
porownawczych "mapa kontra zadanie" istnieje dla narzedzi tego typu.

**Co z tego wynika dla budowy**: struktura "mapa pierwsza, zadanie na zadanie" ma najlepsze
oparcie dostepne w tej kampanii, ale to oparcie jest architektoniczne (fakt o naszej aplikacji),
nie epidemiologiczne (fakt o uzytkownikach w ogole). Osobny, mocniejszy wniosek R7: encyklopedie
(przyklad: struktura pomocy Wikipedii) rozwiazuja orientacje TRWALA struktura nawigacyjna, nie
jednorazowa wycieczka. To jest argument za tym, zeby kregoslup zostawil trwaly slad (dostepny
pozniej pod przyciskiem, tak jak juz zaplanowano), a nie argument za forma push.

### R8. Adwokat diabla - dowody przeciw.

**Rozstrzygniecie**: R8 jest najlepiej zdyscyplinowanym raportem kampanii - jako jedyny odmowil
potwierdzenia wlasnego briefu tam, gdzie dowodow nie bylo ("nie znalazlem przypadku duzej,
znanej firmy, ktora usunela tour i miala z tego udokumentowana poprawe"). Cztery z pieciu
punktow jego TL;DR sie broniq (dwa realne zrodla NN/g plus Carroll/Rosson). Piaty punkt - liczby
Chameleon 72-74%/16% jako "przyznanie niekorzystne dla wlasnego interesu" - **upada w calosci**:
liczby nie istnieja w zrodle, a doktryna "statement against interest" nie ma tu zastosowania,
bo "krotkie toury dzialaja, dlugie nie" jest DOKLADNIE rekomendacja produktowa Chameleon
(obniza bariere zakupu, uzasadnia ich funkcje wyzwalaczy kontekstowych).

**Sila dowodu**: mieszana, punkt po punkcie jak wyzej. Osobno wazne: R8 znalazl jedyny w calej
kampanii realny artefakt "wycofano element onboardingu po pomiarze" - GitLab issue 351917,
eksperyment wideo wycofany po "niewielkim wplywie na aktywacje" i "braku wplywu na konwersje
platna". To jest mocniejszy, bo realny, dowod niz jakakolwiek liczba procentowa od sprzedawcy.

**Co z tego wynika dla budowy**: adwokat diabla nie znalazl argumentu obalajacego decyzje o
budowie samouczka jako takiej. Znalazl argumenty za ostroznoscia co do formy push i za
mierzeniem wlasnym wdrozeniem, zamiast ufaniem liczbom branzy. To jest zgodne z rekomendacja w
sekcji 8.

---

## 3. REKOMENDOWANY KSZTALT SAMOUCZKA

To jest miejsce, w ktorym dokument przechodzi z odczytu zrodel na decyzje. Kazdy punkt ponizej
jest oznaczony.

**Start [OSAD PROJEKTOWY, warunek z badan w tle]**: automatyczny, ale z trzema twardymi
warunkami, ktore wynikaja z jedynego dostepnego zrodla jakosciowego (NN/g): (1) natychmiast
widoczny, pojedynczy przycisk wyjscia - nie dwa rozne (Pomin i X), zeby uniknac dodatkowej
konfuzji, ktorej R2 nie potrafil rozstrzygnac zrodlowo; (2) start po pelnym zaladowaniu
interfejsu, nie w trakcie animacji wejscia; (3) zero blokowania interakcji poza dymkiem kroku -
uzytkownik moze w kazdej chwili kliknac cokolwiek innego i tour ma to przezyc bez bledu stanu.

**Forma [WNIOSEK Z BADAN, srednia sila]**: wskazywanie (spotlight + dymek), nie prowadzenie za
reke (auto-klikanie w imieniu uzytkownika). Nie dlatego, ze istnieje dowod przewagi (R4:
zero zrodel po obu stronach) - to jest OSAD. Powod inzynierski, nie badawczy: auto-klikanie
wymaga symulowania stanu aplikacji krok po kroku i sprzatania po przerwaniu w polowie, co jest
dokladnie ryzyko nazwane w MASTER_PLAN, a wskazywanie tego ryzyka nie ma. Jesli ma tu byc
przywolane cokolwiek z badan, to tylko posrednio: VS Code Walkthroughs formalnie rekomenduje,
zeby kazdy krok mial czasownikowa akcje DO WYKONANIA PRZEZ UZYTKOWNIKA, nie do obejrzenia -
to wspiera "czekaj na klik", nie "klikaj za uzytkownika", choc to wzorzec produktowy, nie test.

**Dlugosc Aktu 1 [OSAD PROJEKTOWY]**: nie szesc krokow. Zobacz sekcja 6 - szesc krokow bylo
uzasadniane liczba, ktorej nie ma w zadnym zrodle. Rekomendacja: cztery kroki, moze piec, z
mozliwoscia zakonczenia w kazdej chwili bez utraty postepu (mechanizm zapamietywania miejsca,
wzorowany na CircleCI - realny, udokumentowany precedens produktowy, nie badanie, ale
sprawdzalny fakt o cudzym produkcie). Uzasadnienie: goal-gradient (Kivetz i in.) sugeruje, ze
krotsze odcinki z widocznym koncem dzialaja lepiej psychologicznie niz jeden dlugi - transfer
z domeny programow lojalnosciowych, sila dowodu slaba-srednia, ale zgodna kierunkowo.

**Kolejnosc: mapa przed zadaniem [WNIOSEK Z BADAN o naszej aplikacji, srednia sila]**. Zgodnie
z R7: najpierw kregoslup pokazujacy, GDZIE co jest (dwanascie kotwic), nie wciaganie w jedno
konkretne zadanie na starcie, bo takiego jednego zadania nie ma. Kazdy krok moze konczyc sie
mikro-akcja ("kliknij tutaj i zobacz X") zamiast czystego podswietlenia biernego - to jest
hybryda mapa+zadanie, ktorej nikt bezposrednio nie testowal, ale ktora nie jest sprzeczna z
zadnym znalezionym zrodlem.

**Trwalosc [WNIOSEK Z BADAN, slaba-srednia sila]**: kregoslup musi zostac dostepny trwale pod
przyciskiem po zakonczeniu, nie zniknac po jednym przejsciu. To juz zaplanowano w architekturze
przed kampania (`learnO`) - research to potwierdza z dwoch kierunkow: R7 (encyklopedie licza na
trwala nawigacje, nie jednorazowa wycieczke) i zasada spatial memory (pamiec przestrzenna
buduje sie przez POWTARZALNA interakcje ze stabilnym ukladem, nie jednorazowe obejrzenie - co
jest w rzeczywistosci argumentem za tym, zeby uzytkownik mogl wracac i klikac sam, a nie
argumentem za sama wycieczka).

**Pasek postepu [OSAD PROJEKTOWY, dowody nierozstrzygajace - patrz sekcja 6]**: zostawic,
ale jako szybki, nie jako powolny. Metaanaliza Villar i in. pokazuje efekt WARUNKOWY: pasek
pomaga, gdy postep jest szybszy niz oczekiwania uzytkownika. Przy czterech-pieciu krokach,
z ktorych kazdy trwa kilka sekund, jestesmy w warunku szybkiego postepu - czyli w warunku, w
ktorym to samo zrodlo, ktorym wczesniej wewnetrznie obalono ten pomysl, raczej go wspiera.
To nie jest dowod "pasek dziala" - to jest brak dowodu przeciw w naszym konkretnym warunku.

---

## 4. LISTA KROKOW - propozycja

Kroki jako DANE (kotwica / akt / co pokazuje / czy prowadzi za reke), zgodnie z ustaleniem
architektonicznym sprzed kampanii. Krok bez kotwicy jest po cichu pomijany dla uzytkownika.

| # | Kotwica | Akt | Co pokazuje | Prowadzi za reke? |
|---|---|---|---|---|
| 1 | (brak - ekran powitalny) | 1 | Jedno zdanie: co to za narzedzie, przycisk "pokaz mi" / "pomin" | Nie - czeka na klik |
| 2 | jezyk (przelacznik PL/EN) | 1 | Gdzie zmienic jezyk | Wskazuje, nie klika za uzytkownika |
| 3 | `panAg` (agenci) | 1 | Gdzie jest biblioteka agentow | Wskazuje |
| 4 | `panPr` (presety) | 1 | Gdzie sa gotowe zespoly | Wskazuje |
| 5 | `svg` / `phaseBar` (canvas) | 1 | Gdzie sklada sie i uruchamia zespol, podzial na fazy | Wskazuje, opcjonalna mikro-akcja: "kliknij, zeby zobaczyc podglad fazy" |
| 6 | `learnO` (encyklopedia) | 1 (koniec) lub most do 2 | Gdzie wrocic po wiecej, i ze caly kregoslup jest dostepny ponownie stad | Wskazuje |

Uwaga do wiersza 5: `costHud` i `simBtn` byly kandydatami do Aktu 1 w PROGRESS.md. Rekomendacja
tego dokumentu: **zostawic je w Akcie 2**, zeby dotrzymac czterech-pieciu krokow (sekcja 3) -
koszt i symulacja sa wazne, ale nie sa potrzebne do zrozumienia, GDZIE co jest, ktore jest
celem Aktu 1 wedlug R7. Do potwierdzenia przez Macieja, patrz sekcja 7.

**Akt 2, na zadanie** (bez zmian wobec PROGRESS.md, brak nowych dowodow przeciw ani za):
`panSv` (zapisane), kreator wlasnego agenta, zakladki prawego panelu, dol canvasu, `costHud`,
`simBtn`, `themeToggle`, skroty klawiszowe (`pokazSkroty()` - przypomnienie: ten przycisk NIE
MA identyfikatora, jedyna zmiana w istniejacym HTML wymagana przez samouczek).

Kazdy krok, niezaleznie od aktu, powinien miec: kotwice (identyfikator elementu, nigdy selektor
pozycyjny), tytul i tekst PL/EN, opcjonalna akcja, i musi przejsc test WIDOCZNOSCI kotwicy
(nie samego istnienia w DOM) przed pokazaniem.

---

## 5. WYMAGANIA DOSTEPNOSCI

Twarde, normatywne, z numerow WCAG 2.2. To jedyna sekcja tego dokumentu, ktora nie jest
osadem ani sredniej sily wnioskiem - to jest wiazace zrodlo (W3C) plus sprawdzalne fakty o
bibliotekach.

| Kryterium | Poziom | Wymog |
|---|---|---|
| 2.1.1 Keyboard | A | Kazdy krok w pelni obslugiwalny klawiatura: Tab miedzy Dalej/Wstecz/Pomin. |
| 2.1.2 No Keyboard Trap | A | Jesli krok uzywa focus trap (wariant modalny), musi istniec zawsze dostepne klawiaturowe wyjscie. |
| 2.2.2 Pause, Stop, Hide | A | Kazda animacja przesuwania spotlightu i ewentualny auto-advance musza byc pauzowalne. |
| 2.4.3 Focus Order | A | Kolejnosc fokusu miedzy krokami logiczna i przewidywalna. |
| 2.4.7 Focus Visible | AA | Widoczny wskaznik fokusu na przyciskach sterujacych i na podswietlanym elemencie. |
| **2.4.11 Focus Not Obscured (Minimum)** | AA | **Dymek opisu kroku nie moze calkowicie zaslaniac podswietlanego elementu.** Najtwardsze, najbardziej bezposrednie kryterium tej kampanii. |
| 2.5.8 Target Size Minimum | AA | Przyciski Dalej/Wstecz/Pomin/Zamknij min. 24x24 px klikalnego obszaru. |
| 3.2.6 Consistent Help | A | Jesli przycisk uruchamiajacy samouczek jest traktowany jako mechanizm pomocy, musi byc w tym samym wzglednym miejscu na kazdym ekranie. |
| 4.1.2 Name, Role, Value | A | Kontener kroku: `role="dialog"` + `aria-labelledby`/`aria-label`; przyciski z jasnymi nazwami dostepnymi. |
| 4.1.3 Status Messages | AA | Zmiana kroku ogloszona przez region `aria-live="polite"`, niezaleznie od tego, czy fokus faktycznie sie przenosi. |
| 1.3.2 Meaningful Sequence | A | Kolejnosc DOM dymka i przyciskow odpowiada kolejnosci wizualnej, jesli dymek jest przenoszony w DOM blisko podswietlanego elementu. |
| 1.4.1 Use of Color | A | Podswietlenie nie moze byc jedynym sygnalem "to jest teraz wazne". |
| 1.4.4 Resize Text / 1.4.10 Reflow | AA | Tresc kroku czytelna przy powiekszeniu 200%; dymek dziala przy szerokosci 320px CSS bez przewijania w dwoch wymiarach. |
| 1.4.11 Non-text Contrast | AA | Obwodka podswietlenia: kontrast min. 3:1 wobec przyciemnionego tla. |
| `prefers-reduced-motion` | dobra praktyka, nie formalne AA | Przesuwanie spotlightu i pasek postepu reaguja na te preferencje - jezyk wizualny juz istniejacy w lekcji hookow. |

**Decyzja architektoniczna wynikajaca wprost z R6, nie do pominiecia**: modal kontra non-modal
nie ma jednego uniwersalnego rozwiazania. Krok, ktory ma pozwolic uzytkownikowi kliknac
podswietlony element (np. krok 5 z tabeli w sekcji 4, "kliknij, zeby zobaczyc faze"), NIE MOZE
ustawic `aria-modal` ani zamknac fokusu w petli - dla takiego kroku trzeba osobno zaprojektowac
powrot uzytkownika klawiatury do dymka po interakcji z elementem. Decyzja modal/non-modal
zapada per typ kroku, nie raz dla calego silnika.

**Konflikt z globalnym Escape** (znany, udokumentowany blad klasy w FluentUI #17940, n=1
przypadek, nie "znany wzorzec branzowy" - to jest przesada obecna w PROGRESS.md, patrz
sekcja 6) musi byc zaprojektowany swiadomie: `stopPropagation` przed dotarciem do globalnego
handlera, sprawdzanie `defaultPrevented`, rejestracja na fazie `capture`. To jest rozwiazywalne
technicznie i musi zostac rozwiazane u nas, nie potraktowane jako nieunikniony branzowy los.

**Nie brac zadnej biblioteki tourow "z pudelka" bez wlasnej weryfikacji.** Shepherd, Intro.js i
Driver.js maja kazdy co najmniej jedno udokumentowane, zgloszone przez uzytkownikow zaniedbanie
dostepnosci (fokus nieuwieziony mimo wizualnego podswietlenia w Driver.js; konflikt fokusu z
VoiceOver w Intro.js; brak ARIA w Shepherd w momencie zgloszenia). Zaden z trzech projektow nie
udokumentowal formalnego audytu WCAG przed wydaniem.

---

## 6. TRZY PROPOZYCJE ORKIESTRATORA - werdykt dla kazdej

Krytyk sprawdzil wszystkie trzy granica po granicy i obalil wlasne wczesniejsze obalenie
kazdej z nich. Ten dokument utrzymuje werdykt krytyka, nie oryginalna decyzje orkiestratora ani
jej pierwsze odrzucenie.

**1. Pasek postepu jako kregoslup z lekcji hookow.**
Werdykt: **NIEROZSTRZYGNIETE, prawdopodobnie na korzysc propozycji w naszym warunku.**
Dwa recenzowane zrodla (Villar i in. 2013; Liu i Wronski 2018) nie mowia "pasek postepu
szkodzi" - mowia "pasek postepu szkodzi, gdy jest WOLNIEJSZY niz oczekiwania uzytkownika, i
pomaga, gdy jest szybszy". Samouczek na cztery-piec krokow, kazdy trwajacy kilka sekund, jest
przypadkiem szybkiego postepu. Rekomendacja: **utrzymac pasek postepu**, uzywajac istniejacego
jezyka wizualnego z lekcji hookow (juz przetestowany, z obsluzonym `prefers-reduced-motion`).
To jest osad projektowy oparty na przeslance kierunkowej, nie wniosek z badan - ale przeslanka
jest zgodna z propozycja, nie przeciwko niej.

**2. Prowadzenie za reke przy kreatorze wlasnego agenta.**
Werdykt: **NIEROZSTRZYGNIETE, zero zrodel po obu stronach.** Wczesniejsze obalenie tej
propozycji oparlo sie na parafrazie R8 ("NN/g rekomenduje wskazywanie zamiast klikania"), ktora
nie jest w zrodle NN/g w zadnej formie - NN/g nie pisze o tym, kto klika w trakcie kroku, tylko
o tym, kto uruchamia caly mechanizm (push kontra pull), co jest inna osia pytania. R4 przeszukal
ten temat wprost i napisal, ze porownania trzech wariantow (auto-klika / tylko wskazuje / czeka
na klik) na tej samej probie nie ma. Rekomendacja tego dokumentu (sekcja 3): wskazywanie, nie
klikanie za uzytkownika - ale to jest osad inzynierski (koszt utrzymania i ryzyko stanu), nie
wniosek z literatury, i tak nalezy go zaprezentowac Maciejowi.

**3. Szesciokrokowy Akt 1.**
Werdykt: **BEZ DOWODOW W OBIE STRONY, liczba do wykreslenia z dokumentacji projektu.**
Uzasadnienie szesciu krokow w PROGRESS.md ("wedlug R7 25-38%, wedlug R8 16% ukonczenia")
opieralo sie na liczbie Chameleon, ktorej nie ma w zadnym dokumencie firmy (sekcja 1). Nawet
gdyby liczba istniala, byloby to dane przekrojowe (dluzsze toury korelujaz bardziej
zlozonymi produktami), nie przyczynowe - nie wynika z niej, ze skrocenie NASZEGO tour do X
krokow da konkretny procent ukonczenia. Rekomendacja tego dokumentu (sekcja 3): cztery-piec
krokow, uzasadnione goal-gradient (slaba-srednia sila, transfer domeny) i wzgledem inzynierskim
(mniej powierzchni = mniej do utrzymania), nie liczba z branzy tour software.

**Wniosek ogolny dla tej sekcji**: zadna z trzech propozycji nie zostaje odrzucona ani przyjeta
na podstawie zrodel zewnetrznych, bo takich zrodel nie ma. Pokora "moj pomysl ma dowody
przeciwko sobie" byla w tym wypadku tym samym bledem co pycha "moj pomysl jest potwierdzony" -
oba wymagaja policzenia zrodel granica po granicy, zanim cokolwiek sie powie.

---

## 7. CZEGO RESEARCH NIE ROZSTRZYGNAL - DECYZJE DLA MACIEJA

To jest najwazniejsza sekcja tego dokumentu. Kampania nie rozstrzygnela, CZY budowac
samouczek - i zadne dostepne zrodlo tego nie rozstrzygnie, bo takich badan po prostu nie ma.
Decyzja o budowie zapadla przed researchem i ten dokument jej nie broni ani nie podwaza -
odnotowuje, ze stoi na osadzie, nie na literaturze.

Ponizej: pytania, przy ktorych badania milczaly, z rekomendacja OZNACZONA jako osad, do
zatwierdzenia lub odrzucenia przez Macieja.

1. **Czy start jest automatyczny, czy na zaproszenie?** Zrodla nie rozstrzygaja (R2). Osad
   tego dokumentu: automatyczny, z trzema warunkami z sekcji 3. Alternatywa rownie uprawniona:
   subtelne zaproszenie (np. delikatny banner "nowy tutaj? pokaz mi" zamiast pelnego auto-startu)
   - to jest bezpieczniejsze wobec krytyki NN/g, kosztem gwarancji ekspozycji.

2. **Czy tour klika sam, czy czeka na uzytkownika?** Zrodla milcza calkowicie (R4). Osad:
   czeka i wskazuje. Do potwierdzenia - to jest decyzja o koszcie inzynierskim (sprzatanie
   stanu po przerwaniu, kolizja z akcjami uzytkownika), nie o skutecznosci pedagogicznej,
   bo tej nikt nie zmierzyl.

3. **Ile krokow ma miec Akt 1?** Zrodla nie daja liczby (R3). Osad: cztery do pieciu. Alternatywy
   rownie uprawnione: trzy (bardziej konserwatywnie wobec ryzyka nudy przy dluzszych
   sekwencjach, ktore ocenilismy jakosciowo, nie liczbowo) albo pozostawienie szesciu, jesli
   Maciej uzna szescioelementowy kregoslup za nierozerwalny koncepcyjnie - w takim razie warto
   rozwazyc podzial na dwa krotsze podetapy w ramach jednego aktu, zamiast jednej sekwencji.

4. **Czy kregoslup samouczka ma pokazywac `costHud` i `simBtn` w Akcie 1, czy w Akcie 2?**
   PROGRESS.md sugerowal `simBtn` jako mocnego kandydata do Aktu 1. Ten dokument rekomenduje
   przesuniecie obu do Aktu 2, zeby dotrzymac limitu z punktu 3 - ale to jest czysto
   redakcyjna decyzja o priorytetach tresci, zero zrodel po ktorejkolwiek stronie.

5. **Czy uzyc gotowej biblioteki tourow (Shepherd/Intro.js/Driver.js), czy napisac wlasny,
   minimalny silnik?** R6 pokazuje, ze kazda z trzech duzych bibliotek ma udokumentowane
   problemy dostepnosci i zaden nie ma formalnego wzorca W3C do nasladowania. To NIE
   rozstrzyga pytania - pokazuje tylko, ze wybor gotowej biblioteki nie zwalnia z wlasnego
   audytu fokusu/Escape/ARIA. Biorac pod uwage, ze aplikacja jest juz jednym plikiem HTML
   zero-zaleznosci (CLAUDE.md, zasada projektu), osad tego dokumentu: **wlasny, minimalny
   silnik**, zgodny z zasada "krok jako dane" juz przyjeta w architekturze - nie import
   biblioteki, ktora i tak wymaga przepisania warstwy ARIA.

6. **Czy pytac ponownie uzytkownika, ktory raz odrzucil samouczek przy drugiej wizycie?**
   R2 nie znalazl zadnego zrodla. Osad: nie pytac na podstawie liczby wizyt; pytac (lub
   podpowiedziec) na podstawie zaobserwowanego zachowania wskazujacego na zagubienie (np.
   brak interakcji z ktorakolwiek z dwunastu kotwic po okreslonym czasie) - to jest
   wnioskowanie z zasady "state-based, nie session-count-based", szeroko przyjetej w
   projektowaniu produktu, ale niecytowanej wprost dla tego przypadku.

7. **Czy przycisk "Pomin" i przycisk "X" (zamknij) maja byc dwoma osobnymi elementami, czy
   jednym?** Brak zrodla ilosciowego. Osad z sekcji 3: jeden, zeby zmniejszyc ryzyko
   konfuzji nazwane (choc niezmierzone) w R2.

---

## 8. JAK TO ZMIERZYC PO WDROZENIU

Skoro zewnetrznych dowodow brakuje strukturalnie, nie przypadkowo - nikt w branzy nie zrobil
kontrolowanego testu samouczkow w aplikacjach tego typu - jedyny sposob, zeby v41 przestalo
byc osadem i stalo sie wiedza, to zebranie wlasnych danych po wdrozeniu. Rekomendacje:

1. **Mierzyc ukonczenie per krok, nie tylko calego Aktu 1.** To da nam wlasna, prawdziwa
   krzywa "gdzie ludzie wysiadaja" - dokladnie ta dana, ktorej brakowalo calej kampanii i
   ktorej branza nie ma (albo ma i nie publikuje metodologii).
2. **Mierzyc, czy uzytkownicy, ktorzy przeszli samouczek, faktycznie dotykaja wiecej kotwic
   w pierwszej sesji niz ci, ktorzy go pomineli.** To jest nasza wersja miary "skutecznosc
   zadania" z badania NN/g - lekka telemetria, zero PII, licznik kliknietych kotwic.
3. **Mierzyc powrot do samouczka pod przyciskiem `learnO`** po pierwszej sesji - to jest luka,
   ktorej R1 nie zdolal zapelnic zewnetrznie ("nie znalazlam ani jednej publicznie dostepnej
   liczby mowiacej, jaki procent uzytkownikow wraca do samouczka"). U nas bedzie to pierwsza
   taka liczba, jaka kiedykolwiek zmierzono publicznie dla tego typu produktu, o ile Maciej
   zechce ja kiedys upublicznic (za jego zgoda, na koniec projektu, zgodnie ze standardowa
   zasada publikacji tego projektu).
4. **Test A/B jednej zmiennej naraz, nie calego ksztaltu**, jesli Maciej zechce kiedys
   faktycznie zweryfikowac ktorykolwiek z osadow z sekcji 7 (np. cztery kontra szesc krokow).
   To jest jedyny sposob, zeby nastepna wersja tego dokumentu mogla powolac sie na dowod
   zamiast na osad.
5. **Nie ufac zadnej przyszlej liczbie od sprzedawcy narzedzi do tourow bez samodzielnej
   weryfikacji zrodla**, nawet jesli brzmi wygodnie. Ta kampania znalazla co najmniej dziewiec
   cytatow-widm i jedna liczbe-widmo z prawdziwa firma i prawdziwym URL-em, ale falszywa
   zawartoscia. Regula "kazde twierdzenie niesie URL, kazdy URL zostaje sprawdzony u zrodla"
   powinna zostac stala zasada przy kazdym kolejnym researchu tego typu w projekcie.

---

**Podsumowanie w jednym zdaniu**: ta kampania nie odpowiedziala, czy samouczek pomoze - bo nie
ma na to odpowiedzi w literaturze, ani u nikogo innego. Odpowiedziala na cos wezszego i bardziej
uzytecznego: jesli go zbudujemy, ograniczenia sa inzynierskie i dostepnosciowe (sekcja 5), forma
i dlugosc sa naszymi decyzjami do podjecia swiadomie jako osad (sekcja 7), a jedyny sposob, zeby
kiedykolwiek wiedziec, czy to zadziala, to zmierzyc to samemu (sekcja 8).
