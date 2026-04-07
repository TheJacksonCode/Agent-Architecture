# PLANER (A-03) -- Agent Planujacy w Systemach Wieloagentowych AI

## Kompletny Przewodnik Edukacyjny | Gold Standard 2026

---

## 1. Wprowadzenie -- Kim jest Planer?

Wyobraz sobie, ze Analityk wlasnie rozlozyl wielkie zadanie na dwadziescia mniejszych kawalkow. Kazdy kawalek jest opisany, oszacowany pod wzgledem zlozonosci (S/M/L/XL), ma zidentyfikowane zaleznosci. Swietnie. Ale teraz pojawia sie fundamentalne pytanie: **w jakiej kolejnosci to wszystko wykonac?**

Czy Research Tech moze pracowac rownolegle z Research UX? Czy Koder moze zaczac, zanim Researcher skonczy? Co musi byc gotowe, zanim Integrator zacznie laczyc czesci? Gdzie wstawic punkty kontrolne, zeby nie budowac na wadliwych fundamentach?

Dokladnie na te pytania odpowiada **Planer** -- agent planujacy, oznaczony jako A-03 w referencyjnej architekturze Gold Standard 2026.

Planer jest odpowiednikiem trzech znanych postaci ze swiata realnego:

- **Kierownik budowy** -- nie muruje scian i nie kladzenie kabli, ale wie dokladnie, ze najpierw musza byc fundamenty, potem sciany nosne, potem instalacje, potem tynki. Wie tez, ze elektryk i hydraulik MOGA pracowac rownolegle, bo jeden ciagnie kable w scianach, a drugi rury w podlodze -- nie wchodza sobie w droge.
- **Szef logistyki wojskowej** -- planuje, ktore oddzialy ruszaja pierwsze, gdzie sa punkty zaopatrzenia, jakie sa trasy alternatywne w razie zablokowania glownej. Kazda operacja wojskowa to sekwencja faz z bramami decyzyjnymi -- Planer robi dokladnie to samo w swiecie agentow AI.
- **Rezyser filmu** -- ma scenariusz (dekompozycje od Analityka), ale musi zdecydowac, ktore sceny krecic dzis, ktore jutro, ktore mozna krecic rownolegle na dwoch planach zdjęciowych, a ktore wymagaja gotowosci efektow specjalnych z poprzedniego etapu.

Planer siedzi w warstwie **PLANOWANIE** (Poziom 1) architekturalnej hierarchii -- partnersko obok Analityka, bezposrednio pod Orkiestratorem. To wazne umiejscowienie: Planer nie jest wykonawca (jak Koder czy Researcher), ale nie jest tez decydentem strategicznym (jak Orkiestrator). Jest **taktykiem** -- przeksztalca strategiczna dekompozycje w konkretny, wykonalny harmonogram.

> **Czy wiesz, ze...?** W architekturze OBSERVATORY Planer i Analityk sa czesto przedstawiani jako "oficerowie" -- doradcy strategiczni kapitana statku (Orkiestratora). W matrycy komunikacji systemu Planer ma 5 polaczen z innymi agentami -- mniej niz Orkiestrator (12), ale wiecej niz Researcherzy (2). To odzwierciedla jego role posrednika miedzy strategia a wykonaniem.

---

## 2. Kluczowe Obowiazki

Planer ma cztery fundamentalne obowiazki, z ktorych kazdy bezposrednio wplywa na efektywnosc calego systemu wieloagentowego.

### 2.1. Tworzenie harmonogramu wykonania (Execution Schedule)

Planer otrzymuje od Analityka liste podzadan z opisanymi zalezosciami i tworzy z niej **harmonogram timeline** -- dokument okreslajacy, kto robi co, kiedy i w jakiej kolejnosci. To nie jest abstrakcyjna lista -- to konkretny plan z fazami, krokami i estymacjami czasowymi.

Przyklad: Analityk dostarczyl dekompozycje projektu "interaktywna strona edukacyjna" na 12 podzadan. Planer analizuje zaleznosci i tworzy harmonogram:

```
FAZA 1 (PARALLEL):  Research Tech + Research UX + Research Docs  [rownolegle]
FAZA 2 (SEQ):       Syntetyk zbiera wyniki researchu              [sekwencyjne]
FAZA 3 (SEQ):       HIVE-MIND Brainstorm generuje koncepcje       [sekwencyjne]
FAZA 4 (PARALLEL):  Koder + Designer + Redaktor                   [rownolegle]
FAZA 5 (SEQ):       Integrator laczy czesci                       [sekwencyjne]
FAZA 6 (PARALLEL):  QA Security + QA Quality                      [rownolegle]
FAZA 7 (SEQ):       Manager QA -- GO/NO-GO                        [sekwencyjne]
FAZA 8 (SEQ):       Changelog + Delivery                          [sekwencyjne]
```

### 2.2. Identyfikacja sciezki krytycznej (Critical Path)

Sciezka krytyczna to **najdluzszy ciag zadan zaleznych od siebie**, ktory determinuje minimalny czas realizacji calego projektu. Jesli na sciezce krytycznej jest opoznienie -- opoznia sie caly projekt. Jesli opoznienie jest na zadaniu poza sciezka krytyczna -- system ma bufor.

Planer identyfikuje sciezke krytyczna i oznacza ja w harmonogramie. To pozwala Orkiestratorowi priorytetyzowac zasoby: agenty na sciezce krytycznej dostaja wyzszy priorytet i nie sa przerywane.

Przyklad sciezki krytycznej:
```
User Input -> Orkiestracja -> Analiza -> RESEARCH TECH -> Syntetyk -> Koder -> Integrator -> QA -> Delivery
```

Zauwaz, ze Research UX i Research Docs NIE sa na sciezce krytycznej (bo dzialaja rownolegle z Research Tech). Jesli Research UX sie opozni o 20%, calkowity czas projektu sie nie zmieni -- bo Research Tech (ktory jest na sciezce krytycznej) i tak trwa dluzej.

### 2.3. Definiowanie bram jakosci (Quality Gates)

Bramy jakosci to **punkty kontrolne miedzy fazami**, w ktorych system podejmuje decyzje GO/NO-GO: czy wyniki biezacej fazy sa wystarczajaco dobre, zeby przejsc do nastepnej? Planer definiuje TE bramy, a Orkiestrator je egzekwuje.

Kazda brama ma konkretne kryteria. Planer nie pisze ogolnikow typu "sprawdz czy jest OK" -- pisze precyzyjne warunki, ktore musza byc spelnione. Na przyklad brama miedzy Research a Build moze wymagac: "Kazdy researcher dostarczyl raport. Raporty pokrywaja min. 3 opcje technologiczne. Zrodla sa podane. Syntetyk zaktualizowal MANIFEST.md."

### 2.4. Optymalizacja rownoleglosci (Parallelism Optimization)

To najbardziej wartotworcza funkcja Planera. Kazde zadanie, ktore mozna wykonac rownolegle zamiast sekwencyjnie, **skraca calkowity czas projektu**. Planer analizuje graf zaleznosci od Analityka i szuka mozliwosci paralelizacji.

Przyklad: jesli Research Tech potrzebuje 10 minut, Research UX 8 minut, a Research Docs 6 minut, to:
- **Sekwencyjnie**: 10 + 8 + 6 = 24 minuty
- **Rownolegle**: max(10, 8, 6) = 10 minut

Oszczednosc: **14 minut, czyli 58%**. I to tylko na jednej fazie! W pelnym projekcie z wieloma fazami rownoleglymi oszczednosci sie kumuluja.

> **Uwaga!** Optymalizacja rownoleglosci to NIE jest "pusc wszystko naraz i zobacz co sie stanie". Planer musi precyzyjnie zidentyfikowac, ktore zadania sa naprawde niezalezne. Jesli dwa zadania dzielą zasob (np. oba musza pisac do tego samego pliku), rownoleglosc moze wprowadzic konflikty i race conditions. Planer musi znac roznice miedzy niezaleznoscia logiczna a niezaleznoscia zasobowa.

---

## 3. Cztery Tryby Wykonania

Planer operuje czterema trybami wykonania, ktore definiuja, jak agenty wspolpracuja w ramach danej fazy. Wybor trybu to jedna z najwazniejszych decyzji Planera -- zly tryb moze albo marnowac czas (zbyt sekwencyjne), albo generowac konflikty (zbyt rownolegle).

### 3.1. SEQUENTIAL (Sekwencyjny)

