# R4: Reddit/fora - realne opinie o subagentach i presetach AI

**Zrodlo researchu:** WebSearch + WebFetch (Hacker News, Reddit-indeksowane wyniki, blogi/dev.to jako kontekst uzupelniajacy tam, gdzie bezposrednie posty na r/ClaudeAI nie byly dostepne przez wyszukiwarke)
**Data researchu:** 2026-08 (kontekst: sierpien 2026)
**Cel:** Zebranie NIEMARKETINGOWYCH opinii praktykow o subagentach/presetach w Claude Code i podobnych narzedziach - co dziala, na co ludzie narzekaja, jakich agentow brakuje, oraz specyficznie: skala problemu "za duzo opcji / decision paralysis" przy duzych kolekcjach presetow.

## Metodologia i ograniczenia

Warto od razu zaznaczyc ograniczenie tego researchu: bezposrednie wyszukiwanie tresci z r/ClaudeAI przez `site:reddit.com` konsekwentnie nie zwracalo indeksowanych postow (prawdopodobnie efekt tego, jak Reddit ogranicza indeksowanie przez wyszukiwarki dla botow/API firm trzecich w 2026). Natomiast **Hacker News** (ktory jest w pelni indeksowany i dostepny przez Algolia API) dostarczyl bogatego materialu z realnymi cytatami, nickami i watkami dyskusyjnymi dokladnie na temat subagentow Claude Code - to glowne zrodlo cytatow w tym raporcie. Uzupelniajaco wykorzystano tresci z dev.to, Substack i blogow praktykow, ktore czesto same cytuja lub parafrazuja dyskusje z Reddita/Discorda, oraz raporty branzowe z 2026 o adopcji agentow AI w firmach (dla szerszego kontekstu "agent overload"). Tam gdzie nie udalo sie potwierdzic dokladnego cytatu z Reddita, jest to jasno oznaczone jako parafraza z wtornego zrodla.

---

## Co dziala (pochwaly praktykow)

### 1. Izolacja kontekstu jako glowna wartosc

Powtarzajacym sie motywem w dyskusjach jest to, ze subagenty rozwiazuja realny, dokuczliwy problem: zaśmiecanie glownego kontekstu rozmowy. Praktycy opisuja to jako mozliwosc "delegowania pracy takiej jak debugowanie, pisanie dokumentacji czy generowanie testow bez przeciazania jednego okna kontekstu" (parafraza z dyskusji technicznych cytowanych w wynikach wyszukiwania, m.in. na Hacker News wokol wprowadzenia subagentow w lipcu 2025). Kluczowy mechanizm: subagent dziala w odizolowanym kontekscie, wykonuje zadanie i zwraca do glownej sesji tylko **podsumowanie**, a nie cala "podroz" (tool calls, iteracje, debugging) - to bezposrednio cytowany opis z materialow o architekturze Claude Code.

### 2. Konkretny use case: code review + security jako osobne persony

Jeden z najczesciej wracajacych, praktycznych wzorcow to trojka: agent piszacy kod, agent-recenzent (reviewer) i agent bezpieczenstwa jako osobne subagenty z wlasnymi promptami systemowymi. To pojawia sie jako "standardowy" workflow w wielu niezaleznych zrodlach, co sugeruje realna, oddolna konwergencje praktykow wokol tego wzorca (a nie tylko marketing Anthropic).

### 3. Rownoleglosc jako realna oszczednosc czasu

