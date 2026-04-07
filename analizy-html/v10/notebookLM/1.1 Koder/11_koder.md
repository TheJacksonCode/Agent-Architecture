# KODER (B-01) — Pierwszy Agent Warstwy BUILD

## Kompletny Przewodnik Edukacyjny | Gold Standard 2026

---

# 1. WPROWADZENIE — Gdzie Teoria Zamienia Sie w Rzeczywistosc

## Kim jest Koder?

Koder (B-01) to **pierwszy agent warstwy BUILD** w architekturze Gold Standard 2026.
Jest to agent, w ktorym caly wysilek badawczy, analityczny i planistyczny
**materializuje sie w dzialajacy kod**. Wszystko, co robily poprzednie warstwy
— RESEARCH i ANALYSIS — konwerguje tutaj, w rekach Kodera.

### Trzy Analogie do Zrozumienia Roli Kodera

**Analogia 1: Mistrz Stolarz**

Wyobraz sobie warsztac stolarski. Architekt dostarczyl rysunek techniczny krzesla
— kazdy kat, kazdy wymiar, kazdy material jest precyzyjnie okreslony. Mistrz stolarz
nie kwestionuje projektu. Nie mowi: "A moze zrobmy stol zamiast krzesla?" On bierze
rysunek, wybiera narzedzia i zamienia papierowy plan w fizyczny mebel. Koder dziala
identycznie — otrzymuje specyfikacje i zamienia je w dzialajacy kod. Projekt to nie
jego domena; wykonanie — tak.

**Analogia 2: Muzyk Sesyjny**

Muzyk sesyjny w studiu nagraniowym dostaje nuty i gra dokladnie to, co jest zapisane.
Nie komponuje wlasnych melodii, nie zmienia tonacji, nie improwizuje jazzowych
wariacjii. Jego wartosc polega na **perfekcyjnym wykonaniu** tego, co zostalo
skomponowane przez kogos innego. Koder jest muzykiem sesyjnym kodu — specyfikacja
to jego partytura, a dzialajacy program to jego nagranie.

**Analogia 3: Rezydent Chirurgiczny**

W sali operacyjnej rezydent chirurgiczny wykonuje procedure zaplanowana przez
starszego chirurga. Plan operacji juz istnieje — diagnoza postawiona, metoda
wybrana, ryzyka oszacowane. Rezydent realizuje plan z chirurgiczna precyzja.
Nie zmienia strategii w trakcie operacji. Nie decyduje, ze zamiast operacji kolana
zrobi operacje biodra. Koder jest takim rezydentem — realizuje plan techniczny
z precyzja, ale sam go nie tworzy.

> **Kluczowa zasada:** Koder to agent, w ktorym **plany przestaja byc planami**
> i zaczynaja byc **dzialajacym oprogramowaniem**. Przed Koderem istnieja tylko
> dokumenty. Po Koderze istnieje kod, ktory mozna uruchomic.

---

> **Czy wiesz, ze...?**
> Koder ma najwyzsze obciazenie (Load: 80/100) w calym systemie Gold Standard.
> To wiecej niz Orkiestrator (75/100), wiecej niz jakikolwiek Researcher.
> Dlaczego? Bo generowanie kodu jest najbardziej zasobozerna operacja w calym
> pipeline'ie — wymaga precyzji na poziomie kazdego znaku.

---

# 2. KLUCZOWE OBOWIAZKI

Koder odpowiada za **piec podstawowych obszarow**:

## 2.1 Implementacja Kodu (Code Implementation)

To glowne zadanie Kodera. Otrzymuje specyfikacje (od Planera lub Orkiestratora)
i tworzy dzialajacy kod. Obejmuje to:

- Pisanie nowych plikow od zera (HTML, CSS, JavaScript, Python, itp.)
- Implementacja logiki biznesowej zgodnie ze specyfikacja
- Tworzenie struktur danych i algorytmow
- Budowanie komponentow UI wedlug projektu

## 2.2 Zarzadzanie Plikami (File Management)

Koder nie tylko pisze kod — zarzadza rowniez struktura plikow:

- Tworzenie nowych plikow we wlasciwych lokalizacjach
- Modyfikacja istniejacych plikow (edycja, refaktoryzacja)
- Organizacja kodu w logiczna strukture katalogow
- Zachowanie spojnosci nazewnictwa plikow

## 2.3 Uruchamianie i Testowanie (Execution & Testing)

Koder **musi** uruchomic kod, ktory napisal:

- Uruchamianie skryptow przez Bash
- Weryfikacja, ze kod nie generuje bledow
- Sprawdzanie podstawowej funkcjonalnosci
- Testowanie edge cases wynikajacych ze specyfikacji

```bash
# Przyklad: Koder uruchamia napisany skrypt
node app.js          # uruchomienie serwera
python test.py       # uruchomienie testow
npm run build        # kompilacja projektu
```

## 2.4 Petla Zwrotna z QA (QA Feedback Loop)

Po dostarczeniu kodu, QA (Quality Assurance) moze zglosic uwagi.
Koder ma **maksymalnie 2 iteracje** na poprawki:

```
Iteracja 1: Koder dostarcza kod → QA zglosza 3 bledy → Koder poprawia
Iteracja 2: Koder dostarcza poprawki → QA zglosza 1 bład → Koder poprawia
Koniec: Jesli po 2 iteracjach sa bledy → eskalacja do Orkiestratora
```

