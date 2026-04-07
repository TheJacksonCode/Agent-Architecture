# INTEGRATOR (B-04) — Ostatni Agent Warstwy BUILD

## Kompletny Przewodnik Edukacyjny | Gold Standard 2026

---

# 1. WPROWADZENIE — Kim jest Integrator?

## Tam, Gdzie Czesci Staja Sie Caloscia

Integrator (B-04) to **ostatni agent warstwy BUILD** w architekturze Gold Standard 2026.
Jest to agent, w ktorym wszystkie osobno wytworzone elementy — kod, design, tresc —
**lacza sie w jeden spojny artefakt**. Przed Integratorem istnieja trzy oddzielne
strumienie pracy. Po Integratorze istnieje **gotowy produkt**, ktory trafia do QA.

Integrator to **brama miedzy BUILD a QA**. Jesli integracja sie nie powiedzie,
caly wysilek Kodera, Designera i Redaktora idzie na marne — nie dlatego, ze ich
praca byla zla, ale dlatego, ze nikt jej nie polaczyl w dzialajaca calosc.

### Trzy Analogie do Zrozumienia Roli Integratora

**Analogia 1: Monter Filmowy**

Wyobraz sobie produkcje filmowa. Operator nakreci setki godzin materialow.
Inzynier dzwieku nagral dialogi, efekty i dzwieki otoczenia. Kompozytor napisal
sciezke dzwiekowa. Kazdy z nich wykonal swoja prace perfekcyjnie — ale to NIE
jest jeszcze film. Film powstaje na stole montazowym. Monter filmowy przegrywa
materialy ze wszystkich zrodel, szuka najlepszych ujecc, synchronizuje dzwiek
z obrazem, buduje rytm narracji i tworzy cos, czego ZADNA z czesci nie mogla
osiagnac samodzielnie. Wielki monter sprawia, ze indywidualne elementy zaczynaja
**spiewac razem**. Integrator jest montazystka filmowym architektury Gold Standard —
bierze surowe wyjscia od Kodera, Designera i Redaktora i montuje je w gotowy
artefakt.

**Analogia 2: Szef Kuchni na Wydawce (Chef de Cuisine)**

W restauracji z gwiazdka Michelin kazda sekcja kuchni pracuje niezaleznie.
Grill przygotowuje mieso, cukiernia desery, zimna kuchnia salatki i przystawki.
Kazda stacja produkuje swoj element na najwyzszym poziomie. Ale to szef kuchni
na wydawce (expeditor) decyduje, kiedy kazdy talerz jest KOMPLETNY. Sprawdza,
czy sos pasuje do miesa, czy dekoracja jest spojnna z reszta dania, czy temperatura
kazdego elementu jest wlasciwa. Jesli grill przygotowal steka medium-rare,
a cukiernia uzywa sosow, ktore zabija smak miesa — szef kuchni ROZWIAZUJE
ten konflikt. Nie gotuje sam — ale komponuje z gotowych elementow. Integrator
dziala identycznie: nie pisze kodu, nie projektuje, nie redaguje — ale LACZY
gotowe elementy w harmonijny posilek.

**Analogia 3: Dyrygent na Probie Generalnej**

Poszczegolne sekcje orkiestry cwiczoly osobno przez tygodnie. Skrzypce
opanowaly swoja partie perfekcyjnie. Dete blaszane brzmia doskonale.
Perkusja jest nienaganna. Ale na probie generalnej dyrygent po raz pierwszy
slyszy WSZYSTKO razem — i odkrywa, ze skrzypce zagluszyaja flety w takcie 47,
ze tempo perkusji rozjezdy sie z reszta w przejsciu miedzy czesciami,
ze dynamika jest niespojnna. Dyrygent nie gra na zadnym instrumencie.
Jego rola to sprawic, by indywidualnie doskonale czesci brzmialy doskonale
**RAZEM**. Integrator jest dyrygentem proby generalnej — slucha wszystkich
czesci jednoczesnie i znajduje miejsca, gdzie sie gryzya.

> **Kluczowa zasada:** Integrator to agent, w ktorym **oddzielne strumienie
> pracy przestaja byc oddzielne** i zaczynaja byc **jednym spojnym artefaktem**.
> Przed Integratorem istnieja fragmenty. Po Integratorze istnieje calosc.

---

> **Czy wiesz, ze...?**
> Integrator ma najwyzszy budzet tokenow wejsciowych (Input) w calej warstwie
> BUILD: 1,000-4,000 tokenow. Dlaczego? Bo musi przeczytac WSZYSTKIE wyjscia
> od Kodera, Designera i Redaktora — jest jedynym builderem, ktory widzi
> prace WSZYSTKICH pozostalych.

---

# 2. KLUCZOWE OBOWIAZKI

Integrator odpowiada za **piec podstawowych obszarow**:

## 2.1 Laczenie Wynikow Builderow (Output Merging)

To glowne i najbardziej oczywiste zadanie Integratora. Otrzymuje gotowe wyjscia
od trzech poprzednich builderow i laczy je w jeden artefakt:

- Pobranie kodu HTML/JS od Kodera (B-01)
- Pobranie stylow CSS i assetow od Designera (B-02)
- Pobranie tresci tekstowych od Redaktora (B-03)
- Polaczenie tych elementow w jedna, dzialajaca calosc
- Zapewnienie, ze kazdy element jest we wlasciwym miejscu

