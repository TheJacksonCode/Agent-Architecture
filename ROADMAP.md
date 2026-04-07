# ROADMAP.md -- Agent Architecture Designer
## Konkretny plan implementacji v0.1.0 -> v0.4.0+

**Autor:** Syntetyk [OPUS] | Data: 2026-04-07
**Zrodla:** 6 raportow badawczych + walidacje Five Minds Critica + ALPHA/OMEGA Verdict
**Format:** Kazdy krok ma: Co / Gdzie / Ile LOC / Zaleznosci / Priorytet

---

## LEGENDA

| Symbol | Znaczenie |
|--------|-----------|
| MUST | Blokujace -- bez tego nie ma publikacji lub nie ma sensu |
| SHOULD | Znaczaco poprawia produkt, planowane |
| NICE | Fajne, ale mozna pozniej |
| LOC | Szacunkowe linie kodu (netto, bez komentarzy) |
| [dep: X] | Zaleznosc -- X musi byc zrobione wczesniej |

---

## FAZA 0 -- "Wyjdz na Swiat" (ten tydzien, 2-4 dni)

**Cel:** Pierwsze publiczne repozytorium GitHub z dzialajaca aplikacja.
**Wymagane LOC nowe:** ~200 (README + config files, nie aplikacja)
**Stan po Fazie 0:** URL https://github.com/TheJacksonCode/agent-architecture-designer dziala.

---

### F0-01: Inicjalizacja Repozytorium GitHub

**Co:** Stworzyc publiczne repo na GitHub z wlasciwymi ustawieniami.

**Gdzie:** GitHub.com -> New Repository
- Repository name: `agent-architecture-designer`
- Description: "Visual multi-agent system designer for Claude Code — drag & drop 28 agents, Five Minds Protocol, HITL gates, Live Simulation"
- Visibility: Public
- Initialize with README: NIE (bedziemy pushowac)
- License: MIT (dodamy recznie)

**Komendy:**
```bash
cd "C:/Projekty Claude Code/Agent_Architecture"
git init
git remote add origin https://github.com/TheJacksonCode/agent-architecture-designer.git
```

**LOC:** 0 (konfiguracja)
**Zaleznosci:** Brak
**Priorytet:** MUST

---

### F0-02: Przygotowanie Struktury Plikow

**Co:** Stworzyc strukture plikow repozytorium. Aktualny katalog ma chaos -- wymagane porzadkowanie.

**Gdzie:** Lokalny system plikow

**Struktura docelowa:**
```
agent-architecture-designer/
├── index.html                     <- symlink lub kopia v28
├── AGENT_TEAMS_CONFIGURATOR_v28.html  <- glowna aplikacja
├── plugin.json                    <- Claude Code plugin descriptor
├── README.md                      <- angielski README z GIF
├── LICENSE                        <- MIT
├── .gitignore
├── .claude/
│   ├── skills/
│   │   ├── five-minds/SKILL.md    <- istniejacy
│   │   └── hitl-pipeline/SKILL.md <- istniejacy
│   └── settings.local.json        <- WYKLUCZONE z .gitignore
├── versions/                      <- archiwum wersji (v1-v27)
│   └── (opcjonalnie, jesli chcemy zachowac)
└── docs/                          <- screenshoty do README
    └── hero.gif                   <- KLUCZOWY ASSET
```

**Co z obecnymi plikami:**
- `analizy-html/`, `analizy-md/`, `live-monitor-research/`, `ikony/` -- NIE commitowac (dodac do .gitignore lub nie trackować)
- `TRAINING_CURRICULUM_AI_ENGINEER.md` -- NIE commitowac (osobisty dokument)
- `CLAUDE.md` -- commitowac (jest juz skonfigurowany)
- `generate_skills.js` -- commitowac (utility)

**.gitignore:**
```
# Personal research files
analizy-html/
analizy-md/
live-monitor-research/
ikony/
podcast/

# Personal/local
TRAINING_CURRICULUM_AI_ENGINEER.md
.claude/settings.local.json
agent-architect/

# OS
.DS_Store
Thumbs.db
desktop.ini

# Node (jesli bedziemy uzywac)
node_modules/
```

**LOC:** ~20 (.gitignore)
**Zaleznosci:** F0-01
**Priorytet:** MUST

---

### F0-03: Audyt Bezpieczenstwa v28 -- XSS Check

**Co:** Przeglad kodu v28 pod katem XSS przed publiczna ekspozycja.

**Gdzie:** `AGENT_TEAMS_CONFIGURATOR_v28.html`

**Co sprawdzic:**
1. Kazde uzycie `innerHTML` -- czy dane sa z localStorage/user input czy z constow?
2. Import JSON (jesli istnieje) -- czy uzywa `JSON.parse()` + whitelist?
3. `eval()` -- powinno byc ZERO wystapien
4. `document.write()` -- powinno byc ZERO wystapien
5. URL params (`window.location.hash` etc.) -- sprawdzic czy nie sa wstawiane do DOM

