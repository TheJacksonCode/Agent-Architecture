# SYNTHESIS_FINAL_v33 - Raport decyzyjny Fazy 2

Kampania: research-project-expansion-v33
Faza: 2 (finalna) - trendy zewnetrzne + web research
Data: 2026-08-21
Rola: Syntetyk Lean

> Ten raport laczy dwie fazy researchu w jedna liste konkretnych zadan do zatwierdzenia PRZED implementacja. Faza 1 (`plans/SYNTHESIS.md`) zbadala lokalny profil pracy Macieja i stan wewnetrzny projektu. Faza 2 (`research-external/R1..R7` + `CRITIC_EXTERNAL.md`) zbadala trendy rynkowe, dokumentacje oficjalna i wzorce UX.
>
> WAZNA ZMIANA STATUSU (Konflikt F1, CRITIC_EXTERNAL): user zatwierdzil prog dodania nowego bytu = **n=0 jesli jest pewnosc przydatnosci teraz LUB w przyszlosci**. To NADPISUJE ostrozniejszy prog n=2-3 z Fazy 1. Wszystkie rekomendacje "ODRZUC / backlog n=1" z Fazy 1 (SYNTHESIS NIE.2 content_social, NIE.6 interview_coach, backlog) sa teraz NIEAKTUALNE. Faza 1 nie byla bledna - odpowiadala na inne pytanie (dopasowanie do OBECNEGO uzycia). User zmienil pytanie na dopasowanie do ZAMIERZONEGO uzycia: research + tworzenie tresci, szeroka publicznosc non-dev, publikacja na GitHub. Ten raport jest pisany pod nowe pytanie.
>
> Zasada nadrzednosci przy konfliktach danych: `CRITIC_EXTERNAL.md`.

---

## 1. Executive Summary

Faza 2 potwierdza i rozszerza glowny wniosek Fazy 1, ale zmienia jego wydzwiek. Faza 1 mowila: "system jest dev-centryczny, a realne uzycie jest w wiekszosci research/osobiste - napraw routing, nie dodawaj bytow" (Faza1-SYNTHESIS sekcja 1). User odpowiedzial na otwarte pytanie kierunkowe Q1 z Fazy 1: projekt ma isc w strone research + tworzenie tresci dla szerokiej, nie tylko deweloperskiej publicznosci (CRITIC_EXTERNAL kontekst nadrzedny). To odblokowuje ekspansje, ktora Faza 1 celowo wstrzymywala.

Trzy rzeczy sa teraz jednoczesnie prawdziwe i musza trafic do v33 razem:

1. **Higiena najpierw.** Najpilniejsza, najtansza i najlepiej udowodniona poprawka to nadal naprawa dryfu katalogu: `deep-research-v2` i `bento-redesign` istnieja jako pliki, ale nie ma ich w `PRESET_CATALOG.md`, wiec auto-router ich nie widzi; `deep-five-minds` ma w katalogu bledna liczbe agentow (27 zamiast 25). To zero ryzyka i twardy dowod (Faza1-SYNTHESIS P0.1, CRITIC_EXTERNAL Rekomendacja pkt 4). Do tego dochodzi rewrite pol `description` wg oficjalnego wzorca Anthropic "co + kiedy + trigger words", bo to JEDYNY mechanizm realnego routingu (R6 sekcja b, wniosek koncowy).

2. **Pipeline pisarski to rdzen nowej wartosci.** Najsilniej poparty nowy modul (2+ niezalezne raporty + wprost chciany przez usera) to trzyetapowy pipeline: `style-profiler` -> `voice-writer` -> `voice-QA` (R2 sekcja 4.7, R5 Trend 1-2, CRITIC_EXTERNAL grupa A). Architektura pipeline nie jest opcjonalna - wynika z twardego limitu: few-shot bez walidacji driftuje ("model zaczyna brzmiec jak chatbot obslugi klienta" powyzej ~2000 slow w cudzym glosie, R5 Trend 1; case 255 artykulow a model nadal dokladal cechy spoza zrodla, R2 sekcja 4.3).

3. **Kategoryzacja wizualna 44 presetow jest gotowa jako lekki dodatek.** 6-8 kategorii use-case + kolorowy akcent + rzad chipow filtra w headerze, bez przebudowy designu, zero-dependency, wpasowane w istniejacy pasek chipow i dual-column verdict panel (R7 rekomendacja glowna, R3 wzorzec VoltAgent). Jedno wazne zastrzezenie: to poprawia nawigacje CZLOWIEKA, a NIE auto-routing (kategoria wizualna != kategoria routingowa, CRITIC_EXTERNAL K2/Gap4).

Poza tym: maly preset kariery (skonsolidowany, nie 5 osobnych agentow), maly preset decyzyjny/konsumencki reuzywajacy istniejacych researcherow, sekcja edukacyjna "kiedy NIE uzywac multi-agent" z estymatorem kosztu (R1 + R4 cytaty o spaleniu 120 USD w 6 minut + R6 3-10x tokenow).

Nadrzedna zasada opakowania (najsilniejszy konflikt korpusu, CRITIC_EXTERNAL K1): rynek pcha w dwie strony naraz - R2/R5 mowia CO dodac (nowe domeny), R1/R4/R6 mowia JAK to opakowac (male domyslne presety, twardy cap na agentow, ostrzezenie kosztowe przed odpaleniem). Oba sa spojne dla projektu EDUKACYJNEGO. Kazdy nowy agent contentowy ma byc domyslnie SOLO/maly (voice-writer to 1-2 agenty, nie swarm), a "content swarm" pokazywac tylko z widocznym ostrzezeniem kosztowym.

Nic w tym raporcie nie oznacza kasowania istniejacych plikow. Nieuzyte presety maja zerowy koszt tokenowy (lazy-load), wiec ekspansja katalogu nie obciaza budzetu tokenow uzycia (Faza1-SYNTHESIS NIE.1, R6 sekcja d).

---

## 2. Nowi agenci do dodania

Legenda:
- **Poparcie MOCNE** = 2+ niezalezne raporty Fazy 2, lub 1 raport Fazy 2 + dowod uzycia z Fazy 1.
- **Poparcie SLABE** = pojedynczy raport / pojedynczy researcher.
- Status: **GOTOWE** (do zatwierdzenia i implementacji) / **DO ZAWEZENIA** (dobry pomysl, ale najpierw dopracowac ksztalt) / **BACKLOG** (odlozyc, patrz sekcja 6).

### 2.1 Pipeline pisarski (rdzen v33) - style-profiler + voice-writer + voice-QA

To najwyzszy priorytet nowej funkcjonalnosci i jedyny modul, ktory user chce wprost (CRITIC_EXTERNAL kontekst c, grupa A). MUSI byc pipeline trzyetapowym, nie pojedynczym agentem - to nie preferencja, to wymog jakosciowy (CRITIC_EXTERNAL K4: 3-5 probek wystarcza do EKSTRAKCJI profilu, ale nie gwarantuje wiernosci GENERACJI, stad obowiazkowy krok walidacji).

**Agent 1: `style-profiler` (analiza stylu)**
- Rola: jednorazowo (lub przy aktualizacji probek) analizuje 3-5+ probek tekstu Macieja i produkuje reuzywalny, wersjonowalny artefakt profilu stylu (np. `style-profile.md`). Ekstrahuje wymiary: dlugosc i struktura zdan, slownictwo, ton, formatowanie wizualne, hooki otwierajace, CTA, ORAZ lista negatywna "czego ta osoba NIGDY nie uzywa" (R2 sekcja 4.5, 4.7; R5 Trend 1 - "nie tylko co osoba pisze, ale czego unika").
- Model routing: **sonnet** (glebsza analiza jezykowa, ekstrakcja wzorcow; spojne z routingiem researcherow analitycznych typu res_critic/res_extractor na Sonnet - R2-Faza1 rozklad modeli).
- Poparcie: **MOCNE** - R2 (Jasper Brand Voice + metoda Jeremy Morgan), R5 (Voice DNA Creator/Analyzer), R6 (examples pattern), + user(c). Rozne narzedzia doszly niezaleznie do tego samego wzorca "oddziel profil od generatora" (CRITIC_EXTERNAL grupa A).
- Status: **GOTOWE** (z zastrzezeniem Gap1, sekcja 7 - blocker jezyka polskiego przed implementacja).

**Agent 2: `voice-writer` (pisanie w stylu)**
- Rola: za kazdym razem gdy Maciej chce nowy tekst (mail, post FB/LinkedIn, fragment CV), czyta `style-profile.md` + brief zadania (temat, format, dlugosc) i pisze zgodnie z profilem, respektujac reguly negatywne ("unikaj X, nie poprawiaj Y").
- Model routing: **sonnet** domyslnie (glowna praca generacyjna wysokiej stawki wiernosci); flaga premium moze podniesc do opus dla najwazniejszych tekstow.
- Poparcie: **MOCNE** - R2, R5, + user(c) explicite. To byt, ktorego user chce najbardziej (CRITIC_EXTERNAL grupa A).
- Status: **GOTOWE** (z zastrzezeniem Gap1 i Gap6, sekcja 7).

