# ORKIESTRATOR -- Centralny Agent Zarzadzajacy w Systemach Wieloagentowych AI

## Kompletny Przewodnik Edukacyjny | Wersja 2026

---

## 1. Wprowadzenie -- Kim jest Orkiestrator?

Wyobraz sobie duzy projekt budowlany. Na placu budowy pracuja elektrycy, hydraulicy, murarze, dekarze i dwudziestu innych specjalistow. Kazdy jest ekspertem w swoim fachu. Ale gdyby wszyscy jednoczesnie zaczeli robic to, co uwazaja za najwazniejsze -- bez planu, bez koordynacji, bez wspólnego harmonogramu -- efektem bylby chaos, nie dom.

Dokladnie tak dziala system wieloagentowy AI bez orkiestratora.

**Orkiestrator** (ang. *Orchestrator*) to centralny agent decyzyjny w systemie wieloagentowym. Jego rola jest analogiczna do trzech znanych postaci ze swiata realnego:

- **Kierownik projektu** -- dekomponuje duze zadanie na mniejsze czesci, przydziela je odpowiednim ludziom i pilnuje terminow.
- **Dyrygent orkiestry** -- nie gra na zadnym instrumencie, ale decyduje, kto gra kiedy, jak glosno i w jakim tempie. Bez dyrygenta orkiestra to kakofonia.
- **Kontroler ruchu lotniczego** -- widzi caly obraz sytuacji na radarze, koordynuje ladowania i starty, zapobiega kolizjom. Piloci (agenty) wykonuja manewry, ale kontroler mowi im kiedy i gdzie.

Dlaczego orkiestrator w ogole istnieje? Bo pojedynczy agent AI -- nawet najpotezniejszy -- ma fundamentalne ograniczenia. Ma jedno okno kontekstowe (swój "babelek pamieci"), a kazda próba ogarniecia jednoczesnie kodowania, analizowania, pisania, testowania i projektowania konczy sie **przeciazeniem kontekstu**, halucynacjami i porazka.

Orkiestrator rozwiazuje ten problem przez **podzial pracy**: zamiast jednego agenta robiacego wszystko, mamy wielu specjalistow, z których kazdy robi jedna rzecz doskonale, a orkiestrator koordynuje ich wysilki.

**Kiedy potrzebujesz orkiestratora?** Ogólna zasada mówi: od **4 agentów wzwyz** orkiestrator staje sie niezbedny. Przy 2-3 agentach mozna jeszcze zarzadzac komunikacja recznie (np. w prostym lancuchu: Researcher -> Builder -> QA). Ale gdy agentów jest wiecej -- gdy pojawiaja sie rozgalezienia, równoleglosc, bramy jakosci -- bez centralnego punktu decyzyjnego system szybko wymyka sie spod kontroli.

> **Czy wiesz, ze...?** W referencyjnej architekturze Gold Standard 2026 orkiestrator zarzadza **14 agentami w 4 fazach** -- od fazy badawczej, przez budowe, az po audyt jakosci. A w konfiguracji Deep Research Belt moze koordynowac nawet **17 specjalistów** jednoczesnie.

---

## 2. Kluczowe Obowiazki Orkiestratora

Orkiestrator ma pieciu glównych obszarów odpowiedzialnosci. Kazdy z nich jest krytyczny -- pominiecie któregokolwiek prowadzi do awarii calego systemu.

### 2.1. Dekompozycja zadan (Task Decomposition)

Gdy uzytkownik mówi "zbuduj mi aplikacje SaaS do zarzadzania fakturami", orkiestrator nie przekazuje tego polecenia dalej. Zamiast tego **rozbija je na podzadania**: analiza wymagan, research technologiczny, projektowanie UX, implementacja backendu, implementacja frontendu, integracja, testy bezpieczenstwa, testy jakosci. Kazde podzadanie jest na tyle male, ze jeden agent moze je wykonac samodzielnie.

Kluczowa zasada: kazde podzadanie powinno byc realizowalne przez **jednego agenta**, z jasno okreslonym wejsciem i wyjsciem. Zlozonosc mierzy sie w kategoriach S/M/L/XL -- nie w czasie, lecz w stopniu trudnosci.

### 2.2. Delegowanie do agentów (Agent Delegation)

Orkiestrator wie, który agent jest najlepszy do danego zadania. Researcher Tech dostaje zapytania o dokumentacje i benchmarki. Koder dostaje specyfikacje do implementacji. QA Security dostaje kod do audytu. Co wazne -- kazdy agent dostaje **TYLKO swój kontekst** (zasada Narrow Context Principle). Koder nie musi wiedziec, dlaczego wybrano akurat taka palete kolorów. Designer nie musi rozumiec logiki backendowej.

To jest **potrójna wygrana**: mniej halucynacji (bo agent nie jest rozpraszany nieistotna informacja), nizszy koszt tokenowy (mniej danych = mniej tokenów), mniejsze szkody w razie kompromitacji (agent nie ma dostepu do tego, czego nie potrzebuje).

### 2.3. Kontrola bram (Gate Control -- GO/NO-GO)

Pomiedzy fazami pracy orkiestrator podejmuje decyzje GO/NO-GO. Czy wyniki researchu sa wystarczajaco dobre, zeby przejsc do fazy budowy? Czy kod przeszedl audyt bezpieczenstwa? Czy jakosc dokumentacji spelnia standardy? Te bramy zapobiegaja propagacji bledów miedzy fazami -- jesli research jest slaby, lepiej go powtórzyc niz budowac na wadliwych fundamentach.

### 2.4. Synteza wyników (Result Synthesis)

Gdy wszystkie agenty wykonaja swoja prace, orkiestrator **laczy wyniki w spójny output**. Ale to nie jest proste "sklej wszystko razem". Orkiestrator musi sprawdzic, czy czesci do siebie pasuja, czy nie ma sprzecznosci, czy calosciowy efekt spelnia oczekiwania uzytkownika.

### 2.5. Rozwiazywanie konfliktów (Conflict Resolution)

Co zrobic, gdy Researcher Tech rekomenduje React, a Researcher UX mówi, ze lepszy bedzie HTMX? Orkiestrator podejmuje ostateczna decyzje na podstawie kontekstu projektu, priorytetów i ograniczen. Syntetyk (agent pomocniczy) flaguje sprzecznosci -- ale to orkiestrator je rozstrzyga.

> **Uwaga!** Orkiestrator NIE moze delegowac rozwiazywania konfliktów do innego agenta. To jest jego wylaczna odpowiedzialnosc -- tak jak sedzia na boisku nie moze poprosic kibica o podjecie decyzji.

---

## 3. Czego Orkiestrator NIE robi

Ta sekcja jest równie wazna jak poprzednia -- moze nawet wazniejsza. Bo wiekszosc bledów w systemach wieloagentowych wynika nie z tego, ze orkiestrator robi za malo, lecz z tego, ze **robi za duzo**.

Orkiestrator **NIGDY**:

- **Nie generuje kodu.** Nie pisze ani jednej linijki HTML, CSS, Pythona czy czegokolwiek innego. Od tego sa Koderzy.
- **Nie prowadzi researchu.** Nie przeszukuje internetu, nie analizuje dokumentacji, nie czyta forów. Od tego sa Researcherzy.
- **Nie naprawia bugów.** Jesli QA znajduje blad, orkiestrator nie naprawia go sam -- odsyla podzadanie z powrotem do Kodera z informacja, co nalezy poprawic.
- **Nie pisze dokumentacji.** Nie tworzy raportów, nie redaguje tekstów. Od tego jest Redaktor.
- **Nie projektuje interfejsów.** Nie dobiera kolorów, nie rysuje layoutów. Od tego jest Designer.

