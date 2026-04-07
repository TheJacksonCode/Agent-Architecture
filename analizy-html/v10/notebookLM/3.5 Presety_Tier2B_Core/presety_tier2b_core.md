# PRESETY TIER 2B -- CORE (5 Agentow)

## Kompletny Przewodnik Edukacyjny | Gold Standard 2026

**Seria:** Architektura Agentow AI -- Presety i Konfiguracje
**Tier:** 2B (CORE -- 5 agentow)
**Presety w zestawie:** Startup MVP | Cascade Cost | Testing Suite | Accessibility Sprint
**Wzorce:** Hub-and-Spoke | Cascade Escalation | Triple QA Gate | A11y Pipeline
**Zakres tokenow:** ~80-250K
**Zakres kosztow:** $0.06-$0.40
**Autor:** Agent Architecture Designer
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Piatka to nowy standard

### Dlaczego 5 agentow to optymalny punkt rownowagiH

W swiecie zespolow AI -- jak w swiecie zespolow ludzkich -- istnieje magiczna
liczba. Amazon nazywa ja "Two Pizza Rule" (zespol na dwie pizze). Badania Jeffa
Bezosa i Richarda Hackmana wskazuja, ze 5-7 osob to optymalny rozmiar zespolu.
Mniej -- brakuje perspektyw. Wiecej -- eksploduje komunikacja.

W architekturze multi-agent widzimy dokladnie ten sam wzorzec:

| Rozmiar | Kanaly komunikacji | Efektywnosc | Przyklad |
|---------|-------------------|-------------|----------|
| 2 agenty | 1 kanal | Wysoka, ale ograniczona | Solo |
| 3 agenty | 3 kanaly | Dobra, minimalistyczna | Quick Fix, Recon |
| **5 agentow** | **10 kanalow** | **Optymalna** | **Tier 2B** |
| 8 agentow | 28 kanalow | Malejace zwroty | Tier 3 |
| 14 agentow | 91 kanalow | Pelny pipeline | Gold Standard |

Forumla: kanaly = n(n-1)/2. Przy 5 agentach mamy 10 potencjalnych kanalow --
wystarczajaco duzo na specjalizacje, wystarczajaco malo na kontrole.

### Cztery oblicza piatki

Tier 2B to nie jeden preset -- to **cztery rozne konfiguracje** tego samego
rozmiaru zespolu. Kazda odpowiada na inne pytanie:

1. **Startup MVP** -- "Jak zbudowac kompletny produkt minimalnym zespolem?"
2. **Cascade Cost** -- "Jak zredukowac koszty o 70-80% przy duzych wolumenach?"
3. **Testing Suite** -- "Jak zapewnic najwyzsza jakosc przed releasem?"
4. **Accessibility Sprint** -- "Jak przeprowadzic audyt i redesign dostepnosci?"

To jak cztery rozne narzedzia tego samego rozmiaru: klucz nastawny, pila tarczowa,
poziomica laserowa i szlifierka. Kazde ma 5 czesci. Kazde sluzy do czegos innego.

### Analogia: Ekipa filmowa

Piec osob to klasyczny rozmiar ekipy niskbudzetowej: rezyser, operator, dzwiekowiec,
aktor i montazysta. Rezyser (Orkiestrator) koordynuje. Operator (Builder) realizuje
wizje. Dzwiekowiec/swiatlo (Researcher/QA) dba o jakosc. Montazysta (Writer/QA Manager)
finalizuje. Kazdy jest niezbedny. Zadne stanowisko nie jest redundantne.

Ale ta sama piatka moze krecic film fabularny (Startup MVP), reality show
(Cascade Cost -- duzo materialau, niskobudzetowo), test-screening (Testing Suite)
albo film z audiodeskrypcja (Accessibility Sprint). Rozmiar ten sam, cel inny.

> **Czy wiesz, ze...?**
> Badania Google DeepMind z 2025 roku wskazuja, ze zespoly 5-agentowe osiagaja
> **92% efektywnosci** pelnych pipeline'ow 14-agentowych przy **35% kosztow**.
> To najlepszy stosunek jakosc/cena w calej architekturze multi-agent.

> **Uwaga!**
> Tier 2B nie zastepuje wiekszych presetow. Jesli potrzebujesz pelnego frontendu
> + backendu + designu + QA + dokumentacji jednoczesnie, uzyj Tier 3 lub wyzej.
> Piatka jest optymalna gdy masz JASNO OKRESLONY CEL i OGRANICZONY ZAKRES.

---

## 2. Przeglad -- Cztery presety w jednym spojrzeniu

### Tabela porownawcza

| Parametr | Startup MVP | Cascade Cost | Testing Suite | Accessibility Sprint |
|----------|-------------|--------------|---------------|---------------------|
| **Wzorzec** | Hub-and-Spoke | Cascade Escalation | Triple QA Gate | A11y Pipeline |
| **Orkiestrator** | Opus (A-00) | Opus (A-00) -- ostatni | Opus (A-00) | Brak (pipeline) |
| **Modele** | 1xOpus + 4xSonnet | 1xOpus + 2xSonnet + 2xHaiku | 1xOpus + 4xSonnet | 1xSonnet + 2xHaiku + 2xSonnet |
| **Tokeny** | 150-250K | 80-200K | 120-200K | 130-200K |
| **Koszt** | $0.15-$0.40 | $0.06-$0.30 | $0.10-$0.30 | $0.10-$0.30 |
| **Latencja** | ~3-5 min | ~2-4 min | ~3-5 min | ~3-5 min |
| **Cel** | MVP, prototyp, SaaS | Batch, triage, volume | Pre-release QA | WCAG audit, a11y |
| **Polaczenia** | 4 (hub→spoke) | 4 (lancuch) | 5 (parallel→gate) | 4 (pipeline) |
| **Iteracje** | 1-3 | 1 (escalation) | 1-2 per QA | 1-2 per faze |

### Mapa decyzyjna: Ktory preset wybrac?

```
                            START
                              |
                    Jaki jest Twoj cel?
                   /      |       |      \
                  /       |       |       \
            Budowa    Obnizenie  Testowanie  Dostepnosc
            MVP       kosztow   jakosci     WCAG
              |          |          |           |
         Startup     Cascade    Testing    Accessibility
           MVP        Cost       Suite       Sprint
```

---

## 3. PRESET: STARTUP MVP

### 3.1 Filozofia -- Pelny cykl w piec osob

Wyobraz sobie startup w garazu. Piec osob. Jeden produkt. Zero czasu na
biurokracje. Kazdy wie co robic, kazdy jest niezbedny, kazdy wnosi unikalna
wartosc. To jest Startup MVP -- **najmniejszy zespol zdolny do dostarczenia
kompletnego produktu**.

**Analogia 1: Zespol ratunkowy GOPR**

Piec osob w gorskim ratownictwie: dowodca (Orkiestrator), medyk (Analyst),
nawigator z GPS (Researcher Tech), ratownik z lina (Backend Dev), ratownik
z nosztami (QA Quality). Kazdy ma jedna role. Kazdy jest krytyczny. Brak
jednego = misja zagrozzona. Ale razem -- moga uratowac zycie w gorach,
gdzie helikopter nie doleci.

**Analogia 2: Zespol kuchenny w food trucku**

Szef kuchni (Orkiestrator) planuje menu i koordynuje. Sous-chef (Analyst)
analizuje zamowienia i optymalizuje kolejnosc. Zaopatrzeniowiec (Researcher
Tech) zna rynek -- wie skad wziac najlepsze skladniki. Kucharz (Backend Dev)
gotuje. Kontroler jakosci (QA Quality) probuje kazde danie przed wydaniem.
Piec osob. Pelny serwis. Kompletne danie.

**Analogia 3: Ekipa renovacji mieszkania**

Kierownik (Orkiestrator), inspektor (Analyst -- ocenia stan budynku),
doradca materialowy (Researcher Tech -- zna rynek materialow), wykonawca
(Backend Dev -- kladzenie plytek, malowanie), odbiorca (QA Quality -- czy
fuga jest prosta, czy farba nie scieka).

### 3.2 Sklad zespolu

#### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Rola** | STRATEGIA -- koordynacja, dekompozycja, walidacja koncowa |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 55/100 |
| **Token budget** | ~25-40K |
| **Narzedzia** | Agent (delegacja), Read, Grep, Glob, TaskCreate, TaskUpdate |
| **Zakaz** | Write, Edit, Bash, WebSearch |

Orkiestrator w Startup MVP to **CTO jednoosobowy**. Przyjmuje wymagania, rozbija
na zadania, przydziela agentom, monitoruje postep i podejmuje decyzje GO/NO-GO.
W przeciwienstwie do presetu Solo, tutaj koordynuje 4 agentow rownolegle --
moze wyslac Analityka i Researchera jednoczesnie, a potem Buildera z QA.

#### Agent AN-01: Analyst

| Parametr | Wartosc |
|----------|---------|
| **Rola** | ANALIZA -- dekompozycja wymagan, specyfikacja, priorytetyzacja |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 60/100 |
| **Token budget** | ~20-35K |
| **Narzedzia** | Read, Grep, Glob, Write (specyfikacje) |
| **Zakaz** | Agent, Bash, WebSearch, Edit |