**Agent 3: `voice-QA` (walidacja driftu stylu)**
- Rola: porownuje wygenerowany tekst z profilem/probkami, wykrywa drift (nadmierny entuzjazm, obce frazy, "ton chatbota"), zwraca PASS/REVISE z konkretnymi odchyleniami. To osobna rola, nie czesc redaktora (R5 Trend 2 - rynek explicite wyroznia "voice/style QA" jako osobnego agenta).
- Model routing: **sonnet** (uwaga: to swiadome odstepstwo od wzorca "QA na Haiku" z istniejacej architektury - wykrywanie subtelnego driftu stylistycznego wymaga glebszego rozumienia niz checklistowe QA bezpieczenstwa; R2-Faza1 rozklad modeli ma QA na Haiku, ale tu stawka jest inna). Alternatywa budzetowa: haiku pod flaga --budget.
- Poparcie: **MOCNE** - R5 (pkt 2, osobna rola), R2 (4.7 opcjonalny validator), wymuszone przez limit K4 (CRITIC_EXTERNAL).
- Status: **GOTOWE**.

Uwaga architektoniczna reuzywalnosci (R2 sekcja 5, uwaga koncowa): `style-profiler` + `voice-writer` warto zaprojektowac jako reuzywalne w calym systemie - kazdy inny agent contentowy (cover-letter, content_social) ma "wpinac sie" pod istniejacy profil stylu zamiast pisac generycznie. To obniza koszt calej grupy contentowej i jest zgodne z zasada progressive disclosure Anthropic: profil stylu jest plikiem referencyjnym ladowanym on-demand, bez staleego kosztu kontekstu (R6 sekcja d: "no context penalty for large files").

Dlaczego architektura pipeline, a nie jeden prompt (rozwiniecie K4). To najwazniejsza decyzja architektoniczna tej grupy i warto ja uzasadnic dokladnie, bo pokusa zrobienia "jednego agenta copywritera" jest duza. Dowody zbiegaja sie z trzech niezaleznych zrodel:
- R2 sekcja 4.3 (case Jeremy Morgan): user skonsolidowal 255 artykulow w jeden plik, a model MIMO TO dokladal cechy spoza zrodla (nadmierny entuzjazm, nieoczekiwane zmiany tonu). Wniosek autora wprost: "czysty few-shot bez explicit constraints nie wystarcza".
- R5 Trend 1 (limit dlugosci): powyzej ~2000 slow w cudzym glosie model "przestaje brzmiec jak ta osoba i zaczyna brzmiec jak chatbot obslugi klienta z dyplomem creative writing".
- R2 sekcja 4.2 vs 4.3 (napiecie ilosci probek): 3-5 probek wystarcza do EKSTRAKCJI profilu, ale liczba probek nie gwarantuje wiernosci GENERACJI.

Te trzy fakty razem (CRITIC_EXTERNAL K4) wymuszaja rozdzielenie ekstrakcji (style-profiler), generacji (voice-writer) i walidacji (voice-QA) na trzy role. voice-QA nie jest opcjonalnym dodatkiem - jest mechanizmem lapiacym dokladnie ten drift, ktory wszystkie trzy zrodla niezaleznie zaobserwowaly.

Technika awaryjna przy malej liczbie probek (R2 sekcja 4.6, inverse transfer data augmentation): jesli Maciej ma tylko 2-3 probki danego formatu (np. maile formalne), style-profiler moze wygenerowac dodatkowe syntetyczne pary "tekst neutralny -> tekst stylizowany", by lepiej uchwycic styl. To warto wpisac do promptu style-profiler jako opcjonalny krok, gdy probek jest za malo.

Uwaga nazewnicza (CRITIC_EXTERNAL K3 - realny konflikt do decyzji, nie pozorny): trzy zrodla dają trzy sprzeczne filozofie nazw tego samego bytu. R2 proponuje opisowe/funkcyjne (`style-profiler` + `voice-writer`). R5 proponuje nazwe trendowa dla rozpoznawalnosci ("Voice DNA Writer" - "juz zaadaptowana jako nazwa Skilli, zwieksza szanse trafienia w dyskurs wyszukiwan"). R6 proponuje oficjalna konwencje Anthropic gerund (`analyzing-writing-style`, `writing-in-voice`). Rozstrzygniecie: nazwa PLIKU/techniczna wg konwencji projektu (`res_*`, `qa_*` - projekt i tak nie stosuje gerund, wiec R6 to zalecenie, nie wymog), a etykieta ENCYKLOPEDYCZNA PL/EN moze uzywac rozpoznawalnego terminu "Voice DNA" jako terminu marketingowego dla SEO/rozpoznawalnosci. Nie mieszac obu w jednej nazwie technicznej.

### 2.2 Kariera - career-document-builder + interview_coach

Watek kariery jest rozproszony po 3-4 folderach na dysku Macieja (Kariera-B, Prywatny-G/cv, Kariera-C, Kariera-A - Faza1-SYNTHESIS wniosek 6), co daje realne uzycie n=3-4. R2 znalazl gotowy blueprint (ResumeSkills, ats-resume-agent). WAZNE (CRITIC_EXTERNAL Rekomendacja pkt 5): NIE dodawac 5 osobnych agentow kariery - to za duzo bytow reputacyjnie (patrz F2/sekcja 7). Skonsolidowac w jeden preset (sekcja 3), a jako nowe AGENTY dodac tylko dwa fundamenty:

**Agent 4: `career-document-builder` (zrodlo prawdy o doswiadczeniu)**
- Rola: buduje jeden ustrukturyzowany "career document" - zrodlo prawdy o doswiadczeniu Macieja, z ktorego czerpia wszystkie dokumenty aplikacyjne. Kluczowy guardrail: "zero fabrication - kazdy claim zrodlowany z career document" (R2 sekcja 2, ats-resume-agent). Rozwiazuje tez problem rozproszenia watku kariery po folderach - daje jedno zrodlo.
- Model routing: **sonnet** (strukturyzacja + reasoning nad doswiadczeniem).
- Poparcie: **MOCNE** (R2 + dowod uzycia Faza1 n=3-4).
- Status: **GOTOWE**. To fundament pod cala grupe kariery.

**Agent 5: `interview_coach` (przygotowanie do rozmowy)**
- Rola: generuje STAR stories i pytania cwiczeniowe z career document; mapuje doswiadczenie na wymagania konkretnej oferty (dokladnie przypadek Kariera-A: mapowanie AML na KYC - Faza1-SYNTHESIS profil).
- Model routing: **sonnet**.
- Poparcie: **MOCNE po zmianie progu** - R2 + Faza1 Kariera-A (n=1) + user(a/b). WAZNE: Faza 1 dala temu backlog (NIE.6, n=1 za slabe). Prog usera n=0 to ODBLOKOWUJE (CRITIC_EXTERNAL F1, grupa B). To jest jeden z bytow, ktore Krytyk kazal przywrocic po zmianie progu - odnotowane jawnie.
- Status: **GOTOWE** (jako czesc presetu kariery, sekcja 3).

Pozostale role kariery (resume-tailor/cv-writer, cover-letter-writer wg frameworku CAR, salary-negotiation-prep) NIE stają sie osobnymi agentami - to FAZY wewnatrz presetu kariery lub kompozycja z voice-writer (CRITIC_EXTERNAL Rekomendacja pkt 5). cover-letter-writer w szczegolnosci sklada sie z voice-writer, zeby list brzmial jak Maciej (R2 sekcja 5 pkt 5).

Dlaczego akurat tak (uzasadnienie konsolidacji). R2 sekcja 2 znalazl gotowy blueprint: repo ResumeSkills ma 20 wyspecjalizowanych skilli (resume-ats-optimizer, resume-bullet-writer, job-description-analyzer, cover-letter-generator, interview-prep-generator, salary-negotiation-prep, itd.). Pokusa jest, by przeniesc wszystkie 1:1. Ale (CRITIC_EXTERNAL F2/Rekomendacja pkt 5): 5-8 nowych "agentow"-promptow w jednym watku to za duzo reputacyjnie (kazdy dokladany "agent" zwieksza powierzchnie krytyki "to sa prompty, nie agenci" - R4 NitpickLawyer) i za drogo w pipeline bilingual (Gap2, ~8 artefaktow per agent). Konsolidacja w jeden preset z 2 fundamentami (career-document-builder jako zrodlo prawdy, interview_coach jako pierwszy krok) plus fazy-w-promptach daje te sama wartosc przy ulamku narzutu. Framework CAR (Challenge-Action-Result) z R2 sekcji 2 wpisuje sie jako explicit reasoning step w faze cover-letter, a nie osobny agent.

Frazy triggerujace do description (R6): "CV, resume, cover letter, list motywacyjny, rozmowa o prace, przygotowanie do interview, STAR, dopasowanie do oferty".

### 2.3 Content social - przywrocony po zmianie progu

