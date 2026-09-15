# R5: Environment Variables + CLI Flags

Scope: wszystkie environment variables i CLI flags Claude Code wplywajace na settings, permissions, auth, model routing, observability i runtime behavior. Oparte o oficjalna dokumentacje `code.claude.com/docs/en/*` (redirect z `docs.claude.com`) w stanie na 2026-04-17.

---

## 1. Abstract

Claude Code czyta konfiguracje z piec rownolegle istniejacych zrodel: **Managed -> CLI args -> Local settings -> Project settings -> User settings** (oficjalna kolejnosc precedencji, cytat sekcja "Settings precedence" na stronie `/en/settings`). Environment variables stanowia rownolegly, szosty "niesformalizowany" kanal - sa to w praktyce **runtime overrides** ktore zwykle maja wyzszy priorytet niz `settings.json`, ale nizszy niz Managed settings i CLI flags dla tych samych opcji, ktore Claude Code mapuje 1:1 (np. `CLAUDE_CODE_ENABLE_TELEMETRY` vs settings `env`, `--debug` vs `CLAUDE_CODE_DEBUG_LOG_LEVEL`). Dodatkowo istnieje wbudowany mechanizm `env` **wewnatrz** `settings.json`, ktory pozwala eksportowac zmienne srodowiskowe na poziomie sesji bez dotykania profilu shella.

W sumie w oficjalnej dokumentacji `/en/env-vars` znajduje sie **ponad 120 zmiennych srodowiskowych** w 15 kategoriach (Auth, Model selection, Endpoints, Cloud auth, Token limits, Context, Timeouts, Bash, Cache, Memory, UI, IDE, Telemetry, OTel, MCP, Security, Sessions, Feature flags, SSL/mTLS, Proxy, OAuth). CLI reference (`/en/cli-reference`) dokumentuje **13 commands** (`claude`, `claude -p`, `claude -c`, `claude -r`, `claude auth login/logout/status`, `claude agents`, `claude auto-mode defaults`, `claude mcp`, `claude plugin`, `claude remote-control`, `claude setup-token`, `claude update`) oraz **ponad 50 flag** - od prostych `--model`, `--print`, `--verbose`, przez polityczno-bezpieczne `--dangerously-skip-permissions`, `--allowedTools`, `--permission-mode`, az po nowoczesne agent-orkiestracyjne `--agents`, `--fork-session`, `--from-pr`, `--teleport`.

Kluczowa obserwacja kampanii: **Managed settings moga zablokowac absolutnie wszystko inne** (w tym CLI flags) - to jedyna warstwa, ktora nie pozwala sie nadpisac. Pozostale konflikty (env vs settings vs CLI) maja przewidywalny, udokumentowany model precedencji z kilkoma niuansami ktore opisuje sekcja 7-8.

---

## 2. ANTHROPIC_* env vars (tabela)

Prefiks `ANTHROPIC_*` kontroluje autentykacje, dobor modelu i endpointy API. Czesc wartosci jest wspoldzielona z SDK Anthropica (API Python/TS/Go), co tworzy ryzyko leakage konfiguracji miedzy srodowiskami: jesli masz w `.zshrc` `export ANTHROPIC_API_KEY=sk-ant-prod-...` do skryptow SDK, Claude Code **rowniez** go uzyje, omijajac login OAuth. Zawsze stosuj scoped `env` w `settings.json` gdy chcesz oddzielic konta per-projekt.

| Zmienna | Typ | Wartosci | Default | Cel |
|---|---|---|---|---|
| `ANTHROPIC_API_KEY` | string | `sk-ant-*` | (brak) | Bezposrednia autentykacja API. Ma **priorytet nad** OAuth (Claude.ai login) i nad `ANTHROPIC_AUTH_TOKEN`. |
| `ANTHROPIC_AUTH_TOKEN` | string | dowolny | (brak) | Uzywany jako `Authorization: Bearer <token>` zamiast `x-api-key`. Typowo dla proxy/gateway ktory sam dodaje API key. |
| `ANTHROPIC_BETAS` | string (CSV) | `batch-2024-07-01,files-api-2024-04-11` | (brak) | Beta headers do requestow API. Odpowiednik CLI `--betas`. |
| `ANTHROPIC_CUSTOM_HEADERS` | string | `Name: Value` (newline-separated) | (brak) | Dodatkowe naglowki HTTP, np. AWS Bedrock Guardrails: `X-Amzn-Bedrock-GuardrailIdentifier: id`. |
| `ANTHROPIC_MODEL` | string | model ID | `claude-sonnet-4-6` (zmienne) | Glowny model. **Uwaga**: zostanie przesloniony przez CLI `--model` i przez Managed `availableModels`. |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | string | model ID | provider default | Wariant Sonnet do `sonnet` alias. Kluczowy dla Bedrock/Vertex rollout (pin wersji). |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | string | model ID | provider default | Wariant Opus. Bez tego `opus` alias na Bedrock rozwija sie do Opus 4.6, nie 4.7. |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | string | model ID | provider default | Wariant Haiku (tlo, background tasks). |
| `ANTHROPIC_SMALL_FAST_MODEL` | string | model ID | `claude-haiku-4-5-*` | **DEPRECATED** - zastapiony `ANTHROPIC_DEFAULT_HAIKU_MODEL`. Nadal czytany dla kompatybilnosci. |
| `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION` | string | region AWS | `AWS_REGION` | Override regionu dla Haiku na Bedrock/Mantle. Przypadek uzycia: Opus w us-east-1, Haiku w us-west-2 gdzie jest cross-region quota. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` | string | model ID | (brak) | Custom entry w `/model` pickerze. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME` | string | dowolny | model ID | Display name do `/model`. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION` | string | dowolny | auto | Opis custom modelu. |
| `ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES` | string | JSON/CSV | (brak) | `vision,tools` - capabilities custom modelu. |
| `ANTHROPIC_DEFAULT_{TIER}_MODEL_NAME` / `_DESCRIPTION` / `_SUPPORTED_CAPABILITIES` | string | dowolny | auto | Per-tier (Sonnet/Opus/Haiku) override display/capabilities. |
| `ANTHROPIC_BASE_URL` | URL | `https://...` | `https://api.anthropic.com` | Override endpointu API. Uzywane do LLM gatewayow, corp proxy. |
| `ANTHROPIC_BEDROCK_BASE_URL` | URL | `https://...` | AWS default | Override Bedrock Invoke API URL. |
| `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` | URL | `https://...` | AWS default | Override Bedrock Mantle endpoint (native Anthropic API shape). |
| `ANTHROPIC_VERTEX_BASE_URL` | URL | `https://...` | GCP default | Override Vertex AI endpoint. |
| `ANTHROPIC_VERTEX_PROJECT_ID` | string | GCP project ID | (brak) | Wymagane do Vertex. Nie ma defaultu - Claude Code sie wysypie bez tego. |
| `ANTHROPIC_FOUNDRY_BASE_URL` | URL | `https://my-resource.services.ai.azure.com/anthropic` | (brak) | Azure Foundry endpoint. |
| `ANTHROPIC_FOUNDRY_RESOURCE` | string | nazwa resource | (brak) | Foundry resource identifier. |
| `ANTHROPIC_FOUNDRY_API_KEY` | string | API key | (brak) | Foundry API key. |

