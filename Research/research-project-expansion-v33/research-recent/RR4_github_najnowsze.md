# RR4: Najnowsze w kolekcjach agentow GitHub (luty-sierpien 2026)

Zakres: wylacznie zmiany z ostatnich 6 miesiecy (luty 2026 - sierpien 2026). Zrodla: wyszukiwania web (GitHub, blogi, DeepWiki, market.dev, agregatory ekosystemu Claude Code). Gwiazdki i liczby sa przyblizone - GitHub nie udostepnia historycznych snapshotow w wyszukiwarce, wiec podane wartosci pochodza z artykulow/researchow trzecich stron datowanych w podanym okresie, nie z bezposredniego API GitHub.

---

## 1. wshobson/agents - najwiekszy skok w calym ekosystemie

To zdecydowanie najwazniejsza zmiana ostatniego polrocza w calej niszy "kolekcje agentow dla Claude Code".

- **Luty 2026:** repo mialo ok. 29K gwiazdek, funkcjonowalo jako klasyczna kolekcja "production-ready subagents for Claude Code".
- **Czerwiec 2026:** ok. 36.6K gwiazdek, ~3.9K forkow.
- **Sierpien 2026 (stan biezacy):** projekt przeszedl transformacje z "kolekcji agentow" w **"multi-harness agentic plugin marketplace"** - repo zmienilo pozycjonowanie i strukture. Nowy opis na GitHubie: "Multi-harness agentic plugin marketplace for Claude Code, Codex CLI, Cursor, OpenCode, GitHub Copilot, and Gemini CLI / Google Antigravity".
- Skala urosla dramatycznie: z pojedynczych agentow do **92 pluginow, 202 agentow, 181 skilli, 105 komend** (jedna wersja researchu podaje tez wariant 84 plugins / 192 agents / 156 skills / 102 commands / 16 orchestratorow - rozne snapshoty w trakcie ciaglego wzrostu, ale rzad wielkosci ten sam: liczby **nieomal podwoily sie od lutego 2026**).
- Kluczowa architektoniczna zmiana: model "jedno zrodlo prawdy" (`plugins/`) dystrybuowane do **piatego harnessow** (Claude Code, Codex CLI, Cursor, OpenCode, GitHub Copilot, Gemini CLI/Antigravity) - kazdy dostaje artefakty natywne dla danego narzedzia, a nie jeden uniwersalny lowest-common-denominator format.
- Pojawila sie tez kategoria **16 "orchestratorow"** jako osobny typ artefaktu (nie zwykly agent, nie zwykly plugin) - to jest nowa kategoria, ktorej wczesniej (luty 2026) nie bylo w tej formie.

**Dlaczego to wazne:** wshobson/agents przeszedl z "kolekcji promptow" do prawdziwego cross-tool marketplace z instalacja per-plugin. To najblizszy konkurent koncepcyjnie do "konfiguratora" - ale skupiony na instalacji/dystrybucji, nie na edukacji/wizualizacji jak Agent Architecture Designer.

---

## 2. VoltAgent/awesome-claude-code-subagents - stabilny wzrost, nowe kategorie meta

