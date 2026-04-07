# ANALITYK (A-02) -- Specjalista Dekompozycji w Systemach Wieloagentowych AI

## Kompletny Przewodnik Edukacyjny | Gold Standard 2026

---

## 1. Wprowadzenie -- Kim jest Analityk?

Wyobraz sobie, ze dostajesz polecenie: "Zbuduj dom jednorodzinny z garanzem, ogrodem i basenem." Jedno zdanie -- a za nim stoja tysiace decyzji, setki zadan i dziesiatki specjalistow. Zanim ktokolwiek polozony pierwszy cegel, ktos musi rozlozyc to jedno zdanie na czesci: fundamenty, sciany, dach, instalacja elektryczna, hydraulika, elewacja, ogrod, basen, garaz. Ktos musi zdecydowac, ktore z tych zadan moga byc robione jednoczesnie (elektryk i hydraulik moga pracowac rownolegle na roznych pietrach), a ktore musza czekac na inne (nie polozyskby dachu bez scian). Ktos musi okreslic, ze fundamenty to zadanie XL (skomplikowane, czasochlonne), a montaz klamek to zadanie S (proste, szybkie).

Ta osoba to **Analityk**.

**Analityk** (oznaczenie A-02 w architekturze Gold Standard 2026) to agent specjalizujacy sie w **dekompozycji zlozonych problemow na niezalezne, realizowalne podzadania**. Jego rola jest analogiczna do trzech postaci ze swiata realnego:

- **Inzynier systemowy** -- dostaje specyfikacje produktu ("samolot dla 200 pasazerow") i rozklada ja na podsystemy: kadlub, skrzydla, silniki, awionika, kabina pasazerska, system paliwowy. Kazdy podsystem jest niezaleznym projektem z wlasnymi specjalistami -- ale inzynier systemowy widzi, jak te czesci ze soba wspolgraja.
- **Chirurg planujacy operacje** -- zanim skalpel dotknie skory, chirurg analizuje: jakie sa etapy operacji? Co mozna robic rownolegle (np. dwoch chirurgow pracujacych na roznych czesciach ciala)? Ktore etapy sa krytyczne (jesli sie nie powioda, cala operacja traci sens)? Jaka jest zlozonosc kazdego etapu?
- **Szef kuchni w restauracji z gwiazda Michelin** -- dostaje zamowienie na 12-daniowa degustacje i rozklada je: przystawki mozna przygotowac rownolegle, ale deser musi czekac na glowne danie, bo uzywa tego samego pieca. Ocenia zlozonosc kazdego dania (soufflé to XL, sorbetto to S) i ustala, ktory kucharz (agent) zajmie sie kazdym daniem.

Analityk siedzi w **warstwie PLANOWANIA** (Poziom 1) architekturalnej hierarchii -- partnersko obok Planera, bezposrednio pod Orkiestratorem. Pozycja ta jest kluczowa: Analityk nie jest wykonawca (nie pisze kodu, nie prowadzi researchu) i nie jest strategiem (nie podejmuje ostatecznych decyzji). Jest **dekompozytorem** -- przeksztalca abstrakcyjne, zlozone polecenie uzytkownika w konkretna, ustrukturyzowana liste podzadan, na podstawie ktorej Planer stworzy harmonogram, a Researcherzy i Builderzy beda pracowac.

Dlaczego Analityk w ogole istnieje jako osobna rola? Bo dekompozycja to **najtrudniejszy krok intelektualny** w calym procesie. Bledna dekompozycja -- pominiecie kluczowego podzadania, zle okreslenie zaleznosci, niedoszacowanie zlozonosci -- propaguje sie przez caly system jak pekniecie w fundamencie domu. Jak to ujeto w analizie OMEGA: **"Jesli Analityk sie pomyli -- nie bedzie czego budowac po drugiej stronie."**

> **Czy wiesz, ze...?** Wzorzec Plan-and-Execute (Analityk -> Planer -> Builder -> QA) daje **83% oszczednosci kosztowych** w porownaniu z podejsciem ad-hoc, gdzie agenty dostaja zadania bez uprzedniej dekompozycji. To dlatego, ze dobra dekompozycja eliminuje duplikacje, identyfikuje rownolegle sciezki i zapobiega przebudowom wynikajacym z nierozpoznanych zaleznosci.

---

## 2. Kluczowe Obowiazki

Analityk ma piec fundamentalnych obowiazkow. Kazdy z nich jest krytyczny -- pominiecie któregokolwiek prowadzi do chaosu w dalszych fazach systemu.

### 2.1. Dekompozycja problemu na podzadania (Problem Decomposition)

To **najwazniejsze** zadanie Analityka. Gdy Orkiestrator przekazuje polecenie "zbuduj interaktywna strone edukacyjna o architekturze agentow AI z diagramami, quizami i animacjami", Analityk nie przesyla tego dalej. Rozklada problem na **niezalezne, realizowalne czesci**:

```
DEKOMPOZYCJA: "Interaktywna strona edukacyjna o agentach AI"

1. [RESEARCH] Zbadaj best practices interaktywnej edukacji online
2. [RESEARCH] Zbadaj trendy wizualne (palety, typografia, layout)
3. [RESEARCH] Zbadaj dokumentacje techniczna frameworkow JS do animacji
4. [DESIGN] Zaprojektuj system designowy (paleta, spacing, typografia)
5. [DESIGN] Zaprojektuj layout strony i nawigacje
6. [BUILD] Zaimplementuj strukture HTML i grid layout
7. [BUILD] Zaimplementuj system quizow (pytania, walidacja, feedback)
8. [BUILD] Zaimplementuj diagramy SVG (interaktywne, klikkalne)
9. [BUILD] Zaimplementuj animacje i przejscia
10. [BUILD] Zaimplementuj drag-and-drop (sortowanie agentow)
11. [INTEGRATE] Polacz wszystkie komponenty w jeden artefakt
12. [QA] Audyt bezpieczenstwa (XSS, CSP, sanityzacja inputow)
13. [QA] Audyt jakosci (responsive, a11y, performance)
14. [QA] Przeglad managerski -- decyzja GO/NO-GO
```

Kluczowa zasada: **kazde podzadanie musi byc realizowalne przez JEDNEGO agenta, z jasno okreslonym wejsciem i wyjsciem.** Jesli podzadanie wymaga dwoch agentow jednoczesnie -- jest za duze, trzeba je dalej rozlozyc.

### 2.2. Identyfikacja niezaleznosci i zaleznosci (Dependency Mapping)

To **najcenniejsza** umiejetnosc Analityka. Kazde podzadanie jest albo **niezalezne** (moze byc wykonane rownolegle z innymi), albo **zalezne** (musi czekac na wynik innego podzadania).

Analityk tworzy **graf zaleznosci** -- wizualna mape pokazujaca, ktore podzadania od siebie zaleza:

```
Podzadanie 1 (Research Tech)    ─┐
Podzadanie 2 (Research UX)      ─┼─> Podzadanie 4 (Synteza) ─> Podzadanie 6 (Build HTML)
Podzadanie 3 (Research Docs)    ─┘                              │
                                                                 ├─> Podzadanie 11 (Integracja)
Podzadanie 5 (Design)          ───> Podzadanie 7 (Quizy)       │
                                     Podzadanie 8 (Diagramy)   ─┘
                                     Podzadanie 9 (Animacje)   ─┘
```

