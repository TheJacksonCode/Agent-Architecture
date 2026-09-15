---
title: R1 Official Docs - settings.json Schema Reference
campaign: settings-permissions-2026
agent: Researcher R1 (Docs Primary)
model: claude-opus-4-7
date: 2026-04-17
sources_checked:
  - https://code.claude.com/docs/en/settings
  - https://code.claude.com/docs/en/permissions
  - https://code.claude.com/docs/en/hooks
  - https://code.claude.com/docs/en/env-vars
  - https://code.claude.com/docs/en/statusline
  - https://code.claude.com/docs/en/server-managed-settings
  - https://code.claude.com/docs/en/authentication (ex-iam)
  - https://code.claude.com/docs/en/overview
  - https://code.claude.com/docs/llms.txt
word_count: ~4200
---

# R1: Official Docs - settings.json Schema Reference

## 1. Abstract

Ten raport mapuje w calosci oficjalny schemat konfiguracyjny `settings.json` dla Claude Code wedlug stanu dokumentacji Anthropic z 17 kwietnia 2026. Cala dokumentacja, ktora wczesniej zyla na `docs.claude.com/en/docs/claude-code/*`, zostala przeniesiona 301-redirectami na nowy host `code.claude.com/docs/en/*` i to jest dzis kanoniczne zrodlo. Strona `iam` przestala byc osobnym dokumentem - jej tresc podzielono miedzy `authentication` (logowanie, credentiale, apiKeyHelper, precedence) oraz `permissions` (rule syntax, tryby, managed settings).

Schemat `settings.json` w obecnej iteracji to ponad **70 pol top-level**, zorganizowanych w kilku blokach tematycznych: `permissions` (allow/ask/deny/auto + tryby + sandbox), `hooks` (pelna matryca zdarzen `PreToolUse`..`WorktreeRemove`), `env`, `mcp`-related (`enableAllProjectMcpServers`, `enabledMcpjsonServers`, `disabledMcpjsonServers`, `allowedMcpServers`, `deniedMcpServers`), `statusLine`, `sandbox`, `autoMode`, `attribution`, `fileSuggestion`, `spinnerTipsOverride`, `spinnerVerbs`, `worktree.*`, `enabledPlugins`, `extraKnownMarketplaces`, oraz `strictKnownMarketplaces` (tylko managed). Kluczowa nowosc 2026: **tryby uprawnien** `auto` (classifier-based) i `dontAsk` (auto-deny) obok klasycznych `default`, `acceptEdits`, `plan`, `bypassPermissions`; osobny blok `autoMode.{environment|allow|soft_deny}` do konfiguracji klasyfikatora; oraz `allowedHttpHookUrls` i `httpHookAllowedEnvVars` do ograniczania zewnetrznych hook-ow HTTP.

Hierarchia scope-ow jest szescio-warstwowa: **Managed (server) > Managed (MDM/file) > CLI args > Local (.claude/settings.local.json) > Project (.claude/settings.json) > User (~/.claude/settings.json)**. Array-valued settings (np. `permissions.allow`, `sandbox.filesystem.allowWrite`) sa **merge-owane i deduplikowane** miedzy scope-ami; scalar-owe - nadpisywane. Managed settings moga wymusic `allowManagedPermissionRulesOnly`, `allowManagedHooksOnly`, `allowManagedMcpServersOnly`, `sandbox.network.allowManagedDomainsOnly`, co de facto zamyka odpowiednie policy-obszary dla uzytkownikow. Poza `settings.json` istnieje oddzielny plik `~/.claude.json` na globalny state (OAuth session, MCP per-project, `autoConnectIde`, `editorMode`, `terminalProgressBarEnabled` i podobne) - proba wpisania tych kluczy do `settings.json` wywoluje schema validation error. Raport wylistowuje wszystkie pola z typami, defaults i przykladami JSON, a konczy biblografia z section-anchors, ktore Syntetyk moze cytowac bez ponownego fetchu.

## 2. Settings lifecycle - gdzie mieszka, kiedy ladowany

