# Designer (B-02) — Agent Implementacji Wizualnej

## Warstwa BUILD / WIZUALIZACJA | Poziom 3 w 5-poziomowej hierarchii
## Model: Claude Sonnet ($3/$15 za 1M tokenow) | Obciazenie: 75/100

---

# Spis tresci

1. [Wprowadzenie — Kim jest Designer?](#1-wprowadzenie)
2. [Kluczowe Obowiazki](#2-kluczowe-obowiazki)
3. [Design Tokeny — Jezyk Designera](#3-design-tokeny)
4. [Format outputu — Co Designer produkuje](#4-format-outputu)
5. [Czego Designer NIE robi](#5-czego-designer-nie-robi)
6. [Model i Koszt](#6-model-i-koszt)
7. [Narzedzia](#7-narzedzia)
8. [Workflow — Od mood boardu do CSS](#8-workflow)
9. [Designer vs Researcher UX — Kluczowa roznica](#9-designer-vs-researcher-ux)
10. [Anty-wzorce](#10-anty-wzorce)
11. [Najlepsze Praktyki](#11-najlepsze-praktyki)
12. [Podsumowanie + Quick Reference Card + Glossary](#12-podsumowanie)

---

# 1. Wprowadzenie — Kim jest Designer?

Designer (B-02) to agent odpowiedzialny za **implementacje wizualna** w warstwie BUILD architektury Gold Standard 2026. Otrzymuje raporty od Researcher UX — mood boardy, analizy trendow, audyty dostepnosci — i przeksztalca je w **dzialajacy kod CSS**, design tokeny, palety kolorow, systemy typografii i animacje.

Designer jest **mostem miedzy wizualna inspiracja a dzialajacym kodem**. Bez niego masz piekny raport od Researcher UX, ktorego nikt nie implementuje, i Kodera piszacego funkcjonalny, ale brzydki HTML.

> **Czy wiesz, ze...?**
> Cytat z dokumentacji Orkiestratora mowi wprost: *"Orkiestrator NIE projektuje interfejsow. Nie dobiera kolorow, nie rysuje layoutow. Od tego jest Designer."*

## Trzy analogie pomagajace zrozumiec role Designera

**Analogia 1 — Architekt wnetrz:** Klient przychodzi z mood boardem — zdjecia z Pinteresta, wycinki z magazynow. Mowi: "Chce skandynawski minimalizm." Ale to architekt wnetrz wybiera **dokladny odcien** farby, **dokladna tkanine** na kanapie, **dokladny typ** oswietlenia. Mood board to wizja — architekt wnetrz to realizacja. Tak samo Designer otrzymuje raport "Trend to glassmorphism" i tworzy CSS: `backdrop-filter: blur(12px)`.

**Analogia 2 — Kolorysta filmowy:** Operator kamery (Researcher UX) kreci surowy material z wizja artystyczna. Ale to kolorysta w postprodukcji (Designer) naklada **faktyczne** krzywe kolorow, kontrast i nastroj. Surowy material to raport UX. Gotowy film po color gradingu to design system w CSS.

**Analogia 3 — Zecer w drukarni:** Redaktor decyduje o tresci. Dyrektor artystyczny wyznacza kierunek wizualny. Ale to zecer sprawia, ze tekst jest **fizycznie piekny na stronie**: fonty, odstepy, marginesy, interlinia. Zecer nie pisze tresci — sprawia, ze tresc wyglada profesjonalnie.

> **Uwaga!**
> Designer to agent **implementacji**, nie **badania**. Nie szuka inspiracji, nie analizuje trendow. To robi Researcher UX. Designer **buduje** na podstawie tego, co Researcher UX **zbadal**.

---

# 2. Kluczowe Obowiazki

## 2.1 Implementacja Design Systemu

Designer tworzy kompletny design system — spojny zbior tokenow, regul i komponentow gwarantujacy wizualna jednosc projektu.

```css
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-secondary: #7c3aed;
  --color-accent: #f59e0b;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-code: 'JetBrains Mono', monospace;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
}
```

> **Czy wiesz, ze...?**
> Z dokumentacji Syntetyka: *"Design System: Paleta: Slate + Amber accent, Typografia: Inter (body), JetBrains Mono (code), Spacing: 4px grid"*. To przyklad gotowego outputu Designera uzywany przez wszystkich agentow BUILD.

## 2.2 Definiowanie Palety Kolorow

| Kategoria | Token | Wartosc | Zastosowanie |
|-----------|-------|---------|-------------|
| Primary | `--color-primary` | #2563eb | Glowne przyciski, linki |
| Secondary | `--color-secondary` | #7c3aed | Drugorzedne akcje |
| Accent | `--color-accent` | #f59e0b | Wyroznienia |
| Neutral 50 | `--color-neutral-50` | #f8fafc | Tlo strony |
| Neutral 900 | `--color-neutral-900` | #0f172a | Tekst glowny |
| Success | `--color-success` | #16a34a | Komunikaty sukcesu |
| Error | `--color-error` | #dc2626 | Komunikaty bledow |
| Warning | `--color-warning` | #f59e0b | Ostrzezenia |

## 2.3 Definiowanie Systemu Typografii

```css
:root {
  --text-xs: 0.75rem;   --text-sm: 0.875rem;  --text-base: 1rem;
  --text-lg: 1.125rem;  --text-xl: 1.25rem;   --text-2xl: 1.5rem;
  --text-3xl: 1.875rem; --text-4xl: 2.25rem;
  --leading-tight: 1.25; --leading-normal: 1.5;
  --font-weight-normal: 400; --font-weight-semibold: 600; --font-weight-bold: 700;
}
h1 { font-size: var(--text-4xl); line-height: var(--leading-tight); font-weight: var(--font-weight-bold); }
h2 { font-size: var(--text-3xl); line-height: var(--leading-tight); font-weight: var(--font-weight-semibold); }
```

## 2.4 Implementacja Layoutu i Spacing

```css
.container { max-width: 1200px; margin-inline: auto; padding-inline: var(--space-4); }

.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

@media (max-width: 768px) {
  .grid-auto { grid-template-columns: 1fr; gap: var(--space-4); }
}
```

## 2.5 Tworzenie Animacji i Mikro-interakcji

```css
.card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* KRYTYCZNE: respektowanie preferencji uzytkownika */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

> **Czy wiesz, ze...?**
> Z dokumentacji Syntetyka: *"Research UX wskazuje trend mikro-animacji, Designer juz uwzglednil w tokenach"*. Researcher UX identyfikuje trend, Designer go implementuje.

## 2.6 Zapewnienie Dostepnosci Wizualnej

Designer **implementuje** wymagania dostepnosci w kodzie — kontrast min. 4.5:1, focus visible, docelowe rozmiary dotyku:

```css
:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
button, a, input { min-height: 44px; min-width: 44px; }
```

---

# 3. Design Tokeny — Jezyk Designera

Design tokeny to **fundamentalny jezyk** Designera — zmienne CSS przechowujace wartosci designu w jednym miejscu.

## Czym sa design tokeny?

Pomysl o tokenach jak o **slowniczku kolorow, rozmiarow i odleglosci**. Zamiast pisac `#2563eb` w 47 miejscach, definiujesz token `--color-primary: #2563eb` i uzywasz go wszedzie. Zmiana w jednym miejscu propaguje sie na caly projekt. To jak centralny panel sterowania estetyka calej aplikacji.

## Konwencja nazewnictwa

```
--{kategoria}-{element}-{modyfikator}
--color-primary            --color-primary-hover
--font-body                --space-4               --shadow-lg
```

## Trzy poziomy tokenow

| Poziom | Nazwa | Przyklad | Opis |
|--------|-------|----------|------|
| 1 | Primitive | `--blue-500: #3b82f6` | Surowe wartosci |
| 2 | Semantic | `--color-primary: var(--blue-500)` | Znaczenie w UI |
| 3 | Component | `--button-bg: var(--color-primary)` | Zastosowanie w komponencie |

```css
/* Poziom 1: Primitive */
:root { --blue-600: #2563eb; --slate-900: #0f172a; --amber-500: #f59e0b; }

/* Poziom 2: Semantic */
:root { --color-primary: var(--blue-600); --color-text: var(--slate-900); --color-accent: var(--amber-500); }

/* Poziom 3: Component */
.button { --button-bg: var(--color-primary); --button-text: white; }
```

> **Czy wiesz, ze...?**
> Dzieki trzem poziomom tokenow mozesz zmienic caly motyw kolorystyczny aplikacji, modyfikujac TYLKO poziom 2. Zmiana `--color-primary` z niebieskiego na zielony automatycznie aktualizuje wszystkie przyciski, linki i akcenty.

## Przeplyw tokenow w systemie

```
Researcher UX              Designer                    Koder
    |                          |                          |
    | "Trend: Slate + Amber"   |                          |
    |------------------------->|                          |
    |                          | Primitive tokens          |
    |                          | Semantic tokens           |
    |                          | Component tokens          |
    |                          |------------------------->|
    |                          |                          | Uzywa tokenow
```

---

# 4. Format Outputu — Co Designer Produkuje

Kompletny output Designera obejmuje 9 kategorii:

```css
/* ============================================
   DESIGN SYSTEM — Gold Standard 2026
   Generated by Designer (B-02)
   ============================================ */

/* 1. Color Tokens */
:root {
  --color-primary: #2563eb;     --color-primary-hover: #1d4ed8;
  --color-secondary: #7c3aed;   --color-accent: #f59e0b;
  --color-bg: #f8fafc;          --color-bg-elevated: #ffffff;
  --color-text: #0f172a;        --color-text-secondary: #475569;
  --color-success: #16a34a;     --color-error: #dc2626;
  --color-warning: #f59e0b;     --color-border: #e2e8f0;
}

/* 2. Typography */
:root {
  --font-body: 'Inter', system-ui, sans-serif;
  --font-code: 'JetBrains Mono', monospace;
}

/* 3. Spacing (4px base) */
:root {
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem;
  --space-4: 1rem;    --space-6: 1.5rem; --space-8: 2rem;
  --space-12: 3rem;   --space-16: 4rem;
}

/* 4. Shadows */
:root {
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1);
}

/* 5. Border Radius */
:root {
  --radius-sm: 0.25rem; --radius-md: 0.5rem;
  --radius-lg: 0.75rem; --radius-xl: 1rem; --radius-full: 9999px;
}

/* 6. Layout */
.container { max-width: 1200px; margin-inline: auto; padding-inline: var(--space-4); }

/* 7. Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }

/* 8. Component Styling */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: var(--space-2) var(--space-4); font-size: var(--text-sm);
  border-radius: var(--radius-md); transition: all 0.15s ease;
  min-height: 44px; cursor: pointer; border: none;
}
.btn-primary { background: var(--color-primary); color: white; }
.btn-primary:hover { background: var(--color-primary-hover); box-shadow: var(--shadow-md); }

/* 9. Accessibility */
:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
```

---

# 5. Czego Designer NIE Robi

| Zadanie | Kto to robi | Dlaczego NIE Designer |
|---------|------------|----------------------|
| Szukanie inspiracji | Researcher UX (R-02) | Warstwa RESEARCH, nie BUILD |
| Analiza trendow | Researcher UX (R-02) | Wymaga WebSearch/WebFetch |
| Pisanie kodu logicznego (JS) | Koder (B-01) | Designer pisze CSS, nie logike |
| Pisanie tresci | Redaktor (B-03) | Osobna specjalizacja |
| Integracja komponentow | Integrator (B-04) | Laczy prace calego BUILD |
| Decyzje strategiczne | Orkiestrator (O-01) | Poziom 0, nie poziom 3 |

> **Uwaga!**
> *"Designer, ktory jednoczesnie szuka inspiracji I pisze CSS, ma za duzo w oknie kontekstowym"* — cytat z dokumentacji Researcher UX. Wlasnie dlatego badanie i implementacja to **osobne agenty**.

Pomysl o kucharzu, ktory jednoczesnie jedzie na targ po skladniki, gotuje obiad i sprawdza jakosc dan. Bedzie przytloczony. Dlatego w profesjonalnej kuchni sa osobne role — tak samo w architekturze agentowej.

---

# 6. Model i Koszt

## Dlaczego Sonnet?

| Cecha | Haiku | Sonnet | Opus |
|-------|-------|--------|------|
| Koszt (input/output za 1M) | $0.25/$1.25 | **$3/$15** | $15/$75 |
| Jakosc CSS | Niespojny | **Niezawodnie poprawny** | Doskonaly, ale drogi |
| Zgodnosc z WCAG | Czesto pomija | **Konsekwentnie spelnia** | Zawsze spelnia |
| Warstwa | RESEARCH | **BUILD** | ORCHESTRATION |

> **Czy wiesz, ze...?**
> Haiku czesto generuje niespojny CSS — losowe wartosci zamiast tokenow, ignoruje `prefers-reduced-motion`, tworzy palety niespelniajace kontrastu WCAG 4.5:1. Sonnet robi to **niezawodnie** poprawnie.

## Rozklad kosztow

| Parametr | Wartosc |
|----------|---------|
| Input | 15 000 — 30 000 tokenow |
| Output | 8 000 — 20 000 tokenow |
| Koszt za zadanie | $0.10 — $0.35 |
| Czas trwania | 30 — 60 sekund |
| Wywolania na run | 1 — 2 |

## Porownanie z innymi agentami BUILD

| Agent | Model | Typowy koszt | Obciazenie |
|-------|-------|-------------|-----------|
| Koder (B-01) | Sonnet | $0.10-$0.40 | 85/100 |
| **Designer (B-02)** | **Sonnet** | **$0.10-$0.35** | **75/100** |
| Redaktor (B-03) | Sonnet | $0.05-$0.15 | 50/100 |
| Integrator (B-04) | Sonnet | $0.10-$0.30 | 70/100 |

---

# 7. Narzedzia

## Dozwolone narzedzia

| Narzedzie | Zastosowanie |
|-----------|-------------|
| **Write** | Tworzenie nowych plikow CSS, design tokenow |
| **Edit** | Modyfikacja istniejacych plikow CSS |
| **Read** | Czytanie raportu Researcher UX, MANIFEST.md |
| **Bash** | Kompilacja Sass, linting CSS, sprawdzanie kontrastu |

```bash
# Przyklady uzycia Bash przez Designera
sass styles.scss styles.css          # Kompilacja Sass
npx stylelint "**/*.css"             # Linting CSS
npx prettier --write "**/*.css"      # Formatowanie
```

## Zabronione narzedzia

| Narzedzie | Dlaczego zabronione |
|-----------|-------------------|
| **Agent** | Designer nie orkiestruje — to rola Orkiestratora |
| **WebSearch** | Szukanie informacji to domena Researcher UX |
| **WebFetch** | Pobieranie zasobow z internetu to domena RESEARCH |

> **Uwaga!**
> Zakaz WebSearch/WebFetch to **kluczowa granica architektoniczna**. Gdyby Designer mogl szukac w internecie, zacalby laczyc badanie z implementacja — przeladowanie kontekstu i gorsza jakosc obu zadan.

---

# 8. Workflow — Od Mood Boardu do CSS

```
KROK 1: Odczytaj raport Researcher UX         [Read → UX_report.md]
    |
KROK 2: Odczytaj MANIFEST.md                  [Read → MANIFEST.md]
    |
KROK 3: Zdefiniuj primitive tokens             [--blue-500, --slate-900...]
    |
KROK 4: Zdefiniuj semantic tokens              [--color-primary, --color-bg...]
    |
KROK 5: Zaimplementuj typografie               [font families, scale]
    |
KROK 6: Zaimplementuj layout i spacing         [Grid, Flexbox, 4px grid]
    |
KROK 7: Zaimplementuj animacje                 [transitions + reduced-motion]
    |
KROK 8: Sprawdz dostepnosc i dostarcz          [kontrast, focus → Write CSS]
    |
    v
    [OUTPUT: Kompletny design system w CSS]
```

### System Prompt Designera

```
Jestes Designerem. Implementujesz decyzje designowe w CSS/design tokeny.
Na podstawie raportu Researcher UX i MANIFEST.md:
1. Zdefiniuj palete kolorow (CSS custom properties)
2. Zdefiniuj typografie (font families, scale)
3. Zdefiniuj spacing system (base unit, scale)
4. Zaimplementuj layout (CSS Grid/Flexbox)
5. Zaimplementuj animacje (z prefers-reduced-motion)
Output: kompletny design system w CSS + aplikacja na komponenty.
```

> **Czy wiesz, ze...?**
> Designer czyta **dwa kluczowe dokumenty** na wejsciu: raport Researcher UX (co zaimplementowac) i MANIFEST.md (kontekst projektu). To jego caly "brief".

---

# 9. Designer vs Researcher UX — Kluczowa Roznica

To **najwazniejsza sekcja** tego przewodnika. Zrozumienie tej roznicy jest kluczowe dla calej architektury.

## Tabela porownawcza

| Aspekt | Researcher UX (R-02) | Designer (B-02) |
|--------|----------------------|-----------------|
| **Warstwa** | RESEARCH (poziom 2) | BUILD (poziom 3) |
| **Pytanie kluczowe** | "Jak to powinno wygladac?" | "Jak to zrobic w CSS?" |
| **Output** | Raport + mood board | Dzialajacy CSS + tokeny |
| **Narzedzia** | WebSearch, WebFetch, Read | Write, Edit, Read, Bash |
| **Szuka w internecie?** | TAK | NIE |
| **Pisze CSS?** | NIE | TAK |
| **Analizuje trendy?** | TAK | NIE |

## Przyklady przeplywu

**Glassmorphism:**
1. Researcher UX szuka "glassmorphism UI trend 2026", zbiera 5 przykladow
2. Designer czyta raport i implementuje:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

**Dostepnosc:**
1. Researcher UX bada: "WCAG 2.2 wymaga kontrastu 4.5:1"
2. Designer zapewnia zgodnosc:
```css
/* Sprawdzony kontrast:
   --color-text (#0f172a) na --color-bg (#f8fafc) = 17.4:1
   --color-text-secondary (#475569) na --color-bg (#f8fafc) = 7.1:1
*/
```

**Typografia:**
1. Researcher UX rekomenduje: "Inter dla tekstu, JetBrains Mono dla kodu"
2. Designer implementuje kompletny system z `@font-face` i skala rozmiarow

## Dlaczego sa OSOBNYMI agentami?

**Przeladowanie kontekstu:** Agent laczacy WebSearch + pisanie CSS ma za duzo w oknie kontekstowym. Jakosc kazdego zadania spada.

**Bias potwierdzenia:** Agent badawczy, ktory jednoczesnie implementuje, moze szukac trendow pasujacych do CSS, ktory juz napisal.

**Rownolegle wykonywanie:** Researcher UX moze badac kolory, podczas gdy Designer implementuje typografie na podstawie **poprzedniego** raportu.

> **Uwaga!**
> *"Designer, ktory jednoczesnie szuka inspiracji I pisze CSS, ma za duzo w oknie kontekstowym"* — to nie jest arbitralna decyzja, to **architektoniczna koniecznosc**.

---

# 10. Anty-wzorce

## 10.1 Projektowanie bez badania

```css
/* ZLE — Designer zgaduje kolory bez raportu UX */
:root { --color-primary: red; /* Dlaczego? Brak uzasadnienia */ }

/* DOBRZE — na podstawie raportu */
/* Per: UX Report v2.3, sekcja "Color Recommendations" */
:root { --color-primary: #2563eb; /* Blue-600, rekomendacja UX */ }
```

> **Uwaga!**
> Designer bez raportu Researcher UX to architekt wnetrz bez briefa — moze cos zaprojektowac, ale nie wiadomo, czy pasuje do potrzeb.

## 10.2 Dostepnosc na koniec

```css
/* ZLE — paleta bez myslenia o kontrasccie */
:root { --color-text: #b0b0b0; /* Na bialym tle: kontrast 2.3:1 FAIL */ }

/* DOBRZE — dostepnosc od poczatku */
:root { --color-text: #0f172a; /* Na #f8fafc: 17.4:1 PASS */ }
```

## 10.3 Niespojne tokeny

```css
/* ZLE — mix tokenow i wartosci bezposrednich */
.card { padding: 24px; border-radius: 8px; background: #ffffff; }

/* DOBRZE — konsekwentne uzycie tokenow */
.card {
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
}
```

## 10.4 Przeciazenie animacjami

```css
/* ZLE — wszystko sie rusza, brak reduced-motion */
.card { animation: bounce 0.5s infinite; }
.button { animation: pulse 1s infinite; }

/* DOBRZE — umiarkowane animacje z fallbackiem */
.card { transition: transform 0.2s ease; }
.card:hover { transform: translateY(-2px); }
@media (prefers-reduced-motion: reduce) { .card { transition: none; } }
```

## 10.5 Design tylko na desktop

```css
/* ZLE — zawsze 4 kolumny */
.grid { grid-template-columns: repeat(4, 1fr); }

/* DOBRZE — mobile-first */
.grid { grid-template-columns: 1fr; }
@media (min-width: 640px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(4, 1fr); } }
```

---

# 11. Najlepsze Praktyki

## 11.1 Zawsze zaczynaj od tokenow

Przed napisaniem jakiegokolwiek komponentu, zdefiniuj kompletny zbior tokenow. Tokeny sa fundamentem calego design systemu — bez nich komponenty beda niespojne.

```css
/* KROK 1: Najpierw tokeny */
:root { --color-primary: #2563eb; --space-4: 1rem; --radius-md: 0.5rem; }

/* KROK 2: Potem komponenty uzywajace tokenow */
.button {
  background: var(--color-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
}
```

## 11.2 Komentuj decyzje designowe

```css
:root {
  /* Primary: Blue-600, rekomendacja UX per trend analysis (Q1 2026) */
  --color-primary: #2563eb;
  /* Font: Inter — najlepsza czytelnosc na ekranach (UX Report 4.2) */
  --font-body: 'Inter', system-ui, sans-serif;
}
```

## 11.3 Projektuj mobile-first

Zawsze zaczynaj od layoutu mobilnego i dodawaj breakpointy dla wiekszych ekranow. Uzywaj `min-width`, nie `max-width` — to gwarantuje, ze bazowy styl dziala na kazdym urzadzeniu.

```css
/* Mobile-first: domyslnie 1 kolumna */
.layout { display: grid; grid-template-columns: 1fr; gap: var(--space-4); }

@media (min-width: 768px) { .layout { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1200px) { .layout { grid-template-columns: repeat(3, 1fr); } }
```

## 11.4 prefers-reduced-motion ZAWSZE

Kazda animacja **musi** miec alternatywe dla uzytkownikow z wrazliwoscia na ruch. Bez wyjatkow. To nie jest "milý bonus" — to wymaganie dostepnosci.

```css
.element { transition: transform 0.3s ease, opacity 0.3s ease; }

/* OBOWIAZKOWE przy kazdej animacji */
@media (prefers-reduced-motion: reduce) {
  .element { transition: none; }
}
```

## 11.5 Uzyj semantycznych nazw tokenow

```css
/* ZLE */   .button { background: var(--blue-600); }
/* DOBRZE */ .button { background: var(--color-primary); }
```

## 11.6 Definiuj system cieni (elevation)

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1);
}
.card { box-shadow: var(--shadow-sm); }
.card:hover { box-shadow: var(--shadow-md); }
.modal { box-shadow: var(--shadow-xl); }
```

## 11.7 Testuj w Bash

```bash
npx wcag-contrast "#0f172a" "#f8fafc"   # Sprawdz kontrast
npx stylelint "design-system.css"        # Lintuj CSS
```

## 11.8 Dokumentuj relacje miedzy tokenami

```css
/*  TOKEN DEPENDENCY MAP:
    Primitive        Semantic              Component
    --blue-600  -->  --color-primary  -->  --button-bg
    --slate-50  -->  --color-bg       -->  --card-bg
    --amber-500 -->  --color-accent   -->  --badge-bg        */
```

---

# 12. Podsumowanie

## Kto to jest?

Designer (B-02) to agent implementacji wizualnej w warstwie BUILD. Przeksztalca raporty Researcher UX w dzialajacy design system oparty na CSS custom properties.

## Kluczowa wartosc

**Bez Designera:** raporty UX nikt nie implementuje, Koder pisze brzydki kod, brak mostu miedzy wizja a kodem.

**Z Designerem:** raporty UX przeksztalcane w CSS, spojny design system z tokenami, dostepnosc w kodzie, Koder dostaje gotowe tokeny.

## Pozycja w hierarchii

```
Poziom 0: Orkiestrator ──── strategia
Poziom 1: Analityk + Planer ──── planowanie
Poziom 2: 6x Researchers (w tym UX) ──── badanie
Poziom 3: Koder + DESIGNER + Redaktor + Integrator ──── BUDOWANIE  <-- TUTAJ
Poziom 4: QA Security + QA Quality + Manager QA ──── jakosc
```

---

## Quick Reference Card

```
+----------------------------------------------------------+
|           DESIGNER (B-02) -- QUICK REFERENCE              |
+----------------------------------------------------------+
|                                                           |
|  Warstwa:    BUILD / WIZUALIZACJA (Poziom 3)              |
|  Model:      Claude Sonnet ($3/$15 za 1M tokenow)        |
|  Obciazenie: 75/100                                       |
|                                                           |
|  NARZEDZIA:                                               |
|  [+] Write, Edit, Read, Bash                              |
|  [-] Agent, WebSearch, WebFetch                           |
|                                                           |
|  INPUT:                                                   |
|  - Raport Researcher UX (mood board, trendy, a11y)        |
|  - MANIFEST.md (kontekst projektu)                        |
|                                                           |
|  OUTPUT (9 kategorii):                                    |
|  1. CSS custom properties (design tokens)                 |
|  2. Paleta kolorow (primary, semantic, neutral)           |
|  3. Skala typografii (h1-h6, body, code)                  |
|  4. Spacing system (siatka 4px)                           |
|  5. Layout system (Grid, Flexbox, breakpointy)            |
|  6. Shadow system (sm, md, lg, xl)                        |
|  7. Border radius (sm, md, lg, full)                      |
|  8. Animacje + prefers-reduced-motion                     |
|  9. Component styling (button, card, input)               |
|                                                           |
|  KOSZT: $0.10-$0.35 / zadanie | CZAS: 30-60s             |
|  TOKENY: 15k-30k input / 8k-20k output                   |
|                                                           |
|  ZASADA: Designer IMPLEMENTUJE, Researcher UX BADA.       |
|  Nigdy nie lacz obu rol w jednym agencie.                 |
|                                                           |
+----------------------------------------------------------+
```

---

## Glossary

| Termin | Definicja |
|--------|----------|
| **Design token** | Zmienna CSS przechowujaca wartosc designu (kolor, rozmiar, font). Umozliwia centralne zarzadzanie stylem. |
| **CSS custom property** | Natywna zmienna CSS: `--nazwa: wartosc;` uzywana przez `var(--nazwa)`. Mechanizm tokenow. |
| **Primitive token** | Token najnizszego poziomu — surowa wartosc, np. `--blue-500: #3b82f6`. |
| **Semantic token** | Token przypisujacy znaczenie UI, np. `--color-primary: var(--blue-500)`. |
| **Component token** | Token przypisany do komponentu, np. `--button-bg: var(--color-primary)`. |
| **Design system** | Spojny zbior tokenow, regul i komponentow gwarantujacy wizualna jednosc. |
| **Mood board** | Kolekcja inspiracji wizualnych tworzonych przez Researcher UX jako brief dla Designera. |
| **WCAG** | Web Content Accessibility Guidelines — kontrast min. 4.5:1 (AA) lub 7:1 (AAA). |
| **prefers-reduced-motion** | Media query wykrywajace wylaczone animacje w systemie. Designer MUSI to respektowac. |
| **Spacing system** | System odleglosci oparty na siatce 4px. Wielokrotnosci: 4, 8, 12, 16, 24, 32, 48, 64. |
| **Elevation** | Wizualne wrazenie glebokosci elementu przez cienie. Wyzszy cien = blizej uzytkownika. |
| **Breakpoint** | Prog szerokosci ekranu zmieniajacy layout. Typowe: 480px, 768px, 1024px. |
| **Mobile-first** | Strategia: domyslne style dla najwezszego ekranu, breakpointy dodaja style dla wiekszych. |
| **Backdrop-filter** | Wlasciwosc CSS dla efektow na tle elementu (np. rozmycie glassmorphism). |
| **Sass** | Preprocesor CSS z zmiennymi, mixinami, zagniezdaniem. Kompilowany przez Bash. |

---

## Zrodla

- Dokumentacja Orkiestratora (Gold Standard 2026) — rola Designera w hierarchii
- Dokumentacja Syntetyka — przyklady outputu Designera i przeplyw z Researcher UX
- Dokumentacja Planera — faza BUILD i kolejnosc agentow
- Dokumentacja Researcher UX — uzasadnienie separacji badania od implementacji
- WCAG 2.2 Guidelines — wymagania dostepnosci implementowane przez Designera

---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz prezentacje wideo (5-7 minut) o Designerze (B-02) — agencie implementacji wizualnej w architekturze Gold Standard 2026.

**Hook otwierajacy (0:00-0:30):**
"Piekny design, ktory zyje tylko w PDF-ie, jest bezwartosciowy. Design, ktory zyje w CSS — to jest produkt." Pokaz dwa ekrany obok siebie: po lewej mood board w PDF, po prawej pusta strona HTML. Animacja: mood board "wplywa" w HTML i zamienia sie w dzialajacy interfejs.

**Czesc 1 — Kim jest Designer? (0:30-1:30):**
Trzy analogie wizualne: architekt wnetrz, kolorysta filmowy, zecer w drukarni. Kazda jako krotka animacja split-screen.

**Czesc 2 — Transformacja: mood board do CSS (1:30-3:30):**
Krok po kroku: raport UX z lewej → strzalka → CSS custom properties po prawej. Tokeny "nakladaja sie" na surowy HTML — strona ozywia. Wizualizacja trzech poziomow tokenow jako piramida.

**Czesc 3 — Designer vs Researcher UX (3:30-4:30):**
Animowana tabela porownawcza. Researcher UX z lupa (szuka) vs Designer z pedzelkiem (implementuje). Przeplyw: Researcher UX znajduje "glassmorphism" → Designer pisze `backdrop-filter: blur(12px)`.

**Czesc 4 — 9 outputow Designera (4:30-5:30):**
Karuzela 9 kategorii z przykladami kodu: tokeny, paleta, typografia, spacing, layout, cienie, border-radius, animacje, komponenty.

**Czesc 5 — Anty-wzorce i praktyki (5:30-6:30):**
"5 grzechow glownych" z wizualna demonstracja bledu i naprawy. Czerwone X na blednym kodzie, zielony checkmark na poprawnym.

**Zamkniecie (6:30-7:00):**
"Design w CSS to produkt." Quick Reference Card jako ostatni slajd.

**Styl wizualny:** Jasny/bialy motyw z gradientowymi akcentami (rozowy-fioletowy-niebieski). Fonty: Inter + JetBrains Mono. Duzo bialej przestrzeni, czyste linie.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike edukacyjna o Designerze (B-02) — agencie implementacji wizualnej w architekturze Gold Standard 2026.

**Naglowek:** "Designer (B-02) — Most Miedzy Wizja a Kodem" z ikona pedzelka/CSS. Podtytul: "Agent implementacji wizualnej | Warstwa BUILD | Poziom 3".

**Sekcja 1 — Transformacja Mood Board do CSS:** Po lewej mood board (kolory, zdjecia, fonty), strzalka "Designer", po prawej blok CSS z design tokenami.

**Sekcja 2 — 9 Outputow:** Siatka 3x3: (1) Design Tokens, (2) Color Palette, (3) Typography Scale, (4) Spacing System, (5) Layout System, (6) Shadow System, (7) Border Radius, (8) Animations, (9) Components.

**Sekcja 3 — Piramida Tokenow:** Trzy poziomy: Primitive (dol), Semantic (srodek), Component (gora) ze strzalkami dziedziczenia.

**Sekcja 4 — Showcase palety:** Pionowy pasek 10 kolorow Slate + Amber z etykietami tokenow i hex.

**Sekcja 5 — Skala typografii:** Rozmiary od --text-xs do --text-5xl w foncie Inter + --font-code w JetBrains Mono.

**Sekcja 6 — Siatka Spacing:** Wizualizacja 4px base grid: 4, 8, 12, 16, 24, 32, 48, 64px.

**Sekcja 7 — Designer vs Researcher UX:** Dwie kolumny z avatarami i kluczowymi roznicami.

**Sekcja 8 — Anty-wzorce:** 5 ikon z czerwonymi krzyzykami.

**Sekcja 9 — Quick Stats:** Badge: Sonnet, $0.10-$0.35, 30-60s, 75/100, 4 narzedzia.

**Stopka:** "Gold Standard 2026" z linia postepu (Poziom 3 z 5).

**Styl:** Biale tlo + gradient (rozowy-fioletowy-niebieski) + ciemny tekst (#0f172a). Inter + JetBrains Mono. Kolory akcentowe: #ec4899, #8b5cf6, #3b82f6.