Jesli dwa podzadania **nie maja miedzy soba krawedzi zaleznosci** -- moga byc wykonywane rownolegle. To klucz do przyspieszenia calego projektu. Badania pokazuja, ze prawidlowa identyfikacja niezaleznosci pozwala oszczedzic **40-60% czasu** w porownaniu z naiwnym wykonywaniem sekwencyjnym.

### 2.3. Estymacja zlozonosci (Complexity Estimation)

Analityk ocenia kazde podzadanie na skali **S/M/L/XL** -- nie w jednostkach czasu, lecz **zlozonosci**:

| Zlozonosc | Opis | Przyklad |
|-----------|------|----------|
| **S** (Small) | Proste, rutynowe, jeden krok | Zmiana palety kolorow, dodanie meta tagow |
| **M** (Medium) | Kilka krokow, wymaga uwagi | Implementacja quizu z walidacja |
| **L** (Large) | Zlozone, wiele komponentow | Interaktywny diagram SVG z drag-and-drop |
| **XL** (Extra Large) | Bardzo zlozone, krytyczne | Pelny system animacji z timeline i easing functions |

Dlaczego **zlozonosc, a nie czas**? Bo czas zalezy od modelu AI -- Opus zrobi to szybciej niz Haiku, ale zlozonosc pozostaje taka sama niezaleznie od modelu. Estymowanie czasu to **anty-wzorzec** -- prowadzi do falszywych oczekiwan i blednych priorytetow.

> **Uwaga!** Estymacja zlozonosci ma bezposrednie przelozenie na **dobór modelu**. Zadania S/M moga byc realizowane przez tanski model (Haiku, $0.80/1M tokenow). Zadania L/XL wymagaja silniejszego modelu (Sonnet, $3/1M lub nawet Opus, $15/1M). Analityk nie decyduje o modelu -- ale jego estymacja zlozonosci jest kluczowym inputem dla Orkiestratora przy tej decyzji.

### 2.4. Kategoryzacja zadan (Task Categorization)

Analityk nie tylko rozklada problem na podzadania, ale tez **kategoryzuje** je wedlug typu pracy:

| Kategoria | Opis | Kto realizuje |
|-----------|------|---------------|
| **RESEARCH** | Wymaga przeszukania zrodel, zebrania danych | Researcherzy (R-01 do R-06) |
| **DESIGN** | Wymaga decyzji wizualnych, UX, typografia | Designer |
| **BUILD** | Wymaga napisania kodu (HTML/CSS/JS/Python) | Koder, Frontend Dev |
| **INTEGRATE** | Wymaga polaczenia komponentow w calosc | Integrator |
| **QA** | Wymaga audytu bezpieczenstwa lub jakosci | QA Security, QA Quality |
| **CONTENT** | Wymaga napisania tresci edukacyjnej | Redaktor |

Ta kategoryzacja pozwala Orkiestratorowi natychmiast wiedziec, ktory agent powinien dostac dane podzadanie. Analityk **rozdziela** to, co wymaga researchu, od tego, co wymaga implementacji -- co zapobiega sytuacji, w ktorej Koder traci czas na szukanie informacji, zamiast pisac kod.

### 2.5. Tworzenie strukturalnego planu dekompozycji (Decomposition Output)

Koncowy output Analityka to **strukturalny dokument Markdown** -- nie luźne notatki, nie lista punktorowa w chaotycznej kolejnosci. To formalny plan dekompozycji z precyzyjnym formatem:

```markdown
# DEKOMPOZYCJA: [Nazwa projektu]

## Podsumowanie
- Liczba podzadan: 13
- Szacowana zlozonosc calkowita: L
- Rekomendowana liczba agentow: 9-11
- Potencjal paralelizacji: 65% (8 z 13 podzadan moze byc rownolegla)

## Podzadania

### T-001: Research best practices edukacji interaktywnej
- Kategoria: RESEARCH
- Zlozonosc: M
- Zaleznosci: brak (niezalezne)
- Agent docelowy: Researcher Tech (R-01)
- Input: Temat projektu, zakres edukacyjny
- Output oczekiwany: Raport z min. 5 zrodlami, pros/cons kazdego podejscia

### T-002: Research trendow wizualnych UI/UX
- Kategoria: RESEARCH
- Zlozonosc: M
- Zaleznosci: brak (niezalezne)
- Agent docelowy: Researcher UX (R-02)
- Input: Temat projektu, typ produktu (strona edukacyjna)
- Output oczekiwany: Mood board z min. 5 referencjami, paleta, typografia

### T-003: Implementacja systemu quizow
- Kategoria: BUILD
- Zlozonosc: L
- Zaleznosci: T-001 (wymaga wynikow researchu), T-005 (wymaga design system)
- Agent docelowy: Koder (B-01)
- Input: Specyfikacja quiz, design system
- Output oczekiwany: Komponent HTML/CSS/JS z walidacja i feedbackiem

[...]
```

Ten format jest kluczowy, bo sluzy jako **kontrakt** miedzy Analitykiem a reszta systemu. Planer czyta ten dokument i na jego podstawie tworzy harmonogram. Orkiestrator czyta go, zeby wiedziec, ile agentow potrzebuje. Kazdy agent dostaje TYLKO swoje podzadanie z jasnym inputem i oczekiwanym outputem.

---

## 3. Czego Analityk NIE robi

Ta sekcja jest rownie wazna jak poprzednia. Wiekszosc bledow w systemach wieloagentowych wynika nie z tego, ze Analityk robi za malo, lecz z tego, ze **wychodzi poza swoja role**.

Analityk **NIGDY**:

- **Nie pisze kodu.** Nie implementuje zadnego podzadania, ktore sam zdekomponowal. Nawet jesli widzi oczywiste rozwiazanie -- jego praca konczy sie na dekompozycji. Od implementacji sa Builderzy (Koder, Designer, Integrator).

- **Nie prowadzi researchu.** Nie przeszukuje internetu, nie czyta dokumentacji, nie analizuje benchmarkow. Od tego sa Researcherzy. Analityk okresla, ze "trzeba zbadac frameworki JS do animacji" -- ale sam tego nie robi.

- **Nie tworzy harmonogramu.** Okresla CO trzeba zrobic i jakie sa zaleznosci. Ale KIEDY i w jakiej kolejnosci -- to rola Planera. Analityk mowi: "T-003 zalezy od T-001". Planer mowi: "Dlatego T-003 idzie do Fazy 3, a T-001 do Fazy 1."

- **Nie podejmuje decyzji architektonicznych.** Nie wybiera frameworka, nie decyduje o bazie danych, nie okresla palety kolorow. Moze w podzadaniu zapisac "trzeba zdecydowac o frameworku frontend" -- ale sama decyzja nalezy do Orkiestratora na podstawie wynikow researchu.

- **Nie estymuje czasu.** Estymuje **zlozonosc** (S/M/L/XL). Czas to pochodna zlozonosci i modelu -- a dobor modelu to decyzja Orkiestratora, nie Analityka.

Dlaczego te granice sa takie wazne? Bo Analityk dziala na najwyzszym modelu intelektualnym -- musi **widziec calosc** problemu, zeby go prawidlowo rozlozyc. Gdy zaczyna sie zaglebiac w szczegoly implementacyjne, traci te calosc. To tak, jakby inzynier systemowy Boeinga nagle zszedl na hale produkcyjna i zaczal lutowac plyty elektroniczne -- moze potrafi, ale w tym czasie nikt nie pilnuje, czy podsystemy do siebie pasuja.