**Agent 6: `content_social` (planowanie tresci social)**
- Rola: pipeline research -> plan -> draft -> repurpose -> HITL (human review gate przed publikacja), spina sie z voice-writer do generacji w stylu Macieja (R2 sekcja 3, workflow LinkedIn; R5 "command and execute").
- Model routing: **sonnet** (draft + planowanie); research faza reuzywa istniejacych researcherow.
- Poparcie: **SREDNIE, przywrocone** - R2 + R5 + user(c). WAZNE: Faza 1 ODRZUCILA ten byt (NIE.2), bo folder `Kariera-D` byl pusty (n=0). Prog usera n=0 + intencja c go PRZYWRACA (CRITIC_EXTERNAL F1, grupa D). To drugi byt, ktory Krytyk kazal przywrocic - odnotowane jawnie.
- Status: **DO ZAWEZENIA** - dopiac do pipeline voice (reuzyc profil stylu), nie budowac jako samodzielne silos (CRITIC_EXTERNAL Rekomendacja pkt 7).
- Wymog edukacyjnego disclaimera (R5 Trend 3, pkt 4): rownolegle do trendu "content swarm" rosnie niepokoj o "syntetyczny consensus" - jeden operator moze wdrozyc tysiace pozornie autentycznych "glosow" AI. Kazdy preset typu social/swarm w projekcie EDUKACYJNYM powinien miec wyrazny opis roli czlowieka (approval gate) i disclaimer, zgodnie z misja projektu (uczyc "jak to dziala i ile kosztuje", nie "jak zbudowac farme botow"). To pozycjonuje projekt jako "AI jako junior ghostwriter pod nadzorem czlowieka", nie "AI zamiast czlowieka" (R5 Trend 2 - human-in-the-loop framing jako najlepiej pozycjonowany produkt).

### 2.4 Consumer/decision research - jako preset, nie nowe agenty

Wzorzec konsumencki ma dowod n=3 na dysku (Prywatny-H - ranking odmian; Prywatny-C - plecaki dla kota z wymaganiem Reddit-first 60%; Prywatny-D - ocena gry Riders Republic; Faza1-SYNTHESIS profil). R2 sekcja 1 nazywa to "bialym obszarem rynkowym" - brak gotowego publicznego wzorca subagenta konsumenckiego, istniejace wzorce to prompty w ChatGPT shopping research, nie multi-agent pipeline. R2 proponuje 3 nowe agenty (criteria-elicitor -> comparator -> recommender). Rozstrzygniecie konfliktu formy F3 (CRITIC_EXTERNAL): NIE budowac 3 nowych agentow. Zbudowac maly PRESET reuzywajacy istniejacych researcherow (res_reddit + res_forums jako rdzen, res_tech/github/docs wylaczone), a 3-fazowy wzorzec R2 wpisac jako sekcje jednego promptu synthesizera. Szczegoly w sekcji 3. Zaden nowy agent nie jest tu potrzebny - to godzi R2 (osobny, nazwany byt konsumencki) z zasada "nie mnoz bytow bez potrzeby" (CRITIC_EXTERNAL F3, Rekomendacja pkt 6). Dodatkowy walor: wzorzec "przemapowania" rol technicznych na konsumenckie, ktory Maciej juz stosuje recznie (res_github -> consumer reports, res_docs -> standardy IATA w Prywatny-C, Faza1-SYNTHESIS profil), staje sie tu jawnym, powtarzalnym presetem zamiast improwizacji per projekt.

### 2.5 Podsumowanie nowych agentow

| Agent | Rola (skrot) | Model | Poparcie | Status |
|---|---|---|---|---|
| `style-profiler` | Ekstrakcja profilu stylu z probek | sonnet | MOCNE | GOTOWE (blocker Gap1) |
| `voice-writer` | Pisanie w stylu z profilu | sonnet (opus premium) | MOCNE | GOTOWE (blocker Gap1/Gap6) |
| `voice-QA` | Walidacja driftu stylu | sonnet (haiku budget) | MOCNE | GOTOWE |
| `career-document-builder` | Zrodlo prawdy o doswiadczeniu, anty-halucynacja | sonnet | MOCNE | GOTOWE |
| `interview_coach` | STAR stories + pytania z career doc | sonnet | MOCNE (po F1 n=0) | GOTOWE |
| `content_social` | Plan tresci social + HITL, spiety z voice | sonnet | SREDNIE (przywrocone) | DO ZAWEZENIA |

Razem: 6 nowych agentow (4 rdzen contentowo-pisarski, 2 kariera). content_social do zawezenia. Digital Twin celowo pominiety (sekcja 6).

---

## 3. Nowe presety do dodania

Presety to orkiestracje istniejacych + nowych agentow. Zasada K1 (CRITIC_EXTERNAL): domyslnie male, tanie, z widocznym kosztem.

### 3.1 `/voice` (lub `/ghostwriter`) - pipeline pisarski - GOTOWE

- Sklad: `style-profiler` -> `voice-writer` -> `voice-QA`. 3 agenty, maly preset.
- Poparcie: MOCNE (R2 4.7, R5 Trend 1-2, user c, CRITIC_EXTERNAL grupa A).
- Uwaga: pierwsze uruchomienie buduje profil (style-profiler), kolejne moga isc od razu do voice-writer + voice-QA na gotowym profilu. Domyslnie SOLO-skala, nie swarm (K1).

Szkic drop-in wpisu do PRESET_CATALOG.md (format "Uzyj gdy / NIE uzywaj gdy" z R4, do zatwierdzenia/edycji):

```
### /voice (3 ag) - pisanie w Twoim stylu (Voice DNA pipeline)
Uzyj gdy: mail, post FB/LinkedIn, fragment tekstu ma brzmiec jak Ty;
  masz probki wlasnego pisania; potrzeba wiernosci stylu, nie generycznego copy.
Sklad: style-profiler (analiza probek) -> voice-writer (draft w stylu) -> voice-QA (kontrola driftu).
Flagi: --premium (voice-writer na Opus dla najwazniejszych tekstow), --budget (voice-QA na Haiku).
NIE uzywaj gdy: tekst techniczny/dokumentacja -> /tech-writing-pipe lub /content;
  nie masz zadnych probek wlasnego stylu (profil bedzie zgadywanka).
```

### 3.2 `/kariera` (lub `/career-prep`) - skonsolidowany preset kariery - GOTOWE

- Sklad: `career-document-builder` (fundament, zrodlo prawdy) -> faza tailoringu CV -> faza cover-letter (kompozycja z `voice-writer`) -> `interview_coach`. Jeden preset zamiast 5 rozproszonych agentow (CRITIC_EXTERNAL Rekomendacja pkt 5).
- Poparcie: MOCNE (R2 blueprint ResumeSkills + Faza1 usage n=3-4). interview_coach moze byc pierwszym wdrozonym krokiem (n=1 + item a/b).
- Uwaga: rozwiazuje tez rozproszenie watku kariery po 4 folderach (Faza1-SYNTHESIS wniosek 6) - daje jedno zrodlo prawdy. Guardrail "zero fabrication" (R2 sekcja 2) chroni przed halucynacja osiagniec w CV.

Szkic drop-in wpisu do PRESET_CATALOG.md:

```
### /kariera (4 ag) - przygotowanie aplikacji i rozmowy o prace
Uzyj gdy: CV/cover letter/przygotowanie do rozmowy; mapowanie doswiadczenia
  na wymagania konkretnej oferty (jak KYC/AML w przypadku Kariera-A).
Sklad: career-document-builder (zrodlo prawdy, anty-halucynacja) -> tailor CV ->
  cover-letter (przez voice-writer) -> interview_coach (STAR stories + pytania).
NIE uzywaj gdy: sam research o firmie/rynku -> /research lub /decision-research;
  chcesz tylko przepisac gotowy tekst w swoim stylu -> /voice.
```

### 3.3 `/decision-research` (lub `/consumer-research`) - maly preset decyzyjny - GOTOWE JAKO REUZYCIE

- Sklad: REUZYWA istniejacych `res_reddit` + `res_forums` jako rdzen, `res_tech`/`res_github`/`res_docs` WYLACZONE, + istniejacy `synthesizer` do uzasadnionego rankingu per kryterium. Zero lub minimum nowych agentow.
- Poparcie: MOCNE (R2 white space + Faza1 n=3, CRITIC_EXTERNAL grupa C, F3).
- Relacja do Fazy 1: Faza 1 proponowala tylko flage `/research --no-tech` (P1.1). Przy progu usera n=0 mozna posc dalej i nadac temu wlasny, nazwany preset - ale nadal jako REUZYCIE istniejacych researcherow, nie 3 nowe agenty (CRITIC_EXTERNAL F3). Rekomendacja: zaczac od tego malego presetu; jesli okaze sie zbyteczny, sama flaga `--no-tech` tez wystarczy.

Wzorzec merytoryczny przenoszony z R2 sekcji 1 (bez tworzenia nowych agentow - jako fazy jednego promptu synthesizera): criteria-elicitor (dopytaj o kryteria/budzet/ograniczenia) -> comparator (zbierz i porownaj opcje) -> recommender (uzasadniona rekomendacja per kryterium, min. 3 opcje z ratingiem). To wzorzec "constraint satisfaction + justified ranking" z ChatGPT shopping research (R2 sekcja 1).

Szkic drop-in wpisu do PRESET_CATALOG.md:

```
### /decision-research (reuzycie res_reddit + res_forums + synthesizer) - research decyzyjny/konsumencki
Uzyj gdy: decyzja zakupowa/zyciowa na bazie doswiadczen spolecznosci
  (min. 60% Reddit/fora), temat nietechniczny: sprzet, gra, produkt, usluga.
NIE uzywaj gdy: research techniczny wymagajacy dokumentacji/repo -> /research lub /deep-research-v2.
Uwaga: to /research z wylaczonymi res_tech/res_github/res_docs - lekki, tani wariant.
```

