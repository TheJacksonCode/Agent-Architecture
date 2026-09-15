# R1 - Czy samouczek na pierwszym uruchomieniu dziala

## TL;DR

- Jedyne znalezione **kontrolowane badanie ilosciowe** niezaleznej instytucji (Nielsen Norman Group, 70 uzytkownikow, 4 aplikacje iOS) pokazuje, ze tutorial NIE poprawia sukcesu zadania ani czasu wykonania, a statystycznie istotnie POGARSZA subiektywne postrzeganie trudnosci zadania (sila dowodu: SREDNIA - jedno badanie, ale niezalezne, z p-value, metodologia jawna). [Zrodlo 1]
- Ten sam zespol badawczy (NN/g, inny autor, inny artykul) rekomenduje "pull" (kontekstowa pomoc wyzwalana dzialaniem uzytkownika) zamiast "push" (tutorial narzucony od razu przy starcie), z jednym udokumentowanym wyjatkiem: calkowicie nowe paradygmaty interakcji (np. AR) (sila dowodu: SREDNIA - stanowisko eksperckie NN/g oparte na wielu badaniach uzytecznosci, ale bez pojedynczego cytowanego testu A/B w tym konkretnym artykule). [Zrodlo 2]
- Fundament teoretyczny ("paradox of the active user", Carroll i Rosson, 1987) tlumaczy DLACZEGO tutoriale pushowe zawodza: uzytkownicy systemowo omijaja nauke z wyprzedzeniem na rzecz dzialania metoda prob i bledow, nawet gdy nauka z gory bylaby efektywniejsza w dluzszej perspektywie (sila dowodu: MOCNA jako teoria - klasyczna, cytowana praca HCI, ale to model teoretyczny/obserwacyjny sprzed >35 lat, nie wspolczesny test A/B na oprogramowaniu SaaS). [Zrodlo 3, 4]
- Nie znalazlam ani jednego **niezaleznego, opublikowanego testu A/B z konkretnymi liczbami** por√≥wnujacego "tour automatyczny na starcie" vs "brak tour" w produktywnym oprogramowaniu spoza branzy narzedzi-do-tourow. Wszystkie znalezione liczby A/B pochodza od firm sprzedajacych onboarding (Chameleon, Jimo, Userpilot) albo od firm doradczych zyjacych z konsultingu wzrostu (ProductLed), albo sa niemozliwe do zweryfikowania u zrodla (patrz sekcja luk). (sila dowodu: BRAK - to jest luka, nie wniosek). 
- Firmy sprzedajace narzedzia do tourow same przyznaja czesciowo problem: Chameleon (sprzedawca tourow) publikuje, ze wysoki wskaznik ukonczenia tour to "vanity metric" korelujacy z klikaniem "Dalej" bez uczenia sie, a nie ze zrozumieniem (sila dowodu: SLABA jako dowod NA tour, ale mocna jako przyznanie problemu przez strone zainteresowana sprzedaza tourow - wiarygodne wlasnie dlatego, ze idzie pod prad ich wlasnemu interesowi). [Zrodlo 8]
- Dane o POWROCIE do samouczka po pierwszym uzyciu (kluczowe dla naszego przypadku, bo nasz ma byc odpalany ponownie): NIE znalazlam ani jednej publicznie dostepnej liczby - ani niezaleznej, ani vendorowej - mowiacej, jaki procent uzytkownikow rzeczywiscie klika "pokaz samouczek ponownie" z menu pomocy. Wszystkie znalezione zrodla mowiace o "help engagement rate" definiuja metryke, ale nie podaja konkretnej liczby z realnego produktu. To jest twarda luka. 
- Skutecznosc zalezy silnie od typu produktu: NN/g wprost wyroznia wyjatek dla "novel interaction paradigm" (AR, VR) i dla produktow o duzej zlozonosci, gdzie kontekstowe wskazowki "w momencie" dzialania sa rekomendowane zamiast liniowego tutorialu na starcie (sila dowodu: SREDNIA, spojne stanowisko dw√≥ch artykulow NN/g). [Zrodlo 1, 2, 5]
- Jeden z popularnych w internecie "faktow branzowych" ("NN/g 2024 UX Benchmark Study": rzekome +68% zaangazowania dla wskaz√≥wek wyzwalanych zachowaniem) okazal sie NIEISTNIEJACY po bezposrednim sprawdzeniu na nngroup.com - prawdopodobnie halucynacja narzedzia AI-summary. Opisane w sekcji material marketingowy / halucynacje.