W terminologii anty-wzorcow nazywa sie to **Scope Creep Anti-Pattern** -- Analityk, ktory wychodzi poza dekompozycje i zaczyna robic prace merytoryczna. Efekt jest zawsze ten sam: dekompozycja jest powierzchowna (bo Analityk poswiecil czas na cos innego), a praca merytoryczna jest slaba (bo Analityk nie jest specjalista w danej dziedzinie).

> **Czy wiesz, ze...?** Kluczowa roznica miedzy Analitykiem a Orkiestratorem w kwestii dekompozycji: **Orkiestrator** dokonuje dekompozycji **strategicznej** -- decyduje, ze projekt wymaga fazy research, fazy build i fazy QA. **Analityk** dokonuje dekompozycji **taktycznej** -- w ramach kazdej fazy rozklada prace na konkretne, realizowalne podzadania z estymacjami i zalezosciami. Orkiestrator mowi "trzeba zbadac temat", Analityk mowi "trzeba zbadac 3 aspekty: frameworki (R-01), design (R-02), dokumentacje (R-03)."

---

## 4. Model i Koszt -- Dlaczego Analityk Uzywa Sonnet

Analityk uzywa **Claude Sonnet** ($3 input / $15 output za milion tokenow) -- NIE Opus. To swiadoma decyzja architektoniczna.

### Dlaczego Sonnet, a nie Opus?

1. **Analityk dziala RAZ na poczatku projektu.** W odroznieniu od Orkiestratora (ktory dziala przez caly cykl i podejmuje decyzje w czasie rzeczywistym), Analityk tworzy dekompozycje raz i konczy prace. To oznacza, ze koszt modelu jest jednorazowy.

2. **Dekompozycja wymaga dobrego, ale nie najlepszego rozumowania.** Sonnet doskonale radzi sobie z analiza strukturalna, identyfikacja zaleznosci i kategoryzacja -- to jego mocna strona. Opus jest potrzebny tam, gdzie wymagane jest rozumowanie strategiczne pod presja czasu (Orkiestrator) lub synteza sprzecznych informacji (Syntetyk).

3. **Koszt ma znaczenie.** Opus kosztuje 5x wiecej niz Sonnet na input i 5x wiecej na output. Jesli dekompozycja kosztuje $0.15 na Sonnet, to na Opus kosztowaloby $0.75 -- a jakosc dekompozycji bylaby porownywalna.

### Typowe zuzycie tokenow

| Parametr | Wartosc |
|----------|---------|
| System prompt | ~500 tokenow |
| Task context (od Orkiestratora) | 1,000-2,000 tokenow |
| Output (dekompozycja) | 500-1,000 tokenow |
| **Lacznie na sesje** | **2,000-3,500 tokenow** |
| Koszt sesji (Sonnet) | **$0.01-0.05** |
| Koszt sesji (gdyby Opus) | $0.05-0.25 |
| Liczba wywolan na run | **1** (jednorazowe) |

### Kiedy rozwazyc Opus dla Analityka?

W **ultra-zlozonych projektach** (50+ podzadan, wiele warstw zaleznosci, wielojezyczne wymagania), gdzie bledna dekompozycja moze kosztowac setki dolarow w zmarnowanych tokenach builderow. Przy budzetach enterprise, gdzie koszt roznica $0.50 jest pomijalna w porownaniu z ryzykiem zlej dekompozycji.

Ogolna zasada: **Sonnet dla 95% projektow, Opus tylko dla mission-critical dekompozycji**.

### Czas trwania sesji Analityka

Analityk jest jednym z **najszybszych agentow** w systemie. Typowa sesja dekompozycji trwa **15-25 sekund** -- Analityk czyta polecenie, analizuje zlozonosc i generuje strukturalny plan. To znacznie krociej niz sesja Researchera (20-40 sekund, bo wymaga przeszukiwania zrodel) czy Kodera (30-60 sekund, bo generuje kod).

> **Uwaga!** Krotki czas sesji nie oznacza, ze praca Analityka jest mala. Przeciwnie -- te 15-25 sekund to najbardziej **gestoinformacyjny** moment w calym pipeline. Kazda decyzja podjeta w tym czasie (ta zaleznosc, ta zlozonosc, ta kategoryzacja) propaguje sie przez caly system. Dlatego mimo niskiego kosztu tokenowego, jakosc modelu ma znaczenie.

---

## 5. Narzedzia Analityka

Analityk ma **celowo minimalistyczny** zestaw narzedzi. To nie jest ograniczenie -- to fundamentalna decyzja projektowa.

### Narzedzia DOZWOLONE:

| Narzedzie | Co robi | Dlaczego Analityk to ma |
|-----------|---------|-------------------------|
| **Read** | Czyta pliki | Odczytywanie polecenia od Orkiestratora, czytanie MANIFEST.md, czytanie specyfikacji projektu |
| **Write** | Zapisuje pliki | Zapisywanie outputu dekompozycji w formacie Markdown |

### Narzedzia ZAKAZANE:

| Narzedzie | Co robi | Dlaczego Analityk tego NIE MA |
|-----------|---------|-------------------------------|
| **Bash** (terminal) | Uruchamia komendy systemowe | Analityk NIE uruchamia kodu -- tylko analizuje statycznie. Celowe ograniczenie wymusza skupienie na dekompozycji |
| **Agent** (subagent) | Uruchamia podagentow | Orkiestracja to rola Orkiestratora, nie Analityka. Gdyby Analityk mogl uruchamiac agentow, zaczynoby sam zarzadzac systemem |
| **Edit** | Edytuje pliki | Edycja istniejacych plikow = modyfikacja cudzej pracy. Analityk tworzy NOWY dokument dekompozycji, nie edytuje kodu |
| **WebSearch** | Przeszukuje internet | Research = praca merytoryczna, nie dekompozycja. Od tego sa Researcherzy |
| **WebFetch** | Pobiera strony | To samo co WebSearch -- Analityk nie zbiera danych z internetu |

### Filozofia: Narzedzia definiuja role

Zasada jest identyczna jak przy Orkiestratorze i Syntetyku: **narzedzia sa strażnikami roli**. Jesli dasz Analitykowi narzedzie Bash, poczuje pokuse, zeby uruchomic kod i "sprawdzic" swoja dekompozycje. Jesli dasz mu WebSearch, zacznie sam robic research zamiast delegowac go Researcherom. Jesli dasz mu Agent, stanie sie mini-Orkiestratorem.

Minimalizm narzedzi to **mechanizm wymuszajacy dyscypline**: Analityk fizycznie nie moze robic niczego poza czytaniem kontekstu (Read) i pisaniem dekompozycji (Write). To gwarantuje, ze 100% jego tokenow idzie na to, do czego jest przeznaczony.

> **Czy wiesz, ze...?** W quizie edukacyjnym Agent Teams Configurator v4 jest pytanie: "Dlaczego Analityk celowo NIE ma narzedzia Bash?" Prawidlowa odpowiedz: "Bo Analityk nie uruchamia kodu -- tylko go analizuje statycznie. Celowe ograniczenie narzedzi wymusza skupienie na dekompozycji." 78% uzytkownikow odpowiada blednie, wybierajac "bo Bash jest niebezpieczny" -- co pokazuje, jak czesto ludzie myslą o narzędziach w kategoriach bezpieczenstwa, a nie **dyscypliny roli**.

