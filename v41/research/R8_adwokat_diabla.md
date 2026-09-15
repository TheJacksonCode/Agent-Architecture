# R8 - Adwokat diabla: argumenty przeciw samouczkowi

Zadanie tego raportu nie jest szukanie rownowagi. Zadaniem jest znalezienie najmocniejszych
dostepnych publicznie dowodow i opinii przeciw budowaniu samouczka typu "product tour"
w aplikacji Agent Architecture, oraz sprawdzenie, czy popularne liczby krazace w tej
branzy maja pokrycie zrodlowe. Kazde twierdzenie ma URL. Kazdy zarzut ma podana sile.

## TL;DR (najmocniejsze zarzuty, kazdy z sila)

1. **Tutoriale nie poprawiaja wykonania zadania i sa szybko zapominane** - Nielsen
   Norman Group (Page Laubheimer, "Onboarding Tutorials vs. Contextual Help",
   nngroup.com/articles/onboarding-tutorials/), oparte na wlasnych badaniach uzytecznosci
   NN/g. SILA: wysoka jakosciowo (NN/g to uznany, niezalezny, nie sprzedajacy narzedzi
   do tourow podmiot badawczy), ale artykul cytuje "nasze badania" bez podania N ani
   pelnej metodologii dla tego konkretnego zdania - wiec sila jest wysoka autorytetem,
   srednia metodologiczna przejrzystoscia.

2. **W kontrolowanym tescie A/B miedzy-grupowym (70 uzytkownikow, 4 aplikacje mobilne)
   grupa, ktora OGLADALA tutorial, oceniala zadania jako TRUDNIEJSZE niz grupa, ktora
   go pominela (4.92 vs 5.49 w skali latwosci), przy praktycznie tej samej skutecznosci
   zadania (91% vs 94%)** - NN/g, "Mobile Tutorials: Wasted Effort or Efficiency Boost?"
   (nngroup.com/articles/mobile-tutorials/). SILA: wysoka - to jest konkretne badanie
   z podanym N i metoda, nie samo twierdzenie. Jeden z najmocniejszych dowodow w tym
   raporcie, bo bezposrednio mierzy koszt psychologiczny tutoriala, nie tylko skip-rate.

3. **"Paradoks aktywnego uzytkownika" (Carroll i Rosson, badania HCI z lat 80.) -
   uzytkownicy systemowo wybieraja dzialanie zamiast nauki, nawet gdy nauka
   dlugoterminowo oszczedzalaby im czas.** To nie jest wada projektowa mozliwa do
   naprawienia lepszym tourem - to jest wlasciwosc ludzkiego zachowania. Zrodlo:
   oryginalna praca (research.cs.vt.edu/ns/cs5724papers/4.mental.mental.carroll.paradox.pdf)
   plus wspolczesne podsumowanie NN/g (nngroup.com/articles/paradox-of-the-active-user/).
   SILA: wysoka - to ugruntowana teoria HCI cytowana od dekad, niezalezna od branzy
   onboardingowej, powstala zanim istnialy firmy sprzedajace tour software.

4. **Same firmy sprzedajace oprogramowanie do tourow przyznaja w swoich danych, ze
   wiekszosc tourow jest porzucana przy wiekszej liczbie krokow: z 72-74% ukonczenia
   przy 3-4 krokach do 16% przy 7 krokach.** Zrodlo: Chameleon, raport "Product Tour
   Benchmarks" (chameleon.io/blog/product-tour-benchmarks-highlights,
   chameleon.io/assets/chameleon-product-tour-benchmarks-report-2019.pdf). SILA:
   dane pochodza od sprzedawcy narzedzia do tourow (konflikt interesu - patrz sekcja
   zrodel), ALE dzialaja PRZECIW tezie sprzedawcy, wiec sa wiarygodne jako "przyznanie
   niekorzystne dla mowiacego" (statement against interest). To jest mocny typ dowodu
   mimo pochodzenia.

5. **NN/g formalnie rekomenduje: "Onboarding: Skip it When Possible"** - caly odcinek
   wideo NN/g poswiecony jest tezie, ze instrukcje onboardingowe, ktore uzytkownik musi
   przetworzyc zanim zacznie korzystac z produktu, wymagaja uwagi i wysilku, a wiec
   OBNIZAJA uzytecznosc i nalezy ich unikac w miare mozliwosci (nngroup.com/videos/
   onboarding-skip-it-when-possible/). SILA: wysoka autorytetem (NN/g, niezalezni),
   ale to jest odcinek wideo z teza, nie oddzielne badanie z nowymi danymi - opiera sie
   na tym samym korpusie badan co punkt 1 i 2.

