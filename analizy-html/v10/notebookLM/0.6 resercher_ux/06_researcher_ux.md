# RESEARCHER UX (R-02) -- Agent Badan UX/Design w Systemach Wieloagentowych AI

## Kompletny Przewodnik Edukacyjny | Gold Standard 2026

---

## 1. Wprowadzenie -- Kim jest Researcher UX?

Wyobraz sobie, ze budujesz dom. Masz architekta, murarzy, elektryków, hydraulików -- caly zespól. Ale zanim ktokolwiek polazy pierwszy cegel, potrzebujesz kogos, kto przyniesie ci albumy z inspiracjami. Kto pokaze ci, jak wygladaja najlepsze domy na swiecie. Kto przyniesie próbki materialy, palety kolorów, zdjecia z wystaw wnetrz i powie: "Zobaczcie, w Skandynawii robi sie teraz tak, w Japonii robi sie tak, a oto 5 najciekawszych lazienek roku." Ta osoba nie projektuje twojego domu. Nie kladzenie plyte. Nie wybiera ci mebli. Ona **zbiera inspiracje i pokazuje mozliwosci**.

Dokladnie tym jest **Researcher UX** (oznaczenie R-02 w architekturze Gold Standard 2026) w systemie wieloagentowym AI. Jest to agent specjalizujacy sie w badaniu trendów UI/UX, zbieraniu wizualnych inspiracji, analizie standardów dostepnosci i raportowaniu najlepszych praktyk designerskich. Jesli szukasz analogii ze swiata realnego, Researcher UX to polaczenie trzech ról:

- **Kurator sztuki w galerii** -- nie maluje obrazów, ale wie, które prace sa najwazniejsze, jakie trendy dominuja i co warto pokazac publicznosci. Przeszukuje setki zródel, zeby wybrać 10 najlepszych referencji.
- **Interior designer w fazie inspiracji** -- zanim zaprojektuje twoje mieszkanie, jedzie na targi, przeszukuje magazyny, fotografuje wnetrza hoteli. Wraca z mood boardem -- tablica nastrojów, na której zebrane sa kolory, materialy, tekstury i wzory, które definiuja kierunek wizualny.
- **Wywiadowca trendów w firmie modowej** -- nie szyje ubran, nie projektuje kolekcji, ale wie co nosza ludzie w Mediolanie, co pojawilo sie na wybiegu w Paryzu i jakie tkaniny beda na topie za rok. Dostarcza dane, na podstawie których projektant podejmuje decyzje.

W architekturze Gold Standard 2026 Researcher UX siedzi w **warstwie RESEARCH** -- razem z szescioma innymi researcherami (Tech, Reddit, GitHub, X/Twitter, Forums, Docs). Wszyscy dzialaja równolegle, przeszukujac rózne zródla informacji. Researcher UX ma jednak unikalna nisse: podczas gdy Tech bada frameworki i benchmarki, a Reddit szuka opinii developerów -- UX bada **jak rzeczy powinny WYGLADAC**. Tech odpowiada na pytanie "jak zbudowac?", UX odpowiada na pytanie "jak powinno wyglądac i dzialac z perspektywy uzytkownika?".

To rozróznienie jest fundamentalne. W systemie wieloagentowym bez Researchera UX powstaje oprogramowanie, które jest technicznie poprawne, ale wizualnie slabe -- bo nikt nie sprawdzil, jakie sa aktualne trendy, jakie standardy dostepnosci obowiazuja, ani jak najlepsze produkty na swiecie rozwiazuja analogiczne problemy designerskie.

> **Czy wiesz, ze...?** Researcher UX jest obecny w 7 z 27 predefiniowanych presetów zespolów w Agent Teams Configurator v8: Accessibility Sprint, Design System, UI/UX Overhaul, Feature Sprint, Standard Dev, SaaS Dev i Full Team. To czyni go jednym z najczesciej uzywanych agentów badawczych -- zaraz po Researcher Tech.

---

## 2. Kluczowe Obowiazki

Researcher UX ma cztery fundamentalne obszary odpowiedzialnosci. Kazdy z nich dostarcza inny typ danych, a razem tworza kompletny obraz stanu designu, na którym Designer (agent budujacy) moze oprzec swoje decyzje.

### 2.1. Badanie Trendów Wizualnych (Trend Research)

To podstawowe zadanie Researchera UX. Przeszukuje wiodace platformy designerskie -- Dribbble, Behance, Awwwards, Mobbin -- szukajac aktualnych trendów w UI/UX. Co jest teraz modne? Jakie palety kolorów dominuja? Czy bento gridy sa jeszcze na topie? Czy glassmorphism juz odchodzi? Jakie typografie wybieraja topowe agencje?

Researcher UX nie szuka "ladnych obrazków" -- szuka **wzorców**. Jesli 8 z 10 nagrodzonych stron na Awwwards uzywa ciemnego motywu z akcentami neonowymi, to jest WZORZEC. Jesli Dribbble w Q1 2026 jest zdominowany przez minimalistyczne interfejsy z duzymi białymi przestrzeniami -- to jest WZORZEC. Jesli Behance pokazuje rosnacy trend na 3D elementy w UI -- to jest WZORZEC.

Output: lista 5-10 trendów z konkretnymi przykladami i linkami do zródel.

### 2.2. Zbieranie Inspiracji (Inspiration Gathering)

To budowanie **mood boardu** -- wizualnej tablicy inspiracji, która definiuje kierunek estetyczny projektu. Mood board zawiera:

- Screenshoty z najlepszych realizacji w danej kategorii (np. "dashboardy analityczne 2026")
- Palety kolorów z uzasadnieniem (dlaczego te kolory? jaki nastrój buduja?)
- Przykladowa typografia -- fonty naglówkowe, body, monospace
- Spacing systems -- jak inne produkty ukladaja elementy na stronie
- Animacje i mikro-interakcje -- co sie dzieje, gdy uzytkownik kliknie przycisk, jak laduja sie dane

Kluczowa zasada: mood board musi zawierac **minimum 5 referencji wizualnych**. Jedna referencja to nie mood board -- to kopiowanie. Piec i wiecej referencji pozwala na synteze -- wyciagniecie wspólnych elementów i stworzenie czegos nowego.

### 2.3. Audyt Dostepnosci (Accessibility Audit)

Researcher UX sprawdza, jakie standardy dostepnosci obowiazuja dla danego typu projektu. W 2025-2026 roku kluczowym standardem jest **WCAG 2.1 poziom AA** (Web Content Accessibility Guidelines), a coraz wiecej projektów celuje w **WCAG 2.2**. Co to oznacza w praktyce?

- **Kontrast kolorów** -- minimalny wskaznik kontrastu 4.5:1 dla normalnego tekstu i 3:1 dla duzego tekstu. Researcher UX sprawdza, czy proponowane palety kolorów spelniaja te wymagania.
- **Nawigacja klawiaturowa** -- czy wszystkie interaktywne elementy sa osiagalne za pomoca klawiatury (Tab, Enter, Escape)?
- **Czytniki ekranowe** -- czy struktura strony jest semantyczna (naglówki, listy, landmarki)?
- **Redukcja ruchu** -- czy animacje maja opcje wylaczenia dla osób z zaburzeniami przedsionkowymi (prefers-reduced-motion)?
- **Rozmiar celów dotykowych** -- czy przyciski i linki maja minimum 44x44px?

Researcher UX nie implementuje tych rozwiazan -- wskazuje, które standardy obowiazuja, i flaguje potencjalne problemy. Implementacja nalezy do Designera i Frontend Developera.

### 2.4. Analiza Design Systems (Design System Analysis)

