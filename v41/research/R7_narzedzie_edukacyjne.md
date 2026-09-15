# R7 - Onboarding narzedzia, ktore samo jest materialem do nauki

Kontekst: aplikacja to jednoczesnie NARZEDZIE (konfigurator zespolow agentow, canvas,
symulacja, wycena) i MATERIAL DO NAUKI (encyklopedia 60 agentow, 62 presetow, tryb
Hooki z dwuetapowa lekcja, tryb Wzorce z katalogiem 10 wzorcow). Pytanie: jak wprowadzac
do czegos takiego, skoro wiekszosc literatury onboardingowej zaklada zwykly SaaS z jednym
"aha moment" i jedna sciezka do wartosci.

Przeczytano przed napisaniem tego raportu: `v39/research/R2_interaktywne_wyjasnienia.md`
(progresywne odslanianie, WCAG dla animowanych wyjasnien) oraz
`v39/research/R5_co_pomoglo_zrozumiec.md` (Diataxis, metafory). Ten raport tego nie
powtarza - skupia sie wylacznie na FORMIE wprowadzenia do narzedzia o duzej gestosci
funkcji, ktore jest jednoczesnie material edukacyjnym.

## TL;DR (5-8 punktow z sila dowodu)

1. Dla narzedzi o duzej gestosci funkcji (IDE, DAW, edytory 3D, edytory grafiki)
   dominujacy, powtarzalny wzorzec to NIE jeden tour, tylko: **krotka orientacja
   strukturalna (gdzie co jest) + nauka przez konkretne, male zadanie wykonywane od razu
   w prawdziwym interfejsie**. Sila dowodu: srednia - to obserwacja z wielu niezaleznych
   produktow (Blender, Unity, JetBrains, Figma), nie jedno badanie kontrolowane.
2. Klasyczny "product tour" (sekwencja podswietlen bez zadania) ma udokumentowany
   problem z zapamietywaniem i transferem do dzialania. Zrodlo: Nielsen Norman Group,
   `nngroup.com/articles/onboarding-tutorials/` - "tutorials interrupt users, don't
   necessarily improve task performance, and are quickly forgotten". Sila dowodu: wysoka
   dla ogolnej tezy (NN/g, niezalezna firma badawcza UX, nie sprzedaje software'u do
   tourow), ale artykul nie testuje explicite narzedzi edukacyjno-eksploracyjnych typu
   nasz - to ekstrapolacja.
3. Pedagogika ma od dawna nazwane narzedzie dokladnie na nasz przypadek: **advance
   organizer** (Ausubel) - poprzedzic naukę szczegolow ramowka pokazujaca, jak elementy
   calosci sie do siebie odnosza, PRZED wejsciem w detale. Sila dowodu: wysoka dla samej
   koncepcji (klasyczna teoria pedagogiczna, cytowana od dekad), ale nie ma bezposredniego
   testu tej teorii na interfejsach software'owych w znalezionych zrodlach - transfer
   z edukacji formalnej do UI jest wnioskiem, nie cytatem.
4. Spatial memory (pamiec przestrzenna) uzytkownikow interfejsu buduje sie przez
   powtarzalna interakcje ze STABILNYM ukladem, w odniesieniu do granic i "landmarkow",
   i jest z natury przyblizona (poziom "okolicy", nie dokladnego pola). Zrodlo: NN/g,
   `nngroup.com/articles/spatial-memory/`. Sila dowodu: srednia-wysoka (NN/g cytuje
   dawniejsze badania HCI typu Scarr/Cockburn, ale nie podano konkretnej liczby powtorzen
   ani czasu zaniku pamieci po przerwie - to jest luka, patrz sekcja "czego nie ustalilem").
5. Dlugosc ma mierzalny, silny efekt na ukonczenie tourow: 1-2 kroki ~73% ukonczenia,
   3-5 krokow ~38%, 6-8 krokow ~25%, 9+ krokow ~8% (dane Chameleon, firma sprzedajaca
   software do tourow - **konflikt interesow**, patrz osobna sekcja). Kierunek efektu
   (krocej = wiecej ukonczen) jest spojny z NN/g i ogolna wiedza o dropoff, ale
   konkretne procenty pochodza z jednego zrodla komercyjnego i nie sa niezaleznie
   zweryfikowane. Sila dowodu: niska-srednia (jedno zrodlo z konfliktem interesow,
   ale kierunek zgodny z niezaleznym zrodlem).
6. Tour uruchamiany automatycznie ma wg tego samego zrodla drastycznie nizsza
   skutecznosc niz tour otwierany przez uzytkownika (mediana 23% vs 69% ukonczenia).
   Sila dowodu: niska-srednia, jedno zrodlo komercyjne (Chameleon), ale kierunek
   spojny z zasada "paradoxu aktywnego uzytkownika" opisana przez NN/g niezaleznie.
7. Powracajacy uzytkownik po przerwie potrzebuje DOSTEPU do przypomnienia, nie
   powtorki od zera - konkretny, nazwany przyklad: Edge-Drop udostepnia replay
   tutoriala z zakladki, wlasnie na wypadek powrotu po miesiacach. Sila dowodu: niska
   (jeden case study/blog produktu, nie badanie), ale mechanizm ("replay na zadanie" +
   wyzwalacz "pierwszy powrot po przerwie") pojawia sie tez w ogolnych poradnikach UX
   Collective/Toptal niezaleznie od siebie, wiec sam WZORZEC ma wiecej niz jedno zrodlo,
   choc zadne nie jest badaniem naukowym.