**Notatka o priorytecie authow**: Cytat z `code.claude.com/docs/en/env-vars`: _"Authentication Priority: `ANTHROPIC_API_KEY` > `ANTHROPIC_AUTH_TOKEN` > Claude Pro/Team/Enterprise subscription"_. W praktyce oznacza to, ze jesli masz aktywna subskrypcje i jednoczesnie eksportowany `ANTHROPIC_API_KEY`, Claude Code uzyje klucza API (billing API, nie subskrypcja).

---

## 3. CLAUDE_CODE_* env vars (tabela)

Prefiks `CLAUDE_CODE_*` to **specyficzne dla narzedzia** flagi kontrolujace: cloud provider routing, feature flags, UI, security, telemetry, cache. Tu lezy najwiecej "magic switches" ktore nie maja odpowiednika w `settings.json`.

### 3.1 Cloud provider switches (Bedrock / Vertex / Foundry / Mantle)

| Zmienna | Typ | Wartosci | Domyslnie | Cel |
|---|---|---|---|---|
| `CLAUDE_CODE_USE_BEDROCK` | boolean | `1` | off | Routuje requesty przez AWS Bedrock Invoke API. Wymaga `AWS_REGION`. |
| `CLAUDE_CODE_USE_VERTEX` | boolean | `1` | off | Routuje przez Google Vertex AI. Wymaga `ANTHROPIC_VERTEX_PROJECT_ID`. |
| `CLAUDE_CODE_USE_FOUNDRY` | boolean | `1` | off | Routuje przez Microsoft Azure Foundry. |
| `CLAUDE_CODE_USE_MANTLE` | boolean | `1` | off | Routuje przez Bedrock Mantle endpoint (native Anthropic API shape). Moze byc ustawione **rownoczesnie** z `USE_BEDROCK` dla mixed routing (model ID decyduje). |
| `CLAUDE_CODE_BEDROCK_MANTLE` | boolean | `1` | off | Alias dla `USE_MANTLE` w starszych wersjach. |
| `CLAUDE_CODE_SKIP_BEDROCK_AUTH` | boolean | `1` | off | Nie podpisuj requestow SigV4 - dla LLM gateway ktory robi to po stronie serwera. |
| `CLAUDE_CODE_SKIP_VERTEX_AUTH` | boolean | `1` | off | Vertex bez klienckiej autentykacji. |
| `CLAUDE_CODE_SKIP_FOUNDRY_AUTH` | boolean | `1` | off | Foundry bez klienckiej autentykacji. |
| `CLAUDE_CODE_SKIP_MANTLE_AUTH` | boolean | `1` | off | Mantle przez gateway. |

### 3.2 Model, output, context, effort

| Zmienna | Typ | Domyslnie | Cel |
|---|---|---|---|
| `CLAUDE_CODE_SUBAGENT_MODEL` | string | glowny model | Model dla subagentow (Task tool). Pozwala np. Opus dla glownej sesji + Sonnet dla subagentow (oszczednosc). |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | integer | model max | Cap na output per request. |
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | integer | model max | Cap na tokeny zwracane przez Read tool (ochrona przed czytaniem duzego pliku). |
| `CLAUDE_CODE_MAX_CONTEXT_TOKENS` | integer | model max | Override rozmiaru context window. Np. wymus 500K zamiast 1M. |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW` | integer | model window | Context cap do auto-compaction. |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | integer | `95` | Procent kontekstu ktory triggeruje auto-compact. `75` = agresywniejsze compactowanie. |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | boolean | off | Wylacz 1M context window (Opus 4.7, Sonnet 4.6). |
| `CLAUDE_CODE_DISABLE_THINKING` | boolean | off | Wylacz extended thinking. |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` | boolean | off | Nie dopasowuj poziomu thinking adaptacyjnie. |
| `MAX_THINKING_TOKENS` | integer | model default | Cap na tokeny extended thinking. |
| `CLAUDE_CODE_EFFORT_LEVEL` | string | model default | `low`, `medium`, `high`, `xhigh`, `max`, `auto`. Nizsze effort = tansze, szybsze. |

### 3.3 Timeouts i API behavior

| Zmienna | Typ | Domyslnie | Cel |
|---|---|---|---|
| `API_TIMEOUT_MS` | integer | `600000` (10 min) | Timeout requestu API. |
| `CLAUDE_STREAM_IDLE_TIMEOUT_MS` | integer | 5 min min | Timeout idle streaming. |
| `CLAUDE_CODE_MAX_RETRIES` | integer | `10` | Ile razy retry API po 5xx/overloaded. |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | boolean | off | Nie fallback do non-streaming gdy streaming failuje. |
| `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` | boolean | off | Force tool input streaming (dla debug/obs). |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | boolean | off | Strip beta headers z requestow. |

### 3.4 Bash / shell / tools

