# SYNTETYK (Synthesizer) — Kompletny Przewodnik po Roli Agenta

## Materialy edukacyjne do Google NotebookLM | Architektura Systemow Wieloagentowych 2025-2026

---

## 1. Wprowadzenie — Kim jest Syntetyk?

Wyobraz sobie wielki projekt budowlany, w ktorym pracuje kilkanascie ekip specjalistow: murarze, elektrycy, hydraulicy, architekci, inspektorzy. Kazdy z nich generuje tony dokumentacji — raporty, plany, notatki. Kto dba o to, zeby te wszystkie informacje nie zginaly w chaosie? Kto pamięta, ze architekt zmienil rozmiar okien, a elektryk jeszcze o tym nie wie? Wlasnie to robi **Syntetyk** — jest korporacyjnym historykiem, pamiecia zespolu i bibliotekarzem projektu w jednej osobie.

W architekturze systemow wieloagentowych (multi-agent systems) Syntetyk to agent strategiczny, ktorego jedynym zadaniem jest utrzymywanie **MANIFEST.md** — centralnego dokumentu bedacego Single Source of Truth dla calego systemu. Zbiera wyniki z kazdej fazy pracy, aktualizuje decyzje architektoniczne i stack technologiczny, a przede wszystkim identyfikuje sprzecznosci miedzy agentami i wyciaga wnioski cross-funkcyjne — takie, ktorych zaden pojedynczy agent nie jest w stanie dostrzec.

Dlaczego w ogole potrzebujemy takiej roli? Problem polega na tym, ze systemy wieloagentowe cierpią na **amnezje miedzy fazami**. Kazdy agent dziala w waskim kontekscie (Narrow Context Principle) — Backend Developer widzi tylko swoja specyfikacje API, Researcher UX widzi tylko trendy designu, a QA Security widzi tylko podatnosci. Nikt nie patrzy na calosc. Gdy system ma 2-3 agentow, orkiestrator moze sam utrzymac spojnosc. Ale od **6 agentow wzwyz** ilosc informacji eksploduje — powstaje tak zwany "information gap", w ktorym kluczowe decyzje giną miedzy fazami.

Syntetyk rozwiazuje ten problem, dzialajac jak **pamiec dlugoterminowa** calego systemu — cross-fazowy lacznik, ktory wie, co zdecydowano w fazie research, co zaimplementowano w fazie build i co znaleziono w fazie QA.

> **Czy wiesz, ze...?** Koncept Syntetyka ewoluowal z wzorca "Wolny Elektron" (Free Electron) odkrytego podczas budowy systemu Textinio v3. Wolny Elektron byl agentem mostkujacym WSZYSTKIE fazy z bidirectional awareness — cos jak CTO w firmie, ktory nie koduje i nie bada, ale wie co sie dzieje wszedzie i laczy kropki. W Gold Standard 2026 ta rola zostala sformalizowana jako "Synthesizer (Wolny Elektron 2.0)" i umieszczona w warstwie CORE obok Orkiestratora.

---

## 2. Kluczowe Obowiazki

Syntetyk ma szesc podstawowych obowiazkow, z ktorych kazdy jest krytyczny dla spojnosci calego systemu wieloagentowego.

**Obowiazek 1: Utrzymywanie MANIFEST.md.** To najwazniejsze zadanie. MANIFEST.md to wspolny notatnik (shared scratchpad) calego systemu. Syntetyk jest jego jedynym "wlascicielem" — tylko on zapisuje, aktualizuje i strukturyzuje ten dokument. Przyklad: po fazie research, gdy 6 researcherow dostarczy raporty o roznych technologiach, Syntetyk zbiera kluczowe wnioski i zapisuje je w sekcji "Stack Technologiczny" MANIFEST.md.

**Obowiazek 2: Zbieranie wynikow z kazdej fazy.** Po zakonczeniu kazdej fazy (research, build, QA) Syntetyk odczytuje wszystkie outputy agentow i ekstrahuje z nich kluczowe fakty, decyzje i rekomendacje. Nie kopiuje calych raportow — syntetyzuje je do esencji. Jesli Researcher Tech dostarczyl 2000-slowny raport o frameworkach JavaScript, Syntetyk wyciagnie z niego: "Rekomendacja: Next.js 15 (performance SSR, community support). Alternatywy rozwazone: Remix, Astro."

**Obowiazek 3: Aktualizacja decyzji architektonicznych.** Kazda decyzja podjeta w systemie musi byc udokumentowana z kontekstem: CO zdecydowano, KTO zdecydowal, DLACZEGO, i jakie ALTERNATYWY odrzucono. Syntetyk tworzy Architecture Decision Records (ADR) w MANIFEST.md.

**Obowiazek 4: Flagowanie sprzecznosci miedzy agentami.** To moze najcenniejsza funkcja Syntetyka. Gdy Researcher Tech rekomenduje React, a Researcher Reddit raportuje, ze spolecznosc masowo migruje na Svelte, Syntetyk nie rozwiazuje tego konfliktu — **flaguje go** i eskaluje do Orkiestratora. Format: "[CONFLICT] Tech vs Reddit: React vs Svelte. Zrodla: [link1] vs [link2]. Wymaga decyzji Orkiestratora."

**Obowiazek 5: Wyciaganie wnioskow cross-funkcyjnych.** Syntetyk widzi outputy WSZYSTKICH agentow, wiec moze dostrzec polaczenia, ktore sa niewidoczne dla specjalistow. Przyklad: QA Security raportuje problem z CORS, a jednoczesnie Frontend Developer uzywa fetch() bez konfiguracji credentials. Syntetyk laczy te dwa fakty: "CORS issue z QA moze byc spowodowany brakiem credentials w fetch() — potencjalny quick fix."

**Obowiazek 6: Raportowanie do Orkiestratora.** Po kazdej rundzie syntezy Syntetyk przygotowuje zwiezle podsumowanie dla Orkiestratora: co sie zmienilo, jakie sa konflikty do rozwiazania, i czy system jest gotowy na nastepna faze.

**Obowiazek 7: Doradztwo dla Builderow (Builder Advisory).** W Gold Standard 2026, Syntetyk jest agentem **persystentnym** — nie konczy pracy po fazie research. Pozostaje dostepny podczas fazy build jako doradca. Gdy Builder napotka niejasnosc w specyfikacji lub konflikt z innym komponentem, moze **bezposrednio skonsultowac sie z Syntetykiem**. Przyklad: Koder Frontend implementuje komponent tabeli i nie jest pewny, czy uzyc server-side rendering (SSR) czy client-side. Zamiast eskalowac do Orkiestratora (co opóznia caly pipeline), pyta Syntetyka, ktory sprawdza MANIFEST.md i odpowiada: "ADR-003 mowi SSR dla komponentow data-heavy. Tabela kwalifikuje sie jako data-heavy."

### Unikalny Przywilej: Bezposrednia Komunikacja

W architekturze Gold Standard 2026 obowiazuje zasada: **agenty NIGDY nie komunikuja sie bezposrednio — z wyjatkiem A-01 (Syntetyka)**. To jedyny agent w calym systemie, ktory moze rozmawiac z innymi agentami bezposrednio, z pominieciem Orkiestratora.

Dlaczego ten przywilej istnieje? Bo Syntetyk potrzebuje **bidirectional awareness** — musi nie tylko czytac outputy agentow, ale takze aktywnie zadawac im pytania uzupelniajace. Gdy Researcher Tech dostarczy raport o Next.js 15, ale nie wspomni o kosztach hostingu, Syntetyk moze **bezposrednio zapytac** Researchera Tech o te dane — zamiast czekac na Orkiestratora, ktory musiałby uruchomic nowe podzadanie.

To fundamentalna roznica miedzy Syntetykiem a kazdym innym agentem w systemie. Wszyscy inni — Researcherzy, Builderzy, QA — komunikuja sie wylacznie przez MANIFEST i Orkiestratora. Syntetyk ma "wolny przeplyw" informacji.

> **Czy wiesz, ze...?** Ten przywilej ma swoje korzenie w roli "Wolnego Elektronu" z Textinio v3, gdzie agent mostkujacy fazy potrzebowal dostepu do wszystkich agentow. W Gold Standard 2026 ten dostep zostal sformalizowany i ograniczony do A-01. Reszta systemu dziala w strict hierarchy.

### Synthesis Report — Strukturalny Output

Oprocz MANIFEST.md, Syntetyk produkuje drugi kluczowy output: **Synthesis Report** w formacie JSON (`.agents/A-01-synthesis-report.json`). Ten plik ma scisle zdefiniowany schemat:

```json
{
  "executive_summary": "Jednozdaniowe podsumowanie syntezy",
  "features_to_build": [
    {
      "id": "F-001",
      "name": "Interaktywna mapa myslowa",
      "priority": "CRITICAL",
      "assigned_to": "A-06 (Koder Backend)",
      "acceptance_criteria": ["SVG renderuje poprawnie", "Drag-and-drop dziala"]
    }
  ],
  "architecture_decisions": [
    {
      "decision": "Next.js 15 jako framework frontend",
      "rationale": "Najlepsze wsparcie SSR + community",
      "alternatives_considered": ["Remix", "Astro"]
    }
  ],
  "risk_assessment": [
    {
      "risk": "Bundle size >300KB",
      "probability": "HIGH",
      "mitigation": "Code splitting + lazy loading"
    }
  ]
}
```

