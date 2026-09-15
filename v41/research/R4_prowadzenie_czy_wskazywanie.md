# R4 - Prowadzenie za reke kontra wskazywanie palcem

Researcher: R4 (kampania v41)
Pytanie zlecajace: MASTER_PLAN.md, R4. Nie powtarzam zakresu `v39/research/R2_interaktywne_wyjasnienia.md`
(dostepnosc nakladek WCAG juz tam opisana szczegolowo - focus, klawiatura, drag alternatywy, kontrast)
ani `v39/research/R5_co_pomoglo_zrozumiec.md` (Diataxis, metafory). Tutaj: WYLACZNIE forma sterowania
tourem (kto klika) i jej pulapki inzynierskie.

---

## TL;DR (sila dowodu przy kazdym punkcie)

1. **Jedyne znalezione kontrolowane badanie porownujace tutorial z brakiem tutorialu (NN/g, n=70,
   4 aplikacje) nie wykazalo poprawy skutecznosci zadania (91% vs 94%, p=0.443) ani czasu
   (p>0.1), a wykazalo STATYSTYCZNIE ISTOTNE pogorszenie postrzeganej latwosci zadania u osob,
   ktore obejrzaly tutorial (SEQ 4.92 vs 5.49, p=0.047)** [1]. Sila dowodu: WYSOKA jak na ten temat
   (jedyne znalezione dane z grupa kontrolna i p-wartosciami), ale to JEDNO badanie, na tutorialach
   typu "talia kart" przy starcie, nie na tourach z podswietleniem elementow UI - nie ekstrapolowac
   wprost na wszystkie formy.

2. **Trzeci wariant (kaz uzytkownikowi kliknac samemu, tour czeka na akcje) ma NAJSILNIEJSZE
   poparcie niezalezne, ale posrednie**: pochodzi nie z badan nad tourami, tylko z literatury o
   uczeniu sie przez dzialanie kontra obserwacje (aktywne przetwarzanie buduje wiecej sciezek
   nerwowych niz bierna obserwacja) [2][3] oraz z formalnej rekomendacji VS Code, zeby kazdy krok
   walkthrough mial czasownikowa akcje do wykonania, a nie tekst do przeczytania [4]. Sila dowodu:
   SREDNIA - zero badan porownujacych wprost "tour klika sam" vs "tour czeka az user kliknie" na tej
   samej probie uzytkownikow.

3. **Najbardziej cytowana liczba w tym temacie ("78% uzytkownikow porzuca tour do trzeciego kroku",
   przypisywana Baymard Institute) NIE ZNALAZLA POTWIERDZENIA na baymard.com i jest prawdopodobnie
   sfabrykowana lub zle przypisana w lancuchu cytowan** [5][6]. Opisano ponizej jako osobny przypadek
   ostrzegawczy, dokladnie ten typ zrodla, przed ktorym ostrzega MASTER_PLAN.

4. **Dane o dlugosci toru (spadek ukonczenia z 72% przy 3 krokach do 16% przy 7+ krokach) pochodza
   z Chameleon, firmy sprzedajacej oprogramowanie do tourow, na podstawie ich wlasnych 15 milionow
   interakcji** [7][8]. To dane realne (firma mierzy wlasny produkt), nie zmyslona liczba jak
   punkt 3, ale majace jawny konflikt interesow i brak recenzji zewnetrznej - do koszyka
   marketingowego, nie dowodowego. Nalezy do pytania R3, tu tylko odnotowane bo powtarza sie w
   zrodlach dla R4.

5. **NN/g formalnie stawia interaktywne wyjasnienie kontekstowe (contextual help, wyzwalane akcja
   uzytkownika) wyzej niz gorny tutorial/tour, z uzasadnieniem: informacja poza kontekstem jest
   trudna do zapamietania w momencie, w ktorym jest potrzebna** [9][10]. Sila dowodu: SREDNIA -
   to stanowisko redakcyjne NN/g oparte na wieloletnim doswiadczeniu badawczym firmy, nie
   pojedyncze badanie z liczbami (wyjatek: punkt 1 to jest liczbowe badanie NN/g).

6. **Spotlight z przyciemnieniem tla ma jeden potwierdzony efekt pozytywny (kierowanie uwagi na
   duzych ekranach, badanie akademickie Autodesk Research) i jeden udokumentowany efekt uboczny
   (ciekawosc co jest zaslonione tworzy NOWA dystrakcje)** [11][12]. Oba efekty pochodza z roznych
   kontekstow (duzy ekran wspoldzielony vs pojedynczy interfejs), wiec nie skladaja sie w jedna
   spojna rekomendacje bez zastrzezen.

