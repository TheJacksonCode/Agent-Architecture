# R6 - Plugin Skills vs Standalone: Namespacing, Marketplace Distribution, Trade-offs

**Researcher persona:** res_x (deep technical X/blog synthesis)
**Date:** 2026-04-17
**Target:** >1500 slow, SYSTEMATYZUJACE nie uczace
**Scope constraint (MASTER_PLAN):** "plugin namespacing `vercel:deploy` - polacz z marketplace distribution"

## TL;DR (executive)

Plugins sa **kontenerami dystrybucyjnymi** dla skilli (i agentow + MCP + hookow + commandow) w Claude Code. Standalone skill to surowy plik `~/.claude/skills/foo.md` - zero dystrybucji, zero wersjonowania, ale zero narzutu. Plugin rozwiazuje 4 problemy ktore standalone ignoruje: (a) **namespacing** (`plugin-name:skill-name`) rozwiazuje kolizje nazw, (b) **dystrybucje** (jeden `/plugin install`), (c) **wersjonowanie** (marketplace tracking), (d) **bundling** (skill+MCP+hook+command jako atomowa jednostka). Koszt: overhead `plugin.json`, `.claude-plugin/` folder, marketplace registration, a wybor modelu skilla (`model:` field) pozostaje identyczny w obu trybach. W 2026 ekosystem eksplodowal: oficjalny Anthropic marketplace + 22k+ star repos (travisvn, sickn33 33k+, VoltAgent 1000+ skills, jeremylongshore 340 plugins/1367 skills). Dla Maciejowego systemu (35 skills + 42 commands) plugin-izacja to droga do **shareability** - ale tylko jesli ma byc dystrybuowany; prywatnie narzut sie nie zwraca.

## 1. Arhcitektura plugin: co sie zmienia vs standalone

### 1.1 Standalone skill (baseline)
Plik: `~/.claude/skills/my-skill.md` lub `.claude/skills/my-skill.md`.
```
my-skill.md
---
name: my-skill
description: What this does
---
# Body
```
- Zero struktury katalogow (opcjonalnie `my-skill/SKILL.md` jesli sa resources)
- Nazwa globalna (kolizja = ostatni wygrywa wg scope priority)
- Zero wersji, zero metadata (autor, license, repo)
- Dystrybucja: kopiuj plik recznie / git clone do `~/.claude/skills/`

### 1.2 Plugin skill
Struktura katalogu:
```
my-plugin/
  .claude-plugin/
    plugin.json           <- metadata (name, version, author, description)
    marketplace.json      <- opcjonalne, pokazuje w marketplace
  skills/
    skill-a/SKILL.md      <- skill bundled w pluginie
    skill-b/SKILL.md
  agents/
    agent-x.md            <- subagent definition
  commands/
    cmd-foo.md            <- slash command
  mcp/
    server.json           <- MCP server config (opcjonalne)
  hooks/
    pre-commit.sh         <- hook scripts (opcjonalne)
```
- Namespace: `my-plugin:skill-a`, `my-plugin:agent-x`, `my-plugin:cmd-foo`
- Wersjonowanie: `plugin.json` -> `version: "1.2.3"` (semver)
- Instalacja: `/plugin install my-plugin@marketplace-name`
- Reload: `/reload-plugins` po instalacji

### 1.3 Kluczowa roznica: bundling
Plugin moze zawierac **jednoczesnie** skills + agents + commands + MCP + hooks - atomowa jednostka dystrybucji. Standalone to **tylko skill**. Jesli twoj skill wymaga MCP servera (np. Jira skill wymaga mcp-atlassian), plugin bundluje to razem; standalone wymaga od usera recznej instalacji MCP.

## 2. Namespacing: mechanizm i semantyka

### 2.1 Format
- Skill: `plugin-name:skill-name` (np. `vercel:deploy`, `trail-of-bits:audit-rust`)
- Agent: `@plugin-name:agent-name` (np. `@team-conventions:migration-agent`)
- Command: `/plugin-name:cmd-name` (np. `/commit-commands:commit`)