Przyklad: Koder dostarczyl szkielet HTML z placeholderami. Designer dostarczyl
arkusz CSS i ikony. Redaktor dostarczyl teksty i opisy. Integrator wstawia
teksty w odpowiednie miejsca HTML, podlacza CSS, umieszcza ikony i sprawdza,
czy wszystko wyswietla sie poprawnie.

## 2.2 Rozwiazywanie Konfliktow Miedzy Workerami (Conflict Resolution)

To najbardziej wymagajaca intelektualnie czesc pracy Integratora. Kiedy trzech
niezaleznych workerow pracuje rownolegle, konflikty sa NIEUNIKNIONE:

- **Koder vs Designer:** Koder uzywa klasy `.btn-primary`, Designer
  zdefiowal styl dla `.button-main` — nazwy sie nie zgadzaja
- **Koder vs Redaktor:** Koder przewidzial 50-znakowy tytul,
  Redaktor napisal tytul na 120 znakow — layout sie rozjezdza
- **Designer vs Redaktor:** Designer zaplanoval minimalistyczny layout
  z duza iloscia bialej przestrzeni, Redaktor dostarczyl obszerny tekst
  ktory te przestrzen wypelnia

Integrator musi zdecydowac, jak rozwiazac kazdy taki konflikt — bez
eskalowania do Orkiestratora (chyba ze konflikt jest fundamentalny).

```
PRZYKLAD KONFLIKTU I ROZWIAZANIA:
================================

KODER dostarczyl:
  <div class="card-header">
    <h2 id="title">{{TITLE}}</h2>
  </div>

DESIGNER oczekiwal:
  .card-header h2 { max-width: 200px; overflow: hidden; }

REDAKTOR dostarczyl:
  TITLE = "Kompleksowa analiza wplywu sztucznej inteligencji
           na transformacje cyfrowa przedsiebiorstw"

KONFLIKT: Tytul (87 znakow) nie zmiesci sie w 200px kontenera.

ROZWIAZANIE INTEGRATORA:
  - Dodac CSS: text-overflow: ellipsis; white-space: nowrap;
  - Dodac atrybut title="" z pelna trescia (tooltip)
  - Zachowac intencje WSZYSTKICH workerow
```

## 2.3 Testowanie E2E Calego Artefaktu (End-to-End Testing)

Po zlaczeniu elementow Integrator musi zweryfikowac, ze calosc DZIALA:

- Uruchomienie artefaktu w srodowisku testowym (Bash)
- Sprawdzenie, czy wszystkie linki i odwolania sa prawidlowe
- Weryfikacja, ze CSS jest poprawnie podlaczony
- Testowanie interaktywnych elementow (JavaScript)
- Sprawdzenie responsywnosci i kompatybilnosci

> **Uwaga!**
> E2E testing to NIE jest testowanie bezpieczenstwa (to rola QA Security)
> ani testowanie jakosci kodu (to rola QA Quality). Integrator testuje
> jedynie czy **polaczone elementy dzialaja razem** — czy integracja
> sie powiodla.

## 2.4 Walidacja Zgodnosci z MANIFEST.md (Manifest Validation)

MANIFEST.md to dokument spelniajacy role "umowy" miedzy zleceniodawca
a systemem. Integrator sprawdza, czy zintegrowany artefakt spelnia
WSZYSTKIE wymagania zapisane w MANIFEST:

- Kazdy wymog z MANIFEST.md ma swoje odzwierciedlenie w artefakcie
- Nie brakuje zadnej wymaganej funkcjonalnosci
- Nie dodano niczego, czego MANIFEST nie przewidywal
- Artefakt jest zgodny ze specyfikacja techniczna

## 2.5 Produkcja Zintegrowanego Artefaktu (Final Artifact Production)

Koncowy krok: Integrator produkuje finalny, zintegrowany artefakt,
ktory przechodzi do warstwy QA:

- Jeden spojny plik (lub zestaw plikow) gotowy do review
- Dokumentacja zmian i rozwiazanych konfliktow
- Raport z testow E2E
- Potwierdzenie zgodnosci z MANIFEST.md

---

> **Czy wiesz, ze...?**
> Integrator jest JEDYNYM agentem w warstwie BUILD, ktory widzi prace
> WSZYSTKICH innych builderow. Koder nie widzi, co robi Designer.
> Designer nie widzi, co pisze Redaktor. Tylko Integrator ma pelny
> obraz sytuacji — dlatego to on rozwiazuje konflikty.

---

# 3. CZEGO INTEGRATOR NIE ROBI

Zrozumienie granic roli jest rownie wazne jak zrozumienie samej roli:

| Czynnosc | Kto to robi | Dlaczego NIE Integrator |
|----------|-------------|------------------------|
| Pisanie nowego kodu od zera | Koder (B-01) | Integrator LACZY istniejacy kod, nie tworzy nowego |
| Projektowanie UI/UX | Designer (B-02) | Integrator nie podejmuje decyzji estetycznych |
| Tworzenie tresci tekstowych | Redaktor (B-03) | Integrator nie pisze copywritingu |
| Prowadzenie badan | Researcherzy (R-01..R-06) | Integrator nie szuka informacji |
| Decyzje strategiczne | Orkiestrator (C-01) | Integrator nie decyduje CO budowac, tylko JAK polaczyc |
| Testowanie bezpieczenstwa | QA Security (Q-01) | Integrator testuje integracje, nie bezpieczenstwo |
| Ocena jakosci kodu | QA Quality (Q-02) | Integrator nie robi code review |