```
Agent A ──> Agent B ──> Agent C
```

**Opis:** Agenty pracuja jeden po drugim. Kazdy czeka na zakonczenie poprzedniego, zanim zacznie. Output jednego agenta jest inputem nastepnego.

**Kiedy uzywac:**
- Gdy kazdy krok wymaga wyniku poprzedniego (np. Analityk -> Planer -> Orkiestracja dalszych faz)
- Gdy jest scisla zaleznosc danych (Koder musi miec specyfikacje od Designera)
- Gdy zasob jest wspoldzielony i nie moze byc uzywany rownolegle (np. jeden plik MANIFEST.md)

**Przyklad w praktyce:** Faza Build w systemie OBSERVATORY jest sekwencyjna: najpierw Koder pisze HTML/CSS/JS, potem Redaktor poleruje tekst, potem Designer aplikuje palette, a na koncu Integrator laczy wszystko w jeden artefakt. Kazdy kolejny agent bazuje na pracy poprzedniego.

**Wady:** Najwolniejszy tryb. Jesli masz 4 agentow po 5 minut kazdy, calkowity czas to 20 minut. Ale czasem nie ma innego wyjscia.

### 3.2. PARALLEL (Rownolegly)

```
         ┌── Agent A ──┐
START ───┼── Agent B ──┼─── SYNC
         └── Agent C ──┘
```

**Opis:** Wiele agentow pracuje jednoczesnie, a wyniki sa zbierane w punkcie synchronizacji. Kazdy agent jest niezalezny i nie potrzebuje outputu od pozostalych.

**Kiedy uzywac:**
- Gdy zadania sa naprawde niezalezne (np. Research Tech, Research UX, Research Docs -- kazdy szuka w innym zrodle)
- Gdy chcesz zminimalizowac calkowity czas fazy
- Gdy agenty nie wspoldziela zasobow zapisu

**Przyklad w praktyce:** Faza Research w OBSERVATORY: trzech researcherow (Tech, UX, Docs) pracuje rownolegle, kazdy przeszukujac inne zrodla. Calkowity czas fazy = czas najwolniejszego researchera (a nie suma wszystkich trzech). Podobnie faza QA: QA Security i QA Quality dzialaja rownolegle na tym samym artefakcie (ale tylko go CZYTAJA, nie modyfikuja).

**Wady:** Wymaga punktu synchronizacji (SYNC). Jesli jeden agent sie opozni, reszta czeka. Nie dziala, gdy zadania maja zaleznosci miedzy soba.

> **Czy wiesz, ze...?** Badania Google Research z 2025 roku pokazuja, ze rozumowanie rownolegle (parallel reasoning) poprawia wyniki nawet o **+80.9%** w zadaniach finansowych, ale rozumowanie sekwencyjne w tych samych zadaniach powoduje **degradacje od -39% do -70%**. To potwierdza, ze wybor trybu to nie kwestia preferencji -- to kwestia efektywnosci.

### 3.3. PARALLEL_THEN_SEQUENTIAL (Rownolegle, potem Sekwencyjne)

```
         ┌── Agent A ──┐
START ───┼── Agent B ──┼─── SYNC ──> Agent D ──> Agent E
         └── Agent C ──┘
```

**Opis:** Pierwsza faza jest rownlegla (kilku agentow pracuje jednoczesnie), a po punkcie synchronizacji nastepuje faza sekwencyjna (agenty pracuja jeden po drugim). To **najczesciej uzywany tryb** w systemach produkcyjnych.

**Kiedy uzywac:**
- Gdy research mozna robic rownolegle, ale budowanie wymaga sekwencji (bo kazdy builder bazuje na pracy poprzedniego)
- Gdy zbieranie danych jest niezalezne, ale synteza wymaga kolejnosci
- Pelny pipeline Gold Standard 2026: Research (PARALLEL) -> Build (SEQUENTIAL) -> QA (PARALLEL) -> Delivery (SEQUENTIAL)

**Przyklad w praktyce:** Caly cykl zycia projektu w architekturze OBSERVATORY to wlasnie PARALLEL_THEN_SEQUENTIAL na duzą skale:

```
PARALLEL:    Res.Tech | Res.UX | Res.Docs     (zbieranie danych)
SEQUENTIAL:  Syntetyk -> Brainstorm            (synteza)
PARALLEL:    Koder | Designer | Redaktor       (budowanie -- tu z ograniczeniami)
SEQUENTIAL:  Integrator                        (laczenie)
PARALLEL:    QA Security | QA Quality          (audyt)
SEQUENTIAL:  Manager QA -> Changelog           (decyzja i delivery)
```

### 3.4. SEQUENTIAL_WITH_COLLABORATION (Sekwencyjny ze Wspolpraca)

```
Agent A ──> Agent B ──> Agent C
  ▲            │           │
  └────────────┘           │
  ▲                        │
  └────────────────────────┘
```

**Opis:** Agenty pracuja sekwencyjnie, ale moga sie komunikowac wstecz -- Agent B moze poprosic Agenta A o uzupelnienie, Agent C moze wrocic do Agenta A lub B z pytaniem. To najzlozony tryb, ale daje najlepsza jakosc.

**Kiedy uzywac:**
- Gdy zadania sa iteracyjne (np. Koder implementuje, QA znajduje blad, Koder poprawia)
- Gdy wymagana jest wysoka jakosc i dopuszczalne sa feedback loops
- Gdy budzet czasowy i tokenowy jest wystarczajacy na iteracje

**Przyklad w praktyce:** Faza QA w Gold Standard 2026 uzywa tego trybu: Manager QA zbiera raporty od QA Security i QA Quality, podejmuje decyzje NO-GO, co powoduje iteracje naprawcza -- Koder poprawia bugi, po czym QA powtarza audyt. Maximum 2 iteracje (zeby zapobiec nieskonczonej petli).

**Wady:** Najdrozszy tryb pod wzgledem tokenow (bo agenty wymieniaja sie danymi wielokrotnie). Wymaga jasno zdefiniowanego limitu iteracji (max_iterations), bo bez niego system moze wpasc w nieskonczona petle poprawek.

> **Uwaga!** Planer MUSI zawsze definiowac limit iteracji dla trybu SEQUENTIAL_WITH_COLLABORATION. Regula kciuka z Gold Standard 2026: max 2 iteracje naprawcze dla QA, max 3 iteracje dla krytycznych komponentow. Wiecej niz 3 iteracje oznacza, ze problem jest fundamentalny i wymaga eskalacji do Orkiestratora, a nie kolejnej poprawki.

---

## 4. Bramy Jakosci GO/NO-GO (Quality Gates G0-G4)

Bramy jakosci to najwazniejszy element, ktory Planer definiuje w harmonogramie. Bez bram system jest jak fabryka bez kontroli jakosci -- bledne polprodukty propaguja sie dalej i generuja kaskadowe awarie.

W Gold Standard 2026 zdefiniowano pieciu standardowych bram, oznaczonych G0 do G4. Kazda brama ma precyzyjne kryteria przejscia.

### G0 -- Brama Wejsciowa (Input Validation Gate)

**Kiedy:** Przed rozpoczeciem pracy systemu, po otrzymaniu zadania od uzytkownika.

**Kryteria GO:**
- Cel (goal) jest jasno zdefiniowany i jednoznaczny
- Ograniczenia (constraints) sa okreslone (paleta, jezyk, platforma)
- Zakres (scope) jest wykonalny w dostepnym budzecie tokenowym
- Referencje i materialy wejsciowe sa dostepne

**Jesli NO-GO:** System wraca do uzytkownika z prosba o doprecyzowanie. Nie zaczyna pracy na niejasnych wymaganiach.

**Analogia:** To jak odprawa przed lotem -- jesli pilot nie ma kompletnego planu lotu, samolot nie startuje.

### G1 -- Brama Dekompozycji (Decomposition Gate)

**Kiedy:** Po zakonczeniu pracy Analityka i Planera, przed wejsciem do fazy Research.

**Kryteria GO:**
- Wszystkie podzadania sa przypisane do agentow (brak "sierot" -- zadan bez wlasciciela)
- Graf zaleznosci jest spojny (brak cykli, brak zadan zawiszonych w powietrzu)
- Harmonogram jest realistyczny (estymacje czasowe sa sensowne)
- Sciezka krytyczna jest zidentyfikowana

