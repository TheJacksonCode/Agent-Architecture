# R1: Trendy w architekturach multi-agent (2025-2026)

Data researchu: 2026-08-21 (kontekst konwersacji: sierpien 2026).
Metoda: web search + web fetch, zrodla pierwotne (Anthropic engineering blog, Google Research blog, Google Developers blog, OpenAI) + zrodla wtorne/akademickie (arXiv) tam gdzie brak oficjalnego blogu.

Kontekst zamowienia: research dla "Agent Architecture Designer" - wizualnego konfiguratora + encyklopedii 37 agentow i 44 presetow zespolow do Claude Code, zbudowanego wokol orchestrator + wyspecjalizowani subagenci + model routing (Opus/Sonnet/Haiku) + fan-out research + debate/critique ("Five Minds Protocol").

---

## 1. Orchestrator-worker: kanoniczny wzorzec wg Anthropic

Najwazniejszym pierwotnym zrodlem jest oficjalny wpis inzynierski Anthropic "How we built our multi-agent research system" (anthropic.com/engineering/multi-agent-research-system, opublikowany 2025, opisujacy system stojacy za funkcja Claude Research, wdrozona w kwietniu 2025). Kluczowe ustalenia:

- **Wzorzec:** lead agent (orchestrator) analizuje zapytanie, opracowuje strategie i spawnuje wyspecjalizowanych subagentow dzialajacych rownolegle, kazdy z wlasnym context window, wlasnymi narzedziami i wlasna trajektoria eksploracji. Subagenci dzialaja jak "inteligentne filtry" - iteracyjnie uzywaja narzedzi wyszukiwania, po czym zwracaja przetworzony wynik (np. liste firm) do lead agenta, ktory syntetyzuje finalna odpowiedz.
- **Wynik:** system multi-agent pobil pojedynczego Claude Opus 4 o 90.2% w wewnetrznych ewaluacjach (na zadaniach typu breadth-first research).
- **Cytat wprost:** "Multi-agent systems work mainly because they help spend enough tokens to solve the problem" - zuzycie tokenow samo w sobie tlumaczy ok. 80% wariancji wynikow w zadaniach typu web search. Systemy multi-agent zuzywaja ok. 15x wiecej tokenow niz zwykly czat.
- **Kiedy to sie oplaca:** zadania mocno rownolegizowalne, przekraczajace pojedyncze okno kontekstu, i na tyle wartosciowe, by uzasadnic wysoki koszt tokenowy.
- **Kiedy NIE stosowac multi-agent:** domeny wymagajace wspoldzielonego kontekstu przez wszystkich agentow, zadania z silnymi zaleznosciami miedzy krokami, i - co kluczowe dla branzy dev-tooli - **wiekszosc pracy kodowej**, bo brak w niej naturalnie rownoleglych, niezaleznych podzadan. Anthropic pisze wprost, ze coding rzadko ma komponenty ktore mozna bezpiecznie rownoleglic bez ryzyka konfliktow.
- **Zasady promptowania subagentow (bezposrednio przydatne dla architektury presetow):**
  1. Szczegolowe opisy zadania: cel, granice, format wyjscia, wskazowki co do narzedzi - bez tego subagenci albo duplikuja prace, albo zostawiaja luki.
  2. Orchestrator musi "uczyc delegowania" - proste instrukcje typu "zbadaj niedobor polprzewodnikow" zawodza, bo subagenci roznie interpretuja zakres.
  3. Jawne reguly skalowania liczby agentow osadzone w prompt: proste fact-finding = 1 agent, 3-10 wywolan narzedzi; zlozony research = 10+ subagentow z podzielonymi odpowiedzialnosciami.
  4. Projekt interfejsu agent-narzedzie jest tak samo krytyczny jak projekt UI dla czlowieka - zle opisane narzedzia prowadza agentow na calkowicie bledne tory.
  5. Strategia "od szerokiego do waskiego": krotkie, szerokie zapytania na starcie, ocena dostepnosci danych, potem zwezanie fokusu.
  6. Extended thinking jako "kontrolowalny brudnopis" do planowania i oceny jakosci.
  7. Rownolegle wywolania narzedzi (3+ jednoczesnie) skracaja czas researchu nawet o 90% przy zlozonych zapytaniach.
