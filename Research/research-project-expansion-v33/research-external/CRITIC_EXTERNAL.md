# CRITIC_EXTERNAL - walidacja researchu zewnetrznego (Faza 2)

> Rola: Research Critic. Data: 2026-08-21.
> Zakres: 7 raportow web-research w `research-external/R1..R7`.
> Kontekst nadrzedny (zatwierdzony przez usera): rozwijac Agent Architecture Designer (37 agentow, 44 presety, publiczny GitHub ~70 gwiazdek) pod katem (a) wlasnego uzycia Macieja - research + content creation, NIE software engineering, (b) szerszej publicznosci non-dev, (c) agenta-copywritera nasladujacego styl pisania Macieja (maile, FB/LinkedIn), (d) wizualnej kategoryzacji 44 presetow bez redesignu, (e) prog dodania nowego bytu = **n=0 jesli jest pewnosc przydatnosci teraz lub w przyszlosci**.
> Uwaga o nazewnictwie: istnieja DWA zestawy R1-R7. "Faza 1" = lokalny skan (`research/`, zsyntetyzowany w `plans/SYNTHESIS.md`). "Faza 2" = ten korpus (`research-external/`). W tym pliku R1-R7 zawsze odnosza sie do Fazy 2, chyba ze napisano "faza1".
> Zasada nadrzedna usera (e) `n=0` **luzuje** prog `n>=2-3` z Fazy 1 (SYNTHESIS Q4/backlog). To zmienia werdykty dla kilku kandydatow (patrz sekcja Konflikty faza1 vs faza2).

---

## Werdykty per raport

| Raport | Werdykt | Sila dowodowa | Kluczowe zastrzezenie |
|---|---|---|---|
| R1 Trendy architektury | **PASS** | Wysoka | Zrodla pierwotne (Anthropic/Google/OpenAI eng-blogi) + arXiv. Kilka pozycji cytowanych z second-hand streszczen zamiast oryginalu. |
| R2 Agenci content/research | **PASS** | Wysoka | Konkretne repo GitHub + arXiv + case study Jeremy Morgan. Teza "white space konsumencki" to asercja, nie dowod. |
| R3 GitHub kolekcje | **PASS z zastrzezeniem** | Srednia-wysoka | Sam raport przyznaje rozbieznosc liczb gwiazdek miedzy snapshotami (VoltAgent 7.8k-24.5k, awesome-claude-code 21.6k->52k). Wzorce UX solidne, liczby orientacyjne. |
| R4 Reddit/fora | **PASS z zastrzezeniem** | Srednia (nierowna) | Uczciwie flaguje, ze r/ClaudeAI nie byl indeksowany - oparto na HN (cytaty z nickami, mocne) + second-hand. Sekcja "brakujace agenty" jest najslabsza (autor sam to oznacza), na granicy REVISE. |
| R5 Trendy spoleczne (X) | **PASS z zastrzezeniem** | Srednia | Brak bezposredniego dostepu do X - wszystko z blogow/Medium cytujacych X. Konkretne liczby (Delphi $5M rev, 150+ ekspertow, rebrand NotebookLM 16.07.2026, GAIA 87.8 vs 86) sa NIEZWERYFIKOWANE u zrodla pierwotnego. Kierunek trendu wiarygodny, liczby traktowac jako slaby sygnal. |
| R6 Dokumentacja oficjalna | **PASS** | Najwyzsza | Bezposrednie cytaty z docs.claude.com / anthropic.com/engineering. Najmocniejsze zaplecze dowodowe w calym korpusie. |
| R7 UX kategoryzacja | **PASS** | Wysoka | 7 realnych marketplace'ow + zasady IA (NN/g, Algolia). Rekomendacja lekka, wykonalna, zero-dependency. Zbudowana pod istniejacy design - dobra robota. |

**Uwaga zbiorcza:** zaden raport nie wymaga pelnego REVISE. Trzy "PASS z zastrzezeniem" (R3/R4/R5) dziela ten sam defekt: liczby ilosciowe (gwiazdki, przychody, procenty adopcji) sa slabo weryfikowalne przez ograniczenia dostepu (Reddit/X nieindeksowane). Wnioski JAKOSCIOWE tych raportow sa mocne; ILOSCIOWE nalezy cytowac ostroznie. R1/R2/R6/R7 sa w pelni wiarygodne.

---

## Konflikty wewnatrz fazy 2 (min. 3)