## ZARZUTY OD NAJMOCNIEJSZEGO

### Zarzut 1: Tour to plaster na zly interfejs (teza "bandage")

To jest najczesciej powtarzany argument w literaturze UX niezaleznej od dostawcow. NN/g
formuluje go wprost jako zasade projektowa, nie jako pojedyncza opinie: instrukcje, ktore
uzytkownik musi przyswoic zanim zacznie korzystac z produktu, sa kosztem poznawczym z
definicji, wiec kazdy krok tutoriala powinien byc traktowany jako dlug, a nie jako
funkcja (nngroup.com/videos/onboarding-skip-it-when-possible/). Video wprost mowi, ze
lepszym rozwiazaniem jest zrobienie interfejsu na tyle intuicyjnym, by dodatkowe
instrukcje nie byly potrzebne.

Ten sam autor (Laubheimer) w artykule "Onboarding Tutorials vs. Contextual Help"
formuluje to jeszcze bardziej bezposrednio: tutoriale "nie poprawiaja wykonania zadania"
i "nie realizuja wlasnego celu istnienia" (nngroup.com/articles/onboarding-tutorials/).
Rekomendacja NN/g nie brzmi "zrob lepszy tour" - brzmi "zastap go pomoca kontekstowa
uruchamianą w momencie potrzeby" ("pull revelations" zamiast "push tutorials").

