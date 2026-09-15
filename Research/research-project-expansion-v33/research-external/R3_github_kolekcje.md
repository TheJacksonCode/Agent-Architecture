# R3: GitHub - kolekcje agentow Claude Code, subagent packs, marketplace listy

Data researchu: 2026-08-21
Metoda: WebSearch + WebFetch (bezposrednie odwiedziny stron GitHub repo/README)
Kontekst zamowienia: "Agent Architecture Designer" (37 agentow, 44 presetow, ~70 gwiazdek) - benchmark pokrycia kategorii + wzorzec kategoryzacji/UX duzych kolekcji.

---

## Tabela repo (posortowane wg popularnosci)

| # | Repo | Gwiazdki (przyblizone, sierpien 2026) | URL | Skala | Czego uczy |
|---|------|----------------------------------------|-----|-------|------------|
| 1 | **hesreallyhim/awesome-claude-code** | ~52k (rosnie bardzo szybko, byl 21.6k na poczatku 2026) | https://github.com/hesreallyhim/awesome-claude-code | "Awesome list" - dziesiatki podkategorii: skills, slash commands, CLAUDE.md files, CLI tools, workflows, statuslines, pluginy | Wzorzec kuratorskiej "awesome listy" - nie sam kod, tylko linki do innych repo z opisami. Ma tez wersje alternatywne (`README_ALTERNATIVES/README_FLAT_ALL_AZ.md`) - flat A-Z lista jako fallback dla kogos kto nie lubi kategorii. |
| 2 | **wshobson/agents** | ~39k | https://github.com/wshobson/agents | 202 agentow, 92 pluginy, 181 skills, 105 commands, 16 orkiestratorow | Najwiekszy "produkcyjny" zestaw subagentow. Multi-harness (dziala w Claude Code, Codex CLI, Cursor, OpenCode, Antigravity, GitHub Copilot) z jednego zrodla Markdown. Kategorie: Architecture, Languages, Infrastructure, Security, Data, Machine Learning, Documentation, Business, SEO. |
| 3 | **VoltAgent/awesome-claude-code-subagents** | ~24.5k (rozbiezne zrodla podawaly 7.8k-24.5k w zaleznosci od daty snapshotu) | https://github.com/VoltAgent/awesome-claude-code-subagents | 158+ subagentow w 10 kategoriach, mapowane na instalowalne pluginy | Najlepszy wzorzec czystej TAKSONOMII: 10 kategorii ponumerowanych folderow (`categories/01-core-development/`, `02-language-specialists/`...), emoji jako marker kategorii, kazdy agent = osobny plik `.md` z front-matterem. |
| 4 | **vijaythecoder/awesome-claude-agents** | ~4.4k | https://github.com/vijaythecoder/awesome-claude-agents | 24 agentow w 4 warstwach | Wzorzec "orchestrator + teams": Orchestrators (3) -> Framework Specialists (13, per-stack: Laravel/Django/Rails/React/Vue) -> Universal Experts (4) -> Core Team (4: reviewer, performance, docs, archaeologist). Bliskie koncepcyjnie do "preset = zespol" z projektu Maciej'a. |
| 5 | **davepoon/claude-code-subagents-collection** (alias "Build with Claude") | ~3.3k (starsze zrodlo podawalo 1.5k) | https://github.com/davepoon/claude-code-subagents-collection | 117 agentow, 175 commands, 28 hooks, 26 skills, 51 pluginow, w 11 kategoriach | Jedyne repo z tej listy, ktore ma **oddzielna strone webowa** (buildwithclaude.com) jako interaktywna galerie z wyszukiwarka, filtrami po kategorii i "one-click copy install command". To najblizszy odpowiednik strony HTML projektu Maciej'a. |
| 6 | **rahulvrane/awesome-claude-agents** | niszowe (setki gwiazdek) | https://github.com/rahulvrane/awesome-claude-agents | mala kolekcja | Mniej istotne, wzmianka poboczna. |
| 7 | **cline/prompts** | oficjalne repo Cline (community-driven) | https://github.com/cline/prompts | biblioteka promptow/workflow dla Cline, przegladalna wewnatrz rozszerzenia | Pokazuje wzorzec spoza Claude Code: "Prompts Library" wbudowana w produkt, nie tylko README na GitHubie. |
| 8 | **instructa/ai-prompts** | ~1.1k | https://github.com/instructa/ai-prompts | prompty dla Cursor Rules, Cline, Windsurf, Copilot | Multi-tool prompt pack, kategoryzacja wg fazy projektu (scaffolding, coding standards, review). |
| 9 | **thehimel/cursor-rules-and-prompts** | mniejsze, kilkaset gwiazdek | https://github.com/thehimel/cursor-rules-and-prompts | rules dla Cursor po kategoriach: Code Style, Organization, Documentation, Infrastructure | Pokazuje, ze poza "co robi agent" mozna kategoryzowac tez "na jakim etapie projektu dziala". |
| 10 | **DVC2/cursor-agent-configs** | mniejsze | https://github.com/DVC2/cursor_prompts | `.mdc` rules dla Cursor, Codex, Copilot, Gemini CLI, Aider, Windsurf, Zed | Przyklad "write once, apply everywhere" - podobnie jak wshobson/agents, ale dla rules a nie agentow. |