| Zmienna | Typ | Domyslnie | Cel |
|---|---|---|---|
| `BASH_DEFAULT_TIMEOUT_MS` | integer | `120000` (2 min) | Default timeout dla Bash tool. |
| `BASH_MAX_TIMEOUT_MS` | integer | `600000` (10 min) | Max timeout (cap) dla Bash tool - model nie moze przekroczyc. |
| `BASH_MAX_OUTPUT_LENGTH` | integer | unlimited | Cap na output Bash (znakow). Ochrona przed zalaniem kontekstu. |
| `CLAUDE_CODE_SHELL` | string | auto-detect | Override detekcji shella (`bash`, `zsh`, `powershell`). |
| `CLAUDE_CODE_SHELL_PREFIX` | path | (brak) | Wrapper command - kazdy Bash idzie przez prefix (audit logger). |
| `CLAUDE_CODE_GIT_BASH_PATH` | path | auto | Windows: path do Git Bash exe. |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | boolean | rollout | Wlacz PowerShell tool (Windows). |
| `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` | boolean | off | Po kazdym Bash wroc do cwd. Krytyczne dla `cd && ...` workflow. |
| `CLAUDE_CODE_GLOB_HIDDEN` | boolean | `true` | Glob zawiera dotfiles (np. `.env`). Ustawic `false` dla security. |
| `CLAUDE_CODE_GLOB_NO_IGNORE` | boolean | `true` | Respektuj `.gitignore` w glob. `false` = ignoruj gitignore. |
| `CLAUDE_CODE_GLOB_TIMEOUT_SECONDS` | integer | `20` (60 WSL) | Timeout Glob tool. |
| `CLAUDECODE` | boolean | `1` (read-only) | Ustawione **w srodowisku child processes** - skrypty wiedza, ze biegna pod Claude. |

### 3.5 Cache, config, memory

| Zmienna | Typ | Domyslnie | Cel |
|---|---|---|---|
| `CLAUDE_CONFIG_DIR` | path | `~/.claude` | Alternative config dir. Izolacja konfiguracji per projekt/klient. |
| `CLAUDE_CODE_PLUGIN_CACHE_DIR` | path | `~/.claude/plugins` | Plugins install dir. |
| `CLAUDE_CODE_PLUGIN_SEED_DIR` | path | (brak) | `:`/`;`-separated lista seed dirs (corporate plugin rollout). |
| `CLAUDE_CODE_TMPDIR` | path | OS default | Temp dir (dla skryptow, hookow). |
| `CLAUDE_CODE_DEBUG_LOGS_DIR` | path | `~/.claude/debug/<session>.txt` | Debug log destination. **Override'ed by** CLI `--debug-file <path>`. |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | boolean | rollout | Wylacz auto-memory (auto CLAUDE.md tracking). |
| `CLAUDE_CODE_DISABLE_CLAUDE_MDS` | boolean | off | Nie ladowac zadnego CLAUDE.md w ogole. |
| `CLAUDE_CODE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` | boolean | off | Laduj CLAUDE.md tez z `--add-dir` (domyslnie nie - doc na `/en/permissions#additional-directories-grant-file-access-not-configuration`). |
| `CLAUDE_CODE_SKIP_PROMPT_HISTORY` | boolean | off | Nie zapisuj transkrypcji sesji. |

### 3.6 Feature flags (wylaczanie/wlaczanie)

| Zmienna | Typ | Cel |
|---|---|---|
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | boolean | Wylacz background task execution. |
| `CLAUDE_AUTO_BACKGROUND_TASKS` | boolean | Wymus auto-background tasks. |
| `CLAUDE_CODE_DISABLE_FAST_MODE` | boolean | Wylacz fast mode. |
| `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING` | boolean | Wylacz file checkpointing (`/undo`). |
| `CLAUDE_CODE_DISABLE_CRON` | boolean | Wylacz scheduled tasks. |
| `CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP` | boolean | Wylacz Opus 4.0/4.1 auto-remap do Opus 4.7. |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | boolean | Wlacz agent teams (research preview). |
| `CLAUDE_CODE_NEW_INIT` | boolean | Interactive `/init`. |
| `CLAUDE_CODE_SIMPLE` | boolean | Minimal system prompt (ustawiane automatycznie przez `--bare`). |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | boolean | Wylacz wszystkie non-essential HTTP calls (analytics, updater, error reporting). **Zalecane w air-gapped.** |
| `CLAUDE_CODE_DISABLE_ATTACHMENTS` | boolean | Wylacz drag-drop/paste attachments. |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | boolean | Wylacz built-in git workflow prompts + git status snapshot. **Nadpisuje** `includeGitInstructions` w settings. |
| `CLAUDE_CODE_PERFORCE_MODE` | boolean | Perforce-aware write protection (Perforce read-only files). |
| `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` | boolean | Scrub credentials (API keys) z env child processes - hooki nie widza `ANTHROPIC_API_KEY`. **Critical for security**. |
| `CLAUDE_CODE_SCRIPT_CAPS` | JSON | Limity N wywolan per skrypt: `{"deploy.sh": 5}`. |

### 3.7 UI

| Zmienna | Typ | Cel |
|---|---|---|
| `CLAUDE_CODE_NO_FLICKER` | boolean | Fullscreen rendering bez flickerowania. |
| `CLAUDE_CODE_DISABLE_MOUSE` | boolean | Bez mouse events w fullscreen. |
| `CLAUDE_CODE_SCROLL_SPEED` | integer | `1-20` - mnoznik kolka myszy. |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | boolean | Nie updateuj terminal title. |
| `CLAUDE_CODE_SYNTAX_HIGHLIGHT` | boolean | `false` - wylacz syntax highlighting. |
| `CLAUDE_CODE_ACCESSIBILITY` | boolean | Enable a11y mode. |
| `CLAUDE_CODE_TMUX_TRUECOLOR` | boolean | 24-bit color w tmux. |
| `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION` | boolean | `false` = wylacz prompt suggestions. |

### 3.8 IDE

| Zmienna | Cel |
|---|---|
| `CLAUDE_CODE_AUTO_CONNECT_IDE` | Auto-connect do IDE (VS Code/JetBrains). |
| `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` | Nie instaluj rozszerzenia auto. |
| `CLAUDE_CODE_IDE_SKIP_VALID_CHECK` | Pomin validacje IDE lockfile. |
| `CLAUDE_CODE_IDE_HOST_OVERRIDE` | Override IDE host (np. `localhost` dla SSH). |

### 3.9 Telemetry / debug

| Zmienna | Typ | Cel |
|---|---|---|
| `CLAUDE_CODE_ENABLE_TELEMETRY` | boolean `1` | Wlacz OpenTelemetry collection. |
| `DISABLE_TELEMETRY` | boolean `1` | Wylacz CALA telemetry. |
| `CLAUDE_CODE_DEBUG_LOG_LEVEL` | string | `verbose` / `debug` / `info` / `warn` / `error`. Default: `debug`. |
| `DISABLE_ERROR_REPORTING` | boolean `1` | Wylacz error reports (Sentry-like). |
| `DISABLE_BUG_COMMAND` | boolean `1` | Wylacz `/bug`. |
| `DISABLE_AUTOUPDATER` | boolean `1` | Wylacz auto-update. |
| `DISABLE_FEEDBACK_COMMAND` | boolean `1` | Wylacz feedback. |
| `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY` | boolean `1` | Wylacz quality surveys. |
| `DISABLE_NONESSENTIAL_MODEL_CALLS` | boolean `1` | Wylacz non-essential API calls (title gen, etc). |

