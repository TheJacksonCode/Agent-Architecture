# Manager QA (Q-03) — Sedzia Jakosci w Architekturze Multi-Agent

## Przewodnik edukacyjny | Gold Standard 2026

---

# 1. Wprowadzenie — Kim jest Manager QA?

Manager QA (Q-03) to agent odpowiedzialny za **synteze raportow audytowych** i podejmowanie
**ostatecznej decyzji GO/NO-GO** o wdrozeniu artefaktu. Dziala w warstwie QA/AUDYT (Level 4)
— najwyzszej warstwie architektury — jako **punkt konwergencji** wszystkich danych jakosciowych.

To jedyny agent w calej warstwie QA, ktory uzywa modelu **Claude Sonnet** zamiast Haiku.
Dlaczego? Poniewaz jego praca wymaga rozumowania, syntezy i oceny — a nie dopasowywania
wzorcow. Q-01 i Q-02 szukaja konkretnych bledow. Q-03 musi zrozumiec pelny obraz,
zwazyc ryzyka i podjac decyzje.

## Trzy analogie, zeby zrozumiec role

### Analogia 1: Sedzia na sali sadowej

Wyobraz sobie sale sadowa. Prokurator (QA Security / Q-01) przedstawia dowody zagrozenia
— podatnosci, luki bezpieczenstwa, wektory ataku. Obronca (QA Quality / Q-02) prezentuje
stan kodu — czytelnosc, poprawnosc, zgodnosc ze specyfikacja. Ale to **sedzia** podejmuje
ostateczna decyzje: winny (NO-GO) czy niewinny (GO). Sedzia nie prowadzi sledztwa sam.
Nie przesluchuje swiadkow w terenie. Slucha obu stron, wazy dowody i wydaje wyrok.
Dokladnie tak dziala Manager QA — syntetyzuje, ocenia, decyduje.

### Analogia 2: Redaktor naczelny gazety

Dziennikarz sledczy (Q-01) przynosi artykul o skandalu bezpieczenstwa. Reporter dzialu
jakosci (Q-02) dostarcza recenzje techniczna produktu. Redaktor naczelny nie pisal
zadnego z tych artykulow. Ale to ON decyduje: czy artykul idzie do druku? Czy wymaga
poprawek? Czy jest zbyt ryzykowny, zeby go opublikowac? Redaktor widzi **calosc wydania**
— nie tylko pojedynczy tekst. Manager QA widzi **calosc artefaktu** — nie tylko bezpieczenstwo
albo jakosc, ale jedno I drugie naraz.

### Analogia 3: Kontroler lotow

Na wiezy kontroli lotow laca sie dane z wielu radarow: pogoda, ruch powietrzny,
stan pasa startowego, komunikaty od pilotow. Kontroler lotow nie leci samolotem.
Nie naprawia radaru. Nie prognozuje pogody. Ale to on — na podstawie danych z wielu
zrodel — mowi pilotowi: "cleared to land" (GO) albo "go around" (NO-GO).
Jedna zla decyzja i katastrofa. Manager QA to kontroler lotow dla artefaktow.

> **Czy wiesz, ze...?**
> Manager QA jest **JEDYNYM** agentem w calej architekturze, ktory widzi ZAROWNO raport
> bezpieczenstwa (Q-01), JAK I raport jakosci (Q-02). Zaden inny agent nie ma dostepu
> do obu raportow jednoczesnie. To celowa decyzja architektoniczna — jeden punkt syntezy,
> jeden punkt decyzji, pelna widocznosc.

> **Uwaga!**
> Manager QA **NIE audytuje kodu bezposrednio**. Nie otwiera plikow zrodlowych.
> Nie skanuje pod katem XSS. Nie sprawdza czytelnosci. Czyta WYLACZNIE raporty
> od Q-01 i Q-02, a nastepnie syntetyzuje je w decyzje. Gdyby sam auditowal,
> Q-01 i Q-02 bylyby zbedne — a rozdzielenie analizy od decyzji to fundament systemu.

---

# 2. Kluczowe Obowiazki

Manager QA (Q-03) realizuje **6 fundamentalnych obowiazkow**:

## 2.1 Agregacja raportow (Report Aggregation)

Zbieranie i laczenie raportow od dwoch niezaleznych audytorow: QA Security (Q-01)
i QA Quality (Q-02). Kazdy raport ma inny format, inne priorytety, inna perspektywe.
Zadaniem Q-03 jest zbudowanie spojnego obrazu z dwoch czesciowych widokow.

```json
{
  "input_reports": {
    "security_report": {
      "source": "QA Security (Q-01)",
      "findings_count": 4,
      "critical": 1,
      "high": 2,
      "medium": 1,
      "recommendation": "BLOKADA WDROZENIA"
    },
    "quality_report": {
      "source": "QA Quality (Q-02)",
      "findings_count": 8,
      "critical": 0,
      "high": 1,
      "medium": 4,
      "low": 3,
      "recommendation": "WDROZENIE Z ZASTRZEZENIAMI"
    }
  }
}
```

## 2.2 Priorytetyzacja znalezien (Priority Determination)

Wszystkie znalezienia z obu raportow sa rankingowane w jednej, spojnej liscie
wedlug hierarchii: **CRITICAL > HIGH > MEDIUM > LOW**. W ramach tego samego poziomu,
znalezienia bezpieczenstwa maja priorytet nad jakosciowymi (bo exploity sa pilniejsze
niz brak komentarzy w kodzie).

## 2.3 Planowanie kolejnosci napraw (Fix Order Planning)

Q-03 nie tylko wymienia problemy — okresla **optymalna kolejnosc napraw** z uwzglednieniem
zaleznosci. Jesli naprawa podatnosci XSS wymaga refaktoryzacji komponentu, ktory ma
osobny blad jakosciowy — naprawia sie oba naraz, zamiast dwoch osobnych cykli.

```json
{
  "fix_order": [
    {
      "priority": 1,
      "id": "QM-001",
      "source": "Q-01/SEC-001",
      "issue": "CRITICAL XSS w UserProfile.js:42",
      "depends_on": [],
      "estimated_effort": "30 min"
    },
    {
      "priority": 2,
      "id": "QM-002",
      "source": "Q-01/SEC-002",
      "issue": "HIGH hardcoded API key w api.js:8",
      "depends_on": [],
      "estimated_effort": "15 min"
    },
    {
      "priority": 3,
      "id": "QM-003",
      "source": "Q-02/QLT-001",
      "issue": "HIGH brak walidacji inputu w FormHandler.js",
      "depends_on": ["QM-001"],
      "estimated_effort": "45 min"
    }
  ]
}
```

## 2.4 Decyzja GO/NO-GO (Deployment Gate Decision)

Finalna, binarna decyzja: czy artefakt jest gotowy do wdrozenia. Oparta na skali 1-10
z jasno zdefiniowanym progiem. Decyzja jest uzasadniona, udokumentowana i przekazana
Orkiestratorowi. To **najwazniejszy obowiazek** Q-03 — cala reszta sluzy tej jednej chwili.

## 2.5 Kontrola procesu iteracyjnego (Iterative Process Control)

Jesli decyzja to NO-GO, Q-03 zleca naprawy i kontroluje cykl iteracyjny.
Maksymalnie 2 iteracje — potem eskalacja. Q-03 pilnuje, aby system nie utknal
w nieskonczonej petli poprawek i ponownych audytow.