## 2.5 Dokumentacja Inline (Inline Documentation)

Koder dodaje komentarze do kodu — nie dokumentacje zewnetrzna, ale:

- Komentarze wyjasniajace zlozona logike
- JSDoc/docstring dla funkcji publicznych
- TODO/FIXME oznaczenia dla znanych ograniczen
- Informacje o parametrach i typach zwracanych

---

> **Uwaga!**
> Koder NIE pisze dokumentacji uzytkownika, plikow README ani specyfikacji.
> Jego dokumentacja to wylacznie **komentarze w kodzie** (inline documentation).
> Dokumentacja zewnetrzna to domena Redaktora (B-03).

---

# 3. CZEGO KODER NIE ROBI

Rownie wazne jak obowiazki Kodera sa jego **ograniczenia**. Koder ma waski,
precyzyjnie zdefiniowany zakres dzialan:

| Zakazane Dzialanie            | Dlaczego?                                      | Kto to robi?           |
|-------------------------------|------------------------------------------------|------------------------|
| Research / Wyszukiwanie       | Koder nie szuka informacji w internecie         | Researcherzy (R-01..R-06) |
| Decyzje architektoniczne      | Koder nie wybiera technologii ani wzorcow       | Planer (A-02)          |
| Projektowanie UI/UX           | Koder nie tworzy designu — implementuje gotowy  | Designer (B-02)        |
| Pisanie tresci                | Koder nie redaguje tekstow ani copywritingu     | Redaktor (B-03)        |
| Integracja komponentow        | Koder nie laczy pracy roznych agentow           | Integrator (B-04)      |
| Testy bezpieczenstwa          | Koder nie robi pentestow ani audytow security   | QA / Orkiestrator      |

### Prompt Systemowy Kodera

```
Jestes Koderem. Implementujesz specyfikacje w dzialajacy kod.
Narzedzia: Write (nowe pliki), Edit (modyfikacje), Bash (uruchamianie).
NIGDY nie rob researchu — implementuj na podstawie specyfikacji.
NIGDY nie podejmuj decyzji architektonicznych.
Output: dzialajacy, przetestowany kod.
```

> **Czy wiesz, ze...?**
> Prompt systemowy Kodera to zaledwie 5 linii. Jest celowo krotki,
> bo Koder musi dzialac szybko i bez wattpliwosci. Im prostszy prompt,
> tym mniej "kreatywnych interpretacji" model sobie pozwoli.

---

# 4. MODEL I KOSZT

## Dlaczego Claude Sonnet?

Koder uzywa modelu **Claude Sonnet** — srodkowego modelu w rodzinie Claude.

| Cecha                | Haiku ($0.25/$1.25) | **Sonnet ($3/$15)** | Opus ($15/$75)  |
|----------------------|---------------------|---------------------|-----------------|
| Jakosc kodu          | Srednia (wiecej bugow) | **Wysoka**       | Najwyzsza       |
| Szybkosc             | Najszybszy          | **Szybki**          | Wolny           |
| Koszt za zadanie     | $0.01-0.05          | **$0.15-0.50**      | $1.00-3.00      |
| Zrozumienie specyfikacji | Ograniczone     | **Dobre**           | Najlepsze       |

### Dlaczego NIE Haiku?

Haiku generuje kod z **wiekszą liczba bledow**. Przy Load 80/100, Koder przetwarza
ogromne ilosci tokenow. Kazdy blad oznacza dodatkowa iteracje QA, co:
- Wydluza czas realizacji
- Zwieksza koszt (dodatkowe wywolania API)
- Obciaza pipeline kolejnymi cyklami

**Oszczednosc na modelu = strata na jakosci = wyzszy koszt calosciowy.**

### Dlaczego NIE Opus?

Opus jest 5x drozszy od Sonneta. Przy Load 80/100, Koder jest wywoływany
najczesciej ze wszystkich agentow. Uzywanie Opusa tutaj **wysadzalyby budzet**:

```
Sonnet: 100 zadan × $0.30 = $30
Opus:   100 zadan × $2.00 = $200
Roznica: $170 przy minimalnej poprawie jakosci kodu
```

### Budzety Tokenow

| Parametr         | Wartosc                |
|------------------|------------------------|
| Input tokens     | 20,000 - 40,000       |
| Output tokens    | 10,000 - 30,000       |
| Koszt za zadanie | $0.15 - $0.50         |
| Czas wykonania   | 30 - 90 sekund        |

> **Czy wiesz, ze...?**
> Koder generuje najwiecej tokenow wyjsciowych (output) ze wszystkich agentow
> w systemie. To logiczne — pisze kod, ktory jest z natury dluzszy niz
> analizy tekstowe. Pojedynczy plik HTML moze miec 500+ linii.

---

# 5. NARZEDZIA KODERA

## 5.1 Narzedzia Dozwolone

### Write — Tworzenie Nowych Plikow

```
Write(file_path, content)
```

Koder uzywa Write do tworzenia plikow od zera. Kazdy nowy plik w projekcie
przechodzi przez to narzedzie — HTML, CSS, JS, Python, konfiguracje.

**Kiedy uzywac:** Gdy plik jeszcze nie istnieje i trzeba go stworzyc.

### Edit — Modyfikacja Istniejacych Plikow

```
Edit(file_path, old_string, new_string)
```