**Jesli NO-GO:** Orkiestrator odsyla plan do Analityka/Planera z informacja, co wymaga poprawy. Typowe problemy: zbyt duze podzadania (rozbij dalej), brakujace zaleznosci (dodaj krawedz w grafie), nierealistyczne estymacje.

### G2 -- Brama Badawcza (Research Completeness Gate)

**Kiedy:** Po zakonczeniu fazy Research, przed wejsciem do fazy Build.

**Kryteria GO:**
- Kazdy researcher dostarczyl raport
- Wszystkie pytania badawcze zostaly zaadresowane
- Zrodla sa podane (URL, dokumentacja, benchmarki)
- Brak luk danych (data gaps) -- kazdy aspekt projektu jest pokryty
- Syntetyk zaktualizowal MANIFEST.md z wynikami syntezy

**Jesli NO-GO:** Orkiestrator uruchamia dodatkowy research na brakujace tematy. To KLUCZOWA brama -- budowanie bez solidnego researchu to budowanie na piasku.

> **Czy wiesz, ze...?** W architekturze OBSERVATORY pomiedzy G2 a faza Build znajduje sie tak zwana **MANIFEST BOUNDARY** -- "pojedynczy najwazniejszy punkt transferu w calej architekturze". MANIFEST.md staje sie JEDYNYM inputem do fazy Build. Jesli MANIFEST jest niekompletny, builderzy nie maja z czego budowac. Jesli MANIFEST jest niespojny, builderzy buduja na piasku. Planer musi zapewnic, ze G2 weryfikuje kompletnosc MANIFESTu.

### G3 -- Brama Budowy (Build Completeness Gate)

**Kiedy:** Po zakonczeniu fazy Build (Koder + Designer + Redaktor + Integrator), przed wejsciem do fazy QA.

**Kryteria GO:**
- Artefakt jest kompletny (nie brakuje komponentow)
- Integrator polaczyl wszystkie czesci w dzialajaca calosc
- Kod przechodzi podstawowe testy (syntax, rendering)
- Artefakt jest gotowy do audytu (QA moze go odczytac i przetestowac)

**Jesli NO-GO:** Orkiestrator odsyla do fazy Build z informacja, ktore czesci wymagaja poprawy.

### G4 -- Brama Jakosci (Quality Assurance Gate)

**Kiedy:** Po zakonczeniu fazy QA, przed dostarczeniem wyniku uzytkownikowi (Delivery).

**Kryteria GO:**
- QA Security: brak bledow CRITICAL, max 2 HIGH (z planem naprawy)
- QA Quality: zgodnosc z wymaganiami, brak brakujacych funkcji
- Ocena zbircza Manager QA: minimum 6/10 na skali jakosci
- Scoring: kazdy CRITICAL to -3 punkty, kazdy HIGH to -1 punkt. Ponizej 6 = NO-GO

**Jesli NO-GO:** Orkiestrator uruchamia iteracje naprawcza -- Koder poprawia bledy wskazane przez QA, po czym QA powtarza audyt. Maksimum 2 iteracje. Po dwoch nieudanych iteracjach -- eskalacja do uzytkownika.

**Analogia:** To jak kontrola techniczna samochodu -- nawet jesli auto wyglada pieknie, nie przejdzie przedzialdu bez sprawnych hamulcow i swiatel. Manager QA jest "diagnostą" -- jeden CRITICAL wazy wiecej niz dziesiec LOW.

> **Uwaga!** Planer definiuje bramy, ale to Orkiestrator je EGZEKWUJE. Planer jest architektem systemu kontroli jakosci, ale nie jest sedzia. Jesli Planer zdefiniuje zbyt luźne kryteria (np. "wystarczy ze cos jest"), bramy tracą sens. Jesli zdefiniuje zbyt restrykcyjne (np. "zero bledow wszelkiego rodzaju"), system nigdy nie dostarczy wyniku. Balans jest kluczowy.

---

## 5. Czego Planer NIE Robi

Tak jak w przypadku kazdej roli w systemie wieloagentowym, rownie wazne jest zrozumienie, czego Planer NIE powinien robic. Przekroczenie granic roli prowadzi do anty-wzorcow i degradacji systemu.

Planer **NIGDY**:

- **Nie dekomponuje zadan.** To rola Analityka. Planer otrzymuje GOTOWA dekompozycje i tworzy z niej harmonogram. Jesli Planer zacznie sam rozkladac zadania, dubluje prace Analityka i moze tworzyc sprzeczne dekompozycje.
- **Nie podejmuje strategicznych decyzji.** To rola Orkiestratora. Planer proponuje harmonogram, ale ostateczna decyzja GO/NO-GO nalezy do Orkiestratora. Planer nie decyduje, czy projekt ma sens -- planuje JAK go wykonac.
- **Nie generuje tresci.** Nie pisze kodu, nie prowadzi researchu, nie redaguje tekstow. Planer tworzy JEDEN typ outputu: harmonogram z gate'ami.
- **Nie wykonuje audytow.** Nie sprawdza jakosci kodu, nie szuka bledow bezpieczenstwa. Od tego sa agenty QA.
- **Nie zarzadza MANIFEST.md.** To wyłączna domena Syntetyka. Planer tworzy oddzielny dokument -- harmonogram/schedule -- a nie aktualizuje centralny MANIFEST.

W terminologii anty-wzorcow to sie nazywa **Scope Creep Anti-Pattern** -- agent, ktory stopniowo przejmuje obowiazki innych agentow, az staje sie "super-agentem" robiacym wszystko. Efekt jest zawsze taki sam: agent jest przeciazony, kontekst eksploduje, jakosc spada.

---

## 6. Model i Koszt

### Dlaczego Planer uzywa Sonnet, a nie Opus?

Planer uzywa modelu **Claude Sonnet** ($3 input / $15 output za 1M tokenow). To swiadomy wybor architektoniczny -- Planer wymaga dobrego rozumowania (analiza zaleznosci, identyfikacja sciezki krytycznej, optymalizacja rownoleglosci), ale NIE wymaga rozumowania na poziomie Opus.

Dlaczego? Bo Planer operuje na **strukturalnych danych** -- lista podzadan z zalezosciami to w istocie graf, a tworzenie harmonogramu z grafu to zadanie algorytmiczne, nie kreatywne. Nie wymaga glebokiej intuicji czy oceny jakosciowej (jak Orkiestrator), ani przetwarzania ogromnych ilosci niestrukturalnych danych (jak Researcher).

### Porownanie kosztow:

| Wariant | Koszt za typowa sesje planowania |
|---------|----------------------------------|
| Planer na **Opus** ($15/$75) | ~$0.50-1.00 |
| Planer na **Sonnet** ($3/$15) | ~$0.10-0.20 |
| Planer na **Haiku** ($0.80/$4) | ~$0.03-0.05 |

Sonnet daje **5x oszczednosc** wzgledem Opus przy zachowaniu wystarczajacego poziomu rozumowania. Haiku bylby jeszcze tanszy, ale jego zdolnosc do identyfikacji sciezki krytycznej i optymalizacji grafu zaleznosci jest niewystarczajaca dla zlozonych projektow.

### Okno kontekstowe

