# PLAN ITERACJI 1 - v33

> Dokument do zatwierdzenia przez Macieja PRZED jakimkolwiek kodem. Zero zmian dopoki nie powie "zatwierdzam".
> Data: 2026-08-21. Zrodla: SYNTHESIS.md, SYNTHESIS_FINAL_v33.md, ADDENDUM_RECENT_6MC.md, RR6_brief_faktyczny.md
> + feedback Macieja runda 1 i 2.

## Zasady tej iteracji (constraints)

1. **Forma: "najpierw encyklopedia, plugin pozniej"** - iteracja 1 rozbudowuje DANE (agenci/presety) + dodaje
   PIERWSZY wzorzec kategoryzacji wizualnej. Pakowanie jako plugin i marketplace = v34, NIE teraz.
2. **UX inkrementalnie** - w tej iteracji jeden wzorzec kategoryzacji, Maciej ocenia, zostawiamy albo cofamy.
3. **Wersjonowanie** - nowa wersja = nowy plik (nie nadpisujemy v32.16). Robocza nazwa buildu: v33.0.
4. **Kazdy nowy agent .md konczy sie promptami video + infografika** (standard projektu).
5. **Zero em-dashy, tylko zwykle myslniki. PL + EN parity** (kazdy nowy byt dwujezycznie, jak reszta v32.16).
6. **Nazwa projektu** - NIE ruszamy w tej iteracji, decyzja na sam koniec przed publikacja.
7. **Zrodlo prawdy** - najnowszy HTML v32.16 dla istniejacych definicji; przy sprzecznych liczbach obowiazuja
   rozstrzygniecia CRITIC (37 skills, 44 komendy).

---

## Pelna mapa drogowa v33 (zeby bylo widac calosc, nie tylko iteracje 1)

| # | Element | Iteracja | Uzasadnienie |
|---|---------|----------|--------------|
| 1 | P0 higiena katalogu (deep-research-v2, bento-redesign, licznik deep-five-minds) | **1** | zero ryzyka, odblokowuje routing |
| 2 | Pipeline pisarski: style-profiler + voice-writer + voice-QA + preset /voice | **1** | flagowa nowa zdolnosc, mocne poparcie |
| 3 | Kategoryzacja wizualna v1 (kolory kategorii + chip-filtry) | **1** | odpowiedz na pytanie #1 Macieja |
| 4 | Kuchmistrz (agent + preset) | **1 (stretch)** | osobisty use-case, samodzielny, n=0 OK |
| 5 | Suite kariery: career-document-builder + interview_coach + /kariera | 2 | wymaga pipeline pisarskiego z iter 1 jako fundamentu |
| 6 | /decision-research (reuzycie res_reddit/res_forums) | 2 | tani, ale nie flagowy |
| 7 | content_social (LinkedIn/FB w Twoim glosie) | 2 | reuzywa profil glosu z iter 1 |
| 8 | Blackboard + guardrails jako wpisy encyklopedyczne | 2 | koncept edu, nie wplywa na iter 1 |
| 9 | Anti-groupthink: sekcje "ograniczenia debaty" w five-minds/deep-five-minds/perf-squad | 2 | edu, silne dowody arXiv |
| 10 | Effort per agent (37 agentow) + aktualizacja routingu modeli | 2-3 | duza rewizja, lepiej po iter 1 |
| 11 | Dwa hooki (modele + token-warning) + Task Budgets | 3 | blizej "instalowalnosci", reuzyc research-hooks |
| 12 | Live progress: browser view realtime + replay | 3 | differentiator, ale wiekszy build |
| 13 | Drugi wymiar kategoryzacji (koszt/rozmiar) + kolejne wzorce R7 | 3+ | inkrementalnie po ocenie v1 |
| 14 | Filmy PL/ENG + instrukcja instalacji | przed publikacja | onboarding laikow |
| 15 | Publikacja researchu (zanonimizowana) + wpis awesome-claude-code | przed publikacja | marketing |
| 16 | Plugin packaging + eksport do marketplace Anthropic | v34 | po ustabilizowaniu danych |
| 17 | Decyzja o nazwie | sam koniec | tuz przed GitHub |

---

## ITERACJA 1 - szczegolowy zakres