Uwaga metodologiczna: liczby gwiazdek dla repo #2 i #3 sa niespojne miedzy zrodlami (agregatory typu Ecosyste.ms i dev.to artykuly cytuja starsze snapshoty). Rzad wielkosci jest jednak jasny: awesome-claude-code (hesreallyhim) dominuje jako meta-lista (~50k), wshobson/agents jako najwiekszy zestaw samych agentow/pluginow (~39k), VoltAgent jako druga najwieksza czysta kolekcja subagentow (~20-25k). Reszta to niszowe repo w przedziale 1-5k gwiazdek.

---

## Powtarzajace sie kategorie agentow

Zestawiajac wszystkie repo (wshobson, VoltAgent, davepoon, vijaythecoder) widac wyrazny rdzen kategorii, ktory powtarza sie niezaleznie od autora:

### Kategorie "core" (obecne praktycznie wszedzie)
1. **Code Reviewer / Code Quality** - najczesciej wystepujacy pojedynczy agent w ogole (jest w kazdym z 4 duzych repo).
2. **Debugger / Bug Hunter** - drugi najpopularniejszy.
3. **Security Auditor / Pentester / STRIDE-style scanner** - obecny w kazdej kolekcji, czesto jako osobna kategoria "Quality & Security".
4. **Backend Developer / Backend Architect** - per-jezyk (Python, Go, Node, Rust) lub uniwersalny.
5. **Frontend Developer / UI Engineer** - analogicznie, czesto per-framework (React, Vue).
6. **DevOps / Infrastructure / SRE / Cloud Architect** - Kubernetes, Terraform, CI/CD.
7. **Data Engineer / Data Scientist / ML Engineer** - kategoria "Data & AI" wystepuje w VoltAgent, wshobson (osobno Data i Machine Learning), davepoon.
8. **API Designer** - REST/GraphQL, czesto osobny agent.
9. **Test Engineer / QA Automation** - generowanie testow, e2e.
10. **Documentation Specialist / Technical Writer**.
11. **Performance Optimizer**.
12. **Database Architect / DBA**.