Researcher UX bada istniejace design systemy -- zarówno wielkie publiczne (Material Design od Google, Apple Human Interface Guidelines, Fluent Design od Microsoft), jak i mniejsze, specjalistyczne (Tailwind UI, Radix, Shadcn/ui). Szuka odpowiedzi na pytania:

- Jakie pattern'y komponentowe sa standardem w 2026 roku?
- Jak duze firmy rozwiazuja problem dark/light mode?
- Jakie systemy tokenów designu sa najskuteczniejsze?
- Jak ukladac responsive layouts -- czy mobile-first jest nadal dominujacym podejsciem?

Ten obszar laczy sie z praca Researchera Tech -- bo design system to nie tylko estetyka, ale tez architektura komponentów. UX patrzy na wizualna strone, Tech na techniczna implementacje. Ich raporty sie uzupelniaja.

> **Uwaga!** Researcher UX NIGDY nie tworzy design systemu sam. Zbiera dane o istniejacych systemach, analizuje trendy i rekomenduje podejscie. Budowanie wlasciwego design systemu to rola Designera (agent budujacy) -- tego, który pisze CSS tokeny, definiuje skale typografii i tworzy komponenty.

---

## 3. Zródla Danych -- Skad Researcher UX Czerpie Wiedze

Researcher UX operuje na specyficznym zbiorze zródel, które róznia sie od zródel innych researcherów. Podczas gdy Researcher Tech szuka na StackOverflow i w dokumentacjach frameworków, a Researcher Reddit przeszukuje subreddity -- Researcher UX ma swoje wlasne "rewiry lówieckie".

### 3.1. Dribbble

**Czym jest:** Platforma, na której designerzy publikuja swoje prace -- screenshoty interfejsów, animacje, ikony, ilustracje. Czesto nazywana "Instagramem dla designerów".

**Co Researcher UX tu szuka:** Najnowsze trendy wizualne, popularne style, palety kolorów, mikro-interakcje. Dribbble jest swietnym zródlem inspiracji estetycznej, ale trzeba pamietac o jego ograniczeniu -- wiele projektów to "concept shots", które nigdy nie zostaly zaimplementowane.

**Jak szukac efektywnie:** Filtrowanie po tagach ("dashboard", "dark mode", "SaaS"), sortowanie po popularnosci (likes/views), skupienie na profilach z weryfikowanymi projektami (Dribbble Pro).

### 3.2. Behance

**Czym jest:** Platforma portfolio od Adobe. W odróznieniu od Dribbble, Behance wymaga publikowania kompletnych case study -- nie pojedynczych screenshotów, ale calych procesów projektowych.

**Co Researcher UX tu szuka:** Kompletne case study z procesem projektowym: od researchu, przez wireframes, po finalny design. Behance jest cenniejsze od Dribbble w kontekscie PROCESU -- pokazuje nie tylko efekt koncowy, ale tez drogę do niego.

**Jak szukac efektywnie:** Sekcja "Featured" (projekty wybrane przez kuratorów Adobe), filtrowanie po "UI/UX", "Web Design", "App Design".

### 3.3. Awwwards

**Czym jest:** Serwis przyznajacy nagrody najlepszym stronom internetowym. Kazda strona jest oceniana przez panel jurorów w kategoriach: design, uzytecznosc, kreatywnosc, tresci.

**Co Researcher UX tu szuka:** Absolutny top jakosci w web design. Strony nagrodzone na Awwwards reprezentuja stan sztuki -- najnowsze techniki, najlepsza estetykę, najciekawsze interakcje. To jest "galeria sztuki" web designu.

**Jak szukac efektywnie:** Sekcja "Site of the Day" (SOTD), filtrowanie po technologii (React, Next.js), przeglad "Annual Awards" za najnowsze nagrody roczne.

### 3.4. Mobbin

**Czym jest:** Baza danych screenów z realnych aplikacji mobilnych i webowych. W odróznieniu od Dribbble (koncepty), Mobbin zawiera screenshoty z DZIALAJACYCH produktów.

**Co Researcher UX tu szuka:** Realne wzorce UI z produkcyjnych aplikacji. Jak Spotify robi onboarding? Jak Notion uklada sidebar? Jak Linear projektuje dark mode? Mobbin daje "ground truth" -- nie koncepty, ale to, co faktycznie jest zbudowane i uzywane.

### 3.5. Material Design (Google)

**Czym jest:** Oficjalny design system Google. Obejmuje wytyczne dotyczace kolorów, typografii, spacing, komponentów, animacji, dostepnosci.

**Co Researcher UX tu szuka:** Sprawdzone wzorce komponentowe (buttons, cards, navigation), wytyczne dostepnosci, specyfikacje animacji (easing curves, duration).

### 3.6. Apple Human Interface Guidelines (HIG)

**Czym jest:** Odpowiednik Material Design, ale dla ekosystemu Apple. Definiuje standardy dla iOS, macOS, watchOS, visionOS.

**Co Researcher UX tu szuka:** Wzorce iOS/macOS, standardy gestów dotykowych, wytyczne dla spatial computing (visionOS), specyfikacje SF Symbols.

### 3.7. WCAG (Web Content Accessibility Guidelines)

**Czym jest:** Standard W3C definiujacy wymagania dostepnosci treści internetowych. Aktualnie obowiazuje WCAG 2.1 AA, a WCAG 2.2 jest coraz szerzej adoptowany.

**Co Researcher UX tu szuka:** Konkretne wymagania dostepnosci -- wskazniki kontrastu, wymagania nawigacji klawiaturowej, specyfikacje ARIA roles, wytyczne dla animacji i ruchu.

> **Czy wiesz, ze...?** Hierarchia wiarygodnosci zródel w systemie Gold Standard 2026 to: Docs > Blog > Tweet. Dla Researchera UX oznacza to: oficjalne design systemy (Material Design, HIG, WCAG) > case study na Behance > shoty na Dribbble > posty na X/Twitter. Researcher UX powinien zawsze priorytetyzowac zródla oficjalne, a wizualne inspiracje traktowac jako uzupelnienie, nie jako jedyna podstawe rekomendacji.

---

## 4. Format Raportu UX -- Co Dostarcza Researcher UX

Raport Researchera UX to nie esej i nie lista linków. To ustrukturyzowany dokument, który Designer i Frontend Developer moga bezposrednio wykorzystac w swojej pracy. Raport sklada sie z pieciu kluczowych sekcji.

### 4.1. Mood Board (Tablica Inspiracji)

**Minimum 5 referencji wizualnych** z róznych zródel. Kazda referencja zawiera:
- Link do zródla (URL)
- Krótki opis: co jest warte uwagi (np. "Uzycie gradient meshów jako tla, minimalistyczna typografia, duze białe przestrzenie")
- Kategoria: dark mode / light mode / animacje / layout / typografia / kolor

Mood board nie jest przypadkowym zbiorem "ladnych stron". To SYNTETYZOWANA wizja -- elementy powinny byc spójne i wskazywac jasny kierunek estetyczny.

### 4.2. Paleta Kolorów (Color Palette)

Rekomendacja palety kolorów z uzasadnieniem:
- Primary color (glówny kolor marki)
- Secondary color (kolor uzupelniajacy)
- Accent color (kolor akcentowy -- CTA, powiadomienia)
- Neutral scale (skala szarosci do tekstu i tla)
- Semantic colors (success = zielony, error = czerwony, warning = zólty, info = niebieski)

Kazdy kolor z wartoscia hex i kontekstem uzycia. Obowiazkowe: sprawdzenie kontrastu WCAG (minimum 4.5:1 dla tekstu).

### 4.3. Typografia (Typography)

Rekomendacja fontów z uzasadnieniem:
- Font naglówkowy (heading) -- czesto bold, ekspresyjny
- Font body (tresc) -- czytelny, neutralny
- Font monospace (kod) -- dla wyswietlania kodu, terminala