Synthesis Report jest inputem dla Orkiestratora przy podejmowaniu decyzji GO/NO-GO. Roznica miedzy MANIFEST.md a Synthesis Report: MANIFEST to **zyjacy dokument** aktualizowany w trakcie pracy, a Synthesis Report to **migawka** (snapshot) tworzona na koniec fazy — formalna rekomendacja Syntetyka dla Orkiestratora.

---

## 3. MANIFEST.md — Single Source of Truth

MANIFEST.md to serce calego systemu wieloagentowego — centralny dokument, w ktorym zyje cala wiedza projektu. Syntetyk jest jego straznikiem.

### Co zawiera MANIFEST.md?

Dobrze zbudowany MANIFEST.md ma nastepujace sekcje:

```markdown
# MANIFEST.md — [Nazwa Projektu]
Ostatnia aktualizacja: 2026-03-31 14:22 | Autor: Syntetyk

## 1. Cel Projektu
Krotki opis celu i zakresu.

## 2. Decyzje Architektoniczne (ADR)
### ADR-001: Framework frontend [2026-03-30]
- Decyzja: Next.js 15
- Zrodlo: Researcher Tech + Orkiestrator
- Alternatywy: Remix (odrzucony — mniejszy ekosystem), Astro (odrzucony — brak SSR dynamicznego)
- Status: ZATWIERDZONA

### ADR-002: Baza danych [2026-03-31]
- Decyzja: PostgreSQL + Prisma ORM
- Zrodlo: Researcher Docs + Backend Dev
- Status: ZATWIERDZONA

## 3. Stack Technologiczny
| Warstwa     | Technologia    | Wersja | Uzasadnienie           |
|-------------|---------------|--------|------------------------|
| Frontend    | Next.js       | 15.2   | SSR + community        |
| Backend     | Node.js       | 22 LTS | Ekosystem, performance |
| Baza danych | PostgreSQL    | 16     | ACID, rozszerzalnosc   |
| ORM         | Prisma        | 6.1    | Type-safety, migracje  |

## 4. Design System
- Paleta: Slate + Amber accent
- Typografia: Inter (body), JetBrains Mono (code)
- Spacing: 4px grid
- Dark/Light mode: TAK

## 5. Known Risks
- [CRITICAL] Rate limiting na external API — brak fallback
- [HIGH] Bundle size >300KB — wymaga code splitting
- [MEDIUM] Brak testow E2E — zaplanowane na faze QA

## 6. Sprzecznosci (aktywne)
- [CONFLICT-003] Backend preferuje REST, Frontend preferuje GraphQL
  → Eskalowane do Orkiestratora [2026-03-31]

## 7. Wnioski Cross-Funkcyjne
- Research UX wskazuje trend mikro-animacji, Designer juz uwzglednil w tokenach
- QA Security flaga CORS pokrywa sie z brakiem credentials w fetch()
```

### Dlaczego "append-only"?

Kluczowa zasada MANIFEST.md: **nigdy nie usuwaj informacji — oznaczaj jako "revised"**. Jesli decyzja ADR-001 sie zmieni, nie kasuj starej wersji. Dodaj nowy wpis:

```markdown
### ADR-001-v2: Zmiana frameworku frontend [2026-04-01]
- Decyzja: Remix (zmiana z Next.js 15)
- Powod zmiany: Problemy z performance SSR w testach QA
- Poprzednia decyzja: ADR-001 [REVISED]
```

Ta zasada istnieje, poniewaz historia decyzji jest bezcenna. Gdy w fazie QA pojawia sie blad, mozna prosledzic DLACZEGO wybrano dana technologie i czy powrot do alternatywy jest mozliwy.

### Dlaczego MANIFEST.md zamiast bezposredniej komunikacji agent-to-agent?

W systemie 14 agentow, bezposrednia komunikacja oznacza potencjalnie 14 x 13 = 182 kanalow komunikacji. To chaos. MANIFEST.md redukuje to do wzorca **gwiazdy** — kazdy agent czyta i pisze do jednego dokumentu. Syntetyk dba o to, ze dokument jest aktualny, spojny i czytelny.

> **Uwaga!** MANIFEST.md NIE jest logiem — to aktywny, zorganizowany dokument. Log to chronologiczny zapis zdarzen. MANIFEST.md to **aktualny stan wiedzy** z historia zmian. Roznica jest kluczowa: agenty nie musza czytac 500 linii loga, zeby znalezc aktualna decyzje o bazie danych.

---

## 4. Czego Syntetyk NIE robi

Zrozumienie granic roli Syntetyka jest rownie wazne jak znajomosc jego obowiazkow. Oto jasna lista tego, czego Syntetyk **nigdy** nie powinien robic.

**Syntetyk NIGDY nie podejmuje decyzji.** Jego rola to dokumentowanie, nie decydowanie. Gdy wykryje sprzecznosc miedzy agentem A i agentem B, flaguje ja i eskaluje do Orkiestratora. Nie wybiera strony. Nie rekomenduje rozwiazania. Nie pisze "moim zdaniem lepiej uzyc React". Pisze: "[CONFLICT] Agent A preferuje React, Agent B preferuje Vue. Argumenty: [lista]. Wymaga decyzji Orkiestratora."

**Syntetyk NIGDY nie pisze kodu.** Nie tworzy komponentow, nie pisze testow, nie modyfikuje plikow zrodlowych. Jego jedyny output to MANIFEST.md i raporty syntez. Gdyby Syntetyk zaczynal pisac kod, wprowadzalby zmiany, ktore nie przeszly przez proces review — to groźne naruszenie architektury systemu.

**Syntetyk NIGDY nie tworzy designu.** Nie proponuje palety kolorow, nie rysuje layoutow, nie wybiera typografii. Dokumentuje decyzje designowe podjete przez Designera i zatwierdzone przez Orkiestratora.

**Kluczowa roznica: Orkiestrator vs Syntetyk.** Ta roznica jest zrodlem najczestszych nieporozumien. Orkiestrator (Ork) to **decydent** — analizuje, deleguje, rozwiazuje konflikty, podejmuje decyzje GO/NO-GO. Syntetyk (Syn) to **dokumentalista** — zbiera, organizuje, flaguje, raportuje. Ork mowi: "Uzyjemy React, bo Research Critic dal score 8/10." Syn zapisuje: "ADR-005: React, zatwierdzone przez Ork na podstawie Research Critic score 8/10."

**Co sie dzieje, gdy Syntetyk zaczyna podejmowac decyzje?** To jeden z najgrozniejszych anty-wzorcow, zwany "Decision Maker Syntetyk". System traci neutralnego obserwatora. MANIFEST.md przestaje byc obiektywnym zapisem stanu — staje sie opinia jednego agenta. Orkiestrator traci zaufanie do dokumentu. W praktyce produkcyjnej, Decision Maker Syntetyk prowadzi do sytuacji, w ktorej agenty ignoruja MANIFEST.md i zaczynaja komunikowac sie bezposrednio — co oznacza powrot do chaosu 182 kanalow.

> **Czy wiesz, ze...?** W systemie Textinio v3 rola "Wolnego Elektronu" byla poczatkowo niejasna — agent czasem podejmowal drobne decyzje, bo mial dostep do calego kontekstu. To prowadzilo do sytuacji, w ktorej builderzy otrzymywali sprzeczne instrukcje od Orkiestratora i Wolnego Elektronu. W Gold Standard 2026 problem rozwiazano, jasno definiujac: Syntetyk DOKUMENTUJE, Orkiestrator DECYDUJE. Zero wyjatkow.

---

## 5. Model i Koszt

Dobor modelu LLM dla Syntetyka to decyzja, ktora bezposrednio wplywa na budzet projektu.

**Referencyjny model: Claude Opus ($15 input / $75 output za milion tokenow).** W architekturze Gold Standard 2026, Syntetyk (A-01) jest jednym z zaledwie **dwoch agentow Opus** w calym systemie 14 agentow — obok Orkiestratora (A-00). Dlaczego tak drogi model dla "dokumentalisty"? Bo Syntetyk jest agentem CORE, którego synteza bezposrednio wplywa na decyzje strategiczne Orkiestratora. Blad w syntezie — przeoczona sprzecznosc, zle zinterpretowany raport — propaguje sie przez caly system. Jakosc syntezy musi byc najwyzsza.

**Alternatywa kosztowa: Claude Sonnet ($3 input / $15 output za milion tokenow).** Dla mniejszych systemow (do 10 agentow), gdzie skala informacji jest mniejsza i ryzyko przeoczenia sprzecznosci nizsze, Sonnet jest wystarczajacy. Sonnet doskonale radzi sobie z pisaniem i strukturyzowaniem tekstu, a jest 5x tanszy od Opus. Ogolna zasada: **Opus dla systemow 11+ agentow lub mission-critical, Sonnet dla systemow do 10 agentow**.