### 3.4 Podsumowanie nowych presetow

| Preset | Sklad | Nowe agenty? | Poparcie | Status |
|---|---|---|---|---|
| `/voice` | style-profiler -> voice-writer -> voice-QA | 3 nowe | MOCNE | GOTOWE (Gap1) |
| `/kariera` | career-doc-builder -> tailor -> cover(+voice) -> interview_coach | 2 nowe + reuzycie | MOCNE | GOTOWE |
| `/decision-research` | res_reddit + res_forums + synthesizer (bez res_tech/github/docs) | 0 nowych | MOCNE | GOTOWE (reuzycie) |

Wszystkie trzy to male presety zgodne z zasada K1. Po dodaniu: 44 -> 47 presetow (nie licząc naprawy 2 brakujacych wpisow, ktore juz sa plikami).

---

## 4. System kategoryzacji wizualnej 44 presetow

To odpowiedz na pytanie usera (item d): wizualna kategoryzacja BEZ przebudowy designu. Najlepiej udokumentowany feature w calym korpusie (R3 + R7, CRITIC_EXTERNAL grupa E - MOCNE).

### 4.1 Kluczowe zastrzezenie na wstepie (CRITIC_EXTERNAL K2/Gap4)

Kategoria wizualna poprawia nawigacje CZLOWIEKA po liscie 44 presetow. NIE poprawia auto-routingu. Auto-router (LLM czytajacy `PRESET_CATALOG.md`) wybiera preset wylacznie przez pole `description` w jezyku naturalnym - folder, kolor i kategoria nie wplywaja na jego wybor (R6 sekcja b: "identity comes only from name/description"; CRITIC_EXTERNAL K2). To sa DWA osobne systemy:
- warstwa maszynowa (routing) -> poprawiana przez rewrite `description` (sekcja 5),
- warstwa ludzka (przegladanie wzrokiem) -> poprawiana przez kategorie/kolor/chip (ta sekcja).

Nie obiecywac userowi, ze kolorowe kategorie pomoga routerowi. Zaplanowac synchronizacje HTML <-> PRESET_CATALOG (Gap4, sekcja 7), zeby nie odtworzyc dokladnie tego dryfu, ktory P0 wlasnie naprawia.

### 4.2 Konkretny projekt (R7 rekomendacja glowna, R3 wzorzec VoltAgent)

**Ile kategorii: 6-8.** To optymalna liczba dla 44 elementow. Wiecej kategorii tworzy ten sam problem co brak kategorii (R7 sekcja 7: "jesli facet ma wiecej niz ~7-8 wartosci, staje sie sam w sobie problemem"; zasada 7 +/- 2).

**Jakie kategorie (use-case-first, nie techniczne).** Wzorem Zapier (kategoria = problem/cel usera) i VS Code (jedna wartosc kontrolowana per element), NIE wzorem "ile agentow / jaki model" (R7 sekcja 3, sekcja 2). Propozycja na bazie istniejacych 44 presetow (R7 rekomendacja pkt 1):

- **Research** (badania, analiza, deep research) - np. research, deep-research-v2, deep-research-swarm-pro, recon, reflect, kb-constructor
- **Build** (feature dev, fullstack, API, SaaS) - np. trio, standard, feature-sprint, saas, fullstack-premium, microservices, api-modern, data-pipe
- **Quality** (QA, testing, security, code review) - np. test-suite, bug-hunt, security, security-multi-vector, review, soc2-sweep
- **Content** (pisanie, dokumentacja, marketing, NOWE presety pisarskie) - np. content, tech-writing-pipe, `/voice`, `/kariera`, prd-to-launch(copy)
- **Strategy** (planowanie, debata, decyzje) - np. five-minds, five-minds-strategic, deep-five-minds, plan-exec, `/decision-research`
- **Ops** (incydenty, migracje, refaktor, performance) - np. incident-war-room, migration-crew, legacy, perf-boost, perf-squad, cascade
- **Data** (analiza danych, pipeline, eksperymenty) - np. data-analysis-pipe, ab-test-lab
- **Design** (UI/UX, design systems, layout) - np. ui-overhaul, design-sys, a11y, bento-redesign

To 8 kategorii. Mozna scalic Data w Build lub Ops jesli user woli 6-7. Kazdy preset dostaje DOKLADNIE JEDNA kategorie glowna (R7 sekcja 1-2, GitHub Marketplace: "jedna plaska kategoria per element" wystarcza nawet przy 20 000 elementow).

**Jak oznaczone (kolor + tekst, nigdy sam kolor).** Podwojne kodowanie zgodnie z NN/g (R7 sekcja 7 "Kolor + ikona jako podwojne kodowanie"): kolor sam w sobie nie moze byc jedynym nosnikiem (dostepnosc, daltonizm). Konkretnie (R7 rekomendacja pkt 2):
- maly kolorowy pasek/kropka (4-6px) przy nazwie presetu na liscie wyboru,
- ta sama kolorystyka jako maly badge/chip w sidebarze szczegolow, OBOK istniejacych chipow modelu/liczby agentow - wpasowuje sie w juz istniejacy system chipow, nie tworzy nowego jezyka wizualnego,
- paleta 6-8 kolorow dostepnosciowo bezpieczna (rozne jasnosci/nasycenia + zawsze etykieta tekstowa obok).
- opcjonalnie emoji-marker per kategoria wzorem VoltAgent (R3 wzorzec 1: emoji-badge konsekwentny jako skanowalny wzrokiem marker).

**Jak wpasowac w istniejacy design (bez przebudowy).** Wzorem Raycast (dropdown/chipy zawsze widoczne w navbarze, jeden klik) i n8n (natychmiastowy client-side filter) (R7 sekcja 5, sekcja 4):
- dodac rzad klikalnych "pill" chipow z nazwami kategorii NAD lista 44 presetow, w istniejacym pasku chipow w headerze (memory projektu: header ma juz SKLAD micro bar + chipy od v32.12),
- klikniecie kategorii filtruje liste (JS array filter, zero backendu - single-file HTML, trywialne),
- domyslnie "Wszystkie" aktywne; toggle (drugi klik odznacza), nie radio - pozwala na proste OR bez pelnego faceted search,
- dual-column verdict panel (zielone/czerwone) ZOSTAJE bez zmian jako warstwa 2 (progressive disclosure): kategoria + kolor to szybkie skanowanie (poziom 1), verdict panel to warstwa decyzyjna po kliknieciu (poziom 2) (R7 rekomendacja pkt 5).

**Czego NIE robic w iteracji 1 (R7 rekomendacja pkt 4, CRITIC_EXTERNAL grupa E).** NIE dodawac drugiej osi filtrow "zlozonosc/koszt" od razu. R3 chce jej od razu, R7 odradza w iteracji 1 - rozstrzygniecie na rzecz R7 (przy 44 elementach jedna dobra os wystarczy; druga os dopiero jako opcjonalny sort, jesli user nadal zglasza problem). To tanszy krok posredni zanim ewentualnie zbuduje sie prawdziwy faceted search.

### 4.3 Dlaczego to jest lekkie (R7 sekcja "Dlaczego to jest lekkie")

- Zero zmian w layoucie/gridzie kart - tylko maly kolorowy akcent + jeden nowy rzad chipow.
- Zero nowego jezyka wizualnego - reuzycie istniejacego systemu chipow i verdict panelu.
- Implementacja: (a) pole `kategoria` + `kolorKategorii` do 44 obiektow presetow w danych JS, (b) maly CSS badge/pasek, (c) prosty JS filter. Zero backendu, zero bibliotek, zgodne z "zero dependencies".
- Skaluje sie: preset #45-50 wystarczy dopisac z kategoria, filtry/kolory dzialaja automatycznie.

Szkic techniczny (kierunek, do dopracowania w HTML v32.16, respektujac parytet bilingual):

```
// 1. dane: kazdy obiekt presetu dostaje jedno pole kontrolowane
{ id: "deep-research-v2", kategoria: "Research", ... }
// kolor wyprowadzony z kategorii (jedno zrodlo prawdy - patrz Gap4)
const KOLOR_KAT = { Research:"#4f8", Build:"#48f", Quality:"#f84",
  Content:"#a6f", Strategy:"#fc4", Ops:"#f66", Data:"#4cc", Design:"#e6a" };

// 2. filtr: rzad chipow nad lista, toggle (nie radio)
function filtrujKategoria(kat){ /* JS array filter na liscie presetow */ }
```

Paleta 6-8 kolorow: dobrac tak, by rozne kategorie roznily sie nie tylko odcieniem, ale tez jasnoscia/nasyceniem (dostepnosc, daltonizm), i zawsze z etykieta tekstowa obok koloru - zasada "kolor nigdy sam" (R7 sekcja 7). Warto skalibrowac wg APCA, ktore projekt juz stosuje (memory v32.8 Material Expressive APCA-compliant).

Uwaga wdrozeniowa: to osobny strumien roboczy (UI) rownolegly do strumienia agentow (skills/commands), z wlasnym ryzykiem parytetu bilingual PL/EN i generate_skills.js (CRITIC_EXTERNAL F4, Gap4).