- Kolekcja urosla do **158+ subagentow w 10 kategoriach** (wczesniej opisywana jako "100+ subagentow").
- Aktywnosc w 2026 nieprzerwana - PR-y z czerwca 2026: dodanie **"claude-code-arsenal" do kategorii Meta & Orchestration** (28 czerwca 2026) oraz dodanie **"operating-kit" subagentow** pokrywajacych session lifecycle, deploy, code-review, prod-logs (25 czerwca 2026).
- Nowa kategoria funkcjonalna, ktora sie wyklarowala w tym polroczu: **"Meta & Orchestration"** jako pelnoprawna kategoria agentow-orkiestratorow (agenci zarzadzajacy innymi agentami), a nie tylko agenci wykonawczy.
- Otwarte issues z lipca 2026 (#300, #301) pokazuja ciagla, zywa spoleczna prace nad rozszerzeniem.

**Dlaczego to wazne:** VoltAgent trzyma sie modelu "czysta biblioteka promptow / kategorii", ale rozszerza sie w strone "agentow zarzadzajacych agentami" - to konceptualnie zblizone do naszych presetow (orkiestracja wielu agentow), ale bez warstwy wizualnej.

---

## 3. davepoon/claude-code-subagents-collection + buildwithclaude.com - platforma, nie tylko repo

- Kolekcja: **43+ wyspecjalizowanych subagentow, 39+ slash commands, 100+ MCP serwerow**.
- Kluczowa roznica wobec innych repo: davepoon rozwinal wokol repo pelna **strone webowa buildwithclaude.com** z UI do przegladania/wyszukiwania/instalacji agentow i komend, plus **CLI `bwc-cli`** (`npm install -g bwc-cli`, komendy `bwc init`, `bwc add --agent`, `bwc add --command`, `bwc list`, `bwc search`).
- To jest najblizszy istniejacy odpowiednik "wizualnego katalogu/konfiguratora agentow" w publicznym ekosystemie - ale jest to **katalog instalacyjny** (przegladasz -> instalujesz do swojego projektu), nie **edukacyjny wizualizator** pokazujacy jak agenci myslą, wspolpracuja i ile kosztuja (czyli nie robi tego, co robi Agent Architecture Designer).
- Brak w wynikach danych o dokladnym wzroscie gwiazdek/uzytkownikow bwc-cli w tym polroczu - aktywnosc widoczna (releases na GitHub), ale bez twardych liczb.

---

## 4. hesreallyhim/awesome-claude-code - najwiekszy pojedynczy katalog "awesome list"

- **51,746 gwiazdek** (stan na moment researchu, sierpien 2026) - to czyni go najwiekszym pojedynczym punktem odniesienia w calym ekosystemie Claude Code (nie tylko agentow, ale wszystkich zasobow: skille, statuslines, tooling, pluginy).
- **203 zasoby** w katalogu, ostatnia duza aktualizacja **1 lipca 2026**.
- W sierpniu 2026 trwa aktywna runda nowych zgloszen zasobow (submission/review pipeline widoczny na 20 sierpnia 2026).
- Model kuratorski: hesreallyhim recznie ocenia narzedzia - "tools that don't work get cut, tools that do work get tagged with what they're actually for" - czyli to nie jest automatyczny agregator, tylko recznie moderowana lista jakosciowa.
- Nowa iteracja listy (2026) zostala uruchomiona z jawnym celem podkreslenia zasobow **nieobecnych w poprzedniej iteracji** - sygnal, ze kategoria "agent collections / subagent frameworks" w tej liscie stale sie odswieza nowymi wpisami w miare jak powstaja nowe narzedzia.

**Dlaczego to wazne:** to najwazniejszy kanal dystrybucji/odkrywalnosci w calym ekosystemie. Bycie wymienionym tutaj (jesli Agent Architecture Designer jeszcze nie jest) to prawdopodobnie najwiekszy pojedynczy dzwigniowy krok do zwiekszenia widocznosci.

---

## 5. Oficjalny marketplace pluginow Anthropic (claude-plugins-official) - NOWA, kluczowa zmiana strukturalna

To jest najwazniejsza zmiana **platformowa** (nie spolecznosciowa) tego polrocza:

- Anthropic uruchomil/rozwinal oficjalne repo **`anthropics/claude-plugins-official`** - marketplace pluginow zarejestrowany automatycznie przy pierwszym uruchomieniu Claude Code (zero setupu).
- **Lipiec 2026: ponad 200 pluginow** w oficjalnym markecie, liczba stale rosnie.
- Ok. **20 pluginow first-party** od Anthropic (dev-workflow tools, frontend-design, skill-creator, output styles, 11 language serverow), reszta to zweryfikowane integracje partnerow.
- Instalacja jedna komenda: `/plugin install <nazwa>@claude-plugins-official`.
- **6 marca 2026** uruchomiono osobno **Claude Enterprise Marketplace** - integracje enterprise (Snowflake, GitLab, Replit) dostepne w interfejsie webowym Claude, kierowane do firm, nie deweloperow indywidualnych.

**Dlaczego to wazne:** to zmienia punkt odniesienia "co jest standardem" - Anthropic wszedl bezposrednio w przestrzen, ktora wczesniej byla wylacznie spoleczna (wshobson, VoltAgent, davepoon). Oficjalny marketplace z automatyczna rejestracja i jedno-komendowa instalacja podnosi bar oczekiwan uzytkownikow co do UX instalacji/discoverability.

---

## 6. Nowe/rosnace projekty, ktore wczesniej nie byly widoczne

Kilka repo pojawiajacych sie w wynikach z 2026, wskazujacych na nowe kierunki:

- **rohitg00/awesome-claude-code-toolkit** - opisywany jako "najbardziej kompleksowy toolkit dla Claude Code": **135 agentow, 35 skilli, 42 komendy, 176+ pluginow, 20 hookow, 15 rules, 7 szablonow, 14 konfiguracji MCP, 26 companion apps, 52 wpisy ekosystemowe**. To nowy, bardzo szeroki agregator laczacy wszystkie warstwy (agenci + hooki + MCP + companion apps) w jednym repo - kategoria "super-toolkit" ktora nie istniala w tej formie wczesniej.
- **kubony/claude-code-visualizer** - "Interactive visual analytics for Claude Code sessions, costs, context usage, and agent workflows" - **to jest najblizszy koncepcyjnie konkurent** do warstwy wizualnej Agent Architecture Designer, ale skupiony na **analityce sesji na zywo** (koszty, context usage, przebieg workflow), a nie na edukacyjnej encyklopedii/konfiguratorze przed uruchomieniem. Rozne zastosowanie: jeden pokazuje "co sie stalo", drugi (nasz) pokazuje "jak to zaprojektowac zanim wydasz token".
- **Ngxba/claude-code-cli-ui** - wizualny edytor `.claude/agents/*.md`, wizualna mapa agentow/komend/skilli, budowanie multi-step pipeline'ow przez laczenie agentow w UI. To jest kolejny **bezposredni konkurent koncepcyjny** - wizualny builder pipeline'ow agentow. Nie ma jednak danych o popularnosci/gwiazdkach w wynikach wyszukiwania, wyglada na mniejszy/nowszy projekt.
- **netresearch/claude-code-marketplace** - "Curated Agent Skills collection... Open standard - agentskills.io. Portable across Claude Code, Cursor, Copilot, Codex, Gemini CLI, and 30+ more agents" - kolejny sygnal trendu **przenosnosci miedzy-narzedziowej** (skille/agenci dzialajacy w wielu harnessach, nie tylko Claude Code) - ten sam trend co u wshobson.
- **hyperskill/claude-code-marketplace** - dokumentacja subagentow w kontekscie edukacyjnym (Hyperskill to platforma edukacyjna) - mozliwy sygnal wchodzenia agentow Claude Code do materialow szkoleniowych/kursow.

---

## 7. Trend makro widoczny w danych: eksplozja popytu na "Claude Agent SDK"

Niezaleznie od konkretnych repo, jeden z researchow (Totalum blog, 2026) podaje twardy sygnal popytu:

- Wyszukiwania frazy "claude agent sdk" wzrosly z **50 miesiecznie w maju 2025** do **14,800 w kwietniu 2026** - wzrost rzedu **~50,000% rok do roku**.

To nie jest bezposrednio o kolekcjach agentow, ale pokazuje skale przyplywu nowych uzytkownikow do calego ekosystemu w ciagu ostatnich ~12 miesiecy, co tlumaczy jednoczesny, gwaltowny wzrost wszystkich duzych repo (wshobson +26% gwiazdek luty->czerwiec, VoltAgent +58% liczby agentow itd.).

---

## 8. Podsumowanie liczbowe (najlepsze dostepne dane, luty vs sierpien 2026)

| Projekt | Luty 2026 (przyblizenie) | Sierpien 2026 (przyblizenie) | Zmiana jakosciowa |
|---|---|---|---|
| wshobson/agents | ~29K gwiazdek, "subagents" | ~36.6K+ gwiazdek (czerwiec), 92 pluginy / 202 agentow / 181 skilli / 105 komend, 16 orchestratorow | Pivot: kolekcja -> multi-harness marketplace |
| VoltAgent/awesome-claude-code-subagents | ~100+ subagentow | 158+ subagentow, 10 kategorii + nowa kat. Meta & Orchestration | Rozrost + nowa kategoria orkiestracji |
| davepoon/claude-code-subagents-collection | 43+ subagentow (stabilne) | 43+ subagentow + 100+ MCP serwerow, platforma buildwithclaude.com + bwc-cli | Platformizacja (webUI + CLI) |
| hesreallyhim/awesome-claude-code | brak danych sprzed 6 mies. | 51,746 gwiazdek, 203 zasoby, odswiezenie 1 lipca 2026 | Najwiekszy katalog w ekosystemie |
| anthropics/claude-plugins-official | nie istnial w obecnej formie / wczesna faza | 200+ pluginow (lipiec 2026), auto-rejestracja | NOWY - oficjalny marketplace Anthropic |
| Claude Enterprise Marketplace | nie istnial | uruchomiony 6 marca 2026 | NOWY segment enterprise |
| rohitg00/awesome-claude-code-toolkit | brak danych | 135 agentow / 176+ pluginow / 26 companion apps | NOWY szeroki super-toolkit |
| kubony/claude-code-visualizer | brak danych | wizualizacja sesji/kosztow/workflow na zywo | NOWY - konkurent w warstwie wizualnej (inny use-case) |
| Ngxba/claude-code-cli-ui | brak danych | wizualny edytor + mapa agentow + pipeline builder | NOWY - konkurent koncepcyjny (builder) |

---

## Co to oznacza dla pozycjonowania naszego projektu

1. **Nikt nie robi dokladnie tego, co robi Agent Architecture Designer.** Wszystkie duze repo (wshobson, VoltAgent, davepoon, hesreallyhim) to **kolekcje/marketplace'y do instalacji** promptow agentow - optymalizuja pod "znajdz i zainstaluj", nie pod "zrozum, jak to dziala, zanim wydasz token". Nasz projekt zostaje jedynym znanym **edukacyjnym, wizualnym konfiguratorem z encyklopedia PL/EN** w tej niszy - to nadal unikalna pozycja, ale przestrzen konkurencyjna aktywnie sie zageszcza.

2. **Dwa nowe projekty warto obserwowac jako najblizszych konkurentow koncepcyjnych:** `kubony/claude-code-visualizer` (wizualizacja, ale live-analytics, nie pre-flight edukacja) i `Ngxba/claude-code-cli-ui` (wizualny builder pipeline'ow, ale bez warstwy encyklopedycznej/kosztowej-edukacyjnej). Zaden z nich nie ma (wedlug dostepnych danych) skali gwiazdek zblizonej do naszego repo ani nie oferuje dwujezycznej encyklopedii 37 agentow / 44 presetow - ale to sygnal, ze kategoria "wizualne narzedzia wokol Claude Code agentow" zaczyna sie zapelniac. Warto sprawdzic te dwa repo bezposrednio (README, demo) przy nastepnej iteracji.

3. **Oficjalny marketplace Anthropic (`claude-plugins-official`) to najwazniejsza zmiana platformowa** tego polrocza. Podnosi bar UX instalacji (jedna komenda, auto-rejestracja) - warto rozwazyc, czy Agent Architecture Designer powinien miec sciezke "eksportuj jako plugin do oficjalnego marketplace" albo przynajmniej kompatybilny format, zeby nie zostac w tyle za standardem dystrybucji.

4. **hesreallyhim/awesome-claude-code (51.7K gwiazdek, 203 zasoby)** to najwiekszy pojedynczy kanal odkrywalnosci w calym ekosystemie. Jesli Agent Architecture Designer nie jest tam jeszcze wpisany - to najtansza (w sensie wysilku) dzwignia do zwiekszenia liczby gwiazdek z obecnych ~70.

5. **Trend "multi-harness" (wshobson, netresearch/agentskills.io) jest silny i przyspiesza** - agenci/skille przenaszalne miedzy Claude Code, Cursor, Codex CLI, Gemini CLI, Copilot. Nasz projekt jest obecnie scisle Claude-Code-centric (skille + komendy w `~/.claude/`). To nie wymaga natychmiastowej zmiany, ale przy planowaniu v33/v34 warto zanotowac, ze rynek zaczyna oczekiwac przenosnosci miedzy-narzedziowej jako standardu, nie wyjatku.

6. **Brak w wynikach jakiegokolwiek bezposredniego klona/konkurenta** oferujacego jednoczesnie: (a) wizualny graf/konfigurator agentow, (b) pelna dwujezyczna encyklopedia per-agent i per-preset, (c) kalkulacje kosztow/tokenow przed uruchomieniem. To pozostaje realna luka rynkowa i mocny punkt roznicujacy projektu na sierpien 2026.

Sources:
- [wshobson/agents](https://github.com/wshobson/agents)
- [wshobson/agents README](https://github.com/wshobson/agents/blob/main/README.md)
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)
- [VoltAgent PRs](https://github.com/VoltAgent/awesome-claude-code-subagents/pulls)
- [VoltAgent Issues](https://github.com/VoltAgent/awesome-claude-code-subagents/issues)
- [davepoon/claude-code-subagents-collection](https://github.com/davepoon/claude-code-subagents-collection/blob/main/README.md)
- [buildwithclaude.com Skills](https://buildwithclaude.com/skills)
- [davepoon/buildwithclaude releases](https://github.com/davepoon/buildwithclaude/releases)
- [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [awesome-claude-code SkillsLLM entry](https://skillsllm.com/skill/hesreallyhim-awesome-claude-code)
- [Official Claude Code Plugins list](https://designrevision.com/blog/official-claude-code-plugins)
- [anthropics/claude-plugins-official marketplace.json](https://github.com/anthropics/claude-plugins-official/blob/main/.claude-plugin/marketplace.json)
- [Discover and install prebuilt plugins - Claude Code Docs](https://code.claude.com/docs/en/discover-plugins)
- [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit)
- [kubony/claude-code-visualizer](https://github.com/kubony/claude-code-visualizer)
- [Ngxba/claude-code-cli-ui](https://github.com/Ngxba/claude-code-cli-ui)
- [netresearch/claude-code-marketplace](https://github.com/netresearch/claude-code-marketplace)
- [Claude Code subagents: the 2026 production playbook - Totalum](https://www.totalum.app/blog/claude-code-subagents-totalum)
- [Claude Agent SDK in 2026 - Totalum](https://www.totalum.app/blog/claude-agent-sdk-totalum-2026)