Osobne, mniej autorytatywne zrodlo (blog Medium/UX Bootcamp, "4 reasons why onboarding
tours and coach marks don't work") powtarza te teze pod tytulem wprost negujacym
skutecznosc tourow, ale strona zwrocila HTTP 403 przy probie pelnego odczytu tresci -
nie moglem zweryfikowac czterech konkretnych argumentow ani sprawdzic, czy autor cytuje
dane czy tylko opinie. Traktuje to zrodlo jako slabe (tytul potwierdzony przez wyniki
wyszukiwania, tresc niezweryfikowana) i NIE buduje na nim zadnej liczby.

SILA: wysoka jako teza (jeden powazny, niezalezny, wielokrotnie cytowany autorytet -
NN/g - powtarza ja w co najmniej dwoch osobnych publikacjach: artykule i wideo, plus
w badaniu z konkretnymi liczbami w punkcie 2 nizej). Slaba jako "konsensus branzy" -
nie znalazlem drugiego niezaleznego od NN/g zrodla akademickiego lub badawczego, ktore
mierzy to samo zjawisko z wlasna metodologia. To jest jeden silny glos, nie chor.

### Zarzut 2: Konkretne badanie - tutorial pogarsza subiektywna ocene trudnosci

NN/g "Mobile Tutorials: Wasted Effort or Efficiency Boost?" (nngroup.com/articles/
mobile-tutorials/) to badanie between-subject, 70 uczestnikow (35 na grupe), 4 aplikacje
na iPhone. Wyniki:

- skutecznosc zadania: 91% (grupa z tutorialem) vs 94% (grupa bez) - praktycznie bez
  roznicy, tutorial NIE poprawil wynikow
- subiektywna latwosc: 4.92 vs 5.49 w skali - grupa z tutorialem oceniala zadania jako
  TRUDNIEJSZE
- czas wykonania: brak istotnej roznicy miedzy grupami
- cytat uczestnika: "To me, I didn't even have to watch the tutorial, but I guess it's
  there if you need it" - czyli sam tutorial nie byl postrzegany jako potrzebny nawet
  przez osobe, ktora go obejrzala

Wniosek autorow: nakłady na tworzenie tutoriali dla prostych aplikacji lepiej przekierowac
na uproszczenie samego interfejsu.

SILA: wysoka jako pojedyncze badanie - ma podane N, metode (between-subject), konkretne
liczby. Ograniczenie: to jeden test na 4 aplikacjach mobilnych z 2015-2019 (NN/g nie
podaje dokladnej daty w wyciagu), nie na aplikacji webowej typu desktop-first jak
Agent Architecture, i nie na aplikacji edukacyjnej/encyklopedycznej. Generalizacja na
nasz przypadek wymaga ostroznosci - ale kierunek dowodu (tutorial nie pomaga, czasem
szkodzi percepcji) jest jednoznaczny.

### Zarzut 3: Paradoks aktywnego uzytkownika - to nie jest problem do naprawienia lepszym tourem

Carroll i Rosson (badania HCI, oryginalna praca dostepna jako PDF:
research.cs.vt.edu/ns/cs5724papers/4.mental.mental.carroll.paradox.pdf, tez
semanticscholar.org/paper/Paradox-of-the-active-user-Carroll-Rosson) sformulowali teze,
ze uzytkownicy systemowo wybieraja natychmiastowe dzialanie ponad nauke systemu, NAWET
gdy nauka bylaby oplacalna w dluzszej perspektywie. NN/g podsumowuje to jako zjawisko
"wynikajace z fundamentalnego ludzkiego zachowania, nie problem projektowy do
rozwiazania" (nngroup.com/articles/paradox-of-the-active-user/).

To jest najbardziej fundamentalny zarzut w tym raporcie, bo dziala niezaleznie od tego,
JAK dobrze zaprojektujemy samouczek. Jesli teza jest prawdziwa, to nawet perfekcyjny
tour, dopasowany, krotki, z checklist i kontekstowy, wciaz przegrywa z naturalna
sklonnoscia uzytkownika do klikania "dalej" albo zamkniecia okna, bo psychologiczna
nagroda z ukonczenia zadania przewyzsza abstrakcyjna korzysc z nauki.

SILA: wysoka. To jest ugruntowana, wielokrotnie cytowana teoria z literatury HCI,
powstala niezaleznie od wspolczesnej branzy SaaS onboardingowego (lata 80., zanim
istnialy firmy typu Appcues/Userpilot/Pendo). Nie ma tu konfliktu interesu.
Ograniczenie: teoria mowi o TENDENCJI, nie o niemoznosci - nie dowodzi, ze KAZDY tour
jest bezuzyteczny, tylko ze projekt musi liczyc sie z silnym oporem podstawowym.

### Zarzut 4: Statystyki kompletacji tourow spadaja gwaltownie z dlugoscia - nawet wg sprzedawcy tourow

Chameleon (firma sprzedajaca oprogramowanie do product tours) opublikowala dane z analizy
15 milionow interakcji z tourami: srednio 61% uzytkownikow konczy tour, ALE przy 3-4
krokach kompletacja wynosi 72-74%, a przy 7 krokach spada do 16%
(chameleon.io/blog/product-tour-benchmarks-highlights,
chameleon.io/assets/chameleon-product-tour-benchmarks-report-2019.pdf).

To jest dowod typu "przyznanie niekorzystne dla mowiacego" - firma, ktorej biznes zalezy
od przekonania klientow do budowania tourow, publikuje dane pokazujace, ze wiekszosc
dluzszych tourow konczy sie porzuceniem. Taki dowod jest wiarygodniejszy niz gdyby
pochodzil od strony neutralnej, bo nie ma motywacji, by go zanizac.

Konsekwencja dla Agent Architecture: kregoslup samouczka ma pokazac co najmniej 10 kotwic
(jezyk, agenci, presety, zapisane, canvas, faza, koszt, symulacja, encyklopedia, motyw,
skroty klawiszowe - MASTER_PLAN wymienia 12 punktow). Jesli kazda kotwica to jeden krok,
to wedlug wlasnych danych branzy prognozowana kompletacja jest bliska dolnym wartosciom
z tabeli Chameleon (7 krokow = 16%), a nie gornym (3-4 kroki = 72-74%). To jest argument
BEZPOSREDNIO przeciw dlugosci planowanej w MASTER_PLAN, nie tylko przeciw idei tour jako
takiej.

SILA: srednia-wysoka. Dane ilosciowe z duzej proby (15 mln interakcji), ale metodologia
nie jest publicznie audytowana (nie wiadomo, jak Chameleon definiuje "krok", "ukonczenie",
czy probka jest reprezentatywna dla wszystkich typow produktow, czy tylko dla klientow
Chameleon - co jest istotnym obciazeniem doboru probki, bo klienci platformy do tourow
to prawdopodobnie firmy SaaS B2B, nie darmowe narzedzia edukacyjne). Traktuje to jako
"material marketingowy z wbudowanym dowodem przeciw wlasnej tezie", nie jako niezalezne
badanie naukowe.

### Zarzut 5: Coach marki i podswietlenia cierpia na "slepote bannerowa"

Zjawisko "banner blindness" (Benway i Lane, 1998, badanie eyetrackingowe: elementy
przypominajace reklame byly zauwazane w ok. 58% przypadkow vs 94% dla elementow
kontrolnych) jest ugruntowane w badaniach UX (nngroup.com/articles/banner-blindness-
original-eyetracking/, nngroup.com/articles/banner-blindness-old-and-new-findings/).
Wspolczesne prace NN/g potwierdzaja, ze zjawisko rozciaga sie na mobile i desktop
i dotyczy tez elementow, ktore formalnie NIE sa reklamami, ale wygladaja jak nachalne
UI (pop-upy, banery promocyjne, prawdopodobnie takze nakladki podswietlajace).

Bezposredni transfer tej tezy na coach marks/spotlight tours jest logiczny, ale NIE
znalazlem badania, ktore mierzy DOKLADNIE to zjawisko (slepote na podswietlenia w
product tour), tylko analogie do reklamowych banerow. To jest wniosek przez analogie,
nie bezposredni dowod.

SILA: umiarkowana. Zjawisko bazowe (banner blindness) jest bardzo dobrze udokumentowane
i niezalezne od branzy onboardingowej. Ale zastosowanie go wprost do coach marks jest
MOIM rozszerzeniem, nie cytowanym wprost w zadnym znalezionym zrodle - odnotowuje to
jako luke, nie jako ustalony fakt.

### Zarzut 6: Uzytkownicy w stresie i pod presja czasu pomijaja tutorial niezaleznie od jego jakosci

Laubheimer (NN/g, ten sam artykul co Zarzut 1) podaje przyklad aplikacji bankowej Chase,
gdzie uzytkownicy pomijali tutorial pod presja czasu, oraz formulule ogolniejsza
obserwacje: po ukonczeniu tutoriala uzytkownicy CZESTO NIE PAMIETAJA pokazanych krokow
w momencie, gdy faktycznie ich potrzebuja (nngroup.com/articles/onboarding-tutorials/).
To jest bezposrednie potwierdzenie jednego z zarzutow zamowionych w briefie: "nikt nie
pamieta tresci tutoriala".

SILA: wysoka autorytetem (NN/g), ale opisowa/jakosciowa - nie ma podanego procentu ani
N dla tego konkretnego zjawiska "zapominania", tylko przyklad i twierdzenie ogolne.

## TROPIENIE LICZB BEZ POKRYCIA (gdzie urywa sie lancuch cytowan)

1. **"3-krokowy tour ma 72% ukonczenia, 4-krokowy 74%, 7-krokowy 16%"** - lancuch
   prowadzi do Chameleon (chameleon.io/blog/product-tour-benchmarks-highlights i
   powiazany PDF z 2019, chameleon.io/assets/chameleon-product-tour-benchmarks-report-
   2019.pdf). Zrodlo jest identyfikowalne (nie urywa sie w pustce), ALE: (a) Chameleon
   to sprzedawca narzedzia do tourow, (b) publicznie dostepny opis nie ujawnia pelnej
   metodologii doboru probki 15 milionow interakcji - nie wiadomo, czy to sa interakcje
   z tourow jednej branzy, jakiej wielkosci firm, czy klienci Chameleon reprezentuja
   szerszy rynek. Liczba jest realna (ma zrodlo), ale NIE jest "niezaleznie zweryfikowanym
   faktem branzowym" - to jest jedno raportowanie jednego dostawcy o swoich wlasnych
   klientach. Nie znalazlem drugiego, niezaleznego zrodla, ktore powtarza te same
   dokladne liczby z wlasna metodologia.

2. **"Srednio 61% uzytkownikow konczy tour"** - ten sam lancuch co powyzej (Chameleon,
   ten sam raport 15 mln interakcji). Ten sam zastrzezenie o konflikcie interesu i braku
   niezaleznej replikacji.

3. **"Tour uruchamiany przez checklist jest o 21% bardziej prawdopodobny do ukonczenia"**
   - to twierdzenie pojawilo sie w wynikach wyszukiwania (Userpilot/Chameleon jako
   agregat), ale NIE udalo mi sie dotrzeć do pierwotnego zrodla z metodologia w ramach
   tej sesji researchu - trafilem tylko na wtorne cytowania w blogach vendorow. Lancuch
   cytowan urywa sie na poziomie "ktos gdzies to napisal" bez mozliwosci zweryfikowania
   pierwotnego pomiaru. NIE uzywac tej liczby jako dowodu w zadna strone bez dalszego
   researchu.

4. **"40-60% nowych uzytkownikow uzywa produktu raz i nigdy nie wraca"** oraz "88%
   uzytkownikow nie wraca po zlym doswiadczeniu" oraz "brak zaangazowania w pierwsze 3
   dni = 90% szans na permanentny churn" - te liczby pojawily sie zbiorczo w wynikach
   wyszukiwania z agregatorow (Helppier, Chameleon, Guideflow, Appcues), bez wskazania
   pierwotnego zrodla badawczego w tresci, ktora otrzymalem. To jest klasyczny przypadek
   "liczby krazacej bez zrodla" opisany w MASTER_PLAN - polecam PEŁNE ODRZUCENIE tych
   trzech liczb w syntezie, dopoki ktos nie znajdzie pierwotnego badania. Sa one zbyt
   okragle i zbyt czesto powielane przez strony sprzedajace narzedzia onboardingowe, by
   traktowac je jako fakt.

5. **"70% uzytkownikow pomija tradycyjne liniowe tours"** - ta liczba pojawila sie w
   podsumowaniu wyszukiwarki jako powiazana z Chameleon 2025 Benchmark Report, ale NIE
   zweryfikowalem jej w zrodle pierwotnym (nie odwiedzilem bezposrednio raportu 2025,
   tylko streszczenie wyszukiwarki). Traktowac jako niepotwierdzone w tej sesji.

## PRZYPADKI USUNIECIA TOURA

Znalazlem TYLKO jeden zestaw udokumentowanych, weryfikowalnych przypadkow: wewnetrzne
GitLab merge requesty i issues (kod open source, publicznie dostepny changelog).

- **GitLab usunal caly frontend "OnBoarding tour"** (gitlab.com/gitlab-org/gitlab/-/
  merge_requests/35442) - ale z opisu wynika, ze funkcja nigdy nie byla wlaczona w
  produkcji (byla za feature flagiem), wiec to NIE jest dowod na "usunieto dzialajacy
  tour po zlych wynikach", tylko sprzatanie martwego kodu.

- **GitLab usunal eksperyment "video_tutorials_continuous_onboarding"**
  (gitlab.com/gitlab-org/gitlab/-/issues/351917) - TU jest realny dowod z metryka:
  wideo mialo "niewielki wplyw na aktywacje zespolu", "niskie zaangazowanie w wideo"
  i "brak wplywu na konwersje platna". Zespol jawnie zdecydowal sie wycofac ten kanal
  onboardingowy z powodu braku efektu biznesowego, zostawiajac furtke do powrotu w
  przyszlosci w innej formie.

- **GitLab usunal frontend onboardingu product analytics** (merge_requests/204202) -
  funkcja byla domyslnie wylaczona flaga, ograniczona wartosc dowodowa jako "usunieto
  cos co dzialalo".

SILA: niska-umiarkowana. To jest jeden zrodlo (jedna firma, publiczny kod), i tylko
JEDEN z trzech przypadkow (wideo-onboarding) ma faktyczne dane uzasadniajace usuniecie
z powodu slabych wynikow, a nie tylko sprzatania nieuzywanego kodu. Nie znalazlem
przypadkow znanych, duzych firm konsumenckich (Slack, Notion, Figma, Duolingo, itp.),
ktore publicznie i z danymi opisalyby usuniecie samouczka i poprawe metryk po jego
usunieciu. To jest wyrazna LUKA w dowodach, nie potwierdzenie zarzutu.

Warto odnotowac przeciwny sygnal: znalezione opisy onboardingu Slacka (appcues.com/blog/
slack-user-onboarding-experience, raw.studio) opisuja Slacka jako przyklad "restrained"
onboardingu opartego na jednej akcji (wyslij pierwsza wiadomosc) i kanalach startowych,
NIE jako przyklad usuniecia tour na rzecz zera pomocy - to jest zamiana formy (empty
state + starter content), nie dowod, ze "brak jakiegokolwiek prowadzenia" wygrywa.

## CZY DLA DARMOWEGO NARZEDZIA EDUKACYJNEGO ARGUMENTY SA SLABSZE

Zadne ze znalezionych zrodel nie bada bezposrednio tej hipotezy (darmowe narzedzie
edukacyjne uzywane z ciekawosci vs platny SaaS pod presja pracy). To jest analiza moja,
oparta na logice cytowanych zrodel, nie na bezposrednim badaniu - odnotowuje to jasno.

Argumenty ZA teza, ze tour jest MNIEJ potrzebny/mniej uzasadniony tutaj niz w platnym B2B
SaaS:

- Caly biznesowy sens product tour w SaaS to **konwersja i utrzymanie platacego klienta**
  (stad Chameleon/Userpilot/Appcues mierza "activation", "paid conversion" - patrz np.
  case GitLab powyzej, gdzie kryterium sukcesu bylo "paid conversion"). Agent Architecture
  nie ma placacych klientow ani presji konwersji - wiec KLUCZOWA metryka uzasadniajaca
  koszt budowy tour w literaturze po prostu nie istnieje w tym projekcie.
- Paradoks aktywnego uzytkownika (Zarzut 3) zaklada, ze presja "zrob cos teraz" jest
  silna, bo user chce wykonac zadanie zawodowe. W narzedziu edukacyjnym uzywanym z
  ciekawosci ta presja jest slabsza lub innego rodzaju (ciekawosc zamiast deadline'u
  pracy) - co teoretycznie MOZE zmniejszac opor przed tourem (uzytkownik ma czas), ale
  rownie dobrze MOZE go zwiekszac (user chce sam odkrywac, eksploracja jest czescia
  motywacji, a narzucony tour psuje ten typ przyjemnosci). Literatura nie rozstrzyga tego
  kierunku - to jest hipoteza otwarta.
- NN/g "Mobile Tutorials" (Zarzut 2) testowalo proste aplikacje mobilne, nie encyklopedie
  z 60 agentami i 62 presetami. Agent Architecture jest obiektywnie bardziej zlozona niz
  aplikacje z tego testu, wiec bezposrednie przeniesienie wniosku "tutorial nie pomaga w
  prostej aplikacji" MOZE nie miec zastosowania - to jest argument PRZECIW mojej wlasnej
  tezie, ktory uczciwie odnotowuje.

Argumenty ZA teza, ze tour jest RACZEJ TAK SAMO nieuzasadniony jak w SaaS (nie slabszy,
nie mocniejszy):

- Paradoks aktywnego uzytkownika (Carroll/Rosson) jest sformulowany jako uniwersalna
  cecha ludzkiego poznania, nie jako cecha kontekstu B2B/pracy. Zrodlo nie ogranicza
  zjawiska do sytuacji zawodowych.
- Zjawisko "banner blindness" i zmeczenie nakladkami rowniez nie jest opisywane jako
  zalezne od modelu biznesowego produktu.

WNIOSEK Z TEJ SEKCJI: nie znalazlem BEZPOSREDNIEGO badania popierajacego teze briefu
("dla darmowego, edukacyjnego narzedzia argumenty za tourem sa slabsze"). Najsilniejszy
dajacy sie obronic wniosek to: **motywacja BIZNESOWA do budowania tour (ROI, konwersja)
faktycznie nie istnieje w tym projekcie, wiec brakuje uzasadnienia "bo tak robia inni,
zeby zarabiac"** - ale to nie jest to samo co dowod, ze UZYTKOWNICY tego konkretnego typu
produktu odrzucaja tour bardziej niz uzytkownicy platnego SaaS. To rozroznienie jest
wazne i nie wolno go zatrzec w syntezie.

## GDZIE ZESPOL MA RACJE (krotko)

- Pomiar stabilnosci kregoslupa (12 kotwic, 9 wersji, zero zniknieć) jest realnym,
  wewnetrznym atutem projektu, ktorego zaden ze znalezionych zewnetrznych zrodel nie
  moze podwazyc - to jest fakt o tej konkretnej aplikacji, nie o branzy.
- Nie znalazlem ZADNEGO zrodla, ktore twierdzi wprost "tour nigdy nie dziala nigdzie".
  Nawet najostrzejsi krytycy (NN/g) mowia "unikac gdy mozliwe" i preferuja pomoc
  kontekstowa, a nie "nigdy nie buduj niczego przewodniczego". Forma "wskazywanie
  palcem" (spotlight bez auto-klikania, dostepny pozniej pod przyciskiem, a nie
  wymuszony) jest bardzo blisko tego, co NN/g faktycznie rekomenduje jako mniejsze zlo
  (pull zamiast push, latwo dostepne pozniej) - wiec kierunek juz przyjety przez zespol
  (dostepny pod przyciskiem, nie tylko na starcie) jest zgodny z krytyka, a nie
  przeciwny jej.
