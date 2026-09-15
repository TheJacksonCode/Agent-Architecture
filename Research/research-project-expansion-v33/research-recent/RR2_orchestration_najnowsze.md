# RR2: Najnowsze trendy orkiestracji multi-agent (luty-sierpien 2026)

Zakres: wylacznie zrodla i publikacje z ostatniego polrocza (luty 2026 - sierpien 2026), pod katem projektu
"Agent Architecture Designer" (wizualna encyklopedia + konfigurator zespolow agentow dla Claude Code).

---

## Chronologiczna lista aktualizacji

### Luty 2026

**[15.02.2026] Zylos Research - "Agent-to-Agent Communication Protocol Standards: A2A, MCP, ACP, and ANP"**
Zrodlo: https://zylos.ai/research/2026-02-15-agent-to-agent-communication-protocols/
Mapa czterech konkurujacych/wspolpracujacych protokolow agentowych. Utrwala sie podzial: MCP do pionowej
integracji agent-narzedzie, A2A do poziomej koordynacji agent-agent.
**Relevancja:** SREDNIA. Projekt jest single-HTML/Claude Code-centric i nie implementuje protokolow sieciowych,
ale warto dodac krotka notke edukacyjna w encyklopedii ("jak agenci komunikuja sie w produkcji poza Claude Code" -
kontekst dla uzytkownikow ktorzy pytaja o A2A/MCP).

**[arXiv 2601.02371, styczen/luty 2026] "Permission Manifests for Web Agents"**
Zrodlo: https://arxiv.org/pdf/2601.02371
Propozycja deklaratywnych "manifestow uprawnien" dla agentow webowych - agent deklaruje z gory jakie akcje/zasoby
bedzie potrzebowal, zamiast zadania per-request.
**Relevancja:** NISKA-SREDNIA. Konceptualnie zbiezne z "tool permissions per agent" ktore juz projekt opisuje
(kazdy z 35 agentow ma zdefiniowany zestaw narzedzi) - mozna to zacytowac jako potwierdzenie ze wzorzec
"deklaratywne uprawnienia per agent" jest uznawany za best practice w 2026.

**[arXiv 2602.11327, luty 2026] "Security Threat Modeling for Emerging AI-Agent Protocols: MCP, A2A, Agora, ANP"**
Zrodlo: https://arxiv.org/pdf/2602.11327
Pierwsza systematyczna analiza STRIDE dla protokolow agentowych (nie tylko dla pojedynczego agenta).
**Relevancja:** SREDNIA dla presetu `/security-multi-vector` - warto dodac referencje ze STRIDE jest teraz
stosowane rowniez na poziomie miedzy-agentowym, nie tylko wewnatrz-agentowym.

### Marzec 2026

**[26.03.2026] Zylos Research - "Agent Interoperability Protocols 2026: MCP, A2A, ACP and the Path to Convergence"**
Zrodlo: https://zylos.ai/research/2026-03-26-agent-interoperability-protocols-mcp-a2a-acp-convergence/
Potwierdza konwergencje: MCP (pionowo, narzedzia) + A2A (poziomo, delegacja miedzy agentami) staje sie
"domyslnym stosem architektonicznym" dla wdrozen enterprise.
**Relevancja:** NISKA dla samego produktu (single-file, brak sieciowej wielo-agentowosci), ale WYSOKA dla
warstwy edukacyjnej - jesli encyklopedia ma sekcje o "jak to dziala w realnym swiecie poza Claude Code",
to ten dwuwarstwowy model (MCP+A2A) jest teraz kanonicznym opisem do zacytowania.

**Marzec 2026 - CrewAI v1.10.x**
Zrodlo: https://www.joinnextdev.com/a/crewai/crewai-v1101-multi-agent-ai-just-got-serious
CrewAI dodaje: natywne wsparcie A2A, integracje MCP, streaming, oraz (z serii 1.9.x) SqliteProvider do trwalego
stanu (state persistence). To zamyka luki ktore wczesniej blokowaly enterprise od standaryzacji na CrewAI.
**Relevancja:** SREDNIA. Jesli w projekcie istnieje jakikolwiek "porownanie frameworkow" (LangGraph/CrewAI/ADK
vs Claude Code subagents), warto zaktualizowac dane o CrewAI - stan na 2025 byl juz nieaktualny.