### 1A. Higiena P0 (najpierw, bo zero ryzyka i odblokowuje resztе)

**Cel:** katalog routingu ma odzwierciedlac prawdziwy stan.

Zadania:
- Dodac `deep-research-v2` do `PRESET_CATALOG.md` (dzis go NIE MA, a to najczesciej uzywany preset -> auto-router
  go nie widzi). Szkic wpisu jest juz w SYNTHESIS.md.
- Dodac `bento-redesign` do katalogu (tez brakuje).
- Poprawic licznik agentow `deep-five-minds`: katalog mowi 27, realnie 25.
- Zsynchronizowac liczby w CLAUDE.md/dokumentacji: 37 skills, 44 komendy (dzis "35/42" to liczby encyklopedyczne).
- (opcjonalnie w 1A, jesli szybkie) dopisac ostrzezenie o limitach subagentow 20/200/depth-3 do
  docs/ROUTING_SYSTEM.md przy najciezszych presetach.

**Kryterium akceptacji:** auto-router proponuje deep-research-v2; liczby w katalogu = liczby plikow na dysku.
**Ryzyko:** zerowe (edycja markdown, nie kod HTML).

### 1B. Pipeline pisarski + preset /voice (flagowa nowosc)

**Dlaczego teraz:** to najsilniej poparta nowa zdolnosc (RR6: Bloomberry/Oiti jako wzorce, RR3: LinkedIn karze
"AI slop" -> wierny glos jest przewaga), i jest fundamentem dla suite kariery i content_social (iter 2).

Trzy nowe agenci (skills):
- **style-profiler** [sonnet] - analizuje probki tekstu Macieja, ekstrahuje profil glosu (dlugosc zdan,
  slownictwo, ton, formatowanie, hooki, oraz NEGATIVE constraints - czego Maciej NIGDY nie pisze). Zapisuje profil
  jako reuzywalny artefakt (wzorzec Bloomberry: przyjmuje DUZY korpus, nie 3-5 zdan). Dziala po polsku i angielsku.
- **voice-writer** [sonnet] - konsumuje profil glosu + brief zadania (mail / post / fragment CV), generuje tekst
  w glosie usera. Wzorzec Oiti: uczy sie tez z EDYCJI usera (poprawki wracaja do profilu).
- **voice-QA** [haiku] - waliduje output: czy brzmi jak Maciej, czy nie ma "AI slop", czy nie zlamano negative
  constraints. Osobny krok od pisania (RR2: samo-korekta jednego modelu jest zawodna).

Nowy preset:
- **/voice** - pipeline style-profiler (raz, buduje profil) -> voice-writer -> voice-QA -> HITL (Maciej akceptuje
  lub odsyla z poprawka, ktora douczą profil).

**Zaleznosc od Ciebie:** potrzebne 5-15 probek Twojego pisania (maile, posty, cokolwiek reprezentatywnego), zeby
zbudowac pierwszy profil. Bez tego agent powstanie, ale nie bedzie "Twoj".
**Gap do pilnowania (CRITIC_EXTERNAL Gap1):** wiekszosc researchu o style-matchingu byla anglojezyczna - profil
MUSI byc przetestowany na polskich probkach, nie zalozony.
**Gap prywatnosci (Gap6):** profil glosu = Twoje dane. Ustalic: gdzie trzymany (lokalnie), czy anonimizowany
przy ewentualnej publikacji projektu (na pewno NIE commitujemy Twojego profilu do repo).
**Kryterium akceptacji:** /voice generuje mail/post, ktory Maciej ocenia jako "brzmi jak ja" bez ciezkiej korekty.

### 1C. Kategoryzacja wizualna v1 (odpowiedz na pytanie #1)

**Zakres MINIMALNY (jeden wzorzec, zgodnie z "inkrementalnie"):**
- 6-8 kategorii use-case dla 44 presetow: Research / Build / Quality / Content / Strategy / Ops / Data / Design
  (finalna lista do potwierdzenia). Kazdy preset dostaje JEDNA kategorie glowna.
- Wizualnie: kolorowa kropka/pasek + chip kategorii przy nazwie presetu (reuzycie istniejacego systemu chipow
  z headera - zero nowego layoutu).