### K1. Ekspansja vs minimalizm/koszt - najsilniejszy konflikt korpusu
R2 i R5 sa mocno **ekspansyjne**: R2 rekomenduje 10 nowych agentow, R5 dorzuca Voice DNA Writer + Voice QA + Digital Twin + celebruje "agent swarms" (overnight batch, 40 PDF -> 100k slow, 300 agentow z jednego promptu). Rownoczesnie R1 + R4 + R6 pchaja w **przeciwnym kierunku**:
- R1: multi-agent zuzywa ~15x wiecej tokenow, "wiekszosc pracy nie ma naturalnie rownoleglych podzadan", "przy watpliwosciach mniejszy".
- R4: najostrzejsze cytaty calego korpusu - "spawn 415 agents", "$120 quota in 6 minutes", userzy dopisuja do CLAUDE.md twarde zakazy spawnowania subagentow.
- R6: "well-designed single agent can accomplish far more than developers expect", "3-10x more tokens".

**Rozstrzygniecie:** to nie jest sprzecznosc do rozstrzygniecia na czyjas korzysc - to dwie osie. R2/R5 mowia CO dodac (nowe domeny kompetencji), R1/R4/R6 mowia JAK to opakowac (male domyslne presety, twardy cap na agentow, estymator kosztu PRZED odpaleniem). Dla misji EDUKACYJNEJ projektu oba sa spojne: projekt ma uczyc "kiedy WARTO" multi-agent, wiec cytat R1 "kiedy NIE uzywac" jest zawartoscia edukacyjna, nie kontrargumentem. Konkret dla Syntetyka: kazdy nowy agent contentowy powinien domyslnie byc SOLO/maly (voice-writer to 1-2 agenty, nie swarm), a "swarm content" z R5 pokazywac jako scenariusz z widocznym ostrzezeniem kosztowym.

### K2. "Brak oficjalnego wzorca marketplace UX" (R6) vs konkretne wzorce community (R3/R7)
R6 stwierdza wprost: Anthropic NIE publikuje przewodnika UX dla katalogu/marketplace agentow, a jedyny wspierany mechanizm dyskryminacji to pole `description` w jezyku naturalnym (zero-UI, model sam wybiera). R3/R7 znalazly za to bogate, konkretne wzorce: VoltAgent (numerowane foldery + emoji), buildwithclaude.com (galeria z filtrami), GitHub/VS Code/Raycast/n8n (kategorie + facety + kolor).

**Rozstrzygniecie:** to konflikt POZORNY, bo raporty mowia o dwoch roznych warstwach:
- R6 = warstwa **maszynowa** (jak LLM/auto-router wybiera agenta -> przez `description`, folder/kategoria NIE wplywa na routing).
- R3/R7 = warstwa **ludzka** (jak czlowiek przeglada wzrokiem 44 pozycje -> kolor, kategoria, filtr).

R6 sam to godzi: nazywa wizualny katalog "warstwa DODATKOWA ponad oficjalny mechanizm... user-facing edukacja, nie zamiennik". WNIOSEK KRYTYCZNY dla Syntetyka: system kategoryzacji z R7 (item d) poprawi ludzka nawigacje, ale **NIE poprawi auto-routingu**. Jesli Maciej myli te warstwy i liczy, ze kolorowe kategorie w HTML pomoga routerowi - to bledne. Routing poprawia sie WYLACZNIE przez `PRESET_CATALOG.md` (R6 rekomendacja description-rewrite). Kategoria wizualna i kategoria routingowa to dwa osobne systemy (patrz Gap 4 - ryzyko dryfu).

### K3. Nazewnictwo agenta stylu - trzy sprzeczne filozofie
Ten sam byt (agent pisania w czyims stylu) dostaje trzy niekompatybilne rekomendacje nazewnicze:
- R2: opisowe, funkcyjne - `style-profiler` + `voice-writer`.
- R5: nazwa trendowa dla SEO/rozpoznawalnosci - dokladnie **"Voice DNA Writer"** ("juz zaadaptowana jako nazwa Skilli, zwieksza szanse trafienia w dyskurs wyszukiwan").
- R6: konwencja oficjalna Anthropic - **gerund form** (`analyzing-writing-style`, `writing-in-voice`).