Oraz specyfikacja skali typograficznej: H1, H2, H3, body, small, caption -- z rozmiarami (rem), line-height i letter-spacing.

### 4.4. System Odstepów (Spacing System)

Rekomendacja systemu spacing opartego na siatce bazowej (base grid). Standardowy uklad 2026 to:
- Siatka 4px lub 8px
- Skala: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (pikseli)
- Zasady: wewnetrzny padding (maly), zewnetrzny margin (duzy), gap miedzy sekcjami (najwiekszy)

### 4.5. Animacje i Mikro-interakcje

Rekomendacje dotyczace ruchu w interfejsie:
- Czas trwania animacji (100-300ms dla mikro-interakcji, 300-500ms dla przejsc stron)
- Easing curves (ease-out dla wchodzenia, ease-in dla wychodzenia)
- Typy animacji: hover effects, loading states, page transitions, scroll animations
- Obowiazkowe: prefers-reduced-motion media query -- wylaczanie animacji dla uzytkowników z zaburzeniami przedsionkowymi

> **Uwaga!** Raport UX NIE jest specyfikacja techniczna. Researcher UX nie pisze kodu CSS, nie definiuje tokenów w formacie JSON, nie tworzy design systemu w Figma. Dostarcza REKOMENDACJE i REFERENCJE. Transformacja raportu UX w kod i tokeny to rola Designera i Frontend Developera.

---

## 5. Czego Researcher UX NIE Robi

Ta sekcja jest kluczowa dla zrozumienia granic roli. W systemie wieloagentowym kazdy agent ma scisle zdefiniowany zakres odpowiedzialnosci i przekraczanie go prowadzi do chaosu, duplikacji pracy i spadku jakosci.

### Researcher UX NIE projektuje

Nie tworzy wireframe'ów, nie rysuje makiet, nie uklada layoutów. Zbiera inspiracje i rekomenduje kierunek -- ale finalna decyzja projektowa nalezy do Designera. To tak jak kurator galerii: moze polecic "powiesmiy tu cos abstrakcyjnego, w odcieniach blekitu" -- ale nie maluje obrazu sam.

### Researcher UX NIE koduje CSS

Nie pisze ani jednej linijki kodu. Nie tworzy tokenów, nie definiuje zmiennych CSS, nie buduje komponentów. Jego raport opisuje rekomendacje SLOWNIE i za pomoca referencji wizualnych. Przekladanie tego na kod to rola Designera (CSS/SCSS tokeny) i Frontend Developera (implementacja komponentów).

### Researcher UX NIE podejmuje finalnych decyzji

Researcher UX REKOMENDUJE, ale nie DECYDUJE. Moze powiedziec: "Trend wskazuje na dark mode jako domyslny, z opcja light mode. WCAG wymaga kontrastu 4.5:1. Oto 5 inspiracji." Ale decyzja, czy projekt bedzie w dark mode, nalezy do Orkiestratora (lub uzytkownika). Researcher dostarcza dane -- decyzja jest gdzie indziej.

### Researcher UX NIE testuje

Nie uruchamia testów dostepnosci, nie sprawdza lighthouse score, nie weryfikuje responsywnosci na urzadzeniach. To rola QA Quality. Researcher UX moze zasygnalizowac: "Uwaga, te kolory moga nie przejsc testu kontrastu WCAG" -- ale faktyczne testowanie jest poza jego zakresem.

### Researcher UX NIE edytuje plików

W konfiguracji Gold Standard 2026 Researcher UX ma dostep WYLACZNIE do narzedzi WebSearch i WebFetch. Nie ma dostepu do Write, Edit ani Bash. To celowe ograniczenie -- jego rola to ZBIERANIE informacji, nie ich implementacja. Jesli dasz mu narzedzie Write, poczuje pokuse, zeby sam napisac CSS zamiast dostarczyc rekomendacje. Narzedzia definiuja role.

> **Czy wiesz, ze...?** W v8 AGENT_TEAMS_CONFIGURATOR opis Researchera UX wprost mówi: "Bez narzedzi edycji -- rola to ZBIERANIE informacji." A opis jego interakcji z innymi agentami precyzuje: "Tech bada JAK zbudowac, UX bada JAK powinno WYGLADAC." Te dwa zdania definiuja esencje roli lepiej niz jakikolwiek dluzszy opis.

---

## 6. Model i Koszt -- Ekonomia Researchera UX

### Dlaczego Haiku?

Researcher UX uzywa modelu **Claude Haiku** -- najtanszego modelu w ekosystemie Anthropic. Dlaczego? Bo zadania badawcze nie wymagaja zaawansowanego rozumowania na poziomie Opus. Researcher UX nie podejmuje strategicznych decyzji, nie rozwiazuje zlozonych problemów architektonicznych, nie syntetyzuje sprzecznych informacji (to robi Research Critic). Jego praca to:

1. Przeszukiwanie internetu (WebSearch)
2. Odczytywanie tresci stron (WebFetch)
3. Strukturyzowanie znalezionych informacji w raport

Te zadania sa stosunkowo proste obliczeniowo. Haiku radzi sobie z nimi doskonale -- a kosztuje zlomek ceny Opus.

### Porównanie kosztów modeli

| Model | Input (za 1M tokenów) | Output (za 1M tokenów) | Zastosowanie |
|-------|----------------------|------------------------|--------------|
| **Opus** | $15.00 | $75.00 | Orkiestrator, Syntetyk |
| **Sonnet** | $3.00 | $15.00 | Builderzy (Backend, Frontend, Designer) |
| **Haiku** | $0.80 | $4.00 | Researcherzy (Tech, UX, Reddit...), QA |

### Ile kosztuje jeden run Researchera UX?

Typowy research UX zuzywa okolo **20 000-40 000 tokenów** (input + output). Przeliczajac:
- Input: ~25 000 tokenów x $0.80/1M = **$0.02**
- Output: ~15 000 tokenów x $4.00/1M = **$0.06**
- **Laczny koszt: okolo $0.08 za jeden pelny run**

To jest koszt marginalny. Dla porównania, gdyby to samo zadanie wykonywalo sie na Opus:
- Input: ~25 000 tokenów x $15.00/1M = **$0.38**
- Output: ~15 000 tokenów x $75.00/1M = **$1.13**
- **Laczny koszt na Opus: okolo $1.51 za run**

Róznica: **prawie 19x drozej** na Opus. Przy systemie z 7 researcherami (Gold Standard Research Swarm) oszczednosci sa dramatyczne -- $0.56 zamiast $10.57 za pelna runde research.

### Smart Model Routing w praktyce

W architekturze Gold Standard 2026 obowiazuje zasada dynamicznego routingu modeli:
- **Opus** (~10% wywolan) -- tylko orkiestrator i syntetyk
- **Sonnet** (~30% wywolan) -- builderzy
- **Haiku** (~60% wywolan) -- research i QA

Researcher UX jest czescia tych 60% -- najtanszego segmentu systemu. Dlatego mozna go uruchamiac bez obaw o koszty, nawet wielokrotnie (np. jesli Research Critic odrzuci pierwszy raport z ocena ponizej 6/10 i zazada rewizji).

> **Uwaga!** Fakt, ze Researcher UX uzywa Haiku nie oznacza, ze jego praca jest mniej wazna. Oznacza to, ze CHARAKTER jego pracy (search + zbieranie + strukturyzowanie) nie wymaga zaawansowanego rozumowania. To rozróznienie miedzy WAZNOSCIA roli a ZLOZONOSCIA obliczeniowa zadania. Raport UX jest krytyczny dla jakosci produktu -- ale samo przeszukiwanie Dribbble nie wymaga Opus.