- Rzad klikalnych chip-filtrow w headerze (toggle, nie radio) - czysty JS filter, zero backendu, zgodne z
  zasada zero-dependency.
- Podwojne kodowanie kolor + tekst (nigdy sam kolor - dostepnosc, R7).

**Czego NIE robimy w 1C:** drugiego wymiaru filtrow (koszt/rozmiar), toggle widoku A-Z, dropdownow. To iteracja 3+
po Twojej ocenie v1.
**Wazne zastrzezenie (CRITIC_EXTERNAL K2/Gap4):** kategoria WIZUALNA to warstwa dla czlowieka. NIE poprawia
auto-routingu (routing dziala na polu description skilla). Trzymamy te dwie rzeczy osobno, zeby nie powstal dryf.
**Kryterium akceptacji:** Maciej widzi 44 presety pokolorowane wg kategorii, moze filtrowac chipami, ocenia czy
zostawiamy ten wzorzec.

### 1D. Kuchmistrz (stretch - jesli czas w iteracji 1, inaczej iter 2)

Agent + preset kulinarny wg Twojego zarysu:
- Uczy sie gustu, proponuje pod niego.
- Tryb "z lodowki" (skladniki podawane na biezaco) vs "cos latwo dostepnego" vs "wyprawa po rzadki skladnik".
- Kategorie: sniadanie/obiad/kolacja/deser.
- SMACZEK-filtr: **czas pracy aktywnej** (obieranie 5 min) osobno od **czasu calkowitego** (gotowanie 20 min) -
  to wyroznik, malo przepisowych narzedzi to rozdziela.
- Najpierw research przepisow, mozliwosc puszczenia na szukanie nowych.

**Status:** samodzielny, nie blokuje niczego. Dobry test progu n=0. Jesli iteracja 1 sie rozrasta - przesuwamy na 2.

---

## Kolejnosc i zaleznosci w iteracji 1

```
1A (higiena) --- niezalezne, robimy pierwsze (szybkie, zero ryzyka)
       |
1B (pipeline pisarski) --- wymaga Twoich probek pisania; fundament dla iter 2
       |
1C (kategoryzacja v1) --- niezalezne od 1A/1B, mozna rownolegle; wymaga Twojej akceptacji listy kategorii
       |
1D (kuchmistrz) --- opcjonalne, na koncu jesli czas
```

Rekomendacja: **1A -> (1B + 1C rownolegle) -> 1D jesli czas.**

---

## Czego potrzebuje od Ciebie PRZED startem budowy

1. **Zatwierdzenie zakresu iteracji 1** (albo korekta - co wyrzucic/dodac).
2. **Probki Twojego pisania** do 1B (5-15 tekstow: maile, posty, cokolwiek w Twoim naturalnym glosie). Moga byc
   PL i EN. To determinuje jakosc voice-writera.
3. **Potwierdzenie listy 6-8 kategorii** dla 1C (moja propozycja: Research/Build/Quality/Content/Strategy/Ops/
   Data/Design - mozesz zmienic nazwy/liczbe).
4. **Decyzja o kuchmistrzu** - iteracja 1 (stretch) czy od razu przesuwamy na iteracje 2.

---

## Odlozone do iteracji 2+ (nie zapomniane - sa w parking lot / backlog)

Suite kariery, decision-research, content_social, blackboard+guardrails, anti-groupthink, effort per agent,
hooki + Task Budgets, live browser view + replay, kolejne wzorce kategoryzacji, filmy PL/ENG, publikacja
researchu, plugin+marketplace, decyzja o nazwie. Wszystko w `project_v33_backlog_ideas` (memory).

---

## Otwarte pytania do rozstrzygniecia w trakcie (nie blokuja startu)

- Czy profil glosu ma byc jeden uniwersalny, czy per-kanal (mail vs LinkedIn vs CV)? RR3 sugeruje ze per-kanal
  daje lepsze wyniki - do przetestowania na iter 1, decyzja empiryczna.
- Finalna liczba i nazwy kategorii (6 czy 8) - dopiac przy 1C.
- Czy kuchmistrz to jeden agent, czy maly preset (research przepisow + rekomender + filtr) - zdecydowac przy 1D.