**Rozstrzygniecie:** to realny konflikt do decyzji, nie pozorny. Kompromis: nazwa **wewnetrzna/pliku** wg gerund lub funkcyjna (spojnosc z istniejacymi `res_*`, `qa_*` - projekt i tak NIE stosuje gerund, wiec R6 to zalecenie, nie wymog), a **etykieta encyklopedyczna PL/EN** moze uzywac "Voice DNA" jako rozpoznawalnego terminu marketingowego. Nie mieszac obu w jednej nazwie technicznej.

### K4. Ile probek stylu wystarczy - napiecie wewnatrz R2 + R5
R2 (sekcja 4.2): konsensus narzedzi to "3-5 probek wystarcza", niektore dzialaja na 2. Ale R2 (sekcja 4.3, case Jeremy Morgan): user skonsolidowal **255 artykulow** i model NADAL dokladal cechy spoza zrodla (nadmierny entuzjazm, drift). R5 potwierdza limit: powyzej ~2000 slow w cudzym glosie model "zaczyna brzmiec jak chatbot obslugi klienta". 

**Rozstrzygniecie:** to nie tyle sprzecznosc, co niedopowiedzenie: 3-5 probek wystarcza do EKSTRAKCJI profilu, ale NIE gwarantuje wiernosci GENERACJI - stad oba raporty (R2 4.7, R5 pkt 2) niezaleznie wskazuja obowiazkowy krok walidacji/QA (Voice QA). Konsekwencja: agent stylu MUSI byc pipeline dwu- lub trojkrokowym (profiler -> writer -> voice-QA), a nie pojedynczym promptem. To zbieznosc, nie konflikt - ale wazna, bo przesadza o architekturze.

### K5. "Meta/Orchestration jako kategoria" (R3/R4) vs "folder nie wplywa na wybor" (R6)
R3 i R4 rekomenduja dodanie jawnej kategorii "Meta & Orchestration / agent-organizer". R6 stwierdza, ze struktura katalogow sluzy WYLACZNIE czlowiekowi i nie wplywa na to, jak model wybiera agenta. Konflikt pozorny (znowu: warstwa ludzka vs maszynowa), ale wart odnotowania: dodanie takiej kategorii ma sens tylko jako etykieta UX/edukacyjna. Faktyczny "agent-organizer" u Macieja juz istnieje jako `PRESET_CATALOG.md` + auto-dobor - to nie brakuje bytu, brakuje ewentualnie jego NAZWANIA/uwidocznienia w encyklopedii.

---

## Konflikty faza1 (SYNTHESIS) vs faza2 (min. 2)

### F1. Prog dodawania bytow: Faza 1 `n>=2-3` vs zatwierdzony przez usera `n=0`
To najwazniejszy konflikt calej walidacji. Faza 1 (SYNTHESIS sekcje 6-7, Q4) explicite BLOKUJE nowe byty bez dowodu wielokrotnego uzycia: `interview_coach` -> backlog (n=1), `content_social` -> ODRZUCIC (n=0), nowa domena -> HITL. Cala filozofia Fazy 1 to "najpierw naprawa dryfu, nowe byty tylko przy n>=2-3". Faza 2 (R2/R5) proponuje ~12 nowych bytow, w tym takie z dowodem n=0/n=1.

**Rozstrzygniecie:** kontekst nadrzedny usera (e) `n=0 jesli pewnosc przydatnosci` **odwraca** prog Fazy 1. Pytanie HITL Q1 z SYNTHESIS ("dev-centryczny czy personal") zostalo przez usera ROZSTRZYGNIETE na rzecz personal/content/non-dev. To oznacza:
- `content_social` (Faza 1: ODRZUCONY n=0) -> **wraca do gry** (user chce agenta na FB/LinkedIn - item c).
- `interview_coach` (Faza 1: backlog n=1) -> **kwalifikuje sie** (item a/b).
- voice-writer -> **greenlit** wprost przez usera (item c), niezaleznie od jakiegokolwiek n.

Syntetyk MUSI zaznaczyc, ze rekomendacje Fazy 1 (NIE.2, NIE.6, backlog) sa teraz NIEAKTUALNE w swietle decyzji usera. Faza 1 nie byla bledna - odpowiadala na inne pytanie (fit-to-CURRENT-usage), a user zmienil pytanie na fit-to-INTENDED-usage.