7. **Znane biblioteki open-source do tourow (Shepherd.js, Driver.js, Intro.js) maja udokumentowane,
   powtarzajace sie problemy z dostepnoscia i stabilnoscia** (brakujace role ARIA na nakladce,
   zlamany fokus pod spotlightem, przesuniecia tooltipa o setki pikseli po zmianie ukladu) [13][14].
   Sila dowodu: SREDNIA - pochodzi z serwisow porownawczych sprzedajacych konkurencyjne narzedzia
   (konflikt interesow), ale konkretne, sprawdzalne w repozytoriach problemy techniczne, nie liczby
   marketingowe.

8. **Nie znaleziono ani jednego niezaleznego (nie-sprzedawcy) zrodla, ktore wprost porownuje trzy
   warianty z pytania: "tour klika sam" vs "tour tylko wskazuje" vs "tour czeka az user kliknie".**
   To jest najwazniejsza luka calego raportu - patrz sekcja CZEGO NIE USTALILEM.

---

## USTALENIA

### Prowadzenie za reke (tour wykonuje akcje za uzytkownika)

**Kiedy dziala.** Zaden ze znalezionych niezaleznych zrodel nie testuje wprost tego wariantu jako
osobnej kategorii - najblizszy dowod to obserwacja NN/g, ze tresc onboardingowa "ktora uzytkownik
musi strawic, zanim zacznie uzywac produktu, wymaga uwagi i wysilku, a wiec obniza uzytecznosc"
i "powinna byc unikana w miare mozliwosci" [10]. To zdanie nie mowi wprost o tourach klikajacych
za uzytkownika, ale opisuje mechanizm szkody: kazda tresc bierna do przetworzenia przed uzyciem
narzedzia to koszt poznawczy zanim narzedzie cokolwiek dostarczy.

Argument za: gdy cel jest **pokazac cos, co samo w sobie jest skomplikowane do skonfigurowania**
(przyklad z MASTER_PLAN: kreator wlasnego agenta, widok encyklopedii), automatyczne otwarcie i
wypelnienie pokazuje docelowy efekt w jednym rzucie oka, bez wymagania od uzytkownika, zeby sam
zgadywal, ktore pole kliknac pierwsze. To jest forma "przykladu wypelnionego" (worked example) -
uczenie sie z gotowych przykladow jest korzystne, gdy material jest nowy i zlozony, a uczacy sie
nie ma jeszcze schematu, w ktorym umiescic wlasne dzialanie (worked-example effect, literatura
Cognitive Load Theory juz opisana w `v39/research/R2`, nie powtarzam tu zrodel).

**Kiedy szkodzi.** Dwa niezalezne mechanizmy szkody:
- **Bierna obserwacja buduje slabszy model mentalny niz dzialanie.** Badanie neurologiczne (Djavad
  Mowafaghian Centre for Brain Health, UBC) pokazuje, ze u osob, ktore tylko obserwowaly zadanie
  przed wykonaniem, aktywuje sie mniej obszarow mozgu, reakcje sa wolniejsze i wiecej bledow niz
  u osob, ktore cwiczyly zadanie samodzielnie; grupa cwiczaca miala najwiecej aktywnosci w korze
  przedruchowej (planowanie ruchu i zachowania) [2]. Sila dowodu: pojedyncze zrodlo (popularne
  streszczenie badania, nie link do oryginalnej publikacji), dotyczy uczenia motorycznego, nie
  wprost UI, wiec analogia jest posrednia.
- **NN/g badanie (patrz TL;DR pkt 1) pokazuje, ze samo OBEJRZENIE instrukcji (bez samodzielnego
  dzialania) NIE poprawia wyniku, a POGARSZA subiektywne poczucie latwosci zadania** [1]. To
  najsilniejszy dowod przeciw "tour robi wszystko za uzytkownika, uzytkownik tylko patrzy" - jesli
  samo patrzenie na instrukcje juz obniza poczucie latwosci bez korzysci w wyniku, to tym bardziej
  patrzenie na tour, ktory sam klika, ryzykuje ten sam efekt przy jeszcze mniejszym zaangazowaniu
  uzytkownika.