Analyst to **product manager** zespolu. Analizuje wymagania uzytkownika,
tworzy user stories, definiuje acceptance criteria, identyfikuje edge cases
i priorytetyzuje funkcjonalnosci wg MoSCoW (Must/Should/Could/Won't). Jego
output to specyfikacja techniczna -- mapa drogowa dla Buildera.

#### Agent R-02: Researcher Tech

| Parametr | Wartosc |
|----------|---------|
| **Rola** | RESEARCH -- badanie technologii, bibliotek, best practices |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 55/100 |
| **Token budget** | ~20-35K |
| **Narzedzia** | WebSearch, WebFetch, Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, Agent |

Researcher Tech to **tech lead do spraw badan**. Przeszukuje dokumentacje,
porownuje biblioteki, bada kompatybilnosc, analizuje tradeoffs. W kontekscie
MVP kluczowe jest szybkie rozpoznanie: ktora technologia pozwoli najszybciej
dostarczyc dzialajacy produkt?

#### Agent B-03: Backend Dev

| Parametr | Wartosc |
|----------|---------|
| **Rola** | BUILD -- implementacja, testy, error handling |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 80/100 |
| **Token budget** | ~40-70K |
| **Narzedzia** | Write, Edit, Bash (testy), Read, Grep, Glob |
| **Zakaz** | Agent, WebSearch, WebFetch |

Backend Dev to **jedyny builder** w zespole. Implementuje logike biznesowa,
API, endpointy, modele danych, walidacje i testy jednostkowe. Najwyzszy
Load (80) w calym zespole -- bo to on produkuje artefakty.

#### Agent Q-04: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Rola** | QA/AUDYT -- testowanie, code review, raport jakosci |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 60/100 |
| **Token budget** | ~20-35K |
| **Narzedzia** | Read, Grep, Bash (testy, lintery), Glob |
| **Zakaz** | Write, Edit, Agent, WebSearch |

QA Quality to **straza jakosci**. Testuje edge cases, sprawdza error handling,
weryfikuje zgodnosc z wymaganiami Analityka, uruchamia testy automatyczne
i generuje raport PASS/FAIL z konkretnymi uwagami.

### 3.3 Diagram architektury

```
+=======================================================================+
|                   PRESET: STARTUP MVP                                  |
|                   Tier 2B -- CORE | Hub-and-Spoke                      |
+=======================================================================+
|                                                                       |
|                    +-------------------+                               |
|                    |   ORKIESTRATOR    |                               |
|                    |     (A-00)        |                               |
|                    |  Opus | Load 55   |                               |
|                    |  STRATEGIA        |                               |
|                    +----+--+--+---+----+                               |
|                   /     |     |    \                                   |
|          spec    / res  |     | qa  \   build                         |
|         /       /       |      \     \                                 |
|  +--------+ +--------+ +--------+ +--------+                         |
|  | ANALYST| |RESEARCH| |BACKEND | |QA      |                         |
|  | (AN-01)| |T.(R-02)| |D.(B-03)| |Q.(Q-04)|                         |
|  | Sonnet | | Sonnet | | Sonnet | | Sonnet |                         |
|  | Load 60| | Load 55| | Load 80| | Load 60|                         |
|  | ANALIZA| |RESEARCH| | BUILD  | |QA/AUDYT|                         |
|  +--------+ +--------+ +--------+ +--------+                         |
|                                                                       |
+=======================================================================+
|  Wzorzec: Hub-and-Spoke (4 szprychy)                                  |
|  Polaczenia: A-00↔AN-01, A-00↔R-02, A-00↔B-03, A-00↔Q-04           |
|  Tokeny: ~150-250K | Koszt: $0.15-$0.40 | Czas: ~3-5 min            |
+=======================================================================+
```

### 3.4 Workflow -- krok po kroku

**Faza 1: Analiza i Research (rownolegle)**

```
Orkiestrator
    |---> Analyst: "Rozloz wymagania na user stories"
    |---> Researcher Tech: "Zbadaj najlepsza technologie dla tego typu MVP"
    |
    |<--- Analyst: specyfikacja + acceptance criteria
    |<--- Researcher Tech: raport technologiczny + rekomendacja
```

Orkiestrator wysyla Analityka i Researchera **rownolegle** -- to kluczowa
optymalizacja. Zamiast sekwencyjnie (analiza → research → build), oba
zadania badawcze ida w tym samym czasie. Oszczednosc: ~30-40% czasu.

**Faza 2: Budowa**

```
Orkiestrator
    |---> Backend Dev: specyfikacja + rekomendacja technologiczna
    |                  "Zbuduj MVP wg tych wymagan z ta technologia"
    |
    |<--- Backend Dev: artefakt (kod + testy)
```

Backend Dev dostaje DWIE rzeczy: CO budowac (od Analityka) i JAK budowac
(od Researchera). To eliminuje zgadywanie -- builder ma kompletny brief.

**Faza 3: Testowanie i walidacja**

```
Orkiestrator
    |---> QA Quality: artefakt + specyfikacja
    |                 "Przetestuj zgodnosc z wymaganiami"
    |
    |<--- QA Quality: raport PASS/FAIL + lista uwag
```

QA testuje artefakt PRZECIWKO specyfikacji Analityka. Nie "czy kod wyglada
ladnie" ale "czy spelnione sa acceptance criteria".

**Faza 4: Iteracja lub dostarczenie**

```
Jesli PASS → Orkiestrator dostarcza wynik uzytkownikowi
Jesli FAIL → Backend Dev poprawia wg uwag QA (max 2-3 iteracje)
Jesli CRITICAL FAIL → Eskalacja do wiekszego presetu
```

### 3.5 Input/Output kazdego agenta

| Agent | Input | Output |
|-------|-------|--------|
| Orkiestrator | Wymagania uzytkownika | Koncowy artefakt + raport |
| Analyst | Surowe wymagania | Specyfikacja + user stories + criteria |
| Researcher Tech | Pytania technologiczne | Raport + rekomendacja technologii |
| Backend Dev | Specyfikacja + rekomendacja | Kod + testy |
| QA Quality | Kod + specyfikacja | Raport PASS/FAIL + uwagi |

### 3.6 Przypadki uzycia

**Idealny dla:**
- MVP aplikacji webowej (React + Node.js + Postgres)
- Maly SaaS: landing page + API + autentykacja + 1-2 funkcje
- Prototyp do pitch decku -- dzialajacy demo w 1 dzien
- Microservice: jeden serwis z API, logiKa, testami
- Narzedzie CLI z dokumentacja i testami
- Bot (Slack, Discord, Telegram) z integracja API

**NIE uzywaj do:**
- Full-stack z zaawansowanym frontendem (brak Frontendera/Designera)
- Aplikacji security-critical (brak QA Security)
- Systemow z wielu mikroserwisami (za malo builderow)
- Redesignu UX/UI (brak warstwy designu)

### 3.7 Anti-patterny

| Anti-pattern | Dlaczego zly | Co robic |
|-------------|-------------|----------|
| Pominiecie Analityka | Builder nie wie CO budowac | ZAWSZE zacznij od analizy |
| Pominiecie Researchera | Builder zgaduje technologie | Research oszczedza refaktoring |
| QA na koncu po 3 iteracjach | Za pozno na poprawki | QA po kazdej iteracji |
| Orkiestrator pisze kod | Zamieszanie rol | Orkiestrator TYLKO koordynuje |
| Sekwencyjny research+analiza | 2x dluzej | Rownolegle! |

### 3.8 Scenariusz: MVP aplikacji do zarzadzania zadaniami

**Zadanie:** "Zbuduj prosty task manager -- dodawanie, usuwanie, oznaczanie
jako done, API REST, SQLite."

**Przebieg:**

1. Orkiestrator przyjmuje wymaganie, rozbija na zadania
2. Analyst (rownolegle): user stories -- CRUD tasks, filtrowanie, sortowanie
3. Researcher Tech (rownolegle): Express vs Fastify, SQLite driver, ORM
4. Backend Dev: implementuje API REST z Express + better-sqlite3
5. QA Quality: testuje endpointy, edge cases (puste tytuly, nieistniejace ID)
6. PASS po 1 iteracji. Koszt: $0.22. Czas: 4 minuty.

### 3.9 Eskalacja

```
Startup MVP (5 agentow)
    |
    | Brak frontendu? → + Frontend Dev + Designer = Feature Sprint (7)
    | Potrzeba security? → + QA Security = Secure Build (6)
    | Wiele serwisow? → + Integrator + 2x Builder = Full Team (8+)
    | Dokumentacja? → + Writer = Startup+ (6)
```

---

## 4. PRESET: CASCADE COST

### 4.1 Filozofia -- Tanie modele na froncie, drogie na zapleczu

Wyobraz sobie fabryke z linia produkcyjna. Na poczatku stoja robotnicy
wykonujacy proste, powtarzalne czynnosci -- sortowanie, etykietowanie,
pakowanie. Dalej stoja technicy obslugujacy maszyny. Na samym koncu --
inzynier kontrolujacy calosc. Im dalej w lancuchu, tym wyzsza ekspertyza
i wyzsza pensja. Ale **80% pracy robi tania silka robocza na froncie**.

To jest Cascade Cost -- wzorzec znany z IBM Watson, AWS Bedrock i Google
Vertex AI. Zamiast wysylac najdroszzy model do kazdego zadania, budujesz
**lancuch eskalacji**: tanie modele (Haiku) obsluguja mase zadan, a drogie
modele (Sonnet, Opus) wkraczaja tylko gdy potrzeba.

**Analogia 1: Call center z trzema poziomami**

Dzwonisz do banku. Najpierw odpowiada bot (Haiku) -- 70% pytan rozwiazuje
natychmiast: "Jaki jest saldo?", "Kiedy rata?". Jesli bot nie da rady,
laczy z konsultantem (Sonnet) -- obsluguje reklamacje, zlecenia, wnioski.
Jesli konsultant trafi na cos nietypowego, przekazuje do eksperta (Opus)
-- blokada karty za granica, podejrzenie fraudu, skomplikowane roszczenie.

**Efekt:** 70% trafiku obsluzone za grosze. 25% za umiarkowany koszt.
Tylko 5% wymaga najdrozszego zasobu. Sredni koszt na zapytanie: -75%.

**Analogia 2: Triaż na szpitalnym oddziale ratunkowym**

Pacjent wchodzi na SOR. Triażysta (Haiku) ocenia: skaleczenie palca?
Gabinet zabiegowy. Bol w klatce piersiowej? Kardiolog (Sonnet). Uraz
wielonarzadowy? Ordynator chirurgii (Opus). System nie wysyla kardiochirurga
do kazdego draśnięcia -- oszczedza najdrozszy zasob na najtrudniejsze przypadki.

**Analogia 3: Piramida korporacyjna**

Stażyści (Haiku) przetwarzaja dokumenty, filtruja maile, sortuja dane.
Specjalisci (Sonnet) analizuja, buduja, decyduja. Dyrektor (Opus) wkracza
przy strategicznych decyzjach. 80% pracy na dole piramidy. 80% kosztow
zaoszczedzonych.

### 4.2 Sklad zespolu

#### Agent R-01: Researcher Haiku #1 (Front-line Triage)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | TRIAGE -- wstepna analiza, klasyfikacja, filtrowanie |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 50/100 |
| **Token budget** | ~15-25K |
| **Narzedzia** | Read, Grep, Glob, WebSearch |
| **Zakaz** | Write, Edit, Bash, Agent |

Researcher Haiku #1 to **front door** systemu. Przyjmuje surowe zapytania,
klasyfikuje zlozonosc (S/M/L/XL), wyciaga kluczowe informacje i filtruje
szum. 70-80% prostych zapytan rozwiazuje sam: wyszukanie informacji,
odpowiedz z dokumentacji, proste analizy.

#### Agent R-02: Researcher Haiku #2 (Data Processor)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | DATA -- przetwarzanie danych, enrichment, agregacja |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 50/100 |
| **Token budget** | ~15-25K |
| **Narzedzia** | Read, Grep, Glob, WebSearch, WebFetch |
| **Zakaz** | Write, Edit, Bash, Agent |

Researcher Haiku #2 to **data processor**. Przetwarza duze wolumeny danych,
wzbogaca informacje z zewnetrznych zrodel, agreguje wyniki. Pracuje rownolegle
z Haiku #1 -- razem obsluguja mase zapytan tanio i szybko.

#### Agent B-03: Backend Dev (Sonnet -- Mid-tier Builder)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | BUILD -- implementacja, transformacje, logika |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 70/100 |
| **Token budget** | ~30-50K |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |
| **Zakaz** | Agent, WebSearch |

Backend Dev to **mid-tier processor**. Otrzymuje przetworzone dane od Haiku
agentow i buduje: generuje kod, transformuje formaty, implementuje logike.
Wchodzi do akcji gdy zadanie wymaga TWORZENIA, nie tylko CZYTANIA.

#### Agent Q-04: QA Quality (Sonnet -- Mid-tier Validator)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | QA/AUDYT -- walidacja, testowanie, raport jakosci |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 55/100 |
| **Token budget** | ~20-35K |
| **Narzedzia** | Read, Grep, Bash (testy), Glob |
| **Zakaz** | Write, Edit, Agent, WebSearch |

QA Quality to **quality gate** przed eskalacja do Opus. Weryfikuje artefakty
z Backendu, uruchamia testy, sprawdza zgodnosc. Jesli PASS -- wynik idzie
do Orkiestratora na zatwierdzenie. Jesli FAIL -- wraca do Backendu.

#### Agent A-00: Orkiestrator (Opus -- Final Arbiter)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | STRATEGIA -- finalna decyzja, eskalacja, synteza |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 40/100 |
| **Token budget** | ~15-30K |
| **Narzedzia** | Agent (delegacja), Read, Grep |
| **Zakaz** | Write, Edit, Bash, WebSearch |

Orkiestrator w Cascade Cost to **ostatnia instancja**. W odroznieniu od
klasycznego Hub-and-Spoke, tutaj Opus NIE jest pierwszym punktem kontaktu.
Jest OSTATNIM. Wchodzi do gry TYLKO gdy:
- QA raportuje problem wymagajacy strategicznej decyzji
- Zadanie wymaga syntezy wynikow z wielu zrodel
- Potrzebna jest eskalacja lub zmiana strategii

**Efekt:** Opus zuzywa 15-30K tokenow zamiast 50-80K w klasycznym modelu.
Oszczednosc na samym Opus: 50-70%.

### 4.3 Diagram architektury

```
+=======================================================================+
|                  PRESET: CASCADE COST                                  |
|                  Tier 2B -- CORE | Cascade Escalation                  |
+=======================================================================+
|                                                                       |
|  +----------+   +----------+                                          |
|  |RESEARCHER|   |RESEARCHER|   Warstwa 1: TRIAGE (Haiku)              |
|  |  H. #1   |   |  H. #2   |   70-80% zadan rozwiazanych tutaj       |
|  |  (R-01)  |   |  (R-02)  |   Koszt: $0.80/$4 za 1M tokenow         |
|  |  Haiku   |   |  Haiku   |                                          |
|  +----+-----+   +----+-----+                                          |
|       |              |                                                |
|       +------+-------+   eskalacja (20-30%)                           |
|              |                                                        |
|       +------v------+                                                 |
|       | BACKEND DEV |     Warstwa 2: BUILD (Sonnet)                   |
|       |   (B-03)    |     Implementacja, transformacja                |
|       |   Sonnet    |     Koszt: $3/$15 za 1M tokenow                 |
|       +------+------+                                                 |
|              |                                                        |
|       +------v------+                                                 |
|       | QA QUALITY  |     Warstwa 3: WALIDACJA (Sonnet)               |
|       |   (Q-04)    |     Testowanie, raportowanie                    |
|       |   Sonnet    |     Koszt: $3/$15 za 1M tokenow                 |
|       +------+------+                                                 |
|              |                                                        |
|       +------v------+                                                 |
|       |ORKIESTRATOR |     Warstwa 4: DECYZJA (Opus)                   |
|       |   (A-00)    |     Finalna synteza, eskalacja                  |
|       |   Opus      |     Tylko 5-10% zadan dociera tutaj             |
|       +-------------+                                                 |
|                                                                       |
+=======================================================================+
|  Wzorzec: Cascade Escalation (lancuchowy)                              |
|  Polaczenia: R-01→B-03, R-02→B-03, B-03→Q-04, Q-04→A-00             |
|  Tokeny: ~80-200K | Koszt: $0.06-$0.30 | Czas: ~2-4 min             |
+=======================================================================+
```

### 4.4 Workflow -- krok po kroku

**Faza 1: Front-line Triage (Haiku)**

```
Zapytanie uzytkownika
    |
    +---> Researcher H. #1: klasyfikacja zlozonosci + filtrowanie
    +---> Researcher H. #2: enrichment danych + agregacja
    |
    | 70-80% zadan: odpowiedz bezposrednio (Haiku wystarczy)
    | 20-30% zadan: eskalacja do Warstwy 2
```

Oba Haiku pracuja **rownolegle**. H#1 klasyfikuje i odpowiada na proste
zapytania. H#2 zbiera dodatkowe dane. Jesli Haiku moze rozwiazac -- rozwiazuje.
Koszt: $0.001-$0.005 per zapytanie. To jest serce oszczednosci.

**Faza 2: Mid-tier Build (Sonnet)**

```
Eskalowane zapytanie + dane z Haiku
    |
    +---> Backend Dev: implementacja rozwiazania
    |
    +---> QA Quality: walidacja artefaktu
    |
    | PASS: wynik gotowy
    | FAIL: powrot do Backend Dev (max 2 iteracje)
```

**Faza 3: Final Arbiter (Opus)**

```
Tylko zapytania wymagajace:
- Strategicznej syntezy
- Rozstrzygniecia konfliktu
- Decyzji architektonicznej
    |
    +---> Orkiestrator: finalna decyzja + dostarczenie
```

### 4.5 Analiza kosztow -- dlaczego 70-80% reduction

| Warstwa | Model | Koszt input/output | % trafiku | Koszt wazony |
|---------|-------|-------------------|-----------|-------------|
| Triage | Haiku | $0.80/$4 | 70-80% | **~$0.003** |
| Build | Sonnet | $3/$15 | 15-25% | **~$0.015** |
| Validate | Sonnet | $3/$15 | 15-25% | **~$0.010** |
| Decide | Opus | $15/$75 | 5-10% | **~$0.008** |
| **Sredni koszt/zapytanie** | | | | **~$0.036** |
| **Klasyczny (Opus all)** | | | | **~$0.150** |
| **Oszczednosc** | | | | **~76%** |

**Wzor IBM/AWS:** Amazon Bedrock stosuje dokladnie ten pattern -- "model routing"
z tanimi modelami na froncie. IBM Watson tez: front-tier (maly model) → mid-tier
(sredni) → back-tier (duzy). Cascade Cost jest implementacja tego wzorca
w architekturze multi-agent.

### 4.6 Przypadki uzycia

**Idealny dla:**
- Batch processing -- setki/tysiace zapytan dziennie
- Customer support triage -- klasyfikacja i rozwiazywanie ticketow
- Przetwarzanie dokumentow -- ekstrakcja, klasyfikacja, enrichment
- Log analysis -- filtrowanie, agregacja, alertowanie
- Data pipeline -- ETL z walidacja jakosci
- Content moderation -- filtrowanie, eskalacja, decyzja

**NIE uzywaj do:**
- Zadan wymagajacych Opus od pierwszego kroku (architektura, strategia)
- Malych wolumenow (overhead kaskady nie oplacalny)
- Zadan kreatywnych wymagajacych wysokiej jakosci od razu
- Security-critical (triage Haiku moze przeoczyc zagrozenie)

### 4.7 Anti-patterny

| Anti-pattern | Dlaczego zly | Co robic |
|-------------|-------------|----------|
| Opus na froncie | 10x drozszy bez powodu | Haiku na froncie, Opus na koncu |
| Brak triage | Wszystko idzie do Sonnet | Haiku filtruje 70-80% |
| Skip QA | Bledy w masowych outputach | ZAWSZE waliduj przed dostarczeniem |
| Jeden Haiku | Wąskie gardlo przy batch | 2x Haiku rownolegle |
| Opus do kazdego zapytania | Brak eskalacji | Opus TYLKO na eskalacje |

### 4.8 Scenariusz: Przetwarzanie 1000 ticketow dziennie

**Zadanie:** "Przetworzenie 1000 ticketow supportu dziennie: klasyfikacja,
odpowiedz na proste, eskalacja zlozonych."

**Przebieg:**

1. Haiku #1 + #2 (rownolegle): klasyfikuja 1000 ticketow
   - 700 prostych: odpowiedz automatyczna (Haiku)
   - 200 srednich: eskalacja do Backend Dev
   - 100 trudnych: eskalacja do QA → Opus
2. Backend Dev: generuje odpowiedzi dla 200 srednich
3. QA Quality: waliduje odpowiedzi
4. Orkiestrator: rozpatruje 100 najtrudniejszych

**Koszt klasyczny (Opus all):** 1000 x $0.15 = **$150/dzien**
**Koszt Cascade:** 700x$0.003 + 200x$0.025 + 100x$0.036 = **~$11.70/dzien**
**Oszczednosc: 92%** ($138.30/dzien)

### 4.9 Eskalacja

```
Cascade Cost (5 agentow)
    |
    | Wiecej Haiku? → + 2x Haiku = Cascade Wide (7)
    | Wiecej specjalizacji? → + Domain Expert (Sonnet) = Cascade+ (6)
    | Potrzeba security? → + QA Security miedzy QA a Opus = Secure Cascade (6)
    | Niski wolumen? → Startup MVP (Hub-and-Spoke, bardziej elastyczny)
```

---

## 5. PRESET: TESTING SUITE

### 5.1 Filozofia -- Trzy bramki jakosci, jeden wynik

Wyobraz sobie samolot przed startem. Nie sprawdza go jeden mechanik --
sprawdzaja go TRZECH: mechanik ukladow hydraulicznych, mechanik silnikow
i mechanik awioniki. Kazdy z wlasnej perspektywy, z wlasna lista kontrolna.
Dopiero gdy WSZYSCY trzech podpisze "PASS" -- kapitan moze odpalic silniki.

Testing Suite przenosi te filozofie do swata oprogramowania. Trzy niezalezne
warstwy QA pracujace **rownolegle**, kazda z innym fokusem. QA Manager
zbiera raporty i podejmuje finalna decyzje GO/NO-GO. Orkiestrator koordynuje
calosc.

**Analogia 1: Komisja egzaminacyjna na uczelni**

Student broni pracy dyplomowej. Trzech recenzentow: jeden ocenia merytoryke
(QA Quality -- poprawnosc kodu), drugi metodologie (QA Security -- czy nie
ma luk), trzeci oryginalnosc (QA Performance -- czy jest wydajne). Przewodniczacy
komisji (QA Manager) zbiera glosy. Dziekan (Orkiestrator) zatwierdza wynik.
Wszystkie trzy oceny sa niezalezne -- recenzenci nie widza swoich opinii
przed glosowaniem.

**Analogia 2: Kontrola jakosci w fabryce samochodow**

Samochod schodai z linii produkcyjnej. Trzy stacje kontroli:
- Stacja 1: Jakosc wykonania (QA Quality) -- szczeliny, lakier, montaz
- Stacja 2: Bezpieczenstwo (QA Security) -- hamulce, poduszki, ABS
- Stacja 3: Wydajnosc (QA Performance) -- zuzucie paliwa, przyspieszenie, halas

Kierownik kontroli (QA Manager) zbiera raporty ze wszystkich trzech stacji.
Jesli WSZYSTKIE sa "PASS" -- samochod jedzie do salonu. Jesli KTORYKOLWIEK
jest "FAIL" -- wraca na linie.

**Analogia 3: Trojstopniowa kontrola bezpieczenstwa na lotnisku**

Bramka 1: Kontrola dokumentow (QA Quality -- czy kod jest poprawny)
Bramka 2: Skaner RTG (QA Security -- czy nie ma zagrozen)
Bramka 3: Wykrywacz metali (QA Performance -- czy nie ma bottleneckow)
Szef bezpieczenstwa (QA Manager): GO/NO-GO

### 5.2 Sklad zespolu

#### Agent A-00: Orkiestrator

| Parametr | Wartosc |
|----------|---------|
| **Rola** | STRATEGIA -- koordynacja testu, dystrybucja artefaktow |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 50/100 |
| **Token budget** | ~20-35K |
| **Narzedzia** | Agent (delegacja), Read, Grep, Glob |
| **Zakaz** | Write, Edit, Bash, WebSearch |

Orkiestrator w Testing Suite pelni role **test managera**. Przyjmuje artefakt
do testowania, dystrybuuje go do trzech QA rownolegle, zbiera raporty i
przekazuje QA Managerowi do finalnej decyzji.

#### Agent QS-01: QA Security

| Parametr | Wartosc |
|----------|---------|
| **Rola** | SECURITY AUDIT -- OWASP, injection, auth, crypto |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 65/100 |
| **Token budget** | ~25-40K |
| **Narzedzia** | Read, Grep, Bash (security scanners), Glob |
| **Zakaz** | Write, Edit, Agent, WebSearch |

QA Security to **penetration tester** zespolu. Sprawdza:
- SQL/NoSQL injection, XSS, CSRF
- Autentykacja i autoryzacja (broken auth, privilege escalation)
- Kryptografia (hashowanie hasel, tokeny, TLS)
- OWASP Top 10 compliance
- Hardcoded secrets, exposed endpoints

#### Agent QQ-02: QA Quality

| Parametr | Wartosc |
|----------|---------|
| **Rola** | CODE QUALITY -- poprawnosc, testy, edge cases, standardy |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 60/100 |
| **Token budget** | ~25-40K |
| **Narzedzia** | Read, Grep, Bash (testy, lintery), Glob |
| **Zakaz** | Write, Edit, Agent, WebSearch |

QA Quality to **code reviewer** zespolu. Sprawdza:
- Poprawnosc logiki biznesowej vs wymagania
- Pokrycie testami (unit, integration, edge cases)
- Error handling (try/catch, graceful degradation)
- Code style i linting (ESLint, Prettier, Black)
- DRY, SOLID, clean code principles

#### Agent QP-03: QA Performance

| Parametr | Wartosc |
|----------|---------|
| **Rola** | PERFORMANCE AUDIT -- szybkosc, pamiec, skalowalnosc |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 60/100 |
| **Token budget** | ~25-40K |
| **Narzedzia** | Read, Grep, Bash (benchmarki, profiler), Glob |
| **Zakaz** | Write, Edit, Agent, WebSearch |

QA Performance to **performance engineer** zespolu. Sprawdza:
- Zlozonosc algorytmiczna (O(n^2) → O(n log n))
- Memory leaks, garbage collection pressure
- Database queries (N+1, brak indeksow, full table scan)
- Caching (brak cache, stale cache, thundering herd)
- Concurrency (race conditions, deadlocks, thread safety)
- Load testing (response time, throughput, error rate)

#### Agent QM-04: QA Manager

| Parametr | Wartosc |
|----------|---------|
| **Rola** | QA GATE -- agregacja raportow, decyzja GO/NO-GO |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 55/100 |
| **Token budget** | ~20-30K |
| **Narzedzia** | Read, Grep, Glob, Write (raport koncowy) |
| **Zakaz** | Edit, Bash, Agent, WebSearch |

QA Manager to **ostatnia brama** przed releasem. Zbiera trzy niezalezne
raporty, agreguje wyniki, nadaje severity (Critical/High/Medium/Low),
i podejmuje finalna decyzje:
- **GO:** Wszystkie 3 QA = PASS → release approved
- **CONDITIONAL GO:** Drobne uwagi (Low/Medium) → release z known issues
- **NO-GO:** Ktorykolwiek QA = CRITICAL FAIL → blokada release

### 5.3 Diagram architektury

```
+=======================================================================+
|                   PRESET: TESTING SUITE                                |
|                   Tier 2B -- CORE | Triple QA Gate                     |
+=======================================================================+
|                                                                       |
|                    +-------------------+                               |
|                    |   ORKIESTRATOR    |                               |
|                    |     (A-00)        |                               |
|                    |  Opus | Load 50   |                               |
|                    +----+--+--+--------+                               |
|                    /    |     |                                        |
|     artefakt      /     |     \  artefakt                             |
|                  /      |      \                                      |
|  +-----------+ +-----------+ +-----------+                            |
|  |QA SECURITY| |QA QUALITY | |QA PERFORM.| <-- rownolegle!           |
|  |  (QS-01)  | |  (QQ-02)  | |  (QP-03)  |                           |
|  |  Sonnet   | |  Sonnet   | |  Sonnet   |                           |
|  |  Load 65  | |  Load 60  | |  Load 60  |                           |
|  +-----------+ +-----------+ +-----------+                            |
|        |             |             |                                   |
|        +------+------+------+------+                                  |
|               |  3 raporty  |                                         |
|        +------v-------------v------+                                  |
|        |       QA MANAGER          |                                  |
|        |        (QM-04)            |                                  |
|        |   Sonnet | Load 55        |                                  |
|        |   GO / CONDITIONAL / NO-GO|                                  |
|        +---------------------------+                                  |
|                                                                       |
+=======================================================================+
|  Wzorzec: Triple QA Gate (parallel → aggregate → decide)              |
|  Polaczenia: A-00→QS-01, A-00→QQ-02, A-00→QP-03, all→QM-04         |
|  Tokeny: ~120-200K | Koszt: $0.10-$0.30 | Czas: ~3-5 min            |
+=======================================================================+
```

### 5.4 Workflow -- krok po kroku

**Faza 1: Dystrybucja (Orkiestrator)**

```
Orkiestrator przyjmuje artefakt do testowania
    |
    +---> QA Security:    artefakt + "Audyt OWASP, auth, crypto"
    +---> QA Quality:     artefakt + "Testy, edge cases, standards"
    +---> QA Performance: artefakt + "Benchmark, memory, queries"
    |
    | Wszystkie 3 QA pracuja ROWNOLEGLE
    | Kazde ma inny fokus -- zero overlapa
```

Kluczowa optymalizacja: **trzy QA rownolegle**. Zamiast sekwencyjnego
security → quality → performance (3x czas), wszystkie trzy ida w tym
samym momencie. Czas = czas najwolniejszego QA, nie suma.

**Faza 2: Parallel Testing**

```
QA Security:    [scanning... injection... auth... crypto...]  → raport
QA Quality:     [tests... edge cases... linting... coverage...]  → raport
QA Performance: [benchmark... memory... queries... load...]  → raport
```

Kazdy QA generuje **strukturyzowany raport**:
```
RAPORT QA [Security/Quality/Performance]
Status: PASS / FAIL
Issues:
  - [CRITICAL] opis (wymaga natychmiastowej naprawy)
  - [HIGH] opis (powinno byc naprawione przed release)
  - [MEDIUM] opis (moze byc naprawione w nastepnym sprincie)
  - [LOW] opis (sugestia, nice-to-have)
```

**Faza 3: Agregacja i decyzja (QA Manager)**

```
QA Manager otrzymuje 3 raporty
    |
    +---> Agregacja: laczy issues ze wszystkich raportow
    +---> Priorytetyzacja: sortuje wg severity
    +---> Matryca decyzyjna:
    |
    |  CRITICAL issues > 0? → NO-GO (blokada release)
    |  HIGH issues > 3?     → NO-GO (za duzo ryzyka)
    |  Tylko MEDIUM/LOW?    → CONDITIONAL GO (release z known issues)
    |  Brak issues?         → GO (pelny release)
```

### 5.5 Przypadki uzycia

**Idealny dla:**
- Pre-release testing -- ostatnia bramka przed produkcja
- Regression testing -- po duzym merge, przed deploy
- CI/CD gate -- automatyczny quality gate w pipeline
- Compliance audit -- SOC2, HIPAA, PCI-DSS pre-check
- Refactoring validation -- czy refactoring nic nie zepsul
- Migration testing -- po migracji DB, frameworku, infrastruktury

**NIE uzywaj do:**
- Testowania w trakcie developmentu (za wczesnie, za drogo)
- Prostych bugfixow (Testing Suite to armata na muche)
- Projektow bez kodu (brak artefaktu do testowania)
- Pierwszego prototypu (MVP nie potrzebuje Triple QA Gate)

### 5.6 Anti-patterny

| Anti-pattern | Dlaczego zly | Co robic |
|-------------|-------------|----------|
| Sekwencyjne QA | 3x wolniejsze | ROWNOLEGLE -- to serce presetu |
| Brak QA Managera | Kto podejmuje GO/NO-GO? | Manager ZAWSZE agreguje |
| QA pisze kod | Zamieszanie rol | QA TYLKO testuje i raportuje |
| Ignorowanie LOW | Kumulacja dlugu technicznego | Loguj do backlogu |
| FAIL = KONIEC | Blokada bez sciezki naprawy | FAIL = konkretne uwagi do poprawy |

### 5.7 Scenariusz: Pre-release testing API e-commerce

**Zadanie:** "Przetestuj API e-commerce przed production deploy:
/orders, /payments, /users, /products."

**Przebieg:**

1. Orkiestrator dystrybuuje kod API do trzech QA
2. QA Security (rownolegle): SQL injection na /orders, broken auth na /users,
   PCI compliance na /payments → FAIL (1 CRITICAL: plaintext card storage)
3. QA Quality (rownolegle): edge cases -- pusty koszyk, ujemna cena, duplikat
   zamowienia → PASS (2 MEDIUM: brak walidacji email, missing 404 handler)
4. QA Performance (rownolegle): N+1 na /products, brak cache na /orders
   → PASS (1 HIGH: N+1 query, 1 MEDIUM: no Redis cache)
5. QA Manager: 1 CRITICAL → **NO-GO**. Raport: "Napraw plaintext card storage,
   dodaj szyfrowanie AES-256. Po poprawce: re-test."

**Koszt:** $0.18. **Czas:** 4 minuty. **Wart:** Unikniecie wycieku danych kart.

### 5.8 Eskalacja

```
Testing Suite (5 agentow)
    |
    | Potrzeba buildera? → + Backend Dev = Test & Fix (6)
    | Wiecej QA typow? → + QA A11y + QA i18n = Extended QA (7)
    | Full CI/CD? → + Integrator + Deployer = CI/CD Pipeline (7)
    | Potrzeba researchu? → + Researcher = Informed Testing (6)
```

---

## 6. PRESET: ACCESSIBILITY SPRINT

### 6.1 Filozofia -- Dostepnosc to nie feature, to prawo

Wyobraz sobie budynek bez rampy dla wozka inwalidzkiego. Schody -- jedyne
wejscie. Dla 85% ludzi to nie problem. Ale dla 15% -- BARIERA. Prawo budowlane
mowi jasno: rampa jest OBOWIAZKOWA. Nie dlatego, ze to "mile widziane" --
dlatego, ze to **prawo czlowieka**.

W swiecie cyfrowym WCAG (Web Content Accessibility Guidelines) to odpowiednik
prawa budowlanego. Accessibility Sprint to preset, ktory **systematycznie
audytuje, redesignuje i weryfikuje dostepnosc** produktu cyfrowego.

**Analogia 1: Inspekcja budowlana pod katem dostepnosci**

Inspektor (Researcher UX) sprawdza budynek: czy sa rampy, windy, oznaczenia
Braille'a, kontrasty na znakach, szerokosc drzwi? Architekt (Designer +
Frontend) projektuje i wdraza poprawki: poszerza drzwi, dodaje rampe, zmienia
kolory znakow. Kontroler jakosci (QA Quality) weryfikuje: czy rampa ma
odpowiedni nachylenie? Czy winda ma przyciski z Braille'em? Dokumentalista
(Writer) tworzy raport zgodnosci dla urzedu.