## USTALENIA

### 1. Jedyne twarde, niezalezne badanie ilosciowe: NN/g "Mobile Tutorials" (2020)

Nielsen Norman Group, marzec 2020, autorka Alita Kendrick, opublikowane na nngroup.com/articles/mobile-tutorials/. To jedyne znalezione badanie, ktore spelnia wszystkie kryteria: niezalezna instytucja (NN/g nie sprzedaje oprogramowania do tourow, sprzedaje szkolenia i konsulting UX ogolnie - konflikt interesu niski, ale nie zerowy, patrz uwaga nizej), jawna metodologia, liczby, test istotnosci statystycznej.

Metodologia: test miedzy-obiektowy (between-subject), zdalny, niemoderowany, 70 uzytkownikow iOS bez wczesniejszego doswiadczenia z testowanymi aplikacjami, podzieleni na dwie grupy po 35 osob. Cztery aplikacje: Movesum, Brainsparker, LaunchCenter Pro, Sketch.Book. Grupa A przechodzila przez tutorial w formie "talii kart" (deck-of-cards), grupa B pomijala go.

Wyniki:
- Sukces zadania: grupa z tutorialem 91%, grupa bez 94%. Roznica NIE istotna statystycznie (p=0.443).
- Postrzegana trudnosc (skala SEQ): grupa z tutorialem 4.92, grupa bez 5.49 (wyzsza wartosc = latwiej). Roznica istotna statystycznie (p=0.047) - **osoby, ktore przeszly tutorial, oceniary zadania jako trudniejsze**.
- Czas wykonania zadania: grupa z tutorialem 93.49 s, grupa bez 85.17 s. Roznica NIE istotna statystycznie.

Wniosek autorki: tutoriale nie czynia uzytkownikow szybszymi ani skuteczniejszymi, a moga pogarszac percepcje produktu. Rekomendacja: dla prostych aplikacji inwestowac w intuicyjnosc interfejsu, nie w tutoriale. [Zrodlo 1]

Zastrzezenie metodologiczne, ktore trzeba nazwac wprost: to jest JEDNO badanie, na 4 konkretnych, prostych aplikacjach mobilnych, sprzed 5+ lat (2020), z tutorialem w konkretnej formie (deck-of-cards, czyli seria plansz przed uzyciem appki, nie spotlight/coachmark na zywym UI). Generalizacja na jednoplikowa aplikacje webowa desktopowa typu encyklopedia+konfigurator (nasz przypadek, patrz R7) wymaga ostroznosci - inny typ interfejsu, inna forma tutorialu.

### 2. Stanowisko NN/g: push vs pull, i kiedy push jest uzasadniony

Page Laubheimer, NN/g, luty 2023, "Onboarding Tutorials vs. Contextual Help", nngroup.com/articles/onboarding-tutorials/. Artykul nie referuje pojedynczego nowego testu A/B, tylko syntetyzuje wieloletnie doswiadczenie badawcze NN/g w testach uzytecznosci. Trzy podane powody, dla ktorych "push" (tutorial narzucany od razu) zawodzi:
1. Paradoks aktywnego uzytkownika - ludzie chca natychmiastowego dostepu do produktu, nie do nauki o nim.
2. Informacja podana z gory wymaga zapamietania bez kontekstu uzycia - w momencie, gdy jest faktycznie potrzebna, jest juz zapomniana.
3. Odrzucenie (dismiss) tutorialu to dodatkowy wysilek uzytkownika.