Edit sluzy do precyzyjnych zmian w istniejacych plikach. Zamiast nadpisywac
caly plik, Koder wskazuje dokladnie, co zamienic.

**Kiedy uzywac:** Poprawki, refaktoryzacja, dodawanie nowych funkcji do istniejacego kodu.

### Bash — Uruchamianie Komend

```
Bash(command)
```

Bash pozwala Koderowi uruchamiac kod, instalowac pakiety, kompilowac,
testowac. To narzedzie zamyka petle "napisz → uruchom → zweryfikuj".

**Kiedy uzywac:** Testowanie kodu, instalacja zaleznosci, kompilacja, uruchomienie skryptow.

### Read — Odczyt Plikow

```
Read(file_path)
```

Koder czyta istniejace pliki, zeby zrozumiec kontekst. Moze odczytac
specyfikacje, istniejacy kod, konfiguracje.

**Kiedy uzywac:** Przed edycja pliku, do zrozumienia kontekstu, czytanie specyfikacji.

### Grep — Wyszukiwanie w Plikach

```
Grep(pattern, path)
```

Grep wyszukuje wzorce w plikach — nazwy funkcji, zmienne, importy.
Przydatne przy pracy z duzymi projektami.

**Kiedy uzywac:** Szukanie referencji, sprawdzanie gdzie uzywana jest funkcja.

### Glob — Wyszukiwanie Plikow

```
Glob(pattern)
```

Glob znajduje pliki pasujace do wzorca (np. "**/*.js" — wszystkie pliki JS).

**Kiedy uzywac:** Odkrywanie struktury projektu, znajdowanie plikow do edycji.

## 5.2 Narzedzia ZAKAZANE

| Narzedzie   | Powod Zakazu                                                  |
|-------------|---------------------------------------------------------------|
| Agent       | Koder nie deleguje — sam wykonuje. Nie tworzy sub-agentow.    |
| WebSearch   | Koder nie szuka informacji online. Ma specyfikacje.           |
| WebFetch    | Koder nie pobiera zasobow z internetu. Nie robi researchu.    |

> **Uwaga!**
> Gdyby Koder mial dostep do WebSearch, moglby "odplynac" w research
> zamiast implementowac. Zakaz jest celowy — wymusza dyscypline
> i trzymanie sie specyfikacji. Koder NIE podejmuje decyzji
> o brakujacych informacjach — eskaluje do Orkiestratora.

---

# 6. WORKFLOW — 10 Krokow Pracy Kodera

Ponizej pelny workflow Kodera od momentu otrzymania zadania do dostarczenia kodu:

```
KROK 1: Odbior Specyfikacji
    │
    ▼
KROK 2: Odczyt MANIFEST.md
    │
    ▼
KROK 3: Planowanie Implementacji
    │
    ▼
KROK 4: Pisanie Kodu
    │
    ▼
KROK 5: Uruchomienie i Testowanie
    │
    ▼
KROK 6: Naprawa Bledow
    │
    ▼
KROK 7: Formatowanie i Czyszczenie
    │
    ▼
KROK 8: Dostarczenie Kodu
    │
    ▼
KROK 9: Feedback od QA
    │
    ▼
KROK 10: Iteracja (max 2 razy)
```

### Krok 1: Odbior Specyfikacji

Koder otrzymuje specyfikacje od Planera (A-02) lub Orkiestratora. Specyfikacja zawiera:
- Co ma byc zbudowane (zakres)
- Jakie technologie uzyc (stos technologiczny)
- Jakie wymagania spelnic (kryteria akceptacji)
- Jakie ograniczenia obowiazuja (np. rozmiar pliku, kompatybilnosc)

### Krok 2: Odczyt MANIFEST.md

Koder czyta plik MANIFEST.md (jesli istnieje), ktory opisuje aktualna strukture
projektu — jakie pliki juz istnieja, jakie konwencje obowiazuja.

### Krok 3: Planowanie Implementacji

Koder planuje **kolejnosc pisania kodu** — nie architekture (ta jest dana),
ale sekwencje pracy:
- Ktore pliki stworzyc najpierw?
- Ktore fragmenty kodu sa zaleznosciami dla innych?
- Jak podzielic prace na logiczne kroki?

### Krok 4: Pisanie Kodu

Koder pisze kod uzywajac Write (nowe pliki) i Edit (modyfikacje):

```javascript
// Przyklad: Koder tworzy komponent UI wedlug specyfikacji
function createCard(data) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        <span class="badge">${data.category}</span>
    `;
    return card;
}
```

### Krok 5: Uruchomienie i Testowanie

Koder uruchamia kod przez Bash i sprawdza, czy dziala:

```bash
# Uruchomienie testow
npm test