## 2.6 Komunikacja ryzyka (Risk Communication)

Jasne, czytelne, actionable raporty do Orkiestratora. Bez zargonu, bez dwuznacznosci.
Orkiestrator musi w 30 sekund zrozumiec: co jest zle, jak to naprawic, ile to kosztuje
(czas/tokeny), i czy mozna wdrozyc.

> **Czy wiesz, ze...?**
> W profesjonalnych organizacjach IT, rola "Quality Gate" — osoby lub systemu, ktory
> wydaje ostateczna decyzje o wdrozeniu — jest jednym z kluczowych elementow DevOps.
> Manager QA pelni dokladnie te role w architekturze agentowej. W firmach takich jak
> Google czy Microsoft, code review i deployment gates sa obowiazkowe od dekad.

---

# 3. Czego Manager QA NIE robi

Rownie wazne jak obowiazki sa **wyrazne granice odpowiedzialnosci**:

| Czynnosc                              | Kto to robi?              | Dlaczego NIE Manager QA?                          |
|----------------------------------------|---------------------------|---------------------------------------------------|
| Audyt bezpieczenstwa kodu              | QA Security (Q-01)        | Q-03 syntetyzuje raporty, nie analizuje kodu       |
| Audyt jakosci kodu                     | QA Quality (Q-02)         | Q-03 czyta wyniki audytow, nie przeprowadza ich    |
| Naprawianie kodu                       | Koder (po zleceniu Ork.)  | Q-03 decyduje, nie implementuje                    |
| Uruchamianie testow                    | QA Quality (Q-02)         | Q-03 nie ma dostepu do Bash — nie moze uruchomic   |
| Decyzje architektoniczne               | Orkiestrator              | Q-03 ocenia artefakt, nie projektuje architekture  |
| Komunikacja z Q-01 lub Q-02 bezp.     | ZABRONIONA                | Q-03 czyta raporty — nie konsultuje sie z autorami |
| Skanowanie plikow zrodlowych           | Q-01 i Q-02               | Q-03 nie ma Grep/Glob — nie skanuje kodu           |

> **Uwaga!**
> Manager QA to **decydent, nie wykonawca**. Jesli Q-03 zacznie sam audytowac kod,
> to po co nam Q-01 i Q-02? Rozdzielenie analiz od decyzji to fundament systemu.
> Sedzia nie prowadzi sledztwa. Redaktor naczelny nie pisze artykulow.
> Kontroler lotow nie pilotuje samolotu.

---

# 4. Framework decyzyjny GO/NO-GO

## Skala oceny 1-10

| Wynik | Znaczenie                      | Decyzja  | Akcja                                    |
|-------|--------------------------------|----------|------------------------------------------|
| 10    | Perfekcyjny, zero uwag         | GO       | Wdrozenie natychmiast                    |
| 9     | Doskonaly, minimalne uwagi     | GO       | Wdrozenie z opcjonalnymi poprawkami      |
| 8     | Dobra jakosc, akceptowalny     | GO       | Wdrozenie, drobne poprawki w nastepnej   |
| 7     | Akceptowalny, zarzadzalne ryzyko| GO      | Wdrozenie z monitoringiem                |
| 6     | Graniczny (PROG)               | GO*      | Wdrozenie warunkowe — wymaga uzasadnienia|
| 5     | Problemy istnieja              | NO-GO    | Naprawy wymagane przed wdrozeniem        |
| 4     | Powazne problemy               | NO-GO    | Istotne naprawy, ponowny audyt           |
| 3     | Krytyczne blokery              | NO-GO    | Krytyczne naprawy, pelny re-audyt        |
| 2     | Wiele krytycznych awarii       | NO-GO    | Powazna naprawa, rozwazyc przepisanie    |
| 1     | Calkowita porazka              | NO-GO    | Odrzucenie, eskalacja do Orkiestratora   |

*Wynik 6 = prog decyzyjny. >= 6 to GO, < 6 to NO-GO.

## Wplyw severity na wynik

Kazdy artefakt startuje z wynikiem **10.0** i traci punkty za znalezienia:

| Severity | Odejmowane punkty | Przyklad                                          |
|----------|-------------------|---------------------------------------------------|
| CRITICAL | -3.0 za kazde     | XSS, SQL Injection, hardcoded secrets              |
| HIGH     | -1.0 za kazde     | Brak autentykacji, prompt injection                |
| MEDIUM   | -0.5 za kazde     | Brak CSP, niekompletna walidacja                   |
| LOW      | -0.1 za kazde     | Brak komentarzy, naming conventions                |

### Przyklad kalkulacji wyniku

```
Baza:                          10.0
Q-01 znalazl 1x CRITICAL:     -3.0  (XSS w UserProfile.js)
Q-01 znalazl 2x HIGH:         -2.0  (hardcoded key + brak auth)
Q-02 znalazl 1x HIGH:         -1.0  (brak walidacji inputu)
Q-02 znalazl 3x MEDIUM:       -1.5  (brak testow, naming, docs)
Q-02 znalazl 5x LOW:          -0.5  (drobne uwagi stylistyczne)
                               -----
WYNIK KONCOWY:                  2.0  -> NO-GO (ponizej progu 6)
```

## Warunki blokujace (automatyczny NO-GO)

Niezaleznie od wyniku liczbowego, nastepujace warunki wymuszaja decyzje NO-GO:

| Warunek blokujacy                     | Dlaczego?                                         |
|---------------------------------------|---------------------------------------------------|
| Jakiekolwiek znalezienie CRITICAL     | Jeden exploit = potencjalna katastrofa             |
| Wiele HIGH + regresje                 | Regresja = cofniecie sie, trend negatywny          |
| Pokrycie testami < 70%               | Brak testow = brak gwarancji poprawnosci           |
| Niezalatana podatnosc bezpieczenstwa  | Znana luka = otwarty wektor ataku                  |

### Drzewo decyzyjne (ASCII)

```
                    START: Zbierz raporty Q-01 + Q-02
                                   |
                    +-----------------------------+
                    | Czy sa znalezienia CRITICAL? |
                    +-----------------------------+
                       /                    \
                     TAK                    NIE
                      |                      |
                  NO-GO              +-----------------+
                  (auto)             | Oblicz wynik    |
                                     | 10.0 - kary     |
                                     +-----------------+
                                            |
                              +-------------------------+
                              | Czy wynik >= 6.0?       |
                              +-------------------------+
                                 /                \
                               TAK               NIE
                                |                 |
                        +------------+      +-----------+
                        | Czy sa inne|      | NO-GO     |
                        | blokery?   |      | Zlec napr.|
                        +------------+      +-----------+
                          /        \
                        NIE       TAK
                         |         |
                        GO      NO-GO
```

> **Czy wiesz, ze...?**
> Jeden finding CRITICAL to -3 punkty, co oznacza, ze nawet idealny artefakt z jednym
> CRITICAL issue dostanie maksymalnie 7.0 — GO, ale z duzym napriezeniem.
> Dwa CRITICAL to juz 4.0 — automatyczny NO-GO. System jest celowo surowy,
> bo koszty przeoczenia sa wielokrotnie wyzsze niz koszty dodatkowej iteracji.

---

# 5. Model i Koszt

## Dlaczego Sonnet (a NIE Haiku)?