**Lokalizacje plikow** (docs.claude.com/en/docs/claude-code/settings#settings-files):

| Scope | Plik | Dla kogo |
|---|---|---|
| Managed (server) | Anthropic admin console -> cache lokalny | Wszyscy uzytkownicy org |
| Managed (MDM/OS) macOS | `/Library/Application Support/ClaudeCode/managed-settings.json` + plist `com.anthropic.claudecode` | Wszyscy uzytkownicy maszyny |
| Managed (MDM/OS) Linux/WSL | `/etc/claude-code/managed-settings.json` | Wszyscy |
| Managed (MDM/OS) Windows | `C:\Program Files\ClaudeCode\managed-settings.json` + `HKLM\SOFTWARE\Policies\ClaudeCode\Settings` (REG_SZ, JSON) | Wszyscy |
| User | `~/.claude/settings.json` | Jeden user, wszystkie projekty |
| Project | `.claude/settings.json` (committed) | Wszyscy wspolpracownicy repo |
| Local | `.claude/settings.local.json` (gitignored) | Jeden user, jeden projekt |
| Global state | `~/.claude.json` | OAuth, preferences, MCP per-project |

**Uwaga historyczna:** stara sciezka `C:\ProgramData\ClaudeCode\managed-settings.json` przestala byc obslugiwana od v2.1.75 - administratorzy MUSZA migrowac pliki do `C:\Program Files\ClaudeCode\` (source: settings#settings-files warning box).

**Drop-in directory:** w sciezkach managed istnieje `managed-settings.d/*.json`, merge-owany w kolejnosci alfabetycznej na baze `managed-settings.json`. Konwencja numerycznych prefixow (`10-telemetry.json`, `20-security.json`) jest oficjalnie rekomendowana. Pliki zaczynajace sie od `.` sa ignorowane.

**Precedencja** (settings#settings-precedence): 1) Managed, 2) CLI args, 3) Local, 4) Project, 5) User. W managed tier kolejnosc to server-managed > MDM/OS-level > file-based > HKCU (Windows only). Sources **nie mergeuja sie miedzy tierami** - pierwsze zrodlo ktore dostarczy cokolwiek wygrywa wszystko. W obrebie file-based tier-u drop-in files i baza sa mergowane.

**Backup:** Claude Code automatycznie robi timestamped backups config files i trzyma pieciu ostatnich.

**Schema URL:** `https://json.schemastore.org/claude-code-settings.json` - dodanie `"$schema"` do pliku daje autocomplete w VS Code. Schema jest updatowana okresowo i moze nie zawierac najswiezszych pol.

**Weryfikacja aktywnych settings:** `/status` wewnatrz Claude Code pokazuje ktore zrodla sa aktywne (np. `Enterprise managed settings (remote)`, `(plist)`, `(HKLM)`, `(file)`).

## 3. Full schema reference (pole po polu)

Ponizsza tabela to **kompletny spis pol `settings.json`** z typami, defaults i krotkimi przykladami (settings#available-settings, tabela glowna):

### 3.1 Core / runtime

- **`agent`** (string) - uruchamia main thread jako nazwany subagent; stosuje jego system prompt, tool restrictions, model. Przyklad: `"code-reviewer"`.
- **`alwaysThinkingEnabled`** (boolean) - extended thinking domyslnie we wszystkich sesjach. Zwykle przez `/config`.
- **`apiKeyHelper`** (string, path) - skrypt w `/bin/sh` generujacy auth value; wartosc idzie jako `X-Api-Key` i `Authorization: Bearer`. Default refresh: 5 min lub HTTP 401. Customizable przez `CLAUDE_CODE_API_KEY_HELPER_TTL_MS`. Slow helper (>10s) pokazuje warning notice.
- **`attribution`** (object `{commit: string, pr: string}`) - customizuje attribution dla gitcommitow i PR. Pusty string ukrywa. **Zastepuje deprecated `includeCoAuthoredBy`**.
- **`autoMemoryDirectory`** (string, path) - katalog auto memory. Accept `~/`-expanded paths. **Nie akceptowane w `.claude/settings.json`** (project) bo to security risk. OK w policy/local/user.
- **`autoMode`** (object `{environment, allow, soft_deny}`) - config auto-mode classifier. `environment` to prose rules ("Source control: github.example.com/acme-corp"). **Nie czytane z shared project settings** (CI-risk). Trzy CLI helpers: `claude auto-mode defaults|config|critique`.
- **`autoUpdatesChannel`** (string, `"stable"|"latest"`, default `"latest"`) - release channel. Stable jest ~tydzien za latest i pomija wersje z major regressions.
- **`availableModels`** (string[]) - ogranicza modele dostepne w `/model`, `--model`, Config tool, `ANTHROPIC_MODEL`. Nie wplywa na Default option. Przyklad: `["sonnet", "haiku"]`.
- **`awaySummaryEnabled`** (boolean) - session recap przy powrocie do terminala. Odpowiednik env `CLAUDE_CODE_ENABLE_AWAY_SUMMARY`.
- **`awsAuthRefresh`** / **`awsCredentialExport`** (string, path) - skrypty do advanced credential configuration dla Bedrock.
- **`cleanupPeriodDays`** (integer, default `30`, min `1`) - session files starsze niz to usuwane przy startcie. Kontroluje tez orphaned subagent worktrees cleanup. Wartosc `0` wywoluje validation error. Do calkowitego wylaczenia transcript writes: env `CLAUDE_CODE_SKIP_PROMPT_HISTORY` albo flaga `--no-session-persistence`.
- **`companyAnnouncements`** (string[]) - komunikaty startup cycled losowo.
- **`defaultShell`** (string, `"bash"|"powershell"`, default `"bash"`) - shell dla `!` input commands. PowerShell wymaga `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`.
- **`disableAllHooks`** (boolean) - wylacza wszystkie hooks I custom status line. W managed settings nie mozna nadpisac nizej.
- **`disableAutoMode`** (string `"disable"`) - blokuje auto mode. Usuwa z Shift+Tab cycle i odrzuca `--permission-mode auto`.
- **`disableDeepLinkRegistration`** (string `"disable"`) - zapobiega rejestracji `claude-cli://` protocol handler.
- **`disableSkillShellExecution`** (boolean) - blokuje inline shell w skills/commands (user/project/plugin/additional-directory). Bundled i managed skills nie dotkniete.
- **`effortLevel`** (string, `"low"|"medium"|"high"|"xhigh"`) - persist effort level. Pisany przez `/effort`.
- **`env`** (object) - env vars aplikowane kazdej sesji. Przyklad: `{"CLAUDE_CODE_ENABLE_TELEMETRY": "1"}`.
- **`fastModePerSessionOptIn`** (boolean) - fast mode nie persistuje miedzy sesjami.
- **`feedbackSurveyRate`** (number 0-1) - probability session quality survey.
- **`fileSuggestion`** (object `{type:"command", command}`) - custom `@` autocomplete. Dostaje JSON `{"query":"..."}` na stdin, ma zwrocic newline-separated paths (max 15).
- **`forceLoginMethod`** (string, `"claudeai"|"console"`) - ogranicza metode loginu.
- **`forceLoginOrgUUID`** (string albo string[]) - wymaga loginu do konkretnej org. Empty array w managed = fail-closed, blokuje cale logowanie.
- **`hooks`** (object) - custom commands lifecycle events. Patrz sekcja 4.2.
- **`includeCoAuthoredBy`** (boolean, default `true`) - **DEPRECATED**, uzywac `attribution`. Co-authored-by w commits/PR.
- **`includeGitInstructions`** (boolean, default `true`) - built-in git workflow instructions + git status snapshot w system promptcie. Env `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` wygrywa.
- **`language`** (string) - preferowany jezyk odpowiedzi (i voice dictation). `"japanese"`, `"polish"`, itp.
- **`minimumVersion`** (string) - floor ktory blokuje auto-update ponizej danej wersji. Uzyteczne w managed do pinu.
- **`model`** (string) - default model. Przyklad: `"claude-sonnet-4-6"`.
- **`modelOverrides`** (object) - mapowanie Anthropic model IDs na provider-specific IDs (Bedrock inference profile ARNs itp).
- **`otelHeadersHelper`** (string, path) - skrypt generujacy dynamic OTEL headers.
- **`outputStyle`** (string) - output style. Przyklad: `"Explanatory"`.
- **`permissions`** (object) - patrz sekcja 4.1.
- **`plansDirectory`** (string, default `~/.claude/plans`) - lokalizacja plan files.
- **`prefersReducedMotion`** (boolean) - a11y: redukcja animacji.
- **`respectGitignore`** (boolean, default `true`) - `@` file picker honoruje `.gitignore`.
- **`showClearContextOnPlanAccept`** (boolean, default `false`).
- **`showThinkingSummaries`** (boolean, default `false` w interactive). Non-interactive `-p` i SDK zawsze dostaja summaries.
- **`spinnerTipsEnabled`** (boolean, default `true`).
- **`spinnerTipsOverride`** (object `{tips: string[], excludeDefault: boolean}`).
- **`spinnerVerbs`** (object `{mode:"append"|"replace", verbs:[]}`).
- **`statusLine`** (object) - patrz sekcja 6.2.
- **`tui`** (string, `"fullscreen"|"default"`) - fullscreen renderer z virtualized scrollback.
- **`useAutoModeDuringPlan`** (boolean, default `true`) - plan mode uzywa auto mode gdy dostepny. Nie z shared project settings.
- **`viewMode`** (string, `"default"|"verbose"|"focus"`) - transcript view mode na startup.
- **`voiceEnabled`** (boolean) - push-to-talk voice dictation, wymaga Claude.ai account.

### 3.2 Permission settings (settings#permission-settings)

- **`permissions.allow`** (string[]) - Array rule stringow. Przyklad: `["Bash(git diff *)"]`.
- **`permissions.ask`** (string[]) - prompt for confirmation.
- **`permissions.deny`** (string[]) - blokuje. Wyzsza precedencja niz ask/allow.
- **`permissions.additionalDirectories`** (string[]) - dodatkowe working directories (file access). Wiekszosc `.claude/` configu NIE jest odkrywana z tych katalogow (wyjatek: skills z live reload, plugin `enabledPlugins`/`extraKnownMarketplaces`, opcjonalnie CLAUDE.md z envem `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`).
- **`permissions.defaultMode`** (string, enum) - default permission mode. Valid: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`. CLI flag `--permission-mode` override na sesje.
- **`permissions.disableBypassPermissionsMode`** (string `"disable"`) - blokuje bypass mode i flage `--dangerously-skip-permissions`. Zwykle w managed. Dziala z dowolnego scope.
- **`permissions.skipDangerousModePermissionPrompt`** (boolean) - skip confirmation dialog przed bypass mode. **Ignorowane z project settings** (zapobiega auto-bypass przez untrusted repos).

### 3.3 Sandbox settings (settings#sandbox-settings)

- **`sandbox.enabled`** (boolean, default `false`) - bash sandboxing (macOS, Linux, WSL2).
- **`sandbox.failIfUnavailable`** (boolean, default `false`) - exit at startup jesli sandbox niedostepny. Managed hard gate.
- **`sandbox.autoAllowBashIfSandboxed`** (boolean, default `true`).
- **`sandbox.excludedCommands`** (string[]) - commands out-of-sandbox. Przyklad: `["docker *"]`.
- **`sandbox.allowUnsandboxedCommands`** (boolean, default `true`) - pozwala na `dangerouslyDisableSandbox` escape hatch. `false` = all commands sandboxed.
- **`sandbox.filesystem.allowWrite`** / **`denyWrite`** / **`denyRead`** / **`allowRead`** (string[]) - paths. Merge ALL scopes + `Edit()`/`Read()` permission rules. Path prefixes: `/abs`, `~/home`, `./rel-to-project-or-user`, `//abs-legacy`.
- **`sandbox.filesystem.allowManagedReadPathsOnly`** (boolean, managed only).
- **`sandbox.network.allowUnixSockets`** / **`allowAllUnixSockets`** / **`allowLocalBinding`** / **`allowMachLookup`** / **`allowedDomains`** / **`allowManagedDomainsOnly`** / **`httpProxyPort`** / **`socksProxyPort`**.
- **`enableWeakerNestedSandbox`** (boolean, Linux/WSL2, reduces security).
- **`enableWeakerNetworkIsolation`** (boolean, macOS, dla Go-based tools).

### 3.4 MCP-related (5+ fields)

Patrz sekcja 5.

### 3.5 Hook policy fields

- **`allowedHttpHookUrls`** (string[]) - URL pattern allowlist dla HTTP hooks. `*` wildcard. Merge across scopes. Undefined = no restriction, empty = block all.
- **`httpHookAllowedEnvVars`** (string[]) - env var names dla HTTP hooks header interpolation.
- **`allowManagedHooksOnly`** (boolean, managed only) - tylko managed + SDK + force-enabled plugin hooks. Trust grant przez pelny `plugin@marketplace` ID.

### 3.6 Worktree settings

- **`worktree.symlinkDirectories`** (string[]) - np. `["node_modules", ".cache"]`, symlinkowane z main repo.
- **`worktree.sparsePaths`** (string[]) - git sparse-checkout cone mode paths.

### 3.7 Plugin settings

- **`enabledPlugins`** (object `{"name@marketplace": boolean}`).
- **`extraKnownMarketplaces`** (object z per-marketplace `{source: {source, repo|url|path|hostPattern|name, plugins}}`). Source types: `github`, `git`, `url`, `npm`, `file`, `directory`, `hostPattern`, `settings` (inline).
- **`strictKnownMarketplaces`** (array, **managed only**) - allowlist marketplace additions. Exact matching (repo, ref, path, url). Empty array = lockdown.
- **`blockedMarketplaces`** (array, **managed only**) - blocklist. Sprawdzane przed downloadem.
- **`pluginTrustMessage`** (string, managed only).

### 3.8 Channels (MCP-style push)

- **`channelsEnabled`** (boolean, managed only).
- **`allowedChannelPlugins`** (array, managed only).

## 4. Pola szczegolnego zainteresowania

### 4.1 `permissions` - rule syntax i tryby

**Rule format:** `Tool` lub `Tool(specifier)`. Evaluation order: **deny -> ask -> allow**. First match wins.

Przyklad kompletny (permissions#tool-specific-permission-rules):

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(npm run *)",
      "Bash(git commit *)",
      "Bash(git * main)",
      "Bash(* --version)",
      "Read(src/**)",
      "Edit(/docs/**)",
      "WebFetch(domain:github.com)",
      "mcp__memory__*",
      "Agent(Explore)"
    ],
    "ask": [
      "Bash(git push *)"
    ],
    "deny": [
      "Bash(curl *)",
      "Bash(rm -rf *)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Agent(DangerousAgent)"
    ],
    "additionalDirectories": ["../docs/"],
    "disableBypassPermissionsMode": "disable"
  }
}
```

**Bash nuances:**
- `Bash(*)` == `Bash`. `:*` jest rownowazne trailing `*` ale tylko na koncu (`Bash(ls:*)` == `Bash(ls *)`).
- Compound command separators: `&&`, `||`, `;`, `|`, `|&`, `&`, newline. Kazdy subcommand dopasowywany osobno.
- Process wrappers stripped: `timeout`, `time`, `nice`, `nohup`, `stdbuf`, bare `xargs`. **NIE** strip: `direnv exec`, `devbox run`, `mise exec`, `npx`, `docker exec` - trzeba pisac rules per inner command.
- Built-in read-only commands (bez promptu w kazdym mode): `ls`, `cat`, `head`, `tail`, `grep`, `find`, `wc`, `diff`, `stat`, `du`, `cd`, read-only git. Nie konfigurowalne.
- URL-constraining rules sa **fragile**. Lepiej deny `curl`/`wget` + `WebFetch(domain:...)` + PreToolUse hook walidator.

**Read/Edit pattern types** (gitignore spec):
- `//path` = absolute filesystem root. `Read(//Users/alice/secrets/**)`.
- `~/path` = home directory.
- `/path` = **project root** (NIE absolute!). `Edit(/src/**/*.ts)`.
- `path` / `./path` = cwd.
- Windows: paths normalized POSIX, `C:\Users\alice` => `/c/Users/alice`, `//**/.env` matches all drives.