- Nie znalazlem przypadku duzej, znanej firmy, ktora usunela tour i miala z tego
  udokumentowana poprawe - argument "firmy usuwaja tours i im sie poprawia" z briefu
  NIE zostal potwierdzony, tylko czesciowo (jeden eksperyment GitLab z wideo, nie z
  klasycznym spotlight tour).

## CZEGO NIE USTALILEM

- Brak bezposredniego badania porownujacego odrzucenie tour w narzedziach DARMOWYCH
  vs PLATNYCH, lub w narzedziach uzywanych Z WYBORU vs POD PRZYMUSEM PRACY. To jest
  najwazniejsza luka wzgledem pytania zadanego w briefie.
- Nie potwierdzilem niezaleznie liczb "40-60% used once never return", "88% churn po
  zlym doswiadczeniu", "90% churn bez zaangazowania w 3 dni", "21% wiecej ukonczen przy
  checklist" - wszystkie urywaja sie na poziomie wtornych cytowan bez dotarcia do
  pierwotnego zrodla w ramach tej sesji.
- Nie zdobylem tresci artykulu Medium/UX Bootcamp "4 reasons why onboarding tours and
  coach marks don't work" (blokada 403) - tytul sugeruje pasujaca teze, ale nie moglem
  zweryfikowac argumentow ani jakosci zrodla.