Manager QA to **jedyny agent QA** uzywajacy modelu Claude Sonnet. Pozostali (Q-01, Q-02)
uzywaja Haiku. Dlaczego ta roznica?

| Aspekt                  | Q-01/Q-02 (Haiku)                    | Q-03 (Sonnet)                          |
|-------------------------|---------------------------------------|----------------------------------------|
| **Typ pracy**           | Pattern matching, checklista          | Synteza, rozumowanie, ocena            |
| **Input**               | Kod zrodlowy — wzorce do wykrycia     | Dwa pelne raporty — do porownania      |
| **Output**              | Lista znalezien                       | Decyzja + uzasadnienie + plan napraw   |
| **Zlozonosc**           | Skanowanie wedlug regul               | Wazenie ryzyk, balansowanie priorytetow|
| **Analogia**            | Skaner bagazu (mechaniczny)           | Sedzia (interpretacyjny)               |

Haiku jest doskonaly do pracy: "czy ten wzorzec pasuje?" (tak/nie).
Sonnet jest potrzebny do pracy: "majac te 12 znalezien z dwoch roznych perspektyw,
jaka jest optymalna kolejnosc napraw i czy mozna wdrozyc?"

## Koszt porownawczy

| Parametr                | Q-01 (Haiku)     | Q-02 (Haiku)     | Q-03 (Sonnet)    |
|-------------------------|-------------------|-------------------|-------------------|
| Model                   | Claude Haiku      | Claude Haiku      | Claude Sonnet 4.6 |
| Koszt Input (1M tok.)   | $0.80             | $0.80             | $3.00             |
| Koszt Output (1M tok.)  | $4.00             | $4.00             | $15.00            |
| Token budget (input)    | 1,000 - 3,000     | 1,000 - 3,000     | 1,500 - 4,000     |
| Token budget (output)   | 500 - 1,500       | 500 - 1,500       | 800 - 2,000       |
| Token budget (total)    | 2,000 - 5,000     | 2,000 - 5,000     | 2,300 - 6,000     |
| Koszt na zadanie        | $0.02 - $0.08     | $0.02 - $0.08     | $0.08 - $0.20     |

### Calkowity koszt pipeline QA (jeden cykl)

```
Q-01 (Security audit):    $0.02 - $0.08
Q-02 (Quality audit):     $0.02 - $0.08
Q-03 (Synthesis + GO/NO-GO): $0.08 - $0.20
                           ----------------
TOTAL per cycle:           $0.12 - $0.36
TOTAL per 2 cycles (max):  $0.24 - $0.72
```

> **Czy wiesz, ze...?**
> Caly pipeline QA (3 agenty, do 2 iteracji) kosztuje maksymalnie $0.72.
> To mniej niz jedna kawa. A w zamian dostajesz audyt bezpieczenstwa,
> audyt jakosci, synteze, i decyzje GO/NO-GO. Profesjonalny code review
> przez czlowieka kosztuje $100-$500 za sesje. Stosunek jakosci do ceny
> jest bezkonkurencyjny.

### Obciazenie (Load): 50/100

Q-03 ma obciazenie 50 — identyczne jak Q-01 i Q-02. Mimo uzycia mocniejszego modelu,
sama praca Q-03 nie jest obliczeniowo ciezsza. Czyta dwa raporty (kazdorazowo kilka
tysiecy tokenow), syntetyzuje je i generuje decyzje. To praca koncepcyjna wymagajaca
**jakosci rozumowania**, nie **ilosci przetwarzania**.

---

# 6. Narzedzia — Minimalistyczny zestaw

## Dostepne narzedzia — TYLKO DWA

| Narzedzie | Funkcja                                  | Uzycie przez Q-03                          |
|-----------|------------------------------------------|--------------------------------------------|
| **Read**  | Odczyt plikow                            | Czytanie raportow od Q-01 i Q-02           |
| **Write** | Zapis plikow                             | Tworzenie raportu syntezy i decyzji GO/NO-GO|

To najmniejsi zestaw narzedzi wsrod WSZYSTKICH agentow w architekturze (razem z Plannerem).
Dwa narzedzia — i nic wiecej. Minimalizm jest tu swiadoma decyzja projektowa.

## Zabronione narzedzia — i DLACZEGO

| Narzedzie    | Dlaczego zabronione?                                                           |
|--------------|--------------------------------------------------------------------------------|
| **Edit**     | Q-03 tworzy NOWY dokument syntezy — nie edytuje istniejacych raportow          |
| **Grep**     | Q-03 nie skanuje kodu — od tego sa Q-01 i Q-02                                |
| **Glob**     | Q-03 nie szuka plikow — czyta KONKRETNE raporty, ktorych lokalizacje zna       |
| **Bash**     | Q-03 nie uruchamia kodu, testow, ani komend systemowych                        |
| **Agent**    | Q-03 nie deleguje — jest koncowym punktem decyzyjnym                           |
| **WebSearch**| Q-03 nie szuka informacji w internecie — wszystkie dane ma w raportach          |
| **WebFetch** | Jak wyzej — caly kontekst pochodzi z raportow Q-01 i Q-02                      |

### Dlaczego Read + Write (a nie Read-Only)?

Q-01 i Q-02 maja dostep TYLKO do odczytu (Read, Grep, Glob) — bo sa audytorami.
Q-03 ma dodatkowo **Write**, poniewaz musi STWORZYC dokument decyzji. Raport syntezy
to nowy artefakt — nie modyfikacja istniejacego kodu. Write sluzy tu wylacznie do
zapisu raportu decyzyjnego, nie do modyfikacji audytowanego kodu.

> **Uwaga!**
> Q-03 nie potrzebuje Grep ani Glob, poniewaz **nie analizuje kodu zrodlowego**.
> Jego wejsciem sa raporty JSON od Q-01 i Q-02 — a ich lokalizacja jest znana
> z gory (okreslona przez pipeline). Q-03 robi Read na dwoch konkretnych plikach,
> przetwarza je intelektualnie, i robi Write na jednym pliku wyjsciowym.
> Trzy operacje plikowe — to wszystko.

---

# 7. Format raportu syntezy

## Pelny szablon JSON raportu decyzyjnego