**Symlinks:** allow rules wymagaja zeby obie sciezki (link i target) matchowaly. Deny rules - wystarczy jedna.

**WebFetch:** `WebFetch(domain:example.com)` tylko domena. Wildcards nie wspierane na domain level (!), ale `domain:*.example.com` dziala jako literal `*` (sprawdzic w R2/Critic - nie 100% jasne z docs).

**MCP:** `mcp__puppeteer` = dowolne tool z serwera puppeteer. `mcp__puppeteer__*` wildcard. `mcp__puppeteer__puppeteer_navigate` konkretny tool.

**Agent:** `Agent(Explore)`, `Agent(Plan)`, `Agent(custom-name)`. Do `deny` lub `--disallowedTools` CLI flag.

**Permission modes** (permissions#permission-modes):

| Mode | Zachowanie |
|---|---|
| `default` | Prompt on first use of each tool. |
| `acceptEdits` | Auto-accept file edits + common fs commands (`mkdir`, `touch`, `mv`, `cp`) dla cwd + `additionalDirectories`. |
| `plan` | Plan Mode: analyze-only, no mods, no exec. |
| `auto` | Classifier-based auto-approve z background safety checks. **Research preview.** |
| `dontAsk` | Auto-deny unless pre-approved via `/permissions` albo `allow` rules. |
| `bypassPermissions` | Skip all prompts z wyjatkiem writes do `.git`, `.claude`, `.vscode`, `.idea`, `.husky`. Writes do `.claude/commands`, `.claude/agents`, `.claude/skills` - no prompt. **Tylko w isolated envs**. Blockable przez `disableBypassPermissionsMode`. |

**Hook precedence vs rules:** Deny/ask rules evaluated regardless of hook return (managed deny zawsze blokuje). Blocking hook (exit 2) takes precedence over allow rules (stops before permission evaluation).

### 4.2 `hooks` - 25+ event types

**Struktura** (hooks#hook-configuration-structure):

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolName|AnotherTool",
        "hooks": [
          {
            "type": "command|http|prompt|agent",
            "if": "Bash(git *)",
            "timeout": 600,
            "statusMessage": "Checking...",
            "once": false,
            "command": "path/to/script.sh",
            "async": false,
            "asyncRewake": false,
            "shell": "bash"
          }
        ]
      }
    ]
  }
}
```

**Event types** (pelna lista):

*Session:* `SessionStart`, `SessionEnd`, `InstructionsLoaded`
*Per-turn:* `UserPromptSubmit`, `Stop`, `StopFailure`
*Tool exec:* `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `PermissionDenied`
*Subagent:* `SubagentStart`, `SubagentStop`
*Tasks:* `TaskCreated`, `TaskCompleted`
*Env/Files:* `CwdChanged`, `FileChanged`, `ConfigChange`
*Compaction:* `PreCompact`, `PostCompact`
*Worktree:* `WorktreeCreate`, `WorktreeRemove`
*MCP:* `Elicitation`, `ElicitationResult`
*Other:* `Notification`, `TeammateIdle`

