# MANIFEST.md -- Agent Architecture Designer
## Single Source of Truth | v28.0 -> v0.1.0 GitHub Publication

**Autor:** Syntetyk [OPUS] | Rola: Pamiec Systemu
**Data:** 2026-04-07
**Wersja produktu:** v28.0 (current) | v0.1.0 (cel publikacji)
**Zrodla:** 7 raportow badawczych (Tech, UX, GitHub, Reddit, Forum, X, Critic) + walidacje Five Minds + ALPHA/OMEGA Final Verdict
**Cel:** Implementowalna specyfikacja publikacji GitHub + roadmapa produktowa

---

## 0. Tozsamosc Projektu

**Nazwa:** Agent Architecture Designer (Agent Teams Configurator)
**Repozytoria:** github.com/TheJacksonCode/agent-architecture-designer (cel)
**Format:** Single-file HTML, zero dependencies, zero build step
**Rozmiar biezacy:** ~3500 linii (v28.0)
**Stack:** Vanilla JS + SVG inline + CSS transitions + Canvas 2D + localStorage
**Wlasciciel:** TheJacksonCode (GitHub)
**Jezyk UI:** Polski (interfejs) | Angielski (README, dokumentacja publiczna)

**Czym jest:**
Wizualny konfigurator multi-agentowych systemow Claude Code. Designer przeciaga agentow na canvas, laczy ich polaczeniami, wybiera modele (Opus/Sonnet/Haiku), a nastepnie generuje gotowy system prompt dla calego zespolu. Zawiera 28 agentow, 29 presetow, Live Simulation, Five Minds Protocol, HITL Decision Gates i Encyclopedia agentow.

**Czym NIE jest:**
- Nie jest narzedziem uruchamiajacym prawdziwe agenty (to edukacja i planowanie)
- Nie jest frameworkiem (brak backendu, brak API)
- Nie jest aplikacja mobilna (desktop-first, celowo)

---

## 1. Decyzje Architektoniczne

### 1.1 Single-File Philosophy -- DECYZJA OSTATECZNA

| Aspekt | Decyzja | Uzasadnienie |
|--------|---------|--------------|
| Format | Jeden plik HTML | Zero toolchain, zero npm, instalacja = download |
| Limit LOC | Hard limit: **5000 linii** | LLM context window, utrzymywalnosc, GitHub render |
| Zewentrzne zaleznosci | ZERO CDN, ZERO npm | Brak "dependency hell", dziala offline |
| Build step | BRAK | Copy-paste deployment, GitHub Pages bez konfiguracji |
| Modularyzacja | Lazy init + feature flags | Duzy plik, szybki start (monitor code nieaktywny do M) |

**Konsensus:** 6/6 raportow badawczych. OMEGA Final Manifesto: "Single-file zachowane -- to filozofia projektu."

**Plan awaryjny (jesli przekroczymy 5000 linii):**
Nie build step. Zamiast tego: `<!-- SECTION: AGENT_KNOWLEDGE -->` komentarze jako markery + skrypt bash generujacy jeden HTML z fragmentow. Distrib = zawsze jeden plik.

### 1.2 Rendering -- Architektura Hybrydowa

| Warstwa | Technologia | Zastosowanie |
|---------|-------------|--------------|
| Particle effects, starfield | Canvas 2D + rAF | 60 FPS przy 5000+ obiektach, istniejacy `dataStreamCanvas` |
| Agent node animations | WAAPI `element.animate()` | Compositor thread GPU, nie blokuje main thread |
| Connections, data packets | SVG inline | Wektorowe, klikalne, CSS-animowalne, istniejacy `#svg` |
| UI chrome, panele | CSS transitions + keyframes | Zero JS overhead, GPU-accelerated transform/opacity |

**Odrzucone (i dlaczego):**
- Mermaid.js -- 2-3MB payload, lamie single-file philosophy
- D3.js -- redundancja z istniejacym systemem pozycjonowania
- React / Vue -- overengineering, niszczy "drag and drop HTML file" UX
- WebGL/WebGPU -- poza scope, overhead nieuzasadniony

### 1.3 State Management

```
Model: localStorage(acV28) -> JS Object AD[] -> Canvas SVG DOM
Flow:  preset.load() -> AD = [...] -> render() -> minimap update
Sim:   simStep() -> dispatch CustomEvent -> addDTLMsg() -> DOM update
```