Dlaczego to takie wazne? Bo jest to wyraz zasady **pojedynczej odpowiedzialnosci** (Single Responsibility Principle). Orkiestrator ma jeden cel: **zarzadzanie systemem**. Gdy zaczyna robic prace merytoryczna, traci perspektywe strategiczna. To tak, jakby dyrygent orkiestry odlozyl batute i zaczal grac na skrzypcach -- moze gra swietnie, ale w tym czasie nikt nie koordynuje reszty zespolu.

W terminologii anty-wzorców (anti-patterns) nazywa sie to **Micro-Manager Anti-Pattern** -- orkiestrator, który sam robi prace zamiast ja delegowac. Efekty sa zawsze takie same: waskie gardlo na orkiestratorze (bo reszta zespolu czeka), spadek jakosci (bo orkiestrator nie jest specjalista w danej dziedzinie), i eksplozja kosztów tokenowych (bo Opus -- model uzywany przez orkiestratora -- jest najdrozszy).

> **Czy wiesz, ze...?** Analogia z marynarki wojennej jest tu trafna: "Kapitan, który sam bierze sie za sprzatanie pokladu, to Kapitan, który traci statek." W architekturze OBSERVATORY jest to jedna z fundamentalnych zasad projektowych.

---

## 4. Model i Koszt -- Dlaczego Orkiestrator Uzywa Opus

Orkiestrator wymaga **najsilniejszego dostepnego modelu AI** -- w ekosystemie Anthropic jest to **Claude Opus**. Dlaczego? Bo decyzje orkiestratora sa strategiczne i wymagaja najwyzszego poziomu rozumowania. Bledna dekompozycja zadania na poczatku propaguje sie przez caly system. Bledne delegowanie marnuje czas i pieniadze. Bledna decyzja GO/NO-GO przepuszcza wadliwy output dalej.

### Koszty modeli Anthropic (stan na 2026):

| Model | Cena Input (za 1M tokenów) | Cena Output (za 1M tokenów) | Zastosowanie |
|-------|---------------------------|----------------------------|--------------|
| **Opus** | $15 | $75 | Orkiestrator, Syntetyk -- decyzje strategiczne |
| **Sonnet** | $3 | $15 | Builderzy (Koder, Frontend, Integrator) -- implementacja |
| **Haiku** | $0.80 | $4 | Researcherzy, QA -- search, analiza, audyty |

### Okno kontekstowe

Opus dysponuje oknem kontekstowym o pojemnosci **200K tokenów** (czyli okolo 150 000 slów, co odpowiada mniej wiecej 500 stronom tekstu). To pozwala orkiestratorowi utrzymac w pamieci calosciowy obraz projektu -- wszystkie podzadania, ich statusy, wyniki i zaleznosci.

> **Uwaga!** Wiekszy kontekst nie oznacza lepszego. Badania pokazuja efekt *Lost in the Middle* -- modele LLM "gubia sie" w dlugich kontekstach. Dlatego nawet orkiestrator powinien stosowac zasade waskego kontekstu i nie ladowac do pamieci informacji, których aktualnie nie potrzebuje.

### Smart Model Routing -- klucz do obnizenia kosztów

W architekturze Gold Standard 2026 stosuje sie zasade **dynamicznego routingu modeli**:

- **Opus** (~10% wywolan) -- tylko orkiestrator i syntetyk
- **Sonnet** (~30% wywolan) -- builderzy (kod, dokumentacja, integracja)
- **Haiku** (~60% wywolan) -- research i QA

Efekt? **60% wywolan systemu** idzie przez najtanszy model ($0.80/1M tokenów) zamiast najdrozszego ($15/1M tokenów). Daje to **70-90% redukcji kosztów** w porównaniu ze scenariuszem "wszystko na Opus".

Przyklad liczbowy: typowa sesja orkiestracji (14 agentów, sredni projekt) kosztuje okolo **$6-10** z model routingiem. Ten sam projekt na samym Opus kosztowaby **$25-40**. Róznica jest dramatyczna przy skali -- firmy przetwarzajace setki zadan dziennie oszczedzaja tysiace dolarów miesiecznie.

Wedlug raportu IDC, **70% czolowych przedsiebiorstw** bedzie stosowac dynamiczny routing modeli do 2028 roku.

> **Czy wiesz, ze...?** W modelu cenowym Anthropic rozrózniane sa tokeny wejsciowe (input) i wyjsciowe (output). Orkiestrator zuzywa stosunkowo duzo tokenów wejsciowych (bo musi czytac raporty od agentów), ale malo wyjsciowych (bo generuje glównie krótkie decyzje i delegacje). Dlatego jego koszt tokenowy jest nizszy, niz mogloby sie wydawac.

---

## 5. Narzedzia Orkiestratora

Narzedzia, które orkiestrator ma do dyspozycji, sa celowo **ograniczone**. To nie jest wada -- to jest fundamentalna decyzja projektowa. Narzedzia orkiestratora sa dobrane tak, aby mogl **zarzadzac**, a nie **wykonywac prace**.

### Narzedzia DOZWOLONE:

| Narzedzie | Co robi | Dlaczego orkiestrator to ma |
|-----------|---------|----------------------------|
| **Agent** (subagent) | Uruchamia wyspecjalizowanego agenta z wlasnym kontekstem | Jedyny sposób na delegowanie pracy -- to KLUCZOWE narzedzie orkiestratora |
| **TaskCreate / TaskUpdate** | Tworzy i aktualizuje zadania w systemie | Zarzadzanie postepem prac, śledzenie statusów |
| **Read** | Czyta pliki (glównie MANIFEST.md) | Odczytywanie statusów, raportów, planów -- MANIFEST.md sluzy jako wspólna tablica komunikacyjna |

### Narzedzia ZAKAZANE:

| Narzedzie | Co robi | Dlaczego orkiestrator tego NIE MA |
|-----------|---------|----------------------------------|
| **Bash** (terminal) | Uruchamia komendy systemowe | Uruchamianie komend = wykonywanie pracy, nie zarzadzanie |
| **Write** | Zapisuje pliki | Pisanie plików = generowanie tresci, nie zarzadzanie |
| **Edit** | Edytuje pliki | Edycja plików = modyfikowanie kodu/tresci, nie zarzadzanie |
| **WebSearch** | Przeszukuje internet | Research = praca merytoryczna, nie zarzadzanie |

### Filozofia projektowania narzedzi

Zasada jest prosta: **narzedzia definiuja role**. Jesli dasz orkiestratorowi narzedzie Bash, poczuje pokuse, zeby sam uruchomic testy zamiast delegowac je do agenta QA. Jesli dasz mu narzedzie Write, zacznie sam pisac kod zamiast przekazac to Koderowi. Ograniczenie narzedzi to **mechanizm wymuszajacy dyscypline** -- orkiestrator fizycznie nie moze zrobic pracy merytorycznej, wiec MUSI ja delegowac.

Jest to analogiczne do zasady z zarzadzania: dobry menedzer nie powinien miec dostepu do Jiry z uprawnieniami developera, bo pokusa "szybkiego fixowania" jest zbyt silna.

> **Uwaga!** MANIFEST.md pelni role **wspólnego scratchpada** -- centralnego dokumentu, w którym orkiestrator i syntetyk zapisuja decyzje, statusy i wyniki. Kazdy agent moze go czytac (Read), ale pisac (Write) moze tylko syntetyk -- z kolei syntetyk NIGDY nie podejmuje decyzji, tylko dokumentuje decyzje orkiestratora. To przemyslany podzial odpowiedzialnosci.

---

## 6. Workflow Orkiestracji -- Krok po Kroku

Przyjrzyjmy sie, jak orkiestrator prowadzi system przez kompletny cykl pracy. Uzyje konkretnego przykladu: uzytkownik prosi o "stworzenie interaktywnej strony edukacyjnej o architekturze agentów AI".