- Nie znalazlem publikowanej, systematycznej krytyki metodologii badan Chameleon/
  Userpilot/Appcues/Pendo/WalkMe/Whatfix/Chameleon/Intro.js/Shepherd - szukalem wprost
  i nie trafilem na zaden tekst, ktory rozklada ich metodologie na czesci pierwsze.
  Krytyka, ktora mam, jest posrednia: NN/g dochodzi do przeciwnych wnioskow niz vendorzy,
  ale nie atakuje wprost ICH metodologii.
- Nie znalazlem przypadkow "znanych osob" (named individuals) publicznie krytykujacych
  tours poza formalnymi publikacjami NN/g (Laubheimer, Kendrick) - brak np. wypowiedzi
  znanych projektantow produktu spoza NN/g, ktore bylyby jednoznacznie identyfikowalne
  i zweryfikowane w tej sesji.
- Nie zbadalem specyficznie danych dla aplikacji desktopowych/webowych z duza
  gestoscia informacji (jak Agent Architecture) w odroznieniu od prostych aplikacji
  mobilnych, na ktorych oparte jest kluczowe badanie NN/g (Zarzut 2). To ogranicza
  pewnosc przeniesienia wniosku 1:1.

## ZRODLA (URL + etykieta: czy autor cos sprzedaje)