# Sprawdzenie, czy serwer startuje
node server.js &
curl http://localhost:3000/health
```

### Krok 6: Naprawa Bledow

Jesli testy wykryja bledy, Koder naprawia je natychmiast (przed dostarczeniem).

### Krok 7: Formatowanie i Czyszczenie

Koder formatuje kod, usuwa komentarze debugowe, uporzadkowuje importy.

### Krok 8: Dostarczenie Kodu

Koder dostarcza gotowy kod — pliki sa zapisane, przetestowane, sformatowane.

### Krok 9: Feedback od QA

QA sprawdza kod i zglosza ewentualne problemy.

### Krok 10: Iteracja

Koder ma **maksymalnie 2 iteracje** na poprawki. Jesli po 2 iteracjach
kod nadal nie spelnia wymagan — eskalacja do Orkiestratora.

> **Czy wiesz, ze...?**
> Koder spedza srednio 30-90 sekund na zadaniu. To oznacza, ze w ciagu
> 10 minut moze wykonac 6-20 zadan implementacyjnych. Przy calym
> pipeline Gold Standard, Koder jest "waskim gardlem" — inne agenty
> czekaja na jego output.

---

# 7. KODER W ROZNYCH KONFIGURACJACH

Rola Kodera zmienia sie w zaleznosci od konfiguracji systemu:

## 7.1 MVP (Minimal Viable Pipeline)

```
Orkiestrator → Planer → KODER → QA
```

W MVP Koder jest **jedynym Builderem**. Robi wszystko: kod, style, strukture.
Nie ma Designera, Redaktora ani Integratora. Koder = caly BUILD layer.

**Wyzwanie:** Koder musi pisac zarowno logike, jak i CSS, co obniza jakosc obu.

## 7.2 Standard (Koder + Designer)

```
Orkiestrator → Planer → KODER + Designer → QA
```

Koder pisze logike i strukture, Designer zajmuje sie CSS i wizualna warstwa.
Podzial obowiazkow znacznie poprawia jakosc.

## 7.3 Gold Standard (4 Builderow)

```
Orkiestrator → Planer → KODER + Designer + Redaktor + Integrator → QA
```

Koder pisze **wylacznie logike i strukture**. Kazdy aspekt ma dedykowanego agenta.
To konfiguracja, w ktorej Koder pracuje najefektywniej.

## 7.4 OBSERVATORY — Sekwencyjny Pipeline

W konfiguracji OBSERVATORY (Single-Threaded Sequential) agenci BUILD dzialaja
**jeden po drugim**:

```
KODER → Redaktor → Designer → Integrator
```

Koder jest **pierwszy** — jego output staje sie inputem dla kolejnych agentow.
To oznacza, ze bledy Kodera propaguja sie do calego lancucha.

> **Uwaga!**
> W konfiguracji OBSERVATORY kolejnosc jest krytyczna. Jesli Koder
> dostarczy wadliwy HTML, Designer nie bedzie mogl poprawnie ostylowac
> komponentow, Redaktor nie bedzie wiedzial gdzie wstawic tresci,
> a Integrator bedzie musal naprawiac bledy zamiast laczyc moduly.

---

# 8. KODER VS INNE BUILDERZY

| Aspekt              | Koder (B-01)       | Designer (B-02)    | Redaktor (B-03)     | Integrator (B-04)  |
|---------------------|--------------------|--------------------|---------------------|--------------------|
| **Glowna rola**     | Logika i kod       | Styl i wizualia    | Tresc i tekst       | Laczenie czesci    |
| **Model**           | Sonnet ($3/$15)    | Sonnet ($3/$15)    | Haiku ($0.25/$1.25) | Sonnet ($3/$15)    |
| **Load**            | 80/100             | 65/100             | 45/100              | 70/100             |
| **Output**          | Dzialajacy kod     | CSS, animacje      | Teksty, copy        | Zintegrowany projekt |
| **Narzedzia Write** | Tak (glowne)       | Tak                | Tak                 | Tak                |
| **Narzedzia Bash**  | Tak (testowanie)   | Ograniczone        | Nie                 | Tak                |
| **Kolejnosc OBSERVATORY** | 1. (pierwszy) | 3. (trzeci)       | 2. (drugi)          | 4. (ostatni)      |
| **Iteracje QA**     | Max 2              | Max 2              | Max 2               | Max 2              |

### Co laczy wszystkich Builderow?

- Wszyscy otrzymuja specyfikacje (nie tworza ich sami)
- Wszyscy maja zakaz researchu (brak WebSearch/WebFetch)
- Wszyscy maja limit 2 iteracji QA
- Wszyscy uzywaja narzedzia Write

### Co rozni Kodera od reszty?

- **Najwyzszy Load** (80 vs 65-70 u innych)
- **Jedyny, ktory aktywnie uruchamia kod** (Bash do testowania)
- **Pierwszy w sekwencji OBSERVATORY** (jego bledy propaguja sie najdalej)
- **Generuje najwiecej tokenow wyjsciowych**

---

# 9. ANTY-WZORCE — Czego Unikac

## 9.1 Research Coder (Badacz-Koder)

```
ZLE: Koder otrzymuje specyfikacje, ale zamiast implementowac,
     zaczyna szukac "lepszych rozwiazan" — czyta artykuly,
     porownuje frameworki, analizuje benchmarki.

DOBRZE: Koder implementuje DOKLADNIE to, co jest w specyfikacji.
        Jesli specyfikacja mowi "uzyj vanilla JS" — uzywa vanilla JS.
```

**Dlaczego to problem?** Koder traci czas i tokeny na research, ktory
juz zostal wykonany przez Researcherow. Podwaja prace i moze dojsc
do sprzecznych wnioskow.

## 9.2 Architect Coder (Architekt-Koder)

```
ZLE: Koder zmienia architekture projektu — dodaje nowe warstwy,
     zmienia wzorce projektowe, refaktoryzuje strukture katalogow.

DOBRZE: Koder implementuje w ramach DANEJ architektury.
        Decyzje architektoniczne naleza do Planera.