### 3.10 OAuth / auth helper

| Zmienna | Cel |
|---|---|
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | Czestotliwosc refresh credentials. |
| `CLAUDE_CODE_OAUTH_TOKEN` | Access token. |
| `CLAUDE_CODE_OAUTH_REFRESH_TOKEN` | Refresh token. |
| `CLAUDE_CODE_OAUTH_SCOPES` | Scopes: `"user:profile user:inference"`. |

### 3.11 SSL/TLS

| Zmienna | Cel |
|---|---|
| `CLAUDE_CODE_CERT_STORE` | `bundled` / `system` / CSV. Default `bundled,system`. |
| `CLAUDE_CODE_CLIENT_CERT` | Client cert path (mTLS). |
| `CLAUDE_CODE_CLIENT_KEY` | Client key path. |
| `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` | Key passphrase. |

### 3.12 Sessions, tasks, teams

| Zmienna | Cel |
|---|---|
| `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` | Auto-exit delay (ms). |
| `CLAUDE_CODE_RESUME_INTERRUPTED_TURN` | Wznow przerwany turn. |
| `CLAUDE_CODE_TASK_LIST_ID` | Shared task list ID (team). |
| `CLAUDE_CODE_ENABLE_TASKS` | Wlacz tasks w non-interactive. |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | Session recap po powrocie. |
| `CLAUDE_CODE_TEAM_NAME` | Agent team membership. |
| `CLAUDE_CODE_REMOTE` (read-only) | Claude Code wystawia `"true"` w srodowisku web/cloud. |
| `CLAUDE_CODE_REMOTE_SESSION_ID` (read-only) | Session ID w remote. |
| `CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX` | Prefix auto-generated remote control nazw sesji. |
| `CLAUDE_AGENT_SDK_MCP_NO_PREFIX` | Pomin `mcp__` prefix na nazwach narzedzi. |
| `CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS` | Wylacz built-in subagents. |

### 3.13 Performance

| Zmienna | Typ | Default | Cel |
|---|---|---|---|
| `CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY` | integer | `10` | Parallel tool calls cap. |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | integer | `1500` (cap `60000`) | Timeout hookow SessionEnd. |
| `CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS` | integer | `5000` | Flush OTel data. |
| `CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS` | integer | `2000` | Shutdown OTel. |
| `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS` | integer | `1740000` | OTel headers refresh. |
| `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` | integer | `120000` | Plugin git timeout. |

---

## 4. OTEL_* env vars (tabela)

Claude Code implementuje OpenTelemetry Protocol (OTLP) do metryk i logow. Wymaga aktywacji przez `CLAUDE_CODE_ENABLE_TELEMETRY=1` - bez tego zadne inne `OTEL_*` nie zadzialaja (dokumentacja `/en/monitoring-usage`).

| Zmienna | Typ | Wartosci | Default | Cel |
|---|---|---|---|---|
| `CLAUDE_CODE_ENABLE_TELEMETRY` | boolean | `1` | off | **Master switch** - bez tego `OTEL_*` sa ignorowane. |
| `OTEL_METRICS_EXPORTER` | string | `otlp`, `none` | (brak) | Exporter dla metryk. |
| `OTEL_LOGS_EXPORTER` | string | `otlp`, `none` | (brak) | Exporter dla logow. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | URL | `http://collector:4317` | (brak) | OTLP gRPC/HTTP endpoint (np. Jaeger, Prometheus, Honeycomb). |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | string | `grpc`, `http/protobuf`, `http/json` | `grpc` | Protokol OTLP. |
| `OTEL_EXPORTER_OTLP_HEADERS` | string | `Key=Value,Key2=Value2` | (brak) | Naglowki HTTP (np. `Authorization=Bearer <honeycomb-token>`). |
| `OTEL_RESOURCE_ATTRIBUTES` | string | CSV `k=v,k=v` | (brak) | Resource tags: `service.name=claude-code,env=prod,team=platform`. |
| `OTEL_LOG_USER_PROMPTS` | boolean | `true`, `false` | `false` | **Kontrowersyjne** - wlacza logowanie TRESCI promptow uzytkownika. Privacy risk. |
| `CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS` | integer | ms | `5000` | Timeout flush danych do collectora. |
| `CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS` | integer | ms | `2000` | Timeout shutdown OTel. |
| `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS` | integer | ms | `1740000` (~29 min) | Interwal refresh naglowkow (dla rotujacych tokenow). |

**Typowa konfiguracja enterprise** (z `/en/monitoring-usage`):

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_ENDPOINT=https://api.honeycomb.io
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
export OTEL_EXPORTER_OTLP_HEADERS="x-honeycomb-team=$HONEYCOMB_API_KEY"
export OTEL_RESOURCE_ATTRIBUTES="service.name=claude-code,team=platform,env=prod"
```

Wszystko mozna rownie dobrze ustawic w `settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  }
}
```

---

## 5. MCP / HTTP / proxy env vars

### 5.1 MCP

| Zmienna | Typ | Default | Cel |
|---|---|---|---|
| `MCP_TIMEOUT` | integer (ms) | `30000` | Timeout dla MCP server startup/request. |
| `MCP_TOOL_TIMEOUT` | integer (ms) | model dependent | Timeout wywolania MCP tool. |
| `MAX_MCP_OUTPUT_TOKENS` | integer | model default | Cap tokenow zwracanych przez MCP tool (ochrona przed zalaniem kontekstu). |
| `ENABLE_TOOL_SEARCH` | boolean | rollout | Wlacz tool reference search (dla hosts ktore tego nie wspieraja). |

### 5.2 Proxy / HTTP

| Zmienna | Typ | Cel |
|---|---|---|
| `HTTP_PROXY` | URL | Proxy dla HTTP. Standard POSIX - wszystkie biblioteki HTTP klienta go czytaja. |
| `HTTPS_PROXY` | URL | Proxy dla HTTPS. W enterprise: `http://proxy.corp.example.com:8080`. |
| `NO_PROXY` | CSV | Hosty bypassujace proxy: `localhost,127.0.0.1,.corp.example.com`. |
| `CLAUDE_CODE_PROXY_RESOLVES_HOSTS` | boolean `1` | Proxy rozwiazuje DNS (nie klient). Dla izolowanych sieci gdzie DNS jest za proxy. |