**Matcher semantics:**
- `"*"` / `""` / omitted = match all.
- Tylko litery/cyfry/`_`/`|` = exact string lub `|`-separated list (`Bash` lub `Edit|Write`).
- Inne znaki = JS regex (`^Notebook`, `mcp__memory__.*`).

**Hook transport types:** `command`, `http` (z URL, headers, allowedEnvVars), `prompt` (prompt string z `$ARGUMENTS`), `agent`.

**Exit code behavior:**
- `0` = success, stdout parsed as JSON.
- `2` = blocking error (event-specific: blocks tool, rejects prompt, denies permission, prevents stop, prevents compact, rolls back task, itd.).
- Inne = non-blocking, shows stderr.

**Blocking events:** `PreToolUse`, `PermissionRequest`, `UserPromptSubmit`, `Stop`, `SubagentStop`, `TeammateIdle`, `TaskCreated`, `TaskCompleted`, `ConfigChange` (except policy), `PreCompact`, `Elicitation`, `ElicitationResult`, `WorktreeCreate`.

**PreToolUse JSON output decision precedence:** `deny > defer > ask > allow`.

**Env vars w hooks:** `$CLAUDE_PROJECT_DIR`, `${CLAUDE_PLUGIN_ROOT}`, `${CLAUDE_PLUGIN_DATA}`, oraz `$CLAUDE_ENV_FILE` w `SessionStart` do ustawiania env vars do kolejnych bash calls.