- **Bledy wczesnych iteracji (warte odnotowania jako anti-pattern):** wczesne wersje agenta spawnowaly 50 subagentow do prostych zapytan, przeszukiwaly siec w nieskonczonosc w poszukiwaniu nieistniejacych zrodel i rozpraszaly siebie nawzajem nadmiarem aktualizacji statusu miedzy agentami.
- **Niezawodnosc produkcyjna:** w systemach agentowych drobne zmiany kaskadowo prowadza do duzych zmian zachowania, co utrudnia pisanie kodu dla zlozonych agentow utrzymujacych stan. Agenci sa niedeterministyczni nawet przy identycznych promptach - wymaga to pelnego tracingu produkcyjnego i wysokopoziomowej observability (bez podgladania tresci konwersacji ze wzgledow prywatnosci). Testowanie z udzialem ludzi pozostaje niezastapione, bo ludzie znajduja edge case'y, ktorych evale nie wychwytuja (np. biasy zrodel, halucynacje na nietypowych zapytaniach).

Zrodla: [How Anthropic Built a Multi-Agent Research System](https://blog.bytebytego.com/p/how-anthropic-built-a-multi-agent), [Anthropic's Multi-Agent Research Architecture Explained](https://theaiengineer.substack.com/p/how-anthropic-built-multi-agent-deep), [ZenML LLMOps Database entry](https://www.zenml.io/llmops-database/building-a-multi-agent-research-system-for-complex-information-tasks) - wszystkie streszczaja oryginalny wpis anthropic.com/engineering/multi-agent-research-system.

---

## 2. Nowe prymitywy: Agent Skills, subagenci, MCP

### Agent Skills

Anthropic formalnie wprowadzil "Agent Skills" jako oficjalny prymityw w oficjalnym wpisie inzynierskim "Equipping agents for the real world with Agent Skills" (anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills). Skills to wielokrotnego uzytku instrukcje/procedury, ktore agent laduje na zadanie (progressive disclosure) - dokladnie ten model, ktory Agent Architecture Designer juz stosuje (35-37 plikow skill jako definicje agentow, ladowane dopiero gdy preset ich potrzebuje, "zero kosztu tokenow do momentu uzycia"). To pokrywa sie z oficjalnym kierunkiem Anthropic z 2025/2026: Skills eliminuja potrzebe "rebuildowania tego samego workflow od zera za kazdym razem" i dzialaja komplementarnie do MCP - Skills ucza agenta zlozonych workflow *wokol* narzedzi, podczas gdy MCP dostarcza same narzedzia/dostep do systemow zewnetrznych.

### MCP (Model Context Protocol)

MCP, wprowadzony przez Anthropic pod koniec 2024 jako otwarty standard, zostal w grudniu 2025 przekazany do Linux Foundation jako czesc nowo utworzonej Agentic AI Foundation (AAIF) - to istotny sygnal, ze MCP przeszlo z "protokolu jednej firmy" do neutralnej, przemyslowej infrastruktury standaryzacyjnej, analogicznie do LSP czy OpenTelemetry. Na poczatek 2026 MCP ma ponad 97 milionow pobran SDK miesiecznie i 10 000+ aktywnych serwerow - to jeden z najszybciej adoptowanych projektow open source w AI. Dla architektury typu Agent Architecture Designer oznacza to, ze MCP nie jest juz "opcjonalnym dodatkiem", tylko oczekiwanym kanalem integracji z narzedziami zewnetrznymi (Gmail, Calendar, Drive, Vercel itd. - dokladnie to, co juz widac w dostepnych toolach tej sesji).

### Subagenci jako prymityw SDK

Claude Agent SDK (dawniej Claude Code SDK) formalizuje subagentow jako "delegated child agents with their own context" - to jest wprost ten sam model co "workerzy" w Agent Architecture Designer. SDK dostarcza rowniez: tool-use loop z opcjonalnymi checkpointami human-in-the-loop, sesje trwale (persistent sessions), i natywne wsparcie klienta MCP.

Zrodla: [Equipping agents for the real world with Agent Skills - Anthropic](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills), [Claude Skills vs. MCP: A Technical Comparison - IntuitionLabs](https://intuitionlabs.ai/articles/claude-skills-vs-mcp), [Claude Agent SDK in 2026 - Totalum](https://www.totalum.app/blog/claude-agent-sdk-totalum-2026), [Top 10 Anthropic Claude Agent Skills for 2026 - Nimble](https://www.nimbleway.com/blog/anthropic-claude-agent-skills).

---

## 3. Pieciopatternowa taksonomia (branzowy konsensus 2026)

Wieloczesciowe raporty branzowe (Beam.ai, DigitalApplied, Levelop) zbieznie opisuja pieciu dominujacych wzorcow produkcyjnych w 2026:

1. **Fan-out** - rownolegle rozeslanie tego samego/podobnego zadania do wielu agentow, agregacja wynikow (odpowiednik "parallel research" w Agent Architecture Designer).
2. **Pipeline (sekwencyjny)** - linia montazowa, agent A przekazuje output agentowi B.
3. **Debate** - agenci wymieniaja argumenty/krytyke, konsensus lub arbiter rozstrzyga.
4. **Supervisor (hierarchiczny/coordinator)** - centralny agent deleguje, waliduje, integruje.
5. **Swarm** - zdecentralizowana wspolpraca bez sztywnej hierarchii, agenci decyduja sami czy dolaczyc do zadania.

Kluczowa rekomendacja branzowa: **zaczynac od wzorca supervisor** - ma najszersze natywne wsparcie frameworkowe (Claude Agent SDK, LangGraph, OpenAI Agents SDK, CrewAI hierarchical Process), najlepiej poznany failure mode (nadmierne delegowanie, ograniczane iteration ceilings) i najwiecej referencji produkcyjnych. Wiekszosc systemow produkcyjnych to **sekwencyjny szkielet z jednym lub dwoma krokami rownoleglymi/hierarchicznymi dodanymi tylko tam, gdzie wyraznie pomagaja** - nie "wszystko na raz". W praktyce systemy produkcyjne *laczna* wzorce: fan-out agentow badawczych zasilajacych supervisora, ktory bramkuje jakosc (quality-gate), plus checkpoint HITL przed kazda akcja zewnetrzna nieodwracalna, plus runda konsensusu dla decyzji najwyzszej stawki. To bezposrednio pasuje do struktury "Deep Five Minds" (orchestrator + fan-out research + debata + bramy HITL) juz obecnej w Agent Architecture Designer.

Wzorzec **model tiering** jest opisywany jako standard produkcyjny: tani/szybki model (GPT-5.4-mini, Claude Haiku 4.5) do triage/routingu, mocniejszy model (GPT-5.4, Claude Sonnet 4.6) do zlozonego rozumowania - dokladnie odpowiada strategii Opus/Sonnet/Haiku wedlug zlozonosci zadania stosowanej w projekcie.

Zrodlo: [Multi-Agent Orchestration: 5 Patterns That Work in 2026 - DigitalApplied](https://www.digitalapplied.com/blog/multi-agent-orchestration-5-patterns-that-work), [6 Multi-Agent Orchestration Patterns for Production (2026) - Beam.ai](https://beam.ai/agentic-insights/multi-agent-orchestration-patterns-production), [AI Agent Orchestration Frameworks: 2026 Guide - Levelop](https://levelop.dev/blog/ai-agent-orchestration-frameworks-guide-2026).

---

## 4. Google DeepMind / Google Research: nauka o skalowaniu systemow agentowych

Najwazniejsza pozycja akademicka z ostatnich miesiecy to praca Google Research "Towards a Science of Scaling Agent Systems" (Yubin Kim i wsp., arXiv:2512.08296, opublikowana grudzien 2025, ze streszczeniem na blogu research.google - "Towards a science of scaling agent systems: When and why agent systems work"). To pierwsza systematyczna, kontrolowana (180 konfiguracji, 5 kanonicznych architektur: Single, Independent, Centralized, Decentralized, Hybrid; 3 rodziny LLM; 4 benchmarki; stale narzedzia/prompty/budzety tokenow) proba wyprowadzenia predykcyjnego modelu tego, kiedy i dlaczego systemy multi-agent dzialaja.

Kluczowe, ilosciowe wnioski - najbardziej wartosciowe dla walidacji architektury:

- **Amplifikacja bledow zalezy od topologii.** Niezalezni agenci (bez centralnej koordynacji) amplifikuja bledy az **17.2x** wzgledem baseline pojedynczego agenta poprzez niekontrolowana propagacje. **Centralizowana koordynacja ogranicza te amplifikacje do 4.4x.** To jest twardy, ilosciowy argument za architektura orchestrator-worker (jaka ma Agent Architecture Designer) wzgledem "plaskiego swarmu" bez nadzoru.
- Centralizowana koordynacja poprawia wydajnosc o **80.9%** na zadaniach dajacych sie rownoleglic (np. reasoning finansowy).
- Decentralizowana koordynacja wygrywa na zadaniach dynamicznych, wymagajacych szybkiej adaptacji (np. nawigacja web, +9.2% vs +0.2% dla centralizowanej) - czyli nie kazde zadanie chce hierarchii, ale wiekszosc "cieznich" zadan badawczych/decyzyjnych korzysta na centralizacji.

**Wniosek praktyczny:** ta praca daje twarde, swiezo opublikowane (grudzien 2025) uzasadnienie naukowe dla domyslnego wyboru wzorca orchestrator + subagenci w Agent Architecture Designer, a jednoczesnie sugeruje, ze dla zadan silnie dynamicznych/eksploracyjnych (np. web navigation, live debugging) warto rozwazyc tryb bardziej zdecentralizowany jako opcjonalny preset.

Osobno, Google Developers Blog opublikowal "Developer's guide to multi-agent patterns in ADK" (Agent Development Kit), opisujacy 8 wzorcow projektowych dla systemow multi-agent, budowanych z filozofia "AI-owy odpowiednik architektury mikroserwisow":

1. **Sequential Pipeline** - linia montazowa, deterministyczne przekazywanie zadania miedzy agentami (np. parsowanie PDF -> ekstrakcja danych -> podsumowanie).
2. **Coordinator/Dispatcher** - centralny agent analizuje intencje i kieruje do wyspecjalizowanego agenta (np. routing billing vs. support technicznego).
3. **Parallel Fan-Out/Gather** - rownolegle wykonanie niezaleznych zadan, agregacja przez syntezera (np. rownolegly code review pod katem bezpieczenstwa/stylu/wydajnosci).
4. **Hierarchical Decomposition** - agenci wysokiego poziomu rozbijaja cele na podzadania i delegowuja z zagniezdzonym zarzadzaniem (np. pisanie raportu ze wsparciem wyspecjalizowanych asystentow badawczych).
5. **Generator and Critic** - jeden agent generuje, drugi waliduje wg twardych kryteriow, z warunkowa petla korekcyjna (np. generowanie SQL z walidacja skladni).
6. **Iterative Refinement** - cykl generacja-krytyka-poprawa az do osiagniecia jakosciowego progu (np. optymalizacja wydajnosci).
7. **Human-in-the-Loop** - agenci obsluguja rutyne, ale pauzuja i wymagaja autoryzacji czlowieka dla decyzji nieodwracalnych/wysokiego ryzyka (np. transakcje finansowe, wdrozenia produkcyjne).
8. **Composite Patterns** - rzeczywiste, produkcyjne systemy laczace kilka wzorcow naraz (np. wsparcie klienta laczace routing + rownolegle wyszukiwania + petle critic).

To niemal jeden-do-jednego pokrywa sie z tym, co Agent Architecture Designer juz modeluje jako presety (fan-out research, generator/critic jako "Five Minds"/debate, HITL gates, hierarchical decomposition jako "Full Hierarchy" / 5-poziomowa hierarchia).

Zrodla: [Towards a science of scaling agent systems - Google Research blog](https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/), [arXiv:2512.08296](https://arxiv.org/abs/2512.08296), [Developer's guide to multi-agent patterns in ADK - Google Developers Blog](https://developers.googleblog.com/developers-guide-to-multi-agent-patterns-in-adk/).

---

## 5. OpenAI: od Swarm do Agents SDK

OpenAI zaczelo od eksperymentalnego frameworku "Swarm" (edukacyjny, lekki, orkiestracja typu handoff miedzy agentami), a w marcu 2025 wydalo produkcyjny **OpenAI Agents SDK** jako jego nastepce (Python od marca 2025, TypeScript od lipca 2025). Cztery podstawowe prymitywy: **Agents, Handoffs, Tools, Guardrails**.

- **Handoff** - agent uznaje zadanie za zakonczone (w swoim zakresie) i przekazuje pelna historie wiadomosci innemu agentowi do dalszej pracy; agenci moga dzialac rownolegle.
- **Guardrails** - jawny prymityw do walidacji/ograniczania zachowania agenta - to jest element, ktorego warto szukac w architekturze Agent Architecture Designer jako osobnej kategorii (nie tylko "critic agent", ale programowe guardraile na poziomie orkiestratora).
- OpenAI "A practical guide to building agents" (oficjalny przewodnik OpenAI, dostepny na openai.com/business/guides-and-resources) formalizuje podobne zasady co Anthropic: agenci powinni miec jasno zdefiniowana role, ograniczony zestaw narzedzi, i jawne kryteria zakonczenia zadania.

Ogolny trend: **konwergencja terminologii miedzy dostawcami.** To, co Anthropic nazywa "subagent", OpenAI nazywa "agent + handoff", Google ADK nazywa "sub-agent w hierarchical decomposition" - ale leżący pod spodem model mentalny (orchestrator deleguje do wyspecjalizowanych, ograniczonych kompetencyjnie agentow, z jawnym protokolem przekazania kontroli) jest identyczny u wszystkich trzech firm w 2025-2026.

Zrodla: [A practical guide to building agents - OpenAI](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/), [OpenAI Agents SDK: A Comprehensive Guide - blog.agen.cy](https://blog.agen.cy/p/openai-agents-sdk-a-comprehensive), [From Swarm to Synergy - Medium](https://medium.com/@anumriz2017/from-swarm-to-synergy-how-openais-swarm-evolved-into-the-agents-sdk-66487a83e602), [OpenAI Swarm Multi-Agent Framework in 2026 - Lexogrine](https://lexogrine.com/blog/openai-swarm-multi-agent-framework-2026).

---

## 6. Blackboard pattern: nisza, ale odzyskuje popularnosc

Wzorzec blackboard (rodowod z systemow AI lat 80.) zostal "wskrzeszony" dla systemow LLM. Mechanizm: centralny agent (lub proces) publikuje na wspoldzielonej "tablicy" opis potrzebnego zadania/informacji, a podlegli agenci monitorujacy tablice samodzielnie decyduja, czy posiadaja kompetencje/wiedze/zainteresowanie by wlaczyc sie w rozwiazanie problemu. To przesuwa podejmowanie decyzji z pojedynczego koordynatora na model rozproszony.

Konkretna praca akademicka z 2025/2026 - "LLM-based Multi-Agent Blackboard System for Information Discovery in Data Science" (arXiv:2510.01285) - pokazuje, ze architektura blackboard **przewyzsza mocne baseline'y o 13-57% wzglednej poprawy end-to-end success** i do 9% wzglednego zysku w F1 przy odkrywaniu danych, dzieki dynamicznemu doborowi agentow i event-driven wspolpracy.

Dla Agent Architecture Designer blackboard jest obecnie **niszowy** (nie ma jeszcze oficjalnego wsparcia platformowego u Anthropic/OpenAI/Google jak orchestrator-worker czy handoffs), ale warto go odnotowac jako wzorzec eksperymentalny/zaawansowany - moglby pasowac do przyszlego presetu typu "dynamiczne odkrywanie wiedzy" (np. rozszerzenie istniejacego "kb-constructor"), gdzie liczba i typ potrzebnych agentow nie jest znana z gory.

Kontekst rynkowy: Gartner odnotowal **1445% wzrost zapytan o systemy multi-agent** miedzy Q1 2024 a Q2 2025, z organizacjami uzywajacymi juz srednio 12 agentow, prognozujac wzrost o 67% w ciagu dwoch lat - co potwierdza, ze rynek dojrzewa szybko i standaryzacja wzorcow (jak w tym raporcie) staje sie coraz bardziej wartosciowa.

Zrodla: [LLM-Based Multi-Agent Blackboard System for Information Discovery in Data Science - arXiv:2510.01285](https://arxiv.org/abs/2510.01285), [arXiv HTML wersja](https://arxiv.org/html/2510.01285v1).

---

## 7. Debate / critique / generator-critic: dojrzaly, ale z zastrzezeniami

Wzorzec multi-agent debate (kilku agentow proponuje odpowiedzi i wzajemnie krytykuje rozumowanie, az do konsensusu) jest dobrze udokumentowany jako metoda redukcji halucynacji i poprawy jakosci rozumowania - "structured disagreement" poprawia wyniki w matematyce, logice i QA poprzez eksplorowanie roznorodnych sciezek rozumowania i wzajemna weryfikacje twierdzen ("society of minds" approach).

Kilka niuansow wartych uwzglednienia w architekturze:

- **Pojedynczy agent nie potrafi skutecznie sam siebie skrytykowac.** Praca "Large Language Models Cannot Self-Correct Reasoning Yet" (czesto cytowana jako podstawa dla podejscia multi-agent zamiast pure self-critique) pokazuje, ze samo-refleksja pojedynczego modelu jest podatna na confirmation bias i halucynacje w samo-ocenie - **to bezposrednio uzasadnia wzorzec "Devil's Advocate" / oddzielnego agenta krytyka** stosowany w "Five Minds Protocol" zamiast prostego self-review.
- **Nowe badania (2026) ostrzegaja przed "confident liar" w debacie** - "The Confident Liar: Diagnosing Multi-Agent Debate with Log-Probabilities and LLM-as-Judge" (arXiv:2606.10296) pokazuje, ze agenci w debacie moga byc pewni siebie mimo bledu, co oszukuje zarowno innych agentow, jak i LLM-as-judge. Wniosek: sam mechanizm debaty nie gwarantuje jakosci - warto laczyc go z log-probability/confidence signaling albo z twardym, niezaleznym zrodlem prawdy (np. testy, dane) tam gdzie to mozliwe.
- **Anonimizacja tozsamosci w debacie redukuje bias** - "When Identity Skews Debate: Anonymization for Bias-Reduced Multi-Agent Reasoning" (arXiv:2510.07517) pokazuje, ze ujawnienie ktory agent/model odpowiada wplywa na wyniki debaty (np. sila autorytetu modelu), a anonimizacja poprawia jakosc konsensusu.
- Typowa architektura z literatury: **dwoch debatujacych + jeden sedzia (judge)** - jesli debatujacy nie osiagna zgody po kilku rundach, sedzia interweniuje i podejmuje finalna decyzje. To jest niemal dokladnie struktura "Five Minds Protocol" (4 ekspertow + Devil's Advocate) juz obecna w projekcie, tylko z wieksza liczba glosow.

Zrodla: [Minimizing Hallucinations and Communication Costs: Adversarial Debate and Voting Mechanisms - MDPI](https://www.mdpi.com/2076-3417/15/7/3676), [The Confident Liar - arXiv:2606.10296](https://arxiv.org/pdf/2606.10296), [When Identity Skews Debate - arXiv:2510.07517](https://arxiv.org/pdf/2510.07517), [Mitigating LLM Hallucinations Using a Multi-Agent Framework - MDPI](https://www.mdpi.com/2078-2489/16/7/517).

---

## 8. Delegacja jako problem socjotechniczny (Google DeepMind, luty 2026)

Osobna, swieza publikacja Google DeepMind - "Intelligent AI Delegation" (12 lutego 2026) - przesuwa dyskusje z czysto technicznej architektury na warstwe odpowiedzialnosci: delegowanie zadan miedzy agentami to transfer **autorytetu, odpowiedzialnosci (responsibility), rozliczalnosci (accountability) i zaufania**, nie tylko przekazanie danych/tokenow. Bez sformalizowania tych transferow systemy multi-agent sa podatne na ciche awarie (silent failures), rozmycie odpowiedzialnosci (responsibility diffusion) i kaskadowe bledy.

**Wniosek praktyczny dla Agent Architecture Designer:** to jest argument za jawnym dokumentowaniem w encyklopedii nie tylko "co robi agent" i "jaki model", ale tez "kto jest odpowiedzialny za finalna decyzje po delegacji" - element, ktory pasuje do juz istniejacych bramek HITL (Human-in-the-Loop) w presetach typu Deep Five Minds, ale mogloby byc bardziej eksplicite nazwane jako "accountability boundary" przy kazdym presecie z wieloma agentami.

Zrodlo: [Google DeepMind's Delegation Framework for Coding Agent Architecture](https://alexlavaee.me/blog/intelligent-agent-delegation/).

---

## 9. Emerging: Test-Driven AI Development (TDAID)

Powiazany, nowy trend odnotowany w 2026 to "Test-Driven AI Development" (Plan, Red, Green, Refactor, Validate) - testy jako zarowno specyfikacja, jak i kryterium wyjscia (exit criteria) dla petli agenta. To nie jest bezposrednio wzorzec orkiestracji multi-agent, ale wplywa na to, jak projektowac presety typu "bug-hunt" czy "quick-fix" (juz obecne w Agent Architecture Designer) - sugeruje wzmocnienie roli twardych, weryfikowalnych bramek (testy/QA agent) jako kryterium zakonczenia petli, a nie tylko subiektywnej oceny krytyka.

---

## Wnioski dla Agent Architecture Designer

**Ogolna ocena: architektura projektu jest zgodna ze stanem sztuki na sierpien 2026, a w kilku miejscach wyprzedza przecietne wdrozenia branzowe.**

Co jest juz aktualne i potwierdzone przez najnowsze zrodla:

1. **Orchestrator + wyspecjalizowani subagenci jako domyslny wzorzec** - dokladnie pokrywa sie z rekomendacja branzowa "start with supervisor" (Beam.ai/DigitalApplied) oraz z twardymi danymi Google Research: centralizowana koordynacja ogranicza amplifikacje bledow do 4.4x (vs 17.2x dla niezaleznych agentow) i daje +80.9% na zadaniach rownoleglizowalnych. To najsilniejszy, swiezy (grudzien 2025) argument naukowy za obecnym wyborem architektonicznym.
2. **Model routing Opus/Sonnet/Haiku wg zlozonosci** - to jest dokladnie "model tiering", opisywany jako standard produkcyjny 2026 (tani model do triage/routingu, mocny do zlozonego rozumowania). Warto ten fakt wprost wyeksponowac w encyklopedii/dokumentacji jako "zgodne z best practice branzowa", z cytatem.
3. **Fan-out research** - jeden z 5 dominujacych wzorcow 2026 i jeden z 8 wzorcow ADK (Parallel Fan-Out/Gather). Zgodne.
4. **Five Minds Protocol (debata + Devil's Advocate)** - odpowiada wzorcowi "generator and critic" / debate z literatury, i - co wazne - odpowiada rekomendacji, by NIE polegac na self-critique pojedynczego modelu, tylko na oddzielnym, niezaleznym agencie krytycznym. To jest mocno wspierane przez badania (self-correction pojedynczego LLM jest zawodne).
5. **Skills jako lekkie, ladowane-na-zadanie definicje agentow** - to jest dokladnie prymityw, ktory Anthropic formalnie ogloszlo w "Equipping agents for the real world with Agent Skills". Projekt uzywa go poprawnie i wczesnie (35-37 skilli).
6. **HITL gates w Deep Five Minds** - zgodne z wzorcem #7 z ADK (Human-in-the-Loop) i z rekomendacja OpenAI/branzy: checkpoint HITL przed kazda nieodwracalna akcja zewnetrzna.

Co warto rozwazyc dodac/zmienic w v33:

1. **Jawne guardrails jako osobny prymityw/koncept w encyklopedii**, nie tylko "critic agent". OpenAI Agents SDK traktuje Guardrails jako czwarty, rownorzedny prymityw obok Agents/Handoffs/Tools. Agent Architecture Designer mogloby dodac krotka sekcje "guardrails vs critic agent - roznica" do dokumentacji, bo to rozroznienie jest teraz standardowe u OpenAI.
2. **Odnotowac (i moze dodac jako preset eksperymentalny) wzorzec blackboard** dla zadan typu "dynamiczne odkrywanie wiedzy", gdzie z gory nie wiadomo ilu/jakich agentow bedzie trzeba (np. rozszerzenie "kb-constructor"). Dane pokazuja 13-57% poprawy wzgl. baseline w scenariuszach data discovery. To nisza, ale rosnaca.
3. **Dodac swiadome zastrzezenie "kiedy NIE uzywac multi-agent"** wprost z cytatu Anthropic - wiekszosc pracy kodowej (coding) nie ma naturalnie rownoleglych podzadan, wiec presety typu duzy "swarm" do prostego bugfixa sa przewymiarowane. Warto to wyeksponowac przy prostszych presetach (quick-fix, solo) jako "dlaczego male sa czasem lepsze" - to zreszta juz jest filozofia projektu ("przy watpliwosciach wybieraj mniejszy preset"), wiec chodzi tylko o dodanie zrodla/cytatu do dokumentacji.
4. **"Confident liar" w debacie** - warto dodac do dokumentacji Five Minds Protocol ostrzezenie, ze sama debata nie gwarantuje wykrycia bledu jesli agent jest pewny siebie mimo pomylki, i ze warto laczyc debate z twardymi zrodlami prawdy (testy, dane, cytaty) gdziekolwiek to mozliwe, a nie tylko z werdyktem "kto brzmi bardziej przekonujaco".
5. **Rozwazyc anonimizacje tozsamosci modelu w debacie** - jesli w Five Minds roznym "umyslom" przypisane sa rozne modele (np. Opus vs Sonnet), badania sugeruja ze ujawnienie tej informacji moze skrzywiac wynik debaty na korzysc "silniejszego" modelu niezaleznie od jakosci argumentu.
6. **Explicit "accountability boundary"** przy kazdym presecie wieloagentowym - kto (ktory agent/etap) jest formalnie odpowiedzialny za finalna decyzje po delegacji - zgodnie ze swiezym (luty 2026) framework Google DeepMind o delegacji jako transferze odpowiedzialnosci, nie tylko danych.
7. **MCP jako oczekiwany kanal integracji, nie opcja** - biorac pod uwage, ze MCP trafilo pod Linux Foundation (grudzien 2025) i ma 97M+ pobran/miesiac, dokumentacja projektu moglaby wprost zaznaczyc, ze prezety powinny domyslnie zakladac dostepnosc MCP dla integracji zewnetrznych (co juz czesciowo widac w dostepnych narzedziach Vercel/Gmail/Calendar/Drive w tym srodowisku).

**Podsumowanie jednym zdaniem:** architektura Agent Architecture Designer (orchestrator-worker + model tiering + fan-out research + debate/critique + HITL gates) pokrywa sie z pieciopatternowa taksonomia uznawana za standard produkcyjny 2026 i jest dodatkowo wsparta swiezymi (grudzien 2025 - luty 2026) wynikami ilosciowymi Google Research o przewadze centralizowanej koordynacji nad niezaleznymi agentami - najwieksza luka to brak formalnego konceptu "guardrails" jako osobnego prymitywu oraz brak jawnego wzorca blackboard dla zadan o nieznanej z gory strukturze.