---

## 5. Poprawki higieniczne (P0 z obu faz)

To najtansza, najlepiej udowodniona czesc calej kampanii. Zero ryzyka, twardy dowod. Robic PIERWSZE, niezaleznie od reszty (Faza1-SYNTHESIS P0.1, CRITIC_EXTERNAL Rekomendacja pkt 4).

### 5.1 Naprawa dryfu PRESET_CATALOG.md

Fizycznie 44 pliki komend, ale katalog dokumentuje 42. Poza katalogiem (Faza1-SYNTHESIS Konflikt 2/P0.1):
- **Dodac `deep-research-v2`** (17 agentow) do PRESET_CATALOG.md. To NAJPILNIEJSZE - najczesciej realnie uzywany preset (~8 kampanii), a auto-router go nie widzi (Faza1-SYNTHESIS wniosek: "najpilniejsza, najtansza i najlepiej udowodniona poprawka w calej kampanii"). Keywords: research, kampania, duzy korpus 30k+ slow, map-reduce, Extract phase. Flagi --premium/--budget/--ultra-budget.
- **Dodac `bento-redesign`** (8 agentow) do PRESET_CATALOG.md.
- **Poprawic liczbe agentow `deep-five-minds`: 27 -> 25** (naglowek pliku komendy mowi 25, katalog blednie 27; Faza1-SYNTHESIS Konflikt 3).
- **Rozwazyc pelny audit dryfu**: 44 komendy vs wpisy + 37 skilli vs referencje w komendach. Krytyk Fazy 1 znalazl 3 rozbieznosci przy pobieznej weryfikacji, moga byc kolejne (Faza1-SYNTHESIS Gap 5).

Szkice drop-in wpisow (do zatwierdzenia/edycji, format "Uzyj gdy / NIE uzywaj gdy") sa gotowe w Faza1-SYNTHESIS sekcja 6, P0.1 - przepisac stamtad.

### 5.2 Rewrite pol `description` wg Anthropic best practice (R6)

To jedyny mechanizm realnego routingu i jednoczesnie warstwa maszynowa, ktora faktycznie poprawia dopasowanie (R6 sekcja b, wniosek koncowy; CRITIC_EXTERNAL grupa F - MOCNE). Obecny format ma `description: "dlugi mission statement"`. Anthropic zaleca zwiezle "co robi + kiedy uzyc + slowa-wyzwalacze" (R6 sekcja b):

> Wzorzec: "Extract text and tables from PDF files... Use when working with PDF files or when the user mentions PDFs, forms, or document extraction."

Zadanie: przeredagowac pole `description` w plikach skills (37) i wpisach presetow na model "co + kiedy + trigger words" (max 1-2 zdania z konkretnymi slowami kluczowymi), zamiast dlugich misji. Dlugi opis misji NIE pelni funkcji dyskryminacyjnej rownie dobrze - przy dziesiatkach agentow model wybiera po trigger words, nie po misji (R6 sekcja b). To wspiera tez P2 z Fazy 1 (doprecyzowanie keywordow) i jest bezposrednio zgodne z niewdrozona rekomendacja korpusu (Faza1-SYNTHESIS appendix, R6-korpus pkt 7: audit opisow pod trigger richness 200-500 znakow).

Przyklad kierunku zmiany (schemat, do zastosowania na kazdym z 37 skilli):

```
ZLE (dlugi mission statement, slaby trigger):
  description: "Ekspert od bezpieczenstwa aplikacji webowych, ktorego misja jest
  zapewnienie najwyzszych standardow ochrony przez doglebna analize..."

DOBRZE (co + kiedy + trigger words, wg wzorca Anthropic z R6 sekcja b):
  description: "Skanuje kod pod katem podatnosci (OWASP, injection, auth, sekrety).
  Uzyj gdy user mowi o bezpieczenstwie, audycie, pentescie, CVE, hardeningu
  lub przed release na produkcje."
```

Anthropic podaje wzorzec wprost (R6 sekcja b): "Include both what the Skill does and specific triggers/contexts for when to use it" oraz dla subagentow "Include action triggers: use phrases like 'use proactively'". Nowe agenty pisarskie (sekcja 2) MUSZA od razu miec description w tym formacie - to ich jedyna szansa na poprawne trafienie w routing (np. voice-writer: trigger words "napisz w moim stylu, mail, post, w moim glosie, brzmiec jak ja").

Uwaga o nazewnictwie gerund (R6 sekcja b, luka 2): Anthropic zaleca gerund (`analyzing-writing-style`), ale projekt spojnie stosuje wlasna konwencje (`res_*`, `qa_*`). To zalecenie, nie wymog - NIE przemianowywac istniejacych 37 agentow (koszt bilingual + generate_skills.js niewspolmierny do korzysci). Rewrite dotyczy TRESCI pola description, nie nazw plikow.

### 5.3 Dodatkowe mikro-poprawki keywordowe (P2 z Fazy 1, opcjonalne)

- Doprecyzowanie keywordow dla par nakladajacych sie agentow (res_docs vs res_tech, observability_engineer vs telemetry_surfer) - Faza1-SYNTHESIS P2.2.
- Dopisanie luk keywordowych (deployment/CI-CD, mobile, ML/AI features, observability) do "Uzyj gdy" istniejacych presetow - Faza1-SYNTHESIS P2.1. Niski priorytet, bo to domeny, ktorych Maciej i tak nie uzywa.

---

## 6. Backlog - co odlozyc i dlaczego

Wszystko ponizej to pojedynczy pomysl jednego researchera (SLABE poparcie) lub byt niepasujacy do modelu single-HTML. Cytat: CRITIC_EXTERNAL sekcja "Odlozyc / pominac w v33".

### 6.1 Digital Twin / Expert Clone - BACKLOG

- Zrodlo: tylko R5 (Trend 4, Delphi - digital.ai, 5M+ USD przychodu, 150+ ekspertow, prognoza "tipping point 2026"). SLABE (pojedynczy raport).
- Dlaczego odlozyc: to JEDYNY proponowany byt, ktory faktycznie wymaga petli + pamieci persystentnej (konwersacyjny klon prowadzacy rozmowy/spotkania, nie jednorazowy generator tekstu). To inny poziom abstrakcji niz voice-writer - pelnoprawny konwersacyjny agent-persona. Duzy lift architektoniczny niepasujacy do modelu single-HTML edukacyjnego (R5 Trend 4, CRITIC_EXTERNAL grupa A + Rekomendacja pkt 8).
- Paradoks terminologiczny (CRITIC_EXTERNAL F2): dodanie Digital Twin OBNIZYLOBY ryzyko krytyki "to nie agent, to prompt" (R4 NitpickLawyer), bo bylby to jedyny byt z prawdziwa petla/pamiecia - a wiec prawdziwy agent w sensie technicznym. Ale koszt (pamiec persystentna, stan miedzy sesjami) jest niewspolmierny do modelu projektu. Rozstrzygniecie: pominac jako byt wykonawczy w v33; mozna dodac jako KONCEPT encyklopedyczny (czym jest digital twin, czym rozni sie od ghostwritera, dlaczego wymaga innej architektury) - to wzbogaca warstwe edukacyjna bez liftu.

### 6.2 Guardrails, blackboard, confident-liar, accountability - jako TRESC encyklopedii, nie nowe agenty

To wzbogacenia tresci edukacyjnej, NIE nowe byty wykonawcze. Nie zwiekszac liczby agentow z tego tytulu (CRITIC_EXTERNAL Rekomendacja pkt 9). Wszystkie z R1 (solo, SLABE):
- **Guardrails jako osobny prymityw** (R1 sekcja 5, OpenAI Agents SDK): dodac krotka sekcje "guardrails vs critic agent - roznica" do dokumentacji. Koncept, nie agent.
- **Blackboard pattern** (R1 sekcja 6): nisza, brak oficjalnego wsparcia platformowego. Ewentualnie notka o wzorcu eksperymentalnym przy kb-constructor. Pominac jako preset w v33.
- **Confident liar + anonimizacja w debacie** (R1 sekcja 7): notka do encyklopedii Five Minds. Swieze badania (arXiv:2606.10296 "The Confident Liar") pokazuja, ze agenci w debacie moga byc pewni siebie mimo bledu, co oszukuje zarowno innych agentow, jak i LLM-as-judge - sama debata nie gwarantuje wykrycia bledu, warto laczyc z twardym zrodlem prawdy (testy, dane, cytaty). Osobno (arXiv:2510.07517): jesli roznym "umyslom" Five Minds przypisane sa rozne modele (Opus vs Sonnet), ujawnienie tego moze skrzywiac debate na korzysc "silniejszego" modelu niezaleznie od jakosci argumentu - anonimizacja tozsamosci poprawia konsensus. To wartosciowa tresc edukacyjna dla istniejacego presetu Five Minds, bez zmiany jego dzialania.
- **Accountability boundary per preset** (R1 sekcja 8): wzbogacenie opisu presetow wieloagentowych o "kto odpowiada za finalna decyzje po delegacji". Swiezy framework Google DeepMind (luty 2026, "Intelligent AI Delegation") przesuwa delegacje z transferu danych na transfer autorytetu, odpowiedzialnosci i zaufania - bez sformalizowania tego systemy sa podatne na ciche awarie i rozmycie odpowiedzialnosci. Pasuje do istniejacych bramek HITL jako jawnie nazwana "granica rozliczalnosci".

