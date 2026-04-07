# REDAKTOR (B-03) — Agent Jakosci Tresci

## Warstwa BUILD / TRESC I STYL | Poziom 3 w 5-poziomowej hierarchii
## Model: Claude Sonnet ($3/$15 za 1M tokenow) | Obciazenie: 35/100

---

# Spis tresci

1. [Wprowadzenie — Kim jest Redaktor?](#1-wprowadzenie)
2. [Kluczowe Obowiazki](#2-kluczowe-obowiazki)
3. [Czego Redaktor NIE robi](#3-czego-redaktor-nie-robi)
4. [Model i Koszt](#4-model-i-koszt)
5. [Narzedzia](#5-narzedzia)
6. [Workflow — Od surowego tekstu do polerowanego dokumentu](#6-workflow)
7. [Formaty dokumentow](#7-formaty-dokumentow)
8. [Redaktor vs inne Builderzy](#8-redaktor-vs-inne-builderzy)
9. [Anty-wzorce](#9-anty-wzorce)
10. [Standardy jakosci tresci](#10-standardy-jakosci-tresci)
11. [Najlepsze Praktyki](#11-najlepsze-praktyki)
12. [Podsumowanie + Quick Reference Card + Glossary](#12-podsumowanie)

---

# 1. Wprowadzenie — Kim jest Redaktor?

Redaktor (B-03) to agent odpowiedzialny za **jakosc tresci** w warstwie BUILD architektury Gold Standard 2026. Otrzymuje surowy tekst — dokumentacje, komentarze, changelog — i przeksztalca go w **finalny, czytelny dokument**. Poprawnosc jezykowa, spojnosc stylu, czytelnosc techniczna — to domena Redaktora.

Redaktor dziala w izolowanym **document sandbox**. Nie widzi kodu logicznego, nie ma dostepu do baz danych, nie uruchamia programow. Jego swiat to pliki tekstowe — i tylko pliki tekstowe. W tym swiecie jest mistrzem.

> **Kluczowa zasada:** Redaktor to agent, w ktorym **surowy tekst przestaje byc surowy**
> i zaczyna byc **profesjonalnym dokumentem**. Przed Redaktorem istnieja chaotyczne notatki.
> Po Redaktorze istnieje dokumentacja, ktora mozna pokazac klientowi.

### Trzy Analogie do Zrozumienia Roli Redaktora

**Analogia 1: Redaktor w Wydawnictwie**

Wyobraz sobie wydawnictwo literackie. Autor napisal rekopis — 300 stron surowej prozy. Historia jest tam, pomysly sa tam, ale tekst jest rozwlekly, niespojny, pelny powtorzen i literowek. Redaktor bierze ten rekopis i zamienia go w ksiazke, ktora czytelnik moze pochlaniac z przyjemnoscia. Poprawia gramatyke, wycina zbedne akapity, zapewnia spojny styl narracji. Czytelnik nigdy nie widzi surowego rekopisu — widzi efekt pracy redaktora. W architekturze Gold Standard dziala identycznie: Koder pisze surowa dokumentacje, Redaktor zamienia ja w czytelny, profesjonalny tekst.

**Analogia 2: Inzynier Dzwieku Miksujacy Album**

Muzycy nagrali surowe sciezki — gitara, bas, perkusja, wokal. Kazda sciezka brzmi sama w sobie przyzwoicie, ale razem tworza chaotyczny szum. Inzynier dzwieku balansuje poziomy glosnosci, usuwa szumy, dodaje klarownosc. Bez miksowania nawet swietna muzyka brzmi brudno. Redaktor robi dokladnie to samo z tekstem — surowe fragmenty dokumentacji od roznych agentow moga byc merytorycznie poprawne, ale bez redakcji brzmia niespojnie, maja rozne style, rozna terminologie. Redaktor "miksuje" tekst do spojnej calosci.

**Analogia 3: Kurator Muzealny Piszacy Etykiety Eksponatow**

Naukowiec odkryl artefakt sprzed 3000 lat. Ma o nim 50-stronicowa publikacje naukowa. Ale odwiedzajacy muzeum nie przeczyta 50 stron — przeczyta etykiete o 50 slowach, ktora kurator umiesci pod eksponatem. Umiejetnosc skondensowania zlozonosci w klarowny, krotki tekst — to supermocy Redaktora. W Gold Standard: Koder napisal zlozony algorytm, Redaktor pisze 2-zdaniowy komentarz, ktory sprawia, ze nastepny programista rozumie go w 5 sekund.

---

> **Czy wiesz, ze...?**
> Redaktor ma najnizsze obciazenie (Load: 35/100) w calej warstwie BUILD.
> Dla porownania: Koder ma 80/100, Designer 75/100, Integrator 60/100.
> Dlaczego? Bo polerowanie tekstu jest mniej zasobozerne obliczeniowo
> niz generowanie kodu czy implementacja CSS. Ale nie myl niskiego obciazenia
> z niska waznoscia — bez Redaktora cala dokumentacja projektu wyglada
> jak notatki na serwetce.

---

# 2. Kluczowe Obowiazki

Redaktor odpowiada za **piec podstawowych obszarow**:

## 2.1 Redakcja Dokumentacji Technicznej (Technical Documentation Editing)

To glowne zadanie Redaktora. Otrzymuje surowy tekst od Kodera, Integratora lub Orkiestratora i przeksztalca go w czytelna dokumentacje techniczna:

- Poprawa gramatyki, ortografii i interpunkcji
- Ujednolicenie terminologii w calym dokumencie
- Poprawa struktury — naglowki, akapity, listy, tabele
- Usuwanie zbednych powtorzen i rozwleklych fragmentow
- Zapewnienie logicznego przeplywu informacji

```markdown
# PRZED redakcja (surowy tekst od Kodera):

ta funkcja bierze liste uzytkownikow i zwraca tych co sa aktywni.
mozna tez przekazac limit jesli nie chcesz wszystkich.
uzywamy filter() bo jest szybszy.

# PO redakcji (tekst Redaktora):

## filterActiveUsers(users, limit?)

Filtruje liste uzytkownikow, zwracajac tylko aktywnych.
Opcjonalny parametr `limit` ogranicza liczbe wynikow.

| Parametr | Typ | Domyslnie | Opis |
|----------|-----|-----------|------|
| users | User[] | — | Lista uzytkownikow do filtrowania |
| limit | number | Infinity | Maks. liczba wynikow |
```

## 2.2 Tworzenie README.md i CHANGELOG.md (Documentation Generation)

Redaktor tworzy i utrzymuje kluczowe pliki dokumentacyjne projektu:

- **README.md** — instrukcja projektu: co to jest, jak uruchomic, jak uzyc
- **CHANGELOG.md** — historia zmian: co sie zmienilo miedzy wersjami

Te dwa pliki to "twarz projektu" — pierwsze, co widzi nowy deweloper lub uzytkownik. Ich jakosc bezposrednio wplywa na pierwsze wrazenie.

## 2.3 Dodawanie Komentarzy Inline do Kodu (Code Commenting)

Redaktor dodaje komentarze do kodu — ale **TYLKO do nietrivialnej logiki**. To kluczowe ograniczenie. Prompt systemowy mowi wprost: "Komentarze TYLKO dla nontrivial."

```javascript
// ZLE — Redaktor komentuje oczywisty kod:
// Ustawia zmienna x na 5
let x = 5;

// Ustawia nazwe uzytkownika
const userName = "Jan";

// DOBRZE — Redaktor komentuje nietrivialna logike:
// Uzywamy bitowego XOR do swap bez zmiennej tymczasowej
// bo dzialamy w kontekscie embedded z limitem pamieci 256B
a ^= b; b ^= a; a ^= b;
```

## 2.4 Zapewnienie Spojnosci Stylu (Style Consistency)

Redaktor pilnuje, aby caly projekt "mowil jednym glosem":

- Jednolita terminologia (nie raz "user", raz "uzytkownik", raz "klient")
- Spojny ton (albo formalny wszedzie, albo potoczny wszedzie)
- Jednolite formatowanie (naglowki, listy, bloki kodu)
- Spojne konwencje nazewnictwa w dokumentacji

## 2.5 Upraszczanie Jezyka Technicznego (Technical Language Simplification)

Redaktor przeksztalca zargon techniczny w zrozumialy jezyk — zachowujac precyzje, ale usuwajac niepotrzebna zlozonosc:

```
PRZED: "Implementacja wykorzystuje asynchroniczna iteracje
z wykorzystaniem generatorow ES2015+ w celu lazy evaluation
strumienia danych z rate-limitingiem opartym na token bucket."

PO: "Dane sa przetwarzane porcjami (lazy loading), z limitem
szybkosci zapytan (rate limiting), dzieki asynchronicznym
generatorom JavaScript."
```

---

> **Uwaga!**
> Redaktor NIE upraszcza do poziomu banalnosci. Tekst techniczny
> musi pozostac precyzyjny. Celem jest klarownosc, nie infantylizacja.
> "Funkcja zwraca Promise" to dobre uproszczenie.
> "Funkcja cos tam zwraca" to juz utrata informacji.

---

# 3. Czego Redaktor NIE Robi

Jasne granice sa kluczowe w architekturze multi-agent. Redaktor ma precyzyjnie zdefiniowany zakres — i wszystko poza nim to **czyjas inna odpowiedzialnosc**:

| Czynnosc | Kto ja wykonuje | Dlaczego nie Redaktor? |
|----------|-----------------|----------------------|
| Pisanie kodu (logika, algorytmy) | **Koder (B-01)** | Redaktor nie ma kompetencji kodowania |
| Projektowanie wizualne (CSS, layout) | **Designer (B-02)** | Redaktor nie widzi warstwy wizualnej |
| Prowadzenie researchu | **Researchers (R-01..R-06)** | Redaktor nie ma WebSearch/WebFetch |
| Integracja komponentow | **Integrator (B-04)** | Redaktor nie laczy modulow |
| Uruchamianie programow | **Koder (B-01)** | Redaktor NIE MA narzedzia Bash |
| Decyzje architektoniczne | **Planer (A-02)** | Redaktor nie podejmuje decyzji |

> **Uwaga!**
> Redaktor nie ma dostepu do narzedzia **Bash**. To oznacza, ze fizycznie
> NIE MOZE uruchomic zadnego programu, skryptu ani komendy terminalowej.
> Dziala wylacznie w swiecie plikow tekstowych. Jest to celowe ograniczenie
> — izoluje Redaktora od logiki kodu, aby skupil sie na tym, co robi
> najlepiej: tekst.

### Szesciu "NIGDY" Redaktora

1. **NIGDY** nie pisz kodu logicznego — to praca Kodera
2. **NIGDY** nie projektuj wizualnie — to praca Designera
3. **NIGDY** nie prowadz researchu — to praca Researcherow
4. **NIGDY** nie integruj komponentow — to praca Integratora
5. **NIGDY** nie uruchamiaj programow — nie masz Bash!
6. **NIGDY** nie podejmuj decyzji architektonicznych — to praca Planera

---

> **Czy wiesz, ze...?**
> W konfiguracji MVP (minimalnej) Redaktor nie istnieje. Dokumentacje
> pisze sam Koder — i zwykle jest ona znacznie gorsza jakosciowo.
> Redaktor pojawia sie dopiero w konfiguracji Gold Standard i OBSERVATORY,
> co potwierdza, ze jest agentem "premium quality" — nie jest niezbedny
> do dzialania systemu, ale jest niezbedny do **profesjonalnego** dzialania.

---

# 4. Model i Koszt

## Dlaczego Claude Sonnet?

Redaktor uzywa modelu **Claude Sonnet** ($3 za 1M tokenow wejsciowych / $15 za 1M tokenow wyjsciowych). To ten sam model co Koder i Designer. Dlaczego nie tanszy Haiku?

| Aspekt | Haiku | Sonnet (wybrano) |
|--------|-------|-----------------|
| Koszt | $0.25/$1.25 za 1M | $3/$15 za 1M |
| Jakosc tekstu | Przecietna — czeste powtorzenia, sztywny styl | Wysoka — naturalny jezyk, spojnosc stylistyczna |
| Rozumienie kontekstu | Ograniczone — gubi sie w dluzszych dokumentach | Dobre — utrzymuje spojnosc na przestrzeni tysiecy slow |
| Kreatywnosc jezykowa | Niska — szablonowe frazy | Srednia-wysoka — potrafi dopasowac ton |

**Wniosek:** Jakosc tekstu jest glownym produktem Redaktora. Uzycie tanszego modelu podwazyloby sens jego istnienia. Lepiej zapplacic wiecej za model, ktory faktycznie poprawia tekst, niz zaoszczedzic na modelu, ktory go psuje.

## Obciazenie: 35/100

Redaktor ma **najnizsze obciazenie** w calej warstwie BUILD:

```
Warstwa BUILD — obciazenie agentow:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Koder (B-01):      ████████████████████████████████████████  80/100
Designer (B-02):   ██████████████████████████████████████    75/100
Integrator (B-04): ████████████████████████████████          60/100
Redaktor (B-03):   ██████████████████                        35/100
```

**Dlaczego tak nisko?** Polerowanie tekstu wymaga mniej obliczen niz generowanie kodu (Koder), tworzenie CSS (Designer) czy laczenie komponentow (Integrator). Redaktor operuje na mniejszych fragmentach tekstu i wykonuje mniej skomplikowane transformacje.

## Budzet Tokenow

| Metryka | Zakres | Typowa wartosc |
|---------|--------|---------------|
| Input tokens | 500-2,000 | ~1,200 |
| Output tokens | 500-2,000 | ~1,500 |
| Laczny budzet | 1,300-4,300 | ~2,700 |
| Koszt za zadanie | $0.03-$0.12 | ~$0.06 |

> **Czy wiesz, ze...?**
> Redaktor to najtanszy agent w warstwie BUILD. Jego koszt za zadanie
> ($0.03-$0.12) to ulamek kosztu Kodera ($0.15-$0.50) czy Designera
> ($0.10-$0.35). To sprawia, ze dodanie Redaktora do pipeline'u
> jest jednym z najbardziej oplacalnych ulepszen — za kilka centow
> dostajesz profesjonalna dokumentacje.

---

# 5. Narzedzia

Redaktor ma dostep do **5 narzedzi** — wszystkie sluza pracy z plikami tekstowymi:

## 5.1 Write — Tworzenie Nowych Dokumentow

```
Write(file_path, content)
```

Redaktor uzywa Write do tworzenia nowych plikow dokumentacji — README.md, CHANGELOG.md, API docs. Write tworzy plik od zera lub nadpisuje istniejacy.

**Kiedy Write:** Gdy dokument nie istnieje i trzeba go stworzyc.

## 5.2 Edit — Modyfikacja Istniejacego Tekstu

```
Edit(file_path, old_string, new_string)
```

Najczesciej uzywane narzedzie Redaktora. Edit pozwala zmienic konkretny fragment tekstu bez ruszania reszty pliku. Idealny do poprawiania akapitow, naglow, definicji.

**Kiedy Edit:** Gdy dokument istnieje i trzeba poprawic fragment — gramatyke, styl, terminologie.

## 5.3 Read — Odczyt Plikow

```
Read(file_path)
```

Redaktor czyta istniejace pliki — sprawdza aktualny stan dokumentacji, czyta MANIFEST.md z wytycznymi stylu, analizuje surowy tekst od Kodera.

**Kiedy Read:** Na poczatku kazdego zadania — aby zrozumiec, co juz istnieje.

## 5.4 Grep — Wyszukiwanie Wzorcow w Tekscie

```
Grep(pattern, path)
```

Redaktor uzywa Grep do wyszukiwania niespojnosci terminologicznych — np. "Czy w projekcie uzywa sie 'user' czy 'uzytkownik'?" Grep przeszukuje wszystkie pliki i znajduje kazde wystapienie wzorca.

**Kiedy Grep:** Przy zapewnianiu spojnosci terminologii w calym projekcie.

## 5.5 Glob — Wyszukiwanie Plikow po Nazwie

```
Glob(pattern)
```

Redaktor uzywa Glob do znajdowania plikow dokumentacyjnych — "Gdzie sa wszystkie pliki *.md?", "Czy istnieje README.md?", "Ile plikow CHANGELOG mamy?"

**Kiedy Glob:** Przy inventaryzacji dokumentacji — co istnieje, co trzeba stworzyc.

## Narzedzia ZAKAZANE

| Narzedzie | Status | Powod zakazu |
|-----------|--------|-------------|
| **Bash** | ZAKAZANE | Redaktor nie uruchamia programow — dziala tylko z tekstem |
| **Agent** | ZAKAZANE | Redaktor nie deleguje zadan innym agentom |
| **WebSearch** | ZAKAZANE | Redaktor nie prowadzi researchu online |
| **WebFetch** | ZAKAZANE | Redaktor nie pobiera danych z internetu |

> **Uwaga!**
> Brak narzedzia Bash to **fundamentalne ograniczenie** Redaktora.
> Oznacza to, ze Redaktor nie moze:
> - Uruchomic skryptu sprawdzajacego gramatyke
> - Uruchomic lintera Markdown
> - Uruchomic komend git
> - Uruchomic zadnego programu
>
> Cala analiza tekstu musi byc robiona "recznie" przez model jezykowy,
> bez wsparcia zewnetrznych narzedzi. To celowy design — Redaktor
> jest "czystym" agentem tekstowym.

---

# 6. Workflow — Od Surowego Tekstu do Polerowanego Dokumentu

Redaktor realizuje **8-krokowy pipeline** w kazdym zadaniu:

```
┌──────────────────────────────────────────────────────────────┐
│                  WORKFLOW REDAKTORA (8 krokow)                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Krok 1: ODBIÓR — Otrzymaj surowy tekst od Kodera           │
│       │                                                      │
│       v                                                      │
│  Krok 2: KONTEKST — Przeczytaj MANIFEST.md                   │
│       │            (wytyczne stylu, terminologia)             │
│       v                                                      │
│  Krok 3: AUDYT — Przeanalizuj surowy tekst                   │
│       │         (co wymaga poprawy? styl? struktura?)        │
│       v                                                      │
│  Krok 4: README — Edytuj/stworz README.md                    │
│       │                                                      │
│       v                                                      │
│  Krok 5: CHANGELOG — Edytuj/stworz CHANGELOG.md              │
│       │                                                      │
│  Krok 6: KOMENTARZE — Dodaj inline comments                  │
│       │               (TYLKO nontrivial logic!)               │
│       v                                                      │
│  Krok 7: SPOJNOSC — Sprawdz spojnosc terminologii            │
│       │             (Grep po calym projekcie)                 │
│       v                                                      │
│  Krok 8: DOSTARCZENIE — Przekaz do Designer/Integrator       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Pozycja Redaktora w Sekwencji OBSERVATORY

W konfiguracji OBSERVATORY agenci BUILD dzialaja **sekwencyjnie**:

```
Koder (B-01) ──> REDAKTOR (B-03) ──> Designer (B-02) ──> Integrator (B-04)
   pisze kod       poleruje tekst      dodaje styl         laczy wszystko
```

Redaktor jest **drugim** w kolejce. Dlaczego akurat po Koderze?

1. **Koder** pisze surowy HTML z treska — ale ta tresc jest chaotyczna
2. **Redaktor** bierze surowy tekst i poleruje go — zanim Designer "ubierze" go wizualnie
3. **Designer** dodaje CSS/styl — ale tekst musi juz byc dobry, bo Designer nie edytuje tresci
4. **Integrator** laczy gotowe komponenty — tekst i styl sa juz finalne

> **Czy wiesz, ze...?**
> Gdyby Redaktor pracowal PO Designerze, moglby przypadkowo zepsuc
> wizualne formatowanie, zmieniajac tekst, ktory Designer juz ostylowal.
> Dlatego sekwencja jest celowa: najpierw tresc, potem wizualizacja.

---

# 7. Formaty Dokumentow

Redaktor tworzy i edytuje cztery glowne typy dokumentow:

## 7.1 README.md — Struktura

```markdown
# Nazwa Projektu

Krotki opis w 1-2 zdaniach. Co to jest? Dla kogo?

## Wymagania

- Node.js >= 18
- npm >= 9

## Instalacja

\```bash
git clone https://github.com/repo/projekt.git
cd projekt
npm install
\```

## Uzycie

\```bash
npm start
\```

## Konfiguracja

| Zmienna | Domyslnie | Opis |
|---------|-----------|------|
| PORT | 3000 | Port serwera |
| DEBUG | false | Tryb debugowania |

## Licencja

MIT
```

**Zasady Redaktora dla README:**
- Zawsze zaczynaj od JEDNEGO zdania opisu — nie od naglowka "Wprowadzenie"
- Sekcja "Instalacja" musi byc copy-paste'owalna (dzialajacy kod)
- Unikaj marketingowego jezyka ("niesamowity", "rewolucyjny")
- Kazda tabela musi miec naglowki

## 7.2 CHANGELOG.md — Format

```markdown
# Changelog

## [1.2.0] - 2026-03-28

### Dodane
- Nowy endpoint API `/users/search` z filtrowaniem
- Walidacja email w formularzu rejestracji

### Zmienione
- Limit wynikow paginacji: 20 → 50
- Migracja z Express.js 4 na Express.js 5

### Naprawione
- Blad wyswietlania daty w strefie czasowej UTC+2
- Memory leak przy dlugich sesjach WebSocket

### Usuniete
- Przestarzaly endpoint `/api/v1/legacy`
```

**Zasady Redaktora dla CHANGELOG:**
- Format: [Keep a Changelog](https://keepachangelog.com/)
- Kategorie: Dodane, Zmienione, Naprawione, Usuniete
- Kazdy wpis to jedno zdanie zaczynajace sie od czasownika
- Data w formacie ISO: YYYY-MM-DD

## 7.3 Dokumentacja API

```markdown
## POST /api/users

Tworzy nowego uzytkownika.

### Request

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| name | string | tak | Imie i nazwisko |
| email | string | tak | Adres email |
| role | string | nie | Rola (domyslnie: "viewer") |

### Response (201 Created)

\```json
{
  "id": "usr_abc123",
  "name": "Jan Kowalski",
  "email": "jan@example.com",
  "role": "viewer",
  "created_at": "2026-03-28T10:30:00Z"
}
\```

### Bledy

| Kod | Opis |
|-----|------|
| 400 | Brakujace wymagane pole |
| 409 | Email juz istnieje |
| 500 | Blad serwera |
```

## 7.4 Komentarze Inline — Najlepsze Praktyki

```javascript
// DOBRZE — komentarze dla nietrivialnej logiki:

// Debounce 300ms zapobiega nadmiernym zapytaniom API
// przy szybkim wpisywaniu w pole wyszukiwania
const debouncedSearch = debounce(handleSearch, 300);

// Cache invalidation co 5 min — kompromis miedzy swiezoscia
// danych a obciazeniem bazy (benchmark: 50% redukcja query)
const CACHE_TTL = 5 * 60 * 1000;

// ZLE — komentarze dla oczywistego kodu:

// Importujemy React
import React from 'react';

// Definiujemy komponent
function App() { ... }

// Zwracamy JSX
return <div>...</div>;
```

**Zasada Redaktora:** Komentarz powinien odpowiadac na pytanie "DLACZEGO?", nie "CO?". Kod mowi co robi. Komentarz mowi dlaczego.

---

> **Uwaga!**
> Redaktor NIGDY nie dodaje komentarzy do kazdej linii kodu.
> Prompt systemowy jest jednoznaczny: "Komentarze TYLKO dla nontrivial."
> Over-commenting to jeden z najczestszych anty-wzorcow (sekcja 9.2).

---

# 8. Redaktor vs Inne Builderzy

## Tabela Porownawcza

| Aspekt | Koder (B-01) | Designer (B-02) | Redaktor (B-03) | Integrator (B-04) |
|--------|-------------|-----------------|-----------------|-------------------|
| **Rola** | Pisze kod | Implementuje CSS | Poleruje tekst | Laczy komponenty |
| **Load** | 80/100 | 75/100 | **35/100** | 60/100 |
| **Model** | Sonnet | Sonnet | Sonnet | Sonnet |
| **Bash?** | TAK | TAK | **NIE** | TAK |
| **Output** | .html, .js, .py | .css, tokens | .md, komentarze | Gotowy projekt |
| **Koszt** | $0.15-$0.50 | $0.10-$0.35 | **$0.03-$0.12** | $0.10-$0.40 |
| **Tokeny (in)** | 20K-40K | 15K-30K | **500-2K** | 15K-35K |
| **Tokeny (out)** | 10K-30K | 8K-20K | **500-2K** | 5K-15K |
| **Kolejnosc** | 1. | 3. | **2.** | 4. |

### Kluczowe Roznice

**Redaktor vs Koder:**
Koder tworzy — Redaktor poleruje. Koder pisze surowy README z notatkami deweloperskimi. Redaktor zamienia te notatki w czytelna dokumentacje. Koder ma Bash (uruchamia kod). Redaktor NIE MA Bash (dziala tylko z tekstem).

**Redaktor vs Designer:**
Designer zajmuje sie **wyglad em** — kolory, fonty, layout. Redaktor zajmuje sie **trescia** — slowa, struktura, czytelnosc. Designer nie edytuje tekstu. Redaktor nie edytuje CSS.

**Redaktor vs Integrator:**
Integrator **laczy** gotowe elementy w calosc. Redaktor **doskonali** jeden element — tekst. Integrator widzi caly projekt. Redaktor widzi tylko pliki dokumentacyjne.

---

> **Czy wiesz, ze...?**
> Redaktor jest jedynym agentem BUILD, ktory NIE MA dostepu do narzedzia Bash.
> Koder, Designer i Integrator — wszyscy moga uruchamiac komendy terminalowe.
> Redaktor jest swiadomie odcietz od swiata kodu, aby nie korcilo go
> "naprawiac" logike zamiast skupiac sie na tekscie.

---

# 9. Anty-wzorce

Piec najczestszych bledow, ktore Redaktor moze popelnic:

## 9.1 Code Writer — Redaktor Pisze Kod

**Opis:** Redaktor zamiast edytowac dokumentacje, zaczyna pisac lub modyfikowac logike kodu — zmienia nazwy zmiennych, poprawia algorytmy, dodaje walidacje.

```
ZLE: Redaktor edytuje plik app.js i zmienia:
     if (user.active) → if (user.active && user.verified)

     To NIE jest komentarz inline — to logika biznesowa!

DOBRZE: Redaktor zauwaza brak komentarza przy zlozonej logice
        i dodaje:
        // Sprawdzamy aktywnosc — weryfikacja dodana w v1.2
        // po incydencie z nieaktywnymi kontami (JIRA-456)
```

**Dlaczego to problem?** Redaktor nie rozumie pelnego kontekstu kodu. Zmiana logiki bez zrozumienia calego systemu moze wprowadzic bledy, ktore sa trudne do wykrycia.

## 9.2 Over-Commenter — Komentarze Do Kazdej Linii

**Opis:** Redaktor dodaje komentarze do oczywistego kodu, zamiast skupiac sie na nietrivialnych fragmentach. Efekt: kod jest zasmiecony bezwartosciowymi komentarzami.

```
ZLE:
// Deklarujemy zmienna count
let count = 0;
// Tworzymy petle for
for (let i = 0; i < items.length; i++) {
  // Zwiekszamy count o 1
  count++;
}
// Zwracamy count
return count;

DOBRZE:
// Zlicza aktywne elementy liniowo — O(n).
// Nie uzywamy .filter().length bo chcemy uniknac alokacji
// tymczasowej tablicy (performance-critical path)
let count = 0;
for (let i = 0; i < items.length; i++) {
  count++;
}
return count;
```

**Dlaczego to problem?** Over-commenting sprawia, ze naprawde wazne komentarze gina w szumie. Gdy wszystko jest skomentowane, nic nie jest skomentowane.

## 9.3 Style Drift — Niespojny Styl

**Opis:** Redaktor uzywa roznego stylu w roznych czesciach dokumentu — raz formalny, raz potoczny; raz "ty", raz "Panstwo"; raz "user", raz "uzytkownik".

```
ZLE (niespojnosc w jednym dokumencie):

Strona 1: "Uzytkownik moze skonfigurowac parametry polaczenia..."
Strona 3: "Wlacz modul i kliknij 'Go' — to takie proste!"
Strona 5: "Pan/Pani powinien/powinna zweryfikowac ustawienia..."

DOBRZE (spojny styl):

Strona 1: "Skonfiguruj parametry polaczenia..."
Strona 3: "Wlacz modul i kliknij 'Start'..."
Strona 5: "Zweryfikuj ustawienia..."
```

**Dlaczego to problem?** Niespojny styl sprawia, ze dokumentacja wyglada na pisana przez wiele osob bez koordynacji — co jest ironiczne, bo wlasnie dlatego Redaktor istnieje.

## 9.4 Verbosity Trap — Rozwleklosc Zamiast Klarownosci

**Opis:** Redaktor dodaje slowa zamiast je usuwac. Surowy tekst miescil sie w 3 zdaniach, po "redakcji" zajmuje 3 akapity — ale nie zawiera wiecej informacji.

```
ZLE (Redaktor "rozbudowuje"):

"Funkcja filterActiveUsers to niezwykle wazna i kluczowa
funkcja w naszym systemie. Jej glownym i podstawowym
zadaniem jest filtrowanie listy uzytkownikow w taki sposob,
aby zwrocic wylacznie tych uzytkownikow, ktorzy aktualnie
posiadaja status aktywnego uzytkownika w systemie."

DOBRZE (Redaktor kondensuje):

"filterActiveUsers — zwraca uzytkownikow ze statusem
`active: true`. Przyjmuje tablice User[], zwraca
przefiltrowana tablice."
```

**Dlaczego to problem?** Wiecej slow ≠ lepsza dokumentacja. Programisci czytaja dokumentacje pod presja czasu. Kazde zbedne slowo to stracona sekunda.

## 9.5 Invisible Redaktor — Brak Widocznej Poprawy

**Opis:** Redaktor dostaje surowy tekst i oddaje go praktycznie bez zmian — moze poprawi literowke, ale nie dotyka struktury, czytelnosci ani spojnosci.

```
ZLE (minimalny wysilek):

PRZED: "ta funcja filtruje usery po active i limit optional"
PO:    "ta funkcja filtruje usery po active i limit optional"
       (poprawiono: funcja → funkcja. Nic wiecej.)

DOBRZE (pelna redakcja):

PRZED: "ta funcja filtruje usery po active i limit optional"
PO:    "## filterActiveUsers(users, limit?)
        Filtruje uzytkownikow po statusie aktywnosci.
        Opcjonalny `limit` ogranicza liczbe wynikow."
```

**Dlaczego to problem?** Jesli Redaktor nie poprawia tekstu znaczaco, to jego istnienie w pipeline'ie jest kosztem bez wartosci. Kazdy agent musi dostarczac mieszana wartosc uzywajac tokenow, za ktore placi system.

---

# 10. Standardy Jakosci Tresci

Redaktor stosuje precyzyjne standardy jakosci przy kazdej redakcji:

## 10.1 Styl: Zwiezly i Techniczny

Prompt systemowy Redaktora mowi: **"Styl: zwiezly, techniczny."**

| Cecha | Opis | Przyklad |
|-------|------|---------|
| Zwiezlosc | Minimum slow, maksimum informacji | "Zwraca null jesli brak wynikow" nie "W przypadku gdy..." |
| Technicznosc | Precyzyjne terminy, nie ogolniki | "Promise<User[]>" nie "obiekt z danymi" |
| Strona czynna | Podmiot + orzeczenie | "Funkcja zwraca" nie "Jest zwracane przez" |
| Bezposredniosc | Polecenia, nie sugestie | "Uruchom npm install" nie "Mozesz sprobowac..." |

## 10.2 Formatowanie Markdown

```markdown
# Zasady formatowania Redaktora:

1. Naglowki: # dla tytulow, ## dla sekcji, ### dla podsekcji
2. Listy: - dla nieuporadkowanych, 1. dla krokow
3. Kod inline: `nazwaFunkcji()` w backtickach
4. Bloki kodu: z oznaczeniem jezyka (```js, ```bash, ```json)
5. Tabele: dla danych porownawczych (min. 2 kolumny)
6. Boldowanie: **kluczowe terminy** tylko gdy naprawde wazne
7. Cytaty: > dla waznych uwag i ostrzezen
```

## 10.3 Terminologia

Redaktor utrzymuje **slownik projektu** — liste preferowanych terminow:

| Uzywaj | Nie uzywaj | Powod |
|--------|-----------|-------|
| uzytkownik | user, klient, osoba | Spojnosc w polskiej dokumentacji |
| endpoint | punkt koncowy | Termin techniczny bez dobrego tlumaczenia |
| response | odpowiedz | Standard w kontekscie API |
| middleware | warstwa posrednia | Termin powszechnie rozumiany w oryginale |

## 10.4 Dlugosc Dokumentow

| Typ dokumentu | Optymalna dlugosc | Maksymalna dlugosc |
|---------------|-------------------|-------------------|
| README.md | 100-200 linii | 300 linii |
| CHANGELOG (wpis) | 5-15 linii | 30 linii |
| API doc (endpoint) | 20-40 linii | 60 linii |
| Komentarz inline | 1-3 linie | 5 linii |

---

# 11. Najlepsze Praktyki — 8 Zasad

## Praktyka 1: Zawsze Czytaj MANIFEST Przed Redakcja

MANIFEST.md zawiera wytyczne stylistyczne projektu — terminologie, konwencje, ton. Redaktor czyta go przed kazdym zadaniem. Pisanie bez MANIFESTu to jak edytowanie ksiazki bez znajomosci gatunku.

## Praktyka 2: Zacznij Od Struktury, Potem Tresc

Najpierw ustal naglowki, sekcje, hierarchie informacji. Dopiero potem pisz/edytuj tresc w kazdej sekcji. Struktura to szkielet — bez niego tekst sie rozlazi.

## Praktyka 3: Jedno Przejscie = Jeden Cel

Nie probuj poprawic gramatyki, struktury i spojnosci terminologicznej w jednym przejsciu. Kazde przejscie przez tekst powinno miec jeden cel:

```
Przejscie 1: Struktura (naglowki, sekcje, kolejnosc)
Przejscie 2: Tresc (gramatyka, klarownosc, zwiezlosc)
Przejscie 3: Spojnosc (terminologia, ton, formatowanie)
```

## Praktyka 4: Uzywaj Edit Zamiast Write Dla Istniejacych Plikow

Write nadpisuje caly plik. Edit zmienia tylko wskazany fragment. Przy duzych dokumentach Edit jest bezpieczniejszy — nie ryzykujesz utraty tekstu, ktory juz byl dobry.

```
ZLE:  Write("README.md", caly_nowy_tekst)  — nadpisuje wszystko
DOBRZE: Edit("README.md", stary_fragment, nowy_fragment)  — precyzyjnie
```

## Praktyka 5: Komentarze = DLACZEGO, Nie CO

Kod mowi CO robi. Komentarz mowi DLACZEGO. Jesli komentarz powtarza to, co kod juz jasno komunikuje, jest zbedny.

```javascript
// ZLE — mowi CO:
// Sortujemy tablice
arr.sort((a, b) => a.date - b.date);

// DOBRZE — mowi DLACZEGO:
// Sortowanie chronologiczne wymagane przez API v3
// (wczesniejsze wersje akceptowaly dowolna kolejnosc)
arr.sort((a, b) => a.date - b.date);
```

## Praktyka 6: Testuj Czytelnosc — Regula 5 Sekund

Kazdy akapit dokumentacji powinien byc zrozumialy w 5 sekund. Jesli wymaga ponownego przeczytania — jest zbyt zlozony. Podziel na krotsze zdania, dodaj liste punktowana, uzyj tabeli.

## Praktyka 7: Grep Przed Dostarczeniem

Przed oddaniem dokumentacji uzyj Grep do sprawdzenia spojnosci terminologii w calym projekcie. Jeden niespojny termin w 50-stronicowej dokumentacji podwaza zaufanie do calosci.

```
Grep("user")     — czy wszedzie "uzytkownik" zamiast "user"?
Grep("TODO")     — czy nie zostawiono niedokonczonych fragmentow?
Grep("FIXME")    — czy nie ma zapomniane poprawek?
```

## Praktyka 8: Eskaluj Niejasnosci

Jesli surowy tekst od Kodera jest niezrozumialy — nie zgaduj. Eskaluj do Orkiestratora z konkretnym pytaniem. Redaktor, ktory zgaduje intencje autora, moze napisac czytelna, ale BLEDNA dokumentacje — co jest gorsze niz brzydka, ale poprawna.

```
"Fragment 'optimized for throughput with backpressure'
wymaga dokladu — czy chodzi o backpressure w sensie
Node.js streams, czy w sensie message queue? Prosze
o doprecyzowanie od Kodera."
```

---

# 12. Podsumowanie

## Kto To Jest?

Redaktor (B-03) to agent jakosci tresci w warstwie BUILD. Przeksztalca surowy tekst w profesjonalna dokumentacje — README, CHANGELOG, API docs, komentarze inline.

## Kluczowa Wartosc

**Bez Redaktora:** surowa dokumentacja od Kodera — chaotyczna, niespoja, trudna do czytania. Nowy deweloper marnuje godziny na zrozumienie projektu.

**Z Redaktorem:** polerowana, spojna, profesjonalna dokumentacja. Nowy deweloper rozumie projekt w 10 minut. Koszt: $0.03-$0.12 za zadanie.

## Pozycja w Hierarchii

```
Poziom 0: Orkiestrator ──── strategia
Poziom 1: Analityk + Planer ──── planowanie
Poziom 2: 6x Researchers ──── badanie
Poziom 3: Koder + Designer + REDAKTOR + Integrator ──── BUDOWANIE  <-- TUTAJ
Poziom 4: QA Security + QA Quality + Manager QA ──── jakosc
```

## Pozycja w Sekwencji OBSERVATORY

```
Koder (1.) ──> REDAKTOR (2.) ──> Designer (3.) ──> Integrator (4.)
pisze kod      poleruje tekst    dodaje styl       laczy wszystko
```

---

## Quick Reference Card

```
+================================================================+
|                                                                |
|            QUICK REFERENCE CARD — REDAKTOR (B-03)              |
|                                                                |
+================================================================+
|                                                                |
|  ROLA:     Jakosc tresci — redakcja, dokumentacja, komentarze  |
|  WARSTWA:  BUILD / TRESC I STYL (Level 3)                      |
|  MODEL:    Claude Sonnet ($3 input / $15 output per 1M)        |
|  LOAD:     35/100 (NAJNIZSZY w warstwie BUILD)                 |
|                                                                |
+----------------------------------------------------------------+
|                                                                |
|  NARZEDZIA DOZWOLONE:                                          |
|    Write ... tworzenie nowych dokumentow                       |
|    Edit .... modyfikacja istniejacego tekstu                   |
|    Read .... odczyt plikow i wytycznych                        |
|    Grep .... wyszukiwanie wzorcow (spojnosc terminologii)      |
|    Glob .... wyszukiwanie plikow dokumentacyjnych              |
|                                                                |
|  NARZEDZIA ZAKAZANE:                                           |
|    Bash ........ brak dostepu do terminala                     |
|    Agent ....... brak delegowania                              |
|    WebSearch ... brak researchu online                         |
|    WebFetch .... brak pobierania z internetu                   |
|                                                                |
+----------------------------------------------------------------+
|                                                                |
|  TOKENY:   Input: 500-2K | Output: 500-2K                     |
|  KOSZT:    $0.03-$0.12 za zadanie                              |
|  BUDZET:   1,300-4,300 tokenow lacznie                        |
|                                                                |
+----------------------------------------------------------------+
|                                                                |
|  OUTPUT:                                                       |
|    1. README.md (instrukcja projektu)                          |
|    2. CHANGELOG.md (historia zmian)                            |
|    3. API documentation (endpointy, parametry)                 |
|    4. Inline comments (TYLKO nontrivial!)                      |
|                                                                |
+----------------------------------------------------------------+
|                                                                |
|  WORKFLOW:                                                     |
|    Surowy tekst → MANIFEST → Audyt → README → CHANGELOG →     |
|    → Komentarze → Spojnosc → Dostarczenie                     |
|                                                                |
|  ANTY-WZORCE:                                                  |
|    1. Code Writer         4. Verbosity Trap                    |
|    2. Over-Commenter      5. Invisible Redaktor                |
|    3. Style Drift                                              |
|                                                                |
|  SEKWENCJA OBSERVATORY:                                        |
|    Koder (1.) → REDAKTOR (2.) → Designer (3.) → Integrator    |
|                                                                |
|  ZASADA: Redaktor POLERUJE tekst, nie pisze kodu.              |
|  Komentarze TYLKO dla nontrivial logic.                        |
|                                                                |
+================================================================+
```

---

## Slownik (Glossary)

| Termin | Definicja |
|--------|----------|
| **BUILD Layer** | Trzecia warstwa systemu — agenci implementujacy (Koder, Designer, Redaktor, Integrator) |
| **Load** | Miara obciazenia agenta w skali 0-100. Redaktor ma 35/100 — najnizszy w BUILD. |
| **MANIFEST.md** | Plik z wytycznymi stylistycznymi projektu — terminologia, konwencje, ton |
| **Document sandbox** | Izolowane srodowisko Redaktora — widzi tylko pliki tekstowe, nie kod logiczny |
| **Inline comment** | Komentarz w kodzie zrodlowym — Redaktor dodaje TYLKO do nietrivialnej logiki |
| **README.md** | Glowny plik dokumentacyjny projektu — instrukcja dla nowych deweloperow |
| **CHANGELOG.md** | Historia zmian projektu — co sie zmienilo, dodalo, naprawilo miedzy wersjami |
| **Style consistency** | Spojnosc stylu — jednolity ton, terminologia i formatowanie w calym projekcie |
| **Nontrivial logic** | Fragmenty kodu, ktore nie sa oczywiste — wymagaja komentarza "dlaczego" |
| **OBSERVATORY** | Konfiguracja sekwencyjna: agenci BUILD dzialaja jeden po drugim |
| **Gold Standard** | Pelna konfiguracja z wszystkimi warstwami i agentami (16 agentow) |
| **Token budget** | Limit tokenow (wejsciowych/wyjsciowych) przydzielony agentowi na zadanie |
| **Verbosity** | Rozwleklosc tekstu — wiecej slow bez wiecej informacji. Anty-wzorzec Redaktora. |
| **Keep a Changelog** | Standard formatowania CHANGELOG.md — kategorie: Added, Changed, Fixed, Removed |
| **Active voice** | Strona czynna — "Funkcja zwraca" zamiast "Jest zwracane przez funkcje" |

---

## Zrodla

1. Gold Standard 2026 — Architektura Multi-Agent AI (dokumentacja wewnetrzna)
2. Anthropic Claude Model Cards — specyfikacje Haiku, Sonnet, Opus
3. Agent Architecture Designer — konfiguracje pipeline'ow
4. OBSERVATORY Configuration — specyfikacja sekwencyjna BUILD layer
5. Keep a Changelog — standard formatowania CHANGELOG.md

---

# PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz prezentacje wideo (5-7 minut) o Redaktorze (B-03) — agencie jakosci tresci w architekturze Gold Standard 2026.

**Hook otwierajacy (0:00-0:30):**
"Raw code without documentation is a gift that expires overnight." Pokaz ekran z surowym kodem po lewej — chaotyczne komentarze, brak README, niezrozumiale nazwy zmiennych. Po prawej: ten sam projekt PO pracy Redaktora — czytelne README, spojny CHANGELOG, komentarze, ktore tlumasza "dlaczego". Animacja: surowy tekst "przeplywa" przez filtr oznaczony "Redaktor" i wychodzi polerowany.

**Motyw wizualny:**
Ciepla paleta pergaminowo-papierowa — literacki, redaktorski feel. Tlo: ciepla biel (#faf8f5) z delikatna tekstura papieru. Kolor glowny: ink-blue (#1a365d) — jak atrament na papierze. Kolor akcentowy: przyciemnione zloto (#b8860b) — jak pioro wieczne. Font naglowkow: serif (Georgia/Playfair). Font kodu: JetBrains Mono.

**Czesc 1 — Kim jest Redaktor? (0:30-1:30):**
Trzy analogie wizualne:
- Redaktor w wydawnictwie: split screen — surowy rekeopis po lewej, gotowa ksiazka po prawej
- Inzynier dzwieku: surowe sciezki audio (chaotyczne fale) → zmiksowany album (czyste fale)
- Kurator muzealny: 50-stronicowa praca naukowa → 50-slowna etykieta pod eksponatem
Kazda analogia jako 15-sekundowa animacja.

**Czesc 2 — Before/After Showcase (1:30-3:00):**
Centralny element prezentacji. Pokaz trzy transformacje:
1. Surowy README → Polerowany README (side-by-side, roznice podswietlone)
2. Surowy CHANGELOG → Sformatowany CHANGELOG (Keep a Changelog standard)
3. Over-commented code → Nontrivial-only comments (usun szum, zostaw wartosc)
Animacja: czerwone fragmenty (ZLE) plynnie zamieniaja sie w zielone (DOBRZE).

**Czesc 3 — Pipeline Position (3:00-4:00):**
Diagram sekwencji OBSERVATORY: Koder → REDAKTOR (podswietlony) → Designer → Integrator. Animacja: surowy tekst wychodzi z Kodera jako "chaotyczny strumien", wchodzi w Redaktora, wychodzi jako "uporadkowany strumien". Wyjasnij dlaczego Redaktor jest PRZED Designerem.

**Czesc 4 — Narzedzia i Ograniczenia (4:00-5:00):**
5 narzedzi jako ikony na biurku redaktora (pioro, olowek, lupa, mapa, notatnik). Bash jako zamkniety na klucz szafka — Redaktor nie ma do niej dostepu. Wizualizacja "document sandbox" — Redaktor w bance, ktora przepuszcza tylko tekst.

**Czesc 5 — Anty-wzorce (5:00-6:00):**
5 anty-wzorcow jako "grzechy redaktorskie" — kazdy z ikona:
1. Code Writer (klawiatura z czerwonym X)
2. Over-Commenter (dokument zasmiecony komentarzami)
3. Style Drift (rozne fonty/style w jednym dokumencie)
4. Verbosity Trap (balon nadmuchany slowami)
5. Invisible Redaktor (przezroczysty cien — nic nie zmienil)
Kazdy grzech: 3-sekundowa animacja problemu, 3-sekundowa animacja rozwiazania.

**Zamkniecie (6:00-7:00):**
"Documentation is how your code survives you." Statystyka: Redaktor kosztuje $0.03-$0.12 za zadanie — to cena kawy z automatu za profesjonalna dokumentacje. Quick Reference Card jako ostatni slajd z ciepla ramka pergaminowa.

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike edukacyjna o Redaktorze (B-03) — agencie jakosci tresci w architekturze Gold Standard 2026.

**Styl wizualny:** Ciepla, literacka estetyka. Tlo: ciepla biel (#faf8f5) z delikatna tekstura papieru. Kolor glowny: ink-blue (#1a365d). Kolor akcentowy: przyciemnione zloto (#b8860b). Fonty: serif dla naglowkow (Playfair Display), monospace dla kodu (JetBrains Mono), sans-serif dla body (Inter). Ikony: minimalistyczne, liniowe, w kolorze ink-blue.

**Naglowek:** "Redaktor (B-03) — Stracznik Jakosci Tresci" z ikona piora wiecznego i atramentu. Podtytul: "Agent redakcji dokumentacji | Warstwa BUILD | Poziom 3 | Load: 35/100".

**Sekcja 1 — Before/After Showcase:**
Centralny element infografiki. Dwie kolumny:
- PRZED (lewa, czerwone tlo): surowy tekst — chaotyczny, niespojny, bez struktury
- PO (prawa, zielone tlo): polerowany tekst — czytelny, spojny, sformatowany
Trzy przyklady: README, CHANGELOG, komentarz inline.

**Sekcja 2 — 4 Typy Dokumentow:**
Ikony w rzedzie: (1) README.md z ikona ksiazki, (2) CHANGELOG.md z ikona historii, (3) API Docs z ikona endpointu, (4) Inline Comments z ikona kodu. Pod kazda ikona: 1-zdaniowy opis.

**Sekcja 3 — Workflow Pipeline:**
Poziomy flowchart: 8 krokow od "Surowy tekst" do "Polerowany dokument". Kazdy krok jako okragly token na linii, z ikona i etykieta. Podswietlone kroki 3 (Audyt) i 7 (Spojnosc) jako krytyczne.

**Sekcja 4 — Sekwencja OBSERVATORY:**
Pozioma strzalka z 4 agentami: Koder → REDAKTOR (podswietlony na zloto) → Designer → Integrator. Opis pod kazda strzalka: "surowy tekst", "polerowany tekst", "ostylowany tekst", "gotowy projekt".

**Sekcja 5 — Narzedzia:**
5 dozwolonych narzedzi jako zielone ikony, 4 zakazane jako czerwone ikony z przekresleniem. Wyeksponowane: brak Bash — "Redaktor nie uruchamia programow."

**Sekcja 6 — 5 Anty-wzorcow:**
Pionowa lista z czerwonymi ikonami X:
1. Code Writer — pisze logike zamiast tekstu
2. Over-Commenter — komentarze do kazdej linii
3. Style Drift — niespojny ton i terminologia
4. Verbosity Trap — wiecej slow, nie wiecej informacji
5. Invisible Redaktor — brak widocznej poprawy

**Sekcja 7 — Key Stats:**
Badze/pilulki w jednym rzedzie:
- Model: Sonnet
- Load: 35/100
- Koszt: $0.03-$0.12
- Tokeny: 1.3K-4.3K
- Narzedzia: 5/9

**Stopka:** "Gold Standard 2026 — BUILD Layer" z linia postepu (Poziom 3 z 5 podswietlony). Logo piora wiecznego w ink-blue.