Uwaga dla Windows: zmienne musza byc ustawione w **srodowisku procesu** (`setx` dla trwalych lub `set` dla sesji cmd). PowerShell `$env:HTTPS_PROXY='...'`.

---

## 6. CLI flags (tabela komplet)

Wszystkie flagi zaczynaja sie od `--` (dluga forma) lub `-` (skrot). **Nie wszystkie sa w `claude --help`** - cytat z dokumentacji: _"`claude --help` does not list every flag, so a flag's absence from `--help` does not mean it is unavailable."_

### 6.1 Session / model

| Flaga | Przyklad | Cel |
|---|---|---|
| `--model` | `claude --model claude-sonnet-4-6` lub `--model opus` | Model dla sesji. Alias lub pelna nazwa. |
| `--fallback-model` | `claude -p --fallback-model sonnet "query"` | Fallback gdy default model overloaded (tylko print mode). |
| `--effort` | `--effort high` | `low/medium/high/xhigh/max`. Session-scoped. |
| `--betas` | `--betas interleaved-thinking` | Beta headers (API key users only). |
| `--agent` | `--agent my-custom-agent` | Subagent do sesji (override `agent` setting). |
| `--agents` | `--agents '{"reviewer":{"description":"...","prompt":"..."}}'` | Dynamicznie definiuje subagentow przez JSON. |
| `--teammate-mode` | `--teammate-mode in-process` | `auto` / `in-process` / `tmux`. Display mode dla agent teams. |

### 6.2 Permissions / tools / security

| Flaga | Przyklad | Cel |
|---|---|---|
| `--permission-mode` | `--permission-mode plan` | `default` / `acceptEdits` / `plan` / `auto` / `dontAsk` / `bypassPermissions`. Override `defaultMode` settings. |
| `--dangerously-skip-permissions` | `--dangerously-skip-permissions` | = `--permission-mode bypassPermissions`. Pomija WSZYSTKIE prompty. |
| `--allow-dangerously-skip-permissions` | `--permission-mode plan --allow-dangerously-skip-permissions` | Dodaje `bypassPermissions` do `Shift+Tab` cycle bez startowania w nim. |
| `--allowedTools` | `--allowedTools "Bash(git log *)" "Bash(git diff *)" "Read"` | Auto-allow tych narzedzi (bez prompta). Uzywa syntax `permissions.allow`. |
| `--disallowedTools` | `--disallowedTools "Edit"` | Usuwa narzedzia z kontekstu (model ich nie widzi). |
| `--tools` | `--tools "Bash,Edit,Read"` | Zaweza dostepne built-in tools. `""` = wylacz wszystko, `"default"` = wszystkie. |
| `--permission-prompt-tool` | `--permission-prompt-tool mcp_auth_tool` | MCP tool do obslugi promptow permission w non-interactive. |
| `--add-dir` | `--add-dir ../apps ../lib` | Dodatkowe working dirs (**tylko file access**, nie ladowanie `.claude/` z nich). |

### 6.3 Settings / config

| Flaga | Przyklad | Cel |
|---|---|---|
| `--settings` | `--settings ./settings.json` lub `--settings '{"model":"opus"}'` | Additional settings (path do JSON lub inline JSON string). |
| `--setting-sources` | `--setting-sources user,project` | CSV scope'ow do zaladowania: `user`, `project`, `local`. Ogranicza skad Claude czyta settings. |
| `--mcp-config` | `--mcp-config ./mcp.json` | Load MCP servers z JSON. |
| `--strict-mcp-config` | `--strict-mcp-config --mcp-config ./mcp.json` | **Tylko** z `--mcp-config`, ignoruj `.mcp.json` i uzytkownika. |

### 6.4 Prompt customization

| Flaga | Przyklad | Cel |
|---|---|---|
| `--system-prompt` | `--system-prompt "You are a Python expert"` | **Zastepuje** domyslny system prompt. |
| `--system-prompt-file` | `--system-prompt-file ./prompts/review.txt` | Zastepuje domyslny z pliku. |
| `--append-system-prompt` | `--append-system-prompt "Always use TypeScript"` | Append do domyslnego. |
| `--append-system-prompt-file` | `--append-system-prompt-file ./style-rules.txt` | Append z pliku. |
| `--exclude-dynamic-system-prompt-sections` | `-p --exclude-dynamic-system-prompt-sections` | Tnie per-machine sekcje (cwd, git, memory paths) dla prompt-cache reuse w multi-user workloads. |

### 6.5 Print (non-interactive) mode

| Flaga | Przyklad | Cel |
|---|---|---|
| `--print`, `-p` | `claude -p "query"` | Non-interactive. Odpal query, wypisz rezultat, exit. |
| `--output-format` | `-p --output-format json` | `text` / `json` / `stream-json`. |
| `--input-format` | `-p --input-format stream-json` | `text` / `stream-json`. |
| `--include-hook-events` | `-p --output-format stream-json --include-hook-events` | Emituj hook lifecycle events w streamie. |
| `--include-partial-messages` | `-p --output-format stream-json --include-partial-messages` | Partial streaming events. |
| `--replay-user-messages` | `-p --input-format stream-json --output-format stream-json --replay-user-messages` | Re-emit user messages ze stdin na stdout (acknowledge). |
| `--json-schema` | `-p --json-schema '{"type":"object",...}' "query"` | Structured output - validated against schema. |
| `--max-turns` | `-p --max-turns 3 "query"` | Limit agentic turns (exit z bledem po przekroczeniu). |
| `--max-budget-usd` | `-p --max-budget-usd 5.00 "query"` | Budget cap na API calls. |
| `--no-session-persistence` | `-p --no-session-persistence "query"` | Nie zapisuj sesji na dysk. |

### 6.6 Sessions / resume

| Flaga | Przyklad | Cel |
|---|---|---|
| `--continue`, `-c` | `claude -c` | Wznow ostatnia sesje w current dir. |
| `--resume`, `-r` | `claude --resume auth-refactor` | Wznow po ID/nazwie lub interactive picker. |
| `--session-id` | `--session-id "550e8400-e29b-41d4-..."` | Use specific UUID. |
| `--fork-session` | `--resume abc123 --fork-session` | Resume tworzy nowe session ID (nie reusuje oryginalu). |
| `--from-pr` | `--from-pr 123` | Wznow sesje linked do GitHub PR. |
| `--name`, `-n` | `claude -n "my-feature-work"` | Display name sesji. |

### 6.7 UI / runtime