8. Encyklopedie i wiki NIE rozwiazuja problemu "gdzie co jest" jednym tourem -
   uzywaja trwalych STRUKTUR NAWIGACYJNYCH (portale, kategorie, spis tresci
   obecny zawsze) zamiast jednorazowego wprowadzenia. Zrodlo: Wikipedia
   `en.wikipedia.org/wiki/Help:Navigation`, `en.wikipedia.org/wiki/Web_navigation`.
   Sila dowodu: srednia - to opis praktyki najwiekszej encyklopedii swiata, nie
   badanie porownawcze, ale jest to bezposrednio analogiczny przypadek (tresc-jako-narzedzie).

## PRZYKLADY Z NAZWY (co robi konkretny produkt i czego nas to uczy)

### Blender - tutorial "donut" (Blender Guru / Andrew Price)
Zamiast tour po menu, Blender Guru stworzyl 14-czesciowy tutorial na YouTube,
w ktorym uzytkownik robi jedno konkretne, kompletne zadanie (model pączka) i PRZY OKAZJI
poznaje interfejs, skroty i logike programu. Punkt wyjscia to zasada 80/20: nauczyc
20% funkcji uzywanych w 80% przypadkow, zeby zmniejszyc czynnik onieśmielenia.
Zrodlo: `blenderguru.com/posts/blender-donut-v5-tutorial`, `premiumbeat.com/blog/creating-the-donut-in-blender`,
`fatpencilstudio.com/blog/the-infamous-blender-donut`.
Czego uczy nas to: dla narzedzia o ogromnej liczbie paneli i trybow (Blender ma
ich prawdopodobnie wiecej niz nasza aplikacja) spolecznosc uzytkownikow sama
wyselekcjonowala format "jedno male, kompletne zadanie jako wehikul do nauki calosci",
NIE format "tour po zakladkach". To nie jest oficjalny onboarding producenta -
to organiczny konsensus spolecznosci przez lata, co samo w sobie jest sygnalem.
Ograniczenie: to nie jest badanie, to praktyka. Nie wiadomo, ile osob porzucilo
tutorial w polowie ani jak wyglada retencja wzgledem alternatyw, bo nikt tego
publicznie nie zmierzyl.

### JetBrains - "IDE Features Trainer" / Onboarding Tours (PyCharm, GoLand)
JetBrains oferuje Onboarding Tours dostepne z ekranu powitalnego LUB z okna
"Learn" (Help | IDE Features Trainer) - wiec jest to jednoczesnie (a) auto-invite
przy pierwszym starcie i (b) trwale dostepny punkt powrotu. Tour ma uczyc tworzenia
aplikacji i najpopularniejszych skrotow w mniej niz 10 minut.
Zrodlo: `blog.jetbrains.com/idea/2021/08/what-s-new-in-the-ide-features-trainer/`.
Rownolegle jednak, ten sam blog JetBrains przyznaje, ze "in-IDE tips and onboarding
tour weren't always enough" przy zmianie domyslnego UI - a inne narzedzie do odkrywania,
IntelliJ Platform Explorer, jest uzywane czesto tylko przez 15% deweloperow, 59% uzywa
go rzadko lub nigdy. Zrodlo: `blog.jetbrains.com/idea/2024/10/bridging-the-gap-between-the-classic-and-new-uis/`.
Czego uczy nas to: nawet dojrzala firma z profesjonalnym zespolem UX ma tour ktory
NIE wystarcza sam - i ma osobne narzedzie do discoverability, ktorego wiekszosc
ludzi i tak nie uzywa. To sugeruje, ze jeden mechanizm (jeden tour) nigdy nie
wystarczy w narzedziu o duzej gestosci - potrzeba wielu punktow wejscia rownoczesnie
(tour + trwale miejsce z lekcjami + wskazniki kontekstowe).

### Unity Editor - "Get Started with Unity"
Oficjalny tutorial to "brief guided tour of Unity, ending in the creation of your
first 3D scene, all from within the Unity Editor itself" - czyli tour KONCZY SIE
konkretnym artefaktem (scena 3D), nie samym zwiedzaniem paneli.
Zrodlo: `learn.unity.com/tutorial` (opis na `learn.unity.com/`).
Czego uczy nas to: wzorzec "orientacja + wynik" - sama wycieczka po interfejsie
nie jest celem samym w sobie, tylko srodkiem do zrobienia pierwszej, prawdziwej
rzeczy. To pasuje do naszego "kregoslupa", jesli kregoslup konczyloby sie np.
zbudowaniem pierwszego mini-zespolu na canvasie, a nie samym pokazaniem gdzie
jest canvas.