### Krok 1: Przyjmij zadanie od uzytkownika

Orkiestrator otrzymuje polecenie: *"Zbuduj interaktywna strone HTML z diagramami, quizami i systemem drag-and-drop o architekturze agentów AI."*

Na tym etapie orkiestrator jeszcze niczego nie deleguje. Najpierw analizuje.

### Krok 2: Oceń zlozonosc (S/M/L/XL)

Orkiestrator ocenia: interaktywna strona, diagramy, quizy, drag-and-drop, animacje -- to zlozonosc **L** (duza). Nie wystarczy 3 agentów -- potrzeba pelnego zespolu.

### Krok 3: Zdekomponuj na podzadania

Orkiestrator tworzy plan:
1. **Research** -- jakie sa najlepsze praktyki w edukacji interaktywnej? Jakie frameworki? (Researcher Tech + Researcher UX)
2. **Analiza** -- dekomponuj strone na komponenty (Analityk)
3. **Planowanie** -- ustal kolejnosc budowy i zaleznosci (Planer)
4. **Implementacja** -- napisz HTML/CSS/JS (Koder + Designer + Redaktor)
5. **Integracja** -- polacz wszystkie czesci (Integrator)
6. **QA** -- sprawdz bezpieczenstwo i jakosc (QA Security + QA Quality + Manager QA)

### Krok 4: Deleguj do odpowiednich agentów

Orkiestrator uruchamia agentów badawczych **równolegle** (Researcher Tech i Researcher UX pracuja jednoczesnie -- to oszczedza czas). Kazdy dostaje TYLKO swój kontekst:
- Researcher Tech: *"Znajdz best practices dla interaktywnych stron edukacyjnych. Benchmarki, frameworki, przyklady."*
- Researcher UX: *"Znajdz inspiracje designerskie: Dribbble, Behance, Awwwards. Dark mode, animacje, typografia."*

### Krok 5: Monitoruj postep

Orkiestrator sprawdza raporty w MANIFEST.md. Researcher Tech dostarczyl 5 zródel z URL-ami. Researcher UX ma mood board z 8 referencjami. Analityk zdekomponowal strone na 12 komponentów.

### Krok 6: Ocen na bramach (Gate Control)

**Brama 1 (Research -> Build):** Czy research jest wystarczajacy? Czy sa twarde dane? Orkiestrator decyduje: **GO** -- mozna przejsc do budowy.

**Brama 2 (Build -> QA):** Czy kod jest kompletny? Czy designer dostarczyl palete? Orkiestrator decyduje: **NO-GO** -- designer nie dostarczyl specyfikacji typografii. Deleguje dodatkowe podzadanie.

**Brama 3 (QA -> Delivery):** Czy audyt bezpieczenstwa przeszedl? Czy jakosc spelnia standardy? Orkiestrator decyduje: **GO** -- mozna dostarczyc uzytkownikowi.

### Krok 7: Zsyntetyzuj koncowy wynik

Orkiestrator poleca Integratorowi zlaczenie wszystkich elementów, sprawdza spójnosc calosciowa, i dostarcza uzytkownikowi gotowy produkt z podsumowaniem: co zostalo zrobione, jakie decyzje projektowe podjeto i dlaczego.

> **Czy wiesz, ze...?** W architekturze OBSERVATORY caly ten cykl -- od zadania uzytkownika po gotowa strone HTML z animacjami, quizami i diagramami -- zostal wykonany przez system 11 agentów w jednej sesji. Sam orkiestrator odpowiadal za okolo **10% wywolan**, ale to jego decyzje determinowaly jakosc calosciowego efektu.

---

## 7. Wzorce Architektoniczne

Orkiestrator moze pracowac w róznych konfiguracjach architektonicznych. Wybór wzorca zalezy od liczby agentów, zlozonosci zadania i wymagan dotyczacych niezawodnosci.

### 7.1. Hub-and-Spoke (Gwiazda)

To **najpopularniejszy wzorzec** w produkcji. Orkiestrator jest w centrum ("hub"), a specjalisci ("spokes") sa rozmieszczeni dookola. Cala komunikacja przechodzi przez orkiestratora -- agenty nie rozmawiaja ze soba bezposrednio.

- **Najlepszy dla:** 10-30 agentów, customer support, przetwarzanie dokumentów
- **Zalety:** prosta kontrola, centralny punkt decyzyjny, latwe debugowanie
- **Wady:** single point of failure -- jesli orkiestrator padnie, caly system stoi. Waskie gardlo przy 50+ równoczesnych wynikach.

Analogia: klasyczny zespól projektowy, gdzie project manager jest jedynym "lacznikiem" miedzy specjalistami.

### 7.2. Hierarchiczny (Multi-Level)

Rozszerzenie Hub-and-Spoke o dodatkowe warstwy. Orkiestrator glówny deleguje do "sub-orkiestratorów" (np. Team Lead Research, Team Lead Build), którzy z kolei zarzadzaja swoimi zespolami. Uzywany w systemach z **11+ agentami**, gdzie jeden orkiestrator nie jest w stanie efektywnie koordynowac wszystkich.

### 7.3. Deep Research Belt (Pas Badawczy)

Specjalizacja Hub-and-Spoke do zadan badawczych: orkiestrator + do **17 specjalistów** badawczych (Tech, UX, Reddit, GitHub, X/Twitter, Forums, Docs, Critic...) + syntetyk, który laczy wszystkie wyniki. Kazdy researcher szuka w innym zródle, a Research Critic weryfikuje jakosc znalezionych informacji.

W konfiguracji Gold Standard 2026 ten wzorzec obejmuje:
- **Faza Core:** Orkiestrator (Opus) + Syntetyk (Opus)
- **Faza Research:** 6 Researcherów (Haiku) + Critic (Haiku)
- **Faza Build:** Backend + Frontend + Designer + Integrator (Sonnet)
- **Faza QA:** Security + Quality + Manager QA (Haiku)

### Skalowanie: od 3 do 18 agentów

| Rozmiar | Agentów | Wzorzec | Przyklad |
|---------|---------|---------|----------|
| **Mikro** | 2-3 | Lancuch (Chain) | Quick fix: Orkiestrator -> Koder -> QA |
| **Maly** | 4-6 | Hub-and-Spoke | Startup: Orkiestrator + Analityk + 2 Researcherów + Koder |
| **Sredni** | 7-10 | Hub-and-Spoke + Gate | Standard: pelny cykl z bramami miedzy fazami |
| **Duzy** | 11-14 | Hierarchiczny | Gold Standard: 14 agentów w 4 fazach |
| **XL** | 15-18 | Deep Research Belt | Research intensywny: 7+ researcherów |

> **Uwaga!** Po przekroczeniu **11 agentów** zaczynaja sie *diminishing returns* -- wiecej czasu idzie na koordynacje niz na wlasciwa prace. Sweet spot dla wiekszosci zadan to **6-10 agentów**. 14 agentów to konfiguracja zarezerwowana dla naprawde duzych, zlozonych projektów.

---

## 8. Anty-wzorce -- Co Moze Pójsc Nie Tak

Kazdy z ponizszych anty-wzorców pochodzi z **realnych wdrozen**. Wedlug danych z analizy MASTERCLASS, 42% niepowodzen systemów wieloagentowych to bledy specyfikacji, a 37% to breakdown koordynacji.

### ANTI-01: Micro-Manager (Orkiestrator, który sam robi prace)

**Problem:** Orkiestrator zamiast delegowac zadanie do Kodera, sam pisze kod. Zamiast uruchomic Researchera, sam przeszukuje internet.

**Dlaczego to sie dzieje:** Orkiestrator "czuje", ze szybciej bedzie zrobic cos samemu niz wyjasnic to innemu agentowi. Pokusa jest ogromna -- szczególnie gdy ma dostep do narzedzi typu Bash czy Write.

