# R2 - Automat czy zaproszenie

## TL;DR (5-8 punktow z sila dowodu)

1. **Nie istnieje zaden niezalezny, mierzalny eksperyment (A/B, badanie akademickie) porownujacy wprost "samouczek startuje sam" vs "samouczek na zaproszenie" z liczbami odrzucen/ukonczenia.** Sila dowodu: brak. To jest najwazniejsze ustalenie tego raportu - caly przemysl mowi o tym jezykiem opinii, nie danych. Zrodlo tego wniosku to brak wynikow po wielu proboch wyszukiwania (opisane w sekcji CZEGO NIE USTALILEM).

2. **Nielsen Norman Group (NN/g), zrodlo niezalezne, formuluje jasna zasade jakosciowa: automatyczne uruchamianie instrukcji "push" (w tym tour na starcie) jest zla praktyka, bo przerywa uzytkownika w momencie, gdy nie wie jeszcze, czy potrzebuje pomocy.** Sila dowodu: 1 niezalezne, wysokiej jakosci zrodlo (NN/g, artykul "Onboarding Tutorials vs. Contextual Help"), oparte na ich wieloletnich testach uzytecznosci, ale bez podanej liczby probantow w samym artykule.

3. **NN/g przeciwstawia dwa realne przyklady z wlasnych testow: tutorial Gates Carbon Drive uruchomiony automatycznie (zla ocena, uzytkownik zostawiony bez dalszego wsparcia) i tutorial ArcGIS dostepny na zadanie w panelu bocznym (lepsza ocena).** Sila dowodu: 1 zrodlo, ale oparte na konkretnych przypadkach testowanych przez NN/g, nie na opinii.

4. **Jedno realne badanie akademickie (eye-tracking, Paint 3D) istnieje w bazie SAGE, ale bylo niedostepne do weryfikacji tresci (blad 403 przy pobieraniu).** Sila dowodu: nieznana - cytuje w wynikach wyszukiwania jako "18 uczestnikow", ale bez dostepu do pelnego tekstu nie moge potwierdzic ani szczegolow metody, ani wnioskow. Traktuje to jako trop, nie jako ustalenie.

5. **Liczne "statystyki" typu "78% uzytkownikow porzuca tour do trzeciego kroku (Baymard)", "68% wyzsze zaangazowanie (NN/g 2024 UX Benchmark Study)", "34% wyzszy churn po pominieciu toura" pojawily sie w podsumowaniach wyszukiwarki, ale PRZY PROBIE weryfikacji zrodlowej strony NIE ISTNIEJA jako realna publikacja Baymard ani NN/g.** To jest dokladnie ryzyko "zatrutych zrodel" opisane w MASTER_PLAN - fabrykowane statystyki, prawdopodobnie generowane przez tresci SEO zoptymalizowane pod LLM ("AI slop"), ktore podszywaja sie pod cytaty prawdziwych instytucji. Sila dowodu: ZERO, aktywnie odrzucam te liczby. Szczegoly w sekcji MATERIAL MARKETINGOWY.

6. **Praktycy (nie sprzedawcy narzedzi) sa zgodni co do zasady wyzwalania kontekstowego zamiast wyzwalania po zaladowaniu strony**, ale ten konsensus jest jakosciowy (opinia wielu blogow branzowych) a nie ilosciowy. Sila dowodu: umiarkowana - wiele zgodnych glosow, zero twardych liczb, wiekszosc autorow sprzedaje oprogramowanie do tourow wiec ich "dane" trzeba olac.

7. **Wzorzec "zapamietaj gdzie uzytkownik przerwal i zaproponuj dokonczenie" ma realne, sprawdzalne precedensy produktowe** (CircleCI wraca do przerwanego kroku setupu, GitLab/roznizne narzedzia oferuja "replay z ustawien"). Sila dowodu: przykłady wdrozeniowe konkretnych firm, nie badanie porownawcze - ale sa to realne decyzje produktowe udokumentowane publicznie (changelog CircleCI).

