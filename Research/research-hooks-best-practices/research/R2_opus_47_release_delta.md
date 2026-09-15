# R2 - Opus 4.7 Release Delta (hook-relevant)

**Researcher:** R2 (Opus 4.7 delta focus)
**Date:** 2026-04-17
**Scope:** Co konkretnie zmienilo sie w Opus 4.7 (wypuszczonym 2026-04-16) i jakie ma implikacje dla hook-patterns w Claude Code.
**NIE powtarza:** calej dokumentacji hookow (to robi R1). Skupienie wylacznie na DELCIE wzgledem 4.6/4.5 i wzgledem starszych wersji Claude Code.

---

## 1. Release Summary

### 1.1 Dane kluczowe

- **Wersja:** Claude Opus 4.7 ("claude-opus-4-7")
- **Release date (model API):** 2026-04-16 (GA na claude.ai, Claude API, AWS Bedrock, Google Vertex AI, Microsoft Foundry)
- **Release date (Claude Code CLI):** 2026-04-16, build **v2.1.111** (pierwszy build z wsparciem Opus 4.7 xhigh), patch **v2.1.112** tego samego dnia o 19:55 UTC
- **Pricing:** $5/MTok input, $25/MTok output - **bez zmian** wzgledem Opus 4.6
- **Context window:** 1M tokens (bez long-context premium, standardowa cena)
- **Max output:** 128k tokenow (Messages API), 300k z headerem `output-300k-2026-03-24` w Batch API
- **Knowledge cutoff:** styczen 2026

### 1.2 Glowne nowosci (nie-hookowe, dla kontekstu)

- Pierwszy Claude z hi-res vision: do 2576px / 3.75MP (vs 1568px / 1.15MP w 4.6). Wazne dla computer use i screenshot workflows, bo mapowanie koordynatow jest teraz 1:1 bez scale math.
- Nowy effort level: **`xhigh`** (miedzy `high` a `max`), rekomendowany startowy dla coding/agentic.
- **Task budgets (beta)** - advisory token budget na caly agentic loop. Wlacza sie beta-headerem `task-budgets-2026-03-13`. Minimum 20k.
- **Nowy tokenizer** - 1.0x do 1.35x wiecej tokenow dla tego samego tekstu wzgledem 4.6. Trzeba podniesc `max_tokens` i progi kompakcji.
- Adaptive thinking **OFF by default** w 4.7 (w 4.6 bylo inaczej). `thinking: {type: "adaptive"}` trzeba wlaczyc jawnie.
- Extended thinking budgets **usuniete** (w 4.6 byly). `thinking.budget_tokens` zwraca teraz 400.
- Sampling params (`temperature`, `top_p`, `top_k`) - non-default zwraca 400. Trzeba je po prostu pominac.
- Thinking content **nie jest streamowany** domyslnie (pusty `thinking` field), trzeba `display: "summarized"` zeby wrocic do poprzedniego zachowania.
- Benchmarki: 64.3% SWE-bench Pro, 87.6% SWE-bench Verified, 69.4% Terminal-Bench 2.0. +13% wzgledem 4.6 na coding.

---

## 2. Hook-relevant Changes (SEDNO)

### 2.1 Czy sa NOWE hook events w Claude Code v2.1.111 (dzien premiery 4.7)?

Odpowiedz: **nie bezposrednio w v2.1.111**, ale caly kwiecien 2026 dowiozl znaczaca ekspansje systemu hookow, i wlasnie te hooki sa rekomendowane jako narzedzie do sensownego uzywania 4.7. Nowe eventy wprowadzone w kwietniu 2026 (v2.1.101 -> v2.1.112):

