# PODCAST EP02: Observatory - Jak Zbudowac 12-Agentowy System w 8 Fazach

**Seria:** Architektury Agentowe
**Odcinek:** 02
**Czas trwania:** ~7 minut
**Hosty:** Alex (ekspert, glos Kore) + Mira (ciekawska, glos Aoede)
**Temat:** Deep dive w architekture Observatory - capstone project

---

## [INTRO - 30s]

[ALEX] Hej, witajcie w drugim odcinku naszego podcastu o architekturach agentowych. Jesli slyszeliscie jedynke, to wiecie juz, czym sa agenty AI i dlaczego jeden agent to za malo do powaznych zadan. Dzisiaj idziemy glebiej. Wezmiemy na warsztat konkretny projekt - Observatory. Interaktywna prezentacja edukacyjna, ktora... sama zostala zbudowana przez system wieloagentowy. Taki meta-przyklad. Mira, gotowa?

[MIRA] Absolutnie. Bo szczerze? Jak uslyszalam "dziewiec agentow zbudowalo strone internetowa", to pomyslalam - po co az tyle? Wiec rozwiklejmy to.

---

## [SEGMENT 1 - 90s] Co to jest Observatory?

[MIRA] Okej Alex, zaczynajmy od poczatku. Co dokladnie powstalo w tym projekcie Observatory?

[ALEX] Observatory to interaktywna strona HTML - jedna wielka strona - ktora uczy ludzi architektury systemow agentowych. Ma quizy, ma drag-and-drop designer, ma animacje. I cala ta strona zostala wyprodukowana nie przez jednego programiste, ale przez dziewiec wyspecjalizowanych agentow AI.

[MIRA] Dziewiec. A w pierwszym odcinku mowilismy, ze projekt CV uzywal pietnastu. Wiec Observatory to taka lzejsza wersja?

[ALEX] Dokladnie tak. I to jest klucz. Observatory uzywa czegos, co nazywamy piecioma poziomami hierarchii. [PAUZA 1s] Na samej gorze masz Orkiestratora - Claude Opus - ktory widzi calosc i podejmuje strategiczne decyzje. Ponizej, poziom pierwszy - analitycy i planerzy, ktorzy rozkladaja problem na czesci. Poziom drugi to researcherzy, trzech specjalistow szukajacych informacji. Poziom trzeci - workerzy: koder, designer, redaktor, integrator. I na samym dole, poziom czwarty - Quality Assurance. Audyt bezpieczenstwa, audyt jakosci i manager, ktory laczy ich raporty.

[MIRA] Czyli im nizej w hierarchii, tym wezszy kontekst?

[ALEX] Tak! I to jest fundamentalna zasada. Orkiestrator widzi wszystko - caly projekt, wszystkie plany. Ale koder na poziomie trzecim? On dostaje tylko to, co potrzebuje do napisania swojego kawalka kodu. Waski, precyzyjny kontekst. To zmniejsza ryzyko halucynacji i - co wazne - zmniejsza koszty tokenowe, bo nie ladujemy niepotrzebnych danych.

---

## [SEGMENT 2 - 90s] HIVE-MIND i Shadow

[MIRA] Dobra, to teraz moje ulubione. Powiedziales cos o HIVE-MIND. Co to jest? Brzmi jak z filmu science fiction.

[ALEX] Bo troche tak jest. [PAUZA 1s] HIVE-MIND to sesja brainstormingowa, ale nie taka zwykla. Wyobraz sobie pokoj, w ktorym siedza trzej wirtualni eksperci. Mira - specjalistka od edukacji. Kenzo - designer. Zara - ekspertka od gamifikacji. Kazdy patrzy na problem ze swojej perspektywy.

[MIRA] Chwila, Mira? Mam tam swoja imienniczke?

[ALEX] Ha, przypadek? A moze nie. Ale poczekaj, bo najlepsze dopiero nadchodzi. Jest jeszcze czwarty uczestnik - Shadow. Devil's advocate. Jego jedynym zadaniem jest podwazanie pomyslow reszty.

[MIRA] Czyli ktos, kto mowi "nie, to jest zly pomysl, bo..."?