8. **Rozroznienie "Pomin" (Skip) vs "X" (Zamknij) jest realnym tematem w systemach projektowania (np. dyskusje w projektach open source o konsolidacji przyciskow wyjscia), ale nie znalazlem zadnego zrodla ilosciowego pokazujacego rozna reakcje uzytkownikow na oba warianty.** Sila dowodu: niska - anegdotyczna praktyka projektowa, brak testu.

## USTALENIA

### 1. Automat vs zaproszenie: co mowi jedyne solidne zrodlo niezalezne

NN/g, w artykule "Onboarding Tutorials vs. Contextual Help" (nngroup.com/articles/onboarding-tutorials/), rozroznia dwa tryby prezentacji pomocy:

- **"push revelations"** - informacja pojawia sie z inicjatywy systemu, bez sygnalu ze strony uzytkownika, ze jej potrzebuje. Cytat z artykulu: "push revelations reveal new information out of context, without any specific indication that the user would benefit from the information at that moment."
- **"pull revelations"** - informacja pojawia sie na zadanie uzytkownika albo w reakcji na jego konkretne dzialanie (np. pierwsze uzycie funkcji, utkniecie na kroku).

Artykul podaje dwa konkretne, przetestowane w praniu przypadki:
- Aplikacja Gates Carbon Drive uruchamiala tutorial automatycznie, po czym **"dropped the user into the app without any further guidance"** - zostawiala uzytkownika bez wsparcia po zakonczeniu, wymuszajac zapamietywanie instrukcji na start.
- Aplikacja bankowa Chase automatycznie odpalala walkthrough funkcji w momencie, gdy uzytkownik byl w trakcie zglaszania oszustwa - czyli w najgorszym mozliwym momencie kontekstowym.
- Kontrprzyklad: ArcGIS **"wasn't activated automatically the first time the user logged in but rather was made available in the sidebar"** - uzytkownik odpalal go sam, kiedy chcial.

NN/g formuluje ogolna zasade (z tego samego artykulu i z powiazanego wideo "Onboarding: Skip it When Possible"): **"Onboarding instructions that users must digest before they start using an app or other product require attention and effort and thus reduce usability. They should be avoided as much as possible."** To jest zdanie kluczowe dla pytania R2 - NN/g nie mowi "automat jest zawsze zly", mowi "kazdy wymog przetrawienia instrukcji PRZED uzyciem produktu to koszt uzytecznosci", co dotyka automatu najbardziej, bo automat z definicji dzieje sie przed pierwszym samodzielnym dzialaniem.

Warto podkreslic ograniczenie: **artykul NN/g nie podaje w tresci dostepnej mi liczby probantow ani wskaznikow procentowych porzucen** - opiera sie na jakosciowej analizie przypadkow z ich testow uzytecznosci, co jest typowe dla metodologii NN/g (male proby, glebokie testy jakosciowe), ale oznacza, ze nie mam liczby do postawienia obok "78%" krazacego w materialach marketingowych.

### 2. Argument za natychmiastowym uruchomieniem z automatu (uczciwy test pomyslu Macieja)

Zeby dac pomyslowi Macieja uczciwy test, trzeba nazwac wprost jego mocne strony, ktore wynikaja logicznie nawet z materialu krytycznego:

- **Problem "discoverability"**: jesli samouczek jest tylko przyciskiem gdzies w interfejsie, spora czesc uzytkownikow nigdy go nie zauwazy i nigdy nie skorzysta - nawet jesli by im pomogl. To jest logiczna konsekwencja tego, ze uzytkownicy "want to start using the product right away" (paradoks aktywnego uzytkownika, cytowany w tym samym artykule NN/g za zrodlem pierwotnym). Push gwarantuje ekspozycje, pull nie gwarantuje niczego.
- **Nasza aplikacja to nie zwykly SaaS z jednym zadaniem do wykonania** - to jednoczesnie encyklopedia i konfigurator z 60 agentami, 62 presetami i kilkoma trybami (agenci/presety/zapisane/canvas/Hooki/Wzorce/encyklopedia). Przy tak duzej liczbie kotwic nawigacyjnych ryzyko, ze nowy uzytkownik w ogole nie zrozumie, gdzie zaczac, jest wieksze niz w typowym SaaS z jednym ekranem glownym. To przemawia za jakas forma proaktywnego wprowadzenia, tylko niekoniecznie za pelnym "prowadzeniem za reke" (por. R4).
- Argument, ze **"automat z widocznym Pomin" nie jest tym samym co "automat bez wyjscia"** - NN/g krytykuje przyklady, w ktorych uzytkownik zostal "dropped into the app without any further guidance" ALBO zlapany w zlym momencie (fraud w Chase). Krytyka dotyczy raczej **momentu i braku kontroli**, a nie samego faktu automatycznego pojawienia sie. Samouczek, ktory startuje automatycznie, ale natychmiast pokazuje jeden, latwy do zauwazenia przycisk wyjscia i nie blokuje reszty interfejsu, jest czyms innym niz przyklady krytykowane przez NN/g.

Wniosek posredni: **pomysl automatu nie jest "obalony" przez znalezione zrodla, ale znalezione zrodla wskazuja, ze warunkiem brzegowym jest natychmiastowa i oczywista mozliwosc wyjscia oraz unikanie momentu, w ktorym uzytkownik cos juz robi.**

### 3. Timing: zaladowanie strony vs po pierwszej interakcji

Zgodny, powtarzajacy sie poglad praktykow (blogi produktowe, nie akademickie): wyzwalanie na podstawie zachowania uzytkownika (pierwsza interakcja z funkcja, pierwsza nieudana proba, pierwszy powrot po przerwie) jest traktowane jako lepsze niz sztywne wyzwalanie czasowe/na zaladowaniu strony. Jedno ze zrodel (blog produktowy, nie vendor tour software) formuluje to ostro: **"a tour that appears on first login, before the user has chosen a path or hit friction, is usually just a dressed-up interruption"**. To jest jednak opinia praktyka na blogu firmowym typu growth/marketing, nie badanie - traktuje jako **sila dowodu niska-umiarkowana, spojna z kierunkiem NN/g, ale bez wlasnej metodologii**.

Zastosowanie do naszej aplikacji: nasza aplikacja laduje sie od razu z widocznym interfejsem (agenci/presety/canvas), wiec "zaladowanie strony" i "pierwsza interakcja" dziela sie ulamkiem sekundy przy pierwszym niekierowanym kliknieciu. Praktyczny wniosek: **jesli ma byc automat, sensowniejszy jest bardzo krotki odstep po pelnym zaladowaniu (np. animacja wejscia UI konczy sie, potem dopiero pojawia sie zaproszenie/pierwszy krok) niz odpalanie w momencie `DOMContentLoaded`, zeby uniknac efektu "wyskakujacej reklamy migajacej zanim uzytkownik zobaczyl produkt"**. To jest wniosek wyprowadzony logicznie z materialu, nie cytat.

### 4. Kompromis: bardzo krotki automat + dluzszy na zadanie

Nie znalazlem zadnego zrodla, ktore explicite testowaloby lub nawet opisywalo dwuwarstwowy model "3-krokowy automat + pelny tour na zadanie" jako przetestowany wzorzec z danymi. Natomiast **struktura tego typu jest spojna z dwoma niezaleznymi zasadami, ktore SA potwierdzone w materiale**:

- Zasada progressive disclosure z materialow juz posiadanych w projekcie (`v39/research/R2_interaktywne_wyjasnienia.md` wedlug MASTER_PLAN) - odslanianie warstwami zamiast na raz.
- VS Code (Microsoft, zrodlo niezalezne od branzy tour-software, dokumentacja publiczna API): mechanizm "Walkthroughs" jest zaprojektowany jako **wielokrokowa lista kontrolna (checklist) dostepna z panelu "Get Started"**, a NIE jako nakladka blokujaca cala aplikacje. Strona dokumentacji (code.visualstudio.com/api/ux-guidelines/walkthroughs) nie precyzuje wprost, czy panel otwiera sie automatycznie przy pierwszym uruchomieniu rozszerzenia, czy trzeba go otworzyc recznie - to jest luka (patrz CZEGO NIE USTALILEM), ale sam **format** (checklist krok-po-kroku, kazdy krok z wlasnym przyciskiem akcji, mozliwosc zamkniecia w kazdej chwili, stan zaznaczony/niezaznaczony trwaly) jest precedensem produktowym dla dojrzalego narzedzia deweloperskiego, ktore jest jednoczesnie edukacyjne - a to jest nasza sytuacja (R7).