**Analogia 2: Tlumaczenie filmu na jezyk migowy**

Lingwista (Researcher UX) analizuje scenariusz: ktore dialogi sa kluczowe,
jakie emocje trzeba przekazac, gdzie sa subtelnosci kulturowe. Tlumacz
(Designer + Frontend) tworzy interpretacje w jezyku migowym. Recenzent
(QA Quality) -- osoba gluchoniema -- weryfikuje: czy przekaz jest zrozumialy,
naturalny, kompletny? Redaktor (Writer) przygotowuje wersje finalna
z opisami technicznymi.

**Analogia 3: Adaptacja restauracji dla osob niewidomych**

Konsultant (Researcher UX) audytuje: menu bez Braille'a, brak oznaczeń
fakturowych, slabe oswietlenie. Projektant (Designer + Frontend) tworzy:
menu z QR do czytnika, faktury na drzwiach, lepsze kontrasty. Tester
(QA Quality -- osoba niewidoma) sprawdza: czy QR dziala z VoiceOver?
Czy faktura jest wyczuwalna? Dokumentalista (Writer) tworzy przewodnik
dla personelu.

### 6.2 Sklad zespolu

#### Agent RUX-01: Researcher UX (Auditor A11y)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | A11Y AUDIT -- analiza WCAG, identyfikacja barier |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 55/100 |
| **Token budget** | ~20-30K |
| **Narzedzia** | Read, Grep, Glob, WebSearch (WCAG docs), WebFetch |
| **Zakaz** | Write, Edit, Bash, Agent |