### Kwiecien 2026

**[arXiv 2604.24881] "Latent Agents: A Post-Training Procedure for Internalized Multi-Agent Debate" (IMAD)**
Zrodlo: https://arxiv.org/html/2604.24881v1
Kluczowa nowosc: zamiast uruchamiac wielu agentow debatujacych w wielu turach (drogie, wolne), IMAD destyluje
"wielo-agentowe rozumowanie" w jeden model poprzez fine-tuning. Adresuje wprost koszt inferencji wielokrotnych
tur konwersacji miedzy agentami.
**Relevancja WYSOKA dla encyklopedii:** to jest bezposrednia kontra-propozycja dla wzorca "Five Minds Protocol" /
"debate" ktory projekt juz ma jako preset. Warto dodac notke w opisie presetow debate-owych: "nowe badania (IMAD,
kwiecien 2026) pokazuja ze mozna zdestylowac koszt wielo-agentowej debaty do pojedynczego modelu - trade-off:
tracisz elastycznosc/aktualnosc modelu, zyskujesz 3-5x nizszy koszt".

**[arXiv 2604.00901] "Experience as a Compass: Multi-agent RAG with Evolving Orchestration and Agent Prompts"**
Zrodlo: https://arxiv.org/html/2604.00901v1
Multi-agent RAG gdzie orkiestracja i prompty agentow ewoluuja na podstawie doswiadczenia (nie sa statyczne).
Emergentna samoorganizacja: rzadka eksploracja prowadzi do zwartych, wysoko-uzytecznych sieci agentow.
**Relevancja:** SREDNIA-NISKA - projekt uzywa statycznych, predefiniowanych presetow (celowo, dla przewidywalnosci
kosztu). To dobry kontrapunkt do wspomniec w dokumentacji: "projekt swiadomie wybiera statyczna orkiestracje
zamiast emergentnej/RL-owej, bo priorytet to przewidywalnosc kosztu i audytowalnosc dla edukacji".

### Maj 2026