**Jak sprawdzic:**
```bash
grep -n "innerHTML" AGENT_TEAMS_CONFIGURATOR_v28.html | grep -v "//.*innerHTML"
grep -n "eval(" AGENT_TEAMS_CONFIGURATOR_v28.html
grep -n "document.write" AGENT_TEAMS_CONFIGURATOR_v28.html
```

**Poprawka jesli znaleziono problem:**
- Zamienic `el.innerHTML = userInput` na `el.textContent = userInput`
- Dla HTML struktury z constow: OK (bo const = nasza kontrola, nie user input)

**LOC:** ~10-30 (poprawki, jesli potrzebne)
**Zaleznosci:** Brak
**Priorytet:** MUST

---

### F0-04: plugin.json -- Claude Code Plugin Descriptor

**Co:** Stworzyc plik `plugin.json` w root repozytorium, wymagany do Claude Code marketplace.

**Gdzie:** `plugin.json` (root)

**Zawartosc:**
```json
{
  "name": "agent-architecture-designer",
  "display_name": "Agent Architecture Designer",
  "description": "Visual multi-agent system designer for Claude Code. Drag & drop 28 specialized agents onto a canvas, connect them, select models (Opus/Sonnet/Haiku), and generate a complete system prompt for your agent team. Features Five Minds Protocol debate, HITL Decision Gates, Live Simulation, and an Agent Encyclopedia.",
  "version": "0.1.0",
  "author": "TheJacksonCode",
  "homepage": "https://github.com/TheJacksonCode/agent-architecture-designer",
  "keywords": [
    "multi-agent",
    "claude-code",
    "five-minds",
    "hitl",
    "visual-designer",
    "orchestration",
    "agent-teams"
  ],
  "skills": [
    {
      "name": "five-minds",
      "path": ".claude/skills/five-minds/SKILL.md"
    },
    {
      "name": "hitl-pipeline",
      "path": ".claude/skills/hitl-pipeline/SKILL.md"
    }
  ],
  "app": {
    "path": "AGENT_TEAMS_CONFIGURATOR_v28.html",
    "type": "html"
  }
}
```

**WAZNE:** Przed finalnym commitem zweryfikowac aktualny format plugin.json z:
`https://docs.anthropic.com/claude-code/plugins` lub `claude code --help plugin`

**LOC:** ~30 (JSON)
**Zaleznosci:** F0-02
**Priorytet:** MUST

---

### F0-05: LICENSE -- MIT

**Co:** Plik LICENSE z tresca MIT License.

**Gdzie:** `LICENSE` (root)

**Zawartosc:**
```
MIT License

Copyright (c) 2026 TheJacksonCode

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**LOC:** 21
**Zaleznosci:** Brak
**Priorytet:** MUST

---

### F0-06: README.md -- Angielski, z Hero GIF

**Co:** README.md dla publicznego repo. To pierwsze co widzi odwiedzajacy.

**Gdzie:** `README.md` (root)

**Struktura (kolejnosc wazna):**
```markdown
# Agent Architecture Designer

> Visual multi-agent system designer for Claude Code

[HERO GIF -- 15 sekund: preset load -> Live Simulation -> agents talking -> HITL gate]

[![MIT License](badge)] [![Claude Code](badge)] [![28 Agents](badge)]

## What it does

One-sentence: Design, configure, and generate prompts for multi-agent Claude Code teams — visually.

## Key Features

- **Visual Canvas**: Drag & drop 28 specialized agents, draw connections
- **Five Minds Protocol**: Structured debate with 4 experts + Devil's Advocate (unique innovation)
- **HITL Decision Gates**: 3 human checkpoints with 120s countdown
- **Live Simulation**: Agents "talk" to each other with animated speech bubbles
- **29 Presets**: From Solo Agent to Deep Five Minds Ultimate (29 agents)
- **Agent Encyclopedia**: Research-backed prompts, analogies, anti-patterns for all 28 agents
- **Dark/Light Theme**: Full CSS variable system

## Quick Start

