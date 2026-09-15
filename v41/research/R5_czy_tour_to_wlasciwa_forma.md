# R5 - Czy tour to wlasciwa forma

Researcher: R5 (adwokat formy, nie tresci)
Zakres: WYLACZNIE porownanie 9 form wprowadzania uzytkownika w interfejs. Nie zajmuje sie tym,
CO pokazac (kregoslup: jezyk, panAg, panPr, panSv, svg/phaseBar, costHud, simBtn, learnO,
themeToggle, skroty) - to jest ustalone w MASTER_PLAN i nalezy do R1-R4, R6-R8.
Sprawdzone przed napisaniem: `v39/research/R2_interaktywne_wyjasnienia.md` i
`v39/research/R5_co_pomoglo_zrozumiec.md` dotycza formy WYJASNIANIA mechanizmu hookow
(explorable explanations, obciazenie poznawcze, Diataxis dla tresci referencyjnej). To sa inne
pytania niz "jak wprowadzic nowego uzytkownika do calej aplikacji" - nie ma pokrycia, zero
powtorzenia zakresu.

---

## TL;DR (5-8 punktow z sila dowodu)

1. **Tour push (uruchamiany automatycznie, prowadzacy krok po kroku przez cala aplikacje) ma
   najslabsze wsparcie dowodowe ze wszystkich dziewieciu form u zrodel niezaleznych od
   sprzedawcow narzedzi do tourow.** Jedyne znalezione badanie z metoda, probka i wynikiem
   liczbowym pochodzace z instytucji niesprzedajacej tour software (NN/g, N=70, 4 aplikacje)
   pokazuje, ze tutorial NIE poprawia sukcesu zadania (91% vs 94%, roznica nieistotna
   statystycznie, p=0.443) i NIE skraca czasu (93.49s vs 85.17s, p>0.1), a jednoczesnie
   **zwieksza subiektywnie postrzegana trudnosc zadania** (4.92 vs 5.49 w skali SEQ 1-7,
   p=0.047, istotne statystycznie) [1]. Sila dowodu: SREDNIA (jedno badanie, ale niezalezne,
   z metoda i probka, replikowalna teza spojna z drugim, osobnym badaniem tej samej instytucji
   na coach marks [2]).

2. **Dane liczbowe o skutecznosci tourow od firm sprzedajacych oprogramowanie do tourow sa ze
   soba WZAJEMNIE SPRZECZNE**, co samo w sobie jest dowodem przeciw ich wiarygodnosci: Intercom
   podaje mediane ukonczenia tour 5-krokowego na poziomie 34% i "sredni przemysl" 23% [3],
   Chameleon (rowniez sprzedawca tourow) podaje "srednia skutecznosc ukonczenia" na poziomie
   61% z proby 15 milionow interakcji [4] - rozbieznosc 27-38 punktow procentowych miedzy
   dwiema firmami z tej samej branzy, bez ujawnionej wspolnej metodologii (co liczone jest jako
   "ukonczenie", jaki mianownik). Sila dowodu materialu marketingowego: BRAK (patrz sekcja
   MATERIAL MARKETINGOWY).

3. **Najmocniejszy pojedynczy dowod na korzysc "nauki przez dzialanie" (learn by doing) w formie
   ograniczonego, bezpiecznego interfejsu poczatkowego pochodzi z recenzowanej pracy akademickiej
   sprzed 40 lat, nie z branzy SaaS**: Carroll i Carrithers (1984), "training wheels interface" -
   ograniczenie funkcji podatnych na blad dla poczatkujacych dalo szybsza nauke, mniej bledow i
   lepszy wynik testu rozumienia; grupa kontrolna spedzala prawie jedna czwarta czasu na
   wychodzeniu z bledow, ktore interfejs treningowy blokowal calkowicie [5][6]. Sila dowodu:
   MOCNA (recenzowane, replikowane w kolejnych pracach [7][8], zero konfliktu interesu -
   publikacja akademicka z lat 80., zaden produkt do sprzedania).

4. **Puste stany (empty states) i podpowiedzi kontekstowe (just-in-time) maja najlepsze poparcie
   niezaleznego zrodla (NN/g) wsrod form "biernych/pasywnych"**, poniewaz dzialaja w momencie
   realnej potrzeby (tzw. "pull revelation"), a nie z gory ("push revelation") [9]. NN/g formalnie
   rozroznia te dwa typy i rekomenduje pull nad push jako regule ogolna, nie tylko dla tego
   konkretnego typu aplikacji [9]. Sila dowodu: SREDNIA-MOCNA (spojne stanowisko niezaleznej
   instytucji badawczej powtorzone w trzech osobnych publikacjach [1][2][9], ale bez wlasnego
   testu A/B liczbowego specyficznie dla empty states czy JIT hints - liczby sa tylko dla
   tutoriali).

5. **Checklisty onboardingowe maja bardzo niskie realne wskazniki ukonczenia w danych od firmy
   sprzedajacej narzedzia do onboardingu** (Userpilot: srednia 19.2%, mediana 10.1% w probie 188
   firm bedacych klientami Userpilot) [10] - ale sam autor przyznaje, ze wysoki wskaznik
   ukonczenia checklisty NIE koreluje z tym, czy uzytkownik zostaje w produkcie [10]. To jest
   rzadki przypadek, gdy zrodlo marketingowe podwaza wlasny produkt - warty odnotowania, ale
   nadal pochodzi z probki samowybranej (klienci jednego narzedzia). Sila dowodu: SLABA (jedno
   zrodlo z konfliktem interesu, choc czesciowo samokrytyczne).

6. **"Pokaz mi" per sekcja (uruchamiane na zadanie, nie automatycznie) laczy mocne strony tour i
   kontekstowej pomocy**: dziala jak pull revelation (uzytkownik prosi o pomoc w momencie, gdy
   jej chce), ale moze byc dluzsze i bardziej narracyjne niz pojedynczy tooltip. NN/g nie ma
   dla tej dokladnej formy osobnego badania liczbowego, ale jej rekomendacje ogolne (dawaj
   informacje na zadanie, nie z automatu [9]; dawaj instrukcje "na twarzy interfejsu" gdy sa
   niezbedne, a nie ukryte pod klikiem [2]) sa spojne z tym wzorcem. Sila dowodu: SLABA-SREDNIA
   (wniosek wywiedziony z ogolnych zasad, nie z bezposredniego testu tej konkretnej formy).