---

## 7. Narzedzia

Researcher UX ma celowo minimalny zestaw narzedzi. To nie jest ograniczenie -- to fundamentalna decyzja projektowa, która wymusza dyscypline roli.

### Narzedzia DOZWOLONE

| Narzedzie | Co robi | Dlaczego Researcher UX to ma |
|-----------|---------|------------------------------|
| **WebSearch** | Przeszukuje internet | Kluczowe narzedzie -- szukanie trendów, inspiracji, standardów |
| **WebFetch** | Pobiera tresc strony internetowej | Odczytywanie szczegolow znalezionych stron -- case study, specyfikacje, artykuly |

W rozszerzonej konfiguracji (np. przy wiekszych projektach) Researcher UX moze dodatkowo uzyskac dostep do:

| Narzedzie | Co robi | Kiedy uzywane |
|-----------|---------|---------------|
| **Read** | Czyta pliki lokalne | Gdy musi zapoznac sie z istniejacym design systemem projektu lub MANIFEST.md |
| **Grep** | Przeszukuje pliki po wzorcach | Gdy szuka konkretnych tokenów designu w istniejacym kodzie |
| **Glob** | Szuka plików po nazwie | Gdy musi znalezc pliki CSS/SCSS w projekcie |

### Narzedzia ZAKAZANE

| Narzedzie | Dlaczego Researcher UX tego NIE MA |
|-----------|-----------------------------------|
| **Write** | Pisanie plików = tworzenie tresci, nie zbieranie informacji |
| **Edit** | Edycja plików = modyfikowanie kodu, nie badanie trendów |
| **Bash** | Uruchamianie komend = wykonywanie pracy, nie research |
| **Agent** | Uruchamianie subagentów = zarzadzanie, nie research |

### Filozofia: narzedzia definiuja role

Zasada obowiazujaca w calym systemie wieloagentowym: **jesli dasz agentowi narzedzie, uzyje go**. Jesli Researcher UX dostanie narzedzie Write, zacznie sam pisac CSS tokeny zamiast rekomendowac palety kolorów. Jesli dostanie Edit, zacznie modyfikowac istniejace style zamiast analizowac trendy. Ograniczenie narzedzi to mechanizm wymuszajacy dyscypline -- Researcher UX fizycznie nie moze "designowac", wiec MUSI skupic sie na swoim wlasciwym zadaniu: zbieraniu i strukturyzowaniu informacji.

---

## 8. Workflow -- Od Brief do Mood Board

Przyjrzyjmy sie pelnej sciezce pracy Researchera UX, od momentu otrzymania zadania do dostarczenia raportu. Uzyje konkretnego przykladu: zespól buduje interaktywna strone edukacyjna o architekturze agentów AI.

### Krok 1: Otrzymanie brief od Orkiestratora

Orkiestrator deleguje zadanie z waskim kontekstem:

```
Jestes UX Researcher.
Projekt: Interaktywna strona edukacyjna o architekturze agentów AI.
Target: Deweloperzy i technicy, 25-40 lat.
Format: Single-page HTML, scrollowane sekcje.

Zbadaj:
- Top 10 przykladow wizualnych (edukacyjne strony tech)
- Trendy UI: kolory, typo, layout
- Mikro-interakcje i animacje
- Accessibility (WCAG 2.1 AA)

Zródla: Dribbble, Behance, Awwwards, Material Design.
Output: Mood board + design recommendations report.
```

Zwróc uwage: brief jest **waski i precyzyjny**. Researcher UX nie dostaje calej specyfikacji projektu -- dostaje TYLKO to, co potrzebuje do swojego zadania (Narrow Context Principle).

### Krok 2: Przeszukiwanie zródel (równolegle)

Researcher UX uruchamia serie zapytan WebSearch:
- "best educational tech websites 2026 design"
- "Dribbble dashboard dark mode 2026"
- "Behance interactive learning platform UX case study"
- "Awwwards site of the day educational"
- "WCAG 2.2 new requirements checklist"

### Krok 3: Glebsze nurkowanie (WebFetch)

Dla kazdego obiecujacego wyniku Researcher UX uzywa WebFetch, zeby odczytac pelna tresc strony. Nie wystarczy tytul z wyników wyszukiwania -- trzeba zobaczyc szczegoly: jakie fonty uzywaja? Jaka paleta kolorów? Jak rozwiazany jest responsive layout?

### Krok 4: Synteza i kategoryzacja

Researcher UX grupuje znalezione informacje w kategorie:
- **Kolory:** 7 z 10 znalezionych stron uzywa ciemnego tla z jasnymi akcentami. Dominuja odziecie granatowego i fioletowego.
- **Typografia:** Space Grotesk i Inter to najczesciej uzywane fonty. JetBrains Mono dla kodu.
- **Layout:** Bento grid (siatka o róznych rozmiarach komórek) pojawia sie w 6 z 10 stron.
- **Animacje:** Scroll-triggered animations sa standardem. Micro-interactions na hover i click.
- **Dostepnosc:** WCAG 2.2 wymaga minimum 24x24px touch targets (zmiana z 2.1).

### Krok 5: Budowanie raportu

Researcher UX strukturyzuje wyniki w format opisany w sekcji 4:
1. Mood board z 8 referencjami (linki + opisy)
2. Paleta kolorów z wartosciami hex i kontrastem WCAG
3. Typografia z rekomendacja 3 fontów
4. Spacing system oparty na siatce 8px
5. Animacje z rekomendowanymi parametrami

### Krok 6: Dostarczenie raportu

Raport trafia do MANIFEST.md (za posrednictwem Syntetyka) i jest dostepny dla:
- **Designera** -- który na jego podstawie stworzy CSS tokeny i layout
- **Frontend Developera** -- który zaimplementuje komponenty zgodnie z rekomendacjami
- **Research Critica** -- który oceni jakosc raportu w rubryce

### Krok 7: Ewentualna rewizja

Jesli Research Critic oceni raport ponizej 6/10, Researcher UX dostaje feedback i wykonuje rewizje. Typowe powody odrzucenia:
- Za malo referencji wizualnych (mniej niz 5)
- Brak analizy dostepnosci
- Brak dark/light mode considerations
- Kopiowanie jednego designu zamiast syntezy trendów

> **Czy wiesz, ze...?** Caly ten workflow -- od brief do dostarczenia raportu -- trwa dla Researchera UX typowo **60-120 sekund** czasu rzeczywistego. Agent wykonuje 5-15 wywolan WebSearch i 3-8 wywolan WebFetch, po czym generuje raport. To jest exponencjalnie szybsze niz ludzki UX researcher, który na analogiczne zadanie potrzebowalby 2-4 godzin.

---

## 9. Researcher UX vs Designer -- Kluczowa Róznica

To jedno z najczesciej myLonych rozróznien w architekturze wieloagentowej. Researcher UX i Designer oba "zajmuja sie designem" -- ale w fundamentalnie rózny sposób.

### Tabela porównawcza

| Aspekt | Researcher UX (R-02) | Designer (B-04) |
|--------|---------------------|-----------------|
| **Warstwa** | RESEARCH | BUILD |
| **Model** | Haiku ($0.80/$4) | Sonnet ($3/$15) |
| **Co robi** | ZBIERA informacje o designie | TWORZY design |
| **Output** | Mood board + raport rekomendacji | CSS/SCSS tokeny, layout HTML, animacje |
| **Narzedzia** | WebSearch, WebFetch | Write, Edit, Read |
| **Faza pracy** | Wczesna (przed budowa) | Srodkowa (podczas budowy) |
| **Podejmuje decyzje?** | Nie -- rekomenduje | Tak -- w ramach wytycznych |
| **Analogia** | Kurator galerii | Malarz |
| **Produkuje kod?** | Nigdy | Tak -- CSS, SCSS, SVG |