Sonnet dysponuje oknem kontekstowym o pojemnosci **200K tokenow**. Dla Planera to wiecej niz wystarczajace -- typowy plan Analityka ma 2000-5000 tokenow, a output Planera (harmonogram z gate'ami) to kolejne 1000-3000 tokenow. Planer zuzywa wiec **mniej niz 5%** dostepnego kontekstu.

### Obciazenie (Load Factor)

W architekturze Gold Standard 2026 Planer ma przypisany load factor **40** (na skali 0-100). To jeden z nizszych wskaznikow w systemie -- dla porownania, Syntetyk ma 65, Researcher Tech 55, a Koder Fullstack 80. Niski load oznacza, ze Planer konczy prace szybko i nie jest waskim gardlem systemu.

> **Czy wiesz, ze...?** W modelu cenowym Anthropic rozrozniane sa tokeny wejsciowe i wyjsciowe. Planer ma nietypowy profil: zuzywa stosunkowo duzo tokenow wejsciowych (bo musi przeczytac cala dekompozycje od Analityka z zalezosciami), ale bardzo malo wyjsciowych (bo generuje zwarty harmonogram). Przy proporcji 80% input / 20% output, efektywny koszt sesji jest blizszy dolnej granicy podanego zakresu.

---

## 7. Narzedzia

Planer ma celowo **minimalistyczny zestaw narzedzi**. To nie jest ograniczenie -- to decyzja projektowa wymuszajaca dyscypline.

### Narzedzia DOZWOLONE:

| Narzedzie | Co robi | Dlaczego Planer to ma |
|-----------|---------|----------------------|
| **Read** | Czyta pliki | Odczytuje dekompozycje od Analityka, MANIFEST.md dla kontekstu, istniejace plany |
| **Write** | Zapisuje pliki | Tworzy dokument harmonogramu -- JEDYNY output Planera |

### Narzedzia ZAKAZANE:

| Narzedzie | Dlaczego Planer tego NIE MA |
|-----------|----------------------------|
| **Bash** | Uruchamianie komend = wykonywanie pracy, nie planowanie |
| **WebSearch / WebFetch** | Research = praca merytoryczna, nie planowanie |
| **Edit** | Edycja istniejacych plikow = modyfikacja cudzej pracy |
| **Agent** (subagent) | Spawning subagentow = rola Orkiestratora, nie Planera |
| **Grep / Glob** | Przeszukiwanie kodu = praca analityczna, nie planowanie |

### Filozofia: Read + Write = Plan

Planer czyta (Read) dekompozycje od Analityka i pisze (Write) harmonogram. To wszystko. Minimalizm narzedzi gwarantuje, ze Planer nie bedzie robil niczego poza planowaniem. Jesli dasz mu Bash, poczuje pokuse zeby "szybko sprawdzic cos w terminalu". Jesli dasz mu WebSearch, zacznie "jeszcze tylko dokladac research na temat najlepszych praktyk planowania". Ograniczenie narzedzi to mechanizm wymuszajacy fokus.

Analogia: dobry architekt budowlany ma na biurku rysownice i olowek. Nie ma cegiel, nie ma dlutu. Gdyby mial -- zaczalby sam murować zamiast projektowac.

---

## 8. Workflow -- Krok po Kroku

Przyjrzyjmy sie, jak Planer pracuje w pelnym cyklu. Uzyje konkretnego przykladu: system 9 agentow realizujacy projekt "interaktywna strona edukacyjna o architekturze agentow AI".

### Krok 1: Otrzymaj dekompozycje od Analityka

Planer czyta (Read) output Analityka. Typowa dekompozycja wyglada tak:

```
PODZADANIE 1: Research techniczny (frameworki JS, interaktywnosc)
  Zlozonosc: M | Agent: Researcher Tech | Zaleznosci: brak
PODZADANIE 2: Research UX (trendy design, dark mode, animacje)
  Zlozonosc: M | Agent: Researcher UX | Zaleznosci: brak
PODZADANIE 3: Research dokumentacji (istniejace materialy)
  Zlozonosc: S | Agent: Researcher Docs | Zaleznosci: brak
PODZADANIE 4: Synteza wynikow researchu
  Zlozonosc: M | Agent: Syntetyk | Zaleznosci: [1, 2, 3]
PODZADANIE 5: Brainstorm koncepcji
  Zlozonosc: L | Agent: HIVE-MIND | Zaleznosci: [4]
PODZADANIE 6: Implementacja HTML/CSS/JS
  Zlozonosc: XL | Agent: Koder | Zaleznosci: [5]
PODZADANIE 7: Redakcja tresci
  Zlozonosc: M | Agent: Redaktor | Zaleznosci: [6]
PODZADANIE 8: Integracja komponentow
  Zlozonosc: M | Agent: Integrator | Zaleznosci: [6, 7]
PODZADANIE 9: Audyt bezpieczenstwa
  Zlozonosc: M | Agent: QA Security | Zaleznosci: [8]
PODZADANIE 10: Audyt jakosci
  Zlozonosc: M | Agent: QA Quality | Zaleznosci: [8]
PODZADANIE 11: Raport zbiorczy QA
  Zlozonosc: S | Agent: Manager QA | Zaleznosci: [9, 10]
PODZADANIE 12: Changelog i delivery
  Zlozonosc: S | Agent: Changelog | Zaleznosci: [11]
```

### Krok 2: Zbuduj graf zaleznosci

Planer analizuje kolumne "Zaleznosci" i buduje graf:

```
[1] ──┐
[2] ──┼──> [4] ──> [5] ──> [6] ──> [7] ──> [8] ──> [9] ──┐
[3] ──┘                                              [10] ──┼──> [11] ──> [12]
                                                            ┘
```

### Krok 3: Identyfikuj grupy rownolegle

Z grafu widac, ze:
- Podzadania 1, 2, 3 sa **niezalezne** -- mozna je wykonac rownolegle
- Podzadania 9, 10 sa **niezalezne** -- mozna je wykonac rownolegle
- Reszta jest sekwencyjna

### Krok 4: Zidentyfikuj sciezke krytyczna

Sciezka krytyczna: 1 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 11 -> 12 (najdluzszy lancuch zaleznosci). Zadania 2, 3 i 10 sa poza sciezka krytyczna (moga sie opoznic bez wplywu na calkowity czas).

### Krok 5: Przypisz tryby wykonania do faz

```
FAZA RESEARCH:  tryb PARALLEL         [1, 2, 3 rownolegle]
FAZA SYNTEZA:   tryb SEQUENTIAL       [4 -> 5]
FAZA BUILD:     tryb SEQUENTIAL       [6 -> 7 -> 8]
FAZA QA:        tryb PARALLEL         [9, 10 rownolegle]
FAZA DECISION:  tryb SEQUENTIAL       [11 -> 12]
```

### Krok 6: Zdefiniuj bramy jakosci

```
G0: Przed Research  -- Czy cel i ograniczenia sa jasne?
G1: Przed Synteza   -- Czy wszyscy researcherzy dostarczyli raporty?
G2: Przed Build     -- Czy MANIFEST.md jest kompletny po syntezie?
G3: Przed QA        -- Czy artefakt jest kompletny i zintegrowany?
G4: Przed Delivery  -- Czy Manager QA dal GO (min. 6/10)?
```

### Krok 7: Zapisz harmonogram (Write)

Planer zapisuje kompletny harmonogram jako dokument Markdown, zawierajacy: fazy, tryby, bramy, sciezke krytyczna, estymacje czasowe i fallback plany.

---

## 9. Anty-wzorce (Co Planer Robi Zle)

Zrozumienie anty-wzorcow jest rownie wazne jak zrozumienie dobrych praktyk. Oto cztery najczestsze bledy Planera:

### 9.1. Over-Sequential (Nadmierna Sekwencyjnosc)

**Symptom:** Planer ustawia WSZYSTKIE zadania sekwencyjnie, nawet gdy sa niezalezne.

**Przyklad:** Research Tech -> Research UX -> Research Docs (sekwencyjnie), chociaz zadne z tych zadan nie zalezy od pozostalych.

**Koszt:** Marnowanie 40-60% potencjalu rownoleglosci. Jesli kazdy research trwa 8 minut, sekwencja daje 24 minuty, a rownoleglosc -- 8 minut. Roznica rosnie z kazda dodatkowa faza.

**Przyczyna:** Planer "gra bezpiecznie" -- sekwencja jest prostsza do zaplanowania, bo nie trzeba sie martwic o punkty synchronizacji. Ale prostota planowania nie jest celem -- efektywnosc wykonania jest.

**Lekarstwo:** Dla kazdego podzadania zadaj pytanie: "Czy to podzadanie naprawde POTRZEBUJE wyniku poprzedniego?" Jesli odpowiedz brzmi NIE -- paralelizuj.

### 9.2. Missing Parallelism (Brakujaca Rownoleglosc)

**Symptom:** Planer identyfikuje NIEKTORE mozliwosci rownoleglosci, ale pomija inne.

**Przyklad:** Planer paralelizuje Research, ale nie paralelizuje QA Security + QA Quality, chociaz oba operuja na tym samym artefakcie (read-only) i nie maja zaleznosci miedzy soba.

**Koszt:** Umiarkowane straty czasowe -- mniejsze niz Over-Sequential, ale sumuja sie w dluzszych projektach.

**Lekarstwo:** Systematyczna analiza grafu zaleznosci zamiast "na oko". Dla kazdej pary zadan sprawdz: czy jest miedzy nimi krawedz zaleznosci? Jesli nie -- moga byc rownolegle.

### 9.3. Vague Gates (Niejasne Bramy)

**Symptom:** Bramy jakosci sa zdefiniowane, ale kryteria sa ogolnikowe.

**Przyklad zly:** "G2: Sprawdz czy research jest OK."

**Przyklad dobry:** "G2: Kazdy z 3 researcherow dostarczyl raport. Kazdy raport zawiera min. 3 opcje z pros/cons. Kazde twierdzenie ma zrodlo URL. Syntetyk zaktualizowal sekcje 'Stack Technologiczny' w MANIFEST.md."

**Koszt:** Niejasne bramy sa bramami, ktore ZAWSZE daja GO -- bo "OK" mozna zinterpretowac jak chcesz. To tak jakby kontrola jakosci w fabryce sprawdzala tylko "czy produkt wyglada na gotowy" zamiast "czy wymiary mieszcza sie w tolerancji +/- 0.1mm".

**Lekarstwo:** Kazde kryterium bramy musi byc **weryfikowalne binarnie** -- albo jest spelnione (TAK), albo nie (NIE). Zadnych "chyba", "raczej", "wyglada OK".

### 9.4. No Fallback Plan (Brak Planu B)

**Symptom:** Planer definiuje happy path, ale nie przewiduje, co zrobic, gdy cos pojdzie nie tak.

**Przyklad:** Harmonogram zaklada, ze Research Tech znajdzie 3 frameworki do porownania. Co jesli znajdzie 0? Co jesli WebSearch nie dziala? Co jesli Researcher zwroci pusty raport?

**Koszt:** System zatrzymuje sie w momencie awarii, bo nikt nie wie, co robic dalej. Orkiestrator musi improwizowac, co generuje nieoptymalny plan na goraco.

**Lekarstwo:** Dla kazdej bramy zdefiniuj nie tylko kryteria GO, ale tez **akcje NO-GO**: "Jesli G2 = NO-GO: uruchom dodatkowy Research z alternatywnymi zapytaniami. Jesli po 2 probach nadal NO-GO: eskaluj do uzytkownika."

> **Uwaga!** Anty-wzorzec Over-Sequential jest NAJCZESTSZYM bledem Planera. Dane z architektur produkcyjnych (Magentic-One, LangGraph) wskazuja, ze 40-60% potencjalu rownoleglosci jest marnowane przez zbyt konserwatywne planowanie. To bezposrednio przeksztalca sie w dluzszy czas realizacji i wyzszy koszt tokenowy.

---

## 10. Planer vs Orkiestrator -- Roznice

To jest jedno z najczesciej mylonych rozroznien w architekturze wieloagentowej. Planer i Orkiestrator sa tak blisko ze soba, ze wielu projektantow probuje je polaczyc w jednego agenta. To blad -- oto dlaczego:

| Aspekt | Planer (A-03) | Orkiestrator (A-01) |
|--------|---------------|---------------------|
| **Kiedy dziala** | Raz, na poczatku (tworzy plan) | Przez caly cykl (egzekwuje plan) |
| **Co tworzy** | Dokument harmonogramu | Decyzje GO/NO-GO w czasie rzeczywistym |
| **Model** | Sonnet ($3/$15) | Opus ($15/$75) |
| **Load factor** | 40 (niski) | 50 (sredni, ale przez dluzszy czas) |
| **Narzedzia** | Read, Write | Agent, Read, TaskCreate |
| **Interakcje** | Czyta plan Analityka, pisze harmonogram | Komunikuje sie z KAZDYM agentem |
| **Decyzyjnosc** | Proponuje | Decyduje |
| **Analogia** | Architekt (rysuje plany) | Kierownik budowy (realizuje plany) |

### Dlaczego nie polaczyc ich w jednego agenta?

Argument "za" polaczeniem: zmniejszenie liczby agentow, mniej komunikacji miedzy agentami, prostszy system.

Argument "przeciw" (i powod, dla ktorego Gold Standard 2026 ich rozdziela):

1. **Rozne modele = rozne koszty.** Orkiestrator potrzebuje Opus (bo podejmuje strategiczne decyzje w czasie rzeczywistym). Planer wystarcza Sonnet (bo tworzy plan raz, na poczatku). Polaczenie oznacza, ze planowanie -- ktore mozna zrobic taniej -- idzie przez najdrozszy model.

2. **Rozne cykle zycia.** Planer konczy prace na poczatku projektu. Orkiestrator dziala przez caly cykl. Polaczenie oznacza, ze logika planowania zasmiecala kontekst Orkiestratora przez reszta sesji.

3. **Zasada pojedynczej odpowiedzialnosci.** Planer, ktory jednoczesnie egzekwuje plan, ma pokuse go zmieniac "w locie" -- zamiast trzymac sie pierwotnego harmonogramu, zaczyna improwizowac. To prowadzi do chaosu.

Istnieje jednak wyjątek: w **malych systemach (3-5 agentow)** rozdzielanie Planera i Orkiestratora moze byc over-engineering. Analiza ALPHA Team wykazala **70% overlap** miedzy rola Analityka i Planera w malych projektach -- sugerujac, ze w prostych scenariuszach mozna polaczyc Analityka i Planera w jednego agenta "Analityk-Planer", zachowujac oddzielnego Orkiestratora.

> **Czy wiesz, ze...?** W architekturze systemow wieloagentowych istnieje wzorzec "Plan-and-Execute" (Planuj-i-Wykonuj), opisywany przez Anthropic w raportach z 2026 roku. W tym wzorcu Opus planuje (strategia), a Sonnet wykonuje (taktyka). System OBSERVATORY idzie dalej -- rozdzielajac PLANOWANIE (Planer na Sonnet) od STRATEGII (Orkiestrator na Opus) i od WYKONANIA (Builderzy na Sonnet/Haiku). To trzypoziomowa hierarchia zamiast dwupoziomowej.

---

## 11. Najlepsze Praktyki 2025-2026

Na podstawie doswiadczen z architektur produkcyjnych (OBSERVATORY, Magentic-One, LangGraph, CrewAI) oraz referencyjnego Gold Standard 2026, oto osiem najlepszych praktyk dla roli Planera:

### Praktyka 1: Maksymalizuj rownoleglosc

Domyslnie zakladaj rownoleglosc -- zmieniaj na sekwencje tylko wtedy, gdy jest udokumentowana zaleznosc. Nigdy odwrotnie. Badania pokazuja, ze 40-60% potencjalu rownoleglosci jest marnowane przez "ostrożne" planowanie sekwencyjne.

### Praktyka 2: Definiuj bramy binarnie

Kazde kryterium bramy musi byc TAK/NIE. Zadnych skali, zadnych "w wiekszosci", zadnych "raczej OK". Brama jest otwarta (GO) lub zamknieta (NO-GO). Szare strefy prowadza do przepuszczania wadliwych artefaktow.

### Praktyka 3: Buforuj czas na feedback loops

Nigdy nie planuj tight schedule -- zawsze dodaj 20-30% buforu na iteracje naprawcze po QA. Jesli plan zaklada "Build 10 min + QA 5 min = 15 min", realistyczna estymacja to 15 + 30% = ~20 min (bo QA prawie zawsze znajdzie cos do poprawy).

### Praktyka 4: Identyfikuj sciezke krytyczna JAWNIE

Nie wystarczy "wiedziec" ktore zadania sa krytyczne -- trzeba je jawnie oznaczyc w harmonogramie. Orkiestrator musi widziec na pierwszy rzut oka, ktore zadania nie moga sie opoznic.

### Praktyka 5: Definiuj akcje NO-GO, nie tylko kryteria GO

Dla kazdej bramy okresl: co robic, jesli brama sie nie otwiera? Kto poprawia? Ile iteracji? Kiedy eskalowac? Plan bez fallbackow to polowa planu.

### Praktyka 6: Unikaj cykli w grafie

Graf zaleznosci musi byc DAG (Directed Acyclic Graph) -- skierowany graf acykliczny. Jesli A zalezy od B, a B zalezy od A, masz nieskonczona petle. Planer musi jawnie sprawdzic graf pod katem cykli.

### Praktyka 7: Estymuj czas realistycznie

Nie optymistycznie, nie pesymistycznie -- realistycznie. Regula kciuka: weź optymistyczna estymacje i pomnoz przez 1.5. To nie jest pesymizm -- to matematyka (prawo Hofstadtera: "wszystko trwa dluzej niz myslisz, nawet jesli uwzglednisz prawo Hofstadtera").

### Praktyka 8: Dokumentuj DLACZEGO, nie tylko CO

Harmonogram musi zawierac nie tylko "co rownolegle, co sekwencyjnie", ale tez DLACZEGO. "Research Tech i Research UX sa rownolegle, PONIEWAZ nie maja wspolnych zaleznosci danych." To pozwala Orkiestratorowi zrozumiec logike planu i podjac lepsze decyzje, gdy cos pojdzie nie tak.

---

## 12. Podsumowanie + Quick Reference Card

Planer to agent planujacy, ktory przeksztalca dekompozycje Analityka w wykonalny harmonogram. Identyfikuje sciezke krytyczna, optymalizuje rownoleglosc, definiuje bramy jakosci i ustala tryby wykonania.

Jest **taktykiem** systemu -- nie strategiem (Orkiestrator), nie wykonawca (Builderzy), nie analitykiem (Analityk). Jego wartosc polega na maksymalizacji efektywnosci: te same zadania, ale wykonane w optymalnej kolejnosci, zajmuja znacznie mniej czasu i kosztuja mniej tokenow.

---

### QUICK REFERENCE CARD -- PLANER (A-03)

```
╔══════════════════════════════════════════════════════════════════════╗
║                    PLANER (A-03) -- Quick Reference                 ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  WARSTWA:    PLANOWANIE (Poziom 1)                                  ║
║  MODEL:      Claude Sonnet ($3/$15 za 1M tokenow)                  ║
║  LOAD:       40/100 (niski)                                         ║
║  NARZEDZIA:  Read, Write                                            ║
║                                                                     ║
║  INPUT:      Dekompozycja od Analityka (lista podzadan              ║
║              z zalezosciami, zlozonoscia S/M/L/XL)                  ║
║                                                                     ║
║  OUTPUT:     Harmonogram (timeline) z:                              ║
║              - Fazami i trybami (SEQ/PARALLEL/MIXED)                ║
║              - Bramami jakosci (G0-G4) z kryteriami                 ║
║              - Sciezka krytyczna                                    ║
║              - Estymacjami czasowymi                                ║
║              - Fallback planami dla kazdej bramy                    ║
║                                                                     ║
║  TRYBY WYKONANIA:                                                   ║
║  ┌────────────────────────────────────┐                             ║
║  │ SEQUENTIAL         A -> B -> C     │                             ║
║  │ PARALLEL           A | B | C       │                             ║
║  │ PAR_THEN_SEQ       A|B|C -> D -> E │                             ║
║  │ SEQ_WITH_COLLAB    A <-> B <-> C   │                             ║
║  └────────────────────────────────────┘                             ║
║                                                                     ║
║  BRAMY (GOLD STANDARD 2026):                                        ║
║  G0 = Input Validation   (cel, zakres, ograniczenia)                ║
║  G1 = Decomposition      (plan kompletny, brak sierot)             ║
║  G2 = Research Complete   (raporty, zrodla, MANIFEST)               ║
║  G3 = Build Complete      (artefakt zintegrowany)                   ║
║  G4 = QA Passed           (score >= 6/10, brak CRITICAL)            ║
║                                                                     ║
║  ANTY-WZORCE:                                                       ║
║  [!] Over-Sequential       -- marnowanie rownoleglosci             ║
║  [!] Missing Parallelism   -- czesciowa optymalizacja              ║
║  [!] Vague Gates           -- kryteria bez precyzji                ║
║  [!] No Fallback Plan      -- brak akcji na NO-GO                  ║
║                                                                     ║
║  KLUCZOWA ZASADA:                                                   ║
║  "Planer PLANUJE, Orkiestrator EGZEKWUJE."                          ║
║  Nigdy nie mieszaj tych rol.                                        ║
║                                                                     ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

### Slowniczek kluczowych terminow

| Termin | Definicja |
|--------|-----------|
| **Sciezka krytyczna** | Najdluzszy lancuch zadan zaleznych -- determinuje minimalny czas calego projektu |
| **Brama jakosci (Gate)** | Punkt kontrolny miedzy fazami z kryteriami GO/NO-GO |
| **Load factor** | Wskaznik obciazenia agenta (0-100); nizszy = szybciej konczy |
| **DAG** | Directed Acyclic Graph -- graf skierowany bez cykli; jedyny dopuszczalny format grafu zaleznosci |
| **MANIFEST.md** | Centralny dokument systemu (Single Source of Truth); Planer go czyta, ale NIE pisze |
| **MANIFEST BOUNDARY** | Punkt transferu miedzy faza Design a Build; jedyny input do builderow |
| **Narrow Context Principle** | Zasada, ze kazdy agent dostaje TYLKO informacje potrzebne do swojego zadania |
| **Feedback loop** | Petla zwrotna, w ktorej output jednej fazy wraca jako input do poprzedniej (np. QA -> Koder) |
| **Fallback plan** | Plan awaryjny definiujacy, co robic gdy brama da NO-GO |

---

*Zrodla: Gold Standard 2026, OBSERVATORY Architecture, OMEGA Team Analysis, ALPHA Team Analysis, Agent Teams Configurator v8, Google Research 2025 (parallel reasoning benchmarks), Anthropic Plan-and-Execute Pattern 2026.*

---

# PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

```
Stworz 5-7 minutowa prezentacje wideo o agencie PLANER (A-03) w architekturze
Gold Standard 2026 Multi-Agent AI. Prezentacja edukacyjna, dynamiczna,
przeznaczona dla osob uczacych sie systemow wieloagentowych.

HOOK OTWIERAJACY (0:00 - 0:25):
Zacznij od statystyki: "62% zadan w systemie wieloagentowym moze biec
ROWNOLEGLE -- ale wiekszosc systemow AI robi je po kolei, marnujac czas
i pieniadze." Pokaz animacje dwoch timeline'ow: sekwencyjnego (dlugiego,
czerwonego) i zoptymalizowanego (krotkiego, zielonego z rownolegloscia).
Tekst na ekranie: "Jeden agent zmienia to wszystko: PLANER."