### F2. "Reputational risk" nazywania promptow "agentami" (R4) vs plan rozrostu kolekcji
R4 cytuje NitpickLawyer: "This is a collection of prompts. To call them 'agents' is only adding to that confusion." Faza 1 sama przyznaje, ze skille to "skill-jako-prompt" (SYNTHESIS 3, R6 pkt 6). Konflikt: Maciej chce POWIEKSZYC publiczna (~70 gwiazdek) kolekcje o kolejne ~5-12 non-dev "agentow", ktore tez sa statycznymi promptami. Kazdy dodany "agent"-prompt zwieksza powierzchnie tej krytyki reputacyjnej.

**Rozstrzygniecie:** to realne ryzyko, nie pozorne. NIE blokuje ekspansji, ale wymaga mitygacji: (1) jasna sekcja w dokumentacji "skill (statyczny prompt) vs agent (petla + narzedzia + pamiec)" - R4 rec 3, definicja gotowa w R6; (2) ostroznosc z terminem "agent" przy bytach czysto pisarskich; (3) uwaga: Digital Twin z R5 to JEDYNY proponowany byt, ktory faktycznie wymaga petli/pamieci persystentnej - reszta to prompty. Paradoksalnie wiec dodanie Digital Twin obnizyloby ryzyko terminologiczne, ale kosztem duzego liftu architektonicznego niepasujacego do modelu single-HTML.

### F3. Consumer research: Faza 1 "flaga" vs Faza 2 "nowy 3-fazowy pipeline"
Faza 1 (P1.1) rekomenduje `--no-tech` jako FLAGE do istniejacego `/research` (dowod: user ukonczyl Prywatny-H/Prywatny-C/Prywatny-D repurposingiem, wiec `/research` nie zawiodl). Faza 2 R2 rekomenduje NOWY pelny pipeline `decision-research-agent` (criteria-elicitor -> comparator -> recommender), nazywajac to "white space rynkowy".

**Rozstrzygniecie:** zbieznosc dowodowa (oba widza wzorzec konsumencki, n=3 na dysku), rozbieznosc formy. Przy progu usera n=0 i chęci wlasnego uzycia - mozna posc dalej niz Faza 1, ale mądrze: zbudowac maly preset REUZYWAJACY istniejacych researcherow (res_reddit/res_forums jako rdzen, res_tech/github/docs off), a nie 3 zupelnie nowych agentow. To godzi R2 (osobny, nazwany byt konsumencki) z Faza 1 (nie mnoz agentow bez potrzeby, reuzyj).

### F4. Zakres HTML: Faza 1 "NIE zmieniac niczego wizualnego" (NIE.7) vs Faza 2 R7 (caly raport o wizualnej kategoryzacji)
Faza 1 explicite wykluczyla zmiany w HTML z zakresu kampanii (NIE.7). Caly R7 to rekomendacja zmian wizualnych w HTML (kategorie + kolor + filtr-chip dla 44 presetow).

**Rozstrzygniecie:** nie jest to sprzecznosc merytoryczna, tylko rozszerzenie zakresu. Faza 1 celowo ograniczyla sie do warstwy skills/commands/routing. Item (d) usera OTWIERA warstwe HTML. R7 legalnie wchodzi tam, gdzie Faza 1 sie nie zapuszczala. Syntetyk powinien traktowac R7 jako OSOBNY strumien roboczy (UI) rownolegly do strumienia agentow (skills/commands), z wlasnym ryzykiem (parytet bilingual PL/EN, generate_skills.js - SYNTHESIS Gap 4).

---

## Skonsolidowana lista kandydatow (z liczba poparcia i zrodlami)

Legenda poparcia: **MOCNE** = 2+ niezalezne raporty fazy2, lub 1 raport fazy2 + dowod uzycia z fazy1. **SLABE** = pojedynczy raport / pojedynczy researcher. Kolumna "user" = bezposrednio objete deklarowana intencja usera (a-e).

### Grupa A: Agent stylu pisania (rdzen intencji usera - item c)

| Kandydat | Poparcie | Zrodla | Uwaga |
|---|---|---|---|
| **style-profiler** (ekstrakcja profilu stylu do reuzywalnego artefaktu) | **MOCNE** | R2 (4.7), R5 (Voice DNA Creator/Analyzer), R6 (examples pattern), + user(c) | Fundament pod wszystkie byty pisarskie. Rozne narzedzia doszly niezaleznie do tego samego wzorca. |
| **voice-writer / ghostwriter** (pisze w stylu z profilu) | **MOCNE** | R2, R5, + user(c) explicite | Byt, ktorego user chce najbardziej. Musi miec negative constraints ("unikaj X"). |
| **voice-QA / voice-consistency checker** (walidacja driftu stylu) | **MOCNE** | R5 (pkt 2, osobna rola), R2 (4.7 opcjonalny validator), K4 | Wymuszony przez limit z K4 - few-shot bez walidacji driftuje. |
| Digital Twin / Expert Clone (konwersacyjny klon) | SLABE | R5 (tylko) | Duzy lift (pamiec persystentna), nie pasuje do single-HTML edu. Backlog/pominac. |