### Dlaczego potrzebujemy OBU?

Moze sie wydawac, ze Designer moze sam zrobic research -- w koncu jest "designerem" i powinien wiedziec, co jest na topie. Ale w systemie wieloagentowym to prowadzi do trzech problemów:

**Problem 1: Przeciazenie kontekstu.** Designer, który jednoczesnie szuka inspiracji I pisze CSS, ma za duzo w oknie kontekstowym. Traci koncentracje na jednym lub drugim.

**Problem 2: Confirmation bias.** Designer, który sam szuka inspiracji, podswiadomie szuka potwierdzenia swoich istniejacych preferencji. Niezalezny Researcher UX nie ma takich uprzedzen -- szuka obiektywnie.

**Problem 3: Równoleglosc.** Jesli Designer sam robi research, musi to robic SEKWENCYJNIE -- najpierw szukac, potem projektowac. Gdy research i build sa osobnymi agentami, research trwa RÓWNOLEGLE z innymi zadaniami (np. analiza i planowanie).

### Jak wspolpracuja?

W typowym workflow:
1. **Researcher UX** dostarcza mood board i rekomendacje kolorów/typografii
2. **Designer** czyta raport UX i na jego podstawie tworzy design tokeny, layout, animacje
3. **Frontend Developer** implementuje design w kodzie komponentów

Researcher UX nigdy nie komunikuje sie bezposrednio z Designerem -- komunikacja idzie przez MANIFEST.md (zarzadzany przez Syntetyka). To zapobiega "szeptaniu" i zapewnia, ze wszystkie decyzje sa udokumentowane.

---

## 10. Anty-wzorce -- Co Moze Pójsc Nie Tak

Kazdy z ponizszych anty-wzorców zostal zaobserwowany w realnych wdrozeniach systemów wieloagentowych i jest udokumentowany w materialach Gold Standard 2026.

### ANTI-UX-01: Trend Chaser (Goniec za Trendami)

**Problem:** Researcher UX raportuje KAZDY trend, który znajdzie -- bez krytycznej oceny, czy trend jest odpowiedni dla danego projektu. Raport zawiera 20 róznych trendów, z których polowa jest wzajemnie sprzeczna (np. jednoczesnie rekomenduje minimalizm I maksymalizm, dark mode I kolorowe gradienty).

**Dlaczego to sie dzieje:** Agent przeszukuje Dribbble i Behance bez filtrowania pod katem projektu. Wszystko, co jest popularne, laduje w raporcie.

**Konsekwencje:** Designer dostaje niespójny mood board i nie wie, w którym kierunku isc. Decyzja projektowa zostaje sparalizowana -- zbyt wiele opcji, brak jasnej rekomendacji.

**Fix:** Brief od Orkiestratora musi zawierac kontekst projektu: kto jest target audience, jaki jest ton komunikacji (formal/casual), jakie sa ograniczenia techniczne. Researcher UX musi FILTROWAC wyniki pod katem tego kontekstu, nie tylko zbierac wszystko.

### ANTI-UX-02: No Accessibility (Brak Dostepnosci)

**Problem:** Researcher UX skupia sie wylacznie na estetyce -- "ladne kolory", "modna typografia", "wow animacje" -- a calkowicie pomija standardy dostepnosci (WCAG). Rekomendowana paleta kolorów ma kontrast 2:1 zamiast wymaganego 4.5:1. Animacje nie maja opcji wylaczenia.

**Dlaczego to sie dzieje:** Dribbble i Behance sa pelne pieknych projektów, które nie spelniaja standardów WCAG. Agent "uczy sie" z tych zródel i reprodukuje ich bledy.

**Konsekwencje:** Produkt koncowy jest niedostepny dla osób z niepelnosprawnosciami. W wielu jurysdykcjach (UE -- European Accessibility Act 2025, USA -- ADA) jest to równiez problem prawny.

**Fix:** Prompt Researchera UX MUSI zawierac obowiazkowy punkt "Accessibility (WCAG 2.1 AA)" -- tak jak jest to w Gold Standard 2026. Kazda rekomendacja kolorów musi zawierac wskaznik kontrastu. Research Critic powinien odrzucac raporty bez sekcji dostepnosci.

### ANTI-UX-03: Style Over Substance (Styl Ponad Tresc)

**Problem:** Researcher UX rekomenduje efektowne, ale niepraktyczne rozwiazania: ciezkie animacje 3D, paralax na kazdej sekcji, custom cursor, full-screen video backgrounds. Wygladaja swietnie na Dribbble, ale w produkcji powoduja: wolne ladowanie, problemy z wydajnoscia na slabszych urzadzeniach, zaburzenia nawigacji, frustracje uzytkowników.

**Dlaczego to sie dzieje:** Dribbble i Awwwards nagradzaja "wow factor" -- ale "wow" na desktopie designera z RTX 4090 i monitorem 4K to zupelnie co innego niz "wow" na telefonie uzytkownika z 3-letnim Androidem na wolnym LTE.

**Konsekwencje:** Produkt ladnie wyglada w prezentacji, ale jest nieuzywalna w realnym swiecie. Uzytkownicy uciekaja po 3 sekundach wolnego ladowania.

**Fix:** Researcher UX musi uwzgledniac wydajnosc w swoich rekomendacjach. Kazda sugestia animacji powinna miec notatke o wplywie na performance. Rekomendacje powinny priorytetyzowac "progressive enhancement" -- podstawowa wersja dziala szybko, ozdobniki sa opcjonalne.

### ANTI-UX-04: Missing Responsive (Brak Responsywnosci)

**Problem:** Researcher UX zbiera inspiracje WYLACZNIE w wersji desktopowej. Mood board zawiera screenshoty o szerokosci 1440px, ale zero referencji dla tabletu (768px) i telefonu (375px).

**Dlaczego to sie dzieje:** Wiekszosc projektów na Dribbble jest prezentowana w wersji desktopowej (bo wyglada lepiej na miniaturce). Agent nie szuka aktywnie wersji mobilnych.

**Konsekwencje:** Designer i Frontend Developer nie maja referencji dla wersji mobilnej i musza improwizowac. Efekt: niespójny design miedzy breakpointami.

**Fix:** Brief musi zawierac wymaganie "Mobile-first" -- best practice, która wymaga od Researchera UX dostarczenia referencji w minimum dwóch breakpointach: mobile (375px) i desktop (1440px). W Gold Standard 2026 "Mobile-first" jest wymienione jako jedno z czterech best practices Researchera UX.

> **Uwaga!** Anty-wzorzec specyficzny dla calej warstwy RESEARCH, ale szczególnie dotykajacy Researchera UX: **Kopiowanie jednego designu zamiast syntezy trendów**. Jesli Researcher UX znajdzie jedna super strone i caly mood board opiera na niej -- to nie jest research, to plagiatorstwo z dodatkowym krokiem. Research oznacza SYNTEZE z wielu zródel, nie kopiowanie jednego.

---

## 11. Najlepsze Praktyki 2025-2026

### Rekomendacje z Gold Standard 2026

Na podstawie definicji agenta w AGENT_TEAMS_CONFIGURATOR v8, cztery oficjalne best practices Researchera UX to:

1. **Mood board minimum 5 referencji.** Nie 1, nie 2, nie 3. Minimum 5 róznych zródel wizualnych, zeby umozliwic SYNTEZE zamiast kopiowania.

2. **Dark/light mode.** Kazdy raport UX powinien adresowac OBA tryby -- dark mode i light mode. W 2026 roku dark mode nie jest juz "nice to have" -- jest oczekiwany przez uzytkowników. Raport powinien zawierac palety kolorów dla obu trybów.

