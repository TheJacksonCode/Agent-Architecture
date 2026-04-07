<!-- REFERENCE ONLY — Autorytatywny format jest osadzony w SKILL.md.
     Ten plik sluzy jako dokumentacja/referencja dla ludzi przegladajacych skill. -->

# MANIFEST — Pipeline HITL

## Meta
- **Temat:** [TEMAT]
- **Start:** [TIMESTAMP]
- **Status:** W trakcie | Faza 1/6
- **Model glowny:** [opus/sonnet]
- **Modele subagentow:** [sonnet/haiku]

---

## Faza 1: Strategia

### Analiza tematu
[2-3 zdania opisu problemu/zadania]

### Kluczowe pytania badawcze
1. [Pytanie 1]
2. [Pytanie 2]
3. [Pytanie 3]

### Scope
- **IN:** [co jest w zakresie]
- **OUT:** [co jest poza zakresem]

### Dekompozycja
| Podzadanie | Typ | Priorytet | Zlozonosc |
|-----------|-----|-----------|-----------|
| [Podzadanie 1] | Research | Wysoki | M |
| [Podzadanie 2] | Build | Sredni | L |

---

## Brama 1: Strategia -> Research
- **Wybrana opcja:** [A/B/C — nazwa]
- **Uzasadnienie:** [1-2 zdania]
- **Plik bramy:** `gates/BRAMA_1_strategia_research.md`

---

## Faza 2: Research

### Subagenci uruchomieni
| Agent | Kierunek | Status | Kluczowy wynik |
|-------|---------|--------|----------------|
| Research Tech | [temat] | Zakonczony | [1 zdanie] |
| Research UX | [temat] | Zakonczony | [1 zdanie] |
| Research Community | [temat] | Zakonczony | [1 zdanie] |

### Synteza wynikow
[5-10 zdaniowe podsumowanie: co sie zgadza, co sie rozni, jakie luki]

### Kluczowe fakty
- [Fakt 1 — ze zrodla]
- [Fakt 2]
- [Fakt 3]

---

## Faza 3: Debata Five Minds

### Gold Solution
[3-5 zdaniowe podsumowanie Gold Solution z debaty]

### Kluczowe decyzje z debaty
1. [Decyzja 1]
2. [Decyzja 2]
3. [Decyzja 3]

### Ryzyka zidentyfikowane przez Cienia
- [Ryzyko 1 + mitygacja]
- [Ryzyko 2 + mitygacja]

---

## Brama 2: Debata -> Build
- **Wybrana opcja:** [A/B/C — nazwa]
- **Uzasadnienie:** [1-2 zdania]
- **Plik bramy:** `gates/BRAMA_2_debata_build.md`

---

## Faza 4: Build

### Co zbudowano
[Opis implementacji]

### Pliki utworzone/zmodyfikowane
| Plik | Akcja | Opis |
|------|-------|------|
| [sciezka] | Utworzony | [co robi] |

### Decyzje techniczne
- [Decyzja 1 — dlaczego]
- [Decyzja 2 — dlaczego]

---

## Brama 3: Build -> QA
- **Wybrana opcja:** [A/B/C — nazwa]
- **Uzasadnienie:** [1-2 zdania]
- **Plik bramy:** `gates/BRAMA_3_build_qa.md`

---

## Faza 5: QA

### Wyniki QA
| Kategoria | Issues | Krytyczne | Naprawione |
|-----------|--------|-----------|------------|
| Code Review | [N] | [M] | [K] |
| Security | [N] | [M] | [K] |
| Performance | [N] | [M] | [K] |

### Krytyczne znaleziska
- [Issue 1 — status: naprawiony/otwarty]

---

## Podsumowanie

### Wynik koncowy
[3-5 zdaniowe podsumowanie co osiagnieto]

### Kluczowe decyzje
1. Brama 1: [co wybrano i dlaczego]
2. Brama 2: [co wybrano i dlaczego]
3. Brama 3: [co wybrano i dlaczego]

### Rekomendacje na przyszlosc
- [Rekomendacja 1]
- [Rekomendacja 2]

### Metryki
- **Czas trwania:** [od startu do konca]
- **Subagentow uruchomionych:** [N]
- **Faz zakonczonych:** 6/6
- **Bram decyzyjnych:** 3/3

---

## Log Decyzji

| Brama | Opcja | Czas namyslu | Deep dive? | Timestamp |
|-------|-------|-------------|------------|-----------|
| 1: Strategia->Research | [A/B/C] | [szybka/deep] | [Tak/Nie] | [timestamp] |
| 2: Debata->Build | [A/B/C] | [szybka/deep] | [Tak/Nie] | [timestamp] |
| 3: Build->QA | [A/B/C] | [szybka/deep] | [Tak/Nie] | [timestamp] |