### 2.2 Kolizje
Standalone: dwa skille o nazwie `deploy` w `~/.claude/skills/deploy.md` i `.claude/skills/deploy.md` -> project wins (scope priority). Plugin: `vercel:deploy` i `netlify:deploy` koegzystuja bez konfliktu, user wybiera ktory.

### 2.3 Invocation semantyka
- Auto-invocation (description match): Claude widzi `vercel:deploy` i `netlify:deploy` jako osobne opcje; w rozumowaniu pre-invocation waha sie ktory jest lepszy dla danego kontekstu. **Implikacja:** overlappujace skille w roznych pluginach zwiekszaja koszt pre-invocation reasoning.
- Manual invocation: `/vercel:deploy` lub `/netlify:deploy` - user eksplicitly wybiera.
- Permission rules (Skill tool): `Skill(vercel:deploy)`, `Skill(netlify:*)` - namespace jest first-class w regulach dostepu.

### 2.4 Referencja krzyzowa z R3
R3_invocation_paths.md sekcja 3 dokumentuje Skill tool syntax. Plugin namespace dziala identyczne jak standalone dla wszystkich 3 sciezek (auto / manual / Skill tool), tylko nazwa jest prefiksowana.

## 3. Marketplace: dystrybucja i governance

### 3.1 Trzy poziomy marketplace
1. **Oficjalny Anthropic marketplace** (`claude-plugins-official`): automatycznie dostepny po starcie Claude Code. Zawiera Anthropic-built pluginy (commit-commands, code-review, itp.). Highest trust.
2. **Public marketplace** (claudemarketplaces.com, skillsmp.com): third-party katalogi, submit przez PR do repo marketplace.json.
3. **Custom marketplace** (self-hosted): `extraKnownMarketplaces` config w `~/.claude/settings.json`. Akceptuje GitHub repos, Git URLs, local paths, remote URLs.

### 3.2 Instalacja flow
```bash
/plugin install commit-commands@anthropics-claude-code
/reload-plugins
```
- `plugin-name@marketplace-name` to fully-qualified identifier
- `/reload-plugins` triggeruje live change detection (bez restartu CC)
- Po instalacji skill jest dostepny jak standalone (auto-invocation, manual, Skill tool)

### 3.3 Aktualizacje
- `/plugin update commit-commands` - pull latest version z marketplace
- `plugin.json: version` jest single source of truth
- Marketplace sprawdza signature (dla oficjalnych) lub publisher (dla third-party)

### 3.4 Top marketplaces w 2026 (ekosystem)
| Repo | Stars | Zawartosc | Model biznesowy |
|------|-------|-----------|------------------|
| **sickn33/antigravity-awesome-skills** | 33k+ | 1,410+ skills, multi-agent (Claude+Cursor+Codex+Gemini) | Open source, installer CLI |
| **travisvn/awesome-claude-skills** | 22k+ | Curated "best of" lista | README-as-catalog |
| **VoltAgent/awesome-agent-skills** | (~fork) | 1000+ skills, oficjalne zespoly (Anthropic, Google, Vercel, Stripe, Cloudflare, Netlify, Trail of Bits, Sentry, Expo, HuggingFace, Figma) | Curated vendor-backed |
| **jeremylongshore/claude-code-plugins-plus-skills** | - | 340 plugins + 1367 agent skills, CCPI package manager | Alternative package manager |
| **hesreallyhim/awesome-claude-code** | - | Szeroki scope: skills + hooks + commands + orchestrators + plugins | Canonical awesome list |
| **trailofbits/skills-curated** | - | Security-focused vetted plugins | Trail of Bits marketplace |
| **ComposioHQ/awesome-claude-skills** | - | Productivity-focused cross-claude (claude.ai, Code, API) | Composio-backed |

### 3.5 Fragmentacja
Brak kanonicznego indeksu - 7+ "awesome" list, 3+ package managerow (Anthropic default, CCPI, installer CLI). Community jeszcze nie skonwergowalo, choc oficjalny marketplace ma structural advantage (auto-available).

## 4. Premium skille - case studies