### Grupa B: Kariera / CV (item a/b; watek kariery n=3-4 na dysku wg fazy1)

| Kandydat | Poparcie | Zrodla | Uwaga |
|---|---|---|---|
| **career-document-builder** (zrodlo prawdy o doswiadczeniu, anty-halucynacja) | MOCNE (usage) | R2 (ats-resume-agent), + faza1 (Kariera-B, Prywatny-G/cv, R12, Kariera-A) | "Zero fabrication" guardrail - wazny wzorzec. Fundament pod reszte grupy B. |
| resume-tailor / cv-writer | SLABE (fazi2) / MOCNE (usage) | R2, + faza1 watek kariery | |
| cover-letter-writer (framework CAR) | SLABE | R2 | Skladalny z voice-writer. |
| **interview-prep / interview_coach** | MOCNE | R2 + faza1 Kariera-A (n=1) + user(a/b) | Faza 1 dala backlog n=1; prog usera n=0 to odblokowuje. |
| salary-negotiation-prep | SLABE | R2 | Najnizszy priorytet, latwy do dodania. |

### Grupa C: Consumer / decision research (item a; n=3 na dysku)

| Kandydat | Poparcie | Zrodla | Uwaga |
|---|---|---|---|
| **decision-research** (criteria-elicitor -> comparator -> recommender) | **MOCNE** | R2 (white space) + faza1 Prywatny-H/Prywatny-C/Prywatny-D (n=3) | Konflikt formy F3: flaga (faza1) vs pipeline (R2). Rekomendacja: maly preset reuzywajacy res_reddit/res_forums. |

### Grupa D: Personal brand / content social (item b/c)

| Kandydat | Poparcie | Zrodla | Uwaga |
|---|---|---|---|
| personal-brand-strategist (Discovery->Articulation->Amplification) | SLABE-SREDNIE | R2 + R5 (Oiti: brand pillars/ICP) | 2 zrodla robia to samo, ale luzno. |
| **content_social / linkedin-content-planner** (research->plan->draft->repurpose->HITL) | SREDNIE | R2 + R5 ("command and execute") + user(c) | Faza 1 ODRZUCILA (n=0). Prog usera n=0 + item(c) -> wraca. Spina sie z voice-writer. |

### Grupa E: Kategoryzacja wizualna 44 presetow (item d - NIE agenci, feature UI)

| Kandydat | Poparcie | Zrodla | Uwaga |
|---|---|---|---|
| **6-8 kategorii use-case + kolor/emoji per preset + filtr-chip** | **MOCNE** | R3 (VoltAgent numerowane+emoji), R7 (6-8 kat + kolor + chip), + user(d) | Najlepiej udokumentowany feature. Zero-dependency, wpasowany w istniejacy design. GOTOWE do finalnej listy. |
| Druga os "zlozonosc/koszt/rozmiar zespolu" jako filtr | SREDNIE | R3 (rekomenduje), R7 (odradza w iter.1, proponuje jako sort) | Konflikt timingu: R3 chce od razu, R7 dopiero jak 1 os nie wystarczy. Rozstrzygniecie: 1 os najpierw. |
| Toggle widoku (Kategorie / A-Z / koszt) | SLABE | R3 (hesreallyhim) | Tania, opcjonalna. |
| Jawna kategoria "Meta/Orchestration" | SREDNIE | R3 + R4 | Tylko etykieta UX (K5) - byt juz istnieje jako PRESET_CATALOG. |

### Grupa F: Wzbogacenie encyklopedii / dokumentacji (NIE agenci - tresc edukacyjna)

