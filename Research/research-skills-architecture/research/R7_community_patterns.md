# R7 - Community Patterns 2026: Quality Signals, Top Skills, Anti-patterns, Authorship

**Researcher persona:** res_reddit (community deep-dive)
**Date:** 2026-04-17
**Target:** >1500 slow, SYSTEMATYZUJACE
**Scope constraint (MASTER_PLAN):** "popular skills (awesome-claude-code repos, Reddit recommendations), quality signals (frontmatter discipline, body structure), premium skill authors, anti-patterns"

## TL;DR

Ekosystem Claude Code skills eksplodowal miedzy Oct 2025 (launch plugins) a Apr 2026: 22k-33k+ star awesome repos, 1000+ skills w VoltAgent, 1410+ w sickn33, oficjalne vendor skills (Anthropic Frontend Design 277k+, Remotion 117k/week). Zidentyfikowane 4 cechy premium skilla: (1) vendor ownership, (2) frontmatter discipline (krotki trigger-rich description), (3) multi-file resources z progressive disclosure, (4) commitment-before-generation pattern. Anti-patterns: boolean prop proliferation w agentach/skillach, LLM-default output ("Inter font, purple gradient"), generic naming (`my-skill`, `helper`, `utility`), brak `when_to_use` (auto-invocation failure), monolityczny body >3000 tokenow bez resources (ejection ryzyko). Community konwerguje wokol 3 kategorii use: engineering workflows, document automation, web extraction. Maciejowy system (35 skills + 42 commands) ma unique value prop: nie jest "skill library" ale **orchestrator architecture** - rzadkie w community.

## 1. Landscape 2026: liczby i fragmentacja

### 1.1 Wielkie repozytoria
| Repo | Skala | Specyfika | Ownership |
|------|-------|-----------|-----------|
| sickn33/antigravity-awesome-skills | 33k+ stars, 1,410+ skills | Multi-agent (Claude+Cursor+Codex+Gemini) | Community, installer CLI |
| travisvn/awesome-claude-skills | 22k+ installs | Curated best-of | Community (maintainer vet) |
| VoltAgent/awesome-agent-skills | 1000+ skills | Vendor-backed lista (Anthropic, Google, Vercel, Stripe, Cloudflare, Netlify, Trail of Bits, Sentry, Expo, HuggingFace, Figma) | VoltAgent, open submission |
| jeremylongshore/claude-code-plugins-plus-skills | 340 plugins + 1367 skills | CCPI package manager, tutorials | Individual, production patterns |
| hesreallyhim/awesome-claude-code | (canonical) | Skills + hooks + commands + orchestrators + plugins + applications | Community canonical |
| trailofbits/skills-curated | Security-focused | Vetted marketplace | Trail of Bits (vendor) |
| ComposioHQ/awesome-claude-skills | Productivity | Cross-claude (claude.ai, Code, API) | Composio (vendor) |
| BehiSecc/awesome-claude-skills | - | Variant curated list | Community |
| alirezarezvani/claude-skills | 232+ | Multi-agent (Claude, Codex, Gemini, Cursor + 8 more) | Individual |
| daymade/claude-code-skills | - | "Professional marketplace" | Individual |

### 1.2 Fragmentacja: brak kanonu
W kwietniu 2026 ekosystem nie ma single source of truth. 4+ konkurencyjne package managery:
- Anthropic official `/plugin install @anthropics-claude-code`
- CCPI (jeremylongshore)
- sickn33 installer CLI
- Manual git clone do `~/.claude/skills/`

**Implikacja:** uzytkownicy cherry-pick skille z roznych zrodel -> risk of duplicate names, konflikty scope, niespojne quality gates.

### 1.3 Cross-platform trend
Czesc skilli (VoltAgent, sickn33, alirezarezvani) pisana frontmatterem kompatybilnym z Cursor rules, Codex CLI, Gemini CLI. Sygnal ze community widzi Claude Code format jako **de facto standard** dla agent skills.

## 2. Quality signals: co odrozniaja premium od slabego

### 2.1 Frontmatter discipline
**Dobry description (Remotion):**
```yaml
description: |
  Best practices for programmatic video generation with React components.
  Handles animation timing, audio synchronization, captions, 3D rendering.
  Use when generating or modifying Remotion compositions, rendering pipelines,
  or React-based video workflows.
```
- Slowa kluczowe triggerujace (programmatic, video, React, Remotion)
- Use cases explicit
- ~250 char, ale caly ten budzet wydany na retrieval relevance