Researcher UX w kontekscie A11y to **auditor dostepnosci**. Skanuje kod
HTML/CSS/JS pod katem:
- Semantyczny HTML (h1-h6, nav, main, article, aside)
- Alt texty na obrazkach
- Kontrasty kolorow (WCAG AA: 4.5:1, AAA: 7:1)
- Keyboard navigation (tabindex, focus traps)
- ARIA labels, roles, live regions
- Screen reader compatibility
- Motion/animation preferences (prefers-reduced-motion)

Output: **raport audytu** z lista naruszen WCAG wg severity.

#### Agent D-02: Designer (A11y Redesign)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | DESIGN -- redesign komponentow pod WCAG |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 65/100 |
| **Token budget** | ~25-40K |
| **Narzedzia** | Read, Write, Grep, Glob |
| **Zakaz** | Bash, Agent, WebSearch, Edit |

Designer w A11y Sprint to **specjalista od inclusive design**. Na podstawie
raportu audytu projektuje rozwiazania:
- Nowa paleta kolorow z odpowiednim kontrastem
- Komponenty z focus states i skip navigation
- Responsive typography z rem/em zamiast px
- Ikony z opisami tekstowymi
- Formularze z proper labels i error messages

#### Agent F-03: Frontend Dev (A11y Implementacja)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | BUILD -- implementacja poprawek a11y w kodzie |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 75/100 |
| **Token budget** | ~30-50K |
| **Narzedzia** | Write, Edit, Bash, Read, Grep, Glob |
| **Zakaz** | Agent, WebSearch, WebFetch |