### Kategorie "drugiej warstwy" (czeste, ale nie uniwersalne)
- **Orchestrator / Tech Lead / Project Analyst** - koordynacja innych agentow (silnie obecne u vijaythecoder jako fundament architektury "orchestrator + teams", u wshobson jako "16 orkiestratorow").
- **Language Specialists** - jeden agent per jezyk (Python, Go, Rust, TypeScript, Java, Ruby) - to jest osobna, bardzo rozbudowana kategoria u VoltAgent i wshobson.
- **Framework Specialists** - Laravel, Django, Rails, Next.js - dominuje u vijaythecoder.
- **Business & Product** - product manager, business analyst, SEO specialist (u wshobson jest osobna kategoria "Business" i "SEO").
- **Crypto/Blockchain** - niszowa ale pojawia sie u davepoon jako osobna kategoria.
- **Meta & Orchestration / Team Configurator** - agent ktory buduje/konfiguruje zespol innych agentow (VoltAgent ma to jako kategorie #9 "Meta & Orchestration"; vijaythecoder ma dedykowanego "Team Configurator").
- **Research & Analysis** - osobna kategoria u VoltAgent (#10), analogiczna do "researcherow" w presetach Maciej'a.
- **Code Archaeologist** - specyficzny, ale powtarzalny typ (analiza legacy/nieznanego kodu) - u vijaythecoder w "Core Team".

### Obserwacja porownawcza vs. projekt Maciej'a
37 agentow projektu wyglada na dobrze pokrywajace rdzen (1-12 powyzej) - to typowa liczba dla "srodniego" repo (miedzy davepoon 117 a vijaythecoder 24). Warto sprawdzic explicite czy w zestawie jest odpowiednik: (a) dedykowanego "Team Configurator/Meta-orchestrator" (agent ktory dobiera zespol - koncepcyjnie to juz robi system PRESET_CATALOG.md, ale nie jako osobny "agent" w encyklopedii), (b) per-language specialists (najwieksze repo maja 10+ agentow tylko od jezykow - Maciej raczej ma agentow generycznych typu "Backend Developer" bez podzialu jezykowego, co jest swiadomym uproszczeniem, nie luka).

---

## Wzorce kategoryzacji/UX duzych kolekcji

To jest kluczowa czesc dla zadania Maciej'a (jak podzielic 44 presety zeby user sie nie zgubil). Ponizej wzorce z realnych repo, od najprostszych do najbardziej rozbudowanych.

### 1. Numerowane foldery + emoji-kategorie (VoltAgent) - NAJLEPSZY WZORZEC dla "duzej plaskiej listy"
VoltAgent dzieli 158 agentow na dokladnie **10 ponumerowanych folderow**: `01-core-development/`, `02-language-specialists/`, `03-infrastructure/`, `04-quality-security/`, ... `10-research-analysis/`. Numeracja wymusza kolejnosc czytania (od najbardziej uniwersalnych do najbardziej niszowych) i eliminuje pytanie "gdzie to jest". Kazda kategoria ma tez emoji-badge w README (np. 🧰 dla core dev, 🔒 dla security) uzywane konsekwentnie jako "kolorowy" marker skanowalny wzrokiem bez czytania tekstu. To bezposrednio przekladalne na system tagow/kolorow dla 44 presetow: przypisac kazdemu presetowi jedna z ~8-10 numerowanych kategorii + staly emoji/kolor.

### 2. Tabela z kolumnami Type/Count/Description (davepoon, wshobson)
Zamiast prozy, README otwiera sie tabela podsumowujaca: `Agents | 117 | opis`, `Commands | 175 | opis`, `Hooks | 28 | opis` itd. To daje uzytkownikowi natychmiastowy "inventory snapshot" przed zanurzeniem sie w szczegoly - dobry wzorzec dla strony glownej Agent Architecture Designer (juz czesciowo stosowany, warto utrzymac/wzmocnic).

### 3. Interaktywna galeria webowa (davepoon -> buildwithclaude.com)
Jedyny z analizowanych projektow ktory wyszedl poza README i zrobil dedykowana strone z: wyszukiwarka tekstowa, filtry po kategorii (dropdown/chipy), one-click "copy install command", podglad dokumentacji per-agent bez opuszczania strony. To jest dokladnie model, ktory Agent Architecture Designer juz realizuje jako single-HTML app - potwierdza, ze ten kierunek (wizualny konfigurator zamiast plaskiego README) jest slusznym, rzadko realizowanym przez konkurencje wyborem i realna przewaga.

### 4. Warstwowa hierarchia rol (vijaythecoder) - wzorzec dla PRESETOW, nie agentow
Zamiast kategorii tematycznych, vijaythecoder dzieli agentow na **warstwy funkcjonalne w procesie pracy zespolu**: Orchestrators -> Specialists -> Universal Experts -> Core (cross-cutting QA). To jest wzorzec bardziej "organizacyjny" niz "tematyczny" i bardzo bliski koncepcji presetow Maciej'a (preset = uklad agentow w pipeline). Rekomendacja: dla 44 presetow rozwazyc DRUGI wymiar kategoryzacji obok tematu (np. "zlozonosc/rozmiar zespolu": Solo -> Trio -> Squad -> Full Hierarchy -> Deep Five Minds), tak jak juz czesciowo istnieje w nazwach presetow, ale uczynic to jawnym filtrem/osi w UI.

### 5. Meta-lista z wieloma widokami alternatywnymi (hesreallyhim/awesome-claude-code)
Najciekawszy detal: to repo utrzymuje NIE JEDNĄ, ale kilka wersji tej samej listy w folderze `README_ALTERNATIVES/` - m.in. plaska lista A-Z (`README_FLAT_ALL_AZ.md`) obok kategoryzowanej. To uznaje, ze rozni uzytkownicy chca przegladac na rozne sposoby (jedni wg kategorii, inni wg alfabetu, inni wg popularnosci). Dla 44 presetow: rozwazyc w UI prosty toggle "Kategorie / A-Z / Wg liczby agentow (koszt)" zamiast wymuszania jednego layoutu.

### 6. Badge/kompatybilnosc jako osobny wymiar tagowania (wshobson)
wshobson/agents oznacza kazdy plugin badge'ami kompatybilnosci narzedzi (Claude Code / Codex / Cursor / OpenCode / Antigravity / Copilot). To pokazuje wzorzec "tagi nie musza byc tylko tematyczne" - moga kodowac tez metadane techniczne (tutaj: gdzie dziala). Dla Agent Architecture Designer analogia: tagi typu "model" (Haiku/Sonnet/Opus) lub "koszt" jako osobny wymiar filtrowania obok kategorii tematycznej - to zreszta juz czesciowo istnieje (routing modeli), warto upewnic sie ze jest widoczne jako filtr/tag a nie tylko opis w encyklopedii.

### 7. Plugin-first install UX jako trend 2026
Wszystkie duze repo (wshobson, VoltAgent, davepoon) migrowaly w 2026 do modelu "plugin marketplace": `/plugin marketplace add`, `/plugin install`. To jest natywny mechanizm Claude Code do dystrybucji skills/agents/commands jako spakowana jednostka. Nie jest to bezposrednio kategoryzacja wizualna, ale wplywa na strukture folderow (kazda kategoria = osobny instalowalny plugin), co usprawnia "instaluj tylko czego potrzebujesz" zamiast kopiowania calego repo. Warto rozwazyc, czy 44 presety/37 agentow Maciej'a mogloby zostac zapakowane jako oficjalny Claude Code plugin/marketplace entry - to zwiekszyloby odkrywalnosc poza samym GitHub.

---

## Rekomendacje dla Agent Architecture Designer (synteza)

1. **Pokrycie kategorii jest solidne** - 37 agentow mieści się w rdzeniu kategorii powtarzajacych sie we wszystkich duzych repo (code review, debug, security, backend, frontend, devops, data/ML, docs, testing, performance, DB). Nie ma pilnej luki "brakujacego typu agenta" w porownaniu do rynku.
2. **Rozwazyc dodanie jawnej kategorii "Meta/Orchestration"** jesli jeszcze nie istnieje jako oddzielny tag - VoltAgent i vijaythecoder oba traktuja "agent ktory dobiera/koordynuje innych agentow" jako osobna, nazwana kategorie, nie tylko funkcje ukryta w architekturze.
3. **Dla 44 presetow: przyjac numerowany system kategorii + staly kolor/emoji per kategoria** (wzorzec VoltAgent #1) - to najbardziej przetestowany i najlatwiej skanowalny wzorzec sposrod analizowanych repo.
4. **Dodac drugi wymiar filtrowania: "rozmiar zespolu/koszt"** (Solo -> Trio -> Squad -> Deep Five Minds), inspirowane warstwowym modelem vijaythecoder - to bezposrednio odpowiada na pytanie uzytkownika "ktory preset jest tani/szybki a ktory drogi/dokladny".
5. **Rozwazyc toggle widoku** (Kategorie / A-Z / Koszt) zamiast jednego sztywnego ukladu, wzorem hesreallyhim/awesome-claude-code.
6. **Silna przewaga konkurencyjna projektu**: bycie single-HTML interaktywnym konfiguratorem (nie tylko README) - z analizowanych 10 repo tylko davepoon poszedl w te strone (osobna strona www), reszta zostaje na poziomie README + tabelki. To potwierdza, ze kierunek wizualny jest rzadki i wartosciowy, warto go dalej rozwijac i wyeksponowac jako USP przy ewentualnej promocji projektu.
7. **Rozwazyc oficjalna dystrybucje jako Claude Code plugin/marketplace entry** - trend 2026 idzie w strone `/plugin install` zamiast "sklonuj repo recznie", co jest gorszym doswiadczeniem niz obecne demo HTML, ale moze byc dodatkowym kanalem dystrybucji rownolegle do strony.

---

## Zrodla

- [wshobson/agents](https://github.com/wshobson/agents)
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)
- [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [hesreallyhim/awesome-claude-code - flat A-Z alternative view](https://github.com/hesreallyhim/awesome-claude-code/blob/main/README_ALTERNATIVES/README_FLAT_ALL_AZ.md)
- [davepoon/claude-code-subagents-collection](https://github.com/davepoon/claude-code-subagents-collection)
- [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents)
- [rahulvrane/awesome-claude-agents](https://github.com/rahulvrane/awesome-claude-agents)
- [cline/prompts](https://github.com/cline/prompts)
- [instructa/ai-prompts](https://github.com/instructa/ai-prompts)
- [thehimel/cursor-rules-and-prompts](https://github.com/thehimel/cursor-rules-and-prompts)
- [DVC2/cursor-agent-configs](https://github.com/DVC2/cursor_prompts)
- [Ecosyste.ms Awesome listing - wshobson/agents](https://awesome.ecosyste.ms/projects/github.com/wshobson/agents)
- [Ecosyste.ms Awesome listing - davepoon/claude-code-subagents-collection](https://awesome.ecosyste.ms/projects/github.com/davepoon/claude-code-subagents-collection)
- [dev.to - "I Built 100 Claude Code Subagents"](https://dev.to/suraj_khaitan_f893c243958/i-built-100-claude-code-subagents-these-are-the-12-that-actually-earn-their-context-10nn)