Wniosek: **hybryda "krotki automat + dlugi na zadanie" nie ma bezposredniego potwierdzenia badawczego, ale jest zgodna z dwoma niezaleznymi, uznanymi wzorcami (progressive disclosure + checklist VS Code) i nie jest sprzeczna z zadnym znalezionym zrodlem krytycznym.** To rekomendacja o sredniej sile dowodu, oparta na spojnosci, nie na bezposrednim teście.

### 5. Wyjscie: Pomin vs X, "nie pokazuj wiecej"

Zrodla praktykow (przewaznie blogi produktowe i dyskusje w systemach projektowania) rozrozniaja funkcjonalnie oba przyciski:
- **"Skip" (Pomin)** czesto prowadzi do jakiegos podsumowania lub od razu konczy caly tour, pokazujac uzytkownikowi, co zostawia nieukonczone.
- **"X" (Zamknij)** jest zwykle traktowany jako uniwersalne, natychmiastowe wyjscie bez podsumowania.

Znalazlem realny przyklad decyzji projektowej idacej pod prad multiplikacji przyciskow: w jednym z projektow open source (PR "refactor(onboarding): single exit, no Esc, per-step skips only") autorzy swiadomie **zrezygnowali z wielu nakladajacych sie mechanizmow wyjscia na rzecz jednego, zeby zmniejszyc zamieszanie** co do tego, ktory przycisk robi co. To jest pojedynczy przypadek z konkretnego repozytorium kodu (nie firma-instytucja badawcza), ale pokazuje realny problem: **wielosc przyciskow wyjscia (Pomin + X + Esc) sama w sobie moze byc zrodlem konfuzji**, niezaleznie od tego, czy komunikat rozni sie semantycznie.

Nie znalazlem zadnego zrodla ilosciowego mowiacego, ze uzytkownicy INACZEJ reaguja na Pomin niz na X (np. inny odsetek powrotu, inne odczucie porazki). To jest **czysta luka** - projekt PIE Design System (pie.design), ktory sprawdzilem bezposrednio, mowi tylko ogolnie o potrzebie **"Close" icon button lub innej opcji zakonczenia**, bez rozroznienia miedzy wariantami.

Odnosnie "nie pokazuj wiecej": zadne z bezposrednio sprawdzonych zrodel (NN/g, PIE, Adobe Spectrum - strona zwrocila pusta tresc przy probie pobrania) nie opisuje wprost mechanizmu trwalego wylaczenia typu checkbox "nie pokazuj wiecej". To rowniez luka.

### 6. Drugie wejscie po pominieciu za pierwszym razem

Tutaj material jest bardziej fragmentaryczny, ale kilka konkretnych, sprawdzalnych precedensow produktowych istnieje:
- **CircleCI (realny, udokumentowany changelog produktu, nie marketing tour-vendor)**: jesli uzytkownik przerwie proces ustawien na konkretnym kroku (ankieta onboardingowa, strona "Connect Code", strona "Create Project"), **przy powrocie wznawia od przerwanego kroku zamiast zaczynac od nowa**. Zrodlo: circleci.com/changelog - opis realnej zmiany produktowej firmy.
- Wzorzec "replay z Ustawien" - kilka niezaleznie znalezionych przykladow (Adobe Connect, ogolne wzmianki w dyskusjach projektowych) pokazuje, ze **dawanie stalego, ale niewymuszonego dostepu do powtorzenia tour z poziomu ustawien jest powszechnym wzorcem projektowym**, choc nie mam zrodla ilosciowego mowiacego, jak czesto jest uzywany.