| Kandydat | Poparcie | Zrodla | Uwaga |
|---|---|---|---|
| **Sekcja "kiedy NIE uzywac multi-agent" + estymator kosztu przed duzym presetem** | **MOCNE** | R1 + R4 (cytaty $120/6min) + R6 (3-10x) | Pasuje do misji edu i do istniejacego Verdict Panel. |
| **Rewrite pol `description` (what+when+trigger words)** | MOCNE | R6 + faza1 P2 + korpus R6-pkt7 | Jedyny mechanizm realnego routingu. Wspiera item(d) na warstwie maszynowej. |
| Sekcja "skill vs agent" (mitygacja ryzyka reputacyjnego) | SREDNIE | R4 + R6 | Patrz F2. |
| Guardrails jako osobny prymityw | SLABE | R1 (tylko) | Wzbogacenie encyklopedii, nie nowy agent. |
| Blackboard jako preset eksperymentalny | SLABE | R1 (tylko) | Nisza. Pominac w v33. |
| Confident-liar + anonimizacja w Five Minds docs | SLABE | R1 (tylko) | Notka do encyklopedii Five Minds. |
| Accountability boundary per preset | SLABE | R1 (tylko) | Wzbogacenie opisu presetow. |

### Podsumowanie sily poparcia
- **Kandydaci MOCNI (2+ zrodla lub zrodlo+usage, gotowi do rozwazenia na finalnej liscie):** style-profiler, voice-writer, voice-QA, career-document-builder, interview-prep, decision-research, kategoryzacja wizualna (6-8 kat + kolor + chip), sekcja "kiedy NIE multi-agent" + estymator, description-rewrite.
- **Pojedynczy pomysl jednego researchera (SLABI, wymaga zawezenia lub pominiecia):** Digital Twin (R5), cover-letter/resume-tailor/salary (R2 solo, ale watek kariery ma usage), guardrails/blackboard/confident-liar/accountability (R1 solo), toggle widoku (R3 solo).

---

## Gaps

1. **Brak researchu stylu dla jezyka polskiego.** Maciej pisze maile/FB/LinkedIn czesciowo lub w calosci po polsku (item c). CALE zaplecze voice-cloning (R2, R5) to narzedzia i arXiv anglojezyczne. Zero walidacji, czy metody "Voice DNA" / 5-filarow / few-shot dzialaja dla polskiej morfologii, fleksji, rejestru. To krytyczna luka dla najwazniejszego bytu (voice-writer). Delta-research wymagany PRZED implementacja.

2. **Brak estymaty kosztu/wykonalnosci dodania bytow w pipeline bilingual.** Kazdy nowy agent to nie 1 plik: skill `.md` + command + wpis w PRESET_CATALOG + wpisy encyklopedyczne PL i EN (AGENT_EDU) + prompty video/infografika (wymog z MEMORY) + regeneracja przez generate_skills.js z parytetem. Faza 2 (jak i Faza 1 - Gap 4) w ogole nie oszacowala tego narzutu. Przy ~12 kandydatach to moze byc wielokrotnie wiekszy koszt niz sama tresc promptu.

3. **Brak forward-looking dowodu uzycia dla NON-Maciej publicznosci (item b).** Dowody "popytu non-dev" sa albo z dysku Macieja (faza1, n=3 dla consumer), albo z rynku (R4/R5 - second-hand, R4 sam flaguje brak dostepu do Reddit, R5 brak dostepu do X). Nikt nie zmierzyl, czy szersza publicznosc ~70-gwiazdkowego repo faktycznie chce agentow non-dev, czy tylko Maciej. Ryzyko: budowa pod hipotetycznego usera.

4. **Ryzyko dryfu dwoch systemow kategorii (wizualnej vs routingowej).** R7 dodaje `kategoria` do 44 obiektow presetow w HTML. PRESET_CATALOG.md ma wlasny podzial na grupy (R6/faza1). Nikt nie zaadresowal, jak utrzymac spojnosc miedzy kategoria-w-HTML a kategoria-w-katalogu-routingu. To DOKLADNIE ten typ dryfu, ktory faza1 P0 wlasnie naprawiala (deep-research-v2 w plikach, brak w katalogu). Dodanie trzeciej warstwy metadanych bez procesu synchronizacji odtwarza problem.

5. **Brak analizy roznicujacej wobec konkurencji.** R3 znalazl buildwithclaude.com robiacy dokladnie to samo (wizualna galeria z filtrami) i mimo to nazywa single-HTML "silna przewaga". Nikt nie sprawdzil, CZYM konkretnie Agent Architecture Designer wygrywa poza formatem pliku (bilingual? encyklopedia? verdict panel?). Item (b) zaklada szersza publicznosc - bez tej analizy nie wiadomo, dlaczego mieliby wybrac ten projekt.