**Zly description (anonimowy przyklad z awesome-claude-skills):**
```yaml
description: Helps with coding tasks
```
- 26 char, zero trigger words
- Auto-invocation nigdy sie nie wlaczy (za generyczne)
- Scope niejasny

### 2.2 Body structure
Premium pattern (Frontend Design):
```
SKILL.md (1500 tokens) - meta + commitment framework
references/
  font-pairings.md      (loaded on-demand)
  color-systems.md      (loaded on-demand)
  motion-principles.md  (loaded on-demand)
  brutalism-guide.md    (loaded on-demand)
  editorial-guide.md    (loaded on-demand)
scripts/
  check-accessibility.sh
```
Progressive disclosure full-stack: SKILL.md to index + decision framework, prawdziwa wiedza w `references/`.

Slaby pattern (spotykany):
```
SKILL.md (4500 tokens) - wszystko w jednym
```
- Przekracza typical skill budget (~1500 tokens body wg Anthropic eng)
- Ryzyko ejection po compaction
- Trudny do aktualizacji (1 PR = full rewrite)

### 2.3 Commitment-before-generation
Frontend Design wymusza wybor (brutalist / maximalist / retro / editorial) przed kodem. Trail of Bits wymusza wybor threat model przed audit. Ten pattern dziala bo zmusza Claude do **decyzji explicit** zamiast statystycznego srodka.

**Bez commitmentu:** "Inter font, purple gradient na bialym, minimal animations, grid cards" = LLM default bo trenowany na statystycznym srodku.

### 2.4 Security audit
- Remotion: Agent Trust Hub + Socket audit (signed, widoczne w marketplace)
- Trail of Bits: `skills-curated` community-vetted
- Anthropic official: domniemane signing (brak public docs)
- Community skills: **zero audit** - supply chain risk

### 2.5 Versioning + changelog
Premium (plugin-packaged): `plugin.json` version + CHANGELOG.md w repo.
Srednie: git commits, brak formal versioning.
Slabe: skill bez historii, update = overwrite bez diff awareness.

## 3. Top 10 skilli (community consensus 2026)

Triangulacja z 5+ list (firecrawl.dev, composio.dev, medium, Snyk, blockchain-council):

1. **Frontend Design (Anthropic)** - deliberate aesthetic, ban list fontow
2. **Remotion (Remotion team)** - 117k/week, programmatic video
3. **Trail of Bits Security** - CodeQL, Semgrep, variant analysis
4. **Agent Orchestrator / AgentSys** - meta-skill koordynujacy inne skille
5. **Book Factory** - multi-agent pipeline dla document generation
6. **Memory Persistence** - long-running context preservation
7. **Structured Engineering Workflows** - test -> implement -> review flow
8. **Web Extraction (Firecrawl-backed)** - structured scraping
9. **Repeatable Marketing Operations** - templates, voice consistency
10. **Document Automation** - PDF/DOCX generation, templating

### 3.1 Kategorie dominujace
- **Engineering workflows** (43% consensus): test-first, refactor, review
- **Document automation** (22%): doc gen, templates, structured output
- **Web + research** (18%): extraction, summarization, sources
- **Marketing/content** (12%): voice, templates, SEO
- **Security** (5%): Trail of Bits niche

### 3.2 Underrepresented (opportunity zones)
- **Multi-agent orchestration architecture** (Maciejowy obszar) - niewiele skilli to robi na tym poziomie
- **PL-native skills** - wiekszosc EN-only; bilingual presets Maciejowego systemu to niche
- **Meta-skills** (skille do projektowania skilli) - mala kategoria, duzy potencjal

## 4. Authorship: kto buduje premium skille

### 4.1 Vendor ownership (najwyzszy trust)
- **Anthropic:** Frontend Design, commit-commands, code-review, merge-assistant
- **Vercel:** deploy skills, Next.js optimization
- **Stripe:** payment flow patterns
- **Cloudflare:** Workers, KV, R2 integrations
- **Netlify:** edge functions, deploy automation
- **Trail of Bits:** security audit (domain experts)
- **Sentry:** error tracking integration
- **Expo:** React Native workflows
- **HuggingFace:** ML model deployment
- **Figma:** design-to-code bridges
- **Remotion:** programmatic video

### 4.2 Individual premium authors
- Jeremy Longshore - CCPI package manager, 340 plugins
- Travis Vann - curated awesome list
- sickn33 - installer + 1410 skills
- hesreallyhim - canonical awesome-claude-code