Nie znalazlem zadnego zrodla (akademickiego, NN/g, ani nawet solidnego blogu praktyka) ktore wprost odpowiadaloby na pytanie: **"czy pytac ponownie uzytkownika, ktory raz juz odmowil"**. Kazda wzmianka na ten temat pochodzila z blogow sprzedawcow narzedzi tour (patrz MATERIAL MARKETINGOWY), wiec traktuje to pytanie jako **nierozstrzygniete przez zewnetrzne zrodla** - odpowiedz musi wyjsc z logiki produktu, nie z cytatu.

Logiczny wniosek zgodny z zasada "state-based nie session-count-based" (ktora pojawila sie w kilku niezaleznie sformulowanych praktykach, choc bez wspolnego zrodla akademickiego): **lepszym sygnalem do ponownego zaproponowania samouczka jest zaobserwowane zachowanie wskazujace na zagubienie (np. uzytkownik nie dotknal zadnej z kluczowych kotwic z listy w MASTER_PLAN po X minutach), a nie sam fakt drugiej wizyty.** To rekomendacja wnioskowana, nie cytowana.

### 7. Pamietanie postepu i propozycja dokonczenia

Bezposrednich zrodel branzowych na ten konkretny mechanizm (zapamietaj krok + zaproponuj dokonczenie) jest malo, ale sa dwa niezalezne od siebie punkty odniesienia:
- CircleCI (opisane wyzej) - wznawianie od przerwanego kroku w procesie ustawien, nie w samouczku sensu stricto, ale mechanizm jest identyczny koncepcyjnie.
- Ogolna zasada UX (nie specyficzna dla tourow, ale szeroko przyjeta w projektowaniu formularzy i procesow wieloetapowych) mowi, ze **utrata postepu przy przerwaniu wieloetapowego procesu jest jednym z najczestszych zrodel frustracji** - to jest jednak wiedza ogolna z projektowania formularzy, nie specyficzne badanie o samouczkach, wiec przenosze ja tutaj z ostroznoscia jako wnioskowanie przez analogie, nie jako fakt potwierdzony dla tego konkretnego przypadku.

## REKOMENDACJA DLA NASZEGO PRZYPADKU (i czy pomysl z automatem sie broni)

**Pomysl automatu broni sie CZESCIOWO, pod trzema warunkami, ktore wynikaja wprost z materialu krytycznego, a nie z jego ominiecia:**

1. **Automat tak, ale krotki i z natychmiast widocznym, pojedynczym wyjsciem.** Krytyka NN/g dotyczy sytuacji, w ktorych uzytkownik zostaje zlapany bez kontroli (Chase) albo porzucony bez wsparcia po starcie (Gates Carbon Drive) - nie samego faktu, ze cos sie pojawilo automatycznie. Rekomendacja: 2-3-krokowy automatyczny wstep pokazujacy WYLACZNIE szkielet nawigacyjny (jezyk, tryby, gdzie jest koszt/pomoc), z jednym, oczywistym przyciskiem zamkniecia widocznym od pierwszej klatki - nie dwoma roznymi (Pomin + X), zeby uniknac problemu konfuzji opisanego w sekcji 5.

2. **Pelny, dluzszy samouczek (kregoslup z 12 kotwic) NIE powinien byc czescia automatu - powinien byc dostepny na zadanie, jak ArcGIS w przykladzie NN/g, a nie jak Gates Carbon Drive.** To jest wniosek najsilniej poparty przez jedyne solidne niezalezne zrodlo jakosciowe, jakie znalazlem (NN/g).

3. **Wyzwolenie automatu powinno nastapic po pelnym zaladowaniu interfejsu, nie w trakcie ladowania strony**, zeby unikac efektu nakladki "migajacej" zanim uzytkownik w ogole zobaczyl produkt - wniosek wyprowadzony z ogolnej zasady kontekstu NN/g plus zdroworozsadkowej analizy specyfiki naszej aplikacji (jednostronicowa, laduje sie natychmiast).