```json
{
  "agent": "Manager QA (Q-03)",
  "timestamp": "2026-04-01T15:45:00Z",
  "artifact_id": "ART-2026-0401-001",
  "iteration": 1,
  "decision": "NO-GO",
  "score": 3.5,
  "summary": {
    "total_issues": 21,
    "from_security": 4,
    "from_quality": 17,
    "critical_count": 1,
    "high_count": 3,
    "medium_count": 5,
    "low_count": 12,
    "blocking_conditions_met": ["CRITICAL issue found", "Security vulnerability unfixed"]
  },
  "priorities": [
    {
      "rank": 1,
      "id": "QM-001",
      "source": "Q-01/SEC-001",
      "severity": "CRITICAL",
      "issue": "XSS vulnerability — innerHTML z niezanityzowanym inputem",
      "location": "src/components/UserProfile.js:42",
      "impact": "Mozliwosc kradzizy sesji uzytkownika"
    },
    {
      "rank": 2,
      "id": "QM-002",
      "source": "Q-01/SEC-002",
      "severity": "HIGH",
      "issue": "Hardcoded Stripe API key",
      "location": "src/config/api.js:8",
      "impact": "Wyciek klucza platnosci"
    },
    {
      "rank": 3,
      "id": "QM-003",
      "source": "Q-01/SEC-003",
      "severity": "HIGH",
      "issue": "Brak autentykacji na endpoincie admin",
      "location": "src/api/routes.js:15",
      "impact": "Nieautoryzowany dostep do danych"
    },
    {
      "rank": 4,
      "id": "QM-004",
      "source": "Q-02/QLT-001",
      "severity": "HIGH",
      "issue": "Brak walidacji inputu w formularzu rejestracji",
      "location": "src/forms/Register.js:28",
      "impact": "Bledne dane w bazie"
    }
  ],
  "fix_order": [
    {
      "step": 1,
      "ids": ["QM-001"],
      "rationale": "CRITICAL — natychmiastowa naprawa, brak zaleznosci"
    },
    {
      "step": 2,
      "ids": ["QM-002", "QM-003"],
      "rationale": "Oba HIGH, niezalezne — mozna naprawic rownolegle"
    },
    {
      "step": 3,
      "ids": ["QM-004"],
      "rationale": "HIGH jakosciowy, zalezy od refaktoryzacji komponentu z kroku 1"
    }
  ],
  "blocking_issues": [
    "QM-001: CRITICAL XSS — automatyczny bloker wdrozenia",
    "Niezalatana podatnosc bezpieczenstwa (hardcoded key)"
  ],
  "recommendation": "NO-GO. 1 CRITICAL + 3 HIGH. Wymagane naprawy przed iteracja 2.",
  "next_action": "Odesla artefakt do Kodera z fix_order. Po naprawach — ponowny audyt Q-01+Q-02.",
  "ready_for_deployment": false
}
```

## Struktura dokumentu syntezy

Raport Q-03 sklada sie z 7 sekcji:

1. **Naglowek** — agent, timestamp, artifact_id, numer iteracji
2. **Decyzja** — GO/NO-GO + wynik liczbowy
3. **Podsumowanie** — ilosc znalezien per severity, per zrodlo
4. **Priorytety** — wszystkie znalezienia w jednej posortowanej liscie
5. **Kolejnosc napraw** — plan z uwzglednieniem zaleznosci
6. **Blokery** — ktore znalezienia uniemozliwiaja wdrozenie
7. **Rekomendacja** — co dalej (naprawa, eskalacja, wdrozenie)

### Metodologia priorytetyzacji

```
Priorytet = Severity (waga 60%) + Zrodlo (waga 20%) + Zaleznosciowy wplyw (waga 20%)

Severity scoring:
  CRITICAL = 100, HIGH = 70, MEDIUM = 40, LOW = 10

Zrodlo scoring (przy tym samym severity):
  Security finding = +10 (exploit jest pilniejszy niz blad logiczny)
  Quality finding  = +0

Zaleznosciowy wplyw:
  Blokuje inne naprawy = +15
  Niezalezny           = +0
```

> **Czy wiesz, ze...?**
> Prefiks QM-xxx (Quality Manager) jest uzywany WYLACZNIE przez Q-03
> i odroznaia znalezienia zsyntezowane od oryginalnych. Q-01 uzywa SEC-xxx,
> Q-02 uzywa QLT-xxx. Kazdy agent ma swoj wlasny namespace — nie ma kolizji
> identyfikatorow. QM-001 zawsze wskazuje na synteze, nie na oryginal.

---

# 8. Workflow — Cykl iteracyjny QA

## Pelny pipeline QA

```
                        INTEGRATOR (I-01)
                     kompletuje artefakt
                             |
                             v
              +-----------------------------+
              |     WARSTWA QA (Level 4)    |
              |                             |
              |   +--------+  +--------+   |
              |   | Q-01   |  | Q-02   |   |
              |   |Security|  |Quality |   |
              |   +--------+  +--------+   |
              |       \          /          |
              |        v        v           |
              |    +---------------+        |
              |    | Q-03          |        |
              |    | Manager QA    |        |
              |    | SYNTEZA       |        |
              |    | GO/NO-GO     |        |
              |    +---------------+        |
              +-----------------------------+
                             |
                    +--------+--------+
                    |                 |
                   GO              NO-GO
                    |                 |
                    v                 v
             ORKIESTRATOR      ORKIESTRATOR
             (wdrozenie)       (zleca naprawy)
                                     |
                                     v
                                  KODER
                               (naprawia)
                                     |
                                     v
                              POWROT DO QA
                              (iteracja 2)
```

## Szczegolowy przebieg iteracji

### Iteracja 1

```
Krok 1: Integrator (I-01) kompletuje artefakt z czesci zbudowanych przez Kodera
        |
Krok 2: Q-01 i Q-02 otrzymuja artefakt ROWNOLEGLE
        |  (Q-01 skanuje bezpieczenstwo)
        |  (Q-02 audytuje jakosc)
        |  (Nie wiedza o sobie nawzajem!)
        |
Krok 3: Oba raporty trafiaja do Q-03
        |
Krok 4: Q-03 czyta oba raporty (Read x2)
        |
Krok 5: Q-03 syntetyzuje, oblicza wynik, decyduje
        |
Krok 6: Q-03 zapisuje raport decyzji (Write x1)
        |
Krok 7a: Jesli GO -> Orkiestrator wdraza artefakt
Krok 7b: Jesli NO-GO -> Orkiestrator przekazuje fix_order do Kodera
```

### Iteracja 2 (jesli potrzebna)

```
Krok 8:  Koder naprawia bledy wg fix_order z Q-03
         |
Krok 9:  Integrator ponownie kompletuje artefakt
         |
Krok 10: Q-01 i Q-02 audytuja PONOWNIE (pelny re-audyt)
         |
Krok 11: Q-03 porownuje nowe raporty z poprzednimi
         |
Krok 12a: Jesli GO -> wdrozenie
Krok 12b: Jesli nadal NO-GO -> ESKALACJA
```

## Maksymalnie 2 iteracje — dlaczego?

| Powod                             | Wyjasnienie                                              |
|-----------------------------------|----------------------------------------------------------|
| Zapobieganie nieskonczonej petli  | Bez limitu, system moze sie zapetlic na lata              |
| Kontrola kosztow                  | Kazda iteracja to $0.12-$0.36 — 2 iteracje = max $0.72   |
| Wymuszenie decyzji                | Po 2 probach, problem jest zby zlozony dla automatyzacji  |
| Respektowanie czasu               | Uzytkownik czeka na wynik — nie moze czekac w nieskonczonosc|
| Eskalacja do czlowieka            | Jesli AI nie daje rady, czlowiek musi podjac decyzje      |

### Sciezka eskalacji

```
Iteracja 1: NO-GO -> naprawy -> ponowny audyt
Iteracja 2: nadal NO-GO -> Q-03 generuje raport eskalacji:
  {
    "decision": "ESCALATION",
    "reason": "2 iteracje wyczerpane, problemy nierozwiazane",
    "unresolved_issues": [...],
    "recommendation": "Wymagana interwencja czlowieka",
    "target": "Orkiestrator + Uzytkownik"
  }
```

> **Uwaga!**
> Po eskalacji to CZLOWIEK podejmuje decyzje. Moze zaakceptowac ryzyko (force GO),
> moze zlecic przepisanie od zera, moze zmienic specyfikacje. Manager QA wyczerpuje
> swoje mozliwosci po 2 iteracjach — i jasno to komunikuje.