3. **Mobile-first.** Referencje i rekomendacje powinny priorytetyzowac wersje mobilna. 60%+ ruchu internetowego pochodzi z urzadzen mobilnych. Projektowanie od desktopa i "zmniejszanie" to recepta na zly UX mobilny.

4. **WCAG kontrasty.** Kazda rekomendacja kolorów musi zawierac wskaznik kontrastu. Minimum 4.5:1 dla normalnego tekstu, 3:1 dla duzego tekstu (18px+ bold lub 24px+ regular).

### Dodatkowe best practices z praktyki

**5. Datuj swoje zródla.** Trend sprzed 2 lat to nie trend -- to historia. Researcher UX powinien priorytetyzowac zródla z ostatnich 6-12 miesiecy. Dribbble shot z 2022 roku nie jest relewantny dla projektu w 2026.

**6. Rozrózniaj koncepty od produkcji.** Dribbble jest pelen concept shots, które nigdy nie zostaly zbudowane. Researcher UX powinien to flagowac: "To jest koncept (Dribbble)" vs "To jest produkcyjny produkt (Mobbin)". Koncepty sa inspirujace, ale produkcyjne przyklady sa bardziej wiarygodne.

**7. Uwzgledniaj kontekst kulturowy.** Kolory, typografia i layouty maja rózne znaczenia w róznych kulturach. Czerwony to "niebezpieczenstwo" w zachodnim UI, ale "szczescie" w chinskim. Researcher UX powinien uwzglednic target market projektu.

**8. Raportuj trendy, które ODCHODZA.** Równie wazne jak "co jest na topie" jest "co juz NIE jest na topie". Jesli neumorphism umarl w 2024 -- Researcher UX powinien to powiedziec wprost, zeby Designer nie tracil czasu na przebrzmiale trendy.

**9. Podawaj zródla z URL.** Kazde twierdzenie w raporcie powinno miec link zródlowy. "Bento grid jest popularne" to opinia. "Bento grid pojawia sie w 6 z 10 najlepszych stron Awwwards Q1 2026 [link]" to fakt.

**10. Testuj rekomendacje na realnych danych.** Jesli rekomendujesz font -- sprawdz, jak wyglada z polskimi znakami (jezeli projekt jest po polsku). Jesli rekomendujesz kolor -- sprawdz, jak wyglada na róznych ekranach (OLED vs LCD). Jesli rekomendujesz animacje -- sprawdz, jaki maja wplyw na performance.

### Trendy UX/UI 2025-2026 -- Co Researcher UX Powinien Wiedziec

Na podstawie danych z wiodacych serwisów designerskich, kluczowe trendy aktualnie dominujace w UX/UI to:

- **AI-Native Interfaces** -- interfejsy budowane wokól interakcji z AI: chat-based UI, prompt fields, streaming responses, generative previews
- **Bento Grids** -- siatki inspirowane japanskim bentoboxem, z komórkami o róznych rozmiarach, asymetryczne ale harmonijne
- **Glassmorphism 2.0** -- ewolucja glassmorphismu z lepsza dostepnoscia: wiekszy kontrast, ciemniejsze tla za szklem
- **Micro-animations** -- subtelne animacje (100-300ms) reagujace na akcje uzytkownika: hover, click, scroll
- **Variable Fonts** -- jeden plik fontowy z osiami regulacji (weight, width, slant), co redukuje ladowanie i daje wieksza kontrole
- **Spatial Design** -- projektowanie dla AR/VR (Apple Vision Pro, Meta Quest), trzeci wymiar w UI
- **Sustainability UX** -- projektowanie z mysla o zuzyciu energii: ciemne motywy (mniej energii na OLED), mniej animacji, optymalizacja transferu
- **Inclusive Design** -- projektowanie dostepne domyslnie, nie jako afterthought: daltonizm, dysleksja, zaburzenia motoryczne

> **Czy wiesz, ze...?** European Accessibility Act (EAA) wchodzi w pełne zastosowanie 28 czerwca 2025 roku i wymaga, aby produkty i uslugi cyfrowe spelnialy standardy dostepnosci. To oznacza, ze dostepnosc nie jest juz "opcjonalna" -- jest wymogiem prawnym w Unii Europejskiej. Researcher UX w projektach dla rynku europejskiego MUSI uwzgledniac WCAG 2.1 AA jako absolutne minimum.

---

## 12. Podsumowanie i Kluczowe Wnioski

### 10 Najwazniejszych Wniosków

1. **Researcher UX to kurator, nie artysta.** Zbiera inspiracje, analizuje trendy, rekomenduje kierunek -- ale nie projektuje i nie koduje.

2. **Siedziba: warstwa RESEARCH.** Pracuje równolegle z 6 innymi researcherami (Tech, Reddit, GitHub, X, Forums, Docs). Kazdy bada inne zródla.

3. **Unikalna nisza: "jak powinno WYGLADAC".** Tech bada "jak zbudowac", Reddit bada "co myslą developerzy", UX bada "jak powinien wygladac i dzialac interfejs".

4. **Model: Haiku ($0.80/$4 za 1M tokenów).** Najtanszy model, bo zadania badawcze nie wymagaja zaawansowanego rozumowania. Koszt jednego runu: okolo $0.08.

5. **Narzedzia: WebSearch + WebFetch.** Celowo brak Write/Edit/Bash -- narzedzia definiuja role. Bez mozliwosci edycji MUSI skupic sie na zbieraniu informacji.

6. **Output: mood board + design recommendations.** Minimum 5 referencji wizualnych, paleta kolorów z kontrastem WCAG, typografia, spacing, animacje.

7. **NIE podejmuje finalnych decyzji.** Rekomenduje, nie decyduje. Finalne decyzje nalezy do Orkiestratora (strategiczne) i Designera (taktyczne).

8. **Dostepnosc jest obowiazkowa.** WCAG 2.1 AA to minimum. Kazda paleta kolorów z wskaznikiem kontrastu. Kazda animacja z opcja wylaczenia.

9. **Oceniany przez Research Critica.** Raport musi przejsc walidacje: Completeness 25%, Accuracy 25%, Relevance 20%, Freshness 20%, Actionability 10%. Ponizej 6/10 = rewizja.

10. **Synteza, nie kopiowanie.** Mood board z jednego zródla to plagiat. Mood board z 5+ zródel to synteza -- i to jest wlasciwy sposób pracy Researchera UX.

### Karta Szybkiego Referencji

```
RESEARCHER UX (R-02) -- Quick Reference Card

Nazwa:       Researcher UX / UX Design Research Agent
Identyfikator: res_ux (R-02 w Gold Standard 2026)
Warstwa:     RESEARCH (równolegle z 6 innymi researcherami)
Model:       Claude Haiku ($0.80/$4 za 1M tokenów)
Koszt/run:   ~$0.08
Narzedzia:   WebSearch, WebFetch
ZAKAZANE:    Write, Edit, Bash, Agent

Zródla:      Dribbble, Behance, Awwwards, Mobbin,
             Material Design, Apple HIG, WCAG

Output:      Mood board (min. 5 referencji)
             + Paleta kolorów (z kontrastem WCAG)
             + Typografia (heading, body, mono)
             + Spacing system (siatka 4px/8px)
             + Animacje (parametry + prefers-reduced-motion)

Best:        [1] Mood board min. 5 referencji
             [2] Dark/light mode
             [3] Mobile-first
             [4] WCAG kontrasty 4.5:1

Anti:        [1] Trend Chaser -- goniec za trendami bez filtrowania
             [2] No Accessibility -- pomijanie WCAG
             [3] Style Over Substance -- wow > uzytecznosc
             [4] Missing Responsive -- brak wersji mobilnej
             [5] Kopiowanie jednego designu zamiast syntezy

Interakcje:  Tech bada JAK zbudowac, UX bada JAK powinno WYGLADAC
Evaluator:   Research Critic (score < 6/10 = rewizja)
Komunikacja: Przez MANIFEST.md (via Syntetyk)

Presety z UX: Accessibility Sprint, Design System,
              UI/UX Overhaul, Feature Sprint, Standard Dev,
              SaaS Dev, Full Team (7 z 27 presetów)
```