```

**Dlaczego to problem?** Zmiany architektoniczne wplywaja na prace
innych Builderow. Designer moze stracic referencje CSS, Integrator
moze nie znalezc plikow w oczekiwanych lokalizacjach.

## 9.3 Perfectionist Loop (Petla Perfekcjonisty)

```
ZLE: Koder poprawia ten sam fragment kodu 5 razy, szukajac
     "idealnego rozwiazania" — refaktoryzuje, optymalizuje,
     zmienia nazwy zmiennych, przesuwa linie.

DOBRZE: Koder dostarcza dzialajacy kod po PIERWSZYM podejsciu.
        Optymalizacja to zadanie dla pozniejszych iteracji.
```

**Dlaczego to problem?** Kazda iteracja zuzywa tokeny (= pieniadze).
Perfekcjonizm przy Load 80/100 moze spowodowac timeout i blokade
calego pipeline'u.

## 9.4 Context Overload (Przeciazenie Kontekstem)

```
ZLE: Koder dostaje cala historie projektu — 200,000 tokenow
     kontekstu — i musi odnalezc, co jest istotne.

DOBRZE: Koder dostaje WYLACZNIE specyfikacje i ewentualnie
        relevantny fragment istniejacego kodu (20,000-40,000 tokenow).
```

**Dlaczego to problem?** Zbyt duzy kontekst obniza jakosc odpowiedzi
modelu. Sonnet dziala najlepiej przy skoncentrowanym, waskim kontekscie.

## 9.5 Untested Delivery (Dostarczenie Bez Testow)

```
ZLE: Koder pisze kod i dostarcza go BEZ uruchomienia.
     QA odkrywa bledy skladni, brakujace importy, crashe.

DOBRZE: Koder uruchamia kod przez Bash PRZED dostarczeniem.
        QA powinna znajdowac bledy logiczne, nie syntaktyczne.
```

**Dlaczego to problem?** Kazdy blad wykryty przez QA = dodatkowa iteracja.
Koder ma tylko 2 iteracje. Marnowanie ich na bledy skladniowe to strata.

---

> **Czy wiesz, ze...?**
> Najczestszym anty-wzorcem jest "Research Coder". Modele jezykowe
> naturalnie "chca" szukac informacji i analizowac. Dlatego prompt
> systemowy Kodera zawiera **dwukrotny NIGDY** — raz dla researchu,
> raz dla decyzji architektonicznych.

---

# 10. JAKOSC KODU — Standardy Kodera

Koder musi dostarczac kod spelniajacy okreslone standardy jakosci:

## 10.1 Bezpieczenstwo

- **Brak XSS** — Koder nie uzywa `innerHTML` z niezaufanymi danymi
  bez sanityzacji. Preferowane: `textContent`, szablony z escape'owaniem.
- **Brak SQL Injection** — parametryzowane zapytania, nigdy konkatenacja stringow.
- **Brak hardcoded secrets** — hasla, klucze API, tokeny nigdy w kodzie.

```javascript
// ZLE — podatne na XSS
element.innerHTML = userInput;

// DOBRZE — bezpieczne
element.textContent = userInput;

// LUB z sanityzacja
element.innerHTML = DOMPurify.sanitize(userInput);
```

## 10.2 Semantyczny HTML

```html
<!-- ZLE — div soup -->
<div class="header">
    <div class="nav">
        <div class="link">Start</div>
    </div>
</div>

<!-- DOBRZE — semantyczny HTML -->
<header>
    <nav>
        <a href="/">Start</a>
    </nav>
</header>
```

## 10.3 Responsywny CSS

Koder pisze CSS, ktory dziala na roznych rozmiarach ekranow:

```css
/* Mobile-first approach */
.container {
    width: 100%;
    padding: 1rem;
}

@media (min-width: 768px) {
    .container {
        max-width: 720px;
        margin: 0 auto;
    }
}