7. **Dla aplikacji, ktorej celem jest NAUKA a nie wykonanie transakcyjnego zadania, ranking sie
   zmienia w jednym konkretnym punkcie: "sample project / demo data" i "learn by doing" zyskuja
   wzgledem "pokaz mi" i tour**, poniewaz literatura o narzedziach edukacyjnych i programistycznych
   (minimalist instruction, training wheels [5][6]) mowi wprost, ze ludzie ucza sie z bledow
   popelnionych na czyms konkretnym, nie z opisu w formie push. Nie znalazlem jednak zadnego
   bezposredniego badania porownawczego "tour vs demo data" specyficznie dla aplikacji typu
   encyklopedia/konfigurator - to ekstrapolacja z pokrewnych domen, nie test na identycznym
   przypadku. Sila dowodu: SLABA (ekstrapolacja, brak bezposredniego testu).

8. **Zaden ze znalezionych, niezaleznych od sprzedawcow zrodel nie rekomenduje automatycznie
   uruchamianego tour krok po kroku po calej aplikacji jako pierwszego wyboru.** Kazde niezalezne
   zrodlo (NN/g w trzech osobnych publikacjach [1][2][9], praca akademicka o minimalizmie
   instrukcyjnym [11]) rekomenduje albo formy pasywne aktywowane kontekstem, albo formy oparte
   na dzialaniu z ograniczona zlozonoscia poczatkowa. Rekomendacje FORM push (w tym tour) pochodza
   niemal wylacznie z firm sprzedajacych oprogramowanie do budowania takich tourow. Sila dowodu
   calego twierdzenia: SREDNIA (to nie jest "brak dowodow na tour", to jest "systematyczna
   asymetria zrodel wedlug tego, kto ma w tym interes" - warta nazwania wprost).

---

## PORZADEK FORM (tabela)

Kolejnosc od najlepiej udokumentowanej do najslabiej, WYLACZNIE dla zrodel niezaleznych od
sprzedawcow tour software. Kolumna "sila dowodu" liczy zrodla POJEDYNCZO, bez zaokraglania w gore.

| Forma | Kiedy dziala | Kiedy zawodzi | Koszt utrzymania | Sila dowodu |
|---|---|---|---|---|
| **Learn by doing / wbudowane w pierwsze prawdziwe zadanie** | Gdy da sie bezpiecznie ograniczyc funkcje na start i pozwolic na blad bez konsekwencji (training wheels) [5][6][7]; gdy uzytkownik ma jasny, pojedynczy pierwszy cel | Gdy nie ma jednego oczywistego "pierwszego zadania" (np. narzedzie eksploracyjne bez jednej sciezki) - wtedy nie wiadomo, w co "wbudowac" nauke | Sredni-wysoki: wymaga zaprojektowania osobnej, uproszczonej wersji przeplywu, nie tylko nakladki na istniejacy UI | MOCNA - jedyna forma z recenzowanym, powtarzanym wynikiem liczbowym niezwiazanym z zadnym sprzedawca [5][6][7][8] |
| **Puste stany, ktore ucza (empty states)** | Gdy ekran/panel jest faktycznie pusty przy pierwszym wejsciu - naturalny moment na wskazowke bez przerywania niczego [9] | Gdy ekran NIE jest pusty (np. juz jest cos domyslnie zaladowane) - wtedy nie ma nosnika dla tej formy | Niski-sredni: raz zaprojektowany tekst/CTA w miejscu, ktore i tak trzeba obslugiwac (stan pusty to stan aplikacji, nie dodatek) | SREDNIA - spojne stanowisko NN/g w kilku publikacjach [1][2][9], brak jednak dedykowanego testu liczbowego samych empty states |
| **Podpowiedzi kontekstowe / just-in-time (pull)** | Gdy da sie wykryc moment realnej potrzeby (najechanie, pierwsze uzycie elementu, blad) - dokladnie definicja "pull revelation" NN/g [9] | Gdy wskazowka musi pojawic sie ZANIM uzytkownik cokolwiek zrobi (nie ma zdarzenia wyzwalajacego) - wtedy pull nie ma czym sie uruchomic | Sredni: wymaga instrumentacji zdarzen (kiedy pokazac co), wiecej logiki niz statyczny ekran, mniej niz pelny tour z krokami i stanem | SREDNIA-MOCNA - trzy zbiezne publikacje NN/g [1][2][9], w tym jedno badanie z liczbami (dot. push, nie pull wprost, ale to samo badanie porownawcze) [1] |
| **Statyczna mapa interfejsu / legenda** | Gdy uzytkownik woli przeszukac calosc raz i wrocic pozniej niz byc prowadzony; dobre jako "siatka bezpieczenstwa" obok innej formy | Jako JEDYNA forma dla kogos, kto nie wie, czego szukac - mapa zaklada, ze uzytkownik juz ma pytanie | Bardzo niski: jeden statyczny widok, latwy do utrzymania przy zmianach UI (mniejsza krucha zaleznosc od selektorow DOM niz w tour) | SLABA - brak dedykowanego badania porownawczego znalezionego w tej sesji; wniosek wywiedziony posrednio z zasady "map i legend uzyteczne przy trudnym do opisania ukladzie" [12] |
| **Krotki film / animacja w aplikacji** | Gdy trzeba pokazac RUCH lub przeplyw czasowy, ktorego statyczny obraz nie odda (np. animacja) [1][2][13] | Push z automatu ma te sama wade co tekstowy tour: mozna go pominac, tresc nie jest dostepna pozniej w kontekscie [9][13]; dlugosc >1 min silnie obniza zaangazowanie w danych producenta narzedzi wideo [14] | Wysoki: montaz wideo trzeba przerabiac przy kazdej istotnej zmianie UI - najbardziej kruchy koszt utrzymania z calej listy | SLABA - liczby (20-40% wzrost aktywacji [14], 91% ludzi ogladajacych wideo produktowe [14]) pochodza wylacznie z blogow marketingowych bez ujawnionej metody |
| **"Pokaz mi" per sekcja, na zadanie** | Gdy uzytkownik chce pomocy TERAZ dla KONKRETNEJ czesci, ale niekoniecznie w reakcji na zdarzenie (roznica wobec pull JIT: to uzytkownik inicjuje, nie system) | Gdy uzytkownik nie wie, ze taka opcja istnieje (trzeba ja odkryc) - wymaga widocznego punktu wejscia | Sredni: mniej stanu niz pelny tour (nie trzeba pilnowac calej sciezki wielokrokowej), ale wiecej tresci niz pojedynczy tooltip | SLABA-SREDNIA - brak bezposredniego testu tej dokladnej formy; spojna z ogolna zasada "instrukcja na twarzy interfejsu, nie ukryta" [2], ale to nie jest to samo twierdzenie wprost |
| **Gotowy przyklad zaladowany na start (sample project / demo data)** | Gdy produkt bez danych wyglada pusto/bezsensownie (typowy dla narzedzi z konfiguracja) - daje natychmiastowy "aha moment" bez pisania czegokolwiek [15] | Gdy uzytkownik chce od razu pracowac na WLASNYCH danych - przykladowy projekt moze wymagac dodatkowego kroku "wyczysc i zacznij od zera" | Niski-sredni: raz przygotowany zestaw danych startowych, niezalezny od zmian layoutu (w przeciwienstwie do tour, ktory zalamuje sie przy zmianie DOM) | SLABA - liczby (8-12% wzrostu aktywacji na kazde 10 minut skrocenia czasu do wartosci [15]) pochodza z blogow marketingowych/growth bez ujawnionej metodologii badawczej |
| **Lista zadan do odhaczenia (onboarding checklist)** | Gdy jest kilka NIEZALEZNYCH od siebie akcji setupowych (nie jedna liniowa sciezka) - checklist naturalnie oddaje rownoleglosc, tour nie | Gdy zadania na liscie sa "na pokaz" a nie prowadza do realnej wartosci - autor wlasnych danych przyznaje, ze wysokie ukonczenie checklisty NIE oznacza niskiego churnu [10] | Sredni: trzeba pilnowac stanu "co jest odznaczone" per uzytkownik (trwaly stan, nie jednorazowa sekwencja) | SLABA - jedyne twarde liczby (19.2%/10.1% ukonczenia [10]) pochodza od sprzedawcy narzedzi checklist, mechanizm psychologiczny (Zeigarnik [16]) jest prawdziwy, ale nie testowany wprost na checklistach onboardingowych w znalezionym materiale |
| **Klasyczny tour krok po kroku z podswietleniem (push, automatyczny)** | Wedlug NN/g: gdy trzeba pokazac funkcje calkowicie nieoczywista, ktorej uzytkownik sam by nie odkryl, pojedynczo, we wlasciwym momencie w przeplywie [2] - a wiec waski przypadek, nie ogolna forma wejscia | W kazdym innym przypadku: NN/g N=70 pokazuje brak poprawy sukcesu/czasu i wzrost postrzeganej trudnosci [1]; seryjne, wielokrokowe tipy przecia\żaja pamiec robocza i sa masowo odklikiwane [2] | Wysoki: sekwencja krokow zalezna od selektorow DOM, wymaga sprzatania stanu po przerwaniu w polowie, koliduje z akcjami uzytkownika (dokladnie ryzyko nazwane w R4 MASTER_PLAN) | SREDNIA przeciw (najlepiej udokumentowana forma w sensie "najwiecej niezaleznych zrodel mowiacych, kiedy NIE dziala" [1][2][9]), MARKETINGOWA za (liczby "34%", "61%" wzajemnie sprzeczne [3][4]) |

---

## USTALENIA

### Push kontra pull jako os organizujaca cala tabele

Wiekszosc z dziewieciu form daje sie zlozyc na jednej osi, ktora NN/g nazywa wprost: **push
revelation** (informacja pojawia sie z inicjatywy systemu, zanim uzytkownik o cos poprosil) i
**pull revelation** (informacja pojawia sie w reakcji na sygnal, ze uzytkownik tego wlasnie
potrzebuje) [9]. Klasyczny automatyczny tour i film wideo odtwarzany na starcie sa push. Puste
stany, podpowiedzi kontekstowe i "pokaz mi na zadanie" sa pull. Checklist i sample project leza
posrodku - to zaproszenie (push w momencie pojawienia sie), ale realizacja jest pull (uzytkownik
sam decyduje, kiedy kliknie kolejny punkt).

NN/g formulje to jako regule ogolna, nie ograniczona do jednego typu produktu: **push revelations
maja trzy strukturalne problemy niezalezne od jakosci wykonania** - (1) tzw. paradoks aktywnego
uzytkownika (ludzie wola od razu dzialac niz czytac z gory), (2) informacja poza kontekstem
wymaga zapamietania na pozniej, co obciaza pamiec robocza, (3) samo odrzucenie interruptu
(znalezienie i kliknięcie "x") jest kosztem wysilku [9]. To sa trzy niezalezne mechanizmy, nie
jeden - a wiec nawet bardzo dobrze zaprojektowany tour push wciaz musi pokonac wszystkie trzy
naraz.

### Badanie NN/g na mobilnych tutorialach - jedyny bezposredni test liczbowy z niezaleznego zrodla

To jest najmocniejszy pojedynczy dowod w calym raporcie, wiec warto rozlozyc go dokladnie [1]:

- Metoda: test miedzygrupowy (between-subject), zdalny, niemoderowany, ilosciowy.
- Probka: 70 uczestnikow, podzieleni po 35 na grupe "z tutorialem" i "bez tutorialu" (skip).
- Cztery aplikacje iOS: Movesum, Brainsparker, LaunchCenter Pro, Sketch.Book - a wiec roznorodne
  kategorie (fitness, kreatywnosc, produktywnosc, rysowanie), nie jedna nisza.
- Wynik sukcesu zadania: 91% (tutorial) vs 94% (bez tutorialu), roznica NIEISTOTNA statystycznie
  (p=0.443).
- Wynik czasu: 93.49s (tutorial) vs 85.17s (bez tutorialu) - tutorial byl WOLNIEJSZY, ale
  roznica rowniez nie osiagnela istotnosci (p>0.1).
- Wynik subiektywnej trudnosci (SEQ, skala 1-7): 4.92 (tutorial) vs 5.49 (bez tutorialu) -
  ISTOTNA statystycznie (p=0.047) roznica NA NIEKORZYSC tutorialu: osoby, ktore go widzialy,
  ocenily zadanie jako TRUDNIEJSZE, mimo ze wykonaly je z tym samym skutkiem.

Wniosek NN/g wprost: tutoriale "nie czynia uzytkownikow szybszymi ani skuteczniejszymi w
wykonywaniu zadan, przeciwnie, sprawiaja, ze postrzegaja zadania jako trudniejsze" [1].
Rekomendacja: inwestowac w intuicyjnosc samego interfejsu zamiast w tutorial, a tam gdzie
potrzeba pomocy, rozwazyc kontekstowa alternatywe zamiast formalnego onboardingu [1].

Ograniczenie tego dowodu: to jedno badanie, N=70 (35 per grupa) - solidne jak na standardy
badan uzytecznosci, ale nie jest to meta-analiza ani wielkie badanie ilosciowe. Nie testowano w
nim rowniez dokladnie tej formy, ktora rozwaza MASTER_PLAN (tour w aplikacji desktopowej/webowej
typu konfigurator, a nie mobilny onboarding aplikacji konsumenckiej) - przeniesienie wyniku
miedzy kategoriami produktow jest ekstrapolacja, choc rozsadna, bo mechanizm (obciazenie pamieci
roboczej, paradoks aktywnego uzytkownika) jest ogolny, nie specyficzny dla mobile.

### Coach marks - waski przypadek, w ktorym push MOZE dzialac

Drugie badanie NN/g [2] nie odrzuca push calkowicie - definiuje WASKI przypadek, w ktorym
dziala: pojedyncza, skupiona wskazowka dla funkcji NIEOCZYWISTEJ (ktorej uzytkownik sam by nie
odkryl), pokazana JEDNA na raz, dokladnie w momencie, gdy uzytkownik dociera do danej czesci
interfejsu, wizualnie odrozniona od realnego UI, z minimalna iloscia tekstu. To jest de facto
"tour", ale zredukowany do jednego kroku, wyzwalanego kontekstowo - blizej pull niz klasycznemu
5-10-krokowemu tour prowadzonemu od razu po zalogowaniu.

Ten sam raport wprost identyfikuje mechanizm porazki dla wielokrokowego tour: **serie kolejnych
podpowiedzi wywoluja u uzytkownikow szybsze odrzucanie, niezaleznie od jakosci tresci** - a wiec
sam fakt, ze jest to SEKWENCJA (a nie tresc pojedynczego kroku), obniza jej skutecznosc [2].
Bezposrednio odnosi sie to do R3 z MASTER_PLAN (dlugosc tour) - to dowod z niezaleznego zrodla,
ze dlugosc sekwencji sama w sobie jest kosztem, niezaleznie od jakosci wykonania kazdego kroku.

### Training wheels - najstarszy i najmocniejszy dowod dla "learn by doing"

Carroll i Carrithers (1984) [5][6] to praca akademicka (Human Factors, tez Communications of the
ACM), zaprojektowana specyficznie do testowania hipotezy: czy ograniczenie interfejsu dla
poczatkujacych (usuniecie funkcji, ktore sa rzadko potrzebne, a czesto prowadza do bledu) poprawia
nauke w porownaniu do pelnego interfejsu z instrukcja. Wynik: tak, mierzalnie - grupa z pelnym
interfejsem spedzala prawie jedna czwarta calego czasu sesji na WYCHODZENIU z bledow, ktorych
wersja "treningowa" w ogole nie pozwalala popelnic [5]. To NIE jest tour ani pomoc tekstowa - to
zmiana samego produktu na czas nauki. Kolejne prace (m.in. nad interfejsem linii komend [7],
nad edytorem tekstu z "guided exploration" [8]) replikuja ten kierunek w innych domenach.

Zastosowanie wprost do pytania R5: jesli aplikacja pozwala na to strukturalnie (co dla
jednoplikowego konfiguratora z wieloma trybami nie jest oczywiste - nie ma osobnej "wersji
treningowej" bez przebudowy), forma "ogranicz na start, odblokuj pozniej" ma najmocniejsze
pojedyncze wsparcie dowodowe ze wszystkich dziewieciu opcji. To jest jednak inny rodzaj
interwencji niz jakikolwiek "samouczek nalozony na istniejacy interfejs" - zmienia sam produkt,
nie dodaje warstwy nad nim. Warto to nazwac wprost jako rozniace sie zalozenie architektoniczne,
nie tylko wybor formy prezentacji.

### Sprzeczne liczby od sprzedawcow tour software jako dowod przeciwko, nie za

MASTER_PLAN identyfikuje z gory ryzyko zatrutych zrodel. Ten research potwierdza je nie przez
"brak danych od vendorow", ale przez **wzajemna sprzecznosc danych, ktore sami sobie podaja**:

- Intercom (wlasciciel produktu Product Tours): mediana ukonczenia dla tour 5-krokowego = 34%,
  "przemyslowa srednia" = 23% [3].
- Chameleon (konkurencyjny produkt do tourow): "srednia skutecznosc ukonczenia" = 61%, z
  dodatkowym twierdzeniem, ze self-serve tours maja o 123% wyzsza skutecznosc ukonczenia niz
  dostarczanie pasywne [4].

Te dwie liczby (34%/23% kontra 61%) nie dadza sie pogodzic bez znajomosci dokladnej definicji
"ukonczenia" i mianownika w obu przypadkach, ktorej zaden z dwoch blogow nie ujawnia w
przystepnej formie. To jest dokladnie wzorzec, przed ktorym ostrzega MASTER_PLAN ("kazde badanie
o onboardingu konczy sie wnioskiem, ze potrzeba wiecej samouczkow") - i dokladnie dlatego zaden
z tych numerow NIE trafia do sekcji USTALENIA jako fakt, tylko do MATERIAL MARKETINGOWY.

### Sample data i checklist - hybrydy z realnym, ale waskim wsparciem

Sample project/demo data ma logike zblizona do "learn by doing": zamiast opisywac produkt,
pokazuje go dzialajacego, na konkretnym przykladzie, ktory mozna dotknac. Nie znalazlem
niezaleznego (akademickiego lub NN/g) badania konkretnie tej formy - dostepne liczby (przyspieszenie
aktywacji o 8-12% na kazde 10 minut skrocenia "time to value" [15]) pochodza z blogow
growth/marketingowych bez ujawnionej metody. Mechanizm jest jednak spojny z zasada training
wheels: pokazac dzialajacy, uproszczony przypadek zamiast pustego plotna, na ktorym uzytkownik
musi najpierw cos zbudowac, zanim zobaczy jakikolwiek efekt.

Checklist ma inny mechanizm: opiera sie o efekt Zeigarnik (niedokonczone zadania sa lepiej
zapamietywane niz dokonczone) [16], co samo w sobie JEST prawdziwym, dobrze ugruntowanym
wynikiem z psychologii poznawczej (Bluma Zeigarnik, 1927) - ale zaden ze znalezionych zrodel nie
testuje wprost, czy ten efekt przeklada sie na WYZSZE domykanie checklist onboardingowych w
sposob mierzalny; polaczenie "Zeigarnik -> onboarding checklist" w znalezionych zrodlach jest
interpretacja marketingowa efektu psychologicznego, nie jego bezposrednim testem w tym kontekscie.
Jednoczesnie sam sprzedawca narzedzi checklist (Userpilot) przyznaje w swoim raporcie
benchmarkowym, ze wysokie ukonczenie checklisty nie gwarantuje niższego odejscia uzytkownikow
[10] - rzadki przypadek samokrytyki zrodla z konfliktem interesu, wart odnotowania jako mocniejszy
niz zwykla reklama.

---

## CZY DLA APLIKACJI EDUKACYJNEJ RANKING SIE ZMIENIA

Tak, w jednym konkretnym miejscu, i NIE zmienia sie w innym miejscu, ktore latwo pomylic z tym
pierwszym.

**Co sie zmienia:** wiekszosc znalezionej literatury o onboardingu (empty states, checklist,
demo data, tour) dotyczy produktow TRANSAKCYJNYCH - narzedzi, ktore maja doprowadzic uzytkownika
do jednego konkretnego dzialania (zaplac, wyslij, skonfiguruj integracje) i po tym dzialaniu
onboarding konczy swoja role. Ta aplikacja jest inna: jej deklarowany cel to **zrozumienie**, nie
wykonanie jednego zadania - encyklopedia i konfigurator jednoczesnie, zgodnie z CLAUDE.md
projektu. Literatura o minimalist instruction i training wheels [5][6][11] powstala WLASNIE dla
tego przypadku - narzedzi, w ktorych sukces mierzy sie tym, czy uzytkownik zbudowal poprawny
model mentalny systemu, a nie tylko czy kliknal wlasciwy przycisk raz. To przesuwa "learn by
doing" i "sample project" wyzej w rankingu wzgledem "pokaz mi" i tour, poniewaz oba pierwsze
wymagaja od uzytkownika DZIALANIA na czyms konkretnym (co buduje model mentalny), podczas gdy
tour i "pokaz mi" pozostaja OGLADANIEM (co, wedlug NN/g [1], nie poprawia mierzalnie ani sukcesu,
ani czasu, a pogarsza subiektywne odczucie trudnosci).

Drugi mechanizm dzialajacy w tym samym kierunku: R2 z v39 (juz przeczytane, nie powtarzane tutaj
jako osobny research, tylko przywolane jako fakt juz ustalony w projekcie) pokazuje, ze
najskuteczniejsi autorzy wyjasnien systemow zlozonych (Ciechanowski, Nicky Case, Bret Victor)
konsekwentnie stosuja regule "sandbox na koncu, nie na poczatku" oraz "izoluj mechanizm, potem
integruj" - to sa zasady DYDAKTYCZNE, niezalezne od tego badania, ale spojne z jego wnioskiem:
uczenie sie zlozonego systemu wymaga stopniowanej ingerencji uzytkownika w system, nie biernego
ogladania calosci z gory.

**Co sie NIE zmienia:** rozroznienie push/pull pozostaje takie samo niezaleznie od celu aplikacji.
Trzy strukturalne problemy push (paradoks aktywnego uzytkownika, obciazenie pamieci, koszt
odrzucenia) [9] dzialaja identycznie w narzedziu transakcyjnym i edukacyjnym - nie ma w
znalezionej literaturze zadnej przeslanki, ze aplikacja edukacyjna czyni push MNIEJ kosztownym.
Wrecz przeciwnie: jesli cel to zrozumienie, a nie jedno kliknięcie, to KOSZT nieprzyswojenia
tresci push jest WIEKSZY niz w produkcie transakcyjnym, bo w produkcie transakcyjnym wystarczy
zapamietac jedna sciezke, a w encyklopedii trzeba zbudowac trwaly model mentalny wielu
powiazanych czesci (kregoslup: jezyk, agenci, presety, zapisane, canvas, koszt, symulacja,
encyklopedia, motyw, skroty - dziesiec r óznych kotwic z MASTER_PLAN).

Jest tu tez pulapka warta nazwania wprost, bo lezy dokladnie na scieżce tej kampanii: **narzedzie
edukacyjne to NIE to samo co "dokumentacja interaktywna" czy "IDE" w sensie typowej literatury o
developer onboardingu**, ktorej szukalem osobno i w ktorej wiekszosc materialu (sandboksy do
uruchamiania kodu w przegladarce, srodowiska CDE) dotyczy NAUKI PROGRAMOWANIA POPRZEZ PISANIE
KODU - mechanizm nieprzenoszalny wprost na aplikacje, w ktorej uzytkownik nie pisze kodu, tylko
klika elementy konfiguratora. Zaznaczam to jako luke (patrz CZEGO NIE USTALILEM), nie jako
ustalony fakt - nie chce fabrykowac przeniesienia z domeny "nauka kodowania" na domene "nauka
architektury agentow" bez bezposredniego zrodla.

---

## REKOMENDACJA: zostac przy tourze czy zmienic forme, i dlaczego

**Nie porzucac calkowicie kregoslupa jako koncepcji, ale zmienic MECHANIKE z push-automatycznego
na hybryde pull + learn-by-doing, z tour jako NAJMNIEJSZYM, najbardziej ograniczonym skladnikiem,
a nie glownym.**

Uzasadnienie w trzech krokach, kazdy oparty na innym zrodle:

1. **Nie ma niezaleznego dowodu, ze automatyczny, wielokrokowy tour push poprawia zrozumienie
   lub sukces zadania** - jedyne bezposrednie badanie liczbowe pokazuje brak poprawy przy
   jednoczesnym pogorszeniu subiektywnej trudnosci [1]. To podwaza fundament decyzji "robimy
   tour", nie tylko jej szczegoly wykonania (R2-R4 z MASTER_PLAN).

2. **Jest mocny, niezalezny dowod, ze forma dzialajaca na zasadzie ograniczonego, bezpiecznego
   pierwszego dzialania (training wheels / learn by doing) dziala lepiej niz opis z gory** [5][6],
   szczegolnie dla narzedzi, w ktorych celem jest zrozumienie, nie jedna transakcja - a to jest
   dokladnie profil tej aplikacji.

3. **Jest spojne stanowisko tej samej niezaleznej instytucji (NN/g), ze VĄSKI, kontekstowo
   wyzwalany push (jeden coach mark na raz, przy nieoczywistej funkcji, w momencie dotarcia do
   niej) MOZE dzialac** [2] - a wiec calkowite usuniecie wszelkiego prowadzenia rowniez nie ma
   uzasadnienia w zrodlach. Zero prowadzenia to inna skrajnosc niz 10-krokowy tour, ale wciaz
   skrajnosc.

Konkretny ksztalt rekomendowany przez ten research (forma, nie tresc - tresc nalezy do R1-R8
razem, nie do samego R5):

- **Zamiast** jednego dlugiego tour odpalajacego sie automatycznie i prowadzacego przez
  wszystkie dziesiec kotwic kregoslupa po kolei, **rozbic** to na: (a) jeden lub dwa coach marki
  push, wyzwalane WYLACZNIE dla funkcji naprawde nieoczywistych (np. `simBtn` jesli jego ikona
  nie sugeruje symulacji), pokazane pojedynczo, z latwym zamknieciem [2]; (b) checklist lub
  "pokaz mi" jako punkt wejscia OPCJONALNY, z inicjatywy uzytkownika, nie z automatu przy
  pierwszym wejsciu [9]; (c) sample/demo (np. gotowy wczytany zespol agentow zamiast pustego
  plotna) jako mechanizm "learn by doing" dla trybu canvas/symulacji, zgodnie z logika training
  wheels [5][15].
- To jest zmiana architektury decyzji, nie tylko kosmetyki: R2 (automat kontra zaproszenie) z
  MASTER_PLAN pyta "czy tour ma sie wlaczac sam" - ten research sugeruje pytanie o oczko wyzej:
  **czy w ogole potrzebny jest JEDEN, spojny, wielokrokowy artefakt zwany "tour"**, czy lepiej
  rozbic to na kilka mniejszych, niezaleznie wyzwalanych mechanizmow, z ktorych zaden osobno nie
  nazywa sie "tour".

Zastrzezenie: ta rekomendacja NIE mowi "nie buduj niczego, co prowadzi uzytkownika za reke" - to
byloby przesada w drugim kierunku, nieuzasadniona zrodlami (R8, adwokat diabla, ma osobno
sprawdzic najmocniejsze argumenty przeciw wszelkiemu onboardingowi, nie tylko przeciw formie
tour). Mowi: **forma "jeden dlugi, automatyczny tour po calej aplikacji" ma najslabsze wsparcie
z dziewieciu rozwazanych form**, i to jest pytanie, na ktore ta kampania mnie poprosila o
odpowiedz.

---

## MATERIAL MARKETINGOWY

Ponizsze zrodla pochodza od firm sprzedajacych oprogramowanie do budowania tourow, checklist lub
podobnych mechanizmow onboardingowych, albo od blogow zyjacych z ruchu generowanego przez takie
firmy. Zadne twierdzenie z tej sekcji NIE zostalo uzyte jako dowod w sekcjach TL;DR, USTALENIA
ani REKOMENDACJA - trafily tu wylacznie jako material do zrozumienia, jak branza sama siebie
opisuje, zgodnie z zasada nr 2 MASTER_PLAN.

- **Intercom** (sprzedaje Product Tours jako funkcje platformy) - "mediana ukonczenia dla tour
  5-krokowego to 34%, srednia branzowa 23%" [3]. Brak ujawnionej metody liczenia "ukonczenia"
  ani wielkosci probki w dostepnej tresci.
- **Chameleon** (sprzedaje narzedzie do tourow, checklist, coach marks) - "srednia skutecznosc
  ukonczenia tour to 61%", "self-serve tours maja o 123% wyzsza skutecznosc ukonczenia",
  "wskazniki postepu podnosza ukonczenie o 12%" - z probki "15 milionow interakcji" [4]. Zadna
  z tych liczb nie daje sie zweryfikowac bez dostepu do pelnego raportu firmy; sprzeczna z
  liczba Intercom o 27-38 punktow procentowych.
- **Userpilot** (sprzedaje narzedzie do checklist i tourow) - "srednie ukonczenie checklisty
  19.2%, mediana 10.1%, probka 188 firm bedacych klientami Userpilot" [10]. Probka to
  wylacznie klienci jednego narzedzia, a wiec z gory samoselekcjonujaca sie populacja firm,
  ktore juz zdecydowaly sie na ten typ onboardingu.
- **Apptimize** (sprzedaje narzedzie do testow A/B, nie tourow bezposrednio, ale material
  promuje ich platforme testowa) - opis testu Vevo (N~160 000, 28 dni, wzrost logowan ~9.69%,
  wzrost rejestracji ~5.85% po dodaniu przycisku "pomin") [17]. Ten wpis jest o jeden stopien
  mniej problematyczny niz pozostale (Apptimize nie sprzedaje tour software, tylko narzedzie do
  eksperymentow, a opisany wynik jest konkretnym testem z liczba probki i czasem trwania), ale
  wciaz jest artykulem promujacym platforme dostawcy, wiec zostaje w tej sekcji, nie w USTALENIA.
- **Vidico i inne blogi produkujace filmy onboardingowe** - "wideo onboarding zwieksza
  aktywacje o 20-40%", "91% ludzi oglada wideo, zeby zrozumiec produkt" [14]. Zrodlo sprzedaje
  uslugi produkcji wideo, liczby bez ujawnionej metody.
- **Blogi growth/SaaS o "time to value"** - "kazde 10 minut skrocenia czasu do wartosci
  podnosi aktywacje o 8-12%", "TTFV powyzej 30 minut to 3x wyzsza rezygnacja" [15]. Brak
  ujawnionego zrodla pierwotnego badania, liczby powtarzane miedzy blogami bez cytowania
  wspolnego badania macierzystego - typowy wzorzec "faktu miejskiego" w tej branzy.
- **Growth.Design** - "comic strip" case studies (m.in. Headspace, Blinkist) [18], nazwanie
  klasycznego tour "Nickel Tour" jako powszechnego, ale malo uzytecznego wzorca. To jest
  materiał redakcyjny/edukacyjny, nie bezposrednia sprzedaz narzedzia do tourow, ale opiera sie
  o analize przypadkow bez ujawnionej metody badawczej (nie testy A/B, tylko interpretacja
  designu przez autorow bloga) - stad ladowanie tu, nie do USTALENIA, mimo ze nie jest to
  klasyczny "material sprzedawcy".

---

## CZEGO NIE USTALILEM

1. **Nie znalazlem bezposredniego testu porownawczego "tour vs sample data vs checklist" na
   TYM SAMYM produkcie** - kazde z badan/danych dotyczy innej aplikacji, innej kategorii, innej
   metody pomiaru. Caly ranking w tabeli jest zlozeniem osobnych, czesciowych dowodow, nie
   jednym spojnym eksperymentem. To jest najwazniejsza luka calego raportu.
2. **Nie znalazlem zadnego badania (niezaleznego ani marketingowego) specyficznie dla aplikacji
   typu "encyklopedia + konfigurator jednoczesnie"** - najblizsze analogie (narzedzia
   deweloperskie, IDE) dotycza innego typu interakcji (pisanie kodu) i nie sa bezposrednio
   przenoszalne, co zaznaczylem juz w sekcji o edukacyjnym rankingu. R7 z MASTER_PLAN ma ten
   temat zbadac glebiej niz ja tutaj - moj wniosek w tej sprawie jest wstepny, nie ostateczny.
3. **Nie zweryfikowalem zrodla pierwotnego dla podanej przez jeden z blogow liczby "interaktywne
   wskazowki NN/g redukuja czas zadania o 35% i podnosza sukces o 40%"** - ta konkretna liczba
   pojawila sie w agregowanym wyniku wyszukiwania przypisywanym NN/g, ale NIE znalazlem jej w
   zadnym z trzech bezposrednio przeczytanych artykulow NN/g [1][2][9] (ktore podaja INNE, mniej
   optymistyczne liczby - patrz punkt 1 w TL;DR). Traktuje to jako **niepotwierdzone i
   prawdopodobnie bledne przypisanie** (moze to byc pomylenie z innym badaniem albo
   zniekształcenie przez blog posredni) i celowo NIE umieszczam tej liczby ani w USTALENIA, ani
   nawet w MATERIAL MARKETINGOWY, zeby jej przypadkiem nie ucytowac dalej w lancuchu.
4. **Nie ustalilem dokladnej definicji "ukonczenia" tour u Intercom ani Chameleon** - bez tego
   sprzecznosc 34%/23% kontra 61% nie daje sie rozstrzygnac ani wyjasnic (moze to byc roznica w
   mianowniku: "wszyscy, ktorym pokazano" kontra "ci, ktorzy zaczeli"), tylko odnotowac jako
   dowod niespojnosci.
5. **Nie znalazlem badania mierzacego DLUGOTERMINOWY efekt** (np. czy uzytkownik po 30 dniach
   pamieta i uzywa funkcji pokazanej w tour, checklist czy sample data) - wszystkie znalezione
   dane dotycza momentu onboardingu (minuty, godziny, maksymalnie 28 dni w przypadku testu
   Vevo), nie retencji wiedzy w dluzszym horyzoncie. To jest szczegolnie istotne dla aplikacji
   edukacyjnej, gdzie cel to trwale zrozumienie, nie chwilowe wykonanie kroku.
6. **Nie sprawdzilem osobno akademickiej literatury HCI spoza Carroll/Carrithers** (np. nowsze
   prace z CHI/CSCW po roku 2010 na temat onboardingu w narzedziach nietransakcyjnych) - czas
   sesji poszedl w wieksz osci na potwierdzenie/obalenie tour jako formy, zgodnie z priorytetem
   pytania R5. To jest zasadny nastepny krok, jesli ktos zechce pogłębic dowod nr 3 z TL;DR.
7. **Nie zweryfikowalem, czy efekt Zeigarnik byl kiedykolwiek testowany bezposrednio w kontekscie
   onboardingu produktowego** (a nie tylko w oryginalnych eksperymentach z ukladankami z 1927
   roku) - polaczenie z checklistami produktowymi w znalezionych zrodlach jest interpretacja
   marketingowa, nie cytatem z badania stosujacego dokladnie ten mechanizm w tym kontekscie.

---

## ZRODLA (URL + etykieta konfliktu interesu)

[1] Nielsen Norman Group, "Mobile Tutorials: Wasted Effort or Efficiency Boost?",
https://www.nngroup.com/articles/mobile-tutorials/ - NIEZALEZNE (instytucja badawcza, nie
sprzedaje oprogramowania do tourow/onboardingu; badanie wlasne, N=70, opisana metoda).

[2] Nielsen Norman Group, "Instructional Overlays and Coach Marks for Mobile Apps",
https://www.nngroup.com/articles/mobile-instructional-overlay/ - NIEZALEZNE.

[3] Intercom Community, "What is the industry standard completion/goal rate for Product Tours?"
oraz Intercom Help, "See how your Product Tours are performing",
https://community.intercom.com/proactive-support-11/what-is-the-industry-standard-completion-goal-rate-for-product-tours-299,
https://www.intercom.com/help/en/articles/3027087-see-how-your-product-tours-are-performing -
KONFLIKT INTERESU: Intercom sprzedaje funkcje Product Tours jako czesc swojej platformy.

[4] Chameleon, "What We Learned Analyzing 15 Million Product Tour Interactions",
https://www.chameleon.io/blog/product-tour-benchmarks-highlights - KONFLIKT INTERESU:
Chameleon sprzedaje oprogramowanie do budowania tourow, checklist i coach marks.

[5] John M. Carroll, Caroline Carrithers, "Blocking Learner Error States in a Training-Wheels
System", Human Factors, 1984, https://journals.sagepub.com/doi/10.1177/001872088402600402 -
NIEZALEZNE (publikacja akademicka recenzowana, zero produktu do sprzedania).

[6] Streszczenie i omowienie tej samej pracy oraz oryginalu w Communications of the ACM,
"Training Wheels in a User Interface", https://dl.acm.org/doi/10.1145/358198.358218 (dostep do
pelnej tresci ograniczony platnym murem ACM, wykorzystano zbiorcze wyniki wyszukiwania i
cytowania w innych pracach jako zrodlo posrednie) - NIEZALEZNE, publikacja akademicka.

[7] "Training Wheels for the Command Line" (cytowanie i omowienie pracy w kontekscie CLI),
https://www.researchgate.net/publication/248147625_Training_Wheels_for_the_Command_Line -
NIEZALEZNE, publikacja akademicka.

[8] "Learning a word processing system with training wheels and guided exploration",
Proceedings of the SIGCHI/GI Conference on Human Factors in Computing Systems and Graphics
Interface, https://dl.acm.org/citation.cfm?id=275625 - NIEZALEZNE, publikacja akademicka.

[9] Nielsen Norman Group, "Onboarding Tutorials vs. Contextual Help",
https://www.nngroup.com/articles/onboarding-tutorials/ - NIEZALEZNE.

[10] Userpilot, "Customer Onboarding Checklist Completion Rate: 2025/2026 Benchmark Report",
https://userpilot.com/blog/onboarding-checklist-completion-rate-benchmarks/ - KONFLIKT INTERESU:
Userpilot sprzedaje oprogramowanie do checklist i tourow onboardingowych; probka to wylacznie
klienci tego narzedzia.

[11] Zbiorcze omowienie teorii minimalizmu instrukcyjnego Carrolla ("The Nurnberg Funnel"),
https://www.researchgate.net/publication/240801348_The_Nurnberg_Funnel_Designing_Minimalist_Instruction_for_Practical_Computer_Skill
oraz https://pdfs.semanticscholar.org/d8fd/1192c8936fab12e46cc9eb605e323e30ff52.pdf -
NIEZALEZNE, publikacje akademickie.

[12] Zbiorcze wyniki wyszukiwania o wzorcach map interfejsu i legend w projektowaniu map
cyfrowych (bez jednego dominujacego, cytowalnego zrodla dla tej dokladnej formy onboardingu) -
SLABE ZRODLO, brak jednej autorytatywnej publikacji, uzyte wylacznie do sformulowania hipotezy
w tabeli, nie twierdzenia w USTALENIA.

[13] Nielsen Norman Group, wzmianka o AR onboarding i przypadkach, gdzie push jest uzasadniony
(cytowana w [9]) - NIEZALEZNE.

[14] Vidico, "12 Best App Onboarding Video Examples" oraz pokrewne blogi o wideo onboardingowym,
https://vidico.com/news/best-app-onboarding-video-examples/ - KONFLIKT INTERESU: Vidico
produkuje wideo onboardingowe na zlecenie, ma bezposredni interes w promowaniu tej formy.

[15] Zbiorcze blogi growth/SaaS o "time to value" i sample data (Asana jako przyklad),
identyfikowane w wynikach wyszukiwania bez jednego dominujacego, niezaleznego zrodla pierwotnego
- CZESCIOWY KONFLIKT INTERESU: tresci typu growth-marketing, czesto powiazane z narzedziami
onboardingowymi lub analitycznymi.

[16] Wikipedia, "Zeigarnik effect" (opis oryginalnych eksperymentow Bluma Zeigarnik, 1927),
https://en.wikipedia.org/wiki/Zeigarnik_effect - NIEZALEZNE dla samego efektu psychologicznego;
zastosowanie do checklist onboardingowych pochodzi z osobnych, marketingowych zrodel (Userpilot,
LogRocket, Usetiful), oznaczonych jako KONFLIKT INTERESU tam, gdzie autor sprzedaje narzedzie
onboardingowe.

[17] Apptimize, "Why Vevo Got Rid of Onboarding Tutorial Screens",
https://apptimize.com/blog/2015/10/vevos-app-defies-user-onboarding-best-practices-heres-why/ -
CZESCIOWY KONFLIKT INTERESU: Apptimize sprzedaje platforme do testow A/B (nie bezposrednio tour
software), ale artykul promuje jej wlasna platforme jako narzedzie, ktorym przeprowadzono test.

[18] Growth.Design, katalog case studies, https://growth.design/case-studies - MATERIAL
REDAKCYJNY BEZ UJAWNIONEJ METODY BADAWCZEJ: nie sprzedaje bezposrednio oprogramowania do
onboardingu, ale analizy sa interpretacja designu przez autorow, nie testami empirycznymi.

Zrodla przywolane jako kontekst juz istniejacy w projekcie (NIE liczone jako nowe zrodla tego
raportu, zero powtorzenia zakresu): `v39/research/R2_interaktywne_wyjasnienia.md`,
`v39/research/R5_co_pomoglo_zrozumiec.md`.