Uwaga wspolna dla 6.2: zadna z tych pozycji NIE zwieksza liczby agentow. To wzbogacenia tresci encyklopedii, ktore podnosza wartosc edukacyjna projektu (jego glowna misje) i mitiguja ryzyko reputacyjne "to tylko prompty" przez pokazanie, ze projekt rozumie zaawansowane niuanse architektury multi-agent (R1 sekcje 6-8, CRITIC_EXTERNAL Rekomendacja pkt 9).

### 6.3 Sekcja edukacyjna "kiedy NIE uzywac multi-agent" + estymator kosztu - SREDNI PRIORYTET (nie backlog, ale nie P0)

Warto zrobic, ale to tresc/UI, nie nowy agent. MOCNE poparcie (R1 + R4 + R6, CRITIC_EXTERNAL grupa F). To jest tez zawartosc edukacyjna spojna z K1: cytat R1 "kiedy NIE uzywac" nie jest kontrargumentem wobec ekspansji - jest MATERIALEM DYDAKTYCZNYM, bo projekt ma uczyc "kiedy WARTO" multi-agent (CRITIC_EXTERNAL K1).

- Sekcja "kiedy NIE multi-agent" z cytatami do wpisania do encyklopedii:
  - R1: multi-agent zuzywa ~15x wiecej tokenow niz zwykly czat; "wiekszosc pracy kodowej nie ma naturalnie rownoleglych, niezaleznych podzadan"; wczesne wersje agenta Anthropic spawnowaly 50 subagentow do prostych zapytan (anti-pattern).
  - R4: najostrzejsze cytaty praktykow - "spawn 415 agents", "blew my 120 USD quota in 6 minutes", userzy dopisuja do CLAUDE.md twarde zakazy spawnowania subagentow. Dodatkowo: subagenty nie wymieniaja miedzy soba informacji, nie moga spawnowac wlasnych subagentow (recursion depth 1), bywaja ignorowane przez glownego agenta.
  - R6: "3-10x more tokens" dla multi-agent; "A well-designed single agent can accomplish far more than many developers expect"; zasada podzialu "dziel wg granic kontekstu, nie wg rol".
- Pasuje do misji edukacyjnej i istniejacego Verdict Panel (zielone/czerwone) - to juz jest framing "kiedy dobre / kiedy zle", wystarczy dolozyc warstwe kosztowa.
- Estymator kosztu PRZED odpaleniem duzego presetu (Deep Five Minds, swarm) - R4 wniosek 1: nawet flagi --budget moga nie wystarczyc bez widocznego estymatora z gory. To najbardziej palacy, konkretny bol praktykow w calym R4 (potwierdzony cytatami o realnym spaleniu budzetu).

Mozliwy "sprzedawalny" scenariusz edukacyjny (R5 pkt 5): "agent swarm for research" jako demo-case - overnight batch research -> raport -> multi-format output (blog, LinkedIn carousel, Twitter thread, video script) z jednego uruchomienia. Silny user story do dokumentacji, pod warunkiem widocznego ostrzezenia kosztowego (K1).

### 6.4 Sekcja "skill vs agent" - mitygacja ryzyka reputacyjnego - SREDNI PRIORYTET

- Zrodlo: R4 (NitpickLawyer: "This is a collection of prompts. To call them agents is only adding to confusion") + R6. SREDNIE.
- Dlaczego wazne: publiczne repo (~70 gwiazdek) rosnie o ~5-6 nowych "agentow"-promptow non-dev. Kazdy zwieksza powierzchnie tej krytyki (CRITIC_EXTERNAL F2). Mitygacja: jasna sekcja w dokumentacji "skill (statyczny prompt) vs agent (petla + narzedzia + pamiec)", ostroznosc z terminem "agent" przy bytach czysto pisarskich.

### 6.5 Druga os filtrow (koszt/zlozonosc) - ITERACJA 2

Dopiero jesli jedna os kategoryzacji nie wystarczy (R7 > R3, sekcja 4.2). Jako opcjonalny sort, nie pelny facet.

---

## 7. Ryzyka i otwarte pytania

Te punkty MUSZA byc rozstrzygniete lub zaakceptowane przed implementacja. Zrodlo: CRITIC_EXTERNAL sekcja "Gaps" + "Ostrzezenia procesowe".

### 7.1 Gap1 (BLOCKER) - brak researchu stylu pisania PO POLSKU

Maciej pisze maile/FB/LinkedIn czesciowo lub w calosci po polsku. CALE zaplecze voice-cloningu w korpusie Fazy 2 (R2 sekcje 4.1-4.7, R5 Trend 1) to narzedzia i papery anglojezyczne - Jasper, HyperWrite, Oiti, Jeremy Morgan, arXiv 2402.08855/2508.06374. Zero walidacji, czy wymiary stylu ("sentence rhythm", "vocabulary", "5 filarow") i metoda few-shot dzialaja tak samo dla polskiej morfologii, fleksji i rejestru, ktore sa duzo bogatsze niz angielskie (CRITIC_EXTERNAL Gap1). Polski ma odmiane przez przypadki, rodzaje gramatyczne, swobodniejszy szyk - "sentence rhythm" i "punctuation patterns" moga sie zachowywac inaczej. To krytyczna luka dla najwazniejszego bytu (voice-writer). **Delta-research wymagany PRZED implementacja pipeline pisarskiego** - to blocker jakosci, nie nice-to-have.
- Rekomendacja: mala kampania delta (1-2 researcherow) na temat "personalizacja stylu / authorship style transfer dla jezyka polskiego lub jezykow fleksyjnych" przed kodowaniem style-profiler/voice-writer.
- Zasada reuse (global CLAUDE.md): przed zamowieniem delta-researchu sprawdzic, czy korpus istniejacych kampanii lub R2 sekcja 4.6 (inverse transfer augmentation) nie pokrywa czesci tematu - jesli >=70% pokrycia, zamowic tylko delte.
- Fallback jesli delta-research niedostepny: zbudowac pipeline z jawnym oznaczeniem "zoptymalizowany pod EN, jakosc PL do walidacji" i uzyc samego Macieja jako testera (evaluation-driven development, R6 sekcja a - "Claude B tests in real tasks").

### 7.2 Gap3 - brak dowodu popytu non-dev POZA Maciejem

Dowody "popytu non-dev" sa albo z dysku Macieja (Faza1, n=3 consumer), albo z rynku (R4/R5 second-hand - R4 sam flaguje brak dostepu do Reddit, R5 brak dostepu do X). Nikt nie zmierzyl, czy szersza publicznosc ~70-gwiazdkowego repo faktycznie chce agentow non-dev, czy tylko Maciej (CRITIC_EXTERNAL Gap3). Ryzyko: budowa pod hipotetycznego usera. Mitygacja pragmatyczna: byty pisarskie/kariery sa uzyteczne dla samego Macieja niezaleznie od szerszego popytu (n>=1 dla niego samego), wiec ryzyko dotyczy glownie framingu marketingowego "dla szerokiej publicznosci", nie samej uzytecznosci. Otwarte pytanie do usera: czy budujemy przede wszystkim dla Ciebie (bezpieczne), czy pod hipoteze szerokiej adopcji (wymaga walidacji popytu)?

### 7.3 Gap4 - ryzyko dryfu kategoria-HTML vs kategoria-routing

R7 dodaje pole `kategoria` do 44 obiektow presetow w HTML. PRESET_CATALOG.md ma wlasny podzial na grupy (R3/R6/Faza1). Auto-router nie widzi kategorii HTML - dziala tylko na description w katalogu (K2). Nikt nie zaadresowal, jak utrzymac spojnosc miedzy kategoria-w-HTML a grupami-w-katalogu-routingu (CRITIC_EXTERNAL Gap4). To DOKLADNIE ten typ dryfu, ktory FAZA A wlasnie naprawia (deep-research-v2 istnieje w plikach, brak w katalogu). Dodanie trzeciej warstwy metadanych (kategoria wizualna) bez procesu synchronizacji odtwarza dokladnie ten sam problem, ktory wlasnie usuwamy - to bylby regres.
- **Mitygacja: przed dodaniem kategorii ustalic jedno zrodlo prawdy.** Opcje: (a) kategorie definiowane raz w danych JS presetow w HTML, generate_commands.js propaguje etykiete grupy do PRESET_CATALOG.md przy regeneracji; (b) jesli automatyzacja za droga - jawny checklist synchronizacji "zmiana kategorii => aktualizuj oba miejsca" wpisany do CLAUDE.md projektu.
- Uwaga: kategorie z sekcji 4.2 (Research/Build/Quality/Content/Strategy/Ops/Data/Design) warto celowo zblizyc do grup tematycznych, ktore juz opisuje PRESET_CATALOG (R3 sekcja "Grupy tematyczne" Fazy 1 wymienia podobne: Research-heavy, Build/Feature, Security/Audit, itd.) - im blizej sa oba podzialy, tym mniejsze ryzyko dryfu.