---

## 6. Workflow Analityka -- Krok po Kroku

Przyjrzyjmy sie, jak Analityk przeprowadza kompletna dekompozycje. Uzyje konkretnego przykladu: uzytkownik prosi o "stworzenie dashboardu analitycznego dla firmy e-commerce".

### Krok 1: Otrzymaj polecenie od Orkiestratora (Read)

Analityk czyta zadanie przekazane przez Orkiestratora. Nie dostaje pelnego kontekstu projektu -- dostaje **waski kontekst** (Narrow Context Principle): cel, ograniczenia i zakres.

```
CEL: Dashboard analityczny e-commerce
OGRANICZENIA: Single-page HTML, dark mode, responsive
ZAKRES: Metryki sprzedazy, wykresy, tabele, filtry
```

### Krok 2: Zidentyfikuj domeny funkcjonalne

Analityk nie zaczyna od listy zadan -- zaczyna od **domen**. Jakie obszary wiedzy sa potrzebne?

- **Domena danych**: skad beda dane? API? Mock? Static JSON?
- **Domena wizualna**: jakie komponenty UI? Wykresy, tabele, karty metryk?
- **Domena interakcji**: filtry, sortowanie, drill-down?
- **Domena techniczna**: jakie frameworki? Responsywnosc? Performantnost?
- **Domena jakosci**: bezpieczenstwo, dostepnosc, testy?

### Krok 3: Rozloz na podzadania w kazdej domenie

Dla kazdej domeny Analityk tworzy konkretne, realizowalne podzadania:

```
DOMENA DANYCH:
  T-001: [RESEARCH, M] Zbadaj best practices dashboard analytics 2026
  T-002: [BUILD, S] Przygotuj mock data w formacie JSON

DOMENA WIZUALNA:
  T-003: [RESEARCH, M] Zbadaj trendy wizualne dashboardow (dark mode, glassmorphism)
  T-004: [DESIGN, L] Zaprojektuj design system (paleta, typografia, spacing)
  T-005: [BUILD, L] Zaimplementuj layout CSS Grid z responsive breakpoints
  T-006: [BUILD, L] Zaimplementuj wykresy SVG (line, bar, donut)
  T-007: [BUILD, M] Zaimplementuj tabele z sortowaniem
  T-008: [BUILD, M] Zaimplementuj karty metryk (KPI cards)

DOMENA INTERAKCJI:
  T-009: [BUILD, L] Zaimplementuj system filtrow (data, kategoria, region)
  T-010: [BUILD, M] Zaimplementuj animacje i przejscia

DOMENA JAKOSCI:
  T-011: [QA, M] Audyt bezpieczenstwa (XSS, CSP, sanityzacja)
  T-012: [QA, M] Audyt jakosci (responsive, a11y, performance)
  T-013: [QA, S] Przeglad managerski -- GO/NO-GO
```

### Krok 4: Zidentyfikuj zaleznosci

Analityk rysuje graf zaleznosci:

```
T-001 ─┐
T-003 ─┼─> T-004 ─> T-005 ─> T-006 ─┐
       │                    T-007 ─┤
       │                    T-008 ─┤
T-002 ──────────────────────────────┼─> T-011 (Integracja) ─> T-012 ─> T-013
                             T-009 ─┤
                             T-010 ─┘
```

Kluczowe obserwacje:
- T-001 i T-003 sa **niezalezne** -- moga byc rownolegla (Research Tech || Research UX)
- T-006, T-007, T-008 sa **wzajemnie niezalezne** -- moga byc rownolegle PO T-005
- T-011 (Integracja) **zalezy od WSZYSTKICH buildow** -- musi czekac
- T-012 i T-013 sa **sekwencyjne** po integracji

### Krok 5: Ocen potencjal paralelizacji

```
Podzadania RAZEM: 13
Podzadania NIEZALEZNE (mozliwe rownolegle): 8
POTENCJAL PARALELIZACJI: 62%

Szacowana oszczednosc czasu (vs sekwencja): ~45%
```

### Krok 6: Zapisz dekompozycje (Write)

Analityk zapisuje kompletny dokument Markdown z formatem opisanym w sekcji 2.5. Ten dokument staje sie **inputem dla Planera**, ktory na jego podstawie stworzy harmonogram z bramami jakosci.

### Krok 7: Zakonczenie pracy

Analityk **konczy prace** po zapisaniu dekompozycji. Nie monitoruje dalszych faz, nie poprawia swojego outputu (chyba ze Orkiestrator jawnie o to poprosi w iteracji naprawczej). Jego praca jest jednorazowa -- w odroznieniu od Syntetyka (ktory jest persystentny przez caly cykl) czy Orkiestratora (ktory dziala od poczatku do konca).

> **Czy wiesz, ze...?** W architekturze OBSERVATORY caly workflow dekompozycji (7 kroków powyzej) zostal wykonany w **jednej sesji** trwajacej okolo 20 sekund. Output: 13 podzadan z grafem zaleznosci, estymacjami i kategoryzacja. Na tej podstawie Planer w kolejnych 15 sekundach stworzyl pelny harmonogram z 8 fazami i 5 bramami jakosci.

---

## 7. Analityk w Roznych Konfiguracjach Zespolowych

Analityk nie zawsze dziala tak samo. Jego rola adaptuje sie do rozmiaru i konfiguracji zespolu agentow.

### 7.1. Konfiguracja Startup MVP (5 agentow)

```
Orkiestrator -> Analityk -> Researcher -> Builder -> QA
```

W minimalnym zespole Analityk jest **jedynym agentem planujacym**. Nie ma oddzielnego Planera -- Analityk musi sam uwzglednic w dekompozycji zarowno CO trzeba zrobic, jak i w jakiej KOLEJNOSCI. To laczy dekompozycje z planowaniem, co jest dopuszczalne przy malej skali (3-5 podzadan), ale staje sie problematyczne przy wiekszej.

**Koszt calego zespolu**: ~150-250K tokenow, $0.15-$0.40

### 7.2. Konfiguracja Plan-and-Execute (7-9 agentow)

```
Orkiestrator -> [Analityk || Planer] -> [Research x3] -> [Build x2] -> QA
```

Tu Analityk dziala **rownolegle z Planerem** -- oba sa na Poziomie 1. Analityk robi CO (dekompozycje), Planer robi KIEDY (harmonogram). Ich outputy sa komplementarne i trafiaja do Orkiestratora, ktory syntetyzuje je w wykonalny plan.

**Uwaga o 70% overlap**: Analiza ALPHA Team wykazala, ze Analityk i Planer maja **70% nakladania sie obowiazkow** w malych projektach. Oba analizuja zaleznosci, oba kategoryzuja podzadania. W konfiguracji Plan-and-Execute czesto laczy sie ich w jednego agenta **"Analityk-Planer"** -- co oszczedza 1 wywolanie LLM (~2,000-3,500 tokenow) bez utraty jakosci.

### 7.3. Konfiguracja Gold Standard (11-14 agentow)

```
Orkiestrator -> [Analityk || Planer] -> [Research x3-6] -> [Build x4] -> [QA x3 + Manager]
```