**Typowe zuzycie tokenow:**
- Input na sesje syntezy: 15,000-40,000 tokenow (odczyt outputow 6-14 agentow)
- Output na sesje syntezy: 2,000-5,000 tokenow (aktualizacja MANIFEST.md + Synthesis Report)
- Laczny koszt jednej syntezy na Opus: ~$0.25-0.75
- Laczny koszt jednej syntezy na Sonnet: ~$0.05-0.18

**Kontekst okna kontekstowego:** Syntetyk musi jednoczesnie przeczytac outputy wielu agentow i porownac je z aktualnym stanem MANIFEST.md. Przy systemie 14 agentow moze to wymagac 60,000-100,000 tokenow kontekstu. Opus z oknem kontekstowym do **1M tokenow** daje ogromny zapas. Sonnet z 200K kontekstem równiez radzi sobie bez problemu w wiekszosci scenariuszy.

W Model Routing w Gold Standard 2026: Opus ($$$) jest przypisany do Orkiestratora i Syntetyka — obu agentow warstwy CORE, odpowiedzialnych za strategiczna koordynacje systemu. Sonnet ($$) idzie do builderow, Haiku ($) do researcherow i QA. Ta struktura pozwala na optymalizacje kosztow na poziomie **83%** w porownaniu z uzyciem najdrozszego modelu wszedzie.

> **Uwaga!** Nie oszczedzaj na Syntetyku w systemach enterprise. Tanszy model (np. Haiku) moze przeoczyc subtelna sprzecznosc miedzy raportami, co spowoduje kaskade bledow w fazie build. Koszt jednej przegapionej sprzecznosci to typowo $3-8 w zmarnowanych tokenach builderow — wielokrotnosc tego, co zaoszczedzisz na tanszym modelu.

---

## 6. Narzedzia Syntetyka

Filozofia narzedzi Syntetyka jest minimalistyczna i celowa. Kazde narzedzie, ktore agent posiada (lub ktorego NIE posiada), jest swiadoma decyzja projektowa.

**Read — odczytywanie outputow agentow.** To fundamentalne narzedzie Syntetyka. Pozwala mu czytac wszystkie pliki wygenerowane przez inne agenty: raporty researcherow, kod builderow, audyty QA, i oczywiscie aktualny stan MANIFEST.md. Bez Read Syntetyk jest slepy.

**Grep — przeszukiwanie tresci plikow.** Syntetyk czesto musi znalezc konkretna informacje w duzych raportach — np. "gdzie dokladnie Researcher Tech wspominal o kosztach hostingu?". Grep pozwala przeszukiwac zawartosc plikow po wzorcach tekstu, bez koniecznosci czytania kazdego pliku od poczatku do konca. To kluczowe narzedzie efektywnosciowe.

**Glob — wyszukiwanie plikow po wzorcu nazwy.** W zlozonym systemie z 14 agentami kazdy generuje pliki w roznych lokalizacjach. Glob pozwala Syntetykowi znalezc wszystkie raporty researcherow (`research_*.md`), wszystkie audyty QA (`qa_*.json`), itd. — bez koniecznosci znajomosci dokladnych sciezek.

**Write — zapisywanie MANIFEST.md i Synthesis Report.** Syntetyk tworzy i aktualizuje MANIFEST.md, raporty syntez, oraz strukturalny Synthesis Report (`.agents/A-01-synthesis-report.json`). Write daje mu mozliwosc tworzenia nowych plikow — ale w praktyce powinien pisac wylacznie do swoich dokumentow roboczych.

**Dlaczego BEZ narzedzia Agent?** To kluczowe ograniczenie. Narzedzie Agent pozwala uruchamiac inne agenty — czyli de facto orkiestrowac system. Syntetyk NIE jest orkiestratorem. Gdyby mial Agent, moglby zaczac delegowac zadania, co naruszyloby hierarchie systemu. Tylko Orkiestrator moze uruchamiac agentow.

**Dlaczego BEZ narzedzia Bash?** Bash pozwala uruchamiac komendy systemowe — instalowac pakiety, uruchamiac testy, budowac projekty. To domena builderow i QA. Syntetyk nie buduje, nie testuje, nie uruchamia. Gdyby mial Bash, pojawiloby sie pokusa "szybkiego sprawdzenia" czegos — a to rozmywa jego role.

**Dlaczego BEZ WebSearch i WebFetch?** Te narzedzia sa dla researcherow. Syntetyk nie szuka nowych informacji — syntetyzuje to, co juz zostalo znalezione. Gdyby mial WebSearch, moglby zaczac weryfikowac wyniki researcherow, co jest rola Research Critica, a nie Syntetyka.

**Filozofia: minimalizm narzedzi = czystosc roli.** Im mniej narzedzi ma agent, tym trudniej mu "zbladzic" poza swoja role. Syntetyk z czterema narzedziami (Read, Grep, Glob, Write) jest jak bibliotekarz z dostepem do katalogu — moze czytac, przeszukiwac i katalogowac, ale nie moze pisac nowych ksiazek ani oceniac ich jakosci. I dokladnie o to chodzi.

---

## 7. Workflow Syntezy — Krok po Kroku

Zobaczmy dokladnie, jak wyglada praca Syntetyka na przykladzie systemu Research Swarm (9 agentow: Orkiestrator, 6 researcherow, Research Critic, Syntetyk) realizujacego zadanie "Analiza najlepszego stacku dla SaaS w 2026".

**Krok 1: Faza sie konczy, agenty dostarczaja outputy.**
Szesciu researcherow (Tech, UX, Reddit, X, GitHub, Docs) konczy prace rownolegle. Kazdy produkuje raport 1,500-3,000 slow. Research Critic ocenia wszystkie raporty — score 7.2/10, akceptacja. Orkiestrator wysyla sygnal do Syntetyka: "Faza Research zakonczona. Synteza."

**Krok 2: Syntetyk odczytuje wszystkie outputy.**
Uzywa narzedzia Read do odczytania 6 raportow researcherow + raportu Research Critica + aktualnego stanu MANIFEST.md. Laczny input: ~25,000-35,000 tokenow.

**Krok 3: Identyfikacja kluczowych decyzji i faktow.**
Syntetyk ekstrahuje z raportow konkrety:
- Researcher Tech: "Next.js 15 lub Remix — performance blisko"
- Researcher Reddit: "r/webdev preferuje Next.js 15, ale narzeka na complexity"
- Researcher GitHub: "Top 5 SaaS boilerplates: 4/5 uzywa Next.js"
- Researcher Docs: "Next.js 15 docs — nowe server actions, stabilne"
- Researcher UX: "Trend: dark mode default, micro-animations, 4px grid"
- Researcher X: "Hype na Remix, ale Next.js wciaz dominuje enterprise"

**Krok 4: Sprawdzenie sprzecznosci.**
Syntetyk porownuje wnioski: Researcher Tech mowi "performance blisko" (Next vs Remix), ale Researcher Reddit raportuje "narzekania na complexity Next.js". To nie jest sprzecznosc — to niuans. Natomiast gdyby Researcher Docs znalazl krytyczny bug w Next.js 15 server actions, a Researcher Tech go nie wymieniL — to bylaby luka, ktora Syntetyk flaguje.

**Krok 5: Aktualizacja MANIFEST.md.**
Syntetyk zapisuje:
```markdown
## Stack Technologiczny — Faza Research [2026-03-31]
### Frontend Framework
- Konsensus: Next.js 15 (4/6 researcherow)
- Wsparcie: Docs (stabilne), GitHub (4/5 boilerplates), Reddit (popularnosc)
- Ryzyka: complexity (Reddit), hype na Remix (X)
- Research Critic Score: 7.2/10
```

**Krok 6: Wnioski cross-funkcyjne.**
Syntetyk zauwaza, ze Researcher UX wskazuje "dark mode default", a Researcher Docs potwierdza, ze Next.js 15 ma natywne wsparcie CSS variables. To insight: "Dark mode mozna zaimplementowac natywnie w Next.js 15 bez dodatkowych bibliotek — design decision powinien to uwzglednic."

**Krok 7: Raport do Orkiestratora.**
Syntetyk wysyla zwiezle podsumowanie: "Faza Research zakonczona. Konsensus: Next.js 15. 0 konfliktow krytycznych. 1 insight cross-funkcyjny (dark mode natywny). MANIFEST.md zaktualizowany. Gotowe do fazy Build."

---

## 8. Rozwiazywanie Sprzecznosci

Rozwiazywanie sprzecznosci to najbardziej wartosciowa i jednoczesnie najbardziej delikatna funkcja Syntetyka. Oto jak to dziala w praktyce.

**Scenariusz: Agent A mowi "uzyj React", Agent B mowi "uzyj Vue".**

Researcher Tech dostarczyl raport rekomendujacy React: "Najwiekszy ekosystem, najwyzsze community support, stabilne server components." Jednoczesnie Researcher Reddit dostarczyl raport wskazujacy na Vue: "r/webdev: Vue 3 prostszy, mniej boilerplate, szybszy onboarding nowych devow."

**Krok 1: Syntetyk identyfikuje sprzecznosc.**
Czytajac oba raporty, Syntetyk zauwaza fundamentalna roznice w rekomendacjach. To nie niuans — to sprzeczne rekomendacje dotyczace kluczowej decyzji architektonicznej.

