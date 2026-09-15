# R3 - Dlugosc samouczka

## TL;DR (5-8 punktow z sila dowodu)

1. **Nie istnieje zaden wiarygodny, zrodlowo potwierdzony prog liczby krokow, po ktorym "gwaltownie rosnie porzucanie".** Kazda konkretna liczba znaleziona w tym researchu (5, 7, 10) pochodzi z materialow firm sprzedajacych oprogramowanie do tourow, bez ujawnionej metodologii, albo jest cytatem-widmo bez zrodla pierwotnego. Sila dowodu: BRAK (patrz sekcja tropienia).
2. **Jedno twierdzenie okazalo sie prawdopodobnie fabrykowanym cytatem.** Fraza "78% uzytkownikow porzuca tour przed trzecim krokiem - Baymard Institute" krazy po dziesiatkach blogow marketingowych, ale nie istnieje na baymard.com ani w zadnym ich raporcie mozliwym do znalezienia. Sila dowodu: BRAK / falszywa atrybucja.
3. **Jedyne twarde dane liczbowe o dlugosci walkthroughow pochodza od Pendo (2016) i sa jawnie oznaczone jako material dostawcy.** Pokazuja spadek ukonczenia przy >10 krokach w porownaniu do 1-3 krokow (~2x), ale bez p-values, bez definicji "ukonczenia" i bez segmentacji branzowej. Sila dowodu: SLABA (jedno zrodlo, dostawca, brak recenzji).
4. **Niezalezne badanie NN/g (n=70, 4 aplikacje mobilne) nie znalazlo statystycznie istotnej roznicy w skutecznosci zadania miedzy grupa z tutorialem a grupa bez niego** (91% vs 94% sukcesu, p=0.443), ale znalazlo statystycznie istotny wzrost POSTRZEGANEJ trudnosci zadania u osob, ktore przeszly tutorial (p=0.047). To nie mowi nic o liczbie krokow, ale mowi cos wazniejszego: sam fakt pokazania tutorialu moze szkodzic percepcji. Sila dowodu: SREDNIA (pojedyncze badanie, ale metodologicznie przejrzyste, niezalezne, z podanymi wartosciami p).
5. **Wskazniki postepu (progress bar) maja mieszany, czesto odwrotny efekt** w niezaleznej metaanalizie 32 eksperymentow ankiet internetowych (Villar, Callegaro, Yang 2013) oraz w analizie ponad 25 000 realnych ankiet (Liu i Wronski 2018, SurveyMonkey) - ankiety BEZ paska postepu mialy wyzsza ukonczenie niz z paskiem. Domena to ankiety, nie toury produktowe, wiec przenoszenie 1:1 na samouczki w aplikacji jest analogia, nie dowodem wprost. Sila dowodu: SREDNIA (peer-reviewed, ale inna domena zadania).
6. **Miller "7±2" jako uzasadnienie limitu krokow tutoriala jest nadinterpretacja klasyczna w calej branzy UX** - oryginalne badanie Millera (1956) dotyczylo dyskryminacji bodzcow jednowymiarowych i pamieci natychmiastowej (recall), nie liczby widocznych/nawigowalnych krokow (recognition). Sila dowodu: SILNA co do tego, ze regula NIE ma zastosowania (wielu niezaleznych krytykow UX, zgodni), ale to dowod negatywny - obala liczbe, nie dostarcza nowej.
7. **Segmentacja na akty/rozdzialy/sesje ma teoretyczne wsparcie w efekcie goal-gradient** (Kivetz, Urminsky, Zheng 2006, peer-reviewed JMR) - ludzie przyspieszaja wysilek blisko celu, a wiele malych celow dziala lepiej niz jeden dlugi. Ale badanie dotyczylo programow lojalnosciowych i ocen piosenek, nie tourow UI - ponownie analogia. Sila dowodu: SREDNIA (mocne badanie zrodlowe, slaby transfer domeny).
8. **Nie znalazlem zadnego niezaleznego (nie-dostawcy) badania, ktore mierzy wprost "po ilu krokach samouczka w aplikacji ludzie wysiadaja".** To jest luka, nie ukryty konsensus. Kazdy, kto poda Ci konkretna liczbe kroku granicznego, powinien podac zrodlo pierwotne z metodologia - w tym researchu zadnego takiego nie znalazlem.

## USTALENIA

### Co faktycznie wiadomo o dlugosci i porzucaniu