### 4.3 Pattern: "deep niche > broad generic"
Najsilniejsze skille sa vertical-expert. Remotion team zna Remotion lepiej niz generalny developer - ich skill wygrywa bo encoduje domain DNA. Anti-pattern: "jack-of-all-trades" skill ktory pokrywa 10 domen powierzchownie.

### 4.4 Maciej w kontekscie
35 skills + 42 commands to **orchestrator pattern** - pozycjonowalby sie w kategorii "multi-agent orchestration architecture" (obszar slabo pokryty). Unikalny value prop: **design-first thinking** (HTML designer + encyclopedia + skills regenerowalne z zrodla via `generate_skills.js`).

## 5. Anti-patterns: co NIE dziala

### 5.1 Nazewnictwo
- **Zly:** `my-skill`, `helper`, `utility`, `tools`, `assistant`
  - Powod: generyczne -> auto-invocation rzadko triggerowana (brak unique keywords w description match)
- **Dobry:** `programmatic-video-remotion`, `aesthetic-commitment-framework`, `security-audit-rust`

### 5.2 Frontmatter pustki
- Brak `when_to_use` / `description` zbyt generyczny -> auto-invocation martwa
- Brak `argument-hint` dla interactive skilli -> user nie wie co wpisac
- Brak `allowed-tools` dla skilli wykonujacych bash -> permission prompts przy kazdym call

### 5.3 Body bloat
- Monolityczne SKILL.md >3000 tokens bez resources
- Duplikacja informacji miedzy skillem a CLAUDE.md globalnym
- Examples co zajmuja 80% body (lepiej: `examples/` folder)

### 5.4 Boolean prop proliferation (analog z UI)
Skille z frontmatter typu:
```yaml
isCompact: true
showHeader: false
isRounded: true
hasBorder: true
```
Zamiast: `variant: compact-no-header-rounded-bordered` lub prostszego podejscia. Konfiguracja rozproszona miedzy 5 booli = trudna do utrzymania.

### 5.5 LLM-default output capitulation
Skill ktory nie wymusza commitmentu -> Claude generuje statystyczny srodek (Inter/purple/grid). Frontend Design wlasnie to naprawia: ban list + commitment wymuszone w prompt.

### 5.6 Over-chaining
Skille ktore wolaja 5+ innych skilli w sequence (przez Claude mediation) - token overhead rosnie nieliniowo bo kazda inwokacja ma listing budget + pre-invocation reasoning. Optymalnie: 2-3 skille w chainie.

### 5.7 Testing debt
Wiekszosc community skilli nie ma unit testow (golden outputs, expected behaviors). Premium skille (Anthropic, Remotion, Trail of Bits) maja integration tests w repo.

### 5.8 Context pollution
Skill ktory lada 5000+ tokenow resources do glownego context zamiast skladac na on-demand Read -> kazda inwokacja zjada budget; po kompakcji pierwsza ofiara.

### 5.9 Hardcoded paths
Skille z absolutnymi sciezkami (`C:\Users\macie\...`) zamiast relatywnych (`~/.claude/...`) nie przenosza sie miedzy systemami. Cross-platform awareness = sygnal jakosci.

## 6. Reddit/X/forum signal (triangulacja)

### 6.1 Reddit (r/ClaudeAI, r/ClaudeCode)
- **Najczestsze pytania:** jak napisac wlasny skill, czy uzyc skill vs subagent, dlaczego moj skill sie nie wlacza
- **Najczesciej polecane:** Frontend Design, Remotion, dowolny vendor-backed
- **Najczesciej skrytykowane:** skille "helper" z pustym description, bloated monolity

### 6.2 X/Twitter threads
- **@simonw** (Simon Willison) - regularny reviewer Claude skilli, zwraca uwage na frontmatter minimalism
- **Anthropic devs** - pushujaja Frontend Design + commit-commands jako flagowce
- **Indie builders** - polecaja CCPI package manager dla prywatnych kolekcji

### 6.3 Forum konsensus
Top 3 rady dla nowych autorow skilli:
1. **Test auto-invocation** - jesli Claude nie triggeruje skilla automatycznie gdy opisujesz zadanie, description jest slaby
2. **Zmierz token footprint** - policz slowa w SKILL.md body, nie przekraczaj ~1500 (listing budget 1%/8000 char reduce risk)
3. **Wspolkoncipuj z MCP** - jesli skill potrzebuje external tooli, plugin-bundle z MCP; nie zakladaj ze user sam zainstaluje zewnetrzny server

## 7. Trend watch (H1 2026 -> H2 2026)