**disableAllHooks** na managed level blokuje hooks z nizszych scope-ow; na user/project level zostawia managed dzialajace.

### 4.3 `env`

Object mapujacy env var names na wartosci. Przyklad:

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "CLAUDE_CODE_ENV_FILE": "/tmp/claude-env",
    "FOO": "bar"
  }
}
```

Env vars w `settings.json` podlegaja security approval dialog przy managed settings, jesli sa spoza known-safe allowlist (server-managed-settings#security-approval-dialogs).

Pelna lista env vars to ~120 nazw - cytowanie wybranych w sekcji 6.3.

### 4.4 `model`, `availableModels`, `modelOverrides`

```json
{
  "model": "claude-sonnet-4-6",
  "availableModels": ["sonnet", "haiku", "opus"],
  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-1:123:inference-profile/..."
  }
}
```

`model` override-uje default. `availableModels` ogranicza picker (ale nie Default option). `modelOverrides` mapuje Anthropic IDs na provider-specific (Bedrock inference profile ARNs, Vertex endpoint names).

## 5. MCP-related fields

Z settings#available-settings i mcp docs:

- **`enableAllProjectMcpServers`** (boolean) - auto-approve wszystkich MCP servers z `.mcp.json` w projekcie. Przyklad: `true`.
- **`enabledMcpjsonServers`** (string[]) - whitelist konkretnych MCP servers z `.mcp.json`. Przyklad: `["memory", "github"]`.
- **`disabledMcpjsonServers`** (string[]) - blacklist. Przyklad: `["filesystem"]`.
- **`allowedMcpServers`** (array of `{serverName}`, **managed only**) - allowlist ktore uzytkownicy moga skonfigurowac. Undefined = no restriction, empty = lockdown. Denylist takes precedence.
- **`deniedMcpServers`** (array of `{serverName}`, **managed only**) - denylist. Zawsze wygrywa.
- **`allowManagedMcpServersOnly`** (boolean, managed only) - tylko `allowedMcpServers` z managed respected, ale `deniedMcpServers` merge z wszystkich.

**Interakcje:**
1. `enableAllProjectMcpServers: true` + `disabledMcpjsonServers: ["filesystem"]` = wszystkie OK z wyjatkiem filesystem.
2. Managed `deniedMcpServers: [{serverName: "X"}]` zawsze wygrywa nad user allow.
3. MCP per-project state (zaufania, approvals) jest w `~/.claude.json`, NIE w `settings.json`.
4. `.mcp.json` to OSOBNY plik w root projektu, configurujacy serwery project-scope.
5. Server-managed settings **NIE** dystrybuuja MCP configs (limitation wymieniony explicite w server-managed-settings#current-limitations).

```json
{
  "enableAllProjectMcpServers": false,
  "enabledMcpjsonServers": ["memory", "github"],
  "disabledMcpjsonServers": ["filesystem"],
  "allowedMcpServers": [{"serverName": "github"}, {"serverName": "memory"}],
  "deniedMcpServers": [{"serverName": "filesystem"}]
}
```

## 6. UX/runtime fields

### 6.1 `autoMode` (classifier-based trust)

```json
{
  "autoMode": {
    "environment": [
      "Source control: github.example.com/acme-corp",
      "Trusted cloud buckets: s3://acme-build-artifacts, gs://acme-ml-datasets",
      "Trusted internal domains: *.corp.example.com"
    ],
    "allow": [
      "Deploying to staging namespace is allowed: isolated, resets nightly"
    ],
    "soft_deny": [
      "Never run database migrations outside the migrations CLI",
      "...pelna default lista skopiowana z claude auto-mode defaults..."
    ]
  }
}
```

**Critical warning:** Ustawienie `allow` lub `soft_deny` **REPLACE** default list. Zawsze uruchom `claude auto-mode defaults` najpierw i skopiuj pelna liste. `environment` oddzielnie - nie replace. `autoMode` nie czytane z shared project settings.

### 6.2 `statusLine`

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 2,
    "refreshInterval": 5
  }
}
```