SEKCJA 1 -- KIM JEST PLANER (0:25 - 1:15):
Animacja karty agenta: identyfikator A-03, warstwa PLANNING (Poziom 1),
model Claude Sonnet ($3/$15 za 1M tokenow). Pokaz trzy analogie jako
ikony z podpisami: Rezyser filmowy (planuje kolejnosc scen na planie
zdjeciowym), Kontroler lotow (sekwencjonuje samoloty na pasie startowym),
Szef kuchni (koordynuje timing dan na talerzu). Podkresil motto: "Analityk
mowi CO, Planer mowi KIEDY." Wizualnie: karty agenta w stylu ID badge
z pomaranczowo-bursztynowym akcentem (#F59E0B) na ciemnym tle (#111827).

SEKCJA 2 -- KLUCZOWE OBOWIAZKI (1:15 - 2:30):
Animacja czterech filarow pojawiajacych sie jeden po drugim:
1) Sekwencjonowanie zadan -- animacja podzadan przesuwajacych sie
   z nieuorzadkowanej listy w uporzadkowany lancuch
2) Identyfikacja sciezki krytycznej -- graf DAG, sciezka krytyczna
   podswietla sie na CZERWONO, reszta na SZARO
3) Optymalizacja rownoleglosci -- trojka zadan Research (Tech, UX, Docs)
   przesuwa sie z kolumny sekwencyjnej w trzy rownolegle tory (ZIELONE)