### Unreal Engine - rozdzielenie "Editor Interface" od "sciezek uczenia sie"
Dokumentacja Unreal NAJPIERW uczy nawigacji w edytorze (osobna sekcja "Editor
Interface"), a DOPIERO POTEM rozdziela uzytkownikow na sciezki tematyczne
(Programmer / Designer / Artist). Zrodlo: `dev.epicgames.com/documentation/unreal-engine/unreal-engine-for-new-users`.
Czego uczy nas to: dwuetapowosc - najpierw WSPOLNA mapa calosci (bo interfejs
jest jeden dla wszystkich), potem ROZGALEZIONE sciezki zaleznie od tego, po co
ktos przyszedl. To jest bezposrednio analogiczne do naszej aplikacji: mapa
kregoslupa wspolna dla wszystkich, ale "co robic dalej" moze sie rozgalezic
(chce sie uczyc agentow vs chce zbudowac zespol vs chce policzyc koszt).

### Figma - dwuetapowy onboarding: "getting started" + "learning by doing"
Figma dzieli onboarding na dwie fazy: pierwsza to podstawowe wprowadzenie
(krok po kroku, tooltipy z animacja pokazujaca dzialanie funkcji), druga to
"learning by doing" przez gotowe tutoriale i szablony do praktykowania.
Zrodlo: `goodux.appcues.com/blog/figmas-animated-onboarding-flow` (Appcues - **firma
sprzedajaca software do onboardingu, konflikt interesow, opis produktu innej firmy
ale przez pryzmat sprzedawcy kategorii**), potwierdzone niezaleznie ogolnym opisem
architektury interfejsu (Main Menu, Layers Panel, Design Panel) w
`nobledesktop.com/learn/figma/exploring-figmas-user-interface-navigating-menus-and-panels`
(szkola, mniejszy konflikt interesow - sprzedaje kursy, nie software onboardingowy).
Czego uczy nas to: dwuetapowosc "orientacja -> potem praktyka na prawdziwym materiale"
powtarza sie jako wzorzec niezaleznie od branzy (design tool, IDE, DAW poprzez
donut tutorial).

### Ableton Live vs Logic Pro - koszt wlasnej, nietypowej metafory interfejsu
Logic Pro "follows standard conventions - menus, toolbars, timeline" i pozwala
zaczac nagrywac "within minutes", bo buduje na doswiadczeniu z GarageBand.
Ableton Live ma Session View, ktora jest "unlike anything else in the DAW world" -
"steeper initial learning curve", ale po zrozumieniu workflow staje sie bardzo
szybki. Ankieta Produce Like A Pro (2024): Logic - srednio 6.3 tygodnia do poczucia
komfortu, Ableton - 4.1 tygodnia (uwaga: to zaskakujaco odwrotny wynik do opisu
"Ableton ma stromsza krzywa" w tym samym zestawie zrodel - **zrodla sa ze soba
sprzeczne, prawdopodobnie mierzyly rozne rzeczy albo populacje; traktowac jako
niepewne dane drugorzedne**, nie oryginalne badanie).
Zrodlo: `musosoup.com/blog/easiest-daw-to-use`, `melodics.com/blog/logic-vs-ableton`.
Czego uczy nas to: narzedzie z WLASNA, nietypowa metafora (u nas: canvas + symulacja +
tryb Hooki + tryb Wzorce to WSZYSTKIE nietypowe metafory, nie standardowe menu) placi
"podatek od nowosci" niezaleznie od jakosci wykonania - onboarding musi to explicite
adresowac, tlumaczac metafore, a nie tylko wskazywac przyciski.

### Learn X in Y minutes / Try X in Y minutes
Format "Learn X in Y minutes" to spolecznosciowy projekt pokazujacy jezyk
programowania jako pojedynczy, skomentowany plik kodu do przeczytania od gory
do dolu - "whirlwind tour" jezyka jako WALIDNEGO, komentowanego kodu.
"Try X in Y minutes" (`antonz.org/try-x-in-y-minutes/`) to interaktywna wersja,
gdzie kod mozna uruchomic i zmodyfikowac w przegladarce - bezposrednia odpowiedz
na ograniczenie oryginalu (brak mozliwosci sprawdzenia w praktyce).
Zrodlo: `learnxinyminutes.com/`, `antonz.org/try-x-in-y-minutes/`.
Czego uczy nas to: dla materialu, ktory jest ENCYKLOPEDIA (jak nasza), dziala
format "cala mapa w jednym przewijalnym widoku z adnotacjami", NIE sekwencyjny
tour krok-po-kroku z modalami. Uzytkownik moze przejrzec caly ksztalt materialu
w jednym cwiczeniu skanowania wzrokiem, zamiast klikac "dalej" przez dziesiatki
ekranow. To silny kontr-argument dla formatu "sekwencyjny tour" w naszym
przypadku, bo nasza aplikacja jest bardziej materialem-do-przegladania niz
zadaniem-do-wykonania.

### Duolingo - drzewo umiejetnosci (skill tree) jako mapa
Duolingo pokazuje caly program nauki jako "tree" - wszystkie umiejetnosci widoczne
naraz, z jasnym oznaczeniem postepu, zamiast ukrywac kolejne etapy. Uzytkownik
przed startem wybiera poziom doswiadczenia (od zera vs test poziomujacy).
Zrodlo: `cruxcollaborative.com/insights/ongoing-onboarding-how-duolingo-introduces-new-skills`,
`goodux.appcues.com/blog/duolingo-user-onboarding` (Appcues - **konflikt interesow**).
Czego uczy nas to: mapa-jako-caly-widok (nie tour) jest dominujacym wzorcem
w NAJWIEKSZEJ platformie edukacyjnej na swiecie dla materialu podzielonego na
jednostki. To wspiera hipotezy "mapa" dla naszego przypadku, bo Duolingo ma
dokladnie nasz problem: duzo modulow, user wraca po przerwie, trzeba pokazac
gdzie jest w calosci.

### Adobe Photoshop - panel "Discover"
Zamiast lub obok tradycyjnego tour, Photoshop ma trwaly panel "Discover" -
wyszukiwarke + rekomendacje kontekstowe + "quick actions" (jedno klikniecie do
efektu bez zrozumienia calego workflow), dostepny w kazdej chwili, nie tylko
przy pierwszym uruchomieniu. Zrodlo: `helpx.adobe.com/photoshop/desktop/get-started/learn-the-basics/access-discover-panel.html`,
`www.bwillcreative.com/understanding-the-photoshop-interface/`.
Czego uczy nas to: dla narzedzia z 30-letnia historia funkcji, punktowy tour
przy starcie jest niewystarczajacy - Adobe zainwestowala w TRWALY mechanizm
discovery zamiast (nie oprocz) tradycyjnego onboardingu liniowego.

### Wikipedia - portale i stale struktury nawigacyjne
Wikipedia nie ma "tour" dla nowego czytelnika. Ma za to portale tematyczne
(punkty wejscia do szerokich dziedzin), stale menu boczne z kategoriami i toolbox
obecny na kazdej stronie. Nawigacja "powinna odzwierciedlac pytania z realnego
swiata", tytuly stron proste, linki prowadza do "nastepnego prawdopodobnego kroku".
Zrodlo: `en.wikipedia.org/wiki/Help:Navigation`, `en.wikipedia.org/wiki/Web_navigation`.
Czego uczy nas to: najwieksza "encyklopedia jako narzedzie" na swiecie nie
rozwiazuje problemu wejscia jednorazowym tourem, tylko TRWALA, zawsze-widoczna
strukturalna nawigacja. To jest mocny argument za tym, ze "kregoslup" powinien
zostawic po sobie trwaly slad (np. przycisk powrotu, widoczna mapa), a nie
zniknac calkowicie po jednorazowym przejsciu.

## USTALENIA

### Tour vs kontekstowa pomoc - napiecie widoczne w literaturze
Nielsen Norman Group formuluje mocna, ogolna teze przeciw tourom: przerywaja
uzytkownikowi, nie poprawiaja wynikow zadania, sa szybko zapominane, bo
"informacja podana poza kontekstem jest trudna do przypomnienia, kiedy user
jej faktycznie potrzebuje" (paradoks aktywnego uzytkownika). Jedyny uznany przez
NN/g wyjatek: onboarding do "nowego paradygmatu interakcji", jak AR.
Zrodlo: `nngroup.com/articles/onboarding-tutorials/`.

To rodzi pytanie kluczowe dla naszego projektu: czy nasza aplikacja jest bardziej
podobna do "zwyklego SaaS z jednym paradygmatem" (gdzie tour jest zbedny, potrzebna
kontekstowa pomoc), czy do "nowego paradygmatu interakcji" (canvas + symulacja +
Hooki + Wzorce to NIE sa standardowe wzorce UI, to wlasnie nowy paradygmat), gdzie
NN/g explicite dopuszcza tour jako uzasadniony wyjatek. Odpowiedz nie jest oczywista
i zrodlo tego wprost nie rozstrzyga dla naszego konkretnego przypadku - to jest
interpretacja, nie cytat.

### Advance organizer - najsilniejszy teoretyczny fundament dla "mapy"
Teoria Ausubela (subsumption theory, advance organizers) mowi wprost: przy
uczeniu zlozonych systemow skuteczna kolejnosc to (1) ramowka pokazujaca cel calosci
i jak podsystemy sie ze soba wiaza, (2) nauka poszczegolnych czesci, (3) nauka
interakcji miedzy nimi. Cytat z artykulu opisowego: "the single most important
factor influencing learning is what the learner already knows - and teaching
should proceed accordingly". Zrodlo: `instructionaldesign.org/theories/subsumption-theory/`,
`edukatesg.com/2026/09/12/how-advance-organizers-work-give-new-knowledge-somewhere-to-attach/`.
To jest teoria pedagogiczna z dekadami cytowan w edukacji formalnej, NIE badanie
na interfejsach software'owych - most miedzy tymi dwoma swiatami nie zostal
znaleziony jako bezposrednie badanie empiryczne w tym zapytaniu. Ale koncepcyjnie
pasuje niemal idealnie do decyzji "kregoslup pokazujacy gdzie co jest, PRZED
uczeniem szczegolow kazdego trybu" - to jest dokladnie definicja advance organizera.

### Spatial memory - dlaczego uklad musi byc stabilny, ale tez dlaczego mapa musi wrocic
NN/g: pamiec przestrzenna buduje sie przez powtarzalna interakcje ze stabilnym
ukladem, w odniesieniu do granic i landmarkow, i jest z natury przyblizona -
uzytkownik pamieta "okolice", nie dokladne miejsce, dopoki dany element nie jest
uzywany bardzo czesto. Zrodlo: `nngroup.com/articles/spatial-memory/`.
Aplikacja mierzyla stabilnosc kotwic (ID elementow) przez 9 wersji (v32-v40) -
to jest mocny fundament TECHNICZNY pod budowanie pamieci przestrzennej, bo elementy
faktycznie nie migrują. Natomiast zrodlo NIE podaje konkretnej liczby dni/tygodni
przerwy, po ktorej pamiec przestrzenna zanika - to zostaje nieustalone (patrz
sekcja ponizej). Wynika z tego posrednio: skoro pamiec jest z definicji "przyblizona"
i oparta na landmarkach, samouczek powinien uczyc LANDMARKOW (glowne strefy: gdzie
agenci, gdzie presety, gdzie canvas), a nie dokladnych pozycji pikselowych przyciskow -
to jest zgodne z filozofia "kregoslupa" z MASTER_PLAN (12 kotwic-landmarkow).

### Powrot po przerwie - wzorzec "replay na zadanie" + wyzwalacz "pierwszy powrot"
Dwa niezalezne od siebie zrodla ogolnego poradnictwa UX (nie to samo zrodlo,
ale oba nie sprzedaja bezposrednio software'u tour) opisuja ten sam wzorzec:
dac uzytkownikowi TRWALY dostep do powtorki onboardingu z poziomu nawigacji/pomocy,
i/lub uruchamiac go NIE w oparciu o czas, tylko w oparciu o zdarzenie "pierwszy
powrot po dluzszej przerwie" - a nie np. co tydzien. Case study Edge-Drop pokazuje
konkretna implementacje: replay tutoriala dostepny w kazdej chwili z zakladki
"Behaviour", z uzasadnieniem, ze user po miesiacach zapomina detale (np. czy gest
to click-to-paste czy drag), a dwuminutowy replay jest szybszy niz zgadywanie.
Zrodlo: `www.edgedrop.app/blog/onboarding-tutorial-what-it-covers-and-how-to-replay`,
`uxdesign.cc/menu-of-ux-onboarding-patterns-and-when-to-use-them` (autorka Eve
Weinberg, UX Collective - blog spolecznosciowy, nie firma sprzedajaca tour software,
mniejszy konflikt interesow niz Appcues/Chameleon/Userpilot).

### Encyklopedie i notebooki - caly ksztalt widoczny naraz, nie odslaniany etapami
Trzy niezalezne przyklady (Wikipedia, Learn X in Y minutes, architektura panelu
Figma opisana przez szkole a nie sprzedawce onboardingu) pokazuja ten sam wzorzec
dla tresci-jako-produktu: caly ksztalt materialu (spis tresci, drzewo, jeden
przewijalny plik z adnotacjami) jest widoczny od razu, a uzytkownik sam decyduje,
gdzie wejsc glebiej. Zaden z tych trzech nie uzywa formatu "modal-krok-1-z-N z
przyciskiem dalej" jako GLOWNEGO mechanizmu orientacji.

### Dlugosc i sposob startu tourow - dane z jednego zrodla komercyjnego, kierunek spojny z niezaleznymi zrodlami
Chameleon (sprzedaje software do product tours - **konflikt interesow**) podaje
konkretne liczby: ukonczenie spada z ~73% (1-2 kroki) do ~8% (9+ krokow), a tour
startujacy automatycznie konczy sie medianem 23% ukonczenia vs 69% dla tour
otwieranego przez uzytkownika. Zrodlo: `chameleon.io/blog/product-tour-benchmarks-highlights`,
`chameleon.io/assets/chameleon-product-tour-benchmarks-report-2019.pdf`.
Kierunek obu efektow (krocej = lepiej, dobrowolnie = lepiej) jest logicznie spojny
z niezaleznym od Chameleon zrodlem NN/g (paradoks aktywnego uzytkownika, dismissal
friction), wiec KIERUNEK traktuje sie jako wsparty przez 2 niezalezne zrodla o
roznym charakterze (jedno komercyjne z duza proba, jedno badawcze bez konkretnych
liczb). Same LICZBY (73%, 23%, 69%) pochodza z jednego zrodla i nie sa
zweryfikowane niezaleznie - nie nalezy ich cytowac Maciejowi jako "potwierdzonych
liczb", tylko jako "kierunek efektu z jednego duzego, ale interesownego zbioru danych".

## MAPA CZY ZADANIE - rozstrzygniecie dla naszego przypadku

Pytanie z briefu: czy wlasciwym celem onboardingu jest "gdzie co jest" (mapa),
czy "zrob pierwsza rzecz" (zadanie).

Rozstrzygniecie na podstawie zebranego materialu: **to nie jest wybor typu
albo-albo, ale KOLEJNOSC dwoch rzeczy, i wiekszosc znalezionych przykladow
robi mape PIERWSZA, zadanie DRUGIE** - z jednym waznym zastrzezeniem ponizej.

Dowody za taka kolejnoscia:
- Unreal Engine: najpierw "Editor Interface" (wspolna mapa), potem rozgalezione
  sciezki tematyczne (zadania). Jedno zrodlo, opis oficjalnej dokumentacji.
- Figma: faza 1 "getting started" (orientacja), faza 2 "learning by doing"
  (zadanie). Jedno zrodlo z konfliktem interesow (Appcues opisuje produkt Figmy),
  wsparte niezaleznie ogolnym opisem architektury interfejsu Figmy.
- Ausubel / advance organizer: teoretyczne uzasadnienie, ze rama POPRZEDZA detale
  przy zlozonych systemach. Zrodlo pedagogiczne, nie z domeny software'u.
- Wikipedia, Learn X in Y minutes: caly ksztalt materialu widoczny naraz (odmiana
  "mapy") jako dominujacy format dla TRESCI-jako-produktu, a nasza aplikacja
  jest w czesci wlasnie tym.

Dowod za "zadaniem jako punktem WYJSCIA zamiast mapy":
- Blender donut i Unity "Get Started" NIE zaczynaja od tour po menu - zaczynaja
  od razu od robienia czegos, a mapa interfejsu wylania sie PRZY OKAZJI zadania.
  To jest wazna alternatywa i nie da sie jej zignorowac: dwa bardzo popularne,
  niezalezne od siebie przyklady robia dokladnie odwrotna kolejnosc niz Unreal/Figma.

Wniosek dla Macieja: **istnieja dwa konkurencyjne wzorce z realnymi, nazwanymi
przykladami po obu stronach, i zaden nie ma przewagi w postaci kontrolowanego
badania porownawczego.** Rozstrzygajacy argument w KIERUNKU mapy dla NASZEGO
konkretnego przypadku jest inny niz "co jest ogolnie lepsze": nasza aplikacja
NIE MA jednego naturalnego "pierwszego zadania" analogicznego do "zrob scene 3D"
albo "zrob pączka" - MASTER_PLAN wymienia dwanascie roznych kotwic (jezyk, agenci,
presety, zapisane, canvas, koszt, symulacja, encyklopedia, motyw, skroty), z ktorych
zadna nie jest oczywistym "pierwszym zadaniem" dla wszystkich typow uzytkownikow
(kogos, kto przyszedl sie uczyc o agentach, vs kogos, kto chce zbudowac zespol).
W Blenderze i Unity ISTNIEJE jedno naturalne pierwsze zadanie (zrob model, zrob
scene), bo to sa narzedzia produkcyjne z jednym glownym trybem pracy. Nasza
aplikacja ma WIELE roznorodnych trybow bez jednego dominujacego - to bardziej
przypomina sytuacje Unreal Engine (Programmer/Designer/Artist - rozne cele tej
samej publicznosci) niz sytuacje Blendera (jeden typ pracy: modelowanie 3D).

**Rekomendacja z ta sila dowodu: srednia.** Mapa jako PIERWSZY krok (kregoslup
pokazujacy dwanascie kotwic), z mozliwoscia, ze KAZDA kotwica na koncu swojej
prezentacji oferuje mikro-zadanie ("kliknij tutaj i zobacz X") zamiast czystego
podswietlenia bez interakcji - to hybryda, nie czysty wybor jednej ze szkol.
Brak znalezionego badania testujacego dokladnie ten hybrydowy format na
narzedziu-encyklopedii, wiec to jest wniosek zlozony z czesci, nie cytat calosci.

## MATERIAL MARKETINGOWY

Zrodla ponizej pochodza od firm sprzedajacych oprogramowanie do onboardingu/tourow
lub blogow zbudowanych wokol promocji takich narzedzi. Traktowac jako hipotezy
i punkty odniesienia liczbowego, NIE jako potwierdzone fakty naukowe:

- Chameleon (`chameleon.io`) - sprzedaje product tour software. Zrodlo liczb:
  73%/38%/25%/8% ukonczenia wg dlugosci tour, 23%/69% ukonczenia wg trybu startu
  (auto vs user-initiated), "user attention drops off sharply after 4 steps",
  "tours triggered by checklists are 21% more likely to be completed".
- UserIQ (cytowane w wynikach wyszukiwania jako zrodlo "skippable flows +25%
  completion") - sprzedaje platforme onboardingowa. Nie zweryfikowano zrodla
  pierwotnego bezposrednio (dotarto tylko przez cytat w agregujacym artykule
  trzeciej strony), wiec ta liczba ma NIZSZA wiarygodnosc niz nawet dane Chameleon.
- Product-Led Institute / cytowany "2024 study" o 34% wyzszym churn po
  porzuceniu tour - dotarto do tego wylacznie przez cytat w agregujacym artykule,
  nie znaleziono zrodla pierwotnego do weryfikacji metodologii. Traktowac jako
  niepotwierdzone.
- Appcues (`goodux.appcues.com`, `appcues.com`) - sprzedaje onboarding software.
  Uzyty tu tylko jako OPISOWE zrodlo tego, co robi Figma i Duolingo (fakty o
  cudzym produkcie), nie jako zrodlo tez normatywnych "co dziala". Tam gdzie
  Appcues formuluje wlasna teze normatywna ("to jest najlepsza praktyka"),
  pominieto to w sekcji USTALENIA.
- Userpilot, UserGuiding, WalkMe, Whatfix, Intro.js/Shepherd (biblioteki open-source,
  ale z modelem biznesowym wokol tourow), StepsKit, Guideflow, usertourkit,
  getmonetizely, produktly, saasfactor, onboarding-hub - wszystkie pojawily sie
  w wynikach wyszukiwania jako zrodla "statystyk onboardingu", zaden nie zostal
  uzyty jako dowod w sekcji USTALENIA powyzej, zgodnie z zasada projektu.

## CZEGO NIE USTALILEM

1. Nie znaleziono zadnego kontrolowanego badania porownujacego wprost "tour
   sekwencyjny" vs "mapa/przeglad calosci" vs "zadanie-jako-nauka" NA NARZEDZIU
   ktore jest jednoczesnie encyklopedia i konfiguratorem. Wszystkie wnioski w tym
   raporcie sa transferem z analogicznych, ale nie identycznych domen (IDE, DAW,
   edytory 3D, platformy edukacyjne, encyklopedie).
2. Nie ustalono konkretnej liczby dni/tygodni przerwy w uzyciu, po ktorej
   pamiec przestrzenna uzytkownika ukladu interfejsu istotnie zanika. NN/g
   opisuje MECHANIZM (przyblizona pamiec oparta na landmarkach), ale nie podaje
   krzywej zapominania w czasie dla interfejsow software'owych.
3. Nie znaleziono zadnego zrodla ktore explicite testuje advance organizer
   (teoria Ausubela) na interfejsie oprogramowania - to pozostaje wnioskiem
   z analogii pedagogicznej, nie cytatem z badania HCI.
4. Sprzeczne dane o krzywej uczenia Ableton vs Logic Pro (Ableton opisywany
   jednoczesnie jako "stromsza krzywa" i jako "krotszy czas do komfortu" w tym
   samym zestawie zrodel) - nie rozstrzygnieto tej sprzecznosci, prawdopodobnie
   rozne metodologie/populacje ankietowe, zrodlo ankiety (Produce Like A Pro)
   nie zostalo zweryfikowane bezposrednio.
5. Nie znaleziono zadnych danych o SKUTECZNOSCI konkretnie dla narzedzi
   dwujezycznych (PL/EN) - czy jezyk samouczka wplywa na ukonczenie, sposob
   uczenia sie mapy, itp. Nasza aplikacja jest dwujezyczna, zaden z przykladow
   nie adresowal tego wymiaru.
6. Nie udalo sie dotrzec do pelnej tresci recenzowanego artykulu Davey 2026
   w Curator: The Museum Journal o wayfinding w muzeach (403 Forbidden przy
   probie pobrania) - wnioski o muzeach w tym raporcie pochodza wylacznie z
   drugorzednych zrodel (blogi o museum design), nie z pierwotnego badania.
   To jest wazna luka, bo mogloby to byc najsilniejsze zrodlo akademickie dla
   calego pytania R7.
7. Nie ustalono, ile procent uzytkownikow narzedzi typu Blender/Unity/JetBrains
   faktycznie KONCZY oficjalny tutorial onboardingowy - te firmy nie publikuja
   takich liczb publicznie (w przeciwienstwie do firm sprzedajacych tour software,
   ktore publikuja liczby wlasnie zeby sprzedac swoj produkt).
8. Nie sprawdzono danych ilosciowych specyficznie dla wzorca "checklist" jako
   alternatywy dla tour w kontekscie narzedzia edukacyjnego (to pytanie nalezy
   formalnie do R5 wedlug MASTER_PLAN, wiec swiadomie nie pogłębiano go tutaj,
   zeby uniknac duplikacji pracy innego agenta).

## ZRODLA (URL + etykieta konfliktu interesow)

Zrodla BEZ konfliktu interesow (nie sprzedaja software'u do onboardingu/tourow):

- `nngroup.com/articles/onboarding-tutorials/` - Nielsen Norman Group, niezalezna firma
  badawcza UX (sprzedaje szkolenia UX ogolnie, nie narzedzia do tourow) - GLOWNE zrodlo tezy 2.
- `nngroup.com/articles/spatial-memory/` - Nielsen Norman Group - zrodlo tezy 4.
- `nngroup.com/articles/mobile-tutorials/` - Nielsen Norman Group, znaleziony w wynikach,
  nie cytowany bezposrednio powyzej, ale spojny tematycznie.
- `instructionaldesign.org/theories/subsumption-theory/` - portal edukacyjny o teoriach
  nauczania, brak modelu biznesowego zwiazanego z onboardingiem software'u - zrodlo tezy 3.
- `edukatesg.com/2026/09/12/how-advance-organizers-work-give-new-knowledge-somewhere-to-attach/` -
  blog edukacyjny, wsparcie dla tezy 3.
- `en.wikipedia.org/wiki/Help:Navigation` - Wikipedia, brak konfliktu interesow.
- `en.wikipedia.org/wiki/Web_navigation` - Wikipedia, brak konfliktu interesow.
- `blenderguru.com/posts/blender-donut-v5-tutorial` - tworca tutoriala (sprzedaje wlasne
  kursy Blendera, LEKKI konflikt interesow jako tworca tresci edukacyjnej, ale nie
  sprzedaje "onboarding software" jako kategorii - inny typ konfliktu niz Appcues/Chameleon).
- `premiumbeat.com/blog/creating-the-donut-in-blender/` - blog produktowy (stock media),
  brak bezposredniego konfliktu wzgledem tematu onboardingu.
- `fatpencilstudio.com/blog/the-infamous-blender-donut/` - studio kreatywne, brak konfliktu.
- `blog.jetbrains.com/idea/2021/08/what-s-new-in-the-ide-features-trainer/` - JetBrains,
  producent IDE opisujacy WLASNY produkt - **lekki konflikt interesow jako producent
  narzedzia**, ale to opis wlasnej funkcji, nie sprzedaz kategorii "onboarding software".
- `blog.jetbrains.com/idea/2024/10/bridging-the-gap-between-the-classic-and-new-uis/` -
  jw., ten wpis jest o tyle wiarygodny, ze JetBrains PRZYZNAJE SIE do ograniczen
  wlasnego onboardingu, co obniza podejrzenie o czysta autopromocje.
- `learn.unity.com/` - Unity Technologies, opis wlasnego produktu - **lekki konflikt
  interesow jako producent**, podobnie jak JetBrains, opis funkcji wlasnej, nie
  sprzedaz kategorii onboarding.
- `dev.epicgames.com/documentation/unreal-engine/unreal-engine-for-new-users` - Epic
  Games, jw., opis wlasnej dokumentacji.
- `nobledesktop.com/learn/figma/exploring-figmas-user-interface-navigating-menus-and-panels` -
  szkola (sprzedaje kursy Figmy, nie onboarding software) - lekki konflikt, inny typ.
- `musosoup.com/blog/easiest-daw-to-use` - portal muzyczny, brak konfliktu zwiazanego
  z onboardingiem (moze miec afiliacje z DAW, nie zweryfikowano).
- `melodics.com/blog/logic-vs-ableton` - Melodics sprzedaje aplikacje do nauki gry na
  perkusji/klawiszach, NIE onboarding software - posredni, slaby konflikt (sprzedaje
  produkt edukacyjny w pokrewnej branzy).
- `learnxinyminutes.com/` - projekt spolecznosciowy open source, brak konfliktu.
- `antonz.org/try-x-in-y-minutes/` - blog osobisty dewelopera, brak konfliktu.
- `en.wikipedia.org/wiki/User_onboarding` - Wikipedia, brak konfliktu (nie zacytowano
  bezposrednio powyzej, dostepne jako tlo).
- `www.edgedrop.app/blog/onboarding-tutorial-what-it-covers-and-how-to-replay` -
  Edge-Drop opisuje WLASNY produkt - **lekki konflikt jako producent**, ale produkt
  to narzedzie do przesylania plikow, nie onboarding software, wiec motywacja do
  zawyzania akurat tej tezy jest slabsza niz u sprzedawcow kategorii.
- `uxdesign.cc/menu-of-ux-onboarding-patterns-and-when-to-use-them` (Eve Weinberg,
  UX Collective) - blog spolecznosciowy/osobisty, brak bezposredniego konfliktu
  interesow zwiazanego ze sprzedaza tour software.
- `helpx.adobe.com/photoshop/desktop/get-started/learn-the-basics/access-discover-panel.html` -
  Adobe, opis wlasnego produktu - **lekki konflikt jako producent**.
- `www.bwillcreative.com/understanding-the-photoshop-interface/` - blog niezalezny,
  brak konfliktu.
- `cruxcollaborative.com/insights/ongoing-onboarding-how-duolingo-introduces-new-skills` -
  agencja projektowa piszaca o cudzym produkcie (Duolingo), sprzedaje ogolne uslugi
  projektowe, nie kategorie "onboarding software" - posredni, slaby konflikt.

Zrodla Z KONFLIKTEM INTERESOW (sprzedaja software do onboardingu/tourow) - MATERIAL MARKETINGOWY:

- `chameleon.io/blog/product-tour-benchmarks-highlights` - Chameleon, sprzedaje
  product tour software. Zrodlo liczb 73/38/25/8% i 23/69%.
- `chameleon.io/assets/chameleon-product-tour-benchmarks-report-2019.pdf` - jw.
- `goodux.appcues.com/blog/figmas-animated-onboarding-flow` - Appcues, sprzedaje
  onboarding software. Uzyte tylko jako zrodlo opisowe cudzego produktu (Figma).
- `goodux.appcues.com/blog/duolingo-user-onboarding` - Appcues, jw., o Duolingo.
- Wzmianki w wynikach wyszukiwania bez bezposredniego cytowania w tresci raportu,
  wszystkie z konfliktem interesow: `userguiding.com`, `userpilot.com`, `walkme.com`
  (nie odwiedzone bezposrednio), `whatfix.com` (nie odwiedzone bezposrednio),
  `stepskit.com`, `guideflow.com`, `usertourkit.com`, `getmonetizely.com`,
  `produktly.com`, `saasfactor.co`, `onboarding-hub.com` - swiadomie NIE uzyte
  jako dowod w sekcji USTALENIA, zgodnie z zasada projektu o zatrutych zrodlach.

Zrodlo niedostepne (blad techniczny, nie konflikt interesow):

- `onlinelibrary.wiley.com/doi/full/10.1111/cura.70016` (Davey, "Understanding
  Visitor Path Choice and Enhancing Wayfinding in Museums: A Critical Review of a
  Century of Research", Curator: The Museum Journal, 2026) - zwrocilo HTTP 403,
  nie udalo sie odczytac tresci. To wygladalo na najsilniejsze mozliwe zrodlo
  akademickie dla calego pytania R7 i jego brak jest istotna luka - patrz
  "CZEGO NIE USTALILEM" punkt 6.