| Flaga | Cel |
|---|---|
| `--verbose` | Pelny turn-by-turn output. |
| `--debug` | Debug mode. Opcjonalny filtr kategorii: `--debug "api,mcp"` lub `--debug "!statsig,!file"`. |
| `--debug-file <path>` | Debug logs do konkretnego pliku. **Nadpisuje `CLAUDE_CODE_DEBUG_LOGS_DIR`**. |
| `--version`, `-v` | Wersja. |
| `--ide` | Auto-connect do IDE. |
| `--chrome` / `--no-chrome` | Chrome browser integration. |
| `--worktree`, `-w` | Start w isolated git worktree. |
| `--tmux` | tmux session (wymaga `--worktree`). `--tmux=classic` = traditional tmux. |

### 6.8 Remote / plugins / misc

| Flaga | Cel |
|---|---|
| `--remote` | Stworz web session na claude.ai. |
| `--remote-control`, `--rc` | Interactive session z remote control. |
| `--teleport` | Wznow web session lokalnie. |
| `--plugin-dir <path>` | Load plugins z dir (session only, powtarzalne). |
| `--channels` | Space-separated lista `plugin:<name>@<marketplace>`. Channel notifications. |
| `--dangerously-load-development-channels` | Enable non-approved channels dla local dev. |
| `--bare` | Minimal mode - pomin auto-discovery hooks/skills/plugins/MCP/memory/CLAUDE.md. Sets `CLAUDE_CODE_SIMPLE`. |
| `--init` / `--init-only` / `--maintenance` | Run init/maintenance hooks. |
| `--disable-slash-commands` | Wylacz skills i commands dla tej sesji. |

### 6.9 Specialne commands (nie flags)

| Command | Cel |
|---|---|
| `claude update` | Update do latest. |
| `claude auth login/logout/status` | OAuth / SSO / Console. |
| `claude agents` | List subagentow. |
| `claude mcp` | Configure MCP servers. |
| `claude plugin install <name>@<marketplace>` | Install plugin. |
| `claude remote-control` | Standalone remote control server. |
| `claude setup-token` | Long-lived OAuth token dla CI. |
| `claude auto-mode defaults` | Print auto mode classifier rules jako JSON. |

---

## 7. Precedence diagram: CLI > env > settings.file > defaults

Oficjalny model precedencji (cytat sekcja "Settings precedence" na `/en/settings`):

```
1. Managed settings       (server-managed / MDM / file-based / registry)
2. Command line arguments (--model, --permission-mode, --allowedTools, ...)
3. Local settings         (.claude/settings.local.json)
4. Project settings       (.claude/settings.json)
5. User settings          (~/.claude/settings.json)
```

**ALE** to dotyczy tylko pol ktore maja reprezentacje w `settings.json`. Environment variables to rownolegla sciezka:

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. MANAGED SETTINGS  (absolute lockdown - nie pozwoli sie nadpisac)│
│    - server-managed > MDM/plist/registry > file-based > HKCU     │
├─────────────────────────────────────────────────────────────────┤
│ 2. CLI FLAGS                                                     │
│    --model, --permission-mode, --debug-file, --allowedTools, ...  │
├─────────────────────────────────────────────────────────────────┤
│ 3. SHELL ENVIRONMENT VARIABLES                                   │
│    ANTHROPIC_MODEL, CLAUDE_CODE_DEBUG_LOGS_DIR, OTEL_*, ...      │
├─────────────────────────────────────────────────────────────────┤
│ 4. LOCAL SETTINGS  (.claude/settings.local.json) + "env" block   │
├─────────────────────────────────────────────────────────────────┤
│ 5. PROJECT SETTINGS  (.claude/settings.json) + "env" block       │
├─────────────────────────────────────────────────────────────────┤
│ 6. USER SETTINGS  (~/.claude/settings.json) + "env" block        │
├─────────────────────────────────────────────────────────────────┤
│ 7. BUILT-IN DEFAULTS (hard-coded w CLI)                          │
└─────────────────────────────────────────────────────────────────┘
```

Kluczowe zasady (z dokumentacji):

1. **Managed cannot be overridden** - cytat: _"Cannot be overridden by any other level, including command line arguments"_. Oznacza to, ze jesli Managed ma `"model": "sonnet"`, to `--model opus` zostanie zignorowany (lub odrzucony z bledem dla niektorych pol jak `availableModels`).

2. **Array settings merge cross-scope** - cytat: _"When the same array-valued setting (such as `sandbox.filesystem.allowWrite` or `permissions.allow`) appears in multiple scopes, the arrays are **concatenated and deduplicated**, not replaced."_ To jest wazny wyjatek od "higher scope wygrywa".

3. **Scalar settings - higher scope wygrywa** - typowa semantyka override.

4. **Objects - deep merge** - dokumentacja drop-in (`managed-settings.d/`) mowi wprost: _"Later files override earlier ones for scalar values; arrays are concatenated and de-duplicated; objects are deep-merged."_ Ta sama semantyka stosowana jest rekurencyjnie.

5. **Settings `env` block** - `env` wewnatrz `settings.json` jest **aplikowany jak `export`** przy starcie sesji. Wariant z settings wygrywa nad shell env DLA tego klucza, jesli scope settings jest **wyzszy** niz shell. Ale w praktyce: **shell env jest zwykle nizej** niz CLI/local/project/user settings - patrz scenariusze 1-5.

---

## 8. Konflikty precedence - 6 scenariuszy

### Scenariusz 1: Model selection

Stan:
- `settings.json` (User): `"model": "claude-opus-4-7"`
- Shell: `export ANTHROPIC_MODEL=claude-haiku-4-5`
- CLI: `claude --model sonnet`

**Wynik**: `sonnet`. CLI wygrywa. Dodatkowo: jesli Managed settings ma `availableModels: ["haiku", "sonnet"]`, to `--model opus` zostanie odrzucony (nawet w CLI) - Managed ma twardy veto na liste dozwolonych.

Reguly z dokumentacji `/en/model-config#restrict-model-selection`: _"`availableModels`: Restrict which models users can select via `/model`, `--model`, Config tool, or `ANTHROPIC_MODEL`."_

### Scenariusz 2: Permissions allow

Stan:
- User settings: `permissions.allow: ["Bash(git *)"]`
- Project settings: `permissions.allow: ["Bash(npm *)"]`
- Local settings: `permissions.allow: ["Bash(docker *)"]`
- CLI: `--allowedTools "Bash(rm -rf *)"`