Watek na Hacker News "How to use Claude Code subagents to parallelize development" (https://news.ycombinator.com/item?id=45181577) wskazuje, ze glowna wartosc dla wielu uzytkownikow to nie "inteligentniejszy" agent, tylko mozliwosc odpalenia kilku niezaleznych zadan naraz (np. frontend + backend + testy) zamiast sekwencyjnego czekania na jedno wywolanie Claude Code.

### 4. Duze kolekcje open-source jako punkt wejscia

Kolekcja "59 open-source Claude Code subagents" autorstwa uzytkownika **aaronlumsden** (https://news.ycombinator.com/item?id=45072795) zebrala zainteresowanie jako gotowy, produkcyjny zestaw pokrywajacy wiele dziedzin (frontend, backend, DevOps, AI/ML) - jest jezykowo-agnostyczna, "framework-flexible" i wydana na MIT z otwartoscia na kontrybucje. To pokazuje popyt na kuratowane, gotowe-do-uzycia kolekcje zamiast budowania od zera - dokladnie to, co robi kolekcja 37 agentow/44 presetow bedaca kontekstem tego researchu.

---

## Skargi / frustracje

### 1. Brak wyboru modelu w ramach subagenta - najczestsza konkretna skarga techniczna

Na Hacker News (https://news.ycombinator.com/item?id=44693017), uzytkownik **lvl155** formuluje to wprost:

> "Here my main problem with sub-agents WITHIN Claude Code. They don't allow you to use other models. Let's be honest it's 99% Sonnet."

Innymi slowy: subagenty w Claude Code sa uwiazane do ekosystemu Anthropic (glownie Sonnet), co frustruje uzytkownikow chcacych routowac specyficzne zadania do innych modeli (np. o3 do rozumowania matematycznego, Gemini do dlugiego kontekstu). Odpowiadajacy w tym samym watku, **furyofantares**, potwierdza ograniczenie i wspomina Opencode jako alternatywe z szerszym wyborem modeli (choc bez osobistego przetestowania) - dodajac, ze routing przez zewnetrzne narzedzia zwieksza latencje.

**Implikacja dla kolekcji 37 agentow/44 presetow:** to jest argument ZA istniejacym w projekcie "model routing" (Orch Opus / Researchers Sonnet / Extractors Haiku), bo pokazuje, ze uzytkownicy realnie chca kontroli nad tym, ktory model robi co - i frustruje ich brak tej kontroli w wanilii Claude Code.

### 2. Eksplozja liczby subagentow i spalanie budzetu tokenow - najostrzejsza skarga

To najbardziej emocjonalnie naladowany watek znaleziony w researchu, na Hacker News przy poscie o koszcie tokenow subagentow (https://news.ycombinator.com/item?id=48883796):

Autor postu, **mcv**, opisuje kluczowy problem:

> "What really burns tokens is sub agents. I once gave Claude Code a pretty big task, and it immediately launched 7 sub agents which burned through my budget before even one of them was finished."

Zauwaza tez paradoks: to samo zadanie wykonane sekwencyjnie przez glownego agenta (bez subagentow) zmiescilo sie w budzecie.

Jeszcze bardziej drastyczne przypadki w tym samym watku:

> **vinnymac**: "Yesterday I gave Claude Fable a difficult task. It then proceeded to spawn 415 agents."

> **brianwawok**: "asked fable to help me estimate my TAM and it launched 102 agents and blew my $120 quota in 6 minutes."

Uzytkownik **thejazzman** dodaje techniczne wyjasnienie mechanizmu:

> "for subagents to be cheap/effective, you have to specify the size of those subagents; i.e. right now by default 5.6-sol spawns many 5.6-sol subagents."

- czyli domyslnie subagenty dziedzicza "rozmiar"/koszt modelu-rodzica, wiec bez recznej konfiguracji tanszego modelu dla subagentow, orkiestracja szybko staje sie kosztowna.

**qpricjalcbeu** dorzuca kubel zimnej wody na jakosc:

> "And in my experience the sub agent performance is usually worse than just a single agent."

Skutek: **mcv** opisuje praktyczny workaround, ktory sam w sobie jest dowodem frustracji - dopisanie do CLAUDE.md twardej instrukcji zakazujacej spawnowania subagentow:

> "Do NOT spawn sub-agents for any reason...sub-agents make the situation worse, and eat through our token budget way too fast."

Co wiecej, tekst wskazuje, ze "kilku uzytkownikow calkowicie wylacza subagenty przez konfiguracje" - czyli feature, ktory mial byc udogodnieniem, dla czesci praktykow staje sie czyms, co trzeba aktywnie wylaczac.

**Implikacja:** dla kolekcji 37 agentow/44 presetow, to bardzo mocny sygnal, ze **domyslna oszczednosc / male, tanie presety powinny byc default**, a duze wielofazowe preset (np. "Deep Five Minds") powinny miec jasne, widoczne ostrzezenie kosztowe PRZED odpaleniem - co juz czesciowo istnieje w projekcie (routing modeli, flagi --budget), ale ten watek sugeruje, ze nawet to moze nie wystarczyc bez twardego capu na liczbe rownoleglych agentow.

### 3. Watpliwosci terminologiczne - "to nie sa agenci, to prompty"

W tym samym watku o kolekcji 59 subagentow, uzytkownik **NitpickLawyer** kwestionuje samo nazewnictwo:

> "This is a collection of prompts. To call them 'agents' is only adding to that confusion."

Autor kolekcji, **aaronlumsden**, przyznaje racje co do terminologii, ale broni uzycia nazwy "subagents" jako zgodnej z oficjalna dokumentacja Anthropic. To pokazuje szerszy, powtarzajacy sie w spolecznosci spor: wiele "kolekcji agentow" to w praktyce zestawy wyspecjalizowanych promptow/person, a nie autonomiczni agenci w sensie technicznym (z wlasna petla decyzyjna, narzedziami, pamiecia). Dla uzytkownikow oceniajacych kolekcje jak ta z 37 agentami, to realne ryzyko reputacyjne - jesli produkt nazywa cos "agentem", a w praktyce jest to statyczny prompt systemowy, doswiadczeni uzytkownicy to zauwaza i skrytykuja.

### 4. Subagent bywa ignorowany przez glownego agenta

Z syntez wynikow wyszukiwania (Hacker News, watek ogolny o subagentach): "Some users report that agents aren't being used as expected — for example, setting up a code reviewer agent but Claude performing the review itself without using the agent." To praktyczny, powtarzajacy sie problem: skonfigurowanie dedykowanego subagenta (np. do code review) nie gwarantuje, ze glowny model faktycznie go wywola - Claude czasem robi robote sam, ignorujac dostepny subagent, co podwaza sens jego istnienia w danym workflow.

### 5. Subagenty nie wymieniaja miedzy soba informacji

Ograniczenie architektoniczne czesto podnoszone jako frustracja: subagenty "cannot exchange information with each other" - kazdy dostaje kontekst tylko od glownego watku, ale nie widza nawzajem swojej pracy. W zlozonych, wielofazowych pipeline'ach (dokladnie takich jak "Deep Five Minds" czy "swarm-pro" w kolekcji 37 agentow) to wymusza, by orchestrator recznie przekazywal wyniki miedzy fazami - jesli tego nie robi dobrze, subagenty dublują prace lub dzialaja na sprzecznych zalozeniach.

### 6. Brak rekursji / limit rownoleglosci

Techniczne ograniczenie wspomniane w kilku zrodlach: subagenty "cannot spawn their own subagents (no recursion)" i dzialaja przy limicie do ok. 10 wspolbieznych agentow. To nie jest "skarga" per se, ale realne ograniczenie, ktore ludzie budujacy zlozone pipeline'y musza projektowac wokol - i czesto sie o tym dowiaduja dopiero w praniu, co generuje frustracje ("dlaczego moj agent-orkiestrator nie moze delegowac do wnuka-agenta").

---

## Brakujace agenty wedlug community

Bezposrednie wypowiedzi typu "brakuje mi agenta do X" byly trudniejsze do znalezienia w formie czystych cytatow Reddit (ograniczenie indeksowania opisane w metodologii), ale kilka sygnalow wylania sie konsekwentnie z materialow wtornych i trendow wyszukiwania:

1. **Agenci spoza software engineering (pisanie, research osobisty, produktywnosc).** Wielokrotnie w wynikach wyszukiwania pojawiaja sie niezalezne blogi/artykuly opisujace uzytkownikow "hackujacych" Claude Code do celow spoza kodowania - jeden z tytulow wprost brzmi "How I Turned Claude Code Into My Personal AI Agent Operating System for Writing and Research" (aimaker.substack.com). To silny sygnal popytu oddolnego: ludzie *juz* uzywaja narzedzia stworzonego do kodowania jako platformy do pisania i researchu, bo brakuje im natywnego, dedykowanego zestawu agentow do tych zadan. Kolekcja 37 agentow/44 presetow, o ile ma glownie agentow software-engineering (backend, frontend, QA, security), ma tu wyrazna biala plame.

2. **Agent-organizer / multi-agent-coordinator jako "meta" potrzeba.** W jednym z podsumowan wyszukiwania pojawia sie kategoria "Meta & Orchestration agents (like workflow-orchestrator, agent-organizer, multi-agent-coordinator)" jako odrebna, rozpoznawana kategoria w wiekszych kolekcjach agentow (np. wshobson/agents na GitHub). To sugeruje, ze uzytkownicy z duzymi kolekcjami chca **agenta, ktory pomaga wybrac ktorego agenta uzyc** - czyli dokladnie ten problem "decision paralysis" opisany nizej, ktory community juz probuje rozwiazywac wlasnym, oddolnym narzedziem (meta-agentem-routerem).

3. **Product/business-facing agenci.** Wsrod kategorii wymienianych w wiekszych kolekcjach open-source (np. w podsumowaniach dot. wshobson/agents) pojawiaja sie "product-manager", "project-manager", "technical-writer" jako osobne persony - obok czysto technicznych. To pokazuje, ze granica miedzy "agentem dla programisty" a "agentem dla non-dev roli" (PM, tech writer, marketing) sie zaciera, i uzytkownicy oczekuja pokrycia obu.

4. **Agent do zarzadzania budzetem/kosztem tokenow.** Posrednio wynika to z watku o spalaniu 415 agentow i $120 w 6 minut (patrz sekcja Skargi) - kilku komentujacych sugerowalo mechanizmy typu "token budget management" jako brakujacy, wbudowany feature (a nie osobny agent, ale funkcjonalnosc, ktorej community wyraznie chce: twardy cap, ostrzezenie przed odpaleniem, estymacja kosztu z gory).

**Zastrzezenie:** ta sekcja jest najslabiej poparta bezposrednimi cytatami z powodu ograniczen w indeksowaniu Reddita opisanych w metodologii. Rekomendacja: jesli ten temat jest krytyczny dla v33, warto rozwazyc delta-research bezposrednio na Reddit przez API (PRAW) albo reczny przeglad r/ClaudeAI z uzyciem wyszukiwarki wewnetrznej Reddita, bo publiczne wyszukiwarki (Google/Bing przez WebSearch) systematycznie nie zwracaly indeksowanych postow z tego subreddita w trakcie tego researchu.

---

## Decision paralysis / potrzeba kategoryzacji

To jest sekcja najbardziej bezposrednio istotna dla wlasciciela kolekcji 37 agentow/44 presetow, wiec warto podkreslic zarowno mocne, jak i slabe strony znalezionych dowodow.

### Skala problemu w ekosystemie

Krajobraz marketplace'ow Claude Code w sierpniu 2026 jest juz sam w sobie dowodem na problem przeciazenia wyborem - niezaleznie od tego, czy ktokolwiek uzyl frazy "decision paralysis" wprost. Z researchu wynika:

- Jeden marketplace oferuje **92 pluginy, 202 agentow, 181 skilli i 105 komend**.
- Inny reklamuje **150+ wyspecjalizowanych sub-agentow**.
- Kolejna kolekcja zawiera **345 skilli i pluginow, w tym 30+ agentow, 70+ komend i 330+ skilli**.

To sa liczby rzedu wielkosci wieksze niz 37 agentow/44 presety wlasciciela projektu - co jest waznym kontekstem: **kolekcja 37/44 nie jest nawet szczegolnie duza** na tle rynku, ale rynek jako calosc juz generuje przeciazenie.

### Bezposredni cytat o mentalnym obciazeniu terminologia

Jeden z praktykow, cytowany w kontekscie omawiania roznicy miedzy pluginami a marketplace'ami, mowi wprost:

> "I find the language and mental model for plug-ins and marketplaces to be extremely confusing... But stay with me—it's a helpful building block if you want to share your workflows with others."

To pokazuje, ze problem nie jest tylko "za duzo opcji do wyboru", ale rowniez **za duzo warstw pojeciowych** (skill vs plugin vs subagent vs marketplace vs preset) - co bezposrednio zwieksza koszt poznawczy przed w ogole dotarciem do etapu wyboru konkretnego presetu.

### Rozpoznany wzorzec w materiale wtornym: "nie rozumiem klockow, wiec nie wiem co wybrac"

Z researchu o "decision paralysis" w kontekscie agentow AI (choc nie znaleziono bezposredniego posta z Reddita uzywajacego tej frazy w connection do Claude Code), wylania sie nastepujacy, powtarzajacy sie schemat opisany w materialach wtornych (Substack, poradniki):

> "Decision paralysis is a universal challenge where people struggle with choosing between different AI agent options. This paralysis occurs because people don't understand the building blocks of agentic AI - what each one does, when to use it, and how they work together."

oraz konkretniejszy przyklad tego samego zjawiska w kontekscie Claude Code:

> problem manifestuje sie jako "indecision about whether to write a better prompt, create a project, build a skill, or set up an agent" (parafraza z materialow doradczych o wyborze narzedzia w Claude Code).

To bezposrednio potwierdza hipoteze uzytkownika: **przy duzej liczbie opcji, glownym problemem nie jest "za duzo presetow" per se, tylko brak jasnego mentalnego modelu, KIEDY uzyc ktorej kategorii narzedzia**. To silnie sugeruje, ze dla kolekcji 44 presetow kluczowa jest nie redukcja liczby presetow, tylko:
- jasna, plaska taksonomia (np. wg zlozonosci zadania / liczby agentow / kosztu, a nie tylko wg domeny),
- "router" na wejsciu (dokladnie to, co juz robi PRESET_CATALOG.md + auto-dobor w CLAUDE.md wlasciciela - co jest zbiezne z tym, czego community *organicznie* zaczyna szukac samodzielnie, np. przez meta-agentow typu "agent-organizer").

### Meta-obserwacja: rynek sam probuje rozwiazac ten problem

Fakt, ze w wiekszych kolekcjach open-source (np. wshobson/agents) juz pojawia sie kategoria "Meta & Orchestration agents" z podkategoria **agent-organizer** i **multi-agent-coordinator**, jest silnym, posrednim dowodem na skale problemu decision paralysis: spolecznosc nie czeka na oficjalne rozwiazanie od Anthropic, tylko sama buduje agentow-routerow, ktorych jedynym zadaniem jest wybranie odpowiedniego agenta/workflow z wiekszej kolekcji. To dokladnie ten sam wzorzec, co "auto-dobor presetu" opisany w CLAUDE.md projektu Agent Architecture - co sugeruje, ze ta funkcja jest nie tylko dobrym pomyslem UX, ale odpowiedzia na udokumentowana, realna potrzebe rynkowa.

### Ryzyko przeciwne: zbyt agresywna redukcja tez szkodzi

Warto odnotowac kontrargument z materialu o adopcji agentow w firmach (2026): raporty branzowe wskazuja, ze "40% projektow agentic AI zostanie wstrzymanych do konca 2027 z powodu rosnacych kosztow, niejasnej wartosci biznesowej i braku kontroli ryzyka" - a jednoczesnie firmy "uruchamiaja srednio 12 agentow AI, z czego polowa dziala w izolacji, bez integracji z innymi". To pokazuje, ze samo posiadanie wielu agentow nie jest z natury zle - problem pojawia sie, gdy brakuje **integracji i jasnej sciezki wyboru**, a nie gdy liczba opcji przekracza jakis magiczny prog. Innymi slowy: 44 presety to nie problem sam w sobie, dopoki istnieje dobry mechanizm nawigacji (co juz jest zaadresowane przez PRESET_CATALOG.md).

---

## Wnioski praktyczne dla v33 (synteza)

1. **Model routing / koszt jest najbardziej palacym, konkretnym bolem uzytkownikow** - potwierdzonym cytatami o spalaniu $120 w 6 minut i 415 zespawnowanych agentach. Warto upewnic sie, ze kazdy duzy preset (Deep Five Minds, swarm-pro) ma jasny, widoczny estymator kosztu PRZED odpaleniem, nie tylko flagi --budget.
2. **Domyslne, tanie ustawienie powinno byc default**, a "premium" tryb opt-in - zgodnie z tym, jak niektorzy praktycy recznie wylaczaja subagenty w CLAUDE.md, bo domyslne zachowanie ich kosztowo zaskakuje.
3. **Terminologiczna uczciwosc ma znaczenie** - spolecznosc (patrz NitpickLawyer) aktywnie krytykuje kolekcje, ktore nazywaja statyczne prompty "agentami". Warto, by dokumentacja jasno tlumaczyla, czym rozni sie "skill" (statyczny prompt) od "agenta" (z narzedziami/petla) w kolekcji 37/44.
4. **Bialy obszar: agenci spoza software engineering** (pisanie, personal research, produktywnosc) - oddolny popyt jest widoczny (ludzie hakuja Claude Code do tych celow), a obecna kolekcja wyglada na zdominowana przez role inzynierskie. To potencjalny kierunek ekspansji w v33.
5. **Auto-dobor presetu (juz zaimplementowany w CLAUDE.md/PRESET_CATALOG.md) jest zbiezny z tym, czego rynek organicznie szuka** - potwierdzone przez pojawianie sie kategorii "agent-organizer"/"multi-agent-coordinator" w innych duzych kolekcjach jako oddolna proba rozwiazania decision paralysis. Warto to rozwijac i promowac jako kluczowa przewage, nie tylko utrzymywac.
6. **Rekomendacja dot. dalszego researchu:** bezposrednie cytaty z r/ClaudeAI byly trudne do zdobyc przez standardowe WebSearch/WebFetch w tej sesji (ograniczenia indeksowania). Jesli temat "brakujacych agentow wg community" ma byc pogłebiony przed decyzjami produktowymi v33, warto zlecic dedykowany research z bezposrednim dostepem do Reddit (np. przez oficjalne REST API Reddita z autoryzacja, lub reczny przeglad najnowszych watkow w r/ClaudeAI i r/LocalLLaMA).

---

## Zrodla (URL)

- Hacker News - "Ask HN: What's your experience been with Claude Code subagents?" - https://news.ycombinator.com/item?id=44742081
- Hacker News - "I built 59 open-source Claude Code subagents to supercharge software development" - https://news.ycombinator.com/item?id=45072795
- Hacker News - "Claude Code introduces specialized sub-agents" - https://news.ycombinator.com/item?id=44686726
- Hacker News - "How to use Claude Code subagents to parallelize development" - https://news.ycombinator.com/item?id=45181577
- Hacker News - watek o problemach z sub-agentami (lvl155, furyofantares) - https://news.ycombinator.com/item?id=44693017
- Hacker News - watek o spalaniu tokenow przez sub-agenty (mcv, vinnymac, brianwawok, thejazzman, qpricjalcbeu) - https://news.ycombinator.com/item?id=48883796
- Hacker News - watek o subagentach jako czesci szerszej automatyzacji - https://news.ycombinator.com/item?id=47097572
- HackerNoon - "Navigating Claude Code: Subagents Done Right" - https://hackernoon.com/navigating-claude-code-subagents-done-right
- dev.to (voltagent) - "100 Claude Code Subagent Collection" - https://dev.to/voltagent/100-claude-code-subagent-collection-1eb0
- dev.to (onlineeric) - "Claude Code Sub Agents Burn Out Your Tokens" - https://dev.to/onlineeric/claude-code-sub-agents-burn-out-your-tokens-4cd8
- GitHub - wshobson/agents (multi-harness agentic plugin marketplace) - https://github.com/wshobson/agents
- GitHub - netresearch/claude-code-marketplace - https://github.com/netresearch/claude-code-marketplace
- Claude Code Market - https://www.ccmarket.dev/
- Claude Marketplaces directory - https://claudemarketplaces.com/
- aimaker.substack.com - "How I Turned Claude Code Into My Personal AI Agent Operating System for Writing and Research" - https://aimaker.substack.com/p/how-i-turned-claude-code-into-personal-ai-agent-operating-system-for-writing-research-complete-guide
- Anthropic - "The 2026 State of AI Agents Report" - https://resources.anthropic.com/hubfs/The%202026%20State%20of%20AI%20Agents%20Report.pdf
- Barchart / Belitsoft - "2026 AI agent trends: enterprises run 12 AI agents on average but half work alone" - https://www.barchart.com/story/news/1163379/belitsoft-report-2026-ai-agent-trends-enterprises-run-12-ai-agents-on-average-but-half-work-alone
- MindStudio - "AI Agent Token Budget Management (Claude Code)" - https://www.mindstudio.ai/blog/ai-agent-token-budget-management-claude-code
- Anthropic docs - Sub-agents - https://docs.anthropic.com/en/docs/claude-code/sub-agents