**Co NIE ma potwierdzenia i czego nie robic tylko dlatego, ze "wszyscy tak robia":**
- Nie ma dowodu, ze automat "dziala lepiej" lub "gorzej" niz zaproszenie w sensie liczbowym - kazda taka liczba widziana w tym researchu (78%, 68%, 34%, 123%) okazala sie niemozliwa do zweryfikowania w zrodle, do ktorego rzekomo nalezala.
- Nie warto kopiowac wzorca "checkbox nie pokazuj wiecej" ani logiki "pytaj ponownie po X dniach" bez wlasnego uzasadnienia - zadne niezalezne zrodlo tego nie testowalo dla tego typu aplikacji.

**Rekomendacja koncowa (srednia sila dowodu, oparta na spojnosci wielu czesciowych zrodel, nie na jednym rozstrzygajacym badaniu):** dwuwarstwowy model z pytania R2 (krotki automat + dluzszy na zadanie) jest broniony logicznie i nie jest sprzeczny z zadnym sprawdzonym zrodlem, ale to NIE jest "potwierdzone badawczo" - to najlepsza dostepna synteza fragmentow, ktora Maciej powinien czytac jako projekt do przetestowania na wlasnych uzytkownikach, a nie jako gotowy wniosek z literatury.

## MATERIAL MARKETINGOWY

Ponizsze twierdzenia pojawily sie w wynikach wyszukiwania jako rzekome fakty/statystyki, ale przy probie dotarcia do zrodla albo nie znalazlem strony, ktora by je faktycznie zawierala, albo strona okazala sie blogiem sprzedawcy narzedzia do tourow (konflikt interesow jawny). Umieszczam je tutaj wylacznie jako ostrzezenie, NIE jako dowod:

- "78% uzytkownikow porzuca tradycyjny product tour do trzeciego kroku (Baymard Institute)" - przy bezposredniej probie znalezienia zrodlowej strony Baymard z tym numerem, wyszukiwarka zwracala wylacznie strony o porzucaniu koszyka zakupowego (cart abandonment, inny temat) i blogi SEO. Nie znalazlem tej liczby na baymard.com. Traktuje jako niepotwierdzone, prawdopodobnie fabrykowane lub blednie przypisane.
- "Nielsen Norman Group 2024 UX Benchmark Study: 68% wyzsze zaangazowanie przy guidance wyzwalanym zachowaniem" - nie znalazlem takiej publikacji na nngroup.com. NN/g publikuje raporty i artykuly z jasnymi tytulami i autorami; ten "2024 UX Benchmark Study" nie pojawil sie w zadnym bezposrednim zrodle. Prawdopodobnie fabrykacja przypisana NN/g dla wiarygodnosci.
- "Amplitude 2024 Product Analytics Report: 76,3% statycznych tooltipow porzucanych w 3 sekundy" - nie zweryfikowane, nie sprawdzalem bezposrednio Amplitude, ale pojawilo sie w tym samym zdaniu co niepotwierdzona liczba Baymard, co obniza wiarygodnosc calego akapitu.
- "Uzytkownicy ktorzy sami wybieraja angazowanie sie w tour konczy go w 123% wyzszym odsetku niz przy wymuszonym" - zrodlo nie zostalo wskazane z nazwy ani URL w tresci, ktora to podala, tylko ogolnikowo "badania pokazuja". Odrzucam.
- Cytaty przypisywane Julie Zhuo ("The best guidance is the guidance users don't notice...") - brzmia jak wygenerowany, uogolniony tekst motywacyjny typowy dla blogow SEO, nie jak weryfikowalny cytat z konkretnej publikacji (ksiazki "The Making of a Manager" ani z jej bloga). Nie potwierdzam autentycznosci.
- Firmy sprzedajace narzedzia do tourow (Appcues, Userpilot, Pendo, WalkMe, Whatfix, Chameleon, Intro.js, Shepherd, UserGuiding, StepsKit, Jimo, GuideNow, usertourkit) publikuja materialy typu "X best practices 2026", ktore konsekwentnie konczy sie rekomendacja uzycia platformy tego typu. Chameleon publikuje "Product Tour Benchmarks & Best Practices" (PDF, chameleon.io) - jest to raport firmy sprzedajacej dokladnie to narzedzie, ktore ocenia, wiec kazda liczba stamtad idzie do tego koszyka, nie do dowodow, nawet jesli metodologia wyglada solidnie.
- StepsKit blog "Onboarding Tours That Don't Get Skipped" - tytul sam w sobie jest sprzedaza narzedzia (StepsKit to platforma tego typu), tresc cytowana w researchu ("multi-step tooltip sequences... completion rates drop sharply after step 5") brzmi wiarygodnie, ale pochodzi od sprzedawcy, wiec ląduje tutaj, nie w USTALENIACH.