4) Definiowanie bram jakosci -- pieta bramek G0-G4 jako checkpoint'y
   na osi czasu, kazda z ikona (tarcza, lupa, klucz, semafor, gwiazda)
Wizualnie: animacje wjazdowe (slide-in) z lewej strony, Gantt-chart
w tle z siatka czasowa.

SEKCJA 3 -- DAG I SCIEZKA KRYTYCZNA (2:30 - 3:40):
Pelna animacja budowania grafu DAG na przykladzie 12 podzadan:
- Krok 1: 12 wezlow pojawia sie losowo na ekranie
- Krok 2: Krawedzie zaleznosci animuja sie miedzy wezlami
- Krok 3: Graf uklada sie w logiczna strukture (od lewej do prawej)
- Krok 4: Sciezka krytyczna podswietla sie na CZERWONO (#EF4444)
  z efektem pulsowania (1->4->5->6->7->8->9->11->12)
- Krok 5: Zadania poza sciezka krytyczna blakna do 40% opacity
Pokaz tekst: "Opoznienie na sciezce krytycznej = opoznienie CALEGO
projektu. Opoznienie poza nia? Zero wplywu."
Wizualnie: wezly jako kola z numerami, krawedzie jako strzalki,
sciezka krytyczna grubsza (3px vs 1px).

SEKCJA 4 -- TRYBY WYKONANIA I FAZY (3:40 - 4:30):
Animacja przebiegu 5 faz projektu jako diagram Gantta:
- FAZA RESEARCH: tryb PARALLEL -- 3 paski rownoczesnie (zielone)
- FAZA SYNTEZA: tryb SEQUENTIAL -- 2 paski jeden po drugim (niebieskie)
- FAZA BUILD: tryb SEQUENTIAL -- 3 paski sekwencyjnie (fioletowe)
- FAZA QA: tryb PARALLEL -- 2 paski rownoczesnie (pomaranczowe)
- FAZA DECISION: tryb SEQUENTIAL -- 2 paski (szare)
Miedzy fazami -- bramy G0-G4 jako pionowe linie z ikona semafora.
Pokaz porownanie: "Bez Planera: 96 min (wszystko sekwencyjnie).
Z Planerem: 58 min (zoptymalizowane). Oszczednosc: 40%."
Wizualnie: Gantt chart na ciemnym tle, paski z gradientem, bramy
jako swiecace pionowe linie w kolorze bursztynowym (#F59E0B).

SEKCJA 5 -- BRAMY JAKOSCI G0-G4 (4:30 - 5:20):
Animacja sekwencji 5 bram jako flowchart pionowy:
- G0 (Input Validation): ikona tarczy, kryteria w tooltipie
- G1 (Decomposition): ikona puzzla, "czy plan kompletny?"
- G2 (Research Complete): ikona lupy, "czy MANIFEST gotowy?"
  -- podswietl MANIFEST BOUNDARY jako kluczowy punkt transferu
- G3 (Build Complete): ikona klucza, "czy artefakt zintegrowany?"
- G4 (QA Passed): ikona gwiazdy, "score >= 6/10?"
Dla kazdej bramy pokaz dwa scenariusze: GO (zielone swiatlo,
strzalka w dol) i NO-GO (czerwone swiatlo, strzalka wracajaca
do poprzedniej fazy z etykieta "iteracja naprawcza").
Wizualnie: flowchart na ciemnym tle, bramy jako heksagony
w kolorze bursztynowym z cieniowaniem.

SEKCJA 6 -- ANTY-WZORCE (5:20 - 6:00):
Pokaz 4 anty-wzorce jako "czerwone flagi" z animacja:
1) Over-Sequential -- timeline z 12 zadaniami jedno po drugim,
   przekreslony czerwonym X, obok zoptymalizowany z rownolegloscia
2) Missing Parallelism -- "QA Security i QA Quality sekwencyjnie?
   Nie maja zaleznosci -- PARALELIZUJ!"