Rekomendowana alternatywa: "pull" - pomoc wyzwalana sygnalem od uzytkownika (tooltips, coach marks, wizardy przy konkretnym kroku przeplywu), pojawiajaca sie dokladnie wtedy, gdy potrzebna.

Jawny wyjatek: "walkthroughs work for genuinely novel interaction paradigms (like AR onboarding)" - czyli push ma sens, gdy uzytkownik nie ma zadnego wczesniejszego modelu mentalnego, do ktorego mogl by odwolac interfejs. [Zrodlo 2]

Powiazany artykul NN/g o coach markach (nngroup.com/articles/mobile-instructional-overlay/, nie fetchowany w calosci, tylko przez wyniki wyszukiwania - traktuje jako zrodlo drugorzedne do potwierdzenia) formuluje podobna zasade: coach mark ma sens dla pojedynczej, niestandardowej interakcji, pokazywanej raz, w momencie dojscia do danej sekcji - nie jako blok kilkunastu ekranow na starcie. [Zrodlo 5]

### 3. Fundament teoretyczny: paradoks aktywnego uzytkownika

Carroll i Rosson, 1987 ("Paradox of the Active User", czesc pracy o kognitywnych aspektach HCI). Klasyczna, wielokrotnie cytowana praca (dostepna jako PDF na research.cs.vt.edu). Teza: uzytkownicy systemowo wolniej ucza sie systemu niz mogliby, poniewaz motywuje ich konkretny cel dzialania "tu i teraz", a nie potencjal calego systemu - i teza autorow jest, ze to NIE jest blad projektowy do naprawienia, tylko trwala cecha ludzkiego zachowania. [Zrodlo 3]

NN/g ma tez wlasny artykul streszczajacy to zjawisko dla praktykow UX (nngroup.com/articles/paradox-of-the-active-user/). [Zrodlo 4]

Znaczenie dla naszej kampanii: to jest najsilniejszy teoretyczny argument, DLACZEGO tour push na starcie ma strukturalna wade niezaleznie od jakosci wykonania - nawet idealnie zaprojektowany tour konkuruje z silna, udokumentowana tendencja uzytkownika, by go zignorowac i przejsc do dzialania.

### 4. Dane ilosciowe o skippowaniu i dlugosci - z zastrzezeniami co do zrodla

Znalazlam liczby o skippowaniu onboardingu (np. spadek ukonczenia z 72% przy 3 krokach do 16% przy 7 krokach; "skippable onboarding flows have 25% higher completion rates"), ale zrodlem tych liczb byly zbiorcze podsumowania wyszukiwarki bez jednoznacznego, zweryfikowanego przeze mnie pierwotnego artykulu z metodologia. Nie umiem wskazac konkretnego URL z metodologia dla tych dwoch liczb, wiec **nie licz ich jako ustalonych** - patrz sekcja "czego nie ustalilem". Ostroznosc jest tu tym bardziej uzasadniona, ze podobne zapytanie ujawnilo w tej samej kampanii wyszukiwania jawnie nieistniejacy "NN/g 2024 UX Benchmark Study" (patrz sekcja material marketingowy) - narzedzie wyszukiwania ma udokumentowana tendencje do halucynowania precyzyjnie brzmiacych statystyk przypisanych powaznym zrodlom.

### 5. Przypadek Vevo - nie do zweryfikowania u zrodla

Wielokrotnie cytowany w branzy case study: Vevo (aplikacja wideo) mial usunac ekrany tutorialu i test A/B na >160 000 uzytkownikow przez 28 dni mial pokazac wzrost ukonczonych logowan o ok. 9.7% i rejestracji o ok. 5.9%, przy niezmienionym odsetku pomijania. Oryginalny artykul (Apptimize, firma A/B-testingowa, nie sprzedawca tourow) pod adresem apptimize.com/blog/2015/10/vevos-app... **przekierowuje dzis (301) na airship.com** - Apptimize zostal przejety, tresc pierwotna nie jest juz dostepna pod tym adresem, a ja nie zweryfikowalam liczb bezposrednio u zrodla. Traktuje to jako **niepotwierdzone** - liczby moga byc prawdziwe, ale nie moge tego stwierdzic z pierwszej reki. Nie umieszczam ich w TL;DR jako dowodu. [Zrodlo 9, oznaczone jako niezweryfikowane]