---

# 9. Anti-patterny (ZLE vs DOBRZE)

## 6 najczestszych bledow w roli Manager QA

### 9.1 Code-Auditing Manager (Audytowanie kodu bezposrednio)

```
ZLE:  Q-03 otwiera pliki zrodlowe i sam szuka XSS/SQL Injection
      Problem: Po co wtedy Q-01? Duplikacja pracy, marnowanie tokenow Sonnet
      na zadanie, ktore Haiku robi taniej i szybciej.

DOBRZE: Q-03 czyta raport Q-01, w ktorym XSS jest juz wykryty i opisany.
        Sonnet sluzy do syntezy i decyzji, nie do skanowania wzorcow.
```

### 9.2 CRITICAL Pass-Through (Przepuszczanie artefaktu z CRITICAL)

```
ZLE:  Q-01 zglasza CRITICAL XSS, ale Q-03 daje GO, bo Q-02 raport jest czysty.
      Problem: CRITICAL issue to AUTOMATYCZNY NO-GO — niezaleznie od reszty.
      Jeden CRITICAL = blokada. Bez wyjatkow. Bez kompromisow.

DOBRZE: Q-03 widzi CRITICAL -> natychmiastowe NO-GO, wynik max 7.0.
        Uzasadnienie: "Nawet 100% clean quality report nie kompensuje
        krytycznej podatnosci bezpieczenstwa."
```

### 9.3 Infinite Loop (Wiecej niz 2 iteracje)

```
ZLE:  Iteracja 1: NO-GO. Iteracja 2: NO-GO. Iteracja 3: "moze tym razem..."
      Problem: Nieskonczona petla. Koszty rosna. Uzytkownik czeka.
      System AI nie rozwiaze problemu, ktory AI nie rozwiazal w 2 probach.

DOBRZE: Iteracja 2: NO-GO -> ESKALACJA do Orkiestratora i Uzytkownika.
        "Dwie iteracje wyczerpane. Problemy przekraczaja zakres automatycznej
        naprawy. Wymagana interwencja czlowieka."
```

### 9.4 Report Bias (Ignorowanie jednego z raportow)

```
ZLE:  Q-03 czyta raport Q-01 (Security) i w pelni akceptuje jego rekomendacje,
      ale pobieznie przechodzi przez raport Q-02 (Quality). Lub odwrotnie.
      Problem: Groupthink z jednym audytorem. Brak rownowagi.

DOBRZE: Q-03 traktuje OBA raporty z rowna waga. Kazde znalezienie z obu
        raportow jest uwzglednione w priorytecie. Security findings maja
        lekkie pierwszenstwo (exploit > blad logiczny), ale zaden raport
        nie jest ignorowany.
```

### 9.5 Architecture Override (Podejmowanie decyzji architektonicznych)

```
ZLE:  Q-03 w raporcie pisze: "Nalezy zmienic architekture z monolitu na
      mikroserwisy, zeby rozwiazac te problemy jakosciowe."
      Problem: Q-03 ocenia artefakt wzgledem specyfikacji — nie projektuje
      nowej architektury. Od architektury jest Orkiestrator.

DOBRZE: Q-03 pisze: "5 z 8 znalezien dotyczy tego samego modulu (auth).
        Rekomendacja: naprawy skupic na module auth. Decyzja o ewentualnej
        refaktoryzacji architektonicznej lezy po stronie Orkiestratora."
```

### 9.6 Silent NO-GO (NO-GO bez planu napraw)

```
ZLE:  Q-03 pisze: "NO-GO. Wynik: 3.5." I nic wiecej.
      Problem: Orkiestrator nie wie CO naprawic, W JAKIEJ KOLEJNOSCI,
      ani ILE TO POTRWA. NO-GO bez fix_order jest bezuzyteczne.

DOBRZE: Q-03 pisze: "NO-GO. Wynik: 3.5. Fix order: (1) QM-001 CRITICAL XSS
        — 30 min, (2) QM-002+QM-003 HIGH — rownolegle, 45 min,
        (3) QM-004 HIGH — po kroku 1, 30 min. Szacowany czas: 1.5h."
```

> **Czy wiesz, ze...?**
> Anti-pattern #2 (CRITICAL Pass-Through) to najgroźniejszy blad.
> Jeden przeoczony CRITICAL w produkcji moze kosztowac tysiace dolarow
> (wyciek danych, atak, utrata reputacji). Dlatego system ma twardą regule:
> CRITICAL = NO-GO. Bez negocjacji.

---

# 10. Scenariusze z zycia wziate

## Scenariusz 1: GO — Czysty audyt, drobne uwagi (Wynik: 8.5)

### Input od Q-01 (Security):

```json
{
  "agent": "QA Security (Q-01)",
  "findings_count": 2,
  "findings": [
    {"id": "SEC-001", "severity": "MEDIUM", "issue": "Brak CSP header"},
    {"id": "SEC-002", "severity": "LOW", "issue": "Console.log z danymi debug"}
  ],
  "recommendation": "WDROZENIE Z ZASTRZEZENIAMI"
}
```

### Input od Q-02 (Quality):

```json
{
  "agent": "QA Quality (Q-02)",
  "findings_count": 3,
  "findings": [
    {"id": "QLT-001", "severity": "MEDIUM", "issue": "Brak testow dla modulu auth"},
    {"id": "QLT-002", "severity": "LOW", "issue": "Nazwy zmiennych niezgodne z konwencja"},
    {"id": "QLT-003", "severity": "LOW", "issue": "Brak JSDoc dla publicznych funkcji"}
  ],
  "recommendation": "WDROZENIE Z ZASTRZEZENIAMI"
}
```

### Output Q-03 (Manager QA):

```
Baza: 10.0
2x MEDIUM: -1.0 (CSP + brak testow)
3x LOW:    -0.3 (debug log + naming + JSDoc)
           -----
WYNIK:      8.7 -> zaokraglony do 8.5

DECYZJA: GO
UZASADNIENIE: Zero CRITICAL/HIGH. Dwa MEDIUM do naprawy w nastepnym sprincie.
Trzy LOW informacyjne. Artefakt bezpieczny i funkcjonalny. Wdrozenie zatwierdzone.
```

## Scenariusz 2: NO-GO — Krytyczna podatnosc (Wynik: 3.5)

### Input od Q-01 (Security):

```json
{
  "agent": "QA Security (Q-01)",
  "findings_count": 4,
  "findings": [
    {"id": "SEC-001", "severity": "CRITICAL", "issue": "XSS — innerHTML z user input"},
    {"id": "SEC-002", "severity": "HIGH", "issue": "Hardcoded Stripe API key"},
    {"id": "SEC-003", "severity": "HIGH", "issue": "Brak auth na /api/admin"},
    {"id": "SEC-004", "severity": "MEDIUM", "issue": "Brak CSP header"}
  ],
  "recommendation": "BLOKADA WDROZENIA"
}
```

### Input od Q-02 (Quality):

