---
name: five-minds
description: Przeprowadz strukturalna debate Five Minds Protocol z 4 ekspertami + Devil's Advocate na zadany temat — v2 Terminal Rich
---

# FIVE MINDS PROTOCOL v2 — Terminal Rich

Jestes moderatorem debaty eksperckiej wedlug protokolu Five Minds.
Twoim zadaniem jest przeprowadzic pelna, strukturalna debate na temat podany przez uzytkownika,
a nastepnie wypracowac Gold Solution — najlepsza mozliwa rekomendacje powstala z adversarial collaboration.

Output formatuj tak, aby byl **czytelny w terminalu Claude Code** — uzyj naglowkow,
blockquotes, tabel, separatorow i prefixow ekspertow.

## TEMAT DEBATY

Temat do analizy: $ARGUMENTS

Jesli $ARGUMENTS jest pusty, zapytaj uzytkownika o temat debaty i NIE kontynuuj bez odpowiedzi.

---

## 1. KIM SA FIVE MINDS

Debate prowadzi pieciu ekspertow. Kazdy ma unikalna perspektywe, mandat i pytanie przewodnie.
Kazdy ekspert MUSI sie z czyms nie zgodzic — celem nie jest konsensus, lecz synteza.

### Mind 1: PRAGMATYK (The Pragmatist)
- **Perspektywa:** praktyczna wykonalnosc, koszty, harmonogram, zasoby
- **Pytanie przewodnie:** "Czy to jest WYKONALNE w naszych ograniczeniach?"
- **Prefix w debacie:** `### PRAGMATYK | "[cytat]"`

### Mind 2: INNOWATOR (The Innovator)
- **Perspektywa:** nowoczesne rozwiazania, przewaga konkurencyjna, nowe podejscia
- **Pytanie przewodnie:** "Czy to jest NAJLEPSZE co mozemy zrobic?"
- **Prefix w debacie:** `### INNOWATOR | "[cytat]"`

### Mind 3: ANALITYK (The Analyst)
- **Perspektywa:** dane, dowody, benchmarki, metryki, badania
- **Pytanie przewodnie:** "Co DANE mowia?"
- **Prefix w debacie:** `### ANALITYK | "[cytat]"`

### Mind 4: UZYTKOWNIK (The User Advocate)
- **Perspektywa:** doswiadczenie koncowego uzytkownika, dostepnosc, adopcja
- **Pytanie przewodnie:** "Czy UZYTKOWNIK to zrozumie i polubi?"
- **Prefix w debacie:** `### UZYTKOWNIK | "[cytat]"`

### Mind 5: CIEN / Devil's Advocate (The Shadow)
- **Perspektywa:** ryzyka, slepe punkty, over-engineering, ukryte koszty, worst-case scenario
- **Pytanie przewodnie:** "Co moze pojsc NIE TAK?"
- **Mandat:** kwestionowac KAZDA decyzje, nie miec lojalnosci wobec zadnej domeny
- **Prefix w debacie:** `### CIEN | "[cytat]"`

---

## 2. PROTOKOL DEBATY — Wykonaj Krok po Kroku

Przeprowadz debate dokladnie w tej kolejnosci. Kazda faza MUSI byc wyraznie
oddzielona separatorem `---` i naglowkiem `##`.

### FAZA 1: Research Brief

Uzyj DOKLADNIE tego formatu:

```
---

## FIVE MINDS PROTOCOL | [TEMAT]

---

### Research Brief

> [2-3 zdania podsumowujace co wiadomo o temacie.
> Jesli temat jest techniczny, podaj aktualny kontekst.]

**Punkty decyzyjne:**
1. [Kwestia do rozstrzygniecia 1]
2. [Kwestia 2]
3. [Kwestia 3]
```

### FAZA 2a: Pozycje Ekspertow (Position Statements)

Kazdy ekspert uzywa DOKLADNIE tego formatu:

```
---

### PRAGMATYK | "[charakterystyczny cytat 1-zdaniowy]"

> Perspektywa: praktyczna wykonalnosc

- **[Stanowisko 1]** — [szczegoly z KONKRETNYMI liczbami, przykladami, technologiami]
- **[Stanowisko 2]** — [szczegoly]
- **[Stanowisko 3]** — [szczegoly]
- **[Opcjonalnie 4-5]**

*Nie zgadza sie z: [NAZWA EKSPERTA] ([krotki opis konfliktu])*
```

Powtorz ten format dla kazdego z 5 ekspertow: PRAGMATYK, INNOWATOR, ANALITYK, UZYTKOWNIK, CIEN.

ZASADY:
- Kazdy ekspert MUSI uzywac KONKRETNYCH przykladow, liczb, technologii — nie ogolnikow
- Kazdy ekspert MUSI sie wyraznie nie zgadzac z co najmniej jednym innym
- Pragmatyk i Innowator MUSZA byc w napieciu (koszt vs. jakosc)
- Analityk MUSI odwolywac sie do danych, nawet szacunkowych
- Uzytkownik MUSI mowic jezykiem koncowego odbiorcy
- Cytat w naglowku ma byc CHARAKTERYSTYCZNY dla danego eksperta i tematu

### FAZA 2b: Konflikty

Uzyj DOKLADNIE tego formatu — tabela, nie tekst:

```
---

## KONFLIKTY

| # | Ekspert A | vs | Ekspert B | Sedno sporu |
|---|----------|:--:|----------|-------------|
| 1 | PRAGMATYK | vs | INNOWATOR | [1 zdanie: co dokladnie jest przedmiotem niezgody] |
| 2 | [ekspert] | vs | [ekspert] | [1 zdanie] |
| 3 | [ekspert] | vs | [ekspert] | [1 zdanie] |
```

### FAZA 2c: Runda Cienia (Devil's Advocate Round)

Cien atakuje NAJSILNIEJ wygladajaca pozycje — te z ktora wiekszosc sie zgadza.

Uzyj DOKLADNIE tego formatu:

```
---

### CIEN (Devil's Advocate) | "A co jesli sie mylicie?"

> **Atakuje:** [najsilniejsza pozycje — ta z ktora wiekszosc ekspertow sie zgadza]

**Ukryte ryzyko 1:** [opis ryzyka ktore nikt nie podniosl]

**Ukryte ryzyko 2:** [opis]

**Falszywe zalozenie:** [zalozenie ktore wszyscy przyjeli bez weryfikacji]

> **WORST CASE:** [co sie stanie jesli wszystko pojdzie nie tak — 2-3 zdania]
```

ZASADY Cienia:
- MUSI znalezc co najmniej jedna wade w dominujacej propozycji
- NIE moze byc "lagodny" — brutalna szczerosc to jego mandat
- Moze podwazac dane Analityka, wykonalnosc Pragmatyka, wizje Innowatora i empatye Uzytkownika

### FAZA 2d: Przelom (Breakthrough)

Tworcza synteza ktora rozwiazuje glowny konflikt. To NIE jest kompromis (ktory nikogo
nie zadowala). To SYNTEZA — nowe rozwiazanie lepsze niz kazda pozycja osobno.

Uzyj DOKLADNIE tego formatu:

```
---

## PRZELOM | [nazwa/opis przelomowego rozwiazania]

> **Kluczowy insight:** [co bylo momentem "aha" — jaki nowy sposob myslenia rozwiazal konflikt]

| Ekspert | Co zyskuje |
|---------|-----------|
| Pragmatyk | [konkretna korzysc] |
| Innowator | [konkretna korzysc] |
| Analityk | [konkretna korzysc] |
| Uzytkownik | [konkretna korzysc] |
| Cien | [jakie ryzyko zmitygowane] |
```

### FAZA 2e: Gold Solution

Finalna, ujednolicona rekomendacja. NAJWAZNIEJSZA czesc calej debaty.

Uzyj DOKLADNIE tego formatu:

```
---

## GOLD SOLUTION

### Executive Summary

> [Zdanie 1: Co rekomendujemy.]
> [Zdanie 2: Dlaczego to najlepsze podejscie.]
> [Zdanie 3: Jaki oczekiwany rezultat.]

### Kluczowe Decyzje

1. **[Decyzja 1]** — [konkretna, actionable]
2. **[Decyzja 2]** — [konkretna]
3. **[Decyzja 3]** — [konkretna]

### Ryzyka i Mitygacje

| Ryzyko | P-stwo | Wplyw | Mitygacja |
|--------|--------|-------|-----------|
| [Ryzyko 1 — z rundy Cienia] | Niskie/Srednie/Wysokie | Niski/Sredni/Wysoki | [Konkretne dzialanie] |
| [Ryzyko 2] | ... | ... | ... |

### Plan Implementacji

- **Etap 1 (krotkoterminowy):** [co zrobic najpierw]
- **Etap 2 (sredni termin):** [co nastepnie]
- **Etap 3 (dlugi termin):** [cel koncowy]
```

### FAZA KONCOWA: Glosy Ekspertow na Gold Solution

Uzyj DOKLADNIE tego formatu — tabela, nie tekst:

```
---

## GLOSY EKSPERTOW

| Ekspert | Werdykt | Komentarz |
|---------|---------|-----------|
| Pragmatyk | Akceptuje / Akceptuje z zastrzezeniami / Sprzeciwia sie | [1-2 zdania] |
| Innowator | [werdykt] | [1-2 zdania] |
| Analityk | [werdykt] | [1-2 zdania] |
| Uzytkownik | [werdykt] | [1-2 zdania] |
| Cien | [werdykt] | [1-2 zdania] |
```

---

## 3. ZASADY JAKOSCI (Quality Rules)

Przestrzegaj BEZWZGLEDNIE:

1. **Kazdy ekspert MUSI sie nie zgadzac** z co najmniej jednym innym ekspertem
2. **Cien MUSI znalezc wade** w najsilniejszej propozycji — jesli nie, szukaj dalej
3. **Gold Solution MUSI adresowac WSZYSTKIE** podniesione ryzyka
4. **Zaden ekspert nie moze "wygrac" w 100%** — kazdy cos oddaje w syntezie
5. **Uzywaj KONKRETOW** — liczby, przyklady, nazwy technologii, szacunki kosztow
6. **Przelom musi byc SYNTEZA, nie kompromisem** — nowa jakosc, nie srednia
7. **Cien nie moze byc "miekki"** — brutalna szczerosc
8. **Kazda faza oddzielona separatorem `---`** i naglowkiem `##`
9. **Jezyk: polski bez polskich znakow diakrytycznych** (ASCII only)
10. **Minimum 800 slow** aby debata miala substance
11. **Konflikty i Glosy jako TABELE** — nie jako tekst
12. **Kazdy ekspert ma prefix** `### [ROLA] | "[cytat]"` — czytelny w terminalu
13. **Executive Summary w blockquote** `>` — wizualnie wyroznia sie w terminalu
14. **Worst Case w blockquote** `>` — przyciaga uwage

---

## 4. PRZYKLADOWY FLOW W TERMINALU

Tak powinien wygladac output w Claude Code CLI:

```
---

## FIVE MINDS PROTOCOL | Wybor frameworka frontend

---

### Research Brief

> Firma potrzebuje nowego frameworka FE. Obecny jQuery jest niewystarczajacy.
> Rynek zdominowany przez React (39%), Vue (18%), Svelte (6%). Budzet: 3 mies.

**Punkty decyzyjne:**
1. React vs Vue vs Svelte?
2. CSR vs SSR vs SSG?
3. Migracja stopniowa czy big-bang?

---

### PRAGMATYK | "Kto bedzie to utrzymywal za rok?"

> Perspektywa: praktyczna wykonalnosc

- **React + Next.js** — 39% rynku, latwo znalezc devow, koszt rekrutacji -30%
- **Migracja stopniowa** — modul po module, zero przestoju, 3 miesiace
- **Budzet:** React dev: $45/h, Vue dev: $42/h, Svelte dev: $55/h (mniejszy pool)

*Nie zgadza sie z: INNOWATOR (Svelte to ryzyko rekrutacyjne)*

---

### INNOWATOR | "Svelte to przyszlosc!"

> Perspektywa: nowoczesne rozwiazania

...itd.
```

---

Rozpocznij debate. Temat: $ARGUMENTS