> **Uwaga!**
> Najczestszy anty-wzorzec to sytuacja, gdy Integrator zaczyna PRZEPISYWAC
> kod zamiast go integrowac. Jesli odkrywa blad w kodzie Kodera, powinien
> rozwiazac go minimalnie (np. poprawic nazwe klasy CSS), NIE przepisywac
> calego modulu. Przepisywanie to domena Kodera — Integrator klei,
> nie buduje od nowa.

---

# 4. MODEL I KOSZT

## Parametry Techniczne

| Parametr | Wartosc | Komentarz |
|----------|---------|-----------|
| Model | Claude Sonnet | Rownowaznie jak Koder i Designer |
| Koszt Input | $3 / 1M tokenow | Standardowa stawka Sonnet |
| Koszt Output | $15 / 1M tokenow | Standardowa stawka Sonnet |
| Load | 70/100 | Drugie najwyzsze obciazenie w BUILD (po Koderze: 80) |
| Input tokens | 1,000 - 4,000 | NAJWYZSZY w BUILD — musi czytac WSZYSTKIE wyjscia |
| Output tokens | 500 - 2,000 | Sredni — produkuje jeden zintegrowany artefakt |
| Total tokens | 1,800 - 6,300 | Rozlegly zakres — zalezy od zlozonosci projektu |
| Koszt per task | $0.05 - $0.19 | Sredni koszt w warstwie BUILD |
| Wywolania na run | 1 | Pojedyncze, sekwencyjne wywolanie |

## Dlaczego Najwyzszy Input?

Integrator musi przeczytac:
1. **Cale wyjscie Kodera** — kod HTML, JavaScript, logika
2. **Cale wyjscie Designera** — CSS, assety, specyfikacja wizualna
3. **Cale wyjscie Redaktora** — teksty, opisy, CTA
4. **MANIFEST.md** — wymagania do walidacji

To daje 4 pelne dokumenty do przetworzenia — zadne inny builder nie czyta
tylu zrodel jednoczesnie.

---

> **Czy wiesz, ze...?**
> Przy typowym zadaniu Integrator zuzywa wiecej tokenow wejsciowych
> niz jakikolwiek inny builder, ale mniej tokenow wyjsciowych niz Koder.
> To dlatego, ze Integrator glownie CZYTA i LACZY, a nie generuje
> od zera — proporcja czytania do pisania wynosi mniej wiecej 2:1.

---

# 5. NARZEDZIA — PELNY ARSENAL

Integrator dysponuje **pelnym zestawem narzedzi** — i jest to uzasadnione.
Oto kompletna lista:

| Narzedzie | Do czego Integrator go uzywa |
|-----------|------------------------------|
| **Read** | Czytanie wyjsc od Kodera, Designera, Redaktora |
| **Write** | Tworzenie zintegrowanego artefaktu koncowego |
| **Edit** | Modyfikacja plikow w celu rozwiazywania konfliktow |
| **Grep** | Szukanie niespojnosci (np. brakujacych klas CSS) |
| **Glob** | Przeglad struktury plikow dostarczonych przez workerow |
| **Bash** | Uruchamianie testow E2E, budowanie, walidacja |

### Dlaczego Integrator Potrzebuje Bash?

Bash to kluczowe narzedzie dla Integratora, bo umozliwia:

```bash
# Sprawdzenie czy HTML jest poprawny
html-validate integrated_output.html

# Uruchomienie testow E2E
npm run test:e2e

# Sprawdzenie czy wszystkie zasoby sa dostepne
curl -I http://localhost:3000/assets/style.css

# Walidacja struktury plikow
ls -la output/ && cat output/MANIFEST_CHECK.log
```

### Narzedzia Zabronione

| Narzedzie | Dlaczego zabronione |
|-----------|---------------------|
| **Agent** | Integrator nie deleguje — sam jest koncowym wykonawca |
| **WebSearch** | Nie prowadzi badan — wszystkie dane ma od workerow |
| **WebFetch** | Nie pobiera zewnetrznych zasobow — pracuje z tym, co dostal |

> **Uwaga!**
> Integrator ma **najszerszy dostep do narzedzi** w calej warstwie BUILD.
> Koder nie ma Grep/Glob (nie szuka plikow — tworzy je). Designer nie ma
> Bash (nie uruchamia testow). Integrator potrzebuje WSZYSTKIEGO, bo
> jego praca obejmuje czytanie, szukanie, edycje, pisanie I testowanie.

---

# 6. WORKFLOW — OD CZESCI DO CALOSCI

## 8-Krokowy Pipeline Integracyjny

Integrator pracuje wedlug scislego, 8-krokowego procesu:

```
KROK 1: ZBIERANIE           Pobierz wyjscia od Kodera, Designera, Redaktora
   |
   v
KROK 2: ODCZYT MANIFEST     Przeczytaj MANIFEST.md — to twoja "lista kontrolna"
   |
   v
KROK 3: IDENTYFIKACJA       Porownaj wyjscia workerow, znajdz konflikty
   |                         i niespojnosci
   v
KROK 4: ROZWIAZYWANIE       Rozwiaz kazdy zidentyfikowany konflikt
   |                         (minimalna ingerencja!)
   v
KROK 5: LACZENIE            Polacz rozwiazane elementy w jeden artefakt
   |
   v
KROK 6: TESTY E2E           Uruchom testy end-to-end na polaczonym artefakcie
   |
   v
KROK 7: WALIDACJA           Sprawdz zgodnosc z MANIFEST.md punkt po punkcie
   |
   v
KROK 8: DOSTARCZENIE        Przekaz zintegrowany artefakt do QA
                             (Security + Quality rownolegle)
```

### Szczegolow Krokow Krytycznych

**KROK 3 — Identyfikacja konfliktow** to moment, w ktorym Integrator
uzywa Grep i Glob najintensywniej. Typowe sprawdzenia:

```
Grep: Szukaj klas CSS uzywanych w HTML, ale nieobecnych w CSS
Grep: Szukaj placeholderow {{...}} ktore nie zostaly wypelnione
Glob: Sprawdz czy wszystkie pliki wymienione w imporcie istnieja
Read: Porownaj nazwy zmiennych miedzy kodem a dokumentacja
```

**KROK 6 — Testy E2E** to moment, w ktorym Bash jest niezbedny:

```bash
# Krok 6a: Sprawdz skladnie
node --check integrated_app.js

# Krok 6b: Uruchom lokalnie
node integrated_app.js &
SERVER_PID=$!

# Krok 6c: Przetestuj endpointy
curl -s http://localhost:3000 | grep -q "<title>"

# Krok 6d: Zatrzymaj serwer
kill $SERVER_PID
```

---

# 7. INTEGRATOR JAKO WASKIE GARDLO (Bottleneck Analysis)

## Dlaczego Integrator Jest Sekwencyjny?

W architekturze Gold Standard 2026 Koder, Designer i Redaktor moga pracowac
**rownolegle** — ich zadania sa niezalezne. Ale Integrator MUSI czekac,
az WSZYSCY trzej skoncza:

```
      +--------+
      | KODER  |----+
      +--------+    |
                    |
      +----------+  |    +------------+     +-----------+
      | DESIGNER |--+--->| INTEGRATOR |---->| QA (x2)   |
      +----------+  |    +------------+     +-----------+
                    |
      +----------+  |
      | REDAKTOR |--+
      +----------+

      [ROWNOLEGLE]       [SEKWENCYJNE]     [ROWNOLEGLE]
```

Integrator jest **waskien gardlem** (bottleneck) z definicji:

1. **Nie mozna go zrownoleglowac** — potrzebuje WSZYSTKICH wyjsc naraz
2. **Nie mozna go rozpoczac wczesniej** — czesciowe wyjscia sa bezuzyteczne
3. **Blokuje caly QA** — dopoki Integrator nie skonczy, QA nie zaczyna

## Jak Minimalizowac Wplyw Waskiego Gardla?

| Strategia | Opis |
|-----------|------|
| Standaryzacja interfejsow | Jesli Koder, Designer i Redaktor uzywaja tych samych konwencji nazewniczych, Integrator ma mniej konfliktow do rozwiazania |
| Jasny MANIFEST | Im precyzyjniej MANIFEST.md definiuje wymagania, tym szybsza walidacja |
| Szablony integracji | Predefiniowane schematy laczenia zmniejszaja czas integracji |
| Ograniczenie zakresu | Mniejsze zadania = mniej do integracji = szybszy Integrator |

## Analiza Sciezki Krytycznej

Sciezka krytyczna calego BUILD to:

```
Najwolniejszy builder (np. Koder) + Integrator = calkowity czas BUILD

Przyklad:
  Koder:      45 sekund  (najwolniejszy)
  Designer:   30 sekund
  Redaktor:   20 sekund
  Integrator: 35 sekund
  ---------------------------------
  Total BUILD: 45 + 35 = 80 sekund
               (nie 45+30+20+35, bo builderzy sa rownolegli!)
```

> **Czy wiesz, ze...?**
> Gdyby Integrator mogl zaczac prace PO kazdym builderze osobno
> (inkrementalnie), czas BUILD spadlby do ok. 60 sekund. Ale to
> wymagaloby, zeby Integrator widzial czesciowe wyjscia — a to
> prowadzi do bledow integracyjnych (bo np. Koder moze zmienic
> strukture HTML po tym, jak Integrator juz wstawil CSS).

---

# 8. INTEGRATOR VS INNE BUILDERZY

## Tabela Porownawcza

| Cecha | Koder (B-01) | Designer (B-02) | Redaktor (B-03) | **Integrator (B-04)** |
|-------|-------------|-----------------|-----------------|----------------------|
| **Rola** | Pisze kod | Tworzy design | Pisze tresci | **Laczy wszystko** |
| **Model** | Sonnet | Sonnet | Sonnet | **Sonnet** |
| **Load** | 80/100 | 60/100 | 50/100 | **70/100** |
| **Input tokens** | 800-3000 | 600-2500 | 500-2000 | **1000-4000** |
| **Output tokens** | 1000-4000 | 500-2500 | 500-2000 | **500-2000** |
| **Widzi prace innych?** | Nie | Nie | Nie | **TAK — WSZYSTKICH** |
| **Moze pracowac rownolegle?** | Tak | Tak | Tak | **NIE** |
| **Narzedzia** | Write, Edit, Bash | Write, Edit | Write, Edit | **WSZYSTKIE (6)** |
| **Wywolania** | 1-3 | 1-2 | 1-2 | **1** |
| **Pozycja** | Pierwszy | Rownolegly | Rownolegly | **Ostatni** |