[ALEX] Wlasnie! Shadow szuka dziur, slabych punktow, nierealistycznych zalozen. Bez niego HIVE-MIND moglby wygenerowac dziesiec super entuzjastycznych, ale kompletnie niepraktycznych pomyslow. [PAUZA 1s] I wlasnie tak to dzialalo - HIVE-MIND wygenerowal dziesiec blueprintow, dziesiec roznych wizji projektu, a nastepnie Jackson - uzytkownik - wybral najlepsze elementy z kazdego.

[MIRA] To jest jak debata. Kazdy broni swojej pozycji, a Shadow probuje ja zburzyc.

[ALEX] Dokladnie. To jest protokol debaty wbudowany w system. I co wazne - to sie dzieje w fazie koncepcyjnej, rownoolegle z Research Agentem, ktory przetwarza dwadziescia cztery dokumenty badawcze. Sto dwadziescia tysiecy slow o prompt engineering, architekturze agentowej, MCP, A2A. Badania i burza mozgow ida w tym samym czasie.

[MIRA] Rownolegle. Oszczednosc czasu.

[ALEX] I tokenow. Bo kazdy z nich operuje na wlasnym, izolowanym kontekscie.

---

## [SEGMENT 3 - 90s] Ile to kosztuje?

[MIRA] No dobrze Alex, to teraz pytanie, ktore wszyscy chca zadac. [PAUZA 1s] Ile to kosztuje? Bo dziewiec agentow AI, Claude Opus na gorze, to pewnie fortuny?

[ALEX] I tu jest niespodzianka. [PAUZA 1s] Caly projekt Observatory kossztowal szesc dolarow i dziewiecdziesiat jeden centow.

[MIRA] Slucham?!

[ALEX] Szesc dolarow. Dziewiecdziesiat jeden centow. Przy aktualnych cenach Claude API z marca dwadziescia szesc. Polammy to na czesci. Orkiestrator na Opusie - najdrozszy model - to dziewiecdziesiat szesc centow. Faza badawcza, brainstorm plus research - dolar osiem. Faza budowy, koder plus designer - cztery dolary dwadziescia osiem. To jest najwieksza pozycja, bo Agent Koder generuje masywny output - caly HTML, CSS, JavaScript. I na koncu QA - piecdziesiat szesc centow.

[MIRA] Czekaj, faza QA za piecdziesiat szesc centow? To tyle kosztuje przeswietlenie calego kodu pod katem bezpieczenstwa i jakosci?

[ALEX] Tak. Bo agenty QA dostaja Haiku - najtanszy model. Pracuja na checklistach, na ustrukturyzowanych formularzach. Nie potrzebuja kreatywnosci Opusa. I to jest kluczowa lekcja optymalizacji - nie kazdemu agentowi potrzebny jest najdrozszy model.

[MIRA] A jak to sie ma do innych projektow?

[ALEX] Porownajmy. Projekt CV z pietnastu agentami - dziewiec dolarow osiemnascie. Textinio v3 z trzynastoma agentami - szesnascie dolarow jedenaascie. Observatory jest najtansze, a jednoczesnie ma najlepszy stosunek inputu do outputu - jeden przecinek czterdziesci cztery do jednego. Czyli na kazdego dolara wlozonego w input, dostajesz najwiecej uzytecznego outputu.

[MIRA] Hmm, ale chyba mozna to jeszcze zoptymalizowac?

[ALEX] Mozna. Z prompt cachingiem, batch API i drobnymi downgrade'ami modeli, Observatory mozna sciagnac do czterech dolarow szesnastu. Czterdziesci procent oszczednosci.

---

## [SEGMENT 4 - 60s] Co poszlo nie tak?

[MIRA] Okej, ale zaden system nie jest idealny, prawda? Co moze pojsc nie tak w takiej architekturze?

[ALEX] Najwazniejsza slabostka - single point of failure. [PAUZA 1s] Orkiestrator. Jesli Opus sie pomyli na gorze - zle rozlozy zadanie, zle przydzieli kontekst - caly system pada. Bo wszystko od niego zalezy. Hub-and-Spoke ma te wade wbudowana w swoj DNA.

[MIRA] Wiec caly system jest tak dobry, jak jego orkiestrator?

[ALEX] Dokladnie. I druga sprawa - brak petli iteracyjnej. W Textinio v3 masz mechanizm: agent buduje, krytyk ocenia, agent poprawia, krytyk znowu ocenia. W Observatory tego nie ma. Agenty QA raportuja problemy, ale nie ma zautomatyzowanego procesu poprawek. Manager zbiera raporty i... to tyle. Poprawki robi czlowiek.

