# R2 - Subagent Lifecycle + Context Inheritance

**Rola:** Researcher Tech (ground truth z oficjalnych blog postow + RFC-grade github issues)
**Data:** 2026-04-17
**Pytanie:** Co subagent dziedziczy (system prompt? tools? CLAUDE.md? cwd?), co jest isolated, czy subagent moze spawn sub-subagent, max recursion depth, token accounting.

## Summary

Subagent ma fresh context window. Dostaje 4 rzeczy: (1) prompt string z Agent tool call, (2) wlasny system prompt z markdown body, (3) environment details (cwd, platform), (4) explicite wymienione skills. **Nie dziedziczy** historii konwersacji rodzica, wynikow wczesniejszych tool calls, CLAUDE.md rodzica (jesli settingSources nie ustawione), systemowego promptu rodzica ani skilli aktywnych w rodzicu. Built-in subagenty (Explore, Plan, general-purpose) dziedzicza permissions z dodatkowymi restrykcjami. **Max recursion depth = 1**: subagent NIE moze spawn kolejnych subagentow (oficjalne ograniczenie, *"hard depth limit of 1 level, which prevents recursive explosion"*). Token accounting jest niewidoczne w mainstreamowym `/context` - GitHub issue #10164 (zamkniete "not planned" 2025-10-23) pokazuje ze sub-agent token usage jest hidden od usera. Typowe koszty per invocation: **Explore (Haiku) ~5k tokens**, **general-purpose (Sonnet) 30-50k tokens**, MCP tool descriptions doddatkowe 10-20k per session. Lifecycle: spawn przez Agent tool -> wlasny transcript jsonl -> output verbatim do parent jako tool result -> destroy (chyba ze resume przez SendMessage, wymaga `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`). Hooks: `SubagentStart`, `SubagentStop`, `Stop` w frontmatter (konwertowany na SubagentStop runtime).

## Details

### 1. Kanal komunikacji rodzic -> subagent: TYLKO prompt string