## CZEGO NIE USTALILEM

1. **Nie ma zadnego znalezionego, bezposrednio zweryfikowanego eksperymentu A/B lub badania akademickiego porownujacego wprost "auto-start" vs "zaproszenie" dla samouczka w aplikacji, z konkretnymi liczbami odrzucen/ukonczenia/dalszego uzycia.** To jest najwieksza luka calego pytania R2. Kazda liczba, ktora wygladala obiecujaco, okazala sie niesprawdzalna u zrodla.

2. **Nie potwierdzilem tresci badania eye-trackingowego Paint 3D (SAGE Journals, doi 10.1177/10648046211026028)** - strona zwrocila blad 403 przy probie pobrania pelnej tresci. Wyszukiwarka wspomniala "18 uczestnikow", ale nie moge potwierdzic tej liczby ani metody z pierwszej reki. Warto, zeby ktos z dostepem instytucjonalnym sprawdzil ten artykul recznie - jesli sie potwierdzi, byloby to jedyne prawdziwie akademickie zrodlo w tym raporcie.

3. **Nie ustalilem, czy VS Code Walkthroughs otwieraja sie automatycznie przy pierwszej instalacji rozszerzenia, czy tylko na zadanie z panelu "Get Started".** Oficjalna dokumentacja UX guidelines tego nie precyzuje. Sprawdzenie wymagaloby zainstalowania konkretnego rozszerzenia i obserwacji zachowania, co wykracza poza ten research literaturowy.

4. **Nie znalazlem zadnego zrodla ilosciowego na temat roznicy reakcji uzytkownikow na przycisk "Pomin" vs "X".** Jest to potraktowane w materialach jako oczywiste rozroznienie funkcjonalne, ale bez zadnego testu pokazujacego, czy ktorys wariant jest odbierany lepiej/gorzej.

5. **Nie znalazlem zadnego zrodla odpowiadajacego wprost na pytanie "czy pytac ponownie uzytkownika przy drugim wejsciu, ktory pominal za pierwszym razem".** Rekomendacja w tym raporcie (bazowac na zachowaniu, nie na liczbie sesji) jest wnioskiem logicznym wyprowadzonym z ogolnej zasady "state-based triggers", a nie cytatem z konkretnego zrodla ktore odpowiadaloby na to pytanie wprost.

6. **Nie ustalilem zadnej liczby minimalnego/maksymalnego czasu opoznienia miedzy zaladowaniem strony a pokazaniem automatycznego kroku.** Rekomendacja "po pelnym zaladowaniu UI, nie w trakcie ladowania" jest wnioskiem jakosciowym, nie ma zrodla z konkretna liczba milisekund/sekund.

7. **Nie sprawdzilem strony Adobe Spectrum Coach Mark bezposrednio** - WebFetch zwrocil pusta tresc (prawdopodobnie strona renderowana w JS, niedostepna dla prostego pobierania). Ten design system moglby zawierac przydatne, autorytatywne wytyczne (Adobe to duza firma z wlasnym zespolem UX, nie sprzedawca tour-software), ale pozostaje niesprawdzony.

8. **Nie znalazlem zadnego zrodla specyficznie o aplikacjach typu "encyklopedia + konfigurator jednoczesnie"** w kontekscie pytania R2 (to jest bardziej domena R7, ale mialoby wplyw na odpowiedz tutaj tez) - wiec rekomendacja w tym raporcie jest ogolna, nie dopasowana do tej specyficznej kategorii produktu.