### 6. Vendor data, ktora przyznaje sie do problemu (przydatna mimo konfliktu interesu)

Chameleon (sprzedawca oprogramowania do product tours) opublikowal analize ~15 milionow interakcji z tourami (kwiecien 2026 wg wyniku wyszukiwania) ze srednim wskaznikiem ukonczenia tour 61%, ale z jawnym zastrzezeniem, ze wysokie ukonczenie bez zmiany zachowania to "vanity metric" - uzytkownicy klikaja "Dalej", zeby zatrzymac przerwanie, a nie dlatego, ze sie ucza. Traktuje to jako material z sekcji marketingowej z uwagi na zrodlo, ale cytuje, bo idzie POD PRAD wlasnemu interesowi sprzedawcy - to zwieksza wiarygodnosc tego konkretnego twierdzenia (choc nie samej liczby 61%, ktora jest ich wlasna, niezalezna od audytu miara). [Zrodlo 8]

Podobnie Userpilot (sprzedawca) publikuje benchmark ukonczenia checklisty onboardingowej z 188 firm B2B SaaS: srednia 19.2%, mediana 10.1%. To sa dane z checklisty onboardingowej (lista zadan), nie z tour ze spotlightem - inny wzorzec (patrz R5), ale liczba jest interesujaca jako gorny sufit oczekiwan: nawet u sprzedawcy narzedzia sluzacego do robienia checklist, mediana ukonczenia to 1 na 10 uzytkownikow. [Zrodlo 7, material marketingowy, ale liczba z realnych danych produktowych klienta wielu firm - nie testu marketingowego]

### 7. Zaleznosc od typu produktu

Wszystkie trzy niezalezne zrodla (NN/g x2, Carroll/Rosson) zgodnie wskazuja jeden wyraznie wyodrebniony wyjatek: produkty wprowadzajace zupelnie nowy paradygmat interakcji (AR/VR wymieniane wprost), gdzie uzytkownik nie ma zadnego wczesniejszego modelu mentalnego. Poza tym wyjatkiem zaden z niezaleznych zrodel nie podaje dodatkowej segmentacji "dla ktorego typu SaaS tour dziala, a dla ktorego nie" opartej na danych - segmentacje wg zlozonosci produktu (np. "complex apps 50-65% completion vs simple 70-80%") pochodzily wylacznie z wynikow wyszukiwania bez zidentyfikowanego pierwotnego zrodla z metodologia, wiec nie licze ich jako ustalonych.

## MATERIAL MARKETINGOWY (co odrzucilem i dlaczego)

1. **"NN/g 2024 UX Benchmark Study" (rzekome +68% zaangazowania dla behavior-triggered guidance, 82% odrzucen tooltipa w 1.2 sekundy)** - po bezposrednim wyszukaniu na nngroup.com nie znalazlam zadnego takiego raportu. To wyglada na halucynacje wygenerowana przez warstwe podsumowania wyszukiwarki, ktora przypisala fikcyjne liczby prawdziwej marce dla wiarygodnosci. Odrzucone calkowicie, nie traktuje jako czesciowego dowodu nawet ze slabsza waga - to jest zmyslone zrodlo, nie slabe zrodlo.
2. **Jimo.ai (34% wyzsze ukonczenie dla action-based tours, 52% lepsza retencja 30-dniowa)** - Jimo sprzedaje product tours. Liczby bez ujawnionej metodologii, wielkosci proby ani okresu badania. Material marketingowy.
3. **Chameleon "61% average completion" i cala reszta ich bloga o metrykach** - Chameleon sprzedaje product tours. Uzylam jednego zdania z ich analizy (przyznanie sie do problemu vanity metric) jako cytatu ilustracyjnego, ale nie jako dowodu popierajacego skutecznosc tourow.
4. **Userpilot "100+ statystyk onboardingu"** i podobne "listy statystyk" agregujace liczby z wielu nieznanych zrodel - Userpilot sprzedaje oprogramowanie onboardingowe. Tego typu artykuly typowo mieszaja dane wlasne, dane cudze bez linku i szacunki - odrzucone jako niewiarygodne w calosci poza pojedynczym zweryfikowanym wyjatkiem opisanym w Ustaleniach.
5. **ProductLed (Smoobu +17% konwersji, BiggerPockets +80%)** - ProductLed sprzedaje konsulting/kursy product-led growth, nie sprzedaje bezposrednio oprogramowania do tourow, ale ma wprost komercyjny interes w promowaniu narracji "eksperymentowanie z onboardingiem dziala". Liczby bez podanej metodologii ani zrodla pierwotnego. Material marketingowy.
6. **HelpHero, SaaSFactor, UserGuiding, Arounda i podobne blogi agencyjne/produktowe** pojawiajace sie w wynikach wyszukiwania - wszystkie albo sprzedaja narzedzia do tourow, albo sprzedaja uslugi projektowe zwiazane z onboardingiem. Nie cytowane jako dowod.