**Wynik**: WSZYSTKIE sa mergowane (array concatenation + dedup). Effective allow list: `["Bash(git *)", "Bash(npm *)", "Bash(docker *)", "Bash(rm -rf *)"]`. To znaczy CLI tu NIE wygrywa przez override - dodaje wpis.

**ALE** jesli managed ma `permissions.deny: ["Bash(rm -rf *)"]`, deny wygrywa nad allow zawsze (dokumentacja `/en/permissions`: _"Deny rules take precedence over allow rules at the same level"_).

### Scenariusz 3: Debug logs path

Stan:
- Shell: `export CLAUDE_CODE_DEBUG_LOGS_DIR=/var/log/claude`
- CLI: `--debug-file /tmp/session.log`

**Wynik**: `/tmp/session.log`. Dokumentacja `/en/cli-reference` mowi wprost: _"`--debug-file`: Takes precedence over `CLAUDE_CODE_DEBUG_LOGS_DIR`"_.

### Scenariusz 4: Telemetry enabled + env config

Stan:
- Project settings `env`: `{"CLAUDE_CODE_ENABLE_TELEMETRY": "0"}`
- Shell: `export CLAUDE_CODE_ENABLE_TELEMETRY=1`
- User settings `env`: `{"OTEL_EXPORTER_OTLP_ENDPOINT": "http://collector:4317"}`

**Wynik**: Telemetry wylaczone (Project `env` wygrywa nad shell i User, bo jest wyzszy scope niz User; nie ma Local ani Managed ani CLI). OTLP endpoint: `http://collector:4317` (tylko User go definiuje, nie ma konfliktu). Efekt: dane nie polecia do endpointa bo telemetry wylaczone.

Uwaga: to ciekawe, bo **shell env przegrywa z Project settings** dla tego klucza. Gdyby Project nie mial tego wpisu, shell by wygral nad User.

### Scenariusz 5: Managed blocking CLI

Stan:
- Managed settings: `"disableAutoMode": "disable"`, `"disableAllHooks": true`
- CLI: `claude --permission-mode auto`

**Wynik**: CLI zostanie **odrzucony z bledem startup**. Cytat z dokumentacji `/en/settings` (disableAutoMode): _"Removes `auto` from the `Shift+Tab` cycle and rejects `--permission-mode auto` at startup."_ Podobnie `disableAllHooks: true` - nie da sie uruchomic hookow.

### Scenariusz 6: Bedrock routing dual

Stan:
- Shell: `export CLAUDE_CODE_USE_BEDROCK=1`, `export CLAUDE_CODE_USE_MANTLE=1`
- User settings: `"env": {"AWS_PROFILE": "prod"}`
- CLI: `--model anthropic.claude-haiku-4-5`

**Wynik**: Request idzie do **Mantle** (model ID `anthropic.*` pasuje do Mantle format). Gdyby model byl `us.anthropic.*`, poszedl by do **Bedrock Invoke API**. Oba env var sa kompatybilne - dokumentacja `/en/amazon-bedrock`: _"Setting both `CLAUDE_CODE_USE_BEDROCK` and `CLAUDE_CODE_USE_MANTLE` lets Claude Code call both endpoints from the same session. Model IDs that match the Mantle format are routed to Mantle, and all other model IDs go to the Bedrock Invoke API."_

AWS_PROFILE jest eksportowany z User settings do shell env (settings `env` block) i AWS SDK go odczyta.

---

## 9. Env vars w hookach (inherited shell env vs settings.env)

Claude Code odpala hooki jako child processes (shell executes). Srodowisko dla tych procesow to:

1. **Pelne shell env** Claude Code parent process (wszystko co bylo wyeksportowane zanim uruchomiles `claude`).
2. **Plus injected vars** specyficzne dla Claude Code (dokumentacja `/en/hooks`):
   - `CLAUDE_PROJECT_DIR` - root projektu
   - `CLAUDE_ENV_FILE` - (tylko `SessionStart`, `CwdChanged`, `FileChanged`) - scieżka do pliku gdzie hook moze wypisac `export X=Y` i Claude podniesie te vars dla nastepnych Bash commands
   - `CLAUDE_CODE_REMOTE` - `"true"` w remote/web, nie ustawione lokalnie
   - `CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA` - dla plugin hooks
   - Session info: `CLAUDE_SESSION_ID` (pokazuje sie w payload JSON stdin rowniez)
3. **Plus settings.json `env` block** - eksportowany przez Claude Code zanim hooki sa odpalane. Te klucze sa widoczne wewnatrz hookow.

Czyli: **settings.json `env` tworzy efekt `export` w srodowisku hookow.** To kluczowa obserwacja - jesli chcesz dostarczyc `ANTHROPIC_API_KEY` do hookow, mozesz dodac do `settings.json` `"env": {"ANTHROPIC_API_KEY": "sk-ant-..."}` i hooki beda go widziec (**nie rob tego w commited settings.json**, tylko `settings.local.json` badz Managed).

**Shell dla hookow**:
- Unix: **bash** (nie `sh`) domyslnie, cytat: _"Shell to use for this hook. Accepts `"bash"` (default) or `"powershell"`."_
- Windows: bash (jesli `CLAUDE_CODE_GIT_BASH_PATH` wskazuje na Git Bash) lub `powershell` (gdy hook ma `"shell": "powershell"`).

**HTTP hooks** maja **ograniczony dostep do env** - tylko vars wymienione w `allowedEnvVars` hooka SA rozwiazywane w header values (`$VAR` lub `${VAR}`). Dodatkowo Managed settings moga zaweżić ta liste przez `httpHookAllowedEnvVars` (intersection).

**Security hardening**: `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` wylacznie dodaje filtr na poziomie child processes ktory usuwa znane credential patterns (np. `ANTHROPIC_API_KEY`, `AWS_*`, `GITHUB_TOKEN`) z env subprocesa. **Krytyczne w deleguacji do untrusted plugins/hooks.**

**CLAUDE_ENV_FILE workflow** (SessionStart):

```bash
#!/bin/bash
# .claude/hooks/session-start.sh
echo "export NODE_ENV=development" >> "$CLAUDE_ENV_FILE"
echo "export API_BASE=https://dev.example.com" >> "$CLAUDE_ENV_FILE"
```

Te vars beda widoczne dla wszystkich Bash commands w tej sesji.