Pelna konfiguracja, gdzie Analityk jest **oddzielona, wyspecjalizowana rola**. Tu rozdzielenie Analityka i Planera ma sens -- dekompozycja projektu na 20-30 podzadan z grafem zaleznosci to juz wystarczajaco zlozony problem, zeby uzasadnic osobnego agenta.

### 7.4. Konfiguracja Deep Research Belt (15-17 agentow)

W konfiguracji z 6 rownoleglymi Researcherami, rola Analityka staje sie krytyczna -- musi zaprojektowac dekompozycje, ktora **prawidlowo podzieli prace badawcza** miedzy 6 specjalistow tak, zeby nie dublowali pracy i nie zostawiali luk.

```
                          R-01 (Tech)
                          R-02 (UX)
Analityk ──> dekompozycja R-03 (Reddit)     [6 rownoleglych]
                          R-04 (X/Twitter)
                          R-05 (GitHub)
                          R-06 (Forums)
```

> **Czy wiesz, ze...?** W presetach Agent Teams Configurator v8 Analityk wystepuje w **19 z 27 konfiguracji** -- wiecej niz jakikolwiek inny agent poza Orkiestratorem. To czyni go de facto **najbardziej uniwersalnym agentem** w calym ekosystemie.

---

## 8. Output Analityka -- Formaty i Standardy

Jakosc outputu Analityka determinuje jakosc pracy calego systemu. Dlatego format jest scisle zdefiniowany.

### 8.1. Format Dekompozycji (Decomposition Document)

Kazda dekompozycja musi zawierac:

| Sekcja | Opis | Obowiazkowa? |
|--------|------|-------------|
| **Podsumowanie** | Liczba podzadan, szacowana zlozonosc calkowita, potencjal paralelizacji | TAK |
| **Lista podzadan** | Kazde z ID, kategoria, zlozonoscia, zaleznoscia, agentem docelowym | TAK |
| **Graf zaleznosci** | Wizualna mapa (ASCII art lub opis) | TAK |
| **Input/Output kazdego podzadania** | Co podzadanie otrzymuje i co produkuje | TAK |
| **Ryzyko** | Znane ryzyka i potencjalne problemy | REKOMENDOWANE |
| **Uwagi** | Dodatkowy kontekst dla Planera | OPCJONALNE |

### 8.2. Identyfikatory Podzadan

Kazde podzadanie ma unikalny identyfikator w formacie **T-NNN**:

- T-001 do T-099: podzadania RESEARCH
- T-100 do T-199: podzadania DESIGN
- T-200 do T-299: podzadania BUILD
- T-300 do T-399: podzadania INTEGRATE
- T-400 do T-499: podzadania QA
- T-500 do T-599: podzadania CONTENT

Ta konwencja pozwala na natychmiastowa identyfikacje typu podzadania na podstawie numeru.

### 8.3. Przyklad Zlego vs Dobrego Outputu

**ZLY output** (Analityk-amator):
```
- Trzeba zrobic research
- Trzeba napisac kod
- Trzeba przetestowac
```

**DOBRY output** (Analityk Gold Standard):
```
### T-001: Zbadaj frameworki do wykresow SVG
- Kategoria: RESEARCH
- Zlozonosc: M
- Zaleznosci: brak
- Agent: Researcher Tech (R-01)
- Input: "Porownaj Chart.js, D3.js, Recharts, Visx -- performance, bundle size, customizacja"
- Output: Raport z min. 3 opcjami, pros/cons, rekomendacja ze zrodlami URL
- Ryzyko: Zrodla mogą byc nieaktualne -- wymagaj daty >2025
```

Roznica jest **fundamentalna**. Zly output zostawia 90% decyzji Researcherowi (ktory nie wie, czego dokladnie szukac). Dobry output daje Researcherowi **laserowa precyzje** -- wie dokladnie, czego szukac, w jakim formacie odpowiedziec i jakie sa kryteria sukcesu.

---

## 9. Anty-wzorce (Co Analityk Robi Zle)

Zrozumienie anty-wzorcow jest rownie wazne jak zrozumienie dobrych praktyk. Oto piec najczestszych bledow Analityka:

### 9.1. Time Estimator (Estymowanie czasu zamiast zlozonosci)

**Symptom:** Analityk pisze: "T-003: Implementacja quizu -- ok. 15 minut."

**Problem:** Czas zalezy od modelu. Opus zrobi to w 30 sekund, Haiku w 2 minuty, czlowiek w 2 godziny. Zlozonosc "L" jest **niezmienna** niezaleznie od wykonawcy.

**Koszt:** Falszywe oczekiwania. Orkiestrator planuje na 15 minut, ale Haiku potrzebuje 40 -- caly harmonogram sie rozjezdza.

**Lekarstwo:** ZAWSZE estymuj zlozonosc (S/M/L/XL), NIGDY czas.

### 9.2. Monolith Decomposer (Zbyt duze podzadania)

**Symptom:** Analityk tworzy 3 podzadania zamiast 13. Jedno brzmi: "Zaimplementuj caly frontend."

**Problem:** Podzadanie "zaimplementuj caly frontend" nie jest realizowalne przez jednego agenta w jednej sesji. To nie jest dekompozycja -- to przepisanie oryginalnego problemu innymi slowami.

**Koszt:** Agent dostaje zbyt duze zadanie, traci kontekst, halucynuje, generuje niskiej jakosci output.

**Lekarstwo:** Kazde podzadanie musi byc realizowalne przez **jednego agenta w jednej sesji**. Jesli nie -- rozloz dalej.

### 9.3. Micro Decomposer (Zbyt male podzadania)

**Symptom:** Analityk tworzy 47 podzadan dla prostego projektu. Jedno brzmi: "Dodaj atrybut class do trzeciego diva."

**Problem:** Overdecomposition tworzy ogromny overhead koordynacyjny. Orkiestrator musi zarzadzac 47 podzadaniami, Planer musi ulozyc 47 elementow w harmonogramie, a koszt samej orkiestracji przekracza koszt wykonania.

**Koszt:** Eksplozja kosztow tokenowych (47 wywolan = 47x overhead promptu systemowego). Spowolnienie systemu.

**Lekarstwo:** **Sweet spot to 8-20 podzadan** dla typowego projektu. Ponizej 8 -- prawdopodobnie zbyt ogolne. Powyzej 20 -- prawdopodobnie zbyt szczegolowe.

### 9.4. Scope Creep Analyst (Wychodzenie poza dekompozycje)

**Symptom:** Analityk w dokumencie dekompozycji zaczyna pisac: "Rekomenduje uzycie React, bo..." lub "Paleta powinna byc ciemna, poniewaz..."

**Problem:** Analityk zaczyna podejmowac decyzje merytoryczne, ktore naleza do Orkiestratora (frameworki) lub Designera (paleta). Dekompozycja przestaje byc neutralna -- staje sie opinia jednego agenta.

**Koszt:** Builderzy dostaja sprzeczne instrukcje (Analityk mowi React, Researcher rekomenduje Svelte). Orkiestrator traci zaufanie do dokumentu dekompozycji.

**Lekarstwo:** Analityk pisze "T-003: Zdecyduj o frameworku frontend [DESIGN, M]" -- nie "T-003: Uzyj React."

### 9.5. Hidden Dependencies (Nieoznaczone zaleznosci)