Frontend Dev implementuje redesign Designera w kodzie:
- Semantyczny HTML zamiast divow
- ARIA atrybuty (role, label, describedby, live)
- CSS z focus-visible, high-contrast media queries
- JS z keyboard event handlers, focus management
- Skip navigation links
- prefers-reduced-motion i prefers-color-scheme

#### Agent Q-04: QA Quality (A11y Validator)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | A11Y QA -- walidacja WCAG, testowanie asystentow |
| **Model** | Claude Sonnet ($3/$15 za 1M tokenow) |
| **Load** | 60/100 |
| **Token budget** | ~25-35K |
| **Narzedzia** | Read, Grep, Bash (axe-core, lighthouse, pa11y), Glob |
| **Zakaz** | Write, Edit, Agent, WebSearch |

QA Quality w kontekscie A11y uruchamia:
- **axe-core** -- automatyczny audit WCAG 2.1/2.2
- **Lighthouse** -- accessibility score (cel: 95+)
- **pa11y** -- compliance checker
- **Manual checks** -- keyboard navigation, screen reader flow
- **Contrast checker** -- weryfikacja ratio na kazdym elemencie

Output: **raport walidacji** z PASS/FAIL per kryterium WCAG.

#### Agent W-05: Writer (A11y Documentation)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | DOKUMENTACJA -- raport zgodnosci, VPAT, przewodnik a11y |
| **Model** | Claude Haiku ($0.80/$4 za 1M tokenow) |
| **Load** | 50/100 |
| **Token budget** | ~15-25K |
| **Narzedzia** | Read, Write, Grep, Glob |
| **Zakaz** | Edit, Bash, Agent, WebSearch |

Writer tworzy dokumentacje koncowa:
- **VPAT (Voluntary Product Accessibility Template)** -- raport zgodnosci
- **A11y Statement** -- oswiadczenie dostepnosci dla strony
- **Developer Guide** -- wytyczne a11y dla przyszlych zmian
- **Testing Checklist** -- lista kontrolna dla QA
- **Known Issues** -- znane ograniczenia z planem naprawy

### 6.3 Diagram architektury

```
+=======================================================================+
|                PRESET: ACCESSIBILITY SPRINT                            |
|                Tier 2B -- CORE | A11y Pipeline                         |
+=======================================================================+
|                                                                       |
|  +----------+    +----------+    +----------+                         |
|  |RESEARCHER|    | DESIGNER |    | FRONTEND |                         |
|  |UX (RUX-01)-->| (D-02)   |-->| (F-03)   |                         |
|  |  Haiku   |    |  Sonnet  |    |  Sonnet  |                         |
|  |  Load 55 |    |  Load 65 |    |  Load 75 |                         |
|  |  AUDIT   |    |  DESIGN  |    |  BUILD   |                         |
|  +----------+    +----------+    +-----+----+                         |
|                                        |                              |
|                                  +-----v----+    +----------+         |
|                                  |QA QUALITY |--->| WRITER   |        |
|                                  |  (Q-04)   |    | (W-05)   |        |
|                                  |  Sonnet   |    |  Haiku   |        |
|                                  |  Load 60  |    |  Load 50 |        |
|                                  |  VALIDATE |    |  DOCS    |        |
|                                  +----------+    +----------+         |
|                                                                       |
+=======================================================================+
|  Wzorzec: A11y Pipeline (sekwencyjny z feedbackiem)                    |
|  Polaczenia: RUX→D, D→F, F→Q, Q→W (+ feedback Q→F, Q→D)            |
|  Tokeny: ~130-200K | Koszt: $0.10-$0.30 | Czas: ~3-5 min            |
+=======================================================================+
```

### 6.4 Workflow -- krok po kroku

**Faza 1: Audit (Researcher UX)**

```
Kod zrodlowy (HTML/CSS/JS)
    |
    +---> Researcher UX: skan WCAG 2.1/2.2
    |     - Semantyka HTML
    |     - Kontrasty
    |     - Keyboard nav
    |     - ARIA
    |     - Screen reader
    |
    +---> Output: Raport audytu z lista naruszen
           (np. 23 naruszenia: 5 Critical, 8 High, 10 Medium)
```

**Faza 2: Redesign (Designer)**

```
Raport audytu
    |
    +---> Designer: projektuje rozwiazania dla kazdego naruszenia
    |     - Nowa paleta kolorow (kontrast AA/AAA)
    |     - Nowa struktura HTML (semantyczna)
    |     - Focus states design
    |     - Skip nav pattern
    |
    +---> Output: Specyfikacja redesignu z mockupami/opisami
```

**Faza 3: Implementacja (Frontend Dev)**