### Kluczowe Roznice

**Integrator vs Koder:**
- Koder TWORZY kod od zera, Integrator LACZY istniejacy kod
- Koder ma wyzsze obciazenie (80 vs 70) bo generowanie jest trudniejsze
- Integrator widzi prace Kodera, Koder nie widzi pracy Integratora

**Integrator vs Designer:**
- Designer podejmuje decyzje estetyczne, Integrator je implementuje
- Designer nie potrzebuje Bash, Integrator tak (do testow)
- Integrator rozwiazuje konflikty miedzy Designerem a innymi

**Integrator vs Redaktor:**
- Redaktor produkuje tresc, Integrator ja osadza w artefakcie
- Redaktor ma najnizsze obciazenie (50), Integrator drugie najwyzsze (70)
- Integrator musi zrozumiec tresc, by wstawic ja w odpowiednie miejsce

---

# 9. BEZPIECZENSTWO — RYZYKO SEC-010

## Dlaczego Integrator Jest Ryzykiem Bezpieczenstwa?

Integrator ma **najwyzszy poziom uprawnien** w calej warstwie BUILD:

```
MACIERZ UPRAWNIEN W BUILD:
==========================

              READ outputs   WRITE final   BASH access   Total privilege
Koder         [ ]             [x]           [x]           SREDNI
Designer      [ ]             [x]           [ ]           NISKI
Redaktor      [ ]             [x]           [ ]           NISKI
INTEGRATOR    [x] WSZYSTKIE   [x]           [x]           >>> WYSOKI <<<
```

### Wektor Ataku SEC-010

Scenariusz zagrozenia: jesli Integrator zostanie "zatruy" (prompt injection
w jednym z wyjsc workerow), ma uprawnienia do:

1. **Odczytania WSZYSTKICH wyjsc** — widzi caly kod, design i tresc
2. **Modyfikacji WSZYSTKIEGO** — moze zmienic dowolny element artefaktu
3. **Uruchamiania komend Bash** — moze wykonywac polecenia systemowe
4. **Produkcji finalnego artefaktu** — jego output idzie bezposrednio do QA

To czyni Integratora **najcenniejszym celem ataku** w warstwie BUILD.
Kompromitacja Integratora = kompromitacja calego outputu BUILD.

### Mitygacje

| Mitygacja | Opis |
|-----------|------|
| Brak Agent | Integrator NIE moze delegowac ani tworzyc nowych agentow |
| Brak WebSearch/WebFetch | Nie moze komunikowac sie ze swiatem zewnetrznym |
| QA podwojne | Output Integratora przechodzi przez DWA niezalezne QA |
| Sandbox Bash | Polecenia Bash ograniczone do srodowiska testowego |
| Token budget | Ograniczony budzet tokenow uniemozliwia nieograniczone dzialanie |

> **Uwaga!**
> Ryzyko SEC-010 to glowny powod, dla ktorego po Integratorze istnieja
> DWA oddzielne agenty QA (Security i Quality), a nie jeden. Podwojne
> sprawdzenie minimalizuje ryzyko, ze zatruy artefakt przejdzie
> przez kontrole jakosci.

---

# 10. ANTY-WZORCE

Oto piec najczesciej spotykanych bledow w konfiguracji i pracy Integratora:

## 10.1 Rewrite Instead of Merge (Przepisywanie Zamiast Laczenia)

**Objaw:** Integrator otrzymuje kod od Kodera i zamiast go zintegrowac,
przepisuje znaczna czesc od nowa "bo tak bedzie lepiej".

**Dlaczego to zle:**
- Lamie zasade separacji odpowiedzialnosci
- Moze wprowadzic nowe bledy (Integrator nie jest zoptymalizowany do pisania kodu)
- Marnuje tokeny na generowanie zamiast na laczenie
- Pomija oryginalna logike Kodera, ktora byla przetestowana

**Rozwiazanie:** Integrator powinien modyfikowac MINIMALNIE — tylko tyle,
ile potrzeba do rozwiazania konfliktu lub zapewnienia spojnosci.

## 10.2 Conflict Avoidance (Unikanie Konfliktow)

**Objaw:** Integrator wykrywa konflikt miedzy Koderem a Designerem,
ale zamiast go rozwiazac, po prostu bierze jednego workera i ignoruje drugiego.

**Dlaczego to zle:**
- Czesc pracy jednego workera jest tracona
- Artefakt nie spelnia pelnej specyfikacji
- QA wykryje problem i odrzuci artefakt

**Rozwiazanie:** Kazdy konflikt musi byc AKTYWNIE rozwiazany — tak,
by intencje OBU stron byly zachowane w mozliwym stopniu.

## 10.3 Skip E2E (Pominiecie Testow End-to-End)

**Objaw:** Integrator laczy elementy, waliduje MANIFEST, ale nie uruchamia
testow E2E — "wyglada dobrze, wiec pewnie dziala".

**Dlaczego to zle:**
- Konflikty moga byc niewidoczne bez uruchomienia (np. blad JS w runtime)
- QA otrzymuje artefakt z bledami, ktore latwo bylo wykryc
- Cykl QA->BUILD->QA wydluza sie niepotrzebnie