@media (min-width: 1024px) {
    .container {
        max-width: 960px;
    }
}
```

## 10.4 Dostepnosc (Accessibility)

- Atrybuty `alt` na obrazkach
- Atrybuty `aria-label` na interaktywnych elementach
- Kontrast kolorow zgodny z WCAG 2.1
- Nawigacja klawiatura (tabindex, focus states)

---

# 11. NAJLEPSZE PRAKTYKI — 8 Zasad

## Praktyka 1: Zacznij od Struktury

Najpierw napisz szkielet (HTML), potem logike (JS), na koncu style (CSS).
Nie pisz calego pliku liniowo od gory do dolu.

## Praktyka 2: Jedno Zadanie = Jeden Commit Logiczny

Koder powinien dostarczac kod jako logiczna calosc. Nie pol funkcji,
nie "work in progress". Kazde dostarczenie to dzialajacy fragment.

## Praktyka 3: Czytaj Specyfikacje DOSLOWNIE

Jesli specyfikacja mowi "przycisk z ikona strzalki w prawo", Koder
implementuje dokladnie przycisk z ikona strzalki w prawo. Nie interpretuje
"kreatywnie" i nie dodaje elementow, o ktore nie proszono.

## Praktyka 4: Testuj Przed Dostarczeniem

```bash
# Minimum: uruchom i sprawdz, czy nie ma bledow
node app.js 2>&1 | head -20
echo $?  # 0 = sukces
```

## Praktyka 5: Uzywaj Edit Zamiast Write Dla Istniejacych Plikow

Write nadpisuje caly plik. Edit zmienia tylko wskazany fragment.
Przy duzych plikach Edit jest bezpieczniejszy — nie ryzykujesz
utrata kodu, ktory juz dzialal.

## Praktyka 6: Minimalizuj Output Tokenow

Nie generuj niepotrzebnych komentarzy, nie powtarzaj specyfikacji w kodzie,
nie pisz dlugich blokow debug-logowania. Kazdy token kosztuje.

## Praktyka 7: Respektuj Konwencje Projektu

Jesli projekt uzywa camelCase — uzyj camelCase. Jesli uzywa snake_case —
uzyj snake_case. Koder nie narzuca wlasnych preferencji formatowania.

## Praktyka 8: Eskaluj Niejasnosci

Jesli specyfikacja jest niejasna lub sprzeczna — nie zgaduj.
Eskaluj do Orkiestratora z konkretnym pytaniem:

```
"Specyfikacja mowi 'lista uzytkownikow', ale nie precyzuje:
sortowanie po nazwie czy po dacie? Prosze o doprecyzowanie."
```

---

# 12. PODSUMOWANIE

## Koder w Jednym Zdaniu

Koder (B-01) to **wykonawca specyfikacji** — zamienia plany w dzialajacy kod,
uzywajac Write, Edit i Bash, bez podejmowania decyzji architektonicznych
i bez prowadzenia wlasnego researchu.

## Dlaczego Koder Jest Kluczowy?

- **Jedyny agent tworzacy cos uruchamialnego** — reszta tworzy dokumenty
- **Najwyzszy Load w systemie** — 80/100 (najbardziej obciazony)
- **Pierwszy w sekwencji BUILD** — jego jakosc determinuje prace reszty
- **Most miedzy teoria a praktyka** — plany → kod

---

```
+================================================================+
|                                                                |
|              QUICK REFERENCE CARD — KODER (B-01)               |
|                                                                |
+================================================================+
|                                                                |
|  ROLA:     Implementacja specyfikacji w dzialajacy kod         |
|  WARSTWA:  BUILD / IMPLEMENTACJA (Level 3)                     |
|  MODEL:    Claude Sonnet ($3 input / $15 output per 1M)        |
|  LOAD:     80/100 (NAJWYZSZY w systemie)                       |
|                                                                |
+----------------------------------------------------------------+
|                                                                |
|  NARZEDZIA DOZWOLONE:                                          |
|    Write ... tworzenie nowych plikow                           |
|    Edit .... modyfikacja istniejacych plikow                   |
|    Bash .... uruchamianie i testowanie kodu                    |
|    Read .... odczyt plikow i specyfikacji                      |
|    Grep .... wyszukiwanie wzorcow w kodzie                     |
|    Glob .... wyszukiwanie plikow po nazwie                     |
|                                                                |
|  NARZEDZIA ZAKAZANE:                                           |
|    Agent ........ brak delegowania                             |
|    WebSearch .... brak researchu online                        |
|    WebFetch ..... brak pobierania z internetu                  |
|                                                                |
+----------------------------------------------------------------+
|                                                                |
|  TOKENY:   Input: 20K-40K | Output: 10K-30K                   |
|  KOSZT:    $0.15-$0.50 za zadanie                              |
|  CZAS:     30-90 sekund                                        |
|  ITERACJE: Max 2 cykle QA feedback                             |
|                                                                |
+----------------------------------------------------------------+
|                                                                |
|  WORKFLOW:                                                     |
|    Spec → MANIFEST → Plan → Write → Test → Fix → Deliver      |
|                                                                |
|  ANTY-WZORCE:                                                  |
|    1. Research Coder      4. Context Overload                  |
|    2. Architect Coder     5. Untested Delivery                 |
|    3. Perfectionist Loop                                       |
|                                                                |
|  KONFIGURACJE:                                                 |
|    MVP ........... jedyny Builder                               |
|    Standard ...... Koder + Designer                            |
|    Gold Standard . Koder + Designer + Redaktor + Integrator    |
|    OBSERVATORY ... sekwencyjny (1. w kolejce)                  |
|                                                                |
+================================================================+
```

---

## SLOWNIK (GLOSSARY)

| Termin                 | Definicja                                                                 |
|------------------------|---------------------------------------------------------------------------|
| **BUILD Layer**        | Trzecia warstwa systemu — agenci implementujacy (Koder, Designer, Redaktor, Integrator) |
| **Load**               | Miara obciazenia agenta w skali 0-100. Koder ma 80/100.                  |
| **MANIFEST.md**        | Plik opisujacy aktualna strukture projektu — co istnieje, gdzie, jakie konwencje |
| **QA Feedback Loop**   | Cykl zwrotny: Koder dostarcza kod → QA sprawdza → Koder poprawia        |
| **Iteracja**           | Jeden cykl dostarczenia i poprawki. Koder ma max 2 iteracje.             |
| **OBSERVATORY**        | Konfiguracja sekwencyjna: agenci BUILD dzialaja jeden po drugim          |
| **Gold Standard**      | Pelna konfiguracja z wszystkimi warstwami i agentami                     |
| **MVP Pipeline**       | Minimalna konfiguracja — Orkiestrator, Planer, Koder, QA                 |
| **Token Budget**       | Limit tokenow (wejsciowych/wyjsciowych) przydzielony agentowi           |
| **Inline Documentation** | Komentarze w kodzie (nie dokumentacja zewnetrzna)                      |
| **Narrow Context**     | Waski kontekst — Koder dostaje TYLKO specyfikacje, nie caly projekt      |
| **Eskalacja**          | Przekazanie problemu do Orkiestratora gdy Koder nie moze go rozwiazac    |
| **Sanityzacja**        | Oczyszczanie danych wejsciowych z potencjalnie niebezpiecznych tresci    |
| **Edge Case**          | Graniczny przypadek uzycia — nietypowy scenariusz wymagajacy obslugi     |
| **Anty-wzorzec**       | Wzorzec postepowania, ktory wydaje sie poprawny, ale prowadzi do problemow |

---

## ZRODLA

1. Gold Standard 2026 — Architektura Multi-Agent AI (dokumentacja wewnetrzna)
2. Anthropic Claude Model Cards — specyfikacje Haiku, Sonnet, Opus
3. Agent Architecture Designer — konfiguracje pipeline'ow
4. OBSERVATORY Configuration — specyfikacja sekwencyjna BUILD layer
5. QA Feedback Protocol — zasady iteracji i eskalacji

---

# PROMPT DO PREZENTACJI WIDEO

```
Stworz prezentacje wideo (16:9, 8-12 minut) o agencie Koder (B-01)
z architektury Gold Standard 2026 multi-agent AI.