```
Specyfikacja redesignu + oryginalny kod
    |
    +---> Frontend Dev: implementuje poprawki
    |     - Zamiana divow na semantic HTML
    |     - Dodanie ARIA atrybutow
    |     - CSS z focus-visible
    |     - JS z keyboard handlers
    |
    +---> Output: Poprawiony kod
```

**Faza 4: Walidacja (QA Quality)**

```
Poprawiony kod
    |
    +---> QA Quality: uruchamia axe-core, Lighthouse, pa11y
    |     - WCAG 2.1 AA compliance check
    |     - Lighthouse a11y score
    |     - Keyboard navigation test
    |     - Screen reader flow test
    |
    | PASS (score 95+) → Faza 5
    | FAIL → feedback do Frontend Dev lub Designer (max 2 iteracje)
```

**Faza 5: Dokumentacja (Writer)**

```
Raport walidacji + historia zmian
    |
    +---> Writer: tworzy dokumentacje
    |     - VPAT template
    |     - A11y statement
    |     - Developer guide
    |     - Testing checklist
    |
    +---> Output: Komplet dokumentacji a11y
```

### 6.5 Przypadki uzycia

**Idealny dla:**
- WCAG audit -- przed lancowaniem nowego produktu
- A11y remediation -- naprawa istniejacego produktu
- Compliance sprint -- SOC2, ADA, EAA (European Accessibility Act)
- Redesign dostepnosci -- po audycie zewnetrznym
- Onboarding a11y -- wprowadzenie standardow w zespole
- Government/public sector -- obowiazkowa zgodnosc z WCAG

**NIE uzywaj do:**
- Budowy nowych featurow (brak backend buildera)
- Testowania backendu (fokus na frontend/UI)
- Security audytu (inny preset -- Testing Suite)
- Performance optimization (inny fokus)

### 6.6 Anti-patterny

| Anti-pattern | Dlaczego zly | Co robic |
|-------------|-------------|----------|
| Skip audytu | Nie wiesz co naprawiac | ZAWSZE zacznij od audytu |
| Designer bez audytu | Redesign w ciemno | Audit → Design → Build |
| Brak axe-core/pa11y | Reczne testy = dziury | Automatyczne narzedzia a11y |
| Ignorowanie keyboard | 15% uzytkownikow bez myszy | Testuj KAZDY komponent z Tab |
| A11y jako afterthought | Kosztowna naprawa pozniej | A11y od poczatku |
| Brak dokumentacji | Regresja przy nastepnych zmianach | Writer tworzy standard |

### 6.7 Scenariusz: Audit i remediation e-commerce

**Zadanie:** "Przeprowadz audit WCAG 2.1 AA i napraw sklep internetowy:
strona glowna, listing produktow, koszyk, checkout."

**Przebieg:**

1. Researcher UX: skan 4 stron → 47 naruszen WCAG
   - 8 Critical: brak alt na produktach, formularz bez labels, trap focus
     w modalu, brak skip nav, kontrast 2.1:1 na CTA
   - 15 High: brak ARIA na dropdown, autocomplete bez live region
   - 24 Medium: inconsistent heading hierarchy, missing lang attr

2. Designer: redesign
   - Nowa paleta: primary #1A56DB (kontrast 8.2:1 na bialym)
   - Focus ring: 3px solid #1A56DB z 2px offset
   - Skip nav: "Przejdz do tresci" na gorze kazdej strony
   - Formularze: floating labels z aria-describedby

3. Frontend Dev: implementacja -- 47 poprawek w HTML/CSS/JS

4. QA Quality: axe-core → 0 Critical, 0 High, 3 Medium (acceptable)
   Lighthouse a11y: **97/100** (z 52/100 przed audytem)

5. Writer: VPAT + A11y Statement + Developer Guide

**Koszt:** $0.24. **Czas:** 5 minut. **Wart:** Zgodnosc z WCAG 2.1 AA,
Lighthouse z 52 do 97. Unikniecie pozwu ADA (srednia kara: $75,000).

### 6.8 Eskalacja

```
Accessibility Sprint (5 agentow)
    |
    | Potrzeba backendu? → + Backend Dev = Full A11y (6)
    | Potrzeba security? → + QA Security = Secure A11y (6)
    | Wiele jezykow? → + Researcher i18n = i18n + A11y (6)
    | Pelny redesign? → + Researcher UX + Designer = Design Sprint (7)
```

---

## 7. Drzewo Decyzyjne -- Ktory preset Tier 2B wybrac?

```
                                 START
                                   |
                         Jaki jest GLOWNY cel?
                        /       |        |       \
                       /        |        |        \
                Budowa      Obnizenie  Testowanie  Dostepnosc
                produktu    kosztow    jakosci     (WCAG)
                   |           |          |           |
               Czy to      Czy masz    Czy masz    Czy masz
               MVP/proto?  duzy        artefakt    frontend
                  |        wolumen?    do testu?   do audytu?
                 TAK         TAK         TAK         TAK
                  |           |          |           |
             STARTUP      CASCADE    TESTING    ACCESSIBILITY
               MVP         COST       SUITE       SPRINT
```

### Macierz wyboru

| Masz... | Startup MVP | Cascade Cost | Testing Suite | A11y Sprint |
|---------|:-----------:|:------------:|:-------------:|:-----------:|
| Nowy produkt do zbudowania | **TAK** | nie | nie | nie |
| Duzy wolumen zapytan | nie | **TAK** | nie | nie |
| Gotowy kod do testowania | nie | nie | **TAK** | nie |
| Frontend do audytu a11y | nie | nie | nie | **TAK** |
| Budzet ograniczony | tak | **TAK** | tak | tak |
| Wymaganie security | nie | nie | **TAK** | nie |
| WCAG compliance | nie | nie | nie | **TAK** |
| Batch processing | nie | **TAK** | nie | nie |

---

## 8. Porownanie Kosztow

### Tabela kosztow Tier 2B

| Preset | Modele | Tokeny | Koszt min | Koszt max | Koszt sredni |
|--------|--------|--------|-----------|-----------|-------------|
| **Startup MVP** | 1xOpus + 4xSonnet | 150-250K | $0.15 | $0.40 | $0.28 |
| **Cascade Cost** | 1xOpus + 2xSonnet + 2xHaiku | 80-200K | $0.06 | $0.30 | $0.12 |
| **Testing Suite** | 1xOpus + 4xSonnet | 120-200K | $0.10 | $0.30 | $0.20 |
| **A11y Sprint** | 2xSonnet + 2xHaiku + 1xSonnet | 130-200K | $0.10 | $0.30 | $0.18 |

### Porownanie z innymi Tierami

| Tier | Preset | Agentow | Koszt sredni | Wzgledny |
|------|--------|---------|-------------|----------|
| 1 | Solo | 2 | $0.08 | 1.0x |
| 1 | Quick Fix | 3 | $0.12 | 1.5x |
| 1 | Recon | 3 | $0.14 | 1.8x |
| **2B** | **Cascade Cost** | **5** | **$0.12** | **1.5x** |
| **2B** | **A11y Sprint** | **5** | **$0.18** | **2.3x** |
| **2B** | **Testing Suite** | **5** | **$0.20** | **2.5x** |
| **2B** | **Startup MVP** | **5** | **$0.28** | **3.5x** |
| 3 | Full Team | 8+ | $0.60 | 7.5x |
| GS | Gold Standard | 14+ | $1.50 | 18.8x |

**Obserwacja:** Cascade Cost osiaga koszt na poziomie Tier 1 (Quick Fix)
przy 5 agentach. To najlepszy stosunek agentow-do-kosztu w calej architekturze.

### ROI -- kiedy sie oplacaja?

| Preset | Break-even vs Solo | Idealny wolumen |
|--------|-------------------|-----------------|
| Startup MVP | 1 MVP vs 5 iteracji Solo | 1-5 projektow/tydzien |
| Cascade Cost | Od 50+ zapytan/dzien | 100-10,000 zapytan/dzien |
| Testing Suite | 1 uniknieta awaria prod | 1-5 releases/tydzien |
| A11y Sprint | 1 unikniety pozew ADA ($75K) | 1-2 audyty/kwartal |

---

## 9. Eskalacja -- sciezki migracji miedzy presetami

### Matryca eskalacji

```
+-------------------------------------------------------------------+
|                      ESKALACJA TIER 2B                             |
+-------------------------------------------------------------------+
|                                                                   |
|  Startup MVP ----→ Feature Sprint (+ Frontend + Designer)         |
|       |                                                           |
|       +--------→ Secure Build (+ QA Security)                     |
|       |                                                           |
|       +--------→ Full Team (+ Integrator + Builders)              |
|                                                                   |
|  Cascade Cost ---→ Cascade Wide (+ 2x Haiku)                     |
|       |                                                           |
|       +--------→ Startup MVP (jesli niski wolumen)                |
|                                                                   |
|  Testing Suite --→ Test & Fix (+ Backend Dev)                     |
|       |                                                           |
|       +--------→ CI/CD Pipeline (+ Integrator + Deployer)         |
|                                                                   |
|  A11y Sprint ----→ Full A11y (+ Backend Dev)                      |
|       |                                                           |
|       +--------→ Design Sprint (+ Researcher UX + Designer)       |
|                                                                   |
+-------------------------------------------------------------------+
```

### Kiedy DEESKALOWAC (w dol)?

- Startup MVP → Solo: jesli zadanie proste, 1 plik, znane rozwiazanie
- Cascade Cost → Solo: jesli wolumen < 10 zapytan/dzien
- Testing Suite → Quick Fix: jesli wystarczy 1 typ QA
- A11y Sprint → Recon: jesli potrzebujesz tylko audytu bez naprawy

### Kiedy ESKALOWAC (w gore)?

- Startup MVP → Tier 3: jesli potrzebujesz full-stack (frontend + backend + design)
- Cascade Cost → Tier 3: jesli potrzebujesz wiecej niz 3 warstwy eskalacji
- Testing Suite → Gold Standard: jesli testujesz system wielomodulowy
- A11y Sprint → Tier 3: jesli redesign wymaga backendu + nowych funkcji

---

## 10. Quick Reference

### Startup MVP -- karta referencyjna

```
STARTUP MVP | 5 agentow | Hub-and-Spoke
Orkiestrator (Opus) → Analyst (Sonnet) + Researcher Tech (Sonnet)
                     → Backend Dev (Sonnet) → QA Quality (Sonnet)
Tokeny: 150-250K | Koszt: $0.15-$0.40 | Czas: 3-5 min
CEL: MVP, prototyp, maly SaaS, microservice
NIE: full-stack, security-critical, multi-service
```

### Cascade Cost -- karta referencyjna