**[19.05.2026] Google ADK v2.0 - General Availability**
Zrodlo: https://www.requesty.ai/blog/best-ai-agent-sdks-compared-2026-langchain-crewai-openai-anthropic-google
Duza zmiana architektoniczna: ADK przechodzi z hierarchicznego wykonawcy agentow (hierarchical agent executor)
na silnik wykonania oparty na grafie (graph-based execution engine) - agenci, narzedzia i funkcje to wezly
w grafie workflow. To ten sam ruch architektoniczny co LangGraph zrobil wczesniej. Multi-jezykowosc: Python, Go,
TypeScript jako first-class. Natywne wsparcie protokolu A2A.
**Relevancja SREDNIA:** potwierdza ze "graf jako model orkiestracji" (zamiast liniowego pipeline'u) staje sie
standardem branzowym w 2026 u wszystkich duzych graczy (LangGraph, teraz ADK). Warto sprawdzic czy opis
architektury projektu (35 agentow, 42 presetow) powinien w encyklopedii wspomniec "graph-based execution"
jako dominujacy wzorzec roku 2026, kontrastujac z prostszymi liniowymi/hierarchicznymi pipeline'ami ktore
projekt uzywa.

**Maj 2026 - "Uno-Orchestra: Parsimonious Agent Routing via Selective Delegation"**
Zrodlo: https://arxiv.org/pdf/2605.05007
Wzorzec "oszczednego" (parsimonious) routingu agentow - selektywna delegacja zamiast rozgłaszania zadania do
wszystkich potencjalnie pasujacych agentow. Cel: minimalizacja liczby wywolanych agentow/tokenow przy zachowaniu
jakosci.
**Relevancja WYSOKA:** bezposrednio zbiezne z filozofia projektu "mniejszy preset = tanszy, szybszy" (patrz
zasada auto-doboru presetu w CLAUDE.md uzytkownika: "przy watpliwosciach wybieraj mniejszy preset"). To swiezy
akademicki dowod na slusznosc tego podejscia - warto zacytowac w dokumentacji ROUTING_SYSTEM.md.

### Czerwiec 2026

**[Czerwiec 2026] "Autonomous Event-Driven Multi-Agent Orchestration for Enterprise AI at Scale"**
Zrodlo: https://arxiv.org/pdf/2606.20058
Odejscie od orkiestracji sterowanej zadaniami (task-driven, synchroniczny pipeline) na rzecz orkiestracji
sterowanej zdarzeniami (event-driven) dla systemow klasy enterprise - agenci reaguja na zdarzenia w kolejce
zamiast czekac w liniowym lancuchu.
**Relevancja NISKA dla samego produktu** (Claude Code subagents dzialaja synchronicznie w ramach jednej sesji),
ale warto jako pozycja w sekcji "co dalej / poza zakresem" encyklopedii - event-driven to kierunek dla duzych
wdrozen produkcyjnych, nie dla warsztatu edukacyjnego jednosesyjnego.

**[Czerwiec 2026] "The Confident Liar: Diagnosing Multi-Agent Debate with Log-Probabilities and LLM-as-Judge"**
Zrodlo: https://arxiv.org/pdf/2606.10296
**[Czerwiec 2026] "The Deliberative Illusion: Diagnosing Factual Attrition and Stance Homogenization in
Multi-Agent LLM Deliberation"**
Zrodlo: https://arxiv.org/pdf/2606.03032
Oba papiery to krytyczna rewizja wzorca "debate": pokazuja ze agenci w debacie moga tracic fakty w kolejnych
turach (factual attrition) i homogenizowac stanowiska (stance homogenization) zamiast konwergowac do prawdy -
tj. "zludzenie deliberacji". Rownolegle: "Emergence of Biased Consensus in Multi-Agent LLM Debates" (arXiv,
sierpien 2026, patrz nizej) pokazuje podobne ryzyko systematycznego biasu w konsensusie.
**Relevancja WYSOKA dla encyklopedii i presetow Five Minds / Deep Five Minds:** to jest najwazniejsze znalezisko
tego researchu. Projekt ma presety oparte na debacie miedzy agentami (`five-minds`, `five-minds-strategic`,
`deep-five-minds`) z rola "Devil's Advocate". Nowe badania z polowy 2026 pokazuja konkretne tryby awarii tego
wzorca: (1) fakty gina w kolejnych turach dyskusji, (2) agenci konwerguja do wspolnego stanowiska nie dlatego
ze jest sluszne, tylko bo nasladuja sie nawzajem (stance homogenization / biased consensus). **Rekomendacja:**
dodac do opisu presetow debate-owych ostrzezenie/best-practice: ogranicz liczbe tur debaty, wymuszaj
niezalezne pierwsze przejscie (independent first pass) przed ujawnieniem odpowiedzi innych agentow, i
rozwazyc twardy "fact-check checkpoint" miedzy turami - dokladnie to czym Devil's Advocate probuje byc, ale
teraz jest na to formalne uzasadnienie badawcze.

### Lipiec 2026

**[Lipiec 2026] Claude Agent SDK - Claude 5 family + Opus 4.8 + Haiku 4.5 support**
Zrodlo: https://www.totalum.app/blog/claude-code-subagents-totalum
SDK (dawniej Claude Code SDK, zmiana nazwy na poczatku 2026) dostaje wsparcie dla nowej rodziny modeli. Subagenci
maja wlasny kontekst, wlasne uprawnienia narzedziowe i wlasny model - lead agent widzi tylko finalne podsumowanie
subagenta, nigdy krokow posrednich.
**Relevancja WYSOKA - to bezposrednio dotyczy fundamentow projektu.** Warto zweryfikowac czy encyklopedia i
model routing w projekcie (Opus/Sonnet/Haiku dla roznych agentow) odzwierciedlaja najnowsza nazwe/numeracje
modeli (Opus 4.8, Haiku 4.5 - nowsze niz to co bylo dostepne przy budowie v32.16). To osobny watek do
zweryfikowania osobnym researchem/agentem (nie czesc tego RR2), ale flaguje sie jako pilne.

**[Lipiec 2026] "AI Agent Orchestration for Developers: The Complete 2026 Guide" (Fungies.io)**
oraz **"6 Multi-Agent Orchestration Patterns for Production (2026)" (Beam.ai)**
Zrodla: https://fungies.io/ai-agent-orchestration-developers-guide-2026/ ,
https://beam.ai/agentic-insights/multi-agent-orchestration-patterns-production
Konsolidacja rynkowa wokol trzech wzorcow: centralized orchestrator-worker, decentralized peer-to-peer mesh,
hierarchical multi-tier. Dane z badan branzowych: tylko 1 na 12 firm dziala w pelnej "multi-agent maturity"
(Level 3), wiekszosc utknela na Level 1 (AI Assistants) lub Level 2 (AI Compensators).
**Relevancja SREDNIA:** projekt juz pokrywa wzorzec orchestrator-worker (orkiestrator + workerzy) jako dominujacy
w wiekszosci presetow oraz hierarchiczny (Full Hierarchy = "Gold Standard" preset, 5 poziomow). Brakuje
zdecentralizowanego peer-to-peer mesh jako osobnego wzorca edukacyjnego - moze byc kandydatem do nowego presetu
lub przynajmniej sekcji encyklopedycznej "wzorce ktorych NIE mamy i dlaczego" (mesh jest trudny do kontrolowania
kosztowo, stad brak w produkcie nastawionym na przewidywalnosc kosztu).

### Sierpien 2026

**[arXiv 2607.26212, koniec lipca/poczatek sierpnia 2026] "Multi-Agent Debate Strategies: Survey, Taxonomy, and
Challenges"**
Zrodlo: https://arxiv.org/abs/2607.26212
Pierwszy powazny systematyczny przeglad (141 prac pierwotnych) nt. Multi-Agent Debate (MAD), z trojwymiarowa
taksonomia: uczestnicy debaty, mechanizmy interakcji, protokoly osiagania zgody (agreement protocols).
**Relevancja WYSOKA:** to jest "state of the art" mapa calego obszaru ktory projekt juz czesciowo pokrywa
(Five Minds). Warto uzyc tej taksonomii (participants / interaction mechanisms / agreement protocols) jako
ramy do opisania WLASNYCH wzorcow debaty w encyklopedii - pokazac gdzie na tej mapie mieszcza sie
`five-minds`, `five-minds-strategic`, `deep-five-minds`, `perf-squad` (Five Minds adversarial).

**[arXiv 2608.02827, sierpien 2026] "Emergence of Biased Consensus in Multi-Agent LLM Debates"**
Zrodlo: https://arxiv.org/html/2608.02827v1
Najswiezsze (dosl. ostatnie dni) potwierdzenie problemu z czerwca: agenci w debacie systematycznie zbiegaja do
wspolnego, ale nie koniecznie poprawnego, stanowiska - mechanizm spoleczny (konformizm modeli) a nie epistemiczny.
**Relevancja WYSOKA** - patrz sekcja czerwiec 2026 wyzej, to jest kontynuacja/wzmocnienie tego samego watku
badawczego. Razem z papierami z czerwca tworzy spojny, trojpapierowy dowod na koniecznosc dodania "anti-groupthink"
mechanizmow do presetow debate.

**[Sierpien 2026] Anthropic Developer Platform - Managed Agents + Admin API GA**
Zrodlo: https://releasebot.io/updates/anthropic (agregacja release notes)
GA dla: Admin API user management, Files API + Agent Skills support, Managed Agents controls (web access,
self-hosted sandbox memory stores), przeprojektowany Console session viewer z bogatsza obserwowalnoscia
(observability).
**Relevancja SREDNIA-WYSOKA:** "Agent Skills support" w Files API to potencjalnie bezposrednio zwiazane z
architektura Skills projektu (`~/.claude/skills/*.md`, 35 plikow). Warto, zeby osobny research sprawdzil czy
Anthropic wprowadzil natywny format/rejestr Skills ktory moze wplynac na `docs/SKILLS_ARCHITECTURE.md`.

**[Sierpien 2026] "Uno-Orchestra" i pokrewne prace o routing kosztowym**
Kontynuacja trendu z maja: routing/cascade jako dominujacy temat kosztowy. Ugruntowana definicja: cascade
routing wysyla kazde zapytanie najpierw do taniego modelu, sprawdza prog pewnosci (confidence threshold), i
eskaluje do drogiego modelu tylko przy niepowodzeniu. Redukcja kosztu: 40-85% (routing), 47-80% (routing +
cache + batching razem).
**Relevancja WYSOKA:** to jest dokladnie preset `cascade` w projekcie (Haiku -> Sonnet -> Opus, "70-80% tanio").
Aktualne dane z 2026 (40-85%, 47-80% z cache) sa zbiezne z deklarowanym zakresem projektu - mozna zacytowac
jako zewnetrzna walidacje liczb, i ewentualnie rozszerzyc opis presetu `cascade` o wzmianke ze polaczenie
routingu z cache'owaniem promptow (patrz kampania Research Tier 2 - Prompt Caching, juz w projekcie) daje
jeszcze wyzsza redukcje kosztu niz sam routing.

---

## Co dodac / zaktualizowac w projekcie

1. **Ostrzezenie o groupthink w presetach debate (WYSOKI priorytet).** Trzy niezalezne prace z 2026
   (2606.10296 Confident Liar, 2606.03032 Deliberative Illusion, 2608.02827 Biased Consensus) pokazuja spojny
   wzorzec awarii: multi-agent debate traci fakty i homogenizuje stanowiska w kolejnych turach. Dodac do opisow
   `five-minds`, `five-minds-strategic`, `deep-five-minds`, `perf-squad` sekcje "znane ograniczenia" +
   rekomendacje mitygacji (niezalezny pierwszy przebieg przed ujawnieniem cudzych odpowiedzi, limit tur,
   checkpoint fakt-checkingowy, rola Devil's Advocate jako czesciowa odpowiedz na ten problem).

2. **Zacytowac Uno-Orchestra (2605.05007) i dane o cascade routing (40-85%/47-80%) jako zewnetrzna walidacje**
   filozofii "mniejszy preset = tanszy" i presetu `cascade`. Dodac do `docs/ROUTING_SYSTEM.md`.

3. **Dodac notke edukacyjna o A2A + MCP jako dwuwarstwowym standardzie branzowym 2026** (poziomo: A2A dla
   koordynacji miedzy-agentowej; pionowo: MCP dla integracji z narzedziami) - kontekst dla uzytkownikow ktorzy
   pytaja "jak to dziala poza Claude Code". Niski priorytet implementacyjny, wysoki edukacyjny.

4. **Rozwazyc nowy wpis encyklopedyczny/preset dla wzorca "decentralized peer-to-peer mesh"** jako trzeci
   obok istniejacych orchestrator-worker i hierarchical - albo swiadomie udokumentowac w encyklopedii DLACZEGO
   projekt go NIE oferuje (nieprzewidywalny koszt, trudna audytowalnosc - sprzeczne z misja edukacyjna projektu).

5. **Sprawdzic osobnym researchem aktualnosc numeracji modeli** (Opus 4.8, Haiku 4.5, "Claude 5 family" wg stanu
   na lipiec 2026) w stosunku do modeli uzywanych w routingu presetow v32.16 - to wymaga dedykowanego
   sprawdzenia poza zakresem tego raportu.

6. **Sprawdzic czy Anthropic "Agent Skills support" w Files API (GA sierpien 2026) wplywa na format Skills**
   uzywany przez projekt (`generate_skills.js`, `~/.claude/skills/*.md`) - moze byc okazja do natywnej
   integracji zamiast wlasnego generatora, albo potwierdzenie ze obecne podejscie jest zgodne z kierunkiem
   Anthropic.

7. **Niski priorytet:** zaktualizowac dane porownawcze frameworkow (CrewAI v1.10.x z A2A/MCP/streaming,
   Google ADK v2.0 graph-based GA maj 2026) jesli projekt gdziekolwiek zawiera porownanie
   Claude Code vs LangGraph/CrewAI/ADK - obecne dane moga byc sprzed tych wydan.

---

## Zrodla (zbiorczo)

- https://arxiv.org/pdf/2606.20058 - Autonomous Event-Driven Multi-Agent Orchestration for Enterprise AI at Scale
- https://arxiv.org/pdf/2605.05007 - Uno-Orchestra: Parsimonious Agent Routing via Selective Delegation
- https://fungies.io/ai-agent-orchestration-developers-guide-2026/
- https://beam.ai/agentic-insights/multi-agent-orchestration-patterns-production
- https://www.digitalapplied.com/blog/multi-agent-orchestration-5-patterns-that-work
- https://arxiv.org/abs/2601.13671 - The Orchestration of Multi-Agent Systems: Architectures, Protocols, Enterprise Adoption
- https://arxiv.org/abs/2505.19591 - Multi-Agent Collaboration via Evolving Orchestration
- https://www.requesty.ai/blog/best-ai-agent-sdks-compared-2026-langchain-crewai-openai-anthropic-google
- https://www.morphllm.com/ai-agent-framework
- https://www.langchain.com/resources/ai-agent-frameworks
- https://arxiv.org/pdf/2511.07784 - Can LLM Agents Really Debate? A Controlled Study
- https://arxiv.org/html/2604.24881v1 - Latent Agents: Internalized Multi-Agent Debate (IMAD)
- https://arxiv.org/pdf/2602.00454 - Cross-Modal Memory Compression for Efficient Multi-Agent Debate
- https://arxiv.org/abs/2607.26212 - Multi-Agent Debate Strategies: Survey, Taxonomy, and Challenges
- https://arxiv.org/html/2608.02827v1 - Emergence of Biased Consensus in Multi-Agent LLM Debates
- https://arxiv.org/pdf/2606.10296 - The Confident Liar: Diagnosing Multi-Agent Debate with Log-Probabilities
- https://arxiv.org/pdf/2606.03032 - The Deliberative Illusion
- https://www.velsof.com/ai-automation/multi-llm-orchestration-patterns/
- https://www.digitalapplied.com/blog/llm-model-routing-2026-cost-quality-optimization-engineering-guide
- https://neuraltrust.ai/blog/llm-model-routing
- https://www.resumelens.org/blog/ai/llm-routing-cascades
- https://www.cometapi.com/cutting-llm-api-costs-in-half-a-model-routing-guide-for-production-workloads-in-2026/
- https://www.totalum.app/blog/claude-code-subagents-totalum
- https://www.totalum.app/blog/claude-agent-sdk-totalum-2026
- https://releasebot.io/updates/anthropic
- https://www.joinnextdev.com/a/crewai/crewai-v1101-multi-agent-ai-just-got-serious
- https://www.agilesoftlabs.com/blog/2026/06/crewai-in-production-2026-real-lessons
- https://atlan.com/know/agent-interoperability-protocols/
- https://arxiv.org/pdf/2601.02371 - Permission Manifests for Web Agents
- https://arxiv.org/pdf/2602.11327 - Security Threat Modeling for Emerging AI-Agent Protocols
- https://zylos.ai/research/2026-03-26-agent-interoperability-protocols-mcp-a2a-acp-convergence/
- https://zylos.ai/research/2026-02-15-agent-to-agent-communication-protocols/
- https://arxiv.org/html/2604.00901v1 - Experience as a Compass: Multi-agent RAG with Evolving Orchestration
