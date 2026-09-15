# R2 - Frontmatter Deep Dive

**Researcher:** res_tech (Sonnet, persona)
**Data:** 2026-04-17
**Zrodla:** code.claude.com/docs/en/skills (primary), leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive (implementation deep dive), platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices, github.com/anthropics/claude-code/issues/17283

## Summary

Skills frontmatter to YAML block miedzy `---` markers na szczycie SKILL.md z 13 oficjalnie udokumentowanymi polami w Claude Code plus 1 deprecated (`when_to_use`) i 2-3 nieofficjalnymi spotykanymi w wild (`version`, `license`, `mode`). Wszystkie pola sa optional, tylko `description` jest "recommended" wedlug Anthropic. `name` ma hard caps (64 chars, lowercase/numbers/hyphens, blocked reserved words `anthropic` i `claude`). `description` 1024 chars API / 1536 combined z when_to_use w listing. Edge cases udokumentowane: path glob filtering przez `paths`, effort override przez `effort`, shell swap przez `shell: powershell` (Windows), subagent fork przez `context: fork` + `agent:`. Znany BUG od Jan 2026 (issue #17283): Skill tool IGNORUJE `context: fork` i `agent:` przy programmatic invocation - skill runs w main context zamiast spawnowac subagent. Unicode w description: dozwolone ale XML tags zabronione (hard reject per API spec). `when_to_use` wystepuje w Claude Code source code ale "not documented in any official Anthropic documentation" per Lee Hanchung deep dive - Anthropic przesunal te funkcjonalnosc do `description` z per-entry cap 1536 chars combined. Token overhead per skill: ~100 tokens metadata na startup, ~1500 tokens per turn gdy invokowany (message injection pattern), bundled files zero az do czytania. Rekomendacja: uzywac wylacznie `name` + `description` dla 90% skills; dodac `disable-model-invocation: true` dla side-effect skills (deploy, commit); dodac `allowed-tools` zeby uniknac permission prompts; reszta pol niche. `version` i `license` to de facto community convention, nie wplywaja na zachowanie.

## Details

### 1. Pelna lista pol Claude Code + Anthropic walidacja

Oficjalne (code.claude.com/docs/en/skills):

| Field | Type | Default | Semantyka |
|:------|:-----|:--------|:----------|
| `name` | string | directory name | Display name, command token. Max 64 char, `[a-z0-9-]+` only. **Reserved words blocked:** `anthropic`, `claude`. No XML tags. |
| `description` | string | first paragraph of body | What + when. Recommended. API: max 1024 char, non-empty, no XML. Claude Code listing: combined z when_to_use max 1536 chars per entry. |
| `when_to_use` | string | empty | Dodatkowe triggers/phrases. Appended do description w listing. Counts do 1536-char cap. Lee Hanchung flaguje to jako "likely Deprecated or Future Feature" bo nie ma go w oficjalnych docs API, tylko w Claude Code source code. **[Konflikt do Critic.]** |
| `argument-hint` | string | empty | Autocomplete hint, np. `[issue-number]` lub `[filename] [format]`. Pokazywane w / menu. |
| `disable-model-invocation` | boolean | false | `true` -> Claude nie moze auto-trigger + nie widzi description w system prompt. Tylko manual `/name`. |
| `user-invocable` | boolean | true | `false` -> nie w / menu. **NIE blokuje Skill tool** - tylko menu visibility. |
| `allowed-tools` | string lub YAML list | empty | Tools bez permission prompt gdy skill aktywny. Format: `Bash(git:*) Read Grep` albo YAML list. |
| `model` | string | inherit session | Model override dla tego skillu. `"inherit"` wartosc domyslna gdy omit. |
| `effort` | enum | inherit session | `low` \| `medium` \| `high` \| `xhigh` \| `max` (dostepnosc zalezna od modelu). |
| `context` | enum | main | `fork` -> run w forked subagent context. Skill content staje sie promptem subagenta, brak conversation history. |
| `agent` | string | general-purpose | Subagent type gdy `context: fork`. Built-in: `Explore`, `Plan`, `general-purpose`. Custom: nazwa pliku z `.claude/agents/`. |
| `hooks` | object | empty | Hooks scoped do lifecycle skillu (PreToolUse, PostToolUse itp.). See /en/hooks. |
| `paths` | string lub YAML list | empty | Glob patterns. Auto-load tylko gdy edytujesz pasujace pliki. Format identyczny jak path-specific rules w memory. |
| `shell` | enum | bash | `bash` lub `powershell`. Windows tylko, wymaga `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`. |

Agent Skills API spec (platform.claude.com) ma tylko subset:
- **Required by API:** `name`, `description` (w Claude Code oba "optional with fallback", ale API rejectuje bez nich)
- API walidacje identyczne dla `name` i `description` jak Claude Code

### 2. Pola nieoficjalne (wild adoption)

Z Lee Hanchung deep dive (leehanchung.github.io/blogs/2025/10/26):

**`version`** - "metadata field for tracking skill versions" (np. `version: "1.0.0"`). NIE jest parsowane przez Claude Code - tylko dla maintainerow. Community convention.

**`license`** - "Metadata field". Tak samo - nie wplywa na zachowanie.

**`mode`** (boolean) - "categorizes a skill as 'mode command' that modifies Claude's behavior or context. When set to true, the skill appears in a special 'Mode Commands' section at the top of the skills list." Lee notes to wystepuje w source code ale nie w oficjalnych docs. **[Potencjalnie undocumented Claude Code feature.]**

**`disableSkillShellExecution`** - NIE jest frontmatter field ale settings.json key. Setting wylaczajacy `!-command` execution globally. Relevantne dla security-conscious orgs.

### 3. Edge cases

#### Unicode + special chars w description

Na podstawie API spec (max 1024 chars, non-empty, no XML tags):
- Unicode: allowed (no explicit restriction)
- Emojis: allowed (kontra-wskazane przez community - wplywa na token count + keyword matching)
- XML tags: HARD REJECT (`<foo>` rzuca blad walidacji)
- Backticks: allowed (common w descriptions)
- Markdown w description: NO effect - description jest plain text injection do system prompt

**Practical guidance (anthropiccertifications.com):** "Always write in third person... 'Processes Excel files and generates reports' not 'I can help you'".

#### Long descriptions

Description > 1024 chars: API reject. Claude Code listing truncate. Ale Claude Code sam nie enforceuje pojedynczego 1024 cap dla plikow lokalnych - tylko truncuje w listing. **[GAP: nie ma jednoznacznego zrodla czy Claude Code walidiuje 1024 na upload; dla lokalnych plikow prawdopodobnie tolerancja az do 1536 combined.]**

#### Reserved words w name

Name nie moze zawierac `anthropic` ani `claude` (case-insensitive per API). Przyklady blocked:
- `anthropic-helper` REJECT
- `claude-tools` REJECT
- `my-anthropic-wrapper` REJECT (zawiera `anthropic`)
- `my-helper` OK

#### Name uniqueness

Jesli dwa skills maja identyczny `name`: konflikt rozstrzyga scope priority (Enterprise > Personal > Project). W praktyce: Claude Code laduje WYZSZY priority, nizszy "ginie" (bez warn notification per docs). **[UX gap - user nie widzi ze ma ignorowany duplicate.]**

Plugin skills maja namespace `plugin-name:skill-name` wiec nie kolidują.

### 4. Invocation semantics per frontmatter combo

Z tabeli docs + analiza:

| `disable-model-invocation` | `user-invocable` | Claude auto | User /name | Skill tool | Opis |
|:---|:---|:---|:---|:---|:---|
| false (default) | true (default) | YES | YES | YES | Standard - wszystkie 3 sciezki |
| **true** | true | **NO** | YES | **NO** | Manual only, description nie w system prompt |
| false | **false** | YES | **NO** (ukryte z /) | YES | Background knowledge |
| **true** | **false** | **NO** | **NO** | **NO** | Zombie - skill de facto inaccessible |

Last row: jesli ustawisz oba true/false blokujaco, skill nie moze byc uruchomiony zadna sciezka. Docs tego explicite nie odradzaja ale to misconfiguration.

### 5. paths (glob filtering)

Nowsze 2026 field. Przyklad:
```yaml
---
name: react-conventions
description: React component patterns for this codebase
paths:
  - "src/**/*.tsx"
  - "components/**/*.jsx"
---
```

Skill laduje sie TYLKO gdy user edytuje plik matching ten glob. Oszczednosc: skill description nie jest w system prompt przy pracy nad backendem. Z monorepo perspective polaczone z nested discovery (packages/frontend/.claude/skills) = per-package skills.

### 6. hooks (lifecycle)

Z docs /en/hooks#hooks-in-skills-and-agents - skills moga definiowac hooks scoped tylko do swojego lifecycle:

```yaml
---
name: deploy
description: Deploy application
hooks:
  PreToolUse:
    - type: command
      command: "pre-deploy-check.sh"
  PostToolUse:
    - type: command
      command: "post-deploy-notify.sh"
---
```

Te hooks odpalaja sie tylko gdy skill jest active, nie globalnie. Przydatne dla workflow-specific guard rails.

### 7. context: fork + agent (subagent dispatch)

Dokumentowany przyklad:
```yaml
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:
1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

**KNOWN BUG (Issue #17283, Jan 2026):** "When a skill is invoked via the Skill tool, the `context: fork` and `agent:` frontmatter fields are ignored. The skill runs in the main conversation context instead of spawning the specified subagent."

Workaround: manual restructure skillu jako custom subagent. Anthropic nie zassignowal PR, feature request status.

Implikacja dla Macieja: jesli uzywa `/name` ze slasha, fork dziala. Jesli Skill tool program wolany (np. inne skill wola to), fork IGNORED. W praktyce moze powodowac niespodziewany zuzyc kontekstu.

### 8. Token overhead per skill

Z Lee Hanchung implementation deep dive:

- **Startup metadata:** ~100 tokens per skill w system prompt (`<available_skills>` section)
- **Skill listing char budget:** 15,000 chars default (Lee) lub 1% context / 8000 fallback (Anthropic docs) - conflict **[do Critic]**
- **Per-entry cap:** 1536 chars combined description + when_to_use
- **Injection when invoked:** ~1500+ tokens per turn (message injection pattern z dwoma user messages: metadata `isMeta: false` + full instructions `isMeta: true`)

**Porownanie z normal tools:** regular tool = ~100 tokens per turn. Skill = ~1500 tokens per turn. Skills sa 15x bardziej "expensive" per turn ale sa load tylko gdy uzyte. Normal tools sa always-on.

**Anthropic eng blog:** "the overhead is roughly 1,500 tokens total for all 40 skills" - czyli ~37.5 tokens per skill jesli usredniamy. Conflict z Lee (~100 tokens per skill) moze pochodzic od tego ze Anthropic liczy tylko startup metadata, Lee liczy pelna injection po invocation. **[Critic resolve.]**

### 9. Message injection pattern (implementation)

Lee Hanchung z Claude Code source code:

"Two user messages per skill invocation - one with `isMeta: false` for visible metadata ('The pdf skill is loading'), another with `isMeta: true` containing full instructions hidden from UI."

Rationale: "Combining them would violate the Single Responsibility Principle by forcing one message to serve two distinct audiences."

Skills NIE sa executable code, nie sa hardcoded w system prompt. Sa w separate part of API request structure.

### 10. Execution context modification

"Skills yield a `contextModifier` function that modifies tool permissions. 'Pre-approve these tools' via `alwaysAllowRules` in the context, scoping permissions to skill execution only."

Czyli `allowed-tools` frontmatter field -> nie jest static permission; jest context modifier ktory applies tylko na czas skill invocation. Po skill done, tools wracaja do normal permission gates.

### 11. Selection mechanism

Lee: "The system formats all available skills into a text description embedded in the Skill tool's prompt, and lets Claude's language model make the decision... No regex, no keyword matching, no ML-based intent detection."

Implikacja: description writing discipline jest MEGA wazna bo decyzje podejmuje LLM na podstawie naturalnego jezyka. Front-load keyword, third person, concrete triggers.

### 12. SDK differences

Claude Agent SDK (code.claude.com/docs/en/agent-sdk/skills):

**KRYTYCZNA ROZNICA:** `allowed-tools` frontmatter field NIE DZIALA w SDK: "The `allowed-tools` frontmatter field in SKILL.md is only supported when using Claude Code CLI directly. **It does not apply when using Skills through the SDK**. When using the SDK, control tool access through the main `allowedTools` option in your query configuration."

Wiec skill dziala w obu srodowiskach ale tool permissioning delegujesz do SDK caller.

Skills MUSZA byc filesystem-based (SKILL.md) - SDK nie ma programmatic API dla registering skills (rozni sie od subagents, ktore moga byc defined programmatically).

Dostep via `settingSources: ["user", "project"]` + `allowedTools: ["Skill", ...]`. Bez tego SDK nie laduje skills.

### 13. Compatibility z Open Standard agentskills.io

"Claude Code skills follow the Agent Skills open standard, which works across multiple AI tools."

Portable subset: `name`, `description`. Claude Code extensions: `context: fork`, `agent`, dynamic context injection (`!-commands`), invocation control. OpenCode i inne tools implementuja core ale nie extensions.

Implikacja: jesli piszesz skill portable dla wielu AI tools, uzyj tylko name + description + body markdown. Claude Code extensions beda ignored gdzie indziej.

## Issues / Flags

**Conflict #1:** token budget dla skill listing. Lee mowi 15,000 chars. Anthropic docs mowia 1% context z fallback 8000 chars. Moze byc ze Lee czyta starsza wartosc (15k bylo default przed 2026-03 update) albo ze 1%/8k dotyczy innego levelu cache. Do Critic.

**Conflict #2:** `when_to_use` field status. Anthropic Claude Code docs MAJA to pole w oficjalnej tabeli (1536-char combined cap). Lee Hanchung mowi "appears extensively in the codebase but is not documented in any official Anthropic documentation". Sprzecznosc - Lee pisal Oct 2025, Anthropic pewnie dodal do docs potem. Aktualny stan: field OFICJALNY per current docs.

**Conflict #3:** token cost per skill. Anthropic ~37 tokens/skill. Lee ~100 tokens metadata + ~1500 per turn gdy invoked. To nie jest konflikt: Anthropic mowi o startup metadata, Lee wliczy pelne injection lifecycle. OK.

**Bug #1:** Issue #17283 - Skill tool ignoruje `context: fork` i `agent` przy program invocation (od Jan 2026). Anthropic labeled enhancement, nie fixed. Workaround: user-invokes przez slash zamiast Skill tool delegation.

**Gap #1:** `user-invocable: false` + `disable-model-invocation: true` combo - skill zombie. Docs nie odradzaja ale to misconfiguration.

**Gap #2:** Name collision warning - gdy dwa skills maja tez sam name (w roznych scopach), Claude Code nie ostrzega usera. Silent override.

**Gap #3:** Max description length enforcement - czy Claude Code rejectuje lokalnie > 1024 chars, czy tylko API upload? Niejasne.

**Deprecated risk:** `when_to_use` + `mode` - oba pojawiaja sie w source code ale mozliwie ze przyszla migracja do description (Anthropic moze chciec skupic decyzje w jednym polu dla lepszej LLM selection).

## Recommendation

GO do Phase 2. Frontmatter spec jest dobrze udokumentowana z kilkoma znanymi edge cases.

Dla SYNTHESIS Part "Frontmatter Spec":
- Tabela 13 oficjalnych pol + 3 niefficjalnych = gotowa
- Hard walidacje (64 char name, 1024 description, reserved words, no XML) = cytowalne
- Edge cases (Unicode, emojis, XML, long descriptions) = ukierunkowana lista
- Known bug (#17283) = caveat dla Skill tool users

Prakticzna rekomendacja dla Macieja:
1. Przejrzec wlasne 35 skills - czy ktoryr ma XML tags lub reserved words w nazwie (unlikely ale warto zvalidate)
2. Frontmatter discipline: tylko `name` + `description` + okazjonalnie `disable-model-invocation: true` dla commit/deploy
3. Jesli chce subagent fork, musi pamietac ze przez Skill tool NIE DZIALA - tylko przez /name
4. `paths` field nie uzywany w Maciejowych skills - warto rozwazyc dla package-scoped skills (np. skill bento-redesign paths: `v*/**/*.html`)

Deep confidence on: name caps, description caps, 13 oficjalnych pol, known bug #17283, SDK differences (`allowed-tools` not supported).

Medium confidence on: token cost numbers per skill (konflikt 37 vs 100 vs 1500), `when_to_use` deprecation risk, skill listing budget (15k vs 1%/8k).

Low confidence on: `mode` field semantyka (Lee spotkal w source, nie w docs), `version/license` adoption rate (anegdotyczne).

### Zrodla
- code.claude.com/docs/en/skills - oficjalna Anthropic tabela
- platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices - API hard caps
- leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive - source code deep dive
- github.com/anthropics/claude-code/issues/17283 - known bug
- code.claude.com/docs/en/agent-sdk/skills - SDK differences
- anthropiccertifications.com/learn/claude-code-workflows/skill-frontmatter-config - author guidance