```
CASCADE COST | 5 agentow | Cascade Escalation
2x Researcher (Haiku) → Backend Dev (Sonnet) → QA (Sonnet) → Orkiestrator (Opus)
Tokeny: 80-200K | Koszt: $0.06-$0.30 | Czas: 2-4 min
CEL: batch, triage, volume, cost reduction 70-80%
NIE: maly wolumen, security-critical, kreatywne
```

### Testing Suite -- karta referencyjna

```
TESTING SUITE | 5 agentow | Triple QA Gate
Orkiestrator (Opus) → QA Security + QA Quality + QA Performance (parallel)
                    → QA Manager (Sonnet) = GO/NO-GO
Tokeny: 120-200K | Koszt: $0.10-$0.30 | Czas: 3-5 min
CEL: pre-release, regression, CI/CD gate, compliance
NIE: development, prototypy, brak artefaktu
```

### Accessibility Sprint -- karta referencyjna

```
A11Y SPRINT | 5 agentow | A11y Pipeline
Researcher UX (Haiku) → Designer (Sonnet) + Frontend (Sonnet)
→ QA Quality (Sonnet) → Writer (Haiku)
Tokeny: 130-200K | Koszt: $0.10-$0.30 | Czas: 3-5 min
CEL: WCAG audit, a11y remediation, compliance, redesign
NIE: backend, security, nowe funkcje
```

---

## Slowniczek

| Termin | Definicja |
|--------|-----------|
| **Hub-and-Spoke** | Wzorzec z centralnym koordynatorem (hub) i agentami (spokes) |
| **Cascade Escalation** | Lancuch eskalacji od tanich do drogich modeli |
| **Triple QA Gate** | Trzy niezalezne warstwy QA pracujace rownolegle |
| **A11y Pipeline** | Sekwencyjny pipeline audytu i naprawy dostepnosci |
| **WCAG** | Web Content Accessibility Guidelines -- standard dostepnosci W3C |
| **VPAT** | Voluntary Product Accessibility Template -- raport zgodnosci |
| **GO/NO-GO** | Decyzja binarna: zatwierdzenie lub blokada release |
| **Triage** | Klasyfikacja i priorytetyzacja zadan wg pilnosci/zlozonosci |
| **Model Routing** | Kierowanie zadan do odpowiedniego modelu wg zlozonosci |
| **Narrow Context** | Wysylanie TYLKO relevantnych informacji do agenta |
| **MoSCoW** | Must/Should/Could/Won't -- metoda priorytetyzacji wymagan |
| **axe-core** | Narzedzie do automatycznego audytu WCAG |
| **Lighthouse** | Narzedzie Google do audytu wydajnosci, a11y, SEO |
| **pa11y** | Narzedzie CLI do testowania zgodnosci WCAG |
| **OWASP Top 10** | Lista 10 najczestszych zagrozen bezpieczenstwa aplikacji web |
| **N+1 Query** | Antypattern bazy danych: 1 zapytanie + N dodatkowych |
| **Focus Trap** | Element UI, ktory przechwytuje fokus klawiatury i nie pozwala wyjsc |

---

## Zrodla i referencje

1. Anthropic -- "Claude Model Pricing" (Opus, Sonnet, Haiku) -- oficjalna dokumentacja 2026
2. WCAG 2.2 -- W3C Web Content Accessibility Guidelines (grudzien 2023, aktualizacja 2025)
3. OWASP Top 10 2025 -- Open Web Application Security Project
4. Amazon AWS Bedrock -- "Model Routing and Cascade Patterns" (whitepaper 2025)
5. IBM Watson -- "Cost Optimization in Multi-Model Architectures" (2025)
6. Google DeepMind -- "Scaling Laws for Multi-Agent Systems" (2025)
7. Jeff Hackman -- "Leading Teams" -- optymalna wielkosc zespolu (5-7 osob)
8. European Accessibility Act (EAA) -- dyrektywa UE o dostepnosci cyfrowej (2025)
9. ADA Title III -- Americans with Disabilities Act, digital accessibility lawsuits
10. axe-core by Deque Systems -- automatyczny audyt WCAG

---

# PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

```
Stworz prezentacje wideo (16:9, 5-7 minut) o czterech presetach Tier 2B CORE
(5 agentow kazdy) z architektury Gold Standard 2026 multi-agent AI:
Startup MVP, Cascade Cost, Testing Suite, Accessibility Sprint.

HOOK OTWIERAJACY (pierwsze 10 sekund):
"5 agentow. 4 konfiguracje. 92% efektywnosci pelnego pipeline'u."
Duzy numer "5" z efektem pulse/glow na ciemnym tle. Cztery ikony presetow
pojawiaja sie radialnie wokol piatki. Kazda pulsuje innym kolorem akcentowym.
Tytul: "TIER 2B CORE -- Piatka to nowy standard"

MOTYW WIZUALNY:
- Kolor glowny: Cyan (#06B6D4)
- Tlo: ciemny grafit (#111827) z subtelnymi liniami siatki hexagonalnej
- Kolor akcentowy 1 (Startup MVP): Emerald (#10B981)
- Kolor akcentowy 2 (Cascade Cost): Amber (#F59E0B)
- Kolor akcentowy 3 (Testing Suite): Rose (#F43F5E)
- Kolor akcentowy 4 (A11y Sprint): Violet (#8B5CF6)
- Tekst: bialy (#F9FAFB), szary (#9CA3AF) na detale
- Motyw: hexagonalna siatka -- modularnosc, polaczenia, struktura
- Efekty: smooth transitions, fade-in/scale-up karty agentow, pulse na polaczeniach
- Font: bold sans-serif (Inter, Space Grotesk)
- Ikony: minimalistyczne, outlined, monochromatyczne

STRUKTURA SLAJDOW:

1. INTRO (0:00-0:30)
   - Hook "5 agentow, 4 konfiguracje" z cyan glow na ciemnym tle
   - Animacja: 14 agentow Gold Standard → zoom → 5 podswietlonych
   - Badge: "Tier 2B | 5 agentow | 92% efektywnosci | 35% kosztow"
   - Szybki montaz: 4 miniatury presetow z kolorami akcentowymi

2. PRZEGLAD -- 4 PRESETY (0:30-1:30)
   - Tabela porownawcza z animowanym wjazdem kolumn (slide-in od dolu)
   - Kazdy preset ma swoj kolor i ikone:
     * Startup MVP (Emerald): ikona rakiety
     * Cascade Cost (Amber): ikona piramidy/warstw
     * Testing Suite (Rose): ikona tarczy/checkmark
     * A11y Sprint (Violet): ikona oka/dostepnosci
   - Mapa decyzyjna: "Budowa → MVP | Koszty → Cascade | Jakosc → Testing | A11y → Sprint"
   - Kazdy preset 5-sekundowy highlight z kluczowa statystyka

3. STARTUP MVP -- DEEP DIVE (1:30-2:45)
   - Diagram Hub-and-Spoke z bounce-in agentow (5 wezlow, 4 polaczenia)
   - Split-screen analogia: food truck (lewo) vs AI team (prawo)
   - Workflow animowany: Analiza+Research (rownolegle) → Build → QA → Deliver
   - Karty agentow z flip animation:
     Orkiestrator (Opus) | Analyst (Sonnet) | Researcher (Sonnet) |
     Backend Dev (Sonnet) | QA Quality (Sonnet)
   - Scenariusz: "Task Manager MVP -- $0.22, 4 minuty" z timerem w rogu
   - Statystyki: 150-250K tokenow, $0.15-$0.40, 3-5 min

4. CASCADE COST -- DEEP DIVE (2:45-4:00)
   - Diagram kaskadowy z animacja przeplywu od gory do dolu
   - Analogia: call center z 3 poziomami (bot → konsultant → ekspert)
   - Piramida kosztow: Haiku (70-80%) na dole, Sonnet (15-25%) w srodku,
     Opus (5-10%) na czubku -- kazda warstwa w swoim kolorze
   - Animowany scenariusz: 1000 ticketow → 700 Haiku → 200 Sonnet → 100 Opus
   - Bar chart porownawczy: $150/dzien (klasyczny) vs $11.70/dzien (Cascade)
     z animacja kurczenia slupka o 92%
   - Wzor IBM/AWS: logo referencyjne, "Industry Standard Pattern"
   - Statystyki: 80-200K tokenow, $0.06-$0.30, 70-80% cost reduction

5. TESTING SUITE -- DEEP DIVE (4:00-5:00)
   - Diagram Triple QA Gate: 3 rownolegle sciezki → agregacja → GO/NO-GO
   - Analogia: 3 stacje kontroli w fabryce samochodow
   - Trzy karty QA z pulse animation (rownolegle):
     QA Security (skan OWASP) | QA Quality (testy, edge cases) | QA Performance (benchmark)
   - QA Manager: semafor GO (zielony) / CONDITIONAL (zolty) / NO-GO (czerwony)
   - Scenariusz: "E-commerce API -- CRITICAL: plaintext cards → NO-GO"
     z dramatycznym czerwonym flashem na NO-GO
   - Statystyki: 120-200K tokenow, $0.10-$0.30, 3 typy QA parallel

6. ACCESSIBILITY SPRINT -- DEEP DIVE (5:00-6:00)
   - Diagram pipeline: Audit → Design → Build → Validate → Document
   - Analogia: inspekcja budowlana -- rampa, winda, Braille
   - Before/After: Lighthouse score 52 → 97 z animacja wzrostu
   - Lista WCAG checkow z zielonymi checkmarkami pojawiajacymi sie sekwencyjnie
   - Scenariusz: "E-commerce a11y audit -- 47 naruszen → 0 Critical"
   - Ikona: oko z symbolem dostepnosci, violet glow
   - Statystyki: 130-200K tokenow, $0.10-$0.30, WCAG 2.1 AA compliance

7. POROWNANIE i DECYZJA (6:00-6:30)
   - Bar chart: koszt 4 presetow Tier 2B vs Solo vs Gold Standard
   - Drzewo decyzyjne animowane: "Jaki cel?" → 4 galerie
   - ROI kazdego presetu: "1 MVP > 5 iteracji Solo", "$138/dzien savings",
     "1 uniknieta awaria", "$75K unikniety pozew ADA"
   - Quick Reference: 4 karty obok siebie z kluczowymi danymi

8. OUTRO (6:30-7:00)
   - "Piatka agentow. Nieskonczone mozliwosci."
   - 4 ikony presetow ukladaja sie w hexagonalna siatke
   - Statystyka koncowa: "92% efektywnosci | 35% kosztow | 4 specjalizacje"
   - CTA: "Poznaj Tier 3 -- zespoly 8+ agentow"
   - Fade to dark z cyan glow na logo "Gold Standard 2026"

PRZEJSCIA MIEDZY SEKCJAMI:
- Miedzy presetami: hexagonalna siatka przesuwa sie w bok (slide-left)
- Miedzy elementami: fade-in z scale-up (0.95→1.0)
- Podkreslenie danych: pulse animation na liczbach
- Diagramy: draw-in animation (linie rysuja sie w czasie rzeczywistym)

MUZYKA: Ambient electronic, 100-120 BPM, spokojne synthy z subtelnymi beatami.
Build-up przy porownaniu kosztow Cascade. Drop przy NO-GO Testing Suite.
Delikatny piano przy A11y Sprint.
NARRATOR: Spokojny, kompetentny, pauzy przy kluczowych liczbach i porownaniach.
Tempo umiarkowane -- material jest gesyt, sluchacz potrzebuje czasu na przyswojenie.
```

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Stworz pionowa infografike (1080x3500px) o czterech presetach Tier 2B CORE
(5 agentow kazdy) z architektury Gold Standard 2026 multi-agent AI:
Startup MVP, Cascade Cost, Testing Suite, Accessibility Sprint.