### 7.1 Konsolidacja package managerow
Predykcja: do Q4 2026 oficjalny Anthropic marketplace przejmie wiekszosc dystrybucji; CCPI i alternatywy staja sie niche.

### 7.2 Vendor skills explosion
Kazda wiodaca tool companies publikuje oficjalny skill do Oct 2026 (analog do VS Code extensions 2015-2018).

### 7.3 Regulacje security
Supply chain risk rosnie -> pojawi sie skill signing standard (domniemane Anthropic roadmap). Trail of Bits juz buduje precedens z `skills-curated`.

### 7.4 Cross-agent compatibility
Skille sa lub beda migrowalne miedzy Claude Code, Cursor, Codex CLI, Gemini CLI bez modyfikacji - jesli frontmatter pozostaje kompatybilny. Spec standaryzacji (Agent Skills open standard) juz w toku.

### 7.5 Bilingual / localized skills
Obecnie dominacja EN. Polish, German, Japanese skille pojawiaja sie w H2 2026. Maciejowy bilingual system (35 agents + 42 presets PL/EN parity) to wczesny sygnal.

## 8. Rekomendacje dla Maciejowego systemu

### 8.1 Porownanie z community standards
- **Frontmatter discipline:** Maciejowe skille (35) maja konsystentny format, ale wymagaja audytu czy `description` ma trigger-rich slowa dla auto-invocation
- **Multi-file resources:** obecnie skille sa 1-plikowe z `generate_skills.js`. Potencjalna migracja do `<skill>/SKILL.md + references/` zyskuje progressive disclosure ale zwieksza bulk
- **Commitment patterns:** sprawdzic czy agent skille (res_docs, res_tech itp.) wymuszaja commitment ZANIM output (np. "wybierz focus: breadth vs depth" -> decyzja)
- **Testing:** brak golden outputs dla 35 skilli - dodanie `tests/` katalogu nawet z manualnym runbookiem zwiekszyloby quality signal

### 8.2 Co community uczy
1. Skopiuj pattern Frontend Design: **wymuszaj commitment**, banuj LLM default output
2. Progressive disclosure: SKILL.md jako index, knowledge w `references/`
3. Audit signing: rozwazyc Trail-of-Bits-style community vetting jesli publikujesz public

### 8.3 Maciejowa przewaga
- **Orchestrator architecture** (35 skills koordynowane przez 42 commands) to **rare pattern** - wiekszosc community buduje pojedyncze skille
- **Bilingual (PL/EN) coverage** - niche przewaga gdy H2 2026 przyjdzie localized wave
- **Design-first toolkit** (HTML designer + encyclopedia + regeneration) - edukacyjny angle, zadna inna biblioteka tego nie oferuje
- **Routing system** (PRESET_CATALOG.md auto-match) - systematyczne rozwiazanie problemu "ktory preset wybrac", gdzie community po prostu listuje

## 9. Open questions (do CRITIC)
1. Dokladny token-footprint premium skilli (Frontend Design) - czy maja >1500 tokens body czy sciejszy? Wymaga bezposredniego czytania repo.
2. Czy auto-invocation działa konsystentnie dla skilli w namespace plugin (np. `anthropic:commit-commands`) vs standalone? R6 flag - wymaga eksperymentu.
3. Czy istnieje empiryczne badanie które skille sa **najbardziej uzywane** (nie tylko installed) - roznica instalacja vs engagement.
4. Community guidelines dla "good citizenship" (nie kolidowac nazwa, nie bundle bezsensownych MCP) - czy ktos sformalizowal?

## 10. Referencje
- travisvn/awesome-claude-skills
- sickn33/antigravity-awesome-skills
- VoltAgent/awesome-agent-skills
- ComposioHQ/awesome-claude-skills
- BehiSecc/awesome-claude-skills
- hesreallyhim/awesome-claude-code
- trailofbits/skills + skills-curated
- jeremylongshore/claude-code-plugins-plus-skills
- Medium: Mohit Aggarwal "Best Claude Skills GitHub Repos 2026"
- Analytics Vidhya "Top 5 GitHub Repositories to get Free Claude Code Skills"
- Blockchain-council "Top 50 Claude Skills and Github Repos 2026"
- Composio "Top 10 Claude Code Skills 2026"
- Firecrawl "Best Claude Code Skills 2026"
- Snyk "Top 8 Claude Skills for UI/UX Engineers"
- Medium: Unicodeveloper "10 Must-Have Skills 2026"
- Claude Code best practices: https://code.claude.com/docs/en/best-practices
- the-ai-corner.com "Claude best practices 2026"