---

*Dokument przygotowany jako material edukacyjny do Google NotebookLM.*
*Architektura Gold Standard 2026 | Agent Teams Configurator v8.0*

---

# PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

```
Stworz 5-7 minutowa prezentacje wideo o agencie RESEARCHER UX (R-02) w architekturze wieloagentowej Gold Standard 2026.

HOOK OTWIERAJACY (0:00-0:20):
- Zacznij od statystyki: "80% uzytkownikow odchodzi z powodu zlego UX, nie zlego kodu"
- Pokaz szybki montaz: brzydki interfejs vs piekny interfejs, uzytkownik frustrujacy sie vs uzytkownik zadowolony
- Pytanie retoryczne: "Kto w zespole AI dba o to, zeby produkt WYGLADAL dobrze?"
- Tytul animowany: "RESEARCHER UX (R-02) -- Kurator Designu w Swiecie AI"

SEKCJA 1 -- KIM JEST RESEARCHER UX (0:20-1:15):
- Animowana karta agenta: nazwa "Researcher UX", ID "R-02", warstwa "RESEARCH", model "Haiku"
- Kluczowe pytanie wyswietlone duzym fontem: "JAK powinno WYGLADAC?"
- Animacja porownawcza: Tech Researcher pyta "JAK zbudowac?" (po lewej, niebieski) vs UX Researcher pyta "JAK powinno WYGLADAC?" (po prawej, rozowy/magenta)
- Metafora wizualna: kurator galerii sztuki -- chodzi miedzy obrazami, wybiera najlepsze, tworzy wystawe
- Zrodla wyswietlone jako ikony z logo: Dribbble (rozowy), Behance (niebieski), Awwwards (zolty), Apple HIG, Material Design

SEKCJA 2 -- MOOD BOARD W AKCJI (1:15-2:30):
- Animacja budowania mood boardu krok po kroku
- Ekran podzielony: po lewej WebSearch query lecace jedna po drugiej, po prawej wyniki ladujace sie jako karty
- Pokaz 5+ referencji wizualnych ukladajacych sie w siatke mood boardu
- Kazda referencja z etykieta: zrodlo, data, kategoria (kolor/typo/layout/animacja)
- Animacja syntezy: 5 referencji "stapia sie" w jedna spojna rekomendacje
- Podkreslenie: "SYNTEZA z 5+ zrodel, nie kopiowanie jednego designu"

SEKCJA 3 -- WCAG I DOSTEPNOSC (2:30-3:30):
- Animacja sprawdzania kontrastu: pokaz koloru na tle, wskaznik kontrastu rosnie od 2:1 (czerwony, FAIL) do 4.5:1 (zielony, PASS)
- Checklist WCAG wyswietlajacy sie punkt po punkcie z animacja checkmark
- Pokaz touch target: kolo 24px (za male) vs 44px (odpowiednie) z wizualna skala
- Sekcja o European Accessibility Act 2025 -- prawne wymogi dostepnosci
- Wizualizacja: "Dostepnosc to nie opcja -- to wymog prawny w UE od 2025"

SEKCJA 4 -- RESPONSIVE I BREAKPOINTY (3:30-4:15):
- Animacja ekranu zmieniajacego rozmiar: desktop 1440px -> tablet 768px -> mobile 375px
- Pokaz jak mood board adresuje kazdy breakpoint osobno
- Side-by-side: zly research (tylko desktop) vs dobry research (3 breakpointy)
- Mobile-first principle -- animacja budowania od malego ekranu do duzego
- Statystyka: "60%+ ruchu pochodzi z urzadzen mobilnych"

SEKCJA 5 -- ANTY-WZORCE (4:15-5:15):
- Cztery anty-wzorce jako animowane karty z czerwonymi ramkami:
  1. "Trend Chaser" -- animacja agenta zbierajacego WSZYSTKO bez filtrowania, chaos na ekranie
  2. "No Accessibility" -- piekny design, ale tekst nieczytelny na tle (kontrast 2:1)
  3. "Style Over Substance" -- wow animacja 3D ktora zamraza telefon uzytkownika
  4. "Missing Responsive" -- piekny desktop, rozjechany mobile
- Dla kazdego: problem -> konsekwencja -> fix (zielona ramka)

SEKCJA 6 -- WORKFLOW OD BRIEF DO RAPORTU (5:15-6:15):
- Animowany flowchart 7 krokow:
  1. Orkiestrator wysyla brief (strzalka w dol)
  2. WebSearch -- rownolegle zapytania (5 strzalek rozchodzacych sie)
  3. WebFetch -- glebsze nurkowanie (lupa na wynikach)
  4. Kategoryzacja -- karty grupuja sie w kolumny (kolory/typo/layout/animacja/a11y)
  5. Synteza -- kolumny lacza sie w raport
  6. Dostarczenie przez MANIFEST.md
  7. Ocena Research Critica -- score >= 6/10 = OK, < 6/10 = rewizja (petla)
- Timer na ekranie: "60-120 sekund calkowity czas" vs "2-4 godziny dla czlowieka"

ZAKONCZENIE (6:15-6:45):
- Quick Reference Card animowana -- najwazniejsze dane agenta
- Kluczowy wniosek: "Researcher UX to kurator, nie artysta -- zbiera, filtruje, rekomenduje"
- "Tech bada JAK zbudowac, UX bada JAK powinno WYGLADAC -- razem pokrywaja caly obraz"
- Call to action: "W nastepnym odcinku: Designer (B-04) -- jak rekomendacje UX staja sie kodem CSS"

PALETA KOLORYSTYCZNA:
- Glowny: Pink/Magenta #EC4899 (kolor Researchera UX)
- Tlo: Ciemny granat #1E1B2E
- Akcent: Lavender #A78BFA
- Tekst: Bialy #FFFFFF na ciemnym tle
- Success: Zielony #10B981 (WCAG PASS)
- Error: Czerwony #EF4444 (WCAG FAIL)
- Karty: Glassmorphism z rgba(255,255,255,0.08) tlem

MOTYW WIZUALNY:
- Ikona przewodnia: paleta malarska / oko-soczewka / siatka layoutu
- Dribbble shots i Behance projekty jako tlo sekcji (rozmyte, dekoracyjne)
- Floating orbs w kolorze magenta/lavender -- konstelacyjna estetyka
- Animacje przejsc: slide + fade, 300-500ms easing
- Font: Space Grotesk dla naglowkow, Inter dla tresci, JetBrains Mono dla kodu
- Muzyka: Ambient electronic, spokojna ale z energia, BPM 90-110
```

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Stworz pionowa infografike o agencie RESEARCHER UX (R-02) w architekturze wieloagentowej Gold Standard 2026.

FORMAT: 1080x3000px, pionowa, do pobrania jako PNG/PDF
PALETA: Pink/Magenta #EC4899 (glowny), ciemny granat #1E1B2E (tlo), lavender #A78BFA (akcent), bialy #FFFFFF (tekst), zielony #10B981 (success), czerwony #EF4444 (error)
TYPOGRAFIA: Space Grotesk (naglowki), Inter (tresc), JetBrains Mono (kod/dane)