Fields: `type: "command"`, `command` (path lub inline), `padding` (default 0), `refreshInterval` (sekundy, min 1). Script dostaje JSON na stdin - pelna struktura w statusline#available-data. Kluczowe pola: `model.{id,display_name}`, `cwd`, `workspace.{current_dir,project_dir,added_dirs,git_worktree}`, `cost.{total_cost_usd,total_duration_ms,total_lines_added,total_lines_removed}`, `context_window.{total_input_tokens,context_window_size,used_percentage,current_usage}`, `rate_limits.{five_hour,seven_day}.{used_percentage,resets_at}`, `session_id`, `version`, `output_style.name`, `vim.mode`, `agent.name`, `worktree.*`.

### 6.3 Env passthrough

Setting `env` w `settings.json` rownowazne ustawieniu zmiennej w shellu. Przyklady kluczowych env vars (env-vars reference):

- `CLAUDE_CONFIG_DIR` (default `~/.claude`) - override config dir.
- `BASH_DEFAULT_TIMEOUT_MS` (120000), `BASH_MAX_TIMEOUT_MS` (600000), `BASH_MAX_OUTPUT_LENGTH`.
- `MAX_THINKING_TOKENS`, `MAX_MCP_OUTPUT_TOKENS`, `MCP_TIMEOUT`, `MCP_TOOL_TIMEOUT`.
- `CLAUDE_CODE_MAX_OUTPUT_TOKENS`, `CLAUDE_CODE_MAX_CONTEXT_TOKENS`, `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` (1-100), `CLAUDE_CODE_AUTO_COMPACT_WINDOW`.
- `DISABLE_TELEMETRY`, `DISABLE_AUTOUPDATER`, `DISABLE_ERROR_REPORTING`, `DISABLE_BUG_COMMAND`, `DISABLE_COST_WARNINGS`, `DISABLE_NON_ESSENTIAL_MODEL_CALLS`.
- `HTTP_PROXY`, `HTTPS_PROXY`, `NODE_EXTRA_CA_CERTS`.
- `CLAUDE_CODE_USE_BEDROCK`, `_USE_VERTEX`, `_USE_FOUNDRY`, `_USE_MANTLE`.
- `ANTHROPIC_MODEL`, `ANTHROPIC_DEFAULT_HAIKU_MODEL`, `ANTHROPIC_DEFAULT_SONNET_MODEL`, `ANTHROPIC_DEFAULT_OPUS_MODEL`, `ANTHROPIC_SMALL_FAST_MODEL` (**deprecated**), `ANTHROPIC_CUSTOM_MODEL_OPTION`, `CLAUDE_CODE_SUBAGENT_MODEL`, `CLAUDE_CODE_EFFORT_LEVEL`.
- `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` - load CLAUDE.md z add-dir katalogow.
- `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` - TTL dla apiKeyHelper.
- `CLAUDE_CODE_ENV_FILE` - shell script sourced przed kazdym Bash command.
- `CLAUDE_CODE_SKIP_PROMPT_HISTORY` - skip transcript writes.
- `CLAUDECODE` - **auto-set** na `1` w shellu spawnowanym przez Claude Code.
- `CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY` (default 10) - parallel read-only tools.
- `CLAUDE_CODE_MAX_RETRIES` (default 10).

### 6.4 `fileSuggestion`, `spinnerVerbs`, `attribution`, itd.

```json
{
  "fileSuggestion": {
    "type": "command",
    "command": "~/.claude/file-suggestion.sh"
  },
  "spinnerVerbs": {
    "mode": "append",
    "verbs": ["Pondering", "Crafting"]
  },
  "spinnerTipsOverride": {
    "excludeDefault": true,
    "tips": ["Use our internal tool X for code review"]
  },
  "attribution": {
    "commit": "Generated with AI\n\nCo-Authored-By: AI <ai@example.com>",
    "pr": ""
  }
}
```