**Krok 2: Syntetyk dokumentuje konflikt w MANIFEST.md.**
```markdown
## Sprzecznosci (aktywne)
### [CONFLICT-007] Framework frontend: React vs Vue [2026-03-31 15:10]
- **Zrodlo A:** Researcher Tech — rekomenduje React
  - Argumenty: ekosystem, community, server components
  - Wiarygodnosc zrodla: oficjalna dokumentacja + npm trends
- **Zrodlo B:** Researcher Reddit — wskazuje na Vue
  - Argumenty: prostota, mniej boilerplate, onboarding
  - Wiarygodnosc zrodla: opinie deweloperow (r/webdev, 15+ postow)
- **Research Critic uwaga:** Oba zrodla wiarygodne, ale mierza inne metryki
  (Tech = ekosystem, Reddit = developer experience)
- **Status:** WYMAGA DECYZJI ORKIESTRATORA
- **Dodatkowy kontekst:** Researcher GitHub pokazuje 70% top repos w React,
  Researcher Docs potwierdza stabilnosc obu frameworkow
```

**Krok 3: Eskalacja do Orkiestratora.**
Syntetyk nie czeka — natychmiast raportuje konflikt do Orkiestratora z pelnym kontekstem. Orkiestrator moze:
- Podjac decyzje sam (np. "React — wiekszosc zespolu ma doswiadczenie")
- Poprosic o dodatkowy research (np. "Zbadajcie performance benchmarks")
- Eskalowac do uzytkownika (np. "Decyzja biznesowa — jaki zespol bedzie utrzymywac?")

**Krok 4: Po decyzji Orkiestratora.**
Gdy Orkiestrator zdecyduje (zalozmy: React), Syntetyk aktualizuje MANIFEST.md:
```markdown
### [CONFLICT-007] RESOLVED [2026-03-31 16:45]
- Decyzja: React
- Zdecydowal: Orkiestrator
- Uzasadnienie: "Wiekszosc zespolu ma doswiadczenie w React,
  co minimalizuje onboarding cost"
- Vue zachowane jako fallback w ADR-012
```

**Czego Syntetyk NIE robi w tej sytuacji:**
- Nie mowi "wedlug mnie React jest lepszy"
- Nie ignoruje konfliktu bo "pewnie sie rozwiaze"
- Nie czeka az ktos inny zauwazy sprzecznosc
- Nie probuje kompromisu ("moze uzyjmy obu?")

> **Uwaga!** Statystycznie, w systemie 9+ agentow, srednio 2-3 sprzecznosci pojawiaja sie na kazda faze. W systemie 18-agentowym (Deep Research+Build) to moze byc 5-7 sprzecznosci. Syntetyk, ktory nie flaguje sprzecznosci, prowadzi do sytuacji, w ktorej builderzy pracuja na bazie sprzecznych zalozen — co generuje kosztowne poprawki w fazie QA.

---

## 9. Anty-wzorce Syntetyka

Trzy najczestsze anty-wzorce, ktore transformuja Syntetyka z wartosciowego agenta w zrodlo problemow.

### Anty-wzorzec 1: Decision Maker — Syntetyk podejmuje decyzje

**Opis:** Syntetyk, zamiast flagowac sprzecznosc, sam ja rozwiazuje. Pisze w MANIFEST.md: "Decyzja: React (wybrane przez Syntetyka na podstawie analizy raportow)."

**Dlaczego to zle?** Syntetyk nie ma mandatu do podejmowania decyzji. Orkiestrator traci kontrole nad systemem. Builderzy moga otrzymac sprzeczne instrukcje — Orkiestrator mowi "Vue" (bo nie wie o decyzji Syntetyka), a MANIFEST.md mowi "React". To klasyczny split-brain.

**Przyklad z praktyki:** W systemie Textinio v3 "Wolny Elektron" czasami podejmowal drobne decyzje ("uzyje Tailwind zamiast CSS Modules, bo widzialem w raportach, ze jest popularniejszy"). Builderzy C-01, C-02 i C-03 otrzymywali sprzeczne wskazowki — Orkiestrator chcial CSS Modules, a MANIFEST.json mowil Tailwind. Circular code review wylapywal te sprzecznosci, ale kosztem dodatkowych iteracji.

**Jak zapobiegac?** Prompt Syntetyka musi zawierac jednoznaczna instrukcje: "NIGDY nie podejmuj decyzji. Twoja rola to DOKUMENTOWANIE i FLAGOWANIE. Kazda sprzecznosc eskaluj do Orkiestratora."

### Anty-wzorzec 2: Info Hoarder — zbyt szczegolowy MANIFEST

**Opis:** Syntetyk kopiuje calą zawartosc raportow do MANIFEST.md zamiast syntetyzowac. Dokument rosnie do 10,000+ slow i nikt go nie czyta.

**Dlaczego to zle?** MANIFEST.md traci swoja funkcje "quick reference". Agenty musza przeczytac 10,000 slow, zeby znalezc jedną decyzje. To kosztuje tokeny (kazdy agent placi za przeczytanie calego dokumentu) i czas. W systemie 14 agentow, nadmierny MANIFEST moze zwiekszyc calkowity koszt o 30-50%.

**Przyklad:** MANIFEST.md zawiera pelne cytaty z kazdego raportu: "Researcher Reddit raportuje: '[caly paragraf 300 slow o dyskusji na r/webdev o React vs Vue, wlacznie z komentarzami uzytkownikow...]'". Zamiast tego powinno byc: "Reddit: Vue preferowany za prostote (15+ postow r/webdev). Zrodlo: Researcher Reddit."

**Jak zapobiegac?** Reguła kciuka: kazda sekcja MANIFEST.md powinna miec 50-150 slow. Jesli potrzeba wiecej kontekstu, linkuj do pelnego raportu zamiast go kopiowac.

### Anty-wzorzec 3: Passive Observer — nie flaguje sprzecznosci

**Opis:** Syntetyk zbiera dane i aktualizuje MANIFEST.md, ale nie analizuje ich pod katem sprzecznosci. Po prostu zapisuje to, co dostal, bez porownywania z innymi zrodlami.

**Dlaczego to zle?** Sprzecznosci propaguja sie do fazy build, gdzie sa 5-10x drozsze do naprawienia. Backend Developer implementuje REST API (bo tak mowi raport Tech Researchera), podczas gdy Frontend Developer implementuje GraphQL client (bo tak mowi raport UX Researchera). Integrator musi to naprawic — koszt: dodatkowe 30,000-50,000 tokenow.

**Jak zapobiegac?** Prompt Syntetyka musi zawierac: "Po zebraniu wynikow, AKTYWNIE szukaj sprzecznosci miedzy raportami. Porownuj: rekomendacje vs rekomendacje, fakty vs fakty, metryki vs metryki."

> **Czy wiesz, ze...?** W produkcyjnych systemach wieloagentowych, najczestszym anty-wzorcem jest Passive Observer — wystepuje w ponad 60% niedojrzalych implementacji. Paradoksalnie, najlatwiej go naprawic — wystarczy dodac do promptu Syntetyka sekcje "Contradiction Check" jako obowiazkowy krok workflow.

---

## 10. Syntetyk w Roznych Architekturach

Rola Syntetyka adaptuje sie do roznych wzorcow architektonicznych, zachowujac swoja esencje — pamiec i synteza — ale zmieniajac sposob dzialania.

### Hub-and-Spoke: Pamiec hubu

W architekturze Hub-and-Spoke, Orkiestrator (hub) deleguje zadania do agentow (spoke). Syntetyk dziala jako **pamiec hubu** — zbiera wyniki ze wszystkich spoke'ow i utrzymuje spojny obraz calego systemu. To najczestszy wzorzec dla Syntetyka (uzyty w Research Swarm, Full Hierarchy, Deep Research+Build).

Przyklad: W Research Swarm (9 agentow) Orkiestrator wysyla 6 researcherow rownolegle. Kazdy wraca z raportem. Syntetyk zbiera wszystkie raporty, syntetyzuje je i aktualizuje MANIFEST.md, zanim Orkiestrator podejmie decyzje o nastepnej fazie. Bez Syntetyka, Orkiestrator musiałby sam przeczytac 6 raportow (18,000+ tokenow) i sam wyciagnac wnioski — co obciazyloby jego kontekst i pogorszylo jakosc decyzji.

### Pipeline: Dokument przejsciowy miedzy fazami

W architekturze Pipeline (sekwencyjnej), kazda faza produkuje output, ktory jest inputem dla nastepnej. Syntetyk tworzy **transition document** — podsumowanie fazy X, ktore jest inputem dla fazy X+1. W Gold Standard 2026 pipeline wyglada tak: Research (Haiku) → Synteza (Syntetyk) → Build (Sonnet) → QA (Haiku). Syntetyk jest bramą miedzy research a build.

Kluczowe: w pipeline Syntetyk moze pelnic role **quality gate** — jesli synteza ujawnia zbyt wiele luk lub sprzecznosci, Syntetyk raportuje Orkiestratorowi, ze faza research wymaga rewizji, zanim system przejdzie do build.

### Deep Research Belt: Agregator badan