HOOK OTWIERAJACY (pierwsze 10 sekund):
"Plans don't ship. Code ships."
Pokazac ekran terminala z migajacym kursorem, nastepnie szybki montaz
kodu pojawiajacego sie linia po linii. Przejscie do tytulu.

MOTYW WIZUALNY:
- Ciemny motyw (tlo: #0D1117, prawie czarny)
- Terminalowa zielen jako kolor glowny (#00FF41)
- Drugoplanowy kolor: #58A6FF (jasny niebieski)
- Font kodu: JetBrains Mono lub Fira Code
- Efekt terminala: migajacy kursor, typewriter effect na fragmentach kodu
- Animacje: kod pojawia sie linia po linii, jak w edytorze

STRUKTURA SLAJDOW:

1. INTRO (0:00-0:30)
   - Hook: "Plans don't ship. Code ships."
   - Animacja: sterta dokumentow (specyfikacje) → transformacja → dzialajacy
     program na ekranie. Pokazac kontrast: papier vs ekran z kodem.
   - Tekst: "Koder (B-01) — Gdzie teoria staje sie kodem"

2. POZYCJA W SYSTEMIE (0:30-1:30)
   - Diagram warstw: RESEARCH → ANALYSIS → BUILD (podswietlone) → QA
   - Zoom na warstwe BUILD: Koder (pierwszy, podswietlony) → Designer →
     Redaktor → Integrator
   - Animacja: strzalki z kazdej warstwy schodzace sie do Kodera
   - Statystyka: "Load: 80/100 — najwyzszy w calym systemie"

3. TRZY ANALOGIE (1:30-3:00)
   - Split screen: po lewej analogia, po prawej rownowaznik w kodowaniu
   - Stolarz: rysunek techniczny → mebel | specyfikacja → kod
   - Muzyk sesyjny: nuty → nagranie | spec → program
   - Rezydent chirurgiczny: plan operacji → wykonanie | architektura → implementacja

4. NARZEDZIA (3:00-4:30)
   - Animacja: 6 narzedzi jako ikony na pasku narzedzi terminala
   - Write (ikona: nowy plik), Edit (ikona: olowek), Bash (ikona: terminal)
   - Read (ikona: oko), Grep (ikona: lupa), Glob (ikona: folder z gwiazdka)
   - Czerwony X na: Agent, WebSearch, WebFetch — z krotkim wyjasnieniem

5. WORKFLOW (4:30-6:00)
   - Animacja flowchart: 10 krokow pojawia sie sekwencyjnie
   - Kazdy krok z ikona i 3-sekundowym opisem
   - Podswietlenie kroku 5 (Test) i kroku 10 (Iteracja) jako krytycznych

6. KONFIGURACJE (6:00-7:30)
   - 4 diagramy obok siebie: MVP, Standard, Gold Standard, OBSERVATORY
   - Animacja: w kazdym diagramie Koder jest podswietlony na zielono (#00FF41)
   - Porownanie: "W MVP robi wszystko. W Gold Standard robi jedno — ale perfekcyjnie."

7. ANTY-WZORCE (7:30-9:00)
   - 5 anty-wzorcow jako czerwone "warning cards"
   - Kazdy z krotkim przykladem ZLE vs DOBRZE
   - Animacja: przekreslony zly wzorzec → zamiana na poprawny

8. JAKOSC KODU (9:00-10:00)
   - Przyklady kodu: ZLE (innerHTML + XSS) vs DOBRZE (textContent)
   - ZLE (div soup) vs DOBRZE (semantyczny HTML)
   - Szybki checklist jakosci z ptaszkami

9. PODSUMOWANIE (10:00-10:30)
   - Quick Reference Card (ASCII box) wyswietlony na ekranie terminala
   - Kluczowe liczby: Sonnet, $0.15-$0.50, 80/100, 30-90s, max 2 iteracje

10. OUTRO (10:30-11:00)
    - "Koder: jedyny agent, ktory tworzy cos, co mozna uruchomic."
    - Animacja: terminal z kodem → przycisk "Run" → dzialajaca aplikacja
    - CTA: "Poznaj kolejnego Buildera — Designera (B-02)"

MUZYKA: Ambient electronic, lo-fi coding beats, subtelne dzwieki
klawiatury w tle. Cisza w momentach hookow.

NARRATOR: Spokojny, kompetentny glos. Tempo umiarkowane.
Pauzy przed kluczowymi statystykami.
```

---

# PROMPT DO INFOGRAFIKI

```
Stworz pionowa infografike (1080x3200px) o agencie Koder (B-01)
z architektury Gold Standard 2026 multi-agent AI.

STYL WIZUALNY:
- Ciemne tlo: #0D1117 (prawie czarny, jak GitHub Dark)
- Kolor glowny: #00FF41 (terminalowa zielen)
- Kolor akcentowy: #58A6FF (jasny niebieski)
- Kolor ostrzezenia: #FF6B6B (czerwony na anty-wzorce)
- Tekst: bialy (#E6EDF3) i szary (#8B949E)
- Font tytulowy: bold, wielkimi literami
- Font kodu: monospace (Fira Code / JetBrains Mono)
- Styl: hacker/terminal aesthetic z subtelnymi glow effects

UKLAD (od gory do dolu):

SEKCJA 1: NAGLOWEK (200px)
- Tytul: "KODER (B-01)" w duzym foncie z zielonym glow
- Podtytul: "Pierwszy Agent Warstwy BUILD"
- Badge: "LOAD: 80/100" w zielonym obramowaniu
- Badge: "SONNET $3/$15" w niebieskim obramowaniu
- Ikona: terminal z migajacym kursorem

SEKCJA 2: TRANSFORMACJA SPEC → KOD (400px)
- Lewa strona: ikona dokumentu "SPECYFIKACJA" z przykladowymi liniami tekstu
- Srodek: duza strzalka z napisem "KODER" i ikona zebow
- Prawa strona: ikona pliku kodu "DZIALAJACY KOD" z kolorowymi liniami
- Pod strzalka: "30-90 sekund | 20K-40K tokenow input | 10K-30K output"
- Efekt: strzalka swieci na zielono, sugerujac transformacje

SEKCJA 3: ARSENAL NARZEDZI (500px)
- 6 narzedzi dozwolonych jako karty z ikonami i opisem:
  * Write — "Nowe pliki" (ikona: dokument z plusem)
  * Edit — "Modyfikacje" (ikona: olowek)
  * Bash — "Uruchomienie" (ikona: terminal >_)
  * Read — "Odczyt" (ikona: oko)
  * Grep — "Wyszukiwanie" (ikona: lupa)
  * Glob — "Pliki" (ikona: folder)
- 3 narzedzia zakazane przekreslone na czerwono:
  * Agent — "Brak delegowania"
  * WebSearch — "Brak researchu"
  * WebFetch — "Brak pobierania"

SEKCJA 4: WORKFLOW 10 KROKOW (600px)
- Pionowy flowchart z 10 krokami
- Kazdy krok jako prostokatny blok z numerem i nazwa
- Polaczone strzalkami
- Krok 5 (Test) i Krok 10 (Iteracja) podswietlone na zielono
- Mala petla zwrotna miedzy krokiem 9 a 10 (QA feedback)
- Adnotacja: "Max 2 iteracje" przy petli

SEKCJA 5: POROWNANIE BUILDEROW (500px)
- Tabela 4 kolumny: Koder | Designer | Redaktor | Integrator
- Wiersze: Rola, Model, Load, Output, Kolejnosc OBSERVATORY
- Kolumna Kodera podswietlona na zielono
- Wizualizacja Load jako paski (80/65/45/70)

SEKCJA 6: 4 KONFIGURACJE (400px)
- 4 mini-diagramy obok siebie:
  * MVP: Koder podswietlony (jedyny Builder)
  * Standard: Koder + Designer
  * Gold Standard: 4 Builderow
  * OBSERVATORY: sekwencja ze strzalkami
- Koder zawsze podswietlony na zielono

SEKCJA 7: ANTY-WZORCE (500px)
- 5 kart ostrzezeniowych z czerwonym akcentem:
  1. Research Coder — ikona: lupa z X
  2. Architect Coder — ikona: budynek z X
  3. Perfectionist Loop — ikona: petla nieskonczonosci
  4. Context Overload — ikona: eksplodujacy mozg
  5. Untested Delivery — ikona: paczka z pytajnikiem
- Kazda karta: nazwa + 1 zdanie opisu + ikona

SEKCJA 8: QUICK REFERENCE (300px)
- ASCII-style box z kluczowymi danymi
- Ciemniejsze tlo (#161B22)
- Font monospace
- Dane: rola, model, koszt, load, tokeny, czas, narzedzia

SEKCJA 9: STOPKA (100px)
- "Gold Standard 2026 | Multi-Agent AI Architecture"
- Logo/branding
- "BUILD Layer — Agent B-01"

DODATKOWE ELEMENTY:
- Subtelne linie siatki na tle (jak w terminalu)
- Glow effect na kluczowych elementach (#00FF41 z blur)
- Male ikony ">_" (prompt terminala) jako dekoracyjne elementy
- Numeracja sekcji w stylu "01 //", "02 //", itp.
```

---

*Dokument wygenerowany dla systemu Gold Standard 2026 Multi-Agent AI Architecture.*
*Agent: Koder (B-01) | Warstwa: BUILD | Model: Claude Sonnet*