3) Vague Gates -- porownanie: "Sprawdz czy OK" (rozmyte, czerwone)
   vs "Min. 3 raporty, kazdy z URL" (ostre, zielone)
4) No Fallback Plan -- flowchart konczacy sie znakiem "?" przy NO-GO,
   obok poprawiona wersja z akcja fallback
Wizualnie: split-screen, lewa strona ZLE (czerwona), prawa DOBRZE
(zielona), animacja przejscia miedzy nimi.

SEKCJA 7 -- PLANER vs ORKIESTRATOR (6:00 - 6:30):
Tabela porownawcza animowana wiersz po wierszu:
- Kiedy dziala: "Raz na poczatku" vs "Przez caly cykl"
- Model: "Sonnet $3/$15" vs "Opus $15/$75"
- Narzedzia: "Read, Write" vs "Agent, Read, TaskCreate"
- Zasada: "PLANUJE" vs "EGZEKWUJE"
Motto koncowe: "Planer jest architektem, Orkiestrator kierownikiem
budowy. Nigdy nie mieszaj tych rol."

ZAMKNIECIE (6:30 - 7:00):
Powrot do hooka: "Pamietasz te 62%? Planer to agent, ktory je
odblokowuje." Animacja Quick Reference Card -- karta podsumowujaca
z parametrami agenta (warstwa, model, load, narzedzia, bramy).
Call-to-action: "W nastepnym odcinku: Orkiestrator (A-01) --
dowiesz sie, kto EGZEKWUJE plan stworzony przez Planera."