## CZEGO NIE USTALILEM

- **Brak jakichkolwiek publicznie dostepnych danych o powrocie uzytkownikow do samouczka po pierwszym uzyciu.** To jest najwazniejsza luka dla naszego projektu, bo nasz samouczek ma byc dostepny ponownie pod przyciskiem. Nie znalazlam ani jednej liczby (vendor czy niezaleznej) mowiacej: X% uzytkownikow klika "pokaz ponownie" w danym okresie. Trzeba to zaprojektowac bez oparcia w danych, albo zmierzyc samemu po wdrozeniu.
- **Brak niezaleznego testu A/B na desktopowej aplikacji webowej typu "narzedzie + encyklopedia"** (najblizszy nasz przypadek). Jedyne twarde badanie (NN/g 2020) dotyczy prostych aplikacji mobilnych iOS. Nie wiem, czy wynik przenosi sie na desktop / SPA z wieloma trybami.
- **Brak wspolczesnego (2023-2026) niezaleznego powtorzenia badania NN/g z 2020 roku.** Cale case dla "tutoriale nie pomagaja" opiera sie na jednym eksperymencie sprzed piatego roku. Nie wiem, czy replikacja na nowszych wzorcach UI dalaby ten sam wynik.
- **Nie zweryfikowalam case study Vevo u zrodla** (link martwy/przekierowany) - liczby moga byc prawdziwe, ale nie moge tego potwierdzic.
- **Brak segmentacji wedlug zlozonosci produktu opartej na zweryfikowanym zrodle.** Popularne w sieci liczby "simple apps 70-80% vs complex apps 50-65%" nie maja zidentyfikowanego pierwotnego zrodla z metodologia.
- **Nie znalazlam zadnej pracy recenzowanej (peer-reviewed, spoza VR/AR) mierzacej bezposrednio wplyw linear product tour na retencje w oprogramowaniu B2B/desktop.** Prace CHI, ktore znalazlam, dotycza VR onboardingu, onboardingu pracownikow (HR) i systematycznych przegladow onboardingu deweloperow w projektach open source - zaden nie mierzy bezposrednio interesujacego nas wzorca UI.
- **Nie ustalilam, czy istnieje jakikolwiek publikowany test rozrozniajacy "tour ktory sam klika za uzytkownika" od "tour ktory tylko podswietla"** - to pytanie nalezy raczej do R4, ale zaznaczam, ze w zbiorze zrodel dla R1 taki podzial nie pojawil sie w zadnym niezaleznym zrodle.

## ZRODLA