**Badanie NN/g o tutorialach mobilnych** (Nielsen Norman Group, "Mobile Tutorials: Wasted Effort or Efficiency Boost?", https://www.nngroup.com/articles/mobile-tutorials/) to jedyne znalezione zrodlo z podana metodologia i wartosciami statystycznymi:

- Test typu between-subject, zdalny, niemoderowany, ilosciowy.
- 70 uczestnikow, 35 na grupe (grupa z tutorialem typu "deck-of-cards" vs grupa bez).
- 4 aplikacje iOS: Movesum, Brainsparker, LaunchCenter Pro, Sketch.Book.
- Sukces zadania: grupa z tutorialem 91%, grupa bez 94%. Roznica NIEISTOTNA statystycznie (p=0.443).
- Czas ukonczenia: grupa z tutorialem 93.49s, bez 85.17s. Roznica NIEISTOTNA (p>0.1).
- Postrzegana trudnosc (Single-Ease Questionnaire, skala 7-punktowa): grupa z tutorialem 4.92, bez 5.49. Roznica ISTOTNA (p=0.047) - osoby po tutorialu ocenily zadanie jako trudniejsze.

Wniosek NN/g: tutorial nie poprawia wyniku zadania, a moze pogarszac subiektywna percepcje trudnosci. To badanie NIE mierzy liczby krokow jako zmiennej, wiec nie daje odpowiedzi na "ile krokow", ale podwaza samo zalozenie, ze dluzszy = lepiej nauczony.

**"Instructional Overlays and Coach Marks for Mobile Apps"** (NN/g, https://www.nngroup.com/articles/mobile-instructional-overlay/):

- Twierdzenie "informacja zanika po okolo 20 sekundach" jest przypisane do WEWNETRZNEGO kursu szkoleniowego NN/g ("The Human Mind and Usability"), nie do zewnetrznej publikacji recenzowanej. To jest istotne zastrzezenie - NN/g sam nie podaje zrodla akademickiego dla tej konkretnej liczby.
- Rekomendacja: unikac "lancuchow podpowiedzi" (chains of tips) - bombardowanie uzytkownika czestymi ekranami z podpowiedziami sprawia, ze szybciej je odrzuca. Pokazywac podpowiedzi pojedynczo, w odpowiednim momencie, a nie sekwencyjnie na starcie.
- Brak konkretnej liczby maksymalnej overlayow.

**"Onboarding Tutorials vs. Contextual Help"** (NN/g, https://www.nngroup.com/articles/onboarding-tutorials/):

- Brak konkretnej rekomendacji liczbowej dlugosci (liczba krokow/ekranow).
- Tutorial dziala wg NN/g wtedy, gdy: uczy nowego paradygmatu interakcji (np. AR), jest opcjonalny (nie wymuszony przy logowaniu), pozwala na praktyke a nie tylko ogladanie, jest dostepny do ponownego obejrzenia pozniej.
- Tutorial zawodzi, gdy: przerywa inna czynnosc uzytkownika, jest poza kontekstem uzycia, wymaga zapamietania kroku na pozniej (przekracza pamiec robocza), jest nachalny i trudny do zamkniecia.
- Brak cytowan konkretnych badan z liczbami procentowymi w tym artykule - to jest artykul syntetyzujacy, nie raport z danymi.

**Dane Pendo o dlugosci walkthroughow** (Pendo Blog, "The State of Walkthroughs in Pendo", 2016, https://www.pendo.io/pendo-blog/state-walkthroughs-pendo/) - JEDYNE znalezione zrodlo z realnymi liczbami o dlugosci krokow vs ukonczenie, ale to material producenta narzedzia do tourow:

- Analiza rozkladu liczby krokow w aktywnych walkthroughach klientow Pendo: od 1-2 krokow do najwiekszego z 74 krokami.
- Walkthroughy 1-3 kroki: ok. 30% wskaznika ukonczenia calosci.
- Nieznaczny spadek konwersji przy troche dluzszych walkthroughach.
- Walkthroughy powyzej 10 krokow: ok. 2x nizsza ogolna ukonczenie niz walkthroughy 1-3 krokowe.
- Autorzy sami zaznaczaja, ze dane pochodza z "szerokiego zakresu firm z roznymi bazami uzytkownikow", niektore walkthroughy maja tysiace odsłon, inne kilka - co utrudnia porownania miedzy soba.
- BRAK: rozmiaru probki (ile dokladnie walkthroughow), przedzialow ufnosci, definicji "ukonczenia", segmentacji branzowej, testu istotnosci.

To jest najbardziej surowe i najuczciwiej opisane dane dostawcy, jakie znalazlem - w przeciwienstwie do wiekszosci innych (patrz nizej), tutaj przynajmniej podano zakres (1-74 kroki) i konkretny prog (>10 krokow), zamiast okragłej liczby "5" bez zadnego uzasadnienia.

### Ile tekstu na krok

- Nie znalazlem zadnego NIEZALEZNEGO badania limitu znakow per krok tutoriala/tour. Znalezione liczby (np. "20 znakow w linii dla tooltipow", "25-35 znakow dla tekstu pomocniczego") pochodza z artykulow projektowych (UXPin, Cieden, Medium) bez podanego zrodla badawczego - to sa rekomendacje praktykow, nie wyniki testow.
- Jedyne pokrewne, niezalezne zrodlo dot. dlugosci tekstu ekranowego to Baymard Institute o dlugosci linii tekstu ogolnie (https://baymard.com/blog/line-length-readability) - dotyczy czytelnosci akapitow, NIE tooltipow/coach markow. Nie mozna go bezposrednio przenosic na krok samouczka.
- Wniosek: **limit znakow na krok samouczka to w tej chwili konwencja projektowa (rule of thumb), nie ustalony fakt badawczy.**

### Dzielenie na akty / rozdzialy / sesje

- Teoretyczne wsparcie: efekt goal-gradient (Kivetz, Urminsky, Zheng, 2006, Journal of Marketing Research 43(1):39-58, https://journals.sagepub.com/doi/abs/10.1509/jmkr.43.1.39) - ludzie przyspieszaja wysilek w miare zblizania sie do celu; wiele malych celow ("rozdzialy") daje wiele lokalnych gradientow zamiast jednego dalekiego celu bez "nachylenia". Badanie jest solidne metodologicznie (eksperymenty polowe, dane klientow kawiarni z karta lojalnosciowa, model Tobit/logit na ocenach piosenek), ale dotyczy programow nagrod i sesji ocen, NIE tutoriali UI. Transfer na "akty samouczka" jest wnioskowaniem przez analogie, a nie bezposrednim dowodem.
- Praktyczny przyklad z branzy gier: Mark Skaggs (Zynga) na GDC opisal, ze skrocenie tutoriala o dwa kroki podnioslo wynik lejka o 25%, ale wywolalo negatywna reakcje graczy (https://andrewchen.com/game-design-tutorial-at-the-gdc/, https://www.gamedeveloper.com/design/first-five-minutes-how-tutorials-make-or-break-your-social-game). To jest POJEDYNCZA anegdota z jednej firmy, jedna gra, bez podanej metodologii, bez liczby uzytkownikow - dowod anegdotyczny, nie badanie.
- Celia Hodent (bylа Chief Psychologist w Epic Games) mowila na GDC 2016 o typowych bledach onboardingu w grach (https://celiahodent.com/gamers-brain-ux-onboarding/) - materialy koncepcyjne, bez konkretnych liczb progowych dla dlugosci.
- Wniosek: **dzielenie na akty/sesje ma solidne teoretyczne uzasadnienie psychologiczne (goal-gradient), ale zero bezposrednich, mierzonych dowodow w kontekscie samouczkow aplikacji.** To jest miejsce, gdzie rekomendacja moze byc rozsadna, ale nie nalezy jej podpierac fabrykowana pewnoscia.

### Pokazywanie postepu (licznik, pasek, kropki)

To najlepiej zbadany podtemat w calym R3 - ale badania sa z domeny ANKIET internetowych, nie tourow produktowych:

- **Villar, Callegaro, Yang (2013)**, "Where Am I? A Meta-Analysis of Experiments on the Effects of Progress Indicators for Web Surveys", Journal of Survey Statistics and Methodology (SAGE), https://journals.sagepub.com/doi/full/10.1177/0894439313497468. Metaanaliza 32 eksperymentow porownujacych grupy z paskiem postepu i bez. Wniosek: pasek postepu czesto NIE zwieksza, a czasem SZKODZI ukonczeniu. Efekt zalezy od tego, czy realny postep jest szybszy czy wolniejszy niz oczekiwania respondenta - gdy postep "spoznia sie" wzgledem oczekiwan, pasek pogarsza doswiadczenie i obniza ukonczenie.
- **Liu i Wronski (2018)**, "Examining Completion Rates in Web Surveys via Over 25,000 Real-World Surveys", Social Science Computer Review (SAGE), https://journals.sagepub.com/doi/abs/10.1177/0894439317695581. Dane z ponad 25 000 realnych ankiet SurveyMonkey: ankiety BEZ paska postepu mialy WYZSZA ukonczenie niz ankiety z paskiem. To jest bezposrednio SPRZECZNE z popularnym zalozeniem "pasek postepu zawsze pomaga".
- Material z konfliktem interesu (Irrational Labs, firma konsultingowa sprzedajaca projektowanie behawioralne, https://irrationallabs.com/blog/knowledge-cuts-both-ways-when-progress-bars-backfire/) syntetyzuje powyzsze badania i dodaje wlasna heurystyke: pasek dziala lepiej, gdy poczatkowy postep jest SZYBKI (efekt "endowed progress" - np. checklisty ktore od razu pokazuja 20% zrobione), a szkodzi, gdy pokazuje dlugi pusty pasek na starcie.
- Wniosek dla R3: **teza "pokazywanie postepu zawsze zwieksza ukonczenie" jest FALSZYWA w swietle dwoch niezaleznych, recenzowanych zrodel z domeny pokrewnej (ankiety).** Nie mamy analogicznego badania dla tourow UI, ale kierunek ostrzezenia (pasek MOZE szkodzic) jest wart wziecia pod uwage, zamiast bezkrytycznie wdrazac pasek postepu jako "best practice".

### Jak mierzyc, ze samouczek jest za dlugi

Nie znalazlem gotowego, zewnetrznie zwalidowanego zestawu metryk specyficznie dla "tour w aplikacji jest za dlugi". Skladam z elementow o roznej wiarygodnosci:

- Z badania NN/g (rzetelne): mierzalna, ISTOTNA statystycznie zmienna to POSTRZEGANA trudnosc zadania (Single-Ease Questionnaire) po tutorialu vs bez - to jest metoda z ugruntowana psychometria (SEQ jest szeroko stosowanym narzedziem w badaniach UX, choc SAM ten fakt nie mial osobnego niezaleznego zrodla w tym query).
- Z domeny ankiet (rzetelne, ale inna domena): moment porzucenia (breakoff point) wzgledem oczekiwanej dlugosci - jesli uzytkownik "spodziewal sie krocej", porzuca wczesniej. Przeklada sie to na wskazowke: pokazuj rzetelny szacunek dlugosci PRZED startem samouczka, nie po fakcie.
- Z materialu dostawcy (Pendo, do traktowania ostroznie): rozklad porzucen KROK PO KROKU w ramach jednego walkthroughu, nie tylko ukonczenie/nieukonczenie calosci - to jest sensowny pomysl metryki (funnel per-step), ale bez niezaleznego potwierdzenia jego wartosci predykcyjnej.
- Zdroworozsadkowe (bez zrodla akademickiego, ale logiczne z powyzszych): klikniecie "pomin", czas spedzony na kazdym kroku, cofniecie sie do poprzedniego kroku (sygnal zagubienia), zamkniecie okna/karty w trakcie, powrot do samouczka po jego wczesniejszym pominieciu.

**To jest jawna luka: nie ma tu jednego, zwalidowanego zestawu KPI "tutorial jest za dlugi" z cytowalnego, niezaleznego zrodla.** Rekomendacje ponizej w czesci "CZEGO NIE USTALILEM" nazywaja to wprost.

### Jeden dlugi tour vs kilka krotkich w kontekscie

- Brak znalezionego bezposredniego eksperymentu porownawczego (A/B: jeden dlugi tour vs seria krotkich kontekstowych) z ujawniona metodologia, ani od dostawcow, ani niezaleznie.
- Posrednio za krotszymi, kontekstowymi seriami przemawiaja: (a) efekt goal-gradient (wiele malych celow, patrz wyzej - transfer analogiczny), (b) rekomendacja NN/g przeciw "chains of tips" (patrz Coach Marks wyzej - to jest bezposrednio o UI, ale bez liczb), (c) generalna zasada NN/g "pull revelations" (pomoc wywolana potrzeba) jako lepsza niz "push revelations" (wymuszony tutorial na starcie) - koncepcyjne stanowisko NN/g, bez przytoczonego eksperymentu z liczbami w tym konkretnym artykule.
- Wniosek: **kierunek "kilka krotkich lepiej niz jeden dlugi" ma wsparcie koncepcyjne z kilku niezaleznych zrodel, ale nie ma bezposredniego testu ilosciowego porownujacego oba warianty w kontekscie samouczka aplikacji.**

## TROPIENIE POPULARNYCH LICZB (czy maja dno, czy to lancuch cytowan)

### Liczba "78% porzuca tour do trzeciego kroku - Baymard Institute"

- Znaleziona w wynikach wyszukiwania jako przypisana do Baymard Institute, powielana przez artykuly typu "product tour best practices" (Guideflow, Appcues, Userpilot, Chameleon, digia.tech, saasfactor.co).
- Sprawdzenie: wyszukiwanie `site:baymard.com` dla "product tour abandon" NIE zwraca zadnego trafienia na ten temat. Wyszukiwanie `Baymard Institute "78%" tour` zwraca inne, niepowiazane statystyki "78%" z ich strony (dot. edycji karty kredytowej), nic o tourach.
- **Werdykt: NIE UDALO SIE ZNALEZC ZRODLA PIERWOTNEGO. To wyglada na fabrykowany lub blednie przypisany cytat, ktory zyje wlasnym zyciem w tresciach SEO firm sprzedajacych tour software.** Traktowac jako NIEPRAWDZIWY dopoki ktos nie pokaze linku do konkretnego artykulu Baymard z ta liczba.

### Liczba "72% dla 3-krokowych, 74% dla 4-krokowych, 16% dla 7+ krokowych tourow - Chameleon 2025 Benchmark Report"

- Zrodlo istnieje (chameleon.io/benchmark-report) i FIRMA JEST WLASCICIELEM DANYCH (Chameleon sprzedaje oprogramowanie do tourow - to jest wprost material marketingowy).
- Sprawdzenie tresci raportu: ujawniona jest tylko laczna liczba interakcji ("550+ milionow interakcji uzytkownikow" w kategoriach: toury, checklisty, embeddables, launchery, modale, mikroankiety), BEZ:
  - liczby przeanalizowanych tourow per kategoria dlugosci,
  - definicji "ukonczenia",
  - segmentacji branzowej/geograficznej,
  - przedzialow ufnosci ani testu istotnosci.
- Wtorne zrodla (userTourKit, Userpilot) POWTARZAJA liczby 72%/74%/16% jako fakt, cytujac Chameleon, bez dodania wlasnej weryfikacji.
- **Werdykt: zrodlo istnieje, liczba prawdopodobnie realna WEDLUG WEWNETRZNYCH DANYCH CHAMELEON, ale nie da sie jej zweryfikowac niezaleznie - to jest raport self-published bez peer review, od firmy ktora ma interes w tym, zeby wynik brzmial jak twardy prog "5 krokow to bezpieczna granica" (co jest tez ich produktowa rekomendacja).** Do kategorii MATERIAL MARKETINGOWY, nie dowod.

### Liczba "Pendo: 847 B2B SaaS aplikacji, tutoriale >10 krokow -> 81% porzucen"

- Szukane bezposrednio na pendo.io i w wyszukiwarce - fraza "847" nie pojawia sie w zadnym znalezionym materiale Pendo.
- Znalazlem NATOMIAST prawdziwy, dajacy sie zidentyfikowac blog Pendo z 2016 (https://www.pendo.io/pendo-blog/state-walkthroughs-pendo/) z INNYMI, bardziej ostroznymi liczbami: 1-3 kroki ~30% ukonczenia, >10 krokow ~2x nizsza ukonczenie niz 1-3 kroki (nie "81%"), zakres 1-74 kroki w analizowanym zbiorze walkthroughow.
- **Werdykt: liczby "847 aplikacji" i "81% porzucen" wygladaja na wtorna, zawyzona parafraze prawdziwego, starszego (2016) posta Pendo, ktora po drodze zgubila ostroznosc oryginalu i zamienila "2x nizsza ukonczenie" na okragla, bardziej dramatyczna liczbe "81%".** To jest dokladnie mechanizm, przed ktorym ostrzega MASTER_PLAN: lancuch cytowan bez dna, gdzie kazde kolejne ogniowo zaokragla w gore.

### Liczba "progres bar redukuje porzucanie o 20%"

- Znaleziona w jednym zdaniu podsumowania wyszukiwarki (bez identyfikowalnego artykulu-zrodla przy powtornym sprawdzeniu).
- Sprawdzenie w dwoch NIEZALEZNYCH, recenzowanych zrodlach (Villar i in. 2013; Liu i Wronski 2018, patrz wyzej) daje wniosek WPROST PRZECIWNY w wielu warunkach: pasek postepu czesto nie pomaga lub szkodzi.
- **Werdykt: liczba "-20% porzucen" nie ma znalezionego zrodla pierwotnego i jest SPRZECZNA z dwoma niezaleznymi badaniami z pokrewnej domeny. Odrzucic.**

### Miller "7±2" jako limit krokow

- Nie jest to liczba specyficzna dla tourow, ale krazy w tej samej przestrzeni uzasadnien ("czlowiek pamieta max 7 rzeczy, wiec tutorial max 7 krokow").
- Sledzenie do zrodla: Miller (1956) w oryginale mial na mysli dyskryminacje bodzcow jednowymiarowych i pamiec BEZPOSREDNIA (recall), nie liczbe elementow widocznych na ekranie (recognition). Sam Miller pisal, ze czul sie "przesladowany przez pewna liczbe calkowita" (cytat z licznych zrodel wtornych, np. uxdesign.cc, Stephanie Walter, UX Myths - te zrodla same w sobie sa niezalezna krytyka, zgodna miedzy soba).
- **Werdykt: liczba "7" jako limit krokow tutoriala NIE MA oparcia w oryginalnym badaniu. To jest nadinterpretacja powielana od dekad w calej branzy UX, nie tylko w tourach.**

## MATERIAL MARKETINGOWY

Ponizsze zrodla pochodza od firm sprzedajacych oprogramowanie do tourow/onboardingu i ZOSTALY WYLACZONE z dowodow powyzej, ale sa tu wypisane, bo pojawiaja sie w kazdym wyszukiwaniu tego tematu i trzeba je umiec rozpoznac:

- Chameleon (chameleon.io) - "Benchmark Report 2025" (72%/74%/16% wg dlugosci tourow), "Hidden Metrics of Effective Product Tours" - sprzedaje platforme do tourow produktowych. Konkluzje zawsze wskazuja na "krotsze toury + wiecej triggerow kontekstowych" - czyli dokladnie funkcje ich produktu.
- Userpilot (userpilot.com) - liczne artykuly o "10 metrykach onboardingu", "547 firm SaaS" (nie znaleziono zrodla tej liczby w tresci artykulu przy weryfikacji) - sprzedaje platforme onboardingowa.
- Pendo (pendo.io) - "State of Walkthroughs" (2016) - realne dane, ale to producent platformy do walkthroughow; kazda rekomendacja koncowa prowadzi do uzycia ich narzedzia analitycznego.
- WalkMe, Whatfix, Appcues, Usetiful, Userflow - wystapily w wynikach wyszukiwania jako zrodla "best practices" bez unikalnych danych ilosciowych mozliwych do zweryfikowania w tym przebiegu researchu; pomijam szczegolowe cytaty, bo nie wniosly nic ponad to, co juz opisano wyzej.
- Guideflow, saasfactor.co, digia.tech, usertourkit.com, kompassify.com, designrevision.com, onboarding-hub.com - blogi tresciowe (content marketing) budowane pod SEO wokol tych samych fraz "5 kroków", "78%", "547 firm" - dzialaja jako wzmacniacze cytatow bez weryfikacji zrodla, nie jako niezalezne zrodla.

**Zasada stosowana w tym raporcie: kazda liczba z powyzszej listy firm, jesli nie zostala niezaleznie zweryfikowana w sekcji USTALENIA lub oznaczona jako "istnieje, ale bez ujawnionej metodologii" w sekcji TROPIENIE, jest tu wylacznie odnotowana jako istniejaca w przestrzeni informacyjnej - NIE jako dowod.**

## CZEGO NIE USTALILEM

1. **Nie znalazlem zadnego niezaleznego (nie-dostawcy), recenzowanego badania mierzacego wprost "liczba krokow samouczka w aplikacji" vs "wskaznik ukonczenia" lub "wskaznik dalszego uzycia produktu".** Wszystko, co jest w tej domenie, to albo material dostawcy (Pendo, Chameleon), albo analogia z innej domeny (ankiety, programy lojalnosciowe).
2. **Nie ustalilem, czy prog "3 kroki wysokie ukonczenie" u Pendo/Chameleon jest zbieznoscia miedzy dwoma niepowiazanymi zbiorami danych, czy tylko powielaniem tej samej intuicji przez obie firmy.** Obie maja interes w tym, zeby "krotko" wygladalo na potwierdzone empirycznie.
3. **Nie znalazlem zadnego badania limitu znakow tekstu per krok samouczka/coach mark z ujawniona metodologia.** Liczby typu "20-35 znakow" to konwencje praktykow, nie wyniki testu.
4. **Nie znalazlem bezposredniego testu porownawczego "jeden dlugi tour" vs "kilka krotkich, odpalanych w kontekscie"** - tylko wsparcie posrednie/analogiczne (goal-gradient, zasada "pull revelations" NN/g bez liczb).
5. **Nie ustalilem, czy 20-sekundowy limit pamieci dla coach markow (NN/g) ma zrodlo poza wewnetrznym kursem szkoleniowym NN/g.** Moze istniec w literaturze pamieci roboczej (np. Peterson & Peterson 1959 dot. zanikania sladu pamieciowego w ok. 18-20 sekund bez powtarzania), ale NN/g SAM tego nie zacytowal w sprawdzonym artykule, wiec nie moge potwierdzic tego polaczenia bez fabrykowania mostka.
6. **Nie zweryfikowalem "547 firm SaaS" (Userpilot)** - fraza pojawila sie w podsumowaniu wyszukiwarki, ale nie w tresci zrodlowego artykulu po jego bezposrednim pobraniu. Mogla pochodzic z innego artykulu Userpilot, ktorego nie zidentyfikowalem, albo byc bledem generowania podsumowania przez wyszukiwarke. Nie potwierdzam ani nie odrzucam - oznaczam jako niesprawdzone.
7. **Nie mam danych o tym, jak dlugosc samouczka wplywa specyficznie na narzedzia hybrydowe encyklopedia+konfigurator** (co jest istotne dla R7, nie R3) - to pytanie nalezy do innego agenta w tej kampanii, ale odnotowuje, ze R3 nie dostarcza tu niczego wprost.
8. **Nie znalazlem zadnych danych o odsetku uzytkownikow, ktorzy WRACAJA do samouczka po jego przerwaniu** w zaleznosci od jego dlugosci - to bylby dobry wskaznik "czy tour byl za dlugi", ale nie ma dla niego zrodla w tym przebiegu researchu.

## ZRODLA (URL + etykieta konfliktu interesow)

### Niezalezne / akademickie / non-profit (brak bezposredniego COI z tour software)

- Nielsen Norman Group, "Mobile Tutorials: Wasted Effort or Efficiency Boost?" - https://www.nngroup.com/articles/mobile-tutorials/ - BRAK COI (NN/g nie sprzedaje oprogramowania do tourow, sprzedaje szkolenia i konsulting UX ogolnie; traktowac jako lagodny, posredni COI zwiazany z autorytetem marki, ale nie sprzedaje konkurencyjnego narzedzia).
- Nielsen Norman Group, "Instructional Overlays and Coach Marks for Mobile Apps" - https://www.nngroup.com/articles/mobile-instructional-overlay/ - jak wyzej.
- Nielsen Norman Group, "Onboarding Tutorials vs. Contextual Help" - https://www.nngroup.com/articles/onboarding-tutorials/ - jak wyzej.
- Villar, Callegaro, Yang (2013), "Where Am I? A Meta-Analysis of Experiments on the Effects of Progress Indicators for Web Surveys", Journal of Survey Statistics and Methodology (SAGE) - https://journals.sagepub.com/doi/full/10.1177/0894439313497468 - BRAK COI, publikacja akademicka recenzowana. Domena: ankiety internetowe, nie toury UI.
- Liu, Wronski (2018), "Examining Completion Rates in Web Surveys via Over 25,000 Real-World Surveys", Social Science Computer Review (SAGE) - https://journals.sagepub.com/doi/abs/10.1177/0894439317695581 - COI CZESCIOWY: wspolautorka afiliowana z SurveyMonkey (firma ankietowa), ale publikacja recenzowana w czasopismie akademickim, dane opisowe z realnych ankiet, nie promocja narzedzia do tourow.
- Kivetz, Urminsky, Zheng (2006), "The Goal-Gradient Hypothesis Resurrected: Purchase Acceleration, Illusionary Goal Progress, and Customer Retention", Journal of Marketing Research 43(1):39-58 - https://journals.sagepub.com/doi/abs/10.1509/jmkr.43.1.39 - BRAK COI, publikacja akademicka. Domena: programy lojalnosciowe i sesje ocen, nie toury UI.
- UX Myths, "Myth #23: Choices should always be limited to 7+/-2" - https://uxmyths.com/post/931925744/myth-23-choices-should-always-be-limited-to-seven - BRAK COI, projekt non-profit krytykujacy mity UX.
- Stephanie Walter, "Your navigation menu doesn't need Miller's 7±2 rule" - https://stephaniewalter.design/blog/your-menu-doesnt-need-millers-7-plus-minus-2-rule/ - lagodny COI (autorka niezalezna konsultantka UX, moze promowac wlasne uslugi, ale nie sprzedaje tour software).
- Baymard Institute, strona glowna i wyszukiwanie wewnetrzne - https://baymard.com/ - BRAK COI w kontekscie tourow (Baymard sprzedaje badania e-commerce UX, nie oprogramowanie do onboardingu); uzyte tu do OBALENIA cytatu "78%", nie jako zrodlo pozytywne.
- Andrew Chen / Mark Skaggs (Zynga), relacja z GDC - https://andrewchen.com/game-design-tutorial-at-the-gdc/ - lagodny COI (branzowa anegdota praktyka gier, nie sprzedawcy tour software, ale tez nie badanie naukowe).
- Gamedeveloper.com, "First Five Minutes: How Tutorials Make or Break Your Social Game" - https://www.gamedeveloper.com/design/first-five-minutes-how-tutorials-make-or-break-your-social-game - branzowy portal dziennikarski, brak COI zwiazanego z tour software.
- Celia Hodent, "The Gamer's Brain, Part 2: UX of Onboarding" - https://celiahodent.com/gamers-brain-ux-onboarding/ - autorka byla psycholog w Epic Games, obecnie konsultantka; lagodny COI zwiazany z wlasnymi uslugami konsultingowymi, brak zwiazku z tour software.

### Material dostawcow tour software (COI bezposredni - sekcja MATERIAL MARKETINGOWY)

- Chameleon, "Benchmark Report" - https://www.chameleon.io/benchmark-report - COI: sprzedaje platforme do tourow produktowych.
- Chameleon, "The Hidden Metrics of Effective Product Tours" - https://www.chameleon.io/blog/effective-product-tour-metrics - jak wyzej.
- Pendo, "The State of Walkthroughs in Pendo" (2016) - https://www.pendo.io/pendo-blog/state-walkthroughs-pendo/ - COI: sprzedaje platforme do walkthroughow/onboardingu. Uzyte jako najbardziej surowe dostepne dane, ale z zastrzezeniem COI.
- Userpilot, "10 Onboarding UX Examples and How AI Changes First User Experiences" - https://userpilot.com/blog/onboarding-ux-examples/ - COI: sprzedaje platforme onboardingowa.
- Irrational Labs, "Knowledge Cuts Both Ways: When Progress Bars Backfire" - https://irrationallabs.com/blog/knowledge-cuts-both-ways-when-progress-bars-backfire/ - COI CZESCIOWY: firma konsultingu behawioralnego, sprzedaje uslugi projektowania (nie bezposrednio tour software, ale ma interes w promowaniu wlasnej ekspertyzy "wiedzy tajemnej").

### Niezweryfikowane / nieznalezione zrodlo pierwotne (uzyte wylacznie w sekcji TROPIENIE, jako przyklad lancucha cytowan)

- Rozne artykuly SEO cytujace "78% - Baymard" bez dzialajacego linku do zrodla: Guideflow (https://www.guideflow.com/blog/product-tour-best-practices), Appcues (https://www.appcues.com/blog/product-tours-walkthroughs-ultimate-guide), Userpilot (https://userpilot.com/blog/product-tour-examples/), Chameleon (https://www.chameleon.io/blog/how-to-build-effective-product-tours), digia.tech (https://www.digia.tech/post/anatomy-of-a-great-in-app-onboarding-tour/), saasfactor.co (https://www.saasfactor.co/blogs/why-most-product-tours-fail-and-how-to-implement-contextual-onboarding) - wszystkie COI: sprzedaja lub promuja narzedzia/uslugi onboardingowe, i wszystkie powielaja niepotwierdzona liczbe.