### 4.1 Frontend Design (oficjalny Anthropic)
- 277k+ installs (wedlug community raportow)
- Wymusza deliberate aesthetic choices (brutalist, maximalist, editorial)
- **Ban list:** Inter, Roboto, Arial, Space Grotesk fonts (anty-sredni design)
- Struktura: frontmatter + multi-file resources (font-pairings.md, color-systems.md, motion-principles.md)
- Rozmiar: ~15 plikow w resources/, ale `description` kompaktowy (<500 char)
- Pattern: "commitment przed generacja" - zmusza Claude do wyboru kierunku vizualnego **zanim** pisze kod

### 4.2 Remotion (oficjalny vendor)
- 117k+ weekly installs
- Security audit od Agent Trust Hub i Socket (signed)
- Utrzymywany przez Remotion team (zrodlo API knowledge)
- Pattern: domain-specific reference (animations, timing, audio, captions, 3D)
- Rozmiar: ~30-50 plikow w resources, kazdy per-topic

### 4.3 Trail of Bits Security (vendor)
- `trailofbits/skills` + `trailofbits/skills-curated` marketplace
- Zawiera: CodeQL analysis, Semgrep integration, variant analysis, audit methodologies
- Pattern: tool-bundled (skill + MCP servers dla security tools) - wlasnie przypadek gdzie plugin > standalone
- Governance: community-vetted (external contributions pass review)

### 4.4 Co maja wspolne (DNA premium skilla)
1. **Vendor ownership** - utrzymywany przez firmy ktore znaja domain (Remotion team robi Remotion skill)
2. **Frontmatter discipline** - krotki `description` ze slowami kluczowymi triggerujacymi (nie "helps with videos" tylko "programmatic video generation with React components, animation timing, Remotion framework")
3. **Multi-file resources** - body SKILL.md ~1500 tokens, resources `references/` loadowane on-demand przez Read (progressive disclosure full-stack)
4. **Commitment patterns** - wymuszaja decyzje ZANIM kod (Frontend Design: wybierz styl; Trail of Bits: wybierz threat model)
5. **Security review** - premium skills maja audit (Remotion: Socket + Agent Trust Hub)

## 5. Koszty vs benefity: decision matrix

### 5.1 Standalone skill - kiedy wystarcza
- Prywatny use (nikt inny tego nie bedzie instalowal)
- Single-file logic (brak MCP, brak hookow)
- Nie potrzebujesz wersjonowania
- Maciejowy use case: 35 skills w `~/.claude/skills/` = standalone, bo prywatny systematic system

### 5.2 Plugin - kiedy oplaca
- Chcesz shareowac (open source, team-wide, komercyjny)
- Bundle logic: skill + MCP + hook + command razem
- Potrzebujesz wersjonowania (update tracking)
- Chcesz byc w marketplace (discoverability)

### 5.3 Hybryda (realistyczna dla Macieja)
- **Private skills:** 35 standalone w `~/.claude/skills/` (agent definitions) - zero plugin overhead
- **Private commands:** 42 standalone w `~/.claude/commands/` - same rationale
- **Public plugin (opcjonalne):** jesli Maciej opublikuje "Agent Architecture Designer Toolkit" jako plugin -> bundle 35 skills + 42 commands + catalog + routing instruction w jednym `.claude-plugin/` - jeden `/plugin install agent-architecture` zastepuje manualny clone

## 6. Plugin internals: plugin.json schema