1. Nielsen Norman Group, "Mobile Tutorials: Wasted Effort or Efficiency Boost?", Alita Kendrick, 8 marca 2020. https://www.nngroup.com/articles/mobile-tutorials/ - KONFLIKT INTERESOW: brak (NN/g nie sprzedaje oprogramowania do onboardingu; sprzedaje ogolne szkolenia/konsulting UX, co jest konfliktem niskiego rzedu, ale nie kieruje wnioskow w strone konkretnego narzedzia).
2. Nielsen Norman Group, "Onboarding Tutorials vs. Contextual Help", Page Laubheimer, 12 lutego 2023. https://www.nngroup.com/articles/onboarding-tutorials/ - KONFLIKT INTERESOW: brak (jw.).
3. Carroll, J.M. i Rosson, M.B., "Paradox of the Active User" (1987), PDF. https://research.cs.vt.edu/ns/cs5724papers/4.mental.mental.carroll.paradox.pdf - KONFLIKT INTERESOW: brak, klasyczna praca akademicka HCI.
4. Nielsen Norman Group, "Paradox of the Active User". https://www.nngroup.com/articles/paradox-of-the-active-user/ - KONFLIKT INTERESOW: brak.
5. Nielsen Norman Group, "Instructional Overlays and Coach Marks for Mobile Apps". https://www.nngroup.com/articles/mobile-instructional-overlay/ - KONFLIKT INTERESOW: brak. (Zrodlo drugorzedne w tym raporcie - nie fetchowane w calosci, tresc z wynikow wyszukiwania).
6. Nielsen Norman Group, "Mobile-App Onboarding: An Analysis of Components and Techniques". https://www.nngroup.com/articles/mobile-app-onboarding/ - KONFLIKT INTERESOW: brak. (Zrodlo drugorzedne, tresc z wynikow wyszukiwania, nie fetchowane w calosci).
7. Userpilot, benchmark ukonczenia checklisty onboardingowej (188 firm B2B SaaS, srednia 19.2%, mediana 10.1%). Zrodlo dotarlo przez podsumowanie wyszukiwarki (userpilot.com/blog/onboarding-checklist-completion-rate-benchmarks/) - KONFLIKT INTERESOW: TAK, Userpilot sprzedaje oprogramowanie do onboardingu. Material marketingowy, liczba cytowana z zastrzezeniem w Ustaleniach jako "gorny sufit oczekiwan", nie jako dowod skutecznosci tourow.
8. Chameleon, "The Hidden Metrics of Effective Product Tours" (analiza ~15 mln interakcji, 2026). https://www.chameleon.io/blog/effective-product-tour-metrics - KONFLIKT INTERESOW: TAK, Chameleon sprzedaje product tours. Material marketingowy, cytowany wylacznie za przyznanie problemu "vanity metric", ktore idzie pod prad ich wlasnemu interesowi.
9. Apptimize, "Why Vevo Got Rid of Onboarding Tutorial Screens" - URL martwy, przekierowuje 301 na airship.com. NIEZWERYFIKOWANE U ZRODLA. KONFLIKT INTERESOW: niski (Apptimize/Airship sprzedaje platforme eksperymentowania/A-B-testing i marketing mobilny, nie bezposrednio "tour software", ale ma interes w promowaniu narracji "testuj i usuwaj tarcie").
10. Jimo.ai, statystyki 34%/52% - dotarlo przez wyniki wyszukiwania, URL nie potwierdzony bezposrednim fetchem. KONFLIKT INTERESOW: TAK, Jimo sprzedaje product tours. Odrzucone, material marketingowy.
11. ProductLed, "Product-Led Experiments to Increase Activation & Retention", Yazan Sehwail. https://productled.com/blog/yazan-sehwail - KONFLIKT INTERESOW: TAK (posrednio - ProductLed sprzedaje szkolenia/konsulting PLG, ma interes w promowaniu narracji "eksperymentowanie z onboardingiem dziala"). Material marketingowy.
12. Zapytanie kontrolne "NN/g 2024 UX Benchmark Study" na nngroup.com - BRAK WYNIKOW potwierdzajacych istnienie takiego raportu. Uzyte jako dowod, ze wczesniej napotkane liczby przypisane NN/g byly halucynacja narzedzia wyszukiwania, nie prawdziwym zrodlem.