**Symptom:** Analityk tworzy podzadania T-005 i T-008, ktore de facto zaleza od siebie, ale nie oznacza tej zaleznosci.

**Problem:** Planer ustawia T-005 i T-008 jako rownolegla, bo nie widzi zaleznosci. Agenty produkuja sprzeczne outputy. Integrator dostaje niespojne czesci.

**Koszt:** Iteracja naprawcza -- QA znajduje blad, Koder musi poprawic, QA sprawdza ponownie. Typowy koszt: $3-8 w zmarnowanych tokenach.

**Lekarstwo:** Dla KAZDEJ pary podzadan zadaj pytanie: "Czy T-X potrzebuje outputu T-Y, zeby sie rozpoczac?" Jesli TAK -- zaznacz zaleznosc jawnie.

> **Uwaga!** Anty-wzorzec **Hidden Dependencies** jest **najkosztowniejszy** ze wszystkich. Ukryta zaleznosc nie ujawnia sie w fazie planowania (bo Planer nie moze ja zobaczyc) ani w fazie research (bo Researcherzy pracuja niezaleznie). Ujawnia sie dopiero w fazie build lub QA -- czyli tam, gdzie naprawienie jest najdrozsze.

---

## 10. Analityk vs Planer -- Kluczowe Roznice

To jedno z najczesciej mylonych rozrozmian w architekturze wieloagentowej. Analityk i Planer sa tak blisko siebie, ze wielu projektantow probuje ich polaczyc. Oto dokladne roznice:

| Aspekt | Analityk (A-02) | Planer (A-03) |
|--------|-----------------|---------------|
| **Pytanie na ktore odpowiada** | **CO** trzeba zrobic? | **KIEDY** i w jakiej kolejnosci? |
| **Output** | Lista podzadan z zalezosciami | Harmonogram z fazami i bramami |
| **Kiedy dziala** | Raz, na poczatku | Raz, po Analityku |
| **Model** | Sonnet ($3/$15) | Sonnet ($3/$15) |
| **Load factor** | 55/100 (umiarkowany) | 40/100 (niski) |
| **Narzedzia** | Read, Write | Read, Write |
| **Estymuje** | Zlozonosc (S/M/L/XL) | Czas i kolejnosc |
| **Definiuje** | Podzadania, kategorie, inputy/outputy | Fazy, bramy, tryby (SEQ/PARALLEL) |
| **Widzi** | Problem od strony struktury | Problem od strony harmonogramu |
| **Analogia** | Architekt (co budowac) | Kierownik budowy (kiedy budowac) |

### Dlaczego nie polaczyc ich w jednego agenta?

Argument "za": 70% overlap w malych projektach, oszczednosc 1 wywolania LLM.

Argument "przeciw" (i powod, dla ktorego Gold Standard 2026 ich rozdziela w duzych systemach):

1. **Rozne perspektywy.** Analityk myśli **strukturalnie** ("jakie sa czesci tego problemu?"). Planer myśli **temporalnie** ("w jakiej kolejnosci je wykonac?"). Polaczenie wymusza przelaczanie miedzy perspektywami, co obniza jakosc obu.

2. **Rozne inputy.** Analityk potrzebuje opisu problemu. Planer potrzebuje gotowej dekompozycji. Jesli jeden agent robi obie rzeczy, nie ma momentu walidacji miedzy nimi -- blad w dekompozycji automatycznie propaguje sie do harmonogramu.

3. **Zasada pojedynczej odpowiedzialnosci.** Analityk, ktory jednoczesnie tworzy harmonogram, ma pokuse skracac droge -- "ten podzadanie jest trudne, ale dam mu malo czasu, bo chce szybko skonczyc."

**Wyjątek -- kiedy laczyc:**

W systemach **do 7 agentow**, gdzie projekt ma mniej niz 10 podzadan, rozdzielenie Analityka i Planera to over-engineering. Polaczony "Analityk-Planer" oszczedza tokeny i upraszcza system bez mierzalnej utraty jakosci.

> **Czy wiesz, ze...?** W architekturze OBSERVATORY Planer i Analityk sa przedstawiani jako **"oficerowie"** -- doradcy strategiczni kapitana statku (Orkiestratora). W matrycy komunikacji Analityk ma **5 polaczen** z innymi agentami -- mniej niz Orkiestrator (12), ale wiecej niz Researcherzy (2). To odzwierciedla jego role posrednika miedzy strategia a wykonaniem.

---

## 11. Najlepsze Praktyki 2025-2026

Na podstawie doswiadczen z architektur produkcyjnych (OBSERVATORY, Magentic-One, LangGraph, CrewAI) oraz referencyjnego Gold Standard 2026:

### Praktyka 1: Zacznij od domen, nie od zadan

Nie twórz listy zadan "z glowy". Najpierw zidentyfikuj domeny funkcjonalne (dane, wizualizacja, interakcja, jakosc), a potem w kazdej domenie wylistuj podzadania. To systematyczne podejscie eliminuje "białe plamy" -- podzadania, o których bys zapomnial.

### Praktyka 2: Kazde podzadanie = jeden agent, jeden output

Jesli podzadanie wymaga dwoch agentow lub produkuje dwa niezalezne outputy -- rozloz je dalej. Regula: **jesli nie mozesz jednoznacznie przypisac podzadania do jednego agenta z Katalogu Agentow -- jest za duze.**

### Praktyka 3: Estymuj zlozonosc, nie czas

Czas zalezy od modelu. Zlozonosc (S/M/L/XL) jest stala. Estymowanie czasu to anty-wzorzec prowadzacy do falszywych oczekiwan.

### Praktyka 4: Jawne zaleznosci > ukryte zalozenia

Kazda zaleznosc miedzy podzadaniami musi byc jawnie oznaczona. Nigdy nie zakladaj, ze "oczywiste" ze T-005 zalezy od T-002 -- zapisz to. Planer i Orkiestrator nie czytaja w myślach.

### Praktyka 5: Sweet spot to 8-20 podzadan

Mniej niz 8 -- zbyt ogolne, brakuje precyzji. Wiecej niz 20 -- overhead koordynacyjny przewaza nad korzysciami ze specjalizacji.

### Praktyka 6: Rozdzielaj research od implementacji

Nigdy nie twórz podzadania "zbadaj i zaimplementuj system quizow". To sa DWA podzadania: jedno dla Researchera ("zbadaj best practices quizow"), drugie dla Kodera ("zaimplementuj quiz wedlug specyfikacji"). Polaczenie zmusza agenta do przelaczania kontekstu, co obniza jakosc obu wynikow.

### Praktyka 7: Definiuj input i output kazdego podzadania

Podzadanie bez zdefiniowanego inputu: agent nie wie, od czego zaczac. Podzadanie bez zdefiniowanego outputu: nikt nie wie, kiedy jest skonczone. Oba prowadza do chaosu.

### Praktyka 8: Testuj dekompozycje pytaniem "czy to realizowalne?"

Po zapisaniu kazdego podzadania zadaj sobie pytanie: "Czy jeden agent, z jednym zestawem narzedzi, w jednej sesji, moze to wykonac i dostarczyc zdefiniowany output?" Jesli odpowiedz brzmi NIE -- rozloz dalej lub zmien zakres.

### Prompt Engineering dla Analityka

Oto wzorzec systemowego promptu stosowany w Gold Standard 2026:

```
Jestes Analitykiem. Rozloz problem na NIEZALEZNE podzadania.

Dla kazdego podzadania okresl:
1. Zakres funkcjonalny
2. Co wymaga researchu vs implementacji
3. Wymagania techniczne i UX/designowe
4. Zaleznosci od innych podzadan
5. Zlozonosc: S/M/L/XL

Output: strukturalny plan w Markdown z grafem zaleznosci.
NIGDY nie estymuj czasu -- estymuj ZLOZONOSC.
NIGDY nie podejmuj decyzji merytorycznych -- flaguj je jako podzadania.
```

> **Uwaga!** Prompt Analityka jest **krotki i kategoryczny** -- tak jak prompt Orkiestratora. Nie opisuje jak kodowac, jak szukac informacji, jak projektowac -- bo Analityk tego NIE ROBI. Prompt mowi TYLKO o dekompozycji.

---

## 12. Podsumowanie i Kluczowe Wnioski

### 10 Najwazniejszych Wnioskow

1. **Analityk to dekompozator, nie wykonawca.** Rozklada problem na czesci -- nigdy nie realizuje tych czesci sam. Jego praca konczy sie w momencie, gdy dokument dekompozycji jest zapisany.

2. **"Jesli Analityk sie pomyli -- nie bedzie czego budowac po drugiej stronie."** Bledna dekompozycja to bledny fundament. Brakujace podzadanie, ukryta zaleznosc, zle oszacowana zlozonosc -- to wszystko propaguje sie kaskadowo przez caly system.

3. **Estymuj zlozonosc (S/M/L/XL), nigdy czas.** Czas zalezy od modelu. Zlozonosc jest stala. To fundamentalna zasada, ktora odroznia Analityka-amatora od Analityka Gold Standard.

4. **Kluczowa umiejetnosc: identyfikacja niezaleznosci.** Kazde podzadanie, ktore mozna wykonac rownolegle zamiast sekwencyjnie, skraca calkowity czas projektu. Dobry Analityk maksymalizuje paralelizacje.

5. **Sonnet wystarczy dla 95% projektow.** Analityk nie wymaga Opus. Jego praca jest jednorazowa, taktyczna i dobrze ustrukturyzowana -- idealna dla Sonnet za $3/$15.

6. **Narzedzia: tylko Read i Write.** Brak Bash = nie moze uruchamiac kodu. Brak Agent = nie moze orkiestrowac. Brak WebSearch = nie moze badac. Minimalizm wymusza skupienie.

7. **Sweet spot: 8-20 podzadan.** Mniej = zbyt ogolne. Wiecej = overhead koordynacyjny.

8. **Rozdzielaj research od implementacji.** Jedno podzadanie = jeden typ pracy. Polaczenie obniza jakosc obu.

9. **Analityk vs Planer: CO vs KIEDY.** Analityk mowi CO trzeba zrobic. Planer mowi KIEDY i w jakiej kolejnosci. Laczenie ma sens w malych zespolach (<7 agentow), ale nie w duzych.

10. **Wzorzec Plan-and-Execute daje 83% oszczednosci.** Analityk jest pierwszym ogniwem w lancuchu Analityk -> Planer -> Builder -> QA, ktory redukuje koszty o 83% vs ad-hoc.

---

### QUICK REFERENCE CARD -- ANALITYK (A-02)

```
+======================================================================+
|                    ANALITYK (A-02) -- Quick Reference                 |
+======================================================================+
|                                                                      |
|  WARSTWA:    PLANOWANIE / ANALIZA (Poziom 1)                         |
|  MODEL:      Claude Sonnet ($3/$15 za 1M tokenow)                   |
|  LOAD:       55/100 (umiarkowany)                                    |
|  NARZEDZIA:  Read, Write                                             |
|  ZAKAZANE:   Bash, Agent, Edit, WebSearch, WebFetch                  |
|                                                                      |
|  INPUT:      Zlozony problem + waski kontekst od Orkiestratora       |
|                                                                      |
|  OUTPUT:     Dokument dekompozycji (Markdown) z:                     |
|              - Lista podzadan (T-001, T-002...)                      |
|              - Kategoryzacja (RESEARCH/DESIGN/BUILD/QA)              |
|              - Estymacja zlozonosci (S/M/L/XL)                       |
|              - Graf zaleznosci (ASCII art)                            |
|              - Input/Output kazdego podzadania                       |
|              - Potencjal paralelizacji (%)                            |
|                                                                      |
|  ESTYMACJA:                                                          |
|  S  = proste, rutynowe           (1 krok)                            |
|  M  = kilka krokow, uwaga       (2-4 kroki)                         |
|  L  = zlozone, wiele komponentow (5-10 krokow)                      |
|  XL = bardzo zlozone, krytyczne  (10+ krokow)                       |
|                                                                      |
|  SWEET SPOT PODZADAN: 8-20                                           |
|                                                                      |
|  TYPOWY BUDZET TOKENOWY:                                             |
|  Input:   1,500-2,500 tokenow                                       |
|  Output:  500-1,000 tokenow                                         |
|  Koszt:   $0.01-0.05 (Sonnet)                                       |
|  Czas:    15-25 sekund                                               |
|  Wywolan: 1 (jednorazowe)                                            |
|                                                                      |
|  ANTY-WZORCE:                                                        |
|  [!] Time Estimator        -- estymowanie czasu zamiast zlozonosci   |
|  [!] Monolith Decomposer   -- zbyt duze podzadania                  |
|  [!] Micro Decomposer      -- zbyt male podzadania (47 zadan)       |
|  [!] Scope Creep Analyst   -- wychodzenie poza dekompozycje          |
|  [!] Hidden Dependencies   -- nieoznaczone zaleznosci                |
|                                                                      |
|  KLUCZOWA ZASADA:                                                    |
|  "Analityk mowi CO robic (scope), Planer mowi KIEDY (harmonogram)." |
|  Nigdy nie mieszaj tych rol.                                         |
|                                                                      |
+======================================================================+
```

---

### Slowniczek kluczowych terminow

| Termin | Definicja |
|--------|-----------|
| **Dekompozycja** | Proces rozkladania zlozonego problemu na mniejsze, realizowalne podzadania |
| **Graf zaleznosci** | Wizualna mapa pokazujaca, ktore podzadania zaleza od wynikow innych podzadan |
| **Niezaleznosc** | Cecha podzadania, ktore moze byc realizowane rownolegle z innymi (brak zaleznosci) |
| **Zlozonosc S/M/L/XL** | Skala trudnosci podzadania -- niezalezna od modelu i czasu |
| **Narrow Context Principle** | Zasada, ze kazdy agent dostaje TYLKO informacje potrzebne do swojego zadania |
| **Potencjal paralelizacji** | Procent podzadan, ktore moga byc wykonywane rownolegle |
| **Plan-and-Execute** | Wzorzec architektoniczny: Analityk -> Planer -> Builder -> QA, dajacy 83% oszczednosci |
| **MANIFEST.md** | Centralny dokument systemu (Single Source of Truth); Analityk go czyta, ale NIE pisze |
| **Scope Creep** | Anty-wzorzec: agent wychodzi poza zakres swojej roli |
| **Sweet spot** | Optymalna liczba podzadan: 8-20 dla typowego projektu |

---

*Zrodla: Gold Standard 2026, OBSERVATORY Architecture, OMEGA Team Analysis, ALPHA Team Analysis, Agent Teams Configurator v2-v9, Anthropic Plan-and-Execute Pattern 2026, Google Research 2025 (parallel reasoning benchmarks).*