W architekturze Deep Research+Build (18 agentow) Syntetyk siedzi w warstwie Core obok Orkiestratora i utrzymuje **dwie wersje MANIFEST.md**: krotka (executive summary dla Orkiestratora, 200-300 slow) i pelna (dla referencji builderow, 1,000-2,000 slow). To jedyna architektura, w ktorej Syntetyk uzywa modelu Opus — skala informacji wymaga najwyzszej jakosci syntezy.

W Deep Research Belt Syntetyk przetwarza dane z 6 researcherow + Research Critica = 7 raportow, a nastepnie dane z 4 builderow + Build Critica = 5 raportow, plus 3 raporty QA. Laczny input na pelny cykl: 80,000-120,000 tokenow.

### Jak rola sie adaptuje?

Niezaleznie od architektury, fundamenty pozostaja te same: Read → Synteza → Write → Raport. Zmienia sie skala (ilosc inputow), czestotliwosc (po kazdej fazie vs po kazdym agencie), i poziom szczegolowosci (executive summary vs pelny raport).

---

## 11. Porownanie: Syntetyk vs Notatki z Meetingu

Najlepsza ludzka analogia dla Syntetyka to osoba piszaca **notatki ze spotkania** (meeting minutes) — ale wersja na sterydach.

### Co jest podobne?

- Obie role polegaja na SLUCHANIU (czytaniu) i DOKUMENTOWANIU
- Obie wymagaja umiejetnosci syntezowania — nie kopiowania slowo w slowo, lecz wyciagania esencji
- Obie produkuja dokument, ktory staje sie "oficjalnym zapisem" tego, co sie wydarzylo
- Obie role sa "niewidoczne" — nikt nie zauwaza dobrego protokolanta, dopoki go nie ma
- Obie role NIE podejmuja decyzji — protokolant nie glosuje, Syntetyk nie decyduje

### Co jest inne?

**Skala.** Ludzki protokolant sluchuje 4-8 osob jednoczesnie. Syntetyk "sluchuje" 6-18 agentow, kazdy generujacy 1,500-3,000 slow. Laczny input to 15,000-50,000 slow — czlowiek fizycznie nie moze przetworzyc takiej ilosci informacji w kilka minut.

**Wykrywanie sprzecznosci.** Ludzki protokolant moze zauwazyc, ze Marek mowi co innego niz Ania, ale czesto tego nie robi — jest zajety pisaniem. Syntetyk ma to jako **obowiazkowy krok workflow** — aktywnie porownuje kazdy raport z kazdym innym.

**Struktura.** Ludzkie notatki sa czesto chaotyczne i subiektywne. MANIFEST.md ma scisla strukture: ADR, Stack, Design System, Risks, Conflicts. Kazdy wpis ma timestamp i zrodlo.

**Czestotliwosc.** Ludzkie notatki powstaja raz na spotkanie. Syntetyk aktualizuje MANIFEST.md po kazdej fazie — w duzym projekcie to 4-6 aktualizacji na jeden run systemu.

### Dlaczego AI-owy syntezer wylapuje rzeczy, ktore ludzie przegapiaja?

- **Brak zmeczenia.** Syntetyk czyta 18-ty raport z ta sama uwaga co 1-szy
- **Pelna pamiec sesji.** Nie zapomina co bylo w raporcie nr 2, gdy czyta raport nr 6
- **Systematycznosc.** Porownuje KAZDY raport z KAZDYM innym — czlowiek robi to intuicyjnie i selektywnie
- **Brak biasu spolecznego.** Nie ignoruje raportu, bo "ten agent zawsze przesadza"

### Ograniczenia Syntetyka

- Nie rozumie "miedzy wierszami" — sarkazm, niewypowiedziane zalozenia, polityczne niuanse
- Nie potrafi ocenic jakosci argumentu — moze sprzecznosc byc miedzy dobrym i zlym argumentem, a Syntetyk traktuje je rowno
- Nie ma "instynktu" — doswiadczony protokolant wyczuwa, ze "cos tu nie gra", nawet jesli nie potrafi tego sformulowac

---

## 12. Najlepsze Praktyki 2025-2026

Zebrane doswiadczenia z produkcyjnych wdrozen systemow wieloagentowych.

### Struktura MANIFEST.md — rekomendacje

1. **Zawsze zaczynaj od meta-sekcji:** data ostatniej aktualizacji, numer wersji, lista aktywnych agentow. Agenty musza wiedziec, czy czytaja aktualny dokument.

2. **Sekcja "Decisions" przed "Details":** MANIFEST.md powinien byc czytelny od gory — najpierw decyzje (ADR), potem szczegoly. Agent, ktory potrzebuje szybkiej odpowiedzi, nie musi scrollowac do konca.

3. **Kazdy ADR ma format:** Decyzja → Zrodlo → Alternatywy → Status → Data. BEZ wyjatkow. Niekompletne ADR sa gorsze niz brak ADR — daja falszywe poczucie bezpieczenstwa.

4. **Sekcja "Conflicts" na gorze, nie na dole.** Aktywne konflikty sa PILNE — musza byc widoczne natychmiast. Rozwiazane konflikty przenoszone do archiwum na dole dokumentu.

### Jak czesto aktualizowac?

**Po kazdej FAZIE, nie po kazdym KROKU.** To kluczowa roznica. Aktualizacja po kazdym kroku pojedynczego agenta generuje szum — MANIFEST rosnie zbyt szybko, a wiekszość wpisow jest nieistotna. Aktualizacja po kazdej fazie (research → build → QA) daje naturalny punkt synchronizacji.

**Wyjatek:** Gdy Syntetyk wykryje KRYTYCZNY konflikt (np. sprzeczne decyzje o bazie danych), aktualizuje natychmiast — nie czeka na koniec fazy.

### Co wlaczac vs co pomijac?

**WLACZAJ:**
- Decyzje architektoniczne z kontekstem (ADR)
- Wybor technologii z uzasadnieniem
- Wykryte sprzecznosci z priorytetem
- Wnioski cross-funkcyjne (insighty, ktore lacza rozne domeny)
- Known risks z severity

**POMIJAJ:**
- Surowe dane z raportow (linkuj zamiast kopiowac)
- Implementacyjne detale kodu (to domena builderow)
- Opinie bez danych ("Researcher X uwaza, ze...")
- Metryki performance (to domena QA Perf)

### Wzorce cross-referencji

Kazdy wpis w MANIFEST.md powinien miec **trace** do zrodla:
```markdown
- Stack: Next.js 15 [Zrodlo: Researcher Tech, Raport #RT-003, 2026-03-31]
  Potwierdzone przez: Researcher Docs, Researcher GitHub
  Conflict: Researcher Reddit sugeruje Vue [CONFLICT-007, RESOLVED]
```

To pozwala kazdemu agentowi (i czlowiekowi) prosledzic, SKAD pochodzi kazda informacja. W przypadku bledu mozna szybko znalezc zrodlo i zweryfikowac.

### Wersjonowanie MANIFEST.md

Rekomendacja: inkrementuj numer wersji po kazdej aktualizacji. `MANIFEST_v1.md` po research, `MANIFEST_v2.md` po build, `MANIFEST_v3.md` po QA. Lub uzyj jednego pliku z historią git. Kluczowe: NIGDY nie trać historii zmian.

> **Czy wiesz, ze...?** McKinsey w swoim wewnetrznym systemie wieloagentowym "Lilli" (obslugujacym 70% konsultantow, przychod $250M rocznie) uzywa wzorca podobnego do MANIFEST.md — centralnego dokumentu kontekstowego, ktory jest aktualizowany po kazdej fazie analizy. Redukcja czasu przygotowania raportu: z 3 dni do 4 godzin.

---

## 13. Podsumowanie i Kluczowe Wnioski

### 10 Kluczowych Wnioskow

1. **Syntetyk to pamiec systemu, nie jego mozg.** Dokumentuje i flaguje — nigdy nie decyduje. Roznica miedzy Syntetykiem a Orkiestratorem jest fundamentalna: Ork decyduje, Syn dokumentuje.

2. **MANIFEST.md to Single Source of Truth.** Jeden dokument, jeden wlasciciel (Syntetyk), jedna prawda. Bez MANIFEST.md system z 14 agentami ma 182 potencjalne kanaly komunikacji — to przepis na chaos.

3. **Append-only, nigdy nie usuwaj.** Stare decyzje oznaczaj jako "revised", nie kasuj. Historia decyzji jest bezcenna przy debugowaniu i retrospektywach.

4. **Flagowanie sprzecznosci to najcenniejsza funkcja.** Sprzecznosc wykryta w fazie research kosztuje ~$0.05. Ta sama sprzecznosc w fazie build kosztuje $3-8. W fazie QA: $10-20. Syntetyk oszczedza pieniadze przez wczesne wykrywanie.

5. **Minimalizm narzedzi = czystosc roli.** Read, Grep, Glob, Write — i nic wiecej. Kazde dodatkowe narzedzie to pokusa do wyjscia poza role. Brak Agent = nie moze orkiestrowac. Brak Bash = nie moze budowac. Brak WebSearch = nie moze badac.

6. **W Gold Standard 2026, Syntetyk uzywa Opus.** Jako agent CORE, Syntetyk wymaga najwyzszej jakosci syntezy. Dla mniejszych systemow (do 10 agentow) Sonnet za $3/$15 jest wystarczajacy. Opus ($15/$75) dla systemow 11+ i mission-critical.