STYL WIZUALNY:
- Tlo: ciemny grafit (#111827) z subtylna siatka hexagonalna (opacity 5%)
- Kolor glowny: Cyan (#06B6D4)
- Kolor Startup MVP: Emerald (#10B981)
- Kolor Cascade Cost: Amber (#F59E0B)
- Kolor Testing Suite: Rose (#F43F5E)
- Kolor A11y Sprint: Violet (#8B5CF6)
- Tekst glowny: bialy (#F9FAFB)
- Tekst detali: jasny szary (#9CA3AF)
- Tla kart: ciemny szary (#1F2937) z 1px border w kolorze presetu
- Font tytulowy: Space Grotesk Bold, 36-48px
- Font body: Inter Regular/Medium, 14-18px
- Zaokraglenia: 12px na kartach, 8px na badge'ach
- Separatory: cienka linia cyan (#06B6D4) z glow (blur 4px)

SEKCJA 1: NAGLOWEK (280px)
- Tytul: "TIER 2B CORE" w Cyan z glow effect (text-shadow 0 0 20px #06B6D4)
- Podtytul: "Cztery Presety | 5 Agentow | Gold Standard 2026"
- Ikona: hexagon z "5" w srodku (80px, cyan stroke)
- Cztery male badge'y w jednym rzedzie:
  "Startup MVP" (Emerald) | "Cascade Cost" (Amber) |
  "Testing Suite" (Rose) | "A11y Sprint" (Violet)
- Statystyka centralna: "92% efektywnosci pelnego pipeline'u przy 35% kosztow"
  w ramce z cyan border

SEKCJA 2: TABELA POROWNAWCZA (350px)
- Tabela 5 kolumn x 8 wierszy na ciemnym tle (#0F172A)
- Naglowki kolumn w kolorach presetow
- Wiersze: Wzorzec, Modele, Tokeny, Koszt, Czas, Cel, Polaczenia
- Kazda komorka z odpowiednim kolorem akcentowym
- Wyroznienie najtanszego (Cascade Cost) i najdrozszego (Startup MVP)
  za pomoca ikon strzalek w dol/gore

SEKCJA 3: STARTUP MVP (500px)
- Karta z Emerald border (2px) i ciemnym tlem
- Naglowek: "01 // STARTUP MVP" w Emerald z ikona rakiety
- Badge'y: "Hub-and-Spoke" | "150-250K" | "$0.15-$0.40"
- Mini diagram Hub-and-Spoke: Orkiestrator w centrum (Emerald kolo),
  4 agenty wokol (mniejsze kola: Analyst, Researcher, Backend, QA)
  polaczone liniami z centralnym
- Workflow timeline: Analiza+Research (rownolegle) → Build → QA → Deliver
  z ikonami na kazdym kroku
- Karty agentow (5 malych kart w rzedzie):
  A-00 Opus | AN-01 Sonnet | R-02 Sonnet | B-03 Sonnet | Q-04 Sonnet
- Use cases: "MVP | SaaS | Prototyp | Microservice | CLI | Bot"
- Mini scenariusz: "Task Manager: $0.22 | 4 min | 1 iteracja"

SEKCJA 4: CASCADE COST (500px)
- Karta z Amber border (2px) i ciemnym tlem
- Naglowek: "02 // CASCADE COST" w Amber z ikona piramidy
- Badge'y: "Cascade Escalation" | "80-200K" | "$0.06-$0.30"
- Mini diagram kaskadowy: 4 warstwy od gory do dolu
  Haiku×2 (gora, najszersza) → Sonnet Build → Sonnet QA → Opus (dol, najwezsza)
  z procentami trafiku: 70-80% | 15-25% | 15-25% | 5-10%
- Bar chart porownawczy: $150/dzien (klasyczny, szary) vs $11.70/dzien (Cascade, Amber)
  z etykieta "92% oszczednosci"
- Karty agentow (5 malych kart):
  R-01 Haiku | R-02 Haiku | B-03 Sonnet | Q-04 Sonnet | A-00 Opus
- Use cases: "Batch | Triage | Dokumenty | Logi | ETL | Moderacja"
- Mini scenariusz: "1000 ticketow/dzien: $11.70 vs $150 klasycznie"

SEKCJA 5: TESTING SUITE (500px)
- Karta z Rose border (2px) i ciemnym tlem
- Naglowek: "03 // TESTING SUITE" w Rose z ikona tarczy
- Badge'y: "Triple QA Gate" | "120-200K" | "$0.10-$0.30"
- Mini diagram: Orkiestrator na gorze → 3 rownolegle QA (Security, Quality,
  Performance) → QA Manager na dole z semaforem GO/NO-GO
- Semafor: 3 kolka (zielony GO, zolty CONDITIONAL, czerwony NO-GO)
- Karty agentow (5 malych kart):
  A-00 Opus | QS-01 Sonnet | QQ-02 Sonnet | QP-03 Sonnet | QM-04 Sonnet
- Use cases: "Pre-release | Regression | CI/CD | Compliance | Migration"
- Mini scenariusz: "E-commerce API: CRITICAL plaintext cards → NO-GO"

SEKCJA 6: ACCESSIBILITY SPRINT (500px)
- Karta z Violet border (2px) i ciemnym tlem
- Naglowek: "04 // ACCESSIBILITY SPRINT" w Violet z ikona oka/a11y
- Badge'y: "A11y Pipeline" | "130-200K" | "$0.10-$0.30"
- Mini diagram pipeline: 5 etapow w linii:
  Audit (Haiku) → Design (Sonnet) → Build (Sonnet) → QA (Sonnet) → Docs (Haiku)
- Before/After gauge: Lighthouse 52 → 97 (z Violet wypelnieniem)
- Karty agentow (5 malych kart):
  RUX-01 Haiku | D-02 Sonnet | F-03 Sonnet | Q-04 Sonnet | W-05 Haiku
- Use cases: "WCAG audit | A11y fix | EAA | ADA | Government | Onboarding"
- Mini scenariusz: "E-commerce: 47 naruszen → 0 Critical, Lighthouse 97"

SEKCJA 7: DRZEWO DECYZYJNE (300px)
- Diagram na ciemniejszym tle (#0B1120)
- Wezel startowy: "JAKI CEL?" w Cyan
- 4 galerie: Budowa (Emerald) → MVP | Koszty (Amber) → Cascade |
  Jakosc (Rose) → Testing | A11y (Violet) → Sprint
- Strzalki z kolorami odpowiadajacymi presetom
- Kazdy wezel koncowy to mini badge z nazwa presetu

SEKCJA 8: POROWNANIE KOSZTOW (250px)
- Horizontal bar chart na ciemnym tle
- 6 slupkow: Solo | Quick Fix | Cascade Cost | A11y Sprint | Testing Suite | Startup MVP
- Kazdy slupek w odpowiednim kolorze, dlugosci proporcjonalne do kosztu
- Adnotacja na Cascade Cost: "Najtanszy 5-agentowy!"
- Adnotacja na Startup MVP: "Najdrozszy, ale pelny cykl"
- Druga os: czas (od 30s do 5 min)

SEKCJA 9: ROI (200px)
- 4 karty w siatce 2x2:
  MVP: "1 MVP > 5 iteracji Solo" (Emerald)
  Cascade: "$138/dzien savings" (Amber)
  Testing: "1 uniknieta awaria" (Rose)
  A11y: "$75K unikniety pozew ADA" (Violet)
- Kazda karta z ikona i krótkim tekstem

SEKCJA 10: QUICK REFERENCE (200px)
- Box (#0F172A) z zaokraglonymi rogami (16px) i cyan border
- 4 mini-karty referencyyjne w jednym rzedzie (po jednej na preset)
- Kazda: nazwa, agenty, tokeny, koszt, wzorzec
- Kompaktowe, 3-4 linie na karte

SEKCJA 11: STOPKA (120px)
- "Gold Standard 2026 | Tier 2B CORE | 4 Presety x 5 Agentow"
- Logo/badge: hexagon z "2B" w Cyan
- "Architektura Agentow AI -- Kompletny Przewodnik Edukacyjny"
- Cienka linia cyan na gorze stopki

DEKORACJE I DETALE:
- Hexagonalna siatka na tle (opacity 5%, Cyan)
- Glow effect na naglowkach sekcji (text-shadow 0 0 15px kolor_presetu)
- Ikony separatorow miedzy sekcjami: "//01", "//02", "//03", "//04"
- Subtelne gradienty na kartach: od ciemnego (#1F2937) do nieco jasniejszego (#374151)
  z kierunkiem od gory-lewej do dolu-prawej
- Kolor obramowania kart zmienia sie plynnie na hover (ale w statycznej infografice
  symulowany efektem silniejszego glow na border)
- Numeracja sekcji w lewym marginesie: duza cyfra (72px, opacity 10%) jako tlo
- Kazdy preset ma konsekwentny kolor w calej infografice
- Minimalne uzycie ikon -- raczej geometryczne ksztalty (kola, hexagony, linie)
- Siatka hexagonalna powinna byc widoczna ale nie dominujaca
- Wszystkie karty agentow maja te sama wysokosc i szerokosc w ramach presetu
- Polaczenia w diagramach: linie z zaokraglonymi zakonczeniami, 2px, kolor presetu
```

---

*Dokument wygenerowany dla systemu Gold Standard 2026 Multi-Agent AI Architecture.*
*Presety: Startup MVP | Cascade Cost | Testing Suite | Accessibility Sprint*
*Tier: 2B CORE | 5 Agentow | Kwiecien 2026*