6. **Brak decyzji o probkach i prywatnosci dla voice-writera.** Agent stylu potrzebuje realnych probek pisania Macieja (maile, DM, posty). Zaden raport nie okresla: ile probek, w jakim jezyku, gdzie przechowywane, jak wersjonowane, czy trafiaja do publicznego repo (ryzyko wycieku prywatnych maili). R2 wspomina 3-5 probek, ale nie jako polityke danych.

---

## Rekomendacja dla Syntetyka

### Gotowe do finalnej listy (mocne poparcie + zgodne z intencja usera)
1. **Rdzen pisarski jako JEDEN pipeline, nie 3 osobne agenty:** `style-profiler` -> `voice-writer` -> `voice-QA`. Poparcie 2+ raportow, explicite chciany (item c), a K4 wymusza architekture pipeline'owa. To najwyzszy priorytet v33.
2. **Kategoryzacja wizualna 44 presetow** (6-8 kategorii use-case + kolorowy akcent + filtr-chip w headerze). R3+R7, item(d), zero-dependency, wpasowana w design. Traktowac jako osobny strumien UI.
3. **Sekcja edukacyjna "kiedy NIE uzywac multi-agent" + estymator kosztu** przed duzymi presetami. R1+R4+R6, pasuje do misji i istniejacego Verdict Panel.
4. **Rewrite pol `description`** wg wzorca what+when+trigger (R6, wspiera faza1 P2 i realny routing).

### Wymaga zawezenia PRZED finalna lista
5. **Grupa kariera (B):** NIE dodawac 5 osobnych agentow. Skonsolidowac w JEDEN preset "kariera" (career-document-builder jako zrodlo prawdy + tailor + cover-letter + interview-prep jako fazy). Watek ma usage n=3-4 (faza1), ale reputacyjnie (F2) 5 nowych "agentow"-promptow to za duzo. interview-prep moze byc pierwszym krokiem (n=1 + item a/b).
6. **decision-research (C):** rozstrzygnac F3 na rzecz malego presetu REUZYWAJACEGO res_reddit/res_forums (rdzen), z res_tech/github/docs wylaczonymi - a nie 3 nowych agentow. Godzi R2 z zasada "nie mnoz bytow".
7. **content_social / personal-brand (D):** dopiac do pipeline voice (reuzyc profil stylu), nie budowac jako samodzielne silosy. Faza 1 je odrzucila, ale prog usera n=0 + item(c) je przywraca - zaznaczyc te zmiane statusu wprost.

### Odlozyc / pominac w v33
8. **Digital Twin (R5, SLABE):** duzy lift (pamiec persystentna), nie pasuje do single-HTML edu. Backlog.
9. **Guardrails / blackboard / confident-liar / accountability (R1, SLABE):** to wzbogacenia TRESCI encyklopedii, nie nowe agenty. Nie zwiekszac liczby agentow z tego tytulu. Ewentualnie jako notki edukacyjne.
10. **Druga os filtrow (koszt/zlozonosc):** dopiero iteracja 2, jesli 1 os nie wystarczy (rozstrzygniecie R7 > R3).

### Ostrzezenia procesowe (do wpisania w plan, nie do listy bytow)
- **F1 nadpisuje faze1:** rekomendacje SYNTHESIS NIE.2 (content_social), NIE.6 (interview_coach), backlog n>=2-3 sa NIEAKTUALNE po decyzji usera (e) n=0. Syntetyk musi to jawnie odnotowac, inaczej finalna lista bedzie sprzeczna z faza1.
- **K2/Gap4:** kategoria wizualna != kategoria routingowa. Nie obiecywac, ze kolorki poprawia auto-router. Zaplanowac synchronizacje HTML <-> PRESET_CATALOG, inaczej odtworzysz dryf, ktory faza1 P0 naprawiala.
- **Gap1 (jezyk PL):** voice-writer wymaga delta-researchu stylu dla polskiego PRZED implementacja - to blocker jakosci, nie nice-to-have.
- **Gap2 (koszt bilingual):** przed zatwierdzeniem ~12 bytow policzyc realny narzut (skill+command+katalog+EDU_PL+EDU_EN+media prompts+generate_skills.js). Konsolidacja grup B/C/D obniza ten narzut.
- **F2 (reputacja):** dodac sekcje "skill vs agent" jako mitygacje przed rozrostem publicznej kolekcji "agentow"-promptow.
