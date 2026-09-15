# R3 - Skill Invocation Paths

**Researcher:** res_tech (Sonnet, persona, drugi instance)
**Data:** 2026-04-17
**Zrodla:** code.claude.com/docs/en/skills, leehanchung.github.io (implementation), platform.claude.com/docs/en/agent-sdk/skills, medium/oneaway.io (commands vs skills)

## Summary

Skill moze byc uruchomiony trzema sciezkami: (a) automatic description-match (Claude LLM podejmuje decyzje patrzac na description w system prompt), (b) manual slash `/skill-name [args]` (user explicit invocation), (c) Skill tool program call (inne skills lub agents wola przez tool API z `command: "name"`). Wszystkie trzy sciezki prowadza do tego samego mechanizmu: Claude bash-reads SKILL.md, content wchodzi jako jedna wiadomosc do konwersacji, skill content zostaje na reszte sesji. Priority rules: `disable-model-invocation: true` blokuje (a) i (c) (Claude nie widzi description), zostawia (b). `user-invocable: false` blokuje (b) (ukryte z / menu), zostawia (a) i (c). Permission rules w settings: `Skill` deny -> blokuje wszystkie (c); `Skill(name)` exact match; `Skill(name *)` prefix. Known bug (#17283 Jan 2026): `context: fork` + `agent` frontmatter IGNOROWANE przy (c) - skill runs w main context nawet jak okresliles subagent. Merge z custom commands w Claude Code 2.1: `.claude/commands/deploy.md` i `.claude/skills/deploy/SKILL.md` obie tworza `/deploy`; jesli oba istnieja, SKILL wygrywa. Decision mechanism dla (a): Claude czyta wszystkie skill descriptions w systemie, NLP match przeciwko user query - "no regex, no keyword matching, no ML-based intent detection" per Lee Hanchung analysis source code. Selection jest LLM forward-pass decision. Praktyczna konsekwencja: description writing discipline jest krytyczna - front-load keywords, third person, concrete triggers.

## Details

### 1. Trzy sciezki invocation

#### Path A: Automatic (description-match)

Flow:
1. Claude Code skanuje `~/.claude/skills/` + `.claude/skills/` + plugins na startup
2. Parsuje YAML z kazdego SKILL.md
3. Buduje `<available_skills>` sekcje w system prompt z `name` + `description` + `when_to_use` (truncate to 1536 chars combined per entry)
4. User sends query
5. Claude LLM zwraca tool call dla Skill tool z `command: "skill-name"` jesli mu "pasuje"
6. Claude Code renderuje SKILL.md body + runs bash read + injects jako user message

**Blokada:** `disable-model-invocation: true` -> Claude nie widzi description w system prompt, wiec LLM nawet nie wie o skill istnieniu auto-trigger wise.

**Mechanism selekcji** (Lee Hanchung analysis source code): "The system formats all available skills into a text description embedded in the Skill tool's prompt, and lets Claude's language model make the decision. No regex, no keyword matching, no ML-based intent detection. The decision happens inside Claude's forward pass through the transformer."

Implikacja: description jakosci to ranking signal. Front-load keywords, verbose enough dla disambiguation, third person (per best practices).

#### Path B: Manual slash `/skill-name`

Flow:
1. User wpisze `/` w prompt
2. Claude Code pokazuje menu skills (z SKILL.md gdzie `user-invocable != false`)
3. User wybierze `/skill-name [args]` i wysle
4. Claude Code wstrzyknie skill content bezposrednio (bez LLM selection step)

**Blokada:** `user-invocable: false` -> nie w / menu. User nie moze nawet wpisac.

**Fallback:** jesli user wpisze `/nonexistent`, Claude Code pokaze blad "skill not found".

**Commands merge:** w Claude Code 2.1, custom commands z `.claude/commands/*.md` i skills z `.claude/skills/*/SKILL.md` obie tworza slash commands. Jesli kolizja nazw, "skill takes precedence" per docs.

#### Path C: Skill tool programmatic

Flow:
1. Inny skill lub agent (lub Claude sam po refleksji) wykona Skill tool z `command: "name"`
2. Claude Code wczyta SKILL.md identycznie jak w A i B
3. Content wchodzi do konwersacji jako nowa wiadomosc

**Blokada (wiele):**
- `disable-model-invocation: true` -> "Use disable-model-invocation: true to block programmatic invocation" (docs explicite)
- Permission settings: `Skill` w deny rules -> wszystkie skills zablokowane. `Skill(name)` exact match. `Skill(name *)` prefix z argumentami.
- User permission prompt jesli skill nie jest w allowed-tools / pre-approved

**Dostepne built-in commands przez Skill tool (docs):** `/init`, `/review`, `/security-review`. Inne built-in jak `/compact` sa NIE dostepne.

### 2. Merge commands + skills (Claude Code 2.1)

Historycznie: custom commands = pojedynczy plik `.claude/commands/deploy.md` z raw prompt. Skills = directory z SKILL.md + supporting. Obie tworzyly /slash.

W Claude Code 2.1: "Custom commands have been merged into skills. A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy` and work the same way. Your existing `.claude/commands/` files keep working. Skills add optional features: a directory for supporting files, frontmatter to control whether you or Claude invokes them, and the ability for Claude to load them automatically when relevant."

Kluczowe:
- Files in `.claude/commands/` support the same frontmatter fields
- Skills sa "recommended since they support additional features like supporting files"
- Kolizja nazw: skill precedence

**Practical dla Macieja:** obecnie 42 commands w `~/.claude/commands/*.md` i 35 skills w `~/.claude/skills/*.md`. Zadnych kolizji (commands to presety team, skills to pojedynczy agenci). Ale przy regeneracji (generate_commands.js) warto walidate ze nie ma konfliktu.

### 3. Priority matrix

| Sytuacja | Wygrywa |
|:---------|:--------|
| Skill `name=X` + Command `name=X` (oba w projekcie) | SKILL |
| Skill `X` enterprise + Skill `X` personal | Enterprise |
| Skill `X` personal + Skill `X` project | Personal |
| Plugin `plugin:X` + User `X` | Both istnieja (plugin w namespace), user /X wybiera user-level |
| Plugin `plugin1:X` + Plugin `plugin2:X` | Both istnieja w namespace |

Scope priority: Enterprise > Personal > Project.

Plugin namespace separuje plugin skills od konflikdow. User type `/X` -> user-level skill (jesli istnieje). User type `/plugin:X` -> plugin skill.

### 4. Permission rules (fine-grained control)

Dla Skill tool access kontrolujesz przez permission settings:

```
# W permission settings
# Allow tylko specific skills
Skill(commit)
Skill(review-pr *)

# Deny specific
Skill(deploy *)

# Deny wszystkie (nuclear)
Skill
```

Syntax:
- `Skill(name)` - exact match, zero args
- `Skill(name *)` - prefix, any args
- `Skill` sam - catch-all deny

**Important:** dla jakiegokolwiek efektu na AUTO invocation (path A), uzyj `disable-model-invocation: true` w frontmatter SKILLU samego. Permission settings nie blokuja automatic triggering - blokuja tylko programmatic calls przez Skill tool z other skills/agents.

**Granular config:** mozesz kombinowac:
1. Frontmatter `disable-model-invocation: true` -> no auto
2. Frontmatter `user-invocable: true` (default) -> user moze /name
3. Settings: `Skill(name)` allow -> other skills moga tez

Taki skill jest "manual + programmatic" - idealny dla workflow skills ktore inne skills chain together ale Claude nie decyduje o uzyciu.

### 5. Zachowanie wg frontmatter combo

| Frontmatter | Path A (auto) | Path B (slash) | Path C (Skill tool) |
|:---|:---|:---|:---|
| default | YES | YES | YES |
| `disable-model-invocation: true` | NO | YES | NO |
| `user-invocable: false` | YES | NO | YES |
| oba true/false blokujaco | NO | NO | NO (zombie) |

Docs explicit: `disable-model-invocation: true` usuwa description z kontekstu tez (oszczednosc tokens).

`user-invocable: false` tylko ukrywa z menu - description NADAL w system prompt, Claude moze auto-trigger.

### 6. Selection mechanism - no magic

Lee Hanchung source code deep dive: "There is no algorithmic routing or intent classification at the code level... The decision happens inside Claude's forward pass through the transformer, not in the application code."

Dwa user messages per skill invocation:
- `isMeta: false` - visible metadata ("The 'X' skill is loading") - user-facing signal
- `isMeta: true` - hidden full instructions - delivered to Claude

Rationale: separation of concerns - UI vs Claude instruction. Single message would mix audiences.

### 7. Argument passing

Both A/B/C paths accept arguments:
- Path A: Claude LLM samo decyduje args i wstrzykuje przez `$ARGUMENTS` substitution
- Path B: user types `/skill-name arg1 arg2` - args po nazwie
- Path C: programmatic z `command: "skill-name"` + args param

Substitution rules w body SKILL.md:
- `$ARGUMENTS` - pelny arg string
- `$ARGUMENTS[0]`, `$0` - pierwszy arg (shell-style quoting)
- `${CLAUDE_SESSION_ID}` - session id
- `${CLAUDE_SKILL_DIR}` - skill directory path

Jesli SKILL.md nie uzywa `$ARGUMENTS`, Claude Code doda na koncu: `ARGUMENTS: <input>` zeby Claude dalej widzial co user wpisal.

### 8. Known bug #17283 - fork ignored przez Skill tool

Issue z Jan 2026:
```yaml
---
name: deep-research
context: fork
agent: Explore
user-invocable: true
---
```

Przy invocation via Skill tool (path C) - `context: fork` i `agent: Explore` IGNOROWANE. Skill runs w main context.

**Expected behavior:** spawn Explore subagent, isolated context, return summary.

**Actual:** skill content injected do main conversation, fork fields silently ignored.

**Status:** enhancement label, not assigned, no PR. Anthropic nie rozwiazal do Apr 2026.

**Workaround (per issue):** "Users must manually restructure skills as custom agents to achieve this behavior." Czyli zdefiniuj subagent w `.claude/agents/` zamiast polegac na skill `context: fork`.

**Implikacja dla chain workflows:** jesli piszesz orchestrator skill ktory wola worker skills, i worker skills uzywa `context: fork` dla isolacji - TO NIE DZIALA. Trzeba rozbic na subagents file.

### 9. Path A vs Path B vs Path C - kiedy uzywac

Z Oneaway.io i Medium analysis + docs:

**Path A (description-match auto):**
- NAJLEPSZE gdy: reference content (conventions, patterns), chcesz niskie tarcie - "Claude sam wybierze"
- NAJGORSZE gdy: side effects (deploy, commit, API calls) - nie chcesz ze Claude moze ci odpalic deploy bo "code looks ready"
- Use case: `api-conventions`, `react-patterns`, `legacy-system-context`

**Path B (manual /slash):**
- NAJLEPSZE gdy: task content z side effects, task content gdzie timing jest krytyczny
- Best practice per docs: `disable-model-invocation: true` zablokowac auto
- Use case: `/deploy`, `/commit`, `/send-slack-message`, `/merge-pr`

**Path C (Skill tool programmatic):**
- NAJLEPSZE gdy: chain/orchestration - jedna skill/agent wola druga
- Ograniczenie: `context: fork` nie dziala (bug #17283)
- Use case: orchestrator workflows, deep-research chain, multi-phase pipelines

**Hybrid (A + B + C):**
- Default (no flags) daje wszystkie trzy - dla reference content without side effects
- Use case: `explain-code`, `generate-summary`, `format-output`

### 10. Live change detection

Z docs: "Claude Code watches skill directories for file changes. Adding, editing, or removing a skill under `~/.claude/skills/`, the project `.claude/skills/`, or a `.claude/skills/` inside an `--add-dir` directory takes effect within the current session without restarting."

Implikacje dla invocation:
- Po edycji SKILL.md, NASTEPNE invocation pick up nowa wersja
- Aktualnie zainvokowana skill (z content juz w konwersacji) zachowuje stara wersje
- Nowa skill utworzona w runtime dostepna od razu po save
- Nowa top-level skills dir created in runtime WYMAGA restart (watcher not registered)

### 11. SDK invocation differences

Claude Agent SDK:
- Skills MUSZA byc w filesystem (no programmatic register)
- Trzeba explicite `"Skill"` w `allowed_tools` aby Claude Code samo zainvokowalo
- `setting_sources: ["user", "project"]` zeby skanowal `~/.claude/skills` i `<cwd>/.claude/skills`
- Bez tego SDK NIE LADUJE skills

**Roznica od CLI:** `allowed-tools` frontmatter NIE DZIALA w SDK. Tool access kontrolujesz przez `allowedTools` option w query config.

### 12. Compaction + invocation lifecycle

Skill content enters konwersacje jako jedna wiadomosc po invocation. Nie re-read na kolejnych turnach.

Auto-compaction:
- Re-attach most recent invocation of each skill after summary
- Keep first 5,000 tokens of each
- Combined budget 25,000 tokens
- Fill from most recent - starsze moga byc dropped

Jesli skill przestal dzialac po compaction, RE-INVOKE (path B manual lub path A/C jesli Claude nadal widzi description).

## Issues / Flags

**Conflict:** Maciej ma preset `/deep-research-v2` ktory zamierza uzywac Skill tool do delegowania researcherom. Delegated researchers maja wlasne skills (res_tech, res_docs itp). Jesli ktorys z nich ma `context: fork`, bug #17283 blokuje wlasciwy isolacje. DO ZWALIDOWANIA w Maciejowych skills.

**Gap:** docs nie okreslaja explicite czy `user-invocable: false` blokuje Skill tool path C gdy `disable-model-invocation: false`. Z kolei tabela docs explicite mowi: description IN context, full skill on invoke. Czyli path A i C oba dziala. Path B nie dziala. Confirmed ale niuansowe.

**Gap:** jakie sa priorytety w Skill LLM selection gdy 35+ skills maja podobne descriptions? Czy kolejnosc deklaracji matters? Prawdopodobnie nie (LLM selection), ale nie udokumentowane.

**Docs ambiguity:** "Skill and command share the same name, the skill takes precedence" - ale co jesli command jest w .claude/commands/ (project) i skill w ~/.claude/skills/ (user)? Czy scope priority Personal > Project trumpuje skill > command precedence? Docs nie doprecyzowuja. Prawdopodobnie: scope first, potem skill vs command.

**Missing doc:** nie znalazlem procedury uruchamiania skillu z wnetrza subagenta - czy subagent moze wywolac Skill tool jesli ma `"Skill"` w allowed-tools? Patrz R4.

## Recommendation

GO do Phase 2. Path discipline jest dobrze udokumentowana.

Dla SYNTHESIS Part "Invocation & Loading":
- Tabela 3 paths + frontmatter combo = gotowa
- Permission rules syntax cytowalne
- Bug #17283 = caveat dla chain workflows
- Commands merge = historyczny kontekst

Prakticzna rekomendacja dla Macieja:
1. Zwaliduj ze zaden skill nie ma kolizji name z command (obecnie bezpieczne)
2. Jesli chce chain workflows (deep-research-v2 -> extractor), NIE polegaj na `context: fork` w sub-skills - uzyj .claude/agents/
3. Dla skills z side effects (deploy, commit, send-email), ZAWSZE `disable-model-invocation: true`
4. Dla reference-only skills (conventions, patterns), default frontmatter (3 paths active)

Deep confidence on: trzy paths, priority rules, merge commands/skills, argument passing, SDK differences.

Medium confidence on: selection mechanism details (Lee source code deep dive - autor nie oficjalny Anthropic ale code-level).

Low confidence on: wspolinterakcja scope priority z skill vs command precedence, subagent -> Skill tool chain.

### Zrodla
- code.claude.com/docs/en/skills - paths, commands merge, permission rules
- leehanchung.github.io/blogs/2025/10/26 - implementation deep dive (message injection pattern)
- github.com/anthropics/claude-code/issues/17283 - bug fork ignored
- code.claude.com/docs/en/agent-sdk/skills - SDK differences
- oneaway.io/blog/claude-code-commands-vs-skills - commands vs skills practical
