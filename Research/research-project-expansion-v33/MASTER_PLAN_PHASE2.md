# MASTER_PLAN PHASE 2 - External trend research

Kontekst: user zatwierdzil kierunek (patrz plans/SYNTHESIS.md + HITL odpowiedzi Q1-Q5). Faza 1 (lokalny skan)
zakonczona. Faza 2: GLEBOKI research zewnetrzny (web) - co jest aktualnie modne/best-practice w AI agentach i
multi-agent presetach, jakie wzorce stosuja profesjonalisci, co dodac zeby projekt (35->37 agentow, 42->44
presety, publiczny na GitHub, ~70 stars) spelnial najwyzsze standardy i byl uzywalny szeroko (nie tylko dla
software developerow - user chce non-dev-centryczny rozwoj: research + content creation).

Priorytet: dokladnosc/glebokosc nad oszczednoscia tokenow (explicit user instruction "nie oszczedzaj na agentach").

## 7 pytan badawczych (web research, prawdziwe WebSearch/WebFetch)

**R1 - Trendy w architekturach multi-agent 2026.** Jakie wzorce orkiestracji agentow AI sa aktualnie uznawane za
best-practice (orchestrator-worker, swarm, hierarchical, blackboard, debate/critique patterns)? Co pisza
Anthropic, OpenAI, Google o projektowaniu multi-agent systems w 2026? Jakie nowe prymitywy (np. subagents,
skills, MCP) zmienily standardowe podejscie w ostatnim roku?

**R2 - Agenci/prompty do research i content creation (nie software).** Jakie sa najlepsze publiczne przyklady
agentow AI dedykowanych do: researchu decyzyjnego/konsumenckiego, pisania tresci (CV, cover letters, posty
social media, emaile), copywritingu w konkretnym stylu/glosie autora, content strategy. Szukaj konkretnych
promptow/frameworkow (np. z awesome-claude-code, awesome-chatgpt-prompts, subagent marketplace repo, dedykowane
narzedzia jak Jasper/Copy.ai patterns jesli publicznie opisane).

**R3 - GitHub: najpopularniejsze kolekcje agentow/presetow Claude Code.** Przeszukaj GitHub pod katem repo z
duza liczba gwiazdek: kolekcje subagentow Claude Code, .claude/agents/ marketplace, community skill packs.
Co sie w nich powtarza, jakie kategorie agentow dominuja, jak sa zorganizowane/skategoryzowane (to bezposrednio
zasila pytanie 1 z tej rozmowy: jak podzielic prezentacje presetow wizualnie/kategoryzacyjnie).

**R4 - Reddit/fora: realne opinie praktykow o subagentach i presetach.** r/ClaudeAI, r/LocalLLaMA, Hacker News,
Claude Code Discord (jesli dostepne publicznie) - jakie agenty/workflow ludzie faktycznie chwala, na co
narzekaja (np. za duzo agentow = confusion, potrzeba lepszej kategoryzacji), jakie "brakujace" agenty czesto
sie pojawiaja w dyskusjach.

**R5 - X/Twitter: najnowsze ogloszenia i demo agentow AI.** Najnowsze pokazy/ogloszenia dot. agent
orchestration, content-writing agents, personal-style copywriter agents, consumer research agents. Kto buduje
co, jakie sa nazwy wzorcow ktore zdobywaja popularnosc (np. "agent swarms", "personas", "voice cloning for
writing").

**R6 - Dokumentacja oficjalna: Claude Skills, Subagents, MCP best practices dla non-dev use-cases.** Oficjalna
dokumentacja Anthropic (docs.claude.com) pod katem: jak projektowac skills/agents dla zadan innych niz
kodowanie, jak kategoryzowac/tagowac duze kolekcje agentow dla latwej nawigacji uzytkownika, jakies wzorce UX
dla "agent marketplace"/katalogow.

**R7 - Kategoryzacja i UX duzych kolekcji agentow/presetow (odpowiedz na p.1 usera).** Zbadaj jak inne
narzedzia/platformy (np. GitHub Actions marketplace, VS Code extensions marketplace, Zapier templates,
n8n workflow library) rozwiazuja problem "duzo elementow do przegladania" - jakie systemy tagow/kategorii/
filtrow/ikon sa uznawane za najlepsze UX practice przy 40+ elementach do wyboru. To ma zasilic rekomendacje
do wizualnej klasyfikacji presetow (bez zmiany calego designu - tylko system kategoryzacji/tagow).

## Target output
SYNTHESIS_EXTERNAL.md: 8-10k slow w plans-external/, z sekcja Executive Summary + per-pytanie synteza +
finalna lista konkretnych rekomendacji (nowi agenci z nazwa robocza + opisem, nowe presety, system kategoryzacji)
gotowa do przejscia w faze implementacji.