1. https://www.nngroup.com/articles/onboarding-tutorials/ - Page Laubheimer, NN/g.
   NIE sprzedaje narzedzi do tourow. Niezalezny podmiot badawczy UX.
2. https://www.nngroup.com/articles/mobile-tutorials/ - NN/g. Niezalezny, konkretne
   badanie z N=70.
3. https://www.nngroup.com/videos/onboarding-skip-it-when-possible/ - Alita Kendrick,
   NN/g. Niezalezny.
4. https://www.nngroup.com/articles/paradox-of-the-active-user/ - NN/g, podsumowanie
   teorii Carroll/Rosson. Niezalezny.
5. https://research.cs.vt.edu/ns/cs5724papers/4.mental.mental.carroll.paradox.pdf -
   oryginalna praca akademicka Carroll i Rosson. Niezalezna, akademicka.
6. https://www.semanticscholar.org/paper/Paradox-of-the-active-user-Carroll-Rosson/
   f560d34c1266abdea5a6fd2ddc11961995acf1a3 - indeks akademicki tej samej pracy.
7. https://www.nngroup.com/articles/banner-blindness-original-eyetracking/ - NN/g,
   podsumowanie badania Benway i Lane 1998. Niezalezny.
8. https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/ - NN/g,
   aktualizacja. Niezalezny.