## 7. Deprecated / historical

**Deprecated w current docs:**
- **`includeCoAuthoredBy`** - explicitly marked deprecated w settings#available-settings, zastapione przez `attribution`.
- **`ignorePatterns`** - old way of excluding files. Docs mowia wprost: "This replaces the deprecated `ignorePatterns` configuration" (settings#excluding-sensitive-files). Uzywac `permissions.deny` z `Read(./path/**)`.
- **`ANTHROPIC_SMALL_FAST_MODEL`** env var - marked `[DEPRECATED]` w env-vars.md.
- Legacy Windows path `C:\ProgramData\ClaudeCode\managed-settings.json` - **NIE obslugiwane od v2.1.75**. Migracja konieczna do `C:\Program Files\ClaudeCode\`.
- Legacy permission rule prefix `//path` dla sandbox nadal dziala, ale preferred `./path`.
- Stara domena `docs.claude.com/en/docs/claude-code/*` nadal redirectuje 301 na `code.claude.com/docs/en/*`, ale cytowania w narzedziach i skryptach powinny uzywac nowego hosta.

**Historical context:**
- `iam` page przestala byc osobnym dokumentem - jej zawartosc rozpelzla sie miedzy `authentication`, `permissions` i `server-managed-settings`.
- `maxOutputTokens` i `apiKeyHelper` sa obecnie konfigurowane przez env vars `CLAUDE_CODE_MAX_OUTPUT_TOKENS` + settings `apiKeyHelper`, nie przez bezposrednie top-level pola (roznie w starszych wersjach).
- `preferredNotifChannel` - nie pojawia sie w aktualnej tabeli settings; moze byc zastapione przez `channelsEnabled` + routing w `~/.claude.json`.
- `theme`, `autoUpdate`, `editorMode` - NIE sa w `settings.json` (trigger validation error). Mieszkaja w `~/.claude.json` jako global config (`autoConnectIde`, `autoInstallIdeExtension`, `autoScrollEnabled`, `editorMode`, `externalEditorContext`, `showTurnDuration`, `terminalProgressBarEnabled`, `teammateMode`).

## 8. Przyklady kompletnych settings.json z docs

### 8.1 Minimalny example (settings#settings-files)

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test *)",
      "Read(~/.zshrc)"
    ],
    "deny": [
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  },
  "companyAnnouncements": [
    "Welcome to Acme Corp! Review our code guidelines at docs.acme.com",
    "Reminder: Code reviews required for all PRs"
  ]
}
```

### 8.2 Enterprise managed-settings.json (server-managed-settings#configure)

```json
{
  "permissions": {
    "deny": [
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ],
    "disableBypassPermissionsMode": "disable"
  },
  "allowManagedPermissionRulesOnly": true,
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "/usr/local/bin/audit-edit.sh" }
        ]
      }
    ]
  },
  "autoMode": {
    "environment": [
      "Source control: github.example.com/acme-corp and all repos under it",
      "Trusted cloud buckets: s3://acme-build-artifacts, gs://acme-ml-datasets",
      "Trusted internal domains: *.corp.example.com"
    ]
  },
  "forceRemoteSettingsRefresh": true
}
```

### 8.3 Sandbox config (settings#sandbox-settings)

```json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["docker *"],
    "filesystem": {
      "allowWrite": ["/tmp/build", "~/.kube"],
      "denyRead": ["~/.aws/credentials"]
    },
    "network": {
      "allowedDomains": ["github.com", "*.npmjs.org", "registry.yarnpkg.com"],
      "allowUnixSockets": ["/var/run/docker.sock"],
      "allowLocalBinding": true
    }
  }
}
```

### 8.4 Hook config z HTTP + mcp matcher

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(rm *)",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/block-rm.sh"
          },
          {
            "type": "http",
            "url": "http://localhost:8080/hooks/pre-tool-use",
            "timeout": 30,
            "headers": {"Authorization": "Bearer $MY_TOKEN"},
            "allowedEnvVars": ["MY_TOKEN"]
          }
        ]
      },
      {
        "matcher": "mcp__memory__.*",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Memory operation initiated' >> ~/mcp-operations.log"
          }
        ]
      }
    ]
  },
  "allowedHttpHookUrls": ["http://localhost:*", "https://hooks.example.com/*"],
  "httpHookAllowedEnvVars": ["MY_TOKEN", "HOOK_SECRET"]
}
```

### 8.5 Plugin + marketplace

```json
{
  "enabledPlugins": {
    "code-formatter@team-tools": true,
    "deployment-tools@team-tools": true,
    "experimental-features@personal": false
  },
  "extraKnownMarketplaces": {
    "acme-tools": {
      "source": {
        "source": "github",
        "repo": "acme-corp/claude-plugins"
      }
    }
  }
}
```

## 9. Niezidentyfikowane / niejasne (gaps - dla CRITIC)

1. **`maxOutputTokens` top-level field** - user-facing brief prompt lists go jako istniejace pole, ale aktualne docs pokazuja tylko env var `CLAUDE_CODE_MAX_OUTPUT_TOKENS`. Czy jest takze top-level key w `settings.json`? Brak w tabeli settings#available-settings. **Gap do weryfikacji przez R2 (CHANGELOG/release notes).**

2. **`theme`, `autoUpdate`** - prompt wymienia te pola. W aktualnych docs `autoUpdate` NIE ma (`autoUpdatesChannel` tak). `theme` nie pojawia sie w tabeli - prawdopodobnie zyje w `~/.claude.json` global config, ale brak bezposredniej potwierdzenia. **Gap.**