### 7.4 Gap6 - polityka prywatnosci probek tekstu dla voice-writera

Agent stylu potrzebuje realnych probek pisania Macieja (maile, DM, posty). Zaden raport nie okresla: ile probek, w jakim jezyku, gdzie przechowywane, jak wersjonowane, czy trafiaja do PUBLICZNEGO repo - ryzyko wycieku prywatnych maili na GitHub (CRITIC_EXTERNAL Gap6). R2 wspomina 3-5 probek, ale nie jako polityke danych. **Mitygacja: przed implementacja ustalic, ze `style-profile.md` i probki NIE trafiaja do publicznego repo** (.gitignore, osobny prywatny katalog), a publiczna wersja projektu zawiera tylko pusty szablon profilu + instrukcje. To krytyczne przy publikacji na GitHub (intencja usera).

### 7.5 Pozostale gapy (nizsze ryzyko)

- **Gap2 (koszt bilingual)**: kazdy nowy agent to nie 1 plik (CRITIC_EXTERNAL Gap2). Pelny narzut per jeden nowy agent w tym projekcie:

| Artefakt | Gdzie | Uwaga |
|---|---|---|
| skill `.md` | `~/.claude/skills/` | prompt agenta |
| description (nowy format) | w skill + w komendzie | trigger words (sekcja 5.2) |
| wpis w komendzie presetu | `~/.claude/commands/` | jesli agent wchodzi do presetu |
| wpis PRESET_CATALOG (jesli preset) | `~/.claude/PRESET_CATALOG.md` | routing |
| wpis encyklopedyczny PL | AGENT_EDU_PL w HTML | 10-sekcyjne bento (memory v32.15) |
| wpis encyklopedyczny EN | I18N_EN eduAgent (memory v32.16) | parytet bilingual |
| prompty video + infografika | koniec pliku agenta | wymog MEMORY (feedback) |
| regeneracja | generate_skills.js | z zachowaniem parytetu |

To oznacza ~8 artefaktow per agent, nie 1 plik. Przy 6 nowych agentach to znaczacy, realny narzut. Konsolidacja grup w tym raporcie juz go obniza: kariera jako 1 preset z 2 nowymi agentami (nie 5), decision-research jako czyste reuzycie (0 nowych agentow), content_social dopiety do voice (wspoldzieli profil). Rekomendacja: policzyc realny narzut i zatwierdzic liste agentow ZANIM ruszy generate_skills.js, bo koszt encyklopedyczny (PL+EN+media prompts) moze wielokrotnie przekroczyc koszt samego promptu agenta.
- **Gap5 (roznicowanie wobec konkurencji)**: R3 znalazl buildwithclaude.com (davepoon) robiacy podobnie - wizualna galeria z filtrami i one-click install. Rynek jest tez duzo wiekszy liczbowo: wshobson/agents ma ~39k gwiazdek i 202 agenty, VoltAgent ~24k i 158 subagentow (R3 tabela). Projekt Macieja (37 agentow, 44 presety, ~70 gwiazdek) nie wygrywa skala. Nikt nie sprawdzil, czym KONKRETNIE wygrywa poza formatem single-HTML (CRITIC_EXTERNAL Gap5). Hipotezy do walidacji przed promocja (item b): (a) pelny parytet bilingual PL/EN - rzadkie w tym ekosystemie; (b) encyklopedia edukacyjna 10-sekcyjna per agent (memory v32.15) zamiast samej listy; (c) Verdict Panel "kiedy dobre/kiedy zle" jako framing decyzyjny, nie katalogowy; (d) auto-router jako wbudowana odpowiedz na decision paralysis (R4). Rekomendacja: przed promocja "dla szerokiej publicznosci" nazwac wprost 1-2 przewagi i wyeksponowac je na stronie glownej. To wazne dla framingu, nie dla samej implementacji agentow.

### 7.6 Ostrzezenia procesowe (do wpisania w plan implementacji)

- **F1 nadpisuje Faze 1**: rekomendacje SYNTHESIS NIE.2 (content_social), NIE.6 (interview_coach), backlog n>=2-3 sa NIEAKTUALNE po decyzji usera n=0. Odnotowane jawnie w tym raporcie (sekcje 2.2, 2.3).
- **K2/Gap4**: kategoria wizualna != kategoria routingowa. Nie obiecywac, ze kolorki poprawia auto-router (sekcja 4.1).
- **K1**: kazdy nowy agent contentowy domyslnie SOLO/maly. "Content swarm" tylko z widocznym ostrzezeniem kosztowym.
- **F2**: dodac sekcje "skill vs agent" jako mitygacje reputacyjna przed rozrostem publicznej kolekcji.

---

## 8. Proponowana kolejnosc wdrozenia

Zasada priorytetyzacji (Faza1-SYNTHESIS + CRITIC_EXTERNAL): najpierw higiena (twardy dowod, zero ryzyka), potem najsilniej poparta nowa wartosc, potem reszta bytow, na koncu backlog. Kazda faza to osobny, zatwierdzalny blok.

### FAZA A (pierwsze) - Higiena P0, zero ryzyka

1. Dodac `deep-research-v2` i `bento-redesign` do PRESET_CATALOG.md (sekcja 5.1).
2. Poprawic `deep-five-minds`: 27 -> 25 agentow (sekcja 5.1).
3. Rozwazyc pelny audit dryfu 44 komend vs wpisy + 37 skilli vs referencje (Gap5).
4. Rewrite pol `description` wg wzorca "co + kiedy + trigger words" (sekcja 5.2).

Uzasadnienie kolejnosci: to jedyna czesc z twardym dowodem i zerowym ryzykiem. Wazniejsza niz jakikolwiek nowy byt (CRITIC_EXTERNAL Rekomendacja pkt 4). Robic niezaleznie od reszty.

### FAZA B (drugie) - Pipeline pisarski + kategoryzacja wizualna (dwa rownolegle strumienie)

Strumien B1 (agenty/skills/commands):
5. NAJPIERW: delta-research stylu pisania po polsku (Gap1 - blocker, sekcja 7.1).
6. Ustalic polityke prywatnosci probek (Gap6 - blocker publikacji, sekcja 7.4).
7. Zbudowac `style-profiler` -> `voice-writer` -> `voice-QA` + preset `/voice` (sekcja 2.1, 3.1).

Strumien B2 (UI/HTML, rownolegly):
8. Ustalic jedno zrodlo prawdy kategorii (Gap4, sekcja 7.3).
9. Wdrozyc 6-8 kategorii + kolorowy akcent + rzad chipow filtra w headerze (sekcja 4).

Uzasadnienie: pipeline pisarski to rdzen nowej wartosci (najsilniejsze poparcie + wprost chciany). Kategoryzacja to osobny, niezalezny strumien UI (CRITIC_EXTERNAL F4) - moze isc rownolegle, bo nie dotyka agentow. Oba maja swoje blockery do zdjecia PRZED kodowaniem.

### FAZA C (trzecie) - Presety kariery i decyzyjne

10. Zbudowac `career-document-builder` + `interview_coach` + preset `/kariera` (sekcja 2.2, 3.2).
11. Zbudowac preset `/decision-research` jako reuzycie res_reddit/res_forums (sekcja 2.4, 3.3).
12. Zawezic i dopiac `content_social` pod pipeline voice (sekcja 2.3).

Uzasadnienie: te byty maja dobre poparcie (usage n=3-4 dla kariery, n=3 dla decision), ale sa wtorne wobec rdzenia pisarskiego i tansze, gdy voice-writer juz istnieje (cover-letter i content_social sie z nim skladaja).

### FAZA D (czwarte) - Edukacja i backlog

13. Sekcja edukacyjna "kiedy NIE multi-agent" + estymator kosztu (sekcja 6.3).
14. Sekcja "skill vs agent" (mitygacja reputacyjna, sekcja 6.4).
15. Notki encyklopedyczne: guardrails, confident-liar/anonimizacja, accountability boundary (sekcja 6.2).
16. BACKLOG (nie w v33): Digital Twin, blackboard preset, druga os filtrow.

Uzasadnienie: tresc edukacyjna wzmacnia misje projektu i mitiguje ryzyka, ale nie blokuje niczego. Digital Twin i blackboard wymagaja liftu niepasujacego do single-HTML.

### Master lista zadan do zatwierdzenia (skrot operacyjny)

Jedna tabela wszystkich decyzji, gotowa do odhaczenia przez usera. Zadna pozycja nie oznacza kasowania istniejacego pliku.

