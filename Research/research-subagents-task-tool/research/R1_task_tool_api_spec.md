# R1 - Task Tool / Agent Tool API Specification

**Rola:** Researcher Docs (oficjalne zrodla prawdy)
**Data:** 2026-04-17
**Pytanie:** Oficjalne docs + system prompt Claude Code: Task tool schema, subagent_type enum (general-purpose, Explore, Plan, statusline-setup, Claude Code Guide, specialized ones), isolation parameter, run_in_background, model override.

## Summary

Task tool (zmieniony na **Agent** w Claude Code v2.1.63) jest pojedynczym narzedziem w Claude Code uzywanym do delegowania pracy do izolowanych subagentow. Przyjmuje trzy wymagane parametry (`description`, `prompt`, `subagent_type`) i dziewiec opcjonalnych (`model`, `resume`, `run_in_background`, `max_turns`, `name`, `team_name`, `mode`, `isolation`, `effort`). Claude Code ma piec built-in subagent typow: **Explore** (Haiku, read-only), **Plan** (inherit, read-only, plan mode only), **general-purpose** (inherit, wszystkie tools), **statusline-setup** (Sonnet) i **Claude Code Guide** (Haiku, helper Q&A). Custom subagenty sa definiowane przez YAML frontmatter + Markdown body w `.claude/agents/` (project) lub `~/.claude/agents/` (user-global), z 17 polami konfiguracyjnymi (`name`, `description`, `tools`, `disallowedTools`, `model`, `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `hooks`, `memory`, `background`, `effort`, `isolation`, `color`, `initialPrompt`, plus alias `prompt` w JSON). Kluczowe reguly: subagenty NIE moga spawn kolejnych subagentow (nested delegation niedozwolona), rozpoczynaja z cwd rodzica ale cd nie persist, dostaja tylko swoj system prompt + prompt string z Agent tool call - BEZ konwersacji rodzica, BEZ skilli (chyba ze explicitnie wymienione).

## Details

### 1. Task/Agent tool: parametry i rozstrzygniecia nazewnicze

Zrodlo: [code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents), [platform.claude.com/docs/en/agent-sdk/subagents](https://code.claude.com/docs/en/agent-sdk/subagents).

**Rename Task -> Agent w v2.1.63:**
Cytat z docs: *"In version 2.1.63, the Task tool was renamed to Agent. Existing `Task(...)` references in settings and agent definitions still work as aliases."*

Dodatkowa nota: *"The tool name was renamed from `"Task"` to `"Agent"` in Claude Code v2.1.63. Current SDK releases emit `"Agent"` in `tool_use` blocks but still use `"Task"` in the `system:init` tools list and in `result.permission_denials[].tool_name`. Checking both values in `block.name` ensures compatibility across SDK versions."*

Implikacja dla developerow: detekcja wywolan subagent musi sprawdzac **obie** wartosci (`"Task"` i `"Agent"`) w `block.name`.

**Pelna lista parametrow (z dev.to/bhaidar synteza oraz docs):**
- `description` - naturalny jezyk opis zadania (wymagane)
- `prompt` - tekst briefu dla subagenta (wymagane)
- `subagent_type` - enum typu subagenta (wymagane; mapowany na agent name dla custom)
- `model` - override: `"sonnet"`, `"opus"`, `"haiku"`, full model ID lub `"inherit"`
- `resume` - ID subagenta do wznowienia (jezeli agent teams enabled)
- `run_in_background` - boolean, default `false`
- `max_turns` - max agentic turns
- `name` - display name (background task ID)
- `team_name` - dla agent teams (experimental feature)
- `mode` - wariant wykonania
- `isolation` - `"worktree"` albo nic (default shared fs)
- `effort` - `low`/`medium`/`high`/`xhigh`/`max` (zalezy od modelu)

### 2. Built-in subagent types (enum)

Zrodlo: [code.claude.com/docs/en/sub-agents#built-in-subagents](https://code.claude.com/docs/en/sub-agents).

| Agent | Model | Tools | Cel | Kiedy Claude sam delegue |
|---|---|---|---|---|
| **Explore** | Haiku | Read-only (denied Write/Edit) | File discovery, codebase search | Gdy trzeba przeszukac codebase bez zmian |
| **Plan** | Inherits | Read-only (denied Write/Edit) | Research dla plan mode | W plan mode przed prezentacja planu |
| **general-purpose** | Inherits | All tools | Zlozone multi-step zadania | Zadania wymagajace eksploracji + modyfikacji |
| **statusline-setup** | Sonnet | (unspecified) | `/statusline` command | Gdy user uruchamia `/statusline` |
| **Claude Code Guide** | Haiku | (unspecified) | Q&A o Claude Code features | Gdy user pyta o Claude Code |

Dla Explore dodatkowy cytat: *"When invoking Explore, Claude specifies a thoroughness level: **quick** for targeted lookups, **medium** for balanced exploration, or **very thorough** for comprehensive analysis."* To parametr nie wymieniony eksplicitnie w tool signature, ale przekazywany w `prompt`.

### 3. YAML Frontmatter - 17 pol konfiguracji custom subagentow

Zrodlo: [code.claude.com/docs/en/sub-agents#supported-frontmatter-fields](https://code.claude.com/docs/en/sub-agents).

Tylko `name` i `description` wymagane. Pozostale opcjonalne:

| Pole | Typ | Rola |
|---|---|---|
| `name` | string | Unique id, lowercase + hyphens |
| `description` | string | Kiedy Claude deleguje |
| `tools` | list/string | Allowlist toolow; brak = dziedziczy wszystkie |
| `disallowedTools` | list/string | Denylist, aplikowany PRZED `tools` |
| `model` | string | `sonnet`/`opus`/`haiku`/pelny ID/`inherit`; default `inherit` |
| `permissionMode` | string | `default`/`acceptEdits`/`auto`/`dontAsk`/`bypassPermissions`/`plan` |
| `maxTurns` | int | Max agentic turns |
| `skills` | list | Pre-loaded skille (pelna tresc wstrzyknieta) |
| `mcpServers` | list | MCP servers (inline config lub nazwa odniesienia) |
| `hooks` | object | Lifecycle hooks (`PreToolUse`, `PostToolUse`, `Stop`) |
| `memory` | string | `user`/`project`/`local` - persistent memory dir |
| `background` | bool | Default `false`; `true` = zawsze background |
| `effort` | string | Override effort level sesji |
| `isolation` | string | `"worktree"` albo nic |
| `color` | string | `red`/`blue`/`green`/`yellow`/`purple`/`orange`/`pink`/`cyan` |
| `initialPrompt` | string | Auto-submitted jako pierwsze user turn (tylko dla `--agent` session-wide) |

**Resolution order modelu (4 poziomy precedencji):**
1. `CLAUDE_CODE_SUBAGENT_MODEL` env var (najwyzszy)
2. Per-invocation `model` w Agent tool call
3. Subagent definition `model` frontmatter
4. Model glownej konwersacji (najnizszy)

### 4. Scope i priorytet subagentow

5 lokalizacji, priorytet malejacy:
1. Managed settings (organization-wide, najwyzszy)
2. `--agents` CLI flag (session only)
3. `.claude/agents/` (project, do VCS)
4. `~/.claude/agents/` (user, cross-project)
5. Plugin `agents/` directory (najnizszy)

*"Project subagents are discovered by walking up from the current working directory. Directories added with `--add-dir` grant file access only and are not scanned for subagents."*

**Security nota dla pluginow:** *"For security reasons, plugin subagents do not support the `hooks`, `mcpServers`, or `permissionMode` frontmatter fields."*

### 5. Agent SDK: AgentDefinition (programmatic)

Zrodlo: [platform.claude.com/docs/en/agent-sdk/subagents](https://code.claude.com/docs/en/agent-sdk/subagents).

Python/TypeScript SDK akceptuje `agents` parametr w `ClaudeAgentOptions`. AgentDefinition fields (skrocone vs filesystem):

| Pole | Typ | Wymagane |
|---|---|---|
| `description` | string | Yes |
| `prompt` | string | Yes (system prompt dla subagenta) |
| `tools` | string[] | No |
| `model` | `'sonnet'\|'opus'\|'haiku'\|'inherit'` | No |
| `skills` | string[] | No |
| `memory` | `'user'\|'project'\|'local'` | No (Python only) |
| `mcpServers` | `(string\|object)[]` | No |

**Krytyczne wymaganie:** *"The `Agent` tool must be included in `allowedTools` since Claude invokes subagents through the Agent tool."* - Bez tego subagent nie zostanie uruchomiony.

**Warning z docs:** *"Subagents cannot spawn their own subagents. Don't include `Agent` in a subagent's `tools` array."* - Oficjalne ograniczenie nested delegation.

### 6. Isolation: default vs worktree

Default (brak `isolation`): subagent startuje w `cwd` rodzica, shared filesystem.

Z docs: *"A subagent starts in the main conversation's current working directory. Within a subagent, `cd` commands do not persist between Bash or PowerShell tool calls and do not affect the main conversation's working directory."*

`isolation: worktree`: tworzy temporary git worktree. *"The worktree is automatically cleaned up if the subagent makes no changes."*

Jesli subagent robi zmiany: worktree persists; czyszczenie manualnym `ExitWorktree` lub `EnterWorktree` ponownie.

### 7. Foreground vs Background (run_in_background)

Z docs:
- **Foreground:** blokuje main conversation, permission prompts i AskUserQuestion przechodza do usera
- **Background:** concurrent; Claude Code **prompts for all tool permissions upfront** przed launchem, subagent auto-denies cokolwiek poza allowlist. Jesli AskUserQuestion trafia sie w background, tool call fails ale agent kontynuuje.

Fallback: *"If a background subagent fails due to missing permissions, you can start a new foreground subagent with the same task to retry with interactive prompts."*

Disable globally: `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1`.

Skrot: **Ctrl+B** backgrounduje running foreground task.

### 8. SendMessage + resume mechanism

Z docs (wymaga `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`):
*"When a subagent completes, Claude receives its agent ID. Claude uses the `SendMessage` tool with the agent's ID as the `to` field to resume it."*

Jesli stopped subagent otrzyma `SendMessage`: *"auto-resumes in the background without requiring a new `Agent` invocation."*

Transcript location: `~/.claude/projects/{project}/{sessionId}/subagents/agent-{agentId}.jsonl`.

### 9. Context inheritance table

Z docs [/en/agent-sdk/subagents#what-subagents-inherit](https://code.claude.com/docs/en/agent-sdk/subagents):

| Subagent DOSTAJE | Subagent NIE DOSTAJE |
|---|---|
| Wlasny system prompt (`AgentDefinition.prompt`) | History konwersacji rodzica |
| Prompt string z Agent tool call | Tool results rodzica |
| Project `CLAUDE.md` (jesli `settingSources` ustawione) | Skills (chyba ze w `skills` pole) |
| Definicje tooli (inherited lub subset) | System prompt rodzica |

**Kluczowy cytat:** *"The only channel from parent to subagent is the Agent tool's prompt string, so include any file paths, error messages, or decisions the subagent needs directly in that prompt."*

To jest **architektoniczny kontrakt** - parent musi explicite przekazac wszystko, co subagent potrzebuje. Stad "self-contained briefs" anti-pattern gdy pominiete (patrz R7).

### 10. Common patterns z docs

**Parallel research:** *"Research the authentication, database, and API modules in parallel using separate subagents"* - multiple Agent tool calls w jednej wiadomosci = concurrent execution.

**Warning:** *"When subagents complete, their results return to your main conversation. Running many subagents that each return detailed results can consume significant context."*

**Chain:** *"Use the code-reviewer subagent to find performance issues, then use the optimizer subagent to fix them"* - sekwencja, wyniki agenta N -> brief dla N+1.

### 11. Auto-compaction subagentow

*"Subagents support automatic compaction using the same logic as the main conversation. By default, auto-compaction triggers at approximately 95% capacity. To trigger compaction earlier, set `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` to a lower percentage (for example, `50`)."*

Ciekawe: kazdy subagent ma swoj transcript, swoja compaction - niezalezne od main.

### 12. Restrictions od `permissions.deny` i `--disallowedTools`

Globalnie blokowac subagent: `"permissions": {"deny": ["Agent(Explore)"]}` w settings.json. Dziala dla built-in i custom.

CLI: `claude --disallowedTools "Agent(Explore)"`.

W main-thread agent (`--agent`): restrict ktore typy moze spawn: `tools: Agent(worker, researcher), Read, Bash`.

### 13. Windows-specific quirks

Z docs: *"On Windows, subagents with very long prompts may fail due to command line length limits (8191 chars). Keep prompts concise or use filesystem-based agents for complex instructions."*

To istotne dla dlugich promptow inline - `.claude/agents/` plik omija limit.

## Issues / Flags

- **Missing parameter defaults:** Docs podaja ze `run_in_background` default = `false`, ale dla `max_turns`, `effort`, `mode` - brak explicitnego default w oficjalnych materialach. Gap.
- **`subagent_type` enum nigdzie nie jest formalnie wymieniony.** Docs mowi "specifies type" bez schema. Praktyka: `general-purpose`, `Explore`, `Plan`, `statusline-setup`, lub `name` z custom agent definition.
- **SendMessage i agent teams sa experimental** - wymaga env var, niepelnie udokumentowane poza tym ze istnieje.
- **Claude Code Guide** agent ledwie wymieniony (tylko w tabeli "Other"), brak dokumentacji co realnie robi.
- **Nested delegation** explicite zakazane: *"Subagents cannot spawn other subagents"* - ale dlaczego (technical? performance?) nie wyjasnione.

## Recommendation

R1 dostarcza solidna podstawe API Task/Agent tool. **GO dla Fazy 2 (Extract)**: extractor musi wylowic co najmniej:
1. Lista 17 frontmatter fields + semantics
2. 4-poziomowy resolution order modelu
3. 5 built-in subagent types + ich model/tools
4. Rename Task -> Agent w v2.1.63 + kompatybilnosc
5. Subagent inheritance: co dostaje, co nie
6. Windows 8191-char limit
7. Nested delegation: zakazane
8. Isolation worktree auto-cleanup rule

Luki do pokrycia w innych raportach:
- R2 (subagent lifecycle) musi pokryc co robi `skills` field dokladnie, compact/resume mechanics od strony zastosowania
- R3 (worktree) musi poglebic Windows limitations
- R6 (background) musi znalezc praktyczne user stories run_in_background + Monitor/SendMessage

**Licznik slow: ~1920** (dla kontroli BRAMA 2, wymaga > 1500).

## Sources

- [Create custom subagents - Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [Subagents in the SDK - Claude API Docs](https://code.claude.com/docs/en/agent-sdk/subagents)
- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) (published 2025-09-29)
- [The Task Tool: Claude Code's Agent Orchestration System - dev.to/bhaidar](https://dev.to/bhaidar/the-task-tool-claude-codes-agent-orchestration-system-4bf2)
- [Claude Code Advanced Patterns: Subagents, MCP, and Scaling (Anthropic PDF)](https://resources.anthropic.com/hubfs/Claude%20Code%20Advanced%20Patterns_%20Subagents,%20MCP,%20and%20Scaling%20to%20Real%20Codebases.pdf)