SEKCJA 1 -- NAGLOWEK (0-280px):
- Tytul: "RESEARCHER UX (R-02)" w duzym foncie, kolor #EC4899
- Podtytul: "Kurator Designu w Architekturze Wieloagentowej"
- Badge: "RESEARCH LAYER" i "Gold Standard 2026"
- Ikona: paleta malarska + oko/soczewka w stylu lineart
- Tlo: gradient od #1E1B2E do nieco jasniejszego #2D2640
- Floating orbs dekoracyjne w tle (magenta + lavender, rozmyte)

SEKCJA 2 -- KARTA AGENTA (280-580px):
- Stylizowana karta z glassmorphism (rgba(255,255,255,0.08) tlo, border 1px rgba(255,255,255,0.15))
- Pola karty:
  - ID: R-02
  - Warstwa: RESEARCH (Phase 1 -- rownolegle)
  - Model: Claude Haiku ($0.80 input / $4.00 output za 1M tokenow)
  - Koszt/run: ~$0.08
  - Obciazenie: 50%, obecny w 7 z 27 presetow
  - Kluczowe pytanie: "JAK powinno WYGLADAC?" (duzy font, #EC4899)
- Ikony przy kazdym polu

SEKCJA 3 -- NARZEDZIA I ZAKAZY (580-850px):
- Dwie kolumny:
  - LEWA (zielona ramka #10B981): "DOZWOLONE" -- WebSearch, WebFetch, Read, Grep, Glob (kazde z ikona)
  - PRAWA (czerwona ramka #EF4444): "ZAKAZANE" -- Write, Edit, Bash, Agent (kazde z ikona X)
- Pod spodem cytat: "Narzedzia definiuja role -- bez Write/Edit agent MUSI skupic sie na research"
- Wizualne oddzielenie: linia przerywana miedzy kolumnami

SEKCJA 4 -- ZRODLA BADAN (850-1150px):
- Galeria zrodel w stylu screenshot preview (miniaturki stron):
  - Dribbble (ikona + kolor #EA4C89) -- "Trendy wizualne, koncepty UI"
  - Behance (ikona + kolor #1769FF) -- "Case studies UX, pelne projekty"
  - Awwwards (ikona + kolor #F5DF4D) -- "Nagradzane strony, innowacje"
  - Apple HIG -- "iOS/macOS guidelines, natywne wzorce"
  - Material Design -- "Android/Web guidelines, system komponentow"
  - WCAG -- "Standardy dostepnosci, kontrast, touch targets"
- Kazde zrodlo jako karta z miniatura, nazwa i krotkim opisem
- Strzalki od zrodel do centralnego "MOOD BOARD" elementu

SEKCJA 5 -- MOOD BOARD PREVIEW (1150-1500px):
- Wizualizacja przykladowego mood boardu: siatka 3x2 z miniaturami referencji
- Kazda miniatura z etykieta kategorii: Kolory, Typografia, Layout, Animacje, Spacing, Dostepnosc
- Centralna notatka: "Minimum 5 referencji = SYNTEZA, nie kopiowanie"
- Strzalka od mood boardu do "OUTPUT" sekcji ponizej
- Dekoracja: ramka z przerywana linia, ikona pinezki na kazdej miniaturze

SEKCJA 6 -- WCAG CHECKLIST (1500-1850px):
- Tytul: "Obowiazkowy Audyt Dostepnosci" z ikona checklist
- Lista kontrolna z checkmarkami:
  [x] Kontrast tekstu >= 4.5:1 (normalny) / >= 3:1 (duzy)
  [x] Touch targets >= 44x44px (minimum 24x24px WCAG 2.2)
  [x] Prefers-reduced-motion dla animacji
  [x] Dark mode + Light mode palety
  [x] Focus visible na elementach interaktywnych
  [x] Czytelnosc fontow >= 16px body text
- Wizualizacja kontrastu: slider od 1:1 (czerwony) przez 3:1 (zolty) do 7:1 (zielony)
- Notatka prawna: "European Accessibility Act 2025 -- wymog prawny w UE"
- Przyklad: dwa kola kolorow obok siebie z wynikiem kontrastu

SEKCJA 7 -- WORKFLOW 7 KROKOW (1850-2250px):
- Pionowy flowchart z 7 krokami polaczonymi strzalkami:
  1. Brief od Orkiestratora (ikona koperta, kolor fioletowy)
  2. WebSearch -- rownolegle zapytania (ikona lupa, 5 mini-strzalek)
  3. WebFetch -- glebsze nurkowanie (ikona dokument)
  4. Kategoryzacja wynikow (ikona foldery, 5 kategorii kolorami)
  5. Synteza raportu (ikona puzzle laczace sie)
  6. Dostarczenie przez MANIFEST.md (ikona plik)
  7. Ocena Research Critica (ikona gwiazdka, >= 6/10 = OK, < 6/10 = petla rewizji)
- Timer przy flowcharcie: "60-120 sek" (agent) vs "2-4 godz" (czlowiek)
- Petla rewizji zaznaczona przerywana strzalka od kroku 7 do kroku 2

SEKCJA 8 -- ANTY-WZORCE (2250-2600px):
- Cztery karty z czerwona ramka (#EF4444), kazda z ikona ostrzezenia:
  1. "TREND CHASER" -- zbieranie wszystkiego bez filtrowania
     Ikona: koszyk pelny po brzegi
  2. "NO ACCESSIBILITY" -- pomijanie WCAG
     Ikona: przekreslone oko
  3. "STYLE OVER SUBSTANCE" -- wow > uzytecznosc
     Ikona: iskierki ale zlamany telefon
  4. "MISSING RESPONSIVE" -- brak wersji mobilnej
     Ikona: desktop OK, telefon ze znakiem zapytania
- Pod kazdym anty-wzorcem jednozdaniowy fix w zielonej ramce

SEKCJA 9 -- POROWNANIE Z DESIGNEREM (2600-2800px):
- Tabela porownawcza w dwoch kolumnach:
  - RESEARCHER UX (R-02): Warstwa RESEARCH, Haiku, ZBIERA info, Mood board, Kurator
  - DESIGNER (B-04): Warstwa BUILD, Sonnet, TWORZY design, CSS tokeny, Malarz
- Strzalka od UX do Designera: "Rekomendacje plyna do Designera przez MANIFEST.md"
- Kolorowe rozroznienie: magenta (UX) vs cyan (Designer)

SEKCJA 10 -- STOPKA (2800-3000px):
- Presety z Researcherem UX (7 ikon/badge'ow):
  Accessibility Sprint, Design System, UI/UX Overhaul, Feature Sprint, Standard Dev, SaaS Dev, Full Team
- Cytat koncowy: "Tech bada JAK zbudowac, UX bada JAK powinno WYGLADAC"
- Logo/branding: "Gold Standard 2026 | Agent Teams Configurator"
- Linia: "Researcher UX -- 50% obciazenia, 100% wplywu na wyglad produktu"

STYL GRAFICZNY:
- Konstelacyjna estetyka -- floating orbs, delikatne linie laczace elementy
- Glassmorphism na kartach -- polprzezroczyste tla, rozmyte krawedzie
- Ikony w stylu lineart/outline, kolor #EC4899 lub #A78BFA
- Cienie: box-shadow z rgba(236,72,153,0.2) -- rozowy blask
- Gradienty: liniowe od #EC4899 do #A78BFA na elementach akcentowych
- Separatory miedzy sekcjami: cienka linia rgba(255,255,255,0.1) z dekoracyjnym orb
```

---

*Dokument wygenerowany dla systemu Gold Standard 2026 Multi-Agent AI Architecture.*
*Agent: Researcher UX (R-02) | Warstwa: RESEARCH | Model: Claude Haiku*