**Wniosek dla dwoch punktow, ktore wlasciciel produktu chce prowadzic za reke (kreator wlasnego
agenta, przykladowy widok encyklopedii):** dowody sa spojne z jednym zastrzezeniem - prowadzenie
za reke jako **pokaz gotowego rezultatu** (worked example) ma uzasadnienie, dopoki tour nie udaje,
ze uzytkownik cos "zrobil". Ryzykowne jest podpisanie automatycznie klikanego kroku jako "Twoj
pierwszy agent gotowy!" - to fabrykuje poczucie sprawstwa, ktorego nie bylo, i przy nastepnym
realnym uzyciu kreatora rozbieznosc miedzy "widzialem to dziala" a "nie pamietam jak to zrobic"
wychodzi na jaw. Zaden zrodlo nie nazywa tego zjawiska wprost pod ta nazwa - to wniosek wlasny z
polaczenia [1] i [2], oznaczony jako taki.

### Wskazywanie palcem (tour tylko podswietla i opisuje)

**Kiedy dziala.** Formalna rekomendacja NN/g dla "contextual help" (podpowiedzi kontekstowe,
najblizszy krewny czystego wskazywania) jest jednoznaczna: sa "generalnie skuteczniejsza metoda
dostarczania pomocy" niz onboarding z gory, "zazwyczaj dlatego, ze uzytkownicy sa zmotywowani, aby
na nie zwrocic uwage" - bo pojawiaja sie w momencie, w ktorym user juz ma pytanie [9]. Kluczowy
mechanizm: wskazywanie nie wymaga od uzytkownika oddania kontroli nad kursorem/klawiatura, wiec
nie koliduje z niczym, co user robi rownolegle, i jest tanie do zaimplementowania (nie trzeba
symulowac klikniec w interfejsie, ktory user moze miec juz czesciowo otwarty).