| # | Zadanie | Typ | Poparcie | Faza | Zrodlo |
|---|---|---|---|---|---|
| 1 | Dodac deep-research-v2 do PRESET_CATALOG.md | higiena | twardy | A | Faza1 P0.1, CRITIC K6 |
| 2 | Dodac bento-redesign do PRESET_CATALOG.md | higiena | twardy | A | Faza1 P0.1, CRITIC K2 |
| 3 | Poprawic deep-five-minds 27 -> 25 agentow | higiena | twardy | A | Faza1 K3 |
| 4 | Pelny audit dryfu 44 komend vs wpisy vs 37 skilli | higiena | twardy | A | Faza1 Gap5 |
| 5 | Rewrite description (co+kiedy+trigger) na 37 skillach | higiena | MOCNE | A | R6 sekcja b |
| 6 | Delta-research stylu pisania PO POLSKU (blocker) | research | MOCNE | B1 | CRITIC Gap1 |
| 7 | Polityka prywatnosci probek (blocker publikacji) | proces | MOCNE | B1 | CRITIC Gap6 |
| 8 | Agent style-profiler | nowy agent | MOCNE | B1 | R2 4.7, R5 T1 |
| 9 | Agent voice-writer | nowy agent | MOCNE | B1 | R2, R5, user c |
| 10 | Agent voice-QA | nowy agent | MOCNE | B1 | R5 T2, K4 |
| 11 | Preset /voice | nowy preset | MOCNE | B1 | R2 4.7 |
| 12 | Zrodlo prawdy kategorii (blocker) | proces | MOCNE | B2 | CRITIC Gap4 |
| 13 | Kategoryzacja 6-8 kat + kolor + chipy filtra | UI | MOCNE | B2 | R7, R3 |
| 14 | Agent career-document-builder | nowy agent | MOCNE | C | R2, Faza1 n=3-4 |
| 15 | Agent interview_coach (przywrocony n=0) | nowy agent | MOCNE | C | R2, F1, Kariera-A |
| 16 | Preset /kariera (skonsolidowany) | nowy preset | MOCNE | C | R2, CRITIC rek5 |
| 17 | Preset /decision-research (reuzycie) | nowy preset | MOCNE | C | R2, Faza1 n=3, F3 |
| 18 | Agent content_social (przywrocony n=0, zawezic) | nowy agent | SREDNIE | C | R2, R5, F1 |
| 19 | Sekcja edu "kiedy NIE multi-agent" + estymator | tresc | MOCNE | D | R1, R4, R6 |
| 20 | Sekcja "skill vs agent" (mitygacja reputacji) | tresc | SREDNIE | D | R4, F2 |
| 21 | Notki encyklopedyczne (guardrails, confident-liar, accountability) | tresc | SLABE | D | R1 |
| 22 | Digital Twin / blackboard / 2. os filtrow | BACKLOG | SLABE | - | R5/R1/R3 |

Zadania 1-5 (Faza A) mozna zrobic natychmiast bez zadnych decyzji kierunkowych. Zadania 6-21 wymagaja potwierdzenia zakresu przez usera. Zadanie 22 celowo pominiete w v33.

### Podsumowanie kolejnosci

| Faza | Co | Blocker do zdjecia | Priorytet |
|---|---|---|---|
| A | Higiena katalogu + rewrite description | brak (zero ryzyka) | NAJWYZSZY |
| B1 | Pipeline pisarski /voice | Gap1 (PL research), Gap6 (prywatnosc) | WYSOKI |
| B2 | Kategoryzacja wizualna 44 presetow | Gap4 (zrodlo prawdy kategorii) | WYSOKI |
| C | Presety kariery + decyzyjny + content_social | Gap2 (koszt bilingual) | SREDNI |
| D | Edukacja + notki encyklopedyczne | brak | NISKI |
| Backlog | Digital Twin, blackboard, 2. os filtrow | - | ODLOZONE |

---

## Appendix A: Co research POTWIERDZIL (nie zmieniac)

Rownie wazne jak lista zmian jest to, czego zewnetrzny research NIE kazal ruszac. Faza 2 mocno waliduje istniejaca architekture - to reasekuracja, ze v33 jest ekspansja addytywna, nie korekta bledow. Dla usera oznacza to: nowe byty dokladamy do zdrowego rdzenia, nie naprawiamy zepsutego systemu.

**Architektura orchestrator-worker jest zgodna ze stanem sztuki, miejscami go wyprzedza (R1 wnioski).** R1 zestawia projekt z oficjalnymi zrodlami Anthropic/Google/OpenAI i najnowszymi pracami akademickimi (grudzien 2025 - luty 2026):
- Orchestrator + wyspecjalizowani subagenci to dokladnie rekomendacja branzowa "start with supervisor" (R1 sekcja 3), a swiezy paper Google Research (arXiv:2512.08296) daje twardy argument ilosciowy: centralizowana koordynacja ogranicza amplifikacje bledow do 4.4x wobec 17.2x dla niezaleznych agentow, i daje +80.9% na zadaniach rownoleglizowalnych (R1 sekcja 4). To najsilniejszy, swiezy dowod naukowy za obecnym wyborem architektonicznym.
- Model routing Opus/Sonnet/Haiku to "model tiering", standard produkcyjny 2026 (R1 sekcja 3), potwierdzony wprost przez dane Anthropic: Opus-lead + Sonnet-subagents pobil single-agent o ponad 90% (R6 sekcja d).
- Fan-out research, Five Minds (debate + Devil's Advocate), HITL gates - wszystkie odpowiadaja kanonicznym wzorcom (R1 sekcje 3-4, 7; ADK 8 wzorcow). Five Minds w szczegolnosci realizuje rekomendacje, by NIE polegac na self-critique pojedynczego modelu (R1 sekcja 7: "Large Language Models Cannot Self-Correct Reasoning Yet").
- Skills jako lekkie definicje ladowane on-demand to dokladnie prymityw, ktory Anthropic formalnie oglosil ("Equipping agents for the real world with Agent Skills", R1 sekcja 2). Projekt uzywa go poprawnie i wczesnie.

**Zasada "przy watpliwosciach mniejszy preset" jest zgodna z oficjalnym stanowiskiem (R6 sekcja d).** Anthropic: "A well-designed single agent can accomplish far more than many developers expect" oraz "3-10x more tokens" dla multi-agent. To waliduje istniejaca filozofie projektu i wzmacnia zasade K1 dla nowych bytow.

**Auto-dobor presetu (PRESET_CATALOG.md) odpowiada realnej potrzebie rynkowej (R4 sekcja "decision paralysis").** Spolecznosc oddolnie buduje "agent-organizer"/"multi-agent-coordinator" do rozwiazania dokladnie tego problemu, ktory projekt juz rozwiazal (R4 wniosek 5). Warto to promowac jako przewage, nie tylko utrzymywac.

**Single-HTML interaktywny konfigurator to rzadka przewaga (R3 sekcja "przewaga").** Z 10 analizowanych repo tylko jedno (davepoon/buildwithclaude.com) wyszlo poza README do interaktywnej galerii. Kierunek wizualny jest slusznym, rzadko realizowanym wyborem (R3 wniosek 6) - z zastrzezeniem Gap5 (nie zmierzono, czym KONKRETNIE projekt wygrywa poza formatem).

Wniosek: v33 nie wymaga zadnej korekty architektonicznej. Cala reszta tego raportu to dokladanie (nowe domeny) i porzadkowanie (higiena, kategoryzacja), a nie naprawa.

---

## Appendix B: mapa zrodel i sila poparcia

| Zrodlo | Werdykt Krytyka (Faza 2) | Kluczowy wklad |
|---|---|---|
| R1 Trendy architektury | PASS (wysoka) | Architektura projektu zgodna ze stanem sztuki; "kiedy NIE multi-agent"; guardrails/blackboard/accountability jako koncepty |
| R2 Agenci content/research | PASS (wysoka) | Blueprint pipeline pisarskiego (profiler+writer+QA), blueprint kariery (ResumeSkills), decision-research white space |
| R3 GitHub kolekcje | PASS z zastrzezeniem (liczby gwiazdek orientacyjne) | Wzorzec kategoryzacji VoltAgent (numerowane + emoji + kolor); single-HTML jako przewaga |
| R4 Reddit/fora | PASS z zastrzezeniem (brak dostepu do Reddit) | Cytaty o spalaniu budzetu (415 agentow, 120 USD/6min); biala plama non-dev; ryzyko "to prompty nie agenci" |
| R5 Trendy spoleczne (X) | PASS z zastrzezeniem (liczby niezweryfikowane) | Voice DNA jako prymityw; multi-agent jako fix na AI slop; Digital Twin (Delphi); voice-QA jako osobna rola |
| R6 Dokumentacja oficjalna | PASS (najwyzsza) | description jako jedyny mechanizm routingu; rewrite what+when+trigger; kategoria wizualna != routingowa |
| R7 UX kategoryzacja | PASS (wysoka) | Konkretny lekki projekt 6-8 kategorii + kolor + chip, zero-dependency, wpasowany w design |
| CRITIC_EXTERNAL | (nadrzedny) | Rozstrzygniecia konfliktow K1-K5, F1-F4; F1 nadpisuje prog Fazy 1; 6 gapow |
| Faza1-SYNTHESIS | (kontynuacja) | Profil usera (>80% non-software); dryf katalogu P0; interview_coach/content_social backlog (teraz nieaktualne) |

Uwaga o dwoch osiach rynku (CRITIC_EXTERNAL K1): R2/R5 (CO dodac) i R1/R4/R6 (JAK opakowac) nie sa sprzeczne - to dwa wymiary tej samej decyzji. Ten raport laczy je: dodaje nowe domeny (pisanie, kariera, decyzje) w malych, tanich, domyslnie SOLO opakowaniach z widocznym kosztem, zgodnie z misja edukacyjna projektu.

Koniec raportu. Gotowy do przedstawienia userowi jako lista zadan do zatwierdzenia przed implementacja.