**Konsekwencje:** Waskie gardlo (reszta zespolu czeka), spadek jakosci (Opus jest swietny w rozumowaniu, ale nie jest zoptymalizowany do kodowania -- od tego jest Sonnet), eksplozja kosztów (kazda linia kodu generowana przez Opus kosztuje 5x wiecej niz przez Sonnet).

**Fix:** Usun narzedzia Bash, Write i Edit z konfiguracji orkiestratora. Jesli nie moze fizycznie pisac kodu, nie bedzie probowal.

### ANTI-02: God Agent (Orkiestrator Wszechwiedzacy)

**Problem:** Orkiestrator dostaje pelny kontekst projektu -- caly kod, wszystkie dokumenty, cala historie zmian -- i próbuje wszystko ogarnac jednoczesnie.

**Konsekwencje:** Przekroczenie okna kontekstowego, efekt Lost in the Middle (gubi informacje ze srodka kontekstu), halucynacje.

**Fix:** Narrow Context Principle -- orkiestrator widzi tylko MANIFEST.md (statusy, decyzje) i to, co aktualnie potrzebuje do podjecia konkretnej decyzji.

### ANTI-03: Blind Delegation (Slepe delegowanie)

**Problem:** Orkiestrator deleguje zadanie bez wystarczajacego kontekstu. Mówi Koderowi "napisz backend", nie precyzujac wymagan, technologii, ograniczen.

**Konsekwencje:** Agent generuje cos, ale nie to, co potrzeba. Iteracje poprawkowe zuzywaja tokeny i czas.

**Fix:** Kazda delegacja musi zawierac: jasny cel, oczekiwany format wyjscia, ograniczenia, i kryteria akceptacji.

### ANTI-04: Token Waste (Marnowanie tokenów)

**Problem:** 15 agentów do zadania, które mozna zrobic 3. Over-engineering z ceremonia (planowanie, debaty, bramy) zamiast prostego wykonania.

**Konsekwencje:** Koszt 10x wyzszy niz potrzebny, czas 5x dluzszy.

**Fix:** Zacznij od **3 agentów** i skaluj dopiero, gdy widzisz konkretna potrzebe. Buduj jeden agent end-to-end zanim zaprojektujesz system 14 agentów.

### ANTI-05: Brak bram jakosci (Missing Gates)

**Problem:** Orkiestrator deleguje zadania i automatycznie akceptuje wyniki bez oceny. Brak decyzji GO/NO-GO miedzy fazami.

**Konsekwencje:** Hallucination Cascade -- halucynacja jednego agenta propaguje sie przez system. Agent A wymysla fakt, Agent B buduje na nim analize, Agent C cytuje analize jako "zweryfikowane zródlo".

**Fix:** Obowiazkowa brama jakosci miedzy kazda faza. Orkiestrator (lub dedykowany Critic) sprawdza wyniki zanim przejda dalej. Maksymalnie 3 cykle rewizji -- potem decyzja eskaluje do uzytkownika.

> **Czy wiesz, ze...?** Sycophancy Chain to anty-wzorzec, w którym agenty zgadzaja sie ze soba zamiast kwestionowac: "Swietny pomysl!" powtarzane przez 5 agentów nie oznacza, ze pomysl jest rzeczywiscie swietny. Fix: dodaj agenta Devil's Advocate, którego jedyna rola jest kwestionowanie kazdej decyzji.

---

## 9. Produkcyjne Case Studies

Orkiestracja wieloagentowa to juz nie teoria -- to technologia wdrazana przez najwieksze korporacje swiata. Oto trzy przykladowe wdrozenia z mierzalnymi wynikami.

### McKinsey: $250M przychodu z narzedzi AI

Firma konsultingowa McKinsey wdrozyla wewnetrzny system **Lilli** -- wieloagentowa architekture, która obsluguje **70% konsultantów** firmy. System generuje deliverables, analizuje dane klientów, przygotowuje prezentacje. Efekt: **$250 milionów przychodu rocznie** z narzedzi AI. Kluczowy wskaznik: czas przygotowania raportu konsultingowego skrócony z **3 dni do 4 godzin** -- redukcja o 94%.

Co sprawilo, ze orkiestrator McKinsey byl skuteczny? Przede wszystkim -- precyzyjna dekompozycja zadan konsultingowych na standardowe podzadania (analiza danych, benchmark branzy, synteza rekomendacji, formatowanie prezentacji) z jasno zdefiniowanymi bramami jakosci miedzy kazdym etapem.

### Uber: 21 000 godzin inzynierskich zaoszczedzonych

Uber zbudowal platforme agentowa do **code review i migracji mikroserwisów**. Multi-agent pipeline: jeden agent analizuje diff (róznice w kodzie), drugi sprawdza bezpieczenstwo, trzeci sugeruje optymalizacje. Wynik w Q1 2026: **21 000 godzin inzynierskich zaoszczedzonych**. Akceptowalnosc sugestii przez developerów: **87%** -- co oznacza, ze prawie 9 na 10 rekomendacji agentów bylo na tyle dobrych, ze ludzie je przyjmowali bez zmian.

Uber uzywa frameworku **LangGraph** -- jedynego frameworku z natywnym checkpointingiem (mozliwosc przywrócenia stanu po awarii) i wbudowanym Human-in-the-Loop. To klucz do niezawodnosci: jesli agent QA padnie w polowie audytu, system wraca do ostatniego checkpointu zamiast zaczynac od zera.

### Danfoss: $15M oszczednosci na energii i serwisie

Duński producent systemów HVAC (ogrzewanie, wentylacja, klimatyzacja) wdrozyl multi-agent system do **predykcji awarii i optymalizacji energii** w ponad 200 budynkach. Architektura trzech agentów: Agent-Analityk czyta dane z czujników IoT, Agent-Predyktor prognozuje awarie **72 godziny wczesniej**, Agent-Optymalizator dostosowuje parametry systemów HVAC w czasie rzeczywistym.

Wynik: **$15 milionów oszczednosci rocznie** na energii i serwisie, plus **redukcja awarii o 34%**. To dokladnie taki przypadek, gdzie orkiestracja wieloagentowa daje przewage nad pojedynczym modelem -- bo zadanie wymaga jednoczesnie analizy danych, predykcji i optymalizacji, a kazda z tych kompetencji wymaga innego podejscia.

> **Czy wiesz, ze...?** Wedlug Gartnera, do 2028 roku **33% oprogramowania enterprise** bedzie w jakims stopniu generowane przez agentów AI. Do 2030 roku odsetek ten ma wzrosnac do **75%**. Orkiestracja wieloagentowa to nie "ciekawy eksperyment" -- to nadchodzacy standard branzy.

---

## 10. Orkiestrator vs Menedzer Projektu -- Porównanie

Porównanie orkiestratora AI z ludzkim Project Managerem pomaga zrozumiec zarówno mozliwosci, jak i ograniczenia tej technologii.

### Tabela porównawcza

| Aspekt | Orkiestrator AI | Menedzer Projektu (czlowiek) |
|--------|----------------|------------------------------|
| **Szybkosc decyzji** | Milisekundy | Minuty do godzin |
| **Dostepnosc** | 24/7, bez przerw | 8-10h dziennie, urlopy, choroba |
| **Skalowanie** | Moze prowadzic 100 projektów jednoczesnie | Realistycznie 3-5 projektów |
| **Empatia** | Zero -- nie rozumie emocji zespolu | Kluczowa kompetencja |
| **Kreatywnosc** | Ograniczona do znanych wzorców | Moze wymyslac calkowicie nowe podejscia |
| **Polityka organizacyjna** | Nie rozumie | Nawiguje miedzy interesariuszami |
| **Koszt** | $6-10 za sesje (~$200-300/miesiac przy intensywnym uzyciu) | $80 000-150 000 rocznie |
| **Powtarzalnosc** | Identyczna jakosc w setym jak w pierwszym zadaniu | Zmeczenie, bad days, turnover |
| **Kontekst historyczny** | Ograniczony do okna kontekstowego (200K tokenów) | Dekady doswiadczenia branzy |
| **Adaptacja do nowych sytuacji** | Wymaga aktualizacji promptu / przeuczenia | Uczy sie w locie |
| **Zarzadzanie ryzykiem** | Wedlug zdefiniowanych regul | Intuicja + doswiadczenie |