**Rozwiazanie:** ZAWSZE uruchamiaj testy E2E przed dostarczeniem do QA.
Uzyj Bash do uruchomienia przynajmniej podstawowych sprawdzen.

## 10.4 Manifest Blindness (Slepota na MANIFEST)

**Objaw:** Integrator laczy, testuje, dostarcza — ale nie sprawdza
MANIFEST.md. Artefakt dziala technicznie, ale nie spelnia wymagan.

**Dlaczego to zle:**
- Artefakt moze byc technicznie poprawny, ale funkcjonalnie niekompletny
- QA odrzuci artefakt za brak wymaganych funkcjonalnosci
- Kolejna iteracja kosztuje czas i tokeny

**Rozwiazanie:** MANIFEST.md to checklista — przejdz ja punkt po punkcie
PRZED dostarczeniem artefaktu.

## 10.5 Scope Creep Integration (Dodawanie Funkcji Podczas Integracji)

**Objaw:** Integrator widzi, ze "brakuje" jakiejs funkcji i postanawia
ja dodac sam — pisze nowy kod, dodaje nowe style, tworzy nowe tresci.

**Dlaczego to zle:**
- Integrator nie jest zoptymalizowany do tworzenia (jest zoptymalizowany do laczenia)
- Nowe elementy nie przeszly przez pipeline (brak review Orkiestratora)
- Moze wprowadzic niespojnosci z reszta artefaktu

**Rozwiazanie:** Jesli brakuje funkcji, Integrator powinien to ZARAPORTOWAC,
nie naprawiac sam. Brak funkcji = problem wczesniejszego etapu.

---

# 11. NAJLEPSZE PRAKTYKI

## 8 Zasad Efektywnej Integracji

### 11.1 Czytaj MANIFEST Jako Pierwszy Krok

Zanim dotkniesz jakiegokolwiek wyjscia workera, przeczytaj MANIFEST.md.
To definiuje twoje kryteria sukcesu. Wszystko, co robisz potem, powinno
byc mierzone tym dokumentem.

### 11.2 Mapuj Konflikty Przed Rozwiazywaniem

Nie rozwiazuj konfliktow jeden po jednym — najpierw zidentyfikuj WSZYSTKIE.
Niektore konflikty sa powiazane i rozwiazanie jednego moze rozwiazac
(lub pogorszyc) inny.

### 11.3 Zasada Minimalnej Ingerencji

Kazda modyfikacja powinna byc MINIMALNA — zmien tylko tyle, ile potrzeba.
Im mniej zmieniasz, tym mniejsze ryzyko wprowadzenia nowych bledow.

### 11.4 Testuj Po Kazdym Duzym Merge'u

Nie czekaj z testami do samego konca. Polacz CSS z HTML — przetestuj.
Dodaj JavaScript — przetestuj. Wstaw tresci — przetestuj. Inkrementalne
testowanie pozwala szybko zlokalizowac problemy.

### 11.5 Dokumentuj Rozwiazane Konflikty

Kazdy rozwiazany konflikt zapisz: co bylo sprzeczne, jak rozwiazales,
dlaczego tak. To pomaga QA zrozumiec twoje decyzje i ulatwia debug.

### 11.6 Waliduj Dwukierunkowo

Nie sprawdzaj tylko "czy MANIFEST jest spelniony". Sprawdz tez odwrotnie:
"czy artefakt nie zawiera czeegos, czego MANIFEST nie przewidywal".
Nadmiarowe elementy moga byc rownie problematyczne jak brakujace.

### 11.7 Zachowaj Oryginalna Strukture Workerow

Jesli Koder uzywa okreslonej struktury katalogow, zachowaj ja.
Jesli Designer stosuje okreslona konwencje nazewnicza, stosuj ja.
Twoja rola to LACZENIE, nie REORGANIZACJA.

### 11.8 Przygotuj Raport Integracyjny

Dostarcz QA nie tylko artefakt, ale rowniez krotki raport:
- Co zostalo polaczone
- Jakie konflikty rozwiazano (i jak)
- Wyniki testow E2E
- Status zgodnosci z MANIFEST.md

---

> **Czy wiesz, ze...?**
> W profesjonalnej inzynierii oprogramowania faza integracji jest
> statystycznie miejscem, w ktorym pojawia sie najwiecej bledow.
> Nie dlatego, ze integratorzy sa gorsi — ale dlatego, ze integracja
> to jedyny moment, w ktorym WSZYSTKIE czesci spotykaja sie po raz
> pierwszy. Bledy, ktore sa niewidoczne w izolacji, staja sie
> widoczne dopiero po polaczeniu.

---

# 12. PODSUMOWANIE

## Integrator w Jednym Akapicie

Integrator (B-04) to ostatni agent warstwy BUILD, odpowiedzialny za polaczenie
wyjsc od Kodera, Designera i Redaktora w jeden spojny artefakt. Rozwiazuje
konflikty miedzy workerami, testuje zintegrowana calosc end-to-end i waliduje
zgodnosc z MANIFEST.md. Jest sekwencyjnym waskien gardlem — musi czekac na
wszystkich builderow — ale jest tez BRAMA do QA: nic nie przejdzie dalej
bez jego akceptacji. Ma najwyzszy poziom uprawnien w BUILD (ryzyko SEC-010),
co uzasadnia podwojny QA review po jego pracy.