**Klucze localStorage:** `acV28` (canvas state), `acV28_theme` (dark/light), `acV28_iconMode` (SVG/PNG)

**AD_MAP:** O(1) lookup object (zastapil 36x AD.find() w v21) -- utrzymac przy kazdym dodaniu agenta.

### 1.4 Zero External Dependencies -- ZASADA NIENARUSZALNA

- Fonty: Space Grotesk / Inter / JetBrains Mono -- inline @import z Google Fonts (jeden request, nie bundle)
- Ikony: inline SVG (AGENT_SVG, 27 icons) + opcjonalne base64 PNG (AGENT_IMG, v26)
- Animacje: WAAPI + CSS keyframes (Baseline 2023)
- Storage: localStorage (Baseline Widely Available)

### 1.5 Modularyzacja przy Przekroczeniu Limitu

Jesli plik osiagnie 5000 linii, kolejnosc kroków:

1. **Audit CSS** -- target: -100 linii (zduplikowane reguly, prefix overrides)
2. **Kompresja AGENT_KNOWLEDGE** -- multiline strings -> template strings (eliminacja pustych linii)
3. **Lazy init duzych moduli** -- HITL overlay, Live Monitor, Five Minds Arena inicjalizowane dopiero przy pierwszym wywolaniu
4. **Feature flags** -- const FEATURES = { liveMonitor: true, hitl: true } na gorze pliku
5. **Ostatnia deska ratunku** -- komentarze-markery + skrypt build.sh generujacy dist.html

---

## 2. Stack Technologiczny

### 2.1 Biezacy (v28.0)

```
HTML5 / CSS3 / ES2022 (const/let, template literals, optional chaining)
SVG 1.1 inline (agent connections, icons, data packets)
Canvas 2D API (starfield, particle effects, data stream background)
Web Animations API / WAAPI (agent status animations)
localStorage API (state persistence)
CSS Custom Properties (dark/light theme z data-theme attribute)
CSS Grid + Flexbox (layout)
ARIA 2.2 (role=dialog/tab, aria-live, aria-label -- 23 atrybuty)
```

### 2.2 Planowany Dodatek (v0.2.0 - v0.3.0)

```
Claude Code plugin SDK (plugin.json at root)
Hooks API (command/http hooks w settings.json)
Skills format (.claude/skills/*.md)
BroadcastChannel API (multi-tab sync w Live Monitor)
File System Access API (import EXECUTION_REPORT.json)
View Transitions API (progressive enhancement, z fallback)
```

### 2.3 Celowo Pominiete

```
TypeScript -- zbedny build step, vanilla JS wystarczy w single-file
React/Vue/Svelte -- filozofia zero-dependency
WebGL/WebGPU -- scope poza animacjami particles
WebAssembly -- brak uzasadnienia wydajnosciowego
Service Worker -- offline i tak dziala (static HTML)
```

---

## 3. Consensus Items (potwierdzone przez 3+ zrodla)

### C1: Five Minds Protocol = Unikalna Innowacja

**Status:** POTWIERDZONY (OMEGA 9/10, ALPHA, Reddit, X, Forum, GitHub)