3. **`preferredNotifChannel`** - wymieniony w prompt, ale NIE wymieniony w tabeli settings. `channelsEnabled` istnieje ale to inny koncept. Prawdopodobnie usuniete lub przeniesione. **Gap.**

4. **WebFetch domain wildcards** - `WebFetch(domain:*.example.com)` - docs pokazuja tylko literal domain `domain:example.com`. Brak potwierdzenia wildcard support w domain specifier. **Gap.**

5. **Mapowanie `hooks.*` na event list w hooks reference vs starsze docs** - hooks guide wymienia wiecej event types niz stary docs (`InstructionsLoaded`, `PostToolUseFailure`, `StopFailure`, `TaskCreated/Completed`, `ConfigChange`, `TeammateIdle`, `WorktreeCreate/Remove`). Prompt oryginalny wymienia klasyczne eventy - warto oznaczyc co jest **2026-new** vs historyczne.

6. **`.claude/settings.local.json` - automatyczny gitignore** - docs mowia "Claude Code will configure git to ignore `.claude/settings.local.json` when it is created". Ale to nie znaczy ze jest w `.gitignore` automatycznie - to moze byc `git update-index --assume-unchanged` albo `.git/info/exclude`. **Detal operacyjny do zweryfikowania.**

7. **`modelOverrides` i `ANTHROPIC_MODEL` interakcja** - docs nie opisuja czy env override wygrywa nad `model` setting, czy odwrotnie. Authentication docs mowia o precedence credentiali, nie modeli. **Gap.**

8. **`feedbackSurveyRate` vs `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY`** - oba istnieja, relacja nie jest explicite.

9. **`apiKeyHelper` dla Desktop/Remote** - docs mowia "applies to terminal CLI sessions only". Ale ktore dokladnie desktopy? Desktop app + Web? Potwierdzic w R2.

10. **`persistSession` SDK option vs `--no-session-persistence` flag vs `CLAUDE_CODE_SKIP_PROMPT_HISTORY`** - trzy mechanizmy robiace podobna rzecz. Jaki ordering? **Gap.**

11. **Windows HKCU vs HKLM precedence w managed tier** - docs pisza "HKCU (Windows only) - lowest policy priority, only used when no admin-level source exists". Ale czy HKCU potrafi override HKCU-level project settings, czy jest strict policy-only? **Drobny gap.**

12. **Array merging dla `permissions.ask`** - docs mowia o merge dla `allow` i `deny` arrays, ale explicite nie dla `ask`. Zakladamy symmetry.

## 10. Bibliografia

- [Claude Code settings](https://code.claude.com/docs/en/settings) - glowny reference, scopes, precedence, pelna tabela `settings.json` fields (#available-settings, #settings-files, #settings-precedence, #permission-settings, #sandbox-settings, #attribution-settings, #file-suggestion-settings, #hook-configuration, #excluding-sensitive-files, #global-config-settings, #worktree-settings).
- [Configure permissions](https://code.claude.com/docs/en/permissions) - rule syntax, permission modes, managed-only settings, auto mode classifier (#permission-system, #permission-modes, #permission-rule-syntax, #tool-specific-permission-rules, #working-directories, #managed-settings, #managed-only-settings, #configure-the-auto-mode-classifier, #settings-precedence).
- [Hooks reference](https://code.claude.com/docs/en/hooks) - wszystkie events, matcher semantics, input/output JSON schema, exit codes, permission update entries, HTTP response handling.
- [Automate workflows with hooks](https://code.claude.com/docs/en/hooks-guide) - guide-level dla hooks.
- [Environment variables](https://code.claude.com/docs/en/env-vars) - ~120 env vars reference.
- [Customize your status line](https://code.claude.com/docs/en/statusline) - statusLine config, JSON input schema, examples.
- [Server-managed settings](https://code.claude.com/docs/en/server-managed-settings) - enterprise config flow, security approval dialogs, fail-closed startup, cache behavior.
- [Authentication](https://code.claude.com/docs/en/authentication) - apiKeyHelper, credential storage, authentication precedence. (Ex-iam page, redirect target.)
- [Claude Code overview](https://code.claude.com/docs/en/overview) - wysokopoziomowy kontekst feature matrix.
- [Documentation index](https://code.claude.com/docs/llms.txt) - llms.txt catalog 100+ stron.
- [Tools reference](https://code.claude.com/docs/en/tools-reference) - do cross-check tool names w permission rules.
- [Sandboxing](https://code.claude.com/docs/en/sandboxing) - OS-level enforcement dla Bash; referenced w permissions.
- [Model config](https://code.claude.com/docs/en/model-config) - `availableModels`, `modelOverrides`, `effortLevel` deep reference.
- [MCP config](https://code.claude.com/docs/en/mcp) - `enableAllProjectMcpServers`, `enabledMcpjsonServers`, managed MCP config.
- [Permission modes](https://code.claude.com/docs/en/permission-modes) - szczegolowy breakdown trybow (`default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`).
- [Claude Code settings JSON schema](https://json.schemastore.org/claude-code-settings.json) - oficjalny schema dla `"$schema"` tag w settings.json.

Wszystkie odnosniki fetchowane 2026-04-17 z nowego hosta `code.claude.com`. Stare odnosniki `docs.claude.com/en/docs/claude-code/*` redirectuja 301. Cache WebFetch 15-minutowy na tej sesji.