Minimalny `plugin.json`:
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Short plugin description",
  "author": "Maciej Palczewski",
  "license": "MIT",
  "repository": "https://github.com/user/my-plugin"
}
```

Extended fields (obserwowane w ekosystemie):
```json
{
  "skills": ["skills/skill-a", "skills/skill-b"],
  "agents": ["agents/agent-x.md"],
  "commands": ["commands/cmd-foo.md"],
  "mcp": { "server": "./mcp/server.json" },
  "hooks": { "pre-commit": "./hooks/pre-commit.sh" },
  "dependencies": {
    "anthropic-code-tools": ">=2.1.0"
  }
}
```

`dependencies` ustala minimum CC version - wazne dla skilli wykorzystujacych features 2.1 (merged commands+skills) vs 2.0.

## 7. Bugs, konflikty, unknowns

### 7.1 Bug #17283 implications dla plugin
R2 i R3 zidentyfikowaly: `context:fork` i `agent:` fields ignored gdy skill invokowany przez Skill tool. W plugin to samo - prefix namespace nie rozwiazuje bug. **Implikacja:** plugin-bundled skill ktory polega na context:fork dla izolacji pamieci nadal ma bug.

### 7.2 Namespace scope niejasnosci
Nie ma oficjalnej dokumentacji czy `vercel:deploy` w scope Personal bije project-level standalone `deploy`. Empirycznie (community reports) plugin skill przegrywa z lokalnym project skill, ale TO WYMAGA WERYFIKACJI (flag risk).

### 7.3 Update semantics
`/plugin update` triggeruje live change detection (nowa skill metadata load), ale **czy aktywna konwersacja resetuje state skilla?** Brak confirmed docs. Ryzyko: update w trakcie sesji = inconsistent behavior.

### 7.4 Marketplace signing
Oficjalny Anthropic marketplace ma cryptographic signing (domniemane, brak public docs). Third-party marketplaces - brak signingu -> supply chain risk. Trail of Bits podjela wlasna inicjatywe `skills-curated` wlasnie zeby to adresowac.

## 8. Synthesis dla Maciejowego systemu

### 8.1 Rekomendacja: zostan przy standalone (short-term)
35 skills + 42 commands dziala. Migracja do plugin dodaje:
- `.claude-plugin/plugin.json` (minor)
- Restructure `~/.claude/skills/` -> `~/.claude/plugins/agent-architecture/skills/` (major, breaking)
- Namespacing `agent-architecture:skill-a` -> trzeba zaktualizowac 42 komendy ktore refereuja skille po nazwie (breaking)
- Benefit: zero dla prywatnego use

### 8.2 Migracja do plugin (long-term, jesli public)
Kiedy: Maciej opublikuje system jako open source / komercyjny toolkit.
Roadmap:
1. Eksport `~/.claude/skills/` + `~/.claude/commands/` -> `~/.claude-plugin/agent-architecture/`
2. Dodac `plugin.json` z version (start: `1.0.0-beta`)
3. Zbudowac `marketplace.json` dla self-hosted marketplace lub submit do Anthropic official
4. Aktualizowac komendy (41 z nich) zeby referowaly skille z namespace: zamiana `skill: res-docs` -> `skill: agent-architecture:res-docs` (mechaniczna robota, jeden sed)
5. Dodac README + LICENSE + version changelog
6. Community distribution via awesome-claude-skills PR

### 8.3 Cross-ref z R4 (chaining)
R4_skill_chaining.md sekcja 5: "Claude mediates, not skill-to-skill" - w plugin chain skille nadal nie wolaja sie wzajemnie, Claude mediuje. Plugin namespace nie zmienia mechanizmu chainu, tylko naming w permission rules.

## 9. Open questions (do CRITIC)
1. Czy plugin namespace jest respektowany w description-match auto-invocation lub tylko w manual/Skill tool? (flag: brak docs)
2. Scope priority: `vercel:deploy` plugin scope Personal vs project-level `.claude/skills/deploy.md` - ktory wygrywa? (brak confirmed)
3. Jak marketplace handluje plugin updates w trakcie aktywnej sesji? (state management unknown)
4. Koszt tokenow pre-invocation dla 1000+ zainstalowanych plugin skills (sickn33 antigravity case) - czy 1%/8000 char budget listing jest ejected dla dużych bibliotek?

## 10. Referencje
- Claude Code Discover Plugins docs: https://code.claude.com/docs/en/discover-plugins
- Claude Marketplaces: https://claudemarketplaces.com/
- Dean Blank mental model (March 2026): https://levelup.gitconnected.com/a-mental-model-for-claude-code-skills-subagents-and-plugins-3dea9924bf05
- liteLLM plugin marketplace guide
- Scott Spence: "Organising Claude Code Skills Into Plugin Marketplaces"
- jeremylongshore/claude-code-plugins-plus-skills (CCPI package manager)
- trailofbits/skills + skills-curated
- VoltAgent/awesome-agent-skills
- anthropics-claude-code official marketplace