## ZRODLA (URL + etykieta konfliktu interesow)

- https://www.nngroup.com/articles/onboarding-tutorials/ - NIEZALEZNE. Nielsen Norman Group nie sprzedaje oprogramowania do tourow, dochod z konsultingu/badan/szkolen UX ogolnie. Glowne zrodlo tego raportu.
- https://www.nngroup.com/videos/onboarding-skip-it-when-possible/ - NIEZALEZNE (NN/g). Tresc wideo nie zostala w pelni zweryfikowana (dostep tylko do opisu strony), cytat ograniczony do jednego zdania podsumowania.
- https://gitlab.com/gitlab-org/growth/ui-ux/-/issues/21 - NIEZALEZNE w sensie: to wewnetrzny raport z wywiadow uzytkownikow GitLab, publikowany jawnie jako open issue, nie material marketingowy sprzedajacy narzedzie do onboardingu. Mozliwy konflikt interesow innego typu: GitLab moze miec motywacje pokazywac wlasny produkt korzystnie, ale konkretne cytaty uzytkownikow ("far more likely to read help content when placed in a relevant location") sa opisem wywiadow, nie reklama.
- https://circleci.com/changelog/return-users-to-their-previous-step-if-they-leave-during-setup-and-come-back - NIEZALEZNE w sensie braku sprzedazy narzedzi tour; to opis wlasnej zmiany produktowej CircleCI (firma narzedzi CI/CD, nie onboarding-tool vendor).
- https://code.visualstudio.com/api/ux-guidelines/walkthroughs - NIEZALEZNE. Microsoft, dokumentacja API wlasnego produktu (VS Code), nie sprzedaje osobnego narzedzia do tourow.
- https://pie.design/patterns/onboarding-and-guided-tour/web-guidance/ - PRAWDOPODOBNIE NIEZALEZNE (design system, nie zidentyfikowalem wprost wlasciciela w trakcie fetchu, ale format i tresc wskazuja na wewnetrzny design system firmy, nie produkt sprzedawany jako narzedzie do tourow). Traktowac z ostroznoscia - nie potwierdzilem wlasciciela.
- https://michaellisboa.com/blog/four-reasons-coach-marks-onboarding-tours-dont-work/ - NIEZALEZNE OD SPRZEDAWCOW TOUROW, ale autor sprzedaje uslugi audytu UX (Alucrative) - czesciowy konflikt interesow innego typu (moze byc zmotywowany pokazywac, ze "latanie UX" jest lepsze niz "dodawanie tourow", bo to sprzedaje jego uslugi). Cytuje jedno realne zrodlo wtorne (NN/g "Paradox of the Active User"), zero danych wlasnych.
- https://journals.sagepub.com/doi/full/10.1177/10648046211026028 - NIEZALEZNE (publikacja akademicka SAGE), ALE TRESC NIE ZOSTALA ZWERYFIKOWANA (blad 403). Nie cytowane jako ustalenie, tylko jako niepotwierdzony trop.
- https://spectrum.adobe.com/page/coach-mark/ - NIEZALEZNE (Adobe, wewnetrzny design system), ALE TRESC NIE ZOSTALA POBRANA (pusta odpowiedz). Nie cytowane jako ustalenie.
- Zrodla odrzucone i umieszczone w MATERIAL MARKETINGOWY: chameleon.io (sprzedawca), appcues.com (sprzedawca), userpilot.com (sprzedawca), userguiding.com (sprzedawca), usertourkit.com (sprzedawca/porownywarka sprzedawcow), stepskit.com (sprzedawca), jimo.ai (sprzedawca), whatfix.com (sprzedawca), guideflow.com (sprzedawca), saasfactor.co (agencja marketingowa promujaca m.in. narzedzia tego typu), productfruits.com (sprzedawca) - wszystkie jawnie sprzedaja lub promuja oprogramowanie do product tours/onboardingu, kazda liczba z tych domen zostala wykluczona z sekcji USTALENIA.