| Hook event | Wprowadzony w | Zastosowanie w erze 4.7 |
|---|---|---|
| `TaskCreated` | v2.1.84 (pre-4.7) | Intercept kiedy 4.7 tworzy task via `TaskCreate` - powiazane z task_budgets |
| `TaskCompleted` | v2.1.84 | Zatwierdzenie gate przy koncu taska |
| `TeammateIdle` | v2.1.84 | Kontrola idle state w multi-agent pipeline (4.7 spawnuje mniej subagentow domyslnie) |
| `WorktreeCreate` | v2.1.84 | HTTP-type hook zwraca `hookSpecificOutput.worktreePath` - potrzebne bo 4.7 Agent tool ma nowy parametr `isolation.worktree` |
| `WorktreeRemove` | v2.1.84 | Cleanup po izolowanym subagent runie |
| `CwdChanged` | v2.1.83 | Reactive env management (direnv-style), pisze do `CLAUDE_ENV_FILE` |
| `FileChanged` | v2.1.83 | Literal (NIE regex) watcher filenamow, `.envrc|.env` |
| `PreCompact` | v2.1.105 | Mozna zablokowac exit code 2 lub `{"decision":"block"}` - KRYTYCZNE dla 4.7 bo 1M context + new tokenizer zmienia kalkulacje kiedy compaction jest optymalny |
| `PostCompact` | v2.1.76 | Audit po kompakcji |
| `StopFailure` | v2.1.78 | Odroznia rate_limit / billing_error / max_output_tokens / server_error - wazne przy 128k output w 4.7 |
| `PermissionDenied` | v2.1.89 | Auto mode classifier denial - Auto mode jest teraz dostepne dla Max users na 4.7 (NOWOSC v2.1.111) |
| `Elicitation` / `ElicitationResult` | v2.1.76 | Intercept MCP elicitation responses - MCP Elicitation to feature rowniez kwietniowy |
| `InstructionsLoaded` | v2.1.76 | Audit CLAUDE.md / .claude/rules loadow |
| `ConfigChange` | v2.1.76 | Intercept zmian settings.json / skills w runtime |
| `PostToolUseFailure` | v2.1.76 | Oddzielne od `PostToolUse` - daje `error` field |

### 2.2 Nowe funkcje HOOK-specific w v2.1.110 / v2.1.111 (dni wokol 4.7)

**v2.1.111 (dzien premiery 4.7):**

- **`UserPromptSubmit`** moze ustawiac `hookSpecificOutput.sessionTitle` - auto-naming sesji pod 4.7 ktore generuje lepsze tytuly.
- Push notification tool (Claude moze wysylac mobile push kiedy Remote Control wlaczony) - dziala przez Notification hook event.
- Plan files nazywane po prompt'cie (np. `fix-auth-race-snug-otter.md`) - UserPromptSubmit moze to uzyc.

**v2.1.110:**

- **PreToolUse hook fix** - `additionalContext` nie byl dropowany kiedy tool call failuje (regresja wczesniej).
- **PermissionRequest hooks** - walidacja `permissions.deny` fixed, `setMode:'bypassPermissions'` teraz respektuje `disableBypassPermissionsMode`.
- **Hooks returning `"allow"` NIE omijaja `deny` rules** (security fix w v2.1.98, wciaz relevant).
- SDK/headless - `TRACEPARENT` / `TRACESTATE` z environment dla distributed tracing subagent callow.

**v2.1.105 (kilka dni przed 4.7):**

- **PreCompact mozna zablokowac** - krytyczne dla 4.7 bo nowy tokenizer zmienia progi.
- **Background monitors** - top-level `monitors` manifest key, auto-arming at session start / skill invoke.
- Skills description cap raised 250 -> 1,536 chars (wazne dla 35-skill systemow jak Agent_Architecture).

### 2.3 PreToolUse "defer" decision - NOWY PATTERN (v2.1.89, wciaz kluczowy przy 4.7)