STYL WIZUALNY:
- Paleta glowna: bursztynowy/pomaranczowy (#F59E0B) jako kolor wiodacy,
  ciemne tlo (#111827), slate/szary (#64748B) jako akcenty
- Sciezka krytyczna zawsze czerwona (#EF4444)
- Rownolegle tory zawsze zielone (#22C55E)
- Bramy zawsze bursztynowe (#F59E0B)
- Typografia: bezszeryfowa (Inter/DM Sans), tytuly 48px, tresc 24px
- Animacje: plynne (ease-in-out, 400-600ms), bez gwaltownych przejsc
- Motyw przewodni: Gantt chart, tory kolejowe (rozjazdy),
  timeline z checkpointami
- Tlo: subtle grid pattern (siatka) z efektem depth-of-field
- Ikony: outline style, 2px stroke, rounded caps
- Przejscia miedzy sekcjami: horizontal slide lub fade-through
```

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Stworz pionowa infografike (1080x3000px) o agencie PLANER (A-03) w architekturze
Gold Standard 2026 Multi-Agent AI. Infografika edukacyjna, premium quality,
przeznaczona do wydruku i udostepniania cyfrowego.

SEKCJA 1 -- NAGLOWEK (0-280px):
Tlo: gradient od ciemnego (#111827) do bursztynowego (#F59E0B, 15% opacity).
Tytul: "PLANER (A-03)" w 64px bold, kolor bialy (#FFFFFF).
Podtytul: "Agent Planujacy | Warstwa PLANNING | Gold Standard 2026" w 20px,
kolor bursztynowy (#F59E0B).
Ikona: duza ikona Gantt chartu (80x80px) z efektem glow w kolorze
bursztynowym. Badge w prawym gornym rogu: "Poziom 1 | Sonnet" na
bursztynowym tle z bialym tekstem.
Motto na dole sekcji: "Analityk mowi CO, Planer mowi KIEDY" w 18px italic,
kolor slate (#94A3B8).

SEKCJA 2 -- METRYKI W PIGULCE (280-480px):
Cztery karty metryczne w rzedzie (4 kolumny po 230px z 20px gap):
- Karta 1: "Model" -- ikona CPU, wartosc "Sonnet", podpis "$3/$15 za 1M"
- Karta 2: "Load" -- ikona gauge, wartosc "40/100", podpis "Niski"
- Karta 3: "Narzedzia" -- ikona toolbox, wartosc "2", podpis "Read + Write"
- Karta 4: "Output" -- ikona document, wartosc "1", podpis "execution_plan.md"
Styl kart: zaokraglone rogi (12px), cienki border bursztynowy (1px),
ciemne tlo (#1E293B), wartosc w 36px bold bursztynowy, podpis 14px slate.

SEKCJA 3 -- CZTERY OBOWIAZKI (480-900px):
Tytul sekcji: "Kluczowe Obowiazki" w 28px bold, bialy, z bursztynowa
linia pod spodem (60px szerokosc, 3px grubosc).
Cztery bloki pionowo (kazdy ~100px):
1) "Sekwencjonowanie zadan" -- ikona listy numerowanej, opis 1-liniowy,
   mala ilustracja: A->B->C (strzalki)
2) "Identyfikacja sciezki krytycznej" -- ikona route, opis,
   ilustracja: graf z podswietlona czerwona sciezka
3) "Optymalizacja rownoleglosci" -- ikona fork/merge, opis,
   ilustracja: 3 rownolegle paski (zielone)
4) "Definiowanie bram jakosci" -- ikona checkpoint, opis,
   ilustracja: 5 bramek G0-G4 w linii
Styl: kazdy blok z lewa bursztynowa kreska (3px), ikony 32px,
tekst opisu 16px w kolorze slate (#CBD5E1).

SEKCJA 4 -- WIZUALIZACJA DAG (900-1400px):
Tytul: "Graf Zaleznosci (DAG) -- Przyklad 12 Podzadan" w 24px bold.
Centralna ilustracja grafu DAG (900x400px):
- 12 wezlow jako kola (40px srednica) z numerami 1-12
- Krawedzie jako strzalki miedzy wezlami
- Sciezka krytyczna (1->4->5->6->7->8->9->11->12) podswietlona
  CZERWONO (#EF4444) z grubsza linia (3px)
- Pozostale krawedzie w kolorze slate (#475569, 1px)
- Wezly na sciezce krytycznej: czerwone obramowanie, bialy srodek
- Wezly poza sciezka: szare obramowanie, szary srodek (40% opacity)
Legenda pod grafem: "Czerwony = Sciezka krytyczna (opoznienie = opoznienie
calego projektu)" | "Szary = Poza sciezka (bufor czasowy)"
Pod grafem: callout box z tekstem "62% zadan moze biec ROWNOLEGLE
-- Planer identyfikuje ktore" na bursztynowym tle (10% opacity),
bursztynowy border-left 4px.

SEKCJA 5 -- GANTT CHART FAZ (1400-1750px):
Tytul: "Harmonogram -- 5 Faz Projektu" w 24px bold.
Diagram Gantta (900x250px):
- Os X: czas (minuty 0-60)
- Os Y: 5 faz (Research, Synteza, Build, QA, Decision)
- FAZA RESEARCH: 3 paski rownolegle (0-8 min), kolor zielony (#22C55E),
  etykieta "PARALLEL"
- FAZA SYNTEZA: 2 paski sekwencyjne (10-22 min), kolor niebieski (#3B82F6),
  etykieta "SEQUENTIAL"
- FAZA BUILD: 3 paski sekwencyjne (24-44 min), kolor fioletowy (#8B5CF6),
  etykieta "SEQUENTIAL"
- FAZA QA: 2 paski rownolegle (46-54 min), kolor pomaranczowy (#F59E0B),
  etykieta "PARALLEL"
- FAZA DECISION: 2 paski sekwencyjne (56-62 min), kolor szary (#64748B),
  etykieta "SEQUENTIAL"
Bramy G0-G4 jako pionowe przerywane linie bursztynowe miedzy fazami
z etykieta na gorze. Pod diagramem: "Czas sekwencyjny: 96 min |
Czas zoptymalizowany: 58 min | Oszczednosc: 40%"
w zielonym callout box.

SEKCJA 6 -- BRAMY JAKOSCI FLOWCHART (1750-2200px):
Tytul: "System Bram Jakosci G0-G4" w 24px bold.
Flowchart pionowy (5 bram polaczonych strzalkami):
- G0 (Input Validation): heksagon bursztynowy, ikona tarczy,
  3 kryteria w bulleted list obok (12px, slate)
- G1 (Decomposition): heksagon, ikona puzzla, 3 kryteria
- G2 (Research Complete): heksagon PODSWIETLONY (glow effect),
  ikona lupy, 4 kryteria + etykieta "MANIFEST BOUNDARY"
- G3 (Build Complete): heksagon, ikona klucza, 3 kryteria
- G4 (QA Passed): heksagon, ikona gwiazdy, 3 kryteria + "score >= 6/10"
Kazda brama: strzalka GO (zielona, w dol) i strzalka NO-GO
(czerwona, wracajaca do poprzedniej fazy z etykieta "iteracja").
G2 wyroznia sie jako najwieksza brama (jest MANIFEST BOUNDARY).

SEKCJA 7 -- PLANER vs ORKIESTRATOR (2200-2500px):
Tytul: "Planer vs Orkiestrator -- Kluczowe Roznice" w 24px bold.
Tabela porownawcza (2 kolumny):
- Kolumna lewa: "PLANER (A-03)" na bursztynowym tle
- Kolumna prawa: "ORKIESTRATOR (A-01)" na fioletowym tle (#7C3AED)
Wiersze (naprzemiennie jasne/ciemne tlo):
- Kiedy: "Raz, na poczatku" vs "Przez caly cykl"
- Model: "Sonnet $3/$15" vs "Opus $15/$75"
- Output: "Harmonogram" vs "Decyzje GO/NO-GO"
- Narzedzia: "Read, Write" vs "Agent, Read, TaskCreate"
- Load: "40/100" vs "50/100"
- Zasada: "PLANUJE" vs "EGZEKWUJE"
Pod tabela: callout bursztynowy: "Planer jest architektem,
Orkiestrator kierownikiem budowy. Nigdy nie mieszaj tych rol."

SEKCJA 8 -- ANTY-WZORCE (2500-2750px):
Tytul: "4 Anty-wzorce Planera" w 24px bold, kolor czerwony (#EF4444).
Cztery karty w siatce 2x2 (kazda ~230x110px):
1) "Over-Sequential" -- ikona czerwonego X, opis: "Wszystko po kolei,
   nawet gdy mozna rownolegle. Strata: 40-60% czasu."
2) "Missing Parallelism" -- ikona czesciowego grafu, opis: "Niektore
   rownolegle, ale nie wszystkie. QA Security || QA Quality!"
3) "Vague Gates" -- ikona mgly, opis: "Sprawdz czy OK -- co to znaczy?
   Kryteria musza byc binarne: TAK/NIE."
4) "No Fallback Plan" -- ikona znaku zapytania, opis: "Co robic
   gdy NO-GO? Bez planu B system staje."
Styl kart: czerwone obramowanie (1px), ciemne tlo, ikony 28px,
tekst tytulu 16px bold czerwony, opis 13px slate.

SEKCJA 9 -- TRZY ANALOGIE (2750-2900px):
Tytul: "Planer w Trzech Analogiach" w 24px bold.
Trzy ikony w rzedzie z podpisami:
1) Rezyser filmowy -- "Planuje kolejnosc scen, dwa plany
   zdjeciowe rownolegle" (ikona klapy filmowej)
2) Kontroler lotow -- "Sekwencjonuje starty i ladowania,
   zarzadza pasem startowym" (ikona wiezy kontrolnej)
3) Szef kuchni -- "Koordynuje timing dan, kazde danie gotowe
   w tym samym momencie" (ikona czapki kucharskiej)
Styl: ikony 48px w bursztynowym kole (64px), opisy 14px slate,
rozstawienie rownomierne.

SEKCJA 10 -- STOPKA (2900-3000px):
Gradient od tla do ciemnego (#0F172A).
Tekst: "Gold Standard 2026 | OBSERVATORY Architecture | Agent A-03 PLANER"
w 14px, kolor slate (#64748B).
Logo/badge: "PLANNING LAYER | Level 1" w malym badge bursztynowym.
Hashtagi: "#MultiAgentAI #GoldStandard2026 #DAG #CriticalPath #Planer"
w 12px, kolor ciemny slate (#475569).

PALETA KOLOROW:
- Glowny (Planer):    #F59E0B (bursztynowy/amber)
- Tlo ciemne:         #111827 (granatowo-czarny)
- Tlo kart:           #1E293B (ciemny slate)
- Tekst glowny:       #FFFFFF (bialy)
- Tekst drugorzedny:  #CBD5E1 (jasny slate)
- Tekst trzeci:       #94A3B8 (sredni slate)
- Sciezka krytyczna:  #EF4444 (czerwony)
- Rownolegle tory:    #22C55E (zielony)
- Bramy:              #F59E0B (bursztynowy)
- Orkiestrator:       #7C3AED (fioletowy -- w porownaniu)
- Synteza:            #3B82F6 (niebieski)
- Build:              #8B5CF6 (fioletowy)
- Akcenty pozytywne:  #22C55E (zielony -- GO)
- Akcenty negatywne:  #EF4444 (czerwony -- NO-GO)

TYPOGRAFIA:
- Tytuly sekcji: 24-28px, bold, bialy, letter-spacing 0.5px
- Tytul glowny: 64px, extra-bold, bialy
- Metryki (wartosci): 36px, bold, bursztynowy
- Tekst tresci: 14-16px, regular, jasny slate
- Etykiety: 12-13px, medium, sredni slate
- Font: bezszeryfowy (Inter, DM Sans lub Helvetica Neue)

STYL OGOLNY:
- Ciemny motyw (#111827 tlo), bursztynowe akcenty
- Zaokraglone rogi (8-12px) na kartach i calloutach
- Subtelne cienie (0 4px 12px rgba(0,0,0,0.3)) na kartach
- Brak gradientow na tekście -- gradienty tylko na tla
- Ikony: outline style, 2px stroke, rounded line caps
- Separatory miedzy sekcjami: cienka linia (#1E293B, 1px)
  lub 40px pustej przestrzeni
- Dane osadzone w wizualizacjach, nie w tabelach tekstowych
  (Gantt chart zamiast tabeli, flowchart zamiast listy)
```

---

*Dokument wygenerowany dla systemu Gold Standard 2026 Multi-Agent AI Architecture.*
*Agent: Planer (A-03) | Warstwa: PLANNING | Model: Claude Sonnet*