### Gdzie AI orkiestrator wygrywa

- **Powtarzalne, ustrukturyzowane zadania** -- przetwarzanie setek dokumentów, code review, migracje. AI nie traci koncentracji w tysięcznym powtórzeniu.
- **Szybkosc reakcji** -- decyzje podejmowane w milisekundach, nie w godzinach. Przy 500 taskach dziennie czlowiek jest waskim gardlem.
- **Bezstronnnosc** -- nie faworyzuje "swoich ludzi", nie ma preferencji politycznych w firmie.

### Gdzie ludzki PM wygrywa

- **Nowe, nieokreslone sytuacje** -- gdy zadanie nie pasuje do zadnego wzorca, czlowiek potrafi improwizowac. AI orkiestrator powtórzy znane strategie.
- **Relacje i motywacja** -- ludzki zespól potrzebuje uznania, feedbacku, poczucia sensu. AI nie potrafi tego zapewnic.
- **Etyka i odpowiedzialnosc** -- gdy cos pójdzie nie tak, czlowiek bierze odpowiedzialnosc. AI orkiestrator nie ma pojecia o konsekwencjach biznesowych swoich decyzji.

Realistyczny model 2026: **AI orkiestrator jako asystent ludzkiego PM**, nie jego zastepstwo. PM podejmuje decyzje strategiczne i zarzadza interesariuszami, a AI orkiestrator automatyzuje rutynowa koordynacje zadan.

---

## 11. Najlepsze Praktyki 2025-2026

### Rekomendacje Anthropic

Anthropic, twórca modeli Claude, publikuje regularnie wytyczne dotyczace projektowania systemów wieloagentowych. Kluczowe zasady:

1. **Narrow Context Principle** -- kazdy agent (wlacznie z orkiestratorem) dostaje TYLKO kontekst niezbedny do wykonania swojego zadania. Mniej danych = mniej halucynacji = nizszy koszt.

2. **MANIFEST.md jako Single Source of Truth** -- centralny dokument, w którym zapisane sa wszystkie decyzje, statusy i wyniki. Agenty nie komunikuja sie bezposrednio -- komunikuja sie przez MANIFEST.

3. **Maksymalizuj równoleglosc** -- jesli dwa zadania nie maja miedzy soba zaleznosci, powinny byc wykonywane równolegle. Planowanie sekwencyjne "bo latwiej" marnuje 40-60% potencjalu systemu.

4. **Maksymalnie 10 kroków sekwencyjnych** -- jesli workflow wymaga wiecej niz 10 kroków jeden po drugim, trzeba go przeprojektowac (dodac równoleglosc lub zredukowac zlozonosc).

5. **Eskaluj krytyczne decyzje do uzytkownika** -- orkiestrator nie powinien podejmowac decyzji o duzym wplywie biznesowym bez konsultacji z czlowiekiem (Human-in-the-Loop).

### Wskazówki z praktyki (Community Best Practices)

- **Zacznij od 3 agentów, nie od 14.** Zbuduj dzialajacy prototyp z minimalnym zespolem, przetestuj go, i dopiero potem skaluj.
- **Definiuj bramy PRZED rozpoczeciem pracy.** Kryteria GO/NO-GO powinny byc jasne zanim pierwszy agent zacznie pracowac.
- **Uzyj Devil's Advocate.** Agent, którego jedynym zadaniem jest kwestionowanie decyzji, zapobiega groupthink i sycophancy chain.
- **Mierz, nie zgaduj.** Metryki produkcyjne: latency P50/P95/P99, koszt za run ($X), SLA (99.5% uptime), akceptowalnosc wyników przez uzytkowników.
- **Buduj jeden agent end-to-end** zanim zaprojektujesz zlozony system. Zrozumienie, jak dziala pojedynczy agent, jest konieczne do zrozumienia, jak dziala zespól.

### Prompt Engineering dla Orkiestratora

Oto wzorzec systemowego promptu dla orkiestratora, stosowany w Gold Standard 2026:

```
Jestes Master Orkiestratorem. NIE generujesz tresci -- ZARZADZASZ SYSTEMEM.

OBOWIAZKI:
1. Dekompozycja zadania na podzadania
2. Delegowanie do agentów
3. Kontrola gate'ów miedzy fazami
4. Synteza wyników, rozwiazywanie konfliktów
5. Decyzje GO/NO-GO

ZASADY:
- Kazdy agent dostaje TYLKO swój kontekst
- MANIFEST.md jako shared scratchpad
- Max 10 kroków sekwencyjnych
- Eskaluj krytyczne decyzje do uzytkownika
```

Zwróc uwage, ze prompt jest **krótki i kategoryczny**. Nie tlumaczy orkiestratorowi jak kodowac, jak szukac informacji, jak pisac -- bo orkiestrator tego NIE ROBI. Prompt mówi TYLKO o zarzadzaniu.

> **Uwaga!** Czesty blad: pisanie dlugich, opisowych promptów dla orkiestratora. Im dluzszy prompt, tym wieksze ryzyko, ze model "zgubi" kluczowe instrukcje w szumie. Prompt orkiestratora powinien byc jak rozkaz wojskowy -- krótki, jednoznaczny, nie pozostawiajacy miejsca na interpretacje.

---

## 12. Podsumowanie i Kluczowe Wnioski

### 10 Najwazniejszych Wniosków

1. **Orkiestrator to menedzer, nie wykonawca.** Nigdy nie generuje kodu, nie prowadzi researchu, nie pisze dokumentacji. Jego jedyna praca to koordynacja.

2. **Od 4 agentów wzwyz orkiestrator jest niezbedny.** Przy mniejszych zespolach mozna sobie poradzic bez niego, ale przy wiekszych -- system bez centralnej koordynacji szybko sie rozpada.

3. **Uzywaj najsilniejszego modelu (Opus) dla orkiestratora.** Decyzje strategiczne wymagaja najwyzszego poziomu rozumowania. Oszczednosci rób na workerach (Haiku, Sonnet), nie na orkiestratorze.

4. **Smart Model Routing daje 70-90% redukcji kosztów.** Opus dla orkiestratora (~10% wywolan), Sonnet dla builderów (~30%), Haiku dla researchu i QA (~60%).

5. **Narzedzia definiuja role.** Jesli dasz orkiestratorowi narzedzie Write, zacznie pisac. Jesli mu je zabierzesz -- MUSI delegowac. To kluczowy mechanizm kontrolny.

6. **Bramy jakosci (GO/NO-GO) sa obowiazkowe.** Bez nich bledy propaguja sie miedzy fazami -- szczególnie halucynacje (Hallucination Cascade).

7. **Hub-and-Spoke to najpopularniejszy wzorzec.** Prosty, czytelny, latwy do debugowania. Uzywaj go jako domyslny, chyba ze masz konkretny powód, zeby go zmienic.

8. **Sweet spot to 6-10 agentów.** Ponizej -- zbyt malo specjalizacji. Powyzej 11 -- diminishing returns z koordynacji.

9. **Narrow Context Principle to najwazniejsza zasada.** Kazdy agent dostaje TYLKO to, czego potrzebuje. Mniej kontekstu = mniej halucynacji = nizszy koszt = lepsze wyniki.