**Kiedy szkodzi.** NN/g (via [10] i przez ogolna zasade "avoid onboarding content users must
digest") oraz literatura o popupach [15] wskazuja na to samo ryzyko: czysty tekst-z-strzalka
wymaga od uzytkownika WLASNEGO wysilku, zeby przelozyc slowa na klikniecie ("kliknij TU, zeby
zobaczyc TAM") - a to jest dokladnie ten typ obciazenia, ktory badanie NN/g z tabeli w punkcie 1
mierzylo poprzez SEQ i pokazalo jako pogorszenie [1]. Wskazywanie palcem nie eliminuje problemu
biernosci, po prostu przenosi cwiczenie z "tour klika" na "user musi sam znalezc element i
kliknac", co jest lepsze pod wzgledem budowania modelu mentalnego (patrz [2][3]), ale gorsze pod
wzgledem tarcia, jesli opis jest niejednoznaczny.

---

## TRZECI WARIANT: kaz uzytkownikowi kliknac samemu

To jest, zgodnie z sugestia MASTER_PLAN, prawdopodobnie najwazniejsze ustalenie tego raportu -
bo dowody, choc posrednie, konsekwentnie wskazuja w jedna strone.

**Definicja robocza.** Tour podswietla element I opisuje go slowami (jak wariant "wskazywanie
palcem"), ALE nie przechodzi do nastepnego kroku, dopoki uzytkownik faktycznie nie wykona akcji
(klikniecie wlasciwego elementu, wpisanie czegos, otworzenie panelu). To jest oficjalny wzorzec
"interactive walkthrough" u dostawcow tourow [16][17], ale u nich definicja miesza sie z
marketingiem ("uzytkownik nie moze pominac kroku") - tutaj patrzymy wylacznie na mechanizm
edukacyjny, nie na cel biznesowy (aktywacja/konwersja), ktory dostawcy przypisuja temu wzorcowi.

**Dowod niezalezny 1 - VS Code, formalna wytyczna produktowa (nie marketing, wewnetrzny standard
projektowy edytora uzywanego przez miliony developerow).** Oficjalna dokumentacja API dla
"Walkthroughs" instruuje autorow rozszerzen: "Provide actions (...) for each step. Use verbs
where possible" - kazdy krok ma miec czasownikowa akcje do wykonania, nie tylko tekst [4].
Rownoczesnie ta sama wytyczna ostrzega przed nadmierna liczba krokow w jednym walkthrough [4].
To jest jawne poparcie dla wzorca "krok = akcja", ale zrodlo NIE definiuje explicite, czy VS Code
czeka na klikniecie, czy pozwala przejsc dalej bez wykonania akcji - trzeba to policzyc jako
wytyczna redakcyjna, nie jako zmierzony wynik.

**Dowod niezalezny 2 - literatura o uczeniu przez dzialanie.** Trzy niezalezne zrodla (badanie
neurologiczne UBC [2], przeglad "Active Learning Strategies" TechClass [3], oraz mechanizm opisany
juz w `v39/research/R2` przy okazji Nicky Case "Puzzle It Out" - "wymusza aktywne myslenie zamiast
biernego czytania, dowod zrozumienia przed postepem") zgadzaja sie co do jednego mechanizmu:
aktywne wykonanie dzialania buduje silniejszy slad pamieciowy niz obserwacja tego samego dzialania.
Zadne z tych trzech zrodel nie testuje tego na tourach aplikacji SaaS - dwa sa ogolna literatura
edukacyjna/neurologiczna, jedno jest z innej kampanii tego samego projektu (design tekstow
interaktywnych, nie tourow).

**Jak wypada wobec dwoch pozostalych - ocena bez fabrykowania liczby.** Zaden zrodlo nie podaje
liczby porownujacej wprost te trzy warianty na tej samej probie. Rekonstrukcja logiczna z
dostepnych czesci:
- Wariant "sam klika" ryzykuje efekt z [1] (bierna obserwacja, brak poprawy wyniku, gorsze
  subiektywne poczucie latwosci) w NAJWIEKSZYM stopniu, bo user nie robi NIC.
- Wariant "tylko wskazuje" wymaga od uzytkownika samodzielnego przelozenia slow na akcje, co jest
  aktywne, ale generuje tarcie jesli opis jest niejasny (ryzyko z popupow [15] - user moze nie
  zrozumiec, gdzie kliknac, i porzucic tour z frustracji, nie z powodu zrozumienia).
- Wariant "czeka az klikniesz" laczy aktywne dzialanie (korzysc z [2][3]) z jednoznacznoscia (bo
  tour moze podswietlic dokladnie WLASCIWY element i nie pozwolic pojsc dalej, dopoki nie zostanie
  kliniety - eliminujac ryzyko "nie wiem gdzie kliknac" z wariantu drugiego).

To jest wniosek zlozony z czesci, nie cytat z jednego zrodla - oznaczony jawnie jako REKONSTRUKCJA
tego zespolu, sila dowodu SREDNIA-NISKA (logicznie spojna, ale niepotwierdzona bezposrednim
pomiarem porownawczym).

**Zastrzezenie kluczowe.** Wariant trzeci ma wlasna pulapke, ktora zaden z dwoch pozostalych nie
ma: co sie dzieje, gdy uzytkownik NIE wie, jak wykonac zadana akcje i utknie na kroku? Zaden z
przejrzanych zrodel (w tym oficjalna wytyczna VS Code [4]) nie opisuje mechanizmu ratunkowego
(np. "kliknij tutaj 3 razy bez skutku -> pokaz dodatkowa podpowiedz" albo przycisk "zrob to za
mnie" jako awaryjne wyjscie). To jest luka do decyzji Macieja, nie ustalenie z badan - patrz
CZEGO NIE USTALILEM.

---

## PULAPKI TECHNICZNE STEROWANIA APLIKACJA

Ten dzial dotyczy WYLACZNIE wariantu "tour sam klika/otwiera/wypelnia", bo tylko on wymaga od
tour-silnika programowej ingerencji w stan aplikacji (pozostale dwa warianty co najwyzej czytaja
DOM, nie modyfikuja stanu).

**Sprzatanie po sobie i przywracanie stanu.** Zrodlo inzynierskie (Sentry Engineering Blog,
niezalezne od firm sprzedajacych tour software - to blog firmy monitoringu bledow opisujacy WLASNA
implementacje tourow w swoim produkcie) opisuje konkretne decyzje projektowe swojego silnika
tourow w React: nakladka tourowa jest renderowana W MIEJSCU oryginalnego elementu (nie owija go w
osobny kontener na stale), a autorzy explicite ostrzegaja przed "re-parentowaniem" (przenoszeniem)
`children` miedzy drzewami komponentow, bo to wywoluje cykle mount/unmount, ktore z kolei
"wywoluja kosztowne przerysowania, przeliczenia layoutu, wywolania API lub inne efekty uboczne"
[18]. Wniosek praktyczny: tour, ktory programowo otwiera panel (np. `panAg`), powinien wywolywac
DOKLADNIE te sama funkcje/event, ktora wywolalby klik uzytkownika, a nie osobna sciezke kodu -
inaczej po zakonczeniu tour musi recznie pamietac i cofnac kazdy efekt uboczny osobno (otwarty
panel, zmieniony filtr, wypelnione pole formularza), co przy wielu krokach staje sie rosnaca liste
rzeczy do "odkrecenia" w dowolnej kolejnosci przerwania.

Ten sam artykul NIE opisuje (i wprost tego brakuje, sprawdzono to explicite) sprzatania stanu po
zakonczeniu tour, restauracji aplikacji, kolizji z klikami uzytkownika ani obslugi przerwanego
tour - co samo w sobie jest ustaleniem: nawet dojrzala firma inzynierska publikujaca o wlasnym
silniku tourow nie uznala tych problemow za warte opisania w publicznym poscie, co moze znaczyc
albo ze rozwiazali je trywialnie, albo ze nie rozwiazali i nie napisali o tym (nie da sie
odroznic z tego zrodla).

**Kolizja z wlasnymi kliknieciami uzytkownika.** Nie znaleziono zadnego niezaleznego zrodla
opisujacego wprost ten scenariusz (co sie dzieje, gdy user klika COS INNEGO niz podswietlony
element, podczas gdy tour "czeka"). Zrodla porownawcze bibliotek open-source [13][14] wspominaja
POKREWNY problem: "zlamany fokus pod spotlightem" (broken input focus under spotlight) zglaszany
dla Driver.js v2 [14] - co sugeruje, ze nakladka spotlight moze przechwytywac zdarzenia klawiatury/
fokusu w sposob niezamierzony, blokujac wlasnie te interakcje, ktore user probuje wykonac. To jest
dowod POSREDNI (opis buga w konkretnej bibliotece, nie ogolna zasada), ale konkretny i sprawdzalny.

**Co gdy uzytkownik przerwie w polowie.** Zaden przejrzany zrodl (marketingowy ani niezalezny) nie
opisuje wprost polityki "co jesli user zamknie tour na kroku 4 z 9". Jest to CALKOWITA luka w
znalezionym materiale - patrz CZEGO NIE USTALILEM. Jedyna posrednia wskazowka to og\olna zasada
WCAG SC 2.2.2 Pause, Stop, Hide (juz opisana w `v39/research/R2`, nie powtarzam), ktora wymaga,
zeby kazda automatycznie poruszajaca sie tresc miala mechanizm zatrzymania - to jest wymog
DOSTEPNOSCI, nie odpowiedz na pytanie "co pokazac po zamknieciu", ale wymusza, zeby "zamkniecie"
w ogole bylo mozliwe w kazdym momencie.

**Co gdy element zniknal.** Zrodlo inzynierskie [18] opisuje mechanizm zapobiegawczy, nie
naprawczy: silnik tourow wymaga, zeby WSZYSTKIE kroki "zarejestrowaly sie" (zaladowaly swoje
elementy docelowe), zanim tour w ogole moze wystartowac - kod cytowany w zrodle: tour nie
uruchamia sie, jesli `state.isRegistered` jest falszywe [18]. To zapobiega startowi tour na
nieistniejacym elemencie, ale NIE opisuje co sie dzieje, jesli element ZNIKNIE W TRAKCIE (np. user
przelaczy jezyk lub motyw w polowie tour, a podswietlany element ma inny selektor w drugim
jezyku) - to jest scenariusz specyficzny dla tej aplikacji (PL/EN, `themeToggle`), nieopisany w
zadnym znalezionym zrodle.

---

## MATERIAL MARKETINGOWY

Ponizsze twierdzenia pochodza z firm sprzedajacych oprogramowanie do tourow/onboardingu (Appcues,
Userpilot, Chameleon, Digia Engage/Nudges, Product Fruits, Guideflow, UserTourKit, OnboardJS,
SaaS Factor, StepsKit, Jimo, Amplitude*) lub z serwisow zarabiajacych na afiliacji/porownaniach
tych narzedzi. Traktowane jako dowod SLABY lub ZEROWY, nie jako fakt.

*Amplitude sprzedaje analytics, nie tour-software wprost, ale artykul cytowany jest webinarem
promujacym ich produkt do budowy tourow - graniczny przypadek, tez tutaj.

- **"78% uzytkownikow porzuca tradycyjny tour do trzeciego kroku (Baymard Institute)"** - cytowane
  przez digia.tech [6], ktore linkuje do saasfactor.co [5], ktore rzekomo "przypisuje" liczbe
  Baymardowi. Bezposrednie przeszukanie baymard.com NIE ZNALAZLO zadnej strony z ta liczba ani z
  tematem porzucania tourow [19]. To jest klasyczny lancuch prania cytowania: A cytuje B, B cytuje
  C, C nie istnieje w sprawdzalnej formie. **Traktowac jako niepotwierdzone, prawdopodobnie
  sfabrykowane lub zle przypisane. Nie uzywac w syntezie jako fakt.**
- **"Tylko 18,4% interakcji z tooltipem trwa 5+ sekund"** - pojawilo sie w tym samym zbiorze
  wynikow wyszukiwania co punkt powyzej, bez mozliwosci zweryfikowania zrodla pierwotnego w
  dostepnym czasie badania. Traktowac z tym samym zastrzezeniem.
- **"3-krokowe tury: 72% ukonczenia, 7+-krokowe: 16%" oraz "srednia 61% na 15 mln interakcji"** -
  Chameleon, firma sprzedajaca tour software, na podstawie WLASNYCH danych telemetrycznych z
  wlasnego produktu [7][8]. Realne dane pierwotne (nie lancuch cytowan), ale (a) nieopublikowana
  metodologia, (b) brak recenzji zewnetrznej, (c) silna zachta biznesowa, zeby liczba wygladala
  imponujaco dla krotkich tourow (bo krotki tour = latwiejszy do sprzedania klientowi jako "dziala
  od razu").
- **"Srednia ukonczenia checklisty onboardingowej 19,2% (mediana 10,1%), na 188 firmach"** -
  Userpilot, ten sam typ zrodla (wlasna telemetria, wlasny produkt) [20].
- **"Skippable tours osiagaja o ok. 25% wyzsze ukonczenie niz obowiazkowe"** oraz **"prawie 70%
  uzytkownikow pomija tury odczuwane jako narzucone"** - pojawily sie w zagregowanym wyniku
  wyszukiwania bez mozliwosci przypisania do jednego weryfikowalnego zrodla pierwotnego w czasie
  tego badania - patrz CZEGO NIE USTALILEM.
- **Ogolna narracja calej branzy tour-software** ("tury dzialaja, jesli sa dobrze zaprojektowane",
  Chameleon [21]) jest strukturalnie samopotwierdzajaca: kazdy dostawca definiuje "dobrze
  zaprojektowany tour" jako ten, ktory jego wlasne narzedzie umie zbudowac.

---

## CZEGO NIE USTALILEM

1. **Brak jakiegokolwiek bezposredniego porownania trzech wariantow** (auto-klika / tylko wskazuje
   / czeka na klik uzytkownika) na tej samej probie uzytkownikow, w tym samym produkcie. Sekcja
   "TRZECI WARIANT" powyzej to rekonstrukcja logiczna z czesci, nie wynik pomiaru.
2. **Brak opisu polityki "co pokazac, gdy uzytkownik przerwie tour w polowie"** w jakimkolwiek
   znalezionym zrodle, niezaleznym czy marketingowym. Ani czy tour powinien pamietac miejsce
   przerwania, ani czy powinien zaczynac od zera przy nastepnym otwarciu.
3. **Brak danych o tej konkretnej kategorii produktu** (jednoplikowa aplikacja edukacyjna +
   konfigurator, bez backendu, bez kont uzytkownikow, bez telemetrii serwerowej) - wszystkie
   znalezione dane (Chameleon, Userpilot, NN/g) dotycza produktow SaaS z kontami i backendem.
   Aplikacja Macieja nie moze mierzyc wskaznikow ukonczenia po stronie serwera, bo nie ma serwera -
   to fundamentalnie ogranicza, ktore z powyzszych metryk da sie w ogole zaimplementowac lokalnie
   (np. via localStorage, jak juz robi ten projekt w innych miejscach).
4. **Nie sprawdzono zrodla pierwotnego dla liczb "25% wyzsze ukonczenie skippable" i "70% pomija
   tury narzucone"** - pojawily sie w zagregowanym wyniku wyszukiwania, proba dotarcia do
   pierwotnego artykulu przekroczylaby budzet czasowy tego raportu. Nie uzywac tych dwoch liczb w
   syntezie bez dodatkowej weryfikacji.
5. **Brak analizy tego zagadnienia w kontekscie jezykowym PL/EN** - zaden zrodlo nie dotyka tego,
   czy zachowanie tour powinno sie roznic, gdy user przelacza jezyk w trakcie tour (aplikacja
   Macieja ma ten przypadek explicite, `themeToggle` i przelacznik jezyka sa czescia kregoslupa).
6. **Nie znaleziono badania akademickiego/recenzowanego dedykowanego wprost product tours w UI**
   (w odroznieniu od ogolnej literatury o interfejsach pomocy, ktora jest starsza i nie odnosi sie
   do wspolczesnych nakladek spotlight). Najblizsze akademickie zrodlo dotyczy kierowania uwaga na
   duzych ekranach wspoldzielonych [11], co jest INNYM kontekstem uzycia niz tour w pojedynczej
   aplikacji webowej na jednym ekranie.
7. **Nie zweryfikowano bezposrednio w repozytoriach GitHub** zgloszen o bugach Shepherd.js/
   Driver.js/Intro.js - opieram sie na streszczeniach z serwisow porownawczych [13][14], ktore
   same maja konflikt interesu (porownuja konkurencyjne narzedzia, czesto polecajac wlasne). Gdyby
   ten projekt mial uzyc jednej z tych bibliotek, warto przejrzec issues bezposrednio przed
   decyzja.
8. **Nie ustalono, czy "worked example effect" (przyklad wypelniony jako narzedzie dydaktyczne,
   opisany w `v39/research/R2`) rzeczywiscie przenosi sie 1:1 na "tour klika za mnie w UI"** -
   worked examples w literaturze CLT dotycza zwykle przykladow matematycznych/proceduralnych na
   papierze lub ekranie statycznym, nie automatycznie animowanego sterowania zywa aplikacja. To
   jest analogia, nie potwierdzone przeniesienie.

---

## ZRODLA (URL + etykieta konfliktu interesow)

[1] Nielsen Norman Group, "Mobile Tutorials: Wasted Effort or Efficiency Boost?",
https://www.nngroup.com/articles/mobile-tutorials/ - NIEZALEZNE (firma badawcza UX, nie sprzedaje
tour software; badanie wlasne, n=70, z p-wartosciami).

[2] Djavad Mowafaghian Centre for Brain Health (UBC), "Learning by doing is better for retention
than learning by watching", https://www.centreforbrainhealth.ca/news/learning-doing-better-retention-learning-watching/
- NIEZALEZNE (osrodek akademicki), ale to popularne streszczenie badania, nie link do publikacji
pierwotnej.

[3] TechClass, "Active Learning Strategies to Boost Skill Retention",
https://www.techclass.com/resources/lifelong-learning/how-to-engage-in-active-learning-rather-than-passive-consumption
- CZESCIOWY KONFLIKT (firma szkoleniowa/e-learningowa, posrednio zainteresowana promocja "aktywnego
uczenia" jako uslugi), ale tresc to przeglad ogolnej literatury edukacyjnej, nie sprzedaz tour
software.

[4] Visual Studio Code, oficjalna dokumentacja API, "Walkthroughs",
https://code.visualstudio.com/api/ux-guidelines/walkthroughs - NIEZALEZNE od tematu tour-software
(Microsoft, wytyczna produktowa dla wlasnego edytora, nie sprzedaje narzedzi do onboardingu innych
aplikacji).

[5] SaaS Factor, "Why Most Product Tours Fail and How to Implement Contextual Onboarding",
https://www.saasfactor.co/blogs/why-most-product-tours-fail-and-how-to-implement-contextual-onboarding
- MATERIAL MARKETINGOWY (agencja/blog promujaca uslugi onboardingowe), zrodlo lancucha cytowan
nr [6], liczba niepotwierdzona bezposrednio na baymard.com.

[6] Digia Engage, "The Anatomy of a Great In-App Onboarding Tour",
https://www.digia.tech/post/anatomy-of-a-great-in-app-onboarding-tour/ - MATERIAL MARKETINGOWY
(sprzedawca narzedzia "Nudges" do tourow, artykul zawiera wezwania "Book a Demo").

[7] Chameleon, "Yes, product tours still work. Here's what the best ones do differently.",
https://www.chameleon.io/blog/product-tours-still-work - MATERIAL MARKETINGOWY (sprzedawca tour
software), dane wlasne z telemetrii produktu (15 mln interakcji), brak recenzji zewnetrznej.

[8] Userpilot, cytujace dane Chameleon w kontekscie liczby krokow (znalezione zagregowane w wyniku
wyszukiwania, zrodlo pierwotne to [7]) - MATERIAL MARKETINGOWY.

[9] Nielsen Norman Group, "Onboarding Tutorials vs. Contextual Help",
https://www.nngroup.com/articles/onboarding-tutorials/ - NIEZALEZNE. Uwaga: artykul sam przyznaje
brak cytowan do zewnetrznych badan recenzowanych, opiera sie na doswiadczeniu redakcyjnym NN/g i
anegdotach autora, nie na tabeli liczb (w odroznieniu od [1], ktore MA liczby).

[10] Nielsen Norman Group, "Onboarding: Skip it When Possible" (video),
https://www.nngroup.com/videos/onboarding-skip-it-when-possible/ - NIEZALEZNE, ale dostepny
fragment tekstowy jest krotki (video 3-minutowe, transkrypcja niepelna w pobranej tresci).

[11] Autodesk Research, "Spotlight: Directing Users' Attention on Large Displays",
https://www.research.autodesk.com/publications/spotlight-directing-users-attention-on-large-displays/
- NIEZALEZNE (publikacja akademicka/badawcza), ale kontekst to duze ekrany wspoldzielone, nie
pojedyncza aplikacja webowa - ograniczona przenaszalnosc.

[12] Wzmianka o efekcie ubocznym "ciekawosc co zaslonione tworzy nowa dystrakcje" - pojawila sie w
zagregowanym wyniku wyszukiwania bez jednoznacznego zrodla pierwotnego mozliwego do zweryfikowania
w dostepnym czasie; traktowac jako slaby dowod, nie cytowac jako ustalony fakt bez dalszej
weryfikacji.

[13] Inline Manual, "Driver.js vs Intro.js vs Shepherd.js vs Reactour",
https://inlinemanual.com/blog/driverjs-vs-introjs-vs-shepherdjs-vs-reactour/ - CZESCIOWY KONFLIKT
(Inline Manual samo sprzedaje oprogramowanie do product adoption/tours, porownanie moze byc
stronnicze wobec wlasnego niewymienionego produktu).

[14] UserTourKit, "React Joyride vs Shepherd vs Tour Kit vs Driver.js vs Intro.js: the 2026
benchmark", https://usertourkit.com/blog/react-tour-library-benchmark-2026 - CZESCIOWY KONFLIKT
(UserTourKit to jeden z porownywanych/konkurencyjnych produktow wlasciciela bloga).

[15] Nielsen Norman Group, "Popups: 10 Problematic Trends and Alternatives",
https://www.nngroup.com/articles/popups/ - NIEZALEZNE, badanie wlasne autora (osobisty eksperyment
25 popupow/tydzien, obserwacje z testow uzytecznosci z reakcjami uczestnikow).

[16] Userpilot, "Interactive Walkthrough vs. Product Tour: Is There A Difference?",
https://userpilot.com/blog/interactive-walkthrough-vs-product-tour/ - MATERIAL MARKETINGOWY
(sprzedawca tour software).

[17] Product Fruits, "Interactive Walkthrough vs Product Tour: Benefits and Differences",
https://productfruits.com/blog/interactive-walkthrough-vs-product-tour - MATERIAL MARKETINGOWY
(sprzedawca tour software).

[18] Sentry Engineering Blog, "Building a Product Tour in React",
https://blog.sentry.io/building-a-product-tour-in-react - NIEZALEZNE OD TEMATU TOUR-SOFTWARE
(Sentry sprzedaje monitoring bledow, nie narzedzia do onboardingu; artykul opisuje ich WLASNA
wewnetrzna implementacje tourow we wlasnym produkcie, nie promuje sprzedazy narzedzia trzeciego).

[19] Bezposrednie przeszukanie baymard.com (site:baymard.com onboarding tour) - brak wyniku
potwierdzajacego liczbe "78%"; wykorzystane jako dowod NIEISTNIENIA zrodla, nie jako zrodlo
twierdzenia.

[20] Userpilot, "Customer Onboarding Checklist Completion Rate: 2025 Benchmark Report",
https://userpilot.com/blog/onboarding-checklist-completion-rate-benchmarks/ - MATERIAL
MARKETINGOWY (sprzedawca tour/onboarding software), dane wlasne z 188 firm-klientow.

[21] Chameleon jw. [7] - powtorzone odniesienie do tej samej narracji brazowej.

Zrodla przejrzane, ale odrzucone jako nieuzyteczne lub niedostepne w tym raporcie: VS Code
"tips-and-tricks" (ogolna lista skrotow, nie dotyczy tematu); GitHub microsoft/codetour (narzedzie
do tour kodu dla developerow, inny kontekst uzycia niz onboarding UI koncowego uzytkownika,
pominiete jako nietrafne); saasfactor.co - WebFetch zwrocil blad HTTP 403, tresc pozyskana
posrednio przez cytat w [6].