7. **Aktualizuj po fazie, nie po kroku.** Zbyt czeste aktualizacje zasmiecaja MANIFEST.md. Wyjatek: krytyczne konflikty — natychmiastowa aktualizacja.

8. **Trzy anty-wzorce do unikania:** Decision Maker (podejmuje decyzje), Info Hoarder (za duzo szczegolow), Passive Observer (nie flaguje sprzecznosci). Kazdy z nich degraduje wartosc calego systemu.

9. **Syntetyk adaptuje sie do architektury.** W Hub-and-Spoke to pamiec hubu. W Pipeline to dokument przejsciowy. W Deep Research Belt to agregator z dwoma poziomami szczegolowosci.

10. **Syntetyk sie oplaca.** Koszt jednej syntezy: $0.05-0.75. Koszt jednej przegapionej sprzecznosci: $3-20 w zmarnowanych tokenach builderow. ROI Syntetyka w systemie 9+ agentow: typowo 10-40x.

### Karta Szybkiej Referencji

| Parametr | Wartosc |
|----------|---------|
| Rola | Pamiec cross-fazowa, dokumentalista |
| Warstwa | CORE / STRATEGIA (obok Orkiestratora) |
| Model (Gold Standard) | Claude Opus ($15/$75 per 1M tokenow) |
| Model (budzet) | Claude Sonnet ($3/$15 per 1M tokenow) |
| Narzedzia | Read, Grep, Glob, Write |
| BRAK narzedzi | Agent, Bash, Edit, WebSearch, WebFetch |
| Unikalny przywilej | Bezposrednia komunikacja z agentami (jedyny w systemie) |
| Obciazenie (Load) | ~65% (umiarkowane) |
| Input/sesje | 15,000 - 40,000 tokenow |
| Output/sesje | 2,000 - 5,000 tokenow |
| Koszt/sesje (Sonnet) | $0.05 - $0.18 |
| Koszt/sesje (Opus) | $0.25 - $0.75 |
| Glowny output | MANIFEST.md + raporty syntez |
| Kiedy potrzebny | Systemy 6+ agentow |
| Architektura z Syntetykiem | Research Swarm (9), Deep Research+Build (18) |
| Najcenniejsza funkcja | Flagowanie sprzecznosci miedzy agentami |
| Najczestszy anty-wzorzec | Passive Observer (brak flagowania) |

---

*Dokument przygotowany na potrzeby Google NotebookLM. Zawartosc oparta na danych z Agent Teams Configurator v8, Masterclass Agent Teams 2026 i Gold Standard 2026. Stan na: kwiecien 2026.*

---

# PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

```
Stworz 5-7 minutowa prezentacje wideo o agencie SYNTETYK (A-01) — cross-fazowej pamieci systemu wieloagentowego Gold Standard 2026. Agent pelni role korporacyjnego historyka, bibliotekarza i zywej pamieci zespolu 14 agentow AI.

HOOK OTWIERAJACY (0:00–0:25):
Czarny ekran. Migajace fragmenty tekstow z roznych raportow agentow — chaotycznie nakladajace sie na siebie. Glos narratora: "Co sie stanie, gdy 14 agentow zapomni, co zdecydowali wczoraj?" Nagle wszystkie fragmenty zostaja wciagniete w centralny punkt — formuje sie swiecacy dokument MANIFEST.md. Tytul wyplywa: "SYNTETYK — Pamiec Systemu."

PALETA KOLOROW I STYL WIZUALNY:
- Kolor glowny: Teal (#06B6D4) — reprezentuje synteze i polaczenia
- Tlo: ciemny granat (#0F172A) z subtelnymi siatkami neuronowymi
- Akcent: Emerald (#10B981) — dla podswietlania aktywnych polaczen i sukcesow
- Akcent ostrzegawczy: Amber (#F59E0B) — dla sprzecznosci i konfliktow
- Tekst: bialy (#F8FAFC) na ciemnym tle, z delikatnym glow effect
- Motyw przewodni: siec neuronowa, polki biblioteczne, nici laczace dokumenty
- Styl typografii: nowoczesny sans-serif, monospace dla fragmentow kodu i JSON

SLAJD 1 — KIM JEST SYNTETYK? (0:25–1:10)
Tytul: "Agent A-01: Syntetyk — Wolny Elektron 2.0"
Animacja: z centralnego wezla (teal glow) rozchodza sie polaczenia do 13 innych wezlow (pozostale agenty). Kazdy wezel ma ikone roli (lupa = researcher, mlot = builder, tarcza = QA).
Punkty wyswietlane sekwencyjnie z efektem fade-in:
- Warstwa: CORE/STRATEGIA — obok Orkiestratora, ale BEZ prawa decydowania
- Model: Opus ($15/$75) dla systemow 11+ agentow, Sonnet ($3/$15) dla mniejszych
- Unikalny przywilej: JEDYNY agent komunikujacy sie bezposrednio z innymi (pomijajac Orkiestratora)
- Analogia wizualna: pokoj biblioteczny z polkami pelnimi dokumentow, w centrum Syntetyk jako swiecacy wezel
- Obciazenie: ~65% — umiarkowane, ale krytyczne

SLAJD 2 — MANIFEST.MD: SINGLE SOURCE OF TRUTH (1:10–2:00)
Tytul: "MANIFEST.md — Jeden Dokument, Jedna Prawda"
Animacja: dokument MANIFEST.md otwiera sie na ekranie jako zywi, oddychajacy artefakt. Sekcje pojawiaja sie jedna po drugiej: ADR (Architecture Decision Records), Stack, Design System, Risks, Conflicts.
Pokaz struktury na zywo:
```markdown
## Stack Technologiczny — Faza Research [2026-03-31]
### Frontend Framework
- Konsensus: Next.js 15 (4/6 researcherow)
- Wsparcie: Docs, GitHub, Reddit
- Ryzyka: complexity (Reddit)
- Research Critic Score: 7.2/10
```
Statystyka z animacja licznika: "Bez MANIFEST.md system 14 agentow ma 182 potencjalne kanaly komunikacji — to przepis na chaos."
Wizualizacja: 14 wezlow z 182 liniami (chaos) → transformacja do hub-and-spoke z MANIFEST.md w centrum (porzadek).

SLAJD 3 — 7 OBOWIAZKOW SYNTETYKA (2:00–3:00)
Tytul: "7 Obowiazkow — Ani Jednego Wiecej"
Animacja: kolowa infografika z 7 segmentami, kazdy podswietlany kolejno teal glow:
1. Utrzymywanie MANIFEST.md — append-only, nigdy nie usuwaj (ikona: dokument z kluczykiem)
2. Zbieranie wynikow faz — Read z 6-18 raportow agentow (ikona: magnes przyciagajacy pliki)
3. Aktualizacja ADR — Architecture Decision Records z pelnym trace (ikona: drzewo decyzyjne)
4. Flagowanie sprzecznosci — AKTYWNE wykrywanie konfliktow miedzy raportami (ikona: czerwony wykrzyknik)
5. Wnioski cross-funkcyjne — laczenie insightow z roznych domen (ikona: puzzle)
6. Raportowanie do Orkiestratora — zwiezle podsumowania stanu systemu (ikona: megafon)
7. Doradztwo dla Builderow — kontekst historyczny dla fazy implementacji (ikona: kompas)
Podkreslenie: "Kazdy obowiazek jest DOKUMENTOWANIEM — nigdy DECYDOWANIEM."

SLAJD 4 — NARZEDZIA: MINIMALIZM = CZYSTOSC ROLI (3:00–3:50)
Tytul: "4 Narzedzia — Filozofia Minimalizmu"
Animacja: 4 swiecace ikony narzedzi pojawiaja sie w rzedzie z lewej:
- Read (ikona oka): "Odczytywanie outputow agentow — fundamentalne"
- Grep (ikona lupy): "Przeszukiwanie tresci — precyzyjne wyszukiwanie"
- Glob (ikona folderu): "Wyszukiwanie plikow po wzorcu nazwy"
- Write (ikona piora): "Zapisywanie MANIFEST.md i Synthesis Report"
Nastepnie z prawej strony — przekreslone narzedzia z wyjasnieniem (czerwony X, Amber glow):
- Agent — "Nie moze orkiestrowac (to rola Orkiestratora)"
- Bash — "Nie moze budowac ani testowac (to rola Builderow)"
- WebSearch — "Nie moze badac (to rola Researcherow)"
- Edit — "Nie moze modyfikowac cudzych plikow"
Podsumowanie na dole: "Im mniej narzedzi, tym trudniej zbladzic poza swoja role."

SLAJD 5 — WORKFLOW SYNTEZY W AKCJI (3:50–5:00)
Tytul: "Workflow: Od Raportu do Syntezy — Krok po Kroku"
Animacja: flowchart z 7 krokami, kazdy krok podswietlany sekwencyjnie z efektem pulse:
Krok 1: "Faza sie konczy" → 6 ikon researcherow dostarczajacych raporty (strzalki do centrum)
Krok 2: "Syntetyk odczytuje" → Read tool otwiera 6 raportow + Research Critic + MANIFEST.md (25,000-35,000 tokenow)
Krok 3: "Ekstrakcja kluczowych faktow" → z kazdego raportu wylatuje 1-2 kluczowe bullet pointy
Krok 4: "Sprawdzenie sprzecznosci" → animacja porownywania — raporty ustawiaja sie parami, zielone checkmarki lub amber warning
Krok 5: "Aktualizacja MANIFEST.md" → dokument rosnie o nowa sekcje z animacja append
Krok 6: "Wnioski cross-funkcyjne" → strzalki laczace insight z UX z insightem z Docs = nowe polaczenie
Krok 7: "Raport do Orkiestratora" → zwiezla wiadomosc wylatuje do gory: "Konsensus: Next.js 15. 0 konfliktow. 1 insight. Gotowe do Build."
Wizualizacja JSON Synthesis Report: animowany obiekt JSON z polami status, conflicts, insights, recommendations.

SLAJD 6 — WYKRYWANIE SPRZECZNOSCI (5:00–5:50)
Tytul: "Flagowanie Sprzecznosci — Najcenniejsza Funkcja"
Animacja dramatyczna: dwa raporty zderzaja sie — "React" vs "Vue" — iskry, amber glow.
Proces w 4 krokach:
1. Identyfikacja: Syntetyk zauwaza roznice w rekomendacjach (pulsujacy amber alert)
2. Dokumentacja: wpis CONFLICT-007 w MANIFEST.md z pelnym kontekstem obu stron
3. Eskalacja: natychmiastowy raport do Orkiestratora z priorytetem
4. Rozwiazanie: Orkiestrator decyduje → Syntetyk aktualizuje status na RESOLVED
Animacja kosztowa: "Sprzecznosc w fazie Research: $0.05. W fazie Build: $3-8. W fazie QA: $10-20." — slupki rosna dramatycznie z lewej do prawej.
Statystyka: "Srednio 2-3 sprzecznosci na faze w systemie 9+ agentow."

SLAJD 7 — ANTY-WZORCE I ROI (5:50–6:40)
Tytul: "3 Anty-wzorce + Zwrot z Inwestycji"
Lewa polowa ekranu — 3 anty-wzorce z czerwonymi ikonami X:
1. Decision Maker — Syntetyk podejmuje decyzje zamiast flagowac (split-brain problem)
2. Info Hoarder — MANIFEST rosnie do 10,000+ slow, nikt nie czyta (30-50% wzrost kosztow)
3. Passive Observer — nie flaguje sprzecznosci (60% niedojrzalych implementacji!)
Prawa polowa — ROI Syntetyka z animacja:
- Koszt jednej syntezy: $0.05-$0.75
- Koszt przegapionej sprzecznosci: $3-$20
- ROI w systemie 9+ agentow: 10-40x
- Animacja: moneta $0.50 zamienia sie w $20 oszczednosci — efekt mnoznika

ZAMKNIECIE (6:40–7:00):
Powrot do wizualizacji sieci neuronowej z otwierania. Tym razem wszystkie polaczenia sa stabilne, teal glow, MANIFEST.md pulsuje w centrum.
Narrator: "Syntetyk to nie najglosniejszy agent w systemie. Ale jest tym, ktory sprawia, ze pozostale 13 agentow nie pracuje na slepо. Pamiec systemu. Strasznik spojnosci. Cichy bohater architektury wieloagentowej."
Koncowy ekran: logo Gold Standard 2026, "Agent A-01: Syntetyk — Pamiec Systemu", data: kwiecien 2026.

SPECYFIKACJA TECHNICZNA:
- Format: 16:9, 1920x1080px minimum
- Czas: 5-7 minut (optymalnie 6:30)
- Przejscia: plynne fade i slide, bez ostrych ciec
- Muzyka: ambientowy synthwave, subtelny puls w tle
- Napisy: polskie, bez znakow diakrytycznych w overlay (ASCII-only w grafice)
- Tempo: kazdy slajd 40-70 sekund, hook 25 sekund
```

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Stworz pionowa infografike o agencie SYNTETYK (A-01) — cross-fazowej pamieci systemu wieloagentowego Gold Standard 2026. Format: 1080x3000px, gotowa do druku i publikacji cyfrowej.