[MIRA] Wiec mniej automatyzacji?

[ALEX] Tak. I to jest swiadomy kompromis. Mniej automatyzacji oznacza mniej tokenow, ale wiecej ludzkiej pracy. Dla malego projektu to ma sens. Dla duzego - juz niekoniecznie.

---

## [SEGMENT 5 - 60s] Porownanie architektur

[ALEX] Wiec podsumujmy, jak Observatory wypada na tle innych architektur. [PAUZA 1s] Projekt CV - pietnascie agentow, piec faz, protocol Five Minds, gdzie czterech ekspertow debatuje. Mocno rozbudowany. Textinio v3 - trzynascie agentow, cztery fazy, Wolny Elektron jako syntezator, cross-review miedzy koderami. Najciezszy system.

[MIRA] A Observatory?

[ALEX] Dziewiec agentow. Cztery fazy. I najciekawsze - kompozycja trzech wzorcow architektonicznych. Hub-and-Spoke, gdzie orkiestrator rozdziela prace. Handoff Chain, gdzie wyniki kazdej fazy plyna sekwencyjnie do nastepnej. I Mesh, gdzie agenty QA dzialaja rownolegle i niezaleznie. [PAUZA 1s] Profesjonalne systemy agentowe prawie nigdy nie stosuja jednego czystego wzorca. Observatory to piieknie pokazuje.

[MIRA] Czyli to takie "najlepsze z kazdego swiata"?

[ALEX] Tak bym to ujal. I dlatego jest to capstone project - bo pokazuje, ze nie ma jednej slusznej architektury. Jest dobor narzedzi do problemu.

---

## [OUTRO - 30s]

[ALEX] Trzy rzeczy na wynos z dzisiejszego odcinka. [PAUZA 1s] Po pierwsze - hierarchia agentow: pieec poziomow, od strategii po audyt, z coraz wszym kontekstem w dol. Po drugie - HIVE-MIND z Shadow: debata i devil's advocate wbudowane w system, zeby wylapac slabe pomysly zanim traffia do implementacji. Po trzecie - szeesc dolarow dziewiecdziesiat jeden centow za dziewiec agentow. Profesjonalny system AI moze byc zaskakujaco tani, jesli dobrze dobierzesz modele do zadan.

[MIRA] A w nastepnym odcinku?

[ALEX] Epizod trzeci - Textinio v3 i Wolny Elektron. Trzynascie agentow, cross-review miedzy koderami i orkiestrator, ktory zjada jedna trzecia calego budzetu. Zobaczymy, czy warto placi za tak cieezka orkiestracje.

[MIRA] Nie moge sie doczekac. Do uslyszenia!

[ALEX] Do uslyszenia.

---

## Metadane produkcyjne

| Parametr | Wartosc |
|----------|---------|
| **Seria** | Architektury Agentowe |
| **Odcinek** | EP02 |
| **Tytul** | Observatory - Jak Zbudowac 12-Agentowy System w 8 Fazach |
| **Czas** | ~7 min |
| **Alex** | glos Kore (Google TTS) |
| **Mira** | glos Aoede (Google TTS) |
| **Zrodla** | OBSERVATORY_architecture.html, A03-TOKEN-COST-ANALYSIS.md |
| **Data produkcji** | 2026-03-29 |

### Segmenty do generacji audio

| Segment | Speaker | Plik wyjsciowy | Czas |
|---------|---------|-----------------|------|
| INTRO | ALEX + MIRA | `ep02_01_intro.wav` | ~30s |
| SEGMENT 1 | ALEX + MIRA | `ep02_02_hierarchia.wav` | ~90s |
| SEGMENT 2 | ALEX + MIRA | `ep02_03_hivemind.wav` | ~90s |
| SEGMENT 3 | ALEX + MIRA | `ep02_04_koszty.wav` | ~90s |
| SEGMENT 4 | ALEX + MIRA | `ep02_05_slabosci.wav` | ~60s |
| SEGMENT 5 | ALEX | `ep02_06_porownanie.wav` | ~60s |
| OUTRO | ALEX + MIRA | `ep02_07_outro.wav` | ~30s |