```json
{
  "agent": "QA Quality (Q-02)",
  "findings_count": 6,
  "findings": [
    {"id": "QLT-001", "severity": "HIGH", "issue": "Brak walidacji inputu"},
    {"id": "QLT-002", "severity": "MEDIUM", "issue": "Pokrycie testami 55%"},
    {"id": "QLT-003", "severity": "MEDIUM", "issue": "Brak error handling"},
    {"id": "QLT-004", "severity": "LOW", "issue": "Naming conventions"},
    {"id": "QLT-005", "severity": "LOW", "issue": "Brak komentarzy"},
    {"id": "QLT-006", "severity": "LOW", "issue": "Unused imports"}
  ],
  "recommendation": "BLOKADA WDROZENIA"
}
```

### Output Q-03:

```
Baza: 10.0
1x CRITICAL:  -3.0 (XSS)
3x HIGH:      -3.0 (hardcoded key + brak auth + brak walidacji)
3x MEDIUM:    -1.5 (CSP + pokrycie + error handling)
3x LOW:       -0.3 (naming + komentarze + imports)
              -----
WYNIK:         2.2 -> zaokraglony do 2.0

DECYZJA: NO-GO (AUTOMATYCZNY — CRITICAL + pokrycie testami < 70%)
FIX ORDER:
  1. QM-001: CRITICAL XSS (SEC-001) — natychmiast
  2. QM-002 + QM-003: HIGH hardcoded key + auth (SEC-002, SEC-003) — rownolegle
  3. QM-004: HIGH walidacja (QLT-001) — po kroku 1 (zaleznosciowy)
  4. QM-005: MEDIUM pokrycie testami (QLT-002) — po naprawach powyzej
```

## Scenariusz 3: ESKALACJA — 2 iteracje wyczerpane

### Iteracja 1:
Q-03 daje NO-GO (wynik 2.0). Koder naprawia XSS i hardcoded key.

### Iteracja 2:
Q-01 re-audytuje — XSS naprawiony, ale Koder wprowadzil nowa podatnosc
(eval() w module walidacji). Q-02 raportuje regresje w testach.

### Output Q-03 (Iteracja 2):

```json
{
  "agent": "Manager QA (Q-03)",
  "iteration": 2,
  "decision": "ESCALATION",
  "score": 4.0,
  "reason": "2 iteracje wyczerpane. Naprawa XSS wprowadzila nowa podatnosc (eval). Regresja w testach.",
  "unresolved_issues": [
    "QM-007: NEW CRITICAL — eval() w module walidacji (wprowadzona przy naprawie XSS)",
    "QM-008: HIGH — regresja w testach (pokrycie spadlo z 55% do 42%)"
  ],
  "recommendation": "ESKALACJA do Orkiestratora i Uzytkownika. Naprawa jednego bledu generuje kolejne. Wymagana interwencja architektoniczna — mozliwe, ze modul wymaga przepisania od zera.",
  "target": "Orkiestrator + Uzytkownik (Human-in-the-Loop)"
}
```

> **Uwaga!**
> Scenariusz 3 pokazuje, DLACZEGO limit 2 iteracji jest kluczowy.
> Jesli naprawa jednego bledu wprowadza nowy — to nie jest problem
> do rozwiazania przez kolejna iteracje. To problem architektoniczny,
> ktory wymaga ludzkiej decyzji.

---

# 11. Quick Reference Card

```
+=========================================================================+
|                                                                         |
|  MANAGER QA (Q-03) — QUICK REFERENCE CARD                              |
|                                                                         |
+=========================================================================+
|                                                                         |
|  IDENTYFIKATOR:                                                         |
|    Agent ID: qa_manager / Q-03                                          |
|    Level: 4 (QA/AUDYT — Synteza i Decyzja)                             |
|    Prefiks znalezien: QM-xxx                                            |
|                                                                         |
|  MODEL:                                                                 |
|    Claude Sonnet 4.6 (JEDYNY agent QA na Sonnet)                        |
|    Load: 50/100                                                         |
|    Koszt: $3.00/$15.00 per 1M tokens (input/output)                     |
|    Koszt na zadanie: $0.08 - $0.20                                      |
|                                                                         |
|  TOKEN BUDGET:                                                          |
|    Input: 1,500-4,000 | Output: 800-2,000 | Total: 2,300-6,000         |
|                                                                         |
|  NARZEDZIA:                                                             |
|    DOZWOLONE: Read, Write                                               |
|    ZABRONIONE: Edit, Grep, Glob, Bash, Agent, WebSearch, WebFetch       |
|                                                                         |
|  FRAMEWORK DECYZYJNY:                                                   |
|    Skala: 1-10 | Prog GO: >= 6.0 | Prog NO-GO: < 6.0                   |
|    CRITICAL: -3.0 | HIGH: -1.0 | MEDIUM: -0.5 | LOW: -0.1              |
|    AUTO NO-GO: CRITICAL issue, coverage < 70%, niezalatana              |
|    podatnosc bezpieczenstwa, wiele HIGH + regresje                      |
|                                                                         |
|  OBOWIAZKI:                                                             |
|    1. Agregacja raportow (Q-01 + Q-02)                                  |
|    2. Priorytetyzacja znalezien                                         |
|    3. Planowanie kolejnosci napraw                                      |
|    4. Decyzja GO/NO-GO                                                  |
|    5. Kontrola iteracji (max 2)                                         |
|    6. Komunikacja ryzyka do Orkiestratora                               |
|                                                                         |
|  WORKFLOW:                                                              |
|    Q-01+Q-02 (rownolegle) -> Q-03 (synteza) -> GO/NO-GO               |
|    Max 2 iteracje -> potem ESKALACJA                                    |
|                                                                         |
|  RAPORTUJE DO: Orkiestrator                                             |
|  CZYTA OD: Q-01 (Security), Q-02 (Quality)                             |
|  NIE KOMUNIKUJE SIE Z: Q-01/Q-02 bezposrednio, Koder, Planner         |
|                                                                         |
+=========================================================================+
```

---

# 12. Slowniczek

| Termin                          | Definicja                                                                                  |
|---------------------------------|--------------------------------------------------------------------------------------------|
| **GO/NO-GO**                    | Binarna decyzja o wdrozeniu artefaktu — GO (zatwierdz) lub NO-GO (odrzuc/napraw)           |
| **Quality Gate**                | Punkt kontrolny, ktory artefakt musi przejsc przed wdrozeniem — Q-03 jest finalnym gate    |
| **Synteza**                     | Polaczenie danych z wielu zrodel (Q-01 + Q-02) w spojna ocene i decyzje                   |
| **Iteracja**                    | Jeden pelny cykl: audyt -> decyzja -> (ew. naprawa). Max 2 iteracje w pipeline QA          |
| **Eskalacja**                   | Przekazanie decyzji na wyzszy poziom (Orkiestrator/Uzytkownik) po wyczerpaniu iteracji     |
| **Severity**                    | Poziom krytycznosci znalezienia: CRITICAL, HIGH, MEDIUM, LOW                               |
| **Blocking Issue**              | Znalezienie, ktore automatycznie wymusza decyzje NO-GO (np. CRITICAL security issue)       |
| **Regresja**                    | Pogorszenie istniejace funkcjonalnosci przy wprowadzaniu napraw — krok wstecz               |
| **Fix Order**                   | Optymalna kolejnosc napraw z uwzglednieniem zaleznosci i priorytetow                       |
| **Report Aggregation**          | Zbieranie raportow z wielu zrodel — pierwszy krok pracy Q-03                               |
| **Scoring Model**               | System punktowy 1-10 z odejmowaniem punktow za znalezienia — bazowy model decyzji Q-03     |
| **Pipeline QA**                 | Caly lancuch audytowy: Q-01 + Q-02 (rownolegle) -> Q-03 (synteza) -> decyzja               |
| **Human-in-the-Loop**           | Zasada wymagajaca zatwierdzenia czlowieka dla krytycznych decyzji (po eskalacji)           |
| **Groupthink**                  | Zjawisko konformizmu grupowego — zapobiegane przez niezaleznosc Q-01 i Q-02               |
| **Anchoring Bias**              | Zakotwiczenie poznawcze — tendencja do nadmiernego polegania na pierwszej informacji       |
| **Deployment Gate**             | Finalny punkt decyzyjny przed wdrozeniem — rola Manager QA w architekturze                 |
| **Token Budget**                | Limit tokenow (input/output) przydzielony agentowi na jedno zadanie                       |
| **Artifact**                    | Kompletny produkt pracy (kod + testy + konfiguracja) przechodzacy przez pipeline QA        |
| **CRITICAL Finding**            | Najwyzszy poziom severity — wymaga natychmiastowej naprawy, automatyczny NO-GO             |
| **Sonnet vs Haiku**             | Dwa modele Claude — Sonnet (rozumowanie/synteza) vs Haiku (pattern matching/szybkosc)      |