---

## PROMPT DO PREZENTACJI WIDEO (AI Presenter)

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz 5-7 minutowa prezentacje wideo o roli **Analityka (A-02)** w systemach wieloagentowych AI. Prezentacja powinna byc prowadzona przez AI prezentera w profesjonalnym, ale przystepnym tonie -- jak TED Talk o architekturze oprogramowania.

**Struktura prezentacji:**

1. **Hook (0:00-0:30):** Zacznij od pytania: "Co sie stanie, jesli dasz 14 agentom AI zadanie... ale nie powiesz im, jak je podzielic?" Pokaz wizualizacje chaosu -- agenty ktore duplikuja prace, agenty ktore czekaja na siebie, agenty ktore gubia kontekst. Potem pokaz kontrast: ten sam system Z Analitykiem -- plynna, zorganizowana praca.

2. **Problem (0:30-1:30):** Wyjasnij, dlaczego dekompozycja jest najtrudniejszym krokiem intelektualnym. Uzyj analogii chirurga planujacego operacje: zanim skalpel dotknie skory, chirurg musi wiedziec dokladnie, co wycinac, w jakiej kolejnosci i co moze sie nie udac. Pokaz statystyke: bledna dekompozycja kosztuje 10-40x wiecej niz dobra -- bo bledy propaguja sie kaskadowo.

3. **Kim jest Analityk (1:30-2:30):** Przedstaw role: Poziom 1, warstwa PLANOWANIA, partner Planera, podlegly Orkiestratorowi. Uzyj diagramu hierarchii 5 warstw. Podkresl kluczowa roznice: "Analityk mowi CO robic, Planer mowi KIEDY." Pokaz cytat OMEGA: "Jesli Analityk sie pomyli -- nie bedzie czego budowac po drugiej stronie."

4. **5 Obowiazkow w akcji (2:30-4:00):** Pokaz animowany przyklad: zadanie "zbuduj dashboard e-commerce" zostaje rozlozone na 13 podzadan. Animacja pokazuje: (a) identyfikacje domen, (b) tworzenie podzadan, (c) rysowanie grafu zaleznosci, (d) estymacje zlozonosci S/M/L/XL, (e) obliczenie potencjalu paralelizacji (62%). Wizualizacja: graf zaleznosci "oswieca sie" kolorami -- zielone = niezalezne (rownolegla), czerwone = zalezne (sekwencja).

5. **5 Anty-wzorcow (4:00-5:00):** Szybki przeglad 5 najczestszych bledow. Dla kazdego: nazwa, jednozdaniowy opis, ikona wizualna (np. zegarek dla Time Estimator, lupa dla Scope Creep). Podkresl, ze Hidden Dependencies jest najkosztowniejszy -- koszt $3-8 za kazda ukryta zaleznosc.

6. **Quick Reference Card (5:00-5:30):** Pokaz pelna karte referencji w formie animowanej infografiki: model Sonnet, narzedzia Read+Write, sweet spot 8-20 podzadan, koszt $0.01-0.05.

7. **Zamkniecie (5:30-6:00):** "Analityk to najcichszy agent w systemie -- pracuje raz, na poczatku, przez 20 sekund. Ale te 20 sekund determinuje jakosc WSZYSTKIEGO, co nastapi potem. Dobry Analityk to roznica miedzy systemem, ktory dziala jak orkiestra... a systemem, ktory brzmi jak kakofonia."

**Styl wizualny:** Ciemne tlo z neonowymi akcentami (cyan, amber). Diagramy w stylu blueprint. Animacje plynne, minimalistyczne. Typografia: czysty sans-serif (Inter lub podobny).

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike edukacyjna o roli **Analityka (A-02)** w systemach wieloagentowych AI. Format: dluga, scrollowalna grafika w stylu premium magazine -- bialy lub ciemnogranatowy motyw z akcentami w kolorze cyan i amber.

**Struktura infografiki (od gory do dolu):**

1. **Naglowek:** Duzy tytul "ANALITYK (A-02)" z podtytulem "Specjalista Dekompozycji w Systemach Wieloagentowych AI". Logo/ikona: lupa nad schematem blokowym (symbolizujaca analize i rozklad na czesci).

2. **Sekcja "Kim jest?":** 3 ikony z podpisami: (1) Inzynier systemowy -- rozklada samolot na podsystemy, (2) Chirurg -- planuje etapy operacji, (3) Szef kuchni -- rozklada degustacje na dania. Centralny cytat w ramce: "Jesli Analityk sie pomyli -- nie bedzie czego budowac po drugiej stronie."

3. **Sekcja "5 Obowiazkow":** Poziomy flowchart z 5 krokami: (1) Dekompozycja -> (2) Mapping zaleznosci -> (3) Estymacja S/M/L/XL -> (4) Kategoryzacja RESEARCH/BUILD/QA -> (5) Strukturalny output Markdown. Kazdy krok z mala ikona i jednozdaniowym opisem.

4. **Sekcja "Graf Zaleznosci":** Wizualizacja przykladu -- 13 podzadan polaczonych strzalkami. Niezalezne podzadania podswietlone na zielono z etykieta "PARALLEL", zalezne na czerwono z etykieta "SEQUENTIAL". Duza liczba "62%" w centralnym kolku z napisem "Potencjal Paralelizacji".

5. **Sekcja "Analityk vs Planer":** Dwukolumnowa tabela porownawcza z ikonami. Lewa kolumna (Analityk): "CO robic?", lista podzadan, zlozonosc. Prawa kolumna (Planer): "KIEDY robic?", harmonogram, bramy. Na dole: podpis "Laczyc w malych zespolach (<7 agentow). Rozdzielac w Gold Standard."

6. **Sekcja "Quick Stats":** Cztery kolowe mini-wykresy: (a) Model: Sonnet $3/$15, (b) Narzedzia: Read + Write, (c) Czas sesji: 15-25s, (d) Koszt: $0.01-0.05. Kazdy z mala ikona i etykieta.

7. **Sekcja "5 Anty-wzorcow":** Pionowa lista z czerwonymi ikonami ostrzezenia: (1) Time Estimator -- estymowanie czasu, (2) Monolith Decomposer -- za duze podzadania, (3) Micro Decomposer -- za male podzadania, (4) Scope Creep -- wychodzenie poza role, (5) Hidden Dependencies -- najkosztowniejszy. Dla kazdego: ikona + nazwa + jednozdaniowy opis.

8. **Sekcja "Kluczowa Statystyka":** Duza, centralna liczba "83%" z podpisem "oszczednosci kosztowych dzieki wzorcowi Plan-and-Execute (Analityk -> Planer -> Builder -> QA vs ad-hoc)".

9. **Stopka:** Logo serii "Gold Standard 2026 | Architektura Agentow AI" + QR code (opcjonalnie) do pelnego przewodnika.

**Styl graficzny:** Czyste linie, duzo bialej przestrzeni (lub ciemnego tla), ikony liniowe (outline style), paleta: granatowy (#1a1a2e) + cyan (#00d4ff) + amber (#ffa500) + bialy. Typografia: bold sans-serif dla nagłowków, regular dla tresci. Bez efektow 3D -- plaska, nowoczesna estetyka w stylu Stripe/Linear.