1. Open [Agent Architecture Designer](https://theJacksonCode.github.io/agent-architecture-designer/)
2. Select a preset (try "Deep Five Minds Ultimate")
3. Click "Live Simulation" to see agents interact
4. Click "Generuj Prompt" to get your system prompt

No installation. No npm. No build step. Just open the HTML file.

## Five Minds Protocol

[Krotki opis -- co to jest, dlaczego unikalne]

## 28 Agents

[Tabela lub lista kategorii]

## Claude Code Plugin

[Jak zainstalowac jako plugin]

## Screenshots

[3-4 screenshoty]

## Development

Single HTML file (~3500 lines). No dependencies. See CLAUDE.md for versioning rules.

## License

MIT
```

**Co to hero GIF:** Nagranie ekranu (OBS/ShareX/Gyroflow) + konwersja do GIF (gifski lub ffmpeg).
Czas: 15 sekund. Rozmiar: max 8MB (GitHub limit). Rozdzielczosc: 1280x720.

**LOC:** ~100 (Markdown) + hero GIF (osobny asset)
**Zaleznosci:** F0-03 (musi byc czysta aplikacja przed screenshotami)
**Priorytet:** MUST (README bez GIF moze byc placeholderem na start)

---

### F0-07: GitHub Pages -- Konfiguracja

**Co:** Wlaczyc GitHub Pages zeby aplikacja byla dostepna pod URL.

**Gdzie:** GitHub.com -> repo Settings -> Pages

**Kroki:**
1. Settings -> Pages
2. Source: Deploy from a branch
3. Branch: main / root
4. Klikniecia: Save
5. Poczekac ~2 minuty
6. URL: `https://thejacksoncode.github.io/agent-architecture-designer/`

**Weryfikacja:** Otworzyc URL, sprawdzic czy v28 sie laduje.

**LOC:** 0 (konfiguracja UI)
**Zaleznosci:** F0-02, pierwszy commit
**Priorytet:** MUST

---

### F0-08: Tags i Opis Repozytorium

**Co:** Dodac tagi i opis w GitHub dla discoverability.

**Gdzie:** GitHub.com -> repo -> "About" gear icon

**Opis:** `Visual multi-agent system designer for Claude Code. 28 agents, Five Minds Protocol, HITL gates, Live Simulation.`

**Tags (Topics):**
```
multi-agent, claude-code, five-minds, hitl, visual-designer,
agent-orchestration, anthropic, ai-agents, no-build, single-file
```

**LOC:** 0 (konfiguracja)
**Zaleznosci:** F0-07
**Priorytet:** SHOULD

---

### F0-09: Show HN Draft

**Co:** Przygotowac post na Hacker News (Show HN). Nie publikowac teraz -- draft na pozniej (po kilku gwiazdkach).

**Format Show HN (zasady):**
- Tytul: `Show HN: Agent Architecture Designer – visual multi-agent builder for Claude Code`
- NIE promocyjny, NIE "amazing"
- TAK: techniczny, co robi, co jest unikalne

**Draft tresc:**
```
I built a visual designer for multi-agent Claude Code systems.
You drag agents onto a canvas, connect them, and get a complete system prompt.

What's technically interesting:
- Five Minds Protocol: structured adversarial debate with 4 specialized experts + 
  Devil's Advocate before any decision solidifies. No direct equivalent in public 
  agent frameworks I've found.
- 3 HITL Decision Gates with 120s countdown and auto-fallback
- Live Simulation: pre-scripted message templates make agents "talk" to each other,
  showing how information flows through the system
- 28 agents with research-backed prompts (ROLA/INPUT/OUTPUT/ZASADY format)
- Zero dependencies, single HTML file, works offline

Technical stack: Vanilla JS + inline SVG + Canvas 2D + Web Animations API + localStorage.
No React, no npm, no build step. Open the HTML file and it works.

GitHub: [url]
Live demo: [github pages url]

Happy to discuss the Five Minds Protocol design or the agent prompt structure.
```

**LOC:** 0 (draft tekstowy)
**Zaleznosci:** F0-07 (potrzebujemy URL)
**Priorytet:** SHOULD

---

**FAZA 0 PODSUMOWANIE:**

| Krok | Co | LOC | Czas |
|------|-----|-----|------|
| F0-01 | Git init + remote | 0 | 10 min |
| F0-02 | Struktura plikow + .gitignore | 20 | 20 min |
| F0-03 | XSS audit v28 | 0-30 | 30 min |
| F0-04 | plugin.json | 30 | 20 min |
| F0-05 | LICENSE | 21 | 5 min |
| F0-06 | README.md + hero GIF | 100 + GIF | 2-3 h |
| F0-07 | GitHub Pages | 0 | 10 min |
| F0-08 | Tags/opis | 0 | 5 min |
| F0-09 | Show HN draft | 0 | 30 min |
| **TOTAL** | | ~170 LOC | **~5 h** |

---

## FAZA 1 -- v0.2.0 (tydzien 2, ~4-5 dni)

**Cel:** Trzy kluczowe features ktore odpowiadaja na #1 community requests.
**Wymagane LOC nowe:** ~700-800 (netto po audicie)
**Stan po Fazie 1:** Token cost widoczny, uzytkownik moze tworzyc wlasnych agentow, eksport Mermaid.

---

### F1-01: Token Cost HUD -- Widocznosc Kosztow

**Priorytet:** MUST (Reddit #1 request, X, Forum -- konsensus C4)

**Co:** Pokazac szacowany koszt tokenow per agent, per faza i calkowity w czasie symulacji.

**Gdzie:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- Funkcja: nowa `calcTokenCost()` + modyfikacja `simStep()`
- UI: rozszerzenie istniejacego topbaru (juz ma metryki) + nowy element `#cost-hud`
- Modyfikacja: `showND()` (sidebar agenta) -- dodac cost estimate per run

**Dane do implementacji:**

```javascript
// Ceny Claude API (kwiecien 2026)
const MODEL_COSTS = {
  opus:   { input: 15.00,  output: 75.00  }, // per 1M tokens
  sonnet: { input:  3.00,  output: 15.00  },
  haiku:  { input:  0.25,  output:  1.25  }
};

// Szacunki tokenow per agent (edukacyjne, nie real-time)
const AGENT_TOKEN_ESTIMATES = {
  orchestrator:  { input: 2000, output: 500 },
  synth:         { input: 3000, output: 1000 },
  planner:       { input: 1500, output: 400 },
  res_tech:      { input: 2500, output: 800 },
  // ... dla wszystkich 28 agentow
  // default:    { input: 1500, output: 400 }
};

function calcAgentCost(agentId, model) {
  const est = AGENT_TOKEN_ESTIMATES[agentId] || { input: 1500, output: 400 };
  const costs = MODEL_COSTS[model] || MODEL_COSTS.sonnet;
  const inputCost  = (est.input  / 1_000_000) * costs.input;
  const outputCost = (est.output / 1_000_000) * costs.output;
  return { inputCost, outputCost, total: inputCost + outputCost };
}

function calcTotalCost(agents) {
  return agents.reduce((sum, a) => sum + calcAgentCost(a.id, a.model).total, 0);
}
```

**UI zmiany:**
1. W topbarze (juz ma miejsce): `[$0.14]` badge klikalne -> dropdown
2. Dropdown: tabela per faza + per agent + total
3. W sidebar agenta (`showND()`): dodac `"Est. cost: $0.03/run"` pod modelem
4. W `simStep()`: akumulowac koszty w `simState.totalCost`, aktualizowac HUD

**LOC:** ~200 (nowe funkcje + UI)
**Zaleznosci:** Brak (niezalezny feature)

---

### F1-02: Kreator Agentow -- Custom Agent Builder

**Priorytet:** SHOULD

**Co:** Uzytkownik moze stworzyc wlasnego agenta (poza 28 predefiniowanymi) i dodac go do canvas.

**Gdzie:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- Nowy przycisk: `[+ Nowy Agent]` w lewym panelu (pod lista agentow)
- Nowa funkcja: `openAgentCreator()` -> modal z formularzem
- Nowa funkcja: `saveCustomAgent(data)` -> zapisuje do localStorage + dodaje do AD
- Modyfikacja: `renderPaletteList()` -- pokazac custom agentow z ikonka "custom"

**Schemat danych custom agenta:**

```javascript
// localStorage: 'acV28_custom_agents' (tablica)
const CUSTOM_AGENT_SCHEMA = {
  id:          String,  // 'custom_' + timestamp
  name:        String,  // max 30 chars
  role:        String,  // max 100 chars (opis roli)
  phase:       String,  // 'strategy'|'research'|'build'|'qa'|'fiveminds'|'hitl'
  model:       String,  // 'opus'|'sonnet'|'haiku'
  prompt:      String,  // max 2000 chars (prompt agenta)
  color:       String,  // hex color picker
  icon:        String,  // wybrany z zestawu 10 ikon (Unicode lub SVG)
  isCustom:    true,
  createdAt:   Number   // timestamp
};
```

**Formularz (pola):**
```
[Nazwa agenta]          -- text input, max 30 znaków
[Faza]                  -- select: Strategy / Research / Build / QA / Five Minds
[Model]                 -- radio: Opus / Sonnet / Haiku (z cenami)
[Rola (opis)]           -- textarea, 1 linia, max 100 znaków
[Prompt]                -- textarea, max 2000 znaków, z placeholderem-wzorcem
[Kolor]                 -- color picker (8 presetow + custom)
[Ikona]                 -- 10 opcji SVG do wyboru
[ZAPISZ] [ANULUJ]
```

**Gdzie w UI:**
- Modal overlay z glassmorphism (jak istniejace modals)
- Przycisk "Edytuj" na custom agencie w palecie
- Przycisk "Usun custom agenta" (z potwierdzeniem)

**LOC:** ~300 (formularz + logika + localStorage)
**Zaleznosci:** Brak

---

### F1-03: Export Mermaid -- Eksport Diagramu

**Priorytet:** SHOULD

**Co:** Generowanie kodu Mermaid flowchart z aktualnego stanu canvas. Uzytkownik kopiuje kod do clipboarda.

**Gdzie:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- Nowy przycisk: `[Eksport Mermaid]` w topbarze (lub menu Plik)
- Nowa funkcja: `generateMermaidCode()` -> zwraca string
- Nowa funkcja: `showMermaidModal(code)` -> modal z textarea + copy button

**Algorytm generowania:**

```javascript
function generateMermaidCode() {
  const lines = ['flowchart TD'];
  
  // Dodaj style per faze
  lines.push('  classDef strategy fill:#818CF8,color:#fff');
  lines.push('  classDef research fill:#06B6D4,color:#fff');
  lines.push('  classDef build fill:#34D399,color:#fff');
  lines.push('  classDef qa fill:#F87171,color:#fff');
  lines.push('  classDef fiveminds fill:#F59E0B,color:#fff');
  lines.push('  classDef hitl fill:#E879F9,color:#fff');
  
  // Dodaj nody
  AD.forEach(agent => {
    const label = `${agent.name}\\n[${agent.model}]`;
    lines.push(`  ${agent.id}["${label}"]`);
    lines.push(`  class ${agent.id} ${agent.cat}`);
  });
  
  // Dodaj polaczenia
  CONNECTIONS.forEach(conn => {
    lines.push(`  ${conn.from} --> ${conn.to}`);
  });
  
  return lines.join('\n');
}
```

**Modal UI:**
```
+--[Eksport Mermaid Diagram]--+
| flowchart TD                |
|   orchestrator["Orkiestr."] |
|   ...                       |
|                             |
| [Kopiuj do schowka] [Zamknij]|
+-----------------------------+
```

**LOC:** ~150 (funkcja generowania + modal)
**Zaleznosci:** Brak (niezalezny od F1-01, F1-02)

---

### F1-04: Export/Import Konfiguracji JSON

**Priorytet:** SHOULD (mitygacja ryzyka R3 -- localStorage migracja)

**Co:** Uzytkownik moze wyeksportowac caly stan canvas do JSON i zaladowac go pozniej (lub na innym urzadzeniu).

**Gdzie:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- Nowy przycisk: `[Eksportuj]` i `[Importuj]` w topbarze
- Nowa funkcja: `exportConfig()` -> pobiera JSON przez Blob URL
- Nowa funkcja: `importConfig(file)` -> wczytuje z `<input type="file">`

**Format JSON:**
```json
{
  "version": "28",
  "exported": "2026-04-07T12:00:00Z",
  "agents": [
    { "id": "orchestrator", "x": 300, "y": 200, "model": "opus" }
  ],
  "connections": [
    { "from": "orchestrator", "to": "planner" }
  ],
  "customAgents": [],
  "theme": "dark"
}
```

**Security:** Import musi walidowac strukture JSON. Whitelist dozwolonych kluczy. NIGDY `eval()`.

```javascript
function importConfig(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    // Walidacja whitelist
    if (!data.agents || !Array.isArray(data.agents)) throw new Error('Invalid');
    const ALLOWED_AGENT_KEYS = ['id', 'x', 'y', 'model'];
    data.agents = data.agents.map(a => {
      const clean = {};
      ALLOWED_AGENT_KEYS.forEach(k => { if (a[k] !== undefined) clean[k] = a[k]; });
      return clean;
    });
    // Zaladuj
    loadFromExportedConfig(data);
  } catch (e) {
    showToast('Nieprawidlowy plik konfiguracji', 'error');
  }
}
```

**LOC:** ~150
**Zaleznosci:** Brak

---

**FAZA 1 PODSUMOWANIE:**

| Krok | Feature | LOC | Czas |
|------|---------|-----|------|
| F1-01 | Token Cost HUD | 200 | 1 dzien |
| F1-02 | Custom Agent Builder | 300 | 2 dni |
| F1-03 | Mermaid Export | 150 | 0.5 dnia |
| F1-04 | Export/Import JSON | 150 | 0.5 dnia |
| **TOTAL** | | ~800 LOC | ~4-5 dni |

**ALERT ROZMIAR:** v28 (~3500) + 800 = ~4300 LOC. W limicie 5000. OK.

**Commit strategy:** Jeden commit per feature (F1-01, F1-02, F1-03, F1-04 osobno).
**Tag:** `v0.2.0` po zakonczeniu Fazy 1.

---

## FAZA 2 -- v0.3.0 (tydzien 3-4)

**Cel:** Glebsza integracja z ekosystemem Claude Code + feedback loop.
**Wymagane LOC nowe:** ~600-700
**Stan po Fazie 2:** Hooks generator, EXECUTION_REPORT import, Skills upgrade.

---

### F2-01: Hooks Generator -- Generowanie settings.json

**Priorytet:** MUST dla integracji z Claude Code (konsensus C2)

**Co:** Uzytkownik projektuje pipeline agentow, a aplikacja generuje gotowy fragment `settings.json` z hooks dla Claude Code.

**Gdzie:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- Nowy panel/tab: "Hooks" w prawym sidebarze lub nowy modal
- Nowa funkcja: `generateHooksConfig()` -> string JSON

**Format output:**
```json
{
  "hooks": {
    "command": [
      {
        "matcher": "research",
        "command": "echo 'Research phase starting' >> agent_log.txt"
      }
    ],
    "prompt": [
      {
        "matcher": ".*",
        "command": "node .claude/hooks/token-budget.js"
      }
    ]
  }
}
```

**UI:**
```
+--[Hooks Generator]--+
| Wybierz agentow do hookow:
| [ ] Post-Research checkpoint
| [ ] Pre-Build approval
| [x] Token budget warning
| [x] Phase transition log
|
| Output: settings.json fragment
| [textarea z kodem]
| [Kopiuj do schowka]
+--------------------+
```

**Typy hookow do generowania (z Docs research):**
- `command` -- uruchom komende po/przed fazą
- `http` -- wyslij HTTP request (webhook do zewnetrznego systemu)
- `prompt` -- wstrzyknij instrukcje do kazdego promptu agenta
- `agent` -- callback przy spawnie subagenta

**LOC:** ~200
**Zaleznosci:** F0-04 (plugin.json musi byc)

---

### F2-02: Feedback Loop -- EXECUTION_REPORT.json Import

**Priorytet:** SHOULD

**Co:** Po prawdziwym uruchomieniu agentow w Claude Code, uzytkownik moze zaladowac `EXECUTION_REPORT.json` do aplikacji, ktora pokazuje co sie stalo.

**Gdzie:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- Nowy przycisk: `[Zaladuj Raport]` w sekcji Live Simulation
- Nowa funkcja: `importExecutionReport(json)` -> animuje stan canvas bazujac na raporcie
- Modyfikacja: Dialog Timeline -- pokazuje RZECZYWISTE wiadomosci z raportu

**Format EXECUTION_REPORT.json:**
```json
{
  "schema": "execution-report-v1",
  "preset": "deep_five_minds",
  "started_at": "2026-04-07T10:00:00Z",
  "completed_at": "2026-04-07T10:23:45Z",
  "phases": [
    {
      "phase": "strategy",
      "agents": [
        {
          "id": "orchestrator",
          "model": "opus",
          "status": "done",
          "tokens_input": 1823,
          "tokens_output": 412,
          "duration_ms": 4521,
          "message": "Analiza projektu zakonczona. Plan: ..."
        }
      ]
    }
  ],
  "hitl_decisions": [
    {
      "gate": "post_research",
      "choice": "approve",
      "timestamp": "2026-04-07T10:08:30Z"
    }
  ],
  "total_cost_usd": 0.23,
  "total_tokens": 45821
}
```

**Po zaladowaniu:**
- Canvas pokazuje agentow z rzeczywistymi statusami (done/error)
- Dialog Timeline wypelnia sie rzeczywistymi wiadomosciami
- Cost HUD pokazuje RZECZYWISTY koszt (nie szacunkowy)
- Nowy badge: "Based on real execution" zamiast "Simulation"

**LOC:** ~200
**Zaleznosci:** F1-04 (import mechanism juz istnieje)

---

### F2-03: Skills Upgrade -- Agent Designer Skill

**Priorytet:** SHOULD (konsensus C2 -- glebiej w ekosystemie Anthropic)

**Co:** Stworzyc nowy skill `.claude/skills/agent-designer/SKILL.md` ktory pozwala Claude Code agentowi uzywac Agent Architecture Designer jako tool.

**Gdzie:** `.claude/skills/agent-designer/SKILL.md` (nowy plik)

**Zawartosc SKILL.md:**
```markdown
---
name: agent-designer
description: Design a multi-agent system visually using Agent Architecture Designer
---

# Agent Architecture Designer Skill

When the user asks to design a multi-agent system, create an agent team,
or plan agent orchestration:

1. Ask: "Jaki jest cel systemu agentow?" (What is the goal of the agent system?)
2. Suggest a preset from the 29 available presets based on the goal:
   - Simple research task -> "Research Swarm" (6 agents)
   - Code feature -> "Feature Sprint" (5 agents)
   - Complex decision -> "Five Minds Protocol" (6 agents)
   - Full project -> "Deep Five Minds Ultimate" (29 agents)
3. Open Agent Architecture Designer: [url]
4. Guide the user through:
   - Loading the preset
   - Customizing agents
   - Generating the final prompt

## Available Presets

[lista 29 presetow z opisami]

## Usage

/agent-designer [optional: goal description]
```

**LOC:** ~100 (Markdown)
**Zaleznosci:** F0-04, F0-07 (musi byc live URL)

---

### F2-04: Interaktywne Scenariusze -- "Try This" Launcher

**Priorytet:** NICE

**Co:** Interaktywny onboarding -- 5 krotkach przewodnikow "jak uzyc aplikacji do X". Kazdy scenariusz to sekwencja krokow z highlighted elementami i opisem.

**Gdzie:** `AGENT_TEAMS_CONFIGURATOR_v28.html`
- Nowy przycisk: `[Przewodniki]` lub `[Try This]` w topbarze
- Nowa funkcja: `startScenario(id)` -> animowany krok-po-kroku tour
- Bazuje na istniejacym trybie Encyklopedii -- ten sam mechanizm

**5 Scenariuszy:**
1. "Twoj pierwszy agent team" (15 krokow, basic)
2. "Przeprowadz debate Five Minds" (10 krokow)
3. "Zbadaj projekt z 6 researcherami" (8 krokow)
4. "Symulacja pelnego projektu" (12 krokow z Live Sim)
5. "Stworz wlasnego agenta" (6 krokow, [dep: F1-02])

**LOC:** ~150
**Zaleznosci:** F1-02 (dla scenariusza 5)

---

**FAZA 2 PODSUMOWANIE:**

| Krok | Feature | LOC | Czas |
|------|---------|-----|------|
| F2-01 | Hooks Generator | 200 | 1 dzien |
| F2-02 | Execution Report Import | 200 | 1-2 dni |
| F2-03 | Agent Designer Skill | 100 | 0.5 dnia |
| F2-04 | Interaktywne Scenariusze | 150 | 1 dzien |
| **TOTAL** | | ~650 LOC | ~4-5 dni |

**ALERT ROZMIAR:** ~4300 (po F1) + 650 = ~4950 LOC. BLISKO LIMITU. Przed Faza 2: audit -100 LOC.

**Tag:** `v0.3.0` po zakonczeniu Fazy 2.

---

## FAZA 3 -- v0.4.0+ (pozniej, tydzien 5+)

**Cel:** Features ktore wymagaja wiecej czasu lub zalezan zewnetrznych.
**Uwaga:** Nie planowac ich szczegolowo teraz -- po Fazie 2 beda nowe dane z community.

---

### F3-01: Modularyzacja HTML -- Plan na Przekroczenie 5000 Linii

**Priorytet:** MUST jesli przekroczymy limit (co nastapi ~v0.4.0)

**Co:** Zachowanie single-file philosophy przy rosnacym kodzie.

**Strategia:**

**Wariant A (preferowany) -- Lazy Initialization:**
```javascript
// Na gorze pliku
const FEATURES = {
  liveMonitor: true,
  hitlGates: true,
  agentCreator: true,   // F1-02
  hooksGen: true,       // F2-01
  mermaidExport: true,  // F1-03
};

// Modulow nie ladujemy do pamietci poki nie sa potrzebne
let _agentCreatorModule = null;
function getAgentCreator() {
  if (!_agentCreatorModule) {
    _agentCreatorModule = initAgentCreatorModule(); // lazy init
  }
  return _agentCreatorModule;
}
```

**Wariant B (build step) -- tylko jesli A zawiedzie:**
```bash
# build.sh (nie jest commitowany do repozytorium jako requirement)
#!/bin/bash
cat src/header.html \
    src/styles.css \
    src/agent-data.js \
    src/preset-data.js \
    src/knowledge-data.js \
    src/simulation.js \
    src/canvas.js \
    src/ui.js \
    src/footer.html > dist/index.html
echo "Built: $(wc -l dist/index.html) lines"
```
Dystrybucja: ZAWSZE `dist/index.html` -- jeden plik. Build jest opcjonalny dla developerow.

**Audit CSS (zawsze przed nowa duza funkcja):**
- Grep po selektorach ktore nie maja odpowiadajacych elementow DOM
- Usun vendor prefixes (-moz-) dla Firefox 36+ features
- Polacz powtarzajace sie `@keyframes` (np. identyczne `pulse` animacje)
- Target: -50 LOC per audit

**LOC:** 0-50 (refaktor, nie nowy kod)
**Zaleznosci:** Dopiero po osiagnieciu ~4800 linii

---

### F3-02: TypeScript Export -- Eksport Definicji Agentow

**Priorytet:** SHOULD (po zebraniu feedback z community)

**Co:** Generowanie TypeScript interface definitions dla zaprojektowanego systemu agentow.

**Output przykladowy:**
```typescript
// Generated by Agent Architecture Designer v0.4.0

export interface AgentConfig {
  id: string;
  name: string;
  model: 'opus' | 'sonnet' | 'haiku';
  phase: 'strategy' | 'research' | 'build' | 'qa' | 'fiveminds' | 'hitl';
  prompt: string;
}

export const AGENT_TEAM: AgentConfig[] = [
  {
    id: 'orchestrator',
    name: 'Orkiestrator',
    model: 'opus',
    phase: 'strategy',
    prompt: '...'
  },
  // ...
];

export type AgentId = typeof AGENT_TEAM[number]['id'];
```

**LOC:** ~100 (generator funkcja + modal)
**Zaleznosci:** F1-03 (ten sam mechanizm co Mermaid export)

---

### F3-03: Python Export -- Eksport Konfiguracji dla Claude Agent SDK

**Priorytet:** SHOULD

**Co:** Generowanie gotowego kodu Python dla Claude Agent SDK na bazie zaprojektowanego systemu.

**Output przykladowy:**
```python
# Generated by Agent Architecture Designer v0.4.0
from anthropic import Anthropic

client = Anthropic()

def run_orchestrator(task: str) -> str:
    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=8096,
        system="""[ROLA: Orkiestrator...]""",
        messages=[{"role": "user", "content": task}]
    )
    return response.content[0].text

def run_pipeline(task: str) -> dict:
    # Phase 1: Strategy
    plan = run_orchestrator(task)
    # ...
```

**LOC:** ~150 (generator + modal)
**Zaleznosci:** F1-04 (potrzebuje danych o agentach)

---

### F3-04: Community Dashboard -- Publiczny Preset Directory

**Priorytet:** NICE

**Co:** Strona community gdzie uzytkownicy dziel sie swoimi presetami (custom konfiguracjami).

**Stack:** GitHub Discussions jako backend (issues/discussions jako baza danych) + fetch() do GitHub API.

**Jak to dziala:**
1. Uzytkownik eksportuje config JSON (F1-04)
2. Klikniecie "Udostepnij" -> otwiera GitHub issue z templatem
3. Dashboard (osobna strona HTML lub sekcja w aplikacji) fetchuje GitHub issues z tagiem `preset-share`
4. Kazdy preset ma: nazwa, opis, liczba agentow, autor, download count (approximated przez reactions)

**LOC:** ~300 (dodatkowa strona lub sekcja)
**Zaleznosci:** F1-04, GitHub repo public, aktywna community (>20 uzytkownikow)

---

### F3-05: MCP Integration -- Prawdziwe Agenty (eksperymentalna)

**Priorytet:** NICE (wymaga backendu, poza obecnym scope)

**Co:** Uruchamianie zaprojektowanego systemu agentow bezposrednio z aplikacji poprzez MCP.

**Dlaczego pozniej:**
- Wymaga backendu (node.js server lub serverless)
- Wymaga auth (API klucze)
- Lamie single-file philosophy
- Zakres jest 10x wiekszy niz jakakolwiek inna feature

**Alternatywa ktora mozna zrobic teraz:** EXECUTION_REPORT.json import (F2-02) -- "bring your own execution results."

**LOC:** n/a (poza scope fazy 3)
**Zaleznosci:** Backend infrastructure (nowy projekt)

---

**FAZA 3 PODSUMOWANIE:**

| Krok | Feature | LOC | Priorytet | Kiedy |
|------|---------|-----|-----------|-------|
| F3-01 | Modularyzacja | 0-50 | MUST (jesli >5000) | Na zywo po potrzebie |
| F3-02 | TypeScript Export | 100 | SHOULD | Po feedback |
| F3-03 | Python Export | 150 | SHOULD | Po feedback |
| F3-04 | Community Dashboard | 300 | NICE | Po 100+ stars |
| F3-05 | MCP Integration | n/a | NICE | Nowy projekt |

---

## Harmonogram Calosciowy

```
TYDZIEN 1 (ten tydzien)
└── FAZA 0: GitHub setup, README, GIF, plugin.json
    -> Cel: repo public, GitHub Pages dziala

TYDZIEN 2
└── FAZA 1: Token Cost HUD, Custom Agents, Mermaid Export, JSON Export
    -> Cel: tag v0.2.0

TYDZIEN 3-4
└── FAZA 2: Hooks Generator, Execution Report, Skills upgrade
    -> Cel: tag v0.3.0

TYDZIEN 5+
└── FAZA 3: Na bazie community feedback
    -> Cel: tag v0.4.0 (data elastyczna)
```

---

## Metryki Sukcesu

| Metryka | Target v0.1.0 | Target v0.2.0 | Target v0.3.0 |
|---------|--------------|--------------|--------------|
| GitHub Stars | 10+ | 50+ | 100+ |
| GitHub Pages visits | -- | 200+/miesiac | 500+/miesiac |
| Issues otwarte | 0 | 5+ (feature requests) | 10+ |
| Plugin installs | -- | -- | 50+ |
| Plik HTML LOC | <3600 | <4300 | <5000 |

---

## Anti-Patterns do Unikniecia

Na podstawie ALPHA/OMEGA critique:

1. **NIE dodawac nowych agentow bez usuniecia martwego kodu** -- kazdy nowy agent musi byc poprzedzony auditem (-50 LOC)
2. **NIE planowac feature X zanim feature Y nie jest skonczone** -- sekwencja ma znaczenie
3. **NIE commitowac bez README update** -- README zawsze odzwierciedla aktualny stan
4. **NIE dodawac zewnetrznych zaleznosci** -- zero CDN, zero npm, to jest filozofia projektu
5. **NIE pomijac bezpieczenstwa** -- XSS audit przed kazdym nowym input/import feature

---

*ROADMAP v1.0 | Syntetyk [OPUS] | 2026-04-07*
*Bazuje na: 7 raportach badawczych + Five Minds Protocol debata + ALPHA/OMEGA Verdict*
*Nastepna rewizja: po osiagnieciu v0.2.0 lub po zebraniu pierwszych issues z community*