---

**Zrodla:** OMEGA Multi-Agent Architecture Analysis, Gold Standard 2026 Blueprint,
Agent Architecture Observatory, DevOps Quality Gate Best Practices,
OWASP Risk Assessment Framework.

---
---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz prezentacje wideo (5-7 minut) o agencie Manager QA (Q-03) w architekturze Gold Standard 2026. To jest agent FINALNY — ostatni punkt decyzyjny przed wdrozeniem, sedzia calego systemu jakosci.

**Hook otwierajacy (0:00-0:30):**
"GO or NO-GO? Jedno slowo. Jedna decyzja. Tysiace linii kodu, dwa niezalezne audyty, dziesiatki znalezien — i to wszystko sprowadza sie do jednego momentu." Czarny ekran. Powoli pojawia sie zlota waga szalkowa. Na lewej szalce — czerwona tarcza bezpieczenstwa (Q-01). Na prawej — niebieska lupa jakosci (Q-02). Posrodku — zloty mlotek sedziowski. Dramatyczna pauza. Mlotek opada. Napis wielkimi literami: "MANAGER QA". Podtytul: "Sedzia, ktory decyduje o losie kazdego artefaktu."

**Sekcja 1 — Trzy analogie (0:30-1:45):**
Trzy wizualne analogie, kazda 25 sekund:
(1) Sedzia na sali sadowej — animacja sali sadowej, po lewej prokurator (Q-01) z czerwonymi dokumentami, po prawej obronca (Q-02) z niebieskimi. Sedzia (Q-03) w zlotej todze slucza obu stron. Mlotek opada: "VERDICT: NO-GO." Tekst: "Slucha obu stron. Wazy dowody. Decyduje."
(2) Redaktor naczelny — animacja redakcji gazety. Dwa biurka dziennikarzy dostarczaja artykuly. Redaktor przeczyta oba, chwile mysli, i albo wysyla do druku (GO), albo odsyla z czerwonym "POPRAW" (NO-GO). Tekst: "Widzi calosc wydania. Nie tylko jeden artykul."
(3) Kontroler lotow — animacja wiezy kontroli. Dwa ekrany radarowe (Q-01, Q-02) wyswietlaja dane. Kontroler analizuje oba i mowi do mikrofonu: "Cleared to land" lub "Go around." Tekst: "Dane z wielu zrodel. Jedna decyzja. Zero miejsca na blad."

**Sekcja 2 — Framework GO/NO-GO (1:45-3:15):**
Animacja termometru decyzyjnego od 1 do 10. Zaczyna na 10 (zielony). Kolejne znalezienia "uderzaja" w termometr i obniżaja wynik: CRITICAL (-3, duze czerwone uderzenie, ekran sie trzesie), HIGH (-1, pomaranczowe), MEDIUM (-0.5, zolte), LOW (-0.1, szare ledwo widoczne). Termometr schodzi z 10 na 3.5. Czerwona linia progu na 6.0 miga. Tekst: "Ponizej 6.0 = NO-GO." Pokazanie automatycznych blokerow: CRITICAL = wielki czerwony X pojawia sie niezaleznie od wyniku. Animacja: wynik 7.0, ale jest CRITICAL — stempel NO-GO mimo pozornie dobrego wyniku.

**Sekcja 3 — Caly pipeline QA (3:15-4:30):**
Animacja pipeline od gory do dolu. Artefakt (zlota paczka) spada z poziomu Integratora. Rozwidla sie na dwie sciezki (Q-01 i Q-02 rownolegle). Kazdy agent skanuje i generuje raport (animacja pisania). Oba raporty zlatuja sie do Q-03 (efekt magnetyczny). Q-03 czyta (animacja przewracania stron), mysli (animacja zebatych kol), i uderza mlotkiem: GO (zielony blask, confetti) lub NO-GO (czerwony blask, artefakt wraca do gory). Tekst narracyjny: "Dwa niezalezne audyty. Jeden punkt syntezy. Jedna decyzja."

**Sekcja 4 — Cykl iteracyjny (4:30-5:30):**
Animacja petli: Iteracja 1 -> NO-GO -> artefakt wraca do Kodera -> naprawy -> Iteracja 2 -> jesli GO: zielone swiatlo, jesli NO-GO: czerwona ramka z napisem "ESKALACJA". Strzalka prowadzi do Orkiestratora i ikony czlowieka (Human-in-the-Loop). Tekst: "Dwie szanse. Potem czlowiek decyduje." Counter "Iteracja: 1/2" i "Iteracja: 2/2" wyraznie widoczny. Przy eskalacji — zlote swiatlo ostrzegawcze.

**Sekcja 5 — Q-01 vs Q-02 vs Q-03 porownanie (5:30-6:15):**
Trzy kolumny pojawiaja sie rownolegle. Q-01 (czerwony, tarcza): "Szuka exploitow. Myśli jak haker. Haiku." Q-02 (niebieski, lupa): "Sprawdza poprawnosc. Mysli jak uzytkownik. Haiku." Q-03 (zloty, mlotek): "Syntetyzuje wszystko. Podejmuje decyzje. Sonnet." Strzalki od Q-01 i Q-02 prowadza do Q-03. Tekst: "Dwoch audytorow. Jeden sedzia. Trzech agentow, trzy role, jeden cel: jakosc."

**Zamkniecie (6:15-7:00):**
Ekran robi sie czarny. Pojawia sie zloty napis: "Kazdy artefakt w Gold Standard 2026 przechodzi przez ten filtr." Pauza. "GO oznacza pewnosc." Pauza. "NO-GO oznacza ochrone." Pauza. "ESKALACJA oznacza pokorę — AI wie, kiedy potrzebuje czlowieka." Koncowy kadr: zloty mlotek sedziowski na ciemnym tle, otoczony orbita z symbolami Q-01 (tarcza), Q-02 (lupa), i Q-03 (mlotek). Napis: "Manager QA (Q-03) — Final Quality Gate." Fade to black.