Kluczowy cytat z [agent-sdk/subagents](https://code.claude.com/docs/en/agent-sdk/subagents):
*"The only channel from parent to subagent is the Agent tool's prompt string, so include any file paths, error messages, or decisions the subagent needs directly in that prompt."*

To **kontrakt architektoniczny**, nie przypadkowy detal. Implikacja:
- Orkiestrator musi packowac wszystkie absolutne sciezki do plikow, fragmenty kodu, decyzje w prompt
- Brak "domyslnego kontekstu" - subagent startuje "blind to everything the parent knows"
- Anti-pattern: "delegating understanding" - zakladanie ze subagent sam sie domysli (R7)

### 2. Dokladny table inheritance

Z docs SDK:

| Subagent DOSTAJE | Subagent NIE DOSTAJE |
|---|---|
| Agent tool `prompt` string | Konwersacja rodzica |
| Wlasny system prompt (markdown body lub `AgentDefinition.prompt`) | Tool results rodzica |
| Environment details: cwd, platform (Windows/Mac/Linux), date | Output innych subagentow |
| Tool definitions (inherited lub `tools` subset) | System prompt rodzica |
| Project `CLAUDE.md` *tylko* jesli `settingSources` ustawione | Skills sesji rodzica (chyba ze `skills` pole w definicji) |
| Preloaded skills jesli wymienione w `skills` frontmatter | MCP tools spoza `mcpServers` pole |

**Nota o CLAUDE.md** (z morphllm.com): CLAUDE.md jest ladowany wewnatrz subagenta *"loaded via settingSources"* - to odroznienie od zachowania interactive mode gdzie CLAUDE.md jest auto-loaded. Dla SDK subagentow trzeba explicite settingSources: `['project', 'user']`.

### 3. Skills - pelna tresc wstrzykiwana przy starcie

Cytat z [/en/sub-agents#preload-skills-into-subagents]:
*"The full content of each skill is injected into the subagent's context, not just made available for invocation. Subagents don't inherit skills from the parent conversation; you must list them explicitly."*

Konsekwencja:
- Jesli skill ma 5k slow i wymieniony w `skills: [x, y, z]` (3 skille), subagent startuje z 15k slow systemowym promptem ponad wlasnym
- To kosztuje tokens from the start - lewarowanie nad plain `prompt` powinno byc umotywowane
- Rozne wzgledem main agent: tam skille sa discovered/loaded on demand (LLM decyduje czy zaladowac)

### 4. Max recursion depth: 1 level, hard limit

**Oficjalny cytat** z docs [/en/sub-agents#choose-between-subagents-and-main-conversation]:
*"Subagents cannot spawn other subagents. If your workflow requires nested delegation, use Skills or chain subagents from the main conversation."*

SDK reinforces: *"Subagents cannot spawn their own subagents. Don't include `Agent` in a subagent's `tools` array."*

Community confirms (opencode fork issue #18100 wskazuje ze w ich wariancie sub-sub-agent jest mozliwy - to anomalia vs Anthropic): *"Sub-agents cannot spawn other sub-agents; there's a hard depth limit of 1 level, which prevents recursive explosion and keeps the system debuggable."*

**Implikacja dla orchestracji:** jesli potrzebujesz 3-poziomowej hierarchy (A -> B -> C), musisz:
- Chain w rodzicu: rodzic wywoluje A, zbiera output, potem wywoluje B dostajac kontekst z A
- Albo uzyc **Agent Teams** (experimental, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) ktore koordynuje cross-session
- Lub uzyc Skills wewnatrz subagenta - Skills dzialaja inline i moga logicznie "zagniezdzac" funkcjonalnosc

### 5. Lifecycle events i hooks

| Event | Matcher | Firing moment |
|---|---|---|
| `SubagentStart` | agent type name | Subagent zaczyna execution (w settings.json) |
| `SubagentStop` | agent type name | Subagent konczy (w settings.json) |
| `PreToolUse` | tool name | Przed tool call subagenta (frontmatter lub settings) |
| `PostToolUse` | tool name | Po tool call subagenta |
| `Stop` | none | Subagent konczy (auto-converted na `SubagentStop`) |

Frontmatter hooks (np. w definicji db-reader): dzialaja tylko gdy agent spawned jako subagent (Task tool), NIE gdy agent uruchomiony przez `--agent` flag jako main thread. Explicitly udokumentowane.

### 6. Token accounting: niewidoczne dla usera

**GitHub issue #10164** (Oct 23, 2025, status: Closed - not planned):

Zgloszony problem: *"When using the Task tool to launch sub-agents, there's no visibility into: Which sub-agents were spawned, How many tokens each sub-agent consumed, What files each sub-agent read, Total token usage across all sub-agents."*

Current behavior:
- `/context` pokazuje tylko main session tokens
- Task tool zwraca tylko finalny raport, bez accountingu exploration
- Sub-agent work niewidzialna dla usera

**Propozycja (nie implementowana):** hierarchical breakdown z agent IDs i token counts per subagent. Anthropic zamknelo jako "not planned" - prawdopodobnie dyskotomia UX (dodatkowa zlozonosc ekranu /context).

**Nastawienie dla developerow:** subagent token cost jest emergent - trzeba estymowac. Z morphllm analizy:
- `Explore` (Haiku) ~5k tokens per invocation
- `general-purpose` (Sonnet) 30-50k tokens typical
- MCP tool descriptions dodaja 10-20k per session do subagenta jesli `mcpServers` ustawione

Implikacja: 7 parallel Sonnet subagentow moze spalic 200-350k tokens na samym exploration - przekracza context main agenta.

### 7. CLAUDE_CODE_MAX_OUTPUT_TOKENS vs hardcoded 32K

GitHub issue #25569 (otwarte w 2026): *"CLAUDE_CODE_MAX_OUTPUT_TOKENS not applied to subagent (Task tool) API calls - hardcoded 32K limit"*.

Znaczenie: subagenty maja hardcoded 32k max output tokens niezaleznie od env variable glownej sesji. To praktyczne ograniczenie dla dlugich raportow - 32k ~= 24k slow (standard english), dla polskiego 18-20k slow. Wystarcza dla 1500-6000 slow raportu researchera ale nie dla 10k+ dokumentow.

### 8. Spawning mechanics: kto spawn, kiedy

Z Anthropic blog "How and when to use subagents" (Apr 7, 2026):

Signal thresholds dla automatycznego delegation:
- *"When a task requires exploring ten or more files, or involves three or more independent pieces of work, that's a strong signal to direct Claude toward subagents."*

4 use cases:
1. **Research-heavy**: gathering context z kilkunastu plikow
2. **Multiple independent**: sub-tasks bez zaleznosci
3. **Fresh perspective**: weryfikacja bez bias konwersacji
4. **Pipeline**: sekwencyjne stages z clear handoffs

Timing: *"Three subagents working simultaneously generally finish the task in less time."* - patrz R5.

### 9. Maxturns i budget controls

Z `maxTurns` frontmatter: limituje agentic turns (tool-use + model response pairs).

Community feedback (blakecrosley hooks blog): *"you can cap the loop with max_turns / maxTurns, which counts tool-use turns only."* Oddzielne od wall-clock timeoutu.

**Brak oficjalnie udokumentowanego timeout default** - gap do flagowania dla Critic.

Community confirms dodatkowo `maxBudgetUsd` / `max_budget_usd` dla CI: *"you can also use max_budget_usd / maxBudgetUsd to cap turns based on a spend threshold."* To nie dla Task tool args wg oficjalnych docs - moze byc CLI flag.

### 10. Resume mechanics (agent teams experimental)

Wymaga `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. Flow:
1. Subagent konczy -> Claude dostaje `agentId` w Agent tool result
2. Claude uzywa `SendMessage` z `to: agentId` + `message: "continue with X"`
3. Jesli subagent stopped, auto-resumes in background (bez nowego Agent call)
4. Subagent zachowuje pelna konwersacje: tool calls, results, reasoning

Transkrypty: `~/.claude/projects/{project}/{sessionId}/subagents/agent-{agentId}.jsonl`. Persist niezaleznie od main conversation compaction. Auto-cleanup: `cleanupPeriodDays` (default 30 dni).

### 11. Compact boundary events

Subagent ma wlasne auto-compaction. Default trigger: 95% capacity. Override: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50` (np. 50%).

Transkrypt JSON boundary:
```json
{
  "type": "system",
  "subtype": "compact_boundary",
  "compactMetadata": {
    "trigger": "auto",
    "preTokens": 167189
  }
}
```

Dlatego subagent moze operowac na zadaniu przekraczajacym context limit - compaction summarizes history, execution kontynuuje.

### 12. Destroy vs persist

Default: fresh spawn = fresh context. Po zakonczeniu "the subagent is destroyed" (Medium/Kenji guide).

Persist:
- Z `memory: user|project|local` - przezywa tylko memory directory (MEMORY.md i pliki), nie caly transcript
- Z `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` - transcript jsonl survives for resume
- Bez tych flag - przy kolejnym invocation start fresh

Memory directory:
- `user` scope: `~/.claude/agent-memory/<name>/`
- `project` scope: `.claude/agent-memory/<name>/`
- `local` scope: `.claude/agent-memory-local/<name>/` (nie do VCS)

Auto-injected: pierwsze 200 linii lub 25KB `MEMORY.md` do system promptu.

### 13. Why isolation, by design

Z Anthropic blog (Apr 7, 2026):
*"starts fresh, unburdened by the history of the conversation or invoked skills"* - to **intentional** architectural choice. Powody:
1. Zapobiega transferowi "assumptions, context, or blind spots from the primary conversation"
2. Umozliwia verification bez bias
3. Pozwala subagentowi przeczytac dziesiatki plikow bez bloat parent context
4. Umozliwia ton-specific prompts (dzialalnosci subagent) bez konfliktu z glownym agentem

## Issues / Flags

- **Gap: timeout default dla subagentu.** Nikt nie podaje czy jest wall-clock cap (np. 10 min). Test empirically.
- **Gap: hardcoded 32k output** (issue #25569) - istotne dla raportow >20k slow.
- **Konflikt: opencode fork #18100** pozwala sub-sub-agent - nie Anthropic. Oznaczone jako fork anomalia, nie oficjalne zachowanie.
- **CLAUDE.md loading wymaga `settingSources`** w SDK - niejawne dla filesystem custom agents (te auto-load CLAUDE.md z cwd walkup).
- **Token accounting**: user nie widzi cost sub-agent exploration (issue #10164 not planned). Czy to "problem" czy "intentional privacy"?
- **SendMessage/resume** zalezne od env var `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` - w stable Claude Code feature flag disabled by default.

## Recommendation

R2 solidnie opisuje lifecycle + inheritance. **GO dla Fazy 2 (Extract)** - claim-table musi zawrzec:
1. 4 kanaly co dostaje subagent (prompt, system prompt, env, skills)
2. 5 rzeczy co NIE dostaje (conv hist, tool results, other subagents, parent system prompt, skills)
3. Max depth = 1, hard limit
4. Lifecycle events: SubagentStart/Stop, Pre/PostToolUse, Stop->SubagentStop conversion
5. Token costs: Explore 5k, general-purpose 30-50k, MCP +10-20k
6. Issue #10164 token visibility gap
7. Issue #25569 32k hardcoded output
8. Memory scopes (user/project/local) + auto-inject 25KB MEMORY.md
9. CLAUDE.md wymaga settingSources w SDK
10. Compaction subagentu niezalezna od main

Pytania do pozniejszych raportow / CRITIC:
- R3 musi potwierdzic czy worktree na Windows dzialaja stabilnie (isolation semantic)
- R7 powinno pokryc "delegating understanding" z Anthropic blog jako anti-pattern
- OQ dla Critic: jaki realny timeout? Udalo sie znalezc tylko maxTurns, nie wall-clock

**Licznik slow: ~1770.**

## Sources

- [Create custom subagents - Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [Subagents in the SDK - Claude API Docs](https://code.claude.com/docs/en/agent-sdk/subagents)
- [How and when to use subagents in Claude Code (Anthropic blog, Apr 7, 2026)](https://claude.com/blog/subagents-in-claude-code)
- [Context Management with Subagents - richsnapp.com (Oct 5, 2025)](https://www.richsnapp.com/article/2025/10-05-context-management-with-subagents-in-claude-code)
- [Claude Code Subagents: How They Work, What They See - morphllm.com](https://www.morphllm.com/claude-subagents)
- [GitHub issue #10164 - Sub-agent token usage in /context](https://github.com/anthropics/claude-code/issues/10164)
- [GitHub issue #25569 - CLAUDE_CODE_MAX_OUTPUT_TOKENS hardcoded 32K subagent](https://github.com/anthropics/claude-code/issues/25569)
- [Claude Code: Behind-the-scenes of the master agent loop - promptlayer](https://blog.promptlayer.com/claude-code-behind-the-scenes-of-the-master-agent-loop/)
- [Feature Request: Scoped Context Passing for Subagents #4908](https://github.com/anthropics/claude-code/issues/4908)