---

## Quick Reference Card

```
+=====================================================================+
|                   INTEGRATOR (B-04) — QUICK REFERENCE               |
+=====================================================================+
|                                                                     |
|  WARSTWA:    BUILD / LACZENIE (Level 3)                             |
|  MODEL:      Claude Sonnet ($3/$15 per 1M tokens)                   |
|  LOAD:       70/100 (drugie najwyzsze w BUILD)                      |
|                                                                     |
|  TOKENY:     Input: 1,000-4,000 (NAJWYZSZY w BUILD)                |
|              Output: 500-2,000                                      |
|              Total: 1,800-6,300                                     |
|  KOSZT:      $0.05 - $0.19 per task                                 |
|  WYWOLANIA:  1 (sekwencyjne)                                       |
|                                                                     |
+---------------------------------------------------------------------+
|  NARZEDZIA:  Write | Edit | Bash | Read | Grep | Glob              |
|  ZABRONIONE: Agent | WebSearch | WebFetch                           |
+---------------------------------------------------------------------+
|                                                                     |
|  5 OBOWIAZKOW:                                                      |
|    1. Laczenie wynikow builderow                                    |
|    2. Rozwiazywanie konfliktow                                      |
|    3. Testowanie E2E                                                |
|    4. Walidacja MANIFEST.md                                         |
|    5. Produkcja zintegrowanego artefaktu                            |
|                                                                     |
+---------------------------------------------------------------------+
|  PIPELINE:                                                          |
|    Koder -> Designer -> Redaktor -> [INTEGRATOR] -> QA (x2)        |
|                                                                     |
|  SYSTEM PROMPT:                                                     |
|    - API contracts spojne                                           |
|    - Rozwiaz konflikty                                              |
|    - E2E test calego flow                                           |
|    - MANIFEST.md spelniony                                          |
|    - Zintegrowany output                                            |
|                                                                     |
+---------------------------------------------------------------------+
|  RYZYKO:     SEC-010 (wysoki privilege — czyta WSZYSTKO + pisze     |
|              finalny artefakt)                                      |
|  MITYGACJA:  Podwojne QA, brak Agent/Web, sandbox Bash              |
+=====================================================================+
```

---

## Slownik Pojec

| Termin | Definicja |
|--------|-----------|
| **Artefakt** | Koncowy produkt pracy — np. plik HTML, aplikacja, raport. Integrator produkuje "zintegrowany artefakt" — polaczenie wyjsc wszystkich builderow |
| **Bottleneck (waskie gardlo)** | Punkt w pipeline, ktory ogranicza przepustowosc calego systemu. Integrator jest bottleneckiem, bo jest sekwencyjny |
| **Conflict Resolution** | Proces rozwiazywania sprzecznosci miedzy wyjsciami roznych workerow (np. Koder vs Designer) |
| **E2E (End-to-End)** | Testowanie calego przeplywy od poczatku do konca, w odroznieniu od testowania pojedynczych komponentow |
| **Expeditor** | W gastronomii: osoba koordynujaca wydawanie dan z kuchni. Analogia do roli Integratora |
| **MANIFEST.md** | Dokument definiujacy wymagania projektu. Integrator waliduje artefakt przeciwko MANIFEST |
| **Merge** | Polaczenie wielu zrodel w jeden spojny wynik. Podstawowa operacja Integratora |
| **Output Merging** | Proces zbierania i laczenia wyjsc od wielu workerow w jeden artefakt |
| **Pipeline** | Sekwencja krokow przetwarzania. BUILD pipeline: Koder -> Designer -> Redaktor -> Integrator |
| **Prompt Injection** | Atak polegajacy na wstrzyknieciu zlosliwych instrukcji do wejscia agenta AI. Ryzyko SEC-010 |
| **QA (Quality Assurance)** | Warstwa kontroli jakosci. Po Integratorze nastepuja QA Security i QA Quality rownolegle |
| **SEC-010** | Oznaczenie ryzyka bezpieczenstwa zwiazanego z wysokimi uprawnieniami Integratora |
| **Sekwencyjny** | Wykonywany po kolei (nie rownolegle). Integrator jest sekwencyjny — musi czekac na wszystkich builderow |
| **Scope Creep** | Niekontrolowane rozszerzanie zakresu pracy poza oryginalne wymagania |

---

## Zrodla

- Gold Standard 2026 — Specyfikacja Architektury Multi-Agent
- Observatory Dashboard — Metryki i konfiguracja agentow
- System Prompt Integratora — Oficjalne wytyczne
- SEC-010 Risk Assessment — Analiza bezpieczenstwa warstwy BUILD

---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz 5-7 minutowa prezentacje wideo o roli Integratora (B-04) w architekturze
Gold Standard 2026.

**Hook (0:00-0:30):** Otwarcie pytaniem: "Poszczegolne instrumenty brzmia
doskonale w izolacji. Ale czy potrafia grac RAZEM?" Wizualizacja: trzy
oddzielne strumienie kodu (HTML, CSS, tekst) plyna po ekranie osobno —
potem zbiegaja sie w jednym punkcie i formuja gotowy artefakt. Efekt
"elektrycznego polaczenia" z iskrami w kolorze fioletowym.