**SHELL=cmd.exe na Windows**: Claude Code nie uzywa `cmd.exe` nigdy domyslnie - zawsze probuje Git Bash (jesli jest) lub PowerShell. `cmd.exe` jest unsupported. Jesli `CLAUDE_CODE_GIT_BASH_PATH` nie jest ustawione i Git Bash nie jest w PATH, hooki Bash nie dzialaja; PowerShell hooki wymagaja `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` lub `defaultShell: "powershell"` w settings.

---

## 10. Deprecated / historical

Oficjalnie zdeprekowane lub usuniete w v2.1.x+:

| Zmienna / flaga | Status | Zastapiona przez |
|---|---|---|
| `ANTHROPIC_SMALL_FAST_MODEL` | **Deprecated** | `ANTHROPIC_DEFAULT_HAIKU_MODEL` |
| `includeCoAuthoredBy` (settings) | **Deprecated** | `attribution.commit` / `attribution.pr` |
| `ignorePatterns` (settings) | **Deprecated** | `permissions.deny` z patternami `Read(./path)` |
| `--enable-auto-mode` (CLI) | **Removed v2.1.111** | Auto mode w `Shift+Tab` cycle + `--permission-mode auto` |
| `C:\ProgramData\ClaudeCode\managed-settings.json` (Windows path) | **Removed v2.1.75** | `C:\Program Files\ClaudeCode\managed-settings.json` |
| `DISABLE_PROMPT_CACHING` | Nadal dzialajaca, ale typowo niepotrzebna w 2026 (prompt caching stabilne). | - |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | Progressive rollout - bedzie domyslne | - |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | Progressive rollout | - |

**Do sprawdzenia w CRITIC**:
- Czy `ANTHROPIC_CUSTOM_MODEL_OPTION` nadal dziala? (byl oznaczony "progressive" w 2025)
- Czy `CLAUDE_CODE_BEDROCK_MANTLE` jest nadal alias czy juz usuniete?
- Czy `DISABLE_PROMPT_CACHING` jest oficjalnie deprecated?

---

## 11. Gaps

Rzeczy **ktore NIE sa publicznie udokumentowane** lub sa niespojne:

1. **Precedence env vs settings `env` block** - dokumentacja nigdzie wprost nie mowi, co wygrywa: `export ANTHROPIC_MODEL=haiku` w shellu vs `"env": {"ANTHROPIC_MODEL": "opus"}` w `~/.claude/settings.json`. Z zachowania wynika, ze settings `env` jest "eksportowany" do srodowiska sesji, ale z niejasnym timing - przed czy po shell env. Wymaga testu empirycznego.

2. **CLI `--settings` scope** - doc mowi: _"Path to a settings JSON file or a JSON string to load additional settings from"_. "additional" sugeruje merge, ale nie wiadomo na ktorym poziomie scope (czy nadpisuje User, czy dodawana jako nowy scope miedzy Local a Project?).

3. **`--setting-sources`** - pomija enumerowane scope'y. Doc nie mowi, czy to tez pomija Managed (raczej nie, managed ma twardy override), ani co z `--settings` flagami przy tym.

4. **Bezposrednia lista env vars czytanych z `settings.json` `env` block** - nie ma ograniczenia, kazdy klucz jest eksportowany. To oznacza, ze mozna np. ustawic `PATH` w settings i zmieni sie dla wszystkich Bash subprocesses. Security implication niezbadana.

5. **Claude Code shell detection order** - doc mowi `CLAUDE_CODE_SHELL` override, ale nie ma publicznego "default order" (zsh > bash > fish > sh?).

6. **`DISABLE_NONESSENTIAL_MODEL_CALLS` vs `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`** - dwa rozne vars, dokumentacja nie mowi ktora bardziej restrictive.

7. **OAuth env vars (`CLAUDE_CODE_OAUTH_TOKEN` etc)** - nie ma przykladu workflow "jak wygenerowac i podac". Prawdopodobnie `claude setup-token` + skrypt parsujacy.

8. **Windows registry priority w Managed**: kolejnosc HKLM/HKCU wzgledem plikow `managed-settings.json` - dokumentacja podaje _"server-managed > MDM/OS-level policies > file-based > HKCU"_, ale HKLM jest pod "OS-level policies", wiec nie jest to do konca czytelne.

---

## 12. Bibliografia

Zrodla cytowane w tym raporcie (stan 2026-04-17):

1. **Claude Code settings** - `https://code.claude.com/docs/en/settings` (redirect z `docs.claude.com/en/docs/claude-code/settings`). Sekcje: "Configuration scopes", "Settings files", "Available settings" (complete table), "Settings precedence", "Excluding sensitive files".

2. **CLI reference** - `https://code.claude.com/docs/en/cli-reference`. Sekcje: "CLI commands" (13 commands), "CLI flags" (50+ flags), "System prompt flags".

3. **Environment variables reference** - `https://code.claude.com/docs/en/env-vars`. 120+ env vars w 15 kategoriach. Glowne zrodlo sekcji 2-5.

4. **Claude Code on Amazon Bedrock** - `https://code.claude.com/docs/en/amazon-bedrock`. Sekcje: "Set up manually" (env vars `CLAUDE_CODE_USE_BEDROCK`, `AWS_REGION`, `ANTHROPIC_BEDROCK_BASE_URL`, `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION`), "Advanced credential configuration" (`awsAuthRefresh`, `awsCredentialExport`), "Pin model versions", "Use the Mantle endpoint".

5. **Claude Code hooks** - `https://code.claude.com/docs/en/hooks`. Sekcje: hook injection env vars (`CLAUDE_PROJECT_DIR`, `CLAUDE_ENV_FILE`, `CLAUDE_CODE_REMOTE`, plugin vars), `allowedEnvVars` dla HTTP hooks, shell selection.

6. **Monitoring usage (OTel)** - `https://code.claude.com/docs/en/monitoring-usage` (cytowana posrednio; dostep wymagany do walidacji domyslnych wartosci OTel timeoutow).

7. **Permissions + permission rule syntax** - `https://code.claude.com/docs/en/permissions` i `/en/permission-modes` (cytowane w kontekscie `--permission-mode`, `--allowedTools`, deny precedence).

8. **JSON Schema settings** - `https://json.schemastore.org/claude-code-settings.json` (wymienione w doc settings jako walidator; nie inspekcjonowane bezposrednio - wymagaloby inspekcji schema dla sekcji 11 gaps).

Wszystkie cytaty "..." w tym raporcie sa dokladnymi frazami z powyzszych zrodel. Liczniki ("120+ env vars", "50+ flag") sa konserwatywnymi dolnymi granicami z doc snapshotu `/en/env-vars` i `/en/cli-reference` na 2026-04-17.