9. https://www.chameleon.io/blog/product-tour-benchmarks-highlights - Chameleon.
   SPRZEDAJE oprogramowanie do product tours. Dane uzyte tu dzialaja PRZECIW ich wlasnej
   tezie sprzedazowej (statement against interest), ale metodologia nieaudytowana
   publicznie.
10. https://www.chameleon.io/assets/chameleon-product-tour-benchmarks-report-2019.pdf -
    Chameleon, pierwotny raport 2019. SPRZEDAJE narzedzie do tourow. Ten sam zastrzezenie.
11. https://gitlab.com/gitlab-org/gitlab/-/merge_requests/35442/pipelines - GitLab,
    publiczny kod open source. Niezalezny od branzy onboardingowej, ale ograniczona
    wartosc dowodowa (martwy kod za feature flagiem).
12. https://gitlab.com/gitlab-org/gitlab/-/issues/351917 - GitLab, publiczny issue z
    danymi o eksperymencie wideo. Niezalezny, z konkretnymi (choc jakosciowymi,
    nie liczbowymi) metrykami.
13. https://gitlab.com/gitlab-org/gitlab/-/merge_requests/204202 - GitLab, sprzatanie
    kodu. Ograniczona wartosc dowodowa.
14. https://www.appcues.com/blog/slack-user-onboarding-experience - Appcues. SPRZEDAJE
    narzedzie onboardingowe. Uzyte tylko jako opis case study Slacka (opisowe, nie
    liczbowe), traktowane z ostroznoscia.