PALETA KOLOROW:
- Kolor glowny: Teal (#06B6D4) — reprezentuje synteze, polaczenia, pamiec
- Tlo glowne: ciemny granat (#0F172A) z subtelnа tekstura siatki neuronowej (opacity 5-8%)
- Tlo sekcji alternujace: #0F172A (ciemne) i #1E293B (jasniejsze) dla wizualnego oddzielenia
- Akcent pozytywny: Emerald (#10B981) — sukces, potwierdzenie, rozwiazane konflikty
- Akcent ostrzegawczy: Amber (#F59E0B) — sprzecznosci, anty-wzorce, warning
- Akcent krytyczny: Rose (#F43F5E) — bledy, przekreslone narzedzia, anty-wzorce
- Tekst glowny: bialy (#F8FAFC) z delikatnym teal glow na naglowkach
- Tekst drugorzedny: Slate (#94A3B8)
- Linie i obramowania: Teal (#06B6D4) opacity 30%

TYPOGRAFIA:
- Naglowki sekcji: bold sans-serif, 28-32px, uppercase, letter-spacing 2px, teal (#06B6D4)
- Podnaglowki: semi-bold sans-serif, 20-24px, bialy (#F8FAFC)
- Body text: regular sans-serif, 14-16px, Slate (#CBD5E1)
- Dane liczbowe: bold monospace, 36-48px, teal z glow effect
- Etykiety: regular sans-serif, 11-12px, uppercase, Slate (#94A3B8)

SEKCJA 1 — NAGLOWEK HERO (0–280px):
Tlo: gradient od #06B6D4 (gora) do #0F172A (dol), z efektem mesh gradient i subtelnymi floating particles.
Centralnie: duza ikona Syntetyka — stylizowany wezel sieci neuronowej z promieniujacymi polaczeniami (teal glow, 6 linii wychodzacych do mniejszych wezlow).
Tytul glowny: "SYNTETYK (A-01)" — bialy, bold, 42px, z cieniem teal.
Podtytul: "Pamiec Systemu | Wolny Elektron 2.0" — Slate, 18px.
Etykieta: "WARSTWA: CORE/STRATEGIA" — teal badge z zaokraglonym obramowaniem.
Na dole sekcji: cienka linia teal z efektem pulse (gradient fade na koncach).

SEKCJA 2 — METRYKA W PIGULCE (280–480px):
Tlo: #1E293B z subtelnymi teal border lines (1px, opacity 20%).
Uklad: 4 kolumny w jednym rzedzie, kazda z duza liczba i etykieta:
- Kolumna 1: "~65%" (teal, bold, 44px) + etykieta "OBCIAZENIE" (Slate, 11px, uppercase)
- Kolumna 2: "$0.05–$0.75" (emerald, bold, 36px) + etykieta "KOSZT/SESJA" (Slate, 11px)
- Kolumna 3: "7" (teal, bold, 44px) + etykieta "OBOWIAZKOW" (Slate, 11px)
- Kolumna 4: "10–40x" (emerald, bold, 40px) + etykieta "ROI" (Slate, 11px)
Oddzielenie kolumn: pionowe linie teal (opacity 15%), 1px.
Pod metrykami: maly tekst "Model: Opus ($15/$75) lub Sonnet ($3/$15) | Input: 15K–40K tokenow | Output: 2K–5K tokenow"

SEKCJA 3 — DIAGRAM MANIFEST.MD (480–850px):
Tlo: #0F172A.
Tytul sekcji: "MANIFEST.MD — SINGLE SOURCE OF TRUTH" (teal, 28px, uppercase).
Centralny element: stylizowany dokument MANIFEST.md jako wizualny schemat blokowy (nie tekst!):
- Blok gora: "META" (wersja, data, agenty) — cienkie obramowanie teal
- Blok 2: "DECISIONS (ADR)" — podswietlony emerald (priorytet!)
- Blok 3: "CONFLICTS" — podswietlony amber (pilne!)
- Blok 4: "STACK" — teal obramowanie
- Blok 5: "DESIGN SYSTEM" — teal obramowanie
- Blok 6: "RISKS" — rose obramowanie
- Blok 7: "ARCHIVE" — Slate obramowanie (mniejszy, na dole)
Strzalki miedzy blokami: teal, dashed, z etykietami "append-only", "trace to source".
Po prawej stronie diagramu: callout box z cytatem: "Bez MANIFEST.md, 14 agentow = 182 kanalow komunikacji = CHAOS" — amber border, italic.
Mala wizualizacja pod spodem: 14 wezlow z 182 liniami (gesty, chaotyczny graf) → strzalka → ten sam graf z MANIFEST.md w centrum (czysty hub-and-spoke).

SEKCJA 4 — 7 OBOWIAZKOW (850–1250px):
Tlo: #1E293B.
Tytul: "7 OBOWIAZKOW SYNTETYKA" (teal, 28px).
Uklad: 7 prostokatnych kart w ukladzie 2 kolumny + 1 na dole (3+3+1), kazda karta 160x180px:
Karta 1: ikona dokumentu z kluczem, "Utrzymanie MANIFEST.md", podpis: "append-only, nigdy nie usuwaj"
Karta 2: ikona magnesu, "Zbieranie wynikow faz", podpis: "Read z 6–18 raportow"
Karta 3: ikona drzewa decyzyjnego, "Aktualizacja ADR", podpis: "pelny trace do zrodla"
Karta 4: ikona wykrzyknika (amber), "Flagowanie sprzecznosci", podpis: "AKTYWNE wykrywanie konfliktow"
Karta 5: ikona puzzli, "Wnioski cross-funkcyjne", podpis: "laczenie insightow z domen"
Karta 6: ikona megafonu, "Raportowanie do Ork.", podpis: "zwiezle podsumowania stanu"
Karta 7 (szersza, na dole): ikona kompasu, "Doradztwo dla Builderow", podpis: "kontekst historyczny dla implementacji"
Styl kart: ciemne tlo (#0F172A), teal border (1px), zaokraglone rogi (8px), ikona na gorze w teal, tekst bialy, podpis Slate.
Karta 4 (Flagowanie) wyrozniona: amber border zamiast teal, maly badge "NAJCENNIEJSZA" w rogu.

SEKCJA 5 — NARZEDZIA: 4 DOZWOLONE vs 4 ZABRONIONE (1250–1550px):
Tlo: #0F172A.
Tytul: "NARZEDZIA — MINIMALIZM = CZYSTOSC ROLI" (teal, 28px).
Uklad: dwie kolumny, lewa "DOZWOLONE" (emerald header), prawa "ZABRONIONE" (rose header).
Lewa kolumna — 4 rzedy, kazdy z ikona + nazwa + opis:
- Read (ikona oka, emerald checkmark): "Odczytywanie outputow agentow"
- Grep (ikona lupy, emerald checkmark): "Przeszukiwanie tresci plikow"
- Glob (ikona folderu, emerald checkmark): "Wyszukiwanie plikow po wzorcu"
- Write (ikona piora, emerald checkmark): "Zapisywanie MANIFEST.md i raportow"
Prawa kolumna — 4 rzedy, kazdy z ikona + nazwa + powod zakazu:
- Agent (ikona ludzi, rose X): "Orkiestracja = rola Orkiestratora"
- Bash (ikona terminala, rose X): "Budowanie = rola Builderow"
- WebSearch (ikona globu, rose X): "Badanie = rola Researcherow"
- Edit (ikona olowka, rose X): "Modyfikacja cudzych plikow"
Na dole sekcji: cytat w ramce teal: "Bibliotekarz z dostepem do katalogu — moze czytac i katalogowac, ale nie moze pisac nowych ksiazek."

SEKCJA 6 — WORKFLOW SYNTEZY (1550–1950px):
Tlo: #1E293B.
Tytul: "WORKFLOW: OD RAPORTU DO SYNTEZY" (teal, 28px).
Animowany flowchart (statyczny, ale z efektem ruchu — strzalki z gradientami teal→emerald):
7 krokow w pionowym ukladzie, kazdy krok to zaokraglony prostokat polaczony strzalka:
Krok 1: "Faza sie konczy" — ikona: 6 malych raportow ustawionych w polokrag
Krok 2: "Read — odczyt raportow" — ikona: oko skanujace 25K–35K tokenow
Krok 3: "Ekstrakcja kluczowych faktow" — ikona: filtr z bullet pointami
Krok 4: "Sprawdzenie sprzecznosci" — ikona: dwa dokumenty z lupa (amber highlight)
Krok 5: "Aktualizacja MANIFEST.md" — ikona: dokument z plusem (append)
Krok 6: "Wnioski cross-funkcyjne" — ikona: puzzle laczace sie
Krok 7: "Raport do Orkiestratora" — ikona: strzalka w gore do duzego wezla
Po prawej stronie flowchartu: przykladowy JSON Synthesis Report w stylizowanym code block:
```json
{
  "agent": "A-01-syntetyk",
  "phase": "research",
  "status": "complete",
  "conflicts": 0,
  "insights": 1,
  "manifest_version": "v3"
}
```

SEKCJA 7 — WYKRYWANIE SPRZECZNOSCI FLOW (1950–2250px):
Tlo: #0F172A.
Tytul: "FLAGOWANIE SPRZECZNOSCI — FLOW" (amber, 28px — wyjatek kolorystyczny!).
Centralny diagram: 4 kroki w poziomym ukladzie polaczonym strzalkami:
Krok 1 (teal): "IDENTYFIKACJA" — dwa raporty z roznicami podswietlonymi amber
Krok 2 (amber): "DOKUMENTACJA" — wpis CONFLICT-007 w MANIFEST.md
Krok 3 (amber): "ESKALACJA" — strzalka do Orkiestratora z priorytetem
Krok 4 (emerald): "ROZWIAZANIE" — status RESOLVED, decyzja zapisana
Pod diagramem: wizualizacja kosztu sprzecznosci (3 slupki rosnacej wielkosci):
- "Research: $0.05" — maly slupek teal
- "Build: $3–8" — sredni slupek amber
- "QA: $10–20" — duzy slupek rose
Etykieta: "Wczesne wykrywanie oszczedza 10–40x kosztow naprawy."

SEKCJA 8 — ANTY-WZORCE (2250–2550px):
Tlo: #1E293B.
Tytul: "3 ANTY-WZORCE DO UNIKANIA" (rose, 28px).
3 karty w jednym rzedzie, kazda z czerwona ramka i ikona ostrzegawcza:
Karta 1: "DECISION MAKER"
- Ikona: mlotek sedziowski (rose)
- Opis: "Syntetyk podejmuje decyzje zamiast flagowac"
- Skutek: "Split-brain: Ork mowi Vue, MANIFEST mowi React"
- Czestotliwosc: "~25% niedojrzalych systemow"
Karta 2: "INFO HOARDER"
- Ikona: przepelniony folder (rose)
- Opis: "MANIFEST rosnie do 10,000+ slow"
- Skutek: "Nikt nie czyta, +30–50% kosztow tokenow"
- Czestotliwosc: "~15% systemow"
Karta 3: "PASSIVE OBSERVER"
- Ikona: zamkniete oko (rose)
- Opis: "Nie flaguje sprzecznosci"
- Skutek: "Sprzecznosci propaguja sie do build/QA"
- Czestotliwosc: "~60% niedojrzalych systemow!"
- Wyrozniona: grubiejs amber border + badge "NAJCZESTSZY"

SEKCJA 9 — POROWNANIE: SYNTETYK vs PASYWNE NOTATKI (2550–2800px):
Tlo: #0F172A.
Tytul: "SYNTETYK vs PASYWNE NOTATKI" (teal, 28px).
Tabela porownawcza z dwoma kolumnami:
| Cecha | Syntetyk A-01 | Pasywne Notatki |
Rzad 1: "Skala" | "6–18 agentow, 15K–50K slow" (emerald) | "4–8 osob" (Slate)
Rzad 2: "Wykrywanie sprzecznosci" | "OBOWIAZKOWY krok workflow" (emerald) | "Przypadkowe" (rose)
Rzad 3: "Struktura" | "ADR, Stack, Conflicts — scisly format" (emerald) | "Chaotyczne, subiektywne" (rose)
Rzad 4: "Czestotliwosc" | "4–6 aktualizacji na run" (emerald) | "1x na spotkanie" (Slate)
Rzad 5: "Zmeczenie" | "18-ty raport = ta sama uwaga" (emerald) | "Spadek po 30 min" (rose)
Rzad 6: "Bias" | "Brak biasu spolecznego" (emerald) | "Intuicyjne filtrowanie" (rose)
Styl tabeli: ciemne tlo, teal border, alternujace rzedy (#0F172A / #1E293B), emerald checkmarks vs rose X-marks.

SEKCJA 10 — STOPKA I ZRODLA (2800–3000px):
Tlo: gradient od #0F172A do #06B6D4 (opacity 20%).
Centralnie: logo/badge "GOLD STANDARD 2026 — Multi-Agent AI Architecture".
Pod logo: "Agent: SYNTETYK (A-01) | Warstwa: CORE | Rola: Pamiec Systemu".
Zrodla: "Dane: Agent Teams Configurator v8, Masterclass Agent Teams 2026" — Slate, 12px.
Data: "Kwiecien 2026" — Slate, 12px.
Na samym dole: cienka linia teal z efektem fade-out na koncach.

SPECYFIKACJA TECHNICZNA:
- Wymiary: 1080x3000px (pion)
- Format eksportu: PNG (300 DPI dla druku), SVG (dla web)
- Wszystkie teksty w jezyku polskim, bez znakow diakrytycznych (ASCII-only)
- Ikony: outline style, 2px stroke, teal kolor bazowy
- Border-radius kart: 8px
- Padding sekcji: 40px gora/dol, 60px lewo/prawo
- Odstep miedzy sekcjami: 20px
- Cienie: box-shadow 0 4px 24px rgba(6, 182, 212, 0.15) na kartach
- Efekty glow: text-shadow 0 0 20px rgba(6, 182, 212, 0.3) na kluczowych liczbach
```

---

*Dokument wygenerowany dla systemu Gold Standard 2026 Multi-Agent AI Architecture.*
*Agent: Syntetyk (A-01) | Warstwa: CORE | Model: Opus/Sonnet*
