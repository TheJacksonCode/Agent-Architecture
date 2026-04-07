# Five Minds Protocol — Wizualizacja w terminalu Claude Code

## Status: POMYSL / DO ZAPROJEKTOWANIA
## Powiazane: HITL_PIPELINE.md, /five-minds skill

---

## Problem

Gdy skill `/five-minds` lub `/hitl-pipeline` uruchamia debate Five Minds Protocol,
output w terminalu to **sciana tekstu**. User widzi gigantyczny blok Markdowna
bez wizualnego rozroznienia kto mowi, jaka jest faza debaty, gdzie sa konflikty.

## Cel

Zrobic tak, zeby debata Five Minds w terminalu Claude Code wygladala **czytelnie
i atrakcyjnie** — z wyraznym rozroznieniem ekspertow, faz, konfliktow i Gold Solution.

## Jak terminal Claude Code renderuje output

Claude Code wyswietla output w Markdown (CommonMark) z monospace font:
- **Pogrubienie**, *kursywa*, ~~przekreslenie~~ — dzialaja
- `kod inline` i bloki kodu — dzialaja
- Tabele — dzialaja
- Nagłówki ##/### — dzialaja (wizualnie oddzielone)
- Listy (-, 1.) — dzialaja
- Blockquotes (>) — dzialaja (wizualnie oddzielone)
- Separatory (---) — dzialaja
- Unicode emoji/symbole — dzialaja
- Kolory ANSI — NIE dzialaja (to nie raw terminal, to rendered Markdown)

## Propozycja formatu debaty w terminalu

### Faza: Research Brief
```markdown
---
## FIVE MINDS PROTOCOL | [TEMAT]
---

### Research Brief
> [2-3 zdania kontekstu]
> **Punkty decyzyjne:** [lista]
```

### Faza: Pozycje Ekspertow
Kazdy ekspert ma swoj unikalny prefix-emoji i styl:

```markdown
---

### PRAGMATYK | "Ile to kosztuje?"
> Perspektywa: praktyczna wykonalnosc

- **[Stanowisko 1]** — [szczegoly z liczbami]
- **[Stanowisko 2]** — [szczegoly]
- **[Stanowisko 3]** — [szczegoly]

*Nie zgadza sie z: INNOWATOR (koszt vs. jakosc)*

---

### INNOWATOR | "Mozemy byc pierwsi!"
> Perspektywa: nowoczesne rozwiazania

- **[Stanowisko 1]** — [szczegoly]
- **[Stanowisko 2]** — [szczegoly]

*Nie zgadza sie z: PRAGMATYK (ambicja vs. budzet)*

---

### ANALITYK | "Co dane mowia?"
> Perspektywa: dowody i metryki

- **[Stanowisko 1]** — [dane, benchmarki]
- **[Stanowisko 2]** — [liczby]

*Nie zgadza sie z: UZYTKOWNIK (dane vs. intuicja)*

---

### UZYTKOWNIK | "Czy mama by to zrozumiala?"
> Perspektywa: doswiadczenie koncowego uzytkownika

- **[Stanowisko 1]** — [UX argumenty]
- **[Stanowisko 2]** — [prostota]

*Nie zgadza sie z: ANALITYK (empatia vs. metryki)*
```

### Faza: Konflikty
```markdown
---

## KONFLIKTY

| # | Ekspert A | vs | Ekspert B | Sedno sporu |
|---|----------|:--:|----------|-------------|
| 1 | PRAGMATYK | vs | INNOWATOR | Koszt kontra jakosc |
| 2 | ANALITYK | vs | UZYTKOWNIK | Dane kontra intuicja |
| 3 | INNOWATOR | vs | CIEN | Wizja kontra ryzyko |
```

### Faza: Runda Cienia
```markdown
---

### CIEN (Devil's Advocate) | "A co jesli sie mylicie?"

> **Atakuje:** [najsilniejsza pozycje]

**Ukryte ryzyko 1:** [opis]
**Ukryte ryzyko 2:** [opis]
**Falszywe zalozenie:** [opis]

> **WORST CASE:** [co sie stanie jesli wszystko pojdzie nie tak]
```

### Faza: Przelom
```markdown
---

## PRZELOM | [nazwa rozwiazania]

> **Kluczowy insight:** [moment "aha"]

| Ekspert | Co zyskuje |
|---------|-----------|
| Pragmatyk | [konkret] |
| Innowator | [konkret] |
| Analityk | [konkret] |
| Uzytkownik | [konkret] |
| Cien | [zmitygowane ryzyko] |
```

### Faza: Gold Solution
```markdown
---

## GOLD SOLUTION

### Executive Summary
> [3 zdania: co, dlaczego, rezultat]

### Kluczowe Decyzje
1. **[Decyzja 1]** — [konkretna, actionable]
2. **[Decyzja 2]**
3. **[Decyzja 3]**

### Ryzyka i Mitygacje
| Ryzyko | P-stwo | Wplyw | Mitygacja |
|--------|--------|-------|-----------|
| [ryzyko] | Srednie | Wysoki | [dzialanie] |

### Plan Implementacji
- **Etap 1 (teraz):** [co zrobic]
- **Etap 2 (potem):** [co nastepnie]
- **Etap 3 (cel):** [docelowo]
```

### Faza: Glosy ekspertow
```markdown
---

## GLOSY EKSPERTOW

| Ekspert | Werdykt | Komentarz |
|---------|---------|-----------|
| Pragmatyk | Akceptuje z zastrzezeniami | [1-2 zdania] |
| Innowator | Akceptuje | [1-2 zdania] |
| Analityk | Akceptuje | [1-2 zdania] |
| Uzytkownik | Akceptuje z zastrzezeniami | [1-2 zdania] |
| Cien | Akceptuje z zastrzezeniami | [1-2 zdania] |
```

## Implementacja w SKILL.md

Aby Five Minds wyswietlal sie w tym formacie, trzeba:

1. **Zaktualizowac `.claude/skills/five-minds/SKILL.md`** — format outputu debaty
   - Zamiast ogolnych instrukcji "uzyj Markdown" → dac DOKLADNY format jak wyzej
   - Kazdy ekspert ma prefix: `### [ROLA] | "[cytat]"`
   - Konflikty w tabeli zamiast tekstu
   - Gold Solution z tabelami i blockquotes
   - Separatory `---` miedzy fazami

2. **Zapisac wzorcowy output** — stworzyc przykladowy plik z pelna debata
   w docelowym formacie, aby Claude mial referencje

3. **Przetestowac w terminalu** — uruchomic `/five-minds` z prostym tematem
   i sprawdzic jak wyglada rendering w roznych srodowiskach:
   - Claude Code CLI w terminalu
   - Claude Code w VS Code
   - Claude Code web app

## Zaleznosci od wersji HTML

- V25: Symulacja Five Minds z animacjami (nie zwiazana z terminalem)
- Nowa wersja (V26?): mogłaby importowac wyniki `/hitl-pipeline` i wizualizowac
  na canvasie — ale to osobny feature

## Priorytet

WYSOKI — Five Minds to serce calego systemu. Jesli output debaty jest nieczytelny,
user nie podejmie dobrych decyzji na bramach HITL.

## Do zrobienia

- [ ] Zaktualizowac five-minds/SKILL.md o dokladny format Markdown
- [ ] Stworzyc przykladowy output debaty (FIVE_MINDS_EXAMPLE_OUTPUT.md)
- [ ] Przetestowac w terminalu
- [ ] Dodac format do instrukcji w hitl-pipeline/SKILL.md (Faza 3)