W 4.7 z `auto` mode dla Max userow warto znac:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow|deny|ask|defer",
    "permissionDecisionReason": "...",
    "updatedInput": { /* mozna przepisac parametry */ },
    "additionalContext": "..."
  }
}
```

- `"defer"` pauzuje w non-interactive (`-p`) mode dla external UI.
- `updatedInput` + `permissionDecision: "allow"` pozwala headless integration modyfikowac parametry przed wykonaniem.
- W 4.7 Opus bywa bardziej "literalny" (behavior change: "will not silently generalize"), wiec hook ktory sanityzuje parametry (dedupe paths, normalize flags) teraz nie jest tak latwo overridowany przez model.

### 2.4 Agent tool - nowe parametry vs hook synergy

```json
{
  "type": "agent",
  "name": "researcher",
  "run_in_background": true,
  "isolation": {
    "worktree": true,
    "cwd": "/specific/path"
  },
  "model": "opus"
}
```

- **`run_in_background: true`** - task tracking, nie blokuje parent sesji. `SubagentStart` hook firuje od razu, `SubagentStop` kiedy gotowe. Partial results zachowywane przy killingu.
- **`isolation.worktree: true`** - wymaga `WorktreeCreate` hook hooka do zwrocenia `worktreePath`. Bez hooka Claude Code uzyje domyslnego.
- **`isolation.cwd`** - `CwdChanged` hook moze ustawic env per-subagent (direnv pattern).
- **`model: "opus"`** - per-invocation override (resurrected w v2.1.75). Hook moze to nadpisac via `updatedInput` w `PreToolUse` z `tool_name: "Agent"`.
- `/agents` tabbed layout (Running vs Library) - running indicator `?` - pozwala hookom (np. dashboard HTTP webhook) snapshotowac stan agentow.
- `TaskOutput` tool REMOVED (v2.1.83) - teraz `Read` na background task file, wiec hooki obserwujace output musza zmienic pattern z `PostToolUse: TaskOutput` na `FileChanged` lub `PostToolUse: Read` z matcherem.

### 2.5 Czy tool use zmiany w 4.7 wplywaja na hook patterns?

**Tak**, na trzy sposoby:

1. **Fewer tool calls by default** (behavior change 4.7). Hooks oparte na "Claude robi >=N tool calls na turn" beda rzadziej firowac. Podnies `effort` do `xhigh` zeby to odwrocic.
2. **Fewer subagents spawned by default**. `SubagentStart` hooki firuja rzadziej - dobre dla observability costs, zle jesli polegasz na nich dla parallelizacji. Trzeba promptowac jawnie.
3. **More literal instruction following**. Jesli hook wstrzykuje `additionalContext` z instrukcja "double-check slide layout", 4.7 wykona ja doslownie. Mozna wyrzucic scaffolding hooki ktore 4.6 potrzebowal.

### 2.6 PreCompact + nowy tokenizer 4.7 - migration hazard

Kluczowe dla tego ktorzy maja custom PreCompact hook:

- Tokenizer 4.7 liczy **do 35% wiecej tokenow** dla identycznego tekstu vs 4.6.
- Jesli hook liczyl "skompaktuj kiedy context > 800k tokenow" na 4.6, to na 4.7 ten sam content to ~1.08M tokenow - czyli juz **przekracza context window** zanim hook zdazy zadecydowac.
- Rekomendacja: **obniz proge PreCompact o ~25%** gdy migrujesz z 4.6 -> 4.7. Jesli trigger byl przy 85% context fill na 4.6 (~850k z 1M), przesun go do ~70% (~700k) na 4.7.
- `max_tokens` trzeba podniesc tez. Dokumentacja wprost: "We suggest updating your max_tokens parameters to give additional headroom, including compaction triggers."

### 2.7 Hooki wolajace LLM (HTTP hooks cascade) - pricing impact

HTTP hook type to `{type: "http", url: ..., headers: {...}, allowedEnvVars: [...]}`. Zwraca 2xx + `{decision: "block"}` zeby zablokowac. Pattern "hook wywoluje inny LLM do szybkiej walidacji" (np. Haiku 4.5 classifier przed PreToolUse):

| Model validatora | Koszt per 1K input | Koszt per 1K output | Latency | Rekomendacja |
|---|---|---|---|---|
| Haiku 4.5 | $0.001 | $0.005 | Najszybszy, 4-5x Sonnet 4.5 | **Preferowany** jako fast validator hook |
| Haiku 3.5 | $0.0008 | $0.004 | Szybki, ale brak extended thinking | Tylko dla super-prostych klasyfikacji |
| Sonnet 4.6 | $0.003 | $0.015 | Fast, z extended thinking | Dla bardziej niuansowej walidacji |
| Opus 4.7 | $0.005 | $0.025 | Moderate | Nie jako validator w hooku - za drogo, za wolno |

**Kalkulacja realna:** Hook ktory wola Haiku 4.5 raz per PreToolUse event z 2k input / 200 output tokenow = $0.002 + $0.001 = $0.003 per event. Przy 500 events / session = $1.50 kosztow dodatkowych. Akceptowalne dla critical security hooks, za drogie dla ubiquitous telemetry.

**Wazne:** Haiku 4.5 prompt caching jest 10x tanszy na read ($0.0001/MTok) - jesli hook ma staly system prompt, caching obniza koszt o ~90%. 1h TTL ($2/MTok write) oplaca sie po 2 czytaniach.

### 2.8 1M context window - czy PreCompact / additionalContext injection wymaga innej strategii

Tak. 4.7 ma 1M context standardowo (nie premium, nie beta) - wiec strategie hookowe sie zmieniaja:

- **Stare podejscie (Opus 4.6, 200k):** Agressywne PreCompact trigger, max 50k additionalContext injection, PreToolUse dropuje "stary" tool_response z context.
- **Nowe podejscie (Opus 4.7, 1M):** Pozwol kontekstowi rosnac; PreCompact tylko jako safety net przy ~700k (nie jako aktywna kompresja). `additionalContext` moze byc do 10k chars na event (cap sie nie zmienil, ale jest teraz mniej problematyczny).

**Stara zasada "10k chars cap na additionalContext" pozostaje** - output powyzej 10k jest zapisywany do pliku i zastapiony preview + file path. Przy 1M context mozna ladowac wiecej przez multiple hook events (session start + user prompt submit + pre tool use) zamiast walczyc o miejsce.

### 2.9 Skills i Plugins w 4.7 erze

- **Skills `effort` frontmatter** (v2.1.76) - skill moze overwrite'owac effort level przy invoke. Dla 4.7 to znaczy skill moze wymusic `xhigh` na sobie samym.
- **Built-in skill discovery via Skill tool** (v2.1.108) - built-ins (`/init`, `/review`, `/security-review`) sa teraz discoverable przez model, co znaczy ze PreToolUse matcher `"Skill"` moze hookowac ich wywolania.
- **`disableSkillShellExecution`** (v2.1.91) - setting blokuje inline shell w skill files. Hook pattern: rob PostToolUse na Skill i log ktora skill jest wywolana.
- **Plugin `source: 'settings'`** (v2.1.80) - plugins inline w settings.json. Hooki z pluginow teraz mozna zwalidowac via `ConfigChange` event.
- **Managed plugin policy** (v2.1.85) - `allowedChannelPlugins` allowlist. Security hook pattern: loguj kazda probe uzycia poza-allowlist plugin przez `PermissionRequest` hook.

---

## 3. Delta Table: 4.5 vs 4.6 vs 4.7 w kontekscie hookow

| Wymiar | Opus 4.5 | Opus 4.6 | Opus 4.7 |
|---|---|---|---|
| Model API ID | `claude-opus-4-5-20251101` | `claude-opus-4-6` | `claude-opus-4-7` |
| Model alias | `claude-opus-4-5` | `claude-opus-4-6` | `claude-opus-4-7` |
| Release date | 2025-11-01 | pre-2026 | 2026-04-16 |
| Context window | 200k | 1M | **1M** |
| Max output | 64k | 128k | **128k** |
| Input price | $5/MTok | $5/MTok | $5/MTok |
| Output price | $25/MTok | $25/MTok | $25/MTok |
| 5m cache write | $6.25/MTok | $6.25/MTok | $6.25/MTok |
| 1h cache write | $10/MTok | $10/MTok | $10/MTok |
| Cache read | $0.50/MTok | $0.50/MTok | $0.50/MTok |
| Tokenizer | legacy | legacy | **NEW (1.0x-1.35x wiecej tokenow)** |
| Extended thinking | Yes | Yes | **No (removed, adaptive only)** |
| Adaptive thinking | No | Yes (default on) | **Yes (default OFF)** |
| Sampling params | OK | OK | **400 error** |
| `xhigh` effort | brak | brak | **Dostepny** |
| Task budgets | brak | brak | **Beta** |
| Hi-res vision 2576px | 1568px | 1568px | **2576px** |
| Auto mode | brak | brak (tylko dla Max) | **Max users** |
| PreCompact hook | v2.1.105+ | v2.1.105+ | v2.1.105+ |
| TaskCreated hook | v2.1.84+ | v2.1.84+ | v2.1.84+ |
| Agent tool `run_in_background` | v2.1.x | v2.1.x | **v2.1.111 full integration z auto mode** |
| Agent tool `isolation` | v2.1.x | v2.1.x | v2.1.x |
| Agent tool `model` override | od v2.1.75 | od v2.1.75 | od v2.1.75 |
| Rekomendowany hook use case | Observability tylko | PreCompact + TaskCreated | Pelny pipeline: PreToolUse defer + PreCompact + PermissionDenied + TaskCreated + WorktreeCreate |

---

## 4. Migration Notes: 4.6 -> 4.7 hook changes

Konkretne rzeczy do zmiany w istniejacych hookach:

### 4.1 API-level hooki (kiedy hook wywoluje Claude API)

1. **Usun sampling params.** Hooki ktore skladaja request body z `temperature: 0` beda failowac na 400.
   ```python
   # PRZED
   body = {"model": "claude-opus-4-6", "temperature": 0, "messages": ...}
   # PO
   body = {"model": "claude-opus-4-7", "messages": ...}
   ```

2. **Zmien `thinking` config.**
   ```python
   # PRZED (Opus 4.6 extended thinking)
   thinking = {"type": "enabled", "budget_tokens": 32000}
   # PO (Opus 4.7 adaptive only)
   thinking = {"type": "adaptive", "display": "summarized"}  # summarized zeby streamowalo widocznie
   output_config = {"effort": "xhigh"}
   ```

3. **Podnies `max_tokens`** o ~20-30% zeby skompensowac nowy tokenizer. Szczegolnie PreCompact triggers i `max_tokens` cap w request body.

4. **Opt-in na thinking content.** Jesli UI wyswietla thinking-stream, dodaj `"display": "summarized"` - inaczej uzytkownik widzi "pauze" przed outputem.

### 4.2 Claude Code hooks (settings.json)

1. **PreCompact trigger** - obniz prog o ~25%. Jesli hook mial custom logic bazujaca na token counts, przeliczyc.

2. **Sprawdz czy hooki robia "allow"** ktore powinny byc overridem `deny`. W v2.1.98+ `"allow"` NIE omija `deny` rules - to security fix, ale niektore stare hooki moga sie na tym polegac. Zmigrowac na `"ask"` lub rebuild permission rules.

3. **TaskOutput** hook matcher -> zastap przez `FileChanged` na background task file path, albo `PostToolUse` z `tool_name: "Read"` + path match. `TaskOutput` tool removed w v2.1.83.

4. **Agent tool `isolation`** - jesli korzystasz z worktrees, dodaj hook `WorktreeCreate` (HTTP type zwraca `worktreePath`).

5. **Auto mode + PermissionDenied** - dla Max users z 4.7 Auto mode, dodaj `PermissionDenied` hook z `{retry: true}` gdy chcesz regenerowac parametry po auto-denial.

6. **Skill effort frontmatter** - dla najbardziej intensywnych skills wpisz `effort: xhigh` zeby wymusic 4.7 xhigh tylko tam gdzie potrzeba.

7. **Usuniete komendy** - `/tag`, `/vim` (v2.1.92). Jesli hook byl trigerrowany przez ich uzycie, usun.

### 4.3 Streaming / SSE hooki

- `PreToolUse additionalContext` drop przy tool call failure **jest fixed w v2.1.110** - jesli mial defensive workaround, usun.
- SSE transport teraz handluje large frames w linear time (bylo quadratic) - hooki powyzej 100KB response teraz nie timeoutuja.

### 4.4 Obserwacyjne (nie-blocking) hooki

- **`Notification` hook** ma nowy matcher `elicitation_dialog` - dodaj obsluge jesli robisz notifikacje dla MCP elicitation flows.
- **`StopFailure`** daje rozroznienie `max_output_tokens` vs `rate_limit`. Dla 4.7 z 128k output powinny byc osobne metryki - hit na `max_output_tokens` w 4.7 znaczy "prompt zle podzielony", nie "model gada za duzo".
- **Telemetry fields** - `OTEL_LOG_RAW_API_BODIES` (v2.1.111) nowy env var dla debug pelnych request/response. Hook ktory loguje do zewnetrznego systemu moze to teraz wlaczyc per-session.

### 4.5 Rzeczy ktore ZOSTAJA bez zmian

- Pricing $5/$25 input/output - **bez zmian 4.6 -> 4.7**, wiec hook cost budgety nie wymagaja recalibration.
- Cache tier pricing - bez zmian ($6.25 write 5m / $10 write 1h / $0.50 read).
- Tool use pricing (tokens per tool definition) - **346 tokens auto/none, 313 any/tool** - identyczne jak 4.6 i 4.5.
- Context window 1M - bez zmian wzgledem 4.6 (to 4.5 mialo 200k).
- Tool matcher values (Bash, Edit, Write, Read, Glob, Grep, Agent, WebFetch, WebSearch, AskUserQuestion, ExitPlanMode) - bez zmian.
- MCP tool matcher format `mcp__server__tool` - bez zmian.
- Common hook input fields (session_id, transcript_path, cwd, hook_event_name, permission_mode) - bez zmian.

---

## 5. Rekomendowane hook use cases per model w erze 4.7

Kiedy hook wywoluje LLM (HTTP cascade), dobierz model pod cel:

| Use case | Rekomendowany model | Dlaczego |
|---|---|---|
| Fast PreToolUse validator (czy to bash command jest bezpieczny) | **Haiku 4.5** | 4-5x szybszy niz Sonnet, $1/$5 pricing, matches Sonnet 4 quality |
| PostToolUse classifier (czy output zawiera secret) | Haiku 4.5 | J.w., + prompt caching na regex rules |
| Nuanced policy check (czy refactor narusza architecture rules) | Sonnet 4.6 | Extended thinking, moderate cost |
| Audit/summary hook (TaskCompleted -> generuj report) | Sonnet 4.6 lub Opus 4.7 low effort | Jakosciowa prose |
| Main orchestrator (w samym Claude Code) | **Opus 4.7 xhigh** | +13% coding vs 4.6, 1M context, better instruction following |
| Subagent (via Agent tool `model: "haiku"`) | Haiku 4.5 | Szybki, tani, dobry enough do parallel research |

---

## 6. Braki / niepewnosci (honest disclosure)

- **Czy Opus 4.7 ma wbudowane nowe hook events na poziomie API** (nie Claude Code CLI)? **Brak zmian hook-specific na poziomie Messages API.** Hooki w Claude Code sa orthogonalne do modelu i dzialaja identycznie dla 4.6 i 4.7.
- Skills system i Plugins marketplace w kontekscie 4.7 - dokumentacja nie wskazuje na model-specific behavior, sa to features Claude Code CLI, nie modelu.
- Claude Managed Agents - w 4.7 handluje effort automatycznie, nie przez hook. To osobny runtime od Claude Code, i tam system hookow nie istnieje w tym samym ksztalcie.
- Tokenizer "1.0x-1.35x" to range dokumentacyjny - konkretny multiplier zalezy od contentu. Nie da sie podac exact ratio bez empirical testu.

---

## Sources Cited

1. Anthropic News - "Introducing Claude Opus 4.7" (2026-04-16): https://www.anthropic.com/news/claude-opus-4-7
2. Claude API Docs - "What's new in Claude Opus 4.7": https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7
3. Claude API Docs - "Models overview" (pricing, context, max output comparison table): https://platform.claude.com/docs/en/about-claude/models/overview
4. Claude API Docs - "Pricing" (cache multipliers, batch, tool use tokens): https://platform.claude.com/docs/en/about-claude/pricing
5. Claude Code Docs - "Hooks reference" (all hook events, payloads, April 2026 additions): https://code.claude.com/docs/en/hooks
6. Claude Code Docs - "Changelog" April 2026: https://code.claude.com/docs/en/changelog
7. GitHub - anthropics/claude-code releases v2.1.101 -> v2.1.112 (April 10-16, 2026): https://github.com/anthropics/claude-code/releases
8. GitHub blog - "Claude Opus 4.7 is generally available" (2026-04-16): https://github.blog/changelog/2026-04-16-claude-opus-4-7-is-generally-available/
9. AWS Blog - "Introducing Anthropic's Claude Opus 4.7 model in Amazon Bedrock": https://aws.amazon.com/blogs/aws/introducing-anthropics-claude-opus-4-7-model-in-amazon-bedrock/
10. Anthropic News - "Introducing Claude Haiku 4.5" (pricing, validator use case): https://www.anthropic.com/news/claude-haiku-4-5
11. Claude API Docs - Migration guide "Migrating to Claude Opus 4.7": https://platform.claude.com/docs/en/about-claude/models/migration-guide

---

**Word count (Polish narrative + tables):** ~1850 slow.