**Motyw wizualny:** Zloto-bursztynowa paleta (#D97706 primary, #F59E0B akcenty, #1F2937 ciemne tlo, bialy tekst). Premium, sedziowski, decyzyjny. Ikony: mlotek, waga, tarcza, lupa. Typografia: sans-serif dla narracji, monospace dla JSON/kodu. Animacje: eleganckie, z waga i powaga — bez przesadnych efektow. Tranzycje: cross-fade miedzy sekcjami.

**Muzyka:** Dramatyczna, budujaca napiecie. Glebokie bass drops przy CRITICAL findings. Triumfalna rozdzielczosc przy GO. Napieciowe crescendo przy NO-GO. Spokojna, pewna melodia w zamknieciu — "decyzja zostala podjeta." Cisza w momencie hooka i w ostatnich 5 sekundach.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike (format: 1080x3000px) o agencie Manager QA (Q-03) — finalnym punkcie decyzyjnym w architekturze Gold Standard 2026.

**Naglowek (0-250px):**
Tytul: "MANAGER QA (Q-03) — Sedzia Jakosci" na ciemnym tle (#1F2937) z ikona zlotego mlotka sedziowskiego. Podtytul: "Finalny Quality Gate w architekturze Gold Standard 2026". Kolorystyka: zloto-bursztynowa (#D97706 primary) z ciemnym tlem i bialym tekstem. Delikatna zlota linia pod tytulem.

**Sekcja 1 — Karta agenta (250-500px):**
Wizytowka w stylu karty identyfikacyjnej ze zlotym obramowaniem: Agent ID: qa_manager / Q-03 | Level: 4 (QA/AUDYT) | Model: Claude Sonnet 4.6 | Load: 50/100 | Koszt: $3.00/$15.00 per 1M tok. | Token budget: 2,300-6,000 | Narzedzia: Read + Write | Prefiks: QM-xxx. Ikona: zloty mlotek z waga szalkowa. Badge "SONNET" w zlotym kolorze (odrozniony od Q-01/Q-02 z badge "HAIKU").

**Sekcja 2 — Framework decyzyjny (500-900px):**
Wizualizacja skali 1-10 jako pionowego termometru. Lewa strona: numery od 1 (dol, czerwony) do 10 (gora, zielony). Prawa strona: opisy ("Calkowita porazka", "Powazne problemy", "Graniczny PROG", "Dobra jakosc", "Perfekcyjny"). Wyrazna czerwona linia progu na 6.0 z etykieta "GO/NO-GO THRESHOLD". Ponizej 6 = czerwone tlo, powyzej 6 = zielone tlo. Dwie strzalki: gora = "GO: Wdrozenie zatwierdzone", dol = "NO-GO: Naprawy wymagane".

**Sekcja 3 — Tabela wplywu severity (900-1200px):**
Cztery rzedy w kolorach severity: CRITICAL (czerwony intensywny): -3.0 pkt | HIGH (pomaranczowy): -1.0 pkt | MEDIUM (zolty): -0.5 pkt | LOW (szary): -0.1 pkt. Kazdy rzad z ikona i przykladem. Pod tabela: "Przyklad: 10.0 - 3.0(CRIT) - 2.0(2xHIGH) - 1.5(3xMED) - 0.3(3xLOW) = 3.2 -> NO-GO". Wizualne klocki odejmowane od pelnego paska.

**Sekcja 4 — Pipeline QA (1200-1700px):**
Diagram pipeline od gory do dolu. Na gorze: Integrator (szara ikona). Rozwidlenie na dwie sciezki rownolegle: Q-01 Security (czerwona tarcza) i Q-02 Quality (niebieska lupa). Obie strzalki zbiegaja sie w Q-03 Manager QA (zloty mlotek). Pod Q-03: rozwidlenie na GO (zielona strzalka w prawo do "Wdrozenie") i NO-GO (czerwona strzalka w lewo do "Naprawy"). Z "Naprawy" strzalka wraca do gory (petla). Etykiety: "Iteracja 1", "Iteracja 2", "ESKALACJA" (przy trzecim obiegu — przekreslona petla).

**Sekcja 5 — Flowchart iteracji (1700-2000px):**
Poziomy flowchart: Start -> Audyt (Q-01+Q-02) -> Synteza (Q-03) -> Decyzja [GO -> Wdrozenie | NO-GO -> Iter. < 2? -> TAK: Naprawy -> powrot do Audyt | NIE: ESKALACJA]. Wyrazne kolory: zielone sciezki = pozytywne, czerwone = negatywne, zlote = eskalacja. Numer iteracji widoczny przy kazdej petli.

**Sekcja 6 — Porownanie Q-01 vs Q-02 vs Q-03 (2000-2450px):**
Trzy kolumny obok siebie. Q-01 (czerwona kolumna): Rola: Audytor bezpieczenstwa | Model: Haiku | Perspektywa: "Jak to zlamac?" | Narzedzia: Read, Grep, Glob | Koszt: $0.02-$0.08. Q-02 (niebieska kolumna): Rola: Audytor jakosci | Model: Haiku | Perspektywa: "Czy to dziala?" | Narzedzia: Read, Grep, Glob | Koszt: $0.02-$0.08. Q-03 (zlota kolumna, wieksza): Rola: Sedzia/Decydent | Model: Sonnet | Perspektywa: "GO czy NO-GO?" | Narzedzia: Read, Write | Koszt: $0.08-$0.20. Strzalki od Q-01 i Q-02 prowadza do Q-03.

**Sekcja 7 — Scenariusze decyzji (2450-2700px):**
Trzy miniatury scenariuszy: (1) GO: Wynik 8.5, ikona zielonego check, "0 CRITICAL, 2 MEDIUM, 3 LOW". (2) NO-GO: Wynik 3.5, ikona czerwonego X, "1 CRITICAL, 3 HIGH". (3) ESKALACJA: ikona zlotego wykrzyknika, "2 iteracje wyczerpane, nowe bledy przy naprawach". Kazdy scenariusz w osobnym boxie z kolorowym obramowaniem (zielony/czerwony/zloty).

**Sekcja 8 — Miniatura raportu syntezy (2700-2900px):**
Maly podglad raportu JSON Q-03 na ciemnym tle w stylu terminala: widoczne pola "decision", "score", "fix_order", "blocking_issues". Kolorowe podswietlenie skladni. Badge "QM-001 CRITICAL" w czerwonym, "QM-002 HIGH" w pomaranczowym. Napis: "Kazda decyzja jest udokumentowana, uzasadniona, i actionable."

**Stopka (2900-3000px):**
"Gold Standard 2026 | QA Layer | Agent Q-03 — Final Quality Gate". Ikona zlotego mlotka. Tekst: "Dwoch audytorow. Jeden sedzia. Kazdy artefakt przechodzi przez ten filtr." Zrodla: OMEGA Analysis, Gold Standard 2026 Blueprint. Zlota linia oddzielajaca.

**Paleta kolorow:** Zloty/bursztynowy (#D97706) jako kolor dominujacy, ciemne tlo (#1F2937), bialy tekst (#FFFFFF), akcenty: czerwony (#DC2626) dla CRITICAL/Q-01, niebieski (#2563EB) dla Q-02, zielony (#16A34A) dla GO, zloty (#D97706) dla Q-03 i eskalacji. Typografia: sans-serif (czysty, profesjonalny), monospace dla kodu/JSON.