10. **Zacznij od 3, skaluj gdy potrzebujesz.** Nie projektuj systemu 14 agentów na poczatku. Zbuduj dzialajacy prototyp z 3 agentami i rozszerzaj go organicznie.

### Karta Szybkiego Referencji

```
ORKIESTRATOR -- Quick Reference Card

Model:       Claude Opus ($15/$75 za 1M tokenów)
Kontekst:    200K tokenów (max 1M)
Narzedzia:   Agent, TaskCreate/Update, Read
ZAKAZANE:    Bash, Write, Edit, WebSearch
Wzorzec:     Hub-and-Spoke (domyslny)
Sweet spot:  6-10 agentów
Max:         10 kroków sekwencyjnych
Komunikacja: Przez MANIFEST.md (shared scratchpad)
Bramy:       GO/NO-GO miedzy kazdą fazą
Koszt sesji: $6-10 (z model routingiem)
```

### Dalsze Materialy

- **Gold Standard 2026** -- referencyjny template 14 agentów w 4 fazach
- **MASTERCLASS: Zespoly Agentów AI 2026** -- kompletny przewodnik wizualny z 9 anty-wzorcami, kalkulatorem kosztów, i interaktywnymi diagramami
- **Agent Teams Configurator v8/v9** -- narzedzie do wizualnego projektowania architektur wieloagentowych z 27 presetami
- **OBSERVATORY Architecture** -- case study systemu, który sam siebie zbudowal przy uzyciu orkiestracji wieloagentowej
- **Five Minds Protocol** -- innowacyjny wzorzec z 4 ekspertami debatujacymi (wlacznie z Devil's Advocate)

---

*Dokument opracowany na podstawie architektury Gold Standard 2026, analizy MASTERCLASS Agent Teams, case studies OBSERVATORY i Agent Teams Configurator v8/v9. Dane kosztowe i cenowe aktualne na kwiecien 2026.*

---

# PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

```
Stworz profesjonalna prezentacje wideo (7-8 slajdow, laczny czas ~4-5 minut) o roli ORKIESTRATORA (A-00) -- centralnego agenta zarzadzajacego w architekturze wieloagentowej Gold Standard 2026.

MOTYW WIZUALNY I KOLORYSTYKA:
- Kolor glowny: Deep Purple (#7C3AED) -- dominujacy na kazdym slajdzie
- Tlo: ciemny granat/quasi-czern (#0F172A) z subtelnymi mesh-gradient przejsciami w odcieniach fioletu
- Kolor akcentowy: zloty/amber (#F59E0B) -- uzywany na kluczowe liczby, ikony, podkreslenia
- Tekst: bialy (#FFFFFF) na ciemnym tle, z cienkim fioletowym glow na naglowkach
- Motywy graficzne przewodnie: batuta dyrygenta, ekran radarowy z pulsujacymi punktami, schemat Hub-and-Spoke
- Styl: premium-tech, ciemny, kinowy -- jak interfejs NASA mission control zmixowany z nowoczesnym dashboardem AI

HOOK OTWIERAJACY (slajd 1, 0:00-0:30):
- Tytul animowany litera po literze: "Co sie stanie, gdy 14 agentow AI zacznie dzialac bez koordynacji?"
- Tlo: animacja chaosu -- 14 ikon agentow poruszajacych sie losowo, zderzajacych sie, migajacych na czerwono
- Po 3 sekundach -- fioletowy puls z centrum, agenty ustawiaja sie w formacje Hub-and-Spoke
- Napis pojawia sie z fade-in: "ORKIESTRATOR -- Centralny Agent Zarzadzajacy"
- Podtytul: "Architektura Gold Standard 2026 | Model: Claude Opus"

SLAJD 2 -- TRZY ANALOGIE (0:30-1:10):
- Tytul: "Kim jest Orkiestrator?"
- Trzy kolumny z animowanymi ikonami (kazda pojawia sie sekwencyjnie z lekkim bounce):
  (1) Kierownik Projektu -- ikona: Gantt chart, opis: "Dekomponuje zadanie, przydziela ludziom, pilnuje terminow"
  (2) Dyrygent Orkiestry -- ikona: batuta z fioletowym swiatlem, opis: "Nie gra na zadnym instrumencie, ale bez niego orkiestra to kakofonia"
  (3) Kontroler Ruchu Lotniczego -- ikona: radar z pulsem, opis: "Widzi caly obraz, koordynuje ladowania i starty, zapobiega kolizjom"
- Na dole: zloty pasek z napisem: "Zasada: ZARZADZA systemem, NIGDY nie wykonuje pracy"

SLAJD 3 -- 5 KLUCZOWYCH OBOWIAZKOW (1:10-1:55):
- Tytul: "5 Obowiazkow Orkiestratora"
- Pionowa os czasu (timeline) po lewej stronie z fioletowymi kropkami i zlotymi liniami laczacymi:
  1. Task Decomposition -- "Rozbija duze zadanie na podzadania S/M/L/XL"
  2. Agent Delegation -- "Wie, ktory agent jest najlepszy; kazdy dostaje TYLKO swoj kontekst"
  3. Gate Control GO/NO-GO -- "Bramy jakosci miedzy fazami; blokuje wadliwy output"
  4. Result Synthesis -- "Laczy wyniki w spojny output; sprawdza sprzecznosci"
  5. Conflict Resolution -- "Rozstrzyga spory miedzy agentami; decyzja ostateczna"
- Kazdy punkt pojawia sie z animacja slide-in od lewej, z fioletowym pulsem na kropce

SLAJD 4 -- CZEGO NIGDY NIE ROBI (1:55-2:35):
- Tytul: "Single Responsibility Principle" z czerwonym znakiem STOP
- 5 rzedow z ikonami przekreslonymi na czerwono (X) i opisami:
  X Nie generuje kodu -- "Od tego sa Koderzy (Sonnet)"
  X Nie prowadzi researchu -- "Od tego sa Researcherzy (Haiku)"
  X Nie naprawia bugow -- "Odsyla do Kodera z informacja co poprawic"
  X Nie pisze dokumentacji -- "Od tego jest Redaktor"
  X Nie projektuje UI -- "Od tego jest Designer"
- Na dole: cytat w ramce: "Kapitan, ktory sam sprząta poklad, to Kapitan, ktory traci statek."
- Animacja: kazdy X pojawia sie z efektem "stamp" (pieczatki) i delikatnym trzesnieniem ekranu

SLAJD 5 -- HUB-AND-SPOKE + MODEL ROUTING (2:35-3:20):
- Tytul: "Architektura i Koszty"
- Lewa polowa: animowany diagram Hub-and-Spoke -- Orkiestrator (fioletowa gwiazda) w centrum, 14 agentow jako mniejsze wezly dookola w 4 kolorowych pierścieniach (Core=fiolet, Research=zielony, Build=niebieski, QA=pomaranczowy)
- Prawa polowa: tabela kosztow z animowanymi paskami procentowymi:
  Opus ($15/$75): 10% wywolan -- fioletowy pasek
  Sonnet ($3/$15): 30% wywolan -- niebieski pasek
  Haiku ($0.80/$4): 60% wywolan -- zielony pasek
- Na dole: duzy zloty napis z efektem glow: "70-90% redukcji kosztow dzieki Smart Model Routing"
- Animacja: diagram Hub-and-Spoke buduje sie od centrum na zewnatrz, paski rosna od zera

SLAJD 6 -- NARZEDZIA + ANTY-WZORCE (3:20-4:00):
- Podzielony na dwie czesci:
- LEWA: "Narzedzia" -- zielone checkmarki: Agent, TaskCreate/Update, Read | czerwone X: Bash, Write, Edit, WebSearch
  Podpis: "Narzedzia definiuja role -- jesli nie moze pisac kodu, MUSI delegowac"
- PRAWA: "3 Smiertelne Anty-wzorce" z ikonami czaszek:
  (1) Micro-Manager -- "Sam robi prace zamiast delegowac" -- ikona: rece trzymajace zbyt wiele pilek
  (2) Hallucination Cascade -- "Halucynacja agenta A propaguje sie przez B, C, D..." -- ikona: efekt domina
  (3) Context Overload -- "God Agent widzi wszystko, rozumie nic" -- ikona: eksplodujacy mozg
- Animacja: kazdy anty-wzorzec pojawia sie z efektem "warning flash" (zolte pulsowanie)

SLAJD 7 -- CASE STUDIES + METRYKI (4:00-4:30):
- Tytul: "Orkiestracja w Produkcji -- Twarde Dane"
- Trzy karty (card layout) z logo firm i kluczowymi metrykami:
  McKinsey Lilli: "$250M przychodu/rok, 70% konsultantow, raport: 3 dni -> 4h (-94%)"
  Uber Code Review: "21 000h zaoszczedzonych, 87% akceptowalnosc sugestii"
  Danfoss HVAC: "$15M oszczednosci/rok, predykcja awarii 72h wczesniej, -34% awarii"
- Na dole: pasek z prognoza Gartnera: "Do 2028: 33% oprogramowania enterprise generowane przez agentow AI"
- Animacja: karty wlatuja od dolu jedna po drugiej z efektem parallax

SLAJD 8 -- PODSUMOWANIE + CTA (4:30-5:00):
- Tytul: "Quick Reference Card" -- stylizowana na terminal/konsole
- Karta referencyjna w stylu code block na ciemnym tle:
  Model: Claude Opus | Kontekst: 200K | Koszt: $6-10/sesja
  Narzedzia: Agent, TaskCreate/Update, Read
  Wzorzec: Hub-and-Spoke | Sweet spot: 6-10 agentow
  Komunikacja: MANIFEST.md | Bramy: GO/NO-GO miedzy fazami
- CTA na koncu: "Orkiestrator to 10% wywolan, ale 100% decyzji. Projektuj odpowiedzialnie."
- Logo Gold Standard 2026 z fioletowym glow i efektem fade-out

ANIMACJE I PRZEJSCIA:
- Przejscia miedzy slajdami: morph transition z fioletowym blur
- Tekst: pojawia sie z typewriter effect lub fade-in (nigdy nagle)
- Ikony: bounce-in lub scale-up z ease-out
- Liczby/metryki: count-up animation (od 0 do wartosci docelowej)
- Tlo: subtelny ruch mesh-gradient (oddychajacy efekt, bardzo powolny)
- Particle effects: male swietliste czasteczki unoszace sie w tle na kazdym slajdzie

MUZYKA/DZWIEK:
- Ambient tech soundtrack -- spokojny, budujacy napięcie, bez vokalu
- Subtelne efekty dzwiekowe przy pojawianiu sie kluczowych elementow (soft whoosh, gentle click)
```

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Stworz pionowa infografike edukacyjna (1080x3200px) o ORKIESTRATORZE (A-00) -- centralnym agencie zarzadzajacym w architekturze wieloagentowej Gold Standard 2026.

FORMAT I WYMIARY:
- Szerokosc: 1080px (optymalna na mobile i social media)
- Wysokosc: ~3200px (dlugi scroll, pionowy uklad)
- Format: PNG lub SVG z pelna rozdzielczoscia
- Styl: premium editorial infographic, czytelna typografia, fioletowa paleta

PALETA KOLOROW:
- Glowny: Deep Purple (#7C3AED) -- naglowki, kluczowe elementy, linie laczace sekcje
- Tlo glowne: bialy (#FFFFFF) lub bardzo jasny fiolet (#F5F3FF) -- dla czytelnosci
- Tlo sekcji alternatywnych: jasny lavender (#EDE9FE) -- co druga sekcja dla wizualnego rytmu
- Akcent: zloty/amber (#F59E0B) -- kluczowe liczby, ikony ostrzezenia, CTA
- Tekst glowny: ciemny granat (#1E1B4B) -- doskonaly kontrast na jasnym tle
- Tekst drugorzedny: sredni fiolet (#6D28D9) -- podtytuly, etykiety
- Sukces/dozwolone: zielony (#10B981) -- checkmarki, pozytywne elementy
- Blad/zakazane: czerwony (#EF4444) -- ikony X, ostrzezenia, anty-wzorce
- Linie i separatory: fioletowy gradient od #7C3AED do #A78BFA

SEKCJA 1 -- HEADER (0-280px):
- Duzy naglowek: "ORKIESTRATOR" (font: bold, 48-56px, kolor: Deep Purple)
- Podtytul: "Centralny Agent Zarzadzajacy | A-00 | Warstwa CORE" (font: medium, 18px, kolor: sredni fiolet)
- Ikona: stylizowana batuta dyrygenta lub symbol Hub-and-Spoke w fioletowym kole z subtelnym cieniem
- Badge: "Gold Standard 2026" w zlotej ramce z zaokraglonymi rogami
- Krotki opis (2 linie): "Zarzadza systemem wieloagentowym AI. Koordynuje 6-14 specjalistow. Nigdy nie wykonuje pracy merytorycznej."
- Delikatna linia separatora: gradient fioletowy, 2px

SEKCJA 2 -- TRZY ANALOGIE (280-580px):
- Tytul sekcji: "Kim jest Orkiestrator?" z fioletowa linia pod spodem
- Trzy kolumny (po ~330px kazdej) z ikonami u gory:
  Kolumna 1: ikona Gantt chartu
    Naglowek: "Kierownik Projektu"
    Opis: "Dekomponuje duze zadanie na mniejsze czesci, przydziela odpowiednim ludziom, pilnuje terminow i jakosci"
  Kolumna 2: ikona batuty dyrygenta
    Naglowek: "Dyrygent Orkiestry"
    Opis: "Nie gra na zadnym instrumencie, ale decyduje kto gra kiedy, jak glosno i w jakim tempie"
  Kolumna 3: ikona radaru z pulsem
    Naglowek: "Kontroler Ruchu Lotniczego"
    Opis: "Widzi caly obraz na radarze, koordynuje ladowania i starty, zapobiega kolizjom"
- Kazda kolumna ma lekki cien (box-shadow) i zaokraglone rogi

SEKCJA 3 -- 5 OBOWIAZKOW (580-1080px):
- Tytul: "5 Kluczowych Obowiazkow" z numerem "5" w duzym zlotym kole
- Pionowa timeline po lewej stronie z fioletowymi kropkami (dokladnie 5) polaczonymi linia:
  1. "Dekompozycja Zadan" -- ikona nozyczek/puzzle -- "Rozbija zadanie na podzadania S/M/L/XL przypisywalne jednemu agentowi"
  2. "Delegowanie do Agentow" -- ikona strzalek rozchodzacych sie -- "Przydziela podzadania specjalistom; kazdy dostaje TYLKO swoj kontekst (Narrow Context)"
  3. "Kontrola Bram GO/NO-GO" -- ikona sygnalizatora -- "Decyduje czy wyniki fazy sa wystarczajace by przejsc dalej; blokuje wadliwy output"
  4. "Synteza Wynikow" -- ikona puzzle skladajacego sie w calosc -- "Laczy rezultaty agentow w spojny output; wykrywa sprzecznosci"
  5. "Rozwiazywanie Konfliktow" -- ikona wagi/miotka sedziego -- "Rozstrzyga spory miedzy agentami; decyzja ostateczna i niezasadzalna"
- Kazdy punkt ma fioletowe tlo z zaokraglonymi rogami, bialy tekst na ikonie, ciemny tekst opisu

SEKCJA 4 -- CZEGO NIGDY NIE ROBI (1080-1420px):
- Tytul: "Czego Orkiestrator NIGDY Nie Robi" z czerwona ikona STOP
- Tlo sekcji: bardzo jasny czerwony/rozowy (#FEF2F2) dla kontrastu
- 5 rzedow, kazdy z czerwonym X po lewej:
  X "Nie generuje kodu" -- "Od tego sa Koderzy (Sonnet, $3/$15)"
  X "Nie prowadzi researchu" -- "Od tego sa Researcherzy (Haiku, $0.80/$4)"
  X "Nie naprawia bugow" -- "Odsyla podzadanie do Kodera z informacja co poprawic"
  X "Nie pisze dokumentacji" -- "Od tego jest Redaktor"
  X "Nie projektuje interfejsow" -- "Od tego jest Designer"
- Na dole: ramka z cytatem: "Kapitan, ktory sam sprząta poklad, to Kapitan, ktory traci statek." + etykieta: "Single Responsibility Principle"

SEKCJA 5 -- DIAGRAM HUB-AND-SPOKE (1420-1820px):
- Tytul: "Architektura Hub-and-Spoke" z badge "Najpopularniejszy wzorzec"
- Centralny diagram: Orkiestrator (duzy fioletowy wezel, ~80px) w centrum
- 4 pierscieniowe grupy dookola:
  CORE (fiolet): Syntetyk -- najblizej centrum
  RESEARCH (zielony): 6 Researcherow + Critic -- drugi pierscien
  BUILD (niebieski): Backend, Frontend, Designer, Integrator -- trzeci pierscien
  QA (pomaranczowy): Security, Quality, Manager QA -- czwarty pierscien
- Linie od Orkiestratora do kazdego agenta (fioletowe, cienkie, z gradientem)
- Legenda kolorow w prawym dolnym rogu diagramu
- Pod diagramem: tabela skalowania:
  Mikro (2-3) | Maly (4-6) | Sredni (7-10) | Duzy (11-14) | XL (15-18)
  Z podkreslonym "Sweet spot: 6-10 agentow"

SEKCJA 6 -- BRAMY JAKOSCI (1820-2100px):
- Tytul: "System Bram GO/NO-GO" z ikona traffic light
- Poziomy flowchart (3 bramy):
  [Research] --BRAMA 1--> [Build] --BRAMA 2--> [QA] --BRAMA 3--> [Delivery]
- Kazda brama jako romb decyzyjny z dwoma wyjsciami:
  GO (zielona strzalka w prawo) -- "Wyniki spelniaja kryteria"
  NO-GO (czerwona strzalka w dol) -- "Powrot do poprzedniej fazy, max 3 cykle"
- Pod flowchartem: ostrzezenie w zlotej ramce: "Bez bram: Hallucination Cascade -- halucynacja agenta A propaguje sie przez B, C, D jako 'zweryfikowane zrodlo'"

SEKCJA 7 -- KOSZTY I MODEL ROUTING (2100-2480px):
- Tytul: "Smart Model Routing -- 70-90% Redukcji Kosztow"
- Trzy poziome paski (bar chart) z procentami i kosztami:
  Opus ($15/$75): 10% wywolan -- krotki fioletowy pasek -- "Orkiestrator + Syntetyk"
  Sonnet ($3/$15): 30% wywolan -- sredni niebieski pasek -- "Builderzy (kod, frontend, integracja)"
  Haiku ($0.80/$4): 60% wywolan -- dlugi zielony pasek -- "Research + QA"
- Porownanie w dwoch kolumnach:
  BEZ routingu: "$25-40/sesja" (przekreslone, czerwone)
  Z routingiem: "$6-10/sesja" (zlote, podkreslone)
- Duzy napis: "Oszczednosc: $15-30 na KAZDEJ sesji" ze zlotym tlem

SEKCJA 8 -- ANTY-WZORCE (2480-2800px):
- Tytul: "3 Smiertelne Anty-wzorce" z ikona czaszki
- Tlo sekcji: ciemniejszy lavender (#DDD6FE) dla dramatycznego efektu
- Trzy karty z czerwona obramowka u gory:
  Karta 1 -- "ANTI-01: Micro-Manager"
    Ikona: rece trzymajace 10 pilek naraz
    Problem: "Orkiestrator sam pisze kod zamiast delegowac"
    Fix: "Usun narzedzia Bash, Write, Edit z konfiguracji"
  Karta 2 -- "ANTI-02: Hallucination Cascade"
    Ikona: efekt domina (klocki padajace)
    Problem: "Agent A wymysla fakt, B buduje analize, C cytuje jako zrodlo"
    Fix: "Obowiazkowa brama jakosci + Devil's Advocate"
  Karta 3 -- "ANTI-03: Context Overload"
    Ikona: eksplodujacy mozg / przepelniony kubel
    Problem: "Orkiestrator dostaje pelny kontekst, gubi sie w srodku (Lost in the Middle)"
    Fix: "Narrow Context Principle -- TYLKO MANIFEST.md + aktualny kontekst decyzji"

SEKCJA 9 -- QUICK REFERENCE CARD (2800-3060px):
- Tytul: "Karta Szybkiego Referencji" z ikona karty identyfikacyjnej
- Stylizowana na ciemna karte (tlo #1E1B4B, tekst bialy, fioletowe akcenty):
  Model: Claude Opus ($15/$75) | Kontekst: 200K tokenow
  Narzedzia: Agent, TaskCreate/Update, Read
  ZAKAZANE: Bash, Write, Edit, WebSearch
  Wzorzec: Hub-and-Spoke (domyslny)
  Sweet spot: 6-10 agentow | Max: 10 krokow sekwencyjnych
  Komunikacja: MANIFEST.md (shared scratchpad)
  Bramy: GO/NO-GO miedzy kazda faza
  Koszt sesji: $6-10 (z model routingiem)
- Styl: monospace font, lekki glow na krawedziach karty

SEKCJA 10 -- FOOTER (3060-3200px):
- Cytat koncowy: "Orkiestrator to 10% wywolan, ale 100% decyzji."
- Linia: "Gold Standard 2026 | Multi-Agent AI Architecture"
- Linia: "Agent: Orkiestrator (A-00) | Warstwa: CORE | Model: Claude Opus"
- Male logo/badge systemu, subtelny fioletowy gradient na dole
- Copyright: "Opracowano na podstawie Gold Standard 2026, MASTERCLASS Agent Teams, OBSERVATORY Architecture"

TYPOGRAFIA:
- Naglowki sekcji: bold, 28-32px, Deep Purple (#7C3AED)
- Podtytuly: semibold, 18-20px, sredni fiolet (#6D28D9)
- Tekst glowny: regular, 14-16px, ciemny granat (#1E1B4B)
- Etykiety/badge: medium, 11-13px, uppercase, letter-spacing 1px
- Liczby/metryki: bold, 24-36px, zloty (#F59E0B) lub bialy na ciemnym tle
- Font: nowoczesny sans-serif (Inter, Manrope, lub podobny)

ZASADY OGOLNE:
- Kazda sekcja ma wyrazny separator (fioletowa linia gradientowa, 2px)
- Ikonografia: spojny styl (outlined lub filled, nigdy mieszany) -- Lucide, Phosphor lub Heroicons
- Zachowaj hierarchie wizualna: naglowek > podtytul > tresc > etykieta
- Duzo bialej przestrzeni (white space) miedzy sekcjami -- nie stlaczaj tresci
- Calosc musi byc czytelna na ekranie telefonu (min font 14px dla tresci)
- Dbaj o accessibility: kontrast WCAG AA minimum na wszystkich tekstach
```

---

*Dokument wygenerowany dla systemu Gold Standard 2026 Multi-Agent AI Architecture.*
*Agent: Orkiestrator (A-00) | Warstwa: CORE | Model: Claude Opus*