**Czesc 1 — Kim jest Integrator? (0:30-1:30):** Animacja pipeline BUILD:
Koder, Designer, Redaktor pracuja rownolegle (trzy rownoglegle sciezki
z pulsujacymi ikonami). Ich wyjscia zbiegaja sie w jednym wezle —
Integratorze. Podkreslenie: to jedyny builder, ktory widzi WSZYSTKO.
Analogia montazysty filmowego z wizualizacja stolu montazowego.

**Czesc 2 — 5 Obowiazkow (1:30-3:00):** Kazdy obowiazek jako osobna
animacja: (1) trzy dokumenty wlatuja i lacza sie w jeden, (2) dwa
kolidujace elementy z czerwona strzalka -> rozwiazanie z zielonym
checkmarkiem, (3) terminal z uruchomionymi testami E2E, (4) MANIFEST.md
z odhaczanymi checkboxami, (5) finalny artefakt z aureola "DONE".

**Czesc 3 — Bottleneck (3:00-4:00):** Diagram pipeline z animacja czasu:
trzy builderzy koncza w roznym momencie, ale Integrator czeka na
NAJWOLNIEJSZEGO. Wizualizacja sciezki krytycznej. Strategie minimalizacji.

**Czesc 4 — Bezpieczenstwo SEC-010 (4:00-5:00):** Macierz uprawnien
z podswietlonym wierszem Integratora. Animacja scenariusza ataku:
zatruty output workera -> Integrator czyta -> potencjalne zagrozenie.
Mitygacje jako "tarcze" wokol Integratora.

**Czesc 5 — Anty-wzorce i Praktyki (5:00-6:30):** Szybki przeglad
5 anty-wzorcow (kazdy z czerwonym X) i 8 najlepszych praktyk
(kazdy z zielonym checkmarkiem). Format: split-screen zle vs dobre.

**Zakonczenie (6:30-7:00):** Quick Reference Card na ekranie. Podsumowanie
jednym zdaniem. Call to action: "Pamietaj — najlepsze czesci sa bezwartosciowe,
jesli nikt ich nie polaczy."

**Styl wizualny:** Ciemny motyw (dark mode) z motywami polaczen i sieci
(network/connectivity). Akcenty w kolorze elektrycznego fioletu (#7C3AED).
Animacje plynne, profesjonalne. Typografia: nowoczesna, bezszeryfowa.
Ikony: minimalistyczne, liniowe.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike edukacyjna o Integratorze (B-04) w architekturze
Gold Standard 2026.

**Sekcja 1 — Naglowek:** Tytul "INTEGRATOR (B-04)" z podtytulem
"Ostatni Agent Warstwy BUILD". Ikona: trzy strzalki zbiegajace sie
w jednym punkcie. Tlo: ciemne z subtelnymi sieciowymi wzorami.

**Sekcja 2 — Wizualizacja Merge:** Trzy kolorowe strumienie (Koder:
niebieski, Designer: zielony, Redaktor: pomaranczowy) plyna z gory
i lacza sie w jednym wezle (Integrator: fioletowy #7C3AED). Pod wezlem
jeden bialy strumien — zintegrowany artefakt. Etykiety przy kazdym
strumieniu: "HTML/JS", "CSS/Assets", "Tresci/Copy".

**Sekcja 3 — Diagram Rozwiazywania Konfliktow:** Wizualizacja konfliktu:
dwa elementy (np. ".btn-primary" vs ".button-main") ze strzalkami
kolidujacymi -> wezel decyzyjny Integratora -> rozwiazanie (jeden
spojny element). Trzy przyklady konfliktow w miniaturze.

**Sekcja 4 — Pipeline E2E:** Poziomy diagram 8 krokow workflow
Integratora: Zbieranie -> MANIFEST -> Identyfikacja -> Rozwiazywanie
-> Laczenie -> Testy -> Walidacja -> Dostarczenie. Kazdy krok
z miniaturowa ikona. Podswietlone kroki krytyczne.

**Sekcja 5 — Callout Bezpieczenstwa SEC-010:** Czerwona ramka z ikona
tarczy/ostrzezenia. Macierz uprawnien w miniaturze z podswietlonym
wierszem Integratora. Lista mitigacji jako biale punkty na czerwonym tle.

**Sekcja 6 — Tabela Porownawcza:** Czterech builderow w kolumnach
(Koder, Designer, Redaktor, Integrator). Wiersze: Load, Input tokens,
Widzi innych, Moze rownolegle. Kolumna Integratora wyroznniona
fioletowym tlem.

**Sekcja 7 — Quick Stats:** Cztery duze liczby w kafelkach:
"70/100 Load", "1-4K Input tokens", "$0.05-0.19 per task",
"6 narzedzi". Kafelki z fioletowym gradientem.

**Sekcja 8 — Stopka:** "Gold Standard 2026 | BUILD Layer | Agent B-04".
QR code placeholder. Logo.

**Kolorystyka:** Ciemne tlo (#1A1A2E lub #0F0F23), akcenty elektryczny
fiolet (#7C3AED), bialy tekst, szare linie pomocnicze. Kolorowe akcenty
dla poszczegolnych builderow (niebieski, zielony, pomaranczowy).

**Format:** Pionowy (1080x1920px lub proporcjonalny). Czcionka: bezszeryfowa,
nowoczesna. Styl: profesjonalny, techniczny, z elementami data visualization.