Five Minds Protocol (4 ekspertow + Devil's Advocate + Gold Solution) nie ma bezposredniego odpowiednika w zadnym publicznym frameworku multi-agentowym (stan na kwiecien 2026). OMEGA: "To nie skopiowales. To jest TWOJE myslenie." ALPHA: "Original Innovation: 9.0/10."

**Implikacja dla roadmapy:** Five Minds musi byc prominentny w README, hero GIF, Show HN post. To differentiator #1.

### C2: Budowac Glebiej w Ekosystemie Anthropic

**Status:** POTWIERDZONY (Tech, Forum, X, Docs)

Claude Code 75% share wsrod uzytkow profesjonalnych. Plugin SDK + Hooks + Skills = naturalne rozszerzenie dla uzytkow Claude Code. Nie wychodzic na inne modele -- glebiej w Anthropic.

**Implikacja:** plugin.json, skills/agent-designer, hooks integration przed marketplace submission.

### C3: Visual MAS Tools = Niezagospodarowana Nisza

**Status:** POTWIERDZONY (GitHub, Reddit, UX, Forum)

React Flow (34k+ stars) jest frameworkiem, nie aplikacja. Brak narzedzia ktore robi to co Agent Architecture Designer robi: wizualny designer + generator promptow + edukacja + Five Minds. Nisza jest otwarta.

**Implikacja:** Hero GIF > screenshot > text w README (GitHub research). Pokazac unikalnosc wizualnie.

### C4: Token Cost Visibility = Priorytet Community

**Status:** POTWIERDZONY (Reddit 1 request, X, Forum, Researcher B)

Token cost = #1 request wsrod deweloperow uzywajacych multi-agent systems (Reddit research). Obecne szacunki w v28 sa edukacyjne. Community chce: per-agent, per-phase, cumulative. Sonnet preferred (59% wsrod deweloperow) ze wzgledu na cene/jakosc.

**Implikacja:** Token cost HUD w v0.2.0, nie pozniej. Widocznosc modelu + ceny juz w v28 (dobrze).

### C5: GitHub Pages jako Deployment

**Status:** POTWIERDZONY (GitHub, Tech, Forum)

Zero cost. Zero konfiguracji (jeden HTML plik). Dziala natychmiast po push. Kazda wersja = osobna sciezka (v28/, v27/ itd.).

**Implikacja:** Struktura repozytorium: root = najnowsza wersja, /versions/ = archiwum.

### C6: HITL jako Wyroznik -- Rozwijac Dalej

**Status:** POTWIERDZONY (Forum, Reddit, X, UX)

Human-in-the-Loop 120s standard (Forum). HITL = serce wartosci edukacyjnej ("user uczy sie decydowac, nie tylko patrzec"). 3 bramy decyzyjne w v25+ sa optymalne (za duzo = destrukcja flow, za malo = brak wartosci).

**Implikacja:** HITL animation, countdown, Debate Arena -- rozwijac w v0.3.0+.

---

## 4. Known Risks (z walidacji Critica i ALPHA/OMEGA)

### R1: Rozmiar Pliku -- WYSOKI

**Opis:** v28 = ~3500 linii. Kazda nowa wersja dodaje ~100-300 linii. Przy obecnym tempie: 5000 linii = 3-4 wersje.
**Wpływ:** LLM nie zmiesci calego pliku w kontekscie, trudniejszy code review, dlugi czas renderowania w GitHub.
**Mitygacja:** Hard limit 5000 LOC. Przed kazdym nowym feature: audit -50 LOC. Plan awaryjny: lazy init + feature flags.
**Wlasciciel:** Koder (v21 cleanup byl wzorowy -- powtorzyc metodologie)

### R2: Bezpieczenstwo -- XSS w JSON Import -- SREDNI

**Opis:** Funkcja importu konfiguracji JSON (jesli istnieje lub bedzie dodana) moze byc podatna na XSS przez `innerHTML` z niezaufanych danych.
**Wpływ:** Wykonanie szkodliwego kodu u uzytkownika importujacego zlosliwy plik JSON.
**Mitygacja:** Uzyc `textContent` zamiast `innerHTML` dla wszystkich dynamicznych wstawien. Przy JSON import: `JSON.parse()` z try/catch + whitelist dozwolonych kluczy. DOMPurify nie jest opcja (zero deps).
**Priorytet:** Zaimplementowac PRZED publiczna ekspozycja (pre-v0.1.0)

### R3: localStorage Migracja -- NISKI-SREDNI

**Opis:** Kazda wersja uzywa innego klucza (`acV14`, `acV15`... `acV28`). Dane uzytkownikow sa tracone przy aktualizacji.
**Wpływ:** Frustracja uzytkownikow, brak mozliwosci migracji konfiguracji.
**Mitygacja v0.2.0:** Funkcja exportu/importu JSON (user zapisuje reczne). Mitygacja v0.3.0: `localStorage.getItem('acV27')` -> automatyczna migracja przy pierwszym uruchomieniu.
**Plan:** EXPORT CONFIG button w v0.2.0 (150 linii).

### R4: Plugin Struktura Niezweryfikowana -- WYSOKI (pre-submission)

**Opis:** plugin.json format musi byc zweryfikowany przez Claude Code SDK przed submission do marketplace. Obecne skills w `.claude/skills/` sa poprawne formatem, ale plugin.json at root nie istnieje jeszcze.
**Wpływ:** Odrzucenie submission lub brak funkcjonalnosci.
**Mitygacja:** Zweryfikowac format plugin.json z docs.anthropic.com/claude-code/plugins PRZED submission.

### R5: Brak Testow -- WYSOKI (dlugoterminowy)

**Opis:** Zero testow jednostkowych, zero testow integracyjnych (zgodnie z ALPHA/OMEGA critique). Krytyczna luka wiarygodnosci technicznej.
**Wpływ:** Trudne debugowanie regresji przy nowych wersjach, brak confidence przy zmianach.
**Mitygacja:** Nie dodawac pelnego test suite natychmiast (to nie jest aplikacja produkcyjna). Zamiast: snapshot testing (porownanie HTML output przed/po zmianach) + reczna checklista QA per wersja.

---

## 5. Open Questions (nierozwiazane)

### Q1: Mermaid Export -- inline czy osobny tool?

**Pytanie:** Eksport konfiguracji canvas do Mermaid diagram -- wygenerowac w oknie, skopiowac do schowka, czy osobna strona?
**Opcja A:** Inline (okno modalne z kodem Mermaid + copy button) -- ~250 linii
**Opcja B:** Osobny plik mermaid-export.js -- lamie single-file philosophy
**Rekomendacja:** Opcja A. Okno modalne z textarea + copy. Mermaid.js NIE jest wymagany (generujemy tylko tekst).

### Q2: Kreator Agentow -- gdzie przechowywac custom agents?

**Pytanie:** Uzytkownik tworzy wlasnego agenta. Gdzie on zyje?
**Opcja A:** localStorage (prosty, ale brak eksportu)
**Opcja B:** JSON download (plik `my-agents.json`) -- portable
**Opcja C:** Oba (save local + export)
**Rekomendacja:** Opcja C. Schema: `{ id, name, role, phase, model, prompt, color, icon }` -- 8 pol.

### Q3: Monetyzacja -- open source czy freemium?

**Pytanie:** Model biznesowy po osiagnieciu trakcji na GitHub.
**Opcja A:** Pelny open source MIT -- maksymalna adopcja, zero przychodow
**Opcja B:** Core open source + premium presets/templates -- Gumroad/Stripe
**Opcja C:** Sponsorzy GitHub (jak Sindre Sorhus)
**Status:** Nierozwiazane. Decyzja po osiagnieciu 100+ GitHub stars.

### Q4: Jezyk README -- polski czy angielski?

**Pytanie:** README.md jezyk dla publicznego repo.
**Rekomendacja:** Angielski README.md + polska nota w stopce ("Interface: Polish | Documentation: English"). Rynek angielskojezyczny = 10x wiekszy.

### Q5: Hero GIF -- co pokazac?

**Pytanie:** Glowny GIF animowany w README (GitHub research: Hero GIF > screenshot > text).
**Rekomendacja:** 15-sekund GIF pokazujacy: (1) zaladowanie presetu Deep Five Minds -> (2) uruchomienie Live Simulation -> (3) agenci "rozmawiaja" ze soba -> (4) HITL decision gate. To pokazuje wszystkie differentiatory w jednym ujciu.

---

## 6. Architektura Agentow (stan v28.0)

### 6.1 Agenci (28)

| Kategoria | Agenci | Faza |
|-----------|--------|------|
| Orchestration | Orkiestrator, Syntetyk, Analityk, Planer | strategy |
| Research | Res.Tech, Res.UX, Res.Reddit, Res.X, Res.GitHub, Res.Forums, Res.Docs, Res.Critic | research |
| Build | Backend, Frontend, Feature Dev, Designer, Integrator, Writer | build |
| QA | QA Security, QA Quality, QA Perf, Manager QA | qa |
| Five Minds | Expert Pragmatist, Expert Innovator, Expert Analyst, Expert Advocate, Expert Shadow | fiveminds |
| HITL | Decision Presenter | hitl |

### 6.2 Presety (29)

Tierowanie: Tier 1 Minimal (3), Tier 2A Core (5), Tier 2B Core (7), Tier 3 Advanced (8), Tier 4 Enterprise (6).
Flagship: **Deep Five Minds Ultimate** (29 agentow, 5 HITL punktow, dwie debaty Five Minds).

### 6.3 Modele

| Model | Zastosowanie | Cena (input) |
|-------|-------------|--------------|
| Claude Opus 4.6 | Orkiestrator, Syntetyk (strategia i synteza) | $15/MTok |
| Claude Sonnet 4.6 | Wiekszosc agentow roboczych | $3/MTok |
| Claude Haiku 4.5 | Proste zadania, QA, HITL gating | $0.25/MTok |

---

## 7. Plugin Architecture (planowany)

### 7.1 plugin.json (root repozytorium)

```json
{
  "name": "agent-architecture-designer",
  "description": "Visual multi-agent system designer for Claude Code. Design, configure, and generate prompts for agent teams.",
  "version": "0.1.0",
  "type": "skill",
  "entrypoint": ".claude/skills/agent-designer/SKILL.md",
  "keywords": ["multi-agent", "orchestration", "five-minds", "hitl", "visual-designer"]
}
```

### 7.2 Skills (istniejace)

- `.claude/skills/five-minds/SKILL.md` -- Five Minds Protocol debata
- `.claude/skills/hitl-pipeline/SKILL.md` -- HITL pipeline z bramami decyzyjnymi

### 7.3 Hooks (planowane)

```json
// .claude/settings.json additions
{
  "hooks": {
    "command": [
      { "matcher": "agent", "command": "node .claude/hooks/agent-validator.js" }
    ]
  }
}
```

---

## 8. Design System Tokens (aktualne w v28.0)

### 8.1 Kolory -- Dark Theme (default)

```css
--bg0: #06060A;           /* main background */
--bg1: #0F0F18;           /* panel backgrounds */
--accent1: #818CF8;       /* indigo -- primary, strategy */
--accent2: #34D399;       /* emerald -- success, build */
--accent3: #FBBF24;       /* amber -- warning, thinking */
--accent4: #F87171;       /* red -- error, QA */
--gold: #F59E0B;          /* Five Minds, HITL */
--t1: #E4E4E7;            /* primary text, 16.5:1 contrast */
--t2: #71717A;            /* secondary text */
```

### 8.2 Kolory -- Light Theme ([data-theme=light])

Pelne overrides w CSS Custom Properties. Wprowadzone w v23.

### 8.3 Fazy i Kolory

| Faza | Kolor | Hex |
|------|-------|-----|
| strategy | indigo | #818CF8 |
| research | cyan | #06B6D4 |
| fiveminds | gold | #F59E0B |
| build | emerald | #34D399 |
| qa | red | #F87171 |
| hitl | purple | #E879F9 |

---

## 9. Changelog Kluczowych Wersji

| Wersja | Kluczowa innowacja |
|--------|-------------------|
| v1-v4 | Canvas, presets, multi-select, tooltips |
| v5-v9 | Visual modes: Card Carousel, Infographic, Mind Map, Bento |
| v11-v13 | Neural Constellation, glassmorphism, animated starfield |
| v14 | Live Simulation -- speech bubbles, data packets |
| v15-v16 | Agent Encyclopedia z AGENT_KNOWLEDGE i PRESET_KNOWLEDGE |
| v17 | Smart Canvas -- marquee select, auto-place, suggestions |
| v18 | Mission Control -- fullscreen simulation dashboard |
| v19-v20 | SVG Icon Suite + Chromatic Icons (per-agent colors) |
| v21 | Smart Controls + Code Quality (ARIA, semantic HTML, O(1) lookups) |
| v22 | Context Menu + Rich Prompt view |
| v23 | Dark/Light theme toggle |
| v24 | Live Monitor -- AnimationManager, 7 agent states, Debate Arena |
| v25 | HITL Decision Gates -- 3 bramy, 120s timer, auto-decide |
| v26 | Cosmic Icons -- 57 PNG Imagen 4 |
| v27 | Unified Sidebars |
| **v28** | **Research-Backed Prompts -- 28 agentow przepisanych** |

---

## 10. Definition of Done -- v0.1.0 GitHub Publication

Wszystkie ponizsze pozycje musza byc zaznaczone przed push do publicznego repo:

- [ ] README.md w jezyku angielskim z hero GIF
- [ ] Audyt bezpieczenstwa (XSS check -- R2)
- [ ] AGENT_TEAMS_CONFIGURATOR_v28.html jako plik glowny (index.html lub link)
- [ ] plugin.json at root (weryfikacja formatu)
- [ ] LICENSE (MIT)
- [ ] .gitignore (wyklucz node_modules, .DS_Store, Thumbs.db)
- [ ] GitHub Pages wlaczone (Settings -> Pages -> Deploy from main)
- [ ] Pierwsza wersja Show HN post przygotowana (draft)
- [ ] Opisowe tagi repozytorium: multi-agent, claude-code, five-minds, hitl, visual-designer

---

*MANIFEST v2.0 | Syntetyk [OPUS] | 2026-04-07*
*Poprzednia wersja: live-monitor-research/MANIFEST.md (v1, specyficzny dla Live Monitor Mode v22)*