15. https://raw.studio/blog/how-slack-uses-4-onboarding-ux-tactics-to-drive-activation-
    and-conversion/ - agencja projektowa, poazywna referencja do case study Slacka bez
    bezposredniego zwiazku sprzedazowego z tour software, ale to material marketingowy
    agencji, nie badanie.
16. https://bootcamp.uxdesign.cc/4-reasons-why-onboarding-tours-and-coach-marks-dont-
    work-b0693e8e83f8 (przekierowuje na medium.com/design-bootcamp/...) - TRESC
    NIEZWERYFIKOWANA (blad 403 przy probie odczytu). Tytul cytowany wylacznie z wynikow
    wyszukiwania, NIE uzyty jako zrodlo zadnego twierdzenia liczbowego w tym raporcie.
17. https://userpilot.com/blog/product-tour-examples/ - Userpilot. SPRZEDAJE narzedzie
    onboardingowe. Uzyte wylacznie do zidentyfikowania istnienia liczby "21% checklist"
    jako NIEPOTWIERDZONEJ w pierwotnym zrodle - nie jako dowod.
18. https://www.chameleon.io/blog/user-onboarding-best-practices - Chameleon. SPRZEDAJE
    narzedzie. Zrodlo posrednie dla liczb churnu (40-60%, 88%, 90%) - NIEPOTWIERDZONE,
    wymienione w sekcji "liczby bez pokrycia".

## KRYTYCZNA UWAGA METODOLOGICZNA DO SYNTEZY

Ten raport nie znalazl zadnego dowodu, ze samouczek jest KATASTROFALNYM bledem dla tego
konkretnego projektu. Znalazl silny, powtarzajacy sie w niezaleznym zrodle (NN/g, kilka
osobnych publikacji na przestrzeni lat) sygnal, ze: (a) klasyczny liniowy, wymuszony
push-tour ma slaby zwrot nawet w danych publikowanych przez jego wlasnych sprzedawcow,
(b) subiektywny koszt psychologiczny tutoriala jest mierzalny i negatywny nawet gdy
skutecznosc zadania nie spada, (c) opor uzytkownikow przed nauka zamiast dzialania jest
zjawiskiem fundamentalnym, nie kosmetycznym problemem do naprawienia lepszym UX tour.
Rownoczesnie sama krytyka (NN/g) NIE mowi "nigdy nie buduj przewodnika" - mowi "buduj
kontekstowo, krotko, latwo dostepny i latwo pomijalny", co jest bardzo blisko formy,
ktora zespol juz rozwaza (przycisk pozniej, forma "wskazywanie palcem"). Najwiekszym
ryzykiem zidentyfikowanym tutaj nie jest "czy budowac", tylko: DLUGOSC (12 kotwic wobec
danych o zalamaniu kompletacji po 4-7 krokach) oraz FORMA WYMUSZONA na starcie bez opcji
odrzucenia z pierwszego ekranu.
